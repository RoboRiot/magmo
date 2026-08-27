import { FieldValue } from "firebase-admin/firestore";
import { BlueFolderClient } from "../bluefolder/client";

const {
  mergeCoveragePeople,
  normalizeBlueFolderUsers,
  publicCoveragePeople,
} = require("./engineerDirectory.cjs");

export const OPS_ENGINEER_DIRECTORY_COLLECTION = "OpsEngineerDirectory";
const DIRECTORY_METADATA_COLLECTION = "OpsDirectoryMetadata";
const DIRECTORY_METADATA_DOCUMENT = "bluefolder-engineers";
const DEFAULT_REFRESH_TTL_MS = 6 * 60 * 60 * 1000;

let refreshPromise = null;

function refreshTtlMs() {
  const configured = Number(process.env.OPS_ENGINEER_DIRECTORY_TTL_MS);
  if (!Number.isFinite(configured) || configured < 60_000) {
    return DEFAULT_REFRESH_TTL_MS;
  }
  return Math.min(configured, 7 * 24 * 60 * 60 * 1000);
}

function metadataRef(db) {
  return db
    .collection(DIRECTORY_METADATA_COLLECTION)
    .doc(DIRECTORY_METADATA_DOCUMENT);
}

function directoryDocumentId(bluefolderUserId) {
  return `bluefolder-${String(bluefolderUserId || "").trim()}`;
}

function storedEngineer(snapshot) {
  const data = snapshot.data() || {};
  const id = String(data.id || "").trim();
  const name = String(data.name || "").trim();
  if (!id || !name || data.active !== true || data.isEngineer !== true) {
    return null;
  }
  return { id, name };
}

export async function readStoredBlueFolderEngineers(db) {
  const snapshot = await db.collection(OPS_ENGINEER_DIRECTORY_COLLECTION).get();
  return snapshot.docs
    .map(storedEngineer)
    .filter(Boolean)
    .sort((left, right) => left.name.localeCompare(right.name));
}

async function readDirectoryMetadata(db) {
  const snapshot = await metadataRef(db).get();
  const data = snapshot.exists ? snapshot.data() || {} : {};
  return {
    lastSyncedAtIso: String(data.lastSyncedAtIso || ""),
    activeEngineerCount: Number(data.activeEngineerCount || 0),
  };
}

function metadataIsStale(metadata) {
  const lastSyncedMs = Date.parse(metadata?.lastSyncedAtIso || "");
  return !Number.isFinite(lastSyncedMs) || Date.now() - lastSyncedMs > refreshTtlMs();
}

export async function syncBlueFolderEngineerDirectory(db, { client } = {}) {
  if (!db) throw new Error("Magmo engineer directory storage is not available.");
  const blueFolderClient = client || new BlueFolderClient();
  const rawUsers = await blueFolderClient.listUsers();
  const users = normalizeBlueFolderUsers(rawUsers);
  if (!users.length) {
    throw new Error("BlueFolder returned an empty or invalid user directory.");
  }

  const engineerUsers = users.filter((user) => user.isEngineer);
  const activeEngineers = engineerUsers.filter((user) => user.active);
  const returnedDocumentIds = new Set(
    engineerUsers.map((user) => directoryDocumentId(user.bluefolderUserId))
  );
  const existing = await db.collection(OPS_ENGINEER_DIRECTORY_COLLECTION).get();
  const batch = db.batch();
  const syncedAtIso = new Date().toISOString();

  engineerUsers.forEach((user) => {
    batch.set(
      db
        .collection(OPS_ENGINEER_DIRECTORY_COLLECTION)
        .doc(directoryDocumentId(user.bluefolderUserId)),
      {
        id: user.id,
        bluefolderUserId: user.bluefolderUserId,
        name: user.name,
        roles: user.roles,
        source: "bluefolder",
        active: user.active,
        isEngineer: true,
        syncedAt: FieldValue.serverTimestamp(),
        syncedAtIso,
      },
      { merge: true }
    );
  });

  existing.docs.forEach((snapshot) => {
    if (returnedDocumentIds.has(snapshot.id)) return;
    batch.set(
      snapshot.ref,
      {
        active: false,
        isEngineer: false,
        syncedAt: FieldValue.serverTimestamp(),
        syncedAtIso,
      },
      { merge: true }
    );
  });

  batch.set(
    metadataRef(db),
    {
      source: "bluefolder",
      totalUserCount: users.length,
      engineerAccountCount: engineerUsers.length,
      activeEngineerCount: activeEngineers.length,
      lastSyncedAt: FieldValue.serverTimestamp(),
      lastSyncedAtIso: syncedAtIso,
    },
    { merge: true }
  );
  await batch.commit();

  return {
    engineers: activeEngineers.map((user) => ({ id: user.id, name: user.name })),
    totalUserCount: users.length,
    engineerAccountCount: engineerUsers.length,
    activeEngineerCount: activeEngineers.length,
    lastSyncedAtIso: syncedAtIso,
  };
}

async function refreshDirectory(db) {
  if (!refreshPromise) {
    refreshPromise = syncBlueFolderEngineerDirectory(db).finally(() => {
      refreshPromise = null;
    });
  }
  return refreshPromise;
}

export async function getOpsCoverageEngineerDirectory({
  db,
  slackPeople = [],
  refreshIfStale = true,
} = {}) {
  if (!db) throw new Error("Magmo engineer directory storage is not available.");
  let blueFolderPeople = await readStoredBlueFolderEngineers(db);
  let metadata = await readDirectoryMetadata(db);
  let warning = "";

  if (refreshIfStale && (metadataIsStale(metadata) || !blueFolderPeople.length)) {
    try {
      const refreshed = await refreshDirectory(db);
      blueFolderPeople = refreshed.engineers;
      metadata = {
        lastSyncedAtIso: refreshed.lastSyncedAtIso,
        activeEngineerCount: refreshed.activeEngineerCount,
      };
    } catch (error) {
      if (!blueFolderPeople.length) {
        const unavailable = new Error(
          "The BlueFolder engineer directory is temporarily unavailable."
        );
        unavailable.code = "engineer_directory_unavailable";
        unavailable.cause = error;
        throw unavailable;
      }
      warning = "Using the last successfully synced BlueFolder engineer roster.";
    }
  }

  const internalPeople = mergeCoveragePeople(slackPeople, blueFolderPeople);
  return {
    people: publicCoveragePeople(internalPeople),
    internalPeople,
    directory: {
      source: "bluefolder",
      activeEngineerCount: blueFolderPeople.length,
      lastSyncedAtIso: metadata.lastSyncedAtIso,
      stale: metadataIsStale(metadata),
      warning,
    },
  };
}
