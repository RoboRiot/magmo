module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../ssr-module-cache.js');
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./pages/NewSearch/clientSearch.js");
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

/***/ "./pages/NewSearch/clientSearch.js":
/*!*****************************************!*\
  !*** ./pages/NewSearch/clientSearch.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-bootstrap */ "react-bootstrap");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/router */ "next/router");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils_fetchAssociations__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/fetchAssociations */ "./utils/fetchAssociations.js");
/* harmony import */ var _utils_ClientTable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/ClientTable */ "./utils/ClientTable.js");
/* harmony import */ var _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../styles/MainSearch.module.css */ "./styles/MainSearch.module.css");
/* harmony import */ var _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_5__);
var _jsxFileName = "C:\\Users\\mack2\\Desktop\\code\\pages\\NewSearch\\clientSearch.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;





 // import styles from "../../styles/ClientPage.module.css";

const ClientPage = () => {
  const {
    0: clients,
    1: setClients
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const {
    0: clientSearchTerm,
    1: setClientSearchTerm
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])("");
  const {
    0: isLoading,
    1: setIsLoading
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(true);
  const router = Object(next_router__WEBPACK_IMPORTED_MODULE_2__["useRouter"])(); // Fetch clients when the component mounts

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    const fetchClientData = async () => {
      try {
        const clientsData = await Object(_utils_fetchAssociations__WEBPACK_IMPORTED_MODULE_3__["fetchClients"])();
        setClients(clientsData);
      } catch (error) {
        console.error("Error fetching clients: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClientData();
  }, []); // Handle search input changes

  const handleSearchChange = event => {
    setClientSearchTerm(event.target.value);
  }; // Handle client selection


  const handleSelectClient = clientId => {
    console.log("Selected client ID:", clientId); // Redirect to client-specific page

    router.push(`client/${clientId}`);
  }; // Handle client info button click


  const handleClientInfo = clientId => {
    router.push(`client/${clientId}/addClient`);
  }; // Clear search input


  const clearSelection = () => {
    setClientSearchTerm("");
  };

  const addClient = () => {
    const randomNumber = Math.floor(10000 + Math.random() * 90000); // Navigate to the new route with the random number

    router.push(`client/AIS${randomNumber}/addClient`);
  };

  return __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Container"], {
    className: "py-4",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 71,
      columnNumber: 5
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Card"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 72,
      columnNumber: 7
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Card"].Body, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 73,
      columnNumber: 9
    }
  }, __jsx("h2", {
    className: "text-center mb-4",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 74,
      columnNumber: 11
    }
  }, "Clients"), isLoading ? __jsx("div", {
    className: "d-flex justify-content-center align-items-center",
    style: {
      minHeight: "300px"
    },
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 76,
      columnNumber: 13
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Spinner"], {
    animation: "border",
    role: "status",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 80,
      columnNumber: 15
    }
  }, __jsx("span", {
    className: "sr-only",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 81,
      columnNumber: 17
    }
  }, "Loading..."))) : __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Row"], {
    className: "mb-3",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 86,
      columnNumber: 15
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
    md: {
      span: 6,
      offset: 3
    },
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 87,
      columnNumber: 17
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["FormControl"], {
    type: "text",
    placeholder: "Search by name",
    value: clientSearchTerm,
    onChange: handleSearchChange,
    className: "mb-3",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 88,
      columnNumber: 19
    }
  }), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Row"], {
    className: "mb-3",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 95,
      columnNumber: 19
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
    md: 4,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 96,
      columnNumber: 21
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    variant: "secondary",
    className: "w-100",
    onClick: clearSelection,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 97,
      columnNumber: 23
    }
  }, "Clear Search")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
    md: 4,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 105,
      columnNumber: 21
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    variant: "primary",
    className: "w-100",
    onClick: addClient,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 106,
      columnNumber: 23
    }
  }, "Add New Client")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
    md: 4,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 114,
      columnNumber: 21
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    variant: "secondary",
    className: "w-100",
    onClick: () => router.push("../Warehousedb/WarehouseSelect"),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 115,
      columnNumber: 23
    }
  }, "back"))))), __jsx(_utils_ClientTable__WEBPACK_IMPORTED_MODULE_4__["default"], {
    clients: clients.filter(client => (client.name || "").toLowerCase().includes(clientSearchTerm.toLowerCase())),
    onSelectClient: handleSelectClient,
    onInfoClick: handleClientInfo,
    isClientSearch: true // clearSelection={clearSelection}
    ,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 126,
      columnNumber: 15
    }
  })))));
};

/* harmony default export */ __webpack_exports__["default"] = (ClientPage);

/***/ }),

/***/ "./styles/ClientTable.module.css":
/*!***************************************!*\
  !*** ./styles/ClientTable.module.css ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Exports
module.exports = {
	"clientTableContainer": "ClientTable_clientTableContainer__1e9un",
	"clientTable": "ClientTable_clientTable__194v7",
	"buttonGroup": "ClientTable_buttonGroup__pSZ7y",
	"flexButton": "ClientTable_flexButton__LoNiS"
};


/***/ }),

/***/ "./styles/MainSearch.module.css":
/*!**************************************!*\
  !*** ./styles/MainSearch.module.css ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Exports
module.exports = {
	"loading-overlay": "MainSearch_loading-overlay__12605",
	"spinner-center": "MainSearch_spinner-center__3evuC",
	"divider": "MainSearch_divider__3rSSU",
	"tableContainer": "MainSearch_tableContainer__LD18P",
	"scrollableTable": "MainSearch_scrollableTable__EtDed",
	"stickyHeader": "MainSearch_stickyHeader__3UmgI",
	"searchContainer": "MainSearch_searchContainer__1xJnu",
	"buttonGroup": "MainSearch_buttonGroup__1GWI6",
	"flexButton": "MainSearch_flexButton__3znqD"
};


/***/ }),

/***/ "./utils/ClientTable.js":
/*!******************************!*\
  !*** ./utils/ClientTable.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-bootstrap */ "react-bootstrap");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _styles_ClientTable_module_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../styles/ClientTable.module.css */ "./styles/ClientTable.module.css");
/* harmony import */ var _styles_ClientTable_module_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_ClientTable_module_css__WEBPACK_IMPORTED_MODULE_2__);
var _jsxFileName = "C:\\Users\\mack2\\Desktop\\code\\utils\\ClientTable.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;




