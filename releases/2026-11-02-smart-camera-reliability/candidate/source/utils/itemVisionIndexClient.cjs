"use strict";

async function requestItemVisionIndexSync({ itemId, previousItemId = "", user, fetchImpl = fetch, timeoutMs = 90000 }) {
  const controller = new AbortController();
  let timer;
  try {
    return await Promise.race([
      (async () => {
        const token = user ? await user.getIdToken() : "";
        if (controller.signal.aborted) throw new Error("Smart Camera index update timed out. Retry the index update.");
        const response = await fetchImpl("/api/items/sync-index", {
          method: "POST",
          signal: controller.signal,
          headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
          body: JSON.stringify({ itemId, previousItemId }),
        });
        const result = await response.json().catch(() => ({}));
        if (!response.ok || result.ok !== true || result.photoIndex?.complete !== true) {
          const error = new Error(result.error || "The item is saved, but its Smart Camera photo index is not ready. Retry the index update.");
          error.retryable = result.retryable !== false;
          throw error;
        }
        return result;
      })(),
      new Promise((_, reject) => {
        timer = setTimeout(() => {
          const error = new Error("The item is saved, but its Smart Camera index update timed out. Retry the index update.");
          error.retryable = true;
          reject(error);
          controller.abort();
        }, timeoutMs);
      }),
    ]);
  } catch (error) {
    error.stage = "index";
    if (typeof error.retryable !== "boolean") error.retryable = true;
    throw error;
  } finally {
    clearTimeout(timer);
  }
}

// The inventory transaction has already committed. This operation never creates
// or modifies an inventory record and can be retried with the same saved ID.
async function completeSavedItemIndex({ itemId, uploadPhotos, syncIndex }) {
  let stage = "photos";
  try {
    await uploadPhotos();
    stage = "index";
    await syncIndex();
    return { itemId, complete: true, stage: "complete", retryable: false, message: "" };
  } catch (error) {
    return {
      itemId, complete: false, stage, retryable: error?.retryable !== false,
      message: stage === "photos"
        ? `Item ${itemId} is saved, but some photos have not finished uploading. Smart Camera indexing is pending. ${error?.message || "Retry to finish uploading the photos."}`
        : (error?.message || `Item ${itemId} is saved, but its Smart Camera index is pending.`),
    };
  }
}

module.exports = { requestItemVisionIndexSync, completeSavedItemIndex };
