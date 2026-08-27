// // pages/api/slack/add-to-list.js
// export default async function handler(req, res) {
//   try {
//     if (req.method !== "POST") {
//       return res.status(405).json({ ok: false, error: "method_not_allowed" });
//     }

//     const token = process.env.SLACK_BOT_TOKEN;
//     if (!token) {
//       return res.status(500).json({ ok: false, error: "missing_SLACK_BOT_TOKEN" });
//     }

//     // payload from client
//     const {
//       listKey,             // "tasks" | "shipping" | "receiving"
//       title,               // item title (what shows in the primary column)
//       // keeping minimal per your request: PN/SN only for now
//       pn, sn,
//     } = req.body || {};

//     // list ids from env
//     const LIST_IDS = {
//       tasks: process.env.SLACK_LIST_TASKS_ID,
//       shipping: process.env.SLACK_LIST_SHIPPING_ID,
//       receiving: process.env.SLACK_LIST_RECEIVING_ID,
//     };

//     const list_id = LIST_IDS[listKey];
//     if (!list_id) {
//       return res.status(400).json({ ok: false, error: `unknown_listKey_${listKey}` });
//     }

//     // ---- Slack helpers ----
//     async function slackJson(method, payload) {
//       const r = await fetch(`https://slack.com/api/${method}`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json; charset=utf-8",
//         },
//         body: JSON.stringify(payload),
//       });
//       return r.json();
//     }

//     const plain = (v) => (v ?? "").toString().trim();
//     const joinArr = (a) => Array.isArray(a) ? a.filter(Boolean).map(plain).join(", ") : plain(a);

//     function toRichText(text) {
//       const t = plain(text);
//       return [{
//         type: "rich_text",
//         elements: [{
//           type: "rich_text_section",
//           elements: [{ type: "text", text: t }],
//         }],
//       }];
//     }

//     // Try to resolve primary/text column id ("Item"/"Task") by scanning existing rows
//     async function resolveTitleColId(listId) {
//       const probe = await slackJson("slackLists.items.list", { list_id: listId, limit: 50 });
//       if (!probe?.ok) return null;

//       // Heuristics: prefer a text field whose key looks like 'item' or 'task'
//       let fallback = null;
//       for (const it of probe.items || []) {
//         for (const f of it.fields || []) {
//           const key = (f.key || "").toLowerCase();
//           const hasText = !!f.text || Array.isArray(f.rich_text);
//           if (f.column_id && hasText) {
//             if (key.includes("item") || key.includes("task")) return f.column_id;
//             if (!fallback) fallback = f.column_id;
//           }
//         }
//       }
//       return fallback; // first text-like field if we didn't find a perfect match
//     }

//     // Find the PN/SN column id by scanning for a field with key or text like "PN" / "SN"
//     async function resolvePnSnColId(listId) {
//       const probe = await slackJson("slackLists.items.list", { list_id: listId, limit: 100 });
//       if (!probe?.ok) return null;

//       let candidate = null;
//       for (const it of probe.items || []) {
//         for (const f of it.fields || []) {
//           if (!f.column_id) continue;
//           const key = (f.key || "").toLowerCase();
//           const text = (f.text || "").toLowerCase();

//           const looksPnSn =
//             key.includes("pn") || key.includes("sn") ||
//             text.includes("pn:") || text.includes("sn:");

//           if (looksPnSn) return f.column_id;
//           if (!candidate && (key.includes("part") || key.includes("serial"))) {
//             candidate = f.column_id;
//           }
//         }
//       }
//       return candidate;
//     }

//     // 1) Resolve columns
//     const titleColId = await resolveTitleColId(list_id);
//     if (!titleColId) {
//       return res.status(400).json({ ok: false, error: "could_not_resolve_title_column" });
//     }

//     // 2) Create the item with the title in the title column (must use initial_fields with a real column_id)
//     const safeTitle = plain(title) || "New Item";
//     const createBody = {
//       list_id,
//       initial_fields: [{ column_id: titleColId, rich_text: toRichText(safeTitle) }],
//     };

