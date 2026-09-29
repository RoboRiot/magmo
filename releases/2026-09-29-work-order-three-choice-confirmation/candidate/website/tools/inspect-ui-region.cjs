"use strict";

const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const parser = require("@babel/parser");
const generate = require("@babel/generator").default;
const T = require("../../ot-collapse-20260928/factory-tools.cjs");

const here = __dirname;
const analysis = JSON.parse(fs.readFileSync(path.join(here, "oracle-analysis.json"), "utf8"));
const targets = {
  active: {
    root: path.join(here, "source", ".next"),
    page: analysis.active.page,
    id: 60992,
  },
  oracle: {
    root: path.join(here, "build-workspace", ".next-oracle"),
    page: analysis.oracle.page,
    id: analysis.oracleModuleIds.component,
  },
};
const anchors = [
  "createScanResolutionQueue", "workOrderAddSlackItems", "authenticatedRequest",
  "Your session is not ready", "WorkOrderOption", "StagedRow", "Work order add",
  "/api/items/work-order-add/confirm", "/api/items/work-order-add/slack",
  "Save and send to Slack", "Send saved items to Slack?", "function default",
];
const report = {};
for (const [name, target] of Object.entries(targets)) {
  const code = T.read(path.join(target.root, target.page));
  const factory = T.getFactory(code, target.id);
  const expression = parser.parseExpression(`(${factory})`);
  const statements = expression.body.body;
  const defaultBinding = factory.match(/\.d\([^,]+,\{default:\(\)=>\s*([A-Za-z_$][\w$]*)/i)?.[1];
  report[name] = {
    id: target.id,
    sha256: T.sha(factory),
    params: expression.params.map((item) => item.name),
    defaultBinding,
    statements: statements.map((node, index) => {
      const text = generate(node, { compact: true, comments: false }).code;
      const declared = node.id?.name || (node.declarations || []).map((entry) => entry.id?.name).filter(Boolean).join(",");
      return {
        index,
        type: node.type,
        declared,
        anchors: anchors.filter((anchor) => text.includes(anchor)),
        bytes: Buffer.byteLength(text),
        sha256: T.sha(text),
      };
    }),
  };
  assert(defaultBinding);
}
fs.writeFileSync(path.join(here, "ui-region-topology.json"), `${JSON.stringify(report, null, 2)}\n`, { flag: "wx" });
for (const [name, value] of Object.entries(report)) {
  console.log(`\n${name} id=${value.id} default=${value.defaultBinding} statements=${value.statements.length}`);
  for (const item of value.statements.filter((entry) => entry.index >= 60 && (entry.anchors.length || entry.index <= 105))) {
    console.log(JSON.stringify(item));
  }
}