const ClientTable = ({
  clients,
  onSelectClient,
  onInfoClick,
  clearSelection,
  onAddClient,
  // new prop for add-new-client action
  disableSelect,
  disableInfo,
  isClientSearch
}) => {
  return __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Table"], {
    striped: true,
    bordered: true,
    hover: true,
    size: "sm",
    className: _styles_ClientTable_module_css__WEBPACK_IMPORTED_MODULE_2___default.a.clientTable,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16,
      columnNumber: 5
    }
  }, __jsx("thead", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17,
      columnNumber: 7
    }
  }, __jsx("tr", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18,
      columnNumber: 9
    }
  }, __jsx("th", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19,
      columnNumber: 11
    }
  }, "Client Name"), !disableInfo && __jsx("th", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20,
      columnNumber: 28
    }
  }, "Info"), !disableSelect && __jsx("th", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21,
      columnNumber: 30
    }
  }, "Select"))), __jsx("tbody", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24,
      columnNumber: 7
    }
  }, __jsx("tr", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25,
      columnNumber: 9
    }
  }, __jsx("td", {
    colSpan: "3",
    style: {
      textAlign: "center"
    },
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26,
      columnNumber: 11
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    variant: "secondary",
    onClick: clearSelection,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27,
      columnNumber: 13
    }
  }, "Clear Selection"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    variant: "primary",
    onClick: onAddClient,
    className: "ms-2",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31,
      columnNumber: 13
    }
  }, "Add New Client"))), clients.map(client => __jsx("tr", {
    key: client.id,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37,
      columnNumber: 11
    }
  }, __jsx("td", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38,
      columnNumber: 13
    }
  }, client.name), !disableInfo && __jsx("td", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 40,
      columnNumber: 15
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    variant: "info",
    onClick: () => onInfoClick(client.id, client.name),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 41,
      columnNumber: 17
    }
  }, isClientSearch ? "Edit" : "Info")), !disableSelect && __jsx("td", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 50,
      columnNumber: 15
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    variant: "primary",
    onClick: () => onSelectClient(client.id),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 51,
      columnNumber: 17
    }
  }, "Select"))))));
};

/* harmony default export */ __webpack_exports__["default"] = (ClientTable);

/***/ }),

/***/ "./utils/fetchAssociations.js":
/*!************************************!*\
  !*** ./utils/fetchAssociations.js ***!
  \************************************/
/*! exports provided: fetchPartsWithMachineData, fetchClients, fetchModels, formatDate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchPartsWithMachineData", function() { return fetchPartsWithMachineData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchClients", function() { return fetchClients; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchModels", function() { return fetchModels; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatDate", function() { return formatDate; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _context_Firebase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../context/Firebase */ "./context/Firebase.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



