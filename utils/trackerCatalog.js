import firebase from "../context/Firebase";

const OEM_FIELD_CANDIDATES = ["oems", "OEMs", "oem", "OEM"];
const MODEL_FIELD_CANDIDATES = ["models", "Models", "model", "Model", "list", "items"];
const DEFAULT_OEM_FIELD = "oems";

const isPlainObject = (value) =>
  value != null &&
  typeof value === "object" &&
  !Array.isArray(value) &&
  !(value instanceof Date);

const normalizeKey = (value) => {
  if (value == null) return "";
  return String(value).trim().toLowerCase();
};

const hasUpper = (value) => /[A-Z]/.test(String(value || ""));

const pickPreferredCase = (current, incoming) => {
  if (!current) return incoming;
  if (!incoming) return current;
  const currentUpper = hasUpper(current);
  const incomingUpper = hasUpper(incoming);
  if (incomingUpper && !currentUpper) return incoming;
  if (currentUpper && !incomingUpper) return current;
  return current;
};

const normalizeArray = (value) => {
  if (Array.isArray(value)) return value;
  if (value == null || value === "") return [];
  return [value];
};

const normalizeList = (values) => {
  const out = [];
  (values || []).forEach((value) => {
    if (value == null) return;
    const normalized = String(value).trim();
    if (!normalized) return;
    if (normalizeKey(normalized) === "nan") return;
    out.push(normalized);
  });
  return Array.from(new Set(out));
};

const normalizeListCaseInsensitive = (values) => {
  const map = new Map();
  (values || []).forEach((value) => {
    if (value == null) return;
    const normalized = String(value).trim();
    if (!normalized) return;
    const key = normalizeKey(normalized);
    if (!key || key === "nan") return;
    const current = map.get(key);
    map.set(key, pickPreferredCase(current, normalized));
  });
  return Array.from(map.values());
};


const pickModelField = (obj) => {
  if (!isPlainObject(obj)) return null;
  for (const key of MODEL_FIELD_CANDIDATES) {
    if (Array.isArray(obj[key])) return key;
  }
  const arrayKey = Object.keys(obj).find((key) => Array.isArray(obj[key]));
  return arrayKey || null;
};

const extractModels = (value) => {
  if (Array.isArray(value)) {
    return { models: normalizeList(value), modelField: null };
  }
  if (isPlainObject(value)) {
    const modelField = pickModelField(value);
    const models = modelField ? normalizeList(value[modelField]) : [];
    return { models, modelField };
  }
  if (value != null && value !== "") {
    return { models: normalizeList([value]), modelField: null };
  }
  return { models: [], modelField: null };
};

const extractOemMap = (data) => {
  const oemMap = {};
  const modelFieldByOem = {};
  let oemField = null;

  for (const key of OEM_FIELD_CANDIDATES) {
    if (Array.isArray(data?.[key])) {
      oemField = key;
      data[key].forEach((entry) => {
        if (entry == null) return;
        if (isPlainObject(entry)) {
          const name =
            entry.name ||
            entry.oem ||
            entry.OEM ||
            entry.label ||
            entry.value;
          if (!name) return;
          const normalizedName = String(name).trim();
          if (!normalizedName) return;
          const { models } = extractModels(entry.models || entry.list || entry.items);
          oemMap[normalizedName] = normalizeList([
            ...(oemMap[normalizedName] || []),
            ...models,
          ]);
          return;
        }
        const normalized = String(entry || "").trim();
        if (!normalized) return;
        oemMap[normalized] = normalizeList([...(oemMap[normalized] || [])]);
      });
    } else if (isPlainObject(data?.[key])) {
      oemField = key;
      Object.entries(data[key]).forEach(([oem, value]) => {
        const { models, modelField } = extractModels(value);
        oemMap[oem] = normalizeList([...(oemMap[oem] || []), ...models]);
        if (modelField) {
          modelFieldByOem[oem] = modelField;
        }
      });
    }
  }

  if (!oemField) {
    Object.entries(data || {}).forEach(([key, value]) => {
      if (!value) return;
      if (key.startsWith("_")) return;
      if (isPlainObject(value) || Array.isArray(value)) {
        const { models, modelField } = extractModels(value);
        if (models.length || modelField) {
          oemMap[key] = normalizeList([...(oemMap[key] || []), ...models]);
          if (modelField) {
            modelFieldByOem[key] = modelField;
          }
        }
      }
    });
  }

  return { oemMap, oemField, modelFieldByOem };
};


