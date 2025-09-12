// pages/api/slack/inspect-list.js
export default async function handler(req, res) {
  const token = process.env.SLACK_BOT_TOKEN;
  const { listId } = req.query;
  if (!token || !listId) return res.status(400).json({ error: "token or listId missing" });

  const out = await fetch("https://slack.com/api/slackLists.items.list", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: new URLSearchParams({ list_id: listId, limit: "5" }),
  }).then(r => r.json());

  res.status(200).json(out);
}
