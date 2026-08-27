import { adminDb } from "../../../context/FirebaseAdmin";
import { getOpsCoverageEngineerDirectory } from "../../../lib/ops/engineerDirectory";
import { listOpsAssigneeOptions } from "../../../lib/ops/workOrders";
import { requireFirebaseAuth } from "../../../utils/apiAuth";
import {
  getEffectiveRole,
  isAdminEmail,
  isAdminRole,
} from "../../../utils/authAccess";

const COLLECTION = "OpsOtCoverage";
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function isValidDateKey(value) {
  if (!DATE_PATTERN.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  const parsed = new Date(Date.UTC(year, month - 1, day));
  return (
    parsed.getUTCFullYear() === year &&
    parsed.getUTCMonth() === month - 1 &&
    parsed.getUTCDate() === day
  );
}

function dayDistance(start, end) {
  return Math.round(
    (Date.parse(`${end}T00:00:00.000Z`) -
      Date.parse(`${start}T00:00:00.000Z`)) /
      86400000
  );
}

async function requireOpsAdmin(req, res) {
  const user = await requireFirebaseAuth(req, res);
  if (res.headersSent) return null;
  if (!user?.uid) {
    res.status(401).json({ error: "Authentication required." });
    return null;
  }
  const role = getEffectiveRole(user.email, user);
  if (!isAdminRole(role) && !isAdminEmail(user.email)) {
    res.status(403).json({ error: "OT coverage is available to Admin users only." });
    return null;
  }
  return { ...user, role };
}

function serializeCoverage(document) {
  const data = document.data() || {};
  return {
    id: document.id,
    date: String(data.date || document.id),
    assignees: Array.isArray(data.assignees) ? data.assignees : [],
    note: String(data.note || ""),
    updatedAtIso: String(data.updatedAtIso || ""),
    updatedBy: String(data.updatedBy || ""),
  };
}

export default async function handler(req, res) {
  if (!["GET", "PUT"].includes(req.method)) {
    res.setHeader("Allow", "GET, PUT");
    return res.status(405).json({ error: "Method not allowed." });
  }

  try {
    const user = await requireOpsAdmin(req, res);
    if (res.headersSent || !user) return;
    if (!adminDb) {
      return res.status(503).json({ error: "OT coverage storage is not available." });
    }

    const engineerDirectory = await getOpsCoverageEngineerDirectory({
      db: adminDb,
      slackPeople: listOpsAssigneeOptions(),
      refreshIfStale: true,
    });
    const people = engineerDirectory.people;
    const peopleById = new Map();
    engineerDirectory.internalPeople.forEach((person) => {
      const canonicalPerson = { id: person.id, name: person.name };
      (person.aliases || [person.id]).forEach((id) => {
        peopleById.set(id, canonicalPerson);
      });
    });

    if (req.method === "GET") {
      const start = String(req.query.start || "").trim();
      const end = String(req.query.end || "").trim();
      if (
        !isValidDateKey(start) ||
        !isValidDateKey(end) ||
        end < start ||
        dayDistance(start, end) > 62
      ) {
        return res.status(400).json({
          error: "Choose a valid OT coverage range of no more than 63 days.",
        });
      }
      const snapshot = await adminDb
        .collection(COLLECTION)
        .where("date", ">=", start)
        .where("date", "<=", end)
        .get();
      res.setHeader("Cache-Control", "private, no-store");
      return res.status(200).json({
        ok: true,
        people,
        directory: engineerDirectory.directory,
        coverage: snapshot.docs.map(serializeCoverage),
      });
    }

    const dates = Array.from(
      new Set(
        (Array.isArray(req.body?.dates) && req.body.dates.length
          ? req.body.dates
          : [req.body?.date]
        )
          .map((value) => String(value || "").trim())
          .filter(Boolean)
      )
    ).sort();
    if (!dates.length || dates.length > 63 || dates.some((date) => !isValidDateKey(date))) {
      return res.status(400).json({
        error: "Choose between 1 and 63 valid OT coverage dates.",
      });
    }
    const requestedIds = Array.from(
      new Set(
        (Array.isArray(req.body?.assigneeIds) ? req.body.assigneeIds : [])
          .map((value) => String(value || "").trim())
          .filter(Boolean)
      )
    );
    const invalidIds = requestedIds.filter((id) => !peopleById.has(id));
    if (invalidIds.length) {
      return res.status(400).json({ error: "One or more selected engineers are invalid." });
    }
    const assignees = requestedIds.map((id) => peopleById.get(id));
    const note = String(req.body?.note || "").trim().slice(0, 500);
    const batch = adminDb.batch();

    if (!assignees.length && !note) {
      dates.forEach((date) => batch.delete(adminDb.collection(COLLECTION).doc(date)));
      await batch.commit();
      return res.status(200).json({ ok: true, dates, removed: true, coverage: [] });
    }

    const updatedAtIso = new Date().toISOString();
    const updatedBy = String(user.email || user.uid);
    const coverage = dates.map((date) => {
      const record = { date, assignees, note, updatedAtIso, updatedBy };
      batch.set(adminDb.collection(COLLECTION).doc(date), record, { merge: false });
      return { id: date, ...record };
    });
    await batch.commit();
    return res.status(200).json({ ok: true, dates, coverage });
  } catch (error) {
    if (error?.code === "engineer_directory_unavailable") {
      console.error(
        "[Ops][ot-coverage][engineer-directory]",
        error?.cause?.message || error?.message
      );
      return res.status(503).json({
        error: "The BlueFolder engineer directory is temporarily unavailable.",
      });
    }
    console.error("[Ops][ot-coverage]", error?.message);
    return res.status(500).json({ error: "OT coverage could not be updated." });
  }
}
