"use strict";
// Local, read-only source contract review. No application/database calls.
const fs = require("node:fs"), path = require("node:path"), assert = require("node:assert/strict"), crypto = require("node:crypto");
const parser = require("@babel/parser"), traverse = require("@babel/traverse").default;
const root = path.resolve(__dirname, "../../.."), relative = "pages/NewSearch/AddItem/NewItem.js";
const current = fs.readFileSync(path.join(root, relative), "utf8");
const before = fs.readFileSync(path.join(root, "tmp/ais-duplicate-fix-20260930/deployment/compiler-workspace-v5", relative), "utf8");
const hash = (bytes) => crypto.createHash("sha256").update(bytes).digest("hex");
function block(source) {
  const found = [];
  traverse(parser.parse(source, { sourceType: "module", plugins: ["jsx"] }), { JSXElement(p) {
    if (p.node.openingElement.attributes.some((a) => a.name?.name === "controlId" && a.value?.value === "localSN")) found.push(p.node);
  } }); assert.equal(found.length, 1); return found[0];
}
const next = block(current), previous = block(before), normalize = (text) => text.replace(/\r\n/g, "\n");
assert.equal(normalize(current.slice(0, next.start) + before.slice(previous.start, previous.end) + current.slice(next.end)), normalize(before), "Only Local SN JSX may differ from frozen deployed-source inputs");
let control;
traverse(parser.parse(current.slice(next.start, next.end), { plugins: ["jsx"] }), { JSXElement(p) {
  if (p.node.openingElement.name.type === "JSXMemberExpression" && p.node.openingElement.name.property.name === "Control") control = p.node;
} }); assert(control);
const text = current.slice(next.start, next.end), attrs = control.openingElement.attributes;
const value = attrs.find((a) => a.name?.name === "value").value.expression;
const change = attrs.find((a) => a.name?.name === "onChange").value.expression;
const renderValue = new Function("items", `return (${text.slice(value.start, value.end)});`);
const changeValue = (input, original = { localSN: "AIS33551", other: "preserved" }) => {
  let result = original;
  const onChange = new Function("setItems", `return (${text.slice(change.start, change.end)});`)((updater) => { result = updater(result); });
  onChange({ target: { value: input } }); return result;
};
const cases = [ ["33551", "AIS33551"], ["AIS33551", "AIS33551"], ["  ais-_ 33551  ", "AIS33551"], ["00004", "AIS00004"], ["AIS00004", "AIS00004"], ["0", "AIS0"], ["", ""], ["AIS", ""] ];
for (const [input, expected] of cases) { const item = changeValue(input); assert.equal(item.localSN, expected); assert.equal(item.other, "preserved"); assert.equal(renderValue(item), expected.replace(/^AIS/, "")); }
for (const invalid of ["abc", "33X551", "33.551", "33 551", "-33551", "AIS-B00004"]) assert.equal(changeValue(invalid).localSN, "AIS33551");
assert(text.includes('<InputGroup.Text id="new-item-local-sn-prefix">AIS</InputGroup.Text>'));
assert(attrs.some((a) => a.name?.name === "type" && a.value?.value === "text"));
assert(attrs.some((a) => a.name?.name === "inputMode" && a.value?.value === "numeric"));
assert(current.includes('docId = requestedDocId || (await generateAvailableDocId());'));
console.log(JSON.stringify({ status: "PASS", sourceFile: relative, sourceSHA256: hash(Buffer.from(current)), priorSourceSHA256: hash(Buffer.from(before)), sourceScope: "Only localSN Form.Group JSX; outside block unchanged except line-ending comparison normalization", normalizedInputCases: cases.length, invalidInputCases: 6, leadingZerosPreserved: true, blankStillUsesExistingUniqueIdGenerator: true, duplicateAndTransactionLogicUnchanged: true, noSourceEdits: true, productionActions: 0 }, null, 2));
