module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../ssr-module-cache.js');
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./components/Layout.js":
/*!******************************!*\
  !*** ./components/Layout.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _footer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./footer */ "./components/footer.js");
/* harmony import */ var _styles_Home_module_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../styles/Home.module.css */ "./styles/Home.module.css");
/* harmony import */ var _styles_Home_module_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_2__);

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



const Layout = ({
  children
}) => {
  return __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, children);
};

/* harmony default export */ __webpack_exports__["default"] = (Layout);

/***/ }),

/***/ "./components/footer.js":
/*!******************************!*\
  !*** ./components/footer.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return footer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _jsxFileName = "C:\\Users\\isavc\\OneDrive\\Documents\\AIS\\Apps\\magmo\\components\\footer.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function footer() {
  return __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx("footer", {
    className: "footer",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6,
      columnNumber: 13
    }
  }, __jsx("a", {
    href: "https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app",
    target: "_blank",
    rel: "noopener noreferrer",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7,
      columnNumber: 17
    }
  }, __jsx("h4", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12,
      columnNumber: 21
    }
  }, "Powered by"), __jsx("img", {
    src: "/vercel.svg",
    alt: "Vercel",
    className: "logo",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13,
      columnNumber: 21
    }
  }))));
}

/***/ }),

/***/ "./context/AuthUserContext.js":
/*!************************************!*\
  !*** ./context/AuthUserContext.js ***!
  \************************************/
/*! exports provided: AuthUserProvider, useAuth */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthUserProvider", function() { return AuthUserProvider; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useAuth", function() { return useAuth; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _useFirebaseAuth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./useFirebaseAuth */ "./context/useFirebaseAuth.js");
var _jsxFileName = "C:\\Users\\isavc\\OneDrive\\Documents\\AIS\\Apps\\magmo\\context\\AuthUserContext.js";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;


const authUserContext = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["createContext"])({
  authUser: null,
  loading: true,
  signInWithGoogle: async () => {},
  signOut: async () => {}
});
function AuthUserProvider({
  children
}) {
  const auth = Object(_useFirebaseAuth__WEBPACK_IMPORTED_MODULE_1__["default"])();
  return __jsx(authUserContext.Provider, {
    value: auth,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14,
      columnNumber: 5
    }
  }, children);
}
const useAuth = () => Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(authUserContext);

/***/ }),

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
} // Some networks/proxies block Firestore's streaming transport.
// Force long polling in the browser to avoid stalled writes/listens.


if (false) {}

const auth = firebase_compat_app__WEBPACK_IMPORTED_MODULE_0___default.a.auth();
/* harmony default export */ __webpack_exports__["default"] = (firebase_compat_app__WEBPACK_IMPORTED_MODULE_0___default.a); // import { initializeApp } from 'firebase/app';
// import { getFirestore, collection, getDocs } from 'firebase/firestore';
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// export default app;

/***/ }),

/***/ "./context/useFirebaseAuth.js":
/*!************************************!*\
  !*** ./context/useFirebaseAuth.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return useFirebaseAuth; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Firebase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Firebase */ "./context/Firebase.js");



const formatAuthUser = user => ({
  uid: user.uid,
  email: user.email
});

function useFirebaseAuth() {
  const {
    0: authUser,
    1: setAuthUser
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null);
  const {
    0: loading,
    1: setLoading
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(true);

  const authStateChanged = async authState => {
    if (!authState) {
      setAuthUser(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    const formattedUser = formatAuthUser(authState);
    setAuthUser(formattedUser);
    setLoading(false);
  };

  const clear = () => {
    setAuthUser(null);
    setLoading(true);
  }; //sign in with google


  const signInWithGoogle = () => {
    const provider = new _Firebase__WEBPACK_IMPORTED_MODULE_1__["default"].auth.GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account"
    });
    return _Firebase__WEBPACK_IMPORTED_MODULE_1__["auth"].signInWithRedirect(provider).catch(error => {
      console.error("Google Sign-In Error:", error);
      throw error;
    });
  };

  const signOut = () => _Firebase__WEBPACK_IMPORTED_MODULE_1__["auth"].signOut().then(clear); // Listen for Firebase auth state changes
  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged(authStateChanged);
  //   return () => unsubscribe();
  // }, []);


  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    let unsubscribe;
    _Firebase__WEBPACK_IMPORTED_MODULE_1__["auth"].setPersistence(_Firebase__WEBPACK_IMPORTED_MODULE_1__["default"].auth.Auth.Persistence.LOCAL).then(() => {
      // Now set up the listener
      unsubscribe = _Firebase__WEBPACK_IMPORTED_MODULE_1__["auth"].onAuthStateChanged(authStateChanged);
    }).catch(error => console.error("Error setting persistence:", error));
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);
  return {
    authUser,
    loading,
    signInWithGoogle,
    signOut
  };
}

/***/ }),

/***/ "./node_modules/bootstrap/dist/css/bootstrap.min.css":
/*!***********************************************************!*\
  !*** ./node_modules/bootstrap/dist/css/bootstrap.min.css ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./pages/_app.js":
/*!***********************!*\
  !*** ./pages/_app.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/head */ "next/head");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/router */ "next/router");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var bootstrap_dist_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bootstrap/dist/css/bootstrap.min.css */ "./node_modules/bootstrap/dist/css/bootstrap.min.css");
/* harmony import */ var bootstrap_dist_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(bootstrap_dist_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _styles_global_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../styles/global.css */ "./styles/global.css");
/* harmony import */ var _styles_global_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_styles_global_css__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _components_Layout__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/Layout */ "./components/Layout.js");
/* harmony import */ var _context_AuthUserContext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../context/AuthUserContext */ "./context/AuthUserContext.js");
var _jsxFileName = "C:\\Users\\isavc\\OneDrive\\Documents\\AIS\\Apps\\magmo\\pages\\_app.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }







 // Setup pdfjs (if used) - only on client side

let pdfjs = null;

if (false) {}

