"use strict";
// Independent local AST evidence. Does not compose or mutate a candidate.
const fs = require("node:fs"), path = require("node:path"), assert = require("node:assert/strict");
const record = path.resolve(__dirname, ".."), workspace = path.resolve(record, "../../../..");
const parser = require(path.join(workspace, "node_modules/@babel/parser"));
const traverse = require(path.join(workspace, "node_modules/@babel/traverse")).default;
const generate = require(path.join(workspace, "node_modules/@babel/generator")).default;
const T = require(path.join(workspace, "tmp/ot-collapse-20260928/factory-tools.cjs"));
const deployment = path.join(workspace, "tmp/work-order-save-slack-confirmation-20260929/deployment");
const analysis = JSON.parse(fs.readFileSync(path.join(deployment, "oracle-analysis.json"), "utf8"));
function inspect(file, id) {
  const code = T.read(file), factory = T.getFactory(code, id);
  const ast = parser.parse(`(${factory})`);
  let factoryPath;
  traverse(ast, { Function(p) { if (!factoryPath) { factoryPath = p; p.stop(); } } });
  const body = factoryPath.get("body.body");
  const modal = body[79];
  assert.equal(modal.node.type, "FunctionDeclaration");
  assert.equal(modal.node.id.name, "tI");
  const free = new Map();
  modal.traverse({ ReferencedIdentifier(p) {
    const binding = p.scope.getBinding(p.node.name);
    if (binding && binding.identifier.start >= modal.node.start && binding.identifier.end <= modal.node.end) return;
    const entry = free.get(p.node.name) || { name: p.node.name, boundOutsideModal: Boolean(binding), references: 0 };
    entry.references++;
    if (binding) {
      entry.definition = generate(binding.path.node, { compact: true, comments: false }).code;
      entry.definitionSHA256 = T.sha(entry.definition);
    }
    free.set(p.node.name, entry);
  } });
  const loaderBinding = factoryPath.scope.getBinding(factoryPath.node.params[2].name);
  const normalizedStatements = body.map((statement) => {
    const statementAst = parser.parse(generate(statement.node, { compact: true, comments: false }).code);
    traverse(statementAst, { CallExpression(p) {
      if (p.node.callee.type === "Identifier" && p.node.callee.name === loaderBinding.identifier.name && p.node.arguments.length === 1 && p.node.arguments[0].type === "NumericLiteral") {
        p.node.arguments[0].value = 0;
        delete p.node.arguments[0].extra;
      }
    } });
    return generate(statementAst, { compact: true, comments: false }).code;
  });
  return { factory, modal: generate(modal.node, { compact: true, comments: false }).code, free, normalizedStatements };
}
const active = inspect(path.join(deployment, "source/.next", analysis.active.page), analysis.moduleIds.component);
const oracle = inspect(path.join(deployment, "build-workspace/.next-oracle", analysis.oracle.page), analysis.oracleModuleIds.component);
const oldNames = [...active.free.keys()].sort(), newNames = [...oracle.free.keys()].sort();
const removed = oldNames.filter((name) => !oracle.free.has(name));
const added = newNames.filter((name) => !active.free.has(name));
// Independently derived from the actual helper bodies, not declaration order.
const semanticRebase = { tS: "t_", t_: "tS", tj: "tC", tC: "tj" };
function normalizeHelper(code, rebase = {}) {
  const ast = parser.parse(code);
  traverse(ast, {
    ReferencedIdentifier(p) {
      const binding = p.scope.getBinding(p.node.name);
      if (rebase[p.node.name] && (!binding || binding.scope.path.isProgram())) p.node.name = rebase[p.node.name];
    },
    FunctionDeclaration(p) {
      if (p.parentPath.isProgram() && rebase[p.node.id.name]) p.node.id.name = rebase[p.node.id.name];
    },
    CallExpression(p) {
      const callee = p.node.callee;
      if (callee.type === "MemberExpression" && callee.object.name === "r") {
        if (callee.property.name === "e" && p.node.arguments[0]?.type === "NumericLiteral") {
          p.node.arguments[0].value = 0; delete p.node.arguments[0].extra;
        }
        if (callee.property.name === "bind" && p.node.arguments[1]?.type === "NumericLiteral") {
          p.node.arguments[1].value = 0; delete p.node.arguments[1].extra;
        }
      }
    },
    ObjectProperty(p) {
      if (p.node.key.name === "webpack" && p.node.value.body?.type === "ArrayExpression") {
        for (const element of p.node.value.body.elements) if (element.type === "NumericLiteral") { element.value = 0; delete element.extra; }
      }
    },
  });
  return generate(ast, { compact: true, comments: false }).code;
}
const helperStatements = [];
for (let index = 60; index <= 78; index++) {
  const oldCode = normalizeHelper(active.normalizedStatements[index]);
  const rebasedCode = normalizeHelper(oracle.normalizedStatements[index], { ...semanticRebase, C: "j" });
  const sameAfterExplicitSemanticRebase = oldCode === rebasedCode;
  helperStatements.push({ index, sameAfterExplicitSemanticRebase, activeSHA256: T.sha(oldCode), rebasedOracleSHA256: T.sha(rebasedCode),
    ...(!sameAfterExplicitSemanticRebase ? { activeCode: oldCode, oracleCode: rebasedCode } : {}) });
}
const changedOuterDefinitions = newNames.filter((name) => active.free.has(name) && active.free.get(name).definition !== oracle.free.get(name).definition)
  .map((name) => ({ name, active: active.free.get(name).definition, oracle: oracle.free.get(name).definition }));
const report = {
  checkedAt: new Date().toISOString(), result: added.length === 0 && helperStatements.every((entry) => entry.sameAfterExplicitSemanticRebase) ? "PASS" : "REVIEW_REQUIRED",
  activePageSHA256: analysis.active.pageSHA256, oraclePageSHA256: analysis.oracle.pageSHA256,
  activeFactorySHA256: T.sha(active.factory), oracleFactorySHA256: T.sha(oracle.factory),
  activeModalSHA256: T.sha(active.modal), oracleModalSHA256: T.sha(oracle.modal),
  modalStatementIndex: 79, modalBinding: "tI", oldFreeNames: oldNames, newFreeNames: newNames,
  removedFreeNames: removed, addedFreeNames: added, semanticRebase, helperStatements,
  changedOuterDefinitions,
  limitation: "This proves compatible free names and helper declarations for a tI-only transplant; it does not certify a final composed artifact or all imported module semantics.",
  productionWrites: 0, candidateChanges: 0,
};
const target = path.join(record, "candidate/evidence/modal-binding-scope.json");
fs.mkdirSync(path.dirname(target), { recursive: true });
fs.writeFileSync(target, JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify(report, null, 2));
assert.deepEqual(added, [], "The new modal introduces outer names that need explicit mapping");
assert(helperStatements.every((entry) => entry.sameAfterExplicitSemanticRebase), "A helper differs beyond explicit semantic binding and require-ID rebase");
