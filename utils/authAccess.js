export const ALLOWED_EMAIL_DOMAIN = "advancedimagingparts.com";

export const USER_ROLES = {
  ADMIN: "admin",
  REGULAR: "regular",
};

export function isAllowedEmailDomain(email) {
  if (!email || typeof email !== "string") return false;
  const normalizedEmail = email.trim().toLowerCase();
  return normalizedEmail.endsWith(`@${ALLOWED_EMAIL_DOMAIN}`);
}

export function normalizeRole(roleValue) {
  const normalizedRole = String(roleValue || "").trim().toLowerCase();
  return normalizedRole === USER_ROLES.ADMIN
    ? USER_ROLES.ADMIN
    : USER_ROLES.REGULAR;
}

export function getRoleFromClaims(claims) {
  const safeClaims = claims && typeof claims === "object" ? claims : {};
  if (safeClaims.isAdmin === true) return USER_ROLES.ADMIN;
  return normalizeRole(safeClaims.role);
}

export function hasRequiredRole(authUser, requiredRole) {
  if (!requiredRole) return true;
  if (!authUser) return false;
  return normalizeRole(authUser.role) === normalizeRole(requiredRole);
}