function MyApp({
  Component,
  pageProps
}) {
  const router = Object(next_router__WEBPACK_IMPORTED_MODULE_2__["useRouter"])(); // Load Bootstrap JS once

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    __webpack_require__(/*! bootstrap/dist/js/bootstrap.bundle.min.js */ "bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    if (true) return;
    if (!("serviceWorker" in navigator)) return;

    const onLoad = () => {
      navigator.serviceWorker.register("/sw.js").catch(error => {
        console.warn("Service worker registration failed:", error);
      });
    };

    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []); // NEW: On initial client mount, check if the browser URL (window.location.pathname)
  // is different from what Next's router thinks (which will be "/" when served via index.html).
  // If so, replace the route so that Next loads the proper dynamic page.

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    if (false) {}
  }, [router.isReady, router.asPath]);
  return __jsx(_context_AuthUserContext__WEBPACK_IMPORTED_MODULE_6__["AuthUserProvider"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 58,
      columnNumber: 5
    }
  }, __jsx(next_head__WEBPACK_IMPORTED_MODULE_1___default.a, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 59,
      columnNumber: 7
    }
  }, __jsx("link", {
    rel: "manifest",
    href: "/manifest.json",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 60,
      columnNumber: 9
    }
  }), __jsx("meta", {
    name: "theme-color",
    content: "#0f172a",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 61,
      columnNumber: 9
    }
  }), __jsx("meta", {
    name: "application-name",
    content: "Magmo Inventory",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 62,
      columnNumber: 9
    }
  }), __jsx("meta", {
    name: "apple-mobile-web-app-capable",
    content: "yes",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 63,
      columnNumber: 9
    }
  }), __jsx("meta", {
    name: "apple-mobile-web-app-title",
    content: "Magmo",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 64,
      columnNumber: 9
    }
  }), __jsx("meta", {
    name: "apple-mobile-web-app-status-bar-style",
    content: "default",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 65,
      columnNumber: 9
    }
  }), __jsx("link", {
    rel: "apple-touch-icon",
    href: "/apple-touch-icon.png",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 66,
      columnNumber: 9
    }
  })), __jsx(_components_Layout__WEBPACK_IMPORTED_MODULE_5__["default"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 68,
      columnNumber: 7
    }
  }, __jsx(Component, _extends({}, pageProps, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 69,
      columnNumber: 9
    }
  }))));
}

/* harmony default export */ __webpack_exports__["default"] = (MyApp);

/***/ }),

/***/ "./styles/Home.module.css":
/*!********************************!*\
  !*** ./styles/Home.module.css ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Exports
module.exports = {
	"container": "Home_container__1EcsU",
	"main": "Home_main__1x8gC",
	"footer": "Home_footer__1WdhD",
	"a": "Home_a__3eaqf",
	"title": "Home_title__3DjR7",
	"description": "Home_description__17Z4F",
	"code": "Home_code__axx2Y",
	"grid": "Home_grid__2Ei2F",
	"card": "Home_card__2SdtB",
	"logo": "Home_logo__1YbrH",
	"table-container": "Home_table-container__1gxa9",
	"table": "Home_table__1bzfV",
	"auto-grow-textarea": "Home_auto-grow-textarea__3MKyp"
};


/***/ }),

/***/ "./styles/global.css":
/*!***************************!*\
  !*** ./styles/global.css ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 0:
/*!****************************************!*\
  !*** multi private-next-pages/_app.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! private-next-pages/_app.js */"./pages/_app.js");


/***/ }),

