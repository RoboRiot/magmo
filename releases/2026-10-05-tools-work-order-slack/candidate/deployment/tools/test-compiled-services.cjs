"use strict";
const fs = require("node:fs"), path = require("node:path"), Module = require("node:module"), assert = require("node:assert/strict");
const parser = require("@babel/parser");
const { createLoader, sourceIds } = require("./compiled-server-loader.cjs");
const root = path.resolve(__dirname, "../../..");
const compiled = createLoader();
for (const testName of ["tool-slack-identity.test.cjs", "work-order-add-service.test.cjs", "work-order-add-contract.test.cjs",
  "work-order-add-slack.test.cjs", "work-order-add-slack-thread.test.cjs"]) {
  const filename = path.join(root, "test", testName);
  let source = fs.readFileSync(filename, "utf8");
  if (testName === "tool-slack-identity.test.cjs") {
    const declaration = parser.parse(source).program.body.find((node) => node.type === "FunctionDeclaration" && node.id.name === "loadRoute");
    assert(declaration);
    source = source.slice(0, declaration.start) + `function loadRoute(db,fetchImpl){return require("__compiled_loader__").createLoader({db,fetchImpl})(1572);}` + source.slice(declaration.end);
  }
  const ordinary = Module.createRequire(filename), mod = new Module(filename, module);
  mod.filename = filename; mod.paths = Module._nodeModulePaths(path.dirname(filename));
  mod.require = (name) => name === "__compiled_loader__" ? { createLoader } :
    Object.hasOwn(sourceIds, name) ? compiled(sourceIds[name]) : ordinary(name);
  mod._compile(source, filename);
}
