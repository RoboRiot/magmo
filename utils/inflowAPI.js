// // inflowAPI.js

// const BASE_URL   = 'https://cloudapi.inflowinventory.com';
// const COMPANY_ID = 'e28dc600-32a4-4438-a374-68df72caebbd';
// // (Move this to env vars in prod)
// const API_KEY    = '10336E10F0BF982AB7AEB639D2FEB3B2B1C9BD73634D153EA81EE2130A70F9C4-1';

// const headers = {
//   'Authorization': `Bearer ${API_KEY}`,
//   'Content-Type':  'application/json',
//   // Use the latest you saw in server responses; older also works, but stay current:
//   'Accept':        'application/json;version=2025-06-24',
// };

// async function parseErr(res) {
//   const t = await res.text();
//   try { return JSON.parse(t); } catch { return t; }
// }

// // --- Look up existing product by name on the collection endpoint ---
// // Use filter[name] if your tenant supports it; otherwise fall back to filter[smart].
// async function findProductByName(name) {
//   // Try exact name filter first
//   let url = `${BASE_URL}/${COMPANY_ID}/products?filter[name]=${encodeURIComponent(name)}&count=1`;
//   let res = await fetch(url, { headers });
//   if (res.ok) {
//     const data = await res.json();
//     const items = Array.isArray(data?.items) ? data.items : (Array.isArray(data) ? data : []);
//     if (items.length) return items[0];
//   }
//   // Fallback: smart filter (searches common fields)
//   url = `${BASE_URL}/${COMPANY_ID}/products?filter[smart]=${encodeURIComponent(name)}&count=1`;
//   res = await fetch(url, { headers });
//   if (!res.ok) return null;
//   const data2 = await res.json();
//   const items2 = Array.isArray(data2?.items) ? data2.items : (Array.isArray(data2) ? data2 : []);
//   return items2.length ? items2[0] : null;
// }

// class InflowAPI {
//   /**
//    * Upsert a product in inFlow via PUT to the collection.
//    * @param {{ productId?: string, name: string, description: string, imageUrls?: string[], sku?: string }} params
//    */
//   static async upsertProduct({ productId, name, description, imageUrls = [], sku }) {
//     if (!name || !name.trim()) throw new Error('Name is required');

//     // If no productId, check if one already exists with this name to avoid the unique-name error.
//     if (!productId) {
//       const existing = await findProductByName(name.trim());
//       if (existing && (existing.productId || existing.id)) {
//         productId = existing.productId || existing.id;
//       }
//     }

//     // If still no id, generate one (this matched your previously-working flow)
//     const id = productId || crypto.randomUUID();

//     // Build the payload exactly like your original—PUT to the collection with productId
//     const payload = {
//       productId: id,
//       name,
//       description,
//       ...(sku ? { sku } : {}),
//       ...(imageUrls.length > 0 && {
//         images: imageUrls.map(u => ({
//           imageId: crypto.randomUUID(),
//           originalUrl: u,
//         })),
//       }),
//     };

//     const url = `${BASE_URL}/${COMPANY_ID}/products`;
//     const res = await fetch(url, {
//       method: 'PUT',
//       headers,
//       body: JSON.stringify(payload),
//     });

//     if (!res.ok) {
//       const err = await parseErr(res);
//       throw new Error(`inFlow API error (${res.status}): ${typeof err === 'string' ? err : JSON.stringify(err)}`);
//     }

//     return res.json();
//   }
// }

// export default InflowAPI;

// utils/inflowAPI.js (only the changed bits)

const BASE_URL   = 'https://cloudapi.inflowinventory.com';
const COMPANY_ID = 'e28dc600-32a4-4438-a374-68df72caebbd';
const API_KEY    = '10336E10F0BF982AB7AEB639D2FEB3B2B1C9BD73634D153EA81EE2130A70F9C4-1';

