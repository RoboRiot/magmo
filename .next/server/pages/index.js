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
/******/ 	return __webpack_require__(__webpack_require__.s = "./pages/index.js");
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

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Home; });
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/head */ "next/head");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-bootstrap */ "react-bootstrap");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _styles_Home_module_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../styles/Home.module.css */ "./styles/Home.module.css");
/* harmony import */ var _styles_Home_module_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/router */ "next/router");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _context_Firebase__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../context/Firebase */ "./context/Firebase.js");
var _jsxFileName = "C:\\Users\\mack2\\Desktop\\code\\pages\\index.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;
// pages/index.js





 // compat default export ONLY

function Home() {
  const router = Object(next_router__WEBPACK_IMPORTED_MODULE_4__["useRouter"])();
  const {
    0: error,
    1: setError
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])("");
  const {
    0: hasMounted,
    1: setHasMounted
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(false);
  const {
    0: authReady,
    1: setAuthReady
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(false);
  const unsubRef = Object(react__WEBPACK_IMPORTED_MODULE_1__["useRef"])(null);

  const getDestination = () => {
    var _router$query;

    const q = router === null || router === void 0 ? void 0 : (_router$query = router.query) === null || _router$query === void 0 ? void 0 : _router$query.redirect;
    return Array.isArray(q) ? q[0] || "/NewSearch/mainSearch" : q || "/NewSearch/mainSearch";
  };

  const isIosSafari = () => {
    if (typeof navigator === "undefined") return false;
    const ua = navigator.userAgent;
    const isIOS = /iP(hone|ad|od)/i.test(ua);
    const isSafari = /Safari/i.test(ua) && !/Chrome|CriOS|FxiOS|EdgiOS/i.test(ua);
    return isIOS && isSafari;
  };

  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(() => setHasMounted(true), []); // One-time auth listener

  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(() => {
    if (!hasMounted) return;

    (async () => {
      try {
        await _context_Firebase__WEBPACK_IMPORTED_MODULE_5__["default"].auth().setPersistence(_context_Firebase__WEBPACK_IMPORTED_MODULE_5__["default"].auth.Auth.Persistence.LOCAL); // simple storage probe to detect hostile environments

        try {
          localStorage.setItem("__magmo_probe", "1");
        } catch (e) {
          console.warn("[auth] localStorage not available; redirects may fail");
        }

        unsubRef.current = _context_Firebase__WEBPACK_IMPORTED_MODULE_5__["default"].auth().onAuthStateChanged(user => {
          console.log("[auth] onAuthStateChanged:", user);
          setAuthReady(true);

          if (user) {
            const dest = getDestination();
            router.replace(dest);
          }
        });
      } catch (e) {
        console.error("[auth] persistence setup error:", e);
        setError("Authentication init failed.");
      }
    })();

    return () => {
      if (unsubRef.current) unsubRef.current();
    };
  }, [hasMounted, router]);
  if (!hasMounted) return null;

  const handleGoogleSignIn = async () => {
    setError("");

    try {
      await _context_Firebase__WEBPACK_IMPORTED_MODULE_5__["default"].auth().setPersistence(_context_Firebase__WEBPACK_IMPORTED_MODULE_5__["default"].auth.Auth.Persistence.LOCAL);
      const provider = new _context_Firebase__WEBPACK_IMPORTED_MODULE_5__["default"].auth.GoogleAuthProvider();
      provider.addScope("email");
      provider.addScope("profile");
      provider.setCustomParameters({
        prompt: "select_account"
      }); // prefer popup (no redirect state), fallback to redirect only where needed

      if (isIosSafari()) {
        console.log("[auth] Using redirect (iOS Safari)"); // mark that we attempted sign-in (to detect storage loss)

        try {
          localStorage.setItem("__magmo_signin_attempt", Date.now().toString());
        } catch (_) {}

        await _context_Firebase__WEBPACK_IMPORTED_MODULE_5__["default"].auth().signInWithRedirect(provider);
      } else {
        console.log("[auth] Using popup");
        const result = await _context_Firebase__WEBPACK_IMPORTED_MODULE_5__["default"].auth().signInWithPopup(provider);
        console.log("[auth] popup result:", result && result.user); // onAuthStateChanged will route; but we can route immediately too:

        if (result && result.user) {
          const dest = getDestination();
          router.replace(dest);
        }
      }
    } catch (err) {
      console.error("[auth] sign-in error:", err);
      setError("Failed to log in with Google: " + (err && err.message ? err.message : String(err)));
    }
  };

  const handleTestLogin = async () => {
    setError("");
    const password = prompt("Enter password:");
    if (!password) return;

    try {
      await _context_Firebase__WEBPACK_IMPORTED_MODULE_5__["default"].auth().signInWithEmailAndPassword("test@test.com", password);
      router.replace("/NewSearch/searchTest");
    } catch (err) {
      setError("Test login failed: " + (err && err.message ? err.message : String(err)));
    }
  };

  return __jsx("div", {
    className: _styles_Home_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.container,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 109,
      columnNumber: 5
    }
  }, __jsx(next_head__WEBPACK_IMPORTED_MODULE_0___default.a, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 110,
      columnNumber: 7
    }
  }, __jsx("title", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 111,
      columnNumber: 9
    }
  }, "magmo"), __jsx("link", {
    rel: "icon",
    href: "/favicon.ico",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 112,
      columnNumber: 9
    }
  }), __jsx("meta", {
    name: "viewport",
    content: "width=device-width, initial-scale=1.0",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 113,
      columnNumber: 9
    }
  })), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Container"], {
    className: "d-flex align-items-center justify-content-center",
    style: {
      minHeight: "100vh"
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 116,
      columnNumber: 7
    }
  }, __jsx("div", {
    className: "w-100",
    style: {
      maxWidth: "400px"
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 117,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Card"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 118,
      columnNumber: 11
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Card"].Body, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 119,
      columnNumber: 13
    }
  }, __jsx("h2", {
    className: "text-center mb-4",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 120,
      columnNumber: 15
    }
  }, "MAGMO"), !authReady && __jsx("div", {
    className: "mb-2 small text-muted",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 121,
      columnNumber: 30
    }
  }, "Initializing\u2026"), error && __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Alert"], {
    variant: "danger",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 122,
      columnNumber: 25
    }
  }, error), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "light",
    className: "w-100 d-flex align-items-center justify-content-center",
    onClick: handleGoogleSignIn,
    style: {
      border: "1px solid #dadce0",
      borderRadius: "0.375rem",
      color: "#757575",
      padding: "0.5rem 1rem"
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 124,
      columnNumber: 15
    }
  }, __jsx("img", {
    src: "https://www.svgrepo.com/show/355037/google.svg",
    alt: "Google logo",
    width: "20",
    height: "20",
    className: "me-2",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 135,
      columnNumber: 17
    }
  }), "Sign in with Google"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "secondary",
    className: "w-100 mt-3",
    onClick: handleTestLogin,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 145,
      columnNumber: 15
    }
  }, "Test Login"))))));
}

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vY29udGV4dC9GaXJlYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9wYWdlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zdHlsZXMvSG9tZS5tb2R1bGUuY3NzIiwid2VicGFjazovLy9leHRlcm5hbCBcImZpcmViYXNlL2NvbXBhdC9hcHBcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJmaXJlYmFzZS9jb21wYXQvYXV0aFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImZpcmViYXNlL2NvbXBhdC9maXJlc3RvcmVcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJmaXJlYmFzZS9jb21wYXQvc3RvcmFnZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm5leHQvaGVhZFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm5leHQvcm91dGVyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3RcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1ib290c3RyYXBcIiJdLCJuYW1lcyI6WyJGaXJlYmFzZUNyZWRlbnRpYWxzIiwiYXBpS2V5IiwiYXV0aERvbWFpbiIsInByb2plY3RJZCIsInN0b3JhZ2VCdWNrZXQiLCJtZXNzYWdpbmdTZW5kZXJJZCIsImFwcElkIiwibWVhc3VyZW1lbnRJZCIsIkZpcmViYXNlIiwiYXBwcyIsImxlbmd0aCIsImluaXRpYWxpemVBcHAiLCJhdXRoIiwiSG9tZSIsInJvdXRlciIsInVzZVJvdXRlciIsImVycm9yIiwic2V0RXJyb3IiLCJ1c2VTdGF0ZSIsImhhc01vdW50ZWQiLCJzZXRIYXNNb3VudGVkIiwiYXV0aFJlYWR5Iiwic2V0QXV0aFJlYWR5IiwidW5zdWJSZWYiLCJ1c2VSZWYiLCJnZXREZXN0aW5hdGlvbiIsInEiLCJxdWVyeSIsInJlZGlyZWN0IiwiQXJyYXkiLCJpc0FycmF5IiwiaXNJb3NTYWZhcmkiLCJuYXZpZ2F0b3IiLCJ1YSIsInVzZXJBZ2VudCIsImlzSU9TIiwidGVzdCIsImlzU2FmYXJpIiwidXNlRWZmZWN0IiwiZmlyZWJhc2UiLCJzZXRQZXJzaXN0ZW5jZSIsIkF1dGgiLCJQZXJzaXN0ZW5jZSIsIkxPQ0FMIiwibG9jYWxTdG9yYWdlIiwic2V0SXRlbSIsImUiLCJjb25zb2xlIiwid2FybiIsImN1cnJlbnQiLCJvbkF1dGhTdGF0ZUNoYW5nZWQiLCJ1c2VyIiwibG9nIiwiZGVzdCIsInJlcGxhY2UiLCJoYW5kbGVHb29nbGVTaWduSW4iLCJwcm92aWRlciIsIkdvb2dsZUF1dGhQcm92aWRlciIsImFkZFNjb3BlIiwic2V0Q3VzdG9tUGFyYW1ldGVycyIsInByb21wdCIsIkRhdGUiLCJub3ciLCJ0b1N0cmluZyIsIl8iLCJzaWduSW5XaXRoUmVkaXJlY3QiLCJyZXN1bHQiLCJzaWduSW5XaXRoUG9wdXAiLCJlcnIiLCJtZXNzYWdlIiwiU3RyaW5nIiwiaGFuZGxlVGVzdExvZ2luIiwicGFzc3dvcmQiLCJzaWduSW5XaXRoRW1haWxBbmRQYXNzd29yZCIsInN0eWxlcyIsImNvbnRhaW5lciIsIm1pbkhlaWdodCIsIm1heFdpZHRoIiwiYm9yZGVyIiwiYm9yZGVyUmFkaXVzIiwiY29sb3IiLCJwYWRkaW5nIl0sIm1hcHBpbmdzIjoiOztRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsSUFBSTtRQUNKO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FB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QUFHLEVBQUMsZ0RBRE47QUFFRSxPQUFHLEVBQUMsYUFGTjtBQUdFLFNBQUssRUFBQyxJQUhSO0FBSUUsVUFBTSxFQUFDLElBSlQ7QUFLRSxhQUFTLEVBQUMsTUFMWjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBWEYsd0JBTEYsRUEwQkUsTUFBQyxzREFBRDtBQUFRLFdBQU8sRUFBQyxXQUFoQjtBQUE0QixhQUFTLEVBQUMsWUFBdEM7QUFBbUQsV0FBTyxFQUFFVixlQUE1RDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGtCQTFCRixDQURGLENBREYsQ0FERixDQVBGLENBREY7QUE4Q0QsQzs7Ozs7Ozs7Ozs7QUN6SkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2ZBLGdEOzs7Ozs7Ozs7OztBQ0FBLGlEOzs7Ozs7Ozs7OztBQ0FBLHNEOzs7Ozs7Ozs7OztBQ0FBLG9EOzs7Ozs7Ozs7OztBQ0FBLHNDOzs7Ozs7Ozs7OztBQ0FBLHdDOzs7Ozs7Ozs7OztBQ0FBLGtDOzs7Ozs7Ozs7OztBQ0FBLDRDIiwiZmlsZSI6InBhZ2VzL2luZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSByZXF1aXJlKCcuLi9zc3ItbW9kdWxlLWNhY2hlLmpzJyk7XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdHZhciB0aHJldyA9IHRydWU7XG4gXHRcdHRyeSB7XG4gXHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG4gXHRcdFx0dGhyZXcgPSBmYWxzZTtcbiBcdFx0fSBmaW5hbGx5IHtcbiBcdFx0XHRpZih0aHJldykgZGVsZXRlIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHR9XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9wYWdlcy9pbmRleC5qc1wiKTtcbiIsIi8vIC8vIGltcG9ydCBmaXJlYmFzZSBmcm9tIFwiZmlyZWJhc2UvYXBwXCJcbi8vIGltcG9ydCAqIGFzIGZpcmViYXNlIGZyb20gXCJmaXJlYmFzZS9hcHBcIjtcbi8vIC8vIGltcG9ydCBcImZpcmViYXNlL2F1dGhcIlxuXG4vLyBjb25zdCBhcHAgPSBmaXJlYmFzZS5pbml0aWFsaXplQXBwKHtcbi8vICAgICBhcGlLZXk6IFwiQUl6YVN5Q3hDLWE4YjVWaGhleThHRjQ3THBYWjFhTUtZbWlJaHdFXCIsXG4vLyAgICAgYXV0aERvbWFpbjogXCJtYWdtby1hYzEwYy5maXJlYmFzZWFwcC5jb21cIixcbi8vICAgICBwcm9qZWN0SWQ6IFwibWFnbW8tYWMxMGNcIixcbi8vICAgICBzdG9yYWdlQnVja2V0OiBcIm1hZ21vLWFjMTBjLmFwcHNwb3QuY29tXCIsXG4vLyAgICAgbWVzc2FnaW5nU2VuZGVySWQ6IFwiMTc3ODU3NTI1MTQ3XCIsXG4vLyAgICAgYXBwSWQ6IFwiMToxNzc4NTc1MjUxNDc6d2ViOmFjOGUzYzg3ZDgyMzk2YmViMWRkM2VcIixcbi8vICAgICBtZWFzdXJlbWVudElkOiBcIkctTDAyMzZKVDVOM1wiXG4vLyB9KVxuXG4vLyBleHBvcnQgY29uc3QgYXV0aCA9IGFwcC5hdXRoKClcbi8vIGV4cG9ydCBkZWZhdWx0IGFwcFxuXG4vLyBhcGlLZXk6IHByb2Nlc3MuZW52LlJFQUNUX0FQUF9GSVJFQkFTRV9LRVksXG4vLyAgICAgYXV0aERvbWFpbjogcHJvY2Vzcy5lbnYuUkVBQ1RfQVBQX0ZJUkVCQVNFX0FVVEhfRE9NQUlOLFxuLy8gICAgIHByb2plY3RJZDogcHJvY2Vzcy5lbnYuUkVBQ1RfQVBQX0ZJUkVCQVNFX1BST0pFQ1RfSUQsXG4vLyAgICAgc3RvcmFnZUJ1Y2tldDogcHJvY2Vzcy5lbnYuUkVBQ1RfQVBQX0ZJUkVCQVNFX1NUT1JBR0VfQlVDS0VULFxuLy8gICAgIG1lc3NhZ2luZ1NlbmRlcklkOiBwcm9jZXNzLmVudi5SRUFDVF9BUFBfRklSRUJBU0VfTUVTU0FHSU5HX1NFTkRFUl9JRCxcbi8vICAgICBhcHBJZDogcHJvY2Vzcy5lbnYuUkVBQ1RfQVBQX0ZJUkVCQVNFX0FQUF9JRCxcbi8vICAgICBtZWFzdXJlbWVudElkOiBwcm9jZXNzLmVudi5SRUFDVF9BUFBfRklSRUJBU0VfTUVBU1VSRU1FTlRfSURcblxuaW1wb3J0IEZpcmViYXNlIGZyb20gXCJmaXJlYmFzZS9jb21wYXQvYXBwXCI7XG5pbXBvcnQgXCJmaXJlYmFzZS9jb21wYXQvYXV0aFwiO1xuaW1wb3J0IFwiZmlyZWJhc2UvY29tcGF0L2ZpcmVzdG9yZVwiO1xuaW1wb3J0IFwiZmlyZWJhc2UvY29tcGF0L3N0b3JhZ2VcIjtcblxuY29uc3QgRmlyZWJhc2VDcmVkZW50aWFscyA9IHtcbiAgYXBpS2V5OiBcIkFJemFTeUN4Qy1hOGI1VmhoZXk4R0Y0N0xwWFoxYU1LWW1pSWh3RVwiLFxuICBhdXRoRG9tYWluOiBcIm1hZ21vLWFjMTBjLmZpcmViYXNlYXBwLmNvbVwiLFxuICBwcm9qZWN0SWQ6IFwibWFnbW8tYWMxMGNcIixcbiAgc3RvcmFnZUJ1Y2tldDogXCJtYWdtby1hYzEwYy5hcHBzcG90LmNvbVwiLFxuICBtZXNzYWdpbmdTZW5kZXJJZDogXCIxNzc4NTc1MjUxNDdcIixcbiAgYXBwSWQ6IFwiMToxNzc4NTc1MjUxNDc6d2ViOmFjOGUzYzg3ZDgyMzk2YmViMWRkM2VcIixcbiAgbWVhc3VyZW1lbnRJZDogXCJHLUwwMjM2SlQ1TjNcIixcbn07XG4vLyBpZiBhIEZpcmViYXNlIGluc3RhbmNlIGRvZXNuJ3QgZXhpc3QsIGNyZWF0ZSBvbmVcbmlmICghRmlyZWJhc2UuYXBwcy5sZW5ndGgpIHtcbiAgRmlyZWJhc2UuaW5pdGlhbGl6ZUFwcChGaXJlYmFzZUNyZWRlbnRpYWxzKTtcbn1cblxuZXhwb3J0IGNvbnN0IGF1dGggPSBGaXJlYmFzZS5hdXRoKCk7XG5leHBvcnQgZGVmYXVsdCBGaXJlYmFzZTtcblxuLy8gaW1wb3J0IHsgaW5pdGlhbGl6ZUFwcCB9IGZyb20gJ2ZpcmViYXNlL2FwcCc7XG4vLyBpbXBvcnQgeyBnZXRGaXJlc3RvcmUsIGNvbGxlY3Rpb24sIGdldERvY3MgfSBmcm9tICdmaXJlYmFzZS9maXJlc3RvcmUnO1xuXG4vLyBjb25zdCBhcHAgPSBpbml0aWFsaXplQXBwKGZpcmViYXNlQ29uZmlnKTtcbi8vIGNvbnN0IGRiID0gZ2V0RmlyZXN0b3JlKGFwcCk7XG5cbi8vIGV4cG9ydCBkZWZhdWx0IGFwcDtcbiIsIi8vIHBhZ2VzL2luZGV4LmpzXG5pbXBvcnQgSGVhZCBmcm9tIFwibmV4dC9oZWFkXCI7XG5pbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCwgdXNlUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBCdXR0b24sIENhcmQsIENvbnRhaW5lciwgQWxlcnQgfSBmcm9tIFwicmVhY3QtYm9vdHN0cmFwXCI7XG5pbXBvcnQgc3R5bGVzIGZyb20gXCIuLi9zdHlsZXMvSG9tZS5tb2R1bGUuY3NzXCI7XG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tIFwibmV4dC9yb3V0ZXJcIjtcbmltcG9ydCBmaXJlYmFzZSBmcm9tIFwiLi4vY29udGV4dC9GaXJlYmFzZVwiOyAvLyBjb21wYXQgZGVmYXVsdCBleHBvcnQgT05MWVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBIb21lKCkge1xuICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcbiAgY29uc3QgW2Vycm9yLCBzZXRFcnJvcl0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2hhc01vdW50ZWQsIHNldEhhc01vdW50ZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbYXV0aFJlYWR5LCBzZXRBdXRoUmVhZHldID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCB1bnN1YlJlZiA9IHVzZVJlZihudWxsKTtcblxuICBjb25zdCBnZXREZXN0aW5hdGlvbiA9ICgpID0+IHtcbiAgICBjb25zdCBxID0gcm91dGVyPy5xdWVyeT8ucmVkaXJlY3Q7XG4gICAgcmV0dXJuIEFycmF5LmlzQXJyYXkocSkgPyBxWzBdIHx8IFwiL05ld1NlYXJjaC9tYWluU2VhcmNoXCIgOiAocSB8fCBcIi9OZXdTZWFyY2gvbWFpblNlYXJjaFwiKTtcbiAgfTtcblxuICBjb25zdCBpc0lvc1NhZmFyaSA9ICgpID0+IHtcbiAgICBpZiAodHlwZW9mIG5hdmlnYXRvciA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIGZhbHNlO1xuICAgIGNvbnN0IHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudDtcbiAgICBjb25zdCBpc0lPUyA9IC9pUChob25lfGFkfG9kKS9pLnRlc3QodWEpO1xuICAgIGNvbnN0IGlzU2FmYXJpID0gL1NhZmFyaS9pLnRlc3QodWEpICYmICEvQ2hyb21lfENyaU9TfEZ4aU9TfEVkZ2lPUy9pLnRlc3QodWEpO1xuICAgIHJldHVybiBpc0lPUyAmJiBpc1NhZmFyaTtcbiAgfTtcblxuICB1c2VFZmZlY3QoKCkgPT4gc2V0SGFzTW91bnRlZCh0cnVlKSwgW10pO1xuXG4gIC8vIE9uZS10aW1lIGF1dGggbGlzdGVuZXJcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWhhc01vdW50ZWQpIHJldHVybjtcbiAgICAoYXN5bmMgKCkgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgZmlyZWJhc2UuYXV0aCgpLnNldFBlcnNpc3RlbmNlKGZpcmViYXNlLmF1dGguQXV0aC5QZXJzaXN0ZW5jZS5MT0NBTCk7XG4gICAgICAgIC8vIHNpbXBsZSBzdG9yYWdlIHByb2JlIHRvIGRldGVjdCBob3N0aWxlIGVudmlyb25tZW50c1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiX19tYWdtb19wcm9iZVwiLCBcIjFcIik7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oXCJbYXV0aF0gbG9jYWxTdG9yYWdlIG5vdCBhdmFpbGFibGU7IHJlZGlyZWN0cyBtYXkgZmFpbFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHVuc3ViUmVmLmN1cnJlbnQgPSBmaXJlYmFzZS5hdXRoKCkub25BdXRoU3RhdGVDaGFuZ2VkKCh1c2VyKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJbYXV0aF0gb25BdXRoU3RhdGVDaGFuZ2VkOlwiLCB1c2VyKTtcbiAgICAgICAgICBzZXRBdXRoUmVhZHkodHJ1ZSk7XG4gICAgICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgICAgIGNvbnN0IGRlc3QgPSBnZXREZXN0aW5hdGlvbigpO1xuICAgICAgICAgICAgcm91dGVyLnJlcGxhY2UoZGVzdCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIlthdXRoXSBwZXJzaXN0ZW5jZSBzZXR1cCBlcnJvcjpcIiwgZSk7XG4gICAgICAgIHNldEVycm9yKFwiQXV0aGVudGljYXRpb24gaW5pdCBmYWlsZWQuXCIpO1xuICAgICAgfVxuICAgIH0pKCk7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgaWYgKHVuc3ViUmVmLmN1cnJlbnQpIHVuc3ViUmVmLmN1cnJlbnQoKTtcbiAgICB9O1xuICB9LCBbaGFzTW91bnRlZCwgcm91dGVyXSk7XG5cbiAgaWYgKCFoYXNNb3VudGVkKSByZXR1cm4gbnVsbDtcblxuICBjb25zdCBoYW5kbGVHb29nbGVTaWduSW4gPSBhc3luYyAoKSA9PiB7XG4gICAgc2V0RXJyb3IoXCJcIik7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IGZpcmViYXNlLmF1dGgoKS5zZXRQZXJzaXN0ZW5jZShmaXJlYmFzZS5hdXRoLkF1dGguUGVyc2lzdGVuY2UuTE9DQUwpO1xuICAgICAgY29uc3QgcHJvdmlkZXIgPSBuZXcgZmlyZWJhc2UuYXV0aC5Hb29nbGVBdXRoUHJvdmlkZXIoKTtcbiAgICAgIHByb3ZpZGVyLmFkZFNjb3BlKFwiZW1haWxcIik7XG4gICAgICBwcm92aWRlci5hZGRTY29wZShcInByb2ZpbGVcIik7XG4gICAgICBwcm92aWRlci5zZXRDdXN0b21QYXJhbWV0ZXJzKHsgcHJvbXB0OiBcInNlbGVjdF9hY2NvdW50XCIgfSk7XG5cbiAgICAgIC8vIHByZWZlciBwb3B1cCAobm8gcmVkaXJlY3Qgc3RhdGUpLCBmYWxsYmFjayB0byByZWRpcmVjdCBvbmx5IHdoZXJlIG5lZWRlZFxuICAgICAgaWYgKGlzSW9zU2FmYXJpKCkpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJbYXV0aF0gVXNpbmcgcmVkaXJlY3QgKGlPUyBTYWZhcmkpXCIpO1xuICAgICAgICAvLyBtYXJrIHRoYXQgd2UgYXR0ZW1wdGVkIHNpZ24taW4gKHRvIGRldGVjdCBzdG9yYWdlIGxvc3MpXG4gICAgICAgIHRyeSB7IGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiX19tYWdtb19zaWduaW5fYXR0ZW1wdFwiLCBEYXRlLm5vdygpLnRvU3RyaW5nKCkpOyB9IGNhdGNoIChfKSB7fVxuICAgICAgICBhd2FpdCBmaXJlYmFzZS5hdXRoKCkuc2lnbkluV2l0aFJlZGlyZWN0KHByb3ZpZGVyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiW2F1dGhdIFVzaW5nIHBvcHVwXCIpO1xuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBmaXJlYmFzZS5hdXRoKCkuc2lnbkluV2l0aFBvcHVwKHByb3ZpZGVyKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJbYXV0aF0gcG9wdXAgcmVzdWx0OlwiLCByZXN1bHQgJiYgcmVzdWx0LnVzZXIpO1xuICAgICAgICAvLyBvbkF1dGhTdGF0ZUNoYW5nZWQgd2lsbCByb3V0ZTsgYnV0IHdlIGNhbiByb3V0ZSBpbW1lZGlhdGVseSB0b286XG4gICAgICAgIGlmIChyZXN1bHQgJiYgcmVzdWx0LnVzZXIpIHtcbiAgICAgICAgICBjb25zdCBkZXN0ID0gZ2V0RGVzdGluYXRpb24oKTtcbiAgICAgICAgICByb3V0ZXIucmVwbGFjZShkZXN0KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5lcnJvcihcIlthdXRoXSBzaWduLWluIGVycm9yOlwiLCBlcnIpO1xuICAgICAgc2V0RXJyb3IoXCJGYWlsZWQgdG8gbG9nIGluIHdpdGggR29vZ2xlOiBcIiArIChlcnIgJiYgZXJyLm1lc3NhZ2UgPyBlcnIubWVzc2FnZSA6IFN0cmluZyhlcnIpKSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVRlc3RMb2dpbiA9IGFzeW5jICgpID0+IHtcbiAgICBzZXRFcnJvcihcIlwiKTtcbiAgICBjb25zdCBwYXNzd29yZCA9IHByb21wdChcIkVudGVyIHBhc3N3b3JkOlwiKTtcbiAgICBpZiAoIXBhc3N3b3JkKSByZXR1cm47XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IGZpcmViYXNlLmF1dGgoKS5zaWduSW5XaXRoRW1haWxBbmRQYXNzd29yZChcInRlc3RAdGVzdC5jb21cIiwgcGFzc3dvcmQpO1xuICAgICAgcm91dGVyLnJlcGxhY2UoXCIvTmV3U2VhcmNoL3NlYXJjaFRlc3RcIik7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBzZXRFcnJvcihcIlRlc3QgbG9naW4gZmFpbGVkOiBcIiArIChlcnIgJiYgZXJyLm1lc3NhZ2UgPyBlcnIubWVzc2FnZSA6IFN0cmluZyhlcnIpKSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5jb250YWluZXJ9PlxuICAgICAgPEhlYWQ+XG4gICAgICAgIDx0aXRsZT5tYWdtbzwvdGl0bGU+XG4gICAgICAgIDxsaW5rIHJlbD1cImljb25cIiBocmVmPVwiL2Zhdmljb24uaWNvXCIgLz5cbiAgICAgICAgPG1ldGEgbmFtZT1cInZpZXdwb3J0XCIgY29udGVudD1cIndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xLjBcIiAvPlxuICAgICAgPC9IZWFkPlxuXG4gICAgICA8Q29udGFpbmVyIGNsYXNzTmFtZT1cImQtZmxleCBhbGlnbi1pdGVtcy1jZW50ZXIganVzdGlmeS1jb250ZW50LWNlbnRlclwiIHN0eWxlPXt7IG1pbkhlaWdodDogXCIxMDB2aFwiIH19PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctMTAwXCIgc3R5bGU9e3sgbWF4V2lkdGg6IFwiNDAwcHhcIiB9fT5cbiAgICAgICAgICA8Q2FyZD5cbiAgICAgICAgICAgIDxDYXJkLkJvZHk+XG4gICAgICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlciBtYi00XCI+TUFHTU88L2gyPlxuICAgICAgICAgICAgICB7IWF1dGhSZWFkeSAmJiA8ZGl2IGNsYXNzTmFtZT1cIm1iLTIgc21hbGwgdGV4dC1tdXRlZFwiPkluaXRpYWxpemluZ+KApjwvZGl2Pn1cbiAgICAgICAgICAgICAge2Vycm9yICYmIDxBbGVydCB2YXJpYW50PVwiZGFuZ2VyXCI+e2Vycm9yfTwvQWxlcnQ+fVxuXG4gICAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgICB2YXJpYW50PVwibGlnaHRcIlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctMTAwIGQtZmxleCBhbGlnbi1pdGVtcy1jZW50ZXIganVzdGlmeS1jb250ZW50LWNlbnRlclwiXG4gICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlR29vZ2xlU2lnbklufVxuICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICBib3JkZXI6IFwiMXB4IHNvbGlkICNkYWRjZTBcIixcbiAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogXCIwLjM3NXJlbVwiLFxuICAgICAgICAgICAgICAgICAgY29sb3I6IFwiIzc1NzU3NVwiLFxuICAgICAgICAgICAgICAgICAgcGFkZGluZzogXCIwLjVyZW0gMXJlbVwiLFxuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgICAgICBzcmM9XCJodHRwczovL3d3dy5zdmdyZXBvLmNvbS9zaG93LzM1NTAzNy9nb29nbGUuc3ZnXCJcbiAgICAgICAgICAgICAgICAgIGFsdD1cIkdvb2dsZSBsb2dvXCJcbiAgICAgICAgICAgICAgICAgIHdpZHRoPVwiMjBcIlxuICAgICAgICAgICAgICAgICAgaGVpZ2h0PVwiMjBcIlxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibWUtMlwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICBTaWduIGluIHdpdGggR29vZ2xlXG4gICAgICAgICAgICAgIDwvQnV0dG9uPlxuXG4gICAgICAgICAgICAgIDxCdXR0b24gdmFyaWFudD1cInNlY29uZGFyeVwiIGNsYXNzTmFtZT1cInctMTAwIG10LTNcIiBvbkNsaWNrPXtoYW5kbGVUZXN0TG9naW59PlxuICAgICAgICAgICAgICAgIFRlc3QgTG9naW5cbiAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICA8L0NhcmQuQm9keT5cbiAgICAgICAgICA8L0NhcmQ+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9Db250YWluZXI+XG4gICAgPC9kaXY+XG4gICk7XG59XG4iLCIvLyBFeHBvcnRzXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0XCJjb250YWluZXJcIjogXCJIb21lX2NvbnRhaW5lcl9fMUVjc1VcIixcblx0XCJtYWluXCI6IFwiSG9tZV9tYWluX18xeDhnQ1wiLFxuXHRcImZvb3RlclwiOiBcIkhvbWVfZm9vdGVyX18xV2RoRFwiLFxuXHRcImFcIjogXCJIb21lX2FfXzNlYXFmXCIsXG5cdFwidGl0bGVcIjogXCJIb21lX3RpdGxlX18zRGpSN1wiLFxuXHRcImRlc2NyaXB0aW9uXCI6IFwiSG9tZV9kZXNjcmlwdGlvbl9fMTdaNEZcIixcblx0XCJjb2RlXCI6IFwiSG9tZV9jb2RlX19heHgyWVwiLFxuXHRcImdyaWRcIjogXCJIb21lX2dyaWRfXzJFaTJGXCIsXG5cdFwiY2FyZFwiOiBcIkhvbWVfY2FyZF9fMlNkdEJcIixcblx0XCJsb2dvXCI6IFwiSG9tZV9sb2dvX18xWWJySFwiLFxuXHRcInRhYmxlLWNvbnRhaW5lclwiOiBcIkhvbWVfdGFibGUtY29udGFpbmVyX18xZ3hhOVwiLFxuXHRcInRhYmxlXCI6IFwiSG9tZV90YWJsZV9fMWJ6ZlZcIixcblx0XCJhdXRvLWdyb3ctdGV4dGFyZWFcIjogXCJIb21lX2F1dG8tZ3Jvdy10ZXh0YXJlYV9fM01LeXBcIlxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZpcmViYXNlL2NvbXBhdC9hcHBcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZmlyZWJhc2UvY29tcGF0L2F1dGhcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZmlyZWJhc2UvY29tcGF0L2ZpcmVzdG9yZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmaXJlYmFzZS9jb21wYXQvc3RvcmFnZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXh0L2hlYWRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmV4dC9yb3V0ZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3RcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtYm9vdHN0cmFwXCIpOyJdLCJzb3VyY2VSb290IjoiIn0=