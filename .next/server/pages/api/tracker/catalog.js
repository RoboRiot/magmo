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
  const hasExplicitAdminCreds = Boolean(clientEmail && privateKey);
  const isGoogleRuntime = Boolean(process.env.K_SERVICE || process.env.FUNCTION_TARGET || process.env.GAE_ENV || process.env.GOOGLE_CLOUD_PROJECT);
  const canUseAdc = isGoogleRuntime || Boolean(process.env.GOOGLE_APPLICATION_CREDENTIALS);

  try {
    if (hasExplicitAdminCreds) {
      Object(firebase_admin_app__WEBPACK_IMPORTED_MODULE_0__["initializeApp"])({
        credential: Object(firebase_admin_app__WEBPACK_IMPORTED_MODULE_0__["cert"])({
          projectId: "magmo-ac10c",
          clientEmail: clientEmail,
          privateKey: privateKey.replace(/\\n/g, "\n")
        }),
        databaseURL: "https://magmo-ac10c.firebaseio.com"
      });
    } else if (canUseAdc) {
      // Fall back to Application Default Credentials (e.g. Cloud Functions/Run)
      Object(firebase_admin_app__WEBPACK_IMPORTED_MODULE_0__["initializeApp"])({
        projectId: "magmo-ac10c",
        databaseURL: "https://magmo-ac10c.firebaseio.com"
      });
    } else {
      console.warn("Firebase Admin not initialized: missing service account credentials in local environment.");
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

const extractModelsFromDoc = (data, docId, options = {}) => {
  const {
    allowDocIdFallback = true
  } = options;
  if (!data) return allowDocIdFallback && docId ? [docId] : [];
  if (Array.isArray(data.models)) return normalizeList(data.models);
  if (Array.isArray(data.model)) return normalizeList(data.model);
  if (Array.isArray(data.items)) return normalizeList(data.items);
  if (typeof data.model === "string") return normalizeList([data.model]);
  if (typeof data.name === "string") return normalizeList([data.name]);
  if (allowDocIdFallback && docId) return normalizeList([docId]);
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

const mergeModels = (modelsByOem, oem, incoming) => {
  const current = modelsByOem[oem] || [];
  modelsByOem[oem] = normalizeList([...(current || []), ...(incoming || [])]);
};

const mergeModalityData = (targetOemsByModality, targetModelsByModalityOem, modality, modelsByOem) => {
  if (!modality) return;
  const oems = Object.keys(modelsByOem || {});

  if (!targetModelsByModalityOem[modality]) {
    targetModelsByModalityOem[modality] = {};
  }

  if (!targetOemsByModality[modality]) {
    targetOemsByModality[modality] = [];
  }

  const nextOems = new Set(targetOemsByModality[modality] || []);
  oems.forEach(oem => {
    nextOems.add(oem);
    mergeModels(targetModelsByModalityOem[modality], oem, modelsByOem[oem] || []);
  });
  targetOemsByModality[modality] = Array.from(nextOems);
};

const readModelsFromOemSubcollection = async collectionRef => {
  const modelSet = new Set();
  const snap = await collectionRef.get();
  snap.forEach(doc => {
    const models = extractModelsFromDoc(doc.data(), doc.id);
    models.forEach(model => modelSet.add(model));
  });
  return Array.from(modelSet);
};

const readModalityFromDocumentRef = async docRef => {
  const docSnap = await docRef.get();
  const data = docSnap.exists ? docSnap.data() || {} : {};
  const modelsByOem = {};
  const fieldOems = extractOemsFromFields(data);
  Object.entries(fieldOems).forEach(([oem, models]) => {
    mergeModels(modelsByOem, oem, models || []);
  });
  const subcollections = await docRef.listCollections();

  for (const sub of subcollections) {
    const oem = sub.id;
    const models = await readModelsFromOemSubcollection(sub);
    mergeModels(modelsByOem, oem, models);
  }

  return {
    modelsByOem,
    subcollections
  };
};

const readModalityFromCollectionRef = async collectionRef => {
  const modelsByOem = {};
  const snap = await collectionRef.get();

  for (const oemDoc of snap.docs) {
    const oem = oemDoc.id;
    const models = extractModelsFromDoc(oemDoc.data(), oemDoc.id, {
      allowDocIdFallback: false
    });
    mergeModels(modelsByOem, oem, models);
    const nested = await oemDoc.ref.listCollections();

    for (const nestedCol of nested) {
      const nestedModels = await readModelsFromOemSubcollection(nestedCol);
      mergeModels(modelsByOem, oem, nestedModels);
    }
  }

  return modelsByOem;
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
    const modalitySet = new Set();
    const oemsByModality = {};
    const modelsByModalityOem = {};
    let usesSubcollections = false;

    for (const ref of modalityRefs) {
      const modality = ref.id;
      const {
        modelsByOem,
        subcollections
      } = await readModalityFromDocumentRef(ref);
      if (subcollections.length) usesSubcollections = true;
      modalitySet.add(modality);
      mergeModalityData(oemsByModality, modelsByModalityOem, modality, modelsByOem); // Some datasets use a "container" document under Tracker, where each
      // modality is stored as a subcollection of that doc.

      const hasDirectModels = Object.keys(modelsByOem).length > 0;

      if (!hasDirectModels && subcollections.length) {
        for (const modalityCollection of subcollections) {
          const nestedModality = modalityCollection.id;
          const nestedModelsByOem = await readModalityFromCollectionRef(modalityCollection);
          modalitySet.add(nestedModality);
          mergeModalityData(oemsByModality, modelsByModalityOem, nestedModality, nestedModelsByOem);
        }
      }
    }

    const modalities = Array.from(modalitySet);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vY29udGV4dC9GaXJlYmFzZUFkbWluLmpzIiwid2VicGFjazovLy8uL3BhZ2VzL2FwaS90cmFja2VyL2NhdGFsb2cuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZmlyZWJhc2UtYWRtaW4vYXBwXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZmlyZWJhc2UtYWRtaW4vZmlyZXN0b3JlXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZmlyZWJhc2UtZnVuY3Rpb25zXCIiXSwibmFtZXMiOlsiZnVuY3Rpb25zIiwicmVxdWlyZSIsImVycm9yIiwiZ2V0QXBwcyIsImxlbmd0aCIsImNsaWVudEVtYWlsIiwicHJvY2VzcyIsImVudiIsIkZJUkVCQVNFX0NMSUVOVF9FTUFJTCIsIkZJUkVCQVNFX0ZVTkNUSU9OU19DTElFTlRfRU1BSUwiLCJGSVJFQkFTRV9BRE1JTl9DTElFTlRfRU1BSUwiLCJjb25maWciLCJhZG1pbiIsImNsaWVudF9lbWFpbCIsInNzciIsImZpcmViYXNlX2NsaWVudF9lbWFpbCIsInVuZGVmaW5lZCIsInByaXZhdGVLZXkiLCJGSVJFQkFTRV9QUklWQVRFX0tFWSIsIkZJUkVCQVNFX0ZVTkNUSU9OU19QUklWQVRFX0tFWSIsIkZJUkVCQVNFX0FETUlOX1BSSVZBVEVfS0VZIiwicHJpdmF0ZV9rZXkiLCJmaXJlYmFzZV9wcml2YXRlX2tleSIsImhhc0V4cGxpY2l0QWRtaW5DcmVkcyIsIkJvb2xlYW4iLCJpc0dvb2dsZVJ1bnRpbWUiLCJLX1NFUlZJQ0UiLCJGVU5DVElPTl9UQVJHRVQiLCJHQUVfRU5WIiwiR09PR0xFX0NMT1VEX1BST0pFQ1QiLCJjYW5Vc2VBZGMiLCJHT09HTEVfQVBQTElDQVRJT05fQ1JFREVOVElBTFMiLCJpbml0aWFsaXplQXBwIiwiY3JlZGVudGlhbCIsImNlcnQiLCJwcm9qZWN0SWQiLCJyZXBsYWNlIiwiZGF0YWJhc2VVUkwiLCJjb25zb2xlIiwid2FybiIsIm1lc3NhZ2UiLCJhZG1pbkRiIiwiZ2V0RmlyZXN0b3JlIiwibm9ybWFsaXplTGlzdCIsInZhbHVlcyIsIm91dCIsImZvckVhY2giLCJ2YWx1ZSIsIm5vcm1hbGl6ZWQiLCJTdHJpbmciLCJ0cmltIiwicHVzaCIsIkFycmF5IiwiZnJvbSIsIlNldCIsImV4dHJhY3RNb2RlbHNGcm9tRG9jIiwiZGF0YSIsImRvY0lkIiwib3B0aW9ucyIsImFsbG93RG9jSWRGYWxsYmFjayIsImlzQXJyYXkiLCJtb2RlbHMiLCJtb2RlbCIsIml0ZW1zIiwibmFtZSIsImV4dHJhY3RPZW1zRnJvbUZpZWxkcyIsIm9lbXNGaWVsZCIsIm9lbXMiLCJPRU1zIiwib2VtIiwiT0VNIiwiZW50cnkiLCJsYWJlbCIsIk9iamVjdCIsImVudHJpZXMiLCJtZXJnZU1vZGVscyIsIm1vZGVsc0J5T2VtIiwiaW5jb21pbmciLCJjdXJyZW50IiwibWVyZ2VNb2RhbGl0eURhdGEiLCJ0YXJnZXRPZW1zQnlNb2RhbGl0eSIsInRhcmdldE1vZGVsc0J5TW9kYWxpdHlPZW0iLCJtb2RhbGl0eSIsImtleXMiLCJuZXh0T2VtcyIsImFkZCIsInJlYWRNb2RlbHNGcm9tT2VtU3ViY29sbGVjdGlvbiIsImNvbGxlY3Rpb25SZWYiLCJtb2RlbFNldCIsInNuYXAiLCJnZXQiLCJkb2MiLCJpZCIsInJlYWRNb2RhbGl0eUZyb21Eb2N1bWVudFJlZiIsImRvY1JlZiIsImRvY1NuYXAiLCJleGlzdHMiLCJmaWVsZE9lbXMiLCJzdWJjb2xsZWN0aW9ucyIsImxpc3RDb2xsZWN0aW9ucyIsInN1YiIsInJlYWRNb2RhbGl0eUZyb21Db2xsZWN0aW9uUmVmIiwib2VtRG9jIiwiZG9jcyIsIm5lc3RlZCIsInJlZiIsIm5lc3RlZENvbCIsIm5lc3RlZE1vZGVscyIsImhhbmRsZXIiLCJyZXEiLCJyZXMiLCJzZXRIZWFkZXIiLCJzdGF0dXMiLCJqc29uIiwibW9kYWxpdHlSZWZzIiwiY29sbGVjdGlvbiIsImxpc3REb2N1bWVudHMiLCJtb2RhbGl0eVNldCIsIm9lbXNCeU1vZGFsaXR5IiwibW9kZWxzQnlNb2RhbGl0eU9lbSIsInVzZXNTdWJjb2xsZWN0aW9ucyIsImhhc0RpcmVjdE1vZGVscyIsIm1vZGFsaXR5Q29sbGVjdGlvbiIsIm5lc3RlZE1vZGFsaXR5IiwibmVzdGVkTW9kZWxzQnlPZW0iLCJtb2RhbGl0aWVzIiwic291cmNlIl0sIm1hcHBpbmdzIjoiOztRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsSUFBSTtRQUNKO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDeEZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0NBR0E7O0FBQ0EsSUFBSUEsU0FBSjs7QUFDQSxJQUFJO0FBQ0ZBLFdBQVMsR0FBR0MsbUJBQU8sQ0FBQyw4Q0FBRCxDQUFuQjtBQUNELENBRkQsQ0FFRSxPQUFPQyxLQUFQLEVBQWM7QUFDZDtBQUNBRixXQUFTLEdBQUcsSUFBWjtBQUNELEMsQ0FFRDs7O0FBQ0EsSUFBSSxD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QUM5QixFQUExQztBQUNBLGdCQUFNZ0MsaUJBQWlCLEdBQ3JCLE1BQU12Qiw2QkFBNkIsQ0FBQ3FCLGtCQUFELENBRHJDO0FBRUFMLHFCQUFXLENBQUNoQyxHQUFaLENBQWdCc0MsY0FBaEI7QUFDQTVDLDJCQUFpQixDQUNmdUMsY0FEZSxFQUVmQyxtQkFGZSxFQUdmSSxjQUhlLEVBSWZDLGlCQUplLENBQWpCO0FBTUQ7QUFDRjtBQUNGOztBQUVELFVBQU1DLFVBQVUsR0FBR3pFLEtBQUssQ0FBQ0MsSUFBTixDQUFXZ0UsV0FBWCxDQUFuQjtBQUNBUCxPQUFHLENBQUNFLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQjtBQUNuQlksZ0JBRG1CO0FBRW5CUCxvQkFGbUI7QUFHbkJDLHlCQUhtQjtBQUluQkMsd0JBSm1CO0FBS25CTSxZQUFNLEVBQUU7QUFMVyxLQUFyQjtBQU9ELEdBaERELENBZ0RFLE9BQU81SCxLQUFQLEVBQWM7QUFDZG9DLFdBQU8sQ0FBQ3BDLEtBQVIsQ0FBYyw2QkFBZCxFQUE2Q0EsS0FBN0M7QUFDQTRHLE9BQUcsQ0FBQ0UsTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLENBQXFCO0FBQUUvRyxXQUFLLEVBQUU7QUFBVCxLQUFyQjtBQUNEO0FBQ0YsQzs7Ozs7Ozs7Ozs7QUNwTkQsK0M7Ozs7Ozs7Ozs7O0FDQUEscUQ7Ozs7Ozs7Ozs7O0FDQUEsK0MiLCJmaWxlIjoicGFnZXMvYXBpL3RyYWNrZXIvY2F0YWxvZy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0gcmVxdWlyZSgnLi4vLi4vLi4vc3NyLW1vZHVsZS1jYWNoZS5qcycpO1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHR2YXIgdGhyZXcgPSB0cnVlO1xuIFx0XHR0cnkge1xuIFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuIFx0XHRcdHRocmV3ID0gZmFsc2U7XG4gXHRcdH0gZmluYWxseSB7XG4gXHRcdFx0aWYodGhyZXcpIGRlbGV0ZSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0fVxuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vcGFnZXMvYXBpL3RyYWNrZXIvY2F0YWxvZy5qc1wiKTtcbiIsImltcG9ydCB7IGluaXRpYWxpemVBcHAsIGdldEFwcHMsIGNlcnQgfSBmcm9tIFwiZmlyZWJhc2UtYWRtaW4vYXBwXCI7XG5pbXBvcnQgeyBnZXRGaXJlc3RvcmUgfSBmcm9tIFwiZmlyZWJhc2UtYWRtaW4vZmlyZXN0b3JlXCI7XG5cclxuLy8gSW1wb3J0IEZpcmViYXNlIEZ1bmN0aW9ucyBmb3IgY29uZmlnIGFjY2Vzc1xyXG5sZXQgZnVuY3Rpb25zO1xyXG50cnkge1xyXG4gIGZ1bmN0aW9ucyA9IHJlcXVpcmUoXCJmaXJlYmFzZS1mdW5jdGlvbnNcIik7XHJcbn0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgLy8gTm90IHJ1bm5pbmcgaW4gRmlyZWJhc2UgRnVuY3Rpb25zIGVudmlyb25tZW50XHJcbiAgZnVuY3Rpb25zID0gbnVsbDtcclxufVxyXG5cclxuLy8gSW5pdGlhbGl6ZSBGaXJlYmFzZSBBZG1pbiBpZiBpdCBoYXNuJ3QgYmVlbiBpbml0aWFsaXplZFxuaWYgKCFnZXRBcHBzKCkubGVuZ3RoKSB7XG4gIGNvbnN0IGNsaWVudEVtYWlsID1cclxuICAgIHByb2Nlc3MuZW52LkZJUkVCQVNFX0NMSUVOVF9FTUFJTCB8fFxyXG4gICAgcHJvY2Vzcy5lbnYuRklSRUJBU0VfRlVOQ1RJT05TX0NMSUVOVF9FTUFJTCB8fFxyXG4gICAgcHJvY2Vzcy5lbnYuRklSRUJBU0VfQURNSU5fQ0xJRU5UX0VNQUlMIHx8XHJcbiAgICAoZnVuY3Rpb25zXHJcbiAgICAgID8gZnVuY3Rpb25zLmNvbmZpZygpLmFkbWluPy5jbGllbnRfZW1haWwgfHxcclxuICAgICAgICBmdW5jdGlvbnMuY29uZmlnKCkuc3NyPy5maXJlYmFzZV9jbGllbnRfZW1haWxcclxuICAgICAgOiB1bmRlZmluZWQpO1xyXG5cclxuICBjb25zdCBwcml2YXRlS2V5ID1cbiAgICBwcm9jZXNzLmVudi5GSVJFQkFTRV9QUklWQVRFX0tFWSB8fFxyXG4gICAgcHJvY2Vzcy5lbnYuRklSRUJBU0VfRlVOQ1RJT05TX1BSSVZBVEVfS0VZIHx8XHJcbiAgICBwcm9jZXNzLmVudi5GSVJFQkFTRV9BRE1JTl9QUklWQVRFX0tFWSB8fFxyXG4gICAgKGZ1bmN0aW9uc1xyXG4gICAgICA/IGZ1bmN0aW9ucy5jb25maWcoKS5hZG1pbj8ucHJpdmF0ZV9rZXkgfHxcclxuICAgICAgICBmdW5jdGlvbnMuY29uZmlnKCkuc3NyPy5maXJlYmFzZV9wcml2YXRlX2tleVxyXG4gICAgICA6IHVuZGVmaW5lZCk7XG5cbiAgY29uc3QgaGFzRXhwbGljaXRBZG1pbkNyZWRzID0gQm9vbGVhbihjbGllbnRFbWFpbCAmJiBwcml2YXRlS2V5KTtcbiAgY29uc3QgaXNHb29nbGVSdW50aW1lID0gQm9vbGVhbihcbiAgICBwcm9jZXNzLmVudi5LX1NFUlZJQ0UgfHxcbiAgICAgIHByb2Nlc3MuZW52LkZVTkNUSU9OX1RBUkdFVCB8fFxuICAgICAgcHJvY2Vzcy5lbnYuR0FFX0VOViB8fFxuICAgICAgcHJvY2Vzcy5lbnYuR09PR0xFX0NMT1VEX1BST0pFQ1RcbiAgKTtcbiAgY29uc3QgY2FuVXNlQWRjID1cbiAgICBpc0dvb2dsZVJ1bnRpbWUgfHwgQm9vbGVhbihwcm9jZXNzLmVudi5HT09HTEVfQVBQTElDQVRJT05fQ1JFREVOVElBTFMpO1xuXG4gIHRyeSB7XG4gICAgaWYgKGhhc0V4cGxpY2l0QWRtaW5DcmVkcykge1xuICAgICAgaW5pdGlhbGl6ZUFwcCh7XG4gICAgICAgIGNyZWRlbnRpYWw6IGNlcnQoe1xuICAgICAgICAgIHByb2plY3RJZDogXCJtYWdtby1hYzEwY1wiLFxuICAgICAgICAgIGNsaWVudEVtYWlsOiBjbGllbnRFbWFpbCxcbiAgICAgICAgICBwcml2YXRlS2V5OiBwcml2YXRlS2V5LnJlcGxhY2UoL1xcXFxuL2csIFwiXFxuXCIpLFxuICAgICAgICB9KSxcbiAgICAgICAgZGF0YWJhc2VVUkw6IFwiaHR0cHM6Ly9tYWdtby1hYzEwYy5maXJlYmFzZWlvLmNvbVwiLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChjYW5Vc2VBZGMpIHtcbiAgICAgIC8vIEZhbGwgYmFjayB0byBBcHBsaWNhdGlvbiBEZWZhdWx0IENyZWRlbnRpYWxzIChlLmcuIENsb3VkIEZ1bmN0aW9ucy9SdW4pXG4gICAgICBpbml0aWFsaXplQXBwKHtcbiAgICAgICAgcHJvamVjdElkOiBcIm1hZ21vLWFjMTBjXCIsXG4gICAgICAgIGRhdGFiYXNlVVJMOiBcImh0dHBzOi8vbWFnbW8tYWMxMGMuZmlyZWJhc2Vpby5jb21cIixcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgIFwiRmlyZWJhc2UgQWRtaW4gbm90IGluaXRpYWxpemVkOiBtaXNzaW5nIHNlcnZpY2UgYWNjb3VudCBjcmVkZW50aWFscyBpbiBsb2NhbCBlbnZpcm9ubWVudC5cIlxuICAgICAgKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS53YXJuKFwiRmlyZWJhc2UgQWRtaW4gaW5pdGlhbGl6YXRpb24gZmFpbGVkOlwiLCBlcnJvci5tZXNzYWdlKTtcbiAgICAvLyBEb24ndCB0aHJvdyBlcnJvciBkdXJpbmcgYnVpbGQgcHJvY2Vzc1xyXG4gIH1cclxufVxyXG5cclxuLy8gT25seSBleHBvcnQgRmlyZXN0b3JlIGlmIEZpcmViYXNlIEFkbWluIGlzIHByb3Blcmx5IGluaXRpYWxpemVkXHJcbmxldCBhZG1pbkRiID0gbnVsbDtcclxudHJ5IHtcclxuICBpZiAoZ2V0QXBwcygpLmxlbmd0aCA+IDApIHtcclxuICAgIGFkbWluRGIgPSBnZXRGaXJlc3RvcmUoKTtcclxuICB9XHJcbn0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgY29uc29sZS53YXJuKFwiRmlyZWJhc2UgQWRtaW4gbm90IGF2YWlsYWJsZTpcIiwgZXJyb3IubWVzc2FnZSk7XHJcbn1cclxuXHJcbmV4cG9ydCB7IGFkbWluRGIgfTtcclxuZXhwb3J0IGRlZmF1bHQgYWRtaW5EYjtcclxuIiwiaW1wb3J0IHsgYWRtaW5EYiB9IGZyb20gXCIuLi8uLi8uLi9jb250ZXh0L0ZpcmViYXNlQWRtaW5cIjtcblxyXG5jb25zdCBub3JtYWxpemVMaXN0ID0gKHZhbHVlcykgPT4ge1xuICBjb25zdCBvdXQgPSBbXTtcclxuICAodmFsdWVzIHx8IFtdKS5mb3JFYWNoKCh2YWx1ZSkgPT4ge1xyXG4gICAgaWYgKHZhbHVlID09IG51bGwpIHJldHVybjtcclxuICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSBTdHJpbmcodmFsdWUpLnRyaW0oKTtcclxuICAgIGlmICghbm9ybWFsaXplZCkgcmV0dXJuO1xyXG4gICAgb3V0LnB1c2gobm9ybWFsaXplZCk7XHJcbiAgfSk7XHJcbiAgcmV0dXJuIEFycmF5LmZyb20obmV3IFNldChvdXQpKTtcclxufTtcclxuXHJcbmNvbnN0IGV4dHJhY3RNb2RlbHNGcm9tRG9jID0gKGRhdGEsIGRvY0lkLCBvcHRpb25zID0ge30pID0+IHtcbiAgY29uc3QgeyBhbGxvd0RvY0lkRmFsbGJhY2sgPSB0cnVlIH0gPSBvcHRpb25zO1xuICBpZiAoIWRhdGEpIHJldHVybiBhbGxvd0RvY0lkRmFsbGJhY2sgJiYgZG9jSWQgPyBbZG9jSWRdIDogW107XG4gIGlmIChBcnJheS5pc0FycmF5KGRhdGEubW9kZWxzKSkgcmV0dXJuIG5vcm1hbGl6ZUxpc3QoZGF0YS5tb2RlbHMpO1xuICBpZiAoQXJyYXkuaXNBcnJheShkYXRhLm1vZGVsKSkgcmV0dXJuIG5vcm1hbGl6ZUxpc3QoZGF0YS5tb2RlbCk7XG4gIGlmIChBcnJheS5pc0FycmF5KGRhdGEuaXRlbXMpKSByZXR1cm4gbm9ybWFsaXplTGlzdChkYXRhLml0ZW1zKTtcbiAgaWYgKHR5cGVvZiBkYXRhLm1vZGVsID09PSBcInN0cmluZ1wiKSByZXR1cm4gbm9ybWFsaXplTGlzdChbZGF0YS5tb2RlbF0pO1xuICBpZiAodHlwZW9mIGRhdGEubmFtZSA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIG5vcm1hbGl6ZUxpc3QoW2RhdGEubmFtZV0pO1xuICBpZiAoYWxsb3dEb2NJZEZhbGxiYWNrICYmIGRvY0lkKSByZXR1cm4gbm9ybWFsaXplTGlzdChbZG9jSWRdKTtcbiAgcmV0dXJuIFtdO1xufTtcblxyXG5jb25zdCBleHRyYWN0T2Vtc0Zyb21GaWVsZHMgPSAoZGF0YSkgPT4ge1xuICBjb25zdCBvdXQgPSB7fTtcclxuICBpZiAoIWRhdGEpIHJldHVybiBvdXQ7XHJcbiAgY29uc3Qgb2Vtc0ZpZWxkID0gZGF0YS5vZW1zIHx8IGRhdGEuT0VNcyB8fCBkYXRhLm9lbSB8fCBkYXRhLk9FTTtcclxuXHJcbiAgaWYgKEFycmF5LmlzQXJyYXkob2Vtc0ZpZWxkKSkge1xyXG4gICAgb2Vtc0ZpZWxkLmZvckVhY2goKGVudHJ5KSA9PiB7XHJcbiAgICAgIGlmIChlbnRyeSA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgIGlmICh0eXBlb2YgZW50cnkgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICBvdXRbZW50cnldID0gb3V0W2VudHJ5XSB8fCBbXTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHR5cGVvZiBlbnRyeSA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgIGNvbnN0IG5hbWUgPVxyXG4gICAgICAgICAgZW50cnkubmFtZSB8fFxyXG4gICAgICAgICAgZW50cnkub2VtIHx8XHJcbiAgICAgICAgICBlbnRyeS5PRU0gfHxcclxuICAgICAgICAgIGVudHJ5LmxhYmVsIHx8XHJcbiAgICAgICAgICBlbnRyeS52YWx1ZTtcclxuICAgICAgICBpZiAoIW5hbWUpIHJldHVybjtcclxuICAgICAgICBjb25zdCBtb2RlbHMgPSBleHRyYWN0TW9kZWxzRnJvbURvYyhlbnRyeSk7XHJcbiAgICAgICAgb3V0W25hbWVdID0gbm9ybWFsaXplTGlzdChbLi4uKG91dFtuYW1lXSB8fCBbXSksIC4uLm1vZGVsc10pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBvdXQ7XHJcbiAgfVxyXG5cclxuICBpZiAob2Vtc0ZpZWxkICYmIHR5cGVvZiBvZW1zRmllbGQgPT09IFwib2JqZWN0XCIpIHtcclxuICAgIE9iamVjdC5lbnRyaWVzKG9lbXNGaWVsZCkuZm9yRWFjaCgoW29lbSwgdmFsdWVdKSA9PiB7XHJcbiAgICAgIGlmICh2YWx1ZSA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xyXG4gICAgICAgIG91dFtvZW1dID0gbm9ybWFsaXplTGlzdCh2YWx1ZSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICBjb25zdCBtb2RlbHMgPSBleHRyYWN0TW9kZWxzRnJvbURvYyh2YWx1ZSk7XHJcbiAgICAgICAgb3V0W29lbV0gPSBub3JtYWxpemVMaXN0KFsuLi4ob3V0W29lbV0gfHwgW10pLCAuLi5tb2RlbHNdKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgb3V0W29lbV0gPSBub3JtYWxpemVMaXN0KFsuLi4ob3V0W29lbV0gfHwgW10pLCBTdHJpbmcodmFsdWUpLnRyaW0oKV0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gb3V0O1xyXG59O1xuXG5jb25zdCBtZXJnZU1vZGVscyA9IChtb2RlbHNCeU9lbSwgb2VtLCBpbmNvbWluZykgPT4ge1xuICBjb25zdCBjdXJyZW50ID0gbW9kZWxzQnlPZW1bb2VtXSB8fCBbXTtcbiAgbW9kZWxzQnlPZW1bb2VtXSA9IG5vcm1hbGl6ZUxpc3QoWy4uLihjdXJyZW50IHx8IFtdKSwgLi4uKGluY29taW5nIHx8IFtdKV0pO1xufTtcblxuY29uc3QgbWVyZ2VNb2RhbGl0eURhdGEgPSAoXG4gIHRhcmdldE9lbXNCeU1vZGFsaXR5LFxuICB0YXJnZXRNb2RlbHNCeU1vZGFsaXR5T2VtLFxuICBtb2RhbGl0eSxcbiAgbW9kZWxzQnlPZW1cbikgPT4ge1xuICBpZiAoIW1vZGFsaXR5KSByZXR1cm47XG4gIGNvbnN0IG9lbXMgPSBPYmplY3Qua2V5cyhtb2RlbHNCeU9lbSB8fCB7fSk7XG4gIGlmICghdGFyZ2V0TW9kZWxzQnlNb2RhbGl0eU9lbVttb2RhbGl0eV0pIHtcbiAgICB0YXJnZXRNb2RlbHNCeU1vZGFsaXR5T2VtW21vZGFsaXR5XSA9IHt9O1xuICB9XG4gIGlmICghdGFyZ2V0T2Vtc0J5TW9kYWxpdHlbbW9kYWxpdHldKSB7XG4gICAgdGFyZ2V0T2Vtc0J5TW9kYWxpdHlbbW9kYWxpdHldID0gW107XG4gIH1cbiAgY29uc3QgbmV4dE9lbXMgPSBuZXcgU2V0KHRhcmdldE9lbXNCeU1vZGFsaXR5W21vZGFsaXR5XSB8fCBbXSk7XG4gIG9lbXMuZm9yRWFjaCgob2VtKSA9PiB7XG4gICAgbmV4dE9lbXMuYWRkKG9lbSk7XG4gICAgbWVyZ2VNb2RlbHMoXG4gICAgICB0YXJnZXRNb2RlbHNCeU1vZGFsaXR5T2VtW21vZGFsaXR5XSxcbiAgICAgIG9lbSxcbiAgICAgIG1vZGVsc0J5T2VtW29lbV0gfHwgW11cbiAgICApO1xuICB9KTtcbiAgdGFyZ2V0T2Vtc0J5TW9kYWxpdHlbbW9kYWxpdHldID0gQXJyYXkuZnJvbShuZXh0T2Vtcyk7XG59O1xuXG5jb25zdCByZWFkTW9kZWxzRnJvbU9lbVN1YmNvbGxlY3Rpb24gPSBhc3luYyAoY29sbGVjdGlvblJlZikgPT4ge1xuICBjb25zdCBtb2RlbFNldCA9IG5ldyBTZXQoKTtcbiAgY29uc3Qgc25hcCA9IGF3YWl0IGNvbGxlY3Rpb25SZWYuZ2V0KCk7XG4gIHNuYXAuZm9yRWFjaCgoZG9jKSA9PiB7XG4gICAgY29uc3QgbW9kZWxzID0gZXh0cmFjdE1vZGVsc0Zyb21Eb2MoZG9jLmRhdGEoKSwgZG9jLmlkKTtcbiAgICBtb2RlbHMuZm9yRWFjaCgobW9kZWwpID0+IG1vZGVsU2V0LmFkZChtb2RlbCkpO1xuICB9KTtcbiAgcmV0dXJuIEFycmF5LmZyb20obW9kZWxTZXQpO1xufTtcblxuY29uc3QgcmVhZE1vZGFsaXR5RnJvbURvY3VtZW50UmVmID0gYXN5bmMgKGRvY1JlZikgPT4ge1xuICBjb25zdCBkb2NTbmFwID0gYXdhaXQgZG9jUmVmLmdldCgpO1xuICBjb25zdCBkYXRhID0gZG9jU25hcC5leGlzdHMgPyBkb2NTbmFwLmRhdGEoKSB8fCB7fSA6IHt9O1xuICBjb25zdCBtb2RlbHNCeU9lbSA9IHt9O1xuXG4gIGNvbnN0IGZpZWxkT2VtcyA9IGV4dHJhY3RPZW1zRnJvbUZpZWxkcyhkYXRhKTtcbiAgT2JqZWN0LmVudHJpZXMoZmllbGRPZW1zKS5mb3JFYWNoKChbb2VtLCBtb2RlbHNdKSA9PiB7XG4gICAgbWVyZ2VNb2RlbHMobW9kZWxzQnlPZW0sIG9lbSwgbW9kZWxzIHx8IFtdKTtcbiAgfSk7XG5cbiAgY29uc3Qgc3ViY29sbGVjdGlvbnMgPSBhd2FpdCBkb2NSZWYubGlzdENvbGxlY3Rpb25zKCk7XG4gIGZvciAoY29uc3Qgc3ViIG9mIHN1YmNvbGxlY3Rpb25zKSB7XG4gICAgY29uc3Qgb2VtID0gc3ViLmlkO1xuICAgIGNvbnN0IG1vZGVscyA9IGF3YWl0IHJlYWRNb2RlbHNGcm9tT2VtU3ViY29sbGVjdGlvbihzdWIpO1xuICAgIG1lcmdlTW9kZWxzKG1vZGVsc0J5T2VtLCBvZW0sIG1vZGVscyk7XG4gIH1cblxuICByZXR1cm4geyBtb2RlbHNCeU9lbSwgc3ViY29sbGVjdGlvbnMgfTtcbn07XG5cbmNvbnN0IHJlYWRNb2RhbGl0eUZyb21Db2xsZWN0aW9uUmVmID0gYXN5bmMgKGNvbGxlY3Rpb25SZWYpID0+IHtcbiAgY29uc3QgbW9kZWxzQnlPZW0gPSB7fTtcbiAgY29uc3Qgc25hcCA9IGF3YWl0IGNvbGxlY3Rpb25SZWYuZ2V0KCk7XG5cbiAgZm9yIChjb25zdCBvZW1Eb2Mgb2Ygc25hcC5kb2NzKSB7XG4gICAgY29uc3Qgb2VtID0gb2VtRG9jLmlkO1xuICAgIGNvbnN0IG1vZGVscyA9IGV4dHJhY3RNb2RlbHNGcm9tRG9jKG9lbURvYy5kYXRhKCksIG9lbURvYy5pZCwge1xuICAgICAgYWxsb3dEb2NJZEZhbGxiYWNrOiBmYWxzZSxcbiAgICB9KTtcbiAgICBtZXJnZU1vZGVscyhtb2RlbHNCeU9lbSwgb2VtLCBtb2RlbHMpO1xuXG4gICAgY29uc3QgbmVzdGVkID0gYXdhaXQgb2VtRG9jLnJlZi5saXN0Q29sbGVjdGlvbnMoKTtcbiAgICBmb3IgKGNvbnN0IG5lc3RlZENvbCBvZiBuZXN0ZWQpIHtcbiAgICAgIGNvbnN0IG5lc3RlZE1vZGVscyA9IGF3YWl0IHJlYWRNb2RlbHNGcm9tT2VtU3ViY29sbGVjdGlvbihuZXN0ZWRDb2wpO1xuICAgICAgbWVyZ2VNb2RlbHMobW9kZWxzQnlPZW0sIG9lbSwgbmVzdGVkTW9kZWxzKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbW9kZWxzQnlPZW07XG59O1xuXHJcbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGhhbmRsZXIocmVxLCByZXMpIHtcclxuICByZXMuc2V0SGVhZGVyKFwiQ2FjaGUtQ29udHJvbFwiLCBcIm5vLXN0b3JlXCIpO1xyXG4gIGlmICghYWRtaW5EYikge1xyXG4gICAgcmVzLnN0YXR1cyg1MDMpLmpzb24oeyBlcnJvcjogXCJGaXJlYmFzZSBBZG1pbiBub3QgYXZhaWxhYmxlLlwiIH0pO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgdHJ5IHtcbiAgICBjb25zdCBtb2RhbGl0eVJlZnMgPSBhd2FpdCBhZG1pbkRiLmNvbGxlY3Rpb24oXCJUcmFja2VyXCIpLmxpc3REb2N1bWVudHMoKTtcbiAgICBjb25zdCBtb2RhbGl0eVNldCA9IG5ldyBTZXQoKTtcbiAgICBjb25zdCBvZW1zQnlNb2RhbGl0eSA9IHt9O1xuICAgIGNvbnN0IG1vZGVsc0J5TW9kYWxpdHlPZW0gPSB7fTtcbiAgICBsZXQgdXNlc1N1YmNvbGxlY3Rpb25zID0gZmFsc2U7XG5cbiAgICBmb3IgKGNvbnN0IHJlZiBvZiBtb2RhbGl0eVJlZnMpIHtcbiAgICAgIGNvbnN0IG1vZGFsaXR5ID0gcmVmLmlkO1xuICAgICAgY29uc3QgeyBtb2RlbHNCeU9lbSwgc3ViY29sbGVjdGlvbnMgfSA9IGF3YWl0IHJlYWRNb2RhbGl0eUZyb21Eb2N1bWVudFJlZihcbiAgICAgICAgcmVmXG4gICAgICApO1xuICAgICAgaWYgKHN1YmNvbGxlY3Rpb25zLmxlbmd0aCkgdXNlc1N1YmNvbGxlY3Rpb25zID0gdHJ1ZTtcbiAgICAgIG1vZGFsaXR5U2V0LmFkZChtb2RhbGl0eSk7XG4gICAgICBtZXJnZU1vZGFsaXR5RGF0YShcbiAgICAgICAgb2Vtc0J5TW9kYWxpdHksXG4gICAgICAgIG1vZGVsc0J5TW9kYWxpdHlPZW0sXG4gICAgICAgIG1vZGFsaXR5LFxuICAgICAgICBtb2RlbHNCeU9lbVxuICAgICAgKTtcblxuICAgICAgLy8gU29tZSBkYXRhc2V0cyB1c2UgYSBcImNvbnRhaW5lclwiIGRvY3VtZW50IHVuZGVyIFRyYWNrZXIsIHdoZXJlIGVhY2hcbiAgICAgIC8vIG1vZGFsaXR5IGlzIHN0b3JlZCBhcyBhIHN1YmNvbGxlY3Rpb24gb2YgdGhhdCBkb2MuXG4gICAgICBjb25zdCBoYXNEaXJlY3RNb2RlbHMgPSBPYmplY3Qua2V5cyhtb2RlbHNCeU9lbSkubGVuZ3RoID4gMDtcbiAgICAgIGlmICghaGFzRGlyZWN0TW9kZWxzICYmIHN1YmNvbGxlY3Rpb25zLmxlbmd0aCkge1xuICAgICAgICBmb3IgKGNvbnN0IG1vZGFsaXR5Q29sbGVjdGlvbiBvZiBzdWJjb2xsZWN0aW9ucykge1xuICAgICAgICAgIGNvbnN0IG5lc3RlZE1vZGFsaXR5ID0gbW9kYWxpdHlDb2xsZWN0aW9uLmlkO1xuICAgICAgICAgIGNvbnN0IG5lc3RlZE1vZGVsc0J5T2VtID1cbiAgICAgICAgICAgIGF3YWl0IHJlYWRNb2RhbGl0eUZyb21Db2xsZWN0aW9uUmVmKG1vZGFsaXR5Q29sbGVjdGlvbik7XG4gICAgICAgICAgbW9kYWxpdHlTZXQuYWRkKG5lc3RlZE1vZGFsaXR5KTtcbiAgICAgICAgICBtZXJnZU1vZGFsaXR5RGF0YShcbiAgICAgICAgICAgIG9lbXNCeU1vZGFsaXR5LFxuICAgICAgICAgICAgbW9kZWxzQnlNb2RhbGl0eU9lbSxcbiAgICAgICAgICAgIG5lc3RlZE1vZGFsaXR5LFxuICAgICAgICAgICAgbmVzdGVkTW9kZWxzQnlPZW1cbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgbW9kYWxpdGllcyA9IEFycmF5LmZyb20obW9kYWxpdHlTZXQpO1xuICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcbiAgICAgIG1vZGFsaXRpZXMsXG4gICAgICBvZW1zQnlNb2RhbGl0eSxcbiAgICAgIG1vZGVsc0J5TW9kYWxpdHlPZW0sXHJcbiAgICAgIHVzZXNTdWJjb2xsZWN0aW9ucyxcclxuICAgICAgc291cmNlOiBcInNlcnZlclwiLFxyXG4gICAgfSk7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoXCJUcmFja2VyIGNhdGFsb2cgQVBJIGZhaWxlZDpcIiwgZXJyb3IpO1xyXG4gICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyBlcnJvcjogXCJGYWlsZWQgdG8gYnVpbGQgdHJhY2tlciBjYXRhbG9nLlwiIH0pO1xyXG4gIH1cclxufVxyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmaXJlYmFzZS1hZG1pbi9hcHBcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZmlyZWJhc2UtYWRtaW4vZmlyZXN0b3JlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZpcmViYXNlLWZ1bmN0aW9uc1wiKTsiXSwic291cmNlUm9vdCI6IiJ9