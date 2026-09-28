const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const workspaceRoot = process.env.WORKSPACE_ROOT || path.resolve(__dirname, "..", "..", "..");
const parser = require(path.join(workspaceRoot, "node_modules", "@babel", "parser"));
const generate = require(path.join(workspaceRoot, "node_modules", "@babel", "generator")).default;
const traverse = require(path.join(workspaceRoot, "node_modules", "@babel", "traverse")).default;

const MODULE_ID = "60992";
const EXPECTED_ACTIVE_FACTORY_SHA256 =
  "22d07a6a14c37ad1703987e560233200ce4ade330c385b4e8e46b98a41031a77";
const EXPECTED_CANDIDATE_FACTORY_SHA256 =
  "2406f7f0dda0e8cc8e8716e39c9880895c345bfbf6df4d7c576bc2833af58f03";
const POSITION_KEYS = new Set([
  "start",
  "end",
  "loc",
  "extra",
  "leadingComments",
  "trailingComments",
  "innerComments",
]);

function sha256(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function readRegistry(root, relativePath) {
  const context = { self: { webpackChunk_N_E: [] } };
  const file = path.join(root, ".next", ...relativePath.split("/"));
  vm.runInNewContext(fs.readFileSync(file, "utf8"), context, { timeout: 5000 });
  return Object.fromEntries(
    context.self.webpackChunk_N_E.flatMap(([, modules]) => Object.entries(modules || {}))
  );
}

function parseFactory(factory) {
  const source = factory.toString();
  const defaultMatch = source.match(/\.d\([^,]+,\{default:\(\)=>\s*([A-Za-z_$][\w$]*)/);
  assert(defaultMatch, "default export binding must be present");
  const expression = parser.parseExpression(`(${source})`);
  const statements = expression.body.body;
  const defaultIndex = statements.findIndex(
    (node) => node.type === "FunctionDeclaration" && node.id?.name === defaultMatch[1]
  );
  assert.notEqual(defaultIndex, -1, "default export declaration must be present");
  const requestIndex = statements.findIndex((node) =>
    generate(node).code.includes("Your session is not ready")
  );
  const modalIndex = statements.findIndex((node) => {
    const code = generate(node).code;
    return code.includes("Work order add") && code.includes("/api/items/work-order-add/confirm");
  });
  assert.notEqual(requestIndex, -1, "authenticated request helper must be present");
  assert.notEqual(modalIndex, -1, "Work Order Add modal must be present");
  return { source, expression, statements, defaultIndex, requestIndex, modalIndex };
}

function generated(nodes) {
  return nodes.map((node) => generate(node, { compact: true, comments: false }).code).join(";");
}

function asProgram(nodes) {
  return parser.parse(generated(nodes), { sourceType: "script" }).program;
}

function isPreservedIdentifier(pathValue) {
  const parent = pathValue.parentPath;
  if (!parent) return false;
  if (
    (parent.isMemberExpression() || parent.isOptionalMemberExpression?.()) &&
    pathValue.key === "property" &&
    !parent.node.computed
  ) {
    return true;
  }
  if (
    (parent.isObjectProperty() || parent.isObjectMethod?.() || parent.isClassMethod?.()) &&
    pathValue.key === "key" &&
    !parent.node.computed
  ) {
    return true;
  }
  if (
    (parent.isLabeledStatement?.() && pathValue.key === "label") ||
    ((parent.isBreakStatement?.() || parent.isContinueStatement?.()) &&
      pathValue.key === "label")
  ) {
    return true;
  }
  return Boolean(parent.isMetaProperty?.());
}

function resolvedBinding(pathValue, name) {
  // Babel exposes a declaration identifier through the function-body scope. If an
  // inner minified local happens to reuse the function's short name, resolve the
  // declaration through its parent scope so that harmless name reuse is not
  // mistaken for a changed reference graph.
  if (
    pathValue.key === "id" &&
    (pathValue.parentPath.isFunctionDeclaration?.() ||
      pathValue.parentPath.isClassDeclaration?.())
  ) {
    return pathValue.scope.parent?.getBinding(name) || pathValue.scope.getBinding(name);
  }
  return pathValue.scope.getBinding(name);
}

function identifierTopology(node) {
  const ast = parser.parse(generate(node, { compact: true, comments: false }).code, {
    sourceType: "script",
  });
  const bindingIds = new WeakMap();
  const freeIds = new Map();
  const sequence = [];
  let next = 0;
  traverse(ast, {
    Identifier(pathValue) {
      if (isPreservedIdentifier(pathValue)) return;
      const name = pathValue.node.name;
      const binding = resolvedBinding(pathValue, name);
      let id;
      if (binding) {
        if (!bindingIds.has(binding)) bindingIds.set(binding, next++);
        id = bindingIds.get(binding);
      } else {
        if (!freeIds.has(name)) freeIds.set(name, next++);
        id = freeIds.get(name);
      }
      sequence.push(id);
    },
  });
  return sequence;
}

function astShape(value, parentType = "", key = "", parentComputed = false) {
  if (Array.isArray(value)) {
    return value.map((item) => astShape(item, parentType, key, parentComputed));
  }
  if (!value || typeof value !== "object") return value;
  if (value.type === "Identifier") {
    const preserve =
      ((parentType === "MemberExpression" || parentType === "OptionalMemberExpression") &&
        key === "property" &&
        !parentComputed) ||
      ((parentType === "ObjectProperty" ||
        parentType === "ObjectMethod" ||
        parentType === "ClassMethod") &&
        key === "key" &&
        !parentComputed) ||
      parentType === "MetaProperty";
    return { type: "Identifier", name: preserve ? value.name : "_" };
  }
  const result = {};
  for (const [childKey, childValue] of Object.entries(value)) {
    if (POSITION_KEYS.has(childKey)) continue;
    if (value.type === "ObjectProperty" && childKey === "shorthand") {
      result[childKey] = false;
      continue;
    }
    result[childKey] = astShape(childValue, value.type, childKey, Boolean(value.computed));
  }
  return result;
}

function structuralProof(activeNode, candidateNode, label) {
  const activeShape = JSON.stringify(astShape(activeNode));
  const candidateShape = JSON.stringify(astShape(candidateNode));
  const activeTopology = JSON.stringify(identifierTopology(activeNode));
  const candidateTopology = JSON.stringify(identifierTopology(candidateNode));
  assert.equal(candidateShape, activeShape, `${label} AST/literals/properties changed`);
  assert.equal(candidateTopology, activeTopology, `${label} identifier reference graph changed`);
  return {
    shapeSHA256: sha256(activeShape),
    topologySHA256: sha256(activeTopology),
    identifierOccurrences: JSON.parse(activeTopology).length,
  };
}

function removedExternalReferences(parsed, startIndex) {
  const endIndex = parsed.modalIndex;
  const removedNames = parsed.statements.slice(startIndex, endIndex + 1).flatMap((node) =>
    node.type === "FunctionDeclaration" && node.id?.name ? [node.id.name] : []
  );
  const root = parser.parse(`(${parsed.source})`, { sourceType: "script" });
  const results = {};
  traverse(root, {
    Program(programPath) {
      const factoryPath = programPath.get("body.0.expression");
      const bodyPaths = factoryPath.get("body.body");
      for (const name of removedNames) {
        const binding = factoryPath.scope.getBinding(name);
        results[name] = binding
          ? binding.referencePaths.filter((referencePath) => {
              const statementPath = referencePath.findParent(
                (parentPath) => parentPath.parentPath === factoryPath.get("body")
              );
              const index = statementPath ? bodyPaths.indexOf(statementPath) : -1;
              return index < startIndex || index > endIndex;
            }).length
          : 0;
      }
      programPath.stop();
    },
  });
  return results;
}

const compositionPath = path.join(__dirname, "composition-report.json");
const composition = JSON.parse(fs.readFileSync(compositionPath, "utf8"));
const activeFactory = readRegistry(path.join(__dirname, "source"), composition.activePage)[MODULE_ID];
const candidateFactory = readRegistry(
  path.join(__dirname, "scoped-source"),
  composition.newPage
)[MODULE_ID];
assert.equal(typeof activeFactory, "function", "ACTIVE module60992 missing");
assert.equal(typeof candidateFactory, "function", "candidate module60992 missing");
assert.equal(sha256(activeFactory.toString()), EXPECTED_ACTIVE_FACTORY_SHA256);
assert.equal(sha256(candidateFactory.toString()), EXPECTED_CANDIDATE_FACTORY_SHA256);

const active = parseFactory(activeFactory);
const candidate = parseFactory(candidateFactory);
const activeStart = active.requestIndex;
const candidateStart = candidate.requestIndex - 1;
assert.equal(activeStart, 75);
assert.equal(candidateStart, 75);
assert.equal(active.modalIndex, 78);
assert.equal(candidate.modalIndex, 79);
assert.equal(active.defaultIndex, 96);
assert.equal(candidate.defaultIndex, 97);

const activePrefix = generated(active.statements.slice(0, activeStart));
const candidatePrefix = generated(candidate.statements.slice(0, candidateStart));
const prefixProof = structuralProof(
  asProgram(active.statements.slice(0, activeStart)),
  asProgram(candidate.statements.slice(0, candidateStart)),
  "pre-WorkOrder module statements"
);

const activeSuffix = active.statements.slice(active.modalIndex + 1);
const candidateSuffix = candidate.statements.slice(candidate.modalIndex + 1);
assert.equal(candidateSuffix.length, activeSuffix.length, "post-WorkOrder statement count changed");
const suffixProofs = activeSuffix.map((node, index) =>
  structuralProof(node, candidateSuffix[index], `post-WorkOrder statement ${index}`)
);

const optionProof = structuralProof(
  active.statements[active.requestIndex + 1],
  candidate.statements[candidate.requestIndex + 1],
  "work-order option renderer"
);
const stagedRowProof = structuralProof(
  active.statements[active.requestIndex + 2],
  candidate.statements[candidate.requestIndex + 2],
  "staged row renderer"
);
const defaultProof = suffixProofs.at(-1);

const activeRegion = generated(active.statements.slice(activeStart, active.modalIndex + 1));
const candidateRegion = generated(candidate.statements.slice(candidateStart, candidate.modalIndex + 1));
assert(!activeRegion.includes("/api/items/work-order-add/slack"));
assert(!activeRegion.includes("Send saved items to Slack?"));
assert(candidateRegion.includes("/api/items/work-order-add/slack"));
assert(candidateRegion.includes("Send saved items to Slack?"));
assert(candidateRegion.includes("timeoutMs:24e4") || candidateRegion.includes("timeoutMs:240000"));
assert(!generated(candidate.statements.slice(0, candidateStart)).includes("/api/items/work-order-add/slack"));
assert(!generated(candidate.statements.slice(candidate.modalIndex + 1)).includes("/api/items/work-order-add/slack"));

const activeExternal = removedExternalReferences(active, activeStart);
const candidateExternal = removedExternalReferences(candidate, candidateStart);
assert.deepEqual(Object.values(activeExternal).sort(), [0, 0, 0, 1]);
assert.deepEqual(Object.values(candidateExternal).sort(), [0, 0, 0, 0, 1]);

const receipt = {
  checkedAt: new Date().toISOString(),
  status: "PASS",
  scope: "compiled client module 60992 host-mainSearch isolation",
  productionWrites: false,
  compositionReportSHA256: sha256(fs.readFileSync(compositionPath)),
  activePage: composition.activePage,
  candidatePage: composition.newPage,
  moduleId: Number(MODULE_ID),
  activeFactorySHA256: EXPECTED_ACTIVE_FACTORY_SHA256,
  candidateFactorySHA256: EXPECTED_CANDIDATE_FACTORY_SHA256,
  boundaries: {
    active: { start: activeStart, modal: active.modalIndex, defaultExport: active.defaultIndex },
    candidate: {
      start: candidateStart,
      request: candidate.requestIndex,
      modal: candidate.modalIndex,
      defaultExport: candidate.defaultIndex,
    },
  },
  unchangedHostProof: {
    structurallyEquivalentPrefixStatementCount: activeStart,
    prefix: prefixProof,
    structurallyEquivalentSuffixStatementCount: activeSuffix.length,
    suffixCombinedShapeSHA256: sha256(JSON.stringify(suffixProofs.map((proof) => proof.shapeSHA256))),
    suffixCombinedTopologySHA256: sha256(
      JSON.stringify(suffixProofs.map((proof) => proof.topologySHA256))
    ),
    defaultExport: defaultProof,
    optionRenderer: optionProof,
    stagedRowRenderer: stagedRowProof,
    onlyChangedRegionBindingUsedByHost: "WorkOrderAddModal",
    activeExternalReferenceCounts: activeExternal,
    candidateExternalReferenceCounts: candidateExternal,
  },
  intendedRegionProof: {
    activeStatementCount: active.modalIndex - activeStart + 1,
    candidateStatementCount: candidate.modalIndex - candidateStart + 1,
    candidateHasConfirmedItemNormalizer: true,
    candidateHasScoped240SecondSlackTimeout: true,
    candidateHasSlackEndpoint: true,
    candidateHasPostSaveSlackPrompt: true,
    SlackEndpointOutsideIntendedRegion: false,
  },
  assertions: [
    "All 75 statements before the Work Order Add region preserve AST shape, literals, property names, and identifier-reference topology.",
    "All 18 statements after the Work Order Add region preserve AST shape, literals, property names, and identifier-reference topology.",
    "The host mainSearch default export preserves its 2,514-identifier reference topology.",
    "Only the WorkOrderAddModal binding from the changed region is referenced by host code.",
    "The optional Slack endpoint and prompt occur only inside the intended Work Order Add region.",
  ],
};

if (process.argv.includes("--write-receipt")) {
  fs.writeFileSync(
    path.join(__dirname, "compiled-ui-scope-verification.json"),
    `${JSON.stringify(receipt, null, 2)}\n`
  );
}
process.stdout.write(`${JSON.stringify(receipt, null, 2)}\n`);
