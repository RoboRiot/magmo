import firebase from "../context/Firebase";

class InflowAPI {
  static async upsertProduct(payload) {
    const idToken = await firebase.auth().currentUser?.getIdToken();
    const response = await fetch("/api/inflow/upsert-product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(idToken ? { Authorization: `Bearer ${idToken}` } : {}),
      },
      body: JSON.stringify(payload || {}),
    });

    const result = await response.json().catch(() => ({}));
    if (!response.ok || result?.ok === false) {
      throw new Error(result?.error || `inFlow API failed (${response.status})`);
    }

    return result.product;
  }
}

export default InflowAPI;