const buildCatalogMetaFromMaps = ({
  modalities = [],
  oemsByModality = {},
  modelsByModalityOem = {},
  usesSubcollections = false,
  syncDisabled = false,
  source = "client",
}) => {
  const meta = {
    oemFieldByModality: {},
    modelFieldByModalityOem: {},
    modalityKeyByLower: {},
    oemKeyByModalityLower: {},
    modelKeyByModalityOemLower: {},
    usesSubcollections,
    syncDisabled,
    source,
  };

  const normalizedModalities = normalizeListCaseInsensitive(modalities);
  normalizedModalities.forEach((modality) => {
    const modalityLower = normalizeKey(modality);
    meta.modalityKeyByLower[modalityLower] = pickPreferredCase(
      meta.modalityKeyByLower[modalityLower],
      modality
    );
    const oems = oemsByModality?.[modality] || [];
    const oemLowerMap =
      meta.oemKeyByModalityLower[modalityLower] || {};
    meta.oemKeyByModalityLower[modalityLower] = oemLowerMap;
    const modelLowerMap =
      meta.modelKeyByModalityOemLower[modalityLower] || {};
    meta.modelKeyByModalityOemLower[modalityLower] = modelLowerMap;

    oems.forEach((oem) => {
      const oemLower = normalizeKey(oem);
      oemLowerMap[oemLower] = pickPreferredCase(oemLowerMap[oemLower], oem);
      const models = modelsByModalityOem?.[modality]?.[oem] || [];
      modelLowerMap[oemLower] = modelLowerMap[oemLower] || {};
      models.forEach((model) => {
        const modelLower = normalizeKey(model);
        if (!modelLower) return;
        modelLowerMap[oemLower][modelLower] = pickPreferredCase(
          modelLowerMap[oemLower][modelLower],
          model
        );
      });
    });
  });

  return {
    modalities: normalizedModalities,
    oemsByModality,
    modelsByModalityOem,
    meta,
  };
};

export async function fetchTrackerCatalog() {
  if (typeof window !== "undefined") {
    try {
      const response = await fetch(
        `/api/tracker/catalog?ts=${Date.now()}`,
        { cache: "no-store" }
      );
      if (response.ok) {
        const payload = await response.json();
        if (payload?.modalities) {
          return buildCatalogMetaFromMaps({
            modalities: payload.modalities || [],
            oemsByModality: payload.oemsByModality || {},
            modelsByModalityOem: payload.modelsByModalityOem || {},
            usesSubcollections: Boolean(payload.usesSubcollections),
            syncDisabled: false,
            source: "server",
          });
        }
      }
    } catch (error) {
      console.warn("Tracker catalog API fallback:", error);
    }
  }

  const db = firebase.firestore();
  let snap;
  try {
    snap = await db.collection("Tracker").get({ source: "server" });
  } catch (error) {
    snap = await db.collection("Tracker").get();
  }
  console.log(
    "Tracker catalog client docs:",
    snap.docs.map((doc) => doc.id)
  );

  const modalities = [];
  const oemsByModality = {};
  const modelsByModalityOem = {};
  const meta = {
    oemFieldByModality: {},
    modelFieldByModalityOem: {},
    modalityKeyByLower: {},
    oemKeyByModalityLower: {},
    modelKeyByModalityOemLower: {},
  };

  snap.forEach((doc) => {
    const modality = doc.id;
    const modalityLower = normalizeKey(modality);
    const existingModality = meta.modalityKeyByLower[modalityLower];
    const canonicalModality = pickPreferredCase(existingModality, modality);
    meta.modalityKeyByLower[modalityLower] = canonicalModality;
    const data = doc.data() || {};
    const { oemMap, oemField, modelFieldByOem } = extractOemMap(data);

    if (existingModality && existingModality !== canonicalModality) {
      oemsByModality[canonicalModality] = normalizeListCaseInsensitive([
        ...(oemsByModality[existingModality] || []),
        ...(oemsByModality[canonicalModality] || []),
      ]);
      modelsByModalityOem[canonicalModality] = {
        ...(modelsByModalityOem[existingModality] || {}),
        ...(modelsByModalityOem[canonicalModality] || {}),
      };
      meta.modelFieldByModalityOem[canonicalModality] = {
        ...(meta.modelFieldByModalityOem[existingModality] || {}),
        ...(meta.modelFieldByModalityOem[canonicalModality] || {}),
      };
      if (!meta.oemFieldByModality[canonicalModality]) {
        meta.oemFieldByModality[canonicalModality] =
          meta.oemFieldByModality[existingModality] || oemField;
      }
      delete oemsByModality[existingModality];
      delete modelsByModalityOem[existingModality];
      delete meta.oemFieldByModality[existingModality];
      delete meta.modelFieldByModalityOem[existingModality];
    }

    modalities.push(canonicalModality);
    if (!meta.oemFieldByModality[canonicalModality]) {
      meta.oemFieldByModality[canonicalModality] = oemField;
    }
    meta.modelFieldByModalityOem[canonicalModality] = {
      ...(meta.modelFieldByModalityOem[canonicalModality] || {}),
      ...(modelFieldByOem || {}),
    };

    const oems = Object.keys(oemMap);
    const mergedOems = normalizeListCaseInsensitive([
      ...(oemsByModality[canonicalModality] || []),
      ...oems,
    ]);
    oemsByModality[canonicalModality] = mergedOems;
    modelsByModalityOem[canonicalModality] =
      modelsByModalityOem[canonicalModality] || {};
    const oemLowerMap =
      meta.oemKeyByModalityLower[modalityLower] || {};
    meta.oemKeyByModalityLower[modalityLower] = oemLowerMap;
    const modelLowerMap =
      meta.modelKeyByModalityOemLower[modalityLower] || {};
    meta.modelKeyByModalityOemLower[modalityLower] = modelLowerMap;
    oems.forEach((oem) => {
      const oemLower = normalizeKey(oem);
      const existingOem = oemLowerMap[oemLower];
      const canonicalOem = pickPreferredCase(existingOem, oem);
      oemLowerMap[oemLower] = canonicalOem;
      if (existingOem && existingOem !== canonicalOem) {
        modelsByModalityOem[canonicalModality][canonicalOem] = normalizeListCaseInsensitive([
          ...(modelsByModalityOem[canonicalModality][existingOem] || []),
          ...(modelsByModalityOem[canonicalModality][canonicalOem] || []),
        ]);
        delete modelsByModalityOem[canonicalModality][existingOem];
      }
      const existingModels =
        modelsByModalityOem[canonicalModality][canonicalOem] || [];
      const mergedModels = normalizeListCaseInsensitive([
        ...existingModels,
        ...(oemMap[oem] || []),
      ]);
      modelsByModalityOem[canonicalModality][canonicalOem] = mergedModels;
      modelLowerMap[oemLower] = modelLowerMap[oemLower] || {};
      mergedModels.forEach((model) => {
        modelLowerMap[oemLower][normalizeKey(model)] = model;
      });
    });
  });

  return buildCatalogMetaFromMaps({
    modalities,
    oemsByModality,
    modelsByModalityOem,
    usesSubcollections: true,
    syncDisabled: false,
    source: "client",
  });
}

