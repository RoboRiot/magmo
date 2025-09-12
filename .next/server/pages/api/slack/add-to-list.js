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
/******/ 	return __webpack_require__(__webpack_require__.s = "./pages/api/slack/add-to-list.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./pages/api/slack/add-to-list.js":
/*!****************************************!*\
  !*** ./pages/api/slack/add-to-list.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return handler; });
// pages/api/slack/add-to-list.js
async function handler(req, res) {
  var _req$body, _items;

  if (req.method !== "POST") return res.status(405).json({
    error: "Method not allowed"
  });
  const token = process.env.SLACK_BOT_TOKEN;
  if (!token) return res.status(500).json({
    error: "Missing SLACK_BOT_TOKEN"
  });
  const {
    listKey,
    // "receiving" | "shipping" | "tasks"
    title,
    linkUrl,
    bodyText,
    date,
    pn,
    sn,
    dom,
    trackingNumber,
    poNumber,
    workOrder,
    localSN,
    description,
    photoUrls = []
  } = req.body;
  const LISTS = {
    receiving: {
      id: process.env.SLACK_LIST_RECEIVING_ID,
      cols: {
        desc: process.env.SLACK_LIST_RECEIVING_DESCRIPTION_COL,
        date: process.env.SLACK_LIST_RECEIVING_DATE_COL,
        pn: process.env.SLACK_LIST_RECEIVING_PNSN_COL,
        track: process.env.SLACK_LIST_RECEIVING_TRACKING_COL,
        wo: process.env.SLACK_LIST_RECEIVING_WO_COL,
        lsn: process.env.SLACK_LIST_RECEIVING_LOCALSN_COL,
        photos: process.env.SLACK_LIST_RECEIVING_PHOTOS_COL // attachment

      }
    },
    shipping: {
      id: process.env.SLACK_LIST_SHIPPING_ID,
      cols: {
        desc: process.env.SLACK_LIST_SHIPPING_DESCRIPTION_COL,
        date: process.env.SLACK_LIST_SHIPPING_DATE_COL,
        pn: process.env.SLACK_LIST_SHIPPING_PNSN_COL,
        track: process.env.SLACK_LIST_SHIPPING_TRACKING_COL,
        wo: process.env.SLACK_LIST_SHIPPING_WO_COL,
        lsn: process.env.SLACK_LIST_SHIPPING_LOCALSN_COL,
        photos: process.env.SLACK_LIST_SHIPPING_PHOTOS_COL // attachment

      }
    },
    tasks: {
      id: process.env.SLACK_LIST_TASKS_ID,
      cols: {
        desc: process.env.SLACK_LIST_TASKS_DESCRIPTION_COL
      }
    }
  };
  const CHANNELS = {
    receiving: process.env.SLACK_CHANNEL_RECEIVING_ID,
    shipping: process.env.SLACK_CHANNEL_SHIPPING_ID,
    tasks: process.env.SLACK_CHANNEL_TASKS_ID
  };
  const headersJson = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json; charset=utf-8"
  };

  const slack = (method, body, headers = headersJson) => fetch(`https://slack.com/api/${method}`, {
    method: "POST",
    headers,
    body
  }).then(r => r.json());

  const plain = v => (v !== null && v !== void 0 ? v : "").toString().trim();

  const createBody = {
    list_id: cfg.id,
    title: plain(title) || plain(localSN) || "Untitled",
    // plain text title
    fields
  }; // --- PATH A: Write to a LIST (preferred for SHIPPING/RECEIVING) ---

  const cfg = LISTS[listKey];

  if (cfg !== null && cfg !== void 0 && cfg.id) {
    const fields = []; // column: description

    if (cfg.cols.desc && (description || bodyText || linkUrl)) {
      const textBits = [description, bodyText && listKey === "tasks" ? bodyText : null, linkUrl ? `<${linkUrl}|Open in Magmo>` : null].filter(Boolean).join("\n");
      fields.push({
        column_id: cfg.cols.desc,
        value: {
          text: textBits
        }
      });
    }

    if (cfg.cols.date && date) fields.push({
      column_id: cfg.cols.date,
      value: {
        date
      }
    });
    if (cfg.cols.pn && (pn || sn || dom)) fields.push({
      column_id: cfg.cols.pn,
      value: {
        text: [Array.isArray(pn) ? `PN: ${pn.filter(Boolean).join(", ")}` : pn ? `PN: ${pn}` : "", Array.isArray(sn) ? `SN: ${sn.filter(Boolean).join(", ")}` : sn ? `SN: ${sn}` : "", dom ? `DOM: ${dom}` : ""].filter(Boolean).join("  ")
      }
    });
    if (cfg.cols.track && (trackingNumber || poNumber)) fields.push({
      column_id: cfg.cols.track,
      value: {
        text: [trackingNumber ? `RL: ${trackingNumber}` : "", poNumber ? `PO: ${poNumber}` : ""].filter(Boolean).join("  ")
      }
    });
    if (cfg.cols.wo && workOrder) fields.push({
      column_id: cfg.cols.wo,
      value: {
        text: `WO: ${workOrder}`
      }
    });
    if (cfg.cols.lsn && localSN) fields.push({
      column_id: cfg.cols.lsn,
      value: {
        text: localSN
      }
    });
    const created = await slack("slackLists.items.create", JSON.stringify(createBody));

    if (!(created !== null && created !== void 0 && created.ok)) {
      return res.status(400).json({
        error: (created === null || created === void 0 ? void 0 : created.error) || "Slack Lists API error",
        raw: created
      });
    } // 2) Upload photos and attach to the "attachment" column


    if (cfg.cols.photos && Array.isArray(photoUrls) && photoUrls.length) {
      const fileIds = [];

      for (const url of photoUrls) {
        var _complete$files, _complete$files$;

        // a) get external upload URL
        const init = await fetch("https://slack.com/api/files.getUploadURLExternal", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: new URLSearchParams({
            filename: url.split("/").pop() || "image.jpg"
          })
        }).then(r => r.json());
        if (!(init !== null && init !== void 0 && init.ok) || !(init !== null && init !== void 0 && init.upload_url)) continue;

        try {
          const img = await fetch(url);
          const buf = await img.arrayBuffer();
          await fetch(init.upload_url, {
            method: "PUT",
            body: Buffer.from(buf)
          });
        } catch {
          /* ignore individual image failures */
        }

        const complete = await slack("files.completeUploadExternal", JSON.stringify({
          files: [{
            id: init.file_id,
            title: "photo"
          }]
        }));
        if (complete !== null && complete !== void 0 && complete.ok && complete !== null && complete !== void 0 && (_complete$files = complete.files) !== null && _complete$files !== void 0 && (_complete$files$ = _complete$files[0]) !== null && _complete$files$ !== void 0 && _complete$files$.id) fileIds.push(complete.files[0].id);
      }

      if (fileIds.length) {
        // Patch the row with attachment field
        await slack("slackLists.items.update", JSON.stringify({
          list_id: cfg.id,
          item_id: created.item.id,
          fields: [{
            column_id: cfg.cols.photos,
            value: {
              attachment: {
                file_ids: fileIds
              }
            }
          }]
        }));
      }
    }

    return res.status(200).json({
      ok: true,
      mode: "list",
      list_id: cfg.id,
      item_id: created.item.id
    });
  } // --- PATH B: Fallback to a channel post ---


  const channel = CHANNELS[listKey];
  if (!channel) return res.status(400).json({
    error: "Unknown listKey (no list or channel configured)"
  }); // Try to join public channels so chat.postMessage won’t fail with channel_not_found

  await fetch("https://slack.com/api/conversations.join", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      channel
    })
  }); // Build safe helpers

  const safe = v => (v !== null && v !== void 0 ? v : "").toString().trim();

  const joinArr = a => Array.isArray(a) ? a.filter(Boolean).map(safe).join(", ") : safe(a); // Build a non-empty title


  const safeId = safe(linkUrl === null || linkUrl === void 0 ? void 0 : linkUrl.split("/").pop()) || safe(localSN) || "";
  const safeTitle = safe(title) || safe((_req$body = req.body) === null || _req$body === void 0 ? void 0 : _req$body.title) || // belt & suspenders
  safe((_items = items) === null || _items === void 0 ? void 0 : _items.name) || ( // if you ever pass items.name later
  safeId ? `Item ${safeId}` : "New Item"); // Rebuild the message text

  const lines = [];
  lines.push(`*${safeTitle}*`);
  const pnStr = joinArr(pn);
  const snStr = joinArr(sn);
  if (pnStr) lines.push(`PN: ${pnStr}`);
  if (snStr) lines.push(`SN: ${snStr}`);
  if (safe(workOrder)) lines.push(`WO: ${safe(workOrder)}`);
  if (safe(poNumber)) lines.push(`PO: ${safe(poNumber)}`);
  if (safe(trackingNumber)) lines.push(`RL: ${safe(trackingNumber)}`);
  if (safe(dom)) lines.push(`DOM: ${safe(dom)}`);
  if (safe(localSN)) lines.push(`Local SN: ${safe(localSN)}`);
  if (safe(date)) lines.push(`Date: ${safe(date)}`); // If they sent a description, prefer that over bodyText

  const desc = safe(description);
  if (desc) lines.push(desc);else if (listKey === "tasks" && safe(bodyText)) lines.push(safe(bodyText));
  if (safe(linkUrl)) lines.push(`<${safe(linkUrl)}|Open in Magmo>`); // NEVER allow empty text

  const text = lines.filter(Boolean).join("\n") || "(no details provided)";
  const posted = await slack("chat.postMessage", JSON.stringify({
    channel,
    text
  }) // <-- use the joined string, not the array
  );
  if (!(posted !== null && posted !== void 0 && posted.ok)) return res.status(400).json({
    error: (posted === null || posted === void 0 ? void 0 : posted.error) || "Slack API error",
    raw: posted
  });
  return res.status(200).json({
    ok: true,
    mode: "channel",
    channel,
    ts: posted.ts
  });
}

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vcGFnZXMvYXBpL3NsYWNrL2FkZC10by1saXN0LmpzIl0sIm5hbWVzIjpbImhhbmRsZXIiLCJyZXEiLCJyZXMiLCJtZXRob2QiLCJzdGF0dXMiLCJqc29uIiwiZXJyb3IiLCJ0b2tlbiIsInByb2Nlc3MiLCJlbnYiLCJTTEFDS19CT1RfVE9LRU4iLCJsaXN0S2V5IiwidGl0bGUiLCJsaW5rVXJsIiwiYm9keVRleHQiLCJkYXRlIiwicG4iLCJzbiIsImRvbSIsInRyYWNraW5nTnVtYmVyIiwicG9OdW1iZXIiLCJ3b3JrT3JkZXIiLCJsb2NhbFNOIiwiZGVzY3JpcHRpb24iLCJwaG90b1VybHMiLCJib2R5IiwiTElTVFMiLCJyZWNlaXZpbmciLCJpZCIsIlNMQUNLX0xJU1RfUkVDRUlWSU5HX0lEIiwiY29scyIsImRlc2MiLCJTTEFDS19MSVNUX1JFQ0VJVklOR19ERVNDUklQVElPTl9DT0wiLCJTTEFDS19MSVNUX1JFQ0VJVklOR19EQVRFX0NPTCIsIlNMQUNLX0xJU1RfUkVDRUlWSU5HX1BOU05fQ09MIiwidHJhY2siLCJTTEFDS19MSVNUX1JFQ0VJVklOR19UUkFDS0lOR19DT0wiLCJ3byIsIlNMQUNLX0xJU1RfUkVDRUlWSU5HX1dPX0NPTCIsImxzbiIsIlNMQUNLX0xJU1RfUkVDRUlWSU5HX0xPQ0FMU05fQ09MIiwicGhvdG9zIiwiU0xBQ0tfTElTVF9SRUNFSVZJTkdfUEhPVE9TX0NPTCIsInNoaXBwaW5nIiwiU0xBQ0tfTElTVF9TSElQUElOR19JRCIsIlNMQUNLX0xJU1RfU0hJUFBJTkdfREVTQ1JJUFRJT05fQ09MIiwiU0xBQ0tfTElTVF9TSElQUElOR19EQVRFX0NPTCIsIlNMQUNLX0xJU1RfU0hJUFBJTkdfUE5TTl9DT0wiLCJTTEFDS19MSVNUX1NISVBQSU5HX1RSQUNLSU5HX0NPTCIsIlNMQUNLX0xJU1RfU0hJUFBJTkdfV09fQ09MIiwiU0xBQ0tfTElTVF9TSElQUElOR19MT0NBTFNOX0NPTCIsIlNMQUNLX0xJU1RfU0hJUFBJTkdfUEhPVE9TX0NPTCIsInRhc2tzIiwiU0xBQ0tfTElTVF9UQVNLU19JRCIsIlNMQUNLX0xJU1RfVEFTS1NfREVTQ1JJUFRJT05fQ09MIiwiQ0hBTk5FTFMiLCJTTEFDS19DSEFOTkVMX1JFQ0VJVklOR19JRCIsIlNMQUNLX0NIQU5ORUxfU0hJUFBJTkdfSUQiLCJTTEFDS19DSEFOTkVMX1RBU0tTX0lEIiwiaGVhZGVyc0pzb24iLCJBdXRob3JpemF0aW9uIiwic2xhY2siLCJoZWFkZXJzIiwiZmV0Y2giLCJ0aGVuIiwiciIsInBsYWluIiwidiIsInRvU3RyaW5nIiwidHJpbSIsImNyZWF0ZUJvZHkiLCJsaXN0X2lkIiwiY2ZnIiwiZmllbGRzIiwidGV4dEJpdHMiLCJmaWx0ZXIiLCJCb29sZWFuIiwiam9pbiIsInB1c2giLCJjb2x1bW5faWQiLCJ2YWx1ZSIsInRleHQiLCJBcnJheSIsImlzQXJyYXkiLCJjcmVhdGVkIiwiSlNPTiIsInN0cmluZ2lmeSIsIm9rIiwicmF3IiwibGVuZ3RoIiwiZmlsZUlkcyIsInVybCIsImluaXQiLCJVUkxTZWFyY2hQYXJhbXMiLCJmaWxlbmFtZSIsInNwbGl0IiwicG9wIiwidXBsb2FkX3VybCIsImltZyIsImJ1ZiIsImFycmF5QnVmZmVyIiwiQnVmZmVyIiwiZnJvbSIsImNvbXBsZXRlIiwiZmlsZXMiLCJmaWxlX2lkIiwiaXRlbV9pZCIsIml0ZW0iLCJhdHRhY2htZW50IiwiZmlsZV9pZHMiLCJtb2RlIiwiY2hhbm5lbCIsInNhZmUiLCJqb2luQXJyIiwiYSIsIm1hcCIsInNhZmVJZCIsInNhZmVUaXRsZSIsIml0ZW1zIiwibmFtZSIsImxpbmVzIiwicG5TdHIiLCJzblN0ciIsInBvc3RlZCIsInRzIl0sIm1hcHBpbmdzIjoiOztRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtR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RCxHQUFyQixDQUFQO0FBRWpCLFNBQU96SCxHQUFHLENBQUNFLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQjtBQUFFa0YsTUFBRSxFQUFFLElBQU47QUFBWXVCLFFBQUksRUFBRSxTQUFsQjtBQUE2QkMsV0FBN0I7QUFBc0NhLE1BQUUsRUFBRUQsTUFBTSxDQUFDQztBQUFqRCxHQUFyQixDQUFQO0FBQ0gsQyIsImZpbGUiOiJwYWdlcy9hcGkvc2xhY2svYWRkLXRvLWxpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHJlcXVpcmUoJy4uLy4uLy4uL3Nzci1tb2R1bGUtY2FjaGUuanMnKTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0dmFyIHRocmV3ID0gdHJ1ZTtcbiBcdFx0dHJ5IHtcbiBcdFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcbiBcdFx0XHR0aHJldyA9IGZhbHNlO1xuIFx0XHR9IGZpbmFsbHkge1xuIFx0XHRcdGlmKHRocmV3KSBkZWxldGUgaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdH1cblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3BhZ2VzL2FwaS9zbGFjay9hZGQtdG8tbGlzdC5qc1wiKTtcbiIsIi8vIHBhZ2VzL2FwaS9zbGFjay9hZGQtdG8tbGlzdC5qc1xyXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBoYW5kbGVyKHJlcSwgcmVzKSB7XHJcbiAgaWYgKHJlcS5tZXRob2QgIT09IFwiUE9TVFwiKSByZXR1cm4gcmVzLnN0YXR1cyg0MDUpLmpzb24oeyBlcnJvcjogXCJNZXRob2Qgbm90IGFsbG93ZWRcIiB9KTtcclxuXHJcbiAgY29uc3QgdG9rZW4gPSBwcm9jZXNzLmVudi5TTEFDS19CT1RfVE9LRU47XHJcbiAgaWYgKCF0b2tlbikgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgZXJyb3I6IFwiTWlzc2luZyBTTEFDS19CT1RfVE9LRU5cIiB9KTtcclxuXHJcbiAgY29uc3Qge1xyXG4gICAgbGlzdEtleSwgICAgICAgICAgICAvLyBcInJlY2VpdmluZ1wiIHwgXCJzaGlwcGluZ1wiIHwgXCJ0YXNrc1wiXHJcbiAgICB0aXRsZSwgbGlua1VybCwgYm9keVRleHQsXHJcbiAgICBkYXRlLCBwbiwgc24sIGRvbSwgdHJhY2tpbmdOdW1iZXIsIHBvTnVtYmVyLCB3b3JrT3JkZXIsIGxvY2FsU04sIGRlc2NyaXB0aW9uLFxyXG4gICAgcGhvdG9VcmxzID0gW10sXHJcbiAgfSA9IHJlcS5ib2R5O1xyXG5cclxuICBjb25zdCBMSVNUUyA9IHtcclxuICAgIHJlY2VpdmluZzoge1xyXG4gICAgICBpZDogcHJvY2Vzcy5lbnYuU0xBQ0tfTElTVF9SRUNFSVZJTkdfSUQsXHJcbiAgICAgIGNvbHM6IHtcclxuICAgICAgICBkZXNjOiBwcm9jZXNzLmVudi5TTEFDS19MSVNUX1JFQ0VJVklOR19ERVNDUklQVElPTl9DT0wsXHJcbiAgICAgICAgZGF0ZTogcHJvY2Vzcy5lbnYuU0xBQ0tfTElTVF9SRUNFSVZJTkdfREFURV9DT0wsXHJcbiAgICAgICAgcG46ICAgcHJvY2Vzcy5lbnYuU0xBQ0tfTElTVF9SRUNFSVZJTkdfUE5TTl9DT0wsXHJcbiAgICAgICAgdHJhY2s6cHJvY2Vzcy5lbnYuU0xBQ0tfTElTVF9SRUNFSVZJTkdfVFJBQ0tJTkdfQ09MLFxyXG4gICAgICAgIHdvOiAgIHByb2Nlc3MuZW52LlNMQUNLX0xJU1RfUkVDRUlWSU5HX1dPX0NPTCxcclxuICAgICAgICBsc246ICBwcm9jZXNzLmVudi5TTEFDS19MSVNUX1JFQ0VJVklOR19MT0NBTFNOX0NPTCxcclxuICAgICAgICBwaG90b3M6IHByb2Nlc3MuZW52LlNMQUNLX0xJU1RfUkVDRUlWSU5HX1BIT1RPU19DT0wsIC8vIGF0dGFjaG1lbnRcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBzaGlwcGluZzoge1xyXG4gICAgICBpZDogcHJvY2Vzcy5lbnYuU0xBQ0tfTElTVF9TSElQUElOR19JRCxcclxuICAgICAgY29sczoge1xyXG4gICAgICAgIGRlc2M6IHByb2Nlc3MuZW52LlNMQUNLX0xJU1RfU0hJUFBJTkdfREVTQ1JJUFRJT05fQ09MLFxyXG4gICAgICAgIGRhdGU6IHByb2Nlc3MuZW52LlNMQUNLX0xJU1RfU0hJUFBJTkdfREFURV9DT0wsXHJcbiAgICAgICAgcG46ICAgcHJvY2Vzcy5lbnYuU0xBQ0tfTElTVF9TSElQUElOR19QTlNOX0NPTCxcclxuICAgICAgICB0cmFjazpwcm9jZXNzLmVudi5TTEFDS19MSVNUX1NISVBQSU5HX1RSQUNLSU5HX0NPTCxcclxuICAgICAgICB3bzogICBwcm9jZXNzLmVudi5TTEFDS19MSVNUX1NISVBQSU5HX1dPX0NPTCxcclxuICAgICAgICBsc246ICBwcm9jZXNzLmVudi5TTEFDS19MSVNUX1NISVBQSU5HX0xPQ0FMU05fQ09MLFxyXG4gICAgICAgIHBob3RvczogcHJvY2Vzcy5lbnYuU0xBQ0tfTElTVF9TSElQUElOR19QSE9UT1NfQ09MLCAgLy8gYXR0YWNobWVudFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHRhc2tzOiB7XHJcbiAgICAgIGlkOiBwcm9jZXNzLmVudi5TTEFDS19MSVNUX1RBU0tTX0lELFxyXG4gICAgICBjb2xzOiB7XHJcbiAgICAgICAgZGVzYzogcHJvY2Vzcy5lbnYuU0xBQ0tfTElTVF9UQVNLU19ERVNDUklQVElPTl9DT0wsXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIH07XHJcblxyXG4gIGNvbnN0IENIQU5ORUxTID0ge1xyXG4gICAgcmVjZWl2aW5nOiBwcm9jZXNzLmVudi5TTEFDS19DSEFOTkVMX1JFQ0VJVklOR19JRCxcclxuICAgIHNoaXBwaW5nOiAgcHJvY2Vzcy5lbnYuU0xBQ0tfQ0hBTk5FTF9TSElQUElOR19JRCxcclxuICAgIHRhc2tzOiAgICAgcHJvY2Vzcy5lbnYuU0xBQ0tfQ0hBTk5FTF9UQVNLU19JRCxcclxuICB9O1xyXG5cclxuICAgIGNvbnN0IGhlYWRlcnNKc29uID0ge1xyXG4gICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHt0b2tlbn1gLFxyXG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IHNsYWNrID0gKG1ldGhvZCwgYm9keSwgaGVhZGVycyA9IGhlYWRlcnNKc29uKSA9PlxyXG4gICAgICAgIGZldGNoKGBodHRwczovL3NsYWNrLmNvbS9hcGkvJHttZXRob2R9YCwgeyBtZXRob2Q6IFwiUE9TVFwiLCBoZWFkZXJzLCBib2R5IH0pXHJcbiAgICAgICAgICAgIC50aGVuKHIgPT4gci5qc29uKCkpO1xyXG5cclxuICAgIGNvbnN0IHBsYWluID0gKHYpID0+ICh2ID8/IFwiXCIpLnRvU3RyaW5nKCkudHJpbSgpO1xyXG5cclxuICAgIGNvbnN0IGNyZWF0ZUJvZHkgPSB7XHJcbiAgICAgICAgbGlzdF9pZDogY2ZnLmlkLFxyXG4gICAgICAgIHRpdGxlOiBwbGFpbih0aXRsZSkgfHwgcGxhaW4obG9jYWxTTikgfHwgXCJVbnRpdGxlZFwiLCAvLyBwbGFpbiB0ZXh0IHRpdGxlXHJcbiAgICAgICAgZmllbGRzLFxyXG4gICAgfTtcclxuXHJcbiAgICAvLyAtLS0gUEFUSCBBOiBXcml0ZSB0byBhIExJU1QgKHByZWZlcnJlZCBmb3IgU0hJUFBJTkcvUkVDRUlWSU5HKSAtLS1cclxuICAgIGNvbnN0IGNmZyA9IExJU1RTW2xpc3RLZXldO1xyXG4gICAgaWYgKGNmZz8uaWQpIHtcclxuICAgICAgICBjb25zdCBmaWVsZHMgPSBbXTtcclxuXHJcbiAgICAgICAgLy8gY29sdW1uOiBkZXNjcmlwdGlvblxyXG4gICAgICAgIGlmIChjZmcuY29scy5kZXNjICYmIChkZXNjcmlwdGlvbiB8fCBib2R5VGV4dCB8fCBsaW5rVXJsKSkge1xyXG4gICAgICAgICAgICBjb25zdCB0ZXh0Qml0cyA9IFtcclxuICAgICAgICBkZXNjcmlwdGlvbixcclxuICAgICAgICBib2R5VGV4dCAmJiBsaXN0S2V5ID09PSBcInRhc2tzXCIgPyBib2R5VGV4dCA6IG51bGwsXHJcbiAgICAgICAgbGlua1VybCA/IGA8JHtsaW5rVXJsfXxPcGVuIGluIE1hZ21vPmAgOiBudWxsLFxyXG4gICAgICBdLmZpbHRlcihCb29sZWFuKS5qb2luKFwiXFxuXCIpO1xyXG4gICAgICBmaWVsZHMucHVzaCh7IGNvbHVtbl9pZDogY2ZnLmNvbHMuZGVzYywgdmFsdWU6IHsgdGV4dDogdGV4dEJpdHMgfX0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChjZmcuY29scy5kYXRlICYmIGRhdGUpICAgICAgICAgICAgIGZpZWxkcy5wdXNoKHsgY29sdW1uX2lkOiBjZmcuY29scy5kYXRlLCB2YWx1ZTogeyBkYXRlIH19KTtcclxuICAgIGlmIChjZmcuY29scy5wbiAmJiAocG4gfHwgc24gfHwgZG9tKSkgIGZpZWxkcy5wdXNoKHsgY29sdW1uX2lkOiBjZmcuY29scy5wbiwgICB2YWx1ZTogeyB0ZXh0OiBbXHJcbiAgICAgIEFycmF5LmlzQXJyYXkocG4pID8gYFBOOiAke3BuLmZpbHRlcihCb29sZWFuKS5qb2luKFwiLCBcIil9YCA6IChwbiA/IGBQTjogJHtwbn1gIDogXCJcIiksXHJcbiAgICAgIEFycmF5LmlzQXJyYXkoc24pID8gYFNOOiAke3NuLmZpbHRlcihCb29sZWFuKS5qb2luKFwiLCBcIil9YCA6IChzbiA/IGBTTjogJHtzbn1gIDogXCJcIiksXHJcbiAgICAgIGRvbSA/IGBET006ICR7ZG9tfWAgOiBcIlwiLFxyXG4gICAgXS5maWx0ZXIoQm9vbGVhbikuam9pbihcIiAgXCIpIH19KTtcclxuICAgIGlmIChjZmcuY29scy50cmFjayAmJiAodHJhY2tpbmdOdW1iZXIgfHwgcG9OdW1iZXIpKSBmaWVsZHMucHVzaCh7XHJcbiAgICAgIGNvbHVtbl9pZDogY2ZnLmNvbHMudHJhY2ssIHZhbHVlOiB7IHRleHQ6IFtcclxuICAgICAgICB0cmFja2luZ051bWJlciA/IGBSTDogJHt0cmFja2luZ051bWJlcn1gIDogXCJcIixcclxuICAgICAgICBwb051bWJlciA/IGBQTzogJHtwb051bWJlcn1gIDogXCJcIixcclxuICAgICAgXS5maWx0ZXIoQm9vbGVhbikuam9pbihcIiAgXCIpIH1cclxuICAgIH0pO1xyXG4gICAgaWYgKGNmZy5jb2xzLndvICYmIHdvcmtPcmRlcikgICAgICAgICAgZmllbGRzLnB1c2goeyBjb2x1bW5faWQ6IGNmZy5jb2xzLndvLCAgdmFsdWU6IHsgdGV4dDogYFdPOiAke3dvcmtPcmRlcn1gIH19KTtcclxuICAgIGlmIChjZmcuY29scy5sc24gJiYgbG9jYWxTTikgICAgICAgICAgIGZpZWxkcy5wdXNoKHsgY29sdW1uX2lkOiBjZmcuY29scy5sc24sIHZhbHVlOiB7IHRleHQ6IGxvY2FsU04gfX0pO1xyXG5cclxuICAgXHJcbiAgICBjb25zdCBjcmVhdGVkID0gYXdhaXQgc2xhY2soXCJzbGFja0xpc3RzLml0ZW1zLmNyZWF0ZVwiLCBKU09OLnN0cmluZ2lmeShjcmVhdGVCb2R5KSk7XHJcbiAgICBpZiAoIWNyZWF0ZWQ/Lm9rKSB7XHJcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IGVycm9yOiBjcmVhdGVkPy5lcnJvciB8fCBcIlNsYWNrIExpc3RzIEFQSSBlcnJvclwiLCByYXc6IGNyZWF0ZWQgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gMikgVXBsb2FkIHBob3RvcyBhbmQgYXR0YWNoIHRvIHRoZSBcImF0dGFjaG1lbnRcIiBjb2x1bW5cclxuICAgIGlmIChjZmcuY29scy5waG90b3MgJiYgQXJyYXkuaXNBcnJheShwaG90b1VybHMpICYmIHBob3RvVXJscy5sZW5ndGgpIHtcclxuICAgICAgY29uc3QgZmlsZUlkcyA9IFtdO1xyXG4gICAgICBmb3IgKGNvbnN0IHVybCBvZiBwaG90b1VybHMpIHtcclxuICAgICAgICAvLyBhKSBnZXQgZXh0ZXJuYWwgdXBsb2FkIFVSTFxyXG4gICAgICAgIGNvbnN0IGluaXQgPSBhd2FpdCBmZXRjaChcImh0dHBzOi8vc2xhY2suY29tL2FwaS9maWxlcy5nZXRVcGxvYWRVUkxFeHRlcm5hbFwiLCB7XHJcbiAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgaGVhZGVyczogeyBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7dG9rZW59YCwgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIiB9LFxyXG4gICAgICAgICAgYm9keTogbmV3IFVSTFNlYXJjaFBhcmFtcyh7IGZpbGVuYW1lOiB1cmwuc3BsaXQoXCIvXCIpLnBvcCgpIHx8IFwiaW1hZ2UuanBnXCIgfSksXHJcbiAgICAgICAgfSkudGhlbihyID0+IHIuanNvbigpKTtcclxuXHJcbiAgICAgICAgaWYgKCFpbml0Py5vayB8fCAhaW5pdD8udXBsb2FkX3VybCkgY29udGludWU7XHJcblxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICBjb25zdCBpbWcgPSBhd2FpdCBmZXRjaCh1cmwpO1xyXG4gICAgICAgICAgY29uc3QgYnVmID0gYXdhaXQgaW1nLmFycmF5QnVmZmVyKCk7XHJcbiAgICAgICAgICBhd2FpdCBmZXRjaChpbml0LnVwbG9hZF91cmwsIHsgbWV0aG9kOiBcIlBVVFwiLCBib2R5OiBCdWZmZXIuZnJvbShidWYpIH0pO1xyXG4gICAgICAgIH0gY2F0Y2ggeyAvKiBpZ25vcmUgaW5kaXZpZHVhbCBpbWFnZSBmYWlsdXJlcyAqLyB9XHJcblxyXG4gICAgICAgIGNvbnN0IGNvbXBsZXRlID0gYXdhaXQgc2xhY2soXCJmaWxlcy5jb21wbGV0ZVVwbG9hZEV4dGVybmFsXCIsXHJcbiAgICAgICAgICBKU09OLnN0cmluZ2lmeSh7IGZpbGVzOiBbeyBpZDogaW5pdC5maWxlX2lkLCB0aXRsZTogXCJwaG90b1wiIH1dfSkpO1xyXG4gICAgICAgIGlmIChjb21wbGV0ZT8ub2sgJiYgY29tcGxldGU/LmZpbGVzPy5bMF0/LmlkKSBmaWxlSWRzLnB1c2goY29tcGxldGUuZmlsZXNbMF0uaWQpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoZmlsZUlkcy5sZW5ndGgpIHtcclxuICAgICAgICAvLyBQYXRjaCB0aGUgcm93IHdpdGggYXR0YWNobWVudCBmaWVsZFxyXG4gICAgICAgIGF3YWl0IHNsYWNrKFwic2xhY2tMaXN0cy5pdGVtcy51cGRhdGVcIiwgSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgbGlzdF9pZDogY2ZnLmlkLFxyXG4gICAgICAgICAgaXRlbV9pZDogY3JlYXRlZC5pdGVtLmlkLFxyXG4gICAgICAgICAgZmllbGRzOiBbeyBjb2x1bW5faWQ6IGNmZy5jb2xzLnBob3RvcywgdmFsdWU6IHsgYXR0YWNobWVudDogeyBmaWxlX2lkczogZmlsZUlkcyB9fX1dLFxyXG4gICAgICAgIH0pKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IG9rOiB0cnVlLCBtb2RlOiBcImxpc3RcIiwgbGlzdF9pZDogY2ZnLmlkLCBpdGVtX2lkOiBjcmVhdGVkLml0ZW0uaWQgfSk7XHJcbiAgfVxyXG5cclxuICAvLyAtLS0gUEFUSCBCOiBGYWxsYmFjayB0byBhIGNoYW5uZWwgcG9zdCAtLS1cclxuICBjb25zdCBjaGFubmVsID0gQ0hBTk5FTFNbbGlzdEtleV07XHJcbiAgaWYgKCFjaGFubmVsKSByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBlcnJvcjogXCJVbmtub3duIGxpc3RLZXkgKG5vIGxpc3Qgb3IgY2hhbm5lbCBjb25maWd1cmVkKVwiIH0pO1xyXG5cclxuICAvLyBUcnkgdG8gam9pbiBwdWJsaWMgY2hhbm5lbHMgc28gY2hhdC5wb3N0TWVzc2FnZSB3b27igJl0IGZhaWwgd2l0aCBjaGFubmVsX25vdF9mb3VuZFxyXG4gIGF3YWl0IGZldGNoKFwiaHR0cHM6Ly9zbGFjay5jb20vYXBpL2NvbnZlcnNhdGlvbnMuam9pblwiLCB7XHJcbiAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgaGVhZGVyczogeyBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7dG9rZW59YCwgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIiB9LFxyXG4gICAgYm9keTogbmV3IFVSTFNlYXJjaFBhcmFtcyh7IGNoYW5uZWwgfSksXHJcbiAgfSk7XHJcblxyXG4gLy8gQnVpbGQgc2FmZSBoZWxwZXJzXHJcbmNvbnN0IHNhZmUgPSB2ID0+ICh2ID8/IFwiXCIpLnRvU3RyaW5nKCkudHJpbSgpO1xyXG5jb25zdCBqb2luQXJyID0gYSA9PiBBcnJheS5pc0FycmF5KGEpID8gYS5maWx0ZXIoQm9vbGVhbikubWFwKHNhZmUpLmpvaW4oXCIsIFwiKSA6IHNhZmUoYSk7XHJcblxyXG4vLyBCdWlsZCBhIG5vbi1lbXB0eSB0aXRsZVxyXG5jb25zdCBzYWZlSWQgPSBzYWZlKGxpbmtVcmw/LnNwbGl0KFwiL1wiKS5wb3AoKSkgfHwgc2FmZShsb2NhbFNOKSB8fCBcIlwiO1xyXG5jb25zdCBzYWZlVGl0bGUgPVxyXG4gIHNhZmUodGl0bGUpIHx8XHJcbiAgICAgICAgKHNhZmUocmVxLmJvZHk/LnRpdGxlKSkgfHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBiZWx0ICYgc3VzcGVuZGVyc1xyXG4gICAgICAgIChzYWZlKGl0ZW1zPy5uYW1lKSkgfHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgeW91IGV2ZXIgcGFzcyBpdGVtcy5uYW1lIGxhdGVyXHJcbiAgICAgICAgKHNhZmVJZCA/IGBJdGVtICR7c2FmZUlkfWAgOiBcIk5ldyBJdGVtXCIpO1xyXG5cclxuICAgIC8vIFJlYnVpbGQgdGhlIG1lc3NhZ2UgdGV4dFxyXG4gICAgY29uc3QgbGluZXMgPSBbXTtcclxuICAgIGxpbmVzLnB1c2goYCoke3NhZmVUaXRsZX0qYCk7XHJcblxyXG4gICAgY29uc3QgcG5TdHIgPSBqb2luQXJyKHBuKTtcclxuICAgIGNvbnN0IHNuU3RyID0gam9pbkFycihzbik7XHJcbiAgICBpZiAocG5TdHIpIGxpbmVzLnB1c2goYFBOOiAke3BuU3RyfWApO1xyXG4gICAgaWYgKHNuU3RyKSBsaW5lcy5wdXNoKGBTTjogJHtzblN0cn1gKTtcclxuICAgIGlmIChzYWZlKHdvcmtPcmRlcikpIGxpbmVzLnB1c2goYFdPOiAke3NhZmUod29ya09yZGVyKX1gKTtcclxuICAgIGlmIChzYWZlKHBvTnVtYmVyKSkgbGluZXMucHVzaChgUE86ICR7c2FmZShwb051bWJlcil9YCk7XHJcbiAgICBpZiAoc2FmZSh0cmFja2luZ051bWJlcikpIGxpbmVzLnB1c2goYFJMOiAke3NhZmUodHJhY2tpbmdOdW1iZXIpfWApO1xyXG4gICAgaWYgKHNhZmUoZG9tKSkgbGluZXMucHVzaChgRE9NOiAke3NhZmUoZG9tKX1gKTtcclxuICAgIGlmIChzYWZlKGxvY2FsU04pKSBsaW5lcy5wdXNoKGBMb2NhbCBTTjogJHtzYWZlKGxvY2FsU04pfWApO1xyXG4gICAgaWYgKHNhZmUoZGF0ZSkpIGxpbmVzLnB1c2goYERhdGU6ICR7c2FmZShkYXRlKX1gKTtcclxuXHJcbiAgICAvLyBJZiB0aGV5IHNlbnQgYSBkZXNjcmlwdGlvbiwgcHJlZmVyIHRoYXQgb3ZlciBib2R5VGV4dFxyXG4gICAgY29uc3QgZGVzYyA9IHNhZmUoZGVzY3JpcHRpb24pO1xyXG4gICAgaWYgKGRlc2MpIGxpbmVzLnB1c2goZGVzYyk7XHJcbiAgICBlbHNlIGlmIChsaXN0S2V5ID09PSBcInRhc2tzXCIgJiYgc2FmZShib2R5VGV4dCkpIGxpbmVzLnB1c2goc2FmZShib2R5VGV4dCkpO1xyXG5cclxuICAgIGlmIChzYWZlKGxpbmtVcmwpKSBsaW5lcy5wdXNoKGA8JHtzYWZlKGxpbmtVcmwpfXxPcGVuIGluIE1hZ21vPmApO1xyXG5cclxuICAgIC8vIE5FVkVSIGFsbG93IGVtcHR5IHRleHRcclxuICAgIGNvbnN0IHRleHQgPSBsaW5lcy5maWx0ZXIoQm9vbGVhbikuam9pbihcIlxcblwiKSB8fCBcIihubyBkZXRhaWxzIHByb3ZpZGVkKVwiO1xyXG4gICAgY29uc3QgcG9zdGVkID0gYXdhaXQgc2xhY2soXCJjaGF0LnBvc3RNZXNzYWdlXCIsXHJcbiAgICAgICAgSlNPTi5zdHJpbmdpZnkoeyBjaGFubmVsLCB0ZXh0IH0pIC8vIDwtLSB1c2UgdGhlIGpvaW5lZCBzdHJpbmcsIG5vdCB0aGUgYXJyYXlcclxuICAgICk7XHJcblxyXG5cclxuICAgIGlmICghcG9zdGVkPy5vaykgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6IHBvc3RlZD8uZXJyb3IgfHwgXCJTbGFjayBBUEkgZXJyb3JcIiwgcmF3OiBwb3N0ZWQgfSk7XHJcblxyXG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgb2s6IHRydWUsIG1vZGU6IFwiY2hhbm5lbFwiLCBjaGFubmVsLCB0czogcG9zdGVkLnRzIH0pO1xyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=