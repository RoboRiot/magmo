function compact(value, maxLength = 240) {
  return String(value || "")
    .replace(/[\t\r\n]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

export function simplifyOpsPartName(value) {
  let text = compact(value, 500);
  if (!text) return "";
  text = text
    .replace(/^\s*(?:part|item)\s*[:#-]\s*/i, "")
    .replace(
      /\s*\(\s*(?:P\.?\s*O\.?|purchase\s+order)\s*#?\s*[^)]*\)/gi,
      ""
    )
    .replace(
      /\s*[-,;]?\s*(?:P\.?\s*O\.?|purchase\s+order)\s*#?\s*[A-Z0-9-]+\s*$/i,
      ""
    )
    .replace(
      /\s+(?:(?:ordered|purchased|sourced)\s+from|from|via)\s+[^,;()]+$/i,
      ""
    )
    .replace(/\bcore\s+helium\s+compress\b/gi, "core helium compressor")
    .replace(/\bhelium\s+compress\b/gi, "helium compressor")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^[\s\-–—,;:]+|[\s\-–—,;:]+$/g, "");
  if (
    text.length < 3 ||
    /^https?:\/\//i.test(text) ||
    /^(?:Rec[A-Za-z0-9]+|[CFDTUW][A-Z0-9]{7,})$/i.test(text)
  ) {
    return "";
  }
  return text.slice(0, 180);
}

const PART_PATTERNS = [
  ["core helium compressor", /\bcore\s+helium\s+compress(?:or)?\b/i],
  ["helium compressor", /\bhelium\s+compress(?:or)?\b/i],
  ["DAS converter board", /\bDAS\s+converter\s+board\b/i],
  ["heat exchanger", /\bheat\s+exchanger\b/i],
  ["Jedi tank", /\bJedi\s+tank\b/i],
  ["SCIM", /\bSCIM\b/i],
  ["chiller", /\bchiller\b/i],
  ["power supply", /\bpower\s+supply\b/i],
  ["relay timer", /\brelay\s+timer\b/i],
  ["timer", /\btimer\b/i],
  ["chassis", /\bchassis\b/i],
  ["backplane board", /\b(?:backplane|bp)\s+boards?\b/i],
  ["circuit board", /\b(?:circuit\s+)?boards?\b/i],
  ["tube", /\btubes?\b/i],
  ["detector", /\bdetectors?\b/i],
  ["coil", /\bcoils?\b/i],
  ["cable", /\bcables?\b/i],
  ["hard drive", /\bhard\s+drives?\b/i],
  ["computer", /\bcomputers?\b/i],
];

function namedPart(text, fallback = "") {
  for (const [name, pattern] of PART_PATTERNS) {
    if (pattern.test(text)) return name;
  }
  return fallback;
}

export function inferPartMovementsFromMessages(messages = []) {
  const movements = [];
  const seen = new Set();
  let lastPart = "";
  const add = (partName, movement, status) => {
    const cleanName = simplifyOpsPartName(partName);
    const key = `${cleanName.toLowerCase()}|${movement}`;
    if (!cleanName || seen.has(key)) return;
    seen.add(key);
    movements.push({ partName: cleanName, movement, status: compact(status, 180) });
  };

  for (const message of messages || []) {
    const text = compact(message?.text, 2400);
    if (!text) continue;
    const explicitPart = namedPart(text, "");
    if (explicitPart) lastPart = explicitPart;
    const part = explicitPart || (/\b(?:part|package|unit)\b/i.test(text) ? lastPart : "");
    if (!part) continue;
    const sender = compact(message?.sender?.name, 100);

    if (/\b(?:shipp(?:ed|ing)|sent|sending|courier|uber(?:ing)?|delivery\s+is\s+on\s+the\s+way|on\s+the\s+way)\b/i.test(text)) {
      add(part, "to_site", "Sent toward the service location.");
    }
    if (/\b(?:received|arrived|delivered)\b/i.test(text)) {
      add(part, "received", sender ? `Received by ${sender}.` : "Received.");
    }
    if (/\b(?:install(?:ed|ing)|replac(?:ed|ing)|swapp(?:ed|ing)|put\s+in)\b/i.test(text)) {
      add(part, "installed", /\b(?:trying|will|going\s+to|in\s+progress)\b/i.test(text)
        ? "Installation is in progress."
        : "Installed or used during service.");
    }
    if (/\b(?:removed|pulled|taken\s+out)\b/i.test(text)) {
      add(part, "removed", "Removed from the system.");
    }
    if (/\b(?:return(?:ed|ing)|sent\s+back|back\s+to\s+(?:the\s+)?warehouse)\b/i.test(text)) {
      add(part, "returned", "Returned from the service location.");
    }
  }

  const hasOpenMovement = movements.some((entry) =>
    ["ordered", "incoming", "to_site", "installed", "removed", "outgoing"].includes(
      entry.movement
    )
  );
  const allReturned =
    movements.length > 0 && movements.every((entry) => entry.movement === "returned");
  return {
    movements: movements.slice(0, 8),
    state: allReturned ? "returned" : hasOpenMovement ? "open" : movements.length ? "unknown" : "none",
  };
}
