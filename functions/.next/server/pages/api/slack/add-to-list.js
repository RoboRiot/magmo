module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 39);
/******/ })
/************************************************************************/
/******/ ({

/***/ 39:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("Jyq9");


/***/ }),

/***/ "Jyq9":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return handler; });
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// // pages/api/slack/add-to-list.js
// export default async function handler(req, res) {
//   try {
//     if (req.method !== "POST") {
//       return res.status(405).json({ ok: false, error: "method_not_allowed" });
//     }
//     const token = process.env.SLACK_BOT_TOKEN;
//     if (!token) {
//       return res.status(500).json({ ok: false, error: "missing_SLACK_BOT_TOKEN" });
//     }
//     // payload from client
//     const {
//       listKey,             // "tasks" | "shipping" | "receiving"
//       title,               // item title (what shows in the primary column)
//       // keeping minimal per your request: PN/SN only for now
//       pn, sn,
//     } = req.body || {};
//     // list ids from env
//     const LIST_IDS = {
//       tasks: process.env.SLACK_LIST_TASKS_ID,
//       shipping: process.env.SLACK_LIST_SHIPPING_ID,
//       receiving: process.env.SLACK_LIST_RECEIVING_ID,
//     };
//     const list_id = LIST_IDS[listKey];
//     if (!list_id) {
//       return res.status(400).json({ ok: false, error: `unknown_listKey_${listKey}` });
//     }
//     // ---- Slack helpers ----
//     async function slackJson(method, payload) {
//       const r = await fetch(`https://slack.com/api/${method}`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json; charset=utf-8",
//         },
//         body: JSON.stringify(payload),
//       });
//       return r.json();
//     }
//     const plain = (v) => (v ?? "").toString().trim();
//     const joinArr = (a) => Array.isArray(a) ? a.filter(Boolean).map(plain).join(", ") : plain(a);
//     function toRichText(text) {
//       const t = plain(text);
//       return [{
//         type: "rich_text",
//         elements: [{
//           type: "rich_text_section",
//           elements: [{ type: "text", text: t }],
//         }],
//       }];
//     }
//     // Try to resolve primary/text column id ("Item"/"Task") by scanning existing rows
//     async function resolveTitleColId(listId) {
//       const probe = await slackJson("slackLists.items.list", { list_id: listId, limit: 50 });
//       if (!probe?.ok) return null;
//       // Heuristics: prefer a text field whose key looks like 'item' or 'task'
//       let fallback = null;
//       for (const it of probe.items || []) {
//         for (const f of it.fields || []) {
//           const key = (f.key || "").toLowerCase();
//           const hasText = !!f.text || Array.isArray(f.rich_text);
//           if (f.column_id && hasText) {
//             if (key.includes("item") || key.includes("task")) return f.column_id;
//             if (!fallback) fallback = f.column_id;
//           }
//         }
//       }
//       return fallback; // first text-like field if we didn't find a perfect match
//     }
//     // Find the PN/SN column id by scanning for a field with key or text like "PN" / "SN"
//     async function resolvePnSnColId(listId) {
//       const probe = await slackJson("slackLists.items.list", { list_id: listId, limit: 100 });
//       if (!probe?.ok) return null;
//       let candidate = null;
//       for (const it of probe.items || []) {
//         for (const f of it.fields || []) {
//           if (!f.column_id) continue;
//           const key = (f.key || "").toLowerCase();
//           const text = (f.text || "").toLowerCase();
//           const looksPnSn =
//             key.includes("pn") || key.includes("sn") ||
//             text.includes("pn:") || text.includes("sn:");
//           if (looksPnSn) return f.column_id;
//           if (!candidate && (key.includes("part") || key.includes("serial"))) {
//             candidate = f.column_id;
//           }
//         }
//       }
//       return candidate;
//     }
//     // 1) Resolve columns
//     const titleColId = await resolveTitleColId(list_id);
//     if (!titleColId) {
//       return res.status(400).json({ ok: false, error: "could_not_resolve_title_column" });
//     }
//     // 2) Create the item with the title in the title column (must use initial_fields with a real column_id)
//     const safeTitle = plain(title) || "New Item";
//     const createBody = {
//       list_id,
//       initial_fields: [{ column_id: titleColId, rich_text: toRichText(safeTitle) }],
//     };
//     const created = await slackJson("slackLists.items.create", createBody);
//     if (!created?.ok) {
//       return res.status(200).json({
//         ok: false,
//         error: created?.error || "create_failed",
//         mode: "list",
//         sent: createBody,
//       });
//     }
//     // 3) (Minimal) update: PN/SN only, per your request
//     const pn0 = Array.isArray(pn) ? pn[0] : pn;
//     const sn0 = Array.isArray(sn) ? sn[0] : sn;
//     const pnPart = plain(pn0) ? `PN: ${plain(pn0)}` : "";
//     const snPart = plain(sn0) ? `SN: ${plain(sn0)}` : "";
//     const pnSnText = [pnPart, snPart].filter(Boolean).join("  ");
//     let updated = null;
//     let usedPnSnCol = null;
//     if (pnSnText) {
//       const pnSnColId = await resolvePnSnColId(list_id);
//       if (pnSnColId) {
//         const cells = [{
//           row_id: created.item.id,
//           column_id: pnSnColId,
//           rich_text: toRichText(pnSnText),
//         }];
//         updated = await slackJson("slackLists.items.update", { list_id, cells });
//         usedPnSnCol = pnSnColId;
//         // If update fails, we still return ok:false so you can see the error
//         if (!updated?.ok) {
//           return res.status(200).json({
//             ok: false,
//             error: updated?.error || "update_failed",
//             mode: "list",
//             list_id,
//             item_id: created.item.id,
//             used_title_col: titleColId,
//             used_pnsn_col: usedPnSnCol,
//           });
//         }
//       }
//     }
//     return res.status(200).json({
//       ok: true,
//       mode: "list",
//       list_id,
//       item_id: created.item.id,
//       used_title_col: titleColId,
//       used_pnsn_col: usedPnSnCol || null,
//       sent_title: safeTitle,
//     });
//   } catch (err) {
//     console.error("API /slack/add-to-list crashed:", err);
//     return res.status(500).json({ ok: false, error: "exception", message: err?.message || String(err) });
//   }
// }
// pages/api/slack/add-to-list.js
async function handler(req, res) {
  const t0 = Date.now();
  const steps = [];

  const logStep = (step, extra = {}) => steps.push(_objectSpread({
    t: new Date().toISOString(),
    step
  }, extra));

  try {
    var _created$item;

    if (req.method !== "POST") {
      return res.status(405).json({
        ok: false,
        error: "method_not_allowed"
      });
    }

    const token = process.env.SLACK_BOT_TOKEN;

    if (!token) {
      return res.status(500).json({
        ok: false,
        error: "missing_SLACK_BOT_TOKEN"
      });
    } // ---------- payload from client ----------


    const {
      listKey,
      // "tasks" | "shipping" | "receiving"
      title,
      // item title
      pn_sn,
      // preferred input: "PN: 123  SN: 456"
      work_order,
      // preferred input
      tracking,
      local_sn,
      // preferred input
      description,
      photoUrls,
      // preferred input: array
      // legacy keys we still accept for safety:
      pn,
      sn,
      workOrder,
      localSN,
      trackingNumber,
      photo_urls,
      photos
    } = req.body || {}; // Normalize inputs so both old & new callers work

    const plain = v => (v !== null && v !== void 0 ? v : "").toString().trim();

    const pn_sn_norm = (() => {
      if (plain(pn_sn)) return plain(pn_sn);
      const pn0 = plain(pn);
      const sn0 = plain(sn);
      const parts = [];
      if (pn0) parts.push(`PN: ${pn0}`);
      if (sn0) parts.push(`SN: ${sn0}`);
      return parts.join("  ");
    })();

    const work_order_norm = plain(work_order || workOrder || "");
    const local_sn_norm = plain(local_sn || localSN || "");
    const tracking_norm = plain(tracking || trackingNumber || "");
    const description_norm = plain(description || "");
    let photoUrls_norm = Array.isArray(photoUrls) ? photoUrls : Array.isArray(photo_urls) ? photo_urls : Array.isArray(photos) ? photos : []; // ---------- env: list + column ids ----------

    const LIST_IDS = {
      tasks: process.env.SLACK_LIST_TASKS_ID,
      shipping: process.env.SLACK_LIST_SHIPPING_ID,
      receiving: process.env.SLACK_LIST_RECEIVING_ID
    };
    const COLS = {
      tasks: {
        title: process.env.SLACK_LIST_TASKS_TITLE_COL,
        desc: process.env.SLACK_LIST_TASKS_DESCRIPTION_COL
      },
      shipping: {
        title: process.env.SLACK_LIST_SHIPPING_TITLE_COL,
        desc: process.env.SLACK_LIST_SHIPPING_DESCRIPTION_COL,
        pnsn: process.env.SLACK_LIST_SHIPPING_PNSN_COL,
        wo: process.env.SLACK_LIST_SHIPPING_WO_COL,
        localsn: process.env.SLACK_LIST_SHIPPING_LOCALSN_COL,
        tracking: process.env.SLACK_LIST_SHIPPING_TRACKING_COL,
        photos: process.env.SLACK_LIST_SHIPPING_PHOTOS_COL
      },
      receiving: {
        title: process.env.SLACK_LIST_RECEIVING_TITLE_COL,
        desc: process.env.SLACK_LIST_RECEIVING_DESCRIPTION_COL,
        pnsn: process.env.SLACK_LIST_RECEIVING_PNSN_COL,
        wo: process.env.SLACK_LIST_RECEIVING_WO_COL,
        localsn: process.env.SLACK_LIST_RECEIVING_LOCALSN_COL,
        tracking: process.env.SLACK_LIST_RECEIVING_TRACKING_COL,
        photos: process.env.SLACK_LIST_RECEIVING_PHOTOS_COL
      }
    };
    const list_id = LIST_IDS[listKey];
    const CFG = COLS[listKey] || {};

    if (!list_id) {
      return res.status(400).json({
        ok: false,
        error: `unknown_listKey_${listKey}`
      });
    }

    if (!CFG.title) {
      return res.status(400).json({
        ok: false,
        error: "missing_title_column_env"
      });
    } // ---------- helpers ----------


    async function slackJson(method, payload) {
      const r = await fetch(`https://slack.com/api/${method}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(payload)
      });
      const json = await r.json();
      return json;
    }

    function richText(text) {
      const t = plain(text);
      return [{
        type: "rich_text",
        elements: [{
          type: "rich_text_section",
          elements: [{
            type: "text",
            text: t || ""
          }]
        }]
      }];
    }

    const safeFilenameFromUrl = (url, i) => {
      try {
        // last path piece (may be the encoded "Parts%2F...jpg")
        const last = (url.split("/").pop() || "").split("?")[0]; // decode, THEN take last segment again (in case it contains '/')

        const decoded = decodeURIComponent(last);
        const basename = decoded.split("/").pop() || decoded; // replace anything unsafe (slashes, spaces, etc.)

        const safe = basename.replace(/[^\w.\-]+/g, "_");
        return safe || `photo_${i + 1}.jpg`;
      } catch {
        return `photo_${i + 1}.jpg`;
      }
    }; // ---------- 1) create the row with title ----------


    const titleText = plain(title) || "Untitled item";
    const createPayload = {
      list_id,
      initial_fields: [{
        column_id: CFG.title,
        rich_text: richText(titleText)
      }]
    };
    const created = await slackJson("slackLists.items.create", createPayload);
    logStep("[LISTS][CREATE-RICH]", {
      ok: (created === null || created === void 0 ? void 0 : created.ok) === true,
      status: 200,
      error: created === null || created === void 0 ? void 0 : created.error
    });

    if (!(created !== null && created !== void 0 && created.ok)) {
      return res.status(200).json({
        ok: false,
        error: (created === null || created === void 0 ? void 0 : created.error) || "create_failed",
        debug: {
          steps
        }
      });
    }

    const rowId = (_created$item = created.item) === null || _created$item === void 0 ? void 0 : _created$item.id;
    logStep("[LISTS][CREATED]", {
      rowId
    }); // ---------- 2) update rich_text fields ----------

    const cells = [];
    if (CFG.pnsn && pn_sn_norm) cells.push({
      row_id: rowId,
      column_id: CFG.pnsn,
      rich_text: richText(pn_sn_norm)
    });
    if (CFG.localsn && local_sn_norm) cells.push({
      row_id: rowId,
      column_id: CFG.localsn,
      rich_text: richText(local_sn_norm)
    });
    if (CFG.wo && work_order_norm) cells.push({
      row_id: rowId,
      column_id: CFG.wo,
      rich_text: richText(work_order_norm)
    });
    if (CFG.tracking && tracking_norm) cells.push({
      row_id: rowId,
      column_id: CFG.tracking,
      rich_text: richText(tracking_norm)
    });
    if (CFG.desc && description_norm) cells.push({
      row_id: rowId,
      column_id: CFG.desc,
      rich_text: richText(description_norm)
    });

    if (cells.length) {
      const updated = await slackJson("slackLists.items.update", {
        list_id,
        cells
      });
      if (CFG.pnsn && pn_sn_norm) logStep("[LISTS][SET-RICH][PN/SN]", {
        ok: (updated === null || updated === void 0 ? void 0 : updated.ok) === true,
        status: 200,
        error: updated === null || updated === void 0 ? void 0 : updated.error
      });
      if (CFG.localsn && local_sn_norm) logStep("[LISTS][SET-RICH][LOCAL_SN]", {
        ok: (updated === null || updated === void 0 ? void 0 : updated.ok) === true,
        status: 200,
        error: updated === null || updated === void 0 ? void 0 : updated.error
      });
      if (CFG.desc && description_norm) logStep("[LISTS][SET-RICH][DESCRIPTION]", {
        ok: (updated === null || updated === void 0 ? void 0 : updated.ok) === true,
        status: 200,
        error: updated === null || updated === void 0 ? void 0 : updated.error
      });
      if (CFG.wo && work_order_norm) logStep("[LISTS][SET-RICH][WO]", {
        ok: (updated === null || updated === void 0 ? void 0 : updated.ok) === true,
        status: 200,
        error: updated === null || updated === void 0 ? void 0 : updated.error
      });
      if (CFG.tracking && tracking_norm) logStep("[LISTS][SET-RICH][TRACKING]", {
        ok: (updated === null || updated === void 0 ? void 0 : updated.ok) === true,
        status: 200,
        error: updated === null || updated === void 0 ? void 0 : updated.error
      });

      if (!(updated !== null && updated !== void 0 && updated.ok)) {
        return res.status(200).json({
          ok: false,
          error: (updated === null || updated === void 0 ? void 0 : updated.error) || "update_failed",
          debug: {
            steps
          }
        });
      }
    } // ---------- 3) upload photos ----------


    async function uploadViaExternal(fileUrl, filename) {
      // 3a. fetch bytes
      const resp = await fetch(fileUrl);
      const buf = await resp.arrayBuffer();
      const byteLen = buf.byteLength;
      logStep("[FILES.BYTES]", {
        byteLen,
        filename
      }); // 3b. get upload url (filename MUST be a single segment; no '/')

      const up = await slackJson("files.getUploadURLExternal", {
        filename,
        length: byteLen
      });
      logStep("[FILES.GETUPLOAD]", {
        ok: (up === null || up === void 0 ? void 0 : up.ok) === true,
        status: 200,
        byteLen,
        filename,
        error: up === null || up === void 0 ? void 0 : up.error
      });
      if (!(up !== null && up !== void 0 && up.ok) || !(up !== null && up !== void 0 && up.upload_url) || !(up !== null && up !== void 0 && up.file_id)) return {
        ok: false,
        error: (up === null || up === void 0 ? void 0 : up.error) || "get_upload_url_failed"
      }; // 3c. post bytes to the upload_url

      const post = await fetch(up.upload_url, {
        method: "POST",
        body: Buffer.from(buf)
      });
      logStep("[FILES.UPLOAD.POST]", {
        ok: (post === null || post === void 0 ? void 0 : post.ok) === true,
        status: post === null || post === void 0 ? void 0 : post.status
      });
      if (!post.ok) return {
        ok: false,
        error: "upload_post_failed"
      }; // 3d. complete

      const complete = await slackJson("files.completeUploadExternal", {
        files: [{
          id: up.file_id,
          title: filename
        }]
      });
      logStep("[FILES.COMPLETE]", {
        ok: (complete === null || complete === void 0 ? void 0 : complete.ok) === true,
        status: 200,
        error: complete === null || complete === void 0 ? void 0 : complete.error
      });
      if (!(complete !== null && complete !== void 0 && complete.ok)) return {
        ok: false,
        error: (complete === null || complete === void 0 ? void 0 : complete.error) || "complete_failed"
      };
      return {
        ok: true,
        file: {
          id: up.file_id
        }
      };
    }

    async function attachFilesToCell(listId, row, col, fileIds) {
      var _r, _r2, _r3, _r4, _r5, _r6, _r7, _r8, _r9, _r10, _r11;

      // Try a few shapes. Different list column types accept different shapes.
      // A) "attachment": [ "F..." ]
      let r = await slackJson("slackLists.items.update", {
        list_id: listId,
        cells: [{
          row_id: row,
          column_id: col,
          attachment: fileIds
        }]
      });
      logStep("[LISTS][ATTACH-A][PHOTOS]", {
        ok: ((_r = r) === null || _r === void 0 ? void 0 : _r.ok) === true,
        status: 200,
        error: (_r2 = r) === null || _r2 === void 0 ? void 0 : _r2.error
      });
      if ((_r3 = r) !== null && _r3 !== void 0 && _r3.ok) return r; // B) "files": [{ id: 'F...' }]

      r = await slackJson("slackLists.items.update", {
        list_id: listId,
        cells: [{
          row_id: row,
          column_id: col,
          files: fileIds.map(id => ({
            id
          }))
        }]
      });
      logStep("[LISTS][ATTACH-B][PHOTOS]", {
        ok: ((_r4 = r) === null || _r4 === void 0 ? void 0 : _r4.ok) === true,
        status: 200,
        error: (_r5 = r) === null || _r5 === void 0 ? void 0 : _r5.error
      });
      if ((_r6 = r) !== null && _r6 !== void 0 && _r6.ok) return r; // C) "files": [{ file_id: 'F...' }]

      r = await slackJson("slackLists.items.update", {
        list_id: listId,
        cells: [{
          row_id: row,
          column_id: col,
          files: fileIds.map(id => ({
            file_id: id
          }))
        }]
      });
      logStep("[LISTS][ATTACH-C][PHOTOS]", {
        ok: ((_r7 = r) === null || _r7 === void 0 ? void 0 : _r7.ok) === true,
        status: 200,
        error: (_r8 = r) === null || _r8 === void 0 ? void 0 : _r8.error
      });
      if ((_r9 = r) !== null && _r9 !== void 0 && _r9.ok) return r; // D) "reference": [{ file: { file_id: 'F...' } }]

      r = await slackJson("slackLists.items.update", {
        list_id: listId,
        cells: [{
          row_id: row,
          column_id: col,
          reference: fileIds.map(id => ({
            file: {
              file_id: id
            }
          }))
        }]
      });
      logStep("[LISTS][ATTACH-D][PHOTOS]", {
        ok: ((_r10 = r) === null || _r10 === void 0 ? void 0 : _r10.ok) === true,
        status: 200,
        error: (_r11 = r) === null || _r11 === void 0 ? void 0 : _r11.error
      });
      return r;
    }

    let attachedOk = false;
    let uploadedFileIds = [];

    if (CFG.photos && Array.isArray(photoUrls_norm) && photoUrls_norm.length) {
      for (let i = 0; i < Math.min(photoUrls_norm.length, 10); i++) {
        var _up$file, _up$file2;

        const url = plain(photoUrls_norm[i]);
        if (!/^https?:\/\//i.test(url)) continue;
        const filename = safeFilenameFromUrl(url, i);
        const up = await uploadViaExternal(url, filename);
        logStep("[PHOTOS][UPLOADED]", {
          ok: (up === null || up === void 0 ? void 0 : up.ok) === true,
          file_id: up === null || up === void 0 ? void 0 : (_up$file = up.file) === null || _up$file === void 0 ? void 0 : _up$file.id,
          filename
        });
        if (up !== null && up !== void 0 && up.ok && (_up$file2 = up.file) !== null && _up$file2 !== void 0 && _up$file2.id) uploadedFileIds.push(up.file.id);
      }

      if (uploadedFileIds.length) {
        const att = await attachFilesToCell(list_id, rowId, CFG.photos, uploadedFileIds);
        attachedOk = !!(att !== null && att !== void 0 && att.ok);

        if (!attachedOk) {
          logStep("[PHOTOS][FAILED-ATTACH]", {
            error: att === null || att === void 0 ? void 0 : att.error,
            ids: uploadedFileIds
          });
        }
      } else {
        logStep("[PHOTOS][NO-IDS]", {
          reason: "upload_failed_or_empty"
        });
      }
    } // Fallback: drop photo URLs into Description so nothing is lost


    if (!attachedOk && CFG.desc && photoUrls_norm !== null && photoUrls_norm !== void 0 && photoUrls_norm.length) {
      const updated = await slackJson("slackLists.items.update", {
        list_id,
        cells: [{
          row_id: rowId,
          column_id: CFG.desc,
          rich_text: richText(`${description_norm}\n\nPhotos:\n${photoUrls_norm.join("\n")}`)
        }]
      });
      logStep("[LISTS][SET-RICH][PHOTOS->DESC-FALLBACK]", {
        ok: (updated === null || updated === void 0 ? void 0 : updated.ok) === true,
        status: 200,
        error: updated === null || updated === void 0 ? void 0 : updated.error
      });
    }

    return res.status(200).json({
      ok: true,
      list_id,
      item_id: rowId,
      used_cols: {
        title_col: CFG.title || null,
        pnsn_col: CFG.pnsn || null,
        description_col: CFG.desc || null,
        workorder_col: CFG.wo || null,
        localsn_col: CFG.localsn || null,
        tracking_col: CFG.tracking || null,
        photos_col: CFG.photos || null
      },
      debug: {
        steps,
        photos: uploadedFileIds
      },
      ms: Date.now() - t0
    });
  } catch (err) {
    logStep("[EXCEPTION]", {
      message: err === null || err === void 0 ? void 0 : err.message
    });
    console.error("API /slack/add-to-list crashed:", err);
    return res.status(500).json({
      ok: false,
      error: "exception",
      message: (err === null || err === void 0 ? void 0 : err.message) || String(err),
      debug: {
        steps
      }
    });
  }
}

/***/ })

/******/ });