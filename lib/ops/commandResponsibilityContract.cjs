"use strict";

const MIN_CONFIDENCE = 0.84;
const MIN_EVIDENCE_CONFIDENCE = 0.8;
const SLACK_ID = /^U[A-Z0-9]{6,}$/i;

function clean(value, limit) {
  return String(value || "").replace(/\s+/g, " ").trim().slice(0, limit);
}

function people(value) {
  const seen = new Set();
  return (Array.isArray(value) ? value : [])
    .map((person) => ({
      id: clean(person?.id || person?.slackUserId, 80),
      name: clean(person?.name, 100),
      workMode: clean(person?.workMode, 30).toLowerCase(),
    }))
    .filter((person) => {
      if (!SLACK_ID.test(person.id) || !person.name || seen.has(person.id)) return false;
      seen.add(person.id);
      return true;
    })
    .slice(0, 12);
}

function commandResponsibilityId(reportType, safeTs) {
  return `command-reconciliation-${clean(reportType, 40)}-${clean(safeTs, 100)}`;
}

function normalizeTerminalResponsibility(value, reportType) {
  const confidence = Math.max(0, Math.min(1, Number(value?.confidence || 0)));
  if (!["service_complete", "final"].includes(reportType) || !value || typeof value !== "object") {
    return { apply: false, confidence: 0, phases: [], participants: [], finalAssignees: [] };
  }
  const phaseKeys = new Set();
  const phases = (Array.isArray(value.phases) ? value.phases : [])
    .map((phase) => {
      const slackUserId = clean(phase?.slackUserId, 80);
      const name = clean(phase?.name, 100);
      const workMode = clean(phase?.workMode, 30).toLowerCase();
      const phaseName = clean(phase?.phase, 30).toLowerCase();
      const phaseConfidence = Math.max(0, Math.min(1, Number(phase?.confidence || 0)));
      const key = [slackUserId, workMode, phaseName].join("::");
      if (
        !SLACK_ID.test(slackUserId) ||
        !name ||
        !["remote", "physical"].includes(workMode) ||
        !["initial", "active", "final"].includes(phaseName) ||
        phaseConfidence < MIN_EVIDENCE_CONFIDENCE ||
        phaseKeys.has(key)
      ) return null;
      phaseKeys.add(key);
      return {
        slackUserId,
        name,
        workMode,
        phase: phaseName,
        evidenceType: clean(phase?.evidenceType, 60),
        evidence: clean(phase?.evidence, 500),
        evidenceSlackTs: clean(phase?.evidenceSlackTs, 80),
        confidence: phaseConfidence,
      };
    })
    .filter(Boolean)
    .slice(0, 12);
  const finalPhases = new Map(
    phases.filter((phase) => phase.phase === "final").map((phase) => [phase.slackUserId, phase])
  );
  const finalAssignees = people(value.finalAssignees).filter((person) => {
    const phase = finalPhases.get(person.id);
    return phase && phase.name === person.name && phase.workMode === person.workMode;
  });
  const workerIds = new Set(phases.map((phase) => phase.slackUserId));
  const participants = people(value.participants).filter((person) => !workerIds.has(person.id));
  return {
    apply: Boolean(value.apply && confidence >= MIN_CONFIDENCE && finalAssignees.length),
    confidence,
    summary: clean(value.summary, 700),
    decisionReason: clean(value.decisionReason, 700),
    phases,
    participants,
    finalAssignees,
  };
}

module.exports = {
  commandResponsibilityId,
  normalizeTerminalResponsibility,
};
