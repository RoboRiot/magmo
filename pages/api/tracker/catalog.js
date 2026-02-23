import { adminDb } from "../../../context/FirebaseAdmin";

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

const extractModelsFromDoc = (data, docId, options = {}) => {
  const { allowDocIdFallback = true } = options;
  if (!data) return allowDocIdFallback && docId ? [docId] : [];
  if (Array.isArray(data.models)) return normalizeList(data.models);
  if (Array.isArray(data.model)) return normalizeList(data.model);
  if (Array.isArray(data.items)) return normalizeList(data.items);
  if (typeof data.model === "string") return normalizeList([data.model]);
  if (typeof data.name === "string") return normalizeList([data.name]);
  if (allowDocIdFallback && docId) return normalizeList([docId]);
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

const mergeModels = (modelsByOem, oem, incoming) => {
  const current = modelsByOem[oem] || [];
  modelsByOem[oem] = normalizeList([...(current || []), ...(incoming || [])]);
};

const mergeModalityData = (
  targetOemsByModality,
  targetModelsByModalityOem,
  modality,
  modelsByOem
) => {
  if (!modality) return;
  const oems = Object.keys(modelsByOem || {});
  if (!targetModelsByModalityOem[modality]) {
    targetModelsByModalityOem[modality] = {};
  }
  if (!targetOemsByModality[modality]) {
    targetOemsByModality[modality] = [];
  }
  const nextOems = new Set(targetOemsByModality[modality] || []);
  oems.forEach((oem) => {
    nextOems.add(oem);
    mergeModels(
      targetModelsByModalityOem[modality],
      oem,
      modelsByOem[oem] || []
    );
  });
  targetOemsByModality[modality] = Array.from(nextOems);
};

const readModelsFromOemSubcollection = async (collectionRef) => {
  const modelSet = new Set();
  const snap = await collectionRef.get();
  snap.forEach((doc) => {
    const models = extractModelsFromDoc(doc.data(), doc.id);
    models.forEach((model) => modelSet.add(model));
  });
  return Array.from(modelSet);
};

const readModalityFromDocumentRef = async (docRef) => {
  const docSnap = await docRef.get();
  const data = docSnap.exists ? docSnap.data() || {} : {};
  const modelsByOem = {};

  const fieldOems = extractOemsFromFields(data);
  Object.entries(fieldOems).forEach(([oem, models]) => {
    mergeModels(modelsByOem, oem, models || []);
  });

  const subcollections = await docRef.listCollections();
  for (const sub of subcollections) {
    const oem = sub.id;
    const models = await readModelsFromOemSubcollection(sub);
    mergeModels(modelsByOem, oem, models);
  }

  return { modelsByOem, subcollections };
};

const readModalityFromCollectionRef = async (collectionRef) => {
  const modelsByOem = {};
  const snap = await collectionRef.get();

  for (const oemDoc of snap.docs) {
    const oem = oemDoc.id;
    const models = extractModelsFromDoc(oemDoc.data(), oemDoc.id, {
      allowDocIdFallback: false,
    });
    mergeModels(modelsByOem, oem, models);

    const nested = await oemDoc.ref.listCollections();
    for (const nestedCol of nested) {
      const nestedModels = await readModelsFromOemSubcollection(nestedCol);
      mergeModels(modelsByOem, oem, nestedModels);
    }
  }

  return modelsByOem;
};

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (!adminDb) {
    res.status(503).json({ error: "Firebase Admin not available." });
    return;
  }

  try {
    const modalityRefs = await adminDb.collection("Tracker").listDocuments();
    const modalitySet = new Set();
    const oemsByModality = {};
    const modelsByModalityOem = {};
    let usesSubcollections = false;

    for (const ref of modalityRefs) {
      const modality = ref.id;
      const { modelsByOem, subcollections } = await readModalityFromDocumentRef(
        ref
      );
      if (subcollections.length) usesSubcollections = true;
      modalitySet.add(modality);
      mergeModalityData(
        oemsByModality,
        modelsByModalityOem,
        modality,
        modelsByOem
      );

      // Some datasets use a "container" document under Tracker, where each
      // modality is stored as a subcollection of that doc.
      const hasDirectModels = Object.keys(modelsByOem).length > 0;
      if (!hasDirectModels && subcollections.length) {
        for (const modalityCollection of subcollections) {
          const nestedModality = modalityCollection.id;
          const nestedModelsByOem =
            await readModalityFromCollectionRef(modalityCollection);
          modalitySet.add(nestedModality);
          mergeModalityData(
            oemsByModality,
            modelsByModalityOem,
            nestedModality,
            nestedModelsByOem
          );
        }
      }
    }

    const modalities = Array.from(modalitySet);
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
