const fs = require("fs");
const path = require("path");

const projectRoot = path.resolve(__dirname, "..");
const functionsRoot = path.join(projectRoot, "functions");
const buildRoot = path.join(functionsRoot, ".next");
const buildIdPath = path.join(buildRoot, "BUILD_ID");
const nestedNodeModules = path.join(buildRoot, "node_modules");
const nonRuntimeDirectories = ["cache", "dev", "diagnostics", "types"];

function fail(message) {
  console.error(`[Firebase build verification] ${message}`);
  process.exit(1);
}

if (!fs.existsSync(buildIdPath)) {
  fail("functions/.next is missing BUILD_ID. Run the Firebase build first.");
}

// Firebase Functions excludes every directory named node_modules from its
// source upload. Next.js 16 Turbopack can place hashed runtime packages here,
// leaving deployed server chunks with imports that cannot be resolved.
if (fs.existsSync(nestedNodeModules)) {
  const generatedPackages = fs
    .readdirSync(nestedNodeModules, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .slice(0, 8);
  fail(
    "functions/.next/node_modules would be removed by Firebase during upload" +
      (generatedPackages.length
        ? ` (found: ${generatedPackages.join(", ")}).`
        : ".")
  );
}

for (const directory of nonRuntimeDirectories) {
  if (fs.existsSync(path.join(buildRoot, directory))) {
    fail(
      `Non-runtime build directory was not removed: functions/.next/${directory}`
    );
  }
}

for (const dependency of [
  "next/package.json",
  "react/package.json",
  "react-dom/package.json",
  "firebase/package.json",
]) {
  try {
    require.resolve(dependency, { paths: [functionsRoot] });
  } catch {
    fail(`Required runtime dependency is missing: ${dependency}`);
  }
}

console.log(
  `[Firebase build verification] OK — build ${fs
    .readFileSync(buildIdPath, "utf8")
    .trim()} is deployable.`
);