/***/ "bootstrap/dist/js/bootstrap.bundle.min.js":
/*!************************************************************!*\
  !*** external "bootstrap/dist/js/bootstrap.bundle.min.js" ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("bootstrap/dist/js/bootstrap.bundle.min.js");

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

/***/ "next/head":
/*!****************************!*\
  !*** external "next/head" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next/head");

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

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9MYXlvdXQuanMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9mb290ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vY29udGV4dC9BdXRoVXNlckNvbnRleHQuanMiLCJ3ZWJwYWNrOi8vLy4vY29udGV4dC9GaXJlYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9jb250ZXh0L3VzZUZpcmViYXNlQXV0aC5qcyIsIndlYnBhY2s6Ly8vLi9wYWdlcy9fYXBwLmpzIiwid2VicGFjazovLy8uL3N0eWxlcy9Ib21lLm1vZHVsZS5jc3MiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYm9vdHN0cmFwL2Rpc3QvanMvYm9vdHN0cmFwLmJ1bmRsZS5taW4uanNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJmaXJlYmFzZS9jb21wYXQvYXBwXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZmlyZWJhc2UvY29tcGF0L2F1dGhcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJmaXJlYmFzZS9jb21wYXQvZmlyZXN0b3JlXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZmlyZWJhc2UvY29tcGF0L3N0b3JhZ2VcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJuZXh0L2hlYWRcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJuZXh0L3JvdXRlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0XCIiXSwibmFtZXMiOlsiTGF5b3V0IiwiY2hpbGRyZW4iLCJmb290ZXIiLCJhdXRoVXNlckNvbnRleHQiLCJjcmVhdGVDb250ZXh0IiwiYXV0aFVzZXIiLCJsb2FkaW5nIiwic2lnbkluV2l0aEdvb2dsZSIsInNpZ25PdXQiLCJBdXRoVXNlclByb3ZpZGVyIiwiYXV0aCIsInVzZUZpcmViYXNlQXV0aCIsInVzZUF1dGgiLCJ1c2VDb250ZXh0IiwiRmlyZWJhc2VDcmVkZW50aWFscyIsImFwaUtleSIsImF1dGhEb21haW4iLCJwcm9qZWN0SWQiLCJzdG9yYWdlQnVja2V0IiwibWVzc2FnaW5nU2VuZGVySWQiLCJhcHBJZCIsIm1lYXN1cmVtZW50SWQiLCJGaXJlYmFzZSIsImFwcHMiLCJsZW5ndGgiLCJpbml0aWFsaXplQXBwIiwiZm9ybWF0QXV0aFVzZXIiLCJ1c2VyIiwidWlkIiwiZW1haWwiLCJzZXRBdXRoVXNlciIsInVzZVN0YXRlIiwic2V0TG9hZGluZyIsImF1dGhTdGF0ZUNoYW5nZWQiLCJhdXRoU3RhdGUiLCJmb3JtYXR0ZWRVc2VyIiwiY2xlYXIiLCJwcm92aWRlciIsIkdvb2dsZUF1dGhQcm92aWRlciIsInNldEN1c3RvbVBhcmFtZXRlcnMiLCJwcm9tcHQiLCJzaWduSW5XaXRoUmVkaXJlY3QiLCJjYXRjaCIsImVycm9yIiwiY29uc29sZSIsInRoZW4iLCJ1c2VFZmZlY3QiLCJ1bnN1YnNjcmliZSIsInNldFBlcnNpc3RlbmNlIiwiQXV0aCIsIlBlcnNpc3RlbmNlIiwiTE9DQUwiLCJvbkF1dGhTdGF0ZUNoYW5nZWQiLCJwZGZqcyIsIk15QXBwIiwiQ29tcG9uZW50IiwicGFnZVByb3BzIiwicm91dGVyIiwidXNlUm91dGVyIiwicmVxdWlyZSIsIm5hdmlnYXRvciIsIm9uTG9hZCIsInNlcnZpY2VXb3JrZXIiLCJyZWdpc3RlciIsIndhcm4iLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImlzUmVhZHkiLCJhc1BhdGgiXSwibWFwcGluZ3MiOiI7O1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxJQUFJO1FBQ0o7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZGQTtBQUNBOztBQUVBLE1BQU1BLE1BQU0sR0FBRyxDQUFDO0FBQUVDO0FBQUYsQ0FBRCxLQUFrQjtBQUMvQixTQUNFLG1FQVFHQSxRQVJILENBREY7QUFjRCxDQWZEOztBQWlCZUQscUVBQWYsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckJBO0FBRWUsU0FBU0UsTUFBVCxHQUFrQjtBQUM3QixTQUNJLG1FQUNJO0FBQVEsYUFBUyxFQUFDLFFBQWxCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDSTtBQUNJLFFBQUksRUFBQyx3R0FEVDtBQUVJLFVBQU0sRUFBQyxRQUZYO0FBR0ksT0FBRyxFQUFDLHFCQUhSO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FLSTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGtCQUxKLEVBTUk7QUFBSyxPQUFHLEVBQUMsYUFBVDtBQUF1QixPQUFHLEVBQUMsUUFBM0I7QUFBb0MsYUFBUyxFQUFDLE1BQTlDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFOSixDQURKLENBREosQ0FESjtBQWNILEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pCRDtBQUNBO0FBRUEsTUFBTUMsZUFBZSxnQkFBR0MsMkRBQWEsQ0FBQztBQUNwQ0MsVUFBUSxFQUFFLElBRDBCO0FBRXBDQyxTQUFPLEVBQUUsSUFGMkI7QUFHcENDLGtCQUFnQixFQUFFLFlBQVksQ0FBRSxDQUhJO0FBSXBDQyxTQUFPLEVBQUUsWUFBWSxDQUFFO0FBSmEsQ0FBRCxDQUFyQztBQU9PLFNBQVNDLGdCQUFULENBQTBCO0FBQUVSO0FBQUYsQ0FBMUIsRUFBd0M7QUFDN0MsUUFBTVMsSUFBSSxHQUFHQyxnRUFBZSxFQUE1QjtBQUNBLFNBQ0UsTUFBQyxlQUFELENBQWlCLFFBQWpCO0FBQTBCLFNBQUssRUFBRUQsSUFBakM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUF3Q1QsUUFBeEMsQ0FERjtBQUdEO0FBRU0sTUFBTVcsT0FBTyxHQUFHLE1BQU1DLHdEQUFVLENBQUNWLGVBQUQsQ0FBaEMsQzs7Ozs7Ozs7Ozs7O0FDakJQO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQSxNQUFNVyxtQkFBbUIsR0FBRztBQUMxQkMsUUFBTSxFQUFFLHlDQURrQjtBQUUxQkMsWUFBVSxFQUFFLDZCQUZjO0FBRzFCQyxXQUFTLEVBQUUsYUFIZTtBQUkxQkMsZUFBYSxFQUFFLHlCQUpXO0FBSzFCQyxtQkFBaUIsRUFBRSxjQUxPO0FBTTFCQyxPQUFLLEVBQUUsMkNBTm1CO0FBTzFCQyxlQUFhLEVBQUU7QUFQVyxDQUE1QixDLENBU0E7O0FBQ0EsSUFBSSxDQUFDQywwREFBUSxDQUFDQyxJQUFULENBQWNDLE1BQW5CLEVBQTJCO0FBQ3pCRiw0REFBUSxDQUFDRyxhQUFULENBQXVCWCxtQkFBdkI7QUFDRCxDLENBRUQ7QUFDQTs7O0FBQ0EsV0FBbUMsRUFNbEM7O0FBRU0sTUFBTUosSUFBSSxHQUFHWSwwREFBUSxDQUFDWixJQUFULEVBQWI7QUFDUVkseUhBQWYsRSxDQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUEsc0I7Ozs7Ozs7Ozs7OztBQy9EQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTs7QUFFQSxNQUFNSSxjQUFjLEdBQUlDLElBQUQsS0FBVztBQUNoQ0MsS0FBRyxFQUFFRCxJQUFJLENBQUNDLEdBRHNCO0FBRWhDQyxPQUFLLEVBQUVGLElBQUksQ0FBQ0U7QUFGb0IsQ0FBWCxDQUF2Qjs7QUFLZSxTQUFTbEIsZUFBVCxHQUEyQjtBQUN4QyxRQUFNO0FBQUEsT0FBQ04sUUFBRDtBQUFBLE9BQVd5QjtBQUFYLE1BQTBCQyxzREFBUSxDQUFDLElBQUQsQ0FBeEM7QUFDQSxRQUFNO0FBQUEsT0FBQ3pCLE9BQUQ7QUFBQSxPQUFVMEI7QUFBVixNQUF3QkQsc0RBQVEsQ0FBQyxJQUFELENBQXRDOztBQUVBLFFBQU1FLGdCQUFnQixHQUFHLE1BQU9DLFNBQVAsSUFBcUI7QUFDNUMsUUFBSSxDQUFDQSxTQUFMLEVBQWdCO0FBQ2RKLGlCQUFXLENBQUMsSUFBRCxDQUFYO0FBQ0FFLGdCQUFVLENBQUMsS0FBRCxDQUFWO0FBQ0E7QUFDRDs7QUFFREEsY0FBVSxDQUFDLElBQUQsQ0FBVjtBQUNBLFVBQU1HLGFBQWEsR0FBR1QsY0FBYyxDQUFDUSxTQUFELENBQXBDO0FBQ0FKLGVBQVcsQ0FBQ0ssYUFBRCxDQUFYO0FBQ0FILGNBQVUsQ0FBQyxLQUFELENBQVY7QUFDRCxHQVhEOztBQWFBLFFBQU1JLEtBQUssR0FBRyxNQUFNO0FBQ2xCTixlQUFXLENBQUMsSUFBRCxDQUFYO0FBQ0FFLGNBQVUsQ0FBQyxJQUFELENBQVY7QUFDRCxHQUhELENBakJ3QyxDQXNCeEM7OztBQUNBLFFBQU16QixnQkFBZ0IsR0FBRyxNQUFNO0FBQzdCLFVBQU04QixRQUFRLEdBQUcsSUFBSWYsaURBQVEsQ0FBQ1osSUFBVCxDQUFjNEIsa0JBQWxCLEVBQWpCO0FBQ0FELFlBQVEsQ0FBQ0UsbUJBQVQsQ0FBNkI7QUFBRUMsWUFBTSxFQUFFO0FBQVYsS0FBN0I7QUFFQSxXQUFPOUIsOENBQUksQ0FBQytCLGtCQUFMLENBQXdCSixRQUF4QixFQUFrQ0ssS0FBbEMsQ0FBeUNDLEtBQUQsSUFBVztBQUN4REMsYUFBTyxDQUFDRCxLQUFSLENBQWMsdUJBQWQsRUFBdUNBLEtBQXZDO0FBQ0EsWUFBTUEsS0FBTjtBQUNELEtBSE0sQ0FBUDtBQUlELEdBUkQ7O0FBVUEsUUFBTW5DLE9BQU8sR0FBRyxNQUFNRSw4Q0FBSSxDQUFDRixPQUFMLEdBQWVxQyxJQUFmLENBQW9CVCxLQUFwQixDQUF0QixDQWpDd0MsQ0FtQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBVSx5REFBUyxDQUFDLE1BQU07QUFDZCxRQUFJQyxXQUFKO0FBQ0FyQyxrREFBSSxDQUNEc0MsY0FESCxDQUNrQjFCLGlEQUFRLENBQUNaLElBQVQsQ0FBY3VDLElBQWQsQ0FBbUJDLFdBQW5CLENBQStCQyxLQURqRCxFQUVHTixJQUZILENBRVEsTUFBTTtBQUNWO0FBQ0FFLGlCQUFXLEdBQUdyQyw4Q0FBSSxDQUFDMEMsa0JBQUwsQ0FBd0JuQixnQkFBeEIsQ0FBZDtBQUNELEtBTEgsRUFNR1MsS0FOSCxDQU1VQyxLQUFELElBQVdDLE9BQU8sQ0FBQ0QsS0FBUixDQUFjLDRCQUFkLEVBQTRDQSxLQUE1QyxDQU5wQjtBQVFBLFdBQU8sTUFBTTtBQUNYLFVBQUlJLFdBQUosRUFBaUI7QUFDZkEsbUJBQVc7QUFDWjtBQUNGLEtBSkQ7QUFLRCxHQWZRLEVBZU4sRUFmTSxDQUFUO0FBaUJBLFNBQU87QUFDTDFDLFlBREs7QUFFTEMsV0FGSztBQUdMQyxvQkFISztBQUlMQztBQUpLLEdBQVA7QUFNRCxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Q0FHQTs7QUFDQSxJQUFJNkMsS0FBSyxHQUFHLElBQVo7O0FBQ0EsV0FBbUMsRUFTbEM7O0FBRUQsU0FBU0MsS0FBVCxDQUFlO0FBQUVDLFdBQUY7QUFBYUM7QUFBYixDQUFmLEVBQXlDO0FBQ3ZDLFFBQU1DLE1BQU0sR0FBR0MsNkRBQVMsRUFBeEIsQ0FEdUMsQ0FHdkM7O0FBQ0FaLHlEQUFTLENBQUMsTUFBTTtBQUNkYSx1QkFBTyxDQUFDLDRGQUFELENBQVA7QUFDRCxHQUZRLEVBRU4sRUFGTSxDQUFUO0FBSUFiLHlEQUFTLENBQUMsTUFBTTtBQUNkLGNBQW1DO0FBQ25DLFFBQUksRUFBRSxtQkFBbUJjLFNBQXJCLENBQUosRUFBcUM7O0FBQ3JDLFVBQU1DLE1BQU0sR0FBRyxNQUFNO0FBQ25CRCxlQUFTLENBQUNFLGFBQVYsQ0FBd0JDLFFBQXhCLENBQWlDLFFBQWpDLEVBQTJDckIsS0FBM0MsQ0FBa0RDLEtBQUQsSUFBVztBQUMxREMsZUFBTyxDQUFDb0IsSUFBUixDQUFhLHFDQUFiLEVBQW9EckIsS0FBcEQ7QUFDRCxPQUZEO0FBR0QsS0FKRDs7QUFLQXNCLFVBQU0sQ0FBQ0MsZ0JBQVAsQ0FBd0IsTUFBeEIsRUFBZ0NMLE1BQWhDO0FBQ0EsV0FBTyxNQUFNSSxNQUFNLENBQUNFLG1CQUFQLENBQTJCLE1BQTNCLEVBQW1DTixNQUFuQyxDQUFiO0FBQ0QsR0FWUSxFQVVOLEVBVk0sQ0FBVCxDQVJ1QyxDQW9CdkM7QUFDQTtBQUNBOztBQUNBZix5REFBUyxDQUFDLE1BQU07QUFDZCxRQUFJLEtBQUosRUFBcUQsRUFRcEQ7QUFDRixHQVZRLEVBVU4sQ0FBQ1csTUFBTSxDQUFDVyxPQUFSLEVBQWlCWCxNQUFNLENBQUNZLE1BQXhCLENBVk0sQ0FBVDtBQVlBLFNBQ0UsTUFBQyx5RUFBRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0UsTUFBQyxnREFBRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0U7QUFBTSxPQUFHLEVBQUMsVUFBVjtBQUFxQixRQUFJLEVBQUMsZ0JBQTFCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFERixFQUVFO0FBQU0sUUFBSSxFQUFDLGFBQVg7QUFBeUIsV0FBTyxFQUFDLFNBQWpDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFGRixFQUdFO0FBQU0sUUFBSSxFQUFDLGtCQUFYO0FBQThCLFdBQU8sRUFBQyxpQkFBdEM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQUhGLEVBSUU7QUFBTSxRQUFJLEVBQUMsOEJBQVg7QUFBMEMsV0FBTyxFQUFDLEtBQWxEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFKRixFQUtFO0FBQU0sUUFBSSxFQUFDLDRCQUFYO0FBQXdDLFdBQU8sRUFBQyxPQUFoRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBTEYsRUFNRTtBQUFNLFFBQUksRUFBQyx1Q0FBWDtBQUFtRCxXQUFPLEVBQUMsU0FBM0Q7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQU5GLEVBT0U7QUFBTSxPQUFHLEVBQUMsa0JBQVY7QUFBNkIsUUFBSSxFQUFDLHVCQUFsQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBUEYsQ0FERixFQVVFLE1BQUMsMERBQUQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFLE1BQUMsU0FBRCxlQUFlYixTQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FERixDQVZGLENBREY7QUFnQkQ7O0FBRWNGLG9FQUFmLEU7Ozs7Ozs7Ozs7O0FDMUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2ZBLHNFOzs7Ozs7Ozs7OztBQ0FBLGdEOzs7Ozs7Ozs7OztBQ0FBLGlEOzs7Ozs7Ozs7OztBQ0FBLHNEOzs7Ozs7Ozs7OztBQ0FBLG9EOzs7Ozs7Ozs7OztBQ0FBLHNDOzs7Ozs7Ozs7OztBQ0FBLHdDOzs7Ozs7Ozs7OztBQ0FBLGtDIiwiZmlsZSI6InBhZ2VzL19hcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHJlcXVpcmUoJy4uL3Nzci1tb2R1bGUtY2FjaGUuanMnKTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0dmFyIHRocmV3ID0gdHJ1ZTtcbiBcdFx0dHJ5IHtcbiBcdFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcbiBcdFx0XHR0aHJldyA9IGZhbHNlO1xuIFx0XHR9IGZpbmFsbHkge1xuIFx0XHRcdGlmKHRocmV3KSBkZWxldGUgaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdH1cblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG4iLCJcclxuaW1wb3J0IEZvb3RlciBmcm9tICcuL2Zvb3RlcidcclxuaW1wb3J0IHN0eWxlcyBmcm9tICcuLi9zdHlsZXMvSG9tZS5tb2R1bGUuY3NzJ1xyXG5cclxuY29uc3QgTGF5b3V0ID0gKHsgY2hpbGRyZW4gfSkgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8PlxyXG4gICAgICBcclxuICAgICAgey8qIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuY29udGFpbmVyfT5cclxuICAgICAgICA8bWFpbiBjbGFzc05hbWU9e3N0eWxlcy5tYWlufT5cclxuICAgICAgICAgIHtjaGlsZHJlbn1cclxuICAgICAgICA8L21haW4+XHJcbiAgICAgIDwvZGl2PiAqL31cclxuXHJcbiAgICAgIHtjaGlsZHJlbn1cclxuICAgICAgey8qIDxGb290ZXIvPiAqL31cclxuICAgICAgXHJcbiAgICA8Lz5cclxuICApXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IExheW91dCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGZvb3RlcigpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPD5cclxuICAgICAgICAgICAgPGZvb3RlciBjbGFzc05hbWU9XCJmb290ZXJcIj5cclxuICAgICAgICAgICAgICAgIDxhXHJcbiAgICAgICAgICAgICAgICAgICAgaHJlZj1cImh0dHBzOi8vdmVyY2VsLmNvbT91dG1fc291cmNlPWNyZWF0ZS1uZXh0LWFwcCZ1dG1fbWVkaXVtPWRlZmF1bHQtdGVtcGxhdGUmdXRtX2NhbXBhaWduPWNyZWF0ZS1uZXh0LWFwcFwiXHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0PVwiX2JsYW5rXCJcclxuICAgICAgICAgICAgICAgICAgICByZWw9XCJub29wZW5lciBub3JlZmVycmVyXCJcclxuICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICA8aDQ+UG93ZXJlZCBieTwvaDQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCIvdmVyY2VsLnN2Z1wiIGFsdD1cIlZlcmNlbFwiIGNsYXNzTmFtZT1cImxvZ29cIiAvPlxyXG4gICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICA8L2Zvb3Rlcj5cclxuICAgICAgICA8Lz5cclxuICAgIClcclxufVxyXG4iLCJpbXBvcnQgeyBjcmVhdGVDb250ZXh0LCB1c2VDb250ZXh0IH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB1c2VGaXJlYmFzZUF1dGggZnJvbSBcIi4vdXNlRmlyZWJhc2VBdXRoXCI7XHJcblxyXG5jb25zdCBhdXRoVXNlckNvbnRleHQgPSBjcmVhdGVDb250ZXh0KHtcclxuICBhdXRoVXNlcjogbnVsbCxcclxuICBsb2FkaW5nOiB0cnVlLFxyXG4gIHNpZ25JbldpdGhHb29nbGU6IGFzeW5jICgpID0+IHt9LFxyXG4gIHNpZ25PdXQ6IGFzeW5jICgpID0+IHt9LFxyXG59KTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBBdXRoVXNlclByb3ZpZGVyKHsgY2hpbGRyZW4gfSkge1xyXG4gIGNvbnN0IGF1dGggPSB1c2VGaXJlYmFzZUF1dGgoKTtcclxuICByZXR1cm4gKFxyXG4gICAgPGF1dGhVc2VyQ29udGV4dC5Qcm92aWRlciB2YWx1ZT17YXV0aH0+e2NoaWxkcmVufTwvYXV0aFVzZXJDb250ZXh0LlByb3ZpZGVyPlxyXG4gICk7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCB1c2VBdXRoID0gKCkgPT4gdXNlQ29udGV4dChhdXRoVXNlckNvbnRleHQpO1xyXG4iLCIvLyAvLyBpbXBvcnQgZmlyZWJhc2UgZnJvbSBcImZpcmViYXNlL2FwcFwiXHJcbi8vIGltcG9ydCAqIGFzIGZpcmViYXNlIGZyb20gXCJmaXJlYmFzZS9hcHBcIjtcclxuLy8gLy8gaW1wb3J0IFwiZmlyZWJhc2UvYXV0aFwiXHJcblxyXG4vLyBjb25zdCBhcHAgPSBmaXJlYmFzZS5pbml0aWFsaXplQXBwKHtcclxuLy8gICAgIGFwaUtleTogXCJBSXphU3lDeEMtYThiNVZoaGV5OEdGNDdMcFhaMWFNS1ltaUlod0VcIixcclxuLy8gICAgIGF1dGhEb21haW46IFwibWFnbW8tYWMxMGMuZmlyZWJhc2VhcHAuY29tXCIsXHJcbi8vICAgICBwcm9qZWN0SWQ6IFwibWFnbW8tYWMxMGNcIixcclxuLy8gICAgIHN0b3JhZ2VCdWNrZXQ6IFwibWFnbW8tYWMxMGMuYXBwc3BvdC5jb21cIixcclxuLy8gICAgIG1lc3NhZ2luZ1NlbmRlcklkOiBcIjE3Nzg1NzUyNTE0N1wiLFxyXG4vLyAgICAgYXBwSWQ6IFwiMToxNzc4NTc1MjUxNDc6d2ViOmFjOGUzYzg3ZDgyMzk2YmViMWRkM2VcIixcclxuLy8gICAgIG1lYXN1cmVtZW50SWQ6IFwiRy1MMDIzNkpUNU4zXCJcclxuLy8gfSlcclxuXHJcbi8vIGV4cG9ydCBjb25zdCBhdXRoID0gYXBwLmF1dGgoKVxyXG4vLyBleHBvcnQgZGVmYXVsdCBhcHBcclxuXHJcbi8vIGFwaUtleTogcHJvY2Vzcy5lbnYuUkVBQ1RfQVBQX0ZJUkVCQVNFX0tFWSxcclxuLy8gICAgIGF1dGhEb21haW46IHByb2Nlc3MuZW52LlJFQUNUX0FQUF9GSVJFQkFTRV9BVVRIX0RPTUFJTixcclxuLy8gICAgIHByb2plY3RJZDogcHJvY2Vzcy5lbnYuUkVBQ1RfQVBQX0ZJUkVCQVNFX1BST0pFQ1RfSUQsXHJcbi8vICAgICBzdG9yYWdlQnVja2V0OiBwcm9jZXNzLmVudi5SRUFDVF9BUFBfRklSRUJBU0VfU1RPUkFHRV9CVUNLRVQsXHJcbi8vICAgICBtZXNzYWdpbmdTZW5kZXJJZDogcHJvY2Vzcy5lbnYuUkVBQ1RfQVBQX0ZJUkVCQVNFX01FU1NBR0lOR19TRU5ERVJfSUQsXHJcbi8vICAgICBhcHBJZDogcHJvY2Vzcy5lbnYuUkVBQ1RfQVBQX0ZJUkVCQVNFX0FQUF9JRCxcclxuLy8gICAgIG1lYXN1cmVtZW50SWQ6IHByb2Nlc3MuZW52LlJFQUNUX0FQUF9GSVJFQkFTRV9NRUFTVVJFTUVOVF9JRFxyXG5cclxuaW1wb3J0IEZpcmViYXNlIGZyb20gXCJmaXJlYmFzZS9jb21wYXQvYXBwXCI7XHJcbmltcG9ydCBcImZpcmViYXNlL2NvbXBhdC9hdXRoXCI7XHJcbmltcG9ydCBcImZpcmViYXNlL2NvbXBhdC9maXJlc3RvcmVcIjtcclxuaW1wb3J0IFwiZmlyZWJhc2UvY29tcGF0L3N0b3JhZ2VcIjtcclxuXHJcbmNvbnN0IEZpcmViYXNlQ3JlZGVudGlhbHMgPSB7XHJcbiAgYXBpS2V5OiBcIkFJemFTeUN4Qy1hOGI1VmhoZXk4R0Y0N0xwWFoxYU1LWW1pSWh3RVwiLFxyXG4gIGF1dGhEb21haW46IFwibWFnbW8tYWMxMGMuZmlyZWJhc2VhcHAuY29tXCIsXHJcbiAgcHJvamVjdElkOiBcIm1hZ21vLWFjMTBjXCIsXHJcbiAgc3RvcmFnZUJ1Y2tldDogXCJtYWdtby1hYzEwYy5hcHBzcG90LmNvbVwiLFxyXG4gIG1lc3NhZ2luZ1NlbmRlcklkOiBcIjE3Nzg1NzUyNTE0N1wiLFxyXG4gIGFwcElkOiBcIjE6MTc3ODU3NTI1MTQ3OndlYjphYzhlM2M4N2Q4MjM5NmJlYjFkZDNlXCIsXHJcbiAgbWVhc3VyZW1lbnRJZDogXCJHLUwwMjM2SlQ1TjNcIixcclxufTtcclxuLy8gaWYgYSBGaXJlYmFzZSBpbnN0YW5jZSBkb2Vzbid0IGV4aXN0LCBjcmVhdGUgb25lXHJcbmlmICghRmlyZWJhc2UuYXBwcy5sZW5ndGgpIHtcclxuICBGaXJlYmFzZS5pbml0aWFsaXplQXBwKEZpcmViYXNlQ3JlZGVudGlhbHMpO1xyXG59XHJcblxyXG4vLyBTb21lIG5ldHdvcmtzL3Byb3hpZXMgYmxvY2sgRmlyZXN0b3JlJ3Mgc3RyZWFtaW5nIHRyYW5zcG9ydC5cclxuLy8gRm9yY2UgbG9uZyBwb2xsaW5nIGluIHRoZSBicm93c2VyIHRvIGF2b2lkIHN0YWxsZWQgd3JpdGVzL2xpc3RlbnMuXHJcbmlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgdHJ5IHtcclxuICAgIEZpcmViYXNlLmZpcmVzdG9yZSgpLnNldHRpbmdzKHsgZXhwZXJpbWVudGFsRm9yY2VMb25nUG9sbGluZzogdHJ1ZSB9KTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgLy8gSWdub3JlIGlmIEZpcmVzdG9yZSBoYXMgYWxyZWFkeSBiZWVuIGluaXRpYWxpemVkIHdpdGggc2V0dGluZ3MuXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgYXV0aCA9IEZpcmViYXNlLmF1dGgoKTtcclxuZXhwb3J0IGRlZmF1bHQgRmlyZWJhc2U7XHJcblxyXG4vLyBpbXBvcnQgeyBpbml0aWFsaXplQXBwIH0gZnJvbSAnZmlyZWJhc2UvYXBwJztcclxuLy8gaW1wb3J0IHsgZ2V0RmlyZXN0b3JlLCBjb2xsZWN0aW9uLCBnZXREb2NzIH0gZnJvbSAnZmlyZWJhc2UvZmlyZXN0b3JlJztcclxuXHJcbi8vIGNvbnN0IGFwcCA9IGluaXRpYWxpemVBcHAoZmlyZWJhc2VDb25maWcpO1xyXG4vLyBjb25zdCBkYiA9IGdldEZpcmVzdG9yZShhcHApO1xyXG5cclxuLy8gZXhwb3J0IGRlZmF1bHQgYXBwO1xyXG4iLCJpbXBvcnQgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBGaXJlYmFzZSwgeyBhdXRoIH0gZnJvbSBcIi4vRmlyZWJhc2VcIjtcclxuXHJcbmNvbnN0IGZvcm1hdEF1dGhVc2VyID0gKHVzZXIpID0+ICh7XHJcbiAgdWlkOiB1c2VyLnVpZCxcclxuICBlbWFpbDogdXNlci5lbWFpbCxcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB1c2VGaXJlYmFzZUF1dGgoKSB7XHJcbiAgY29uc3QgW2F1dGhVc2VyLCBzZXRBdXRoVXNlcl0gPSB1c2VTdGF0ZShudWxsKTtcclxuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcclxuXHJcbiAgY29uc3QgYXV0aFN0YXRlQ2hhbmdlZCA9IGFzeW5jIChhdXRoU3RhdGUpID0+IHtcclxuICAgIGlmICghYXV0aFN0YXRlKSB7XHJcbiAgICAgIHNldEF1dGhVc2VyKG51bGwpO1xyXG4gICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHNldExvYWRpbmcodHJ1ZSk7XHJcbiAgICBjb25zdCBmb3JtYXR0ZWRVc2VyID0gZm9ybWF0QXV0aFVzZXIoYXV0aFN0YXRlKTtcclxuICAgIHNldEF1dGhVc2VyKGZvcm1hdHRlZFVzZXIpO1xyXG4gICAgc2V0TG9hZGluZyhmYWxzZSk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgY2xlYXIgPSAoKSA9PiB7XHJcbiAgICBzZXRBdXRoVXNlcihudWxsKTtcclxuICAgIHNldExvYWRpbmcodHJ1ZSk7XHJcbiAgfTtcclxuXHJcbiAgLy9zaWduIGluIHdpdGggZ29vZ2xlXHJcbiAgY29uc3Qgc2lnbkluV2l0aEdvb2dsZSA9ICgpID0+IHtcclxuICAgIGNvbnN0IHByb3ZpZGVyID0gbmV3IEZpcmViYXNlLmF1dGguR29vZ2xlQXV0aFByb3ZpZGVyKCk7XHJcbiAgICBwcm92aWRlci5zZXRDdXN0b21QYXJhbWV0ZXJzKHsgcHJvbXB0OiBcInNlbGVjdF9hY2NvdW50XCIgfSk7XHJcblxyXG4gICAgcmV0dXJuIGF1dGguc2lnbkluV2l0aFJlZGlyZWN0KHByb3ZpZGVyKS5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgICAgY29uc29sZS5lcnJvcihcIkdvb2dsZSBTaWduLUluIEVycm9yOlwiLCBlcnJvcik7XHJcbiAgICAgIHRocm93IGVycm9yO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3Qgc2lnbk91dCA9ICgpID0+IGF1dGguc2lnbk91dCgpLnRoZW4oY2xlYXIpO1xyXG5cclxuICAvLyBMaXN0ZW4gZm9yIEZpcmViYXNlIGF1dGggc3RhdGUgY2hhbmdlc1xyXG4gIC8vIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgLy8gICBjb25zdCB1bnN1YnNjcmliZSA9IGF1dGgub25BdXRoU3RhdGVDaGFuZ2VkKGF1dGhTdGF0ZUNoYW5nZWQpO1xyXG4gIC8vICAgcmV0dXJuICgpID0+IHVuc3Vic2NyaWJlKCk7XHJcbiAgLy8gfSwgW10pO1xyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBsZXQgdW5zdWJzY3JpYmU7XHJcbiAgICBhdXRoXHJcbiAgICAgIC5zZXRQZXJzaXN0ZW5jZShGaXJlYmFzZS5hdXRoLkF1dGguUGVyc2lzdGVuY2UuTE9DQUwpXHJcbiAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAvLyBOb3cgc2V0IHVwIHRoZSBsaXN0ZW5lclxyXG4gICAgICAgIHVuc3Vic2NyaWJlID0gYXV0aC5vbkF1dGhTdGF0ZUNoYW5nZWQoYXV0aFN0YXRlQ2hhbmdlZCk7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IGNvbnNvbGUuZXJyb3IoXCJFcnJvciBzZXR0aW5nIHBlcnNpc3RlbmNlOlwiLCBlcnJvcikpO1xyXG5cclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIGlmICh1bnN1YnNjcmliZSkge1xyXG4gICAgICAgIHVuc3Vic2NyaWJlKCk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfSwgW10pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgYXV0aFVzZXIsXHJcbiAgICBsb2FkaW5nLFxyXG4gICAgc2lnbkluV2l0aEdvb2dsZSxcclxuICAgIHNpZ25PdXQsXHJcbiAgfTtcclxufVxyXG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0IH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBIZWFkIGZyb20gXCJuZXh0L2hlYWRcIjtcclxuaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSBcIm5leHQvcm91dGVyXCI7XHJcbmltcG9ydCBcImJvb3RzdHJhcC9kaXN0L2Nzcy9ib290c3RyYXAubWluLmNzc1wiO1xyXG5pbXBvcnQgXCIuLi9zdHlsZXMvZ2xvYmFsLmNzc1wiO1xyXG5pbXBvcnQgTGF5b3V0IGZyb20gXCIuLi9jb21wb25lbnRzL0xheW91dFwiO1xyXG5pbXBvcnQgeyBBdXRoVXNlclByb3ZpZGVyIH0gZnJvbSBcIi4uL2NvbnRleHQvQXV0aFVzZXJDb250ZXh0XCI7XHJcblxyXG4vLyBTZXR1cCBwZGZqcyAoaWYgdXNlZCkgLSBvbmx5IG9uIGNsaWVudCBzaWRlXHJcbmxldCBwZGZqcyA9IG51bGw7XHJcbmlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgLy8gT25seSBpbXBvcnQgb24gY2xpZW50IHNpZGVcclxuICB0cnkge1xyXG4gICAgY29uc3QgeyBwZGZqczogcGRmanNNb2R1bGUgfSA9IHJlcXVpcmUoXCJyZWFjdC1wZGZcIik7XHJcbiAgICBwZGZqcyA9IHBkZmpzTW9kdWxlO1xyXG4gICAgcGRmanMuR2xvYmFsV29ya2VyT3B0aW9ucy53b3JrZXJTcmMgPSBgLy9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvcGRmLmpzLyR7cGRmanMudmVyc2lvbn0vcGRmLndvcmtlci5taW4uanNgO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLndhcm4oXCJQREYuanMgbm90IGF2YWlsYWJsZTpcIiwgZXJyb3IpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gTXlBcHAoeyBDb21wb25lbnQsIHBhZ2VQcm9wcyB9KSB7XHJcbiAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XHJcblxyXG4gIC8vIExvYWQgQm9vdHN0cmFwIEpTIG9uY2VcclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgcmVxdWlyZShcImJvb3RzdHJhcC9kaXN0L2pzL2Jvb3RzdHJhcC5idW5kbGUubWluLmpzXCIpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm47XHJcbiAgICBpZiAoIShcInNlcnZpY2VXb3JrZXJcIiBpbiBuYXZpZ2F0b3IpKSByZXR1cm47XHJcbiAgICBjb25zdCBvbkxvYWQgPSAoKSA9PiB7XHJcbiAgICAgIG5hdmlnYXRvci5zZXJ2aWNlV29ya2VyLnJlZ2lzdGVyKFwiL3N3LmpzXCIpLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUud2FybihcIlNlcnZpY2Ugd29ya2VyIHJlZ2lzdHJhdGlvbiBmYWlsZWQ6XCIsIGVycm9yKTtcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIG9uTG9hZCk7XHJcbiAgICByZXR1cm4gKCkgPT4gd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIG9uTG9hZCk7XHJcbiAgfSwgW10pO1xyXG5cclxuICAvLyBORVc6IE9uIGluaXRpYWwgY2xpZW50IG1vdW50LCBjaGVjayBpZiB0aGUgYnJvd3NlciBVUkwgKHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSlcclxuICAvLyBpcyBkaWZmZXJlbnQgZnJvbSB3aGF0IE5leHQncyByb3V0ZXIgdGhpbmtzICh3aGljaCB3aWxsIGJlIFwiL1wiIHdoZW4gc2VydmVkIHZpYSBpbmRleC5odG1sKS5cclxuICAvLyBJZiBzbywgcmVwbGFjZSB0aGUgcm91dGUgc28gdGhhdCBOZXh0IGxvYWRzIHRoZSBwcm9wZXIgZHluYW1pYyBwYWdlLlxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiByb3V0ZXIuaXNSZWFkeSkge1xyXG4gICAgICBjb25zdCBhY3R1YWxQYXRoID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xyXG4gICAgICAvLyBPbmx5IGlmIHRoZSBjdXJyZW50IGJyb3dzZXIgcGF0aCBpcyBub3QgXCIvXCIgYnV0IHRoZSByb3V0ZXIgc2hvd3MgXCIvXCJcclxuICAgICAgLy8gKHdoaWNoIGhhcHBlbnMgYmVjYXVzZSBGaXJlYmFzZSBIb3N0aW5nIHNlcnZlcyBpbmRleC5odG1sIGZvciBldmVyeSByb3V0ZSksXHJcbiAgICAgIC8vIHRoZW4gbmF2aWdhdGUgdG8gdGhlIGFjdHVhbCBwYXRoLlxyXG4gICAgICBpZiAoYWN0dWFsUGF0aCAhPT0gXCIvXCIgJiYgcm91dGVyLmFzUGF0aCA9PT0gXCIvXCIpIHtcclxuICAgICAgICByb3V0ZXIucmVwbGFjZShhY3R1YWxQYXRoICsgd2luZG93LmxvY2F0aW9uLnNlYXJjaCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LCBbcm91dGVyLmlzUmVhZHksIHJvdXRlci5hc1BhdGhdKTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxBdXRoVXNlclByb3ZpZGVyPlxyXG4gICAgICA8SGVhZD5cclxuICAgICAgICA8bGluayByZWw9XCJtYW5pZmVzdFwiIGhyZWY9XCIvbWFuaWZlc3QuanNvblwiIC8+XHJcbiAgICAgICAgPG1ldGEgbmFtZT1cInRoZW1lLWNvbG9yXCIgY29udGVudD1cIiMwZjE3MmFcIiAvPlxyXG4gICAgICAgIDxtZXRhIG5hbWU9XCJhcHBsaWNhdGlvbi1uYW1lXCIgY29udGVudD1cIk1hZ21vIEludmVudG9yeVwiIC8+XHJcbiAgICAgICAgPG1ldGEgbmFtZT1cImFwcGxlLW1vYmlsZS13ZWItYXBwLWNhcGFibGVcIiBjb250ZW50PVwieWVzXCIgLz5cclxuICAgICAgICA8bWV0YSBuYW1lPVwiYXBwbGUtbW9iaWxlLXdlYi1hcHAtdGl0bGVcIiBjb250ZW50PVwiTWFnbW9cIiAvPlxyXG4gICAgICAgIDxtZXRhIG5hbWU9XCJhcHBsZS1tb2JpbGUtd2ViLWFwcC1zdGF0dXMtYmFyLXN0eWxlXCIgY29udGVudD1cImRlZmF1bHRcIiAvPlxyXG4gICAgICAgIDxsaW5rIHJlbD1cImFwcGxlLXRvdWNoLWljb25cIiBocmVmPVwiL2FwcGxlLXRvdWNoLWljb24ucG5nXCIgLz5cclxuICAgICAgPC9IZWFkPlxyXG4gICAgICA8TGF5b3V0PlxyXG4gICAgICAgIDxDb21wb25lbnQgey4uLnBhZ2VQcm9wc30gLz5cclxuICAgICAgPC9MYXlvdXQ+XHJcbiAgICA8L0F1dGhVc2VyUHJvdmlkZXI+XHJcbiAgKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTXlBcHA7XHJcbiIsIi8vIEV4cG9ydHNcbm1vZHVsZS5leHBvcnRzID0ge1xuXHRcImNvbnRhaW5lclwiOiBcIkhvbWVfY29udGFpbmVyX18xRWNzVVwiLFxuXHRcIm1haW5cIjogXCJIb21lX21haW5fXzF4OGdDXCIsXG5cdFwiZm9vdGVyXCI6IFwiSG9tZV9mb290ZXJfXzFXZGhEXCIsXG5cdFwiYVwiOiBcIkhvbWVfYV9fM2VhcWZcIixcblx0XCJ0aXRsZVwiOiBcIkhvbWVfdGl0bGVfXzNEalI3XCIsXG5cdFwiZGVzY3JpcHRpb25cIjogXCJIb21lX2Rlc2NyaXB0aW9uX18xN1o0RlwiLFxuXHRcImNvZGVcIjogXCJIb21lX2NvZGVfX2F4eDJZXCIsXG5cdFwiZ3JpZFwiOiBcIkhvbWVfZ3JpZF9fMkVpMkZcIixcblx0XCJjYXJkXCI6IFwiSG9tZV9jYXJkX18yU2R0QlwiLFxuXHRcImxvZ29cIjogXCJIb21lX2xvZ29fXzFZYnJIXCIsXG5cdFwidGFibGUtY29udGFpbmVyXCI6IFwiSG9tZV90YWJsZS1jb250YWluZXJfXzFneGE5XCIsXG5cdFwidGFibGVcIjogXCJIb21lX3RhYmxlX18xYnpmVlwiLFxuXHRcImF1dG8tZ3Jvdy10ZXh0YXJlYVwiOiBcIkhvbWVfYXV0by1ncm93LXRleHRhcmVhX18zTUt5cFwiXG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYm9vdHN0cmFwL2Rpc3QvanMvYm9vdHN0cmFwLmJ1bmRsZS5taW4uanNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZmlyZWJhc2UvY29tcGF0L2FwcFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmaXJlYmFzZS9jb21wYXQvYXV0aFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmaXJlYmFzZS9jb21wYXQvZmlyZXN0b3JlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZpcmViYXNlL2NvbXBhdC9zdG9yYWdlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5leHQvaGVhZFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXh0L3JvdXRlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdFwiKTsiXSwic291cmNlUm9vdCI6IiJ9