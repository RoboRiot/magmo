import { adminDb } from "../../../context/FirebaseAdmin";
import { FieldValue } from "firebase-admin/firestore";
import { ADMIN_EMAILS, getRoleFromClaims } from "../../../utils/authAccess";
import { requireFirebaseAuth } from "../../../utils/apiAuth";

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

async function findBlockingParts(db, machineId, machineData) {
  const blockingDocs = new Map();
  const machineRef = db.collection("Machine").doc(machineId);

  for (const field of MACHINE_BLOCK_FIELDS) {
    await addBlockingDocsFromQuery(
      blockingDocs,
      db.collection("Test").where(field, "==", machineRef)
    );
    if (blockingDocs.size >= 6) return Array.from(blockingDocs.values());

    await addBlockingDocsFromQuery(
      blockingDocs,
      db.collection("Test").where(field, "==", machineId)
    );
    if (blockingDocs.size >= 6) return Array.from(blockingDocs.values());
  }

  const associatedParts = Array.isArray(machineData?.associatedParts)
    ? machineData.associatedParts
    : [];
  for (const partRef of associatedParts) {
    if (blockingDocs.size >= 6) break;
    const partId = getRefId(partRef);
    if (!partId || blockingDocs.has(partId)) continue;
    try {
      const doc =
        typeof partRef?.get === "function"
          ? await partRef.get()
          : await db.collection("Test").doc(partId).get();
      if (!doc.exists) continue;
      const data = doc.data() || {};
      blockingDocs.set(doc.id, {
        id: doc.id,
        name: data.name || data.itemName || "",
      });
    } catch (error) {
      console.error("Failed to inspect machine associated part:", error);
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
    res.status(403).json({ error: "Only admin users can delete machines." });
    return;
  }

  const machineId = String(req.body?.machineId || "").trim();
  const clientId = String(req.body?.clientId || "").trim();
  if (!machineId || !clientId) {
    res.status(400).json({ error: "Missing machineId or clientId." });
    return;
  }

  try {
    const machineRef = adminDb.collection("Machine").doc(machineId);
    const clientRef = adminDb.collection("Client").doc(clientId);
    const [machineDoc, clientDoc] = await Promise.all([
      machineRef.get(),
      clientRef.get(),
    ]);

    if (!machineDoc.exists) {
      res.status(404).json({ error: "Machine not found." });
      return;
    }
    if (!clientDoc.exists) {
      res.status(404).json({ error: "Client not found." });
      return;
    }

    const blockingParts = await findBlockingParts(
      adminDb,
      machineId,
      machineDoc.data() || {}
    );
    if (blockingParts.length) {
      res.status(409).json({
        error:
          "This machine still has associated parts. Move those parts before deleting the machine.",
        blockingParts,
      });
      return;
    }

    const batch = adminDb.batch();
    batch.update(clientRef, {
      machines: FieldValue.arrayRemove(machineRef, machineId),
    });
    batch.delete(machineRef);
    await batch.commit();

    res.status(200).json({ ok: true, machineId, clientId });
  } catch (error) {
    console.error("Machine delete failed:", error);
    res.status(500).json({ error: "Failed to delete machine." });
  }
}
