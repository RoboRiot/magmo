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
/******/ 	return __webpack_require__(__webpack_require__.s = "./pages/NewSearch/client/[id]/index.js");
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

/***/ "./pages/NewSearch/ClientInfoModal.js":
/*!********************************************!*\
  !*** ./pages/NewSearch/ClientInfoModal.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-bootstrap */ "react-bootstrap");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__);
var _jsxFileName = "C:\\Users\\mack2\\Desktop\\code\\pages\\NewSearch\\ClientInfoModal.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;
// ClientInfoModal.js



const ClientInfoModal = ({
  show,
  handleClose,
  selectedClient,
  machineOptions = [],
  setSelectedMachine
}) => {
  // Add warehouse options here
  // const warehouseOptions = [
  //   { id: "warehouse-socal", name: "SoCalWarehouse", local: "" },
  //   { id: "warehouse-norcal", name: "NorCalWarehouse", local: "" },
  // ];
  return __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"], {
    show: show,
    onHide: handleClose,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19,
      columnNumber: 5
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Header, {
    closeButton: true,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20,
      columnNumber: 7
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Title, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21,
      columnNumber: 9
    }
  }, "Select a Machine or Warehouse")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Body, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23,
      columnNumber: 7
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Table"], {
    striped: true,
    bordered: true,
    hover: true,
    size: "sm",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24,
      columnNumber: 9
    }
  }, __jsx("thead", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25,
      columnNumber: 11
    }
  }, __jsx("tr", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26,
      columnNumber: 13
    }
  }, __jsx("th", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27,
      columnNumber: 15
    }
  }, "Name"), __jsx("th", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28,
      columnNumber: 15
    }
  }, "Location"), __jsx("th", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29,
      columnNumber: 15
    }
  }, "Select"))), __jsx("tbody", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32,
      columnNumber: 11
    }
  }, machineOptions.map(machine => __jsx("tr", {
    key: machine.id,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 34,
      columnNumber: 15
    }
  }, __jsx("td", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 35,
      columnNumber: 17
    }
  }, machine.name), __jsx("td", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36,
      columnNumber: 17
    }
  }, machine.local), __jsx("td", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37,
      columnNumber: 17
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    variant: "primary",
    onClick: () => setSelectedMachine(machine),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38,
      columnNumber: 19
    }
  }, "Select"))))))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Footer, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 64,
      columnNumber: 7
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    variant: "secondary",
    onClick: handleClose,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 65,
      columnNumber: 9
    }
  }, "Close")));
};

/* harmony default export */ __webpack_exports__["default"] = (ClientInfoModal);

/***/ }),

/***/ "./pages/NewSearch/MachineCreationModal.js":
/*!*************************************************!*\
  !*** ./pages/NewSearch/MachineCreationModal.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-bootstrap */ "react-bootstrap");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__);
var _jsxFileName = "C:\\Users\\mack2\\Desktop\\code\\pages\\NewSearch\\MachineCreationModal.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




const MachineCreationModal = ({
  show,
  handleClose,
  onCreateMachine
}) => {
  const {
    0: newMachine,
    1: setNewMachine
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    name: "",
    OEM: "",
    Modality: "",
    Model: "",
    local: "",
    lastPM: "",
    nextPM: ""
  });

  const handleChange = field => event => {
    const value = event.target.value;
    setNewMachine(prev => _objectSpread(_objectSpread({}, prev), {}, {
      [field]: value
    }));
  };

  const handleCreate = () => {
    onCreateMachine(newMachine);
    setNewMachine({
      name: "",
      OEM: "",
      Modality: "",
      Model: "",
      local: "",
      lastPM: "",
      nextPM: ""
    });
  };

  return __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"], {
    show: show,
    onHide: handleClose,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 34,
      columnNumber: 5
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Header, {
    closeButton: true,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 35,
      columnNumber: 7
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Title, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36,
      columnNumber: 9
    }
  }, "Create New Machine")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Body, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38,
      columnNumber: 7
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 39,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Group, {
    controlId: "machineName",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 40,
      columnNumber: 11
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Label, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 41,
      columnNumber: 13
    }
  }, "Name"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Control, {
    type: "text",
    placeholder: "Enter machine name",
    value: newMachine.name,
    onChange: handleChange("name"),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 42,
      columnNumber: 13
    }
  })), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Group, {
    controlId: "OEM",
    className: "mt-3",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 49,
      columnNumber: 11
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Label, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 50,
      columnNumber: 13
    }
  }, "OEM"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Control, {
    type: "text",
    placeholder: "Enter OEM",
    value: newMachine.OEM,
    onChange: handleChange("OEM"),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 51,
      columnNumber: 13
    }
  })), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Group, {
    controlId: "Modality",
    className: "mt-3",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 58,
      columnNumber: 11
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Label, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 59,
      columnNumber: 13
    }
  }, "Modality"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Control, {
    type: "text",
    placeholder: "Enter modality",
    value: newMachine.Modality,
    onChange: handleChange("Modality"),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 60,
      columnNumber: 13
    }
  })), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Group, {
    controlId: "Model",
    className: "mt-3",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 67,
      columnNumber: 11
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Label, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 68,
      columnNumber: 13
    }
  }, "Model"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Control, {
    type: "text",
    placeholder: "Enter model",
    value: newMachine.Model,
    onChange: handleChange("Model"),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 69,
      columnNumber: 13
    }
  })), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Group, {
    controlId: "local",
    className: "mt-3",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 76,
      columnNumber: 11
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Label, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 77,
      columnNumber: 13
    }
  }, "Location"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Control, {
    type: "text",
    placeholder: "Enter location",
    value: newMachine.local,
    onChange: handleChange("local"),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 78,
      columnNumber: 13
    }
  })), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Group, {
    controlId: "lastPM",
    className: "mt-3",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 85,
      columnNumber: 11
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Label, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 86,
      columnNumber: 13
    }
  }, "Last PM"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Control, {
    type: "date",
    placeholder: "Enter last PM date",
    value: newMachine.lastPM,
    onChange: handleChange("lastPM"),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 87,
      columnNumber: 13
    }
  })), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Group, {
    controlId: "nextPM",
    className: "mt-3",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 94,
      columnNumber: 11
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Label, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 95,
      columnNumber: 13
    }
  }, "next PM"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Control, {
    type: "date",
    placeholder: "Enter next PM date",
    value: newMachine.nextPM,
    onChange: handleChange("nextPM"),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 96,
      columnNumber: 13
    }
  })))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Footer, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 105,
      columnNumber: 7
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    variant: "secondary",
    onClick: handleClose,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 106,
      columnNumber: 9
    }
  }, "Close"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    variant: "primary",
    onClick: handleCreate,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 109,
      columnNumber: 9
    }
  }, "Add Machine")));
};

/* harmony default export */ __webpack_exports__["default"] = (MachineCreationModal);

/***/ }),

/***/ "./pages/NewSearch/client/[id]/index.js":
/*!**********************************************!*\
  !*** ./pages/NewSearch/client/[id]/index.js ***!
  \**********************************************/
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
/* harmony import */ var _ClientInfoModal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../ClientInfoModal */ "./pages/NewSearch/ClientInfoModal.js");
/* harmony import */ var _MachineCreationModal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../MachineCreationModal */ "./pages/NewSearch/MachineCreationModal.js");
/* harmony import */ var _context_FirebaseAdmin__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../context/FirebaseAdmin */ "./context/FirebaseAdmin.js");
var _jsxFileName = "C:\\Users\\mack2\\Desktop\\code\\pages\\NewSearch\\client\\[id]\\index.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






 // Import for SSR



