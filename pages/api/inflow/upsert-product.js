const BASE_URL = "https://cloudapi.inflowinventory.com";

const n = (value) => (value ?? "").toString().trim();

async function parseText(res) {
  const text = await res.text();
  try {
    return { json: JSON.parse(text), raw: text };
  } catch {
    return { json: null, raw: text };
  }
}

function getConfig() {
  const companyId = process.env.INFLOW_COMPANY_ID;
  const apiKey = process.env.INFLOW_API_KEY;
  if (!companyId || !apiKey) {
    const error = new Error("inFlow API is not configured.");
    error.statusCode = 503;
    throw error;
  }
  return {
    companyId,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      Accept: "application/json;version=2024-10-01",
    },
  };
}

async function findProductIdByExactName(name, config) {
  const nameNorm = n(name);
  if (!nameNorm) return null;

  const url =
    `${BASE_URL}/${config.companyId}/products?filter[name]=` +
    `${encodeURIComponent(nameNorm)}&count=1`;
  const res = await fetch(url, { headers: config.headers });
  if (!res.ok) return null;

  const data = await res.json();
  const items = Array.isArray(data?.items)
    ? data.items
    : Array.isArray(data)
    ? data
    : [];
  const item = items[0];
  if (!item) return null;

  if (n(item.name).toLowerCase() !== nameNorm.toLowerCase()) return null;
  return item.productId || item.id || null;
}

async function getProductById(productId, config) {
  let res = await fetch(
    `${BASE_URL}/${config.companyId}/products/${encodeURIComponent(productId)}`,
    { headers: config.headers }
  );
  if (res.ok) return res.json();

  res = await fetch(
    `${BASE_URL}/${config.companyId}/products?filter[productId]=${encodeURIComponent(
      productId
    )}&count=1`,
    { headers: config.headers }
  );
  if (!res.ok) return null;
  const data = await res.json();
  const items = Array.isArray(data?.items)
    ? data.items
    : Array.isArray(data)
    ? data
    : [];
  return items[0] || null;
}

function buildImages(imageUrls = []) {
  return imageUrls
    .filter(Boolean)
    .map((url) => ({ imageId: crypto.randomUUID(), originalUrl: url }));
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method Not Allowed" });
  }

  const { requireFirebaseAuth } = await import("../../../utils/apiAuth");
  await requireFirebaseAuth(req, res);
  if (res.writableEnded) return;

  try {
    const config = getConfig();
    const {
      productId: incomingProductId,
      name,
      description,
      imageUrls = [],
      sku,
      customFields,
    } = req.body || {};

    const nameNorm = n(name);
    if (!nameNorm) {
      return res.status(400).json({ ok: false, error: "Name is required." });
    }

    const productId =
      incomingProductId || (await findProductIdByExactName(nameNorm, config));
    const id = productId || crypto.randomUUID();

    const payload = {
      productId: id,
      name: nameNorm,
      isActive: true,
      ...(n(description) ? { description: n(description) } : {}),
      ...(n(sku) ? { sku: n(sku) } : {}),
      ...(Array.isArray(imageUrls) && imageUrls.length
        ? { images: buildImages(imageUrls) }
        : {}),
      ...(customFields && Object.keys(customFields).length
        ? { customFields }
        : {}),
    };

    const upsert = await fetch(`${BASE_URL}/${config.companyId}/products`, {
      method: "PUT",
      headers: config.headers,
      body: JSON.stringify(payload),
    });
    const { json, raw } = await parseText(upsert);

    if (!upsert.ok) {
      return res.status(upsert.status).json({
        ok: false,
        error: "inFlow API error.",
        details: raw,
      });
    }

    const resolvedId = (json && (json.productId || json.id)) || id;
    const after = await getProductById(resolvedId, config);
    if (!after) {
      return res.status(502).json({
        ok: false,
        error: "Write appeared to succeed, but GET by id returned nothing.",
      });
    }

    return res.status(200).json({ ok: true, product: after });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      ok: false,
      error: error.message || "inFlow upsert failed.",
    });
  }
}