const headers = {
  Authorization: `Bearer ${API_KEY}`,
  'Content-Type': 'application/json',
  // stick to a stable version you know works in your tenant:
  Accept: 'application/json;version=2024-10-01',
};

const n = s => (s ?? '').toString().trim();

async function parseText(res) {
  const t = await res.text();
  try { return { json: JSON.parse(t), raw: t }; }
  catch { return { json: null, raw: t }; }
}

// ---- EXACT lookup helpers (no fuzzy/SMART fallback) ------------------------

async function findProductIdByExactName(name) {
  const nameNorm = n(name);
  if (!nameNorm) return null;

  const url = `${BASE_URL}/${COMPANY_ID}/products?filter[name]=` +
              `${encodeURIComponent(nameNorm)}&count=1`;
  const res = await fetch(url, { headers });
  if (!res.ok) return null;

  const data = await res.json();
  const items = Array.isArray(data?.items) ? data.items
              : Array.isArray(data)          ? data
              : [];
  const item = items[0];
  if (!item) return null;

  // guard: only accept if name is an exact (case-insensitive) match
  if (n(item.name).toLowerCase() !== nameNorm.toLowerCase()) return null;
  return item.productId || item.id || null;
}

// Prefer direct GET /products/{id}; fallback to collection filter by id
async function getProductById(productId) {
  // Try item endpoint
  let res = await fetch(`${BASE_URL}/${COMPANY_ID}/products/${encodeURIComponent(productId)}`, { headers });
  if (res.ok) return res.json();

  // Fallback: filter by id on collection
  res = await fetch(`${BASE_URL}/${COMPANY_ID}/products?filter[productId]=${encodeURIComponent(productId)}&count=1`, { headers });
  if (!res.ok) return null;
  const data = await res.json();
  const items = Array.isArray(data?.items) ? data.items
              : Array.isArray(data)          ? data
              : [];
  return items[0] || null;
}

function buildImages(imageUrls = []) {
  return imageUrls
    .filter(Boolean)
    .map(u => ({ imageId: crypto.randomUUID(), originalUrl: u }));
}

class InflowAPI {
  /**
   * Strict upsert: exact-name reuse only; verify by id afterward.
   */
  static async upsertProduct({ productId, name, description, imageUrls = [], sku, customFields }) {
    const nameNorm = n(name);
    if (!nameNorm) throw new Error('Name is required');

    // Only reuse an id if the name is an exact match. No SMART search.
    if (!productId) productId = await findProductIdByExactName(nameNorm);
    const id = productId || crypto.randomUUID();

    const payload = {
      productId: id,
      name: nameNorm,
      isActive: true, // ← keep new items visible in the UI
      ...(n(description) ? { description: n(description) } : {}),
      ...(n(sku) ? { sku: n(sku) } : {}),
      ...(imageUrls.length ? { images: buildImages(imageUrls) } : {}),
      ...(customFields && Object.keys(customFields).length ? { customFields } : {}),
    };

    console.log('[inFlow] PUT payload:', payload);
    const res = await fetch(`${BASE_URL}/${COMPANY_ID}/products`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(payload),
    });

    const { json, raw } = await parseText(res);
    console.log('[inFlow] Raw PUT response:', res.status, raw);

    if (!res.ok) {
      throw new Error(`inFlow API error (${res.status}): ${raw}`);
    }

    // prefer the id the server gave us (if any), else the one we sent
    const resolvedId = (json && (json.productId || json.id)) || id;

    // Verify by ID only (no fuzzy). This prevents false “success”.
    const after = await getProductById(resolvedId);
    console.log('[inFlow] Verified by ID:', {
      productId: resolvedId,
      name: after?.name,
      sku: after?.sku,
      // many tenants surface one of these; log whatever exists so you can tell if it’s hidden
      isActive: after?.isActive ?? after?.active ?? after?.status,
      categoryId: after?.categoryId,
    });

    if (!after) {
      throw new Error('Write appeared to succeed, but GET by id returned nothing.');
    }

    return after;
  }
}

export default InflowAPI;