//     const created = await slackJson("slackLists.items.create", createBody);
//     if (!created?.ok) {
//       return res.status(200).json({
//         ok: false,
//         error: created?.error || "create_failed",
//         mode: "list",
//         sent: createBody,
//       });
//     }

//     // 3) (Minimal) update: PN/SN only, per your request
//     const pn0 = Array.isArray(pn) ? pn[0] : pn;
//     const sn0 = Array.isArray(sn) ? sn[0] : sn;
//     const pnPart = plain(pn0) ? `PN: ${plain(pn0)}` : "";
//     const snPart = plain(sn0) ? `SN: ${plain(sn0)}` : "";
//     const pnSnText = [pnPart, snPart].filter(Boolean).join("  ");

//     let updated = null;
//     let usedPnSnCol = null;

//     if (pnSnText) {
//       const pnSnColId = await resolvePnSnColId(list_id);
//       if (pnSnColId) {
//         const cells = [{
//           row_id: created.item.id,
//           column_id: pnSnColId,
//           rich_text: toRichText(pnSnText),
//         }];

//         updated = await slackJson("slackLists.items.update", { list_id, cells });
//         usedPnSnCol = pnSnColId;
//         // If update fails, we still return ok:false so you can see the error
//         if (!updated?.ok) {
//           return res.status(200).json({
//             ok: false,
//             error: updated?.error || "update_failed",
//             mode: "list",
//             list_id,
//             item_id: created.item.id,
//             used_title_col: titleColId,
//             used_pnsn_col: usedPnSnCol,
//           });
//         }
//       }
//     }

//     return res.status(200).json({
//       ok: true,
//       mode: "list",
//       list_id,
//       item_id: created.item.id,
//       used_title_col: titleColId,
//       used_pnsn_col: usedPnSnCol || null,
//       sent_title: safeTitle,
//     });
//   } catch (err) {
//     console.error("API /slack/add-to-list crashed:", err);
//     return res.status(500).json({ ok: false, error: "exception", message: err?.message || String(err) });
//   }
// }

