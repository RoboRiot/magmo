const { buildOpenApiSpec } = require("../../../lib/ops/ingestContract.cjs");

export default function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed." });
  }
  res.setHeader("Cache-Control", "public, max-age=300");
  return res.status(200).json(buildOpenApiSpec());
}
