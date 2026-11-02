"use strict";
const fs = require("node:fs"), path = require("node:path"), assert = require("node:assert/strict");
const P = require("@babel/parser"), T = require("@babel/traverse").default, G = require("@babel/generator").default;
const babel = require("@babel/core"), F = require("../../ot-collapse-20260928/factory-tools.cjs");
const here = __dirname, root = path.resolve(here, "../../.."), base = path.join(here, "source");
const outputName = process.argv[2] || "approval-ui-overlay";
assert(/^[a-z0-9-]+$/.test(outputName));
const out = path.join(here, outputName); assert(!fs.existsSync(out));
const inputs = {};
function source(name) { const text = fs.readFileSync(path.join(root, name), "utf8"); inputs[name] = F.sha(text); return text; }
const reviewSource = source("components/ItemChangeReview.js");
assert(reviewSource.includes("await onReviewed(action, result)"));
const notificationSource = source("pages/notifications.js");
const sourceAst = P.parse(notificationSource, { sourceType: "module", plugins: ["jsx"] });
let callback, alert;
T(sourceAst, {
  JSXAttribute(p) { if (p.node.name.name === "onReviewed") { assert(!callback); callback = p.node.value.expression; } },
  JSXElement(p) { if (p.node.openingElement.name.name === "Alert" && notificationSource.slice(p.node.start, p.node.end).includes("notice.warning")) { assert(!alert); alert = p.node; } },
});
assert(callback && alert);
function mapped(code, mapping) {
  const ast = P.parse(code, { sourceType: "module" });
  const globals = new Set(["Boolean", "encodeURIComponent", "undefined"]);
  T(ast, { ReferencedIdentifier(p) {
    if (p.scope.hasBinding(p.node.name) || globals.has(p.node.name)) return;
    assert(Object.hasOwn(mapping, p.node.name), `Unmapped dependency ${p.node.name}`);
    p.replaceWith(P.parseExpression(mapping[p.node.name])); p.skip();
  } });
  return G(ast, { compact: true, comments: false }).code;
}
const mappedCallback = mapped(`const __callback=${notificationSource.slice(callback.start, callback.end)}`, { setNotice: "C", setSelected: "b", load: "D" });
const callbackText = G(P.parse(mappedCallback).program.body[0].declarations[0].init, { compact: true }).code;
const compiledAlert = babel.transformSync(`const __alert=${notificationSource.slice(alert.start, alert.end)}`, {
  babelrc: false, configFile: false,
  presets: [[require("next/dist/compiled/babel/bundle").presetReact().default, { runtime: "automatic", development: false }]],
}).code;
const alertExpr = P.parse(compiledAlert, { sourceType: "module" }).program.body.find((n) => n.type === "VariableDeclaration").declarations[0].init;
const mappedAlert = mapped(`const __alert=${G(alertExpr).code}`, { notice: "O", Alert: "s.A", Link: "d()", setNotice: "C", _jsx: "(0,i.jsx)", _jsxs: "(0,i.jsxs)", _Fragment: "i.Fragment" });
const alertText = G(P.parse(mappedAlert).program.body[0].declarations[0].init, { compact: true }).code;
const manifest = JSON.parse(fs.readFileSync(path.join(base, ".next/build-manifest.json"), "utf8"));
const relative = ".next/" + manifest.pages["/notifications"].find((name) => name.startsWith("static/chunks/pages/"));
const original = fs.readFileSync(path.join(base, relative), "utf8");
const factory = F.getFactory(original, 33159), wrapped = `(${factory})`, ast = P.parse(wrapped);
let approvedCall, onReviewed, noticeCall;
T(ast, {
  ExpressionStatement(p) {
    const expr = p.node.expression;
    if (expr.type === "SequenceExpression" && expr.expressions.length === 2 &&
      expr.expressions[0].type === "AwaitExpression" && expr.expressions[1].type === "AwaitExpression" &&
      expr.expressions[1].argument.callee?.name === "r" && wrapped.slice(p.node.start, p.node.end).includes("reviewNote:v")) {
      assert(!approvedCall); approvedCall = p.node;
    }
  },
  ObjectProperty(p) { if (p.node.key.name === "onReviewed" && p.node.value.type === "ArrowFunctionExpression") { assert(!onReviewed); onReviewed = p.node.value; } },
  CallExpression(p) {
    const props = p.node.arguments[1];
    if (props?.type === "ObjectExpression" && props.properties.some((n) => n.key?.name === "dismissible") &&
      props.properties.some((n) => n.key?.name === "children" && n.value?.name === "O")) {
      assert(!noticeCall); noticeCall = p.node;
    }
  },
});
assert(approvedCall && onReviewed && noticeCall);
const edits = [
  { start: approvedCall.start - 1, end: approvedCall.end - 1,
    text: `const __mVisionApprovalResult=${G(approvedCall.expression.expressions[0], { compact: true }).code};await r(t,__mVisionApprovalResult);`, label: "forward-approved-index-status" },
  { start: onReviewed.start - 1, end: onReviewed.end - 1, text: callbackText, label: "retain-saved-index-warning" },
  { start: noticeCall.start - 1, end: noticeCall.end - 1, text: alertText, label: "warning-and-saved-item-link" },
].sort((a, b) => a.start - b.start);
for (let i = 1; i < edits.length; i++) assert(edits[i - 1].end <= edits[i].start);
for (const edit of edits) edit.original = factory.slice(edit.start, edit.end);
let patched = factory;
for (const edit of [...edits].reverse()) patched = patched.slice(0, edit.start) + edit.text + patched.slice(edit.end);
P.parseExpression(patched);
let delta = 0;
const inverse = edits.map((edit) => { const start = edit.start + delta; delta += edit.text.length - (edit.end - edit.start); return { start, end: start + edit.text.length, text: edit.original }; });
let reverted = patched;
for (const edit of inverse.reverse()) reverted = reverted.slice(0, edit.start) + edit.text + reverted.slice(edit.end);
assert.equal(reverted, factory);
const updated = F.patchFactories(original, { 33159: patched });
for (const entry of F.factories(original)) if (entry.id !== 33159) assert.equal(F.getFactory(updated, entry.id), entry.source);
const destination = path.join(out, relative); fs.mkdirSync(path.dirname(destination), { recursive: true });
fs.writeFileSync(destination, updated, { flag: "wx" });
const receipt = { inputs, changes: [{ file: relative, moduleId: 33159, oldSHA256: F.sha(original), newSHA256: F.sha(updated),
  oldFactorySHA256: F.sha(factory), newFactorySHA256: F.sha(patched), edits, inverseExact: true }],
  server: "notifications is statically rendered HTML with no initial notice; no SSR page module exists", externalWrites: 0 };
fs.writeFileSync(path.join(out, "receipt.json"), JSON.stringify(receipt, null, 2) + "\n", { flag: "wx" });
console.log(JSON.stringify({ compiled: [relative], externalWrites: 0 }));
