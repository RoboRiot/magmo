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
exports.default = handler;
var _crypto = _interopRequireDefault(require("crypto"));
var _FirebaseAdmin = require("../../../context/FirebaseAdmin");
var _healthServer = require("../../../lib/magmonitor/healthServer");
var _notifications = require("../../../lib/magmonitor/notifications");
var _engineerNotifications = require("../../../lib/ops/engineerNotifications");
var _workOrderLinkServer = require("../../../lib/ops/workOrderLinkServer");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const {
  pushConfigured
} = require("../../../lib/magmonitor/notificationContract.cjs");
function safeEqual(left, right) {
  const leftBuffer = Buffer.from(String(left || ""));
  const rightBuffer = Buffer.from(String(right || ""));
  return leftBuffer.length === rightBuffer.length && _crypto.default.timingSafeEqual(leftBuffer, rightBuffer);
}
function isAuthorized(req) {
  const expected = String(process.env.MAGMONITOR_ALERTS_SECRET || process.env.CRON_SECRET || process.env.OPS_INGEST_SECRET || "").trim();
  if (!expected) return false;
  const bearer = String(req.headers?.authorization || "").replace(/^Bearer\s+/i, "");
  const supplied = String(req.headers?.["x-magmonitor-alerts-secret"] || bearer || "").trim();
  return Boolean(supplied) && safeEqual(supplied, expected);
}
async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({
      ok: false,
      error: "method_not_allowed"
    });
  }
  if (!isAuthorized(req)) {
    return res.status(401).json({
      ok: false,
      error: "unauthorized"
    });
  }

  // Drain the independent OT outbox on the existing scheduler. A push failure
  // must not interrupt magnet health evaluation or undo a saved coverage swap.
  try {
    await (0, _engineerNotifications.deliverEngineerNotifications)();
  } catch (error) {
    console.error("[Ops notification retry]", error?.code || "delivery_failed");
  }

  // Keep existing magnet evaluation ahead of the bounded secondary sweep.
  // The sweep still runs when magnet push itself is not configured.
  async function checkWorkOrderLinks() {
    try {
      return await (0, _workOrderLinkServer.runWorkOrderLinkCoverage)();
    } catch (error) {
      const result = {
        unavailable: true,
        code: error?.code || "coverage_failed"
      };
      console.error("[Work-order link coverage]", result.code);
      return result;
    }
  }
  const configured = pushConfigured(process.env);
  if (!configured) {
    return res.status(200).json({
      ok: true,
      configured: false,
      workOrderLinks: await checkWorkOrderLinks(),
      systemsEvaluated: 0,
      eventsCreated: 0,
      delivery: {
        attempted: 0,
        completed: 0,
        pending: 0,
        expired: 0
      }
    });
  }
  if (!_FirebaseAdmin.adminDb) {
    return res.status(503).json({
      ok: false,
      error: "Magmonitor alert storage is unavailable."
    });
  }
  try {
    const result = await (0, _healthServer.runMagmonitorHealthAlerts)({
      adminDb: _FirebaseAdmin.adminDb,
      deliverMagmonitorAlerts: _notifications.deliverMagmonitorAlerts,
      configured
    });
    return res.status(200).json({
      ...result,
      workOrderLinks: await checkWorkOrderLinks()
    });
  } catch (error) {
    console.error("[Magmonitor][alerts]", error?.message);
    return res.status(500).json({
      ok: false,
      error: "Magmonitor alerts could not be evaluated."
    });
  }
}
})(load, loaded, loaded.exports);
return loaded.exports;
};
