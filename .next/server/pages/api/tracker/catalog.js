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
/******/ 	return __webpack_require__(__webpack_require__.s = "./pages/api/tracker/catalog.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./context/FirebaseAdmin.js":
/*!**********************************!*\
  !*** ./context/FirebaseAdmin.js ***!
  \**********************************/
/*! exports provided: adminDb, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "adminDb", function() { return adminDb; });
/* harmony import */ var firebase_admin_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! firebase-admin/app */ "firebase-admin/app");
/* harmony import */ var firebase_admin_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(firebase_admin_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var firebase_admin_firestore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! firebase-admin/firestore */ "firebase-admin/firestore");
/* harmony import */ var firebase_admin_firestore__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(firebase_admin_firestore__WEBPACK_IMPORTED_MODULE_1__);

 // Import Firebase Functions for config access

let functions;

try {
  functions = __webpack_require__(/*! firebase-functions */ "firebase-functions");
} catch (error) {
  // Not running in Firebase Functions environment
  functions = null;
} // Initialize Firebase Admin if it hasn't been initialized


if (!Object(firebase_admin_app__WEBPACK_IMPORTED_MODULE_0__["getApps"])().length) {
  var _functions$config$adm, _functions$config$ssr, _functions$config$adm2, _functions$config$ssr2;

  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL || process.env.FIREBASE_FUNCTIONS_CLIENT_EMAIL || process.env.FIREBASE_ADMIN_CLIENT_EMAIL || (functions ? ((_functions$config$adm = functions.config().admin) === null || _functions$config$adm === void 0 ? void 0 : _functions$config$adm.client_email) || ((_functions$config$ssr = functions.config().ssr) === null || _functions$config$ssr === void 0 ? void 0 : _functions$config$ssr.firebase_client_email) : undefined);
  const privateKey = process.env.FIREBASE_PRIVATE_KEY || process.env.FIREBASE_FUNCTIONS_PRIVATE_KEY || process.env.FIREBASE_ADMIN_PRIVATE_KEY || (functions ? ((_functions$config$adm2 = functions.config().admin) === null || _functions$config$adm2 === void 0 ? void 0 : _functions$config$adm2.private_key) || ((_functions$config$ssr2 = functions.config().ssr) === null || _functions$config$ssr2 === void 0 ? void 0 : _functions$config$ssr2.firebase_private_key) : undefined);

  try {
    if (clientEmail && privateKey) {
      Object(firebase_admin_app__WEBPACK_IMPORTED_MODULE_0__["initializeApp"])({
        credential: Object(firebase_admin_app__WEBPACK_IMPORTED_MODULE_0__["cert"])({
          projectId: "magmo-ac10c",
          clientEmail: clientEmail,
          privateKey: privateKey.replace(/\\n/g, "\n")
        }),
        databaseURL: "https://magmo-ac10c.firebaseio.com"
      });
    } else {
      // Fall back to Application Default Credentials (e.g. Cloud Functions/Run)
      Object(firebase_admin_app__WEBPACK_IMPORTED_MODULE_0__["initializeApp"])({
        projectId: "magmo-ac10c",
        databaseURL: "https://magmo-ac10c.firebaseio.com"
      });
    }
  } catch (error) {
    console.warn("Firebase Admin initialization failed:", error.message); // Don't throw error during build process
  }
} // Only export Firestore if Firebase Admin is properly initialized


let adminDb = null;

try {
  if (Object(firebase_admin_app__WEBPACK_IMPORTED_MODULE_0__["getApps"])().length > 0) {
    adminDb = Object(firebase_admin_firestore__WEBPACK_IMPORTED_MODULE_1__["getFirestore"])();
  }
} catch (error) {
  console.warn("Firebase Admin not available:", error.message);
}


/* harmony default export */ __webpack_exports__["default"] = (adminDb);

/***/ }),

/***/ "./pages/api/tracker/catalog.js":
/*!**************************************!*\
  !*** ./pages/api/tracker/catalog.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return handler; });
/* harmony import */ var _context_FirebaseAdmin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../context/FirebaseAdmin */ "./context/FirebaseAdmin.js");


