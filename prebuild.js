console.log("********* PREBUILDING");
const path = require("node:path");
const fs = require("fs");
const baseDir = process.cwd();

const prebuildScripts = async () => {
  const file = path.join(
    baseDir,
    "/node_modules",
    "next/dist/server/require-hook.js"
  );

  // Check if file exists
  if (!fs.existsSync(file)) {
    console.log("require-hook.js not found, skipping prebuild fix");
    return;
  }

  const content = await fs.promises.readFile(file, "utf-8");
  await fs.promises.writeFile(
    file,
    content.replace(
      "if (process.env.__NEXT_PRIVATE_PREBUNDLED_REACT) {",
      "if (true) {"
    )
  );
  console.log("Prebuild fix applied successfully");
};

prebuildScripts();