const Client = () => {
  const router = Object(next_router__WEBPACK_IMPORTED_MODULE_1__["useRouter"])();
  const {
    0: selectedClient,
    1: setSelectedClient
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null);
  const {
    0: machineOptions,
    1: setMachineOptions
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const {
    0: error,
    1: setError
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null); // State for machine addition modals

  const {
    0: showAddMachineModal,
    1: setShowAddMachineModal
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const {
    0: showCreateMachineModal,
    1: setShowCreateMachineModal
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const {
    0: availableMachines,
    1: setAvailableMachines
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    if (router.isReady) {
      const {
        clientId
      } = router.query; // Extract clientId from query or URL path

      const id = clientId || router.asPath.split("/").pop();
      fetchClientData(id);
    }
  }, [router.isReady]);

  const fetchClientData = async clientId => {
    try {
      const db = _context_Firebase__WEBPACK_IMPORTED_MODULE_3__["default"].firestore();
      const clientDoc = await db.collection("Client").doc(clientId).get();

      if (clientDoc.exists) {
        const clientData = clientDoc.data();
        setSelectedClient(clientData); // Fetch machine documents referenced in the client's machines array

        const machinePromises = clientData.machines.map(machineRef => machineRef.get());
        const machineDocs = await Promise.all(machinePromises);
        const machines = machineDocs.map(machineDoc => _objectSpread({
          id: machineDoc.id
        }, machineDoc.data()));
        setMachineOptions(machines);
      } else {
        setError("Client not found");
      }
    } catch (error) {
      console.error("Error fetching client data:", error);
      setError("Error fetching client data");
    }
  }; // Fetch available machines (those not yet assigned to a client)


  const fetchAvailableMachines = async () => {
    try {
      const db = _context_Firebase__WEBPACK_IMPORTED_MODULE_3__["default"].firestore();
      const snapshot = await db.collection("Machine").where("client", "==", null).get();
      const machines = snapshot.docs.map(doc => _objectSpread({
        id: doc.id
      }, doc.data()));
      setAvailableMachines(machines);
    } catch (error) {
      console.error("Error fetching available machines:", error);
      setError("Failed to fetch available machines.");
    }
  };

  const handleSelectMachine = (id, name) => {
    // Navigate to the machine details page if needed
    router.push("../machine/" + id);
  }; // When adding an existing machine


  const handleAddMachine = async machine => {
    try {
      const db = _context_Firebase__WEBPACK_IMPORTED_MODULE_3__["default"].firestore();
      const clientId = router.query.clientId || router.asPath.split("/").pop(); // Update client's "machines" array with the machine reference

      await db.collection("Client").doc(clientId).update({
        machines: _context_Firebase__WEBPACK_IMPORTED_MODULE_3__["default"].firestore.FieldValue.arrayUnion(db.collection("Machine").doc(machine.id))
      }); // Update local state to include the newly added machine

      setMachineOptions(prev => [...prev, machine]);
      setShowAddMachineModal(false);
    } catch (error) {
      console.error("Error adding machine to client:", error);
      setError("Failed to add machine to client.");
    }
  }; // When creating a new machine for the client


  const handleCreateMachine = async newMachine => {
    try {
      const db = _context_Firebase__WEBPACK_IMPORTED_MODULE_3__["default"].firestore();
      const clientId = router.query.clientId || router.asPath.split("/").pop();
      const machineId = `AIS${Math.floor(10000 + Math.random() * 90000)}`;

      const machineWithId = _objectSpread(_objectSpread({}, newMachine), {}, {
        id: machineId,
        client: db.collection("Client").doc(clientId)
      }); // Create the machine document


      await db.collection("Machine").doc(machineId).set(machineWithId); // Add the machine reference to the client

      await db.collection("Client").doc(clientId).update({
        machines: _context_Firebase__WEBPACK_IMPORTED_MODULE_3__["default"].firestore.FieldValue.arrayUnion(db.collection("Machine").doc(machineId))
      }); // Update local state

      setMachineOptions(prev => [...prev, _objectSpread({
        id: machineId
      }, newMachine)]);
      setShowCreateMachineModal(false);
    } catch (error) {
      console.error("Error creating and adding machine:", error);
      setError("Failed to create and add machine.");
    }
  }; // Open the modal to add an existing machine; fetch available machines first


  const openAddMachineModal = async () => {
    await fetchAvailableMachines();
    setShowAddMachineModal(true);
  };

  return __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Container"], {
    className: "mt-5",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 153,
      columnNumber: 5
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Row"], {
    className: "justify-content-md-center",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 154,
      columnNumber: 7
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], {
    md: "8",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 155,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Card"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 156,
      columnNumber: 11
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Card"].Header, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 157,
      columnNumber: 13
    }
  }, __jsx("h4", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 158,
      columnNumber: 15
    }
  }, "Client Machines")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Card"].Body, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 160,
      columnNumber: 13
    }
  }, error && __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Alert"], {
    variant: "danger",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 161,
      columnNumber: 25
    }
  }, error), selectedClient ? __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx("h5", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 164,
      columnNumber: 19
    }
  }, "Client: ", selectedClient.name), __jsx("p", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 165,
      columnNumber: 19
    }
  }, "Location: ", selectedClient.local), __jsx("div", {
    className: "mb-3",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 166,
      columnNumber: 19
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "primary",
    onClick: openAddMachineModal,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 167,
      columnNumber: 21
    }
  }, "Add Existing Machine"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "secondary",
    className: "ms-2",
    onClick: () => setShowCreateMachineModal(true),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 170,
      columnNumber: 21
    }
  }, "Create New Machine")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Table"], {
    striped: true,
    bordered: true,
    hover: true,
    size: "sm",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 178,
      columnNumber: 19
    }
  }, __jsx("thead", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 179,
      columnNumber: 21
    }
  }, __jsx("tr", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 180,
      columnNumber: 23
    }
  }, __jsx("th", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 181,
      columnNumber: 25
    }
  }, "Name"), __jsx("th", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 182,
      columnNumber: 25
    }
  }, "Location"), __jsx("th", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 183,
      columnNumber: 25
    }
  }, "OEM"), __jsx("th", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 184,
      columnNumber: 25
    }
  }, "Modality"), __jsx("th", {
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
  }, machineOptions.map(machine => __jsx("tr", {
    key: machine.id,
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
  }, machine.name), __jsx("td", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 192,
      columnNumber: 27
    }
  }, machine.local), __jsx("td", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 193,
      columnNumber: 27
    }
  }, machine.OEM), __jsx("td", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 194,
      columnNumber: 27
    }
  }, machine.Modality), __jsx("td", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 195,
      columnNumber: 27
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "primary",
    onClick: () => handleSelectMachine(machine.id, machine.name),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 196,
      columnNumber: 29
    }
  }, "Select")))))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "primary",
    style: {
      marginTop: "20px"
    },
    onClick: () => router.back(),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 209,
      columnNumber: 19
    }
  }, "Back")) : !error && __jsx("p", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 218,
      columnNumber: 27
    }
  }, "Loading client data..."))))), __jsx(_ClientInfoModal__WEBPACK_IMPORTED_MODULE_4__["default"], {
    show: showAddMachineModal,
    handleClose: () => setShowAddMachineModal(false),
    machineOptions: availableMachines,
    setSelectedMachine: handleAddMachine,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 226,
      columnNumber: 7
    }
  }), __jsx(_MachineCreationModal__WEBPACK_IMPORTED_MODULE_5__["default"], {
    show: showCreateMachineModal,
    handleClose: () => setShowCreateMachineModal(false),
    onCreateMachine: handleCreateMachine,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 234,
      columnNumber: 7
    }
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (Client); // Server-side rendering function

async function getServerSideProps(context) {
  const {
    id
  } = context.params;

  try {
    // Fetch client data from Firestore using Admin SDK
    const clientDoc = await _context_FirebaseAdmin__WEBPACK_IMPORTED_MODULE_6__["adminDb"].collection("Client").doc(id).get();

    if (!clientDoc.exists) {
      return {
        notFound: true // This will show a 404 page

      };
    }

    const clientData = clientDoc.data(); // Fetch machine documents referenced in the client's machines array

    let machines = [];

    if (clientData.machines && Array.isArray(clientData.machines)) {
      try {
        const machinePromises = clientData.machines.map(machineRef => {
          if (machineRef.path) {
            return _context_FirebaseAdmin__WEBPACK_IMPORTED_MODULE_6__["adminDb"].doc(machineRef.path).get();
          }

          return null;
        }).filter(Boolean);
        const machineDocs = await Promise.all(machinePromises);
        machines = machineDocs.map(machineDoc => {
          const machineData = machineDoc.data(); // Extract only serializable data, remove any Firestore references

          const serializedMachine = {
            id: machineDoc.id,
            name: machineData.name || "",
            local: machineData.local || "",
            OEM: machineData.OEM || "",
            Modality: machineData.Modality || "",
            Model: machineData.Model || "" // Add other fields as needed, but ensure they're serializable

          }; // If there's a client reference, extract just the client name

          if (machineData.client && machineData.client.path) {
            try {
              const clientDoc = _context_FirebaseAdmin__WEBPACK_IMPORTED_MODULE_6__["adminDb"].doc(machineData.client.path).get();

              if (clientDoc.exists) {
                serializedMachine.clientName = clientDoc.data().name || "";
              }
            } catch (error) {
              console.error("Error fetching client name:", error);
            }
          }

          return serializedMachine;
        });
      } catch (error) {
        console.error("Error fetching machine data:", error);
      }
    } // Serialize the client data, removing any non-serializable fields


    const serializedClient = {
      id,
      name: clientData.name || "",
      local: clientData.local || "" // Add other client fields as needed, but ensure they're serializable

    };
    return {
      props: {
        initialClient: serializedClient,
        initialMachines: machines
      }
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);
    return {
      props: {
        error: "Failed to load client data"
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vY29udGV4dC9GaXJlYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9jb250ZXh0L0ZpcmViYXNlQWRtaW4uanMiLCJ3ZWJwYWNrOi8vLy4vcGFnZXMvTmV3U2VhcmNoL0NsaWVudEluZm9Nb2RhbC5qcyIsIndlYnBhY2s6Ly8vLi9wYWdlcy9OZXdTZWFyY2gvTWFjaGluZUNyZWF0aW9uTW9kYWwuanMiLCJ3ZWJwYWNrOi8vLy4vcGFnZXMvTmV3U2VhcmNoL2NsaWVudC8vaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZmlyZWJhc2UtYWRtaW4vYXBwXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZmlyZWJhc2UtYWRtaW4vZmlyZXN0b3JlXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZmlyZWJhc2UtZnVuY3Rpb25zXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZmlyZWJhc2UvY29tcGF0L2FwcFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImZpcmViYXNlL2NvbXBhdC9hdXRoXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZmlyZWJhc2UvY29tcGF0L2ZpcmVzdG9yZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImZpcmViYXNlL2NvbXBhdC9zdG9yYWdlXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibmV4dC9yb3V0ZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LWJvb3RzdHJhcFwiIl0sIm5hbWVzIjpbIkZpcmViYXNlQ3JlZGVudGlhbHMiLCJhcGlLZXkiLCJhdXRoRG9tYWluIiwicHJvamVjdElkIiwic3RvcmFnZUJ1Y2tldCIsIm1lc3NhZ2luZ1NlbmRlcklkIiwiYXBwSWQiLCJtZWFzdXJlbWVudElkIiwiRmlyZWJhc2UiLCJhcHBzIiwibGVuZ3RoIiwiaW5pdGlhbGl6ZUFwcCIsImF1dGgiLCJmdW5jdGlvbnMiLCJyZXF1aXJlIiwiZXJyb3IiLCJnZXRBcHBzIiwiY2xpZW50RW1haWwiLCJwcm9jZXNzIiwiZW52IiwiRklSRUJBU0VfQ0xJRU5UX0VNQUlMIiwiRklSRUJBU0VfRlVOQ1RJT05TX0NMSUVOVF9FTUFJTCIsIkZJUkVCQVNFX0FETUlOX0NMSUVOVF9FTUFJTCIsImNvbmZpZyIsImFkbWluIiwiY2xpZW50X2VtYWlsIiwic3NyIiwiZmlyZWJhc2VfY2xpZW50X2VtYWlsIiwidW5kZWZpbmVkIiwicHJpdmF0ZUtleSIsIkZJUkVCQVNFX1BSSVZBVEVfS0VZIiwiRklSRUJBU0VfRlVOQ1RJT05TX1BSSVZBVEVfS0VZIiwiRklSRUJBU0VfQURNSU5fUFJJVkFURV9LRVkiLCJwcml2YXRlX2tleSIsImZpcmViYXNlX3ByaXZhdGVfa2V5IiwiY3JlZGVudGlhbCIsImNlcnQiLCJyZXBsYWNlIiwiZGF0YWJhc2VVUkwiLCJjb25zb2xlIiwid2FybiIsIm1lc3NhZ2UiLCJhZG1pbkRiIiwiZ2V0RmlyZXN0b3JlIiwiQ2xpZW50SW5mb01vZGFsIiwic2hvdyIsImhhbmRsZUNsb3NlIiwic2VsZWN0ZWRDbGllbnQiLCJtYWNoaW5lT3B0aW9ucyIsInNldFNlbGVjdGVkTWFjaGluZSIsIm1hcCIsIm1hY2hpbmUiLCJpZCIsIm5hbWUiLCJsb2NhbCIsIk1hY2hpbmVDcmVhdGlvbk1vZGFsIiwib25DcmVhdGVNYWNoaW5lIiwibmV3TWFjaGluZSIsInNldE5ld01hY2hpbmUiLCJ1c2VTdGF0ZSIsIk9FTSIsIk1vZGFsaXR5IiwiTW9kZWwiLCJsYXN0UE0iLCJuZXh0UE0iLCJoYW5kbGVDaGFuZ2UiLCJmaWVsZCIsImV2ZW50IiwidmFsdWUiLCJ0YXJnZXQiLCJwcmV2IiwiaGFuZGxlQ3JlYXRlIiwiQ2xpZW50Iiwicm91dGVyIiwidXNlUm91dGVyIiwic2V0U2VsZWN0ZWRDbGllbnQiLCJzZXRNYWNoaW5lT3B0aW9ucyIsInNldEVycm9yIiwic2hvd0FkZE1hY2hpbmVNb2RhbCIsInNldFNob3dBZGRNYWNoaW5lTW9kYWwiLCJzaG93Q3JlYXRlTWFjaGluZU1vZGFsIiwic2V0U2hvd0NyZWF0ZU1hY2hpbmVNb2RhbCIsImF2YWlsYWJsZU1hY2hpbmVzIiwic2V0QXZhaWxhYmxlTWFjaGluZXMiLCJ1c2VFZmZlY3QiLCJpc1JlYWR5IiwiY2xpZW50SWQiLCJxdWVyeSIsImFzUGF0aCIsInNwbGl0IiwicG9wIiwiZmV0Y2hDbGllbnREYXRhIiwiZGIiLCJmaXJlYmFzZSIsImZpcmVzdG9yZSIsImNsaWVudERvYyIsImNvbGxlY3Rpb24iLCJkb2MiLCJnZXQiLCJleGlzdHMiLCJjbGllbnREYXRhIiwiZGF0YSIsIm1hY2hpbmVQcm9taXNlcyIsIm1hY2hpbmVzIiwibWFjaGluZVJlZiIsIm1hY2hpbmVEb2NzIiwiUHJvbWlzZSIsImFsbCIsIm1hY2hpbmVEb2MiLCJmZXRjaEF2YWlsYWJsZU1hY2hpbmVzIiwic25hcHNob3QiLCJ3aGVyZSIsImRvY3MiLCJoYW5kbGVTZWxlY3RNYWNoaW5lIiwicHVzaCIsImhhbmRsZUFkZE1hY2hpbmUiLCJ1cGRhdGUiLCJGaWVsZFZhbHVlIiwiYXJyYXlVbmlvbiIsImhhbmRsZUNyZWF0ZU1hY2hpbmUiLCJtYWNoaW5lSWQiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJtYWNoaW5lV2l0aElkIiwiY2xpZW50Iiwic2V0Iiwib3BlbkFkZE1hY2hpbmVNb2RhbCIsIm1hcmdpblRvcCIsImJhY2siLCJnZXRTZXJ2ZXJTaWRlUHJvcHMiLCJjb250ZXh0IiwicGFyYW1zIiwibm90Rm91bmQiLCJBcnJheSIsImlzQXJyYXkiLCJwYXRoIiwiZmlsdGVyIiwiQm9vbGVhbiIsIm1hY2hpbmVEYXRhIiwic2VyaWFsaXplZE1hY2hpbmUiLCJjbGllbnROYW1lIiwic2VyaWFsaXplZENsaWVudCIsInByb3BzIiwiaW5pdGlhbENsaWVudCIsImluaXRpYWxNYWNoaW5lcyJdLCJtYXBwaW5ncyI6Ijs7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FB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O0FDQUEsd0M7Ozs7Ozs7Ozs7O0FDQUEsa0M7Ozs7Ozs7Ozs7O0FDQUEsNEMiLCJmaWxlIjoicGFnZXMvTmV3U2VhcmNoL2NsaWVudC9baWRdLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSByZXF1aXJlKCcuLi8uLi8uLi9zc3ItbW9kdWxlLWNhY2hlLmpzJyk7XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdHZhciB0aHJldyA9IHRydWU7XG4gXHRcdHRyeSB7XG4gXHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG4gXHRcdFx0dGhyZXcgPSBmYWxzZTtcbiBcdFx0fSBmaW5hbGx5IHtcbiBcdFx0XHRpZih0aHJldykgZGVsZXRlIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHR9XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9wYWdlcy9OZXdTZWFyY2gvY2xpZW50L1tpZF0vaW5kZXguanNcIik7XG4iLCIvLyAvLyBpbXBvcnQgZmlyZWJhc2UgZnJvbSBcImZpcmViYXNlL2FwcFwiXG4vLyBpbXBvcnQgKiBhcyBmaXJlYmFzZSBmcm9tIFwiZmlyZWJhc2UvYXBwXCI7XG4vLyAvLyBpbXBvcnQgXCJmaXJlYmFzZS9hdXRoXCJcblxuLy8gY29uc3QgYXBwID0gZmlyZWJhc2UuaW5pdGlhbGl6ZUFwcCh7XG4vLyAgICAgYXBpS2V5OiBcIkFJemFTeUN4Qy1hOGI1VmhoZXk4R0Y0N0xwWFoxYU1LWW1pSWh3RVwiLFxuLy8gICAgIGF1dGhEb21haW46IFwibWFnbW8tYWMxMGMuZmlyZWJhc2VhcHAuY29tXCIsXG4vLyAgICAgcHJvamVjdElkOiBcIm1hZ21vLWFjMTBjXCIsXG4vLyAgICAgc3RvcmFnZUJ1Y2tldDogXCJtYWdtby1hYzEwYy5hcHBzcG90LmNvbVwiLFxuLy8gICAgIG1lc3NhZ2luZ1NlbmRlcklkOiBcIjE3Nzg1NzUyNTE0N1wiLFxuLy8gICAgIGFwcElkOiBcIjE6MTc3ODU3NTI1MTQ3OndlYjphYzhlM2M4N2Q4MjM5NmJlYjFkZDNlXCIsXG4vLyAgICAgbWVhc3VyZW1lbnRJZDogXCJHLUwwMjM2SlQ1TjNcIlxuLy8gfSlcblxuLy8gZXhwb3J0IGNvbnN0IGF1dGggPSBhcHAuYXV0aCgpXG4vLyBleHBvcnQgZGVmYXVsdCBhcHBcblxuLy8gYXBpS2V5OiBwcm9jZXNzLmVudi5SRUFDVF9BUFBfRklSRUJBU0VfS0VZLFxuLy8gICAgIGF1dGhEb21haW46IHByb2Nlc3MuZW52LlJFQUNUX0FQUF9GSVJFQkFTRV9BVVRIX0RPTUFJTixcbi8vICAgICBwcm9qZWN0SWQ6IHByb2Nlc3MuZW52LlJFQUNUX0FQUF9GSVJFQkFTRV9QUk9KRUNUX0lELFxuLy8gICAgIHN0b3JhZ2VCdWNrZXQ6IHByb2Nlc3MuZW52LlJFQUNUX0FQUF9GSVJFQkFTRV9TVE9SQUdFX0JVQ0tFVCxcbi8vICAgICBtZXNzYWdpbmdTZW5kZXJJZDogcHJvY2Vzcy5lbnYuUkVBQ1RfQVBQX0ZJUkVCQVNFX01FU1NBR0lOR19TRU5ERVJfSUQsXG4vLyAgICAgYXBwSWQ6IHByb2Nlc3MuZW52LlJFQUNUX0FQUF9GSVJFQkFTRV9BUFBfSUQsXG4vLyAgICAgbWVhc3VyZW1lbnRJZDogcHJvY2Vzcy5lbnYuUkVBQ1RfQVBQX0ZJUkVCQVNFX01FQVNVUkVNRU5UX0lEXG5cbmltcG9ydCBGaXJlYmFzZSBmcm9tIFwiZmlyZWJhc2UvY29tcGF0L2FwcFwiO1xuaW1wb3J0IFwiZmlyZWJhc2UvY29tcGF0L2F1dGhcIjtcbmltcG9ydCBcImZpcmViYXNlL2NvbXBhdC9maXJlc3RvcmVcIjtcbmltcG9ydCBcImZpcmViYXNlL2NvbXBhdC9zdG9yYWdlXCI7XG5cbmNvbnN0IEZpcmViYXNlQ3JlZGVudGlhbHMgPSB7XG4gIGFwaUtleTogXCJBSXphU3lDeEMtYThiNVZoaGV5OEdGNDdMcFhaMWFNS1ltaUlod0VcIixcbiAgYXV0aERvbWFpbjpcbiAgICB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZSA9PT0gXCJsb2NhbGhvc3RcIlxuICAgICAgPyBcIm1hZ21vLWFjMTBjLmZpcmViYXNlYXBwLmNvbVwiXG4gICAgICA6IFwibWFnbW8tY2xvdWQud2ViLmFwcFwiLFxuICBwcm9qZWN0SWQ6IFwibWFnbW8tYWMxMGNcIixcbiAgc3RvcmFnZUJ1Y2tldDogXCJtYWdtby1hYzEwYy5hcHBzcG90LmNvbVwiLFxuICBtZXNzYWdpbmdTZW5kZXJJZDogXCIxNzc4NTc1MjUxNDdcIixcbiAgYXBwSWQ6IFwiMToxNzc4NTc1MjUxNDc6d2ViOmFjOGUzYzg3ZDgyMzk2YmViMWRkM2VcIixcbiAgbWVhc3VyZW1lbnRJZDogXCJHLUwwMjM2SlQ1TjNcIixcbn07XG4vLyBpZiBhIEZpcmViYXNlIGluc3RhbmNlIGRvZXNuJ3QgZXhpc3QsIGNyZWF0ZSBvbmVcbmlmICghRmlyZWJhc2UuYXBwcy5sZW5ndGgpIHtcbiAgRmlyZWJhc2UuaW5pdGlhbGl6ZUFwcChGaXJlYmFzZUNyZWRlbnRpYWxzKTtcbn1cblxuZXhwb3J0IGNvbnN0IGF1dGggPSBGaXJlYmFzZS5hdXRoKCk7XG5leHBvcnQgZGVmYXVsdCBGaXJlYmFzZTtcblxuLy8gaW1wb3J0IHsgaW5pdGlhbGl6ZUFwcCB9IGZyb20gJ2ZpcmViYXNlL2FwcCc7XG4vLyBpbXBvcnQgeyBnZXRGaXJlc3RvcmUsIGNvbGxlY3Rpb24sIGdldERvY3MgfSBmcm9tICdmaXJlYmFzZS9maXJlc3RvcmUnO1xuXG4vLyBjb25zdCBhcHAgPSBpbml0aWFsaXplQXBwKGZpcmViYXNlQ29uZmlnKTtcbi8vIGNvbnN0IGRiID0gZ2V0RmlyZXN0b3JlKGFwcCk7XG5cbi8vIGV4cG9ydCBkZWZhdWx0IGFwcDtcbiIsImltcG9ydCB7IGluaXRpYWxpemVBcHAsIGdldEFwcHMsIGNlcnQgfSBmcm9tIFwiZmlyZWJhc2UtYWRtaW4vYXBwXCI7XG5pbXBvcnQgeyBnZXRGaXJlc3RvcmUgfSBmcm9tIFwiZmlyZWJhc2UtYWRtaW4vZmlyZXN0b3JlXCI7XG5cbi8vIEltcG9ydCBGaXJlYmFzZSBGdW5jdGlvbnMgZm9yIGNvbmZpZyBhY2Nlc3NcbmxldCBmdW5jdGlvbnM7XG50cnkge1xuICBmdW5jdGlvbnMgPSByZXF1aXJlKFwiZmlyZWJhc2UtZnVuY3Rpb25zXCIpO1xufSBjYXRjaCAoZXJyb3IpIHtcbiAgLy8gTm90IHJ1bm5pbmcgaW4gRmlyZWJhc2UgRnVuY3Rpb25zIGVudmlyb25tZW50XG4gIGZ1bmN0aW9ucyA9IG51bGw7XG59XG5cbi8vIEluaXRpYWxpemUgRmlyZWJhc2UgQWRtaW4gaWYgaXQgaGFzbid0IGJlZW4gaW5pdGlhbGl6ZWRcbmlmICghZ2V0QXBwcygpLmxlbmd0aCkge1xuICAvLyBPbmx5IGluaXRpYWxpemUgaWYgd2UgaGF2ZSB2YWxpZCBjcmVkZW50aWFsc1xuICBjb25zdCBjbGllbnRFbWFpbCA9XG4gICAgcHJvY2Vzcy5lbnYuRklSRUJBU0VfQ0xJRU5UX0VNQUlMIHx8XG4gICAgcHJvY2Vzcy5lbnYuRklSRUJBU0VfRlVOQ1RJT05TX0NMSUVOVF9FTUFJTCB8fFxuICAgIHByb2Nlc3MuZW52LkZJUkVCQVNFX0FETUlOX0NMSUVOVF9FTUFJTCB8fFxuICAgIChmdW5jdGlvbnMgPyBmdW5jdGlvbnMuY29uZmlnKCkuYWRtaW4/LmNsaWVudF9lbWFpbCB8fCBmdW5jdGlvbnMuY29uZmlnKCkuc3NyPy5maXJlYmFzZV9jbGllbnRfZW1haWwgOiB1bmRlZmluZWQpO1xuXG4gIGNvbnN0IHByaXZhdGVLZXkgPVxuICAgIHByb2Nlc3MuZW52LkZJUkVCQVNFX1BSSVZBVEVfS0VZIHx8XG4gICAgcHJvY2Vzcy5lbnYuRklSRUJBU0VfRlVOQ1RJT05TX1BSSVZBVEVfS0VZIHx8XG4gICAgcHJvY2Vzcy5lbnYuRklSRUJBU0VfQURNSU5fUFJJVkFURV9LRVkgfHxcbiAgICAoZnVuY3Rpb25zID8gZnVuY3Rpb25zLmNvbmZpZygpLmFkbWluPy5wcml2YXRlX2tleSB8fCBmdW5jdGlvbnMuY29uZmlnKCkuc3NyPy5maXJlYmFzZV9wcml2YXRlX2tleSA6IHVuZGVmaW5lZCk7XG5cbiAgaWYgKGNsaWVudEVtYWlsICYmIHByaXZhdGVLZXkpIHtcbiAgICB0cnkge1xuICAgICAgaW5pdGlhbGl6ZUFwcCh7XG4gICAgICAgIGNyZWRlbnRpYWw6IGNlcnQoe1xuICAgICAgICAgIHByb2plY3RJZDogXCJtYWdtby1hYzEwY1wiLFxuICAgICAgICAgIGNsaWVudEVtYWlsOiBjbGllbnRFbWFpbCxcbiAgICAgICAgICBwcml2YXRlS2V5OiBwcml2YXRlS2V5LnJlcGxhY2UoL1xcXFxuL2csIFwiXFxuXCIpLFxuICAgICAgICB9KSxcbiAgICAgICAgZGF0YWJhc2VVUkw6IFwiaHR0cHM6Ly9tYWdtby1hYzEwYy5maXJlYmFzZWlvLmNvbVwiLFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUud2FybihcIkZpcmViYXNlIEFkbWluIGluaXRpYWxpemF0aW9uIGZhaWxlZDpcIiwgZXJyb3IubWVzc2FnZSk7XG4gICAgICAvLyBEb24ndCB0aHJvdyBlcnJvciBkdXJpbmcgYnVpbGQgcHJvY2Vzc1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBjb25zb2xlLndhcm4oXG4gICAgICBcIkZpcmViYXNlIEFkbWluIGNyZWRlbnRpYWxzIG5vdCBhdmFpbGFibGUsIHNraXBwaW5nIGluaXRpYWxpemF0aW9uXCJcbiAgICApO1xuICB9XG59XG5cbi8vIE9ubHkgZXhwb3J0IEZpcmVzdG9yZSBpZiBGaXJlYmFzZSBBZG1pbiBpcyBwcm9wZXJseSBpbml0aWFsaXplZFxubGV0IGFkbWluRGIgPSBudWxsO1xudHJ5IHtcbiAgaWYgKGdldEFwcHMoKS5sZW5ndGggPiAwKSB7XG4gICAgYWRtaW5EYiA9IGdldEZpcmVzdG9yZSgpO1xuICB9XG59IGNhdGNoIChlcnJvcikge1xuICBjb25zb2xlLndhcm4oXCJGaXJlYmFzZSBBZG1pbiBub3QgYXZhaWxhYmxlOlwiLCBlcnJvci5tZXNzYWdlKTtcbn1cblxuZXhwb3J0IHsgYWRtaW5EYiB9O1xuZXhwb3J0IGRlZmF1bHQgYWRtaW5EYjtcbiIsIi8vIENsaWVudEluZm9Nb2RhbC5qc1xuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgTW9kYWwsIEJ1dHRvbiwgVGFibGUgfSBmcm9tIFwicmVhY3QtYm9vdHN0cmFwXCI7XG5cbmNvbnN0IENsaWVudEluZm9Nb2RhbCA9ICh7XG4gIHNob3csXG4gIGhhbmRsZUNsb3NlLFxuICBzZWxlY3RlZENsaWVudCxcbiAgbWFjaGluZU9wdGlvbnMgPSBbXSxcbiAgc2V0U2VsZWN0ZWRNYWNoaW5lLFxufSkgPT4ge1xuICAvLyBBZGQgd2FyZWhvdXNlIG9wdGlvbnMgaGVyZVxuICAvLyBjb25zdCB3YXJlaG91c2VPcHRpb25zID0gW1xuICAvLyAgIHsgaWQ6IFwid2FyZWhvdXNlLXNvY2FsXCIsIG5hbWU6IFwiU29DYWxXYXJlaG91c2VcIiwgbG9jYWw6IFwiXCIgfSxcbiAgLy8gICB7IGlkOiBcIndhcmVob3VzZS1ub3JjYWxcIiwgbmFtZTogXCJOb3JDYWxXYXJlaG91c2VcIiwgbG9jYWw6IFwiXCIgfSxcbiAgLy8gXTtcblxuICByZXR1cm4gKFxuICAgIDxNb2RhbCBzaG93PXtzaG93fSBvbkhpZGU9e2hhbmRsZUNsb3NlfT5cbiAgICAgIDxNb2RhbC5IZWFkZXIgY2xvc2VCdXR0b24+XG4gICAgICAgIDxNb2RhbC5UaXRsZT5TZWxlY3QgYSBNYWNoaW5lIG9yIFdhcmVob3VzZTwvTW9kYWwuVGl0bGU+XG4gICAgICA8L01vZGFsLkhlYWRlcj5cbiAgICAgIDxNb2RhbC5Cb2R5PlxuICAgICAgICA8VGFibGUgc3RyaXBlZCBib3JkZXJlZCBob3ZlciBzaXplPVwic21cIj5cbiAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgIDx0aD5OYW1lPC90aD5cbiAgICAgICAgICAgICAgPHRoPkxvY2F0aW9uPC90aD5cbiAgICAgICAgICAgICAgPHRoPlNlbGVjdDwvdGg+XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAge21hY2hpbmVPcHRpb25zLm1hcCgobWFjaGluZSkgPT4gKFxuICAgICAgICAgICAgICA8dHIga2V5PXttYWNoaW5lLmlkfT5cbiAgICAgICAgICAgICAgICA8dGQ+e21hY2hpbmUubmFtZX08L3RkPlxuICAgICAgICAgICAgICAgIDx0ZD57bWFjaGluZS5sb2NhbH08L3RkPlxuICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgdmFyaWFudD1cInByaW1hcnlcIlxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTZWxlY3RlZE1hY2hpbmUobWFjaGluZSl9XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIFNlbGVjdFxuICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgey8qIHt3YXJlaG91c2VPcHRpb25zLm1hcCgod2FyZWhvdXNlKSA9PiAoXG4gICAgICAgICAgICAgIDx0ciBrZXk9e3dhcmVob3VzZS5pZH0+XG4gICAgICAgICAgICAgICAgPHRkPnt3YXJlaG91c2UubmFtZX08L3RkPlxuICAgICAgICAgICAgICAgIDx0ZD57XCJXYXJlaG91c2VcIn08L3RkPlxuICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgdmFyaWFudD1cInByaW1hcnlcIlxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTZWxlY3RlZE1hY2hpbmUod2FyZWhvdXNlKX1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgU2VsZWN0XG4gICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgKSl9ICovfVxuICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgIDwvVGFibGU+XG4gICAgICA8L01vZGFsLkJvZHk+XG4gICAgICA8TW9kYWwuRm9vdGVyPlxuICAgICAgICA8QnV0dG9uIHZhcmlhbnQ9XCJzZWNvbmRhcnlcIiBvbkNsaWNrPXtoYW5kbGVDbG9zZX0+XG4gICAgICAgICAgQ2xvc2VcbiAgICAgICAgPC9CdXR0b24+XG4gICAgICA8L01vZGFsLkZvb3Rlcj5cbiAgICA8L01vZGFsPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQ2xpZW50SW5mb01vZGFsO1xuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IE1vZGFsLCBCdXR0b24sIEZvcm0gfSBmcm9tIFwicmVhY3QtYm9vdHN0cmFwXCI7XG5cbmNvbnN0IE1hY2hpbmVDcmVhdGlvbk1vZGFsID0gKHsgc2hvdywgaGFuZGxlQ2xvc2UsIG9uQ3JlYXRlTWFjaGluZSB9KSA9PiB7XG4gIGNvbnN0IFtuZXdNYWNoaW5lLCBzZXROZXdNYWNoaW5lXSA9IHVzZVN0YXRlKHtcbiAgICBuYW1lOiBcIlwiLFxuICAgIE9FTTogXCJcIixcbiAgICBNb2RhbGl0eTogXCJcIixcbiAgICBNb2RlbDogXCJcIixcbiAgICBsb2NhbDogXCJcIixcbiAgICBsYXN0UE06IFwiXCIsXG4gICAgbmV4dFBNOiBcIlwiLFxuICB9KTtcblxuICBjb25zdCBoYW5kbGVDaGFuZ2UgPSAoZmllbGQpID0+IChldmVudCkgPT4ge1xuICAgIGNvbnN0IHZhbHVlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgIHNldE5ld01hY2hpbmUoKHByZXYpID0+ICh7IC4uLnByZXYsIFtmaWVsZF06IHZhbHVlIH0pKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVDcmVhdGUgPSAoKSA9PiB7XG4gICAgb25DcmVhdGVNYWNoaW5lKG5ld01hY2hpbmUpO1xuICAgIHNldE5ld01hY2hpbmUoe1xuICAgICAgbmFtZTogXCJcIixcbiAgICAgIE9FTTogXCJcIixcbiAgICAgIE1vZGFsaXR5OiBcIlwiLFxuICAgICAgTW9kZWw6IFwiXCIsXG4gICAgICBsb2NhbDogXCJcIixcbiAgICAgIGxhc3RQTTogXCJcIixcbiAgICAgIG5leHRQTTogXCJcIixcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxNb2RhbCBzaG93PXtzaG93fSBvbkhpZGU9e2hhbmRsZUNsb3NlfT5cbiAgICAgIDxNb2RhbC5IZWFkZXIgY2xvc2VCdXR0b24+XG4gICAgICAgIDxNb2RhbC5UaXRsZT5DcmVhdGUgTmV3IE1hY2hpbmU8L01vZGFsLlRpdGxlPlxuICAgICAgPC9Nb2RhbC5IZWFkZXI+XG4gICAgICA8TW9kYWwuQm9keT5cbiAgICAgICAgPEZvcm0+XG4gICAgICAgICAgPEZvcm0uR3JvdXAgY29udHJvbElkPVwibWFjaGluZU5hbWVcIj5cbiAgICAgICAgICAgIDxGb3JtLkxhYmVsPk5hbWU8L0Zvcm0uTGFiZWw+XG4gICAgICAgICAgICA8Rm9ybS5Db250cm9sXG4gICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJFbnRlciBtYWNoaW5lIG5hbWVcIlxuICAgICAgICAgICAgICB2YWx1ZT17bmV3TWFjaGluZS5uYW1lfVxuICAgICAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlQ2hhbmdlKFwibmFtZVwiKX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9Gb3JtLkdyb3VwPlxuICAgICAgICAgIDxGb3JtLkdyb3VwIGNvbnRyb2xJZD1cIk9FTVwiIGNsYXNzTmFtZT1cIm10LTNcIj5cbiAgICAgICAgICAgIDxGb3JtLkxhYmVsPk9FTTwvRm9ybS5MYWJlbD5cbiAgICAgICAgICAgIDxGb3JtLkNvbnRyb2xcbiAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkVudGVyIE9FTVwiXG4gICAgICAgICAgICAgIHZhbHVlPXtuZXdNYWNoaW5lLk9FTX1cbiAgICAgICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUNoYW5nZShcIk9FTVwiKX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9Gb3JtLkdyb3VwPlxuICAgICAgICAgIDxGb3JtLkdyb3VwIGNvbnRyb2xJZD1cIk1vZGFsaXR5XCIgY2xhc3NOYW1lPVwibXQtM1wiPlxuICAgICAgICAgICAgPEZvcm0uTGFiZWw+TW9kYWxpdHk8L0Zvcm0uTGFiZWw+XG4gICAgICAgICAgICA8Rm9ybS5Db250cm9sXG4gICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJFbnRlciBtb2RhbGl0eVwiXG4gICAgICAgICAgICAgIHZhbHVlPXtuZXdNYWNoaW5lLk1vZGFsaXR5fVxuICAgICAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlQ2hhbmdlKFwiTW9kYWxpdHlcIil9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvRm9ybS5Hcm91cD5cbiAgICAgICAgICA8Rm9ybS5Hcm91cCBjb250cm9sSWQ9XCJNb2RlbFwiIGNsYXNzTmFtZT1cIm10LTNcIj5cbiAgICAgICAgICAgIDxGb3JtLkxhYmVsPk1vZGVsPC9Gb3JtLkxhYmVsPlxuICAgICAgICAgICAgPEZvcm0uQ29udHJvbFxuICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRW50ZXIgbW9kZWxcIlxuICAgICAgICAgICAgICB2YWx1ZT17bmV3TWFjaGluZS5Nb2RlbH1cbiAgICAgICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUNoYW5nZShcIk1vZGVsXCIpfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L0Zvcm0uR3JvdXA+XG4gICAgICAgICAgPEZvcm0uR3JvdXAgY29udHJvbElkPVwibG9jYWxcIiBjbGFzc05hbWU9XCJtdC0zXCI+XG4gICAgICAgICAgICA8Rm9ybS5MYWJlbD5Mb2NhdGlvbjwvRm9ybS5MYWJlbD5cbiAgICAgICAgICAgIDxGb3JtLkNvbnRyb2xcbiAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkVudGVyIGxvY2F0aW9uXCJcbiAgICAgICAgICAgICAgdmFsdWU9e25ld01hY2hpbmUubG9jYWx9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXtoYW5kbGVDaGFuZ2UoXCJsb2NhbFwiKX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9Gb3JtLkdyb3VwPlxuICAgICAgICAgIDxGb3JtLkdyb3VwIGNvbnRyb2xJZD1cImxhc3RQTVwiIGNsYXNzTmFtZT1cIm10LTNcIj5cbiAgICAgICAgICAgIDxGb3JtLkxhYmVsPkxhc3QgUE08L0Zvcm0uTGFiZWw+XG4gICAgICAgICAgICA8Rm9ybS5Db250cm9sXG4gICAgICAgICAgICAgIHR5cGU9XCJkYXRlXCJcbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJFbnRlciBsYXN0IFBNIGRhdGVcIlxuICAgICAgICAgICAgICB2YWx1ZT17bmV3TWFjaGluZS5sYXN0UE19XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXtoYW5kbGVDaGFuZ2UoXCJsYXN0UE1cIil9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvRm9ybS5Hcm91cD5cbiAgICAgICAgICA8Rm9ybS5Hcm91cCBjb250cm9sSWQ9XCJuZXh0UE1cIiBjbGFzc05hbWU9XCJtdC0zXCI+XG4gICAgICAgICAgICA8Rm9ybS5MYWJlbD5uZXh0IFBNPC9Gb3JtLkxhYmVsPlxuICAgICAgICAgICAgPEZvcm0uQ29udHJvbFxuICAgICAgICAgICAgICB0eXBlPVwiZGF0ZVwiXG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRW50ZXIgbmV4dCBQTSBkYXRlXCJcbiAgICAgICAgICAgICAgdmFsdWU9e25ld01hY2hpbmUubmV4dFBNfVxuICAgICAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlQ2hhbmdlKFwibmV4dFBNXCIpfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L0Zvcm0uR3JvdXA+XG4gICAgICAgIDwvRm9ybT5cbiAgICAgIDwvTW9kYWwuQm9keT5cbiAgICAgIDxNb2RhbC5Gb290ZXI+XG4gICAgICAgIDxCdXR0b24gdmFyaWFudD1cInNlY29uZGFyeVwiIG9uQ2xpY2s9e2hhbmRsZUNsb3NlfT5cbiAgICAgICAgICBDbG9zZVxuICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgPEJ1dHRvbiB2YXJpYW50PVwicHJpbWFyeVwiIG9uQ2xpY2s9e2hhbmRsZUNyZWF0ZX0+XG4gICAgICAgICAgQWRkIE1hY2hpbmVcbiAgICAgICAgPC9CdXR0b24+XG4gICAgICA8L01vZGFsLkZvb3Rlcj5cbiAgICA8L01vZGFsPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgTWFjaGluZUNyZWF0aW9uTW9kYWw7IiwiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gXCJuZXh0L3JvdXRlclwiO1xuaW1wb3J0IHtcbiAgVGFibGUsXG4gIEJ1dHRvbixcbiAgQ29udGFpbmVyLFxuICBDYXJkLFxuICBSb3csXG4gIENvbCxcbiAgQWxlcnQsXG59IGZyb20gXCJyZWFjdC1ib290c3RyYXBcIjtcbmltcG9ydCBmaXJlYmFzZSBmcm9tIFwiLi4vLi4vLi4vLi4vY29udGV4dC9GaXJlYmFzZVwiO1xuaW1wb3J0IENsaWVudEluZm9Nb2RhbCBmcm9tIFwiLi4vLi4vQ2xpZW50SW5mb01vZGFsXCI7XG5pbXBvcnQgTWFjaGluZUNyZWF0aW9uTW9kYWwgZnJvbSBcIi4uLy4uL01hY2hpbmVDcmVhdGlvbk1vZGFsXCI7XG5cbi8vIEltcG9ydCBmb3IgU1NSXG5pbXBvcnQgeyBhZG1pbkRiIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvbnRleHQvRmlyZWJhc2VBZG1pblwiO1xuXG5jb25zdCBDbGllbnQgPSAoKSA9PiB7XG4gIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpO1xuICBjb25zdCBbc2VsZWN0ZWRDbGllbnQsIHNldFNlbGVjdGVkQ2xpZW50XSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbbWFjaGluZU9wdGlvbnMsIHNldE1hY2hpbmVPcHRpb25zXSA9IHVzZVN0YXRlKFtdKTtcbiAgY29uc3QgW2Vycm9yLCBzZXRFcnJvcl0gPSB1c2VTdGF0ZShudWxsKTtcblxuICAvLyBTdGF0ZSBmb3IgbWFjaGluZSBhZGRpdGlvbiBtb2RhbHNcbiAgY29uc3QgW3Nob3dBZGRNYWNoaW5lTW9kYWwsIHNldFNob3dBZGRNYWNoaW5lTW9kYWxdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbc2hvd0NyZWF0ZU1hY2hpbmVNb2RhbCwgc2V0U2hvd0NyZWF0ZU1hY2hpbmVNb2RhbF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFthdmFpbGFibGVNYWNoaW5lcywgc2V0QXZhaWxhYmxlTWFjaGluZXNdID0gdXNlU3RhdGUoW10pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKHJvdXRlci5pc1JlYWR5KSB7XG4gICAgICBjb25zdCB7IGNsaWVudElkIH0gPSByb3V0ZXIucXVlcnk7XG4gICAgICAvLyBFeHRyYWN0IGNsaWVudElkIGZyb20gcXVlcnkgb3IgVVJMIHBhdGhcbiAgICAgIGNvbnN0IGlkID0gY2xpZW50SWQgfHwgcm91dGVyLmFzUGF0aC5zcGxpdChcIi9cIikucG9wKCk7XG4gICAgICBmZXRjaENsaWVudERhdGEoaWQpO1xuICAgIH1cbiAgfSwgW3JvdXRlci5pc1JlYWR5XSk7XG5cbiAgY29uc3QgZmV0Y2hDbGllbnREYXRhID0gYXN5bmMgKGNsaWVudElkKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGRiID0gZmlyZWJhc2UuZmlyZXN0b3JlKCk7XG4gICAgICBjb25zdCBjbGllbnREb2MgPSBhd2FpdCBkYi5jb2xsZWN0aW9uKFwiQ2xpZW50XCIpLmRvYyhjbGllbnRJZCkuZ2V0KCk7XG4gICAgICBpZiAoY2xpZW50RG9jLmV4aXN0cykge1xuICAgICAgICBjb25zdCBjbGllbnREYXRhID0gY2xpZW50RG9jLmRhdGEoKTtcbiAgICAgICAgc2V0U2VsZWN0ZWRDbGllbnQoY2xpZW50RGF0YSk7XG5cbiAgICAgICAgLy8gRmV0Y2ggbWFjaGluZSBkb2N1bWVudHMgcmVmZXJlbmNlZCBpbiB0aGUgY2xpZW50J3MgbWFjaGluZXMgYXJyYXlcbiAgICAgICAgY29uc3QgbWFjaGluZVByb21pc2VzID0gY2xpZW50RGF0YS5tYWNoaW5lcy5tYXAoKG1hY2hpbmVSZWYpID0+XG4gICAgICAgICAgbWFjaGluZVJlZi5nZXQoKVxuICAgICAgICApO1xuICAgICAgICBjb25zdCBtYWNoaW5lRG9jcyA9IGF3YWl0IFByb21pc2UuYWxsKG1hY2hpbmVQcm9taXNlcyk7XG4gICAgICAgIGNvbnN0IG1hY2hpbmVzID0gbWFjaGluZURvY3MubWFwKChtYWNoaW5lRG9jKSA9PiAoe1xuICAgICAgICAgIGlkOiBtYWNoaW5lRG9jLmlkLFxuICAgICAgICAgIC4uLm1hY2hpbmVEb2MuZGF0YSgpLFxuICAgICAgICB9KSk7XG4gICAgICAgIHNldE1hY2hpbmVPcHRpb25zKG1hY2hpbmVzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNldEVycm9yKFwiQ2xpZW50IG5vdCBmb3VuZFwiKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGZldGNoaW5nIGNsaWVudCBkYXRhOlwiLCBlcnJvcik7XG4gICAgICBzZXRFcnJvcihcIkVycm9yIGZldGNoaW5nIGNsaWVudCBkYXRhXCIpO1xuICAgIH1cbiAgfTtcblxuICAvLyBGZXRjaCBhdmFpbGFibGUgbWFjaGluZXMgKHRob3NlIG5vdCB5ZXQgYXNzaWduZWQgdG8gYSBjbGllbnQpXG4gIGNvbnN0IGZldGNoQXZhaWxhYmxlTWFjaGluZXMgPSBhc3luYyAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGRiID0gZmlyZWJhc2UuZmlyZXN0b3JlKCk7XG4gICAgICBjb25zdCBzbmFwc2hvdCA9IGF3YWl0IGRiXG4gICAgICAgIC5jb2xsZWN0aW9uKFwiTWFjaGluZVwiKVxuICAgICAgICAud2hlcmUoXCJjbGllbnRcIiwgXCI9PVwiLCBudWxsKVxuICAgICAgICAuZ2V0KCk7XG4gICAgICBjb25zdCBtYWNoaW5lcyA9IHNuYXBzaG90LmRvY3MubWFwKChkb2MpID0+ICh7XG4gICAgICAgIGlkOiBkb2MuaWQsXG4gICAgICAgIC4uLmRvYy5kYXRhKCksXG4gICAgICB9KSk7XG4gICAgICBzZXRBdmFpbGFibGVNYWNoaW5lcyhtYWNoaW5lcyk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBmZXRjaGluZyBhdmFpbGFibGUgbWFjaGluZXM6XCIsIGVycm9yKTtcbiAgICAgIHNldEVycm9yKFwiRmFpbGVkIHRvIGZldGNoIGF2YWlsYWJsZSBtYWNoaW5lcy5cIik7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVNlbGVjdE1hY2hpbmUgPSAoaWQsIG5hbWUpID0+IHtcbiAgICAvLyBOYXZpZ2F0ZSB0byB0aGUgbWFjaGluZSBkZXRhaWxzIHBhZ2UgaWYgbmVlZGVkXG4gICAgcm91dGVyLnB1c2goXCIuLi9tYWNoaW5lL1wiICsgaWQpO1xuICB9O1xuXG4gIC8vIFdoZW4gYWRkaW5nIGFuIGV4aXN0aW5nIG1hY2hpbmVcbiAgY29uc3QgaGFuZGxlQWRkTWFjaGluZSA9IGFzeW5jIChtYWNoaW5lKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGRiID0gZmlyZWJhc2UuZmlyZXN0b3JlKCk7XG4gICAgICBjb25zdCBjbGllbnRJZCA9IHJvdXRlci5xdWVyeS5jbGllbnRJZCB8fCByb3V0ZXIuYXNQYXRoLnNwbGl0KFwiL1wiKS5wb3AoKTtcblxuICAgICAgLy8gVXBkYXRlIGNsaWVudCdzIFwibWFjaGluZXNcIiBhcnJheSB3aXRoIHRoZSBtYWNoaW5lIHJlZmVyZW5jZVxuICAgICAgYXdhaXQgZGJcbiAgICAgICAgLmNvbGxlY3Rpb24oXCJDbGllbnRcIilcbiAgICAgICAgLmRvYyhjbGllbnRJZClcbiAgICAgICAgLnVwZGF0ZSh7XG4gICAgICAgICAgbWFjaGluZXM6IGZpcmViYXNlLmZpcmVzdG9yZS5GaWVsZFZhbHVlLmFycmF5VW5pb24oXG4gICAgICAgICAgICBkYi5jb2xsZWN0aW9uKFwiTWFjaGluZVwiKS5kb2MobWFjaGluZS5pZClcbiAgICAgICAgICApLFxuICAgICAgICB9KTtcblxuICAgICAgLy8gVXBkYXRlIGxvY2FsIHN0YXRlIHRvIGluY2x1ZGUgdGhlIG5ld2x5IGFkZGVkIG1hY2hpbmVcbiAgICAgIHNldE1hY2hpbmVPcHRpb25zKChwcmV2KSA9PiBbLi4ucHJldiwgbWFjaGluZV0pO1xuICAgICAgc2V0U2hvd0FkZE1hY2hpbmVNb2RhbChmYWxzZSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBhZGRpbmcgbWFjaGluZSB0byBjbGllbnQ6XCIsIGVycm9yKTtcbiAgICAgIHNldEVycm9yKFwiRmFpbGVkIHRvIGFkZCBtYWNoaW5lIHRvIGNsaWVudC5cIik7XG4gICAgfVxuICB9O1xuXG4gIC8vIFdoZW4gY3JlYXRpbmcgYSBuZXcgbWFjaGluZSBmb3IgdGhlIGNsaWVudFxuICBjb25zdCBoYW5kbGVDcmVhdGVNYWNoaW5lID0gYXN5bmMgKG5ld01hY2hpbmUpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgZGIgPSBmaXJlYmFzZS5maXJlc3RvcmUoKTtcbiAgICAgIGNvbnN0IGNsaWVudElkID0gcm91dGVyLnF1ZXJ5LmNsaWVudElkIHx8IHJvdXRlci5hc1BhdGguc3BsaXQoXCIvXCIpLnBvcCgpO1xuICAgICAgY29uc3QgbWFjaGluZUlkID0gYEFJUyR7TWF0aC5mbG9vcigxMDAwMCArIE1hdGgucmFuZG9tKCkgKiA5MDAwMCl9YDtcbiAgICAgIGNvbnN0IG1hY2hpbmVXaXRoSWQgPSB7XG4gICAgICAgIC4uLm5ld01hY2hpbmUsXG4gICAgICAgIGlkOiBtYWNoaW5lSWQsXG4gICAgICAgIGNsaWVudDogZGIuY29sbGVjdGlvbihcIkNsaWVudFwiKS5kb2MoY2xpZW50SWQpLFxuICAgICAgfTtcbiAgICAgIC8vIENyZWF0ZSB0aGUgbWFjaGluZSBkb2N1bWVudFxuICAgICAgYXdhaXQgZGIuY29sbGVjdGlvbihcIk1hY2hpbmVcIikuZG9jKG1hY2hpbmVJZCkuc2V0KG1hY2hpbmVXaXRoSWQpO1xuICAgICAgLy8gQWRkIHRoZSBtYWNoaW5lIHJlZmVyZW5jZSB0byB0aGUgY2xpZW50XG4gICAgICBhd2FpdCBkYlxuICAgICAgICAuY29sbGVjdGlvbihcIkNsaWVudFwiKVxuICAgICAgICAuZG9jKGNsaWVudElkKVxuICAgICAgICAudXBkYXRlKHtcbiAgICAgICAgICBtYWNoaW5lczogZmlyZWJhc2UuZmlyZXN0b3JlLkZpZWxkVmFsdWUuYXJyYXlVbmlvbihcbiAgICAgICAgICAgIGRiLmNvbGxlY3Rpb24oXCJNYWNoaW5lXCIpLmRvYyhtYWNoaW5lSWQpXG4gICAgICAgICAgKSxcbiAgICAgICAgfSk7XG4gICAgICAvLyBVcGRhdGUgbG9jYWwgc3RhdGVcbiAgICAgIHNldE1hY2hpbmVPcHRpb25zKChwcmV2KSA9PiBbLi4ucHJldiwgeyBpZDogbWFjaGluZUlkLCAuLi5uZXdNYWNoaW5lIH1dKTtcbiAgICAgIHNldFNob3dDcmVhdGVNYWNoaW5lTW9kYWwoZmFsc2UpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgY3JlYXRpbmcgYW5kIGFkZGluZyBtYWNoaW5lOlwiLCBlcnJvcik7XG4gICAgICBzZXRFcnJvcihcIkZhaWxlZCB0byBjcmVhdGUgYW5kIGFkZCBtYWNoaW5lLlwiKTtcbiAgICB9XG4gIH07XG5cbiAgLy8gT3BlbiB0aGUgbW9kYWwgdG8gYWRkIGFuIGV4aXN0aW5nIG1hY2hpbmU7IGZldGNoIGF2YWlsYWJsZSBtYWNoaW5lcyBmaXJzdFxuICBjb25zdCBvcGVuQWRkTWFjaGluZU1vZGFsID0gYXN5bmMgKCkgPT4ge1xuICAgIGF3YWl0IGZldGNoQXZhaWxhYmxlTWFjaGluZXMoKTtcbiAgICBzZXRTaG93QWRkTWFjaGluZU1vZGFsKHRydWUpO1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPENvbnRhaW5lciBjbGFzc05hbWU9XCJtdC01XCI+XG4gICAgICA8Um93IGNsYXNzTmFtZT1cImp1c3RpZnktY29udGVudC1tZC1jZW50ZXJcIj5cbiAgICAgICAgPENvbCBtZD1cIjhcIj5cbiAgICAgICAgICA8Q2FyZD5cbiAgICAgICAgICAgIDxDYXJkLkhlYWRlcj5cbiAgICAgICAgICAgICAgPGg0PkNsaWVudCBNYWNoaW5lczwvaDQ+XG4gICAgICAgICAgICA8L0NhcmQuSGVhZGVyPlxuICAgICAgICAgICAgPENhcmQuQm9keT5cbiAgICAgICAgICAgICAge2Vycm9yICYmIDxBbGVydCB2YXJpYW50PVwiZGFuZ2VyXCI+e2Vycm9yfTwvQWxlcnQ+fVxuICAgICAgICAgICAgICB7c2VsZWN0ZWRDbGllbnQgPyAoXG4gICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgIDxoNT5DbGllbnQ6IHtzZWxlY3RlZENsaWVudC5uYW1lfTwvaDU+XG4gICAgICAgICAgICAgICAgICA8cD5Mb2NhdGlvbjoge3NlbGVjdGVkQ2xpZW50LmxvY2FsfTwvcD5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWItM1wiPlxuICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIHZhcmlhbnQ9XCJwcmltYXJ5XCIgb25DbGljaz17b3BlbkFkZE1hY2hpbmVNb2RhbH0+XG4gICAgICAgICAgICAgICAgICAgICAgQWRkIEV4aXN0aW5nIE1hY2hpbmVcbiAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgICB2YXJpYW50PVwic2Vjb25kYXJ5XCJcbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJtcy0yXCJcbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTaG93Q3JlYXRlTWFjaGluZU1vZGFsKHRydWUpfVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgQ3JlYXRlIE5ldyBNYWNoaW5lXG4gICAgICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8VGFibGUgc3RyaXBlZCBib3JkZXJlZCBob3ZlciBzaXplPVwic21cIj5cbiAgICAgICAgICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5OYW1lPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5Mb2NhdGlvbjwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGg+T0VNPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5Nb2RhbGl0eTwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGg+U2VsZWN0PC90aD5cbiAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAgICAgICAge21hY2hpbmVPcHRpb25zLm1hcCgobWFjaGluZSkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPHRyIGtleT17bWFjaGluZS5pZH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD57bWFjaGluZS5uYW1lfTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD57bWFjaGluZS5sb2NhbH08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+e21hY2hpbmUuT0VNfTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD57bWFjaGluZS5Nb2RhbGl0eX08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFudD1cInByaW1hcnlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlU2VsZWN0TWFjaGluZShtYWNoaW5lLmlkLCBtYWNoaW5lLm5hbWUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgU2VsZWN0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgICAgICAgICAgPC9UYWJsZT5cbiAgICAgICAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgdmFyaWFudD1cInByaW1hcnlcIlxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyBtYXJnaW5Ub3A6IFwiMjBweFwiIH19XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHJvdXRlci5iYWNrKCl9XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIEJhY2tcbiAgICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICFlcnJvciAmJiA8cD5Mb2FkaW5nIGNsaWVudCBkYXRhLi4uPC9wPlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9DYXJkLkJvZHk+XG4gICAgICAgICAgPC9DYXJkPlxuICAgICAgICA8L0NvbD5cbiAgICAgIDwvUm93PlxuXG4gICAgICB7LyogTW9kYWwgdG8gYWRkIGFuIGV4aXN0aW5nIG1hY2hpbmUgdG8gdGhlIGNsaWVudCAqL31cbiAgICAgIDxDbGllbnRJbmZvTW9kYWxcbiAgICAgICAgc2hvdz17c2hvd0FkZE1hY2hpbmVNb2RhbH1cbiAgICAgICAgaGFuZGxlQ2xvc2U9eygpID0+IHNldFNob3dBZGRNYWNoaW5lTW9kYWwoZmFsc2UpfVxuICAgICAgICBtYWNoaW5lT3B0aW9ucz17YXZhaWxhYmxlTWFjaGluZXN9XG4gICAgICAgIHNldFNlbGVjdGVkTWFjaGluZT17aGFuZGxlQWRkTWFjaGluZX1cbiAgICAgIC8+XG5cbiAgICAgIHsvKiBNb2RhbCB0byBjcmVhdGUgYSBuZXcgbWFjaGluZSBhbmQgYXR0YWNoIGl0IHRvIHRoZSBjbGllbnQgKi99XG4gICAgICA8TWFjaGluZUNyZWF0aW9uTW9kYWxcbiAgICAgICAgc2hvdz17c2hvd0NyZWF0ZU1hY2hpbmVNb2RhbH1cbiAgICAgICAgaGFuZGxlQ2xvc2U9eygpID0+IHNldFNob3dDcmVhdGVNYWNoaW5lTW9kYWwoZmFsc2UpfVxuICAgICAgICBvbkNyZWF0ZU1hY2hpbmU9e2hhbmRsZUNyZWF0ZU1hY2hpbmV9XG4gICAgICAvPlxuICAgIDwvQ29udGFpbmVyPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQ2xpZW50O1xuXG4vLyBTZXJ2ZXItc2lkZSByZW5kZXJpbmcgZnVuY3Rpb25cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRTZXJ2ZXJTaWRlUHJvcHMoY29udGV4dCkge1xuICBjb25zdCB7IGlkIH0gPSBjb250ZXh0LnBhcmFtcztcblxuICB0cnkge1xuICAgIC8vIEZldGNoIGNsaWVudCBkYXRhIGZyb20gRmlyZXN0b3JlIHVzaW5nIEFkbWluIFNES1xuICAgIGNvbnN0IGNsaWVudERvYyA9IGF3YWl0IGFkbWluRGIuY29sbGVjdGlvbihcIkNsaWVudFwiKS5kb2MoaWQpLmdldCgpO1xuXG4gICAgaWYgKCFjbGllbnREb2MuZXhpc3RzKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBub3RGb3VuZDogdHJ1ZSwgLy8gVGhpcyB3aWxsIHNob3cgYSA0MDQgcGFnZVxuICAgICAgfTtcbiAgICB9XG5cbiAgICBjb25zdCBjbGllbnREYXRhID0gY2xpZW50RG9jLmRhdGEoKTtcblxuICAgIC8vIEZldGNoIG1hY2hpbmUgZG9jdW1lbnRzIHJlZmVyZW5jZWQgaW4gdGhlIGNsaWVudCdzIG1hY2hpbmVzIGFycmF5XG4gICAgbGV0IG1hY2hpbmVzID0gW107XG4gICAgaWYgKGNsaWVudERhdGEubWFjaGluZXMgJiYgQXJyYXkuaXNBcnJheShjbGllbnREYXRhLm1hY2hpbmVzKSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgbWFjaGluZVByb21pc2VzID0gY2xpZW50RGF0YS5tYWNoaW5lc1xuICAgICAgICAgIC5tYXAoKG1hY2hpbmVSZWYpID0+IHtcbiAgICAgICAgICAgIGlmIChtYWNoaW5lUmVmLnBhdGgpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGFkbWluRGIuZG9jKG1hY2hpbmVSZWYucGF0aCkuZ2V0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5maWx0ZXIoQm9vbGVhbik7XG5cbiAgICAgICAgY29uc3QgbWFjaGluZURvY3MgPSBhd2FpdCBQcm9taXNlLmFsbChtYWNoaW5lUHJvbWlzZXMpO1xuICAgICAgICBtYWNoaW5lcyA9IG1hY2hpbmVEb2NzLm1hcCgobWFjaGluZURvYykgPT4ge1xuICAgICAgICAgIGNvbnN0IG1hY2hpbmVEYXRhID0gbWFjaGluZURvYy5kYXRhKCk7XG4gICAgICAgICAgLy8gRXh0cmFjdCBvbmx5IHNlcmlhbGl6YWJsZSBkYXRhLCByZW1vdmUgYW55IEZpcmVzdG9yZSByZWZlcmVuY2VzXG4gICAgICAgICAgY29uc3Qgc2VyaWFsaXplZE1hY2hpbmUgPSB7XG4gICAgICAgICAgICBpZDogbWFjaGluZURvYy5pZCxcbiAgICAgICAgICAgIG5hbWU6IG1hY2hpbmVEYXRhLm5hbWUgfHwgXCJcIixcbiAgICAgICAgICAgIGxvY2FsOiBtYWNoaW5lRGF0YS5sb2NhbCB8fCBcIlwiLFxuICAgICAgICAgICAgT0VNOiBtYWNoaW5lRGF0YS5PRU0gfHwgXCJcIixcbiAgICAgICAgICAgIE1vZGFsaXR5OiBtYWNoaW5lRGF0YS5Nb2RhbGl0eSB8fCBcIlwiLFxuICAgICAgICAgICAgTW9kZWw6IG1hY2hpbmVEYXRhLk1vZGVsIHx8IFwiXCIsXG4gICAgICAgICAgICAvLyBBZGQgb3RoZXIgZmllbGRzIGFzIG5lZWRlZCwgYnV0IGVuc3VyZSB0aGV5J3JlIHNlcmlhbGl6YWJsZVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICAvLyBJZiB0aGVyZSdzIGEgY2xpZW50IHJlZmVyZW5jZSwgZXh0cmFjdCBqdXN0IHRoZSBjbGllbnQgbmFtZVxuICAgICAgICAgIGlmIChtYWNoaW5lRGF0YS5jbGllbnQgJiYgbWFjaGluZURhdGEuY2xpZW50LnBhdGgpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIGNvbnN0IGNsaWVudERvYyA9IGFkbWluRGIuZG9jKG1hY2hpbmVEYXRhLmNsaWVudC5wYXRoKS5nZXQoKTtcbiAgICAgICAgICAgICAgaWYgKGNsaWVudERvYy5leGlzdHMpIHtcbiAgICAgICAgICAgICAgICBzZXJpYWxpemVkTWFjaGluZS5jbGllbnROYW1lID0gY2xpZW50RG9jLmRhdGEoKS5uYW1lIHx8IFwiXCI7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBmZXRjaGluZyBjbGllbnQgbmFtZTpcIiwgZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBzZXJpYWxpemVkTWFjaGluZTtcbiAgICAgICAgfSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZmV0Y2hpbmcgbWFjaGluZSBkYXRhOlwiLCBlcnJvcik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gU2VyaWFsaXplIHRoZSBjbGllbnQgZGF0YSwgcmVtb3ZpbmcgYW55IG5vbi1zZXJpYWxpemFibGUgZmllbGRzXG4gICAgY29uc3Qgc2VyaWFsaXplZENsaWVudCA9IHtcbiAgICAgIGlkLFxuICAgICAgbmFtZTogY2xpZW50RGF0YS5uYW1lIHx8IFwiXCIsXG4gICAgICBsb2NhbDogY2xpZW50RGF0YS5sb2NhbCB8fCBcIlwiLFxuICAgICAgLy8gQWRkIG90aGVyIGNsaWVudCBmaWVsZHMgYXMgbmVlZGVkLCBidXQgZW5zdXJlIHRoZXkncmUgc2VyaWFsaXphYmxlXG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICBwcm9wczoge1xuICAgICAgICBpbml0aWFsQ2xpZW50OiBzZXJpYWxpemVkQ2xpZW50LFxuICAgICAgICBpbml0aWFsTWFjaGluZXM6IG1hY2hpbmVzLFxuICAgICAgfSxcbiAgICB9O1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBpbiBnZXRTZXJ2ZXJTaWRlUHJvcHM6XCIsIGVycm9yKTtcbiAgICByZXR1cm4ge1xuICAgICAgcHJvcHM6IHtcbiAgICAgICAgZXJyb3I6IFwiRmFpbGVkIHRvIGxvYWQgY2xpZW50IGRhdGFcIixcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZmlyZWJhc2UtYWRtaW4vYXBwXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZpcmViYXNlLWFkbWluL2ZpcmVzdG9yZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmaXJlYmFzZS1mdW5jdGlvbnNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZmlyZWJhc2UvY29tcGF0L2FwcFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmaXJlYmFzZS9jb21wYXQvYXV0aFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmaXJlYmFzZS9jb21wYXQvZmlyZXN0b3JlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZpcmViYXNlL2NvbXBhdC9zdG9yYWdlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5leHQvcm91dGVyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LWJvb3RzdHJhcFwiKTsiXSwic291cmNlUm9vdCI6IiJ9