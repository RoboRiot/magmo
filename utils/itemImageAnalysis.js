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
