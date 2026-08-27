import associatedPartRoles from "../lib/associatedPartRoles.cjs";

const {
  assertAuthoritativeQueriesComplete,
  getEntityRoleConfig,
  groupAssociatedParts,
  normalizeAssociatedPart,
  normalizeEntityType,
  referenceId,
  uniqueReferenceCandidates,
  mapSettledWithConcurrency,
} = associatedPartRoles;

export const INVERSE_READ_CONCURRENCY = 12;

function addSnapshotDocuments(documentMap, snapshot) {
  if (!snapshot) return;
  const docs = Array.isArray(snapshot.docs) ? snapshot.docs : [];
  docs.forEach((doc) => {
    if (doc?.exists === false || !doc?.id) return;
    documentMap.set(doc.id, doc);
  });
}

async function resolveInverseCandidate(db, candidate) {
  if (!candidate) return null;
  if (typeof candidate.data === "function") return candidate;
  if (typeof candidate.get === "function") return candidate.get();

  const id = referenceId(candidate);
  if (!id) return null;
  return db.collection("Test").doc(id).get();
}

export function formatAssociatedPartDate(input) {
  let date;
  if (input && input.seconds) {
    date = new Date(input.seconds * 1000);
  } else if (typeof input?.toDate === "function") {
    date = input.toDate();
  } else if (typeof input === "string" || typeof input === "number") {
    date = new Date(input);
  } else if (input instanceof Date) {
    date = input;
  } else {
    return "N/A";
  }

  return date instanceof Date && !Number.isNaN(date.getTime())
    ? date.toLocaleDateString()
    : "N/A";
}

export async function fetchAssociatedPartsByEntity(
  db,
  { entityType, entityId, inverseCandidates = [], includeEntityInverse = true }
) {
  const normalizedEntityType = normalizeEntityType(entityType);
  const resolvedEntityId = referenceId(entityId);
  const fromConfig = getEntityRoleConfig(normalizedEntityType, "from");

  if (!db || !normalizedEntityType || !resolvedEntityId || !fromConfig) {
    return { from: [], current: [] };
  }

  const entityRef = db
    .collection(fromConfig.collection)
    .doc(resolvedEntityId);
  const testCollection = db.collection("Test");
  const queryPromises = [];

  for (const role of ["from", "current"]) {
    const config = getEntityRoleConfig(normalizedEntityType, role);
    for (const field of config.references) {
      queryPromises.push(testCollection.where(field, "==", entityRef).get());
      queryPromises.push(
        testCollection
          .where(field, "in", [
            resolvedEntityId,
            `${config.collection}/${resolvedEntityId}`,
            `/${config.collection}/${resolvedEntityId}`,
          ])
          .get()
      );
    }
    for (const field of config.ids) {
      queryPromises.push(testCollection.where(field, "==", entityRef).get());
      queryPromises.push(
        testCollection
          .where(field, "in", [
            resolvedEntityId,
            `${config.collection}/${resolvedEntityId}`,
            `/${config.collection}/${resolvedEntityId}`,
          ])
          .get()
      );
    }
  }

  const entityPromise = includeEntityInverse
    ? entityRef.get()
    : Promise.resolve(null);
  const [queryResults, entityResult] = await Promise.all([
    Promise.allSettled(queryPromises),
    Promise.resolve(entityPromise).catch(() => null),
  ]);

  const documentMap = new Map();
  queryResults.forEach((result) => {
    if (result.status === "fulfilled") {
      addSnapshotDocuments(documentMap, result.value);
    }
  });

  assertAuthoritativeQueriesComplete(queryResults);

  const entityData = entityResult?.exists ? entityResult.data() || {} : {};
  const storedInverseCandidates = Array.isArray(entityData.associatedParts)
    ? entityData.associatedParts
    : [];
  const allInverseCandidates = [
    ...(Array.isArray(inverseCandidates) ? inverseCandidates : []),
    ...storedInverseCandidates,
  ];

  const missingInverseCandidates = uniqueReferenceCandidates(
    allInverseCandidates,
    documentMap.keys()
  );
  if (missingInverseCandidates.length) {
    const inverseResults = await mapSettledWithConcurrency(
      missingInverseCandidates,
      INVERSE_READ_CONCURRENCY,
      (candidate) => resolveInverseCandidate(db, candidate)
    );
    inverseResults.forEach((result) => {
      if (result.status !== "fulfilled" || !result.value) return;
      const normalized = normalizeAssociatedPart(result.value);
      if (normalized?.id && !documentMap.has(normalized.id)) {
        documentMap.set(normalized.id, result.value);
      }
    });
  }

  return groupAssociatedParts(
    Array.from(documentMap.values()),
    normalizedEntityType,
    resolvedEntityId
  );
}
