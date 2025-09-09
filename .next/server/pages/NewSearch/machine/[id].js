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
/******/ 	return __webpack_require__(__webpack_require__.s = "./pages/NewSearch/machine/[id]/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./context/Firebase.js":
/*!*****************************!*\
  !*** ./context/Firebase.js ***!
  \*****************************/
/*! exports provided: auth, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "auth", function() { return auth; });
/* harmony import */ var firebase_compat_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! firebase/compat/app */ "firebase/compat/app");
/* harmony import */ var firebase_compat_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(firebase_compat_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var firebase_compat_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! firebase/compat/auth */ "firebase/compat/auth");
/* harmony import */ var firebase_compat_auth__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(firebase_compat_auth__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var firebase_compat_firestore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! firebase/compat/firestore */ "firebase/compat/firestore");
/* harmony import */ var firebase_compat_firestore__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(firebase_compat_firestore__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var firebase_compat_storage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! firebase/compat/storage */ "firebase/compat/storage");
/* harmony import */ var firebase_compat_storage__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(firebase_compat_storage__WEBPACK_IMPORTED_MODULE_3__);
// // import firebase from "firebase/app"
// import * as firebase from "firebase/app";
// // import "firebase/auth"
// const app = firebase.initializeApp({
//     apiKey: "AIzaSyCxC-a8b5Vhhey8GF47LpXZ1aMKYmiIhwE",
//     authDomain: "magmo-ac10c.firebaseapp.com",
//     projectId: "magmo-ac10c",
//     storageBucket: "magmo-ac10c.appspot.com",
//     messagingSenderId: "177857525147",
//     appId: "1:177857525147:web:ac8e3c87d82396beb1dd3e",
//     measurementId: "G-L0236JT5N3"
// })
// export const auth = app.auth()
// export default app
// apiKey: process.env.REACT_APP_FIREBASE_KEY,
//     authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//     projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//     appId: process.env.REACT_APP_FIREBASE_APP_ID,
//     measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID




const FirebaseCredentials = {
  apiKey: "AIzaSyCxC-a8b5Vhhey8GF47LpXZ1aMKYmiIhwE",
  authDomain:  false ? undefined : "magmo-cloud.web.app",
  projectId: "magmo-ac10c",
  storageBucket: "magmo-ac10c.appspot.com",
  messagingSenderId: "177857525147",
  appId: "1:177857525147:web:ac8e3c87d82396beb1dd3e",
  measurementId: "G-L0236JT5N3"
}; // if a Firebase instance doesn't exist, create one

if (!firebase_compat_app__WEBPACK_IMPORTED_MODULE_0___default.a.apps.length) {
  firebase_compat_app__WEBPACK_IMPORTED_MODULE_0___default.a.initializeApp(FirebaseCredentials);
}

const auth = firebase_compat_app__WEBPACK_IMPORTED_MODULE_0___default.a.auth();
/* harmony default export */ __webpack_exports__["default"] = (firebase_compat_app__WEBPACK_IMPORTED_MODULE_0___default.a); // import { initializeApp } from 'firebase/app';
// import { getFirestore, collection, getDocs } from 'firebase/firestore';
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// export default app;

/***/ }),

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

  // Only initialize if we have valid credentials
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL || process.env.FIREBASE_FUNCTIONS_CLIENT_EMAIL || process.env.FIREBASE_ADMIN_CLIENT_EMAIL || (functions ? ((_functions$config$adm = functions.config().admin) === null || _functions$config$adm === void 0 ? void 0 : _functions$config$adm.client_email) || ((_functions$config$ssr = functions.config().ssr) === null || _functions$config$ssr === void 0 ? void 0 : _functions$config$ssr.firebase_client_email) : undefined);
  const privateKey = process.env.FIREBASE_PRIVATE_KEY || process.env.FIREBASE_FUNCTIONS_PRIVATE_KEY || process.env.FIREBASE_ADMIN_PRIVATE_KEY || (functions ? ((_functions$config$adm2 = functions.config().admin) === null || _functions$config$adm2 === void 0 ? void 0 : _functions$config$adm2.private_key) || ((_functions$config$ssr2 = functions.config().ssr) === null || _functions$config$ssr2 === void 0 ? void 0 : _functions$config$ssr2.firebase_private_key) : undefined);

  if (clientEmail && privateKey) {
    try {
      Object(firebase_admin_app__WEBPACK_IMPORTED_MODULE_0__["initializeApp"])({
        credential: Object(firebase_admin_app__WEBPACK_IMPORTED_MODULE_0__["cert"])({
          projectId: "magmo-ac10c",
          clientEmail: clientEmail,
          privateKey: privateKey.replace(/\\n/g, "\n")
        }),
        databaseURL: "https://magmo-ac10c.firebaseio.com"
      });
    } catch (error) {
      console.warn("Firebase Admin initialization failed:", error.message); // Don't throw error during build process
    }
  } else {
    console.warn("Firebase Admin credentials not available, skipping initialization");
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

/***/ "./pages/NewSearch/machine/[id]/index.js":
/*!***********************************************!*\
  !*** ./pages/NewSearch/machine/[id]/index.js ***!
  \***********************************************/
/*! exports provided: default, getServerSideProps */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getServerSideProps", function() { return getServerSideProps; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/router */ "next/router");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-bootstrap */ "react-bootstrap");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _context_Firebase__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../context/Firebase */ "./context/Firebase.js");
/* harmony import */ var _context_FirebaseAdmin__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../context/FirebaseAdmin */ "./context/FirebaseAdmin.js");
var _jsxFileName = "C:\\Users\\mack2\\Desktop\\code\\pages\\NewSearch\\machine\\[id]\\index.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




 // Import for SSR



