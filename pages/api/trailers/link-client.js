import { FieldValue } from "firebase-admin/firestore";
import { adminDb } from "../../../context/FirebaseAdmin";
import {
  getRoleFromClaims,
  isAdminEmail,
  USER_ROLES,
} from "../../../utils/authAccess";
import { requireFirebaseAuth } from "../../../utils/apiAuth";

const SYNTHETIC_TRAILER_CLIENT_ID = "AIS62854";

function clean(value, maxLength = 500) {
  return String(value ?? "").trim().slice(0, maxLength);
}

function referenceId(value) {
  if (!value) return "";
  if (typeof value === "string") {
    return clean(value.split("/").filter(Boolean).pop(), 180);
  }
  return clean(value.id, 180);
}

function clientName(data = {}, fallback = "") {
  return clean(data.name || data.Name || data.clientName || fallback, 220);
}

function flattenLocation(value) {
  if (!value) return "";
  if (typeof value === "string") return clean(value, 500);
  if (Array.isArray(value)) {
    return value.map(flattenLocation).filter(Boolean).join(", ").slice(0, 500);
  }
  if (typeof value === "object") {
    return Object.values(value)
      .map(flattenLocation)
      .filter(Boolean)
      .join(", ")
      .slice(0, 500);
  }
  return clean(value, 500);
}

function clientAddress(data = {}) {
  return flattenLocation(
    data.bluefolderFormattedAddress ||
      data.blueFolderFormattedAddress ||
      data.location ||
      data.local ||
      data.address
  );
}

function isAdminUser(decodedToken) {
  return (
    isAdminEmail(decodedToken?.email) ||
    getRoleFromClaims(decodedToken) === USER_ROLES.ADMIN
  );
}

