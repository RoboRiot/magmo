"use strict";
// Exact reviewed source, CJS-compiled with dependency injection into live bindings.
module.exports = function instantiate(dependencies) {
const loaded = { exports: {} };
const load = request => Object.prototype.hasOwnProperty.call(dependencies, request) ? dependencies[request] : require(request);
(function(require, module, exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runWorkOrderLinkCoverage = runWorkOrderLinkCoverage;
exports.sourceLinkPayload = void 0;
var _auth = require("firebase-admin/auth");
var _FirebaseAdmin = require("../../context/FirebaseAdmin");
var _client = require("../bluefolder/client");
var _workOrders = require("./workOrders");
const {
  sweepWorkOrderLinks
} = require("./workOrderLinkSweep.cjs");
const {
  deliverWorkOrderLinkAlerts
} = require("./workOrderLinkAlertDelivery.cjs");
const {
  linkRuntimeEnabled
} = require("./workOrderLinkRuntime.cjs");
const {
  createSourceLinkPayload
} = require("./workOrderSourceLinkPayload.cjs");
const sourceLinkPayload = exports.sourceLinkPayload = createSourceLinkPayload(_client.extractWorkOrderFields);
async function runWorkOrderLinkCoverage({
  db = _FirebaseAdmin.adminDb
} = {}) {
  if (!linkRuntimeEnabled(process.env, db?.projectId)) return {
    disabled: true
  };
  if (db !== _FirebaseAdmin.adminDb) throw new Error("Coverage imports must use the configured Magmo database");
  const settings = {
    ...(0, _client.getBlueFolderSlackSettings)(),
    bluefolderTimeoutMs: 8000
  };
  const client = new _client.BlueFolderClient(settings);
  const sweep = await sweepWorkOrderLinks({
    db,
    maxDurationMs: 45000,
    sourceLimit: 4,
    limit: 50,
    refreshSource: async id => {
      const raw = await client.getWorkOrder(id);
      return (0, _workOrders.importOpsBlueFolderWorkOrder)(sourceLinkPayload(id, raw, settings));
    }
  });
  let delivery;
  try {
    delivery = await deliverWorkOrderLinkAlerts({
      db,
      auth: (0, _auth.getAuth)(),
      limit: 2,
      maxDurationMs: 20000
    });
  } catch (error) {
    delivery = {
      unavailable: true,
      code: String(error.code || "alert_delivery_failed").slice(0, 100)
    };
  }
  return {
    sweep,
    delivery
  };
}
})(load, loaded, loaded.exports);
return loaded.exports;
};
