import { getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const isProduction = process.env.NODE_ENV === "production";

export async function requireFirebaseAuth(req, res) {
  const header = req.headers?.authorization || "";
  const match = header.match(/^Bearer\s+(.+)$/i);
  const token = match?.[1];

  if (!token) {
    if (isProduction) {
      res.status(401).json({ error: "Missing auth token." });
      return null;
    }
    return null;
  }

  try {
    if (!getApps().length) {
      if (isProduction) {
        res.status(503).json({ error: "Firebase Admin not available." });
        return null;
      }
      return null;
    }
    const decoded = await getAuth().verifyIdToken(token);
    return decoded;
  } catch (error) {
    if (isProduction) {
      res.status(401).json({ error: "Invalid auth token." });
      return null;
    }
    return null;
  }
}

