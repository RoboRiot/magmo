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
/******/ 	return __webpack_require__(__webpack_require__.s = 41);
/******/ })
/************************************************************************/
/******/ ({

/***/ 41:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("p3eQ");


/***/ }),

/***/ "Aroy":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return adminDb; });
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("mw/K");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var firebase_admin_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("txAr");
/* harmony import */ var firebase_admin_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(firebase_admin_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var firebase_admin_firestore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("YFVX");
/* harmony import */ var firebase_admin_firestore__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(firebase_admin_firestore__WEBPACK_IMPORTED_MODULE_2__);


 // Import Firebase Functions for config access

let functions;

try {
  functions = __webpack_require__("O8Wp");
} catch (error) {
  // Not running in Firebase Functions environment
  functions = null;
} // Initialize Firebase Admin if it hasn't been initialized


if (!Object(firebase_admin_app__WEBPACK_IMPORTED_MODULE_1__["getApps"])().length) {
  var _serviceAccount, _functions$config$adm, _functions$config$ssr, _serviceAccount2, _functions$config$adm2, _functions$config$ssr2, _serviceAccount3;

  const serviceAccountPath = process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT_PATH || process.env.FIREBASE_SERVICE_ACCOUNT_PATH;
  let serviceAccount = null;

  if (serviceAccountPath) {
    try {
      const raw = fs__WEBPACK_IMPORTED_MODULE_0___default.a.readFileSync(serviceAccountPath, "utf8");
      serviceAccount = JSON.parse(raw);
    } catch (error) {
      console.warn("Firebase Admin service account file could not be loaded:", error.message);
    }
  }

  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL || process.env.FIREBASE_FUNCTIONS_CLIENT_EMAIL || process.env.FIREBASE_ADMIN_CLIENT_EMAIL || ((_serviceAccount = serviceAccount) === null || _serviceAccount === void 0 ? void 0 : _serviceAccount.client_email) || (functions ? ((_functions$config$adm = functions.config().admin) === null || _functions$config$adm === void 0 ? void 0 : _functions$config$adm.client_email) || ((_functions$config$ssr = functions.config().ssr) === null || _functions$config$ssr === void 0 ? void 0 : _functions$config$ssr.firebase_client_email) : undefined);
  const privateKey = process.env.FIREBASE_PRIVATE_KEY || process.env.FIREBASE_FUNCTIONS_PRIVATE_KEY || process.env.FIREBASE_ADMIN_PRIVATE_KEY || ((_serviceAccount2 = serviceAccount) === null || _serviceAccount2 === void 0 ? void 0 : _serviceAccount2.private_key) || (functions ? ((_functions$config$adm2 = functions.config().admin) === null || _functions$config$adm2 === void 0 ? void 0 : _functions$config$adm2.private_key) || ((_functions$config$ssr2 = functions.config().ssr) === null || _functions$config$ssr2 === void 0 ? void 0 : _functions$config$ssr2.firebase_private_key) : undefined);
  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID || process.env.FIREBASE_PROJECT_ID || ((_serviceAccount3 = serviceAccount) === null || _serviceAccount3 === void 0 ? void 0 : _serviceAccount3.project_id) || "magmo-ac10c";
  const hasExplicitAdminCreds = Boolean(clientEmail && privateKey);
  const isGoogleRuntime = Boolean(process.env.K_SERVICE || process.env.FUNCTION_TARGET || process.env.GAE_ENV || process.env.GOOGLE_CLOUD_PROJECT);
  const canUseAdc = isGoogleRuntime || Boolean(process.env.GOOGLE_APPLICATION_CREDENTIALS);

  try {
    if (hasExplicitAdminCreds) {
      Object(firebase_admin_app__WEBPACK_IMPORTED_MODULE_1__["initializeApp"])({
        credential: Object(firebase_admin_app__WEBPACK_IMPORTED_MODULE_1__["cert"])({
          projectId,
          clientEmail: clientEmail,
          privateKey: privateKey.replace(/\\n/g, "\n")
        }),
        databaseURL: "https://magmo-ac10c.firebaseio.com"
      });
    } else if (canUseAdc) {
      // Fall back to Application Default Credentials (e.g. Cloud Functions/Run)
      Object(firebase_admin_app__WEBPACK_IMPORTED_MODULE_1__["initializeApp"])({
        projectId,
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
  if (Object(firebase_admin_app__WEBPACK_IMPORTED_MODULE_1__["getApps"])().length > 0) {
    adminDb = Object(firebase_admin_firestore__WEBPACK_IMPORTED_MODULE_2__["getFirestore"])();
  }
} catch (error) {
  console.warn("Firebase Admin not available:", error.message);
}


/* unused harmony default export */ var _unused_webpack_default_export = (adminDb);

/***/ }),

/***/ "O8Wp":
/***/ (function(module, exports) {

module.exports = require("firebase-functions");

/***/ }),

/***/ "YFVX":
/***/ (function(module, exports) {

module.exports = require("firebase-admin/firestore");

/***/ }),

/***/ "mw/K":
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "p3eQ":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return handler; });
/* harmony import */ var _context_FirebaseAdmin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("Aroy");


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

  if (!_context_FirebaseAdmin__WEBPACK_IMPORTED_MODULE_0__[/* adminDb */ "a"]) {
    res.status(503).json({
      error: "Firebase Admin not available."
    });
    return;
  }

  try {
    const modalityRefs = await _context_FirebaseAdmin__WEBPACK_IMPORTED_MODULE_0__[/* adminDb */ "a"].collection("Tracker").listDocuments();
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

/***/ "txAr":
/***/ (function(module, exports) {

module.exports = require("firebase-admin/app");

/***/ })

/******/ });