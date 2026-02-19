import { adminDb } from "../../../context/FirebaseAdmin";

const normalizeKey = (value) => {
  if (value == null) return "";
  return String(value).trim().toLowerCase();
};

const normalizeList = (values) => {
  const out = [];
  (values || []).forEach((value) => {
    if (value == null) return;
    const normalized = String(value).trim();
    if (!normalized) return;
    out.push(normalized);
  });
  return Array.from(new Set(out));
};

const extractModelsFromDoc = (data, docId) => {
  if (!data) return docId ? [docId] : [];
  if (Array.isArray(data.models)) return normalizeList(data.models);
  if (Array.isArray(data.model)) return normalizeList(data.model);
  if (Array.isArray(data.items)) return normalizeList(data.items);
  if (typeof data.model === "string") return normalizeList([data.model]);
  if (typeof data.name === "string") return normalizeList([data.name]);
  if (docId) return normalizeList([docId]);
  return [];
};

const extractOemsFromFields = (data) => {
  const out = {};
  if (!data) return out;
  const oemsField = data.oems || data.OEMs || data.oem || data.OEM;

  if (Array.isArray(oemsField)) {
    oemsField.forEach((entry) => {
      if (entry == null) return;
      if (typeof entry === "string") {
        out[entry] = out[entry] || [];
        return;
      }
      if (typeof entry === "object") {
        const name =
          entry.name ||
          entry.oem ||
          entry.OEM ||
          entry.label ||
          entry.value;
        if (!name) return;
        const models = extractModelsFromDoc(entry);
        out[name] = normalizeList([...(out[name] || []), ...models]);
      }
    });
    return out;
  }

  if (oemsField && typeof oemsField === "object") {
    Object.entries(oemsField).forEach(([oem, value]) => {
      if (value == null) return;
      if (Array.isArray(value)) {
        out[oem] = normalizeList(value);
        return;
      }
      if (typeof value === "object") {
        const models = extractModelsFromDoc(value);
        out[oem] = normalizeList([...(out[oem] || []), ...models]);
        return;
      }
      out[oem] = normalizeList([...(out[oem] || []), String(value).trim()]);
    });
  }

  return out;
};

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (!adminDb) {
    res.status(503).json({ error: "Firebase Admin not available." });
    return;
  }

  try {
    const modalityRefs = await adminDb.collection("Tracker").listDocuments();
    const modalities = modalityRefs.map((ref) => ref.id);
    const oemsByModality = {};
    const modelsByModalityOem = {};
    let usesSubcollections = false;

    for (const ref of modalityRefs) {
      const modality = ref.id;
      const docSnap = await ref.get();
      const data = docSnap.exists ? docSnap.data() || {} : {};

      const oems = new Set();
      const modelsByOem = {};

      const fieldOems = extractOemsFromFields(data);
      Object.entries(fieldOems).forEach(([oem, models]) => {
        oems.add(oem);
        modelsByOem[oem] = normalizeList([
          ...(modelsByOem[oem] || []),
          ...models,
        ]);
      });

      const subcollections = await ref.listCollections();
      if (subcollections.length) usesSubcollections = true;
      for (const sub of subcollections) {
        const oem = sub.id;
        oems.add(oem);
        const modelSet = new Set(modelsByOem[oem] || []);
        const subSnap = await sub.get();
        subSnap.forEach((subDoc) => {
          const models = extractModelsFromDoc(subDoc.data(), subDoc.id);
          models.forEach((model) => modelSet.add(model));
        });
        modelsByOem[oem] = Array.from(modelSet);
      }

      oemsByModality[modality] = Array.from(oems);
      modelsByModalityOem[modality] = modelsByOem;
    }

    res.status(200).json({
      modalities,
      oemsByModality,
      modelsByModalityOem,
      usesSubcollections,
      source: "server",
    });
  } catch (error) {
    console.error("Tracker catalog API failed:", error);
    res.status(500).json({ error: "Failed to build tracker catalog." });
  }
}
