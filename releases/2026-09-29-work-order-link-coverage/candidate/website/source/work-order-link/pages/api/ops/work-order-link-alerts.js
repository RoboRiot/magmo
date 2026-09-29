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
exports.config = void 0;
exports.default = handler;
var _auth = require("firebase-admin/auth");
var _FirebaseAdmin = require("../../../context/FirebaseAdmin");
var _apiAuth = require("../../../utils/apiAuth");
const {
  CONFIG_PATH,
  OUTBOX,
  ownsInbox,
  publicAlert
} = require("../../../lib/ops/workOrderLinkAlertDelivery.cjs");
const config = exports.config = {
  api: {
    bodyParser: {
      sizeLimit: "8kb"
    }
  }
};
async function handler(req, res) {
  res.setHeader("Cache-Control", "private, no-store");
  if (!["GET", "POST"].includes(req.method)) {
    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({
      ok: false,
      error: "Method not allowed."
    });
  }
  try {
    const token = await (0, _apiAuth.requireFirebaseAuth)(req, res);
    if (res.headersSent) return;
    if (!token?.uid) return res.status(401).json({
      ok: false,
      error: "Sign in to Magmo."
    });
    const [owner, user] = await Promise.all([_FirebaseAdmin.adminDb.doc(CONFIG_PATH).get(), (0, _auth.getAuth)().getUser(token.uid)]);
    if (!ownsInbox(owner.data(), user)) return res.status(403).json({
      ok: false,
      error: "This is a private owner inbox."
    });
    if (req.method === "GET") {
      const docs = await _FirebaseAdmin.adminDb.collection(OUTBOX).orderBy("createdAtIso", "desc").limit(100).get();
      return res.status(200).json({
        ok: true,
        alerts: docs.docs.map(doc => publicAlert(doc.id, doc.data())),
        hasMore: docs.docs.length === 100
      });
    }
    const body = req.body || {};
    if (body.action !== "mark_read" || Object.keys(body).some(key => !["action", "ids"].includes(key)) || !Array.isArray(body.ids) || !body.ids.length || body.ids.length > 100 || body.ids.some(id => typeof id !== "string" || !/^[a-f0-9]{64}$/.test(id))) {
      return res.status(400).json({
        ok: false,
        error: "Choose notifications to mark as read."
      });
    }
    await _FirebaseAdmin.adminDb.runTransaction(async tx => {
      const currentOwner = (await tx.get(_FirebaseAdmin.adminDb.doc(CONFIG_PATH))).data();
      if (!ownsInbox(currentOwner, user)) throw Object.assign(new Error("Owner changed"), {
        statusCode: 403
      });
      const docs = await Promise.all([...new Set(body.ids)].map(id => tx.get(_FirebaseAdmin.adminDb.collection(OUTBOX).doc(id))));
      if (docs.some(doc => !doc.exists)) throw Object.assign(new Error("Unknown notification"), {
        statusCode: 404
      });
      for (const doc of docs) if (!doc.data().readAtIso) tx.set(doc.ref, {
        readAtIso: new Date().toISOString()
      }, {
        merge: true
      });
    });
    return res.status(200).json({
      ok: true
    });
  } catch (error) {
    return res.status([403, 404].includes(error.statusCode) ? error.statusCode : 503).json({
      ok: false,
      error: "The private link-alert inbox could not be loaded or updated."
    });
  }
}
})(load, loaded, loaded.exports);
return loaded.exports;
};