const normalizeKey = value => {
  if (value == null) return "";
  return String(value).trim().toLowerCase();
};

const normalizeList = values => {
  const out = [];
  (values || []).forEach(value => {
    if (value == null) return;
    const normalized = String(value).trim();
    if (!normalized) return;
    out.push(normalized);
  });
  return Array.from(new Set(out));
};

const extractModelsFromDoc = (data, docId) => {
  if (!data) return docId ? [docId] : [];
  if (Array.isArray(data.models)) return normalizeList(data.models);
  if (Array.isArray(data.model)) return normalizeList(data.model);
  if (Array.isArray(data.items)) return normalizeList(data.items);
  if (typeof data.model === "string") return normalizeList([data.model]);
  if (typeof data.name === "string") return normalizeList([data.name]);
  if (docId) return normalizeList([docId]);
  return [];
};

const extractOemsFromFields = data => {
  const out = {};
  if (!data) return out;
  const oemsField = data.oems || data.OEMs || data.oem || data.OEM;

  if (Array.isArray(oemsField)) {
    oemsField.forEach(entry => {
      if (entry == null) return;

      if (typeof entry === "string") {
        out[entry] = out[entry] || [];
        return;
      }

      if (typeof entry === "object") {
        const name = entry.name || entry.oem || entry.OEM || entry.label || entry.value;
        if (!name) return;
        const models = extractModelsFromDoc(entry);
        out[name] = normalizeList([...(out[name] || []), ...models]);
      }
    });
    return out;
  }

  if (oemsField && typeof oemsField === "object") {
    Object.entries(oemsField).forEach(([oem, value]) => {
      if (value == null) return;

      if (Array.isArray(value)) {
        out[oem] = normalizeList(value);
        return;
      }

      if (typeof value === "object") {
        const models = extractModelsFromDoc(value);
        out[oem] = normalizeList([...(out[oem] || []), ...models]);
        return;
      }

      out[oem] = normalizeList([...(out[oem] || []), String(value).trim()]);
    });
  }

  return out;
};

async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (!_context_FirebaseAdmin__WEBPACK_IMPORTED_MODULE_0__["adminDb"]) {
    res.status(503).json({
      error: "Firebase Admin not available."
    });
    return;
  }

  try {
    const modalityRefs = await _context_FirebaseAdmin__WEBPACK_IMPORTED_MODULE_0__["adminDb"].collection("Tracker").listDocuments();
    const modalities = modalityRefs.map(ref => ref.id);
    const oemsByModality = {};
    const modelsByModalityOem = {};
    let usesSubcollections = false;

    for (const ref of modalityRefs) {
      const modality = ref.id;
      const docSnap = await ref.get();
      const data = docSnap.exists ? docSnap.data() || {} : {};
      const oems = new Set();
      const modelsByOem = {};
      const fieldOems = extractOemsFromFields(data);
      Object.entries(fieldOems).forEach(([oem, models]) => {
        oems.add(oem);
        modelsByOem[oem] = normalizeList([...(modelsByOem[oem] || []), ...models]);
      });
      const subcollections = await ref.listCollections();
      if (subcollections.length) usesSubcollections = true;

      for (const sub of subcollections) {
        const oem = sub.id;
        oems.add(oem);
        const modelSet = new Set(modelsByOem[oem] || []);
        const subSnap = await sub.get();
        subSnap.forEach(subDoc => {
          const models = extractModelsFromDoc(subDoc.data(), subDoc.id);
          models.forEach(model => modelSet.add(model));
        });
        modelsByOem[oem] = Array.from(modelSet);
      }

      oemsByModality[modality] = Array.from(oems);
      modelsByModalityOem[modality] = modelsByOem;
    }

    res.status(200).json({
      modalities,
      oemsByModality,
      modelsByModalityOem,
      usesSubcollections,
      source: "server"
    });
  } catch (error) {
    console.error("Tracker catalog API failed:", error);
    res.status(500).json({
      error: "Failed to build tracker catalog."
    });
  }
}

/***/ }),

