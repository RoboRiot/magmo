// inflowAPI.js

const BASE_URL  = 'https://cloudapi.inflowinventory.com';
const COMPANY_ID = 'e28dc600-32a4-4438-a374-68df72caebbd';
const API_KEY    = '10336E10F0BF982AB7AEB639D2FEB3B2B1C9BD73634D153EA81EE2130A70F9C4-1';

class InflowAPI {
  /**
   * Insert or update a product in inFlow.
   * @param {{ productId?: string, name: string, description: string, imageUrls?: string[] }} params
   */
  static async upsertProduct({ productId, name, description, imageUrls = [] }) {
    // Generate a new GUID if none provided
    const id = productId || crypto.randomUUID();

    const url = `${BASE_URL}/${COMPANY_ID}/products`;

    // Build payload and include images in the body
    const payload = {
      productId: id,
      name,
      description,
      // Only include `images` if we actually have URLs
      ...(imageUrls.length > 0 && {
        images: imageUrls.map(u => ({
          imageId: crypto.randomUUID(),   // must supply a valid imageId
          originalUrl: u
        }))
      })
    };

    const res = await fetch(url, {
      method: 'PUT',  // write requests use PUT :contentReference[oaicite:0]{index=0}
      headers: {
        'Authorization': `Bearer ${API_KEY}`,           // auth header :contentReference[oaicite:1]{index=1}
        'Content-Type':  'application/json',
        'Accept':        'application/json;version=2024-10-01'
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`inFlow API error (${res.status}): ${errText}`);
    }

    return res.json();
  }
}

export default InflowAPI;