export function buildAllOems(catalog) {
  const map = new Map();
  Object.values(catalog?.oemsByModality || {}).forEach((oems) => {
    (oems || []).forEach((oem) => {
      const key = normalizeKey(oem);
      if (!key) return;
      const current = map.get(key);
      map.set(key, pickPreferredCase(current, oem));
    });
  });
  return Array.from(map.values());
}

export function buildModelsForSelection(catalog, modalities = [], oems = []) {
  const modelSet = new Set();
  const modals = normalizeList(modalities);
  const oemList = normalizeList(oems);
  modals.forEach((modality) => {
    const modalityLower = normalizeKey(modality);
    const canonicalModality =
      catalog?.meta?.modalityKeyByLower?.[modalityLower] || modality;
    const oemMap = catalog?.modelsByModalityOem?.[canonicalModality] || {};
    oemList.forEach((oem) => {
      const oemLower = normalizeKey(oem);
      const canonicalOem =
        catalog?.meta?.oemKeyByModalityLower?.[modalityLower]?.[oemLower] || oem;
      const models = oemMap?.[canonicalOem] || [];
      models.forEach((model) => modelSet.add(model));
    });
  });
  return Array.from(modelSet);
}

export async function syncTrackerFromSelections({
  selections,
  catalog,
}) {
  const db = firebase.firestore();
  const trackerRef = db.collection("Tracker");
  const selectedModalities = normalizeList(selections?.modalities || []);
  const selectedOems = normalizeList(selections?.oems || []);
  const selectedModels = normalizeList(selections?.models || []);

  if (!selectedModalities.length) return false;
  if (catalog?.meta?.syncDisabled) return false;

  const ops = [];

  for (const modality of selectedModalities) {
    const modalityLower = normalizeKey(modality);
    const canonicalModality =
      catalog?.meta?.modalityKeyByLower?.[modalityLower] || modalityLower;
    const docRef = trackerRef.doc(canonicalModality);
    const existingOemsRaw = catalog?.oemsByModality?.[canonicalModality] || [];
    const existingOemsLower = new Set(
      existingOemsRaw.map((value) => normalizeKey(value))
    );

    const oemField =
      catalog?.meta?.oemFieldByModality?.[canonicalModality] ||
      DEFAULT_OEM_FIELD;

    if (
      !catalog?.modalities?.some(
        (existing) => normalizeKey(existing) === modalityLower
      )
    ) {
      ops.push(docRef.set({ [DEFAULT_OEM_FIELD]: {} }, { merge: true }));
    }

    for (const oem of selectedOems) {
      const oemLower = normalizeKey(oem);
      const canonicalOem =
        catalog?.meta?.oemKeyByModalityLower?.[modalityLower]?.[oemLower] ||
        oemLower;
      if (!existingOemsLower.has(oemLower)) {
        ops.push(
          docRef.set({ [oemField]: { [canonicalOem]: [] } }, { merge: true })
        );
      }
    }

    for (const oem of selectedOems) {
      const oemLower = normalizeKey(oem);
      const canonicalOem =
        catalog?.meta?.oemKeyByModalityLower?.[modalityLower]?.[oemLower] ||
        oemLower;
      const knownModels =
        catalog?.modelsByModalityOem?.[canonicalModality]?.[canonicalOem] || [];
      const knownLower = new Set(
        knownModels.map((value) => normalizeKey(value))
      );
      const modelCaseMap =
        catalog?.meta?.modelKeyByModalityOemLower?.[modalityLower]?.[oemLower] ||
        {};
      const modelField =
        catalog?.meta?.modelFieldByModalityOem?.[canonicalModality]?.[
          canonicalOem
        ] || null;
      for (const model of selectedModels) {
        const modelLower = normalizeKey(model);
        if (!modelLower || knownLower.has(modelLower)) continue;
        const canonicalModel = modelCaseMap[modelLower] || model;
        const path = modelField
          ? `${oemField}.${canonicalOem}.${modelField}`
          : `${oemField}.${canonicalOem}`;
        ops.push(
          docRef.update({
            [path]: firebase.firestore.FieldValue.arrayUnion(canonicalModel),
          })
        );
      }
    }
  }

  if (ops.length) {
    await Promise.allSettled(ops);
    return true;
  }
  return false;
}

