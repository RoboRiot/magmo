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
var _jsxFileName = "C:\\Users\\mack2\\OneDrive\\Desktop\\code\\pages\\index.js";
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
  }, __jsx("div", {
    className: "text-center mb-4",
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%"
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 120,
      columnNumber: 15
    }
  }, __jsx("img", {
    src: "/magmo.png",
    alt: "Magmo Logo",
    style: {
      width: "100%",
      maxWidth: "400px",
      // adjust this if needed
      height: "auto",
      objectFit: "contain"
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 129,
      columnNumber: 17
    }
  })), !authReady && __jsx("div", {
    className: "mb-2 small text-muted",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 140,
      columnNumber: 30
    }
  }, "Initializing\u2026"), error && __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Alert"], {
    variant: "danger",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 141,
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
      lineNumber: 143,
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
      lineNumber: 154,
      columnNumber: 17
    }
  }), "Sign in with Google"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "secondary",
    className: "w-100 mt-3",
    onClick: handleTestLogin,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 164,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vY29udGV4dC9GaXJlYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9wYWdlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zdHlsZXMvSG9tZS5tb2R1bGUuY3NzIiwid2VicGFjazovLy9leHRlcm5hbCBcImZpcmViYXNlL2NvbXBhdC9hcHBcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJmaXJlYmFzZS9jb21wYXQvYXV0aFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImZpcmViYXNlL2NvbXBhdC9maXJlc3RvcmVcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJmaXJlYmFzZS9jb21wYXQvc3RvcmFnZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm5leHQvaGVhZFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm5leHQvcm91dGVyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3RcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1ib290c3RyYXBcIiJdLCJuYW1lcyI6WyJGaXJlYmFzZUNyZWRlbnRpYWxzIiwiYXBpS2V5IiwiYXV0aERvbWFpbiIsInByb2plY3RJZCIsInN0b3JhZ2VCdWNrZXQiLCJtZXNzYWdpbmdTZW5kZXJJZCIsImFwcElkIiwibWVhc3VyZW1lbnRJZCIsIkZpcmViYXNlIiwiYXBwcyIsImxlbmd0aCIsImluaXRpYWxpemVBcHAiLCJhdXRoIiwiSG9tZSIsInJvdXRlciIsInVzZVJvdXRlciIsImVycm9yIiwic2V0RXJyb3IiLCJ1c2VTdGF0ZSIsImhhc01vdW50ZWQiLCJzZXRIYXNNb3VudGVkIiwiYXV0aFJlYWR5Iiwic2V0QXV0aFJlYWR5IiwidW5zdWJSZWYiLCJ1c2VSZWYiLCJnZXREZXN0aW5hdGlvbiIsInEiLCJxdWVyeSIsInJlZGlyZWN0IiwiQXJyYXkiLCJpc0FycmF5IiwiaXNJb3NTYWZhcmkiLCJuYXZpZ2F0b3IiLCJ1YSIsInVzZXJBZ2VudCIsImlzSU9TIiwidGVzdCIsImlzU2FmYXJpIiwidXNlRWZmZWN0IiwiZmlyZWJhc2UiLCJzZXRQZXJzaXN0ZW5jZSIsIkF1dGgiLCJQZXJzaXN0ZW5jZSIsIkxPQ0FMIiwibG9jYWxTdG9yYWdlIiwic2V0SXRlbSIsImUiLCJjb25zb2xlIiwid2FybiIsImN1cnJlbnQiLCJvbkF1dGhTdGF0ZUNoYW5nZWQiLCJ1c2VyIiwibG9nIiwiZGVzdCIsInJlcGxhY2UiLCJoYW5kbGVHb29nbGVTaWduSW4iLCJwcm92aWRlciIsIkdvb2dsZUF1dGhQcm92aWRlciIsImFkZFNjb3BlIiwic2V0Q3VzdG9tUGFyYW1ldGVycyIsInByb21wdCIsIkRhdGUiLCJub3ciLCJ0b1N0cmluZyIsIl8iLCJzaWduSW5XaXRoUmVkaXJlY3QiLCJyZXN1bHQiLCJzaWduSW5XaXRoUG9wdXAiLCJlcnIiLCJtZXNzYWdlIiwiU3RyaW5nIiwiaGFuZGxlVGVzdExvZ2luIiwicGFzc3dvcmQiLCJzaWduSW5XaXRoRW1haWxBbmRQYXNzd29yZCIsInN0eWxlcyIsImNvbnRhaW5lciIsIm1pbkhlaWdodCIsIm1heFdpZHRoIiwiZGlzcGxheSIsImp1c3RpZnlDb250ZW50IiwiYWxpZ25JdGVtcyIsIndpZHRoIiwiaGVpZ2h0Iiwib2JqZWN0Rml0IiwiYm9yZGVyIiwiYm9yZGVyUmFkaXVzIiwiY29sb3IiLCJwYWRkaW5nIl0sIm1hcHBpbmdzIjoiOztRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsSUFBSTtRQUNKO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlE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Ozs7O0FDQUEsNEMiLCJmaWxlIjoicGFnZXMvaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHJlcXVpcmUoJy4uL3Nzci1tb2R1bGUtY2FjaGUuanMnKTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0dmFyIHRocmV3ID0gdHJ1ZTtcbiBcdFx0dHJ5IHtcbiBcdFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcbiBcdFx0XHR0aHJldyA9IGZhbHNlO1xuIFx0XHR9IGZpbmFsbHkge1xuIFx0XHRcdGlmKHRocmV3KSBkZWxldGUgaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdH1cblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3BhZ2VzL2luZGV4LmpzXCIpO1xuIiwiLy8gLy8gaW1wb3J0IGZpcmViYXNlIGZyb20gXCJmaXJlYmFzZS9hcHBcIlxuLy8gaW1wb3J0ICogYXMgZmlyZWJhc2UgZnJvbSBcImZpcmViYXNlL2FwcFwiO1xuLy8gLy8gaW1wb3J0IFwiZmlyZWJhc2UvYXV0aFwiXG5cbi8vIGNvbnN0IGFwcCA9IGZpcmViYXNlLmluaXRpYWxpemVBcHAoe1xuLy8gICAgIGFwaUtleTogXCJBSXphU3lDeEMtYThiNVZoaGV5OEdGNDdMcFhaMWFNS1ltaUlod0VcIixcbi8vICAgICBhdXRoRG9tYWluOiBcIm1hZ21vLWFjMTBjLmZpcmViYXNlYXBwLmNvbVwiLFxuLy8gICAgIHByb2plY3RJZDogXCJtYWdtby1hYzEwY1wiLFxuLy8gICAgIHN0b3JhZ2VCdWNrZXQ6IFwibWFnbW8tYWMxMGMuYXBwc3BvdC5jb21cIixcbi8vICAgICBtZXNzYWdpbmdTZW5kZXJJZDogXCIxNzc4NTc1MjUxNDdcIixcbi8vICAgICBhcHBJZDogXCIxOjE3Nzg1NzUyNTE0Nzp3ZWI6YWM4ZTNjODdkODIzOTZiZWIxZGQzZVwiLFxuLy8gICAgIG1lYXN1cmVtZW50SWQ6IFwiRy1MMDIzNkpUNU4zXCJcbi8vIH0pXG5cbi8vIGV4cG9ydCBjb25zdCBhdXRoID0gYXBwLmF1dGgoKVxuLy8gZXhwb3J0IGRlZmF1bHQgYXBwXG5cbi8vIGFwaUtleTogcHJvY2Vzcy5lbnYuUkVBQ1RfQVBQX0ZJUkVCQVNFX0tFWSxcbi8vICAgICBhdXRoRG9tYWluOiBwcm9jZXNzLmVudi5SRUFDVF9BUFBfRklSRUJBU0VfQVVUSF9ET01BSU4sXG4vLyAgICAgcHJvamVjdElkOiBwcm9jZXNzLmVudi5SRUFDVF9BUFBfRklSRUJBU0VfUFJPSkVDVF9JRCxcbi8vICAgICBzdG9yYWdlQnVja2V0OiBwcm9jZXNzLmVudi5SRUFDVF9BUFBfRklSRUJBU0VfU1RPUkFHRV9CVUNLRVQsXG4vLyAgICAgbWVzc2FnaW5nU2VuZGVySWQ6IHByb2Nlc3MuZW52LlJFQUNUX0FQUF9GSVJFQkFTRV9NRVNTQUdJTkdfU0VOREVSX0lELFxuLy8gICAgIGFwcElkOiBwcm9jZXNzLmVudi5SRUFDVF9BUFBfRklSRUJBU0VfQVBQX0lELFxuLy8gICAgIG1lYXN1cmVtZW50SWQ6IHByb2Nlc3MuZW52LlJFQUNUX0FQUF9GSVJFQkFTRV9NRUFTVVJFTUVOVF9JRFxuXG5pbXBvcnQgRmlyZWJhc2UgZnJvbSBcImZpcmViYXNlL2NvbXBhdC9hcHBcIjtcbmltcG9ydCBcImZpcmViYXNlL2NvbXBhdC9hdXRoXCI7XG5pbXBvcnQgXCJmaXJlYmFzZS9jb21wYXQvZmlyZXN0b3JlXCI7XG5pbXBvcnQgXCJmaXJlYmFzZS9jb21wYXQvc3RvcmFnZVwiO1xuXG5jb25zdCBGaXJlYmFzZUNyZWRlbnRpYWxzID0ge1xuICBhcGlLZXk6IFwiQUl6YVN5Q3hDLWE4YjVWaGhleThHRjQ3THBYWjFhTUtZbWlJaHdFXCIsXG4gIGF1dGhEb21haW46IFwibWFnbW8tYWMxMGMuZmlyZWJhc2VhcHAuY29tXCIsXG4gIHByb2plY3RJZDogXCJtYWdtby1hYzEwY1wiLFxuICBzdG9yYWdlQnVja2V0OiBcIm1hZ21vLWFjMTBjLmFwcHNwb3QuY29tXCIsXG4gIG1lc3NhZ2luZ1NlbmRlcklkOiBcIjE3Nzg1NzUyNTE0N1wiLFxuICBhcHBJZDogXCIxOjE3Nzg1NzUyNTE0Nzp3ZWI6YWM4ZTNjODdkODIzOTZiZWIxZGQzZVwiLFxuICBtZWFzdXJlbWVudElkOiBcIkctTDAyMzZKVDVOM1wiLFxufTtcbi8vIGlmIGEgRmlyZWJhc2UgaW5zdGFuY2UgZG9lc24ndCBleGlzdCwgY3JlYXRlIG9uZVxuaWYgKCFGaXJlYmFzZS5hcHBzLmxlbmd0aCkge1xuICBGaXJlYmFzZS5pbml0aWFsaXplQXBwKEZpcmViYXNlQ3JlZGVudGlhbHMpO1xufVxuXG5leHBvcnQgY29uc3QgYXV0aCA9IEZpcmViYXNlLmF1dGgoKTtcbmV4cG9ydCBkZWZhdWx0IEZpcmViYXNlO1xuXG4vLyBpbXBvcnQgeyBpbml0aWFsaXplQXBwIH0gZnJvbSAnZmlyZWJhc2UvYXBwJztcbi8vIGltcG9ydCB7IGdldEZpcmVzdG9yZSwgY29sbGVjdGlvbiwgZ2V0RG9jcyB9IGZyb20gJ2ZpcmViYXNlL2ZpcmVzdG9yZSc7XG5cbi8vIGNvbnN0IGFwcCA9IGluaXRpYWxpemVBcHAoZmlyZWJhc2VDb25maWcpO1xuLy8gY29uc3QgZGIgPSBnZXRGaXJlc3RvcmUoYXBwKTtcblxuLy8gZXhwb3J0IGRlZmF1bHQgYXBwO1xuIiwiLy8gcGFnZXMvaW5kZXguanNcbmltcG9ydCBIZWFkIGZyb20gXCJuZXh0L2hlYWRcIjtcbmltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0LCB1c2VSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IEJ1dHRvbiwgQ2FyZCwgQ29udGFpbmVyLCBBbGVydCB9IGZyb20gXCJyZWFjdC1ib290c3RyYXBcIjtcbmltcG9ydCBzdHlsZXMgZnJvbSBcIi4uL3N0eWxlcy9Ib21lLm1vZHVsZS5jc3NcIjtcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gXCJuZXh0L3JvdXRlclwiO1xuaW1wb3J0IGZpcmViYXNlIGZyb20gXCIuLi9jb250ZXh0L0ZpcmViYXNlXCI7IC8vIGNvbXBhdCBkZWZhdWx0IGV4cG9ydCBPTkxZXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEhvbWUoKSB7XG4gIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpO1xuICBjb25zdCBbZXJyb3IsIHNldEVycm9yXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbaGFzTW91bnRlZCwgc2V0SGFzTW91bnRlZF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFthdXRoUmVhZHksIHNldEF1dGhSZWFkeV0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IHVuc3ViUmVmID0gdXNlUmVmKG51bGwpO1xuXG4gIGNvbnN0IGdldERlc3RpbmF0aW9uID0gKCkgPT4ge1xuICAgIGNvbnN0IHEgPSByb3V0ZXI/LnF1ZXJ5Py5yZWRpcmVjdDtcbiAgICByZXR1cm4gQXJyYXkuaXNBcnJheShxKSA/IHFbMF0gfHwgXCIvTmV3U2VhcmNoL21haW5TZWFyY2hcIiA6IChxIHx8IFwiL05ld1NlYXJjaC9tYWluU2VhcmNoXCIpO1xuICB9O1xuXG4gIGNvbnN0IGlzSW9zU2FmYXJpID0gKCkgPT4ge1xuICAgIGlmICh0eXBlb2YgbmF2aWdhdG9yID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gZmFsc2U7XG4gICAgY29uc3QgdWEgPSBuYXZpZ2F0b3IudXNlckFnZW50O1xuICAgIGNvbnN0IGlzSU9TID0gL2lQKGhvbmV8YWR8b2QpL2kudGVzdCh1YSk7XG4gICAgY29uc3QgaXNTYWZhcmkgPSAvU2FmYXJpL2kudGVzdCh1YSkgJiYgIS9DaHJvbWV8Q3JpT1N8RnhpT1N8RWRnaU9TL2kudGVzdCh1YSk7XG4gICAgcmV0dXJuIGlzSU9TICYmIGlzU2FmYXJpO1xuICB9O1xuXG4gIHVzZUVmZmVjdCgoKSA9PiBzZXRIYXNNb3VudGVkKHRydWUpLCBbXSk7XG5cbiAgLy8gT25lLXRpbWUgYXV0aCBsaXN0ZW5lclxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghaGFzTW91bnRlZCkgcmV0dXJuO1xuICAgIChhc3luYyAoKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBhd2FpdCBmaXJlYmFzZS5hdXRoKCkuc2V0UGVyc2lzdGVuY2UoZmlyZWJhc2UuYXV0aC5BdXRoLlBlcnNpc3RlbmNlLkxPQ0FMKTtcbiAgICAgICAgLy8gc2ltcGxlIHN0b3JhZ2UgcHJvYmUgdG8gZGV0ZWN0IGhvc3RpbGUgZW52aXJvbm1lbnRzXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJfX21hZ21vX3Byb2JlXCIsIFwiMVwiKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIGNvbnNvbGUud2FybihcIlthdXRoXSBsb2NhbFN0b3JhZ2Ugbm90IGF2YWlsYWJsZTsgcmVkaXJlY3RzIG1heSBmYWlsXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdW5zdWJSZWYuY3VycmVudCA9IGZpcmViYXNlLmF1dGgoKS5vbkF1dGhTdGF0ZUNoYW5nZWQoKHVzZXIpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIlthdXRoXSBvbkF1dGhTdGF0ZUNoYW5nZWQ6XCIsIHVzZXIpO1xuICAgICAgICAgIHNldEF1dGhSZWFkeSh0cnVlKTtcbiAgICAgICAgICBpZiAodXNlcikge1xuICAgICAgICAgICAgY29uc3QgZGVzdCA9IGdldERlc3RpbmF0aW9uKCk7XG4gICAgICAgICAgICByb3V0ZXIucmVwbGFjZShkZXN0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiW2F1dGhdIHBlcnNpc3RlbmNlIHNldHVwIGVycm9yOlwiLCBlKTtcbiAgICAgICAgc2V0RXJyb3IoXCJBdXRoZW50aWNhdGlvbiBpbml0IGZhaWxlZC5cIik7XG4gICAgICB9XG4gICAgfSkoKTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBpZiAodW5zdWJSZWYuY3VycmVudCkgdW5zdWJSZWYuY3VycmVudCgpO1xuICAgIH07XG4gIH0sIFtoYXNNb3VudGVkLCByb3V0ZXJdKTtcblxuICBpZiAoIWhhc01vdW50ZWQpIHJldHVybiBudWxsO1xuXG4gIGNvbnN0IGhhbmRsZUdvb2dsZVNpZ25JbiA9IGFzeW5jICgpID0+IHtcbiAgICBzZXRFcnJvcihcIlwiKTtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgZmlyZWJhc2UuYXV0aCgpLnNldFBlcnNpc3RlbmNlKGZpcmViYXNlLmF1dGguQXV0aC5QZXJzaXN0ZW5jZS5MT0NBTCk7XG4gICAgICBjb25zdCBwcm92aWRlciA9IG5ldyBmaXJlYmFzZS5hdXRoLkdvb2dsZUF1dGhQcm92aWRlcigpO1xuICAgICAgcHJvdmlkZXIuYWRkU2NvcGUoXCJlbWFpbFwiKTtcbiAgICAgIHByb3ZpZGVyLmFkZFNjb3BlKFwicHJvZmlsZVwiKTtcbiAgICAgIHByb3ZpZGVyLnNldEN1c3RvbVBhcmFtZXRlcnMoeyBwcm9tcHQ6IFwic2VsZWN0X2FjY291bnRcIiB9KTtcblxuICAgICAgLy8gcHJlZmVyIHBvcHVwIChubyByZWRpcmVjdCBzdGF0ZSksIGZhbGxiYWNrIHRvIHJlZGlyZWN0IG9ubHkgd2hlcmUgbmVlZGVkXG4gICAgICBpZiAoaXNJb3NTYWZhcmkoKSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlthdXRoXSBVc2luZyByZWRpcmVjdCAoaU9TIFNhZmFyaSlcIik7XG4gICAgICAgIC8vIG1hcmsgdGhhdCB3ZSBhdHRlbXB0ZWQgc2lnbi1pbiAodG8gZGV0ZWN0IHN0b3JhZ2UgbG9zcylcbiAgICAgICAgdHJ5IHsgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJfX21hZ21vX3NpZ25pbl9hdHRlbXB0XCIsIERhdGUubm93KCkudG9TdHJpbmcoKSk7IH0gY2F0Y2ggKF8pIHt9XG4gICAgICAgIGF3YWl0IGZpcmViYXNlLmF1dGgoKS5zaWduSW5XaXRoUmVkaXJlY3QocHJvdmlkZXIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJbYXV0aF0gVXNpbmcgcG9wdXBcIik7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGZpcmViYXNlLmF1dGgoKS5zaWduSW5XaXRoUG9wdXAocHJvdmlkZXIpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIlthdXRoXSBwb3B1cCByZXN1bHQ6XCIsIHJlc3VsdCAmJiByZXN1bHQudXNlcik7XG4gICAgICAgIC8vIG9uQXV0aFN0YXRlQ2hhbmdlZCB3aWxsIHJvdXRlOyBidXQgd2UgY2FuIHJvdXRlIGltbWVkaWF0ZWx5IHRvbzpcbiAgICAgICAgaWYgKHJlc3VsdCAmJiByZXN1bHQudXNlcikge1xuICAgICAgICAgIGNvbnN0IGRlc3QgPSBnZXREZXN0aW5hdGlvbigpO1xuICAgICAgICAgIHJvdXRlci5yZXBsYWNlKGRlc3QpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiW2F1dGhdIHNpZ24taW4gZXJyb3I6XCIsIGVycik7XG4gICAgICBzZXRFcnJvcihcIkZhaWxlZCB0byBsb2cgaW4gd2l0aCBHb29nbGU6IFwiICsgKGVyciAmJiBlcnIubWVzc2FnZSA/IGVyci5tZXNzYWdlIDogU3RyaW5nKGVycikpKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlVGVzdExvZ2luID0gYXN5bmMgKCkgPT4ge1xuICAgIHNldEVycm9yKFwiXCIpO1xuICAgIGNvbnN0IHBhc3N3b3JkID0gcHJvbXB0KFwiRW50ZXIgcGFzc3dvcmQ6XCIpO1xuICAgIGlmICghcGFzc3dvcmQpIHJldHVybjtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgZmlyZWJhc2UuYXV0aCgpLnNpZ25JbldpdGhFbWFpbEFuZFBhc3N3b3JkKFwidGVzdEB0ZXN0LmNvbVwiLCBwYXNzd29yZCk7XG4gICAgICByb3V0ZXIucmVwbGFjZShcIi9OZXdTZWFyY2gvc2VhcmNoVGVzdFwiKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHNldEVycm9yKFwiVGVzdCBsb2dpbiBmYWlsZWQ6IFwiICsgKGVyciAmJiBlcnIubWVzc2FnZSA/IGVyci5tZXNzYWdlIDogU3RyaW5nKGVycikpKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmNvbnRhaW5lcn0+XG4gICAgICA8SGVhZD5cbiAgICAgICAgPHRpdGxlPm1hZ21vPC90aXRsZT5cbiAgICAgICAgPGxpbmsgcmVsPVwiaWNvblwiIGhyZWY9XCIvZmF2aWNvbi5pY29cIiAvPlxuICAgICAgICA8bWV0YSBuYW1lPVwidmlld3BvcnRcIiBjb250ZW50PVwid2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEuMFwiIC8+XG4gICAgICA8L0hlYWQ+XG5cbiAgICAgIDxDb250YWluZXIgY2xhc3NOYW1lPVwiZC1mbGV4IGFsaWduLWl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyXCIgc3R5bGU9e3sgbWluSGVpZ2h0OiBcIjEwMHZoXCIgfX0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy0xMDBcIiBzdHlsZT17eyBtYXhXaWR0aDogXCI0MDBweFwiIH19PlxuICAgICAgICAgIDxDYXJkPlxuICAgICAgICAgICAgPENhcmQuQm9keT5cbiAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRleHQtY2VudGVyIG1iLTRcIlxuICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICBkaXNwbGF5OiBcImZsZXhcIixcbiAgICAgICAgICAgICAgICAgIGp1c3RpZnlDb250ZW50OiBcImNlbnRlclwiLFxuICAgICAgICAgICAgICAgICAgYWxpZ25JdGVtczogXCJjZW50ZXJcIixcbiAgICAgICAgICAgICAgICAgIHdpZHRoOiBcIjEwMCVcIixcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICAgICAgc3JjPVwiL21hZ21vLnBuZ1wiXG4gICAgICAgICAgICAgICAgICBhbHQ9XCJNYWdtbyBMb2dvXCJcbiAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiBcIjEwMCVcIixcbiAgICAgICAgICAgICAgICAgICAgbWF4V2lkdGg6IFwiNDAwcHhcIiwgLy8gYWRqdXN0IHRoaXMgaWYgbmVlZGVkXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogXCJhdXRvXCIsXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdEZpdDogXCJjb250YWluXCIsXG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICB7IWF1dGhSZWFkeSAmJiA8ZGl2IGNsYXNzTmFtZT1cIm1iLTIgc21hbGwgdGV4dC1tdXRlZFwiPkluaXRpYWxpemluZ+KApjwvZGl2Pn1cbiAgICAgICAgICAgICAge2Vycm9yICYmIDxBbGVydCB2YXJpYW50PVwiZGFuZ2VyXCI+e2Vycm9yfTwvQWxlcnQ+fVxuXG4gICAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgICB2YXJpYW50PVwibGlnaHRcIlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctMTAwIGQtZmxleCBhbGlnbi1pdGVtcy1jZW50ZXIganVzdGlmeS1jb250ZW50LWNlbnRlclwiXG4gICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlR29vZ2xlU2lnbklufVxuICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICBib3JkZXI6IFwiMXB4IHNvbGlkICNkYWRjZTBcIixcbiAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogXCIwLjM3NXJlbVwiLFxuICAgICAgICAgICAgICAgICAgY29sb3I6IFwiIzc1NzU3NVwiLFxuICAgICAgICAgICAgICAgICAgcGFkZGluZzogXCIwLjVyZW0gMXJlbVwiLFxuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgICAgICBzcmM9XCJodHRwczovL3d3dy5zdmdyZXBvLmNvbS9zaG93LzM1NTAzNy9nb29nbGUuc3ZnXCJcbiAgICAgICAgICAgICAgICAgIGFsdD1cIkdvb2dsZSBsb2dvXCJcbiAgICAgICAgICAgICAgICAgIHdpZHRoPVwiMjBcIlxuICAgICAgICAgICAgICAgICAgaGVpZ2h0PVwiMjBcIlxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibWUtMlwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICBTaWduIGluIHdpdGggR29vZ2xlXG4gICAgICAgICAgICAgIDwvQnV0dG9uPlxuXG4gICAgICAgICAgICAgIDxCdXR0b24gdmFyaWFudD1cInNlY29uZGFyeVwiIGNsYXNzTmFtZT1cInctMTAwIG10LTNcIiBvbkNsaWNrPXtoYW5kbGVUZXN0TG9naW59PlxuICAgICAgICAgICAgICAgIFRlc3QgTG9naW5cbiAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICA8L0NhcmQuQm9keT5cbiAgICAgICAgICA8L0NhcmQ+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9Db250YWluZXI+XG4gICAgPC9kaXY+XG4gICk7XG59XG4iLCIvLyBFeHBvcnRzXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0XCJjb250YWluZXJcIjogXCJIb21lX2NvbnRhaW5lcl9fMUVjc1VcIixcblx0XCJtYWluXCI6IFwiSG9tZV9tYWluX18xeDhnQ1wiLFxuXHRcImZvb3RlclwiOiBcIkhvbWVfZm9vdGVyX18xV2RoRFwiLFxuXHRcImFcIjogXCJIb21lX2FfXzNlYXFmXCIsXG5cdFwidGl0bGVcIjogXCJIb21lX3RpdGxlX18zRGpSN1wiLFxuXHRcImRlc2NyaXB0aW9uXCI6IFwiSG9tZV9kZXNjcmlwdGlvbl9fMTdaNEZcIixcblx0XCJjb2RlXCI6IFwiSG9tZV9jb2RlX19heHgyWVwiLFxuXHRcImdyaWRcIjogXCJIb21lX2dyaWRfXzJFaTJGXCIsXG5cdFwiY2FyZFwiOiBcIkhvbWVfY2FyZF9fMlNkdEJcIixcblx0XCJsb2dvXCI6IFwiSG9tZV9sb2dvX18xWWJySFwiLFxuXHRcInRhYmxlLWNvbnRhaW5lclwiOiBcIkhvbWVfdGFibGUtY29udGFpbmVyX18xZ3hhOVwiLFxuXHRcInRhYmxlXCI6IFwiSG9tZV90YWJsZV9fMWJ6ZlZcIixcblx0XCJhdXRvLWdyb3ctdGV4dGFyZWFcIjogXCJIb21lX2F1dG8tZ3Jvdy10ZXh0YXJlYV9fM01LeXBcIlxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZpcmViYXNlL2NvbXBhdC9hcHBcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZmlyZWJhc2UvY29tcGF0L2F1dGhcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZmlyZWJhc2UvY29tcGF0L2ZpcmVzdG9yZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmaXJlYmFzZS9jb21wYXQvc3RvcmFnZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXh0L2hlYWRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmV4dC9yb3V0ZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3RcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtYm9vdHN0cmFwXCIpOyJdLCJzb3VyY2VSb290IjoiIn0=