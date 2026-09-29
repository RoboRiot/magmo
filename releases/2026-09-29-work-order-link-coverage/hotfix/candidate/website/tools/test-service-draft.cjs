"use strict";
const fs = require("node:fs"), path = require("node:path"), assert = require("node:assert/strict"), test = require("node:test");
const { sha, read, getFactory, walk } = require("../../ot-collapse-20260928/factory-tools.cjs");
const { compiledWorkOrders } = require("./compiled-service-loader.cjs");
const root = path.resolve(__dirname, "../../.."), directory = process.env.WO_LINK_DRAFT || "candidate", out = path.join(__dirname, directory), report = require("./" + directory + "-report.json");
test("source-only shared service scope preserves every existing file except the selected chunk", () => {
  for (const file of walk(path.join(__dirname, "source"))) {
    const relative = path.relative(path.join(__dirname, "source"), file);
    if (!report.changed.includes(relative.replaceAll("\\", "/"))) assert.equal(sha(fs.readFileSync(file)), sha(fs.readFileSync(path.join(out, relative))), relative);
  }
  assert.equal(report.sharedFactory.entireChunkPreserved, true); assert.equal(sha(fs.readFileSync(path.join(__dirname, "source/.next/server/chunks/8806.js"))), sha(fs.readFileSync(path.join(out, ".next/server/chunks/8806.js"))));
});
for (const relative of ["test/work-order-machine-import.test.cjs", "test/work-order-link-health.test.cjs"]) {
  const filename = path.join(root, relative), source = read(filename);
  let modified = source;
  let replacements = 0;
  for (const binding of ["code", "source"]) {
    const marker = `new Function("require", "module", "exports", ${binding})`;
    replacements += modified.split(marker).length - 1;
    modified = modified.replaceAll(marker, '((require, module) => { module.exports = compiledWorkOrders(require); })');
  }
  assert(replacements > 0, "Expected actual service source-loader replacement for " + relative);
  const localRequire = request => {
    if (request.startsWith("../lib/")) {
      const candidate = path.join(out, "work-order-link", request.slice(3));
      if (fs.existsSync(candidate)) return require(candidate);
    }
    return require(request.startsWith(".") ? path.resolve(path.dirname(filename), request) : request);
  };
  new Function("require", "__dirname", "__filename", "compiledWorkOrders", modified)(localRequire, path.dirname(filename), filename, loader => compiledWorkOrders(out, loader));
}
