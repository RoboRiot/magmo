import "../../../context/FirebaseAdmin";
import { getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import {
  getEffectiveRole,
  isAdminRole,
  isAllowedEmailDomain,
  isMasterAdminEmail,
  USER_ROLES,
} from "../../../utils/authAccess";
import { requireFirebaseAuth } from "../../../utils/apiAuth";

const EDITABLE_ROLES = new Set([
  USER_ROLES.ADMIN,
  USER_ROLES.USER,
  USER_ROLES.VIEWER,
]);

function isMasterAdminToken(decodedToken) {
  return isMasterAdminEmail(decodedToken?.email);
}

function normalizeDisplayName(value) {
  return String(value || "").trim().replace(/\s+/g, " ");
}

function serializeUser(userRecord) {
  const email = String(userRecord.email || "").trim().toLowerCase();
  const claims = userRecord.customClaims || {};
  const isMasterAdmin = isMasterAdminEmail(email);
  const isInternal = isAllowedEmailDomain(email);
  const effectiveRole = getEffectiveRole(email, claims);
  const disabled = userRecord.disabled === true;
  const accessApproved =
    !disabled && (isInternal || effectiveRole === USER_ROLES.VIEWER || isMasterAdmin);
  const role =
    !isInternal && !accessApproved ? USER_ROLES.VIEWER : effectiveRole;
  const fallbackName = email ? email.split("@")[0] : "Unnamed user";

  return {
    uid: userRecord.uid,
    email,
    displayName:
      normalizeDisplayName(claims.magmoName || userRecord.displayName) ||
      fallbackName,
    role,
    isMasterAdmin,
    isInternal,
    accessApproved,
    disabled,
    createdAt: userRecord.metadata?.creationTime || null,
    lastSignInAt: userRecord.metadata?.lastSignInTime || null,
  };
}

async function listAllUsers(adminAuth) {
  const users = [];
  let pageToken;

  do {
    const result = await adminAuth.listUsers(1000, pageToken);
    users.push(...result.users.map(serializeUser));
    pageToken = result.pageToken;
  } while (pageToken);

  return users.sort((left, right) => {
    if (left.isMasterAdmin !== right.isMasterAdmin) {
      return left.isMasterAdmin ? -1 : 1;
    }
    if (left.disabled !== right.disabled) {
      return left.disabled ? 1 : -1;
    }
    return (left.displayName || left.email).localeCompare(
      right.displayName || right.email
    );
  });
}

async function updateUser(adminAuth, body) {
  const uid = String(body?.uid || "").trim();
  const displayName = normalizeDisplayName(body?.displayName);
  const requestedRole = String(body?.role || "").trim().toLowerCase();

  if (!uid) {
    const error = new Error("Missing user id.");
    error.statusCode = 400;
    throw error;
  }
  if (!displayName || displayName.length > 80) {
    const error = new Error("Name must be between 1 and 80 characters.");
    error.statusCode = 400;
    throw error;
  }

  const currentUser = await adminAuth.getUser(uid);
  const email = String(currentUser.email || "").trim().toLowerCase();
  const isMasterAdmin = isMasterAdminEmail(email);
  const role = isMasterAdmin ? USER_ROLES.MASTER_ADMIN : requestedRole;

  if (!isMasterAdmin && !EDITABLE_ROLES.has(role)) {
    const error = new Error("Select Admin, User, or Viewer.");
    error.statusCode = 400;
    throw error;
  }
  if (!isAllowedEmailDomain(email) && role !== USER_ROLES.VIEWER) {
    const error = new Error("Outside accounts can only be assigned Viewer access.");
    error.statusCode = 400;
    throw error;
  }

  const nextClaims = {
    ...(currentUser.customClaims || {}),
    role,
    isAdmin: isAdminRole(role),
    magmoName: displayName,
  };

  await adminAuth.updateUser(uid, { displayName });
  await adminAuth.setCustomUserClaims(uid, nextClaims);

  return serializeUser(await adminAuth.getUser(uid));
}

async function changeUserAccess(adminAuth, body) {
  const uid = String(body?.uid || "").trim();
  const action = String(body?.action || "").trim().toLowerCase();

  if (!uid) {
    const error = new Error("Missing user id.");
    error.statusCode = 400;
    throw error;
  }
  if (action !== "remove" && action !== "restore") {
    const error = new Error("Select remove or restore.");
    error.statusCode = 400;
    throw error;
  }

  const currentUser = await adminAuth.getUser(uid);
  const email = String(currentUser.email || "").trim().toLowerCase();
  if (isMasterAdminEmail(email)) {
    const error = new Error("The Master Admin account cannot be removed.");
    error.statusCode = 400;
    throw error;
  }

  const removing = action === "remove";
  const nextClaims = { ...(currentUser.customClaims || {}) };
  if (removing) {
    nextClaims.magmoAccessRevoked = true;
    nextClaims.isAdmin = false;
  } else {
    delete nextClaims.magmoAccessRevoked;
    nextClaims.isAdmin = isAdminRole(getEffectiveRole(email, nextClaims));
  }

  await adminAuth.setCustomUserClaims(uid, nextClaims);
  await adminAuth.updateUser(uid, { disabled: removing });
  if (removing) {
    await adminAuth.revokeRefreshTokens(uid);
  }

  return serializeUser(await adminAuth.getUser(uid));
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "GET" && req.method !== "PATCH") {
    res.setHeader("Allow", "GET, PATCH");
    res.status(405).json({ error: "Method not allowed." });
    return;
  }

  if (!getApps().length) {
    res.status(503).json({ error: "Firebase Admin is not configured." });
    return;
  }

  const decodedToken = await requireFirebaseAuth(req, res);
  if (!decodedToken) {
    if (!res.headersSent) res.status(401).json({ error: "Authentication required." });
    return;
  }
  if (!isMasterAdminToken(decodedToken)) {
    res.status(403).json({ error: "Only the Master Admin can manage users." });
    return;
  }

  try {
    const adminAuth = getAuth();
    if (req.method === "GET") {
      const users = await listAllUsers(adminAuth);
      res.status(200).json({ users });
      return;
    }

    const requestedAction = String(req.body?.action || "").trim();
    const user = requestedAction
      ? await changeUserAccess(adminAuth, req.body)
      : await updateUser(adminAuth, req.body);
    res.status(200).json({ user });
  } catch (error) {
    console.error("Admin user management failed:", error);
    res.status(error.statusCode || 500).json({
      error: error.statusCode ? error.message : "User settings could not be saved.",
    });
  }
}
