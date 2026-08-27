export const ITEM_PHOTO_CATEGORIES = [
  { id: "item", label: "Item" },
  { id: "label", label: "Label" },
  { id: "packaged", label: "Packaged" },
];

const CATEGORY_IDS = new Set(
  ITEM_PHOTO_CATEGORIES.map((category) => category.id)
);

export function normalizeItemPhotoCategory(value) {
  const normalized = String(value || "").trim().toLowerCase();
  return CATEGORY_IDS.has(normalized) ? normalized : "item";
}

export function getItemPhotoCategory(storageName) {
  const match = String(storageName || "")
    .trim()
    .match(/^(item|label|packaged)__/i);
  return normalizeItemPhotoCategory(match?.[1]);
}

function getPhotoExtension(file) {
  const fileName = String(file?.name || "").trim();
  const extensionMatch = fileName.match(/\.([a-z0-9]{2,5})$/i);
  if (extensionMatch) return extensionMatch[1].toLowerCase();

  const contentType = String(file?.type || "").toLowerCase();
  if (contentType === "image/png") return "png";
  if (contentType === "image/webp") return "webp";
  if (contentType === "image/gif") return "gif";
  return "jpg";
}

export function createItemPhotoStorageName(category, file, ordinal = 0) {
  const safeCategory = normalizeItemPhotoCategory(category);
  const timestamp = Date.now();
  const extension = getPhotoExtension(file);
  return `${safeCategory}__${timestamp}-${ordinal}.${extension}`;
}
