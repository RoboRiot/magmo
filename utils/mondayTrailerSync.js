import {
  TRAILER_LAYOUT_DOC_ID,
  extractTrailerNumber,
} from "./trailerYardLayout";

export const MONDAY_TRAILER_CONNECTION_MESSAGE =
  "Could not establish a connection to Monday. Trailer data may be out of date.";

const MAX_BATCH_WRITES = 450;

export function buildTrailerDocIdFromMondayBoardName(name, boardId = "") {
  const normalized = String(name || "")
    .trim()
    .replace(/[\/\\#?[\]]+/g, "-")
    .replace(/\s+/g, " ")
    .slice(0, 120);
  if (/^AIS\d+/i.test(normalized)) return normalized;
  return boardId ? `monday-${boardId}` : "";
}

export function isTrailerRecordSnapshot(docSnap) {
  if (!docSnap || docSnap.id === TRAILER_LAYOUT_DOC_ID) return false;
  if (/^AIS\d+/i.test(String(docSnap.id || ""))) return true;

  const data = docSnap.data?.() || {};
  return (
    /^monday-\d+$/i.test(String(docSnap.id || "")) ||
    Boolean(String(data.mondayBoardId || "").trim()) ||
    String(data.source || "").trim().toLowerCase() === "monday"
  );
}

export function normalizeMondayTrailerFolders(payload = {}) {
  const folders = Array.isArray(payload.folders) ? payload.folders : [];
  if (folders.length) return folders;
  const boards = Array.isArray(payload.boards) ? payload.boards : [];
  return boards.length ? [{ id: "boards", name: "Boards", boards }] : [];
}

export function flattenMondayTrailerBoards(folders = []) {
  const seen = new Set();
  const flattened = [];

  (folders || []).forEach((folder) => {
    (folder.boards || []).forEach((board) => {
      const id = String(board?.id || "").trim();
      const name = String(board?.name || "").trim();
      if (!id || !name || seen.has(id)) return;
      seen.add(id);
      flattened.push({
        id,
        name,
        folderId: String(folder?.id || board?.folderId || "").trim(),
        folderName: String(folder?.name || "").trim(),
      });
    });
  });

  return flattened;
}

export async function fetchMondayTrailerBoards(firebase, fetchOptions = {}) {
  const idToken = await firebase.auth().currentUser?.getIdToken();
  const response = await fetch(`/api/monday/trailer-boards?ts=${Date.now()}`, {
    cache: "no-store",
    headers: {
      ...(idToken ? { Authorization: `Bearer ${idToken}` } : {}),
    },
    ...fetchOptions,
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload?.error || MONDAY_TRAILER_CONNECTION_MESSAGE);
  }

  const folders = normalizeMondayTrailerFolders(payload);
  return {
    boards: Array.isArray(payload.boards) ? payload.boards : [],
    folders,
    workspaceId: payload.workspaceId || "",
  };
}

function valuesAreEqual(left, right) {
  if (left == null && right == null) return true;
  if (typeof left === "number" || typeof right === "number") {
    const leftNumber = Number(left);
    const rightNumber = Number(right);
    return (
      Number.isFinite(leftNumber) &&
      Number.isFinite(rightNumber) &&
      leftNumber === rightNumber
    );
  }
  return String(left ?? "") === String(right ?? "");
}

function shouldWriteMondayPayload(existingData, payload) {
  if (!existingData) return true;
  return Object.entries(payload).some(
    ([key, value]) => !valuesAreEqual(existingData[key], value)
  );
}

async function commitBatch(db, writes) {
  if (!writes.length) return 0;
  let committed = 0;

  for (let index = 0; index < writes.length; index += MAX_BATCH_WRITES) {
    const batch = db.batch();
    const chunk = writes.slice(index, index + MAX_BATCH_WRITES);
    chunk.forEach(({ ref, payload }) => {
      batch.set(ref, payload, { merge: true });
    });
    await batch.commit();
    committed += chunk.length;
  }

  return committed;
}

export async function syncMondayTrailerBoardsToFirebase(firebase, folders = []) {
  const boards = flattenMondayTrailerBoards(folders);
  if (!boards.length) return { total: 0, written: 0 };

  const db = firebase.firestore();
  const snapshot = await db.collection("Trailers").get();
  const docsById = new Map();
  const docsByMondayId = new Map();
  const docsByNumber = new Map();

  snapshot.docs.forEach((docSnap) => {
    const data = docSnap.data() || {};
    docsById.set(docSnap.id, docSnap);
    const mondayBoardId = String(data.mondayBoardId || "").trim();
    if (mondayBoardId) {
      const existing = docsByMondayId.get(mondayBoardId);
      const currentIsCanonical = /^AIS\d+$/i.test(String(docSnap.id || ""));
      const existingIsCanonical = /^AIS\d+$/i.test(String(existing?.id || ""));
      if (!existing || (currentIsCanonical && !existingIsCanonical)) {
        docsByMondayId.set(mondayBoardId, docSnap);
      }
    }
    const trailerNumber =
      extractTrailerNumber(docSnap.id) ||
      extractTrailerNumber(data.number) ||
      extractTrailerNumber(data.name) ||
      extractTrailerNumber(data.mondayBoardName);
    if (Number.isFinite(trailerNumber)) {
      const existing = docsByNumber.get(trailerNumber);
      const currentIsCanonical = /^AIS\d+$/i.test(String(docSnap.id || ""));
      const existingIsCanonical = /^AIS\d+$/i.test(String(existing?.id || ""));
      if (!existing || (currentIsCanonical && !existingIsCanonical)) {
        docsByNumber.set(trailerNumber, docSnap);
      }
    }
  });

  const now = firebase.firestore.FieldValue.serverTimestamp();
  const writes = [];

  boards.forEach((board) => {
    const docId = buildTrailerDocIdFromMondayBoardName(board.name, board.id);
    if (!docId) return;

    const number = extractTrailerNumber(board.name);
    const numberDoc = Number.isFinite(number) ? docsByNumber.get(number) : null;
    const boardDoc = docsByMondayId.get(board.id) || null;
    const numberDocIsCanonical = /^AIS\d+$/i.test(String(numberDoc?.id || ""));
    const existingDoc =
      docsById.get(docId) ||
      (numberDocIsCanonical ? numberDoc : null) ||
      boardDoc ||
      numberDoc;
    const existingData = existingDoc?.data?.() || null;
    const shouldPreserveExistingName =
      existingData &&
      /^AIS\d+$/i.test(String(existingDoc?.id || "")) &&
      String(existingData.name || "").trim();
    const payload = {
      ...(shouldPreserveExistingName ? {} : { name: board.name }),
      mondayBoardId: board.id,
      mondayBoardName: board.name,
      mondayFolderId: board.folderId,
      mondayFolderName: board.folderName,
      number: Number.isFinite(number) ? number : null,
      source: "monday",
    };

    if (!shouldWriteMondayPayload(existingData, payload)) return;

    writes.push({
      ref: existingDoc?.ref || db.collection("Trailers").doc(docId),
      payload: {
        ...payload,
        updatedFromMondayAt: now,
        updatedAt: now,
        ...(existingData
          ? {}
          : {
              createdAt: now,
              lfOnMap: false,
              lfSlot: null,
            }),
      },
    });
  });

  const written = await commitBatch(db, writes);
  return { total: boards.length, written };
}
