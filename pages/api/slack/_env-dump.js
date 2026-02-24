// pages/api/_env-dump.js
if (!process.env.SLACK_BOT_TOKEN) {
  try {
    const path = require("path");
    require("dotenv").config({ path: path.join(process.cwd(), ".env.local") });
  } catch {}
}

export default function handler(req, res) {
  if (process.env.NODE_ENV === "production") {
    res.status(404).json({ error: "Not found" });
    return;
  }

  res.status(200).json({
    cwd: process.cwd(),
    TASKS_ID: process.env.SLACK_LIST_TASKS_ID || null,
    SHIPPING_ID: process.env.SLACK_LIST_SHIPPING_ID || null,
    RECEIVING_ID: process.env.SLACK_LIST_RECEIVING_ID || null,

    TASKS_TITLE_COL: process.env.SLACK_LIST_TASKS_TITLE_COL || null,
    SHIPPING_TITLE_COL: process.env.SLACK_LIST_SHIPPING_TITLE_COL || null,
    RECEIVING_TITLE_COL: process.env.SLACK_LIST_RECEIVING_TITLE_COL || null,
  });
}
