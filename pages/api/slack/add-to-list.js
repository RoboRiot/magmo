// pages/api/slack/add-to-list.js
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const token = process.env.SLACK_BOT_TOKEN;
    if (!token) return res.status(500).json({ error: "Missing SLACK_BOT_TOKEN" });

    const {
      listKey,            // "receiving" | "shipping" | "tasks"
      title, linkUrl, bodyText,
      date, pn, sn, dom, trackingNumber, poNumber, workOrder, localSN, description,
      photoUrls = [],
    } = req.body;

    const LISTS = {
      receiving: {
        id: process.env.SLACK_LIST_RECEIVING_ID,
        cols: {
          desc:   process.env.SLACK_LIST_RECEIVING_DESCRIPTION_COL,
          date:   process.env.SLACK_LIST_RECEIVING_DATE_COL,
          pn:     process.env.SLACK_LIST_RECEIVING_PNSN_COL,
          track:  process.env.SLACK_LIST_RECEIVING_TRACKING_COL,
          wo:     process.env.SLACK_LIST_RECEIVING_WO_COL,
          lsn:    process.env.SLACK_LIST_RECEIVING_LOCALSN_COL,
          photos: process.env.SLACK_LIST_RECEIVING_PHOTOS_COL, // attachment
        },
      },
      shipping: {
        id: process.env.SLACK_LIST_SHIPPING_ID,
        cols: {
          desc:   process.env.SLACK_LIST_SHIPPING_DESCRIPTION_COL,
          date:   process.env.SLACK_LIST_SHIPPING_DATE_COL,
          pn:     process.env.SLACK_LIST_SHIPPING_PNSN_COL,
          track:  process.env.SLACK_LIST_SHIPPING_TRACKING_COL,
          wo:     process.env.SLACK_LIST_SHIPPING_WO_COL,
          lsn:    process.env.SLACK_LIST_SHIPPING_LOCALSN_COL,
          photos: process.env.SLACK_LIST_SHIPPING_PHOTOS_COL,  // attachment
        },
      },
      tasks: {
        id: process.env.SLACK_LIST_TASKS_ID,
        cols: {
          desc: process.env.SLACK_LIST_TASKS_DESCRIPTION_COL,
        },
      },
    };

    const CHANNELS = {
      receiving: process.env.SLACK_CHANNEL_RECEIVING_ID,
      shipping:  process.env.SLACK_CHANNEL_SHIPPING_ID,
      tasks:     process.env.SLACK_CHANNEL_TASKS_ID,
    };

    const headersJson = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json; charset=utf-8",
    };
    const slack = (method, body, headers = headersJson) =>
      fetch(`https://slack.com/api/${method}`, { method: "POST", headers, body })
        .then(r => r.json());

    const plain = v => (v ?? "").toString().trim();
    const safe  = plain;
    const joinArr = a => Array.isArray(a) ? a.filter(Boolean).map(plain).join(", ") : plain(a);

    // ---------- PATH A: Write to a LIST ----------
    const cfg = LISTS[listKey];
    if (cfg?.id) {
      const fields = [];

      // Description column
      if (cfg.cols.desc && (description || bodyText || linkUrl)) {
        const textBits = [
          description,
          (listKey === "tasks" && bodyText) ? bodyText : null,
          linkUrl ? `<${linkUrl}|Open in Magmo>` : null,
        ].filter(Boolean).join("\n");
        fields.push({ column_id: cfg.cols.desc, value: { text: textBits } });
      }

      if (cfg.cols.date && date) fields.push({ column_id: cfg.cols.date, value: { date } });

      if (cfg.cols.pn && (pn || sn || dom)) {
        const pnLine = Array.isArray(pn) ? `PN: ${pn.filter(Boolean).join(", ")}` : (pn ? `PN: ${pn}` : "");
        const snLine = Array.isArray(sn) ? `SN: ${sn.filter(Boolean).join(", ")}` : (sn ? `SN: ${sn}` : "");
        const domLine = dom ? `DOM: ${dom}` : "";
        const pnBlock = [pnLine, snLine, domLine].filter(Boolean).join("  ");
        if (pnBlock) fields.push({ column_id: cfg.cols.pn, value: { text: pnBlock } });
      }

      if (cfg.cols.track && (trackingNumber || poNumber)) {
        const t = [
          trackingNumber ? `RL: ${trackingNumber}` : "",
          poNumber ? `PO: ${poNumber}` : "",
        ].filter(Boolean).join("  ");
        if (t) fields.push({ column_id: cfg.cols.track, value: { text: t } });
      }

      if (cfg.cols.wo && workOrder) fields.push({ column_id: cfg.cols.wo,  value: { text: `WO: ${workOrder}` } });
      if (cfg.cols.lsn && localSN)  fields.push({ column_id: cfg.cols.lsn, value: { text: localSN } });

      // NOW build the create body (cfg & fields exist)
      const createBody = {
        list_id: cfg.id,
        title: plain(title) || plain(localSN) || "Untitled",
        fields,
      };

      const created = await slack("slackLists.items.create", JSON.stringify(createBody));
      if (!created?.ok) {
        console.error("slackLists.items.create error:", created);
        return res.status(400).json({ error: created?.error || "Slack Lists API error", raw: created });
      }

      // Photos -> attachment column
      if (cfg.cols.photos && Array.isArray(photoUrls) && photoUrls.length) {
        const fileIds = [];
        for (const url of photoUrls) {
          const init = await fetch("https://slack.com/api/files.getUploadURLExternal", {
            method: "POST",
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({ filename: url.split("/").pop() || "image.jpg" }),
          }).then(r => r.json());

          if (!init?.ok || !init?.upload_url) continue;

          try {
            const img = await fetch(url);
            const buf = await img.arrayBuffer();
            await fetch(init.upload_url, { method: "PUT", body: Buffer.from(buf) });
          } catch (_) {}

          const complete = await slack("files.completeUploadExternal",
            JSON.stringify({ files: [{ id: init.file_id, title: "photo" }] })
          );
          if (complete?.ok && complete?.files?.[0]?.id) fileIds.push(complete.files[0].id);
        }

        if (fileIds.length) {
          await slack("slackLists.items.update", JSON.stringify({
            list_id: cfg.id,
            item_id: created.item.id,
            fields: [{ column_id: cfg.cols.photos, value: { attachment: { file_ids: fileIds } } }],
          }));
        }
      }

      return res.status(200).json({ ok: true, mode: "list", list_id: cfg.id, item_id: created.item.id });
    }

    // ---------- PATH B: Fallback to a channel post ----------
    const channel = CHANNELS[listKey];
    if (!channel) return res.status(400).json({ error: "Unknown listKey (no list or channel configured)" });

    // Try to join public channels to avoid channel_not_found
    await fetch("https://slack.com/api/conversations.join", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ channel }),
    });

    const safeId = plain(linkUrl?.split("/").pop()) || plain(localSN) || "";
    const safeTitle = plain(title) || plain(req.body?.title) || (safeId ? `Item ${safeId}` : "New Item");

    const lines = [];
    lines.push(`*${safeTitle}*`);

    const pnStr = joinArr(pn);
    const snStr = joinArr(sn);
    if (pnStr) lines.push(`PN: ${pnStr}`);
    if (snStr) lines.push(`SN: ${snStr}`);
    if (safe(workOrder)) lines.push(`WO: ${safe(workOrder)}`);
    if (safe(poNumber)) lines.push(`PO: ${safe(poNumber)}`);
    if (safe(trackingNumber)) lines.push(`RL: ${safe(trackingNumber)}`);
    if (safe(dom)) lines.push(`DOM: ${safe(dom)}`);
    if (safe(localSN)) lines.push(`Local SN: ${safe(localSN)}`);
    if (safe(date)) lines.push(`Date: ${safe(date)}`);

    const desc = safe(description);
    if (desc) lines.push(desc);
    else if (listKey === "tasks" && safe(bodyText)) lines.push(safe(bodyText));

    if (safe(linkUrl)) lines.push(`<${safe(linkUrl)}|Open in Magmo>`);

    const text = lines.filter(Boolean).join("\n") || "(no details provided)";

    const posted = await slack("chat.postMessage", JSON.stringify({ channel, text }));
    if (!posted?.ok) {
      console.error("chat.postMessage error:", posted);
      return res.status(400).json({ error: posted?.error || "Slack API error", raw: posted });
    }

    return res.status(200).json({ ok: true, mode: "channel", channel, ts: posted.ts });
  } catch (e) {
    console.error("API /slack/add-to-list crashed:", e);
    return res.status(500).json({ error: "Server error" });
  }
}
