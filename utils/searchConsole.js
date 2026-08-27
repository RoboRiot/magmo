import fs from "fs";
import { GoogleAuth } from "google-auth-library";

const READONLY_SCOPE = "https://www.googleapis.com/auth/webmasters.readonly";
const DEFAULT_SITE_URL = "sc-domain:advancedimagingparts.com";
const DEFAULT_PUBLIC_ORIGIN = "https://advancedimagingparts.com";

let authContextPromise;

const clean = (value, maxLength = 300) =>
  String(value || "")
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .trim()
    .slice(0, maxLength);

const readServiceAccountFile = () => {
  const path =
    process.env.GOOGLE_SEARCH_CONSOLE_SERVICE_ACCOUNT_PATH ||
    process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT_PATH ||
    process.env.FIREBASE_SERVICE_ACCOUNT_PATH;
  if (!path) return null;

  try {
    return JSON.parse(fs.readFileSync(path, "utf8"));
  } catch (error) {
    console.warn("Search Console service account file could not be loaded:", error.message);
    return null;
  }
};

const explicitCredentials = () => {
  const fileCredentials = readServiceAccountFile();
  const clientEmail =
    process.env.GOOGLE_SEARCH_CONSOLE_CLIENT_EMAIL ||
    process.env.FIREBASE_CLIENT_EMAIL ||
    process.env.FIREBASE_ADMIN_CLIENT_EMAIL ||
    fileCredentials?.client_email;
  const privateKey =
    process.env.GOOGLE_SEARCH_CONSOLE_PRIVATE_KEY ||
    process.env.FIREBASE_PRIVATE_KEY ||
    process.env.FIREBASE_ADMIN_PRIVATE_KEY ||
    fileCredentials?.private_key;

  if (!clientEmail || !privateKey) return null;
  return {
    client_email: clientEmail,
    private_key: privateKey.replace(/\\n/g, "\n"),
    project_id:
      process.env.GOOGLE_SEARCH_CONSOLE_PROJECT_ID ||
      process.env.FIREBASE_PROJECT_ID ||
      process.env.FIREBASE_ADMIN_PROJECT_ID ||
      fileCredentials?.project_id,
  };
};

const getAuthContext = async () => {
  if (!authContextPromise) {
    authContextPromise = (async () => {
      const credentials = explicitCredentials();
      const auth = new GoogleAuth({
        ...(credentials ? { credentials } : {}),
        scopes: [READONLY_SCOPE],
      });
      const client = await auth.getClient();
      const resolvedCredentials = await auth.getCredentials().catch(() => ({}));
      return {
        client,
        clientEmail: credentials?.client_email || resolvedCredentials.client_email || "",
      };
    })();
  }
  return authContextPromise;
};

export const getSearchConsoleSettings = async () => {
  const siteUrl = clean(
    process.env.GOOGLE_SEARCH_CONSOLE_SITE_URL || DEFAULT_SITE_URL,
    500
  );
  const publicOrigin = clean(
    process.env.GOOGLE_SEARCH_CONSOLE_PUBLIC_ORIGIN || DEFAULT_PUBLIC_ORIGIN,
    500
  ).replace(/\/$/, "");

  try {
    const auth = await getAuthContext();
    return {
      configured: Boolean(auth.client),
      clientEmail: auth.clientEmail,
      siteUrl,
      publicOrigin,
    };
  } catch (error) {
    return {
      configured: false,
      clientEmail: "",
      siteUrl,
      publicOrigin,
      error: error.message,
    };
  }
};

export const querySearchAnalytics = async ({
  startDate,
  endDate,
  dimensions = [],
  filters = [],
  rowLimit = 25000,
}) => {
  const settings = await getSearchConsoleSettings();
  const { client } = await getAuthContext();
  const data = {
    startDate,
    endDate,
    type: "web",
    dataState: "final",
    aggregationType: dimensions.includes("page") ? "auto" : "byProperty",
    rowLimit: Math.max(1, Math.min(25000, Number(rowLimit) || 1000)),
    ...(dimensions.length ? { dimensions } : {}),
    ...(filters.length
      ? {
          dimensionFilterGroups: [
            {
              groupType: "and",
              filters,
            },
          ],
        }
      : {}),
  };

  const response = await client.request({
    url: `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(
      settings.siteUrl
    )}/searchAnalytics/query`,
    method: "POST",
    data,
  });
  return response.data || {};
};

export const inspectSearchConsoleUrl = async (inspectionUrl) => {
  const settings = await getSearchConsoleSettings();
  const { client } = await getAuthContext();
  const response = await client.request({
    url: "https://searchconsole.googleapis.com/v1/urlInspection/index:inspect",
    method: "POST",
    data: {
      inspectionUrl,
      siteUrl: settings.siteUrl,
      languageCode: "en-US",
    },
  });
  return response.data?.inspectionResult?.indexStatusResult || {};
};

export const normalizeSearchConsoleUrl = (value, publicOrigin = DEFAULT_PUBLIC_ORIGIN) => {
  try {
    const base = new URL(publicOrigin);
    const url = new URL(clean(value, 1000), base);
    const allowedHosts = new Set([base.hostname, `www.${base.hostname}`]);
    if (!allowedHosts.has(url.hostname)) return "";
    url.protocol = "https:";
    url.hash = "";
    url.search = "";
    url.pathname = url.pathname.replace(/\/{2,}/g, "/");
    if (url.pathname.length > 1) url.pathname = url.pathname.replace(/\/$/, "");
    return url.toString();
  } catch {
    return "";
  }
};

export const describeSearchConsoleError = (error) => ({
  status: Number(error?.response?.status || error?.code || 500),
  reason: clean(
    error?.response?.data?.error?.message || error?.message || "Search Console request failed.",
    500
  ),
});