const Machine = () => {
  const router = Object(next_router__WEBPACK_IMPORTED_MODULE_1__["useRouter"])();
  const {
    0: selectedMachine,
    1: setSelectedMachine
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null);
  const {
    0: associatedParts,
    1: setAssociatedParts
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const {
    0: error,
    1: setError
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    if (router.isReady) {
      const {
        machineId
      } = router.query;

      if (!machineId) {
        const pathSegments = router.asPath.split("/");
        const machineIdFromPath = pathSegments[pathSegments.length - 1];
        console.log(`Machine ID extracted from URL path: ${machineIdFromPath}`);
        fetchMachineData(machineIdFromPath);
      } else {
        console.log(`Machine ID from router query: ${machineId}`);
        fetchMachineData(machineId);
      }
    }
  }, [router.isReady]);

  const fetchMachineData = async machineId => {
    try {
      console.log(`Attempting to fetch machine data for ID: ${machineId}`);
      const db = _context_Firebase__WEBPACK_IMPORTED_MODULE_3__["default"].firestore();
      const machineDoc = await db.collection("Machine").doc(machineId).get();

      if (machineDoc.exists) {
        const machineData = machineDoc.data();
        setSelectedMachine(machineData);
        console.log("Machine data:", machineData); // Fetch associated parts

        if (machineData.associatedParts) {
          fetchAssociatedParts(machineData.associatedParts);
        }
      } else {
        console.error("Machine not found");
        setError("Machine not found");
      }
    } catch (error) {
      console.error("Error fetching machine data:", error);
      setError("Error fetching machine data");
    }
  };

  const fetchAssociatedParts = async associatedPartsRefs => {
    try {
      const db = _context_Firebase__WEBPACK_IMPORTED_MODULE_3__["default"].firestore();
      const partsDocs = await Promise.all(associatedPartsRefs.map(ref => ref.get()));
      const partsData = await Promise.all(partsDocs.map(async doc => {
        var _data$ClientFrom;

        if (!doc.exists) {
          // skip or return an empty object
          return null;
        }

        const data = doc.data() || {};
        let clientName = "";

        if ((_data$ClientFrom = data.ClientFrom) !== null && _data$ClientFrom !== void 0 && _data$ClientFrom.get) {
          const clientDoc = await data.ClientFrom.get();
          clientName = clientDoc.exists ? clientDoc.data().name : "";
        }

        return _objectSpread(_objectSpread({
          id: doc.id
        }, data), {}, {
          clientName
        });
      }));
      setAssociatedParts(partsData.filter(p => p));
      console.log("Associated parts data:", partsData);
    } catch (error) {
      console.error("Error fetching associated parts:", error);
      setError("Error fetching associated parts");
    }
  };

  const handlePrintMulti = async () => {
    // Create your payload with the mapped items.
    // Replace 'associatedParts' with your actual variable containing the list.
    const payload = {
      items: associatedParts.map(part => ({
        name: part.name,
        arrival_date: part.arrival_date,
        // Ensure your part has a 'date' field.
        poNumber: part.poNumber || "",
        OEM: part.TheMachine ? part.TheMachine.oem || "" : "",
        modality: part.TheMachine ? part.TheMachine.modality || "" : "",
        model: part.TheMachine ? part.TheMachine.model || "" : "",
        local_sn: part.id,
        // Using document id as the local serial number.
        client: part.clientName || "",
        description: part.description || (part.descriptions && part.descriptions.length > 0 ? part.descriptions[0].description : "")
      })),
      test_print: true,
      // Hard-coded here if you want to test printing one item
      index: 1 // Hard-coded index (1-based)

    };

    try {
      const response = await fetch("https://9d70-174-76-22-138.ngrok-free.app/print_multi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      console.log("Print multi result:", result.status);
    } catch (error) {
      console.error("Error printing multiple labels:", error);
    }
  };

  const handleSelectPart = (id, name) => {
    console.log(`Selected part ID: ${id}, Name: ${name}`);
    router.push("../item/" + id);
  };

  const formatDate = input => {
    let date;

    if (input && input.seconds) {
      // Handle timestamp object with 'seconds' property
      date = new Date(input.seconds * 1000);
    } else if (typeof input === "string") {
      // Handle date string
      date = new Date(input);
    } else {
      return "N/A";
    }

    if (isNaN(date.getTime())) {
      // Invalid date string
      return "Invalid Date";
    }

    return date.toLocaleDateString();
  };

  return __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Container"], {
    className: "mt-5",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 159,
      columnNumber: 5
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Row"], {
    className: "justify-content-md-center",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 160,
      columnNumber: 7
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], {
    md: "8",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 161,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Card"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 162,
      columnNumber: 11
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Card"].Header, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 163,
      columnNumber: 13
    }
  }, __jsx("h4", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 164,
      columnNumber: 15
    }
  }, "Machine Details")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Card"].Body, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 166,
      columnNumber: 13
    }
  }, error && __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Alert"], {
    variant: "danger",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 167,
      columnNumber: 25
    }
  }, error), selectedMachine ? __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx("h5", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 170,
      columnNumber: 19
    }
  }, "Machine: ", selectedMachine.name), __jsx("p", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 171,
      columnNumber: 19
    }
  }, "Model: ", selectedMachine.Model), __jsx("p", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 172,
      columnNumber: 19
    }
  }, "Model: ", selectedMachine.Modality), __jsx("p", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 173,
      columnNumber: 19
    }
  }, "Model: ", selectedMachine.OEM), __jsx("p", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 174,
      columnNumber: 19
    }
  }, "Last PM: ", formatDate(selectedMachine.lastPM)), __jsx("p", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 175,
      columnNumber: 19
    }
  }, "Next PM: ", formatDate(selectedMachine.nextPM)), __jsx("h5", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 176,
      columnNumber: 19
    }
  }, "Associated Parts"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Table"], {
    striped: true,
    bordered: true,
    hover: true,
    size: "sm",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 177,
      columnNumber: 19
    }
  }, __jsx("thead", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 178,
      columnNumber: 21
    }
  }, __jsx("tr", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 179,
      columnNumber: 23
    }
  }, __jsx("th", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 180,
      columnNumber: 25
    }
  }, "Name"), __jsx("th", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 181,
      columnNumber: 25
    }
  }, "ID"), __jsx("th", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 182,
      columnNumber: 25
    }
  }, "Part Number"), __jsx("th", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 183,
      columnNumber: 25
    }
  }, "Serial Number"), __jsx("th", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 184,
      columnNumber: 25
    }
  }, "Date"), __jsx("th", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 185,
      columnNumber: 25
    }
  }, "Select"))), __jsx("tbody", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 188,
      columnNumber: 21
    }
  }, associatedParts.map(part => __jsx("tr", {
    key: part.id,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 190,
      columnNumber: 25
    }
  }, __jsx("td", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 191,
      columnNumber: 27
    }
  }, part.name), __jsx("td", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 192,
      columnNumber: 27
    }
  }, part.id), __jsx("td", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 193,
      columnNumber: 27
    }
  }, part.pn), __jsx("td", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 194,
      columnNumber: 27
    }
  }, part.sn), __jsx("td", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 195,
      columnNumber: 27
    }
  }, part.date), __jsx("td", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 196,
      columnNumber: 27
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "primary",
    onClick: () => handleSelectPart(part.id, part.name),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 197,
      columnNumber: 29
    }
  }, "Select")))), __jsx("tr", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 208,
      columnNumber: 23
    }
  }, __jsx("td", {
    colSpan: "5",
    style: {
      textAlign: "center",
      paddingTop: "20px"
    },
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 209,
      columnNumber: 25
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "secondary",
    onClick: handlePrintMulti,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 213,
      columnNumber: 27
    }
  }, "Print All Items"))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "primary",
    style: {
      marginTop: "20px"
    },
    onClick: () => router.back(),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 222,
      columnNumber: 23
    }
  }, "back")))) : !error && __jsx("p", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 234,
      columnNumber: 27
    }
  }, "Loading machine data..."))))));
};

/* harmony default export */ __webpack_exports__["default"] = (Machine); // Server-side rendering function

async function getServerSideProps(context) {
  const {
    id
  } = context.params;

  try {
    // Fetch machine data from Firestore using Admin SDK
    const machineDoc = await _context_FirebaseAdmin__WEBPACK_IMPORTED_MODULE_4__["adminDb"].collection("Machine").doc(id).get();

    if (!machineDoc.exists) {
      return {
        notFound: true // This will show a 404 page

      };
    }

    const machineData = machineDoc.data(); // Fetch associated parts if they exist

    let associatedParts = [];

    if (machineData.associatedParts && Array.isArray(machineData.associatedParts)) {
      try {
        const partsPromises = machineData.associatedParts.map(partRef => {
          if (partRef.path) {
            return _context_FirebaseAdmin__WEBPACK_IMPORTED_MODULE_4__["adminDb"].doc(partRef.path).get();
          }

          return null;
        }).filter(Boolean);
        const partsDocs = await Promise.all(partsPromises);
        associatedParts = await Promise.all(partsDocs.map(async doc => {
          if (!doc.exists) {
            return null;
          }

          const data = doc.data() || {};
          let clientName = ""; // Fetch client name if ClientFrom reference exists

          if (data.ClientFrom && data.ClientFrom.path) {
            try {
              const clientDoc = await _context_FirebaseAdmin__WEBPACK_IMPORTED_MODULE_4__["adminDb"].doc(data.ClientFrom.path).get();
              clientName = clientDoc.exists ? clientDoc.data().name : "";
            } catch (error) {
              console.error("Error fetching client data:", error);
            }
          }

          return _objectSpread(_objectSpread({
            id: doc.id
          }, data), {}, {
            clientName
          });
        })); // Filter out null values

        associatedParts = associatedParts.filter(part => part !== null);
      } catch (error) {
        console.error("Error fetching associated parts:", error);
      }
    } // Serialize the machine data, removing any non-serializable fields


    const serializedMachine = {
      id,
      name: machineData.name || "",
      Model: machineData.Model || "",
      OEM: machineData.OEM || "",
      Modality: machineData.Modality || "",
      lastPM: machineData.lastPM || null,
      nextPM: machineData.nextPM || null // Add other machine fields as needed, but ensure they're serializable

    };
    return {
      props: {
        initialMachine: serializedMachine,
        initialAssociatedParts: associatedParts
      }
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);
    return {
      props: {
        error: "Failed to load machine data"
      }
    };
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

/***/ }),