// pages/api/slack/add-to-list.js
export default async function handler(req, res) {
  const t0 = Date.now();
  const steps = [];
  const logStep = (step, extra = {}) =>
    steps.push({ t: new Date().toISOString(), step, ...extra });

  try {
    if (req.method !== "POST") {
      return res.status(405).json({ ok: false, error: "method_not_allowed" });
    }

    const { requireFirebaseAuth } = await import("../../../utils/apiAuth");
    const authUser = await requireFirebaseAuth(req, res);
    if (res.writableEnded) return;

    const token = process.env.SLACK_BOT_TOKEN;
    if (!token) {
      return res
        .status(500)
        .json({ ok: false, error: "missing_SLACK_BOT_TOKEN" });
    }

    // ---------- payload from client ----------
    const {
      listKey,          // "tasks" | "shipping" | "receiving" | "tools"
      title,            // item title
      pn_sn,            // preferred input: "PN: 123  SN: 456"
      work_order,       // preferred input
      tracking,
      local_sn,         // preferred input
      description,
      submittedByEmail,
      userEmail,
      photoUrls,        // preferred input: array
      shipping_date,
      received_date,
      arrival_date,
      departure_date,
      movement_date,
      // legacy keys we still accept for safety:
      pn, sn, workOrder, localSN, trackingNumber, photo_urls, photos,
    } = req.body || {};

    // Normalize inputs so both old & new callers work
    const plain = (v) => (v ?? "").toString().trim();

    const pn_sn_norm = (() => {
      if (plain(pn_sn)) return plain(pn_sn);
      const pn0 = plain(pn);
      const sn0 = plain(sn);
      const parts = [];
      if (pn0) parts.push(`PN: ${pn0}`);
      if (sn0) parts.push(`SN: ${sn0}`);
      return parts.join("  ");
    })();

    const work_order_norm = plain(work_order || workOrder || "");
    const local_sn_norm   = plain(local_sn   || localSN   || "");
    const tracking_norm   = plain(tracking   || trackingNumber || "");
    const submitterEmail = plain(authUser?.email || "");
    const submitterLabel = submitterEmail || "unknown";
    const appendSubmitterToDescription = (text) => {
      const base = plain(text);
      return [base, `Submitted by ${submitterLabel}`].filter(Boolean).join("\n");
    };
    const description_norm = appendSubmitterToDescription(description);
    const envValue = (value) => plain(value).replace(/\s+#.*$/, "").trim();
    const dateOnly = (value) => {
      const text = plain(value);
      if (!text) return "";
      const match = text.match(/^\d{4}-\d{2}-\d{2}/);
      if (match) return match[0];
      const parsed = new Date(text);
      return Number.isNaN(parsed.getTime()) ? "" : parsed.toISOString().slice(0, 10);
    };

    let photoUrls_norm = Array.isArray(photoUrls)
      ? photoUrls
      : Array.isArray(photo_urls)
      ? photo_urls
      : Array.isArray(photos)
      ? photos
      : [];

    // ---------- env: list + column ids ----------
    const LIST_IDS = {
      tasks:     envValue(process.env.SLACK_LIST_TASKS_ID),
      shipping:  envValue(process.env.SLACK_LIST_SHIPPING_ID),
      receiving: envValue(process.env.SLACK_LIST_RECEIVING_ID),
      tools:     envValue(process.env.SLACK_LIST_TOOLS_ID),
    };

    const COLS = {
      tasks: {
        title: envValue(process.env.SLACK_LIST_TASKS_TITLE_COL),
        desc:  envValue(process.env.SLACK_LIST_TASKS_DESCRIPTION_COL),
      },
      shipping: {
        title:     envValue(process.env.SLACK_LIST_SHIPPING_TITLE_COL),
        desc:      envValue(process.env.SLACK_LIST_SHIPPING_DESCRIPTION_COL),
        pnsn:      envValue(process.env.SLACK_LIST_SHIPPING_PNSN_COL),
        wo:        envValue(process.env.SLACK_LIST_SHIPPING_WO_COL),
        localsn:   envValue(process.env.SLACK_LIST_SHIPPING_LOCALSN_COL),
        tracking:  envValue(process.env.SLACK_LIST_SHIPPING_TRACKING_COL),
        photos:    envValue(process.env.SLACK_LIST_SHIPPING_PHOTOS_COL),
        date:      envValue(process.env.SLACK_LIST_SHIPPING_DATE_COL),
      },
      receiving: {
        title:     envValue(process.env.SLACK_LIST_RECEIVING_TITLE_COL),
        desc:      envValue(process.env.SLACK_LIST_RECEIVING_DESCRIPTION_COL),
        pnsn:      envValue(process.env.SLACK_LIST_RECEIVING_PNSN_COL),
        wo:        envValue(process.env.SLACK_LIST_RECEIVING_WO_COL),
        localsn:   envValue(process.env.SLACK_LIST_RECEIVING_LOCALSN_COL),
        tracking:  envValue(process.env.SLACK_LIST_RECEIVING_TRACKING_COL),
        photos:    envValue(process.env.SLACK_LIST_RECEIVING_PHOTOS_COL),
        date:      envValue(process.env.SLACK_LIST_RECEIVING_DATE_COL),
      },
      tools: {
        title:  envValue(process.env.SLACK_LIST_TOOLS_TITLE_COL),
        wo:     envValue(process.env.SLACK_LIST_TOOLS_WO_COL),
        photos: envValue(process.env.SLACK_LIST_TOOLS_PHOTOS_COL),
      },
    };

    const list_id = LIST_IDS[listKey];
    const CFG = { ...(COLS[listKey] || {}) };
    if (!list_id) {
      const missingEnv =
        listKey === "tools"
          ? "SLACK_LIST_TOOLS_ID"
          : `SLACK_LIST_${String(listKey || "").toUpperCase()}_ID`;
      return res
        .status(400)
        .json({
          ok: false,
          error: `missing_${missingEnv}`,
          message: `${missingEnv} is required for listKey "${listKey}".`,
        });
    }

    // ---------- helpers ----------
    async function slackJson(method, payload) {
      const r = await fetch(`https://slack.com/api/${method}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(payload),
      });
      const json = await r.json();
      return json;
    }

    async function slackForm(method, payload) {
      const body = new URLSearchParams();
      Object.entries(payload || {}).forEach(([key, value]) => {
        if (value === undefined || value === null) return;
        body.append(key, String(value));
      });

      const r = await fetch(`https://slack.com/api/${method}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
      });
      return r.json();
    }

    function richText(text) {
      const t = plain(text);
      return [
        {
          type: "rich_text",
          elements: [
            {
              type: "rich_text_section",
              elements: [{ type: "text", text: t || "" }],
            },
          ],
        },
      ];
    }

    async function inferColumnsFromRows(listId) {
      const probe = await slackJson("slackLists.items.list", {
        list_id: listId,
        limit: 20,
      });
      if (!probe?.ok) return {};

      const inferred = {};
      for (const it of probe.items || []) {
        for (const f of it.fields || []) {
          const key = String(f.key || "").toLowerCase();
          if (!inferred.title && f.column_id && key === "name") {
            inferred.title = f.column_id;
          }
          if (
            !inferred.photos &&
            f.column_id &&
            (Array.isArray(f.attachment) || Array.isArray(f.files))
          ) {
            inferred.photos = f.column_id;
          }
          if (
            !inferred.wo &&
            f.column_id &&
            (key.includes("work") || key.includes("wo"))
          ) {
            inferred.wo = f.column_id;
          }
          if (!inferred.date && f.column_id && Array.isArray(f.date)) {
            inferred.date = f.column_id;
          }
        }
      }
      return inferred;
    }

    async function inferColumnsFromListMetadata(listId) {
      const listed = await slackJson("slackLists.items.list", {
        list_id: listId,
        limit: 1,
      });
      const firstRowId = listed?.items?.[0]?.id;
      if (!listed?.ok || !firstRowId) return {};

      const info = await slackJson("slackLists.items.info", {
        list_id: listId,
        id: firstRowId,
      });
      if (!info?.ok) return {};

      const schema = Array.isArray(info?.list?.list_metadata?.schema)
        ? info.list.list_metadata.schema
        : [];
      const inferred = {};
      const normalizedName = (column) =>
        `${column?.name || ""} ${column?.key || ""}`.toLowerCase();

      const titleColumn =
        schema.find((column) => column?.is_primary_column && column?.type === "text") ||
        schema.find(
          (column) =>
            column?.type === "text" &&
            (column?.key === "name" || normalizedName(column).includes("name"))
        );
      const photosColumn = schema.find(
        (column) =>
          column?.type === "attachment" ||
          normalizedName(column).includes("picture") ||
          normalizedName(column).includes("photo")
      );
      const workOrderColumn = schema.find(
        (column) =>
          column?.type === "text" &&
          (normalizedName(column).includes("work order") ||
            normalizedName(column).includes("workorder") ||
            normalizedName(column).includes("wo"))
      );
      const dateColumn = schema.find((column) => {
        if (column?.type !== "date") return false;
        const name = normalizedName(column);
        if (listKey === "shipping") return name.includes("shipping date");
        if (listKey === "receiving") return name.includes("received date");
        return name.includes("date");
      });

      if (titleColumn?.id) inferred.title = titleColumn.id;
      if (photosColumn?.id) inferred.photos = photosColumn.id;
      if (workOrderColumn?.id) inferred.wo = workOrderColumn.id;
      if (dateColumn?.id) inferred.date = dateColumn.id;
      return inferred;
    }

    const safeFilenameFromUrl = (url, i) => {
      try {
        // last path piece (may be the encoded "Parts%2F...jpg")
        const last = (url.split("/").pop() || "").split("?")[0];
        // decode, THEN take last segment again (in case it contains '/')
        const decoded = decodeURIComponent(last);
        const basename = decoded.split("/").pop() || decoded;
        // replace anything unsafe (slashes, spaces, etc.)
        const safe = basename.replace(/[^\w.\-]+/g, "_");
        return safe || `photo_${i + 1}.jpg`;
      } catch {
        return `photo_${i + 1}.jpg`;
      }
    };

    if (!CFG.title || !CFG.photos || !CFG.wo || !CFG.date) {
      const metadataInferred = await inferColumnsFromListMetadata(list_id);
      const rowInferred = await inferColumnsFromRows(list_id);
      CFG.title = CFG.title || metadataInferred.title || rowInferred.title;
      CFG.photos = CFG.photos || metadataInferred.photos || rowInferred.photos;
      CFG.wo = CFG.wo || metadataInferred.wo || rowInferred.wo;
      CFG.date = CFG.date || metadataInferred.date || rowInferred.date;
      logStep("[LISTS][INFER-COLS]", {
        title: CFG.title || null,
        photos: CFG.photos || null,
        wo: CFG.wo || null,
        date: CFG.date || null,
      });
    }

    if (!CFG.title) {
      return res
        .status(400)
        .json({ ok: false, error: "missing_title_column_env", debug: { steps } });
    }

    // ---------- 1) create the row with title ----------
    const titleText = plain(title) || "Untitled item";
    const createPayload = {
      list_id,
      initial_fields: [{ column_id: CFG.title, rich_text: richText(titleText) }],
    };

    const created = await slackJson("slackLists.items.create", createPayload);
    logStep("[LISTS][CREATE-RICH]", {
      ok: created?.ok === true,
      status: 200,
      error: created?.error,
    });
    if (!created?.ok) {
      const createMessage =
        created?.error === "list_not_found" && listKey === "tools"
          ? "Slack could not write to LAKE FOREST TOOLS. Add the Magmo Slack app/bot to that channel/list or recreate/share the list with the app, then retry."
          : undefined;
      return res
        .status(200)
        .json({
          ok: false,
          error: created?.error || "create_failed",
          message: createMessage,
          debug: { steps },
        });
    }
    const rowId = created.item?.id;
    logStep("[LISTS][CREATED]", { rowId });

    // ---------- 2) update rich_text fields ----------
    const listDateNorm =
      listKey === "shipping"
        ? dateOnly(shipping_date || departure_date || movement_date)
        : listKey === "receiving"
        ? dateOnly(received_date || arrival_date || movement_date)
        : "";
    const cells = [];
    if (CFG.pnsn && pn_sn_norm)      cells.push({ row_id: rowId, column_id: CFG.pnsn,     rich_text: richText(pn_sn_norm) });
    if (CFG.localsn && local_sn_norm) cells.push({ row_id: rowId, column_id: CFG.localsn,  rich_text: richText(local_sn_norm) });
    if (CFG.wo && work_order_norm)   cells.push({ row_id: rowId, column_id: CFG.wo,       rich_text: richText(work_order_norm) });
    if (CFG.tracking && tracking_norm) cells.push({ row_id: rowId, column_id: CFG.tracking, rich_text: richText(tracking_norm) });
    if (CFG.desc && description_norm) cells.push({ row_id: rowId, column_id: CFG.desc,     rich_text: richText(description_norm) });
    if (CFG.date && listDateNorm)    cells.push({ row_id: rowId, column_id: CFG.date,      date: [listDateNorm] });

    if (cells.length) {
      const updated = await slackJson("slackLists.items.update", {
        list_id,
        cells,
      });

      if (CFG.pnsn && pn_sn_norm)       logStep("[LISTS][SET-RICH][PN/SN]",       { ok: updated?.ok === true, status: 200, error: updated?.error });
      if (CFG.localsn && local_sn_norm)  logStep("[LISTS][SET-RICH][LOCAL_SN]",    { ok: updated?.ok === true, status: 200, error: updated?.error });
      if (CFG.desc && description_norm)  logStep("[LISTS][SET-RICH][DESCRIPTION]", { ok: updated?.ok === true, status: 200, error: updated?.error });
      if (CFG.wo && work_order_norm)     logStep("[LISTS][SET-RICH][WO]",          { ok: updated?.ok === true, status: 200, error: updated?.error });
      if (CFG.tracking && tracking_norm) logStep("[LISTS][SET-RICH][TRACKING]",    { ok: updated?.ok === true, status: 200, error: updated?.error });
      if (CFG.date && listDateNorm)      logStep("[LISTS][SET-DATE]",              { ok: updated?.ok === true, status: 200, error: updated?.error, date: listDateNorm });

      if (!updated?.ok) {
        return res
          .status(200)
          .json({ ok: false, error: updated?.error || "update_failed", debug: { steps } });
      }
    }

    // ---------- 3) upload photos ----------
    async function uploadViaExternal(fileUrl, filename) {
      // 3a. fetch bytes
      const resp = await fetch(fileUrl);
      const buf = await resp.arrayBuffer();
      const byteLen = buf.byteLength;
      logStep("[FILES.BYTES]", { byteLen, filename });

      // 3b. get upload url (filename MUST be a single segment; no '/')
      const up = await slackForm("files.getUploadURLExternal", {
        filename,
        length: String(byteLen),
      });
      logStep("[FILES.GETUPLOAD]", {
        ok: up?.ok === true,
        status: 200,
        byteLen,
        filename,
        error: up?.error,
        messages: up?.response_metadata?.messages || null,
      });
      if (!up?.ok || !up?.upload_url || !up?.file_id)
        return { ok: false, error: up?.error || "get_upload_url_failed" };

      // 3c. post bytes to the upload_url
      const post = await fetch(up.upload_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/octet-stream",
        },
        body: Buffer.from(buf),
      });
      logStep("[FILES.UPLOAD.POST]", { ok: post?.ok === true, status: post?.status });
      if (!post.ok) return { ok: false, error: "upload_post_failed" };

      // 3d. complete
      const complete = await slackForm("files.completeUploadExternal", {
        files: JSON.stringify([{ id: up.file_id, title: filename }]),
      });
      logStep("[FILES.COMPLETE]", { ok: complete?.ok === true, status: 200, error: complete?.error });
      if (!complete?.ok) return { ok: false, error: complete?.error || "complete_failed" };

      return { ok: true, file: { id: up.file_id } };
    }

    async function attachFilesToCell(listId, row, col, fileIds) {
      // Try a few shapes. Different list column types accept different shapes.
      // A) "attachment": [ "F..." ]
      let r = await slackJson("slackLists.items.update", {
        list_id: listId,
        cells: [{ row_id: row, column_id: col, attachment: fileIds }],
      });
      logStep("[LISTS][ATTACH-A][PHOTOS]", { ok: r?.ok === true, status: 200, error: r?.error });
      if (r?.ok) return r;

      // B) "files": [{ id: 'F...' }]
      r = await slackJson("slackLists.items.update", {
        list_id: listId,
        cells: [{ row_id: row, column_id: col, files: fileIds.map((id) => ({ id })) }],
      });
      logStep("[LISTS][ATTACH-B][PHOTOS]", { ok: r?.ok === true, status: 200, error: r?.error });
      if (r?.ok) return r;

      // C) "files": [{ file_id: 'F...' }]
      r = await slackJson("slackLists.items.update", {
        list_id: listId,
        cells: [{ row_id: row, column_id: col, files: fileIds.map((id) => ({ file_id: id })) }],
      });
      logStep("[LISTS][ATTACH-C][PHOTOS]", { ok: r?.ok === true, status: 200, error: r?.error });
      if (r?.ok) return r;

      // D) "reference": [{ file: { file_id: 'F...' } }]
      r = await slackJson("slackLists.items.update", {
        list_id: listId,
        cells: [{
          row_id: row,
          column_id: col,
          reference: fileIds.map((id) => ({ file: { file_id: id } })),
        }],
      });
      logStep("[LISTS][ATTACH-D][PHOTOS]", { ok: r?.ok === true, status: 200, error: r?.error });

      return r;
    }

    let attachedOk = false;
    let uploadedFileIds = [];

    if (CFG.photos && Array.isArray(photoUrls_norm) && photoUrls_norm.length) {
      for (let i = 0; i < Math.min(photoUrls_norm.length, 10); i++) {
        const url = plain(photoUrls_norm[i]);
        if (!/^https?:\/\//i.test(url)) continue;

        const filename = safeFilenameFromUrl(url, i);
        const up = await uploadViaExternal(url, filename);
        logStep("[PHOTOS][UPLOADED]", {
          ok: up?.ok === true,
          file_id: up?.file?.id,
          filename,
        });
        if (up?.ok && up.file?.id) uploadedFileIds.push(up.file.id);
      }

      if (uploadedFileIds.length) {
        const att = await attachFilesToCell(
          list_id,
          rowId,
          CFG.photos,
          uploadedFileIds
        );
        attachedOk = !!att?.ok;
        if (!attachedOk) {
          logStep("[PHOTOS][FAILED-ATTACH]", {
            error: att?.error,
            ids: uploadedFileIds,
          });
        }
      } else {
        logStep("[PHOTOS][NO-IDS]", { reason: "upload_failed_or_empty" });
      }
    }

    let opsMovement = null;
    if (
      work_order_norm &&
      (listKey === "shipping" || listKey === "receiving")
    ) {
      try {
        const { recordOpsInventoryMovement } = await import(
          "../../../lib/ops/workOrders"
        );
        opsMovement = await recordOpsInventoryMovement({
          workOrderNumber: work_order_norm,
          direction: listKey,
          itemId: local_sn_norm,
          partName: local_sn_norm
            ? titleText.replace(
                new RegExp(
                  `\\s*\\(${local_sn_norm.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\$&")}\\)\\s*$`,
                  "i"
                ),
                ""
              )
            : titleText,
          pnSn: pn_sn_norm,
          tracking: tracking_norm,
          description: plain(description),
          recordedBy: submitterEmail,
          sourceId: `${list_id}-${rowId}`,
        });
        logStep("[OPS][WORK-ORDER-MOVEMENT]", opsMovement);
      } catch (opsError) {
        opsMovement = {
          attached: false,
          reason: "ops_write_failed",
        };
        logStep("[OPS][WORK-ORDER-MOVEMENT]", {
          attached: false,
          error: opsError?.message || String(opsError),
        });
      }
    }

    return res.status(200).json({
      ok: true,
      list_id,
      item_id: rowId,
      used_cols: {
        title_col: CFG.title || null,
        pnsn_col: CFG.pnsn || null,
        description_col: CFG.desc || null,
        workorder_col: CFG.wo || null,
        localsn_col: CFG.localsn || null,
        tracking_col: CFG.tracking || null,
        photos_col: CFG.photos || null,
        date_col: CFG.date || null,
      },
      debug: { steps, photos: uploadedFileIds, photosAttached: attachedOk },
      opsMovement,
      ms: Date.now() - t0,
    });
  } catch (err) {
    logStep("[EXCEPTION]", { message: err?.message });
    console.error("API /slack/add-to-list crashed:", err);
    return res
      .status(500)
      .json({
        ok: false,
        error: "exception",
        message: err?.message || String(err),
        debug: { steps },
      });
  }
}

