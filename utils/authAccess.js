export const ALLOWED_EMAIL_DOMAIN = "advancedimagingparts.com";

export const USER_ROLES = {
  MASTER_ADMIN: "master_admin",
  ADMIN: "admin",
  USER: "user",
  VIEWER: "viewer",
  // Kept as an alias while older pages move from the previous role name.
  REGULAR: "user",
};

export const MASTER_ADMIN_EMAILS = ["isavchenko@advancedimagingparts.com"];
// Backward-compatible export used by existing admin-only API routes.
export const ADMIN_EMAILS = MASTER_ADMIN_EMAILS;

export const ROLE_LABELS = {
  [USER_ROLES.MASTER_ADMIN]: "Master Admin",
  [USER_ROLES.ADMIN]: "Admin",
  [USER_ROLES.USER]: "User",
  [USER_ROLES.VIEWER]: "Viewer",
};

const ROLE_RANK = {
  [USER_ROLES.VIEWER]: 0,
  [USER_ROLES.USER]: 1,
  [USER_ROLES.ADMIN]: 2,
  [USER_ROLES.MASTER_ADMIN]: 3,
};

const ACCESS_REVOKED_ERROR_CODES = new Set([
  "auth/id-token-revoked",
  "auth/invalid-user-token",
  "auth/user-disabled",
  "auth/user-token-expired",
]);

export function isAccessRevokedError(error) {
  return ACCESS_REVOKED_ERROR_CODES.has(String(error?.code || "").toLowerCase());
}

export function isAllowedEmailDomain(email) {
  if (!email || typeof email !== "string") return false;
  const normalizedEmail = email.trim().toLowerCase();
  return normalizedEmail.endsWith(`@${ALLOWED_EMAIL_DOMAIN}`);
}

export function isAdminEmail(email) {
  return isMasterAdminEmail(email);
}

export function isMasterAdminEmail(email) {
  if (!email || typeof email !== "string") return false;
  const normalizedEmail = email.trim().toLowerCase();
  return MASTER_ADMIN_EMAILS.includes(normalizedEmail);
}

export function normalizeRole(roleValue) {
  const normalizedRole = String(roleValue || "")
    .trim()
    .toLowerCase()
    .replace(/[\s-]+/g, "_");

  if (normalizedRole === USER_ROLES.MASTER_ADMIN) {
    return USER_ROLES.MASTER_ADMIN;
  }
  if (normalizedRole === USER_ROLES.ADMIN) return USER_ROLES.ADMIN;
  if (normalizedRole === USER_ROLES.VIEWER) return USER_ROLES.VIEWER;
  if (normalizedRole === "regular" || normalizedRole === "employee") {
    return USER_ROLES.USER;
  }
  return USER_ROLES.USER;
}

export function getRoleFromClaims(claims) {
  const safeClaims = claims && typeof claims === "object" ? claims : {};
  const claimedRole = normalizeRole(safeClaims.role);
  if (claimedRole === USER_ROLES.MASTER_ADMIN) {
    return USER_ROLES.MASTER_ADMIN;
  }
  if (safeClaims.isAdmin === true) return USER_ROLES.ADMIN;
  return claimedRole;
}

export function getEffectiveRole(email, claims) {
  if (isMasterAdminEmail(email)) return USER_ROLES.MASTER_ADMIN;
  const claimedRole = getRoleFromClaims(claims);
  return claimedRole === USER_ROLES.MASTER_ADMIN ? USER_ROLES.USER : claimedRole;
}

export function canAccessMagmo(email, claims) {
  const safeClaims = claims && typeof claims === "object" ? claims : {};
  if (safeClaims.magmoAccessRevoked === true) return false;
  if (isAllowedEmailDomain(email)) return true;
  return getEffectiveRole(email, safeClaims) === USER_ROLES.VIEWER;
}

export function canAccessWebsiteAnalysis(email, claims) {
  const safeClaims = claims && typeof claims === "object" ? claims : {};
  if (safeClaims.magmoAccessRevoked === true) return false;
  return isAdminRole(getEffectiveRole(email, safeClaims));
}

export function isAdminRole(roleValue) {
  const role = normalizeRole(roleValue);
  return role === USER_ROLES.ADMIN || role === USER_ROLES.MASTER_ADMIN;
}

export function getRoleLabel(roleValue) {
  return ROLE_LABELS[normalizeRole(roleValue)] || ROLE_LABELS[USER_ROLES.USER];
}

export function hasRequiredRole(authUser, requiredRole) {
  if (!requiredRole) return true;
  if (!authUser) return false;
  const currentRank = ROLE_RANK[normalizeRole(authUser.role)];
  const requiredRank = ROLE_RANK[normalizeRole(requiredRole)];
  return currentRank >= requiredRank;
}
