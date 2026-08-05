const values = new Map();
for (let index = 2; index < process.argv.length; index += 2) {
  values.set(process.argv[index], process.argv[index + 1]);
}

const baseUrl = String(values.get("--base-url") || "").replace(/\/$/, "");
const expectedEnvironment = values.get("--environment");
const expectedWriteEnabled = values.get("--write-enabled") === "true";
const expectedVersion = values.get("--version");

if (!/^https:\/\//.test(baseUrl)) {
  throw new Error("--base-url must be an HTTPS URL.");
}

const [healthResponse, openApiResponse] = await Promise.all([
  fetch(`${baseUrl}/api/ops/health`),
  fetch(`${baseUrl}/api/ops/openapi`),
]);
if (!healthResponse.ok) throw new Error(`Health check returned ${healthResponse.status}.`);
if (!openApiResponse.ok) throw new Error(`OpenAPI check returned ${openApiResponse.status}.`);

const health = await healthResponse.json();
const openApi = await openApiResponse.json();
if (health.environment !== expectedEnvironment) {
  throw new Error(`Expected environment ${expectedEnvironment}; received ${health.environment}.`);
}
if (health.writeEnabled !== expectedWriteEnabled) {
  throw new Error(`Expected writeEnabled=${expectedWriteEnabled}; received ${health.writeEnabled}.`);
}
if (health.deployedVersion !== expectedVersion) {
  throw new Error(`Expected version ${expectedVersion}; received ${health.deployedVersion}.`);
}
for (const eventType of ["trailer.command_context", "trailer.movement"]) {
  if (!health.supportedEventTypes.includes(eventType)) {
    throw new Error(`Health response does not advertise ${eventType}.`);
  }
}
if (openApi.openapi !== "3.1.0" || !openApi.paths?.["/api/ops/ingest"]) {
  throw new Error("The deployed OpenAPI document is incomplete.");
}

console.log(`Verified ${health.service} ${health.deployedVersion} in ${health.environment}.`);
