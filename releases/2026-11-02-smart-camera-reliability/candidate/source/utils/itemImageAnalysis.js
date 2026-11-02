const DEFAULT_MAX_DIMENSION = 1600;
const DEFAULT_JPEG_QUALITY = 0.82;

function loadImage(source) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("A selected photo could not be opened."));
    image.src = source;
  });
}

async function renderResizedPhoto(photo, options = {}) {
  const maxDimension = Number(
    options.maxDimension || DEFAULT_MAX_DIMENSION
  );
  const jpegQuality = Number(options.jpegQuality || DEFAULT_JPEG_QUALITY);
  const objectUrl = URL.createObjectURL(photo.file);

  try {
    const image = await loadImage(objectUrl);
    const scale = Math.min(
      1,
      maxDimension / Math.max(image.naturalWidth || 1, image.naturalHeight || 1)
    );
    const width = Math.max(1, Math.round(image.naturalWidth * scale));
    const height = Math.max(1, Math.round(image.naturalHeight * scale));
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Photo resizing is not supported in this browser.");
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";
    context.drawImage(image, 0, 0, width, height);
    return canvas;
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

async function resizeLocalPhoto(photo, options = {}) {
  const canvas = await renderResizedPhoto(photo, options);
  const jpegQuality = Number(options.jpegQuality || DEFAULT_JPEG_QUALITY);
  return canvas.toDataURL("image/jpeg", jpegQuality);
}

export async function createImageThumbnail(file, options = {}) {
  if (!file || !String(file.type || "").startsWith("image/")) return null;
  const canvas = await renderResizedPhoto(
    { file },
    {
      maxDimension: Number(options.maxDimension || 480),
      jpegQuality: Number(options.jpegQuality || 0.76),
    }
  );
  const contentType = options.contentType || "image/webp";
  const quality = Number(options.quality || 0.76);
  const blob = await new Promise((resolve, reject) => {
    canvas.toBlob(
      (value) =>
        value ? resolve(value) : reject(new Error("The thumbnail could not be created.")),
      contentType,
      quality
    );
  });
  return blob;
}

export async function preparePhotosForAnalysis(photos = [], options = {}) {
  const maxImages = Number(options.maxImages || 4);
  const selected = (photos || []).filter(Boolean).slice(0, maxImages);
  if (!selected.length) return [];

  const prepared = [];
  for (const photo of selected) {
    if (photo?.file) {
      prepared.push(await resizeLocalPhoto(photo, options));
      continue;
    }
    const remoteUrl = String(photo?.url || "").trim();
    if (/^https:\/\//i.test(remoteUrl)) prepared.push(remoteUrl);
  }
  return prepared;
}

const originalPhotoHashes = new WeakMap();
const approvedPhotoHashes = new WeakMap();

async function hashPhotoBytes(bytes) {
  if (!globalThis.crypto?.subtle) {
    throw new Error("Photo matching requires a secure browser connection. Reload Magmo using HTTPS.");
  }
  const digest = await globalThis.crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function throwIfAnalysisAborted(signal) {
  if (signal?.aborted) {
    const error = new Error("Photo analysis was cancelled.");
    error.name = "AbortError";
    throw error;
  }
}

// Hash the original bytes: Storage uploads the File, not the resized AI image.
export async function hashOriginalPhotoFile(file) {
  if (!file || typeof file.arrayBuffer !== "function") {
    throw new Error("The original photo could not be read.");
  }
  if (!originalPhotoHashes.has(file)) {
    const pending = (async () => {
      return hashPhotoBytes(await file.arrayBuffer());
    })();
    originalPhotoHashes.set(file, pending);
    pending.catch(() => originalPhotoHashes.delete(file));
  }
  return originalPhotoHashes.get(file);
}

// Approved change requests store one of these two JPEG representations (see
// itemChangeRequestClient.js), so include their hashes without replacing the raw
// fingerprint. These are exact byte checks, never a visual similarity score.
async function hashApprovedPhotoRepresentations(photo) {
  if (!approvedPhotoHashes.has(photo.file)) {
    const pending = (async () => {
      const hashes = [];
      for (const profile of [{ maxDimension: 1600, jpegQuality: 0.8 }, { maxDimension: 1280, jpegQuality: 0.72 }]) {
        const dataUrl = await resizeLocalPhoto(photo, profile);
        const base64 = dataUrl.match(/^data:image\/jpeg;base64,([A-Za-z0-9+/]+={0,2})$/)?.[1];
        if (!base64) throw new Error("The photo could not be prepared for saved-photo comparison.");
        hashes.push(await hashPhotoBytes(Uint8Array.from(atob(base64), (character) => character.charCodeAt(0))));
      }
      return hashes;
    })();
    approvedPhotoHashes.set(photo.file, pending);
    pending.catch(() => approvedPhotoHashes.delete(photo.file));
  }
  return approvedPhotoHashes.get(photo.file);
}

export async function preparePhotosForMatching(photos = [], options = {}) {
  const maxImages = Math.min(4, Math.max(1, Number(options.maxImages) || 4));
  const selected = photos.filter((photo) => photo?.file || /^https:\/\//i.test(String(photo?.url || ""))).slice(0, maxImages);
  const images = [];
  const photoSha256 = [];
  const photoHashGroups = [];
  for (const photo of selected) {
    throwIfAnalysisAborted(options.signal);
    if (photo.file) {
      const hash = await hashOriginalPhotoFile(photo.file);
      throwIfAnalysisAborted(options.signal);
      images.push(await resizeLocalPhoto(photo, options));
      photoSha256.push(hash);
      const approvedHashes = await hashApprovedPhotoRepresentations(photo);
      photoHashGroups.push([...new Set([hash, ...approvedHashes])]);
    } else {
      images.push(String(photo.url).trim());
      // Unknown remote bytes cannot count as evidence for a deterministic match.
      photoHashGroups.push([]);
    }
    throwIfAnalysisAborted(options.signal);
  }
  return { images, photoSha256: [...new Set(photoSha256)], photoHashGroups };
}

export function isAnalysisMatchApplicable(match) {
  return Boolean(
    match?.id && match.canApply === true && match.isLikelySameItem === true &&
    typeof match.confidence === "number" && Number.isFinite(match.confidence) &&
    match.confidence >= 0.75 && match.confidence <= 1
  );
}

// Compare object identities as well as request generation: changing/reordering
// photos invalidates an answer even if a slow fetch finishes before React effects.
export function createPhotoAnalysisSession() {
  let generation = 0;
  let active = null;
  const invalidate = () => {
    generation += 1;
    active?.controller.abort();
    active = null;
  };
  return {
    invalidate,
    begin(photos) {
      invalidate();
      active = { generation, photos: [...photos], controller: new AbortController() };
      return active;
    },
    isCurrent(request, photos) {
      return Boolean(request && active === request && request.generation === generation &&
        !request.controller.signal.aborted && request.photos.length === photos.length &&
        request.photos.every((photo, index) => photo === photos[index]));
    },
  };
}
