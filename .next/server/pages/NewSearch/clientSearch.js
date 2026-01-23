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
  authDomain: "magmo-ac10c.firebaseapp.com",
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
var _jsxFileName = "C:\\Users\\mack2\\OneDrive\\Desktop\\code\\pages\\NewSearch\\clientSearch.js";
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
var _jsxFileName = "C:\\Users\\mack2\\OneDrive\\Desktop\\code\\utils\\ClientTable.js";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vY29udGV4dC9GaXJlYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9wYWdlcy9OZXdTZWFyY2gvY2xpZW50U2VhcmNoLmpzIiwid2VicGFjazovLy8uL3N0eWxlcy9DbGllbnRUYWJsZS5tb2R1bGUuY3NzIiwid2VicGFjazovLy8uL3N0eWxlcy9NYWluU2VhcmNoLm1vZHVsZS5jc3MiLCJ3ZWJwYWNrOi8vLy4vdXRpbHMvQ2xpZW50VGFibGUuanMiLCJ3ZWJwYWNrOi8vLy4vdXRpbHMvZmV0Y2hBc3NvY2lhdGlvbnMuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZmlyZWJhc2UvY29tcGF0L2FwcFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImZpcmViYXNlL2NvbXBhdC9hdXRoXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZmlyZWJhc2UvY29tcGF0L2ZpcmVzdG9yZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImZpcmViYXNlL2NvbXBhdC9zdG9yYWdlXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibmV4dC9yb3V0ZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LWJvb3RzdHJhcFwiIl0sIm5hbWVzIjpbIkZpcmViYXNlQ3JlZGVudGlhbHMiLCJhcGlLZXkiLCJhdXRoRG9tYWluIiwicHJvamVjdElkIiwic3RvcmFnZUJ1Y2tldCIsIm1lc3NhZ2luZ1NlbmRlcklkIiwiYXBwSWQiLCJtZWFzdXJlbWVudElkIiwiRmlyZWJhc2UiLCJhcHBzIiwibGVuZ3RoIiwiaW5pdGlhbGl6ZUFwcCIsImF1dGgiLCJDbGllbnRQYWdlIiwiY2xpZW50cyIsInNldENsaWVudHMiLCJ1c2VTdGF0ZSIsImNsaWVudFNlYXJjaFRlcm0iLCJzZXRDbGllbnRTZWFyY2hUZXJtIiwiaXNMb2FkaW5nIiwic2V0SXNMb2FkaW5nIiwicm91dGVyIiwidXNlUm91dGVyIiwidXNlRWZmZWN0IiwiZmV0Y2hDbGllbnREYXRhIiwiY2xpZW50c0RhdGEiLCJmZXRjaENsaWVudHMiLCJlcnJvciIsImNvbnNvbGUiLCJoYW5kbGVTZWFyY2hDaGFuZ2UiLCJldmVudCIsInRhcmdldCIsInZhbHVlIiwiaGFuZGxlU2VsZWN0Q2xpZW50IiwiY2xpZW50SWQiLCJsb2ciLCJwdXNoIiwiaGFuZGxlQ2xpZW50SW5mbyIsImNsZWFyU2VsZWN0aW9uIiwiYWRkQ2xpZW50IiwicmFuZG9tTnVtYmVyIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwibWluSGVpZ2h0Iiwic3BhbiIsIm9mZnNldCIsImZpbHRlciIsImNsaWVudCIsIm5hbWUiLCJ0b0xvd2VyQ2FzZSIsImluY2x1ZGVzIiwiQ2xpZW50VGFibGUiLCJvblNlbGVjdENsaWVudCIsIm9uSW5mb0NsaWNrIiwib25BZGRDbGllbnQiLCJkaXNhYmxlU2VsZWN0IiwiZGlzYWJsZUluZm8iLCJpc0NsaWVudFNlYXJjaCIsInN0eWxlcyIsImNsaWVudFRhYmxlIiwidGV4dEFsaWduIiwibWFwIiwiaWQiLCJmZXRjaFBhcnRzV2l0aE1hY2hpbmVEYXRhIiwiZGIiLCJmaXJlYmFzZSIsImZpcmVzdG9yZSIsInBhcnRzU25hcHNob3QiLCJjb2xsZWN0aW9uIiwiZ2V0IiwicGFydHMiLCJQcm9taXNlIiwiYWxsIiwiZG9jcyIsInBhcnREb2MiLCJwYXJ0RGF0YSIsImRhdGEiLCJNYWNoaW5lIiwiRG9jdW1lbnRSZWZlcmVuY2UiLCJtYWNoaW5lRG9jIiwibWFjaGluZURhdGEiLCJleGlzdHMiLCJjbGllbnREb2MiLCJDbGllbnQiLCJzZWxlY3RlZE9FTSIsInNlbGVjdGVkTW9kYWxpdHkiLCJjbGllbnRzU25hcHNob3QiLCJkb2MiLCJmaWx0ZXJlZENsaWVudHMiLCJtYXRjaCIsIm1hY2hpbmVSZWYiLCJtYWNoaW5lcyIsIk9FTSIsIk1vZGFsaXR5IiwiZmV0Y2hNb2RlbHMiLCJzZWxlY3RlZENsaWVudCIsIm1hY2hpbmVzU25hcHNob3QiLCJtb2RlbHMiLCJTZXQiLCJpc1ZhbGlkIiwiYWRkIiwiTW9kZWwiLCJBcnJheSIsImZyb20iLCJmb3JtYXREYXRlIiwidGltZXN0YW1wIiwiZGF0ZSIsInRvRGF0ZSIsIkRhdGUiLCJkYXkiLCJTdHJpbmciLCJnZXREYXRlIiwicGFkU3RhcnQiLCJtb250aCIsImdldE1vbnRoIiwieWVhciIsImdldEZ1bGxZZWFyIl0sIm1hcHBpbmdzIjoiOztRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsSUFBSTtRQUNKO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDeEZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFD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Q0FBLG9EOzs7Ozs7Ozs7OztBQ0FBLHdDOzs7Ozs7Ozs7OztBQ0FBLGtDOzs7Ozs7Ozs7OztBQ0FBLDRDIiwiZmlsZSI6InBhZ2VzL05ld1NlYXJjaC9jbGllbnRTZWFyY2guanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHJlcXVpcmUoJy4uLy4uL3Nzci1tb2R1bGUtY2FjaGUuanMnKTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0dmFyIHRocmV3ID0gdHJ1ZTtcbiBcdFx0dHJ5IHtcbiBcdFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcbiBcdFx0XHR0aHJldyA9IGZhbHNlO1xuIFx0XHR9IGZpbmFsbHkge1xuIFx0XHRcdGlmKHRocmV3KSBkZWxldGUgaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdH1cblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3BhZ2VzL05ld1NlYXJjaC9jbGllbnRTZWFyY2guanNcIik7XG4iLCIvLyAvLyBpbXBvcnQgZmlyZWJhc2UgZnJvbSBcImZpcmViYXNlL2FwcFwiXG4vLyBpbXBvcnQgKiBhcyBmaXJlYmFzZSBmcm9tIFwiZmlyZWJhc2UvYXBwXCI7XG4vLyAvLyBpbXBvcnQgXCJmaXJlYmFzZS9hdXRoXCJcblxuLy8gY29uc3QgYXBwID0gZmlyZWJhc2UuaW5pdGlhbGl6ZUFwcCh7XG4vLyAgICAgYXBpS2V5OiBcIkFJemFTeUN4Qy1hOGI1VmhoZXk4R0Y0N0xwWFoxYU1LWW1pSWh3RVwiLFxuLy8gICAgIGF1dGhEb21haW46IFwibWFnbW8tYWMxMGMuZmlyZWJhc2VhcHAuY29tXCIsXG4vLyAgICAgcHJvamVjdElkOiBcIm1hZ21vLWFjMTBjXCIsXG4vLyAgICAgc3RvcmFnZUJ1Y2tldDogXCJtYWdtby1hYzEwYy5hcHBzcG90LmNvbVwiLFxuLy8gICAgIG1lc3NhZ2luZ1NlbmRlcklkOiBcIjE3Nzg1NzUyNTE0N1wiLFxuLy8gICAgIGFwcElkOiBcIjE6MTc3ODU3NTI1MTQ3OndlYjphYzhlM2M4N2Q4MjM5NmJlYjFkZDNlXCIsXG4vLyAgICAgbWVhc3VyZW1lbnRJZDogXCJHLUwwMjM2SlQ1TjNcIlxuLy8gfSlcblxuLy8gZXhwb3J0IGNvbnN0IGF1dGggPSBhcHAuYXV0aCgpXG4vLyBleHBvcnQgZGVmYXVsdCBhcHBcblxuLy8gYXBpS2V5OiBwcm9jZXNzLmVudi5SRUFDVF9BUFBfRklSRUJBU0VfS0VZLFxuLy8gICAgIGF1dGhEb21haW46IHByb2Nlc3MuZW52LlJFQUNUX0FQUF9GSVJFQkFTRV9BVVRIX0RPTUFJTixcbi8vICAgICBwcm9qZWN0SWQ6IHByb2Nlc3MuZW52LlJFQUNUX0FQUF9GSVJFQkFTRV9QUk9KRUNUX0lELFxuLy8gICAgIHN0b3JhZ2VCdWNrZXQ6IHByb2Nlc3MuZW52LlJFQUNUX0FQUF9GSVJFQkFTRV9TVE9SQUdFX0JVQ0tFVCxcbi8vICAgICBtZXNzYWdpbmdTZW5kZXJJZDogcHJvY2Vzcy5lbnYuUkVBQ1RfQVBQX0ZJUkVCQVNFX01FU1NBR0lOR19TRU5ERVJfSUQsXG4vLyAgICAgYXBwSWQ6IHByb2Nlc3MuZW52LlJFQUNUX0FQUF9GSVJFQkFTRV9BUFBfSUQsXG4vLyAgICAgbWVhc3VyZW1lbnRJZDogcHJvY2Vzcy5lbnYuUkVBQ1RfQVBQX0ZJUkVCQVNFX01FQVNVUkVNRU5UX0lEXG5cbmltcG9ydCBGaXJlYmFzZSBmcm9tIFwiZmlyZWJhc2UvY29tcGF0L2FwcFwiO1xuaW1wb3J0IFwiZmlyZWJhc2UvY29tcGF0L2F1dGhcIjtcbmltcG9ydCBcImZpcmViYXNlL2NvbXBhdC9maXJlc3RvcmVcIjtcbmltcG9ydCBcImZpcmViYXNlL2NvbXBhdC9zdG9yYWdlXCI7XG5cbmNvbnN0IEZpcmViYXNlQ3JlZGVudGlhbHMgPSB7XG4gIGFwaUtleTogXCJBSXphU3lDeEMtYThiNVZoaGV5OEdGNDdMcFhaMWFNS1ltaUlod0VcIixcbiAgYXV0aERvbWFpbjogXCJtYWdtby1hYzEwYy5maXJlYmFzZWFwcC5jb21cIixcbiAgcHJvamVjdElkOiBcIm1hZ21vLWFjMTBjXCIsXG4gIHN0b3JhZ2VCdWNrZXQ6IFwibWFnbW8tYWMxMGMuYXBwc3BvdC5jb21cIixcbiAgbWVzc2FnaW5nU2VuZGVySWQ6IFwiMTc3ODU3NTI1MTQ3XCIsXG4gIGFwcElkOiBcIjE6MTc3ODU3NTI1MTQ3OndlYjphYzhlM2M4N2Q4MjM5NmJlYjFkZDNlXCIsXG4gIG1lYXN1cmVtZW50SWQ6IFwiRy1MMDIzNkpUNU4zXCIsXG59O1xuLy8gaWYgYSBGaXJlYmFzZSBpbnN0YW5jZSBkb2Vzbid0IGV4aXN0LCBjcmVhdGUgb25lXG5pZiAoIUZpcmViYXNlLmFwcHMubGVuZ3RoKSB7XG4gIEZpcmViYXNlLmluaXRpYWxpemVBcHAoRmlyZWJhc2VDcmVkZW50aWFscyk7XG59XG5cbmV4cG9ydCBjb25zdCBhdXRoID0gRmlyZWJhc2UuYXV0aCgpO1xuZXhwb3J0IGRlZmF1bHQgRmlyZWJhc2U7XG5cbi8vIGltcG9ydCB7IGluaXRpYWxpemVBcHAgfSBmcm9tICdmaXJlYmFzZS9hcHAnO1xuLy8gaW1wb3J0IHsgZ2V0RmlyZXN0b3JlLCBjb2xsZWN0aW9uLCBnZXREb2NzIH0gZnJvbSAnZmlyZWJhc2UvZmlyZXN0b3JlJztcblxuLy8gY29uc3QgYXBwID0gaW5pdGlhbGl6ZUFwcChmaXJlYmFzZUNvbmZpZyk7XG4vLyBjb25zdCBkYiA9IGdldEZpcmVzdG9yZShhcHApO1xuXG4vLyBleHBvcnQgZGVmYXVsdCBhcHA7XG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHtcbiAgQ29udGFpbmVyLFxuICBDYXJkLFxuICBSb3csXG4gIENvbCxcbiAgRm9ybUNvbnRyb2wsXG4gIEJ1dHRvbixcbiAgU3Bpbm5lcixcbn0gZnJvbSBcInJlYWN0LWJvb3RzdHJhcFwiO1xuaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSBcIm5leHQvcm91dGVyXCI7XG5pbXBvcnQgeyBmZXRjaENsaWVudHMgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZmV0Y2hBc3NvY2lhdGlvbnNcIjtcbmltcG9ydCBDbGllbnRUYWJsZSBmcm9tIFwiLi4vLi4vdXRpbHMvQ2xpZW50VGFibGVcIjtcbmltcG9ydCBzdHlsZXMgZnJvbSBcIi4uLy4uL3N0eWxlcy9NYWluU2VhcmNoLm1vZHVsZS5jc3NcIjtcblxuLy8gaW1wb3J0IHN0eWxlcyBmcm9tIFwiLi4vLi4vc3R5bGVzL0NsaWVudFBhZ2UubW9kdWxlLmNzc1wiO1xuXG5jb25zdCBDbGllbnRQYWdlID0gKCkgPT4ge1xuICBjb25zdCBbY2xpZW50cywgc2V0Q2xpZW50c10gPSB1c2VTdGF0ZShbXSk7XG4gIGNvbnN0IFtjbGllbnRTZWFyY2hUZXJtLCBzZXRDbGllbnRTZWFyY2hUZXJtXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbaXNMb2FkaW5nLCBzZXRJc0xvYWRpbmddID0gdXNlU3RhdGUodHJ1ZSk7XG4gIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpO1xuXG4gIC8vIEZldGNoIGNsaWVudHMgd2hlbiB0aGUgY29tcG9uZW50IG1vdW50c1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGZldGNoQ2xpZW50RGF0YSA9IGFzeW5jICgpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGNsaWVudHNEYXRhID0gYXdhaXQgZmV0Y2hDbGllbnRzKCk7XG4gICAgICAgIHNldENsaWVudHMoY2xpZW50c0RhdGEpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGZldGNoaW5nIGNsaWVudHM6IFwiLCBlcnJvcik7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBmZXRjaENsaWVudERhdGEoKTtcbiAgfSwgW10pO1xuXG4gIC8vIEhhbmRsZSBzZWFyY2ggaW5wdXQgY2hhbmdlc1xuICBjb25zdCBoYW5kbGVTZWFyY2hDaGFuZ2UgPSAoZXZlbnQpID0+IHtcbiAgICBzZXRDbGllbnRTZWFyY2hUZXJtKGV2ZW50LnRhcmdldC52YWx1ZSk7XG4gIH07XG5cbiAgLy8gSGFuZGxlIGNsaWVudCBzZWxlY3Rpb25cbiAgY29uc3QgaGFuZGxlU2VsZWN0Q2xpZW50ID0gKGNsaWVudElkKSA9PiB7XG4gICAgY29uc29sZS5sb2coXCJTZWxlY3RlZCBjbGllbnQgSUQ6XCIsIGNsaWVudElkKTtcbiAgICAvLyBSZWRpcmVjdCB0byBjbGllbnQtc3BlY2lmaWMgcGFnZVxuICAgIHJvdXRlci5wdXNoKGBjbGllbnQvJHtjbGllbnRJZH1gKTtcbiAgfTtcblxuICAvLyBIYW5kbGUgY2xpZW50IGluZm8gYnV0dG9uIGNsaWNrXG4gIGNvbnN0IGhhbmRsZUNsaWVudEluZm8gPSAoY2xpZW50SWQpID0+IHtcbiAgICByb3V0ZXIucHVzaChgY2xpZW50LyR7Y2xpZW50SWR9L2FkZENsaWVudGApO1xuICB9O1xuICBcblxuICAvLyBDbGVhciBzZWFyY2ggaW5wdXRcbiAgY29uc3QgY2xlYXJTZWxlY3Rpb24gPSAoKSA9PiB7XG4gICAgc2V0Q2xpZW50U2VhcmNoVGVybShcIlwiKTtcbiAgfTtcblxuICBjb25zdCBhZGRDbGllbnQgPSAoKSA9PiB7XG4gICAgY29uc3QgcmFuZG9tTnVtYmVyID0gTWF0aC5mbG9vcigxMDAwMCArIE1hdGgucmFuZG9tKCkgKiA5MDAwMCk7XG4gIFxuICAvLyBOYXZpZ2F0ZSB0byB0aGUgbmV3IHJvdXRlIHdpdGggdGhlIHJhbmRvbSBudW1iZXJcbiAgcm91dGVyLnB1c2goYGNsaWVudC9BSVMke3JhbmRvbU51bWJlcn0vYWRkQ2xpZW50YCk7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8Q29udGFpbmVyIGNsYXNzTmFtZT1cInB5LTRcIj5cbiAgICAgIDxDYXJkPlxuICAgICAgICA8Q2FyZC5Cb2R5PlxuICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlciBtYi00XCI+Q2xpZW50czwvaDI+XG4gICAgICAgICAge2lzTG9hZGluZyA/IChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZC1mbGV4IGp1c3RpZnktY29udGVudC1jZW50ZXIgYWxpZ24taXRlbXMtY2VudGVyXCJcbiAgICAgICAgICAgICAgc3R5bGU9e3sgbWluSGVpZ2h0OiBcIjMwMHB4XCIgfX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPFNwaW5uZXIgYW5pbWF0aW9uPVwiYm9yZGVyXCIgcm9sZT1cInN0YXR1c1wiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInNyLW9ubHlcIj5Mb2FkaW5nLi4uPC9zcGFuPlxuICAgICAgICAgICAgICA8L1NwaW5uZXI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgPFJvdyBjbGFzc05hbWU9XCJtYi0zXCI+XG4gICAgICAgICAgICAgICAgPENvbCBtZD17eyBzcGFuOiA2LCBvZmZzZXQ6IDMgfX0+XG4gICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2xcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlNlYXJjaCBieSBuYW1lXCJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2NsaWVudFNlYXJjaFRlcm19XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtoYW5kbGVTZWFyY2hDaGFuZ2V9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1iLTNcIlxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDxSb3cgY2xhc3NOYW1lPVwibWItM1wiPlxuICAgICAgICAgICAgICAgICAgICA8Q29sIG1kPXs0fT5cbiAgICAgICAgICAgICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXJpYW50PVwic2Vjb25kYXJ5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctMTAwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2NsZWFyU2VsZWN0aW9ufVxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIENsZWFyIFNlYXJjaFxuICAgICAgICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L0NvbD5cbiAgICAgICAgICAgICAgICAgICAgPENvbCBtZD17NH0+XG4gICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFudD1cInByaW1hcnlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy0xMDBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17YWRkQ2xpZW50fVxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIEFkZCBOZXcgQ2xpZW50XG4gICAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvQ29sPlxuICAgICAgICAgICAgICAgICAgICA8Q29sIG1kPXs0fT5cbiAgICAgICAgICAgICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXJpYW50PVwic2Vjb25kYXJ5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctMTAwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHJvdXRlci5wdXNoKFwiLi4vV2FyZWhvdXNlZGIvV2FyZWhvdXNlU2VsZWN0XCIpfVxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tcbiAgICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9Db2w+XG4gICAgICAgICAgICAgICAgICA8L1Jvdz5cbiAgICAgICAgICAgICAgICA8L0NvbD5cbiAgICAgICAgICAgICAgPC9Sb3c+XG4gICAgICAgICAgICAgIDxDbGllbnRUYWJsZVxuICAgICAgICAgICAgICAgIGNsaWVudHM9e2NsaWVudHMuZmlsdGVyKChjbGllbnQpID0+XG4gICAgICAgICAgICAgICAgICAoY2xpZW50Lm5hbWUgfHwgXCJcIilcbiAgICAgICAgICAgICAgICAgICAgLnRvTG93ZXJDYXNlKClcbiAgICAgICAgICAgICAgICAgICAgLmluY2x1ZGVzKGNsaWVudFNlYXJjaFRlcm0udG9Mb3dlckNhc2UoKSlcbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIG9uU2VsZWN0Q2xpZW50PXtoYW5kbGVTZWxlY3RDbGllbnR9XG4gICAgICAgICAgICAgICAgb25JbmZvQ2xpY2s9e2hhbmRsZUNsaWVudEluZm99XG4gICAgICAgICAgICAgICAgaXNDbGllbnRTZWFyY2g9e3RydWV9XG4gICAgICAgICAgICAgICAgLy8gY2xlYXJTZWxlY3Rpb249e2NsZWFyU2VsZWN0aW9ufVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9DYXJkLkJvZHk+XG4gICAgICA8L0NhcmQ+XG4gICAgPC9Db250YWluZXI+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDbGllbnRQYWdlO1xuIiwiLy8gRXhwb3J0c1xubW9kdWxlLmV4cG9ydHMgPSB7XG5cdFwiY2xpZW50VGFibGVDb250YWluZXJcIjogXCJDbGllbnRUYWJsZV9jbGllbnRUYWJsZUNvbnRhaW5lcl9fMWU5dW5cIixcblx0XCJjbGllbnRUYWJsZVwiOiBcIkNsaWVudFRhYmxlX2NsaWVudFRhYmxlX18xOTR2N1wiLFxuXHRcImJ1dHRvbkdyb3VwXCI6IFwiQ2xpZW50VGFibGVfYnV0dG9uR3JvdXBfX3BTWjd5XCIsXG5cdFwiZmxleEJ1dHRvblwiOiBcIkNsaWVudFRhYmxlX2ZsZXhCdXR0b25fX0xvTmlTXCJcbn07XG4iLCIvLyBFeHBvcnRzXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0XCJsb2FkaW5nLW92ZXJsYXlcIjogXCJNYWluU2VhcmNoX2xvYWRpbmctb3ZlcmxheV9fMTI2MDVcIixcblx0XCJzcGlubmVyLWNlbnRlclwiOiBcIk1haW5TZWFyY2hfc3Bpbm5lci1jZW50ZXJfXzNldnVDXCIsXG5cdFwiZGl2aWRlclwiOiBcIk1haW5TZWFyY2hfZGl2aWRlcl9fM3JTU1VcIixcblx0XCJ0YWJsZUNvbnRhaW5lclwiOiBcIk1haW5TZWFyY2hfdGFibGVDb250YWluZXJfX0xEMThQXCIsXG5cdFwic2Nyb2xsYWJsZVRhYmxlXCI6IFwiTWFpblNlYXJjaF9zY3JvbGxhYmxlVGFibGVfX0V0RGVkXCIsXG5cdFwic3RpY2t5SGVhZGVyXCI6IFwiTWFpblNlYXJjaF9zdGlja3lIZWFkZXJfXzNVbWdJXCIsXG5cdFwic2VhcmNoQ29udGFpbmVyXCI6IFwiTWFpblNlYXJjaF9zZWFyY2hDb250YWluZXJfXzF4Sm51XCIsXG5cdFwiYnV0dG9uR3JvdXBcIjogXCJNYWluU2VhcmNoX2J1dHRvbkdyb3VwX18xR1dJNlwiLFxuXHRcImZsZXhCdXR0b25cIjogXCJNYWluU2VhcmNoX2ZsZXhCdXR0b25fXzN6bnFEXCJcbn07XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBUYWJsZSwgQnV0dG9uIH0gZnJvbSBcInJlYWN0LWJvb3RzdHJhcFwiO1xuaW1wb3J0IHN0eWxlcyBmcm9tIFwiLi4vc3R5bGVzL0NsaWVudFRhYmxlLm1vZHVsZS5jc3NcIjtcblxuY29uc3QgQ2xpZW50VGFibGUgPSAoe1xuICBjbGllbnRzLFxuICBvblNlbGVjdENsaWVudCxcbiAgb25JbmZvQ2xpY2ssXG4gIGNsZWFyU2VsZWN0aW9uLFxuICBvbkFkZENsaWVudCwgLy8gbmV3IHByb3AgZm9yIGFkZC1uZXctY2xpZW50IGFjdGlvblxuICBkaXNhYmxlU2VsZWN0LFxuICBkaXNhYmxlSW5mbyxcbiAgaXNDbGllbnRTZWFyY2gsXG59KSA9PiB7XG4gIHJldHVybiAoXG4gICAgPFRhYmxlIHN0cmlwZWQgYm9yZGVyZWQgaG92ZXIgc2l6ZT1cInNtXCIgY2xhc3NOYW1lPXtzdHlsZXMuY2xpZW50VGFibGV9PlxuICAgICAgPHRoZWFkPlxuICAgICAgICA8dHI+XG4gICAgICAgICAgPHRoPkNsaWVudCBOYW1lPC90aD5cbiAgICAgICAgICB7IWRpc2FibGVJbmZvICYmIDx0aD5JbmZvPC90aD59XG4gICAgICAgICAgeyFkaXNhYmxlU2VsZWN0ICYmIDx0aD5TZWxlY3Q8L3RoPn1cbiAgICAgICAgPC90cj5cbiAgICAgIDwvdGhlYWQ+XG4gICAgICA8dGJvZHk+XG4gICAgICAgIDx0cj5cbiAgICAgICAgICA8dGQgY29sU3Bhbj1cIjNcIiBzdHlsZT17eyB0ZXh0QWxpZ246IFwiY2VudGVyXCIgfX0+XG4gICAgICAgICAgICA8QnV0dG9uIHZhcmlhbnQ9XCJzZWNvbmRhcnlcIiBvbkNsaWNrPXtjbGVhclNlbGVjdGlvbn0+XG4gICAgICAgICAgICAgIENsZWFyIFNlbGVjdGlvblxuICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICB7LyogTmV3IEFkZCBOZXcgQ2xpZW50IGJ1dHRvbiAqL31cbiAgICAgICAgICAgIDxCdXR0b24gdmFyaWFudD1cInByaW1hcnlcIiBvbkNsaWNrPXtvbkFkZENsaWVudH0gY2xhc3NOYW1lPVwibXMtMlwiPlxuICAgICAgICAgICAgICBBZGQgTmV3IENsaWVudFxuICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgPC90ZD5cbiAgICAgICAgPC90cj5cbiAgICAgICAge2NsaWVudHMubWFwKChjbGllbnQpID0+IChcbiAgICAgICAgICA8dHIga2V5PXtjbGllbnQuaWR9PlxuICAgICAgICAgICAgPHRkPntjbGllbnQubmFtZX08L3RkPlxuICAgICAgICAgICAgeyFkaXNhYmxlSW5mbyAmJiAoXG4gICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgICAgICB2YXJpYW50PVwiaW5mb1wiXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBvbkluZm9DbGljayhjbGllbnQuaWQsIGNsaWVudC5uYW1lKX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICB7aXNDbGllbnRTZWFyY2ggPyBcIkVkaXRcIiA6IFwiSW5mb1wifVxuICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIHshZGlzYWJsZVNlbGVjdCAmJiAoXG4gICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgICAgICB2YXJpYW50PVwicHJpbWFyeVwiXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBvblNlbGVjdENsaWVudChjbGllbnQuaWQpfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIFNlbGVjdFxuICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L3RyPlxuICAgICAgICApKX1cbiAgICAgIDwvdGJvZHk+XG4gICAgPC9UYWJsZT5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENsaWVudFRhYmxlO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IGZpcmViYXNlIGZyb20gXCIuLi9jb250ZXh0L0ZpcmViYXNlXCI7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmZXRjaFBhcnRzV2l0aE1hY2hpbmVEYXRhKCkge1xuICBjb25zdCBkYiA9IGZpcmViYXNlLmZpcmVzdG9yZSgpO1xuICBjb25zdCBwYXJ0c1NuYXBzaG90ID0gYXdhaXQgZGIuY29sbGVjdGlvbihcIlRlc3RcIikuZ2V0KCk7XG4gIGNvbnN0IHBhcnRzID0gYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgcGFydHNTbmFwc2hvdC5kb2NzLm1hcChhc3luYyAocGFydERvYykgPT4ge1xuICAgICAgY29uc3QgcGFydERhdGEgPSBwYXJ0RG9jLmRhdGEoKTtcbiAgICAgIHBhcnREYXRhLmlkID0gcGFydERvYy5pZDsgLy8gQWRkIGRvY3VtZW50IElEIGhlcmVcbiAgICAgIC8vIGNvbnNvbGUubG9nKHBhcnREYXRhKTtcbiAgICAgIGlmIChcbiAgICAgICAgcGFydERhdGEuTWFjaGluZSAmJlxuICAgICAgICBwYXJ0RGF0YS5NYWNoaW5lIGluc3RhbmNlb2YgZmlyZWJhc2UuZmlyZXN0b3JlLkRvY3VtZW50UmVmZXJlbmNlXG4gICAgICApIHtcbiAgICAgICAgY29uc29sZS5sb2cocGFydERhdGEuTWFjaGluZSk7XG4gICAgICAgIGNvbnN0IG1hY2hpbmVEb2MgPSBhd2FpdCBwYXJ0RGF0YS5NYWNoaW5lLmdldCgpO1xuICAgICAgICBwYXJ0RGF0YS5tYWNoaW5lRGF0YSA9IG1hY2hpbmVEb2MuZXhpc3RzID8gbWFjaGluZURvYy5kYXRhKCkgOiB7fTtcbiAgICAgICAgaWYgKHBhcnREYXRhLm1hY2hpbmVEYXRhLmNsaWVudCkge1xuICAgICAgICAgIGNvbnN0IGNsaWVudERvYyA9IGF3YWl0IHBhcnREYXRhLm1hY2hpbmVEYXRhLmNsaWVudC5nZXQoKTtcbiAgICAgICAgICBwYXJ0RGF0YS5tYWNoaW5lRGF0YS5DbGllbnQgPSBjbGllbnREb2MuZXhpc3RzXG4gICAgICAgICAgICA/IGNsaWVudERvYy5kYXRhKCkubmFtZVxuICAgICAgICAgICAgOiBcIlwiO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJ0RGF0YS5tYWNoaW5lRGF0YSA9IHt9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHBhcnREYXRhO1xuICAgIH0pXG4gICk7XG4gIHJldHVybiBwYXJ0cztcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZldGNoQ2xpZW50cyhzZWxlY3RlZE9FTSwgc2VsZWN0ZWRNb2RhbGl0eSkge1xuICBjb25zdCBkYiA9IGZpcmViYXNlLmZpcmVzdG9yZSgpO1xuICBjb25zdCBjbGllbnRzU25hcHNob3QgPSBhd2FpdCBkYi5jb2xsZWN0aW9uKFwiQ2xpZW50XCIpLmdldCgpO1xuICBjb25zdCBjbGllbnRzID0gY2xpZW50c1NuYXBzaG90LmRvY3MubWFwKChkb2MpID0+ICh7XG4gICAgaWQ6IGRvYy5pZCxcbiAgICAuLi5kb2MuZGF0YSgpLFxuICB9KSk7XG5cbiAgLy8gRmlsdGVyIGNsaWVudHMgYmFzZWQgb24gT0VNIGFuZCBNb2RhbGl0eSBpZiBzZWxlY3RlZFxuICBpZiAoc2VsZWN0ZWRPRU0gfHwgc2VsZWN0ZWRNb2RhbGl0eSkge1xuICAgIGNvbnN0IGZpbHRlcmVkQ2xpZW50cyA9IFtdO1xuICAgIGZvciAoY29uc3QgY2xpZW50IG9mIGNsaWVudHMpIHtcbiAgICAgIGxldCBtYXRjaCA9IHRydWU7XG4gICAgICBpZiAoc2VsZWN0ZWRPRU0gfHwgc2VsZWN0ZWRNb2RhbGl0eSkge1xuICAgICAgICBmb3IgKGNvbnN0IG1hY2hpbmVSZWYgb2YgY2xpZW50Lm1hY2hpbmVzKSB7XG4gICAgICAgICAgY29uc3QgbWFjaGluZURvYyA9IGF3YWl0IG1hY2hpbmVSZWYuZ2V0KCk7XG4gICAgICAgICAgY29uc3QgbWFjaGluZURhdGEgPSBtYWNoaW5lRG9jLmRhdGEoKTtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAoc2VsZWN0ZWRPRU0gJiYgbWFjaGluZURhdGEuT0VNID09PSBzZWxlY3RlZE9FTSkgfHxcbiAgICAgICAgICAgIChzZWxlY3RlZE1vZGFsaXR5ICYmIG1hY2hpbmVEYXRhLk1vZGFsaXR5ID09PSBzZWxlY3RlZE1vZGFsaXR5KVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgbWF0Y2ggPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1hdGNoID0gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgZmlsdGVyZWRDbGllbnRzLnB1c2goY2xpZW50KTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZpbHRlcmVkQ2xpZW50cztcbiAgfVxuXG4gIHJldHVybiBjbGllbnRzO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZmV0Y2hNb2RlbHMoXG4gIHNlbGVjdGVkT0VNLFxuICBzZWxlY3RlZE1vZGFsaXR5LFxuICBzZWxlY3RlZENsaWVudFxuKSB7XG4gIGNvbnN0IGRiID0gZmlyZWJhc2UuZmlyZXN0b3JlKCk7XG4gIGNvbnN0IG1hY2hpbmVzU25hcHNob3QgPSBhd2FpdCBkYi5jb2xsZWN0aW9uKFwiTWFjaGluZVwiKS5nZXQoKTtcbiAgY29uc3QgbW9kZWxzID0gbmV3IFNldCgpO1xuXG4gIGF3YWl0IFByb21pc2UuYWxsKFxuICAgIG1hY2hpbmVzU25hcHNob3QuZG9jcy5tYXAoYXN5bmMgKG1hY2hpbmVEb2MpID0+IHtcbiAgICAgIGNvbnN0IG1hY2hpbmVEYXRhID0gbWFjaGluZURvYy5kYXRhKCk7XG4gICAgICBsZXQgaXNWYWxpZCA9IHRydWU7XG5cbiAgICAgIGlmIChzZWxlY3RlZE9FTSAmJiBtYWNoaW5lRGF0YS5PRU0gIT09IHNlbGVjdGVkT0VNKSBpc1ZhbGlkID0gZmFsc2U7XG4gICAgICBpZiAoc2VsZWN0ZWRNb2RhbGl0eSAmJiBtYWNoaW5lRGF0YS5Nb2RhbGl0eSAhPT0gc2VsZWN0ZWRNb2RhbGl0eSlcbiAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xuICAgICAgaWYgKHNlbGVjdGVkQ2xpZW50ICYmIG1hY2hpbmVEYXRhLmNsaWVudCkge1xuICAgICAgICBjb25zdCBjbGllbnREb2MgPSBhd2FpdCBtYWNoaW5lRGF0YS5jbGllbnQuZ2V0KCk7XG4gICAgICAgIGlmICghY2xpZW50RG9jLmV4aXN0cyB8fCBjbGllbnREb2MuZGF0YSgpLm5hbWUgIT09IHNlbGVjdGVkQ2xpZW50KVxuICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgaWYgKGlzVmFsaWQpIHtcbiAgICAgICAgbW9kZWxzLmFkZChtYWNoaW5lRGF0YS5Nb2RlbCk7XG4gICAgICB9XG4gICAgfSlcbiAgKTtcblxuICByZXR1cm4gQXJyYXkuZnJvbShtb2RlbHMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0RGF0ZSh0aW1lc3RhbXApIHtcbiAgaWYgKCF0aW1lc3RhbXApIHJldHVybiBcIlwiO1xuICBsZXQgZGF0ZTtcbiAgaWYgKHRpbWVzdGFtcC50b0RhdGUpIHtcbiAgICBkYXRlID0gdGltZXN0YW1wLnRvRGF0ZSgpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiB0aW1lc3RhbXAgPT09IFwic3RyaW5nXCIgfHwgdHlwZW9mIHRpbWVzdGFtcCA9PT0gXCJudW1iZXJcIikge1xuICAgIGRhdGUgPSBuZXcgRGF0ZSh0aW1lc3RhbXApO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBcIlwiOyAvLyBoYW5kbGUgdW5leHBlY3RlZCBmb3JtYXRzXG4gIH1cbiAgY29uc3QgZGF5ID0gU3RyaW5nKGRhdGUuZ2V0RGF0ZSgpKS5wYWRTdGFydCgyLCBcIjBcIik7XG4gIGNvbnN0IG1vbnRoID0gU3RyaW5nKGRhdGUuZ2V0TW9udGgoKSArIDEpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcbiAgY29uc3QgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgcmV0dXJuIGAke21vbnRofS8ke2RheX0vJHt5ZWFyfWA7XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmaXJlYmFzZS9jb21wYXQvYXBwXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZpcmViYXNlL2NvbXBhdC9hdXRoXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZpcmViYXNlL2NvbXBhdC9maXJlc3RvcmVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZmlyZWJhc2UvY29tcGF0L3N0b3JhZ2VcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmV4dC9yb3V0ZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3RcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtYm9vdHN0cmFwXCIpOyJdLCJzb3VyY2VSb290IjoiIn0=