export async function deleteTrackerOem({ oem, catalog }) {
  if (!oem) return;
  const db = firebase.firestore();
  const trackerRef = db.collection("Tracker");
  const modalities = catalog?.modalities || [];
  const usesSubcollections = Boolean(catalog?.meta?.usesSubcollections);
  const ops = modalities.map((modality) => {
    const modalityLower = normalizeKey(modality);
    const canonicalModality =
      catalog?.meta?.modalityKeyByLower?.[modalityLower] || modality;
    const docRef = trackerRef.doc(canonicalModality);
    const canonicalOem =
      catalog?.meta?.oemKeyByModalityLower?.[modalityLower]?.[
        normalizeKey(oem)
      ] || oem;
    if (usesSubcollections) {
      return docRef
        .collection(canonicalOem)
        .get()
        .then((snap) => {
          const deletions = [];
          snap.forEach((doc) => {
            deletions.push(doc.ref.delete());
          });
          return Promise.allSettled(deletions);
        })
        .catch(() => null);
    }
    const oemField =
      catalog?.meta?.oemFieldByModality?.[canonicalModality] ||
      DEFAULT_OEM_FIELD;
    const update = {
      [`${oemField}.${canonicalOem}`]: firebase.firestore.FieldValue.delete(),
    };
    if (!catalog?.meta?.oemFieldByModality?.[canonicalModality]) {
      update[canonicalOem] = firebase.firestore.FieldValue.delete();
    }
    return docRef.update(update).catch(() => null);
  });
  await Promise.allSettled(ops);
}

export async function deleteTrackerModel({
  modality,
  oem,
  model,
  catalog,
}) {
  if (!modality || !oem || !model) return;
  const db = firebase.firestore();
  const modalityLower = normalizeKey(modality);
  const canonicalModality =
    catalog?.meta?.modalityKeyByLower?.[modalityLower] || modality;
  const docRef = db.collection("Tracker").doc(canonicalModality);
  const canonicalOem =
    catalog?.meta?.oemKeyByModalityLower?.[modalityLower]?.[
      normalizeKey(oem)
    ] || oem;
  if (catalog?.meta?.usesSubcollections) {
    const modelKey = normalizeKey(model);
    await docRef
      .collection(canonicalOem)
      .doc(modelKey)
      .delete()
      .catch(() => null);
    return;
  }
  const oemField =
    catalog?.meta?.oemFieldByModality?.[canonicalModality] ||
    DEFAULT_OEM_FIELD;
  const modelField =
    catalog?.meta?.modelFieldByModalityOem?.[canonicalModality]?.[
      canonicalOem
    ] || null;
  const path = modelField
    ? `${oemField}.${canonicalOem}.${modelField}`
    : `${oemField}.${canonicalOem}`;
  await docRef.update({
    [path]: firebase.firestore.FieldValue.arrayRemove(model),
  });
}
