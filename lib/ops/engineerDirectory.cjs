const ENGINEER_ROLES = new Set([
  "technician",
  "lead technician",
  "subcontractor",
]);

function text(value) {
  if (Array.isArray(value)) return text(value[0]);
  if (value && typeof value === "object") {
    if (value._ != null) return text(value._);
    if (value.text != null) return text(value.text);
    return "";
  }
  return value == null ? "" : String(value).trim();
}

function normalizedText(value) {
  return text(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function asArray(value) {
  if (value == null || value === "") return [];
  return Array.isArray(value) ? value : [value];
}

function roleNames(user) {
  const candidates = [
    ...asArray(user?.roles?.role),
    ...asArray(user?.role),
  ];
  const names = candidates
    .map((role) => {
      if (!role || typeof role !== "object") return text(role);
      return text(
        role.customName || role.name || role.roleName || role.displayName || role
      );
    })
    .filter(Boolean);
  return Array.from(new Set(names));
}

function isInactive(value) {
  return new Set(["1", "true", "yes", "inactive", "disabled"]).has(
    normalizedText(value)
  );
}

function normalizeBlueFolderUser(user) {
  if (!user || typeof user !== "object") return null;
  const bluefolderUserId = text(
    user.userId || user.userID || user.id || user.uid
  );
  const firstName = text(user.firstName);
  const lastName = text(user.lastName);
  const name = text(
    user.fullName ||
      user.displayName ||
      [firstName, lastName].filter(Boolean).join(" ") ||
      user.userName
  );
  if (!/^[A-Za-z0-9_-]{1,80}$/.test(bluefolderUserId) || !name) return null;

  const roles = roleNames(user);
  const hasEngineerRole = roles.some((role) =>
    ENGINEER_ROLES.has(normalizedText(role))
  );
  const active = !isInactive(user.inactive);
  return {
    id: `bluefolder:${bluefolderUserId}`,
    bluefolderUserId,
    name: name.slice(0, 100),
    roles,
    active,
    isEngineer: hasEngineerRole,
    eligible: active && hasEngineerRole,
  };
}

function normalizeBlueFolderUsers(users) {
  const byId = new Map();
  for (const rawUser of asArray(users)) {
    const user = normalizeBlueFolderUser(rawUser);
    if (user) byId.set(user.id, user);
  }
  return Array.from(byId.values()).sort((left, right) =>
    left.name.localeCompare(right.name)
  );
}

function publicPerson(person) {
  const id = text(person?.id);
  const name = text(person?.name);
  if (!id || !name) return null;
  return { id, name };
}

function nameKey(value) {
  return normalizedText(value);
}

function mergeCoveragePeople(slackPeople, blueFolderPeople) {
  const merged = new Map();
  const slackByName = new Map();

  for (const rawPerson of asArray(slackPeople)) {
    const person = publicPerson(rawPerson);
    if (!person) continue;
    const entry = { ...person, aliases: [person.id] };
    merged.set(person.id, entry);
    const key = nameKey(person.name);
    if (key && !slackByName.has(key)) slackByName.set(key, entry);
  }

  for (const rawPerson of asArray(blueFolderPeople)) {
    const person = publicPerson(rawPerson);
    if (!person) continue;
    const exactSlackMatch = slackByName.get(nameKey(person.name));
    if (exactSlackMatch) {
      if (!exactSlackMatch.aliases.includes(person.id)) {
        exactSlackMatch.aliases.push(person.id);
      }
      continue;
    }
    if (!merged.has(person.id)) {
      merged.set(person.id, { ...person, aliases: [person.id] });
    }
  }

  return Array.from(merged.values()).sort((left, right) =>
    left.name.localeCompare(right.name)
  );
}

function publicCoveragePeople(people) {
  return asArray(people).map(publicPerson).filter(Boolean);
}

module.exports = {
  ENGINEER_ROLES,
  mergeCoveragePeople,
  normalizeBlueFolderUser,
  normalizeBlueFolderUsers,
  publicCoveragePeople,
  roleNames,
};