async function fetchPartsWithMachineData() {
  const db = _context_Firebase__WEBPACK_IMPORTED_MODULE_1__["default"].firestore();
  const partsSnapshot = await db.collection("Test").get();
  const parts = await Promise.all(partsSnapshot.docs.map(async partDoc => {
    const partData = partDoc.data();
    partData.id = partDoc.id; // Add document ID here
    // console.log(partData);

    if (partData.Machine && partData.Machine instanceof _context_Firebase__WEBPACK_IMPORTED_MODULE_1__["default"].firestore.DocumentReference) {
      console.log(partData.Machine);
      const machineDoc = await partData.Machine.get();
      partData.machineData = machineDoc.exists ? machineDoc.data() : {};

      if (partData.machineData.client) {
        const clientDoc = await partData.machineData.client.get();
        partData.machineData.Client = clientDoc.exists ? clientDoc.data().name : "";
      }
    } else {
      partData.machineData = {};
    }

    return partData;
  }));
  return parts;
}
async function fetchClients(selectedOEM, selectedModality) {
  const db = _context_Firebase__WEBPACK_IMPORTED_MODULE_1__["default"].firestore();
  const clientsSnapshot = await db.collection("Client").get();
  const clients = clientsSnapshot.docs.map(doc => _objectSpread({
    id: doc.id
  }, doc.data())); // Filter clients based on OEM and Modality if selected

  if (selectedOEM || selectedModality) {
    const filteredClients = [];

    for (const client of clients) {
      let match = true;

      if (selectedOEM || selectedModality) {
        for (const machineRef of client.machines) {
          const machineDoc = await machineRef.get();
          const machineData = machineDoc.data();

          if (selectedOEM && machineData.OEM === selectedOEM || selectedModality && machineData.Modality === selectedModality) {
            match = true;
            break;
          } else {
            match = false;
          }
        }
      }

      if (match) {
        filteredClients.push(client);
      }
    }

    return filteredClients;
  }

  return clients;
}
async function fetchModels(selectedOEM, selectedModality, selectedClient) {
  const db = _context_Firebase__WEBPACK_IMPORTED_MODULE_1__["default"].firestore();
  const machinesSnapshot = await db.collection("Machine").get();
  const models = new Set();
  await Promise.all(machinesSnapshot.docs.map(async machineDoc => {
    const machineData = machineDoc.data();
    let isValid = true;
    if (selectedOEM && machineData.OEM !== selectedOEM) isValid = false;
    if (selectedModality && machineData.Modality !== selectedModality) isValid = false;

    if (selectedClient && machineData.client) {
      const clientDoc = await machineData.client.get();
      if (!clientDoc.exists || clientDoc.data().name !== selectedClient) isValid = false;
    }

    if (isValid) {
      models.add(machineData.Model);
    }
  }));
  return Array.from(models);
}
function formatDate(timestamp) {
  if (!timestamp) return "";
  let date;

  if (timestamp.toDate) {
    date = timestamp.toDate();
  } else if (typeof timestamp === "string" || typeof timestamp === "number") {
    date = new Date(timestamp);
  } else {
    return ""; // handle unexpected formats
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vY29udGV4dC9GaXJlYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9wYWdlcy9OZXdTZWFyY2gvY2xpZW50U2VhcmNoLmpzIiwid2VicGFjazovLy8uL3N0eWxlcy9DbGllbnRUYWJsZS5tb2R1bGUuY3NzIiwid2VicGFjazovLy8uL3N0eWxlcy9NYWluU2VhcmNoLm1vZHVsZS5jc3MiLCJ3ZWJwYWNrOi8vLy4vdXRpbHMvQ2xpZW50VGFibGUuanMiLCJ3ZWJwYWNrOi8vLy4vdXRpbHMvZmV0Y2hBc3NvY2lhdGlvbnMuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZmlyZWJhc2UvY29tcGF0L2FwcFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImZpcmViYXNlL2NvbXBhdC9hdXRoXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZmlyZWJhc2UvY29tcGF0L2ZpcmVzdG9yZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImZpcmViYXNlL2NvbXBhdC9zdG9yYWdlXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibmV4dC9yb3V0ZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LWJvb3RzdHJhcFwiIl0sIm5hbWVzIjpbIkZpcmViYXNlQ3JlZGVudGlhbHMiLCJhcGlLZXkiLCJhdXRoRG9tYWluIiwicHJvamVjdElkIiwic3RvcmFnZUJ1Y2tldCIsIm1lc3NhZ2luZ1NlbmRlcklkIiwiYXBwSWQiLCJtZWFzdXJlbWVudElkIiwiRmlyZWJhc2UiLCJhcHBzIiwibGVuZ3RoIiwiaW5pdGlhbGl6ZUFwcCIsImF1dGgiLCJDbGllbnRQYWdlIiwiY2xpZW50cyIsInNldENsaWVudHMiLCJ1c2VTdGF0ZSIsImNsaWVudFNlYXJjaFRlcm0iLCJzZXRDbGllbnRTZWFyY2hUZXJtIiwiaXNMb2FkaW5nIiwic2V0SXNMb2FkaW5nIiwicm91dGVyIiwidXNlUm91dGVyIiwidXNlRWZmZWN0IiwiZmV0Y2hDbGllbnREYXRhIiwiY2xpZW50c0RhdGEiLCJmZXRjaENsaWVudHMiLCJlcnJvciIsImNvbnNvbGUiLCJoYW5kbGVTZWFyY2hDaGFuZ2UiLCJldmVudCIsInRhcmdldCIsInZhbHVlIiwiaGFuZGxlU2VsZWN0Q2xpZW50IiwiY2xpZW50SWQiLCJsb2ciLCJwdXNoIiwiaGFuZGxlQ2xpZW50SW5mbyIsImNsZWFyU2VsZWN0aW9uIiwiYWRkQ2xpZW50IiwicmFuZG9tTnVtYmVyIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwibWluSGVpZ2h0Iiwic3BhbiIsIm9mZnNldCIsImZpbHRlciIsImNsaWVudCIsIm5hbWUiLCJ0b0xvd2VyQ2FzZSIsImluY2x1ZGVzIiwiQ2xpZW50VGFibGUiLCJvblNlbGVjdENsaWVudCIsIm9uSW5mb0NsaWNrIiwib25BZGRDbGllbnQiLCJkaXNhYmxlU2VsZWN0IiwiZGlzYWJsZUluZm8iLCJpc0NsaWVudFNlYXJjaCIsInN0eWxlcyIsImNsaWVudFRhYmxlIiwidGV4dEFsaWduIiwibWFwIiwiaWQiLCJmZXRjaFBhcnRzV2l0aE1hY2hpbmVEYXRhIiwiZGIiLCJmaXJlYmFzZSIsImZpcmVzdG9yZSIsInBhcnRzU25hcHNob3QiLCJjb2xsZWN0aW9uIiwiZ2V0IiwicGFydHMiLCJQcm9taXNlIiwiYWxsIiwiZG9jcyIsInBhcnREb2MiLCJwYXJ0RGF0YSIsImRhdGEiLCJNYWNoaW5lIiwiRG9jdW1lbnRSZWZlcmVuY2UiLCJtYWNoaW5lRG9jIiwibWFjaGluZURhdGEiLCJleGlzdHMiLCJjbGllbnREb2MiLCJDbGllbnQiLCJzZWxlY3RlZE9FTSIsInNlbGVjdGVkTW9kYWxpdHkiLCJjbGllbnRzU25hcHNob3QiLCJkb2MiLCJmaWx0ZXJlZENsaWVudHMiLCJtYXRjaCIsIm1hY2hpbmVSZWYiLCJtYWNoaW5lcyIsIk9FTSIsIk1vZGFsaXR5IiwiZmV0Y2hNb2RlbHMiLCJzZWxlY3RlZENsaWVudCIsIm1hY2hpbmVzU25hcHNob3QiLCJtb2RlbHMiLCJTZXQiLCJpc1ZhbGlkIiwiYWRkIiwiTW9kZWwiLCJBcnJheSIsImZyb20iLCJmb3JtYXREYXRlIiwidGltZXN0YW1wIiwiZGF0ZSIsInRvRGF0ZSIsIkRhdGUiLCJkYXkiLCJTdHJpbmciLCJnZXREYXRlIiwicGFkU3RhcnQiLCJtb250aCIsImdldE1vbnRoIiwieWVhciIsImdldEZ1bGxZZWFyIl0sIm1hcHBpbmdzIjoiOztRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsSUFBSTtRQUNKO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDeEZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFD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QSxzRDs7Ozs7Ozs7Ozs7QUNBQSxvRDs7Ozs7Ozs7Ozs7QUNBQSx3Qzs7Ozs7Ozs7Ozs7QUNBQSxrQzs7Ozs7Ozs7Ozs7QUNBQSw0QyIsImZpbGUiOiJwYWdlcy9OZXdTZWFyY2gvY2xpZW50U2VhcmNoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSByZXF1aXJlKCcuLi8uLi9zc3ItbW9kdWxlLWNhY2hlLmpzJyk7XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdHZhciB0aHJldyA9IHRydWU7XG4gXHRcdHRyeSB7XG4gXHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG4gXHRcdFx0dGhyZXcgPSBmYWxzZTtcbiBcdFx0fSBmaW5hbGx5IHtcbiBcdFx0XHRpZih0aHJldykgZGVsZXRlIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHR9XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9wYWdlcy9OZXdTZWFyY2gvY2xpZW50U2VhcmNoLmpzXCIpO1xuIiwiLy8gLy8gaW1wb3J0IGZpcmViYXNlIGZyb20gXCJmaXJlYmFzZS9hcHBcIlxuLy8gaW1wb3J0ICogYXMgZmlyZWJhc2UgZnJvbSBcImZpcmViYXNlL2FwcFwiO1xuLy8gLy8gaW1wb3J0IFwiZmlyZWJhc2UvYXV0aFwiXG5cbi8vIGNvbnN0IGFwcCA9IGZpcmViYXNlLmluaXRpYWxpemVBcHAoe1xuLy8gICAgIGFwaUtleTogXCJBSXphU3lDeEMtYThiNVZoaGV5OEdGNDdMcFhaMWFNS1ltaUlod0VcIixcbi8vICAgICBhdXRoRG9tYWluOiBcIm1hZ21vLWFjMTBjLmZpcmViYXNlYXBwLmNvbVwiLFxuLy8gICAgIHByb2plY3RJZDogXCJtYWdtby1hYzEwY1wiLFxuLy8gICAgIHN0b3JhZ2VCdWNrZXQ6IFwibWFnbW8tYWMxMGMuYXBwc3BvdC5jb21cIixcbi8vICAgICBtZXNzYWdpbmdTZW5kZXJJZDogXCIxNzc4NTc1MjUxNDdcIixcbi8vICAgICBhcHBJZDogXCIxOjE3Nzg1NzUyNTE0Nzp3ZWI6YWM4ZTNjODdkODIzOTZiZWIxZGQzZVwiLFxuLy8gICAgIG1lYXN1cmVtZW50SWQ6IFwiRy1MMDIzNkpUNU4zXCJcbi8vIH0pXG5cbi8vIGV4cG9ydCBjb25zdCBhdXRoID0gYXBwLmF1dGgoKVxuLy8gZXhwb3J0IGRlZmF1bHQgYXBwXG5cbi8vIGFwaUtleTogcHJvY2Vzcy5lbnYuUkVBQ1RfQVBQX0ZJUkVCQVNFX0tFWSxcbi8vICAgICBhdXRoRG9tYWluOiBwcm9jZXNzLmVudi5SRUFDVF9BUFBfRklSRUJBU0VfQVVUSF9ET01BSU4sXG4vLyAgICAgcHJvamVjdElkOiBwcm9jZXNzLmVudi5SRUFDVF9BUFBfRklSRUJBU0VfUFJPSkVDVF9JRCxcbi8vICAgICBzdG9yYWdlQnVja2V0OiBwcm9jZXNzLmVudi5SRUFDVF9BUFBfRklSRUJBU0VfU1RPUkFHRV9CVUNLRVQsXG4vLyAgICAgbWVzc2FnaW5nU2VuZGVySWQ6IHByb2Nlc3MuZW52LlJFQUNUX0FQUF9GSVJFQkFTRV9NRVNTQUdJTkdfU0VOREVSX0lELFxuLy8gICAgIGFwcElkOiBwcm9jZXNzLmVudi5SRUFDVF9BUFBfRklSRUJBU0VfQVBQX0lELFxuLy8gICAgIG1lYXN1cmVtZW50SWQ6IHByb2Nlc3MuZW52LlJFQUNUX0FQUF9GSVJFQkFTRV9NRUFTVVJFTUVOVF9JRFxuXG5pbXBvcnQgRmlyZWJhc2UgZnJvbSBcImZpcmViYXNlL2NvbXBhdC9hcHBcIjtcbmltcG9ydCBcImZpcmViYXNlL2NvbXBhdC9hdXRoXCI7XG5pbXBvcnQgXCJmaXJlYmFzZS9jb21wYXQvZmlyZXN0b3JlXCI7XG5pbXBvcnQgXCJmaXJlYmFzZS9jb21wYXQvc3RvcmFnZVwiO1xuXG5jb25zdCBGaXJlYmFzZUNyZWRlbnRpYWxzID0ge1xuICBhcGlLZXk6IFwiQUl6YVN5Q3hDLWE4YjVWaGhleThHRjQ3THBYWjFhTUtZbWlJaHdFXCIsXG4gIGF1dGhEb21haW46XG4gICAgdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWUgPT09IFwibG9jYWxob3N0XCJcbiAgICAgID8gXCJtYWdtby1hYzEwYy5maXJlYmFzZWFwcC5jb21cIlxuICAgICAgOiBcIm1hZ21vLWNsb3VkLndlYi5hcHBcIixcbiAgcHJvamVjdElkOiBcIm1hZ21vLWFjMTBjXCIsXG4gIHN0b3JhZ2VCdWNrZXQ6IFwibWFnbW8tYWMxMGMuYXBwc3BvdC5jb21cIixcbiAgbWVzc2FnaW5nU2VuZGVySWQ6IFwiMTc3ODU3NTI1MTQ3XCIsXG4gIGFwcElkOiBcIjE6MTc3ODU3NTI1MTQ3OndlYjphYzhlM2M4N2Q4MjM5NmJlYjFkZDNlXCIsXG4gIG1lYXN1cmVtZW50SWQ6IFwiRy1MMDIzNkpUNU4zXCIsXG59O1xuLy8gaWYgYSBGaXJlYmFzZSBpbnN0YW5jZSBkb2Vzbid0IGV4aXN0LCBjcmVhdGUgb25lXG5pZiAoIUZpcmViYXNlLmFwcHMubGVuZ3RoKSB7XG4gIEZpcmViYXNlLmluaXRpYWxpemVBcHAoRmlyZWJhc2VDcmVkZW50aWFscyk7XG59XG5cbmV4cG9ydCBjb25zdCBhdXRoID0gRmlyZWJhc2UuYXV0aCgpO1xuZXhwb3J0IGRlZmF1bHQgRmlyZWJhc2U7XG5cbi8vIGltcG9ydCB7IGluaXRpYWxpemVBcHAgfSBmcm9tICdmaXJlYmFzZS9hcHAnO1xuLy8gaW1wb3J0IHsgZ2V0RmlyZXN0b3JlLCBjb2xsZWN0aW9uLCBnZXREb2NzIH0gZnJvbSAnZmlyZWJhc2UvZmlyZXN0b3JlJztcblxuLy8gY29uc3QgYXBwID0gaW5pdGlhbGl6ZUFwcChmaXJlYmFzZUNvbmZpZyk7XG4vLyBjb25zdCBkYiA9IGdldEZpcmVzdG9yZShhcHApO1xuXG4vLyBleHBvcnQgZGVmYXVsdCBhcHA7XG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHtcbiAgQ29udGFpbmVyLFxuICBDYXJkLFxuICBSb3csXG4gIENvbCxcbiAgRm9ybUNvbnRyb2wsXG4gIEJ1dHRvbixcbiAgU3Bpbm5lcixcbn0gZnJvbSBcInJlYWN0LWJvb3RzdHJhcFwiO1xuaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSBcIm5leHQvcm91dGVyXCI7XG5pbXBvcnQgeyBmZXRjaENsaWVudHMgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZmV0Y2hBc3NvY2lhdGlvbnNcIjtcbmltcG9ydCBDbGllbnRUYWJsZSBmcm9tIFwiLi4vLi4vdXRpbHMvQ2xpZW50VGFibGVcIjtcbmltcG9ydCBzdHlsZXMgZnJvbSBcIi4uLy4uL3N0eWxlcy9NYWluU2VhcmNoLm1vZHVsZS5jc3NcIjtcblxuLy8gaW1wb3J0IHN0eWxlcyBmcm9tIFwiLi4vLi4vc3R5bGVzL0NsaWVudFBhZ2UubW9kdWxlLmNzc1wiO1xuXG5jb25zdCBDbGllbnRQYWdlID0gKCkgPT4ge1xuICBjb25zdCBbY2xpZW50cywgc2V0Q2xpZW50c10gPSB1c2VTdGF0ZShbXSk7XG4gIGNvbnN0IFtjbGllbnRTZWFyY2hUZXJtLCBzZXRDbGllbnRTZWFyY2hUZXJtXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbaXNMb2FkaW5nLCBzZXRJc0xvYWRpbmddID0gdXNlU3RhdGUodHJ1ZSk7XG4gIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpO1xuXG4gIC8vIEZldGNoIGNsaWVudHMgd2hlbiB0aGUgY29tcG9uZW50IG1vdW50c1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGZldGNoQ2xpZW50RGF0YSA9IGFzeW5jICgpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGNsaWVudHNEYXRhID0gYXdhaXQgZmV0Y2hDbGllbnRzKCk7XG4gICAgICAgIHNldENsaWVudHMoY2xpZW50c0RhdGEpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGZldGNoaW5nIGNsaWVudHM6IFwiLCBlcnJvcik7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBmZXRjaENsaWVudERhdGEoKTtcbiAgfSwgW10pO1xuXG4gIC8vIEhhbmRsZSBzZWFyY2ggaW5wdXQgY2hhbmdlc1xuICBjb25zdCBoYW5kbGVTZWFyY2hDaGFuZ2UgPSAoZXZlbnQpID0+IHtcbiAgICBzZXRDbGllbnRTZWFyY2hUZXJtKGV2ZW50LnRhcmdldC52YWx1ZSk7XG4gIH07XG5cbiAgLy8gSGFuZGxlIGNsaWVudCBzZWxlY3Rpb25cbiAgY29uc3QgaGFuZGxlU2VsZWN0Q2xpZW50ID0gKGNsaWVudElkKSA9PiB7XG4gICAgY29uc29sZS5sb2coXCJTZWxlY3RlZCBjbGllbnQgSUQ6XCIsIGNsaWVudElkKTtcbiAgICAvLyBSZWRpcmVjdCB0byBjbGllbnQtc3BlY2lmaWMgcGFnZVxuICAgIHJvdXRlci5wdXNoKGBjbGllbnQvJHtjbGllbnRJZH1gKTtcbiAgfTtcblxuICAvLyBIYW5kbGUgY2xpZW50IGluZm8gYnV0dG9uIGNsaWNrXG4gIGNvbnN0IGhhbmRsZUNsaWVudEluZm8gPSAoY2xpZW50SWQpID0+IHtcbiAgICByb3V0ZXIucHVzaChgY2xpZW50LyR7Y2xpZW50SWR9L2FkZENsaWVudGApO1xuICB9O1xuICBcblxuICAvLyBDbGVhciBzZWFyY2ggaW5wdXRcbiAgY29uc3QgY2xlYXJTZWxlY3Rpb24gPSAoKSA9PiB7XG4gICAgc2V0Q2xpZW50U2VhcmNoVGVybShcIlwiKTtcbiAgfTtcblxuICBjb25zdCBhZGRDbGllbnQgPSAoKSA9PiB7XG4gICAgY29uc3QgcmFuZG9tTnVtYmVyID0gTWF0aC5mbG9vcigxMDAwMCArIE1hdGgucmFuZG9tKCkgKiA5MDAwMCk7XG4gIFxuICAvLyBOYXZpZ2F0ZSB0byB0aGUgbmV3IHJvdXRlIHdpdGggdGhlIHJhbmRvbSBudW1iZXJcbiAgcm91dGVyLnB1c2goYGNsaWVudC9BSVMke3JhbmRvbU51bWJlcn0vYWRkQ2xpZW50YCk7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8Q29udGFpbmVyIGNsYXNzTmFtZT1cInB5LTRcIj5cbiAgICAgIDxDYXJkPlxuICAgICAgICA8Q2FyZC5Cb2R5PlxuICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlciBtYi00XCI+Q2xpZW50czwvaDI+XG4gICAgICAgICAge2lzTG9hZGluZyA/IChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZC1mbGV4IGp1c3RpZnktY29udGVudC1jZW50ZXIgYWxpZ24taXRlbXMtY2VudGVyXCJcbiAgICAgICAgICAgICAgc3R5bGU9e3sgbWluSGVpZ2h0OiBcIjMwMHB4XCIgfX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPFNwaW5uZXIgYW5pbWF0aW9uPVwiYm9yZGVyXCIgcm9sZT1cInN0YXR1c1wiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInNyLW9ubHlcIj5Mb2FkaW5nLi4uPC9zcGFuPlxuICAgICAgICAgICAgICA8L1NwaW5uZXI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgPFJvdyBjbGFzc05hbWU9XCJtYi0zXCI+XG4gICAgICAgICAgICAgICAgPENvbCBtZD17eyBzcGFuOiA2LCBvZmZzZXQ6IDMgfX0+XG4gICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2xcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlNlYXJjaCBieSBuYW1lXCJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2NsaWVudFNlYXJjaFRlcm19XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtoYW5kbGVTZWFyY2hDaGFuZ2V9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1iLTNcIlxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDxSb3cgY2xhc3NOYW1lPVwibWItM1wiPlxuICAgICAgICAgICAgICAgICAgICA8Q29sIG1kPXs0fT5cbiAgICAgICAgICAgICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXJpYW50PVwic2Vjb25kYXJ5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctMTAwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2NsZWFyU2VsZWN0aW9ufVxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIENsZWFyIFNlYXJjaFxuICAgICAgICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L0NvbD5cbiAgICAgICAgICAgICAgICAgICAgPENvbCBtZD17NH0+XG4gICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFudD1cInByaW1hcnlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy0xMDBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17YWRkQ2xpZW50fVxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIEFkZCBOZXcgQ2xpZW50XG4gICAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvQ29sPlxuICAgICAgICAgICAgICAgICAgICA8Q29sIG1kPXs0fT5cbiAgICAgICAgICAgICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXJpYW50PVwic2Vjb25kYXJ5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctMTAwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHJvdXRlci5wdXNoKFwiLi4vV2FyZWhvdXNlZGIvV2FyZWhvdXNlU2VsZWN0XCIpfVxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tcbiAgICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9Db2w+XG4gICAgICAgICAgICAgICAgICA8L1Jvdz5cbiAgICAgICAgICAgICAgICA8L0NvbD5cbiAgICAgICAgICAgICAgPC9Sb3c+XG4gICAgICAgICAgICAgIDxDbGllbnRUYWJsZVxuICAgICAgICAgICAgICAgIGNsaWVudHM9e2NsaWVudHMuZmlsdGVyKChjbGllbnQpID0+XG4gICAgICAgICAgICAgICAgICAoY2xpZW50Lm5hbWUgfHwgXCJcIilcbiAgICAgICAgICAgICAgICAgICAgLnRvTG93ZXJDYXNlKClcbiAgICAgICAgICAgICAgICAgICAgLmluY2x1ZGVzKGNsaWVudFNlYXJjaFRlcm0udG9Mb3dlckNhc2UoKSlcbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIG9uU2VsZWN0Q2xpZW50PXtoYW5kbGVTZWxlY3RDbGllbnR9XG4gICAgICAgICAgICAgICAgb25JbmZvQ2xpY2s9e2hhbmRsZUNsaWVudEluZm99XG4gICAgICAgICAgICAgICAgaXNDbGllbnRTZWFyY2g9e3RydWV9XG4gICAgICAgICAgICAgICAgLy8gY2xlYXJTZWxlY3Rpb249e2NsZWFyU2VsZWN0aW9ufVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9DYXJkLkJvZHk+XG4gICAgICA8L0NhcmQ+XG4gICAgPC9Db250YWluZXI+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDbGllbnRQYWdlO1xuIiwiLy8gRXhwb3J0c1xubW9kdWxlLmV4cG9ydHMgPSB7XG5cdFwiY2xpZW50VGFibGVDb250YWluZXJcIjogXCJDbGllbnRUYWJsZV9jbGllbnRUYWJsZUNvbnRhaW5lcl9fMWU5dW5cIixcblx0XCJjbGllbnRUYWJsZVwiOiBcIkNsaWVudFRhYmxlX2NsaWVudFRhYmxlX18xOTR2N1wiLFxuXHRcImJ1dHRvbkdyb3VwXCI6IFwiQ2xpZW50VGFibGVfYnV0dG9uR3JvdXBfX3BTWjd5XCIsXG5cdFwiZmxleEJ1dHRvblwiOiBcIkNsaWVudFRhYmxlX2ZsZXhCdXR0b25fX0xvTmlTXCJcbn07XG4iLCIvLyBFeHBvcnRzXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0XCJsb2FkaW5nLW92ZXJsYXlcIjogXCJNYWluU2VhcmNoX2xvYWRpbmctb3ZlcmxheV9fMTI2MDVcIixcblx0XCJzcGlubmVyLWNlbnRlclwiOiBcIk1haW5TZWFyY2hfc3Bpbm5lci1jZW50ZXJfXzNldnVDXCIsXG5cdFwiZGl2aWRlclwiOiBcIk1haW5TZWFyY2hfZGl2aWRlcl9fM3JTU1VcIixcblx0XCJ0YWJsZUNvbnRhaW5lclwiOiBcIk1haW5TZWFyY2hfdGFibGVDb250YWluZXJfX0xEMThQXCIsXG5cdFwic2Nyb2xsYWJsZVRhYmxlXCI6IFwiTWFpblNlYXJjaF9zY3JvbGxhYmxlVGFibGVfX0V0RGVkXCIsXG5cdFwic3RpY2t5SGVhZGVyXCI6IFwiTWFpblNlYXJjaF9zdGlja3lIZWFkZXJfXzNVbWdJXCIsXG5cdFwic2VhcmNoQ29udGFpbmVyXCI6IFwiTWFpblNlYXJjaF9zZWFyY2hDb250YWluZXJfXzF4Sm51XCIsXG5cdFwiYnV0dG9uR3JvdXBcIjogXCJNYWluU2VhcmNoX2J1dHRvbkdyb3VwX18xR1dJNlwiLFxuXHRcImZsZXhCdXR0b25cIjogXCJNYWluU2VhcmNoX2ZsZXhCdXR0b25fXzN6bnFEXCJcbn07XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBUYWJsZSwgQnV0dG9uIH0gZnJvbSBcInJlYWN0LWJvb3RzdHJhcFwiO1xuaW1wb3J0IHN0eWxlcyBmcm9tIFwiLi4vc3R5bGVzL0NsaWVudFRhYmxlLm1vZHVsZS5jc3NcIjtcblxuY29uc3QgQ2xpZW50VGFibGUgPSAoe1xuICBjbGllbnRzLFxuICBvblNlbGVjdENsaWVudCxcbiAgb25JbmZvQ2xpY2ssXG4gIGNsZWFyU2VsZWN0aW9uLFxuICBvbkFkZENsaWVudCwgLy8gbmV3IHByb3AgZm9yIGFkZC1uZXctY2xpZW50IGFjdGlvblxuICBkaXNhYmxlU2VsZWN0LFxuICBkaXNhYmxlSW5mbyxcbiAgaXNDbGllbnRTZWFyY2gsXG59KSA9PiB7XG4gIHJldHVybiAoXG4gICAgPFRhYmxlIHN0cmlwZWQgYm9yZGVyZWQgaG92ZXIgc2l6ZT1cInNtXCIgY2xhc3NOYW1lPXtzdHlsZXMuY2xpZW50VGFibGV9PlxuICAgICAgPHRoZWFkPlxuICAgICAgICA8dHI+XG4gICAgICAgICAgPHRoPkNsaWVudCBOYW1lPC90aD5cbiAgICAgICAgICB7IWRpc2FibGVJbmZvICYmIDx0aD5JbmZvPC90aD59XG4gICAgICAgICAgeyFkaXNhYmxlU2VsZWN0ICYmIDx0aD5TZWxlY3Q8L3RoPn1cbiAgICAgICAgPC90cj5cbiAgICAgIDwvdGhlYWQ+XG4gICAgICA8dGJvZHk+XG4gICAgICAgIDx0cj5cbiAgICAgICAgICA8dGQgY29sU3Bhbj1cIjNcIiBzdHlsZT17eyB0ZXh0QWxpZ246IFwiY2VudGVyXCIgfX0+XG4gICAgICAgICAgICA8QnV0dG9uIHZhcmlhbnQ9XCJzZWNvbmRhcnlcIiBvbkNsaWNrPXtjbGVhclNlbGVjdGlvbn0+XG4gICAgICAgICAgICAgIENsZWFyIFNlbGVjdGlvblxuICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICB7LyogTmV3IEFkZCBOZXcgQ2xpZW50IGJ1dHRvbiAqL31cbiAgICAgICAgICAgIDxCdXR0b24gdmFyaWFudD1cInByaW1hcnlcIiBvbkNsaWNrPXtvbkFkZENsaWVudH0gY2xhc3NOYW1lPVwibXMtMlwiPlxuICAgICAgICAgICAgICBBZGQgTmV3IENsaWVudFxuICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgPC90ZD5cbiAgICAgICAgPC90cj5cbiAgICAgICAge2NsaWVudHMubWFwKChjbGllbnQpID0+IChcbiAgICAgICAgICA8dHIga2V5PXtjbGllbnQuaWR9PlxuICAgICAgICAgICAgPHRkPntjbGllbnQubmFtZX08L3RkPlxuICAgICAgICAgICAgeyFkaXNhYmxlSW5mbyAmJiAoXG4gICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgICAgICB2YXJpYW50PVwiaW5mb1wiXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBvbkluZm9DbGljayhjbGllbnQuaWQsIGNsaWVudC5uYW1lKX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICB7aXNDbGllbnRTZWFyY2ggPyBcIkVkaXRcIiA6IFwiSW5mb1wifVxuICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIHshZGlzYWJsZVNlbGVjdCAmJiAoXG4gICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgICAgICB2YXJpYW50PVwicHJpbWFyeVwiXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBvblNlbGVjdENsaWVudChjbGllbnQuaWQpfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIFNlbGVjdFxuICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L3RyPlxuICAgICAgICApKX1cbiAgICAgIDwvdGJvZHk+XG4gICAgPC9UYWJsZT5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENsaWVudFRhYmxlO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IGZpcmViYXNlIGZyb20gXCIuLi9jb250ZXh0L0ZpcmViYXNlXCI7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmZXRjaFBhcnRzV2l0aE1hY2hpbmVEYXRhKCkge1xuICBjb25zdCBkYiA9IGZpcmViYXNlLmZpcmVzdG9yZSgpO1xuICBjb25zdCBwYXJ0c1NuYXBzaG90ID0gYXdhaXQgZGIuY29sbGVjdGlvbihcIlRlc3RcIikuZ2V0KCk7XG4gIGNvbnN0IHBhcnRzID0gYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgcGFydHNTbmFwc2hvdC5kb2NzLm1hcChhc3luYyAocGFydERvYykgPT4ge1xuICAgICAgY29uc3QgcGFydERhdGEgPSBwYXJ0RG9jLmRhdGEoKTtcbiAgICAgIHBhcnREYXRhLmlkID0gcGFydERvYy5pZDsgLy8gQWRkIGRvY3VtZW50IElEIGhlcmVcbiAgICAgIC8vIGNvbnNvbGUubG9nKHBhcnREYXRhKTtcbiAgICAgIGlmIChcbiAgICAgICAgcGFydERhdGEuTWFjaGluZSAmJlxuICAgICAgICBwYXJ0RGF0YS5NYWNoaW5lIGluc3RhbmNlb2YgZmlyZWJhc2UuZmlyZXN0b3JlLkRvY3VtZW50UmVmZXJlbmNlXG4gICAgICApIHtcbiAgICAgICAgY29uc29sZS5sb2cocGFydERhdGEuTWFjaGluZSk7XG4gICAgICAgIGNvbnN0IG1hY2hpbmVEb2MgPSBhd2FpdCBwYXJ0RGF0YS5NYWNoaW5lLmdldCgpO1xuICAgICAgICBwYXJ0RGF0YS5tYWNoaW5lRGF0YSA9IG1hY2hpbmVEb2MuZXhpc3RzID8gbWFjaGluZURvYy5kYXRhKCkgOiB7fTtcbiAgICAgICAgaWYgKHBhcnREYXRhLm1hY2hpbmVEYXRhLmNsaWVudCkge1xuICAgICAgICAgIGNvbnN0IGNsaWVudERvYyA9IGF3YWl0IHBhcnREYXRhLm1hY2hpbmVEYXRhLmNsaWVudC5nZXQoKTtcbiAgICAgICAgICBwYXJ0RGF0YS5tYWNoaW5lRGF0YS5DbGllbnQgPSBjbGllbnREb2MuZXhpc3RzXG4gICAgICAgICAgICA/IGNsaWVudERvYy5kYXRhKCkubmFtZVxuICAgICAgICAgICAgOiBcIlwiO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJ0RGF0YS5tYWNoaW5lRGF0YSA9IHt9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHBhcnREYXRhO1xuICAgIH0pXG4gICk7XG4gIHJldHVybiBwYXJ0cztcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZldGNoQ2xpZW50cyhzZWxlY3RlZE9FTSwgc2VsZWN0ZWRNb2RhbGl0eSkge1xuICBjb25zdCBkYiA9IGZpcmViYXNlLmZpcmVzdG9yZSgpO1xuICBjb25zdCBjbGllbnRzU25hcHNob3QgPSBhd2FpdCBkYi5jb2xsZWN0aW9uKFwiQ2xpZW50XCIpLmdldCgpO1xuICBjb25zdCBjbGllbnRzID0gY2xpZW50c1NuYXBzaG90LmRvY3MubWFwKChkb2MpID0+ICh7XG4gICAgaWQ6IGRvYy5pZCxcbiAgICAuLi5kb2MuZGF0YSgpLFxuICB9KSk7XG5cbiAgLy8gRmlsdGVyIGNsaWVudHMgYmFzZWQgb24gT0VNIGFuZCBNb2RhbGl0eSBpZiBzZWxlY3RlZFxuICBpZiAoc2VsZWN0ZWRPRU0gfHwgc2VsZWN0ZWRNb2RhbGl0eSkge1xuICAgIGNvbnN0IGZpbHRlcmVkQ2xpZW50cyA9IFtdO1xuICAgIGZvciAoY29uc3QgY2xpZW50IG9mIGNsaWVudHMpIHtcbiAgICAgIGxldCBtYXRjaCA9IHRydWU7XG4gICAgICBpZiAoc2VsZWN0ZWRPRU0gfHwgc2VsZWN0ZWRNb2RhbGl0eSkge1xuICAgICAgICBmb3IgKGNvbnN0IG1hY2hpbmVSZWYgb2YgY2xpZW50Lm1hY2hpbmVzKSB7XG4gICAgICAgICAgY29uc3QgbWFjaGluZURvYyA9IGF3YWl0IG1hY2hpbmVSZWYuZ2V0KCk7XG4gICAgICAgICAgY29uc3QgbWFjaGluZURhdGEgPSBtYWNoaW5lRG9jLmRhdGEoKTtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAoc2VsZWN0ZWRPRU0gJiYgbWFjaGluZURhdGEuT0VNID09PSBzZWxlY3RlZE9FTSkgfHxcbiAgICAgICAgICAgIChzZWxlY3RlZE1vZGFsaXR5ICYmIG1hY2hpbmVEYXRhLk1vZGFsaXR5ID09PSBzZWxlY3RlZE1vZGFsaXR5KVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgbWF0Y2ggPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1hdGNoID0gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgZmlsdGVyZWRDbGllbnRzLnB1c2goY2xpZW50KTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZpbHRlcmVkQ2xpZW50cztcbiAgfVxuXG4gIHJldHVybiBjbGllbnRzO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZmV0Y2hNb2RlbHMoXG4gIHNlbGVjdGVkT0VNLFxuICBzZWxlY3RlZE1vZGFsaXR5LFxuICBzZWxlY3RlZENsaWVudFxuKSB7XG4gIGNvbnN0IGRiID0gZmlyZWJhc2UuZmlyZXN0b3JlKCk7XG4gIGNvbnN0IG1hY2hpbmVzU25hcHNob3QgPSBhd2FpdCBkYi5jb2xsZWN0aW9uKFwiTWFjaGluZVwiKS5nZXQoKTtcbiAgY29uc3QgbW9kZWxzID0gbmV3IFNldCgpO1xuXG4gIGF3YWl0IFByb21pc2UuYWxsKFxuICAgIG1hY2hpbmVzU25hcHNob3QuZG9jcy5tYXAoYXN5bmMgKG1hY2hpbmVEb2MpID0+IHtcbiAgICAgIGNvbnN0IG1hY2hpbmVEYXRhID0gbWFjaGluZURvYy5kYXRhKCk7XG4gICAgICBsZXQgaXNWYWxpZCA9IHRydWU7XG5cbiAgICAgIGlmIChzZWxlY3RlZE9FTSAmJiBtYWNoaW5lRGF0YS5PRU0gIT09IHNlbGVjdGVkT0VNKSBpc1ZhbGlkID0gZmFsc2U7XG4gICAgICBpZiAoc2VsZWN0ZWRNb2RhbGl0eSAmJiBtYWNoaW5lRGF0YS5Nb2RhbGl0eSAhPT0gc2VsZWN0ZWRNb2RhbGl0eSlcbiAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xuICAgICAgaWYgKHNlbGVjdGVkQ2xpZW50ICYmIG1hY2hpbmVEYXRhLmNsaWVudCkge1xuICAgICAgICBjb25zdCBjbGllbnREb2MgPSBhd2FpdCBtYWNoaW5lRGF0YS5jbGllbnQuZ2V0KCk7XG4gICAgICAgIGlmICghY2xpZW50RG9jLmV4aXN0cyB8fCBjbGllbnREb2MuZGF0YSgpLm5hbWUgIT09IHNlbGVjdGVkQ2xpZW50KVxuICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgaWYgKGlzVmFsaWQpIHtcbiAgICAgICAgbW9kZWxzLmFkZChtYWNoaW5lRGF0YS5Nb2RlbCk7XG4gICAgICB9XG4gICAgfSlcbiAgKTtcblxuICByZXR1cm4gQXJyYXkuZnJvbShtb2RlbHMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0RGF0ZSh0aW1lc3RhbXApIHtcbiAgaWYgKCF0aW1lc3RhbXApIHJldHVybiBcIlwiO1xuICBsZXQgZGF0ZTtcbiAgaWYgKHRpbWVzdGFtcC50b0RhdGUpIHtcbiAgICBkYXRlID0gdGltZXN0YW1wLnRvRGF0ZSgpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiB0aW1lc3RhbXAgPT09IFwic3RyaW5nXCIgfHwgdHlwZW9mIHRpbWVzdGFtcCA9PT0gXCJudW1iZXJcIikge1xuICAgIGRhdGUgPSBuZXcgRGF0ZSh0aW1lc3RhbXApO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBcIlwiOyAvLyBoYW5kbGUgdW5leHBlY3RlZCBmb3JtYXRzXG4gIH1cbiAgY29uc3QgZGF5ID0gU3RyaW5nKGRhdGUuZ2V0RGF0ZSgpKS5wYWRTdGFydCgyLCBcIjBcIik7XG4gIGNvbnN0IG1vbnRoID0gU3RyaW5nKGRhdGUuZ2V0TW9udGgoKSArIDEpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcbiAgY29uc3QgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgcmV0dXJuIGAke21vbnRofS8ke2RheX0vJHt5ZWFyfWA7XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmaXJlYmFzZS9jb21wYXQvYXBwXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZpcmViYXNlL2NvbXBhdC9hdXRoXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZpcmViYXNlL2NvbXBhdC9maXJlc3RvcmVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZmlyZWJhc2UvY29tcGF0L3N0b3JhZ2VcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmV4dC9yb3V0ZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3RcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtYm9vdHN0cmFwXCIpOyJdLCJzb3VyY2VSb290IjoiIn0=