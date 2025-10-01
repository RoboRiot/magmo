module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
/******/
/******/ 	// object to store loaded chunks
/******/ 	// "0" means "already loaded"
/******/ 	var installedChunks = {
/******/ 		"pages/NewSearch/AddItem/NewItem": 0
/******/ 	};
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
/******/ 	// uncaught error handler for webpack runtime
/******/ 	__webpack_require__.oe = function(err) {
/******/ 		process.nextTick(function() {
/******/ 			throw err; // catch this error by using import().catch()
/******/ 		});
/******/ 	};
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./pages/NewSearch/AddItem/NewItem.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../next-server/lib/router-context":
/*!**************************************************************!*\
  !*** external "next/dist/next-server/lib/router-context.js" ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next/dist/next-server/lib/router-context.js");

/***/ }),

/***/ "../next-server/lib/router/utils/get-asset-path-from-route":
/*!**************************************************************************************!*\
  !*** external "next/dist/next-server/lib/router/utils/get-asset-path-from-route.js" ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next/dist/next-server/lib/router/utils/get-asset-path-from-route.js");

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
var _jsxFileName = "C:\\Users\\mack2\\Desktop\\code\\context\\AuthUserContext.js";

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
}

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

/***/ "./node_modules/next/dist/client/link.js":
/*!***********************************************!*\
  !*** ./node_modules/next/dist/client/link.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireWildcard.js");

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));

var _router = __webpack_require__(/*! ../next-server/lib/router/router */ "./node_modules/next/dist/next-server/lib/router/router.js");

var _router2 = __webpack_require__(/*! ./router */ "./node_modules/next/dist/client/router.js");

var _useIntersection = __webpack_require__(/*! ./use-intersection */ "./node_modules/next/dist/client/use-intersection.js");

const prefetched = {};

function prefetch(router, href, as, options) {
  if (true) return;
  if (!(0, _router.isLocalURL)(href)) return; // Prefetch the JSON page if asked (only in the client)
  // We need to handle a prefetch error here since we may be
  // loading with priority which can reject but we don't
  // want to force navigation since this is only a prefetch

  router.prefetch(href, as, options).catch(err => {
    if (true) {
      // rethrow to show invalid URL errors
      throw err;
    }
  });
  const curLocale = options && typeof options.locale !== 'undefined' ? options.locale : router && router.locale; // Join on an invalid URI character

  prefetched[href + '%' + as + (curLocale ? '%' + curLocale : '')] = true;
}

function isModifiedEvent(event) {
  const {
    target
  } = event.currentTarget;
  return target && target !== '_self' || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || // triggers resource download
  event.nativeEvent && event.nativeEvent.which === 2;
}

function linkClicked(e, router, href, as, replace, shallow, scroll, locale) {
  const {
    nodeName
  } = e.currentTarget;

  if (nodeName === 'A' && (isModifiedEvent(e) || !(0, _router.isLocalURL)(href))) {
    // ignore click for browser’s default behavior
    return;
  }

  e.preventDefault(); //  avoid scroll for urls with anchor refs

  if (scroll == null) {
    scroll = as.indexOf('#') < 0;
  } // replace state instead of push if prop is present


  router[replace ? 'replace' : 'push'](href, as, {
    shallow,
    locale,
    scroll
  });
}

function Link(props) {
  if (true) {
    function createPropError(args) {
      return new Error(`Failed prop type: The prop \`${args.key}\` expects a ${args.expected} in \`<Link>\`, but got \`${args.actual}\` instead.` + (false ? undefined : ''));
    } // TypeScript trick for type-guarding:


    const requiredPropsGuard = {
      href: true
    };
    const requiredProps = Object.keys(requiredPropsGuard);
    requiredProps.forEach(key => {
      if (key === 'href') {
        if (props[key] == null || typeof props[key] !== 'string' && typeof props[key] !== 'object') {
          throw createPropError({
            key,
            expected: '`string` or `object`',
            actual: props[key] === null ? 'null' : typeof props[key]
          });
        }
      } else {
        // TypeScript trick for type-guarding:
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const _ = key;
      }
    }); // TypeScript trick for type-guarding:

    const optionalPropsGuard = {
      as: true,
      replace: true,
      scroll: true,
      shallow: true,
      passHref: true,
      prefetch: true,
      locale: true
    };
    const optionalProps = Object.keys(optionalPropsGuard);
    optionalProps.forEach(key => {
      const valType = typeof props[key];

      if (key === 'as') {
        if (props[key] && valType !== 'string' && valType !== 'object') {
          throw createPropError({
            key,
            expected: '`string` or `object`',
            actual: valType
          });
        }
      } else if (key === 'locale') {
        if (props[key] && valType !== 'string') {
          throw createPropError({
            key,
            expected: '`string`',
            actual: valType
          });
        }
      } else if (key === 'replace' || key === 'scroll' || key === 'shallow' || key === 'passHref' || key === 'prefetch') {
        if (props[key] != null && valType !== 'boolean') {
          throw createPropError({
            key,
            expected: '`boolean`',
            actual: valType
          });
        }
      } else {
        // TypeScript trick for type-guarding:
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const _ = key;
      }
    }); // This hook is in a conditional but that is ok because `process.env.NODE_ENV` never changes
    // eslint-disable-next-line react-hooks/rules-of-hooks

    const hasWarned = _react.default.useRef(false);

    if (props.prefetch && !hasWarned.current) {
      hasWarned.current = true;
      console.warn('Next.js auto-prefetches automatically based on viewport. The prefetch attribute is no longer needed. More: https://nextjs.org/docs/messages/prefetch-true-deprecated');
    }
  }

  const p = props.prefetch !== false;
  const router = (0, _router2.useRouter)();
  const pathname = router && router.asPath || '/';

  const {
    href,
    as
  } = _react.default.useMemo(() => {
    const [resolvedHref, resolvedAs] = (0, _router.resolveHref)(pathname, props.href, true);
    return {
      href: resolvedHref,
      as: props.as ? (0, _router.resolveHref)(pathname, props.as) : resolvedAs || resolvedHref
    };
  }, [pathname, props.href, props.as]);

  let {
    children,
    replace,
    shallow,
    scroll,
    locale
  } = props; // Deprecated. Warning shown by propType check. If the children provided is a string (<Link>example</Link>) we wrap it in an <a> tag

  if (typeof children === 'string') {
    children = /*#__PURE__*/_react.default.createElement("a", null, children);
  } // This will return the first child, if multiple are provided it will throw an error


  const child = _react.Children.only(children);

  const childRef = child && typeof child === 'object' && child.ref;
  const [setIntersectionRef, isVisible] = (0, _useIntersection.useIntersection)({
    rootMargin: '200px'
  });

  const setRef = _react.default.useCallback(el => {
    setIntersectionRef(el);

    if (childRef) {
      if (typeof childRef === 'function') childRef(el);else if (typeof childRef === 'object') {
        childRef.current = el;
      }
    }
  }, [childRef, setIntersectionRef]);

  (0, _react.useEffect)(() => {
    const shouldPrefetch = isVisible && p && (0, _router.isLocalURL)(href);
    const curLocale = typeof locale !== 'undefined' ? locale : router && router.locale;
    const isPrefetched = prefetched[href + '%' + as + (curLocale ? '%' + curLocale : '')];

    if (shouldPrefetch && !isPrefetched) {
      prefetch(router, href, as, {
        locale: curLocale
      });
    }
  }, [as, href, isVisible, locale, p, router]);
  const childProps = {
    ref: setRef,
    onClick: e => {
      if (child.props && typeof child.props.onClick === 'function') {
        child.props.onClick(e);
      }

      if (!e.defaultPrevented) {
        linkClicked(e, router, href, as, replace, shallow, scroll, locale);
      }
    }
  };

  childProps.onMouseEnter = e => {
    if (!(0, _router.isLocalURL)(href)) return;

    if (child.props && typeof child.props.onMouseEnter === 'function') {
      child.props.onMouseEnter(e);
    }

    prefetch(router, href, as, {
      priority: true
    });
  }; // If child is an <a> tag and doesn't have a href attribute, or if the 'passHref' property is
  // defined, we specify the current 'href', so that repetition is not needed by the user


  if (props.passHref || child.type === 'a' && !('href' in child.props)) {
    const curLocale = typeof locale !== 'undefined' ? locale : router && router.locale; // we only render domain locales if we are currently on a domain locale
    // so that locale links are still visitable in development/preview envs

    const localeDomain = router && router.isLocaleDomain && (0, _router.getDomainLocale)(as, curLocale, router && router.locales, router && router.domainLocales);
    childProps.href = localeDomain || (0, _router.addBasePath)((0, _router.addLocale)(as, curLocale, router && router.defaultLocale));
  }

  return /*#__PURE__*/_react.default.cloneElement(child, childProps);
}

var _default = Link;
exports.default = _default;

/***/ }),

/***/ "./node_modules/next/dist/client/normalize-trailing-slash.js":
/*!*******************************************************************!*\
  !*** ./node_modules/next/dist/client/normalize-trailing-slash.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.removePathTrailingSlash = removePathTrailingSlash;
exports.normalizePathTrailingSlash = void 0;
/**
* Removes the trailing slash of a path if there is one. Preserves the root path `/`.
*/

function removePathTrailingSlash(path) {
  return path.endsWith('/') && path !== '/' ? path.slice(0, -1) : path;
}
/**
* Normalizes the trailing slash of a path according to the `trailingSlash` option
* in `next.config.js`.
*/


const normalizePathTrailingSlash =  false ? undefined : removePathTrailingSlash;
exports.normalizePathTrailingSlash = normalizePathTrailingSlash;

/***/ }),

/***/ "./node_modules/next/dist/client/request-idle-callback.js":
/*!****************************************************************!*\
  !*** ./node_modules/next/dist/client/request-idle-callback.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.cancelIdleCallback = exports.requestIdleCallback = void 0;

const requestIdleCallback = typeof self !== 'undefined' && self.requestIdleCallback || function (cb) {
  let start = Date.now();
  return setTimeout(function () {
    cb({
      didTimeout: false,
      timeRemaining: function () {
        return Math.max(0, 50 - (Date.now() - start));
      }
    });
  }, 1);
};

exports.requestIdleCallback = requestIdleCallback;

const cancelIdleCallback = typeof self !== 'undefined' && self.cancelIdleCallback || function (id) {
  return clearTimeout(id);
};

exports.cancelIdleCallback = cancelIdleCallback;

/***/ }),

/***/ "./node_modules/next/dist/client/route-loader.js":
/*!*******************************************************!*\
  !*** ./node_modules/next/dist/client/route-loader.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

exports.__esModule = true;
exports.markAssetError = markAssetError;
exports.isAssetError = isAssetError;
exports.getClientBuildManifest = getClientBuildManifest;
exports.default = void 0;

var _getAssetPathFromRoute = _interopRequireDefault(__webpack_require__(/*! ../next-server/lib/router/utils/get-asset-path-from-route */ "../next-server/lib/router/utils/get-asset-path-from-route"));

var _requestIdleCallback = __webpack_require__(/*! ./request-idle-callback */ "./node_modules/next/dist/client/request-idle-callback.js"); // 3.8s was arbitrarily chosen as it's what https://web.dev/interactive
// considers as "Good" time-to-interactive. We must assume something went
// wrong beyond this point, and then fall-back to a full page transition to
// show the user something of value.


const MS_MAX_IDLE_DELAY = 3800;

function withFuture(key, map, generator) {
  let entry = map.get(key);

  if (entry) {
    if ('future' in entry) {
      return entry.future;
    }

    return Promise.resolve(entry);
  }

  let resolver;
  const prom = new Promise(resolve => {
    resolver = resolve;
  });
  map.set(key, entry = {
    resolve: resolver,
    future: prom
  });
  return generator ? // eslint-disable-next-line no-sequences
  generator().then(value => (resolver(value), value)) : prom;
}

function hasPrefetch(link) {
  try {
    link = document.createElement('link');
    return (// detect IE11 since it supports prefetch but isn't detected
      // with relList.support
      !!window.MSInputMethodContext && !!document.documentMode || link.relList.supports('prefetch')
    );
  } catch (_unused) {
    return false;
  }
}

const canPrefetch = hasPrefetch();

function prefetchViaDom(href, as, link) {
  return new Promise((res, rej) => {
    if (document.querySelector(`link[rel="prefetch"][href^="${href}"]`)) {
      return res();
    }

    link = document.createElement('link'); // The order of property assignment here is intentional:

    if (as) link.as = as;
    link.rel = `prefetch`;
    link.crossOrigin = undefined;
    link.onload = res;
    link.onerror = rej; // `href` should always be last:

    link.href = href;
    document.head.appendChild(link);
  });
}

const ASSET_LOAD_ERROR = Symbol('ASSET_LOAD_ERROR'); // TODO: unexport

function markAssetError(err) {
  return Object.defineProperty(err, ASSET_LOAD_ERROR, {});
}

function isAssetError(err) {
  return err && ASSET_LOAD_ERROR in err;
}

function appendScript(src, script) {
  return new Promise((resolve, reject) => {
    script = document.createElement('script'); // The order of property assignment here is intentional.
    // 1. Setup success/failure hooks in case the browser synchronously
    //    executes when `src` is set.

    script.onload = resolve;

    script.onerror = () => reject(markAssetError(new Error(`Failed to load script: ${src}`))); // 2. Configure the cross-origin attribute before setting `src` in case the
    //    browser begins to fetch.


    script.crossOrigin = undefined; // 3. Finally, set the source and inject into the DOM in case the child
    //    must be appended for fetching to start.

    script.src = src;
    document.body.appendChild(script);
  });
} // Resolve a promise that times out after given amount of milliseconds.


function resolvePromiseWithTimeout(p, ms, err) {
  return new Promise((resolve, reject) => {
    let cancelled = false;
    p.then(r => {
      // Resolved, cancel the timeout
      cancelled = true;
      resolve(r);
    }).catch(reject);
    (0, _requestIdleCallback.requestIdleCallback)(() => setTimeout(() => {
      if (!cancelled) {
        reject(err);
      }
    }, ms));
  });
} // TODO: stop exporting or cache the failure
// It'd be best to stop exporting this. It's an implementation detail. We're
// only exporting it for backwards compatibilty with the `page-loader`.
// Only cache this response as a last resort if we cannot eliminate all other
// code branches that use the Build Manifest Callback and push them through
// the Route Loader interface.


function getClientBuildManifest() {
  if (self.__BUILD_MANIFEST) {
    return Promise.resolve(self.__BUILD_MANIFEST);
  }

  const onBuildManifest = new Promise(resolve => {
    // Mandatory because this is not concurrent safe:
    const cb = self.__BUILD_MANIFEST_CB;

    self.__BUILD_MANIFEST_CB = () => {
      resolve(self.__BUILD_MANIFEST);
      cb && cb();
    };
  });
  return resolvePromiseWithTimeout(onBuildManifest, MS_MAX_IDLE_DELAY, markAssetError(new Error('Failed to load client build manifest')));
}

function getFilesForRoute(assetPrefix, route) {
  if (true) {
    return Promise.resolve({
      scripts: [assetPrefix + '/_next/static/chunks/pages' + encodeURI((0, _getAssetPathFromRoute.default)(route, '.js'))],
      // Styles are handled by `style-loader` in development:
      css: []
    });
  }

  return getClientBuildManifest().then(manifest => {
    if (!(route in manifest)) {
      throw markAssetError(new Error(`Failed to lookup route: ${route}`));
    }

    const allFiles = manifest[route].map(entry => assetPrefix + '/_next/' + encodeURI(entry));
    return {
      scripts: allFiles.filter(v => v.endsWith('.js')),
      css: allFiles.filter(v => v.endsWith('.css'))
    };
  });
}

function createRouteLoader(assetPrefix) {
  const entrypoints = new Map();
  const loadedScripts = new Map();
  const styleSheets = new Map();
  const routes = new Map();

  function maybeExecuteScript(src) {
    let prom = loadedScripts.get(src);

    if (prom) {
      return prom;
    } // Skip executing script if it's already in the DOM:


    if (document.querySelector(`script[src^="${src}"]`)) {
      return Promise.resolve();
    }

    loadedScripts.set(src, prom = appendScript(src));
    return prom;
  }

  function fetchStyleSheet(href) {
    let prom = styleSheets.get(href);

    if (prom) {
      return prom;
    }

    styleSheets.set(href, prom = fetch(href).then(res => {
      if (!res.ok) {
        throw new Error(`Failed to load stylesheet: ${href}`);
      }

      return res.text().then(text => ({
        href: href,
        content: text
      }));
    }).catch(err => {
      throw markAssetError(err);
    }));
    return prom;
  }

  return {
    whenEntrypoint(route) {
      return withFuture(route, entrypoints);
    },

    onEntrypoint(route, execute) {
      Promise.resolve(execute).then(fn => fn()).then(exports => ({
        component: exports && exports.default || exports,
        exports: exports
      }), err => ({
        error: err
      })).then(input => {
        const old = entrypoints.get(route);
        entrypoints.set(route, input);
        if (old && 'resolve' in old) old.resolve(input);
      });
    },

    loadRoute(route, prefetch) {
      return withFuture(route, routes, () => {
        return resolvePromiseWithTimeout(getFilesForRoute(assetPrefix, route).then(({
          scripts,
          css
        }) => {
          return Promise.all([entrypoints.has(route) ? [] : Promise.all(scripts.map(maybeExecuteScript)), Promise.all(css.map(fetchStyleSheet))]);
        }).then(res => {
          return this.whenEntrypoint(route).then(entrypoint => ({
            entrypoint,
            styles: res[1]
          }));
        }), MS_MAX_IDLE_DELAY, markAssetError(new Error(`Route did not complete loading: ${route}`))).then(({
          entrypoint,
          styles
        }) => {
          const res = Object.assign({
            styles: styles
          }, entrypoint);
          return 'error' in entrypoint ? entrypoint : res;
        }).catch(err => {
          if (prefetch) {
            // we don't want to cache errors during prefetch
            throw err;
          }

          return {
            error: err
          };
        });
      });
    },

    prefetch(route) {
      // https://github.com/GoogleChromeLabs/quicklink/blob/453a661fa1fa940e2d2e044452398e38c67a98fb/src/index.mjs#L115-L118
      // License: Apache 2.0
      let cn;

      if (cn = navigator.connection) {
        // Don't prefetch if using 2G or if Save-Data is enabled.
        if (cn.saveData || /2g/.test(cn.effectiveType)) return Promise.resolve();
      }

      return getFilesForRoute(assetPrefix, route).then(output => Promise.all(canPrefetch ? output.scripts.map(script => prefetchViaDom(script, 'script')) : [])).then(() => {
        (0, _requestIdleCallback.requestIdleCallback)(() => this.loadRoute(route, true).catch(() => {}));
      }).catch( // swallow prefetch errors
      () => {});
    }

  };
}

var _default = createRouteLoader;
exports.default = _default;

/***/ }),

/***/ "./node_modules/next/dist/client/router.js":
/*!*************************************************!*\
  !*** ./node_modules/next/dist/client/router.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireWildcard.js");

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

exports.__esModule = true;
exports.useRouter = useRouter;
exports.makePublicRouterInstance = makePublicRouterInstance;
exports.createRouter = exports.withRouter = exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _router2 = _interopRequireWildcard(__webpack_require__(/*! ../next-server/lib/router/router */ "./node_modules/next/dist/next-server/lib/router/router.js"));

exports.Router = _router2.default;
exports.NextRouter = _router2.NextRouter;

var _routerContext = __webpack_require__(/*! ../next-server/lib/router-context */ "../next-server/lib/router-context");

var _withRouter = _interopRequireDefault(__webpack_require__(/*! ./with-router */ "./node_modules/next/dist/client/with-router.js"));

exports.withRouter = _withRouter.default;
/* global window */

const singletonRouter = {
  router: null,
  // holds the actual router instance
  readyCallbacks: [],

  ready(cb) {
    if (this.router) return cb();

    if (false) {}
  }

}; // Create public properties and methods of the router in the singletonRouter

const urlPropertyFields = ['pathname', 'route', 'query', 'asPath', 'components', 'isFallback', 'basePath', 'locale', 'locales', 'defaultLocale', 'isReady', 'isPreview', 'isLocaleDomain'];
const routerEvents = ['routeChangeStart', 'beforeHistoryChange', 'routeChangeComplete', 'routeChangeError', 'hashChangeStart', 'hashChangeComplete'];
const coreMethodFields = ['push', 'replace', 'reload', 'back', 'prefetch', 'beforePopState']; // Events is a static property on the router, the router doesn't have to be initialized to use it

Object.defineProperty(singletonRouter, 'events', {
  get() {
    return _router2.default.events;
  }

});
urlPropertyFields.forEach(field => {
  // Here we need to use Object.defineProperty because, we need to return
  // the property assigned to the actual router
  // The value might get changed as we change routes and this is the
  // proper way to access it
  Object.defineProperty(singletonRouter, field, {
    get() {
      const router = getRouter();
      return router[field];
    }

  });
});
coreMethodFields.forEach(field => {
  // We don't really know the types here, so we add them later instead
  ;

  singletonRouter[field] = (...args) => {
    const router = getRouter();
    return router[field](...args);
  };
});
routerEvents.forEach(event => {
  singletonRouter.ready(() => {
    _router2.default.events.on(event, (...args) => {
      const eventField = `on${event.charAt(0).toUpperCase()}${event.substring(1)}`;
      const _singletonRouter = singletonRouter;

      if (_singletonRouter[eventField]) {
        try {
          _singletonRouter[eventField](...args);
        } catch (err) {
          console.error(`Error when running the Router event: ${eventField}`);
          console.error(`${err.message}\n${err.stack}`);
        }
      }
    });
  });
});

function getRouter() {
  if (!singletonRouter.router) {
    const message = 'No router instance found.\n' + 'You should only use "next/router" inside the client side of your app.\n';
    throw new Error(message);
  }

  return singletonRouter.router;
} // Export the singletonRouter and this is the public API.


var _default = singletonRouter; // Reexport the withRoute HOC

exports.default = _default;

function useRouter() {
  return _react.default.useContext(_routerContext.RouterContext);
} // INTERNAL APIS
// -------------
// (do not use following exports inside the app)
// Create a router and assign it as the singleton instance.
// This is used in client side when we are initilizing the app.
// This should **not** use inside the server.


const createRouter = (...args) => {
  singletonRouter.router = new _router2.default(...args);
  singletonRouter.readyCallbacks.forEach(cb => cb());
  singletonRouter.readyCallbacks = [];
  return singletonRouter.router;
}; // This function is used to create the `withRouter` router instance


exports.createRouter = createRouter;

function makePublicRouterInstance(router) {
  const _router = router;
  const instance = {};

  for (const property of urlPropertyFields) {
    if (typeof _router[property] === 'object') {
      instance[property] = Object.assign(Array.isArray(_router[property]) ? [] : {}, _router[property]); // makes sure query is not stateful

      continue;
    }

    instance[property] = _router[property];
  } // Events is a static property on the router, the router doesn't have to be initialized to use it


  instance.events = _router2.default.events;
  coreMethodFields.forEach(field => {
    instance[field] = (...args) => {
      return _router[field](...args);
    };
  });
  return instance;
}

/***/ }),

/***/ "./node_modules/next/dist/client/use-intersection.js":
/*!***********************************************************!*\
  !*** ./node_modules/next/dist/client/use-intersection.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.useIntersection = useIntersection;

var _react = __webpack_require__(/*! react */ "react");

var _requestIdleCallback = __webpack_require__(/*! ./request-idle-callback */ "./node_modules/next/dist/client/request-idle-callback.js");

const hasIntersectionObserver = typeof IntersectionObserver !== 'undefined';

function useIntersection({
  rootMargin,
  disabled
}) {
  const isDisabled = disabled || !hasIntersectionObserver;
  const unobserve = (0, _react.useRef)();
  const [visible, setVisible] = (0, _react.useState)(false);
  const setRef = (0, _react.useCallback)(el => {
    if (unobserve.current) {
      unobserve.current();
      unobserve.current = undefined;
    }

    if (isDisabled || visible) return;

    if (el && el.tagName) {
      unobserve.current = observe(el, isVisible => isVisible && setVisible(isVisible), {
        rootMargin
      });
    }
  }, [isDisabled, rootMargin, visible]);
  (0, _react.useEffect)(() => {
    if (!hasIntersectionObserver) {
      if (!visible) {
        const idleCallback = (0, _requestIdleCallback.requestIdleCallback)(() => setVisible(true));
        return () => (0, _requestIdleCallback.cancelIdleCallback)(idleCallback);
      }
    }
  }, [visible]);
  return [setRef, visible];
}

function observe(element, callback, options) {
  const {
    id,
    observer,
    elements
  } = createObserver(options);
  elements.set(element, callback);
  observer.observe(element);
  return function unobserve() {
    elements.delete(element);
    observer.unobserve(element); // Destroy observer when there's nothing left to watch:

    if (elements.size === 0) {
      observer.disconnect();
      observers.delete(id);
    }
  };
}

const observers = new Map();

function createObserver(options) {
  const id = options.rootMargin || '';
  let instance = observers.get(id);

  if (instance) {
    return instance;
  }

  const elements = new Map();
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const callback = elements.get(entry.target);
      const isVisible = entry.isIntersecting || entry.intersectionRatio > 0;

      if (callback && isVisible) {
        callback(isVisible);
      }
    });
  }, options);
  observers.set(id, instance = {
    id,
    observer,
    elements
  });
  return instance;
}

/***/ }),

/***/ "./node_modules/next/dist/client/with-router.js":
/*!******************************************************!*\
  !*** ./node_modules/next/dist/client/with-router.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

exports.__esModule = true;
exports.default = withRouter;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _router = __webpack_require__(/*! ./router */ "./node_modules/next/dist/client/router.js");

function withRouter(ComposedComponent) {
  function WithRouterWrapper(props) {
    return /*#__PURE__*/_react.default.createElement(ComposedComponent, Object.assign({
      router: (0, _router.useRouter)()
    }, props));
  }

  WithRouterWrapper.getInitialProps = ComposedComponent.getInitialProps // This is needed to allow checking for custom getInitialProps in _app
  ;
  WithRouterWrapper.origGetInitialProps = ComposedComponent.origGetInitialProps;

  if (true) {
    const name = ComposedComponent.displayName || ComposedComponent.name || 'Unknown';
    WithRouterWrapper.displayName = `withRouter(${name})`;
  }

  return WithRouterWrapper;
}

/***/ }),

/***/ "./node_modules/next/dist/compiled/path-to-regexp/index.js":
/*!*****************************************!*\
  !*** (webpack)/path-to-regexp/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Tokenize input string.
 */
function lexer(str) {
    var tokens = [];
    var i = 0;
    while (i < str.length) {
        var char = str[i];
        if (char === "*" || char === "+" || char === "?") {
            tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
            continue;
        }
        if (char === "\\") {
            tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
            continue;
        }
        if (char === "{") {
            tokens.push({ type: "OPEN", index: i, value: str[i++] });
            continue;
        }
        if (char === "}") {
            tokens.push({ type: "CLOSE", index: i, value: str[i++] });
            continue;
        }
        if (char === ":") {
            var name = "";
            var j = i + 1;
            while (j < str.length) {
                var code = str.charCodeAt(j);
                if (
                // `0-9`
                (code >= 48 && code <= 57) ||
                    // `A-Z`
                    (code >= 65 && code <= 90) ||
                    // `a-z`
                    (code >= 97 && code <= 122) ||
                    // `_`
                    code === 95) {
                    name += str[j++];
                    continue;
                }
                break;
            }
            if (!name)
                throw new TypeError("Missing parameter name at " + i);
            tokens.push({ type: "NAME", index: i, value: name });
            i = j;
            continue;
        }
        if (char === "(") {
            var count = 1;
            var pattern = "";
            var j = i + 1;
            if (str[j] === "?") {
                throw new TypeError("Pattern cannot start with \"?\" at " + j);
            }
            while (j < str.length) {
                if (str[j] === "\\") {
                    pattern += str[j++] + str[j++];
                    continue;
                }
                if (str[j] === ")") {
                    count--;
                    if (count === 0) {
                        j++;
                        break;
                    }
                }
                else if (str[j] === "(") {
                    count++;
                    if (str[j + 1] !== "?") {
                        throw new TypeError("Capturing groups are not allowed at " + j);
                    }
                }
                pattern += str[j++];
            }
            if (count)
                throw new TypeError("Unbalanced pattern at " + i);
            if (!pattern)
                throw new TypeError("Missing pattern at " + i);
            tokens.push({ type: "PATTERN", index: i, value: pattern });
            i = j;
            continue;
        }
        tokens.push({ type: "CHAR", index: i, value: str[i++] });
    }
    tokens.push({ type: "END", index: i, value: "" });
    return tokens;
}
/**
 * Parse a string for the raw tokens.
 */
function parse(str, options) {
    if (options === void 0) { options = {}; }
    var tokens = lexer(str);
    var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a;
    var defaultPattern = "[^" + escapeString(options.delimiter || "/#?") + "]+?";
    var result = [];
    var key = 0;
    var i = 0;
    var path = "";
    var tryConsume = function (type) {
        if (i < tokens.length && tokens[i].type === type)
            return tokens[i++].value;
    };
    var mustConsume = function (type) {
        var value = tryConsume(type);
        if (value !== undefined)
            return value;
        var _a = tokens[i], nextType = _a.type, index = _a.index;
        throw new TypeError("Unexpected " + nextType + " at " + index + ", expected " + type);
    };
    var consumeText = function () {
        var result = "";
        var value;
        // tslint:disable-next-line
        while ((value = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR"))) {
            result += value;
        }
        return result;
    };
    while (i < tokens.length) {
        var char = tryConsume("CHAR");
        var name = tryConsume("NAME");
        var pattern = tryConsume("PATTERN");
        if (name || pattern) {
            var prefix = char || "";
            if (prefixes.indexOf(prefix) === -1) {
                path += prefix;
                prefix = "";
            }
            if (path) {
                result.push(path);
                path = "";
            }
            result.push({
                name: name || key++,
                prefix: prefix,
                suffix: "",
                pattern: pattern || defaultPattern,
                modifier: tryConsume("MODIFIER") || ""
            });
            continue;
        }
        var value = char || tryConsume("ESCAPED_CHAR");
        if (value) {
            path += value;
            continue;
        }
        if (path) {
            result.push(path);
            path = "";
        }
        var open = tryConsume("OPEN");
        if (open) {
            var prefix = consumeText();
            var name_1 = tryConsume("NAME") || "";
            var pattern_1 = tryConsume("PATTERN") || "";
            var suffix = consumeText();
            mustConsume("CLOSE");
            result.push({
                name: name_1 || (pattern_1 ? key++ : ""),
                pattern: name_1 && !pattern_1 ? defaultPattern : pattern_1,
                prefix: prefix,
                suffix: suffix,
                modifier: tryConsume("MODIFIER") || ""
            });
            continue;
        }
        mustConsume("END");
    }
    return result;
}
exports.parse = parse;
/**
 * Compile a string to a template function for the path.
 */
function compile(str, options) {
    return tokensToFunction(parse(str, options), options);
}
exports.compile = compile;
/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction(tokens, options) {
    if (options === void 0) { options = {}; }
    var reFlags = flags(options);
    var _a = options.encode, encode = _a === void 0 ? function (x) { return x; } : _a, _b = options.validate, validate = _b === void 0 ? true : _b;
    // Compile all the tokens into regexps.
    var matches = tokens.map(function (token) {
        if (typeof token === "object") {
            return new RegExp("^(?:" + token.pattern + ")$", reFlags);
        }
    });
    return function (data) {
        var path = "";
        for (var i = 0; i < tokens.length; i++) {
            var token = tokens[i];
            if (typeof token === "string") {
                path += token;
                continue;
            }
            var value = data ? data[token.name] : undefined;
            var optional = token.modifier === "?" || token.modifier === "*";
            var repeat = token.modifier === "*" || token.modifier === "+";
            if (Array.isArray(value)) {
                if (!repeat) {
                    throw new TypeError("Expected \"" + token.name + "\" to not repeat, but got an array");
                }
                if (value.length === 0) {
                    if (optional)
                        continue;
                    throw new TypeError("Expected \"" + token.name + "\" to not be empty");
                }
                for (var j = 0; j < value.length; j++) {
                    var segment = encode(value[j], token);
                    if (validate && !matches[i].test(segment)) {
                        throw new TypeError("Expected all \"" + token.name + "\" to match \"" + token.pattern + "\", but got \"" + segment + "\"");
                    }
                    path += token.prefix + segment + token.suffix;
                }
                continue;
            }
            if (typeof value === "string" || typeof value === "number") {
                var segment = encode(String(value), token);
                if (validate && !matches[i].test(segment)) {
                    throw new TypeError("Expected \"" + token.name + "\" to match \"" + token.pattern + "\", but got \"" + segment + "\"");
                }
                path += token.prefix + segment + token.suffix;
                continue;
            }
            if (optional)
                continue;
            var typeOfMessage = repeat ? "an array" : "a string";
            throw new TypeError("Expected \"" + token.name + "\" to be " + typeOfMessage);
        }
        return path;
    };
}
exports.tokensToFunction = tokensToFunction;
/**
 * Create path match function from `path-to-regexp` spec.
 */
function match(str, options) {
    var keys = [];
    var re = pathToRegexp(str, keys, options);
    return regexpToFunction(re, keys, options);
}
exports.match = match;
/**
 * Create a path match function from `path-to-regexp` output.
 */
function regexpToFunction(re, keys, options) {
    if (options === void 0) { options = {}; }
    var _a = options.decode, decode = _a === void 0 ? function (x) { return x; } : _a;
    return function (pathname) {
        var m = re.exec(pathname);
        if (!m)
            return false;
        var path = m[0], index = m.index;
        var params = Object.create(null);
        var _loop_1 = function (i) {
            // tslint:disable-next-line
            if (m[i] === undefined)
                return "continue";
            var key = keys[i - 1];
            if (key.modifier === "*" || key.modifier === "+") {
                params[key.name] = m[i].split(key.prefix + key.suffix).map(function (value) {
                    return decode(value, key);
                });
            }
            else {
                params[key.name] = decode(m[i], key);
            }
        };
        for (var i = 1; i < m.length; i++) {
            _loop_1(i);
        }
        return { path: path, index: index, params: params };
    };
}
exports.regexpToFunction = regexpToFunction;
/**
 * Escape a regular expression string.
 */
function escapeString(str) {
    return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
/**
 * Get the flags for a regexp from the options.
 */
function flags(options) {
    return options && options.sensitive ? "" : "i";
}
/**
 * Pull out keys from a regexp.
 */
function regexpToRegexp(path, keys) {
    if (!keys)
        return path;
    // Use a negative lookahead to match only capturing groups.
    var groups = path.source.match(/\((?!\?)/g);
    if (groups) {
        for (var i = 0; i < groups.length; i++) {
            keys.push({
                name: i,
                prefix: "",
                suffix: "",
                modifier: "",
                pattern: ""
            });
        }
    }
    return path;
}
/**
 * Transform an array into a regexp.
 */
function arrayToRegexp(paths, keys, options) {
    var parts = paths.map(function (path) { return pathToRegexp(path, keys, options).source; });
    return new RegExp("(?:" + parts.join("|") + ")", flags(options));
}
/**
 * Create a path regexp from string input.
 */
function stringToRegexp(path, keys, options) {
    return tokensToRegexp(parse(path, options), keys, options);
}
/**
 * Expose a function for taking tokens and returning a RegExp.
 */
function tokensToRegexp(tokens, keys, options) {
    if (options === void 0) { options = {}; }
    var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function (x) { return x; } : _d;
    var endsWith = "[" + escapeString(options.endsWith || "") + "]|$";
    var delimiter = "[" + escapeString(options.delimiter || "/#?") + "]";
    var route = start ? "^" : "";
    // Iterate over the tokens and create our regexp string.
    for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
        var token = tokens_1[_i];
        if (typeof token === "string") {
            route += escapeString(encode(token));
        }
        else {
            var prefix = escapeString(encode(token.prefix));
            var suffix = escapeString(encode(token.suffix));
            if (token.pattern) {
                if (keys)
                    keys.push(token);
                if (prefix || suffix) {
                    if (token.modifier === "+" || token.modifier === "*") {
                        var mod = token.modifier === "*" ? "?" : "";
                        route += "(?:" + prefix + "((?:" + token.pattern + ")(?:" + suffix + prefix + "(?:" + token.pattern + "))*)" + suffix + ")" + mod;
                    }
                    else {
                        route += "(?:" + prefix + "(" + token.pattern + ")" + suffix + ")" + token.modifier;
                    }
                }
                else {
                    route += "(" + token.pattern + ")" + token.modifier;
                }
            }
            else {
                route += "(?:" + prefix + suffix + ")" + token.modifier;
            }
        }
    }
    if (end) {
        if (!strict)
            route += delimiter + "?";
        route += !options.endsWith ? "$" : "(?=" + endsWith + ")";
    }
    else {
        var endToken = tokens[tokens.length - 1];
        var isEndDelimited = typeof endToken === "string"
            ? delimiter.indexOf(endToken[endToken.length - 1]) > -1
            : // tslint:disable-next-line
                endToken === undefined;
        if (!strict) {
            route += "(?:" + delimiter + "(?=" + endsWith + "))?";
        }
        if (!isEndDelimited) {
            route += "(?=" + delimiter + "|" + endsWith + ")";
        }
    }
    return new RegExp(route, flags(options));
}
exports.tokensToRegexp = tokensToRegexp;
/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 */
function pathToRegexp(path, keys, options) {
    if (path instanceof RegExp)
        return regexpToRegexp(path, keys);
    if (Array.isArray(path))
        return arrayToRegexp(path, keys, options);
    return stringToRegexp(path, keys, options);
}
exports.pathToRegexp = pathToRegexp;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/next/dist/next-server/lib/i18n/normalize-locale-path.js":
/*!******************************************************************************!*\
  !*** ./node_modules/next/dist/next-server/lib/i18n/normalize-locale-path.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.normalizeLocalePath = normalizeLocalePath;

function normalizeLocalePath(pathname, locales) {
  let detectedLocale; // first item will be empty string from splitting at first char

  const pathnameParts = pathname.split('/');
  (locales || []).some(locale => {
    if (pathnameParts[1].toLowerCase() === locale.toLowerCase()) {
      detectedLocale = locale;
      pathnameParts.splice(1, 1);
      pathname = pathnameParts.join('/') || '/';
      return true;
    }

    return false;
  });
  return {
    pathname,
    detectedLocale
  };
}

/***/ }),

/***/ "./node_modules/next/dist/next-server/lib/mitt.js":
/*!********************************************************!*\
  !*** ./node_modules/next/dist/next-server/lib/mitt.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = mitt;
/*
MIT License
Copyright (c) Jason Miller (https://jasonformat.com/)
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
// This file is based on https://github.com/developit/mitt/blob/v1.1.3/src/index.js
// It's been edited for the needs of this script
// See the LICENSE at the top of the file

function mitt() {
  const all = Object.create(null);
  return {
    on(type, handler) {
      ;
      (all[type] || (all[type] = [])).push(handler);
    },

    off(type, handler) {
      if (all[type]) {
        all[type].splice(all[type].indexOf(handler) >>> 0, 1);
      }
    },

    emit(type, ...evts) {
      // eslint-disable-next-line array-callback-return
      ;
      (all[type] || []).slice().map(handler => {
        handler(...evts);
      });
    }

  };
}

/***/ }),

/***/ "./node_modules/next/dist/next-server/lib/router/router.js":
/*!*****************************************************************!*\
  !*** ./node_modules/next/dist/next-server/lib/router/router.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.getDomainLocale = getDomainLocale;
exports.addLocale = addLocale;
exports.delLocale = delLocale;
exports.hasBasePath = hasBasePath;
exports.addBasePath = addBasePath;
exports.delBasePath = delBasePath;
exports.isLocalURL = isLocalURL;
exports.interpolateAs = interpolateAs;
exports.resolveHref = resolveHref;
exports.default = void 0;

var _normalizeTrailingSlash = __webpack_require__(/*! ../../../client/normalize-trailing-slash */ "./node_modules/next/dist/client/normalize-trailing-slash.js");

var _routeLoader = __webpack_require__(/*! ../../../client/route-loader */ "./node_modules/next/dist/client/route-loader.js");

var _denormalizePagePath = __webpack_require__(/*! ../../server/denormalize-page-path */ "./node_modules/next/dist/next-server/server/denormalize-page-path.js");

var _normalizeLocalePath = __webpack_require__(/*! ../i18n/normalize-locale-path */ "./node_modules/next/dist/next-server/lib/i18n/normalize-locale-path.js");

var _mitt = _interopRequireDefault(__webpack_require__(/*! ../mitt */ "./node_modules/next/dist/next-server/lib/mitt.js"));

var _utils = __webpack_require__(/*! ../utils */ "./node_modules/next/dist/next-server/lib/utils.js");

var _isDynamic = __webpack_require__(/*! ./utils/is-dynamic */ "./node_modules/next/dist/next-server/lib/router/utils/is-dynamic.js");

var _parseRelativeUrl = __webpack_require__(/*! ./utils/parse-relative-url */ "./node_modules/next/dist/next-server/lib/router/utils/parse-relative-url.js");

var _querystring = __webpack_require__(/*! ./utils/querystring */ "./node_modules/next/dist/next-server/lib/router/utils/querystring.js");

var _resolveRewrites = _interopRequireDefault(__webpack_require__(/*! ./utils/resolve-rewrites */ "./node_modules/next/dist/next-server/lib/router/utils/resolve-rewrites.js"));

var _routeMatcher = __webpack_require__(/*! ./utils/route-matcher */ "./node_modules/next/dist/next-server/lib/router/utils/route-matcher.js");

var _routeRegex = __webpack_require__(/*! ./utils/route-regex */ "./node_modules/next/dist/next-server/lib/router/utils/route-regex.js");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
} // tslint:disable:no-console


let detectDomainLocale;

if (false) {}

const basePath =  false || '';

function buildCancellationError() {
  return Object.assign(new Error('Route Cancelled'), {
    cancelled: true
  });
}

function addPathPrefix(path, prefix) {
  return prefix && path.startsWith('/') ? path === '/' ? (0, _normalizeTrailingSlash.normalizePathTrailingSlash)(prefix) : `${prefix}${pathNoQueryHash(path) === '/' ? path.substring(1) : path}` : path;
}

function getDomainLocale(path, locale, locales, domainLocales) {
  if (false) {}

  return false;
}

function addLocale(path, locale, defaultLocale) {
  if (false) {}

  return path;
}

function delLocale(path, locale) {
  if (false) {}

  return path;
}

function pathNoQueryHash(path) {
  const queryIndex = path.indexOf('?');
  const hashIndex = path.indexOf('#');

  if (queryIndex > -1 || hashIndex > -1) {
    path = path.substring(0, queryIndex > -1 ? queryIndex : hashIndex);
  }

  return path;
}

function hasBasePath(path) {
  path = pathNoQueryHash(path);
  return path === basePath || path.startsWith(basePath + '/');
}

function addBasePath(path) {
  // we only add the basepath on relative urls
  return addPathPrefix(path, basePath);
}

function delBasePath(path) {
  path = path.slice(basePath.length);
  if (!path.startsWith('/')) path = `/${path}`;
  return path;
}
/**
* Detects whether a given url is routable by the Next.js router (browser only).
*/


function isLocalURL(url) {
  // prevent a hydration mismatch on href for url with anchor refs
  if (url.startsWith('/') || url.startsWith('#')) return true;

  try {
    // absolute urls can be local if they are on the same origin
    const locationOrigin = (0, _utils.getLocationOrigin)();
    const resolved = new URL(url, locationOrigin);
    return resolved.origin === locationOrigin && hasBasePath(resolved.pathname);
  } catch (_) {
    return false;
  }
}

function interpolateAs(route, asPathname, query) {
  let interpolatedRoute = '';
  const dynamicRegex = (0, _routeRegex.getRouteRegex)(route);
  const dynamicGroups = dynamicRegex.groups;
  const dynamicMatches = // Try to match the dynamic route against the asPath
  (asPathname !== route ? (0, _routeMatcher.getRouteMatcher)(dynamicRegex)(asPathname) : '') || // Fall back to reading the values from the href
  // TODO: should this take priority; also need to change in the router.
  query;
  interpolatedRoute = route;
  const params = Object.keys(dynamicGroups);

  if (!params.every(param => {
    let value = dynamicMatches[param] || '';
    const {
      repeat,
      optional
    } = dynamicGroups[param]; // support single-level catch-all
    // TODO: more robust handling for user-error (passing `/`)

    let replaced = `[${repeat ? '...' : ''}${param}]`;

    if (optional) {
      replaced = `${!value ? '/' : ''}[${replaced}]`;
    }

    if (repeat && !Array.isArray(value)) value = [value];
    return (optional || param in dynamicMatches) && ( // Interpolate group into data URL if present
    interpolatedRoute = interpolatedRoute.replace(replaced, repeat ? value.map( // these values should be fully encoded instead of just
    // path delimiter escaped since they are being inserted
    // into the URL and we expect URL encoded segments
    // when parsing dynamic route params
    segment => encodeURIComponent(segment)).join('/') : encodeURIComponent(value)) || '/');
  })) {
    interpolatedRoute = ''; // did not satisfy all requirements
    // n.b. We ignore this error because we handle warning for this case in
    // development in the `<Link>` component directly.
  }

  return {
    params,
    result: interpolatedRoute
  };
}

function omitParmsFromQuery(query, params) {
  const filteredQuery = {};
  Object.keys(query).forEach(key => {
    if (!params.includes(key)) {
      filteredQuery[key] = query[key];
    }
  });
  return filteredQuery;
}
/**
* Resolves a given hyperlink with a certain router state (basePath not included).
* Preserves absolute urls.
*/


function resolveHref(currentPath, href, resolveAs) {
  // we use a dummy base url for relative urls
  let base;

  try {
    base = new URL(currentPath, 'http://n');
  } catch (_) {
    // fallback to / for invalid asPath values e.g. //
    base = new URL('/', 'http://n');
  }

  const urlAsString = typeof href === 'string' ? href : (0, _utils.formatWithValidation)(href); // Return because it cannot be routed by the Next.js router

  if (!isLocalURL(urlAsString)) {
    return resolveAs ? [urlAsString] : urlAsString;
  }

  try {
    const finalUrl = new URL(urlAsString, base);
    finalUrl.pathname = (0, _normalizeTrailingSlash.normalizePathTrailingSlash)(finalUrl.pathname);
    let interpolatedAs = '';

    if ((0, _isDynamic.isDynamicRoute)(finalUrl.pathname) && finalUrl.searchParams && resolveAs) {
      const query = (0, _querystring.searchParamsToUrlQuery)(finalUrl.searchParams);
      const {
        result,
        params
      } = interpolateAs(finalUrl.pathname, finalUrl.pathname, query);

      if (result) {
        interpolatedAs = (0, _utils.formatWithValidation)({
          pathname: result,
          hash: finalUrl.hash,
          query: omitParmsFromQuery(query, params)
        });
      }
    } // if the origin didn't change, it means we received a relative href


    const resolvedHref = finalUrl.origin === base.origin ? finalUrl.href.slice(finalUrl.origin.length) : finalUrl.href;
    return resolveAs ? [resolvedHref, interpolatedAs || resolvedHref] : resolvedHref;
  } catch (_) {
    return resolveAs ? [urlAsString] : urlAsString;
  }
}

function stripOrigin(url) {
  const origin = (0, _utils.getLocationOrigin)();
  return url.startsWith(origin) ? url.substring(origin.length) : url;
}

function prepareUrlAs(router, url, as) {
  // If url and as provided as an object representation,
  // we'll format them into the string version here.
  let [resolvedHref, resolvedAs] = resolveHref(router.asPath, url, true);
  const origin = (0, _utils.getLocationOrigin)();
  const hrefHadOrigin = resolvedHref.startsWith(origin);
  const asHadOrigin = resolvedAs && resolvedAs.startsWith(origin);
  resolvedHref = stripOrigin(resolvedHref);
  resolvedAs = resolvedAs ? stripOrigin(resolvedAs) : resolvedAs;
  const preparedUrl = hrefHadOrigin ? resolvedHref : addBasePath(resolvedHref);
  const preparedAs = as ? stripOrigin(resolveHref(router.asPath, as)) : resolvedAs || resolvedHref;
  return {
    url: preparedUrl,
    as: asHadOrigin ? preparedAs : addBasePath(preparedAs)
  };
}

function resolveDynamicRoute(pathname, pages) {
  const cleanPathname = (0, _normalizeTrailingSlash.removePathTrailingSlash)((0, _denormalizePagePath.denormalizePagePath)(pathname));

  if (cleanPathname === '/404' || cleanPathname === '/_error') {
    return pathname;
  } // handle resolving href for dynamic routes


  if (!pages.includes(cleanPathname)) {
    // eslint-disable-next-line array-callback-return
    pages.some(page => {
      if ((0, _isDynamic.isDynamicRoute)(page) && (0, _routeRegex.getRouteRegex)(page).re.test(cleanPathname)) {
        pathname = page;
        return true;
      }
    });
  }

  return (0, _normalizeTrailingSlash.removePathTrailingSlash)(pathname);
}

const manualScrollRestoration =  false && false;
const SSG_DATA_NOT_FOUND = Symbol('SSG_DATA_NOT_FOUND');

function fetchRetry(url, attempts) {
  return fetch(url, {
    // Cookies are required to be present for Next.js' SSG "Preview Mode".
    // Cookies may also be required for `getServerSideProps`.
    //
    // > `fetch` won’t send cookies, unless you set the credentials init
    // > option.
    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    //
    // > For maximum browser compatibility when it comes to sending &
    // > receiving cookies, always supply the `credentials: 'same-origin'`
    // > option instead of relying on the default.
    // https://github.com/github/fetch#caveats
    credentials: 'same-origin'
  }).then(res => {
    if (!res.ok) {
      if (attempts > 1 && res.status >= 500) {
        return fetchRetry(url, attempts - 1);
      }

      if (res.status === 404) {
        return res.json().then(data => {
          if (data.notFound) {
            return {
              notFound: SSG_DATA_NOT_FOUND
            };
          }

          throw new Error(`Failed to load static props`);
        });
      }

      throw new Error(`Failed to load static props`);
    }

    return res.json();
  });
}

function fetchNextData(dataHref, isServerRender) {
  return fetchRetry(dataHref, isServerRender ? 3 : 1).catch(err => {
    // We should only trigger a server-side transition if this was caused
    // on a client-side transition. Otherwise, we'd get into an infinite
    // loop.
    if (!isServerRender) {
      (0, _routeLoader.markAssetError)(err);
    }

    throw err;
  });
}

class Router {
  /**
  * Map of all components loaded in `Router`
  */
  // Static Data Cache
  // In-flight Server Data Requests, for deduping
  constructor(_pathname, _query, _as, {
    initialProps,
    pageLoader,
    App,
    wrapApp,
    Component,
    err,
    subscription,
    isFallback,
    locale,
    locales,
    defaultLocale,
    domainLocales,
    isPreview
  }) {
    this.route = void 0;
    this.pathname = void 0;
    this.query = void 0;
    this.asPath = void 0;
    this.basePath = void 0;
    this.components = void 0;
    this.sdc = {};
    this.sdr = {};
    this.sub = void 0;
    this.clc = void 0;
    this.pageLoader = void 0;
    this._bps = void 0;
    this.events = void 0;
    this._wrapApp = void 0;
    this.isSsr = void 0;
    this.isFallback = void 0;
    this._inFlightRoute = void 0;
    this._shallow = void 0;
    this.locale = void 0;
    this.locales = void 0;
    this.defaultLocale = void 0;
    this.domainLocales = void 0;
    this.isReady = void 0;
    this.isPreview = void 0;
    this.isLocaleDomain = void 0;
    this._idx = 0;

    this.onPopState = e => {
      const state = e.state;

      if (!state) {
        // We get state as undefined for two reasons.
        //  1. With older safari (< 8) and older chrome (< 34)
        //  2. When the URL changed with #
        //
        // In the both cases, we don't need to proceed and change the route.
        // (as it's already changed)
        // But we can simply replace the state with the new changes.
        // Actually, for (1) we don't need to nothing. But it's hard to detect that event.
        // So, doing the following for (1) does no harm.
        const {
          pathname,
          query
        } = this;
        this.changeState('replaceState', (0, _utils.formatWithValidation)({
          pathname: addBasePath(pathname),
          query
        }), (0, _utils.getURL)());
        return;
      }

      if (!state.__N) {
        return;
      }

      let forcedScroll;
      const {
        url,
        as,
        options,
        idx
      } = state;

      if (false) {}

      this._idx = idx;
      const {
        pathname
      } = (0, _parseRelativeUrl.parseRelativeUrl)(url); // Make sure we don't re-render on initial load,
      // can be caused by navigating back from an external site

      if (this.isSsr && as === this.asPath && pathname === this.pathname) {
        return;
      } // If the downstream application returns falsy, return.
      // They will then be responsible for handling the event.


      if (this._bps && !this._bps(state)) {
        return;
      }

      this.change('replaceState', url, as, Object.assign({}, options, {
        shallow: options.shallow && this._shallow,
        locale: options.locale || this.defaultLocale
      }), forcedScroll);
    }; // represents the current component key


    this.route = (0, _normalizeTrailingSlash.removePathTrailingSlash)(_pathname); // set up the component cache (by route keys)

    this.components = {}; // We should not keep the cache, if there's an error
    // Otherwise, this cause issues when when going back and
    // come again to the errored page.

    if (_pathname !== '/_error') {
      this.components[this.route] = {
        Component,
        initial: true,
        props: initialProps,
        err,
        __N_SSG: initialProps && initialProps.__N_SSG,
        __N_SSP: initialProps && initialProps.__N_SSP
      };
    }

    this.components['/_app'] = {
      Component: App,
      styleSheets: [
        /* /_app does not need its stylesheets managed */
      ]
    }; // Backwards compat for Router.router.events
    // TODO: Should be remove the following major version as it was never documented

    this.events = Router.events;
    this.pageLoader = pageLoader;
    this.pathname = _pathname;
    this.query = _query; // if auto prerendered and dynamic route wait to update asPath
    // until after mount to prevent hydration mismatch

    const autoExportDynamic = (0, _isDynamic.isDynamicRoute)(_pathname) && self.__NEXT_DATA__.autoExport;

    this.asPath = autoExportDynamic ? _pathname : _as;
    this.basePath = basePath;
    this.sub = subscription;
    this.clc = null;
    this._wrapApp = wrapApp; // make sure to ignore extra popState in safari on navigating
    // back from external site

    this.isSsr = true;
    this.isFallback = isFallback;
    this.isReady = !!(self.__NEXT_DATA__.gssp || self.__NEXT_DATA__.gip || !autoExportDynamic && !self.location.search && !true);
    this.isPreview = !!isPreview;
    this.isLocaleDomain = false;

    if (false) {}

    if (false) {}
  }

  reload() {
    window.location.reload();
  }
  /**
  * Go back in history
  */


  back() {
    window.history.back();
  }
  /**
  * Performs a `pushState` with arguments
  * @param url of the route
  * @param as masks `url` for the browser
  * @param options object you can define `shallow` and other options
  */


  push(url, as, options = {}) {
    if (false) {}

    ;
    ({
      url,
      as
    } = prepareUrlAs(this, url, as));
    return this.change('pushState', url, as, options);
  }
  /**
  * Performs a `replaceState` with arguments
  * @param url of the route
  * @param as masks `url` for the browser
  * @param options object you can define `shallow` and other options
  */


  replace(url, as, options = {}) {
    ;
    ({
      url,
      as
    } = prepareUrlAs(this, url, as));
    return this.change('replaceState', url, as, options);
  }

  async change(method, url, as, options, forcedScroll) {
    var _options$scroll;

    if (!isLocalURL(url)) {
      window.location.href = url;
      return false;
    }

    const shouldResolveHref = url === as || options._h; // for static pages with query params in the URL we delay
    // marking the router ready until after the query is updated

    if (options._h) {
      this.isReady = true;
    } // Default to scroll reset behavior unless explicitly specified to be
    // `false`! This makes the behavior between using `Router#push` and a
    // `<Link />` consistent.


    options.scroll = !!((_options$scroll = options.scroll) != null ? _options$scroll : true);
    let localeChange = options.locale !== this.locale;

    if (false) { var _this$locales; }

    if (!options._h) {
      this.isSsr = false;
    } // marking route changes as a navigation start entry


    if (_utils.ST) {
      performance.mark('routeChange');
    }

    const {
      shallow = false
    } = options;
    const routeProps = {
      shallow
    };

    if (this._inFlightRoute) {
      this.abortComponentLoad(this._inFlightRoute, routeProps);
    }

    as = addBasePath(addLocale(hasBasePath(as) ? delBasePath(as) : as, options.locale, this.defaultLocale));
    const cleanedAs = delLocale(hasBasePath(as) ? delBasePath(as) : as, this.locale);
    this._inFlightRoute = as; // If the url change is only related to a hash change
    // We should not proceed. We should only change the state.
    // WARNING: `_h` is an internal option for handing Next.js client-side
    // hydration. Your app should _never_ use this property. It may change at
    // any time without notice.

    if (!options._h && this.onlyAHashChange(cleanedAs)) {
      this.asPath = cleanedAs;
      Router.events.emit('hashChangeStart', as, routeProps); // TODO: do we need the resolved href when only a hash change?

      this.changeState(method, url, as, options);
      this.scrollToHash(cleanedAs);
      this.notify(this.components[this.route], null);
      Router.events.emit('hashChangeComplete', as, routeProps);
      return true;
    }

    let parsed = (0, _parseRelativeUrl.parseRelativeUrl)(url);
    let {
      pathname,
      query
    } = parsed; // The build manifest needs to be loaded before auto-static dynamic pages
    // get their query parameters to allow ensuring they can be parsed properly
    // when rewritten to

    let pages, rewrites;

    try {
      pages = await this.pageLoader.getPageList();
      ({
        __rewrites: rewrites
      } = await (0, _routeLoader.getClientBuildManifest)());
    } catch (err) {
      // If we fail to resolve the page list or client-build manifest, we must
      // do a server-side transition:
      window.location.href = as;
      return false;
    } // If asked to change the current URL we should reload the current page
    // (not location.reload() but reload getInitialProps and other Next.js stuffs)
    // We also need to set the method = replaceState always
    // as this should not go into the history (That's how browsers work)
    // We should compare the new asPath to the current asPath, not the url


    if (!this.urlIsNew(cleanedAs) && !localeChange) {
      method = 'replaceState';
    } // we need to resolve the as value using rewrites for dynamic SSG
    // pages to allow building the data URL correctly


    let resolvedAs = as; // url and as should always be prefixed with basePath by this
    // point by either next/link or router.push/replace so strip the
    // basePath from the pathname to match the pages dir 1-to-1

    pathname = pathname ? (0, _normalizeTrailingSlash.removePathTrailingSlash)(delBasePath(pathname)) : pathname;

    if (shouldResolveHref && pathname !== '/_error') {
      if ( true && as.startsWith('/')) {
        const rewritesResult = (0, _resolveRewrites.default)(addBasePath(addLocale(cleanedAs, this.locale)), pages, rewrites, query, p => resolveDynamicRoute(p, pages), this.locales);
        resolvedAs = rewritesResult.asPath;

        if (rewritesResult.matchedPage && rewritesResult.resolvedHref) {
          // if this directly matches a page we need to update the href to
          // allow the correct page chunk to be loaded
          pathname = rewritesResult.resolvedHref;
          parsed.pathname = pathname;
          url = (0, _utils.formatWithValidation)(parsed);
        }
      } else {
        parsed.pathname = resolveDynamicRoute(pathname, pages);

        if (parsed.pathname !== pathname) {
          pathname = parsed.pathname;
          url = (0, _utils.formatWithValidation)(parsed);
        }
      }
    }

    const route = (0, _normalizeTrailingSlash.removePathTrailingSlash)(pathname);

    if (!isLocalURL(as)) {
      if (true) {
        throw new Error(`Invalid href: "${url}" and as: "${as}", received relative href and external as` + `\nSee more info: https://nextjs.org/docs/messages/invalid-relative-url-external-as`);
      }

      window.location.href = as;
      return false;
    }

    resolvedAs = delLocale(delBasePath(resolvedAs), this.locale);

    if ((0, _isDynamic.isDynamicRoute)(route)) {
      const parsedAs = (0, _parseRelativeUrl.parseRelativeUrl)(resolvedAs);
      const asPathname = parsedAs.pathname;
      const routeRegex = (0, _routeRegex.getRouteRegex)(route);
      const routeMatch = (0, _routeMatcher.getRouteMatcher)(routeRegex)(asPathname);
      const shouldInterpolate = route === asPathname;
      const interpolatedAs = shouldInterpolate ? interpolateAs(route, asPathname, query) : {};

      if (!routeMatch || shouldInterpolate && !interpolatedAs.result) {
        const missingParams = Object.keys(routeRegex.groups).filter(param => !query[param]);

        if (missingParams.length > 0) {
          if (true) {
            console.warn(`${shouldInterpolate ? `Interpolating href` : `Mismatching \`as\` and \`href\``} failed to manually provide ` + `the params: ${missingParams.join(', ')} in the \`href\`'s \`query\``);
          }

          throw new Error((shouldInterpolate ? `The provided \`href\` (${url}) value is missing query values (${missingParams.join(', ')}) to be interpolated properly. ` : `The provided \`as\` value (${asPathname}) is incompatible with the \`href\` value (${route}). `) + `Read more: https://nextjs.org/docs/messages/${shouldInterpolate ? 'href-interpolation-failed' : 'incompatible-href-as'}`);
        }
      } else if (shouldInterpolate) {
        as = (0, _utils.formatWithValidation)(Object.assign({}, parsedAs, {
          pathname: interpolatedAs.result,
          query: omitParmsFromQuery(query, interpolatedAs.params)
        }));
      } else {
        // Merge params into `query`, overwriting any specified in search
        Object.assign(query, routeMatch);
      }
    }

    Router.events.emit('routeChangeStart', as, routeProps);

    try {
      var _self$__NEXT_DATA__$p, _self$__NEXT_DATA__$p2;

      let routeInfo = await this.getRouteInfo(route, pathname, query, as, resolvedAs, routeProps);
      let {
        error,
        props,
        __N_SSG,
        __N_SSP
      } = routeInfo; // handle redirect on client-transition

      if ((__N_SSG || __N_SSP) && props) {
        if (props.pageProps && props.pageProps.__N_REDIRECT) {
          const destination = props.pageProps.__N_REDIRECT; // check if destination is internal (resolves to a page) and attempt
          // client-navigation if it is falling back to hard navigation if
          // it's not

          if (destination.startsWith('/')) {
            const parsedHref = (0, _parseRelativeUrl.parseRelativeUrl)(destination);
            parsedHref.pathname = resolveDynamicRoute(parsedHref.pathname, pages);

            if (pages.includes(parsedHref.pathname)) {
              const {
                url: newUrl,
                as: newAs
              } = prepareUrlAs(this, destination, destination);
              return this.change(method, newUrl, newAs, options);
            }
          }

          window.location.href = destination;
          return new Promise(() => {});
        }

        this.isPreview = !!props.__N_PREVIEW; // handle SSG data 404

        if (props.notFound === SSG_DATA_NOT_FOUND) {
          let notFoundRoute;

          try {
            await this.fetchComponent('/404');
            notFoundRoute = '/404';
          } catch (_) {
            notFoundRoute = '/_error';
          }

          routeInfo = await this.getRouteInfo(notFoundRoute, notFoundRoute, query, as, resolvedAs, {
            shallow: false
          });
        }
      }

      Router.events.emit('beforeHistoryChange', as, routeProps);
      this.changeState(method, url, as, options);

      if (true) {
        const appComp = this.components['/_app'].Component;
        window.next.isPrerendered = appComp.getInitialProps === appComp.origGetInitialProps && !routeInfo.Component.getInitialProps;
      } // shallow routing is only allowed for same page URL changes.


      const isValidShallowRoute = options.shallow && this.route === route;

      if (options._h && pathname === '/_error' && ((_self$__NEXT_DATA__$p = self.__NEXT_DATA__.props) == null ? void 0 : (_self$__NEXT_DATA__$p2 = _self$__NEXT_DATA__$p.pageProps) == null ? void 0 : _self$__NEXT_DATA__$p2.statusCode) === 500 && props != null && props.pageProps) {
        // ensure statusCode is still correct for static 500 page
        // when updating query information
        props.pageProps.statusCode = 500;
      }

      await this.set(route, pathname, query, cleanedAs, routeInfo, forcedScroll || (isValidShallowRoute || !options.scroll ? null : {
        x: 0,
        y: 0
      })).catch(e => {
        if (e.cancelled) error = error || e;else throw e;
      });

      if (error) {
        Router.events.emit('routeChangeError', error, cleanedAs, routeProps);
        throw error;
      }

      if (false) {}

      Router.events.emit('routeChangeComplete', as, routeProps);
      return true;
    } catch (err) {
      if (err.cancelled) {
        return false;
      }

      throw err;
    }
  }

  changeState(method, url, as, options = {}) {
    if (true) {
      if (typeof window.history === 'undefined') {
        console.error(`Warning: window.history is not available.`);
        return;
      }

      if (typeof window.history[method] === 'undefined') {
        console.error(`Warning: window.history.${method} is not available`);
        return;
      }
    }

    if (method !== 'pushState' || (0, _utils.getURL)() !== as) {
      this._shallow = options.shallow;
      window.history[method]({
        url,
        as,
        options,
        __N: true,
        idx: this._idx = method !== 'pushState' ? this._idx : this._idx + 1
      }, // Most browsers currently ignores this parameter, although they may use it in the future.
      // Passing the empty string here should be safe against future changes to the method.
      // https://developer.mozilla.org/en-US/docs/Web/API/History/replaceState
      '', as);
    }
  }

  async handleRouteInfoError(err, pathname, query, as, routeProps, loadErrorFail) {
    if (err.cancelled) {
      // bubble up cancellation errors
      throw err;
    }

    if ((0, _routeLoader.isAssetError)(err) || loadErrorFail) {
      Router.events.emit('routeChangeError', err, as, routeProps); // If we can't load the page it could be one of following reasons
      //  1. Page doesn't exists
      //  2. Page does exist in a different zone
      //  3. Internal error while loading the page
      // So, doing a hard reload is the proper way to deal with this.

      window.location.href = as; // Changing the URL doesn't block executing the current code path.
      // So let's throw a cancellation error stop the routing logic.

      throw buildCancellationError();
    }

    try {
      let Component;
      let styleSheets;
      let props;

      if (typeof Component === 'undefined' || typeof styleSheets === 'undefined') {
        ;
        ({
          page: Component,
          styleSheets
        } = await this.fetchComponent('/_error'));
      }

      const routeInfo = {
        props,
        Component,
        styleSheets,
        err,
        error: err
      };

      if (!routeInfo.props) {
        try {
          routeInfo.props = await this.getInitialProps(Component, {
            err,
            pathname,
            query
          });
        } catch (gipErr) {
          console.error('Error in error page `getInitialProps`: ', gipErr);
          routeInfo.props = {};
        }
      }

      return routeInfo;
    } catch (routeInfoErr) {
      return this.handleRouteInfoError(routeInfoErr, pathname, query, as, routeProps, true);
    }
  }

  async getRouteInfo(route, pathname, query, as, resolvedAs, routeProps) {
    try {
      const existingRouteInfo = this.components[route];

      if (routeProps.shallow && existingRouteInfo && this.route === route) {
        return existingRouteInfo;
      }

      const cachedRouteInfo = existingRouteInfo && 'initial' in existingRouteInfo ? undefined : existingRouteInfo;
      const routeInfo = cachedRouteInfo ? cachedRouteInfo : await this.fetchComponent(route).then(res => ({
        Component: res.page,
        styleSheets: res.styleSheets,
        __N_SSG: res.mod.__N_SSG,
        __N_SSP: res.mod.__N_SSP
      }));
      const {
        Component,
        __N_SSG,
        __N_SSP
      } = routeInfo;

      if (true) {
        const {
          isValidElementType
        } = __webpack_require__(/*! react-is */ "react-is");

        if (!isValidElementType(Component)) {
          throw new Error(`The default export is not a React Component in page: "${pathname}"`);
        }
      }

      let dataHref;

      if (__N_SSG || __N_SSP) {
        dataHref = this.pageLoader.getDataHref((0, _utils.formatWithValidation)({
          pathname,
          query
        }), resolvedAs, __N_SSG, this.locale);
      }

      const props = await this._getData(() => __N_SSG ? this._getStaticData(dataHref) : __N_SSP ? this._getServerData(dataHref) : this.getInitialProps(Component, // we provide AppTree later so this needs to be `any`
      {
        pathname,
        query,
        asPath: as,
        locale: this.locale,
        locales: this.locales,
        defaultLocale: this.defaultLocale
      }));
      routeInfo.props = props;
      this.components[route] = routeInfo;
      return routeInfo;
    } catch (err) {
      return this.handleRouteInfoError(err, pathname, query, as, routeProps);
    }
  }

  set(route, pathname, query, as, data, resetScroll) {
    this.isFallback = false;
    this.route = route;
    this.pathname = pathname;
    this.query = query;
    this.asPath = as;
    return this.notify(data, resetScroll);
  }
  /**
  * Callback to execute before replacing router state
  * @param cb callback to be executed
  */


  beforePopState(cb) {
    this._bps = cb;
  }

  onlyAHashChange(as) {
    if (!this.asPath) return false;
    const [oldUrlNoHash, oldHash] = this.asPath.split('#');
    const [newUrlNoHash, newHash] = as.split('#'); // Makes sure we scroll to the provided hash if the url/hash are the same

    if (newHash && oldUrlNoHash === newUrlNoHash && oldHash === newHash) {
      return true;
    } // If the urls are change, there's more than a hash change


    if (oldUrlNoHash !== newUrlNoHash) {
      return false;
    } // If the hash has changed, then it's a hash only change.
    // This check is necessary to handle both the enter and
    // leave hash === '' cases. The identity case falls through
    // and is treated as a next reload.


    return oldHash !== newHash;
  }

  scrollToHash(as) {
    const [, hash] = as.split('#'); // Scroll to top if the hash is just `#` with no value or `#top`
    // To mirror browsers

    if (hash === '' || hash === 'top') {
      window.scrollTo(0, 0);
      return;
    } // First we check if the element by id is found


    const idEl = document.getElementById(hash);

    if (idEl) {
      idEl.scrollIntoView();
      return;
    } // If there's no element with the id, we check the `name` property
    // To mirror browsers


    const nameEl = document.getElementsByName(hash)[0];

    if (nameEl) {
      nameEl.scrollIntoView();
    }
  }

  urlIsNew(asPath) {
    return this.asPath !== asPath;
  }
  /**
  * Prefetch page code, you may wait for the data during page rendering.
  * This feature only works in production!
  * @param url the href of prefetched page
  * @param asPath the as path of the prefetched page
  */


  async prefetch(url, asPath = url, options = {}) {
    let parsed = (0, _parseRelativeUrl.parseRelativeUrl)(url);
    let {
      pathname
    } = parsed;

    if (false) {}

    const pages = await this.pageLoader.getPageList();
    let resolvedAs = asPath;

    if ( true && asPath.startsWith('/')) {
      let rewrites;
      ({
        __rewrites: rewrites
      } = await (0, _routeLoader.getClientBuildManifest)());
      const rewritesResult = (0, _resolveRewrites.default)(addBasePath(addLocale(asPath, this.locale)), pages, rewrites, parsed.query, p => resolveDynamicRoute(p, pages), this.locales);
      resolvedAs = delLocale(delBasePath(rewritesResult.asPath), this.locale);

      if (rewritesResult.matchedPage && rewritesResult.resolvedHref) {
        // if this directly matches a page we need to update the href to
        // allow the correct page chunk to be loaded
        pathname = rewritesResult.resolvedHref;
        parsed.pathname = pathname;
        url = (0, _utils.formatWithValidation)(parsed);
      }
    } else {
      parsed.pathname = resolveDynamicRoute(parsed.pathname, pages);

      if (parsed.pathname !== pathname) {
        pathname = parsed.pathname;
        url = (0, _utils.formatWithValidation)(parsed);
      }
    }

    const route = (0, _normalizeTrailingSlash.removePathTrailingSlash)(pathname); // Prefetch is not supported in development mode because it would trigger on-demand-entries

    if (true) {
      return;
    }

    await Promise.all([this.pageLoader._isSsg(route).then(isSsg => {
      return isSsg ? this._getStaticData(this.pageLoader.getDataHref(url, resolvedAs, true, typeof options.locale !== 'undefined' ? options.locale : this.locale)) : false;
    }), this.pageLoader[options.priority ? 'loadPage' : 'prefetch'](route)]);
  }

  async fetchComponent(route) {
    let cancelled = false;

    const cancel = this.clc = () => {
      cancelled = true;
    };

    const componentResult = await this.pageLoader.loadPage(route);

    if (cancelled) {
      const error = new Error(`Abort fetching component for route: "${route}"`);
      error.cancelled = true;
      throw error;
    }

    if (cancel === this.clc) {
      this.clc = null;
    }

    return componentResult;
  }

  _getData(fn) {
    let cancelled = false;

    const cancel = () => {
      cancelled = true;
    };

    this.clc = cancel;
    return fn().then(data => {
      if (cancel === this.clc) {
        this.clc = null;
      }

      if (cancelled) {
        const err = new Error('Loading initial props cancelled');
        err.cancelled = true;
        throw err;
      }

      return data;
    });
  }

  _getStaticData(dataHref) {
    const {
      href: cacheKey
    } = new URL(dataHref, window.location.href);

    if (false) {}

    return fetchNextData(dataHref, this.isSsr).then(data => {
      this.sdc[cacheKey] = data;
      return data;
    });
  }

  _getServerData(dataHref) {
    const {
      href: resourceKey
    } = new URL(dataHref, window.location.href);

    if (this.sdr[resourceKey]) {
      return this.sdr[resourceKey];
    }

    return this.sdr[resourceKey] = fetchNextData(dataHref, this.isSsr).then(data => {
      delete this.sdr[resourceKey];
      return data;
    }).catch(err => {
      delete this.sdr[resourceKey];
      throw err;
    });
  }

  getInitialProps(Component, ctx) {
    const {
      Component: App
    } = this.components['/_app'];

    const AppTree = this._wrapApp(App);

    ctx.AppTree = AppTree;
    return (0, _utils.loadGetInitialProps)(App, {
      AppTree,
      Component,
      router: this,
      ctx
    });
  }

  abortComponentLoad(as, routeProps) {
    if (this.clc) {
      Router.events.emit('routeChangeError', buildCancellationError(), as, routeProps);
      this.clc();
      this.clc = null;
    }
  }

  notify(data, resetScroll) {
    return this.sub(data, this.components['/_app'].Component, resetScroll);
  }

}

exports.default = Router;
Router.events = (0, _mitt.default)();

/***/ }),

/***/ "./node_modules/next/dist/next-server/lib/router/utils/format-url.js":
/*!***************************************************************************!*\
  !*** ./node_modules/next/dist/next-server/lib/router/utils/format-url.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.formatUrl = formatUrl;

var querystring = _interopRequireWildcard(__webpack_require__(/*! ./querystring */ "./node_modules/next/dist/next-server/lib/router/utils/querystring.js"));

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function () {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
    return {
      default: obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj.default = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
} // Format function modified from nodejs
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.


const slashedProtocols = /https?|ftp|gopher|file/;

function formatUrl(urlObj) {
  let {
    auth,
    hostname
  } = urlObj;
  let protocol = urlObj.protocol || '';
  let pathname = urlObj.pathname || '';
  let hash = urlObj.hash || '';
  let query = urlObj.query || '';
  let host = false;
  auth = auth ? encodeURIComponent(auth).replace(/%3A/i, ':') + '@' : '';

  if (urlObj.host) {
    host = auth + urlObj.host;
  } else if (hostname) {
    host = auth + (~hostname.indexOf(':') ? `[${hostname}]` : hostname);

    if (urlObj.port) {
      host += ':' + urlObj.port;
    }
  }

  if (query && typeof query === 'object') {
    query = String(querystring.urlQueryToSearchParams(query));
  }

  let search = urlObj.search || query && `?${query}` || '';
  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

  if (urlObj.slashes || (!protocol || slashedProtocols.test(protocol)) && host !== false) {
    host = '//' + (host || '');
    if (pathname && pathname[0] !== '/') pathname = '/' + pathname;
  } else if (!host) {
    host = '';
  }

  if (hash && hash[0] !== '#') hash = '#' + hash;
  if (search && search[0] !== '?') search = '?' + search;
  pathname = pathname.replace(/[?#]/g, encodeURIComponent);
  search = search.replace('#', '%23');
  return `${protocol}${host}${pathname}${search}${hash}`;
}

/***/ }),

/***/ "./node_modules/next/dist/next-server/lib/router/utils/is-dynamic.js":
/*!***************************************************************************!*\
  !*** ./node_modules/next/dist/next-server/lib/router/utils/is-dynamic.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.isDynamicRoute = isDynamicRoute; // Identify /[param]/ in route string

const TEST_ROUTE = /\/\[[^/]+?\](?=\/|$)/;

function isDynamicRoute(route) {
  return TEST_ROUTE.test(route);
}

/***/ }),

/***/ "./node_modules/next/dist/next-server/lib/router/utils/parse-relative-url.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/next/dist/next-server/lib/router/utils/parse-relative-url.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.parseRelativeUrl = parseRelativeUrl;

var _utils = __webpack_require__(/*! ../../utils */ "./node_modules/next/dist/next-server/lib/utils.js");

var _querystring = __webpack_require__(/*! ./querystring */ "./node_modules/next/dist/next-server/lib/router/utils/querystring.js");
/**
* Parses path-relative urls (e.g. `/hello/world?foo=bar`). If url isn't path-relative
* (e.g. `./hello`) then at least base must be.
* Absolute urls are rejected with one exception, in the browser, absolute urls that are on
* the current origin will be parsed as relative
*/


function parseRelativeUrl(url, base) {
  const globalBase = new URL(true ? 'http://n' : undefined);
  const resolvedBase = base ? new URL(base, globalBase) : globalBase;
  const {
    pathname,
    searchParams,
    search,
    hash,
    href,
    origin
  } = new URL(url, resolvedBase);

  if (origin !== globalBase.origin) {
    throw new Error(`invariant: invalid relative URL, router received ${url}`);
  }

  return {
    pathname,
    query: (0, _querystring.searchParamsToUrlQuery)(searchParams),
    search,
    hash,
    href: href.slice(globalBase.origin.length)
  };
}

/***/ }),

/***/ "./node_modules/next/dist/next-server/lib/router/utils/path-match.js":
/*!***************************************************************************!*\
  !*** ./node_modules/next/dist/next-server/lib/router/utils/path-match.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

exports.__esModule = true;
exports.pathToRegexp = exports.default = exports.customRouteMatcherOptions = exports.matcherOptions = void 0;

var pathToRegexp = _interopRequireWildcard(__webpack_require__(/*! next/dist/compiled/path-to-regexp */ "./node_modules/next/dist/compiled/path-to-regexp/index.js"));

exports.pathToRegexp = pathToRegexp;

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function () {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
    return {
      default: obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj.default = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

const matcherOptions = {
  sensitive: false,
  delimiter: '/'
};
exports.matcherOptions = matcherOptions;

const customRouteMatcherOptions = _objectSpread(_objectSpread({}, matcherOptions), {}, {
  strict: true
});

exports.customRouteMatcherOptions = customRouteMatcherOptions;

var _default = (customRoute = false) => {
  return path => {
    const keys = [];
    const matcherRegex = pathToRegexp.pathToRegexp(path, keys, customRoute ? customRouteMatcherOptions : matcherOptions);
    const matcher = pathToRegexp.regexpToFunction(matcherRegex, keys);
    return (pathname, params) => {
      const res = pathname == null ? false : matcher(pathname);

      if (!res) {
        return false;
      }

      if (customRoute) {
        for (const key of keys) {
          // unnamed params should be removed as they
          // are not allowed to be used in the destination
          if (typeof key.name === 'number') {
            delete res.params[key.name];
          }
        }
      }

      return _objectSpread(_objectSpread({}, params), res.params);
    };
  };
};

exports.default = _default;

/***/ }),

/***/ "./node_modules/next/dist/next-server/lib/router/utils/prepare-destination.js":
/*!************************************************************************************!*\
  !*** ./node_modules/next/dist/next-server/lib/router/utils/prepare-destination.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

exports.__esModule = true;
exports.matchHas = matchHas;
exports.compileNonPath = compileNonPath;
exports.default = prepareDestination;
exports.getSafeParamName = void 0;

var _querystring = __webpack_require__(/*! ./querystring */ "./node_modules/next/dist/next-server/lib/router/utils/querystring.js");

var _parseRelativeUrl = __webpack_require__(/*! ./parse-relative-url */ "./node_modules/next/dist/next-server/lib/router/utils/parse-relative-url.js");

var pathToRegexp = _interopRequireWildcard(__webpack_require__(/*! next/dist/compiled/path-to-regexp */ "./node_modules/next/dist/compiled/path-to-regexp/index.js"));

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function () {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
    return {
      default: obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj.default = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
} // ensure only a-zA-Z are used for param names for proper interpolating
// with path-to-regexp


const getSafeParamName = paramName => {
  let newParamName = '';

  for (let i = 0; i < paramName.length; i++) {
    const charCode = paramName.charCodeAt(i);

    if (charCode > 64 && charCode < 91 || // A-Z
    charCode > 96 && charCode < 123 // a-z
    ) {
        newParamName += paramName[i];
      }
  }

  return newParamName;
};

exports.getSafeParamName = getSafeParamName;

function matchHas(req, has, query) {
  const params = {};
  const allMatch = has.every(hasItem => {
    let value;
    let key = hasItem.key;

    switch (hasItem.type) {
      case 'header':
        {
          key = key.toLowerCase();
          value = req.headers[key];
          break;
        }

      case 'cookie':
        {
          value = req.cookies[hasItem.key];
          break;
        }

      case 'query':
        {
          value = query[key];
          break;
        }

      case 'host':
        {
          const {
            host
          } = (req == null ? void 0 : req.headers) || {}; // remove port from host if present

          const hostname = host == null ? void 0 : host.split(':')[0].toLowerCase();
          value = hostname;
          break;
        }

      default:
        {
          break;
        }
    }

    if (!hasItem.value && value) {
      params[getSafeParamName(key)] = value;
      return true;
    } else if (value) {
      const matcher = new RegExp(`^${hasItem.value}$`);
      const matches = value.match(matcher);

      if (matches) {
        if (matches.groups) {
          Object.keys(matches.groups).forEach(groupKey => {
            params[groupKey] = matches.groups[groupKey];
          });
        } else if (hasItem.type === 'host' && matches[0]) {
          params.host = matches[0];
        }

        return true;
      }
    }

    return false;
  });

  if (allMatch) {
    return params;
  }

  return false;
}

function compileNonPath(value, params) {
  if (!value.includes(':')) {
    return value;
  }

  for (const key of Object.keys(params)) {
    if (value.includes(`:${key}`)) {
      value = value.replace(new RegExp(`:${key}\\*`, 'g'), `:${key}--ESCAPED_PARAM_ASTERISKS`).replace(new RegExp(`:${key}\\?`, 'g'), `:${key}--ESCAPED_PARAM_QUESTION`).replace(new RegExp(`:${key}\\+`, 'g'), `:${key}--ESCAPED_PARAM_PLUS`).replace(new RegExp(`:${key}(?!\\w)`, 'g'), `--ESCAPED_PARAM_COLON${key}`);
    }
  }

  value = value.replace(/(:|\*|\?|\+|\(|\)|\{|\})/g, '\\$1').replace(/--ESCAPED_PARAM_PLUS/g, '+').replace(/--ESCAPED_PARAM_COLON/g, ':').replace(/--ESCAPED_PARAM_QUESTION/g, '?').replace(/--ESCAPED_PARAM_ASTERISKS/g, '*'); // the value needs to start with a forward-slash to be compiled
  // correctly

  return pathToRegexp.compile(`/${value}`, {
    validate: false
  })(params).substr(1);
}

function prepareDestination(destination, params, query, appendParamsToQuery) {
  let parsedDestination = {}; // clone query so we don't modify the original

  query = Object.assign({}, query);
  const hadLocale = query.__nextLocale;
  delete query.__nextLocale;
  delete query.__nextDefaultLocale;

  if (destination.startsWith('/')) {
    parsedDestination = (0, _parseRelativeUrl.parseRelativeUrl)(destination);
  } else {
    const {
      pathname,
      searchParams,
      hash,
      hostname,
      port,
      protocol,
      search,
      href
    } = new URL(destination);
    parsedDestination = {
      pathname,
      query: (0, _querystring.searchParamsToUrlQuery)(searchParams),
      hash,
      protocol,
      hostname,
      port,
      search,
      href
    };
  }

  const destQuery = parsedDestination.query;
  const destPath = `${parsedDestination.pathname}${parsedDestination.hash || ''}`;
  const destPathParamKeys = [];
  pathToRegexp.pathToRegexp(destPath, destPathParamKeys);
  const destPathParams = destPathParamKeys.map(key => key.name);
  let destinationCompiler = pathToRegexp.compile(destPath, // we don't validate while compiling the destination since we should
  // have already validated before we got to this point and validating
  // breaks compiling destinations with named pattern params from the source
  // e.g. /something:hello(.*) -> /another/:hello is broken with validation
  // since compile validation is meant for reversing and not for inserting
  // params from a separate path-regex into another
  {
    validate: false
  });
  let newUrl; // update any params in query values

  for (const [key, strOrArray] of Object.entries(destQuery)) {
    let value = Array.isArray(strOrArray) ? strOrArray[0] : strOrArray;

    if (value) {
      // the value needs to start with a forward-slash to be compiled
      // correctly
      value = compileNonPath(value, params);
    }

    destQuery[key] = value;
  } // add path params to query if it's not a redirect and not
  // already defined in destination query or path


  let paramKeys = Object.keys(params); // remove internal param for i18n

  if (hadLocale) {
    paramKeys = paramKeys.filter(name => name !== 'nextInternalLocale');
  }

  if (appendParamsToQuery && !paramKeys.some(key => destPathParams.includes(key))) {
    for (const key of paramKeys) {
      if (!(key in destQuery)) {
        destQuery[key] = params[key];
      }
    }
  }

  try {
    newUrl = destinationCompiler(params);
    const [pathname, hash] = newUrl.split('#');
    parsedDestination.pathname = pathname;
    parsedDestination.hash = `${hash ? '#' : ''}${hash || ''}`;
    delete parsedDestination.search;
  } catch (err) {
    if (err.message.match(/Expected .*? to not repeat, but got an array/)) {
      throw new Error(`To use a multi-match in the destination you must add \`*\` at the end of the param name to signify it should repeat. https://nextjs.org/docs/messages/invalid-multi-match`);
    }

    throw err;
  } // Query merge order lowest priority to highest
  // 1. initial URL query values
  // 2. path segment values
  // 3. destination specified query values


  parsedDestination.query = _objectSpread(_objectSpread({}, query), parsedDestination.query);
  return {
    newUrl,
    parsedDestination
  };
}

/***/ }),

/***/ "./node_modules/next/dist/next-server/lib/router/utils/querystring.js":
/*!****************************************************************************!*\
  !*** ./node_modules/next/dist/next-server/lib/router/utils/querystring.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.searchParamsToUrlQuery = searchParamsToUrlQuery;
exports.urlQueryToSearchParams = urlQueryToSearchParams;
exports.assign = assign;

function searchParamsToUrlQuery(searchParams) {
  const query = {};
  searchParams.forEach((value, key) => {
    if (typeof query[key] === 'undefined') {
      query[key] = value;
    } else if (Array.isArray(query[key])) {
      ;
      query[key].push(value);
    } else {
      query[key] = [query[key], value];
    }
  });
  return query;
}

function stringifyUrlQueryParam(param) {
  if (typeof param === 'string' || typeof param === 'number' && !isNaN(param) || typeof param === 'boolean') {
    return String(param);
  } else {
    return '';
  }
}

function urlQueryToSearchParams(urlQuery) {
  const result = new URLSearchParams();
  Object.entries(urlQuery).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach(item => result.append(key, stringifyUrlQueryParam(item)));
    } else {
      result.set(key, stringifyUrlQueryParam(value));
    }
  });
  return result;
}

function assign(target, ...searchParamsList) {
  searchParamsList.forEach(searchParams => {
    Array.from(searchParams.keys()).forEach(key => target.delete(key));
    searchParams.forEach((value, key) => target.append(key, value));
  });
  return target;
}

/***/ }),

/***/ "./node_modules/next/dist/next-server/lib/router/utils/resolve-rewrites.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/next/dist/next-server/lib/router/utils/resolve-rewrites.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = resolveRewrites;

var _pathMatch = _interopRequireDefault(__webpack_require__(/*! ./path-match */ "./node_modules/next/dist/next-server/lib/router/utils/path-match.js"));

var _prepareDestination = _interopRequireWildcard(__webpack_require__(/*! ./prepare-destination */ "./node_modules/next/dist/next-server/lib/router/utils/prepare-destination.js"));

var _normalizeTrailingSlash = __webpack_require__(/*! ../../../../client/normalize-trailing-slash */ "./node_modules/next/dist/client/normalize-trailing-slash.js");

var _normalizeLocalePath = __webpack_require__(/*! ../../i18n/normalize-locale-path */ "./node_modules/next/dist/next-server/lib/i18n/normalize-locale-path.js");

var _parseRelativeUrl = __webpack_require__(/*! ./parse-relative-url */ "./node_modules/next/dist/next-server/lib/router/utils/parse-relative-url.js");

var _router = __webpack_require__(/*! ../router */ "./node_modules/next/dist/next-server/lib/router/router.js");

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function () {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
    return {
      default: obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj.default = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

const customRouteMatcher = (0, _pathMatch.default)(true);

function resolveRewrites(asPath, pages, rewrites, query, resolveHref, locales) {
  let matchedPage = false;
  let parsedAs = (0, _parseRelativeUrl.parseRelativeUrl)(asPath);
  let fsPathname = (0, _normalizeTrailingSlash.removePathTrailingSlash)((0, _normalizeLocalePath.normalizeLocalePath)((0, _router.delBasePath)(parsedAs.pathname), locales).pathname);
  let resolvedHref;

  const handleRewrite = rewrite => {
    const matcher = customRouteMatcher(rewrite.source);
    let params = matcher(parsedAs.pathname);

    if (rewrite.has && params) {
      const hasParams = (0, _prepareDestination.matchHas)({
        headers: {
          host: document.location.hostname
        },
        cookies: document.cookie.split('; ').reduce((acc, item) => {
          const [key, ...value] = item.split('=');
          acc[key] = value.join('=');
          return acc;
        }, {})
      }, rewrite.has, parsedAs.query);

      if (hasParams) {
        Object.assign(params, hasParams);
      } else {
        params = false;
      }
    }

    if (params) {
      if (!rewrite.destination) {
        // this is a proxied rewrite which isn't handled on the client
        return true;
      }

      const destRes = (0, _prepareDestination.default)(rewrite.destination, params, query, true);
      parsedAs = destRes.parsedDestination;
      asPath = destRes.newUrl;
      Object.assign(query, destRes.parsedDestination.query);
      fsPathname = (0, _normalizeTrailingSlash.removePathTrailingSlash)((0, _normalizeLocalePath.normalizeLocalePath)((0, _router.delBasePath)(asPath), locales).pathname);

      if (pages.includes(fsPathname)) {
        // check if we now match a page as this means we are done
        // resolving the rewrites
        matchedPage = true;
        resolvedHref = fsPathname;
        return true;
      } // check if we match a dynamic-route, if so we break the rewrites chain


      resolvedHref = resolveHref(fsPathname);

      if (resolvedHref !== asPath && pages.includes(resolvedHref)) {
        matchedPage = true;
        return true;
      }
    }
  };

  let finished = false;

  for (let i = 0; i < rewrites.beforeFiles.length; i++) {
    // we don't end after match in beforeFiles to allow
    // continuing through all beforeFiles rewrites
    handleRewrite(rewrites.beforeFiles[i]);
  }

  matchedPage = pages.includes(fsPathname);

  if (!matchedPage) {
    if (!finished) {
      for (let i = 0; i < rewrites.afterFiles.length; i++) {
        if (handleRewrite(rewrites.afterFiles[i])) {
          finished = true;
          break;
        }
      }
    } // check dynamic route before processing fallback rewrites


    if (!finished) {
      resolvedHref = resolveHref(fsPathname);
      matchedPage = pages.includes(resolvedHref);
      finished = matchedPage;
    }

    if (!finished) {
      for (let i = 0; i < rewrites.fallback.length; i++) {
        if (handleRewrite(rewrites.fallback[i])) {
          finished = true;
          break;
        }
      }
    }
  }

  return {
    asPath,
    parsedAs,
    matchedPage,
    resolvedHref
  };
}

/***/ }),

/***/ "./node_modules/next/dist/next-server/lib/router/utils/route-matcher.js":
/*!******************************************************************************!*\
  !*** ./node_modules/next/dist/next-server/lib/router/utils/route-matcher.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.getRouteMatcher = getRouteMatcher;

function getRouteMatcher(routeRegex) {
  const {
    re,
    groups
  } = routeRegex;
  return pathname => {
    const routeMatch = re.exec(pathname);

    if (!routeMatch) {
      return false;
    }

    const decode = param => {
      try {
        return decodeURIComponent(param);
      } catch (_) {
        const err = new Error('failed to decode param');
        err.code = 'DECODE_FAILED';
        throw err;
      }
    };

    const params = {};
    Object.keys(groups).forEach(slugName => {
      const g = groups[slugName];
      const m = routeMatch[g.pos];

      if (m !== undefined) {
        params[slugName] = ~m.indexOf('/') ? m.split('/').map(entry => decode(entry)) : g.repeat ? [decode(m)] : decode(m);
      }
    });
    return params;
  };
}

/***/ }),

/***/ "./node_modules/next/dist/next-server/lib/router/utils/route-regex.js":
/*!****************************************************************************!*\
  !*** ./node_modules/next/dist/next-server/lib/router/utils/route-regex.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.getRouteRegex = getRouteRegex; // this isn't importing the escape-string-regex module
// to reduce bytes

function escapeRegex(str) {
  return str.replace(/[|\\{}()[\]^$+*?.-]/g, '\\$&');
}

function parseParameter(param) {
  const optional = param.startsWith('[') && param.endsWith(']');

  if (optional) {
    param = param.slice(1, -1);
  }

  const repeat = param.startsWith('...');

  if (repeat) {
    param = param.slice(3);
  }

  return {
    key: param,
    repeat,
    optional
  };
}

function getRouteRegex(normalizedRoute) {
  const segments = (normalizedRoute.replace(/\/$/, '') || '/').slice(1).split('/');
  const groups = {};
  let groupIndex = 1;
  const parameterizedRoute = segments.map(segment => {
    if (segment.startsWith('[') && segment.endsWith(']')) {
      const {
        key,
        optional,
        repeat
      } = parseParameter(segment.slice(1, -1));
      groups[key] = {
        pos: groupIndex++,
        repeat,
        optional
      };
      return repeat ? optional ? '(?:/(.+?))?' : '/(.+?)' : '/([^/]+?)';
    } else {
      return `/${escapeRegex(segment)}`;
    }
  }).join(''); // dead code eliminate for browser since it's only needed
  // while generating routes-manifest

  if (true) {
    let routeKeyCharCode = 97;
    let routeKeyCharLength = 1; // builds a minimal routeKey using only a-z and minimal number of characters

    const getSafeRouteKey = () => {
      let routeKey = '';

      for (let i = 0; i < routeKeyCharLength; i++) {
        routeKey += String.fromCharCode(routeKeyCharCode);
        routeKeyCharCode++;

        if (routeKeyCharCode > 122) {
          routeKeyCharLength++;
          routeKeyCharCode = 97;
        }
      }

      return routeKey;
    };

    const routeKeys = {};
    let namedParameterizedRoute = segments.map(segment => {
      if (segment.startsWith('[') && segment.endsWith(']')) {
        const {
          key,
          optional,
          repeat
        } = parseParameter(segment.slice(1, -1)); // replace any non-word characters since they can break
        // the named regex

        let cleanedKey = key.replace(/\W/g, '');
        let invalidKey = false; // check if the key is still invalid and fallback to using a known
        // safe key

        if (cleanedKey.length === 0 || cleanedKey.length > 30) {
          invalidKey = true;
        }

        if (!isNaN(parseInt(cleanedKey.substr(0, 1)))) {
          invalidKey = true;
        }

        if (invalidKey) {
          cleanedKey = getSafeRouteKey();
        }

        routeKeys[cleanedKey] = key;
        return repeat ? optional ? `(?:/(?<${cleanedKey}>.+?))?` : `/(?<${cleanedKey}>.+?)` : `/(?<${cleanedKey}>[^/]+?)`;
      } else {
        return `/${escapeRegex(segment)}`;
      }
    }).join('');
    return {
      re: new RegExp(`^${parameterizedRoute}(?:/)?$`),
      groups,
      routeKeys,
      namedRegex: `^${namedParameterizedRoute}(?:/)?$`
    };
  }

  return {
    re: new RegExp(`^${parameterizedRoute}(?:/)?$`),
    groups
  };
}

/***/ }),

/***/ "./node_modules/next/dist/next-server/lib/utils.js":
/*!*********************************************************!*\
  !*** ./node_modules/next/dist/next-server/lib/utils.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.execOnce = execOnce;
exports.getLocationOrigin = getLocationOrigin;
exports.getURL = getURL;
exports.getDisplayName = getDisplayName;
exports.isResSent = isResSent;
exports.loadGetInitialProps = loadGetInitialProps;
exports.formatWithValidation = formatWithValidation;
exports.ST = exports.SP = exports.urlObjectKeys = void 0;

var _formatUrl = __webpack_require__(/*! ./router/utils/format-url */ "./node_modules/next/dist/next-server/lib/router/utils/format-url.js");
/**
* Utils
*/


function execOnce(fn) {
  let used = false;
  let result;
  return (...args) => {
    if (!used) {
      used = true;
      result = fn(...args);
    }

    return result;
  };
}

function getLocationOrigin() {
  const {
    protocol,
    hostname,
    port
  } = window.location;
  return `${protocol}//${hostname}${port ? ':' + port : ''}`;
}

function getURL() {
  const {
    href
  } = window.location;
  const origin = getLocationOrigin();
  return href.substring(origin.length);
}

function getDisplayName(Component) {
  return typeof Component === 'string' ? Component : Component.displayName || Component.name || 'Unknown';
}

function isResSent(res) {
  return res.finished || res.headersSent;
}

async function loadGetInitialProps(App, ctx) {
  if (true) {
    var _App$prototype;

    if ((_App$prototype = App.prototype) != null && _App$prototype.getInitialProps) {
      const message = `"${getDisplayName(App)}.getInitialProps()" is defined as an instance method - visit https://nextjs.org/docs/messages/get-initial-props-as-an-instance-method for more information.`;
      throw new Error(message);
    }
  } // when called from _app `ctx` is nested in `ctx`


  const res = ctx.res || ctx.ctx && ctx.ctx.res;

  if (!App.getInitialProps) {
    if (ctx.ctx && ctx.Component) {
      // @ts-ignore pageProps default
      return {
        pageProps: await loadGetInitialProps(ctx.Component, ctx.ctx)
      };
    }

    return {};
  }

  const props = await App.getInitialProps(ctx);

  if (res && isResSent(res)) {
    return props;
  }

  if (!props) {
    const message = `"${getDisplayName(App)}.getInitialProps()" should resolve to an object. But found "${props}" instead.`;
    throw new Error(message);
  }

  if (true) {
    if (Object.keys(props).length === 0 && !ctx.ctx) {
      console.warn(`${getDisplayName(App)} returned an empty object from \`getInitialProps\`. This de-optimizes and prevents automatic static optimization. https://nextjs.org/docs/messages/empty-object-getInitialProps`);
    }
  }

  return props;
}

const urlObjectKeys = ['auth', 'hash', 'host', 'hostname', 'href', 'path', 'pathname', 'port', 'protocol', 'query', 'search', 'slashes'];
exports.urlObjectKeys = urlObjectKeys;

function formatWithValidation(url) {
  if (true) {
    if (url !== null && typeof url === 'object') {
      Object.keys(url).forEach(key => {
        if (urlObjectKeys.indexOf(key) === -1) {
          console.warn(`Unknown key passed via urlObject into url.format: ${key}`);
        }
      });
    }
  }

  return (0, _formatUrl.formatUrl)(url);
}

const SP = typeof performance !== 'undefined';
exports.SP = SP;
const ST = SP && typeof performance.mark === 'function' && typeof performance.measure === 'function';
exports.ST = ST;

/***/ }),

/***/ "./node_modules/next/dist/next-server/server/denormalize-page-path.js":
/*!****************************************************************************!*\
  !*** ./node_modules/next/dist/next-server/server/denormalize-page-path.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
exports.__esModule=true;exports.normalizePathSep=normalizePathSep;exports.denormalizePagePath=denormalizePagePath;function normalizePathSep(path){return path.replace(/\\/g,'/');}function denormalizePagePath(page){page=normalizePathSep(page);if(page.startsWith('/index/')){page=page.slice(6);}else if(page==='/index'){page='/';}return page;}
//# sourceMappingURL=denormalize-page-path.js.map

/***/ }),

/***/ "./node_modules/next/link.js":
/*!***********************************!*\
  !*** ./node_modules/next/link.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./dist/client/link */ "./node_modules/next/dist/client/link.js")


/***/ }),

/***/ "./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireDefault.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;

/***/ }),

/***/ "./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireWildcard.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireWildcard.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/next/node_modules/@babel/runtime/helpers/typeof.js");

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
    return {
      "default": obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj["default"] = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

module.exports = _interopRequireWildcard;

/***/ }),

/***/ "./node_modules/next/node_modules/@babel/runtime/helpers/typeof.js":
/*!*************************************************************************!*\
  !*** ./node_modules/next/node_modules/@babel/runtime/helpers/typeof.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;

/***/ }),

/***/ "./pages/LoggedIn.js":
/*!***************************!*\
  !*** ./pages/LoggedIn.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/router */ "next/router");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _context_AuthUserContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../context/AuthUserContext */ "./context/AuthUserContext.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-bootstrap */ "react-bootstrap");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__);
var _jsxFileName = "C:\\Users\\mack2\\Desktop\\code\\pages\\LoggedIn.js";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;





const LoggedIn = ({
  children
}) => {
  const {
    authUser,
    loading
  } = Object(_context_AuthUserContext__WEBPACK_IMPORTED_MODULE_2__["useAuth"])();
  const router = Object(next_router__WEBPACK_IMPORTED_MODULE_1__["useRouter"])(); // Redirect only after a short delay if authUser remains null.

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    console.log("=== LOGGEDIN AUTH CHECK ===");
    console.log("loading:", loading);
    console.log("authUser:", authUser);
    console.log("router.asPath:", router.asPath);

    if (!loading && authUser === null) {
      console.log("No auth user, will redirect to login in 800ms"); // Set a delay (e.g. 500ms) to give Firebase Auth a chance to rehydrate.

      const timer = setTimeout(() => {
        console.log("Redirecting to login now");
        router.push(`/?redirect=${encodeURIComponent(router.asPath)}`);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [authUser, loading, router]);

  if (loading) {
    return __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Container"], {
      className: "d-flex align-items-center justify-content-center",
      style: {
        minHeight: "100vh"
      },
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 30,
        columnNumber: 7
      }
    }, __jsx("h3", {
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 34,
        columnNumber: 9
      }
    }, "Loading..."));
  }

  return __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, authUser && children);
};

/* harmony default export */ __webpack_exports__["default"] = (LoggedIn);

/***/ }),

/***/ "./pages/NewSearch/AddItem/NewItem.js":
/*!********************************************!*\
  !*** ./pages/NewSearch/AddItem/NewItem.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NewItem; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var bootstrap_dist_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bootstrap/dist/css/bootstrap.min.css */ "./node_modules/bootstrap/dist/css/bootstrap.min.css");
/* harmony import */ var bootstrap_dist_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bootstrap_dist_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-bootstrap */ "react-bootstrap");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var next_dynamic__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/dynamic */ "next/dynamic");
/* harmony import */ var next_dynamic__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_dynamic__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _context_AuthUserContext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../context/AuthUserContext */ "./context/AuthUserContext.js");
/* harmony import */ var _context_Firebase__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../context/Firebase */ "./context/Firebase.js");
/* harmony import */ var _LoggedIn__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../LoggedIn */ "./pages/LoggedIn.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! next/router */ "next/router");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _utils_fetchAssociations__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../utils/fetchAssociations */ "./utils/fetchAssociations.js");
/* harmony import */ var _utils_ClientTable__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../utils/ClientTable */ "./utils/ClientTable.js");
/* harmony import */ var _ClientInfoModal__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../ClientInfoModal */ "./pages/NewSearch/ClientInfoModal.js");
/* harmony import */ var _parentModal__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./parentModal */ "./pages/NewSearch/AddItem/parentModal.js");
/* harmony import */ var _item_id_MachineSelectionModal__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../item/[id]/MachineSelectionModal */ "./pages/NewSearch/item/[id]/MachineSelectionModal.js");
/* harmony import */ var _InfoModal__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../InfoModal */ "./pages/NewSearch/InfoModal.js");
var _jsxFileName = "C:\\Users\\mack2\\Desktop\\code\\pages\\NewSearch\\AddItem\\NewItem.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }















 // Load BarcodeScannerComponent only on the client-side.

const BarcodeScannerComponent = next_dynamic__WEBPACK_IMPORTED_MODULE_4___default()(() => Promise.resolve(/*! import() */).then(__webpack_require__.t.bind(null, /*! react-qr-barcode-scanner */ "react-qr-barcode-scanner", 7)), {
  ssr: false,
  loadableGenerated: {
    webpack: () => [/*require.resolve*/(/*! react-qr-barcode-scanner */ "react-qr-barcode-scanner")],
    modules: ["NewSearch\\AddItem\\NewItem.js -> " + "react-qr-barcode-scanner"]
  }
}); // Simulate network delay.

function simulateNetworkRequest() {
  return new Promise(resolve => setTimeout(resolve, 2000));
} // Custom LoadingButton component.


function LoadingButton({
  type,
  name,
  route
}) {
  const {
    0: isLoading,
    1: setLoading
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    if (isLoading) {
      simulateNetworkRequest().then(() => setLoading(false));
    }
  }, [isLoading]);

  const handleClick = () => setLoading(true);

  return __jsx(next_link__WEBPACK_IMPORTED_MODULE_3___default.a, {
    href: `/${route}`,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 51,
      columnNumber: 5
    }
  }, __jsx("a", {
    className: `btn btn-${type}`,
    disabled: isLoading,
    onClick: !isLoading ? handleClick : null,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 52,
      columnNumber: 7
    }
  }, isLoading ? "Loading…" : name));
}

function NewItem() {
  var _descriptions$selecte, _descriptions$selecte2;

  const router = Object(next_router__WEBPACK_IMPORTED_MODULE_8__["useRouter"])();
  const {
    signOut
  } = Object(_context_AuthUserContext__WEBPACK_IMPORTED_MODULE_5__["useAuth"])(); // Initialize item state – for a new item, these start empty.
  // We store PN and SN as arrays.

  const {
    0: items,
    1: setItems
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    name: "",
    pn: [""],
    sn: [""],
    // This will be overridden on submit.
    localSN: "",
    // NEW FIELD: holds user input for a local serial number.
    price: "",
    status: "",
    poNumber: "",
    length: "",
    width: "",
    height: "",
    arrival_date: "",
    // NEW FIELD: Arrival Date
    visible: true
  });
  const {
    0: editingPn,
    1: setEditingPn
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(true); // const [newPn, setNewPn] = useState(""); // for the input value when editing

  const {
    0: editingSn,
    1: setEditingSn
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(true); // const [newSn, setNewSn] = useState("");
  // DOM is the Date of Manufacture input (user provided).

  const {
    0: DOM,
    1: setDOM
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(""); // OEM, Modality, Model fields.

  const {
    0: oem,
    1: setOem
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])("");
  const {
    0: modality,
    1: setModality
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])("");
  const {
    0: model,
    1: setModel
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(""); // Local location states.

  const {
    0: localLocFrom,
    1: setLocalLocFrom
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])("");
  const {
    0: localLocCurrent,
    1: setLocalLocCurrent
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(""); // Other states.

  const {
    0: pnOptions,
    1: setPnOptions
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const {
    0: snOptions,
    1: setSnOptions
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const {
    0: descriptions,
    1: setDescriptions
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([{
    description: "",
    date: ""
  }]);
  const {
    0: workOrders,
    1: setWorkOrders
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([{
    workOrder: "",
    date: ""
  }]);
  const {
    0: clients,
    1: setClients
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const {
    0: photos,
    1: setPhotos
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const {
    0: show,
    1: setShow
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false); // error modal for missing required fields

  const {
    0: showErr,
    1: setShowErr
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const {
    0: Err,
    1: setErr
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])("Missing required field: Name and Description");
  const {
    0: showDescModal,
    1: setShowDescModal
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const {
    0: showWoModal,
    1: setShowWoModal
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const {
    0: showClientModal,
    1: setShowClientModal
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const {
    0: showMachineModal,
    1: setShowMachineModal
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const {
    0: showParentModal,
    1: setShowParentModal
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const {
    0: showCameraModal,
    1: setShowCameraModal
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const {
    0: showSaveModal,
    1: setShowSaveModal
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const {
    0: machineSelectionModal,
    1: setMachineSelectionModal
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const {
    0: selectedDesc,
    1: setSelectedDesc
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(0);
  const {
    0: selectedClient,
    1: setSelectedClient
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null);
  const {
    0: selectedMachine,
    1: setSelectedMachine
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null);
  const {
    0: selectedCurrentMachine,
    1: setSelectedCurrentMachine
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null);
  const {
    0: selectedParent,
    1: setSelectedParent
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null);
  const {
    0: TheMachine,
    1: setTheMachine
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null);
  const {
    0: machineOptions,
    1: setMachineOptions
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const {
    0: search,
    1: setSearch
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])("");
  const {
    0: capturedPhoto,
    1: setCapturedPhoto
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null);
  const {
    0: cameraFacing,
    1: setCameraFacing
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])("environment");
  const {
    0: addToWebsite,
    1: setAddToWebsite
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const {
    0: machinePick,
    1: setMachinePick
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const {
    0: freqItem,
    1: setFreqItem
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(0);
  const {
    0: usagePastYear,
    1: setUsagePastYear
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(0);
  const {
    0: machineFrequency,
    1: setMachineFrequency
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(0); // For extra (dimensions/price/DOM) section collapse.

  const {
    0: showExtra,
    1: setShowExtra
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false); // For PN/SN "add new" functionality.

  const {
    0: addingNewPn,
    1: setAddingNewPn
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const {
    0: newPn,
    1: setNewPn
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])("");
  const {
    0: addingNewSn,
    1: setAddingNewSn
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const {
    0: newSn,
    1: setNewSn
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(""); // For browsing photos.

  const browseInputRef = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null); // Inside your NewItem component:

  const {
    0: loading,
    1: setLoading
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);

  if (!router.isReady) {
    return null; // or a loading indicator
  } // -------------------- Since this is "add" mode, we do not fetch an existing document.
  // However, we still fetch global PN and SN options and clients for selection.


  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    async function fetchClientsData() {
      try {
        const clientsData = await Object(_utils_fetchAssociations__WEBPACK_IMPORTED_MODULE_9__["fetchClients"])();
        console.log("Clients:", clientsData);
        setClients(clientsData);
      } catch (error) {
        console.error("Error fetching clients: ", error);
      }
    }

    fetchClientsData();
  }, []);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    async function fetchPnSn() {
      const db = _context_Firebase__WEBPACK_IMPORTED_MODULE_6__["default"].firestore();
      const snapshot = await db.collection("Test").get();
      let pnSet = new Set();
      let snSet = new Set();
      snapshot.forEach(doc => {
        const data = doc.data();
        if (data.pn) pnSet.add(data.pn);
        if (data.sn) snSet.add(data.sn);
      });
      setPnOptions([...pnSet]);
      setSnOptions([...snSet]);
    }

    fetchPnSn();
  }, []);
  const {
    0: machineFieldsInitialized,
    1: setMachineFieldsInitialized
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    if (!machineFieldsInitialized && (TheMachine || selectedCurrentMachine || selectedMachine)) {
      const updatedFields = updateMachineFields(TheMachine, selectedCurrentMachine, selectedMachine); // Only set fields if they are empty or "N/A"

      if (!oem || oem === "N/A") setOem(updatedFields.oem);
      if (!modality || modality === "N/A") setModality(updatedFields.modality);
      if (!model || model === "N/A") setModel(updatedFields.model);
      setMachineFieldsInitialized(true);
    }
  }, [TheMachine, selectedCurrentMachine, selectedMachine, machineFieldsInitialized]);
  const {
    0: signal,
    1: setSignal
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    if (router.isReady) {
      setSignal(router.query.signal || null);
    }
  }, [router.isReady, router.query.signal]); // -------------------- Handlers for PN and SN dropdowns
  // PN: when a user selects an existing PN value.

  const handlePnSelect = e => {
    const selected = e.target.value;
    setItems(prev => {
      let updatedPn = Array.isArray(prev.pn) ? [...prev.pn] : [];
      updatedPn[0] = selected;
      return _objectSpread(_objectSpread({}, prev), {}, {
        pn: updatedPn
      });
    });
  };

  const handlePnChange = (index, value) => {
    setItems(prev => {
      const newPn = [...prev.pn];
      newPn[index] = value;
      return _objectSpread(_objectSpread({}, prev), {}, {
        pn: newPn
      });
    });
  };

  const addPn = () => {
    if (newPn.trim() !== "") {
      setItems(prev => _objectSpread(_objectSpread({}, prev), {}, {
        pn: [...prev.pn, newPn.trim()]
      }));
    }

    setNewPn("");
    setAddingNewPn(false);
  }; // SN: when a user selects an existing SN value.


  const handleSnSelect = e => {
    const selected = e.target.value;
    setItems(prev => {
      let updatedSn = Array.isArray(prev.sn) ? [...prev.sn] : [];
      updatedSn[0] = selected;
      return _objectSpread(_objectSpread({}, prev), {}, {
        sn: updatedSn
      });
    });
  };

  const handleSnChange = (index, value) => {
    setItems(prev => {
      const newSn = [...prev.sn];
      newSn[index] = value;
      return _objectSpread(_objectSpread({}, prev), {}, {
        sn: newSn
      });
    });
  };

  const addSn = () => {
    if (newSn.trim() !== "") {
      setItems(prev => _objectSpread(_objectSpread({}, prev), {}, {
        sn: [...prev.sn, newSn.trim()]
      }));
    }

    setNewSn("");
    setAddingNewSn(false);
  }; // -------------------- Photo Browse Handlers


  const handleBrowsePhotos = () => {
    if (browseInputRef.current) {
      browseInputRef.current.click();
    }
  };

  const handleFilesSelected = e => {
    const files = e.target.files;

    if (files.length) {
      const newPhotos = [];

      for (let i = 0; i < files.length; i++) {
        newPhotos.push({
          file: files[i],
          url: URL.createObjectURL(files[i])
        });
      }

      setPhotos(prevPhotos => [...prevPhotos, ...newPhotos]);
    }

    e.target.value = "";
  }; // -------------------- Photo Capture Handlers remain as in your index.js


  const handleCapture = (err, result) => {
    if (result) {
      setCapturedPhoto(result);
    }
  };

  const capturePhoto = () => {
    const video = document.querySelector("video");
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob(blob => {
      setCapturedPhoto(blob);
    }, "image/png");
  };

  const savePhoto = () => {
    setPhotos(prevPhotos => [...prevPhotos, {
      file: capturedPhoto,
      url: URL.createObjectURL(capturedPhoto)
    }]);
    setCapturedPhoto(null);
    setShowCameraModal(false);
  };

  const removePhoto = index => {
    setPhotos(photos.filter((_, i) => i !== index));
  }; // -------------------- Modal Handlers


  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  const handleCloseErr = () => setShowErr(false);

  const handleShowErr = () => setShowErr(true);

  const handleCloseSaveModal = () => setShowSaveModal(false);

  const handleShowSaveModal = () => setShowSaveModal(true);

  const handleCloseDescModal = () => setShowDescModal(false);

  const handleShowDescModal = () => setShowDescModal(true);

  const handleCloseWoModal = () => setShowWoModal(false);

  const handleShowWoModal = () => setShowWoModal(true);

  const handleCloseClientModal = () => setShowClientModal(false);

  const handleShowClientModal = () => setShowClientModal(true);

  const handleCloseMachineModal = () => setShowMachineModal(false);

  const handleShowMachineModal = () => {
    setShowMachineModal(true);
    setShowClientModal(false);
  };

  const handleCloseParentModal = () => setShowParentModal(false);

  const handleShowParentModal = () => setShowParentModal(true); // -------------------- Work Orders / Descriptions Handlers (unchanged)


  const addDescription = () => {
    setDescriptions([...descriptions, {
      description: "",
      date: ""
    }]);
  };

  const removeDescription = index => {
    setDescriptions(descriptions.filter((_, i) => i !== index));
  };

  const handleDescriptionChange = (index, field, value) => {
    const newDescriptions = descriptions.map((desc, i) => i === index ? _objectSpread(_objectSpread({}, desc), {}, {
      [field]: value
    }) : desc);
    setDescriptions(newDescriptions);
  };

  const addWorkOrder = () => {
    setWorkOrders([...workOrders, {
      workOrder: "",
      date: ""
    }]);
  };

  const removeWorkOrder = index => {
    setWorkOrders(workOrders.filter((_, i) => i !== index));
  };

  const handleWorkOrderChange = (index, field, value) => {
    const newWorkOrders = workOrders.map((wo, i) => i === index ? _objectSpread(_objectSpread({}, wo), {}, {
      [field]: value
    }) : wo);
    setWorkOrders(newWorkOrders);
  };

  const listDescriptions = () => {
    setShowDescModal(true);
  };

  const selectDescription = index => {
    setSelectedDesc(index);
    setShowDescModal(false);
  }; // -------------------- Machine Selection (unchanged)


  const handleClientInfo = async clientId => {
    // Clear any previously selected machine/local loc for the branch
    if (machinePick) {
      setSelectedMachine(null);
      setShowLocalLocFrom(false);
    } else {
      setSelectedCurrentMachine(null);
      setShowLocalLocCurrent(false);
    }

    const db = _context_Firebase__WEBPACK_IMPORTED_MODULE_6__["default"].firestore();
    const clientDoc = await db.collection("Client").doc(clientId).get();

    if (clientDoc.exists) {
      const clientData = clientDoc.data();

      if (machinePick) {
        setSelectedClientFrom(_objectSpread({
          id: clientDoc.id
        }, clientData));
      } else {
        setSelectedClientCurrent(_objectSpread({
          id: clientDoc.id
        }, clientData));
      } // Fetch machines for this client:


      const machinePromises = clientData.machines.map(machineRef => machineRef.get());
      const machineDocs = await Promise.all(machinePromises);
      const machines = machineDocs.map(machineDoc => _objectSpread({
        id: machineDoc.id
      }, machineDoc.data()));
      setMachineOptions(machines);
      handleCloseClientModal();
    }
  };

  const fetchMachine = async machineId => {
    const db = _context_Firebase__WEBPACK_IMPORTED_MODULE_6__["default"].firestore();
    const doc = await db.collection("Machine").doc(machineId).get();

    if (doc.exists) {
      const machineData = doc.data();
      setTheMachine(machineData); // Ensure OEM, Modality, and Model update properly only if necessary

      if (!oem || oem === "N/A") setOem(machineData.oem || machineData.OEM || "");
      if (!modality || modality === "N/A") setModality(machineData.modality || machineData.Modality || "");
      if (!model || model === "N/A") setModel(machineData.model || machineData.Model || ""); // Set machine frequency count

      const machinesSnapshot = await db.collection("Machine").where("Model", "==", machineData.Model || machineData.model).get();
      setMachineFrequency(machinesSnapshot.size);
    } else {
      console.error("Machine not found");
    }
  }; // -------------------- Frequency/Usage (unchanged)


  const calculateItemFrequencyAndUsage = async pn => {
    const db = _context_Firebase__WEBPACK_IMPORTED_MODULE_6__["default"].firestore();
    const currentDate = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(currentDate.getFullYear() - 1);
    const itemsSnapshot = await db.collection("Test").where("pn", "==", pn).get();
    setFreqItem(itemsSnapshot.size);
    let usagePastYear = 0;
    itemsSnapshot.forEach(doc => {
      const itemData = doc.data();
      itemData.workOrders.forEach(workOrder => {
        const workOrderDate = new Date(workOrder.date);

        if (workOrderDate >= oneYearAgo && workOrderDate <= currentDate) {
          usagePastYear++;
        }
      });
    });
    setUsagePastYear(usagePastYear);
  }; // -------------------- Photo Upload (unchanged)


  const uploadPhotos = async docID => {
    const storageRef = _context_Firebase__WEBPACK_IMPORTED_MODULE_6__["default"].storage().ref();

    for (let i = 0; i < photos.length; i++) {
      if (photos[i].file) {
        const photoRef = storageRef.child(`Parts/${docID}/${docID}${i === 0 ? ".jpg" : `.${i + 1}.jpg`}`);
        const metadata = {
          contentType: "image/png"
        };
        await photoRef.put(photos[i].file, metadata);
        const url = await photoRef.getDownloadURL();
        photos[i].url = url;
      }
    }
  }; // -------------------- Submission Handler
  // For NewItem, only require Name and Description.


  async function handleSubmit(event) {
    var _descriptions$;

    event.preventDefault();

    if (!items.name || !((_descriptions$ = descriptions[0]) !== null && _descriptions$ !== void 0 && _descriptions$.description)) {
      handleShow();
    } else {
      setLoading(true); // start loading before async work

      try {
        await toSend();
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // end loading after async work completes
      }
    }
  }

  async function toSend(redirect = true) {
    const {
      id
    } = router.query; // Ensure id is defined (it may be undefined for a new item)

    const db = _context_Firebase__WEBPACK_IMPORTED_MODULE_6__["default"].firestore(); // Get the current authenticated user

    const currentUser = _context_Firebase__WEBPACK_IMPORTED_MODULE_6__["default"].auth().currentUser;
    const userEmail = currentUser ? currentUser.email : "unknown"; // Always use the current state values for OEM, modality, and model.

    const machineData = _objectSpread(_objectSpread({}, TheMachine || {}), {}, {
      oem: oem,
      modality: modality,
      model: model
    });

    const formattedItems = _objectSpread(_objectSpread({}, items), {}, {
      descriptions,
      workOrders
    }); // Remove any unused fields.


    formattedItems.status = items.status || "";
    formattedItems.DOM = DOM; // Date of Manufacture

    formattedItems.localLocFrom = localLocFrom || "";
    formattedItems.localLocCurrent = localLocCurrent || "";
    formattedItems.date = items.date || "";
    formattedItems.arrival_date = items.arrival_date || ""; // NEW: Arrival Date

    formattedItems.poNumber = items.poNumber || "";
    formattedItems.trackingNumber = items.trackingNumber || "";
    formattedItems.TheMachine = machineData || {};
    formattedItems.addedToWebsite = addToWebsite;
    formattedItems.visible = items.visible; // Add the current user's email under the "user" field

    formattedItems.user = userEmail; // Clean pn and sn arrays to replace undefined values with an empty string.

    formattedItems.pn = (items.pn || []).map(value => value === undefined ? "" : value);
    formattedItems.sn = (items.sn || []).map(value => value === undefined ? "" : value); // Set machine references for each branch.

    if (selectedMachine && selectedMachine.id) {
      formattedItems.MachineFrom = db.collection("Machine").doc(selectedMachine.id);
    }

    if (selectedCurrentMachine && selectedCurrentMachine.id) {
      formattedItems.MachineCurrent = db.collection("Machine").doc(selectedCurrentMachine.id);
    } // ***** NEW: Set client references for each branch *****


    if (selectedClientFrom && selectedClientFrom.id) {
      formattedItems.ClientFrom = db.collection("Client").doc(selectedClientFrom.id);
    }

    if (selectedClientCurrent && selectedClientCurrent.id) {
      formattedItems.ClientCurrent = db.collection("Client").doc(selectedClientCurrent.id);
    } // ******************************************************


    if (selectedParent && selectedParent.id) {
      formattedItems.Parent = db.collection("Test").doc(selectedParent.id);
    } // Only add dateCreated if this is a new document


    if (!id) {
      formattedItems.dateCreated = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"
    } // --- LOCAL SN LOGIC ---


    let docId = id || null;

    try {
      if (docId) {
        // Check if a localSN is provided and if it differs from the current docId.
        const newDocId = items.localSN && items.localSN.trim() !== "" ? items.localSN.trim() : docId;

        if (docId !== newDocId) {
          // Migrate: Create a new document with the newDocId.
          await db.collection("Test").doc(newDocId).set(formattedItems);

          if (selectedMachine && selectedMachine.id) {
            const machineRef = db.collection("Machine").doc(selectedMachine.id);
            const machineDoc = await machineRef.get();

            if (machineDoc.exists) {
              await machineRef.update({
                associatedParts: _context_Firebase__WEBPACK_IMPORTED_MODULE_6__["default"].firestore.FieldValue.arrayUnion(db.collection("Test").doc(newDocId))
              });
            }
          }

          if (selectedCurrentMachine && selectedCurrentMachine.id) {
            const currentMachineRef = db.collection("Machine").doc(selectedCurrentMachine.id);
            const currentMachineDoc = await currentMachineRef.get();

            if (currentMachineDoc.exists) {
              await currentMachineRef.update({
                associatedParts: _context_Firebase__WEBPACK_IMPORTED_MODULE_6__["default"].firestore.FieldValue.arrayUnion(db.collection("Test").doc(newDocId))
              });
            }
          } // Delete the old document.


          await db.collection("Test").doc(docId).delete(); // Set docId to the new document ID.

          docId = newDocId;
        } else {
          // Deep-clean the formattedItems to remove any undefined nested values.
          const cleanFormattedItems = shallowClean(formattedItems);
          await db.collection("Test").doc(docId).update(cleanFormattedItems);

          if (selectedMachine && selectedMachine.id) {
            const machineRef = db.collection("Machine").doc(selectedMachine.id);
            const machineDoc = await machineRef.get();

            if (machineDoc.exists) {
              await machineRef.update({
                associatedParts: _context_Firebase__WEBPACK_IMPORTED_MODULE_6__["default"].firestore.FieldValue.arrayUnion(db.collection("Test").doc(docId))
              });
            }
          }

          if (selectedCurrentMachine && selectedCurrentMachine.id) {
            const currentMachineRef = db.collection("Machine").doc(selectedCurrentMachine.id);
            const currentMachineDoc = await currentMachineRef.get();

            if (currentMachineDoc.exists) {
              await currentMachineRef.update({
                associatedParts: _context_Firebase__WEBPACK_IMPORTED_MODULE_6__["default"].firestore.FieldValue.arrayUnion(db.collection("Test").doc(docId))
              });
            }
          }
        }
      } else {
        // For a new item, if localSN is provided, use it; otherwise, generate a custom ID.
        docId = items.localSN && items.localSN.trim() !== "" ? items.localSN.trim() : generateCustomID();
        await db.collection("Test").doc(docId).set(formattedItems);

        if (selectedMachine && selectedMachine.id) {
          const machineRef = db.collection("Machine").doc(selectedMachine.id);
          const machineDoc = await machineRef.get();

          if (machineDoc.exists) {
            await machineRef.update({
              associatedParts: _context_Firebase__WEBPACK_IMPORTED_MODULE_6__["default"].firestore.FieldValue.arrayUnion(db.collection("Test").doc(docId))
            });
          }
        }

        if (selectedCurrentMachine && selectedCurrentMachine.id) {
          const currentMachineRef = db.collection("Machine").doc(selectedCurrentMachine.id);
          const currentMachineDoc = await currentMachineRef.get();

          if (currentMachineDoc.exists) {
            await currentMachineRef.update({
              associatedParts: _context_Firebase__WEBPACK_IMPORTED_MODULE_6__["default"].firestore.FieldValue.arrayUnion(db.collection("Test").doc(docId))
            });
          }
        }
      } // Upload any new photos to Firebase Storage.


      await uploadPhotos(docId);
      console.log("Item saved and associatedParts updated!"); // Redirect to the new URL using the new document id.

      if (redirect) {
        router.push(`/NewSearch/item/${docId}`);
      } else {
        setRedirect(true);
      } // Optionally, show a save confirmation modal.


      handleShowSaveModal();
    } catch (error) {
      console.error("Error saving data:", error);
    }
  } // -------------------- Info Modal Handlers (unchanged)


  const {
    0: showInfoModal,
    1: setShowInfoModal
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const {
    0: itemName,
    1: setItemName
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])("");

  const handleShowInfoModal = async () => {
    const db = _context_Firebase__WEBPACK_IMPORTED_MODULE_6__["default"].firestore();

    try {
      const doc = await db.collection("Test").doc(id).get();

      if (doc.exists) {
        const data = doc.data();
        setItemName(data.name || "N/A");
        setShowInfoModal(true);
      } else {
        console.error("Item not found");
      }
    } catch (error) {
      console.error("Error fetching item info:", error);
    }
  };

  const handleCloseInfoModal = () => setShowInfoModal(false);

  const handleCloseCameraModal = () => {
    setShowCameraModal(false);
    setCapturedPhoto(null);
  };

  const handleChange = field => event => {
    const value = event.target ? event.target.value : event.value;
    setItems(prevItems => _objectSpread(_objectSpread({}, prevItems), {}, {
      [field]: value
    }));
  };

  const mostRecentWorkOrder = workOrders && workOrders.length > 0 ? workOrders.reduce((latest, current) => {
    const latestDate = new Date(latest.date);
    const currentDate = new Date(current.date);
    return currentDate > latestDate ? current : latest;
  }, workOrders[0]) : {};

  const handleShowCameraModal = () => {
    setShowCameraModal(true);
  };

  const generateCustomID = () => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    return `AIS${randomNum}`;
  };

  const handlePrint = async () => {
    if (!items.name) {
      alert("Missing name");
      return;
    } // In addItem mode, there is no existing id so generate one


    const printId = generateCustomID();
    const payload = {
      name: items.name,
      pn: items.pn,
      sn: items.sn,
      wo: workOrders && workOrders.length > 0 ? workOrders[0].workOrder : "",
      status: items.status,
      local_sn: printId,
      // Use the generated custom ID
      descriptions: descriptions,
      date: items.date || new Date().toISOString().split("T")[0],
      DOM: DOM,
      oem: oem,
      modality: modality,
      model: model
    };
    console.log("Payload for printing:", payload);

    try {
      const response = await fetch("https://cc7e-174-76-22-138.ngrok-free.app/print-label", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      console.log("Print result:", result);
    } catch (error) {
      console.error("Error printing label:", error);
    }
  };

  const handleAddNewPn = () => {
    if (newPn.trim() !== "") {
      setItems(prev => _objectSpread(_objectSpread({}, prev), {}, {
        pn: [...prev.pn, newPn.trim()]
      }));
    }

    setNewPn("");
    setAddingNewPn(false);
  };

  const handleAddNewSn = () => {
    if (newSn.trim() !== "") {
      setItems(prev => _objectSpread(_objectSpread({}, prev), {}, {
        sn: [...prev.sn, newSn.trim()]
      }));
    }

    setNewSn("");
    setAddingNewSn(false);
  };

  function getPriorityMachineField(field, currentValue, theMachine, currentMachine, fromMachine) {
    // If the field is already filled in by the user, return it unchanged.
    if (currentValue && currentValue.trim() !== "" && currentValue.trim() !== "N/A") {
      return currentValue;
    } // Otherwise, prioritize the best available value.


    if (theMachine && theMachine[field] && theMachine[field].trim() !== "" && theMachine[field] !== "N/A") {
      return theMachine[field];
    }

    if (currentMachine && currentMachine[field] && currentMachine[field].trim() !== "" && currentMachine[field] !== "N/A") {
      return currentMachine[field];
    }

    if (fromMachine && fromMachine[field] && fromMachine[field].trim() !== "" && fromMachine[field] !== "N/A") {
      return fromMachine[field];
    }

    return currentValue; // Default to keeping the current value
  }

  function updateMachineFields(theMachine, currentMachine, fromMachine) {
    return {
      oem: getValidMachineField("oem", theMachine, currentMachine, fromMachine),
      modality: getValidMachineField("modality", theMachine, currentMachine, fromMachine),
      model: getValidMachineField("model", theMachine, currentMachine, fromMachine)
    };
  }

  function getValidMachineField(field, theMachine, currentMachine, fromMachine) {
    if (theMachine && theMachine[field] && theMachine[field].trim() !== "" && theMachine[field] !== "N/A") {
      return theMachine[field];
    }

    if (currentMachine && currentMachine[field] && currentMachine[field].trim() !== "" && currentMachine[field] !== "N/A") {
      return currentMachine[field];
    }

    if (fromMachine && fromMachine[field] && fromMachine[field].trim() !== "" && fromMachine[field] !== "N/A") {
      return fromMachine[field];
    }

    return ""; // Keep it empty if no valid data exists
  }

  const {
    0: showLocalLocFrom,
    1: setShowLocalLocFrom
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const {
    0: showLocalLocCurrent,
    1: setShowLocalLocCurrent
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);

  async function handleClone() {
    var _descriptions$2;

    event.preventDefault();

    if (!items.name || !((_descriptions$2 = descriptions[0]) !== null && _descriptions$2 !== void 0 && _descriptions$2.description)) {
      handleShow(); // your existing error modal

      return;
    }

    setLoading(true);

    try {
      // save but don’t redirect
      await toSend(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const condition = name => {
    return name && name.toLowerCase() === "interior socal";
  };

  const handleSetSelectedMachine = machine => {
    const condition = name => name && name.toLowerCase() === "interior socal";

    if (machinePick) {
      setSelectedMachine({
        id: machine.id,
        name: machine.name
      }); // For "from", show the local loc input if condition met.

      setShowLocalLocFrom(condition(machine.name));
    } else {
      setSelectedCurrentMachine({
        id: machine.id,
        name: machine.name
      }); // For "current", you might also want a local loc input:

      setShowLocalLocCurrent(condition(machine.name));
    }

    fetchMachine(machine.id);
    setShowMachineModal(false);
  };

  const {
    0: currentPnIndex,
    1: setCurrentPnIndex
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(0);
  const {
    0: showDropdown,
    1: setShowDropdown
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const {
    0: currentSnIndex,
    1: setCurrentSnIndex
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(0);
  const {
    0: showSnDropdown,
    1: setShowSnDropdown
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);

  const handleAddNewClient = () => {
    // Generate a random client number as part of the URL.
    const randomNum = Math.floor(10000 + Math.random() * 90000); // When pushing, include a query parameter (from=item) and the current item id if available.

    router.push(`/NewSearch/client/AIS${randomNum}/addClient?from=addItem`);
  };

  const {
    0: showMachineSelect,
    1: setShowMachineSelect
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const {
    0: selectedClientFrom,
    1: setSelectedClientFrom
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null);
  const {
    0: selectedClientCurrent,
    1: setSelectedClientCurrent
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null);
  return __jsx(_LoggedIn__WEBPACK_IMPORTED_MODULE_7__["default"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 980,
      columnNumber: 5
    }
  }, __jsx(_item_id_MachineSelectionModal__WEBPACK_IMPORTED_MODULE_13__["default"], {
    show: machineSelectionModal,
    handleClose: () => setMachineSelectionModal(false),
    setMachine: handleSetSelectedMachine,
    machineOptions: machineOptions // if your modal needs the list of machines
    ,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 982,
      columnNumber: 7
    }
  }), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"], {
    show: show,
    onHide: handleClose,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 988,
      columnNumber: 7
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Header, {
    closeButton: true,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 989,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Title, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 990,
      columnNumber: 11
    }
  }, "Error")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Body, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 992,
      columnNumber: 9
    }
  }, "Missing required field: Name and Description"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Footer, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 993,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "primary",
    onClick: handleClose,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 994,
      columnNumber: 11
    }
  }, "Ok"))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"], {
    show: showErr,
    onHide: handleCloseErr,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1000,
      columnNumber: 7
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Header, {
    closeButton: true,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1001,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Title, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1002,
      columnNumber: 11
    }
  }, "Error")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Body, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1004,
      columnNumber: 9
    }
  }, Err), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Footer, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1005,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "primary",
    onClick: handleCloseErr,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1006,
      columnNumber: 11
    }
  }, "Ok"))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"], {
    show: showSaveModal,
    onHide: handleCloseSaveModal,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1011,
      columnNumber: 7
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Header, {
    closeButton: true,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1012,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Title, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1013,
      columnNumber: 11
    }
  }, "Save Confirmation")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Body, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1015,
      columnNumber: 9
    }
  }, "Data has been saved successfully."), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Footer, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1016,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "primary",
    onClick: handleCloseSaveModal,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1017,
      columnNumber: 11
    }
  }, "Ok"))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"], {
    show: showDescModal,
    onHide: handleCloseDescModal,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1022,
      columnNumber: 7
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Header, {
    closeButton: true,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1023,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Title, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1024,
      columnNumber: 11
    }
  }, "Descriptions")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Body, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1026,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "primary",
    className: "mb-3",
    onClick: addDescription,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1027,
      columnNumber: 11
    }
  }, "Add Description"), descriptions.map((desc, index) => __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Row"], {
    key: index,
    className: "mb-3",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1031,
      columnNumber: 13
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "outline-secondary",
    className: "w-100",
    onClick: () => selectDescription(index),
    style: {
      cursor: "pointer"
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1032,
      columnNumber: 15
    }
  }, __jsx("div", {
    className: "d-flex justify-content-between",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1038,
      columnNumber: 17
    }
  }, __jsx("span", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1039,
      columnNumber: 19
    }
  }, desc.description || "Description"), __jsx("span", {
    style: {
      borderLeft: "1px solid #ccc",
      paddingLeft: "10px"
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1040,
      columnNumber: 19
    }
  }, desc.date || "Date"))))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "primary",
    onClick: handleCloseDescModal,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1052,
      columnNumber: 11
    }
  }, "OK"))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"], {
    show: showWoModal,
    onHide: handleCloseWoModal,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1057,
      columnNumber: 7
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Header, {
    closeButton: true,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1058,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Title, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1059,
      columnNumber: 11
    }
  }, "Work Orders")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Body, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1061,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "primary",
    className: "mb-3",
    onClick: addWorkOrder,
    style: {
      marginBottom: "1rem"
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1062,
      columnNumber: 11
    }
  }, "Add Work Order"), workOrders.map((wo, index) => __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Row"], {
    key: index,
    className: "mb-3",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1071,
      columnNumber: 13
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1072,
      columnNumber: 15
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Control, {
    type: "text",
    placeholder: "Work Order",
    value: wo.workOrder,
    onChange: e => handleWorkOrderChange(index, "workOrder", e.target.value),
    style: {
      marginBottom: "0.5rem"
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1073,
      columnNumber: 17
    }
  })), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1083,
      columnNumber: 15
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Control, {
    type: "date",
    placeholder: "Date",
    value: wo.date,
    onChange: e => handleWorkOrderChange(index, "date", e.target.value),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1084,
      columnNumber: 17
    }
  })), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1093,
      columnNumber: 15
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "danger",
    onClick: () => removeWorkOrder(index),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1094,
      columnNumber: 17
    }
  }, "Remove")))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "primary",
    onClick: handleCloseWoModal,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1100,
      columnNumber: 11
    }
  }, "OK"))), __jsx(_ClientInfoModal__WEBPACK_IMPORTED_MODULE_11__["default"], {
    show: showMachineModal,
    handleClose: handleCloseMachineModal,
    selectedClient: selectedClient,
    machineOptions: machineOptions,
    setSelectedMachine: handleSetSelectedMachine,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1106,
      columnNumber: 7
    }
  }), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"], {
    show: showClientModal,
    onHide: handleCloseClientModal,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1113,
      columnNumber: 7
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Header, {
    closeButton: true,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1114,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Title, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1115,
      columnNumber: 11
    }
  }, "Select Client")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Body, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1117,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["FormControl"], {
    type: "text",
    placeholder: "Search by name",
    className: "mb-3",
    value: search,
    onChange: e => setSearch(e.target.value),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1118,
      columnNumber: 11
    }
  }), __jsx(_utils_ClientTable__WEBPACK_IMPORTED_MODULE_10__["default"], {
    clients: clients.filter(client => client.name.toLowerCase().includes(search.toLowerCase())),
    onSelectClient: handleClientInfo,
    onInfoClick: handleClientInfo,
    clearSelection: () => handleClientInfo(null),
    onAddClient: handleAddNewClient // new prop
    ,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1125,
      columnNumber: 11
    }
  }))), __jsx(_parentModal__WEBPACK_IMPORTED_MODULE_12__["default"], {
    show: showParentModal,
    handleClose: handleCloseParentModal,
    setSelectedParent: setSelectedParent,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1137,
      columnNumber: 7
    }
  }), __jsx(_item_id_MachineSelectionModal__WEBPACK_IMPORTED_MODULE_13__["default"], {
    show: machineSelectionModal,
    handleClose: () => setMachineSelectionModal(false),
    setMachine: setTheMachine,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1142,
      columnNumber: 7
    }
  }), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"], {
    show: showCameraModal,
    onHide: handleCloseCameraModal,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1148,
      columnNumber: 7
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Header, {
    closeButton: true,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1149,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Title, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1150,
      columnNumber: 11
    }
  }, "Take a Photo")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Body, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1152,
      columnNumber: 9
    }
  }, __jsx("div", {
    className: "camera",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1153,
      columnNumber: 11
    }
  }, !capturedPhoto ? __jsx(BarcodeScannerComponent, {
    width: "100%",
    height: 300,
    onUpdate: handleCapture,
    facingMode: cameraFacing,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1155,
      columnNumber: 15
    }
  }) : __jsx("div", {
    className: "photo-preview",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1162,
      columnNumber: 15
    }
  }, __jsx("img", {
    src: URL.createObjectURL(capturedPhoto),
    alt: "captured",
    style: {
      width: "100%"
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1163,
      columnNumber: 17
    }
  })))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Footer, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1172,
      columnNumber: 9
    }
  }, !capturedPhoto ? __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    onClick: capturePhoto,
    style: {
      borderRadius: "50%",
      width: "60px",
      height: "60px",
      position: "absolute",
      left: "50%",
      transform: "translateX(-50%)",
      bottom: "10px"
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1175,
      columnNumber: 15
    }
  }, "\uD83D\uDCF7"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    onClick: () => setCameraFacing(prev => prev === "environment" ? "user" : "environment"),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1189,
      columnNumber: 15
    }
  }, "Flip Camera"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "secondary",
    onClick: handleCloseCameraModal,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1198,
      columnNumber: 15
    }
  }, "Cancel")) : __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "secondary",
    onClick: () => setCapturedPhoto(null),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1204,
      columnNumber: 15
    }
  }, "Retake"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "primary",
    onClick: savePhoto,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1210,
      columnNumber: 15
    }
  }, "OK")))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"], {
    show: showDescModal,
    onHide: handleCloseDescModal,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1218,
      columnNumber: 7
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Header, {
    closeButton: true,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1219,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Title, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1220,
      columnNumber: 11
    }
  }, "Descriptions")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Body, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1222,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "primary",
    className: "mb-3",
    onClick: addDescription,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1223,
      columnNumber: 11
    }
  }, "Add Description"), descriptions.map((desc, index) => __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Row"], {
    key: index,
    className: "mb-3",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1227,
      columnNumber: 13
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "outline-secondary",
    className: "w-100",
    onClick: () => selectDescription(index),
    style: {
      cursor: "pointer"
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1228,
      columnNumber: 15
    }
  }, __jsx("div", {
    className: "d-flex justify-content-between",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1234,
      columnNumber: 17
    }
  }, __jsx("span", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1235,
      columnNumber: 19
    }
  }, desc.description || "Description"), __jsx("span", {
    style: {
      borderLeft: "1px solid #ccc",
      paddingLeft: "10px"
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1236,
      columnNumber: 19
    }
  }, desc.date || "Date"))))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "primary",
    onClick: handleCloseDescModal,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1248,
      columnNumber: 11
    }
  }, "OK"))), __jsx(_InfoModal__WEBPACK_IMPORTED_MODULE_14__["default"], {
    show: showInfoModal,
    handleClose: handleCloseInfoModal,
    itemName: items.name,
    dimensions: `${items.length},${items.width},${items.height}`,
    price: items.price,
    freqI: freqItem,
    freqM: machineFrequency,
    usage: usagePastYear,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1255,
      columnNumber: 7
    }
  }), loading && __jsx("div", {
    style: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(255, 255, 255, 0.7)",
      backdropFilter: "blur(5px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999 // Make sure it's above everything else

    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1266,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Spinner"], {
    animation: "border",
    variant: "primary",
    role: "status",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1281,
      columnNumber: 11
    }
  }, __jsx("span", {
    className: "visually-hidden",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1282,
      columnNumber: 13
    }
  }, "Loading..."))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Container"], {
    className: "d-flex align-items-center justify-content-center",
    style: {
      minHeight: "100vh"
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1287,
      columnNumber: 7
    }
  }, __jsx("div", {
    className: "w-100",
    style: {
      maxWidth: "600px"
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1291,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Card"], {
    className: "align-items-center justify-content-center",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1292,
      columnNumber: 11
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Card"].Body, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1293,
      columnNumber: 13
    }
  }, __jsx("h2", {
    className: "text-center mb-4",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1294,
      columnNumber: 15
    }
  }, "Add New Item"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"], {
    onSubmit: handleSubmit,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1295,
      columnNumber: 15
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Row"], {
    className: "mb-3",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1297,
      columnNumber: 17
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1298,
      columnNumber: 19
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Group, {
    controlId: "name",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1299,
      columnNumber: 21
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Label, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1300,
      columnNumber: 23
    }
  }, "Name"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Control, {
    type: "text",
    value: items.name,
    onChange: handleChange("name"),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1301,
      columnNumber: 23
    }
  }))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1308,
      columnNumber: 19
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Group, {
    controlId: "pn",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1309,
      columnNumber: 21
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Label, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1310,
      columnNumber: 23
    }
  }, "Product Number"), __jsx("div", {
    style: {
      position: "relative"
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1311,
      columnNumber: 23
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["InputGroup"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1312,
      columnNumber: 25
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Control, {
    type: "text",
    value: items.pn[currentPnIndex] || "",
    onChange: e => handlePnChange(currentPnIndex, e.target.value),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1314,
      columnNumber: 27
    }
  }), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "outline-secondary",
    onClick: () => setShowDropdown(!showDropdown),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1322,
      columnNumber: 27
    }
  }, "\u25BE"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["InputGroup"].Text, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1329,
      columnNumber: 27
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "outline-secondary",
    onClick: () => setAddingNewPn(true),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1330,
      columnNumber: 29
    }
  }, "+"))), showDropdown && __jsx("div", {
    style: {
      position: "absolute",
      top: "100%",
      left: 0,
      right: 0,
      backgroundColor: "white",
      border: "1px solid #ccc",
      zIndex: 1000,
      maxHeight: "150px",
      overflowY: "auto"
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1340,
      columnNumber: 27
    }
  }, items.pn.map((pnOption, idx) => __jsx("div", {
    key: idx,
    style: {
      padding: "8px",
      cursor: "pointer"
    },
    onClick: () => {
      setCurrentPnIndex(idx);
      setShowDropdown(false);
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1354,
      columnNumber: 31
    }
  }, pnOption)))), addingNewPn && __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Control, {
    type: "text",
    placeholder: "Enter new PN",
    value: newPn,
    onChange: e => setNewPn(e.target.value),
    onBlur: handleAddNewPn,
    onKeyDown: e => {
      if (e.key === "Enter") {
        handleAddNewPn();
      }
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1370,
      columnNumber: 25
    }
  })))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Row"], {
    className: "mb-3",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1387,
      columnNumber: 17
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1388,
      columnNumber: 19
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Group, {
    controlId: "sn",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1389,
      columnNumber: 21
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Label, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1390,
      columnNumber: 23
    }
  }, "Serial Number"), __jsx("div", {
    style: {
      position: "relative"
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1391,
      columnNumber: 23
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["InputGroup"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1392,
      columnNumber: 25
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Control, {
    type: "text",
    value: items.sn[currentSnIndex] || "",
    onChange: e => handleSnChange(currentSnIndex, e.target.value),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1394,
      columnNumber: 27
    }
  }), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "outline-secondary",
    onClick: () => setShowSnDropdown(!showSnDropdown),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1402,
      columnNumber: 27
    }
  }, "\u25BE"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["InputGroup"].Text, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1409,
      columnNumber: 27
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "outline-secondary",
    onClick: () => setAddingNewSn(true),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1410,
      columnNumber: 29
    }
  }, "+"))), showSnDropdown && __jsx("div", {
    style: {
      position: "absolute",
      top: "100%",
      left: 0,
      right: 0,
      backgroundColor: "white",
      border: "1px solid #ccc",
      zIndex: 1000,
      maxHeight: "150px",
      overflowY: "auto"
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1420,
      columnNumber: 27
    }
  }, items.sn.map((snOption, idx) => __jsx("div", {
    key: idx,
    style: {
      padding: "8px",
      cursor: "pointer"
    },
    onClick: () => {
      setCurrentSnIndex(idx);
      setShowSnDropdown(false);
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1434,
      columnNumber: 31
    }
  }, snOption)))), addingNewSn && __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Control, {
    type: "text",
    placeholder: "Enter new SN",
    value: newSn,
    onChange: e => setNewSn(e.target.value),
    onBlur: handleAddNewSn,
    onKeyDown: e => {
      if (e.key === "Enter") {
        handleAddNewSn();
      }
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1450,
      columnNumber: 25
    }
  }))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1465,
      columnNumber: 19
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Group, {
    controlId: "status",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1466,
      columnNumber: 21
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Label, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1467,
      columnNumber: 23
    }
  }, "Status"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Select, {
    value: items.status || "",
    onChange: handleChange("status"),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1468,
      columnNumber: 23
    }
  }, __jsx("option", {
    value: "",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1472,
      columnNumber: 25
    }
  }, "Select status"), __jsx("option", {
    value: "Good",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1473,
      columnNumber: 25
    }
  }, "Good"), __jsx("option", {
    value: "Bad",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1474,
      columnNumber: 25
    }
  }, "Bad"), __jsx("option", {
    value: "Unknown",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1475,
      columnNumber: 25
    }
  }, "Unknown"))))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Row"], {
    className: "mb-3",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1482,
      columnNumber: 17
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1483,
      columnNumber: 19
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Group, {
    controlId: "oem",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1484,
      columnNumber: 21
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Label, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1485,
      columnNumber: 23
    }
  }, "OEM"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Control, {
    type: "text",
    placeholder: "OEM",
    value: oem,
    onChange: e => setOem(e.target.value),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1486,
      columnNumber: 23
    }
  }))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1494,
      columnNumber: 19
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Group, {
    controlId: "modality",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1495,
      columnNumber: 21
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Label, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1496,
      columnNumber: 23
    }
  }, "Modality"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Control, {
    type: "text",
    placeholder: "Modality",
    value: modality,
    onChange: e => setModality(e.target.value),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1497,
      columnNumber: 23
    }
  }))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1505,
      columnNumber: 19
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Group, {
    controlId: "model",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1506,
      columnNumber: 21
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Label, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1507,
      columnNumber: 23
    }
  }, "Model"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Control, {
    type: "text",
    placeholder: "Model",
    value: model,
    onChange: e => setModel(e.target.value),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1508,
      columnNumber: 23
    }
  })))), __jsx("div", {
    style: {
      marginBottom: "1rem",
      marginTop: "1rem"
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1518,
      columnNumber: 17
    }
  }, __jsx("div", {
    className: "d-flex align-items-center",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1519,
      columnNumber: 19
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "outline-secondary",
    onClick: handleShowWoModal,
    className: "me-2",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1520,
      columnNumber: 21
    }
  }, "Manage Work Orders"), workOrders.length > 0 && __jsx("div", {
    className: "d-flex flex-column align-items-start",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1528,
      columnNumber: 23
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Label, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1529,
      columnNumber: 25
    }
  }, "Work Order"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Control, {
    type: "text",
    placeholder: "Most Recent Work Order",
    value: (mostRecentWorkOrder === null || mostRecentWorkOrder === void 0 ? void 0 : mostRecentWorkOrder.workOrder) || "",
    onChange: e => handleWorkOrderChange(workOrders.indexOf(mostRecentWorkOrder), "workOrder", e.target.value),
    style: {
      marginBottom: "0.5rem"
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1530,
      columnNumber: 25
    }
  }), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Label, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1543,
      columnNumber: 25
    }
  }, "Date"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Control, {
    type: "date",
    placeholder: "Work Order Date",
    value: (mostRecentWorkOrder === null || mostRecentWorkOrder === void 0 ? void 0 : mostRecentWorkOrder.date) || "",
    onChange: e => handleWorkOrderChange(workOrders.indexOf(mostRecentWorkOrder), "date", e.target.value),
    style: {
      marginBottom: "0.5rem"
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1544,
      columnNumber: 25
    }
  })))), __jsx("div", {
    style: {
      marginBottom: "1rem"
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1562,
      columnNumber: 17
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Group, {
    controlId: "desc",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1563,
      columnNumber: 19
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "outline-secondary",
    onClick: listDescriptions,
    className: "mb-2 me-2",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1564,
      columnNumber: 21
    }
  }, "List Descriptions"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Control, {
    as: "textarea",
    rows: 3,
    placeholder: "Enter description",
    value: ((_descriptions$selecte = descriptions[selectedDesc]) === null || _descriptions$selecte === void 0 ? void 0 : _descriptions$selecte.description) || "",
    onChange: e => handleDescriptionChange(selectedDesc, "description", e.target.value),
    style: {
      marginBottom: "0.5rem"
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1571,
      columnNumber: 21
    }
  }), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Control, {
    type: "date",
    value: ((_descriptions$selecte2 = descriptions[selectedDesc]) === null || _descriptions$selecte2 === void 0 ? void 0 : _descriptions$selecte2.date) || "",
    onChange: e => handleDescriptionChange(selectedDesc, "date", e.target.value),
    style: {
      marginTop: "0.5rem",
      marginBottom: "0.5rem"
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1585,
      columnNumber: 21
    }
  }))), __jsx("div", {
    style: {
      marginBottom: "1rem"
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1600,
      columnNumber: 17
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Row"], {
    className: "mb-3",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1601,
      columnNumber: 19
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1602,
      columnNumber: 21
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "outline-secondary",
    onClick: () => {
      setMachinePick(true);
      handleShowClientModal();
    },
    className: "me-2",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1603,
      columnNumber: 23
    }
  }, "Select From"), selectedClientFrom && __jsx("div", {
    style: {
      border: "1px solid #ccc",
      padding: "0.75rem",
      borderRadius: "4px",
      marginBottom: "1rem"
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1614,
      columnNumber: 25
    }
  }, __jsx("p", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1622,
      columnNumber: 27
    }
  }, __jsx("strong", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1623,
      columnNumber: 29
    }
  }, "Selected Client (From):"), " ", selectedClientFrom.name), __jsx("div", {
    style: {
      marginTop: "0.5rem"
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1626,
      columnNumber: 27
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "outline-secondary",
    onClick: () => setShowMachineModal(true),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1627,
      columnNumber: 29
    }
  }, "Select Machine for ", selectedClientFrom.name), selectedMachine && __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx("p", {
    style: {
      marginTop: "0.5rem"
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1635,
      columnNumber: 33
    }
  }, __jsx("strong", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1636,
      columnNumber: 35
    }
  }, "Selected Machine (From):"), " ", selectedMachine.name), showLocalLocFrom && __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Group, {
    controlId: "localLocFrom",
    className: "mt-2",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1640,
      columnNumber: 35
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Label, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1644,
      columnNumber: 37
    }
  }, "Local Loc (From)"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Control, {
    type: "text",
    value: localLocFrom,
    onChange: e => setLocalLocFrom(e.target.value),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1645,
      columnNumber: 37
    }
  })))))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1660,
      columnNumber: 21
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "outline-secondary",
    onClick: () => {
      setMachinePick(false);
      handleShowClientModal();
    },
    className: "me-2",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1661,
      columnNumber: 23
    }
  }, "Select Current"), selectedClientCurrent && __jsx("div", {
    style: {
      border: "1px solid #ccc",
      padding: "0.75rem",
      borderRadius: "4px",
      marginBottom: "1rem"
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1672,
      columnNumber: 25
    }
  }, __jsx("p", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1680,
      columnNumber: 27
    }
  }, __jsx("strong", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1681,
      columnNumber: 29
    }
  }, "Selected Client (Current):"), " ", selectedClientCurrent.name), __jsx("div", {
    style: {
      marginTop: "0.5rem"
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1684,
      columnNumber: 27
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "outline-secondary",
    onClick: () => setShowMachineModal(true),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1685,
      columnNumber: 29
    }
  }, "Select Machine for ", selectedClientCurrent.name), selectedCurrentMachine && __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx("p", {
    style: {
      marginTop: "0.5rem"
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1693,
      columnNumber: 33
    }
  }, __jsx("strong", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1694,
      columnNumber: 35
    }
  }, "Selected Machine (Current):"), " ", selectedCurrentMachine.name), showLocalLocCurrent && __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Group, {
    controlId: "localLocCurrent",
    className: "mt-2",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1698,
      columnNumber: 35
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Label, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1702,
      columnNumber: 37
    }
  }, "Local Loc (Current)"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Control, {
    type: "text",
    value: localLocCurrent,
    onChange: e => setLocalLocCurrent(e.target.value),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1703,
      columnNumber: 37
    }
  })))))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1718,
      columnNumber: 21
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "outline-secondary",
    onClick: handleShowParentModal,
    className: "me-2",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1719,
      columnNumber: 23
    }
  }, "Select Parent"), selectedParent && __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Control, {
    type: "text",
    placeholder: "Selected Parent",
    value: selectedParent.name,
    readOnly: true,
    style: {
      cursor: "default",
      marginTop: "0.5rem"
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1727,
      columnNumber: 25
    }
  })))), __jsx("div", {
    style: {
      marginBottom: "1rem"
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1739,
      columnNumber: 17
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Row"], {
    className: "mb-3",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1740,
      columnNumber: 19
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], {
    xs: 6,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1741,
      columnNumber: 21
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["ButtonGroup"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1742,
      columnNumber: 23
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "outline-secondary",
    onClick: handleShowCameraModal,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1743,
      columnNumber: 25
    }
  }, "Take Photo"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "outline-secondary",
    onClick: handleBrowsePhotos,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1749,
      columnNumber: 25
    }
  }, "Browse"))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], {
    xs: 6,
    className: "d-flex align-items-center",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1757,
      columnNumber: 21
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: addToWebsite ? "primary" : "outline-primary",
    onClick: () => setAddToWebsite(prev => !prev),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1758,
      columnNumber: 23
    }
  }, addToWebsite ? "✓ Add to Website" : "Add to Website"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Check, {
    type: "checkbox",
    id: "hide-checkbox",
    label: "Hide" // box is checked when we want visible = false
    ,
    checked: !items.visible,
    onChange: e => {
      // grab checked immediately
      const isHidden = e.currentTarget.checked;
      setItems(prev => _objectSpread(_objectSpread({}, prev), {}, {
        visible: !isHidden
      }));
    },
    className: "ms-3",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1764,
      columnNumber: 23
    }
  }))), __jsx("input", {
    type: "file",
    accept: "image/*",
    multiple: true,
    ref: browseInputRef,
    style: {
      display: "none"
    },
    onChange: handleFilesSelected,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1782,
      columnNumber: 19
    }
  })), __jsx("div", {
    className: "mt-3 d-flex flex-wrap",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1792,
      columnNumber: 17
    }
  }, photos.map((photo, index) => __jsx("div", {
    key: index,
    className: "d-flex flex-column align-items-center mb-2 me-2",
    style: {
      width: "100px",
      height: "100px",
      position: "relative"
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1794,
      columnNumber: 21
    }
  }, __jsx("img", {
    src: photo.url,
    alt: `Photo ${index + 1}`,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1803,
      columnNumber: 23
    }
  }), photo.file && __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "danger",
    size: "sm",
    style: {
      position: "absolute",
      top: 0,
      right: 0,
      padding: "0 5px"
    },
    onClick: () => removePhoto(index),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1813,
      columnNumber: 25
    }
  }, "X")))), __jsx("div", {
    className: "mt-3 d-flex flex-wrap align-items-center",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1833,
      columnNumber: 17
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "primary",
    type: "submit",
    style: {
      marginRight: "1rem"
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1834,
      columnNumber: 19
    }
  }, "Save"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "info",
    onClick: handleClone,
    style: {
      marginRight: "1rem"
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1841,
      columnNumber: 19
    }
  }, "Clone"), __jsx(LoadingButton, {
    type: "secondary",
    name: "Back",
    route: "NewSearch/mainSearch",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1848,
      columnNumber: 19
    }
  }), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "info",
    onClick: handlePrint,
    style: {
      marginLeft: "auto"
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1853,
      columnNumber: 19
    }
  }, "Print Label")), __jsx("div", {
    style: {
      textAlign: "center",
      margin: "1rem 0"
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1861,
      columnNumber: 17
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "link",
    style: {
      textDecoration: "none",
      color: "black",
      fontSize: "24px"
    },
    onClick: () => setShowExtra(!showExtra),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1862,
      columnNumber: 19
    }
  }, "\u25BC")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Collapse"], {
    in: showExtra,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1874,
      columnNumber: 17
    }
  }, __jsx("div", {
    id: "extra-collapse",
    className: "mt-3",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1875,
      columnNumber: 19
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Row"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1876,
      columnNumber: 21
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Group, {
    as: react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"],
    controlId: "dimensions",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1877,
      columnNumber: 23
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Label, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1878,
      columnNumber: 25
    }
  }, "Dimensions (L x W x H)"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Row"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1879,
      columnNumber: 25
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1880,
      columnNumber: 27
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Control, {
    placeholder: "Length",
    type: "text",
    value: items.length,
    onChange: handleChange("length"),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1881,
      columnNumber: 29
    }
  })), "x", __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1889,
      columnNumber: 27
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Control, {
    placeholder: "Width",
    type: "text",
    value: items.width,
    onChange: handleChange("width"),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1890,
      columnNumber: 29
    }
  })), "x", __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1898,
      columnNumber: 27
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Control, {
    placeholder: "Height",
    type: "text",
    value: items.height,
    onChange: handleChange("height"),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1899,
      columnNumber: 29
    }
  })))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Group, {
    as: react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"],
    controlId: "price",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1908,
      columnNumber: 23
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Label, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1909,
      columnNumber: 25
    }
  }, "Price"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Control, {
    placeholder: "Price",
    type: "text",
    value: items.price,
    onChange: handleChange("price"),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1910,
      columnNumber: 25
    }
  }))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Row"], {
    className: "mt-3",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1918,
      columnNumber: 21
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Group, {
    as: react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"],
    controlId: "DOM",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1919,
      columnNumber: 23
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Label, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1920,
      columnNumber: 25
    }
  }, "DOM (Date of Manufacture)"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Control, {
    placeholder: "Enter DOM",
    type: "date",
    value: DOM,
    onChange: e => setDOM(e.target.value),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1921,
      columnNumber: 25
    }
  })), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Group, {
    as: react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"],
    controlId: "localSN",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1929,
      columnNumber: 23
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Label, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1930,
      columnNumber: 25
    }
  }, "Local SN"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Control, {
    type: "text",
    placeholder: "Enter Local SN",
    value: items.localSN || "",
    onChange: handleChange("localSN"),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1931,
      columnNumber: 25
    }
  }))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Row"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1939,
      columnNumber: 21
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Group, {
    as: react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"],
    controlId: "poNumber",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1940,
      columnNumber: 23
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Label, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1941,
      columnNumber: 25
    }
  }, "PO Number"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Control, {
    type: "text",
    placeholder: "PO Number",
    value: items.poNumber || "",
    onChange: handleChange("poNumber"),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1942,
      columnNumber: 25
    }
  })), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Group, {
    as: react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"],
    controlId: "arrivalDate",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1949,
      columnNumber: 23
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Label, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1950,
      columnNumber: 25
    }
  }, "Arrival Date"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Control, {
    placeholder: "Enter Arrival Date",
    type: "date",
    value: items.arrival_date,
    onChange: e => {
      const value = e.target.value;
      setItems(prev => _objectSpread(_objectSpread({}, prev), {}, {
        arrival_date: value
      }));
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1951,
      columnNumber: 25
    }
  })))))))))));
}

/***/ }),

/***/ "./pages/NewSearch/AddItem/parentModal.js":
/*!************************************************!*\
  !*** ./pages/NewSearch/AddItem/parentModal.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-jsx/style */ "styled-jsx/style");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-bootstrap */ "react-bootstrap");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils_fetchAssociations__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../utils/fetchAssociations */ "./utils/fetchAssociations.js");
/* harmony import */ var _context_AuthUserContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../context/AuthUserContext */ "./context/AuthUserContext.js");
/* harmony import */ var _LoggedIn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../LoggedIn */ "./pages/LoggedIn.js");
/* harmony import */ var _utils_ClientTable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../utils/ClientTable */ "./utils/ClientTable.js");
/* harmony import */ var _utils_ModelTable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../utils/ModelTable */ "./utils/ModelTable.js");
/* harmony import */ var _utils_PartTable__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../utils/PartTable */ "./utils/PartTable.js");
/* harmony import */ var _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../styles/MainSearch.module.css */ "./styles/MainSearch.module.css");
/* harmony import */ var _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _context_Firebase__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../context/Firebase */ "./context/Firebase.js");
var _jsxFileName = "C:\\Users\\mack2\\Desktop\\code\\pages\\NewSearch\\AddItem\\parentModal.js";

var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;










const CLIENT_WAREHOUSE = "igor-house";
const CLIENT_UNASSIGNED = "unassigned";

const ParentModal = ({
  show,
  handleClose,
  setSelectedParent,
  parts
}) => {
  const {
    0: info,
    1: setInfo
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])([]);
  const {
    0: backupInfo,
    1: setBackupInfo
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])([]); // const [ids, setID] = useState([]);

  const {
    0: search,
    1: setSearch
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])("");
  const {
    0: select,
    1: setSelect
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])("Name");
  const {
    0: showList,
    1: setShowList
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(false);
  const {
    0: showListSearch,
    1: setShowListSearch
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])("text");
  const {
    0: selectedOEM,
    1: setSelectedOEM
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(null);
  const {
    0: selectedModality,
    1: setSelectedModality
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(null);
  const {
    0: selectedClient,
    1: setSelectedClient
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(null);
  const {
    0: clients,
    1: setClients
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])([]);
  const {
    0: showClientModal,
    1: setShowClientModal
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(false);
  const {
    0: clientButtonText,
    1: setClientButtonText
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])("Select Option");
  const {
    0: hoverIndex,
    1: setHoverIndex
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(null);
  const {
    0: selectedModel,
    1: setSelectedModel
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(null);
  const {
    0: models,
    1: setModels
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])([]);
  const {
    0: showModelModal,
    1: setShowModelModal
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(false);
  const {
    0: modelButtonText,
    1: setModelButtonText
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])("Select Option");
  const {
    0: clientSearchTerm,
    1: setClientSearchTerm
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])("");
  const {
    0: modelSearchTerm,
    1: setModelSearchTerm
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])("");
  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(() => {
    async function fetchData() {
      const data = await Object(_utils_fetchAssociations__WEBPACK_IMPORTED_MODULE_3__["fetchPartsWithMachineData"])();
      setInfo(data);
      setBackupInfo(data); // setID(data.map((item) => item.id)); // Ensure IDs are correctly set here
    }

    fetchData();
  }, []);

  const handleCloseClientModal = () => setShowClientModal(false);

  const handleShowClientModal = () => setShowClientModal(true);

  const handleCloseModelModal = () => setShowModelModal(false);

  const handleShowModelModal = () => setShowModelModal(true); // Handle search input changes


  const searchChangeHandler = event => setSearch(event.target.value); // Filter items based on search criteria


  function searchFilter() {
    const temp = backupInfo.filter(item => {
      if (item.machineData) {
        if (selectedOEM && item.machineData.OEM !== selectedOEM) return false;
        if (selectedModality && item.machineData.Modality !== selectedModality) return false;
        if (selectedClient && item.machineData.Client !== selectedClient) return false;
        if (selectedModel && item.machineData.Model !== selectedModel) return false;
      }

      if (select === "Name" && item.name.toLowerCase().includes(search.toLowerCase())) return true;

      if (select === "Date") {
        const [month, day, year] = item.date.split("/");
        const reformattedDate = `${year}-${month}-${day}`;
        return reformattedDate === search;
      }

      if (select === "Work Order" && Number(item.wo) === Number(search)) return true;
      if (select === "Product Number" && Number(item.pn) === Number(search)) return true;
      if (select === "Description" && item.desc.toLowerCase().includes(search.toLowerCase())) return true;
      return false;
    });
    setInfo(temp);
  } // Sort items based on column


  function sortCheckAll(pos) {
    const sortedInfo = [...info].sort((a, b) => {
      if (pos === 0 || pos === 5) {
        return b[select].localeCompare(a[select]);
      }

      if (pos === 1) {
        return Date.parse(b[select]) - Date.parse(a[select]);
      }

      return Number(b[select]) - Number(a[select]);
    });
    setInfo(sortedInfo);
  } // Row selection handler


  const rowSelect = item => {
    // item.id must be present in fetchPartsWithMachineData() results
    setSelectedParent({
      id: item.id,
      name: item.name,
      pn: item.pn
    });
    handleClose();
  }; // Dropdown handlers


  const {
    0: dropdown1Text,
    1: setDropdown1Text
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])("Select Option");
  const {
    0: dropdown2Text,
    1: setDropdown2Text
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])("Select Option");

  const handleSelect1 = (eventKey, event) => {
    if (eventKey === "unassigned") {
      setDropdown1Text("Select Option");
      setSelectedOEM(null);
    } else {
      setDropdown1Text(event.target.textContent);
      setSelectedOEM(event.target.textContent);
    }
  };

  const handleSelect2 = (eventKey, event) => {
    if (eventKey === "unassigned") {
      setDropdown2Text("Select Option");
      setSelectedModality(null);
    } else {
      setDropdown2Text(event.target.textContent);
      setSelectedModality(event.target.textContent);
    }
  };

  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(() => {
    searchFilter();
  }, [selectedOEM, selectedModality, selectedClient, selectedModel, search]); // Fetch clients and show modal

  const handleClientClick = async () => {
    console.log("clicked");
    const clientsData = await Object(_utils_fetchAssociations__WEBPACK_IMPORTED_MODULE_3__["fetchClients"])(selectedOEM, selectedModality);
    setClients(clientsData);
    setClientSearchTerm(""); // Reset search term

    setShowClientModal(true);
  }; // Client selection handler


  const handleClientSelect = clientName => {
    setClientButtonText(clientName || "Select Option");
    setSelectedClient(clientName || null);
    setShowClientModal(false);
  }; // Client info handler


  const handleClientInfo = (clientId, clientName) => {
    console.log(`Client ID: ${clientId}, Client Name: ${clientName}`);
  }; // Clear client selection handler


  const handleClearClientSelection = () => {
    setClientButtonText("Select Option");
    setSelectedClient(null);
    setShowClientModal(false);
    searchFilter();
  }; // Fetch models and show modal


  const handleModelClick = async () => {
    const modelsData = await Object(_utils_fetchAssociations__WEBPACK_IMPORTED_MODULE_3__["fetchModels"])(selectedOEM, selectedModality, selectedClient);
    setModels(modelsData);
    setModelSearchTerm(""); // Reset search term

    setShowModelModal(true);
  }; // Model selection handler


  const handleModelSelect = modelName => {
    setModelButtonText(modelName || "Select Option");
    setSelectedModel(modelName || null);
    setShowModelModal(false);
  }; // Clear model selection handler


  const handleClearModelSelection = () => {
    setModelButtonText("Select Option");
    setSelectedModel(null);
    setShowModelModal(false);
    searchFilter();
  };

  const handleWarehouseClick = () => {
    setClientButtonText(CLIENT_WAREHOUSE);
    setSelectedClient(CLIENT_WAREHOUSE);
    searchFilter();
  };

  const handleUnassignedClick = () => {
    setClientButtonText(CLIENT_UNASSIGNED);
    setSelectedClient(CLIENT_UNASSIGNED);
    searchFilter();
  };

  return __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"], {
    show: show,
    onHide: handleClose,
    size: "lg",
    centered: true,
    scrollable: true,
    dialogClassName: "parent-modal-dialog",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 229,
      columnNumber: 5
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Header, {
    closeButton: true,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 230,
      columnNumber: 7
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Title, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 231,
      columnNumber: 9
    }
  }, "Select Parent")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Body, {
    style: {
      maxHeight: "75vh",
      overflowY: "auto"
    },
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 233,
      columnNumber: 7
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Container"], {
    className: "d-flex align-items-center justify-content-center",
    style: {
      minHeight: "unset"
    },
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 234,
      columnNumber: 9
    }
  }, __jsx("div", {
    className: "w-100",
    style: {
      maxWidth: "1200px"
    },
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 238,
      columnNumber: 11
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Card"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 239,
      columnNumber: 13
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Card"].Body, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 240,
      columnNumber: 15
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Row"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 241,
      columnNumber: 17
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], {
    md: 4,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 242,
      columnNumber: 19
    }
  }, __jsx("div", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 244,
      columnNumber: 21
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["InputGroup"], {
    className: "mb-3",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 245,
      columnNumber: 23
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["InputGroup"].Text, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 246,
      columnNumber: 25
    }
  }, "OEM"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Dropdown"], {
    onSelect: handleSelect1,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 247,
      columnNumber: 25
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Dropdown"].Toggle, {
    variant: "outline-secondary",
    id: "dropdown-button-1",
    className: "w-100",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 248,
      columnNumber: 27
    }
  }, dropdown1Text), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Dropdown"].Menu, {
    className: "w-100",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 255,
      columnNumber: 27
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Dropdown"].Item, {
    eventKey: "unassigned",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 256,
      columnNumber: 29
    }
  }, "Select Option"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Dropdown"].Item, {
    eventKey: "GE",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 259,
      columnNumber: 29
    }
  }, "GE"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Dropdown"].Item, {
    eventKey: "Toshiba",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 260,
      columnNumber: 29
    }
  }, "Toshiba"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Dropdown"].Item, {
    eventKey: "Siemens",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 263,
      columnNumber: 29
    }
  }, "Siemens"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Dropdown"].Item, {
    eventKey: "Philips",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 266,
      columnNumber: 29
    }
  }, "Philips")))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["InputGroup"], {
    className: "mb-3",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 273,
      columnNumber: 23
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["InputGroup"].Text, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 274,
      columnNumber: 25
    }
  }, "Modality"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Dropdown"], {
    onSelect: handleSelect2,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 275,
      columnNumber: 25
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Dropdown"].Toggle, {
    variant: "outline-secondary",
    id: "dropdown-button-2",
    className: "w-100",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 276,
      columnNumber: 27
    }
  }, dropdown2Text), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Dropdown"].Menu, {
    className: "w-100",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 283,
      columnNumber: 27
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Dropdown"].Item, {
    eventKey: "unassigned",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 284,
      columnNumber: 29
    }
  }, "Select Option"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Dropdown"].Item, {
    eventKey: "CT",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 287,
      columnNumber: 29
    }
  }, "CT"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Dropdown"].Item, {
    eventKey: "MRI",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 288,
      columnNumber: 29
    }
  }, "MRI")))), __jsx("div", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 294,
      columnNumber: 23
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["InputGroup"], {
    className: "mb-3",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 295,
      columnNumber: 25
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["InputGroup"].Text, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 296,
      columnNumber: 27
    }
  }, "Client"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "outline-secondary",
    className: "w-100",
    onClick: handleClientClick,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 297,
      columnNumber: 27
    }
  }, clientButtonText)), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["InputGroup"], {
    className: "mb-3",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 305,
      columnNumber: 25
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["InputGroup"].Text, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 306,
      columnNumber: 27
    }
  }, "Client-2"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "outline-secondary",
    className: "w-100",
    disabled: true,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 307,
      columnNumber: 27
    }
  }, "Select Option")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["InputGroup"], {
    className: "mb-3",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 315,
      columnNumber: 25
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["InputGroup"].Text, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 316,
      columnNumber: 27
    }
  }, "Model"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "outline-secondary",
    className: "w-100",
    onClick: handleModelClick,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 317,
      columnNumber: 27
    }
  }, modelButtonText)), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_9___default.a.divider,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 326,
      columnNumber: 25
    }
  }), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["InputGroup"], {
    className: "mb-3",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 327,
      columnNumber: 25
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["InputGroup"].Text, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 328,
      columnNumber: 27
    }
  }, "Warehouse"), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_9___default.a.buttonGroup,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 329,
      columnNumber: 27
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "outline-secondary",
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_9___default.a.flexButton,
    onClick: handleWarehouseClick,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 330,
      columnNumber: 29
    }
  }, "Warehouse"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "outline-secondary",
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_9___default.a.flexButton,
    onClick: handleUnassignedClick,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 337,
      columnNumber: 29
    }
  }, "Unassigned")))))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], {
    md: 8,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 350,
      columnNumber: 19
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_9___default.a.tableContainer,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 351,
      columnNumber: 21
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Table"], {
    striped: true,
    bordered: true,
    hover: true,
    size: "sm",
    className: "mb-0",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 352,
      columnNumber: 23
    }
  }, __jsx("thead", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_9___default.a.stickyHeader,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 353,
      columnNumber: 25
    }
  }, __jsx("tr", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 354,
      columnNumber: 27
    }
  }, __jsx("th", {
    onClick: () => sortCheckAll(0),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 355,
      columnNumber: 29
    }
  }, "Name"), __jsx("th", {
    onClick: () => sortCheckAll(1),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 356,
      columnNumber: 29
    }
  }, "Date"), __jsx("th", {
    onClick: () => sortCheckAll(2),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 357,
      columnNumber: 29
    }
  }, "Work Order"), __jsx("th", {
    onClick: () => sortCheckAll(3),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 358,
      columnNumber: 29
    }
  }, "Product Number"), __jsx("th", {
    onClick: () => sortCheckAll(4),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 361,
      columnNumber: 29
    }
  }, "Serial Number"), __jsx("th", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 364,
      columnNumber: 29
    }
  }, "Select"))), __jsx("tbody", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 367,
      columnNumber: 25
    }
  }, info.map(item => __jsx("tr", {
    className: "clickable-row",
    key: item.id,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 369,
      columnNumber: 29
    }
  }, __jsx("td", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 370,
      columnNumber: 31
    }
  }, item.name), __jsx("td", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 371,
      columnNumber: 31
    }
  }, Object(_utils_fetchAssociations__WEBPACK_IMPORTED_MODULE_3__["formatDate"])(item.date)), __jsx("td", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 372,
      columnNumber: 31
    }
  }, item.workOrders && item.workOrders.length > 0 ? item.workOrders[item.workOrders.length - 1].workOrder : "N/A"), __jsx("td", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 378,
      columnNumber: 31
    }
  }, item.pn), __jsx("td", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 379,
      columnNumber: 31
    }
  }, item.sn), __jsx("td", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 380,
      columnNumber: 31
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "primary",
    onClick: () => rowSelect(item),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 381,
      columnNumber: 33
    }
  }, "Select")))))), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_9___default.a.searchContainer,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 392,
      columnNumber: 23
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"], {
    className: "d-flex pb-2",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 393,
      columnNumber: 25
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["FormControl"], {
    type: showListSearch,
    placeholder: "Search",
    className: "me-2 flex-grow-1",
    "aria-label": "Search",
    value: search,
    onChange: searchChangeHandler,
    style: {
      flex: "1"
    },
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 394,
      columnNumber: 27
    }
  }), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["NavDropdown"], {
    title: select,
    id: "collasible-nav-dropdown",
    show: showList,
    onMouseEnter: () => setShowList(true),
    onMouseLeave: () => setShowList(false),
    style: {
      marginTop: "-5px"
    },
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 403,
      columnNumber: 27
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["NavDropdown"].Item, {
    onClick: () => setSelect("Name") & setShowListSearch("text"),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 411,
      columnNumber: 29
    }
  }, "Name"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["NavDropdown"].Item, {
    onClick: () => setSelect("Date") & setShowListSearch("date"),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 418,
      columnNumber: 29
    }
  }, "Date"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["NavDropdown"].Item, {
    onClick: () => setSelect("Work Order") & setShowListSearch("number"),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 425,
      columnNumber: 29
    }
  }, "Work Order"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["NavDropdown"].Item, {
    onClick: () => setSelect("Product Number") & setShowListSearch("number"),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 433,
      columnNumber: 29
    }
  }, "Product Number"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["NavDropdown"].Item, {
    onClick: () => setSelect("Description") & setShowListSearch("text"),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 441,
      columnNumber: 29
    }
  }, "Description")))))))))))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Footer, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 463,
      columnNumber: 7
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "secondary",
    onClick: handleClose,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 464,
      columnNumber: 9
    }
  }, "Cancel"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "warning",
    onClick: () => {
      setSelectedParent(null);
      handleClose();
    },
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 467,
      columnNumber: 9
    }
  }, "Clear Selection")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"], {
    show: showClientModal,
    onHide: handleCloseClientModal,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 477,
      columnNumber: 7
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Header, {
    closeButton: true,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 478,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Title, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 479,
      columnNumber: 11
    }
  }, "Select Client")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Body, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 481,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["FormControl"], {
    type: "text",
    placeholder: "Search by name",
    className: "mb-3",
    value: clientSearchTerm,
    onChange: e => setClientSearchTerm(e.target.value),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 482,
      columnNumber: 11
    }
  }), __jsx(_utils_ClientTable__WEBPACK_IMPORTED_MODULE_6__["default"], {
    clients: clients.filter(client => client.name.toLowerCase().includes(clientSearchTerm.toLowerCase())),
    disableInfo: true,
    onSelectClient: handleClientSelect,
    onInfoClick: handleClientInfo,
    clearSelection: () => handleClientSelect(null) // Clear selection handler
    ,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 489,
      columnNumber: 11
    }
  }))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"], {
    show: showModelModal,
    onHide: handleCloseModelModal,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 501,
      columnNumber: 7
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Header, {
    closeButton: true,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 502,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Title, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 503,
      columnNumber: 11
    }
  }, "Select Model")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Body, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 505,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["FormControl"], {
    type: "text",
    placeholder: "Search by name",
    className: "mb-3",
    value: modelSearchTerm,
    onChange: e => setModelSearchTerm(e.target.value),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 506,
      columnNumber: 11
    }
  }), __jsx(_utils_ModelTable__WEBPACK_IMPORTED_MODULE_7__["default"], {
    models: models.filter(model => typeof model === "string" ? model.toLowerCase().includes(modelSearchTerm.toLowerCase()) : false),
    onSelectModel: handleModelSelect,
    clearSelection: () => handleModelSelect(null) // Clear selection handler
    ,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 513,
      columnNumber: 11
    }
  }))));
};

__jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {
  id: "2081140824",
  dynamic: [_styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_9___default.a.tableContainer],
  __self: undefined,
  __source: void 0
}, `.parent-modal-dialog{max-width:95vw;margin:0 auto;}.parent-modal-dialog .modal-body .${_styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_9___default.a.tableContainer}{max-height:70vh;overflow:auto;}
/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcbWFjazJcXERlc2t0b3BcXGNvZGVcXHBhZ2VzXFxOZXdTZWFyY2hcXEFkZEl0ZW1cXHBhcmVudE1vZGFsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQThnQm1CLEFBSW9CLEFBS0MsZUFKRixDQUtBLGFBSmhCLENBS0EiLCJmaWxlIjoiQzpcXFVzZXJzXFxtYWNrMlxcRGVza3RvcFxcY29kZVxccGFnZXNcXE5ld1NlYXJjaFxcQWRkSXRlbVxccGFyZW50TW9kYWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHtcbiAgTW9kYWwsXG4gIENvbnRhaW5lcixcbiAgQ2FyZCxcbiAgUm93LFxuICBDb2wsXG4gIElucHV0R3JvdXAsXG4gIERyb3Bkb3duLFxuICBGb3JtQ29udHJvbCxcbiAgQnV0dG9uLFxuICBOYXZEcm9wZG93bixcbiAgRm9ybSxcbiAgVGFibGUsXG59IGZyb20gXCJyZWFjdC1ib290c3RyYXBcIjtcbmltcG9ydCB7XG4gIGZldGNoUGFydHNXaXRoTWFjaGluZURhdGEsXG4gIGZldGNoQ2xpZW50cyxcbiAgZmV0Y2hNb2RlbHMsXG4gIGZvcm1hdERhdGUsXG59IGZyb20gXCIuLi8uLi8uLi91dGlscy9mZXRjaEFzc29jaWF0aW9uc1wiO1xuaW1wb3J0IHsgdXNlQXV0aCB9IGZyb20gXCIuLi8uLi8uLi9jb250ZXh0L0F1dGhVc2VyQ29udGV4dFwiO1xuaW1wb3J0IExvZ2dlZEluIGZyb20gXCIuLi8uLi9Mb2dnZWRJblwiO1xuaW1wb3J0IENsaWVudFRhYmxlIGZyb20gXCIuLi8uLi8uLi91dGlscy9DbGllbnRUYWJsZVwiO1xuaW1wb3J0IE1vZGVsVGFibGUgZnJvbSBcIi4uLy4uLy4uL3V0aWxzL01vZGVsVGFibGVcIjtcbmltcG9ydCBQYXJ0VGFibGUgZnJvbSBcIi4uLy4uLy4uL3V0aWxzL1BhcnRUYWJsZVwiO1xuaW1wb3J0IHN0eWxlcyBmcm9tIFwiLi4vLi4vLi4vc3R5bGVzL01haW5TZWFyY2gubW9kdWxlLmNzc1wiO1xuaW1wb3J0IGZpcmViYXNlIGZyb20gXCIuLi8uLi8uLi9jb250ZXh0L0ZpcmViYXNlXCI7XG5cbmNvbnN0IENMSUVOVF9XQVJFSE9VU0UgPSBcImlnb3ItaG91c2VcIjtcbmNvbnN0IENMSUVOVF9VTkFTU0lHTkVEID0gXCJ1bmFzc2lnbmVkXCI7XG5cbmNvbnN0IFBhcmVudE1vZGFsID0gKHsgc2hvdywgaGFuZGxlQ2xvc2UsIHNldFNlbGVjdGVkUGFyZW50LCBwYXJ0cyB9KSA9PiB7XG4gIGNvbnN0IFtpbmZvLCBzZXRJbmZvXSA9IHVzZVN0YXRlKFtdKTtcbiAgY29uc3QgW2JhY2t1cEluZm8sIHNldEJhY2t1cEluZm9dID0gdXNlU3RhdGUoW10pO1xuICAvLyBjb25zdCBbaWRzLCBzZXRJRF0gPSB1c2VTdGF0ZShbXSk7XG4gIGNvbnN0IFtzZWFyY2gsIHNldFNlYXJjaF0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW3NlbGVjdCwgc2V0U2VsZWN0XSA9IHVzZVN0YXRlKFwiTmFtZVwiKTtcbiAgY29uc3QgW3Nob3dMaXN0LCBzZXRTaG93TGlzdF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtzaG93TGlzdFNlYXJjaCwgc2V0U2hvd0xpc3RTZWFyY2hdID0gdXNlU3RhdGUoXCJ0ZXh0XCIpO1xuICBjb25zdCBbc2VsZWN0ZWRPRU0sIHNldFNlbGVjdGVkT0VNXSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbc2VsZWN0ZWRNb2RhbGl0eSwgc2V0U2VsZWN0ZWRNb2RhbGl0eV0gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW3NlbGVjdGVkQ2xpZW50LCBzZXRTZWxlY3RlZENsaWVudF0gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW2NsaWVudHMsIHNldENsaWVudHNdID0gdXNlU3RhdGUoW10pO1xuICBjb25zdCBbc2hvd0NsaWVudE1vZGFsLCBzZXRTaG93Q2xpZW50TW9kYWxdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbY2xpZW50QnV0dG9uVGV4dCwgc2V0Q2xpZW50QnV0dG9uVGV4dF0gPSB1c2VTdGF0ZShcIlNlbGVjdCBPcHRpb25cIik7XG4gIGNvbnN0IFtob3ZlckluZGV4LCBzZXRIb3ZlckluZGV4XSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbc2VsZWN0ZWRNb2RlbCwgc2V0U2VsZWN0ZWRNb2RlbF0gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW21vZGVscywgc2V0TW9kZWxzXSA9IHVzZVN0YXRlKFtdKTtcbiAgY29uc3QgW3Nob3dNb2RlbE1vZGFsLCBzZXRTaG93TW9kZWxNb2RhbF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFttb2RlbEJ1dHRvblRleHQsIHNldE1vZGVsQnV0dG9uVGV4dF0gPSB1c2VTdGF0ZShcIlNlbGVjdCBPcHRpb25cIik7XG4gIGNvbnN0IFtjbGllbnRTZWFyY2hUZXJtLCBzZXRDbGllbnRTZWFyY2hUZXJtXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbbW9kZWxTZWFyY2hUZXJtLCBzZXRNb2RlbFNlYXJjaFRlcm1dID0gdXNlU3RhdGUoXCJcIik7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBhc3luYyBmdW5jdGlvbiBmZXRjaERhdGEoKSB7XG4gICAgICBjb25zdCBkYXRhID0gYXdhaXQgZmV0Y2hQYXJ0c1dpdGhNYWNoaW5lRGF0YSgpO1xuICAgICAgc2V0SW5mbyhkYXRhKTtcbiAgICAgIHNldEJhY2t1cEluZm8oZGF0YSk7XG4gICAgICAvLyBzZXRJRChkYXRhLm1hcCgoaXRlbSkgPT4gaXRlbS5pZCkpOyAvLyBFbnN1cmUgSURzIGFyZSBjb3JyZWN0bHkgc2V0IGhlcmVcbiAgICB9XG4gICAgZmV0Y2hEYXRhKCk7XG4gIH0sIFtdKTtcblxuICBjb25zdCBoYW5kbGVDbG9zZUNsaWVudE1vZGFsID0gKCkgPT4gc2V0U2hvd0NsaWVudE1vZGFsKGZhbHNlKTtcbiAgY29uc3QgaGFuZGxlU2hvd0NsaWVudE1vZGFsID0gKCkgPT4gc2V0U2hvd0NsaWVudE1vZGFsKHRydWUpO1xuXG4gIGNvbnN0IGhhbmRsZUNsb3NlTW9kZWxNb2RhbCA9ICgpID0+IHNldFNob3dNb2RlbE1vZGFsKGZhbHNlKTtcbiAgY29uc3QgaGFuZGxlU2hvd01vZGVsTW9kYWwgPSAoKSA9PiBzZXRTaG93TW9kZWxNb2RhbCh0cnVlKTtcblxuICAvLyBIYW5kbGUgc2VhcmNoIGlucHV0IGNoYW5nZXNcbiAgY29uc3Qgc2VhcmNoQ2hhbmdlSGFuZGxlciA9IChldmVudCkgPT4gc2V0U2VhcmNoKGV2ZW50LnRhcmdldC52YWx1ZSk7XG5cbiAgLy8gRmlsdGVyIGl0ZW1zIGJhc2VkIG9uIHNlYXJjaCBjcml0ZXJpYVxuICBmdW5jdGlvbiBzZWFyY2hGaWx0ZXIoKSB7XG4gICAgY29uc3QgdGVtcCA9IGJhY2t1cEluZm8uZmlsdGVyKChpdGVtKSA9PiB7XG4gICAgICBpZiAoaXRlbS5tYWNoaW5lRGF0YSkge1xuICAgICAgICBpZiAoc2VsZWN0ZWRPRU0gJiYgaXRlbS5tYWNoaW5lRGF0YS5PRU0gIT09IHNlbGVjdGVkT0VNKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmIChzZWxlY3RlZE1vZGFsaXR5ICYmIGl0ZW0ubWFjaGluZURhdGEuTW9kYWxpdHkgIT09IHNlbGVjdGVkTW9kYWxpdHkpXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZiAoc2VsZWN0ZWRDbGllbnQgJiYgaXRlbS5tYWNoaW5lRGF0YS5DbGllbnQgIT09IHNlbGVjdGVkQ2xpZW50KVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYgKHNlbGVjdGVkTW9kZWwgJiYgaXRlbS5tYWNoaW5lRGF0YS5Nb2RlbCAhPT0gc2VsZWN0ZWRNb2RlbClcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGlmIChcbiAgICAgICAgc2VsZWN0ID09PSBcIk5hbWVcIiAmJlxuICAgICAgICBpdGVtLm5hbWUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2gudG9Mb3dlckNhc2UoKSlcbiAgICAgIClcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICBpZiAoc2VsZWN0ID09PSBcIkRhdGVcIikge1xuICAgICAgICBjb25zdCBbbW9udGgsIGRheSwgeWVhcl0gPSBpdGVtLmRhdGUuc3BsaXQoXCIvXCIpO1xuICAgICAgICBjb25zdCByZWZvcm1hdHRlZERhdGUgPSBgJHt5ZWFyfS0ke21vbnRofS0ke2RheX1gO1xuICAgICAgICByZXR1cm4gcmVmb3JtYXR0ZWREYXRlID09PSBzZWFyY2g7XG4gICAgICB9XG4gICAgICBpZiAoc2VsZWN0ID09PSBcIldvcmsgT3JkZXJcIiAmJiBOdW1iZXIoaXRlbS53bykgPT09IE51bWJlcihzZWFyY2gpKVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIGlmIChzZWxlY3QgPT09IFwiUHJvZHVjdCBOdW1iZXJcIiAmJiBOdW1iZXIoaXRlbS5wbikgPT09IE51bWJlcihzZWFyY2gpKVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIGlmIChcbiAgICAgICAgc2VsZWN0ID09PSBcIkRlc2NyaXB0aW9uXCIgJiZcbiAgICAgICAgaXRlbS5kZXNjLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoLnRvTG93ZXJDYXNlKCkpXG4gICAgICApXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuICAgIHNldEluZm8odGVtcCk7XG4gIH1cblxuICAvLyBTb3J0IGl0ZW1zIGJhc2VkIG9uIGNvbHVtblxuICBmdW5jdGlvbiBzb3J0Q2hlY2tBbGwocG9zKSB7XG4gICAgY29uc3Qgc29ydGVkSW5mbyA9IFsuLi5pbmZvXS5zb3J0KChhLCBiKSA9PiB7XG4gICAgICBpZiAocG9zID09PSAwIHx8IHBvcyA9PT0gNSkge1xuICAgICAgICByZXR1cm4gYltzZWxlY3RdLmxvY2FsZUNvbXBhcmUoYVtzZWxlY3RdKTtcbiAgICAgIH1cbiAgICAgIGlmIChwb3MgPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIERhdGUucGFyc2UoYltzZWxlY3RdKSAtIERhdGUucGFyc2UoYVtzZWxlY3RdKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBOdW1iZXIoYltzZWxlY3RdKSAtIE51bWJlcihhW3NlbGVjdF0pO1xuICAgIH0pO1xuICAgIHNldEluZm8oc29ydGVkSW5mbyk7XG4gIH1cblxuICAvLyBSb3cgc2VsZWN0aW9uIGhhbmRsZXJcbiAgY29uc3Qgcm93U2VsZWN0ID0gKGl0ZW0pID0+IHtcbiAgICAvLyBpdGVtLmlkIG11c3QgYmUgcHJlc2VudCBpbiBmZXRjaFBhcnRzV2l0aE1hY2hpbmVEYXRhKCkgcmVzdWx0c1xuICAgIHNldFNlbGVjdGVkUGFyZW50KHsgaWQ6IGl0ZW0uaWQsIG5hbWU6IGl0ZW0ubmFtZSwgcG46IGl0ZW0ucG4gfSk7XG4gICAgaGFuZGxlQ2xvc2UoKTtcbiAgfTtcblxuICAvLyBEcm9wZG93biBoYW5kbGVyc1xuICBjb25zdCBbZHJvcGRvd24xVGV4dCwgc2V0RHJvcGRvd24xVGV4dF0gPSB1c2VTdGF0ZShcIlNlbGVjdCBPcHRpb25cIik7XG4gIGNvbnN0IFtkcm9wZG93bjJUZXh0LCBzZXREcm9wZG93bjJUZXh0XSA9IHVzZVN0YXRlKFwiU2VsZWN0IE9wdGlvblwiKTtcblxuICBjb25zdCBoYW5kbGVTZWxlY3QxID0gKGV2ZW50S2V5LCBldmVudCkgPT4ge1xuICAgIGlmIChldmVudEtleSA9PT0gXCJ1bmFzc2lnbmVkXCIpIHtcbiAgICAgIHNldERyb3Bkb3duMVRleHQoXCJTZWxlY3QgT3B0aW9uXCIpO1xuICAgICAgc2V0U2VsZWN0ZWRPRU0obnVsbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNldERyb3Bkb3duMVRleHQoZXZlbnQudGFyZ2V0LnRleHRDb250ZW50KTtcbiAgICAgIHNldFNlbGVjdGVkT0VNKGV2ZW50LnRhcmdldC50ZXh0Q29udGVudCk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVNlbGVjdDIgPSAoZXZlbnRLZXksIGV2ZW50KSA9PiB7XG4gICAgaWYgKGV2ZW50S2V5ID09PSBcInVuYXNzaWduZWRcIikge1xuICAgICAgc2V0RHJvcGRvd24yVGV4dChcIlNlbGVjdCBPcHRpb25cIik7XG4gICAgICBzZXRTZWxlY3RlZE1vZGFsaXR5KG51bGwpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZXREcm9wZG93bjJUZXh0KGV2ZW50LnRhcmdldC50ZXh0Q29udGVudCk7XG4gICAgICBzZXRTZWxlY3RlZE1vZGFsaXR5KGV2ZW50LnRhcmdldC50ZXh0Q29udGVudCk7XG4gICAgfVxuICB9O1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc2VhcmNoRmlsdGVyKCk7XG4gIH0sIFtzZWxlY3RlZE9FTSwgc2VsZWN0ZWRNb2RhbGl0eSwgc2VsZWN0ZWRDbGllbnQsIHNlbGVjdGVkTW9kZWwsIHNlYXJjaF0pO1xuXG4gIC8vIEZldGNoIGNsaWVudHMgYW5kIHNob3cgbW9kYWxcbiAgY29uc3QgaGFuZGxlQ2xpZW50Q2xpY2sgPSBhc3luYyAoKSA9PiB7XG4gICAgY29uc29sZS5sb2coXCJjbGlja2VkXCIpO1xuICAgIGNvbnN0IGNsaWVudHNEYXRhID0gYXdhaXQgZmV0Y2hDbGllbnRzKHNlbGVjdGVkT0VNLCBzZWxlY3RlZE1vZGFsaXR5KTtcbiAgICBzZXRDbGllbnRzKGNsaWVudHNEYXRhKTtcbiAgICBzZXRDbGllbnRTZWFyY2hUZXJtKFwiXCIpOyAvLyBSZXNldCBzZWFyY2ggdGVybVxuICAgIHNldFNob3dDbGllbnRNb2RhbCh0cnVlKTtcbiAgfTtcblxuICAvLyBDbGllbnQgc2VsZWN0aW9uIGhhbmRsZXJcbiAgY29uc3QgaGFuZGxlQ2xpZW50U2VsZWN0ID0gKGNsaWVudE5hbWUpID0+IHtcbiAgICBzZXRDbGllbnRCdXR0b25UZXh0KGNsaWVudE5hbWUgfHwgXCJTZWxlY3QgT3B0aW9uXCIpO1xuICAgIHNldFNlbGVjdGVkQ2xpZW50KGNsaWVudE5hbWUgfHwgbnVsbCk7XG4gICAgc2V0U2hvd0NsaWVudE1vZGFsKGZhbHNlKTtcbiAgfTtcblxuICAvLyBDbGllbnQgaW5mbyBoYW5kbGVyXG4gIGNvbnN0IGhhbmRsZUNsaWVudEluZm8gPSAoY2xpZW50SWQsIGNsaWVudE5hbWUpID0+IHtcbiAgICBjb25zb2xlLmxvZyhgQ2xpZW50IElEOiAke2NsaWVudElkfSwgQ2xpZW50IE5hbWU6ICR7Y2xpZW50TmFtZX1gKTtcbiAgfTtcblxuICAvLyBDbGVhciBjbGllbnQgc2VsZWN0aW9uIGhhbmRsZXJcbiAgY29uc3QgaGFuZGxlQ2xlYXJDbGllbnRTZWxlY3Rpb24gPSAoKSA9PiB7XG4gICAgc2V0Q2xpZW50QnV0dG9uVGV4dChcIlNlbGVjdCBPcHRpb25cIik7XG4gICAgc2V0U2VsZWN0ZWRDbGllbnQobnVsbCk7XG4gICAgc2V0U2hvd0NsaWVudE1vZGFsKGZhbHNlKTtcbiAgICBzZWFyY2hGaWx0ZXIoKTtcbiAgfTtcblxuICAvLyBGZXRjaCBtb2RlbHMgYW5kIHNob3cgbW9kYWxcbiAgY29uc3QgaGFuZGxlTW9kZWxDbGljayA9IGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBtb2RlbHNEYXRhID0gYXdhaXQgZmV0Y2hNb2RlbHMoXG4gICAgICBzZWxlY3RlZE9FTSxcbiAgICAgIHNlbGVjdGVkTW9kYWxpdHksXG4gICAgICBzZWxlY3RlZENsaWVudFxuICAgICk7XG4gICAgc2V0TW9kZWxzKG1vZGVsc0RhdGEpO1xuICAgIHNldE1vZGVsU2VhcmNoVGVybShcIlwiKTsgLy8gUmVzZXQgc2VhcmNoIHRlcm1cbiAgICBzZXRTaG93TW9kZWxNb2RhbCh0cnVlKTtcbiAgfTtcblxuICAvLyBNb2RlbCBzZWxlY3Rpb24gaGFuZGxlclxuICBjb25zdCBoYW5kbGVNb2RlbFNlbGVjdCA9IChtb2RlbE5hbWUpID0+IHtcbiAgICBzZXRNb2RlbEJ1dHRvblRleHQobW9kZWxOYW1lIHx8IFwiU2VsZWN0IE9wdGlvblwiKTtcbiAgICBzZXRTZWxlY3RlZE1vZGVsKG1vZGVsTmFtZSB8fCBudWxsKTtcbiAgICBzZXRTaG93TW9kZWxNb2RhbChmYWxzZSk7XG4gIH07XG5cbiAgLy8gQ2xlYXIgbW9kZWwgc2VsZWN0aW9uIGhhbmRsZXJcbiAgY29uc3QgaGFuZGxlQ2xlYXJNb2RlbFNlbGVjdGlvbiA9ICgpID0+IHtcbiAgICBzZXRNb2RlbEJ1dHRvblRleHQoXCJTZWxlY3QgT3B0aW9uXCIpO1xuICAgIHNldFNlbGVjdGVkTW9kZWwobnVsbCk7XG4gICAgc2V0U2hvd01vZGVsTW9kYWwoZmFsc2UpO1xuICAgIHNlYXJjaEZpbHRlcigpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVdhcmVob3VzZUNsaWNrID0gKCkgPT4ge1xuICAgIHNldENsaWVudEJ1dHRvblRleHQoQ0xJRU5UX1dBUkVIT1VTRSk7XG4gICAgc2V0U2VsZWN0ZWRDbGllbnQoQ0xJRU5UX1dBUkVIT1VTRSk7XG4gICAgc2VhcmNoRmlsdGVyKCk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlVW5hc3NpZ25lZENsaWNrID0gKCkgPT4ge1xuICAgIHNldENsaWVudEJ1dHRvblRleHQoQ0xJRU5UX1VOQVNTSUdORUQpO1xuICAgIHNldFNlbGVjdGVkQ2xpZW50KENMSUVOVF9VTkFTU0lHTkVEKTtcbiAgICBzZWFyY2hGaWx0ZXIoKTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxNb2RhbCBzaG93PXtzaG93fSBvbkhpZGU9e2hhbmRsZUNsb3NlfSBzaXplPVwibGdcIiBjZW50ZXJlZCBzY3JvbGxhYmxlIGRpYWxvZ0NsYXNzTmFtZT1cInBhcmVudC1tb2RhbC1kaWFsb2dcIiA+XG4gICAgICA8TW9kYWwuSGVhZGVyIGNsb3NlQnV0dG9uPlxuICAgICAgICA8TW9kYWwuVGl0bGU+U2VsZWN0IFBhcmVudDwvTW9kYWwuVGl0bGU+XG4gICAgICA8L01vZGFsLkhlYWRlcj5cbiAgICAgIDxNb2RhbC5Cb2R5IHN0eWxlPXt7IG1heEhlaWdodDogXCI3NXZoXCIsIG92ZXJmbG93WTogXCJhdXRvXCIgfX0+XG4gICAgICAgIDxDb250YWluZXJcbiAgICAgICAgICBjbGFzc05hbWU9XCJkLWZsZXggYWxpZ24taXRlbXMtY2VudGVyIGp1c3RpZnktY29udGVudC1jZW50ZXJcIlxuICAgICAgICAgIHN0eWxlPXt7IG1pbkhlaWdodDogXCJ1bnNldFwiIH19XG4gICAgICAgID5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctMTAwXCIgc3R5bGU9e3sgbWF4V2lkdGg6IFwiMTIwMHB4XCIgfX0+XG4gICAgICAgICAgICA8Q2FyZD5cbiAgICAgICAgICAgICAgPENhcmQuQm9keT5cbiAgICAgICAgICAgICAgICA8Um93PlxuICAgICAgICAgICAgICAgICAgPENvbCBtZD17NH0+XG4gICAgICAgICAgICAgICAgICAgIHsvKiBEcm9wZG93bnMgKi99XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPElucHV0R3JvdXAgY2xhc3NOYW1lPVwibWItM1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPElucHV0R3JvdXAuVGV4dD5PRU08L0lucHV0R3JvdXAuVGV4dD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxEcm9wZG93biBvblNlbGVjdD17aGFuZGxlU2VsZWN0MX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxEcm9wZG93bi5Ub2dnbGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXJpYW50PVwib3V0bGluZS1zZWNvbmRhcnlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkPVwiZHJvcGRvd24tYnV0dG9uLTFcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctMTAwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtkcm9wZG93bjFUZXh0fVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L0Ryb3Bkb3duLlRvZ2dsZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPERyb3Bkb3duLk1lbnUgY2xhc3NOYW1lPVwidy0xMDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RHJvcGRvd24uSXRlbSBldmVudEtleT1cInVuYXNzaWduZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNlbGVjdCBPcHRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0Ryb3Bkb3duLkl0ZW0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPERyb3Bkb3duLkl0ZW0gZXZlbnRLZXk9XCJHRVwiPkdFPC9Ecm9wZG93bi5JdGVtPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxEcm9wZG93bi5JdGVtIGV2ZW50S2V5PVwiVG9zaGliYVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVG9zaGliYVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRHJvcGRvd24uSXRlbT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RHJvcGRvd24uSXRlbSBldmVudEtleT1cIlNpZW1lbnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNpZW1lbnNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0Ryb3Bkb3duLkl0ZW0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPERyb3Bkb3duLkl0ZW0gZXZlbnRLZXk9XCJQaGlsaXBzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBQaGlsaXBzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Ecm9wZG93bi5JdGVtPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L0Ryb3Bkb3duLk1lbnU+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L0Ryb3Bkb3duPlxuICAgICAgICAgICAgICAgICAgICAgIDwvSW5wdXRHcm91cD5cblxuICAgICAgICAgICAgICAgICAgICAgIDxJbnB1dEdyb3VwIGNsYXNzTmFtZT1cIm1iLTNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxJbnB1dEdyb3VwLlRleHQ+TW9kYWxpdHk8L0lucHV0R3JvdXAuVGV4dD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxEcm9wZG93biBvblNlbGVjdD17aGFuZGxlU2VsZWN0Mn0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxEcm9wZG93bi5Ub2dnbGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXJpYW50PVwib3V0bGluZS1zZWNvbmRhcnlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkPVwiZHJvcGRvd24tYnV0dG9uLTJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctMTAwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtkcm9wZG93bjJUZXh0fVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L0Ryb3Bkb3duLlRvZ2dsZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPERyb3Bkb3duLk1lbnUgY2xhc3NOYW1lPVwidy0xMDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RHJvcGRvd24uSXRlbSBldmVudEtleT1cInVuYXNzaWduZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNlbGVjdCBPcHRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0Ryb3Bkb3duLkl0ZW0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPERyb3Bkb3duLkl0ZW0gZXZlbnRLZXk9XCJDVFwiPkNUPC9Ecm9wZG93bi5JdGVtPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxEcm9wZG93bi5JdGVtIGV2ZW50S2V5PVwiTVJJXCI+TVJJPC9Ecm9wZG93bi5JdGVtPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L0Ryb3Bkb3duLk1lbnU+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L0Ryb3Bkb3duPlxuICAgICAgICAgICAgICAgICAgICAgIDwvSW5wdXRHcm91cD5cblxuICAgICAgICAgICAgICAgICAgICAgIHsvKiBCdXR0b25zICovfVxuICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8SW5wdXRHcm91cCBjbGFzc05hbWU9XCJtYi0zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxJbnB1dEdyb3VwLlRleHQ+Q2xpZW50PC9JbnB1dEdyb3VwLlRleHQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXJpYW50PVwib3V0bGluZS1zZWNvbmRhcnlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctMTAwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVDbGllbnRDbGlja31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtjbGllbnRCdXR0b25UZXh0fVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvSW5wdXRHcm91cD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxJbnB1dEdyb3VwIGNsYXNzTmFtZT1cIm1iLTNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPElucHV0R3JvdXAuVGV4dD5DbGllbnQtMjwvSW5wdXRHcm91cC5UZXh0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFudD1cIm91dGxpbmUtc2Vjb25kYXJ5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LTEwMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNlbGVjdCBPcHRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L0lucHV0R3JvdXA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8SW5wdXRHcm91cCBjbGFzc05hbWU9XCJtYi0zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxJbnB1dEdyb3VwLlRleHQ+TW9kZWw8L0lucHV0R3JvdXAuVGV4dD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhbnQ9XCJvdXRsaW5lLXNlY29uZGFyeVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy0xMDBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZU1vZGVsQ2xpY2t9XG4gICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bW9kZWxCdXR0b25UZXh0fVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvSW5wdXRHcm91cD5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsvKiBEaXZpZGVyICovfVxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5kaXZpZGVyfT48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxJbnB1dEdyb3VwIGNsYXNzTmFtZT1cIm1iLTNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPElucHV0R3JvdXAuVGV4dD5XYXJlaG91c2U8L0lucHV0R3JvdXAuVGV4dD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5idXR0b25Hcm91cH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFudD1cIm91dGxpbmUtc2Vjb25kYXJ5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17c3R5bGVzLmZsZXhCdXR0b259XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVXYXJlaG91c2VDbGlja31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBXYXJlaG91c2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXJpYW50PVwib3V0bGluZS1zZWNvbmRhcnlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMuZmxleEJ1dHRvbn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZVVuYXNzaWduZWRDbGlja31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBVbmFzc2lnbmVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9JbnB1dEdyb3VwPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvQ29sPlxuXG4gICAgICAgICAgICAgICAgICA8Q29sIG1kPXs4fT5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy50YWJsZUNvbnRhaW5lcn0+XG4gICAgICAgICAgICAgICAgICAgICAgPFRhYmxlIHN0cmlwZWQgYm9yZGVyZWQgaG92ZXIgc2l6ZT1cInNtXCIgY2xhc3NOYW1lPVwibWItMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoZWFkIGNsYXNzTmFtZT17c3R5bGVzLnN0aWNreUhlYWRlcn0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggb25DbGljaz17KCkgPT4gc29ydENoZWNrQWxsKDApfT5OYW1lPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggb25DbGljaz17KCkgPT4gc29ydENoZWNrQWxsKDEpfT5EYXRlPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggb25DbGljaz17KCkgPT4gc29ydENoZWNrQWxsKDIpfT5Xb3JrIE9yZGVyPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggb25DbGljaz17KCkgPT4gc29ydENoZWNrQWxsKDMpfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFByb2R1Y3QgTnVtYmVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggb25DbGljaz17KCkgPT4gc29ydENoZWNrQWxsKDQpfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNlcmlhbCBOdW1iZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5TZWxlY3Q8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAge2luZm8ubWFwKChpdGVtKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyIGNsYXNzTmFtZT1cImNsaWNrYWJsZS1yb3dcIiBrZXk9e2l0ZW0uaWR9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPntpdGVtLm5hbWV9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD57Zm9ybWF0RGF0ZShpdGVtLmRhdGUpfTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtpdGVtLndvcmtPcmRlcnMgJiYgaXRlbS53b3JrT3JkZXJzLmxlbmd0aCA+IDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IGl0ZW0ud29ya09yZGVyc1tpdGVtLndvcmtPcmRlcnMubGVuZ3RoIC0gMV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLndvcmtPcmRlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogXCJOL0FcIn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+e2l0ZW0ucG59PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD57aXRlbS5zbn08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFudD1cInByaW1hcnlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHJvd1NlbGVjdChpdGVtKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNlbGVjdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgICAgICAgICAgICAgIDwvVGFibGU+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5zZWFyY2hDb250YWluZXJ9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm0gY2xhc3NOYW1lPVwiZC1mbGV4IHBiLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT17c2hvd0xpc3RTZWFyY2h9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJTZWFyY2hcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1lLTIgZmxleC1ncm93LTFcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJTZWFyY2hcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtzZWFyY2h9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3NlYXJjaENoYW5nZUhhbmRsZXJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgZmxleDogXCIxXCIgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPE5hdkRyb3Bkb3duXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU9e3NlbGVjdH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZD1cImNvbGxhc2libGUtbmF2LWRyb3Bkb3duXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93PXtzaG93TGlzdH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbk1vdXNlRW50ZXI9eygpID0+IHNldFNob3dMaXN0KHRydWUpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uTW91c2VMZWF2ZT17KCkgPT4gc2V0U2hvd0xpc3QoZmFsc2UpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IG1hcmdpblRvcDogXCItNXB4XCIgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxOYXZEcm9wZG93bi5JdGVtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTZWxlY3QoXCJOYW1lXCIpICYgc2V0U2hvd0xpc3RTZWFyY2goXCJ0ZXh0XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvTmF2RHJvcGRvd24uSXRlbT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TmF2RHJvcGRvd24uSXRlbVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2VsZWN0KFwiRGF0ZVwiKSAmIHNldFNob3dMaXN0U2VhcmNoKFwiZGF0ZVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIERhdGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L05hdkRyb3Bkb3duLkl0ZW0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPE5hdkRyb3Bkb3duLkl0ZW1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNlbGVjdChcIldvcmsgT3JkZXJcIikgJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTaG93TGlzdFNlYXJjaChcIm51bWJlclwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFdvcmsgT3JkZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L05hdkRyb3Bkb3duLkl0ZW0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPE5hdkRyb3Bkb3duLkl0ZW1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNlbGVjdChcIlByb2R1Y3QgTnVtYmVyXCIpICZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2hvd0xpc3RTZWFyY2goXCJudW1iZXJcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBQcm9kdWN0IE51bWJlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvTmF2RHJvcGRvd24uSXRlbT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TmF2RHJvcGRvd24uSXRlbVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2VsZWN0KFwiRGVzY3JpcHRpb25cIikgJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTaG93TGlzdFNlYXJjaChcInRleHRcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEZXNjcmlwdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvTmF2RHJvcGRvd24uSXRlbT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9OYXZEcm9wZG93bj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgey8qIDxCdXR0b24gdmFyaWFudD1cImluZm9cIiBvbkNsaWNrPXtzZWFyY2hGaWx0ZXJ9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNlYXJjaFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj4gKi99XG4gICAgICAgICAgICAgICAgICAgICAgICA8L0Zvcm0+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9Db2w+XG4gICAgICAgICAgICAgICAgPC9Sb3c+XG4gICAgICAgICAgICAgIDwvQ2FyZC5Cb2R5PlxuICAgICAgICAgICAgPC9DYXJkPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L0NvbnRhaW5lcj5cbiAgICAgIDwvTW9kYWwuQm9keT5cbiAgICAgIDxNb2RhbC5Gb290ZXI+XG4gICAgICAgIDxCdXR0b24gdmFyaWFudD1cInNlY29uZGFyeVwiIG9uQ2xpY2s9e2hhbmRsZUNsb3NlfT5cbiAgICAgICAgICBDYW5jZWxcbiAgICAgICAgPC9CdXR0b24+XG4gICAgICAgIDxCdXR0b25cbiAgICAgICAgICB2YXJpYW50PVwid2FybmluZ1wiXG4gICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgc2V0U2VsZWN0ZWRQYXJlbnQobnVsbCk7XG4gICAgICAgICAgICBoYW5kbGVDbG9zZSgpO1xuICAgICAgICAgIH19XG4gICAgICAgID5cbiAgICAgICAgICBDbGVhciBTZWxlY3Rpb25cbiAgICAgICAgPC9CdXR0b24+XG4gICAgICA8L01vZGFsLkZvb3Rlcj5cbiAgICAgIDxNb2RhbCBzaG93PXtzaG93Q2xpZW50TW9kYWx9IG9uSGlkZT17aGFuZGxlQ2xvc2VDbGllbnRNb2RhbH0+XG4gICAgICAgIDxNb2RhbC5IZWFkZXIgY2xvc2VCdXR0b24+XG4gICAgICAgICAgPE1vZGFsLlRpdGxlPlNlbGVjdCBDbGllbnQ8L01vZGFsLlRpdGxlPlxuICAgICAgICA8L01vZGFsLkhlYWRlcj5cbiAgICAgICAgPE1vZGFsLkJvZHk+XG4gICAgICAgICAgPEZvcm1Db250cm9sXG4gICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlNlYXJjaCBieSBuYW1lXCJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1iLTNcIlxuICAgICAgICAgICAgdmFsdWU9e2NsaWVudFNlYXJjaFRlcm19XG4gICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldENsaWVudFNlYXJjaFRlcm0oZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPENsaWVudFRhYmxlXG4gICAgICAgICAgICBjbGllbnRzPXtjbGllbnRzLmZpbHRlcigoY2xpZW50KSA9PlxuICAgICAgICAgICAgICBjbGllbnQubmFtZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKGNsaWVudFNlYXJjaFRlcm0udG9Mb3dlckNhc2UoKSlcbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICBkaXNhYmxlSW5mbz17dHJ1ZX1cbiAgICAgICAgICAgIG9uU2VsZWN0Q2xpZW50PXtoYW5kbGVDbGllbnRTZWxlY3R9XG4gICAgICAgICAgICBvbkluZm9DbGljaz17aGFuZGxlQ2xpZW50SW5mb31cbiAgICAgICAgICAgIGNsZWFyU2VsZWN0aW9uPXsoKSA9PiBoYW5kbGVDbGllbnRTZWxlY3QobnVsbCl9IC8vIENsZWFyIHNlbGVjdGlvbiBoYW5kbGVyXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9Nb2RhbC5Cb2R5PlxuICAgICAgPC9Nb2RhbD5cblxuICAgICAgPE1vZGFsIHNob3c9e3Nob3dNb2RlbE1vZGFsfSBvbkhpZGU9e2hhbmRsZUNsb3NlTW9kZWxNb2RhbH0+XG4gICAgICAgIDxNb2RhbC5IZWFkZXIgY2xvc2VCdXR0b24+XG4gICAgICAgICAgPE1vZGFsLlRpdGxlPlNlbGVjdCBNb2RlbDwvTW9kYWwuVGl0bGU+XG4gICAgICAgIDwvTW9kYWwuSGVhZGVyPlxuICAgICAgICA8TW9kYWwuQm9keT5cbiAgICAgICAgICA8Rm9ybUNvbnRyb2xcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoIGJ5IG5hbWVcIlxuICAgICAgICAgICAgY2xhc3NOYW1lPVwibWItM1wiXG4gICAgICAgICAgICB2YWx1ZT17bW9kZWxTZWFyY2hUZXJtfVxuICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRNb2RlbFNlYXJjaFRlcm0oZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPE1vZGVsVGFibGVcbiAgICAgICAgICAgIG1vZGVscz17bW9kZWxzLmZpbHRlcigobW9kZWwpID0+XG4gICAgICAgICAgICAgIHR5cGVvZiBtb2RlbCA9PT0gXCJzdHJpbmdcIlxuICAgICAgICAgICAgICAgID8gbW9kZWwudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhtb2RlbFNlYXJjaFRlcm0udG9Mb3dlckNhc2UoKSlcbiAgICAgICAgICAgICAgICA6IGZhbHNlXG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgb25TZWxlY3RNb2RlbD17aGFuZGxlTW9kZWxTZWxlY3R9XG4gICAgICAgICAgICBjbGVhclNlbGVjdGlvbj17KCkgPT4gaGFuZGxlTW9kZWxTZWxlY3QobnVsbCl9IC8vIENsZWFyIHNlbGVjdGlvbiBoYW5kbGVyXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9Nb2RhbC5Cb2R5PlxuICAgICAgPC9Nb2RhbD5cbiAgICA8L01vZGFsPlxuICApO1xufTtcbjxzdHlsZSBqc3ggZ2xvYmFsPntgXG4gIC8qIENvbnN0cmFpbiB0aGUgbW9kYWwgZGlhbG9nIHdpZHRoIHRvIHZpZXdwb3J0ICovXG4gIC5wYXJlbnQtbW9kYWwtZGlhbG9nIHtcbiAgICBtYXgtd2lkdGg6IDk1dnc7XG4gICAgbWFyZ2luOiAwIGF1dG87XG4gIH1cbiAgLyogSWYgdGhlIHRhYmxlIGNvbnRhaW5lciBoYXMgYSBmaXhlZCBoZWlnaHQgYWxyZWFkeSwga2VlcCBpdOKAlGJ1dCBlbnN1cmUgaXQgbmV2ZXIgZXhjZWVkcyBib2R5ICovXG4gIC5wYXJlbnQtbW9kYWwtZGlhbG9nIC5tb2RhbC1ib2R5IC4ke3N0eWxlcy50YWJsZUNvbnRhaW5lcn0ge1xuICAgIG1heC1oZWlnaHQ6IDcwdmg7XG4gICAgb3ZlcmZsb3c6IGF1dG87XG4gIH1cbmB9PC9zdHlsZT5cbmV4cG9ydCBkZWZhdWx0IFBhcmVudE1vZGFsO1xuIl19 */
/*@ sourceURL=C:\\Users\\mack2\\Desktop\\code\\pages\\NewSearch\\AddItem\\parentModal.js */`);

/* harmony default export */ __webpack_exports__["default"] = (ParentModal);

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

/***/ "./pages/NewSearch/InfoModal.js":
/*!**************************************!*\
  !*** ./pages/NewSearch/InfoModal.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-bootstrap */ "react-bootstrap");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__);
var _jsxFileName = "C:\\Users\\mack2\\Desktop\\code\\pages\\NewSearch\\InfoModal.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;
// InfoModal.js



const InfoModal = ({
  show,
  handleClose,
  itemName,
  dimensions,
  price,
  freqI,
  freqM,
  usage
}) => {
  return __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"], {
    show: show,
    onHide: handleClose,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7,
      columnNumber: 5
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Header, {
    closeButton: true,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8,
      columnNumber: 7
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Title, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9,
      columnNumber: 9
    }
  }, "Item Info")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Body, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11,
      columnNumber: 7
    }
  }, __jsx("p", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12,
      columnNumber: 9
    }
  }, __jsx("strong", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12,
      columnNumber: 12
    }
  }, "Name:"), " ", itemName, " "), __jsx("p", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13,
      columnNumber: 9
    }
  }, __jsx("strong", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13,
      columnNumber: 12
    }
  }, "Dimensions:"), " ", dimensions), __jsx("p", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14,
      columnNumber: 9
    }
  }, __jsx("strong", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14,
      columnNumber: 12
    }
  }, "Price:"), " ", price), __jsx("p", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15,
      columnNumber: 9
    }
  }, __jsx("strong", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15,
      columnNumber: 12
    }
  }, "Frequency of item:"), " ", freqI, " "), __jsx("p", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16,
      columnNumber: 9
    }
  }, __jsx("strong", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16,
      columnNumber: 12
    }
  }, "Frequency of Machine:"), " ", freqM, " "), __jsx("p", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17,
      columnNumber: 9
    }
  }, __jsx("strong", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17,
      columnNumber: 12
    }
  }, "Usage past 1 year:"), " ", usage, " ")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Footer, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19,
      columnNumber: 7
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    variant: "secondary",
    onClick: handleClose,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20,
      columnNumber: 9
    }
  }, "Close")));
};

/* harmony default export */ __webpack_exports__["default"] = (InfoModal);

/***/ }),

/***/ "./pages/NewSearch/item/[id]/MachineSelectionModal.js":
/*!************************************************************!*\
  !*** ./pages/NewSearch/item/[id]/MachineSelectionModal.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MachineSelectionModal; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-bootstrap */ "react-bootstrap");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_fetchAssociations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../utils/fetchAssociations */ "./utils/fetchAssociations.js");
var _jsxFileName = "C:\\Users\\mack2\\Desktop\\code\\pages\\NewSearch\\item\\[id]\\MachineSelectionModal.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;


 // Assuming you already have this

function MachineSelectionModal({
  show,
  handleClose,
  setMachine
}) {
  const {
    0: Modality,
    1: setModality
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null);
  const {
    0: OEM,
    1: setOEM
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null);
  const {
    0: models,
    1: setModels
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const {
    0: selectedModel,
    1: setSelectedModel
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null);
  const {
    0: loadingModels,
    1: setLoadingModels
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false); // Fetch models when Modality and OEM are selected

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    if (Modality && OEM) {
      setLoadingModels(true);
      Object(_utils_fetchAssociations__WEBPACK_IMPORTED_MODULE_2__["fetchModels"])(OEM, Modality).then(fetchedModels => {
        setModels(fetchedModels);
        setLoadingModels(false);
      }).catch(error => {
        console.error("Error fetching models: ", error);
        setLoadingModels(false);
      });
    }
  }, [Modality, OEM]);

  const handleModalitySelect = selectedModality => {
    setModality(selectedModality);
    setOEM(null); // Reset OEM and Model when Modality changes

    setSelectedModel(null);
  };

  const handleOEMSelect = selectedOEM => {
    setOEM(selectedOEM);
    setSelectedModel(null); // Reset Model when OEM changes
  };

  const handleModelSelect = model => {
    setSelectedModel(model);
  };

  const handleSaveSelection = () => {
    if (selectedModel) {
      // Pass selected machine data back to the parent
      setMachine({
        Modality,
        OEM,
        Model: selectedModel
      });
      handleClose(); // Close the modal
    }
  };

  return __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"], {
    show: show,
    onHide: handleClose,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 52,
      columnNumber: 5
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Header, {
    closeButton: true,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 53,
      columnNumber: 7
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Title, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54,
      columnNumber: 9
    }
  }, "Select Machine")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Body, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 56,
      columnNumber: 7
    }
  }, __jsx("div", {
    className: "mb-3",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 57,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Dropdown"], {
    onSelect: handleModalitySelect,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 58,
      columnNumber: 11
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Dropdown"].Toggle, {
    variant: "outline-secondary",
    className: "w-100",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 59,
      columnNumber: 13
    }
  }, Modality || "Select Modality"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Dropdown"].Menu, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 62,
      columnNumber: 13
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Dropdown"].Item, {
    eventKey: "CT",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 63,
      columnNumber: 15
    }
  }, "CT"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Dropdown"].Item, {
    eventKey: "MRI",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 64,
      columnNumber: 15
    }
  }, "MRI")))), Modality && __jsx("div", {
    className: "mb-3",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 70,
      columnNumber: 11
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Dropdown"], {
    onSelect: handleOEMSelect,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 71,
      columnNumber: 13
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Dropdown"].Toggle, {
    variant: "outline-secondary",
    className: "w-100",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 72,
      columnNumber: 15
    }
  }, OEM || "Select OEM"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Dropdown"].Menu, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 75,
      columnNumber: 15
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Dropdown"].Item, {
    eventKey: "GE",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 76,
      columnNumber: 17
    }
  }, "GE"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Dropdown"].Item, {
    eventKey: "Philips",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 77,
      columnNumber: 17
    }
  }, "Philips"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Dropdown"].Item, {
    eventKey: "Siemens",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 78,
      columnNumber: 17
    }
  }, "Siemens"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Dropdown"].Item, {
    eventKey: "Toshiba",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 79,
      columnNumber: 17
    }
  }, "Toshiba")))), Modality && OEM && __jsx("div", {
    className: "mb-3",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 86,
      columnNumber: 11
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["FormControl"], {
    placeholder: "Search models",
    "aria-label": "Search models",
    "aria-describedby": "basic-addon2",
    onChange: e => setSelectedModel(e.target.value),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 87,
      columnNumber: 13
    }
  }), loadingModels ? __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Spinner"], {
    animation: "border",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 94,
      columnNumber: 15
    }
  }) : models.length > 0 && __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Dropdown"], {
    onSelect: handleModelSelect,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 97,
      columnNumber: 17
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Dropdown"].Toggle, {
    variant: "outline-secondary",
    className: "w-100",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 98,
      columnNumber: 19
    }
  }, selectedModel || "Select Model"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Dropdown"].Menu, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 101,
      columnNumber: 19
    }
  }, models.map(model => __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Dropdown"].Item, {
    key: model,
    eventKey: model,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 103,
      columnNumber: 23
    }
  }, model)))))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Footer, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 114,
      columnNumber: 7
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    variant: "secondary",
    onClick: handleClose,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 115,
      columnNumber: 9
    }
  }, "Close"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    variant: "primary",
    onClick: handleSaveSelection,
    disabled: !selectedModel,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 118,
      columnNumber: 9
    }
  }, "Save Selection")));
}

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

/***/ "./styles/PartTable.module.css":
/*!*************************************!*\
  !*** ./styles/PartTable.module.css ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Exports
module.exports = {
	"tableContainer": "PartTable_tableContainer__18TCg",
	"scrollableTable": "PartTable_scrollableTable__2TybW",
	"stickyHeader": "PartTable_stickyHeader__1HJK1",
	"searchContainer": "PartTable_searchContainer__2r7ak",
	"divider": "PartTable_divider__1QxCq",
	"buttonGroup": "PartTable_buttonGroup__3ZfOO",
	"flexButton": "PartTable_flexButton__2po2e",
	"fixedTable": "PartTable_fixedTable__3hJCc",
	"cellClamp": "PartTable_cellClamp__3itXM",
	"actionCol": "PartTable_actionCol__2xfPb"
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

/***/ "./utils/ModelTable.js":
/*!*****************************!*\
  !*** ./utils/ModelTable.js ***!
  \*****************************/
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
var _jsxFileName = "C:\\Users\\mack2\\Desktop\\code\\utils\\ModelTable.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;
// components/ModelTable.js




const ModelTable = ({
  models,
  onSelectModel,
  clearSelection
}) => {
  return __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Table"], {
    striped: true,
    bordered: true,
    hover: true,
    size: "sm",
    className: _styles_ClientTable_module_css__WEBPACK_IMPORTED_MODULE_2___default.a.modelTable,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9,
      columnNumber: 7
    }
  }, __jsx("thead", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10,
      columnNumber: 9
    }
  }, __jsx("tr", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11,
      columnNumber: 11
    }
  }, __jsx("th", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12,
      columnNumber: 13
    }
  }, "Model Name"), __jsx("th", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13,
      columnNumber: 13
    }
  }, "Select"))), __jsx("tbody", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16,
      columnNumber: 9
    }
  }, __jsx("tr", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17,
      columnNumber: 11
    }
  }, __jsx("td", {
    colSpan: "2",
    style: {
      textAlign: "center"
    },
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18,
      columnNumber: 13
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    variant: "secondary",
    onClick: clearSelection,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19,
      columnNumber: 15
    }
  }, "Clear Selection"))), models.map((model, index) => __jsx("tr", {
    key: index,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25,
      columnNumber: 13
    }
  }, __jsx("td", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26,
      columnNumber: 15
    }
  }, model), __jsx("td", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27,
      columnNumber: 15
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    variant: "primary",
    onClick: () => onSelectModel(model),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28,
      columnNumber: 17
    }
  }, "Select")))))));
};

/* harmony default export */ __webpack_exports__["default"] = (ModelTable);

/***/ }),

/***/ "./utils/PartTable.js":
/*!****************************!*\
  !*** ./utils/PartTable.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PartTable; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-bootstrap */ "react-bootstrap");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _fetchAssociations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./fetchAssociations */ "./utils/fetchAssociations.js");
/* harmony import */ var _styles_PartTable_module_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../styles/PartTable.module.css */ "./styles/PartTable.module.css");
/* harmony import */ var _styles_PartTable_module_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_PartTable_module_css__WEBPACK_IMPORTED_MODULE_3__);
var _jsxFileName = "C:\\Users\\mack2\\Desktop\\code\\utils\\PartTable.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;




function PartTable({
  info,
  labels,
  ids,
  hoverStyle,
  sortCheckAll,
  checkDelete,
  isDeleting,
  rowSelect,
  setHoverIndex,
  hoverIndex,
  selectedItems,
  setSelectedItems
}) {
  // const [selectedItems, setSelectedItems] = useState([]);
  // Toggle selection of items
  const handleSelectItem = id => {
    setSelectedItems(prevSelectedItems => prevSelectedItems.includes(id) ? prevSelectedItems.filter(itemId => itemId !== id) : [...prevSelectedItems, id]);
  }; // Handle delete button click for selected items


  const handleDeleteSelected = () => {
    if (selectedItems.length > 0) {
      checkDelete(null, null, selectedItems, "selected items");
    }
  };

  return __jsx("div", {
    className: _styles_PartTable_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.scrollableTable,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 40,
      columnNumber: 5
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Table"], {
    striped: true,
    bordered: true,
    hover: true,
    size: "sm",
    className: `mb-0 ${_styles_PartTable_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.fixedTable}`,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 41,
      columnNumber: 7
    }
  }, __jsx("thead", {
    className: _styles_PartTable_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.stickyHeader,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 42,
      columnNumber: 9
    }
  }, __jsx("tr", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 43,
      columnNumber: 11
    }
  }, labels.map((item, index) => __jsx("th", {
    style: hoverStyle(index),
    onMouseOver: () => setHoverIndex(index),
    onMouseOut: () => setHoverIndex(null),
    onClick: () => sortCheckAll(index),
    key: index,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 45,
      columnNumber: 15
    }
  }, item)), __jsx("th", {
    className: _styles_PartTable_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.actionCol,
    style: {
      textAlign: "center"
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55,
      columnNumber: 13
    }
  }, selectedItems.length > 0 ? __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    variant: "danger",
    onClick: handleDeleteSelected,
    disabled: isDeleting,
    size: "sm",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 57,
      columnNumber: 17
    }
  }, "Delete Selected (", selectedItems.length, ")") : "select"))), __jsx("tbody", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 71,
      columnNumber: 9
    }
  }, info.map((item, index) => __jsx("tr", {
    key: index,
    onClick: e => {
      // Only trigger rowSelect if the target is not a checkbox
      if (e.target.type !== "checkbox") {
        rowSelect(item);
      }
    },
    className: "clickable-row",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 73,
      columnNumber: 13
    }
  }, __jsx("td", {
    style: {
      textAlign: "center",
      cursor: "default"
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 83,
      columnNumber: 15
    }
  }, __jsx("div", {
    className: _styles_PartTable_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.cellClamp,
    title: item.name,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 84,
      columnNumber: 17
    }
  }, item.name)), __jsx("td", {
    style: {
      textAlign: "center",
      cursor: "default"
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 88,
      columnNumber: 15
    }
  }, __jsx("div", {
    className: _styles_PartTable_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.cellClamp,
    title: Object(_fetchAssociations__WEBPACK_IMPORTED_MODULE_2__["formatDate"])(item.date),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 89,
      columnNumber: 17
    }
  }, Object(_fetchAssociations__WEBPACK_IMPORTED_MODULE_2__["formatDate"])(item.date))), __jsx("td", {
    style: {
      textAlign: "center",
      cursor: "default"
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 93,
      columnNumber: 15
    }
  }, __jsx("div", {
    className: _styles_PartTable_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.cellClamp,
    title: item.workOrders && item.workOrders.length > 0 ? item.workOrders[item.workOrders.length - 1].workOrder : "N/A",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 94,
      columnNumber: 17
    }
  }, item.workOrders && item.workOrders.length > 0 ? item.workOrders[item.workOrders.length - 1].workOrder : "N/A")), __jsx("td", {
    style: {
      textAlign: "center",
      cursor: "default"
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 107,
      columnNumber: 15
    }
  }, __jsx("div", {
    className: _styles_PartTable_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.cellClamp,
    title: item.pn,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 108,
      columnNumber: 17
    }
  }, item.pn)), __jsx("td", {
    style: {
      textAlign: "center",
      cursor: "default"
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 112,
      columnNumber: 15
    }
  }, __jsx("div", {
    className: _styles_PartTable_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.cellClamp,
    title: item.sn,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 113,
      columnNumber: 17
    }
  }, item.sn)), __jsx("td", {
    className: _styles_PartTable_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.actionCol,
    style: {
      textAlign: "center"
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 117,
      columnNumber: 15
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Check, {
    type: "checkbox",
    checked: selectedItems.includes(item.id),
    onChange: e => {
      e.stopPropagation(); // Prevent row click when checkbox is clicked
      // Toggle selection using item.id directly

      setSelectedItems(prevSelectedItems => prevSelectedItems.includes(item.id) ? prevSelectedItems.filter(id => id !== item.id) : [...prevSelectedItems, item.id]);
    },
    "aria-label": `Select ${item.name}`,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 118,
      columnNumber: 17
    }
  })))), info.length < 10 && Array.from({
    length: 10 - info.length
  }).map((_, index) => __jsx("tr", {
    key: `empty-${index}`,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 137,
      columnNumber: 15
    }
  }, __jsx("td", {
    colSpan: labels.length + 1,
    style: {
      textAlign: "center"
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 138,
      columnNumber: 17
    }
  }, "\xA0"))))));
}

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

/***/ "next/dynamic":
/*!*******************************!*\
  !*** external "next/dynamic" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next/dynamic");

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

/***/ }),

/***/ "react-is":
/*!***************************!*\
  !*** external "react-is" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-is");

/***/ }),

/***/ "react-qr-barcode-scanner":
/*!*******************************************!*\
  !*** external "react-qr-barcode-scanner" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-qr-barcode-scanner");

/***/ }),

/***/ "styled-jsx/style":
/*!***********************************!*\
  !*** external "styled-jsx/style" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("styled-jsx/style");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibmV4dC9kaXN0L25leHQtc2VydmVyL2xpYi9yb3V0ZXItY29udGV4dC5qc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm5leHQvZGlzdC9uZXh0LXNlcnZlci9saWIvcm91dGVyL3V0aWxzL2dldC1hc3NldC1wYXRoLWZyb20tcm91dGUuanNcIiIsIndlYnBhY2s6Ly8vLi9jb250ZXh0L0F1dGhVc2VyQ29udGV4dC5qcyIsIndlYnBhY2s6Ly8vLi9jb250ZXh0L0ZpcmViYXNlLmpzIiwid2VicGFjazovLy8uL2NvbnRleHQvdXNlRmlyZWJhc2VBdXRoLmpzIiwid2VicGFjazovLy8uLi8uLi9jbGllbnQvbGluay50c3giLCJ3ZWJwYWNrOi8vLy4uLy4uL2NsaWVudC9ub3JtYWxpemUtdHJhaWxpbmctc2xhc2gudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uL2NsaWVudC9yZXF1ZXN0LWlkbGUtY2FsbGJhY2sudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uL2NsaWVudC9yb3V0ZS1sb2FkZXIudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uL2NsaWVudC9yb3V0ZXIudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uL2NsaWVudC91c2UtaW50ZXJzZWN0aW9uLnRzeCIsIndlYnBhY2s6Ly8vLi4vLi4vY2xpZW50L3dpdGgtcm91dGVyLnRzeCIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL3BhdGgtdG8tcmVnZXhwL2luZGV4LmpzIiwid2VicGFjazovLy8uLi8uLi8uLi8uLi9uZXh0LXNlcnZlci9saWIvaTE4bi9ub3JtYWxpemUtbG9jYWxlLXBhdGgudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL25leHQtc2VydmVyL2xpYi9taXR0LnRzIiwid2VicGFjazovLy8uLi8uLi8uLi8uLi9uZXh0LXNlcnZlci9saWIvcm91dGVyL3JvdXRlci50cyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vLi4vbmV4dC1zZXJ2ZXIvbGliL3JvdXRlci91dGlscy9mb3JtYXQtdXJsLnRzIiwid2VicGFjazovLy8uLi8uLi8uLi8uLi8uLi9uZXh0LXNlcnZlci9saWIvcm91dGVyL3V0aWxzL2lzLWR5bmFtaWMudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uLy4uL25leHQtc2VydmVyL2xpYi9yb3V0ZXIvdXRpbHMvcGFyc2UtcmVsYXRpdmUtdXJsLnRzIiwid2VicGFjazovLy8uLi8uLi8uLi8uLi8uLi9uZXh0LXNlcnZlci9saWIvcm91dGVyL3V0aWxzL3BhdGgtbWF0Y2gudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uLy4uL25leHQtc2VydmVyL2xpYi9yb3V0ZXIvdXRpbHMvcHJlcGFyZS1kZXN0aW5hdGlvbi50cyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vLi4vbmV4dC1zZXJ2ZXIvbGliL3JvdXRlci91dGlscy9xdWVyeXN0cmluZy50cyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vLi4vbmV4dC1zZXJ2ZXIvbGliL3JvdXRlci91dGlscy9yZXNvbHZlLXJld3JpdGVzLnRzIiwid2VicGFjazovLy8uLi8uLi8uLi8uLi8uLi9uZXh0LXNlcnZlci9saWIvcm91dGVyL3V0aWxzL3JvdXRlLW1hdGNoZXIudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uLy4uL25leHQtc2VydmVyL2xpYi9yb3V0ZXIvdXRpbHMvcm91dGUtcmVnZXgudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL25leHQtc2VydmVyL2xpYi91dGlscy50cyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L25leHQtc2VydmVyL3NlcnZlci9kZW5vcm1hbGl6ZS1wYWdlLXBhdGguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL25leHQvbGluay5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmV4dC9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL25leHQvbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVXaWxkY2FyZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmV4dC9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy90eXBlb2YuanMiLCJ3ZWJwYWNrOi8vLy4vcGFnZXMvTG9nZ2VkSW4uanMiLCJ3ZWJwYWNrOi8vLy4vcGFnZXMvTmV3U2VhcmNoL0FkZEl0ZW0vTmV3SXRlbS5qcyIsIndlYnBhY2s6Ly8vLi9wYWdlcy9OZXdTZWFyY2gvQWRkSXRlbS9wYXJlbnRNb2RhbC5qcyIsIndlYnBhY2s6Ly8vLi9wYWdlcy9OZXdTZWFyY2gvQ2xpZW50SW5mb01vZGFsLmpzIiwid2VicGFjazovLy8uL3BhZ2VzL05ld1NlYXJjaC9JbmZvTW9kYWwuanMiLCJ3ZWJwYWNrOi8vLy4vcGFnZXMvTmV3U2VhcmNoL2l0ZW0vL01hY2hpbmVTZWxlY3Rpb25Nb2RhbC5qcyIsIndlYnBhY2s6Ly8vLi9zdHlsZXMvQ2xpZW50VGFibGUubW9kdWxlLmNzcyIsIndlYnBhY2s6Ly8vLi9zdHlsZXMvTWFpblNlYXJjaC5tb2R1bGUuY3NzIiwid2VicGFjazovLy8uL3N0eWxlcy9QYXJ0VGFibGUubW9kdWxlLmNzcyIsIndlYnBhY2s6Ly8vLi91dGlscy9DbGllbnRUYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi91dGlscy9Nb2RlbFRhYmxlLmpzIiwid2VicGFjazovLy8uL3V0aWxzL1BhcnRUYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi91dGlscy9mZXRjaEFzc29jaWF0aW9ucy5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJmaXJlYmFzZS9jb21wYXQvYXBwXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZmlyZWJhc2UvY29tcGF0L2F1dGhcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJmaXJlYmFzZS9jb21wYXQvZmlyZXN0b3JlXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZmlyZWJhc2UvY29tcGF0L3N0b3JhZ2VcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJuZXh0L2R5bmFtaWNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJuZXh0L3JvdXRlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3QtYm9vdHN0cmFwXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3QtaXNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1xci1iYXJjb2RlLXNjYW5uZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJzdHlsZWQtanN4L3N0eWxlXCIiXSwibmFtZXMiOlsiYXV0aFVzZXJDb250ZXh0IiwiY3JlYXRlQ29udGV4dCIsImF1dGhVc2VyIiwibG9hZGluZyIsInNpZ25JbldpdGhHb29nbGUiLCJzaWduT3V0IiwiQXV0aFVzZXJQcm92aWRlciIsImNoaWxkcmVuIiwiYXV0aCIsInVzZUZpcmViYXNlQXV0aCIsInVzZUF1dGgiLCJ1c2VDb250ZXh0IiwiRmlyZWJhc2VDcmVkZW50aWFscyIsImFwaUtleSIsImF1dGhEb21haW4iLCJwcm9qZWN0SWQiLCJzdG9yYWdlQnVja2V0IiwibWVzc2FnaW5nU2VuZGVySWQiLCJhcHBJZCIsIm1lYXN1cmVtZW50SWQiLCJGaXJlYmFzZSIsImFwcHMiLCJsZW5ndGgiLCJpbml0aWFsaXplQXBwIiwiZm9ybWF0QXV0aFVzZXIiLCJ1c2VyIiwidWlkIiwiZW1haWwiLCJzZXRBdXRoVXNlciIsInVzZVN0YXRlIiwic2V0TG9hZGluZyIsImF1dGhTdGF0ZUNoYW5nZWQiLCJhdXRoU3RhdGUiLCJmb3JtYXR0ZWRVc2VyIiwiY2xlYXIiLCJwcm92aWRlciIsIkdvb2dsZUF1dGhQcm92aWRlciIsInNldEN1c3RvbVBhcmFtZXRlcnMiLCJwcm9tcHQiLCJzaWduSW5XaXRoUmVkaXJlY3QiLCJjYXRjaCIsImVycm9yIiwiY29uc29sZSIsInRoZW4iLCJ1c2VFZmZlY3QiLCJ1bnN1YnNjcmliZSIsInNldFBlcnNpc3RlbmNlIiwiQXV0aCIsIlBlcnNpc3RlbmNlIiwiTE9DQUwiLCJvbkF1dGhTdGF0ZUNoYW5nZWQiLCJwcmVmZXRjaGVkIiwicm91dGVyIiwiZXJyIiwiY3VyTG9jYWxlIiwib3B0aW9ucyIsImhyZWYiLCJldmVudCIsInRhcmdldCIsImUiLCJub2RlTmFtZSIsImlzTW9kaWZpZWRFdmVudCIsInNjcm9sbCIsImFzIiwicmVwbGFjZSIsImFyZ3MiLCJrZXkiLCJleHBlY3RlZCIsImFjdHVhbCIsInJlcXVpcmVkUHJvcHNHdWFyZCIsInJlcXVpcmVkUHJvcHMiLCJPYmplY3QiLCJwcm9wcyIsImNyZWF0ZVByb3BFcnJvciIsIl8iLCJvcHRpb25hbFByb3BzR3VhcmQiLCJzaGFsbG93IiwicGFzc0hyZWYiLCJwcmVmZXRjaCIsImxvY2FsZSIsIm9wdGlvbmFsUHJvcHMiLCJ2YWxUeXBlIiwiaGFzV2FybmVkIiwiUmVhY3QiLCJwIiwicGF0aG5hbWUiLCJyZXNvbHZlZEFzIiwiY2hpbGQiLCJDaGlsZHJlbiIsImNoaWxkUmVmIiwicm9vdE1hcmdpbiIsInNldFJlZiIsImVsIiwic2V0SW50ZXJzZWN0aW9uUmVmIiwic2hvdWxkUHJlZmV0Y2giLCJpc1Zpc2libGUiLCJpc1ByZWZldGNoZWQiLCJjaGlsZFByb3BzIiwicmVmIiwib25DbGljayIsImxpbmtDbGlja2VkIiwicHJpb3JpdHkiLCJsb2NhbGVEb21haW4iLCJMaW5rIiwicGF0aCIsIm5vcm1hbGl6ZVBhdGhUcmFpbGluZ1NsYXNoIiwicHJvY2VzcyIsInJlcXVlc3RJZGxlQ2FsbGJhY2siLCJzZWxmIiwic3RhcnQiLCJEYXRlIiwic2V0VGltZW91dCIsImNiIiwiZGlkVGltZW91dCIsInRpbWVSZW1haW5pbmciLCJNYXRoIiwiY2FuY2VsSWRsZUNhbGxiYWNrIiwiY2xlYXJUaW1lb3V0IiwiTVNfTUFYX0lETEVfREVMQVkiLCJlbnRyeSIsIm1hcCIsIlByb21pc2UiLCJwcm9tIiwicmVzb2x2ZSIsInJlc29sdmVyIiwiZnV0dXJlIiwiZ2VuZXJhdG9yIiwidmFsdWUiLCJsaW5rIiwiZG9jdW1lbnQiLCJ3aW5kb3ciLCJjYW5QcmVmZXRjaCIsImhhc1ByZWZldGNoIiwicmVzIiwiQVNTRVRfTE9BRF9FUlJPUiIsIlN5bWJvbCIsInNjcmlwdCIsInJlamVjdCIsIm1hcmtBc3NldEVycm9yIiwic3JjIiwiY2FuY2VsbGVkIiwiciIsIm9uQnVpbGRNYW5pZmVzdCIsInJlc29sdmVQcm9taXNlV2l0aFRpbWVvdXQiLCJzY3JpcHRzIiwiYXNzZXRQcmVmaXgiLCJlbmNvZGVVUkkiLCJjc3MiLCJnZXRDbGllbnRCdWlsZE1hbmlmZXN0IiwibWFuaWZlc3QiLCJyb3V0ZSIsImFsbEZpbGVzIiwidiIsImVudHJ5cG9pbnRzIiwibG9hZGVkU2NyaXB0cyIsInN0eWxlU2hlZXRzIiwicm91dGVzIiwiYXBwZW5kU2NyaXB0IiwiZmV0Y2giLCJ0ZXh0IiwiY29udGVudCIsIndoZW5FbnRyeXBvaW50Iiwid2l0aEZ1dHVyZSIsIm9uRW50cnlwb2ludCIsImZuIiwiZXhwb3J0cyIsImNvbXBvbmVudCIsImlucHV0Iiwib2xkIiwibG9hZFJvdXRlIiwiZ2V0RmlsZXNGb3JSb3V0ZSIsImVudHJ5cG9pbnQiLCJzdHlsZXMiLCJjbiIsIm5hdmlnYXRvciIsIm91dHB1dCIsInByZWZldGNoVmlhRG9tIiwiY3JlYXRlUm91dGVMb2FkZXIiLCJzaW5nbGV0b25Sb3V0ZXIiLCJyZWFkeUNhbGxiYWNrcyIsInJlYWR5IiwidXJsUHJvcGVydHlGaWVsZHMiLCJyb3V0ZXJFdmVudHMiLCJjb3JlTWV0aG9kRmllbGRzIiwiZ2V0IiwiUm91dGVyIiwiZmllbGQiLCJnZXRSb3V0ZXIiLCJldmVudEZpZWxkIiwiX3NpbmdsZXRvblJvdXRlciIsIm1lc3NhZ2UiLCJzdGFjayIsIlJvdXRlckNvbnRleHQiLCJjcmVhdGVSb3V0ZXIiLCJfcm91dGVyIiwiaW5zdGFuY2UiLCJBcnJheSIsImhhc0ludGVyc2VjdGlvbk9ic2VydmVyIiwiaXNEaXNhYmxlZCIsImRpc2FibGVkIiwidW5vYnNlcnZlIiwib2JzZXJ2ZSIsInNldFZpc2libGUiLCJpZGxlQ2FsbGJhY2siLCJjcmVhdGVPYnNlcnZlciIsImVsZW1lbnRzIiwib2JzZXJ2ZXIiLCJvYnNlcnZlcnMiLCJpZCIsImVudHJpZXMiLCJjYWxsYmFjayIsIkNvbXBvc2VkQ29tcG9uZW50IiwiZ2V0SW5pdGlhbFByb3BzIiwiV2l0aFJvdXRlcldyYXBwZXIiLCJuYW1lIiwicGF0aG5hbWVQYXJ0cyIsImxvY2FsZXMiLCJkZXRlY3RlZExvY2FsZSIsImFsbCIsIm9uIiwib2ZmIiwiZW1pdCIsImhhbmRsZXIiLCJiYXNlUGF0aCIsInByZWZpeCIsInBhdGhOb1F1ZXJ5SGFzaCIsInF1ZXJ5SW5kZXgiLCJoYXNoSW5kZXgiLCJhZGRQYXRoUHJlZml4IiwidXJsIiwibG9jYXRpb25PcmlnaW4iLCJyZXNvbHZlZCIsImhhc0Jhc2VQYXRoIiwiaW50ZXJwb2xhdGVkUm91dGUiLCJkeW5hbWljUmVnZXgiLCJkeW5hbWljR3JvdXBzIiwiZHluYW1pY01hdGNoZXMiLCJhc1BhdGhuYW1lIiwicGFyYW1zIiwicGFyYW0iLCJyZXBsYWNlZCIsInJlcGVhdCIsIm9wdGlvbmFsIiwic2VnbWVudCIsImVuY29kZVVSSUNvbXBvbmVudCIsInJlc3VsdCIsImZpbHRlcmVkUXVlcnkiLCJxdWVyeSIsImJhc2UiLCJ1cmxBc1N0cmluZyIsImlzTG9jYWxVUkwiLCJyZXNvbHZlQXMiLCJmaW5hbFVybCIsImludGVycG9sYXRlZEFzIiwiaW50ZXJwb2xhdGVBcyIsImhhc2giLCJvbWl0UGFybXNGcm9tUXVlcnkiLCJyZXNvbHZlZEhyZWYiLCJvcmlnaW4iLCJyZXNvbHZlSHJlZiIsImhyZWZIYWRPcmlnaW4iLCJhc0hhZE9yaWdpbiIsInN0cmlwT3JpZ2luIiwicHJlcGFyZWRVcmwiLCJhZGRCYXNlUGF0aCIsInByZXBhcmVkQXMiLCJjbGVhblBhdGhuYW1lIiwicGFnZXMiLCJwYWdlIiwibWFudWFsU2Nyb2xsUmVzdG9yYXRpb24iLCJTU0dfREFUQV9OT1RfRk9VTkQiLCJjcmVkZW50aWFscyIsImF0dGVtcHRzIiwiZmV0Y2hSZXRyeSIsImRhdGEiLCJub3RGb3VuZCIsImlzU2VydmVyUmVuZGVyIiwiY29uc3RydWN0b3IiLCJhc1BhdGgiLCJjb21wb25lbnRzIiwic2RjIiwic2RyIiwic3ViIiwiY2xjIiwicGFnZUxvYWRlciIsIl9icHMiLCJldmVudHMiLCJfd3JhcEFwcCIsImlzU3NyIiwiaXNGYWxsYmFjayIsIl9pbkZsaWdodFJvdXRlIiwiX3NoYWxsb3ciLCJkZWZhdWx0TG9jYWxlIiwiZG9tYWluTG9jYWxlcyIsImlzUmVhZHkiLCJpc1ByZXZpZXciLCJpc0xvY2FsZURvbWFpbiIsIl9pZHgiLCJzdGF0ZSIsImluaXRpYWwiLCJfX05fU1NHIiwiaW5pdGlhbFByb3BzIiwiX19OX1NTUCIsIkNvbXBvbmVudCIsImF1dG9FeHBvcnREeW5hbWljIiwicmVsb2FkIiwiYmFjayIsInB1c2giLCJwcmVwYXJlVXJsQXMiLCJzaG91bGRSZXNvbHZlSHJlZiIsImxvY2FsZUNoYW5nZSIsIlNUIiwicGVyZm9ybWFuY2UiLCJyb3V0ZVByb3BzIiwiYWRkTG9jYWxlIiwiZGVsQmFzZVBhdGgiLCJjbGVhbmVkQXMiLCJkZWxMb2NhbGUiLCJwYXJzZWQiLCJfX3Jld3JpdGVzIiwibWV0aG9kIiwicmV3cml0ZXNSZXN1bHQiLCJyZXNvbHZlRHluYW1pY1JvdXRlIiwicGFyc2VkQXMiLCJyb3V0ZVJlZ2V4Iiwicm91dGVNYXRjaCIsInNob3VsZEludGVycG9sYXRlIiwibWlzc2luZ1BhcmFtcyIsInJvdXRlSW5mbyIsImRlc3RpbmF0aW9uIiwicGFyc2VkSHJlZiIsIm5vdEZvdW5kUm91dGUiLCJhcHBDb21wIiwiaXNWYWxpZFNoYWxsb3dSb3V0ZSIsImZvcmNlZFNjcm9sbCIsIngiLCJ5IiwiY2hhbmdlU3RhdGUiLCJfX04iLCJpZHgiLCJidWlsZENhbmNlbGxhdGlvbkVycm9yIiwiZXhpc3RpbmdSb3V0ZUluZm8iLCJjYWNoZWRSb3V0ZUluZm8iLCJyZXF1aXJlIiwiaXNWYWxpZEVsZW1lbnRUeXBlIiwiZGF0YUhyZWYiLCJzZXQiLCJiZWZvcmVQb3BTdGF0ZSIsIm9ubHlBSGFzaENoYW5nZSIsIm5ld0hhc2giLCJvbGRVcmxOb0hhc2giLCJvbGRIYXNoIiwic2Nyb2xsVG9IYXNoIiwiaWRFbCIsIm5hbWVFbCIsInVybElzTmV3IiwiaXNTc2ciLCJjYW5jZWwiLCJjb21wb25lbnRSZXN1bHQiLCJfZ2V0RGF0YSIsIl9nZXRTdGF0aWNEYXRhIiwiZmV0Y2hOZXh0RGF0YSIsIl9nZXRTZXJ2ZXJEYXRhIiwiQXBwVHJlZSIsImN0eCIsImFib3J0Q29tcG9uZW50TG9hZCIsIm5vdGlmeSIsInNsYXNoZWRQcm90b2NvbHMiLCJwcm90b2NvbCIsInVybE9iaiIsImhvc3QiLCJob3N0bmFtZSIsIlN0cmluZyIsInF1ZXJ5c3RyaW5nIiwic2VhcmNoIiwiVEVTVF9ST1VURSIsImdsb2JhbEJhc2UiLCJyZXNvbHZlZEJhc2UiLCJtYXRjaGVyT3B0aW9ucyIsInNlbnNpdGl2ZSIsImRlbGltaXRlciIsImN1c3RvbVJvdXRlTWF0Y2hlck9wdGlvbnMiLCJzdHJpY3QiLCJjdXN0b21Sb3V0ZSIsImtleXMiLCJtYXRjaGVyUmVnZXgiLCJwYXRoVG9SZWdleHAiLCJtYXRjaGVyIiwiZ2V0U2FmZVBhcmFtTmFtZSIsInBhcmFtTmFtZSIsIm5ld1BhcmFtTmFtZSIsImkiLCJjaGFyQ29kZSIsImFsbE1hdGNoIiwiaGFzIiwiaGFzSXRlbSIsInJlcSIsIm1hdGNoZXMiLCJncm91cEtleSIsInZhbGlkYXRlIiwicGFyc2VkRGVzdGluYXRpb24iLCJoYWRMb2NhbGUiLCJkZXN0UXVlcnkiLCJkZXN0UGF0aCIsImRlc3RQYXRoUGFyYW1LZXlzIiwiZGVzdFBhdGhQYXJhbXMiLCJkZXN0aW5hdGlvbkNvbXBpbGVyIiwic3RyT3JBcnJheSIsImNvbXBpbGVOb25QYXRoIiwicGFyYW1LZXlzIiwiYXBwZW5kUGFyYW1zVG9RdWVyeSIsIm5ld1VybCIsInNlYXJjaFBhcmFtcyIsImlzTmFOIiwiaXRlbSIsInN0cmluZ2lmeVVybFF1ZXJ5UGFyYW0iLCJzZWFyY2hQYXJhbXNMaXN0IiwiY3VzdG9tUm91dGVNYXRjaGVyIiwibWF0Y2hlZFBhZ2UiLCJmc1BhdGhuYW1lIiwiaGFuZGxlUmV3cml0ZSIsInJld3JpdGUiLCJoYXNQYXJhbXMiLCJoZWFkZXJzIiwiY29va2llcyIsImFjYyIsImRlc3RSZXMiLCJmaW5pc2hlZCIsInJld3JpdGVzIiwicmUiLCJkZWNvZGUiLCJkZWNvZGVVUklDb21wb25lbnQiLCJzbHVnTmFtZSIsImciLCJncm91cHMiLCJtIiwic3RyIiwic2VnbWVudHMiLCJub3JtYWxpemVkUm91dGUiLCJncm91cEluZGV4IiwicGFyYW1ldGVyaXplZFJvdXRlIiwicGFyc2VQYXJhbWV0ZXIiLCJwb3MiLCJlc2NhcGVSZWdleCIsInJvdXRlS2V5Q2hhckNvZGUiLCJyb3V0ZUtleUNoYXJMZW5ndGgiLCJnZXRTYWZlUm91dGVLZXkiLCJyb3V0ZUtleSIsInJvdXRlS2V5cyIsIm5hbWVkUGFyYW1ldGVyaXplZFJvdXRlIiwiY2xlYW5lZEtleSIsImludmFsaWRLZXkiLCJwYXJzZUludCIsIm5hbWVkUmVnZXgiLCJ1c2VkIiwicG9ydCIsImdldExvY2F0aW9uT3JpZ2luIiwiQXBwIiwiZ2V0RGlzcGxheU5hbWUiLCJwYWdlUHJvcHMiLCJsb2FkR2V0SW5pdGlhbFByb3BzIiwiaXNSZXNTZW50IiwidXJsT2JqZWN0S2V5cyIsIlNQIiwiTG9nZ2VkSW4iLCJ1c2VSb3V0ZXIiLCJsb2ciLCJ0aW1lciIsIm1pbkhlaWdodCIsIkJhcmNvZGVTY2FubmVyQ29tcG9uZW50IiwiZHluYW1pYyIsInNzciIsInNpbXVsYXRlTmV0d29ya1JlcXVlc3QiLCJMb2FkaW5nQnV0dG9uIiwidHlwZSIsImlzTG9hZGluZyIsImhhbmRsZUNsaWNrIiwiTmV3SXRlbSIsIml0ZW1zIiwic2V0SXRlbXMiLCJwbiIsInNuIiwibG9jYWxTTiIsInByaWNlIiwic3RhdHVzIiwicG9OdW1iZXIiLCJ3aWR0aCIsImhlaWdodCIsImFycml2YWxfZGF0ZSIsInZpc2libGUiLCJlZGl0aW5nUG4iLCJzZXRFZGl0aW5nUG4iLCJlZGl0aW5nU24iLCJzZXRFZGl0aW5nU24iLCJET00iLCJzZXRET00iLCJvZW0iLCJzZXRPZW0iLCJtb2RhbGl0eSIsInNldE1vZGFsaXR5IiwibW9kZWwiLCJzZXRNb2RlbCIsImxvY2FsTG9jRnJvbSIsInNldExvY2FsTG9jRnJvbSIsImxvY2FsTG9jQ3VycmVudCIsInNldExvY2FsTG9jQ3VycmVudCIsInBuT3B0aW9ucyIsInNldFBuT3B0aW9ucyIsInNuT3B0aW9ucyIsInNldFNuT3B0aW9ucyIsImRlc2NyaXB0aW9ucyIsInNldERlc2NyaXB0aW9ucyIsImRlc2NyaXB0aW9uIiwiZGF0ZSIsIndvcmtPcmRlcnMiLCJzZXRXb3JrT3JkZXJzIiwid29ya09yZGVyIiwiY2xpZW50cyIsInNldENsaWVudHMiLCJwaG90b3MiLCJzZXRQaG90b3MiLCJzaG93Iiwic2V0U2hvdyIsInNob3dFcnIiLCJzZXRTaG93RXJyIiwiRXJyIiwic2V0RXJyIiwic2hvd0Rlc2NNb2RhbCIsInNldFNob3dEZXNjTW9kYWwiLCJzaG93V29Nb2RhbCIsInNldFNob3dXb01vZGFsIiwic2hvd0NsaWVudE1vZGFsIiwic2V0U2hvd0NsaWVudE1vZGFsIiwic2hvd01hY2hpbmVNb2RhbCIsInNldFNob3dNYWNoaW5lTW9kYWwiLCJzaG93UGFyZW50TW9kYWwiLCJzZXRTaG93UGFyZW50TW9kYWwiLCJzaG93Q2FtZXJhTW9kYWwiLCJzZXRTaG93Q2FtZXJhTW9kYWwiLCJzaG93U2F2ZU1vZGFsIiwic2V0U2hvd1NhdmVNb2RhbCIsIm1hY2hpbmVTZWxlY3Rpb25Nb2RhbCIsInNldE1hY2hpbmVTZWxlY3Rpb25Nb2RhbCIsInNlbGVjdGVkRGVzYyIsInNldFNlbGVjdGVkRGVzYyIsInNlbGVjdGVkQ2xpZW50Iiwic2V0U2VsZWN0ZWRDbGllbnQiLCJzZWxlY3RlZE1hY2hpbmUiLCJzZXRTZWxlY3RlZE1hY2hpbmUiLCJzZWxlY3RlZEN1cnJlbnRNYWNoaW5lIiwic2V0U2VsZWN0ZWRDdXJyZW50TWFjaGluZSIsInNlbGVjdGVkUGFyZW50Iiwic2V0U2VsZWN0ZWRQYXJlbnQiLCJUaGVNYWNoaW5lIiwic2V0VGhlTWFjaGluZSIsIm1hY2hpbmVPcHRpb25zIiwic2V0TWFjaGluZU9wdGlvbnMiLCJzZXRTZWFyY2giLCJjYXB0dXJlZFBob3RvIiwic2V0Q2FwdHVyZWRQaG90byIsImNhbWVyYUZhY2luZyIsInNldENhbWVyYUZhY2luZyIsImFkZFRvV2Vic2l0ZSIsInNldEFkZFRvV2Vic2l0ZSIsIm1hY2hpbmVQaWNrIiwic2V0TWFjaGluZVBpY2siLCJmcmVxSXRlbSIsInNldEZyZXFJdGVtIiwidXNhZ2VQYXN0WWVhciIsInNldFVzYWdlUGFzdFllYXIiLCJtYWNoaW5lRnJlcXVlbmN5Iiwic2V0TWFjaGluZUZyZXF1ZW5jeSIsInNob3dFeHRyYSIsInNldFNob3dFeHRyYSIsImFkZGluZ05ld1BuIiwic2V0QWRkaW5nTmV3UG4iLCJuZXdQbiIsInNldE5ld1BuIiwiYWRkaW5nTmV3U24iLCJzZXRBZGRpbmdOZXdTbiIsIm5ld1NuIiwic2V0TmV3U24iLCJicm93c2VJbnB1dFJlZiIsInVzZVJlZiIsImZldGNoQ2xpZW50c0RhdGEiLCJjbGllbnRzRGF0YSIsImZldGNoQ2xpZW50cyIsImZldGNoUG5TbiIsImRiIiwiZmlyZWJhc2UiLCJmaXJlc3RvcmUiLCJzbmFwc2hvdCIsImNvbGxlY3Rpb24iLCJwblNldCIsIlNldCIsInNuU2V0IiwiZm9yRWFjaCIsImRvYyIsImFkZCIsIm1hY2hpbmVGaWVsZHNJbml0aWFsaXplZCIsInNldE1hY2hpbmVGaWVsZHNJbml0aWFsaXplZCIsInVwZGF0ZWRGaWVsZHMiLCJ1cGRhdGVNYWNoaW5lRmllbGRzIiwic2lnbmFsIiwic2V0U2lnbmFsIiwiaGFuZGxlUG5TZWxlY3QiLCJzZWxlY3RlZCIsInByZXYiLCJ1cGRhdGVkUG4iLCJpc0FycmF5IiwiaGFuZGxlUG5DaGFuZ2UiLCJpbmRleCIsImFkZFBuIiwidHJpbSIsImhhbmRsZVNuU2VsZWN0IiwidXBkYXRlZFNuIiwiaGFuZGxlU25DaGFuZ2UiLCJhZGRTbiIsImhhbmRsZUJyb3dzZVBob3RvcyIsImN1cnJlbnQiLCJjbGljayIsImhhbmRsZUZpbGVzU2VsZWN0ZWQiLCJmaWxlcyIsIm5ld1Bob3RvcyIsImZpbGUiLCJVUkwiLCJjcmVhdGVPYmplY3RVUkwiLCJwcmV2UGhvdG9zIiwiaGFuZGxlQ2FwdHVyZSIsImNhcHR1cmVQaG90byIsInZpZGVvIiwicXVlcnlTZWxlY3RvciIsImNhbnZhcyIsImNyZWF0ZUVsZW1lbnQiLCJ2aWRlb1dpZHRoIiwidmlkZW9IZWlnaHQiLCJjb250ZXh0IiwiZ2V0Q29udGV4dCIsImRyYXdJbWFnZSIsInRvQmxvYiIsImJsb2IiLCJzYXZlUGhvdG8iLCJyZW1vdmVQaG90byIsImZpbHRlciIsImhhbmRsZUNsb3NlIiwiaGFuZGxlU2hvdyIsImhhbmRsZUNsb3NlRXJyIiwiaGFuZGxlU2hvd0VyciIsImhhbmRsZUNsb3NlU2F2ZU1vZGFsIiwiaGFuZGxlU2hvd1NhdmVNb2RhbCIsImhhbmRsZUNsb3NlRGVzY01vZGFsIiwiaGFuZGxlU2hvd0Rlc2NNb2RhbCIsImhhbmRsZUNsb3NlV29Nb2RhbCIsImhhbmRsZVNob3dXb01vZGFsIiwiaGFuZGxlQ2xvc2VDbGllbnRNb2RhbCIsImhhbmRsZVNob3dDbGllbnRNb2RhbCIsImhhbmRsZUNsb3NlTWFjaGluZU1vZGFsIiwiaGFuZGxlU2hvd01hY2hpbmVNb2RhbCIsImhhbmRsZUNsb3NlUGFyZW50TW9kYWwiLCJoYW5kbGVTaG93UGFyZW50TW9kYWwiLCJhZGREZXNjcmlwdGlvbiIsInJlbW92ZURlc2NyaXB0aW9uIiwiaGFuZGxlRGVzY3JpcHRpb25DaGFuZ2UiLCJuZXdEZXNjcmlwdGlvbnMiLCJkZXNjIiwiYWRkV29ya09yZGVyIiwicmVtb3ZlV29ya09yZGVyIiwiaGFuZGxlV29ya09yZGVyQ2hhbmdlIiwibmV3V29ya09yZGVycyIsIndvIiwibGlzdERlc2NyaXB0aW9ucyIsInNlbGVjdERlc2NyaXB0aW9uIiwiaGFuZGxlQ2xpZW50SW5mbyIsImNsaWVudElkIiwic2V0U2hvd0xvY2FsTG9jRnJvbSIsInNldFNob3dMb2NhbExvY0N1cnJlbnQiLCJjbGllbnREb2MiLCJleGlzdHMiLCJjbGllbnREYXRhIiwic2V0U2VsZWN0ZWRDbGllbnRGcm9tIiwic2V0U2VsZWN0ZWRDbGllbnRDdXJyZW50IiwibWFjaGluZVByb21pc2VzIiwibWFjaGluZXMiLCJtYWNoaW5lUmVmIiwibWFjaGluZURvY3MiLCJtYWNoaW5lRG9jIiwiZmV0Y2hNYWNoaW5lIiwibWFjaGluZUlkIiwibWFjaGluZURhdGEiLCJPRU0iLCJNb2RhbGl0eSIsIk1vZGVsIiwibWFjaGluZXNTbmFwc2hvdCIsIndoZXJlIiwic2l6ZSIsImNhbGN1bGF0ZUl0ZW1GcmVxdWVuY3lBbmRVc2FnZSIsImN1cnJlbnREYXRlIiwib25lWWVhckFnbyIsInNldEZ1bGxZZWFyIiwiZ2V0RnVsbFllYXIiLCJpdGVtc1NuYXBzaG90IiwiaXRlbURhdGEiLCJ3b3JrT3JkZXJEYXRlIiwidXBsb2FkUGhvdG9zIiwiZG9jSUQiLCJzdG9yYWdlUmVmIiwic3RvcmFnZSIsInBob3RvUmVmIiwibWV0YWRhdGEiLCJjb250ZW50VHlwZSIsInB1dCIsImdldERvd25sb2FkVVJMIiwiaGFuZGxlU3VibWl0IiwicHJldmVudERlZmF1bHQiLCJ0b1NlbmQiLCJyZWRpcmVjdCIsImN1cnJlbnRVc2VyIiwidXNlckVtYWlsIiwiZm9ybWF0dGVkSXRlbXMiLCJ0cmFja2luZ051bWJlciIsImFkZGVkVG9XZWJzaXRlIiwidW5kZWZpbmVkIiwiTWFjaGluZUZyb20iLCJNYWNoaW5lQ3VycmVudCIsInNlbGVjdGVkQ2xpZW50RnJvbSIsIkNsaWVudEZyb20iLCJzZWxlY3RlZENsaWVudEN1cnJlbnQiLCJDbGllbnRDdXJyZW50IiwiUGFyZW50IiwiZGF0ZUNyZWF0ZWQiLCJ0b0lTT1N0cmluZyIsInNwbGl0IiwiZG9jSWQiLCJuZXdEb2NJZCIsInVwZGF0ZSIsImFzc29jaWF0ZWRQYXJ0cyIsIkZpZWxkVmFsdWUiLCJhcnJheVVuaW9uIiwiY3VycmVudE1hY2hpbmVSZWYiLCJjdXJyZW50TWFjaGluZURvYyIsImRlbGV0ZSIsImNsZWFuRm9ybWF0dGVkSXRlbXMiLCJzaGFsbG93Q2xlYW4iLCJnZW5lcmF0ZUN1c3RvbUlEIiwic2V0UmVkaXJlY3QiLCJzaG93SW5mb01vZGFsIiwic2V0U2hvd0luZm9Nb2RhbCIsIml0ZW1OYW1lIiwic2V0SXRlbU5hbWUiLCJoYW5kbGVTaG93SW5mb01vZGFsIiwiaGFuZGxlQ2xvc2VJbmZvTW9kYWwiLCJoYW5kbGVDbG9zZUNhbWVyYU1vZGFsIiwiaGFuZGxlQ2hhbmdlIiwicHJldkl0ZW1zIiwibW9zdFJlY2VudFdvcmtPcmRlciIsInJlZHVjZSIsImxhdGVzdCIsImxhdGVzdERhdGUiLCJoYW5kbGVTaG93Q2FtZXJhTW9kYWwiLCJyYW5kb21OdW0iLCJmbG9vciIsInJhbmRvbSIsImhhbmRsZVByaW50IiwiYWxlcnQiLCJwcmludElkIiwicGF5bG9hZCIsImxvY2FsX3NuIiwicmVzcG9uc2UiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsImpzb24iLCJoYW5kbGVBZGROZXdQbiIsImhhbmRsZUFkZE5ld1NuIiwiZ2V0UHJpb3JpdHlNYWNoaW5lRmllbGQiLCJjdXJyZW50VmFsdWUiLCJ0aGVNYWNoaW5lIiwiY3VycmVudE1hY2hpbmUiLCJmcm9tTWFjaGluZSIsImdldFZhbGlkTWFjaGluZUZpZWxkIiwic2hvd0xvY2FsTG9jRnJvbSIsInNob3dMb2NhbExvY0N1cnJlbnQiLCJoYW5kbGVDbG9uZSIsImNvbmRpdGlvbiIsInRvTG93ZXJDYXNlIiwiaGFuZGxlU2V0U2VsZWN0ZWRNYWNoaW5lIiwibWFjaGluZSIsImN1cnJlbnRQbkluZGV4Iiwic2V0Q3VycmVudFBuSW5kZXgiLCJzaG93RHJvcGRvd24iLCJzZXRTaG93RHJvcGRvd24iLCJjdXJyZW50U25JbmRleCIsInNldEN1cnJlbnRTbkluZGV4Iiwic2hvd1NuRHJvcGRvd24iLCJzZXRTaG93U25Ecm9wZG93biIsImhhbmRsZUFkZE5ld0NsaWVudCIsInNob3dNYWNoaW5lU2VsZWN0Iiwic2V0U2hvd01hY2hpbmVTZWxlY3QiLCJjdXJzb3IiLCJib3JkZXJMZWZ0IiwicGFkZGluZ0xlZnQiLCJtYXJnaW5Cb3R0b20iLCJjbGllbnQiLCJpbmNsdWRlcyIsImJvcmRlclJhZGl1cyIsInBvc2l0aW9uIiwibGVmdCIsInRyYW5zZm9ybSIsImJvdHRvbSIsInRvcCIsImJhY2tncm91bmRDb2xvciIsImJhY2tkcm9wRmlsdGVyIiwiZGlzcGxheSIsImFsaWduSXRlbXMiLCJqdXN0aWZ5Q29udGVudCIsInpJbmRleCIsIm1heFdpZHRoIiwicmlnaHQiLCJib3JkZXIiLCJtYXhIZWlnaHQiLCJvdmVyZmxvd1kiLCJwbk9wdGlvbiIsInBhZGRpbmciLCJzbk9wdGlvbiIsIm1hcmdpblRvcCIsImluZGV4T2YiLCJpc0hpZGRlbiIsImN1cnJlbnRUYXJnZXQiLCJjaGVja2VkIiwicGhvdG8iLCJvYmplY3RGaXQiLCJtYXJnaW5SaWdodCIsIm1hcmdpbkxlZnQiLCJ0ZXh0QWxpZ24iLCJtYXJnaW4iLCJ0ZXh0RGVjb3JhdGlvbiIsImNvbG9yIiwiZm9udFNpemUiLCJDb2wiLCJDTElFTlRfV0FSRUhPVVNFIiwiQ0xJRU5UX1VOQVNTSUdORUQiLCJQYXJlbnRNb2RhbCIsInBhcnRzIiwiaW5mbyIsInNldEluZm8iLCJiYWNrdXBJbmZvIiwic2V0QmFja3VwSW5mbyIsInNlbGVjdCIsInNldFNlbGVjdCIsInNob3dMaXN0Iiwic2V0U2hvd0xpc3QiLCJzaG93TGlzdFNlYXJjaCIsInNldFNob3dMaXN0U2VhcmNoIiwic2VsZWN0ZWRPRU0iLCJzZXRTZWxlY3RlZE9FTSIsInNlbGVjdGVkTW9kYWxpdHkiLCJzZXRTZWxlY3RlZE1vZGFsaXR5IiwiY2xpZW50QnV0dG9uVGV4dCIsInNldENsaWVudEJ1dHRvblRleHQiLCJob3ZlckluZGV4Iiwic2V0SG92ZXJJbmRleCIsInNlbGVjdGVkTW9kZWwiLCJzZXRTZWxlY3RlZE1vZGVsIiwibW9kZWxzIiwic2V0TW9kZWxzIiwic2hvd01vZGVsTW9kYWwiLCJzZXRTaG93TW9kZWxNb2RhbCIsIm1vZGVsQnV0dG9uVGV4dCIsInNldE1vZGVsQnV0dG9uVGV4dCIsImNsaWVudFNlYXJjaFRlcm0iLCJzZXRDbGllbnRTZWFyY2hUZXJtIiwibW9kZWxTZWFyY2hUZXJtIiwic2V0TW9kZWxTZWFyY2hUZXJtIiwiZmV0Y2hEYXRhIiwiZmV0Y2hQYXJ0c1dpdGhNYWNoaW5lRGF0YSIsImhhbmRsZUNsb3NlTW9kZWxNb2RhbCIsImhhbmRsZVNob3dNb2RlbE1vZGFsIiwic2VhcmNoQ2hhbmdlSGFuZGxlciIsInNlYXJjaEZpbHRlciIsInRlbXAiLCJDbGllbnQiLCJtb250aCIsImRheSIsInllYXIiLCJyZWZvcm1hdHRlZERhdGUiLCJOdW1iZXIiLCJzb3J0Q2hlY2tBbGwiLCJzb3J0ZWRJbmZvIiwic29ydCIsImEiLCJiIiwibG9jYWxlQ29tcGFyZSIsInBhcnNlIiwicm93U2VsZWN0IiwiZHJvcGRvd24xVGV4dCIsInNldERyb3Bkb3duMVRleHQiLCJkcm9wZG93bjJUZXh0Iiwic2V0RHJvcGRvd24yVGV4dCIsImhhbmRsZVNlbGVjdDEiLCJldmVudEtleSIsInRleHRDb250ZW50IiwiaGFuZGxlU2VsZWN0MiIsImhhbmRsZUNsaWVudENsaWNrIiwiaGFuZGxlQ2xpZW50U2VsZWN0IiwiY2xpZW50TmFtZSIsImhhbmRsZUNsZWFyQ2xpZW50U2VsZWN0aW9uIiwiaGFuZGxlTW9kZWxDbGljayIsIm1vZGVsc0RhdGEiLCJmZXRjaE1vZGVscyIsImhhbmRsZU1vZGVsU2VsZWN0IiwibW9kZWxOYW1lIiwiaGFuZGxlQ2xlYXJNb2RlbFNlbGVjdGlvbiIsImhhbmRsZVdhcmVob3VzZUNsaWNrIiwiaGFuZGxlVW5hc3NpZ25lZENsaWNrIiwiZGl2aWRlciIsImJ1dHRvbkdyb3VwIiwiZmxleEJ1dHRvbiIsInRhYmxlQ29udGFpbmVyIiwic3RpY2t5SGVhZGVyIiwiZm9ybWF0RGF0ZSIsInNlYXJjaENvbnRhaW5lciIsImZsZXgiLCJDbGllbnRJbmZvTW9kYWwiLCJsb2NhbCIsIkluZm9Nb2RhbCIsImRpbWVuc2lvbnMiLCJmcmVxSSIsImZyZXFNIiwidXNhZ2UiLCJNYWNoaW5lU2VsZWN0aW9uTW9kYWwiLCJzZXRNYWNoaW5lIiwic2V0T0VNIiwibG9hZGluZ01vZGVscyIsInNldExvYWRpbmdNb2RlbHMiLCJmZXRjaGVkTW9kZWxzIiwiaGFuZGxlTW9kYWxpdHlTZWxlY3QiLCJoYW5kbGVPRU1TZWxlY3QiLCJoYW5kbGVTYXZlU2VsZWN0aW9uIiwiQ2xpZW50VGFibGUiLCJvblNlbGVjdENsaWVudCIsIm9uSW5mb0NsaWNrIiwiY2xlYXJTZWxlY3Rpb24iLCJvbkFkZENsaWVudCIsImRpc2FibGVTZWxlY3QiLCJkaXNhYmxlSW5mbyIsImlzQ2xpZW50U2VhcmNoIiwiY2xpZW50VGFibGUiLCJNb2RlbFRhYmxlIiwib25TZWxlY3RNb2RlbCIsIm1vZGVsVGFibGUiLCJQYXJ0VGFibGUiLCJsYWJlbHMiLCJpZHMiLCJob3ZlclN0eWxlIiwiY2hlY2tEZWxldGUiLCJpc0RlbGV0aW5nIiwic2VsZWN0ZWRJdGVtcyIsInNldFNlbGVjdGVkSXRlbXMiLCJoYW5kbGVTZWxlY3RJdGVtIiwicHJldlNlbGVjdGVkSXRlbXMiLCJpdGVtSWQiLCJoYW5kbGVEZWxldGVTZWxlY3RlZCIsInNjcm9sbGFibGVUYWJsZSIsImZpeGVkVGFibGUiLCJhY3Rpb25Db2wiLCJjZWxsQ2xhbXAiLCJzdG9wUHJvcGFnYXRpb24iLCJmcm9tIiwicGFydHNTbmFwc2hvdCIsImRvY3MiLCJwYXJ0RG9jIiwicGFydERhdGEiLCJNYWNoaW5lIiwiRG9jdW1lbnRSZWZlcmVuY2UiLCJjbGllbnRzU25hcHNob3QiLCJmaWx0ZXJlZENsaWVudHMiLCJtYXRjaCIsImlzVmFsaWQiLCJ0aW1lc3RhbXAiLCJ0b0RhdGUi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LGtDOzs7Ozs7Ozs7OztBQ0FBLDRDOzs7Ozs7Ozs7OztBQ0FBLHFDOzs7Ozs7Ozs7OztBQ0FBLHFEOzs7Ozs7Ozs7OztBQ0FBLDZDIiwiZmlsZSI6InBhZ2VzL05ld1NlYXJjaC9BZGRJdGVtL05ld0l0ZW0uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHJlcXVpcmUoJy4uLy4uLy4uL3Nzci1tb2R1bGUtY2FjaGUuanMnKTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBjaHVua3NcbiBcdC8vIFwiMFwiIG1lYW5zIFwiYWxyZWFkeSBsb2FkZWRcIlxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0XCJwYWdlcy9OZXdTZWFyY2gvQWRkSXRlbS9OZXdJdGVtXCI6IDBcbiBcdH07XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdHZhciB0aHJldyA9IHRydWU7XG4gXHRcdHRyeSB7XG4gXHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG4gXHRcdFx0dGhyZXcgPSBmYWxzZTtcbiBcdFx0fSBmaW5hbGx5IHtcbiBcdFx0XHRpZih0aHJldykgZGVsZXRlIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHR9XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gdW5jYXVnaHQgZXJyb3IgaGFuZGxlciBmb3Igd2VicGFjayBydW50aW1lXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm9lID0gZnVuY3Rpb24oZXJyKSB7XG4gXHRcdHByb2Nlc3MubmV4dFRpY2soZnVuY3Rpb24oKSB7XG4gXHRcdFx0dGhyb3cgZXJyOyAvLyBjYXRjaCB0aGlzIGVycm9yIGJ5IHVzaW5nIGltcG9ydCgpLmNhdGNoKClcbiBcdFx0fSk7XG4gXHR9O1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3BhZ2VzL05ld1NlYXJjaC9BZGRJdGVtL05ld0l0ZW0uanNcIik7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXh0L2Rpc3QvbmV4dC1zZXJ2ZXIvbGliL3JvdXRlci1jb250ZXh0LmpzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5leHQvZGlzdC9uZXh0LXNlcnZlci9saWIvcm91dGVyL3V0aWxzL2dldC1hc3NldC1wYXRoLWZyb20tcm91dGUuanNcIik7IiwiaW1wb3J0IHsgY3JlYXRlQ29udGV4dCwgdXNlQ29udGV4dCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHVzZUZpcmViYXNlQXV0aCBmcm9tIFwiLi91c2VGaXJlYmFzZUF1dGhcIjtcblxuY29uc3QgYXV0aFVzZXJDb250ZXh0ID0gY3JlYXRlQ29udGV4dCh7XG4gIGF1dGhVc2VyOiBudWxsLFxuICBsb2FkaW5nOiB0cnVlLFxuICBzaWduSW5XaXRoR29vZ2xlOiBhc3luYyAoKSA9PiB7fSxcbiAgc2lnbk91dDogYXN5bmMgKCkgPT4ge30sXG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIEF1dGhVc2VyUHJvdmlkZXIoeyBjaGlsZHJlbiB9KSB7XG4gIGNvbnN0IGF1dGggPSB1c2VGaXJlYmFzZUF1dGgoKTtcbiAgcmV0dXJuIChcbiAgICA8YXV0aFVzZXJDb250ZXh0LlByb3ZpZGVyIHZhbHVlPXthdXRofT57Y2hpbGRyZW59PC9hdXRoVXNlckNvbnRleHQuUHJvdmlkZXI+XG4gICk7XG59XG5cbmV4cG9ydCBjb25zdCB1c2VBdXRoID0gKCkgPT4gdXNlQ29udGV4dChhdXRoVXNlckNvbnRleHQpO1xuIiwiLy8gLy8gaW1wb3J0IGZpcmViYXNlIGZyb20gXCJmaXJlYmFzZS9hcHBcIlxuLy8gaW1wb3J0ICogYXMgZmlyZWJhc2UgZnJvbSBcImZpcmViYXNlL2FwcFwiO1xuLy8gLy8gaW1wb3J0IFwiZmlyZWJhc2UvYXV0aFwiXG5cbi8vIGNvbnN0IGFwcCA9IGZpcmViYXNlLmluaXRpYWxpemVBcHAoe1xuLy8gICAgIGFwaUtleTogXCJBSXphU3lDeEMtYThiNVZoaGV5OEdGNDdMcFhaMWFNS1ltaUlod0VcIixcbi8vICAgICBhdXRoRG9tYWluOiBcIm1hZ21vLWFjMTBjLmZpcmViYXNlYXBwLmNvbVwiLFxuLy8gICAgIHByb2plY3RJZDogXCJtYWdtby1hYzEwY1wiLFxuLy8gICAgIHN0b3JhZ2VCdWNrZXQ6IFwibWFnbW8tYWMxMGMuYXBwc3BvdC5jb21cIixcbi8vICAgICBtZXNzYWdpbmdTZW5kZXJJZDogXCIxNzc4NTc1MjUxNDdcIixcbi8vICAgICBhcHBJZDogXCIxOjE3Nzg1NzUyNTE0Nzp3ZWI6YWM4ZTNjODdkODIzOTZiZWIxZGQzZVwiLFxuLy8gICAgIG1lYXN1cmVtZW50SWQ6IFwiRy1MMDIzNkpUNU4zXCJcbi8vIH0pXG5cbi8vIGV4cG9ydCBjb25zdCBhdXRoID0gYXBwLmF1dGgoKVxuLy8gZXhwb3J0IGRlZmF1bHQgYXBwXG5cbi8vIGFwaUtleTogcHJvY2Vzcy5lbnYuUkVBQ1RfQVBQX0ZJUkVCQVNFX0tFWSxcbi8vICAgICBhdXRoRG9tYWluOiBwcm9jZXNzLmVudi5SRUFDVF9BUFBfRklSRUJBU0VfQVVUSF9ET01BSU4sXG4vLyAgICAgcHJvamVjdElkOiBwcm9jZXNzLmVudi5SRUFDVF9BUFBfRklSRUJBU0VfUFJPSkVDVF9JRCxcbi8vICAgICBzdG9yYWdlQnVja2V0OiBwcm9jZXNzLmVudi5SRUFDVF9BUFBfRklSRUJBU0VfU1RPUkFHRV9CVUNLRVQsXG4vLyAgICAgbWVzc2FnaW5nU2VuZGVySWQ6IHByb2Nlc3MuZW52LlJFQUNUX0FQUF9GSVJFQkFTRV9NRVNTQUdJTkdfU0VOREVSX0lELFxuLy8gICAgIGFwcElkOiBwcm9jZXNzLmVudi5SRUFDVF9BUFBfRklSRUJBU0VfQVBQX0lELFxuLy8gICAgIG1lYXN1cmVtZW50SWQ6IHByb2Nlc3MuZW52LlJFQUNUX0FQUF9GSVJFQkFTRV9NRUFTVVJFTUVOVF9JRFxuXG5pbXBvcnQgRmlyZWJhc2UgZnJvbSBcImZpcmViYXNlL2NvbXBhdC9hcHBcIjtcbmltcG9ydCBcImZpcmViYXNlL2NvbXBhdC9hdXRoXCI7XG5pbXBvcnQgXCJmaXJlYmFzZS9jb21wYXQvZmlyZXN0b3JlXCI7XG5pbXBvcnQgXCJmaXJlYmFzZS9jb21wYXQvc3RvcmFnZVwiO1xuXG5jb25zdCBGaXJlYmFzZUNyZWRlbnRpYWxzID0ge1xuICBhcGlLZXk6IFwiQUl6YVN5Q3hDLWE4YjVWaGhleThHRjQ3THBYWjFhTUtZbWlJaHdFXCIsXG4gIGF1dGhEb21haW46IFwibWFnbW8tYWMxMGMuZmlyZWJhc2VhcHAuY29tXCIsXG4gIHByb2plY3RJZDogXCJtYWdtby1hYzEwY1wiLFxuICBzdG9yYWdlQnVja2V0OiBcIm1hZ21vLWFjMTBjLmFwcHNwb3QuY29tXCIsXG4gIG1lc3NhZ2luZ1NlbmRlcklkOiBcIjE3Nzg1NzUyNTE0N1wiLFxuICBhcHBJZDogXCIxOjE3Nzg1NzUyNTE0Nzp3ZWI6YWM4ZTNjODdkODIzOTZiZWIxZGQzZVwiLFxuICBtZWFzdXJlbWVudElkOiBcIkctTDAyMzZKVDVOM1wiLFxufTtcbi8vIGlmIGEgRmlyZWJhc2UgaW5zdGFuY2UgZG9lc24ndCBleGlzdCwgY3JlYXRlIG9uZVxuaWYgKCFGaXJlYmFzZS5hcHBzLmxlbmd0aCkge1xuICBGaXJlYmFzZS5pbml0aWFsaXplQXBwKEZpcmViYXNlQ3JlZGVudGlhbHMpO1xufVxuXG5leHBvcnQgY29uc3QgYXV0aCA9IEZpcmViYXNlLmF1dGgoKTtcbmV4cG9ydCBkZWZhdWx0IEZpcmViYXNlO1xuXG4vLyBpbXBvcnQgeyBpbml0aWFsaXplQXBwIH0gZnJvbSAnZmlyZWJhc2UvYXBwJztcbi8vIGltcG9ydCB7IGdldEZpcmVzdG9yZSwgY29sbGVjdGlvbiwgZ2V0RG9jcyB9IGZyb20gJ2ZpcmViYXNlL2ZpcmVzdG9yZSc7XG5cbi8vIGNvbnN0IGFwcCA9IGluaXRpYWxpemVBcHAoZmlyZWJhc2VDb25maWcpO1xuLy8gY29uc3QgZGIgPSBnZXRGaXJlc3RvcmUoYXBwKTtcblxuLy8gZXhwb3J0IGRlZmF1bHQgYXBwO1xuIiwiaW1wb3J0IHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IEZpcmViYXNlLCB7IGF1dGggfSBmcm9tIFwiLi9GaXJlYmFzZVwiO1xuXG5jb25zdCBmb3JtYXRBdXRoVXNlciA9ICh1c2VyKSA9PiAoe1xuICB1aWQ6IHVzZXIudWlkLFxuICBlbWFpbDogdXNlci5lbWFpbCxcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB1c2VGaXJlYmFzZUF1dGgoKSB7XG4gIGNvbnN0IFthdXRoVXNlciwgc2V0QXV0aFVzZXJdID0gdXNlU3RhdGUobnVsbCk7XG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKHRydWUpO1xuXG4gIGNvbnN0IGF1dGhTdGF0ZUNoYW5nZWQgPSBhc3luYyAoYXV0aFN0YXRlKSA9PiB7XG4gICAgaWYgKCFhdXRoU3RhdGUpIHtcbiAgICAgIHNldEF1dGhVc2VyKG51bGwpO1xuICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc2V0TG9hZGluZyh0cnVlKTtcbiAgICBjb25zdCBmb3JtYXR0ZWRVc2VyID0gZm9ybWF0QXV0aFVzZXIoYXV0aFN0YXRlKTtcbiAgICBzZXRBdXRoVXNlcihmb3JtYXR0ZWRVc2VyKTtcbiAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgfTtcblxuICBjb25zdCBjbGVhciA9ICgpID0+IHtcbiAgICBzZXRBdXRoVXNlcihudWxsKTtcbiAgICBzZXRMb2FkaW5nKHRydWUpO1xuICB9O1xuXG4gIC8vc2lnbiBpbiB3aXRoIGdvb2dsZVxuICBjb25zdCBzaWduSW5XaXRoR29vZ2xlID0gKCkgPT4ge1xuICAgIGNvbnN0IHByb3ZpZGVyID0gbmV3IEZpcmViYXNlLmF1dGguR29vZ2xlQXV0aFByb3ZpZGVyKCk7XG4gICAgcHJvdmlkZXIuc2V0Q3VzdG9tUGFyYW1ldGVycyh7IHByb21wdDogXCJzZWxlY3RfYWNjb3VudFwiIH0pO1xuXG4gICAgcmV0dXJuIGF1dGguc2lnbkluV2l0aFJlZGlyZWN0KHByb3ZpZGVyKS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJHb29nbGUgU2lnbi1JbiBFcnJvcjpcIiwgZXJyb3IpO1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3Qgc2lnbk91dCA9ICgpID0+IGF1dGguc2lnbk91dCgpLnRoZW4oY2xlYXIpO1xuXG4gIC8vIExpc3RlbiBmb3IgRmlyZWJhc2UgYXV0aCBzdGF0ZSBjaGFuZ2VzXG4gIC8vIHVzZUVmZmVjdCgoKSA9PiB7XG4gIC8vICAgY29uc3QgdW5zdWJzY3JpYmUgPSBhdXRoLm9uQXV0aFN0YXRlQ2hhbmdlZChhdXRoU3RhdGVDaGFuZ2VkKTtcbiAgLy8gICByZXR1cm4gKCkgPT4gdW5zdWJzY3JpYmUoKTtcbiAgLy8gfSwgW10pO1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGxldCB1bnN1YnNjcmliZTtcbiAgICBhdXRoXG4gICAgICAuc2V0UGVyc2lzdGVuY2UoRmlyZWJhc2UuYXV0aC5BdXRoLlBlcnNpc3RlbmNlLkxPQ0FMKVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAvLyBOb3cgc2V0IHVwIHRoZSBsaXN0ZW5lclxuICAgICAgICB1bnN1YnNjcmliZSA9IGF1dGgub25BdXRoU3RhdGVDaGFuZ2VkKGF1dGhTdGF0ZUNoYW5nZWQpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IGNvbnNvbGUuZXJyb3IoXCJFcnJvciBzZXR0aW5nIHBlcnNpc3RlbmNlOlwiLCBlcnJvcikpO1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGlmICh1bnN1YnNjcmliZSkge1xuICAgICAgICB1bnN1YnNjcmliZSgpO1xuICAgICAgfVxuICAgIH07XG4gIH0sIFtdKTtcblxuICByZXR1cm4ge1xuICAgIGF1dGhVc2VyLFxuICAgIGxvYWRpbmcsXG4gICAgc2lnbkluV2l0aEdvb2dsZSxcbiAgICBzaWduT3V0LFxuICB9O1xufVxuIiwiaW1wb3J0IFJlYWN0LCB7IENoaWxkcmVuLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IFVybE9iamVjdCB9IGZyb20gJ3VybCdcbmltcG9ydCB7XG4gIGFkZEJhc2VQYXRoLFxuICBhZGRMb2NhbGUsXG4gIGdldERvbWFpbkxvY2FsZSxcbiAgaXNMb2NhbFVSTCxcbiAgTmV4dFJvdXRlcixcbiAgUHJlZmV0Y2hPcHRpb25zLFxuICByZXNvbHZlSHJlZixcbn0gZnJvbSAnLi4vbmV4dC1zZXJ2ZXIvbGliL3JvdXRlci9yb3V0ZXInXG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tICcuL3JvdXRlcidcbmltcG9ydCB7IHVzZUludGVyc2VjdGlvbiB9IGZyb20gJy4vdXNlLWludGVyc2VjdGlvbidcblxudHlwZSBVcmwgPSBzdHJpbmcgfCBVcmxPYmplY3RcbnR5cGUgUmVxdWlyZWRLZXlzPFQ+ID0ge1xuICBbSyBpbiBrZXlvZiBUXS0/OiB7fSBleHRlbmRzIFBpY2s8VCwgSz4gPyBuZXZlciA6IEtcbn1ba2V5b2YgVF1cbnR5cGUgT3B0aW9uYWxLZXlzPFQ+ID0ge1xuICBbSyBpbiBrZXlvZiBUXS0/OiB7fSBleHRlbmRzIFBpY2s8VCwgSz4gPyBLIDogbmV2ZXJcbn1ba2V5b2YgVF1cblxuZXhwb3J0IHR5cGUgTGlua1Byb3BzID0ge1xuICBocmVmOiBVcmxcbiAgYXM/OiBVcmxcbiAgcmVwbGFjZT86IGJvb2xlYW5cbiAgc2Nyb2xsPzogYm9vbGVhblxuICBzaGFsbG93PzogYm9vbGVhblxuICBwYXNzSHJlZj86IGJvb2xlYW5cbiAgcHJlZmV0Y2g/OiBib29sZWFuXG4gIGxvY2FsZT86IHN0cmluZyB8IGZhbHNlXG59XG50eXBlIExpbmtQcm9wc1JlcXVpcmVkID0gUmVxdWlyZWRLZXlzPExpbmtQcm9wcz5cbnR5cGUgTGlua1Byb3BzT3B0aW9uYWwgPSBPcHRpb25hbEtleXM8TGlua1Byb3BzPlxuXG5jb25zdCBwcmVmZXRjaGVkOiB7IFtjYWNoZUtleTogc3RyaW5nXTogYm9vbGVhbiB9ID0ge31cblxuZnVuY3Rpb24gcHJlZmV0Y2goXG4gIHJvdXRlcjogTmV4dFJvdXRlcixcbiAgaHJlZjogc3RyaW5nLFxuICBhczogc3RyaW5nLFxuICBvcHRpb25zPzogUHJlZmV0Y2hPcHRpb25zXG4pOiB2b2lkIHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnIHx8ICFyb3V0ZXIpIHJldHVyblxuICBpZiAoIWlzTG9jYWxVUkwoaHJlZikpIHJldHVyblxuICAvLyBQcmVmZXRjaCB0aGUgSlNPTiBwYWdlIGlmIGFza2VkIChvbmx5IGluIHRoZSBjbGllbnQpXG4gIC8vIFdlIG5lZWQgdG8gaGFuZGxlIGEgcHJlZmV0Y2ggZXJyb3IgaGVyZSBzaW5jZSB3ZSBtYXkgYmVcbiAgLy8gbG9hZGluZyB3aXRoIHByaW9yaXR5IHdoaWNoIGNhbiByZWplY3QgYnV0IHdlIGRvbid0XG4gIC8vIHdhbnQgdG8gZm9yY2UgbmF2aWdhdGlvbiBzaW5jZSB0aGlzIGlzIG9ubHkgYSBwcmVmZXRjaFxuICByb3V0ZXIucHJlZmV0Y2goaHJlZiwgYXMsIG9wdGlvbnMpLmNhdGNoKChlcnIpID0+IHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgLy8gcmV0aHJvdyB0byBzaG93IGludmFsaWQgVVJMIGVycm9yc1xuICAgICAgdGhyb3cgZXJyXG4gICAgfVxuICB9KVxuICBjb25zdCBjdXJMb2NhbGUgPVxuICAgIG9wdGlvbnMgJiYgdHlwZW9mIG9wdGlvbnMubG9jYWxlICE9PSAndW5kZWZpbmVkJ1xuICAgICAgPyBvcHRpb25zLmxvY2FsZVxuICAgICAgOiByb3V0ZXIgJiYgcm91dGVyLmxvY2FsZVxuXG4gIC8vIEpvaW4gb24gYW4gaW52YWxpZCBVUkkgY2hhcmFjdGVyXG4gIHByZWZldGNoZWRbaHJlZiArICclJyArIGFzICsgKGN1ckxvY2FsZSA/ICclJyArIGN1ckxvY2FsZSA6ICcnKV0gPSB0cnVlXG59XG5cbmZ1bmN0aW9uIGlzTW9kaWZpZWRFdmVudChldmVudDogUmVhY3QuTW91c2VFdmVudCk6IGJvb2xlYW4ge1xuICBjb25zdCB7IHRhcmdldCB9ID0gZXZlbnQuY3VycmVudFRhcmdldCBhcyBIVE1MQW5jaG9yRWxlbWVudFxuICByZXR1cm4gKFxuICAgICh0YXJnZXQgJiYgdGFyZ2V0ICE9PSAnX3NlbGYnKSB8fFxuICAgIGV2ZW50Lm1ldGFLZXkgfHxcbiAgICBldmVudC5jdHJsS2V5IHx8XG4gICAgZXZlbnQuc2hpZnRLZXkgfHxcbiAgICBldmVudC5hbHRLZXkgfHwgLy8gdHJpZ2dlcnMgcmVzb3VyY2UgZG93bmxvYWRcbiAgICAoZXZlbnQubmF0aXZlRXZlbnQgJiYgZXZlbnQubmF0aXZlRXZlbnQud2hpY2ggPT09IDIpXG4gIClcbn1cblxuZnVuY3Rpb24gbGlua0NsaWNrZWQoXG4gIGU6IFJlYWN0Lk1vdXNlRXZlbnQsXG4gIHJvdXRlcjogTmV4dFJvdXRlcixcbiAgaHJlZjogc3RyaW5nLFxuICBhczogc3RyaW5nLFxuICByZXBsYWNlPzogYm9vbGVhbixcbiAgc2hhbGxvdz86IGJvb2xlYW4sXG4gIHNjcm9sbD86IGJvb2xlYW4sXG4gIGxvY2FsZT86IHN0cmluZyB8IGZhbHNlXG4pOiB2b2lkIHtcbiAgY29uc3QgeyBub2RlTmFtZSB9ID0gZS5jdXJyZW50VGFyZ2V0XG5cbiAgaWYgKG5vZGVOYW1lID09PSAnQScgJiYgKGlzTW9kaWZpZWRFdmVudChlKSB8fCAhaXNMb2NhbFVSTChocmVmKSkpIHtcbiAgICAvLyBpZ25vcmUgY2xpY2sgZm9yIGJyb3dzZXLigJlzIGRlZmF1bHQgYmVoYXZpb3JcbiAgICByZXR1cm5cbiAgfVxuXG4gIGUucHJldmVudERlZmF1bHQoKVxuXG4gIC8vICBhdm9pZCBzY3JvbGwgZm9yIHVybHMgd2l0aCBhbmNob3IgcmVmc1xuICBpZiAoc2Nyb2xsID09IG51bGwpIHtcbiAgICBzY3JvbGwgPSBhcy5pbmRleE9mKCcjJykgPCAwXG4gIH1cblxuICAvLyByZXBsYWNlIHN0YXRlIGluc3RlYWQgb2YgcHVzaCBpZiBwcm9wIGlzIHByZXNlbnRcbiAgcm91dGVyW3JlcGxhY2UgPyAncmVwbGFjZScgOiAncHVzaCddKGhyZWYsIGFzLCB7XG4gICAgc2hhbGxvdyxcbiAgICBsb2NhbGUsXG4gICAgc2Nyb2xsLFxuICB9KVxufVxuXG5mdW5jdGlvbiBMaW5rKHByb3BzOiBSZWFjdC5Qcm9wc1dpdGhDaGlsZHJlbjxMaW5rUHJvcHM+KSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgZnVuY3Rpb24gY3JlYXRlUHJvcEVycm9yKGFyZ3M6IHtcbiAgICAgIGtleTogc3RyaW5nXG4gICAgICBleHBlY3RlZDogc3RyaW5nXG4gICAgICBhY3R1YWw6IHN0cmluZ1xuICAgIH0pIHtcbiAgICAgIHJldHVybiBuZXcgRXJyb3IoXG4gICAgICAgIGBGYWlsZWQgcHJvcCB0eXBlOiBUaGUgcHJvcCBcXGAke2FyZ3Mua2V5fVxcYCBleHBlY3RzIGEgJHthcmdzLmV4cGVjdGVkfSBpbiBcXGA8TGluaz5cXGAsIGJ1dCBnb3QgXFxgJHthcmdzLmFjdHVhbH1cXGAgaW5zdGVhZC5gICtcbiAgICAgICAgICAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCdcbiAgICAgICAgICAgID8gXCJcXG5PcGVuIHlvdXIgYnJvd3NlcidzIGNvbnNvbGUgdG8gdmlldyB0aGUgQ29tcG9uZW50IHN0YWNrIHRyYWNlLlwiXG4gICAgICAgICAgICA6ICcnKVxuICAgICAgKVxuICAgIH1cblxuICAgIC8vIFR5cGVTY3JpcHQgdHJpY2sgZm9yIHR5cGUtZ3VhcmRpbmc6XG4gICAgY29uc3QgcmVxdWlyZWRQcm9wc0d1YXJkOiBSZWNvcmQ8TGlua1Byb3BzUmVxdWlyZWQsIHRydWU+ID0ge1xuICAgICAgaHJlZjogdHJ1ZSxcbiAgICB9IGFzIGNvbnN0XG4gICAgY29uc3QgcmVxdWlyZWRQcm9wczogTGlua1Byb3BzUmVxdWlyZWRbXSA9IE9iamVjdC5rZXlzKFxuICAgICAgcmVxdWlyZWRQcm9wc0d1YXJkXG4gICAgKSBhcyBMaW5rUHJvcHNSZXF1aXJlZFtdXG4gICAgcmVxdWlyZWRQcm9wcy5mb3JFYWNoKChrZXk6IExpbmtQcm9wc1JlcXVpcmVkKSA9PiB7XG4gICAgICBpZiAoa2V5ID09PSAnaHJlZicpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHByb3BzW2tleV0gPT0gbnVsbCB8fFxuICAgICAgICAgICh0eXBlb2YgcHJvcHNba2V5XSAhPT0gJ3N0cmluZycgJiYgdHlwZW9mIHByb3BzW2tleV0gIT09ICdvYmplY3QnKVxuICAgICAgICApIHtcbiAgICAgICAgICB0aHJvdyBjcmVhdGVQcm9wRXJyb3Ioe1xuICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgZXhwZWN0ZWQ6ICdgc3RyaW5nYCBvciBgb2JqZWN0YCcsXG4gICAgICAgICAgICBhY3R1YWw6IHByb3BzW2tleV0gPT09IG51bGwgPyAnbnVsbCcgOiB0eXBlb2YgcHJvcHNba2V5XSxcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBUeXBlU2NyaXB0IHRyaWNrIGZvciB0eXBlLWd1YXJkaW5nOlxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzXG4gICAgICAgIGNvbnN0IF86IG5ldmVyID0ga2V5XG4gICAgICB9XG4gICAgfSlcblxuICAgIC8vIFR5cGVTY3JpcHQgdHJpY2sgZm9yIHR5cGUtZ3VhcmRpbmc6XG4gICAgY29uc3Qgb3B0aW9uYWxQcm9wc0d1YXJkOiBSZWNvcmQ8TGlua1Byb3BzT3B0aW9uYWwsIHRydWU+ID0ge1xuICAgICAgYXM6IHRydWUsXG4gICAgICByZXBsYWNlOiB0cnVlLFxuICAgICAgc2Nyb2xsOiB0cnVlLFxuICAgICAgc2hhbGxvdzogdHJ1ZSxcbiAgICAgIHBhc3NIcmVmOiB0cnVlLFxuICAgICAgcHJlZmV0Y2g6IHRydWUsXG4gICAgICBsb2NhbGU6IHRydWUsXG4gICAgfSBhcyBjb25zdFxuICAgIGNvbnN0IG9wdGlvbmFsUHJvcHM6IExpbmtQcm9wc09wdGlvbmFsW10gPSBPYmplY3Qua2V5cyhcbiAgICAgIG9wdGlvbmFsUHJvcHNHdWFyZFxuICAgICkgYXMgTGlua1Byb3BzT3B0aW9uYWxbXVxuICAgIG9wdGlvbmFsUHJvcHMuZm9yRWFjaCgoa2V5OiBMaW5rUHJvcHNPcHRpb25hbCkgPT4ge1xuICAgICAgY29uc3QgdmFsVHlwZSA9IHR5cGVvZiBwcm9wc1trZXldXG5cbiAgICAgIGlmIChrZXkgPT09ICdhcycpIHtcbiAgICAgICAgaWYgKHByb3BzW2tleV0gJiYgdmFsVHlwZSAhPT0gJ3N0cmluZycgJiYgdmFsVHlwZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICB0aHJvdyBjcmVhdGVQcm9wRXJyb3Ioe1xuICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgZXhwZWN0ZWQ6ICdgc3RyaW5nYCBvciBgb2JqZWN0YCcsXG4gICAgICAgICAgICBhY3R1YWw6IHZhbFR5cGUsXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChrZXkgPT09ICdsb2NhbGUnKSB7XG4gICAgICAgIGlmIChwcm9wc1trZXldICYmIHZhbFR5cGUgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgdGhyb3cgY3JlYXRlUHJvcEVycm9yKHtcbiAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgIGV4cGVjdGVkOiAnYHN0cmluZ2AnLFxuICAgICAgICAgICAgYWN0dWFsOiB2YWxUeXBlLFxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIGtleSA9PT0gJ3JlcGxhY2UnIHx8XG4gICAgICAgIGtleSA9PT0gJ3Njcm9sbCcgfHxcbiAgICAgICAga2V5ID09PSAnc2hhbGxvdycgfHxcbiAgICAgICAga2V5ID09PSAncGFzc0hyZWYnIHx8XG4gICAgICAgIGtleSA9PT0gJ3ByZWZldGNoJ1xuICAgICAgKSB7XG4gICAgICAgIGlmIChwcm9wc1trZXldICE9IG51bGwgJiYgdmFsVHlwZSAhPT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgICAgdGhyb3cgY3JlYXRlUHJvcEVycm9yKHtcbiAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgIGV4cGVjdGVkOiAnYGJvb2xlYW5gJyxcbiAgICAgICAgICAgIGFjdHVhbDogdmFsVHlwZSxcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBUeXBlU2NyaXB0IHRyaWNrIGZvciB0eXBlLWd1YXJkaW5nOlxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzXG4gICAgICAgIGNvbnN0IF86IG5ldmVyID0ga2V5XG4gICAgICB9XG4gICAgfSlcblxuICAgIC8vIFRoaXMgaG9vayBpcyBpbiBhIGNvbmRpdGlvbmFsIGJ1dCB0aGF0IGlzIG9rIGJlY2F1c2UgYHByb2Nlc3MuZW52Lk5PREVfRU5WYCBuZXZlciBjaGFuZ2VzXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlYWN0LWhvb2tzL3J1bGVzLW9mLWhvb2tzXG4gICAgY29uc3QgaGFzV2FybmVkID0gUmVhY3QudXNlUmVmKGZhbHNlKVxuICAgIGlmIChwcm9wcy5wcmVmZXRjaCAmJiAhaGFzV2FybmVkLmN1cnJlbnQpIHtcbiAgICAgIGhhc1dhcm5lZC5jdXJyZW50ID0gdHJ1ZVxuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAnTmV4dC5qcyBhdXRvLXByZWZldGNoZXMgYXV0b21hdGljYWxseSBiYXNlZCBvbiB2aWV3cG9ydC4gVGhlIHByZWZldGNoIGF0dHJpYnV0ZSBpcyBubyBsb25nZXIgbmVlZGVkLiBNb3JlOiBodHRwczovL25leHRqcy5vcmcvZG9jcy9tZXNzYWdlcy9wcmVmZXRjaC10cnVlLWRlcHJlY2F0ZWQnXG4gICAgICApXG4gICAgfVxuICB9XG4gIGNvbnN0IHAgPSBwcm9wcy5wcmVmZXRjaCAhPT0gZmFsc2VcblxuICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKVxuICBjb25zdCBwYXRobmFtZSA9IChyb3V0ZXIgJiYgcm91dGVyLmFzUGF0aCkgfHwgJy8nXG5cbiAgY29uc3QgeyBocmVmLCBhcyB9ID0gUmVhY3QudXNlTWVtbygoKSA9PiB7XG4gICAgY29uc3QgW3Jlc29sdmVkSHJlZiwgcmVzb2x2ZWRBc10gPSByZXNvbHZlSHJlZihwYXRobmFtZSwgcHJvcHMuaHJlZiwgdHJ1ZSlcbiAgICByZXR1cm4ge1xuICAgICAgaHJlZjogcmVzb2x2ZWRIcmVmLFxuICAgICAgYXM6IHByb3BzLmFzXG4gICAgICAgID8gcmVzb2x2ZUhyZWYocGF0aG5hbWUsIHByb3BzLmFzKVxuICAgICAgICA6IHJlc29sdmVkQXMgfHwgcmVzb2x2ZWRIcmVmLFxuICAgIH1cbiAgfSwgW3BhdGhuYW1lLCBwcm9wcy5ocmVmLCBwcm9wcy5hc10pXG5cbiAgbGV0IHsgY2hpbGRyZW4sIHJlcGxhY2UsIHNoYWxsb3csIHNjcm9sbCwgbG9jYWxlIH0gPSBwcm9wc1xuXG4gIC8vIERlcHJlY2F0ZWQuIFdhcm5pbmcgc2hvd24gYnkgcHJvcFR5cGUgY2hlY2suIElmIHRoZSBjaGlsZHJlbiBwcm92aWRlZCBpcyBhIHN0cmluZyAoPExpbms+ZXhhbXBsZTwvTGluaz4pIHdlIHdyYXAgaXQgaW4gYW4gPGE+IHRhZ1xuICBpZiAodHlwZW9mIGNoaWxkcmVuID09PSAnc3RyaW5nJykge1xuICAgIGNoaWxkcmVuID0gPGE+e2NoaWxkcmVufTwvYT5cbiAgfVxuXG4gIC8vIFRoaXMgd2lsbCByZXR1cm4gdGhlIGZpcnN0IGNoaWxkLCBpZiBtdWx0aXBsZSBhcmUgcHJvdmlkZWQgaXQgd2lsbCB0aHJvdyBhbiBlcnJvclxuICBjb25zdCBjaGlsZDogYW55ID0gQ2hpbGRyZW4ub25seShjaGlsZHJlbilcbiAgY29uc3QgY2hpbGRSZWY6IGFueSA9IGNoaWxkICYmIHR5cGVvZiBjaGlsZCA9PT0gJ29iamVjdCcgJiYgY2hpbGQucmVmXG5cbiAgY29uc3QgW3NldEludGVyc2VjdGlvblJlZiwgaXNWaXNpYmxlXSA9IHVzZUludGVyc2VjdGlvbih7XG4gICAgcm9vdE1hcmdpbjogJzIwMHB4JyxcbiAgfSlcbiAgY29uc3Qgc2V0UmVmID0gUmVhY3QudXNlQ2FsbGJhY2soXG4gICAgKGVsOiBFbGVtZW50KSA9PiB7XG4gICAgICBzZXRJbnRlcnNlY3Rpb25SZWYoZWwpXG4gICAgICBpZiAoY2hpbGRSZWYpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBjaGlsZFJlZiA9PT0gJ2Z1bmN0aW9uJykgY2hpbGRSZWYoZWwpXG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBjaGlsZFJlZiA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICBjaGlsZFJlZi5jdXJyZW50ID0gZWxcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgW2NoaWxkUmVmLCBzZXRJbnRlcnNlY3Rpb25SZWZdXG4gIClcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBzaG91bGRQcmVmZXRjaCA9IGlzVmlzaWJsZSAmJiBwICYmIGlzTG9jYWxVUkwoaHJlZilcbiAgICBjb25zdCBjdXJMb2NhbGUgPVxuICAgICAgdHlwZW9mIGxvY2FsZSAhPT0gJ3VuZGVmaW5lZCcgPyBsb2NhbGUgOiByb3V0ZXIgJiYgcm91dGVyLmxvY2FsZVxuICAgIGNvbnN0IGlzUHJlZmV0Y2hlZCA9XG4gICAgICBwcmVmZXRjaGVkW2hyZWYgKyAnJScgKyBhcyArIChjdXJMb2NhbGUgPyAnJScgKyBjdXJMb2NhbGUgOiAnJyldXG4gICAgaWYgKHNob3VsZFByZWZldGNoICYmICFpc1ByZWZldGNoZWQpIHtcbiAgICAgIHByZWZldGNoKHJvdXRlciwgaHJlZiwgYXMsIHtcbiAgICAgICAgbG9jYWxlOiBjdXJMb2NhbGUsXG4gICAgICB9KVxuICAgIH1cbiAgfSwgW2FzLCBocmVmLCBpc1Zpc2libGUsIGxvY2FsZSwgcCwgcm91dGVyXSlcblxuICBjb25zdCBjaGlsZFByb3BzOiB7XG4gICAgb25Nb3VzZUVudGVyPzogUmVhY3QuTW91c2VFdmVudEhhbmRsZXJcbiAgICBvbkNsaWNrOiBSZWFjdC5Nb3VzZUV2ZW50SGFuZGxlclxuICAgIGhyZWY/OiBzdHJpbmdcbiAgICByZWY/OiBhbnlcbiAgfSA9IHtcbiAgICByZWY6IHNldFJlZixcbiAgICBvbkNsaWNrOiAoZTogUmVhY3QuTW91c2VFdmVudCkgPT4ge1xuICAgICAgaWYgKGNoaWxkLnByb3BzICYmIHR5cGVvZiBjaGlsZC5wcm9wcy5vbkNsaWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGNoaWxkLnByb3BzLm9uQ2xpY2soZSlcbiAgICAgIH1cbiAgICAgIGlmICghZS5kZWZhdWx0UHJldmVudGVkKSB7XG4gICAgICAgIGxpbmtDbGlja2VkKGUsIHJvdXRlciwgaHJlZiwgYXMsIHJlcGxhY2UsIHNoYWxsb3csIHNjcm9sbCwgbG9jYWxlKVxuICAgICAgfVxuICAgIH0sXG4gIH1cblxuICBjaGlsZFByb3BzLm9uTW91c2VFbnRlciA9IChlOiBSZWFjdC5Nb3VzZUV2ZW50KSA9PiB7XG4gICAgaWYgKCFpc0xvY2FsVVJMKGhyZWYpKSByZXR1cm5cbiAgICBpZiAoY2hpbGQucHJvcHMgJiYgdHlwZW9mIGNoaWxkLnByb3BzLm9uTW91c2VFbnRlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY2hpbGQucHJvcHMub25Nb3VzZUVudGVyKGUpXG4gICAgfVxuICAgIHByZWZldGNoKHJvdXRlciwgaHJlZiwgYXMsIHsgcHJpb3JpdHk6IHRydWUgfSlcbiAgfVxuXG4gIC8vIElmIGNoaWxkIGlzIGFuIDxhPiB0YWcgYW5kIGRvZXNuJ3QgaGF2ZSBhIGhyZWYgYXR0cmlidXRlLCBvciBpZiB0aGUgJ3Bhc3NIcmVmJyBwcm9wZXJ0eSBpc1xuICAvLyBkZWZpbmVkLCB3ZSBzcGVjaWZ5IHRoZSBjdXJyZW50ICdocmVmJywgc28gdGhhdCByZXBldGl0aW9uIGlzIG5vdCBuZWVkZWQgYnkgdGhlIHVzZXJcbiAgaWYgKHByb3BzLnBhc3NIcmVmIHx8IChjaGlsZC50eXBlID09PSAnYScgJiYgISgnaHJlZicgaW4gY2hpbGQucHJvcHMpKSkge1xuICAgIGNvbnN0IGN1ckxvY2FsZSA9XG4gICAgICB0eXBlb2YgbG9jYWxlICE9PSAndW5kZWZpbmVkJyA/IGxvY2FsZSA6IHJvdXRlciAmJiByb3V0ZXIubG9jYWxlXG5cbiAgICAvLyB3ZSBvbmx5IHJlbmRlciBkb21haW4gbG9jYWxlcyBpZiB3ZSBhcmUgY3VycmVudGx5IG9uIGEgZG9tYWluIGxvY2FsZVxuICAgIC8vIHNvIHRoYXQgbG9jYWxlIGxpbmtzIGFyZSBzdGlsbCB2aXNpdGFibGUgaW4gZGV2ZWxvcG1lbnQvcHJldmlldyBlbnZzXG4gICAgY29uc3QgbG9jYWxlRG9tYWluID1cbiAgICAgIHJvdXRlciAmJlxuICAgICAgcm91dGVyLmlzTG9jYWxlRG9tYWluICYmXG4gICAgICBnZXREb21haW5Mb2NhbGUoXG4gICAgICAgIGFzLFxuICAgICAgICBjdXJMb2NhbGUsXG4gICAgICAgIHJvdXRlciAmJiByb3V0ZXIubG9jYWxlcyxcbiAgICAgICAgcm91dGVyICYmIHJvdXRlci5kb21haW5Mb2NhbGVzXG4gICAgICApXG5cbiAgICBjaGlsZFByb3BzLmhyZWYgPVxuICAgICAgbG9jYWxlRG9tYWluIHx8XG4gICAgICBhZGRCYXNlUGF0aChhZGRMb2NhbGUoYXMsIGN1ckxvY2FsZSwgcm91dGVyICYmIHJvdXRlci5kZWZhdWx0TG9jYWxlKSlcbiAgfVxuXG4gIHJldHVybiBSZWFjdC5jbG9uZUVsZW1lbnQoY2hpbGQsIGNoaWxkUHJvcHMpXG59XG5cbmV4cG9ydCBkZWZhdWx0IExpbmtcbiIsIi8qKlxuICogUmVtb3ZlcyB0aGUgdHJhaWxpbmcgc2xhc2ggb2YgYSBwYXRoIGlmIHRoZXJlIGlzIG9uZS4gUHJlc2VydmVzIHRoZSByb290IHBhdGggYC9gLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlUGF0aFRyYWlsaW5nU2xhc2gocGF0aDogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHBhdGguZW5kc1dpdGgoJy8nKSAmJiBwYXRoICE9PSAnLycgPyBwYXRoLnNsaWNlKDAsIC0xKSA6IHBhdGhcbn1cblxuLyoqXG4gKiBOb3JtYWxpemVzIHRoZSB0cmFpbGluZyBzbGFzaCBvZiBhIHBhdGggYWNjb3JkaW5nIHRvIHRoZSBgdHJhaWxpbmdTbGFzaGAgb3B0aW9uXG4gKiBpbiBgbmV4dC5jb25maWcuanNgLlxuICovXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplUGF0aFRyYWlsaW5nU2xhc2ggPSBwcm9jZXNzLmVudi5fX05FWFRfVFJBSUxJTkdfU0xBU0hcbiAgPyAocGF0aDogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgICAgIGlmICgvXFwuW14vXStcXC8/JC8udGVzdChwYXRoKSkge1xuICAgICAgICByZXR1cm4gcmVtb3ZlUGF0aFRyYWlsaW5nU2xhc2gocGF0aClcbiAgICAgIH0gZWxzZSBpZiAocGF0aC5lbmRzV2l0aCgnLycpKSB7XG4gICAgICAgIHJldHVybiBwYXRoXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gcGF0aCArICcvJ1xuICAgICAgfVxuICAgIH1cbiAgOiByZW1vdmVQYXRoVHJhaWxpbmdTbGFzaFxuIiwidHlwZSBSZXF1ZXN0SWRsZUNhbGxiYWNrSGFuZGxlID0gYW55XG50eXBlIFJlcXVlc3RJZGxlQ2FsbGJhY2tPcHRpb25zID0ge1xuICB0aW1lb3V0OiBudW1iZXJcbn1cbnR5cGUgUmVxdWVzdElkbGVDYWxsYmFja0RlYWRsaW5lID0ge1xuICByZWFkb25seSBkaWRUaW1lb3V0OiBib29sZWFuXG4gIHRpbWVSZW1haW5pbmc6ICgpID0+IG51bWJlclxufVxuXG5kZWNsYXJlIGdsb2JhbCB7XG4gIGludGVyZmFjZSBXaW5kb3cge1xuICAgIHJlcXVlc3RJZGxlQ2FsbGJhY2s6IChcbiAgICAgIGNhbGxiYWNrOiAoZGVhZGxpbmU6IFJlcXVlc3RJZGxlQ2FsbGJhY2tEZWFkbGluZSkgPT4gdm9pZCxcbiAgICAgIG9wdHM/OiBSZXF1ZXN0SWRsZUNhbGxiYWNrT3B0aW9uc1xuICAgICkgPT4gUmVxdWVzdElkbGVDYWxsYmFja0hhbmRsZVxuICAgIGNhbmNlbElkbGVDYWxsYmFjazogKGlkOiBSZXF1ZXN0SWRsZUNhbGxiYWNrSGFuZGxlKSA9PiB2b2lkXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IHJlcXVlc3RJZGxlQ2FsbGJhY2sgPVxuICAodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnICYmIHNlbGYucmVxdWVzdElkbGVDYWxsYmFjaykgfHxcbiAgZnVuY3Rpb24gKFxuICAgIGNiOiAoZGVhZGxpbmU6IFJlcXVlc3RJZGxlQ2FsbGJhY2tEZWFkbGluZSkgPT4gdm9pZFxuICApOiBOb2RlSlMuVGltZW91dCB7XG4gICAgbGV0IHN0YXJ0ID0gRGF0ZS5ub3coKVxuICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIGNiKHtcbiAgICAgICAgZGlkVGltZW91dDogZmFsc2UsXG4gICAgICAgIHRpbWVSZW1haW5pbmc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gTWF0aC5tYXgoMCwgNTAgLSAoRGF0ZS5ub3coKSAtIHN0YXJ0KSlcbiAgICAgICAgfSxcbiAgICAgIH0pXG4gICAgfSwgMSlcbiAgfVxuXG5leHBvcnQgY29uc3QgY2FuY2VsSWRsZUNhbGxiYWNrID1cbiAgKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyAmJiBzZWxmLmNhbmNlbElkbGVDYWxsYmFjaykgfHxcbiAgZnVuY3Rpb24gKGlkOiBSZXF1ZXN0SWRsZUNhbGxiYWNrSGFuZGxlKSB7XG4gICAgcmV0dXJuIGNsZWFyVGltZW91dChpZClcbiAgfVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50VHlwZSB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgQ2xpZW50QnVpbGRNYW5pZmVzdCB9IGZyb20gJy4uL2J1aWxkL3dlYnBhY2svcGx1Z2lucy9idWlsZC1tYW5pZmVzdC1wbHVnaW4nXG5pbXBvcnQgZ2V0QXNzZXRQYXRoRnJvbVJvdXRlIGZyb20gJy4uL25leHQtc2VydmVyL2xpYi9yb3V0ZXIvdXRpbHMvZ2V0LWFzc2V0LXBhdGgtZnJvbS1yb3V0ZSdcbmltcG9ydCB7IHJlcXVlc3RJZGxlQ2FsbGJhY2sgfSBmcm9tICcuL3JlcXVlc3QtaWRsZS1jYWxsYmFjaydcblxuLy8gMy44cyB3YXMgYXJiaXRyYXJpbHkgY2hvc2VuIGFzIGl0J3Mgd2hhdCBodHRwczovL3dlYi5kZXYvaW50ZXJhY3RpdmVcbi8vIGNvbnNpZGVycyBhcyBcIkdvb2RcIiB0aW1lLXRvLWludGVyYWN0aXZlLiBXZSBtdXN0IGFzc3VtZSBzb21ldGhpbmcgd2VudFxuLy8gd3JvbmcgYmV5b25kIHRoaXMgcG9pbnQsIGFuZCB0aGVuIGZhbGwtYmFjayB0byBhIGZ1bGwgcGFnZSB0cmFuc2l0aW9uIHRvXG4vLyBzaG93IHRoZSB1c2VyIHNvbWV0aGluZyBvZiB2YWx1ZS5cbmNvbnN0IE1TX01BWF9JRExFX0RFTEFZID0gMzgwMFxuXG5kZWNsYXJlIGdsb2JhbCB7XG4gIGludGVyZmFjZSBXaW5kb3cge1xuICAgIF9fQlVJTERfTUFOSUZFU1Q/OiBDbGllbnRCdWlsZE1hbmlmZXN0XG4gICAgX19CVUlMRF9NQU5JRkVTVF9DQj86IEZ1bmN0aW9uXG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBMb2FkZWRFbnRyeXBvaW50U3VjY2VzcyB7XG4gIGNvbXBvbmVudDogQ29tcG9uZW50VHlwZVxuICBleHBvcnRzOiBhbnlcbn1cbmV4cG9ydCBpbnRlcmZhY2UgTG9hZGVkRW50cnlwb2ludEZhaWx1cmUge1xuICBlcnJvcjogdW5rbm93blxufVxuZXhwb3J0IHR5cGUgUm91dGVFbnRyeXBvaW50ID0gTG9hZGVkRW50cnlwb2ludFN1Y2Nlc3MgfCBMb2FkZWRFbnRyeXBvaW50RmFpbHVyZVxuXG5leHBvcnQgaW50ZXJmYWNlIFJvdXRlU3R5bGVTaGVldCB7XG4gIGhyZWY6IHN0cmluZ1xuICBjb250ZW50OiBzdHJpbmdcbn1cblxuZXhwb3J0IGludGVyZmFjZSBMb2FkZWRSb3V0ZVN1Y2Nlc3MgZXh0ZW5kcyBMb2FkZWRFbnRyeXBvaW50U3VjY2VzcyB7XG4gIHN0eWxlczogUm91dGVTdHlsZVNoZWV0W11cbn1cbmV4cG9ydCBpbnRlcmZhY2UgTG9hZGVkUm91dGVGYWlsdXJlIHtcbiAgZXJyb3I6IHVua25vd25cbn1cbmV4cG9ydCB0eXBlIFJvdXRlTG9hZGVyRW50cnkgPSBMb2FkZWRSb3V0ZVN1Y2Nlc3MgfCBMb2FkZWRSb3V0ZUZhaWx1cmVcblxuZXhwb3J0IHR5cGUgRnV0dXJlPFY+ID0ge1xuICByZXNvbHZlOiAoZW50cnlwb2ludDogVikgPT4gdm9pZFxuICBmdXR1cmU6IFByb21pc2U8Vj5cbn1cbmZ1bmN0aW9uIHdpdGhGdXR1cmU8VD4oXG4gIGtleTogc3RyaW5nLFxuICBtYXA6IE1hcDxzdHJpbmcsIEZ1dHVyZTxUPiB8IFQ+LFxuICBnZW5lcmF0b3I/OiAoKSA9PiBQcm9taXNlPFQ+XG4pOiBQcm9taXNlPFQ+IHtcbiAgbGV0IGVudHJ5OiBGdXR1cmU8VD4gfCBUIHwgdW5kZWZpbmVkID0gbWFwLmdldChrZXkpXG4gIGlmIChlbnRyeSkge1xuICAgIGlmICgnZnV0dXJlJyBpbiBlbnRyeSkge1xuICAgICAgcmV0dXJuIGVudHJ5LmZ1dHVyZVxuICAgIH1cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGVudHJ5KVxuICB9XG4gIGxldCByZXNvbHZlcjogKGVudHJ5cG9pbnQ6IFQpID0+IHZvaWRcbiAgY29uc3QgcHJvbTogUHJvbWlzZTxUPiA9IG5ldyBQcm9taXNlPFQ+KChyZXNvbHZlKSA9PiB7XG4gICAgcmVzb2x2ZXIgPSByZXNvbHZlXG4gIH0pXG4gIG1hcC5zZXQoa2V5LCAoZW50cnkgPSB7IHJlc29sdmU6IHJlc29sdmVyISwgZnV0dXJlOiBwcm9tIH0pKVxuICByZXR1cm4gZ2VuZXJhdG9yXG4gICAgPyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VxdWVuY2VzXG4gICAgICBnZW5lcmF0b3IoKS50aGVuKCh2YWx1ZSkgPT4gKHJlc29sdmVyKHZhbHVlKSwgdmFsdWUpKVxuICAgIDogcHJvbVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJvdXRlTG9hZGVyIHtcbiAgd2hlbkVudHJ5cG9pbnQocm91dGU6IHN0cmluZyk6IFByb21pc2U8Um91dGVFbnRyeXBvaW50PlxuICBvbkVudHJ5cG9pbnQocm91dGU6IHN0cmluZywgZXhlY3V0ZTogKCkgPT4gdW5rbm93bik6IHZvaWRcbiAgbG9hZFJvdXRlKHJvdXRlOiBzdHJpbmcsIHByZWZldGNoPzogYm9vbGVhbik6IFByb21pc2U8Um91dGVMb2FkZXJFbnRyeT5cbiAgcHJlZmV0Y2gocm91dGU6IHN0cmluZyk6IFByb21pc2U8dm9pZD5cbn1cblxuZnVuY3Rpb24gaGFzUHJlZmV0Y2gobGluaz86IEhUTUxMaW5rRWxlbWVudCk6IGJvb2xlYW4ge1xuICB0cnkge1xuICAgIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJylcbiAgICByZXR1cm4gKFxuICAgICAgLy8gZGV0ZWN0IElFMTEgc2luY2UgaXQgc3VwcG9ydHMgcHJlZmV0Y2ggYnV0IGlzbid0IGRldGVjdGVkXG4gICAgICAvLyB3aXRoIHJlbExpc3Quc3VwcG9ydFxuICAgICAgKCEhd2luZG93Lk1TSW5wdXRNZXRob2RDb250ZXh0ICYmICEhKGRvY3VtZW50IGFzIGFueSkuZG9jdW1lbnRNb2RlKSB8fFxuICAgICAgbGluay5yZWxMaXN0LnN1cHBvcnRzKCdwcmVmZXRjaCcpXG4gICAgKVxuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5jb25zdCBjYW5QcmVmZXRjaDogYm9vbGVhbiA9IGhhc1ByZWZldGNoKClcblxuZnVuY3Rpb24gcHJlZmV0Y2hWaWFEb20oXG4gIGhyZWY6IHN0cmluZyxcbiAgYXM6IHN0cmluZyxcbiAgbGluaz86IEhUTUxMaW5rRWxlbWVudFxuKTogUHJvbWlzZTxhbnk+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMsIHJlaikgPT4ge1xuICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBsaW5rW3JlbD1cInByZWZldGNoXCJdW2hyZWZePVwiJHtocmVmfVwiXWApKSB7XG4gICAgICByZXR1cm4gcmVzKClcbiAgICB9XG5cbiAgICBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpXG5cbiAgICAvLyBUaGUgb3JkZXIgb2YgcHJvcGVydHkgYXNzaWdubWVudCBoZXJlIGlzIGludGVudGlvbmFsOlxuICAgIGlmIChhcykgbGluayEuYXMgPSBhc1xuICAgIGxpbmshLnJlbCA9IGBwcmVmZXRjaGBcbiAgICBsaW5rIS5jcm9zc09yaWdpbiA9IHByb2Nlc3MuZW52Ll9fTkVYVF9DUk9TU19PUklHSU4hXG4gICAgbGluayEub25sb2FkID0gcmVzXG4gICAgbGluayEub25lcnJvciA9IHJlalxuXG4gICAgLy8gYGhyZWZgIHNob3VsZCBhbHdheXMgYmUgbGFzdDpcbiAgICBsaW5rIS5ocmVmID0gaHJlZlxuXG4gICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChsaW5rKVxuICB9KVxufVxuXG5jb25zdCBBU1NFVF9MT0FEX0VSUk9SID0gU3ltYm9sKCdBU1NFVF9MT0FEX0VSUk9SJylcbi8vIFRPRE86IHVuZXhwb3J0XG5leHBvcnQgZnVuY3Rpb24gbWFya0Fzc2V0RXJyb3IoZXJyOiBFcnJvcik6IEVycm9yIHtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlcnIsIEFTU0VUX0xPQURfRVJST1IsIHt9KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNBc3NldEVycm9yKGVycj86IEVycm9yKTogYm9vbGVhbiB8IHVuZGVmaW5lZCB7XG4gIHJldHVybiBlcnIgJiYgQVNTRVRfTE9BRF9FUlJPUiBpbiBlcnJcbn1cblxuZnVuY3Rpb24gYXBwZW5kU2NyaXB0KFxuICBzcmM6IHN0cmluZyxcbiAgc2NyaXB0PzogSFRNTFNjcmlwdEVsZW1lbnRcbik6IFByb21pc2U8dW5rbm93bj4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpXG5cbiAgICAvLyBUaGUgb3JkZXIgb2YgcHJvcGVydHkgYXNzaWdubWVudCBoZXJlIGlzIGludGVudGlvbmFsLlxuICAgIC8vIDEuIFNldHVwIHN1Y2Nlc3MvZmFpbHVyZSBob29rcyBpbiBjYXNlIHRoZSBicm93c2VyIHN5bmNocm9ub3VzbHlcbiAgICAvLyAgICBleGVjdXRlcyB3aGVuIGBzcmNgIGlzIHNldC5cbiAgICBzY3JpcHQub25sb2FkID0gcmVzb2x2ZVxuICAgIHNjcmlwdC5vbmVycm9yID0gKCkgPT5cbiAgICAgIHJlamVjdChtYXJrQXNzZXRFcnJvcihuZXcgRXJyb3IoYEZhaWxlZCB0byBsb2FkIHNjcmlwdDogJHtzcmN9YCkpKVxuXG4gICAgLy8gMi4gQ29uZmlndXJlIHRoZSBjcm9zcy1vcmlnaW4gYXR0cmlidXRlIGJlZm9yZSBzZXR0aW5nIGBzcmNgIGluIGNhc2UgdGhlXG4gICAgLy8gICAgYnJvd3NlciBiZWdpbnMgdG8gZmV0Y2guXG4gICAgc2NyaXB0LmNyb3NzT3JpZ2luID0gcHJvY2Vzcy5lbnYuX19ORVhUX0NST1NTX09SSUdJTiFcblxuICAgIC8vIDMuIEZpbmFsbHksIHNldCB0aGUgc291cmNlIGFuZCBpbmplY3QgaW50byB0aGUgRE9NIGluIGNhc2UgdGhlIGNoaWxkXG4gICAgLy8gICAgbXVzdCBiZSBhcHBlbmRlZCBmb3IgZmV0Y2hpbmcgdG8gc3RhcnQuXG4gICAgc2NyaXB0LnNyYyA9IHNyY1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2NyaXB0KVxuICB9KVxufVxuXG4vLyBSZXNvbHZlIGEgcHJvbWlzZSB0aGF0IHRpbWVzIG91dCBhZnRlciBnaXZlbiBhbW91bnQgb2YgbWlsbGlzZWNvbmRzLlxuZnVuY3Rpb24gcmVzb2x2ZVByb21pc2VXaXRoVGltZW91dDxUPihcbiAgcDogUHJvbWlzZTxUPixcbiAgbXM6IG51bWJlcixcbiAgZXJyOiBFcnJvclxuKTogUHJvbWlzZTxUPiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgbGV0IGNhbmNlbGxlZCA9IGZhbHNlXG5cbiAgICBwLnRoZW4oKHIpID0+IHtcbiAgICAgIC8vIFJlc29sdmVkLCBjYW5jZWwgdGhlIHRpbWVvdXRcbiAgICAgIGNhbmNlbGxlZCA9IHRydWVcbiAgICAgIHJlc29sdmUocilcbiAgICB9KS5jYXRjaChyZWplY3QpXG5cbiAgICByZXF1ZXN0SWRsZUNhbGxiYWNrKCgpID0+XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgaWYgKCFjYW5jZWxsZWQpIHtcbiAgICAgICAgICByZWplY3QoZXJyKVxuICAgICAgICB9XG4gICAgICB9LCBtcylcbiAgICApXG4gIH0pXG59XG5cbi8vIFRPRE86IHN0b3AgZXhwb3J0aW5nIG9yIGNhY2hlIHRoZSBmYWlsdXJlXG4vLyBJdCdkIGJlIGJlc3QgdG8gc3RvcCBleHBvcnRpbmcgdGhpcy4gSXQncyBhbiBpbXBsZW1lbnRhdGlvbiBkZXRhaWwuIFdlJ3JlXG4vLyBvbmx5IGV4cG9ydGluZyBpdCBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWx0eSB3aXRoIHRoZSBgcGFnZS1sb2FkZXJgLlxuLy8gT25seSBjYWNoZSB0aGlzIHJlc3BvbnNlIGFzIGEgbGFzdCByZXNvcnQgaWYgd2UgY2Fubm90IGVsaW1pbmF0ZSBhbGwgb3RoZXJcbi8vIGNvZGUgYnJhbmNoZXMgdGhhdCB1c2UgdGhlIEJ1aWxkIE1hbmlmZXN0IENhbGxiYWNrIGFuZCBwdXNoIHRoZW0gdGhyb3VnaFxuLy8gdGhlIFJvdXRlIExvYWRlciBpbnRlcmZhY2UuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q2xpZW50QnVpbGRNYW5pZmVzdCgpOiBQcm9taXNlPENsaWVudEJ1aWxkTWFuaWZlc3Q+IHtcbiAgaWYgKHNlbGYuX19CVUlMRF9NQU5JRkVTVCkge1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoc2VsZi5fX0JVSUxEX01BTklGRVNUKVxuICB9XG5cbiAgY29uc3Qgb25CdWlsZE1hbmlmZXN0OiBQcm9taXNlPENsaWVudEJ1aWxkTWFuaWZlc3Q+ID0gbmV3IFByb21pc2U8XG4gICAgQ2xpZW50QnVpbGRNYW5pZmVzdFxuICA+KChyZXNvbHZlKSA9PiB7XG4gICAgLy8gTWFuZGF0b3J5IGJlY2F1c2UgdGhpcyBpcyBub3QgY29uY3VycmVudCBzYWZlOlxuICAgIGNvbnN0IGNiID0gc2VsZi5fX0JVSUxEX01BTklGRVNUX0NCXG4gICAgc2VsZi5fX0JVSUxEX01BTklGRVNUX0NCID0gKCkgPT4ge1xuICAgICAgcmVzb2x2ZShzZWxmLl9fQlVJTERfTUFOSUZFU1QhKVxuICAgICAgY2IgJiYgY2IoKVxuICAgIH1cbiAgfSlcblxuICByZXR1cm4gcmVzb2x2ZVByb21pc2VXaXRoVGltZW91dDxDbGllbnRCdWlsZE1hbmlmZXN0PihcbiAgICBvbkJ1aWxkTWFuaWZlc3QsXG4gICAgTVNfTUFYX0lETEVfREVMQVksXG4gICAgbWFya0Fzc2V0RXJyb3IobmV3IEVycm9yKCdGYWlsZWQgdG8gbG9hZCBjbGllbnQgYnVpbGQgbWFuaWZlc3QnKSlcbiAgKVxufVxuXG5pbnRlcmZhY2UgUm91dGVGaWxlcyB7XG4gIHNjcmlwdHM6IHN0cmluZ1tdXG4gIGNzczogc3RyaW5nW11cbn1cbmZ1bmN0aW9uIGdldEZpbGVzRm9yUm91dGUoXG4gIGFzc2V0UHJlZml4OiBzdHJpbmcsXG4gIHJvdXRlOiBzdHJpbmdcbik6IFByb21pc2U8Um91dGVGaWxlcz4ge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHtcbiAgICAgIHNjcmlwdHM6IFtcbiAgICAgICAgYXNzZXRQcmVmaXggK1xuICAgICAgICAgICcvX25leHQvc3RhdGljL2NodW5rcy9wYWdlcycgK1xuICAgICAgICAgIGVuY29kZVVSSShnZXRBc3NldFBhdGhGcm9tUm91dGUocm91dGUsICcuanMnKSksXG4gICAgICBdLFxuICAgICAgLy8gU3R5bGVzIGFyZSBoYW5kbGVkIGJ5IGBzdHlsZS1sb2FkZXJgIGluIGRldmVsb3BtZW50OlxuICAgICAgY3NzOiBbXSxcbiAgICB9KVxuICB9XG4gIHJldHVybiBnZXRDbGllbnRCdWlsZE1hbmlmZXN0KCkudGhlbigobWFuaWZlc3QpID0+IHtcbiAgICBpZiAoIShyb3V0ZSBpbiBtYW5pZmVzdCkpIHtcbiAgICAgIHRocm93IG1hcmtBc3NldEVycm9yKG5ldyBFcnJvcihgRmFpbGVkIHRvIGxvb2t1cCByb3V0ZTogJHtyb3V0ZX1gKSlcbiAgICB9XG4gICAgY29uc3QgYWxsRmlsZXMgPSBtYW5pZmVzdFtyb3V0ZV0ubWFwKFxuICAgICAgKGVudHJ5KSA9PiBhc3NldFByZWZpeCArICcvX25leHQvJyArIGVuY29kZVVSSShlbnRyeSlcbiAgICApXG4gICAgcmV0dXJuIHtcbiAgICAgIHNjcmlwdHM6IGFsbEZpbGVzLmZpbHRlcigodikgPT4gdi5lbmRzV2l0aCgnLmpzJykpLFxuICAgICAgY3NzOiBhbGxGaWxlcy5maWx0ZXIoKHYpID0+IHYuZW5kc1dpdGgoJy5jc3MnKSksXG4gICAgfVxuICB9KVxufVxuXG5mdW5jdGlvbiBjcmVhdGVSb3V0ZUxvYWRlcihhc3NldFByZWZpeDogc3RyaW5nKTogUm91dGVMb2FkZXIge1xuICBjb25zdCBlbnRyeXBvaW50czogTWFwPFxuICAgIHN0cmluZyxcbiAgICBGdXR1cmU8Um91dGVFbnRyeXBvaW50PiB8IFJvdXRlRW50cnlwb2ludFxuICA+ID0gbmV3IE1hcCgpXG4gIGNvbnN0IGxvYWRlZFNjcmlwdHM6IE1hcDxzdHJpbmcsIFByb21pc2U8dW5rbm93bj4+ID0gbmV3IE1hcCgpXG4gIGNvbnN0IHN0eWxlU2hlZXRzOiBNYXA8c3RyaW5nLCBQcm9taXNlPFJvdXRlU3R5bGVTaGVldD4+ID0gbmV3IE1hcCgpXG4gIGNvbnN0IHJvdXRlczogTWFwPFxuICAgIHN0cmluZyxcbiAgICBGdXR1cmU8Um91dGVMb2FkZXJFbnRyeT4gfCBSb3V0ZUxvYWRlckVudHJ5XG4gID4gPSBuZXcgTWFwKClcblxuICBmdW5jdGlvbiBtYXliZUV4ZWN1dGVTY3JpcHQoc3JjOiBzdHJpbmcpOiBQcm9taXNlPHVua25vd24+IHtcbiAgICBsZXQgcHJvbTogUHJvbWlzZTx1bmtub3duPiB8IHVuZGVmaW5lZCA9IGxvYWRlZFNjcmlwdHMuZ2V0KHNyYylcbiAgICBpZiAocHJvbSkge1xuICAgICAgcmV0dXJuIHByb21cbiAgICB9XG5cbiAgICAvLyBTa2lwIGV4ZWN1dGluZyBzY3JpcHQgaWYgaXQncyBhbHJlYWR5IGluIHRoZSBET006XG4gICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYHNjcmlwdFtzcmNePVwiJHtzcmN9XCJdYCkpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxuICAgIH1cblxuICAgIGxvYWRlZFNjcmlwdHMuc2V0KHNyYywgKHByb20gPSBhcHBlbmRTY3JpcHQoc3JjKSkpXG4gICAgcmV0dXJuIHByb21cbiAgfVxuXG4gIGZ1bmN0aW9uIGZldGNoU3R5bGVTaGVldChocmVmOiBzdHJpbmcpOiBQcm9taXNlPFJvdXRlU3R5bGVTaGVldD4ge1xuICAgIGxldCBwcm9tOiBQcm9taXNlPFJvdXRlU3R5bGVTaGVldD4gfCB1bmRlZmluZWQgPSBzdHlsZVNoZWV0cy5nZXQoaHJlZilcbiAgICBpZiAocHJvbSkge1xuICAgICAgcmV0dXJuIHByb21cbiAgICB9XG5cbiAgICBzdHlsZVNoZWV0cy5zZXQoXG4gICAgICBocmVmLFxuICAgICAgKHByb20gPSBmZXRjaChocmVmKVxuICAgICAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgaWYgKCFyZXMub2spIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRmFpbGVkIHRvIGxvYWQgc3R5bGVzaGVldDogJHtocmVmfWApXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiByZXMudGV4dCgpLnRoZW4oKHRleHQpID0+ICh7IGhyZWY6IGhyZWYsIGNvbnRlbnQ6IHRleHQgfSkpXG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgdGhyb3cgbWFya0Fzc2V0RXJyb3IoZXJyKVxuICAgICAgICB9KSlcbiAgICApXG4gICAgcmV0dXJuIHByb21cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgd2hlbkVudHJ5cG9pbnQocm91dGU6IHN0cmluZykge1xuICAgICAgcmV0dXJuIHdpdGhGdXR1cmUocm91dGUsIGVudHJ5cG9pbnRzKVxuICAgIH0sXG4gICAgb25FbnRyeXBvaW50KHJvdXRlOiBzdHJpbmcsIGV4ZWN1dGU6ICgpID0+IHVua25vd24pIHtcbiAgICAgIFByb21pc2UucmVzb2x2ZShleGVjdXRlKVxuICAgICAgICAudGhlbigoZm4pID0+IGZuKCkpXG4gICAgICAgIC50aGVuKFxuICAgICAgICAgIChleHBvcnRzOiBhbnkpID0+ICh7XG4gICAgICAgICAgICBjb21wb25lbnQ6IChleHBvcnRzICYmIGV4cG9ydHMuZGVmYXVsdCkgfHwgZXhwb3J0cyxcbiAgICAgICAgICAgIGV4cG9ydHM6IGV4cG9ydHMsXG4gICAgICAgICAgfSksXG4gICAgICAgICAgKGVycikgPT4gKHsgZXJyb3I6IGVyciB9KVxuICAgICAgICApXG4gICAgICAgIC50aGVuKChpbnB1dDogUm91dGVFbnRyeXBvaW50KSA9PiB7XG4gICAgICAgICAgY29uc3Qgb2xkID0gZW50cnlwb2ludHMuZ2V0KHJvdXRlKVxuICAgICAgICAgIGVudHJ5cG9pbnRzLnNldChyb3V0ZSwgaW5wdXQpXG4gICAgICAgICAgaWYgKG9sZCAmJiAncmVzb2x2ZScgaW4gb2xkKSBvbGQucmVzb2x2ZShpbnB1dClcbiAgICAgICAgfSlcbiAgICB9LFxuICAgIGxvYWRSb3V0ZShyb3V0ZTogc3RyaW5nLCBwcmVmZXRjaD86IGJvb2xlYW4pIHtcbiAgICAgIHJldHVybiB3aXRoRnV0dXJlPFJvdXRlTG9hZGVyRW50cnk+KHJvdXRlLCByb3V0ZXMsICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHJlc29sdmVQcm9taXNlV2l0aFRpbWVvdXQoXG4gICAgICAgICAgZ2V0RmlsZXNGb3JSb3V0ZShhc3NldFByZWZpeCwgcm91dGUpXG4gICAgICAgICAgICAudGhlbigoeyBzY3JpcHRzLCBjc3MgfSkgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgICAgIGVudHJ5cG9pbnRzLmhhcyhyb3V0ZSlcbiAgICAgICAgICAgICAgICAgID8gW11cbiAgICAgICAgICAgICAgICAgIDogUHJvbWlzZS5hbGwoc2NyaXB0cy5tYXAobWF5YmVFeGVjdXRlU2NyaXB0KSksXG4gICAgICAgICAgICAgICAgUHJvbWlzZS5hbGwoY3NzLm1hcChmZXRjaFN0eWxlU2hlZXQpKSxcbiAgICAgICAgICAgICAgXSBhcyBjb25zdClcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLndoZW5FbnRyeXBvaW50KHJvdXRlKS50aGVuKChlbnRyeXBvaW50KSA9PiAoe1xuICAgICAgICAgICAgICAgIGVudHJ5cG9pbnQsXG4gICAgICAgICAgICAgICAgc3R5bGVzOiByZXNbMV0sXG4gICAgICAgICAgICAgIH0pKVxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgTVNfTUFYX0lETEVfREVMQVksXG4gICAgICAgICAgbWFya0Fzc2V0RXJyb3IobmV3IEVycm9yKGBSb3V0ZSBkaWQgbm90IGNvbXBsZXRlIGxvYWRpbmc6ICR7cm91dGV9YCkpXG4gICAgICAgIClcbiAgICAgICAgICAudGhlbigoeyBlbnRyeXBvaW50LCBzdHlsZXMgfSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcmVzOiBSb3V0ZUxvYWRlckVudHJ5ID0gT2JqZWN0LmFzc2lnbjxcbiAgICAgICAgICAgICAgeyBzdHlsZXM6IFJvdXRlU3R5bGVTaGVldFtdIH0sXG4gICAgICAgICAgICAgIFJvdXRlRW50cnlwb2ludFxuICAgICAgICAgICAgPih7IHN0eWxlczogc3R5bGVzISB9LCBlbnRyeXBvaW50KVxuICAgICAgICAgICAgcmV0dXJuICdlcnJvcicgaW4gZW50cnlwb2ludCA/IGVudHJ5cG9pbnQgOiByZXNcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICBpZiAocHJlZmV0Y2gpIHtcbiAgICAgICAgICAgICAgLy8gd2UgZG9uJ3Qgd2FudCB0byBjYWNoZSBlcnJvcnMgZHVyaW5nIHByZWZldGNoXG4gICAgICAgICAgICAgIHRocm93IGVyclxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHsgZXJyb3I6IGVyciB9XG4gICAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfSxcbiAgICBwcmVmZXRjaChyb3V0ZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vR29vZ2xlQ2hyb21lTGFicy9xdWlja2xpbmsvYmxvYi80NTNhNjYxZmExZmE5NDBlMmQyZTA0NDQ1MjM5OGUzOGM2N2E5OGZiL3NyYy9pbmRleC5tanMjTDExNS1MMTE4XG4gICAgICAvLyBMaWNlbnNlOiBBcGFjaGUgMi4wXG4gICAgICBsZXQgY25cbiAgICAgIGlmICgoY24gPSAobmF2aWdhdG9yIGFzIGFueSkuY29ubmVjdGlvbikpIHtcbiAgICAgICAgLy8gRG9uJ3QgcHJlZmV0Y2ggaWYgdXNpbmcgMkcgb3IgaWYgU2F2ZS1EYXRhIGlzIGVuYWJsZWQuXG4gICAgICAgIGlmIChjbi5zYXZlRGF0YSB8fCAvMmcvLnRlc3QoY24uZWZmZWN0aXZlVHlwZSkpIHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxuICAgICAgfVxuICAgICAgcmV0dXJuIGdldEZpbGVzRm9yUm91dGUoYXNzZXRQcmVmaXgsIHJvdXRlKVxuICAgICAgICAudGhlbigob3V0cHV0KSA9PlxuICAgICAgICAgIFByb21pc2UuYWxsKFxuICAgICAgICAgICAgY2FuUHJlZmV0Y2hcbiAgICAgICAgICAgICAgPyBvdXRwdXQuc2NyaXB0cy5tYXAoKHNjcmlwdCkgPT4gcHJlZmV0Y2hWaWFEb20oc2NyaXB0LCAnc2NyaXB0JykpXG4gICAgICAgICAgICAgIDogW11cbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIHJlcXVlc3RJZGxlQ2FsbGJhY2soKCkgPT4gdGhpcy5sb2FkUm91dGUocm91dGUsIHRydWUpLmNhdGNoKCgpID0+IHt9KSlcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKFxuICAgICAgICAgIC8vIHN3YWxsb3cgcHJlZmV0Y2ggZXJyb3JzXG4gICAgICAgICAgKCkgPT4ge31cbiAgICAgICAgKVxuICAgIH0sXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlUm91dGVMb2FkZXJcbiIsIi8qIGdsb2JhbCB3aW5kb3cgKi9cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCBSb3V0ZXIsIHsgTmV4dFJvdXRlciB9IGZyb20gJy4uL25leHQtc2VydmVyL2xpYi9yb3V0ZXIvcm91dGVyJ1xuaW1wb3J0IHsgUm91dGVyQ29udGV4dCB9IGZyb20gJy4uL25leHQtc2VydmVyL2xpYi9yb3V0ZXItY29udGV4dCdcblxudHlwZSBDbGFzc0FyZ3VtZW50czxUPiA9IFQgZXh0ZW5kcyBuZXcgKC4uLmFyZ3M6IGluZmVyIFUpID0+IGFueSA/IFUgOiBhbnlcblxudHlwZSBSb3V0ZXJBcmdzID0gQ2xhc3NBcmd1bWVudHM8dHlwZW9mIFJvdXRlcj5cblxudHlwZSBTaW5nbGV0b25Sb3V0ZXJCYXNlID0ge1xuICByb3V0ZXI6IFJvdXRlciB8IG51bGxcbiAgcmVhZHlDYWxsYmFja3M6IEFycmF5PCgpID0+IGFueT5cbiAgcmVhZHkoY2I6ICgpID0+IGFueSk6IHZvaWRcbn1cblxuZXhwb3J0IHsgUm91dGVyLCBOZXh0Um91dGVyIH1cblxuZXhwb3J0IHR5cGUgU2luZ2xldG9uUm91dGVyID0gU2luZ2xldG9uUm91dGVyQmFzZSAmIE5leHRSb3V0ZXJcblxuY29uc3Qgc2luZ2xldG9uUm91dGVyOiBTaW5nbGV0b25Sb3V0ZXJCYXNlID0ge1xuICByb3V0ZXI6IG51bGwsIC8vIGhvbGRzIHRoZSBhY3R1YWwgcm91dGVyIGluc3RhbmNlXG4gIHJlYWR5Q2FsbGJhY2tzOiBbXSxcbiAgcmVhZHkoY2I6ICgpID0+IHZvaWQpIHtcbiAgICBpZiAodGhpcy5yb3V0ZXIpIHJldHVybiBjYigpXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aGlzLnJlYWR5Q2FsbGJhY2tzLnB1c2goY2IpXG4gICAgfVxuICB9LFxufVxuXG4vLyBDcmVhdGUgcHVibGljIHByb3BlcnRpZXMgYW5kIG1ldGhvZHMgb2YgdGhlIHJvdXRlciBpbiB0aGUgc2luZ2xldG9uUm91dGVyXG5jb25zdCB1cmxQcm9wZXJ0eUZpZWxkcyA9IFtcbiAgJ3BhdGhuYW1lJyxcbiAgJ3JvdXRlJyxcbiAgJ3F1ZXJ5JyxcbiAgJ2FzUGF0aCcsXG4gICdjb21wb25lbnRzJyxcbiAgJ2lzRmFsbGJhY2snLFxuICAnYmFzZVBhdGgnLFxuICAnbG9jYWxlJyxcbiAgJ2xvY2FsZXMnLFxuICAnZGVmYXVsdExvY2FsZScsXG4gICdpc1JlYWR5JyxcbiAgJ2lzUHJldmlldycsXG4gICdpc0xvY2FsZURvbWFpbicsXG5dXG5jb25zdCByb3V0ZXJFdmVudHMgPSBbXG4gICdyb3V0ZUNoYW5nZVN0YXJ0JyxcbiAgJ2JlZm9yZUhpc3RvcnlDaGFuZ2UnLFxuICAncm91dGVDaGFuZ2VDb21wbGV0ZScsXG4gICdyb3V0ZUNoYW5nZUVycm9yJyxcbiAgJ2hhc2hDaGFuZ2VTdGFydCcsXG4gICdoYXNoQ2hhbmdlQ29tcGxldGUnLFxuXVxuY29uc3QgY29yZU1ldGhvZEZpZWxkcyA9IFtcbiAgJ3B1c2gnLFxuICAncmVwbGFjZScsXG4gICdyZWxvYWQnLFxuICAnYmFjaycsXG4gICdwcmVmZXRjaCcsXG4gICdiZWZvcmVQb3BTdGF0ZScsXG5dXG5cbi8vIEV2ZW50cyBpcyBhIHN0YXRpYyBwcm9wZXJ0eSBvbiB0aGUgcm91dGVyLCB0aGUgcm91dGVyIGRvZXNuJ3QgaGF2ZSB0byBiZSBpbml0aWFsaXplZCB0byB1c2UgaXRcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShzaW5nbGV0b25Sb3V0ZXIsICdldmVudHMnLCB7XG4gIGdldCgpIHtcbiAgICByZXR1cm4gUm91dGVyLmV2ZW50c1xuICB9LFxufSlcblxudXJsUHJvcGVydHlGaWVsZHMuZm9yRWFjaCgoZmllbGQ6IHN0cmluZykgPT4ge1xuICAvLyBIZXJlIHdlIG5lZWQgdG8gdXNlIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBiZWNhdXNlLCB3ZSBuZWVkIHRvIHJldHVyblxuICAvLyB0aGUgcHJvcGVydHkgYXNzaWduZWQgdG8gdGhlIGFjdHVhbCByb3V0ZXJcbiAgLy8gVGhlIHZhbHVlIG1pZ2h0IGdldCBjaGFuZ2VkIGFzIHdlIGNoYW5nZSByb3V0ZXMgYW5kIHRoaXMgaXMgdGhlXG4gIC8vIHByb3BlciB3YXkgdG8gYWNjZXNzIGl0XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShzaW5nbGV0b25Sb3V0ZXIsIGZpZWxkLCB7XG4gICAgZ2V0KCkge1xuICAgICAgY29uc3Qgcm91dGVyID0gZ2V0Um91dGVyKCkgYXMgYW55XG4gICAgICByZXR1cm4gcm91dGVyW2ZpZWxkXSBhcyBzdHJpbmdcbiAgICB9LFxuICB9KVxufSlcblxuY29yZU1ldGhvZEZpZWxkcy5mb3JFYWNoKChmaWVsZDogc3RyaW5nKSA9PiB7XG4gIC8vIFdlIGRvbid0IHJlYWxseSBrbm93IHRoZSB0eXBlcyBoZXJlLCBzbyB3ZSBhZGQgdGhlbSBsYXRlciBpbnN0ZWFkXG4gIDsoc2luZ2xldG9uUm91dGVyIGFzIGFueSlbZmllbGRdID0gKC4uLmFyZ3M6IGFueVtdKSA9PiB7XG4gICAgY29uc3Qgcm91dGVyID0gZ2V0Um91dGVyKCkgYXMgYW55XG4gICAgcmV0dXJuIHJvdXRlcltmaWVsZF0oLi4uYXJncylcbiAgfVxufSlcblxucm91dGVyRXZlbnRzLmZvckVhY2goKGV2ZW50OiBzdHJpbmcpID0+IHtcbiAgc2luZ2xldG9uUm91dGVyLnJlYWR5KCgpID0+IHtcbiAgICBSb3V0ZXIuZXZlbnRzLm9uKGV2ZW50LCAoLi4uYXJncykgPT4ge1xuICAgICAgY29uc3QgZXZlbnRGaWVsZCA9IGBvbiR7ZXZlbnQuY2hhckF0KDApLnRvVXBwZXJDYXNlKCl9JHtldmVudC5zdWJzdHJpbmcoXG4gICAgICAgIDFcbiAgICAgICl9YFxuICAgICAgY29uc3QgX3NpbmdsZXRvblJvdXRlciA9IHNpbmdsZXRvblJvdXRlciBhcyBhbnlcbiAgICAgIGlmIChfc2luZ2xldG9uUm91dGVyW2V2ZW50RmllbGRdKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgX3NpbmdsZXRvblJvdXRlcltldmVudEZpZWxkXSguLi5hcmdzKVxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGBFcnJvciB3aGVuIHJ1bm5pbmcgdGhlIFJvdXRlciBldmVudDogJHtldmVudEZpZWxkfWApXG4gICAgICAgICAgY29uc29sZS5lcnJvcihgJHtlcnIubWVzc2FnZX1cXG4ke2Vyci5zdGFja31gKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfSlcbn0pXG5cbmZ1bmN0aW9uIGdldFJvdXRlcigpOiBSb3V0ZXIge1xuICBpZiAoIXNpbmdsZXRvblJvdXRlci5yb3V0ZXIpIHtcbiAgICBjb25zdCBtZXNzYWdlID1cbiAgICAgICdObyByb3V0ZXIgaW5zdGFuY2UgZm91bmQuXFxuJyArXG4gICAgICAnWW91IHNob3VsZCBvbmx5IHVzZSBcIm5leHQvcm91dGVyXCIgaW5zaWRlIHRoZSBjbGllbnQgc2lkZSBvZiB5b3VyIGFwcC5cXG4nXG4gICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpXG4gIH1cbiAgcmV0dXJuIHNpbmdsZXRvblJvdXRlci5yb3V0ZXJcbn1cblxuLy8gRXhwb3J0IHRoZSBzaW5nbGV0b25Sb3V0ZXIgYW5kIHRoaXMgaXMgdGhlIHB1YmxpYyBBUEkuXG5leHBvcnQgZGVmYXVsdCBzaW5nbGV0b25Sb3V0ZXIgYXMgU2luZ2xldG9uUm91dGVyXG5cbi8vIFJlZXhwb3J0IHRoZSB3aXRoUm91dGUgSE9DXG5leHBvcnQgeyBkZWZhdWx0IGFzIHdpdGhSb3V0ZXIgfSBmcm9tICcuL3dpdGgtcm91dGVyJ1xuXG5leHBvcnQgZnVuY3Rpb24gdXNlUm91dGVyKCk6IE5leHRSb3V0ZXIge1xuICByZXR1cm4gUmVhY3QudXNlQ29udGV4dChSb3V0ZXJDb250ZXh0KVxufVxuXG4vLyBJTlRFUk5BTCBBUElTXG4vLyAtLS0tLS0tLS0tLS0tXG4vLyAoZG8gbm90IHVzZSBmb2xsb3dpbmcgZXhwb3J0cyBpbnNpZGUgdGhlIGFwcClcblxuLy8gQ3JlYXRlIGEgcm91dGVyIGFuZCBhc3NpZ24gaXQgYXMgdGhlIHNpbmdsZXRvbiBpbnN0YW5jZS5cbi8vIFRoaXMgaXMgdXNlZCBpbiBjbGllbnQgc2lkZSB3aGVuIHdlIGFyZSBpbml0aWxpemluZyB0aGUgYXBwLlxuLy8gVGhpcyBzaG91bGQgKipub3QqKiB1c2UgaW5zaWRlIHRoZSBzZXJ2ZXIuXG5leHBvcnQgY29uc3QgY3JlYXRlUm91dGVyID0gKC4uLmFyZ3M6IFJvdXRlckFyZ3MpOiBSb3V0ZXIgPT4ge1xuICBzaW5nbGV0b25Sb3V0ZXIucm91dGVyID0gbmV3IFJvdXRlciguLi5hcmdzKVxuICBzaW5nbGV0b25Sb3V0ZXIucmVhZHlDYWxsYmFja3MuZm9yRWFjaCgoY2IpID0+IGNiKCkpXG4gIHNpbmdsZXRvblJvdXRlci5yZWFkeUNhbGxiYWNrcyA9IFtdXG5cbiAgcmV0dXJuIHNpbmdsZXRvblJvdXRlci5yb3V0ZXJcbn1cblxuLy8gVGhpcyBmdW5jdGlvbiBpcyB1c2VkIHRvIGNyZWF0ZSB0aGUgYHdpdGhSb3V0ZXJgIHJvdXRlciBpbnN0YW5jZVxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VQdWJsaWNSb3V0ZXJJbnN0YW5jZShyb3V0ZXI6IFJvdXRlcik6IE5leHRSb3V0ZXIge1xuICBjb25zdCBfcm91dGVyID0gcm91dGVyIGFzIGFueVxuICBjb25zdCBpbnN0YW5jZSA9IHt9IGFzIGFueVxuXG4gIGZvciAoY29uc3QgcHJvcGVydHkgb2YgdXJsUHJvcGVydHlGaWVsZHMpIHtcbiAgICBpZiAodHlwZW9mIF9yb3V0ZXJbcHJvcGVydHldID09PSAnb2JqZWN0Jykge1xuICAgICAgaW5zdGFuY2VbcHJvcGVydHldID0gT2JqZWN0LmFzc2lnbihcbiAgICAgICAgQXJyYXkuaXNBcnJheShfcm91dGVyW3Byb3BlcnR5XSkgPyBbXSA6IHt9LFxuICAgICAgICBfcm91dGVyW3Byb3BlcnR5XVxuICAgICAgKSAvLyBtYWtlcyBzdXJlIHF1ZXJ5IGlzIG5vdCBzdGF0ZWZ1bFxuICAgICAgY29udGludWVcbiAgICB9XG5cbiAgICBpbnN0YW5jZVtwcm9wZXJ0eV0gPSBfcm91dGVyW3Byb3BlcnR5XVxuICB9XG5cbiAgLy8gRXZlbnRzIGlzIGEgc3RhdGljIHByb3BlcnR5IG9uIHRoZSByb3V0ZXIsIHRoZSByb3V0ZXIgZG9lc24ndCBoYXZlIHRvIGJlIGluaXRpYWxpemVkIHRvIHVzZSBpdFxuICBpbnN0YW5jZS5ldmVudHMgPSBSb3V0ZXIuZXZlbnRzXG5cbiAgY29yZU1ldGhvZEZpZWxkcy5mb3JFYWNoKChmaWVsZCkgPT4ge1xuICAgIGluc3RhbmNlW2ZpZWxkXSA9ICguLi5hcmdzOiBhbnlbXSkgPT4ge1xuICAgICAgcmV0dXJuIF9yb3V0ZXJbZmllbGRdKC4uLmFyZ3MpXG4gICAgfVxuICB9KVxuXG4gIHJldHVybiBpbnN0YW5jZVxufVxuIiwiaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHtcbiAgcmVxdWVzdElkbGVDYWxsYmFjayxcbiAgY2FuY2VsSWRsZUNhbGxiYWNrLFxufSBmcm9tICcuL3JlcXVlc3QtaWRsZS1jYWxsYmFjaydcblxudHlwZSBVc2VJbnRlcnNlY3Rpb25PYnNlcnZlckluaXQgPSBQaWNrPEludGVyc2VjdGlvbk9ic2VydmVySW5pdCwgJ3Jvb3RNYXJnaW4nPlxudHlwZSBVc2VJbnRlcnNlY3Rpb24gPSB7IGRpc2FibGVkPzogYm9vbGVhbiB9ICYgVXNlSW50ZXJzZWN0aW9uT2JzZXJ2ZXJJbml0XG50eXBlIE9ic2VydmVDYWxsYmFjayA9IChpc1Zpc2libGU6IGJvb2xlYW4pID0+IHZvaWRcbnR5cGUgT2JzZXJ2ZXIgPSB7XG4gIGlkOiBzdHJpbmdcbiAgb2JzZXJ2ZXI6IEludGVyc2VjdGlvbk9ic2VydmVyXG4gIGVsZW1lbnRzOiBNYXA8RWxlbWVudCwgT2JzZXJ2ZUNhbGxiYWNrPlxufVxuXG5jb25zdCBoYXNJbnRlcnNlY3Rpb25PYnNlcnZlciA9IHR5cGVvZiBJbnRlcnNlY3Rpb25PYnNlcnZlciAhPT0gJ3VuZGVmaW5lZCdcblxuZXhwb3J0IGZ1bmN0aW9uIHVzZUludGVyc2VjdGlvbjxUIGV4dGVuZHMgRWxlbWVudD4oe1xuICByb290TWFyZ2luLFxuICBkaXNhYmxlZCxcbn06IFVzZUludGVyc2VjdGlvbik6IFsoZWxlbWVudDogVCB8IG51bGwpID0+IHZvaWQsIGJvb2xlYW5dIHtcbiAgY29uc3QgaXNEaXNhYmxlZDogYm9vbGVhbiA9IGRpc2FibGVkIHx8ICFoYXNJbnRlcnNlY3Rpb25PYnNlcnZlclxuXG4gIGNvbnN0IHVub2JzZXJ2ZSA9IHVzZVJlZjxGdW5jdGlvbj4oKVxuICBjb25zdCBbdmlzaWJsZSwgc2V0VmlzaWJsZV0gPSB1c2VTdGF0ZShmYWxzZSlcblxuICBjb25zdCBzZXRSZWYgPSB1c2VDYWxsYmFjayhcbiAgICAoZWw6IFQgfCBudWxsKSA9PiB7XG4gICAgICBpZiAodW5vYnNlcnZlLmN1cnJlbnQpIHtcbiAgICAgICAgdW5vYnNlcnZlLmN1cnJlbnQoKVxuICAgICAgICB1bm9ic2VydmUuY3VycmVudCA9IHVuZGVmaW5lZFxuICAgICAgfVxuXG4gICAgICBpZiAoaXNEaXNhYmxlZCB8fCB2aXNpYmxlKSByZXR1cm5cblxuICAgICAgaWYgKGVsICYmIGVsLnRhZ05hbWUpIHtcbiAgICAgICAgdW5vYnNlcnZlLmN1cnJlbnQgPSBvYnNlcnZlKFxuICAgICAgICAgIGVsLFxuICAgICAgICAgIChpc1Zpc2libGUpID0+IGlzVmlzaWJsZSAmJiBzZXRWaXNpYmxlKGlzVmlzaWJsZSksXG4gICAgICAgICAgeyByb290TWFyZ2luIH1cbiAgICAgICAgKVxuICAgICAgfVxuICAgIH0sXG4gICAgW2lzRGlzYWJsZWQsIHJvb3RNYXJnaW4sIHZpc2libGVdXG4gIClcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghaGFzSW50ZXJzZWN0aW9uT2JzZXJ2ZXIpIHtcbiAgICAgIGlmICghdmlzaWJsZSkge1xuICAgICAgICBjb25zdCBpZGxlQ2FsbGJhY2sgPSByZXF1ZXN0SWRsZUNhbGxiYWNrKCgpID0+IHNldFZpc2libGUodHJ1ZSkpXG4gICAgICAgIHJldHVybiAoKSA9PiBjYW5jZWxJZGxlQ2FsbGJhY2soaWRsZUNhbGxiYWNrKVxuICAgICAgfVxuICAgIH1cbiAgfSwgW3Zpc2libGVdKVxuXG4gIHJldHVybiBbc2V0UmVmLCB2aXNpYmxlXVxufVxuXG5mdW5jdGlvbiBvYnNlcnZlKFxuICBlbGVtZW50OiBFbGVtZW50LFxuICBjYWxsYmFjazogT2JzZXJ2ZUNhbGxiYWNrLFxuICBvcHRpb25zOiBVc2VJbnRlcnNlY3Rpb25PYnNlcnZlckluaXRcbik6ICgpID0+IHZvaWQge1xuICBjb25zdCB7IGlkLCBvYnNlcnZlciwgZWxlbWVudHMgfSA9IGNyZWF0ZU9ic2VydmVyKG9wdGlvbnMpXG4gIGVsZW1lbnRzLnNldChlbGVtZW50LCBjYWxsYmFjaylcblxuICBvYnNlcnZlci5vYnNlcnZlKGVsZW1lbnQpXG4gIHJldHVybiBmdW5jdGlvbiB1bm9ic2VydmUoKTogdm9pZCB7XG4gICAgZWxlbWVudHMuZGVsZXRlKGVsZW1lbnQpXG4gICAgb2JzZXJ2ZXIudW5vYnNlcnZlKGVsZW1lbnQpXG5cbiAgICAvLyBEZXN0cm95IG9ic2VydmVyIHdoZW4gdGhlcmUncyBub3RoaW5nIGxlZnQgdG8gd2F0Y2g6XG4gICAgaWYgKGVsZW1lbnRzLnNpemUgPT09IDApIHtcbiAgICAgIG9ic2VydmVyLmRpc2Nvbm5lY3QoKVxuICAgICAgb2JzZXJ2ZXJzLmRlbGV0ZShpZClcbiAgICB9XG4gIH1cbn1cblxuY29uc3Qgb2JzZXJ2ZXJzID0gbmV3IE1hcDxzdHJpbmcsIE9ic2VydmVyPigpXG5mdW5jdGlvbiBjcmVhdGVPYnNlcnZlcihvcHRpb25zOiBVc2VJbnRlcnNlY3Rpb25PYnNlcnZlckluaXQpOiBPYnNlcnZlciB7XG4gIGNvbnN0IGlkID0gb3B0aW9ucy5yb290TWFyZ2luIHx8ICcnXG4gIGxldCBpbnN0YW5jZSA9IG9ic2VydmVycy5nZXQoaWQpXG4gIGlmIChpbnN0YW5jZSkge1xuICAgIHJldHVybiBpbnN0YW5jZVxuICB9XG5cbiAgY29uc3QgZWxlbWVudHMgPSBuZXcgTWFwPEVsZW1lbnQsIE9ic2VydmVDYWxsYmFjaz4oKVxuICBjb25zdCBvYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcigoZW50cmllcykgPT4ge1xuICAgIGVudHJpZXMuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICAgIGNvbnN0IGNhbGxiYWNrID0gZWxlbWVudHMuZ2V0KGVudHJ5LnRhcmdldClcbiAgICAgIGNvbnN0IGlzVmlzaWJsZSA9IGVudHJ5LmlzSW50ZXJzZWN0aW5nIHx8IGVudHJ5LmludGVyc2VjdGlvblJhdGlvID4gMFxuICAgICAgaWYgKGNhbGxiYWNrICYmIGlzVmlzaWJsZSkge1xuICAgICAgICBjYWxsYmFjayhpc1Zpc2libGUpXG4gICAgICB9XG4gICAgfSlcbiAgfSwgb3B0aW9ucylcblxuICBvYnNlcnZlcnMuc2V0KFxuICAgIGlkLFxuICAgIChpbnN0YW5jZSA9IHtcbiAgICAgIGlkLFxuICAgICAgb2JzZXJ2ZXIsXG4gICAgICBlbGVtZW50cyxcbiAgICB9KVxuICApXG4gIHJldHVybiBpbnN0YW5jZVxufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgTmV4dENvbXBvbmVudFR5cGUsIE5leHRQYWdlQ29udGV4dCB9IGZyb20gJy4uL25leHQtc2VydmVyL2xpYi91dGlscydcbmltcG9ydCB7IE5leHRSb3V0ZXIsIHVzZVJvdXRlciB9IGZyb20gJy4vcm91dGVyJ1xuXG5leHBvcnQgdHlwZSBXaXRoUm91dGVyUHJvcHMgPSB7XG4gIHJvdXRlcjogTmV4dFJvdXRlclxufVxuXG5leHBvcnQgdHlwZSBFeGNsdWRlUm91dGVyUHJvcHM8UD4gPSBQaWNrPFxuICBQLFxuICBFeGNsdWRlPGtleW9mIFAsIGtleW9mIFdpdGhSb3V0ZXJQcm9wcz5cbj5cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gd2l0aFJvdXRlcjxcbiAgUCBleHRlbmRzIFdpdGhSb3V0ZXJQcm9wcyxcbiAgQyA9IE5leHRQYWdlQ29udGV4dFxuPihcbiAgQ29tcG9zZWRDb21wb25lbnQ6IE5leHRDb21wb25lbnRUeXBlPEMsIGFueSwgUD5cbik6IFJlYWN0LkNvbXBvbmVudFR5cGU8RXhjbHVkZVJvdXRlclByb3BzPFA+PiB7XG4gIGZ1bmN0aW9uIFdpdGhSb3V0ZXJXcmFwcGVyKHByb3BzOiBhbnkpOiBKU1guRWxlbWVudCB7XG4gICAgcmV0dXJuIDxDb21wb3NlZENvbXBvbmVudCByb3V0ZXI9e3VzZVJvdXRlcigpfSB7Li4ucHJvcHN9IC8+XG4gIH1cblxuICBXaXRoUm91dGVyV3JhcHBlci5nZXRJbml0aWFsUHJvcHMgPSBDb21wb3NlZENvbXBvbmVudC5nZXRJbml0aWFsUHJvcHNcbiAgLy8gVGhpcyBpcyBuZWVkZWQgdG8gYWxsb3cgY2hlY2tpbmcgZm9yIGN1c3RvbSBnZXRJbml0aWFsUHJvcHMgaW4gX2FwcFxuICA7KFdpdGhSb3V0ZXJXcmFwcGVyIGFzIGFueSkub3JpZ0dldEluaXRpYWxQcm9wcyA9IChDb21wb3NlZENvbXBvbmVudCBhcyBhbnkpLm9yaWdHZXRJbml0aWFsUHJvcHNcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBjb25zdCBuYW1lID1cbiAgICAgIENvbXBvc2VkQ29tcG9uZW50LmRpc3BsYXlOYW1lIHx8IENvbXBvc2VkQ29tcG9uZW50Lm5hbWUgfHwgJ1Vua25vd24nXG4gICAgV2l0aFJvdXRlcldyYXBwZXIuZGlzcGxheU5hbWUgPSBgd2l0aFJvdXRlcigke25hbWV9KWBcbiAgfVxuXG4gIHJldHVybiBXaXRoUm91dGVyV3JhcHBlclxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqIFRva2VuaXplIGlucHV0IHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gbGV4ZXIoc3RyKSB7XG4gICAgdmFyIHRva2VucyA9IFtdO1xuICAgIHZhciBpID0gMDtcbiAgICB3aGlsZSAoaSA8IHN0ci5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGNoYXIgPSBzdHJbaV07XG4gICAgICAgIGlmIChjaGFyID09PSBcIipcIiB8fCBjaGFyID09PSBcIitcIiB8fCBjaGFyID09PSBcIj9cIikge1xuICAgICAgICAgICAgdG9rZW5zLnB1c2goeyB0eXBlOiBcIk1PRElGSUVSXCIsIGluZGV4OiBpLCB2YWx1ZTogc3RyW2krK10gfSk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2hhciA9PT0gXCJcXFxcXCIpIHtcbiAgICAgICAgICAgIHRva2Vucy5wdXNoKHsgdHlwZTogXCJFU0NBUEVEX0NIQVJcIiwgaW5kZXg6IGkrKywgdmFsdWU6IHN0cltpKytdIH0pO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoYXIgPT09IFwie1wiKSB7XG4gICAgICAgICAgICB0b2tlbnMucHVzaCh7IHR5cGU6IFwiT1BFTlwiLCBpbmRleDogaSwgdmFsdWU6IHN0cltpKytdIH0pO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoYXIgPT09IFwifVwiKSB7XG4gICAgICAgICAgICB0b2tlbnMucHVzaCh7IHR5cGU6IFwiQ0xPU0VcIiwgaW5kZXg6IGksIHZhbHVlOiBzdHJbaSsrXSB9KTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjaGFyID09PSBcIjpcIikge1xuICAgICAgICAgICAgdmFyIG5hbWUgPSBcIlwiO1xuICAgICAgICAgICAgdmFyIGogPSBpICsgMTtcbiAgICAgICAgICAgIHdoaWxlIChqIDwgc3RyLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHZhciBjb2RlID0gc3RyLmNoYXJDb2RlQXQoaik7XG4gICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIC8vIGAwLTlgXG4gICAgICAgICAgICAgICAgKGNvZGUgPj0gNDggJiYgY29kZSA8PSA1NykgfHxcbiAgICAgICAgICAgICAgICAgICAgLy8gYEEtWmBcbiAgICAgICAgICAgICAgICAgICAgKGNvZGUgPj0gNjUgJiYgY29kZSA8PSA5MCkgfHxcbiAgICAgICAgICAgICAgICAgICAgLy8gYGEtemBcbiAgICAgICAgICAgICAgICAgICAgKGNvZGUgPj0gOTcgJiYgY29kZSA8PSAxMjIpIHx8XG4gICAgICAgICAgICAgICAgICAgIC8vIGBfYFxuICAgICAgICAgICAgICAgICAgICBjb2RlID09PSA5NSkge1xuICAgICAgICAgICAgICAgICAgICBuYW1lICs9IHN0cltqKytdO1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIW5hbWUpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIk1pc3NpbmcgcGFyYW1ldGVyIG5hbWUgYXQgXCIgKyBpKTtcbiAgICAgICAgICAgIHRva2Vucy5wdXNoKHsgdHlwZTogXCJOQU1FXCIsIGluZGV4OiBpLCB2YWx1ZTogbmFtZSB9KTtcbiAgICAgICAgICAgIGkgPSBqO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoYXIgPT09IFwiKFwiKSB7XG4gICAgICAgICAgICB2YXIgY291bnQgPSAxO1xuICAgICAgICAgICAgdmFyIHBhdHRlcm4gPSBcIlwiO1xuICAgICAgICAgICAgdmFyIGogPSBpICsgMTtcbiAgICAgICAgICAgIGlmIChzdHJbal0gPT09IFwiP1wiKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlBhdHRlcm4gY2Fubm90IHN0YXJ0IHdpdGggXFxcIj9cXFwiIGF0IFwiICsgaik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3aGlsZSAoaiA8IHN0ci5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBpZiAoc3RyW2pdID09PSBcIlxcXFxcIikge1xuICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuICs9IHN0cltqKytdICsgc3RyW2orK107XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoc3RyW2pdID09PSBcIilcIikge1xuICAgICAgICAgICAgICAgICAgICBjb3VudC0tO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY291bnQgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGorKztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHN0cltqXSA9PT0gXCIoXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgY291bnQrKztcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0cltqICsgMV0gIT09IFwiP1wiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2FwdHVyaW5nIGdyb3VwcyBhcmUgbm90IGFsbG93ZWQgYXQgXCIgKyBqKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwYXR0ZXJuICs9IHN0cltqKytdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNvdW50KVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJVbmJhbGFuY2VkIHBhdHRlcm4gYXQgXCIgKyBpKTtcbiAgICAgICAgICAgIGlmICghcGF0dGVybilcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiTWlzc2luZyBwYXR0ZXJuIGF0IFwiICsgaSk7XG4gICAgICAgICAgICB0b2tlbnMucHVzaCh7IHR5cGU6IFwiUEFUVEVSTlwiLCBpbmRleDogaSwgdmFsdWU6IHBhdHRlcm4gfSk7XG4gICAgICAgICAgICBpID0gajtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHRva2Vucy5wdXNoKHsgdHlwZTogXCJDSEFSXCIsIGluZGV4OiBpLCB2YWx1ZTogc3RyW2krK10gfSk7XG4gICAgfVxuICAgIHRva2Vucy5wdXNoKHsgdHlwZTogXCJFTkRcIiwgaW5kZXg6IGksIHZhbHVlOiBcIlwiIH0pO1xuICAgIHJldHVybiB0b2tlbnM7XG59XG4vKipcbiAqIFBhcnNlIGEgc3RyaW5nIGZvciB0aGUgcmF3IHRva2Vucy5cbiAqL1xuZnVuY3Rpb24gcGFyc2Uoc3RyLCBvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cbiAgICB2YXIgdG9rZW5zID0gbGV4ZXIoc3RyKTtcbiAgICB2YXIgX2EgPSBvcHRpb25zLnByZWZpeGVzLCBwcmVmaXhlcyA9IF9hID09PSB2b2lkIDAgPyBcIi4vXCIgOiBfYTtcbiAgICB2YXIgZGVmYXVsdFBhdHRlcm4gPSBcIlteXCIgKyBlc2NhcGVTdHJpbmcob3B0aW9ucy5kZWxpbWl0ZXIgfHwgXCIvIz9cIikgKyBcIl0rP1wiO1xuICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICB2YXIga2V5ID0gMDtcbiAgICB2YXIgaSA9IDA7XG4gICAgdmFyIHBhdGggPSBcIlwiO1xuICAgIHZhciB0cnlDb25zdW1lID0gZnVuY3Rpb24gKHR5cGUpIHtcbiAgICAgICAgaWYgKGkgPCB0b2tlbnMubGVuZ3RoICYmIHRva2Vuc1tpXS50eXBlID09PSB0eXBlKVxuICAgICAgICAgICAgcmV0dXJuIHRva2Vuc1tpKytdLnZhbHVlO1xuICAgIH07XG4gICAgdmFyIG11c3RDb25zdW1lID0gZnVuY3Rpb24gKHR5cGUpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gdHJ5Q29uc3VtZSh0eXBlKTtcbiAgICAgICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIHZhciBfYSA9IHRva2Vuc1tpXSwgbmV4dFR5cGUgPSBfYS50eXBlLCBpbmRleCA9IF9hLmluZGV4O1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiVW5leHBlY3RlZCBcIiArIG5leHRUeXBlICsgXCIgYXQgXCIgKyBpbmRleCArIFwiLCBleHBlY3RlZCBcIiArIHR5cGUpO1xuICAgIH07XG4gICAgdmFyIGNvbnN1bWVUZXh0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gXCJcIjtcbiAgICAgICAgdmFyIHZhbHVlO1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgICAgd2hpbGUgKCh2YWx1ZSA9IHRyeUNvbnN1bWUoXCJDSEFSXCIpIHx8IHRyeUNvbnN1bWUoXCJFU0NBUEVEX0NIQVJcIikpKSB7XG4gICAgICAgICAgICByZXN1bHQgKz0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICAgIHdoaWxlIChpIDwgdG9rZW5zLmxlbmd0aCkge1xuICAgICAgICB2YXIgY2hhciA9IHRyeUNvbnN1bWUoXCJDSEFSXCIpO1xuICAgICAgICB2YXIgbmFtZSA9IHRyeUNvbnN1bWUoXCJOQU1FXCIpO1xuICAgICAgICB2YXIgcGF0dGVybiA9IHRyeUNvbnN1bWUoXCJQQVRURVJOXCIpO1xuICAgICAgICBpZiAobmFtZSB8fCBwYXR0ZXJuKSB7XG4gICAgICAgICAgICB2YXIgcHJlZml4ID0gY2hhciB8fCBcIlwiO1xuICAgICAgICAgICAgaWYgKHByZWZpeGVzLmluZGV4T2YocHJlZml4KSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICBwYXRoICs9IHByZWZpeDtcbiAgICAgICAgICAgICAgICBwcmVmaXggPSBcIlwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBhdGgpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChwYXRoKTtcbiAgICAgICAgICAgICAgICBwYXRoID0gXCJcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHtcbiAgICAgICAgICAgICAgICBuYW1lOiBuYW1lIHx8IGtleSsrLFxuICAgICAgICAgICAgICAgIHByZWZpeDogcHJlZml4LFxuICAgICAgICAgICAgICAgIHN1ZmZpeDogXCJcIixcbiAgICAgICAgICAgICAgICBwYXR0ZXJuOiBwYXR0ZXJuIHx8IGRlZmF1bHRQYXR0ZXJuLFxuICAgICAgICAgICAgICAgIG1vZGlmaWVyOiB0cnlDb25zdW1lKFwiTU9ESUZJRVJcIikgfHwgXCJcIlxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgdmFsdWUgPSBjaGFyIHx8IHRyeUNvbnN1bWUoXCJFU0NBUEVEX0NIQVJcIik7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgcGF0aCArPSB2YWx1ZTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwYXRoKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChwYXRoKTtcbiAgICAgICAgICAgIHBhdGggPSBcIlwiO1xuICAgICAgICB9XG4gICAgICAgIHZhciBvcGVuID0gdHJ5Q29uc3VtZShcIk9QRU5cIik7XG4gICAgICAgIGlmIChvcGVuKSB7XG4gICAgICAgICAgICB2YXIgcHJlZml4ID0gY29uc3VtZVRleHQoKTtcbiAgICAgICAgICAgIHZhciBuYW1lXzEgPSB0cnlDb25zdW1lKFwiTkFNRVwiKSB8fCBcIlwiO1xuICAgICAgICAgICAgdmFyIHBhdHRlcm5fMSA9IHRyeUNvbnN1bWUoXCJQQVRURVJOXCIpIHx8IFwiXCI7XG4gICAgICAgICAgICB2YXIgc3VmZml4ID0gY29uc3VtZVRleHQoKTtcbiAgICAgICAgICAgIG11c3RDb25zdW1lKFwiQ0xPU0VcIik7XG4gICAgICAgICAgICByZXN1bHQucHVzaCh7XG4gICAgICAgICAgICAgICAgbmFtZTogbmFtZV8xIHx8IChwYXR0ZXJuXzEgPyBrZXkrKyA6IFwiXCIpLFxuICAgICAgICAgICAgICAgIHBhdHRlcm46IG5hbWVfMSAmJiAhcGF0dGVybl8xID8gZGVmYXVsdFBhdHRlcm4gOiBwYXR0ZXJuXzEsXG4gICAgICAgICAgICAgICAgcHJlZml4OiBwcmVmaXgsXG4gICAgICAgICAgICAgICAgc3VmZml4OiBzdWZmaXgsXG4gICAgICAgICAgICAgICAgbW9kaWZpZXI6IHRyeUNvbnN1bWUoXCJNT0RJRklFUlwiKSB8fCBcIlwiXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIG11c3RDb25zdW1lKFwiRU5EXCIpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuZXhwb3J0cy5wYXJzZSA9IHBhcnNlO1xuLyoqXG4gKiBDb21waWxlIGEgc3RyaW5nIHRvIGEgdGVtcGxhdGUgZnVuY3Rpb24gZm9yIHRoZSBwYXRoLlxuICovXG5mdW5jdGlvbiBjb21waWxlKHN0ciwgb3B0aW9ucykge1xuICAgIHJldHVybiB0b2tlbnNUb0Z1bmN0aW9uKHBhcnNlKHN0ciwgb3B0aW9ucyksIG9wdGlvbnMpO1xufVxuZXhwb3J0cy5jb21waWxlID0gY29tcGlsZTtcbi8qKlxuICogRXhwb3NlIGEgbWV0aG9kIGZvciB0cmFuc2Zvcm1pbmcgdG9rZW5zIGludG8gdGhlIHBhdGggZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIHRva2Vuc1RvRnVuY3Rpb24odG9rZW5zLCBvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cbiAgICB2YXIgcmVGbGFncyA9IGZsYWdzKG9wdGlvbnMpO1xuICAgIHZhciBfYSA9IG9wdGlvbnMuZW5jb2RlLCBlbmNvZGUgPSBfYSA9PT0gdm9pZCAwID8gZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHg7IH0gOiBfYSwgX2IgPSBvcHRpb25zLnZhbGlkYXRlLCB2YWxpZGF0ZSA9IF9iID09PSB2b2lkIDAgPyB0cnVlIDogX2I7XG4gICAgLy8gQ29tcGlsZSBhbGwgdGhlIHRva2VucyBpbnRvIHJlZ2V4cHMuXG4gICAgdmFyIG1hdGNoZXMgPSB0b2tlbnMubWFwKGZ1bmN0aW9uICh0b2tlbikge1xuICAgICAgICBpZiAodHlwZW9mIHRva2VuID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFJlZ0V4cChcIl4oPzpcIiArIHRva2VuLnBhdHRlcm4gKyBcIikkXCIsIHJlRmxhZ3MpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHZhciBwYXRoID0gXCJcIjtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0b2tlbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciB0b2tlbiA9IHRva2Vuc1tpXTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdG9rZW4gPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgICAgICBwYXRoICs9IHRva2VuO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHZhbHVlID0gZGF0YSA/IGRhdGFbdG9rZW4ubmFtZV0gOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB2YXIgb3B0aW9uYWwgPSB0b2tlbi5tb2RpZmllciA9PT0gXCI/XCIgfHwgdG9rZW4ubW9kaWZpZXIgPT09IFwiKlwiO1xuICAgICAgICAgICAgdmFyIHJlcGVhdCA9IHRva2VuLm1vZGlmaWVyID09PSBcIipcIiB8fCB0b2tlbi5tb2RpZmllciA9PT0gXCIrXCI7XG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXJlcGVhdCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiRXhwZWN0ZWQgXFxcIlwiICsgdG9rZW4ubmFtZSArIFwiXFxcIiB0byBub3QgcmVwZWF0LCBidXQgZ290IGFuIGFycmF5XCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25hbClcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiRXhwZWN0ZWQgXFxcIlwiICsgdG9rZW4ubmFtZSArIFwiXFxcIiB0byBub3QgYmUgZW1wdHlcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdmFsdWUubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlZ21lbnQgPSBlbmNvZGUodmFsdWVbal0sIHRva2VuKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbGlkYXRlICYmICFtYXRjaGVzW2ldLnRlc3Qoc2VnbWVudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJFeHBlY3RlZCBhbGwgXFxcIlwiICsgdG9rZW4ubmFtZSArIFwiXFxcIiB0byBtYXRjaCBcXFwiXCIgKyB0b2tlbi5wYXR0ZXJuICsgXCJcXFwiLCBidXQgZ290IFxcXCJcIiArIHNlZ21lbnQgKyBcIlxcXCJcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcGF0aCArPSB0b2tlbi5wcmVmaXggKyBzZWdtZW50ICsgdG9rZW4uc3VmZml4O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgfHwgdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNlZ21lbnQgPSBlbmNvZGUoU3RyaW5nKHZhbHVlKSwgdG9rZW4pO1xuICAgICAgICAgICAgICAgIGlmICh2YWxpZGF0ZSAmJiAhbWF0Y2hlc1tpXS50ZXN0KHNlZ21lbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJFeHBlY3RlZCBcXFwiXCIgKyB0b2tlbi5uYW1lICsgXCJcXFwiIHRvIG1hdGNoIFxcXCJcIiArIHRva2VuLnBhdHRlcm4gKyBcIlxcXCIsIGJ1dCBnb3QgXFxcIlwiICsgc2VnbWVudCArIFwiXFxcIlwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcGF0aCArPSB0b2tlbi5wcmVmaXggKyBzZWdtZW50ICsgdG9rZW4uc3VmZml4O1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG9wdGlvbmFsKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgdmFyIHR5cGVPZk1lc3NhZ2UgPSByZXBlYXQgPyBcImFuIGFycmF5XCIgOiBcImEgc3RyaW5nXCI7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiRXhwZWN0ZWQgXFxcIlwiICsgdG9rZW4ubmFtZSArIFwiXFxcIiB0byBiZSBcIiArIHR5cGVPZk1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwYXRoO1xuICAgIH07XG59XG5leHBvcnRzLnRva2Vuc1RvRnVuY3Rpb24gPSB0b2tlbnNUb0Z1bmN0aW9uO1xuLyoqXG4gKiBDcmVhdGUgcGF0aCBtYXRjaCBmdW5jdGlvbiBmcm9tIGBwYXRoLXRvLXJlZ2V4cGAgc3BlYy5cbiAqL1xuZnVuY3Rpb24gbWF0Y2goc3RyLCBvcHRpb25zKSB7XG4gICAgdmFyIGtleXMgPSBbXTtcbiAgICB2YXIgcmUgPSBwYXRoVG9SZWdleHAoc3RyLCBrZXlzLCBvcHRpb25zKTtcbiAgICByZXR1cm4gcmVnZXhwVG9GdW5jdGlvbihyZSwga2V5cywgb3B0aW9ucyk7XG59XG5leHBvcnRzLm1hdGNoID0gbWF0Y2g7XG4vKipcbiAqIENyZWF0ZSBhIHBhdGggbWF0Y2ggZnVuY3Rpb24gZnJvbSBgcGF0aC10by1yZWdleHBgIG91dHB1dC5cbiAqL1xuZnVuY3Rpb24gcmVnZXhwVG9GdW5jdGlvbihyZSwga2V5cywgb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IHt9OyB9XG4gICAgdmFyIF9hID0gb3B0aW9ucy5kZWNvZGUsIGRlY29kZSA9IF9hID09PSB2b2lkIDAgPyBmdW5jdGlvbiAoeCkgeyByZXR1cm4geDsgfSA6IF9hO1xuICAgIHJldHVybiBmdW5jdGlvbiAocGF0aG5hbWUpIHtcbiAgICAgICAgdmFyIG0gPSByZS5leGVjKHBhdGhuYW1lKTtcbiAgICAgICAgaWYgKCFtKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB2YXIgcGF0aCA9IG1bMF0sIGluZGV4ID0gbS5pbmRleDtcbiAgICAgICAgdmFyIHBhcmFtcyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIHZhciBfbG9vcF8xID0gZnVuY3Rpb24gKGkpIHtcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZVxuICAgICAgICAgICAgaWYgKG1baV0gPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJjb250aW51ZVwiO1xuICAgICAgICAgICAgdmFyIGtleSA9IGtleXNbaSAtIDFdO1xuICAgICAgICAgICAgaWYgKGtleS5tb2RpZmllciA9PT0gXCIqXCIgfHwga2V5Lm1vZGlmaWVyID09PSBcIitcIikge1xuICAgICAgICAgICAgICAgIHBhcmFtc1trZXkubmFtZV0gPSBtW2ldLnNwbGl0KGtleS5wcmVmaXggKyBrZXkuc3VmZml4KS5tYXAoZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWNvZGUodmFsdWUsIGtleSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBwYXJhbXNba2V5Lm5hbWVdID0gZGVjb2RlKG1baV0sIGtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgbS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgX2xvb3BfMShpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBwYXRoOiBwYXRoLCBpbmRleDogaW5kZXgsIHBhcmFtczogcGFyYW1zIH07XG4gICAgfTtcbn1cbmV4cG9ydHMucmVnZXhwVG9GdW5jdGlvbiA9IHJlZ2V4cFRvRnVuY3Rpb247XG4vKipcbiAqIEVzY2FwZSBhIHJlZ3VsYXIgZXhwcmVzc2lvbiBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIGVzY2FwZVN0cmluZyhzdHIpIHtcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoLyhbLisqPz1eIToke30oKVtcXF18L1xcXFxdKS9nLCBcIlxcXFwkMVwiKTtcbn1cbi8qKlxuICogR2V0IHRoZSBmbGFncyBmb3IgYSByZWdleHAgZnJvbSB0aGUgb3B0aW9ucy5cbiAqL1xuZnVuY3Rpb24gZmxhZ3Mob3B0aW9ucykge1xuICAgIHJldHVybiBvcHRpb25zICYmIG9wdGlvbnMuc2Vuc2l0aXZlID8gXCJcIiA6IFwiaVwiO1xufVxuLyoqXG4gKiBQdWxsIG91dCBrZXlzIGZyb20gYSByZWdleHAuXG4gKi9cbmZ1bmN0aW9uIHJlZ2V4cFRvUmVnZXhwKHBhdGgsIGtleXMpIHtcbiAgICBpZiAoIWtleXMpXG4gICAgICAgIHJldHVybiBwYXRoO1xuICAgIC8vIFVzZSBhIG5lZ2F0aXZlIGxvb2thaGVhZCB0byBtYXRjaCBvbmx5IGNhcHR1cmluZyBncm91cHMuXG4gICAgdmFyIGdyb3VwcyA9IHBhdGguc291cmNlLm1hdGNoKC9cXCgoPyFcXD8pL2cpO1xuICAgIGlmIChncm91cHMpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBncm91cHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGtleXMucHVzaCh7XG4gICAgICAgICAgICAgICAgbmFtZTogaSxcbiAgICAgICAgICAgICAgICBwcmVmaXg6IFwiXCIsXG4gICAgICAgICAgICAgICAgc3VmZml4OiBcIlwiLFxuICAgICAgICAgICAgICAgIG1vZGlmaWVyOiBcIlwiLFxuICAgICAgICAgICAgICAgIHBhdHRlcm46IFwiXCJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBwYXRoO1xufVxuLyoqXG4gKiBUcmFuc2Zvcm0gYW4gYXJyYXkgaW50byBhIHJlZ2V4cC5cbiAqL1xuZnVuY3Rpb24gYXJyYXlUb1JlZ2V4cChwYXRocywga2V5cywgb3B0aW9ucykge1xuICAgIHZhciBwYXJ0cyA9IHBhdGhzLm1hcChmdW5jdGlvbiAocGF0aCkgeyByZXR1cm4gcGF0aFRvUmVnZXhwKHBhdGgsIGtleXMsIG9wdGlvbnMpLnNvdXJjZTsgfSk7XG4gICAgcmV0dXJuIG5ldyBSZWdFeHAoXCIoPzpcIiArIHBhcnRzLmpvaW4oXCJ8XCIpICsgXCIpXCIsIGZsYWdzKG9wdGlvbnMpKTtcbn1cbi8qKlxuICogQ3JlYXRlIGEgcGF0aCByZWdleHAgZnJvbSBzdHJpbmcgaW5wdXQuXG4gKi9cbmZ1bmN0aW9uIHN0cmluZ1RvUmVnZXhwKHBhdGgsIGtleXMsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdG9rZW5zVG9SZWdleHAocGFyc2UocGF0aCwgb3B0aW9ucyksIGtleXMsIG9wdGlvbnMpO1xufVxuLyoqXG4gKiBFeHBvc2UgYSBmdW5jdGlvbiBmb3IgdGFraW5nIHRva2VucyBhbmQgcmV0dXJuaW5nIGEgUmVnRXhwLlxuICovXG5mdW5jdGlvbiB0b2tlbnNUb1JlZ2V4cCh0b2tlbnMsIGtleXMsIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSB7fTsgfVxuICAgIHZhciBfYSA9IG9wdGlvbnMuc3RyaWN0LCBzdHJpY3QgPSBfYSA9PT0gdm9pZCAwID8gZmFsc2UgOiBfYSwgX2IgPSBvcHRpb25zLnN0YXJ0LCBzdGFydCA9IF9iID09PSB2b2lkIDAgPyB0cnVlIDogX2IsIF9jID0gb3B0aW9ucy5lbmQsIGVuZCA9IF9jID09PSB2b2lkIDAgPyB0cnVlIDogX2MsIF9kID0gb3B0aW9ucy5lbmNvZGUsIGVuY29kZSA9IF9kID09PSB2b2lkIDAgPyBmdW5jdGlvbiAoeCkgeyByZXR1cm4geDsgfSA6IF9kO1xuICAgIHZhciBlbmRzV2l0aCA9IFwiW1wiICsgZXNjYXBlU3RyaW5nKG9wdGlvbnMuZW5kc1dpdGggfHwgXCJcIikgKyBcIl18JFwiO1xuICAgIHZhciBkZWxpbWl0ZXIgPSBcIltcIiArIGVzY2FwZVN0cmluZyhvcHRpb25zLmRlbGltaXRlciB8fCBcIi8jP1wiKSArIFwiXVwiO1xuICAgIHZhciByb3V0ZSA9IHN0YXJ0ID8gXCJeXCIgOiBcIlwiO1xuICAgIC8vIEl0ZXJhdGUgb3ZlciB0aGUgdG9rZW5zIGFuZCBjcmVhdGUgb3VyIHJlZ2V4cCBzdHJpbmcuXG4gICAgZm9yICh2YXIgX2kgPSAwLCB0b2tlbnNfMSA9IHRva2VuczsgX2kgPCB0b2tlbnNfMS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgdmFyIHRva2VuID0gdG9rZW5zXzFbX2ldO1xuICAgICAgICBpZiAodHlwZW9mIHRva2VuID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICByb3V0ZSArPSBlc2NhcGVTdHJpbmcoZW5jb2RlKHRva2VuKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgcHJlZml4ID0gZXNjYXBlU3RyaW5nKGVuY29kZSh0b2tlbi5wcmVmaXgpKTtcbiAgICAgICAgICAgIHZhciBzdWZmaXggPSBlc2NhcGVTdHJpbmcoZW5jb2RlKHRva2VuLnN1ZmZpeCkpO1xuICAgICAgICAgICAgaWYgKHRva2VuLnBhdHRlcm4pIHtcbiAgICAgICAgICAgICAgICBpZiAoa2V5cylcbiAgICAgICAgICAgICAgICAgICAga2V5cy5wdXNoKHRva2VuKTtcbiAgICAgICAgICAgICAgICBpZiAocHJlZml4IHx8IHN1ZmZpeCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodG9rZW4ubW9kaWZpZXIgPT09IFwiK1wiIHx8IHRva2VuLm1vZGlmaWVyID09PSBcIipcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1vZCA9IHRva2VuLm1vZGlmaWVyID09PSBcIipcIiA/IFwiP1wiIDogXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdXRlICs9IFwiKD86XCIgKyBwcmVmaXggKyBcIigoPzpcIiArIHRva2VuLnBhdHRlcm4gKyBcIikoPzpcIiArIHN1ZmZpeCArIHByZWZpeCArIFwiKD86XCIgKyB0b2tlbi5wYXR0ZXJuICsgXCIpKSopXCIgKyBzdWZmaXggKyBcIilcIiArIG1vZDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdXRlICs9IFwiKD86XCIgKyBwcmVmaXggKyBcIihcIiArIHRva2VuLnBhdHRlcm4gKyBcIilcIiArIHN1ZmZpeCArIFwiKVwiICsgdG9rZW4ubW9kaWZpZXI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJvdXRlICs9IFwiKFwiICsgdG9rZW4ucGF0dGVybiArIFwiKVwiICsgdG9rZW4ubW9kaWZpZXI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcm91dGUgKz0gXCIoPzpcIiArIHByZWZpeCArIHN1ZmZpeCArIFwiKVwiICsgdG9rZW4ubW9kaWZpZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKGVuZCkge1xuICAgICAgICBpZiAoIXN0cmljdClcbiAgICAgICAgICAgIHJvdXRlICs9IGRlbGltaXRlciArIFwiP1wiO1xuICAgICAgICByb3V0ZSArPSAhb3B0aW9ucy5lbmRzV2l0aCA/IFwiJFwiIDogXCIoPz1cIiArIGVuZHNXaXRoICsgXCIpXCI7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB2YXIgZW5kVG9rZW4gPSB0b2tlbnNbdG9rZW5zLmxlbmd0aCAtIDFdO1xuICAgICAgICB2YXIgaXNFbmREZWxpbWl0ZWQgPSB0eXBlb2YgZW5kVG9rZW4gPT09IFwic3RyaW5nXCJcbiAgICAgICAgICAgID8gZGVsaW1pdGVyLmluZGV4T2YoZW5kVG9rZW5bZW5kVG9rZW4ubGVuZ3RoIC0gMV0pID4gLTFcbiAgICAgICAgICAgIDogLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lXG4gICAgICAgICAgICAgICAgZW5kVG9rZW4gPT09IHVuZGVmaW5lZDtcbiAgICAgICAgaWYgKCFzdHJpY3QpIHtcbiAgICAgICAgICAgIHJvdXRlICs9IFwiKD86XCIgKyBkZWxpbWl0ZXIgKyBcIig/PVwiICsgZW5kc1dpdGggKyBcIikpP1wiO1xuICAgICAgICB9XG4gICAgICAgIGlmICghaXNFbmREZWxpbWl0ZWQpIHtcbiAgICAgICAgICAgIHJvdXRlICs9IFwiKD89XCIgKyBkZWxpbWl0ZXIgKyBcInxcIiArIGVuZHNXaXRoICsgXCIpXCI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5ldyBSZWdFeHAocm91dGUsIGZsYWdzKG9wdGlvbnMpKTtcbn1cbmV4cG9ydHMudG9rZW5zVG9SZWdleHAgPSB0b2tlbnNUb1JlZ2V4cDtcbi8qKlxuICogTm9ybWFsaXplIHRoZSBnaXZlbiBwYXRoIHN0cmluZywgcmV0dXJuaW5nIGEgcmVndWxhciBleHByZXNzaW9uLlxuICpcbiAqIEFuIGVtcHR5IGFycmF5IGNhbiBiZSBwYXNzZWQgaW4gZm9yIHRoZSBrZXlzLCB3aGljaCB3aWxsIGhvbGQgdGhlXG4gKiBwbGFjZWhvbGRlciBrZXkgZGVzY3JpcHRpb25zLiBGb3IgZXhhbXBsZSwgdXNpbmcgYC91c2VyLzppZGAsIGBrZXlzYCB3aWxsXG4gKiBjb250YWluIGBbeyBuYW1lOiAnaWQnLCBkZWxpbWl0ZXI6ICcvJywgb3B0aW9uYWw6IGZhbHNlLCByZXBlYXQ6IGZhbHNlIH1dYC5cbiAqL1xuZnVuY3Rpb24gcGF0aFRvUmVnZXhwKHBhdGgsIGtleXMsIG9wdGlvbnMpIHtcbiAgICBpZiAocGF0aCBpbnN0YW5jZW9mIFJlZ0V4cClcbiAgICAgICAgcmV0dXJuIHJlZ2V4cFRvUmVnZXhwKHBhdGgsIGtleXMpO1xuICAgIGlmIChBcnJheS5pc0FycmF5KHBhdGgpKVxuICAgICAgICByZXR1cm4gYXJyYXlUb1JlZ2V4cChwYXRoLCBrZXlzLCBvcHRpb25zKTtcbiAgICByZXR1cm4gc3RyaW5nVG9SZWdleHAocGF0aCwga2V5cywgb3B0aW9ucyk7XG59XG5leHBvcnRzLnBhdGhUb1JlZ2V4cCA9IHBhdGhUb1JlZ2V4cDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsImV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVMb2NhbGVQYXRoKFxuICBwYXRobmFtZTogc3RyaW5nLFxuICBsb2NhbGVzPzogc3RyaW5nW11cbik6IHtcbiAgZGV0ZWN0ZWRMb2NhbGU/OiBzdHJpbmdcbiAgcGF0aG5hbWU6IHN0cmluZ1xufSB7XG4gIGxldCBkZXRlY3RlZExvY2FsZTogc3RyaW5nIHwgdW5kZWZpbmVkXG4gIC8vIGZpcnN0IGl0ZW0gd2lsbCBiZSBlbXB0eSBzdHJpbmcgZnJvbSBzcGxpdHRpbmcgYXQgZmlyc3QgY2hhclxuICBjb25zdCBwYXRobmFtZVBhcnRzID0gcGF0aG5hbWUuc3BsaXQoJy8nKVxuXG4gIDsobG9jYWxlcyB8fCBbXSkuc29tZSgobG9jYWxlKSA9PiB7XG4gICAgaWYgKHBhdGhuYW1lUGFydHNbMV0udG9Mb3dlckNhc2UoKSA9PT0gbG9jYWxlLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgIGRldGVjdGVkTG9jYWxlID0gbG9jYWxlXG4gICAgICBwYXRobmFtZVBhcnRzLnNwbGljZSgxLCAxKVxuICAgICAgcGF0aG5hbWUgPSBwYXRobmFtZVBhcnRzLmpvaW4oJy8nKSB8fCAnLydcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICAgIHJldHVybiBmYWxzZVxuICB9KVxuXG4gIHJldHVybiB7XG4gICAgcGF0aG5hbWUsXG4gICAgZGV0ZWN0ZWRMb2NhbGUsXG4gIH1cbn1cbiIsIi8qXG5NSVQgTGljZW5zZVxuXG5Db3B5cmlnaHQgKGMpIEphc29uIE1pbGxlciAoaHR0cHM6Ly9qYXNvbmZvcm1hdC5jb20vKVxuXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG5UaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG4qL1xuXG4vLyBUaGlzIGZpbGUgaXMgYmFzZWQgb24gaHR0cHM6Ly9naXRodWIuY29tL2RldmVsb3BpdC9taXR0L2Jsb2IvdjEuMS4zL3NyYy9pbmRleC5qc1xuLy8gSXQncyBiZWVuIGVkaXRlZCBmb3IgdGhlIG5lZWRzIG9mIHRoaXMgc2NyaXB0XG4vLyBTZWUgdGhlIExJQ0VOU0UgYXQgdGhlIHRvcCBvZiB0aGUgZmlsZVxuXG50eXBlIEhhbmRsZXIgPSAoLi4uZXZ0czogYW55W10pID0+IHZvaWRcblxuZXhwb3J0IHR5cGUgTWl0dEVtaXR0ZXIgPSB7XG4gIG9uKHR5cGU6IHN0cmluZywgaGFuZGxlcjogSGFuZGxlcik6IHZvaWRcbiAgb2ZmKHR5cGU6IHN0cmluZywgaGFuZGxlcjogSGFuZGxlcik6IHZvaWRcbiAgZW1pdCh0eXBlOiBzdHJpbmcsIC4uLmV2dHM6IGFueVtdKTogdm9pZFxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtaXR0KCk6IE1pdHRFbWl0dGVyIHtcbiAgY29uc3QgYWxsOiB7IFtzOiBzdHJpbmddOiBIYW5kbGVyW10gfSA9IE9iamVjdC5jcmVhdGUobnVsbClcblxuICByZXR1cm4ge1xuICAgIG9uKHR5cGU6IHN0cmluZywgaGFuZGxlcjogSGFuZGxlcikge1xuICAgICAgOyhhbGxbdHlwZV0gfHwgKGFsbFt0eXBlXSA9IFtdKSkucHVzaChoYW5kbGVyKVxuICAgIH0sXG5cbiAgICBvZmYodHlwZTogc3RyaW5nLCBoYW5kbGVyOiBIYW5kbGVyKSB7XG4gICAgICBpZiAoYWxsW3R5cGVdKSB7XG4gICAgICAgIGFsbFt0eXBlXS5zcGxpY2UoYWxsW3R5cGVdLmluZGV4T2YoaGFuZGxlcikgPj4+IDAsIDEpXG4gICAgICB9XG4gICAgfSxcblxuICAgIGVtaXQodHlwZTogc3RyaW5nLCAuLi5ldnRzOiBhbnlbXSkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGFycmF5LWNhbGxiYWNrLXJldHVyblxuICAgICAgOyhhbGxbdHlwZV0gfHwgW10pLnNsaWNlKCkubWFwKChoYW5kbGVyOiBIYW5kbGVyKSA9PiB7XG4gICAgICAgIGhhbmRsZXIoLi4uZXZ0cylcbiAgICAgIH0pXG4gICAgfSxcbiAgfVxufVxuIiwiLy8gdHNsaW50OmRpc2FibGU6bm8tY29uc29sZVxuaW1wb3J0IHsgUGFyc2VkVXJsUXVlcnkgfSBmcm9tICdxdWVyeXN0cmluZydcbmltcG9ydCB7IENvbXBvbmVudFR5cGUgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IFVybE9iamVjdCB9IGZyb20gJ3VybCdcbmltcG9ydCB7XG4gIG5vcm1hbGl6ZVBhdGhUcmFpbGluZ1NsYXNoLFxuICByZW1vdmVQYXRoVHJhaWxpbmdTbGFzaCxcbn0gZnJvbSAnLi4vLi4vLi4vY2xpZW50L25vcm1hbGl6ZS10cmFpbGluZy1zbGFzaCdcbmltcG9ydCB7IEdvb2RQYWdlQ2FjaGUsIFN0eWxlU2hlZXRUdXBsZSB9IGZyb20gJy4uLy4uLy4uL2NsaWVudC9wYWdlLWxvYWRlcidcbmltcG9ydCB7XG4gIGdldENsaWVudEJ1aWxkTWFuaWZlc3QsXG4gIGlzQXNzZXRFcnJvcixcbiAgbWFya0Fzc2V0RXJyb3IsXG59IGZyb20gJy4uLy4uLy4uL2NsaWVudC9yb3V0ZS1sb2FkZXInXG5pbXBvcnQgeyBEb21haW5Mb2NhbGVzIH0gZnJvbSAnLi4vLi4vc2VydmVyL2NvbmZpZydcbmltcG9ydCB7IGRlbm9ybWFsaXplUGFnZVBhdGggfSBmcm9tICcuLi8uLi9zZXJ2ZXIvZGVub3JtYWxpemUtcGFnZS1wYXRoJ1xuaW1wb3J0IHsgbm9ybWFsaXplTG9jYWxlUGF0aCB9IGZyb20gJy4uL2kxOG4vbm9ybWFsaXplLWxvY2FsZS1wYXRoJ1xuaW1wb3J0IG1pdHQsIHsgTWl0dEVtaXR0ZXIgfSBmcm9tICcuLi9taXR0J1xuaW1wb3J0IHtcbiAgQXBwQ29udGV4dFR5cGUsXG4gIGZvcm1hdFdpdGhWYWxpZGF0aW9uLFxuICBnZXRMb2NhdGlvbk9yaWdpbixcbiAgZ2V0VVJMLFxuICBsb2FkR2V0SW5pdGlhbFByb3BzLFxuICBOZXh0UGFnZUNvbnRleHQsXG4gIFNULFxuICBORVhUX0RBVEEsXG59IGZyb20gJy4uL3V0aWxzJ1xuaW1wb3J0IHsgaXNEeW5hbWljUm91dGUgfSBmcm9tICcuL3V0aWxzL2lzLWR5bmFtaWMnXG5pbXBvcnQgeyBwYXJzZVJlbGF0aXZlVXJsIH0gZnJvbSAnLi91dGlscy9wYXJzZS1yZWxhdGl2ZS11cmwnXG5pbXBvcnQgeyBzZWFyY2hQYXJhbXNUb1VybFF1ZXJ5IH0gZnJvbSAnLi91dGlscy9xdWVyeXN0cmluZydcbmltcG9ydCByZXNvbHZlUmV3cml0ZXMgZnJvbSAnLi91dGlscy9yZXNvbHZlLXJld3JpdGVzJ1xuaW1wb3J0IHsgZ2V0Um91dGVNYXRjaGVyIH0gZnJvbSAnLi91dGlscy9yb3V0ZS1tYXRjaGVyJ1xuaW1wb3J0IHsgZ2V0Um91dGVSZWdleCB9IGZyb20gJy4vdXRpbHMvcm91dGUtcmVnZXgnXG5cbmRlY2xhcmUgZ2xvYmFsIHtcbiAgaW50ZXJmYWNlIFdpbmRvdyB7XG4gICAgLyogcHJvZCAqL1xuICAgIF9fTkVYVF9EQVRBX186IE5FWFRfREFUQVxuICB9XG59XG5cbmludGVyZmFjZSBSb3V0ZVByb3BlcnRpZXMge1xuICBzaGFsbG93OiBib29sZWFuXG59XG5cbmludGVyZmFjZSBUcmFuc2l0aW9uT3B0aW9ucyB7XG4gIHNoYWxsb3c/OiBib29sZWFuXG4gIGxvY2FsZT86IHN0cmluZyB8IGZhbHNlXG4gIHNjcm9sbD86IGJvb2xlYW5cbn1cblxuaW50ZXJmYWNlIE5leHRIaXN0b3J5U3RhdGUge1xuICB1cmw6IHN0cmluZ1xuICBhczogc3RyaW5nXG4gIG9wdGlvbnM6IFRyYW5zaXRpb25PcHRpb25zXG59XG5cbnR5cGUgSGlzdG9yeVN0YXRlID1cbiAgfCBudWxsXG4gIHwgeyBfX046IGZhbHNlIH1cbiAgfCAoeyBfX046IHRydWU7IGlkeDogbnVtYmVyIH0gJiBOZXh0SGlzdG9yeVN0YXRlKVxuXG5sZXQgZGV0ZWN0RG9tYWluTG9jYWxlOiB0eXBlb2YgaW1wb3J0KCcuLi9pMThuL2RldGVjdC1kb21haW4tbG9jYWxlJykuZGV0ZWN0RG9tYWluTG9jYWxlXG5cbmlmIChwcm9jZXNzLmVudi5fX05FWFRfSTE4Tl9TVVBQT1JUKSB7XG4gIGRldGVjdERvbWFpbkxvY2FsZSA9IHJlcXVpcmUoJy4uL2kxOG4vZGV0ZWN0LWRvbWFpbi1sb2NhbGUnKVxuICAgIC5kZXRlY3REb21haW5Mb2NhbGVcbn1cblxuY29uc3QgYmFzZVBhdGggPSAocHJvY2Vzcy5lbnYuX19ORVhUX1JPVVRFUl9CQVNFUEFUSCBhcyBzdHJpbmcpIHx8ICcnXG5cbmZ1bmN0aW9uIGJ1aWxkQ2FuY2VsbGF0aW9uRXJyb3IoKSB7XG4gIHJldHVybiBPYmplY3QuYXNzaWduKG5ldyBFcnJvcignUm91dGUgQ2FuY2VsbGVkJyksIHtcbiAgICBjYW5jZWxsZWQ6IHRydWUsXG4gIH0pXG59XG5cbmZ1bmN0aW9uIGFkZFBhdGhQcmVmaXgocGF0aDogc3RyaW5nLCBwcmVmaXg/OiBzdHJpbmcpIHtcbiAgcmV0dXJuIHByZWZpeCAmJiBwYXRoLnN0YXJ0c1dpdGgoJy8nKVxuICAgID8gcGF0aCA9PT0gJy8nXG4gICAgICA/IG5vcm1hbGl6ZVBhdGhUcmFpbGluZ1NsYXNoKHByZWZpeClcbiAgICAgIDogYCR7cHJlZml4fSR7cGF0aE5vUXVlcnlIYXNoKHBhdGgpID09PSAnLycgPyBwYXRoLnN1YnN0cmluZygxKSA6IHBhdGh9YFxuICAgIDogcGF0aFxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RG9tYWluTG9jYWxlKFxuICBwYXRoOiBzdHJpbmcsXG4gIGxvY2FsZT86IHN0cmluZyB8IGZhbHNlLFxuICBsb2NhbGVzPzogc3RyaW5nW10sXG4gIGRvbWFpbkxvY2FsZXM/OiBEb21haW5Mb2NhbGVzXG4pIHtcbiAgaWYgKHByb2Nlc3MuZW52Ll9fTkVYVF9JMThOX1NVUFBPUlQpIHtcbiAgICBsb2NhbGUgPSBsb2NhbGUgfHwgbm9ybWFsaXplTG9jYWxlUGF0aChwYXRoLCBsb2NhbGVzKS5kZXRlY3RlZExvY2FsZVxuXG4gICAgY29uc3QgZGV0ZWN0ZWREb21haW4gPSBkZXRlY3REb21haW5Mb2NhbGUoZG9tYWluTG9jYWxlcywgdW5kZWZpbmVkLCBsb2NhbGUpXG5cbiAgICBpZiAoZGV0ZWN0ZWREb21haW4pIHtcbiAgICAgIHJldHVybiBgaHR0cCR7ZGV0ZWN0ZWREb21haW4uaHR0cCA/ICcnIDogJ3MnfTovLyR7ZGV0ZWN0ZWREb21haW4uZG9tYWlufSR7XG4gICAgICAgIGJhc2VQYXRoIHx8ICcnXG4gICAgICB9JHtsb2NhbGUgPT09IGRldGVjdGVkRG9tYWluLmRlZmF1bHRMb2NhbGUgPyAnJyA6IGAvJHtsb2NhbGV9YH0ke3BhdGh9YFxuICAgIH1cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIHJldHVybiBmYWxzZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkTG9jYWxlKFxuICBwYXRoOiBzdHJpbmcsXG4gIGxvY2FsZT86IHN0cmluZyB8IGZhbHNlLFxuICBkZWZhdWx0TG9jYWxlPzogc3RyaW5nXG4pIHtcbiAgaWYgKHByb2Nlc3MuZW52Ll9fTkVYVF9JMThOX1NVUFBPUlQpIHtcbiAgICBjb25zdCBwYXRobmFtZSA9IHBhdGhOb1F1ZXJ5SGFzaChwYXRoKVxuICAgIGNvbnN0IHBhdGhMb3dlciA9IHBhdGhuYW1lLnRvTG93ZXJDYXNlKClcbiAgICBjb25zdCBsb2NhbGVMb3dlciA9IGxvY2FsZSAmJiBsb2NhbGUudG9Mb3dlckNhc2UoKVxuXG4gICAgcmV0dXJuIGxvY2FsZSAmJlxuICAgICAgbG9jYWxlICE9PSBkZWZhdWx0TG9jYWxlICYmXG4gICAgICAhcGF0aExvd2VyLnN0YXJ0c1dpdGgoJy8nICsgbG9jYWxlTG93ZXIgKyAnLycpICYmXG4gICAgICBwYXRoTG93ZXIgIT09ICcvJyArIGxvY2FsZUxvd2VyXG4gICAgICA/IGFkZFBhdGhQcmVmaXgocGF0aCwgJy8nICsgbG9jYWxlKVxuICAgICAgOiBwYXRoXG4gIH1cbiAgcmV0dXJuIHBhdGhcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlbExvY2FsZShwYXRoOiBzdHJpbmcsIGxvY2FsZT86IHN0cmluZykge1xuICBpZiAocHJvY2Vzcy5lbnYuX19ORVhUX0kxOE5fU1VQUE9SVCkge1xuICAgIGNvbnN0IHBhdGhuYW1lID0gcGF0aE5vUXVlcnlIYXNoKHBhdGgpXG4gICAgY29uc3QgcGF0aExvd2VyID0gcGF0aG5hbWUudG9Mb3dlckNhc2UoKVxuICAgIGNvbnN0IGxvY2FsZUxvd2VyID0gbG9jYWxlICYmIGxvY2FsZS50b0xvd2VyQ2FzZSgpXG5cbiAgICByZXR1cm4gbG9jYWxlICYmXG4gICAgICAocGF0aExvd2VyLnN0YXJ0c1dpdGgoJy8nICsgbG9jYWxlTG93ZXIgKyAnLycpIHx8XG4gICAgICAgIHBhdGhMb3dlciA9PT0gJy8nICsgbG9jYWxlTG93ZXIpXG4gICAgICA/IChwYXRobmFtZS5sZW5ndGggPT09IGxvY2FsZS5sZW5ndGggKyAxID8gJy8nIDogJycpICtcbiAgICAgICAgICBwYXRoLnN1YnN0cihsb2NhbGUubGVuZ3RoICsgMSlcbiAgICAgIDogcGF0aFxuICB9XG4gIHJldHVybiBwYXRoXG59XG5cbmZ1bmN0aW9uIHBhdGhOb1F1ZXJ5SGFzaChwYXRoOiBzdHJpbmcpIHtcbiAgY29uc3QgcXVlcnlJbmRleCA9IHBhdGguaW5kZXhPZignPycpXG4gIGNvbnN0IGhhc2hJbmRleCA9IHBhdGguaW5kZXhPZignIycpXG5cbiAgaWYgKHF1ZXJ5SW5kZXggPiAtMSB8fCBoYXNoSW5kZXggPiAtMSkge1xuICAgIHBhdGggPSBwYXRoLnN1YnN0cmluZygwLCBxdWVyeUluZGV4ID4gLTEgPyBxdWVyeUluZGV4IDogaGFzaEluZGV4KVxuICB9XG4gIHJldHVybiBwYXRoXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoYXNCYXNlUGF0aChwYXRoOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgcGF0aCA9IHBhdGhOb1F1ZXJ5SGFzaChwYXRoKVxuICByZXR1cm4gcGF0aCA9PT0gYmFzZVBhdGggfHwgcGF0aC5zdGFydHNXaXRoKGJhc2VQYXRoICsgJy8nKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkQmFzZVBhdGgocGF0aDogc3RyaW5nKTogc3RyaW5nIHtcbiAgLy8gd2Ugb25seSBhZGQgdGhlIGJhc2VwYXRoIG9uIHJlbGF0aXZlIHVybHNcbiAgcmV0dXJuIGFkZFBhdGhQcmVmaXgocGF0aCwgYmFzZVBhdGgpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWxCYXNlUGF0aChwYXRoOiBzdHJpbmcpOiBzdHJpbmcge1xuICBwYXRoID0gcGF0aC5zbGljZShiYXNlUGF0aC5sZW5ndGgpXG4gIGlmICghcGF0aC5zdGFydHNXaXRoKCcvJykpIHBhdGggPSBgLyR7cGF0aH1gXG4gIHJldHVybiBwYXRoXG59XG5cbi8qKlxuICogRGV0ZWN0cyB3aGV0aGVyIGEgZ2l2ZW4gdXJsIGlzIHJvdXRhYmxlIGJ5IHRoZSBOZXh0LmpzIHJvdXRlciAoYnJvd3NlciBvbmx5KS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzTG9jYWxVUkwodXJsOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgLy8gcHJldmVudCBhIGh5ZHJhdGlvbiBtaXNtYXRjaCBvbiBocmVmIGZvciB1cmwgd2l0aCBhbmNob3IgcmVmc1xuICBpZiAodXJsLnN0YXJ0c1dpdGgoJy8nKSB8fCB1cmwuc3RhcnRzV2l0aCgnIycpKSByZXR1cm4gdHJ1ZVxuICB0cnkge1xuICAgIC8vIGFic29sdXRlIHVybHMgY2FuIGJlIGxvY2FsIGlmIHRoZXkgYXJlIG9uIHRoZSBzYW1lIG9yaWdpblxuICAgIGNvbnN0IGxvY2F0aW9uT3JpZ2luID0gZ2V0TG9jYXRpb25PcmlnaW4oKVxuICAgIGNvbnN0IHJlc29sdmVkID0gbmV3IFVSTCh1cmwsIGxvY2F0aW9uT3JpZ2luKVxuICAgIHJldHVybiByZXNvbHZlZC5vcmlnaW4gPT09IGxvY2F0aW9uT3JpZ2luICYmIGhhc0Jhc2VQYXRoKHJlc29sdmVkLnBhdGhuYW1lKVxuICB9IGNhdGNoIChfKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxudHlwZSBVcmwgPSBVcmxPYmplY3QgfCBzdHJpbmdcblxuZXhwb3J0IGZ1bmN0aW9uIGludGVycG9sYXRlQXMoXG4gIHJvdXRlOiBzdHJpbmcsXG4gIGFzUGF0aG5hbWU6IHN0cmluZyxcbiAgcXVlcnk6IFBhcnNlZFVybFF1ZXJ5XG4pIHtcbiAgbGV0IGludGVycG9sYXRlZFJvdXRlID0gJydcblxuICBjb25zdCBkeW5hbWljUmVnZXggPSBnZXRSb3V0ZVJlZ2V4KHJvdXRlKVxuICBjb25zdCBkeW5hbWljR3JvdXBzID0gZHluYW1pY1JlZ2V4Lmdyb3Vwc1xuICBjb25zdCBkeW5hbWljTWF0Y2hlcyA9XG4gICAgLy8gVHJ5IHRvIG1hdGNoIHRoZSBkeW5hbWljIHJvdXRlIGFnYWluc3QgdGhlIGFzUGF0aFxuICAgIChhc1BhdGhuYW1lICE9PSByb3V0ZSA/IGdldFJvdXRlTWF0Y2hlcihkeW5hbWljUmVnZXgpKGFzUGF0aG5hbWUpIDogJycpIHx8XG4gICAgLy8gRmFsbCBiYWNrIHRvIHJlYWRpbmcgdGhlIHZhbHVlcyBmcm9tIHRoZSBocmVmXG4gICAgLy8gVE9ETzogc2hvdWxkIHRoaXMgdGFrZSBwcmlvcml0eTsgYWxzbyBuZWVkIHRvIGNoYW5nZSBpbiB0aGUgcm91dGVyLlxuICAgIHF1ZXJ5XG5cbiAgaW50ZXJwb2xhdGVkUm91dGUgPSByb3V0ZVxuICBjb25zdCBwYXJhbXMgPSBPYmplY3Qua2V5cyhkeW5hbWljR3JvdXBzKVxuXG4gIGlmIChcbiAgICAhcGFyYW1zLmV2ZXJ5KChwYXJhbSkgPT4ge1xuICAgICAgbGV0IHZhbHVlID0gZHluYW1pY01hdGNoZXNbcGFyYW1dIHx8ICcnXG4gICAgICBjb25zdCB7IHJlcGVhdCwgb3B0aW9uYWwgfSA9IGR5bmFtaWNHcm91cHNbcGFyYW1dXG5cbiAgICAgIC8vIHN1cHBvcnQgc2luZ2xlLWxldmVsIGNhdGNoLWFsbFxuICAgICAgLy8gVE9ETzogbW9yZSByb2J1c3QgaGFuZGxpbmcgZm9yIHVzZXItZXJyb3IgKHBhc3NpbmcgYC9gKVxuICAgICAgbGV0IHJlcGxhY2VkID0gYFske3JlcGVhdCA/ICcuLi4nIDogJyd9JHtwYXJhbX1dYFxuICAgICAgaWYgKG9wdGlvbmFsKSB7XG4gICAgICAgIHJlcGxhY2VkID0gYCR7IXZhbHVlID8gJy8nIDogJyd9WyR7cmVwbGFjZWR9XWBcbiAgICAgIH1cbiAgICAgIGlmIChyZXBlYXQgJiYgIUFycmF5LmlzQXJyYXkodmFsdWUpKSB2YWx1ZSA9IFt2YWx1ZV1cblxuICAgICAgcmV0dXJuIChcbiAgICAgICAgKG9wdGlvbmFsIHx8IHBhcmFtIGluIGR5bmFtaWNNYXRjaGVzKSAmJlxuICAgICAgICAvLyBJbnRlcnBvbGF0ZSBncm91cCBpbnRvIGRhdGEgVVJMIGlmIHByZXNlbnRcbiAgICAgICAgKGludGVycG9sYXRlZFJvdXRlID1cbiAgICAgICAgICBpbnRlcnBvbGF0ZWRSb3V0ZSEucmVwbGFjZShcbiAgICAgICAgICAgIHJlcGxhY2VkLFxuICAgICAgICAgICAgcmVwZWF0XG4gICAgICAgICAgICAgID8gKHZhbHVlIGFzIHN0cmluZ1tdKVxuICAgICAgICAgICAgICAgICAgLm1hcChcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhlc2UgdmFsdWVzIHNob3VsZCBiZSBmdWxseSBlbmNvZGVkIGluc3RlYWQgb2YganVzdFxuICAgICAgICAgICAgICAgICAgICAvLyBwYXRoIGRlbGltaXRlciBlc2NhcGVkIHNpbmNlIHRoZXkgYXJlIGJlaW5nIGluc2VydGVkXG4gICAgICAgICAgICAgICAgICAgIC8vIGludG8gdGhlIFVSTCBhbmQgd2UgZXhwZWN0IFVSTCBlbmNvZGVkIHNlZ21lbnRzXG4gICAgICAgICAgICAgICAgICAgIC8vIHdoZW4gcGFyc2luZyBkeW5hbWljIHJvdXRlIHBhcmFtc1xuICAgICAgICAgICAgICAgICAgICAoc2VnbWVudCkgPT4gZW5jb2RlVVJJQ29tcG9uZW50KHNlZ21lbnQpXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAuam9pbignLycpXG4gICAgICAgICAgICAgIDogZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlIGFzIHN0cmluZylcbiAgICAgICAgICApIHx8ICcvJylcbiAgICAgIClcbiAgICB9KVxuICApIHtcbiAgICBpbnRlcnBvbGF0ZWRSb3V0ZSA9ICcnIC8vIGRpZCBub3Qgc2F0aXNmeSBhbGwgcmVxdWlyZW1lbnRzXG5cbiAgICAvLyBuLmIuIFdlIGlnbm9yZSB0aGlzIGVycm9yIGJlY2F1c2Ugd2UgaGFuZGxlIHdhcm5pbmcgZm9yIHRoaXMgY2FzZSBpblxuICAgIC8vIGRldmVsb3BtZW50IGluIHRoZSBgPExpbms+YCBjb21wb25lbnQgZGlyZWN0bHkuXG4gIH1cbiAgcmV0dXJuIHtcbiAgICBwYXJhbXMsXG4gICAgcmVzdWx0OiBpbnRlcnBvbGF0ZWRSb3V0ZSxcbiAgfVxufVxuXG5mdW5jdGlvbiBvbWl0UGFybXNGcm9tUXVlcnkocXVlcnk6IFBhcnNlZFVybFF1ZXJ5LCBwYXJhbXM6IHN0cmluZ1tdKSB7XG4gIGNvbnN0IGZpbHRlcmVkUXVlcnk6IFBhcnNlZFVybFF1ZXJ5ID0ge31cblxuICBPYmplY3Qua2V5cyhxdWVyeSkuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgaWYgKCFwYXJhbXMuaW5jbHVkZXMoa2V5KSkge1xuICAgICAgZmlsdGVyZWRRdWVyeVtrZXldID0gcXVlcnlba2V5XVxuICAgIH1cbiAgfSlcbiAgcmV0dXJuIGZpbHRlcmVkUXVlcnlcbn1cblxuLyoqXG4gKiBSZXNvbHZlcyBhIGdpdmVuIGh5cGVybGluayB3aXRoIGEgY2VydGFpbiByb3V0ZXIgc3RhdGUgKGJhc2VQYXRoIG5vdCBpbmNsdWRlZCkuXG4gKiBQcmVzZXJ2ZXMgYWJzb2x1dGUgdXJscy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlc29sdmVIcmVmKFxuICBjdXJyZW50UGF0aDogc3RyaW5nLFxuICBocmVmOiBVcmwsXG4gIHJlc29sdmVBcz86IGJvb2xlYW5cbik6IHN0cmluZyB7XG4gIC8vIHdlIHVzZSBhIGR1bW15IGJhc2UgdXJsIGZvciByZWxhdGl2ZSB1cmxzXG4gIGxldCBiYXNlOiBVUkxcblxuICB0cnkge1xuICAgIGJhc2UgPSBuZXcgVVJMKGN1cnJlbnRQYXRoLCAnaHR0cDovL24nKVxuICB9IGNhdGNoIChfKSB7XG4gICAgLy8gZmFsbGJhY2sgdG8gLyBmb3IgaW52YWxpZCBhc1BhdGggdmFsdWVzIGUuZy4gLy9cbiAgICBiYXNlID0gbmV3IFVSTCgnLycsICdodHRwOi8vbicpXG4gIH1cbiAgY29uc3QgdXJsQXNTdHJpbmcgPVxuICAgIHR5cGVvZiBocmVmID09PSAnc3RyaW5nJyA/IGhyZWYgOiBmb3JtYXRXaXRoVmFsaWRhdGlvbihocmVmKVxuICAvLyBSZXR1cm4gYmVjYXVzZSBpdCBjYW5ub3QgYmUgcm91dGVkIGJ5IHRoZSBOZXh0LmpzIHJvdXRlclxuICBpZiAoIWlzTG9jYWxVUkwodXJsQXNTdHJpbmcpKSB7XG4gICAgcmV0dXJuIChyZXNvbHZlQXMgPyBbdXJsQXNTdHJpbmddIDogdXJsQXNTdHJpbmcpIGFzIHN0cmluZ1xuICB9XG4gIHRyeSB7XG4gICAgY29uc3QgZmluYWxVcmwgPSBuZXcgVVJMKHVybEFzU3RyaW5nLCBiYXNlKVxuICAgIGZpbmFsVXJsLnBhdGhuYW1lID0gbm9ybWFsaXplUGF0aFRyYWlsaW5nU2xhc2goZmluYWxVcmwucGF0aG5hbWUpXG4gICAgbGV0IGludGVycG9sYXRlZEFzID0gJydcblxuICAgIGlmIChcbiAgICAgIGlzRHluYW1pY1JvdXRlKGZpbmFsVXJsLnBhdGhuYW1lKSAmJlxuICAgICAgZmluYWxVcmwuc2VhcmNoUGFyYW1zICYmXG4gICAgICByZXNvbHZlQXNcbiAgICApIHtcbiAgICAgIGNvbnN0IHF1ZXJ5ID0gc2VhcmNoUGFyYW1zVG9VcmxRdWVyeShmaW5hbFVybC5zZWFyY2hQYXJhbXMpXG5cbiAgICAgIGNvbnN0IHsgcmVzdWx0LCBwYXJhbXMgfSA9IGludGVycG9sYXRlQXMoXG4gICAgICAgIGZpbmFsVXJsLnBhdGhuYW1lLFxuICAgICAgICBmaW5hbFVybC5wYXRobmFtZSxcbiAgICAgICAgcXVlcnlcbiAgICAgIClcblxuICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICBpbnRlcnBvbGF0ZWRBcyA9IGZvcm1hdFdpdGhWYWxpZGF0aW9uKHtcbiAgICAgICAgICBwYXRobmFtZTogcmVzdWx0LFxuICAgICAgICAgIGhhc2g6IGZpbmFsVXJsLmhhc2gsXG4gICAgICAgICAgcXVlcnk6IG9taXRQYXJtc0Zyb21RdWVyeShxdWVyeSwgcGFyYW1zKSxcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBpZiB0aGUgb3JpZ2luIGRpZG4ndCBjaGFuZ2UsIGl0IG1lYW5zIHdlIHJlY2VpdmVkIGEgcmVsYXRpdmUgaHJlZlxuICAgIGNvbnN0IHJlc29sdmVkSHJlZiA9XG4gICAgICBmaW5hbFVybC5vcmlnaW4gPT09IGJhc2Uub3JpZ2luXG4gICAgICAgID8gZmluYWxVcmwuaHJlZi5zbGljZShmaW5hbFVybC5vcmlnaW4ubGVuZ3RoKVxuICAgICAgICA6IGZpbmFsVXJsLmhyZWZcblxuICAgIHJldHVybiAocmVzb2x2ZUFzXG4gICAgICA/IFtyZXNvbHZlZEhyZWYsIGludGVycG9sYXRlZEFzIHx8IHJlc29sdmVkSHJlZl1cbiAgICAgIDogcmVzb2x2ZWRIcmVmKSBhcyBzdHJpbmdcbiAgfSBjYXRjaCAoXykge1xuICAgIHJldHVybiAocmVzb2x2ZUFzID8gW3VybEFzU3RyaW5nXSA6IHVybEFzU3RyaW5nKSBhcyBzdHJpbmdcbiAgfVxufVxuXG5mdW5jdGlvbiBzdHJpcE9yaWdpbih1cmw6IHN0cmluZykge1xuICBjb25zdCBvcmlnaW4gPSBnZXRMb2NhdGlvbk9yaWdpbigpXG5cbiAgcmV0dXJuIHVybC5zdGFydHNXaXRoKG9yaWdpbikgPyB1cmwuc3Vic3RyaW5nKG9yaWdpbi5sZW5ndGgpIDogdXJsXG59XG5cbmZ1bmN0aW9uIHByZXBhcmVVcmxBcyhyb3V0ZXI6IE5leHRSb3V0ZXIsIHVybDogVXJsLCBhcz86IFVybCkge1xuICAvLyBJZiB1cmwgYW5kIGFzIHByb3ZpZGVkIGFzIGFuIG9iamVjdCByZXByZXNlbnRhdGlvbixcbiAgLy8gd2UnbGwgZm9ybWF0IHRoZW0gaW50byB0aGUgc3RyaW5nIHZlcnNpb24gaGVyZS5cbiAgbGV0IFtyZXNvbHZlZEhyZWYsIHJlc29sdmVkQXNdID0gcmVzb2x2ZUhyZWYocm91dGVyLmFzUGF0aCwgdXJsLCB0cnVlKVxuICBjb25zdCBvcmlnaW4gPSBnZXRMb2NhdGlvbk9yaWdpbigpXG4gIGNvbnN0IGhyZWZIYWRPcmlnaW4gPSByZXNvbHZlZEhyZWYuc3RhcnRzV2l0aChvcmlnaW4pXG4gIGNvbnN0IGFzSGFkT3JpZ2luID0gcmVzb2x2ZWRBcyAmJiByZXNvbHZlZEFzLnN0YXJ0c1dpdGgob3JpZ2luKVxuXG4gIHJlc29sdmVkSHJlZiA9IHN0cmlwT3JpZ2luKHJlc29sdmVkSHJlZilcbiAgcmVzb2x2ZWRBcyA9IHJlc29sdmVkQXMgPyBzdHJpcE9yaWdpbihyZXNvbHZlZEFzKSA6IHJlc29sdmVkQXNcblxuICBjb25zdCBwcmVwYXJlZFVybCA9IGhyZWZIYWRPcmlnaW4gPyByZXNvbHZlZEhyZWYgOiBhZGRCYXNlUGF0aChyZXNvbHZlZEhyZWYpXG4gIGNvbnN0IHByZXBhcmVkQXMgPSBhc1xuICAgID8gc3RyaXBPcmlnaW4ocmVzb2x2ZUhyZWYocm91dGVyLmFzUGF0aCwgYXMpKVxuICAgIDogcmVzb2x2ZWRBcyB8fCByZXNvbHZlZEhyZWZcblxuICByZXR1cm4ge1xuICAgIHVybDogcHJlcGFyZWRVcmwsXG4gICAgYXM6IGFzSGFkT3JpZ2luID8gcHJlcGFyZWRBcyA6IGFkZEJhc2VQYXRoKHByZXBhcmVkQXMpLFxuICB9XG59XG5cbmZ1bmN0aW9uIHJlc29sdmVEeW5hbWljUm91dGUocGF0aG5hbWU6IHN0cmluZywgcGFnZXM6IHN0cmluZ1tdKSB7XG4gIGNvbnN0IGNsZWFuUGF0aG5hbWUgPSByZW1vdmVQYXRoVHJhaWxpbmdTbGFzaChkZW5vcm1hbGl6ZVBhZ2VQYXRoKHBhdGhuYW1lISkpXG5cbiAgaWYgKGNsZWFuUGF0aG5hbWUgPT09ICcvNDA0JyB8fCBjbGVhblBhdGhuYW1lID09PSAnL19lcnJvcicpIHtcbiAgICByZXR1cm4gcGF0aG5hbWVcbiAgfVxuXG4gIC8vIGhhbmRsZSByZXNvbHZpbmcgaHJlZiBmb3IgZHluYW1pYyByb3V0ZXNcbiAgaWYgKCFwYWdlcy5pbmNsdWRlcyhjbGVhblBhdGhuYW1lISkpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgYXJyYXktY2FsbGJhY2stcmV0dXJuXG4gICAgcGFnZXMuc29tZSgocGFnZSkgPT4ge1xuICAgICAgaWYgKGlzRHluYW1pY1JvdXRlKHBhZ2UpICYmIGdldFJvdXRlUmVnZXgocGFnZSkucmUudGVzdChjbGVhblBhdGhuYW1lISkpIHtcbiAgICAgICAgcGF0aG5hbWUgPSBwYWdlXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG4gICAgfSlcbiAgfVxuICByZXR1cm4gcmVtb3ZlUGF0aFRyYWlsaW5nU2xhc2gocGF0aG5hbWUpXG59XG5cbmV4cG9ydCB0eXBlIEJhc2VSb3V0ZXIgPSB7XG4gIHJvdXRlOiBzdHJpbmdcbiAgcGF0aG5hbWU6IHN0cmluZ1xuICBxdWVyeTogUGFyc2VkVXJsUXVlcnlcbiAgYXNQYXRoOiBzdHJpbmdcbiAgYmFzZVBhdGg6IHN0cmluZ1xuICBsb2NhbGU/OiBzdHJpbmdcbiAgbG9jYWxlcz86IHN0cmluZ1tdXG4gIGRlZmF1bHRMb2NhbGU/OiBzdHJpbmdcbiAgZG9tYWluTG9jYWxlcz86IERvbWFpbkxvY2FsZXNcbiAgaXNMb2NhbGVEb21haW46IGJvb2xlYW5cbn1cblxuZXhwb3J0IHR5cGUgTmV4dFJvdXRlciA9IEJhc2VSb3V0ZXIgJlxuICBQaWNrPFxuICAgIFJvdXRlcixcbiAgICB8ICdwdXNoJ1xuICAgIHwgJ3JlcGxhY2UnXG4gICAgfCAncmVsb2FkJ1xuICAgIHwgJ2JhY2snXG4gICAgfCAncHJlZmV0Y2gnXG4gICAgfCAnYmVmb3JlUG9wU3RhdGUnXG4gICAgfCAnZXZlbnRzJ1xuICAgIHwgJ2lzRmFsbGJhY2snXG4gICAgfCAnaXNSZWFkeSdcbiAgICB8ICdpc1ByZXZpZXcnXG4gID5cblxuZXhwb3J0IHR5cGUgUHJlZmV0Y2hPcHRpb25zID0ge1xuICBwcmlvcml0eT86IGJvb2xlYW5cbiAgbG9jYWxlPzogc3RyaW5nIHwgZmFsc2Vcbn1cblxuZXhwb3J0IHR5cGUgUHJpdmF0ZVJvdXRlSW5mbyA9XG4gIHwgKE9taXQ8Q29tcGxldGVQcml2YXRlUm91dGVJbmZvLCAnc3R5bGVTaGVldHMnPiAmIHsgaW5pdGlhbDogdHJ1ZSB9KVxuICB8IENvbXBsZXRlUHJpdmF0ZVJvdXRlSW5mb1xuXG5leHBvcnQgdHlwZSBDb21wbGV0ZVByaXZhdGVSb3V0ZUluZm8gPSB7XG4gIENvbXBvbmVudDogQ29tcG9uZW50VHlwZVxuICBzdHlsZVNoZWV0czogU3R5bGVTaGVldFR1cGxlW11cbiAgX19OX1NTRz86IGJvb2xlYW5cbiAgX19OX1NTUD86IGJvb2xlYW5cbiAgcHJvcHM/OiBSZWNvcmQ8c3RyaW5nLCBhbnk+XG4gIGVycj86IEVycm9yXG4gIGVycm9yPzogYW55XG59XG5cbmV4cG9ydCB0eXBlIEFwcFByb3BzID0gUGljazxDb21wbGV0ZVByaXZhdGVSb3V0ZUluZm8sICdDb21wb25lbnQnIHwgJ2Vycic+ICYge1xuICByb3V0ZXI6IFJvdXRlclxufSAmIFJlY29yZDxzdHJpbmcsIGFueT5cbmV4cG9ydCB0eXBlIEFwcENvbXBvbmVudCA9IENvbXBvbmVudFR5cGU8QXBwUHJvcHM+XG5cbnR5cGUgU3Vic2NyaXB0aW9uID0gKFxuICBkYXRhOiBQcml2YXRlUm91dGVJbmZvLFxuICBBcHA6IEFwcENvbXBvbmVudCxcbiAgcmVzZXRTY3JvbGw6IHsgeDogbnVtYmVyOyB5OiBudW1iZXIgfSB8IG51bGxcbikgPT4gUHJvbWlzZTx2b2lkPlxuXG50eXBlIEJlZm9yZVBvcFN0YXRlQ2FsbGJhY2sgPSAoc3RhdGU6IE5leHRIaXN0b3J5U3RhdGUpID0+IGJvb2xlYW5cblxudHlwZSBDb21wb25lbnRMb2FkQ2FuY2VsID0gKCgpID0+IHZvaWQpIHwgbnVsbFxuXG50eXBlIEhpc3RvcnlNZXRob2QgPSAncmVwbGFjZVN0YXRlJyB8ICdwdXNoU3RhdGUnXG5cbmNvbnN0IG1hbnVhbFNjcm9sbFJlc3RvcmF0aW9uID1cbiAgcHJvY2Vzcy5lbnYuX19ORVhUX1NDUk9MTF9SRVNUT1JBVElPTiAmJlxuICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJlxuICAnc2Nyb2xsUmVzdG9yYXRpb24nIGluIHdpbmRvdy5oaXN0b3J5ICYmXG4gICEhKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgbGV0IHYgPSAnX19uZXh0J1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlcXVlbmNlc1xuICAgICAgcmV0dXJuIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0odiwgdiksIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0odiksIHRydWVcbiAgICB9IGNhdGNoIChuKSB7fVxuICB9KSgpXG5cbmNvbnN0IFNTR19EQVRBX05PVF9GT1VORCA9IFN5bWJvbCgnU1NHX0RBVEFfTk9UX0ZPVU5EJylcblxuZnVuY3Rpb24gZmV0Y2hSZXRyeSh1cmw6IHN0cmluZywgYXR0ZW1wdHM6IG51bWJlcik6IFByb21pc2U8YW55PiB7XG4gIHJldHVybiBmZXRjaCh1cmwsIHtcbiAgICAvLyBDb29raWVzIGFyZSByZXF1aXJlZCB0byBiZSBwcmVzZW50IGZvciBOZXh0LmpzJyBTU0cgXCJQcmV2aWV3IE1vZGVcIi5cbiAgICAvLyBDb29raWVzIG1heSBhbHNvIGJlIHJlcXVpcmVkIGZvciBgZ2V0U2VydmVyU2lkZVByb3BzYC5cbiAgICAvL1xuICAgIC8vID4gYGZldGNoYCB3b27igJl0IHNlbmQgY29va2llcywgdW5sZXNzIHlvdSBzZXQgdGhlIGNyZWRlbnRpYWxzIGluaXRcbiAgICAvLyA+IG9wdGlvbi5cbiAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvRmV0Y2hfQVBJL1VzaW5nX0ZldGNoXG4gICAgLy9cbiAgICAvLyA+IEZvciBtYXhpbXVtIGJyb3dzZXIgY29tcGF0aWJpbGl0eSB3aGVuIGl0IGNvbWVzIHRvIHNlbmRpbmcgJlxuICAgIC8vID4gcmVjZWl2aW5nIGNvb2tpZXMsIGFsd2F5cyBzdXBwbHkgdGhlIGBjcmVkZW50aWFsczogJ3NhbWUtb3JpZ2luJ2BcbiAgICAvLyA+IG9wdGlvbiBpbnN0ZWFkIG9mIHJlbHlpbmcgb24gdGhlIGRlZmF1bHQuXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2dpdGh1Yi9mZXRjaCNjYXZlYXRzXG4gICAgY3JlZGVudGlhbHM6ICdzYW1lLW9yaWdpbicsXG4gIH0pLnRoZW4oKHJlcykgPT4ge1xuICAgIGlmICghcmVzLm9rKSB7XG4gICAgICBpZiAoYXR0ZW1wdHMgPiAxICYmIHJlcy5zdGF0dXMgPj0gNTAwKSB7XG4gICAgICAgIHJldHVybiBmZXRjaFJldHJ5KHVybCwgYXR0ZW1wdHMgLSAxKVxuICAgICAgfVxuICAgICAgaWYgKHJlcy5zdGF0dXMgPT09IDQwNCkge1xuICAgICAgICByZXR1cm4gcmVzLmpzb24oKS50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgaWYgKGRhdGEubm90Rm91bmQpIHtcbiAgICAgICAgICAgIHJldHVybiB7IG5vdEZvdW5kOiBTU0dfREFUQV9OT1RfRk9VTkQgfVxuICAgICAgICAgIH1cbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEZhaWxlZCB0byBsb2FkIHN0YXRpYyBwcm9wc2ApXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEZhaWxlZCB0byBsb2FkIHN0YXRpYyBwcm9wc2ApXG4gICAgfVxuICAgIHJldHVybiByZXMuanNvbigpXG4gIH0pXG59XG5cbmZ1bmN0aW9uIGZldGNoTmV4dERhdGEoZGF0YUhyZWY6IHN0cmluZywgaXNTZXJ2ZXJSZW5kZXI6IGJvb2xlYW4pIHtcbiAgcmV0dXJuIGZldGNoUmV0cnkoZGF0YUhyZWYsIGlzU2VydmVyUmVuZGVyID8gMyA6IDEpLmNhdGNoKChlcnI6IEVycm9yKSA9PiB7XG4gICAgLy8gV2Ugc2hvdWxkIG9ubHkgdHJpZ2dlciBhIHNlcnZlci1zaWRlIHRyYW5zaXRpb24gaWYgdGhpcyB3YXMgY2F1c2VkXG4gICAgLy8gb24gYSBjbGllbnQtc2lkZSB0cmFuc2l0aW9uLiBPdGhlcndpc2UsIHdlJ2QgZ2V0IGludG8gYW4gaW5maW5pdGVcbiAgICAvLyBsb29wLlxuXG4gICAgaWYgKCFpc1NlcnZlclJlbmRlcikge1xuICAgICAgbWFya0Fzc2V0RXJyb3IoZXJyKVxuICAgIH1cbiAgICB0aHJvdyBlcnJcbiAgfSlcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm91dGVyIGltcGxlbWVudHMgQmFzZVJvdXRlciB7XG4gIHJvdXRlOiBzdHJpbmdcbiAgcGF0aG5hbWU6IHN0cmluZ1xuICBxdWVyeTogUGFyc2VkVXJsUXVlcnlcbiAgYXNQYXRoOiBzdHJpbmdcbiAgYmFzZVBhdGg6IHN0cmluZ1xuXG4gIC8qKlxuICAgKiBNYXAgb2YgYWxsIGNvbXBvbmVudHMgbG9hZGVkIGluIGBSb3V0ZXJgXG4gICAqL1xuICBjb21wb25lbnRzOiB7IFtwYXRobmFtZTogc3RyaW5nXTogUHJpdmF0ZVJvdXRlSW5mbyB9XG4gIC8vIFN0YXRpYyBEYXRhIENhY2hlXG4gIHNkYzogeyBbYXNQYXRoOiBzdHJpbmddOiBvYmplY3QgfSA9IHt9XG4gIC8vIEluLWZsaWdodCBTZXJ2ZXIgRGF0YSBSZXF1ZXN0cywgZm9yIGRlZHVwaW5nXG4gIHNkcjogeyBbYXNQYXRoOiBzdHJpbmddOiBQcm9taXNlPG9iamVjdD4gfSA9IHt9XG5cbiAgc3ViOiBTdWJzY3JpcHRpb25cbiAgY2xjOiBDb21wb25lbnRMb2FkQ2FuY2VsXG4gIHBhZ2VMb2FkZXI6IGFueVxuICBfYnBzOiBCZWZvcmVQb3BTdGF0ZUNhbGxiYWNrIHwgdW5kZWZpbmVkXG4gIGV2ZW50czogTWl0dEVtaXR0ZXJcbiAgX3dyYXBBcHA6IChBcHA6IEFwcENvbXBvbmVudCkgPT4gYW55XG4gIGlzU3NyOiBib29sZWFuXG4gIGlzRmFsbGJhY2s6IGJvb2xlYW5cbiAgX2luRmxpZ2h0Um91dGU/OiBzdHJpbmdcbiAgX3NoYWxsb3c/OiBib29sZWFuXG4gIGxvY2FsZT86IHN0cmluZ1xuICBsb2NhbGVzPzogc3RyaW5nW11cbiAgZGVmYXVsdExvY2FsZT86IHN0cmluZ1xuICBkb21haW5Mb2NhbGVzPzogRG9tYWluTG9jYWxlc1xuICBpc1JlYWR5OiBib29sZWFuXG4gIGlzUHJldmlldzogYm9vbGVhblxuICBpc0xvY2FsZURvbWFpbjogYm9vbGVhblxuXG4gIHByaXZhdGUgX2lkeDogbnVtYmVyID0gMFxuXG4gIHN0YXRpYyBldmVudHM6IE1pdHRFbWl0dGVyID0gbWl0dCgpXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcGF0aG5hbWU6IHN0cmluZyxcbiAgICBxdWVyeTogUGFyc2VkVXJsUXVlcnksXG4gICAgYXM6IHN0cmluZyxcbiAgICB7XG4gICAgICBpbml0aWFsUHJvcHMsXG4gICAgICBwYWdlTG9hZGVyLFxuICAgICAgQXBwLFxuICAgICAgd3JhcEFwcCxcbiAgICAgIENvbXBvbmVudCxcbiAgICAgIGVycixcbiAgICAgIHN1YnNjcmlwdGlvbixcbiAgICAgIGlzRmFsbGJhY2ssXG4gICAgICBsb2NhbGUsXG4gICAgICBsb2NhbGVzLFxuICAgICAgZGVmYXVsdExvY2FsZSxcbiAgICAgIGRvbWFpbkxvY2FsZXMsXG4gICAgICBpc1ByZXZpZXcsXG4gICAgfToge1xuICAgICAgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb25cbiAgICAgIGluaXRpYWxQcm9wczogYW55XG4gICAgICBwYWdlTG9hZGVyOiBhbnlcbiAgICAgIENvbXBvbmVudDogQ29tcG9uZW50VHlwZVxuICAgICAgQXBwOiBBcHBDb21wb25lbnRcbiAgICAgIHdyYXBBcHA6IChXcmFwQXBwQ29tcG9uZW50OiBBcHBDb21wb25lbnQpID0+IGFueVxuICAgICAgZXJyPzogRXJyb3JcbiAgICAgIGlzRmFsbGJhY2s6IGJvb2xlYW5cbiAgICAgIGxvY2FsZT86IHN0cmluZ1xuICAgICAgbG9jYWxlcz86IHN0cmluZ1tdXG4gICAgICBkZWZhdWx0TG9jYWxlPzogc3RyaW5nXG4gICAgICBkb21haW5Mb2NhbGVzPzogRG9tYWluTG9jYWxlc1xuICAgICAgaXNQcmV2aWV3PzogYm9vbGVhblxuICAgIH1cbiAgKSB7XG4gICAgLy8gcmVwcmVzZW50cyB0aGUgY3VycmVudCBjb21wb25lbnQga2V5XG4gICAgdGhpcy5yb3V0ZSA9IHJlbW92ZVBhdGhUcmFpbGluZ1NsYXNoKHBhdGhuYW1lKVxuXG4gICAgLy8gc2V0IHVwIHRoZSBjb21wb25lbnQgY2FjaGUgKGJ5IHJvdXRlIGtleXMpXG4gICAgdGhpcy5jb21wb25lbnRzID0ge31cbiAgICAvLyBXZSBzaG91bGQgbm90IGtlZXAgdGhlIGNhY2hlLCBpZiB0aGVyZSdzIGFuIGVycm9yXG4gICAgLy8gT3RoZXJ3aXNlLCB0aGlzIGNhdXNlIGlzc3VlcyB3aGVuIHdoZW4gZ29pbmcgYmFjayBhbmRcbiAgICAvLyBjb21lIGFnYWluIHRvIHRoZSBlcnJvcmVkIHBhZ2UuXG4gICAgaWYgKHBhdGhuYW1lICE9PSAnL19lcnJvcicpIHtcbiAgICAgIHRoaXMuY29tcG9uZW50c1t0aGlzLnJvdXRlXSA9IHtcbiAgICAgICAgQ29tcG9uZW50LFxuICAgICAgICBpbml0aWFsOiB0cnVlLFxuICAgICAgICBwcm9wczogaW5pdGlhbFByb3BzLFxuICAgICAgICBlcnIsXG4gICAgICAgIF9fTl9TU0c6IGluaXRpYWxQcm9wcyAmJiBpbml0aWFsUHJvcHMuX19OX1NTRyxcbiAgICAgICAgX19OX1NTUDogaW5pdGlhbFByb3BzICYmIGluaXRpYWxQcm9wcy5fX05fU1NQLFxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuY29tcG9uZW50c1snL19hcHAnXSA9IHtcbiAgICAgIENvbXBvbmVudDogQXBwIGFzIENvbXBvbmVudFR5cGUsXG4gICAgICBzdHlsZVNoZWV0czogW1xuICAgICAgICAvKiAvX2FwcCBkb2VzIG5vdCBuZWVkIGl0cyBzdHlsZXNoZWV0cyBtYW5hZ2VkICovXG4gICAgICBdLFxuICAgIH1cblxuICAgIC8vIEJhY2t3YXJkcyBjb21wYXQgZm9yIFJvdXRlci5yb3V0ZXIuZXZlbnRzXG4gICAgLy8gVE9ETzogU2hvdWxkIGJlIHJlbW92ZSB0aGUgZm9sbG93aW5nIG1ham9yIHZlcnNpb24gYXMgaXQgd2FzIG5ldmVyIGRvY3VtZW50ZWRcbiAgICB0aGlzLmV2ZW50cyA9IFJvdXRlci5ldmVudHNcblxuICAgIHRoaXMucGFnZUxvYWRlciA9IHBhZ2VMb2FkZXJcbiAgICB0aGlzLnBhdGhuYW1lID0gcGF0aG5hbWVcbiAgICB0aGlzLnF1ZXJ5ID0gcXVlcnlcbiAgICAvLyBpZiBhdXRvIHByZXJlbmRlcmVkIGFuZCBkeW5hbWljIHJvdXRlIHdhaXQgdG8gdXBkYXRlIGFzUGF0aFxuICAgIC8vIHVudGlsIGFmdGVyIG1vdW50IHRvIHByZXZlbnQgaHlkcmF0aW9uIG1pc21hdGNoXG4gICAgY29uc3QgYXV0b0V4cG9ydER5bmFtaWMgPVxuICAgICAgaXNEeW5hbWljUm91dGUocGF0aG5hbWUpICYmIHNlbGYuX19ORVhUX0RBVEFfXy5hdXRvRXhwb3J0XG5cbiAgICB0aGlzLmFzUGF0aCA9IGF1dG9FeHBvcnREeW5hbWljID8gcGF0aG5hbWUgOiBhc1xuICAgIHRoaXMuYmFzZVBhdGggPSBiYXNlUGF0aFxuICAgIHRoaXMuc3ViID0gc3Vic2NyaXB0aW9uXG4gICAgdGhpcy5jbGMgPSBudWxsXG4gICAgdGhpcy5fd3JhcEFwcCA9IHdyYXBBcHBcbiAgICAvLyBtYWtlIHN1cmUgdG8gaWdub3JlIGV4dHJhIHBvcFN0YXRlIGluIHNhZmFyaSBvbiBuYXZpZ2F0aW5nXG4gICAgLy8gYmFjayBmcm9tIGV4dGVybmFsIHNpdGVcbiAgICB0aGlzLmlzU3NyID0gdHJ1ZVxuXG4gICAgdGhpcy5pc0ZhbGxiYWNrID0gaXNGYWxsYmFja1xuXG4gICAgdGhpcy5pc1JlYWR5ID0gISEoXG4gICAgICBzZWxmLl9fTkVYVF9EQVRBX18uZ3NzcCB8fFxuICAgICAgc2VsZi5fX05FWFRfREFUQV9fLmdpcCB8fFxuICAgICAgKCFhdXRvRXhwb3J0RHluYW1pYyAmJlxuICAgICAgICAhc2VsZi5sb2NhdGlvbi5zZWFyY2ggJiZcbiAgICAgICAgIXByb2Nlc3MuZW52Ll9fTkVYVF9IQVNfUkVXUklURVMpXG4gICAgKVxuICAgIHRoaXMuaXNQcmV2aWV3ID0gISFpc1ByZXZpZXdcbiAgICB0aGlzLmlzTG9jYWxlRG9tYWluID0gZmFsc2VcblxuICAgIGlmIChwcm9jZXNzLmVudi5fX05FWFRfSTE4Tl9TVVBQT1JUKSB7XG4gICAgICB0aGlzLmxvY2FsZSA9IGxvY2FsZVxuICAgICAgdGhpcy5sb2NhbGVzID0gbG9jYWxlc1xuICAgICAgdGhpcy5kZWZhdWx0TG9jYWxlID0gZGVmYXVsdExvY2FsZVxuICAgICAgdGhpcy5kb21haW5Mb2NhbGVzID0gZG9tYWluTG9jYWxlc1xuICAgICAgdGhpcy5pc0xvY2FsZURvbWFpbiA9ICEhZGV0ZWN0RG9tYWluTG9jYWxlKFxuICAgICAgICBkb21haW5Mb2NhbGVzLFxuICAgICAgICBzZWxmLmxvY2F0aW9uLmhvc3RuYW1lXG4gICAgICApXG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAvLyBtYWtlIHN1cmUgXCJhc1wiIGRvZXNuJ3Qgc3RhcnQgd2l0aCBkb3VibGUgc2xhc2hlcyBvciBlbHNlIGl0IGNhblxuICAgICAgLy8gdGhyb3cgYW4gZXJyb3IgYXMgaXQncyBjb25zaWRlcmVkIGludmFsaWRcbiAgICAgIGlmIChhcy5zdWJzdHIoMCwgMikgIT09ICcvLycpIHtcbiAgICAgICAgLy8gaW4gb3JkZXIgZm9yIGBlLnN0YXRlYCB0byB3b3JrIG9uIHRoZSBgb25wb3BzdGF0ZWAgZXZlbnRcbiAgICAgICAgLy8gd2UgaGF2ZSB0byByZWdpc3RlciB0aGUgaW5pdGlhbCByb3V0ZSB1cG9uIGluaXRpYWxpemF0aW9uXG4gICAgICAgIHRoaXMuY2hhbmdlU3RhdGUoXG4gICAgICAgICAgJ3JlcGxhY2VTdGF0ZScsXG4gICAgICAgICAgZm9ybWF0V2l0aFZhbGlkYXRpb24oeyBwYXRobmFtZTogYWRkQmFzZVBhdGgocGF0aG5hbWUpLCBxdWVyeSB9KSxcbiAgICAgICAgICBnZXRVUkwoKSxcbiAgICAgICAgICB7IGxvY2FsZSB9XG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BvcHN0YXRlJywgdGhpcy5vblBvcFN0YXRlKVxuXG4gICAgICAvLyBlbmFibGUgY3VzdG9tIHNjcm9sbCByZXN0b3JhdGlvbiBoYW5kbGluZyB3aGVuIGF2YWlsYWJsZVxuICAgICAgLy8gb3RoZXJ3aXNlIGZhbGxiYWNrIHRvIGJyb3dzZXIncyBkZWZhdWx0IGhhbmRsaW5nXG4gICAgICBpZiAocHJvY2Vzcy5lbnYuX19ORVhUX1NDUk9MTF9SRVNUT1JBVElPTikge1xuICAgICAgICBpZiAobWFudWFsU2Nyb2xsUmVzdG9yYXRpb24pIHtcbiAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5zY3JvbGxSZXN0b3JhdGlvbiA9ICdtYW51YWwnXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvblBvcFN0YXRlID0gKGU6IFBvcFN0YXRlRXZlbnQpOiB2b2lkID0+IHtcbiAgICBjb25zdCBzdGF0ZSA9IGUuc3RhdGUgYXMgSGlzdG9yeVN0YXRlXG5cbiAgICBpZiAoIXN0YXRlKSB7XG4gICAgICAvLyBXZSBnZXQgc3RhdGUgYXMgdW5kZWZpbmVkIGZvciB0d28gcmVhc29ucy5cbiAgICAgIC8vICAxLiBXaXRoIG9sZGVyIHNhZmFyaSAoPCA4KSBhbmQgb2xkZXIgY2hyb21lICg8IDM0KVxuICAgICAgLy8gIDIuIFdoZW4gdGhlIFVSTCBjaGFuZ2VkIHdpdGggI1xuICAgICAgLy9cbiAgICAgIC8vIEluIHRoZSBib3RoIGNhc2VzLCB3ZSBkb24ndCBuZWVkIHRvIHByb2NlZWQgYW5kIGNoYW5nZSB0aGUgcm91dGUuXG4gICAgICAvLyAoYXMgaXQncyBhbHJlYWR5IGNoYW5nZWQpXG4gICAgICAvLyBCdXQgd2UgY2FuIHNpbXBseSByZXBsYWNlIHRoZSBzdGF0ZSB3aXRoIHRoZSBuZXcgY2hhbmdlcy5cbiAgICAgIC8vIEFjdHVhbGx5LCBmb3IgKDEpIHdlIGRvbid0IG5lZWQgdG8gbm90aGluZy4gQnV0IGl0J3MgaGFyZCB0byBkZXRlY3QgdGhhdCBldmVudC5cbiAgICAgIC8vIFNvLCBkb2luZyB0aGUgZm9sbG93aW5nIGZvciAoMSkgZG9lcyBubyBoYXJtLlxuICAgICAgY29uc3QgeyBwYXRobmFtZSwgcXVlcnkgfSA9IHRoaXNcbiAgICAgIHRoaXMuY2hhbmdlU3RhdGUoXG4gICAgICAgICdyZXBsYWNlU3RhdGUnLFxuICAgICAgICBmb3JtYXRXaXRoVmFsaWRhdGlvbih7IHBhdGhuYW1lOiBhZGRCYXNlUGF0aChwYXRobmFtZSksIHF1ZXJ5IH0pLFxuICAgICAgICBnZXRVUkwoKVxuICAgICAgKVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgaWYgKCFzdGF0ZS5fX04pIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGxldCBmb3JjZWRTY3JvbGw6IHsgeDogbnVtYmVyOyB5OiBudW1iZXIgfSB8IHVuZGVmaW5lZFxuICAgIGNvbnN0IHsgdXJsLCBhcywgb3B0aW9ucywgaWR4IH0gPSBzdGF0ZVxuICAgIGlmIChwcm9jZXNzLmVudi5fX05FWFRfU0NST0xMX1JFU1RPUkFUSU9OKSB7XG4gICAgICBpZiAobWFudWFsU2Nyb2xsUmVzdG9yYXRpb24pIHtcbiAgICAgICAgaWYgKHRoaXMuX2lkeCAhPT0gaWR4KSB7XG4gICAgICAgICAgLy8gU25hcHNob3QgY3VycmVudCBzY3JvbGwgcG9zaXRpb246XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXG4gICAgICAgICAgICAgICdfX25leHRfc2Nyb2xsXycgKyB0aGlzLl9pZHgsXG4gICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHsgeDogc2VsZi5wYWdlWE9mZnNldCwgeTogc2VsZi5wYWdlWU9mZnNldCB9KVxuICAgICAgICAgICAgKVxuICAgICAgICAgIH0gY2F0Y2gge31cblxuICAgICAgICAgIC8vIFJlc3RvcmUgb2xkIHNjcm9sbCBwb3NpdGlvbjpcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgdiA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ19fbmV4dF9zY3JvbGxfJyArIGlkeClcbiAgICAgICAgICAgIGZvcmNlZFNjcm9sbCA9IEpTT04ucGFyc2UodiEpXG4gICAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgICBmb3JjZWRTY3JvbGwgPSB7IHg6IDAsIHk6IDAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9pZHggPSBpZHhcblxuICAgIGNvbnN0IHsgcGF0aG5hbWUgfSA9IHBhcnNlUmVsYXRpdmVVcmwodXJsKVxuXG4gICAgLy8gTWFrZSBzdXJlIHdlIGRvbid0IHJlLXJlbmRlciBvbiBpbml0aWFsIGxvYWQsXG4gICAgLy8gY2FuIGJlIGNhdXNlZCBieSBuYXZpZ2F0aW5nIGJhY2sgZnJvbSBhbiBleHRlcm5hbCBzaXRlXG4gICAgaWYgKHRoaXMuaXNTc3IgJiYgYXMgPT09IHRoaXMuYXNQYXRoICYmIHBhdGhuYW1lID09PSB0aGlzLnBhdGhuYW1lKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICAvLyBJZiB0aGUgZG93bnN0cmVhbSBhcHBsaWNhdGlvbiByZXR1cm5zIGZhbHN5LCByZXR1cm4uXG4gICAgLy8gVGhleSB3aWxsIHRoZW4gYmUgcmVzcG9uc2libGUgZm9yIGhhbmRsaW5nIHRoZSBldmVudC5cbiAgICBpZiAodGhpcy5fYnBzICYmICF0aGlzLl9icHMoc3RhdGUpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICB0aGlzLmNoYW5nZShcbiAgICAgICdyZXBsYWNlU3RhdGUnLFxuICAgICAgdXJsLFxuICAgICAgYXMsXG4gICAgICBPYmplY3QuYXNzaWduPHt9LCBUcmFuc2l0aW9uT3B0aW9ucywgVHJhbnNpdGlvbk9wdGlvbnM+KHt9LCBvcHRpb25zLCB7XG4gICAgICAgIHNoYWxsb3c6IG9wdGlvbnMuc2hhbGxvdyAmJiB0aGlzLl9zaGFsbG93LFxuICAgICAgICBsb2NhbGU6IG9wdGlvbnMubG9jYWxlIHx8IHRoaXMuZGVmYXVsdExvY2FsZSxcbiAgICAgIH0pLFxuICAgICAgZm9yY2VkU2Nyb2xsXG4gICAgKVxuICB9XG5cbiAgcmVsb2FkKCk6IHZvaWQge1xuICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKVxuICB9XG5cbiAgLyoqXG4gICAqIEdvIGJhY2sgaW4gaGlzdG9yeVxuICAgKi9cbiAgYmFjaygpIHtcbiAgICB3aW5kb3cuaGlzdG9yeS5iYWNrKClcbiAgfVxuXG4gIC8qKlxuICAgKiBQZXJmb3JtcyBhIGBwdXNoU3RhdGVgIHdpdGggYXJndW1lbnRzXG4gICAqIEBwYXJhbSB1cmwgb2YgdGhlIHJvdXRlXG4gICAqIEBwYXJhbSBhcyBtYXNrcyBgdXJsYCBmb3IgdGhlIGJyb3dzZXJcbiAgICogQHBhcmFtIG9wdGlvbnMgb2JqZWN0IHlvdSBjYW4gZGVmaW5lIGBzaGFsbG93YCBhbmQgb3RoZXIgb3B0aW9uc1xuICAgKi9cbiAgcHVzaCh1cmw6IFVybCwgYXM/OiBVcmwsIG9wdGlvbnM6IFRyYW5zaXRpb25PcHRpb25zID0ge30pIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuX19ORVhUX1NDUk9MTF9SRVNUT1JBVElPTikge1xuICAgICAgLy8gVE9ETzogcmVtb3ZlIGluIHRoZSBmdXR1cmUgd2hlbiB3ZSB1cGRhdGUgaGlzdG9yeSBiZWZvcmUgcm91dGUgY2hhbmdlXG4gICAgICAvLyBpcyBjb21wbGV0ZSwgYXMgdGhlIHBvcHN0YXRlIGV2ZW50IHNob3VsZCBoYW5kbGUgdGhpcyBjYXB0dXJlLlxuICAgICAgaWYgKG1hbnVhbFNjcm9sbFJlc3RvcmF0aW9uKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgLy8gU25hcHNob3Qgc2Nyb2xsIHBvc2l0aW9uIHJpZ2h0IGJlZm9yZSBuYXZpZ2F0aW5nIHRvIGEgbmV3IHBhZ2U6XG4gICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShcbiAgICAgICAgICAgICdfX25leHRfc2Nyb2xsXycgKyB0aGlzLl9pZHgsXG4gICAgICAgICAgICBKU09OLnN0cmluZ2lmeSh7IHg6IHNlbGYucGFnZVhPZmZzZXQsIHk6IHNlbGYucGFnZVlPZmZzZXQgfSlcbiAgICAgICAgICApXG4gICAgICAgIH0gY2F0Y2gge31cbiAgICAgIH1cbiAgICB9XG4gICAgOyh7IHVybCwgYXMgfSA9IHByZXBhcmVVcmxBcyh0aGlzLCB1cmwsIGFzKSlcbiAgICByZXR1cm4gdGhpcy5jaGFuZ2UoJ3B1c2hTdGF0ZScsIHVybCwgYXMsIG9wdGlvbnMpXG4gIH1cblxuICAvKipcbiAgICogUGVyZm9ybXMgYSBgcmVwbGFjZVN0YXRlYCB3aXRoIGFyZ3VtZW50c1xuICAgKiBAcGFyYW0gdXJsIG9mIHRoZSByb3V0ZVxuICAgKiBAcGFyYW0gYXMgbWFza3MgYHVybGAgZm9yIHRoZSBicm93c2VyXG4gICAqIEBwYXJhbSBvcHRpb25zIG9iamVjdCB5b3UgY2FuIGRlZmluZSBgc2hhbGxvd2AgYW5kIG90aGVyIG9wdGlvbnNcbiAgICovXG4gIHJlcGxhY2UodXJsOiBVcmwsIGFzPzogVXJsLCBvcHRpb25zOiBUcmFuc2l0aW9uT3B0aW9ucyA9IHt9KSB7XG4gICAgOyh7IHVybCwgYXMgfSA9IHByZXBhcmVVcmxBcyh0aGlzLCB1cmwsIGFzKSlcbiAgICByZXR1cm4gdGhpcy5jaGFuZ2UoJ3JlcGxhY2VTdGF0ZScsIHVybCwgYXMsIG9wdGlvbnMpXG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGNoYW5nZShcbiAgICBtZXRob2Q6IEhpc3RvcnlNZXRob2QsXG4gICAgdXJsOiBzdHJpbmcsXG4gICAgYXM6IHN0cmluZyxcbiAgICBvcHRpb25zOiBUcmFuc2l0aW9uT3B0aW9ucyxcbiAgICBmb3JjZWRTY3JvbGw/OiB7IHg6IG51bWJlcjsgeTogbnVtYmVyIH1cbiAgKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgaWYgKCFpc0xvY2FsVVJMKHVybCkpIHtcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gdXJsXG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gICAgY29uc3Qgc2hvdWxkUmVzb2x2ZUhyZWYgPSB1cmwgPT09IGFzIHx8IChvcHRpb25zIGFzIGFueSkuX2hcblxuICAgIC8vIGZvciBzdGF0aWMgcGFnZXMgd2l0aCBxdWVyeSBwYXJhbXMgaW4gdGhlIFVSTCB3ZSBkZWxheVxuICAgIC8vIG1hcmtpbmcgdGhlIHJvdXRlciByZWFkeSB1bnRpbCBhZnRlciB0aGUgcXVlcnkgaXMgdXBkYXRlZFxuICAgIGlmICgob3B0aW9ucyBhcyBhbnkpLl9oKSB7XG4gICAgICB0aGlzLmlzUmVhZHkgPSB0cnVlXG4gICAgfVxuXG4gICAgLy8gRGVmYXVsdCB0byBzY3JvbGwgcmVzZXQgYmVoYXZpb3IgdW5sZXNzIGV4cGxpY2l0bHkgc3BlY2lmaWVkIHRvIGJlXG4gICAgLy8gYGZhbHNlYCEgVGhpcyBtYWtlcyB0aGUgYmVoYXZpb3IgYmV0d2VlbiB1c2luZyBgUm91dGVyI3B1c2hgIGFuZCBhXG4gICAgLy8gYDxMaW5rIC8+YCBjb25zaXN0ZW50LlxuICAgIG9wdGlvbnMuc2Nyb2xsID0gISEob3B0aW9ucy5zY3JvbGwgPz8gdHJ1ZSlcblxuICAgIGxldCBsb2NhbGVDaGFuZ2UgPSBvcHRpb25zLmxvY2FsZSAhPT0gdGhpcy5sb2NhbGVcblxuICAgIGlmIChwcm9jZXNzLmVudi5fX05FWFRfSTE4Tl9TVVBQT1JUKSB7XG4gICAgICB0aGlzLmxvY2FsZSA9XG4gICAgICAgIG9wdGlvbnMubG9jYWxlID09PSBmYWxzZVxuICAgICAgICAgID8gdGhpcy5kZWZhdWx0TG9jYWxlXG4gICAgICAgICAgOiBvcHRpb25zLmxvY2FsZSB8fCB0aGlzLmxvY2FsZVxuXG4gICAgICBpZiAodHlwZW9mIG9wdGlvbnMubG9jYWxlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICBvcHRpb25zLmxvY2FsZSA9IHRoaXMubG9jYWxlXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHBhcnNlZEFzID0gcGFyc2VSZWxhdGl2ZVVybChoYXNCYXNlUGF0aChhcykgPyBkZWxCYXNlUGF0aChhcykgOiBhcylcbiAgICAgIGNvbnN0IGxvY2FsZVBhdGhSZXN1bHQgPSBub3JtYWxpemVMb2NhbGVQYXRoKFxuICAgICAgICBwYXJzZWRBcy5wYXRobmFtZSxcbiAgICAgICAgdGhpcy5sb2NhbGVzXG4gICAgICApXG5cbiAgICAgIGlmIChsb2NhbGVQYXRoUmVzdWx0LmRldGVjdGVkTG9jYWxlKSB7XG4gICAgICAgIHRoaXMubG9jYWxlID0gbG9jYWxlUGF0aFJlc3VsdC5kZXRlY3RlZExvY2FsZVxuICAgICAgICBwYXJzZWRBcy5wYXRobmFtZSA9IGFkZEJhc2VQYXRoKHBhcnNlZEFzLnBhdGhuYW1lKVxuICAgICAgICBhcyA9IGZvcm1hdFdpdGhWYWxpZGF0aW9uKHBhcnNlZEFzKVxuICAgICAgICB1cmwgPSBhZGRCYXNlUGF0aChcbiAgICAgICAgICBub3JtYWxpemVMb2NhbGVQYXRoKFxuICAgICAgICAgICAgaGFzQmFzZVBhdGgodXJsKSA/IGRlbEJhc2VQYXRoKHVybCkgOiB1cmwsXG4gICAgICAgICAgICB0aGlzLmxvY2FsZXNcbiAgICAgICAgICApLnBhdGhuYW1lXG4gICAgICAgIClcbiAgICAgIH1cbiAgICAgIGxldCBkaWROYXZpZ2F0ZSA9IGZhbHNlXG5cbiAgICAgIC8vIHdlIG5lZWQgdG8gd3JhcCB0aGlzIGluIHRoZSBlbnYgY2hlY2sgYWdhaW4gc2luY2UgcmVnZW5lcmF0b3IgcnVudGltZVxuICAgICAgLy8gbW92ZXMgdGhpcyBvbiBpdHMgb3duIGR1ZSB0byB0aGUgcmV0dXJuXG4gICAgICBpZiAocHJvY2Vzcy5lbnYuX19ORVhUX0kxOE5fU1VQUE9SVCkge1xuICAgICAgICAvLyBpZiB0aGUgbG9jYWxlIGlzbid0IGNvbmZpZ3VyZWQgaGFyZCBuYXZpZ2F0ZSB0byBzaG93IDQwNCBwYWdlXG4gICAgICAgIGlmICghdGhpcy5sb2NhbGVzPy5pbmNsdWRlcyh0aGlzLmxvY2FsZSEpKSB7XG4gICAgICAgICAgcGFyc2VkQXMucGF0aG5hbWUgPSBhZGRMb2NhbGUocGFyc2VkQXMucGF0aG5hbWUsIHRoaXMubG9jYWxlKVxuICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gZm9ybWF0V2l0aFZhbGlkYXRpb24ocGFyc2VkQXMpXG4gICAgICAgICAgLy8gdGhpcyB3YXMgcHJldmlvdXNseSBhIHJldHVybiBidXQgd2FzIHJlbW92ZWQgaW4gZmF2b3JcbiAgICAgICAgICAvLyBvZiBiZXR0ZXIgZGVhZCBjb2RlIGVsaW1pbmF0aW9uIHdpdGggcmVnZW5lcmF0b3IgcnVudGltZVxuICAgICAgICAgIGRpZE5hdmlnYXRlID0gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGRldGVjdGVkRG9tYWluID0gZGV0ZWN0RG9tYWluTG9jYWxlKFxuICAgICAgICB0aGlzLmRvbWFpbkxvY2FsZXMsXG4gICAgICAgIHVuZGVmaW5lZCxcbiAgICAgICAgdGhpcy5sb2NhbGVcbiAgICAgIClcblxuICAgICAgLy8gd2UgbmVlZCB0byB3cmFwIHRoaXMgaW4gdGhlIGVudiBjaGVjayBhZ2FpbiBzaW5jZSByZWdlbmVyYXRvciBydW50aW1lXG4gICAgICAvLyBtb3ZlcyB0aGlzIG9uIGl0cyBvd24gZHVlIHRvIHRoZSByZXR1cm5cbiAgICAgIGlmIChwcm9jZXNzLmVudi5fX05FWFRfSTE4Tl9TVVBQT1JUKSB7XG4gICAgICAgIC8vIGlmIHdlIGFyZSBuYXZpZ2F0aW5nIHRvIGEgZG9tYWluIGxvY2FsZSBlbnN1cmUgd2UgcmVkaXJlY3QgdG8gdGhlXG4gICAgICAgIC8vIGNvcnJlY3QgZG9tYWluXG4gICAgICAgIGlmIChcbiAgICAgICAgICAhZGlkTmF2aWdhdGUgJiZcbiAgICAgICAgICBkZXRlY3RlZERvbWFpbiAmJlxuICAgICAgICAgIHRoaXMuaXNMb2NhbGVEb21haW4gJiZcbiAgICAgICAgICBzZWxmLmxvY2F0aW9uLmhvc3RuYW1lICE9PSBkZXRlY3RlZERvbWFpbi5kb21haW5cbiAgICAgICAgKSB7XG4gICAgICAgICAgY29uc3QgYXNOb0Jhc2VQYXRoID0gZGVsQmFzZVBhdGgoYXMpXG4gICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBgaHR0cCR7ZGV0ZWN0ZWREb21haW4uaHR0cCA/ICcnIDogJ3MnfTovLyR7XG4gICAgICAgICAgICBkZXRlY3RlZERvbWFpbi5kb21haW5cbiAgICAgICAgICB9JHthZGRCYXNlUGF0aChcbiAgICAgICAgICAgIGAke1xuICAgICAgICAgICAgICB0aGlzLmxvY2FsZSA9PT0gZGV0ZWN0ZWREb21haW4uZGVmYXVsdExvY2FsZVxuICAgICAgICAgICAgICAgID8gJydcbiAgICAgICAgICAgICAgICA6IGAvJHt0aGlzLmxvY2FsZX1gXG4gICAgICAgICAgICB9JHthc05vQmFzZVBhdGggPT09ICcvJyA/ICcnIDogYXNOb0Jhc2VQYXRofWAgfHwgJy8nXG4gICAgICAgICAgKX1gXG4gICAgICAgICAgLy8gdGhpcyB3YXMgcHJldmlvdXNseSBhIHJldHVybiBidXQgd2FzIHJlbW92ZWQgaW4gZmF2b3JcbiAgICAgICAgICAvLyBvZiBiZXR0ZXIgZGVhZCBjb2RlIGVsaW1pbmF0aW9uIHdpdGggcmVnZW5lcmF0b3IgcnVudGltZVxuICAgICAgICAgIGRpZE5hdmlnYXRlID0gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChkaWROYXZpZ2F0ZSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKCkgPT4ge30pXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCEob3B0aW9ucyBhcyBhbnkpLl9oKSB7XG4gICAgICB0aGlzLmlzU3NyID0gZmFsc2VcbiAgICB9XG4gICAgLy8gbWFya2luZyByb3V0ZSBjaGFuZ2VzIGFzIGEgbmF2aWdhdGlvbiBzdGFydCBlbnRyeVxuICAgIGlmIChTVCkge1xuICAgICAgcGVyZm9ybWFuY2UubWFyaygncm91dGVDaGFuZ2UnKVxuICAgIH1cblxuICAgIGNvbnN0IHsgc2hhbGxvdyA9IGZhbHNlIH0gPSBvcHRpb25zXG4gICAgY29uc3Qgcm91dGVQcm9wcyA9IHsgc2hhbGxvdyB9XG5cbiAgICBpZiAodGhpcy5faW5GbGlnaHRSb3V0ZSkge1xuICAgICAgdGhpcy5hYm9ydENvbXBvbmVudExvYWQodGhpcy5faW5GbGlnaHRSb3V0ZSwgcm91dGVQcm9wcylcbiAgICB9XG5cbiAgICBhcyA9IGFkZEJhc2VQYXRoKFxuICAgICAgYWRkTG9jYWxlKFxuICAgICAgICBoYXNCYXNlUGF0aChhcykgPyBkZWxCYXNlUGF0aChhcykgOiBhcyxcbiAgICAgICAgb3B0aW9ucy5sb2NhbGUsXG4gICAgICAgIHRoaXMuZGVmYXVsdExvY2FsZVxuICAgICAgKVxuICAgIClcbiAgICBjb25zdCBjbGVhbmVkQXMgPSBkZWxMb2NhbGUoXG4gICAgICBoYXNCYXNlUGF0aChhcykgPyBkZWxCYXNlUGF0aChhcykgOiBhcyxcbiAgICAgIHRoaXMubG9jYWxlXG4gICAgKVxuICAgIHRoaXMuX2luRmxpZ2h0Um91dGUgPSBhc1xuXG4gICAgLy8gSWYgdGhlIHVybCBjaGFuZ2UgaXMgb25seSByZWxhdGVkIHRvIGEgaGFzaCBjaGFuZ2VcbiAgICAvLyBXZSBzaG91bGQgbm90IHByb2NlZWQuIFdlIHNob3VsZCBvbmx5IGNoYW5nZSB0aGUgc3RhdGUuXG5cbiAgICAvLyBXQVJOSU5HOiBgX2hgIGlzIGFuIGludGVybmFsIG9wdGlvbiBmb3IgaGFuZGluZyBOZXh0LmpzIGNsaWVudC1zaWRlXG4gICAgLy8gaHlkcmF0aW9uLiBZb3VyIGFwcCBzaG91bGQgX25ldmVyXyB1c2UgdGhpcyBwcm9wZXJ0eS4gSXQgbWF5IGNoYW5nZSBhdFxuICAgIC8vIGFueSB0aW1lIHdpdGhvdXQgbm90aWNlLlxuICAgIGlmICghKG9wdGlvbnMgYXMgYW55KS5faCAmJiB0aGlzLm9ubHlBSGFzaENoYW5nZShjbGVhbmVkQXMpKSB7XG4gICAgICB0aGlzLmFzUGF0aCA9IGNsZWFuZWRBc1xuICAgICAgUm91dGVyLmV2ZW50cy5lbWl0KCdoYXNoQ2hhbmdlU3RhcnQnLCBhcywgcm91dGVQcm9wcylcbiAgICAgIC8vIFRPRE86IGRvIHdlIG5lZWQgdGhlIHJlc29sdmVkIGhyZWYgd2hlbiBvbmx5IGEgaGFzaCBjaGFuZ2U/XG4gICAgICB0aGlzLmNoYW5nZVN0YXRlKG1ldGhvZCwgdXJsLCBhcywgb3B0aW9ucylcbiAgICAgIHRoaXMuc2Nyb2xsVG9IYXNoKGNsZWFuZWRBcylcbiAgICAgIHRoaXMubm90aWZ5KHRoaXMuY29tcG9uZW50c1t0aGlzLnJvdXRlXSwgbnVsbClcbiAgICAgIFJvdXRlci5ldmVudHMuZW1pdCgnaGFzaENoYW5nZUNvbXBsZXRlJywgYXMsIHJvdXRlUHJvcHMpXG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cblxuICAgIGxldCBwYXJzZWQgPSBwYXJzZVJlbGF0aXZlVXJsKHVybClcbiAgICBsZXQgeyBwYXRobmFtZSwgcXVlcnkgfSA9IHBhcnNlZFxuXG4gICAgLy8gVGhlIGJ1aWxkIG1hbmlmZXN0IG5lZWRzIHRvIGJlIGxvYWRlZCBiZWZvcmUgYXV0by1zdGF0aWMgZHluYW1pYyBwYWdlc1xuICAgIC8vIGdldCB0aGVpciBxdWVyeSBwYXJhbWV0ZXJzIHRvIGFsbG93IGVuc3VyaW5nIHRoZXkgY2FuIGJlIHBhcnNlZCBwcm9wZXJseVxuICAgIC8vIHdoZW4gcmV3cml0dGVuIHRvXG4gICAgbGV0IHBhZ2VzOiBhbnksIHJld3JpdGVzOiBhbnlcbiAgICB0cnkge1xuICAgICAgcGFnZXMgPSBhd2FpdCB0aGlzLnBhZ2VMb2FkZXIuZ2V0UGFnZUxpc3QoKVxuICAgICAgOyh7IF9fcmV3cml0ZXM6IHJld3JpdGVzIH0gPSBhd2FpdCBnZXRDbGllbnRCdWlsZE1hbmlmZXN0KCkpXG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAvLyBJZiB3ZSBmYWlsIHRvIHJlc29sdmUgdGhlIHBhZ2UgbGlzdCBvciBjbGllbnQtYnVpbGQgbWFuaWZlc3QsIHdlIG11c3RcbiAgICAgIC8vIGRvIGEgc2VydmVyLXNpZGUgdHJhbnNpdGlvbjpcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYXNcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIC8vIElmIGFza2VkIHRvIGNoYW5nZSB0aGUgY3VycmVudCBVUkwgd2Ugc2hvdWxkIHJlbG9hZCB0aGUgY3VycmVudCBwYWdlXG4gICAgLy8gKG5vdCBsb2NhdGlvbi5yZWxvYWQoKSBidXQgcmVsb2FkIGdldEluaXRpYWxQcm9wcyBhbmQgb3RoZXIgTmV4dC5qcyBzdHVmZnMpXG4gICAgLy8gV2UgYWxzbyBuZWVkIHRvIHNldCB0aGUgbWV0aG9kID0gcmVwbGFjZVN0YXRlIGFsd2F5c1xuICAgIC8vIGFzIHRoaXMgc2hvdWxkIG5vdCBnbyBpbnRvIHRoZSBoaXN0b3J5IChUaGF0J3MgaG93IGJyb3dzZXJzIHdvcmspXG4gICAgLy8gV2Ugc2hvdWxkIGNvbXBhcmUgdGhlIG5ldyBhc1BhdGggdG8gdGhlIGN1cnJlbnQgYXNQYXRoLCBub3QgdGhlIHVybFxuICAgIGlmICghdGhpcy51cmxJc05ldyhjbGVhbmVkQXMpICYmICFsb2NhbGVDaGFuZ2UpIHtcbiAgICAgIG1ldGhvZCA9ICdyZXBsYWNlU3RhdGUnXG4gICAgfVxuXG4gICAgLy8gd2UgbmVlZCB0byByZXNvbHZlIHRoZSBhcyB2YWx1ZSB1c2luZyByZXdyaXRlcyBmb3IgZHluYW1pYyBTU0dcbiAgICAvLyBwYWdlcyB0byBhbGxvdyBidWlsZGluZyB0aGUgZGF0YSBVUkwgY29ycmVjdGx5XG4gICAgbGV0IHJlc29sdmVkQXMgPSBhc1xuXG4gICAgLy8gdXJsIGFuZCBhcyBzaG91bGQgYWx3YXlzIGJlIHByZWZpeGVkIHdpdGggYmFzZVBhdGggYnkgdGhpc1xuICAgIC8vIHBvaW50IGJ5IGVpdGhlciBuZXh0L2xpbmsgb3Igcm91dGVyLnB1c2gvcmVwbGFjZSBzbyBzdHJpcCB0aGVcbiAgICAvLyBiYXNlUGF0aCBmcm9tIHRoZSBwYXRobmFtZSB0byBtYXRjaCB0aGUgcGFnZXMgZGlyIDEtdG8tMVxuICAgIHBhdGhuYW1lID0gcGF0aG5hbWVcbiAgICAgID8gcmVtb3ZlUGF0aFRyYWlsaW5nU2xhc2goZGVsQmFzZVBhdGgocGF0aG5hbWUpKVxuICAgICAgOiBwYXRobmFtZVxuXG4gICAgaWYgKHNob3VsZFJlc29sdmVIcmVmICYmIHBhdGhuYW1lICE9PSAnL19lcnJvcicpIHtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5fX05FWFRfSEFTX1JFV1JJVEVTICYmIGFzLnN0YXJ0c1dpdGgoJy8nKSkge1xuICAgICAgICBjb25zdCByZXdyaXRlc1Jlc3VsdCA9IHJlc29sdmVSZXdyaXRlcyhcbiAgICAgICAgICBhZGRCYXNlUGF0aChhZGRMb2NhbGUoY2xlYW5lZEFzLCB0aGlzLmxvY2FsZSkpLFxuICAgICAgICAgIHBhZ2VzLFxuICAgICAgICAgIHJld3JpdGVzLFxuICAgICAgICAgIHF1ZXJ5LFxuICAgICAgICAgIChwOiBzdHJpbmcpID0+IHJlc29sdmVEeW5hbWljUm91dGUocCwgcGFnZXMpLFxuICAgICAgICAgIHRoaXMubG9jYWxlc1xuICAgICAgICApXG4gICAgICAgIHJlc29sdmVkQXMgPSByZXdyaXRlc1Jlc3VsdC5hc1BhdGhcblxuICAgICAgICBpZiAocmV3cml0ZXNSZXN1bHQubWF0Y2hlZFBhZ2UgJiYgcmV3cml0ZXNSZXN1bHQucmVzb2x2ZWRIcmVmKSB7XG4gICAgICAgICAgLy8gaWYgdGhpcyBkaXJlY3RseSBtYXRjaGVzIGEgcGFnZSB3ZSBuZWVkIHRvIHVwZGF0ZSB0aGUgaHJlZiB0b1xuICAgICAgICAgIC8vIGFsbG93IHRoZSBjb3JyZWN0IHBhZ2UgY2h1bmsgdG8gYmUgbG9hZGVkXG4gICAgICAgICAgcGF0aG5hbWUgPSByZXdyaXRlc1Jlc3VsdC5yZXNvbHZlZEhyZWZcbiAgICAgICAgICBwYXJzZWQucGF0aG5hbWUgPSBwYXRobmFtZVxuICAgICAgICAgIHVybCA9IGZvcm1hdFdpdGhWYWxpZGF0aW9uKHBhcnNlZClcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFyc2VkLnBhdGhuYW1lID0gcmVzb2x2ZUR5bmFtaWNSb3V0ZShwYXRobmFtZSwgcGFnZXMpXG5cbiAgICAgICAgaWYgKHBhcnNlZC5wYXRobmFtZSAhPT0gcGF0aG5hbWUpIHtcbiAgICAgICAgICBwYXRobmFtZSA9IHBhcnNlZC5wYXRobmFtZVxuICAgICAgICAgIHVybCA9IGZvcm1hdFdpdGhWYWxpZGF0aW9uKHBhcnNlZClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHJvdXRlID0gcmVtb3ZlUGF0aFRyYWlsaW5nU2xhc2gocGF0aG5hbWUpXG5cbiAgICBpZiAoIWlzTG9jYWxVUkwoYXMpKSB7XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgYEludmFsaWQgaHJlZjogXCIke3VybH1cIiBhbmQgYXM6IFwiJHthc31cIiwgcmVjZWl2ZWQgcmVsYXRpdmUgaHJlZiBhbmQgZXh0ZXJuYWwgYXNgICtcbiAgICAgICAgICAgIGBcXG5TZWUgbW9yZSBpbmZvOiBodHRwczovL25leHRqcy5vcmcvZG9jcy9tZXNzYWdlcy9pbnZhbGlkLXJlbGF0aXZlLXVybC1leHRlcm5hbC1hc2BcbiAgICAgICAgKVxuICAgICAgfVxuXG4gICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGFzXG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICByZXNvbHZlZEFzID0gZGVsTG9jYWxlKGRlbEJhc2VQYXRoKHJlc29sdmVkQXMpLCB0aGlzLmxvY2FsZSlcblxuICAgIGlmIChpc0R5bmFtaWNSb3V0ZShyb3V0ZSkpIHtcbiAgICAgIGNvbnN0IHBhcnNlZEFzID0gcGFyc2VSZWxhdGl2ZVVybChyZXNvbHZlZEFzKVxuICAgICAgY29uc3QgYXNQYXRobmFtZSA9IHBhcnNlZEFzLnBhdGhuYW1lXG5cbiAgICAgIGNvbnN0IHJvdXRlUmVnZXggPSBnZXRSb3V0ZVJlZ2V4KHJvdXRlKVxuICAgICAgY29uc3Qgcm91dGVNYXRjaCA9IGdldFJvdXRlTWF0Y2hlcihyb3V0ZVJlZ2V4KShhc1BhdGhuYW1lKVxuICAgICAgY29uc3Qgc2hvdWxkSW50ZXJwb2xhdGUgPSByb3V0ZSA9PT0gYXNQYXRobmFtZVxuICAgICAgY29uc3QgaW50ZXJwb2xhdGVkQXMgPSBzaG91bGRJbnRlcnBvbGF0ZVxuICAgICAgICA/IGludGVycG9sYXRlQXMocm91dGUsIGFzUGF0aG5hbWUsIHF1ZXJ5KVxuICAgICAgICA6ICh7fSBhcyB7IHJlc3VsdDogdW5kZWZpbmVkOyBwYXJhbXM6IHVuZGVmaW5lZCB9KVxuXG4gICAgICBpZiAoIXJvdXRlTWF0Y2ggfHwgKHNob3VsZEludGVycG9sYXRlICYmICFpbnRlcnBvbGF0ZWRBcy5yZXN1bHQpKSB7XG4gICAgICAgIGNvbnN0IG1pc3NpbmdQYXJhbXMgPSBPYmplY3Qua2V5cyhyb3V0ZVJlZ2V4Lmdyb3VwcykuZmlsdGVyKFxuICAgICAgICAgIChwYXJhbSkgPT4gIXF1ZXJ5W3BhcmFtXVxuICAgICAgICApXG5cbiAgICAgICAgaWYgKG1pc3NpbmdQYXJhbXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgICAgIGAke1xuICAgICAgICAgICAgICAgIHNob3VsZEludGVycG9sYXRlXG4gICAgICAgICAgICAgICAgICA/IGBJbnRlcnBvbGF0aW5nIGhyZWZgXG4gICAgICAgICAgICAgICAgICA6IGBNaXNtYXRjaGluZyBcXGBhc1xcYCBhbmQgXFxgaHJlZlxcYGBcbiAgICAgICAgICAgICAgfSBmYWlsZWQgdG8gbWFudWFsbHkgcHJvdmlkZSBgICtcbiAgICAgICAgICAgICAgICBgdGhlIHBhcmFtczogJHttaXNzaW5nUGFyYW1zLmpvaW4oXG4gICAgICAgICAgICAgICAgICAnLCAnXG4gICAgICAgICAgICAgICAgKX0gaW4gdGhlIFxcYGhyZWZcXGAncyBcXGBxdWVyeVxcYGBcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAoc2hvdWxkSW50ZXJwb2xhdGVcbiAgICAgICAgICAgICAgPyBgVGhlIHByb3ZpZGVkIFxcYGhyZWZcXGAgKCR7dXJsfSkgdmFsdWUgaXMgbWlzc2luZyBxdWVyeSB2YWx1ZXMgKCR7bWlzc2luZ1BhcmFtcy5qb2luKFxuICAgICAgICAgICAgICAgICAgJywgJ1xuICAgICAgICAgICAgICAgICl9KSB0byBiZSBpbnRlcnBvbGF0ZWQgcHJvcGVybHkuIGBcbiAgICAgICAgICAgICAgOiBgVGhlIHByb3ZpZGVkIFxcYGFzXFxgIHZhbHVlICgke2FzUGF0aG5hbWV9KSBpcyBpbmNvbXBhdGlibGUgd2l0aCB0aGUgXFxgaHJlZlxcYCB2YWx1ZSAoJHtyb3V0ZX0pLiBgKSArXG4gICAgICAgICAgICAgIGBSZWFkIG1vcmU6IGh0dHBzOi8vbmV4dGpzLm9yZy9kb2NzL21lc3NhZ2VzLyR7XG4gICAgICAgICAgICAgICAgc2hvdWxkSW50ZXJwb2xhdGVcbiAgICAgICAgICAgICAgICAgID8gJ2hyZWYtaW50ZXJwb2xhdGlvbi1mYWlsZWQnXG4gICAgICAgICAgICAgICAgICA6ICdpbmNvbXBhdGlibGUtaHJlZi1hcydcbiAgICAgICAgICAgICAgfWBcbiAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoc2hvdWxkSW50ZXJwb2xhdGUpIHtcbiAgICAgICAgYXMgPSBmb3JtYXRXaXRoVmFsaWRhdGlvbihcbiAgICAgICAgICBPYmplY3QuYXNzaWduKHt9LCBwYXJzZWRBcywge1xuICAgICAgICAgICAgcGF0aG5hbWU6IGludGVycG9sYXRlZEFzLnJlc3VsdCxcbiAgICAgICAgICAgIHF1ZXJ5OiBvbWl0UGFybXNGcm9tUXVlcnkocXVlcnksIGludGVycG9sYXRlZEFzLnBhcmFtcyEpLFxuICAgICAgICAgIH0pXG4gICAgICAgIClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIE1lcmdlIHBhcmFtcyBpbnRvIGBxdWVyeWAsIG92ZXJ3cml0aW5nIGFueSBzcGVjaWZpZWQgaW4gc2VhcmNoXG4gICAgICAgIE9iamVjdC5hc3NpZ24ocXVlcnksIHJvdXRlTWF0Y2gpXG4gICAgICB9XG4gICAgfVxuXG4gICAgUm91dGVyLmV2ZW50cy5lbWl0KCdyb3V0ZUNoYW5nZVN0YXJ0JywgYXMsIHJvdXRlUHJvcHMpXG5cbiAgICB0cnkge1xuICAgICAgbGV0IHJvdXRlSW5mbyA9IGF3YWl0IHRoaXMuZ2V0Um91dGVJbmZvKFxuICAgICAgICByb3V0ZSxcbiAgICAgICAgcGF0aG5hbWUsXG4gICAgICAgIHF1ZXJ5LFxuICAgICAgICBhcyxcbiAgICAgICAgcmVzb2x2ZWRBcyxcbiAgICAgICAgcm91dGVQcm9wc1xuICAgICAgKVxuICAgICAgbGV0IHsgZXJyb3IsIHByb3BzLCBfX05fU1NHLCBfX05fU1NQIH0gPSByb3V0ZUluZm9cblxuICAgICAgLy8gaGFuZGxlIHJlZGlyZWN0IG9uIGNsaWVudC10cmFuc2l0aW9uXG4gICAgICBpZiAoKF9fTl9TU0cgfHwgX19OX1NTUCkgJiYgcHJvcHMpIHtcbiAgICAgICAgaWYgKChwcm9wcyBhcyBhbnkpLnBhZ2VQcm9wcyAmJiAocHJvcHMgYXMgYW55KS5wYWdlUHJvcHMuX19OX1JFRElSRUNUKSB7XG4gICAgICAgICAgY29uc3QgZGVzdGluYXRpb24gPSAocHJvcHMgYXMgYW55KS5wYWdlUHJvcHMuX19OX1JFRElSRUNUXG5cbiAgICAgICAgICAvLyBjaGVjayBpZiBkZXN0aW5hdGlvbiBpcyBpbnRlcm5hbCAocmVzb2x2ZXMgdG8gYSBwYWdlKSBhbmQgYXR0ZW1wdFxuICAgICAgICAgIC8vIGNsaWVudC1uYXZpZ2F0aW9uIGlmIGl0IGlzIGZhbGxpbmcgYmFjayB0byBoYXJkIG5hdmlnYXRpb24gaWZcbiAgICAgICAgICAvLyBpdCdzIG5vdFxuICAgICAgICAgIGlmIChkZXN0aW5hdGlvbi5zdGFydHNXaXRoKCcvJykpIHtcbiAgICAgICAgICAgIGNvbnN0IHBhcnNlZEhyZWYgPSBwYXJzZVJlbGF0aXZlVXJsKGRlc3RpbmF0aW9uKVxuICAgICAgICAgICAgcGFyc2VkSHJlZi5wYXRobmFtZSA9IHJlc29sdmVEeW5hbWljUm91dGUoXG4gICAgICAgICAgICAgIHBhcnNlZEhyZWYucGF0aG5hbWUsXG4gICAgICAgICAgICAgIHBhZ2VzXG4gICAgICAgICAgICApXG5cbiAgICAgICAgICAgIGlmIChwYWdlcy5pbmNsdWRlcyhwYXJzZWRIcmVmLnBhdGhuYW1lKSkge1xuICAgICAgICAgICAgICBjb25zdCB7IHVybDogbmV3VXJsLCBhczogbmV3QXMgfSA9IHByZXBhcmVVcmxBcyhcbiAgICAgICAgICAgICAgICB0aGlzLFxuICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uLFxuICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2hhbmdlKG1ldGhvZCwgbmV3VXJsLCBuZXdBcywgb3B0aW9ucylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGRlc3RpbmF0aW9uXG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKCgpID0+IHt9KVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pc1ByZXZpZXcgPSAhIXByb3BzLl9fTl9QUkVWSUVXXG5cbiAgICAgICAgLy8gaGFuZGxlIFNTRyBkYXRhIDQwNFxuICAgICAgICBpZiAocHJvcHMubm90Rm91bmQgPT09IFNTR19EQVRBX05PVF9GT1VORCkge1xuICAgICAgICAgIGxldCBub3RGb3VuZFJvdXRlXG5cbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5mZXRjaENvbXBvbmVudCgnLzQwNCcpXG4gICAgICAgICAgICBub3RGb3VuZFJvdXRlID0gJy80MDQnXG4gICAgICAgICAgfSBjYXRjaCAoXykge1xuICAgICAgICAgICAgbm90Rm91bmRSb3V0ZSA9ICcvX2Vycm9yJ1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJvdXRlSW5mbyA9IGF3YWl0IHRoaXMuZ2V0Um91dGVJbmZvKFxuICAgICAgICAgICAgbm90Rm91bmRSb3V0ZSxcbiAgICAgICAgICAgIG5vdEZvdW5kUm91dGUsXG4gICAgICAgICAgICBxdWVyeSxcbiAgICAgICAgICAgIGFzLFxuICAgICAgICAgICAgcmVzb2x2ZWRBcyxcbiAgICAgICAgICAgIHsgc2hhbGxvdzogZmFsc2UgfVxuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBSb3V0ZXIuZXZlbnRzLmVtaXQoJ2JlZm9yZUhpc3RvcnlDaGFuZ2UnLCBhcywgcm91dGVQcm9wcylcbiAgICAgIHRoaXMuY2hhbmdlU3RhdGUobWV0aG9kLCB1cmwsIGFzLCBvcHRpb25zKVxuXG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICBjb25zdCBhcHBDb21wOiBhbnkgPSB0aGlzLmNvbXBvbmVudHNbJy9fYXBwJ10uQ29tcG9uZW50XG4gICAgICAgIDsod2luZG93IGFzIGFueSkubmV4dC5pc1ByZXJlbmRlcmVkID1cbiAgICAgICAgICBhcHBDb21wLmdldEluaXRpYWxQcm9wcyA9PT0gYXBwQ29tcC5vcmlnR2V0SW5pdGlhbFByb3BzICYmXG4gICAgICAgICAgIShyb3V0ZUluZm8uQ29tcG9uZW50IGFzIGFueSkuZ2V0SW5pdGlhbFByb3BzXG4gICAgICB9XG5cbiAgICAgIC8vIHNoYWxsb3cgcm91dGluZyBpcyBvbmx5IGFsbG93ZWQgZm9yIHNhbWUgcGFnZSBVUkwgY2hhbmdlcy5cbiAgICAgIGNvbnN0IGlzVmFsaWRTaGFsbG93Um91dGUgPSBvcHRpb25zLnNoYWxsb3cgJiYgdGhpcy5yb3V0ZSA9PT0gcm91dGVcblxuICAgICAgaWYgKFxuICAgICAgICAob3B0aW9ucyBhcyBhbnkpLl9oICYmXG4gICAgICAgIHBhdGhuYW1lID09PSAnL19lcnJvcicgJiZcbiAgICAgICAgc2VsZi5fX05FWFRfREFUQV9fLnByb3BzPy5wYWdlUHJvcHM/LnN0YXR1c0NvZGUgPT09IDUwMCAmJlxuICAgICAgICBwcm9wcz8ucGFnZVByb3BzXG4gICAgICApIHtcbiAgICAgICAgLy8gZW5zdXJlIHN0YXR1c0NvZGUgaXMgc3RpbGwgY29ycmVjdCBmb3Igc3RhdGljIDUwMCBwYWdlXG4gICAgICAgIC8vIHdoZW4gdXBkYXRpbmcgcXVlcnkgaW5mb3JtYXRpb25cbiAgICAgICAgcHJvcHMucGFnZVByb3BzLnN0YXR1c0NvZGUgPSA1MDBcbiAgICAgIH1cblxuICAgICAgYXdhaXQgdGhpcy5zZXQoXG4gICAgICAgIHJvdXRlLFxuICAgICAgICBwYXRobmFtZSEsXG4gICAgICAgIHF1ZXJ5LFxuICAgICAgICBjbGVhbmVkQXMsXG4gICAgICAgIHJvdXRlSW5mbyxcbiAgICAgICAgZm9yY2VkU2Nyb2xsIHx8XG4gICAgICAgICAgKGlzVmFsaWRTaGFsbG93Um91dGUgfHwgIW9wdGlvbnMuc2Nyb2xsID8gbnVsbCA6IHsgeDogMCwgeTogMCB9KVxuICAgICAgKS5jYXRjaCgoZSkgPT4ge1xuICAgICAgICBpZiAoZS5jYW5jZWxsZWQpIGVycm9yID0gZXJyb3IgfHwgZVxuICAgICAgICBlbHNlIHRocm93IGVcbiAgICAgIH0pXG5cbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICBSb3V0ZXIuZXZlbnRzLmVtaXQoJ3JvdXRlQ2hhbmdlRXJyb3InLCBlcnJvciwgY2xlYW5lZEFzLCByb3V0ZVByb3BzKVxuICAgICAgICB0aHJvdyBlcnJvclxuICAgICAgfVxuXG4gICAgICBpZiAocHJvY2Vzcy5lbnYuX19ORVhUX0kxOE5fU1VQUE9SVCkge1xuICAgICAgICBpZiAodGhpcy5sb2NhbGUpIHtcbiAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQubGFuZyA9IHRoaXMubG9jYWxlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIFJvdXRlci5ldmVudHMuZW1pdCgncm91dGVDaGFuZ2VDb21wbGV0ZScsIGFzLCByb3V0ZVByb3BzKVxuXG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgaWYgKGVyci5jYW5jZWxsZWQpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgICB0aHJvdyBlcnJcbiAgICB9XG4gIH1cblxuICBjaGFuZ2VTdGF0ZShcbiAgICBtZXRob2Q6IEhpc3RvcnlNZXRob2QsXG4gICAgdXJsOiBzdHJpbmcsXG4gICAgYXM6IHN0cmluZyxcbiAgICBvcHRpb25zOiBUcmFuc2l0aW9uT3B0aW9ucyA9IHt9XG4gICk6IHZvaWQge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBpZiAodHlwZW9mIHdpbmRvdy5oaXN0b3J5ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICBjb25zb2xlLmVycm9yKGBXYXJuaW5nOiB3aW5kb3cuaGlzdG9yeSBpcyBub3QgYXZhaWxhYmxlLmApXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIHdpbmRvdy5oaXN0b3J5W21ldGhvZF0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYFdhcm5pbmc6IHdpbmRvdy5oaXN0b3J5LiR7bWV0aG9kfSBpcyBub3QgYXZhaWxhYmxlYClcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKG1ldGhvZCAhPT0gJ3B1c2hTdGF0ZScgfHwgZ2V0VVJMKCkgIT09IGFzKSB7XG4gICAgICB0aGlzLl9zaGFsbG93ID0gb3B0aW9ucy5zaGFsbG93XG4gICAgICB3aW5kb3cuaGlzdG9yeVttZXRob2RdKFxuICAgICAgICB7XG4gICAgICAgICAgdXJsLFxuICAgICAgICAgIGFzLFxuICAgICAgICAgIG9wdGlvbnMsXG4gICAgICAgICAgX19OOiB0cnVlLFxuICAgICAgICAgIGlkeDogdGhpcy5faWR4ID0gbWV0aG9kICE9PSAncHVzaFN0YXRlJyA/IHRoaXMuX2lkeCA6IHRoaXMuX2lkeCArIDEsXG4gICAgICAgIH0gYXMgSGlzdG9yeVN0YXRlLFxuICAgICAgICAvLyBNb3N0IGJyb3dzZXJzIGN1cnJlbnRseSBpZ25vcmVzIHRoaXMgcGFyYW1ldGVyLCBhbHRob3VnaCB0aGV5IG1heSB1c2UgaXQgaW4gdGhlIGZ1dHVyZS5cbiAgICAgICAgLy8gUGFzc2luZyB0aGUgZW1wdHkgc3RyaW5nIGhlcmUgc2hvdWxkIGJlIHNhZmUgYWdhaW5zdCBmdXR1cmUgY2hhbmdlcyB0byB0aGUgbWV0aG9kLlxuICAgICAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvSGlzdG9yeS9yZXBsYWNlU3RhdGVcbiAgICAgICAgJycsXG4gICAgICAgIGFzXG4gICAgICApXG4gICAgfVxuICB9XG5cbiAgYXN5bmMgaGFuZGxlUm91dGVJbmZvRXJyb3IoXG4gICAgZXJyOiBFcnJvciAmIHsgY29kZTogYW55OyBjYW5jZWxsZWQ6IGJvb2xlYW4gfSxcbiAgICBwYXRobmFtZTogc3RyaW5nLFxuICAgIHF1ZXJ5OiBQYXJzZWRVcmxRdWVyeSxcbiAgICBhczogc3RyaW5nLFxuICAgIHJvdXRlUHJvcHM6IFJvdXRlUHJvcGVydGllcyxcbiAgICBsb2FkRXJyb3JGYWlsPzogYm9vbGVhblxuICApOiBQcm9taXNlPENvbXBsZXRlUHJpdmF0ZVJvdXRlSW5mbz4ge1xuICAgIGlmIChlcnIuY2FuY2VsbGVkKSB7XG4gICAgICAvLyBidWJibGUgdXAgY2FuY2VsbGF0aW9uIGVycm9yc1xuICAgICAgdGhyb3cgZXJyXG4gICAgfVxuXG4gICAgaWYgKGlzQXNzZXRFcnJvcihlcnIpIHx8IGxvYWRFcnJvckZhaWwpIHtcbiAgICAgIFJvdXRlci5ldmVudHMuZW1pdCgncm91dGVDaGFuZ2VFcnJvcicsIGVyciwgYXMsIHJvdXRlUHJvcHMpXG5cbiAgICAgIC8vIElmIHdlIGNhbid0IGxvYWQgdGhlIHBhZ2UgaXQgY291bGQgYmUgb25lIG9mIGZvbGxvd2luZyByZWFzb25zXG4gICAgICAvLyAgMS4gUGFnZSBkb2Vzbid0IGV4aXN0c1xuICAgICAgLy8gIDIuIFBhZ2UgZG9lcyBleGlzdCBpbiBhIGRpZmZlcmVudCB6b25lXG4gICAgICAvLyAgMy4gSW50ZXJuYWwgZXJyb3Igd2hpbGUgbG9hZGluZyB0aGUgcGFnZVxuXG4gICAgICAvLyBTbywgZG9pbmcgYSBoYXJkIHJlbG9hZCBpcyB0aGUgcHJvcGVyIHdheSB0byBkZWFsIHdpdGggdGhpcy5cbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYXNcblxuICAgICAgLy8gQ2hhbmdpbmcgdGhlIFVSTCBkb2Vzbid0IGJsb2NrIGV4ZWN1dGluZyB0aGUgY3VycmVudCBjb2RlIHBhdGguXG4gICAgICAvLyBTbyBsZXQncyB0aHJvdyBhIGNhbmNlbGxhdGlvbiBlcnJvciBzdG9wIHRoZSByb3V0aW5nIGxvZ2ljLlxuICAgICAgdGhyb3cgYnVpbGRDYW5jZWxsYXRpb25FcnJvcigpXG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGxldCBDb21wb25lbnQ6IENvbXBvbmVudFR5cGVcbiAgICAgIGxldCBzdHlsZVNoZWV0czogU3R5bGVTaGVldFR1cGxlW11cbiAgICAgIGxldCBwcm9wczogUmVjb3JkPHN0cmluZywgYW55PiB8IHVuZGVmaW5lZFxuXG4gICAgICBpZiAoXG4gICAgICAgIHR5cGVvZiBDb21wb25lbnQhID09PSAndW5kZWZpbmVkJyB8fFxuICAgICAgICB0eXBlb2Ygc3R5bGVTaGVldHMhID09PSAndW5kZWZpbmVkJ1xuICAgICAgKSB7XG4gICAgICAgIDsoeyBwYWdlOiBDb21wb25lbnQsIHN0eWxlU2hlZXRzIH0gPSBhd2FpdCB0aGlzLmZldGNoQ29tcG9uZW50KFxuICAgICAgICAgICcvX2Vycm9yJ1xuICAgICAgICApKVxuICAgICAgfVxuXG4gICAgICBjb25zdCByb3V0ZUluZm86IENvbXBsZXRlUHJpdmF0ZVJvdXRlSW5mbyA9IHtcbiAgICAgICAgcHJvcHMsXG4gICAgICAgIENvbXBvbmVudCxcbiAgICAgICAgc3R5bGVTaGVldHMsXG4gICAgICAgIGVycixcbiAgICAgICAgZXJyb3I6IGVycixcbiAgICAgIH1cblxuICAgICAgaWYgKCFyb3V0ZUluZm8ucHJvcHMpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByb3V0ZUluZm8ucHJvcHMgPSBhd2FpdCB0aGlzLmdldEluaXRpYWxQcm9wcyhDb21wb25lbnQsIHtcbiAgICAgICAgICAgIGVycixcbiAgICAgICAgICAgIHBhdGhuYW1lLFxuICAgICAgICAgICAgcXVlcnksXG4gICAgICAgICAgfSBhcyBhbnkpXG4gICAgICAgIH0gY2F0Y2ggKGdpcEVycikge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGluIGVycm9yIHBhZ2UgYGdldEluaXRpYWxQcm9wc2A6ICcsIGdpcEVycilcbiAgICAgICAgICByb3V0ZUluZm8ucHJvcHMgPSB7fVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByb3V0ZUluZm9cbiAgICB9IGNhdGNoIChyb3V0ZUluZm9FcnIpIHtcbiAgICAgIHJldHVybiB0aGlzLmhhbmRsZVJvdXRlSW5mb0Vycm9yKFxuICAgICAgICByb3V0ZUluZm9FcnIsXG4gICAgICAgIHBhdGhuYW1lLFxuICAgICAgICBxdWVyeSxcbiAgICAgICAgYXMsXG4gICAgICAgIHJvdXRlUHJvcHMsXG4gICAgICAgIHRydWVcbiAgICAgIClcbiAgICB9XG4gIH1cblxuICBhc3luYyBnZXRSb3V0ZUluZm8oXG4gICAgcm91dGU6IHN0cmluZyxcbiAgICBwYXRobmFtZTogc3RyaW5nLFxuICAgIHF1ZXJ5OiBhbnksXG4gICAgYXM6IHN0cmluZyxcbiAgICByZXNvbHZlZEFzOiBzdHJpbmcsXG4gICAgcm91dGVQcm9wczogUm91dGVQcm9wZXJ0aWVzXG4gICk6IFByb21pc2U8UHJpdmF0ZVJvdXRlSW5mbz4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBleGlzdGluZ1JvdXRlSW5mbzogUHJpdmF0ZVJvdXRlSW5mbyB8IHVuZGVmaW5lZCA9IHRoaXMuY29tcG9uZW50c1tcbiAgICAgICAgcm91dGVcbiAgICAgIF1cbiAgICAgIGlmIChyb3V0ZVByb3BzLnNoYWxsb3cgJiYgZXhpc3RpbmdSb3V0ZUluZm8gJiYgdGhpcy5yb3V0ZSA9PT0gcm91dGUpIHtcbiAgICAgICAgcmV0dXJuIGV4aXN0aW5nUm91dGVJbmZvXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNhY2hlZFJvdXRlSW5mbzogQ29tcGxldGVQcml2YXRlUm91dGVJbmZvIHwgdW5kZWZpbmVkID1cbiAgICAgICAgZXhpc3RpbmdSb3V0ZUluZm8gJiYgJ2luaXRpYWwnIGluIGV4aXN0aW5nUm91dGVJbmZvXG4gICAgICAgICAgPyB1bmRlZmluZWRcbiAgICAgICAgICA6IGV4aXN0aW5nUm91dGVJbmZvXG4gICAgICBjb25zdCByb3V0ZUluZm86IENvbXBsZXRlUHJpdmF0ZVJvdXRlSW5mbyA9IGNhY2hlZFJvdXRlSW5mb1xuICAgICAgICA/IGNhY2hlZFJvdXRlSW5mb1xuICAgICAgICA6IGF3YWl0IHRoaXMuZmV0Y2hDb21wb25lbnQocm91dGUpLnRoZW4oKHJlcykgPT4gKHtcbiAgICAgICAgICAgIENvbXBvbmVudDogcmVzLnBhZ2UsXG4gICAgICAgICAgICBzdHlsZVNoZWV0czogcmVzLnN0eWxlU2hlZXRzLFxuICAgICAgICAgICAgX19OX1NTRzogcmVzLm1vZC5fX05fU1NHLFxuICAgICAgICAgICAgX19OX1NTUDogcmVzLm1vZC5fX05fU1NQLFxuICAgICAgICAgIH0pKVxuXG4gICAgICBjb25zdCB7IENvbXBvbmVudCwgX19OX1NTRywgX19OX1NTUCB9ID0gcm91dGVJbmZvXG5cbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIGNvbnN0IHsgaXNWYWxpZEVsZW1lbnRUeXBlIH0gPSByZXF1aXJlKCdyZWFjdC1pcycpXG4gICAgICAgIGlmICghaXNWYWxpZEVsZW1lbnRUeXBlKENvbXBvbmVudCkpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICBgVGhlIGRlZmF1bHQgZXhwb3J0IGlzIG5vdCBhIFJlYWN0IENvbXBvbmVudCBpbiBwYWdlOiBcIiR7cGF0aG5hbWV9XCJgXG4gICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxldCBkYXRhSHJlZjogc3RyaW5nIHwgdW5kZWZpbmVkXG5cbiAgICAgIGlmIChfX05fU1NHIHx8IF9fTl9TU1ApIHtcbiAgICAgICAgZGF0YUhyZWYgPSB0aGlzLnBhZ2VMb2FkZXIuZ2V0RGF0YUhyZWYoXG4gICAgICAgICAgZm9ybWF0V2l0aFZhbGlkYXRpb24oeyBwYXRobmFtZSwgcXVlcnkgfSksXG4gICAgICAgICAgcmVzb2x2ZWRBcyxcbiAgICAgICAgICBfX05fU1NHLFxuICAgICAgICAgIHRoaXMubG9jYWxlXG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgY29uc3QgcHJvcHMgPSBhd2FpdCB0aGlzLl9nZXREYXRhPENvbXBsZXRlUHJpdmF0ZVJvdXRlSW5mbz4oKCkgPT5cbiAgICAgICAgX19OX1NTR1xuICAgICAgICAgID8gdGhpcy5fZ2V0U3RhdGljRGF0YShkYXRhSHJlZiEpXG4gICAgICAgICAgOiBfX05fU1NQXG4gICAgICAgICAgPyB0aGlzLl9nZXRTZXJ2ZXJEYXRhKGRhdGFIcmVmISlcbiAgICAgICAgICA6IHRoaXMuZ2V0SW5pdGlhbFByb3BzKFxuICAgICAgICAgICAgICBDb21wb25lbnQsXG4gICAgICAgICAgICAgIC8vIHdlIHByb3ZpZGUgQXBwVHJlZSBsYXRlciBzbyB0aGlzIG5lZWRzIHRvIGJlIGBhbnlgXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBwYXRobmFtZSxcbiAgICAgICAgICAgICAgICBxdWVyeSxcbiAgICAgICAgICAgICAgICBhc1BhdGg6IGFzLFxuICAgICAgICAgICAgICAgIGxvY2FsZTogdGhpcy5sb2NhbGUsXG4gICAgICAgICAgICAgICAgbG9jYWxlczogdGhpcy5sb2NhbGVzLFxuICAgICAgICAgICAgICAgIGRlZmF1bHRMb2NhbGU6IHRoaXMuZGVmYXVsdExvY2FsZSxcbiAgICAgICAgICAgICAgfSBhcyBhbnlcbiAgICAgICAgICAgIClcbiAgICAgIClcblxuICAgICAgcm91dGVJbmZvLnByb3BzID0gcHJvcHNcbiAgICAgIHRoaXMuY29tcG9uZW50c1tyb3V0ZV0gPSByb3V0ZUluZm9cbiAgICAgIHJldHVybiByb3V0ZUluZm9cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiB0aGlzLmhhbmRsZVJvdXRlSW5mb0Vycm9yKGVyciwgcGF0aG5hbWUsIHF1ZXJ5LCBhcywgcm91dGVQcm9wcylcbiAgICB9XG4gIH1cblxuICBzZXQoXG4gICAgcm91dGU6IHN0cmluZyxcbiAgICBwYXRobmFtZTogc3RyaW5nLFxuICAgIHF1ZXJ5OiBQYXJzZWRVcmxRdWVyeSxcbiAgICBhczogc3RyaW5nLFxuICAgIGRhdGE6IFByaXZhdGVSb3V0ZUluZm8sXG4gICAgcmVzZXRTY3JvbGw6IHsgeDogbnVtYmVyOyB5OiBudW1iZXIgfSB8IG51bGxcbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdGhpcy5pc0ZhbGxiYWNrID0gZmFsc2VcblxuICAgIHRoaXMucm91dGUgPSByb3V0ZVxuICAgIHRoaXMucGF0aG5hbWUgPSBwYXRobmFtZVxuICAgIHRoaXMucXVlcnkgPSBxdWVyeVxuICAgIHRoaXMuYXNQYXRoID0gYXNcbiAgICByZXR1cm4gdGhpcy5ub3RpZnkoZGF0YSwgcmVzZXRTY3JvbGwpXG4gIH1cblxuICAvKipcbiAgICogQ2FsbGJhY2sgdG8gZXhlY3V0ZSBiZWZvcmUgcmVwbGFjaW5nIHJvdXRlciBzdGF0ZVxuICAgKiBAcGFyYW0gY2IgY2FsbGJhY2sgdG8gYmUgZXhlY3V0ZWRcbiAgICovXG4gIGJlZm9yZVBvcFN0YXRlKGNiOiBCZWZvcmVQb3BTdGF0ZUNhbGxiYWNrKSB7XG4gICAgdGhpcy5fYnBzID0gY2JcbiAgfVxuXG4gIG9ubHlBSGFzaENoYW5nZShhczogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgaWYgKCF0aGlzLmFzUGF0aCkgcmV0dXJuIGZhbHNlXG4gICAgY29uc3QgW29sZFVybE5vSGFzaCwgb2xkSGFzaF0gPSB0aGlzLmFzUGF0aC5zcGxpdCgnIycpXG4gICAgY29uc3QgW25ld1VybE5vSGFzaCwgbmV3SGFzaF0gPSBhcy5zcGxpdCgnIycpXG5cbiAgICAvLyBNYWtlcyBzdXJlIHdlIHNjcm9sbCB0byB0aGUgcHJvdmlkZWQgaGFzaCBpZiB0aGUgdXJsL2hhc2ggYXJlIHRoZSBzYW1lXG4gICAgaWYgKG5ld0hhc2ggJiYgb2xkVXJsTm9IYXNoID09PSBuZXdVcmxOb0hhc2ggJiYgb2xkSGFzaCA9PT0gbmV3SGFzaCkge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG5cbiAgICAvLyBJZiB0aGUgdXJscyBhcmUgY2hhbmdlLCB0aGVyZSdzIG1vcmUgdGhhbiBhIGhhc2ggY2hhbmdlXG4gICAgaWYgKG9sZFVybE5vSGFzaCAhPT0gbmV3VXJsTm9IYXNoKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICAvLyBJZiB0aGUgaGFzaCBoYXMgY2hhbmdlZCwgdGhlbiBpdCdzIGEgaGFzaCBvbmx5IGNoYW5nZS5cbiAgICAvLyBUaGlzIGNoZWNrIGlzIG5lY2Vzc2FyeSB0byBoYW5kbGUgYm90aCB0aGUgZW50ZXIgYW5kXG4gICAgLy8gbGVhdmUgaGFzaCA9PT0gJycgY2FzZXMuIFRoZSBpZGVudGl0eSBjYXNlIGZhbGxzIHRocm91Z2hcbiAgICAvLyBhbmQgaXMgdHJlYXRlZCBhcyBhIG5leHQgcmVsb2FkLlxuICAgIHJldHVybiBvbGRIYXNoICE9PSBuZXdIYXNoXG4gIH1cblxuICBzY3JvbGxUb0hhc2goYXM6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IFssIGhhc2hdID0gYXMuc3BsaXQoJyMnKVxuICAgIC8vIFNjcm9sbCB0byB0b3AgaWYgdGhlIGhhc2ggaXMganVzdCBgI2Agd2l0aCBubyB2YWx1ZSBvciBgI3RvcGBcbiAgICAvLyBUbyBtaXJyb3IgYnJvd3NlcnNcbiAgICBpZiAoaGFzaCA9PT0gJycgfHwgaGFzaCA9PT0gJ3RvcCcpIHtcbiAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCAwKVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgLy8gRmlyc3Qgd2UgY2hlY2sgaWYgdGhlIGVsZW1lbnQgYnkgaWQgaXMgZm91bmRcbiAgICBjb25zdCBpZEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaGFzaClcbiAgICBpZiAoaWRFbCkge1xuICAgICAgaWRFbC5zY3JvbGxJbnRvVmlldygpXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgLy8gSWYgdGhlcmUncyBubyBlbGVtZW50IHdpdGggdGhlIGlkLCB3ZSBjaGVjayB0aGUgYG5hbWVgIHByb3BlcnR5XG4gICAgLy8gVG8gbWlycm9yIGJyb3dzZXJzXG4gICAgY29uc3QgbmFtZUVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUoaGFzaClbMF1cbiAgICBpZiAobmFtZUVsKSB7XG4gICAgICBuYW1lRWwuc2Nyb2xsSW50b1ZpZXcoKVxuICAgIH1cbiAgfVxuXG4gIHVybElzTmV3KGFzUGF0aDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuYXNQYXRoICE9PSBhc1BhdGhcbiAgfVxuXG4gIC8qKlxuICAgKiBQcmVmZXRjaCBwYWdlIGNvZGUsIHlvdSBtYXkgd2FpdCBmb3IgdGhlIGRhdGEgZHVyaW5nIHBhZ2UgcmVuZGVyaW5nLlxuICAgKiBUaGlzIGZlYXR1cmUgb25seSB3b3JrcyBpbiBwcm9kdWN0aW9uIVxuICAgKiBAcGFyYW0gdXJsIHRoZSBocmVmIG9mIHByZWZldGNoZWQgcGFnZVxuICAgKiBAcGFyYW0gYXNQYXRoIHRoZSBhcyBwYXRoIG9mIHRoZSBwcmVmZXRjaGVkIHBhZ2VcbiAgICovXG4gIGFzeW5jIHByZWZldGNoKFxuICAgIHVybDogc3RyaW5nLFxuICAgIGFzUGF0aDogc3RyaW5nID0gdXJsLFxuICAgIG9wdGlvbnM6IFByZWZldGNoT3B0aW9ucyA9IHt9XG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIGxldCBwYXJzZWQgPSBwYXJzZVJlbGF0aXZlVXJsKHVybClcblxuICAgIGxldCB7IHBhdGhuYW1lIH0gPSBwYXJzZWRcblxuICAgIGlmIChwcm9jZXNzLmVudi5fX05FWFRfSTE4Tl9TVVBQT1JUKSB7XG4gICAgICBpZiAob3B0aW9ucy5sb2NhbGUgPT09IGZhbHNlKSB7XG4gICAgICAgIHBhdGhuYW1lID0gbm9ybWFsaXplTG9jYWxlUGF0aCEocGF0aG5hbWUsIHRoaXMubG9jYWxlcykucGF0aG5hbWVcbiAgICAgICAgcGFyc2VkLnBhdGhuYW1lID0gcGF0aG5hbWVcbiAgICAgICAgdXJsID0gZm9ybWF0V2l0aFZhbGlkYXRpb24ocGFyc2VkKVxuXG4gICAgICAgIGxldCBwYXJzZWRBcyA9IHBhcnNlUmVsYXRpdmVVcmwoYXNQYXRoKVxuICAgICAgICBjb25zdCBsb2NhbGVQYXRoUmVzdWx0ID0gbm9ybWFsaXplTG9jYWxlUGF0aCEoXG4gICAgICAgICAgcGFyc2VkQXMucGF0aG5hbWUsXG4gICAgICAgICAgdGhpcy5sb2NhbGVzXG4gICAgICAgIClcbiAgICAgICAgcGFyc2VkQXMucGF0aG5hbWUgPSBsb2NhbGVQYXRoUmVzdWx0LnBhdGhuYW1lXG4gICAgICAgIG9wdGlvbnMubG9jYWxlID0gbG9jYWxlUGF0aFJlc3VsdC5kZXRlY3RlZExvY2FsZSB8fCB0aGlzLmRlZmF1bHRMb2NhbGVcbiAgICAgICAgYXNQYXRoID0gZm9ybWF0V2l0aFZhbGlkYXRpb24ocGFyc2VkQXMpXG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgcGFnZXMgPSBhd2FpdCB0aGlzLnBhZ2VMb2FkZXIuZ2V0UGFnZUxpc3QoKVxuICAgIGxldCByZXNvbHZlZEFzID0gYXNQYXRoXG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuX19ORVhUX0hBU19SRVdSSVRFUyAmJiBhc1BhdGguc3RhcnRzV2l0aCgnLycpKSB7XG4gICAgICBsZXQgcmV3cml0ZXM6IGFueVxuICAgICAgOyh7IF9fcmV3cml0ZXM6IHJld3JpdGVzIH0gPSBhd2FpdCBnZXRDbGllbnRCdWlsZE1hbmlmZXN0KCkpXG5cbiAgICAgIGNvbnN0IHJld3JpdGVzUmVzdWx0ID0gcmVzb2x2ZVJld3JpdGVzKFxuICAgICAgICBhZGRCYXNlUGF0aChhZGRMb2NhbGUoYXNQYXRoLCB0aGlzLmxvY2FsZSkpLFxuICAgICAgICBwYWdlcyxcbiAgICAgICAgcmV3cml0ZXMsXG4gICAgICAgIHBhcnNlZC5xdWVyeSxcbiAgICAgICAgKHA6IHN0cmluZykgPT4gcmVzb2x2ZUR5bmFtaWNSb3V0ZShwLCBwYWdlcyksXG4gICAgICAgIHRoaXMubG9jYWxlc1xuICAgICAgKVxuICAgICAgcmVzb2x2ZWRBcyA9IGRlbExvY2FsZShkZWxCYXNlUGF0aChyZXdyaXRlc1Jlc3VsdC5hc1BhdGgpLCB0aGlzLmxvY2FsZSlcblxuICAgICAgaWYgKHJld3JpdGVzUmVzdWx0Lm1hdGNoZWRQYWdlICYmIHJld3JpdGVzUmVzdWx0LnJlc29sdmVkSHJlZikge1xuICAgICAgICAvLyBpZiB0aGlzIGRpcmVjdGx5IG1hdGNoZXMgYSBwYWdlIHdlIG5lZWQgdG8gdXBkYXRlIHRoZSBocmVmIHRvXG4gICAgICAgIC8vIGFsbG93IHRoZSBjb3JyZWN0IHBhZ2UgY2h1bmsgdG8gYmUgbG9hZGVkXG4gICAgICAgIHBhdGhuYW1lID0gcmV3cml0ZXNSZXN1bHQucmVzb2x2ZWRIcmVmXG4gICAgICAgIHBhcnNlZC5wYXRobmFtZSA9IHBhdGhuYW1lXG4gICAgICAgIHVybCA9IGZvcm1hdFdpdGhWYWxpZGF0aW9uKHBhcnNlZClcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcGFyc2VkLnBhdGhuYW1lID0gcmVzb2x2ZUR5bmFtaWNSb3V0ZShwYXJzZWQucGF0aG5hbWUsIHBhZ2VzKVxuXG4gICAgICBpZiAocGFyc2VkLnBhdGhuYW1lICE9PSBwYXRobmFtZSkge1xuICAgICAgICBwYXRobmFtZSA9IHBhcnNlZC5wYXRobmFtZVxuICAgICAgICB1cmwgPSBmb3JtYXRXaXRoVmFsaWRhdGlvbihwYXJzZWQpXG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHJvdXRlID0gcmVtb3ZlUGF0aFRyYWlsaW5nU2xhc2gocGF0aG5hbWUpXG5cbiAgICAvLyBQcmVmZXRjaCBpcyBub3Qgc3VwcG9ydGVkIGluIGRldmVsb3BtZW50IG1vZGUgYmVjYXVzZSBpdCB3b3VsZCB0cmlnZ2VyIG9uLWRlbWFuZC1lbnRyaWVzXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgIHRoaXMucGFnZUxvYWRlci5faXNTc2cocm91dGUpLnRoZW4oKGlzU3NnOiBib29sZWFuKSA9PiB7XG4gICAgICAgIHJldHVybiBpc1NzZ1xuICAgICAgICAgID8gdGhpcy5fZ2V0U3RhdGljRGF0YShcbiAgICAgICAgICAgICAgdGhpcy5wYWdlTG9hZGVyLmdldERhdGFIcmVmKFxuICAgICAgICAgICAgICAgIHVybCxcbiAgICAgICAgICAgICAgICByZXNvbHZlZEFzLFxuICAgICAgICAgICAgICAgIHRydWUsXG4gICAgICAgICAgICAgICAgdHlwZW9mIG9wdGlvbnMubG9jYWxlICE9PSAndW5kZWZpbmVkJ1xuICAgICAgICAgICAgICAgICAgPyBvcHRpb25zLmxvY2FsZVxuICAgICAgICAgICAgICAgICAgOiB0aGlzLmxvY2FsZVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICApXG4gICAgICAgICAgOiBmYWxzZVxuICAgICAgfSksXG4gICAgICB0aGlzLnBhZ2VMb2FkZXJbb3B0aW9ucy5wcmlvcml0eSA/ICdsb2FkUGFnZScgOiAncHJlZmV0Y2gnXShyb3V0ZSksXG4gICAgXSlcbiAgfVxuXG4gIGFzeW5jIGZldGNoQ29tcG9uZW50KHJvdXRlOiBzdHJpbmcpOiBQcm9taXNlPEdvb2RQYWdlQ2FjaGU+IHtcbiAgICBsZXQgY2FuY2VsbGVkID0gZmFsc2VcbiAgICBjb25zdCBjYW5jZWwgPSAodGhpcy5jbGMgPSAoKSA9PiB7XG4gICAgICBjYW5jZWxsZWQgPSB0cnVlXG4gICAgfSlcblxuICAgIGNvbnN0IGNvbXBvbmVudFJlc3VsdCA9IGF3YWl0IHRoaXMucGFnZUxvYWRlci5sb2FkUGFnZShyb3V0ZSlcblxuICAgIGlmIChjYW5jZWxsZWQpIHtcbiAgICAgIGNvbnN0IGVycm9yOiBhbnkgPSBuZXcgRXJyb3IoXG4gICAgICAgIGBBYm9ydCBmZXRjaGluZyBjb21wb25lbnQgZm9yIHJvdXRlOiBcIiR7cm91dGV9XCJgXG4gICAgICApXG4gICAgICBlcnJvci5jYW5jZWxsZWQgPSB0cnVlXG4gICAgICB0aHJvdyBlcnJvclxuICAgIH1cblxuICAgIGlmIChjYW5jZWwgPT09IHRoaXMuY2xjKSB7XG4gICAgICB0aGlzLmNsYyA9IG51bGxcbiAgICB9XG5cbiAgICByZXR1cm4gY29tcG9uZW50UmVzdWx0XG4gIH1cblxuICBfZ2V0RGF0YTxUPihmbjogKCkgPT4gUHJvbWlzZTxUPik6IFByb21pc2U8VD4ge1xuICAgIGxldCBjYW5jZWxsZWQgPSBmYWxzZVxuICAgIGNvbnN0IGNhbmNlbCA9ICgpID0+IHtcbiAgICAgIGNhbmNlbGxlZCA9IHRydWVcbiAgICB9XG4gICAgdGhpcy5jbGMgPSBjYW5jZWxcbiAgICByZXR1cm4gZm4oKS50aGVuKChkYXRhKSA9PiB7XG4gICAgICBpZiAoY2FuY2VsID09PSB0aGlzLmNsYykge1xuICAgICAgICB0aGlzLmNsYyA9IG51bGxcbiAgICAgIH1cblxuICAgICAgaWYgKGNhbmNlbGxlZCkge1xuICAgICAgICBjb25zdCBlcnI6IGFueSA9IG5ldyBFcnJvcignTG9hZGluZyBpbml0aWFsIHByb3BzIGNhbmNlbGxlZCcpXG4gICAgICAgIGVyci5jYW5jZWxsZWQgPSB0cnVlXG4gICAgICAgIHRocm93IGVyclxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZGF0YVxuICAgIH0pXG4gIH1cblxuICBfZ2V0U3RhdGljRGF0YShkYXRhSHJlZjogc3RyaW5nKTogUHJvbWlzZTxvYmplY3Q+IHtcbiAgICBjb25zdCB7IGhyZWY6IGNhY2hlS2V5IH0gPSBuZXcgVVJMKGRhdGFIcmVmLCB3aW5kb3cubG9jYXRpb24uaHJlZilcbiAgICBpZiAoXG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nICYmXG4gICAgICAhdGhpcy5pc1ByZXZpZXcgJiZcbiAgICAgIHRoaXMuc2RjW2NhY2hlS2V5XVxuICAgICkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLnNkY1tjYWNoZUtleV0pXG4gICAgfVxuICAgIHJldHVybiBmZXRjaE5leHREYXRhKGRhdGFIcmVmLCB0aGlzLmlzU3NyKS50aGVuKChkYXRhKSA9PiB7XG4gICAgICB0aGlzLnNkY1tjYWNoZUtleV0gPSBkYXRhXG4gICAgICByZXR1cm4gZGF0YVxuICAgIH0pXG4gIH1cblxuICBfZ2V0U2VydmVyRGF0YShkYXRhSHJlZjogc3RyaW5nKTogUHJvbWlzZTxvYmplY3Q+IHtcbiAgICBjb25zdCB7IGhyZWY6IHJlc291cmNlS2V5IH0gPSBuZXcgVVJMKGRhdGFIcmVmLCB3aW5kb3cubG9jYXRpb24uaHJlZilcbiAgICBpZiAodGhpcy5zZHJbcmVzb3VyY2VLZXldKSB7XG4gICAgICByZXR1cm4gdGhpcy5zZHJbcmVzb3VyY2VLZXldXG4gICAgfVxuICAgIHJldHVybiAodGhpcy5zZHJbcmVzb3VyY2VLZXldID0gZmV0Y2hOZXh0RGF0YShkYXRhSHJlZiwgdGhpcy5pc1NzcilcbiAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLnNkcltyZXNvdXJjZUtleV1cbiAgICAgICAgcmV0dXJuIGRhdGFcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICBkZWxldGUgdGhpcy5zZHJbcmVzb3VyY2VLZXldXG4gICAgICAgIHRocm93IGVyclxuICAgICAgfSkpXG4gIH1cblxuICBnZXRJbml0aWFsUHJvcHMoXG4gICAgQ29tcG9uZW50OiBDb21wb25lbnRUeXBlLFxuICAgIGN0eDogTmV4dFBhZ2VDb250ZXh0XG4gICk6IFByb21pc2U8YW55PiB7XG4gICAgY29uc3QgeyBDb21wb25lbnQ6IEFwcCB9ID0gdGhpcy5jb21wb25lbnRzWycvX2FwcCddXG4gICAgY29uc3QgQXBwVHJlZSA9IHRoaXMuX3dyYXBBcHAoQXBwIGFzIEFwcENvbXBvbmVudClcbiAgICBjdHguQXBwVHJlZSA9IEFwcFRyZWVcbiAgICByZXR1cm4gbG9hZEdldEluaXRpYWxQcm9wczxBcHBDb250ZXh0VHlwZTxSb3V0ZXI+PihBcHAsIHtcbiAgICAgIEFwcFRyZWUsXG4gICAgICBDb21wb25lbnQsXG4gICAgICByb3V0ZXI6IHRoaXMsXG4gICAgICBjdHgsXG4gICAgfSlcbiAgfVxuXG4gIGFib3J0Q29tcG9uZW50TG9hZChhczogc3RyaW5nLCByb3V0ZVByb3BzOiBSb3V0ZVByb3BlcnRpZXMpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jbGMpIHtcbiAgICAgIFJvdXRlci5ldmVudHMuZW1pdChcbiAgICAgICAgJ3JvdXRlQ2hhbmdlRXJyb3InLFxuICAgICAgICBidWlsZENhbmNlbGxhdGlvbkVycm9yKCksXG4gICAgICAgIGFzLFxuICAgICAgICByb3V0ZVByb3BzXG4gICAgICApXG4gICAgICB0aGlzLmNsYygpXG4gICAgICB0aGlzLmNsYyA9IG51bGxcbiAgICB9XG4gIH1cblxuICBub3RpZnkoXG4gICAgZGF0YTogUHJpdmF0ZVJvdXRlSW5mbyxcbiAgICByZXNldFNjcm9sbDogeyB4OiBudW1iZXI7IHk6IG51bWJlciB9IHwgbnVsbFxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5zdWIoXG4gICAgICBkYXRhLFxuICAgICAgdGhpcy5jb21wb25lbnRzWycvX2FwcCddLkNvbXBvbmVudCBhcyBBcHBDb21wb25lbnQsXG4gICAgICByZXNldFNjcm9sbFxuICAgIClcbiAgfVxufVxuIiwiLy8gRm9ybWF0IGZ1bmN0aW9uIG1vZGlmaWVkIGZyb20gbm9kZWpzXG4vLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IHsgVXJsT2JqZWN0IH0gZnJvbSAndXJsJ1xuaW1wb3J0IHsgUGFyc2VkVXJsUXVlcnkgfSBmcm9tICdxdWVyeXN0cmluZydcbmltcG9ydCAqIGFzIHF1ZXJ5c3RyaW5nIGZyb20gJy4vcXVlcnlzdHJpbmcnXG5cbmNvbnN0IHNsYXNoZWRQcm90b2NvbHMgPSAvaHR0cHM/fGZ0cHxnb3BoZXJ8ZmlsZS9cblxuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdFVybCh1cmxPYmo6IFVybE9iamVjdCkge1xuICBsZXQgeyBhdXRoLCBob3N0bmFtZSB9ID0gdXJsT2JqXG4gIGxldCBwcm90b2NvbCA9IHVybE9iai5wcm90b2NvbCB8fCAnJ1xuICBsZXQgcGF0aG5hbWUgPSB1cmxPYmoucGF0aG5hbWUgfHwgJydcbiAgbGV0IGhhc2ggPSB1cmxPYmouaGFzaCB8fCAnJ1xuICBsZXQgcXVlcnkgPSB1cmxPYmoucXVlcnkgfHwgJydcbiAgbGV0IGhvc3Q6IHN0cmluZyB8IGZhbHNlID0gZmFsc2VcblxuICBhdXRoID0gYXV0aCA/IGVuY29kZVVSSUNvbXBvbmVudChhdXRoKS5yZXBsYWNlKC8lM0EvaSwgJzonKSArICdAJyA6ICcnXG5cbiAgaWYgKHVybE9iai5ob3N0KSB7XG4gICAgaG9zdCA9IGF1dGggKyB1cmxPYmouaG9zdFxuICB9IGVsc2UgaWYgKGhvc3RuYW1lKSB7XG4gICAgaG9zdCA9IGF1dGggKyAofmhvc3RuYW1lLmluZGV4T2YoJzonKSA/IGBbJHtob3N0bmFtZX1dYCA6IGhvc3RuYW1lKVxuICAgIGlmICh1cmxPYmoucG9ydCkge1xuICAgICAgaG9zdCArPSAnOicgKyB1cmxPYmoucG9ydFxuICAgIH1cbiAgfVxuXG4gIGlmIChxdWVyeSAmJiB0eXBlb2YgcXVlcnkgPT09ICdvYmplY3QnKSB7XG4gICAgcXVlcnkgPSBTdHJpbmcocXVlcnlzdHJpbmcudXJsUXVlcnlUb1NlYXJjaFBhcmFtcyhxdWVyeSBhcyBQYXJzZWRVcmxRdWVyeSkpXG4gIH1cblxuICBsZXQgc2VhcmNoID0gdXJsT2JqLnNlYXJjaCB8fCAocXVlcnkgJiYgYD8ke3F1ZXJ5fWApIHx8ICcnXG5cbiAgaWYgKHByb3RvY29sICYmIHByb3RvY29sLnN1YnN0cigtMSkgIT09ICc6JykgcHJvdG9jb2wgKz0gJzonXG5cbiAgaWYgKFxuICAgIHVybE9iai5zbGFzaGVzIHx8XG4gICAgKCghcHJvdG9jb2wgfHwgc2xhc2hlZFByb3RvY29scy50ZXN0KHByb3RvY29sKSkgJiYgaG9zdCAhPT0gZmFsc2UpXG4gICkge1xuICAgIGhvc3QgPSAnLy8nICsgKGhvc3QgfHwgJycpXG4gICAgaWYgKHBhdGhuYW1lICYmIHBhdGhuYW1lWzBdICE9PSAnLycpIHBhdGhuYW1lID0gJy8nICsgcGF0aG5hbWVcbiAgfSBlbHNlIGlmICghaG9zdCkge1xuICAgIGhvc3QgPSAnJ1xuICB9XG5cbiAgaWYgKGhhc2ggJiYgaGFzaFswXSAhPT0gJyMnKSBoYXNoID0gJyMnICsgaGFzaFxuICBpZiAoc2VhcmNoICYmIHNlYXJjaFswXSAhPT0gJz8nKSBzZWFyY2ggPSAnPycgKyBzZWFyY2hcblxuICBwYXRobmFtZSA9IHBhdGhuYW1lLnJlcGxhY2UoL1s/I10vZywgZW5jb2RlVVJJQ29tcG9uZW50KVxuICBzZWFyY2ggPSBzZWFyY2gucmVwbGFjZSgnIycsICclMjMnKVxuXG4gIHJldHVybiBgJHtwcm90b2NvbH0ke2hvc3R9JHtwYXRobmFtZX0ke3NlYXJjaH0ke2hhc2h9YFxufVxuIiwiLy8gSWRlbnRpZnkgL1twYXJhbV0vIGluIHJvdXRlIHN0cmluZ1xuY29uc3QgVEVTVF9ST1VURSA9IC9cXC9cXFtbXi9dKz9cXF0oPz1cXC98JCkvXG5cbmV4cG9ydCBmdW5jdGlvbiBpc0R5bmFtaWNSb3V0ZShyb3V0ZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gIHJldHVybiBURVNUX1JPVVRFLnRlc3Qocm91dGUpXG59XG4iLCJpbXBvcnQgeyBnZXRMb2NhdGlvbk9yaWdpbiB9IGZyb20gJy4uLy4uL3V0aWxzJ1xuaW1wb3J0IHsgc2VhcmNoUGFyYW1zVG9VcmxRdWVyeSB9IGZyb20gJy4vcXVlcnlzdHJpbmcnXG5cbi8qKlxuICogUGFyc2VzIHBhdGgtcmVsYXRpdmUgdXJscyAoZS5nLiBgL2hlbGxvL3dvcmxkP2Zvbz1iYXJgKS4gSWYgdXJsIGlzbid0IHBhdGgtcmVsYXRpdmVcbiAqIChlLmcuIGAuL2hlbGxvYCkgdGhlbiBhdCBsZWFzdCBiYXNlIG11c3QgYmUuXG4gKiBBYnNvbHV0ZSB1cmxzIGFyZSByZWplY3RlZCB3aXRoIG9uZSBleGNlcHRpb24sIGluIHRoZSBicm93c2VyLCBhYnNvbHV0ZSB1cmxzIHRoYXQgYXJlIG9uXG4gKiB0aGUgY3VycmVudCBvcmlnaW4gd2lsbCBiZSBwYXJzZWQgYXMgcmVsYXRpdmVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlUmVsYXRpdmVVcmwodXJsOiBzdHJpbmcsIGJhc2U/OiBzdHJpbmcpIHtcbiAgY29uc3QgZ2xvYmFsQmFzZSA9IG5ldyBVUkwoXG4gICAgdHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgPyAnaHR0cDovL24nIDogZ2V0TG9jYXRpb25PcmlnaW4oKVxuICApXG4gIGNvbnN0IHJlc29sdmVkQmFzZSA9IGJhc2UgPyBuZXcgVVJMKGJhc2UsIGdsb2JhbEJhc2UpIDogZ2xvYmFsQmFzZVxuICBjb25zdCB7IHBhdGhuYW1lLCBzZWFyY2hQYXJhbXMsIHNlYXJjaCwgaGFzaCwgaHJlZiwgb3JpZ2luIH0gPSBuZXcgVVJMKFxuICAgIHVybCxcbiAgICByZXNvbHZlZEJhc2VcbiAgKVxuICBpZiAob3JpZ2luICE9PSBnbG9iYWxCYXNlLm9yaWdpbikge1xuICAgIHRocm93IG5ldyBFcnJvcihgaW52YXJpYW50OiBpbnZhbGlkIHJlbGF0aXZlIFVSTCwgcm91dGVyIHJlY2VpdmVkICR7dXJsfWApXG4gIH1cbiAgcmV0dXJuIHtcbiAgICBwYXRobmFtZSxcbiAgICBxdWVyeTogc2VhcmNoUGFyYW1zVG9VcmxRdWVyeShzZWFyY2hQYXJhbXMpLFxuICAgIHNlYXJjaCxcbiAgICBoYXNoLFxuICAgIGhyZWY6IGhyZWYuc2xpY2UoZ2xvYmFsQmFzZS5vcmlnaW4ubGVuZ3RoKSxcbiAgfVxufVxuIiwiaW1wb3J0ICogYXMgcGF0aFRvUmVnZXhwIGZyb20gJ25leHQvZGlzdC9jb21waWxlZC9wYXRoLXRvLXJlZ2V4cCdcblxuZXhwb3J0IHsgcGF0aFRvUmVnZXhwIH1cblxuZXhwb3J0IGNvbnN0IG1hdGNoZXJPcHRpb25zOiBwYXRoVG9SZWdleHAuVG9rZW5zVG9SZWdleHBPcHRpb25zICZcbiAgcGF0aFRvUmVnZXhwLlBhcnNlT3B0aW9ucyA9IHtcbiAgc2Vuc2l0aXZlOiBmYWxzZSxcbiAgZGVsaW1pdGVyOiAnLycsXG59XG5cbmV4cG9ydCBjb25zdCBjdXN0b21Sb3V0ZU1hdGNoZXJPcHRpb25zOiBwYXRoVG9SZWdleHAuVG9rZW5zVG9SZWdleHBPcHRpb25zICZcbiAgcGF0aFRvUmVnZXhwLlBhcnNlT3B0aW9ucyA9IHtcbiAgLi4ubWF0Y2hlck9wdGlvbnMsXG4gIHN0cmljdDogdHJ1ZSxcbn1cblxuZXhwb3J0IGRlZmF1bHQgKGN1c3RvbVJvdXRlID0gZmFsc2UpID0+IHtcbiAgcmV0dXJuIChwYXRoOiBzdHJpbmcpID0+IHtcbiAgICBjb25zdCBrZXlzOiBwYXRoVG9SZWdleHAuS2V5W10gPSBbXVxuICAgIGNvbnN0IG1hdGNoZXJSZWdleCA9IHBhdGhUb1JlZ2V4cC5wYXRoVG9SZWdleHAoXG4gICAgICBwYXRoLFxuICAgICAga2V5cyxcbiAgICAgIGN1c3RvbVJvdXRlID8gY3VzdG9tUm91dGVNYXRjaGVyT3B0aW9ucyA6IG1hdGNoZXJPcHRpb25zXG4gICAgKVxuICAgIGNvbnN0IG1hdGNoZXIgPSBwYXRoVG9SZWdleHAucmVnZXhwVG9GdW5jdGlvbihtYXRjaGVyUmVnZXgsIGtleXMpXG5cbiAgICByZXR1cm4gKHBhdGhuYW1lOiBzdHJpbmcgfCBudWxsIHwgdW5kZWZpbmVkLCBwYXJhbXM/OiBhbnkpID0+IHtcbiAgICAgIGNvbnN0IHJlcyA9IHBhdGhuYW1lID09IG51bGwgPyBmYWxzZSA6IG1hdGNoZXIocGF0aG5hbWUpXG4gICAgICBpZiAoIXJlcykge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cblxuICAgICAgaWYgKGN1c3RvbVJvdXRlKSB7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IG9mIGtleXMpIHtcbiAgICAgICAgICAvLyB1bm5hbWVkIHBhcmFtcyBzaG91bGQgYmUgcmVtb3ZlZCBhcyB0aGV5XG4gICAgICAgICAgLy8gYXJlIG5vdCBhbGxvd2VkIHRvIGJlIHVzZWQgaW4gdGhlIGRlc3RpbmF0aW9uXG4gICAgICAgICAgaWYgKHR5cGVvZiBrZXkubmFtZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIGRlbGV0ZSAocmVzLnBhcmFtcyBhcyBhbnkpW2tleS5uYW1lXVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4geyAuLi5wYXJhbXMsIC4uLnJlcy5wYXJhbXMgfVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgSW5jb21pbmdNZXNzYWdlIH0gZnJvbSAnaHR0cCdcbmltcG9ydCB7IFBhcnNlZFVybFF1ZXJ5IH0gZnJvbSAncXVlcnlzdHJpbmcnXG5pbXBvcnQgeyBzZWFyY2hQYXJhbXNUb1VybFF1ZXJ5IH0gZnJvbSAnLi9xdWVyeXN0cmluZydcbmltcG9ydCB7IHBhcnNlUmVsYXRpdmVVcmwgfSBmcm9tICcuL3BhcnNlLXJlbGF0aXZlLXVybCdcbmltcG9ydCAqIGFzIHBhdGhUb1JlZ2V4cCBmcm9tICduZXh0L2Rpc3QvY29tcGlsZWQvcGF0aC10by1yZWdleHAnXG5pbXBvcnQgeyBSb3V0ZUhhcyB9IGZyb20gJy4uLy4uLy4uLy4uL2xpYi9sb2FkLWN1c3RvbS1yb3V0ZXMnXG5cbnR5cGUgUGFyYW1zID0geyBbcGFyYW06IHN0cmluZ106IGFueSB9XG5cbi8vIGVuc3VyZSBvbmx5IGEtekEtWiBhcmUgdXNlZCBmb3IgcGFyYW0gbmFtZXMgZm9yIHByb3BlciBpbnRlcnBvbGF0aW5nXG4vLyB3aXRoIHBhdGgtdG8tcmVnZXhwXG5leHBvcnQgY29uc3QgZ2V0U2FmZVBhcmFtTmFtZSA9IChwYXJhbU5hbWU6IHN0cmluZykgPT4ge1xuICBsZXQgbmV3UGFyYW1OYW1lID0gJydcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHBhcmFtTmFtZS5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGNoYXJDb2RlID0gcGFyYW1OYW1lLmNoYXJDb2RlQXQoaSlcblxuICAgIGlmIChcbiAgICAgIChjaGFyQ29kZSA+IDY0ICYmIGNoYXJDb2RlIDwgOTEpIHx8IC8vIEEtWlxuICAgICAgKGNoYXJDb2RlID4gOTYgJiYgY2hhckNvZGUgPCAxMjMpIC8vIGEtelxuICAgICkge1xuICAgICAgbmV3UGFyYW1OYW1lICs9IHBhcmFtTmFtZVtpXVxuICAgIH1cbiAgfVxuICByZXR1cm4gbmV3UGFyYW1OYW1lXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtYXRjaEhhcyhcbiAgcmVxOiBJbmNvbWluZ01lc3NhZ2UsXG4gIGhhczogUm91dGVIYXNbXSxcbiAgcXVlcnk6IFBhcmFtc1xuKTogZmFsc2UgfCBQYXJhbXMge1xuICBjb25zdCBwYXJhbXM6IFBhcmFtcyA9IHt9XG4gIGNvbnN0IGFsbE1hdGNoID0gaGFzLmV2ZXJ5KChoYXNJdGVtKSA9PiB7XG4gICAgbGV0IHZhbHVlOiB1bmRlZmluZWQgfCBzdHJpbmdcbiAgICBsZXQga2V5ID0gaGFzSXRlbS5rZXlcblxuICAgIHN3aXRjaCAoaGFzSXRlbS50eXBlKSB7XG4gICAgICBjYXNlICdoZWFkZXInOiB7XG4gICAgICAgIGtleSA9IGtleSEudG9Mb3dlckNhc2UoKVxuICAgICAgICB2YWx1ZSA9IHJlcS5oZWFkZXJzW2tleV0gYXMgc3RyaW5nXG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgICBjYXNlICdjb29raWUnOiB7XG4gICAgICAgIHZhbHVlID0gKHJlcSBhcyBhbnkpLmNvb2tpZXNbaGFzSXRlbS5rZXldXG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgICBjYXNlICdxdWVyeSc6IHtcbiAgICAgICAgdmFsdWUgPSBxdWVyeVtrZXkhXVxuICAgICAgICBicmVha1xuICAgICAgfVxuICAgICAgY2FzZSAnaG9zdCc6IHtcbiAgICAgICAgY29uc3QgeyBob3N0IH0gPSByZXE/LmhlYWRlcnMgfHwge31cbiAgICAgICAgLy8gcmVtb3ZlIHBvcnQgZnJvbSBob3N0IGlmIHByZXNlbnRcbiAgICAgICAgY29uc3QgaG9zdG5hbWUgPSBob3N0Py5zcGxpdCgnOicpWzBdLnRvTG93ZXJDYXNlKClcbiAgICAgICAgdmFsdWUgPSBob3N0bmFtZVxuICAgICAgICBicmVha1xuICAgICAgfVxuICAgICAgZGVmYXVsdDoge1xuICAgICAgICBicmVha1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghaGFzSXRlbS52YWx1ZSAmJiB2YWx1ZSkge1xuICAgICAgcGFyYW1zW2dldFNhZmVQYXJhbU5hbWUoa2V5ISldID0gdmFsdWVcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfSBlbHNlIGlmICh2YWx1ZSkge1xuICAgICAgY29uc3QgbWF0Y2hlciA9IG5ldyBSZWdFeHAoYF4ke2hhc0l0ZW0udmFsdWV9JGApXG4gICAgICBjb25zdCBtYXRjaGVzID0gdmFsdWUubWF0Y2gobWF0Y2hlcilcblxuICAgICAgaWYgKG1hdGNoZXMpIHtcbiAgICAgICAgaWYgKG1hdGNoZXMuZ3JvdXBzKSB7XG4gICAgICAgICAgT2JqZWN0LmtleXMobWF0Y2hlcy5ncm91cHMpLmZvckVhY2goKGdyb3VwS2V5KSA9PiB7XG4gICAgICAgICAgICBwYXJhbXNbZ3JvdXBLZXldID0gbWF0Y2hlcy5ncm91cHMhW2dyb3VwS2V5XVxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSBpZiAoaGFzSXRlbS50eXBlID09PSAnaG9zdCcgJiYgbWF0Y2hlc1swXSkge1xuICAgICAgICAgIHBhcmFtcy5ob3N0ID0gbWF0Y2hlc1swXVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZVxuICB9KVxuXG4gIGlmIChhbGxNYXRjaCkge1xuICAgIHJldHVybiBwYXJhbXNcbiAgfVxuICByZXR1cm4gZmFsc2Vcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbXBpbGVOb25QYXRoKHZhbHVlOiBzdHJpbmcsIHBhcmFtczogUGFyYW1zKTogc3RyaW5nIHtcbiAgaWYgKCF2YWx1ZS5pbmNsdWRlcygnOicpKSB7XG4gICAgcmV0dXJuIHZhbHVlXG4gIH1cblxuICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhwYXJhbXMpKSB7XG4gICAgaWYgKHZhbHVlLmluY2x1ZGVzKGA6JHtrZXl9YCkpIHtcbiAgICAgIHZhbHVlID0gdmFsdWVcbiAgICAgICAgLnJlcGxhY2UoXG4gICAgICAgICAgbmV3IFJlZ0V4cChgOiR7a2V5fVxcXFwqYCwgJ2cnKSxcbiAgICAgICAgICBgOiR7a2V5fS0tRVNDQVBFRF9QQVJBTV9BU1RFUklTS1NgXG4gICAgICAgIClcbiAgICAgICAgLnJlcGxhY2UoXG4gICAgICAgICAgbmV3IFJlZ0V4cChgOiR7a2V5fVxcXFw/YCwgJ2cnKSxcbiAgICAgICAgICBgOiR7a2V5fS0tRVNDQVBFRF9QQVJBTV9RVUVTVElPTmBcbiAgICAgICAgKVxuICAgICAgICAucmVwbGFjZShuZXcgUmVnRXhwKGA6JHtrZXl9XFxcXCtgLCAnZycpLCBgOiR7a2V5fS0tRVNDQVBFRF9QQVJBTV9QTFVTYClcbiAgICAgICAgLnJlcGxhY2UoXG4gICAgICAgICAgbmV3IFJlZ0V4cChgOiR7a2V5fSg/IVxcXFx3KWAsICdnJyksXG4gICAgICAgICAgYC0tRVNDQVBFRF9QQVJBTV9DT0xPTiR7a2V5fWBcbiAgICAgICAgKVxuICAgIH1cbiAgfVxuICB2YWx1ZSA9IHZhbHVlXG4gICAgLnJlcGxhY2UoLyg6fFxcKnxcXD98XFwrfFxcKHxcXCl8XFx7fFxcfSkvZywgJ1xcXFwkMScpXG4gICAgLnJlcGxhY2UoLy0tRVNDQVBFRF9QQVJBTV9QTFVTL2csICcrJylcbiAgICAucmVwbGFjZSgvLS1FU0NBUEVEX1BBUkFNX0NPTE9OL2csICc6JylcbiAgICAucmVwbGFjZSgvLS1FU0NBUEVEX1BBUkFNX1FVRVNUSU9OL2csICc/JylcbiAgICAucmVwbGFjZSgvLS1FU0NBUEVEX1BBUkFNX0FTVEVSSVNLUy9nLCAnKicpXG5cbiAgLy8gdGhlIHZhbHVlIG5lZWRzIHRvIHN0YXJ0IHdpdGggYSBmb3J3YXJkLXNsYXNoIHRvIGJlIGNvbXBpbGVkXG4gIC8vIGNvcnJlY3RseVxuICByZXR1cm4gcGF0aFRvUmVnZXhwXG4gICAgLmNvbXBpbGUoYC8ke3ZhbHVlfWAsIHsgdmFsaWRhdGU6IGZhbHNlIH0pKHBhcmFtcylcbiAgICAuc3Vic3RyKDEpXG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHByZXBhcmVEZXN0aW5hdGlvbihcbiAgZGVzdGluYXRpb246IHN0cmluZyxcbiAgcGFyYW1zOiBQYXJhbXMsXG4gIHF1ZXJ5OiBQYXJzZWRVcmxRdWVyeSxcbiAgYXBwZW5kUGFyYW1zVG9RdWVyeTogYm9vbGVhblxuKSB7XG4gIGxldCBwYXJzZWREZXN0aW5hdGlvbjoge1xuICAgIHF1ZXJ5PzogUGFyc2VkVXJsUXVlcnlcbiAgICBwcm90b2NvbD86IHN0cmluZ1xuICAgIGhvc3RuYW1lPzogc3RyaW5nXG4gICAgcG9ydD86IHN0cmluZ1xuICB9ICYgUmV0dXJuVHlwZTx0eXBlb2YgcGFyc2VSZWxhdGl2ZVVybD4gPSB7fSBhcyBhbnlcblxuICAvLyBjbG9uZSBxdWVyeSBzbyB3ZSBkb24ndCBtb2RpZnkgdGhlIG9yaWdpbmFsXG4gIHF1ZXJ5ID0gT2JqZWN0LmFzc2lnbih7fSwgcXVlcnkpXG4gIGNvbnN0IGhhZExvY2FsZSA9IHF1ZXJ5Ll9fbmV4dExvY2FsZVxuICBkZWxldGUgcXVlcnkuX19uZXh0TG9jYWxlXG4gIGRlbGV0ZSBxdWVyeS5fX25leHREZWZhdWx0TG9jYWxlXG5cbiAgaWYgKGRlc3RpbmF0aW9uLnN0YXJ0c1dpdGgoJy8nKSkge1xuICAgIHBhcnNlZERlc3RpbmF0aW9uID0gcGFyc2VSZWxhdGl2ZVVybChkZXN0aW5hdGlvbilcbiAgfSBlbHNlIHtcbiAgICBjb25zdCB7XG4gICAgICBwYXRobmFtZSxcbiAgICAgIHNlYXJjaFBhcmFtcyxcbiAgICAgIGhhc2gsXG4gICAgICBob3N0bmFtZSxcbiAgICAgIHBvcnQsXG4gICAgICBwcm90b2NvbCxcbiAgICAgIHNlYXJjaCxcbiAgICAgIGhyZWYsXG4gICAgfSA9IG5ldyBVUkwoZGVzdGluYXRpb24pXG5cbiAgICBwYXJzZWREZXN0aW5hdGlvbiA9IHtcbiAgICAgIHBhdGhuYW1lLFxuICAgICAgcXVlcnk6IHNlYXJjaFBhcmFtc1RvVXJsUXVlcnkoc2VhcmNoUGFyYW1zKSxcbiAgICAgIGhhc2gsXG4gICAgICBwcm90b2NvbCxcbiAgICAgIGhvc3RuYW1lLFxuICAgICAgcG9ydCxcbiAgICAgIHNlYXJjaCxcbiAgICAgIGhyZWYsXG4gICAgfVxuICB9XG5cbiAgY29uc3QgZGVzdFF1ZXJ5ID0gcGFyc2VkRGVzdGluYXRpb24ucXVlcnlcbiAgY29uc3QgZGVzdFBhdGggPSBgJHtwYXJzZWREZXN0aW5hdGlvbi5wYXRobmFtZSF9JHtcbiAgICBwYXJzZWREZXN0aW5hdGlvbi5oYXNoIHx8ICcnXG4gIH1gXG4gIGNvbnN0IGRlc3RQYXRoUGFyYW1LZXlzOiBwYXRoVG9SZWdleHAuS2V5W10gPSBbXVxuICBwYXRoVG9SZWdleHAucGF0aFRvUmVnZXhwKGRlc3RQYXRoLCBkZXN0UGF0aFBhcmFtS2V5cylcblxuICBjb25zdCBkZXN0UGF0aFBhcmFtcyA9IGRlc3RQYXRoUGFyYW1LZXlzLm1hcCgoa2V5KSA9PiBrZXkubmFtZSlcblxuICBsZXQgZGVzdGluYXRpb25Db21waWxlciA9IHBhdGhUb1JlZ2V4cC5jb21waWxlKFxuICAgIGRlc3RQYXRoLFxuICAgIC8vIHdlIGRvbid0IHZhbGlkYXRlIHdoaWxlIGNvbXBpbGluZyB0aGUgZGVzdGluYXRpb24gc2luY2Ugd2Ugc2hvdWxkXG4gICAgLy8gaGF2ZSBhbHJlYWR5IHZhbGlkYXRlZCBiZWZvcmUgd2UgZ290IHRvIHRoaXMgcG9pbnQgYW5kIHZhbGlkYXRpbmdcbiAgICAvLyBicmVha3MgY29tcGlsaW5nIGRlc3RpbmF0aW9ucyB3aXRoIG5hbWVkIHBhdHRlcm4gcGFyYW1zIGZyb20gdGhlIHNvdXJjZVxuICAgIC8vIGUuZy4gL3NvbWV0aGluZzpoZWxsbyguKikgLT4gL2Fub3RoZXIvOmhlbGxvIGlzIGJyb2tlbiB3aXRoIHZhbGlkYXRpb25cbiAgICAvLyBzaW5jZSBjb21waWxlIHZhbGlkYXRpb24gaXMgbWVhbnQgZm9yIHJldmVyc2luZyBhbmQgbm90IGZvciBpbnNlcnRpbmdcbiAgICAvLyBwYXJhbXMgZnJvbSBhIHNlcGFyYXRlIHBhdGgtcmVnZXggaW50byBhbm90aGVyXG4gICAgeyB2YWxpZGF0ZTogZmFsc2UgfVxuICApXG4gIGxldCBuZXdVcmxcblxuICAvLyB1cGRhdGUgYW55IHBhcmFtcyBpbiBxdWVyeSB2YWx1ZXNcbiAgZm9yIChjb25zdCBba2V5LCBzdHJPckFycmF5XSBvZiBPYmplY3QuZW50cmllcyhkZXN0UXVlcnkpKSB7XG4gICAgbGV0IHZhbHVlID0gQXJyYXkuaXNBcnJheShzdHJPckFycmF5KSA/IHN0ck9yQXJyYXlbMF0gOiBzdHJPckFycmF5XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICAvLyB0aGUgdmFsdWUgbmVlZHMgdG8gc3RhcnQgd2l0aCBhIGZvcndhcmQtc2xhc2ggdG8gYmUgY29tcGlsZWRcbiAgICAgIC8vIGNvcnJlY3RseVxuICAgICAgdmFsdWUgPSBjb21waWxlTm9uUGF0aCh2YWx1ZSwgcGFyYW1zKVxuICAgIH1cbiAgICBkZXN0UXVlcnlba2V5XSA9IHZhbHVlXG4gIH1cblxuICAvLyBhZGQgcGF0aCBwYXJhbXMgdG8gcXVlcnkgaWYgaXQncyBub3QgYSByZWRpcmVjdCBhbmQgbm90XG4gIC8vIGFscmVhZHkgZGVmaW5lZCBpbiBkZXN0aW5hdGlvbiBxdWVyeSBvciBwYXRoXG4gIGxldCBwYXJhbUtleXMgPSBPYmplY3Qua2V5cyhwYXJhbXMpXG5cbiAgLy8gcmVtb3ZlIGludGVybmFsIHBhcmFtIGZvciBpMThuXG4gIGlmIChoYWRMb2NhbGUpIHtcbiAgICBwYXJhbUtleXMgPSBwYXJhbUtleXMuZmlsdGVyKChuYW1lKSA9PiBuYW1lICE9PSAnbmV4dEludGVybmFsTG9jYWxlJylcbiAgfVxuXG4gIGlmIChcbiAgICBhcHBlbmRQYXJhbXNUb1F1ZXJ5ICYmXG4gICAgIXBhcmFtS2V5cy5zb21lKChrZXkpID0+IGRlc3RQYXRoUGFyYW1zLmluY2x1ZGVzKGtleSkpXG4gICkge1xuICAgIGZvciAoY29uc3Qga2V5IG9mIHBhcmFtS2V5cykge1xuICAgICAgaWYgKCEoa2V5IGluIGRlc3RRdWVyeSkpIHtcbiAgICAgICAgZGVzdFF1ZXJ5W2tleV0gPSBwYXJhbXNba2V5XVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHRyeSB7XG4gICAgbmV3VXJsID0gZGVzdGluYXRpb25Db21waWxlcihwYXJhbXMpXG5cbiAgICBjb25zdCBbcGF0aG5hbWUsIGhhc2hdID0gbmV3VXJsLnNwbGl0KCcjJylcbiAgICBwYXJzZWREZXN0aW5hdGlvbi5wYXRobmFtZSA9IHBhdGhuYW1lXG4gICAgcGFyc2VkRGVzdGluYXRpb24uaGFzaCA9IGAke2hhc2ggPyAnIycgOiAnJ30ke2hhc2ggfHwgJyd9YFxuICAgIGRlbGV0ZSAocGFyc2VkRGVzdGluYXRpb24gYXMgYW55KS5zZWFyY2hcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgaWYgKGVyci5tZXNzYWdlLm1hdGNoKC9FeHBlY3RlZCAuKj8gdG8gbm90IHJlcGVhdCwgYnV0IGdvdCBhbiBhcnJheS8pKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBUbyB1c2UgYSBtdWx0aS1tYXRjaCBpbiB0aGUgZGVzdGluYXRpb24geW91IG11c3QgYWRkIFxcYCpcXGAgYXQgdGhlIGVuZCBvZiB0aGUgcGFyYW0gbmFtZSB0byBzaWduaWZ5IGl0IHNob3VsZCByZXBlYXQuIGh0dHBzOi8vbmV4dGpzLm9yZy9kb2NzL21lc3NhZ2VzL2ludmFsaWQtbXVsdGktbWF0Y2hgXG4gICAgICApXG4gICAgfVxuICAgIHRocm93IGVyclxuICB9XG5cbiAgLy8gUXVlcnkgbWVyZ2Ugb3JkZXIgbG93ZXN0IHByaW9yaXR5IHRvIGhpZ2hlc3RcbiAgLy8gMS4gaW5pdGlhbCBVUkwgcXVlcnkgdmFsdWVzXG4gIC8vIDIuIHBhdGggc2VnbWVudCB2YWx1ZXNcbiAgLy8gMy4gZGVzdGluYXRpb24gc3BlY2lmaWVkIHF1ZXJ5IHZhbHVlc1xuICBwYXJzZWREZXN0aW5hdGlvbi5xdWVyeSA9IHtcbiAgICAuLi5xdWVyeSxcbiAgICAuLi5wYXJzZWREZXN0aW5hdGlvbi5xdWVyeSxcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbmV3VXJsLFxuICAgIHBhcnNlZERlc3RpbmF0aW9uLFxuICB9XG59XG4iLCJpbXBvcnQgeyBQYXJzZWRVcmxRdWVyeSB9IGZyb20gJ3F1ZXJ5c3RyaW5nJ1xuXG5leHBvcnQgZnVuY3Rpb24gc2VhcmNoUGFyYW1zVG9VcmxRdWVyeShcbiAgc2VhcmNoUGFyYW1zOiBVUkxTZWFyY2hQYXJhbXNcbik6IFBhcnNlZFVybFF1ZXJ5IHtcbiAgY29uc3QgcXVlcnk6IFBhcnNlZFVybFF1ZXJ5ID0ge31cbiAgc2VhcmNoUGFyYW1zLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICBpZiAodHlwZW9mIHF1ZXJ5W2tleV0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBxdWVyeVtrZXldID0gdmFsdWVcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkocXVlcnlba2V5XSkpIHtcbiAgICAgIDsocXVlcnlba2V5XSBhcyBzdHJpbmdbXSkucHVzaCh2YWx1ZSlcbiAgICB9IGVsc2Uge1xuICAgICAgcXVlcnlba2V5XSA9IFtxdWVyeVtrZXldIGFzIHN0cmluZywgdmFsdWVdXG4gICAgfVxuICB9KVxuICByZXR1cm4gcXVlcnlcbn1cblxuZnVuY3Rpb24gc3RyaW5naWZ5VXJsUXVlcnlQYXJhbShwYXJhbTogc3RyaW5nKTogc3RyaW5nIHtcbiAgaWYgKFxuICAgIHR5cGVvZiBwYXJhbSA9PT0gJ3N0cmluZycgfHxcbiAgICAodHlwZW9mIHBhcmFtID09PSAnbnVtYmVyJyAmJiAhaXNOYU4ocGFyYW0pKSB8fFxuICAgIHR5cGVvZiBwYXJhbSA9PT0gJ2Jvb2xlYW4nXG4gICkge1xuICAgIHJldHVybiBTdHJpbmcocGFyYW0pXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICcnXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVybFF1ZXJ5VG9TZWFyY2hQYXJhbXMoXG4gIHVybFF1ZXJ5OiBQYXJzZWRVcmxRdWVyeVxuKTogVVJMU2VhcmNoUGFyYW1zIHtcbiAgY29uc3QgcmVzdWx0ID0gbmV3IFVSTFNlYXJjaFBhcmFtcygpXG4gIE9iamVjdC5lbnRyaWVzKHVybFF1ZXJ5KS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgIHZhbHVlLmZvckVhY2goKGl0ZW0pID0+IHJlc3VsdC5hcHBlbmQoa2V5LCBzdHJpbmdpZnlVcmxRdWVyeVBhcmFtKGl0ZW0pKSlcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0LnNldChrZXksIHN0cmluZ2lmeVVybFF1ZXJ5UGFyYW0odmFsdWUpKVxuICAgIH1cbiAgfSlcbiAgcmV0dXJuIHJlc3VsdFxufVxuXG5leHBvcnQgZnVuY3Rpb24gYXNzaWduKFxuICB0YXJnZXQ6IFVSTFNlYXJjaFBhcmFtcyxcbiAgLi4uc2VhcmNoUGFyYW1zTGlzdDogVVJMU2VhcmNoUGFyYW1zW11cbik6IFVSTFNlYXJjaFBhcmFtcyB7XG4gIHNlYXJjaFBhcmFtc0xpc3QuZm9yRWFjaCgoc2VhcmNoUGFyYW1zKSA9PiB7XG4gICAgQXJyYXkuZnJvbShzZWFyY2hQYXJhbXMua2V5cygpKS5mb3JFYWNoKChrZXkpID0+IHRhcmdldC5kZWxldGUoa2V5KSlcbiAgICBzZWFyY2hQYXJhbXMuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4gdGFyZ2V0LmFwcGVuZChrZXksIHZhbHVlKSlcbiAgfSlcbiAgcmV0dXJuIHRhcmdldFxufVxuIiwiaW1wb3J0IHsgUGFyc2VkVXJsUXVlcnkgfSBmcm9tICdxdWVyeXN0cmluZydcbmltcG9ydCBwYXRoTWF0Y2ggZnJvbSAnLi9wYXRoLW1hdGNoJ1xuaW1wb3J0IHByZXBhcmVEZXN0aW5hdGlvbiwgeyBtYXRjaEhhcyB9IGZyb20gJy4vcHJlcGFyZS1kZXN0aW5hdGlvbidcbmltcG9ydCB7IFJld3JpdGUgfSBmcm9tICcuLi8uLi8uLi8uLi9saWIvbG9hZC1jdXN0b20tcm91dGVzJ1xuaW1wb3J0IHsgcmVtb3ZlUGF0aFRyYWlsaW5nU2xhc2ggfSBmcm9tICcuLi8uLi8uLi8uLi9jbGllbnQvbm9ybWFsaXplLXRyYWlsaW5nLXNsYXNoJ1xuaW1wb3J0IHsgbm9ybWFsaXplTG9jYWxlUGF0aCB9IGZyb20gJy4uLy4uL2kxOG4vbm9ybWFsaXplLWxvY2FsZS1wYXRoJ1xuaW1wb3J0IHsgcGFyc2VSZWxhdGl2ZVVybCB9IGZyb20gJy4vcGFyc2UtcmVsYXRpdmUtdXJsJ1xuaW1wb3J0IHsgZGVsQmFzZVBhdGggfSBmcm9tICcuLi9yb3V0ZXInXG5cbmNvbnN0IGN1c3RvbVJvdXRlTWF0Y2hlciA9IHBhdGhNYXRjaCh0cnVlKVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZXNvbHZlUmV3cml0ZXMoXG4gIGFzUGF0aDogc3RyaW5nLFxuICBwYWdlczogc3RyaW5nW10sXG4gIHJld3JpdGVzOiB7XG4gICAgYmVmb3JlRmlsZXM6IFJld3JpdGVbXVxuICAgIGFmdGVyRmlsZXM6IFJld3JpdGVbXVxuICAgIGZhbGxiYWNrOiBSZXdyaXRlW11cbiAgfSxcbiAgcXVlcnk6IFBhcnNlZFVybFF1ZXJ5LFxuICByZXNvbHZlSHJlZjogKHBhdGg6IHN0cmluZykgPT4gc3RyaW5nLFxuICBsb2NhbGVzPzogc3RyaW5nW11cbik6IHtcbiAgbWF0Y2hlZFBhZ2U6IGJvb2xlYW5cbiAgcGFyc2VkQXM6IFJldHVyblR5cGU8dHlwZW9mIHBhcnNlUmVsYXRpdmVVcmw+XG4gIGFzUGF0aDogc3RyaW5nXG4gIHJlc29sdmVkSHJlZj86IHN0cmluZ1xufSB7XG4gIGxldCBtYXRjaGVkUGFnZSA9IGZhbHNlXG4gIGxldCBwYXJzZWRBcyA9IHBhcnNlUmVsYXRpdmVVcmwoYXNQYXRoKVxuICBsZXQgZnNQYXRobmFtZSA9IHJlbW92ZVBhdGhUcmFpbGluZ1NsYXNoKFxuICAgIG5vcm1hbGl6ZUxvY2FsZVBhdGgoZGVsQmFzZVBhdGgocGFyc2VkQXMucGF0aG5hbWUpLCBsb2NhbGVzKS5wYXRobmFtZVxuICApXG4gIGxldCByZXNvbHZlZEhyZWZcblxuICBjb25zdCBoYW5kbGVSZXdyaXRlID0gKHJld3JpdGU6IFJld3JpdGUpID0+IHtcbiAgICBjb25zdCBtYXRjaGVyID0gY3VzdG9tUm91dGVNYXRjaGVyKHJld3JpdGUuc291cmNlKVxuICAgIGxldCBwYXJhbXMgPSBtYXRjaGVyKHBhcnNlZEFzLnBhdGhuYW1lKVxuXG4gICAgaWYgKHJld3JpdGUuaGFzICYmIHBhcmFtcykge1xuICAgICAgY29uc3QgaGFzUGFyYW1zID0gbWF0Y2hIYXMoXG4gICAgICAgIHtcbiAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICBob3N0OiBkb2N1bWVudC5sb2NhdGlvbi5ob3N0bmFtZSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGNvb2tpZXM6IGRvY3VtZW50LmNvb2tpZVxuICAgICAgICAgICAgLnNwbGl0KCc7ICcpXG4gICAgICAgICAgICAucmVkdWNlPFJlY29yZDxzdHJpbmcsIHN0cmluZz4+KChhY2MsIGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgW2tleSwgLi4udmFsdWVdID0gaXRlbS5zcGxpdCgnPScpXG4gICAgICAgICAgICAgIGFjY1trZXldID0gdmFsdWUuam9pbignPScpXG4gICAgICAgICAgICAgIHJldHVybiBhY2NcbiAgICAgICAgICAgIH0sIHt9KSxcbiAgICAgICAgfSBhcyBhbnksXG4gICAgICAgIHJld3JpdGUuaGFzLFxuICAgICAgICBwYXJzZWRBcy5xdWVyeVxuICAgICAgKVxuXG4gICAgICBpZiAoaGFzUGFyYW1zKSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24ocGFyYW1zLCBoYXNQYXJhbXMpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJhbXMgPSBmYWxzZVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwYXJhbXMpIHtcbiAgICAgIGlmICghcmV3cml0ZS5kZXN0aW5hdGlvbikge1xuICAgICAgICAvLyB0aGlzIGlzIGEgcHJveGllZCByZXdyaXRlIHdoaWNoIGlzbid0IGhhbmRsZWQgb24gdGhlIGNsaWVudFxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuICAgICAgY29uc3QgZGVzdFJlcyA9IHByZXBhcmVEZXN0aW5hdGlvbihcbiAgICAgICAgcmV3cml0ZS5kZXN0aW5hdGlvbixcbiAgICAgICAgcGFyYW1zLFxuICAgICAgICBxdWVyeSxcbiAgICAgICAgdHJ1ZVxuICAgICAgKVxuICAgICAgcGFyc2VkQXMgPSBkZXN0UmVzLnBhcnNlZERlc3RpbmF0aW9uXG4gICAgICBhc1BhdGggPSBkZXN0UmVzLm5ld1VybFxuICAgICAgT2JqZWN0LmFzc2lnbihxdWVyeSwgZGVzdFJlcy5wYXJzZWREZXN0aW5hdGlvbi5xdWVyeSlcblxuICAgICAgZnNQYXRobmFtZSA9IHJlbW92ZVBhdGhUcmFpbGluZ1NsYXNoKFxuICAgICAgICBub3JtYWxpemVMb2NhbGVQYXRoKGRlbEJhc2VQYXRoKGFzUGF0aCksIGxvY2FsZXMpLnBhdGhuYW1lXG4gICAgICApXG5cbiAgICAgIGlmIChwYWdlcy5pbmNsdWRlcyhmc1BhdGhuYW1lKSkge1xuICAgICAgICAvLyBjaGVjayBpZiB3ZSBub3cgbWF0Y2ggYSBwYWdlIGFzIHRoaXMgbWVhbnMgd2UgYXJlIGRvbmVcbiAgICAgICAgLy8gcmVzb2x2aW5nIHRoZSByZXdyaXRlc1xuICAgICAgICBtYXRjaGVkUGFnZSA9IHRydWVcbiAgICAgICAgcmVzb2x2ZWRIcmVmID0gZnNQYXRobmFtZVxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuXG4gICAgICAvLyBjaGVjayBpZiB3ZSBtYXRjaCBhIGR5bmFtaWMtcm91dGUsIGlmIHNvIHdlIGJyZWFrIHRoZSByZXdyaXRlcyBjaGFpblxuICAgICAgcmVzb2x2ZWRIcmVmID0gcmVzb2x2ZUhyZWYoZnNQYXRobmFtZSlcblxuICAgICAgaWYgKHJlc29sdmVkSHJlZiAhPT0gYXNQYXRoICYmIHBhZ2VzLmluY2x1ZGVzKHJlc29sdmVkSHJlZikpIHtcbiAgICAgICAgbWF0Y2hlZFBhZ2UgPSB0cnVlXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG4gICAgfVxuICB9XG4gIGxldCBmaW5pc2hlZCA9IGZhbHNlXG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXdyaXRlcy5iZWZvcmVGaWxlcy5sZW5ndGg7IGkrKykge1xuICAgIC8vIHdlIGRvbid0IGVuZCBhZnRlciBtYXRjaCBpbiBiZWZvcmVGaWxlcyB0byBhbGxvd1xuICAgIC8vIGNvbnRpbnVpbmcgdGhyb3VnaCBhbGwgYmVmb3JlRmlsZXMgcmV3cml0ZXNcbiAgICBoYW5kbGVSZXdyaXRlKHJld3JpdGVzLmJlZm9yZUZpbGVzW2ldKVxuICB9XG4gIG1hdGNoZWRQYWdlID0gcGFnZXMuaW5jbHVkZXMoZnNQYXRobmFtZSlcblxuICBpZiAoIW1hdGNoZWRQYWdlKSB7XG4gICAgaWYgKCFmaW5pc2hlZCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXdyaXRlcy5hZnRlckZpbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChoYW5kbGVSZXdyaXRlKHJld3JpdGVzLmFmdGVyRmlsZXNbaV0pKSB7XG4gICAgICAgICAgZmluaXNoZWQgPSB0cnVlXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGNoZWNrIGR5bmFtaWMgcm91dGUgYmVmb3JlIHByb2Nlc3NpbmcgZmFsbGJhY2sgcmV3cml0ZXNcbiAgICBpZiAoIWZpbmlzaGVkKSB7XG4gICAgICByZXNvbHZlZEhyZWYgPSByZXNvbHZlSHJlZihmc1BhdGhuYW1lKVxuICAgICAgbWF0Y2hlZFBhZ2UgPSBwYWdlcy5pbmNsdWRlcyhyZXNvbHZlZEhyZWYpXG4gICAgICBmaW5pc2hlZCA9IG1hdGNoZWRQYWdlXG4gICAgfVxuXG4gICAgaWYgKCFmaW5pc2hlZCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXdyaXRlcy5mYWxsYmFjay5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoaGFuZGxlUmV3cml0ZShyZXdyaXRlcy5mYWxsYmFja1tpXSkpIHtcbiAgICAgICAgICBmaW5pc2hlZCA9IHRydWVcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBhc1BhdGgsXG4gICAgcGFyc2VkQXMsXG4gICAgbWF0Y2hlZFBhZ2UsXG4gICAgcmVzb2x2ZWRIcmVmLFxuICB9XG59XG4iLCJpbXBvcnQgeyBnZXRSb3V0ZVJlZ2V4IH0gZnJvbSAnLi9yb3V0ZS1yZWdleCdcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFJvdXRlTWF0Y2hlcihyb3V0ZVJlZ2V4OiBSZXR1cm5UeXBlPHR5cGVvZiBnZXRSb3V0ZVJlZ2V4Pikge1xuICBjb25zdCB7IHJlLCBncm91cHMgfSA9IHJvdXRlUmVnZXhcbiAgcmV0dXJuIChwYXRobmFtZTogc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZCkgPT4ge1xuICAgIGNvbnN0IHJvdXRlTWF0Y2ggPSByZS5leGVjKHBhdGhuYW1lISlcbiAgICBpZiAoIXJvdXRlTWF0Y2gpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIGNvbnN0IGRlY29kZSA9IChwYXJhbTogc3RyaW5nKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHBhcmFtKVxuICAgICAgfSBjYXRjaCAoXykge1xuICAgICAgICBjb25zdCBlcnI6IEVycm9yICYgeyBjb2RlPzogc3RyaW5nIH0gPSBuZXcgRXJyb3IoXG4gICAgICAgICAgJ2ZhaWxlZCB0byBkZWNvZGUgcGFyYW0nXG4gICAgICAgIClcbiAgICAgICAgZXJyLmNvZGUgPSAnREVDT0RFX0ZBSUxFRCdcbiAgICAgICAgdGhyb3cgZXJyXG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHBhcmFtczogeyBbcGFyYW1OYW1lOiBzdHJpbmddOiBzdHJpbmcgfCBzdHJpbmdbXSB9ID0ge31cblxuICAgIE9iamVjdC5rZXlzKGdyb3VwcykuZm9yRWFjaCgoc2x1Z05hbWU6IHN0cmluZykgPT4ge1xuICAgICAgY29uc3QgZyA9IGdyb3Vwc1tzbHVnTmFtZV1cbiAgICAgIGNvbnN0IG0gPSByb3V0ZU1hdGNoW2cucG9zXVxuICAgICAgaWYgKG0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBwYXJhbXNbc2x1Z05hbWVdID0gfm0uaW5kZXhPZignLycpXG4gICAgICAgICAgPyBtLnNwbGl0KCcvJykubWFwKChlbnRyeSkgPT4gZGVjb2RlKGVudHJ5KSlcbiAgICAgICAgICA6IGcucmVwZWF0XG4gICAgICAgICAgPyBbZGVjb2RlKG0pXVxuICAgICAgICAgIDogZGVjb2RlKG0pXG4gICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gcGFyYW1zXG4gIH1cbn1cbiIsImV4cG9ydCBpbnRlcmZhY2UgR3JvdXAge1xuICBwb3M6IG51bWJlclxuICByZXBlYXQ6IGJvb2xlYW5cbiAgb3B0aW9uYWw6IGJvb2xlYW5cbn1cblxuLy8gdGhpcyBpc24ndCBpbXBvcnRpbmcgdGhlIGVzY2FwZS1zdHJpbmctcmVnZXggbW9kdWxlXG4vLyB0byByZWR1Y2UgYnl0ZXNcbmZ1bmN0aW9uIGVzY2FwZVJlZ2V4KHN0cjogc3RyaW5nKSB7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvW3xcXFxce30oKVtcXF1eJCsqPy4tXS9nLCAnXFxcXCQmJylcbn1cblxuZnVuY3Rpb24gcGFyc2VQYXJhbWV0ZXIocGFyYW06IHN0cmluZykge1xuICBjb25zdCBvcHRpb25hbCA9IHBhcmFtLnN0YXJ0c1dpdGgoJ1snKSAmJiBwYXJhbS5lbmRzV2l0aCgnXScpXG4gIGlmIChvcHRpb25hbCkge1xuICAgIHBhcmFtID0gcGFyYW0uc2xpY2UoMSwgLTEpXG4gIH1cbiAgY29uc3QgcmVwZWF0ID0gcGFyYW0uc3RhcnRzV2l0aCgnLi4uJylcbiAgaWYgKHJlcGVhdCkge1xuICAgIHBhcmFtID0gcGFyYW0uc2xpY2UoMylcbiAgfVxuICByZXR1cm4geyBrZXk6IHBhcmFtLCByZXBlYXQsIG9wdGlvbmFsIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFJvdXRlUmVnZXgoXG4gIG5vcm1hbGl6ZWRSb3V0ZTogc3RyaW5nXG4pOiB7XG4gIHJlOiBSZWdFeHBcbiAgbmFtZWRSZWdleD86IHN0cmluZ1xuICByb3V0ZUtleXM/OiB7IFtuYW1lZDogc3RyaW5nXTogc3RyaW5nIH1cbiAgZ3JvdXBzOiB7IFtncm91cE5hbWU6IHN0cmluZ106IEdyb3VwIH1cbn0ge1xuICBjb25zdCBzZWdtZW50cyA9IChub3JtYWxpemVkUm91dGUucmVwbGFjZSgvXFwvJC8sICcnKSB8fCAnLycpXG4gICAgLnNsaWNlKDEpXG4gICAgLnNwbGl0KCcvJylcblxuICBjb25zdCBncm91cHM6IHsgW2dyb3VwTmFtZTogc3RyaW5nXTogR3JvdXAgfSA9IHt9XG4gIGxldCBncm91cEluZGV4ID0gMVxuICBjb25zdCBwYXJhbWV0ZXJpemVkUm91dGUgPSBzZWdtZW50c1xuICAgIC5tYXAoKHNlZ21lbnQpID0+IHtcbiAgICAgIGlmIChzZWdtZW50LnN0YXJ0c1dpdGgoJ1snKSAmJiBzZWdtZW50LmVuZHNXaXRoKCddJykpIHtcbiAgICAgICAgY29uc3QgeyBrZXksIG9wdGlvbmFsLCByZXBlYXQgfSA9IHBhcnNlUGFyYW1ldGVyKHNlZ21lbnQuc2xpY2UoMSwgLTEpKVxuICAgICAgICBncm91cHNba2V5XSA9IHsgcG9zOiBncm91cEluZGV4KyssIHJlcGVhdCwgb3B0aW9uYWwgfVxuICAgICAgICByZXR1cm4gcmVwZWF0ID8gKG9wdGlvbmFsID8gJyg/Oi8oLis/KSk/JyA6ICcvKC4rPyknKSA6ICcvKFteL10rPyknXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gYC8ke2VzY2FwZVJlZ2V4KHNlZ21lbnQpfWBcbiAgICAgIH1cbiAgICB9KVxuICAgIC5qb2luKCcnKVxuXG4gIC8vIGRlYWQgY29kZSBlbGltaW5hdGUgZm9yIGJyb3dzZXIgc2luY2UgaXQncyBvbmx5IG5lZWRlZFxuICAvLyB3aGlsZSBnZW5lcmF0aW5nIHJvdXRlcy1tYW5pZmVzdFxuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBsZXQgcm91dGVLZXlDaGFyQ29kZSA9IDk3XG4gICAgbGV0IHJvdXRlS2V5Q2hhckxlbmd0aCA9IDFcblxuICAgIC8vIGJ1aWxkcyBhIG1pbmltYWwgcm91dGVLZXkgdXNpbmcgb25seSBhLXogYW5kIG1pbmltYWwgbnVtYmVyIG9mIGNoYXJhY3RlcnNcbiAgICBjb25zdCBnZXRTYWZlUm91dGVLZXkgPSAoKSA9PiB7XG4gICAgICBsZXQgcm91dGVLZXkgPSAnJ1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJvdXRlS2V5Q2hhckxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHJvdXRlS2V5ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUocm91dGVLZXlDaGFyQ29kZSlcbiAgICAgICAgcm91dGVLZXlDaGFyQ29kZSsrXG5cbiAgICAgICAgaWYgKHJvdXRlS2V5Q2hhckNvZGUgPiAxMjIpIHtcbiAgICAgICAgICByb3V0ZUtleUNoYXJMZW5ndGgrK1xuICAgICAgICAgIHJvdXRlS2V5Q2hhckNvZGUgPSA5N1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gcm91dGVLZXlcbiAgICB9XG5cbiAgICBjb25zdCByb3V0ZUtleXM6IHsgW25hbWVkOiBzdHJpbmddOiBzdHJpbmcgfSA9IHt9XG5cbiAgICBsZXQgbmFtZWRQYXJhbWV0ZXJpemVkUm91dGUgPSBzZWdtZW50c1xuICAgICAgLm1hcCgoc2VnbWVudCkgPT4ge1xuICAgICAgICBpZiAoc2VnbWVudC5zdGFydHNXaXRoKCdbJykgJiYgc2VnbWVudC5lbmRzV2l0aCgnXScpKSB7XG4gICAgICAgICAgY29uc3QgeyBrZXksIG9wdGlvbmFsLCByZXBlYXQgfSA9IHBhcnNlUGFyYW1ldGVyKHNlZ21lbnQuc2xpY2UoMSwgLTEpKVxuICAgICAgICAgIC8vIHJlcGxhY2UgYW55IG5vbi13b3JkIGNoYXJhY3RlcnMgc2luY2UgdGhleSBjYW4gYnJlYWtcbiAgICAgICAgICAvLyB0aGUgbmFtZWQgcmVnZXhcbiAgICAgICAgICBsZXQgY2xlYW5lZEtleSA9IGtleS5yZXBsYWNlKC9cXFcvZywgJycpXG4gICAgICAgICAgbGV0IGludmFsaWRLZXkgPSBmYWxzZVxuXG4gICAgICAgICAgLy8gY2hlY2sgaWYgdGhlIGtleSBpcyBzdGlsbCBpbnZhbGlkIGFuZCBmYWxsYmFjayB0byB1c2luZyBhIGtub3duXG4gICAgICAgICAgLy8gc2FmZSBrZXlcbiAgICAgICAgICBpZiAoY2xlYW5lZEtleS5sZW5ndGggPT09IDAgfHwgY2xlYW5lZEtleS5sZW5ndGggPiAzMCkge1xuICAgICAgICAgICAgaW52YWxpZEtleSA9IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCFpc05hTihwYXJzZUludChjbGVhbmVkS2V5LnN1YnN0cigwLCAxKSkpKSB7XG4gICAgICAgICAgICBpbnZhbGlkS2V5ID0gdHJ1ZVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChpbnZhbGlkS2V5KSB7XG4gICAgICAgICAgICBjbGVhbmVkS2V5ID0gZ2V0U2FmZVJvdXRlS2V5KClcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByb3V0ZUtleXNbY2xlYW5lZEtleV0gPSBrZXlcbiAgICAgICAgICByZXR1cm4gcmVwZWF0XG4gICAgICAgICAgICA/IG9wdGlvbmFsXG4gICAgICAgICAgICAgID8gYCg/Oi8oPzwke2NsZWFuZWRLZXl9Pi4rPykpP2BcbiAgICAgICAgICAgICAgOiBgLyg/PCR7Y2xlYW5lZEtleX0+Lis/KWBcbiAgICAgICAgICAgIDogYC8oPzwke2NsZWFuZWRLZXl9PlteL10rPylgXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGAvJHtlc2NhcGVSZWdleChzZWdtZW50KX1gXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAuam9pbignJylcblxuICAgIHJldHVybiB7XG4gICAgICByZTogbmV3IFJlZ0V4cChgXiR7cGFyYW1ldGVyaXplZFJvdXRlfSg/Oi8pPyRgKSxcbiAgICAgIGdyb3VwcyxcbiAgICAgIHJvdXRlS2V5cyxcbiAgICAgIG5hbWVkUmVnZXg6IGBeJHtuYW1lZFBhcmFtZXRlcml6ZWRSb3V0ZX0oPzovKT8kYCxcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHJlOiBuZXcgUmVnRXhwKGBeJHtwYXJhbWV0ZXJpemVkUm91dGV9KD86Lyk/JGApLFxuICAgIGdyb3VwcyxcbiAgfVxufVxuIiwiaW1wb3J0IHsgSW5jb21pbmdNZXNzYWdlLCBTZXJ2ZXJSZXNwb25zZSB9IGZyb20gJ2h0dHAnXG5pbXBvcnQgeyBQYXJzZWRVcmxRdWVyeSB9IGZyb20gJ3F1ZXJ5c3RyaW5nJ1xuaW1wb3J0IHsgQ29tcG9uZW50VHlwZSB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgVXJsT2JqZWN0IH0gZnJvbSAndXJsJ1xuaW1wb3J0IHsgZm9ybWF0VXJsIH0gZnJvbSAnLi9yb3V0ZXIvdXRpbHMvZm9ybWF0LXVybCdcbmltcG9ydCB7IE5leHRSb3V0ZXIgfSBmcm9tICcuL3JvdXRlci9yb3V0ZXInXG5pbXBvcnQgeyBFbnYgfSBmcm9tICdAbmV4dC9lbnYnXG5pbXBvcnQgeyBCdWlsZE1hbmlmZXN0IH0gZnJvbSAnLi4vc2VydmVyL2dldC1wYWdlLWZpbGVzJ1xuaW1wb3J0IHsgRG9tYWluTG9jYWxlcyB9IGZyb20gJy4uL3NlcnZlci9jb25maWcnXG5pbXBvcnQgeyBQcmV2aWV3RGF0YSB9IGZyb20gJ25leHQvdHlwZXMnXG5cbi8qKlxuICogVHlwZXMgdXNlZCBieSBib3RoIG5leHQgYW5kIG5leHQtc2VydmVyXG4gKi9cblxuZXhwb3J0IHR5cGUgTmV4dENvbXBvbmVudFR5cGU8XG4gIEMgZXh0ZW5kcyBCYXNlQ29udGV4dCA9IE5leHRQYWdlQ29udGV4dCxcbiAgSVAgPSB7fSxcbiAgUCA9IHt9XG4+ID0gQ29tcG9uZW50VHlwZTxQPiAmIHtcbiAgLyoqXG4gICAqIFVzZWQgZm9yIGluaXRpYWwgcGFnZSBsb2FkIGRhdGEgcG9wdWxhdGlvbi4gRGF0YSByZXR1cm5lZCBmcm9tIGBnZXRJbml0aWFsUHJvcHNgIGlzIHNlcmlhbGl6ZWQgd2hlbiBzZXJ2ZXIgcmVuZGVyZWQuXG4gICAqIE1ha2Ugc3VyZSB0byByZXR1cm4gcGxhaW4gYE9iamVjdGAgd2l0aG91dCB1c2luZyBgRGF0ZWAsIGBNYXBgLCBgU2V0YC5cbiAgICogQHBhcmFtIGN0eCBDb250ZXh0IG9mIGBwYWdlYFxuICAgKi9cbiAgZ2V0SW5pdGlhbFByb3BzPyhjb250ZXh0OiBDKTogSVAgfCBQcm9taXNlPElQPlxufVxuXG5leHBvcnQgdHlwZSBEb2N1bWVudFR5cGUgPSBOZXh0Q29tcG9uZW50VHlwZTxcbiAgRG9jdW1lbnRDb250ZXh0LFxuICBEb2N1bWVudEluaXRpYWxQcm9wcyxcbiAgRG9jdW1lbnRQcm9wc1xuPiAmIHtcbiAgcmVuZGVyRG9jdW1lbnQoXG4gICAgRG9jdW1lbnQ6IERvY3VtZW50VHlwZSxcbiAgICBwcm9wczogRG9jdW1lbnRQcm9wc1xuICApOiBSZWFjdC5SZWFjdEVsZW1lbnRcbn1cblxuZXhwb3J0IHR5cGUgQXBwVHlwZSA9IE5leHRDb21wb25lbnRUeXBlPFxuICBBcHBDb250ZXh0VHlwZSxcbiAgQXBwSW5pdGlhbFByb3BzLFxuICBBcHBQcm9wc1R5cGVcbj5cblxuZXhwb3J0IHR5cGUgQXBwVHJlZVR5cGUgPSBDb21wb25lbnRUeXBlPFxuICBBcHBJbml0aWFsUHJvcHMgJiB7IFtuYW1lOiBzdHJpbmddOiBhbnkgfVxuPlxuXG4vKipcbiAqIFdlYiB2aXRhbHMgcHJvdmlkZWQgdG8gX2FwcC5yZXBvcnRXZWJWaXRhbHMgYnkgQ29yZSBXZWIgVml0YWxzIHBsdWdpbiBkZXZlbG9wZWQgYnkgR29vZ2xlIENocm9tZSB0ZWFtLlxuICogaHR0cHM6Ly9uZXh0anMub3JnL2Jsb2cvbmV4dC05LTQjaW50ZWdyYXRlZC13ZWItdml0YWxzLXJlcG9ydGluZ1xuICovXG5leHBvcnQgdHlwZSBOZXh0V2ViVml0YWxzTWV0cmljID0ge1xuICBpZDogc3RyaW5nXG4gIGxhYmVsOiBzdHJpbmdcbiAgbmFtZTogc3RyaW5nXG4gIHN0YXJ0VGltZTogbnVtYmVyXG4gIHZhbHVlOiBudW1iZXJcbn1cblxuZXhwb3J0IHR5cGUgRW5oYW5jZXI8Qz4gPSAoQ29tcG9uZW50OiBDKSA9PiBDXG5cbmV4cG9ydCB0eXBlIENvbXBvbmVudHNFbmhhbmNlciA9XG4gIHwge1xuICAgICAgZW5oYW5jZUFwcD86IEVuaGFuY2VyPEFwcFR5cGU+XG4gICAgICBlbmhhbmNlQ29tcG9uZW50PzogRW5oYW5jZXI8TmV4dENvbXBvbmVudFR5cGU+XG4gICAgfVxuICB8IEVuaGFuY2VyPE5leHRDb21wb25lbnRUeXBlPlxuXG5leHBvcnQgdHlwZSBSZW5kZXJQYWdlUmVzdWx0ID0ge1xuICBodG1sOiBzdHJpbmdcbiAgaGVhZD86IEFycmF5PEpTWC5FbGVtZW50IHwgbnVsbD5cbn1cblxuZXhwb3J0IHR5cGUgUmVuZGVyUGFnZSA9IChcbiAgb3B0aW9ucz86IENvbXBvbmVudHNFbmhhbmNlclxuKSA9PiBSZW5kZXJQYWdlUmVzdWx0IHwgUHJvbWlzZTxSZW5kZXJQYWdlUmVzdWx0PlxuXG5leHBvcnQgdHlwZSBCYXNlQ29udGV4dCA9IHtcbiAgcmVzPzogU2VydmVyUmVzcG9uc2VcbiAgW2s6IHN0cmluZ106IGFueVxufVxuXG5leHBvcnQgdHlwZSBORVhUX0RBVEEgPSB7XG4gIHByb3BzOiBSZWNvcmQ8c3RyaW5nLCBhbnk+XG4gIHBhZ2U6IHN0cmluZ1xuICBxdWVyeTogUGFyc2VkVXJsUXVlcnlcbiAgYnVpbGRJZDogc3RyaW5nXG4gIGFzc2V0UHJlZml4Pzogc3RyaW5nXG4gIHJ1bnRpbWVDb25maWc/OiB7IFtrZXk6IHN0cmluZ106IGFueSB9XG4gIG5leHRFeHBvcnQ/OiBib29sZWFuXG4gIGF1dG9FeHBvcnQ/OiBib29sZWFuXG4gIGlzRmFsbGJhY2s/OiBib29sZWFuXG4gIGR5bmFtaWNJZHM/OiAoc3RyaW5nIHwgbnVtYmVyKVtdXG4gIGVycj86IEVycm9yICYgeyBzdGF0dXNDb2RlPzogbnVtYmVyIH1cbiAgZ3NwPzogYm9vbGVhblxuICBnc3NwPzogYm9vbGVhblxuICBjdXN0b21TZXJ2ZXI/OiBib29sZWFuXG4gIGdpcD86IGJvb2xlYW5cbiAgYXBwR2lwPzogYm9vbGVhblxuICBsb2NhbGU/OiBzdHJpbmdcbiAgbG9jYWxlcz86IHN0cmluZ1tdXG4gIGRlZmF1bHRMb2NhbGU/OiBzdHJpbmdcbiAgZG9tYWluTG9jYWxlcz86IERvbWFpbkxvY2FsZXNcbiAgc2NyaXB0TG9hZGVyPzogYW55W11cbiAgaXNQcmV2aWV3PzogYm9vbGVhblxufVxuXG4vKipcbiAqIGBOZXh0YCBjb250ZXh0XG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTmV4dFBhZ2VDb250ZXh0IHtcbiAgLyoqXG4gICAqIEVycm9yIG9iamVjdCBpZiBlbmNvdW50ZXJlZCBkdXJpbmcgcmVuZGVyaW5nXG4gICAqL1xuICBlcnI/OiAoRXJyb3IgJiB7IHN0YXR1c0NvZGU/OiBudW1iZXIgfSkgfCBudWxsXG4gIC8qKlxuICAgKiBgSFRUUGAgcmVxdWVzdCBvYmplY3QuXG4gICAqL1xuICByZXE/OiBJbmNvbWluZ01lc3NhZ2VcbiAgLyoqXG4gICAqIGBIVFRQYCByZXNwb25zZSBvYmplY3QuXG4gICAqL1xuICByZXM/OiBTZXJ2ZXJSZXNwb25zZVxuICAvKipcbiAgICogUGF0aCBzZWN0aW9uIG9mIGBVUkxgLlxuICAgKi9cbiAgcGF0aG5hbWU6IHN0cmluZ1xuICAvKipcbiAgICogUXVlcnkgc3RyaW5nIHNlY3Rpb24gb2YgYFVSTGAgcGFyc2VkIGFzIGFuIG9iamVjdC5cbiAgICovXG4gIHF1ZXJ5OiBQYXJzZWRVcmxRdWVyeVxuICAvKipcbiAgICogYFN0cmluZ2Agb2YgdGhlIGFjdHVhbCBwYXRoIGluY2x1ZGluZyBxdWVyeS5cbiAgICovXG4gIGFzUGF0aD86IHN0cmluZ1xuICAvKipcbiAgICogVGhlIGN1cnJlbnRseSBhY3RpdmUgbG9jYWxlXG4gICAqL1xuICBsb2NhbGU/OiBzdHJpbmdcbiAgLyoqXG4gICAqIEFsbCBjb25maWd1cmVkIGxvY2FsZXNcbiAgICovXG4gIGxvY2FsZXM/OiBzdHJpbmdbXVxuICAvKipcbiAgICogVGhlIGNvbmZpZ3VyZWQgZGVmYXVsdCBsb2NhbGVcbiAgICovXG4gIGRlZmF1bHRMb2NhbGU/OiBzdHJpbmdcbiAgLyoqXG4gICAqIGBDb21wb25lbnRgIHRoZSB0cmVlIG9mIHRoZSBBcHAgdG8gdXNlIGlmIG5lZWRpbmcgdG8gcmVuZGVyIHNlcGFyYXRlbHlcbiAgICovXG4gIEFwcFRyZWU6IEFwcFRyZWVUeXBlXG59XG5cbmV4cG9ydCB0eXBlIEFwcENvbnRleHRUeXBlPFIgZXh0ZW5kcyBOZXh0Um91dGVyID0gTmV4dFJvdXRlcj4gPSB7XG4gIENvbXBvbmVudDogTmV4dENvbXBvbmVudFR5cGU8TmV4dFBhZ2VDb250ZXh0PlxuICBBcHBUcmVlOiBBcHBUcmVlVHlwZVxuICBjdHg6IE5leHRQYWdlQ29udGV4dFxuICByb3V0ZXI6IFJcbn1cblxuZXhwb3J0IHR5cGUgQXBwSW5pdGlhbFByb3BzID0ge1xuICBwYWdlUHJvcHM6IGFueVxufVxuXG5leHBvcnQgdHlwZSBBcHBQcm9wc1R5cGU8XG4gIFIgZXh0ZW5kcyBOZXh0Um91dGVyID0gTmV4dFJvdXRlcixcbiAgUCA9IHt9XG4+ID0gQXBwSW5pdGlhbFByb3BzICYge1xuICBDb21wb25lbnQ6IE5leHRDb21wb25lbnRUeXBlPE5leHRQYWdlQ29udGV4dCwgYW55LCBQPlxuICByb3V0ZXI6IFJcbiAgX19OX1NTRz86IGJvb2xlYW5cbiAgX19OX1NTUD86IGJvb2xlYW5cbn1cblxuZXhwb3J0IHR5cGUgRG9jdW1lbnRDb250ZXh0ID0gTmV4dFBhZ2VDb250ZXh0ICYge1xuICByZW5kZXJQYWdlOiBSZW5kZXJQYWdlXG59XG5cbmV4cG9ydCB0eXBlIERvY3VtZW50SW5pdGlhbFByb3BzID0gUmVuZGVyUGFnZVJlc3VsdCAmIHtcbiAgc3R5bGVzPzogUmVhY3QuUmVhY3RFbGVtZW50W10gfCBSZWFjdC5SZWFjdEZyYWdtZW50XG59XG5cbmV4cG9ydCB0eXBlIERvY3VtZW50UHJvcHMgPSBEb2N1bWVudEluaXRpYWxQcm9wcyAmIHtcbiAgX19ORVhUX0RBVEFfXzogTkVYVF9EQVRBXG4gIGRhbmdlcm91c0FzUGF0aDogc3RyaW5nXG4gIGRvY0NvbXBvbmVudHNSZW5kZXJlZDoge1xuICAgIEh0bWw/OiBib29sZWFuXG4gICAgTWFpbj86IGJvb2xlYW5cbiAgICBIZWFkPzogYm9vbGVhblxuICAgIE5leHRTY3JpcHQ/OiBib29sZWFuXG4gIH1cbiAgYnVpbGRNYW5pZmVzdDogQnVpbGRNYW5pZmVzdFxuICBhbXBQYXRoOiBzdHJpbmdcbiAgaW5BbXBNb2RlOiBib29sZWFuXG4gIGh5YnJpZEFtcDogYm9vbGVhblxuICBpc0RldmVsb3BtZW50OiBib29sZWFuXG4gIGR5bmFtaWNJbXBvcnRzOiBzdHJpbmdbXVxuICBhc3NldFByZWZpeD86IHN0cmluZ1xuICBjYW5vbmljYWxCYXNlOiBzdHJpbmdcbiAgaGVhZFRhZ3M6IGFueVtdXG4gIHVuc3RhYmxlX3J1bnRpbWVKUz86IGZhbHNlXG4gIHVuc3RhYmxlX0pzUHJlbG9hZD86IGZhbHNlXG4gIGRldk9ubHlDYWNoZUJ1c3RlclF1ZXJ5U3RyaW5nOiBzdHJpbmdcbiAgc2NyaXB0TG9hZGVyOiB7IGFmdGVySW50ZXJhY3RpdmU/OiBzdHJpbmdbXTsgYmVmb3JlSW50ZXJhY3RpdmU/OiBhbnlbXSB9XG4gIGxvY2FsZT86IHN0cmluZ1xuICBkaXNhYmxlT3B0aW1pemVkTG9hZGluZz86IGJvb2xlYW5cbn1cblxuLyoqXG4gKiBOZXh0IGBBUElgIHJvdXRlIHJlcXVlc3RcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBOZXh0QXBpUmVxdWVzdCBleHRlbmRzIEluY29taW5nTWVzc2FnZSB7XG4gIC8qKlxuICAgKiBPYmplY3Qgb2YgYHF1ZXJ5YCB2YWx1ZXMgZnJvbSB1cmxcbiAgICovXG4gIHF1ZXJ5OiB7XG4gICAgW2tleTogc3RyaW5nXTogc3RyaW5nIHwgc3RyaW5nW11cbiAgfVxuICAvKipcbiAgICogT2JqZWN0IG9mIGBjb29raWVzYCBmcm9tIGhlYWRlclxuICAgKi9cbiAgY29va2llczoge1xuICAgIFtrZXk6IHN0cmluZ106IHN0cmluZ1xuICB9XG5cbiAgYm9keTogYW55XG5cbiAgZW52OiBFbnZcblxuICBwcmV2aWV3PzogYm9vbGVhblxuICAvKipcbiAgICogUHJldmlldyBkYXRhIHNldCBvbiB0aGUgcmVxdWVzdCwgaWYgYW55XG4gICAqICovXG4gIHByZXZpZXdEYXRhPzogUHJldmlld0RhdGFcbn1cblxuLyoqXG4gKiBTZW5kIGJvZHkgb2YgcmVzcG9uc2VcbiAqL1xudHlwZSBTZW5kPFQ+ID0gKGJvZHk6IFQpID0+IHZvaWRcblxuLyoqXG4gKiBOZXh0IGBBUElgIHJvdXRlIHJlc3BvbnNlXG4gKi9cbmV4cG9ydCB0eXBlIE5leHRBcGlSZXNwb25zZTxUID0gYW55PiA9IFNlcnZlclJlc3BvbnNlICYge1xuICAvKipcbiAgICogU2VuZCBkYXRhIGBhbnlgIGRhdGEgaW4gcmVzcG9uc2VcbiAgICovXG4gIHNlbmQ6IFNlbmQ8VD5cbiAgLyoqXG4gICAqIFNlbmQgZGF0YSBganNvbmAgZGF0YSBpbiByZXNwb25zZVxuICAgKi9cbiAganNvbjogU2VuZDxUPlxuICBzdGF0dXM6IChzdGF0dXNDb2RlOiBudW1iZXIpID0+IE5leHRBcGlSZXNwb25zZTxUPlxuICByZWRpcmVjdCh1cmw6IHN0cmluZyk6IE5leHRBcGlSZXNwb25zZTxUPlxuICByZWRpcmVjdChzdGF0dXM6IG51bWJlciwgdXJsOiBzdHJpbmcpOiBOZXh0QXBpUmVzcG9uc2U8VD5cblxuICAvKipcbiAgICogU2V0IHByZXZpZXcgZGF0YSBmb3IgTmV4dC5qcycgcHJlcmVuZGVyIG1vZGVcbiAgICovXG4gIHNldFByZXZpZXdEYXRhOiAoXG4gICAgZGF0YTogb2JqZWN0IHwgc3RyaW5nLFxuICAgIG9wdGlvbnM/OiB7XG4gICAgICAvKipcbiAgICAgICAqIFNwZWNpZmllcyB0aGUgbnVtYmVyIChpbiBzZWNvbmRzKSBmb3IgdGhlIHByZXZpZXcgc2Vzc2lvbiB0byBsYXN0IGZvci5cbiAgICAgICAqIFRoZSBnaXZlbiBudW1iZXIgd2lsbCBiZSBjb252ZXJ0ZWQgdG8gYW4gaW50ZWdlciBieSByb3VuZGluZyBkb3duLlxuICAgICAgICogQnkgZGVmYXVsdCwgbm8gbWF4aW11bSBhZ2UgaXMgc2V0IGFuZCB0aGUgcHJldmlldyBzZXNzaW9uIGZpbmlzaGVzXG4gICAgICAgKiB3aGVuIHRoZSBjbGllbnQgc2h1dHMgZG93biAoYnJvd3NlciBpcyBjbG9zZWQpLlxuICAgICAgICovXG4gICAgICBtYXhBZ2U/OiBudW1iZXJcbiAgICB9XG4gICkgPT4gTmV4dEFwaVJlc3BvbnNlPFQ+XG4gIGNsZWFyUHJldmlld0RhdGE6ICgpID0+IE5leHRBcGlSZXNwb25zZTxUPlxufVxuXG4vKipcbiAqIE5leHQgYEFQSWAgcm91dGUgaGFuZGxlclxuICovXG5leHBvcnQgdHlwZSBOZXh0QXBpSGFuZGxlcjxUID0gYW55PiA9IChcbiAgcmVxOiBOZXh0QXBpUmVxdWVzdCxcbiAgcmVzOiBOZXh0QXBpUmVzcG9uc2U8VD5cbikgPT4gdm9pZCB8IFByb21pc2U8dm9pZD5cblxuLyoqXG4gKiBVdGlsc1xuICovXG5leHBvcnQgZnVuY3Rpb24gZXhlY09uY2U8VCBleHRlbmRzICguLi5hcmdzOiBhbnlbXSkgPT4gUmV0dXJuVHlwZTxUPj4oXG4gIGZuOiBUXG4pOiBUIHtcbiAgbGV0IHVzZWQgPSBmYWxzZVxuICBsZXQgcmVzdWx0OiBSZXR1cm5UeXBlPFQ+XG5cbiAgcmV0dXJuICgoLi4uYXJnczogYW55W10pID0+IHtcbiAgICBpZiAoIXVzZWQpIHtcbiAgICAgIHVzZWQgPSB0cnVlXG4gICAgICByZXN1bHQgPSBmbiguLi5hcmdzKVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0XG4gIH0pIGFzIFRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldExvY2F0aW9uT3JpZ2luKCkge1xuICBjb25zdCB7IHByb3RvY29sLCBob3N0bmFtZSwgcG9ydCB9ID0gd2luZG93LmxvY2F0aW9uXG4gIHJldHVybiBgJHtwcm90b2NvbH0vLyR7aG9zdG5hbWV9JHtwb3J0ID8gJzonICsgcG9ydCA6ICcnfWBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFVSTCgpIHtcbiAgY29uc3QgeyBocmVmIH0gPSB3aW5kb3cubG9jYXRpb25cbiAgY29uc3Qgb3JpZ2luID0gZ2V0TG9jYXRpb25PcmlnaW4oKVxuICByZXR1cm4gaHJlZi5zdWJzdHJpbmcob3JpZ2luLmxlbmd0aClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldERpc3BsYXlOYW1lPFA+KENvbXBvbmVudDogQ29tcG9uZW50VHlwZTxQPikge1xuICByZXR1cm4gdHlwZW9mIENvbXBvbmVudCA9PT0gJ3N0cmluZydcbiAgICA/IENvbXBvbmVudFxuICAgIDogQ29tcG9uZW50LmRpc3BsYXlOYW1lIHx8IENvbXBvbmVudC5uYW1lIHx8ICdVbmtub3duJ1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNSZXNTZW50KHJlczogU2VydmVyUmVzcG9uc2UpIHtcbiAgcmV0dXJuIHJlcy5maW5pc2hlZCB8fCByZXMuaGVhZGVyc1NlbnRcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGxvYWRHZXRJbml0aWFsUHJvcHM8XG4gIEMgZXh0ZW5kcyBCYXNlQ29udGV4dCxcbiAgSVAgPSB7fSxcbiAgUCA9IHt9XG4+KEFwcDogTmV4dENvbXBvbmVudFR5cGU8QywgSVAsIFA+LCBjdHg6IEMpOiBQcm9taXNlPElQPiB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgaWYgKEFwcC5wcm90b3R5cGU/LmdldEluaXRpYWxQcm9wcykge1xuICAgICAgY29uc3QgbWVzc2FnZSA9IGBcIiR7Z2V0RGlzcGxheU5hbWUoXG4gICAgICAgIEFwcFxuICAgICAgKX0uZ2V0SW5pdGlhbFByb3BzKClcIiBpcyBkZWZpbmVkIGFzIGFuIGluc3RhbmNlIG1ldGhvZCAtIHZpc2l0IGh0dHBzOi8vbmV4dGpzLm9yZy9kb2NzL21lc3NhZ2VzL2dldC1pbml0aWFsLXByb3BzLWFzLWFuLWluc3RhbmNlLW1ldGhvZCBmb3IgbW9yZSBpbmZvcm1hdGlvbi5gXG4gICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSlcbiAgICB9XG4gIH1cbiAgLy8gd2hlbiBjYWxsZWQgZnJvbSBfYXBwIGBjdHhgIGlzIG5lc3RlZCBpbiBgY3R4YFxuICBjb25zdCByZXMgPSBjdHgucmVzIHx8IChjdHguY3R4ICYmIGN0eC5jdHgucmVzKVxuXG4gIGlmICghQXBwLmdldEluaXRpYWxQcm9wcykge1xuICAgIGlmIChjdHguY3R4ICYmIGN0eC5Db21wb25lbnQpIHtcbiAgICAgIC8vIEB0cy1pZ25vcmUgcGFnZVByb3BzIGRlZmF1bHRcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHBhZ2VQcm9wczogYXdhaXQgbG9hZEdldEluaXRpYWxQcm9wcyhjdHguQ29tcG9uZW50LCBjdHguY3R4KSxcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHt9IGFzIElQXG4gIH1cblxuICBjb25zdCBwcm9wcyA9IGF3YWl0IEFwcC5nZXRJbml0aWFsUHJvcHMoY3R4KVxuXG4gIGlmIChyZXMgJiYgaXNSZXNTZW50KHJlcykpIHtcbiAgICByZXR1cm4gcHJvcHNcbiAgfVxuXG4gIGlmICghcHJvcHMpIHtcbiAgICBjb25zdCBtZXNzYWdlID0gYFwiJHtnZXREaXNwbGF5TmFtZShcbiAgICAgIEFwcFxuICAgICl9LmdldEluaXRpYWxQcm9wcygpXCIgc2hvdWxkIHJlc29sdmUgdG8gYW4gb2JqZWN0LiBCdXQgZm91bmQgXCIke3Byb3BzfVwiIGluc3RlYWQuYFxuICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKVxuICB9XG5cbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBpZiAoT2JqZWN0LmtleXMocHJvcHMpLmxlbmd0aCA9PT0gMCAmJiAhY3R4LmN0eCkge1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICBgJHtnZXREaXNwbGF5TmFtZShcbiAgICAgICAgICBBcHBcbiAgICAgICAgKX0gcmV0dXJuZWQgYW4gZW1wdHkgb2JqZWN0IGZyb20gXFxgZ2V0SW5pdGlhbFByb3BzXFxgLiBUaGlzIGRlLW9wdGltaXplcyBhbmQgcHJldmVudHMgYXV0b21hdGljIHN0YXRpYyBvcHRpbWl6YXRpb24uIGh0dHBzOi8vbmV4dGpzLm9yZy9kb2NzL21lc3NhZ2VzL2VtcHR5LW9iamVjdC1nZXRJbml0aWFsUHJvcHNgXG4gICAgICApXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHByb3BzXG59XG5cbmV4cG9ydCBjb25zdCB1cmxPYmplY3RLZXlzID0gW1xuICAnYXV0aCcsXG4gICdoYXNoJyxcbiAgJ2hvc3QnLFxuICAnaG9zdG5hbWUnLFxuICAnaHJlZicsXG4gICdwYXRoJyxcbiAgJ3BhdGhuYW1lJyxcbiAgJ3BvcnQnLFxuICAncHJvdG9jb2wnLFxuICAncXVlcnknLFxuICAnc2VhcmNoJyxcbiAgJ3NsYXNoZXMnLFxuXVxuXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0V2l0aFZhbGlkYXRpb24odXJsOiBVcmxPYmplY3QpOiBzdHJpbmcge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHtcbiAgICBpZiAodXJsICE9PSBudWxsICYmIHR5cGVvZiB1cmwgPT09ICdvYmplY3QnKSB7XG4gICAgICBPYmplY3Qua2V5cyh1cmwpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICBpZiAodXJsT2JqZWN0S2V5cy5pbmRleE9mKGtleSkgPT09IC0xKSB7XG4gICAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICAgYFVua25vd24ga2V5IHBhc3NlZCB2aWEgdXJsT2JqZWN0IGludG8gdXJsLmZvcm1hdDogJHtrZXl9YFxuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZm9ybWF0VXJsKHVybClcbn1cblxuZXhwb3J0IGNvbnN0IFNQID0gdHlwZW9mIHBlcmZvcm1hbmNlICE9PSAndW5kZWZpbmVkJ1xuZXhwb3J0IGNvbnN0IFNUID1cbiAgU1AgJiZcbiAgdHlwZW9mIHBlcmZvcm1hbmNlLm1hcmsgPT09ICdmdW5jdGlvbicgJiZcbiAgdHlwZW9mIHBlcmZvcm1hbmNlLm1lYXN1cmUgPT09ICdmdW5jdGlvbidcbiIsIlwidXNlIHN0cmljdFwiO2V4cG9ydHMuX19lc01vZHVsZT10cnVlO2V4cG9ydHMubm9ybWFsaXplUGF0aFNlcD1ub3JtYWxpemVQYXRoU2VwO2V4cG9ydHMuZGVub3JtYWxpemVQYWdlUGF0aD1kZW5vcm1hbGl6ZVBhZ2VQYXRoO2Z1bmN0aW9uIG5vcm1hbGl6ZVBhdGhTZXAocGF0aCl7cmV0dXJuIHBhdGgucmVwbGFjZSgvXFxcXC9nLCcvJyk7fWZ1bmN0aW9uIGRlbm9ybWFsaXplUGFnZVBhdGgocGFnZSl7cGFnZT1ub3JtYWxpemVQYXRoU2VwKHBhZ2UpO2lmKHBhZ2Uuc3RhcnRzV2l0aCgnL2luZGV4LycpKXtwYWdlPXBhZ2Uuc2xpY2UoNik7fWVsc2UgaWYocGFnZT09PScvaW5kZXgnKXtwYWdlPScvJzt9cmV0dXJuIHBhZ2U7fVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGVub3JtYWxpemUtcGFnZS1wYXRoLmpzLm1hcCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9kaXN0L2NsaWVudC9saW5rJylcbiIsImZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7XG4gIHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7XG4gICAgXCJkZWZhdWx0XCI6IG9ialxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQ7IiwidmFyIF90eXBlb2YgPSByZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy90eXBlb2ZcIik7XG5cbmZ1bmN0aW9uIF9nZXRSZXF1aXJlV2lsZGNhcmRDYWNoZSgpIHtcbiAgaWYgKHR5cGVvZiBXZWFrTWFwICE9PSBcImZ1bmN0aW9uXCIpIHJldHVybiBudWxsO1xuICB2YXIgY2FjaGUgPSBuZXcgV2Vha01hcCgpO1xuXG4gIF9nZXRSZXF1aXJlV2lsZGNhcmRDYWNoZSA9IGZ1bmN0aW9uIF9nZXRSZXF1aXJlV2lsZGNhcmRDYWNoZSgpIHtcbiAgICByZXR1cm4gY2FjaGU7XG4gIH07XG5cbiAgcmV0dXJuIGNhY2hlO1xufVxuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChvYmopIHtcbiAgaWYgKG9iaiAmJiBvYmouX19lc01vZHVsZSkge1xuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICBpZiAob2JqID09PSBudWxsIHx8IF90eXBlb2Yob2JqKSAhPT0gXCJvYmplY3RcIiAmJiB0eXBlb2Ygb2JqICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgXCJkZWZhdWx0XCI6IG9ialxuICAgIH07XG4gIH1cblxuICB2YXIgY2FjaGUgPSBfZ2V0UmVxdWlyZVdpbGRjYXJkQ2FjaGUoKTtcblxuICBpZiAoY2FjaGUgJiYgY2FjaGUuaGFzKG9iaikpIHtcbiAgICByZXR1cm4gY2FjaGUuZ2V0KG9iaik7XG4gIH1cblxuICB2YXIgbmV3T2JqID0ge307XG4gIHZhciBoYXNQcm9wZXJ0eURlc2NyaXB0b3IgPSBPYmplY3QuZGVmaW5lUHJvcGVydHkgJiYgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcblxuICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIHtcbiAgICAgIHZhciBkZXNjID0gaGFzUHJvcGVydHlEZXNjcmlwdG9yID8gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSkgOiBudWxsO1xuXG4gICAgICBpZiAoZGVzYyAmJiAoZGVzYy5nZXQgfHwgZGVzYy5zZXQpKSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShuZXdPYmosIGtleSwgZGVzYyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuZXdPYmpba2V5XSA9IG9ialtrZXldO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG5ld09ialtcImRlZmF1bHRcIl0gPSBvYmo7XG5cbiAgaWYgKGNhY2hlKSB7XG4gICAgY2FjaGUuc2V0KG9iaiwgbmV3T2JqKTtcbiAgfVxuXG4gIHJldHVybiBuZXdPYmo7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQ7IiwiZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgXCJAYmFiZWwvaGVscGVycyAtIHR5cGVvZlwiO1xuXG4gIGlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIikge1xuICAgIG1vZHVsZS5leHBvcnRzID0gX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIG9iajtcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIG1vZHVsZS5leHBvcnRzID0gX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gICAgICByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajtcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIF90eXBlb2Yob2JqKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfdHlwZW9mOyIsImltcG9ydCB7IHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSBcIm5leHQvcm91dGVyXCI7XG5pbXBvcnQgeyB1c2VBdXRoIH0gZnJvbSBcIi4uL2NvbnRleHQvQXV0aFVzZXJDb250ZXh0XCI7XG5pbXBvcnQgeyBDb250YWluZXIgfSBmcm9tIFwicmVhY3QtYm9vdHN0cmFwXCI7XG5cbmNvbnN0IExvZ2dlZEluID0gKHsgY2hpbGRyZW4gfSkgPT4ge1xuICBjb25zdCB7IGF1dGhVc2VyLCBsb2FkaW5nIH0gPSB1c2VBdXRoKCk7XG4gIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpO1xuXG4gIC8vIFJlZGlyZWN0IG9ubHkgYWZ0ZXIgYSBzaG9ydCBkZWxheSBpZiBhdXRoVXNlciByZW1haW5zIG51bGwuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc29sZS5sb2coXCI9PT0gTE9HR0VESU4gQVVUSCBDSEVDSyA9PT1cIik7XG4gICAgY29uc29sZS5sb2coXCJsb2FkaW5nOlwiLCBsb2FkaW5nKTtcbiAgICBjb25zb2xlLmxvZyhcImF1dGhVc2VyOlwiLCBhdXRoVXNlcik7XG4gICAgY29uc29sZS5sb2coXCJyb3V0ZXIuYXNQYXRoOlwiLCByb3V0ZXIuYXNQYXRoKTtcblxuICAgIGlmICghbG9hZGluZyAmJiBhdXRoVXNlciA9PT0gbnVsbCkge1xuICAgICAgY29uc29sZS5sb2coXCJObyBhdXRoIHVzZXIsIHdpbGwgcmVkaXJlY3QgdG8gbG9naW4gaW4gODAwbXNcIik7XG4gICAgICAvLyBTZXQgYSBkZWxheSAoZS5nLiA1MDBtcykgdG8gZ2l2ZSBGaXJlYmFzZSBBdXRoIGEgY2hhbmNlIHRvIHJlaHlkcmF0ZS5cbiAgICAgIGNvbnN0IHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiUmVkaXJlY3RpbmcgdG8gbG9naW4gbm93XCIpO1xuICAgICAgICByb3V0ZXIucHVzaChgLz9yZWRpcmVjdD0ke2VuY29kZVVSSUNvbXBvbmVudChyb3V0ZXIuYXNQYXRoKX1gKTtcbiAgICAgIH0sIDgwMCk7XG4gICAgICByZXR1cm4gKCkgPT4gY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICB9XG4gIH0sIFthdXRoVXNlciwgbG9hZGluZywgcm91dGVyXSk7XG5cbiAgaWYgKGxvYWRpbmcpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPENvbnRhaW5lclxuICAgICAgICBjbGFzc05hbWU9XCJkLWZsZXggYWxpZ24taXRlbXMtY2VudGVyIGp1c3RpZnktY29udGVudC1jZW50ZXJcIlxuICAgICAgICBzdHlsZT17eyBtaW5IZWlnaHQ6IFwiMTAwdmhcIiB9fVxuICAgICAgPlxuICAgICAgICA8aDM+TG9hZGluZy4uLjwvaDM+XG4gICAgICA8L0NvbnRhaW5lcj5cbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIDw+e2F1dGhVc2VyICYmIGNoaWxkcmVufTwvPjtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IExvZ2dlZEluO1xuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUsIHVzZVJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFwiYm9vdHN0cmFwL2Rpc3QvY3NzL2Jvb3RzdHJhcC5taW4uY3NzXCI7XG5pbXBvcnQge1xuICBGb3JtLFxuICBCdXR0b24sXG4gIENhcmQsXG4gIENvbnRhaW5lcixcbiAgUm93LFxuICBDb2wsXG4gIE1vZGFsLFxuICBGb3JtQ29udHJvbCxcbiAgQ29sbGFwc2UsXG4gIElucHV0R3JvdXAsXG4gIEJ1dHRvbkdyb3VwLFxuICBTcGlubmVyLFxufSBmcm9tIFwicmVhY3QtYm9vdHN0cmFwXCI7XG5pbXBvcnQgTGluayBmcm9tIFwibmV4dC9saW5rXCI7XG5pbXBvcnQgZHluYW1pYyBmcm9tIFwibmV4dC9keW5hbWljXCI7XG5pbXBvcnQgeyB1c2VBdXRoIH0gZnJvbSBcIi4uLy4uLy4uL2NvbnRleHQvQXV0aFVzZXJDb250ZXh0XCI7XG5pbXBvcnQgZmlyZWJhc2UgZnJvbSBcIi4uLy4uLy4uL2NvbnRleHQvRmlyZWJhc2VcIjtcbmltcG9ydCBMb2dnZWRJbiBmcm9tIFwiLi4vLi4vTG9nZ2VkSW5cIjtcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gXCJuZXh0L3JvdXRlclwiO1xuaW1wb3J0IHsgZmV0Y2hDbGllbnRzIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2ZldGNoQXNzb2NpYXRpb25zXCI7XG5pbXBvcnQgQ2xpZW50VGFibGUgZnJvbSBcIi4uLy4uLy4uL3V0aWxzL0NsaWVudFRhYmxlXCI7XG5pbXBvcnQgQ2xpZW50SW5mb01vZGFsIGZyb20gXCIuLi9DbGllbnRJbmZvTW9kYWxcIjtcbmltcG9ydCBQYXJlbnRNb2RhbCBmcm9tIFwiLi9wYXJlbnRNb2RhbFwiO1xuaW1wb3J0IE1hY2hpbmVTZWxlY3Rpb25Nb2RhbCBmcm9tIFwiLi4vaXRlbS9baWRdL01hY2hpbmVTZWxlY3Rpb25Nb2RhbFwiO1xuaW1wb3J0IEluZm9Nb2RhbCBmcm9tIFwiLi4vSW5mb01vZGFsXCI7XG5cbi8vIExvYWQgQmFyY29kZVNjYW5uZXJDb21wb25lbnQgb25seSBvbiB0aGUgY2xpZW50LXNpZGUuXG5jb25zdCBCYXJjb2RlU2Nhbm5lckNvbXBvbmVudCA9IGR5bmFtaWMoXG4gICgpID0+IGltcG9ydChcInJlYWN0LXFyLWJhcmNvZGUtc2Nhbm5lclwiKSxcbiAgeyBzc3I6IGZhbHNlIH1cbik7XG5cbi8vIFNpbXVsYXRlIG5ldHdvcmsgZGVsYXkuXG5mdW5jdGlvbiBzaW11bGF0ZU5ldHdvcmtSZXF1ZXN0KCkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgMjAwMCkpO1xufVxuXG4vLyBDdXN0b20gTG9hZGluZ0J1dHRvbiBjb21wb25lbnQuXG5mdW5jdGlvbiBMb2FkaW5nQnV0dG9uKHsgdHlwZSwgbmFtZSwgcm91dGUgfSkge1xuICBjb25zdCBbaXNMb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoaXNMb2FkaW5nKSB7XG4gICAgICBzaW11bGF0ZU5ldHdvcmtSZXF1ZXN0KCkudGhlbigoKSA9PiBzZXRMb2FkaW5nKGZhbHNlKSk7XG4gICAgfVxuICB9LCBbaXNMb2FkaW5nXSk7XG4gIGNvbnN0IGhhbmRsZUNsaWNrID0gKCkgPT4gc2V0TG9hZGluZyh0cnVlKTtcbiAgcmV0dXJuIChcbiAgICA8TGluayBocmVmPXtgLyR7cm91dGV9YH0+XG4gICAgICA8YVxuICAgICAgICBjbGFzc05hbWU9e2BidG4gYnRuLSR7dHlwZX1gfVxuICAgICAgICBkaXNhYmxlZD17aXNMb2FkaW5nfVxuICAgICAgICBvbkNsaWNrPXshaXNMb2FkaW5nID8gaGFuZGxlQ2xpY2sgOiBudWxsfVxuICAgICAgPlxuICAgICAgICB7aXNMb2FkaW5nID8gXCJMb2FkaW5n4oCmXCIgOiBuYW1lfVxuICAgICAgPC9hPlxuICAgIDwvTGluaz5cbiAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTmV3SXRlbSgpIHtcbiAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XG4gIGNvbnN0IHsgc2lnbk91dCB9ID0gdXNlQXV0aCgpO1xuICAvLyBJbml0aWFsaXplIGl0ZW0gc3RhdGUg4oCTIGZvciBhIG5ldyBpdGVtLCB0aGVzZSBzdGFydCBlbXB0eS5cbiAgLy8gV2Ugc3RvcmUgUE4gYW5kIFNOIGFzIGFycmF5cy5cbiAgY29uc3QgW2l0ZW1zLCBzZXRJdGVtc10gPSB1c2VTdGF0ZSh7XG4gICAgbmFtZTogXCJcIixcbiAgICBwbjogW1wiXCJdLFxuICAgIHNuOiBbXCJcIl0sIC8vIFRoaXMgd2lsbCBiZSBvdmVycmlkZGVuIG9uIHN1Ym1pdC5cbiAgICBsb2NhbFNOOiBcIlwiLCAvLyBORVcgRklFTEQ6IGhvbGRzIHVzZXIgaW5wdXQgZm9yIGEgbG9jYWwgc2VyaWFsIG51bWJlci5cbiAgICBwcmljZTogXCJcIixcbiAgICBzdGF0dXM6IFwiXCIsXG4gICAgcG9OdW1iZXI6IFwiXCIsXG4gICAgbGVuZ3RoOiBcIlwiLFxuICAgIHdpZHRoOiBcIlwiLFxuICAgIGhlaWdodDogXCJcIixcbiAgICBhcnJpdmFsX2RhdGU6IFwiXCIsIC8vIE5FVyBGSUVMRDogQXJyaXZhbCBEYXRlXG4gICAgdmlzaWJsZTogdHJ1ZSxcbiAgfSk7XG5cbiAgY29uc3QgW2VkaXRpbmdQbiwgc2V0RWRpdGluZ1BuXSA9IHVzZVN0YXRlKHRydWUpO1xuICAvLyBjb25zdCBbbmV3UG4sIHNldE5ld1BuXSA9IHVzZVN0YXRlKFwiXCIpOyAvLyBmb3IgdGhlIGlucHV0IHZhbHVlIHdoZW4gZWRpdGluZ1xuXG4gIGNvbnN0IFtlZGl0aW5nU24sIHNldEVkaXRpbmdTbl0gPSB1c2VTdGF0ZSh0cnVlKTtcbiAgLy8gY29uc3QgW25ld1NuLCBzZXROZXdTbl0gPSB1c2VTdGF0ZShcIlwiKTtcblxuICAvLyBET00gaXMgdGhlIERhdGUgb2YgTWFudWZhY3R1cmUgaW5wdXQgKHVzZXIgcHJvdmlkZWQpLlxuICBjb25zdCBbRE9NLCBzZXRET01dID0gdXNlU3RhdGUoXCJcIik7XG4gIC8vIE9FTSwgTW9kYWxpdHksIE1vZGVsIGZpZWxkcy5cbiAgY29uc3QgW29lbSwgc2V0T2VtXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbbW9kYWxpdHksIHNldE1vZGFsaXR5XSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbbW9kZWwsIHNldE1vZGVsXSA9IHVzZVN0YXRlKFwiXCIpO1xuXG4gIC8vIExvY2FsIGxvY2F0aW9uIHN0YXRlcy5cbiAgY29uc3QgW2xvY2FsTG9jRnJvbSwgc2V0TG9jYWxMb2NGcm9tXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbbG9jYWxMb2NDdXJyZW50LCBzZXRMb2NhbExvY0N1cnJlbnRdID0gdXNlU3RhdGUoXCJcIik7XG5cbiAgLy8gT3RoZXIgc3RhdGVzLlxuICBjb25zdCBbcG5PcHRpb25zLCBzZXRQbk9wdGlvbnNdID0gdXNlU3RhdGUoW10pO1xuICBjb25zdCBbc25PcHRpb25zLCBzZXRTbk9wdGlvbnNdID0gdXNlU3RhdGUoW10pO1xuICBjb25zdCBbZGVzY3JpcHRpb25zLCBzZXREZXNjcmlwdGlvbnNdID0gdXNlU3RhdGUoW1xuICAgIHsgZGVzY3JpcHRpb246IFwiXCIsIGRhdGU6IFwiXCIgfSxcbiAgXSk7XG4gIGNvbnN0IFt3b3JrT3JkZXJzLCBzZXRXb3JrT3JkZXJzXSA9IHVzZVN0YXRlKFt7IHdvcmtPcmRlcjogXCJcIiwgZGF0ZTogXCJcIiB9XSk7XG4gIGNvbnN0IFtjbGllbnRzLCBzZXRDbGllbnRzXSA9IHVzZVN0YXRlKFtdKTtcbiAgY29uc3QgW3Bob3Rvcywgc2V0UGhvdG9zXSA9IHVzZVN0YXRlKFtdKTtcbiAgY29uc3QgW3Nob3csIHNldFNob3ddID0gdXNlU3RhdGUoZmFsc2UpOyAvLyBlcnJvciBtb2RhbCBmb3IgbWlzc2luZyByZXF1aXJlZCBmaWVsZHNcbiAgY29uc3QgW3Nob3dFcnIsIHNldFNob3dFcnJdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbRXJyLCBzZXRFcnJdID0gdXNlU3RhdGUoXG4gICAgXCJNaXNzaW5nIHJlcXVpcmVkIGZpZWxkOiBOYW1lIGFuZCBEZXNjcmlwdGlvblwiXG4gICk7XG4gIGNvbnN0IFtzaG93RGVzY01vZGFsLCBzZXRTaG93RGVzY01vZGFsXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3Nob3dXb01vZGFsLCBzZXRTaG93V29Nb2RhbF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtzaG93Q2xpZW50TW9kYWwsIHNldFNob3dDbGllbnRNb2RhbF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtzaG93TWFjaGluZU1vZGFsLCBzZXRTaG93TWFjaGluZU1vZGFsXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3Nob3dQYXJlbnRNb2RhbCwgc2V0U2hvd1BhcmVudE1vZGFsXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3Nob3dDYW1lcmFNb2RhbCwgc2V0U2hvd0NhbWVyYU1vZGFsXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3Nob3dTYXZlTW9kYWwsIHNldFNob3dTYXZlTW9kYWxdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbbWFjaGluZVNlbGVjdGlvbk1vZGFsLCBzZXRNYWNoaW5lU2VsZWN0aW9uTW9kYWxdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbc2VsZWN0ZWREZXNjLCBzZXRTZWxlY3RlZERlc2NdID0gdXNlU3RhdGUoMCk7XG4gIGNvbnN0IFtzZWxlY3RlZENsaWVudCwgc2V0U2VsZWN0ZWRDbGllbnRdID0gdXNlU3RhdGUobnVsbCk7XG4gIGNvbnN0IFtzZWxlY3RlZE1hY2hpbmUsIHNldFNlbGVjdGVkTWFjaGluZV0gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW3NlbGVjdGVkQ3VycmVudE1hY2hpbmUsIHNldFNlbGVjdGVkQ3VycmVudE1hY2hpbmVdID0gdXNlU3RhdGUobnVsbCk7XG4gIGNvbnN0IFtzZWxlY3RlZFBhcmVudCwgc2V0U2VsZWN0ZWRQYXJlbnRdID0gdXNlU3RhdGUobnVsbCk7XG4gIGNvbnN0IFtUaGVNYWNoaW5lLCBzZXRUaGVNYWNoaW5lXSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbbWFjaGluZU9wdGlvbnMsIHNldE1hY2hpbmVPcHRpb25zXSA9IHVzZVN0YXRlKFtdKTtcbiAgY29uc3QgW3NlYXJjaCwgc2V0U2VhcmNoXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbY2FwdHVyZWRQaG90bywgc2V0Q2FwdHVyZWRQaG90b10gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW2NhbWVyYUZhY2luZywgc2V0Q2FtZXJhRmFjaW5nXSA9IHVzZVN0YXRlKFwiZW52aXJvbm1lbnRcIik7XG4gIGNvbnN0IFthZGRUb1dlYnNpdGUsIHNldEFkZFRvV2Vic2l0ZV0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFttYWNoaW5lUGljaywgc2V0TWFjaGluZVBpY2tdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbZnJlcUl0ZW0sIHNldEZyZXFJdGVtXSA9IHVzZVN0YXRlKDApO1xuICBjb25zdCBbdXNhZ2VQYXN0WWVhciwgc2V0VXNhZ2VQYXN0WWVhcl0gPSB1c2VTdGF0ZSgwKTtcbiAgY29uc3QgW21hY2hpbmVGcmVxdWVuY3ksIHNldE1hY2hpbmVGcmVxdWVuY3ldID0gdXNlU3RhdGUoMCk7XG4gIC8vIEZvciBleHRyYSAoZGltZW5zaW9ucy9wcmljZS9ET00pIHNlY3Rpb24gY29sbGFwc2UuXG4gIGNvbnN0IFtzaG93RXh0cmEsIHNldFNob3dFeHRyYV0gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgLy8gRm9yIFBOL1NOIFwiYWRkIG5ld1wiIGZ1bmN0aW9uYWxpdHkuXG4gIGNvbnN0IFthZGRpbmdOZXdQbiwgc2V0QWRkaW5nTmV3UG5dID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbbmV3UG4sIHNldE5ld1BuXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbYWRkaW5nTmV3U24sIHNldEFkZGluZ05ld1NuXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW25ld1NuLCBzZXROZXdTbl0gPSB1c2VTdGF0ZShcIlwiKTtcblxuICAvLyBGb3IgYnJvd3NpbmcgcGhvdG9zLlxuICBjb25zdCBicm93c2VJbnB1dFJlZiA9IHVzZVJlZihudWxsKTtcblxuICAvLyBJbnNpZGUgeW91ciBOZXdJdGVtIGNvbXBvbmVudDpcbiAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIGlmICghcm91dGVyLmlzUmVhZHkpIHtcbiAgICByZXR1cm4gbnVsbDsgLy8gb3IgYSBsb2FkaW5nIGluZGljYXRvclxuICB9XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0gU2luY2UgdGhpcyBpcyBcImFkZFwiIG1vZGUsIHdlIGRvIG5vdCBmZXRjaCBhbiBleGlzdGluZyBkb2N1bWVudC5cbiAgLy8gSG93ZXZlciwgd2Ugc3RpbGwgZmV0Y2ggZ2xvYmFsIFBOIGFuZCBTTiBvcHRpb25zIGFuZCBjbGllbnRzIGZvciBzZWxlY3Rpb24uXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgYXN5bmMgZnVuY3Rpb24gZmV0Y2hDbGllbnRzRGF0YSgpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGNsaWVudHNEYXRhID0gYXdhaXQgZmV0Y2hDbGllbnRzKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ2xpZW50czpcIiwgY2xpZW50c0RhdGEpO1xuICAgICAgICBzZXRDbGllbnRzKGNsaWVudHNEYXRhKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBmZXRjaGluZyBjbGllbnRzOiBcIiwgZXJyb3IpO1xuICAgICAgfVxuICAgIH1cbiAgICBmZXRjaENsaWVudHNEYXRhKCk7XG4gIH0sIFtdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGFzeW5jIGZ1bmN0aW9uIGZldGNoUG5TbigpIHtcbiAgICAgIGNvbnN0IGRiID0gZmlyZWJhc2UuZmlyZXN0b3JlKCk7XG4gICAgICBjb25zdCBzbmFwc2hvdCA9IGF3YWl0IGRiLmNvbGxlY3Rpb24oXCJUZXN0XCIpLmdldCgpO1xuICAgICAgbGV0IHBuU2V0ID0gbmV3IFNldCgpO1xuICAgICAgbGV0IHNuU2V0ID0gbmV3IFNldCgpO1xuICAgICAgc25hcHNob3QuZm9yRWFjaCgoZG9jKSA9PiB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBkb2MuZGF0YSgpO1xuICAgICAgICBpZiAoZGF0YS5wbikgcG5TZXQuYWRkKGRhdGEucG4pO1xuICAgICAgICBpZiAoZGF0YS5zbikgc25TZXQuYWRkKGRhdGEuc24pO1xuICAgICAgfSk7XG4gICAgICBzZXRQbk9wdGlvbnMoWy4uLnBuU2V0XSk7XG4gICAgICBzZXRTbk9wdGlvbnMoWy4uLnNuU2V0XSk7XG4gICAgfVxuICAgIGZldGNoUG5TbigpO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgW21hY2hpbmVGaWVsZHNJbml0aWFsaXplZCwgc2V0TWFjaGluZUZpZWxkc0luaXRpYWxpemVkXSA9XG4gICAgdXNlU3RhdGUoZmFsc2UpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKFxuICAgICAgIW1hY2hpbmVGaWVsZHNJbml0aWFsaXplZCAmJlxuICAgICAgKFRoZU1hY2hpbmUgfHwgc2VsZWN0ZWRDdXJyZW50TWFjaGluZSB8fCBzZWxlY3RlZE1hY2hpbmUpXG4gICAgKSB7XG4gICAgICBjb25zdCB1cGRhdGVkRmllbGRzID0gdXBkYXRlTWFjaGluZUZpZWxkcyhcbiAgICAgICAgVGhlTWFjaGluZSxcbiAgICAgICAgc2VsZWN0ZWRDdXJyZW50TWFjaGluZSxcbiAgICAgICAgc2VsZWN0ZWRNYWNoaW5lXG4gICAgICApO1xuXG4gICAgICAvLyBPbmx5IHNldCBmaWVsZHMgaWYgdGhleSBhcmUgZW1wdHkgb3IgXCJOL0FcIlxuICAgICAgaWYgKCFvZW0gfHwgb2VtID09PSBcIk4vQVwiKSBzZXRPZW0odXBkYXRlZEZpZWxkcy5vZW0pO1xuICAgICAgaWYgKCFtb2RhbGl0eSB8fCBtb2RhbGl0eSA9PT0gXCJOL0FcIikgc2V0TW9kYWxpdHkodXBkYXRlZEZpZWxkcy5tb2RhbGl0eSk7XG4gICAgICBpZiAoIW1vZGVsIHx8IG1vZGVsID09PSBcIk4vQVwiKSBzZXRNb2RlbCh1cGRhdGVkRmllbGRzLm1vZGVsKTtcblxuICAgICAgc2V0TWFjaGluZUZpZWxkc0luaXRpYWxpemVkKHRydWUpO1xuICAgIH1cbiAgfSwgW1xuICAgIFRoZU1hY2hpbmUsXG4gICAgc2VsZWN0ZWRDdXJyZW50TWFjaGluZSxcbiAgICBzZWxlY3RlZE1hY2hpbmUsXG4gICAgbWFjaGluZUZpZWxkc0luaXRpYWxpemVkLFxuICBdKTtcblxuICBjb25zdCBbc2lnbmFsLCBzZXRTaWduYWxdID0gdXNlU3RhdGUobnVsbCk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAocm91dGVyLmlzUmVhZHkpIHtcbiAgICAgIHNldFNpZ25hbChyb3V0ZXIucXVlcnkuc2lnbmFsIHx8IG51bGwpO1xuICAgIH1cbiAgfSwgW3JvdXRlci5pc1JlYWR5LCByb3V0ZXIucXVlcnkuc2lnbmFsXSk7XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0gSGFuZGxlcnMgZm9yIFBOIGFuZCBTTiBkcm9wZG93bnNcblxuICAvLyBQTjogd2hlbiBhIHVzZXIgc2VsZWN0cyBhbiBleGlzdGluZyBQTiB2YWx1ZS5cbiAgY29uc3QgaGFuZGxlUG5TZWxlY3QgPSAoZSkgPT4ge1xuICAgIGNvbnN0IHNlbGVjdGVkID0gZS50YXJnZXQudmFsdWU7XG4gICAgc2V0SXRlbXMoKHByZXYpID0+IHtcbiAgICAgIGxldCB1cGRhdGVkUG4gPSBBcnJheS5pc0FycmF5KHByZXYucG4pID8gWy4uLnByZXYucG5dIDogW107XG4gICAgICB1cGRhdGVkUG5bMF0gPSBzZWxlY3RlZDtcbiAgICAgIHJldHVybiB7IC4uLnByZXYsIHBuOiB1cGRhdGVkUG4gfTtcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVQbkNoYW5nZSA9IChpbmRleCwgdmFsdWUpID0+IHtcbiAgICBzZXRJdGVtcygocHJldikgPT4ge1xuICAgICAgY29uc3QgbmV3UG4gPSBbLi4ucHJldi5wbl07XG4gICAgICBuZXdQbltpbmRleF0gPSB2YWx1ZTtcbiAgICAgIHJldHVybiB7IC4uLnByZXYsIHBuOiBuZXdQbiB9O1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IGFkZFBuID0gKCkgPT4ge1xuICAgIGlmIChuZXdQbi50cmltKCkgIT09IFwiXCIpIHtcbiAgICAgIHNldEl0ZW1zKChwcmV2KSA9PiAoe1xuICAgICAgICAuLi5wcmV2LFxuICAgICAgICBwbjogWy4uLnByZXYucG4sIG5ld1BuLnRyaW0oKV0sXG4gICAgICB9KSk7XG4gICAgfVxuICAgIHNldE5ld1BuKFwiXCIpO1xuICAgIHNldEFkZGluZ05ld1BuKGZhbHNlKTtcbiAgfTtcblxuICAvLyBTTjogd2hlbiBhIHVzZXIgc2VsZWN0cyBhbiBleGlzdGluZyBTTiB2YWx1ZS5cbiAgY29uc3QgaGFuZGxlU25TZWxlY3QgPSAoZSkgPT4ge1xuICAgIGNvbnN0IHNlbGVjdGVkID0gZS50YXJnZXQudmFsdWU7XG4gICAgc2V0SXRlbXMoKHByZXYpID0+IHtcbiAgICAgIGxldCB1cGRhdGVkU24gPSBBcnJheS5pc0FycmF5KHByZXYuc24pID8gWy4uLnByZXYuc25dIDogW107XG4gICAgICB1cGRhdGVkU25bMF0gPSBzZWxlY3RlZDtcbiAgICAgIHJldHVybiB7IC4uLnByZXYsIHNuOiB1cGRhdGVkU24gfTtcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVTbkNoYW5nZSA9IChpbmRleCwgdmFsdWUpID0+IHtcbiAgICBzZXRJdGVtcygocHJldikgPT4ge1xuICAgICAgY29uc3QgbmV3U24gPSBbLi4ucHJldi5zbl07XG4gICAgICBuZXdTbltpbmRleF0gPSB2YWx1ZTtcbiAgICAgIHJldHVybiB7IC4uLnByZXYsIHNuOiBuZXdTbiB9O1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IGFkZFNuID0gKCkgPT4ge1xuICAgIGlmIChuZXdTbi50cmltKCkgIT09IFwiXCIpIHtcbiAgICAgIHNldEl0ZW1zKChwcmV2KSA9PiAoe1xuICAgICAgICAuLi5wcmV2LFxuICAgICAgICBzbjogWy4uLnByZXYuc24sIG5ld1NuLnRyaW0oKV0sXG4gICAgICB9KSk7XG4gICAgfVxuICAgIHNldE5ld1NuKFwiXCIpO1xuICAgIHNldEFkZGluZ05ld1NuKGZhbHNlKTtcbiAgfTtcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLSBQaG90byBCcm93c2UgSGFuZGxlcnNcbiAgY29uc3QgaGFuZGxlQnJvd3NlUGhvdG9zID0gKCkgPT4ge1xuICAgIGlmIChicm93c2VJbnB1dFJlZi5jdXJyZW50KSB7XG4gICAgICBicm93c2VJbnB1dFJlZi5jdXJyZW50LmNsaWNrKCk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUZpbGVzU2VsZWN0ZWQgPSAoZSkgPT4ge1xuICAgIGNvbnN0IGZpbGVzID0gZS50YXJnZXQuZmlsZXM7XG4gICAgaWYgKGZpbGVzLmxlbmd0aCkge1xuICAgICAgY29uc3QgbmV3UGhvdG9zID0gW107XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZpbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIG5ld1Bob3Rvcy5wdXNoKHtcbiAgICAgICAgICBmaWxlOiBmaWxlc1tpXSxcbiAgICAgICAgICB1cmw6IFVSTC5jcmVhdGVPYmplY3RVUkwoZmlsZXNbaV0pLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHNldFBob3RvcygocHJldlBob3RvcykgPT4gWy4uLnByZXZQaG90b3MsIC4uLm5ld1Bob3Rvc10pO1xuICAgIH1cbiAgICBlLnRhcmdldC52YWx1ZSA9IFwiXCI7XG4gIH07XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0gUGhvdG8gQ2FwdHVyZSBIYW5kbGVycyByZW1haW4gYXMgaW4geW91ciBpbmRleC5qc1xuICBjb25zdCBoYW5kbGVDYXB0dXJlID0gKGVyciwgcmVzdWx0KSA9PiB7XG4gICAgaWYgKHJlc3VsdCkge1xuICAgICAgc2V0Q2FwdHVyZWRQaG90byhyZXN1bHQpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBjYXB0dXJlUGhvdG8gPSAoKSA9PiB7XG4gICAgY29uc3QgdmlkZW8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwidmlkZW9cIik7XG4gICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbiAgICBjYW52YXMud2lkdGggPSB2aWRlby52aWRlb1dpZHRoO1xuICAgIGNhbnZhcy5oZWlnaHQgPSB2aWRlby52aWRlb0hlaWdodDtcbiAgICBjb25zdCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICBjb250ZXh0LmRyYXdJbWFnZSh2aWRlbywgMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbiAgICBjYW52YXMudG9CbG9iKChibG9iKSA9PiB7XG4gICAgICBzZXRDYXB0dXJlZFBob3RvKGJsb2IpO1xuICAgIH0sIFwiaW1hZ2UvcG5nXCIpO1xuICB9O1xuXG4gIGNvbnN0IHNhdmVQaG90byA9ICgpID0+IHtcbiAgICBzZXRQaG90b3MoKHByZXZQaG90b3MpID0+IFtcbiAgICAgIC4uLnByZXZQaG90b3MsXG4gICAgICB7IGZpbGU6IGNhcHR1cmVkUGhvdG8sIHVybDogVVJMLmNyZWF0ZU9iamVjdFVSTChjYXB0dXJlZFBob3RvKSB9LFxuICAgIF0pO1xuICAgIHNldENhcHR1cmVkUGhvdG8obnVsbCk7XG4gICAgc2V0U2hvd0NhbWVyYU1vZGFsKGZhbHNlKTtcbiAgfTtcblxuICBjb25zdCByZW1vdmVQaG90byA9IChpbmRleCkgPT4ge1xuICAgIHNldFBob3RvcyhwaG90b3MuZmlsdGVyKChfLCBpKSA9PiBpICE9PSBpbmRleCkpO1xuICB9O1xuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tIE1vZGFsIEhhbmRsZXJzXG4gIGNvbnN0IGhhbmRsZUNsb3NlID0gKCkgPT4gc2V0U2hvdyhmYWxzZSk7XG4gIGNvbnN0IGhhbmRsZVNob3cgPSAoKSA9PiBzZXRTaG93KHRydWUpO1xuICBjb25zdCBoYW5kbGVDbG9zZUVyciA9ICgpID0+IHNldFNob3dFcnIoZmFsc2UpO1xuICBjb25zdCBoYW5kbGVTaG93RXJyID0gKCkgPT4gc2V0U2hvd0Vycih0cnVlKTtcbiAgY29uc3QgaGFuZGxlQ2xvc2VTYXZlTW9kYWwgPSAoKSA9PiBzZXRTaG93U2F2ZU1vZGFsKGZhbHNlKTtcbiAgY29uc3QgaGFuZGxlU2hvd1NhdmVNb2RhbCA9ICgpID0+IHNldFNob3dTYXZlTW9kYWwodHJ1ZSk7XG4gIGNvbnN0IGhhbmRsZUNsb3NlRGVzY01vZGFsID0gKCkgPT4gc2V0U2hvd0Rlc2NNb2RhbChmYWxzZSk7XG4gIGNvbnN0IGhhbmRsZVNob3dEZXNjTW9kYWwgPSAoKSA9PiBzZXRTaG93RGVzY01vZGFsKHRydWUpO1xuICBjb25zdCBoYW5kbGVDbG9zZVdvTW9kYWwgPSAoKSA9PiBzZXRTaG93V29Nb2RhbChmYWxzZSk7XG4gIGNvbnN0IGhhbmRsZVNob3dXb01vZGFsID0gKCkgPT4gc2V0U2hvd1dvTW9kYWwodHJ1ZSk7XG4gIGNvbnN0IGhhbmRsZUNsb3NlQ2xpZW50TW9kYWwgPSAoKSA9PiBzZXRTaG93Q2xpZW50TW9kYWwoZmFsc2UpO1xuICBjb25zdCBoYW5kbGVTaG93Q2xpZW50TW9kYWwgPSAoKSA9PiBzZXRTaG93Q2xpZW50TW9kYWwodHJ1ZSk7XG4gIGNvbnN0IGhhbmRsZUNsb3NlTWFjaGluZU1vZGFsID0gKCkgPT4gc2V0U2hvd01hY2hpbmVNb2RhbChmYWxzZSk7XG4gIGNvbnN0IGhhbmRsZVNob3dNYWNoaW5lTW9kYWwgPSAoKSA9PiB7XG4gICAgc2V0U2hvd01hY2hpbmVNb2RhbCh0cnVlKTtcbiAgICBzZXRTaG93Q2xpZW50TW9kYWwoZmFsc2UpO1xuICB9O1xuICBjb25zdCBoYW5kbGVDbG9zZVBhcmVudE1vZGFsID0gKCkgPT4gc2V0U2hvd1BhcmVudE1vZGFsKGZhbHNlKTtcbiAgY29uc3QgaGFuZGxlU2hvd1BhcmVudE1vZGFsID0gKCkgPT4gc2V0U2hvd1BhcmVudE1vZGFsKHRydWUpO1xuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tIFdvcmsgT3JkZXJzIC8gRGVzY3JpcHRpb25zIEhhbmRsZXJzICh1bmNoYW5nZWQpXG4gIGNvbnN0IGFkZERlc2NyaXB0aW9uID0gKCkgPT4ge1xuICAgIHNldERlc2NyaXB0aW9ucyhbLi4uZGVzY3JpcHRpb25zLCB7IGRlc2NyaXB0aW9uOiBcIlwiLCBkYXRlOiBcIlwiIH1dKTtcbiAgfTtcblxuICBjb25zdCByZW1vdmVEZXNjcmlwdGlvbiA9IChpbmRleCkgPT4ge1xuICAgIHNldERlc2NyaXB0aW9ucyhkZXNjcmlwdGlvbnMuZmlsdGVyKChfLCBpKSA9PiBpICE9PSBpbmRleCkpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZURlc2NyaXB0aW9uQ2hhbmdlID0gKGluZGV4LCBmaWVsZCwgdmFsdWUpID0+IHtcbiAgICBjb25zdCBuZXdEZXNjcmlwdGlvbnMgPSBkZXNjcmlwdGlvbnMubWFwKChkZXNjLCBpKSA9PlxuICAgICAgaSA9PT0gaW5kZXggPyB7IC4uLmRlc2MsIFtmaWVsZF06IHZhbHVlIH0gOiBkZXNjXG4gICAgKTtcbiAgICBzZXREZXNjcmlwdGlvbnMobmV3RGVzY3JpcHRpb25zKTtcbiAgfTtcblxuICBjb25zdCBhZGRXb3JrT3JkZXIgPSAoKSA9PiB7XG4gICAgc2V0V29ya09yZGVycyhbLi4ud29ya09yZGVycywgeyB3b3JrT3JkZXI6IFwiXCIsIGRhdGU6IFwiXCIgfV0pO1xuICB9O1xuXG4gIGNvbnN0IHJlbW92ZVdvcmtPcmRlciA9IChpbmRleCkgPT4ge1xuICAgIHNldFdvcmtPcmRlcnMod29ya09yZGVycy5maWx0ZXIoKF8sIGkpID0+IGkgIT09IGluZGV4KSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlV29ya09yZGVyQ2hhbmdlID0gKGluZGV4LCBmaWVsZCwgdmFsdWUpID0+IHtcbiAgICBjb25zdCBuZXdXb3JrT3JkZXJzID0gd29ya09yZGVycy5tYXAoKHdvLCBpKSA9PlxuICAgICAgaSA9PT0gaW5kZXggPyB7IC4uLndvLCBbZmllbGRdOiB2YWx1ZSB9IDogd29cbiAgICApO1xuICAgIHNldFdvcmtPcmRlcnMobmV3V29ya09yZGVycyk7XG4gIH07XG5cbiAgY29uc3QgbGlzdERlc2NyaXB0aW9ucyA9ICgpID0+IHtcbiAgICBzZXRTaG93RGVzY01vZGFsKHRydWUpO1xuICB9O1xuXG4gIGNvbnN0IHNlbGVjdERlc2NyaXB0aW9uID0gKGluZGV4KSA9PiB7XG4gICAgc2V0U2VsZWN0ZWREZXNjKGluZGV4KTtcbiAgICBzZXRTaG93RGVzY01vZGFsKGZhbHNlKTtcbiAgfTtcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLSBNYWNoaW5lIFNlbGVjdGlvbiAodW5jaGFuZ2VkKVxuICBjb25zdCBoYW5kbGVDbGllbnRJbmZvID0gYXN5bmMgKGNsaWVudElkKSA9PiB7XG4gICAgLy8gQ2xlYXIgYW55IHByZXZpb3VzbHkgc2VsZWN0ZWQgbWFjaGluZS9sb2NhbCBsb2MgZm9yIHRoZSBicmFuY2hcbiAgICBpZiAobWFjaGluZVBpY2spIHtcbiAgICAgIHNldFNlbGVjdGVkTWFjaGluZShudWxsKTtcbiAgICAgIHNldFNob3dMb2NhbExvY0Zyb20oZmFsc2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZXRTZWxlY3RlZEN1cnJlbnRNYWNoaW5lKG51bGwpO1xuICAgICAgc2V0U2hvd0xvY2FsTG9jQ3VycmVudChmYWxzZSk7XG4gICAgfVxuXG4gICAgY29uc3QgZGIgPSBmaXJlYmFzZS5maXJlc3RvcmUoKTtcbiAgICBjb25zdCBjbGllbnREb2MgPSBhd2FpdCBkYi5jb2xsZWN0aW9uKFwiQ2xpZW50XCIpLmRvYyhjbGllbnRJZCkuZ2V0KCk7XG4gICAgaWYgKGNsaWVudERvYy5leGlzdHMpIHtcbiAgICAgIGNvbnN0IGNsaWVudERhdGEgPSBjbGllbnREb2MuZGF0YSgpO1xuICAgICAgaWYgKG1hY2hpbmVQaWNrKSB7XG4gICAgICAgIHNldFNlbGVjdGVkQ2xpZW50RnJvbSh7IGlkOiBjbGllbnREb2MuaWQsIC4uLmNsaWVudERhdGEgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZXRTZWxlY3RlZENsaWVudEN1cnJlbnQoeyBpZDogY2xpZW50RG9jLmlkLCAuLi5jbGllbnREYXRhIH0pO1xuICAgICAgfVxuICAgICAgLy8gRmV0Y2ggbWFjaGluZXMgZm9yIHRoaXMgY2xpZW50OlxuICAgICAgY29uc3QgbWFjaGluZVByb21pc2VzID0gY2xpZW50RGF0YS5tYWNoaW5lcy5tYXAoKG1hY2hpbmVSZWYpID0+XG4gICAgICAgIG1hY2hpbmVSZWYuZ2V0KClcbiAgICAgICk7XG4gICAgICBjb25zdCBtYWNoaW5lRG9jcyA9IGF3YWl0IFByb21pc2UuYWxsKG1hY2hpbmVQcm9taXNlcyk7XG4gICAgICBjb25zdCBtYWNoaW5lcyA9IG1hY2hpbmVEb2NzLm1hcCgobWFjaGluZURvYykgPT4gKHtcbiAgICAgICAgaWQ6IG1hY2hpbmVEb2MuaWQsXG4gICAgICAgIC4uLm1hY2hpbmVEb2MuZGF0YSgpLFxuICAgICAgfSkpO1xuICAgICAgc2V0TWFjaGluZU9wdGlvbnMobWFjaGluZXMpO1xuICAgICAgaGFuZGxlQ2xvc2VDbGllbnRNb2RhbCgpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBmZXRjaE1hY2hpbmUgPSBhc3luYyAobWFjaGluZUlkKSA9PiB7XG4gICAgY29uc3QgZGIgPSBmaXJlYmFzZS5maXJlc3RvcmUoKTtcbiAgICBjb25zdCBkb2MgPSBhd2FpdCBkYi5jb2xsZWN0aW9uKFwiTWFjaGluZVwiKS5kb2MobWFjaGluZUlkKS5nZXQoKTtcbiAgICBpZiAoZG9jLmV4aXN0cykge1xuICAgICAgY29uc3QgbWFjaGluZURhdGEgPSBkb2MuZGF0YSgpO1xuICAgICAgc2V0VGhlTWFjaGluZShtYWNoaW5lRGF0YSk7XG5cbiAgICAgIC8vIEVuc3VyZSBPRU0sIE1vZGFsaXR5LCBhbmQgTW9kZWwgdXBkYXRlIHByb3Blcmx5IG9ubHkgaWYgbmVjZXNzYXJ5XG4gICAgICBpZiAoIW9lbSB8fCBvZW0gPT09IFwiTi9BXCIpXG4gICAgICAgIHNldE9lbShtYWNoaW5lRGF0YS5vZW0gfHwgbWFjaGluZURhdGEuT0VNIHx8IFwiXCIpO1xuICAgICAgaWYgKCFtb2RhbGl0eSB8fCBtb2RhbGl0eSA9PT0gXCJOL0FcIilcbiAgICAgICAgc2V0TW9kYWxpdHkobWFjaGluZURhdGEubW9kYWxpdHkgfHwgbWFjaGluZURhdGEuTW9kYWxpdHkgfHwgXCJcIik7XG4gICAgICBpZiAoIW1vZGVsIHx8IG1vZGVsID09PSBcIk4vQVwiKVxuICAgICAgICBzZXRNb2RlbChtYWNoaW5lRGF0YS5tb2RlbCB8fCBtYWNoaW5lRGF0YS5Nb2RlbCB8fCBcIlwiKTtcblxuICAgICAgLy8gU2V0IG1hY2hpbmUgZnJlcXVlbmN5IGNvdW50XG4gICAgICBjb25zdCBtYWNoaW5lc1NuYXBzaG90ID0gYXdhaXQgZGJcbiAgICAgICAgLmNvbGxlY3Rpb24oXCJNYWNoaW5lXCIpXG4gICAgICAgIC53aGVyZShcIk1vZGVsXCIsIFwiPT1cIiwgbWFjaGluZURhdGEuTW9kZWwgfHwgbWFjaGluZURhdGEubW9kZWwpXG4gICAgICAgIC5nZXQoKTtcbiAgICAgIHNldE1hY2hpbmVGcmVxdWVuY3kobWFjaGluZXNTbmFwc2hvdC5zaXplKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5lcnJvcihcIk1hY2hpbmUgbm90IGZvdW5kXCIpO1xuICAgIH1cbiAgfTtcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLSBGcmVxdWVuY3kvVXNhZ2UgKHVuY2hhbmdlZClcbiAgY29uc3QgY2FsY3VsYXRlSXRlbUZyZXF1ZW5jeUFuZFVzYWdlID0gYXN5bmMgKHBuKSA9PiB7XG4gICAgY29uc3QgZGIgPSBmaXJlYmFzZS5maXJlc3RvcmUoKTtcbiAgICBjb25zdCBjdXJyZW50RGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgY29uc3Qgb25lWWVhckFnbyA9IG5ldyBEYXRlKCk7XG4gICAgb25lWWVhckFnby5zZXRGdWxsWWVhcihjdXJyZW50RGF0ZS5nZXRGdWxsWWVhcigpIC0gMSk7XG4gICAgY29uc3QgaXRlbXNTbmFwc2hvdCA9IGF3YWl0IGRiXG4gICAgICAuY29sbGVjdGlvbihcIlRlc3RcIilcbiAgICAgIC53aGVyZShcInBuXCIsIFwiPT1cIiwgcG4pXG4gICAgICAuZ2V0KCk7XG4gICAgc2V0RnJlcUl0ZW0oaXRlbXNTbmFwc2hvdC5zaXplKTtcbiAgICBsZXQgdXNhZ2VQYXN0WWVhciA9IDA7XG4gICAgaXRlbXNTbmFwc2hvdC5mb3JFYWNoKChkb2MpID0+IHtcbiAgICAgIGNvbnN0IGl0ZW1EYXRhID0gZG9jLmRhdGEoKTtcbiAgICAgIGl0ZW1EYXRhLndvcmtPcmRlcnMuZm9yRWFjaCgod29ya09yZGVyKSA9PiB7XG4gICAgICAgIGNvbnN0IHdvcmtPcmRlckRhdGUgPSBuZXcgRGF0ZSh3b3JrT3JkZXIuZGF0ZSk7XG4gICAgICAgIGlmICh3b3JrT3JkZXJEYXRlID49IG9uZVllYXJBZ28gJiYgd29ya09yZGVyRGF0ZSA8PSBjdXJyZW50RGF0ZSkge1xuICAgICAgICAgIHVzYWdlUGFzdFllYXIrKztcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgc2V0VXNhZ2VQYXN0WWVhcih1c2FnZVBhc3RZZWFyKTtcbiAgfTtcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLSBQaG90byBVcGxvYWQgKHVuY2hhbmdlZClcbiAgY29uc3QgdXBsb2FkUGhvdG9zID0gYXN5bmMgKGRvY0lEKSA9PiB7XG4gICAgY29uc3Qgc3RvcmFnZVJlZiA9IGZpcmViYXNlLnN0b3JhZ2UoKS5yZWYoKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBob3Rvcy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHBob3Rvc1tpXS5maWxlKSB7XG4gICAgICAgIGNvbnN0IHBob3RvUmVmID0gc3RvcmFnZVJlZi5jaGlsZChcbiAgICAgICAgICBgUGFydHMvJHtkb2NJRH0vJHtkb2NJRH0ke2kgPT09IDAgPyBcIi5qcGdcIiA6IGAuJHtpICsgMX0uanBnYH1gXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IG1ldGFkYXRhID0geyBjb250ZW50VHlwZTogXCJpbWFnZS9wbmdcIiB9O1xuICAgICAgICBhd2FpdCBwaG90b1JlZi5wdXQocGhvdG9zW2ldLmZpbGUsIG1ldGFkYXRhKTtcbiAgICAgICAgY29uc3QgdXJsID0gYXdhaXQgcGhvdG9SZWYuZ2V0RG93bmxvYWRVUkwoKTtcbiAgICAgICAgcGhvdG9zW2ldLnVybCA9IHVybDtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0gU3VibWlzc2lvbiBIYW5kbGVyXG4gIC8vIEZvciBOZXdJdGVtLCBvbmx5IHJlcXVpcmUgTmFtZSBhbmQgRGVzY3JpcHRpb24uXG4gIGFzeW5jIGZ1bmN0aW9uIGhhbmRsZVN1Ym1pdChldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgaWYgKCFpdGVtcy5uYW1lIHx8ICFkZXNjcmlwdGlvbnNbMF0/LmRlc2NyaXB0aW9uKSB7XG4gICAgICBoYW5kbGVTaG93KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNldExvYWRpbmcodHJ1ZSk7IC8vIHN0YXJ0IGxvYWRpbmcgYmVmb3JlIGFzeW5jIHdvcmtcbiAgICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IHRvU2VuZCgpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBzZXRMb2FkaW5nKGZhbHNlKTsgLy8gZW5kIGxvYWRpbmcgYWZ0ZXIgYXN5bmMgd29yayBjb21wbGV0ZXNcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhc3luYyBmdW5jdGlvbiB0b1NlbmQocmVkaXJlY3QgPSB0cnVlKSB7XG4gICAgY29uc3QgeyBpZCB9ID0gcm91dGVyLnF1ZXJ5OyAvLyBFbnN1cmUgaWQgaXMgZGVmaW5lZCAoaXQgbWF5IGJlIHVuZGVmaW5lZCBmb3IgYSBuZXcgaXRlbSlcbiAgICBjb25zdCBkYiA9IGZpcmViYXNlLmZpcmVzdG9yZSgpO1xuXG4gICAgLy8gR2V0IHRoZSBjdXJyZW50IGF1dGhlbnRpY2F0ZWQgdXNlclxuICAgIGNvbnN0IGN1cnJlbnRVc2VyID0gZmlyZWJhc2UuYXV0aCgpLmN1cnJlbnRVc2VyO1xuICAgIGNvbnN0IHVzZXJFbWFpbCA9IGN1cnJlbnRVc2VyID8gY3VycmVudFVzZXIuZW1haWwgOiBcInVua25vd25cIjtcblxuICAgIC8vIEFsd2F5cyB1c2UgdGhlIGN1cnJlbnQgc3RhdGUgdmFsdWVzIGZvciBPRU0sIG1vZGFsaXR5LCBhbmQgbW9kZWwuXG4gICAgY29uc3QgbWFjaGluZURhdGEgPSB7XG4gICAgICAuLi4oVGhlTWFjaGluZSB8fCB7fSksXG4gICAgICBvZW06IG9lbSxcbiAgICAgIG1vZGFsaXR5OiBtb2RhbGl0eSxcbiAgICAgIG1vZGVsOiBtb2RlbCxcbiAgICB9O1xuXG4gICAgY29uc3QgZm9ybWF0dGVkSXRlbXMgPSB7IC4uLml0ZW1zLCBkZXNjcmlwdGlvbnMsIHdvcmtPcmRlcnMgfTtcbiAgICAvLyBSZW1vdmUgYW55IHVudXNlZCBmaWVsZHMuXG4gICAgZm9ybWF0dGVkSXRlbXMuc3RhdHVzID0gaXRlbXMuc3RhdHVzIHx8IFwiXCI7XG4gICAgZm9ybWF0dGVkSXRlbXMuRE9NID0gRE9NOyAvLyBEYXRlIG9mIE1hbnVmYWN0dXJlXG4gICAgZm9ybWF0dGVkSXRlbXMubG9jYWxMb2NGcm9tID0gbG9jYWxMb2NGcm9tIHx8IFwiXCI7XG4gICAgZm9ybWF0dGVkSXRlbXMubG9jYWxMb2NDdXJyZW50ID0gbG9jYWxMb2NDdXJyZW50IHx8IFwiXCI7XG4gICAgZm9ybWF0dGVkSXRlbXMuZGF0ZSA9IGl0ZW1zLmRhdGUgfHwgXCJcIjtcbiAgICBmb3JtYXR0ZWRJdGVtcy5hcnJpdmFsX2RhdGUgPSBpdGVtcy5hcnJpdmFsX2RhdGUgfHwgXCJcIjsgLy8gTkVXOiBBcnJpdmFsIERhdGVcbiAgICBmb3JtYXR0ZWRJdGVtcy5wb051bWJlciA9IGl0ZW1zLnBvTnVtYmVyIHx8IFwiXCI7XG4gICAgZm9ybWF0dGVkSXRlbXMudHJhY2tpbmdOdW1iZXIgPSBpdGVtcy50cmFja2luZ051bWJlciB8fCBcIlwiO1xuICAgIGZvcm1hdHRlZEl0ZW1zLlRoZU1hY2hpbmUgPSBtYWNoaW5lRGF0YSB8fCB7fTtcbiAgICBmb3JtYXR0ZWRJdGVtcy5hZGRlZFRvV2Vic2l0ZSA9IGFkZFRvV2Vic2l0ZTtcbiAgICBmb3JtYXR0ZWRJdGVtcy52aXNpYmxlID0gaXRlbXMudmlzaWJsZTtcblxuICAgIC8vIEFkZCB0aGUgY3VycmVudCB1c2VyJ3MgZW1haWwgdW5kZXIgdGhlIFwidXNlclwiIGZpZWxkXG4gICAgZm9ybWF0dGVkSXRlbXMudXNlciA9IHVzZXJFbWFpbDtcbiAgICAvLyBDbGVhbiBwbiBhbmQgc24gYXJyYXlzIHRvIHJlcGxhY2UgdW5kZWZpbmVkIHZhbHVlcyB3aXRoIGFuIGVtcHR5IHN0cmluZy5cbiAgICBmb3JtYXR0ZWRJdGVtcy5wbiA9IChpdGVtcy5wbiB8fCBbXSkubWFwKCh2YWx1ZSkgPT5cbiAgICAgIHZhbHVlID09PSB1bmRlZmluZWQgPyBcIlwiIDogdmFsdWVcbiAgICApO1xuICAgIGZvcm1hdHRlZEl0ZW1zLnNuID0gKGl0ZW1zLnNuIHx8IFtdKS5tYXAoKHZhbHVlKSA9PlxuICAgICAgdmFsdWUgPT09IHVuZGVmaW5lZCA/IFwiXCIgOiB2YWx1ZVxuICAgICk7XG5cbiAgICAvLyBTZXQgbWFjaGluZSByZWZlcmVuY2VzIGZvciBlYWNoIGJyYW5jaC5cbiAgICBpZiAoc2VsZWN0ZWRNYWNoaW5lICYmIHNlbGVjdGVkTWFjaGluZS5pZCkge1xuICAgICAgZm9ybWF0dGVkSXRlbXMuTWFjaGluZUZyb20gPSBkYlxuICAgICAgICAuY29sbGVjdGlvbihcIk1hY2hpbmVcIilcbiAgICAgICAgLmRvYyhzZWxlY3RlZE1hY2hpbmUuaWQpO1xuICAgIH1cbiAgICBpZiAoc2VsZWN0ZWRDdXJyZW50TWFjaGluZSAmJiBzZWxlY3RlZEN1cnJlbnRNYWNoaW5lLmlkKSB7XG4gICAgICBmb3JtYXR0ZWRJdGVtcy5NYWNoaW5lQ3VycmVudCA9IGRiXG4gICAgICAgIC5jb2xsZWN0aW9uKFwiTWFjaGluZVwiKVxuICAgICAgICAuZG9jKHNlbGVjdGVkQ3VycmVudE1hY2hpbmUuaWQpO1xuICAgIH1cblxuICAgIC8vICoqKioqIE5FVzogU2V0IGNsaWVudCByZWZlcmVuY2VzIGZvciBlYWNoIGJyYW5jaCAqKioqKlxuICAgIGlmIChzZWxlY3RlZENsaWVudEZyb20gJiYgc2VsZWN0ZWRDbGllbnRGcm9tLmlkKSB7XG4gICAgICBmb3JtYXR0ZWRJdGVtcy5DbGllbnRGcm9tID0gZGJcbiAgICAgICAgLmNvbGxlY3Rpb24oXCJDbGllbnRcIilcbiAgICAgICAgLmRvYyhzZWxlY3RlZENsaWVudEZyb20uaWQpO1xuICAgIH1cbiAgICBpZiAoc2VsZWN0ZWRDbGllbnRDdXJyZW50ICYmIHNlbGVjdGVkQ2xpZW50Q3VycmVudC5pZCkge1xuICAgICAgZm9ybWF0dGVkSXRlbXMuQ2xpZW50Q3VycmVudCA9IGRiXG4gICAgICAgIC5jb2xsZWN0aW9uKFwiQ2xpZW50XCIpXG4gICAgICAgIC5kb2Moc2VsZWN0ZWRDbGllbnRDdXJyZW50LmlkKTtcbiAgICB9XG4gICAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5cbiAgICBpZiAoc2VsZWN0ZWRQYXJlbnQgJiYgc2VsZWN0ZWRQYXJlbnQuaWQpIHtcbiAgICAgIGZvcm1hdHRlZEl0ZW1zLlBhcmVudCA9IGRiLmNvbGxlY3Rpb24oXCJUZXN0XCIpLmRvYyhzZWxlY3RlZFBhcmVudC5pZCk7XG4gICAgfVxuXG4gICAgLy8gT25seSBhZGQgZGF0ZUNyZWF0ZWQgaWYgdGhpcyBpcyBhIG5ldyBkb2N1bWVudFxuICAgIGlmICghaWQpIHtcbiAgICAgIGZvcm1hdHRlZEl0ZW1zLmRhdGVDcmVhdGVkID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpLnNwbGl0KFwiVFwiKVswXTsgLy8gXCJZWVlZLU1NLUREXCJcbiAgICB9XG5cbiAgICAvLyAtLS0gTE9DQUwgU04gTE9HSUMgLS0tXG4gICAgbGV0IGRvY0lkID0gaWQgfHwgbnVsbDtcbiAgICB0cnkge1xuICAgICAgaWYgKGRvY0lkKSB7XG4gICAgICAgIC8vIENoZWNrIGlmIGEgbG9jYWxTTiBpcyBwcm92aWRlZCBhbmQgaWYgaXQgZGlmZmVycyBmcm9tIHRoZSBjdXJyZW50IGRvY0lkLlxuICAgICAgICBjb25zdCBuZXdEb2NJZCA9XG4gICAgICAgICAgaXRlbXMubG9jYWxTTiAmJiBpdGVtcy5sb2NhbFNOLnRyaW0oKSAhPT0gXCJcIlxuICAgICAgICAgICAgPyBpdGVtcy5sb2NhbFNOLnRyaW0oKVxuICAgICAgICAgICAgOiBkb2NJZDtcbiAgICAgICAgaWYgKGRvY0lkICE9PSBuZXdEb2NJZCkge1xuICAgICAgICAgIC8vIE1pZ3JhdGU6IENyZWF0ZSBhIG5ldyBkb2N1bWVudCB3aXRoIHRoZSBuZXdEb2NJZC5cbiAgICAgICAgICBhd2FpdCBkYi5jb2xsZWN0aW9uKFwiVGVzdFwiKS5kb2MobmV3RG9jSWQpLnNldChmb3JtYXR0ZWRJdGVtcyk7XG5cbiAgICAgICAgICBpZiAoc2VsZWN0ZWRNYWNoaW5lICYmIHNlbGVjdGVkTWFjaGluZS5pZCkge1xuICAgICAgICAgICAgY29uc3QgbWFjaGluZVJlZiA9IGRiLmNvbGxlY3Rpb24oXCJNYWNoaW5lXCIpLmRvYyhzZWxlY3RlZE1hY2hpbmUuaWQpO1xuICAgICAgICAgICAgY29uc3QgbWFjaGluZURvYyA9IGF3YWl0IG1hY2hpbmVSZWYuZ2V0KCk7XG4gICAgICAgICAgICBpZiAobWFjaGluZURvYy5leGlzdHMpIHtcbiAgICAgICAgICAgICAgYXdhaXQgbWFjaGluZVJlZi51cGRhdGUoe1xuICAgICAgICAgICAgICAgIGFzc29jaWF0ZWRQYXJ0czogZmlyZWJhc2UuZmlyZXN0b3JlLkZpZWxkVmFsdWUuYXJyYXlVbmlvbihcbiAgICAgICAgICAgICAgICAgIGRiLmNvbGxlY3Rpb24oXCJUZXN0XCIpLmRvYyhuZXdEb2NJZClcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoc2VsZWN0ZWRDdXJyZW50TWFjaGluZSAmJiBzZWxlY3RlZEN1cnJlbnRNYWNoaW5lLmlkKSB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50TWFjaGluZVJlZiA9IGRiXG4gICAgICAgICAgICAgIC5jb2xsZWN0aW9uKFwiTWFjaGluZVwiKVxuICAgICAgICAgICAgICAuZG9jKHNlbGVjdGVkQ3VycmVudE1hY2hpbmUuaWQpO1xuICAgICAgICAgICAgY29uc3QgY3VycmVudE1hY2hpbmVEb2MgPSBhd2FpdCBjdXJyZW50TWFjaGluZVJlZi5nZXQoKTtcbiAgICAgICAgICAgIGlmIChjdXJyZW50TWFjaGluZURvYy5leGlzdHMpIHtcbiAgICAgICAgICAgICAgYXdhaXQgY3VycmVudE1hY2hpbmVSZWYudXBkYXRlKHtcbiAgICAgICAgICAgICAgICBhc3NvY2lhdGVkUGFydHM6IGZpcmViYXNlLmZpcmVzdG9yZS5GaWVsZFZhbHVlLmFycmF5VW5pb24oXG4gICAgICAgICAgICAgICAgICBkYi5jb2xsZWN0aW9uKFwiVGVzdFwiKS5kb2MobmV3RG9jSWQpXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIERlbGV0ZSB0aGUgb2xkIGRvY3VtZW50LlxuICAgICAgICAgIGF3YWl0IGRiLmNvbGxlY3Rpb24oXCJUZXN0XCIpLmRvYyhkb2NJZCkuZGVsZXRlKCk7XG4gICAgICAgICAgLy8gU2V0IGRvY0lkIHRvIHRoZSBuZXcgZG9jdW1lbnQgSUQuXG4gICAgICAgICAgZG9jSWQgPSBuZXdEb2NJZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBEZWVwLWNsZWFuIHRoZSBmb3JtYXR0ZWRJdGVtcyB0byByZW1vdmUgYW55IHVuZGVmaW5lZCBuZXN0ZWQgdmFsdWVzLlxuICAgICAgICAgIGNvbnN0IGNsZWFuRm9ybWF0dGVkSXRlbXMgPSBzaGFsbG93Q2xlYW4oZm9ybWF0dGVkSXRlbXMpO1xuICAgICAgICAgIGF3YWl0IGRiLmNvbGxlY3Rpb24oXCJUZXN0XCIpLmRvYyhkb2NJZCkudXBkYXRlKGNsZWFuRm9ybWF0dGVkSXRlbXMpO1xuXG4gICAgICAgICAgaWYgKHNlbGVjdGVkTWFjaGluZSAmJiBzZWxlY3RlZE1hY2hpbmUuaWQpIHtcbiAgICAgICAgICAgIGNvbnN0IG1hY2hpbmVSZWYgPSBkYi5jb2xsZWN0aW9uKFwiTWFjaGluZVwiKS5kb2Moc2VsZWN0ZWRNYWNoaW5lLmlkKTtcbiAgICAgICAgICAgIGNvbnN0IG1hY2hpbmVEb2MgPSBhd2FpdCBtYWNoaW5lUmVmLmdldCgpO1xuICAgICAgICAgICAgaWYgKG1hY2hpbmVEb2MuZXhpc3RzKSB7XG4gICAgICAgICAgICAgIGF3YWl0IG1hY2hpbmVSZWYudXBkYXRlKHtcbiAgICAgICAgICAgICAgICBhc3NvY2lhdGVkUGFydHM6IGZpcmViYXNlLmZpcmVzdG9yZS5GaWVsZFZhbHVlLmFycmF5VW5pb24oXG4gICAgICAgICAgICAgICAgICBkYi5jb2xsZWN0aW9uKFwiVGVzdFwiKS5kb2MoZG9jSWQpXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHNlbGVjdGVkQ3VycmVudE1hY2hpbmUgJiYgc2VsZWN0ZWRDdXJyZW50TWFjaGluZS5pZCkge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudE1hY2hpbmVSZWYgPSBkYlxuICAgICAgICAgICAgICAuY29sbGVjdGlvbihcIk1hY2hpbmVcIilcbiAgICAgICAgICAgICAgLmRvYyhzZWxlY3RlZEN1cnJlbnRNYWNoaW5lLmlkKTtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRNYWNoaW5lRG9jID0gYXdhaXQgY3VycmVudE1hY2hpbmVSZWYuZ2V0KCk7XG4gICAgICAgICAgICBpZiAoY3VycmVudE1hY2hpbmVEb2MuZXhpc3RzKSB7XG4gICAgICAgICAgICAgIGF3YWl0IGN1cnJlbnRNYWNoaW5lUmVmLnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgYXNzb2NpYXRlZFBhcnRzOiBmaXJlYmFzZS5maXJlc3RvcmUuRmllbGRWYWx1ZS5hcnJheVVuaW9uKFxuICAgICAgICAgICAgICAgICAgZGIuY29sbGVjdGlvbihcIlRlc3RcIikuZG9jKGRvY0lkKVxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gRm9yIGEgbmV3IGl0ZW0sIGlmIGxvY2FsU04gaXMgcHJvdmlkZWQsIHVzZSBpdDsgb3RoZXJ3aXNlLCBnZW5lcmF0ZSBhIGN1c3RvbSBJRC5cbiAgICAgICAgZG9jSWQgPVxuICAgICAgICAgIGl0ZW1zLmxvY2FsU04gJiYgaXRlbXMubG9jYWxTTi50cmltKCkgIT09IFwiXCJcbiAgICAgICAgICAgID8gaXRlbXMubG9jYWxTTi50cmltKClcbiAgICAgICAgICAgIDogZ2VuZXJhdGVDdXN0b21JRCgpO1xuICAgICAgICBhd2FpdCBkYi5jb2xsZWN0aW9uKFwiVGVzdFwiKS5kb2MoZG9jSWQpLnNldChmb3JtYXR0ZWRJdGVtcyk7XG5cbiAgICAgICAgaWYgKHNlbGVjdGVkTWFjaGluZSAmJiBzZWxlY3RlZE1hY2hpbmUuaWQpIHtcbiAgICAgICAgICBjb25zdCBtYWNoaW5lUmVmID0gZGIuY29sbGVjdGlvbihcIk1hY2hpbmVcIikuZG9jKHNlbGVjdGVkTWFjaGluZS5pZCk7XG4gICAgICAgICAgY29uc3QgbWFjaGluZURvYyA9IGF3YWl0IG1hY2hpbmVSZWYuZ2V0KCk7XG4gICAgICAgICAgaWYgKG1hY2hpbmVEb2MuZXhpc3RzKSB7XG4gICAgICAgICAgICBhd2FpdCBtYWNoaW5lUmVmLnVwZGF0ZSh7XG4gICAgICAgICAgICAgIGFzc29jaWF0ZWRQYXJ0czogZmlyZWJhc2UuZmlyZXN0b3JlLkZpZWxkVmFsdWUuYXJyYXlVbmlvbihcbiAgICAgICAgICAgICAgICBkYi5jb2xsZWN0aW9uKFwiVGVzdFwiKS5kb2MoZG9jSWQpXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2VsZWN0ZWRDdXJyZW50TWFjaGluZSAmJiBzZWxlY3RlZEN1cnJlbnRNYWNoaW5lLmlkKSB7XG4gICAgICAgICAgY29uc3QgY3VycmVudE1hY2hpbmVSZWYgPSBkYlxuICAgICAgICAgICAgLmNvbGxlY3Rpb24oXCJNYWNoaW5lXCIpXG4gICAgICAgICAgICAuZG9jKHNlbGVjdGVkQ3VycmVudE1hY2hpbmUuaWQpO1xuICAgICAgICAgIGNvbnN0IGN1cnJlbnRNYWNoaW5lRG9jID0gYXdhaXQgY3VycmVudE1hY2hpbmVSZWYuZ2V0KCk7XG4gICAgICAgICAgaWYgKGN1cnJlbnRNYWNoaW5lRG9jLmV4aXN0cykge1xuICAgICAgICAgICAgYXdhaXQgY3VycmVudE1hY2hpbmVSZWYudXBkYXRlKHtcbiAgICAgICAgICAgICAgYXNzb2NpYXRlZFBhcnRzOiBmaXJlYmFzZS5maXJlc3RvcmUuRmllbGRWYWx1ZS5hcnJheVVuaW9uKFxuICAgICAgICAgICAgICAgIGRiLmNvbGxlY3Rpb24oXCJUZXN0XCIpLmRvYyhkb2NJZClcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gVXBsb2FkIGFueSBuZXcgcGhvdG9zIHRvIEZpcmViYXNlIFN0b3JhZ2UuXG4gICAgICBhd2FpdCB1cGxvYWRQaG90b3MoZG9jSWQpO1xuICAgICAgY29uc29sZS5sb2coXCJJdGVtIHNhdmVkIGFuZCBhc3NvY2lhdGVkUGFydHMgdXBkYXRlZCFcIik7XG5cbiAgICAgIC8vIFJlZGlyZWN0IHRvIHRoZSBuZXcgVVJMIHVzaW5nIHRoZSBuZXcgZG9jdW1lbnQgaWQuXG4gICAgICBpZiAocmVkaXJlY3QpIHtcbiAgICAgICAgcm91dGVyLnB1c2goYC9OZXdTZWFyY2gvaXRlbS8ke2RvY0lkfWApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2V0UmVkaXJlY3QodHJ1ZSk7XG4gICAgICB9XG5cbiAgICAgIC8vIE9wdGlvbmFsbHksIHNob3cgYSBzYXZlIGNvbmZpcm1hdGlvbiBtb2RhbC5cbiAgICAgIGhhbmRsZVNob3dTYXZlTW9kYWwoKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIHNhdmluZyBkYXRhOlwiLCBlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0gSW5mbyBNb2RhbCBIYW5kbGVycyAodW5jaGFuZ2VkKVxuICBjb25zdCBbc2hvd0luZm9Nb2RhbCwgc2V0U2hvd0luZm9Nb2RhbF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtpdGVtTmFtZSwgc2V0SXRlbU5hbWVdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IGhhbmRsZVNob3dJbmZvTW9kYWwgPSBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgZGIgPSBmaXJlYmFzZS5maXJlc3RvcmUoKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgZG9jID0gYXdhaXQgZGIuY29sbGVjdGlvbihcIlRlc3RcIikuZG9jKGlkKS5nZXQoKTtcbiAgICAgIGlmIChkb2MuZXhpc3RzKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBkb2MuZGF0YSgpO1xuICAgICAgICBzZXRJdGVtTmFtZShkYXRhLm5hbWUgfHwgXCJOL0FcIik7XG4gICAgICAgIHNldFNob3dJbmZvTW9kYWwodHJ1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiSXRlbSBub3QgZm91bmRcIik7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBmZXRjaGluZyBpdGVtIGluZm86XCIsIGVycm9yKTtcbiAgICB9XG4gIH07XG4gIGNvbnN0IGhhbmRsZUNsb3NlSW5mb01vZGFsID0gKCkgPT4gc2V0U2hvd0luZm9Nb2RhbChmYWxzZSk7XG5cbiAgY29uc3QgaGFuZGxlQ2xvc2VDYW1lcmFNb2RhbCA9ICgpID0+IHtcbiAgICBzZXRTaG93Q2FtZXJhTW9kYWwoZmFsc2UpO1xuICAgIHNldENhcHR1cmVkUGhvdG8obnVsbCk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlQ2hhbmdlID0gKGZpZWxkKSA9PiAoZXZlbnQpID0+IHtcbiAgICBjb25zdCB2YWx1ZSA9IGV2ZW50LnRhcmdldCA/IGV2ZW50LnRhcmdldC52YWx1ZSA6IGV2ZW50LnZhbHVlO1xuICAgIHNldEl0ZW1zKChwcmV2SXRlbXMpID0+ICh7IC4uLnByZXZJdGVtcywgW2ZpZWxkXTogdmFsdWUgfSkpO1xuICB9O1xuXG4gIGNvbnN0IG1vc3RSZWNlbnRXb3JrT3JkZXIgPVxuICAgIHdvcmtPcmRlcnMgJiYgd29ya09yZGVycy5sZW5ndGggPiAwXG4gICAgICA/IHdvcmtPcmRlcnMucmVkdWNlKChsYXRlc3QsIGN1cnJlbnQpID0+IHtcbiAgICAgICAgICBjb25zdCBsYXRlc3REYXRlID0gbmV3IERhdGUobGF0ZXN0LmRhdGUpO1xuICAgICAgICAgIGNvbnN0IGN1cnJlbnREYXRlID0gbmV3IERhdGUoY3VycmVudC5kYXRlKTtcbiAgICAgICAgICByZXR1cm4gY3VycmVudERhdGUgPiBsYXRlc3REYXRlID8gY3VycmVudCA6IGxhdGVzdDtcbiAgICAgICAgfSwgd29ya09yZGVyc1swXSlcbiAgICAgIDoge307XG5cbiAgY29uc3QgaGFuZGxlU2hvd0NhbWVyYU1vZGFsID0gKCkgPT4ge1xuICAgIHNldFNob3dDYW1lcmFNb2RhbCh0cnVlKTtcbiAgfTtcblxuICBjb25zdCBnZW5lcmF0ZUN1c3RvbUlEID0gKCkgPT4ge1xuICAgIGNvbnN0IHJhbmRvbU51bSA9IE1hdGguZmxvb3IoMTAwMDAgKyBNYXRoLnJhbmRvbSgpICogOTAwMDApO1xuICAgIHJldHVybiBgQUlTJHtyYW5kb21OdW19YDtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVQcmludCA9IGFzeW5jICgpID0+IHtcbiAgICBpZiAoIWl0ZW1zLm5hbWUpIHtcbiAgICAgIGFsZXJ0KFwiTWlzc2luZyBuYW1lXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIEluIGFkZEl0ZW0gbW9kZSwgdGhlcmUgaXMgbm8gZXhpc3RpbmcgaWQgc28gZ2VuZXJhdGUgb25lXG4gICAgY29uc3QgcHJpbnRJZCA9IGdlbmVyYXRlQ3VzdG9tSUQoKTtcblxuICAgIGNvbnN0IHBheWxvYWQgPSB7XG4gICAgICBuYW1lOiBpdGVtcy5uYW1lLFxuICAgICAgcG46IGl0ZW1zLnBuLFxuICAgICAgc246IGl0ZW1zLnNuLFxuICAgICAgd286IHdvcmtPcmRlcnMgJiYgd29ya09yZGVycy5sZW5ndGggPiAwID8gd29ya09yZGVyc1swXS53b3JrT3JkZXIgOiBcIlwiLFxuICAgICAgc3RhdHVzOiBpdGVtcy5zdGF0dXMsXG4gICAgICBsb2NhbF9zbjogcHJpbnRJZCwgLy8gVXNlIHRoZSBnZW5lcmF0ZWQgY3VzdG9tIElEXG4gICAgICBkZXNjcmlwdGlvbnM6IGRlc2NyaXB0aW9ucyxcbiAgICAgIGRhdGU6IGl0ZW1zLmRhdGUgfHwgbmV3IERhdGUoKS50b0lTT1N0cmluZygpLnNwbGl0KFwiVFwiKVswXSxcbiAgICAgIERPTTogRE9NLFxuICAgICAgb2VtOiBvZW0sXG4gICAgICBtb2RhbGl0eTogbW9kYWxpdHksXG4gICAgICBtb2RlbDogbW9kZWwsXG4gICAgfTtcblxuICAgIGNvbnNvbGUubG9nKFwiUGF5bG9hZCBmb3IgcHJpbnRpbmc6XCIsIHBheWxvYWQpO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuICAgICAgICBcImh0dHBzOi8vY2M3ZS0xNzQtNzYtMjItMTM4Lm5ncm9rLWZyZWUuYXBwL3ByaW50LWxhYmVsXCIsXG4gICAgICAgIHtcbiAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcbiAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXlsb2FkKSxcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgIGNvbnNvbGUubG9nKFwiUHJpbnQgcmVzdWx0OlwiLCByZXN1bHQpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgcHJpbnRpbmcgbGFiZWw6XCIsIGVycm9yKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlQWRkTmV3UG4gPSAoKSA9PiB7XG4gICAgaWYgKG5ld1BuLnRyaW0oKSAhPT0gXCJcIikge1xuICAgICAgc2V0SXRlbXMoKHByZXYpID0+ICh7XG4gICAgICAgIC4uLnByZXYsXG4gICAgICAgIHBuOiBbLi4ucHJldi5wbiwgbmV3UG4udHJpbSgpXSxcbiAgICAgIH0pKTtcbiAgICB9XG4gICAgc2V0TmV3UG4oXCJcIik7XG4gICAgc2V0QWRkaW5nTmV3UG4oZmFsc2UpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUFkZE5ld1NuID0gKCkgPT4ge1xuICAgIGlmIChuZXdTbi50cmltKCkgIT09IFwiXCIpIHtcbiAgICAgIHNldEl0ZW1zKChwcmV2KSA9PiAoe1xuICAgICAgICAuLi5wcmV2LFxuICAgICAgICBzbjogWy4uLnByZXYuc24sIG5ld1NuLnRyaW0oKV0sXG4gICAgICB9KSk7XG4gICAgfVxuICAgIHNldE5ld1NuKFwiXCIpO1xuICAgIHNldEFkZGluZ05ld1NuKGZhbHNlKTtcbiAgfTtcblxuICBmdW5jdGlvbiBnZXRQcmlvcml0eU1hY2hpbmVGaWVsZChcbiAgICBmaWVsZCxcbiAgICBjdXJyZW50VmFsdWUsXG4gICAgdGhlTWFjaGluZSxcbiAgICBjdXJyZW50TWFjaGluZSxcbiAgICBmcm9tTWFjaGluZVxuICApIHtcbiAgICAvLyBJZiB0aGUgZmllbGQgaXMgYWxyZWFkeSBmaWxsZWQgaW4gYnkgdGhlIHVzZXIsIHJldHVybiBpdCB1bmNoYW5nZWQuXG4gICAgaWYgKFxuICAgICAgY3VycmVudFZhbHVlICYmXG4gICAgICBjdXJyZW50VmFsdWUudHJpbSgpICE9PSBcIlwiICYmXG4gICAgICBjdXJyZW50VmFsdWUudHJpbSgpICE9PSBcIk4vQVwiXG4gICAgKSB7XG4gICAgICByZXR1cm4gY3VycmVudFZhbHVlO1xuICAgIH1cblxuICAgIC8vIE90aGVyd2lzZSwgcHJpb3JpdGl6ZSB0aGUgYmVzdCBhdmFpbGFibGUgdmFsdWUuXG4gICAgaWYgKFxuICAgICAgdGhlTWFjaGluZSAmJlxuICAgICAgdGhlTWFjaGluZVtmaWVsZF0gJiZcbiAgICAgIHRoZU1hY2hpbmVbZmllbGRdLnRyaW0oKSAhPT0gXCJcIiAmJlxuICAgICAgdGhlTWFjaGluZVtmaWVsZF0gIT09IFwiTi9BXCJcbiAgICApIHtcbiAgICAgIHJldHVybiB0aGVNYWNoaW5lW2ZpZWxkXTtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgY3VycmVudE1hY2hpbmUgJiZcbiAgICAgIGN1cnJlbnRNYWNoaW5lW2ZpZWxkXSAmJlxuICAgICAgY3VycmVudE1hY2hpbmVbZmllbGRdLnRyaW0oKSAhPT0gXCJcIiAmJlxuICAgICAgY3VycmVudE1hY2hpbmVbZmllbGRdICE9PSBcIk4vQVwiXG4gICAgKSB7XG4gICAgICByZXR1cm4gY3VycmVudE1hY2hpbmVbZmllbGRdO1xuICAgIH1cbiAgICBpZiAoXG4gICAgICBmcm9tTWFjaGluZSAmJlxuICAgICAgZnJvbU1hY2hpbmVbZmllbGRdICYmXG4gICAgICBmcm9tTWFjaGluZVtmaWVsZF0udHJpbSgpICE9PSBcIlwiICYmXG4gICAgICBmcm9tTWFjaGluZVtmaWVsZF0gIT09IFwiTi9BXCJcbiAgICApIHtcbiAgICAgIHJldHVybiBmcm9tTWFjaGluZVtmaWVsZF07XG4gICAgfVxuXG4gICAgcmV0dXJuIGN1cnJlbnRWYWx1ZTsgLy8gRGVmYXVsdCB0byBrZWVwaW5nIHRoZSBjdXJyZW50IHZhbHVlXG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVNYWNoaW5lRmllbGRzKHRoZU1hY2hpbmUsIGN1cnJlbnRNYWNoaW5lLCBmcm9tTWFjaGluZSkge1xuICAgIHJldHVybiB7XG4gICAgICBvZW06IGdldFZhbGlkTWFjaGluZUZpZWxkKFwib2VtXCIsIHRoZU1hY2hpbmUsIGN1cnJlbnRNYWNoaW5lLCBmcm9tTWFjaGluZSksXG4gICAgICBtb2RhbGl0eTogZ2V0VmFsaWRNYWNoaW5lRmllbGQoXG4gICAgICAgIFwibW9kYWxpdHlcIixcbiAgICAgICAgdGhlTWFjaGluZSxcbiAgICAgICAgY3VycmVudE1hY2hpbmUsXG4gICAgICAgIGZyb21NYWNoaW5lXG4gICAgICApLFxuICAgICAgbW9kZWw6IGdldFZhbGlkTWFjaGluZUZpZWxkKFxuICAgICAgICBcIm1vZGVsXCIsXG4gICAgICAgIHRoZU1hY2hpbmUsXG4gICAgICAgIGN1cnJlbnRNYWNoaW5lLFxuICAgICAgICBmcm9tTWFjaGluZVxuICAgICAgKSxcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0VmFsaWRNYWNoaW5lRmllbGQoXG4gICAgZmllbGQsXG4gICAgdGhlTWFjaGluZSxcbiAgICBjdXJyZW50TWFjaGluZSxcbiAgICBmcm9tTWFjaGluZVxuICApIHtcbiAgICBpZiAoXG4gICAgICB0aGVNYWNoaW5lICYmXG4gICAgICB0aGVNYWNoaW5lW2ZpZWxkXSAmJlxuICAgICAgdGhlTWFjaGluZVtmaWVsZF0udHJpbSgpICE9PSBcIlwiICYmXG4gICAgICB0aGVNYWNoaW5lW2ZpZWxkXSAhPT0gXCJOL0FcIlxuICAgICkge1xuICAgICAgcmV0dXJuIHRoZU1hY2hpbmVbZmllbGRdO1xuICAgIH1cbiAgICBpZiAoXG4gICAgICBjdXJyZW50TWFjaGluZSAmJlxuICAgICAgY3VycmVudE1hY2hpbmVbZmllbGRdICYmXG4gICAgICBjdXJyZW50TWFjaGluZVtmaWVsZF0udHJpbSgpICE9PSBcIlwiICYmXG4gICAgICBjdXJyZW50TWFjaGluZVtmaWVsZF0gIT09IFwiTi9BXCJcbiAgICApIHtcbiAgICAgIHJldHVybiBjdXJyZW50TWFjaGluZVtmaWVsZF07XG4gICAgfVxuICAgIGlmIChcbiAgICAgIGZyb21NYWNoaW5lICYmXG4gICAgICBmcm9tTWFjaGluZVtmaWVsZF0gJiZcbiAgICAgIGZyb21NYWNoaW5lW2ZpZWxkXS50cmltKCkgIT09IFwiXCIgJiZcbiAgICAgIGZyb21NYWNoaW5lW2ZpZWxkXSAhPT0gXCJOL0FcIlxuICAgICkge1xuICAgICAgcmV0dXJuIGZyb21NYWNoaW5lW2ZpZWxkXTtcbiAgICB9XG4gICAgcmV0dXJuIFwiXCI7IC8vIEtlZXAgaXQgZW1wdHkgaWYgbm8gdmFsaWQgZGF0YSBleGlzdHNcbiAgfVxuXG4gIGNvbnN0IFtzaG93TG9jYWxMb2NGcm9tLCBzZXRTaG93TG9jYWxMb2NGcm9tXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3Nob3dMb2NhbExvY0N1cnJlbnQsIHNldFNob3dMb2NhbExvY0N1cnJlbnRdID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIGFzeW5jIGZ1bmN0aW9uIGhhbmRsZUNsb25lKCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgaWYgKCFpdGVtcy5uYW1lIHx8ICFkZXNjcmlwdGlvbnNbMF0/LmRlc2NyaXB0aW9uKSB7XG4gICAgICBoYW5kbGVTaG93KCk7IC8vIHlvdXIgZXhpc3RpbmcgZXJyb3IgbW9kYWxcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgc2V0TG9hZGluZyh0cnVlKTtcbiAgICB0cnkge1xuICAgICAgLy8gc2F2ZSBidXQgZG9u4oCZdCByZWRpcmVjdFxuICAgICAgYXdhaXQgdG9TZW5kKGZhbHNlKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgY29uZGl0aW9uID0gKG5hbWUpID0+IHtcbiAgICByZXR1cm4gbmFtZSAmJiBuYW1lLnRvTG93ZXJDYXNlKCkgPT09IFwiaW50ZXJpb3Igc29jYWxcIjtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVTZXRTZWxlY3RlZE1hY2hpbmUgPSAobWFjaGluZSkgPT4ge1xuICAgIGNvbnN0IGNvbmRpdGlvbiA9IChuYW1lKSA9PiBuYW1lICYmIG5hbWUudG9Mb3dlckNhc2UoKSA9PT0gXCJpbnRlcmlvciBzb2NhbFwiO1xuICAgIGlmIChtYWNoaW5lUGljaykge1xuICAgICAgc2V0U2VsZWN0ZWRNYWNoaW5lKHsgaWQ6IG1hY2hpbmUuaWQsIG5hbWU6IG1hY2hpbmUubmFtZSB9KTtcbiAgICAgIC8vIEZvciBcImZyb21cIiwgc2hvdyB0aGUgbG9jYWwgbG9jIGlucHV0IGlmIGNvbmRpdGlvbiBtZXQuXG4gICAgICBzZXRTaG93TG9jYWxMb2NGcm9tKGNvbmRpdGlvbihtYWNoaW5lLm5hbWUpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2V0U2VsZWN0ZWRDdXJyZW50TWFjaGluZSh7IGlkOiBtYWNoaW5lLmlkLCBuYW1lOiBtYWNoaW5lLm5hbWUgfSk7XG4gICAgICAvLyBGb3IgXCJjdXJyZW50XCIsIHlvdSBtaWdodCBhbHNvIHdhbnQgYSBsb2NhbCBsb2MgaW5wdXQ6XG4gICAgICBzZXRTaG93TG9jYWxMb2NDdXJyZW50KGNvbmRpdGlvbihtYWNoaW5lLm5hbWUpKTtcbiAgICB9XG4gICAgZmV0Y2hNYWNoaW5lKG1hY2hpbmUuaWQpO1xuICAgIHNldFNob3dNYWNoaW5lTW9kYWwoZmFsc2UpO1xuICB9O1xuXG4gIGNvbnN0IFtjdXJyZW50UG5JbmRleCwgc2V0Q3VycmVudFBuSW5kZXhdID0gdXNlU3RhdGUoMCk7XG4gIGNvbnN0IFtzaG93RHJvcGRvd24sIHNldFNob3dEcm9wZG93bl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtjdXJyZW50U25JbmRleCwgc2V0Q3VycmVudFNuSW5kZXhdID0gdXNlU3RhdGUoMCk7XG4gIGNvbnN0IFtzaG93U25Ecm9wZG93biwgc2V0U2hvd1NuRHJvcGRvd25dID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIGNvbnN0IGhhbmRsZUFkZE5ld0NsaWVudCA9ICgpID0+IHtcbiAgICAvLyBHZW5lcmF0ZSBhIHJhbmRvbSBjbGllbnQgbnVtYmVyIGFzIHBhcnQgb2YgdGhlIFVSTC5cbiAgICBjb25zdCByYW5kb21OdW0gPSBNYXRoLmZsb29yKDEwMDAwICsgTWF0aC5yYW5kb20oKSAqIDkwMDAwKTtcbiAgICAvLyBXaGVuIHB1c2hpbmcsIGluY2x1ZGUgYSBxdWVyeSBwYXJhbWV0ZXIgKGZyb209aXRlbSkgYW5kIHRoZSBjdXJyZW50IGl0ZW0gaWQgaWYgYXZhaWxhYmxlLlxuICAgIHJvdXRlci5wdXNoKGAvTmV3U2VhcmNoL2NsaWVudC9BSVMke3JhbmRvbU51bX0vYWRkQ2xpZW50P2Zyb209YWRkSXRlbWApO1xuICB9O1xuXG4gIGNvbnN0IFtzaG93TWFjaGluZVNlbGVjdCwgc2V0U2hvd01hY2hpbmVTZWxlY3RdID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIGNvbnN0IFtzZWxlY3RlZENsaWVudEZyb20sIHNldFNlbGVjdGVkQ2xpZW50RnJvbV0gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW3NlbGVjdGVkQ2xpZW50Q3VycmVudCwgc2V0U2VsZWN0ZWRDbGllbnRDdXJyZW50XSA9IHVzZVN0YXRlKG51bGwpO1xuXG4gIHJldHVybiAoXG4gICAgPExvZ2dlZEluPlxuICAgICAgey8qIEVycm9yIE1vZGFsICovfVxuICAgICAgPE1hY2hpbmVTZWxlY3Rpb25Nb2RhbFxuICAgICAgICBzaG93PXttYWNoaW5lU2VsZWN0aW9uTW9kYWx9XG4gICAgICAgIGhhbmRsZUNsb3NlPXsoKSA9PiBzZXRNYWNoaW5lU2VsZWN0aW9uTW9kYWwoZmFsc2UpfVxuICAgICAgICBzZXRNYWNoaW5lPXtoYW5kbGVTZXRTZWxlY3RlZE1hY2hpbmV9XG4gICAgICAgIG1hY2hpbmVPcHRpb25zPXttYWNoaW5lT3B0aW9uc30gLy8gaWYgeW91ciBtb2RhbCBuZWVkcyB0aGUgbGlzdCBvZiBtYWNoaW5lc1xuICAgICAgLz5cbiAgICAgIDxNb2RhbCBzaG93PXtzaG93fSBvbkhpZGU9e2hhbmRsZUNsb3NlfT5cbiAgICAgICAgPE1vZGFsLkhlYWRlciBjbG9zZUJ1dHRvbj5cbiAgICAgICAgICA8TW9kYWwuVGl0bGU+RXJyb3I8L01vZGFsLlRpdGxlPlxuICAgICAgICA8L01vZGFsLkhlYWRlcj5cbiAgICAgICAgPE1vZGFsLkJvZHk+TWlzc2luZyByZXF1aXJlZCBmaWVsZDogTmFtZSBhbmQgRGVzY3JpcHRpb248L01vZGFsLkJvZHk+XG4gICAgICAgIDxNb2RhbC5Gb290ZXI+XG4gICAgICAgICAgPEJ1dHRvbiB2YXJpYW50PVwicHJpbWFyeVwiIG9uQ2xpY2s9e2hhbmRsZUNsb3NlfT5cbiAgICAgICAgICAgIE9rXG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgIDwvTW9kYWwuRm9vdGVyPlxuICAgICAgPC9Nb2RhbD5cbiAgICAgIHsvKiBPdGhlciBNb2RhbHM6IHNob3dFcnIsIHNob3dTYXZlTW9kYWwsIERlc2NyaXB0aW9ucywgV29yayBPcmRlcnMsIGV0Yy4gKi99XG4gICAgICA8TW9kYWwgc2hvdz17c2hvd0Vycn0gb25IaWRlPXtoYW5kbGVDbG9zZUVycn0+XG4gICAgICAgIDxNb2RhbC5IZWFkZXIgY2xvc2VCdXR0b24+XG4gICAgICAgICAgPE1vZGFsLlRpdGxlPkVycm9yPC9Nb2RhbC5UaXRsZT5cbiAgICAgICAgPC9Nb2RhbC5IZWFkZXI+XG4gICAgICAgIDxNb2RhbC5Cb2R5PntFcnJ9PC9Nb2RhbC5Cb2R5PlxuICAgICAgICA8TW9kYWwuRm9vdGVyPlxuICAgICAgICAgIDxCdXR0b24gdmFyaWFudD1cInByaW1hcnlcIiBvbkNsaWNrPXtoYW5kbGVDbG9zZUVycn0+XG4gICAgICAgICAgICBPa1xuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICA8L01vZGFsLkZvb3Rlcj5cbiAgICAgIDwvTW9kYWw+XG4gICAgICA8TW9kYWwgc2hvdz17c2hvd1NhdmVNb2RhbH0gb25IaWRlPXtoYW5kbGVDbG9zZVNhdmVNb2RhbH0+XG4gICAgICAgIDxNb2RhbC5IZWFkZXIgY2xvc2VCdXR0b24+XG4gICAgICAgICAgPE1vZGFsLlRpdGxlPlNhdmUgQ29uZmlybWF0aW9uPC9Nb2RhbC5UaXRsZT5cbiAgICAgICAgPC9Nb2RhbC5IZWFkZXI+XG4gICAgICAgIDxNb2RhbC5Cb2R5PkRhdGEgaGFzIGJlZW4gc2F2ZWQgc3VjY2Vzc2Z1bGx5LjwvTW9kYWwuQm9keT5cbiAgICAgICAgPE1vZGFsLkZvb3Rlcj5cbiAgICAgICAgICA8QnV0dG9uIHZhcmlhbnQ9XCJwcmltYXJ5XCIgb25DbGljaz17aGFuZGxlQ2xvc2VTYXZlTW9kYWx9PlxuICAgICAgICAgICAgT2tcbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgPC9Nb2RhbC5Gb290ZXI+XG4gICAgICA8L01vZGFsPlxuICAgICAgPE1vZGFsIHNob3c9e3Nob3dEZXNjTW9kYWx9IG9uSGlkZT17aGFuZGxlQ2xvc2VEZXNjTW9kYWx9PlxuICAgICAgICA8TW9kYWwuSGVhZGVyIGNsb3NlQnV0dG9uPlxuICAgICAgICAgIDxNb2RhbC5UaXRsZT5EZXNjcmlwdGlvbnM8L01vZGFsLlRpdGxlPlxuICAgICAgICA8L01vZGFsLkhlYWRlcj5cbiAgICAgICAgPE1vZGFsLkJvZHk+XG4gICAgICAgICAgPEJ1dHRvbiB2YXJpYW50PVwicHJpbWFyeVwiIGNsYXNzTmFtZT1cIm1iLTNcIiBvbkNsaWNrPXthZGREZXNjcmlwdGlvbn0+XG4gICAgICAgICAgICBBZGQgRGVzY3JpcHRpb25cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICB7ZGVzY3JpcHRpb25zLm1hcCgoZGVzYywgaW5kZXgpID0+IChcbiAgICAgICAgICAgIDxSb3cga2V5PXtpbmRleH0gY2xhc3NOYW1lPVwibWItM1wiPlxuICAgICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgICAgdmFyaWFudD1cIm91dGxpbmUtc2Vjb25kYXJ5XCJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LTEwMFwiXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2VsZWN0RGVzY3JpcHRpb24oaW5kZXgpfVxuICAgICAgICAgICAgICAgIHN0eWxlPXt7IGN1cnNvcjogXCJwb2ludGVyXCIgfX1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZC1mbGV4IGp1c3RpZnktY29udGVudC1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj57ZGVzYy5kZXNjcmlwdGlvbiB8fCBcIkRlc2NyaXB0aW9uXCJ9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICBib3JkZXJMZWZ0OiBcIjFweCBzb2xpZCAjY2NjXCIsXG4gICAgICAgICAgICAgICAgICAgICAgcGFkZGluZ0xlZnQ6IFwiMTBweFwiLFxuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7ZGVzYy5kYXRlIHx8IFwiRGF0ZVwifVxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgIDwvUm93PlxuICAgICAgICAgICkpfVxuICAgICAgICAgIDxCdXR0b24gdmFyaWFudD1cInByaW1hcnlcIiBvbkNsaWNrPXtoYW5kbGVDbG9zZURlc2NNb2RhbH0+XG4gICAgICAgICAgICBPS1xuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICA8L01vZGFsLkJvZHk+XG4gICAgICA8L01vZGFsPlxuICAgICAgPE1vZGFsIHNob3c9e3Nob3dXb01vZGFsfSBvbkhpZGU9e2hhbmRsZUNsb3NlV29Nb2RhbH0+XG4gICAgICAgIDxNb2RhbC5IZWFkZXIgY2xvc2VCdXR0b24+XG4gICAgICAgICAgPE1vZGFsLlRpdGxlPldvcmsgT3JkZXJzPC9Nb2RhbC5UaXRsZT5cbiAgICAgICAgPC9Nb2RhbC5IZWFkZXI+XG4gICAgICAgIDxNb2RhbC5Cb2R5PlxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIHZhcmlhbnQ9XCJwcmltYXJ5XCJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1iLTNcIlxuICAgICAgICAgICAgb25DbGljaz17YWRkV29ya09yZGVyfVxuICAgICAgICAgICAgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiBcIjFyZW1cIiB9fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIEFkZCBXb3JrIE9yZGVyXG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAge3dvcmtPcmRlcnMubWFwKCh3bywgaW5kZXgpID0+IChcbiAgICAgICAgICAgIDxSb3cga2V5PXtpbmRleH0gY2xhc3NOYW1lPVwibWItM1wiPlxuICAgICAgICAgICAgICA8Q29sPlxuICAgICAgICAgICAgICAgIDxGb3JtLkNvbnRyb2xcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiV29yayBPcmRlclwiXG4gICAgICAgICAgICAgICAgICB2YWx1ZT17d28ud29ya09yZGVyfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PlxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVXb3JrT3JkZXJDaGFuZ2UoaW5kZXgsIFwid29ya09yZGVyXCIsIGUudGFyZ2V0LnZhbHVlKVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiBcIjAuNXJlbVwiIH19XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9Db2w+XG4gICAgICAgICAgICAgIDxDb2w+XG4gICAgICAgICAgICAgICAgPEZvcm0uQ29udHJvbFxuICAgICAgICAgICAgICAgICAgdHlwZT1cImRhdGVcIlxuICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJEYXRlXCJcbiAgICAgICAgICAgICAgICAgIHZhbHVlPXt3by5kYXRlfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PlxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVXb3JrT3JkZXJDaGFuZ2UoaW5kZXgsIFwiZGF0ZVwiLCBlLnRhcmdldC52YWx1ZSlcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L0NvbD5cbiAgICAgICAgICAgICAgPENvbD5cbiAgICAgICAgICAgICAgICA8QnV0dG9uIHZhcmlhbnQ9XCJkYW5nZXJcIiBvbkNsaWNrPXsoKSA9PiByZW1vdmVXb3JrT3JkZXIoaW5kZXgpfT5cbiAgICAgICAgICAgICAgICAgIFJlbW92ZVxuICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgICA8L0NvbD5cbiAgICAgICAgICAgIDwvUm93PlxuICAgICAgICAgICkpfVxuICAgICAgICAgIDxCdXR0b24gdmFyaWFudD1cInByaW1hcnlcIiBvbkNsaWNrPXtoYW5kbGVDbG9zZVdvTW9kYWx9PlxuICAgICAgICAgICAgT0tcbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgPC9Nb2RhbC5Cb2R5PlxuICAgICAgPC9Nb2RhbD5cbiAgICAgIHsvKiBNYWNoaW5lIFNlbGVjdGlvbiBNb2RhbCAqL31cbiAgICAgIDxDbGllbnRJbmZvTW9kYWxcbiAgICAgICAgc2hvdz17c2hvd01hY2hpbmVNb2RhbH1cbiAgICAgICAgaGFuZGxlQ2xvc2U9e2hhbmRsZUNsb3NlTWFjaGluZU1vZGFsfVxuICAgICAgICBzZWxlY3RlZENsaWVudD17c2VsZWN0ZWRDbGllbnR9XG4gICAgICAgIG1hY2hpbmVPcHRpb25zPXttYWNoaW5lT3B0aW9uc31cbiAgICAgICAgc2V0U2VsZWN0ZWRNYWNoaW5lPXtoYW5kbGVTZXRTZWxlY3RlZE1hY2hpbmV9XG4gICAgICAvPlxuICAgICAgPE1vZGFsIHNob3c9e3Nob3dDbGllbnRNb2RhbH0gb25IaWRlPXtoYW5kbGVDbG9zZUNsaWVudE1vZGFsfT5cbiAgICAgICAgPE1vZGFsLkhlYWRlciBjbG9zZUJ1dHRvbj5cbiAgICAgICAgICA8TW9kYWwuVGl0bGU+U2VsZWN0IENsaWVudDwvTW9kYWwuVGl0bGU+XG4gICAgICAgIDwvTW9kYWwuSGVhZGVyPlxuICAgICAgICA8TW9kYWwuQm9keT5cbiAgICAgICAgICA8Rm9ybUNvbnRyb2xcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoIGJ5IG5hbWVcIlxuICAgICAgICAgICAgY2xhc3NOYW1lPVwibWItM1wiXG4gICAgICAgICAgICB2YWx1ZT17c2VhcmNofVxuICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRTZWFyY2goZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPENsaWVudFRhYmxlXG4gICAgICAgICAgICBjbGllbnRzPXtjbGllbnRzLmZpbHRlcigoY2xpZW50KSA9PlxuICAgICAgICAgICAgICBjbGllbnQubmFtZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaC50b0xvd2VyQ2FzZSgpKVxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIG9uU2VsZWN0Q2xpZW50PXtoYW5kbGVDbGllbnRJbmZvfVxuICAgICAgICAgICAgb25JbmZvQ2xpY2s9e2hhbmRsZUNsaWVudEluZm99XG4gICAgICAgICAgICBjbGVhclNlbGVjdGlvbj17KCkgPT4gaGFuZGxlQ2xpZW50SW5mbyhudWxsKX1cbiAgICAgICAgICAgIG9uQWRkQ2xpZW50PXtoYW5kbGVBZGROZXdDbGllbnR9IC8vIG5ldyBwcm9wXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9Nb2RhbC5Cb2R5PlxuICAgICAgPC9Nb2RhbD5cblxuICAgICAgPFBhcmVudE1vZGFsXG4gICAgICAgIHNob3c9e3Nob3dQYXJlbnRNb2RhbH1cbiAgICAgICAgaGFuZGxlQ2xvc2U9e2hhbmRsZUNsb3NlUGFyZW50TW9kYWx9XG4gICAgICAgIHNldFNlbGVjdGVkUGFyZW50PXtzZXRTZWxlY3RlZFBhcmVudH1cbiAgICAgIC8+XG4gICAgICA8TWFjaGluZVNlbGVjdGlvbk1vZGFsXG4gICAgICAgIHNob3c9e21hY2hpbmVTZWxlY3Rpb25Nb2RhbH1cbiAgICAgICAgaGFuZGxlQ2xvc2U9eygpID0+IHNldE1hY2hpbmVTZWxlY3Rpb25Nb2RhbChmYWxzZSl9XG4gICAgICAgIHNldE1hY2hpbmU9e3NldFRoZU1hY2hpbmV9XG4gICAgICAvPlxuICAgICAgey8qIENhbWVyYSBNb2RhbCAqL31cbiAgICAgIDxNb2RhbCBzaG93PXtzaG93Q2FtZXJhTW9kYWx9IG9uSGlkZT17aGFuZGxlQ2xvc2VDYW1lcmFNb2RhbH0+XG4gICAgICAgIDxNb2RhbC5IZWFkZXIgY2xvc2VCdXR0b24+XG4gICAgICAgICAgPE1vZGFsLlRpdGxlPlRha2UgYSBQaG90bzwvTW9kYWwuVGl0bGU+XG4gICAgICAgIDwvTW9kYWwuSGVhZGVyPlxuICAgICAgICA8TW9kYWwuQm9keT5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhbWVyYVwiPlxuICAgICAgICAgICAgeyFjYXB0dXJlZFBob3RvID8gKFxuICAgICAgICAgICAgICA8QmFyY29kZVNjYW5uZXJDb21wb25lbnRcbiAgICAgICAgICAgICAgICB3aWR0aD1cIjEwMCVcIlxuICAgICAgICAgICAgICAgIGhlaWdodD17MzAwfVxuICAgICAgICAgICAgICAgIG9uVXBkYXRlPXtoYW5kbGVDYXB0dXJlfVxuICAgICAgICAgICAgICAgIGZhY2luZ01vZGU9e2NhbWVyYUZhY2luZ31cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGhvdG8tcHJldmlld1wiPlxuICAgICAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgICAgIHNyYz17VVJMLmNyZWF0ZU9iamVjdFVSTChjYXB0dXJlZFBob3RvKX1cbiAgICAgICAgICAgICAgICAgIGFsdD1cImNhcHR1cmVkXCJcbiAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IHdpZHRoOiBcIjEwMCVcIiB9fVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9Nb2RhbC5Cb2R5PlxuICAgICAgICA8TW9kYWwuRm9vdGVyPlxuICAgICAgICAgIHshY2FwdHVyZWRQaG90byA/IChcbiAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXtjYXB0dXJlUGhvdG99XG4gICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogXCI1MCVcIixcbiAgICAgICAgICAgICAgICAgIHdpZHRoOiBcIjYwcHhcIixcbiAgICAgICAgICAgICAgICAgIGhlaWdodDogXCI2MHB4XCIsXG4gICAgICAgICAgICAgICAgICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLFxuICAgICAgICAgICAgICAgICAgbGVmdDogXCI1MCVcIixcbiAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogXCJ0cmFuc2xhdGVYKC01MCUpXCIsXG4gICAgICAgICAgICAgICAgICBib3R0b206IFwiMTBweFwiLFxuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICDwn5O3XG4gICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT5cbiAgICAgICAgICAgICAgICAgIHNldENhbWVyYUZhY2luZygocHJldikgPT5cbiAgICAgICAgICAgICAgICAgICAgcHJldiA9PT0gXCJlbnZpcm9ubWVudFwiID8gXCJ1c2VyXCIgOiBcImVudmlyb25tZW50XCJcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICBGbGlwIENhbWVyYVxuICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgICAgPEJ1dHRvbiB2YXJpYW50PVwic2Vjb25kYXJ5XCIgb25DbGljaz17aGFuZGxlQ2xvc2VDYW1lcmFNb2RhbH0+XG4gICAgICAgICAgICAgICAgQ2FuY2VsXG4gICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgPC8+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgICB2YXJpYW50PVwic2Vjb25kYXJ5XCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRDYXB0dXJlZFBob3RvKG51bGwpfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgUmV0YWtlXG4gICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgICA8QnV0dG9uIHZhcmlhbnQ9XCJwcmltYXJ5XCIgb25DbGljaz17c2F2ZVBob3RvfT5cbiAgICAgICAgICAgICAgICBPS1xuICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgIDwvPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvTW9kYWwuRm9vdGVyPlxuICAgICAgPC9Nb2RhbD5cbiAgICAgIHsvKiBEZXNjcmlwdGlvbnMgTW9kYWwgKi99XG4gICAgICA8TW9kYWwgc2hvdz17c2hvd0Rlc2NNb2RhbH0gb25IaWRlPXtoYW5kbGVDbG9zZURlc2NNb2RhbH0+XG4gICAgICAgIDxNb2RhbC5IZWFkZXIgY2xvc2VCdXR0b24+XG4gICAgICAgICAgPE1vZGFsLlRpdGxlPkRlc2NyaXB0aW9uczwvTW9kYWwuVGl0bGU+XG4gICAgICAgIDwvTW9kYWwuSGVhZGVyPlxuICAgICAgICA8TW9kYWwuQm9keT5cbiAgICAgICAgICA8QnV0dG9uIHZhcmlhbnQ9XCJwcmltYXJ5XCIgY2xhc3NOYW1lPVwibWItM1wiIG9uQ2xpY2s9e2FkZERlc2NyaXB0aW9ufT5cbiAgICAgICAgICAgIEFkZCBEZXNjcmlwdGlvblxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgIHtkZXNjcmlwdGlvbnMubWFwKChkZXNjLCBpbmRleCkgPT4gKFxuICAgICAgICAgICAgPFJvdyBrZXk9e2luZGV4fSBjbGFzc05hbWU9XCJtYi0zXCI+XG4gICAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgICB2YXJpYW50PVwib3V0bGluZS1zZWNvbmRhcnlcIlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctMTAwXCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZWxlY3REZXNjcmlwdGlvbihpbmRleCl9XG4gICAgICAgICAgICAgICAgc3R5bGU9e3sgY3Vyc29yOiBcInBvaW50ZXJcIiB9fVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkLWZsZXgganVzdGlmeS1jb250ZW50LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPntkZXNjLmRlc2NyaXB0aW9uIHx8IFwiRGVzY3JpcHRpb25cIn08L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgIGJvcmRlckxlZnQ6IFwiMXB4IHNvbGlkICNjY2NcIixcbiAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nTGVmdDogXCIxMHB4XCIsXG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHtkZXNjLmRhdGUgfHwgXCJEYXRlXCJ9XG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgPC9Sb3c+XG4gICAgICAgICAgKSl9XG4gICAgICAgICAgPEJ1dHRvbiB2YXJpYW50PVwicHJpbWFyeVwiIG9uQ2xpY2s9e2hhbmRsZUNsb3NlRGVzY01vZGFsfT5cbiAgICAgICAgICAgIE9LXG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgIDwvTW9kYWwuQm9keT5cbiAgICAgIDwvTW9kYWw+XG5cbiAgICAgIHsvKiBJbmZvIE1vZGFsICovfVxuICAgICAgPEluZm9Nb2RhbFxuICAgICAgICBzaG93PXtzaG93SW5mb01vZGFsfVxuICAgICAgICBoYW5kbGVDbG9zZT17aGFuZGxlQ2xvc2VJbmZvTW9kYWx9XG4gICAgICAgIGl0ZW1OYW1lPXtpdGVtcy5uYW1lfVxuICAgICAgICBkaW1lbnNpb25zPXtgJHtpdGVtcy5sZW5ndGh9LCR7aXRlbXMud2lkdGh9LCR7aXRlbXMuaGVpZ2h0fWB9XG4gICAgICAgIHByaWNlPXtpdGVtcy5wcmljZX1cbiAgICAgICAgZnJlcUk9e2ZyZXFJdGVtfVxuICAgICAgICBmcmVxTT17bWFjaGluZUZyZXF1ZW5jeX1cbiAgICAgICAgdXNhZ2U9e3VzYWdlUGFzdFllYXJ9XG4gICAgICAvPlxuICAgICAge2xvYWRpbmcgJiYgKFxuICAgICAgICA8ZGl2XG4gICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgIHBvc2l0aW9uOiBcImZpeGVkXCIsXG4gICAgICAgICAgICB0b3A6IDAsXG4gICAgICAgICAgICBsZWZ0OiAwLFxuICAgICAgICAgICAgd2lkdGg6IFwiMTAwJVwiLFxuICAgICAgICAgICAgaGVpZ2h0OiBcIjEwMCVcIixcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogXCJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNylcIixcbiAgICAgICAgICAgIGJhY2tkcm9wRmlsdGVyOiBcImJsdXIoNXB4KVwiLFxuICAgICAgICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICAgICAgICBhbGlnbkl0ZW1zOiBcImNlbnRlclwiLFxuICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6IFwiY2VudGVyXCIsXG4gICAgICAgICAgICB6SW5kZXg6IDk5OTksIC8vIE1ha2Ugc3VyZSBpdCdzIGFib3ZlIGV2ZXJ5dGhpbmcgZWxzZVxuICAgICAgICAgIH19XG4gICAgICAgID5cbiAgICAgICAgICA8U3Bpbm5lciBhbmltYXRpb249XCJib3JkZXJcIiB2YXJpYW50PVwicHJpbWFyeVwiIHJvbGU9XCJzdGF0dXNcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInZpc3VhbGx5LWhpZGRlblwiPkxvYWRpbmcuLi48L3NwYW4+XG4gICAgICAgICAgPC9TcGlubmVyPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG4gICAgICB7LyogTWFpbiBGb3JtICovfVxuICAgICAgPENvbnRhaW5lclxuICAgICAgICBjbGFzc05hbWU9XCJkLWZsZXggYWxpZ24taXRlbXMtY2VudGVyIGp1c3RpZnktY29udGVudC1jZW50ZXJcIlxuICAgICAgICBzdHlsZT17eyBtaW5IZWlnaHQ6IFwiMTAwdmhcIiB9fVxuICAgICAgPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctMTAwXCIgc3R5bGU9e3sgbWF4V2lkdGg6IFwiNjAwcHhcIiB9fT5cbiAgICAgICAgICA8Q2FyZCBjbGFzc05hbWU9XCJhbGlnbi1pdGVtcy1jZW50ZXIganVzdGlmeS1jb250ZW50LWNlbnRlclwiPlxuICAgICAgICAgICAgPENhcmQuQm9keT5cbiAgICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQtY2VudGVyIG1iLTRcIj5BZGQgTmV3IEl0ZW08L2gyPlxuICAgICAgICAgICAgICA8Rm9ybSBvblN1Ym1pdD17aGFuZGxlU3VibWl0fT5cbiAgICAgICAgICAgICAgICB7LyogUm93IGZvciBOYW1lIGFuZCBQTiAqL31cbiAgICAgICAgICAgICAgICA8Um93IGNsYXNzTmFtZT1cIm1iLTNcIj5cbiAgICAgICAgICAgICAgICAgIDxDb2w+XG4gICAgICAgICAgICAgICAgICAgIDxGb3JtLkdyb3VwIGNvbnRyb2xJZD1cIm5hbWVcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8Rm9ybS5MYWJlbD5OYW1lPC9Gb3JtLkxhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgIDxGb3JtLkNvbnRyb2xcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtpdGVtcy5uYW1lfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUNoYW5nZShcIm5hbWVcIil9XG4gICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9Gb3JtLkdyb3VwPlxuICAgICAgICAgICAgICAgICAgPC9Db2w+XG4gICAgICAgICAgICAgICAgICA8Q29sPlxuICAgICAgICAgICAgICAgICAgICA8Rm9ybS5Hcm91cCBjb250cm9sSWQ9XCJwblwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxGb3JtLkxhYmVsPlByb2R1Y3QgTnVtYmVyPC9Gb3JtLkxhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgcG9zaXRpb246IFwicmVsYXRpdmVcIiB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxJbnB1dEdyb3VwPlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7LyogRWRpdGFibGUgaW5wdXQgZmllbGQgZGlzcGxheWluZyB0aGUgY3VycmVudCBQTiAqL31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm0uQ29udHJvbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17aXRlbXMucG5bY3VycmVudFBuSW5kZXhdIHx8IFwiXCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlUG5DaGFuZ2UoY3VycmVudFBuSW5kZXgsIGUudGFyZ2V0LnZhbHVlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgey8qIEFycm93IGJ1dHRvbiB0byB0b2dnbGUgZHJvcGRvd24gKi99XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXJpYW50PVwib3V0bGluZS1zZWNvbmRhcnlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFNob3dEcm9wZG93bighc2hvd0Ryb3Bkb3duKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICYjOTY2MjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHsvKiBQbHVzIGJ1dHRvbiB0byBhZGQgYSBuZXcgUE4gKi99XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxJbnB1dEdyb3VwLlRleHQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFudD1cIm91dGxpbmUtc2Vjb25kYXJ5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEFkZGluZ05ld1BuKHRydWUpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9JbnB1dEdyb3VwLlRleHQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L0lucHV0R3JvdXA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7LyogRHJvcGRvd24gbGlzdCBzaG93aW5nIG9ubHkgdGhlIGN1cnJlbnQgaXRlbSdzIFBOIG9wdGlvbnMgKi99XG4gICAgICAgICAgICAgICAgICAgICAgICB7c2hvd0Ryb3Bkb3duICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiBcIjEwMCVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByaWdodDogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogXCJ3aGl0ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiBcIjFweCBzb2xpZCAjY2NjXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6SW5kZXg6IDEwMDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXhIZWlnaHQ6IFwiMTUwcHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG92ZXJmbG93WTogXCJhdXRvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtpdGVtcy5wbi5tYXAoKHBuT3B0aW9uLCBpZHgpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtpZHh9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IHBhZGRpbmc6IFwiOHB4XCIsIGN1cnNvcjogXCJwb2ludGVyXCIgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEN1cnJlbnRQbkluZGV4KGlkeCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2hvd0Ryb3Bkb3duKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3BuT3B0aW9ufVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICB7LyogSW5wdXQgZm9yIGFkZGluZyBhIG5ldyBQTiwgaWYgdHJpZ2dlcmVkICovfVxuICAgICAgICAgICAgICAgICAgICAgIHthZGRpbmdOZXdQbiAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybS5Db250cm9sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJFbnRlciBuZXcgUE5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17bmV3UG59XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0TmV3UG4oZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkJsdXI9e2hhbmRsZUFkZE5ld1BufVxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbktleURvd249eyhlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGUua2V5ID09PSBcIkVudGVyXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZUFkZE5ld1BuKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICA8L0Zvcm0uR3JvdXA+XG4gICAgICAgICAgICAgICAgICA8L0NvbD5cbiAgICAgICAgICAgICAgICA8L1Jvdz5cbiAgICAgICAgICAgICAgICB7LyogUm93IGZvciBTTiAqL31cbiAgICAgICAgICAgICAgICA8Um93IGNsYXNzTmFtZT1cIm1iLTNcIj5cbiAgICAgICAgICAgICAgICAgIDxDb2w+XG4gICAgICAgICAgICAgICAgICAgIDxGb3JtLkdyb3VwIGNvbnRyb2xJZD1cInNuXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPEZvcm0uTGFiZWw+U2VyaWFsIE51bWJlcjwvRm9ybS5MYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHBvc2l0aW9uOiBcInJlbGF0aXZlXCIgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8SW5wdXRHcm91cD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgey8qIElubGluZSBlZGl0YWJsZSBpbnB1dCBzaG93aW5nIHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgU04gKi99XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtLkNvbnRyb2xcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2l0ZW1zLnNuW2N1cnJlbnRTbkluZGV4XSB8fCBcIlwifVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZVNuQ2hhbmdlKGN1cnJlbnRTbkluZGV4LCBlLnRhcmdldC52YWx1ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHsvKiBBcnJvdyBidXR0b24gdG8gdG9nZ2xlIFNOIGRyb3Bkb3duICovfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFudD1cIm91dGxpbmUtc2Vjb25kYXJ5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTaG93U25Ecm9wZG93bighc2hvd1NuRHJvcGRvd24pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJiM5NjYyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgey8qIFBsdXMgYnV0dG9uIHRvIGFkZCBhIG5ldyBTTiAqL31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPElucHV0R3JvdXAuVGV4dD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXJpYW50PVwib3V0bGluZS1zZWNvbmRhcnlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QWRkaW5nTmV3U24odHJ1ZSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L0lucHV0R3JvdXAuVGV4dD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvSW5wdXRHcm91cD5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsvKiBEcm9wZG93biBsaXN0IGZvciBTTiBvcHRpb25zICovfVxuICAgICAgICAgICAgICAgICAgICAgICAge3Nob3dTbkRyb3Bkb3duICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiBcIjEwMCVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByaWdodDogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogXCJ3aGl0ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiBcIjFweCBzb2xpZCAjY2NjXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6SW5kZXg6IDEwMDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXhIZWlnaHQ6IFwiMTUwcHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG92ZXJmbG93WTogXCJhdXRvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtpdGVtcy5zbi5tYXAoKHNuT3B0aW9uLCBpZHgpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtpZHh9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IHBhZGRpbmc6IFwiOHB4XCIsIGN1cnNvcjogXCJwb2ludGVyXCIgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEN1cnJlbnRTbkluZGV4KGlkeCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2hvd1NuRHJvcGRvd24oZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7c25PcHRpb259XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIHsvKiBJbnB1dCBmb3IgYWRkaW5nIGEgY29tcGxldGVseSBuZXcgU04gKi99XG4gICAgICAgICAgICAgICAgICAgICAge2FkZGluZ05ld1NuICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtLkNvbnRyb2xcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkVudGVyIG5ldyBTTlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtuZXdTbn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXROZXdTbihlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uQmx1cj17aGFuZGxlQWRkTmV3U259XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uS2V5RG93bj17KGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZS5rZXkgPT09IFwiRW50ZXJcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlQWRkTmV3U24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgIDwvRm9ybS5Hcm91cD5cbiAgICAgICAgICAgICAgICAgIDwvQ29sPlxuICAgICAgICAgICAgICAgICAgPENvbD5cbiAgICAgICAgICAgICAgICAgICAgPEZvcm0uR3JvdXAgY29udHJvbElkPVwic3RhdHVzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPEZvcm0uTGFiZWw+U3RhdHVzPC9Gb3JtLkxhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgIDxGb3JtLlNlbGVjdFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2l0ZW1zLnN0YXR1cyB8fCBcIlwifVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUNoYW5nZShcInN0YXR1c1wiKX1cbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiXCI+U2VsZWN0IHN0YXR1czwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIkdvb2RcIj5Hb29kPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiQmFkXCI+QmFkPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiVW5rbm93blwiPlVua25vd248L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L0Zvcm0uU2VsZWN0PlxuICAgICAgICAgICAgICAgICAgICA8L0Zvcm0uR3JvdXA+XG4gICAgICAgICAgICAgICAgICA8L0NvbD5cbiAgICAgICAgICAgICAgICA8L1Jvdz5cblxuICAgICAgICAgICAgICAgIHsvKiBSb3cgZm9yIE9FTSwgTW9kYWxpdHksIE1vZGVsICovfVxuICAgICAgICAgICAgICAgIDxSb3cgY2xhc3NOYW1lPVwibWItM1wiPlxuICAgICAgICAgICAgICAgICAgPENvbD5cbiAgICAgICAgICAgICAgICAgICAgPEZvcm0uR3JvdXAgY29udHJvbElkPVwib2VtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPEZvcm0uTGFiZWw+T0VNPC9Gb3JtLkxhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgIDxGb3JtLkNvbnRyb2xcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiT0VNXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtvZW19XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldE9lbShlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9Gb3JtLkdyb3VwPlxuICAgICAgICAgICAgICAgICAgPC9Db2w+XG4gICAgICAgICAgICAgICAgICA8Q29sPlxuICAgICAgICAgICAgICAgICAgICA8Rm9ybS5Hcm91cCBjb250cm9sSWQ9XCJtb2RhbGl0eVwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxGb3JtLkxhYmVsPk1vZGFsaXR5PC9Gb3JtLkxhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgIDxGb3JtLkNvbnRyb2xcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiTW9kYWxpdHlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e21vZGFsaXR5fVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRNb2RhbGl0eShlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9Gb3JtLkdyb3VwPlxuICAgICAgICAgICAgICAgICAgPC9Db2w+XG4gICAgICAgICAgICAgICAgICA8Q29sPlxuICAgICAgICAgICAgICAgICAgICA8Rm9ybS5Hcm91cCBjb250cm9sSWQ9XCJtb2RlbFwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxGb3JtLkxhYmVsPk1vZGVsPC9Gb3JtLkxhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgIDxGb3JtLkNvbnRyb2xcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiTW9kZWxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e21vZGVsfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRNb2RlbChlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9Gb3JtLkdyb3VwPlxuICAgICAgICAgICAgICAgICAgPC9Db2w+XG4gICAgICAgICAgICAgICAgPC9Sb3c+XG4gICAgICAgICAgICAgICAgey8qIFdvcmsgT3JkZXJzIGFuZCBEZXNjcmlwdGlvbnMgU2VjdGlvbiAqL31cbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogXCIxcmVtXCIsIG1hcmdpblRvcDogXCIxcmVtXCIgfX0+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImQtZmxleCBhbGlnbi1pdGVtcy1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgIHZhcmlhbnQ9XCJvdXRsaW5lLXNlY29uZGFyeVwiXG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlU2hvd1dvTW9kYWx9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibWUtMlwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICBNYW5hZ2UgV29yayBPcmRlcnNcbiAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgICAgICAgIHt3b3JrT3JkZXJzLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZC1mbGV4IGZsZXgtY29sdW1uIGFsaWduLWl0ZW1zLXN0YXJ0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybS5MYWJlbD5Xb3JrIE9yZGVyPC9Gb3JtLkxhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm0uQ29udHJvbFxuICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiTW9zdCBSZWNlbnQgV29yayBPcmRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXttb3N0UmVjZW50V29ya09yZGVyPy53b3JrT3JkZXIgfHwgXCJcIn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZVdvcmtPcmRlckNoYW5nZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdvcmtPcmRlcnMuaW5kZXhPZihtb3N0UmVjZW50V29ya09yZGVyKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwid29ya09yZGVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnRhcmdldC52YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyBtYXJnaW5Cb3R0b206IFwiMC41cmVtXCIgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybS5MYWJlbD5EYXRlPC9Gb3JtLkxhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm0uQ29udHJvbFxuICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiZGF0ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiV29yayBPcmRlciBEYXRlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e21vc3RSZWNlbnRXb3JrT3JkZXI/LmRhdGUgfHwgXCJcIn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZVdvcmtPcmRlckNoYW5nZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdvcmtPcmRlcnMuaW5kZXhPZihtb3N0UmVjZW50V29ya09yZGVyKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZS50YXJnZXQudmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiBcIjAuNXJlbVwiIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgey8qIERlc2NyaXB0aW9uIEVkaXRpbmcgKi99XG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Cb3R0b206IFwiMXJlbVwiIH19PlxuICAgICAgICAgICAgICAgICAgPEZvcm0uR3JvdXAgY29udHJvbElkPVwiZGVzY1wiPlxuICAgICAgICAgICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgdmFyaWFudD1cIm91dGxpbmUtc2Vjb25kYXJ5XCJcbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtsaXN0RGVzY3JpcHRpb25zfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1iLTIgbWUtMlwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICBMaXN0IERlc2NyaXB0aW9uc1xuICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPEZvcm0uQ29udHJvbFxuICAgICAgICAgICAgICAgICAgICAgIGFzPVwidGV4dGFyZWFcIlxuICAgICAgICAgICAgICAgICAgICAgIHJvd3M9ezN9XG4gICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJFbnRlciBkZXNjcmlwdGlvblwiXG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2Rlc2NyaXB0aW9uc1tzZWxlY3RlZERlc2NdPy5kZXNjcmlwdGlvbiB8fCBcIlwifVxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZURlc2NyaXB0aW9uQ2hhbmdlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZERlc2MsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZS50YXJnZXQudmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiBcIjAuNXJlbVwiIH19XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDxGb3JtLkNvbnRyb2xcbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiZGF0ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2Rlc2NyaXB0aW9uc1tzZWxlY3RlZERlc2NdPy5kYXRlIHx8IFwiXCJ9XG4gICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlRGVzY3JpcHRpb25DaGFuZ2UoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkRGVzYyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGUudGFyZ2V0LnZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IG1hcmdpblRvcDogXCIwLjVyZW1cIiwgbWFyZ2luQm90dG9tOiBcIjAuNXJlbVwiIH19XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICA8L0Zvcm0uR3JvdXA+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgey8qIE1hY2hpbmUgU2VsZWN0aW9uIFJvdyB3aXRoIExvY2FsIExvYyBJbnB1dHMgKi99XG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Cb3R0b206IFwiMXJlbVwiIH19PlxuICAgICAgICAgICAgICAgICAgPFJvdyBjbGFzc05hbWU9XCJtYi0zXCI+XG4gICAgICAgICAgICAgICAgICAgIDxDb2w+XG4gICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFudD1cIm91dGxpbmUtc2Vjb25kYXJ5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0TWFjaGluZVBpY2sodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZVNob3dDbGllbnRNb2RhbCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1lLTJcIlxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIFNlbGVjdCBGcm9tXG4gICAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAge3NlbGVjdGVkQ2xpZW50RnJvbSAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiBcIjFweCBzb2xpZCAjY2NjXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogXCIwLjc1cmVtXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiBcIjRweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpbkJvdHRvbTogXCIxcmVtXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzdHJvbmc+U2VsZWN0ZWQgQ2xpZW50IChGcm9tKTo8L3N0cm9uZz57XCIgXCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3NlbGVjdGVkQ2xpZW50RnJvbS5uYW1lfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luVG9wOiBcIjAuNXJlbVwiIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhbnQ9XCJvdXRsaW5lLXNlY29uZGFyeVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTaG93TWFjaGluZU1vZGFsKHRydWUpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNlbGVjdCBNYWNoaW5lIGZvciB7c2VsZWN0ZWRDbGllbnRGcm9tLm5hbWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3NlbGVjdGVkTWFjaGluZSAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBzdHlsZT17eyBtYXJnaW5Ub3A6IFwiMC41cmVtXCIgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHN0cm9uZz5TZWxlY3RlZCBNYWNoaW5lIChGcm9tKTo8L3N0cm9uZz57XCIgXCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3NlbGVjdGVkTWFjaGluZS5uYW1lfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtzaG93TG9jYWxMb2NGcm9tICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybS5Hcm91cFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbElkPVwibG9jYWxMb2NGcm9tXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm10LTJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtLkxhYmVsPkxvY2FsIExvYyAoRnJvbSk8L0Zvcm0uTGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybS5Db250cm9sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2xvY2FsTG9jRnJvbX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldExvY2FsTG9jRnJvbShlLnRhcmdldC52YWx1ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0Zvcm0uR3JvdXA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgIDwvQ29sPlxuICAgICAgICAgICAgICAgICAgICA8Q29sPlxuICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhbnQ9XCJvdXRsaW5lLXNlY29uZGFyeVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldE1hY2hpbmVQaWNrKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlU2hvd0NsaWVudE1vZGFsKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibWUtMlwiXG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgU2VsZWN0IEN1cnJlbnRcbiAgICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICB7c2VsZWN0ZWRDbGllbnRDdXJyZW50ICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXI6IFwiMXB4IHNvbGlkICNjY2NcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiBcIjAuNzVyZW1cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IFwiNHB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFyZ2luQm90dG9tOiBcIjFyZW1cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHN0cm9uZz5TZWxlY3RlZCBDbGllbnQgKEN1cnJlbnQpOjwvc3Ryb25nPntcIiBcIn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7c2VsZWN0ZWRDbGllbnRDdXJyZW50Lm5hbWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Ub3A6IFwiMC41cmVtXCIgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFudD1cIm91dGxpbmUtc2Vjb25kYXJ5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFNob3dNYWNoaW5lTW9kYWwodHJ1ZSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgU2VsZWN0IE1hY2hpbmUgZm9yIHtzZWxlY3RlZENsaWVudEN1cnJlbnQubmFtZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7c2VsZWN0ZWRDdXJyZW50TWFjaGluZSAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBzdHlsZT17eyBtYXJnaW5Ub3A6IFwiMC41cmVtXCIgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHN0cm9uZz5TZWxlY3RlZCBNYWNoaW5lIChDdXJyZW50KTo8L3N0cm9uZz57XCIgXCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3NlbGVjdGVkQ3VycmVudE1hY2hpbmUubmFtZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7c2hvd0xvY2FsTG9jQ3VycmVudCAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm0uR3JvdXBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xJZD1cImxvY2FsTG9jQ3VycmVudFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJtdC0yXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybS5MYWJlbD5Mb2NhbCBMb2MgKEN1cnJlbnQpPC9Gb3JtLkxhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm0uQ29udHJvbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtsb2NhbExvY0N1cnJlbnR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRMb2NhbExvY0N1cnJlbnQoZS50YXJnZXQudmFsdWUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Gb3JtLkdyb3VwPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICA8L0NvbD5cbiAgICAgICAgICAgICAgICAgICAgPENvbD5cbiAgICAgICAgICAgICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXJpYW50PVwib3V0bGluZS1zZWNvbmRhcnlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlU2hvd1BhcmVudE1vZGFsfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibWUtMlwiXG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgU2VsZWN0IFBhcmVudFxuICAgICAgICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgIHtzZWxlY3RlZFBhcmVudCAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybS5Db250cm9sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJTZWxlY3RlZCBQYXJlbnRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17c2VsZWN0ZWRQYXJlbnQubmFtZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgY3Vyc29yOiBcImRlZmF1bHRcIiwgbWFyZ2luVG9wOiBcIjAuNXJlbVwiIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgIDwvQ29sPlxuICAgICAgICAgICAgICAgICAgPC9Sb3c+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgey8qIFBob3RvIEFjdGlvbiBSb3cgKi99XG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Cb3R0b206IFwiMXJlbVwiIH19PlxuICAgICAgICAgICAgICAgICAgPFJvdyBjbGFzc05hbWU9XCJtYi0zXCI+XG4gICAgICAgICAgICAgICAgICAgIDxDb2wgeHM9ezZ9PlxuICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b25Hcm91cD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFudD1cIm91dGxpbmUtc2Vjb25kYXJ5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlU2hvd0NhbWVyYU1vZGFsfVxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICBUYWtlIFBob3RvXG4gICAgICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFudD1cIm91dGxpbmUtc2Vjb25kYXJ5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlQnJvd3NlUGhvdG9zfVxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICBCcm93c2VcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgIDwvQnV0dG9uR3JvdXA+XG4gICAgICAgICAgICAgICAgICAgIDwvQ29sPlxuICAgICAgICAgICAgICAgICAgICA8Q29sIHhzPXs2fSBjbGFzc05hbWU9XCJkLWZsZXggYWxpZ24taXRlbXMtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFudD17YWRkVG9XZWJzaXRlID8gXCJwcmltYXJ5XCIgOiBcIm91dGxpbmUtcHJpbWFyeVwifVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QWRkVG9XZWJzaXRlKChwcmV2KSA9PiAhcHJldil9XG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAge2FkZFRvV2Vic2l0ZSA/IFwi4pyTIEFkZCB0byBXZWJzaXRlXCIgOiBcIkFkZCB0byBXZWJzaXRlXCJ9XG4gICAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgPEZvcm0uQ2hlY2tcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBpZD1cImhpZGUtY2hlY2tib3hcIlxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw9XCJIaWRlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGJveCBpcyBjaGVja2VkIHdoZW4gd2Ugd2FudCB2aXNpYmxlID0gZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9eyFpdGVtcy52aXNpYmxlfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGdyYWIgY2hlY2tlZCBpbW1lZGlhdGVseVxuICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpc0hpZGRlbiA9IGUuY3VycmVudFRhcmdldC5jaGVja2VkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRJdGVtcygocHJldikgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5wcmV2LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpc2libGU6ICFpc0hpZGRlbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1zLTNcIlxuICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvQ29sPlxuICAgICAgICAgICAgICAgICAgPC9Sb3c+XG4gICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImZpbGVcIlxuICAgICAgICAgICAgICAgICAgICBhY2NlcHQ9XCJpbWFnZS8qXCJcbiAgICAgICAgICAgICAgICAgICAgbXVsdGlwbGVcbiAgICAgICAgICAgICAgICAgICAgcmVmPXticm93c2VJbnB1dFJlZn1cbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgZGlzcGxheTogXCJub25lXCIgfX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUZpbGVzU2VsZWN0ZWR9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIHsvKiBQaG90byBHYWxsZXJ5ICovfVxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtMyBkLWZsZXggZmxleC13cmFwXCI+XG4gICAgICAgICAgICAgICAgICB7cGhvdG9zLm1hcCgocGhvdG8sIGluZGV4KSA9PiAoXG4gICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICBrZXk9e2luZGV4fVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImQtZmxleCBmbGV4LWNvbHVtbiBhbGlnbi1pdGVtcy1jZW50ZXIgbWItMiBtZS0yXCJcbiAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IFwiMTAwcHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogXCIxMDBweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IFwicmVsYXRpdmVcIixcbiAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICAgICAgICAgICAgc3JjPXtwaG90by51cmx9XG4gICAgICAgICAgICAgICAgICAgICAgICBhbHQ9e2BQaG90byAke2luZGV4ICsgMX1gfVxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IFwiMTAwJVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IFwiMTAwJVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBvYmplY3RGaXQ6IFwiY292ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICB7cGhvdG8uZmlsZSAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhbnQ9XCJkYW5nZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBzaXplPVwic21cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBcImFic29sdXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0OiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6IFwiMCA1cHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gcmVtb3ZlUGhvdG8oaW5kZXgpfVxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICBYXG4gICAgICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIHsvKiBFeHRyYSBTZWN0aW9uOiBEaW1lbnNpb25zLCBQcmljZSwgYW5kIERPTSAqL31cblxuICAgICAgICAgICAgICAgIHsvKiBTdWJtaXQgUm93ICovfVxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtMyBkLWZsZXggZmxleC13cmFwIGFsaWduLWl0ZW1zLWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICAgICAgICB2YXJpYW50PVwicHJpbWFyeVwiXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJzdWJtaXRcIlxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyBtYXJnaW5SaWdodDogXCIxcmVtXCIgfX1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgU2F2ZVxuICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIHZhcmlhbnQ9XCJpbmZvXCJcbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlQ2xvbmV9XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IG1hcmdpblJpZ2h0OiBcIjFyZW1cIiB9fVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICBDbG9uZVxuICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgICAgICA8TG9hZGluZ0J1dHRvblxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwic2Vjb25kYXJ5XCJcbiAgICAgICAgICAgICAgICAgICAgbmFtZT1cIkJhY2tcIlxuICAgICAgICAgICAgICAgICAgICByb3V0ZT1cIk5ld1NlYXJjaC9tYWluU2VhcmNoXCJcbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIHZhcmlhbnQ9XCJpbmZvXCJcbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlUHJpbnR9XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IG1hcmdpbkxlZnQ6IFwiYXV0b1wiIH19XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIFByaW50IExhYmVsXG4gICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHRleHRBbGlnbjogXCJjZW50ZXJcIiwgbWFyZ2luOiBcIjFyZW0gMFwiIH19PlxuICAgICAgICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICAgICAgICB2YXJpYW50PVwibGlua1wiXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgdGV4dERlY29yYXRpb246IFwibm9uZVwiLFxuICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBcImJsYWNrXCIsXG4gICAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6IFwiMjRweFwiLFxuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTaG93RXh0cmEoIXNob3dFeHRyYSl9XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIOKWvFxuICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPENvbGxhcHNlIGluPXtzaG93RXh0cmF9PlxuICAgICAgICAgICAgICAgICAgPGRpdiBpZD1cImV4dHJhLWNvbGxhcHNlXCIgY2xhc3NOYW1lPVwibXQtM1wiPlxuICAgICAgICAgICAgICAgICAgICA8Um93PlxuICAgICAgICAgICAgICAgICAgICAgIDxGb3JtLkdyb3VwIGFzPXtDb2x9IGNvbnRyb2xJZD1cImRpbWVuc2lvbnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtLkxhYmVsPkRpbWVuc2lvbnMgKEwgeCBXIHggSCk8L0Zvcm0uTGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Um93PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8Q29sPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtLkNvbnRyb2xcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiTGVuZ3RoXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtpdGVtcy5sZW5ndGh9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlQ2hhbmdlKFwibGVuZ3RoXCIpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29sPlxuICAgICAgICAgICAgICAgICAgICAgICAgICB4XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxDb2w+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm0uQ29udHJvbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJXaWR0aFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17aXRlbXMud2lkdGh9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlQ2hhbmdlKFwid2lkdGhcIil9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Db2w+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPENvbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybS5Db250cm9sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkhlaWdodFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17aXRlbXMuaGVpZ2h0fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUNoYW5nZShcImhlaWdodFwiKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvUm93PlxuICAgICAgICAgICAgICAgICAgICAgIDwvRm9ybS5Hcm91cD5cbiAgICAgICAgICAgICAgICAgICAgICA8Rm9ybS5Hcm91cCBhcz17Q29sfSBjb250cm9sSWQ9XCJwcmljZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm0uTGFiZWw+UHJpY2U8L0Zvcm0uTGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybS5Db250cm9sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiUHJpY2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtpdGVtcy5wcmljZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUNoYW5nZShcInByaWNlXCIpfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8L0Zvcm0uR3JvdXA+XG4gICAgICAgICAgICAgICAgICAgIDwvUm93PlxuICAgICAgICAgICAgICAgICAgICA8Um93IGNsYXNzTmFtZT1cIm10LTNcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8Rm9ybS5Hcm91cCBhcz17Q29sfSBjb250cm9sSWQ9XCJET01cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtLkxhYmVsPkRPTSAoRGF0ZSBvZiBNYW51ZmFjdHVyZSk8L0Zvcm0uTGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybS5Db250cm9sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRW50ZXIgRE9NXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImRhdGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17RE9NfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldERPTShlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgIDwvRm9ybS5Hcm91cD5cbiAgICAgICAgICAgICAgICAgICAgICB7LyogTkVXOiBMb2NhbCBTTiBpbnB1dCAqL31cbiAgICAgICAgICAgICAgICAgICAgICA8Rm9ybS5Hcm91cCBhcz17Q29sfSBjb250cm9sSWQ9XCJsb2NhbFNOXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybS5MYWJlbD5Mb2NhbCBTTjwvRm9ybS5MYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtLkNvbnRyb2xcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkVudGVyIExvY2FsIFNOXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2l0ZW1zLmxvY2FsU04gfHwgXCJcIn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUNoYW5nZShcImxvY2FsU05cIil9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgIDwvRm9ybS5Hcm91cD5cbiAgICAgICAgICAgICAgICAgICAgPC9Sb3c+XG4gICAgICAgICAgICAgICAgICAgIDxSb3c+XG4gICAgICAgICAgICAgICAgICAgICAgPEZvcm0uR3JvdXAgYXM9e0NvbH0gY29udHJvbElkPVwicG9OdW1iZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtLkxhYmVsPlBPIE51bWJlcjwvRm9ybS5MYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtLkNvbnRyb2xcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlBPIE51bWJlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtpdGVtcy5wb051bWJlciB8fCBcIlwifVxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlQ2hhbmdlKFwicG9OdW1iZXJcIil9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgIDwvRm9ybS5Hcm91cD5cbiAgICAgICAgICAgICAgICAgICAgICA8Rm9ybS5Hcm91cCBhcz17Q29sfSBjb250cm9sSWQ9XCJhcnJpdmFsRGF0ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm0uTGFiZWw+QXJyaXZhbCBEYXRlPC9Gb3JtLkxhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm0uQ29udHJvbFxuICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkVudGVyIEFycml2YWwgRGF0ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJkYXRlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2l0ZW1zLmFycml2YWxfZGF0ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBlLnRhcmdldC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRJdGVtcygocHJldikgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLnByZXYsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJpdmFsX2RhdGU6IHZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPC9Gb3JtLkdyb3VwPlxuICAgICAgICAgICAgICAgICAgICA8L1Jvdz5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvQ29sbGFwc2U+XG4gICAgICAgICAgICAgIDwvRm9ybT5cbiAgICAgICAgICAgIDwvQ2FyZC5Cb2R5PlxuICAgICAgICAgIDwvQ2FyZD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L0NvbnRhaW5lcj5cbiAgICA8L0xvZ2dlZEluPlxuICApO1xufVxuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7XG4gIE1vZGFsLFxuICBDb250YWluZXIsXG4gIENhcmQsXG4gIFJvdyxcbiAgQ29sLFxuICBJbnB1dEdyb3VwLFxuICBEcm9wZG93bixcbiAgRm9ybUNvbnRyb2wsXG4gIEJ1dHRvbixcbiAgTmF2RHJvcGRvd24sXG4gIEZvcm0sXG4gIFRhYmxlLFxufSBmcm9tIFwicmVhY3QtYm9vdHN0cmFwXCI7XG5pbXBvcnQge1xuICBmZXRjaFBhcnRzV2l0aE1hY2hpbmVEYXRhLFxuICBmZXRjaENsaWVudHMsXG4gIGZldGNoTW9kZWxzLFxuICBmb3JtYXREYXRlLFxufSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvZmV0Y2hBc3NvY2lhdGlvbnNcIjtcbmltcG9ydCB7IHVzZUF1dGggfSBmcm9tIFwiLi4vLi4vLi4vY29udGV4dC9BdXRoVXNlckNvbnRleHRcIjtcbmltcG9ydCBMb2dnZWRJbiBmcm9tIFwiLi4vLi4vTG9nZ2VkSW5cIjtcbmltcG9ydCBDbGllbnRUYWJsZSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvQ2xpZW50VGFibGVcIjtcbmltcG9ydCBNb2RlbFRhYmxlIGZyb20gXCIuLi8uLi8uLi91dGlscy9Nb2RlbFRhYmxlXCI7XG5pbXBvcnQgUGFydFRhYmxlIGZyb20gXCIuLi8uLi8uLi91dGlscy9QYXJ0VGFibGVcIjtcbmltcG9ydCBzdHlsZXMgZnJvbSBcIi4uLy4uLy4uL3N0eWxlcy9NYWluU2VhcmNoLm1vZHVsZS5jc3NcIjtcbmltcG9ydCBmaXJlYmFzZSBmcm9tIFwiLi4vLi4vLi4vY29udGV4dC9GaXJlYmFzZVwiO1xuXG5jb25zdCBDTElFTlRfV0FSRUhPVVNFID0gXCJpZ29yLWhvdXNlXCI7XG5jb25zdCBDTElFTlRfVU5BU1NJR05FRCA9IFwidW5hc3NpZ25lZFwiO1xuXG5jb25zdCBQYXJlbnRNb2RhbCA9ICh7IHNob3csIGhhbmRsZUNsb3NlLCBzZXRTZWxlY3RlZFBhcmVudCwgcGFydHMgfSkgPT4ge1xuICBjb25zdCBbaW5mbywgc2V0SW5mb10gPSB1c2VTdGF0ZShbXSk7XG4gIGNvbnN0IFtiYWNrdXBJbmZvLCBzZXRCYWNrdXBJbmZvXSA9IHVzZVN0YXRlKFtdKTtcbiAgLy8gY29uc3QgW2lkcywgc2V0SURdID0gdXNlU3RhdGUoW10pO1xuICBjb25zdCBbc2VhcmNoLCBzZXRTZWFyY2hdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtzZWxlY3QsIHNldFNlbGVjdF0gPSB1c2VTdGF0ZShcIk5hbWVcIik7XG4gIGNvbnN0IFtzaG93TGlzdCwgc2V0U2hvd0xpc3RdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbc2hvd0xpc3RTZWFyY2gsIHNldFNob3dMaXN0U2VhcmNoXSA9IHVzZVN0YXRlKFwidGV4dFwiKTtcbiAgY29uc3QgW3NlbGVjdGVkT0VNLCBzZXRTZWxlY3RlZE9FTV0gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW3NlbGVjdGVkTW9kYWxpdHksIHNldFNlbGVjdGVkTW9kYWxpdHldID0gdXNlU3RhdGUobnVsbCk7XG4gIGNvbnN0IFtzZWxlY3RlZENsaWVudCwgc2V0U2VsZWN0ZWRDbGllbnRdID0gdXNlU3RhdGUobnVsbCk7XG4gIGNvbnN0IFtjbGllbnRzLCBzZXRDbGllbnRzXSA9IHVzZVN0YXRlKFtdKTtcbiAgY29uc3QgW3Nob3dDbGllbnRNb2RhbCwgc2V0U2hvd0NsaWVudE1vZGFsXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2NsaWVudEJ1dHRvblRleHQsIHNldENsaWVudEJ1dHRvblRleHRdID0gdXNlU3RhdGUoXCJTZWxlY3QgT3B0aW9uXCIpO1xuICBjb25zdCBbaG92ZXJJbmRleCwgc2V0SG92ZXJJbmRleF0gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW3NlbGVjdGVkTW9kZWwsIHNldFNlbGVjdGVkTW9kZWxdID0gdXNlU3RhdGUobnVsbCk7XG4gIGNvbnN0IFttb2RlbHMsIHNldE1vZGVsc10gPSB1c2VTdGF0ZShbXSk7XG4gIGNvbnN0IFtzaG93TW9kZWxNb2RhbCwgc2V0U2hvd01vZGVsTW9kYWxdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbbW9kZWxCdXR0b25UZXh0LCBzZXRNb2RlbEJ1dHRvblRleHRdID0gdXNlU3RhdGUoXCJTZWxlY3QgT3B0aW9uXCIpO1xuICBjb25zdCBbY2xpZW50U2VhcmNoVGVybSwgc2V0Q2xpZW50U2VhcmNoVGVybV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW21vZGVsU2VhcmNoVGVybSwgc2V0TW9kZWxTZWFyY2hUZXJtXSA9IHVzZVN0YXRlKFwiXCIpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgYXN5bmMgZnVuY3Rpb24gZmV0Y2hEYXRhKCkge1xuICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IGZldGNoUGFydHNXaXRoTWFjaGluZURhdGEoKTtcbiAgICAgIHNldEluZm8oZGF0YSk7XG4gICAgICBzZXRCYWNrdXBJbmZvKGRhdGEpO1xuICAgICAgLy8gc2V0SUQoZGF0YS5tYXAoKGl0ZW0pID0+IGl0ZW0uaWQpKTsgLy8gRW5zdXJlIElEcyBhcmUgY29ycmVjdGx5IHNldCBoZXJlXG4gICAgfVxuICAgIGZldGNoRGF0YSgpO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgaGFuZGxlQ2xvc2VDbGllbnRNb2RhbCA9ICgpID0+IHNldFNob3dDbGllbnRNb2RhbChmYWxzZSk7XG4gIGNvbnN0IGhhbmRsZVNob3dDbGllbnRNb2RhbCA9ICgpID0+IHNldFNob3dDbGllbnRNb2RhbCh0cnVlKTtcblxuICBjb25zdCBoYW5kbGVDbG9zZU1vZGVsTW9kYWwgPSAoKSA9PiBzZXRTaG93TW9kZWxNb2RhbChmYWxzZSk7XG4gIGNvbnN0IGhhbmRsZVNob3dNb2RlbE1vZGFsID0gKCkgPT4gc2V0U2hvd01vZGVsTW9kYWwodHJ1ZSk7XG5cbiAgLy8gSGFuZGxlIHNlYXJjaCBpbnB1dCBjaGFuZ2VzXG4gIGNvbnN0IHNlYXJjaENoYW5nZUhhbmRsZXIgPSAoZXZlbnQpID0+IHNldFNlYXJjaChldmVudC50YXJnZXQudmFsdWUpO1xuXG4gIC8vIEZpbHRlciBpdGVtcyBiYXNlZCBvbiBzZWFyY2ggY3JpdGVyaWFcbiAgZnVuY3Rpb24gc2VhcmNoRmlsdGVyKCkge1xuICAgIGNvbnN0IHRlbXAgPSBiYWNrdXBJbmZvLmZpbHRlcigoaXRlbSkgPT4ge1xuICAgICAgaWYgKGl0ZW0ubWFjaGluZURhdGEpIHtcbiAgICAgICAgaWYgKHNlbGVjdGVkT0VNICYmIGl0ZW0ubWFjaGluZURhdGEuT0VNICE9PSBzZWxlY3RlZE9FTSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZiAoc2VsZWN0ZWRNb2RhbGl0eSAmJiBpdGVtLm1hY2hpbmVEYXRhLk1vZGFsaXR5ICE9PSBzZWxlY3RlZE1vZGFsaXR5KVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYgKHNlbGVjdGVkQ2xpZW50ICYmIGl0ZW0ubWFjaGluZURhdGEuQ2xpZW50ICE9PSBzZWxlY3RlZENsaWVudClcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmIChzZWxlY3RlZE1vZGVsICYmIGl0ZW0ubWFjaGluZURhdGEuTW9kZWwgIT09IHNlbGVjdGVkTW9kZWwpXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBpZiAoXG4gICAgICAgIHNlbGVjdCA9PT0gXCJOYW1lXCIgJiZcbiAgICAgICAgaXRlbS5uYW1lLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoLnRvTG93ZXJDYXNlKCkpXG4gICAgICApXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgaWYgKHNlbGVjdCA9PT0gXCJEYXRlXCIpIHtcbiAgICAgICAgY29uc3QgW21vbnRoLCBkYXksIHllYXJdID0gaXRlbS5kYXRlLnNwbGl0KFwiL1wiKTtcbiAgICAgICAgY29uc3QgcmVmb3JtYXR0ZWREYXRlID0gYCR7eWVhcn0tJHttb250aH0tJHtkYXl9YDtcbiAgICAgICAgcmV0dXJuIHJlZm9ybWF0dGVkRGF0ZSA9PT0gc2VhcmNoO1xuICAgICAgfVxuICAgICAgaWYgKHNlbGVjdCA9PT0gXCJXb3JrIE9yZGVyXCIgJiYgTnVtYmVyKGl0ZW0ud28pID09PSBOdW1iZXIoc2VhcmNoKSlcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICBpZiAoc2VsZWN0ID09PSBcIlByb2R1Y3QgTnVtYmVyXCIgJiYgTnVtYmVyKGl0ZW0ucG4pID09PSBOdW1iZXIoc2VhcmNoKSlcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICBpZiAoXG4gICAgICAgIHNlbGVjdCA9PT0gXCJEZXNjcmlwdGlvblwiICYmXG4gICAgICAgIGl0ZW0uZGVzYy50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaC50b0xvd2VyQ2FzZSgpKVxuICAgICAgKVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcbiAgICBzZXRJbmZvKHRlbXApO1xuICB9XG5cbiAgLy8gU29ydCBpdGVtcyBiYXNlZCBvbiBjb2x1bW5cbiAgZnVuY3Rpb24gc29ydENoZWNrQWxsKHBvcykge1xuICAgIGNvbnN0IHNvcnRlZEluZm8gPSBbLi4uaW5mb10uc29ydCgoYSwgYikgPT4ge1xuICAgICAgaWYgKHBvcyA9PT0gMCB8fCBwb3MgPT09IDUpIHtcbiAgICAgICAgcmV0dXJuIGJbc2VsZWN0XS5sb2NhbGVDb21wYXJlKGFbc2VsZWN0XSk7XG4gICAgICB9XG4gICAgICBpZiAocG9zID09PSAxKSB7XG4gICAgICAgIHJldHVybiBEYXRlLnBhcnNlKGJbc2VsZWN0XSkgLSBEYXRlLnBhcnNlKGFbc2VsZWN0XSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gTnVtYmVyKGJbc2VsZWN0XSkgLSBOdW1iZXIoYVtzZWxlY3RdKTtcbiAgICB9KTtcbiAgICBzZXRJbmZvKHNvcnRlZEluZm8pO1xuICB9XG5cbiAgLy8gUm93IHNlbGVjdGlvbiBoYW5kbGVyXG4gIGNvbnN0IHJvd1NlbGVjdCA9IChpdGVtKSA9PiB7XG4gICAgLy8gaXRlbS5pZCBtdXN0IGJlIHByZXNlbnQgaW4gZmV0Y2hQYXJ0c1dpdGhNYWNoaW5lRGF0YSgpIHJlc3VsdHNcbiAgICBzZXRTZWxlY3RlZFBhcmVudCh7IGlkOiBpdGVtLmlkLCBuYW1lOiBpdGVtLm5hbWUsIHBuOiBpdGVtLnBuIH0pO1xuICAgIGhhbmRsZUNsb3NlKCk7XG4gIH07XG5cbiAgLy8gRHJvcGRvd24gaGFuZGxlcnNcbiAgY29uc3QgW2Ryb3Bkb3duMVRleHQsIHNldERyb3Bkb3duMVRleHRdID0gdXNlU3RhdGUoXCJTZWxlY3QgT3B0aW9uXCIpO1xuICBjb25zdCBbZHJvcGRvd24yVGV4dCwgc2V0RHJvcGRvd24yVGV4dF0gPSB1c2VTdGF0ZShcIlNlbGVjdCBPcHRpb25cIik7XG5cbiAgY29uc3QgaGFuZGxlU2VsZWN0MSA9IChldmVudEtleSwgZXZlbnQpID0+IHtcbiAgICBpZiAoZXZlbnRLZXkgPT09IFwidW5hc3NpZ25lZFwiKSB7XG4gICAgICBzZXREcm9wZG93bjFUZXh0KFwiU2VsZWN0IE9wdGlvblwiKTtcbiAgICAgIHNldFNlbGVjdGVkT0VNKG51bGwpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZXREcm9wZG93bjFUZXh0KGV2ZW50LnRhcmdldC50ZXh0Q29udGVudCk7XG4gICAgICBzZXRTZWxlY3RlZE9FTShldmVudC50YXJnZXQudGV4dENvbnRlbnQpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVTZWxlY3QyID0gKGV2ZW50S2V5LCBldmVudCkgPT4ge1xuICAgIGlmIChldmVudEtleSA9PT0gXCJ1bmFzc2lnbmVkXCIpIHtcbiAgICAgIHNldERyb3Bkb3duMlRleHQoXCJTZWxlY3QgT3B0aW9uXCIpO1xuICAgICAgc2V0U2VsZWN0ZWRNb2RhbGl0eShudWxsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2V0RHJvcGRvd24yVGV4dChldmVudC50YXJnZXQudGV4dENvbnRlbnQpO1xuICAgICAgc2V0U2VsZWN0ZWRNb2RhbGl0eShldmVudC50YXJnZXQudGV4dENvbnRlbnQpO1xuICAgIH1cbiAgfTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHNlYXJjaEZpbHRlcigpO1xuICB9LCBbc2VsZWN0ZWRPRU0sIHNlbGVjdGVkTW9kYWxpdHksIHNlbGVjdGVkQ2xpZW50LCBzZWxlY3RlZE1vZGVsLCBzZWFyY2hdKTtcblxuICAvLyBGZXRjaCBjbGllbnRzIGFuZCBzaG93IG1vZGFsXG4gIGNvbnN0IGhhbmRsZUNsaWVudENsaWNrID0gYXN5bmMgKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKFwiY2xpY2tlZFwiKTtcbiAgICBjb25zdCBjbGllbnRzRGF0YSA9IGF3YWl0IGZldGNoQ2xpZW50cyhzZWxlY3RlZE9FTSwgc2VsZWN0ZWRNb2RhbGl0eSk7XG4gICAgc2V0Q2xpZW50cyhjbGllbnRzRGF0YSk7XG4gICAgc2V0Q2xpZW50U2VhcmNoVGVybShcIlwiKTsgLy8gUmVzZXQgc2VhcmNoIHRlcm1cbiAgICBzZXRTaG93Q2xpZW50TW9kYWwodHJ1ZSk7XG4gIH07XG5cbiAgLy8gQ2xpZW50IHNlbGVjdGlvbiBoYW5kbGVyXG4gIGNvbnN0IGhhbmRsZUNsaWVudFNlbGVjdCA9IChjbGllbnROYW1lKSA9PiB7XG4gICAgc2V0Q2xpZW50QnV0dG9uVGV4dChjbGllbnROYW1lIHx8IFwiU2VsZWN0IE9wdGlvblwiKTtcbiAgICBzZXRTZWxlY3RlZENsaWVudChjbGllbnROYW1lIHx8IG51bGwpO1xuICAgIHNldFNob3dDbGllbnRNb2RhbChmYWxzZSk7XG4gIH07XG5cbiAgLy8gQ2xpZW50IGluZm8gaGFuZGxlclxuICBjb25zdCBoYW5kbGVDbGllbnRJbmZvID0gKGNsaWVudElkLCBjbGllbnROYW1lKSA9PiB7XG4gICAgY29uc29sZS5sb2coYENsaWVudCBJRDogJHtjbGllbnRJZH0sIENsaWVudCBOYW1lOiAke2NsaWVudE5hbWV9YCk7XG4gIH07XG5cbiAgLy8gQ2xlYXIgY2xpZW50IHNlbGVjdGlvbiBoYW5kbGVyXG4gIGNvbnN0IGhhbmRsZUNsZWFyQ2xpZW50U2VsZWN0aW9uID0gKCkgPT4ge1xuICAgIHNldENsaWVudEJ1dHRvblRleHQoXCJTZWxlY3QgT3B0aW9uXCIpO1xuICAgIHNldFNlbGVjdGVkQ2xpZW50KG51bGwpO1xuICAgIHNldFNob3dDbGllbnRNb2RhbChmYWxzZSk7XG4gICAgc2VhcmNoRmlsdGVyKCk7XG4gIH07XG5cbiAgLy8gRmV0Y2ggbW9kZWxzIGFuZCBzaG93IG1vZGFsXG4gIGNvbnN0IGhhbmRsZU1vZGVsQ2xpY2sgPSBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgbW9kZWxzRGF0YSA9IGF3YWl0IGZldGNoTW9kZWxzKFxuICAgICAgc2VsZWN0ZWRPRU0sXG4gICAgICBzZWxlY3RlZE1vZGFsaXR5LFxuICAgICAgc2VsZWN0ZWRDbGllbnRcbiAgICApO1xuICAgIHNldE1vZGVscyhtb2RlbHNEYXRhKTtcbiAgICBzZXRNb2RlbFNlYXJjaFRlcm0oXCJcIik7IC8vIFJlc2V0IHNlYXJjaCB0ZXJtXG4gICAgc2V0U2hvd01vZGVsTW9kYWwodHJ1ZSk7XG4gIH07XG5cbiAgLy8gTW9kZWwgc2VsZWN0aW9uIGhhbmRsZXJcbiAgY29uc3QgaGFuZGxlTW9kZWxTZWxlY3QgPSAobW9kZWxOYW1lKSA9PiB7XG4gICAgc2V0TW9kZWxCdXR0b25UZXh0KG1vZGVsTmFtZSB8fCBcIlNlbGVjdCBPcHRpb25cIik7XG4gICAgc2V0U2VsZWN0ZWRNb2RlbChtb2RlbE5hbWUgfHwgbnVsbCk7XG4gICAgc2V0U2hvd01vZGVsTW9kYWwoZmFsc2UpO1xuICB9O1xuXG4gIC8vIENsZWFyIG1vZGVsIHNlbGVjdGlvbiBoYW5kbGVyXG4gIGNvbnN0IGhhbmRsZUNsZWFyTW9kZWxTZWxlY3Rpb24gPSAoKSA9PiB7XG4gICAgc2V0TW9kZWxCdXR0b25UZXh0KFwiU2VsZWN0IE9wdGlvblwiKTtcbiAgICBzZXRTZWxlY3RlZE1vZGVsKG51bGwpO1xuICAgIHNldFNob3dNb2RlbE1vZGFsKGZhbHNlKTtcbiAgICBzZWFyY2hGaWx0ZXIoKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVXYXJlaG91c2VDbGljayA9ICgpID0+IHtcbiAgICBzZXRDbGllbnRCdXR0b25UZXh0KENMSUVOVF9XQVJFSE9VU0UpO1xuICAgIHNldFNlbGVjdGVkQ2xpZW50KENMSUVOVF9XQVJFSE9VU0UpO1xuICAgIHNlYXJjaEZpbHRlcigpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVVuYXNzaWduZWRDbGljayA9ICgpID0+IHtcbiAgICBzZXRDbGllbnRCdXR0b25UZXh0KENMSUVOVF9VTkFTU0lHTkVEKTtcbiAgICBzZXRTZWxlY3RlZENsaWVudChDTElFTlRfVU5BU1NJR05FRCk7XG4gICAgc2VhcmNoRmlsdGVyKCk7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8TW9kYWwgc2hvdz17c2hvd30gb25IaWRlPXtoYW5kbGVDbG9zZX0gc2l6ZT1cImxnXCIgY2VudGVyZWQgc2Nyb2xsYWJsZSBkaWFsb2dDbGFzc05hbWU9XCJwYXJlbnQtbW9kYWwtZGlhbG9nXCIgPlxuICAgICAgPE1vZGFsLkhlYWRlciBjbG9zZUJ1dHRvbj5cbiAgICAgICAgPE1vZGFsLlRpdGxlPlNlbGVjdCBQYXJlbnQ8L01vZGFsLlRpdGxlPlxuICAgICAgPC9Nb2RhbC5IZWFkZXI+XG4gICAgICA8TW9kYWwuQm9keSBzdHlsZT17eyBtYXhIZWlnaHQ6IFwiNzV2aFwiLCBvdmVyZmxvd1k6IFwiYXV0b1wiIH19PlxuICAgICAgICA8Q29udGFpbmVyXG4gICAgICAgICAgY2xhc3NOYW1lPVwiZC1mbGV4IGFsaWduLWl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyXCJcbiAgICAgICAgICBzdHlsZT17eyBtaW5IZWlnaHQ6IFwidW5zZXRcIiB9fVxuICAgICAgICA+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LTEwMFwiIHN0eWxlPXt7IG1heFdpZHRoOiBcIjEyMDBweFwiIH19PlxuICAgICAgICAgICAgPENhcmQ+XG4gICAgICAgICAgICAgIDxDYXJkLkJvZHk+XG4gICAgICAgICAgICAgICAgPFJvdz5cbiAgICAgICAgICAgICAgICAgIDxDb2wgbWQ9ezR9PlxuICAgICAgICAgICAgICAgICAgICB7LyogRHJvcGRvd25zICovfVxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxJbnB1dEdyb3VwIGNsYXNzTmFtZT1cIm1iLTNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxJbnB1dEdyb3VwLlRleHQ+T0VNPC9JbnB1dEdyb3VwLlRleHQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8RHJvcGRvd24gb25TZWxlY3Q9e2hhbmRsZVNlbGVjdDF9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8RHJvcGRvd24uVG9nZ2xlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFudD1cIm91dGxpbmUtc2Vjb25kYXJ5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZD1cImRyb3Bkb3duLWJ1dHRvbi0xXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LTEwMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7ZHJvcGRvd24xVGV4dH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Ecm9wZG93bi5Ub2dnbGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxEcm9wZG93bi5NZW51IGNsYXNzTmFtZT1cInctMTAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPERyb3Bkb3duLkl0ZW0gZXZlbnRLZXk9XCJ1bmFzc2lnbmVkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBTZWxlY3QgT3B0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Ecm9wZG93bi5JdGVtPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxEcm9wZG93bi5JdGVtIGV2ZW50S2V5PVwiR0VcIj5HRTwvRHJvcGRvd24uSXRlbT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RHJvcGRvd24uSXRlbSBldmVudEtleT1cIlRvc2hpYmFcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRvc2hpYmFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0Ryb3Bkb3duLkl0ZW0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPERyb3Bkb3duLkl0ZW0gZXZlbnRLZXk9XCJTaWVtZW5zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBTaWVtZW5zXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Ecm9wZG93bi5JdGVtPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxEcm9wZG93bi5JdGVtIGV2ZW50S2V5PVwiUGhpbGlwc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUGhpbGlwc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRHJvcGRvd24uSXRlbT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Ecm9wZG93bi5NZW51PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9Ecm9wZG93bj5cbiAgICAgICAgICAgICAgICAgICAgICA8L0lucHV0R3JvdXA+XG5cbiAgICAgICAgICAgICAgICAgICAgICA8SW5wdXRHcm91cCBjbGFzc05hbWU9XCJtYi0zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8SW5wdXRHcm91cC5UZXh0Pk1vZGFsaXR5PC9JbnB1dEdyb3VwLlRleHQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8RHJvcGRvd24gb25TZWxlY3Q9e2hhbmRsZVNlbGVjdDJ9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8RHJvcGRvd24uVG9nZ2xlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFudD1cIm91dGxpbmUtc2Vjb25kYXJ5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZD1cImRyb3Bkb3duLWJ1dHRvbi0yXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LTEwMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7ZHJvcGRvd24yVGV4dH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Ecm9wZG93bi5Ub2dnbGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxEcm9wZG93bi5NZW51IGNsYXNzTmFtZT1cInctMTAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPERyb3Bkb3duLkl0ZW0gZXZlbnRLZXk9XCJ1bmFzc2lnbmVkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBTZWxlY3QgT3B0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Ecm9wZG93bi5JdGVtPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxEcm9wZG93bi5JdGVtIGV2ZW50S2V5PVwiQ1RcIj5DVDwvRHJvcGRvd24uSXRlbT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RHJvcGRvd24uSXRlbSBldmVudEtleT1cIk1SSVwiPk1SSTwvRHJvcGRvd24uSXRlbT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Ecm9wZG93bi5NZW51PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9Ecm9wZG93bj5cbiAgICAgICAgICAgICAgICAgICAgICA8L0lucHV0R3JvdXA+XG5cbiAgICAgICAgICAgICAgICAgICAgICB7LyogQnV0dG9ucyAqL31cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPElucHV0R3JvdXAgY2xhc3NOYW1lPVwibWItM1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8SW5wdXRHcm91cC5UZXh0PkNsaWVudDwvSW5wdXRHcm91cC5UZXh0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFudD1cIm91dGxpbmUtc2Vjb25kYXJ5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LTEwMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlQ2xpZW50Q2xpY2t9XG4gICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Y2xpZW50QnV0dG9uVGV4dH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L0lucHV0R3JvdXA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8SW5wdXRHcm91cCBjbGFzc05hbWU9XCJtYi0zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxJbnB1dEdyb3VwLlRleHQ+Q2xpZW50LTI8L0lucHV0R3JvdXAuVGV4dD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhbnQ9XCJvdXRsaW5lLXNlY29uZGFyeVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy0xMDBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBTZWxlY3QgT3B0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9JbnB1dEdyb3VwPlxuICAgICAgICAgICAgICAgICAgICAgICAgPElucHV0R3JvdXAgY2xhc3NOYW1lPVwibWItM1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8SW5wdXRHcm91cC5UZXh0Pk1vZGVsPC9JbnB1dEdyb3VwLlRleHQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXJpYW50PVwib3V0bGluZS1zZWNvbmRhcnlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctMTAwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVNb2RlbENsaWNrfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge21vZGVsQnV0dG9uVGV4dH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L0lucHV0R3JvdXA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7LyogRGl2aWRlciAqL31cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuZGl2aWRlcn0+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8SW5wdXRHcm91cCBjbGFzc05hbWU9XCJtYi0zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxJbnB1dEdyb3VwLlRleHQ+V2FyZWhvdXNlPC9JbnB1dEdyb3VwLlRleHQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuYnV0dG9uR3JvdXB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhbnQ9XCJvdXRsaW5lLXNlY29uZGFyeVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5mbGV4QnV0dG9ufVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlV2FyZWhvdXNlQ2xpY2t9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgV2FyZWhvdXNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFudD1cIm91dGxpbmUtc2Vjb25kYXJ5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17c3R5bGVzLmZsZXhCdXR0b259XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVVbmFzc2lnbmVkQ2xpY2t9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVW5hc3NpZ25lZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvSW5wdXRHcm91cD5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L0NvbD5cblxuICAgICAgICAgICAgICAgICAgPENvbCBtZD17OH0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMudGFibGVDb250YWluZXJ9PlxuICAgICAgICAgICAgICAgICAgICAgIDxUYWJsZSBzdHJpcGVkIGJvcmRlcmVkIGhvdmVyIHNpemU9XCJzbVwiIGNsYXNzTmFtZT1cIm1iLTBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0aGVhZCBjbGFzc05hbWU9e3N0eWxlcy5zdGlja3lIZWFkZXJ9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIG9uQ2xpY2s9eygpID0+IHNvcnRDaGVja0FsbCgwKX0+TmFtZTwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIG9uQ2xpY2s9eygpID0+IHNvcnRDaGVja0FsbCgxKX0+RGF0ZTwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIG9uQ2xpY2s9eygpID0+IHNvcnRDaGVja0FsbCgyKX0+V29yayBPcmRlcjwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIG9uQ2xpY2s9eygpID0+IHNvcnRDaGVja0FsbCgzKX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBQcm9kdWN0IE51bWJlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIG9uQ2xpY2s9eygpID0+IHNvcnRDaGVja0FsbCg0KX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBTZXJpYWwgTnVtYmVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+U2VsZWN0PC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtpbmZvLm1hcCgoaXRlbSkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ciBjbGFzc05hbWU9XCJjbGlja2FibGUtcm93XCIga2V5PXtpdGVtLmlkfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD57aXRlbS5uYW1lfTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+e2Zvcm1hdERhdGUoaXRlbS5kYXRlKX08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7aXRlbS53b3JrT3JkZXJzICYmIGl0ZW0ud29ya09yZGVycy5sZW5ndGggPiAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBpdGVtLndvcmtPcmRlcnNbaXRlbS53b3JrT3JkZXJzLmxlbmd0aCAtIDFdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC53b3JrT3JkZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwiTi9BXCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPntpdGVtLnBufTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+e2l0ZW0uc259PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhbnQ9XCJwcmltYXJ5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiByb3dTZWxlY3QoaXRlbSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBTZWxlY3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgICA8L1RhYmxlPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuc2VhcmNoQ29udGFpbmVyfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtIGNsYXNzTmFtZT1cImQtZmxleCBwYi0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9e3Nob3dMaXN0U2VhcmNofVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJtZS0yIGZsZXgtZ3Jvdy0xXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPVwiU2VhcmNoXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17c2VhcmNofVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtzZWFyY2hDaGFuZ2VIYW5kbGVyfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IGZsZXg6IFwiMVwiIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxOYXZEcm9wZG93blxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPXtzZWxlY3R9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ9XCJjb2xsYXNpYmxlLW5hdi1kcm9wZG93blwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvdz17c2hvd0xpc3R9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25Nb3VzZUVudGVyPXsoKSA9PiBzZXRTaG93TGlzdCh0cnVlKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbk1vdXNlTGVhdmU9eygpID0+IHNldFNob3dMaXN0KGZhbHNlKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyBtYXJnaW5Ub3A6IFwiLTVweFwiIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TmF2RHJvcGRvd24uSXRlbVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2VsZWN0KFwiTmFtZVwiKSAmIHNldFNob3dMaXN0U2VhcmNoKFwidGV4dFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE5hbWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L05hdkRyb3Bkb3duLkl0ZW0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPE5hdkRyb3Bkb3duLkl0ZW1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNlbGVjdChcIkRhdGVcIikgJiBzZXRTaG93TGlzdFNlYXJjaChcImRhdGVcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEYXRlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9OYXZEcm9wZG93bi5JdGVtPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxOYXZEcm9wZG93bi5JdGVtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTZWxlY3QoXCJXb3JrIE9yZGVyXCIpICZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2hvd0xpc3RTZWFyY2goXCJudW1iZXJcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBXb3JrIE9yZGVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9OYXZEcm9wZG93bi5JdGVtPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxOYXZEcm9wZG93bi5JdGVtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTZWxlY3QoXCJQcm9kdWN0IE51bWJlclwiKSAmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNob3dMaXN0U2VhcmNoKFwibnVtYmVyXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUHJvZHVjdCBOdW1iZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L05hdkRyb3Bkb3duLkl0ZW0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPE5hdkRyb3Bkb3duLkl0ZW1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNlbGVjdChcIkRlc2NyaXB0aW9uXCIpICZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2hvd0xpc3RTZWFyY2goXCJ0ZXh0XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRGVzY3JpcHRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L05hdkRyb3Bkb3duLkl0ZW0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvTmF2RHJvcGRvd24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHsvKiA8QnV0dG9uIHZhcmlhbnQ9XCJpbmZvXCIgb25DbGljaz17c2VhcmNoRmlsdGVyfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBTZWFyY2hcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+ICovfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9Gb3JtPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvQ29sPlxuICAgICAgICAgICAgICAgIDwvUm93PlxuICAgICAgICAgICAgICA8L0NhcmQuQm9keT5cbiAgICAgICAgICAgIDwvQ2FyZD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9Db250YWluZXI+XG4gICAgICA8L01vZGFsLkJvZHk+XG4gICAgICA8TW9kYWwuRm9vdGVyPlxuICAgICAgICA8QnV0dG9uIHZhcmlhbnQ9XCJzZWNvbmRhcnlcIiBvbkNsaWNrPXtoYW5kbGVDbG9zZX0+XG4gICAgICAgICAgQ2FuY2VsXG4gICAgICAgIDwvQnV0dG9uPlxuICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgdmFyaWFudD1cIndhcm5pbmdcIlxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgIHNldFNlbGVjdGVkUGFyZW50KG51bGwpO1xuICAgICAgICAgICAgaGFuZGxlQ2xvc2UoKTtcbiAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAgQ2xlYXIgU2VsZWN0aW9uXG4gICAgICAgIDwvQnV0dG9uPlxuICAgICAgPC9Nb2RhbC5Gb290ZXI+XG4gICAgICA8TW9kYWwgc2hvdz17c2hvd0NsaWVudE1vZGFsfSBvbkhpZGU9e2hhbmRsZUNsb3NlQ2xpZW50TW9kYWx9PlxuICAgICAgICA8TW9kYWwuSGVhZGVyIGNsb3NlQnV0dG9uPlxuICAgICAgICAgIDxNb2RhbC5UaXRsZT5TZWxlY3QgQ2xpZW50PC9Nb2RhbC5UaXRsZT5cbiAgICAgICAgPC9Nb2RhbC5IZWFkZXI+XG4gICAgICAgIDxNb2RhbC5Cb2R5PlxuICAgICAgICAgIDxGb3JtQ29udHJvbFxuICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJTZWFyY2ggYnkgbmFtZVwiXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJtYi0zXCJcbiAgICAgICAgICAgIHZhbHVlPXtjbGllbnRTZWFyY2hUZXJtfVxuICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRDbGllbnRTZWFyY2hUZXJtKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxDbGllbnRUYWJsZVxuICAgICAgICAgICAgY2xpZW50cz17Y2xpZW50cy5maWx0ZXIoKGNsaWVudCkgPT5cbiAgICAgICAgICAgICAgY2xpZW50Lm5hbWUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhjbGllbnRTZWFyY2hUZXJtLnRvTG93ZXJDYXNlKCkpXG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgZGlzYWJsZUluZm89e3RydWV9XG4gICAgICAgICAgICBvblNlbGVjdENsaWVudD17aGFuZGxlQ2xpZW50U2VsZWN0fVxuICAgICAgICAgICAgb25JbmZvQ2xpY2s9e2hhbmRsZUNsaWVudEluZm99XG4gICAgICAgICAgICBjbGVhclNlbGVjdGlvbj17KCkgPT4gaGFuZGxlQ2xpZW50U2VsZWN0KG51bGwpfSAvLyBDbGVhciBzZWxlY3Rpb24gaGFuZGxlclxuICAgICAgICAgIC8+XG4gICAgICAgIDwvTW9kYWwuQm9keT5cbiAgICAgIDwvTW9kYWw+XG5cbiAgICAgIDxNb2RhbCBzaG93PXtzaG93TW9kZWxNb2RhbH0gb25IaWRlPXtoYW5kbGVDbG9zZU1vZGVsTW9kYWx9PlxuICAgICAgICA8TW9kYWwuSGVhZGVyIGNsb3NlQnV0dG9uPlxuICAgICAgICAgIDxNb2RhbC5UaXRsZT5TZWxlY3QgTW9kZWw8L01vZGFsLlRpdGxlPlxuICAgICAgICA8L01vZGFsLkhlYWRlcj5cbiAgICAgICAgPE1vZGFsLkJvZHk+XG4gICAgICAgICAgPEZvcm1Db250cm9sXG4gICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlNlYXJjaCBieSBuYW1lXCJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1iLTNcIlxuICAgICAgICAgICAgdmFsdWU9e21vZGVsU2VhcmNoVGVybX1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0TW9kZWxTZWFyY2hUZXJtKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxNb2RlbFRhYmxlXG4gICAgICAgICAgICBtb2RlbHM9e21vZGVscy5maWx0ZXIoKG1vZGVsKSA9PlxuICAgICAgICAgICAgICB0eXBlb2YgbW9kZWwgPT09IFwic3RyaW5nXCJcbiAgICAgICAgICAgICAgICA/IG1vZGVsLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMobW9kZWxTZWFyY2hUZXJtLnRvTG93ZXJDYXNlKCkpXG4gICAgICAgICAgICAgICAgOiBmYWxzZVxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIG9uU2VsZWN0TW9kZWw9e2hhbmRsZU1vZGVsU2VsZWN0fVxuICAgICAgICAgICAgY2xlYXJTZWxlY3Rpb249eygpID0+IGhhbmRsZU1vZGVsU2VsZWN0KG51bGwpfSAvLyBDbGVhciBzZWxlY3Rpb24gaGFuZGxlclxuICAgICAgICAgIC8+XG4gICAgICAgIDwvTW9kYWwuQm9keT5cbiAgICAgIDwvTW9kYWw+XG4gICAgPC9Nb2RhbD5cbiAgKTtcbn07XG48c3R5bGUganN4IGdsb2JhbD57YFxuICAvKiBDb25zdHJhaW4gdGhlIG1vZGFsIGRpYWxvZyB3aWR0aCB0byB2aWV3cG9ydCAqL1xuICAucGFyZW50LW1vZGFsLWRpYWxvZyB7XG4gICAgbWF4LXdpZHRoOiA5NXZ3O1xuICAgIG1hcmdpbjogMCBhdXRvO1xuICB9XG4gIC8qIElmIHRoZSB0YWJsZSBjb250YWluZXIgaGFzIGEgZml4ZWQgaGVpZ2h0IGFscmVhZHksIGtlZXAgaXTigJRidXQgZW5zdXJlIGl0IG5ldmVyIGV4Y2VlZHMgYm9keSAqL1xuICAucGFyZW50LW1vZGFsLWRpYWxvZyAubW9kYWwtYm9keSAuJHtzdHlsZXMudGFibGVDb250YWluZXJ9IHtcbiAgICBtYXgtaGVpZ2h0OiA3MHZoO1xuICAgIG92ZXJmbG93OiBhdXRvO1xuICB9XG5gfTwvc3R5bGU+XG5leHBvcnQgZGVmYXVsdCBQYXJlbnRNb2RhbDtcbiIsIi8vIENsaWVudEluZm9Nb2RhbC5qc1xuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgTW9kYWwsIEJ1dHRvbiwgVGFibGUgfSBmcm9tIFwicmVhY3QtYm9vdHN0cmFwXCI7XG5cbmNvbnN0IENsaWVudEluZm9Nb2RhbCA9ICh7XG4gIHNob3csXG4gIGhhbmRsZUNsb3NlLFxuICBzZWxlY3RlZENsaWVudCxcbiAgbWFjaGluZU9wdGlvbnMgPSBbXSxcbiAgc2V0U2VsZWN0ZWRNYWNoaW5lLFxufSkgPT4ge1xuICAvLyBBZGQgd2FyZWhvdXNlIG9wdGlvbnMgaGVyZVxuICAvLyBjb25zdCB3YXJlaG91c2VPcHRpb25zID0gW1xuICAvLyAgIHsgaWQ6IFwid2FyZWhvdXNlLXNvY2FsXCIsIG5hbWU6IFwiU29DYWxXYXJlaG91c2VcIiwgbG9jYWw6IFwiXCIgfSxcbiAgLy8gICB7IGlkOiBcIndhcmVob3VzZS1ub3JjYWxcIiwgbmFtZTogXCJOb3JDYWxXYXJlaG91c2VcIiwgbG9jYWw6IFwiXCIgfSxcbiAgLy8gXTtcblxuICByZXR1cm4gKFxuICAgIDxNb2RhbCBzaG93PXtzaG93fSBvbkhpZGU9e2hhbmRsZUNsb3NlfT5cbiAgICAgIDxNb2RhbC5IZWFkZXIgY2xvc2VCdXR0b24+XG4gICAgICAgIDxNb2RhbC5UaXRsZT5TZWxlY3QgYSBNYWNoaW5lIG9yIFdhcmVob3VzZTwvTW9kYWwuVGl0bGU+XG4gICAgICA8L01vZGFsLkhlYWRlcj5cbiAgICAgIDxNb2RhbC5Cb2R5PlxuICAgICAgICA8VGFibGUgc3RyaXBlZCBib3JkZXJlZCBob3ZlciBzaXplPVwic21cIj5cbiAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgIDx0aD5OYW1lPC90aD5cbiAgICAgICAgICAgICAgPHRoPkxvY2F0aW9uPC90aD5cbiAgICAgICAgICAgICAgPHRoPlNlbGVjdDwvdGg+XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAge21hY2hpbmVPcHRpb25zLm1hcCgobWFjaGluZSkgPT4gKFxuICAgICAgICAgICAgICA8dHIga2V5PXttYWNoaW5lLmlkfT5cbiAgICAgICAgICAgICAgICA8dGQ+e21hY2hpbmUubmFtZX08L3RkPlxuICAgICAgICAgICAgICAgIDx0ZD57bWFjaGluZS5sb2NhbH08L3RkPlxuICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgdmFyaWFudD1cInByaW1hcnlcIlxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTZWxlY3RlZE1hY2hpbmUobWFjaGluZSl9XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIFNlbGVjdFxuICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgey8qIHt3YXJlaG91c2VPcHRpb25zLm1hcCgod2FyZWhvdXNlKSA9PiAoXG4gICAgICAgICAgICAgIDx0ciBrZXk9e3dhcmVob3VzZS5pZH0+XG4gICAgICAgICAgICAgICAgPHRkPnt3YXJlaG91c2UubmFtZX08L3RkPlxuICAgICAgICAgICAgICAgIDx0ZD57XCJXYXJlaG91c2VcIn08L3RkPlxuICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgdmFyaWFudD1cInByaW1hcnlcIlxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTZWxlY3RlZE1hY2hpbmUod2FyZWhvdXNlKX1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgU2VsZWN0XG4gICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgKSl9ICovfVxuICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgIDwvVGFibGU+XG4gICAgICA8L01vZGFsLkJvZHk+XG4gICAgICA8TW9kYWwuRm9vdGVyPlxuICAgICAgICA8QnV0dG9uIHZhcmlhbnQ9XCJzZWNvbmRhcnlcIiBvbkNsaWNrPXtoYW5kbGVDbG9zZX0+XG4gICAgICAgICAgQ2xvc2VcbiAgICAgICAgPC9CdXR0b24+XG4gICAgICA8L01vZGFsLkZvb3Rlcj5cbiAgICA8L01vZGFsPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQ2xpZW50SW5mb01vZGFsO1xuIiwiLy8gSW5mb01vZGFsLmpzXG5pbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBNb2RhbCwgQnV0dG9uIH0gZnJvbSBcInJlYWN0LWJvb3RzdHJhcFwiO1xuXG5jb25zdCBJbmZvTW9kYWwgPSAoeyBzaG93LCBoYW5kbGVDbG9zZSwgaXRlbU5hbWUsIGRpbWVuc2lvbnMsIHByaWNlLCBmcmVxSSwgZnJlcU0sIHVzYWdlIH0pID0+IHtcbiAgcmV0dXJuIChcbiAgICA8TW9kYWwgc2hvdz17c2hvd30gb25IaWRlPXtoYW5kbGVDbG9zZX0+XG4gICAgICA8TW9kYWwuSGVhZGVyIGNsb3NlQnV0dG9uPlxuICAgICAgICA8TW9kYWwuVGl0bGU+SXRlbSBJbmZvPC9Nb2RhbC5UaXRsZT5cbiAgICAgIDwvTW9kYWwuSGVhZGVyPlxuICAgICAgPE1vZGFsLkJvZHk+XG4gICAgICAgIDxwPjxzdHJvbmc+TmFtZTo8L3N0cm9uZz4ge2l0ZW1OYW1lfSA8L3A+XG4gICAgICAgIDxwPjxzdHJvbmc+RGltZW5zaW9uczo8L3N0cm9uZz4ge2RpbWVuc2lvbnN9PC9wPlxuICAgICAgICA8cD48c3Ryb25nPlByaWNlOjwvc3Ryb25nPiB7cHJpY2V9PC9wPlxuICAgICAgICA8cD48c3Ryb25nPkZyZXF1ZW5jeSBvZiBpdGVtOjwvc3Ryb25nPiB7ZnJlcUl9IDwvcD5cbiAgICAgICAgPHA+PHN0cm9uZz5GcmVxdWVuY3kgb2YgTWFjaGluZTo8L3N0cm9uZz4ge2ZyZXFNfSA8L3A+XG4gICAgICAgIDxwPjxzdHJvbmc+VXNhZ2UgcGFzdCAxIHllYXI6PC9zdHJvbmc+IHt1c2FnZX0gPC9wPlxuICAgICAgPC9Nb2RhbC5Cb2R5PlxuICAgICAgPE1vZGFsLkZvb3Rlcj5cbiAgICAgICAgPEJ1dHRvbiB2YXJpYW50PVwic2Vjb25kYXJ5XCIgb25DbGljaz17aGFuZGxlQ2xvc2V9PlxuICAgICAgICAgIENsb3NlXG4gICAgICAgIDwvQnV0dG9uPlxuICAgICAgPC9Nb2RhbC5Gb290ZXI+XG4gICAgPC9Nb2RhbD5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEluZm9Nb2RhbDtcbiIsImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBNb2RhbCwgQnV0dG9uLCBEcm9wZG93biwgRm9ybUNvbnRyb2wsIFNwaW5uZXIgfSBmcm9tIFwicmVhY3QtYm9vdHN0cmFwXCI7XG5pbXBvcnQgeyBmZXRjaE1vZGVscyB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9mZXRjaEFzc29jaWF0aW9uc1wiOyAvLyBBc3N1bWluZyB5b3UgYWxyZWFkeSBoYXZlIHRoaXNcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTWFjaGluZVNlbGVjdGlvbk1vZGFsKHsgc2hvdywgaGFuZGxlQ2xvc2UsIHNldE1hY2hpbmUgfSkge1xuICBjb25zdCBbTW9kYWxpdHksIHNldE1vZGFsaXR5XSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbT0VNLCBzZXRPRU1dID0gdXNlU3RhdGUobnVsbCk7XG4gIGNvbnN0IFttb2RlbHMsIHNldE1vZGVsc10gPSB1c2VTdGF0ZShbXSk7XG4gIGNvbnN0IFtzZWxlY3RlZE1vZGVsLCBzZXRTZWxlY3RlZE1vZGVsXSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbbG9hZGluZ01vZGVscywgc2V0TG9hZGluZ01vZGVsc10gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgLy8gRmV0Y2ggbW9kZWxzIHdoZW4gTW9kYWxpdHkgYW5kIE9FTSBhcmUgc2VsZWN0ZWRcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoTW9kYWxpdHkgJiYgT0VNKSB7XG4gICAgICBzZXRMb2FkaW5nTW9kZWxzKHRydWUpO1xuICAgICAgZmV0Y2hNb2RlbHMoT0VNLCBNb2RhbGl0eSlcbiAgICAgICAgLnRoZW4oKGZldGNoZWRNb2RlbHMpID0+IHtcbiAgICAgICAgICBzZXRNb2RlbHMoZmV0Y2hlZE1vZGVscyk7XG4gICAgICAgICAgc2V0TG9hZGluZ01vZGVscyhmYWxzZSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZmV0Y2hpbmcgbW9kZWxzOiBcIiwgZXJyb3IpO1xuICAgICAgICAgIHNldExvYWRpbmdNb2RlbHMoZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICB9XG4gIH0sIFtNb2RhbGl0eSwgT0VNXSk7XG5cbiAgY29uc3QgaGFuZGxlTW9kYWxpdHlTZWxlY3QgPSAoc2VsZWN0ZWRNb2RhbGl0eSkgPT4ge1xuICAgIHNldE1vZGFsaXR5KHNlbGVjdGVkTW9kYWxpdHkpO1xuICAgIHNldE9FTShudWxsKTsgLy8gUmVzZXQgT0VNIGFuZCBNb2RlbCB3aGVuIE1vZGFsaXR5IGNoYW5nZXNcbiAgICBzZXRTZWxlY3RlZE1vZGVsKG51bGwpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZU9FTVNlbGVjdCA9IChzZWxlY3RlZE9FTSkgPT4ge1xuICAgIHNldE9FTShzZWxlY3RlZE9FTSk7XG4gICAgc2V0U2VsZWN0ZWRNb2RlbChudWxsKTsgLy8gUmVzZXQgTW9kZWwgd2hlbiBPRU0gY2hhbmdlc1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZU1vZGVsU2VsZWN0ID0gKG1vZGVsKSA9PiB7XG4gICAgc2V0U2VsZWN0ZWRNb2RlbChtb2RlbCk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlU2F2ZVNlbGVjdGlvbiA9ICgpID0+IHtcbiAgICBpZiAoc2VsZWN0ZWRNb2RlbCkge1xuICAgICAgLy8gUGFzcyBzZWxlY3RlZCBtYWNoaW5lIGRhdGEgYmFjayB0byB0aGUgcGFyZW50XG4gICAgICBzZXRNYWNoaW5lKHsgTW9kYWxpdHksIE9FTSwgTW9kZWw6IHNlbGVjdGVkTW9kZWwgfSk7XG4gICAgICBoYW5kbGVDbG9zZSgpOyAvLyBDbG9zZSB0aGUgbW9kYWxcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8TW9kYWwgc2hvdz17c2hvd30gb25IaWRlPXtoYW5kbGVDbG9zZX0+XG4gICAgICA8TW9kYWwuSGVhZGVyIGNsb3NlQnV0dG9uPlxuICAgICAgICA8TW9kYWwuVGl0bGU+U2VsZWN0IE1hY2hpbmU8L01vZGFsLlRpdGxlPlxuICAgICAgPC9Nb2RhbC5IZWFkZXI+XG4gICAgICA8TW9kYWwuQm9keT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYi0zXCI+XG4gICAgICAgICAgPERyb3Bkb3duIG9uU2VsZWN0PXtoYW5kbGVNb2RhbGl0eVNlbGVjdH0+XG4gICAgICAgICAgICA8RHJvcGRvd24uVG9nZ2xlIHZhcmlhbnQ9XCJvdXRsaW5lLXNlY29uZGFyeVwiIGNsYXNzTmFtZT1cInctMTAwXCI+XG4gICAgICAgICAgICAgIHtNb2RhbGl0eSB8fCBcIlNlbGVjdCBNb2RhbGl0eVwifVxuICAgICAgICAgICAgPC9Ecm9wZG93bi5Ub2dnbGU+XG4gICAgICAgICAgICA8RHJvcGRvd24uTWVudT5cbiAgICAgICAgICAgICAgPERyb3Bkb3duLkl0ZW0gZXZlbnRLZXk9XCJDVFwiPkNUPC9Ecm9wZG93bi5JdGVtPlxuICAgICAgICAgICAgICA8RHJvcGRvd24uSXRlbSBldmVudEtleT1cIk1SSVwiPk1SSTwvRHJvcGRvd24uSXRlbT5cbiAgICAgICAgICAgIDwvRHJvcGRvd24uTWVudT5cbiAgICAgICAgICA8L0Ryb3Bkb3duPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7TW9kYWxpdHkgJiYgKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWItM1wiPlxuICAgICAgICAgICAgPERyb3Bkb3duIG9uU2VsZWN0PXtoYW5kbGVPRU1TZWxlY3R9PlxuICAgICAgICAgICAgICA8RHJvcGRvd24uVG9nZ2xlIHZhcmlhbnQ9XCJvdXRsaW5lLXNlY29uZGFyeVwiIGNsYXNzTmFtZT1cInctMTAwXCI+XG4gICAgICAgICAgICAgICAge09FTSB8fCBcIlNlbGVjdCBPRU1cIn1cbiAgICAgICAgICAgICAgPC9Ecm9wZG93bi5Ub2dnbGU+XG4gICAgICAgICAgICAgIDxEcm9wZG93bi5NZW51PlxuICAgICAgICAgICAgICAgIDxEcm9wZG93bi5JdGVtIGV2ZW50S2V5PVwiR0VcIj5HRTwvRHJvcGRvd24uSXRlbT5cbiAgICAgICAgICAgICAgICA8RHJvcGRvd24uSXRlbSBldmVudEtleT1cIlBoaWxpcHNcIj5QaGlsaXBzPC9Ecm9wZG93bi5JdGVtPlxuICAgICAgICAgICAgICAgIDxEcm9wZG93bi5JdGVtIGV2ZW50S2V5PVwiU2llbWVuc1wiPlNpZW1lbnM8L0Ryb3Bkb3duLkl0ZW0+XG4gICAgICAgICAgICAgICAgPERyb3Bkb3duLkl0ZW0gZXZlbnRLZXk9XCJUb3NoaWJhXCI+VG9zaGliYTwvRHJvcGRvd24uSXRlbT5cbiAgICAgICAgICAgICAgPC9Ecm9wZG93bi5NZW51PlxuICAgICAgICAgICAgPC9Ecm9wZG93bj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cblxuICAgICAgICB7TW9kYWxpdHkgJiYgT0VNICYmIChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1iLTNcIj5cbiAgICAgICAgICAgIDxGb3JtQ29udHJvbFxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlNlYXJjaCBtb2RlbHNcIlxuICAgICAgICAgICAgICBhcmlhLWxhYmVsPVwiU2VhcmNoIG1vZGVsc1wiXG4gICAgICAgICAgICAgIGFyaWEtZGVzY3JpYmVkYnk9XCJiYXNpYy1hZGRvbjJcIlxuICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFNlbGVjdGVkTW9kZWwoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIHtsb2FkaW5nTW9kZWxzID8gKFxuICAgICAgICAgICAgICA8U3Bpbm5lciBhbmltYXRpb249XCJib3JkZXJcIiAvPlxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgbW9kZWxzLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgICAgIDxEcm9wZG93biBvblNlbGVjdD17aGFuZGxlTW9kZWxTZWxlY3R9PlxuICAgICAgICAgICAgICAgICAgPERyb3Bkb3duLlRvZ2dsZSB2YXJpYW50PVwib3V0bGluZS1zZWNvbmRhcnlcIiBjbGFzc05hbWU9XCJ3LTEwMFwiPlxuICAgICAgICAgICAgICAgICAgICB7c2VsZWN0ZWRNb2RlbCB8fCBcIlNlbGVjdCBNb2RlbFwifVxuICAgICAgICAgICAgICAgICAgPC9Ecm9wZG93bi5Ub2dnbGU+XG4gICAgICAgICAgICAgICAgICA8RHJvcGRvd24uTWVudT5cbiAgICAgICAgICAgICAgICAgICAge21vZGVscy5tYXAoKG1vZGVsKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgPERyb3Bkb3duLkl0ZW0ga2V5PXttb2RlbH0gZXZlbnRLZXk9e21vZGVsfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHttb2RlbH1cbiAgICAgICAgICAgICAgICAgICAgICA8L0Ryb3Bkb3duLkl0ZW0+XG4gICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgPC9Ecm9wZG93bi5NZW51PlxuICAgICAgICAgICAgICAgIDwvRHJvcGRvd24+XG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9XG4gICAgICA8L01vZGFsLkJvZHk+XG4gICAgICA8TW9kYWwuRm9vdGVyPlxuICAgICAgICA8QnV0dG9uIHZhcmlhbnQ9XCJzZWNvbmRhcnlcIiBvbkNsaWNrPXtoYW5kbGVDbG9zZX0+XG4gICAgICAgICAgQ2xvc2VcbiAgICAgICAgPC9CdXR0b24+XG4gICAgICAgIDxCdXR0b25cbiAgICAgICAgICB2YXJpYW50PVwicHJpbWFyeVwiXG4gICAgICAgICAgb25DbGljaz17aGFuZGxlU2F2ZVNlbGVjdGlvbn1cbiAgICAgICAgICBkaXNhYmxlZD17IXNlbGVjdGVkTW9kZWx9XG4gICAgICAgID5cbiAgICAgICAgICBTYXZlIFNlbGVjdGlvblxuICAgICAgICA8L0J1dHRvbj5cbiAgICAgIDwvTW9kYWwuRm9vdGVyPlxuICAgIDwvTW9kYWw+XG4gICk7XG59XG4iLCIvLyBFeHBvcnRzXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0XCJjbGllbnRUYWJsZUNvbnRhaW5lclwiOiBcIkNsaWVudFRhYmxlX2NsaWVudFRhYmxlQ29udGFpbmVyX18xZTl1blwiLFxuXHRcImNsaWVudFRhYmxlXCI6IFwiQ2xpZW50VGFibGVfY2xpZW50VGFibGVfXzE5NHY3XCIsXG5cdFwiYnV0dG9uR3JvdXBcIjogXCJDbGllbnRUYWJsZV9idXR0b25Hcm91cF9fcFNaN3lcIixcblx0XCJmbGV4QnV0dG9uXCI6IFwiQ2xpZW50VGFibGVfZmxleEJ1dHRvbl9fTG9OaVNcIlxufTtcbiIsIi8vIEV4cG9ydHNcbm1vZHVsZS5leHBvcnRzID0ge1xuXHRcImxvYWRpbmctb3ZlcmxheVwiOiBcIk1haW5TZWFyY2hfbG9hZGluZy1vdmVybGF5X18xMjYwNVwiLFxuXHRcInNwaW5uZXItY2VudGVyXCI6IFwiTWFpblNlYXJjaF9zcGlubmVyLWNlbnRlcl9fM2V2dUNcIixcblx0XCJkaXZpZGVyXCI6IFwiTWFpblNlYXJjaF9kaXZpZGVyX18zclNTVVwiLFxuXHRcInRhYmxlQ29udGFpbmVyXCI6IFwiTWFpblNlYXJjaF90YWJsZUNvbnRhaW5lcl9fTEQxOFBcIixcblx0XCJzY3JvbGxhYmxlVGFibGVcIjogXCJNYWluU2VhcmNoX3Njcm9sbGFibGVUYWJsZV9fRXREZWRcIixcblx0XCJzdGlja3lIZWFkZXJcIjogXCJNYWluU2VhcmNoX3N0aWNreUhlYWRlcl9fM1VtZ0lcIixcblx0XCJzZWFyY2hDb250YWluZXJcIjogXCJNYWluU2VhcmNoX3NlYXJjaENvbnRhaW5lcl9fMXhKbnVcIixcblx0XCJidXR0b25Hcm91cFwiOiBcIk1haW5TZWFyY2hfYnV0dG9uR3JvdXBfXzFHV0k2XCIsXG5cdFwiZmxleEJ1dHRvblwiOiBcIk1haW5TZWFyY2hfZmxleEJ1dHRvbl9fM3pucURcIlxufTtcbiIsIi8vIEV4cG9ydHNcbm1vZHVsZS5leHBvcnRzID0ge1xuXHRcInRhYmxlQ29udGFpbmVyXCI6IFwiUGFydFRhYmxlX3RhYmxlQ29udGFpbmVyX18xOFRDZ1wiLFxuXHRcInNjcm9sbGFibGVUYWJsZVwiOiBcIlBhcnRUYWJsZV9zY3JvbGxhYmxlVGFibGVfXzJUeWJXXCIsXG5cdFwic3RpY2t5SGVhZGVyXCI6IFwiUGFydFRhYmxlX3N0aWNreUhlYWRlcl9fMUhKSzFcIixcblx0XCJzZWFyY2hDb250YWluZXJcIjogXCJQYXJ0VGFibGVfc2VhcmNoQ29udGFpbmVyX18ycjdha1wiLFxuXHRcImRpdmlkZXJcIjogXCJQYXJ0VGFibGVfZGl2aWRlcl9fMVF4Q3FcIixcblx0XCJidXR0b25Hcm91cFwiOiBcIlBhcnRUYWJsZV9idXR0b25Hcm91cF9fM1pmT09cIixcblx0XCJmbGV4QnV0dG9uXCI6IFwiUGFydFRhYmxlX2ZsZXhCdXR0b25fXzJwbzJlXCIsXG5cdFwiZml4ZWRUYWJsZVwiOiBcIlBhcnRUYWJsZV9maXhlZFRhYmxlX18zaEpDY1wiLFxuXHRcImNlbGxDbGFtcFwiOiBcIlBhcnRUYWJsZV9jZWxsQ2xhbXBfXzNpdFhNXCIsXG5cdFwiYWN0aW9uQ29sXCI6IFwiUGFydFRhYmxlX2FjdGlvbkNvbF9fMnhmUGJcIlxufTtcbiIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IFRhYmxlLCBCdXR0b24gfSBmcm9tIFwicmVhY3QtYm9vdHN0cmFwXCI7XG5pbXBvcnQgc3R5bGVzIGZyb20gXCIuLi9zdHlsZXMvQ2xpZW50VGFibGUubW9kdWxlLmNzc1wiO1xuXG5jb25zdCBDbGllbnRUYWJsZSA9ICh7XG4gIGNsaWVudHMsXG4gIG9uU2VsZWN0Q2xpZW50LFxuICBvbkluZm9DbGljayxcbiAgY2xlYXJTZWxlY3Rpb24sXG4gIG9uQWRkQ2xpZW50LCAvLyBuZXcgcHJvcCBmb3IgYWRkLW5ldy1jbGllbnQgYWN0aW9uXG4gIGRpc2FibGVTZWxlY3QsXG4gIGRpc2FibGVJbmZvLFxuICBpc0NsaWVudFNlYXJjaCxcbn0pID0+IHtcbiAgcmV0dXJuIChcbiAgICA8VGFibGUgc3RyaXBlZCBib3JkZXJlZCBob3ZlciBzaXplPVwic21cIiBjbGFzc05hbWU9e3N0eWxlcy5jbGllbnRUYWJsZX0+XG4gICAgICA8dGhlYWQ+XG4gICAgICAgIDx0cj5cbiAgICAgICAgICA8dGg+Q2xpZW50IE5hbWU8L3RoPlxuICAgICAgICAgIHshZGlzYWJsZUluZm8gJiYgPHRoPkluZm88L3RoPn1cbiAgICAgICAgICB7IWRpc2FibGVTZWxlY3QgJiYgPHRoPlNlbGVjdDwvdGg+fVxuICAgICAgICA8L3RyPlxuICAgICAgPC90aGVhZD5cbiAgICAgIDx0Ym9keT5cbiAgICAgICAgPHRyPlxuICAgICAgICAgIDx0ZCBjb2xTcGFuPVwiM1wiIHN0eWxlPXt7IHRleHRBbGlnbjogXCJjZW50ZXJcIiB9fT5cbiAgICAgICAgICAgIDxCdXR0b24gdmFyaWFudD1cInNlY29uZGFyeVwiIG9uQ2xpY2s9e2NsZWFyU2VsZWN0aW9ufT5cbiAgICAgICAgICAgICAgQ2xlYXIgU2VsZWN0aW9uXG4gICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgIHsvKiBOZXcgQWRkIE5ldyBDbGllbnQgYnV0dG9uICovfVxuICAgICAgICAgICAgPEJ1dHRvbiB2YXJpYW50PVwicHJpbWFyeVwiIG9uQ2xpY2s9e29uQWRkQ2xpZW50fSBjbGFzc05hbWU9XCJtcy0yXCI+XG4gICAgICAgICAgICAgIEFkZCBOZXcgQ2xpZW50XG4gICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICA8L3RkPlxuICAgICAgICA8L3RyPlxuICAgICAgICB7Y2xpZW50cy5tYXAoKGNsaWVudCkgPT4gKFxuICAgICAgICAgIDx0ciBrZXk9e2NsaWVudC5pZH0+XG4gICAgICAgICAgICA8dGQ+e2NsaWVudC5uYW1lfTwvdGQ+XG4gICAgICAgICAgICB7IWRpc2FibGVJbmZvICYmIChcbiAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgICAgIHZhcmlhbnQ9XCJpbmZvXCJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG9uSW5mb0NsaWNrKGNsaWVudC5pZCwgY2xpZW50Lm5hbWUpfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIHtpc0NsaWVudFNlYXJjaCA/IFwiRWRpdFwiIDogXCJJbmZvXCJ9XG4gICAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgeyFkaXNhYmxlU2VsZWN0ICYmIChcbiAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgICAgIHZhcmlhbnQ9XCJwcmltYXJ5XCJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG9uU2VsZWN0Q2xpZW50KGNsaWVudC5pZCl9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgU2VsZWN0XG4gICAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvdHI+XG4gICAgICAgICkpfVxuICAgICAgPC90Ym9keT5cbiAgICA8L1RhYmxlPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQ2xpZW50VGFibGU7XG4iLCIvLyBjb21wb25lbnRzL01vZGVsVGFibGUuanNcbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IFRhYmxlLCBCdXR0b24sIEZvcm1Db250cm9sIH0gZnJvbSBcInJlYWN0LWJvb3RzdHJhcFwiO1xuaW1wb3J0IHN0eWxlcyBmcm9tIFwiLi4vc3R5bGVzL0NsaWVudFRhYmxlLm1vZHVsZS5jc3NcIjtcblxuY29uc3QgTW9kZWxUYWJsZSA9ICh7IG1vZGVscywgb25TZWxlY3RNb2RlbCwgY2xlYXJTZWxlY3Rpb24gfSkgPT4ge1xuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8VGFibGUgc3RyaXBlZCBib3JkZXJlZCBob3ZlciBzaXplPVwic21cIiBjbGFzc05hbWU9e3N0eWxlcy5tb2RlbFRhYmxlfT5cbiAgICAgICAgPHRoZWFkPlxuICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgIDx0aD5Nb2RlbCBOYW1lPC90aD5cbiAgICAgICAgICAgIDx0aD5TZWxlY3Q8L3RoPlxuICAgICAgICAgIDwvdHI+XG4gICAgICAgIDwvdGhlYWQ+XG4gICAgICAgIDx0Ym9keT5cbiAgICAgICAgICA8dHI+XG4gICAgICAgICAgICA8dGQgY29sU3Bhbj1cIjJcIiBzdHlsZT17eyB0ZXh0QWxpZ246IFwiY2VudGVyXCIgfX0+XG4gICAgICAgICAgICAgIDxCdXR0b24gdmFyaWFudD1cInNlY29uZGFyeVwiIG9uQ2xpY2s9e2NsZWFyU2VsZWN0aW9ufT5cbiAgICAgICAgICAgICAgICBDbGVhciBTZWxlY3Rpb25cbiAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICA8L3RkPlxuICAgICAgICAgIDwvdHI+XG4gICAgICAgICAge21vZGVscy5tYXAoKG1vZGVsLCBpbmRleCkgPT4gKFxuICAgICAgICAgICAgPHRyIGtleT17aW5kZXh9PlxuICAgICAgICAgICAgICA8dGQ+e21vZGVsfTwvdGQ+XG4gICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICA8QnV0dG9uIHZhcmlhbnQ9XCJwcmltYXJ5XCIgb25DbGljaz17KCkgPT4gb25TZWxlY3RNb2RlbChtb2RlbCl9PlxuICAgICAgICAgICAgICAgICAgU2VsZWN0XG4gICAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICkpfVxuICAgICAgICA8L3Rib2R5PlxuICAgICAgPC9UYWJsZT5cbiAgICA8Lz5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IE1vZGVsVGFibGU7XG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IFRhYmxlLCBCdXR0b24sIEZvcm0gfSBmcm9tIFwicmVhY3QtYm9vdHN0cmFwXCI7XG5pbXBvcnQgeyBmb3JtYXREYXRlIH0gZnJvbSBcIi4vZmV0Y2hBc3NvY2lhdGlvbnNcIjtcbmltcG9ydCBzdHlsZXMgZnJvbSBcIi4uL3N0eWxlcy9QYXJ0VGFibGUubW9kdWxlLmNzc1wiO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFBhcnRUYWJsZSh7XG4gIGluZm8sXG4gIGxhYmVscyxcbiAgaWRzLFxuICBob3ZlclN0eWxlLFxuICBzb3J0Q2hlY2tBbGwsXG4gIGNoZWNrRGVsZXRlLFxuICBpc0RlbGV0aW5nLFxuICByb3dTZWxlY3QsXG4gIHNldEhvdmVySW5kZXgsXG4gIGhvdmVySW5kZXgsXG4gIHNlbGVjdGVkSXRlbXMsXG4gIHNldFNlbGVjdGVkSXRlbXMsXG59KSB7XG4gIC8vIGNvbnN0IFtzZWxlY3RlZEl0ZW1zLCBzZXRTZWxlY3RlZEl0ZW1zXSA9IHVzZVN0YXRlKFtdKTtcblxuICAvLyBUb2dnbGUgc2VsZWN0aW9uIG9mIGl0ZW1zXG4gIGNvbnN0IGhhbmRsZVNlbGVjdEl0ZW0gPSAoaWQpID0+IHtcbiAgICBzZXRTZWxlY3RlZEl0ZW1zKChwcmV2U2VsZWN0ZWRJdGVtcykgPT5cbiAgICAgIHByZXZTZWxlY3RlZEl0ZW1zLmluY2x1ZGVzKGlkKVxuICAgICAgICA/IHByZXZTZWxlY3RlZEl0ZW1zLmZpbHRlcigoaXRlbUlkKSA9PiBpdGVtSWQgIT09IGlkKVxuICAgICAgICA6IFsuLi5wcmV2U2VsZWN0ZWRJdGVtcywgaWRdXG4gICAgKTtcbiAgfTtcblxuICAvLyBIYW5kbGUgZGVsZXRlIGJ1dHRvbiBjbGljayBmb3Igc2VsZWN0ZWQgaXRlbXNcbiAgY29uc3QgaGFuZGxlRGVsZXRlU2VsZWN0ZWQgPSAoKSA9PiB7XG4gICAgaWYgKHNlbGVjdGVkSXRlbXMubGVuZ3RoID4gMCkge1xuICAgICAgY2hlY2tEZWxldGUobnVsbCwgbnVsbCwgc2VsZWN0ZWRJdGVtcywgXCJzZWxlY3RlZCBpdGVtc1wiKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnNjcm9sbGFibGVUYWJsZX0+XG4gICAgICA8VGFibGUgc3RyaXBlZCBib3JkZXJlZCBob3ZlciBzaXplPVwic21cIiBjbGFzc05hbWU9e2BtYi0wICR7c3R5bGVzLmZpeGVkVGFibGV9YH0+XG4gICAgICAgIDx0aGVhZCBjbGFzc05hbWU9e3N0eWxlcy5zdGlja3lIZWFkZXJ9PlxuICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgIHtsYWJlbHMubWFwKChpdGVtLCBpbmRleCkgPT4gKFxuICAgICAgICAgICAgICA8dGhcbiAgICAgICAgICAgICAgICBzdHlsZT17aG92ZXJTdHlsZShpbmRleCl9XG4gICAgICAgICAgICAgICAgb25Nb3VzZU92ZXI9eygpID0+IHNldEhvdmVySW5kZXgoaW5kZXgpfVxuICAgICAgICAgICAgICAgIG9uTW91c2VPdXQ9eygpID0+IHNldEhvdmVySW5kZXgobnVsbCl9XG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc29ydENoZWNrQWxsKGluZGV4KX1cbiAgICAgICAgICAgICAgICBrZXk9e2luZGV4fVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge2l0ZW19XG4gICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9e3N0eWxlcy5hY3Rpb25Db2x9IHN0eWxlPXt7IHRleHRBbGlnbjogXCJjZW50ZXJcIiB9fT5cbiAgICAgICAgICAgICAge3NlbGVjdGVkSXRlbXMubGVuZ3RoID4gMCA/IChcbiAgICAgICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgICAgICB2YXJpYW50PVwiZGFuZ2VyXCJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZURlbGV0ZVNlbGVjdGVkfVxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2lzRGVsZXRpbmd9XG4gICAgICAgICAgICAgICAgICBzaXplPVwic21cIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIERlbGV0ZSBTZWxlY3RlZCAoe3NlbGVjdGVkSXRlbXMubGVuZ3RofSlcbiAgICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICBcInNlbGVjdFwiXG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L3RoPlxuICAgICAgICAgIDwvdHI+XG4gICAgICAgIDwvdGhlYWQ+XG4gICAgICAgIDx0Ym9keT5cbiAgICAgICAgICB7aW5mby5tYXAoKGl0ZW0sIGluZGV4KSA9PiAoXG4gICAgICAgICAgICA8dHJcbiAgICAgICAgICAgICAga2V5PXtpbmRleH1cbiAgICAgICAgICAgICAgb25DbGljaz17KGUpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBPbmx5IHRyaWdnZXIgcm93U2VsZWN0IGlmIHRoZSB0YXJnZXQgaXMgbm90IGEgY2hlY2tib3hcbiAgICAgICAgICAgICAgICBpZiAoZS50YXJnZXQudHlwZSAhPT0gXCJjaGVja2JveFwiKSB7XG4gICAgICAgICAgICAgICAgICByb3dTZWxlY3QoaXRlbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJjbGlja2FibGUtcm93XCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHRleHRBbGlnbjogXCJjZW50ZXJcIiwgY3Vyc29yOiBcImRlZmF1bHRcIiB9fT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmNlbGxDbGFtcH0gdGl0bGU9e2l0ZW0ubmFtZX0+XG4gICAgICAgICAgICAgICAgICB7aXRlbS5uYW1lfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgdGV4dEFsaWduOiBcImNlbnRlclwiLCBjdXJzb3I6IFwiZGVmYXVsdFwiIH19PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuY2VsbENsYW1wfSB0aXRsZT17Zm9ybWF0RGF0ZShpdGVtLmRhdGUpfT5cbiAgICAgICAgICAgICAgICAgIHtmb3JtYXREYXRlKGl0ZW0uZGF0ZSl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyB0ZXh0QWxpZ246IFwiY2VudGVyXCIsIGN1cnNvcjogXCJkZWZhdWx0XCIgfX0+XG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMuY2VsbENsYW1wfVxuICAgICAgICAgICAgICAgICAgdGl0bGU9e1xuICAgICAgICAgICAgICAgICAgICBpdGVtLndvcmtPcmRlcnMgJiYgaXRlbS53b3JrT3JkZXJzLmxlbmd0aCA+IDBcbiAgICAgICAgICAgICAgICAgICAgICA/IGl0ZW0ud29ya09yZGVyc1tpdGVtLndvcmtPcmRlcnMubGVuZ3RoIC0gMV0ud29ya09yZGVyXG4gICAgICAgICAgICAgICAgICAgICAgOiBcIk4vQVwiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAge2l0ZW0ud29ya09yZGVycyAmJiBpdGVtLndvcmtPcmRlcnMubGVuZ3RoID4gMFxuICAgICAgICAgICAgICAgICAgICA/IGl0ZW0ud29ya09yZGVyc1tpdGVtLndvcmtPcmRlcnMubGVuZ3RoIC0gMV0ud29ya09yZGVyXG4gICAgICAgICAgICAgICAgICAgIDogXCJOL0FcIn1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHRleHRBbGlnbjogXCJjZW50ZXJcIiwgY3Vyc29yOiBcImRlZmF1bHRcIiB9fT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmNlbGxDbGFtcH0gdGl0bGU9e2l0ZW0ucG59PlxuICAgICAgICAgICAgICAgICAge2l0ZW0ucG59XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyB0ZXh0QWxpZ246IFwiY2VudGVyXCIsIGN1cnNvcjogXCJkZWZhdWx0XCIgfX0+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5jZWxsQ2xhbXB9IHRpdGxlPXtpdGVtLnNufT5cbiAgICAgICAgICAgICAgICAgIHtpdGVtLnNufVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPXtzdHlsZXMuYWN0aW9uQ29sfSBzdHlsZT17eyB0ZXh0QWxpZ246IFwiY2VudGVyXCIgfX0+XG4gICAgICAgICAgICAgICAgPEZvcm0uQ2hlY2tcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgICAgICAgICBjaGVja2VkPXtzZWxlY3RlZEl0ZW1zLmluY2x1ZGVzKGl0ZW0uaWQpfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7IC8vIFByZXZlbnQgcm93IGNsaWNrIHdoZW4gY2hlY2tib3ggaXMgY2xpY2tlZFxuICAgICAgICAgICAgICAgICAgICAvLyBUb2dnbGUgc2VsZWN0aW9uIHVzaW5nIGl0ZW0uaWQgZGlyZWN0bHlcbiAgICAgICAgICAgICAgICAgICAgc2V0U2VsZWN0ZWRJdGVtcygocHJldlNlbGVjdGVkSXRlbXMpID0+XG4gICAgICAgICAgICAgICAgICAgICAgcHJldlNlbGVjdGVkSXRlbXMuaW5jbHVkZXMoaXRlbS5pZClcbiAgICAgICAgICAgICAgICAgICAgICAgID8gcHJldlNlbGVjdGVkSXRlbXMuZmlsdGVyKChpZCkgPT4gaWQgIT09IGl0ZW0uaWQpXG4gICAgICAgICAgICAgICAgICAgICAgICA6IFsuLi5wcmV2U2VsZWN0ZWRJdGVtcywgaXRlbS5pZF1cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtgU2VsZWN0ICR7aXRlbS5uYW1lfWB9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgKSl9XG4gICAgICAgICAge2luZm8ubGVuZ3RoIDwgMTAgJiZcbiAgICAgICAgICAgIEFycmF5LmZyb20oeyBsZW5ndGg6IDEwIC0gaW5mby5sZW5ndGggfSkubWFwKChfLCBpbmRleCkgPT4gKFxuICAgICAgICAgICAgICA8dHIga2V5PXtgZW1wdHktJHtpbmRleH1gfT5cbiAgICAgICAgICAgICAgICA8dGQgY29sU3Bhbj17bGFiZWxzLmxlbmd0aCArIDF9IHN0eWxlPXt7IHRleHRBbGlnbjogXCJjZW50ZXJcIiB9fT5cbiAgICAgICAgICAgICAgICAgICZuYnNwO1xuICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgPC90Ym9keT5cbiAgICAgIDwvVGFibGU+XG4gICAgPC9kaXY+XG4gICk7XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgZmlyZWJhc2UgZnJvbSBcIi4uL2NvbnRleHQvRmlyZWJhc2VcIjtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZldGNoUGFydHNXaXRoTWFjaGluZURhdGEoKSB7XG4gIGNvbnN0IGRiID0gZmlyZWJhc2UuZmlyZXN0b3JlKCk7XG4gIGNvbnN0IHBhcnRzU25hcHNob3QgPSBhd2FpdCBkYi5jb2xsZWN0aW9uKFwiVGVzdFwiKS5nZXQoKTtcbiAgY29uc3QgcGFydHMgPSBhd2FpdCBQcm9taXNlLmFsbChcbiAgICBwYXJ0c1NuYXBzaG90LmRvY3MubWFwKGFzeW5jIChwYXJ0RG9jKSA9PiB7XG4gICAgICBjb25zdCBwYXJ0RGF0YSA9IHBhcnREb2MuZGF0YSgpO1xuICAgICAgcGFydERhdGEuaWQgPSBwYXJ0RG9jLmlkOyAvLyBBZGQgZG9jdW1lbnQgSUQgaGVyZVxuICAgICAgLy8gY29uc29sZS5sb2cocGFydERhdGEpO1xuICAgICAgaWYgKFxuICAgICAgICBwYXJ0RGF0YS5NYWNoaW5lICYmXG4gICAgICAgIHBhcnREYXRhLk1hY2hpbmUgaW5zdGFuY2VvZiBmaXJlYmFzZS5maXJlc3RvcmUuRG9jdW1lbnRSZWZlcmVuY2VcbiAgICAgICkge1xuICAgICAgICBjb25zb2xlLmxvZyhwYXJ0RGF0YS5NYWNoaW5lKTtcbiAgICAgICAgY29uc3QgbWFjaGluZURvYyA9IGF3YWl0IHBhcnREYXRhLk1hY2hpbmUuZ2V0KCk7XG4gICAgICAgIHBhcnREYXRhLm1hY2hpbmVEYXRhID0gbWFjaGluZURvYy5leGlzdHMgPyBtYWNoaW5lRG9jLmRhdGEoKSA6IHt9O1xuICAgICAgICBpZiAocGFydERhdGEubWFjaGluZURhdGEuY2xpZW50KSB7XG4gICAgICAgICAgY29uc3QgY2xpZW50RG9jID0gYXdhaXQgcGFydERhdGEubWFjaGluZURhdGEuY2xpZW50LmdldCgpO1xuICAgICAgICAgIHBhcnREYXRhLm1hY2hpbmVEYXRhLkNsaWVudCA9IGNsaWVudERvYy5leGlzdHNcbiAgICAgICAgICAgID8gY2xpZW50RG9jLmRhdGEoKS5uYW1lXG4gICAgICAgICAgICA6IFwiXCI7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhcnREYXRhLm1hY2hpbmVEYXRhID0ge307XG4gICAgICB9XG4gICAgICByZXR1cm4gcGFydERhdGE7XG4gICAgfSlcbiAgKTtcbiAgcmV0dXJuIHBhcnRzO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZmV0Y2hDbGllbnRzKHNlbGVjdGVkT0VNLCBzZWxlY3RlZE1vZGFsaXR5KSB7XG4gIGNvbnN0IGRiID0gZmlyZWJhc2UuZmlyZXN0b3JlKCk7XG4gIGNvbnN0IGNsaWVudHNTbmFwc2hvdCA9IGF3YWl0IGRiLmNvbGxlY3Rpb24oXCJDbGllbnRcIikuZ2V0KCk7XG4gIGNvbnN0IGNsaWVudHMgPSBjbGllbnRzU25hcHNob3QuZG9jcy5tYXAoKGRvYykgPT4gKHtcbiAgICBpZDogZG9jLmlkLFxuICAgIC4uLmRvYy5kYXRhKCksXG4gIH0pKTtcblxuICAvLyBGaWx0ZXIgY2xpZW50cyBiYXNlZCBvbiBPRU0gYW5kIE1vZGFsaXR5IGlmIHNlbGVjdGVkXG4gIGlmIChzZWxlY3RlZE9FTSB8fCBzZWxlY3RlZE1vZGFsaXR5KSB7XG4gICAgY29uc3QgZmlsdGVyZWRDbGllbnRzID0gW107XG4gICAgZm9yIChjb25zdCBjbGllbnQgb2YgY2xpZW50cykge1xuICAgICAgbGV0IG1hdGNoID0gdHJ1ZTtcbiAgICAgIGlmIChzZWxlY3RlZE9FTSB8fCBzZWxlY3RlZE1vZGFsaXR5KSB7XG4gICAgICAgIGZvciAoY29uc3QgbWFjaGluZVJlZiBvZiBjbGllbnQubWFjaGluZXMpIHtcbiAgICAgICAgICBjb25zdCBtYWNoaW5lRG9jID0gYXdhaXQgbWFjaGluZVJlZi5nZXQoKTtcbiAgICAgICAgICBjb25zdCBtYWNoaW5lRGF0YSA9IG1hY2hpbmVEb2MuZGF0YSgpO1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIChzZWxlY3RlZE9FTSAmJiBtYWNoaW5lRGF0YS5PRU0gPT09IHNlbGVjdGVkT0VNKSB8fFxuICAgICAgICAgICAgKHNlbGVjdGVkTW9kYWxpdHkgJiYgbWFjaGluZURhdGEuTW9kYWxpdHkgPT09IHNlbGVjdGVkTW9kYWxpdHkpXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBtYXRjaCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbWF0Y2ggPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICBmaWx0ZXJlZENsaWVudHMucHVzaChjbGllbnQpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmlsdGVyZWRDbGllbnRzO1xuICB9XG5cbiAgcmV0dXJuIGNsaWVudHM7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmZXRjaE1vZGVscyhcbiAgc2VsZWN0ZWRPRU0sXG4gIHNlbGVjdGVkTW9kYWxpdHksXG4gIHNlbGVjdGVkQ2xpZW50XG4pIHtcbiAgY29uc3QgZGIgPSBmaXJlYmFzZS5maXJlc3RvcmUoKTtcbiAgY29uc3QgbWFjaGluZXNTbmFwc2hvdCA9IGF3YWl0IGRiLmNvbGxlY3Rpb24oXCJNYWNoaW5lXCIpLmdldCgpO1xuICBjb25zdCBtb2RlbHMgPSBuZXcgU2V0KCk7XG5cbiAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgbWFjaGluZXNTbmFwc2hvdC5kb2NzLm1hcChhc3luYyAobWFjaGluZURvYykgPT4ge1xuICAgICAgY29uc3QgbWFjaGluZURhdGEgPSBtYWNoaW5lRG9jLmRhdGEoKTtcbiAgICAgIGxldCBpc1ZhbGlkID0gdHJ1ZTtcblxuICAgICAgaWYgKHNlbGVjdGVkT0VNICYmIG1hY2hpbmVEYXRhLk9FTSAhPT0gc2VsZWN0ZWRPRU0pIGlzVmFsaWQgPSBmYWxzZTtcbiAgICAgIGlmIChzZWxlY3RlZE1vZGFsaXR5ICYmIG1hY2hpbmVEYXRhLk1vZGFsaXR5ICE9PSBzZWxlY3RlZE1vZGFsaXR5KVxuICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XG4gICAgICBpZiAoc2VsZWN0ZWRDbGllbnQgJiYgbWFjaGluZURhdGEuY2xpZW50KSB7XG4gICAgICAgIGNvbnN0IGNsaWVudERvYyA9IGF3YWl0IG1hY2hpbmVEYXRhLmNsaWVudC5nZXQoKTtcbiAgICAgICAgaWYgKCFjbGllbnREb2MuZXhpc3RzIHx8IGNsaWVudERvYy5kYXRhKCkubmFtZSAhPT0gc2VsZWN0ZWRDbGllbnQpXG4gICAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXNWYWxpZCkge1xuICAgICAgICBtb2RlbHMuYWRkKG1hY2hpbmVEYXRhLk1vZGVsKTtcbiAgICAgIH1cbiAgICB9KVxuICApO1xuXG4gIHJldHVybiBBcnJheS5mcm9tKG1vZGVscyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXREYXRlKHRpbWVzdGFtcCkge1xuICBpZiAoIXRpbWVzdGFtcCkgcmV0dXJuIFwiXCI7XG4gIGxldCBkYXRlO1xuICBpZiAodGltZXN0YW1wLnRvRGF0ZSkge1xuICAgIGRhdGUgPSB0aW1lc3RhbXAudG9EYXRlKCk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIHRpbWVzdGFtcCA9PT0gXCJzdHJpbmdcIiB8fCB0eXBlb2YgdGltZXN0YW1wID09PSBcIm51bWJlclwiKSB7XG4gICAgZGF0ZSA9IG5ldyBEYXRlKHRpbWVzdGFtcCk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIFwiXCI7IC8vIGhhbmRsZSB1bmV4cGVjdGVkIGZvcm1hdHNcbiAgfVxuICBjb25zdCBkYXkgPSBTdHJpbmcoZGF0ZS5nZXREYXRlKCkpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcbiAgY29uc3QgbW9udGggPSBTdHJpbmcoZGF0ZS5nZXRNb250aCgpICsgMSkucGFkU3RhcnQoMiwgXCIwXCIpO1xuICBjb25zdCB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xuICByZXR1cm4gYCR7bW9udGh9LyR7ZGF5fS8ke3llYXJ9YDtcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZpcmViYXNlL2NvbXBhdC9hcHBcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZmlyZWJhc2UvY29tcGF0L2F1dGhcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZmlyZWJhc2UvY29tcGF0L2ZpcmVzdG9yZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmaXJlYmFzZS9jb21wYXQvc3RvcmFnZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXh0L2R5bmFtaWNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmV4dC9yb3V0ZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3RcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtYm9vdHN0cmFwXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LWlzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LXFyLWJhcmNvZGUtc2Nhbm5lclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzdHlsZWQtanN4L3N0eWxlXCIpOyJdLCJzb3VyY2VSb290IjoiIn0=