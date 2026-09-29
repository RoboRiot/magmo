"use strict";
const normalized = value => String(value || "").trim().toLowerCase();
function linkRuntimeEnabled(env = process.env, databaseProject = "") {
  const environments = [env.OPS_ENVIRONMENT, env.NEXT_PUBLIC_DEPLOY_ENV].map(normalized).filter(Boolean);
  if (environments.some(environment => !["production", "prod"].includes(environment)) ||
    /test|staging/i.test(env.K_SERVICE || "") || normalized(env.OPS_INGEST_MODE) === "read_only" ||
    ["false", "0", "off"].includes(normalized(env.OPS_INGEST_WRITE_ENABLED)) ||
    (normalized(env.NODE_ENV) && normalized(env.NODE_ENV) !== "production")) return false;
  let firebaseProject = "";
  try { firebaseProject = JSON.parse(env.FIREBASE_CONFIG || "{}").projectId || ""; } catch { return false; }
  const projects = [databaseProject, env.GCLOUD_PROJECT, env.GOOGLE_CLOUD_PROJECT, env.FIREBASE_PROJECT_ID, firebaseProject].filter(Boolean);
  return projects.length > 0 && projects.every(project => project === "magmo-ac10c");
}
module.exports = { linkRuntimeEnabled };