/***/ "firebase-admin/app":
/*!*************************************!*\
  !*** external "firebase-admin/app" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("firebase-admin/app");

/***/ }),

/***/ "firebase-admin/firestore":
/*!*******************************************!*\
  !*** external "firebase-admin/firestore" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("firebase-admin/firestore");

/***/ }),

/***/ "firebase-functions":
/*!*************************************!*\
  !*** external "firebase-functions" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("firebase-functions");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vY29udGV4dC9GaXJlYmFzZUFkbWluLmpzIiwid2VicGFjazovLy8uL3BhZ2VzL2FwaS90cmFja2VyL2NhdGFsb2cuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZmlyZWJhc2UtYWRtaW4vYXBwXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZmlyZWJhc2UtYWRtaW4vZmlyZXN0b3JlXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZmlyZWJhc2UtZnVuY3Rpb25zXCIiXSwibmFtZXMiOlsiZnVuY3Rpb25zIiwicmVxdWlyZSIsImVycm9yIiwiZ2V0QXBwcyIsImxlbmd0aCIsImNsaWVudEVtYWlsIiwicHJvY2VzcyIsImVudiIsIkZJUkVCQVNFX0NMSUVOVF9FTUFJTCIsIkZJUkVCQVNFX0ZVTkNUSU9OU19DTElFTlRfRU1BSUwiLCJGSVJFQkFTRV9BRE1JTl9DTElFTlRfRU1BSUwiLCJjb25maWciLCJhZG1pbiIsImNsaWVudF9lbWFpbCIsInNzciIsImZpcmViYXNlX2NsaWVudF9lbWFpbCIsInVuZGVmaW5lZCIsInByaXZhdGVLZXkiLCJGSVJFQkFTRV9QUklWQVRFX0tFWSIsIkZJUkVCQVNFX0ZVTkNUSU9OU19QUklWQVRFX0tFWSIsIkZJUkVCQVNFX0FETUlOX1BSSVZBVEVfS0VZIiwicHJpdmF0ZV9rZXkiLCJmaXJlYmFzZV9wcml2YXRlX2tleSIsImluaXRpYWxpemVBcHAiLCJjcmVkZW50aWFsIiwiY2VydCIsInByb2plY3RJZCIsInJlcGxhY2UiLCJkYXRhYmFzZVVSTCIsImNvbnNvbGUiLCJ3YXJuIiwibWVzc2FnZSIsImFkbWluRGIiLCJnZXRGaXJlc3RvcmUiLCJub3JtYWxpemVLZXkiLCJ2YWx1ZSIsIlN0cmluZyIsInRyaW0iLCJ0b0xvd2VyQ2FzZSIsIm5vcm1hbGl6ZUxpc3QiLCJ2YWx1ZXMiLCJvdXQiLCJmb3JFYWNoIiwibm9ybWFsaXplZCIsInB1c2giLCJBcnJheSIsImZyb20iLCJTZXQiLCJleHRyYWN0TW9kZWxzRnJvbURvYyIsImRhdGEiLCJkb2NJZCIsImlzQXJyYXkiLCJtb2RlbHMiLCJtb2RlbCIsIml0ZW1zIiwibmFtZSIsImV4dHJhY3RPZW1zRnJvbUZpZWxkcyIsIm9lbXNGaWVsZCIsIm9lbXMiLCJPRU1zIiwib2VtIiwiT0VNIiwiZW50cnkiLCJsYWJlbCIsIk9iamVjdCIsImVudHJpZXMiLCJoYW5kbGVyIiwicmVxIiwicmVzIiwic2V0SGVhZGVyIiwic3RhdHVzIiwianNvbiIsIm1vZGFsaXR5UmVmcyIsImNvbGxlY3Rpb24iLCJsaXN0RG9jdW1lbnRzIiwibW9kYWxpdGllcyIsIm1hcCIsInJlZiIsImlkIiwib2Vtc0J5TW9kYWxpdHkiLCJtb2RlbHNCeU1vZGFsaXR5T2VtIiwidXNlc1N1YmNvbGxlY3Rpb25zIiwibW9kYWxpdHkiLCJkb2NTbmFwIiwiZ2V0IiwiZXhpc3RzIiwibW9kZWxzQnlPZW0iLCJmaWVsZE9lbXMiLCJhZGQiLCJzdWJjb2xsZWN0aW9ucyIsImxpc3RDb2xsZWN0aW9ucyIsInN1YiIsIm1vZGVsU2V0Iiwic3ViU25hcCIsInN1YkRvYyIsInNvdXJjZSJdLCJtYXBwaW5ncyI6Ijs7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLElBQUk7UUFDSjtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFp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Q0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQjtBQUNuQkksZ0JBRG1CO0FBRW5CSSxvQkFGbUI7QUFHbkJDLHlCQUhtQjtBQUluQkMsd0JBSm1CO0FBS25CYyxZQUFNLEVBQUU7QUFMVyxLQUFyQjtBQU9ELEdBakRELENBaURFLE9BQU83RixLQUFQLEVBQWM7QUFDZDJCLFdBQU8sQ0FBQzNCLEtBQVIsQ0FBYyw2QkFBZCxFQUE2Q0EsS0FBN0M7QUFDQWtFLE9BQUcsQ0FBQ0UsTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLENBQXFCO0FBQUVyRSxXQUFLLEVBQUU7QUFBVCxLQUFyQjtBQUNEO0FBQ0YsQzs7Ozs7Ozs7Ozs7QUN2SUQsK0M7Ozs7Ozs7Ozs7O0FDQUEscUQ7Ozs7Ozs7Ozs7O0FDQUEsK0MiLCJmaWxlIjoicGFnZXMvYXBpL3RyYWNrZXIvY2F0YWxvZy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0gcmVxdWlyZSgnLi4vLi4vLi4vc3NyLW1vZHVsZS1jYWNoZS5qcycpO1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHR2YXIgdGhyZXcgPSB0cnVlO1xuIFx0XHR0cnkge1xuIFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuIFx0XHRcdHRocmV3ID0gZmFsc2U7XG4gXHRcdH0gZmluYWxseSB7XG4gXHRcdFx0aWYodGhyZXcpIGRlbGV0ZSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0fVxuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vcGFnZXMvYXBpL3RyYWNrZXIvY2F0YWxvZy5qc1wiKTtcbiIsImltcG9ydCB7IGluaXRpYWxpemVBcHAsIGdldEFwcHMsIGNlcnQgfSBmcm9tIFwiZmlyZWJhc2UtYWRtaW4vYXBwXCI7XG5pbXBvcnQgeyBnZXRGaXJlc3RvcmUgfSBmcm9tIFwiZmlyZWJhc2UtYWRtaW4vZmlyZXN0b3JlXCI7XG5cbi8vIEltcG9ydCBGaXJlYmFzZSBGdW5jdGlvbnMgZm9yIGNvbmZpZyBhY2Nlc3NcbmxldCBmdW5jdGlvbnM7XG50cnkge1xuICBmdW5jdGlvbnMgPSByZXF1aXJlKFwiZmlyZWJhc2UtZnVuY3Rpb25zXCIpO1xufSBjYXRjaCAoZXJyb3IpIHtcbiAgLy8gTm90IHJ1bm5pbmcgaW4gRmlyZWJhc2UgRnVuY3Rpb25zIGVudmlyb25tZW50XG4gIGZ1bmN0aW9ucyA9IG51bGw7XG59XG5cbi8vIEluaXRpYWxpemUgRmlyZWJhc2UgQWRtaW4gaWYgaXQgaGFzbid0IGJlZW4gaW5pdGlhbGl6ZWRcbmlmICghZ2V0QXBwcygpLmxlbmd0aCkge1xuICBjb25zdCBjbGllbnRFbWFpbCA9XG4gICAgcHJvY2Vzcy5lbnYuRklSRUJBU0VfQ0xJRU5UX0VNQUlMIHx8XG4gICAgcHJvY2Vzcy5lbnYuRklSRUJBU0VfRlVOQ1RJT05TX0NMSUVOVF9FTUFJTCB8fFxuICAgIHByb2Nlc3MuZW52LkZJUkVCQVNFX0FETUlOX0NMSUVOVF9FTUFJTCB8fFxuICAgIChmdW5jdGlvbnNcbiAgICAgID8gZnVuY3Rpb25zLmNvbmZpZygpLmFkbWluPy5jbGllbnRfZW1haWwgfHxcbiAgICAgICAgZnVuY3Rpb25zLmNvbmZpZygpLnNzcj8uZmlyZWJhc2VfY2xpZW50X2VtYWlsXG4gICAgICA6IHVuZGVmaW5lZCk7XG5cbiAgY29uc3QgcHJpdmF0ZUtleSA9XG4gICAgcHJvY2Vzcy5lbnYuRklSRUJBU0VfUFJJVkFURV9LRVkgfHxcbiAgICBwcm9jZXNzLmVudi5GSVJFQkFTRV9GVU5DVElPTlNfUFJJVkFURV9LRVkgfHxcbiAgICBwcm9jZXNzLmVudi5GSVJFQkFTRV9BRE1JTl9QUklWQVRFX0tFWSB8fFxuICAgIChmdW5jdGlvbnNcbiAgICAgID8gZnVuY3Rpb25zLmNvbmZpZygpLmFkbWluPy5wcml2YXRlX2tleSB8fFxuICAgICAgICBmdW5jdGlvbnMuY29uZmlnKCkuc3NyPy5maXJlYmFzZV9wcml2YXRlX2tleVxuICAgICAgOiB1bmRlZmluZWQpO1xuXG4gIHRyeSB7XG4gICAgaWYgKGNsaWVudEVtYWlsICYmIHByaXZhdGVLZXkpIHtcbiAgICAgIGluaXRpYWxpemVBcHAoe1xuICAgICAgICBjcmVkZW50aWFsOiBjZXJ0KHtcbiAgICAgICAgICBwcm9qZWN0SWQ6IFwibWFnbW8tYWMxMGNcIixcbiAgICAgICAgICBjbGllbnRFbWFpbDogY2xpZW50RW1haWwsXG4gICAgICAgICAgcHJpdmF0ZUtleTogcHJpdmF0ZUtleS5yZXBsYWNlKC9cXFxcbi9nLCBcIlxcblwiKSxcbiAgICAgICAgfSksXG4gICAgICAgIGRhdGFiYXNlVVJMOiBcImh0dHBzOi8vbWFnbW8tYWMxMGMuZmlyZWJhc2Vpby5jb21cIixcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBGYWxsIGJhY2sgdG8gQXBwbGljYXRpb24gRGVmYXVsdCBDcmVkZW50aWFscyAoZS5nLiBDbG91ZCBGdW5jdGlvbnMvUnVuKVxuICAgICAgaW5pdGlhbGl6ZUFwcCh7XG4gICAgICAgIHByb2plY3RJZDogXCJtYWdtby1hYzEwY1wiLFxuICAgICAgICBkYXRhYmFzZVVSTDogXCJodHRwczovL21hZ21vLWFjMTBjLmZpcmViYXNlaW8uY29tXCIsXG4gICAgICB9KTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS53YXJuKFwiRmlyZWJhc2UgQWRtaW4gaW5pdGlhbGl6YXRpb24gZmFpbGVkOlwiLCBlcnJvci5tZXNzYWdlKTtcbiAgICAvLyBEb24ndCB0aHJvdyBlcnJvciBkdXJpbmcgYnVpbGQgcHJvY2Vzc1xuICB9XG59XG5cbi8vIE9ubHkgZXhwb3J0IEZpcmVzdG9yZSBpZiBGaXJlYmFzZSBBZG1pbiBpcyBwcm9wZXJseSBpbml0aWFsaXplZFxubGV0IGFkbWluRGIgPSBudWxsO1xudHJ5IHtcbiAgaWYgKGdldEFwcHMoKS5sZW5ndGggPiAwKSB7XG4gICAgYWRtaW5EYiA9IGdldEZpcmVzdG9yZSgpO1xuICB9XG59IGNhdGNoIChlcnJvcikge1xuICBjb25zb2xlLndhcm4oXCJGaXJlYmFzZSBBZG1pbiBub3QgYXZhaWxhYmxlOlwiLCBlcnJvci5tZXNzYWdlKTtcbn1cblxuZXhwb3J0IHsgYWRtaW5EYiB9O1xuZXhwb3J0IGRlZmF1bHQgYWRtaW5EYjtcbiIsImltcG9ydCB7IGFkbWluRGIgfSBmcm9tIFwiLi4vLi4vLi4vY29udGV4dC9GaXJlYmFzZUFkbWluXCI7XG5cbmNvbnN0IG5vcm1hbGl6ZUtleSA9ICh2YWx1ZSkgPT4ge1xuICBpZiAodmFsdWUgPT0gbnVsbCkgcmV0dXJuIFwiXCI7XG4gIHJldHVybiBTdHJpbmcodmFsdWUpLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xufTtcblxuY29uc3Qgbm9ybWFsaXplTGlzdCA9ICh2YWx1ZXMpID0+IHtcbiAgY29uc3Qgb3V0ID0gW107XG4gICh2YWx1ZXMgfHwgW10pLmZvckVhY2goKHZhbHVlKSA9PiB7XG4gICAgaWYgKHZhbHVlID09IG51bGwpIHJldHVybjtcbiAgICBjb25zdCBub3JtYWxpemVkID0gU3RyaW5nKHZhbHVlKS50cmltKCk7XG4gICAgaWYgKCFub3JtYWxpemVkKSByZXR1cm47XG4gICAgb3V0LnB1c2gobm9ybWFsaXplZCk7XG4gIH0pO1xuICByZXR1cm4gQXJyYXkuZnJvbShuZXcgU2V0KG91dCkpO1xufTtcblxuY29uc3QgZXh0cmFjdE1vZGVsc0Zyb21Eb2MgPSAoZGF0YSwgZG9jSWQpID0+IHtcbiAgaWYgKCFkYXRhKSByZXR1cm4gZG9jSWQgPyBbZG9jSWRdIDogW107XG4gIGlmIChBcnJheS5pc0FycmF5KGRhdGEubW9kZWxzKSkgcmV0dXJuIG5vcm1hbGl6ZUxpc3QoZGF0YS5tb2RlbHMpO1xuICBpZiAoQXJyYXkuaXNBcnJheShkYXRhLm1vZGVsKSkgcmV0dXJuIG5vcm1hbGl6ZUxpc3QoZGF0YS5tb2RlbCk7XG4gIGlmIChBcnJheS5pc0FycmF5KGRhdGEuaXRlbXMpKSByZXR1cm4gbm9ybWFsaXplTGlzdChkYXRhLml0ZW1zKTtcbiAgaWYgKHR5cGVvZiBkYXRhLm1vZGVsID09PSBcInN0cmluZ1wiKSByZXR1cm4gbm9ybWFsaXplTGlzdChbZGF0YS5tb2RlbF0pO1xuICBpZiAodHlwZW9mIGRhdGEubmFtZSA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIG5vcm1hbGl6ZUxpc3QoW2RhdGEubmFtZV0pO1xuICBpZiAoZG9jSWQpIHJldHVybiBub3JtYWxpemVMaXN0KFtkb2NJZF0pO1xuICByZXR1cm4gW107XG59O1xuXG5jb25zdCBleHRyYWN0T2Vtc0Zyb21GaWVsZHMgPSAoZGF0YSkgPT4ge1xuICBjb25zdCBvdXQgPSB7fTtcbiAgaWYgKCFkYXRhKSByZXR1cm4gb3V0O1xuICBjb25zdCBvZW1zRmllbGQgPSBkYXRhLm9lbXMgfHwgZGF0YS5PRU1zIHx8IGRhdGEub2VtIHx8IGRhdGEuT0VNO1xuXG4gIGlmIChBcnJheS5pc0FycmF5KG9lbXNGaWVsZCkpIHtcbiAgICBvZW1zRmllbGQuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICAgIGlmIChlbnRyeSA9PSBudWxsKSByZXR1cm47XG4gICAgICBpZiAodHlwZW9mIGVudHJ5ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIG91dFtlbnRyeV0gPSBvdXRbZW50cnldIHx8IFtdO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGVudHJ5ID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIGNvbnN0IG5hbWUgPVxuICAgICAgICAgIGVudHJ5Lm5hbWUgfHxcbiAgICAgICAgICBlbnRyeS5vZW0gfHxcbiAgICAgICAgICBlbnRyeS5PRU0gfHxcbiAgICAgICAgICBlbnRyeS5sYWJlbCB8fFxuICAgICAgICAgIGVudHJ5LnZhbHVlO1xuICAgICAgICBpZiAoIW5hbWUpIHJldHVybjtcbiAgICAgICAgY29uc3QgbW9kZWxzID0gZXh0cmFjdE1vZGVsc0Zyb21Eb2MoZW50cnkpO1xuICAgICAgICBvdXRbbmFtZV0gPSBub3JtYWxpemVMaXN0KFsuLi4ob3V0W25hbWVdIHx8IFtdKSwgLi4ubW9kZWxzXSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuXG4gIGlmIChvZW1zRmllbGQgJiYgdHlwZW9mIG9lbXNGaWVsZCA9PT0gXCJvYmplY3RcIikge1xuICAgIE9iamVjdC5lbnRyaWVzKG9lbXNGaWVsZCkuZm9yRWFjaCgoW29lbSwgdmFsdWVdKSA9PiB7XG4gICAgICBpZiAodmFsdWUgPT0gbnVsbCkgcmV0dXJuO1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgIG91dFtvZW1dID0gbm9ybWFsaXplTGlzdCh2YWx1ZSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgY29uc3QgbW9kZWxzID0gZXh0cmFjdE1vZGVsc0Zyb21Eb2ModmFsdWUpO1xuICAgICAgICBvdXRbb2VtXSA9IG5vcm1hbGl6ZUxpc3QoWy4uLihvdXRbb2VtXSB8fCBbXSksIC4uLm1vZGVsc10pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBvdXRbb2VtXSA9IG5vcm1hbGl6ZUxpc3QoWy4uLihvdXRbb2VtXSB8fCBbXSksIFN0cmluZyh2YWx1ZSkudHJpbSgpXSk7XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gb3V0O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gaGFuZGxlcihyZXEsIHJlcykge1xuICByZXMuc2V0SGVhZGVyKFwiQ2FjaGUtQ29udHJvbFwiLCBcIm5vLXN0b3JlXCIpO1xuICBpZiAoIWFkbWluRGIpIHtcbiAgICByZXMuc3RhdHVzKDUwMykuanNvbih7IGVycm9yOiBcIkZpcmViYXNlIEFkbWluIG5vdCBhdmFpbGFibGUuXCIgfSk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBtb2RhbGl0eVJlZnMgPSBhd2FpdCBhZG1pbkRiLmNvbGxlY3Rpb24oXCJUcmFja2VyXCIpLmxpc3REb2N1bWVudHMoKTtcbiAgICBjb25zdCBtb2RhbGl0aWVzID0gbW9kYWxpdHlSZWZzLm1hcCgocmVmKSA9PiByZWYuaWQpO1xuICAgIGNvbnN0IG9lbXNCeU1vZGFsaXR5ID0ge307XG4gICAgY29uc3QgbW9kZWxzQnlNb2RhbGl0eU9lbSA9IHt9O1xuICAgIGxldCB1c2VzU3ViY29sbGVjdGlvbnMgPSBmYWxzZTtcblxuICAgIGZvciAoY29uc3QgcmVmIG9mIG1vZGFsaXR5UmVmcykge1xuICAgICAgY29uc3QgbW9kYWxpdHkgPSByZWYuaWQ7XG4gICAgICBjb25zdCBkb2NTbmFwID0gYXdhaXQgcmVmLmdldCgpO1xuICAgICAgY29uc3QgZGF0YSA9IGRvY1NuYXAuZXhpc3RzID8gZG9jU25hcC5kYXRhKCkgfHwge30gOiB7fTtcblxuICAgICAgY29uc3Qgb2VtcyA9IG5ldyBTZXQoKTtcbiAgICAgIGNvbnN0IG1vZGVsc0J5T2VtID0ge307XG5cbiAgICAgIGNvbnN0IGZpZWxkT2VtcyA9IGV4dHJhY3RPZW1zRnJvbUZpZWxkcyhkYXRhKTtcbiAgICAgIE9iamVjdC5lbnRyaWVzKGZpZWxkT2VtcykuZm9yRWFjaCgoW29lbSwgbW9kZWxzXSkgPT4ge1xuICAgICAgICBvZW1zLmFkZChvZW0pO1xuICAgICAgICBtb2RlbHNCeU9lbVtvZW1dID0gbm9ybWFsaXplTGlzdChbXG4gICAgICAgICAgLi4uKG1vZGVsc0J5T2VtW29lbV0gfHwgW10pLFxuICAgICAgICAgIC4uLm1vZGVscyxcbiAgICAgICAgXSk7XG4gICAgICB9KTtcblxuICAgICAgY29uc3Qgc3ViY29sbGVjdGlvbnMgPSBhd2FpdCByZWYubGlzdENvbGxlY3Rpb25zKCk7XG4gICAgICBpZiAoc3ViY29sbGVjdGlvbnMubGVuZ3RoKSB1c2VzU3ViY29sbGVjdGlvbnMgPSB0cnVlO1xuICAgICAgZm9yIChjb25zdCBzdWIgb2Ygc3ViY29sbGVjdGlvbnMpIHtcbiAgICAgICAgY29uc3Qgb2VtID0gc3ViLmlkO1xuICAgICAgICBvZW1zLmFkZChvZW0pO1xuICAgICAgICBjb25zdCBtb2RlbFNldCA9IG5ldyBTZXQobW9kZWxzQnlPZW1bb2VtXSB8fCBbXSk7XG4gICAgICAgIGNvbnN0IHN1YlNuYXAgPSBhd2FpdCBzdWIuZ2V0KCk7XG4gICAgICAgIHN1YlNuYXAuZm9yRWFjaCgoc3ViRG9jKSA9PiB7XG4gICAgICAgICAgY29uc3QgbW9kZWxzID0gZXh0cmFjdE1vZGVsc0Zyb21Eb2Moc3ViRG9jLmRhdGEoKSwgc3ViRG9jLmlkKTtcbiAgICAgICAgICBtb2RlbHMuZm9yRWFjaCgobW9kZWwpID0+IG1vZGVsU2V0LmFkZChtb2RlbCkpO1xuICAgICAgICB9KTtcbiAgICAgICAgbW9kZWxzQnlPZW1bb2VtXSA9IEFycmF5LmZyb20obW9kZWxTZXQpO1xuICAgICAgfVxuXG4gICAgICBvZW1zQnlNb2RhbGl0eVttb2RhbGl0eV0gPSBBcnJheS5mcm9tKG9lbXMpO1xuICAgICAgbW9kZWxzQnlNb2RhbGl0eU9lbVttb2RhbGl0eV0gPSBtb2RlbHNCeU9lbTtcbiAgICB9XG5cbiAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7XG4gICAgICBtb2RhbGl0aWVzLFxuICAgICAgb2Vtc0J5TW9kYWxpdHksXG4gICAgICBtb2RlbHNCeU1vZGFsaXR5T2VtLFxuICAgICAgdXNlc1N1YmNvbGxlY3Rpb25zLFxuICAgICAgc291cmNlOiBcInNlcnZlclwiLFxuICAgIH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJUcmFja2VyIGNhdGFsb2cgQVBJIGZhaWxlZDpcIiwgZXJyb3IpO1xuICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgZXJyb3I6IFwiRmFpbGVkIHRvIGJ1aWxkIHRyYWNrZXIgY2F0YWxvZy5cIiB9KTtcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZmlyZWJhc2UtYWRtaW4vYXBwXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZpcmViYXNlLWFkbWluL2ZpcmVzdG9yZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmaXJlYmFzZS1mdW5jdGlvbnNcIik7Il0sInNvdXJjZVJvb3QiOiIifQ==