class LinkConflictError extends Error {
  constructor(message, status = 409) {
    super(message);
    this.status = status;
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ error: "Method not allowed." });
    return;
  }
  if (!adminDb) {
    res.status(503).json({ error: "Firebase Admin is not configured." });
    return;
  }

  const decodedToken = await requireFirebaseAuth(req, res);
  if (!decodedToken || !isAdminUser(decodedToken)) {
    res.status(403).json({ error: "Only admin users can change trailer links." });
    return;
  }

  const trailerId = clean(req.body?.trailerId, 180);
  const clientId = clean(req.body?.clientId, 180);
  const expectedClientId = clean(req.body?.expectedClientId, 180);
  const hasMachineSelection = Object.prototype.hasOwnProperty.call(
    req.body || {},
    "associatedMachineId"
  );
  const requestedMachineId = clean(req.body?.associatedMachineId, 180);

  if (
    !trailerId ||
    trailerId === "layout_meta" ||
    trailerId.includes("/") ||
    trailerId.includes("\\")
  ) {
    res.status(400).json({ error: "Select a valid trailer record." });
    return;
  }
  if (clientId === SYNTHETIC_TRAILER_CLIENT_ID) {
    res.status(400).json({
      error: "AIS TRAILERS is retired as a client. Select the real client site.",
    });
    return;
  }

  try {
    const result = await adminDb.runTransaction(async (transaction) => {
      const trailerRef = adminDb.collection("Trailers").doc(trailerId);
      const trailerSnapshot = await transaction.get(trailerRef);
      if (!trailerSnapshot.exists) {
        throw new LinkConflictError("Trailer not found.", 404);
      }

      const trailer = trailerSnapshot.data() || {};
      const previousClientId =
        referenceId(trailer.currentClient) ||
        clean(trailer.currentClientId || trailer.locationCurrentId, 180);
      const previousMachineId =
        referenceId(trailer.associatedMachine) ||
        clean(trailer.associatedMachineId, 180);
      const targetMachineId = hasMachineSelection
        ? requestedMachineId
        : previousMachineId;

      if (expectedClientId && expectedClientId !== previousClientId) {
        throw new LinkConflictError(
          `Trailer link changed from ${expectedClientId} to ${previousClientId || "unassigned"}. Refresh and try again.`
        );
      }

      const refs = new Map();
      const addRef = (ref) => {
        if (ref) refs.set(ref.path, ref);
      };
      const previousClientRef = previousClientId
        ? adminDb.collection("Client").doc(previousClientId)
        : null;
      const targetClientRef = clientId
        ? adminDb.collection("Client").doc(clientId)
        : null;
      const syntheticClientRef = adminDb
        .collection("Client")
        .doc(SYNTHETIC_TRAILER_CLIENT_ID);
      const previousMachineRef = previousMachineId
        ? adminDb.collection("Machine").doc(previousMachineId)
        : null;
      const targetMachineRef = targetMachineId
        ? adminDb.collection("Machine").doc(targetMachineId)
        : null;
      [
        previousClientRef,
        targetClientRef,
        syntheticClientRef,
        previousMachineRef,
        targetMachineRef,
      ].forEach(addRef);

      const snapshots = refs.size
        ? await transaction.getAll(...refs.values())
        : [];
      const snapshotByPath = new Map(
        snapshots.map((snapshot) => [snapshot.ref.path, snapshot])
      );
      const targetClientSnapshot = targetClientRef
        ? snapshotByPath.get(targetClientRef.path)
        : null;
      const targetMachineSnapshot = targetMachineRef
        ? snapshotByPath.get(targetMachineRef.path)
        : null;
      if (targetClientRef && !targetClientSnapshot?.exists) {
        throw new LinkConflictError("Selected client was not found.", 404);
      }
      if (targetMachineRef && !targetMachineSnapshot?.exists) {
        throw new LinkConflictError("Selected associated machine was not found.", 404);
      }

      const targetClient = targetClientSnapshot?.data() || {};
      const targetClientName = targetClientRef
        ? clientName(targetClient, clientId)
        : "";
      const targetClientAddress = targetClientRef
        ? clientAddress(targetClient)
        : "";
      const now = FieldValue.serverTimestamp();

      const trailerPatch = {
        locationCurrentId: clientId,
        currentClientId: clientId,
        currentClient: targetClientRef || null,
        locationCurrentName: targetClientName,
        locationCurrent: targetClientName,
        location: targetClientName,
        locationCurrentClientLocation: targetClientAddress,
        associatedMachineId: targetMachineId,
        associatedMachine: targetMachineRef || null,
        clientTrailerLinkUpdatedAt: now,
        clientTrailerLinkUpdatedBy: clean(decodedToken.email, 220),
        updatedAt: now,
      };
      transaction.set(trailerRef, trailerPatch, { merge: true });

      if (previousMachineRef && previousMachineId !== targetMachineId) {
        transaction.set(
          previousMachineRef,
          {
            client: null,
            clientId: "",
            trailerId: "",
            updatedAt: now,
          },
          { merge: true }
        );
      }
      if (targetMachineRef) {
        transaction.set(
          targetMachineRef,
          {
            client: targetClientRef || null,
            clientId,
            trailerId,
            updatedAt: now,
          },
          { merge: true }
        );
      }

      const affectedClientRefs = new Map();
      [previousClientRef, targetClientRef, syntheticClientRef]
        .filter(Boolean)
        .forEach((clientRef) => affectedClientRefs.set(clientRef.path, clientRef));
      const affectedMachineIds = new Set(
        [previousMachineId, targetMachineId].filter(Boolean)
      );
      affectedClientRefs.forEach((clientRef) => {
        const clientSnapshot = snapshotByPath.get(clientRef.path);
        if (!clientSnapshot?.exists) return;
        const existingMachines = Array.isArray(clientSnapshot.data()?.machines)
          ? clientSnapshot.data().machines
          : [];
        const nextMachines = existingMachines.filter(
          (machine) => !affectedMachineIds.has(referenceId(machine))
        );
        if (
          targetClientRef?.path === clientRef.path &&
          targetMachineRef
        ) {
          nextMachines.push(targetMachineRef);
        }
        transaction.set(
          clientRef,
          { machines: nextMachines, updatedAt: now },
          { merge: true }
        );
      });

      const auditRef = adminDb.collection("TrailerClientLinkAudit").doc();
      transaction.set(auditRef, {
        trailerId,
        trailer: trailerRef,
        previousClientId,
        previousClient: previousClientRef || null,
        clientId,
        client: targetClientRef || null,
        previousMachineId,
        previousMachine: previousMachineRef || null,
        associatedMachineId: targetMachineId,
        associatedMachine: targetMachineRef || null,
        changedByEmail: clean(decodedToken.email, 220),
        changedByUid: clean(decodedToken.uid, 180),
        createdAt: now,
      });

      return {
        trailerId,
        clientId,
        clientName: targetClientName,
        clientAddress: targetClientAddress,
        associatedMachineId: targetMachineId,
        previousClientId,
      };
    });

    res.status(200).json({ ok: true, ...result });
  } catch (error) {
    const status = Number(error?.status) || 500;
    if (status >= 500) console.error("Trailer/client link failed:", error);
    res.status(status).json({
      error:
        status >= 500
          ? "Failed to update the trailer/client link."
          : clean(error?.message, 500),
    });
  }
}
