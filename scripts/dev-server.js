/* eslint-disable no-console */
const { spawn } = require("node:child_process");
const path = require("node:path");

const originalArgs = process.argv.slice(2);
const nextArgs = [];
let port = null;

for (let index = 0; index < originalArgs.length; index += 1) {
  const argument = originalArgs[index];

  if (argument === "-p" || argument === "--port") {
    const value = originalArgs[index + 1];
    if (!value) {
      console.error("Missing port number after", argument);
      process.exit(1);
    }
    port = value;
    nextArgs.push("--port", value);
    index += 1;
    continue;
  }

  const inlinePort = argument.match(/^--port=(\d+)$/);
  if (inlinePort) {
    port = inlinePort[1];
    nextArgs.push(argument);
    continue;
  }

  nextArgs.push(argument);
}

// Some PowerShell/npm shim combinations consume the short -p flag and leave
// only its numeric value. Preserve the project's long-standing command:
// npm run dev -- -p 3002
if (!port && nextArgs.length > 0 && /^\d+$/.test(nextArgs[0])) {
  port = nextArgs[0];
  nextArgs.splice(0, 1, "--port", port);
}

if (port) {
  const portNumber = Number(port);
  if (!Number.isInteger(portNumber) || portNumber < 1 || portNumber > 65535) {
    console.error("Invalid port number:", port);
    process.exit(1);
  }
}

const nextPackage = require.resolve("next/package.json");
const nextCli = path.join(path.dirname(nextPackage), "dist", "bin", "next");
const environment = { ...process.env };

if (port && !environment.NEXT_DIST_DIR) {
  environment.NEXT_DIST_DIR = `.next-test-${port}`;
}

const child = spawn(process.execPath, [nextCli, "dev", ...nextArgs], {
  env: environment,
  stdio: "inherit",
});

child.on("error", (error) => {
  console.error("Unable to start the Next.js development server:", error);
  process.exitCode = 1;
});

child.on("exit", (code) => {
  process.exitCode = code ?? 1;
});