/***/ "firebase/compat/app":
/*!**************************************!*\
  !*** external "firebase/compat/app" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("firebase/compat/app");

/***/ }),

/***/ "firebase/compat/auth":
/*!***************************************!*\
  !*** external "firebase/compat/auth" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("firebase/compat/auth");

/***/ }),

/***/ "firebase/compat/firestore":
/*!********************************************!*\
  !*** external "firebase/compat/firestore" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("firebase/compat/firestore");

/***/ }),

/***/ "firebase/compat/storage":
/*!******************************************!*\
  !*** external "firebase/compat/storage" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("firebase/compat/storage");

/***/ }),

/***/ "next/router":
/*!******************************!*\
  !*** external "next/router" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next/router");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-bootstrap":
/*!**********************************!*\
  !*** external "react-bootstrap" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-bootstrap");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vY29udGV4dC9GaXJlYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9jb250ZXh0L0ZpcmViYXNlQWRtaW4uanMiLCJ3ZWJwYWNrOi8vLy4vcGFnZXMvTmV3U2VhcmNoL21hY2hpbmUvL2luZGV4LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImZpcmViYXNlLWFkbWluL2FwcFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImZpcmViYXNlLWFkbWluL2ZpcmVzdG9yZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImZpcmViYXNlLWZ1bmN0aW9uc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImZpcmViYXNlL2NvbXBhdC9hcHBcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJmaXJlYmFzZS9jb21wYXQvYXV0aFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImZpcmViYXNlL2NvbXBhdC9maXJlc3RvcmVcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJmaXJlYmFzZS9jb21wYXQvc3RvcmFnZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm5leHQvcm91dGVyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3RcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1ib290c3RyYXBcIiJdLCJuYW1lcyI6WyJGaXJlYmFzZUNyZWRlbnRpYWxzIiwiYXBpS2V5IiwiYXV0aERvbWFpbiIsInByb2plY3RJZCIsInN0b3JhZ2VCdWNrZXQiLCJtZXNzYWdpbmdTZW5kZXJJZCIsImFwcElkIiwibWVhc3VyZW1lbnRJZCIsIkZpcmViYXNlIiwiYXBwcyIsImxlbmd0aCIsImluaXRpYWxpemVBcHAiLCJhdXRoIiwiZnVuY3Rpb25zIiwicmVxdWlyZSIsImVycm9yIiwiZ2V0QXBwcyIsImNsaWVudEVtYWlsIiwicHJvY2VzcyIsImVudiIsIkZJUkVCQVNFX0NMSUVOVF9FTUFJTCIsIkZJUkVCQVNFX0ZVTkNUSU9OU19DTElFTlRfRU1BSUwiLCJGSVJFQkFTRV9BRE1JTl9DTElFTlRfRU1BSUwiLCJjb25maWciLCJhZG1pbiIsImNsaWVudF9lbWFpbCIsInNzciIsImZpcmViYXNlX2NsaWVudF9lbWFpbCIsInVuZGVmaW5lZCIsInByaXZhdGVLZXkiLCJGSVJFQkFTRV9QUklWQVRFX0tFWSIsIkZJUkVCQVNFX0ZVTkNUSU9OU19QUklWQVRFX0tFWSIsIkZJUkVCQVNFX0FETUlOX1BSSVZBVEVfS0VZIiwicHJpdmF0ZV9rZXkiLCJmaXJlYmFzZV9wcml2YXRlX2tleSIsImNyZWRlbnRpYWwiLCJjZXJ0IiwicmVwbGFjZSIsImRhdGFiYXNlVVJMIiwiY29uc29sZSIsIndhcm4iLCJtZXNzYWdlIiwiYWRtaW5EYiIsImdldEZpcmVzdG9yZSIsIk1hY2hpbmUiLCJyb3V0ZXIiLCJ1c2VSb3V0ZXIiLCJzZWxlY3RlZE1hY2hpbmUiLCJzZXRTZWxlY3RlZE1hY2hpbmUiLCJ1c2VTdGF0ZSIsImFzc29jaWF0ZWRQYXJ0cyIsInNldEFzc29jaWF0ZWRQYXJ0cyIsInNldEVycm9yIiwidXNlRWZmZWN0IiwiaXNSZWFkeSIsIm1hY2hpbmVJZCIsInF1ZXJ5IiwicGF0aFNlZ21lbnRzIiwiYXNQYXRoIiwic3BsaXQiLCJtYWNoaW5lSWRGcm9tUGF0aCIsImxvZyIsImZldGNoTWFjaGluZURhdGEiLCJkYiIsImZpcmViYXNlIiwiZmlyZXN0b3JlIiwibWFjaGluZURvYyIsImNvbGxlY3Rpb24iLCJkb2MiLCJnZXQiLCJleGlzdHMiLCJtYWNoaW5lRGF0YSIsImRhdGEiLCJmZXRjaEFzc29jaWF0ZWRQYXJ0cyIsImFzc29jaWF0ZWRQYXJ0c1JlZnMiLCJwYXJ0c0RvY3MiLCJQcm9taXNlIiwiYWxsIiwibWFwIiwicmVmIiwicGFydHNEYXRhIiwiY2xpZW50TmFtZSIsIkNsaWVudEZyb20iLCJjbGllbnREb2MiLCJuYW1lIiwiaWQiLCJmaWx0ZXIiLCJwIiwiaGFuZGxlUHJpbnRNdWx0aSIsInBheWxvYWQiLCJpdGVtcyIsInBhcnQiLCJhcnJpdmFsX2RhdGUiLCJwb051bWJlciIsIk9FTSIsIlRoZU1hY2hpbmUiLCJvZW0iLCJtb2RhbGl0eSIsIm1vZGVsIiwibG9jYWxfc24iLCJjbGllbnQiLCJkZXNjcmlwdGlvbiIsImRlc2NyaXB0aW9ucyIsInRlc3RfcHJpbnQiLCJpbmRleCIsInJlc3BvbnNlIiwiZmV0Y2giLCJtZXRob2QiLCJoZWFkZXJzIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJyZXN1bHQiLCJqc29uIiwic3RhdHVzIiwiaGFuZGxlU2VsZWN0UGFydCIsInB1c2giLCJmb3JtYXREYXRlIiwiaW5wdXQiLCJkYXRlIiwic2Vjb25kcyIsIkRhdGUiLCJpc05hTiIsImdldFRpbWUiLCJ0b0xvY2FsZURhdGVTdHJpbmciLCJNb2RlbCIsIk1vZGFsaXR5IiwibGFzdFBNIiwibmV4dFBNIiwicG4iLCJzbiIsInRleHRBbGlnbiIsInBhZGRpbmdUb3AiLCJtYXJnaW5Ub3AiLCJiYWNrIiwiZ2V0U2VydmVyU2lkZVByb3BzIiwiY29udGV4dCIsInBhcmFtcyIsIm5vdEZvdW5kIiwiQXJyYXkiLCJpc0FycmF5IiwicGFydHNQcm9taXNlcyIsInBhcnRSZWYiLCJwYXRoIiwiQm9vbGVhbiIsInNlcmlhbGl6ZWRNYWNoaW5lIiwicHJvcHMiLCJpbml0aWFsTWFjaGluZSIsImluaXRpYWxBc3NvY2lhdGVkUGFydHMiXSwibWFwcGluZ3MiOiI7O1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxJQUFJO1FBQ0o7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FB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RUFBRTtBQUNMbkksYUFBSyxFQUFFO0FBREY7QUFERixLQUFQO0FBS0Q7QUFDRixDOzs7Ozs7Ozs7OztBQ2pWRCwrQzs7Ozs7Ozs7Ozs7QUNBQSxxRDs7Ozs7Ozs7Ozs7QUNBQSwrQzs7Ozs7Ozs7Ozs7QUNBQSxnRDs7Ozs7Ozs7Ozs7QUNBQSxpRDs7Ozs7Ozs7Ozs7QUNBQSxzRDs7Ozs7Ozs7Ozs7QUNBQSxvRDs7Ozs7Ozs7Ozs7QUNBQSx3Qzs7Ozs7Ozs7Ozs7QUNBQSxrQzs7Ozs7Ozs7Ozs7QUNBQSw0QyIsImZpbGUiOiJwYWdlcy9OZXdTZWFyY2gvbWFjaGluZS9baWRdLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSByZXF1aXJlKCcuLi8uLi8uLi9zc3ItbW9kdWxlLWNhY2hlLmpzJyk7XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdHZhciB0aHJldyA9IHRydWU7XG4gXHRcdHRyeSB7XG4gXHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG4gXHRcdFx0dGhyZXcgPSBmYWxzZTtcbiBcdFx0fSBmaW5hbGx5IHtcbiBcdFx0XHRpZih0aHJldykgZGVsZXRlIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHR9XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9wYWdlcy9OZXdTZWFyY2gvbWFjaGluZS9baWRdL2luZGV4LmpzXCIpO1xuIiwiLy8gLy8gaW1wb3J0IGZpcmViYXNlIGZyb20gXCJmaXJlYmFzZS9hcHBcIlxuLy8gaW1wb3J0ICogYXMgZmlyZWJhc2UgZnJvbSBcImZpcmViYXNlL2FwcFwiO1xuLy8gLy8gaW1wb3J0IFwiZmlyZWJhc2UvYXV0aFwiXG5cbi8vIGNvbnN0IGFwcCA9IGZpcmViYXNlLmluaXRpYWxpemVBcHAoe1xuLy8gICAgIGFwaUtleTogXCJBSXphU3lDeEMtYThiNVZoaGV5OEdGNDdMcFhaMWFNS1ltaUlod0VcIixcbi8vICAgICBhdXRoRG9tYWluOiBcIm1hZ21vLWFjMTBjLmZpcmViYXNlYXBwLmNvbVwiLFxuLy8gICAgIHByb2plY3RJZDogXCJtYWdtby1hYzEwY1wiLFxuLy8gICAgIHN0b3JhZ2VCdWNrZXQ6IFwibWFnbW8tYWMxMGMuYXBwc3BvdC5jb21cIixcbi8vICAgICBtZXNzYWdpbmdTZW5kZXJJZDogXCIxNzc4NTc1MjUxNDdcIixcbi8vICAgICBhcHBJZDogXCIxOjE3Nzg1NzUyNTE0Nzp3ZWI6YWM4ZTNjODdkODIzOTZiZWIxZGQzZVwiLFxuLy8gICAgIG1lYXN1cmVtZW50SWQ6IFwiRy1MMDIzNkpUNU4zXCJcbi8vIH0pXG5cbi8vIGV4cG9ydCBjb25zdCBhdXRoID0gYXBwLmF1dGgoKVxuLy8gZXhwb3J0IGRlZmF1bHQgYXBwXG5cbi8vIGFwaUtleTogcHJvY2Vzcy5lbnYuUkVBQ1RfQVBQX0ZJUkVCQVNFX0tFWSxcbi8vICAgICBhdXRoRG9tYWluOiBwcm9jZXNzLmVudi5SRUFDVF9BUFBfRklSRUJBU0VfQVVUSF9ET01BSU4sXG4vLyAgICAgcHJvamVjdElkOiBwcm9jZXNzLmVudi5SRUFDVF9BUFBfRklSRUJBU0VfUFJPSkVDVF9JRCxcbi8vICAgICBzdG9yYWdlQnVja2V0OiBwcm9jZXNzLmVudi5SRUFDVF9BUFBfRklSRUJBU0VfU1RPUkFHRV9CVUNLRVQsXG4vLyAgICAgbWVzc2FnaW5nU2VuZGVySWQ6IHByb2Nlc3MuZW52LlJFQUNUX0FQUF9GSVJFQkFTRV9NRVNTQUdJTkdfU0VOREVSX0lELFxuLy8gICAgIGFwcElkOiBwcm9jZXNzLmVudi5SRUFDVF9BUFBfRklSRUJBU0VfQVBQX0lELFxuLy8gICAgIG1lYXN1cmVtZW50SWQ6IHByb2Nlc3MuZW52LlJFQUNUX0FQUF9GSVJFQkFTRV9NRUFTVVJFTUVOVF9JRFxuXG5pbXBvcnQgRmlyZWJhc2UgZnJvbSBcImZpcmViYXNlL2NvbXBhdC9hcHBcIjtcbmltcG9ydCBcImZpcmViYXNlL2NvbXBhdC9hdXRoXCI7XG5pbXBvcnQgXCJmaXJlYmFzZS9jb21wYXQvZmlyZXN0b3JlXCI7XG5pbXBvcnQgXCJmaXJlYmFzZS9jb21wYXQvc3RvcmFnZVwiO1xuXG5jb25zdCBGaXJlYmFzZUNyZWRlbnRpYWxzID0ge1xuICBhcGlLZXk6IFwiQUl6YVN5Q3hDLWE4YjVWaGhleThHRjQ3THBYWjFhTUtZbWlJaHdFXCIsXG4gIGF1dGhEb21haW46XG4gICAgdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWUgPT09IFwibG9jYWxob3N0XCJcbiAgICAgID8gXCJtYWdtby1hYzEwYy5maXJlYmFzZWFwcC5jb21cIlxuICAgICAgOiBcIm1hZ21vLWNsb3VkLndlYi5hcHBcIixcbiAgcHJvamVjdElkOiBcIm1hZ21vLWFjMTBjXCIsXG4gIHN0b3JhZ2VCdWNrZXQ6IFwibWFnbW8tYWMxMGMuYXBwc3BvdC5jb21cIixcbiAgbWVzc2FnaW5nU2VuZGVySWQ6IFwiMTc3ODU3NTI1MTQ3XCIsXG4gIGFwcElkOiBcIjE6MTc3ODU3NTI1MTQ3OndlYjphYzhlM2M4N2Q4MjM5NmJlYjFkZDNlXCIsXG4gIG1lYXN1cmVtZW50SWQ6IFwiRy1MMDIzNkpUNU4zXCIsXG59O1xuLy8gaWYgYSBGaXJlYmFzZSBpbnN0YW5jZSBkb2Vzbid0IGV4aXN0LCBjcmVhdGUgb25lXG5pZiAoIUZpcmViYXNlLmFwcHMubGVuZ3RoKSB7XG4gIEZpcmViYXNlLmluaXRpYWxpemVBcHAoRmlyZWJhc2VDcmVkZW50aWFscyk7XG59XG5cbmV4cG9ydCBjb25zdCBhdXRoID0gRmlyZWJhc2UuYXV0aCgpO1xuZXhwb3J0IGRlZmF1bHQgRmlyZWJhc2U7XG5cbi8vIGltcG9ydCB7IGluaXRpYWxpemVBcHAgfSBmcm9tICdmaXJlYmFzZS9hcHAnO1xuLy8gaW1wb3J0IHsgZ2V0RmlyZXN0b3JlLCBjb2xsZWN0aW9uLCBnZXREb2NzIH0gZnJvbSAnZmlyZWJhc2UvZmlyZXN0b3JlJztcblxuLy8gY29uc3QgYXBwID0gaW5pdGlhbGl6ZUFwcChmaXJlYmFzZUNvbmZpZyk7XG4vLyBjb25zdCBkYiA9IGdldEZpcmVzdG9yZShhcHApO1xuXG4vLyBleHBvcnQgZGVmYXVsdCBhcHA7XG4iLCJpbXBvcnQgeyBpbml0aWFsaXplQXBwLCBnZXRBcHBzLCBjZXJ0IH0gZnJvbSBcImZpcmViYXNlLWFkbWluL2FwcFwiO1xuaW1wb3J0IHsgZ2V0RmlyZXN0b3JlIH0gZnJvbSBcImZpcmViYXNlLWFkbWluL2ZpcmVzdG9yZVwiO1xuXG4vLyBJbXBvcnQgRmlyZWJhc2UgRnVuY3Rpb25zIGZvciBjb25maWcgYWNjZXNzXG5sZXQgZnVuY3Rpb25zO1xudHJ5IHtcbiAgZnVuY3Rpb25zID0gcmVxdWlyZShcImZpcmViYXNlLWZ1bmN0aW9uc1wiKTtcbn0gY2F0Y2ggKGVycm9yKSB7XG4gIC8vIE5vdCBydW5uaW5nIGluIEZpcmViYXNlIEZ1bmN0aW9ucyBlbnZpcm9ubWVudFxuICBmdW5jdGlvbnMgPSBudWxsO1xufVxuXG4vLyBJbml0aWFsaXplIEZpcmViYXNlIEFkbWluIGlmIGl0IGhhc24ndCBiZWVuIGluaXRpYWxpemVkXG5pZiAoIWdldEFwcHMoKS5sZW5ndGgpIHtcbiAgLy8gT25seSBpbml0aWFsaXplIGlmIHdlIGhhdmUgdmFsaWQgY3JlZGVudGlhbHNcbiAgY29uc3QgY2xpZW50RW1haWwgPVxuICAgIHByb2Nlc3MuZW52LkZJUkVCQVNFX0NMSUVOVF9FTUFJTCB8fFxuICAgIHByb2Nlc3MuZW52LkZJUkVCQVNFX0ZVTkNUSU9OU19DTElFTlRfRU1BSUwgfHxcbiAgICBwcm9jZXNzLmVudi5GSVJFQkFTRV9BRE1JTl9DTElFTlRfRU1BSUwgfHxcbiAgICAoZnVuY3Rpb25zID8gZnVuY3Rpb25zLmNvbmZpZygpLmFkbWluPy5jbGllbnRfZW1haWwgfHwgZnVuY3Rpb25zLmNvbmZpZygpLnNzcj8uZmlyZWJhc2VfY2xpZW50X2VtYWlsIDogdW5kZWZpbmVkKTtcblxuICBjb25zdCBwcml2YXRlS2V5ID1cbiAgICBwcm9jZXNzLmVudi5GSVJFQkFTRV9QUklWQVRFX0tFWSB8fFxuICAgIHByb2Nlc3MuZW52LkZJUkVCQVNFX0ZVTkNUSU9OU19QUklWQVRFX0tFWSB8fFxuICAgIHByb2Nlc3MuZW52LkZJUkVCQVNFX0FETUlOX1BSSVZBVEVfS0VZIHx8XG4gICAgKGZ1bmN0aW9ucyA/IGZ1bmN0aW9ucy5jb25maWcoKS5hZG1pbj8ucHJpdmF0ZV9rZXkgfHwgZnVuY3Rpb25zLmNvbmZpZygpLnNzcj8uZmlyZWJhc2VfcHJpdmF0ZV9rZXkgOiB1bmRlZmluZWQpO1xuXG4gIGlmIChjbGllbnRFbWFpbCAmJiBwcml2YXRlS2V5KSB7XG4gICAgdHJ5IHtcbiAgICAgIGluaXRpYWxpemVBcHAoe1xuICAgICAgICBjcmVkZW50aWFsOiBjZXJ0KHtcbiAgICAgICAgICBwcm9qZWN0SWQ6IFwibWFnbW8tYWMxMGNcIixcbiAgICAgICAgICBjbGllbnRFbWFpbDogY2xpZW50RW1haWwsXG4gICAgICAgICAgcHJpdmF0ZUtleTogcHJpdmF0ZUtleS5yZXBsYWNlKC9cXFxcbi9nLCBcIlxcblwiKSxcbiAgICAgICAgfSksXG4gICAgICAgIGRhdGFiYXNlVVJMOiBcImh0dHBzOi8vbWFnbW8tYWMxMGMuZmlyZWJhc2Vpby5jb21cIixcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLndhcm4oXCJGaXJlYmFzZSBBZG1pbiBpbml0aWFsaXphdGlvbiBmYWlsZWQ6XCIsIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgLy8gRG9uJ3QgdGhyb3cgZXJyb3IgZHVyaW5nIGJ1aWxkIHByb2Nlc3NcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgY29uc29sZS53YXJuKFxuICAgICAgXCJGaXJlYmFzZSBBZG1pbiBjcmVkZW50aWFscyBub3QgYXZhaWxhYmxlLCBza2lwcGluZyBpbml0aWFsaXphdGlvblwiXG4gICAgKTtcbiAgfVxufVxuXG4vLyBPbmx5IGV4cG9ydCBGaXJlc3RvcmUgaWYgRmlyZWJhc2UgQWRtaW4gaXMgcHJvcGVybHkgaW5pdGlhbGl6ZWRcbmxldCBhZG1pbkRiID0gbnVsbDtcbnRyeSB7XG4gIGlmIChnZXRBcHBzKCkubGVuZ3RoID4gMCkge1xuICAgIGFkbWluRGIgPSBnZXRGaXJlc3RvcmUoKTtcbiAgfVxufSBjYXRjaCAoZXJyb3IpIHtcbiAgY29uc29sZS53YXJuKFwiRmlyZWJhc2UgQWRtaW4gbm90IGF2YWlsYWJsZTpcIiwgZXJyb3IubWVzc2FnZSk7XG59XG5cbmV4cG9ydCB7IGFkbWluRGIgfTtcbmV4cG9ydCBkZWZhdWx0IGFkbWluRGI7XG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSBcIm5leHQvcm91dGVyXCI7XG5pbXBvcnQge1xuICBUYWJsZSxcbiAgQnV0dG9uLFxuICBDb250YWluZXIsXG4gIENhcmQsXG4gIFJvdyxcbiAgQ29sLFxuICBBbGVydCxcbn0gZnJvbSBcInJlYWN0LWJvb3RzdHJhcFwiO1xuaW1wb3J0IGZpcmViYXNlIGZyb20gXCIuLi8uLi8uLi8uLi9jb250ZXh0L0ZpcmViYXNlXCI7XG5cbi8vIEltcG9ydCBmb3IgU1NSXG5pbXBvcnQgeyBhZG1pbkRiIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvbnRleHQvRmlyZWJhc2VBZG1pblwiO1xuXG5jb25zdCBNYWNoaW5lID0gKCkgPT4ge1xuICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcbiAgY29uc3QgW3NlbGVjdGVkTWFjaGluZSwgc2V0U2VsZWN0ZWRNYWNoaW5lXSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbYXNzb2NpYXRlZFBhcnRzLCBzZXRBc3NvY2lhdGVkUGFydHNdID0gdXNlU3RhdGUoW10pO1xuICBjb25zdCBbZXJyb3IsIHNldEVycm9yXSA9IHVzZVN0YXRlKG51bGwpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKHJvdXRlci5pc1JlYWR5KSB7XG4gICAgICBjb25zdCB7IG1hY2hpbmVJZCB9ID0gcm91dGVyLnF1ZXJ5O1xuICAgICAgaWYgKCFtYWNoaW5lSWQpIHtcbiAgICAgICAgY29uc3QgcGF0aFNlZ21lbnRzID0gcm91dGVyLmFzUGF0aC5zcGxpdChcIi9cIik7XG4gICAgICAgIGNvbnN0IG1hY2hpbmVJZEZyb21QYXRoID0gcGF0aFNlZ21lbnRzW3BhdGhTZWdtZW50cy5sZW5ndGggLSAxXTtcbiAgICAgICAgY29uc29sZS5sb2coYE1hY2hpbmUgSUQgZXh0cmFjdGVkIGZyb20gVVJMIHBhdGg6ICR7bWFjaGluZUlkRnJvbVBhdGh9YCk7XG4gICAgICAgIGZldGNoTWFjaGluZURhdGEobWFjaGluZUlkRnJvbVBhdGgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coYE1hY2hpbmUgSUQgZnJvbSByb3V0ZXIgcXVlcnk6ICR7bWFjaGluZUlkfWApO1xuICAgICAgICBmZXRjaE1hY2hpbmVEYXRhKG1hY2hpbmVJZCk7XG4gICAgICB9XG4gICAgfVxuICB9LCBbcm91dGVyLmlzUmVhZHldKTtcblxuICBjb25zdCBmZXRjaE1hY2hpbmVEYXRhID0gYXN5bmMgKG1hY2hpbmVJZCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zb2xlLmxvZyhgQXR0ZW1wdGluZyB0byBmZXRjaCBtYWNoaW5lIGRhdGEgZm9yIElEOiAke21hY2hpbmVJZH1gKTtcbiAgICAgIGNvbnN0IGRiID0gZmlyZWJhc2UuZmlyZXN0b3JlKCk7XG4gICAgICBjb25zdCBtYWNoaW5lRG9jID0gYXdhaXQgZGIuY29sbGVjdGlvbihcIk1hY2hpbmVcIikuZG9jKG1hY2hpbmVJZCkuZ2V0KCk7XG4gICAgICBpZiAobWFjaGluZURvYy5leGlzdHMpIHtcbiAgICAgICAgY29uc3QgbWFjaGluZURhdGEgPSBtYWNoaW5lRG9jLmRhdGEoKTtcbiAgICAgICAgc2V0U2VsZWN0ZWRNYWNoaW5lKG1hY2hpbmVEYXRhKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJNYWNoaW5lIGRhdGE6XCIsIG1hY2hpbmVEYXRhKTtcblxuICAgICAgICAvLyBGZXRjaCBhc3NvY2lhdGVkIHBhcnRzXG4gICAgICAgIGlmIChtYWNoaW5lRGF0YS5hc3NvY2lhdGVkUGFydHMpIHtcbiAgICAgICAgICBmZXRjaEFzc29jaWF0ZWRQYXJ0cyhtYWNoaW5lRGF0YS5hc3NvY2lhdGVkUGFydHMpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiTWFjaGluZSBub3QgZm91bmRcIik7XG4gICAgICAgIHNldEVycm9yKFwiTWFjaGluZSBub3QgZm91bmRcIik7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBmZXRjaGluZyBtYWNoaW5lIGRhdGE6XCIsIGVycm9yKTtcbiAgICAgIHNldEVycm9yKFwiRXJyb3IgZmV0Y2hpbmcgbWFjaGluZSBkYXRhXCIpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBmZXRjaEFzc29jaWF0ZWRQYXJ0cyA9IGFzeW5jIChhc3NvY2lhdGVkUGFydHNSZWZzKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGRiID0gZmlyZWJhc2UuZmlyZXN0b3JlKCk7XG4gICAgICBjb25zdCBwYXJ0c0RvY3MgPSBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgICAgYXNzb2NpYXRlZFBhcnRzUmVmcy5tYXAoKHJlZikgPT4gcmVmLmdldCgpKVxuICAgICAgKTtcblxuICAgICAgY29uc3QgcGFydHNEYXRhID0gYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICAgIHBhcnRzRG9jcy5tYXAoYXN5bmMgKGRvYykgPT4ge1xuICAgICAgICAgIGlmICghZG9jLmV4aXN0cykge1xuICAgICAgICAgICAgLy8gc2tpcCBvciByZXR1cm4gYW4gZW1wdHkgb2JqZWN0XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgZGF0YSA9IGRvYy5kYXRhKCkgfHwge307XG4gICAgICAgICAgbGV0IGNsaWVudE5hbWUgPSBcIlwiO1xuICAgICAgICAgIGlmIChkYXRhLkNsaWVudEZyb20/LmdldCkge1xuICAgICAgICAgICAgY29uc3QgY2xpZW50RG9jID0gYXdhaXQgZGF0YS5DbGllbnRGcm9tLmdldCgpO1xuICAgICAgICAgICAgY2xpZW50TmFtZSA9IGNsaWVudERvYy5leGlzdHMgPyBjbGllbnREb2MuZGF0YSgpLm5hbWUgOiBcIlwiO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4geyBpZDogZG9jLmlkLCAuLi5kYXRhLCBjbGllbnROYW1lIH07XG4gICAgICAgIH0pXG4gICAgICApO1xuXG4gICAgICBzZXRBc3NvY2lhdGVkUGFydHMocGFydHNEYXRhLmZpbHRlcigocCkgPT4gcCkpO1xuICAgICAgY29uc29sZS5sb2coXCJBc3NvY2lhdGVkIHBhcnRzIGRhdGE6XCIsIHBhcnRzRGF0YSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBmZXRjaGluZyBhc3NvY2lhdGVkIHBhcnRzOlwiLCBlcnJvcik7XG4gICAgICBzZXRFcnJvcihcIkVycm9yIGZldGNoaW5nIGFzc29jaWF0ZWQgcGFydHNcIik7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVByaW50TXVsdGkgPSBhc3luYyAoKSA9PiB7XG4gICAgLy8gQ3JlYXRlIHlvdXIgcGF5bG9hZCB3aXRoIHRoZSBtYXBwZWQgaXRlbXMuXG4gICAgLy8gUmVwbGFjZSAnYXNzb2NpYXRlZFBhcnRzJyB3aXRoIHlvdXIgYWN0dWFsIHZhcmlhYmxlIGNvbnRhaW5pbmcgdGhlIGxpc3QuXG4gICAgY29uc3QgcGF5bG9hZCA9IHtcbiAgICAgIGl0ZW1zOiBhc3NvY2lhdGVkUGFydHMubWFwKChwYXJ0KSA9PiAoe1xuICAgICAgICBuYW1lOiBwYXJ0Lm5hbWUsXG4gICAgICAgIGFycml2YWxfZGF0ZTogcGFydC5hcnJpdmFsX2RhdGUsIC8vIEVuc3VyZSB5b3VyIHBhcnQgaGFzIGEgJ2RhdGUnIGZpZWxkLlxuICAgICAgICBwb051bWJlcjogcGFydC5wb051bWJlciB8fCBcIlwiLFxuICAgICAgICBPRU06IHBhcnQuVGhlTWFjaGluZSA/IHBhcnQuVGhlTWFjaGluZS5vZW0gfHwgXCJcIiA6IFwiXCIsXG4gICAgICAgIG1vZGFsaXR5OiBwYXJ0LlRoZU1hY2hpbmUgPyBwYXJ0LlRoZU1hY2hpbmUubW9kYWxpdHkgfHwgXCJcIiA6IFwiXCIsXG4gICAgICAgIG1vZGVsOiBwYXJ0LlRoZU1hY2hpbmUgPyBwYXJ0LlRoZU1hY2hpbmUubW9kZWwgfHwgXCJcIiA6IFwiXCIsXG4gICAgICAgIGxvY2FsX3NuOiBwYXJ0LmlkLCAvLyBVc2luZyBkb2N1bWVudCBpZCBhcyB0aGUgbG9jYWwgc2VyaWFsIG51bWJlci5cbiAgICAgICAgY2xpZW50OiBwYXJ0LmNsaWVudE5hbWUgfHwgXCJcIixcbiAgICAgICAgZGVzY3JpcHRpb246XG4gICAgICAgICAgcGFydC5kZXNjcmlwdGlvbiB8fFxuICAgICAgICAgIChwYXJ0LmRlc2NyaXB0aW9ucyAmJiBwYXJ0LmRlc2NyaXB0aW9ucy5sZW5ndGggPiAwXG4gICAgICAgICAgICA/IHBhcnQuZGVzY3JpcHRpb25zWzBdLmRlc2NyaXB0aW9uXG4gICAgICAgICAgICA6IFwiXCIpLFxuICAgICAgfSkpLFxuICAgICAgdGVzdF9wcmludDogdHJ1ZSwgLy8gSGFyZC1jb2RlZCBoZXJlIGlmIHlvdSB3YW50IHRvIHRlc3QgcHJpbnRpbmcgb25lIGl0ZW1cbiAgICAgIGluZGV4OiAxLCAvLyBIYXJkLWNvZGVkIGluZGV4ICgxLWJhc2VkKVxuICAgIH07XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcbiAgICAgICAgXCJodHRwczovLzlkNzAtMTc0LTc2LTIyLTEzOC5uZ3Jvay1mcmVlLmFwcC9wcmludF9tdWx0aVwiLFxuICAgICAgICB7XG4gICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXG4gICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGF5bG9hZCksXG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICBjb25zb2xlLmxvZyhcIlByaW50IG11bHRpIHJlc3VsdDpcIiwgcmVzdWx0LnN0YXR1cyk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBwcmludGluZyBtdWx0aXBsZSBsYWJlbHM6XCIsIGVycm9yKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlU2VsZWN0UGFydCA9IChpZCwgbmFtZSkgPT4ge1xuICAgIGNvbnNvbGUubG9nKGBTZWxlY3RlZCBwYXJ0IElEOiAke2lkfSwgTmFtZTogJHtuYW1lfWApO1xuICAgIHJvdXRlci5wdXNoKFwiLi4vaXRlbS9cIiArIGlkKTtcbiAgfTtcblxuICBjb25zdCBmb3JtYXREYXRlID0gKGlucHV0KSA9PiB7XG4gICAgbGV0IGRhdGU7XG5cbiAgICBpZiAoaW5wdXQgJiYgaW5wdXQuc2Vjb25kcykge1xuICAgICAgLy8gSGFuZGxlIHRpbWVzdGFtcCBvYmplY3Qgd2l0aCAnc2Vjb25kcycgcHJvcGVydHlcbiAgICAgIGRhdGUgPSBuZXcgRGF0ZShpbnB1dC5zZWNvbmRzICogMTAwMCk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgaW5wdXQgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIC8vIEhhbmRsZSBkYXRlIHN0cmluZ1xuICAgICAgZGF0ZSA9IG5ldyBEYXRlKGlucHV0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFwiTi9BXCI7XG4gICAgfVxuXG4gICAgaWYgKGlzTmFOKGRhdGUuZ2V0VGltZSgpKSkge1xuICAgICAgLy8gSW52YWxpZCBkYXRlIHN0cmluZ1xuICAgICAgcmV0dXJuIFwiSW52YWxpZCBEYXRlXCI7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRhdGUudG9Mb2NhbGVEYXRlU3RyaW5nKCk7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8Q29udGFpbmVyIGNsYXNzTmFtZT1cIm10LTVcIj5cbiAgICAgIDxSb3cgY2xhc3NOYW1lPVwianVzdGlmeS1jb250ZW50LW1kLWNlbnRlclwiPlxuICAgICAgICA8Q29sIG1kPVwiOFwiPlxuICAgICAgICAgIDxDYXJkPlxuICAgICAgICAgICAgPENhcmQuSGVhZGVyPlxuICAgICAgICAgICAgICA8aDQ+TWFjaGluZSBEZXRhaWxzPC9oND5cbiAgICAgICAgICAgIDwvQ2FyZC5IZWFkZXI+XG4gICAgICAgICAgICA8Q2FyZC5Cb2R5PlxuICAgICAgICAgICAgICB7ZXJyb3IgJiYgPEFsZXJ0IHZhcmlhbnQ9XCJkYW5nZXJcIj57ZXJyb3J9PC9BbGVydD59XG4gICAgICAgICAgICAgIHtzZWxlY3RlZE1hY2hpbmUgPyAoXG4gICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgIDxoNT5NYWNoaW5lOiB7c2VsZWN0ZWRNYWNoaW5lLm5hbWV9PC9oNT5cbiAgICAgICAgICAgICAgICAgIDxwPk1vZGVsOiB7c2VsZWN0ZWRNYWNoaW5lLk1vZGVsfTwvcD5cbiAgICAgICAgICAgICAgICAgIDxwPk1vZGVsOiB7c2VsZWN0ZWRNYWNoaW5lLk1vZGFsaXR5fTwvcD5cbiAgICAgICAgICAgICAgICAgIDxwPk1vZGVsOiB7c2VsZWN0ZWRNYWNoaW5lLk9FTX08L3A+XG4gICAgICAgICAgICAgICAgICA8cD5MYXN0IFBNOiB7Zm9ybWF0RGF0ZShzZWxlY3RlZE1hY2hpbmUubGFzdFBNKX08L3A+XG4gICAgICAgICAgICAgICAgICA8cD5OZXh0IFBNOiB7Zm9ybWF0RGF0ZShzZWxlY3RlZE1hY2hpbmUubmV4dFBNKX08L3A+XG4gICAgICAgICAgICAgICAgICA8aDU+QXNzb2NpYXRlZCBQYXJ0czwvaDU+XG4gICAgICAgICAgICAgICAgICA8VGFibGUgc3RyaXBlZCBib3JkZXJlZCBob3ZlciBzaXplPVwic21cIj5cbiAgICAgICAgICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5OYW1lPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5JRDwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGg+UGFydCBOdW1iZXI8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoPlNlcmlhbCBOdW1iZXI8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoPkRhdGU8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoPlNlbGVjdDwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgICAgICAgIHthc3NvY2lhdGVkUGFydHMubWFwKChwYXJ0KSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8dHIga2V5PXtwYXJ0LmlkfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPntwYXJ0Lm5hbWV9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPntwYXJ0LmlkfTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD57cGFydC5wbn08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+e3BhcnQuc259PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPntwYXJ0LmRhdGV9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhbnQ9XCJwcmltYXJ5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZVNlbGVjdFBhcnQocGFydC5pZCwgcGFydC5uYW1lKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNlbGVjdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29sU3Bhbj1cIjVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyB0ZXh0QWxpZ246IFwiY2VudGVyXCIsIHBhZGRpbmdUb3A6IFwiMjBweFwiIH19XG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXJpYW50PVwic2Vjb25kYXJ5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVQcmludE11bHRpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUHJpbnQgQWxsIEl0ZW1zXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICAgIHsvKiA8Q29sIG1kPXs0fT4gKi99XG4gICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFudD1cInByaW1hcnlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgbWFyZ2luVG9wOiBcIjIwcHhcIiB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gcm91dGVyLmJhY2soKX1cbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICBiYWNrXG4gICAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgey8qIDwvQ29sPiAqL31cbiAgICAgICAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgICAgICAgIDwvVGFibGU+XG4gICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgIWVycm9yICYmIDxwPkxvYWRpbmcgbWFjaGluZSBkYXRhLi4uPC9wPlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9DYXJkLkJvZHk+XG4gICAgICAgICAgPC9DYXJkPlxuICAgICAgICA8L0NvbD5cbiAgICAgIDwvUm93PlxuICAgIDwvQ29udGFpbmVyPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgTWFjaGluZTtcblxuLy8gU2VydmVyLXNpZGUgcmVuZGVyaW5nIGZ1bmN0aW9uXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0U2VydmVyU2lkZVByb3BzKGNvbnRleHQpIHtcbiAgY29uc3QgeyBpZCB9ID0gY29udGV4dC5wYXJhbXM7XG5cbiAgdHJ5IHtcbiAgICAvLyBGZXRjaCBtYWNoaW5lIGRhdGEgZnJvbSBGaXJlc3RvcmUgdXNpbmcgQWRtaW4gU0RLXG4gICAgY29uc3QgbWFjaGluZURvYyA9IGF3YWl0IGFkbWluRGIuY29sbGVjdGlvbihcIk1hY2hpbmVcIikuZG9jKGlkKS5nZXQoKTtcblxuICAgIGlmICghbWFjaGluZURvYy5leGlzdHMpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG5vdEZvdW5kOiB0cnVlLCAvLyBUaGlzIHdpbGwgc2hvdyBhIDQwNCBwYWdlXG4gICAgICB9O1xuICAgIH1cblxuICAgIGNvbnN0IG1hY2hpbmVEYXRhID0gbWFjaGluZURvYy5kYXRhKCk7XG5cbiAgICAvLyBGZXRjaCBhc3NvY2lhdGVkIHBhcnRzIGlmIHRoZXkgZXhpc3RcbiAgICBsZXQgYXNzb2NpYXRlZFBhcnRzID0gW107XG4gICAgaWYgKFxuICAgICAgbWFjaGluZURhdGEuYXNzb2NpYXRlZFBhcnRzICYmXG4gICAgICBBcnJheS5pc0FycmF5KG1hY2hpbmVEYXRhLmFzc29jaWF0ZWRQYXJ0cylcbiAgICApIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHBhcnRzUHJvbWlzZXMgPSBtYWNoaW5lRGF0YS5hc3NvY2lhdGVkUGFydHNcbiAgICAgICAgICAubWFwKChwYXJ0UmVmKSA9PiB7XG4gICAgICAgICAgICBpZiAocGFydFJlZi5wYXRoKSB7XG4gICAgICAgICAgICAgIHJldHVybiBhZG1pbkRiLmRvYyhwYXJ0UmVmLnBhdGgpLmdldCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuZmlsdGVyKEJvb2xlYW4pO1xuXG4gICAgICAgIGNvbnN0IHBhcnRzRG9jcyA9IGF3YWl0IFByb21pc2UuYWxsKHBhcnRzUHJvbWlzZXMpO1xuICAgICAgICBhc3NvY2lhdGVkUGFydHMgPSBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgICAgICBwYXJ0c0RvY3MubWFwKGFzeW5jIChkb2MpID0+IHtcbiAgICAgICAgICAgIGlmICghZG9jLmV4aXN0cykge1xuICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBkb2MuZGF0YSgpIHx8IHt9O1xuICAgICAgICAgICAgbGV0IGNsaWVudE5hbWUgPSBcIlwiO1xuXG4gICAgICAgICAgICAvLyBGZXRjaCBjbGllbnQgbmFtZSBpZiBDbGllbnRGcm9tIHJlZmVyZW5jZSBleGlzdHNcbiAgICAgICAgICAgIGlmIChkYXRhLkNsaWVudEZyb20gJiYgZGF0YS5DbGllbnRGcm9tLnBhdGgpIHtcbiAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjbGllbnREb2MgPSBhd2FpdCBhZG1pbkRiLmRvYyhkYXRhLkNsaWVudEZyb20ucGF0aCkuZ2V0KCk7XG4gICAgICAgICAgICAgICAgY2xpZW50TmFtZSA9IGNsaWVudERvYy5leGlzdHMgPyBjbGllbnREb2MuZGF0YSgpLm5hbWUgOiBcIlwiO1xuICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBmZXRjaGluZyBjbGllbnQgZGF0YTpcIiwgZXJyb3IpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIGlkOiBkb2MuaWQsXG4gICAgICAgICAgICAgIC4uLmRhdGEsXG4gICAgICAgICAgICAgIGNsaWVudE5hbWUsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0pXG4gICAgICAgICk7XG5cbiAgICAgICAgLy8gRmlsdGVyIG91dCBudWxsIHZhbHVlc1xuICAgICAgICBhc3NvY2lhdGVkUGFydHMgPSBhc3NvY2lhdGVkUGFydHMuZmlsdGVyKChwYXJ0KSA9PiBwYXJ0ICE9PSBudWxsKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBmZXRjaGluZyBhc3NvY2lhdGVkIHBhcnRzOlwiLCBlcnJvcik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gU2VyaWFsaXplIHRoZSBtYWNoaW5lIGRhdGEsIHJlbW92aW5nIGFueSBub24tc2VyaWFsaXphYmxlIGZpZWxkc1xuICAgIGNvbnN0IHNlcmlhbGl6ZWRNYWNoaW5lID0ge1xuICAgICAgaWQsXG4gICAgICBuYW1lOiBtYWNoaW5lRGF0YS5uYW1lIHx8IFwiXCIsXG4gICAgICBNb2RlbDogbWFjaGluZURhdGEuTW9kZWwgfHwgXCJcIixcbiAgICAgIE9FTTogbWFjaGluZURhdGEuT0VNIHx8IFwiXCIsXG4gICAgICBNb2RhbGl0eTogbWFjaGluZURhdGEuTW9kYWxpdHkgfHwgXCJcIixcbiAgICAgIGxhc3RQTTogbWFjaGluZURhdGEubGFzdFBNIHx8IG51bGwsXG4gICAgICBuZXh0UE06IG1hY2hpbmVEYXRhLm5leHRQTSB8fCBudWxsLFxuICAgICAgLy8gQWRkIG90aGVyIG1hY2hpbmUgZmllbGRzIGFzIG5lZWRlZCwgYnV0IGVuc3VyZSB0aGV5J3JlIHNlcmlhbGl6YWJsZVxuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgcHJvcHM6IHtcbiAgICAgICAgaW5pdGlhbE1hY2hpbmU6IHNlcmlhbGl6ZWRNYWNoaW5lLFxuICAgICAgICBpbml0aWFsQXNzb2NpYXRlZFBhcnRzOiBhc3NvY2lhdGVkUGFydHMsXG4gICAgICB9LFxuICAgIH07XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIGluIGdldFNlcnZlclNpZGVQcm9wczpcIiwgZXJyb3IpO1xuICAgIHJldHVybiB7XG4gICAgICBwcm9wczoge1xuICAgICAgICBlcnJvcjogXCJGYWlsZWQgdG8gbG9hZCBtYWNoaW5lIGRhdGFcIixcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZmlyZWJhc2UtYWRtaW4vYXBwXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZpcmViYXNlLWFkbWluL2ZpcmVzdG9yZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmaXJlYmFzZS1mdW5jdGlvbnNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZmlyZWJhc2UvY29tcGF0L2FwcFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmaXJlYmFzZS9jb21wYXQvYXV0aFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmaXJlYmFzZS9jb21wYXQvZmlyZXN0b3JlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZpcmViYXNlL2NvbXBhdC9zdG9yYWdlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5leHQvcm91dGVyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LWJvb3RzdHJhcFwiKTsiXSwic291cmNlUm9vdCI6IiJ9