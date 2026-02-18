/* eslint-disable no-console */
const admin = require("firebase-admin");

if (!admin.apps.length) {
  admin.initializeApp();
}

const db = admin.firestore();
const { FieldPath } = admin.firestore;

const buildNameTokens = (name) => {
  if (!name || typeof name !== "string") return [];
  const lower = name.toLowerCase().trim();
  if (!lower) return [];
  const tokens = lower.split(/[^a-z0-9]+/).filter(Boolean);
  tokens.push(lower);
  return Array.from(new Set(tokens));
};

const normalizeTokenList = (value) => {
  if (!Array.isArray(value)) return [];
  return Array.from(new Set(value.map((v) => String(v))));
};

const tokensEqual = (a, b) => {
  if (a.length !== b.length) return false;
  const aa = [...a].sort();
  const bb = [...b].sort();
  for (let i = 0; i < aa.length; i += 1) {
    if (aa[i] !== bb[i]) return false;
  }
  return true;
};

async function run() {
  let lastDoc = null;
  let total = 0;
  let updated = 0;

  while (true) {
    let query = db.collection("Test").orderBy(FieldPath.documentId()).limit(500);
    if (lastDoc) query = query.startAfter(lastDoc);

    const snap = await query.get();
    if (snap.empty) break;

    let batch = db.batch();
    let batchCount = 0;

    for (const doc of snap.docs) {
      const data = doc.data() || {};
      const name = typeof data.name === "string" ? data.name : "";
      const nameLower = name.toLowerCase();
      const nameTokens = buildNameTokens(name);

      const existingTokens = normalizeTokenList(data.nameTokens);
      const needsUpdate =
        data.nameLower !== nameLower || !tokensEqual(existingTokens, nameTokens);

      if (needsUpdate) {
        batch.update(doc.ref, {
          nameLower,
          nameTokens,
        });
        batchCount += 1;
        updated += 1;
      }

      if (batchCount >= 450) {
        await batch.commit();
        batch = db.batch();
        batchCount = 0;
      }
    }

    if (batchCount > 0) {
      await batch.commit();
    }

    lastDoc = snap.docs[snap.docs.length - 1];
    total += snap.size;
    console.log(`Processed ${total} docs...`);
  }

  console.log(`Backfill complete. Updated ${updated} docs.`);
}

run().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
