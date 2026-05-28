import { adminDb } from "../../../context/FirebaseAdmin";
import { ADMIN_EMAILS, getRoleFromClaims } from "../../../utils/authAccess";
import { requireFirebaseAuth } from "../../../utils/apiAuth";

const PART_BLOCK_FIELDS = ["ClientFrom", "ClientCurrent"];
const PART_BLOCK_ID_FIELDS = ["clientFromId", "clientCurrentId"];
const MACHINE_BLOCK_FIELDS = [
  "Machine",
  "MachineFrom",
  "CurrentMachine",
  "MachineCurrent",
];

function getRefId(ref) {
  if (!ref) return "";
  if (typeof ref === "string") return ref;
  if (ref.id) return ref.id;
  return "";
}

function isAdminUser(decodedToken) {
  const email = String(decodedToken?.email || "").trim().toLowerCase();
  if (ADMIN_EMAILS.includes(email)) return true;
  return getRoleFromClaims(decodedToken) === "admin";
}

async function addBlockingDocsFromQuery(blockingDocs, query) {
  const snap = await query.limit(6).get();
  snap.forEach((doc) => {
    if (blockingDocs.size >= 6) return;
    const data = doc.data() || {};
    blockingDocs.set(doc.id, {
      id: doc.id,
      name: data.name || data.itemName || "",
    });
  });
}

async function fetchMachineIdsForClient(db, clientId, clientData) {
  const machineIds = new Set();
  const clientRef = db.collection("Client").doc(clientId);
  const machineRefs = Array.isArray(clientData?.machines)
    ? clientData.machines
    : [];

  machineRefs.forEach((machineRef) => {
    const machineId = getRefId(machineRef);
    if (machineId) machineIds.add(machineId);
  });

  const [refSnap, idSnap] = await Promise.all([
    db.collection("Machine").where("client", "==", clientRef).get(),
    db.collection("Machine").where("client", "==", clientId).get(),
  ]);
  refSnap.forEach((doc) => machineIds.add(doc.id));
  idSnap.forEach((doc) => machineIds.add(doc.id));

  return Array.from(machineIds);
}

async function findBlockingParts(db, clientId, clientData) {
  const blockingDocs = new Map();
  const clientRef = db.collection("Client").doc(clientId);

  for (const field of PART_BLOCK_FIELDS) {
    await addBlockingDocsFromQuery(
      blockingDocs,
      db.collection("Test").where(field, "==", clientRef)
    );
  }

  for (const field of PART_BLOCK_ID_FIELDS) {
    await addBlockingDocsFromQuery(
      blockingDocs,
      db.collection("Test").where(field, "==", clientId)
    );
  }

  const machineIds = await fetchMachineIdsForClient(db, clientId, clientData);
  const machineRefs = machineIds.map((id) => db.collection("Machine").doc(id));

  for (const field of MACHINE_BLOCK_FIELDS) {
    for (let index = 0; index < machineRefs.length; index += 10) {
      await addBlockingDocsFromQuery(
        blockingDocs,
        db.collection("Test").where(field, "in", machineRefs.slice(index, index + 10))
      );
      if (blockingDocs.size >= 6) return Array.from(blockingDocs.values());
    }

    for (let index = 0; index < machineIds.length; index += 10) {
      await addBlockingDocsFromQuery(
        blockingDocs,
        db.collection("Test").where(field, "in", machineIds.slice(index, index + 10))
      );
      if (blockingDocs.size >= 6) return Array.from(blockingDocs.values());
    }
  }

  return Array.from(blockingDocs.values());
}

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    res.setHeader("Allow", "DELETE");
    res.status(405).json({ error: "Method not allowed." });
    return;
  }

  if (!adminDb) {
    res.status(503).json({ error: "Firebase Admin is not configured." });
    return;
  }

  const decodedToken = await requireFirebaseAuth(req, res);
  if (!decodedToken || !isAdminUser(decodedToken)) {
    res.status(403).json({ error: "Only admin users can delete clients." });
    return;
  }

  const clientId = String(req.body?.clientId || "").trim();
  if (!clientId) {
    res.status(400).json({ error: "Missing clientId." });
    return;
  }

  try {
    const clientRef = adminDb.collection("Client").doc(clientId);
    const clientDoc = await clientRef.get();
    if (!clientDoc.exists) {
      res.status(404).json({ error: "Client not found." });
      return;
    }

    const blockingParts = await findBlockingParts(
      adminDb,
      clientId,
      clientDoc.data() || {}
    );
    if (blockingParts.length) {
      res.status(409).json({
        error:
          "This client still has associated parts. Move those parts before deleting the client.",
        blockingParts,
      });
      return;
    }

    await clientRef.delete();
    res.status(200).json({ ok: true, clientId });
  } catch (error) {
    console.error("Client delete failed:", error);
    res.status(500).json({ error: "Failed to delete client." });
  }
}
