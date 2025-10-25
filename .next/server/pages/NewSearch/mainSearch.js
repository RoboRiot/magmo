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
/******/ 	return __webpack_require__(__webpack_require__.s = "./pages/NewSearch/mainSearch.js");
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
var _jsxFileName = "C:\\Users\\mack2\\OneDrive\\Desktop\\code\\context\\AuthUserContext.js";

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
var _jsxFileName = "C:\\Users\\mack2\\OneDrive\\Desktop\\code\\pages\\LoggedIn.js";

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

/***/ "./pages/NewSearch/mainSearch.js":
/*!***************************************!*\
  !*** ./pages/NewSearch/mainSearch.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MainSearch; });
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-jsx/style */ "styled-jsx/style");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-bootstrap */ "react-bootstrap");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/router */ "next/router");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _utils_fetchAssociations__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/fetchAssociations */ "./utils/fetchAssociations.js");
/* harmony import */ var _context_AuthUserContext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../context/AuthUserContext */ "./context/AuthUserContext.js");
/* harmony import */ var _LoggedIn__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../LoggedIn */ "./pages/LoggedIn.js");
/* harmony import */ var _utils_ClientTable__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../utils/ClientTable */ "./utils/ClientTable.js");
/* harmony import */ var _utils_ModelTable__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../utils/ModelTable */ "./utils/ModelTable.js");
/* harmony import */ var _utils_PartTable__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../utils/PartTable */ "./utils/PartTable.js");
/* harmony import */ var _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../styles/MainSearch.module.css */ "./styles/MainSearch.module.css");
/* harmony import */ var _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _context_Firebase__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../context/Firebase */ "./context/Firebase.js");
var _jsxFileName = "C:\\Users\\mack2\\OneDrive\\Desktop\\code\\pages\\NewSearch\\mainSearch.js";

var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }












 // Predefined warehouse client IDs and display names

const SOCAL_CLIENT_ID = "AIS17182";
const NORCAL_CLIENT_ID = "AIS25097";
const UNASSIGNED_CLIENT_ID = "AIS00404"; // Simulates a network request delay

function simulateNetworkRequest() {
  return new Promise(resolve => setTimeout(resolve, 2000));
} // Custom LoadingButton component


function LoadingButton({
  type,
  name,
  route
}) {
  const {
    0: isLoading,
    1: setLoading
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(false);
  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(() => {
    if (isLoading) {
      simulateNetworkRequest().then(() => setLoading(false));
    }
  }, [isLoading]);
  return __jsx(next_link__WEBPACK_IMPORTED_MODULE_3___default.a, {
    href: `/${route}`,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54,
      columnNumber: 5
    }
  }, __jsx("a", {
    className: `btn btn-${type}`,
    disabled: isLoading,
    onClick: () => !isLoading && setLoading(true),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55,
      columnNumber: 7
    }
  }, isLoading ? "Loading…" : name));
} // ---- DATE HELPERS (top-level scope) ----
// Convert anything date-ish into a timestamp (ms since epoch).


function toTime(value) {
  if (!value) return null; // Firestore Timestamp { seconds, nanoseconds }

  if (typeof value === "object" && value !== null && value.seconds != null) {
    try {
      return value.seconds * 1000;
    } catch {
      /* ignore */
    }
  } // Native Date


  if (value instanceof Date) {
    const t = value.getTime();
    return isNaN(t) ? null : t;
  } // Strings


  if (typeof value === "string") {
    // ISO / yyyy-mm-dd
    const iso = Date.parse(value);
    if (!isNaN(iso)) return iso; // mm/dd/yyyy

    const parts = value.split("/");

    if (parts.length === 3) {
      const [mm, dd, yyyy] = parts;
      const alt = Date.parse(`${yyyy}-${mm}-${dd}`);
      if (!isNaN(alt)) return alt;
    }
  } // Last resort


  const t = Date.parse(value);
  return isNaN(t) ? null : t;
} // Canonicalize to 'yyyy-mm-dd' (matches <input type="date">)


function toYMD(value) {
  const t = toTime(value);
  if (t == null) return null;
  const d = new Date(t);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function MainSearch() {
  const {
    signOut
  } = Object(_context_AuthUserContext__WEBPACK_IMPORTED_MODULE_6__["useAuth"])();
  const {
    0: info,
    1: setInfo
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])([]);
  const {
    0: backupInfo,
    1: setBackupInfo
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])([]);
  const {
    0: augmentedInfo,
    1: setAugmentedInfo
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])([]); // items with clientFromId/currentId added

  const {
    0: isLoading,
    1: setIsLoading
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(true);
  const {
    0: ids,
    1: setID
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])([]);
  const {
    0: show,
    1: setShow
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(false);
  const {
    0: dItem,
    1: setDItem
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])();
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
    0: search,
    1: setSearch
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])("");
  const {
    0: selectedOEM,
    1: setSelectedOEM
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(null);
  const {
    0: selectedModality,
    1: setSelectedModality
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(null); // Replace the old single client state with two sets:

  const {
    0: selectedClientFrom,
    1: setSelectedClientFrom
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(null);
  const {
    0: clientFromButtonText,
    1: setClientFromButtonText
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])("Select Option");
  const {
    0: selectedClientCurrent,
    1: setSelectedClientCurrent
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(null);
  const {
    0: clientCurrentButtonText,
    1: setClientCurrentButtonText
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])("Select Option");
  const {
    0: clients,
    1: setClients
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])([]);
  const {
    0: showClientModal,
    1: setShowClientModal
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(false); // This state tells the modal which client box is being updated: "from" or "current"

  const {
    0: clientSelectionType,
    1: setClientSelectionType
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(null);
  const router = Object(next_router__WEBPACK_IMPORTED_MODULE_4__["useRouter"])();
  const labelBase = ["name", "date", "w/o", "p/n", "s/n"];
  const labelBaseNames = ["name", "date", "wo", "pn", "sn"];
  const sortCheckBase = [false, false, false, false, false, false];

  function withSortIcon(baseLabels, activeIndex, isDesc) {
    return baseLabels.map((text, i) => {
      if (i !== activeIndex) return text; // untouched

      const arrow = isDesc ? " ▼" : " ▲";
      return `${text}${arrow}`;
    });
  }

  const {
    0: labels,
    1: setLabels
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(labelBase);
  const {
    0: sortCheck,
    1: setSortCheck
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(sortCheckBase);
  const {
    0: hoverIndex,
    1: setHoverIndex
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(null);
  const {
    0: selectedModel,
    1: setSelectedModel
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(null);
  const {
    0: gPos,
    1: setGPos
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(null);
  const {
    0: gIde,
    1: setGIde
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(null);
  const {
    0: isDeleting,
    1: setIsDeleting
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(false); // Fetch data on component mount and route change

  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(() => {
    fetchData();
  }, [router.route]);

  async function fetchData() {
    setIsLoading(true);

    try {
      if (router.query.inputText && router.query.selectedType) {
        setSelect(router.query.selectedType);
        setSearch(router.query.inputText);
      } // light retry for transient Firestore hiccups


      const load = async (attempt = 1) => {
        try {
          return await Object(_utils_fetchAssociations__WEBPACK_IMPORTED_MODULE_5__["fetchPartsWithMachineData"])();
        } catch (e) {
          if (attempt >= 3) throw e;
          await new Promise(r => setTimeout(r, 250 * Math.pow(2, attempt - 1)));
          return load(attempt + 1);
        }
      };

      const data = await load();
      setBackupInfo(data);
      setLabels(labelBase); // <-- add this line after setBackupInfo(data)

      setID(data.map(item => item.id)); // --- Pre-augment: resolve client ids of Machine / CurrentMachine once ---

      const db = _context_Firebase__WEBPACK_IMPORTED_MODULE_12__["default"].firestore();
      const machineIds = [];
      const curMachineIds = [];
      const theMachineIds = []; // <-- ADD

      for (const item of data) {
        var _item$Machine, _item$CurrentMachine, _item$TheMachine;

        if (item !== null && item !== void 0 && (_item$Machine = item.Machine) !== null && _item$Machine !== void 0 && _item$Machine.id) machineIds.push(item.Machine.id);
        if (item !== null && item !== void 0 && (_item$CurrentMachine = item.CurrentMachine) !== null && _item$CurrentMachine !== void 0 && _item$CurrentMachine.id) curMachineIds.push(item.CurrentMachine.id);
        if (item !== null && item !== void 0 && (_item$TheMachine = item.TheMachine) !== null && _item$TheMachine !== void 0 && _item$TheMachine.id) theMachineIds.push(item.TheMachine.id); // <-- ADD
      }

      const uniq = arr => [...new Set(arr)];

      const mIds = uniq(machineIds);
      const cIds = uniq(curMachineIds);

      const fetchMachineClients = async ids => {
        if (!ids.length) return {};
        const out = {}; // Firestore "in" supports up to 10 document IDs per query

        const chunks = [];

        for (let i = 0; i < ids.length; i += 10) chunks.push(ids.slice(i, i + 10));

        for (const chunk of chunks) {
          const snap = await db.collection("Machine").where(_context_Firebase__WEBPACK_IMPORTED_MODULE_12__["default"].firestore.FieldPath.documentId(), "in", chunk).get();
          snap.forEach(doc => {
            var _md$client;

            const md = doc.data() || {};
            out[doc.id] = ((_md$client = md.client) === null || _md$client === void 0 ? void 0 : _md$client.id) || null;
          });
        }

        return out;
      }; // Fetch full machine docs (OEM/Modality/Model/Client/etc.) for a set of ids


      const fetchMachinesData = async ids => {
        if (!ids.length) return {};
        const out = {};
        const chunks = [];

        for (let i = 0; i < ids.length; i += 10) chunks.push(ids.slice(i, i + 10));

        for (const chunk of chunks) {
          const snap = await db.collection("Machine").where(_context_Firebase__WEBPACK_IMPORTED_MODULE_12__["default"].firestore.FieldPath.documentId(), "in", chunk).get();
          snap.forEach(doc => {
            out[doc.id] = _objectSpread({
              id: doc.id
            }, doc.data() || {});
          });
        }

        return out;
      };

      const [fromMap, curMap, theMap] = await Promise.all([fetchMachineClients(mIds), fetchMachineClients(cIds), fetchMachinesData(uniq(theMachineIds)) // <-- now captured as theMap
      ]); // New-style only: take client ids straight from item refs

      const augmented = data.map(item => {
        var _item$ClientFrom$id, _item$ClientFrom, _item$ClientCurrent$i, _item$ClientCurrent;

        return _objectSpread(_objectSpread({}, item), {}, {
          clientFromId: (_item$ClientFrom$id = item === null || item === void 0 ? void 0 : (_item$ClientFrom = item.ClientFrom) === null || _item$ClientFrom === void 0 ? void 0 : _item$ClientFrom.id) !== null && _item$ClientFrom$id !== void 0 ? _item$ClientFrom$id : null,
          clientCurrentId: (_item$ClientCurrent$i = item === null || item === void 0 ? void 0 : (_item$ClientCurrent = item.ClientCurrent) === null || _item$ClientCurrent === void 0 ? void 0 : _item$ClientCurrent.id) !== null && _item$ClientCurrent$i !== void 0 ? _item$ClientCurrent$i : null
        });
      });
      setAugmentedInfo(augmented); // default view = everything not explicitly hidden

      setInfo(augmented.filter(it => it.visible !== false));
    } catch (err) {
      console.error("Error fetching data:", err);
      setInfo([]);
      setAugmentedInfo([]);
    } finally {
      setIsLoading(false);
    }
  }

  const searchChangeHandler = event => setSearch(event.target.value); // Asynchronous filter function that loops through backupInfo and,
  // for each item, fetches its Machine and CurrentMachine documents,
  // then compares the client id (from machineData.client.id) to the selected client.


  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(() => {
    function filterParts() {
      const base = augmentedInfo; // already has clientFromId/clientCurrentId

      const noFilters = !selectedOEM && !selectedModality && !selectedModel && !selectedClientFrom && !selectedClientCurrent && !search;

      if (noFilters) {
        setInfo(base.filter(it => it.visible !== false));
        return;
      }

      const filtered = base.filter(item => {
        var _ref, _item$machineData$OEM, _item$machineData, _item$theMachineData, _item$TheMachine2, _ref2, _item$machineData$Mod, _item$machineData2, _item$theMachineData2, _item$TheMachine3, _ref3, _item$machineData$Mod2, _item$machineData3, _item$theMachineData3, _item$TheMachine4;

        // only hide when explicitly false
        if (item.visible === false) return false; // OEM/modality/model via machineData (you already put this in items)
        // OEM / Modality / Model filtering
        // Prefer machineData; fall back to theMachineData; finally try inline TheMachine if it has plain fields

        const OEM = (_ref = (_item$machineData$OEM = item === null || item === void 0 ? void 0 : (_item$machineData = item.machineData) === null || _item$machineData === void 0 ? void 0 : _item$machineData.OEM) !== null && _item$machineData$OEM !== void 0 ? _item$machineData$OEM : item === null || item === void 0 ? void 0 : (_item$theMachineData = item.theMachineData) === null || _item$theMachineData === void 0 ? void 0 : _item$theMachineData.OEM) !== null && _ref !== void 0 ? _ref : item === null || item === void 0 ? void 0 : (_item$TheMachine2 = item.TheMachine) === null || _item$TheMachine2 === void 0 ? void 0 : _item$TheMachine2.OEM;
        const Modality = (_ref2 = (_item$machineData$Mod = item === null || item === void 0 ? void 0 : (_item$machineData2 = item.machineData) === null || _item$machineData2 === void 0 ? void 0 : _item$machineData2.Modality) !== null && _item$machineData$Mod !== void 0 ? _item$machineData$Mod : item === null || item === void 0 ? void 0 : (_item$theMachineData2 = item.theMachineData) === null || _item$theMachineData2 === void 0 ? void 0 : _item$theMachineData2.Modality) !== null && _ref2 !== void 0 ? _ref2 : item === null || item === void 0 ? void 0 : (_item$TheMachine3 = item.TheMachine) === null || _item$TheMachine3 === void 0 ? void 0 : _item$TheMachine3.Modality;
        const Model = (_ref3 = (_item$machineData$Mod2 = item === null || item === void 0 ? void 0 : (_item$machineData3 = item.machineData) === null || _item$machineData3 === void 0 ? void 0 : _item$machineData3.Model) !== null && _item$machineData$Mod2 !== void 0 ? _item$machineData$Mod2 : item === null || item === void 0 ? void 0 : (_item$theMachineData3 = item.theMachineData) === null || _item$theMachineData3 === void 0 ? void 0 : _item$theMachineData3.Model) !== null && _ref3 !== void 0 ? _ref3 : item === null || item === void 0 ? void 0 : (_item$TheMachine4 = item.TheMachine) === null || _item$TheMachine4 === void 0 ? void 0 : _item$TheMachine4.Model;
        if (selectedOEM && OEM !== selectedOEM) return false;
        if (selectedModality && Modality !== selectedModality) return false;
        if (selectedModel && Model !== selectedModel) return false; // Client filters (now instant)

        if (selectedClientFrom && item.clientFromId !== selectedClientFrom) return false;
        if (selectedClientCurrent && item.clientCurrentId !== selectedClientCurrent) return false; // Search

        if (search) {
          const s = String(search).toLowerCase();

          if (select === "Name") {
            return (item.name || "").toLowerCase().includes(s);
          }

          if (select === "Date") {
            // If user hasn't picked a date yet, don't hide anything
            if (!search) return true;
            const wantedDay = search; // already 'yyyy-mm-dd' from <input type="date">
            // 1) Match item.date, regardless of its format or type

            const itemYMD = toYMD(item.date);
            if (itemYMD && itemYMD === wantedDay) return true; // 2) Also check any description dates (if you store dates there)

            if (Array.isArray(item.descriptions)) {
              const hitDesc = item.descriptions.some(d => toYMD(d === null || d === void 0 ? void 0 : d.date) === wantedDay);
              if (hitDesc) return true;
            } // 3) And work order dates (if present)


            if (Array.isArray(item.workOrders)) {
              const hitWO = item.workOrders.some(w => toYMD(w === null || w === void 0 ? void 0 : w.date) === wantedDay);
              if (hitWO) return true;
            }

            return false;
          }

          if (select === "Work Order") {
            return Array.isArray(item.workOrders) && item.workOrders.some(wo => String(wo.workOrder || "").toLowerCase().includes(s));
          }

          if (select === "Product Number") {
            return String(item.pn || "").toLowerCase().includes(s);
          }

          if (select === "Description") {
            return String(item.desc || "").toLowerCase().includes(s);
          }

          if (select === "SKU") {
            return String(item.id || "").toLowerCase().includes(s);
          }
        }

        return true;
      });
      setInfo(filtered);
    }

    filterParts();
  }, [selectedOEM, selectedModality, selectedClientFrom, selectedClientCurrent, selectedModel, search, select, augmentedInfo]);

  function sortCheckAll(pos) {
    // Determine next direction: toggle the clicked column only
    const nextSortCheck = sortCheck.map((v, i) => i === pos ? !v : v);
    const isDesc = nextSortCheck[pos]; // true means descending

    const sortedInfo = [...info].sort((a, b) => {
      const key = labelBaseNames[pos];

      if (pos === 1) {
        // DATE column
        const ta = toTime(a[key]);
        const tb = toTime(b[key]); // Put missing dates at the end for ascending, at the start for descending

        if (ta === null && tb === null) return 0;
        if (ta === null) return isDesc ? -1 : 1;
        if (tb === null) return isDesc ? 1 : -1;
        return isDesc ? tb - ta : ta - tb;
      } // NAME or SKU (string-y columns): indexes 0 or 5 in your original logic


      if (pos === 0 || pos === 5) {
        var _a$key, _b$key;

        const av = ((_a$key = a[key]) !== null && _a$key !== void 0 ? _a$key : "").toString();
        const bv = ((_b$key = b[key]) !== null && _b$key !== void 0 ? _b$key : "").toString();
        return isDesc ? bv.localeCompare(av) : av.localeCompare(bv);
      } // Numeric-ish columns (wo, pn, sn) — fall back to string compare if NaN


      const an = Number(a[key]);
      const bn = Number(b[key]);

      if (!isNaN(an) && !isNaN(bn)) {
        return isDesc ? bn - an : an - bn;
      } else {
        var _a$key2, _b$key2;

        const av = ((_a$key2 = a[key]) !== null && _a$key2 !== void 0 ? _a$key2 : "").toString();
        const bv = ((_b$key2 = b[key]) !== null && _b$key2 !== void 0 ? _b$key2 : "").toString();
        return isDesc ? bv.localeCompare(av) : av.localeCompare(bv);
      }
    });
    setInfo(sortedInfo);
    setSortCheck(nextSortCheck); // Update header labels to show the little arrow on the active column

    setLabels(withSortIcon(labelBase, pos, isDesc));
  }

  const rowSelect = item => {
    if (item && item.id) {
      console.log("Selected item:", item);
      router.push("./item/" + item.id);
    } else {
      console.error("Unable to determine the selected item’s ID: ", item);
    }
  };

  const {
    0: selectedItems,
    1: setSelectedItems
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])([]);
  const {
    0: showDeleteModal,
    1: setShowDeleteModal
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(false);

  const handleSelectItem = id => {
    setSelectedItems(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  }; // setSelectedItems((prev) => {
  //   const newSelection = prev.includes(id)
  //     ? prev.filter((itemId) => itemId !== id)
  //     : [...prev, id];
  //   console.log("Selected items:", newSelection);
  //   return newSelection; // <- important
  // });


  const handleShowDeleteModal = () => setShowDeleteModal(true);

  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  const handleDeleteSelected = async () => {
    setIsDeleting(true);
    const db = _context_Firebase__WEBPACK_IMPORTED_MODULE_12__["default"].firestore();

    try {
      // Loop over each selected item one at a time
      for (const itemId of selectedItems) {
        console.log(itemId);

        try {
          // Delete from "Test" collection
          await db.collection("Test").doc(itemId).delete();
        } catch (err) {
          console.error(`Error deleting document ${itemId} from Test:`, err);
        }

        try {
          // Delete from "Parts" collection
          await db.collection("Parts").doc(itemId).delete();
        } catch (err) {
          console.error(`Error deleting document ${itemId} from Parts:`, err);
        }

        try {
          // Delete associated photos from storage
          await deleteFromStorage(itemId);
        } catch (err) {
          console.error(`Error deleting storage for ${itemId}:`, err);
        }
      } // Update local state by filtering out the deleted items


      setInfo(info.filter(item => !selectedItems.includes(item.id)));
      setSelectedItems([]);
    } catch (error) {
      console.error("Error deleting items:", error);
    } finally {
      setIsDeleting(false);
      handleCloseDeleteModal(); // Optionally, reload the page
      // router.reload();
    }
  };

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  const checkDelete = (event, pos, idsToDelete, name) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    console.log("Selected IDs to delete:", idsToDelete);
    setSelectedItems(idsToDelete);
    setDItem(name);
    setShowDeleteModal(true);
  }; // const handleDelete = async () => {
  //   let itemId = gIde;
  //   try {
  //     setIsDeleting(true);
  //     const db = firebase.firestore();
  //     await db.collection("Test").doc(itemId).delete();
  //     await deleteFromPartsCollection(itemId);
  //     await deleteFromStorage(itemId);
  //     setInfo(info.filter((_, i) => gPos !== i));
  //     console.log(`Deleted item: ${itemId}`);
  //   } catch (error) {
  //     console.error("Error deleting item:", error);
  //   } finally {
  //     setIsDeleting(false);
  //   }
  //   handleClose();
  // };


  const hoverStyle = index => ({
    backgroundColor: hoverIndex === index ? "#ddd" : "transparent",
    textAlign: "center",
    cursor: "default"
  });

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
  }; // Build a unique list of clients from the items currently loaded, filtered by OEM/Modality.
  // `type` is "from" or "current" to decide which client ref to read.


  async function buildClientsFromItems(type) {
    const db = _context_Firebase__WEBPACK_IMPORTED_MODULE_12__["default"].firestore();
    const ids = new Set(); // Respect current OEM / Modality filters when deriving client options

    const filtered = augmentedInfo.filter(item => {
      var _ref4, _item$machineData$OEM2, _item$machineData4, _ref5, _item$machineData$Mod3, _item$machineData5;

      const OEM = (_ref4 = (_item$machineData$OEM2 = item === null || item === void 0 ? void 0 : (_item$machineData4 = item.machineData) === null || _item$machineData4 === void 0 ? void 0 : _item$machineData4.OEM) !== null && _item$machineData$OEM2 !== void 0 ? _item$machineData$OEM2 : item === null || item === void 0 ? void 0 : item.OEM) !== null && _ref4 !== void 0 ? _ref4 : null;
      const Modality = (_ref5 = (_item$machineData$Mod3 = item === null || item === void 0 ? void 0 : (_item$machineData5 = item.machineData) === null || _item$machineData5 === void 0 ? void 0 : _item$machineData5.Modality) !== null && _item$machineData$Mod3 !== void 0 ? _item$machineData$Mod3 : item === null || item === void 0 ? void 0 : item.Modality) !== null && _ref5 !== void 0 ? _ref5 : null;
      if (selectedOEM && OEM !== selectedOEM) return false;
      if (selectedModality && Modality !== selectedModality) return false;
      return true;
    });

    for (const it of filtered) {
      const id = type === "from" ? it.clientFromId : it.clientCurrentId;
      if (id) ids.add(id);
    }

    const out = [];
    const idArray = [...ids];

    for (let i = 0; i < idArray.length; i += 10) {
      const chunk = idArray.slice(i, i + 10);
      const snap = await db.collection("Client").where(_context_Firebase__WEBPACK_IMPORTED_MODULE_12__["default"].firestore.FieldPath.documentId(), "in", chunk).get();
      snap.forEach(doc => {
        const d = doc.data() || {};
        out.push({
          id: doc.id,
          name: d.name || doc.id
        });
      });
    } // sort by name for nicer UX


    out.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    return out;
  } // --------------------
  // CLIENT SELECTION HANDLING
  // --------------------
  // This function fetches clients and opens the client modal.


  const handleClientClick = async () => {
    let safeClients = [];

    try {
      const clientsData = await Object(_utils_fetchAssociations__WEBPACK_IMPORTED_MODULE_5__["fetchClients"])(selectedOEM, selectedModality);
      safeClients = Array.isArray(clientsData) ? clientsData : [];
    } catch (e) {
      console.error("fetchClients failed:", e);
    } // Fallback to building from loaded items if API gave us nothing


    if (safeClients.length === 0) {
      try {
        if (!clientSelectionType) {
          // if somehow not set yet, default to "from"
          setClientSelectionType("from");
        }

        const derived = await buildClientsFromItems(clientSelectionType || "from");
        safeClients = derived;
      } catch (e) {
        console.error("Fallback buildClientsFromItems failed:", e);
        safeClients = [];
      }
    }

    setClients(safeClients);
    setClientSearchTerm("");
    setShowClientModal(true);
  }; // When a client is selected in the modal, we now assume the parameter is a client ID.
  // If the passed value is null, we clear the selection.


  const handleClientSelect = async clientId => {
    console.log("User selected client id:", clientId);

    if (!clientId) {
      if (clientSelectionType === "from") {
        setClientFromButtonText("Select Option");
        setSelectedClientFrom(null);
      } else if (clientSelectionType === "current") {
        setClientCurrentButtonText("Select Option");
        setSelectedClientCurrent(null);
      }

      setShowClientModal(false);
      return;
    }

    try {
      const clientSnap = await _context_Firebase__WEBPACK_IMPORTED_MODULE_12__["default"].firestore().collection("Client").doc(clientId).get();

      if (clientSnap.exists) {
        const clientData = clientSnap.data();

        if (clientSelectionType === "from") {
          setClientFromButtonText(clientData.name);
          setSelectedClientFrom(clientId);
        } else if (clientSelectionType === "current") {
          setClientCurrentButtonText(clientData.name);
          setSelectedClientCurrent(clientId);
        }
      } else {
        console.error("No client document found for id:", clientId);
      }
    } catch (error) {
      console.error("Error fetching client data:", error);
    }

    setShowClientModal(false);
  };

  const handleClientInfo = (clientId, clientName) => {
    console.log(`Client ID: ${clientId}, Client Name: ${clientName}`);
    router.push("client/" + clientId);
  };

  const handleClearClientSelection = () => {
    if (clientSelectionType === "from") {
      setClientFromButtonText("Select Option");
      setSelectedClientFrom(null);
    } else if (clientSelectionType === "current") {
      setClientCurrentButtonText("Select Option");
      setSelectedClientCurrent(null);
    }

    setShowClientModal(false);
  }; // --------------------
  // MODEL SELECTION HANDLING
  // --------------------


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

  const handleModelClick = async () => {
    const modelsData = await Object(_utils_fetchAssociations__WEBPACK_IMPORTED_MODULE_5__["fetchModels"])(selectedOEM, selectedModality, selectedClientFrom);
    setModels(modelsData);
    setModelSearchTerm("");
    setShowModelModal(true);
  };

  const handleModelSelect = modelName => {
    setModelButtonText(modelName || "Select Option");
    setSelectedModel(modelName || null);
    setShowModelModal(false);
  };

  const handleClearModelSelection = () => {
    setModelButtonText("Select Option");
    setSelectedModel(null);
    setShowModelModal(false);
  }; // --------------------
  // WAREHOUSE BUTTONS (for Client Current)
  // --------------------


  const handleSoCalWarehouseClick = () => {
    setClientCurrentButtonText("SoCal Warehouse");
    setSelectedClientCurrent(SOCAL_CLIENT_ID);
    console.log("Warehouse button clicked: setting Client Current to", SOCAL_CLIENT_ID);
  };

  const handleNorCalWarehouseClick = () => {
    setClientCurrentButtonText("NorCal Warehouse");
    setSelectedClientCurrent(NORCAL_CLIENT_ID);
    console.log("Warehouse button clicked: setting Client Current to", NORCAL_CLIENT_ID);
  };

  const handleWarehouseUnassignedClick = () => {
    setClientCurrentButtonText("Unassigned");
    setSelectedClientCurrent(UNASSIGNED_CLIENT_ID);
    console.log("Warehouse button clicked: setting Client Current to", UNASSIGNED_CLIENT_ID);
  };

  const {
    0: clientSearchTerm,
    1: setClientSearchTerm
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])("");
  const {
    0: modelSearchTerm,
    1: setModelSearchTerm
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])("");

  const deleteFromStorage = async itemId => {
    const storageRef = _context_Firebase__WEBPACK_IMPORTED_MODULE_12__["default"].storage().ref();
    const folderRef = storageRef.child(`Parts/${itemId}/`);

    try {
      const listResult = await folderRef.listAll();
      const deletePromises = listResult.items.map(item => item.delete());
      await Promise.all(deletePromises);
    } catch (error) {
      console.error("Error deleting from storage:", error);
    }
  };

  const deleteFromPartsCollection = async itemId => {
    const db = _context_Firebase__WEBPACK_IMPORTED_MODULE_12__["default"].firestore();

    try {
      await db.collection("Parts").doc(itemId).delete();
      console.log(`Deleted item from Parts collection: ${itemId}`);
    } catch (error) {
      console.error("Error deleting from Parts collection:", error);
    }
  }; //   // Safely convert any date-ish value into a comparable timestamp (ms since epoch).
  // function toTime(value) {
  //   if (!value) return null;
  //   // Firestore Timestamp: { seconds, nanoseconds }
  //   if (typeof value === "object" && value.seconds) {
  //     try {
  //       return value.seconds * 1000;
  //     } catch { /* fallthrough */ }
  //   }
  //   // If already a Date
  //   if (value instanceof Date) return isNaN(value.getTime()) ? null : value.getTime();
  //   // If string: try ISO first
  //   if (typeof value === "string") {
  //     // yyyy-mm-dd (from your form inputs)
  //     const iso = Date.parse(value);
  //     if (!isNaN(iso)) return iso;
  //     // mm/dd/yyyy fallback (older items)
  //     const parts = value.split("/");
  //     if (parts.length === 3) {
  //       const [mm, dd, yyyy] = parts;
  //       const alt = Date.parse(`${yyyy}-${mm}-${dd}`);
  //       if (!isNaN(alt)) return alt;
  //     }
  //   }
  //   // Canonicalize any date-ish value to 'yyyy-mm-dd' so it matches <input type="date"> values
  //   function toYMD(value) {
  //     const t = toTime(value);
  //     if (t == null) return null;
  //     const d = new Date(t);
  //     const yyyy = d.getFullYear();
  //     const mm = String(d.getMonth() + 1).padStart(2, "0");
  //     const dd = String(d.getDate()).padStart(2, "0");
  //     return `${yyyy}-${mm}-${dd}`;
  //   }
  //   // Last resort
  //   const t = Date.parse(value);
  //   return isNaN(t) ? null : t;
  // }


  return __jsx(_LoggedIn__WEBPACK_IMPORTED_MODULE_7__["default"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 797,
      columnNumber: 5
    }
  }, isDeleting && __jsx("div", {
    className: "loading-overlay",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 799,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Spinner"], {
    animation: "border",
    role: "status",
    className: "spinner-center",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 800,
      columnNumber: 11
    }
  }, __jsx("span", {
    className: "sr-only",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 801,
      columnNumber: 13
    }
  }, "Loading..."))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"], {
    show: showDeleteModal,
    onHide: handleCloseDeleteModal,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 805,
      columnNumber: 7
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Header, {
    closeButton: true,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 806,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Title, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 807,
      columnNumber: 11
    }
  }, "Confirm Deletion")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Body, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 809,
      columnNumber: 9
    }
  }, "Are you sure you want to delete ", selectedItems.length, " item", selectedItems.length > 1 ? "s" : "", "?"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Footer, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 813,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "danger",
    onClick: handleDeleteSelected,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 814,
      columnNumber: 11
    }
  }, "Yes, delete"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "secondary",
    onClick: handleCloseDeleteModal,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 817,
      columnNumber: 11
    }
  }, "Cancel"))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"], {
    show: showClientModal,
    onHide: () => setShowClientModal(false),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 823,
      columnNumber: 7
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Header, {
    closeButton: true,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 824,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Title, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 825,
      columnNumber: 11
    }
  }, "Select ", clientSelectionType === "from" ? "Client From" : "Client Current")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Body, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 829,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["FormControl"], {
    type: "text",
    placeholder: "Search by name",
    className: "mb-3",
    value: clientSearchTerm,
    onChange: e => setClientSearchTerm(e.target.value),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 830,
      columnNumber: 11
    }
  }), __jsx(_utils_ClientTable__WEBPACK_IMPORTED_MODULE_8__["default"], {
    clients: (Array.isArray(clients) ? clients : []).filter(client => {
      var _client$name;

      return ((_client$name = client === null || client === void 0 ? void 0 : client.name) !== null && _client$name !== void 0 ? _client$name : "").toLowerCase().includes(clientSearchTerm.toLowerCase());
    }),
    onSelectClient: handleClientSelect,
    onInfoClick: handleClientInfo,
    isClientSearch: false,
    clearSelection: () => handleClientSelect(null),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 837,
      columnNumber: 11
    }
  }))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"], {
    show: showModelModal,
    onHide: () => setShowModelModal(false),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 849,
      columnNumber: 7
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Header, {
    closeButton: true,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 850,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Title, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 851,
      columnNumber: 11
    }
  }, "Select Model")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Body, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 853,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["FormControl"], {
    type: "text",
    placeholder: "Search by name",
    className: "mb-3",
    value: modelSearchTerm,
    onChange: e => setModelSearchTerm(e.target.value),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 854,
      columnNumber: 11
    }
  }), __jsx(_utils_ModelTable__WEBPACK_IMPORTED_MODULE_9__["default"], {
    models: models.filter(model => typeof model === "string" ? model.toLowerCase().includes(modelSearchTerm.toLowerCase()) : false),
    onSelectModel: handleModelSelect,
    clearSelection: () => handleModelSelect(null),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 861,
      columnNumber: 11
    }
  }))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Container"], {
    className: "d-flex align-items-center justify-content-center",
    style: {
      minHeight: "100vh"
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 873,
      columnNumber: 7
    }
  }, __jsx("div", {
    className: "w-100",
    style: {
      maxWidth: "1200px"
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 877,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Card"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 878,
      columnNumber: 11
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Card"].Body, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 879,
      columnNumber: 13
    }
  }, __jsx("h2", {
    className: "text-center mb-4",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 880,
      columnNumber: 15
    }
  }, "Magmo"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Row"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 881,
      columnNumber: 15
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], {
    md: 4,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 882,
      columnNumber: 17
    }
  }, __jsx("div", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 884,
      columnNumber: 19
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["InputGroup"], {
    className: "mb-3",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 885,
      columnNumber: 21
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["InputGroup"].Text, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 886,
      columnNumber: 23
    }
  }, "OEM"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Dropdown"], {
    onSelect: handleSelect1,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 887,
      columnNumber: 23
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Dropdown"].Toggle, {
    variant: "outline-secondary",
    id: "dropdown-button-1",
    className: "w-100",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 888,
      columnNumber: 25
    }
  }, dropdown1Text), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Dropdown"].Menu, {
    className: "w-100",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 895,
      columnNumber: 25
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Dropdown"].Item, {
    eventKey: "unassigned",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 896,
      columnNumber: 27
    }
  }, "Select Option"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Dropdown"].Item, {
    eventKey: "GE",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 899,
      columnNumber: 27
    }
  }, "GE"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Dropdown"].Item, {
    eventKey: "Toshiba",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 900,
      columnNumber: 27
    }
  }, "Toshiba"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Dropdown"].Item, {
    eventKey: "Siemens",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 903,
      columnNumber: 27
    }
  }, "Siemens"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Dropdown"].Item, {
    eventKey: "Philips",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 906,
      columnNumber: 27
    }
  }, "Philips")))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["InputGroup"], {
    className: "mb-5",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 913,
      columnNumber: 21
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["InputGroup"].Text, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 914,
      columnNumber: 23
    }
  }, "Modality"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Dropdown"], {
    onSelect: handleSelect2,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 915,
      columnNumber: 23
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Dropdown"].Toggle, {
    variant: "outline-secondary",
    id: "dropdown-button-2",
    className: "w-100",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 916,
      columnNumber: 25
    }
  }, dropdown2Text), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Dropdown"].Menu, {
    className: "w-100",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 923,
      columnNumber: 25
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Dropdown"].Item, {
    eventKey: "unassigned",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 924,
      columnNumber: 27
    }
  }, "Select Option"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Dropdown"].Item, {
    eventKey: "CT",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 927,
      columnNumber: 27
    }
  }, "CT"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Dropdown"].Item, {
    eventKey: "MRI",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 928,
      columnNumber: 27
    }
  }, "MRI"))))), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_11___default.a.divider,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 934,
      columnNumber: 19
    }
  }), __jsx("div", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 937,
      columnNumber: 19
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["InputGroup"], {
    className: "mb-3",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 938,
      columnNumber: 21
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["InputGroup"].Text, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 939,
      columnNumber: 23
    }
  }, "Client From"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "outline-secondary",
    className: "w-100",
    onClick: () => handleClientClick("from"),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 940,
      columnNumber: 23
    }
  }, clientFromButtonText)), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["InputGroup"], {
    className: "mb-3",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 949,
      columnNumber: 21
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["InputGroup"].Text, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 950,
      columnNumber: 23
    }
  }, "Client Current"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "outline-secondary",
    className: "w-100",
    onClick: () => handleClientClick("current"),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 951,
      columnNumber: 23
    }
  }, clientCurrentButtonText)), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["InputGroup"], {
    className: "mb-3",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 961,
      columnNumber: 21
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["InputGroup"].Text, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 962,
      columnNumber: 23
    }
  }, "Model"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "outline-secondary",
    className: "w-100",
    onClick: handleModelClick,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 963,
      columnNumber: 23
    }
  }, modelButtonText)), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_11___default.a.divider,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 972,
      columnNumber: 21
    }
  }), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["InputGroup"], {
    className: "mb-3",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 975,
      columnNumber: 21
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["InputGroup"].Text, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 976,
      columnNumber: 23
    }
  }, "Warehouse"), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_11___default.a.buttonGroup,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 977,
      columnNumber: 23
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "outline-secondary",
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_11___default.a.flexButton,
    onClick: handleSoCalWarehouseClick,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 978,
      columnNumber: 25
    }
  }, "SoCal Warehouse"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "outline-secondary",
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_11___default.a.flexButton,
    onClick: handleNorCalWarehouseClick,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 985,
      columnNumber: 25
    }
  }, "NorCal Warehouse"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "outline-secondary",
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_11___default.a.flexButton,
    onClick: handleWarehouseUnassignedClick,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 992,
      columnNumber: 25
    }
  }, "Unassigned"))))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], {
    md: 8,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1004,
      columnNumber: 17
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_11___default.a.tableContainer,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1005,
      columnNumber: 19
    }
  }, isLoading ? __jsx("div", {
    className: "jsx-1682384643" + " " + "d-flex justify-content-center align-items-center p-5",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1007,
      columnNumber: 23
    }
  }, __jsx("img", {
    src: "/magmo-logo.png" // make sure it's in /public
    ,
    alt: "Loading Magmo",
    style: {
      width: 64,
      height: 64,
      animation: "magmo-spin 1s linear infinite",
      transformOrigin: "50% 50%",
      display: "block"
    },
    className: "jsx-1682384643",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1008,
      columnNumber: 25
    }
  }), __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {
    id: "1682384643",
    __self: this,
    __source: void 0
  }, "@-webkit-keyframes magmo-spin{from{-webkit-transform:rotate(0deg);-ms-transform:rotate(0deg);transform:rotate(0deg);}to{-webkit-transform:rotate(360deg);-ms-transform:rotate(360deg);transform:rotate(360deg);}}@keyframes magmo-spin{from{-webkit-transform:rotate(0deg);-ms-transform:rotate(0deg);transform:rotate(0deg);}to{-webkit-transform:rotate(360deg);-ms-transform:rotate(360deg);transform:rotate(360deg);}}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcbWFjazJcXE9uZURyaXZlXFxEZXNrdG9wXFxjb2RlXFxwYWdlc1xcTmV3U2VhcmNoXFxtYWluU2VhcmNoLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTQvQjJDLEFBNEJrQyxBQUdFLGlGQUYzQixNQUdBIiwiZmlsZSI6IkM6XFxVc2Vyc1xcbWFjazJcXE9uZURyaXZlXFxEZXNrdG9wXFxjb2RlXFxwYWdlc1xcTmV3U2VhcmNoXFxtYWluU2VhcmNoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHtcclxuICBDb250YWluZXIsXHJcbiAgQ2FyZCxcclxuICBSb3csXHJcbiAgQ29sLFxyXG4gIElucHV0R3JvdXAsXHJcbiAgRHJvcGRvd24sXHJcbiAgRm9ybUNvbnRyb2wsXHJcbiAgQnV0dG9uLFxyXG4gIE5hdkRyb3Bkb3duLFxyXG4gIEZvcm0sXHJcbiAgTW9kYWwsXHJcbiAgU3Bpbm5lcixcclxufSBmcm9tIFwicmVhY3QtYm9vdHN0cmFwXCI7XHJcbmltcG9ydCBMaW5rIGZyb20gXCJuZXh0L2xpbmtcIjtcclxuaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSBcIm5leHQvcm91dGVyXCI7XHJcbmltcG9ydCB7XHJcbiAgZmV0Y2hQYXJ0c1dpdGhNYWNoaW5lRGF0YSxcclxuICBmZXRjaENsaWVudHMsXHJcbiAgZmV0Y2hNb2RlbHMsXHJcbiAgZm9ybWF0RGF0ZSxcclxufSBmcm9tIFwiLi4vLi4vdXRpbHMvZmV0Y2hBc3NvY2lhdGlvbnNcIjtcclxuaW1wb3J0IHsgdXNlQXV0aCB9IGZyb20gXCIuLi8uLi9jb250ZXh0L0F1dGhVc2VyQ29udGV4dFwiO1xyXG5pbXBvcnQgTG9nZ2VkSW4gZnJvbSBcIi4uL0xvZ2dlZEluXCI7XHJcbmltcG9ydCBDbGllbnRUYWJsZSBmcm9tIFwiLi4vLi4vdXRpbHMvQ2xpZW50VGFibGVcIjtcclxuaW1wb3J0IE1vZGVsVGFibGUgZnJvbSBcIi4uLy4uL3V0aWxzL01vZGVsVGFibGVcIjtcclxuaW1wb3J0IFBhcnRUYWJsZSBmcm9tIFwiLi4vLi4vdXRpbHMvUGFydFRhYmxlXCI7XHJcbmltcG9ydCBzdHlsZXMgZnJvbSBcIi4uLy4uL3N0eWxlcy9NYWluU2VhcmNoLm1vZHVsZS5jc3NcIjtcclxuaW1wb3J0IGZpcmViYXNlIGZyb20gXCIuLi8uLi9jb250ZXh0L0ZpcmViYXNlXCI7XHJcblxyXG4vLyBQcmVkZWZpbmVkIHdhcmVob3VzZSBjbGllbnQgSURzIGFuZCBkaXNwbGF5IG5hbWVzXHJcbmNvbnN0IFNPQ0FMX0NMSUVOVF9JRCA9IFwiQUlTMTcxODJcIjtcclxuY29uc3QgTk9SQ0FMX0NMSUVOVF9JRCA9IFwiQUlTMjUwOTdcIjtcclxuY29uc3QgVU5BU1NJR05FRF9DTElFTlRfSUQgPSBcIkFJUzAwNDA0XCI7XHJcblxyXG5cclxuLy8gU2ltdWxhdGVzIGEgbmV0d29yayByZXF1ZXN0IGRlbGF5XHJcbmZ1bmN0aW9uIHNpbXVsYXRlTmV0d29ya1JlcXVlc3QoKSB7XHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIDIwMDApKTtcclxufVxyXG5cclxuLy8gQ3VzdG9tIExvYWRpbmdCdXR0b24gY29tcG9uZW50XHJcbmZ1bmN0aW9uIExvYWRpbmdCdXR0b24oeyB0eXBlLCBuYW1lLCByb3V0ZSB9KSB7XHJcbiAgY29uc3QgW2lzTG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoaXNMb2FkaW5nKSB7XHJcbiAgICAgIHNpbXVsYXRlTmV0d29ya1JlcXVlc3QoKS50aGVuKCgpID0+IHNldExvYWRpbmcoZmFsc2UpKTtcclxuICAgIH1cclxuICB9LCBbaXNMb2FkaW5nXSk7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8TGluayBocmVmPXtgLyR7cm91dGV9YH0+XHJcbiAgICAgIDxhXHJcbiAgICAgICAgY2xhc3NOYW1lPXtgYnRuIGJ0bi0ke3R5cGV9YH1cclxuICAgICAgICBkaXNhYmxlZD17aXNMb2FkaW5nfVxyXG4gICAgICAgIG9uQ2xpY2s9eygpID0+ICFpc0xvYWRpbmcgJiYgc2V0TG9hZGluZyh0cnVlKX1cclxuICAgICAgPlxyXG4gICAgICAgIHtpc0xvYWRpbmcgPyBcIkxvYWRpbmfigKZcIiA6IG5hbWV9XHJcbiAgICAgIDwvYT5cclxuICAgIDwvTGluaz5cclxuICApO1xyXG59XHJcblxyXG4vLyAtLS0tIERBVEUgSEVMUEVSUyAodG9wLWxldmVsIHNjb3BlKSAtLS0tXHJcblxyXG4vLyBDb252ZXJ0IGFueXRoaW5nIGRhdGUtaXNoIGludG8gYSB0aW1lc3RhbXAgKG1zIHNpbmNlIGVwb2NoKS5cclxuZnVuY3Rpb24gdG9UaW1lKHZhbHVlKSB7XHJcbiAgaWYgKCF2YWx1ZSkgcmV0dXJuIG51bGw7XHJcblxyXG4gIC8vIEZpcmVzdG9yZSBUaW1lc3RhbXAgeyBzZWNvbmRzLCBuYW5vc2Vjb25kcyB9XHJcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZS5zZWNvbmRzICE9IG51bGwpIHtcclxuICAgIHRyeSB7IHJldHVybiB2YWx1ZS5zZWNvbmRzICogMTAwMDsgfSBjYXRjaCB7IC8qIGlnbm9yZSAqLyB9XHJcbiAgfVxyXG5cclxuICAvLyBOYXRpdmUgRGF0ZVxyXG4gIGlmICh2YWx1ZSBpbnN0YW5jZW9mIERhdGUpIHtcclxuICAgIGNvbnN0IHQgPSB2YWx1ZS5nZXRUaW1lKCk7XHJcbiAgICByZXR1cm4gaXNOYU4odCkgPyBudWxsIDogdDtcclxuICB9XHJcblxyXG4gIC8vIFN0cmluZ3NcclxuICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAvLyBJU08gLyB5eXl5LW1tLWRkXHJcbiAgICBjb25zdCBpc28gPSBEYXRlLnBhcnNlKHZhbHVlKTtcclxuICAgIGlmICghaXNOYU4oaXNvKSkgcmV0dXJuIGlzbztcclxuXHJcbiAgICAvLyBtbS9kZC95eXl5XHJcbiAgICBjb25zdCBwYXJ0cyA9IHZhbHVlLnNwbGl0KFwiL1wiKTtcclxuICAgIGlmIChwYXJ0cy5sZW5ndGggPT09IDMpIHtcclxuICAgICAgY29uc3QgW21tLCBkZCwgeXl5eV0gPSBwYXJ0cztcclxuICAgICAgY29uc3QgYWx0ID0gRGF0ZS5wYXJzZShgJHt5eXl5fS0ke21tfS0ke2RkfWApO1xyXG4gICAgICBpZiAoIWlzTmFOKGFsdCkpIHJldHVybiBhbHQ7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBMYXN0IHJlc29ydFxyXG4gIGNvbnN0IHQgPSBEYXRlLnBhcnNlKHZhbHVlKTtcclxuICByZXR1cm4gaXNOYU4odCkgPyBudWxsIDogdDtcclxufVxyXG5cclxuLy8gQ2Fub25pY2FsaXplIHRvICd5eXl5LW1tLWRkJyAobWF0Y2hlcyA8aW5wdXQgdHlwZT1cImRhdGVcIj4pXHJcbmZ1bmN0aW9uIHRvWU1EKHZhbHVlKSB7XHJcbiAgY29uc3QgdCA9IHRvVGltZSh2YWx1ZSk7XHJcbiAgaWYgKHQgPT0gbnVsbCkgcmV0dXJuIG51bGw7XHJcbiAgY29uc3QgZCA9IG5ldyBEYXRlKHQpO1xyXG4gIGNvbnN0IHl5eXkgPSBkLmdldEZ1bGxZZWFyKCk7XHJcbiAgY29uc3QgbW0gPSBTdHJpbmcoZC5nZXRNb250aCgpICsgMSkucGFkU3RhcnQoMiwgXCIwXCIpO1xyXG4gIGNvbnN0IGRkID0gU3RyaW5nKGQuZ2V0RGF0ZSgpKS5wYWRTdGFydCgyLCBcIjBcIik7XHJcbiAgcmV0dXJuIGAke3l5eXl9LSR7bW19LSR7ZGR9YDtcclxufVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIE1haW5TZWFyY2goKSB7XHJcbiAgY29uc3QgeyBzaWduT3V0IH0gPSB1c2VBdXRoKCk7XHJcbiAgY29uc3QgW2luZm8sIHNldEluZm9dID0gdXNlU3RhdGUoW10pO1xyXG4gIGNvbnN0IFtiYWNrdXBJbmZvLCBzZXRCYWNrdXBJbmZvXSA9IHVzZVN0YXRlKFtdKTtcclxuICBjb25zdCBbYXVnbWVudGVkSW5mbywgc2V0QXVnbWVudGVkSW5mb10gPSB1c2VTdGF0ZShbXSk7IC8vIGl0ZW1zIHdpdGggY2xpZW50RnJvbUlkL2N1cnJlbnRJZCBhZGRlZFxyXG4gIGNvbnN0IFtpc0xvYWRpbmcsIHNldElzTG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcclxuICBjb25zdCBbaWRzLCBzZXRJRF0gPSB1c2VTdGF0ZShbXSk7XHJcbiAgY29uc3QgW3Nob3csIHNldFNob3ddID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtkSXRlbSwgc2V0REl0ZW1dID0gdXNlU3RhdGUoKTtcclxuICBjb25zdCBbc2VsZWN0LCBzZXRTZWxlY3RdID0gdXNlU3RhdGUoXCJOYW1lXCIpO1xyXG4gIGNvbnN0IFtzaG93TGlzdCwgc2V0U2hvd0xpc3RdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtzaG93TGlzdFNlYXJjaCwgc2V0U2hvd0xpc3RTZWFyY2hdID0gdXNlU3RhdGUoXCJ0ZXh0XCIpO1xyXG4gIGNvbnN0IFtzZWFyY2gsIHNldFNlYXJjaF0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbc2VsZWN0ZWRPRU0sIHNldFNlbGVjdGVkT0VNXSA9IHVzZVN0YXRlKG51bGwpO1xyXG4gIGNvbnN0IFtzZWxlY3RlZE1vZGFsaXR5LCBzZXRTZWxlY3RlZE1vZGFsaXR5XSA9IHVzZVN0YXRlKG51bGwpO1xyXG4gIC8vIFJlcGxhY2UgdGhlIG9sZCBzaW5nbGUgY2xpZW50IHN0YXRlIHdpdGggdHdvIHNldHM6XHJcbiAgY29uc3QgW3NlbGVjdGVkQ2xpZW50RnJvbSwgc2V0U2VsZWN0ZWRDbGllbnRGcm9tXSA9IHVzZVN0YXRlKG51bGwpO1xyXG4gIGNvbnN0IFtjbGllbnRGcm9tQnV0dG9uVGV4dCwgc2V0Q2xpZW50RnJvbUJ1dHRvblRleHRdID0gdXNlU3RhdGUoXCJTZWxlY3QgT3B0aW9uXCIpO1xyXG4gIGNvbnN0IFtzZWxlY3RlZENsaWVudEN1cnJlbnQsIHNldFNlbGVjdGVkQ2xpZW50Q3VycmVudF0gPSB1c2VTdGF0ZShudWxsKTtcclxuICBjb25zdCBbY2xpZW50Q3VycmVudEJ1dHRvblRleHQsIHNldENsaWVudEN1cnJlbnRCdXR0b25UZXh0XSA9IHVzZVN0YXRlKFwiU2VsZWN0IE9wdGlvblwiKTtcclxuXHJcbiAgY29uc3QgW2NsaWVudHMsIHNldENsaWVudHNdID0gdXNlU3RhdGUoW10pO1xyXG4gIGNvbnN0IFtzaG93Q2xpZW50TW9kYWwsIHNldFNob3dDbGllbnRNb2RhbF0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgLy8gVGhpcyBzdGF0ZSB0ZWxscyB0aGUgbW9kYWwgd2hpY2ggY2xpZW50IGJveCBpcyBiZWluZyB1cGRhdGVkOiBcImZyb21cIiBvciBcImN1cnJlbnRcIlxyXG4gIGNvbnN0IFtjbGllbnRTZWxlY3Rpb25UeXBlLCBzZXRDbGllbnRTZWxlY3Rpb25UeXBlXSA9IHVzZVN0YXRlKG51bGwpO1xyXG5cclxuICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcclxuICBjb25zdCBsYWJlbEJhc2UgPSBbXCJuYW1lXCIsIFwiZGF0ZVwiLCBcIncvb1wiLCBcInAvblwiLCBcInMvblwiXTtcclxuICBjb25zdCBsYWJlbEJhc2VOYW1lcyA9IFtcIm5hbWVcIiwgXCJkYXRlXCIsIFwid29cIiwgXCJwblwiLCBcInNuXCJdO1xyXG4gIGNvbnN0IHNvcnRDaGVja0Jhc2UgPSBbZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZV07XHJcblxyXG4gIGZ1bmN0aW9uIHdpdGhTb3J0SWNvbihiYXNlTGFiZWxzLCBhY3RpdmVJbmRleCwgaXNEZXNjKSB7XHJcbiAgICByZXR1cm4gYmFzZUxhYmVscy5tYXAoKHRleHQsIGkpID0+IHtcclxuICAgICAgaWYgKGkgIT09IGFjdGl2ZUluZGV4KSByZXR1cm4gdGV4dDsgLy8gdW50b3VjaGVkXHJcbiAgICAgIGNvbnN0IGFycm93ID0gaXNEZXNjID8gXCIg4pa8XCIgOiBcIiDilrJcIjtcclxuICAgICAgcmV0dXJuIGAke3RleHR9JHthcnJvd31gO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgY29uc3QgW2xhYmVscywgc2V0TGFiZWxzXSA9IHVzZVN0YXRlKGxhYmVsQmFzZSk7XHJcbiAgY29uc3QgW3NvcnRDaGVjaywgc2V0U29ydENoZWNrXSA9IHVzZVN0YXRlKHNvcnRDaGVja0Jhc2UpO1xyXG4gIGNvbnN0IFtob3ZlckluZGV4LCBzZXRIb3ZlckluZGV4XSA9IHVzZVN0YXRlKG51bGwpO1xyXG4gIGNvbnN0IFtzZWxlY3RlZE1vZGVsLCBzZXRTZWxlY3RlZE1vZGVsXSA9IHVzZVN0YXRlKG51bGwpO1xyXG4gIGNvbnN0IFtnUG9zLCBzZXRHUG9zXSA9IHVzZVN0YXRlKG51bGwpO1xyXG4gIGNvbnN0IFtnSWRlLCBzZXRHSWRlXSA9IHVzZVN0YXRlKG51bGwpO1xyXG4gIGNvbnN0IFtpc0RlbGV0aW5nLCBzZXRJc0RlbGV0aW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuXHJcblxyXG4gIC8vIEZldGNoIGRhdGEgb24gY29tcG9uZW50IG1vdW50IGFuZCByb3V0ZSBjaGFuZ2VcclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgZmV0Y2hEYXRhKCk7XHJcbiAgfSwgW3JvdXRlci5yb3V0ZV0pO1xyXG5cclxuICBhc3luYyBmdW5jdGlvbiBmZXRjaERhdGEoKSB7XHJcbiAgICBzZXRJc0xvYWRpbmcodHJ1ZSk7XHJcbiAgICB0cnkge1xyXG4gICAgICBpZiAocm91dGVyLnF1ZXJ5LmlucHV0VGV4dCAmJiByb3V0ZXIucXVlcnkuc2VsZWN0ZWRUeXBlKSB7XHJcbiAgICAgICAgc2V0U2VsZWN0KHJvdXRlci5xdWVyeS5zZWxlY3RlZFR5cGUpO1xyXG4gICAgICAgIHNldFNlYXJjaChyb3V0ZXIucXVlcnkuaW5wdXRUZXh0KTtcclxuICAgICAgfVxyXG4gICAgICAvLyBsaWdodCByZXRyeSBmb3IgdHJhbnNpZW50IEZpcmVzdG9yZSBoaWNjdXBzXHJcbiAgICAgIGNvbnN0IGxvYWQgPSBhc3luYyAoYXR0ZW1wdCA9IDEpID0+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgcmV0dXJuIGF3YWl0IGZldGNoUGFydHNXaXRoTWFjaGluZURhdGEoKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICBpZiAoYXR0ZW1wdCA+PSAzKSB0aHJvdyBlO1xyXG4gICAgICAgICAgYXdhaXQgbmV3IFByb21pc2UociA9PiBzZXRUaW1lb3V0KHIsIDI1MCAqIE1hdGgucG93KDIsIGF0dGVtcHQgLSAxKSkpO1xyXG4gICAgICAgICAgcmV0dXJuIGxvYWQoYXR0ZW1wdCArIDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IGxvYWQoKTtcclxuICAgICAgc2V0QmFja3VwSW5mbyhkYXRhKTtcclxuICAgICAgc2V0TGFiZWxzKGxhYmVsQmFzZSk7IC8vIDwtLSBhZGQgdGhpcyBsaW5lIGFmdGVyIHNldEJhY2t1cEluZm8oZGF0YSlcclxuICAgICAgc2V0SUQoZGF0YS5tYXAoKGl0ZW0pID0+IGl0ZW0uaWQpKTtcclxuXHJcbiAgICAgIC8vIC0tLSBQcmUtYXVnbWVudDogcmVzb2x2ZSBjbGllbnQgaWRzIG9mIE1hY2hpbmUgLyBDdXJyZW50TWFjaGluZSBvbmNlIC0tLVxyXG4gICAgICBjb25zdCBkYiA9IGZpcmViYXNlLmZpcmVzdG9yZSgpO1xyXG4gICAgICBjb25zdCBtYWNoaW5lSWRzID0gW107XHJcbiAgICAgIGNvbnN0IGN1ck1hY2hpbmVJZHMgPSBbXTtcclxuICAgICAgY29uc3QgdGhlTWFjaGluZUlkcyA9IFtdOyAvLyA8LS0gQUREXHJcblxyXG4gICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgZGF0YSkge1xyXG4gICAgICAgIGlmIChpdGVtPy5NYWNoaW5lPy5pZCkgbWFjaGluZUlkcy5wdXNoKGl0ZW0uTWFjaGluZS5pZCk7XHJcbiAgICAgICAgaWYgKGl0ZW0/LkN1cnJlbnRNYWNoaW5lPy5pZCkgY3VyTWFjaGluZUlkcy5wdXNoKGl0ZW0uQ3VycmVudE1hY2hpbmUuaWQpO1xyXG4gICAgICAgIGlmIChpdGVtPy5UaGVNYWNoaW5lPy5pZCkgdGhlTWFjaGluZUlkcy5wdXNoKGl0ZW0uVGhlTWFjaGluZS5pZCk7IC8vIDwtLSBBRERcclxuICAgICAgfVxyXG4gICAgICBjb25zdCB1bmlxID0gKGFycikgPT4gWy4uLm5ldyBTZXQoYXJyKV07XHJcbiAgICAgIGNvbnN0IG1JZHMgPSB1bmlxKG1hY2hpbmVJZHMpO1xyXG4gICAgICBjb25zdCBjSWRzID0gdW5pcShjdXJNYWNoaW5lSWRzKTtcclxuXHJcbiAgICAgIGNvbnN0IGZldGNoTWFjaGluZUNsaWVudHMgPSBhc3luYyAoaWRzKSA9PiB7XHJcbiAgICAgICAgaWYgKCFpZHMubGVuZ3RoKSByZXR1cm4ge307XHJcbiAgICAgICAgY29uc3Qgb3V0ID0ge307XHJcbiAgICAgICAgLy8gRmlyZXN0b3JlIFwiaW5cIiBzdXBwb3J0cyB1cCB0byAxMCBkb2N1bWVudCBJRHMgcGVyIHF1ZXJ5XHJcbiAgICAgICAgY29uc3QgY2h1bmtzID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpZHMubGVuZ3RoOyBpICs9IDEwKSBjaHVua3MucHVzaChpZHMuc2xpY2UoaSwgaSArIDEwKSk7XHJcbiAgICAgICAgZm9yIChjb25zdCBjaHVuayBvZiBjaHVua3MpIHtcclxuICAgICAgICAgIGNvbnN0IHNuYXAgPSBhd2FpdCBkYlxyXG4gICAgICAgICAgICAuY29sbGVjdGlvbihcIk1hY2hpbmVcIilcclxuICAgICAgICAgICAgLndoZXJlKGZpcmViYXNlLmZpcmVzdG9yZS5GaWVsZFBhdGguZG9jdW1lbnRJZCgpLCBcImluXCIsIGNodW5rKVxyXG4gICAgICAgICAgICAuZ2V0KCk7XHJcbiAgICAgICAgICBzbmFwLmZvckVhY2goKGRvYykgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBtZCA9IGRvYy5kYXRhKCkgfHwge307XHJcbiAgICAgICAgICAgIG91dFtkb2MuaWRdID0gbWQuY2xpZW50Py5pZCB8fCBudWxsO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICAvLyBGZXRjaCBmdWxsIG1hY2hpbmUgZG9jcyAoT0VNL01vZGFsaXR5L01vZGVsL0NsaWVudC9ldGMuKSBmb3IgYSBzZXQgb2YgaWRzXHJcbiAgICAgIGNvbnN0IGZldGNoTWFjaGluZXNEYXRhID0gYXN5bmMgKGlkcykgPT4ge1xyXG4gICAgICAgIGlmICghaWRzLmxlbmd0aCkgcmV0dXJuIHt9O1xyXG4gICAgICAgIGNvbnN0IG91dCA9IHt9O1xyXG4gICAgICAgIGNvbnN0IGNodW5rcyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaWRzLmxlbmd0aDsgaSArPSAxMCkgY2h1bmtzLnB1c2goaWRzLnNsaWNlKGksIGkgKyAxMCkpO1xyXG4gICAgICAgIGZvciAoY29uc3QgY2h1bmsgb2YgY2h1bmtzKSB7XHJcbiAgICAgICAgICBjb25zdCBzbmFwID0gYXdhaXQgZGJcclxuICAgICAgICAgICAgLmNvbGxlY3Rpb24oXCJNYWNoaW5lXCIpXHJcbiAgICAgICAgICAgIC53aGVyZShmaXJlYmFzZS5maXJlc3RvcmUuRmllbGRQYXRoLmRvY3VtZW50SWQoKSwgXCJpblwiLCBjaHVuaylcclxuICAgICAgICAgICAgLmdldCgpO1xyXG4gICAgICAgICAgc25hcC5mb3JFYWNoKChkb2MpID0+IHtcclxuICAgICAgICAgICAgb3V0W2RvYy5pZF0gPSB7IGlkOiBkb2MuaWQsIC4uLihkb2MuZGF0YSgpIHx8IHt9KSB9O1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICAgIH07XHJcblxyXG5cclxuICAgICAgY29uc3QgW2Zyb21NYXAsIGN1ck1hcCwgdGhlTWFwXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcclxuICAgICAgICBmZXRjaE1hY2hpbmVDbGllbnRzKG1JZHMpLFxyXG4gICAgICAgIGZldGNoTWFjaGluZUNsaWVudHMoY0lkcyksXHJcbiAgICAgICAgZmV0Y2hNYWNoaW5lc0RhdGEodW5pcSh0aGVNYWNoaW5lSWRzKSksIC8vIDwtLSBub3cgY2FwdHVyZWQgYXMgdGhlTWFwXHJcbiAgICAgIF0pO1xyXG5cclxuICAgICAgLy8gTmV3LXN0eWxlIG9ubHk6IHRha2UgY2xpZW50IGlkcyBzdHJhaWdodCBmcm9tIGl0ZW0gcmVmc1xyXG4gICAgICBjb25zdCBhdWdtZW50ZWQgPSBkYXRhLm1hcCgoaXRlbSkgPT4gKHtcclxuICAgICAgICAuLi5pdGVtLFxyXG4gICAgICAgIGNsaWVudEZyb21JZDogaXRlbT8uQ2xpZW50RnJvbT8uaWQgPz8gbnVsbCxcclxuICAgICAgICBjbGllbnRDdXJyZW50SWQ6IGl0ZW0/LkNsaWVudEN1cnJlbnQ/LmlkID8/IG51bGwsXHJcbiAgICAgIH0pKTtcclxuXHJcbiAgICAgIHNldEF1Z21lbnRlZEluZm8oYXVnbWVudGVkKTtcclxuICAgICAgLy8gZGVmYXVsdCB2aWV3ID0gZXZlcnl0aGluZyBub3QgZXhwbGljaXRseSBoaWRkZW5cclxuICAgICAgc2V0SW5mbyhhdWdtZW50ZWQuZmlsdGVyKChpdCkgPT4gaXQudmlzaWJsZSAhPT0gZmFsc2UpKTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZmV0Y2hpbmcgZGF0YTpcIiwgZXJyKTtcclxuICAgICAgc2V0SW5mbyhbXSk7XHJcbiAgICAgIHNldEF1Z21lbnRlZEluZm8oW10pO1xyXG4gICAgfSBmaW5hbGx5IHtcclxuICAgICAgc2V0SXNMb2FkaW5nKGZhbHNlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbnN0IHNlYXJjaENoYW5nZUhhbmRsZXIgPSAoZXZlbnQpID0+IHNldFNlYXJjaChldmVudC50YXJnZXQudmFsdWUpO1xyXG5cclxuICAvLyBBc3luY2hyb25vdXMgZmlsdGVyIGZ1bmN0aW9uIHRoYXQgbG9vcHMgdGhyb3VnaCBiYWNrdXBJbmZvIGFuZCxcclxuICAvLyBmb3IgZWFjaCBpdGVtLCBmZXRjaGVzIGl0cyBNYWNoaW5lIGFuZCBDdXJyZW50TWFjaGluZSBkb2N1bWVudHMsXHJcbiAgLy8gdGhlbiBjb21wYXJlcyB0aGUgY2xpZW50IGlkIChmcm9tIG1hY2hpbmVEYXRhLmNsaWVudC5pZCkgdG8gdGhlIHNlbGVjdGVkIGNsaWVudC5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgZnVuY3Rpb24gZmlsdGVyUGFydHMoKSB7XHJcbiAgICAgIGNvbnN0IGJhc2UgPSBhdWdtZW50ZWRJbmZvOyAvLyBhbHJlYWR5IGhhcyBjbGllbnRGcm9tSWQvY2xpZW50Q3VycmVudElkXHJcbiAgICAgIGNvbnN0IG5vRmlsdGVycyA9XHJcbiAgICAgICAgIXNlbGVjdGVkT0VNICYmXHJcbiAgICAgICAgIXNlbGVjdGVkTW9kYWxpdHkgJiZcclxuICAgICAgICAhc2VsZWN0ZWRNb2RlbCAmJlxyXG4gICAgICAgICFzZWxlY3RlZENsaWVudEZyb20gJiZcclxuICAgICAgICAhc2VsZWN0ZWRDbGllbnRDdXJyZW50ICYmXHJcbiAgICAgICAgIXNlYXJjaDtcclxuICAgICAgaWYgKG5vRmlsdGVycykge1xyXG4gICAgICAgIHNldEluZm8oYmFzZS5maWx0ZXIoKGl0KSA9PiBpdC52aXNpYmxlICE9PSBmYWxzZSkpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgZmlsdGVyZWQgPSBiYXNlLmZpbHRlcigoaXRlbSkgPT4ge1xyXG4gICAgICAgIC8vIG9ubHkgaGlkZSB3aGVuIGV4cGxpY2l0bHkgZmFsc2VcclxuICAgICAgICBpZiAoaXRlbS52aXNpYmxlID09PSBmYWxzZSkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICAvLyBPRU0vbW9kYWxpdHkvbW9kZWwgdmlhIG1hY2hpbmVEYXRhICh5b3UgYWxyZWFkeSBwdXQgdGhpcyBpbiBpdGVtcylcclxuICAgICAgICAvLyBPRU0gLyBNb2RhbGl0eSAvIE1vZGVsIGZpbHRlcmluZ1xyXG4gICAgICAgIC8vIFByZWZlciBtYWNoaW5lRGF0YTsgZmFsbCBiYWNrIHRvIHRoZU1hY2hpbmVEYXRhOyBmaW5hbGx5IHRyeSBpbmxpbmUgVGhlTWFjaGluZSBpZiBpdCBoYXMgcGxhaW4gZmllbGRzXHJcbiAgICAgICAgY29uc3QgT0VNID0gaXRlbT8ubWFjaGluZURhdGE/Lk9FTVxyXG4gICAgICAgICAgPz8gaXRlbT8udGhlTWFjaGluZURhdGE/Lk9FTVxyXG4gICAgICAgICAgPz8gaXRlbT8uVGhlTWFjaGluZT8uT0VNO1xyXG4gICAgICAgIGNvbnN0IE1vZGFsaXR5ID0gaXRlbT8ubWFjaGluZURhdGE/Lk1vZGFsaXR5XHJcbiAgICAgICAgICA/PyBpdGVtPy50aGVNYWNoaW5lRGF0YT8uTW9kYWxpdHlcclxuICAgICAgICAgID8/IGl0ZW0/LlRoZU1hY2hpbmU/Lk1vZGFsaXR5O1xyXG4gICAgICAgIGNvbnN0IE1vZGVsID0gaXRlbT8ubWFjaGluZURhdGE/Lk1vZGVsXHJcbiAgICAgICAgICA/PyBpdGVtPy50aGVNYWNoaW5lRGF0YT8uTW9kZWxcclxuICAgICAgICAgID8/IGl0ZW0/LlRoZU1hY2hpbmU/Lk1vZGVsO1xyXG5cclxuICAgICAgICBpZiAoc2VsZWN0ZWRPRU0gJiYgT0VNICE9PSBzZWxlY3RlZE9FTSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIGlmIChzZWxlY3RlZE1vZGFsaXR5ICYmIE1vZGFsaXR5ICE9PSBzZWxlY3RlZE1vZGFsaXR5KSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgaWYgKHNlbGVjdGVkTW9kZWwgJiYgTW9kZWwgIT09IHNlbGVjdGVkTW9kZWwpIHJldHVybiBmYWxzZTtcclxuXHJcblxyXG4gICAgICAgIC8vIENsaWVudCBmaWx0ZXJzIChub3cgaW5zdGFudClcclxuICAgICAgICBpZiAoc2VsZWN0ZWRDbGllbnRGcm9tICYmIGl0ZW0uY2xpZW50RnJvbUlkICE9PSBzZWxlY3RlZENsaWVudEZyb20pIHJldHVybiBmYWxzZTtcclxuICAgICAgICBpZiAoc2VsZWN0ZWRDbGllbnRDdXJyZW50ICYmIGl0ZW0uY2xpZW50Q3VycmVudElkICE9PSBzZWxlY3RlZENsaWVudEN1cnJlbnQpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgLy8gU2VhcmNoXHJcbiAgICAgICAgaWYgKHNlYXJjaCkge1xyXG4gICAgICAgICAgY29uc3QgcyA9IFN0cmluZyhzZWFyY2gpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICBpZiAoc2VsZWN0ID09PSBcIk5hbWVcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gKGl0ZW0ubmFtZSB8fCBcIlwiKS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHMpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKHNlbGVjdCA9PT0gXCJEYXRlXCIpIHtcclxuICAgICAgICAgICAgLy8gSWYgdXNlciBoYXNuJ3QgcGlja2VkIGEgZGF0ZSB5ZXQsIGRvbid0IGhpZGUgYW55dGhpbmdcclxuICAgICAgICAgICAgaWYgKCFzZWFyY2gpIHJldHVybiB0cnVlO1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgd2FudGVkRGF5ID0gc2VhcmNoOyAvLyBhbHJlYWR5ICd5eXl5LW1tLWRkJyBmcm9tIDxpbnB1dCB0eXBlPVwiZGF0ZVwiPlxyXG5cclxuICAgICAgICAgICAgLy8gMSkgTWF0Y2ggaXRlbS5kYXRlLCByZWdhcmRsZXNzIG9mIGl0cyBmb3JtYXQgb3IgdHlwZVxyXG4gICAgICAgICAgICBjb25zdCBpdGVtWU1EID0gdG9ZTUQoaXRlbS5kYXRlKTtcclxuICAgICAgICAgICAgaWYgKGl0ZW1ZTUQgJiYgaXRlbVlNRCA9PT0gd2FudGVkRGF5KSByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIC8vIDIpIEFsc28gY2hlY2sgYW55IGRlc2NyaXB0aW9uIGRhdGVzIChpZiB5b3Ugc3RvcmUgZGF0ZXMgdGhlcmUpXHJcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGl0ZW0uZGVzY3JpcHRpb25zKSkge1xyXG4gICAgICAgICAgICAgIGNvbnN0IGhpdERlc2MgPSBpdGVtLmRlc2NyaXB0aW9ucy5zb21lKChkKSA9PiB0b1lNRChkPy5kYXRlKSA9PT0gd2FudGVkRGF5KTtcclxuICAgICAgICAgICAgICBpZiAoaGl0RGVzYykgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIDMpIEFuZCB3b3JrIG9yZGVyIGRhdGVzIChpZiBwcmVzZW50KVxyXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShpdGVtLndvcmtPcmRlcnMpKSB7XHJcbiAgICAgICAgICAgICAgY29uc3QgaGl0V08gPSBpdGVtLndvcmtPcmRlcnMuc29tZSgodykgPT4gdG9ZTUQodz8uZGF0ZSkgPT09IHdhbnRlZERheSk7XHJcbiAgICAgICAgICAgICAgaWYgKGhpdFdPKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChzZWxlY3QgPT09IFwiV29yayBPcmRlclwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KGl0ZW0ud29ya09yZGVycykgJiZcclxuICAgICAgICAgICAgICBpdGVtLndvcmtPcmRlcnMuc29tZSgod28pID0+IFN0cmluZyh3by53b3JrT3JkZXIgfHwgXCJcIikudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhzKSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoc2VsZWN0ID09PSBcIlByb2R1Y3QgTnVtYmVyXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFN0cmluZyhpdGVtLnBuIHx8IFwiXCIpLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMocyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoc2VsZWN0ID09PSBcIkRlc2NyaXB0aW9uXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFN0cmluZyhpdGVtLmRlc2MgfHwgXCJcIikudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhzKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChzZWxlY3QgPT09IFwiU0tVXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFN0cmluZyhpdGVtLmlkIHx8IFwiXCIpLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMocyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9KTtcclxuICAgICAgc2V0SW5mbyhmaWx0ZXJlZCk7XHJcbiAgICB9XHJcbiAgICBmaWx0ZXJQYXJ0cygpO1xyXG4gIH0sIFtzZWxlY3RlZE9FTSwgc2VsZWN0ZWRNb2RhbGl0eSwgc2VsZWN0ZWRDbGllbnRGcm9tLCBzZWxlY3RlZENsaWVudEN1cnJlbnQsIHNlbGVjdGVkTW9kZWwsIHNlYXJjaCwgc2VsZWN0LCBhdWdtZW50ZWRJbmZvXSk7XHJcblxyXG4gIGZ1bmN0aW9uIHNvcnRDaGVja0FsbChwb3MpIHtcclxuICAgIC8vIERldGVybWluZSBuZXh0IGRpcmVjdGlvbjogdG9nZ2xlIHRoZSBjbGlja2VkIGNvbHVtbiBvbmx5XHJcbiAgICBjb25zdCBuZXh0U29ydENoZWNrID0gc29ydENoZWNrLm1hcCgodiwgaSkgPT4gKGkgPT09IHBvcyA/ICF2IDogdikpO1xyXG4gICAgY29uc3QgaXNEZXNjID0gbmV4dFNvcnRDaGVja1twb3NdOyAvLyB0cnVlIG1lYW5zIGRlc2NlbmRpbmdcclxuXHJcbiAgICBjb25zdCBzb3J0ZWRJbmZvID0gWy4uLmluZm9dLnNvcnQoKGEsIGIpID0+IHtcclxuICAgICAgY29uc3Qga2V5ID0gbGFiZWxCYXNlTmFtZXNbcG9zXTtcclxuXHJcbiAgICAgIGlmIChwb3MgPT09IDEpIHtcclxuICAgICAgICAvLyBEQVRFIGNvbHVtblxyXG4gICAgICAgIGNvbnN0IHRhID0gdG9UaW1lKGFba2V5XSk7XHJcbiAgICAgICAgY29uc3QgdGIgPSB0b1RpbWUoYltrZXldKTtcclxuXHJcbiAgICAgICAgLy8gUHV0IG1pc3NpbmcgZGF0ZXMgYXQgdGhlIGVuZCBmb3IgYXNjZW5kaW5nLCBhdCB0aGUgc3RhcnQgZm9yIGRlc2NlbmRpbmdcclxuICAgICAgICBpZiAodGEgPT09IG51bGwgJiYgdGIgPT09IG51bGwpIHJldHVybiAwO1xyXG4gICAgICAgIGlmICh0YSA9PT0gbnVsbCkgcmV0dXJuIGlzRGVzYyA/IC0xIDogMTtcclxuICAgICAgICBpZiAodGIgPT09IG51bGwpIHJldHVybiBpc0Rlc2MgPyAxIDogLTE7XHJcblxyXG4gICAgICAgIHJldHVybiBpc0Rlc2MgPyAodGIgLSB0YSkgOiAodGEgLSB0Yik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIE5BTUUgb3IgU0tVIChzdHJpbmcteSBjb2x1bW5zKTogaW5kZXhlcyAwIG9yIDUgaW4geW91ciBvcmlnaW5hbCBsb2dpY1xyXG4gICAgICBpZiAocG9zID09PSAwIHx8IHBvcyA9PT0gNSkge1xyXG4gICAgICAgIGNvbnN0IGF2ID0gKGFba2V5XSA/PyBcIlwiKS50b1N0cmluZygpO1xyXG4gICAgICAgIGNvbnN0IGJ2ID0gKGJba2V5XSA/PyBcIlwiKS50b1N0cmluZygpO1xyXG4gICAgICAgIHJldHVybiBpc0Rlc2MgPyBidi5sb2NhbGVDb21wYXJlKGF2KSA6IGF2LmxvY2FsZUNvbXBhcmUoYnYpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBOdW1lcmljLWlzaCBjb2x1bW5zICh3bywgcG4sIHNuKSDigJQgZmFsbCBiYWNrIHRvIHN0cmluZyBjb21wYXJlIGlmIE5hTlxyXG4gICAgICBjb25zdCBhbiA9IE51bWJlcihhW2tleV0pO1xyXG4gICAgICBjb25zdCBibiA9IE51bWJlcihiW2tleV0pO1xyXG5cclxuICAgICAgaWYgKCFpc05hTihhbikgJiYgIWlzTmFOKGJuKSkge1xyXG4gICAgICAgIHJldHVybiBpc0Rlc2MgPyAoYm4gLSBhbikgOiAoYW4gLSBibik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc3QgYXYgPSAoYVtrZXldID8/IFwiXCIpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgY29uc3QgYnYgPSAoYltrZXldID8/IFwiXCIpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgcmV0dXJuIGlzRGVzYyA/IGJ2LmxvY2FsZUNvbXBhcmUoYXYpIDogYXYubG9jYWxlQ29tcGFyZShidik7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHNldEluZm8oc29ydGVkSW5mbyk7XHJcbiAgICBzZXRTb3J0Q2hlY2sobmV4dFNvcnRDaGVjayk7XHJcblxyXG4gICAgLy8gVXBkYXRlIGhlYWRlciBsYWJlbHMgdG8gc2hvdyB0aGUgbGl0dGxlIGFycm93IG9uIHRoZSBhY3RpdmUgY29sdW1uXHJcbiAgICBzZXRMYWJlbHMod2l0aFNvcnRJY29uKGxhYmVsQmFzZSwgcG9zLCBpc0Rlc2MpKTtcclxuICB9XHJcblxyXG5cclxuICBjb25zdCByb3dTZWxlY3QgPSAoaXRlbSkgPT4ge1xyXG4gICAgaWYgKGl0ZW0gJiYgaXRlbS5pZCkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIlNlbGVjdGVkIGl0ZW06XCIsIGl0ZW0pO1xyXG4gICAgICByb3V0ZXIucHVzaChcIi4vaXRlbS9cIiArIGl0ZW0uaWQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5lcnJvcihcIlVuYWJsZSB0byBkZXRlcm1pbmUgdGhlIHNlbGVjdGVkIGl0ZW3igJlzIElEOiBcIiwgaXRlbSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgW3NlbGVjdGVkSXRlbXMsIHNldFNlbGVjdGVkSXRlbXNdID0gdXNlU3RhdGUoW10pO1xyXG4gIGNvbnN0IFtzaG93RGVsZXRlTW9kYWwsIHNldFNob3dEZWxldGVNb2RhbF0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZVNlbGVjdEl0ZW0gPSAoaWQpID0+IHtcclxuICAgIHNldFNlbGVjdGVkSXRlbXMocHJldiA9PlxyXG4gICAgICBwcmV2LmluY2x1ZGVzKGlkKSA/IHByZXYuZmlsdGVyKHggPT4geCAhPT0gaWQpIDogWy4uLnByZXYsIGlkXVxyXG4gICAgKTtcclxuICB9O1xyXG5cclxuXHJcbiAgLy8gc2V0U2VsZWN0ZWRJdGVtcygocHJldikgPT4ge1xyXG4gIC8vICAgY29uc3QgbmV3U2VsZWN0aW9uID0gcHJldi5pbmNsdWRlcyhpZClcclxuICAvLyAgICAgPyBwcmV2LmZpbHRlcigoaXRlbUlkKSA9PiBpdGVtSWQgIT09IGlkKVxyXG4gIC8vICAgICA6IFsuLi5wcmV2LCBpZF07XHJcbiAgLy8gICBjb25zb2xlLmxvZyhcIlNlbGVjdGVkIGl0ZW1zOlwiLCBuZXdTZWxlY3Rpb24pO1xyXG4gIC8vICAgcmV0dXJuIG5ld1NlbGVjdGlvbjsgLy8gPC0gaW1wb3J0YW50XHJcbiAgLy8gfSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZVNob3dEZWxldGVNb2RhbCA9ICgpID0+IHNldFNob3dEZWxldGVNb2RhbCh0cnVlKTtcclxuICBjb25zdCBoYW5kbGVDbG9zZURlbGV0ZU1vZGFsID0gKCkgPT4gc2V0U2hvd0RlbGV0ZU1vZGFsKGZhbHNlKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlRGVsZXRlU2VsZWN0ZWQgPSBhc3luYyAoKSA9PiB7XHJcbiAgICBzZXRJc0RlbGV0aW5nKHRydWUpO1xyXG4gICAgY29uc3QgZGIgPSBmaXJlYmFzZS5maXJlc3RvcmUoKTtcclxuICAgIHRyeSB7XHJcbiAgICAgIC8vIExvb3Agb3ZlciBlYWNoIHNlbGVjdGVkIGl0ZW0gb25lIGF0IGEgdGltZVxyXG4gICAgICBmb3IgKGNvbnN0IGl0ZW1JZCBvZiBzZWxlY3RlZEl0ZW1zKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coaXRlbUlkKVxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAvLyBEZWxldGUgZnJvbSBcIlRlc3RcIiBjb2xsZWN0aW9uXHJcbiAgICAgICAgICBhd2FpdCBkYi5jb2xsZWN0aW9uKFwiVGVzdFwiKS5kb2MoaXRlbUlkKS5kZWxldGUoKTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEVycm9yIGRlbGV0aW5nIGRvY3VtZW50ICR7aXRlbUlkfSBmcm9tIFRlc3Q6YCwgZXJyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIC8vIERlbGV0ZSBmcm9tIFwiUGFydHNcIiBjb2xsZWN0aW9uXHJcbiAgICAgICAgICBhd2FpdCBkYi5jb2xsZWN0aW9uKFwiUGFydHNcIikuZG9jKGl0ZW1JZCkuZGVsZXRlKCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGBFcnJvciBkZWxldGluZyBkb2N1bWVudCAke2l0ZW1JZH0gZnJvbSBQYXJ0czpgLCBlcnIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgLy8gRGVsZXRlIGFzc29jaWF0ZWQgcGhvdG9zIGZyb20gc3RvcmFnZVxyXG4gICAgICAgICAgYXdhaXQgZGVsZXRlRnJvbVN0b3JhZ2UoaXRlbUlkKTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEVycm9yIGRlbGV0aW5nIHN0b3JhZ2UgZm9yICR7aXRlbUlkfTpgLCBlcnIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICAvLyBVcGRhdGUgbG9jYWwgc3RhdGUgYnkgZmlsdGVyaW5nIG91dCB0aGUgZGVsZXRlZCBpdGVtc1xyXG4gICAgICBzZXRJbmZvKGluZm8uZmlsdGVyKChpdGVtKSA9PiAhc2VsZWN0ZWRJdGVtcy5pbmNsdWRlcyhpdGVtLmlkKSkpO1xyXG4gICAgICBzZXRTZWxlY3RlZEl0ZW1zKFtdKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBkZWxldGluZyBpdGVtczpcIiwgZXJyb3IpO1xyXG4gICAgfSBmaW5hbGx5IHtcclxuICAgICAgc2V0SXNEZWxldGluZyhmYWxzZSk7XHJcbiAgICAgIGhhbmRsZUNsb3NlRGVsZXRlTW9kYWwoKTtcclxuICAgICAgLy8gT3B0aW9uYWxseSwgcmVsb2FkIHRoZSBwYWdlXHJcbiAgICAgIC8vIHJvdXRlci5yZWxvYWQoKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuXHJcbiAgY29uc3QgaGFuZGxlQ2xvc2UgPSAoKSA9PiBzZXRTaG93KGZhbHNlKTtcclxuICBjb25zdCBoYW5kbGVTaG93ID0gKCkgPT4gc2V0U2hvdyh0cnVlKTtcclxuXHJcbiAgY29uc3QgY2hlY2tEZWxldGUgPSAoZXZlbnQsIHBvcywgaWRzVG9EZWxldGUsIG5hbWUpID0+IHtcclxuICAgIGlmIChldmVudCkge1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH1cclxuICAgIGNvbnNvbGUubG9nKFwiU2VsZWN0ZWQgSURzIHRvIGRlbGV0ZTpcIiwgaWRzVG9EZWxldGUpO1xyXG4gICAgc2V0U2VsZWN0ZWRJdGVtcyhpZHNUb0RlbGV0ZSk7XHJcbiAgICBzZXRESXRlbShuYW1lKTtcclxuICAgIHNldFNob3dEZWxldGVNb2RhbCh0cnVlKTtcclxuICB9O1xyXG5cclxuICAvLyBjb25zdCBoYW5kbGVEZWxldGUgPSBhc3luYyAoKSA9PiB7XHJcbiAgLy8gICBsZXQgaXRlbUlkID0gZ0lkZTtcclxuICAvLyAgIHRyeSB7XHJcbiAgLy8gICAgIHNldElzRGVsZXRpbmcodHJ1ZSk7XHJcbiAgLy8gICAgIGNvbnN0IGRiID0gZmlyZWJhc2UuZmlyZXN0b3JlKCk7XHJcbiAgLy8gICAgIGF3YWl0IGRiLmNvbGxlY3Rpb24oXCJUZXN0XCIpLmRvYyhpdGVtSWQpLmRlbGV0ZSgpO1xyXG4gIC8vICAgICBhd2FpdCBkZWxldGVGcm9tUGFydHNDb2xsZWN0aW9uKGl0ZW1JZCk7XHJcbiAgLy8gICAgIGF3YWl0IGRlbGV0ZUZyb21TdG9yYWdlKGl0ZW1JZCk7XHJcbiAgLy8gICAgIHNldEluZm8oaW5mby5maWx0ZXIoKF8sIGkpID0+IGdQb3MgIT09IGkpKTtcclxuICAvLyAgICAgY29uc29sZS5sb2coYERlbGV0ZWQgaXRlbTogJHtpdGVtSWR9YCk7XHJcbiAgLy8gICB9IGNhdGNoIChlcnJvcikge1xyXG4gIC8vICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZGVsZXRpbmcgaXRlbTpcIiwgZXJyb3IpO1xyXG4gIC8vICAgfSBmaW5hbGx5IHtcclxuICAvLyAgICAgc2V0SXNEZWxldGluZyhmYWxzZSk7XHJcbiAgLy8gICB9XHJcbiAgLy8gICBoYW5kbGVDbG9zZSgpO1xyXG4gIC8vIH07XHJcblxyXG4gIGNvbnN0IGhvdmVyU3R5bGUgPSAoaW5kZXgpID0+ICh7XHJcbiAgICBiYWNrZ3JvdW5kQ29sb3I6IGhvdmVySW5kZXggPT09IGluZGV4ID8gXCIjZGRkXCIgOiBcInRyYW5zcGFyZW50XCIsXHJcbiAgICB0ZXh0QWxpZ246IFwiY2VudGVyXCIsXHJcbiAgICBjdXJzb3I6IFwiZGVmYXVsdFwiLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBbZHJvcGRvd24xVGV4dCwgc2V0RHJvcGRvd24xVGV4dF0gPSB1c2VTdGF0ZShcIlNlbGVjdCBPcHRpb25cIik7XHJcbiAgY29uc3QgW2Ryb3Bkb3duMlRleHQsIHNldERyb3Bkb3duMlRleHRdID0gdXNlU3RhdGUoXCJTZWxlY3QgT3B0aW9uXCIpO1xyXG5cclxuICBjb25zdCBoYW5kbGVTZWxlY3QxID0gKGV2ZW50S2V5LCBldmVudCkgPT4ge1xyXG4gICAgaWYgKGV2ZW50S2V5ID09PSBcInVuYXNzaWduZWRcIikge1xyXG4gICAgICBzZXREcm9wZG93bjFUZXh0KFwiU2VsZWN0IE9wdGlvblwiKTtcclxuICAgICAgc2V0U2VsZWN0ZWRPRU0obnVsbCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzZXREcm9wZG93bjFUZXh0KGV2ZW50LnRhcmdldC50ZXh0Q29udGVudCk7XHJcbiAgICAgIHNldFNlbGVjdGVkT0VNKGV2ZW50LnRhcmdldC50ZXh0Q29udGVudCk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaGFuZGxlU2VsZWN0MiA9IChldmVudEtleSwgZXZlbnQpID0+IHtcclxuICAgIGlmIChldmVudEtleSA9PT0gXCJ1bmFzc2lnbmVkXCIpIHtcclxuICAgICAgc2V0RHJvcGRvd24yVGV4dChcIlNlbGVjdCBPcHRpb25cIik7XHJcbiAgICAgIHNldFNlbGVjdGVkTW9kYWxpdHkobnVsbCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzZXREcm9wZG93bjJUZXh0KGV2ZW50LnRhcmdldC50ZXh0Q29udGVudCk7XHJcbiAgICAgIHNldFNlbGVjdGVkTW9kYWxpdHkoZXZlbnQudGFyZ2V0LnRleHRDb250ZW50KTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICAvLyBCdWlsZCBhIHVuaXF1ZSBsaXN0IG9mIGNsaWVudHMgZnJvbSB0aGUgaXRlbXMgY3VycmVudGx5IGxvYWRlZCwgZmlsdGVyZWQgYnkgT0VNL01vZGFsaXR5LlxyXG4gIC8vIGB0eXBlYCBpcyBcImZyb21cIiBvciBcImN1cnJlbnRcIiB0byBkZWNpZGUgd2hpY2ggY2xpZW50IHJlZiB0byByZWFkLlxyXG4gIGFzeW5jIGZ1bmN0aW9uIGJ1aWxkQ2xpZW50c0Zyb21JdGVtcyh0eXBlKSB7XHJcbiAgICBjb25zdCBkYiA9IGZpcmViYXNlLmZpcmVzdG9yZSgpO1xyXG4gICAgY29uc3QgaWRzID0gbmV3IFNldCgpO1xyXG5cclxuICAgIC8vIFJlc3BlY3QgY3VycmVudCBPRU0gLyBNb2RhbGl0eSBmaWx0ZXJzIHdoZW4gZGVyaXZpbmcgY2xpZW50IG9wdGlvbnNcclxuICAgIGNvbnN0IGZpbHRlcmVkID0gYXVnbWVudGVkSW5mby5maWx0ZXIoKGl0ZW0pID0+IHtcclxuICAgICAgY29uc3QgT0VNID0gaXRlbT8ubWFjaGluZURhdGE/Lk9FTSA/PyBpdGVtPy5PRU0gPz8gbnVsbDtcclxuICAgICAgY29uc3QgTW9kYWxpdHkgPSBpdGVtPy5tYWNoaW5lRGF0YT8uTW9kYWxpdHkgPz8gaXRlbT8uTW9kYWxpdHkgPz8gbnVsbDtcclxuICAgICAgaWYgKHNlbGVjdGVkT0VNICYmIE9FTSAhPT0gc2VsZWN0ZWRPRU0pIHJldHVybiBmYWxzZTtcclxuICAgICAgaWYgKHNlbGVjdGVkTW9kYWxpdHkgJiYgTW9kYWxpdHkgIT09IHNlbGVjdGVkTW9kYWxpdHkpIHJldHVybiBmYWxzZTtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9KTtcclxuXHJcbiAgICBmb3IgKGNvbnN0IGl0IG9mIGZpbHRlcmVkKSB7XHJcbiAgICAgIGNvbnN0IGlkID0gdHlwZSA9PT0gXCJmcm9tXCIgPyBpdC5jbGllbnRGcm9tSWQgOiBpdC5jbGllbnRDdXJyZW50SWQ7XHJcbiAgICAgIGlmIChpZCkgaWRzLmFkZChpZCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgb3V0ID0gW107XHJcbiAgICBjb25zdCBpZEFycmF5ID0gWy4uLmlkc107XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGlkQXJyYXkubGVuZ3RoOyBpICs9IDEwKSB7XHJcbiAgICAgIGNvbnN0IGNodW5rID0gaWRBcnJheS5zbGljZShpLCBpICsgMTApO1xyXG4gICAgICBjb25zdCBzbmFwID0gYXdhaXQgZGJcclxuICAgICAgICAuY29sbGVjdGlvbihcIkNsaWVudFwiKVxyXG4gICAgICAgIC53aGVyZShmaXJlYmFzZS5maXJlc3RvcmUuRmllbGRQYXRoLmRvY3VtZW50SWQoKSwgXCJpblwiLCBjaHVuaylcclxuICAgICAgICAuZ2V0KCk7XHJcbiAgICAgIHNuYXAuZm9yRWFjaCgoZG9jKSA9PiB7XHJcbiAgICAgICAgY29uc3QgZCA9IGRvYy5kYXRhKCkgfHwge307XHJcbiAgICAgICAgb3V0LnB1c2goeyBpZDogZG9jLmlkLCBuYW1lOiBkLm5hbWUgfHwgZG9jLmlkIH0pO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBzb3J0IGJ5IG5hbWUgZm9yIG5pY2VyIFVYXHJcbiAgICBvdXQuc29ydCgoYSwgYikgPT4gKGEubmFtZSB8fCBcIlwiKS5sb2NhbGVDb21wYXJlKGIubmFtZSB8fCBcIlwiKSk7XHJcbiAgICByZXR1cm4gb3V0O1xyXG4gIH1cclxuXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQ0xJRU5UIFNFTEVDVElPTiBIQU5ETElOR1xyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gVGhpcyBmdW5jdGlvbiBmZXRjaGVzIGNsaWVudHMgYW5kIG9wZW5zIHRoZSBjbGllbnQgbW9kYWwuXHJcbiAgY29uc3QgaGFuZGxlQ2xpZW50Q2xpY2sgPSBhc3luYyAoKSA9PiB7XHJcbiAgICBsZXQgc2FmZUNsaWVudHMgPSBbXTtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IGNsaWVudHNEYXRhID0gYXdhaXQgZmV0Y2hDbGllbnRzKHNlbGVjdGVkT0VNLCBzZWxlY3RlZE1vZGFsaXR5KTtcclxuICAgICAgc2FmZUNsaWVudHMgPSBBcnJheS5pc0FycmF5KGNsaWVudHNEYXRhKSA/IGNsaWVudHNEYXRhIDogW107XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJmZXRjaENsaWVudHMgZmFpbGVkOlwiLCBlKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBGYWxsYmFjayB0byBidWlsZGluZyBmcm9tIGxvYWRlZCBpdGVtcyBpZiBBUEkgZ2F2ZSB1cyBub3RoaW5nXHJcbiAgICBpZiAoc2FmZUNsaWVudHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgaWYgKCFjbGllbnRTZWxlY3Rpb25UeXBlKSB7XHJcbiAgICAgICAgICAvLyBpZiBzb21laG93IG5vdCBzZXQgeWV0LCBkZWZhdWx0IHRvIFwiZnJvbVwiXHJcbiAgICAgICAgICBzZXRDbGllbnRTZWxlY3Rpb25UeXBlKFwiZnJvbVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgZGVyaXZlZCA9IGF3YWl0IGJ1aWxkQ2xpZW50c0Zyb21JdGVtcyhjbGllbnRTZWxlY3Rpb25UeXBlIHx8IFwiZnJvbVwiKTtcclxuICAgICAgICBzYWZlQ2xpZW50cyA9IGRlcml2ZWQ7XHJcbiAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFsbGJhY2sgYnVpbGRDbGllbnRzRnJvbUl0ZW1zIGZhaWxlZDpcIiwgZSk7XHJcbiAgICAgICAgc2FmZUNsaWVudHMgPSBbXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNldENsaWVudHMoc2FmZUNsaWVudHMpO1xyXG4gICAgc2V0Q2xpZW50U2VhcmNoVGVybShcIlwiKTtcclxuICAgIHNldFNob3dDbGllbnRNb2RhbCh0cnVlKTtcclxuICB9O1xyXG5cclxuXHJcblxyXG4gIC8vIFdoZW4gYSBjbGllbnQgaXMgc2VsZWN0ZWQgaW4gdGhlIG1vZGFsLCB3ZSBub3cgYXNzdW1lIHRoZSBwYXJhbWV0ZXIgaXMgYSBjbGllbnQgSUQuXHJcbiAgLy8gSWYgdGhlIHBhc3NlZCB2YWx1ZSBpcyBudWxsLCB3ZSBjbGVhciB0aGUgc2VsZWN0aW9uLlxyXG4gIGNvbnN0IGhhbmRsZUNsaWVudFNlbGVjdCA9IGFzeW5jIChjbGllbnRJZCkgPT4ge1xyXG4gICAgY29uc29sZS5sb2coXCJVc2VyIHNlbGVjdGVkIGNsaWVudCBpZDpcIiwgY2xpZW50SWQpO1xyXG4gICAgaWYgKCFjbGllbnRJZCkge1xyXG4gICAgICBpZiAoY2xpZW50U2VsZWN0aW9uVHlwZSA9PT0gXCJmcm9tXCIpIHtcclxuICAgICAgICBzZXRDbGllbnRGcm9tQnV0dG9uVGV4dChcIlNlbGVjdCBPcHRpb25cIik7XHJcbiAgICAgICAgc2V0U2VsZWN0ZWRDbGllbnRGcm9tKG51bGwpO1xyXG4gICAgICB9IGVsc2UgaWYgKGNsaWVudFNlbGVjdGlvblR5cGUgPT09IFwiY3VycmVudFwiKSB7XHJcbiAgICAgICAgc2V0Q2xpZW50Q3VycmVudEJ1dHRvblRleHQoXCJTZWxlY3QgT3B0aW9uXCIpO1xyXG4gICAgICAgIHNldFNlbGVjdGVkQ2xpZW50Q3VycmVudChudWxsKTtcclxuICAgICAgfVxyXG4gICAgICBzZXRTaG93Q2xpZW50TW9kYWwoZmFsc2UpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBjbGllbnRTbmFwID0gYXdhaXQgZmlyZWJhc2UuZmlyZXN0b3JlKCkuY29sbGVjdGlvbihcIkNsaWVudFwiKS5kb2MoY2xpZW50SWQpLmdldCgpO1xyXG4gICAgICBpZiAoY2xpZW50U25hcC5leGlzdHMpIHtcclxuICAgICAgICBjb25zdCBjbGllbnREYXRhID0gY2xpZW50U25hcC5kYXRhKCk7XHJcbiAgICAgICAgaWYgKGNsaWVudFNlbGVjdGlvblR5cGUgPT09IFwiZnJvbVwiKSB7XHJcbiAgICAgICAgICBzZXRDbGllbnRGcm9tQnV0dG9uVGV4dChjbGllbnREYXRhLm5hbWUpO1xyXG4gICAgICAgICAgc2V0U2VsZWN0ZWRDbGllbnRGcm9tKGNsaWVudElkKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGNsaWVudFNlbGVjdGlvblR5cGUgPT09IFwiY3VycmVudFwiKSB7XHJcbiAgICAgICAgICBzZXRDbGllbnRDdXJyZW50QnV0dG9uVGV4dChjbGllbnREYXRhLm5hbWUpO1xyXG4gICAgICAgICAgc2V0U2VsZWN0ZWRDbGllbnRDdXJyZW50KGNsaWVudElkKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIk5vIGNsaWVudCBkb2N1bWVudCBmb3VuZCBmb3IgaWQ6XCIsIGNsaWVudElkKTtcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGZldGNoaW5nIGNsaWVudCBkYXRhOlwiLCBlcnJvcik7XHJcbiAgICB9XHJcbiAgICBzZXRTaG93Q2xpZW50TW9kYWwoZmFsc2UpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGhhbmRsZUNsaWVudEluZm8gPSAoY2xpZW50SWQsIGNsaWVudE5hbWUpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKGBDbGllbnQgSUQ6ICR7Y2xpZW50SWR9LCBDbGllbnQgTmFtZTogJHtjbGllbnROYW1lfWApO1xyXG4gICAgcm91dGVyLnB1c2goXCJjbGllbnQvXCIgKyBjbGllbnRJZCk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQ2xlYXJDbGllbnRTZWxlY3Rpb24gPSAoKSA9PiB7XHJcbiAgICBpZiAoY2xpZW50U2VsZWN0aW9uVHlwZSA9PT0gXCJmcm9tXCIpIHtcclxuICAgICAgc2V0Q2xpZW50RnJvbUJ1dHRvblRleHQoXCJTZWxlY3QgT3B0aW9uXCIpO1xyXG4gICAgICBzZXRTZWxlY3RlZENsaWVudEZyb20obnVsbCk7XHJcbiAgICB9IGVsc2UgaWYgKGNsaWVudFNlbGVjdGlvblR5cGUgPT09IFwiY3VycmVudFwiKSB7XHJcbiAgICAgIHNldENsaWVudEN1cnJlbnRCdXR0b25UZXh0KFwiU2VsZWN0IE9wdGlvblwiKTtcclxuICAgICAgc2V0U2VsZWN0ZWRDbGllbnRDdXJyZW50KG51bGwpO1xyXG4gICAgfVxyXG4gICAgc2V0U2hvd0NsaWVudE1vZGFsKGZhbHNlKTtcclxuICB9O1xyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIE1PREVMIFNFTEVDVElPTiBIQU5ETElOR1xyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgY29uc3QgW21vZGVscywgc2V0TW9kZWxzXSA9IHVzZVN0YXRlKFtdKTtcclxuICBjb25zdCBbc2hvd01vZGVsTW9kYWwsIHNldFNob3dNb2RlbE1vZGFsXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbbW9kZWxCdXR0b25UZXh0LCBzZXRNb2RlbEJ1dHRvblRleHRdID0gdXNlU3RhdGUoXCJTZWxlY3QgT3B0aW9uXCIpO1xyXG5cclxuICBjb25zdCBoYW5kbGVNb2RlbENsaWNrID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgY29uc3QgbW9kZWxzRGF0YSA9IGF3YWl0IGZldGNoTW9kZWxzKFxyXG4gICAgICBzZWxlY3RlZE9FTSxcclxuICAgICAgc2VsZWN0ZWRNb2RhbGl0eSxcclxuICAgICAgc2VsZWN0ZWRDbGllbnRGcm9tXHJcbiAgICApO1xyXG4gICAgc2V0TW9kZWxzKG1vZGVsc0RhdGEpO1xyXG4gICAgc2V0TW9kZWxTZWFyY2hUZXJtKFwiXCIpO1xyXG4gICAgc2V0U2hvd01vZGVsTW9kYWwodHJ1ZSk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaGFuZGxlTW9kZWxTZWxlY3QgPSAobW9kZWxOYW1lKSA9PiB7XHJcbiAgICBzZXRNb2RlbEJ1dHRvblRleHQobW9kZWxOYW1lIHx8IFwiU2VsZWN0IE9wdGlvblwiKTtcclxuICAgIHNldFNlbGVjdGVkTW9kZWwobW9kZWxOYW1lIHx8IG51bGwpO1xyXG4gICAgc2V0U2hvd01vZGVsTW9kYWwoZmFsc2UpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGhhbmRsZUNsZWFyTW9kZWxTZWxlY3Rpb24gPSAoKSA9PiB7XHJcbiAgICBzZXRNb2RlbEJ1dHRvblRleHQoXCJTZWxlY3QgT3B0aW9uXCIpO1xyXG4gICAgc2V0U2VsZWN0ZWRNb2RlbChudWxsKTtcclxuICAgIHNldFNob3dNb2RlbE1vZGFsKGZhbHNlKTtcclxuICB9O1xyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIFdBUkVIT1VTRSBCVVRUT05TIChmb3IgQ2xpZW50IEN1cnJlbnQpXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICBjb25zdCBoYW5kbGVTb0NhbFdhcmVob3VzZUNsaWNrID0gKCkgPT4ge1xyXG4gICAgc2V0Q2xpZW50Q3VycmVudEJ1dHRvblRleHQoXCJTb0NhbCBXYXJlaG91c2VcIik7XHJcbiAgICBzZXRTZWxlY3RlZENsaWVudEN1cnJlbnQoU09DQUxfQ0xJRU5UX0lEKTtcclxuICAgIGNvbnNvbGUubG9nKFwiV2FyZWhvdXNlIGJ1dHRvbiBjbGlja2VkOiBzZXR0aW5nIENsaWVudCBDdXJyZW50IHRvXCIsIFNPQ0FMX0NMSUVOVF9JRCk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaGFuZGxlTm9yQ2FsV2FyZWhvdXNlQ2xpY2sgPSAoKSA9PiB7XHJcbiAgICBzZXRDbGllbnRDdXJyZW50QnV0dG9uVGV4dChcIk5vckNhbCBXYXJlaG91c2VcIik7XHJcbiAgICBzZXRTZWxlY3RlZENsaWVudEN1cnJlbnQoTk9SQ0FMX0NMSUVOVF9JRCk7XHJcbiAgICBjb25zb2xlLmxvZyhcIldhcmVob3VzZSBidXR0b24gY2xpY2tlZDogc2V0dGluZyBDbGllbnQgQ3VycmVudCB0b1wiLCBOT1JDQUxfQ0xJRU5UX0lEKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBoYW5kbGVXYXJlaG91c2VVbmFzc2lnbmVkQ2xpY2sgPSAoKSA9PiB7XHJcbiAgICBzZXRDbGllbnRDdXJyZW50QnV0dG9uVGV4dChcIlVuYXNzaWduZWRcIik7XHJcbiAgICBzZXRTZWxlY3RlZENsaWVudEN1cnJlbnQoVU5BU1NJR05FRF9DTElFTlRfSUQpO1xyXG4gICAgY29uc29sZS5sb2coXCJXYXJlaG91c2UgYnV0dG9uIGNsaWNrZWQ6IHNldHRpbmcgQ2xpZW50IEN1cnJlbnQgdG9cIiwgVU5BU1NJR05FRF9DTElFTlRfSUQpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IFtjbGllbnRTZWFyY2hUZXJtLCBzZXRDbGllbnRTZWFyY2hUZXJtXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFttb2RlbFNlYXJjaFRlcm0sIHNldE1vZGVsU2VhcmNoVGVybV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuXHJcbiAgY29uc3QgZGVsZXRlRnJvbVN0b3JhZ2UgPSBhc3luYyAoaXRlbUlkKSA9PiB7XHJcbiAgICBjb25zdCBzdG9yYWdlUmVmID0gZmlyZWJhc2Uuc3RvcmFnZSgpLnJlZigpO1xyXG4gICAgY29uc3QgZm9sZGVyUmVmID0gc3RvcmFnZVJlZi5jaGlsZChgUGFydHMvJHtpdGVtSWR9L2ApO1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgbGlzdFJlc3VsdCA9IGF3YWl0IGZvbGRlclJlZi5saXN0QWxsKCk7XHJcbiAgICAgIGNvbnN0IGRlbGV0ZVByb21pc2VzID0gbGlzdFJlc3VsdC5pdGVtcy5tYXAoKGl0ZW0pID0+IGl0ZW0uZGVsZXRlKCkpO1xyXG4gICAgICBhd2FpdCBQcm9taXNlLmFsbChkZWxldGVQcm9taXNlcyk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZGVsZXRpbmcgZnJvbSBzdG9yYWdlOlwiLCBlcnJvcik7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgZGVsZXRlRnJvbVBhcnRzQ29sbGVjdGlvbiA9IGFzeW5jIChpdGVtSWQpID0+IHtcclxuICAgIGNvbnN0IGRiID0gZmlyZWJhc2UuZmlyZXN0b3JlKCk7XHJcbiAgICB0cnkge1xyXG4gICAgICBhd2FpdCBkYi5jb2xsZWN0aW9uKFwiUGFydHNcIikuZG9jKGl0ZW1JZCkuZGVsZXRlKCk7XHJcbiAgICAgIGNvbnNvbGUubG9nKGBEZWxldGVkIGl0ZW0gZnJvbSBQYXJ0cyBjb2xsZWN0aW9uOiAke2l0ZW1JZH1gKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBkZWxldGluZyBmcm9tIFBhcnRzIGNvbGxlY3Rpb246XCIsIGVycm9yKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICAvLyAgIC8vIFNhZmVseSBjb252ZXJ0IGFueSBkYXRlLWlzaCB2YWx1ZSBpbnRvIGEgY29tcGFyYWJsZSB0aW1lc3RhbXAgKG1zIHNpbmNlIGVwb2NoKS5cclxuICAvLyBmdW5jdGlvbiB0b1RpbWUodmFsdWUpIHtcclxuICAvLyAgIGlmICghdmFsdWUpIHJldHVybiBudWxsO1xyXG5cclxuICAvLyAgIC8vIEZpcmVzdG9yZSBUaW1lc3RhbXA6IHsgc2Vjb25kcywgbmFub3NlY29uZHMgfVxyXG4gIC8vICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJiB2YWx1ZS5zZWNvbmRzKSB7XHJcbiAgLy8gICAgIHRyeSB7XHJcbiAgLy8gICAgICAgcmV0dXJuIHZhbHVlLnNlY29uZHMgKiAxMDAwO1xyXG4gIC8vICAgICB9IGNhdGNoIHsgLyogZmFsbHRocm91Z2ggKi8gfVxyXG4gIC8vICAgfVxyXG5cclxuICAvLyAgIC8vIElmIGFscmVhZHkgYSBEYXRlXHJcbiAgLy8gICBpZiAodmFsdWUgaW5zdGFuY2VvZiBEYXRlKSByZXR1cm4gaXNOYU4odmFsdWUuZ2V0VGltZSgpKSA/IG51bGwgOiB2YWx1ZS5nZXRUaW1lKCk7XHJcblxyXG4gIC8vICAgLy8gSWYgc3RyaW5nOiB0cnkgSVNPIGZpcnN0XHJcbiAgLy8gICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB7XHJcbiAgLy8gICAgIC8vIHl5eXktbW0tZGQgKGZyb20geW91ciBmb3JtIGlucHV0cylcclxuICAvLyAgICAgY29uc3QgaXNvID0gRGF0ZS5wYXJzZSh2YWx1ZSk7XHJcbiAgLy8gICAgIGlmICghaXNOYU4oaXNvKSkgcmV0dXJuIGlzbztcclxuXHJcbiAgLy8gICAgIC8vIG1tL2RkL3l5eXkgZmFsbGJhY2sgKG9sZGVyIGl0ZW1zKVxyXG4gIC8vICAgICBjb25zdCBwYXJ0cyA9IHZhbHVlLnNwbGl0KFwiL1wiKTtcclxuICAvLyAgICAgaWYgKHBhcnRzLmxlbmd0aCA9PT0gMykge1xyXG4gIC8vICAgICAgIGNvbnN0IFttbSwgZGQsIHl5eXldID0gcGFydHM7XHJcbiAgLy8gICAgICAgY29uc3QgYWx0ID0gRGF0ZS5wYXJzZShgJHt5eXl5fS0ke21tfS0ke2RkfWApO1xyXG4gIC8vICAgICAgIGlmICghaXNOYU4oYWx0KSkgcmV0dXJuIGFsdDtcclxuICAvLyAgICAgfVxyXG4gIC8vICAgfVxyXG5cclxuICAvLyAgIC8vIENhbm9uaWNhbGl6ZSBhbnkgZGF0ZS1pc2ggdmFsdWUgdG8gJ3l5eXktbW0tZGQnIHNvIGl0IG1hdGNoZXMgPGlucHV0IHR5cGU9XCJkYXRlXCI+IHZhbHVlc1xyXG4gIC8vICAgZnVuY3Rpb24gdG9ZTUQodmFsdWUpIHtcclxuICAvLyAgICAgY29uc3QgdCA9IHRvVGltZSh2YWx1ZSk7XHJcbiAgLy8gICAgIGlmICh0ID09IG51bGwpIHJldHVybiBudWxsO1xyXG4gIC8vICAgICBjb25zdCBkID0gbmV3IERhdGUodCk7XHJcbiAgLy8gICAgIGNvbnN0IHl5eXkgPSBkLmdldEZ1bGxZZWFyKCk7XHJcbiAgLy8gICAgIGNvbnN0IG1tID0gU3RyaW5nKGQuZ2V0TW9udGgoKSArIDEpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcclxuICAvLyAgICAgY29uc3QgZGQgPSBTdHJpbmcoZC5nZXREYXRlKCkpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcclxuICAvLyAgICAgcmV0dXJuIGAke3l5eXl9LSR7bW19LSR7ZGR9YDtcclxuICAvLyAgIH1cclxuXHJcblxyXG4gIC8vICAgLy8gTGFzdCByZXNvcnRcclxuICAvLyAgIGNvbnN0IHQgPSBEYXRlLnBhcnNlKHZhbHVlKTtcclxuICAvLyAgIHJldHVybiBpc05hTih0KSA/IG51bGwgOiB0O1xyXG4gIC8vIH1cclxuXHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8TG9nZ2VkSW4+XHJcbiAgICAgIHtpc0RlbGV0aW5nICYmIChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxvYWRpbmctb3ZlcmxheVwiPlxyXG4gICAgICAgICAgPFNwaW5uZXIgYW5pbWF0aW9uPVwiYm9yZGVyXCIgcm9sZT1cInN0YXR1c1wiIGNsYXNzTmFtZT1cInNwaW5uZXItY2VudGVyXCI+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInNyLW9ubHlcIj5Mb2FkaW5nLi4uPC9zcGFuPlxyXG4gICAgICAgICAgPC9TcGlubmVyPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApfVxyXG4gICAgICA8TW9kYWwgc2hvdz17c2hvd0RlbGV0ZU1vZGFsfSBvbkhpZGU9e2hhbmRsZUNsb3NlRGVsZXRlTW9kYWx9PlxyXG4gICAgICAgIDxNb2RhbC5IZWFkZXIgY2xvc2VCdXR0b24+XHJcbiAgICAgICAgICA8TW9kYWwuVGl0bGU+Q29uZmlybSBEZWxldGlvbjwvTW9kYWwuVGl0bGU+XHJcbiAgICAgICAgPC9Nb2RhbC5IZWFkZXI+XHJcbiAgICAgICAgPE1vZGFsLkJvZHk+XHJcbiAgICAgICAgICBBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIHtzZWxlY3RlZEl0ZW1zLmxlbmd0aH0gaXRlbVxyXG4gICAgICAgICAge3NlbGVjdGVkSXRlbXMubGVuZ3RoID4gMSA/IFwic1wiIDogXCJcIn0/XHJcbiAgICAgICAgPC9Nb2RhbC5Cb2R5PlxyXG4gICAgICAgIDxNb2RhbC5Gb290ZXI+XHJcbiAgICAgICAgICA8QnV0dG9uIHZhcmlhbnQ9XCJkYW5nZXJcIiBvbkNsaWNrPXtoYW5kbGVEZWxldGVTZWxlY3RlZH0+XHJcbiAgICAgICAgICAgIFllcywgZGVsZXRlXHJcbiAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICAgIDxCdXR0b24gdmFyaWFudD1cInNlY29uZGFyeVwiIG9uQ2xpY2s9e2hhbmRsZUNsb3NlRGVsZXRlTW9kYWx9PlxyXG4gICAgICAgICAgICBDYW5jZWxcclxuICAgICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICAgIDwvTW9kYWwuRm9vdGVyPlxyXG4gICAgICA8L01vZGFsPlxyXG5cclxuICAgICAgPE1vZGFsIHNob3c9e3Nob3dDbGllbnRNb2RhbH0gb25IaWRlPXsoKSA9PiBzZXRTaG93Q2xpZW50TW9kYWwoZmFsc2UpfT5cclxuICAgICAgICA8TW9kYWwuSGVhZGVyIGNsb3NlQnV0dG9uPlxyXG4gICAgICAgICAgPE1vZGFsLlRpdGxlPlxyXG4gICAgICAgICAgICBTZWxlY3Qge2NsaWVudFNlbGVjdGlvblR5cGUgPT09IFwiZnJvbVwiID8gXCJDbGllbnQgRnJvbVwiIDogXCJDbGllbnQgQ3VycmVudFwifVxyXG4gICAgICAgICAgPC9Nb2RhbC5UaXRsZT5cclxuICAgICAgICA8L01vZGFsLkhlYWRlcj5cclxuICAgICAgICA8TW9kYWwuQm9keT5cclxuICAgICAgICAgIDxGb3JtQ29udHJvbFxyXG4gICAgICAgICAgICB0eXBlPVwidGV4dFwiXHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoIGJ5IG5hbWVcIlxyXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJtYi0zXCJcclxuICAgICAgICAgICAgdmFsdWU9e2NsaWVudFNlYXJjaFRlcm19XHJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0Q2xpZW50U2VhcmNoVGVybShlLnRhcmdldC52YWx1ZSl9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICAgPENsaWVudFRhYmxlXHJcbiAgICAgICAgICAgIGNsaWVudHM9eyhBcnJheS5pc0FycmF5KGNsaWVudHMpID8gY2xpZW50cyA6IFtdKS5maWx0ZXIoXHJcbiAgICAgICAgICAgICAgKGNsaWVudCkgPT4gKGNsaWVudD8ubmFtZSA/PyBcIlwiKS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKGNsaWVudFNlYXJjaFRlcm0udG9Mb3dlckNhc2UoKSlcclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgb25TZWxlY3RDbGllbnQ9e2hhbmRsZUNsaWVudFNlbGVjdH1cclxuICAgICAgICAgICAgb25JbmZvQ2xpY2s9e2hhbmRsZUNsaWVudEluZm99XHJcbiAgICAgICAgICAgIGlzQ2xpZW50U2VhcmNoPXtmYWxzZX1cclxuICAgICAgICAgICAgY2xlYXJTZWxlY3Rpb249eygpID0+IGhhbmRsZUNsaWVudFNlbGVjdChudWxsKX1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgPC9Nb2RhbC5Cb2R5PlxyXG4gICAgICA8L01vZGFsPlxyXG5cclxuICAgICAgPE1vZGFsIHNob3c9e3Nob3dNb2RlbE1vZGFsfSBvbkhpZGU9eygpID0+IHNldFNob3dNb2RlbE1vZGFsKGZhbHNlKX0+XHJcbiAgICAgICAgPE1vZGFsLkhlYWRlciBjbG9zZUJ1dHRvbj5cclxuICAgICAgICAgIDxNb2RhbC5UaXRsZT5TZWxlY3QgTW9kZWw8L01vZGFsLlRpdGxlPlxyXG4gICAgICAgIDwvTW9kYWwuSGVhZGVyPlxyXG4gICAgICAgIDxNb2RhbC5Cb2R5PlxyXG4gICAgICAgICAgPEZvcm1Db250cm9sXHJcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJTZWFyY2ggYnkgbmFtZVwiXHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1iLTNcIlxyXG4gICAgICAgICAgICB2YWx1ZT17bW9kZWxTZWFyY2hUZXJtfVxyXG4gICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldE1vZGVsU2VhcmNoVGVybShlLnRhcmdldC52YWx1ZSl9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICAgPE1vZGVsVGFibGVcclxuICAgICAgICAgICAgbW9kZWxzPXttb2RlbHMuZmlsdGVyKChtb2RlbCkgPT5cclxuICAgICAgICAgICAgICB0eXBlb2YgbW9kZWwgPT09IFwic3RyaW5nXCJcclxuICAgICAgICAgICAgICAgID8gbW9kZWwudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhtb2RlbFNlYXJjaFRlcm0udG9Mb3dlckNhc2UoKSlcclxuICAgICAgICAgICAgICAgIDogZmFsc2VcclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgb25TZWxlY3RNb2RlbD17aGFuZGxlTW9kZWxTZWxlY3R9XHJcbiAgICAgICAgICAgIGNsZWFyU2VsZWN0aW9uPXsoKSA9PiBoYW5kbGVNb2RlbFNlbGVjdChudWxsKX1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgPC9Nb2RhbC5Cb2R5PlxyXG4gICAgICA8L01vZGFsPlxyXG5cclxuICAgICAgPENvbnRhaW5lclxyXG4gICAgICAgIGNsYXNzTmFtZT1cImQtZmxleCBhbGlnbi1pdGVtcy1jZW50ZXIganVzdGlmeS1jb250ZW50LWNlbnRlclwiXHJcbiAgICAgICAgc3R5bGU9e3sgbWluSGVpZ2h0OiBcIjEwMHZoXCIgfX1cclxuICAgICAgPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy0xMDBcIiBzdHlsZT17eyBtYXhXaWR0aDogXCIxMjAwcHhcIiB9fT5cclxuICAgICAgICAgIDxDYXJkPlxyXG4gICAgICAgICAgICA8Q2FyZC5Cb2R5PlxyXG4gICAgICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlciBtYi00XCI+TWFnbW88L2gyPlxyXG4gICAgICAgICAgICAgIDxSb3c+XHJcbiAgICAgICAgICAgICAgICA8Q29sIG1kPXs0fT5cclxuICAgICAgICAgICAgICAgICAgey8qIERyb3Bkb3ducyAqL31cclxuICAgICAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICA8SW5wdXRHcm91cCBjbGFzc05hbWU9XCJtYi0zXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8SW5wdXRHcm91cC5UZXh0Pk9FTTwvSW5wdXRHcm91cC5UZXh0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgPERyb3Bkb3duIG9uU2VsZWN0PXtoYW5kbGVTZWxlY3QxfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPERyb3Bkb3duLlRvZ2dsZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhbnQ9XCJvdXRsaW5lLXNlY29uZGFyeVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ9XCJkcm9wZG93bi1idXR0b24tMVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy0xMDBcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAge2Ryb3Bkb3duMVRleHR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvRHJvcGRvd24uVG9nZ2xlPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8RHJvcGRvd24uTWVudSBjbGFzc05hbWU9XCJ3LTEwMFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxEcm9wZG93bi5JdGVtIGV2ZW50S2V5PVwidW5hc3NpZ25lZFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgU2VsZWN0IE9wdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvRHJvcGRvd24uSXRlbT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8RHJvcGRvd24uSXRlbSBldmVudEtleT1cIkdFXCI+R0U8L0Ryb3Bkb3duLkl0ZW0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPERyb3Bkb3duLkl0ZW0gZXZlbnRLZXk9XCJUb3NoaWJhXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBUb3NoaWJhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Ecm9wZG93bi5JdGVtPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxEcm9wZG93bi5JdGVtIGV2ZW50S2V5PVwiU2llbWVuc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgU2llbWVuc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvRHJvcGRvd24uSXRlbT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8RHJvcGRvd24uSXRlbSBldmVudEtleT1cIlBoaWxpcHNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFBoaWxpcHNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L0Ryb3Bkb3duLkl0ZW0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvRHJvcGRvd24uTWVudT5cclxuICAgICAgICAgICAgICAgICAgICAgIDwvRHJvcGRvd24+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9JbnB1dEdyb3VwPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8SW5wdXRHcm91cCBjbGFzc05hbWU9XCJtYi01XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8SW5wdXRHcm91cC5UZXh0Pk1vZGFsaXR5PC9JbnB1dEdyb3VwLlRleHQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8RHJvcGRvd24gb25TZWxlY3Q9e2hhbmRsZVNlbGVjdDJ9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8RHJvcGRvd24uVG9nZ2xlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFudD1cIm91dGxpbmUtc2Vjb25kYXJ5XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBpZD1cImRyb3Bkb3duLWJ1dHRvbi0yXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LTEwMFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICB7ZHJvcGRvd24yVGV4dH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9Ecm9wZG93bi5Ub2dnbGU+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxEcm9wZG93bi5NZW51IGNsYXNzTmFtZT1cInctMTAwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPERyb3Bkb3duLkl0ZW0gZXZlbnRLZXk9XCJ1bmFzc2lnbmVkXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBTZWxlY3QgT3B0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Ecm9wZG93bi5JdGVtPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxEcm9wZG93bi5JdGVtIGV2ZW50S2V5PVwiQ1RcIj5DVDwvRHJvcGRvd24uSXRlbT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8RHJvcGRvd24uSXRlbSBldmVudEtleT1cIk1SSVwiPk1SSTwvRHJvcGRvd24uSXRlbT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9Ecm9wZG93bi5NZW51PlxyXG4gICAgICAgICAgICAgICAgICAgICAgPC9Ecm9wZG93bj5cclxuICAgICAgICAgICAgICAgICAgICA8L0lucHV0R3JvdXA+XHJcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5kaXZpZGVyfT48L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgIHsvKiBDbGllbnQgc2VsZWN0aW9uIGJveGVzICovfVxyXG4gICAgICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxJbnB1dEdyb3VwIGNsYXNzTmFtZT1cIm1iLTNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxJbnB1dEdyb3VwLlRleHQ+Q2xpZW50IEZyb208L0lucHV0R3JvdXAuVGV4dD5cclxuICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b25cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFudD1cIm91dGxpbmUtc2Vjb25kYXJ5XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy0xMDBcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVDbGllbnRDbGljayhcImZyb21cIil9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7Y2xpZW50RnJvbUJ1dHRvblRleHR9XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8L0lucHV0R3JvdXA+XHJcbiAgICAgICAgICAgICAgICAgICAgPElucHV0R3JvdXAgY2xhc3NOYW1lPVwibWItM1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPElucHV0R3JvdXAuVGV4dD5DbGllbnQgQ3VycmVudDwvSW5wdXRHcm91cC5UZXh0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXJpYW50PVwib3V0bGluZS1zZWNvbmRhcnlcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LTEwMFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZUNsaWVudENsaWNrKFwiY3VycmVudFwiKX1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtjbGllbnRDdXJyZW50QnV0dG9uVGV4dH1cclxuICAgICAgICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvSW5wdXRHcm91cD5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPElucHV0R3JvdXAgY2xhc3NOYW1lPVwibWItM1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPElucHV0R3JvdXAuVGV4dD5Nb2RlbDwvSW5wdXRHcm91cC5UZXh0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXJpYW50PVwib3V0bGluZS1zZWNvbmRhcnlcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LTEwMFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZU1vZGVsQ2xpY2t9XHJcbiAgICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHttb2RlbEJ1dHRvblRleHR9XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8L0lucHV0R3JvdXA+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuZGl2aWRlcn0+PC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHsvKiBXYXJlaG91c2UgYnV0dG9ucyBmb3IgQ2xpZW50IEN1cnJlbnQgKi99XHJcbiAgICAgICAgICAgICAgICAgICAgPElucHV0R3JvdXAgY2xhc3NOYW1lPVwibWItM1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPElucHV0R3JvdXAuVGV4dD5XYXJlaG91c2U8L0lucHV0R3JvdXAuVGV4dD5cclxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuYnV0dG9uR3JvdXB9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8QnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFudD1cIm91dGxpbmUtc2Vjb25kYXJ5XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5mbGV4QnV0dG9ufVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZVNvQ2FsV2FyZWhvdXNlQ2xpY2t9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICBTb0NhbCBXYXJlaG91c2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b25cclxuICAgICAgICAgICAgICAgICAgICAgICAgICB2YXJpYW50PVwib3V0bGluZS1zZWNvbmRhcnlcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17c3R5bGVzLmZsZXhCdXR0b259XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlTm9yQ2FsV2FyZWhvdXNlQ2xpY2t9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICBOb3JDYWwgV2FyZWhvdXNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8QnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFudD1cIm91dGxpbmUtc2Vjb25kYXJ5XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5mbGV4QnV0dG9ufVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZVdhcmVob3VzZVVuYXNzaWduZWRDbGlja31cclxuICAgICAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFVuYXNzaWduZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L0lucHV0R3JvdXA+XHJcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9Db2w+XHJcblxyXG4gICAgICAgICAgICAgICAgPENvbCBtZD17OH0+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMudGFibGVDb250YWluZXJ9PlxyXG4gICAgICAgICAgICAgICAgICAgIHtpc0xvYWRpbmcgPyAoXHJcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyIGFsaWduLWl0ZW1zLWNlbnRlciBwLTVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGltZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNyYz1cIi9tYWdtby1sb2dvLnBuZ1wiIC8vIG1ha2Ugc3VyZSBpdCdzIGluIC9wdWJsaWNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBhbHQ9XCJMb2FkaW5nIE1hZ21vXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDY0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiA2NCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbjogXCJtYWdtby1zcGluIDFzIGxpbmVhciBpbmZpbml0ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtT3JpZ2luOiBcIjUwJSA1MCVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IFwiYmxvY2tcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgey8qIGdsb2JhbCBzbyBzdHlsZWQtanN4IGRvZXNuJ3QgaGFzaCB0aGUgbmFtZSAqL31cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHN0eWxlIGpzeCBnbG9iYWw+e2BcclxuICAgICAgQGtleWZyYW1lcyBtYWdtby1zcGluIHtcclxuICAgICAgICBmcm9tIHtcclxuICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0byB7XHJcbiAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgYH08L3N0eWxlPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgKSA6IChcclxuICAgICAgICAgICAgICAgICAgICAgIDxQYXJ0VGFibGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5mbz17aW5mb31cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWxzPXtsYWJlbHN9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkcz17aWRzfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBob3ZlclN0eWxlPXtob3ZlclN0eWxlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3J0Q2hlY2tBbGw9e3NvcnRDaGVja0FsbH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tEZWxldGU9e2NoZWNrRGVsZXRlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc0RlbGV0aW5nPXtpc0RlbGV0aW5nfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByb3dTZWxlY3Q9e3Jvd1NlbGVjdH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0SG92ZXJJbmRleD17c2V0SG92ZXJJbmRleH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaG92ZXJJbmRleD17aG92ZXJJbmRleH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRJdGVtcz17c2VsZWN0ZWRJdGVtc31cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2VsZWN0ZWRJdGVtcz17c2V0U2VsZWN0ZWRJdGVtc31cclxuICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgKX1cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuc2VhcmNoQ29udGFpbmVyfT5cclxuICAgICAgICAgICAgICAgICAgICAgIDxGb3JtIGNsYXNzTmFtZT1cImQtZmxleCBwYi0yXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9e3Nob3dMaXN0U2VhcmNofVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJtZS0yIGZsZXgtZ3Jvdy0xXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPVwiU2VhcmNoXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17c2VhcmNofVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtzZWFyY2hDaGFuZ2VIYW5kbGVyfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IGZsZXg6IFwiMVwiIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxOYXZEcm9wZG93blxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPXtzZWxlY3R9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ9XCJjb2xsYXNpYmxlLW5hdi1kcm9wZG93blwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvdz17c2hvd0xpc3R9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25Nb3VzZUVudGVyPXsoKSA9PiBzZXRTaG93TGlzdCh0cnVlKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbk1vdXNlTGVhdmU9eygpID0+IHNldFNob3dMaXN0KGZhbHNlKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyBtYXJnaW5Ub3A6IFwiLTVweFwiIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8TmF2RHJvcGRvd24uSXRlbSBvbkNsaWNrPXsoKSA9PiB7IHNldFNlbGVjdChcIk5hbWVcIik7IHNldFNob3dMaXN0U2VhcmNoKFwidGV4dFwiKTsgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBOYW1lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9OYXZEcm9wZG93bi5JdGVtPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxOYXZEcm9wZG93bi5JdGVtIG9uQ2xpY2s9eygpID0+IHsgc2V0U2VsZWN0KFwiRGF0ZVwiKTsgc2V0U2hvd0xpc3RTZWFyY2goXCJkYXRlXCIpOyB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIERhdGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L05hdkRyb3Bkb3duLkl0ZW0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPE5hdkRyb3Bkb3duLkl0ZW0gb25DbGljaz17KCkgPT4geyBzZXRTZWxlY3QoXCJXb3JrIE9yZGVyXCIpOyBzZXRTaG93TGlzdFNlYXJjaChcIm51bWJlclwiKTsgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBXb3JrIE9yZGVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9OYXZEcm9wZG93bi5JdGVtPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxOYXZEcm9wZG93bi5JdGVtIG9uQ2xpY2s9eygpID0+IHsgc2V0U2VsZWN0KFwiUHJvZHVjdCBOdW1iZXJcIik7IHNldFNob3dMaXN0U2VhcmNoKFwibnVtYmVyXCIpOyB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFByb2R1Y3QgTnVtYmVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9OYXZEcm9wZG93bi5JdGVtPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxOYXZEcm9wZG93bi5JdGVtIG9uQ2xpY2s9eygpID0+IHsgc2V0U2VsZWN0KFwiRGVzY3JpcHRpb25cIik7IHNldFNob3dMaXN0U2VhcmNoKFwidGV4dFwiKTsgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBEZXNjcmlwdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvTmF2RHJvcGRvd24uSXRlbT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8TmF2RHJvcGRvd24uSXRlbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTZWxlY3QoXCJTS1VcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNob3dMaXN0U2VhcmNoKFwidGV4dFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgU0tVXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9OYXZEcm9wZG93bi5JdGVtPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L05hdkRyb3Bkb3duPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPC9Gb3JtPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkLWZsZXgganVzdGlmeS1jb250ZW50LWJldHdlZW5cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPExvYWRpbmdCdXR0b24gdHlwZT1cInNlY29uZGFyeVwiIG5hbWU9XCJBZGQgTmV3IEl0ZW1cIiByb3V0ZT1cIk5ld1NlYXJjaC9BZGRJdGVtL05ld0l0ZW1cIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8TG9hZGluZ0J1dHRvbiB0eXBlPVwicHJpbWFyeVwiIG5hbWU9XCJCYWNrXCIgcm91dGU9XCJXYXJlaG91c2VkYi9XYXJlaG91c2VTZWxlY3RcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9Db2w+XHJcbiAgICAgICAgICAgICAgPC9Sb3c+XHJcbiAgICAgICAgICAgIDwvQ2FyZC5Cb2R5PlxyXG4gICAgICAgICAgPC9DYXJkPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L0NvbnRhaW5lcj5cclxuICAgIDwvTG9nZ2VkSW4+XHJcbiAgKTtcclxuXHJcblxyXG59XHJcblxyXG4iXX0= */\n/*@ sourceURL=C:\\\\Users\\\\mack2\\\\OneDrive\\\\Desktop\\\\code\\\\pages\\\\NewSearch\\\\mainSearch.js */")) : __jsx(_utils_PartTable__WEBPACK_IMPORTED_MODULE_10__["default"], {
    info: info,
    labels: labels,
    ids: ids,
    hoverStyle: hoverStyle,
    sortCheckAll: sortCheckAll,
    checkDelete: checkDelete,
    isDeleting: isDeleting,
    rowSelect: rowSelect,
    setHoverIndex: setHoverIndex,
    hoverIndex: hoverIndex,
    selectedItems: selectedItems,
    setSelectedItems: setSelectedItems,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1033,
      columnNumber: 23
    }
  }), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_11___default.a.searchContainer,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1050,
      columnNumber: 21
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"], {
    className: "d-flex pb-2",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1051,
      columnNumber: 23
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
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1052,
      columnNumber: 25
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
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1061,
      columnNumber: 25
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["NavDropdown"].Item, {
    onClick: () => {
      setSelect("Name");
      setShowListSearch("text");
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1069,
      columnNumber: 27
    }
  }, "Name"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["NavDropdown"].Item, {
    onClick: () => {
      setSelect("Date");
      setShowListSearch("date");
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1072,
      columnNumber: 27
    }
  }, "Date"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["NavDropdown"].Item, {
    onClick: () => {
      setSelect("Work Order");
      setShowListSearch("number");
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1075,
      columnNumber: 27
    }
  }, "Work Order"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["NavDropdown"].Item, {
    onClick: () => {
      setSelect("Product Number");
      setShowListSearch("number");
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1078,
      columnNumber: 27
    }
  }, "Product Number"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["NavDropdown"].Item, {
    onClick: () => {
      setSelect("Description");
      setShowListSearch("text");
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1081,
      columnNumber: 27
    }
  }, "Description"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["NavDropdown"].Item, {
    onClick: () => {
      setSelect("SKU");
      setShowListSearch("text");
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1084,
      columnNumber: 27
    }
  }, "SKU"))), __jsx("div", {
    className: "d-flex justify-content-between",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1094,
      columnNumber: 23
    }
  }, __jsx(LoadingButton, {
    type: "secondary",
    name: "Add New Item",
    route: "NewSearch/AddItem/NewItem",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1095,
      columnNumber: 25
    }
  }), __jsx(LoadingButton, {
    type: "primary",
    name: "Back",
    route: "Warehousedb/WarehouseSelect",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1096,
      columnNumber: 25
    }
  })))))))))));
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
var _jsxFileName = "C:\\Users\\mack2\\OneDrive\\Desktop\\code\\utils\\ModelTable.js";
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
var _jsxFileName = "C:\\Users\\mack2\\OneDrive\\Desktop\\code\\utils\\PartTable.js";
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

/***/ "styled-jsx/style":
/*!***********************************!*\
  !*** external "styled-jsx/style" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("styled-jsx/style");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibmV4dC9kaXN0L25leHQtc2VydmVyL2xpYi9yb3V0ZXItY29udGV4dC5qc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm5leHQvZGlzdC9uZXh0LXNlcnZlci9saWIvcm91dGVyL3V0aWxzL2dldC1hc3NldC1wYXRoLWZyb20tcm91dGUuanNcIiIsIndlYnBhY2s6Ly8vLi9jb250ZXh0L0F1dGhVc2VyQ29udGV4dC5qcyIsIndlYnBhY2s6Ly8vLi9jb250ZXh0L0ZpcmViYXNlLmpzIiwid2VicGFjazovLy8uL2NvbnRleHQvdXNlRmlyZWJhc2VBdXRoLmpzIiwid2VicGFjazovLy8uLi8uLi9jbGllbnQvbGluay50c3giLCJ3ZWJwYWNrOi8vLy4uLy4uL2NsaWVudC9ub3JtYWxpemUtdHJhaWxpbmctc2xhc2gudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uL2NsaWVudC9yZXF1ZXN0LWlkbGUtY2FsbGJhY2sudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uL2NsaWVudC9yb3V0ZS1sb2FkZXIudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uL2NsaWVudC9yb3V0ZXIudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uL2NsaWVudC91c2UtaW50ZXJzZWN0aW9uLnRzeCIsIndlYnBhY2s6Ly8vLi4vLi4vY2xpZW50L3dpdGgtcm91dGVyLnRzeCIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL3BhdGgtdG8tcmVnZXhwL2luZGV4LmpzIiwid2VicGFjazovLy8uLi8uLi8uLi8uLi9uZXh0LXNlcnZlci9saWIvaTE4bi9ub3JtYWxpemUtbG9jYWxlLXBhdGgudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL25leHQtc2VydmVyL2xpYi9taXR0LnRzIiwid2VicGFjazovLy8uLi8uLi8uLi8uLi9uZXh0LXNlcnZlci9saWIvcm91dGVyL3JvdXRlci50cyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vLi4vbmV4dC1zZXJ2ZXIvbGliL3JvdXRlci91dGlscy9mb3JtYXQtdXJsLnRzIiwid2VicGFjazovLy8uLi8uLi8uLi8uLi8uLi9uZXh0LXNlcnZlci9saWIvcm91dGVyL3V0aWxzL2lzLWR5bmFtaWMudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uLy4uL25leHQtc2VydmVyL2xpYi9yb3V0ZXIvdXRpbHMvcGFyc2UtcmVsYXRpdmUtdXJsLnRzIiwid2VicGFjazovLy8uLi8uLi8uLi8uLi8uLi9uZXh0LXNlcnZlci9saWIvcm91dGVyL3V0aWxzL3BhdGgtbWF0Y2gudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uLy4uL25leHQtc2VydmVyL2xpYi9yb3V0ZXIvdXRpbHMvcHJlcGFyZS1kZXN0aW5hdGlvbi50cyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vLi4vbmV4dC1zZXJ2ZXIvbGliL3JvdXRlci91dGlscy9xdWVyeXN0cmluZy50cyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vLi4vbmV4dC1zZXJ2ZXIvbGliL3JvdXRlci91dGlscy9yZXNvbHZlLXJld3JpdGVzLnRzIiwid2VicGFjazovLy8uLi8uLi8uLi8uLi8uLi9uZXh0LXNlcnZlci9saWIvcm91dGVyL3V0aWxzL3JvdXRlLW1hdGNoZXIudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uLy4uL25leHQtc2VydmVyL2xpYi9yb3V0ZXIvdXRpbHMvcm91dGUtcmVnZXgudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL25leHQtc2VydmVyL2xpYi91dGlscy50cyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L25leHQtc2VydmVyL3NlcnZlci9kZW5vcm1hbGl6ZS1wYWdlLXBhdGguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL25leHQvbGluay5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmV4dC9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL25leHQvbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVXaWxkY2FyZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmV4dC9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy90eXBlb2YuanMiLCJ3ZWJwYWNrOi8vLy4vcGFnZXMvTG9nZ2VkSW4uanMiLCJ3ZWJwYWNrOi8vLy4vcGFnZXMvTmV3U2VhcmNoL21haW5TZWFyY2guanMiLCJ3ZWJwYWNrOi8vLy4vc3R5bGVzL0NsaWVudFRhYmxlLm1vZHVsZS5jc3MiLCJ3ZWJwYWNrOi8vLy4vc3R5bGVzL01haW5TZWFyY2gubW9kdWxlLmNzcyIsIndlYnBhY2s6Ly8vLi9zdHlsZXMvUGFydFRhYmxlLm1vZHVsZS5jc3MiLCJ3ZWJwYWNrOi8vLy4vdXRpbHMvQ2xpZW50VGFibGUuanMiLCJ3ZWJwYWNrOi8vLy4vdXRpbHMvTW9kZWxUYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi91dGlscy9QYXJ0VGFibGUuanMiLCJ3ZWJwYWNrOi8vLy4vdXRpbHMvZmV0Y2hBc3NvY2lhdGlvbnMuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZmlyZWJhc2UvY29tcGF0L2FwcFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImZpcmViYXNlL2NvbXBhdC9hdXRoXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZmlyZWJhc2UvY29tcGF0L2ZpcmVzdG9yZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImZpcmViYXNlL2NvbXBhdC9zdG9yYWdlXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibmV4dC9yb3V0ZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LWJvb3RzdHJhcFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LWlzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwic3R5bGVkLWpzeC9zdHlsZVwiIl0sIm5hbWVzIjpbImF1dGhVc2VyQ29udGV4dCIsImNyZWF0ZUNvbnRleHQiLCJhdXRoVXNlciIsImxvYWRpbmciLCJzaWduSW5XaXRoR29vZ2xlIiwic2lnbk91dCIsIkF1dGhVc2VyUHJvdmlkZXIiLCJjaGlsZHJlbiIsImF1dGgiLCJ1c2VGaXJlYmFzZUF1dGgiLCJ1c2VBdXRoIiwidXNlQ29udGV4dCIsIkZpcmViYXNlQ3JlZGVudGlhbHMiLCJhcGlLZXkiLCJhdXRoRG9tYWluIiwicHJvamVjdElkIiwic3RvcmFnZUJ1Y2tldCIsIm1lc3NhZ2luZ1NlbmRlcklkIiwiYXBwSWQiLCJtZWFzdXJlbWVudElkIiwiRmlyZWJhc2UiLCJhcHBzIiwibGVuZ3RoIiwiaW5pdGlhbGl6ZUFwcCIsImZvcm1hdEF1dGhVc2VyIiwidXNlciIsInVpZCIsImVtYWlsIiwic2V0QXV0aFVzZXIiLCJ1c2VTdGF0ZSIsInNldExvYWRpbmciLCJhdXRoU3RhdGVDaGFuZ2VkIiwiYXV0aFN0YXRlIiwiZm9ybWF0dGVkVXNlciIsImNsZWFyIiwicHJvdmlkZXIiLCJHb29nbGVBdXRoUHJvdmlkZXIiLCJzZXRDdXN0b21QYXJhbWV0ZXJzIiwicHJvbXB0Iiwic2lnbkluV2l0aFJlZGlyZWN0IiwiY2F0Y2giLCJlcnJvciIsImNvbnNvbGUiLCJ0aGVuIiwidXNlRWZmZWN0IiwidW5zdWJzY3JpYmUiLCJzZXRQZXJzaXN0ZW5jZSIsIkF1dGgiLCJQZXJzaXN0ZW5jZSIsIkxPQ0FMIiwib25BdXRoU3RhdGVDaGFuZ2VkIiwicHJlZmV0Y2hlZCIsInJvdXRlciIsImVyciIsImN1ckxvY2FsZSIsIm9wdGlvbnMiLCJocmVmIiwiZXZlbnQiLCJ0YXJnZXQiLCJlIiwibm9kZU5hbWUiLCJpc01vZGlmaWVkRXZlbnQiLCJzY3JvbGwiLCJhcyIsInJlcGxhY2UiLCJhcmdzIiwia2V5IiwiZXhwZWN0ZWQiLCJhY3R1YWwiLCJyZXF1aXJlZFByb3BzR3VhcmQiLCJyZXF1aXJlZFByb3BzIiwiT2JqZWN0IiwicHJvcHMiLCJjcmVhdGVQcm9wRXJyb3IiLCJfIiwib3B0aW9uYWxQcm9wc0d1YXJkIiwic2hhbGxvdyIsInBhc3NIcmVmIiwicHJlZmV0Y2giLCJsb2NhbGUiLCJvcHRpb25hbFByb3BzIiwidmFsVHlwZSIsImhhc1dhcm5lZCIsIlJlYWN0IiwicCIsInBhdGhuYW1lIiwicmVzb2x2ZWRBcyIsImNoaWxkIiwiQ2hpbGRyZW4iLCJjaGlsZFJlZiIsInJvb3RNYXJnaW4iLCJzZXRSZWYiLCJlbCIsInNldEludGVyc2VjdGlvblJlZiIsInNob3VsZFByZWZldGNoIiwiaXNWaXNpYmxlIiwiaXNQcmVmZXRjaGVkIiwiY2hpbGRQcm9wcyIsInJlZiIsIm9uQ2xpY2siLCJsaW5rQ2xpY2tlZCIsInByaW9yaXR5IiwibG9jYWxlRG9tYWluIiwiTGluayIsInBhdGgiLCJub3JtYWxpemVQYXRoVHJhaWxpbmdTbGFzaCIsInByb2Nlc3MiLCJyZXF1ZXN0SWRsZUNhbGxiYWNrIiwic2VsZiIsInN0YXJ0IiwiRGF0ZSIsInNldFRpbWVvdXQiLCJjYiIsImRpZFRpbWVvdXQiLCJ0aW1lUmVtYWluaW5nIiwiTWF0aCIsImNhbmNlbElkbGVDYWxsYmFjayIsImNsZWFyVGltZW91dCIsIk1TX01BWF9JRExFX0RFTEFZIiwiZW50cnkiLCJtYXAiLCJQcm9taXNlIiwicHJvbSIsInJlc29sdmUiLCJyZXNvbHZlciIsImZ1dHVyZSIsImdlbmVyYXRvciIsInZhbHVlIiwibGluayIsImRvY3VtZW50Iiwid2luZG93IiwiY2FuUHJlZmV0Y2giLCJoYXNQcmVmZXRjaCIsInJlcyIsIkFTU0VUX0xPQURfRVJST1IiLCJTeW1ib2wiLCJzY3JpcHQiLCJyZWplY3QiLCJtYXJrQXNzZXRFcnJvciIsInNyYyIsImNhbmNlbGxlZCIsInIiLCJvbkJ1aWxkTWFuaWZlc3QiLCJyZXNvbHZlUHJvbWlzZVdpdGhUaW1lb3V0Iiwic2NyaXB0cyIsImFzc2V0UHJlZml4IiwiZW5jb2RlVVJJIiwiY3NzIiwiZ2V0Q2xpZW50QnVpbGRNYW5pZmVzdCIsIm1hbmlmZXN0Iiwicm91dGUiLCJhbGxGaWxlcyIsInYiLCJlbnRyeXBvaW50cyIsImxvYWRlZFNjcmlwdHMiLCJzdHlsZVNoZWV0cyIsInJvdXRlcyIsImFwcGVuZFNjcmlwdCIsImZldGNoIiwidGV4dCIsImNvbnRlbnQiLCJ3aGVuRW50cnlwb2ludCIsIndpdGhGdXR1cmUiLCJvbkVudHJ5cG9pbnQiLCJmbiIsImV4cG9ydHMiLCJjb21wb25lbnQiLCJpbnB1dCIsIm9sZCIsImxvYWRSb3V0ZSIsImdldEZpbGVzRm9yUm91dGUiLCJlbnRyeXBvaW50Iiwic3R5bGVzIiwiY24iLCJuYXZpZ2F0b3IiLCJvdXRwdXQiLCJwcmVmZXRjaFZpYURvbSIsImNyZWF0ZVJvdXRlTG9hZGVyIiwic2luZ2xldG9uUm91dGVyIiwicmVhZHlDYWxsYmFja3MiLCJyZWFkeSIsInVybFByb3BlcnR5RmllbGRzIiwicm91dGVyRXZlbnRzIiwiY29yZU1ldGhvZEZpZWxkcyIsImdldCIsIlJvdXRlciIsImZpZWxkIiwiZ2V0Um91dGVyIiwiZXZlbnRGaWVsZCIsIl9zaW5nbGV0b25Sb3V0ZXIiLCJtZXNzYWdlIiwic3RhY2siLCJSb3V0ZXJDb250ZXh0IiwiY3JlYXRlUm91dGVyIiwiX3JvdXRlciIsImluc3RhbmNlIiwiQXJyYXkiLCJoYXNJbnRlcnNlY3Rpb25PYnNlcnZlciIsImlzRGlzYWJsZWQiLCJkaXNhYmxlZCIsInVub2JzZXJ2ZSIsIm9ic2VydmUiLCJzZXRWaXNpYmxlIiwiaWRsZUNhbGxiYWNrIiwiY3JlYXRlT2JzZXJ2ZXIiLCJlbGVtZW50cyIsIm9ic2VydmVyIiwib2JzZXJ2ZXJzIiwiaWQiLCJlbnRyaWVzIiwiY2FsbGJhY2siLCJDb21wb3NlZENvbXBvbmVudCIsImdldEluaXRpYWxQcm9wcyIsIldpdGhSb3V0ZXJXcmFwcGVyIiwibmFtZSIsInBhdGhuYW1lUGFydHMiLCJsb2NhbGVzIiwiZGV0ZWN0ZWRMb2NhbGUiLCJhbGwiLCJvbiIsIm9mZiIsImVtaXQiLCJoYW5kbGVyIiwiYmFzZVBhdGgiLCJwcmVmaXgiLCJwYXRoTm9RdWVyeUhhc2giLCJxdWVyeUluZGV4IiwiaGFzaEluZGV4IiwiYWRkUGF0aFByZWZpeCIsInVybCIsImxvY2F0aW9uT3JpZ2luIiwicmVzb2x2ZWQiLCJoYXNCYXNlUGF0aCIsImludGVycG9sYXRlZFJvdXRlIiwiZHluYW1pY1JlZ2V4IiwiZHluYW1pY0dyb3VwcyIsImR5bmFtaWNNYXRjaGVzIiwiYXNQYXRobmFtZSIsInBhcmFtcyIsInBhcmFtIiwicmVwbGFjZWQiLCJyZXBlYXQiLCJvcHRpb25hbCIsInNlZ21lbnQiLCJlbmNvZGVVUklDb21wb25lbnQiLCJyZXN1bHQiLCJmaWx0ZXJlZFF1ZXJ5IiwicXVlcnkiLCJiYXNlIiwidXJsQXNTdHJpbmciLCJpc0xvY2FsVVJMIiwicmVzb2x2ZUFzIiwiZmluYWxVcmwiLCJpbnRlcnBvbGF0ZWRBcyIsImludGVycG9sYXRlQXMiLCJoYXNoIiwib21pdFBhcm1zRnJvbVF1ZXJ5IiwicmVzb2x2ZWRIcmVmIiwib3JpZ2luIiwicmVzb2x2ZUhyZWYiLCJocmVmSGFkT3JpZ2luIiwiYXNIYWRPcmlnaW4iLCJzdHJpcE9yaWdpbiIsInByZXBhcmVkVXJsIiwiYWRkQmFzZVBhdGgiLCJwcmVwYXJlZEFzIiwiY2xlYW5QYXRobmFtZSIsInBhZ2VzIiwicGFnZSIsIm1hbnVhbFNjcm9sbFJlc3RvcmF0aW9uIiwiU1NHX0RBVEFfTk9UX0ZPVU5EIiwiY3JlZGVudGlhbHMiLCJhdHRlbXB0cyIsImZldGNoUmV0cnkiLCJkYXRhIiwibm90Rm91bmQiLCJpc1NlcnZlclJlbmRlciIsImNvbnN0cnVjdG9yIiwiYXNQYXRoIiwiY29tcG9uZW50cyIsInNkYyIsInNkciIsInN1YiIsImNsYyIsInBhZ2VMb2FkZXIiLCJfYnBzIiwiZXZlbnRzIiwiX3dyYXBBcHAiLCJpc1NzciIsImlzRmFsbGJhY2siLCJfaW5GbGlnaHRSb3V0ZSIsIl9zaGFsbG93IiwiZGVmYXVsdExvY2FsZSIsImRvbWFpbkxvY2FsZXMiLCJpc1JlYWR5IiwiaXNQcmV2aWV3IiwiaXNMb2NhbGVEb21haW4iLCJfaWR4Iiwic3RhdGUiLCJpbml0aWFsIiwiX19OX1NTRyIsImluaXRpYWxQcm9wcyIsIl9fTl9TU1AiLCJDb21wb25lbnQiLCJhdXRvRXhwb3J0RHluYW1pYyIsInJlbG9hZCIsImJhY2siLCJwdXNoIiwicHJlcGFyZVVybEFzIiwic2hvdWxkUmVzb2x2ZUhyZWYiLCJsb2NhbGVDaGFuZ2UiLCJTVCIsInBlcmZvcm1hbmNlIiwicm91dGVQcm9wcyIsImFkZExvY2FsZSIsImRlbEJhc2VQYXRoIiwiY2xlYW5lZEFzIiwiZGVsTG9jYWxlIiwicGFyc2VkIiwiX19yZXdyaXRlcyIsIm1ldGhvZCIsInJld3JpdGVzUmVzdWx0IiwicmVzb2x2ZUR5bmFtaWNSb3V0ZSIsInBhcnNlZEFzIiwicm91dGVSZWdleCIsInJvdXRlTWF0Y2giLCJzaG91bGRJbnRlcnBvbGF0ZSIsIm1pc3NpbmdQYXJhbXMiLCJyb3V0ZUluZm8iLCJkZXN0aW5hdGlvbiIsInBhcnNlZEhyZWYiLCJub3RGb3VuZFJvdXRlIiwiYXBwQ29tcCIsImlzVmFsaWRTaGFsbG93Um91dGUiLCJmb3JjZWRTY3JvbGwiLCJ4IiwieSIsImNoYW5nZVN0YXRlIiwiX19OIiwiaWR4IiwiYnVpbGRDYW5jZWxsYXRpb25FcnJvciIsImV4aXN0aW5nUm91dGVJbmZvIiwiY2FjaGVkUm91dGVJbmZvIiwicmVxdWlyZSIsImlzVmFsaWRFbGVtZW50VHlwZSIsImRhdGFIcmVmIiwic2V0IiwiYmVmb3JlUG9wU3RhdGUiLCJvbmx5QUhhc2hDaGFuZ2UiLCJuZXdIYXNoIiwib2xkVXJsTm9IYXNoIiwib2xkSGFzaCIsInNjcm9sbFRvSGFzaCIsImlkRWwiLCJuYW1lRWwiLCJ1cmxJc05ldyIsImlzU3NnIiwiY2FuY2VsIiwiY29tcG9uZW50UmVzdWx0IiwiX2dldERhdGEiLCJfZ2V0U3RhdGljRGF0YSIsImZldGNoTmV4dERhdGEiLCJfZ2V0U2VydmVyRGF0YSIsIkFwcFRyZWUiLCJjdHgiLCJhYm9ydENvbXBvbmVudExvYWQiLCJub3RpZnkiLCJzbGFzaGVkUHJvdG9jb2xzIiwicHJvdG9jb2wiLCJ1cmxPYmoiLCJob3N0IiwiaG9zdG5hbWUiLCJTdHJpbmciLCJxdWVyeXN0cmluZyIsInNlYXJjaCIsIlRFU1RfUk9VVEUiLCJnbG9iYWxCYXNlIiwicmVzb2x2ZWRCYXNlIiwibWF0Y2hlck9wdGlvbnMiLCJzZW5zaXRpdmUiLCJkZWxpbWl0ZXIiLCJjdXN0b21Sb3V0ZU1hdGNoZXJPcHRpb25zIiwic3RyaWN0IiwiY3VzdG9tUm91dGUiLCJrZXlzIiwibWF0Y2hlclJlZ2V4IiwicGF0aFRvUmVnZXhwIiwibWF0Y2hlciIsImdldFNhZmVQYXJhbU5hbWUiLCJwYXJhbU5hbWUiLCJuZXdQYXJhbU5hbWUiLCJpIiwiY2hhckNvZGUiLCJhbGxNYXRjaCIsImhhcyIsImhhc0l0ZW0iLCJyZXEiLCJtYXRjaGVzIiwiZ3JvdXBLZXkiLCJ2YWxpZGF0ZSIsInBhcnNlZERlc3RpbmF0aW9uIiwiaGFkTG9jYWxlIiwiZGVzdFF1ZXJ5IiwiZGVzdFBhdGgiLCJkZXN0UGF0aFBhcmFtS2V5cyIsImRlc3RQYXRoUGFyYW1zIiwiZGVzdGluYXRpb25Db21waWxlciIsInN0ck9yQXJyYXkiLCJjb21waWxlTm9uUGF0aCIsInBhcmFtS2V5cyIsImFwcGVuZFBhcmFtc1RvUXVlcnkiLCJuZXdVcmwiLCJzZWFyY2hQYXJhbXMiLCJpc05hTiIsIml0ZW0iLCJzdHJpbmdpZnlVcmxRdWVyeVBhcmFtIiwic2VhcmNoUGFyYW1zTGlzdCIsImN1c3RvbVJvdXRlTWF0Y2hlciIsIm1hdGNoZWRQYWdlIiwiZnNQYXRobmFtZSIsImhhbmRsZVJld3JpdGUiLCJyZXdyaXRlIiwiaGFzUGFyYW1zIiwiaGVhZGVycyIsImNvb2tpZXMiLCJhY2MiLCJkZXN0UmVzIiwiZmluaXNoZWQiLCJyZXdyaXRlcyIsInJlIiwiZGVjb2RlIiwiZGVjb2RlVVJJQ29tcG9uZW50Iiwic2x1Z05hbWUiLCJnIiwiZ3JvdXBzIiwibSIsInN0ciIsInNlZ21lbnRzIiwibm9ybWFsaXplZFJvdXRlIiwiZ3JvdXBJbmRleCIsInBhcmFtZXRlcml6ZWRSb3V0ZSIsInBhcnNlUGFyYW1ldGVyIiwicG9zIiwiZXNjYXBlUmVnZXgiLCJyb3V0ZUtleUNoYXJDb2RlIiwicm91dGVLZXlDaGFyTGVuZ3RoIiwiZ2V0U2FmZVJvdXRlS2V5Iiwicm91dGVLZXkiLCJyb3V0ZUtleXMiLCJuYW1lZFBhcmFtZXRlcml6ZWRSb3V0ZSIsImNsZWFuZWRLZXkiLCJpbnZhbGlkS2V5IiwicGFyc2VJbnQiLCJuYW1lZFJlZ2V4IiwidXNlZCIsInBvcnQiLCJnZXRMb2NhdGlvbk9yaWdpbiIsIkFwcCIsImdldERpc3BsYXlOYW1lIiwicGFnZVByb3BzIiwibG9hZEdldEluaXRpYWxQcm9wcyIsImlzUmVzU2VudCIsInVybE9iamVjdEtleXMiLCJTUCIsIkxvZ2dlZEluIiwidXNlUm91dGVyIiwibG9nIiwidGltZXIiLCJtaW5IZWlnaHQiLCJTT0NBTF9DTElFTlRfSUQiLCJOT1JDQUxfQ0xJRU5UX0lEIiwiVU5BU1NJR05FRF9DTElFTlRfSUQiLCJzaW11bGF0ZU5ldHdvcmtSZXF1ZXN0IiwiTG9hZGluZ0J1dHRvbiIsInR5cGUiLCJpc0xvYWRpbmciLCJ0b1RpbWUiLCJzZWNvbmRzIiwidCIsImdldFRpbWUiLCJpc28iLCJwYXJzZSIsInBhcnRzIiwic3BsaXQiLCJtbSIsImRkIiwieXl5eSIsImFsdCIsInRvWU1EIiwiZCIsImdldEZ1bGxZZWFyIiwiZ2V0TW9udGgiLCJwYWRTdGFydCIsImdldERhdGUiLCJNYWluU2VhcmNoIiwiaW5mbyIsInNldEluZm8iLCJiYWNrdXBJbmZvIiwic2V0QmFja3VwSW5mbyIsImF1Z21lbnRlZEluZm8iLCJzZXRBdWdtZW50ZWRJbmZvIiwic2V0SXNMb2FkaW5nIiwiaWRzIiwic2V0SUQiLCJzaG93Iiwic2V0U2hvdyIsImRJdGVtIiwic2V0REl0ZW0iLCJzZWxlY3QiLCJzZXRTZWxlY3QiLCJzaG93TGlzdCIsInNldFNob3dMaXN0Iiwic2hvd0xpc3RTZWFyY2giLCJzZXRTaG93TGlzdFNlYXJjaCIsInNldFNlYXJjaCIsInNlbGVjdGVkT0VNIiwic2V0U2VsZWN0ZWRPRU0iLCJzZWxlY3RlZE1vZGFsaXR5Iiwic2V0U2VsZWN0ZWRNb2RhbGl0eSIsInNlbGVjdGVkQ2xpZW50RnJvbSIsInNldFNlbGVjdGVkQ2xpZW50RnJvbSIsImNsaWVudEZyb21CdXR0b25UZXh0Iiwic2V0Q2xpZW50RnJvbUJ1dHRvblRleHQiLCJzZWxlY3RlZENsaWVudEN1cnJlbnQiLCJzZXRTZWxlY3RlZENsaWVudEN1cnJlbnQiLCJjbGllbnRDdXJyZW50QnV0dG9uVGV4dCIsInNldENsaWVudEN1cnJlbnRCdXR0b25UZXh0IiwiY2xpZW50cyIsInNldENsaWVudHMiLCJzaG93Q2xpZW50TW9kYWwiLCJzZXRTaG93Q2xpZW50TW9kYWwiLCJjbGllbnRTZWxlY3Rpb25UeXBlIiwic2V0Q2xpZW50U2VsZWN0aW9uVHlwZSIsImxhYmVsQmFzZSIsImxhYmVsQmFzZU5hbWVzIiwic29ydENoZWNrQmFzZSIsIndpdGhTb3J0SWNvbiIsImJhc2VMYWJlbHMiLCJhY3RpdmVJbmRleCIsImlzRGVzYyIsImFycm93IiwibGFiZWxzIiwic2V0TGFiZWxzIiwic29ydENoZWNrIiwic2V0U29ydENoZWNrIiwiaG92ZXJJbmRleCIsInNldEhvdmVySW5kZXgiLCJzZWxlY3RlZE1vZGVsIiwic2V0U2VsZWN0ZWRNb2RlbCIsImdQb3MiLCJzZXRHUG9zIiwiZ0lkZSIsInNldEdJZGUiLCJpc0RlbGV0aW5nIiwic2V0SXNEZWxldGluZyIsImZldGNoRGF0YSIsImlucHV0VGV4dCIsInNlbGVjdGVkVHlwZSIsImxvYWQiLCJhdHRlbXB0IiwiZmV0Y2hQYXJ0c1dpdGhNYWNoaW5lRGF0YSIsInBvdyIsImRiIiwiZmlyZWJhc2UiLCJmaXJlc3RvcmUiLCJtYWNoaW5lSWRzIiwiY3VyTWFjaGluZUlkcyIsInRoZU1hY2hpbmVJZHMiLCJNYWNoaW5lIiwiQ3VycmVudE1hY2hpbmUiLCJUaGVNYWNoaW5lIiwidW5pcSIsImFyciIsIlNldCIsIm1JZHMiLCJjSWRzIiwiZmV0Y2hNYWNoaW5lQ2xpZW50cyIsIm91dCIsImNodW5rcyIsInNsaWNlIiwiY2h1bmsiLCJzbmFwIiwiY29sbGVjdGlvbiIsIndoZXJlIiwiRmllbGRQYXRoIiwiZG9jdW1lbnRJZCIsImZvckVhY2giLCJkb2MiLCJtZCIsImNsaWVudCIsImZldGNoTWFjaGluZXNEYXRhIiwiZnJvbU1hcCIsImN1ck1hcCIsInRoZU1hcCIsImF1Z21lbnRlZCIsImNsaWVudEZyb21JZCIsIkNsaWVudEZyb20iLCJjbGllbnRDdXJyZW50SWQiLCJDbGllbnRDdXJyZW50IiwiZmlsdGVyIiwiaXQiLCJ2aXNpYmxlIiwic2VhcmNoQ2hhbmdlSGFuZGxlciIsImZpbHRlclBhcnRzIiwibm9GaWx0ZXJzIiwiZmlsdGVyZWQiLCJPRU0iLCJtYWNoaW5lRGF0YSIsInRoZU1hY2hpbmVEYXRhIiwiTW9kYWxpdHkiLCJNb2RlbCIsInMiLCJ0b0xvd2VyQ2FzZSIsImluY2x1ZGVzIiwid2FudGVkRGF5IiwiaXRlbVlNRCIsImRhdGUiLCJpc0FycmF5IiwiZGVzY3JpcHRpb25zIiwiaGl0RGVzYyIsInNvbWUiLCJ3b3JrT3JkZXJzIiwiaGl0V08iLCJ3Iiwid28iLCJ3b3JrT3JkZXIiLCJwbiIsImRlc2MiLCJzb3J0Q2hlY2tBbGwiLCJuZXh0U29ydENoZWNrIiwic29ydGVkSW5mbyIsInNvcnQiLCJhIiwiYiIsInRhIiwidGIiLCJhdiIsInRvU3RyaW5nIiwiYnYiLCJsb2NhbGVDb21wYXJlIiwiYW4iLCJOdW1iZXIiLCJibiIsInJvd1NlbGVjdCIsInNlbGVjdGVkSXRlbXMiLCJzZXRTZWxlY3RlZEl0ZW1zIiwic2hvd0RlbGV0ZU1vZGFsIiwic2V0U2hvd0RlbGV0ZU1vZGFsIiwiaGFuZGxlU2VsZWN0SXRlbSIsInByZXYiLCJoYW5kbGVTaG93RGVsZXRlTW9kYWwiLCJoYW5kbGVDbG9zZURlbGV0ZU1vZGFsIiwiaGFuZGxlRGVsZXRlU2VsZWN0ZWQiLCJpdGVtSWQiLCJkZWxldGUiLCJkZWxldGVGcm9tU3RvcmFnZSIsImhhbmRsZUNsb3NlIiwiaGFuZGxlU2hvdyIsImNoZWNrRGVsZXRlIiwiaWRzVG9EZWxldGUiLCJwcmV2ZW50RGVmYXVsdCIsInN0b3BQcm9wYWdhdGlvbiIsImhvdmVyU3R5bGUiLCJpbmRleCIsImJhY2tncm91bmRDb2xvciIsInRleHRBbGlnbiIsImN1cnNvciIsImRyb3Bkb3duMVRleHQiLCJzZXREcm9wZG93bjFUZXh0IiwiZHJvcGRvd24yVGV4dCIsInNldERyb3Bkb3duMlRleHQiLCJoYW5kbGVTZWxlY3QxIiwiZXZlbnRLZXkiLCJ0ZXh0Q29udGVudCIsImhhbmRsZVNlbGVjdDIiLCJidWlsZENsaWVudHNGcm9tSXRlbXMiLCJhZGQiLCJpZEFycmF5IiwiaGFuZGxlQ2xpZW50Q2xpY2siLCJzYWZlQ2xpZW50cyIsImNsaWVudHNEYXRhIiwiZmV0Y2hDbGllbnRzIiwiZGVyaXZlZCIsInNldENsaWVudFNlYXJjaFRlcm0iLCJoYW5kbGVDbGllbnRTZWxlY3QiLCJjbGllbnRJZCIsImNsaWVudFNuYXAiLCJleGlzdHMiLCJjbGllbnREYXRhIiwiaGFuZGxlQ2xpZW50SW5mbyIsImNsaWVudE5hbWUiLCJoYW5kbGVDbGVhckNsaWVudFNlbGVjdGlvbiIsIm1vZGVscyIsInNldE1vZGVscyIsInNob3dNb2RlbE1vZGFsIiwic2V0U2hvd01vZGVsTW9kYWwiLCJtb2RlbEJ1dHRvblRleHQiLCJzZXRNb2RlbEJ1dHRvblRleHQiLCJoYW5kbGVNb2RlbENsaWNrIiwibW9kZWxzRGF0YSIsImZldGNoTW9kZWxzIiwic2V0TW9kZWxTZWFyY2hUZXJtIiwiaGFuZGxlTW9kZWxTZWxlY3QiLCJtb2RlbE5hbWUiLCJoYW5kbGVDbGVhck1vZGVsU2VsZWN0aW9uIiwiaGFuZGxlU29DYWxXYXJlaG91c2VDbGljayIsImhhbmRsZU5vckNhbFdhcmVob3VzZUNsaWNrIiwiaGFuZGxlV2FyZWhvdXNlVW5hc3NpZ25lZENsaWNrIiwiY2xpZW50U2VhcmNoVGVybSIsIm1vZGVsU2VhcmNoVGVybSIsInN0b3JhZ2VSZWYiLCJzdG9yYWdlIiwiZm9sZGVyUmVmIiwibGlzdFJlc3VsdCIsImxpc3RBbGwiLCJkZWxldGVQcm9taXNlcyIsIml0ZW1zIiwiZGVsZXRlRnJvbVBhcnRzQ29sbGVjdGlvbiIsIm1vZGVsIiwibWF4V2lkdGgiLCJkaXZpZGVyIiwiYnV0dG9uR3JvdXAiLCJmbGV4QnV0dG9uIiwidGFibGVDb250YWluZXIiLCJ3aWR0aCIsImhlaWdodCIsImFuaW1hdGlvbiIsInRyYW5zZm9ybU9yaWdpbiIsImRpc3BsYXkiLCJzZWFyY2hDb250YWluZXIiLCJmbGV4IiwibWFyZ2luVG9wIiwiQ2xpZW50VGFibGUiLCJvblNlbGVjdENsaWVudCIsIm9uSW5mb0NsaWNrIiwiY2xlYXJTZWxlY3Rpb24iLCJvbkFkZENsaWVudCIsImRpc2FibGVTZWxlY3QiLCJkaXNhYmxlSW5mbyIsImlzQ2xpZW50U2VhcmNoIiwiY2xpZW50VGFibGUiLCJNb2RlbFRhYmxlIiwib25TZWxlY3RNb2RlbCIsIm1vZGVsVGFibGUiLCJQYXJ0VGFibGUiLCJwcmV2U2VsZWN0ZWRJdGVtcyIsInNjcm9sbGFibGVUYWJsZSIsImZpeGVkVGFibGUiLCJzdGlja3lIZWFkZXIiLCJhY3Rpb25Db2wiLCJjZWxsQ2xhbXAiLCJmb3JtYXREYXRlIiwic24iLCJmcm9tIiwicGFydHNTbmFwc2hvdCIsImRvY3MiLCJwYXJ0RG9jIiwicGFydERhdGEiLCJEb2N1bWVudFJlZmVyZW5jZSIsIm1hY2hpbmVEb2MiLCJjbGllbnREb2MiLCJDbGllbnQiLCJjbGllbnRzU25hcHNob3QiLCJmaWx0ZXJlZENsaWVudHMiLCJtYXRjaCIsIm1hY2hpbmVSZWYiLCJtYWNoaW5lcyIsInNlbGVjdGVkQ2xpZW50IiwibWFjaGluZXNTbmFwc2hvdCIsImlzVmFsaWQiLCJ0aW1lc3RhbXAiLCJ0b0RhdGUiLCJkYXkiLCJtb250aCIsInllYXIiXSwibWFwcGluZ3MiOiI7O1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7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SSxJQUFHRSxJQUFLLEVBQS9CO0FBQ0QsQzs7Ozs7Ozs7Ozs7QUNySEQsZ0Q7Ozs7Ozs7Ozs7O0FDQUEsaUQ7Ozs7Ozs7Ozs7O0FDQUEsc0Q7Ozs7Ozs7Ozs7O0FDQUEsb0Q7Ozs7Ozs7Ozs7O0FDQUEsd0M7Ozs7Ozs7Ozs7O0FDQUEsa0M7Ozs7Ozs7Ozs7O0FDQUEsNEM7Ozs7Ozs7Ozs7O0FDQUEscUM7Ozs7Ozs7Ozs7O0FDQUEsNkMiLCJmaWxlIjoicGFnZXMvTmV3U2VhcmNoL21haW5TZWFyY2guanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHJlcXVpcmUoJy4uLy4uL3Nzci1tb2R1bGUtY2FjaGUuanMnKTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0dmFyIHRocmV3ID0gdHJ1ZTtcbiBcdFx0dHJ5IHtcbiBcdFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcbiBcdFx0XHR0aHJldyA9IGZhbHNlO1xuIFx0XHR9IGZpbmFsbHkge1xuIFx0XHRcdGlmKHRocmV3KSBkZWxldGUgaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdH1cblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3BhZ2VzL05ld1NlYXJjaC9tYWluU2VhcmNoLmpzXCIpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmV4dC9kaXN0L25leHQtc2VydmVyL2xpYi9yb3V0ZXItY29udGV4dC5qc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXh0L2Rpc3QvbmV4dC1zZXJ2ZXIvbGliL3JvdXRlci91dGlscy9nZXQtYXNzZXQtcGF0aC1mcm9tLXJvdXRlLmpzXCIpOyIsImltcG9ydCB7IGNyZWF0ZUNvbnRleHQsIHVzZUNvbnRleHQgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB1c2VGaXJlYmFzZUF1dGggZnJvbSBcIi4vdXNlRmlyZWJhc2VBdXRoXCI7XG5cbmNvbnN0IGF1dGhVc2VyQ29udGV4dCA9IGNyZWF0ZUNvbnRleHQoe1xuICBhdXRoVXNlcjogbnVsbCxcbiAgbG9hZGluZzogdHJ1ZSxcbiAgc2lnbkluV2l0aEdvb2dsZTogYXN5bmMgKCkgPT4ge30sXG4gIHNpZ25PdXQ6IGFzeW5jICgpID0+IHt9LFxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBBdXRoVXNlclByb3ZpZGVyKHsgY2hpbGRyZW4gfSkge1xuICBjb25zdCBhdXRoID0gdXNlRmlyZWJhc2VBdXRoKCk7XG4gIHJldHVybiAoXG4gICAgPGF1dGhVc2VyQ29udGV4dC5Qcm92aWRlciB2YWx1ZT17YXV0aH0+e2NoaWxkcmVufTwvYXV0aFVzZXJDb250ZXh0LlByb3ZpZGVyPlxuICApO1xufVxuXG5leHBvcnQgY29uc3QgdXNlQXV0aCA9ICgpID0+IHVzZUNvbnRleHQoYXV0aFVzZXJDb250ZXh0KTtcbiIsIi8vIC8vIGltcG9ydCBmaXJlYmFzZSBmcm9tIFwiZmlyZWJhc2UvYXBwXCJcbi8vIGltcG9ydCAqIGFzIGZpcmViYXNlIGZyb20gXCJmaXJlYmFzZS9hcHBcIjtcbi8vIC8vIGltcG9ydCBcImZpcmViYXNlL2F1dGhcIlxuXG4vLyBjb25zdCBhcHAgPSBmaXJlYmFzZS5pbml0aWFsaXplQXBwKHtcbi8vICAgICBhcGlLZXk6IFwiQUl6YVN5Q3hDLWE4YjVWaGhleThHRjQ3THBYWjFhTUtZbWlJaHdFXCIsXG4vLyAgICAgYXV0aERvbWFpbjogXCJtYWdtby1hYzEwYy5maXJlYmFzZWFwcC5jb21cIixcbi8vICAgICBwcm9qZWN0SWQ6IFwibWFnbW8tYWMxMGNcIixcbi8vICAgICBzdG9yYWdlQnVja2V0OiBcIm1hZ21vLWFjMTBjLmFwcHNwb3QuY29tXCIsXG4vLyAgICAgbWVzc2FnaW5nU2VuZGVySWQ6IFwiMTc3ODU3NTI1MTQ3XCIsXG4vLyAgICAgYXBwSWQ6IFwiMToxNzc4NTc1MjUxNDc6d2ViOmFjOGUzYzg3ZDgyMzk2YmViMWRkM2VcIixcbi8vICAgICBtZWFzdXJlbWVudElkOiBcIkctTDAyMzZKVDVOM1wiXG4vLyB9KVxuXG4vLyBleHBvcnQgY29uc3QgYXV0aCA9IGFwcC5hdXRoKClcbi8vIGV4cG9ydCBkZWZhdWx0IGFwcFxuXG4vLyBhcGlLZXk6IHByb2Nlc3MuZW52LlJFQUNUX0FQUF9GSVJFQkFTRV9LRVksXG4vLyAgICAgYXV0aERvbWFpbjogcHJvY2Vzcy5lbnYuUkVBQ1RfQVBQX0ZJUkVCQVNFX0FVVEhfRE9NQUlOLFxuLy8gICAgIHByb2plY3RJZDogcHJvY2Vzcy5lbnYuUkVBQ1RfQVBQX0ZJUkVCQVNFX1BST0pFQ1RfSUQsXG4vLyAgICAgc3RvcmFnZUJ1Y2tldDogcHJvY2Vzcy5lbnYuUkVBQ1RfQVBQX0ZJUkVCQVNFX1NUT1JBR0VfQlVDS0VULFxuLy8gICAgIG1lc3NhZ2luZ1NlbmRlcklkOiBwcm9jZXNzLmVudi5SRUFDVF9BUFBfRklSRUJBU0VfTUVTU0FHSU5HX1NFTkRFUl9JRCxcbi8vICAgICBhcHBJZDogcHJvY2Vzcy5lbnYuUkVBQ1RfQVBQX0ZJUkVCQVNFX0FQUF9JRCxcbi8vICAgICBtZWFzdXJlbWVudElkOiBwcm9jZXNzLmVudi5SRUFDVF9BUFBfRklSRUJBU0VfTUVBU1VSRU1FTlRfSURcblxuaW1wb3J0IEZpcmViYXNlIGZyb20gXCJmaXJlYmFzZS9jb21wYXQvYXBwXCI7XG5pbXBvcnQgXCJmaXJlYmFzZS9jb21wYXQvYXV0aFwiO1xuaW1wb3J0IFwiZmlyZWJhc2UvY29tcGF0L2ZpcmVzdG9yZVwiO1xuaW1wb3J0IFwiZmlyZWJhc2UvY29tcGF0L3N0b3JhZ2VcIjtcblxuY29uc3QgRmlyZWJhc2VDcmVkZW50aWFscyA9IHtcbiAgYXBpS2V5OiBcIkFJemFTeUN4Qy1hOGI1VmhoZXk4R0Y0N0xwWFoxYU1LWW1pSWh3RVwiLFxuICBhdXRoRG9tYWluOiBcIm1hZ21vLWFjMTBjLmZpcmViYXNlYXBwLmNvbVwiLFxuICBwcm9qZWN0SWQ6IFwibWFnbW8tYWMxMGNcIixcbiAgc3RvcmFnZUJ1Y2tldDogXCJtYWdtby1hYzEwYy5hcHBzcG90LmNvbVwiLFxuICBtZXNzYWdpbmdTZW5kZXJJZDogXCIxNzc4NTc1MjUxNDdcIixcbiAgYXBwSWQ6IFwiMToxNzc4NTc1MjUxNDc6d2ViOmFjOGUzYzg3ZDgyMzk2YmViMWRkM2VcIixcbiAgbWVhc3VyZW1lbnRJZDogXCJHLUwwMjM2SlQ1TjNcIixcbn07XG4vLyBpZiBhIEZpcmViYXNlIGluc3RhbmNlIGRvZXNuJ3QgZXhpc3QsIGNyZWF0ZSBvbmVcbmlmICghRmlyZWJhc2UuYXBwcy5sZW5ndGgpIHtcbiAgRmlyZWJhc2UuaW5pdGlhbGl6ZUFwcChGaXJlYmFzZUNyZWRlbnRpYWxzKTtcbn1cblxuZXhwb3J0IGNvbnN0IGF1dGggPSBGaXJlYmFzZS5hdXRoKCk7XG5leHBvcnQgZGVmYXVsdCBGaXJlYmFzZTtcblxuLy8gaW1wb3J0IHsgaW5pdGlhbGl6ZUFwcCB9IGZyb20gJ2ZpcmViYXNlL2FwcCc7XG4vLyBpbXBvcnQgeyBnZXRGaXJlc3RvcmUsIGNvbGxlY3Rpb24sIGdldERvY3MgfSBmcm9tICdmaXJlYmFzZS9maXJlc3RvcmUnO1xuXG4vLyBjb25zdCBhcHAgPSBpbml0aWFsaXplQXBwKGZpcmViYXNlQ29uZmlnKTtcbi8vIGNvbnN0IGRiID0gZ2V0RmlyZXN0b3JlKGFwcCk7XG5cbi8vIGV4cG9ydCBkZWZhdWx0IGFwcDtcbiIsImltcG9ydCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBGaXJlYmFzZSwgeyBhdXRoIH0gZnJvbSBcIi4vRmlyZWJhc2VcIjtcblxuY29uc3QgZm9ybWF0QXV0aFVzZXIgPSAodXNlcikgPT4gKHtcbiAgdWlkOiB1c2VyLnVpZCxcbiAgZW1haWw6IHVzZXIuZW1haWwsXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdXNlRmlyZWJhc2VBdXRoKCkge1xuICBjb25zdCBbYXV0aFVzZXIsIHNldEF1dGhVc2VyXSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcblxuICBjb25zdCBhdXRoU3RhdGVDaGFuZ2VkID0gYXN5bmMgKGF1dGhTdGF0ZSkgPT4ge1xuICAgIGlmICghYXV0aFN0YXRlKSB7XG4gICAgICBzZXRBdXRoVXNlcihudWxsKTtcbiAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHNldExvYWRpbmcodHJ1ZSk7XG4gICAgY29uc3QgZm9ybWF0dGVkVXNlciA9IGZvcm1hdEF1dGhVc2VyKGF1dGhTdGF0ZSk7XG4gICAgc2V0QXV0aFVzZXIoZm9ybWF0dGVkVXNlcik7XG4gICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gIH07XG5cbiAgY29uc3QgY2xlYXIgPSAoKSA9PiB7XG4gICAgc2V0QXV0aFVzZXIobnVsbCk7XG4gICAgc2V0TG9hZGluZyh0cnVlKTtcbiAgfTtcblxuICAvL3NpZ24gaW4gd2l0aCBnb29nbGVcbiAgY29uc3Qgc2lnbkluV2l0aEdvb2dsZSA9ICgpID0+IHtcbiAgICBjb25zdCBwcm92aWRlciA9IG5ldyBGaXJlYmFzZS5hdXRoLkdvb2dsZUF1dGhQcm92aWRlcigpO1xuICAgIHByb3ZpZGVyLnNldEN1c3RvbVBhcmFtZXRlcnMoeyBwcm9tcHQ6IFwic2VsZWN0X2FjY291bnRcIiB9KTtcblxuICAgIHJldHVybiBhdXRoLnNpZ25JbldpdGhSZWRpcmVjdChwcm92aWRlcikuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiR29vZ2xlIFNpZ24tSW4gRXJyb3I6XCIsIGVycm9yKTtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IHNpZ25PdXQgPSAoKSA9PiBhdXRoLnNpZ25PdXQoKS50aGVuKGNsZWFyKTtcblxuICAvLyBMaXN0ZW4gZm9yIEZpcmViYXNlIGF1dGggc3RhdGUgY2hhbmdlc1xuICAvLyB1c2VFZmZlY3QoKCkgPT4ge1xuICAvLyAgIGNvbnN0IHVuc3Vic2NyaWJlID0gYXV0aC5vbkF1dGhTdGF0ZUNoYW5nZWQoYXV0aFN0YXRlQ2hhbmdlZCk7XG4gIC8vICAgcmV0dXJuICgpID0+IHVuc3Vic2NyaWJlKCk7XG4gIC8vIH0sIFtdKTtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBsZXQgdW5zdWJzY3JpYmU7XG4gICAgYXV0aFxuICAgICAgLnNldFBlcnNpc3RlbmNlKEZpcmViYXNlLmF1dGguQXV0aC5QZXJzaXN0ZW5jZS5MT0NBTClcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgLy8gTm93IHNldCB1cCB0aGUgbGlzdGVuZXJcbiAgICAgICAgdW5zdWJzY3JpYmUgPSBhdXRoLm9uQXV0aFN0YXRlQ2hhbmdlZChhdXRoU3RhdGVDaGFuZ2VkKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiBjb25zb2xlLmVycm9yKFwiRXJyb3Igc2V0dGluZyBwZXJzaXN0ZW5jZTpcIiwgZXJyb3IpKTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBpZiAodW5zdWJzY3JpYmUpIHtcbiAgICAgICAgdW5zdWJzY3JpYmUoKTtcbiAgICAgIH1cbiAgICB9O1xuICB9LCBbXSk7XG5cbiAgcmV0dXJuIHtcbiAgICBhdXRoVXNlcixcbiAgICBsb2FkaW5nLFxuICAgIHNpZ25JbldpdGhHb29nbGUsXG4gICAgc2lnbk91dCxcbiAgfTtcbn1cbiIsImltcG9ydCBSZWFjdCwgeyBDaGlsZHJlbiwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBVcmxPYmplY3QgfSBmcm9tICd1cmwnXG5pbXBvcnQge1xuICBhZGRCYXNlUGF0aCxcbiAgYWRkTG9jYWxlLFxuICBnZXREb21haW5Mb2NhbGUsXG4gIGlzTG9jYWxVUkwsXG4gIE5leHRSb3V0ZXIsXG4gIFByZWZldGNoT3B0aW9ucyxcbiAgcmVzb2x2ZUhyZWYsXG59IGZyb20gJy4uL25leHQtc2VydmVyL2xpYi9yb3V0ZXIvcm91dGVyJ1xuaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSAnLi9yb3V0ZXInXG5pbXBvcnQgeyB1c2VJbnRlcnNlY3Rpb24gfSBmcm9tICcuL3VzZS1pbnRlcnNlY3Rpb24nXG5cbnR5cGUgVXJsID0gc3RyaW5nIHwgVXJsT2JqZWN0XG50eXBlIFJlcXVpcmVkS2V5czxUPiA9IHtcbiAgW0sgaW4ga2V5b2YgVF0tPzoge30gZXh0ZW5kcyBQaWNrPFQsIEs+ID8gbmV2ZXIgOiBLXG59W2tleW9mIFRdXG50eXBlIE9wdGlvbmFsS2V5czxUPiA9IHtcbiAgW0sgaW4ga2V5b2YgVF0tPzoge30gZXh0ZW5kcyBQaWNrPFQsIEs+ID8gSyA6IG5ldmVyXG59W2tleW9mIFRdXG5cbmV4cG9ydCB0eXBlIExpbmtQcm9wcyA9IHtcbiAgaHJlZjogVXJsXG4gIGFzPzogVXJsXG4gIHJlcGxhY2U/OiBib29sZWFuXG4gIHNjcm9sbD86IGJvb2xlYW5cbiAgc2hhbGxvdz86IGJvb2xlYW5cbiAgcGFzc0hyZWY/OiBib29sZWFuXG4gIHByZWZldGNoPzogYm9vbGVhblxuICBsb2NhbGU/OiBzdHJpbmcgfCBmYWxzZVxufVxudHlwZSBMaW5rUHJvcHNSZXF1aXJlZCA9IFJlcXVpcmVkS2V5czxMaW5rUHJvcHM+XG50eXBlIExpbmtQcm9wc09wdGlvbmFsID0gT3B0aW9uYWxLZXlzPExpbmtQcm9wcz5cblxuY29uc3QgcHJlZmV0Y2hlZDogeyBbY2FjaGVLZXk6IHN0cmluZ106IGJvb2xlYW4gfSA9IHt9XG5cbmZ1bmN0aW9uIHByZWZldGNoKFxuICByb3V0ZXI6IE5leHRSb3V0ZXIsXG4gIGhyZWY6IHN0cmluZyxcbiAgYXM6IHN0cmluZyxcbiAgb3B0aW9ucz86IFByZWZldGNoT3B0aW9uc1xuKTogdm9pZCB7XG4gIGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJyB8fCAhcm91dGVyKSByZXR1cm5cbiAgaWYgKCFpc0xvY2FsVVJMKGhyZWYpKSByZXR1cm5cbiAgLy8gUHJlZmV0Y2ggdGhlIEpTT04gcGFnZSBpZiBhc2tlZCAob25seSBpbiB0aGUgY2xpZW50KVxuICAvLyBXZSBuZWVkIHRvIGhhbmRsZSBhIHByZWZldGNoIGVycm9yIGhlcmUgc2luY2Ugd2UgbWF5IGJlXG4gIC8vIGxvYWRpbmcgd2l0aCBwcmlvcml0eSB3aGljaCBjYW4gcmVqZWN0IGJ1dCB3ZSBkb24ndFxuICAvLyB3YW50IHRvIGZvcmNlIG5hdmlnYXRpb24gc2luY2UgdGhpcyBpcyBvbmx5IGEgcHJlZmV0Y2hcbiAgcm91dGVyLnByZWZldGNoKGhyZWYsIGFzLCBvcHRpb25zKS5jYXRjaCgoZXJyKSA9PiB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIC8vIHJldGhyb3cgdG8gc2hvdyBpbnZhbGlkIFVSTCBlcnJvcnNcbiAgICAgIHRocm93IGVyclxuICAgIH1cbiAgfSlcbiAgY29uc3QgY3VyTG9jYWxlID1cbiAgICBvcHRpb25zICYmIHR5cGVvZiBvcHRpb25zLmxvY2FsZSAhPT0gJ3VuZGVmaW5lZCdcbiAgICAgID8gb3B0aW9ucy5sb2NhbGVcbiAgICAgIDogcm91dGVyICYmIHJvdXRlci5sb2NhbGVcblxuICAvLyBKb2luIG9uIGFuIGludmFsaWQgVVJJIGNoYXJhY3RlclxuICBwcmVmZXRjaGVkW2hyZWYgKyAnJScgKyBhcyArIChjdXJMb2NhbGUgPyAnJScgKyBjdXJMb2NhbGUgOiAnJyldID0gdHJ1ZVxufVxuXG5mdW5jdGlvbiBpc01vZGlmaWVkRXZlbnQoZXZlbnQ6IFJlYWN0Lk1vdXNlRXZlbnQpOiBib29sZWFuIHtcbiAgY29uc3QgeyB0YXJnZXQgfSA9IGV2ZW50LmN1cnJlbnRUYXJnZXQgYXMgSFRNTEFuY2hvckVsZW1lbnRcbiAgcmV0dXJuIChcbiAgICAodGFyZ2V0ICYmIHRhcmdldCAhPT0gJ19zZWxmJykgfHxcbiAgICBldmVudC5tZXRhS2V5IHx8XG4gICAgZXZlbnQuY3RybEtleSB8fFxuICAgIGV2ZW50LnNoaWZ0S2V5IHx8XG4gICAgZXZlbnQuYWx0S2V5IHx8IC8vIHRyaWdnZXJzIHJlc291cmNlIGRvd25sb2FkXG4gICAgKGV2ZW50Lm5hdGl2ZUV2ZW50ICYmIGV2ZW50Lm5hdGl2ZUV2ZW50LndoaWNoID09PSAyKVxuICApXG59XG5cbmZ1bmN0aW9uIGxpbmtDbGlja2VkKFxuICBlOiBSZWFjdC5Nb3VzZUV2ZW50LFxuICByb3V0ZXI6IE5leHRSb3V0ZXIsXG4gIGhyZWY6IHN0cmluZyxcbiAgYXM6IHN0cmluZyxcbiAgcmVwbGFjZT86IGJvb2xlYW4sXG4gIHNoYWxsb3c/OiBib29sZWFuLFxuICBzY3JvbGw/OiBib29sZWFuLFxuICBsb2NhbGU/OiBzdHJpbmcgfCBmYWxzZVxuKTogdm9pZCB7XG4gIGNvbnN0IHsgbm9kZU5hbWUgfSA9IGUuY3VycmVudFRhcmdldFxuXG4gIGlmIChub2RlTmFtZSA9PT0gJ0EnICYmIChpc01vZGlmaWVkRXZlbnQoZSkgfHwgIWlzTG9jYWxVUkwoaHJlZikpKSB7XG4gICAgLy8gaWdub3JlIGNsaWNrIGZvciBicm93c2Vy4oCZcyBkZWZhdWx0IGJlaGF2aW9yXG4gICAgcmV0dXJuXG4gIH1cblxuICBlLnByZXZlbnREZWZhdWx0KClcblxuICAvLyAgYXZvaWQgc2Nyb2xsIGZvciB1cmxzIHdpdGggYW5jaG9yIHJlZnNcbiAgaWYgKHNjcm9sbCA9PSBudWxsKSB7XG4gICAgc2Nyb2xsID0gYXMuaW5kZXhPZignIycpIDwgMFxuICB9XG5cbiAgLy8gcmVwbGFjZSBzdGF0ZSBpbnN0ZWFkIG9mIHB1c2ggaWYgcHJvcCBpcyBwcmVzZW50XG4gIHJvdXRlcltyZXBsYWNlID8gJ3JlcGxhY2UnIDogJ3B1c2gnXShocmVmLCBhcywge1xuICAgIHNoYWxsb3csXG4gICAgbG9jYWxlLFxuICAgIHNjcm9sbCxcbiAgfSlcbn1cblxuZnVuY3Rpb24gTGluayhwcm9wczogUmVhY3QuUHJvcHNXaXRoQ2hpbGRyZW48TGlua1Byb3BzPikge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGZ1bmN0aW9uIGNyZWF0ZVByb3BFcnJvcihhcmdzOiB7XG4gICAgICBrZXk6IHN0cmluZ1xuICAgICAgZXhwZWN0ZWQ6IHN0cmluZ1xuICAgICAgYWN0dWFsOiBzdHJpbmdcbiAgICB9KSB7XG4gICAgICByZXR1cm4gbmV3IEVycm9yKFxuICAgICAgICBgRmFpbGVkIHByb3AgdHlwZTogVGhlIHByb3AgXFxgJHthcmdzLmtleX1cXGAgZXhwZWN0cyBhICR7YXJncy5leHBlY3RlZH0gaW4gXFxgPExpbms+XFxgLCBidXQgZ290IFxcYCR7YXJncy5hY3R1YWx9XFxgIGluc3RlYWQuYCArXG4gICAgICAgICAgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnXG4gICAgICAgICAgICA/IFwiXFxuT3BlbiB5b3VyIGJyb3dzZXIncyBjb25zb2xlIHRvIHZpZXcgdGhlIENvbXBvbmVudCBzdGFjayB0cmFjZS5cIlxuICAgICAgICAgICAgOiAnJylcbiAgICAgIClcbiAgICB9XG5cbiAgICAvLyBUeXBlU2NyaXB0IHRyaWNrIGZvciB0eXBlLWd1YXJkaW5nOlxuICAgIGNvbnN0IHJlcXVpcmVkUHJvcHNHdWFyZDogUmVjb3JkPExpbmtQcm9wc1JlcXVpcmVkLCB0cnVlPiA9IHtcbiAgICAgIGhyZWY6IHRydWUsXG4gICAgfSBhcyBjb25zdFxuICAgIGNvbnN0IHJlcXVpcmVkUHJvcHM6IExpbmtQcm9wc1JlcXVpcmVkW10gPSBPYmplY3Qua2V5cyhcbiAgICAgIHJlcXVpcmVkUHJvcHNHdWFyZFxuICAgICkgYXMgTGlua1Byb3BzUmVxdWlyZWRbXVxuICAgIHJlcXVpcmVkUHJvcHMuZm9yRWFjaCgoa2V5OiBMaW5rUHJvcHNSZXF1aXJlZCkgPT4ge1xuICAgICAgaWYgKGtleSA9PT0gJ2hyZWYnKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBwcm9wc1trZXldID09IG51bGwgfHxcbiAgICAgICAgICAodHlwZW9mIHByb3BzW2tleV0gIT09ICdzdHJpbmcnICYmIHR5cGVvZiBwcm9wc1trZXldICE9PSAnb2JqZWN0JylcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhyb3cgY3JlYXRlUHJvcEVycm9yKHtcbiAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgIGV4cGVjdGVkOiAnYHN0cmluZ2Agb3IgYG9iamVjdGAnLFxuICAgICAgICAgICAgYWN0dWFsOiBwcm9wc1trZXldID09PSBudWxsID8gJ251bGwnIDogdHlwZW9mIHByb3BzW2tleV0sXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gVHlwZVNjcmlwdCB0cmljayBmb3IgdHlwZS1ndWFyZGluZzpcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xuICAgICAgICBjb25zdCBfOiBuZXZlciA9IGtleVxuICAgICAgfVxuICAgIH0pXG5cbiAgICAvLyBUeXBlU2NyaXB0IHRyaWNrIGZvciB0eXBlLWd1YXJkaW5nOlxuICAgIGNvbnN0IG9wdGlvbmFsUHJvcHNHdWFyZDogUmVjb3JkPExpbmtQcm9wc09wdGlvbmFsLCB0cnVlPiA9IHtcbiAgICAgIGFzOiB0cnVlLFxuICAgICAgcmVwbGFjZTogdHJ1ZSxcbiAgICAgIHNjcm9sbDogdHJ1ZSxcbiAgICAgIHNoYWxsb3c6IHRydWUsXG4gICAgICBwYXNzSHJlZjogdHJ1ZSxcbiAgICAgIHByZWZldGNoOiB0cnVlLFxuICAgICAgbG9jYWxlOiB0cnVlLFxuICAgIH0gYXMgY29uc3RcbiAgICBjb25zdCBvcHRpb25hbFByb3BzOiBMaW5rUHJvcHNPcHRpb25hbFtdID0gT2JqZWN0LmtleXMoXG4gICAgICBvcHRpb25hbFByb3BzR3VhcmRcbiAgICApIGFzIExpbmtQcm9wc09wdGlvbmFsW11cbiAgICBvcHRpb25hbFByb3BzLmZvckVhY2goKGtleTogTGlua1Byb3BzT3B0aW9uYWwpID0+IHtcbiAgICAgIGNvbnN0IHZhbFR5cGUgPSB0eXBlb2YgcHJvcHNba2V5XVxuXG4gICAgICBpZiAoa2V5ID09PSAnYXMnKSB7XG4gICAgICAgIGlmIChwcm9wc1trZXldICYmIHZhbFR5cGUgIT09ICdzdHJpbmcnICYmIHZhbFR5cGUgIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgdGhyb3cgY3JlYXRlUHJvcEVycm9yKHtcbiAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgIGV4cGVjdGVkOiAnYHN0cmluZ2Agb3IgYG9iamVjdGAnLFxuICAgICAgICAgICAgYWN0dWFsOiB2YWxUeXBlLFxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSAnbG9jYWxlJykge1xuICAgICAgICBpZiAocHJvcHNba2V5XSAmJiB2YWxUeXBlICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgIHRocm93IGNyZWF0ZVByb3BFcnJvcih7XG4gICAgICAgICAgICBrZXksXG4gICAgICAgICAgICBleHBlY3RlZDogJ2BzdHJpbmdgJyxcbiAgICAgICAgICAgIGFjdHVhbDogdmFsVHlwZSxcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICBrZXkgPT09ICdyZXBsYWNlJyB8fFxuICAgICAgICBrZXkgPT09ICdzY3JvbGwnIHx8XG4gICAgICAgIGtleSA9PT0gJ3NoYWxsb3cnIHx8XG4gICAgICAgIGtleSA9PT0gJ3Bhc3NIcmVmJyB8fFxuICAgICAgICBrZXkgPT09ICdwcmVmZXRjaCdcbiAgICAgICkge1xuICAgICAgICBpZiAocHJvcHNba2V5XSAhPSBudWxsICYmIHZhbFR5cGUgIT09ICdib29sZWFuJykge1xuICAgICAgICAgIHRocm93IGNyZWF0ZVByb3BFcnJvcih7XG4gICAgICAgICAgICBrZXksXG4gICAgICAgICAgICBleHBlY3RlZDogJ2Bib29sZWFuYCcsXG4gICAgICAgICAgICBhY3R1YWw6IHZhbFR5cGUsXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gVHlwZVNjcmlwdCB0cmljayBmb3IgdHlwZS1ndWFyZGluZzpcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xuICAgICAgICBjb25zdCBfOiBuZXZlciA9IGtleVxuICAgICAgfVxuICAgIH0pXG5cbiAgICAvLyBUaGlzIGhvb2sgaXMgaW4gYSBjb25kaXRpb25hbCBidXQgdGhhdCBpcyBvayBiZWNhdXNlIGBwcm9jZXNzLmVudi5OT0RFX0VOVmAgbmV2ZXIgY2hhbmdlc1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC1ob29rcy9ydWxlcy1vZi1ob29rc1xuICAgIGNvbnN0IGhhc1dhcm5lZCA9IFJlYWN0LnVzZVJlZihmYWxzZSlcbiAgICBpZiAocHJvcHMucHJlZmV0Y2ggJiYgIWhhc1dhcm5lZC5jdXJyZW50KSB7XG4gICAgICBoYXNXYXJuZWQuY3VycmVudCA9IHRydWVcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgJ05leHQuanMgYXV0by1wcmVmZXRjaGVzIGF1dG9tYXRpY2FsbHkgYmFzZWQgb24gdmlld3BvcnQuIFRoZSBwcmVmZXRjaCBhdHRyaWJ1dGUgaXMgbm8gbG9uZ2VyIG5lZWRlZC4gTW9yZTogaHR0cHM6Ly9uZXh0anMub3JnL2RvY3MvbWVzc2FnZXMvcHJlZmV0Y2gtdHJ1ZS1kZXByZWNhdGVkJ1xuICAgICAgKVxuICAgIH1cbiAgfVxuICBjb25zdCBwID0gcHJvcHMucHJlZmV0Y2ggIT09IGZhbHNlXG5cbiAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKClcbiAgY29uc3QgcGF0aG5hbWUgPSAocm91dGVyICYmIHJvdXRlci5hc1BhdGgpIHx8ICcvJ1xuXG4gIGNvbnN0IHsgaHJlZiwgYXMgfSA9IFJlYWN0LnVzZU1lbW8oKCkgPT4ge1xuICAgIGNvbnN0IFtyZXNvbHZlZEhyZWYsIHJlc29sdmVkQXNdID0gcmVzb2x2ZUhyZWYocGF0aG5hbWUsIHByb3BzLmhyZWYsIHRydWUpXG4gICAgcmV0dXJuIHtcbiAgICAgIGhyZWY6IHJlc29sdmVkSHJlZixcbiAgICAgIGFzOiBwcm9wcy5hc1xuICAgICAgICA/IHJlc29sdmVIcmVmKHBhdGhuYW1lLCBwcm9wcy5hcylcbiAgICAgICAgOiByZXNvbHZlZEFzIHx8IHJlc29sdmVkSHJlZixcbiAgICB9XG4gIH0sIFtwYXRobmFtZSwgcHJvcHMuaHJlZiwgcHJvcHMuYXNdKVxuXG4gIGxldCB7IGNoaWxkcmVuLCByZXBsYWNlLCBzaGFsbG93LCBzY3JvbGwsIGxvY2FsZSB9ID0gcHJvcHNcblxuICAvLyBEZXByZWNhdGVkLiBXYXJuaW5nIHNob3duIGJ5IHByb3BUeXBlIGNoZWNrLiBJZiB0aGUgY2hpbGRyZW4gcHJvdmlkZWQgaXMgYSBzdHJpbmcgKDxMaW5rPmV4YW1wbGU8L0xpbms+KSB3ZSB3cmFwIGl0IGluIGFuIDxhPiB0YWdcbiAgaWYgKHR5cGVvZiBjaGlsZHJlbiA9PT0gJ3N0cmluZycpIHtcbiAgICBjaGlsZHJlbiA9IDxhPntjaGlsZHJlbn08L2E+XG4gIH1cblxuICAvLyBUaGlzIHdpbGwgcmV0dXJuIHRoZSBmaXJzdCBjaGlsZCwgaWYgbXVsdGlwbGUgYXJlIHByb3ZpZGVkIGl0IHdpbGwgdGhyb3cgYW4gZXJyb3JcbiAgY29uc3QgY2hpbGQ6IGFueSA9IENoaWxkcmVuLm9ubHkoY2hpbGRyZW4pXG4gIGNvbnN0IGNoaWxkUmVmOiBhbnkgPSBjaGlsZCAmJiB0eXBlb2YgY2hpbGQgPT09ICdvYmplY3QnICYmIGNoaWxkLnJlZlxuXG4gIGNvbnN0IFtzZXRJbnRlcnNlY3Rpb25SZWYsIGlzVmlzaWJsZV0gPSB1c2VJbnRlcnNlY3Rpb24oe1xuICAgIHJvb3RNYXJnaW46ICcyMDBweCcsXG4gIH0pXG4gIGNvbnN0IHNldFJlZiA9IFJlYWN0LnVzZUNhbGxiYWNrKFxuICAgIChlbDogRWxlbWVudCkgPT4ge1xuICAgICAgc2V0SW50ZXJzZWN0aW9uUmVmKGVsKVxuICAgICAgaWYgKGNoaWxkUmVmKSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2hpbGRSZWYgPT09ICdmdW5jdGlvbicpIGNoaWxkUmVmKGVsKVxuICAgICAgICBlbHNlIGlmICh0eXBlb2YgY2hpbGRSZWYgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgY2hpbGRSZWYuY3VycmVudCA9IGVsXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIFtjaGlsZFJlZiwgc2V0SW50ZXJzZWN0aW9uUmVmXVxuICApXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3Qgc2hvdWxkUHJlZmV0Y2ggPSBpc1Zpc2libGUgJiYgcCAmJiBpc0xvY2FsVVJMKGhyZWYpXG4gICAgY29uc3QgY3VyTG9jYWxlID1cbiAgICAgIHR5cGVvZiBsb2NhbGUgIT09ICd1bmRlZmluZWQnID8gbG9jYWxlIDogcm91dGVyICYmIHJvdXRlci5sb2NhbGVcbiAgICBjb25zdCBpc1ByZWZldGNoZWQgPVxuICAgICAgcHJlZmV0Y2hlZFtocmVmICsgJyUnICsgYXMgKyAoY3VyTG9jYWxlID8gJyUnICsgY3VyTG9jYWxlIDogJycpXVxuICAgIGlmIChzaG91bGRQcmVmZXRjaCAmJiAhaXNQcmVmZXRjaGVkKSB7XG4gICAgICBwcmVmZXRjaChyb3V0ZXIsIGhyZWYsIGFzLCB7XG4gICAgICAgIGxvY2FsZTogY3VyTG9jYWxlLFxuICAgICAgfSlcbiAgICB9XG4gIH0sIFthcywgaHJlZiwgaXNWaXNpYmxlLCBsb2NhbGUsIHAsIHJvdXRlcl0pXG5cbiAgY29uc3QgY2hpbGRQcm9wczoge1xuICAgIG9uTW91c2VFbnRlcj86IFJlYWN0Lk1vdXNlRXZlbnRIYW5kbGVyXG4gICAgb25DbGljazogUmVhY3QuTW91c2VFdmVudEhhbmRsZXJcbiAgICBocmVmPzogc3RyaW5nXG4gICAgcmVmPzogYW55XG4gIH0gPSB7XG4gICAgcmVmOiBzZXRSZWYsXG4gICAgb25DbGljazogKGU6IFJlYWN0Lk1vdXNlRXZlbnQpID0+IHtcbiAgICAgIGlmIChjaGlsZC5wcm9wcyAmJiB0eXBlb2YgY2hpbGQucHJvcHMub25DbGljayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBjaGlsZC5wcm9wcy5vbkNsaWNrKGUpXG4gICAgICB9XG4gICAgICBpZiAoIWUuZGVmYXVsdFByZXZlbnRlZCkge1xuICAgICAgICBsaW5rQ2xpY2tlZChlLCByb3V0ZXIsIGhyZWYsIGFzLCByZXBsYWNlLCBzaGFsbG93LCBzY3JvbGwsIGxvY2FsZSlcbiAgICAgIH1cbiAgICB9LFxuICB9XG5cbiAgY2hpbGRQcm9wcy5vbk1vdXNlRW50ZXIgPSAoZTogUmVhY3QuTW91c2VFdmVudCkgPT4ge1xuICAgIGlmICghaXNMb2NhbFVSTChocmVmKSkgcmV0dXJuXG4gICAgaWYgKGNoaWxkLnByb3BzICYmIHR5cGVvZiBjaGlsZC5wcm9wcy5vbk1vdXNlRW50ZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNoaWxkLnByb3BzLm9uTW91c2VFbnRlcihlKVxuICAgIH1cbiAgICBwcmVmZXRjaChyb3V0ZXIsIGhyZWYsIGFzLCB7IHByaW9yaXR5OiB0cnVlIH0pXG4gIH1cblxuICAvLyBJZiBjaGlsZCBpcyBhbiA8YT4gdGFnIGFuZCBkb2Vzbid0IGhhdmUgYSBocmVmIGF0dHJpYnV0ZSwgb3IgaWYgdGhlICdwYXNzSHJlZicgcHJvcGVydHkgaXNcbiAgLy8gZGVmaW5lZCwgd2Ugc3BlY2lmeSB0aGUgY3VycmVudCAnaHJlZicsIHNvIHRoYXQgcmVwZXRpdGlvbiBpcyBub3QgbmVlZGVkIGJ5IHRoZSB1c2VyXG4gIGlmIChwcm9wcy5wYXNzSHJlZiB8fCAoY2hpbGQudHlwZSA9PT0gJ2EnICYmICEoJ2hyZWYnIGluIGNoaWxkLnByb3BzKSkpIHtcbiAgICBjb25zdCBjdXJMb2NhbGUgPVxuICAgICAgdHlwZW9mIGxvY2FsZSAhPT0gJ3VuZGVmaW5lZCcgPyBsb2NhbGUgOiByb3V0ZXIgJiYgcm91dGVyLmxvY2FsZVxuXG4gICAgLy8gd2Ugb25seSByZW5kZXIgZG9tYWluIGxvY2FsZXMgaWYgd2UgYXJlIGN1cnJlbnRseSBvbiBhIGRvbWFpbiBsb2NhbGVcbiAgICAvLyBzbyB0aGF0IGxvY2FsZSBsaW5rcyBhcmUgc3RpbGwgdmlzaXRhYmxlIGluIGRldmVsb3BtZW50L3ByZXZpZXcgZW52c1xuICAgIGNvbnN0IGxvY2FsZURvbWFpbiA9XG4gICAgICByb3V0ZXIgJiZcbiAgICAgIHJvdXRlci5pc0xvY2FsZURvbWFpbiAmJlxuICAgICAgZ2V0RG9tYWluTG9jYWxlKFxuICAgICAgICBhcyxcbiAgICAgICAgY3VyTG9jYWxlLFxuICAgICAgICByb3V0ZXIgJiYgcm91dGVyLmxvY2FsZXMsXG4gICAgICAgIHJvdXRlciAmJiByb3V0ZXIuZG9tYWluTG9jYWxlc1xuICAgICAgKVxuXG4gICAgY2hpbGRQcm9wcy5ocmVmID1cbiAgICAgIGxvY2FsZURvbWFpbiB8fFxuICAgICAgYWRkQmFzZVBhdGgoYWRkTG9jYWxlKGFzLCBjdXJMb2NhbGUsIHJvdXRlciAmJiByb3V0ZXIuZGVmYXVsdExvY2FsZSkpXG4gIH1cblxuICByZXR1cm4gUmVhY3QuY2xvbmVFbGVtZW50KGNoaWxkLCBjaGlsZFByb3BzKVxufVxuXG5leHBvcnQgZGVmYXVsdCBMaW5rXG4iLCIvKipcbiAqIFJlbW92ZXMgdGhlIHRyYWlsaW5nIHNsYXNoIG9mIGEgcGF0aCBpZiB0aGVyZSBpcyBvbmUuIFByZXNlcnZlcyB0aGUgcm9vdCBwYXRoIGAvYC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZVBhdGhUcmFpbGluZ1NsYXNoKHBhdGg6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBwYXRoLmVuZHNXaXRoKCcvJykgJiYgcGF0aCAhPT0gJy8nID8gcGF0aC5zbGljZSgwLCAtMSkgOiBwYXRoXG59XG5cbi8qKlxuICogTm9ybWFsaXplcyB0aGUgdHJhaWxpbmcgc2xhc2ggb2YgYSBwYXRoIGFjY29yZGluZyB0byB0aGUgYHRyYWlsaW5nU2xhc2hgIG9wdGlvblxuICogaW4gYG5leHQuY29uZmlnLmpzYC5cbiAqL1xuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZVBhdGhUcmFpbGluZ1NsYXNoID0gcHJvY2Vzcy5lbnYuX19ORVhUX1RSQUlMSU5HX1NMQVNIXG4gID8gKHBhdGg6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gICAgICBpZiAoL1xcLlteL10rXFwvPyQvLnRlc3QocGF0aCkpIHtcbiAgICAgICAgcmV0dXJuIHJlbW92ZVBhdGhUcmFpbGluZ1NsYXNoKHBhdGgpXG4gICAgICB9IGVsc2UgaWYgKHBhdGguZW5kc1dpdGgoJy8nKSkge1xuICAgICAgICByZXR1cm4gcGF0aFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHBhdGggKyAnLydcbiAgICAgIH1cbiAgICB9XG4gIDogcmVtb3ZlUGF0aFRyYWlsaW5nU2xhc2hcbiIsInR5cGUgUmVxdWVzdElkbGVDYWxsYmFja0hhbmRsZSA9IGFueVxudHlwZSBSZXF1ZXN0SWRsZUNhbGxiYWNrT3B0aW9ucyA9IHtcbiAgdGltZW91dDogbnVtYmVyXG59XG50eXBlIFJlcXVlc3RJZGxlQ2FsbGJhY2tEZWFkbGluZSA9IHtcbiAgcmVhZG9ubHkgZGlkVGltZW91dDogYm9vbGVhblxuICB0aW1lUmVtYWluaW5nOiAoKSA9PiBudW1iZXJcbn1cblxuZGVjbGFyZSBnbG9iYWwge1xuICBpbnRlcmZhY2UgV2luZG93IHtcbiAgICByZXF1ZXN0SWRsZUNhbGxiYWNrOiAoXG4gICAgICBjYWxsYmFjazogKGRlYWRsaW5lOiBSZXF1ZXN0SWRsZUNhbGxiYWNrRGVhZGxpbmUpID0+IHZvaWQsXG4gICAgICBvcHRzPzogUmVxdWVzdElkbGVDYWxsYmFja09wdGlvbnNcbiAgICApID0+IFJlcXVlc3RJZGxlQ2FsbGJhY2tIYW5kbGVcbiAgICBjYW5jZWxJZGxlQ2FsbGJhY2s6IChpZDogUmVxdWVzdElkbGVDYWxsYmFja0hhbmRsZSkgPT4gdm9pZFxuICB9XG59XG5cbmV4cG9ydCBjb25zdCByZXF1ZXN0SWRsZUNhbGxiYWNrID1cbiAgKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyAmJiBzZWxmLnJlcXVlc3RJZGxlQ2FsbGJhY2spIHx8XG4gIGZ1bmN0aW9uIChcbiAgICBjYjogKGRlYWRsaW5lOiBSZXF1ZXN0SWRsZUNhbGxiYWNrRGVhZGxpbmUpID0+IHZvaWRcbiAgKTogTm9kZUpTLlRpbWVvdXQge1xuICAgIGxldCBzdGFydCA9IERhdGUubm93KClcbiAgICByZXR1cm4gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICBjYih7XG4gICAgICAgIGRpZFRpbWVvdXQ6IGZhbHNlLFxuICAgICAgICB0aW1lUmVtYWluaW5nOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIE1hdGgubWF4KDAsIDUwIC0gKERhdGUubm93KCkgLSBzdGFydCkpXG4gICAgICAgIH0sXG4gICAgICB9KVxuICAgIH0sIDEpXG4gIH1cblxuZXhwb3J0IGNvbnN0IGNhbmNlbElkbGVDYWxsYmFjayA9XG4gICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgJiYgc2VsZi5jYW5jZWxJZGxlQ2FsbGJhY2spIHx8XG4gIGZ1bmN0aW9uIChpZDogUmVxdWVzdElkbGVDYWxsYmFja0hhbmRsZSkge1xuICAgIHJldHVybiBjbGVhclRpbWVvdXQoaWQpXG4gIH1cbiIsImltcG9ydCB7IENvbXBvbmVudFR5cGUgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IENsaWVudEJ1aWxkTWFuaWZlc3QgfSBmcm9tICcuLi9idWlsZC93ZWJwYWNrL3BsdWdpbnMvYnVpbGQtbWFuaWZlc3QtcGx1Z2luJ1xuaW1wb3J0IGdldEFzc2V0UGF0aEZyb21Sb3V0ZSBmcm9tICcuLi9uZXh0LXNlcnZlci9saWIvcm91dGVyL3V0aWxzL2dldC1hc3NldC1wYXRoLWZyb20tcm91dGUnXG5pbXBvcnQgeyByZXF1ZXN0SWRsZUNhbGxiYWNrIH0gZnJvbSAnLi9yZXF1ZXN0LWlkbGUtY2FsbGJhY2snXG5cbi8vIDMuOHMgd2FzIGFyYml0cmFyaWx5IGNob3NlbiBhcyBpdCdzIHdoYXQgaHR0cHM6Ly93ZWIuZGV2L2ludGVyYWN0aXZlXG4vLyBjb25zaWRlcnMgYXMgXCJHb29kXCIgdGltZS10by1pbnRlcmFjdGl2ZS4gV2UgbXVzdCBhc3N1bWUgc29tZXRoaW5nIHdlbnRcbi8vIHdyb25nIGJleW9uZCB0aGlzIHBvaW50LCBhbmQgdGhlbiBmYWxsLWJhY2sgdG8gYSBmdWxsIHBhZ2UgdHJhbnNpdGlvbiB0b1xuLy8gc2hvdyB0aGUgdXNlciBzb21ldGhpbmcgb2YgdmFsdWUuXG5jb25zdCBNU19NQVhfSURMRV9ERUxBWSA9IDM4MDBcblxuZGVjbGFyZSBnbG9iYWwge1xuICBpbnRlcmZhY2UgV2luZG93IHtcbiAgICBfX0JVSUxEX01BTklGRVNUPzogQ2xpZW50QnVpbGRNYW5pZmVzdFxuICAgIF9fQlVJTERfTUFOSUZFU1RfQ0I/OiBGdW5jdGlvblxuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTG9hZGVkRW50cnlwb2ludFN1Y2Nlc3Mge1xuICBjb21wb25lbnQ6IENvbXBvbmVudFR5cGVcbiAgZXhwb3J0czogYW55XG59XG5leHBvcnQgaW50ZXJmYWNlIExvYWRlZEVudHJ5cG9pbnRGYWlsdXJlIHtcbiAgZXJyb3I6IHVua25vd25cbn1cbmV4cG9ydCB0eXBlIFJvdXRlRW50cnlwb2ludCA9IExvYWRlZEVudHJ5cG9pbnRTdWNjZXNzIHwgTG9hZGVkRW50cnlwb2ludEZhaWx1cmVcblxuZXhwb3J0IGludGVyZmFjZSBSb3V0ZVN0eWxlU2hlZXQge1xuICBocmVmOiBzdHJpbmdcbiAgY29udGVudDogc3RyaW5nXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTG9hZGVkUm91dGVTdWNjZXNzIGV4dGVuZHMgTG9hZGVkRW50cnlwb2ludFN1Y2Nlc3Mge1xuICBzdHlsZXM6IFJvdXRlU3R5bGVTaGVldFtdXG59XG5leHBvcnQgaW50ZXJmYWNlIExvYWRlZFJvdXRlRmFpbHVyZSB7XG4gIGVycm9yOiB1bmtub3duXG59XG5leHBvcnQgdHlwZSBSb3V0ZUxvYWRlckVudHJ5ID0gTG9hZGVkUm91dGVTdWNjZXNzIHwgTG9hZGVkUm91dGVGYWlsdXJlXG5cbmV4cG9ydCB0eXBlIEZ1dHVyZTxWPiA9IHtcbiAgcmVzb2x2ZTogKGVudHJ5cG9pbnQ6IFYpID0+IHZvaWRcbiAgZnV0dXJlOiBQcm9taXNlPFY+XG59XG5mdW5jdGlvbiB3aXRoRnV0dXJlPFQ+KFxuICBrZXk6IHN0cmluZyxcbiAgbWFwOiBNYXA8c3RyaW5nLCBGdXR1cmU8VD4gfCBUPixcbiAgZ2VuZXJhdG9yPzogKCkgPT4gUHJvbWlzZTxUPlxuKTogUHJvbWlzZTxUPiB7XG4gIGxldCBlbnRyeTogRnV0dXJlPFQ+IHwgVCB8IHVuZGVmaW5lZCA9IG1hcC5nZXQoa2V5KVxuICBpZiAoZW50cnkpIHtcbiAgICBpZiAoJ2Z1dHVyZScgaW4gZW50cnkpIHtcbiAgICAgIHJldHVybiBlbnRyeS5mdXR1cmVcbiAgICB9XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShlbnRyeSlcbiAgfVxuICBsZXQgcmVzb2x2ZXI6IChlbnRyeXBvaW50OiBUKSA9PiB2b2lkXG4gIGNvbnN0IHByb206IFByb21pc2U8VD4gPSBuZXcgUHJvbWlzZTxUPigocmVzb2x2ZSkgPT4ge1xuICAgIHJlc29sdmVyID0gcmVzb2x2ZVxuICB9KVxuICBtYXAuc2V0KGtleSwgKGVudHJ5ID0geyByZXNvbHZlOiByZXNvbHZlciEsIGZ1dHVyZTogcHJvbSB9KSlcbiAgcmV0dXJuIGdlbmVyYXRvclxuICAgID8gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlcXVlbmNlc1xuICAgICAgZ2VuZXJhdG9yKCkudGhlbigodmFsdWUpID0+IChyZXNvbHZlcih2YWx1ZSksIHZhbHVlKSlcbiAgICA6IHByb21cbn1cblxuZXhwb3J0IGludGVyZmFjZSBSb3V0ZUxvYWRlciB7XG4gIHdoZW5FbnRyeXBvaW50KHJvdXRlOiBzdHJpbmcpOiBQcm9taXNlPFJvdXRlRW50cnlwb2ludD5cbiAgb25FbnRyeXBvaW50KHJvdXRlOiBzdHJpbmcsIGV4ZWN1dGU6ICgpID0+IHVua25vd24pOiB2b2lkXG4gIGxvYWRSb3V0ZShyb3V0ZTogc3RyaW5nLCBwcmVmZXRjaD86IGJvb2xlYW4pOiBQcm9taXNlPFJvdXRlTG9hZGVyRW50cnk+XG4gIHByZWZldGNoKHJvdXRlOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+XG59XG5cbmZ1bmN0aW9uIGhhc1ByZWZldGNoKGxpbms/OiBIVE1MTGlua0VsZW1lbnQpOiBib29sZWFuIHtcbiAgdHJ5IHtcbiAgICBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpXG4gICAgcmV0dXJuIChcbiAgICAgIC8vIGRldGVjdCBJRTExIHNpbmNlIGl0IHN1cHBvcnRzIHByZWZldGNoIGJ1dCBpc24ndCBkZXRlY3RlZFxuICAgICAgLy8gd2l0aCByZWxMaXN0LnN1cHBvcnRcbiAgICAgICghIXdpbmRvdy5NU0lucHV0TWV0aG9kQ29udGV4dCAmJiAhIShkb2N1bWVudCBhcyBhbnkpLmRvY3VtZW50TW9kZSkgfHxcbiAgICAgIGxpbmsucmVsTGlzdC5zdXBwb3J0cygncHJlZmV0Y2gnKVxuICAgIClcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxuY29uc3QgY2FuUHJlZmV0Y2g6IGJvb2xlYW4gPSBoYXNQcmVmZXRjaCgpXG5cbmZ1bmN0aW9uIHByZWZldGNoVmlhRG9tKFxuICBocmVmOiBzdHJpbmcsXG4gIGFzOiBzdHJpbmcsXG4gIGxpbms/OiBIVE1MTGlua0VsZW1lbnRcbik6IFByb21pc2U8YW55PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgbGlua1tyZWw9XCJwcmVmZXRjaFwiXVtocmVmXj1cIiR7aHJlZn1cIl1gKSkge1xuICAgICAgcmV0dXJuIHJlcygpXG4gICAgfVxuXG4gICAgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKVxuXG4gICAgLy8gVGhlIG9yZGVyIG9mIHByb3BlcnR5IGFzc2lnbm1lbnQgaGVyZSBpcyBpbnRlbnRpb25hbDpcbiAgICBpZiAoYXMpIGxpbmshLmFzID0gYXNcbiAgICBsaW5rIS5yZWwgPSBgcHJlZmV0Y2hgXG4gICAgbGluayEuY3Jvc3NPcmlnaW4gPSBwcm9jZXNzLmVudi5fX05FWFRfQ1JPU1NfT1JJR0lOIVxuICAgIGxpbmshLm9ubG9hZCA9IHJlc1xuICAgIGxpbmshLm9uZXJyb3IgPSByZWpcblxuICAgIC8vIGBocmVmYCBzaG91bGQgYWx3YXlzIGJlIGxhc3Q6XG4gICAgbGluayEuaHJlZiA9IGhyZWZcblxuICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQobGluaylcbiAgfSlcbn1cblxuY29uc3QgQVNTRVRfTE9BRF9FUlJPUiA9IFN5bWJvbCgnQVNTRVRfTE9BRF9FUlJPUicpXG4vLyBUT0RPOiB1bmV4cG9ydFxuZXhwb3J0IGZ1bmN0aW9uIG1hcmtBc3NldEVycm9yKGVycjogRXJyb3IpOiBFcnJvciB7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXJyLCBBU1NFVF9MT0FEX0VSUk9SLCB7fSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQXNzZXRFcnJvcihlcnI/OiBFcnJvcik6IGJvb2xlYW4gfCB1bmRlZmluZWQge1xuICByZXR1cm4gZXJyICYmIEFTU0VUX0xPQURfRVJST1IgaW4gZXJyXG59XG5cbmZ1bmN0aW9uIGFwcGVuZFNjcmlwdChcbiAgc3JjOiBzdHJpbmcsXG4gIHNjcmlwdD86IEhUTUxTY3JpcHRFbGVtZW50XG4pOiBQcm9taXNlPHVua25vd24+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKVxuXG4gICAgLy8gVGhlIG9yZGVyIG9mIHByb3BlcnR5IGFzc2lnbm1lbnQgaGVyZSBpcyBpbnRlbnRpb25hbC5cbiAgICAvLyAxLiBTZXR1cCBzdWNjZXNzL2ZhaWx1cmUgaG9va3MgaW4gY2FzZSB0aGUgYnJvd3NlciBzeW5jaHJvbm91c2x5XG4gICAgLy8gICAgZXhlY3V0ZXMgd2hlbiBgc3JjYCBpcyBzZXQuXG4gICAgc2NyaXB0Lm9ubG9hZCA9IHJlc29sdmVcbiAgICBzY3JpcHQub25lcnJvciA9ICgpID0+XG4gICAgICByZWplY3QobWFya0Fzc2V0RXJyb3IobmV3IEVycm9yKGBGYWlsZWQgdG8gbG9hZCBzY3JpcHQ6ICR7c3JjfWApKSlcblxuICAgIC8vIDIuIENvbmZpZ3VyZSB0aGUgY3Jvc3Mtb3JpZ2luIGF0dHJpYnV0ZSBiZWZvcmUgc2V0dGluZyBgc3JjYCBpbiBjYXNlIHRoZVxuICAgIC8vICAgIGJyb3dzZXIgYmVnaW5zIHRvIGZldGNoLlxuICAgIHNjcmlwdC5jcm9zc09yaWdpbiA9IHByb2Nlc3MuZW52Ll9fTkVYVF9DUk9TU19PUklHSU4hXG5cbiAgICAvLyAzLiBGaW5hbGx5LCBzZXQgdGhlIHNvdXJjZSBhbmQgaW5qZWN0IGludG8gdGhlIERPTSBpbiBjYXNlIHRoZSBjaGlsZFxuICAgIC8vICAgIG11c3QgYmUgYXBwZW5kZWQgZm9yIGZldGNoaW5nIHRvIHN0YXJ0LlxuICAgIHNjcmlwdC5zcmMgPSBzcmNcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNjcmlwdClcbiAgfSlcbn1cblxuLy8gUmVzb2x2ZSBhIHByb21pc2UgdGhhdCB0aW1lcyBvdXQgYWZ0ZXIgZ2l2ZW4gYW1vdW50IG9mIG1pbGxpc2Vjb25kcy5cbmZ1bmN0aW9uIHJlc29sdmVQcm9taXNlV2l0aFRpbWVvdXQ8VD4oXG4gIHA6IFByb21pc2U8VD4sXG4gIG1zOiBudW1iZXIsXG4gIGVycjogRXJyb3Jcbik6IFByb21pc2U8VD4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGxldCBjYW5jZWxsZWQgPSBmYWxzZVxuXG4gICAgcC50aGVuKChyKSA9PiB7XG4gICAgICAvLyBSZXNvbHZlZCwgY2FuY2VsIHRoZSB0aW1lb3V0XG4gICAgICBjYW5jZWxsZWQgPSB0cnVlXG4gICAgICByZXNvbHZlKHIpXG4gICAgfSkuY2F0Y2gocmVqZWN0KVxuXG4gICAgcmVxdWVzdElkbGVDYWxsYmFjaygoKSA9PlxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGlmICghY2FuY2VsbGVkKSB7XG4gICAgICAgICAgcmVqZWN0KGVycilcbiAgICAgICAgfVxuICAgICAgfSwgbXMpXG4gICAgKVxuICB9KVxufVxuXG4vLyBUT0RPOiBzdG9wIGV4cG9ydGluZyBvciBjYWNoZSB0aGUgZmFpbHVyZVxuLy8gSXQnZCBiZSBiZXN0IHRvIHN0b3AgZXhwb3J0aW5nIHRoaXMuIEl0J3MgYW4gaW1wbGVtZW50YXRpb24gZGV0YWlsLiBXZSdyZVxuLy8gb25seSBleHBvcnRpbmcgaXQgZm9yIGJhY2t3YXJkcyBjb21wYXRpYmlsdHkgd2l0aCB0aGUgYHBhZ2UtbG9hZGVyYC5cbi8vIE9ubHkgY2FjaGUgdGhpcyByZXNwb25zZSBhcyBhIGxhc3QgcmVzb3J0IGlmIHdlIGNhbm5vdCBlbGltaW5hdGUgYWxsIG90aGVyXG4vLyBjb2RlIGJyYW5jaGVzIHRoYXQgdXNlIHRoZSBCdWlsZCBNYW5pZmVzdCBDYWxsYmFjayBhbmQgcHVzaCB0aGVtIHRocm91Z2hcbi8vIHRoZSBSb3V0ZSBMb2FkZXIgaW50ZXJmYWNlLlxuZXhwb3J0IGZ1bmN0aW9uIGdldENsaWVudEJ1aWxkTWFuaWZlc3QoKTogUHJvbWlzZTxDbGllbnRCdWlsZE1hbmlmZXN0PiB7XG4gIGlmIChzZWxmLl9fQlVJTERfTUFOSUZFU1QpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHNlbGYuX19CVUlMRF9NQU5JRkVTVClcbiAgfVxuXG4gIGNvbnN0IG9uQnVpbGRNYW5pZmVzdDogUHJvbWlzZTxDbGllbnRCdWlsZE1hbmlmZXN0PiA9IG5ldyBQcm9taXNlPFxuICAgIENsaWVudEJ1aWxkTWFuaWZlc3RcbiAgPigocmVzb2x2ZSkgPT4ge1xuICAgIC8vIE1hbmRhdG9yeSBiZWNhdXNlIHRoaXMgaXMgbm90IGNvbmN1cnJlbnQgc2FmZTpcbiAgICBjb25zdCBjYiA9IHNlbGYuX19CVUlMRF9NQU5JRkVTVF9DQlxuICAgIHNlbGYuX19CVUlMRF9NQU5JRkVTVF9DQiA9ICgpID0+IHtcbiAgICAgIHJlc29sdmUoc2VsZi5fX0JVSUxEX01BTklGRVNUISlcbiAgICAgIGNiICYmIGNiKClcbiAgICB9XG4gIH0pXG5cbiAgcmV0dXJuIHJlc29sdmVQcm9taXNlV2l0aFRpbWVvdXQ8Q2xpZW50QnVpbGRNYW5pZmVzdD4oXG4gICAgb25CdWlsZE1hbmlmZXN0LFxuICAgIE1TX01BWF9JRExFX0RFTEFZLFxuICAgIG1hcmtBc3NldEVycm9yKG5ldyBFcnJvcignRmFpbGVkIHRvIGxvYWQgY2xpZW50IGJ1aWxkIG1hbmlmZXN0JykpXG4gIClcbn1cblxuaW50ZXJmYWNlIFJvdXRlRmlsZXMge1xuICBzY3JpcHRzOiBzdHJpbmdbXVxuICBjc3M6IHN0cmluZ1tdXG59XG5mdW5jdGlvbiBnZXRGaWxlc0ZvclJvdXRlKFxuICBhc3NldFByZWZpeDogc3RyaW5nLFxuICByb3V0ZTogc3RyaW5nXG4pOiBQcm9taXNlPFJvdXRlRmlsZXM+IHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh7XG4gICAgICBzY3JpcHRzOiBbXG4gICAgICAgIGFzc2V0UHJlZml4ICtcbiAgICAgICAgICAnL19uZXh0L3N0YXRpYy9jaHVua3MvcGFnZXMnICtcbiAgICAgICAgICBlbmNvZGVVUkkoZ2V0QXNzZXRQYXRoRnJvbVJvdXRlKHJvdXRlLCAnLmpzJykpLFxuICAgICAgXSxcbiAgICAgIC8vIFN0eWxlcyBhcmUgaGFuZGxlZCBieSBgc3R5bGUtbG9hZGVyYCBpbiBkZXZlbG9wbWVudDpcbiAgICAgIGNzczogW10sXG4gICAgfSlcbiAgfVxuICByZXR1cm4gZ2V0Q2xpZW50QnVpbGRNYW5pZmVzdCgpLnRoZW4oKG1hbmlmZXN0KSA9PiB7XG4gICAgaWYgKCEocm91dGUgaW4gbWFuaWZlc3QpKSB7XG4gICAgICB0aHJvdyBtYXJrQXNzZXRFcnJvcihuZXcgRXJyb3IoYEZhaWxlZCB0byBsb29rdXAgcm91dGU6ICR7cm91dGV9YCkpXG4gICAgfVxuICAgIGNvbnN0IGFsbEZpbGVzID0gbWFuaWZlc3Rbcm91dGVdLm1hcChcbiAgICAgIChlbnRyeSkgPT4gYXNzZXRQcmVmaXggKyAnL19uZXh0LycgKyBlbmNvZGVVUkkoZW50cnkpXG4gICAgKVxuICAgIHJldHVybiB7XG4gICAgICBzY3JpcHRzOiBhbGxGaWxlcy5maWx0ZXIoKHYpID0+IHYuZW5kc1dpdGgoJy5qcycpKSxcbiAgICAgIGNzczogYWxsRmlsZXMuZmlsdGVyKCh2KSA9PiB2LmVuZHNXaXRoKCcuY3NzJykpLFxuICAgIH1cbiAgfSlcbn1cblxuZnVuY3Rpb24gY3JlYXRlUm91dGVMb2FkZXIoYXNzZXRQcmVmaXg6IHN0cmluZyk6IFJvdXRlTG9hZGVyIHtcbiAgY29uc3QgZW50cnlwb2ludHM6IE1hcDxcbiAgICBzdHJpbmcsXG4gICAgRnV0dXJlPFJvdXRlRW50cnlwb2ludD4gfCBSb3V0ZUVudHJ5cG9pbnRcbiAgPiA9IG5ldyBNYXAoKVxuICBjb25zdCBsb2FkZWRTY3JpcHRzOiBNYXA8c3RyaW5nLCBQcm9taXNlPHVua25vd24+PiA9IG5ldyBNYXAoKVxuICBjb25zdCBzdHlsZVNoZWV0czogTWFwPHN0cmluZywgUHJvbWlzZTxSb3V0ZVN0eWxlU2hlZXQ+PiA9IG5ldyBNYXAoKVxuICBjb25zdCByb3V0ZXM6IE1hcDxcbiAgICBzdHJpbmcsXG4gICAgRnV0dXJlPFJvdXRlTG9hZGVyRW50cnk+IHwgUm91dGVMb2FkZXJFbnRyeVxuICA+ID0gbmV3IE1hcCgpXG5cbiAgZnVuY3Rpb24gbWF5YmVFeGVjdXRlU2NyaXB0KHNyYzogc3RyaW5nKTogUHJvbWlzZTx1bmtub3duPiB7XG4gICAgbGV0IHByb206IFByb21pc2U8dW5rbm93bj4gfCB1bmRlZmluZWQgPSBsb2FkZWRTY3JpcHRzLmdldChzcmMpXG4gICAgaWYgKHByb20pIHtcbiAgICAgIHJldHVybiBwcm9tXG4gICAgfVxuXG4gICAgLy8gU2tpcCBleGVjdXRpbmcgc2NyaXB0IGlmIGl0J3MgYWxyZWFkeSBpbiB0aGUgRE9NOlxuICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBzY3JpcHRbc3JjXj1cIiR7c3JjfVwiXWApKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcbiAgICB9XG5cbiAgICBsb2FkZWRTY3JpcHRzLnNldChzcmMsIChwcm9tID0gYXBwZW5kU2NyaXB0KHNyYykpKVxuICAgIHJldHVybiBwcm9tXG4gIH1cblxuICBmdW5jdGlvbiBmZXRjaFN0eWxlU2hlZXQoaHJlZjogc3RyaW5nKTogUHJvbWlzZTxSb3V0ZVN0eWxlU2hlZXQ+IHtcbiAgICBsZXQgcHJvbTogUHJvbWlzZTxSb3V0ZVN0eWxlU2hlZXQ+IHwgdW5kZWZpbmVkID0gc3R5bGVTaGVldHMuZ2V0KGhyZWYpXG4gICAgaWYgKHByb20pIHtcbiAgICAgIHJldHVybiBwcm9tXG4gICAgfVxuXG4gICAgc3R5bGVTaGVldHMuc2V0KFxuICAgICAgaHJlZixcbiAgICAgIChwcm9tID0gZmV0Y2goaHJlZilcbiAgICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgIGlmICghcmVzLm9rKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEZhaWxlZCB0byBsb2FkIHN0eWxlc2hlZXQ6ICR7aHJlZn1gKVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcmVzLnRleHQoKS50aGVuKCh0ZXh0KSA9PiAoeyBocmVmOiBocmVmLCBjb250ZW50OiB0ZXh0IH0pKVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgIHRocm93IG1hcmtBc3NldEVycm9yKGVycilcbiAgICAgICAgfSkpXG4gICAgKVxuICAgIHJldHVybiBwcm9tXG4gIH1cblxuICByZXR1cm4ge1xuICAgIHdoZW5FbnRyeXBvaW50KHJvdXRlOiBzdHJpbmcpIHtcbiAgICAgIHJldHVybiB3aXRoRnV0dXJlKHJvdXRlLCBlbnRyeXBvaW50cylcbiAgICB9LFxuICAgIG9uRW50cnlwb2ludChyb3V0ZTogc3RyaW5nLCBleGVjdXRlOiAoKSA9PiB1bmtub3duKSB7XG4gICAgICBQcm9taXNlLnJlc29sdmUoZXhlY3V0ZSlcbiAgICAgICAgLnRoZW4oKGZuKSA9PiBmbigpKVxuICAgICAgICAudGhlbihcbiAgICAgICAgICAoZXhwb3J0czogYW55KSA9PiAoe1xuICAgICAgICAgICAgY29tcG9uZW50OiAoZXhwb3J0cyAmJiBleHBvcnRzLmRlZmF1bHQpIHx8IGV4cG9ydHMsXG4gICAgICAgICAgICBleHBvcnRzOiBleHBvcnRzLFxuICAgICAgICAgIH0pLFxuICAgICAgICAgIChlcnIpID0+ICh7IGVycm9yOiBlcnIgfSlcbiAgICAgICAgKVxuICAgICAgICAudGhlbigoaW5wdXQ6IFJvdXRlRW50cnlwb2ludCkgPT4ge1xuICAgICAgICAgIGNvbnN0IG9sZCA9IGVudHJ5cG9pbnRzLmdldChyb3V0ZSlcbiAgICAgICAgICBlbnRyeXBvaW50cy5zZXQocm91dGUsIGlucHV0KVxuICAgICAgICAgIGlmIChvbGQgJiYgJ3Jlc29sdmUnIGluIG9sZCkgb2xkLnJlc29sdmUoaW5wdXQpXG4gICAgICAgIH0pXG4gICAgfSxcbiAgICBsb2FkUm91dGUocm91dGU6IHN0cmluZywgcHJlZmV0Y2g/OiBib29sZWFuKSB7XG4gICAgICByZXR1cm4gd2l0aEZ1dHVyZTxSb3V0ZUxvYWRlckVudHJ5Pihyb3V0ZSwgcm91dGVzLCAoKSA9PiB7XG4gICAgICAgIHJldHVybiByZXNvbHZlUHJvbWlzZVdpdGhUaW1lb3V0KFxuICAgICAgICAgIGdldEZpbGVzRm9yUm91dGUoYXNzZXRQcmVmaXgsIHJvdXRlKVxuICAgICAgICAgICAgLnRoZW4oKHsgc2NyaXB0cywgY3NzIH0pID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgICAgICBlbnRyeXBvaW50cy5oYXMocm91dGUpXG4gICAgICAgICAgICAgICAgICA/IFtdXG4gICAgICAgICAgICAgICAgICA6IFByb21pc2UuYWxsKHNjcmlwdHMubWFwKG1heWJlRXhlY3V0ZVNjcmlwdCkpLFxuICAgICAgICAgICAgICAgIFByb21pc2UuYWxsKGNzcy5tYXAoZmV0Y2hTdHlsZVNoZWV0KSksXG4gICAgICAgICAgICAgIF0gYXMgY29uc3QpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gdGhpcy53aGVuRW50cnlwb2ludChyb3V0ZSkudGhlbigoZW50cnlwb2ludCkgPT4gKHtcbiAgICAgICAgICAgICAgICBlbnRyeXBvaW50LFxuICAgICAgICAgICAgICAgIHN0eWxlczogcmVzWzFdLFxuICAgICAgICAgICAgICB9KSlcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgIE1TX01BWF9JRExFX0RFTEFZLFxuICAgICAgICAgIG1hcmtBc3NldEVycm9yKG5ldyBFcnJvcihgUm91dGUgZGlkIG5vdCBjb21wbGV0ZSBsb2FkaW5nOiAke3JvdXRlfWApKVxuICAgICAgICApXG4gICAgICAgICAgLnRoZW4oKHsgZW50cnlwb2ludCwgc3R5bGVzIH0pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHJlczogUm91dGVMb2FkZXJFbnRyeSA9IE9iamVjdC5hc3NpZ248XG4gICAgICAgICAgICAgIHsgc3R5bGVzOiBSb3V0ZVN0eWxlU2hlZXRbXSB9LFxuICAgICAgICAgICAgICBSb3V0ZUVudHJ5cG9pbnRcbiAgICAgICAgICAgID4oeyBzdHlsZXM6IHN0eWxlcyEgfSwgZW50cnlwb2ludClcbiAgICAgICAgICAgIHJldHVybiAnZXJyb3InIGluIGVudHJ5cG9pbnQgPyBlbnRyeXBvaW50IDogcmVzXG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgaWYgKHByZWZldGNoKSB7XG4gICAgICAgICAgICAgIC8vIHdlIGRvbid0IHdhbnQgdG8gY2FjaGUgZXJyb3JzIGR1cmluZyBwcmVmZXRjaFxuICAgICAgICAgICAgICB0aHJvdyBlcnJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7IGVycm9yOiBlcnIgfVxuICAgICAgICAgIH0pXG4gICAgICB9KVxuICAgIH0sXG4gICAgcHJlZmV0Y2gocm91dGU6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL0dvb2dsZUNocm9tZUxhYnMvcXVpY2tsaW5rL2Jsb2IvNDUzYTY2MWZhMWZhOTQwZTJkMmUwNDQ0NTIzOThlMzhjNjdhOThmYi9zcmMvaW5kZXgubWpzI0wxMTUtTDExOFxuICAgICAgLy8gTGljZW5zZTogQXBhY2hlIDIuMFxuICAgICAgbGV0IGNuXG4gICAgICBpZiAoKGNuID0gKG5hdmlnYXRvciBhcyBhbnkpLmNvbm5lY3Rpb24pKSB7XG4gICAgICAgIC8vIERvbid0IHByZWZldGNoIGlmIHVzaW5nIDJHIG9yIGlmIFNhdmUtRGF0YSBpcyBlbmFibGVkLlxuICAgICAgICBpZiAoY24uc2F2ZURhdGEgfHwgLzJnLy50ZXN0KGNuLmVmZmVjdGl2ZVR5cGUpKSByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcbiAgICAgIH1cbiAgICAgIHJldHVybiBnZXRGaWxlc0ZvclJvdXRlKGFzc2V0UHJlZml4LCByb3V0ZSlcbiAgICAgICAgLnRoZW4oKG91dHB1dCkgPT5cbiAgICAgICAgICBQcm9taXNlLmFsbChcbiAgICAgICAgICAgIGNhblByZWZldGNoXG4gICAgICAgICAgICAgID8gb3V0cHV0LnNjcmlwdHMubWFwKChzY3JpcHQpID0+IHByZWZldGNoVmlhRG9tKHNjcmlwdCwgJ3NjcmlwdCcpKVxuICAgICAgICAgICAgICA6IFtdXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICByZXF1ZXN0SWRsZUNhbGxiYWNrKCgpID0+IHRoaXMubG9hZFJvdXRlKHJvdXRlLCB0cnVlKS5jYXRjaCgoKSA9PiB7fSkpXG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChcbiAgICAgICAgICAvLyBzd2FsbG93IHByZWZldGNoIGVycm9yc1xuICAgICAgICAgICgpID0+IHt9XG4gICAgICAgIClcbiAgICB9LFxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVJvdXRlTG9hZGVyXG4iLCIvKiBnbG9iYWwgd2luZG93ICovXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgUm91dGVyLCB7IE5leHRSb3V0ZXIgfSBmcm9tICcuLi9uZXh0LXNlcnZlci9saWIvcm91dGVyL3JvdXRlcidcbmltcG9ydCB7IFJvdXRlckNvbnRleHQgfSBmcm9tICcuLi9uZXh0LXNlcnZlci9saWIvcm91dGVyLWNvbnRleHQnXG5cbnR5cGUgQ2xhc3NBcmd1bWVudHM8VD4gPSBUIGV4dGVuZHMgbmV3ICguLi5hcmdzOiBpbmZlciBVKSA9PiBhbnkgPyBVIDogYW55XG5cbnR5cGUgUm91dGVyQXJncyA9IENsYXNzQXJndW1lbnRzPHR5cGVvZiBSb3V0ZXI+XG5cbnR5cGUgU2luZ2xldG9uUm91dGVyQmFzZSA9IHtcbiAgcm91dGVyOiBSb3V0ZXIgfCBudWxsXG4gIHJlYWR5Q2FsbGJhY2tzOiBBcnJheTwoKSA9PiBhbnk+XG4gIHJlYWR5KGNiOiAoKSA9PiBhbnkpOiB2b2lkXG59XG5cbmV4cG9ydCB7IFJvdXRlciwgTmV4dFJvdXRlciB9XG5cbmV4cG9ydCB0eXBlIFNpbmdsZXRvblJvdXRlciA9IFNpbmdsZXRvblJvdXRlckJhc2UgJiBOZXh0Um91dGVyXG5cbmNvbnN0IHNpbmdsZXRvblJvdXRlcjogU2luZ2xldG9uUm91dGVyQmFzZSA9IHtcbiAgcm91dGVyOiBudWxsLCAvLyBob2xkcyB0aGUgYWN0dWFsIHJvdXRlciBpbnN0YW5jZVxuICByZWFkeUNhbGxiYWNrczogW10sXG4gIHJlYWR5KGNiOiAoKSA9PiB2b2lkKSB7XG4gICAgaWYgKHRoaXMucm91dGVyKSByZXR1cm4gY2IoKVxuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhpcy5yZWFkeUNhbGxiYWNrcy5wdXNoKGNiKVxuICAgIH1cbiAgfSxcbn1cblxuLy8gQ3JlYXRlIHB1YmxpYyBwcm9wZXJ0aWVzIGFuZCBtZXRob2RzIG9mIHRoZSByb3V0ZXIgaW4gdGhlIHNpbmdsZXRvblJvdXRlclxuY29uc3QgdXJsUHJvcGVydHlGaWVsZHMgPSBbXG4gICdwYXRobmFtZScsXG4gICdyb3V0ZScsXG4gICdxdWVyeScsXG4gICdhc1BhdGgnLFxuICAnY29tcG9uZW50cycsXG4gICdpc0ZhbGxiYWNrJyxcbiAgJ2Jhc2VQYXRoJyxcbiAgJ2xvY2FsZScsXG4gICdsb2NhbGVzJyxcbiAgJ2RlZmF1bHRMb2NhbGUnLFxuICAnaXNSZWFkeScsXG4gICdpc1ByZXZpZXcnLFxuICAnaXNMb2NhbGVEb21haW4nLFxuXVxuY29uc3Qgcm91dGVyRXZlbnRzID0gW1xuICAncm91dGVDaGFuZ2VTdGFydCcsXG4gICdiZWZvcmVIaXN0b3J5Q2hhbmdlJyxcbiAgJ3JvdXRlQ2hhbmdlQ29tcGxldGUnLFxuICAncm91dGVDaGFuZ2VFcnJvcicsXG4gICdoYXNoQ2hhbmdlU3RhcnQnLFxuICAnaGFzaENoYW5nZUNvbXBsZXRlJyxcbl1cbmNvbnN0IGNvcmVNZXRob2RGaWVsZHMgPSBbXG4gICdwdXNoJyxcbiAgJ3JlcGxhY2UnLFxuICAncmVsb2FkJyxcbiAgJ2JhY2snLFxuICAncHJlZmV0Y2gnLFxuICAnYmVmb3JlUG9wU3RhdGUnLFxuXVxuXG4vLyBFdmVudHMgaXMgYSBzdGF0aWMgcHJvcGVydHkgb24gdGhlIHJvdXRlciwgdGhlIHJvdXRlciBkb2Vzbid0IGhhdmUgdG8gYmUgaW5pdGlhbGl6ZWQgdG8gdXNlIGl0XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoc2luZ2xldG9uUm91dGVyLCAnZXZlbnRzJywge1xuICBnZXQoKSB7XG4gICAgcmV0dXJuIFJvdXRlci5ldmVudHNcbiAgfSxcbn0pXG5cbnVybFByb3BlcnR5RmllbGRzLmZvckVhY2goKGZpZWxkOiBzdHJpbmcpID0+IHtcbiAgLy8gSGVyZSB3ZSBuZWVkIHRvIHVzZSBPYmplY3QuZGVmaW5lUHJvcGVydHkgYmVjYXVzZSwgd2UgbmVlZCB0byByZXR1cm5cbiAgLy8gdGhlIHByb3BlcnR5IGFzc2lnbmVkIHRvIHRoZSBhY3R1YWwgcm91dGVyXG4gIC8vIFRoZSB2YWx1ZSBtaWdodCBnZXQgY2hhbmdlZCBhcyB3ZSBjaGFuZ2Ugcm91dGVzIGFuZCB0aGlzIGlzIHRoZVxuICAvLyBwcm9wZXIgd2F5IHRvIGFjY2VzcyBpdFxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoc2luZ2xldG9uUm91dGVyLCBmaWVsZCwge1xuICAgIGdldCgpIHtcbiAgICAgIGNvbnN0IHJvdXRlciA9IGdldFJvdXRlcigpIGFzIGFueVxuICAgICAgcmV0dXJuIHJvdXRlcltmaWVsZF0gYXMgc3RyaW5nXG4gICAgfSxcbiAgfSlcbn0pXG5cbmNvcmVNZXRob2RGaWVsZHMuZm9yRWFjaCgoZmllbGQ6IHN0cmluZykgPT4ge1xuICAvLyBXZSBkb24ndCByZWFsbHkga25vdyB0aGUgdHlwZXMgaGVyZSwgc28gd2UgYWRkIHRoZW0gbGF0ZXIgaW5zdGVhZFxuICA7KHNpbmdsZXRvblJvdXRlciBhcyBhbnkpW2ZpZWxkXSA9ICguLi5hcmdzOiBhbnlbXSkgPT4ge1xuICAgIGNvbnN0IHJvdXRlciA9IGdldFJvdXRlcigpIGFzIGFueVxuICAgIHJldHVybiByb3V0ZXJbZmllbGRdKC4uLmFyZ3MpXG4gIH1cbn0pXG5cbnJvdXRlckV2ZW50cy5mb3JFYWNoKChldmVudDogc3RyaW5nKSA9PiB7XG4gIHNpbmdsZXRvblJvdXRlci5yZWFkeSgoKSA9PiB7XG4gICAgUm91dGVyLmV2ZW50cy5vbihldmVudCwgKC4uLmFyZ3MpID0+IHtcbiAgICAgIGNvbnN0IGV2ZW50RmllbGQgPSBgb24ke2V2ZW50LmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpfSR7ZXZlbnQuc3Vic3RyaW5nKFxuICAgICAgICAxXG4gICAgICApfWBcbiAgICAgIGNvbnN0IF9zaW5nbGV0b25Sb3V0ZXIgPSBzaW5nbGV0b25Sb3V0ZXIgYXMgYW55XG4gICAgICBpZiAoX3NpbmdsZXRvblJvdXRlcltldmVudEZpZWxkXSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIF9zaW5nbGV0b25Sb3V0ZXJbZXZlbnRGaWVsZF0oLi4uYXJncylcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihgRXJyb3Igd2hlbiBydW5uaW5nIHRoZSBSb3V0ZXIgZXZlbnQ6ICR7ZXZlbnRGaWVsZH1gKVxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYCR7ZXJyLm1lc3NhZ2V9XFxuJHtlcnIuc3RhY2t9YClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gIH0pXG59KVxuXG5mdW5jdGlvbiBnZXRSb3V0ZXIoKTogUm91dGVyIHtcbiAgaWYgKCFzaW5nbGV0b25Sb3V0ZXIucm91dGVyKSB7XG4gICAgY29uc3QgbWVzc2FnZSA9XG4gICAgICAnTm8gcm91dGVyIGluc3RhbmNlIGZvdW5kLlxcbicgK1xuICAgICAgJ1lvdSBzaG91bGQgb25seSB1c2UgXCJuZXh0L3JvdXRlclwiIGluc2lkZSB0aGUgY2xpZW50IHNpZGUgb2YgeW91ciBhcHAuXFxuJ1xuICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKVxuICB9XG4gIHJldHVybiBzaW5nbGV0b25Sb3V0ZXIucm91dGVyXG59XG5cbi8vIEV4cG9ydCB0aGUgc2luZ2xldG9uUm91dGVyIGFuZCB0aGlzIGlzIHRoZSBwdWJsaWMgQVBJLlxuZXhwb3J0IGRlZmF1bHQgc2luZ2xldG9uUm91dGVyIGFzIFNpbmdsZXRvblJvdXRlclxuXG4vLyBSZWV4cG9ydCB0aGUgd2l0aFJvdXRlIEhPQ1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB3aXRoUm91dGVyIH0gZnJvbSAnLi93aXRoLXJvdXRlcidcblxuZXhwb3J0IGZ1bmN0aW9uIHVzZVJvdXRlcigpOiBOZXh0Um91dGVyIHtcbiAgcmV0dXJuIFJlYWN0LnVzZUNvbnRleHQoUm91dGVyQ29udGV4dClcbn1cblxuLy8gSU5URVJOQUwgQVBJU1xuLy8gLS0tLS0tLS0tLS0tLVxuLy8gKGRvIG5vdCB1c2UgZm9sbG93aW5nIGV4cG9ydHMgaW5zaWRlIHRoZSBhcHApXG5cbi8vIENyZWF0ZSBhIHJvdXRlciBhbmQgYXNzaWduIGl0IGFzIHRoZSBzaW5nbGV0b24gaW5zdGFuY2UuXG4vLyBUaGlzIGlzIHVzZWQgaW4gY2xpZW50IHNpZGUgd2hlbiB3ZSBhcmUgaW5pdGlsaXppbmcgdGhlIGFwcC5cbi8vIFRoaXMgc2hvdWxkICoqbm90KiogdXNlIGluc2lkZSB0aGUgc2VydmVyLlxuZXhwb3J0IGNvbnN0IGNyZWF0ZVJvdXRlciA9ICguLi5hcmdzOiBSb3V0ZXJBcmdzKTogUm91dGVyID0+IHtcbiAgc2luZ2xldG9uUm91dGVyLnJvdXRlciA9IG5ldyBSb3V0ZXIoLi4uYXJncylcbiAgc2luZ2xldG9uUm91dGVyLnJlYWR5Q2FsbGJhY2tzLmZvckVhY2goKGNiKSA9PiBjYigpKVxuICBzaW5nbGV0b25Sb3V0ZXIucmVhZHlDYWxsYmFja3MgPSBbXVxuXG4gIHJldHVybiBzaW5nbGV0b25Sb3V0ZXIucm91dGVyXG59XG5cbi8vIFRoaXMgZnVuY3Rpb24gaXMgdXNlZCB0byBjcmVhdGUgdGhlIGB3aXRoUm91dGVyYCByb3V0ZXIgaW5zdGFuY2VcbmV4cG9ydCBmdW5jdGlvbiBtYWtlUHVibGljUm91dGVySW5zdGFuY2Uocm91dGVyOiBSb3V0ZXIpOiBOZXh0Um91dGVyIHtcbiAgY29uc3QgX3JvdXRlciA9IHJvdXRlciBhcyBhbnlcbiAgY29uc3QgaW5zdGFuY2UgPSB7fSBhcyBhbnlcblxuICBmb3IgKGNvbnN0IHByb3BlcnR5IG9mIHVybFByb3BlcnR5RmllbGRzKSB7XG4gICAgaWYgKHR5cGVvZiBfcm91dGVyW3Byb3BlcnR5XSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGluc3RhbmNlW3Byb3BlcnR5XSA9IE9iamVjdC5hc3NpZ24oXG4gICAgICAgIEFycmF5LmlzQXJyYXkoX3JvdXRlcltwcm9wZXJ0eV0pID8gW10gOiB7fSxcbiAgICAgICAgX3JvdXRlcltwcm9wZXJ0eV1cbiAgICAgICkgLy8gbWFrZXMgc3VyZSBxdWVyeSBpcyBub3Qgc3RhdGVmdWxcbiAgICAgIGNvbnRpbnVlXG4gICAgfVxuXG4gICAgaW5zdGFuY2VbcHJvcGVydHldID0gX3JvdXRlcltwcm9wZXJ0eV1cbiAgfVxuXG4gIC8vIEV2ZW50cyBpcyBhIHN0YXRpYyBwcm9wZXJ0eSBvbiB0aGUgcm91dGVyLCB0aGUgcm91dGVyIGRvZXNuJ3QgaGF2ZSB0byBiZSBpbml0aWFsaXplZCB0byB1c2UgaXRcbiAgaW5zdGFuY2UuZXZlbnRzID0gUm91dGVyLmV2ZW50c1xuXG4gIGNvcmVNZXRob2RGaWVsZHMuZm9yRWFjaCgoZmllbGQpID0+IHtcbiAgICBpbnN0YW5jZVtmaWVsZF0gPSAoLi4uYXJnczogYW55W10pID0+IHtcbiAgICAgIHJldHVybiBfcm91dGVyW2ZpZWxkXSguLi5hcmdzKVxuICAgIH1cbiAgfSlcblxuICByZXR1cm4gaW5zdGFuY2Vcbn1cbiIsImltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7XG4gIHJlcXVlc3RJZGxlQ2FsbGJhY2ssXG4gIGNhbmNlbElkbGVDYWxsYmFjayxcbn0gZnJvbSAnLi9yZXF1ZXN0LWlkbGUtY2FsbGJhY2snXG5cbnR5cGUgVXNlSW50ZXJzZWN0aW9uT2JzZXJ2ZXJJbml0ID0gUGljazxJbnRlcnNlY3Rpb25PYnNlcnZlckluaXQsICdyb290TWFyZ2luJz5cbnR5cGUgVXNlSW50ZXJzZWN0aW9uID0geyBkaXNhYmxlZD86IGJvb2xlYW4gfSAmIFVzZUludGVyc2VjdGlvbk9ic2VydmVySW5pdFxudHlwZSBPYnNlcnZlQ2FsbGJhY2sgPSAoaXNWaXNpYmxlOiBib29sZWFuKSA9PiB2b2lkXG50eXBlIE9ic2VydmVyID0ge1xuICBpZDogc3RyaW5nXG4gIG9ic2VydmVyOiBJbnRlcnNlY3Rpb25PYnNlcnZlclxuICBlbGVtZW50czogTWFwPEVsZW1lbnQsIE9ic2VydmVDYWxsYmFjaz5cbn1cblxuY29uc3QgaGFzSW50ZXJzZWN0aW9uT2JzZXJ2ZXIgPSB0eXBlb2YgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIgIT09ICd1bmRlZmluZWQnXG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VJbnRlcnNlY3Rpb248VCBleHRlbmRzIEVsZW1lbnQ+KHtcbiAgcm9vdE1hcmdpbixcbiAgZGlzYWJsZWQsXG59OiBVc2VJbnRlcnNlY3Rpb24pOiBbKGVsZW1lbnQ6IFQgfCBudWxsKSA9PiB2b2lkLCBib29sZWFuXSB7XG4gIGNvbnN0IGlzRGlzYWJsZWQ6IGJvb2xlYW4gPSBkaXNhYmxlZCB8fCAhaGFzSW50ZXJzZWN0aW9uT2JzZXJ2ZXJcblxuICBjb25zdCB1bm9ic2VydmUgPSB1c2VSZWY8RnVuY3Rpb24+KClcbiAgY29uc3QgW3Zpc2libGUsIHNldFZpc2libGVdID0gdXNlU3RhdGUoZmFsc2UpXG5cbiAgY29uc3Qgc2V0UmVmID0gdXNlQ2FsbGJhY2soXG4gICAgKGVsOiBUIHwgbnVsbCkgPT4ge1xuICAgICAgaWYgKHVub2JzZXJ2ZS5jdXJyZW50KSB7XG4gICAgICAgIHVub2JzZXJ2ZS5jdXJyZW50KClcbiAgICAgICAgdW5vYnNlcnZlLmN1cnJlbnQgPSB1bmRlZmluZWRcbiAgICAgIH1cblxuICAgICAgaWYgKGlzRGlzYWJsZWQgfHwgdmlzaWJsZSkgcmV0dXJuXG5cbiAgICAgIGlmIChlbCAmJiBlbC50YWdOYW1lKSB7XG4gICAgICAgIHVub2JzZXJ2ZS5jdXJyZW50ID0gb2JzZXJ2ZShcbiAgICAgICAgICBlbCxcbiAgICAgICAgICAoaXNWaXNpYmxlKSA9PiBpc1Zpc2libGUgJiYgc2V0VmlzaWJsZShpc1Zpc2libGUpLFxuICAgICAgICAgIHsgcm9vdE1hcmdpbiB9XG4gICAgICAgIClcbiAgICAgIH1cbiAgICB9LFxuICAgIFtpc0Rpc2FibGVkLCByb290TWFyZ2luLCB2aXNpYmxlXVxuICApXG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWhhc0ludGVyc2VjdGlvbk9ic2VydmVyKSB7XG4gICAgICBpZiAoIXZpc2libGUpIHtcbiAgICAgICAgY29uc3QgaWRsZUNhbGxiYWNrID0gcmVxdWVzdElkbGVDYWxsYmFjaygoKSA9PiBzZXRWaXNpYmxlKHRydWUpKVxuICAgICAgICByZXR1cm4gKCkgPT4gY2FuY2VsSWRsZUNhbGxiYWNrKGlkbGVDYWxsYmFjaylcbiAgICAgIH1cbiAgICB9XG4gIH0sIFt2aXNpYmxlXSlcblxuICByZXR1cm4gW3NldFJlZiwgdmlzaWJsZV1cbn1cblxuZnVuY3Rpb24gb2JzZXJ2ZShcbiAgZWxlbWVudDogRWxlbWVudCxcbiAgY2FsbGJhY2s6IE9ic2VydmVDYWxsYmFjayxcbiAgb3B0aW9uczogVXNlSW50ZXJzZWN0aW9uT2JzZXJ2ZXJJbml0XG4pOiAoKSA9PiB2b2lkIHtcbiAgY29uc3QgeyBpZCwgb2JzZXJ2ZXIsIGVsZW1lbnRzIH0gPSBjcmVhdGVPYnNlcnZlcihvcHRpb25zKVxuICBlbGVtZW50cy5zZXQoZWxlbWVudCwgY2FsbGJhY2spXG5cbiAgb2JzZXJ2ZXIub2JzZXJ2ZShlbGVtZW50KVxuICByZXR1cm4gZnVuY3Rpb24gdW5vYnNlcnZlKCk6IHZvaWQge1xuICAgIGVsZW1lbnRzLmRlbGV0ZShlbGVtZW50KVxuICAgIG9ic2VydmVyLnVub2JzZXJ2ZShlbGVtZW50KVxuXG4gICAgLy8gRGVzdHJveSBvYnNlcnZlciB3aGVuIHRoZXJlJ3Mgbm90aGluZyBsZWZ0IHRvIHdhdGNoOlxuICAgIGlmIChlbGVtZW50cy5zaXplID09PSAwKSB7XG4gICAgICBvYnNlcnZlci5kaXNjb25uZWN0KClcbiAgICAgIG9ic2VydmVycy5kZWxldGUoaWQpXG4gICAgfVxuICB9XG59XG5cbmNvbnN0IG9ic2VydmVycyA9IG5ldyBNYXA8c3RyaW5nLCBPYnNlcnZlcj4oKVxuZnVuY3Rpb24gY3JlYXRlT2JzZXJ2ZXIob3B0aW9uczogVXNlSW50ZXJzZWN0aW9uT2JzZXJ2ZXJJbml0KTogT2JzZXJ2ZXIge1xuICBjb25zdCBpZCA9IG9wdGlvbnMucm9vdE1hcmdpbiB8fCAnJ1xuICBsZXQgaW5zdGFuY2UgPSBvYnNlcnZlcnMuZ2V0KGlkKVxuICBpZiAoaW5zdGFuY2UpIHtcbiAgICByZXR1cm4gaW5zdGFuY2VcbiAgfVxuXG4gIGNvbnN0IGVsZW1lbnRzID0gbmV3IE1hcDxFbGVtZW50LCBPYnNlcnZlQ2FsbGJhY2s+KClcbiAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoKGVudHJpZXMpID0+IHtcbiAgICBlbnRyaWVzLmZvckVhY2goKGVudHJ5KSA9PiB7XG4gICAgICBjb25zdCBjYWxsYmFjayA9IGVsZW1lbnRzLmdldChlbnRyeS50YXJnZXQpXG4gICAgICBjb25zdCBpc1Zpc2libGUgPSBlbnRyeS5pc0ludGVyc2VjdGluZyB8fCBlbnRyeS5pbnRlcnNlY3Rpb25SYXRpbyA+IDBcbiAgICAgIGlmIChjYWxsYmFjayAmJiBpc1Zpc2libGUpIHtcbiAgICAgICAgY2FsbGJhY2soaXNWaXNpYmxlKVxuICAgICAgfVxuICAgIH0pXG4gIH0sIG9wdGlvbnMpXG5cbiAgb2JzZXJ2ZXJzLnNldChcbiAgICBpZCxcbiAgICAoaW5zdGFuY2UgPSB7XG4gICAgICBpZCxcbiAgICAgIG9ic2VydmVyLFxuICAgICAgZWxlbWVudHMsXG4gICAgfSlcbiAgKVxuICByZXR1cm4gaW5zdGFuY2Vcbn1cbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IE5leHRDb21wb25lbnRUeXBlLCBOZXh0UGFnZUNvbnRleHQgfSBmcm9tICcuLi9uZXh0LXNlcnZlci9saWIvdXRpbHMnXG5pbXBvcnQgeyBOZXh0Um91dGVyLCB1c2VSb3V0ZXIgfSBmcm9tICcuL3JvdXRlcidcblxuZXhwb3J0IHR5cGUgV2l0aFJvdXRlclByb3BzID0ge1xuICByb3V0ZXI6IE5leHRSb3V0ZXJcbn1cblxuZXhwb3J0IHR5cGUgRXhjbHVkZVJvdXRlclByb3BzPFA+ID0gUGljazxcbiAgUCxcbiAgRXhjbHVkZTxrZXlvZiBQLCBrZXlvZiBXaXRoUm91dGVyUHJvcHM+XG4+XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHdpdGhSb3V0ZXI8XG4gIFAgZXh0ZW5kcyBXaXRoUm91dGVyUHJvcHMsXG4gIEMgPSBOZXh0UGFnZUNvbnRleHRcbj4oXG4gIENvbXBvc2VkQ29tcG9uZW50OiBOZXh0Q29tcG9uZW50VHlwZTxDLCBhbnksIFA+XG4pOiBSZWFjdC5Db21wb25lbnRUeXBlPEV4Y2x1ZGVSb3V0ZXJQcm9wczxQPj4ge1xuICBmdW5jdGlvbiBXaXRoUm91dGVyV3JhcHBlcihwcm9wczogYW55KTogSlNYLkVsZW1lbnQge1xuICAgIHJldHVybiA8Q29tcG9zZWRDb21wb25lbnQgcm91dGVyPXt1c2VSb3V0ZXIoKX0gey4uLnByb3BzfSAvPlxuICB9XG5cbiAgV2l0aFJvdXRlcldyYXBwZXIuZ2V0SW5pdGlhbFByb3BzID0gQ29tcG9zZWRDb21wb25lbnQuZ2V0SW5pdGlhbFByb3BzXG4gIC8vIFRoaXMgaXMgbmVlZGVkIHRvIGFsbG93IGNoZWNraW5nIGZvciBjdXN0b20gZ2V0SW5pdGlhbFByb3BzIGluIF9hcHBcbiAgOyhXaXRoUm91dGVyV3JhcHBlciBhcyBhbnkpLm9yaWdHZXRJbml0aWFsUHJvcHMgPSAoQ29tcG9zZWRDb21wb25lbnQgYXMgYW55KS5vcmlnR2V0SW5pdGlhbFByb3BzXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgY29uc3QgbmFtZSA9XG4gICAgICBDb21wb3NlZENvbXBvbmVudC5kaXNwbGF5TmFtZSB8fCBDb21wb3NlZENvbXBvbmVudC5uYW1lIHx8ICdVbmtub3duJ1xuICAgIFdpdGhSb3V0ZXJXcmFwcGVyLmRpc3BsYXlOYW1lID0gYHdpdGhSb3V0ZXIoJHtuYW1lfSlgXG4gIH1cblxuICByZXR1cm4gV2l0aFJvdXRlcldyYXBwZXJcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBUb2tlbml6ZSBpbnB1dCBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIGxleGVyKHN0cikge1xuICAgIHZhciB0b2tlbnMgPSBbXTtcbiAgICB2YXIgaSA9IDA7XG4gICAgd2hpbGUgKGkgPCBzdHIubGVuZ3RoKSB7XG4gICAgICAgIHZhciBjaGFyID0gc3RyW2ldO1xuICAgICAgICBpZiAoY2hhciA9PT0gXCIqXCIgfHwgY2hhciA9PT0gXCIrXCIgfHwgY2hhciA9PT0gXCI/XCIpIHtcbiAgICAgICAgICAgIHRva2Vucy5wdXNoKHsgdHlwZTogXCJNT0RJRklFUlwiLCBpbmRleDogaSwgdmFsdWU6IHN0cltpKytdIH0pO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoYXIgPT09IFwiXFxcXFwiKSB7XG4gICAgICAgICAgICB0b2tlbnMucHVzaCh7IHR5cGU6IFwiRVNDQVBFRF9DSEFSXCIsIGluZGV4OiBpKyssIHZhbHVlOiBzdHJbaSsrXSB9KTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjaGFyID09PSBcIntcIikge1xuICAgICAgICAgICAgdG9rZW5zLnB1c2goeyB0eXBlOiBcIk9QRU5cIiwgaW5kZXg6IGksIHZhbHVlOiBzdHJbaSsrXSB9KTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjaGFyID09PSBcIn1cIikge1xuICAgICAgICAgICAgdG9rZW5zLnB1c2goeyB0eXBlOiBcIkNMT1NFXCIsIGluZGV4OiBpLCB2YWx1ZTogc3RyW2krK10gfSk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2hhciA9PT0gXCI6XCIpIHtcbiAgICAgICAgICAgIHZhciBuYW1lID0gXCJcIjtcbiAgICAgICAgICAgIHZhciBqID0gaSArIDE7XG4gICAgICAgICAgICB3aGlsZSAoaiA8IHN0ci5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB2YXIgY29kZSA9IHN0ci5jaGFyQ29kZUF0KGopO1xuICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAvLyBgMC05YFxuICAgICAgICAgICAgICAgIChjb2RlID49IDQ4ICYmIGNvZGUgPD0gNTcpIHx8XG4gICAgICAgICAgICAgICAgICAgIC8vIGBBLVpgXG4gICAgICAgICAgICAgICAgICAgIChjb2RlID49IDY1ICYmIGNvZGUgPD0gOTApIHx8XG4gICAgICAgICAgICAgICAgICAgIC8vIGBhLXpgXG4gICAgICAgICAgICAgICAgICAgIChjb2RlID49IDk3ICYmIGNvZGUgPD0gMTIyKSB8fFxuICAgICAgICAgICAgICAgICAgICAvLyBgX2BcbiAgICAgICAgICAgICAgICAgICAgY29kZSA9PT0gOTUpIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZSArPSBzdHJbaisrXTtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFuYW1lKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJNaXNzaW5nIHBhcmFtZXRlciBuYW1lIGF0IFwiICsgaSk7XG4gICAgICAgICAgICB0b2tlbnMucHVzaCh7IHR5cGU6IFwiTkFNRVwiLCBpbmRleDogaSwgdmFsdWU6IG5hbWUgfSk7XG4gICAgICAgICAgICBpID0gajtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjaGFyID09PSBcIihcIikge1xuICAgICAgICAgICAgdmFyIGNvdW50ID0gMTtcbiAgICAgICAgICAgIHZhciBwYXR0ZXJuID0gXCJcIjtcbiAgICAgICAgICAgIHZhciBqID0gaSArIDE7XG4gICAgICAgICAgICBpZiAoc3RyW2pdID09PSBcIj9cIikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQYXR0ZXJuIGNhbm5vdCBzdGFydCB3aXRoIFxcXCI/XFxcIiBhdCBcIiArIGopO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2hpbGUgKGogPCBzdHIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN0cltqXSA9PT0gXCJcXFxcXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgcGF0dGVybiArPSBzdHJbaisrXSArIHN0cltqKytdO1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHN0cltqXSA9PT0gXCIpXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgY291bnQtLTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvdW50ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBqKys7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChzdHJbal0gPT09IFwiKFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdHJbaiArIDFdICE9PSBcIj9cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhcHR1cmluZyBncm91cHMgYXJlIG5vdCBhbGxvd2VkIGF0IFwiICsgaik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcGF0dGVybiArPSBzdHJbaisrXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjb3VudClcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiVW5iYWxhbmNlZCBwYXR0ZXJuIGF0IFwiICsgaSk7XG4gICAgICAgICAgICBpZiAoIXBhdHRlcm4pXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIk1pc3NpbmcgcGF0dGVybiBhdCBcIiArIGkpO1xuICAgICAgICAgICAgdG9rZW5zLnB1c2goeyB0eXBlOiBcIlBBVFRFUk5cIiwgaW5kZXg6IGksIHZhbHVlOiBwYXR0ZXJuIH0pO1xuICAgICAgICAgICAgaSA9IGo7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICB0b2tlbnMucHVzaCh7IHR5cGU6IFwiQ0hBUlwiLCBpbmRleDogaSwgdmFsdWU6IHN0cltpKytdIH0pO1xuICAgIH1cbiAgICB0b2tlbnMucHVzaCh7IHR5cGU6IFwiRU5EXCIsIGluZGV4OiBpLCB2YWx1ZTogXCJcIiB9KTtcbiAgICByZXR1cm4gdG9rZW5zO1xufVxuLyoqXG4gKiBQYXJzZSBhIHN0cmluZyBmb3IgdGhlIHJhdyB0b2tlbnMuXG4gKi9cbmZ1bmN0aW9uIHBhcnNlKHN0ciwgb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IHt9OyB9XG4gICAgdmFyIHRva2VucyA9IGxleGVyKHN0cik7XG4gICAgdmFyIF9hID0gb3B0aW9ucy5wcmVmaXhlcywgcHJlZml4ZXMgPSBfYSA9PT0gdm9pZCAwID8gXCIuL1wiIDogX2E7XG4gICAgdmFyIGRlZmF1bHRQYXR0ZXJuID0gXCJbXlwiICsgZXNjYXBlU3RyaW5nKG9wdGlvbnMuZGVsaW1pdGVyIHx8IFwiLyM/XCIpICsgXCJdKz9cIjtcbiAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgdmFyIGtleSA9IDA7XG4gICAgdmFyIGkgPSAwO1xuICAgIHZhciBwYXRoID0gXCJcIjtcbiAgICB2YXIgdHJ5Q29uc3VtZSA9IGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgICAgIGlmIChpIDwgdG9rZW5zLmxlbmd0aCAmJiB0b2tlbnNbaV0udHlwZSA9PT0gdHlwZSlcbiAgICAgICAgICAgIHJldHVybiB0b2tlbnNbaSsrXS52YWx1ZTtcbiAgICB9O1xuICAgIHZhciBtdXN0Q29uc3VtZSA9IGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IHRyeUNvbnN1bWUodHlwZSk7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB2YXIgX2EgPSB0b2tlbnNbaV0sIG5leHRUeXBlID0gX2EudHlwZSwgaW5kZXggPSBfYS5pbmRleDtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlVuZXhwZWN0ZWQgXCIgKyBuZXh0VHlwZSArIFwiIGF0IFwiICsgaW5kZXggKyBcIiwgZXhwZWN0ZWQgXCIgKyB0eXBlKTtcbiAgICB9O1xuICAgIHZhciBjb25zdW1lVGV4dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IFwiXCI7XG4gICAgICAgIHZhciB2YWx1ZTtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lXG4gICAgICAgIHdoaWxlICgodmFsdWUgPSB0cnlDb25zdW1lKFwiQ0hBUlwiKSB8fCB0cnlDb25zdW1lKFwiRVNDQVBFRF9DSEFSXCIpKSkge1xuICAgICAgICAgICAgcmVzdWx0ICs9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgICB3aGlsZSAoaSA8IHRva2Vucy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGNoYXIgPSB0cnlDb25zdW1lKFwiQ0hBUlwiKTtcbiAgICAgICAgdmFyIG5hbWUgPSB0cnlDb25zdW1lKFwiTkFNRVwiKTtcbiAgICAgICAgdmFyIHBhdHRlcm4gPSB0cnlDb25zdW1lKFwiUEFUVEVSTlwiKTtcbiAgICAgICAgaWYgKG5hbWUgfHwgcGF0dGVybikge1xuICAgICAgICAgICAgdmFyIHByZWZpeCA9IGNoYXIgfHwgXCJcIjtcbiAgICAgICAgICAgIGlmIChwcmVmaXhlcy5pbmRleE9mKHByZWZpeCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgcGF0aCArPSBwcmVmaXg7XG4gICAgICAgICAgICAgICAgcHJlZml4ID0gXCJcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwYXRoKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2gocGF0aCk7XG4gICAgICAgICAgICAgICAgcGF0aCA9IFwiXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXN1bHQucHVzaCh7XG4gICAgICAgICAgICAgICAgbmFtZTogbmFtZSB8fCBrZXkrKyxcbiAgICAgICAgICAgICAgICBwcmVmaXg6IHByZWZpeCxcbiAgICAgICAgICAgICAgICBzdWZmaXg6IFwiXCIsXG4gICAgICAgICAgICAgICAgcGF0dGVybjogcGF0dGVybiB8fCBkZWZhdWx0UGF0dGVybixcbiAgICAgICAgICAgICAgICBtb2RpZmllcjogdHJ5Q29uc3VtZShcIk1PRElGSUVSXCIpIHx8IFwiXCJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHZhbHVlID0gY2hhciB8fCB0cnlDb25zdW1lKFwiRVNDQVBFRF9DSEFSXCIpO1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHBhdGggKz0gdmFsdWU7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGF0aCkge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2gocGF0aCk7XG4gICAgICAgICAgICBwYXRoID0gXCJcIjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgb3BlbiA9IHRyeUNvbnN1bWUoXCJPUEVOXCIpO1xuICAgICAgICBpZiAob3Blbikge1xuICAgICAgICAgICAgdmFyIHByZWZpeCA9IGNvbnN1bWVUZXh0KCk7XG4gICAgICAgICAgICB2YXIgbmFtZV8xID0gdHJ5Q29uc3VtZShcIk5BTUVcIikgfHwgXCJcIjtcbiAgICAgICAgICAgIHZhciBwYXR0ZXJuXzEgPSB0cnlDb25zdW1lKFwiUEFUVEVSTlwiKSB8fCBcIlwiO1xuICAgICAgICAgICAgdmFyIHN1ZmZpeCA9IGNvbnN1bWVUZXh0KCk7XG4gICAgICAgICAgICBtdXN0Q29uc3VtZShcIkNMT1NFXCIpO1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goe1xuICAgICAgICAgICAgICAgIG5hbWU6IG5hbWVfMSB8fCAocGF0dGVybl8xID8ga2V5KysgOiBcIlwiKSxcbiAgICAgICAgICAgICAgICBwYXR0ZXJuOiBuYW1lXzEgJiYgIXBhdHRlcm5fMSA/IGRlZmF1bHRQYXR0ZXJuIDogcGF0dGVybl8xLFxuICAgICAgICAgICAgICAgIHByZWZpeDogcHJlZml4LFxuICAgICAgICAgICAgICAgIHN1ZmZpeDogc3VmZml4LFxuICAgICAgICAgICAgICAgIG1vZGlmaWVyOiB0cnlDb25zdW1lKFwiTU9ESUZJRVJcIikgfHwgXCJcIlxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBtdXN0Q29uc3VtZShcIkVORFwiKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmV4cG9ydHMucGFyc2UgPSBwYXJzZTtcbi8qKlxuICogQ29tcGlsZSBhIHN0cmluZyB0byBhIHRlbXBsYXRlIGZ1bmN0aW9uIGZvciB0aGUgcGF0aC5cbiAqL1xuZnVuY3Rpb24gY29tcGlsZShzdHIsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdG9rZW5zVG9GdW5jdGlvbihwYXJzZShzdHIsIG9wdGlvbnMpLCBvcHRpb25zKTtcbn1cbmV4cG9ydHMuY29tcGlsZSA9IGNvbXBpbGU7XG4vKipcbiAqIEV4cG9zZSBhIG1ldGhvZCBmb3IgdHJhbnNmb3JtaW5nIHRva2VucyBpbnRvIHRoZSBwYXRoIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiB0b2tlbnNUb0Z1bmN0aW9uKHRva2Vucywgb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IHt9OyB9XG4gICAgdmFyIHJlRmxhZ3MgPSBmbGFncyhvcHRpb25zKTtcbiAgICB2YXIgX2EgPSBvcHRpb25zLmVuY29kZSwgZW5jb2RlID0gX2EgPT09IHZvaWQgMCA/IGZ1bmN0aW9uICh4KSB7IHJldHVybiB4OyB9IDogX2EsIF9iID0gb3B0aW9ucy52YWxpZGF0ZSwgdmFsaWRhdGUgPSBfYiA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9iO1xuICAgIC8vIENvbXBpbGUgYWxsIHRoZSB0b2tlbnMgaW50byByZWdleHBzLlxuICAgIHZhciBtYXRjaGVzID0gdG9rZW5zLm1hcChmdW5jdGlvbiAodG9rZW4pIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0b2tlbiA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBSZWdFeHAoXCJeKD86XCIgKyB0b2tlbi5wYXR0ZXJuICsgXCIpJFwiLCByZUZsYWdzKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICB2YXIgcGF0aCA9IFwiXCI7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdG9rZW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgdG9rZW4gPSB0b2tlbnNbaV07XG4gICAgICAgICAgICBpZiAodHlwZW9mIHRva2VuID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgcGF0aCArPSB0b2tlbjtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IGRhdGEgPyBkYXRhW3Rva2VuLm5hbWVdIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgdmFyIG9wdGlvbmFsID0gdG9rZW4ubW9kaWZpZXIgPT09IFwiP1wiIHx8IHRva2VuLm1vZGlmaWVyID09PSBcIipcIjtcbiAgICAgICAgICAgIHZhciByZXBlYXQgPSB0b2tlbi5tb2RpZmllciA9PT0gXCIqXCIgfHwgdG9rZW4ubW9kaWZpZXIgPT09IFwiK1wiO1xuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFyZXBlYXQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkV4cGVjdGVkIFxcXCJcIiArIHRva2VuLm5hbWUgKyBcIlxcXCIgdG8gbm90IHJlcGVhdCwgYnV0IGdvdCBhbiBhcnJheVwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9uYWwpXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkV4cGVjdGVkIFxcXCJcIiArIHRva2VuLm5hbWUgKyBcIlxcXCIgdG8gbm90IGJlIGVtcHR5XCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHZhbHVlLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzZWdtZW50ID0gZW5jb2RlKHZhbHVlW2pdLCB0b2tlbik7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWxpZGF0ZSAmJiAhbWF0Y2hlc1tpXS50ZXN0KHNlZ21lbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiRXhwZWN0ZWQgYWxsIFxcXCJcIiArIHRva2VuLm5hbWUgKyBcIlxcXCIgdG8gbWF0Y2ggXFxcIlwiICsgdG9rZW4ucGF0dGVybiArIFwiXFxcIiwgYnV0IGdvdCBcXFwiXCIgKyBzZWdtZW50ICsgXCJcXFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHBhdGggKz0gdG9rZW4ucHJlZml4ICsgc2VnbWVudCArIHRva2VuLnN1ZmZpeDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiIHx8IHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIikge1xuICAgICAgICAgICAgICAgIHZhciBzZWdtZW50ID0gZW5jb2RlKFN0cmluZyh2YWx1ZSksIHRva2VuKTtcbiAgICAgICAgICAgICAgICBpZiAodmFsaWRhdGUgJiYgIW1hdGNoZXNbaV0udGVzdChzZWdtZW50KSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiRXhwZWN0ZWQgXFxcIlwiICsgdG9rZW4ubmFtZSArIFwiXFxcIiB0byBtYXRjaCBcXFwiXCIgKyB0b2tlbi5wYXR0ZXJuICsgXCJcXFwiLCBidXQgZ290IFxcXCJcIiArIHNlZ21lbnQgKyBcIlxcXCJcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBhdGggKz0gdG9rZW4ucHJlZml4ICsgc2VnbWVudCArIHRva2VuLnN1ZmZpeDtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvcHRpb25hbClcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIHZhciB0eXBlT2ZNZXNzYWdlID0gcmVwZWF0ID8gXCJhbiBhcnJheVwiIDogXCJhIHN0cmluZ1wiO1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkV4cGVjdGVkIFxcXCJcIiArIHRva2VuLm5hbWUgKyBcIlxcXCIgdG8gYmUgXCIgKyB0eXBlT2ZNZXNzYWdlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcGF0aDtcbiAgICB9O1xufVxuZXhwb3J0cy50b2tlbnNUb0Z1bmN0aW9uID0gdG9rZW5zVG9GdW5jdGlvbjtcbi8qKlxuICogQ3JlYXRlIHBhdGggbWF0Y2ggZnVuY3Rpb24gZnJvbSBgcGF0aC10by1yZWdleHBgIHNwZWMuXG4gKi9cbmZ1bmN0aW9uIG1hdGNoKHN0ciwgb3B0aW9ucykge1xuICAgIHZhciBrZXlzID0gW107XG4gICAgdmFyIHJlID0gcGF0aFRvUmVnZXhwKHN0ciwga2V5cywgb3B0aW9ucyk7XG4gICAgcmV0dXJuIHJlZ2V4cFRvRnVuY3Rpb24ocmUsIGtleXMsIG9wdGlvbnMpO1xufVxuZXhwb3J0cy5tYXRjaCA9IG1hdGNoO1xuLyoqXG4gKiBDcmVhdGUgYSBwYXRoIG1hdGNoIGZ1bmN0aW9uIGZyb20gYHBhdGgtdG8tcmVnZXhwYCBvdXRwdXQuXG4gKi9cbmZ1bmN0aW9uIHJlZ2V4cFRvRnVuY3Rpb24ocmUsIGtleXMsIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSB7fTsgfVxuICAgIHZhciBfYSA9IG9wdGlvbnMuZGVjb2RlLCBkZWNvZGUgPSBfYSA9PT0gdm9pZCAwID8gZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHg7IH0gOiBfYTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHBhdGhuYW1lKSB7XG4gICAgICAgIHZhciBtID0gcmUuZXhlYyhwYXRobmFtZSk7XG4gICAgICAgIGlmICghbSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgdmFyIHBhdGggPSBtWzBdLCBpbmRleCA9IG0uaW5kZXg7XG4gICAgICAgIHZhciBwYXJhbXMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICB2YXIgX2xvb3BfMSA9IGZ1bmN0aW9uIChpKSB7XG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgICAgICAgIGlmIChtW2ldID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiY29udGludWVcIjtcbiAgICAgICAgICAgIHZhciBrZXkgPSBrZXlzW2kgLSAxXTtcbiAgICAgICAgICAgIGlmIChrZXkubW9kaWZpZXIgPT09IFwiKlwiIHx8IGtleS5tb2RpZmllciA9PT0gXCIrXCIpIHtcbiAgICAgICAgICAgICAgICBwYXJhbXNba2V5Lm5hbWVdID0gbVtpXS5zcGxpdChrZXkucHJlZml4ICsga2V5LnN1ZmZpeCkubWFwKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVjb2RlKHZhbHVlLCBrZXkpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcGFyYW1zW2tleS5uYW1lXSA9IGRlY29kZShtW2ldLCBrZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IG0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIF9sb29wXzEoaSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgcGF0aDogcGF0aCwgaW5kZXg6IGluZGV4LCBwYXJhbXM6IHBhcmFtcyB9O1xuICAgIH07XG59XG5leHBvcnRzLnJlZ2V4cFRvRnVuY3Rpb24gPSByZWdleHBUb0Z1bmN0aW9uO1xuLyoqXG4gKiBFc2NhcGUgYSByZWd1bGFyIGV4cHJlc3Npb24gc3RyaW5nLlxuICovXG5mdW5jdGlvbiBlc2NhcGVTdHJpbmcoc3RyKSB7XG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKC8oWy4rKj89XiE6JHt9KClbXFxdfC9cXFxcXSkvZywgXCJcXFxcJDFcIik7XG59XG4vKipcbiAqIEdldCB0aGUgZmxhZ3MgZm9yIGEgcmVnZXhwIGZyb20gdGhlIG9wdGlvbnMuXG4gKi9cbmZ1bmN0aW9uIGZsYWdzKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gb3B0aW9ucyAmJiBvcHRpb25zLnNlbnNpdGl2ZSA/IFwiXCIgOiBcImlcIjtcbn1cbi8qKlxuICogUHVsbCBvdXQga2V5cyBmcm9tIGEgcmVnZXhwLlxuICovXG5mdW5jdGlvbiByZWdleHBUb1JlZ2V4cChwYXRoLCBrZXlzKSB7XG4gICAgaWYgKCFrZXlzKVxuICAgICAgICByZXR1cm4gcGF0aDtcbiAgICAvLyBVc2UgYSBuZWdhdGl2ZSBsb29rYWhlYWQgdG8gbWF0Y2ggb25seSBjYXB0dXJpbmcgZ3JvdXBzLlxuICAgIHZhciBncm91cHMgPSBwYXRoLnNvdXJjZS5tYXRjaCgvXFwoKD8hXFw/KS9nKTtcbiAgICBpZiAoZ3JvdXBzKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZ3JvdXBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBrZXlzLnB1c2goe1xuICAgICAgICAgICAgICAgIG5hbWU6IGksXG4gICAgICAgICAgICAgICAgcHJlZml4OiBcIlwiLFxuICAgICAgICAgICAgICAgIHN1ZmZpeDogXCJcIixcbiAgICAgICAgICAgICAgICBtb2RpZmllcjogXCJcIixcbiAgICAgICAgICAgICAgICBwYXR0ZXJuOiBcIlwiXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcGF0aDtcbn1cbi8qKlxuICogVHJhbnNmb3JtIGFuIGFycmF5IGludG8gYSByZWdleHAuXG4gKi9cbmZ1bmN0aW9uIGFycmF5VG9SZWdleHAocGF0aHMsIGtleXMsIG9wdGlvbnMpIHtcbiAgICB2YXIgcGFydHMgPSBwYXRocy5tYXAoZnVuY3Rpb24gKHBhdGgpIHsgcmV0dXJuIHBhdGhUb1JlZ2V4cChwYXRoLCBrZXlzLCBvcHRpb25zKS5zb3VyY2U7IH0pO1xuICAgIHJldHVybiBuZXcgUmVnRXhwKFwiKD86XCIgKyBwYXJ0cy5qb2luKFwifFwiKSArIFwiKVwiLCBmbGFncyhvcHRpb25zKSk7XG59XG4vKipcbiAqIENyZWF0ZSBhIHBhdGggcmVnZXhwIGZyb20gc3RyaW5nIGlucHV0LlxuICovXG5mdW5jdGlvbiBzdHJpbmdUb1JlZ2V4cChwYXRoLCBrZXlzLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIHRva2Vuc1RvUmVnZXhwKHBhcnNlKHBhdGgsIG9wdGlvbnMpLCBrZXlzLCBvcHRpb25zKTtcbn1cbi8qKlxuICogRXhwb3NlIGEgZnVuY3Rpb24gZm9yIHRha2luZyB0b2tlbnMgYW5kIHJldHVybmluZyBhIFJlZ0V4cC5cbiAqL1xuZnVuY3Rpb24gdG9rZW5zVG9SZWdleHAodG9rZW5zLCBrZXlzLCBvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cbiAgICB2YXIgX2EgPSBvcHRpb25zLnN0cmljdCwgc3RyaWN0ID0gX2EgPT09IHZvaWQgMCA/IGZhbHNlIDogX2EsIF9iID0gb3B0aW9ucy5zdGFydCwgc3RhcnQgPSBfYiA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9iLCBfYyA9IG9wdGlvbnMuZW5kLCBlbmQgPSBfYyA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9jLCBfZCA9IG9wdGlvbnMuZW5jb2RlLCBlbmNvZGUgPSBfZCA9PT0gdm9pZCAwID8gZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHg7IH0gOiBfZDtcbiAgICB2YXIgZW5kc1dpdGggPSBcIltcIiArIGVzY2FwZVN0cmluZyhvcHRpb25zLmVuZHNXaXRoIHx8IFwiXCIpICsgXCJdfCRcIjtcbiAgICB2YXIgZGVsaW1pdGVyID0gXCJbXCIgKyBlc2NhcGVTdHJpbmcob3B0aW9ucy5kZWxpbWl0ZXIgfHwgXCIvIz9cIikgKyBcIl1cIjtcbiAgICB2YXIgcm91dGUgPSBzdGFydCA/IFwiXlwiIDogXCJcIjtcbiAgICAvLyBJdGVyYXRlIG92ZXIgdGhlIHRva2VucyBhbmQgY3JlYXRlIG91ciByZWdleHAgc3RyaW5nLlxuICAgIGZvciAodmFyIF9pID0gMCwgdG9rZW5zXzEgPSB0b2tlbnM7IF9pIDwgdG9rZW5zXzEubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIHZhciB0b2tlbiA9IHRva2Vuc18xW19pXTtcbiAgICAgICAgaWYgKHR5cGVvZiB0b2tlbiA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgcm91dGUgKz0gZXNjYXBlU3RyaW5nKGVuY29kZSh0b2tlbikpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyIHByZWZpeCA9IGVzY2FwZVN0cmluZyhlbmNvZGUodG9rZW4ucHJlZml4KSk7XG4gICAgICAgICAgICB2YXIgc3VmZml4ID0gZXNjYXBlU3RyaW5nKGVuY29kZSh0b2tlbi5zdWZmaXgpKTtcbiAgICAgICAgICAgIGlmICh0b2tlbi5wYXR0ZXJuKSB7XG4gICAgICAgICAgICAgICAgaWYgKGtleXMpXG4gICAgICAgICAgICAgICAgICAgIGtleXMucHVzaCh0b2tlbik7XG4gICAgICAgICAgICAgICAgaWYgKHByZWZpeCB8fCBzdWZmaXgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRva2VuLm1vZGlmaWVyID09PSBcIitcIiB8fCB0b2tlbi5tb2RpZmllciA9PT0gXCIqXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtb2QgPSB0b2tlbi5tb2RpZmllciA9PT0gXCIqXCIgPyBcIj9cIiA6IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICByb3V0ZSArPSBcIig/OlwiICsgcHJlZml4ICsgXCIoKD86XCIgKyB0b2tlbi5wYXR0ZXJuICsgXCIpKD86XCIgKyBzdWZmaXggKyBwcmVmaXggKyBcIig/OlwiICsgdG9rZW4ucGF0dGVybiArIFwiKSkqKVwiICsgc3VmZml4ICsgXCIpXCIgKyBtb2Q7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByb3V0ZSArPSBcIig/OlwiICsgcHJlZml4ICsgXCIoXCIgKyB0b2tlbi5wYXR0ZXJuICsgXCIpXCIgKyBzdWZmaXggKyBcIilcIiArIHRva2VuLm1vZGlmaWVyO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByb3V0ZSArPSBcIihcIiArIHRva2VuLnBhdHRlcm4gKyBcIilcIiArIHRva2VuLm1vZGlmaWVyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJvdXRlICs9IFwiKD86XCIgKyBwcmVmaXggKyBzdWZmaXggKyBcIilcIiArIHRva2VuLm1vZGlmaWVyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChlbmQpIHtcbiAgICAgICAgaWYgKCFzdHJpY3QpXG4gICAgICAgICAgICByb3V0ZSArPSBkZWxpbWl0ZXIgKyBcIj9cIjtcbiAgICAgICAgcm91dGUgKz0gIW9wdGlvbnMuZW5kc1dpdGggPyBcIiRcIiA6IFwiKD89XCIgKyBlbmRzV2l0aCArIFwiKVwiO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdmFyIGVuZFRva2VuID0gdG9rZW5zW3Rva2Vucy5sZW5ndGggLSAxXTtcbiAgICAgICAgdmFyIGlzRW5kRGVsaW1pdGVkID0gdHlwZW9mIGVuZFRva2VuID09PSBcInN0cmluZ1wiXG4gICAgICAgICAgICA/IGRlbGltaXRlci5pbmRleE9mKGVuZFRva2VuW2VuZFRva2VuLmxlbmd0aCAtIDFdKSA+IC0xXG4gICAgICAgICAgICA6IC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZVxuICAgICAgICAgICAgICAgIGVuZFRva2VuID09PSB1bmRlZmluZWQ7XG4gICAgICAgIGlmICghc3RyaWN0KSB7XG4gICAgICAgICAgICByb3V0ZSArPSBcIig/OlwiICsgZGVsaW1pdGVyICsgXCIoPz1cIiArIGVuZHNXaXRoICsgXCIpKT9cIjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWlzRW5kRGVsaW1pdGVkKSB7XG4gICAgICAgICAgICByb3V0ZSArPSBcIig/PVwiICsgZGVsaW1pdGVyICsgXCJ8XCIgKyBlbmRzV2l0aCArIFwiKVwiO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBuZXcgUmVnRXhwKHJvdXRlLCBmbGFncyhvcHRpb25zKSk7XG59XG5leHBvcnRzLnRva2Vuc1RvUmVnZXhwID0gdG9rZW5zVG9SZWdleHA7XG4vKipcbiAqIE5vcm1hbGl6ZSB0aGUgZ2l2ZW4gcGF0aCBzdHJpbmcsIHJldHVybmluZyBhIHJlZ3VsYXIgZXhwcmVzc2lvbi5cbiAqXG4gKiBBbiBlbXB0eSBhcnJheSBjYW4gYmUgcGFzc2VkIGluIGZvciB0aGUga2V5cywgd2hpY2ggd2lsbCBob2xkIHRoZVxuICogcGxhY2Vob2xkZXIga2V5IGRlc2NyaXB0aW9ucy4gRm9yIGV4YW1wbGUsIHVzaW5nIGAvdXNlci86aWRgLCBga2V5c2Agd2lsbFxuICogY29udGFpbiBgW3sgbmFtZTogJ2lkJywgZGVsaW1pdGVyOiAnLycsIG9wdGlvbmFsOiBmYWxzZSwgcmVwZWF0OiBmYWxzZSB9XWAuXG4gKi9cbmZ1bmN0aW9uIHBhdGhUb1JlZ2V4cChwYXRoLCBrZXlzLCBvcHRpb25zKSB7XG4gICAgaWYgKHBhdGggaW5zdGFuY2VvZiBSZWdFeHApXG4gICAgICAgIHJldHVybiByZWdleHBUb1JlZ2V4cChwYXRoLCBrZXlzKTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShwYXRoKSlcbiAgICAgICAgcmV0dXJuIGFycmF5VG9SZWdleHAocGF0aCwga2V5cywgb3B0aW9ucyk7XG4gICAgcmV0dXJuIHN0cmluZ1RvUmVnZXhwKHBhdGgsIGtleXMsIG9wdGlvbnMpO1xufVxuZXhwb3J0cy5wYXRoVG9SZWdleHAgPSBwYXRoVG9SZWdleHA7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJleHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplTG9jYWxlUGF0aChcbiAgcGF0aG5hbWU6IHN0cmluZyxcbiAgbG9jYWxlcz86IHN0cmluZ1tdXG4pOiB7XG4gIGRldGVjdGVkTG9jYWxlPzogc3RyaW5nXG4gIHBhdGhuYW1lOiBzdHJpbmdcbn0ge1xuICBsZXQgZGV0ZWN0ZWRMb2NhbGU6IHN0cmluZyB8IHVuZGVmaW5lZFxuICAvLyBmaXJzdCBpdGVtIHdpbGwgYmUgZW1wdHkgc3RyaW5nIGZyb20gc3BsaXR0aW5nIGF0IGZpcnN0IGNoYXJcbiAgY29uc3QgcGF0aG5hbWVQYXJ0cyA9IHBhdGhuYW1lLnNwbGl0KCcvJylcblxuICA7KGxvY2FsZXMgfHwgW10pLnNvbWUoKGxvY2FsZSkgPT4ge1xuICAgIGlmIChwYXRobmFtZVBhcnRzWzFdLnRvTG93ZXJDYXNlKCkgPT09IGxvY2FsZS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICBkZXRlY3RlZExvY2FsZSA9IGxvY2FsZVxuICAgICAgcGF0aG5hbWVQYXJ0cy5zcGxpY2UoMSwgMSlcbiAgICAgIHBhdGhuYW1lID0gcGF0aG5hbWVQYXJ0cy5qb2luKCcvJykgfHwgJy8nXG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2VcbiAgfSlcblxuICByZXR1cm4ge1xuICAgIHBhdGhuYW1lLFxuICAgIGRldGVjdGVkTG9jYWxlLFxuICB9XG59XG4iLCIvKlxuTUlUIExpY2Vuc2VcblxuQ29weXJpZ2h0IChjKSBKYXNvbiBNaWxsZXIgKGh0dHBzOi8vamFzb25mb3JtYXQuY29tLylcblxuUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuKi9cblxuLy8gVGhpcyBmaWxlIGlzIGJhc2VkIG9uIGh0dHBzOi8vZ2l0aHViLmNvbS9kZXZlbG9waXQvbWl0dC9ibG9iL3YxLjEuMy9zcmMvaW5kZXguanNcbi8vIEl0J3MgYmVlbiBlZGl0ZWQgZm9yIHRoZSBuZWVkcyBvZiB0aGlzIHNjcmlwdFxuLy8gU2VlIHRoZSBMSUNFTlNFIGF0IHRoZSB0b3Agb2YgdGhlIGZpbGVcblxudHlwZSBIYW5kbGVyID0gKC4uLmV2dHM6IGFueVtdKSA9PiB2b2lkXG5cbmV4cG9ydCB0eXBlIE1pdHRFbWl0dGVyID0ge1xuICBvbih0eXBlOiBzdHJpbmcsIGhhbmRsZXI6IEhhbmRsZXIpOiB2b2lkXG4gIG9mZih0eXBlOiBzdHJpbmcsIGhhbmRsZXI6IEhhbmRsZXIpOiB2b2lkXG4gIGVtaXQodHlwZTogc3RyaW5nLCAuLi5ldnRzOiBhbnlbXSk6IHZvaWRcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWl0dCgpOiBNaXR0RW1pdHRlciB7XG4gIGNvbnN0IGFsbDogeyBbczogc3RyaW5nXTogSGFuZGxlcltdIH0gPSBPYmplY3QuY3JlYXRlKG51bGwpXG5cbiAgcmV0dXJuIHtcbiAgICBvbih0eXBlOiBzdHJpbmcsIGhhbmRsZXI6IEhhbmRsZXIpIHtcbiAgICAgIDsoYWxsW3R5cGVdIHx8IChhbGxbdHlwZV0gPSBbXSkpLnB1c2goaGFuZGxlcilcbiAgICB9LFxuXG4gICAgb2ZmKHR5cGU6IHN0cmluZywgaGFuZGxlcjogSGFuZGxlcikge1xuICAgICAgaWYgKGFsbFt0eXBlXSkge1xuICAgICAgICBhbGxbdHlwZV0uc3BsaWNlKGFsbFt0eXBlXS5pbmRleE9mKGhhbmRsZXIpID4+PiAwLCAxKVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBlbWl0KHR5cGU6IHN0cmluZywgLi4uZXZ0czogYW55W10pIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBhcnJheS1jYWxsYmFjay1yZXR1cm5cbiAgICAgIDsoYWxsW3R5cGVdIHx8IFtdKS5zbGljZSgpLm1hcCgoaGFuZGxlcjogSGFuZGxlcikgPT4ge1xuICAgICAgICBoYW5kbGVyKC4uLmV2dHMpXG4gICAgICB9KVxuICAgIH0sXG4gIH1cbn1cbiIsIi8vIHRzbGludDpkaXNhYmxlOm5vLWNvbnNvbGVcbmltcG9ydCB7IFBhcnNlZFVybFF1ZXJ5IH0gZnJvbSAncXVlcnlzdHJpbmcnXG5pbXBvcnQgeyBDb21wb25lbnRUeXBlIH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBVcmxPYmplY3QgfSBmcm9tICd1cmwnXG5pbXBvcnQge1xuICBub3JtYWxpemVQYXRoVHJhaWxpbmdTbGFzaCxcbiAgcmVtb3ZlUGF0aFRyYWlsaW5nU2xhc2gsXG59IGZyb20gJy4uLy4uLy4uL2NsaWVudC9ub3JtYWxpemUtdHJhaWxpbmctc2xhc2gnXG5pbXBvcnQgeyBHb29kUGFnZUNhY2hlLCBTdHlsZVNoZWV0VHVwbGUgfSBmcm9tICcuLi8uLi8uLi9jbGllbnQvcGFnZS1sb2FkZXInXG5pbXBvcnQge1xuICBnZXRDbGllbnRCdWlsZE1hbmlmZXN0LFxuICBpc0Fzc2V0RXJyb3IsXG4gIG1hcmtBc3NldEVycm9yLFxufSBmcm9tICcuLi8uLi8uLi9jbGllbnQvcm91dGUtbG9hZGVyJ1xuaW1wb3J0IHsgRG9tYWluTG9jYWxlcyB9IGZyb20gJy4uLy4uL3NlcnZlci9jb25maWcnXG5pbXBvcnQgeyBkZW5vcm1hbGl6ZVBhZ2VQYXRoIH0gZnJvbSAnLi4vLi4vc2VydmVyL2Rlbm9ybWFsaXplLXBhZ2UtcGF0aCdcbmltcG9ydCB7IG5vcm1hbGl6ZUxvY2FsZVBhdGggfSBmcm9tICcuLi9pMThuL25vcm1hbGl6ZS1sb2NhbGUtcGF0aCdcbmltcG9ydCBtaXR0LCB7IE1pdHRFbWl0dGVyIH0gZnJvbSAnLi4vbWl0dCdcbmltcG9ydCB7XG4gIEFwcENvbnRleHRUeXBlLFxuICBmb3JtYXRXaXRoVmFsaWRhdGlvbixcbiAgZ2V0TG9jYXRpb25PcmlnaW4sXG4gIGdldFVSTCxcbiAgbG9hZEdldEluaXRpYWxQcm9wcyxcbiAgTmV4dFBhZ2VDb250ZXh0LFxuICBTVCxcbiAgTkVYVF9EQVRBLFxufSBmcm9tICcuLi91dGlscydcbmltcG9ydCB7IGlzRHluYW1pY1JvdXRlIH0gZnJvbSAnLi91dGlscy9pcy1keW5hbWljJ1xuaW1wb3J0IHsgcGFyc2VSZWxhdGl2ZVVybCB9IGZyb20gJy4vdXRpbHMvcGFyc2UtcmVsYXRpdmUtdXJsJ1xuaW1wb3J0IHsgc2VhcmNoUGFyYW1zVG9VcmxRdWVyeSB9IGZyb20gJy4vdXRpbHMvcXVlcnlzdHJpbmcnXG5pbXBvcnQgcmVzb2x2ZVJld3JpdGVzIGZyb20gJy4vdXRpbHMvcmVzb2x2ZS1yZXdyaXRlcydcbmltcG9ydCB7IGdldFJvdXRlTWF0Y2hlciB9IGZyb20gJy4vdXRpbHMvcm91dGUtbWF0Y2hlcidcbmltcG9ydCB7IGdldFJvdXRlUmVnZXggfSBmcm9tICcuL3V0aWxzL3JvdXRlLXJlZ2V4J1xuXG5kZWNsYXJlIGdsb2JhbCB7XG4gIGludGVyZmFjZSBXaW5kb3cge1xuICAgIC8qIHByb2QgKi9cbiAgICBfX05FWFRfREFUQV9fOiBORVhUX0RBVEFcbiAgfVxufVxuXG5pbnRlcmZhY2UgUm91dGVQcm9wZXJ0aWVzIHtcbiAgc2hhbGxvdzogYm9vbGVhblxufVxuXG5pbnRlcmZhY2UgVHJhbnNpdGlvbk9wdGlvbnMge1xuICBzaGFsbG93PzogYm9vbGVhblxuICBsb2NhbGU/OiBzdHJpbmcgfCBmYWxzZVxuICBzY3JvbGw/OiBib29sZWFuXG59XG5cbmludGVyZmFjZSBOZXh0SGlzdG9yeVN0YXRlIHtcbiAgdXJsOiBzdHJpbmdcbiAgYXM6IHN0cmluZ1xuICBvcHRpb25zOiBUcmFuc2l0aW9uT3B0aW9uc1xufVxuXG50eXBlIEhpc3RvcnlTdGF0ZSA9XG4gIHwgbnVsbFxuICB8IHsgX19OOiBmYWxzZSB9XG4gIHwgKHsgX19OOiB0cnVlOyBpZHg6IG51bWJlciB9ICYgTmV4dEhpc3RvcnlTdGF0ZSlcblxubGV0IGRldGVjdERvbWFpbkxvY2FsZTogdHlwZW9mIGltcG9ydCgnLi4vaTE4bi9kZXRlY3QtZG9tYWluLWxvY2FsZScpLmRldGVjdERvbWFpbkxvY2FsZVxuXG5pZiAocHJvY2Vzcy5lbnYuX19ORVhUX0kxOE5fU1VQUE9SVCkge1xuICBkZXRlY3REb21haW5Mb2NhbGUgPSByZXF1aXJlKCcuLi9pMThuL2RldGVjdC1kb21haW4tbG9jYWxlJylcbiAgICAuZGV0ZWN0RG9tYWluTG9jYWxlXG59XG5cbmNvbnN0IGJhc2VQYXRoID0gKHByb2Nlc3MuZW52Ll9fTkVYVF9ST1VURVJfQkFTRVBBVEggYXMgc3RyaW5nKSB8fCAnJ1xuXG5mdW5jdGlvbiBidWlsZENhbmNlbGxhdGlvbkVycm9yKCkge1xuICByZXR1cm4gT2JqZWN0LmFzc2lnbihuZXcgRXJyb3IoJ1JvdXRlIENhbmNlbGxlZCcpLCB7XG4gICAgY2FuY2VsbGVkOiB0cnVlLFxuICB9KVxufVxuXG5mdW5jdGlvbiBhZGRQYXRoUHJlZml4KHBhdGg6IHN0cmluZywgcHJlZml4Pzogc3RyaW5nKSB7XG4gIHJldHVybiBwcmVmaXggJiYgcGF0aC5zdGFydHNXaXRoKCcvJylcbiAgICA/IHBhdGggPT09ICcvJ1xuICAgICAgPyBub3JtYWxpemVQYXRoVHJhaWxpbmdTbGFzaChwcmVmaXgpXG4gICAgICA6IGAke3ByZWZpeH0ke3BhdGhOb1F1ZXJ5SGFzaChwYXRoKSA9PT0gJy8nID8gcGF0aC5zdWJzdHJpbmcoMSkgOiBwYXRofWBcbiAgICA6IHBhdGhcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldERvbWFpbkxvY2FsZShcbiAgcGF0aDogc3RyaW5nLFxuICBsb2NhbGU/OiBzdHJpbmcgfCBmYWxzZSxcbiAgbG9jYWxlcz86IHN0cmluZ1tdLFxuICBkb21haW5Mb2NhbGVzPzogRG9tYWluTG9jYWxlc1xuKSB7XG4gIGlmIChwcm9jZXNzLmVudi5fX05FWFRfSTE4Tl9TVVBQT1JUKSB7XG4gICAgbG9jYWxlID0gbG9jYWxlIHx8IG5vcm1hbGl6ZUxvY2FsZVBhdGgocGF0aCwgbG9jYWxlcykuZGV0ZWN0ZWRMb2NhbGVcblxuICAgIGNvbnN0IGRldGVjdGVkRG9tYWluID0gZGV0ZWN0RG9tYWluTG9jYWxlKGRvbWFpbkxvY2FsZXMsIHVuZGVmaW5lZCwgbG9jYWxlKVxuXG4gICAgaWYgKGRldGVjdGVkRG9tYWluKSB7XG4gICAgICByZXR1cm4gYGh0dHAke2RldGVjdGVkRG9tYWluLmh0dHAgPyAnJyA6ICdzJ306Ly8ke2RldGVjdGVkRG9tYWluLmRvbWFpbn0ke1xuICAgICAgICBiYXNlUGF0aCB8fCAnJ1xuICAgICAgfSR7bG9jYWxlID09PSBkZXRlY3RlZERvbWFpbi5kZWZhdWx0TG9jYWxlID8gJycgOiBgLyR7bG9jYWxlfWB9JHtwYXRofWBcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICByZXR1cm4gZmFsc2Vcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZExvY2FsZShcbiAgcGF0aDogc3RyaW5nLFxuICBsb2NhbGU/OiBzdHJpbmcgfCBmYWxzZSxcbiAgZGVmYXVsdExvY2FsZT86IHN0cmluZ1xuKSB7XG4gIGlmIChwcm9jZXNzLmVudi5fX05FWFRfSTE4Tl9TVVBQT1JUKSB7XG4gICAgY29uc3QgcGF0aG5hbWUgPSBwYXRoTm9RdWVyeUhhc2gocGF0aClcbiAgICBjb25zdCBwYXRoTG93ZXIgPSBwYXRobmFtZS50b0xvd2VyQ2FzZSgpXG4gICAgY29uc3QgbG9jYWxlTG93ZXIgPSBsb2NhbGUgJiYgbG9jYWxlLnRvTG93ZXJDYXNlKClcblxuICAgIHJldHVybiBsb2NhbGUgJiZcbiAgICAgIGxvY2FsZSAhPT0gZGVmYXVsdExvY2FsZSAmJlxuICAgICAgIXBhdGhMb3dlci5zdGFydHNXaXRoKCcvJyArIGxvY2FsZUxvd2VyICsgJy8nKSAmJlxuICAgICAgcGF0aExvd2VyICE9PSAnLycgKyBsb2NhbGVMb3dlclxuICAgICAgPyBhZGRQYXRoUHJlZml4KHBhdGgsICcvJyArIGxvY2FsZSlcbiAgICAgIDogcGF0aFxuICB9XG4gIHJldHVybiBwYXRoXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWxMb2NhbGUocGF0aDogc3RyaW5nLCBsb2NhbGU/OiBzdHJpbmcpIHtcbiAgaWYgKHByb2Nlc3MuZW52Ll9fTkVYVF9JMThOX1NVUFBPUlQpIHtcbiAgICBjb25zdCBwYXRobmFtZSA9IHBhdGhOb1F1ZXJ5SGFzaChwYXRoKVxuICAgIGNvbnN0IHBhdGhMb3dlciA9IHBhdGhuYW1lLnRvTG93ZXJDYXNlKClcbiAgICBjb25zdCBsb2NhbGVMb3dlciA9IGxvY2FsZSAmJiBsb2NhbGUudG9Mb3dlckNhc2UoKVxuXG4gICAgcmV0dXJuIGxvY2FsZSAmJlxuICAgICAgKHBhdGhMb3dlci5zdGFydHNXaXRoKCcvJyArIGxvY2FsZUxvd2VyICsgJy8nKSB8fFxuICAgICAgICBwYXRoTG93ZXIgPT09ICcvJyArIGxvY2FsZUxvd2VyKVxuICAgICAgPyAocGF0aG5hbWUubGVuZ3RoID09PSBsb2NhbGUubGVuZ3RoICsgMSA/ICcvJyA6ICcnKSArXG4gICAgICAgICAgcGF0aC5zdWJzdHIobG9jYWxlLmxlbmd0aCArIDEpXG4gICAgICA6IHBhdGhcbiAgfVxuICByZXR1cm4gcGF0aFxufVxuXG5mdW5jdGlvbiBwYXRoTm9RdWVyeUhhc2gocGF0aDogc3RyaW5nKSB7XG4gIGNvbnN0IHF1ZXJ5SW5kZXggPSBwYXRoLmluZGV4T2YoJz8nKVxuICBjb25zdCBoYXNoSW5kZXggPSBwYXRoLmluZGV4T2YoJyMnKVxuXG4gIGlmIChxdWVyeUluZGV4ID4gLTEgfHwgaGFzaEluZGV4ID4gLTEpIHtcbiAgICBwYXRoID0gcGF0aC5zdWJzdHJpbmcoMCwgcXVlcnlJbmRleCA+IC0xID8gcXVlcnlJbmRleCA6IGhhc2hJbmRleClcbiAgfVxuICByZXR1cm4gcGF0aFxufVxuXG5leHBvcnQgZnVuY3Rpb24gaGFzQmFzZVBhdGgocGF0aDogc3RyaW5nKTogYm9vbGVhbiB7XG4gIHBhdGggPSBwYXRoTm9RdWVyeUhhc2gocGF0aClcbiAgcmV0dXJuIHBhdGggPT09IGJhc2VQYXRoIHx8IHBhdGguc3RhcnRzV2l0aChiYXNlUGF0aCArICcvJylcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZEJhc2VQYXRoKHBhdGg6IHN0cmluZyk6IHN0cmluZyB7XG4gIC8vIHdlIG9ubHkgYWRkIHRoZSBiYXNlcGF0aCBvbiByZWxhdGl2ZSB1cmxzXG4gIHJldHVybiBhZGRQYXRoUHJlZml4KHBhdGgsIGJhc2VQYXRoKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVsQmFzZVBhdGgocGF0aDogc3RyaW5nKTogc3RyaW5nIHtcbiAgcGF0aCA9IHBhdGguc2xpY2UoYmFzZVBhdGgubGVuZ3RoKVxuICBpZiAoIXBhdGguc3RhcnRzV2l0aCgnLycpKSBwYXRoID0gYC8ke3BhdGh9YFxuICByZXR1cm4gcGF0aFxufVxuXG4vKipcbiAqIERldGVjdHMgd2hldGhlciBhIGdpdmVuIHVybCBpcyByb3V0YWJsZSBieSB0aGUgTmV4dC5qcyByb3V0ZXIgKGJyb3dzZXIgb25seSkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0xvY2FsVVJMKHVybDogc3RyaW5nKTogYm9vbGVhbiB7XG4gIC8vIHByZXZlbnQgYSBoeWRyYXRpb24gbWlzbWF0Y2ggb24gaHJlZiBmb3IgdXJsIHdpdGggYW5jaG9yIHJlZnNcbiAgaWYgKHVybC5zdGFydHNXaXRoKCcvJykgfHwgdXJsLnN0YXJ0c1dpdGgoJyMnKSkgcmV0dXJuIHRydWVcbiAgdHJ5IHtcbiAgICAvLyBhYnNvbHV0ZSB1cmxzIGNhbiBiZSBsb2NhbCBpZiB0aGV5IGFyZSBvbiB0aGUgc2FtZSBvcmlnaW5cbiAgICBjb25zdCBsb2NhdGlvbk9yaWdpbiA9IGdldExvY2F0aW9uT3JpZ2luKClcbiAgICBjb25zdCByZXNvbHZlZCA9IG5ldyBVUkwodXJsLCBsb2NhdGlvbk9yaWdpbilcbiAgICByZXR1cm4gcmVzb2x2ZWQub3JpZ2luID09PSBsb2NhdGlvbk9yaWdpbiAmJiBoYXNCYXNlUGF0aChyZXNvbHZlZC5wYXRobmFtZSlcbiAgfSBjYXRjaCAoXykge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG59XG5cbnR5cGUgVXJsID0gVXJsT2JqZWN0IHwgc3RyaW5nXG5cbmV4cG9ydCBmdW5jdGlvbiBpbnRlcnBvbGF0ZUFzKFxuICByb3V0ZTogc3RyaW5nLFxuICBhc1BhdGhuYW1lOiBzdHJpbmcsXG4gIHF1ZXJ5OiBQYXJzZWRVcmxRdWVyeVxuKSB7XG4gIGxldCBpbnRlcnBvbGF0ZWRSb3V0ZSA9ICcnXG5cbiAgY29uc3QgZHluYW1pY1JlZ2V4ID0gZ2V0Um91dGVSZWdleChyb3V0ZSlcbiAgY29uc3QgZHluYW1pY0dyb3VwcyA9IGR5bmFtaWNSZWdleC5ncm91cHNcbiAgY29uc3QgZHluYW1pY01hdGNoZXMgPVxuICAgIC8vIFRyeSB0byBtYXRjaCB0aGUgZHluYW1pYyByb3V0ZSBhZ2FpbnN0IHRoZSBhc1BhdGhcbiAgICAoYXNQYXRobmFtZSAhPT0gcm91dGUgPyBnZXRSb3V0ZU1hdGNoZXIoZHluYW1pY1JlZ2V4KShhc1BhdGhuYW1lKSA6ICcnKSB8fFxuICAgIC8vIEZhbGwgYmFjayB0byByZWFkaW5nIHRoZSB2YWx1ZXMgZnJvbSB0aGUgaHJlZlxuICAgIC8vIFRPRE86IHNob3VsZCB0aGlzIHRha2UgcHJpb3JpdHk7IGFsc28gbmVlZCB0byBjaGFuZ2UgaW4gdGhlIHJvdXRlci5cbiAgICBxdWVyeVxuXG4gIGludGVycG9sYXRlZFJvdXRlID0gcm91dGVcbiAgY29uc3QgcGFyYW1zID0gT2JqZWN0LmtleXMoZHluYW1pY0dyb3VwcylcblxuICBpZiAoXG4gICAgIXBhcmFtcy5ldmVyeSgocGFyYW0pID0+IHtcbiAgICAgIGxldCB2YWx1ZSA9IGR5bmFtaWNNYXRjaGVzW3BhcmFtXSB8fCAnJ1xuICAgICAgY29uc3QgeyByZXBlYXQsIG9wdGlvbmFsIH0gPSBkeW5hbWljR3JvdXBzW3BhcmFtXVxuXG4gICAgICAvLyBzdXBwb3J0IHNpbmdsZS1sZXZlbCBjYXRjaC1hbGxcbiAgICAgIC8vIFRPRE86IG1vcmUgcm9idXN0IGhhbmRsaW5nIGZvciB1c2VyLWVycm9yIChwYXNzaW5nIGAvYClcbiAgICAgIGxldCByZXBsYWNlZCA9IGBbJHtyZXBlYXQgPyAnLi4uJyA6ICcnfSR7cGFyYW19XWBcbiAgICAgIGlmIChvcHRpb25hbCkge1xuICAgICAgICByZXBsYWNlZCA9IGAkeyF2YWx1ZSA/ICcvJyA6ICcnfVske3JlcGxhY2VkfV1gXG4gICAgICB9XG4gICAgICBpZiAocmVwZWF0ICYmICFBcnJheS5pc0FycmF5KHZhbHVlKSkgdmFsdWUgPSBbdmFsdWVdXG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIChvcHRpb25hbCB8fCBwYXJhbSBpbiBkeW5hbWljTWF0Y2hlcykgJiZcbiAgICAgICAgLy8gSW50ZXJwb2xhdGUgZ3JvdXAgaW50byBkYXRhIFVSTCBpZiBwcmVzZW50XG4gICAgICAgIChpbnRlcnBvbGF0ZWRSb3V0ZSA9XG4gICAgICAgICAgaW50ZXJwb2xhdGVkUm91dGUhLnJlcGxhY2UoXG4gICAgICAgICAgICByZXBsYWNlZCxcbiAgICAgICAgICAgIHJlcGVhdFxuICAgICAgICAgICAgICA/ICh2YWx1ZSBhcyBzdHJpbmdbXSlcbiAgICAgICAgICAgICAgICAgIC5tYXAoXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoZXNlIHZhbHVlcyBzaG91bGQgYmUgZnVsbHkgZW5jb2RlZCBpbnN0ZWFkIG9mIGp1c3RcbiAgICAgICAgICAgICAgICAgICAgLy8gcGF0aCBkZWxpbWl0ZXIgZXNjYXBlZCBzaW5jZSB0aGV5IGFyZSBiZWluZyBpbnNlcnRlZFxuICAgICAgICAgICAgICAgICAgICAvLyBpbnRvIHRoZSBVUkwgYW5kIHdlIGV4cGVjdCBVUkwgZW5jb2RlZCBzZWdtZW50c1xuICAgICAgICAgICAgICAgICAgICAvLyB3aGVuIHBhcnNpbmcgZHluYW1pYyByb3V0ZSBwYXJhbXNcbiAgICAgICAgICAgICAgICAgICAgKHNlZ21lbnQpID0+IGVuY29kZVVSSUNvbXBvbmVudChzZWdtZW50KVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgLmpvaW4oJy8nKVxuICAgICAgICAgICAgICA6IGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSBhcyBzdHJpbmcpXG4gICAgICAgICAgKSB8fCAnLycpXG4gICAgICApXG4gICAgfSlcbiAgKSB7XG4gICAgaW50ZXJwb2xhdGVkUm91dGUgPSAnJyAvLyBkaWQgbm90IHNhdGlzZnkgYWxsIHJlcXVpcmVtZW50c1xuXG4gICAgLy8gbi5iLiBXZSBpZ25vcmUgdGhpcyBlcnJvciBiZWNhdXNlIHdlIGhhbmRsZSB3YXJuaW5nIGZvciB0aGlzIGNhc2UgaW5cbiAgICAvLyBkZXZlbG9wbWVudCBpbiB0aGUgYDxMaW5rPmAgY29tcG9uZW50IGRpcmVjdGx5LlxuICB9XG4gIHJldHVybiB7XG4gICAgcGFyYW1zLFxuICAgIHJlc3VsdDogaW50ZXJwb2xhdGVkUm91dGUsXG4gIH1cbn1cblxuZnVuY3Rpb24gb21pdFBhcm1zRnJvbVF1ZXJ5KHF1ZXJ5OiBQYXJzZWRVcmxRdWVyeSwgcGFyYW1zOiBzdHJpbmdbXSkge1xuICBjb25zdCBmaWx0ZXJlZFF1ZXJ5OiBQYXJzZWRVcmxRdWVyeSA9IHt9XG5cbiAgT2JqZWN0LmtleXMocXVlcnkpLmZvckVhY2goKGtleSkgPT4ge1xuICAgIGlmICghcGFyYW1zLmluY2x1ZGVzKGtleSkpIHtcbiAgICAgIGZpbHRlcmVkUXVlcnlba2V5XSA9IHF1ZXJ5W2tleV1cbiAgICB9XG4gIH0pXG4gIHJldHVybiBmaWx0ZXJlZFF1ZXJ5XG59XG5cbi8qKlxuICogUmVzb2x2ZXMgYSBnaXZlbiBoeXBlcmxpbmsgd2l0aCBhIGNlcnRhaW4gcm91dGVyIHN0YXRlIChiYXNlUGF0aCBub3QgaW5jbHVkZWQpLlxuICogUHJlc2VydmVzIGFic29sdXRlIHVybHMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZXNvbHZlSHJlZihcbiAgY3VycmVudFBhdGg6IHN0cmluZyxcbiAgaHJlZjogVXJsLFxuICByZXNvbHZlQXM/OiBib29sZWFuXG4pOiBzdHJpbmcge1xuICAvLyB3ZSB1c2UgYSBkdW1teSBiYXNlIHVybCBmb3IgcmVsYXRpdmUgdXJsc1xuICBsZXQgYmFzZTogVVJMXG5cbiAgdHJ5IHtcbiAgICBiYXNlID0gbmV3IFVSTChjdXJyZW50UGF0aCwgJ2h0dHA6Ly9uJylcbiAgfSBjYXRjaCAoXykge1xuICAgIC8vIGZhbGxiYWNrIHRvIC8gZm9yIGludmFsaWQgYXNQYXRoIHZhbHVlcyBlLmcuIC8vXG4gICAgYmFzZSA9IG5ldyBVUkwoJy8nLCAnaHR0cDovL24nKVxuICB9XG4gIGNvbnN0IHVybEFzU3RyaW5nID1cbiAgICB0eXBlb2YgaHJlZiA9PT0gJ3N0cmluZycgPyBocmVmIDogZm9ybWF0V2l0aFZhbGlkYXRpb24oaHJlZilcbiAgLy8gUmV0dXJuIGJlY2F1c2UgaXQgY2Fubm90IGJlIHJvdXRlZCBieSB0aGUgTmV4dC5qcyByb3V0ZXJcbiAgaWYgKCFpc0xvY2FsVVJMKHVybEFzU3RyaW5nKSkge1xuICAgIHJldHVybiAocmVzb2x2ZUFzID8gW3VybEFzU3RyaW5nXSA6IHVybEFzU3RyaW5nKSBhcyBzdHJpbmdcbiAgfVxuICB0cnkge1xuICAgIGNvbnN0IGZpbmFsVXJsID0gbmV3IFVSTCh1cmxBc1N0cmluZywgYmFzZSlcbiAgICBmaW5hbFVybC5wYXRobmFtZSA9IG5vcm1hbGl6ZVBhdGhUcmFpbGluZ1NsYXNoKGZpbmFsVXJsLnBhdGhuYW1lKVxuICAgIGxldCBpbnRlcnBvbGF0ZWRBcyA9ICcnXG5cbiAgICBpZiAoXG4gICAgICBpc0R5bmFtaWNSb3V0ZShmaW5hbFVybC5wYXRobmFtZSkgJiZcbiAgICAgIGZpbmFsVXJsLnNlYXJjaFBhcmFtcyAmJlxuICAgICAgcmVzb2x2ZUFzXG4gICAgKSB7XG4gICAgICBjb25zdCBxdWVyeSA9IHNlYXJjaFBhcmFtc1RvVXJsUXVlcnkoZmluYWxVcmwuc2VhcmNoUGFyYW1zKVxuXG4gICAgICBjb25zdCB7IHJlc3VsdCwgcGFyYW1zIH0gPSBpbnRlcnBvbGF0ZUFzKFxuICAgICAgICBmaW5hbFVybC5wYXRobmFtZSxcbiAgICAgICAgZmluYWxVcmwucGF0aG5hbWUsXG4gICAgICAgIHF1ZXJ5XG4gICAgICApXG5cbiAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgaW50ZXJwb2xhdGVkQXMgPSBmb3JtYXRXaXRoVmFsaWRhdGlvbih7XG4gICAgICAgICAgcGF0aG5hbWU6IHJlc3VsdCxcbiAgICAgICAgICBoYXNoOiBmaW5hbFVybC5oYXNoLFxuICAgICAgICAgIHF1ZXJ5OiBvbWl0UGFybXNGcm9tUXVlcnkocXVlcnksIHBhcmFtcyksXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gaWYgdGhlIG9yaWdpbiBkaWRuJ3QgY2hhbmdlLCBpdCBtZWFucyB3ZSByZWNlaXZlZCBhIHJlbGF0aXZlIGhyZWZcbiAgICBjb25zdCByZXNvbHZlZEhyZWYgPVxuICAgICAgZmluYWxVcmwub3JpZ2luID09PSBiYXNlLm9yaWdpblxuICAgICAgICA/IGZpbmFsVXJsLmhyZWYuc2xpY2UoZmluYWxVcmwub3JpZ2luLmxlbmd0aClcbiAgICAgICAgOiBmaW5hbFVybC5ocmVmXG5cbiAgICByZXR1cm4gKHJlc29sdmVBc1xuICAgICAgPyBbcmVzb2x2ZWRIcmVmLCBpbnRlcnBvbGF0ZWRBcyB8fCByZXNvbHZlZEhyZWZdXG4gICAgICA6IHJlc29sdmVkSHJlZikgYXMgc3RyaW5nXG4gIH0gY2F0Y2ggKF8pIHtcbiAgICByZXR1cm4gKHJlc29sdmVBcyA/IFt1cmxBc1N0cmluZ10gOiB1cmxBc1N0cmluZykgYXMgc3RyaW5nXG4gIH1cbn1cblxuZnVuY3Rpb24gc3RyaXBPcmlnaW4odXJsOiBzdHJpbmcpIHtcbiAgY29uc3Qgb3JpZ2luID0gZ2V0TG9jYXRpb25PcmlnaW4oKVxuXG4gIHJldHVybiB1cmwuc3RhcnRzV2l0aChvcmlnaW4pID8gdXJsLnN1YnN0cmluZyhvcmlnaW4ubGVuZ3RoKSA6IHVybFxufVxuXG5mdW5jdGlvbiBwcmVwYXJlVXJsQXMocm91dGVyOiBOZXh0Um91dGVyLCB1cmw6IFVybCwgYXM/OiBVcmwpIHtcbiAgLy8gSWYgdXJsIGFuZCBhcyBwcm92aWRlZCBhcyBhbiBvYmplY3QgcmVwcmVzZW50YXRpb24sXG4gIC8vIHdlJ2xsIGZvcm1hdCB0aGVtIGludG8gdGhlIHN0cmluZyB2ZXJzaW9uIGhlcmUuXG4gIGxldCBbcmVzb2x2ZWRIcmVmLCByZXNvbHZlZEFzXSA9IHJlc29sdmVIcmVmKHJvdXRlci5hc1BhdGgsIHVybCwgdHJ1ZSlcbiAgY29uc3Qgb3JpZ2luID0gZ2V0TG9jYXRpb25PcmlnaW4oKVxuICBjb25zdCBocmVmSGFkT3JpZ2luID0gcmVzb2x2ZWRIcmVmLnN0YXJ0c1dpdGgob3JpZ2luKVxuICBjb25zdCBhc0hhZE9yaWdpbiA9IHJlc29sdmVkQXMgJiYgcmVzb2x2ZWRBcy5zdGFydHNXaXRoKG9yaWdpbilcblxuICByZXNvbHZlZEhyZWYgPSBzdHJpcE9yaWdpbihyZXNvbHZlZEhyZWYpXG4gIHJlc29sdmVkQXMgPSByZXNvbHZlZEFzID8gc3RyaXBPcmlnaW4ocmVzb2x2ZWRBcykgOiByZXNvbHZlZEFzXG5cbiAgY29uc3QgcHJlcGFyZWRVcmwgPSBocmVmSGFkT3JpZ2luID8gcmVzb2x2ZWRIcmVmIDogYWRkQmFzZVBhdGgocmVzb2x2ZWRIcmVmKVxuICBjb25zdCBwcmVwYXJlZEFzID0gYXNcbiAgICA/IHN0cmlwT3JpZ2luKHJlc29sdmVIcmVmKHJvdXRlci5hc1BhdGgsIGFzKSlcbiAgICA6IHJlc29sdmVkQXMgfHwgcmVzb2x2ZWRIcmVmXG5cbiAgcmV0dXJuIHtcbiAgICB1cmw6IHByZXBhcmVkVXJsLFxuICAgIGFzOiBhc0hhZE9yaWdpbiA/IHByZXBhcmVkQXMgOiBhZGRCYXNlUGF0aChwcmVwYXJlZEFzKSxcbiAgfVxufVxuXG5mdW5jdGlvbiByZXNvbHZlRHluYW1pY1JvdXRlKHBhdGhuYW1lOiBzdHJpbmcsIHBhZ2VzOiBzdHJpbmdbXSkge1xuICBjb25zdCBjbGVhblBhdGhuYW1lID0gcmVtb3ZlUGF0aFRyYWlsaW5nU2xhc2goZGVub3JtYWxpemVQYWdlUGF0aChwYXRobmFtZSEpKVxuXG4gIGlmIChjbGVhblBhdGhuYW1lID09PSAnLzQwNCcgfHwgY2xlYW5QYXRobmFtZSA9PT0gJy9fZXJyb3InKSB7XG4gICAgcmV0dXJuIHBhdGhuYW1lXG4gIH1cblxuICAvLyBoYW5kbGUgcmVzb2x2aW5nIGhyZWYgZm9yIGR5bmFtaWMgcm91dGVzXG4gIGlmICghcGFnZXMuaW5jbHVkZXMoY2xlYW5QYXRobmFtZSEpKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGFycmF5LWNhbGxiYWNrLXJldHVyblxuICAgIHBhZ2VzLnNvbWUoKHBhZ2UpID0+IHtcbiAgICAgIGlmIChpc0R5bmFtaWNSb3V0ZShwYWdlKSAmJiBnZXRSb3V0ZVJlZ2V4KHBhZ2UpLnJlLnRlc3QoY2xlYW5QYXRobmFtZSEpKSB7XG4gICAgICAgIHBhdGhuYW1lID0gcGFnZVxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuICAgIH0pXG4gIH1cbiAgcmV0dXJuIHJlbW92ZVBhdGhUcmFpbGluZ1NsYXNoKHBhdGhuYW1lKVxufVxuXG5leHBvcnQgdHlwZSBCYXNlUm91dGVyID0ge1xuICByb3V0ZTogc3RyaW5nXG4gIHBhdGhuYW1lOiBzdHJpbmdcbiAgcXVlcnk6IFBhcnNlZFVybFF1ZXJ5XG4gIGFzUGF0aDogc3RyaW5nXG4gIGJhc2VQYXRoOiBzdHJpbmdcbiAgbG9jYWxlPzogc3RyaW5nXG4gIGxvY2FsZXM/OiBzdHJpbmdbXVxuICBkZWZhdWx0TG9jYWxlPzogc3RyaW5nXG4gIGRvbWFpbkxvY2FsZXM/OiBEb21haW5Mb2NhbGVzXG4gIGlzTG9jYWxlRG9tYWluOiBib29sZWFuXG59XG5cbmV4cG9ydCB0eXBlIE5leHRSb3V0ZXIgPSBCYXNlUm91dGVyICZcbiAgUGljazxcbiAgICBSb3V0ZXIsXG4gICAgfCAncHVzaCdcbiAgICB8ICdyZXBsYWNlJ1xuICAgIHwgJ3JlbG9hZCdcbiAgICB8ICdiYWNrJ1xuICAgIHwgJ3ByZWZldGNoJ1xuICAgIHwgJ2JlZm9yZVBvcFN0YXRlJ1xuICAgIHwgJ2V2ZW50cydcbiAgICB8ICdpc0ZhbGxiYWNrJ1xuICAgIHwgJ2lzUmVhZHknXG4gICAgfCAnaXNQcmV2aWV3J1xuICA+XG5cbmV4cG9ydCB0eXBlIFByZWZldGNoT3B0aW9ucyA9IHtcbiAgcHJpb3JpdHk/OiBib29sZWFuXG4gIGxvY2FsZT86IHN0cmluZyB8IGZhbHNlXG59XG5cbmV4cG9ydCB0eXBlIFByaXZhdGVSb3V0ZUluZm8gPVxuICB8IChPbWl0PENvbXBsZXRlUHJpdmF0ZVJvdXRlSW5mbywgJ3N0eWxlU2hlZXRzJz4gJiB7IGluaXRpYWw6IHRydWUgfSlcbiAgfCBDb21wbGV0ZVByaXZhdGVSb3V0ZUluZm9cblxuZXhwb3J0IHR5cGUgQ29tcGxldGVQcml2YXRlUm91dGVJbmZvID0ge1xuICBDb21wb25lbnQ6IENvbXBvbmVudFR5cGVcbiAgc3R5bGVTaGVldHM6IFN0eWxlU2hlZXRUdXBsZVtdXG4gIF9fTl9TU0c/OiBib29sZWFuXG4gIF9fTl9TU1A/OiBib29sZWFuXG4gIHByb3BzPzogUmVjb3JkPHN0cmluZywgYW55PlxuICBlcnI/OiBFcnJvclxuICBlcnJvcj86IGFueVxufVxuXG5leHBvcnQgdHlwZSBBcHBQcm9wcyA9IFBpY2s8Q29tcGxldGVQcml2YXRlUm91dGVJbmZvLCAnQ29tcG9uZW50JyB8ICdlcnInPiAmIHtcbiAgcm91dGVyOiBSb3V0ZXJcbn0gJiBSZWNvcmQ8c3RyaW5nLCBhbnk+XG5leHBvcnQgdHlwZSBBcHBDb21wb25lbnQgPSBDb21wb25lbnRUeXBlPEFwcFByb3BzPlxuXG50eXBlIFN1YnNjcmlwdGlvbiA9IChcbiAgZGF0YTogUHJpdmF0ZVJvdXRlSW5mbyxcbiAgQXBwOiBBcHBDb21wb25lbnQsXG4gIHJlc2V0U2Nyb2xsOiB7IHg6IG51bWJlcjsgeTogbnVtYmVyIH0gfCBudWxsXG4pID0+IFByb21pc2U8dm9pZD5cblxudHlwZSBCZWZvcmVQb3BTdGF0ZUNhbGxiYWNrID0gKHN0YXRlOiBOZXh0SGlzdG9yeVN0YXRlKSA9PiBib29sZWFuXG5cbnR5cGUgQ29tcG9uZW50TG9hZENhbmNlbCA9ICgoKSA9PiB2b2lkKSB8IG51bGxcblxudHlwZSBIaXN0b3J5TWV0aG9kID0gJ3JlcGxhY2VTdGF0ZScgfCAncHVzaFN0YXRlJ1xuXG5jb25zdCBtYW51YWxTY3JvbGxSZXN0b3JhdGlvbiA9XG4gIHByb2Nlc3MuZW52Ll9fTkVYVF9TQ1JPTExfUkVTVE9SQVRJT04gJiZcbiAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgJ3Njcm9sbFJlc3RvcmF0aW9uJyBpbiB3aW5kb3cuaGlzdG9yeSAmJlxuICAhIShmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCB2ID0gJ19fbmV4dCdcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZXF1ZW5jZXNcbiAgICAgIHJldHVybiBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKHYsIHYpLCBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKHYpLCB0cnVlXG4gICAgfSBjYXRjaCAobikge31cbiAgfSkoKVxuXG5jb25zdCBTU0dfREFUQV9OT1RfRk9VTkQgPSBTeW1ib2woJ1NTR19EQVRBX05PVF9GT1VORCcpXG5cbmZ1bmN0aW9uIGZldGNoUmV0cnkodXJsOiBzdHJpbmcsIGF0dGVtcHRzOiBudW1iZXIpOiBQcm9taXNlPGFueT4ge1xuICByZXR1cm4gZmV0Y2godXJsLCB7XG4gICAgLy8gQ29va2llcyBhcmUgcmVxdWlyZWQgdG8gYmUgcHJlc2VudCBmb3IgTmV4dC5qcycgU1NHIFwiUHJldmlldyBNb2RlXCIuXG4gICAgLy8gQ29va2llcyBtYXkgYWxzbyBiZSByZXF1aXJlZCBmb3IgYGdldFNlcnZlclNpZGVQcm9wc2AuXG4gICAgLy9cbiAgICAvLyA+IGBmZXRjaGAgd29u4oCZdCBzZW5kIGNvb2tpZXMsIHVubGVzcyB5b3Ugc2V0IHRoZSBjcmVkZW50aWFscyBpbml0XG4gICAgLy8gPiBvcHRpb24uXG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0ZldGNoX0FQSS9Vc2luZ19GZXRjaFxuICAgIC8vXG4gICAgLy8gPiBGb3IgbWF4aW11bSBicm93c2VyIGNvbXBhdGliaWxpdHkgd2hlbiBpdCBjb21lcyB0byBzZW5kaW5nICZcbiAgICAvLyA+IHJlY2VpdmluZyBjb29raWVzLCBhbHdheXMgc3VwcGx5IHRoZSBgY3JlZGVudGlhbHM6ICdzYW1lLW9yaWdpbidgXG4gICAgLy8gPiBvcHRpb24gaW5zdGVhZCBvZiByZWx5aW5nIG9uIHRoZSBkZWZhdWx0LlxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9naXRodWIvZmV0Y2gjY2F2ZWF0c1xuICAgIGNyZWRlbnRpYWxzOiAnc2FtZS1vcmlnaW4nLFxuICB9KS50aGVuKChyZXMpID0+IHtcbiAgICBpZiAoIXJlcy5vaykge1xuICAgICAgaWYgKGF0dGVtcHRzID4gMSAmJiByZXMuc3RhdHVzID49IDUwMCkge1xuICAgICAgICByZXR1cm4gZmV0Y2hSZXRyeSh1cmwsIGF0dGVtcHRzIC0gMSlcbiAgICAgIH1cbiAgICAgIGlmIChyZXMuc3RhdHVzID09PSA0MDQpIHtcbiAgICAgICAgcmV0dXJuIHJlcy5qc29uKCkudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgIGlmIChkYXRhLm5vdEZvdW5kKSB7XG4gICAgICAgICAgICByZXR1cm4geyBub3RGb3VuZDogU1NHX0RBVEFfTk9UX0ZPVU5EIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBGYWlsZWQgdG8gbG9hZCBzdGF0aWMgcHJvcHNgKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBGYWlsZWQgdG8gbG9hZCBzdGF0aWMgcHJvcHNgKVxuICAgIH1cbiAgICByZXR1cm4gcmVzLmpzb24oKVxuICB9KVxufVxuXG5mdW5jdGlvbiBmZXRjaE5leHREYXRhKGRhdGFIcmVmOiBzdHJpbmcsIGlzU2VydmVyUmVuZGVyOiBib29sZWFuKSB7XG4gIHJldHVybiBmZXRjaFJldHJ5KGRhdGFIcmVmLCBpc1NlcnZlclJlbmRlciA/IDMgOiAxKS5jYXRjaCgoZXJyOiBFcnJvcikgPT4ge1xuICAgIC8vIFdlIHNob3VsZCBvbmx5IHRyaWdnZXIgYSBzZXJ2ZXItc2lkZSB0cmFuc2l0aW9uIGlmIHRoaXMgd2FzIGNhdXNlZFxuICAgIC8vIG9uIGEgY2xpZW50LXNpZGUgdHJhbnNpdGlvbi4gT3RoZXJ3aXNlLCB3ZSdkIGdldCBpbnRvIGFuIGluZmluaXRlXG4gICAgLy8gbG9vcC5cblxuICAgIGlmICghaXNTZXJ2ZXJSZW5kZXIpIHtcbiAgICAgIG1hcmtBc3NldEVycm9yKGVycilcbiAgICB9XG4gICAgdGhyb3cgZXJyXG4gIH0pXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvdXRlciBpbXBsZW1lbnRzIEJhc2VSb3V0ZXIge1xuICByb3V0ZTogc3RyaW5nXG4gIHBhdGhuYW1lOiBzdHJpbmdcbiAgcXVlcnk6IFBhcnNlZFVybFF1ZXJ5XG4gIGFzUGF0aDogc3RyaW5nXG4gIGJhc2VQYXRoOiBzdHJpbmdcblxuICAvKipcbiAgICogTWFwIG9mIGFsbCBjb21wb25lbnRzIGxvYWRlZCBpbiBgUm91dGVyYFxuICAgKi9cbiAgY29tcG9uZW50czogeyBbcGF0aG5hbWU6IHN0cmluZ106IFByaXZhdGVSb3V0ZUluZm8gfVxuICAvLyBTdGF0aWMgRGF0YSBDYWNoZVxuICBzZGM6IHsgW2FzUGF0aDogc3RyaW5nXTogb2JqZWN0IH0gPSB7fVxuICAvLyBJbi1mbGlnaHQgU2VydmVyIERhdGEgUmVxdWVzdHMsIGZvciBkZWR1cGluZ1xuICBzZHI6IHsgW2FzUGF0aDogc3RyaW5nXTogUHJvbWlzZTxvYmplY3Q+IH0gPSB7fVxuXG4gIHN1YjogU3Vic2NyaXB0aW9uXG4gIGNsYzogQ29tcG9uZW50TG9hZENhbmNlbFxuICBwYWdlTG9hZGVyOiBhbnlcbiAgX2JwczogQmVmb3JlUG9wU3RhdGVDYWxsYmFjayB8IHVuZGVmaW5lZFxuICBldmVudHM6IE1pdHRFbWl0dGVyXG4gIF93cmFwQXBwOiAoQXBwOiBBcHBDb21wb25lbnQpID0+IGFueVxuICBpc1NzcjogYm9vbGVhblxuICBpc0ZhbGxiYWNrOiBib29sZWFuXG4gIF9pbkZsaWdodFJvdXRlPzogc3RyaW5nXG4gIF9zaGFsbG93PzogYm9vbGVhblxuICBsb2NhbGU/OiBzdHJpbmdcbiAgbG9jYWxlcz86IHN0cmluZ1tdXG4gIGRlZmF1bHRMb2NhbGU/OiBzdHJpbmdcbiAgZG9tYWluTG9jYWxlcz86IERvbWFpbkxvY2FsZXNcbiAgaXNSZWFkeTogYm9vbGVhblxuICBpc1ByZXZpZXc6IGJvb2xlYW5cbiAgaXNMb2NhbGVEb21haW46IGJvb2xlYW5cblxuICBwcml2YXRlIF9pZHg6IG51bWJlciA9IDBcblxuICBzdGF0aWMgZXZlbnRzOiBNaXR0RW1pdHRlciA9IG1pdHQoKVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHBhdGhuYW1lOiBzdHJpbmcsXG4gICAgcXVlcnk6IFBhcnNlZFVybFF1ZXJ5LFxuICAgIGFzOiBzdHJpbmcsXG4gICAge1xuICAgICAgaW5pdGlhbFByb3BzLFxuICAgICAgcGFnZUxvYWRlcixcbiAgICAgIEFwcCxcbiAgICAgIHdyYXBBcHAsXG4gICAgICBDb21wb25lbnQsXG4gICAgICBlcnIsXG4gICAgICBzdWJzY3JpcHRpb24sXG4gICAgICBpc0ZhbGxiYWNrLFxuICAgICAgbG9jYWxlLFxuICAgICAgbG9jYWxlcyxcbiAgICAgIGRlZmF1bHRMb2NhbGUsXG4gICAgICBkb21haW5Mb2NhbGVzLFxuICAgICAgaXNQcmV2aWV3LFxuICAgIH06IHtcbiAgICAgIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uXG4gICAgICBpbml0aWFsUHJvcHM6IGFueVxuICAgICAgcGFnZUxvYWRlcjogYW55XG4gICAgICBDb21wb25lbnQ6IENvbXBvbmVudFR5cGVcbiAgICAgIEFwcDogQXBwQ29tcG9uZW50XG4gICAgICB3cmFwQXBwOiAoV3JhcEFwcENvbXBvbmVudDogQXBwQ29tcG9uZW50KSA9PiBhbnlcbiAgICAgIGVycj86IEVycm9yXG4gICAgICBpc0ZhbGxiYWNrOiBib29sZWFuXG4gICAgICBsb2NhbGU/OiBzdHJpbmdcbiAgICAgIGxvY2FsZXM/OiBzdHJpbmdbXVxuICAgICAgZGVmYXVsdExvY2FsZT86IHN0cmluZ1xuICAgICAgZG9tYWluTG9jYWxlcz86IERvbWFpbkxvY2FsZXNcbiAgICAgIGlzUHJldmlldz86IGJvb2xlYW5cbiAgICB9XG4gICkge1xuICAgIC8vIHJlcHJlc2VudHMgdGhlIGN1cnJlbnQgY29tcG9uZW50IGtleVxuICAgIHRoaXMucm91dGUgPSByZW1vdmVQYXRoVHJhaWxpbmdTbGFzaChwYXRobmFtZSlcblxuICAgIC8vIHNldCB1cCB0aGUgY29tcG9uZW50IGNhY2hlIChieSByb3V0ZSBrZXlzKVxuICAgIHRoaXMuY29tcG9uZW50cyA9IHt9XG4gICAgLy8gV2Ugc2hvdWxkIG5vdCBrZWVwIHRoZSBjYWNoZSwgaWYgdGhlcmUncyBhbiBlcnJvclxuICAgIC8vIE90aGVyd2lzZSwgdGhpcyBjYXVzZSBpc3N1ZXMgd2hlbiB3aGVuIGdvaW5nIGJhY2sgYW5kXG4gICAgLy8gY29tZSBhZ2FpbiB0byB0aGUgZXJyb3JlZCBwYWdlLlxuICAgIGlmIChwYXRobmFtZSAhPT0gJy9fZXJyb3InKSB7XG4gICAgICB0aGlzLmNvbXBvbmVudHNbdGhpcy5yb3V0ZV0gPSB7XG4gICAgICAgIENvbXBvbmVudCxcbiAgICAgICAgaW5pdGlhbDogdHJ1ZSxcbiAgICAgICAgcHJvcHM6IGluaXRpYWxQcm9wcyxcbiAgICAgICAgZXJyLFxuICAgICAgICBfX05fU1NHOiBpbml0aWFsUHJvcHMgJiYgaW5pdGlhbFByb3BzLl9fTl9TU0csXG4gICAgICAgIF9fTl9TU1A6IGluaXRpYWxQcm9wcyAmJiBpbml0aWFsUHJvcHMuX19OX1NTUCxcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmNvbXBvbmVudHNbJy9fYXBwJ10gPSB7XG4gICAgICBDb21wb25lbnQ6IEFwcCBhcyBDb21wb25lbnRUeXBlLFxuICAgICAgc3R5bGVTaGVldHM6IFtcbiAgICAgICAgLyogL19hcHAgZG9lcyBub3QgbmVlZCBpdHMgc3R5bGVzaGVldHMgbWFuYWdlZCAqL1xuICAgICAgXSxcbiAgICB9XG5cbiAgICAvLyBCYWNrd2FyZHMgY29tcGF0IGZvciBSb3V0ZXIucm91dGVyLmV2ZW50c1xuICAgIC8vIFRPRE86IFNob3VsZCBiZSByZW1vdmUgdGhlIGZvbGxvd2luZyBtYWpvciB2ZXJzaW9uIGFzIGl0IHdhcyBuZXZlciBkb2N1bWVudGVkXG4gICAgdGhpcy5ldmVudHMgPSBSb3V0ZXIuZXZlbnRzXG5cbiAgICB0aGlzLnBhZ2VMb2FkZXIgPSBwYWdlTG9hZGVyXG4gICAgdGhpcy5wYXRobmFtZSA9IHBhdGhuYW1lXG4gICAgdGhpcy5xdWVyeSA9IHF1ZXJ5XG4gICAgLy8gaWYgYXV0byBwcmVyZW5kZXJlZCBhbmQgZHluYW1pYyByb3V0ZSB3YWl0IHRvIHVwZGF0ZSBhc1BhdGhcbiAgICAvLyB1bnRpbCBhZnRlciBtb3VudCB0byBwcmV2ZW50IGh5ZHJhdGlvbiBtaXNtYXRjaFxuICAgIGNvbnN0IGF1dG9FeHBvcnREeW5hbWljID1cbiAgICAgIGlzRHluYW1pY1JvdXRlKHBhdGhuYW1lKSAmJiBzZWxmLl9fTkVYVF9EQVRBX18uYXV0b0V4cG9ydFxuXG4gICAgdGhpcy5hc1BhdGggPSBhdXRvRXhwb3J0RHluYW1pYyA/IHBhdGhuYW1lIDogYXNcbiAgICB0aGlzLmJhc2VQYXRoID0gYmFzZVBhdGhcbiAgICB0aGlzLnN1YiA9IHN1YnNjcmlwdGlvblxuICAgIHRoaXMuY2xjID0gbnVsbFxuICAgIHRoaXMuX3dyYXBBcHAgPSB3cmFwQXBwXG4gICAgLy8gbWFrZSBzdXJlIHRvIGlnbm9yZSBleHRyYSBwb3BTdGF0ZSBpbiBzYWZhcmkgb24gbmF2aWdhdGluZ1xuICAgIC8vIGJhY2sgZnJvbSBleHRlcm5hbCBzaXRlXG4gICAgdGhpcy5pc1NzciA9IHRydWVcblxuICAgIHRoaXMuaXNGYWxsYmFjayA9IGlzRmFsbGJhY2tcblxuICAgIHRoaXMuaXNSZWFkeSA9ICEhKFxuICAgICAgc2VsZi5fX05FWFRfREFUQV9fLmdzc3AgfHxcbiAgICAgIHNlbGYuX19ORVhUX0RBVEFfXy5naXAgfHxcbiAgICAgICghYXV0b0V4cG9ydER5bmFtaWMgJiZcbiAgICAgICAgIXNlbGYubG9jYXRpb24uc2VhcmNoICYmXG4gICAgICAgICFwcm9jZXNzLmVudi5fX05FWFRfSEFTX1JFV1JJVEVTKVxuICAgIClcbiAgICB0aGlzLmlzUHJldmlldyA9ICEhaXNQcmV2aWV3XG4gICAgdGhpcy5pc0xvY2FsZURvbWFpbiA9IGZhbHNlXG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuX19ORVhUX0kxOE5fU1VQUE9SVCkge1xuICAgICAgdGhpcy5sb2NhbGUgPSBsb2NhbGVcbiAgICAgIHRoaXMubG9jYWxlcyA9IGxvY2FsZXNcbiAgICAgIHRoaXMuZGVmYXVsdExvY2FsZSA9IGRlZmF1bHRMb2NhbGVcbiAgICAgIHRoaXMuZG9tYWluTG9jYWxlcyA9IGRvbWFpbkxvY2FsZXNcbiAgICAgIHRoaXMuaXNMb2NhbGVEb21haW4gPSAhIWRldGVjdERvbWFpbkxvY2FsZShcbiAgICAgICAgZG9tYWluTG9jYWxlcyxcbiAgICAgICAgc2VsZi5sb2NhdGlvbi5ob3N0bmFtZVxuICAgICAgKVxuICAgIH1cblxuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgLy8gbWFrZSBzdXJlIFwiYXNcIiBkb2Vzbid0IHN0YXJ0IHdpdGggZG91YmxlIHNsYXNoZXMgb3IgZWxzZSBpdCBjYW5cbiAgICAgIC8vIHRocm93IGFuIGVycm9yIGFzIGl0J3MgY29uc2lkZXJlZCBpbnZhbGlkXG4gICAgICBpZiAoYXMuc3Vic3RyKDAsIDIpICE9PSAnLy8nKSB7XG4gICAgICAgIC8vIGluIG9yZGVyIGZvciBgZS5zdGF0ZWAgdG8gd29yayBvbiB0aGUgYG9ucG9wc3RhdGVgIGV2ZW50XG4gICAgICAgIC8vIHdlIGhhdmUgdG8gcmVnaXN0ZXIgdGhlIGluaXRpYWwgcm91dGUgdXBvbiBpbml0aWFsaXphdGlvblxuICAgICAgICB0aGlzLmNoYW5nZVN0YXRlKFxuICAgICAgICAgICdyZXBsYWNlU3RhdGUnLFxuICAgICAgICAgIGZvcm1hdFdpdGhWYWxpZGF0aW9uKHsgcGF0aG5hbWU6IGFkZEJhc2VQYXRoKHBhdGhuYW1lKSwgcXVlcnkgfSksXG4gICAgICAgICAgZ2V0VVJMKCksXG4gICAgICAgICAgeyBsb2NhbGUgfVxuICAgICAgICApXG4gICAgICB9XG5cbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwb3BzdGF0ZScsIHRoaXMub25Qb3BTdGF0ZSlcblxuICAgICAgLy8gZW5hYmxlIGN1c3RvbSBzY3JvbGwgcmVzdG9yYXRpb24gaGFuZGxpbmcgd2hlbiBhdmFpbGFibGVcbiAgICAgIC8vIG90aGVyd2lzZSBmYWxsYmFjayB0byBicm93c2VyJ3MgZGVmYXVsdCBoYW5kbGluZ1xuICAgICAgaWYgKHByb2Nlc3MuZW52Ll9fTkVYVF9TQ1JPTExfUkVTVE9SQVRJT04pIHtcbiAgICAgICAgaWYgKG1hbnVhbFNjcm9sbFJlc3RvcmF0aW9uKSB7XG4gICAgICAgICAgd2luZG93Lmhpc3Rvcnkuc2Nyb2xsUmVzdG9yYXRpb24gPSAnbWFudWFsJ1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgb25Qb3BTdGF0ZSA9IChlOiBQb3BTdGF0ZUV2ZW50KTogdm9pZCA9PiB7XG4gICAgY29uc3Qgc3RhdGUgPSBlLnN0YXRlIGFzIEhpc3RvcnlTdGF0ZVxuXG4gICAgaWYgKCFzdGF0ZSkge1xuICAgICAgLy8gV2UgZ2V0IHN0YXRlIGFzIHVuZGVmaW5lZCBmb3IgdHdvIHJlYXNvbnMuXG4gICAgICAvLyAgMS4gV2l0aCBvbGRlciBzYWZhcmkgKDwgOCkgYW5kIG9sZGVyIGNocm9tZSAoPCAzNClcbiAgICAgIC8vICAyLiBXaGVuIHRoZSBVUkwgY2hhbmdlZCB3aXRoICNcbiAgICAgIC8vXG4gICAgICAvLyBJbiB0aGUgYm90aCBjYXNlcywgd2UgZG9uJ3QgbmVlZCB0byBwcm9jZWVkIGFuZCBjaGFuZ2UgdGhlIHJvdXRlLlxuICAgICAgLy8gKGFzIGl0J3MgYWxyZWFkeSBjaGFuZ2VkKVxuICAgICAgLy8gQnV0IHdlIGNhbiBzaW1wbHkgcmVwbGFjZSB0aGUgc3RhdGUgd2l0aCB0aGUgbmV3IGNoYW5nZXMuXG4gICAgICAvLyBBY3R1YWxseSwgZm9yICgxKSB3ZSBkb24ndCBuZWVkIHRvIG5vdGhpbmcuIEJ1dCBpdCdzIGhhcmQgdG8gZGV0ZWN0IHRoYXQgZXZlbnQuXG4gICAgICAvLyBTbywgZG9pbmcgdGhlIGZvbGxvd2luZyBmb3IgKDEpIGRvZXMgbm8gaGFybS5cbiAgICAgIGNvbnN0IHsgcGF0aG5hbWUsIHF1ZXJ5IH0gPSB0aGlzXG4gICAgICB0aGlzLmNoYW5nZVN0YXRlKFxuICAgICAgICAncmVwbGFjZVN0YXRlJyxcbiAgICAgICAgZm9ybWF0V2l0aFZhbGlkYXRpb24oeyBwYXRobmFtZTogYWRkQmFzZVBhdGgocGF0aG5hbWUpLCBxdWVyeSB9KSxcbiAgICAgICAgZ2V0VVJMKClcbiAgICAgIClcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGlmICghc3RhdGUuX19OKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBsZXQgZm9yY2VkU2Nyb2xsOiB7IHg6IG51bWJlcjsgeTogbnVtYmVyIH0gfCB1bmRlZmluZWRcbiAgICBjb25zdCB7IHVybCwgYXMsIG9wdGlvbnMsIGlkeCB9ID0gc3RhdGVcbiAgICBpZiAocHJvY2Vzcy5lbnYuX19ORVhUX1NDUk9MTF9SRVNUT1JBVElPTikge1xuICAgICAgaWYgKG1hbnVhbFNjcm9sbFJlc3RvcmF0aW9uKSB7XG4gICAgICAgIGlmICh0aGlzLl9pZHggIT09IGlkeCkge1xuICAgICAgICAgIC8vIFNuYXBzaG90IGN1cnJlbnQgc2Nyb2xsIHBvc2l0aW9uOlxuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFxuICAgICAgICAgICAgICAnX19uZXh0X3Njcm9sbF8nICsgdGhpcy5faWR4LFxuICAgICAgICAgICAgICBKU09OLnN0cmluZ2lmeSh7IHg6IHNlbGYucGFnZVhPZmZzZXQsIHk6IHNlbGYucGFnZVlPZmZzZXQgfSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9IGNhdGNoIHt9XG5cbiAgICAgICAgICAvLyBSZXN0b3JlIG9sZCBzY3JvbGwgcG9zaXRpb246XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHYgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdfX25leHRfc2Nyb2xsXycgKyBpZHgpXG4gICAgICAgICAgICBmb3JjZWRTY3JvbGwgPSBKU09OLnBhcnNlKHYhKVxuICAgICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgICAgZm9yY2VkU2Nyb2xsID0geyB4OiAwLCB5OiAwIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5faWR4ID0gaWR4XG5cbiAgICBjb25zdCB7IHBhdGhuYW1lIH0gPSBwYXJzZVJlbGF0aXZlVXJsKHVybClcblxuICAgIC8vIE1ha2Ugc3VyZSB3ZSBkb24ndCByZS1yZW5kZXIgb24gaW5pdGlhbCBsb2FkLFxuICAgIC8vIGNhbiBiZSBjYXVzZWQgYnkgbmF2aWdhdGluZyBiYWNrIGZyb20gYW4gZXh0ZXJuYWwgc2l0ZVxuICAgIGlmICh0aGlzLmlzU3NyICYmIGFzID09PSB0aGlzLmFzUGF0aCAmJiBwYXRobmFtZSA9PT0gdGhpcy5wYXRobmFtZSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgLy8gSWYgdGhlIGRvd25zdHJlYW0gYXBwbGljYXRpb24gcmV0dXJucyBmYWxzeSwgcmV0dXJuLlxuICAgIC8vIFRoZXkgd2lsbCB0aGVuIGJlIHJlc3BvbnNpYmxlIGZvciBoYW5kbGluZyB0aGUgZXZlbnQuXG4gICAgaWYgKHRoaXMuX2JwcyAmJiAhdGhpcy5fYnBzKHN0YXRlKSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgdGhpcy5jaGFuZ2UoXG4gICAgICAncmVwbGFjZVN0YXRlJyxcbiAgICAgIHVybCxcbiAgICAgIGFzLFxuICAgICAgT2JqZWN0LmFzc2lnbjx7fSwgVHJhbnNpdGlvbk9wdGlvbnMsIFRyYW5zaXRpb25PcHRpb25zPih7fSwgb3B0aW9ucywge1xuICAgICAgICBzaGFsbG93OiBvcHRpb25zLnNoYWxsb3cgJiYgdGhpcy5fc2hhbGxvdyxcbiAgICAgICAgbG9jYWxlOiBvcHRpb25zLmxvY2FsZSB8fCB0aGlzLmRlZmF1bHRMb2NhbGUsXG4gICAgICB9KSxcbiAgICAgIGZvcmNlZFNjcm9sbFxuICAgIClcbiAgfVxuXG4gIHJlbG9hZCgpOiB2b2lkIHtcbiAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKClcbiAgfVxuXG4gIC8qKlxuICAgKiBHbyBiYWNrIGluIGhpc3RvcnlcbiAgICovXG4gIGJhY2soKSB7XG4gICAgd2luZG93Lmhpc3RvcnkuYmFjaygpXG4gIH1cblxuICAvKipcbiAgICogUGVyZm9ybXMgYSBgcHVzaFN0YXRlYCB3aXRoIGFyZ3VtZW50c1xuICAgKiBAcGFyYW0gdXJsIG9mIHRoZSByb3V0ZVxuICAgKiBAcGFyYW0gYXMgbWFza3MgYHVybGAgZm9yIHRoZSBicm93c2VyXG4gICAqIEBwYXJhbSBvcHRpb25zIG9iamVjdCB5b3UgY2FuIGRlZmluZSBgc2hhbGxvd2AgYW5kIG90aGVyIG9wdGlvbnNcbiAgICovXG4gIHB1c2godXJsOiBVcmwsIGFzPzogVXJsLCBvcHRpb25zOiBUcmFuc2l0aW9uT3B0aW9ucyA9IHt9KSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Ll9fTkVYVF9TQ1JPTExfUkVTVE9SQVRJT04pIHtcbiAgICAgIC8vIFRPRE86IHJlbW92ZSBpbiB0aGUgZnV0dXJlIHdoZW4gd2UgdXBkYXRlIGhpc3RvcnkgYmVmb3JlIHJvdXRlIGNoYW5nZVxuICAgICAgLy8gaXMgY29tcGxldGUsIGFzIHRoZSBwb3BzdGF0ZSBldmVudCBzaG91bGQgaGFuZGxlIHRoaXMgY2FwdHVyZS5cbiAgICAgIGlmIChtYW51YWxTY3JvbGxSZXN0b3JhdGlvbikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIC8vIFNuYXBzaG90IHNjcm9sbCBwb3NpdGlvbiByaWdodCBiZWZvcmUgbmF2aWdhdGluZyB0byBhIG5ldyBwYWdlOlxuICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXG4gICAgICAgICAgICAnX19uZXh0X3Njcm9sbF8nICsgdGhpcy5faWR4LFxuICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoeyB4OiBzZWxmLnBhZ2VYT2Zmc2V0LCB5OiBzZWxmLnBhZ2VZT2Zmc2V0IH0pXG4gICAgICAgICAgKVxuICAgICAgICB9IGNhdGNoIHt9XG4gICAgICB9XG4gICAgfVxuICAgIDsoeyB1cmwsIGFzIH0gPSBwcmVwYXJlVXJsQXModGhpcywgdXJsLCBhcykpXG4gICAgcmV0dXJuIHRoaXMuY2hhbmdlKCdwdXNoU3RhdGUnLCB1cmwsIGFzLCBvcHRpb25zKVxuICB9XG5cbiAgLyoqXG4gICAqIFBlcmZvcm1zIGEgYHJlcGxhY2VTdGF0ZWAgd2l0aCBhcmd1bWVudHNcbiAgICogQHBhcmFtIHVybCBvZiB0aGUgcm91dGVcbiAgICogQHBhcmFtIGFzIG1hc2tzIGB1cmxgIGZvciB0aGUgYnJvd3NlclxuICAgKiBAcGFyYW0gb3B0aW9ucyBvYmplY3QgeW91IGNhbiBkZWZpbmUgYHNoYWxsb3dgIGFuZCBvdGhlciBvcHRpb25zXG4gICAqL1xuICByZXBsYWNlKHVybDogVXJsLCBhcz86IFVybCwgb3B0aW9uczogVHJhbnNpdGlvbk9wdGlvbnMgPSB7fSkge1xuICAgIDsoeyB1cmwsIGFzIH0gPSBwcmVwYXJlVXJsQXModGhpcywgdXJsLCBhcykpXG4gICAgcmV0dXJuIHRoaXMuY2hhbmdlKCdyZXBsYWNlU3RhdGUnLCB1cmwsIGFzLCBvcHRpb25zKVxuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBjaGFuZ2UoXG4gICAgbWV0aG9kOiBIaXN0b3J5TWV0aG9kLFxuICAgIHVybDogc3RyaW5nLFxuICAgIGFzOiBzdHJpbmcsXG4gICAgb3B0aW9uczogVHJhbnNpdGlvbk9wdGlvbnMsXG4gICAgZm9yY2VkU2Nyb2xsPzogeyB4OiBudW1iZXI7IHk6IG51bWJlciB9XG4gICk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGlmICghaXNMb2NhbFVSTCh1cmwpKSB7XG4gICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHVybFxuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIGNvbnN0IHNob3VsZFJlc29sdmVIcmVmID0gdXJsID09PSBhcyB8fCAob3B0aW9ucyBhcyBhbnkpLl9oXG5cbiAgICAvLyBmb3Igc3RhdGljIHBhZ2VzIHdpdGggcXVlcnkgcGFyYW1zIGluIHRoZSBVUkwgd2UgZGVsYXlcbiAgICAvLyBtYXJraW5nIHRoZSByb3V0ZXIgcmVhZHkgdW50aWwgYWZ0ZXIgdGhlIHF1ZXJ5IGlzIHVwZGF0ZWRcbiAgICBpZiAoKG9wdGlvbnMgYXMgYW55KS5faCkge1xuICAgICAgdGhpcy5pc1JlYWR5ID0gdHJ1ZVxuICAgIH1cblxuICAgIC8vIERlZmF1bHQgdG8gc2Nyb2xsIHJlc2V0IGJlaGF2aW9yIHVubGVzcyBleHBsaWNpdGx5IHNwZWNpZmllZCB0byBiZVxuICAgIC8vIGBmYWxzZWAhIFRoaXMgbWFrZXMgdGhlIGJlaGF2aW9yIGJldHdlZW4gdXNpbmcgYFJvdXRlciNwdXNoYCBhbmQgYVxuICAgIC8vIGA8TGluayAvPmAgY29uc2lzdGVudC5cbiAgICBvcHRpb25zLnNjcm9sbCA9ICEhKG9wdGlvbnMuc2Nyb2xsID8/IHRydWUpXG5cbiAgICBsZXQgbG9jYWxlQ2hhbmdlID0gb3B0aW9ucy5sb2NhbGUgIT09IHRoaXMubG9jYWxlXG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuX19ORVhUX0kxOE5fU1VQUE9SVCkge1xuICAgICAgdGhpcy5sb2NhbGUgPVxuICAgICAgICBvcHRpb25zLmxvY2FsZSA9PT0gZmFsc2VcbiAgICAgICAgICA/IHRoaXMuZGVmYXVsdExvY2FsZVxuICAgICAgICAgIDogb3B0aW9ucy5sb2NhbGUgfHwgdGhpcy5sb2NhbGVcblxuICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLmxvY2FsZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgb3B0aW9ucy5sb2NhbGUgPSB0aGlzLmxvY2FsZVxuICAgICAgfVxuXG4gICAgICBjb25zdCBwYXJzZWRBcyA9IHBhcnNlUmVsYXRpdmVVcmwoaGFzQmFzZVBhdGgoYXMpID8gZGVsQmFzZVBhdGgoYXMpIDogYXMpXG4gICAgICBjb25zdCBsb2NhbGVQYXRoUmVzdWx0ID0gbm9ybWFsaXplTG9jYWxlUGF0aChcbiAgICAgICAgcGFyc2VkQXMucGF0aG5hbWUsXG4gICAgICAgIHRoaXMubG9jYWxlc1xuICAgICAgKVxuXG4gICAgICBpZiAobG9jYWxlUGF0aFJlc3VsdC5kZXRlY3RlZExvY2FsZSkge1xuICAgICAgICB0aGlzLmxvY2FsZSA9IGxvY2FsZVBhdGhSZXN1bHQuZGV0ZWN0ZWRMb2NhbGVcbiAgICAgICAgcGFyc2VkQXMucGF0aG5hbWUgPSBhZGRCYXNlUGF0aChwYXJzZWRBcy5wYXRobmFtZSlcbiAgICAgICAgYXMgPSBmb3JtYXRXaXRoVmFsaWRhdGlvbihwYXJzZWRBcylcbiAgICAgICAgdXJsID0gYWRkQmFzZVBhdGgoXG4gICAgICAgICAgbm9ybWFsaXplTG9jYWxlUGF0aChcbiAgICAgICAgICAgIGhhc0Jhc2VQYXRoKHVybCkgPyBkZWxCYXNlUGF0aCh1cmwpIDogdXJsLFxuICAgICAgICAgICAgdGhpcy5sb2NhbGVzXG4gICAgICAgICAgKS5wYXRobmFtZVxuICAgICAgICApXG4gICAgICB9XG4gICAgICBsZXQgZGlkTmF2aWdhdGUgPSBmYWxzZVxuXG4gICAgICAvLyB3ZSBuZWVkIHRvIHdyYXAgdGhpcyBpbiB0aGUgZW52IGNoZWNrIGFnYWluIHNpbmNlIHJlZ2VuZXJhdG9yIHJ1bnRpbWVcbiAgICAgIC8vIG1vdmVzIHRoaXMgb24gaXRzIG93biBkdWUgdG8gdGhlIHJldHVyblxuICAgICAgaWYgKHByb2Nlc3MuZW52Ll9fTkVYVF9JMThOX1NVUFBPUlQpIHtcbiAgICAgICAgLy8gaWYgdGhlIGxvY2FsZSBpc24ndCBjb25maWd1cmVkIGhhcmQgbmF2aWdhdGUgdG8gc2hvdyA0MDQgcGFnZVxuICAgICAgICBpZiAoIXRoaXMubG9jYWxlcz8uaW5jbHVkZXModGhpcy5sb2NhbGUhKSkge1xuICAgICAgICAgIHBhcnNlZEFzLnBhdGhuYW1lID0gYWRkTG9jYWxlKHBhcnNlZEFzLnBhdGhuYW1lLCB0aGlzLmxvY2FsZSlcbiAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGZvcm1hdFdpdGhWYWxpZGF0aW9uKHBhcnNlZEFzKVxuICAgICAgICAgIC8vIHRoaXMgd2FzIHByZXZpb3VzbHkgYSByZXR1cm4gYnV0IHdhcyByZW1vdmVkIGluIGZhdm9yXG4gICAgICAgICAgLy8gb2YgYmV0dGVyIGRlYWQgY29kZSBlbGltaW5hdGlvbiB3aXRoIHJlZ2VuZXJhdG9yIHJ1bnRpbWVcbiAgICAgICAgICBkaWROYXZpZ2F0ZSA9IHRydWVcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCBkZXRlY3RlZERvbWFpbiA9IGRldGVjdERvbWFpbkxvY2FsZShcbiAgICAgICAgdGhpcy5kb21haW5Mb2NhbGVzLFxuICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgIHRoaXMubG9jYWxlXG4gICAgICApXG5cbiAgICAgIC8vIHdlIG5lZWQgdG8gd3JhcCB0aGlzIGluIHRoZSBlbnYgY2hlY2sgYWdhaW4gc2luY2UgcmVnZW5lcmF0b3IgcnVudGltZVxuICAgICAgLy8gbW92ZXMgdGhpcyBvbiBpdHMgb3duIGR1ZSB0byB0aGUgcmV0dXJuXG4gICAgICBpZiAocHJvY2Vzcy5lbnYuX19ORVhUX0kxOE5fU1VQUE9SVCkge1xuICAgICAgICAvLyBpZiB3ZSBhcmUgbmF2aWdhdGluZyB0byBhIGRvbWFpbiBsb2NhbGUgZW5zdXJlIHdlIHJlZGlyZWN0IHRvIHRoZVxuICAgICAgICAvLyBjb3JyZWN0IGRvbWFpblxuICAgICAgICBpZiAoXG4gICAgICAgICAgIWRpZE5hdmlnYXRlICYmXG4gICAgICAgICAgZGV0ZWN0ZWREb21haW4gJiZcbiAgICAgICAgICB0aGlzLmlzTG9jYWxlRG9tYWluICYmXG4gICAgICAgICAgc2VsZi5sb2NhdGlvbi5ob3N0bmFtZSAhPT0gZGV0ZWN0ZWREb21haW4uZG9tYWluXG4gICAgICAgICkge1xuICAgICAgICAgIGNvbnN0IGFzTm9CYXNlUGF0aCA9IGRlbEJhc2VQYXRoKGFzKVxuICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYGh0dHAke2RldGVjdGVkRG9tYWluLmh0dHAgPyAnJyA6ICdzJ306Ly8ke1xuICAgICAgICAgICAgZGV0ZWN0ZWREb21haW4uZG9tYWluXG4gICAgICAgICAgfSR7YWRkQmFzZVBhdGgoXG4gICAgICAgICAgICBgJHtcbiAgICAgICAgICAgICAgdGhpcy5sb2NhbGUgPT09IGRldGVjdGVkRG9tYWluLmRlZmF1bHRMb2NhbGVcbiAgICAgICAgICAgICAgICA/ICcnXG4gICAgICAgICAgICAgICAgOiBgLyR7dGhpcy5sb2NhbGV9YFxuICAgICAgICAgICAgfSR7YXNOb0Jhc2VQYXRoID09PSAnLycgPyAnJyA6IGFzTm9CYXNlUGF0aH1gIHx8ICcvJ1xuICAgICAgICAgICl9YFxuICAgICAgICAgIC8vIHRoaXMgd2FzIHByZXZpb3VzbHkgYSByZXR1cm4gYnV0IHdhcyByZW1vdmVkIGluIGZhdm9yXG4gICAgICAgICAgLy8gb2YgYmV0dGVyIGRlYWQgY29kZSBlbGltaW5hdGlvbiB3aXRoIHJlZ2VuZXJhdG9yIHJ1bnRpbWVcbiAgICAgICAgICBkaWROYXZpZ2F0ZSA9IHRydWVcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoZGlkTmF2aWdhdGUpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKCgpID0+IHt9KVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghKG9wdGlvbnMgYXMgYW55KS5faCkge1xuICAgICAgdGhpcy5pc1NzciA9IGZhbHNlXG4gICAgfVxuICAgIC8vIG1hcmtpbmcgcm91dGUgY2hhbmdlcyBhcyBhIG5hdmlnYXRpb24gc3RhcnQgZW50cnlcbiAgICBpZiAoU1QpIHtcbiAgICAgIHBlcmZvcm1hbmNlLm1hcmsoJ3JvdXRlQ2hhbmdlJylcbiAgICB9XG5cbiAgICBjb25zdCB7IHNoYWxsb3cgPSBmYWxzZSB9ID0gb3B0aW9uc1xuICAgIGNvbnN0IHJvdXRlUHJvcHMgPSB7IHNoYWxsb3cgfVxuXG4gICAgaWYgKHRoaXMuX2luRmxpZ2h0Um91dGUpIHtcbiAgICAgIHRoaXMuYWJvcnRDb21wb25lbnRMb2FkKHRoaXMuX2luRmxpZ2h0Um91dGUsIHJvdXRlUHJvcHMpXG4gICAgfVxuXG4gICAgYXMgPSBhZGRCYXNlUGF0aChcbiAgICAgIGFkZExvY2FsZShcbiAgICAgICAgaGFzQmFzZVBhdGgoYXMpID8gZGVsQmFzZVBhdGgoYXMpIDogYXMsXG4gICAgICAgIG9wdGlvbnMubG9jYWxlLFxuICAgICAgICB0aGlzLmRlZmF1bHRMb2NhbGVcbiAgICAgIClcbiAgICApXG4gICAgY29uc3QgY2xlYW5lZEFzID0gZGVsTG9jYWxlKFxuICAgICAgaGFzQmFzZVBhdGgoYXMpID8gZGVsQmFzZVBhdGgoYXMpIDogYXMsXG4gICAgICB0aGlzLmxvY2FsZVxuICAgIClcbiAgICB0aGlzLl9pbkZsaWdodFJvdXRlID0gYXNcblxuICAgIC8vIElmIHRoZSB1cmwgY2hhbmdlIGlzIG9ubHkgcmVsYXRlZCB0byBhIGhhc2ggY2hhbmdlXG4gICAgLy8gV2Ugc2hvdWxkIG5vdCBwcm9jZWVkLiBXZSBzaG91bGQgb25seSBjaGFuZ2UgdGhlIHN0YXRlLlxuXG4gICAgLy8gV0FSTklORzogYF9oYCBpcyBhbiBpbnRlcm5hbCBvcHRpb24gZm9yIGhhbmRpbmcgTmV4dC5qcyBjbGllbnQtc2lkZVxuICAgIC8vIGh5ZHJhdGlvbi4gWW91ciBhcHAgc2hvdWxkIF9uZXZlcl8gdXNlIHRoaXMgcHJvcGVydHkuIEl0IG1heSBjaGFuZ2UgYXRcbiAgICAvLyBhbnkgdGltZSB3aXRob3V0IG5vdGljZS5cbiAgICBpZiAoIShvcHRpb25zIGFzIGFueSkuX2ggJiYgdGhpcy5vbmx5QUhhc2hDaGFuZ2UoY2xlYW5lZEFzKSkge1xuICAgICAgdGhpcy5hc1BhdGggPSBjbGVhbmVkQXNcbiAgICAgIFJvdXRlci5ldmVudHMuZW1pdCgnaGFzaENoYW5nZVN0YXJ0JywgYXMsIHJvdXRlUHJvcHMpXG4gICAgICAvLyBUT0RPOiBkbyB3ZSBuZWVkIHRoZSByZXNvbHZlZCBocmVmIHdoZW4gb25seSBhIGhhc2ggY2hhbmdlP1xuICAgICAgdGhpcy5jaGFuZ2VTdGF0ZShtZXRob2QsIHVybCwgYXMsIG9wdGlvbnMpXG4gICAgICB0aGlzLnNjcm9sbFRvSGFzaChjbGVhbmVkQXMpXG4gICAgICB0aGlzLm5vdGlmeSh0aGlzLmNvbXBvbmVudHNbdGhpcy5yb3V0ZV0sIG51bGwpXG4gICAgICBSb3V0ZXIuZXZlbnRzLmVtaXQoJ2hhc2hDaGFuZ2VDb21wbGV0ZScsIGFzLCByb3V0ZVByb3BzKVxuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG5cbiAgICBsZXQgcGFyc2VkID0gcGFyc2VSZWxhdGl2ZVVybCh1cmwpXG4gICAgbGV0IHsgcGF0aG5hbWUsIHF1ZXJ5IH0gPSBwYXJzZWRcblxuICAgIC8vIFRoZSBidWlsZCBtYW5pZmVzdCBuZWVkcyB0byBiZSBsb2FkZWQgYmVmb3JlIGF1dG8tc3RhdGljIGR5bmFtaWMgcGFnZXNcbiAgICAvLyBnZXQgdGhlaXIgcXVlcnkgcGFyYW1ldGVycyB0byBhbGxvdyBlbnN1cmluZyB0aGV5IGNhbiBiZSBwYXJzZWQgcHJvcGVybHlcbiAgICAvLyB3aGVuIHJld3JpdHRlbiB0b1xuICAgIGxldCBwYWdlczogYW55LCByZXdyaXRlczogYW55XG4gICAgdHJ5IHtcbiAgICAgIHBhZ2VzID0gYXdhaXQgdGhpcy5wYWdlTG9hZGVyLmdldFBhZ2VMaXN0KClcbiAgICAgIDsoeyBfX3Jld3JpdGVzOiByZXdyaXRlcyB9ID0gYXdhaXQgZ2V0Q2xpZW50QnVpbGRNYW5pZmVzdCgpKVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgLy8gSWYgd2UgZmFpbCB0byByZXNvbHZlIHRoZSBwYWdlIGxpc3Qgb3IgY2xpZW50LWJ1aWxkIG1hbmlmZXN0LCB3ZSBtdXN0XG4gICAgICAvLyBkbyBhIHNlcnZlci1zaWRlIHRyYW5zaXRpb246XG4gICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGFzXG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICAvLyBJZiBhc2tlZCB0byBjaGFuZ2UgdGhlIGN1cnJlbnQgVVJMIHdlIHNob3VsZCByZWxvYWQgdGhlIGN1cnJlbnQgcGFnZVxuICAgIC8vIChub3QgbG9jYXRpb24ucmVsb2FkKCkgYnV0IHJlbG9hZCBnZXRJbml0aWFsUHJvcHMgYW5kIG90aGVyIE5leHQuanMgc3R1ZmZzKVxuICAgIC8vIFdlIGFsc28gbmVlZCB0byBzZXQgdGhlIG1ldGhvZCA9IHJlcGxhY2VTdGF0ZSBhbHdheXNcbiAgICAvLyBhcyB0aGlzIHNob3VsZCBub3QgZ28gaW50byB0aGUgaGlzdG9yeSAoVGhhdCdzIGhvdyBicm93c2VycyB3b3JrKVxuICAgIC8vIFdlIHNob3VsZCBjb21wYXJlIHRoZSBuZXcgYXNQYXRoIHRvIHRoZSBjdXJyZW50IGFzUGF0aCwgbm90IHRoZSB1cmxcbiAgICBpZiAoIXRoaXMudXJsSXNOZXcoY2xlYW5lZEFzKSAmJiAhbG9jYWxlQ2hhbmdlKSB7XG4gICAgICBtZXRob2QgPSAncmVwbGFjZVN0YXRlJ1xuICAgIH1cblxuICAgIC8vIHdlIG5lZWQgdG8gcmVzb2x2ZSB0aGUgYXMgdmFsdWUgdXNpbmcgcmV3cml0ZXMgZm9yIGR5bmFtaWMgU1NHXG4gICAgLy8gcGFnZXMgdG8gYWxsb3cgYnVpbGRpbmcgdGhlIGRhdGEgVVJMIGNvcnJlY3RseVxuICAgIGxldCByZXNvbHZlZEFzID0gYXNcblxuICAgIC8vIHVybCBhbmQgYXMgc2hvdWxkIGFsd2F5cyBiZSBwcmVmaXhlZCB3aXRoIGJhc2VQYXRoIGJ5IHRoaXNcbiAgICAvLyBwb2ludCBieSBlaXRoZXIgbmV4dC9saW5rIG9yIHJvdXRlci5wdXNoL3JlcGxhY2Ugc28gc3RyaXAgdGhlXG4gICAgLy8gYmFzZVBhdGggZnJvbSB0aGUgcGF0aG5hbWUgdG8gbWF0Y2ggdGhlIHBhZ2VzIGRpciAxLXRvLTFcbiAgICBwYXRobmFtZSA9IHBhdGhuYW1lXG4gICAgICA/IHJlbW92ZVBhdGhUcmFpbGluZ1NsYXNoKGRlbEJhc2VQYXRoKHBhdGhuYW1lKSlcbiAgICAgIDogcGF0aG5hbWVcblxuICAgIGlmIChzaG91bGRSZXNvbHZlSHJlZiAmJiBwYXRobmFtZSAhPT0gJy9fZXJyb3InKSB7XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuX19ORVhUX0hBU19SRVdSSVRFUyAmJiBhcy5zdGFydHNXaXRoKCcvJykpIHtcbiAgICAgICAgY29uc3QgcmV3cml0ZXNSZXN1bHQgPSByZXNvbHZlUmV3cml0ZXMoXG4gICAgICAgICAgYWRkQmFzZVBhdGgoYWRkTG9jYWxlKGNsZWFuZWRBcywgdGhpcy5sb2NhbGUpKSxcbiAgICAgICAgICBwYWdlcyxcbiAgICAgICAgICByZXdyaXRlcyxcbiAgICAgICAgICBxdWVyeSxcbiAgICAgICAgICAocDogc3RyaW5nKSA9PiByZXNvbHZlRHluYW1pY1JvdXRlKHAsIHBhZ2VzKSxcbiAgICAgICAgICB0aGlzLmxvY2FsZXNcbiAgICAgICAgKVxuICAgICAgICByZXNvbHZlZEFzID0gcmV3cml0ZXNSZXN1bHQuYXNQYXRoXG5cbiAgICAgICAgaWYgKHJld3JpdGVzUmVzdWx0Lm1hdGNoZWRQYWdlICYmIHJld3JpdGVzUmVzdWx0LnJlc29sdmVkSHJlZikge1xuICAgICAgICAgIC8vIGlmIHRoaXMgZGlyZWN0bHkgbWF0Y2hlcyBhIHBhZ2Ugd2UgbmVlZCB0byB1cGRhdGUgdGhlIGhyZWYgdG9cbiAgICAgICAgICAvLyBhbGxvdyB0aGUgY29ycmVjdCBwYWdlIGNodW5rIHRvIGJlIGxvYWRlZFxuICAgICAgICAgIHBhdGhuYW1lID0gcmV3cml0ZXNSZXN1bHQucmVzb2x2ZWRIcmVmXG4gICAgICAgICAgcGFyc2VkLnBhdGhuYW1lID0gcGF0aG5hbWVcbiAgICAgICAgICB1cmwgPSBmb3JtYXRXaXRoVmFsaWRhdGlvbihwYXJzZWQpXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhcnNlZC5wYXRobmFtZSA9IHJlc29sdmVEeW5hbWljUm91dGUocGF0aG5hbWUsIHBhZ2VzKVxuXG4gICAgICAgIGlmIChwYXJzZWQucGF0aG5hbWUgIT09IHBhdGhuYW1lKSB7XG4gICAgICAgICAgcGF0aG5hbWUgPSBwYXJzZWQucGF0aG5hbWVcbiAgICAgICAgICB1cmwgPSBmb3JtYXRXaXRoVmFsaWRhdGlvbihwYXJzZWQpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCByb3V0ZSA9IHJlbW92ZVBhdGhUcmFpbGluZ1NsYXNoKHBhdGhuYW1lKVxuXG4gICAgaWYgKCFpc0xvY2FsVVJMKGFzKSkge1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgIGBJbnZhbGlkIGhyZWY6IFwiJHt1cmx9XCIgYW5kIGFzOiBcIiR7YXN9XCIsIHJlY2VpdmVkIHJlbGF0aXZlIGhyZWYgYW5kIGV4dGVybmFsIGFzYCArXG4gICAgICAgICAgICBgXFxuU2VlIG1vcmUgaW5mbzogaHR0cHM6Ly9uZXh0anMub3JnL2RvY3MvbWVzc2FnZXMvaW52YWxpZC1yZWxhdGl2ZS11cmwtZXh0ZXJuYWwtYXNgXG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBhc1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgcmVzb2x2ZWRBcyA9IGRlbExvY2FsZShkZWxCYXNlUGF0aChyZXNvbHZlZEFzKSwgdGhpcy5sb2NhbGUpXG5cbiAgICBpZiAoaXNEeW5hbWljUm91dGUocm91dGUpKSB7XG4gICAgICBjb25zdCBwYXJzZWRBcyA9IHBhcnNlUmVsYXRpdmVVcmwocmVzb2x2ZWRBcylcbiAgICAgIGNvbnN0IGFzUGF0aG5hbWUgPSBwYXJzZWRBcy5wYXRobmFtZVxuXG4gICAgICBjb25zdCByb3V0ZVJlZ2V4ID0gZ2V0Um91dGVSZWdleChyb3V0ZSlcbiAgICAgIGNvbnN0IHJvdXRlTWF0Y2ggPSBnZXRSb3V0ZU1hdGNoZXIocm91dGVSZWdleCkoYXNQYXRobmFtZSlcbiAgICAgIGNvbnN0IHNob3VsZEludGVycG9sYXRlID0gcm91dGUgPT09IGFzUGF0aG5hbWVcbiAgICAgIGNvbnN0IGludGVycG9sYXRlZEFzID0gc2hvdWxkSW50ZXJwb2xhdGVcbiAgICAgICAgPyBpbnRlcnBvbGF0ZUFzKHJvdXRlLCBhc1BhdGhuYW1lLCBxdWVyeSlcbiAgICAgICAgOiAoe30gYXMgeyByZXN1bHQ6IHVuZGVmaW5lZDsgcGFyYW1zOiB1bmRlZmluZWQgfSlcblxuICAgICAgaWYgKCFyb3V0ZU1hdGNoIHx8IChzaG91bGRJbnRlcnBvbGF0ZSAmJiAhaW50ZXJwb2xhdGVkQXMucmVzdWx0KSkge1xuICAgICAgICBjb25zdCBtaXNzaW5nUGFyYW1zID0gT2JqZWN0LmtleXMocm91dGVSZWdleC5ncm91cHMpLmZpbHRlcihcbiAgICAgICAgICAocGFyYW0pID0+ICFxdWVyeVtwYXJhbV1cbiAgICAgICAgKVxuXG4gICAgICAgIGlmIChtaXNzaW5nUGFyYW1zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICAgICBgJHtcbiAgICAgICAgICAgICAgICBzaG91bGRJbnRlcnBvbGF0ZVxuICAgICAgICAgICAgICAgICAgPyBgSW50ZXJwb2xhdGluZyBocmVmYFxuICAgICAgICAgICAgICAgICAgOiBgTWlzbWF0Y2hpbmcgXFxgYXNcXGAgYW5kIFxcYGhyZWZcXGBgXG4gICAgICAgICAgICAgIH0gZmFpbGVkIHRvIG1hbnVhbGx5IHByb3ZpZGUgYCArXG4gICAgICAgICAgICAgICAgYHRoZSBwYXJhbXM6ICR7bWlzc2luZ1BhcmFtcy5qb2luKFxuICAgICAgICAgICAgICAgICAgJywgJ1xuICAgICAgICAgICAgICAgICl9IGluIHRoZSBcXGBocmVmXFxgJ3MgXFxgcXVlcnlcXGBgXG4gICAgICAgICAgICApXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgKHNob3VsZEludGVycG9sYXRlXG4gICAgICAgICAgICAgID8gYFRoZSBwcm92aWRlZCBcXGBocmVmXFxgICgke3VybH0pIHZhbHVlIGlzIG1pc3NpbmcgcXVlcnkgdmFsdWVzICgke21pc3NpbmdQYXJhbXMuam9pbihcbiAgICAgICAgICAgICAgICAgICcsICdcbiAgICAgICAgICAgICAgICApfSkgdG8gYmUgaW50ZXJwb2xhdGVkIHByb3Blcmx5LiBgXG4gICAgICAgICAgICAgIDogYFRoZSBwcm92aWRlZCBcXGBhc1xcYCB2YWx1ZSAoJHthc1BhdGhuYW1lfSkgaXMgaW5jb21wYXRpYmxlIHdpdGggdGhlIFxcYGhyZWZcXGAgdmFsdWUgKCR7cm91dGV9KS4gYCkgK1xuICAgICAgICAgICAgICBgUmVhZCBtb3JlOiBodHRwczovL25leHRqcy5vcmcvZG9jcy9tZXNzYWdlcy8ke1xuICAgICAgICAgICAgICAgIHNob3VsZEludGVycG9sYXRlXG4gICAgICAgICAgICAgICAgICA/ICdocmVmLWludGVycG9sYXRpb24tZmFpbGVkJ1xuICAgICAgICAgICAgICAgICAgOiAnaW5jb21wYXRpYmxlLWhyZWYtYXMnXG4gICAgICAgICAgICAgIH1gXG4gICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHNob3VsZEludGVycG9sYXRlKSB7XG4gICAgICAgIGFzID0gZm9ybWF0V2l0aFZhbGlkYXRpb24oXG4gICAgICAgICAgT2JqZWN0LmFzc2lnbih7fSwgcGFyc2VkQXMsIHtcbiAgICAgICAgICAgIHBhdGhuYW1lOiBpbnRlcnBvbGF0ZWRBcy5yZXN1bHQsXG4gICAgICAgICAgICBxdWVyeTogb21pdFBhcm1zRnJvbVF1ZXJ5KHF1ZXJ5LCBpbnRlcnBvbGF0ZWRBcy5wYXJhbXMhKSxcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBNZXJnZSBwYXJhbXMgaW50byBgcXVlcnlgLCBvdmVyd3JpdGluZyBhbnkgc3BlY2lmaWVkIGluIHNlYXJjaFxuICAgICAgICBPYmplY3QuYXNzaWduKHF1ZXJ5LCByb3V0ZU1hdGNoKVxuICAgICAgfVxuICAgIH1cblxuICAgIFJvdXRlci5ldmVudHMuZW1pdCgncm91dGVDaGFuZ2VTdGFydCcsIGFzLCByb3V0ZVByb3BzKVxuXG4gICAgdHJ5IHtcbiAgICAgIGxldCByb3V0ZUluZm8gPSBhd2FpdCB0aGlzLmdldFJvdXRlSW5mbyhcbiAgICAgICAgcm91dGUsXG4gICAgICAgIHBhdGhuYW1lLFxuICAgICAgICBxdWVyeSxcbiAgICAgICAgYXMsXG4gICAgICAgIHJlc29sdmVkQXMsXG4gICAgICAgIHJvdXRlUHJvcHNcbiAgICAgIClcbiAgICAgIGxldCB7IGVycm9yLCBwcm9wcywgX19OX1NTRywgX19OX1NTUCB9ID0gcm91dGVJbmZvXG5cbiAgICAgIC8vIGhhbmRsZSByZWRpcmVjdCBvbiBjbGllbnQtdHJhbnNpdGlvblxuICAgICAgaWYgKChfX05fU1NHIHx8IF9fTl9TU1ApICYmIHByb3BzKSB7XG4gICAgICAgIGlmICgocHJvcHMgYXMgYW55KS5wYWdlUHJvcHMgJiYgKHByb3BzIGFzIGFueSkucGFnZVByb3BzLl9fTl9SRURJUkVDVCkge1xuICAgICAgICAgIGNvbnN0IGRlc3RpbmF0aW9uID0gKHByb3BzIGFzIGFueSkucGFnZVByb3BzLl9fTl9SRURJUkVDVFxuXG4gICAgICAgICAgLy8gY2hlY2sgaWYgZGVzdGluYXRpb24gaXMgaW50ZXJuYWwgKHJlc29sdmVzIHRvIGEgcGFnZSkgYW5kIGF0dGVtcHRcbiAgICAgICAgICAvLyBjbGllbnQtbmF2aWdhdGlvbiBpZiBpdCBpcyBmYWxsaW5nIGJhY2sgdG8gaGFyZCBuYXZpZ2F0aW9uIGlmXG4gICAgICAgICAgLy8gaXQncyBub3RcbiAgICAgICAgICBpZiAoZGVzdGluYXRpb24uc3RhcnRzV2l0aCgnLycpKSB7XG4gICAgICAgICAgICBjb25zdCBwYXJzZWRIcmVmID0gcGFyc2VSZWxhdGl2ZVVybChkZXN0aW5hdGlvbilcbiAgICAgICAgICAgIHBhcnNlZEhyZWYucGF0aG5hbWUgPSByZXNvbHZlRHluYW1pY1JvdXRlKFxuICAgICAgICAgICAgICBwYXJzZWRIcmVmLnBhdGhuYW1lLFxuICAgICAgICAgICAgICBwYWdlc1xuICAgICAgICAgICAgKVxuXG4gICAgICAgICAgICBpZiAocGFnZXMuaW5jbHVkZXMocGFyc2VkSHJlZi5wYXRobmFtZSkpIHtcbiAgICAgICAgICAgICAgY29uc3QgeyB1cmw6IG5ld1VybCwgYXM6IG5ld0FzIH0gPSBwcmVwYXJlVXJsQXMoXG4gICAgICAgICAgICAgICAgdGhpcyxcbiAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbixcbiAgICAgICAgICAgICAgICBkZXN0aW5hdGlvblxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLmNoYW5nZShtZXRob2QsIG5ld1VybCwgbmV3QXMsIG9wdGlvbnMpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBkZXN0aW5hdGlvblxuICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgoKSA9PiB7fSlcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaXNQcmV2aWV3ID0gISFwcm9wcy5fX05fUFJFVklFV1xuXG4gICAgICAgIC8vIGhhbmRsZSBTU0cgZGF0YSA0MDRcbiAgICAgICAgaWYgKHByb3BzLm5vdEZvdW5kID09PSBTU0dfREFUQV9OT1RfRk9VTkQpIHtcbiAgICAgICAgICBsZXQgbm90Rm91bmRSb3V0ZVxuXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuZmV0Y2hDb21wb25lbnQoJy80MDQnKVxuICAgICAgICAgICAgbm90Rm91bmRSb3V0ZSA9ICcvNDA0J1xuICAgICAgICAgIH0gY2F0Y2ggKF8pIHtcbiAgICAgICAgICAgIG5vdEZvdW5kUm91dGUgPSAnL19lcnJvcidcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByb3V0ZUluZm8gPSBhd2FpdCB0aGlzLmdldFJvdXRlSW5mbyhcbiAgICAgICAgICAgIG5vdEZvdW5kUm91dGUsXG4gICAgICAgICAgICBub3RGb3VuZFJvdXRlLFxuICAgICAgICAgICAgcXVlcnksXG4gICAgICAgICAgICBhcyxcbiAgICAgICAgICAgIHJlc29sdmVkQXMsXG4gICAgICAgICAgICB7IHNoYWxsb3c6IGZhbHNlIH1cbiAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgUm91dGVyLmV2ZW50cy5lbWl0KCdiZWZvcmVIaXN0b3J5Q2hhbmdlJywgYXMsIHJvdXRlUHJvcHMpXG4gICAgICB0aGlzLmNoYW5nZVN0YXRlKG1ldGhvZCwgdXJsLCBhcywgb3B0aW9ucylcblxuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgY29uc3QgYXBwQ29tcDogYW55ID0gdGhpcy5jb21wb25lbnRzWycvX2FwcCddLkNvbXBvbmVudFxuICAgICAgICA7KHdpbmRvdyBhcyBhbnkpLm5leHQuaXNQcmVyZW5kZXJlZCA9XG4gICAgICAgICAgYXBwQ29tcC5nZXRJbml0aWFsUHJvcHMgPT09IGFwcENvbXAub3JpZ0dldEluaXRpYWxQcm9wcyAmJlxuICAgICAgICAgICEocm91dGVJbmZvLkNvbXBvbmVudCBhcyBhbnkpLmdldEluaXRpYWxQcm9wc1xuICAgICAgfVxuXG4gICAgICAvLyBzaGFsbG93IHJvdXRpbmcgaXMgb25seSBhbGxvd2VkIGZvciBzYW1lIHBhZ2UgVVJMIGNoYW5nZXMuXG4gICAgICBjb25zdCBpc1ZhbGlkU2hhbGxvd1JvdXRlID0gb3B0aW9ucy5zaGFsbG93ICYmIHRoaXMucm91dGUgPT09IHJvdXRlXG5cbiAgICAgIGlmIChcbiAgICAgICAgKG9wdGlvbnMgYXMgYW55KS5faCAmJlxuICAgICAgICBwYXRobmFtZSA9PT0gJy9fZXJyb3InICYmXG4gICAgICAgIHNlbGYuX19ORVhUX0RBVEFfXy5wcm9wcz8ucGFnZVByb3BzPy5zdGF0dXNDb2RlID09PSA1MDAgJiZcbiAgICAgICAgcHJvcHM/LnBhZ2VQcm9wc1xuICAgICAgKSB7XG4gICAgICAgIC8vIGVuc3VyZSBzdGF0dXNDb2RlIGlzIHN0aWxsIGNvcnJlY3QgZm9yIHN0YXRpYyA1MDAgcGFnZVxuICAgICAgICAvLyB3aGVuIHVwZGF0aW5nIHF1ZXJ5IGluZm9ybWF0aW9uXG4gICAgICAgIHByb3BzLnBhZ2VQcm9wcy5zdGF0dXNDb2RlID0gNTAwXG4gICAgICB9XG5cbiAgICAgIGF3YWl0IHRoaXMuc2V0KFxuICAgICAgICByb3V0ZSxcbiAgICAgICAgcGF0aG5hbWUhLFxuICAgICAgICBxdWVyeSxcbiAgICAgICAgY2xlYW5lZEFzLFxuICAgICAgICByb3V0ZUluZm8sXG4gICAgICAgIGZvcmNlZFNjcm9sbCB8fFxuICAgICAgICAgIChpc1ZhbGlkU2hhbGxvd1JvdXRlIHx8ICFvcHRpb25zLnNjcm9sbCA/IG51bGwgOiB7IHg6IDAsIHk6IDAgfSlcbiAgICAgICkuY2F0Y2goKGUpID0+IHtcbiAgICAgICAgaWYgKGUuY2FuY2VsbGVkKSBlcnJvciA9IGVycm9yIHx8IGVcbiAgICAgICAgZWxzZSB0aHJvdyBlXG4gICAgICB9KVxuXG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgUm91dGVyLmV2ZW50cy5lbWl0KCdyb3V0ZUNoYW5nZUVycm9yJywgZXJyb3IsIGNsZWFuZWRBcywgcm91dGVQcm9wcylcbiAgICAgICAgdGhyb3cgZXJyb3JcbiAgICAgIH1cblxuICAgICAgaWYgKHByb2Nlc3MuZW52Ll9fTkVYVF9JMThOX1NVUFBPUlQpIHtcbiAgICAgICAgaWYgKHRoaXMubG9jYWxlKSB7XG4gICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmxhbmcgPSB0aGlzLmxvY2FsZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBSb3V0ZXIuZXZlbnRzLmVtaXQoJ3JvdXRlQ2hhbmdlQ29tcGxldGUnLCBhcywgcm91dGVQcm9wcylcblxuICAgICAgcmV0dXJuIHRydWVcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGlmIChlcnIuY2FuY2VsbGVkKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgICAgdGhyb3cgZXJyXG4gICAgfVxuICB9XG5cbiAgY2hhbmdlU3RhdGUoXG4gICAgbWV0aG9kOiBIaXN0b3J5TWV0aG9kLFxuICAgIHVybDogc3RyaW5nLFxuICAgIGFzOiBzdHJpbmcsXG4gICAgb3B0aW9uczogVHJhbnNpdGlvbk9wdGlvbnMgPSB7fVxuICApOiB2b2lkIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgaWYgKHR5cGVvZiB3aW5kb3cuaGlzdG9yeSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihgV2FybmluZzogd2luZG93Lmhpc3RvcnkgaXMgbm90IGF2YWlsYWJsZS5gKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiB3aW5kb3cuaGlzdG9yeVttZXRob2RdID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICBjb25zb2xlLmVycm9yKGBXYXJuaW5nOiB3aW5kb3cuaGlzdG9yeS4ke21ldGhvZH0gaXMgbm90IGF2YWlsYWJsZWApXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChtZXRob2QgIT09ICdwdXNoU3RhdGUnIHx8IGdldFVSTCgpICE9PSBhcykge1xuICAgICAgdGhpcy5fc2hhbGxvdyA9IG9wdGlvbnMuc2hhbGxvd1xuICAgICAgd2luZG93Lmhpc3RvcnlbbWV0aG9kXShcbiAgICAgICAge1xuICAgICAgICAgIHVybCxcbiAgICAgICAgICBhcyxcbiAgICAgICAgICBvcHRpb25zLFxuICAgICAgICAgIF9fTjogdHJ1ZSxcbiAgICAgICAgICBpZHg6IHRoaXMuX2lkeCA9IG1ldGhvZCAhPT0gJ3B1c2hTdGF0ZScgPyB0aGlzLl9pZHggOiB0aGlzLl9pZHggKyAxLFxuICAgICAgICB9IGFzIEhpc3RvcnlTdGF0ZSxcbiAgICAgICAgLy8gTW9zdCBicm93c2VycyBjdXJyZW50bHkgaWdub3JlcyB0aGlzIHBhcmFtZXRlciwgYWx0aG91Z2ggdGhleSBtYXkgdXNlIGl0IGluIHRoZSBmdXR1cmUuXG4gICAgICAgIC8vIFBhc3NpbmcgdGhlIGVtcHR5IHN0cmluZyBoZXJlIHNob3VsZCBiZSBzYWZlIGFnYWluc3QgZnV0dXJlIGNoYW5nZXMgdG8gdGhlIG1ldGhvZC5cbiAgICAgICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0hpc3RvcnkvcmVwbGFjZVN0YXRlXG4gICAgICAgICcnLFxuICAgICAgICBhc1xuICAgICAgKVxuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGhhbmRsZVJvdXRlSW5mb0Vycm9yKFxuICAgIGVycjogRXJyb3IgJiB7IGNvZGU6IGFueTsgY2FuY2VsbGVkOiBib29sZWFuIH0sXG4gICAgcGF0aG5hbWU6IHN0cmluZyxcbiAgICBxdWVyeTogUGFyc2VkVXJsUXVlcnksXG4gICAgYXM6IHN0cmluZyxcbiAgICByb3V0ZVByb3BzOiBSb3V0ZVByb3BlcnRpZXMsXG4gICAgbG9hZEVycm9yRmFpbD86IGJvb2xlYW5cbiAgKTogUHJvbWlzZTxDb21wbGV0ZVByaXZhdGVSb3V0ZUluZm8+IHtcbiAgICBpZiAoZXJyLmNhbmNlbGxlZCkge1xuICAgICAgLy8gYnViYmxlIHVwIGNhbmNlbGxhdGlvbiBlcnJvcnNcbiAgICAgIHRocm93IGVyclxuICAgIH1cblxuICAgIGlmIChpc0Fzc2V0RXJyb3IoZXJyKSB8fCBsb2FkRXJyb3JGYWlsKSB7XG4gICAgICBSb3V0ZXIuZXZlbnRzLmVtaXQoJ3JvdXRlQ2hhbmdlRXJyb3InLCBlcnIsIGFzLCByb3V0ZVByb3BzKVxuXG4gICAgICAvLyBJZiB3ZSBjYW4ndCBsb2FkIHRoZSBwYWdlIGl0IGNvdWxkIGJlIG9uZSBvZiBmb2xsb3dpbmcgcmVhc29uc1xuICAgICAgLy8gIDEuIFBhZ2UgZG9lc24ndCBleGlzdHNcbiAgICAgIC8vICAyLiBQYWdlIGRvZXMgZXhpc3QgaW4gYSBkaWZmZXJlbnQgem9uZVxuICAgICAgLy8gIDMuIEludGVybmFsIGVycm9yIHdoaWxlIGxvYWRpbmcgdGhlIHBhZ2VcblxuICAgICAgLy8gU28sIGRvaW5nIGEgaGFyZCByZWxvYWQgaXMgdGhlIHByb3BlciB3YXkgdG8gZGVhbCB3aXRoIHRoaXMuXG4gICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGFzXG5cbiAgICAgIC8vIENoYW5naW5nIHRoZSBVUkwgZG9lc24ndCBibG9jayBleGVjdXRpbmcgdGhlIGN1cnJlbnQgY29kZSBwYXRoLlxuICAgICAgLy8gU28gbGV0J3MgdGhyb3cgYSBjYW5jZWxsYXRpb24gZXJyb3Igc3RvcCB0aGUgcm91dGluZyBsb2dpYy5cbiAgICAgIHRocm93IGJ1aWxkQ2FuY2VsbGF0aW9uRXJyb3IoKVxuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBsZXQgQ29tcG9uZW50OiBDb21wb25lbnRUeXBlXG4gICAgICBsZXQgc3R5bGVTaGVldHM6IFN0eWxlU2hlZXRUdXBsZVtdXG4gICAgICBsZXQgcHJvcHM6IFJlY29yZDxzdHJpbmcsIGFueT4gfCB1bmRlZmluZWRcblxuICAgICAgaWYgKFxuICAgICAgICB0eXBlb2YgQ29tcG9uZW50ISA9PT0gJ3VuZGVmaW5lZCcgfHxcbiAgICAgICAgdHlwZW9mIHN0eWxlU2hlZXRzISA9PT0gJ3VuZGVmaW5lZCdcbiAgICAgICkge1xuICAgICAgICA7KHsgcGFnZTogQ29tcG9uZW50LCBzdHlsZVNoZWV0cyB9ID0gYXdhaXQgdGhpcy5mZXRjaENvbXBvbmVudChcbiAgICAgICAgICAnL19lcnJvcidcbiAgICAgICAgKSlcbiAgICAgIH1cblxuICAgICAgY29uc3Qgcm91dGVJbmZvOiBDb21wbGV0ZVByaXZhdGVSb3V0ZUluZm8gPSB7XG4gICAgICAgIHByb3BzLFxuICAgICAgICBDb21wb25lbnQsXG4gICAgICAgIHN0eWxlU2hlZXRzLFxuICAgICAgICBlcnIsXG4gICAgICAgIGVycm9yOiBlcnIsXG4gICAgICB9XG5cbiAgICAgIGlmICghcm91dGVJbmZvLnByb3BzKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcm91dGVJbmZvLnByb3BzID0gYXdhaXQgdGhpcy5nZXRJbml0aWFsUHJvcHMoQ29tcG9uZW50LCB7XG4gICAgICAgICAgICBlcnIsXG4gICAgICAgICAgICBwYXRobmFtZSxcbiAgICAgICAgICAgIHF1ZXJ5LFxuICAgICAgICAgIH0gYXMgYW55KVxuICAgICAgICB9IGNhdGNoIChnaXBFcnIpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBpbiBlcnJvciBwYWdlIGBnZXRJbml0aWFsUHJvcHNgOiAnLCBnaXBFcnIpXG4gICAgICAgICAgcm91dGVJbmZvLnByb3BzID0ge31cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gcm91dGVJbmZvXG4gICAgfSBjYXRjaCAocm91dGVJbmZvRXJyKSB7XG4gICAgICByZXR1cm4gdGhpcy5oYW5kbGVSb3V0ZUluZm9FcnJvcihcbiAgICAgICAgcm91dGVJbmZvRXJyLFxuICAgICAgICBwYXRobmFtZSxcbiAgICAgICAgcXVlcnksXG4gICAgICAgIGFzLFxuICAgICAgICByb3V0ZVByb3BzLFxuICAgICAgICB0cnVlXG4gICAgICApXG4gICAgfVxuICB9XG5cbiAgYXN5bmMgZ2V0Um91dGVJbmZvKFxuICAgIHJvdXRlOiBzdHJpbmcsXG4gICAgcGF0aG5hbWU6IHN0cmluZyxcbiAgICBxdWVyeTogYW55LFxuICAgIGFzOiBzdHJpbmcsXG4gICAgcmVzb2x2ZWRBczogc3RyaW5nLFxuICAgIHJvdXRlUHJvcHM6IFJvdXRlUHJvcGVydGllc1xuICApOiBQcm9taXNlPFByaXZhdGVSb3V0ZUluZm8+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgZXhpc3RpbmdSb3V0ZUluZm86IFByaXZhdGVSb3V0ZUluZm8gfCB1bmRlZmluZWQgPSB0aGlzLmNvbXBvbmVudHNbXG4gICAgICAgIHJvdXRlXG4gICAgICBdXG4gICAgICBpZiAocm91dGVQcm9wcy5zaGFsbG93ICYmIGV4aXN0aW5nUm91dGVJbmZvICYmIHRoaXMucm91dGUgPT09IHJvdXRlKSB7XG4gICAgICAgIHJldHVybiBleGlzdGluZ1JvdXRlSW5mb1xuICAgICAgfVxuXG4gICAgICBjb25zdCBjYWNoZWRSb3V0ZUluZm86IENvbXBsZXRlUHJpdmF0ZVJvdXRlSW5mbyB8IHVuZGVmaW5lZCA9XG4gICAgICAgIGV4aXN0aW5nUm91dGVJbmZvICYmICdpbml0aWFsJyBpbiBleGlzdGluZ1JvdXRlSW5mb1xuICAgICAgICAgID8gdW5kZWZpbmVkXG4gICAgICAgICAgOiBleGlzdGluZ1JvdXRlSW5mb1xuICAgICAgY29uc3Qgcm91dGVJbmZvOiBDb21wbGV0ZVByaXZhdGVSb3V0ZUluZm8gPSBjYWNoZWRSb3V0ZUluZm9cbiAgICAgICAgPyBjYWNoZWRSb3V0ZUluZm9cbiAgICAgICAgOiBhd2FpdCB0aGlzLmZldGNoQ29tcG9uZW50KHJvdXRlKS50aGVuKChyZXMpID0+ICh7XG4gICAgICAgICAgICBDb21wb25lbnQ6IHJlcy5wYWdlLFxuICAgICAgICAgICAgc3R5bGVTaGVldHM6IHJlcy5zdHlsZVNoZWV0cyxcbiAgICAgICAgICAgIF9fTl9TU0c6IHJlcy5tb2QuX19OX1NTRyxcbiAgICAgICAgICAgIF9fTl9TU1A6IHJlcy5tb2QuX19OX1NTUCxcbiAgICAgICAgICB9KSlcblxuICAgICAgY29uc3QgeyBDb21wb25lbnQsIF9fTl9TU0csIF9fTl9TU1AgfSA9IHJvdXRlSW5mb1xuXG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICBjb25zdCB7IGlzVmFsaWRFbGVtZW50VHlwZSB9ID0gcmVxdWlyZSgncmVhY3QtaXMnKVxuICAgICAgICBpZiAoIWlzVmFsaWRFbGVtZW50VHlwZShDb21wb25lbnQpKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgYFRoZSBkZWZhdWx0IGV4cG9ydCBpcyBub3QgYSBSZWFjdCBDb21wb25lbnQgaW4gcGFnZTogXCIke3BhdGhuYW1lfVwiYFxuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsZXQgZGF0YUhyZWY6IHN0cmluZyB8IHVuZGVmaW5lZFxuXG4gICAgICBpZiAoX19OX1NTRyB8fCBfX05fU1NQKSB7XG4gICAgICAgIGRhdGFIcmVmID0gdGhpcy5wYWdlTG9hZGVyLmdldERhdGFIcmVmKFxuICAgICAgICAgIGZvcm1hdFdpdGhWYWxpZGF0aW9uKHsgcGF0aG5hbWUsIHF1ZXJ5IH0pLFxuICAgICAgICAgIHJlc29sdmVkQXMsXG4gICAgICAgICAgX19OX1NTRyxcbiAgICAgICAgICB0aGlzLmxvY2FsZVxuICAgICAgICApXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHByb3BzID0gYXdhaXQgdGhpcy5fZ2V0RGF0YTxDb21wbGV0ZVByaXZhdGVSb3V0ZUluZm8+KCgpID0+XG4gICAgICAgIF9fTl9TU0dcbiAgICAgICAgICA/IHRoaXMuX2dldFN0YXRpY0RhdGEoZGF0YUhyZWYhKVxuICAgICAgICAgIDogX19OX1NTUFxuICAgICAgICAgID8gdGhpcy5fZ2V0U2VydmVyRGF0YShkYXRhSHJlZiEpXG4gICAgICAgICAgOiB0aGlzLmdldEluaXRpYWxQcm9wcyhcbiAgICAgICAgICAgICAgQ29tcG9uZW50LFxuICAgICAgICAgICAgICAvLyB3ZSBwcm92aWRlIEFwcFRyZWUgbGF0ZXIgc28gdGhpcyBuZWVkcyB0byBiZSBgYW55YFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcGF0aG5hbWUsXG4gICAgICAgICAgICAgICAgcXVlcnksXG4gICAgICAgICAgICAgICAgYXNQYXRoOiBhcyxcbiAgICAgICAgICAgICAgICBsb2NhbGU6IHRoaXMubG9jYWxlLFxuICAgICAgICAgICAgICAgIGxvY2FsZXM6IHRoaXMubG9jYWxlcyxcbiAgICAgICAgICAgICAgICBkZWZhdWx0TG9jYWxlOiB0aGlzLmRlZmF1bHRMb2NhbGUsXG4gICAgICAgICAgICAgIH0gYXMgYW55XG4gICAgICAgICAgICApXG4gICAgICApXG5cbiAgICAgIHJvdXRlSW5mby5wcm9wcyA9IHByb3BzXG4gICAgICB0aGlzLmNvbXBvbmVudHNbcm91dGVdID0gcm91dGVJbmZvXG4gICAgICByZXR1cm4gcm91dGVJbmZvXG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4gdGhpcy5oYW5kbGVSb3V0ZUluZm9FcnJvcihlcnIsIHBhdGhuYW1lLCBxdWVyeSwgYXMsIHJvdXRlUHJvcHMpXG4gICAgfVxuICB9XG5cbiAgc2V0KFxuICAgIHJvdXRlOiBzdHJpbmcsXG4gICAgcGF0aG5hbWU6IHN0cmluZyxcbiAgICBxdWVyeTogUGFyc2VkVXJsUXVlcnksXG4gICAgYXM6IHN0cmluZyxcbiAgICBkYXRhOiBQcml2YXRlUm91dGVJbmZvLFxuICAgIHJlc2V0U2Nyb2xsOiB7IHg6IG51bWJlcjsgeTogbnVtYmVyIH0gfCBudWxsXG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRoaXMuaXNGYWxsYmFjayA9IGZhbHNlXG5cbiAgICB0aGlzLnJvdXRlID0gcm91dGVcbiAgICB0aGlzLnBhdGhuYW1lID0gcGF0aG5hbWVcbiAgICB0aGlzLnF1ZXJ5ID0gcXVlcnlcbiAgICB0aGlzLmFzUGF0aCA9IGFzXG4gICAgcmV0dXJuIHRoaXMubm90aWZ5KGRhdGEsIHJlc2V0U2Nyb2xsKVxuICB9XG5cbiAgLyoqXG4gICAqIENhbGxiYWNrIHRvIGV4ZWN1dGUgYmVmb3JlIHJlcGxhY2luZyByb3V0ZXIgc3RhdGVcbiAgICogQHBhcmFtIGNiIGNhbGxiYWNrIHRvIGJlIGV4ZWN1dGVkXG4gICAqL1xuICBiZWZvcmVQb3BTdGF0ZShjYjogQmVmb3JlUG9wU3RhdGVDYWxsYmFjaykge1xuICAgIHRoaXMuX2JwcyA9IGNiXG4gIH1cblxuICBvbmx5QUhhc2hDaGFuZ2UoYXM6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGlmICghdGhpcy5hc1BhdGgpIHJldHVybiBmYWxzZVxuICAgIGNvbnN0IFtvbGRVcmxOb0hhc2gsIG9sZEhhc2hdID0gdGhpcy5hc1BhdGguc3BsaXQoJyMnKVxuICAgIGNvbnN0IFtuZXdVcmxOb0hhc2gsIG5ld0hhc2hdID0gYXMuc3BsaXQoJyMnKVxuXG4gICAgLy8gTWFrZXMgc3VyZSB3ZSBzY3JvbGwgdG8gdGhlIHByb3ZpZGVkIGhhc2ggaWYgdGhlIHVybC9oYXNoIGFyZSB0aGUgc2FtZVxuICAgIGlmIChuZXdIYXNoICYmIG9sZFVybE5vSGFzaCA9PT0gbmV3VXJsTm9IYXNoICYmIG9sZEhhc2ggPT09IG5ld0hhc2gpIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuXG4gICAgLy8gSWYgdGhlIHVybHMgYXJlIGNoYW5nZSwgdGhlcmUncyBtb3JlIHRoYW4gYSBoYXNoIGNoYW5nZVxuICAgIGlmIChvbGRVcmxOb0hhc2ggIT09IG5ld1VybE5vSGFzaCkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgLy8gSWYgdGhlIGhhc2ggaGFzIGNoYW5nZWQsIHRoZW4gaXQncyBhIGhhc2ggb25seSBjaGFuZ2UuXG4gICAgLy8gVGhpcyBjaGVjayBpcyBuZWNlc3NhcnkgdG8gaGFuZGxlIGJvdGggdGhlIGVudGVyIGFuZFxuICAgIC8vIGxlYXZlIGhhc2ggPT09ICcnIGNhc2VzLiBUaGUgaWRlbnRpdHkgY2FzZSBmYWxscyB0aHJvdWdoXG4gICAgLy8gYW5kIGlzIHRyZWF0ZWQgYXMgYSBuZXh0IHJlbG9hZC5cbiAgICByZXR1cm4gb2xkSGFzaCAhPT0gbmV3SGFzaFxuICB9XG5cbiAgc2Nyb2xsVG9IYXNoKGFzOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBbLCBoYXNoXSA9IGFzLnNwbGl0KCcjJylcbiAgICAvLyBTY3JvbGwgdG8gdG9wIGlmIHRoZSBoYXNoIGlzIGp1c3QgYCNgIHdpdGggbm8gdmFsdWUgb3IgYCN0b3BgXG4gICAgLy8gVG8gbWlycm9yIGJyb3dzZXJzXG4gICAgaWYgKGhhc2ggPT09ICcnIHx8IGhhc2ggPT09ICd0b3AnKSB7XG4gICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgMClcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIC8vIEZpcnN0IHdlIGNoZWNrIGlmIHRoZSBlbGVtZW50IGJ5IGlkIGlzIGZvdW5kXG4gICAgY29uc3QgaWRFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGhhc2gpXG4gICAgaWYgKGlkRWwpIHtcbiAgICAgIGlkRWwuc2Nyb2xsSW50b1ZpZXcoKVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIC8vIElmIHRoZXJlJ3Mgbm8gZWxlbWVudCB3aXRoIHRoZSBpZCwgd2UgY2hlY2sgdGhlIGBuYW1lYCBwcm9wZXJ0eVxuICAgIC8vIFRvIG1pcnJvciBicm93c2Vyc1xuICAgIGNvbnN0IG5hbWVFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlOYW1lKGhhc2gpWzBdXG4gICAgaWYgKG5hbWVFbCkge1xuICAgICAgbmFtZUVsLnNjcm9sbEludG9WaWV3KClcbiAgICB9XG4gIH1cblxuICB1cmxJc05ldyhhc1BhdGg6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmFzUGF0aCAhPT0gYXNQYXRoXG4gIH1cblxuICAvKipcbiAgICogUHJlZmV0Y2ggcGFnZSBjb2RlLCB5b3UgbWF5IHdhaXQgZm9yIHRoZSBkYXRhIGR1cmluZyBwYWdlIHJlbmRlcmluZy5cbiAgICogVGhpcyBmZWF0dXJlIG9ubHkgd29ya3MgaW4gcHJvZHVjdGlvbiFcbiAgICogQHBhcmFtIHVybCB0aGUgaHJlZiBvZiBwcmVmZXRjaGVkIHBhZ2VcbiAgICogQHBhcmFtIGFzUGF0aCB0aGUgYXMgcGF0aCBvZiB0aGUgcHJlZmV0Y2hlZCBwYWdlXG4gICAqL1xuICBhc3luYyBwcmVmZXRjaChcbiAgICB1cmw6IHN0cmluZyxcbiAgICBhc1BhdGg6IHN0cmluZyA9IHVybCxcbiAgICBvcHRpb25zOiBQcmVmZXRjaE9wdGlvbnMgPSB7fVxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBsZXQgcGFyc2VkID0gcGFyc2VSZWxhdGl2ZVVybCh1cmwpXG5cbiAgICBsZXQgeyBwYXRobmFtZSB9ID0gcGFyc2VkXG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuX19ORVhUX0kxOE5fU1VQUE9SVCkge1xuICAgICAgaWYgKG9wdGlvbnMubG9jYWxlID09PSBmYWxzZSkge1xuICAgICAgICBwYXRobmFtZSA9IG5vcm1hbGl6ZUxvY2FsZVBhdGghKHBhdGhuYW1lLCB0aGlzLmxvY2FsZXMpLnBhdGhuYW1lXG4gICAgICAgIHBhcnNlZC5wYXRobmFtZSA9IHBhdGhuYW1lXG4gICAgICAgIHVybCA9IGZvcm1hdFdpdGhWYWxpZGF0aW9uKHBhcnNlZClcblxuICAgICAgICBsZXQgcGFyc2VkQXMgPSBwYXJzZVJlbGF0aXZlVXJsKGFzUGF0aClcbiAgICAgICAgY29uc3QgbG9jYWxlUGF0aFJlc3VsdCA9IG5vcm1hbGl6ZUxvY2FsZVBhdGghKFxuICAgICAgICAgIHBhcnNlZEFzLnBhdGhuYW1lLFxuICAgICAgICAgIHRoaXMubG9jYWxlc1xuICAgICAgICApXG4gICAgICAgIHBhcnNlZEFzLnBhdGhuYW1lID0gbG9jYWxlUGF0aFJlc3VsdC5wYXRobmFtZVxuICAgICAgICBvcHRpb25zLmxvY2FsZSA9IGxvY2FsZVBhdGhSZXN1bHQuZGV0ZWN0ZWRMb2NhbGUgfHwgdGhpcy5kZWZhdWx0TG9jYWxlXG4gICAgICAgIGFzUGF0aCA9IGZvcm1hdFdpdGhWYWxpZGF0aW9uKHBhcnNlZEFzKVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHBhZ2VzID0gYXdhaXQgdGhpcy5wYWdlTG9hZGVyLmdldFBhZ2VMaXN0KClcbiAgICBsZXQgcmVzb2x2ZWRBcyA9IGFzUGF0aFxuXG4gICAgaWYgKHByb2Nlc3MuZW52Ll9fTkVYVF9IQVNfUkVXUklURVMgJiYgYXNQYXRoLnN0YXJ0c1dpdGgoJy8nKSkge1xuICAgICAgbGV0IHJld3JpdGVzOiBhbnlcbiAgICAgIDsoeyBfX3Jld3JpdGVzOiByZXdyaXRlcyB9ID0gYXdhaXQgZ2V0Q2xpZW50QnVpbGRNYW5pZmVzdCgpKVxuXG4gICAgICBjb25zdCByZXdyaXRlc1Jlc3VsdCA9IHJlc29sdmVSZXdyaXRlcyhcbiAgICAgICAgYWRkQmFzZVBhdGgoYWRkTG9jYWxlKGFzUGF0aCwgdGhpcy5sb2NhbGUpKSxcbiAgICAgICAgcGFnZXMsXG4gICAgICAgIHJld3JpdGVzLFxuICAgICAgICBwYXJzZWQucXVlcnksXG4gICAgICAgIChwOiBzdHJpbmcpID0+IHJlc29sdmVEeW5hbWljUm91dGUocCwgcGFnZXMpLFxuICAgICAgICB0aGlzLmxvY2FsZXNcbiAgICAgIClcbiAgICAgIHJlc29sdmVkQXMgPSBkZWxMb2NhbGUoZGVsQmFzZVBhdGgocmV3cml0ZXNSZXN1bHQuYXNQYXRoKSwgdGhpcy5sb2NhbGUpXG5cbiAgICAgIGlmIChyZXdyaXRlc1Jlc3VsdC5tYXRjaGVkUGFnZSAmJiByZXdyaXRlc1Jlc3VsdC5yZXNvbHZlZEhyZWYpIHtcbiAgICAgICAgLy8gaWYgdGhpcyBkaXJlY3RseSBtYXRjaGVzIGEgcGFnZSB3ZSBuZWVkIHRvIHVwZGF0ZSB0aGUgaHJlZiB0b1xuICAgICAgICAvLyBhbGxvdyB0aGUgY29ycmVjdCBwYWdlIGNodW5rIHRvIGJlIGxvYWRlZFxuICAgICAgICBwYXRobmFtZSA9IHJld3JpdGVzUmVzdWx0LnJlc29sdmVkSHJlZlxuICAgICAgICBwYXJzZWQucGF0aG5hbWUgPSBwYXRobmFtZVxuICAgICAgICB1cmwgPSBmb3JtYXRXaXRoVmFsaWRhdGlvbihwYXJzZWQpXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhcnNlZC5wYXRobmFtZSA9IHJlc29sdmVEeW5hbWljUm91dGUocGFyc2VkLnBhdGhuYW1lLCBwYWdlcylcblxuICAgICAgaWYgKHBhcnNlZC5wYXRobmFtZSAhPT0gcGF0aG5hbWUpIHtcbiAgICAgICAgcGF0aG5hbWUgPSBwYXJzZWQucGF0aG5hbWVcbiAgICAgICAgdXJsID0gZm9ybWF0V2l0aFZhbGlkYXRpb24ocGFyc2VkKVxuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCByb3V0ZSA9IHJlbW92ZVBhdGhUcmFpbGluZ1NsYXNoKHBhdGhuYW1lKVxuXG4gICAgLy8gUHJlZmV0Y2ggaXMgbm90IHN1cHBvcnRlZCBpbiBkZXZlbG9wbWVudCBtb2RlIGJlY2F1c2UgaXQgd291bGQgdHJpZ2dlciBvbi1kZW1hbmQtZW50cmllc1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICB0aGlzLnBhZ2VMb2FkZXIuX2lzU3NnKHJvdXRlKS50aGVuKChpc1NzZzogYm9vbGVhbikgPT4ge1xuICAgICAgICByZXR1cm4gaXNTc2dcbiAgICAgICAgICA/IHRoaXMuX2dldFN0YXRpY0RhdGEoXG4gICAgICAgICAgICAgIHRoaXMucGFnZUxvYWRlci5nZXREYXRhSHJlZihcbiAgICAgICAgICAgICAgICB1cmwsXG4gICAgICAgICAgICAgICAgcmVzb2x2ZWRBcyxcbiAgICAgICAgICAgICAgICB0cnVlLFxuICAgICAgICAgICAgICAgIHR5cGVvZiBvcHRpb25zLmxvY2FsZSAhPT0gJ3VuZGVmaW5lZCdcbiAgICAgICAgICAgICAgICAgID8gb3B0aW9ucy5sb2NhbGVcbiAgICAgICAgICAgICAgICAgIDogdGhpcy5sb2NhbGVcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKVxuICAgICAgICAgIDogZmFsc2VcbiAgICAgIH0pLFxuICAgICAgdGhpcy5wYWdlTG9hZGVyW29wdGlvbnMucHJpb3JpdHkgPyAnbG9hZFBhZ2UnIDogJ3ByZWZldGNoJ10ocm91dGUpLFxuICAgIF0pXG4gIH1cblxuICBhc3luYyBmZXRjaENvbXBvbmVudChyb3V0ZTogc3RyaW5nKTogUHJvbWlzZTxHb29kUGFnZUNhY2hlPiB7XG4gICAgbGV0IGNhbmNlbGxlZCA9IGZhbHNlXG4gICAgY29uc3QgY2FuY2VsID0gKHRoaXMuY2xjID0gKCkgPT4ge1xuICAgICAgY2FuY2VsbGVkID0gdHJ1ZVxuICAgIH0pXG5cbiAgICBjb25zdCBjb21wb25lbnRSZXN1bHQgPSBhd2FpdCB0aGlzLnBhZ2VMb2FkZXIubG9hZFBhZ2Uocm91dGUpXG5cbiAgICBpZiAoY2FuY2VsbGVkKSB7XG4gICAgICBjb25zdCBlcnJvcjogYW55ID0gbmV3IEVycm9yKFxuICAgICAgICBgQWJvcnQgZmV0Y2hpbmcgY29tcG9uZW50IGZvciByb3V0ZTogXCIke3JvdXRlfVwiYFxuICAgICAgKVxuICAgICAgZXJyb3IuY2FuY2VsbGVkID0gdHJ1ZVxuICAgICAgdGhyb3cgZXJyb3JcbiAgICB9XG5cbiAgICBpZiAoY2FuY2VsID09PSB0aGlzLmNsYykge1xuICAgICAgdGhpcy5jbGMgPSBudWxsXG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbXBvbmVudFJlc3VsdFxuICB9XG5cbiAgX2dldERhdGE8VD4oZm46ICgpID0+IFByb21pc2U8VD4pOiBQcm9taXNlPFQ+IHtcbiAgICBsZXQgY2FuY2VsbGVkID0gZmFsc2VcbiAgICBjb25zdCBjYW5jZWwgPSAoKSA9PiB7XG4gICAgICBjYW5jZWxsZWQgPSB0cnVlXG4gICAgfVxuICAgIHRoaXMuY2xjID0gY2FuY2VsXG4gICAgcmV0dXJuIGZuKCkudGhlbigoZGF0YSkgPT4ge1xuICAgICAgaWYgKGNhbmNlbCA9PT0gdGhpcy5jbGMpIHtcbiAgICAgICAgdGhpcy5jbGMgPSBudWxsXG4gICAgICB9XG5cbiAgICAgIGlmIChjYW5jZWxsZWQpIHtcbiAgICAgICAgY29uc3QgZXJyOiBhbnkgPSBuZXcgRXJyb3IoJ0xvYWRpbmcgaW5pdGlhbCBwcm9wcyBjYW5jZWxsZWQnKVxuICAgICAgICBlcnIuY2FuY2VsbGVkID0gdHJ1ZVxuICAgICAgICB0aHJvdyBlcnJcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGRhdGFcbiAgICB9KVxuICB9XG5cbiAgX2dldFN0YXRpY0RhdGEoZGF0YUhyZWY6IHN0cmluZyk6IFByb21pc2U8b2JqZWN0PiB7XG4gICAgY29uc3QgeyBocmVmOiBjYWNoZUtleSB9ID0gbmV3IFVSTChkYXRhSHJlZiwgd2luZG93LmxvY2F0aW9uLmhyZWYpXG4gICAgaWYgKFxuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJyAmJlxuICAgICAgIXRoaXMuaXNQcmV2aWV3ICYmXG4gICAgICB0aGlzLnNkY1tjYWNoZUtleV1cbiAgICApIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5zZGNbY2FjaGVLZXldKVxuICAgIH1cbiAgICByZXR1cm4gZmV0Y2hOZXh0RGF0YShkYXRhSHJlZiwgdGhpcy5pc1NzcikudGhlbigoZGF0YSkgPT4ge1xuICAgICAgdGhpcy5zZGNbY2FjaGVLZXldID0gZGF0YVxuICAgICAgcmV0dXJuIGRhdGFcbiAgICB9KVxuICB9XG5cbiAgX2dldFNlcnZlckRhdGEoZGF0YUhyZWY6IHN0cmluZyk6IFByb21pc2U8b2JqZWN0PiB7XG4gICAgY29uc3QgeyBocmVmOiByZXNvdXJjZUtleSB9ID0gbmV3IFVSTChkYXRhSHJlZiwgd2luZG93LmxvY2F0aW9uLmhyZWYpXG4gICAgaWYgKHRoaXMuc2RyW3Jlc291cmNlS2V5XSkge1xuICAgICAgcmV0dXJuIHRoaXMuc2RyW3Jlc291cmNlS2V5XVxuICAgIH1cbiAgICByZXR1cm4gKHRoaXMuc2RyW3Jlc291cmNlS2V5XSA9IGZldGNoTmV4dERhdGEoZGF0YUhyZWYsIHRoaXMuaXNTc3IpXG4gICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICBkZWxldGUgdGhpcy5zZHJbcmVzb3VyY2VLZXldXG4gICAgICAgIHJldHVybiBkYXRhXG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgZGVsZXRlIHRoaXMuc2RyW3Jlc291cmNlS2V5XVxuICAgICAgICB0aHJvdyBlcnJcbiAgICAgIH0pKVxuICB9XG5cbiAgZ2V0SW5pdGlhbFByb3BzKFxuICAgIENvbXBvbmVudDogQ29tcG9uZW50VHlwZSxcbiAgICBjdHg6IE5leHRQYWdlQ29udGV4dFxuICApOiBQcm9taXNlPGFueT4ge1xuICAgIGNvbnN0IHsgQ29tcG9uZW50OiBBcHAgfSA9IHRoaXMuY29tcG9uZW50c1snL19hcHAnXVxuICAgIGNvbnN0IEFwcFRyZWUgPSB0aGlzLl93cmFwQXBwKEFwcCBhcyBBcHBDb21wb25lbnQpXG4gICAgY3R4LkFwcFRyZWUgPSBBcHBUcmVlXG4gICAgcmV0dXJuIGxvYWRHZXRJbml0aWFsUHJvcHM8QXBwQ29udGV4dFR5cGU8Um91dGVyPj4oQXBwLCB7XG4gICAgICBBcHBUcmVlLFxuICAgICAgQ29tcG9uZW50LFxuICAgICAgcm91dGVyOiB0aGlzLFxuICAgICAgY3R4LFxuICAgIH0pXG4gIH1cblxuICBhYm9ydENvbXBvbmVudExvYWQoYXM6IHN0cmluZywgcm91dGVQcm9wczogUm91dGVQcm9wZXJ0aWVzKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY2xjKSB7XG4gICAgICBSb3V0ZXIuZXZlbnRzLmVtaXQoXG4gICAgICAgICdyb3V0ZUNoYW5nZUVycm9yJyxcbiAgICAgICAgYnVpbGRDYW5jZWxsYXRpb25FcnJvcigpLFxuICAgICAgICBhcyxcbiAgICAgICAgcm91dGVQcm9wc1xuICAgICAgKVxuICAgICAgdGhpcy5jbGMoKVxuICAgICAgdGhpcy5jbGMgPSBudWxsXG4gICAgfVxuICB9XG5cbiAgbm90aWZ5KFxuICAgIGRhdGE6IFByaXZhdGVSb3V0ZUluZm8sXG4gICAgcmVzZXRTY3JvbGw6IHsgeDogbnVtYmVyOyB5OiBudW1iZXIgfSB8IG51bGxcbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuc3ViKFxuICAgICAgZGF0YSxcbiAgICAgIHRoaXMuY29tcG9uZW50c1snL19hcHAnXS5Db21wb25lbnQgYXMgQXBwQ29tcG9uZW50LFxuICAgICAgcmVzZXRTY3JvbGxcbiAgICApXG4gIH1cbn1cbiIsIi8vIEZvcm1hdCBmdW5jdGlvbiBtb2RpZmllZCBmcm9tIG5vZGVqc1xuLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCB7IFVybE9iamVjdCB9IGZyb20gJ3VybCdcbmltcG9ydCB7IFBhcnNlZFVybFF1ZXJ5IH0gZnJvbSAncXVlcnlzdHJpbmcnXG5pbXBvcnQgKiBhcyBxdWVyeXN0cmluZyBmcm9tICcuL3F1ZXJ5c3RyaW5nJ1xuXG5jb25zdCBzbGFzaGVkUHJvdG9jb2xzID0gL2h0dHBzP3xmdHB8Z29waGVyfGZpbGUvXG5cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXRVcmwodXJsT2JqOiBVcmxPYmplY3QpIHtcbiAgbGV0IHsgYXV0aCwgaG9zdG5hbWUgfSA9IHVybE9ialxuICBsZXQgcHJvdG9jb2wgPSB1cmxPYmoucHJvdG9jb2wgfHwgJydcbiAgbGV0IHBhdGhuYW1lID0gdXJsT2JqLnBhdGhuYW1lIHx8ICcnXG4gIGxldCBoYXNoID0gdXJsT2JqLmhhc2ggfHwgJydcbiAgbGV0IHF1ZXJ5ID0gdXJsT2JqLnF1ZXJ5IHx8ICcnXG4gIGxldCBob3N0OiBzdHJpbmcgfCBmYWxzZSA9IGZhbHNlXG5cbiAgYXV0aCA9IGF1dGggPyBlbmNvZGVVUklDb21wb25lbnQoYXV0aCkucmVwbGFjZSgvJTNBL2ksICc6JykgKyAnQCcgOiAnJ1xuXG4gIGlmICh1cmxPYmouaG9zdCkge1xuICAgIGhvc3QgPSBhdXRoICsgdXJsT2JqLmhvc3RcbiAgfSBlbHNlIGlmIChob3N0bmFtZSkge1xuICAgIGhvc3QgPSBhdXRoICsgKH5ob3N0bmFtZS5pbmRleE9mKCc6JykgPyBgWyR7aG9zdG5hbWV9XWAgOiBob3N0bmFtZSlcbiAgICBpZiAodXJsT2JqLnBvcnQpIHtcbiAgICAgIGhvc3QgKz0gJzonICsgdXJsT2JqLnBvcnRcbiAgICB9XG4gIH1cblxuICBpZiAocXVlcnkgJiYgdHlwZW9mIHF1ZXJ5ID09PSAnb2JqZWN0Jykge1xuICAgIHF1ZXJ5ID0gU3RyaW5nKHF1ZXJ5c3RyaW5nLnVybFF1ZXJ5VG9TZWFyY2hQYXJhbXMocXVlcnkgYXMgUGFyc2VkVXJsUXVlcnkpKVxuICB9XG5cbiAgbGV0IHNlYXJjaCA9IHVybE9iai5zZWFyY2ggfHwgKHF1ZXJ5ICYmIGA/JHtxdWVyeX1gKSB8fCAnJ1xuXG4gIGlmIChwcm90b2NvbCAmJiBwcm90b2NvbC5zdWJzdHIoLTEpICE9PSAnOicpIHByb3RvY29sICs9ICc6J1xuXG4gIGlmIChcbiAgICB1cmxPYmouc2xhc2hlcyB8fFxuICAgICgoIXByb3RvY29sIHx8IHNsYXNoZWRQcm90b2NvbHMudGVzdChwcm90b2NvbCkpICYmIGhvc3QgIT09IGZhbHNlKVxuICApIHtcbiAgICBob3N0ID0gJy8vJyArIChob3N0IHx8ICcnKVxuICAgIGlmIChwYXRobmFtZSAmJiBwYXRobmFtZVswXSAhPT0gJy8nKSBwYXRobmFtZSA9ICcvJyArIHBhdGhuYW1lXG4gIH0gZWxzZSBpZiAoIWhvc3QpIHtcbiAgICBob3N0ID0gJydcbiAgfVxuXG4gIGlmIChoYXNoICYmIGhhc2hbMF0gIT09ICcjJykgaGFzaCA9ICcjJyArIGhhc2hcbiAgaWYgKHNlYXJjaCAmJiBzZWFyY2hbMF0gIT09ICc/Jykgc2VhcmNoID0gJz8nICsgc2VhcmNoXG5cbiAgcGF0aG5hbWUgPSBwYXRobmFtZS5yZXBsYWNlKC9bPyNdL2csIGVuY29kZVVSSUNvbXBvbmVudClcbiAgc2VhcmNoID0gc2VhcmNoLnJlcGxhY2UoJyMnLCAnJTIzJylcblxuICByZXR1cm4gYCR7cHJvdG9jb2x9JHtob3N0fSR7cGF0aG5hbWV9JHtzZWFyY2h9JHtoYXNofWBcbn1cbiIsIi8vIElkZW50aWZ5IC9bcGFyYW1dLyBpbiByb3V0ZSBzdHJpbmdcbmNvbnN0IFRFU1RfUk9VVEUgPSAvXFwvXFxbW14vXSs/XFxdKD89XFwvfCQpL1xuXG5leHBvcnQgZnVuY3Rpb24gaXNEeW5hbWljUm91dGUocm91dGU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICByZXR1cm4gVEVTVF9ST1VURS50ZXN0KHJvdXRlKVxufVxuIiwiaW1wb3J0IHsgZ2V0TG9jYXRpb25PcmlnaW4gfSBmcm9tICcuLi8uLi91dGlscydcbmltcG9ydCB7IHNlYXJjaFBhcmFtc1RvVXJsUXVlcnkgfSBmcm9tICcuL3F1ZXJ5c3RyaW5nJ1xuXG4vKipcbiAqIFBhcnNlcyBwYXRoLXJlbGF0aXZlIHVybHMgKGUuZy4gYC9oZWxsby93b3JsZD9mb289YmFyYCkuIElmIHVybCBpc24ndCBwYXRoLXJlbGF0aXZlXG4gKiAoZS5nLiBgLi9oZWxsb2ApIHRoZW4gYXQgbGVhc3QgYmFzZSBtdXN0IGJlLlxuICogQWJzb2x1dGUgdXJscyBhcmUgcmVqZWN0ZWQgd2l0aCBvbmUgZXhjZXB0aW9uLCBpbiB0aGUgYnJvd3NlciwgYWJzb2x1dGUgdXJscyB0aGF0IGFyZSBvblxuICogdGhlIGN1cnJlbnQgb3JpZ2luIHdpbGwgYmUgcGFyc2VkIGFzIHJlbGF0aXZlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVJlbGF0aXZlVXJsKHVybDogc3RyaW5nLCBiYXNlPzogc3RyaW5nKSB7XG4gIGNvbnN0IGdsb2JhbEJhc2UgPSBuZXcgVVJMKFxuICAgIHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnID8gJ2h0dHA6Ly9uJyA6IGdldExvY2F0aW9uT3JpZ2luKClcbiAgKVxuICBjb25zdCByZXNvbHZlZEJhc2UgPSBiYXNlID8gbmV3IFVSTChiYXNlLCBnbG9iYWxCYXNlKSA6IGdsb2JhbEJhc2VcbiAgY29uc3QgeyBwYXRobmFtZSwgc2VhcmNoUGFyYW1zLCBzZWFyY2gsIGhhc2gsIGhyZWYsIG9yaWdpbiB9ID0gbmV3IFVSTChcbiAgICB1cmwsXG4gICAgcmVzb2x2ZWRCYXNlXG4gIClcbiAgaWYgKG9yaWdpbiAhPT0gZ2xvYmFsQmFzZS5vcmlnaW4pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYGludmFyaWFudDogaW52YWxpZCByZWxhdGl2ZSBVUkwsIHJvdXRlciByZWNlaXZlZCAke3VybH1gKVxuICB9XG4gIHJldHVybiB7XG4gICAgcGF0aG5hbWUsXG4gICAgcXVlcnk6IHNlYXJjaFBhcmFtc1RvVXJsUXVlcnkoc2VhcmNoUGFyYW1zKSxcbiAgICBzZWFyY2gsXG4gICAgaGFzaCxcbiAgICBocmVmOiBocmVmLnNsaWNlKGdsb2JhbEJhc2Uub3JpZ2luLmxlbmd0aCksXG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIHBhdGhUb1JlZ2V4cCBmcm9tICduZXh0L2Rpc3QvY29tcGlsZWQvcGF0aC10by1yZWdleHAnXG5cbmV4cG9ydCB7IHBhdGhUb1JlZ2V4cCB9XG5cbmV4cG9ydCBjb25zdCBtYXRjaGVyT3B0aW9uczogcGF0aFRvUmVnZXhwLlRva2Vuc1RvUmVnZXhwT3B0aW9ucyAmXG4gIHBhdGhUb1JlZ2V4cC5QYXJzZU9wdGlvbnMgPSB7XG4gIHNlbnNpdGl2ZTogZmFsc2UsXG4gIGRlbGltaXRlcjogJy8nLFxufVxuXG5leHBvcnQgY29uc3QgY3VzdG9tUm91dGVNYXRjaGVyT3B0aW9uczogcGF0aFRvUmVnZXhwLlRva2Vuc1RvUmVnZXhwT3B0aW9ucyAmXG4gIHBhdGhUb1JlZ2V4cC5QYXJzZU9wdGlvbnMgPSB7XG4gIC4uLm1hdGNoZXJPcHRpb25zLFxuICBzdHJpY3Q6IHRydWUsXG59XG5cbmV4cG9ydCBkZWZhdWx0IChjdXN0b21Sb3V0ZSA9IGZhbHNlKSA9PiB7XG4gIHJldHVybiAocGF0aDogc3RyaW5nKSA9PiB7XG4gICAgY29uc3Qga2V5czogcGF0aFRvUmVnZXhwLktleVtdID0gW11cbiAgICBjb25zdCBtYXRjaGVyUmVnZXggPSBwYXRoVG9SZWdleHAucGF0aFRvUmVnZXhwKFxuICAgICAgcGF0aCxcbiAgICAgIGtleXMsXG4gICAgICBjdXN0b21Sb3V0ZSA/IGN1c3RvbVJvdXRlTWF0Y2hlck9wdGlvbnMgOiBtYXRjaGVyT3B0aW9uc1xuICAgIClcbiAgICBjb25zdCBtYXRjaGVyID0gcGF0aFRvUmVnZXhwLnJlZ2V4cFRvRnVuY3Rpb24obWF0Y2hlclJlZ2V4LCBrZXlzKVxuXG4gICAgcmV0dXJuIChwYXRobmFtZTogc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZCwgcGFyYW1zPzogYW55KSA9PiB7XG4gICAgICBjb25zdCByZXMgPSBwYXRobmFtZSA9PSBudWxsID8gZmFsc2UgOiBtYXRjaGVyKHBhdGhuYW1lKVxuICAgICAgaWYgKCFyZXMpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG5cbiAgICAgIGlmIChjdXN0b21Sb3V0ZSkge1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBrZXlzKSB7XG4gICAgICAgICAgLy8gdW5uYW1lZCBwYXJhbXMgc2hvdWxkIGJlIHJlbW92ZWQgYXMgdGhleVxuICAgICAgICAgIC8vIGFyZSBub3QgYWxsb3dlZCB0byBiZSB1c2VkIGluIHRoZSBkZXN0aW5hdGlvblxuICAgICAgICAgIGlmICh0eXBlb2Yga2V5Lm5hbWUgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICBkZWxldGUgKHJlcy5wYXJhbXMgYXMgYW55KVtrZXkubmFtZV1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHsgLi4ucGFyYW1zLCAuLi5yZXMucGFyYW1zIH1cbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IEluY29taW5nTWVzc2FnZSB9IGZyb20gJ2h0dHAnXG5pbXBvcnQgeyBQYXJzZWRVcmxRdWVyeSB9IGZyb20gJ3F1ZXJ5c3RyaW5nJ1xuaW1wb3J0IHsgc2VhcmNoUGFyYW1zVG9VcmxRdWVyeSB9IGZyb20gJy4vcXVlcnlzdHJpbmcnXG5pbXBvcnQgeyBwYXJzZVJlbGF0aXZlVXJsIH0gZnJvbSAnLi9wYXJzZS1yZWxhdGl2ZS11cmwnXG5pbXBvcnQgKiBhcyBwYXRoVG9SZWdleHAgZnJvbSAnbmV4dC9kaXN0L2NvbXBpbGVkL3BhdGgtdG8tcmVnZXhwJ1xuaW1wb3J0IHsgUm91dGVIYXMgfSBmcm9tICcuLi8uLi8uLi8uLi9saWIvbG9hZC1jdXN0b20tcm91dGVzJ1xuXG50eXBlIFBhcmFtcyA9IHsgW3BhcmFtOiBzdHJpbmddOiBhbnkgfVxuXG4vLyBlbnN1cmUgb25seSBhLXpBLVogYXJlIHVzZWQgZm9yIHBhcmFtIG5hbWVzIGZvciBwcm9wZXIgaW50ZXJwb2xhdGluZ1xuLy8gd2l0aCBwYXRoLXRvLXJlZ2V4cFxuZXhwb3J0IGNvbnN0IGdldFNhZmVQYXJhbU5hbWUgPSAocGFyYW1OYW1lOiBzdHJpbmcpID0+IHtcbiAgbGV0IG5ld1BhcmFtTmFtZSA9ICcnXG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXJhbU5hbWUubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBjaGFyQ29kZSA9IHBhcmFtTmFtZS5jaGFyQ29kZUF0KGkpXG5cbiAgICBpZiAoXG4gICAgICAoY2hhckNvZGUgPiA2NCAmJiBjaGFyQ29kZSA8IDkxKSB8fCAvLyBBLVpcbiAgICAgIChjaGFyQ29kZSA+IDk2ICYmIGNoYXJDb2RlIDwgMTIzKSAvLyBhLXpcbiAgICApIHtcbiAgICAgIG5ld1BhcmFtTmFtZSArPSBwYXJhbU5hbWVbaV1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIG5ld1BhcmFtTmFtZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbWF0Y2hIYXMoXG4gIHJlcTogSW5jb21pbmdNZXNzYWdlLFxuICBoYXM6IFJvdXRlSGFzW10sXG4gIHF1ZXJ5OiBQYXJhbXNcbik6IGZhbHNlIHwgUGFyYW1zIHtcbiAgY29uc3QgcGFyYW1zOiBQYXJhbXMgPSB7fVxuICBjb25zdCBhbGxNYXRjaCA9IGhhcy5ldmVyeSgoaGFzSXRlbSkgPT4ge1xuICAgIGxldCB2YWx1ZTogdW5kZWZpbmVkIHwgc3RyaW5nXG4gICAgbGV0IGtleSA9IGhhc0l0ZW0ua2V5XG5cbiAgICBzd2l0Y2ggKGhhc0l0ZW0udHlwZSkge1xuICAgICAgY2FzZSAnaGVhZGVyJzoge1xuICAgICAgICBrZXkgPSBrZXkhLnRvTG93ZXJDYXNlKClcbiAgICAgICAgdmFsdWUgPSByZXEuaGVhZGVyc1trZXldIGFzIHN0cmluZ1xuICAgICAgICBicmVha1xuICAgICAgfVxuICAgICAgY2FzZSAnY29va2llJzoge1xuICAgICAgICB2YWx1ZSA9IChyZXEgYXMgYW55KS5jb29raWVzW2hhc0l0ZW0ua2V5XVxuICAgICAgICBicmVha1xuICAgICAgfVxuICAgICAgY2FzZSAncXVlcnknOiB7XG4gICAgICAgIHZhbHVlID0gcXVlcnlba2V5IV1cbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICAgIGNhc2UgJ2hvc3QnOiB7XG4gICAgICAgIGNvbnN0IHsgaG9zdCB9ID0gcmVxPy5oZWFkZXJzIHx8IHt9XG4gICAgICAgIC8vIHJlbW92ZSBwb3J0IGZyb20gaG9zdCBpZiBwcmVzZW50XG4gICAgICAgIGNvbnN0IGhvc3RuYW1lID0gaG9zdD8uc3BsaXQoJzonKVswXS50b0xvd2VyQ2FzZSgpXG4gICAgICAgIHZhbHVlID0gaG9zdG5hbWVcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIWhhc0l0ZW0udmFsdWUgJiYgdmFsdWUpIHtcbiAgICAgIHBhcmFtc1tnZXRTYWZlUGFyYW1OYW1lKGtleSEpXSA9IHZhbHVlXG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH0gZWxzZSBpZiAodmFsdWUpIHtcbiAgICAgIGNvbnN0IG1hdGNoZXIgPSBuZXcgUmVnRXhwKGBeJHtoYXNJdGVtLnZhbHVlfSRgKVxuICAgICAgY29uc3QgbWF0Y2hlcyA9IHZhbHVlLm1hdGNoKG1hdGNoZXIpXG5cbiAgICAgIGlmIChtYXRjaGVzKSB7XG4gICAgICAgIGlmIChtYXRjaGVzLmdyb3Vwcykge1xuICAgICAgICAgIE9iamVjdC5rZXlzKG1hdGNoZXMuZ3JvdXBzKS5mb3JFYWNoKChncm91cEtleSkgPT4ge1xuICAgICAgICAgICAgcGFyYW1zW2dyb3VwS2V5XSA9IG1hdGNoZXMuZ3JvdXBzIVtncm91cEtleV1cbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2UgaWYgKGhhc0l0ZW0udHlwZSA9PT0gJ2hvc3QnICYmIG1hdGNoZXNbMF0pIHtcbiAgICAgICAgICBwYXJhbXMuaG9zdCA9IG1hdGNoZXNbMF1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2VcbiAgfSlcblxuICBpZiAoYWxsTWF0Y2gpIHtcbiAgICByZXR1cm4gcGFyYW1zXG4gIH1cbiAgcmV0dXJuIGZhbHNlXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb21waWxlTm9uUGF0aCh2YWx1ZTogc3RyaW5nLCBwYXJhbXM6IFBhcmFtcyk6IHN0cmluZyB7XG4gIGlmICghdmFsdWUuaW5jbHVkZXMoJzonKSkge1xuICAgIHJldHVybiB2YWx1ZVxuICB9XG5cbiAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMocGFyYW1zKSkge1xuICAgIGlmICh2YWx1ZS5pbmNsdWRlcyhgOiR7a2V5fWApKSB7XG4gICAgICB2YWx1ZSA9IHZhbHVlXG4gICAgICAgIC5yZXBsYWNlKFxuICAgICAgICAgIG5ldyBSZWdFeHAoYDoke2tleX1cXFxcKmAsICdnJyksXG4gICAgICAgICAgYDoke2tleX0tLUVTQ0FQRURfUEFSQU1fQVNURVJJU0tTYFxuICAgICAgICApXG4gICAgICAgIC5yZXBsYWNlKFxuICAgICAgICAgIG5ldyBSZWdFeHAoYDoke2tleX1cXFxcP2AsICdnJyksXG4gICAgICAgICAgYDoke2tleX0tLUVTQ0FQRURfUEFSQU1fUVVFU1RJT05gXG4gICAgICAgIClcbiAgICAgICAgLnJlcGxhY2UobmV3IFJlZ0V4cChgOiR7a2V5fVxcXFwrYCwgJ2cnKSwgYDoke2tleX0tLUVTQ0FQRURfUEFSQU1fUExVU2ApXG4gICAgICAgIC5yZXBsYWNlKFxuICAgICAgICAgIG5ldyBSZWdFeHAoYDoke2tleX0oPyFcXFxcdylgLCAnZycpLFxuICAgICAgICAgIGAtLUVTQ0FQRURfUEFSQU1fQ09MT04ke2tleX1gXG4gICAgICAgIClcbiAgICB9XG4gIH1cbiAgdmFsdWUgPSB2YWx1ZVxuICAgIC5yZXBsYWNlKC8oOnxcXCp8XFw/fFxcK3xcXCh8XFwpfFxce3xcXH0pL2csICdcXFxcJDEnKVxuICAgIC5yZXBsYWNlKC8tLUVTQ0FQRURfUEFSQU1fUExVUy9nLCAnKycpXG4gICAgLnJlcGxhY2UoLy0tRVNDQVBFRF9QQVJBTV9DT0xPTi9nLCAnOicpXG4gICAgLnJlcGxhY2UoLy0tRVNDQVBFRF9QQVJBTV9RVUVTVElPTi9nLCAnPycpXG4gICAgLnJlcGxhY2UoLy0tRVNDQVBFRF9QQVJBTV9BU1RFUklTS1MvZywgJyonKVxuXG4gIC8vIHRoZSB2YWx1ZSBuZWVkcyB0byBzdGFydCB3aXRoIGEgZm9yd2FyZC1zbGFzaCB0byBiZSBjb21waWxlZFxuICAvLyBjb3JyZWN0bHlcbiAgcmV0dXJuIHBhdGhUb1JlZ2V4cFxuICAgIC5jb21waWxlKGAvJHt2YWx1ZX1gLCB7IHZhbGlkYXRlOiBmYWxzZSB9KShwYXJhbXMpXG4gICAgLnN1YnN0cigxKVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwcmVwYXJlRGVzdGluYXRpb24oXG4gIGRlc3RpbmF0aW9uOiBzdHJpbmcsXG4gIHBhcmFtczogUGFyYW1zLFxuICBxdWVyeTogUGFyc2VkVXJsUXVlcnksXG4gIGFwcGVuZFBhcmFtc1RvUXVlcnk6IGJvb2xlYW5cbikge1xuICBsZXQgcGFyc2VkRGVzdGluYXRpb246IHtcbiAgICBxdWVyeT86IFBhcnNlZFVybFF1ZXJ5XG4gICAgcHJvdG9jb2w/OiBzdHJpbmdcbiAgICBob3N0bmFtZT86IHN0cmluZ1xuICAgIHBvcnQ/OiBzdHJpbmdcbiAgfSAmIFJldHVyblR5cGU8dHlwZW9mIHBhcnNlUmVsYXRpdmVVcmw+ID0ge30gYXMgYW55XG5cbiAgLy8gY2xvbmUgcXVlcnkgc28gd2UgZG9uJ3QgbW9kaWZ5IHRoZSBvcmlnaW5hbFxuICBxdWVyeSA9IE9iamVjdC5hc3NpZ24oe30sIHF1ZXJ5KVxuICBjb25zdCBoYWRMb2NhbGUgPSBxdWVyeS5fX25leHRMb2NhbGVcbiAgZGVsZXRlIHF1ZXJ5Ll9fbmV4dExvY2FsZVxuICBkZWxldGUgcXVlcnkuX19uZXh0RGVmYXVsdExvY2FsZVxuXG4gIGlmIChkZXN0aW5hdGlvbi5zdGFydHNXaXRoKCcvJykpIHtcbiAgICBwYXJzZWREZXN0aW5hdGlvbiA9IHBhcnNlUmVsYXRpdmVVcmwoZGVzdGluYXRpb24pXG4gIH0gZWxzZSB7XG4gICAgY29uc3Qge1xuICAgICAgcGF0aG5hbWUsXG4gICAgICBzZWFyY2hQYXJhbXMsXG4gICAgICBoYXNoLFxuICAgICAgaG9zdG5hbWUsXG4gICAgICBwb3J0LFxuICAgICAgcHJvdG9jb2wsXG4gICAgICBzZWFyY2gsXG4gICAgICBocmVmLFxuICAgIH0gPSBuZXcgVVJMKGRlc3RpbmF0aW9uKVxuXG4gICAgcGFyc2VkRGVzdGluYXRpb24gPSB7XG4gICAgICBwYXRobmFtZSxcbiAgICAgIHF1ZXJ5OiBzZWFyY2hQYXJhbXNUb1VybFF1ZXJ5KHNlYXJjaFBhcmFtcyksXG4gICAgICBoYXNoLFxuICAgICAgcHJvdG9jb2wsXG4gICAgICBob3N0bmFtZSxcbiAgICAgIHBvcnQsXG4gICAgICBzZWFyY2gsXG4gICAgICBocmVmLFxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGRlc3RRdWVyeSA9IHBhcnNlZERlc3RpbmF0aW9uLnF1ZXJ5XG4gIGNvbnN0IGRlc3RQYXRoID0gYCR7cGFyc2VkRGVzdGluYXRpb24ucGF0aG5hbWUhfSR7XG4gICAgcGFyc2VkRGVzdGluYXRpb24uaGFzaCB8fCAnJ1xuICB9YFxuICBjb25zdCBkZXN0UGF0aFBhcmFtS2V5czogcGF0aFRvUmVnZXhwLktleVtdID0gW11cbiAgcGF0aFRvUmVnZXhwLnBhdGhUb1JlZ2V4cChkZXN0UGF0aCwgZGVzdFBhdGhQYXJhbUtleXMpXG5cbiAgY29uc3QgZGVzdFBhdGhQYXJhbXMgPSBkZXN0UGF0aFBhcmFtS2V5cy5tYXAoKGtleSkgPT4ga2V5Lm5hbWUpXG5cbiAgbGV0IGRlc3RpbmF0aW9uQ29tcGlsZXIgPSBwYXRoVG9SZWdleHAuY29tcGlsZShcbiAgICBkZXN0UGF0aCxcbiAgICAvLyB3ZSBkb24ndCB2YWxpZGF0ZSB3aGlsZSBjb21waWxpbmcgdGhlIGRlc3RpbmF0aW9uIHNpbmNlIHdlIHNob3VsZFxuICAgIC8vIGhhdmUgYWxyZWFkeSB2YWxpZGF0ZWQgYmVmb3JlIHdlIGdvdCB0byB0aGlzIHBvaW50IGFuZCB2YWxpZGF0aW5nXG4gICAgLy8gYnJlYWtzIGNvbXBpbGluZyBkZXN0aW5hdGlvbnMgd2l0aCBuYW1lZCBwYXR0ZXJuIHBhcmFtcyBmcm9tIHRoZSBzb3VyY2VcbiAgICAvLyBlLmcuIC9zb21ldGhpbmc6aGVsbG8oLiopIC0+IC9hbm90aGVyLzpoZWxsbyBpcyBicm9rZW4gd2l0aCB2YWxpZGF0aW9uXG4gICAgLy8gc2luY2UgY29tcGlsZSB2YWxpZGF0aW9uIGlzIG1lYW50IGZvciByZXZlcnNpbmcgYW5kIG5vdCBmb3IgaW5zZXJ0aW5nXG4gICAgLy8gcGFyYW1zIGZyb20gYSBzZXBhcmF0ZSBwYXRoLXJlZ2V4IGludG8gYW5vdGhlclxuICAgIHsgdmFsaWRhdGU6IGZhbHNlIH1cbiAgKVxuICBsZXQgbmV3VXJsXG5cbiAgLy8gdXBkYXRlIGFueSBwYXJhbXMgaW4gcXVlcnkgdmFsdWVzXG4gIGZvciAoY29uc3QgW2tleSwgc3RyT3JBcnJheV0gb2YgT2JqZWN0LmVudHJpZXMoZGVzdFF1ZXJ5KSkge1xuICAgIGxldCB2YWx1ZSA9IEFycmF5LmlzQXJyYXkoc3RyT3JBcnJheSkgPyBzdHJPckFycmF5WzBdIDogc3RyT3JBcnJheVxuICAgIGlmICh2YWx1ZSkge1xuICAgICAgLy8gdGhlIHZhbHVlIG5lZWRzIHRvIHN0YXJ0IHdpdGggYSBmb3J3YXJkLXNsYXNoIHRvIGJlIGNvbXBpbGVkXG4gICAgICAvLyBjb3JyZWN0bHlcbiAgICAgIHZhbHVlID0gY29tcGlsZU5vblBhdGgodmFsdWUsIHBhcmFtcylcbiAgICB9XG4gICAgZGVzdFF1ZXJ5W2tleV0gPSB2YWx1ZVxuICB9XG5cbiAgLy8gYWRkIHBhdGggcGFyYW1zIHRvIHF1ZXJ5IGlmIGl0J3Mgbm90IGEgcmVkaXJlY3QgYW5kIG5vdFxuICAvLyBhbHJlYWR5IGRlZmluZWQgaW4gZGVzdGluYXRpb24gcXVlcnkgb3IgcGF0aFxuICBsZXQgcGFyYW1LZXlzID0gT2JqZWN0LmtleXMocGFyYW1zKVxuXG4gIC8vIHJlbW92ZSBpbnRlcm5hbCBwYXJhbSBmb3IgaTE4blxuICBpZiAoaGFkTG9jYWxlKSB7XG4gICAgcGFyYW1LZXlzID0gcGFyYW1LZXlzLmZpbHRlcigobmFtZSkgPT4gbmFtZSAhPT0gJ25leHRJbnRlcm5hbExvY2FsZScpXG4gIH1cblxuICBpZiAoXG4gICAgYXBwZW5kUGFyYW1zVG9RdWVyeSAmJlxuICAgICFwYXJhbUtleXMuc29tZSgoa2V5KSA9PiBkZXN0UGF0aFBhcmFtcy5pbmNsdWRlcyhrZXkpKVxuICApIHtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBwYXJhbUtleXMpIHtcbiAgICAgIGlmICghKGtleSBpbiBkZXN0UXVlcnkpKSB7XG4gICAgICAgIGRlc3RRdWVyeVtrZXldID0gcGFyYW1zW2tleV1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB0cnkge1xuICAgIG5ld1VybCA9IGRlc3RpbmF0aW9uQ29tcGlsZXIocGFyYW1zKVxuXG4gICAgY29uc3QgW3BhdGhuYW1lLCBoYXNoXSA9IG5ld1VybC5zcGxpdCgnIycpXG4gICAgcGFyc2VkRGVzdGluYXRpb24ucGF0aG5hbWUgPSBwYXRobmFtZVxuICAgIHBhcnNlZERlc3RpbmF0aW9uLmhhc2ggPSBgJHtoYXNoID8gJyMnIDogJyd9JHtoYXNoIHx8ICcnfWBcbiAgICBkZWxldGUgKHBhcnNlZERlc3RpbmF0aW9uIGFzIGFueSkuc2VhcmNoXG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGlmIChlcnIubWVzc2FnZS5tYXRjaCgvRXhwZWN0ZWQgLio/IHRvIG5vdCByZXBlYXQsIGJ1dCBnb3QgYW4gYXJyYXkvKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgVG8gdXNlIGEgbXVsdGktbWF0Y2ggaW4gdGhlIGRlc3RpbmF0aW9uIHlvdSBtdXN0IGFkZCBcXGAqXFxgIGF0IHRoZSBlbmQgb2YgdGhlIHBhcmFtIG5hbWUgdG8gc2lnbmlmeSBpdCBzaG91bGQgcmVwZWF0LiBodHRwczovL25leHRqcy5vcmcvZG9jcy9tZXNzYWdlcy9pbnZhbGlkLW11bHRpLW1hdGNoYFxuICAgICAgKVxuICAgIH1cbiAgICB0aHJvdyBlcnJcbiAgfVxuXG4gIC8vIFF1ZXJ5IG1lcmdlIG9yZGVyIGxvd2VzdCBwcmlvcml0eSB0byBoaWdoZXN0XG4gIC8vIDEuIGluaXRpYWwgVVJMIHF1ZXJ5IHZhbHVlc1xuICAvLyAyLiBwYXRoIHNlZ21lbnQgdmFsdWVzXG4gIC8vIDMuIGRlc3RpbmF0aW9uIHNwZWNpZmllZCBxdWVyeSB2YWx1ZXNcbiAgcGFyc2VkRGVzdGluYXRpb24ucXVlcnkgPSB7XG4gICAgLi4ucXVlcnksXG4gICAgLi4ucGFyc2VkRGVzdGluYXRpb24ucXVlcnksXG4gIH1cblxuICByZXR1cm4ge1xuICAgIG5ld1VybCxcbiAgICBwYXJzZWREZXN0aW5hdGlvbixcbiAgfVxufVxuIiwiaW1wb3J0IHsgUGFyc2VkVXJsUXVlcnkgfSBmcm9tICdxdWVyeXN0cmluZydcblxuZXhwb3J0IGZ1bmN0aW9uIHNlYXJjaFBhcmFtc1RvVXJsUXVlcnkoXG4gIHNlYXJjaFBhcmFtczogVVJMU2VhcmNoUGFyYW1zXG4pOiBQYXJzZWRVcmxRdWVyeSB7XG4gIGNvbnN0IHF1ZXJ5OiBQYXJzZWRVcmxRdWVyeSA9IHt9XG4gIHNlYXJjaFBhcmFtcy5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgaWYgKHR5cGVvZiBxdWVyeVtrZXldID09PSAndW5kZWZpbmVkJykge1xuICAgICAgcXVlcnlba2V5XSA9IHZhbHVlXG4gICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHF1ZXJ5W2tleV0pKSB7XG4gICAgICA7KHF1ZXJ5W2tleV0gYXMgc3RyaW5nW10pLnB1c2godmFsdWUpXG4gICAgfSBlbHNlIHtcbiAgICAgIHF1ZXJ5W2tleV0gPSBbcXVlcnlba2V5XSBhcyBzdHJpbmcsIHZhbHVlXVxuICAgIH1cbiAgfSlcbiAgcmV0dXJuIHF1ZXJ5XG59XG5cbmZ1bmN0aW9uIHN0cmluZ2lmeVVybFF1ZXJ5UGFyYW0ocGFyYW06IHN0cmluZyk6IHN0cmluZyB7XG4gIGlmIChcbiAgICB0eXBlb2YgcGFyYW0gPT09ICdzdHJpbmcnIHx8XG4gICAgKHR5cGVvZiBwYXJhbSA9PT0gJ251bWJlcicgJiYgIWlzTmFOKHBhcmFtKSkgfHxcbiAgICB0eXBlb2YgcGFyYW0gPT09ICdib29sZWFuJ1xuICApIHtcbiAgICByZXR1cm4gU3RyaW5nKHBhcmFtKVxuICB9IGVsc2Uge1xuICAgIHJldHVybiAnJ1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1cmxRdWVyeVRvU2VhcmNoUGFyYW1zKFxuICB1cmxRdWVyeTogUGFyc2VkVXJsUXVlcnlcbik6IFVSTFNlYXJjaFBhcmFtcyB7XG4gIGNvbnN0IHJlc3VsdCA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoKVxuICBPYmplY3QuZW50cmllcyh1cmxRdWVyeSkuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICB2YWx1ZS5mb3JFYWNoKChpdGVtKSA9PiByZXN1bHQuYXBwZW5kKGtleSwgc3RyaW5naWZ5VXJsUXVlcnlQYXJhbShpdGVtKSkpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdC5zZXQoa2V5LCBzdHJpbmdpZnlVcmxRdWVyeVBhcmFtKHZhbHVlKSlcbiAgICB9XG4gIH0pXG4gIHJldHVybiByZXN1bHRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFzc2lnbihcbiAgdGFyZ2V0OiBVUkxTZWFyY2hQYXJhbXMsXG4gIC4uLnNlYXJjaFBhcmFtc0xpc3Q6IFVSTFNlYXJjaFBhcmFtc1tdXG4pOiBVUkxTZWFyY2hQYXJhbXMge1xuICBzZWFyY2hQYXJhbXNMaXN0LmZvckVhY2goKHNlYXJjaFBhcmFtcykgPT4ge1xuICAgIEFycmF5LmZyb20oc2VhcmNoUGFyYW1zLmtleXMoKSkuZm9yRWFjaCgoa2V5KSA9PiB0YXJnZXQuZGVsZXRlKGtleSkpXG4gICAgc2VhcmNoUGFyYW1zLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHRhcmdldC5hcHBlbmQoa2V5LCB2YWx1ZSkpXG4gIH0pXG4gIHJldHVybiB0YXJnZXRcbn1cbiIsImltcG9ydCB7IFBhcnNlZFVybFF1ZXJ5IH0gZnJvbSAncXVlcnlzdHJpbmcnXG5pbXBvcnQgcGF0aE1hdGNoIGZyb20gJy4vcGF0aC1tYXRjaCdcbmltcG9ydCBwcmVwYXJlRGVzdGluYXRpb24sIHsgbWF0Y2hIYXMgfSBmcm9tICcuL3ByZXBhcmUtZGVzdGluYXRpb24nXG5pbXBvcnQgeyBSZXdyaXRlIH0gZnJvbSAnLi4vLi4vLi4vLi4vbGliL2xvYWQtY3VzdG9tLXJvdXRlcydcbmltcG9ydCB7IHJlbW92ZVBhdGhUcmFpbGluZ1NsYXNoIH0gZnJvbSAnLi4vLi4vLi4vLi4vY2xpZW50L25vcm1hbGl6ZS10cmFpbGluZy1zbGFzaCdcbmltcG9ydCB7IG5vcm1hbGl6ZUxvY2FsZVBhdGggfSBmcm9tICcuLi8uLi9pMThuL25vcm1hbGl6ZS1sb2NhbGUtcGF0aCdcbmltcG9ydCB7IHBhcnNlUmVsYXRpdmVVcmwgfSBmcm9tICcuL3BhcnNlLXJlbGF0aXZlLXVybCdcbmltcG9ydCB7IGRlbEJhc2VQYXRoIH0gZnJvbSAnLi4vcm91dGVyJ1xuXG5jb25zdCBjdXN0b21Sb3V0ZU1hdGNoZXIgPSBwYXRoTWF0Y2godHJ1ZSlcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVzb2x2ZVJld3JpdGVzKFxuICBhc1BhdGg6IHN0cmluZyxcbiAgcGFnZXM6IHN0cmluZ1tdLFxuICByZXdyaXRlczoge1xuICAgIGJlZm9yZUZpbGVzOiBSZXdyaXRlW11cbiAgICBhZnRlckZpbGVzOiBSZXdyaXRlW11cbiAgICBmYWxsYmFjazogUmV3cml0ZVtdXG4gIH0sXG4gIHF1ZXJ5OiBQYXJzZWRVcmxRdWVyeSxcbiAgcmVzb2x2ZUhyZWY6IChwYXRoOiBzdHJpbmcpID0+IHN0cmluZyxcbiAgbG9jYWxlcz86IHN0cmluZ1tdXG4pOiB7XG4gIG1hdGNoZWRQYWdlOiBib29sZWFuXG4gIHBhcnNlZEFzOiBSZXR1cm5UeXBlPHR5cGVvZiBwYXJzZVJlbGF0aXZlVXJsPlxuICBhc1BhdGg6IHN0cmluZ1xuICByZXNvbHZlZEhyZWY/OiBzdHJpbmdcbn0ge1xuICBsZXQgbWF0Y2hlZFBhZ2UgPSBmYWxzZVxuICBsZXQgcGFyc2VkQXMgPSBwYXJzZVJlbGF0aXZlVXJsKGFzUGF0aClcbiAgbGV0IGZzUGF0aG5hbWUgPSByZW1vdmVQYXRoVHJhaWxpbmdTbGFzaChcbiAgICBub3JtYWxpemVMb2NhbGVQYXRoKGRlbEJhc2VQYXRoKHBhcnNlZEFzLnBhdGhuYW1lKSwgbG9jYWxlcykucGF0aG5hbWVcbiAgKVxuICBsZXQgcmVzb2x2ZWRIcmVmXG5cbiAgY29uc3QgaGFuZGxlUmV3cml0ZSA9IChyZXdyaXRlOiBSZXdyaXRlKSA9PiB7XG4gICAgY29uc3QgbWF0Y2hlciA9IGN1c3RvbVJvdXRlTWF0Y2hlcihyZXdyaXRlLnNvdXJjZSlcbiAgICBsZXQgcGFyYW1zID0gbWF0Y2hlcihwYXJzZWRBcy5wYXRobmFtZSlcblxuICAgIGlmIChyZXdyaXRlLmhhcyAmJiBwYXJhbXMpIHtcbiAgICAgIGNvbnN0IGhhc1BhcmFtcyA9IG1hdGNoSGFzKFxuICAgICAgICB7XG4gICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgaG9zdDogZG9jdW1lbnQubG9jYXRpb24uaG9zdG5hbWUsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBjb29raWVzOiBkb2N1bWVudC5jb29raWVcbiAgICAgICAgICAgIC5zcGxpdCgnOyAnKVxuICAgICAgICAgICAgLnJlZHVjZTxSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+PigoYWNjLCBpdGVtKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IFtrZXksIC4uLnZhbHVlXSA9IGl0ZW0uc3BsaXQoJz0nKVxuICAgICAgICAgICAgICBhY2Nba2V5XSA9IHZhbHVlLmpvaW4oJz0nKVxuICAgICAgICAgICAgICByZXR1cm4gYWNjXG4gICAgICAgICAgICB9LCB7fSksXG4gICAgICAgIH0gYXMgYW55LFxuICAgICAgICByZXdyaXRlLmhhcyxcbiAgICAgICAgcGFyc2VkQXMucXVlcnlcbiAgICAgIClcblxuICAgICAgaWYgKGhhc1BhcmFtcykge1xuICAgICAgICBPYmplY3QuYXNzaWduKHBhcmFtcywgaGFzUGFyYW1zKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFyYW1zID0gZmFsc2VcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocGFyYW1zKSB7XG4gICAgICBpZiAoIXJld3JpdGUuZGVzdGluYXRpb24pIHtcbiAgICAgICAgLy8gdGhpcyBpcyBhIHByb3hpZWQgcmV3cml0ZSB3aGljaCBpc24ndCBoYW5kbGVkIG9uIHRoZSBjbGllbnRcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH1cbiAgICAgIGNvbnN0IGRlc3RSZXMgPSBwcmVwYXJlRGVzdGluYXRpb24oXG4gICAgICAgIHJld3JpdGUuZGVzdGluYXRpb24sXG4gICAgICAgIHBhcmFtcyxcbiAgICAgICAgcXVlcnksXG4gICAgICAgIHRydWVcbiAgICAgIClcbiAgICAgIHBhcnNlZEFzID0gZGVzdFJlcy5wYXJzZWREZXN0aW5hdGlvblxuICAgICAgYXNQYXRoID0gZGVzdFJlcy5uZXdVcmxcbiAgICAgIE9iamVjdC5hc3NpZ24ocXVlcnksIGRlc3RSZXMucGFyc2VkRGVzdGluYXRpb24ucXVlcnkpXG5cbiAgICAgIGZzUGF0aG5hbWUgPSByZW1vdmVQYXRoVHJhaWxpbmdTbGFzaChcbiAgICAgICAgbm9ybWFsaXplTG9jYWxlUGF0aChkZWxCYXNlUGF0aChhc1BhdGgpLCBsb2NhbGVzKS5wYXRobmFtZVxuICAgICAgKVxuXG4gICAgICBpZiAocGFnZXMuaW5jbHVkZXMoZnNQYXRobmFtZSkpIHtcbiAgICAgICAgLy8gY2hlY2sgaWYgd2Ugbm93IG1hdGNoIGEgcGFnZSBhcyB0aGlzIG1lYW5zIHdlIGFyZSBkb25lXG4gICAgICAgIC8vIHJlc29sdmluZyB0aGUgcmV3cml0ZXNcbiAgICAgICAgbWF0Y2hlZFBhZ2UgPSB0cnVlXG4gICAgICAgIHJlc29sdmVkSHJlZiA9IGZzUGF0aG5hbWVcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH1cblxuICAgICAgLy8gY2hlY2sgaWYgd2UgbWF0Y2ggYSBkeW5hbWljLXJvdXRlLCBpZiBzbyB3ZSBicmVhayB0aGUgcmV3cml0ZXMgY2hhaW5cbiAgICAgIHJlc29sdmVkSHJlZiA9IHJlc29sdmVIcmVmKGZzUGF0aG5hbWUpXG5cbiAgICAgIGlmIChyZXNvbHZlZEhyZWYgIT09IGFzUGF0aCAmJiBwYWdlcy5pbmNsdWRlcyhyZXNvbHZlZEhyZWYpKSB7XG4gICAgICAgIG1hdGNoZWRQYWdlID0gdHJ1ZVxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBsZXQgZmluaXNoZWQgPSBmYWxzZVxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcmV3cml0ZXMuYmVmb3JlRmlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAvLyB3ZSBkb24ndCBlbmQgYWZ0ZXIgbWF0Y2ggaW4gYmVmb3JlRmlsZXMgdG8gYWxsb3dcbiAgICAvLyBjb250aW51aW5nIHRocm91Z2ggYWxsIGJlZm9yZUZpbGVzIHJld3JpdGVzXG4gICAgaGFuZGxlUmV3cml0ZShyZXdyaXRlcy5iZWZvcmVGaWxlc1tpXSlcbiAgfVxuICBtYXRjaGVkUGFnZSA9IHBhZ2VzLmluY2x1ZGVzKGZzUGF0aG5hbWUpXG5cbiAgaWYgKCFtYXRjaGVkUGFnZSkge1xuICAgIGlmICghZmluaXNoZWQpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmV3cml0ZXMuYWZ0ZXJGaWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoaGFuZGxlUmV3cml0ZShyZXdyaXRlcy5hZnRlckZpbGVzW2ldKSkge1xuICAgICAgICAgIGZpbmlzaGVkID0gdHJ1ZVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBjaGVjayBkeW5hbWljIHJvdXRlIGJlZm9yZSBwcm9jZXNzaW5nIGZhbGxiYWNrIHJld3JpdGVzXG4gICAgaWYgKCFmaW5pc2hlZCkge1xuICAgICAgcmVzb2x2ZWRIcmVmID0gcmVzb2x2ZUhyZWYoZnNQYXRobmFtZSlcbiAgICAgIG1hdGNoZWRQYWdlID0gcGFnZXMuaW5jbHVkZXMocmVzb2x2ZWRIcmVmKVxuICAgICAgZmluaXNoZWQgPSBtYXRjaGVkUGFnZVxuICAgIH1cblxuICAgIGlmICghZmluaXNoZWQpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmV3cml0ZXMuZmFsbGJhY2subGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGhhbmRsZVJld3JpdGUocmV3cml0ZXMuZmFsbGJhY2tbaV0pKSB7XG4gICAgICAgICAgZmluaXNoZWQgPSB0cnVlXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgYXNQYXRoLFxuICAgIHBhcnNlZEFzLFxuICAgIG1hdGNoZWRQYWdlLFxuICAgIHJlc29sdmVkSHJlZixcbiAgfVxufVxuIiwiaW1wb3J0IHsgZ2V0Um91dGVSZWdleCB9IGZyb20gJy4vcm91dGUtcmVnZXgnXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRSb3V0ZU1hdGNoZXIocm91dGVSZWdleDogUmV0dXJuVHlwZTx0eXBlb2YgZ2V0Um91dGVSZWdleD4pIHtcbiAgY29uc3QgeyByZSwgZ3JvdXBzIH0gPSByb3V0ZVJlZ2V4XG4gIHJldHVybiAocGF0aG5hbWU6IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQpID0+IHtcbiAgICBjb25zdCByb3V0ZU1hdGNoID0gcmUuZXhlYyhwYXRobmFtZSEpXG4gICAgaWYgKCFyb3V0ZU1hdGNoKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICBjb25zdCBkZWNvZGUgPSAocGFyYW06IHN0cmluZykgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChwYXJhbSlcbiAgICAgIH0gY2F0Y2ggKF8pIHtcbiAgICAgICAgY29uc3QgZXJyOiBFcnJvciAmIHsgY29kZT86IHN0cmluZyB9ID0gbmV3IEVycm9yKFxuICAgICAgICAgICdmYWlsZWQgdG8gZGVjb2RlIHBhcmFtJ1xuICAgICAgICApXG4gICAgICAgIGVyci5jb2RlID0gJ0RFQ09ERV9GQUlMRUQnXG4gICAgICAgIHRocm93IGVyclxuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBwYXJhbXM6IHsgW3BhcmFtTmFtZTogc3RyaW5nXTogc3RyaW5nIHwgc3RyaW5nW10gfSA9IHt9XG5cbiAgICBPYmplY3Qua2V5cyhncm91cHMpLmZvckVhY2goKHNsdWdOYW1lOiBzdHJpbmcpID0+IHtcbiAgICAgIGNvbnN0IGcgPSBncm91cHNbc2x1Z05hbWVdXG4gICAgICBjb25zdCBtID0gcm91dGVNYXRjaFtnLnBvc11cbiAgICAgIGlmIChtICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcGFyYW1zW3NsdWdOYW1lXSA9IH5tLmluZGV4T2YoJy8nKVxuICAgICAgICAgID8gbS5zcGxpdCgnLycpLm1hcCgoZW50cnkpID0+IGRlY29kZShlbnRyeSkpXG4gICAgICAgICAgOiBnLnJlcGVhdFxuICAgICAgICAgID8gW2RlY29kZShtKV1cbiAgICAgICAgICA6IGRlY29kZShtKVxuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIHBhcmFtc1xuICB9XG59XG4iLCJleHBvcnQgaW50ZXJmYWNlIEdyb3VwIHtcbiAgcG9zOiBudW1iZXJcbiAgcmVwZWF0OiBib29sZWFuXG4gIG9wdGlvbmFsOiBib29sZWFuXG59XG5cbi8vIHRoaXMgaXNuJ3QgaW1wb3J0aW5nIHRoZSBlc2NhcGUtc3RyaW5nLXJlZ2V4IG1vZHVsZVxuLy8gdG8gcmVkdWNlIGJ5dGVzXG5mdW5jdGlvbiBlc2NhcGVSZWdleChzdHI6IHN0cmluZykge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoL1t8XFxcXHt9KClbXFxdXiQrKj8uLV0vZywgJ1xcXFwkJicpXG59XG5cbmZ1bmN0aW9uIHBhcnNlUGFyYW1ldGVyKHBhcmFtOiBzdHJpbmcpIHtcbiAgY29uc3Qgb3B0aW9uYWwgPSBwYXJhbS5zdGFydHNXaXRoKCdbJykgJiYgcGFyYW0uZW5kc1dpdGgoJ10nKVxuICBpZiAob3B0aW9uYWwpIHtcbiAgICBwYXJhbSA9IHBhcmFtLnNsaWNlKDEsIC0xKVxuICB9XG4gIGNvbnN0IHJlcGVhdCA9IHBhcmFtLnN0YXJ0c1dpdGgoJy4uLicpXG4gIGlmIChyZXBlYXQpIHtcbiAgICBwYXJhbSA9IHBhcmFtLnNsaWNlKDMpXG4gIH1cbiAgcmV0dXJuIHsga2V5OiBwYXJhbSwgcmVwZWF0LCBvcHRpb25hbCB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRSb3V0ZVJlZ2V4KFxuICBub3JtYWxpemVkUm91dGU6IHN0cmluZ1xuKToge1xuICByZTogUmVnRXhwXG4gIG5hbWVkUmVnZXg/OiBzdHJpbmdcbiAgcm91dGVLZXlzPzogeyBbbmFtZWQ6IHN0cmluZ106IHN0cmluZyB9XG4gIGdyb3VwczogeyBbZ3JvdXBOYW1lOiBzdHJpbmddOiBHcm91cCB9XG59IHtcbiAgY29uc3Qgc2VnbWVudHMgPSAobm9ybWFsaXplZFJvdXRlLnJlcGxhY2UoL1xcLyQvLCAnJykgfHwgJy8nKVxuICAgIC5zbGljZSgxKVxuICAgIC5zcGxpdCgnLycpXG5cbiAgY29uc3QgZ3JvdXBzOiB7IFtncm91cE5hbWU6IHN0cmluZ106IEdyb3VwIH0gPSB7fVxuICBsZXQgZ3JvdXBJbmRleCA9IDFcbiAgY29uc3QgcGFyYW1ldGVyaXplZFJvdXRlID0gc2VnbWVudHNcbiAgICAubWFwKChzZWdtZW50KSA9PiB7XG4gICAgICBpZiAoc2VnbWVudC5zdGFydHNXaXRoKCdbJykgJiYgc2VnbWVudC5lbmRzV2l0aCgnXScpKSB7XG4gICAgICAgIGNvbnN0IHsga2V5LCBvcHRpb25hbCwgcmVwZWF0IH0gPSBwYXJzZVBhcmFtZXRlcihzZWdtZW50LnNsaWNlKDEsIC0xKSlcbiAgICAgICAgZ3JvdXBzW2tleV0gPSB7IHBvczogZ3JvdXBJbmRleCsrLCByZXBlYXQsIG9wdGlvbmFsIH1cbiAgICAgICAgcmV0dXJuIHJlcGVhdCA/IChvcHRpb25hbCA/ICcoPzovKC4rPykpPycgOiAnLyguKz8pJykgOiAnLyhbXi9dKz8pJ1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGAvJHtlc2NhcGVSZWdleChzZWdtZW50KX1gXG4gICAgICB9XG4gICAgfSlcbiAgICAuam9pbignJylcblxuICAvLyBkZWFkIGNvZGUgZWxpbWluYXRlIGZvciBicm93c2VyIHNpbmNlIGl0J3Mgb25seSBuZWVkZWRcbiAgLy8gd2hpbGUgZ2VuZXJhdGluZyByb3V0ZXMtbWFuaWZlc3RcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgbGV0IHJvdXRlS2V5Q2hhckNvZGUgPSA5N1xuICAgIGxldCByb3V0ZUtleUNoYXJMZW5ndGggPSAxXG5cbiAgICAvLyBidWlsZHMgYSBtaW5pbWFsIHJvdXRlS2V5IHVzaW5nIG9ubHkgYS16IGFuZCBtaW5pbWFsIG51bWJlciBvZiBjaGFyYWN0ZXJzXG4gICAgY29uc3QgZ2V0U2FmZVJvdXRlS2V5ID0gKCkgPT4ge1xuICAgICAgbGV0IHJvdXRlS2V5ID0gJydcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByb3V0ZUtleUNoYXJMZW5ndGg7IGkrKykge1xuICAgICAgICByb3V0ZUtleSArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKHJvdXRlS2V5Q2hhckNvZGUpXG4gICAgICAgIHJvdXRlS2V5Q2hhckNvZGUrK1xuXG4gICAgICAgIGlmIChyb3V0ZUtleUNoYXJDb2RlID4gMTIyKSB7XG4gICAgICAgICAgcm91dGVLZXlDaGFyTGVuZ3RoKytcbiAgICAgICAgICByb3V0ZUtleUNoYXJDb2RlID0gOTdcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJvdXRlS2V5XG4gICAgfVxuXG4gICAgY29uc3Qgcm91dGVLZXlzOiB7IFtuYW1lZDogc3RyaW5nXTogc3RyaW5nIH0gPSB7fVxuXG4gICAgbGV0IG5hbWVkUGFyYW1ldGVyaXplZFJvdXRlID0gc2VnbWVudHNcbiAgICAgIC5tYXAoKHNlZ21lbnQpID0+IHtcbiAgICAgICAgaWYgKHNlZ21lbnQuc3RhcnRzV2l0aCgnWycpICYmIHNlZ21lbnQuZW5kc1dpdGgoJ10nKSkge1xuICAgICAgICAgIGNvbnN0IHsga2V5LCBvcHRpb25hbCwgcmVwZWF0IH0gPSBwYXJzZVBhcmFtZXRlcihzZWdtZW50LnNsaWNlKDEsIC0xKSlcbiAgICAgICAgICAvLyByZXBsYWNlIGFueSBub24td29yZCBjaGFyYWN0ZXJzIHNpbmNlIHRoZXkgY2FuIGJyZWFrXG4gICAgICAgICAgLy8gdGhlIG5hbWVkIHJlZ2V4XG4gICAgICAgICAgbGV0IGNsZWFuZWRLZXkgPSBrZXkucmVwbGFjZSgvXFxXL2csICcnKVxuICAgICAgICAgIGxldCBpbnZhbGlkS2V5ID0gZmFsc2VcblxuICAgICAgICAgIC8vIGNoZWNrIGlmIHRoZSBrZXkgaXMgc3RpbGwgaW52YWxpZCBhbmQgZmFsbGJhY2sgdG8gdXNpbmcgYSBrbm93blxuICAgICAgICAgIC8vIHNhZmUga2V5XG4gICAgICAgICAgaWYgKGNsZWFuZWRLZXkubGVuZ3RoID09PSAwIHx8IGNsZWFuZWRLZXkubGVuZ3RoID4gMzApIHtcbiAgICAgICAgICAgIGludmFsaWRLZXkgPSB0cnVlXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghaXNOYU4ocGFyc2VJbnQoY2xlYW5lZEtleS5zdWJzdHIoMCwgMSkpKSkge1xuICAgICAgICAgICAgaW52YWxpZEtleSA9IHRydWVcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoaW52YWxpZEtleSkge1xuICAgICAgICAgICAgY2xlYW5lZEtleSA9IGdldFNhZmVSb3V0ZUtleSgpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcm91dGVLZXlzW2NsZWFuZWRLZXldID0ga2V5XG4gICAgICAgICAgcmV0dXJuIHJlcGVhdFxuICAgICAgICAgICAgPyBvcHRpb25hbFxuICAgICAgICAgICAgICA/IGAoPzovKD88JHtjbGVhbmVkS2V5fT4uKz8pKT9gXG4gICAgICAgICAgICAgIDogYC8oPzwke2NsZWFuZWRLZXl9Pi4rPylgXG4gICAgICAgICAgICA6IGAvKD88JHtjbGVhbmVkS2V5fT5bXi9dKz8pYFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBgLyR7ZXNjYXBlUmVnZXgoc2VnbWVudCl9YFxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLmpvaW4oJycpXG5cbiAgICByZXR1cm4ge1xuICAgICAgcmU6IG5ldyBSZWdFeHAoYF4ke3BhcmFtZXRlcml6ZWRSb3V0ZX0oPzovKT8kYCksXG4gICAgICBncm91cHMsXG4gICAgICByb3V0ZUtleXMsXG4gICAgICBuYW1lZFJlZ2V4OiBgXiR7bmFtZWRQYXJhbWV0ZXJpemVkUm91dGV9KD86Lyk/JGAsXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICByZTogbmV3IFJlZ0V4cChgXiR7cGFyYW1ldGVyaXplZFJvdXRlfSg/Oi8pPyRgKSxcbiAgICBncm91cHMsXG4gIH1cbn1cbiIsImltcG9ydCB7IEluY29taW5nTWVzc2FnZSwgU2VydmVyUmVzcG9uc2UgfSBmcm9tICdodHRwJ1xuaW1wb3J0IHsgUGFyc2VkVXJsUXVlcnkgfSBmcm9tICdxdWVyeXN0cmluZydcbmltcG9ydCB7IENvbXBvbmVudFR5cGUgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IFVybE9iamVjdCB9IGZyb20gJ3VybCdcbmltcG9ydCB7IGZvcm1hdFVybCB9IGZyb20gJy4vcm91dGVyL3V0aWxzL2Zvcm1hdC11cmwnXG5pbXBvcnQgeyBOZXh0Um91dGVyIH0gZnJvbSAnLi9yb3V0ZXIvcm91dGVyJ1xuaW1wb3J0IHsgRW52IH0gZnJvbSAnQG5leHQvZW52J1xuaW1wb3J0IHsgQnVpbGRNYW5pZmVzdCB9IGZyb20gJy4uL3NlcnZlci9nZXQtcGFnZS1maWxlcydcbmltcG9ydCB7IERvbWFpbkxvY2FsZXMgfSBmcm9tICcuLi9zZXJ2ZXIvY29uZmlnJ1xuaW1wb3J0IHsgUHJldmlld0RhdGEgfSBmcm9tICduZXh0L3R5cGVzJ1xuXG4vKipcbiAqIFR5cGVzIHVzZWQgYnkgYm90aCBuZXh0IGFuZCBuZXh0LXNlcnZlclxuICovXG5cbmV4cG9ydCB0eXBlIE5leHRDb21wb25lbnRUeXBlPFxuICBDIGV4dGVuZHMgQmFzZUNvbnRleHQgPSBOZXh0UGFnZUNvbnRleHQsXG4gIElQID0ge30sXG4gIFAgPSB7fVxuPiA9IENvbXBvbmVudFR5cGU8UD4gJiB7XG4gIC8qKlxuICAgKiBVc2VkIGZvciBpbml0aWFsIHBhZ2UgbG9hZCBkYXRhIHBvcHVsYXRpb24uIERhdGEgcmV0dXJuZWQgZnJvbSBgZ2V0SW5pdGlhbFByb3BzYCBpcyBzZXJpYWxpemVkIHdoZW4gc2VydmVyIHJlbmRlcmVkLlxuICAgKiBNYWtlIHN1cmUgdG8gcmV0dXJuIHBsYWluIGBPYmplY3RgIHdpdGhvdXQgdXNpbmcgYERhdGVgLCBgTWFwYCwgYFNldGAuXG4gICAqIEBwYXJhbSBjdHggQ29udGV4dCBvZiBgcGFnZWBcbiAgICovXG4gIGdldEluaXRpYWxQcm9wcz8oY29udGV4dDogQyk6IElQIHwgUHJvbWlzZTxJUD5cbn1cblxuZXhwb3J0IHR5cGUgRG9jdW1lbnRUeXBlID0gTmV4dENvbXBvbmVudFR5cGU8XG4gIERvY3VtZW50Q29udGV4dCxcbiAgRG9jdW1lbnRJbml0aWFsUHJvcHMsXG4gIERvY3VtZW50UHJvcHNcbj4gJiB7XG4gIHJlbmRlckRvY3VtZW50KFxuICAgIERvY3VtZW50OiBEb2N1bWVudFR5cGUsXG4gICAgcHJvcHM6IERvY3VtZW50UHJvcHNcbiAgKTogUmVhY3QuUmVhY3RFbGVtZW50XG59XG5cbmV4cG9ydCB0eXBlIEFwcFR5cGUgPSBOZXh0Q29tcG9uZW50VHlwZTxcbiAgQXBwQ29udGV4dFR5cGUsXG4gIEFwcEluaXRpYWxQcm9wcyxcbiAgQXBwUHJvcHNUeXBlXG4+XG5cbmV4cG9ydCB0eXBlIEFwcFRyZWVUeXBlID0gQ29tcG9uZW50VHlwZTxcbiAgQXBwSW5pdGlhbFByb3BzICYgeyBbbmFtZTogc3RyaW5nXTogYW55IH1cbj5cblxuLyoqXG4gKiBXZWIgdml0YWxzIHByb3ZpZGVkIHRvIF9hcHAucmVwb3J0V2ViVml0YWxzIGJ5IENvcmUgV2ViIFZpdGFscyBwbHVnaW4gZGV2ZWxvcGVkIGJ5IEdvb2dsZSBDaHJvbWUgdGVhbS5cbiAqIGh0dHBzOi8vbmV4dGpzLm9yZy9ibG9nL25leHQtOS00I2ludGVncmF0ZWQtd2ViLXZpdGFscy1yZXBvcnRpbmdcbiAqL1xuZXhwb3J0IHR5cGUgTmV4dFdlYlZpdGFsc01ldHJpYyA9IHtcbiAgaWQ6IHN0cmluZ1xuICBsYWJlbDogc3RyaW5nXG4gIG5hbWU6IHN0cmluZ1xuICBzdGFydFRpbWU6IG51bWJlclxuICB2YWx1ZTogbnVtYmVyXG59XG5cbmV4cG9ydCB0eXBlIEVuaGFuY2VyPEM+ID0gKENvbXBvbmVudDogQykgPT4gQ1xuXG5leHBvcnQgdHlwZSBDb21wb25lbnRzRW5oYW5jZXIgPVxuICB8IHtcbiAgICAgIGVuaGFuY2VBcHA/OiBFbmhhbmNlcjxBcHBUeXBlPlxuICAgICAgZW5oYW5jZUNvbXBvbmVudD86IEVuaGFuY2VyPE5leHRDb21wb25lbnRUeXBlPlxuICAgIH1cbiAgfCBFbmhhbmNlcjxOZXh0Q29tcG9uZW50VHlwZT5cblxuZXhwb3J0IHR5cGUgUmVuZGVyUGFnZVJlc3VsdCA9IHtcbiAgaHRtbDogc3RyaW5nXG4gIGhlYWQ/OiBBcnJheTxKU1guRWxlbWVudCB8IG51bGw+XG59XG5cbmV4cG9ydCB0eXBlIFJlbmRlclBhZ2UgPSAoXG4gIG9wdGlvbnM/OiBDb21wb25lbnRzRW5oYW5jZXJcbikgPT4gUmVuZGVyUGFnZVJlc3VsdCB8IFByb21pc2U8UmVuZGVyUGFnZVJlc3VsdD5cblxuZXhwb3J0IHR5cGUgQmFzZUNvbnRleHQgPSB7XG4gIHJlcz86IFNlcnZlclJlc3BvbnNlXG4gIFtrOiBzdHJpbmddOiBhbnlcbn1cblxuZXhwb3J0IHR5cGUgTkVYVF9EQVRBID0ge1xuICBwcm9wczogUmVjb3JkPHN0cmluZywgYW55PlxuICBwYWdlOiBzdHJpbmdcbiAgcXVlcnk6IFBhcnNlZFVybFF1ZXJ5XG4gIGJ1aWxkSWQ6IHN0cmluZ1xuICBhc3NldFByZWZpeD86IHN0cmluZ1xuICBydW50aW1lQ29uZmlnPzogeyBba2V5OiBzdHJpbmddOiBhbnkgfVxuICBuZXh0RXhwb3J0PzogYm9vbGVhblxuICBhdXRvRXhwb3J0PzogYm9vbGVhblxuICBpc0ZhbGxiYWNrPzogYm9vbGVhblxuICBkeW5hbWljSWRzPzogKHN0cmluZyB8IG51bWJlcilbXVxuICBlcnI/OiBFcnJvciAmIHsgc3RhdHVzQ29kZT86IG51bWJlciB9XG4gIGdzcD86IGJvb2xlYW5cbiAgZ3NzcD86IGJvb2xlYW5cbiAgY3VzdG9tU2VydmVyPzogYm9vbGVhblxuICBnaXA/OiBib29sZWFuXG4gIGFwcEdpcD86IGJvb2xlYW5cbiAgbG9jYWxlPzogc3RyaW5nXG4gIGxvY2FsZXM/OiBzdHJpbmdbXVxuICBkZWZhdWx0TG9jYWxlPzogc3RyaW5nXG4gIGRvbWFpbkxvY2FsZXM/OiBEb21haW5Mb2NhbGVzXG4gIHNjcmlwdExvYWRlcj86IGFueVtdXG4gIGlzUHJldmlldz86IGJvb2xlYW5cbn1cblxuLyoqXG4gKiBgTmV4dGAgY29udGV4dFxuICovXG5leHBvcnQgaW50ZXJmYWNlIE5leHRQYWdlQ29udGV4dCB7XG4gIC8qKlxuICAgKiBFcnJvciBvYmplY3QgaWYgZW5jb3VudGVyZWQgZHVyaW5nIHJlbmRlcmluZ1xuICAgKi9cbiAgZXJyPzogKEVycm9yICYgeyBzdGF0dXNDb2RlPzogbnVtYmVyIH0pIHwgbnVsbFxuICAvKipcbiAgICogYEhUVFBgIHJlcXVlc3Qgb2JqZWN0LlxuICAgKi9cbiAgcmVxPzogSW5jb21pbmdNZXNzYWdlXG4gIC8qKlxuICAgKiBgSFRUUGAgcmVzcG9uc2Ugb2JqZWN0LlxuICAgKi9cbiAgcmVzPzogU2VydmVyUmVzcG9uc2VcbiAgLyoqXG4gICAqIFBhdGggc2VjdGlvbiBvZiBgVVJMYC5cbiAgICovXG4gIHBhdGhuYW1lOiBzdHJpbmdcbiAgLyoqXG4gICAqIFF1ZXJ5IHN0cmluZyBzZWN0aW9uIG9mIGBVUkxgIHBhcnNlZCBhcyBhbiBvYmplY3QuXG4gICAqL1xuICBxdWVyeTogUGFyc2VkVXJsUXVlcnlcbiAgLyoqXG4gICAqIGBTdHJpbmdgIG9mIHRoZSBhY3R1YWwgcGF0aCBpbmNsdWRpbmcgcXVlcnkuXG4gICAqL1xuICBhc1BhdGg/OiBzdHJpbmdcbiAgLyoqXG4gICAqIFRoZSBjdXJyZW50bHkgYWN0aXZlIGxvY2FsZVxuICAgKi9cbiAgbG9jYWxlPzogc3RyaW5nXG4gIC8qKlxuICAgKiBBbGwgY29uZmlndXJlZCBsb2NhbGVzXG4gICAqL1xuICBsb2NhbGVzPzogc3RyaW5nW11cbiAgLyoqXG4gICAqIFRoZSBjb25maWd1cmVkIGRlZmF1bHQgbG9jYWxlXG4gICAqL1xuICBkZWZhdWx0TG9jYWxlPzogc3RyaW5nXG4gIC8qKlxuICAgKiBgQ29tcG9uZW50YCB0aGUgdHJlZSBvZiB0aGUgQXBwIHRvIHVzZSBpZiBuZWVkaW5nIHRvIHJlbmRlciBzZXBhcmF0ZWx5XG4gICAqL1xuICBBcHBUcmVlOiBBcHBUcmVlVHlwZVxufVxuXG5leHBvcnQgdHlwZSBBcHBDb250ZXh0VHlwZTxSIGV4dGVuZHMgTmV4dFJvdXRlciA9IE5leHRSb3V0ZXI+ID0ge1xuICBDb21wb25lbnQ6IE5leHRDb21wb25lbnRUeXBlPE5leHRQYWdlQ29udGV4dD5cbiAgQXBwVHJlZTogQXBwVHJlZVR5cGVcbiAgY3R4OiBOZXh0UGFnZUNvbnRleHRcbiAgcm91dGVyOiBSXG59XG5cbmV4cG9ydCB0eXBlIEFwcEluaXRpYWxQcm9wcyA9IHtcbiAgcGFnZVByb3BzOiBhbnlcbn1cblxuZXhwb3J0IHR5cGUgQXBwUHJvcHNUeXBlPFxuICBSIGV4dGVuZHMgTmV4dFJvdXRlciA9IE5leHRSb3V0ZXIsXG4gIFAgPSB7fVxuPiA9IEFwcEluaXRpYWxQcm9wcyAmIHtcbiAgQ29tcG9uZW50OiBOZXh0Q29tcG9uZW50VHlwZTxOZXh0UGFnZUNvbnRleHQsIGFueSwgUD5cbiAgcm91dGVyOiBSXG4gIF9fTl9TU0c/OiBib29sZWFuXG4gIF9fTl9TU1A/OiBib29sZWFuXG59XG5cbmV4cG9ydCB0eXBlIERvY3VtZW50Q29udGV4dCA9IE5leHRQYWdlQ29udGV4dCAmIHtcbiAgcmVuZGVyUGFnZTogUmVuZGVyUGFnZVxufVxuXG5leHBvcnQgdHlwZSBEb2N1bWVudEluaXRpYWxQcm9wcyA9IFJlbmRlclBhZ2VSZXN1bHQgJiB7XG4gIHN0eWxlcz86IFJlYWN0LlJlYWN0RWxlbWVudFtdIHwgUmVhY3QuUmVhY3RGcmFnbWVudFxufVxuXG5leHBvcnQgdHlwZSBEb2N1bWVudFByb3BzID0gRG9jdW1lbnRJbml0aWFsUHJvcHMgJiB7XG4gIF9fTkVYVF9EQVRBX186IE5FWFRfREFUQVxuICBkYW5nZXJvdXNBc1BhdGg6IHN0cmluZ1xuICBkb2NDb21wb25lbnRzUmVuZGVyZWQ6IHtcbiAgICBIdG1sPzogYm9vbGVhblxuICAgIE1haW4/OiBib29sZWFuXG4gICAgSGVhZD86IGJvb2xlYW5cbiAgICBOZXh0U2NyaXB0PzogYm9vbGVhblxuICB9XG4gIGJ1aWxkTWFuaWZlc3Q6IEJ1aWxkTWFuaWZlc3RcbiAgYW1wUGF0aDogc3RyaW5nXG4gIGluQW1wTW9kZTogYm9vbGVhblxuICBoeWJyaWRBbXA6IGJvb2xlYW5cbiAgaXNEZXZlbG9wbWVudDogYm9vbGVhblxuICBkeW5hbWljSW1wb3J0czogc3RyaW5nW11cbiAgYXNzZXRQcmVmaXg/OiBzdHJpbmdcbiAgY2Fub25pY2FsQmFzZTogc3RyaW5nXG4gIGhlYWRUYWdzOiBhbnlbXVxuICB1bnN0YWJsZV9ydW50aW1lSlM/OiBmYWxzZVxuICB1bnN0YWJsZV9Kc1ByZWxvYWQ/OiBmYWxzZVxuICBkZXZPbmx5Q2FjaGVCdXN0ZXJRdWVyeVN0cmluZzogc3RyaW5nXG4gIHNjcmlwdExvYWRlcjogeyBhZnRlckludGVyYWN0aXZlPzogc3RyaW5nW107IGJlZm9yZUludGVyYWN0aXZlPzogYW55W10gfVxuICBsb2NhbGU/OiBzdHJpbmdcbiAgZGlzYWJsZU9wdGltaXplZExvYWRpbmc/OiBib29sZWFuXG59XG5cbi8qKlxuICogTmV4dCBgQVBJYCByb3V0ZSByZXF1ZXN0XG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTmV4dEFwaVJlcXVlc3QgZXh0ZW5kcyBJbmNvbWluZ01lc3NhZ2Uge1xuICAvKipcbiAgICogT2JqZWN0IG9mIGBxdWVyeWAgdmFsdWVzIGZyb20gdXJsXG4gICAqL1xuICBxdWVyeToge1xuICAgIFtrZXk6IHN0cmluZ106IHN0cmluZyB8IHN0cmluZ1tdXG4gIH1cbiAgLyoqXG4gICAqIE9iamVjdCBvZiBgY29va2llc2AgZnJvbSBoZWFkZXJcbiAgICovXG4gIGNvb2tpZXM6IHtcbiAgICBba2V5OiBzdHJpbmddOiBzdHJpbmdcbiAgfVxuXG4gIGJvZHk6IGFueVxuXG4gIGVudjogRW52XG5cbiAgcHJldmlldz86IGJvb2xlYW5cbiAgLyoqXG4gICAqIFByZXZpZXcgZGF0YSBzZXQgb24gdGhlIHJlcXVlc3QsIGlmIGFueVxuICAgKiAqL1xuICBwcmV2aWV3RGF0YT86IFByZXZpZXdEYXRhXG59XG5cbi8qKlxuICogU2VuZCBib2R5IG9mIHJlc3BvbnNlXG4gKi9cbnR5cGUgU2VuZDxUPiA9IChib2R5OiBUKSA9PiB2b2lkXG5cbi8qKlxuICogTmV4dCBgQVBJYCByb3V0ZSByZXNwb25zZVxuICovXG5leHBvcnQgdHlwZSBOZXh0QXBpUmVzcG9uc2U8VCA9IGFueT4gPSBTZXJ2ZXJSZXNwb25zZSAmIHtcbiAgLyoqXG4gICAqIFNlbmQgZGF0YSBgYW55YCBkYXRhIGluIHJlc3BvbnNlXG4gICAqL1xuICBzZW5kOiBTZW5kPFQ+XG4gIC8qKlxuICAgKiBTZW5kIGRhdGEgYGpzb25gIGRhdGEgaW4gcmVzcG9uc2VcbiAgICovXG4gIGpzb246IFNlbmQ8VD5cbiAgc3RhdHVzOiAoc3RhdHVzQ29kZTogbnVtYmVyKSA9PiBOZXh0QXBpUmVzcG9uc2U8VD5cbiAgcmVkaXJlY3QodXJsOiBzdHJpbmcpOiBOZXh0QXBpUmVzcG9uc2U8VD5cbiAgcmVkaXJlY3Qoc3RhdHVzOiBudW1iZXIsIHVybDogc3RyaW5nKTogTmV4dEFwaVJlc3BvbnNlPFQ+XG5cbiAgLyoqXG4gICAqIFNldCBwcmV2aWV3IGRhdGEgZm9yIE5leHQuanMnIHByZXJlbmRlciBtb2RlXG4gICAqL1xuICBzZXRQcmV2aWV3RGF0YTogKFxuICAgIGRhdGE6IG9iamVjdCB8IHN0cmluZyxcbiAgICBvcHRpb25zPzoge1xuICAgICAgLyoqXG4gICAgICAgKiBTcGVjaWZpZXMgdGhlIG51bWJlciAoaW4gc2Vjb25kcykgZm9yIHRoZSBwcmV2aWV3IHNlc3Npb24gdG8gbGFzdCBmb3IuXG4gICAgICAgKiBUaGUgZ2l2ZW4gbnVtYmVyIHdpbGwgYmUgY29udmVydGVkIHRvIGFuIGludGVnZXIgYnkgcm91bmRpbmcgZG93bi5cbiAgICAgICAqIEJ5IGRlZmF1bHQsIG5vIG1heGltdW0gYWdlIGlzIHNldCBhbmQgdGhlIHByZXZpZXcgc2Vzc2lvbiBmaW5pc2hlc1xuICAgICAgICogd2hlbiB0aGUgY2xpZW50IHNodXRzIGRvd24gKGJyb3dzZXIgaXMgY2xvc2VkKS5cbiAgICAgICAqL1xuICAgICAgbWF4QWdlPzogbnVtYmVyXG4gICAgfVxuICApID0+IE5leHRBcGlSZXNwb25zZTxUPlxuICBjbGVhclByZXZpZXdEYXRhOiAoKSA9PiBOZXh0QXBpUmVzcG9uc2U8VD5cbn1cblxuLyoqXG4gKiBOZXh0IGBBUElgIHJvdXRlIGhhbmRsZXJcbiAqL1xuZXhwb3J0IHR5cGUgTmV4dEFwaUhhbmRsZXI8VCA9IGFueT4gPSAoXG4gIHJlcTogTmV4dEFwaVJlcXVlc3QsXG4gIHJlczogTmV4dEFwaVJlc3BvbnNlPFQ+XG4pID0+IHZvaWQgfCBQcm9taXNlPHZvaWQ+XG5cbi8qKlxuICogVXRpbHNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGV4ZWNPbmNlPFQgZXh0ZW5kcyAoLi4uYXJnczogYW55W10pID0+IFJldHVyblR5cGU8VD4+KFxuICBmbjogVFxuKTogVCB7XG4gIGxldCB1c2VkID0gZmFsc2VcbiAgbGV0IHJlc3VsdDogUmV0dXJuVHlwZTxUPlxuXG4gIHJldHVybiAoKC4uLmFyZ3M6IGFueVtdKSA9PiB7XG4gICAgaWYgKCF1c2VkKSB7XG4gICAgICB1c2VkID0gdHJ1ZVxuICAgICAgcmVzdWx0ID0gZm4oLi4uYXJncylcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdFxuICB9KSBhcyBUXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRMb2NhdGlvbk9yaWdpbigpIHtcbiAgY29uc3QgeyBwcm90b2NvbCwgaG9zdG5hbWUsIHBvcnQgfSA9IHdpbmRvdy5sb2NhdGlvblxuICByZXR1cm4gYCR7cHJvdG9jb2x9Ly8ke2hvc3RuYW1lfSR7cG9ydCA/ICc6JyArIHBvcnQgOiAnJ31gXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRVUkwoKSB7XG4gIGNvbnN0IHsgaHJlZiB9ID0gd2luZG93LmxvY2F0aW9uXG4gIGNvbnN0IG9yaWdpbiA9IGdldExvY2F0aW9uT3JpZ2luKClcbiAgcmV0dXJuIGhyZWYuc3Vic3RyaW5nKG9yaWdpbi5sZW5ndGgpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXREaXNwbGF5TmFtZTxQPihDb21wb25lbnQ6IENvbXBvbmVudFR5cGU8UD4pIHtcbiAgcmV0dXJuIHR5cGVvZiBDb21wb25lbnQgPT09ICdzdHJpbmcnXG4gICAgPyBDb21wb25lbnRcbiAgICA6IENvbXBvbmVudC5kaXNwbGF5TmFtZSB8fCBDb21wb25lbnQubmFtZSB8fCAnVW5rbm93bidcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzUmVzU2VudChyZXM6IFNlcnZlclJlc3BvbnNlKSB7XG4gIHJldHVybiByZXMuZmluaXNoZWQgfHwgcmVzLmhlYWRlcnNTZW50XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2FkR2V0SW5pdGlhbFByb3BzPFxuICBDIGV4dGVuZHMgQmFzZUNvbnRleHQsXG4gIElQID0ge30sXG4gIFAgPSB7fVxuPihBcHA6IE5leHRDb21wb25lbnRUeXBlPEMsIElQLCBQPiwgY3R4OiBDKTogUHJvbWlzZTxJUD4ge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGlmIChBcHAucHJvdG90eXBlPy5nZXRJbml0aWFsUHJvcHMpIHtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBgXCIke2dldERpc3BsYXlOYW1lKFxuICAgICAgICBBcHBcbiAgICAgICl9LmdldEluaXRpYWxQcm9wcygpXCIgaXMgZGVmaW5lZCBhcyBhbiBpbnN0YW5jZSBtZXRob2QgLSB2aXNpdCBodHRwczovL25leHRqcy5vcmcvZG9jcy9tZXNzYWdlcy9nZXQtaW5pdGlhbC1wcm9wcy1hcy1hbi1pbnN0YW5jZS1tZXRob2QgZm9yIG1vcmUgaW5mb3JtYXRpb24uYFxuICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpXG4gICAgfVxuICB9XG4gIC8vIHdoZW4gY2FsbGVkIGZyb20gX2FwcCBgY3R4YCBpcyBuZXN0ZWQgaW4gYGN0eGBcbiAgY29uc3QgcmVzID0gY3R4LnJlcyB8fCAoY3R4LmN0eCAmJiBjdHguY3R4LnJlcylcblxuICBpZiAoIUFwcC5nZXRJbml0aWFsUHJvcHMpIHtcbiAgICBpZiAoY3R4LmN0eCAmJiBjdHguQ29tcG9uZW50KSB7XG4gICAgICAvLyBAdHMtaWdub3JlIHBhZ2VQcm9wcyBkZWZhdWx0XG4gICAgICByZXR1cm4ge1xuICAgICAgICBwYWdlUHJvcHM6IGF3YWl0IGxvYWRHZXRJbml0aWFsUHJvcHMoY3R4LkNvbXBvbmVudCwgY3R4LmN0eCksXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7fSBhcyBJUFxuICB9XG5cbiAgY29uc3QgcHJvcHMgPSBhd2FpdCBBcHAuZ2V0SW5pdGlhbFByb3BzKGN0eClcblxuICBpZiAocmVzICYmIGlzUmVzU2VudChyZXMpKSB7XG4gICAgcmV0dXJuIHByb3BzXG4gIH1cblxuICBpZiAoIXByb3BzKSB7XG4gICAgY29uc3QgbWVzc2FnZSA9IGBcIiR7Z2V0RGlzcGxheU5hbWUoXG4gICAgICBBcHBcbiAgICApfS5nZXRJbml0aWFsUHJvcHMoKVwiIHNob3VsZCByZXNvbHZlIHRvIGFuIG9iamVjdC4gQnV0IGZvdW5kIFwiJHtwcm9wc31cIiBpbnN0ZWFkLmBcbiAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSlcbiAgfVxuXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgaWYgKE9iamVjdC5rZXlzKHByb3BzKS5sZW5ndGggPT09IDAgJiYgIWN0eC5jdHgpIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgYCR7Z2V0RGlzcGxheU5hbWUoXG4gICAgICAgICAgQXBwXG4gICAgICAgICl9IHJldHVybmVkIGFuIGVtcHR5IG9iamVjdCBmcm9tIFxcYGdldEluaXRpYWxQcm9wc1xcYC4gVGhpcyBkZS1vcHRpbWl6ZXMgYW5kIHByZXZlbnRzIGF1dG9tYXRpYyBzdGF0aWMgb3B0aW1pemF0aW9uLiBodHRwczovL25leHRqcy5vcmcvZG9jcy9tZXNzYWdlcy9lbXB0eS1vYmplY3QtZ2V0SW5pdGlhbFByb3BzYFxuICAgICAgKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBwcm9wc1xufVxuXG5leHBvcnQgY29uc3QgdXJsT2JqZWN0S2V5cyA9IFtcbiAgJ2F1dGgnLFxuICAnaGFzaCcsXG4gICdob3N0JyxcbiAgJ2hvc3RuYW1lJyxcbiAgJ2hyZWYnLFxuICAncGF0aCcsXG4gICdwYXRobmFtZScsXG4gICdwb3J0JyxcbiAgJ3Byb3RvY29sJyxcbiAgJ3F1ZXJ5JyxcbiAgJ3NlYXJjaCcsXG4gICdzbGFzaGVzJyxcbl1cblxuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdFdpdGhWYWxpZGF0aW9uKHVybDogVXJsT2JqZWN0KTogc3RyaW5nIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XG4gICAgaWYgKHVybCAhPT0gbnVsbCAmJiB0eXBlb2YgdXJsID09PSAnb2JqZWN0Jykge1xuICAgICAgT2JqZWN0LmtleXModXJsKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgaWYgKHVybE9iamVjdEtleXMuaW5kZXhPZihrZXkpID09PSAtMSkge1xuICAgICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICAgIGBVbmtub3duIGtleSBwYXNzZWQgdmlhIHVybE9iamVjdCBpbnRvIHVybC5mb3JtYXQ6ICR7a2V5fWBcbiAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZvcm1hdFVybCh1cmwpXG59XG5cbmV4cG9ydCBjb25zdCBTUCA9IHR5cGVvZiBwZXJmb3JtYW5jZSAhPT0gJ3VuZGVmaW5lZCdcbmV4cG9ydCBjb25zdCBTVCA9XG4gIFNQICYmXG4gIHR5cGVvZiBwZXJmb3JtYW5jZS5tYXJrID09PSAnZnVuY3Rpb24nICYmXG4gIHR5cGVvZiBwZXJmb3JtYW5jZS5tZWFzdXJlID09PSAnZnVuY3Rpb24nXG4iLCJcInVzZSBzdHJpY3RcIjtleHBvcnRzLl9fZXNNb2R1bGU9dHJ1ZTtleHBvcnRzLm5vcm1hbGl6ZVBhdGhTZXA9bm9ybWFsaXplUGF0aFNlcDtleHBvcnRzLmRlbm9ybWFsaXplUGFnZVBhdGg9ZGVub3JtYWxpemVQYWdlUGF0aDtmdW5jdGlvbiBub3JtYWxpemVQYXRoU2VwKHBhdGgpe3JldHVybiBwYXRoLnJlcGxhY2UoL1xcXFwvZywnLycpO31mdW5jdGlvbiBkZW5vcm1hbGl6ZVBhZ2VQYXRoKHBhZ2Upe3BhZ2U9bm9ybWFsaXplUGF0aFNlcChwYWdlKTtpZihwYWdlLnN0YXJ0c1dpdGgoJy9pbmRleC8nKSl7cGFnZT1wYWdlLnNsaWNlKDYpO31lbHNlIGlmKHBhZ2U9PT0nL2luZGV4Jyl7cGFnZT0nLyc7fXJldHVybiBwYWdlO31cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRlbm9ybWFsaXplLXBhZ2UtcGF0aC5qcy5tYXAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZGlzdC9jbGllbnQvbGluaycpXG4iLCJmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikge1xuICByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDoge1xuICAgIFwiZGVmYXVsdFwiOiBvYmpcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0OyIsInZhciBfdHlwZW9mID0gcmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvdHlwZW9mXCIpO1xuXG5mdW5jdGlvbiBfZ2V0UmVxdWlyZVdpbGRjYXJkQ2FjaGUoKSB7XG4gIGlmICh0eXBlb2YgV2Vha01hcCAhPT0gXCJmdW5jdGlvblwiKSByZXR1cm4gbnVsbDtcbiAgdmFyIGNhY2hlID0gbmV3IFdlYWtNYXAoKTtcblxuICBfZ2V0UmVxdWlyZVdpbGRjYXJkQ2FjaGUgPSBmdW5jdGlvbiBfZ2V0UmVxdWlyZVdpbGRjYXJkQ2FjaGUoKSB7XG4gICAgcmV0dXJuIGNhY2hlO1xuICB9O1xuXG4gIHJldHVybiBjYWNoZTtcbn1cblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQob2JqKSB7XG4gIGlmIChvYmogJiYgb2JqLl9fZXNNb2R1bGUpIHtcbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgaWYgKG9iaiA9PT0gbnVsbCB8fCBfdHlwZW9mKG9iaikgIT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIG9iaiAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIFwiZGVmYXVsdFwiOiBvYmpcbiAgICB9O1xuICB9XG5cbiAgdmFyIGNhY2hlID0gX2dldFJlcXVpcmVXaWxkY2FyZENhY2hlKCk7XG5cbiAgaWYgKGNhY2hlICYmIGNhY2hlLmhhcyhvYmopKSB7XG4gICAgcmV0dXJuIGNhY2hlLmdldChvYmopO1xuICB9XG5cbiAgdmFyIG5ld09iaiA9IHt9O1xuICB2YXIgaGFzUHJvcGVydHlEZXNjcmlwdG9yID0gT2JqZWN0LmRlZmluZVByb3BlcnR5ICYmIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG5cbiAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSB7XG4gICAgICB2YXIgZGVzYyA9IGhhc1Byb3BlcnR5RGVzY3JpcHRvciA/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBrZXkpIDogbnVsbDtcblxuICAgICAgaWYgKGRlc2MgJiYgKGRlc2MuZ2V0IHx8IGRlc2Muc2V0KSkge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobmV3T2JqLCBrZXksIGRlc2MpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV3T2JqW2tleV0gPSBvYmpba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZXdPYmpbXCJkZWZhdWx0XCJdID0gb2JqO1xuXG4gIGlmIChjYWNoZSkge1xuICAgIGNhY2hlLnNldChvYmosIG5ld09iaik7XG4gIH1cblxuICByZXR1cm4gbmV3T2JqO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkOyIsImZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gIFwiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjtcblxuICBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICAgICAgcmV0dXJuIHR5cGVvZiBvYmo7XG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBfdHlwZW9mKG9iaik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3R5cGVvZjsiLCJpbXBvcnQgeyB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gXCJuZXh0L3JvdXRlclwiO1xuaW1wb3J0IHsgdXNlQXV0aCB9IGZyb20gXCIuLi9jb250ZXh0L0F1dGhVc2VyQ29udGV4dFwiO1xuaW1wb3J0IHsgQ29udGFpbmVyIH0gZnJvbSBcInJlYWN0LWJvb3RzdHJhcFwiO1xuXG5jb25zdCBMb2dnZWRJbiA9ICh7IGNoaWxkcmVuIH0pID0+IHtcbiAgY29uc3QgeyBhdXRoVXNlciwgbG9hZGluZyB9ID0gdXNlQXV0aCgpO1xuICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcblxuICAvLyBSZWRpcmVjdCBvbmx5IGFmdGVyIGEgc2hvcnQgZGVsYXkgaWYgYXV0aFVzZXIgcmVtYWlucyBudWxsLlxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKFwiPT09IExPR0dFRElOIEFVVEggQ0hFQ0sgPT09XCIpO1xuICAgIGNvbnNvbGUubG9nKFwibG9hZGluZzpcIiwgbG9hZGluZyk7XG4gICAgY29uc29sZS5sb2coXCJhdXRoVXNlcjpcIiwgYXV0aFVzZXIpO1xuICAgIGNvbnNvbGUubG9nKFwicm91dGVyLmFzUGF0aDpcIiwgcm91dGVyLmFzUGF0aCk7XG5cbiAgICBpZiAoIWxvYWRpbmcgJiYgYXV0aFVzZXIgPT09IG51bGwpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiTm8gYXV0aCB1c2VyLCB3aWxsIHJlZGlyZWN0IHRvIGxvZ2luIGluIDgwMG1zXCIpO1xuICAgICAgLy8gU2V0IGEgZGVsYXkgKGUuZy4gNTAwbXMpIHRvIGdpdmUgRmlyZWJhc2UgQXV0aCBhIGNoYW5jZSB0byByZWh5ZHJhdGUuXG4gICAgICBjb25zdCB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlJlZGlyZWN0aW5nIHRvIGxvZ2luIG5vd1wiKTtcbiAgICAgICAgcm91dGVyLnB1c2goYC8/cmVkaXJlY3Q9JHtlbmNvZGVVUklDb21wb25lbnQocm91dGVyLmFzUGF0aCl9YCk7XG4gICAgICB9LCA4MDApO1xuICAgICAgcmV0dXJuICgpID0+IGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgfVxuICB9LCBbYXV0aFVzZXIsIGxvYWRpbmcsIHJvdXRlcl0pO1xuXG4gIGlmIChsb2FkaW5nKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxDb250YWluZXJcbiAgICAgICAgY2xhc3NOYW1lPVwiZC1mbGV4IGFsaWduLWl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyXCJcbiAgICAgICAgc3R5bGU9e3sgbWluSGVpZ2h0OiBcIjEwMHZoXCIgfX1cbiAgICAgID5cbiAgICAgICAgPGgzPkxvYWRpbmcuLi48L2gzPlxuICAgICAgPC9Db250YWluZXI+XG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiA8PnthdXRoVXNlciAmJiBjaGlsZHJlbn08Lz47XG59O1xuXG5leHBvcnQgZGVmYXVsdCBMb2dnZWRJbjtcbiIsImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7XHJcbiAgQ29udGFpbmVyLFxyXG4gIENhcmQsXHJcbiAgUm93LFxyXG4gIENvbCxcclxuICBJbnB1dEdyb3VwLFxyXG4gIERyb3Bkb3duLFxyXG4gIEZvcm1Db250cm9sLFxyXG4gIEJ1dHRvbixcclxuICBOYXZEcm9wZG93bixcclxuICBGb3JtLFxyXG4gIE1vZGFsLFxyXG4gIFNwaW5uZXIsXHJcbn0gZnJvbSBcInJlYWN0LWJvb3RzdHJhcFwiO1xyXG5pbXBvcnQgTGluayBmcm9tIFwibmV4dC9saW5rXCI7XHJcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gXCJuZXh0L3JvdXRlclwiO1xyXG5pbXBvcnQge1xyXG4gIGZldGNoUGFydHNXaXRoTWFjaGluZURhdGEsXHJcbiAgZmV0Y2hDbGllbnRzLFxyXG4gIGZldGNoTW9kZWxzLFxyXG4gIGZvcm1hdERhdGUsXHJcbn0gZnJvbSBcIi4uLy4uL3V0aWxzL2ZldGNoQXNzb2NpYXRpb25zXCI7XHJcbmltcG9ydCB7IHVzZUF1dGggfSBmcm9tIFwiLi4vLi4vY29udGV4dC9BdXRoVXNlckNvbnRleHRcIjtcclxuaW1wb3J0IExvZ2dlZEluIGZyb20gXCIuLi9Mb2dnZWRJblwiO1xyXG5pbXBvcnQgQ2xpZW50VGFibGUgZnJvbSBcIi4uLy4uL3V0aWxzL0NsaWVudFRhYmxlXCI7XHJcbmltcG9ydCBNb2RlbFRhYmxlIGZyb20gXCIuLi8uLi91dGlscy9Nb2RlbFRhYmxlXCI7XHJcbmltcG9ydCBQYXJ0VGFibGUgZnJvbSBcIi4uLy4uL3V0aWxzL1BhcnRUYWJsZVwiO1xyXG5pbXBvcnQgc3R5bGVzIGZyb20gXCIuLi8uLi9zdHlsZXMvTWFpblNlYXJjaC5tb2R1bGUuY3NzXCI7XHJcbmltcG9ydCBmaXJlYmFzZSBmcm9tIFwiLi4vLi4vY29udGV4dC9GaXJlYmFzZVwiO1xyXG5cclxuLy8gUHJlZGVmaW5lZCB3YXJlaG91c2UgY2xpZW50IElEcyBhbmQgZGlzcGxheSBuYW1lc1xyXG5jb25zdCBTT0NBTF9DTElFTlRfSUQgPSBcIkFJUzE3MTgyXCI7XHJcbmNvbnN0IE5PUkNBTF9DTElFTlRfSUQgPSBcIkFJUzI1MDk3XCI7XHJcbmNvbnN0IFVOQVNTSUdORURfQ0xJRU5UX0lEID0gXCJBSVMwMDQwNFwiO1xyXG5cclxuXHJcbi8vIFNpbXVsYXRlcyBhIG5ldHdvcmsgcmVxdWVzdCBkZWxheVxyXG5mdW5jdGlvbiBzaW11bGF0ZU5ldHdvcmtSZXF1ZXN0KCkge1xyXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gc2V0VGltZW91dChyZXNvbHZlLCAyMDAwKSk7XHJcbn1cclxuXHJcbi8vIEN1c3RvbSBMb2FkaW5nQnV0dG9uIGNvbXBvbmVudFxyXG5mdW5jdGlvbiBMb2FkaW5nQnV0dG9uKHsgdHlwZSwgbmFtZSwgcm91dGUgfSkge1xyXG4gIGNvbnN0IFtpc0xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKGlzTG9hZGluZykge1xyXG4gICAgICBzaW11bGF0ZU5ldHdvcmtSZXF1ZXN0KCkudGhlbigoKSA9PiBzZXRMb2FkaW5nKGZhbHNlKSk7XHJcbiAgICB9XHJcbiAgfSwgW2lzTG9hZGluZ10pO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPExpbmsgaHJlZj17YC8ke3JvdXRlfWB9PlxyXG4gICAgICA8YVxyXG4gICAgICAgIGNsYXNzTmFtZT17YGJ0biBidG4tJHt0eXBlfWB9XHJcbiAgICAgICAgZGlzYWJsZWQ9e2lzTG9hZGluZ31cclxuICAgICAgICBvbkNsaWNrPXsoKSA9PiAhaXNMb2FkaW5nICYmIHNldExvYWRpbmcodHJ1ZSl9XHJcbiAgICAgID5cclxuICAgICAgICB7aXNMb2FkaW5nID8gXCJMb2FkaW5n4oCmXCIgOiBuYW1lfVxyXG4gICAgICA8L2E+XHJcbiAgICA8L0xpbms+XHJcbiAgKTtcclxufVxyXG5cclxuLy8gLS0tLSBEQVRFIEhFTFBFUlMgKHRvcC1sZXZlbCBzY29wZSkgLS0tLVxyXG5cclxuLy8gQ29udmVydCBhbnl0aGluZyBkYXRlLWlzaCBpbnRvIGEgdGltZXN0YW1wIChtcyBzaW5jZSBlcG9jaCkuXHJcbmZ1bmN0aW9uIHRvVGltZSh2YWx1ZSkge1xyXG4gIGlmICghdmFsdWUpIHJldHVybiBudWxsO1xyXG5cclxuICAvLyBGaXJlc3RvcmUgVGltZXN0YW1wIHsgc2Vjb25kcywgbmFub3NlY29uZHMgfVxyXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiYgdmFsdWUgIT09IG51bGwgJiYgdmFsdWUuc2Vjb25kcyAhPSBudWxsKSB7XHJcbiAgICB0cnkgeyByZXR1cm4gdmFsdWUuc2Vjb25kcyAqIDEwMDA7IH0gY2F0Y2ggeyAvKiBpZ25vcmUgKi8gfVxyXG4gIH1cclxuXHJcbiAgLy8gTmF0aXZlIERhdGVcclxuICBpZiAodmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XHJcbiAgICBjb25zdCB0ID0gdmFsdWUuZ2V0VGltZSgpO1xyXG4gICAgcmV0dXJuIGlzTmFOKHQpID8gbnVsbCA6IHQ7XHJcbiAgfVxyXG5cclxuICAvLyBTdHJpbmdzXHJcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgLy8gSVNPIC8geXl5eS1tbS1kZFxyXG4gICAgY29uc3QgaXNvID0gRGF0ZS5wYXJzZSh2YWx1ZSk7XHJcbiAgICBpZiAoIWlzTmFOKGlzbykpIHJldHVybiBpc287XHJcblxyXG4gICAgLy8gbW0vZGQveXl5eVxyXG4gICAgY29uc3QgcGFydHMgPSB2YWx1ZS5zcGxpdChcIi9cIik7XHJcbiAgICBpZiAocGFydHMubGVuZ3RoID09PSAzKSB7XHJcbiAgICAgIGNvbnN0IFttbSwgZGQsIHl5eXldID0gcGFydHM7XHJcbiAgICAgIGNvbnN0IGFsdCA9IERhdGUucGFyc2UoYCR7eXl5eX0tJHttbX0tJHtkZH1gKTtcclxuICAgICAgaWYgKCFpc05hTihhbHQpKSByZXR1cm4gYWx0O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gTGFzdCByZXNvcnRcclxuICBjb25zdCB0ID0gRGF0ZS5wYXJzZSh2YWx1ZSk7XHJcbiAgcmV0dXJuIGlzTmFOKHQpID8gbnVsbCA6IHQ7XHJcbn1cclxuXHJcbi8vIENhbm9uaWNhbGl6ZSB0byAneXl5eS1tbS1kZCcgKG1hdGNoZXMgPGlucHV0IHR5cGU9XCJkYXRlXCI+KVxyXG5mdW5jdGlvbiB0b1lNRCh2YWx1ZSkge1xyXG4gIGNvbnN0IHQgPSB0b1RpbWUodmFsdWUpO1xyXG4gIGlmICh0ID09IG51bGwpIHJldHVybiBudWxsO1xyXG4gIGNvbnN0IGQgPSBuZXcgRGF0ZSh0KTtcclxuICBjb25zdCB5eXl5ID0gZC5nZXRGdWxsWWVhcigpO1xyXG4gIGNvbnN0IG1tID0gU3RyaW5nKGQuZ2V0TW9udGgoKSArIDEpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcclxuICBjb25zdCBkZCA9IFN0cmluZyhkLmdldERhdGUoKSkucGFkU3RhcnQoMiwgXCIwXCIpO1xyXG4gIHJldHVybiBgJHt5eXl5fS0ke21tfS0ke2RkfWA7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBNYWluU2VhcmNoKCkge1xyXG4gIGNvbnN0IHsgc2lnbk91dCB9ID0gdXNlQXV0aCgpO1xyXG4gIGNvbnN0IFtpbmZvLCBzZXRJbmZvXSA9IHVzZVN0YXRlKFtdKTtcclxuICBjb25zdCBbYmFja3VwSW5mbywgc2V0QmFja3VwSW5mb10gPSB1c2VTdGF0ZShbXSk7XHJcbiAgY29uc3QgW2F1Z21lbnRlZEluZm8sIHNldEF1Z21lbnRlZEluZm9dID0gdXNlU3RhdGUoW10pOyAvLyBpdGVtcyB3aXRoIGNsaWVudEZyb21JZC9jdXJyZW50SWQgYWRkZWRcclxuICBjb25zdCBbaXNMb2FkaW5nLCBzZXRJc0xvYWRpbmddID0gdXNlU3RhdGUodHJ1ZSk7XHJcbiAgY29uc3QgW2lkcywgc2V0SURdID0gdXNlU3RhdGUoW10pO1xyXG4gIGNvbnN0IFtzaG93LCBzZXRTaG93XSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbZEl0ZW0sIHNldERJdGVtXSA9IHVzZVN0YXRlKCk7XHJcbiAgY29uc3QgW3NlbGVjdCwgc2V0U2VsZWN0XSA9IHVzZVN0YXRlKFwiTmFtZVwiKTtcclxuICBjb25zdCBbc2hvd0xpc3QsIHNldFNob3dMaXN0XSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbc2hvd0xpc3RTZWFyY2gsIHNldFNob3dMaXN0U2VhcmNoXSA9IHVzZVN0YXRlKFwidGV4dFwiKTtcclxuICBjb25zdCBbc2VhcmNoLCBzZXRTZWFyY2hdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW3NlbGVjdGVkT0VNLCBzZXRTZWxlY3RlZE9FTV0gPSB1c2VTdGF0ZShudWxsKTtcclxuICBjb25zdCBbc2VsZWN0ZWRNb2RhbGl0eSwgc2V0U2VsZWN0ZWRNb2RhbGl0eV0gPSB1c2VTdGF0ZShudWxsKTtcclxuICAvLyBSZXBsYWNlIHRoZSBvbGQgc2luZ2xlIGNsaWVudCBzdGF0ZSB3aXRoIHR3byBzZXRzOlxyXG4gIGNvbnN0IFtzZWxlY3RlZENsaWVudEZyb20sIHNldFNlbGVjdGVkQ2xpZW50RnJvbV0gPSB1c2VTdGF0ZShudWxsKTtcclxuICBjb25zdCBbY2xpZW50RnJvbUJ1dHRvblRleHQsIHNldENsaWVudEZyb21CdXR0b25UZXh0XSA9IHVzZVN0YXRlKFwiU2VsZWN0IE9wdGlvblwiKTtcclxuICBjb25zdCBbc2VsZWN0ZWRDbGllbnRDdXJyZW50LCBzZXRTZWxlY3RlZENsaWVudEN1cnJlbnRdID0gdXNlU3RhdGUobnVsbCk7XHJcbiAgY29uc3QgW2NsaWVudEN1cnJlbnRCdXR0b25UZXh0LCBzZXRDbGllbnRDdXJyZW50QnV0dG9uVGV4dF0gPSB1c2VTdGF0ZShcIlNlbGVjdCBPcHRpb25cIik7XHJcblxyXG4gIGNvbnN0IFtjbGllbnRzLCBzZXRDbGllbnRzXSA9IHVzZVN0YXRlKFtdKTtcclxuICBjb25zdCBbc2hvd0NsaWVudE1vZGFsLCBzZXRTaG93Q2xpZW50TW9kYWxdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIC8vIFRoaXMgc3RhdGUgdGVsbHMgdGhlIG1vZGFsIHdoaWNoIGNsaWVudCBib3ggaXMgYmVpbmcgdXBkYXRlZDogXCJmcm9tXCIgb3IgXCJjdXJyZW50XCJcclxuICBjb25zdCBbY2xpZW50U2VsZWN0aW9uVHlwZSwgc2V0Q2xpZW50U2VsZWN0aW9uVHlwZV0gPSB1c2VTdGF0ZShudWxsKTtcclxuXHJcbiAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XHJcbiAgY29uc3QgbGFiZWxCYXNlID0gW1wibmFtZVwiLCBcImRhdGVcIiwgXCJ3L29cIiwgXCJwL25cIiwgXCJzL25cIl07XHJcbiAgY29uc3QgbGFiZWxCYXNlTmFtZXMgPSBbXCJuYW1lXCIsIFwiZGF0ZVwiLCBcIndvXCIsIFwicG5cIiwgXCJzblwiXTtcclxuICBjb25zdCBzb3J0Q2hlY2tCYXNlID0gW2ZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2VdO1xyXG5cclxuICBmdW5jdGlvbiB3aXRoU29ydEljb24oYmFzZUxhYmVscywgYWN0aXZlSW5kZXgsIGlzRGVzYykge1xyXG4gICAgcmV0dXJuIGJhc2VMYWJlbHMubWFwKCh0ZXh0LCBpKSA9PiB7XHJcbiAgICAgIGlmIChpICE9PSBhY3RpdmVJbmRleCkgcmV0dXJuIHRleHQ7IC8vIHVudG91Y2hlZFxyXG4gICAgICBjb25zdCBhcnJvdyA9IGlzRGVzYyA/IFwiIOKWvFwiIDogXCIg4payXCI7XHJcbiAgICAgIHJldHVybiBgJHt0ZXh0fSR7YXJyb3d9YDtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcblxyXG4gIGNvbnN0IFtsYWJlbHMsIHNldExhYmVsc10gPSB1c2VTdGF0ZShsYWJlbEJhc2UpO1xyXG4gIGNvbnN0IFtzb3J0Q2hlY2ssIHNldFNvcnRDaGVja10gPSB1c2VTdGF0ZShzb3J0Q2hlY2tCYXNlKTtcclxuICBjb25zdCBbaG92ZXJJbmRleCwgc2V0SG92ZXJJbmRleF0gPSB1c2VTdGF0ZShudWxsKTtcclxuICBjb25zdCBbc2VsZWN0ZWRNb2RlbCwgc2V0U2VsZWN0ZWRNb2RlbF0gPSB1c2VTdGF0ZShudWxsKTtcclxuICBjb25zdCBbZ1Bvcywgc2V0R1Bvc10gPSB1c2VTdGF0ZShudWxsKTtcclxuICBjb25zdCBbZ0lkZSwgc2V0R0lkZV0gPSB1c2VTdGF0ZShudWxsKTtcclxuICBjb25zdCBbaXNEZWxldGluZywgc2V0SXNEZWxldGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XHJcblxyXG5cclxuICAvLyBGZXRjaCBkYXRhIG9uIGNvbXBvbmVudCBtb3VudCBhbmQgcm91dGUgY2hhbmdlXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGZldGNoRGF0YSgpO1xyXG4gIH0sIFtyb3V0ZXIucm91dGVdKTtcclxuXHJcbiAgYXN5bmMgZnVuY3Rpb24gZmV0Y2hEYXRhKCkge1xyXG4gICAgc2V0SXNMb2FkaW5nKHRydWUpO1xyXG4gICAgdHJ5IHtcclxuICAgICAgaWYgKHJvdXRlci5xdWVyeS5pbnB1dFRleHQgJiYgcm91dGVyLnF1ZXJ5LnNlbGVjdGVkVHlwZSkge1xyXG4gICAgICAgIHNldFNlbGVjdChyb3V0ZXIucXVlcnkuc2VsZWN0ZWRUeXBlKTtcclxuICAgICAgICBzZXRTZWFyY2gocm91dGVyLnF1ZXJ5LmlucHV0VGV4dCk7XHJcbiAgICAgIH1cclxuICAgICAgLy8gbGlnaHQgcmV0cnkgZm9yIHRyYW5zaWVudCBGaXJlc3RvcmUgaGljY3Vwc1xyXG4gICAgICBjb25zdCBsb2FkID0gYXN5bmMgKGF0dGVtcHQgPSAxKSA9PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIHJldHVybiBhd2FpdCBmZXRjaFBhcnRzV2l0aE1hY2hpbmVEYXRhKCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgaWYgKGF0dGVtcHQgPj0gMykgdGhyb3cgZTtcclxuICAgICAgICAgIGF3YWl0IG5ldyBQcm9taXNlKHIgPT4gc2V0VGltZW91dChyLCAyNTAgKiBNYXRoLnBvdygyLCBhdHRlbXB0IC0gMSkpKTtcclxuICAgICAgICAgIHJldHVybiBsb2FkKGF0dGVtcHQgKyAxKTtcclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcbiAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBsb2FkKCk7XHJcbiAgICAgIHNldEJhY2t1cEluZm8oZGF0YSk7XHJcbiAgICAgIHNldExhYmVscyhsYWJlbEJhc2UpOyAvLyA8LS0gYWRkIHRoaXMgbGluZSBhZnRlciBzZXRCYWNrdXBJbmZvKGRhdGEpXHJcbiAgICAgIHNldElEKGRhdGEubWFwKChpdGVtKSA9PiBpdGVtLmlkKSk7XHJcblxyXG4gICAgICAvLyAtLS0gUHJlLWF1Z21lbnQ6IHJlc29sdmUgY2xpZW50IGlkcyBvZiBNYWNoaW5lIC8gQ3VycmVudE1hY2hpbmUgb25jZSAtLS1cclxuICAgICAgY29uc3QgZGIgPSBmaXJlYmFzZS5maXJlc3RvcmUoKTtcclxuICAgICAgY29uc3QgbWFjaGluZUlkcyA9IFtdO1xyXG4gICAgICBjb25zdCBjdXJNYWNoaW5lSWRzID0gW107XHJcbiAgICAgIGNvbnN0IHRoZU1hY2hpbmVJZHMgPSBbXTsgLy8gPC0tIEFERFxyXG5cclxuICAgICAgZm9yIChjb25zdCBpdGVtIG9mIGRhdGEpIHtcclxuICAgICAgICBpZiAoaXRlbT8uTWFjaGluZT8uaWQpIG1hY2hpbmVJZHMucHVzaChpdGVtLk1hY2hpbmUuaWQpO1xyXG4gICAgICAgIGlmIChpdGVtPy5DdXJyZW50TWFjaGluZT8uaWQpIGN1ck1hY2hpbmVJZHMucHVzaChpdGVtLkN1cnJlbnRNYWNoaW5lLmlkKTtcclxuICAgICAgICBpZiAoaXRlbT8uVGhlTWFjaGluZT8uaWQpIHRoZU1hY2hpbmVJZHMucHVzaChpdGVtLlRoZU1hY2hpbmUuaWQpOyAvLyA8LS0gQUREXHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgdW5pcSA9IChhcnIpID0+IFsuLi5uZXcgU2V0KGFycildO1xyXG4gICAgICBjb25zdCBtSWRzID0gdW5pcShtYWNoaW5lSWRzKTtcclxuICAgICAgY29uc3QgY0lkcyA9IHVuaXEoY3VyTWFjaGluZUlkcyk7XHJcblxyXG4gICAgICBjb25zdCBmZXRjaE1hY2hpbmVDbGllbnRzID0gYXN5bmMgKGlkcykgPT4ge1xyXG4gICAgICAgIGlmICghaWRzLmxlbmd0aCkgcmV0dXJuIHt9O1xyXG4gICAgICAgIGNvbnN0IG91dCA9IHt9O1xyXG4gICAgICAgIC8vIEZpcmVzdG9yZSBcImluXCIgc3VwcG9ydHMgdXAgdG8gMTAgZG9jdW1lbnQgSURzIHBlciBxdWVyeVxyXG4gICAgICAgIGNvbnN0IGNodW5rcyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaWRzLmxlbmd0aDsgaSArPSAxMCkgY2h1bmtzLnB1c2goaWRzLnNsaWNlKGksIGkgKyAxMCkpO1xyXG4gICAgICAgIGZvciAoY29uc3QgY2h1bmsgb2YgY2h1bmtzKSB7XHJcbiAgICAgICAgICBjb25zdCBzbmFwID0gYXdhaXQgZGJcclxuICAgICAgICAgICAgLmNvbGxlY3Rpb24oXCJNYWNoaW5lXCIpXHJcbiAgICAgICAgICAgIC53aGVyZShmaXJlYmFzZS5maXJlc3RvcmUuRmllbGRQYXRoLmRvY3VtZW50SWQoKSwgXCJpblwiLCBjaHVuaylcclxuICAgICAgICAgICAgLmdldCgpO1xyXG4gICAgICAgICAgc25hcC5mb3JFYWNoKChkb2MpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbWQgPSBkb2MuZGF0YSgpIHx8IHt9O1xyXG4gICAgICAgICAgICBvdXRbZG9jLmlkXSA9IG1kLmNsaWVudD8uaWQgfHwgbnVsbDtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgLy8gRmV0Y2ggZnVsbCBtYWNoaW5lIGRvY3MgKE9FTS9Nb2RhbGl0eS9Nb2RlbC9DbGllbnQvZXRjLikgZm9yIGEgc2V0IG9mIGlkc1xyXG4gICAgICBjb25zdCBmZXRjaE1hY2hpbmVzRGF0YSA9IGFzeW5jIChpZHMpID0+IHtcclxuICAgICAgICBpZiAoIWlkcy5sZW5ndGgpIHJldHVybiB7fTtcclxuICAgICAgICBjb25zdCBvdXQgPSB7fTtcclxuICAgICAgICBjb25zdCBjaHVua3MgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGlkcy5sZW5ndGg7IGkgKz0gMTApIGNodW5rcy5wdXNoKGlkcy5zbGljZShpLCBpICsgMTApKTtcclxuICAgICAgICBmb3IgKGNvbnN0IGNodW5rIG9mIGNodW5rcykge1xyXG4gICAgICAgICAgY29uc3Qgc25hcCA9IGF3YWl0IGRiXHJcbiAgICAgICAgICAgIC5jb2xsZWN0aW9uKFwiTWFjaGluZVwiKVxyXG4gICAgICAgICAgICAud2hlcmUoZmlyZWJhc2UuZmlyZXN0b3JlLkZpZWxkUGF0aC5kb2N1bWVudElkKCksIFwiaW5cIiwgY2h1bmspXHJcbiAgICAgICAgICAgIC5nZXQoKTtcclxuICAgICAgICAgIHNuYXAuZm9yRWFjaCgoZG9jKSA9PiB7XHJcbiAgICAgICAgICAgIG91dFtkb2MuaWRdID0geyBpZDogZG9jLmlkLCAuLi4oZG9jLmRhdGEoKSB8fCB7fSkgfTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgICB9O1xyXG5cclxuXHJcbiAgICAgIGNvbnN0IFtmcm9tTWFwLCBjdXJNYXAsIHRoZU1hcF0gPSBhd2FpdCBQcm9taXNlLmFsbChbXHJcbiAgICAgICAgZmV0Y2hNYWNoaW5lQ2xpZW50cyhtSWRzKSxcclxuICAgICAgICBmZXRjaE1hY2hpbmVDbGllbnRzKGNJZHMpLFxyXG4gICAgICAgIGZldGNoTWFjaGluZXNEYXRhKHVuaXEodGhlTWFjaGluZUlkcykpLCAvLyA8LS0gbm93IGNhcHR1cmVkIGFzIHRoZU1hcFxyXG4gICAgICBdKTtcclxuXHJcbiAgICAgIC8vIE5ldy1zdHlsZSBvbmx5OiB0YWtlIGNsaWVudCBpZHMgc3RyYWlnaHQgZnJvbSBpdGVtIHJlZnNcclxuICAgICAgY29uc3QgYXVnbWVudGVkID0gZGF0YS5tYXAoKGl0ZW0pID0+ICh7XHJcbiAgICAgICAgLi4uaXRlbSxcclxuICAgICAgICBjbGllbnRGcm9tSWQ6IGl0ZW0/LkNsaWVudEZyb20/LmlkID8/IG51bGwsXHJcbiAgICAgICAgY2xpZW50Q3VycmVudElkOiBpdGVtPy5DbGllbnRDdXJyZW50Py5pZCA/PyBudWxsLFxyXG4gICAgICB9KSk7XHJcblxyXG4gICAgICBzZXRBdWdtZW50ZWRJbmZvKGF1Z21lbnRlZCk7XHJcbiAgICAgIC8vIGRlZmF1bHQgdmlldyA9IGV2ZXJ5dGhpbmcgbm90IGV4cGxpY2l0bHkgaGlkZGVuXHJcbiAgICAgIHNldEluZm8oYXVnbWVudGVkLmZpbHRlcigoaXQpID0+IGl0LnZpc2libGUgIT09IGZhbHNlKSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGZldGNoaW5nIGRhdGE6XCIsIGVycik7XHJcbiAgICAgIHNldEluZm8oW10pO1xyXG4gICAgICBzZXRBdWdtZW50ZWRJbmZvKFtdKTtcclxuICAgIH0gZmluYWxseSB7XHJcbiAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25zdCBzZWFyY2hDaGFuZ2VIYW5kbGVyID0gKGV2ZW50KSA9PiBzZXRTZWFyY2goZXZlbnQudGFyZ2V0LnZhbHVlKTtcclxuXHJcbiAgLy8gQXN5bmNocm9ub3VzIGZpbHRlciBmdW5jdGlvbiB0aGF0IGxvb3BzIHRocm91Z2ggYmFja3VwSW5mbyBhbmQsXHJcbiAgLy8gZm9yIGVhY2ggaXRlbSwgZmV0Y2hlcyBpdHMgTWFjaGluZSBhbmQgQ3VycmVudE1hY2hpbmUgZG9jdW1lbnRzLFxyXG4gIC8vIHRoZW4gY29tcGFyZXMgdGhlIGNsaWVudCBpZCAoZnJvbSBtYWNoaW5lRGF0YS5jbGllbnQuaWQpIHRvIHRoZSBzZWxlY3RlZCBjbGllbnQuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGZ1bmN0aW9uIGZpbHRlclBhcnRzKCkge1xyXG4gICAgICBjb25zdCBiYXNlID0gYXVnbWVudGVkSW5mbzsgLy8gYWxyZWFkeSBoYXMgY2xpZW50RnJvbUlkL2NsaWVudEN1cnJlbnRJZFxyXG4gICAgICBjb25zdCBub0ZpbHRlcnMgPVxyXG4gICAgICAgICFzZWxlY3RlZE9FTSAmJlxyXG4gICAgICAgICFzZWxlY3RlZE1vZGFsaXR5ICYmXHJcbiAgICAgICAgIXNlbGVjdGVkTW9kZWwgJiZcclxuICAgICAgICAhc2VsZWN0ZWRDbGllbnRGcm9tICYmXHJcbiAgICAgICAgIXNlbGVjdGVkQ2xpZW50Q3VycmVudCAmJlxyXG4gICAgICAgICFzZWFyY2g7XHJcbiAgICAgIGlmIChub0ZpbHRlcnMpIHtcclxuICAgICAgICBzZXRJbmZvKGJhc2UuZmlsdGVyKChpdCkgPT4gaXQudmlzaWJsZSAhPT0gZmFsc2UpKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGZpbHRlcmVkID0gYmFzZS5maWx0ZXIoKGl0ZW0pID0+IHtcclxuICAgICAgICAvLyBvbmx5IGhpZGUgd2hlbiBleHBsaWNpdGx5IGZhbHNlXHJcbiAgICAgICAgaWYgKGl0ZW0udmlzaWJsZSA9PT0gZmFsc2UpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgLy8gT0VNL21vZGFsaXR5L21vZGVsIHZpYSBtYWNoaW5lRGF0YSAoeW91IGFscmVhZHkgcHV0IHRoaXMgaW4gaXRlbXMpXHJcbiAgICAgICAgLy8gT0VNIC8gTW9kYWxpdHkgLyBNb2RlbCBmaWx0ZXJpbmdcclxuICAgICAgICAvLyBQcmVmZXIgbWFjaGluZURhdGE7IGZhbGwgYmFjayB0byB0aGVNYWNoaW5lRGF0YTsgZmluYWxseSB0cnkgaW5saW5lIFRoZU1hY2hpbmUgaWYgaXQgaGFzIHBsYWluIGZpZWxkc1xyXG4gICAgICAgIGNvbnN0IE9FTSA9IGl0ZW0/Lm1hY2hpbmVEYXRhPy5PRU1cclxuICAgICAgICAgID8/IGl0ZW0/LnRoZU1hY2hpbmVEYXRhPy5PRU1cclxuICAgICAgICAgID8/IGl0ZW0/LlRoZU1hY2hpbmU/Lk9FTTtcclxuICAgICAgICBjb25zdCBNb2RhbGl0eSA9IGl0ZW0/Lm1hY2hpbmVEYXRhPy5Nb2RhbGl0eVxyXG4gICAgICAgICAgPz8gaXRlbT8udGhlTWFjaGluZURhdGE/Lk1vZGFsaXR5XHJcbiAgICAgICAgICA/PyBpdGVtPy5UaGVNYWNoaW5lPy5Nb2RhbGl0eTtcclxuICAgICAgICBjb25zdCBNb2RlbCA9IGl0ZW0/Lm1hY2hpbmVEYXRhPy5Nb2RlbFxyXG4gICAgICAgICAgPz8gaXRlbT8udGhlTWFjaGluZURhdGE/Lk1vZGVsXHJcbiAgICAgICAgICA/PyBpdGVtPy5UaGVNYWNoaW5lPy5Nb2RlbDtcclxuXHJcbiAgICAgICAgaWYgKHNlbGVjdGVkT0VNICYmIE9FTSAhPT0gc2VsZWN0ZWRPRU0pIHJldHVybiBmYWxzZTtcclxuICAgICAgICBpZiAoc2VsZWN0ZWRNb2RhbGl0eSAmJiBNb2RhbGl0eSAhPT0gc2VsZWN0ZWRNb2RhbGl0eSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIGlmIChzZWxlY3RlZE1vZGVsICYmIE1vZGVsICE9PSBzZWxlY3RlZE1vZGVsKSByZXR1cm4gZmFsc2U7XHJcblxyXG5cclxuICAgICAgICAvLyBDbGllbnQgZmlsdGVycyAobm93IGluc3RhbnQpXHJcbiAgICAgICAgaWYgKHNlbGVjdGVkQ2xpZW50RnJvbSAmJiBpdGVtLmNsaWVudEZyb21JZCAhPT0gc2VsZWN0ZWRDbGllbnRGcm9tKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgaWYgKHNlbGVjdGVkQ2xpZW50Q3VycmVudCAmJiBpdGVtLmNsaWVudEN1cnJlbnRJZCAhPT0gc2VsZWN0ZWRDbGllbnRDdXJyZW50KSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgIC8vIFNlYXJjaFxyXG4gICAgICAgIGlmIChzZWFyY2gpIHtcclxuICAgICAgICAgIGNvbnN0IHMgPSBTdHJpbmcoc2VhcmNoKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgaWYgKHNlbGVjdCA9PT0gXCJOYW1lXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIChpdGVtLm5hbWUgfHwgXCJcIikudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhzKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChzZWxlY3QgPT09IFwiRGF0ZVwiKSB7XHJcbiAgICAgICAgICAgIC8vIElmIHVzZXIgaGFzbid0IHBpY2tlZCBhIGRhdGUgeWV0LCBkb24ndCBoaWRlIGFueXRoaW5nXHJcbiAgICAgICAgICAgIGlmICghc2VhcmNoKSByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHdhbnRlZERheSA9IHNlYXJjaDsgLy8gYWxyZWFkeSAneXl5eS1tbS1kZCcgZnJvbSA8aW5wdXQgdHlwZT1cImRhdGVcIj5cclxuXHJcbiAgICAgICAgICAgIC8vIDEpIE1hdGNoIGl0ZW0uZGF0ZSwgcmVnYXJkbGVzcyBvZiBpdHMgZm9ybWF0IG9yIHR5cGVcclxuICAgICAgICAgICAgY29uc3QgaXRlbVlNRCA9IHRvWU1EKGl0ZW0uZGF0ZSk7XHJcbiAgICAgICAgICAgIGlmIChpdGVtWU1EICYmIGl0ZW1ZTUQgPT09IHdhbnRlZERheSkgcmV0dXJuIHRydWU7XHJcblxyXG4gICAgICAgICAgICAvLyAyKSBBbHNvIGNoZWNrIGFueSBkZXNjcmlwdGlvbiBkYXRlcyAoaWYgeW91IHN0b3JlIGRhdGVzIHRoZXJlKVxyXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShpdGVtLmRlc2NyaXB0aW9ucykpIHtcclxuICAgICAgICAgICAgICBjb25zdCBoaXREZXNjID0gaXRlbS5kZXNjcmlwdGlvbnMuc29tZSgoZCkgPT4gdG9ZTUQoZD8uZGF0ZSkgPT09IHdhbnRlZERheSk7XHJcbiAgICAgICAgICAgICAgaWYgKGhpdERlc2MpIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyAzKSBBbmQgd29yayBvcmRlciBkYXRlcyAoaWYgcHJlc2VudClcclxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoaXRlbS53b3JrT3JkZXJzKSkge1xyXG4gICAgICAgICAgICAgIGNvbnN0IGhpdFdPID0gaXRlbS53b3JrT3JkZXJzLnNvbWUoKHcpID0+IHRvWU1EKHc/LmRhdGUpID09PSB3YW50ZWREYXkpO1xyXG4gICAgICAgICAgICAgIGlmIChoaXRXTykgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoc2VsZWN0ID09PSBcIldvcmsgT3JkZXJcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gQXJyYXkuaXNBcnJheShpdGVtLndvcmtPcmRlcnMpICYmXHJcbiAgICAgICAgICAgICAgaXRlbS53b3JrT3JkZXJzLnNvbWUoKHdvKSA9PiBTdHJpbmcod28ud29ya09yZGVyIHx8IFwiXCIpLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMocykpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKHNlbGVjdCA9PT0gXCJQcm9kdWN0IE51bWJlclwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBTdHJpbmcoaXRlbS5wbiB8fCBcIlwiKS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHMpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKHNlbGVjdCA9PT0gXCJEZXNjcmlwdGlvblwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBTdHJpbmcoaXRlbS5kZXNjIHx8IFwiXCIpLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMocyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoc2VsZWN0ID09PSBcIlNLVVwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBTdHJpbmcoaXRlbS5pZCB8fCBcIlwiKS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHMpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfSk7XHJcbiAgICAgIHNldEluZm8oZmlsdGVyZWQpO1xyXG4gICAgfVxyXG4gICAgZmlsdGVyUGFydHMoKTtcclxuICB9LCBbc2VsZWN0ZWRPRU0sIHNlbGVjdGVkTW9kYWxpdHksIHNlbGVjdGVkQ2xpZW50RnJvbSwgc2VsZWN0ZWRDbGllbnRDdXJyZW50LCBzZWxlY3RlZE1vZGVsLCBzZWFyY2gsIHNlbGVjdCwgYXVnbWVudGVkSW5mb10pO1xyXG5cclxuICBmdW5jdGlvbiBzb3J0Q2hlY2tBbGwocG9zKSB7XHJcbiAgICAvLyBEZXRlcm1pbmUgbmV4dCBkaXJlY3Rpb246IHRvZ2dsZSB0aGUgY2xpY2tlZCBjb2x1bW4gb25seVxyXG4gICAgY29uc3QgbmV4dFNvcnRDaGVjayA9IHNvcnRDaGVjay5tYXAoKHYsIGkpID0+IChpID09PSBwb3MgPyAhdiA6IHYpKTtcclxuICAgIGNvbnN0IGlzRGVzYyA9IG5leHRTb3J0Q2hlY2tbcG9zXTsgLy8gdHJ1ZSBtZWFucyBkZXNjZW5kaW5nXHJcblxyXG4gICAgY29uc3Qgc29ydGVkSW5mbyA9IFsuLi5pbmZvXS5zb3J0KChhLCBiKSA9PiB7XHJcbiAgICAgIGNvbnN0IGtleSA9IGxhYmVsQmFzZU5hbWVzW3Bvc107XHJcblxyXG4gICAgICBpZiAocG9zID09PSAxKSB7XHJcbiAgICAgICAgLy8gREFURSBjb2x1bW5cclxuICAgICAgICBjb25zdCB0YSA9IHRvVGltZShhW2tleV0pO1xyXG4gICAgICAgIGNvbnN0IHRiID0gdG9UaW1lKGJba2V5XSk7XHJcblxyXG4gICAgICAgIC8vIFB1dCBtaXNzaW5nIGRhdGVzIGF0IHRoZSBlbmQgZm9yIGFzY2VuZGluZywgYXQgdGhlIHN0YXJ0IGZvciBkZXNjZW5kaW5nXHJcbiAgICAgICAgaWYgKHRhID09PSBudWxsICYmIHRiID09PSBudWxsKSByZXR1cm4gMDtcclxuICAgICAgICBpZiAodGEgPT09IG51bGwpIHJldHVybiBpc0Rlc2MgPyAtMSA6IDE7XHJcbiAgICAgICAgaWYgKHRiID09PSBudWxsKSByZXR1cm4gaXNEZXNjID8gMSA6IC0xO1xyXG5cclxuICAgICAgICByZXR1cm4gaXNEZXNjID8gKHRiIC0gdGEpIDogKHRhIC0gdGIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBOQU1FIG9yIFNLVSAoc3RyaW5nLXkgY29sdW1ucyk6IGluZGV4ZXMgMCBvciA1IGluIHlvdXIgb3JpZ2luYWwgbG9naWNcclxuICAgICAgaWYgKHBvcyA9PT0gMCB8fCBwb3MgPT09IDUpIHtcclxuICAgICAgICBjb25zdCBhdiA9IChhW2tleV0gPz8gXCJcIikudG9TdHJpbmcoKTtcclxuICAgICAgICBjb25zdCBidiA9IChiW2tleV0gPz8gXCJcIikudG9TdHJpbmcoKTtcclxuICAgICAgICByZXR1cm4gaXNEZXNjID8gYnYubG9jYWxlQ29tcGFyZShhdikgOiBhdi5sb2NhbGVDb21wYXJlKGJ2KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gTnVtZXJpYy1pc2ggY29sdW1ucyAod28sIHBuLCBzbikg4oCUIGZhbGwgYmFjayB0byBzdHJpbmcgY29tcGFyZSBpZiBOYU5cclxuICAgICAgY29uc3QgYW4gPSBOdW1iZXIoYVtrZXldKTtcclxuICAgICAgY29uc3QgYm4gPSBOdW1iZXIoYltrZXldKTtcclxuXHJcbiAgICAgIGlmICghaXNOYU4oYW4pICYmICFpc05hTihibikpIHtcclxuICAgICAgICByZXR1cm4gaXNEZXNjID8gKGJuIC0gYW4pIDogKGFuIC0gYm4pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IGF2ID0gKGFba2V5XSA/PyBcIlwiKS50b1N0cmluZygpO1xyXG4gICAgICAgIGNvbnN0IGJ2ID0gKGJba2V5XSA/PyBcIlwiKS50b1N0cmluZygpO1xyXG4gICAgICAgIHJldHVybiBpc0Rlc2MgPyBidi5sb2NhbGVDb21wYXJlKGF2KSA6IGF2LmxvY2FsZUNvbXBhcmUoYnYpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBzZXRJbmZvKHNvcnRlZEluZm8pO1xyXG4gICAgc2V0U29ydENoZWNrKG5leHRTb3J0Q2hlY2spO1xyXG5cclxuICAgIC8vIFVwZGF0ZSBoZWFkZXIgbGFiZWxzIHRvIHNob3cgdGhlIGxpdHRsZSBhcnJvdyBvbiB0aGUgYWN0aXZlIGNvbHVtblxyXG4gICAgc2V0TGFiZWxzKHdpdGhTb3J0SWNvbihsYWJlbEJhc2UsIHBvcywgaXNEZXNjKSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgY29uc3Qgcm93U2VsZWN0ID0gKGl0ZW0pID0+IHtcclxuICAgIGlmIChpdGVtICYmIGl0ZW0uaWQpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJTZWxlY3RlZCBpdGVtOlwiLCBpdGVtKTtcclxuICAgICAgcm91dGVyLnB1c2goXCIuL2l0ZW0vXCIgKyBpdGVtLmlkKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJVbmFibGUgdG8gZGV0ZXJtaW5lIHRoZSBzZWxlY3RlZCBpdGVt4oCZcyBJRDogXCIsIGl0ZW0pO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGNvbnN0IFtzZWxlY3RlZEl0ZW1zLCBzZXRTZWxlY3RlZEl0ZW1zXSA9IHVzZVN0YXRlKFtdKTtcclxuICBjb25zdCBbc2hvd0RlbGV0ZU1vZGFsLCBzZXRTaG93RGVsZXRlTW9kYWxdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG5cclxuICBjb25zdCBoYW5kbGVTZWxlY3RJdGVtID0gKGlkKSA9PiB7XHJcbiAgICBzZXRTZWxlY3RlZEl0ZW1zKHByZXYgPT5cclxuICAgICAgcHJldi5pbmNsdWRlcyhpZCkgPyBwcmV2LmZpbHRlcih4ID0+IHggIT09IGlkKSA6IFsuLi5wcmV2LCBpZF1cclxuICAgICk7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8vIHNldFNlbGVjdGVkSXRlbXMoKHByZXYpID0+IHtcclxuICAvLyAgIGNvbnN0IG5ld1NlbGVjdGlvbiA9IHByZXYuaW5jbHVkZXMoaWQpXHJcbiAgLy8gICAgID8gcHJldi5maWx0ZXIoKGl0ZW1JZCkgPT4gaXRlbUlkICE9PSBpZClcclxuICAvLyAgICAgOiBbLi4ucHJldiwgaWRdO1xyXG4gIC8vICAgY29uc29sZS5sb2coXCJTZWxlY3RlZCBpdGVtczpcIiwgbmV3U2VsZWN0aW9uKTtcclxuICAvLyAgIHJldHVybiBuZXdTZWxlY3Rpb247IC8vIDwtIGltcG9ydGFudFxyXG4gIC8vIH0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVTaG93RGVsZXRlTW9kYWwgPSAoKSA9PiBzZXRTaG93RGVsZXRlTW9kYWwodHJ1ZSk7XHJcbiAgY29uc3QgaGFuZGxlQ2xvc2VEZWxldGVNb2RhbCA9ICgpID0+IHNldFNob3dEZWxldGVNb2RhbChmYWxzZSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZURlbGV0ZVNlbGVjdGVkID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgc2V0SXNEZWxldGluZyh0cnVlKTtcclxuICAgIGNvbnN0IGRiID0gZmlyZWJhc2UuZmlyZXN0b3JlKCk7XHJcbiAgICB0cnkge1xyXG4gICAgICAvLyBMb29wIG92ZXIgZWFjaCBzZWxlY3RlZCBpdGVtIG9uZSBhdCBhIHRpbWVcclxuICAgICAgZm9yIChjb25zdCBpdGVtSWQgb2Ygc2VsZWN0ZWRJdGVtcykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGl0ZW1JZClcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgLy8gRGVsZXRlIGZyb20gXCJUZXN0XCIgY29sbGVjdGlvblxyXG4gICAgICAgICAgYXdhaXQgZGIuY29sbGVjdGlvbihcIlRlc3RcIikuZG9jKGl0ZW1JZCkuZGVsZXRlKCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGBFcnJvciBkZWxldGluZyBkb2N1bWVudCAke2l0ZW1JZH0gZnJvbSBUZXN0OmAsIGVycik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAvLyBEZWxldGUgZnJvbSBcIlBhcnRzXCIgY29sbGVjdGlvblxyXG4gICAgICAgICAgYXdhaXQgZGIuY29sbGVjdGlvbihcIlBhcnRzXCIpLmRvYyhpdGVtSWQpLmRlbGV0ZSgpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgY29uc29sZS5lcnJvcihgRXJyb3IgZGVsZXRpbmcgZG9jdW1lbnQgJHtpdGVtSWR9IGZyb20gUGFydHM6YCwgZXJyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIC8vIERlbGV0ZSBhc3NvY2lhdGVkIHBob3RvcyBmcm9tIHN0b3JhZ2VcclxuICAgICAgICAgIGF3YWl0IGRlbGV0ZUZyb21TdG9yYWdlKGl0ZW1JZCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGBFcnJvciBkZWxldGluZyBzdG9yYWdlIGZvciAke2l0ZW1JZH06YCwgZXJyKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgLy8gVXBkYXRlIGxvY2FsIHN0YXRlIGJ5IGZpbHRlcmluZyBvdXQgdGhlIGRlbGV0ZWQgaXRlbXNcclxuICAgICAgc2V0SW5mbyhpbmZvLmZpbHRlcigoaXRlbSkgPT4gIXNlbGVjdGVkSXRlbXMuaW5jbHVkZXMoaXRlbS5pZCkpKTtcclxuICAgICAgc2V0U2VsZWN0ZWRJdGVtcyhbXSk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZGVsZXRpbmcgaXRlbXM6XCIsIGVycm9yKTtcclxuICAgIH0gZmluYWxseSB7XHJcbiAgICAgIHNldElzRGVsZXRpbmcoZmFsc2UpO1xyXG4gICAgICBoYW5kbGVDbG9zZURlbGV0ZU1vZGFsKCk7XHJcbiAgICAgIC8vIE9wdGlvbmFsbHksIHJlbG9hZCB0aGUgcGFnZVxyXG4gICAgICAvLyByb3V0ZXIucmVsb2FkKCk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcblxyXG4gIGNvbnN0IGhhbmRsZUNsb3NlID0gKCkgPT4gc2V0U2hvdyhmYWxzZSk7XHJcbiAgY29uc3QgaGFuZGxlU2hvdyA9ICgpID0+IHNldFNob3codHJ1ZSk7XHJcblxyXG4gIGNvbnN0IGNoZWNrRGVsZXRlID0gKGV2ZW50LCBwb3MsIGlkc1RvRGVsZXRlLCBuYW1lKSA9PiB7XHJcbiAgICBpZiAoZXZlbnQpIHtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICB9XHJcbiAgICBjb25zb2xlLmxvZyhcIlNlbGVjdGVkIElEcyB0byBkZWxldGU6XCIsIGlkc1RvRGVsZXRlKTtcclxuICAgIHNldFNlbGVjdGVkSXRlbXMoaWRzVG9EZWxldGUpO1xyXG4gICAgc2V0REl0ZW0obmFtZSk7XHJcbiAgICBzZXRTaG93RGVsZXRlTW9kYWwodHJ1ZSk7XHJcbiAgfTtcclxuXHJcbiAgLy8gY29uc3QgaGFuZGxlRGVsZXRlID0gYXN5bmMgKCkgPT4ge1xyXG4gIC8vICAgbGV0IGl0ZW1JZCA9IGdJZGU7XHJcbiAgLy8gICB0cnkge1xyXG4gIC8vICAgICBzZXRJc0RlbGV0aW5nKHRydWUpO1xyXG4gIC8vICAgICBjb25zdCBkYiA9IGZpcmViYXNlLmZpcmVzdG9yZSgpO1xyXG4gIC8vICAgICBhd2FpdCBkYi5jb2xsZWN0aW9uKFwiVGVzdFwiKS5kb2MoaXRlbUlkKS5kZWxldGUoKTtcclxuICAvLyAgICAgYXdhaXQgZGVsZXRlRnJvbVBhcnRzQ29sbGVjdGlvbihpdGVtSWQpO1xyXG4gIC8vICAgICBhd2FpdCBkZWxldGVGcm9tU3RvcmFnZShpdGVtSWQpO1xyXG4gIC8vICAgICBzZXRJbmZvKGluZm8uZmlsdGVyKChfLCBpKSA9PiBnUG9zICE9PSBpKSk7XHJcbiAgLy8gICAgIGNvbnNvbGUubG9nKGBEZWxldGVkIGl0ZW06ICR7aXRlbUlkfWApO1xyXG4gIC8vICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAvLyAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGRlbGV0aW5nIGl0ZW06XCIsIGVycm9yKTtcclxuICAvLyAgIH0gZmluYWxseSB7XHJcbiAgLy8gICAgIHNldElzRGVsZXRpbmcoZmFsc2UpO1xyXG4gIC8vICAgfVxyXG4gIC8vICAgaGFuZGxlQ2xvc2UoKTtcclxuICAvLyB9O1xyXG5cclxuICBjb25zdCBob3ZlclN0eWxlID0gKGluZGV4KSA9PiAoe1xyXG4gICAgYmFja2dyb3VuZENvbG9yOiBob3ZlckluZGV4ID09PSBpbmRleCA/IFwiI2RkZFwiIDogXCJ0cmFuc3BhcmVudFwiLFxyXG4gICAgdGV4dEFsaWduOiBcImNlbnRlclwiLFxyXG4gICAgY3Vyc29yOiBcImRlZmF1bHRcIixcclxuICB9KTtcclxuXHJcbiAgY29uc3QgW2Ryb3Bkb3duMVRleHQsIHNldERyb3Bkb3duMVRleHRdID0gdXNlU3RhdGUoXCJTZWxlY3QgT3B0aW9uXCIpO1xyXG4gIGNvbnN0IFtkcm9wZG93bjJUZXh0LCBzZXREcm9wZG93bjJUZXh0XSA9IHVzZVN0YXRlKFwiU2VsZWN0IE9wdGlvblwiKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlU2VsZWN0MSA9IChldmVudEtleSwgZXZlbnQpID0+IHtcclxuICAgIGlmIChldmVudEtleSA9PT0gXCJ1bmFzc2lnbmVkXCIpIHtcclxuICAgICAgc2V0RHJvcGRvd24xVGV4dChcIlNlbGVjdCBPcHRpb25cIik7XHJcbiAgICAgIHNldFNlbGVjdGVkT0VNKG51bGwpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc2V0RHJvcGRvd24xVGV4dChldmVudC50YXJnZXQudGV4dENvbnRlbnQpO1xyXG4gICAgICBzZXRTZWxlY3RlZE9FTShldmVudC50YXJnZXQudGV4dENvbnRlbnQpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGNvbnN0IGhhbmRsZVNlbGVjdDIgPSAoZXZlbnRLZXksIGV2ZW50KSA9PiB7XHJcbiAgICBpZiAoZXZlbnRLZXkgPT09IFwidW5hc3NpZ25lZFwiKSB7XHJcbiAgICAgIHNldERyb3Bkb3duMlRleHQoXCJTZWxlY3QgT3B0aW9uXCIpO1xyXG4gICAgICBzZXRTZWxlY3RlZE1vZGFsaXR5KG51bGwpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc2V0RHJvcGRvd24yVGV4dChldmVudC50YXJnZXQudGV4dENvbnRlbnQpO1xyXG4gICAgICBzZXRTZWxlY3RlZE1vZGFsaXR5KGV2ZW50LnRhcmdldC50ZXh0Q29udGVudCk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgLy8gQnVpbGQgYSB1bmlxdWUgbGlzdCBvZiBjbGllbnRzIGZyb20gdGhlIGl0ZW1zIGN1cnJlbnRseSBsb2FkZWQsIGZpbHRlcmVkIGJ5IE9FTS9Nb2RhbGl0eS5cclxuICAvLyBgdHlwZWAgaXMgXCJmcm9tXCIgb3IgXCJjdXJyZW50XCIgdG8gZGVjaWRlIHdoaWNoIGNsaWVudCByZWYgdG8gcmVhZC5cclxuICBhc3luYyBmdW5jdGlvbiBidWlsZENsaWVudHNGcm9tSXRlbXModHlwZSkge1xyXG4gICAgY29uc3QgZGIgPSBmaXJlYmFzZS5maXJlc3RvcmUoKTtcclxuICAgIGNvbnN0IGlkcyA9IG5ldyBTZXQoKTtcclxuXHJcbiAgICAvLyBSZXNwZWN0IGN1cnJlbnQgT0VNIC8gTW9kYWxpdHkgZmlsdGVycyB3aGVuIGRlcml2aW5nIGNsaWVudCBvcHRpb25zXHJcbiAgICBjb25zdCBmaWx0ZXJlZCA9IGF1Z21lbnRlZEluZm8uZmlsdGVyKChpdGVtKSA9PiB7XHJcbiAgICAgIGNvbnN0IE9FTSA9IGl0ZW0/Lm1hY2hpbmVEYXRhPy5PRU0gPz8gaXRlbT8uT0VNID8/IG51bGw7XHJcbiAgICAgIGNvbnN0IE1vZGFsaXR5ID0gaXRlbT8ubWFjaGluZURhdGE/Lk1vZGFsaXR5ID8/IGl0ZW0/Lk1vZGFsaXR5ID8/IG51bGw7XHJcbiAgICAgIGlmIChzZWxlY3RlZE9FTSAmJiBPRU0gIT09IHNlbGVjdGVkT0VNKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIGlmIChzZWxlY3RlZE1vZGFsaXR5ICYmIE1vZGFsaXR5ICE9PSBzZWxlY3RlZE1vZGFsaXR5KSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZm9yIChjb25zdCBpdCBvZiBmaWx0ZXJlZCkge1xyXG4gICAgICBjb25zdCBpZCA9IHR5cGUgPT09IFwiZnJvbVwiID8gaXQuY2xpZW50RnJvbUlkIDogaXQuY2xpZW50Q3VycmVudElkO1xyXG4gICAgICBpZiAoaWQpIGlkcy5hZGQoaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG91dCA9IFtdO1xyXG4gICAgY29uc3QgaWRBcnJheSA9IFsuLi5pZHNdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpZEFycmF5Lmxlbmd0aDsgaSArPSAxMCkge1xyXG4gICAgICBjb25zdCBjaHVuayA9IGlkQXJyYXkuc2xpY2UoaSwgaSArIDEwKTtcclxuICAgICAgY29uc3Qgc25hcCA9IGF3YWl0IGRiXHJcbiAgICAgICAgLmNvbGxlY3Rpb24oXCJDbGllbnRcIilcclxuICAgICAgICAud2hlcmUoZmlyZWJhc2UuZmlyZXN0b3JlLkZpZWxkUGF0aC5kb2N1bWVudElkKCksIFwiaW5cIiwgY2h1bmspXHJcbiAgICAgICAgLmdldCgpO1xyXG4gICAgICBzbmFwLmZvckVhY2goKGRvYykgPT4ge1xyXG4gICAgICAgIGNvbnN0IGQgPSBkb2MuZGF0YSgpIHx8IHt9O1xyXG4gICAgICAgIG91dC5wdXNoKHsgaWQ6IGRvYy5pZCwgbmFtZTogZC5uYW1lIHx8IGRvYy5pZCB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc29ydCBieSBuYW1lIGZvciBuaWNlciBVWFxyXG4gICAgb3V0LnNvcnQoKGEsIGIpID0+IChhLm5hbWUgfHwgXCJcIikubG9jYWxlQ29tcGFyZShiLm5hbWUgfHwgXCJcIikpO1xyXG4gICAgcmV0dXJuIG91dDtcclxuICB9XHJcblxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIENMSUVOVCBTRUxFQ1RJT04gSEFORExJTkdcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIFRoaXMgZnVuY3Rpb24gZmV0Y2hlcyBjbGllbnRzIGFuZCBvcGVucyB0aGUgY2xpZW50IG1vZGFsLlxyXG4gIGNvbnN0IGhhbmRsZUNsaWVudENsaWNrID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgbGV0IHNhZmVDbGllbnRzID0gW107XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBjbGllbnRzRGF0YSA9IGF3YWl0IGZldGNoQ2xpZW50cyhzZWxlY3RlZE9FTSwgc2VsZWN0ZWRNb2RhbGl0eSk7XHJcbiAgICAgIHNhZmVDbGllbnRzID0gQXJyYXkuaXNBcnJheShjbGllbnRzRGF0YSkgPyBjbGllbnRzRGF0YSA6IFtdO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICBjb25zb2xlLmVycm9yKFwiZmV0Y2hDbGllbnRzIGZhaWxlZDpcIiwgZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRmFsbGJhY2sgdG8gYnVpbGRpbmcgZnJvbSBsb2FkZWQgaXRlbXMgaWYgQVBJIGdhdmUgdXMgbm90aGluZ1xyXG4gICAgaWYgKHNhZmVDbGllbnRzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGlmICghY2xpZW50U2VsZWN0aW9uVHlwZSkge1xyXG4gICAgICAgICAgLy8gaWYgc29tZWhvdyBub3Qgc2V0IHlldCwgZGVmYXVsdCB0byBcImZyb21cIlxyXG4gICAgICAgICAgc2V0Q2xpZW50U2VsZWN0aW9uVHlwZShcImZyb21cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGRlcml2ZWQgPSBhd2FpdCBidWlsZENsaWVudHNGcm9tSXRlbXMoY2xpZW50U2VsZWN0aW9uVHlwZSB8fCBcImZyb21cIik7XHJcbiAgICAgICAgc2FmZUNsaWVudHMgPSBkZXJpdmVkO1xyXG4gICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkZhbGxiYWNrIGJ1aWxkQ2xpZW50c0Zyb21JdGVtcyBmYWlsZWQ6XCIsIGUpO1xyXG4gICAgICAgIHNhZmVDbGllbnRzID0gW107XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZXRDbGllbnRzKHNhZmVDbGllbnRzKTtcclxuICAgIHNldENsaWVudFNlYXJjaFRlcm0oXCJcIik7XHJcbiAgICBzZXRTaG93Q2xpZW50TW9kYWwodHJ1ZSk7XHJcbiAgfTtcclxuXHJcblxyXG5cclxuICAvLyBXaGVuIGEgY2xpZW50IGlzIHNlbGVjdGVkIGluIHRoZSBtb2RhbCwgd2Ugbm93IGFzc3VtZSB0aGUgcGFyYW1ldGVyIGlzIGEgY2xpZW50IElELlxyXG4gIC8vIElmIHRoZSBwYXNzZWQgdmFsdWUgaXMgbnVsbCwgd2UgY2xlYXIgdGhlIHNlbGVjdGlvbi5cclxuICBjb25zdCBoYW5kbGVDbGllbnRTZWxlY3QgPSBhc3luYyAoY2xpZW50SWQpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKFwiVXNlciBzZWxlY3RlZCBjbGllbnQgaWQ6XCIsIGNsaWVudElkKTtcclxuICAgIGlmICghY2xpZW50SWQpIHtcclxuICAgICAgaWYgKGNsaWVudFNlbGVjdGlvblR5cGUgPT09IFwiZnJvbVwiKSB7XHJcbiAgICAgICAgc2V0Q2xpZW50RnJvbUJ1dHRvblRleHQoXCJTZWxlY3QgT3B0aW9uXCIpO1xyXG4gICAgICAgIHNldFNlbGVjdGVkQ2xpZW50RnJvbShudWxsKTtcclxuICAgICAgfSBlbHNlIGlmIChjbGllbnRTZWxlY3Rpb25UeXBlID09PSBcImN1cnJlbnRcIikge1xyXG4gICAgICAgIHNldENsaWVudEN1cnJlbnRCdXR0b25UZXh0KFwiU2VsZWN0IE9wdGlvblwiKTtcclxuICAgICAgICBzZXRTZWxlY3RlZENsaWVudEN1cnJlbnQobnVsbCk7XHJcbiAgICAgIH1cclxuICAgICAgc2V0U2hvd0NsaWVudE1vZGFsKGZhbHNlKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgY2xpZW50U25hcCA9IGF3YWl0IGZpcmViYXNlLmZpcmVzdG9yZSgpLmNvbGxlY3Rpb24oXCJDbGllbnRcIikuZG9jKGNsaWVudElkKS5nZXQoKTtcclxuICAgICAgaWYgKGNsaWVudFNuYXAuZXhpc3RzKSB7XHJcbiAgICAgICAgY29uc3QgY2xpZW50RGF0YSA9IGNsaWVudFNuYXAuZGF0YSgpO1xyXG4gICAgICAgIGlmIChjbGllbnRTZWxlY3Rpb25UeXBlID09PSBcImZyb21cIikge1xyXG4gICAgICAgICAgc2V0Q2xpZW50RnJvbUJ1dHRvblRleHQoY2xpZW50RGF0YS5uYW1lKTtcclxuICAgICAgICAgIHNldFNlbGVjdGVkQ2xpZW50RnJvbShjbGllbnRJZCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChjbGllbnRTZWxlY3Rpb25UeXBlID09PSBcImN1cnJlbnRcIikge1xyXG4gICAgICAgICAgc2V0Q2xpZW50Q3VycmVudEJ1dHRvblRleHQoY2xpZW50RGF0YS5uYW1lKTtcclxuICAgICAgICAgIHNldFNlbGVjdGVkQ2xpZW50Q3VycmVudChjbGllbnRJZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJObyBjbGllbnQgZG9jdW1lbnQgZm91bmQgZm9yIGlkOlwiLCBjbGllbnRJZCk7XHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBmZXRjaGluZyBjbGllbnQgZGF0YTpcIiwgZXJyb3IpO1xyXG4gICAgfVxyXG4gICAgc2V0U2hvd0NsaWVudE1vZGFsKGZhbHNlKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBoYW5kbGVDbGllbnRJbmZvID0gKGNsaWVudElkLCBjbGllbnROYW1lKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhgQ2xpZW50IElEOiAke2NsaWVudElkfSwgQ2xpZW50IE5hbWU6ICR7Y2xpZW50TmFtZX1gKTtcclxuICAgIHJvdXRlci5wdXNoKFwiY2xpZW50L1wiICsgY2xpZW50SWQpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGhhbmRsZUNsZWFyQ2xpZW50U2VsZWN0aW9uID0gKCkgPT4ge1xyXG4gICAgaWYgKGNsaWVudFNlbGVjdGlvblR5cGUgPT09IFwiZnJvbVwiKSB7XHJcbiAgICAgIHNldENsaWVudEZyb21CdXR0b25UZXh0KFwiU2VsZWN0IE9wdGlvblwiKTtcclxuICAgICAgc2V0U2VsZWN0ZWRDbGllbnRGcm9tKG51bGwpO1xyXG4gICAgfSBlbHNlIGlmIChjbGllbnRTZWxlY3Rpb25UeXBlID09PSBcImN1cnJlbnRcIikge1xyXG4gICAgICBzZXRDbGllbnRDdXJyZW50QnV0dG9uVGV4dChcIlNlbGVjdCBPcHRpb25cIik7XHJcbiAgICAgIHNldFNlbGVjdGVkQ2xpZW50Q3VycmVudChudWxsKTtcclxuICAgIH1cclxuICAgIHNldFNob3dDbGllbnRNb2RhbChmYWxzZSk7XHJcbiAgfTtcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBNT0RFTCBTRUxFQ1RJT04gSEFORExJTkdcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIGNvbnN0IFttb2RlbHMsIHNldE1vZGVsc10gPSB1c2VTdGF0ZShbXSk7XHJcbiAgY29uc3QgW3Nob3dNb2RlbE1vZGFsLCBzZXRTaG93TW9kZWxNb2RhbF0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW21vZGVsQnV0dG9uVGV4dCwgc2V0TW9kZWxCdXR0b25UZXh0XSA9IHVzZVN0YXRlKFwiU2VsZWN0IE9wdGlvblwiKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlTW9kZWxDbGljayA9IGFzeW5jICgpID0+IHtcclxuICAgIGNvbnN0IG1vZGVsc0RhdGEgPSBhd2FpdCBmZXRjaE1vZGVscyhcclxuICAgICAgc2VsZWN0ZWRPRU0sXHJcbiAgICAgIHNlbGVjdGVkTW9kYWxpdHksXHJcbiAgICAgIHNlbGVjdGVkQ2xpZW50RnJvbVxyXG4gICAgKTtcclxuICAgIHNldE1vZGVscyhtb2RlbHNEYXRhKTtcclxuICAgIHNldE1vZGVsU2VhcmNoVGVybShcIlwiKTtcclxuICAgIHNldFNob3dNb2RlbE1vZGFsKHRydWUpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGhhbmRsZU1vZGVsU2VsZWN0ID0gKG1vZGVsTmFtZSkgPT4ge1xyXG4gICAgc2V0TW9kZWxCdXR0b25UZXh0KG1vZGVsTmFtZSB8fCBcIlNlbGVjdCBPcHRpb25cIik7XHJcbiAgICBzZXRTZWxlY3RlZE1vZGVsKG1vZGVsTmFtZSB8fCBudWxsKTtcclxuICAgIHNldFNob3dNb2RlbE1vZGFsKGZhbHNlKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBoYW5kbGVDbGVhck1vZGVsU2VsZWN0aW9uID0gKCkgPT4ge1xyXG4gICAgc2V0TW9kZWxCdXR0b25UZXh0KFwiU2VsZWN0IE9wdGlvblwiKTtcclxuICAgIHNldFNlbGVjdGVkTW9kZWwobnVsbCk7XHJcbiAgICBzZXRTaG93TW9kZWxNb2RhbChmYWxzZSk7XHJcbiAgfTtcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBXQVJFSE9VU0UgQlVUVE9OUyAoZm9yIENsaWVudCBDdXJyZW50KVxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgY29uc3QgaGFuZGxlU29DYWxXYXJlaG91c2VDbGljayA9ICgpID0+IHtcclxuICAgIHNldENsaWVudEN1cnJlbnRCdXR0b25UZXh0KFwiU29DYWwgV2FyZWhvdXNlXCIpO1xyXG4gICAgc2V0U2VsZWN0ZWRDbGllbnRDdXJyZW50KFNPQ0FMX0NMSUVOVF9JRCk7XHJcbiAgICBjb25zb2xlLmxvZyhcIldhcmVob3VzZSBidXR0b24gY2xpY2tlZDogc2V0dGluZyBDbGllbnQgQ3VycmVudCB0b1wiLCBTT0NBTF9DTElFTlRfSUQpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGhhbmRsZU5vckNhbFdhcmVob3VzZUNsaWNrID0gKCkgPT4ge1xyXG4gICAgc2V0Q2xpZW50Q3VycmVudEJ1dHRvblRleHQoXCJOb3JDYWwgV2FyZWhvdXNlXCIpO1xyXG4gICAgc2V0U2VsZWN0ZWRDbGllbnRDdXJyZW50KE5PUkNBTF9DTElFTlRfSUQpO1xyXG4gICAgY29uc29sZS5sb2coXCJXYXJlaG91c2UgYnV0dG9uIGNsaWNrZWQ6IHNldHRpbmcgQ2xpZW50IEN1cnJlbnQgdG9cIiwgTk9SQ0FMX0NMSUVOVF9JRCk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaGFuZGxlV2FyZWhvdXNlVW5hc3NpZ25lZENsaWNrID0gKCkgPT4ge1xyXG4gICAgc2V0Q2xpZW50Q3VycmVudEJ1dHRvblRleHQoXCJVbmFzc2lnbmVkXCIpO1xyXG4gICAgc2V0U2VsZWN0ZWRDbGllbnRDdXJyZW50KFVOQVNTSUdORURfQ0xJRU5UX0lEKTtcclxuICAgIGNvbnNvbGUubG9nKFwiV2FyZWhvdXNlIGJ1dHRvbiBjbGlja2VkOiBzZXR0aW5nIENsaWVudCBDdXJyZW50IHRvXCIsIFVOQVNTSUdORURfQ0xJRU5UX0lEKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBbY2xpZW50U2VhcmNoVGVybSwgc2V0Q2xpZW50U2VhcmNoVGVybV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbbW9kZWxTZWFyY2hUZXJtLCBzZXRNb2RlbFNlYXJjaFRlcm1dID0gdXNlU3RhdGUoXCJcIik7XHJcblxyXG4gIGNvbnN0IGRlbGV0ZUZyb21TdG9yYWdlID0gYXN5bmMgKGl0ZW1JZCkgPT4ge1xyXG4gICAgY29uc3Qgc3RvcmFnZVJlZiA9IGZpcmViYXNlLnN0b3JhZ2UoKS5yZWYoKTtcclxuICAgIGNvbnN0IGZvbGRlclJlZiA9IHN0b3JhZ2VSZWYuY2hpbGQoYFBhcnRzLyR7aXRlbUlkfS9gKTtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IGxpc3RSZXN1bHQgPSBhd2FpdCBmb2xkZXJSZWYubGlzdEFsbCgpO1xyXG4gICAgICBjb25zdCBkZWxldGVQcm9taXNlcyA9IGxpc3RSZXN1bHQuaXRlbXMubWFwKChpdGVtKSA9PiBpdGVtLmRlbGV0ZSgpKTtcclxuICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoZGVsZXRlUHJvbWlzZXMpO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGRlbGV0aW5nIGZyb20gc3RvcmFnZTpcIiwgZXJyb3IpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGNvbnN0IGRlbGV0ZUZyb21QYXJ0c0NvbGxlY3Rpb24gPSBhc3luYyAoaXRlbUlkKSA9PiB7XHJcbiAgICBjb25zdCBkYiA9IGZpcmViYXNlLmZpcmVzdG9yZSgpO1xyXG4gICAgdHJ5IHtcclxuICAgICAgYXdhaXQgZGIuY29sbGVjdGlvbihcIlBhcnRzXCIpLmRvYyhpdGVtSWQpLmRlbGV0ZSgpO1xyXG4gICAgICBjb25zb2xlLmxvZyhgRGVsZXRlZCBpdGVtIGZyb20gUGFydHMgY29sbGVjdGlvbjogJHtpdGVtSWR9YCk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZGVsZXRpbmcgZnJvbSBQYXJ0cyBjb2xsZWN0aW9uOlwiLCBlcnJvcik7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgLy8gICAvLyBTYWZlbHkgY29udmVydCBhbnkgZGF0ZS1pc2ggdmFsdWUgaW50byBhIGNvbXBhcmFibGUgdGltZXN0YW1wIChtcyBzaW5jZSBlcG9jaCkuXHJcbiAgLy8gZnVuY3Rpb24gdG9UaW1lKHZhbHVlKSB7XHJcbiAgLy8gICBpZiAoIXZhbHVlKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgLy8gICAvLyBGaXJlc3RvcmUgVGltZXN0YW1wOiB7IHNlY29uZHMsIG5hbm9zZWNvbmRzIH1cclxuICAvLyAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiYgdmFsdWUuc2Vjb25kcykge1xyXG4gIC8vICAgICB0cnkge1xyXG4gIC8vICAgICAgIHJldHVybiB2YWx1ZS5zZWNvbmRzICogMTAwMDtcclxuICAvLyAgICAgfSBjYXRjaCB7IC8qIGZhbGx0aHJvdWdoICovIH1cclxuICAvLyAgIH1cclxuXHJcbiAgLy8gICAvLyBJZiBhbHJlYWR5IGEgRGF0ZVxyXG4gIC8vICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkgcmV0dXJuIGlzTmFOKHZhbHVlLmdldFRpbWUoKSkgPyBudWxsIDogdmFsdWUuZ2V0VGltZSgpO1xyXG5cclxuICAvLyAgIC8vIElmIHN0cmluZzogdHJ5IElTTyBmaXJzdFxyXG4gIC8vICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikge1xyXG4gIC8vICAgICAvLyB5eXl5LW1tLWRkIChmcm9tIHlvdXIgZm9ybSBpbnB1dHMpXHJcbiAgLy8gICAgIGNvbnN0IGlzbyA9IERhdGUucGFyc2UodmFsdWUpO1xyXG4gIC8vICAgICBpZiAoIWlzTmFOKGlzbykpIHJldHVybiBpc287XHJcblxyXG4gIC8vICAgICAvLyBtbS9kZC95eXl5IGZhbGxiYWNrIChvbGRlciBpdGVtcylcclxuICAvLyAgICAgY29uc3QgcGFydHMgPSB2YWx1ZS5zcGxpdChcIi9cIik7XHJcbiAgLy8gICAgIGlmIChwYXJ0cy5sZW5ndGggPT09IDMpIHtcclxuICAvLyAgICAgICBjb25zdCBbbW0sIGRkLCB5eXl5XSA9IHBhcnRzO1xyXG4gIC8vICAgICAgIGNvbnN0IGFsdCA9IERhdGUucGFyc2UoYCR7eXl5eX0tJHttbX0tJHtkZH1gKTtcclxuICAvLyAgICAgICBpZiAoIWlzTmFOKGFsdCkpIHJldHVybiBhbHQ7XHJcbiAgLy8gICAgIH1cclxuICAvLyAgIH1cclxuXHJcbiAgLy8gICAvLyBDYW5vbmljYWxpemUgYW55IGRhdGUtaXNoIHZhbHVlIHRvICd5eXl5LW1tLWRkJyBzbyBpdCBtYXRjaGVzIDxpbnB1dCB0eXBlPVwiZGF0ZVwiPiB2YWx1ZXNcclxuICAvLyAgIGZ1bmN0aW9uIHRvWU1EKHZhbHVlKSB7XHJcbiAgLy8gICAgIGNvbnN0IHQgPSB0b1RpbWUodmFsdWUpO1xyXG4gIC8vICAgICBpZiAodCA9PSBudWxsKSByZXR1cm4gbnVsbDtcclxuICAvLyAgICAgY29uc3QgZCA9IG5ldyBEYXRlKHQpO1xyXG4gIC8vICAgICBjb25zdCB5eXl5ID0gZC5nZXRGdWxsWWVhcigpO1xyXG4gIC8vICAgICBjb25zdCBtbSA9IFN0cmluZyhkLmdldE1vbnRoKCkgKyAxKS5wYWRTdGFydCgyLCBcIjBcIik7XHJcbiAgLy8gICAgIGNvbnN0IGRkID0gU3RyaW5nKGQuZ2V0RGF0ZSgpKS5wYWRTdGFydCgyLCBcIjBcIik7XHJcbiAgLy8gICAgIHJldHVybiBgJHt5eXl5fS0ke21tfS0ke2RkfWA7XHJcbiAgLy8gICB9XHJcblxyXG5cclxuICAvLyAgIC8vIExhc3QgcmVzb3J0XHJcbiAgLy8gICBjb25zdCB0ID0gRGF0ZS5wYXJzZSh2YWx1ZSk7XHJcbiAgLy8gICByZXR1cm4gaXNOYU4odCkgPyBudWxsIDogdDtcclxuICAvLyB9XHJcblxyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPExvZ2dlZEluPlxyXG4gICAgICB7aXNEZWxldGluZyAmJiAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsb2FkaW5nLW92ZXJsYXlcIj5cclxuICAgICAgICAgIDxTcGlubmVyIGFuaW1hdGlvbj1cImJvcmRlclwiIHJvbGU9XCJzdGF0dXNcIiBjbGFzc05hbWU9XCJzcGlubmVyLWNlbnRlclwiPlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJzci1vbmx5XCI+TG9hZGluZy4uLjwvc3Bhbj5cclxuICAgICAgICAgIDwvU3Bpbm5lcj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgKX1cclxuICAgICAgPE1vZGFsIHNob3c9e3Nob3dEZWxldGVNb2RhbH0gb25IaWRlPXtoYW5kbGVDbG9zZURlbGV0ZU1vZGFsfT5cclxuICAgICAgICA8TW9kYWwuSGVhZGVyIGNsb3NlQnV0dG9uPlxyXG4gICAgICAgICAgPE1vZGFsLlRpdGxlPkNvbmZpcm0gRGVsZXRpb248L01vZGFsLlRpdGxlPlxyXG4gICAgICAgIDwvTW9kYWwuSGVhZGVyPlxyXG4gICAgICAgIDxNb2RhbC5Cb2R5PlxyXG4gICAgICAgICAgQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSB7c2VsZWN0ZWRJdGVtcy5sZW5ndGh9IGl0ZW1cclxuICAgICAgICAgIHtzZWxlY3RlZEl0ZW1zLmxlbmd0aCA+IDEgPyBcInNcIiA6IFwiXCJ9P1xyXG4gICAgICAgIDwvTW9kYWwuQm9keT5cclxuICAgICAgICA8TW9kYWwuRm9vdGVyPlxyXG4gICAgICAgICAgPEJ1dHRvbiB2YXJpYW50PVwiZGFuZ2VyXCIgb25DbGljaz17aGFuZGxlRGVsZXRlU2VsZWN0ZWR9PlxyXG4gICAgICAgICAgICBZZXMsIGRlbGV0ZVxyXG4gICAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgICAgICA8QnV0dG9uIHZhcmlhbnQ9XCJzZWNvbmRhcnlcIiBvbkNsaWNrPXtoYW5kbGVDbG9zZURlbGV0ZU1vZGFsfT5cclxuICAgICAgICAgICAgQ2FuY2VsXHJcbiAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICA8L01vZGFsLkZvb3Rlcj5cclxuICAgICAgPC9Nb2RhbD5cclxuXHJcbiAgICAgIDxNb2RhbCBzaG93PXtzaG93Q2xpZW50TW9kYWx9IG9uSGlkZT17KCkgPT4gc2V0U2hvd0NsaWVudE1vZGFsKGZhbHNlKX0+XHJcbiAgICAgICAgPE1vZGFsLkhlYWRlciBjbG9zZUJ1dHRvbj5cclxuICAgICAgICAgIDxNb2RhbC5UaXRsZT5cclxuICAgICAgICAgICAgU2VsZWN0IHtjbGllbnRTZWxlY3Rpb25UeXBlID09PSBcImZyb21cIiA/IFwiQ2xpZW50IEZyb21cIiA6IFwiQ2xpZW50IEN1cnJlbnRcIn1cclxuICAgICAgICAgIDwvTW9kYWwuVGl0bGU+XHJcbiAgICAgICAgPC9Nb2RhbC5IZWFkZXI+XHJcbiAgICAgICAgPE1vZGFsLkJvZHk+XHJcbiAgICAgICAgICA8Rm9ybUNvbnRyb2xcclxuICAgICAgICAgICAgdHlwZT1cInRleHRcIlxyXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlNlYXJjaCBieSBuYW1lXCJcclxuICAgICAgICAgICAgY2xhc3NOYW1lPVwibWItM1wiXHJcbiAgICAgICAgICAgIHZhbHVlPXtjbGllbnRTZWFyY2hUZXJtfVxyXG4gICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldENsaWVudFNlYXJjaFRlcm0oZS50YXJnZXQudmFsdWUpfVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICAgIDxDbGllbnRUYWJsZVxyXG4gICAgICAgICAgICBjbGllbnRzPXsoQXJyYXkuaXNBcnJheShjbGllbnRzKSA/IGNsaWVudHMgOiBbXSkuZmlsdGVyKFxyXG4gICAgICAgICAgICAgIChjbGllbnQpID0+IChjbGllbnQ/Lm5hbWUgPz8gXCJcIikudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhjbGllbnRTZWFyY2hUZXJtLnRvTG93ZXJDYXNlKCkpXHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgIG9uU2VsZWN0Q2xpZW50PXtoYW5kbGVDbGllbnRTZWxlY3R9XHJcbiAgICAgICAgICAgIG9uSW5mb0NsaWNrPXtoYW5kbGVDbGllbnRJbmZvfVxyXG4gICAgICAgICAgICBpc0NsaWVudFNlYXJjaD17ZmFsc2V9XHJcbiAgICAgICAgICAgIGNsZWFyU2VsZWN0aW9uPXsoKSA9PiBoYW5kbGVDbGllbnRTZWxlY3QobnVsbCl9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvTW9kYWwuQm9keT5cclxuICAgICAgPC9Nb2RhbD5cclxuXHJcbiAgICAgIDxNb2RhbCBzaG93PXtzaG93TW9kZWxNb2RhbH0gb25IaWRlPXsoKSA9PiBzZXRTaG93TW9kZWxNb2RhbChmYWxzZSl9PlxyXG4gICAgICAgIDxNb2RhbC5IZWFkZXIgY2xvc2VCdXR0b24+XHJcbiAgICAgICAgICA8TW9kYWwuVGl0bGU+U2VsZWN0IE1vZGVsPC9Nb2RhbC5UaXRsZT5cclxuICAgICAgICA8L01vZGFsLkhlYWRlcj5cclxuICAgICAgICA8TW9kYWwuQm9keT5cclxuICAgICAgICAgIDxGb3JtQ29udHJvbFxyXG4gICAgICAgICAgICB0eXBlPVwidGV4dFwiXHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoIGJ5IG5hbWVcIlxyXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJtYi0zXCJcclxuICAgICAgICAgICAgdmFsdWU9e21vZGVsU2VhcmNoVGVybX1cclxuICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRNb2RlbFNlYXJjaFRlcm0oZS50YXJnZXQudmFsdWUpfVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICAgIDxNb2RlbFRhYmxlXHJcbiAgICAgICAgICAgIG1vZGVscz17bW9kZWxzLmZpbHRlcigobW9kZWwpID0+XHJcbiAgICAgICAgICAgICAgdHlwZW9mIG1vZGVsID09PSBcInN0cmluZ1wiXHJcbiAgICAgICAgICAgICAgICA/IG1vZGVsLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMobW9kZWxTZWFyY2hUZXJtLnRvTG93ZXJDYXNlKCkpXHJcbiAgICAgICAgICAgICAgICA6IGZhbHNlXHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgIG9uU2VsZWN0TW9kZWw9e2hhbmRsZU1vZGVsU2VsZWN0fVxyXG4gICAgICAgICAgICBjbGVhclNlbGVjdGlvbj17KCkgPT4gaGFuZGxlTW9kZWxTZWxlY3QobnVsbCl9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvTW9kYWwuQm9keT5cclxuICAgICAgPC9Nb2RhbD5cclxuXHJcbiAgICAgIDxDb250YWluZXJcclxuICAgICAgICBjbGFzc05hbWU9XCJkLWZsZXggYWxpZ24taXRlbXMtY2VudGVyIGp1c3RpZnktY29udGVudC1jZW50ZXJcIlxyXG4gICAgICAgIHN0eWxlPXt7IG1pbkhlaWdodDogXCIxMDB2aFwiIH19XHJcbiAgICAgID5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctMTAwXCIgc3R5bGU9e3sgbWF4V2lkdGg6IFwiMTIwMHB4XCIgfX0+XHJcbiAgICAgICAgICA8Q2FyZD5cclxuICAgICAgICAgICAgPENhcmQuQm9keT5cclxuICAgICAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXIgbWItNFwiPk1hZ21vPC9oMj5cclxuICAgICAgICAgICAgICA8Um93PlxyXG4gICAgICAgICAgICAgICAgPENvbCBtZD17NH0+XHJcbiAgICAgICAgICAgICAgICAgIHsvKiBEcm9wZG93bnMgKi99XHJcbiAgICAgICAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPElucHV0R3JvdXAgY2xhc3NOYW1lPVwibWItM1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPElucHV0R3JvdXAuVGV4dD5PRU08L0lucHV0R3JvdXAuVGV4dD5cclxuICAgICAgICAgICAgICAgICAgICAgIDxEcm9wZG93biBvblNlbGVjdD17aGFuZGxlU2VsZWN0MX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxEcm9wZG93bi5Ub2dnbGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB2YXJpYW50PVwib3V0bGluZS1zZWNvbmRhcnlcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlkPVwiZHJvcGRvd24tYnV0dG9uLTFcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctMTAwXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtkcm9wZG93bjFUZXh0fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L0Ryb3Bkb3duLlRvZ2dsZT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPERyb3Bkb3duLk1lbnUgY2xhc3NOYW1lPVwidy0xMDBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8RHJvcGRvd24uSXRlbSBldmVudEtleT1cInVuYXNzaWduZWRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNlbGVjdCBPcHRpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L0Ryb3Bkb3duLkl0ZW0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPERyb3Bkb3duLkl0ZW0gZXZlbnRLZXk9XCJHRVwiPkdFPC9Ecm9wZG93bi5JdGVtPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxEcm9wZG93bi5JdGVtIGV2ZW50S2V5PVwiVG9zaGliYVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVG9zaGliYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvRHJvcGRvd24uSXRlbT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8RHJvcGRvd24uSXRlbSBldmVudEtleT1cIlNpZW1lbnNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNpZW1lbnNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L0Ryb3Bkb3duLkl0ZW0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPERyb3Bkb3duLkl0ZW0gZXZlbnRLZXk9XCJQaGlsaXBzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBQaGlsaXBzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Ecm9wZG93bi5JdGVtPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L0Ryb3Bkb3duLk1lbnU+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L0Ryb3Bkb3duPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvSW5wdXRHcm91cD5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPElucHV0R3JvdXAgY2xhc3NOYW1lPVwibWItNVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPElucHV0R3JvdXAuVGV4dD5Nb2RhbGl0eTwvSW5wdXRHcm91cC5UZXh0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgPERyb3Bkb3duIG9uU2VsZWN0PXtoYW5kbGVTZWxlY3QyfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPERyb3Bkb3duLlRvZ2dsZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhbnQ9XCJvdXRsaW5lLXNlY29uZGFyeVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ9XCJkcm9wZG93bi1idXR0b24tMlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy0xMDBcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAge2Ryb3Bkb3duMlRleHR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvRHJvcGRvd24uVG9nZ2xlPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8RHJvcGRvd24uTWVudSBjbGFzc05hbWU9XCJ3LTEwMFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxEcm9wZG93bi5JdGVtIGV2ZW50S2V5PVwidW5hc3NpZ25lZFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgU2VsZWN0IE9wdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvRHJvcGRvd24uSXRlbT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8RHJvcGRvd24uSXRlbSBldmVudEtleT1cIkNUXCI+Q1Q8L0Ryb3Bkb3duLkl0ZW0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPERyb3Bkb3duLkl0ZW0gZXZlbnRLZXk9XCJNUklcIj5NUkk8L0Ryb3Bkb3duLkl0ZW0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvRHJvcGRvd24uTWVudT5cclxuICAgICAgICAgICAgICAgICAgICAgIDwvRHJvcGRvd24+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9JbnB1dEdyb3VwPlxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuZGl2aWRlcn0+PC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICB7LyogQ2xpZW50IHNlbGVjdGlvbiBib3hlcyAqL31cclxuICAgICAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICA8SW5wdXRHcm91cCBjbGFzc05hbWU9XCJtYi0zXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8SW5wdXRHcm91cC5UZXh0PkNsaWVudCBGcm9tPC9JbnB1dEdyb3VwLlRleHQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8QnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhbnQ9XCJvdXRsaW5lLXNlY29uZGFyeVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctMTAwXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlQ2xpZW50Q2xpY2soXCJmcm9tXCIpfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAge2NsaWVudEZyb21CdXR0b25UZXh0fVxyXG4gICAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9JbnB1dEdyb3VwPlxyXG4gICAgICAgICAgICAgICAgICAgIDxJbnB1dEdyb3VwIGNsYXNzTmFtZT1cIm1iLTNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxJbnB1dEdyb3VwLlRleHQ+Q2xpZW50IEN1cnJlbnQ8L0lucHV0R3JvdXAuVGV4dD5cclxuICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b25cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFudD1cIm91dGxpbmUtc2Vjb25kYXJ5XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy0xMDBcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVDbGllbnRDbGljayhcImN1cnJlbnRcIil9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7Y2xpZW50Q3VycmVudEJ1dHRvblRleHR9XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8L0lucHV0R3JvdXA+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDxJbnB1dEdyb3VwIGNsYXNzTmFtZT1cIm1iLTNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxJbnB1dEdyb3VwLlRleHQ+TW9kZWw8L0lucHV0R3JvdXAuVGV4dD5cclxuICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b25cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFudD1cIm91dGxpbmUtc2Vjb25kYXJ5XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy0xMDBcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVNb2RlbENsaWNrfVxyXG4gICAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7bW9kZWxCdXR0b25UZXh0fVxyXG4gICAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9JbnB1dEdyb3VwPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmRpdmlkZXJ9PjwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICB7LyogV2FyZWhvdXNlIGJ1dHRvbnMgZm9yIENsaWVudCBDdXJyZW50ICovfVxyXG4gICAgICAgICAgICAgICAgICAgIDxJbnB1dEdyb3VwIGNsYXNzTmFtZT1cIm1iLTNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxJbnB1dEdyb3VwLlRleHQ+V2FyZWhvdXNlPC9JbnB1dEdyb3VwLlRleHQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmJ1dHRvbkdyb3VwfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhbnQ9XCJvdXRsaW5lLXNlY29uZGFyeVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMuZmxleEJ1dHRvbn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVTb0NhbFdhcmVob3VzZUNsaWNrfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgU29DYWwgV2FyZWhvdXNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8QnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFudD1cIm91dGxpbmUtc2Vjb25kYXJ5XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5mbGV4QnV0dG9ufVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZU5vckNhbFdhcmVob3VzZUNsaWNrfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgTm9yQ2FsIFdhcmVob3VzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhbnQ9XCJvdXRsaW5lLXNlY29uZGFyeVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMuZmxleEJ1dHRvbn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVXYXJlaG91c2VVbmFzc2lnbmVkQ2xpY2t9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICBVbmFzc2lnbmVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9JbnB1dEdyb3VwPlxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvQ29sPlxyXG5cclxuICAgICAgICAgICAgICAgIDxDb2wgbWQ9ezh9PlxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnRhYmxlQ29udGFpbmVyfT5cclxuICAgICAgICAgICAgICAgICAgICB7aXNMb2FkaW5nID8gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkLWZsZXgganVzdGlmeS1jb250ZW50LWNlbnRlciBhbGlnbi1pdGVtcy1jZW50ZXIgcC01XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbWdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBzcmM9XCIvbWFnbW8tbG9nby5wbmdcIiAvLyBtYWtlIHN1cmUgaXQncyBpbiAvcHVibGljXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYWx0PVwiTG9hZGluZyBNYWdtb1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA2NCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogNjQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRpb246IFwibWFnbW8tc3BpbiAxcyBsaW5lYXIgaW5maW5pdGVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybU9yaWdpbjogXCI1MCUgNTAlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBcImJsb2NrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsvKiBnbG9iYWwgc28gc3R5bGVkLWpzeCBkb2Vzbid0IGhhc2ggdGhlIG5hbWUgKi99XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzdHlsZSBqc3ggZ2xvYmFsPntgXHJcbiAgICAgIEBrZXlmcmFtZXMgbWFnbW8tc3BpbiB7XHJcbiAgICAgICAgZnJvbSB7XHJcbiAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdG8ge1xyXG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIGB9PC9zdHlsZT5cclxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICA8UGFydFRhYmxlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZm89e2luZm99XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVscz17bGFiZWxzfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZHM9e2lkc31cclxuICAgICAgICAgICAgICAgICAgICAgICAgaG92ZXJTdHlsZT17aG92ZXJTdHlsZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgc29ydENoZWNrQWxsPXtzb3J0Q2hlY2tBbGx9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrRGVsZXRlPXtjaGVja0RlbGV0ZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNEZWxldGluZz17aXNEZWxldGluZ31cclxuICAgICAgICAgICAgICAgICAgICAgICAgcm93U2VsZWN0PXtyb3dTZWxlY3R9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldEhvdmVySW5kZXg9e3NldEhvdmVySW5kZXh9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhvdmVySW5kZXg9e2hvdmVySW5kZXh9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkSXRlbXM9e3NlbGVjdGVkSXRlbXN9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFNlbGVjdGVkSXRlbXM9e3NldFNlbGVjdGVkSXRlbXN9XHJcbiAgICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgICl9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnNlYXJjaENvbnRhaW5lcn0+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8Rm9ybSBjbGFzc05hbWU9XCJkLWZsZXggcGItMlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2xcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPXtzaG93TGlzdFNlYXJjaH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlNlYXJjaFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibWUtMiBmbGV4LWdyb3ctMVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD1cIlNlYXJjaFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3NlYXJjaH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17c2VhcmNoQ2hhbmdlSGFuZGxlcn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyBmbGV4OiBcIjFcIiB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8TmF2RHJvcGRvd25cclxuICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZT17c2VsZWN0fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlkPVwiY29sbGFzaWJsZS1uYXYtZHJvcGRvd25cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNob3c9e3Nob3dMaXN0fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uTW91c2VFbnRlcj17KCkgPT4gc2V0U2hvd0xpc3QodHJ1ZSl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25Nb3VzZUxlYXZlPXsoKSA9PiBzZXRTaG93TGlzdChmYWxzZSl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgbWFyZ2luVG9wOiBcIi01cHhcIiB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPE5hdkRyb3Bkb3duLkl0ZW0gb25DbGljaz17KCkgPT4geyBzZXRTZWxlY3QoXCJOYW1lXCIpOyBzZXRTaG93TGlzdFNlYXJjaChcInRleHRcIik7IH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTmFtZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvTmF2RHJvcGRvd24uSXRlbT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8TmF2RHJvcGRvd24uSXRlbSBvbkNsaWNrPXsoKSA9PiB7IHNldFNlbGVjdChcIkRhdGVcIik7IHNldFNob3dMaXN0U2VhcmNoKFwiZGF0ZVwiKTsgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBEYXRlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9OYXZEcm9wZG93bi5JdGVtPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxOYXZEcm9wZG93bi5JdGVtIG9uQ2xpY2s9eygpID0+IHsgc2V0U2VsZWN0KFwiV29yayBPcmRlclwiKTsgc2V0U2hvd0xpc3RTZWFyY2goXCJudW1iZXJcIik7IH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgV29yayBPcmRlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvTmF2RHJvcGRvd24uSXRlbT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8TmF2RHJvcGRvd24uSXRlbSBvbkNsaWNrPXsoKSA9PiB7IHNldFNlbGVjdChcIlByb2R1Y3QgTnVtYmVyXCIpOyBzZXRTaG93TGlzdFNlYXJjaChcIm51bWJlclwiKTsgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBQcm9kdWN0IE51bWJlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvTmF2RHJvcGRvd24uSXRlbT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8TmF2RHJvcGRvd24uSXRlbSBvbkNsaWNrPXsoKSA9PiB7IHNldFNlbGVjdChcIkRlc2NyaXB0aW9uXCIpOyBzZXRTaG93TGlzdFNlYXJjaChcInRleHRcIik7IH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRGVzY3JpcHRpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L05hdkRyb3Bkb3duLkl0ZW0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPE5hdkRyb3Bkb3duLkl0ZW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2VsZWN0KFwiU0tVXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTaG93TGlzdFNlYXJjaChcInRleHRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNLVVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvTmF2RHJvcGRvd24uSXRlbT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9OYXZEcm9wZG93bj5cclxuICAgICAgICAgICAgICAgICAgICAgIDwvRm9ybT5cclxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZC1mbGV4IGp1c3RpZnktY29udGVudC1iZXR3ZWVuXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxMb2FkaW5nQnV0dG9uIHR5cGU9XCJzZWNvbmRhcnlcIiBuYW1lPVwiQWRkIE5ldyBJdGVtXCIgcm91dGU9XCJOZXdTZWFyY2gvQWRkSXRlbS9OZXdJdGVtXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPExvYWRpbmdCdXR0b24gdHlwZT1cInByaW1hcnlcIiBuYW1lPVwiQmFja1wiIHJvdXRlPVwiV2FyZWhvdXNlZGIvV2FyZWhvdXNlU2VsZWN0XCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvQ29sPlxyXG4gICAgICAgICAgICAgIDwvUm93PlxyXG4gICAgICAgICAgICA8L0NhcmQuQm9keT5cclxuICAgICAgICAgIDwvQ2FyZD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9Db250YWluZXI+XHJcbiAgICA8L0xvZ2dlZEluPlxyXG4gICk7XHJcblxyXG5cclxufVxyXG5cclxuIiwiLy8gRXhwb3J0c1xubW9kdWxlLmV4cG9ydHMgPSB7XG5cdFwiY2xpZW50VGFibGVDb250YWluZXJcIjogXCJDbGllbnRUYWJsZV9jbGllbnRUYWJsZUNvbnRhaW5lcl9fMWU5dW5cIixcblx0XCJjbGllbnRUYWJsZVwiOiBcIkNsaWVudFRhYmxlX2NsaWVudFRhYmxlX18xOTR2N1wiLFxuXHRcImJ1dHRvbkdyb3VwXCI6IFwiQ2xpZW50VGFibGVfYnV0dG9uR3JvdXBfX3BTWjd5XCIsXG5cdFwiZmxleEJ1dHRvblwiOiBcIkNsaWVudFRhYmxlX2ZsZXhCdXR0b25fX0xvTmlTXCJcbn07XG4iLCIvLyBFeHBvcnRzXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0XCJsb2FkaW5nLW92ZXJsYXlcIjogXCJNYWluU2VhcmNoX2xvYWRpbmctb3ZlcmxheV9fMTI2MDVcIixcblx0XCJzcGlubmVyLWNlbnRlclwiOiBcIk1haW5TZWFyY2hfc3Bpbm5lci1jZW50ZXJfXzNldnVDXCIsXG5cdFwiZGl2aWRlclwiOiBcIk1haW5TZWFyY2hfZGl2aWRlcl9fM3JTU1VcIixcblx0XCJ0YWJsZUNvbnRhaW5lclwiOiBcIk1haW5TZWFyY2hfdGFibGVDb250YWluZXJfX0xEMThQXCIsXG5cdFwic2Nyb2xsYWJsZVRhYmxlXCI6IFwiTWFpblNlYXJjaF9zY3JvbGxhYmxlVGFibGVfX0V0RGVkXCIsXG5cdFwic3RpY2t5SGVhZGVyXCI6IFwiTWFpblNlYXJjaF9zdGlja3lIZWFkZXJfXzNVbWdJXCIsXG5cdFwic2VhcmNoQ29udGFpbmVyXCI6IFwiTWFpblNlYXJjaF9zZWFyY2hDb250YWluZXJfXzF4Sm51XCIsXG5cdFwiYnV0dG9uR3JvdXBcIjogXCJNYWluU2VhcmNoX2J1dHRvbkdyb3VwX18xR1dJNlwiLFxuXHRcImZsZXhCdXR0b25cIjogXCJNYWluU2VhcmNoX2ZsZXhCdXR0b25fXzN6bnFEXCJcbn07XG4iLCIvLyBFeHBvcnRzXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0XCJ0YWJsZUNvbnRhaW5lclwiOiBcIlBhcnRUYWJsZV90YWJsZUNvbnRhaW5lcl9fMThUQ2dcIixcblx0XCJzY3JvbGxhYmxlVGFibGVcIjogXCJQYXJ0VGFibGVfc2Nyb2xsYWJsZVRhYmxlX18yVHliV1wiLFxuXHRcInN0aWNreUhlYWRlclwiOiBcIlBhcnRUYWJsZV9zdGlja3lIZWFkZXJfXzFISksxXCIsXG5cdFwic2VhcmNoQ29udGFpbmVyXCI6IFwiUGFydFRhYmxlX3NlYXJjaENvbnRhaW5lcl9fMnI3YWtcIixcblx0XCJkaXZpZGVyXCI6IFwiUGFydFRhYmxlX2RpdmlkZXJfXzFReENxXCIsXG5cdFwiYnV0dG9uR3JvdXBcIjogXCJQYXJ0VGFibGVfYnV0dG9uR3JvdXBfXzNaZk9PXCIsXG5cdFwiZmxleEJ1dHRvblwiOiBcIlBhcnRUYWJsZV9mbGV4QnV0dG9uX18ycG8yZVwiLFxuXHRcImZpeGVkVGFibGVcIjogXCJQYXJ0VGFibGVfZml4ZWRUYWJsZV9fM2hKQ2NcIixcblx0XCJjZWxsQ2xhbXBcIjogXCJQYXJ0VGFibGVfY2VsbENsYW1wX18zaXRYTVwiLFxuXHRcImFjdGlvbkNvbFwiOiBcIlBhcnRUYWJsZV9hY3Rpb25Db2xfXzJ4ZlBiXCJcbn07XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBUYWJsZSwgQnV0dG9uIH0gZnJvbSBcInJlYWN0LWJvb3RzdHJhcFwiO1xuaW1wb3J0IHN0eWxlcyBmcm9tIFwiLi4vc3R5bGVzL0NsaWVudFRhYmxlLm1vZHVsZS5jc3NcIjtcblxuY29uc3QgQ2xpZW50VGFibGUgPSAoe1xuICBjbGllbnRzLFxuICBvblNlbGVjdENsaWVudCxcbiAgb25JbmZvQ2xpY2ssXG4gIGNsZWFyU2VsZWN0aW9uLFxuICBvbkFkZENsaWVudCwgLy8gbmV3IHByb3AgZm9yIGFkZC1uZXctY2xpZW50IGFjdGlvblxuICBkaXNhYmxlU2VsZWN0LFxuICBkaXNhYmxlSW5mbyxcbiAgaXNDbGllbnRTZWFyY2gsXG59KSA9PiB7XG4gIHJldHVybiAoXG4gICAgPFRhYmxlIHN0cmlwZWQgYm9yZGVyZWQgaG92ZXIgc2l6ZT1cInNtXCIgY2xhc3NOYW1lPXtzdHlsZXMuY2xpZW50VGFibGV9PlxuICAgICAgPHRoZWFkPlxuICAgICAgICA8dHI+XG4gICAgICAgICAgPHRoPkNsaWVudCBOYW1lPC90aD5cbiAgICAgICAgICB7IWRpc2FibGVJbmZvICYmIDx0aD5JbmZvPC90aD59XG4gICAgICAgICAgeyFkaXNhYmxlU2VsZWN0ICYmIDx0aD5TZWxlY3Q8L3RoPn1cbiAgICAgICAgPC90cj5cbiAgICAgIDwvdGhlYWQ+XG4gICAgICA8dGJvZHk+XG4gICAgICAgIDx0cj5cbiAgICAgICAgICA8dGQgY29sU3Bhbj1cIjNcIiBzdHlsZT17eyB0ZXh0QWxpZ246IFwiY2VudGVyXCIgfX0+XG4gICAgICAgICAgICA8QnV0dG9uIHZhcmlhbnQ9XCJzZWNvbmRhcnlcIiBvbkNsaWNrPXtjbGVhclNlbGVjdGlvbn0+XG4gICAgICAgICAgICAgIENsZWFyIFNlbGVjdGlvblxuICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICB7LyogTmV3IEFkZCBOZXcgQ2xpZW50IGJ1dHRvbiAqL31cbiAgICAgICAgICAgIDxCdXR0b24gdmFyaWFudD1cInByaW1hcnlcIiBvbkNsaWNrPXtvbkFkZENsaWVudH0gY2xhc3NOYW1lPVwibXMtMlwiPlxuICAgICAgICAgICAgICBBZGQgTmV3IENsaWVudFxuICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgPC90ZD5cbiAgICAgICAgPC90cj5cbiAgICAgICAge2NsaWVudHMubWFwKChjbGllbnQpID0+IChcbiAgICAgICAgICA8dHIga2V5PXtjbGllbnQuaWR9PlxuICAgICAgICAgICAgPHRkPntjbGllbnQubmFtZX08L3RkPlxuICAgICAgICAgICAgeyFkaXNhYmxlSW5mbyAmJiAoXG4gICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgICAgICB2YXJpYW50PVwiaW5mb1wiXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBvbkluZm9DbGljayhjbGllbnQuaWQsIGNsaWVudC5uYW1lKX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICB7aXNDbGllbnRTZWFyY2ggPyBcIkVkaXRcIiA6IFwiSW5mb1wifVxuICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIHshZGlzYWJsZVNlbGVjdCAmJiAoXG4gICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgICAgICB2YXJpYW50PVwicHJpbWFyeVwiXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBvblNlbGVjdENsaWVudChjbGllbnQuaWQpfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIFNlbGVjdFxuICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L3RyPlxuICAgICAgICApKX1cbiAgICAgIDwvdGJvZHk+XG4gICAgPC9UYWJsZT5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENsaWVudFRhYmxlO1xuIiwiLy8gY29tcG9uZW50cy9Nb2RlbFRhYmxlLmpzXG5pbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBUYWJsZSwgQnV0dG9uLCBGb3JtQ29udHJvbCB9IGZyb20gXCJyZWFjdC1ib290c3RyYXBcIjtcbmltcG9ydCBzdHlsZXMgZnJvbSBcIi4uL3N0eWxlcy9DbGllbnRUYWJsZS5tb2R1bGUuY3NzXCI7XG5cbmNvbnN0IE1vZGVsVGFibGUgPSAoeyBtb2RlbHMsIG9uU2VsZWN0TW9kZWwsIGNsZWFyU2VsZWN0aW9uIH0pID0+IHtcbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPFRhYmxlIHN0cmlwZWQgYm9yZGVyZWQgaG92ZXIgc2l6ZT1cInNtXCIgY2xhc3NOYW1lPXtzdHlsZXMubW9kZWxUYWJsZX0+XG4gICAgICAgIDx0aGVhZD5cbiAgICAgICAgICA8dHI+XG4gICAgICAgICAgICA8dGg+TW9kZWwgTmFtZTwvdGg+XG4gICAgICAgICAgICA8dGg+U2VsZWN0PC90aD5cbiAgICAgICAgICA8L3RyPlxuICAgICAgICA8L3RoZWFkPlxuICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgPHRyPlxuICAgICAgICAgICAgPHRkIGNvbFNwYW49XCIyXCIgc3R5bGU9e3sgdGV4dEFsaWduOiBcImNlbnRlclwiIH19PlxuICAgICAgICAgICAgICA8QnV0dG9uIHZhcmlhbnQ9XCJzZWNvbmRhcnlcIiBvbkNsaWNrPXtjbGVhclNlbGVjdGlvbn0+XG4gICAgICAgICAgICAgICAgQ2xlYXIgU2VsZWN0aW9uXG4gICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICA8L3RyPlxuICAgICAgICAgIHttb2RlbHMubWFwKChtb2RlbCwgaW5kZXgpID0+IChcbiAgICAgICAgICAgIDx0ciBrZXk9e2luZGV4fT5cbiAgICAgICAgICAgICAgPHRkPnttb2RlbH08L3RkPlxuICAgICAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICAgICAgPEJ1dHRvbiB2YXJpYW50PVwicHJpbWFyeVwiIG9uQ2xpY2s9eygpID0+IG9uU2VsZWN0TW9kZWwobW9kZWwpfT5cbiAgICAgICAgICAgICAgICAgIFNlbGVjdFxuICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC90Ym9keT5cbiAgICAgIDwvVGFibGU+XG4gICAgPC8+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBNb2RlbFRhYmxlO1xuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBUYWJsZSwgQnV0dG9uLCBGb3JtIH0gZnJvbSBcInJlYWN0LWJvb3RzdHJhcFwiO1xuaW1wb3J0IHsgZm9ybWF0RGF0ZSB9IGZyb20gXCIuL2ZldGNoQXNzb2NpYXRpb25zXCI7XG5pbXBvcnQgc3R5bGVzIGZyb20gXCIuLi9zdHlsZXMvUGFydFRhYmxlLm1vZHVsZS5jc3NcIjtcblxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBQYXJ0VGFibGUoe1xuICBpbmZvLFxuICBsYWJlbHMsXG4gIGlkcyxcbiAgaG92ZXJTdHlsZSxcbiAgc29ydENoZWNrQWxsLFxuICBjaGVja0RlbGV0ZSxcbiAgaXNEZWxldGluZyxcbiAgcm93U2VsZWN0LFxuICBzZXRIb3ZlckluZGV4LFxuICBob3ZlckluZGV4LFxuICBzZWxlY3RlZEl0ZW1zLFxuICBzZXRTZWxlY3RlZEl0ZW1zLFxufSkge1xuICAvLyBjb25zdCBbc2VsZWN0ZWRJdGVtcywgc2V0U2VsZWN0ZWRJdGVtc10gPSB1c2VTdGF0ZShbXSk7XG5cbiAgLy8gVG9nZ2xlIHNlbGVjdGlvbiBvZiBpdGVtc1xuICBjb25zdCBoYW5kbGVTZWxlY3RJdGVtID0gKGlkKSA9PiB7XG4gICAgc2V0U2VsZWN0ZWRJdGVtcygocHJldlNlbGVjdGVkSXRlbXMpID0+XG4gICAgICBwcmV2U2VsZWN0ZWRJdGVtcy5pbmNsdWRlcyhpZClcbiAgICAgICAgPyBwcmV2U2VsZWN0ZWRJdGVtcy5maWx0ZXIoKGl0ZW1JZCkgPT4gaXRlbUlkICE9PSBpZClcbiAgICAgICAgOiBbLi4ucHJldlNlbGVjdGVkSXRlbXMsIGlkXVxuICAgICk7XG4gIH07XG5cbiAgLy8gSGFuZGxlIGRlbGV0ZSBidXR0b24gY2xpY2sgZm9yIHNlbGVjdGVkIGl0ZW1zXG4gIGNvbnN0IGhhbmRsZURlbGV0ZVNlbGVjdGVkID0gKCkgPT4ge1xuICAgIGlmIChzZWxlY3RlZEl0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICAgIGNoZWNrRGVsZXRlKG51bGwsIG51bGwsIHNlbGVjdGVkSXRlbXMsIFwic2VsZWN0ZWQgaXRlbXNcIik7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5zY3JvbGxhYmxlVGFibGV9PlxuICAgICAgPFRhYmxlIHN0cmlwZWQgYm9yZGVyZWQgaG92ZXIgc2l6ZT1cInNtXCIgY2xhc3NOYW1lPXtgbWItMCAke3N0eWxlcy5maXhlZFRhYmxlfWB9PlxuICAgICAgICA8dGhlYWQgY2xhc3NOYW1lPXtzdHlsZXMuc3RpY2t5SGVhZGVyfT5cbiAgICAgICAgICA8dHI+XG4gICAgICAgICAgICB7bGFiZWxzLm1hcCgoaXRlbSwgaW5kZXgpID0+IChcbiAgICAgICAgICAgICAgPHRoXG4gICAgICAgICAgICAgICAgc3R5bGU9e2hvdmVyU3R5bGUoaW5kZXgpfVxuICAgICAgICAgICAgICAgIG9uTW91c2VPdmVyPXsoKSA9PiBzZXRIb3ZlckluZGV4KGluZGV4KX1cbiAgICAgICAgICAgICAgICBvbk1vdXNlT3V0PXsoKSA9PiBzZXRIb3ZlckluZGV4KG51bGwpfVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNvcnRDaGVja0FsbChpbmRleCl9XG4gICAgICAgICAgICAgICAga2V5PXtpbmRleH1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHtpdGVtfVxuICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8dGggY2xhc3NOYW1lPXtzdHlsZXMuYWN0aW9uQ29sfSBzdHlsZT17eyB0ZXh0QWxpZ246IFwiY2VudGVyXCIgfX0+XG4gICAgICAgICAgICAgIHtzZWxlY3RlZEl0ZW1zLmxlbmd0aCA+IDAgPyAoXG4gICAgICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICAgICAgdmFyaWFudD1cImRhbmdlclwiXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVEZWxldGVTZWxlY3RlZH1cbiAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtpc0RlbGV0aW5nfVxuICAgICAgICAgICAgICAgICAgc2l6ZT1cInNtXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICBEZWxldGUgU2VsZWN0ZWQgKHtzZWxlY3RlZEl0ZW1zLmxlbmd0aH0pXG4gICAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgXCJzZWxlY3RcIlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICA8L3RyPlxuICAgICAgICA8L3RoZWFkPlxuICAgICAgICA8dGJvZHk+XG4gICAgICAgICAge2luZm8ubWFwKChpdGVtLCBpbmRleCkgPT4gKFxuICAgICAgICAgICAgPHRyXG4gICAgICAgICAgICAgIGtleT17aW5kZXh9XG4gICAgICAgICAgICAgIG9uQ2xpY2s9eyhlKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gT25seSB0cmlnZ2VyIHJvd1NlbGVjdCBpZiB0aGUgdGFyZ2V0IGlzIG5vdCBhIGNoZWNrYm94XG4gICAgICAgICAgICAgICAgaWYgKGUudGFyZ2V0LnR5cGUgIT09IFwiY2hlY2tib3hcIikge1xuICAgICAgICAgICAgICAgICAgcm93U2VsZWN0KGl0ZW0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiY2xpY2thYmxlLXJvd1wiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyB0ZXh0QWxpZ246IFwiY2VudGVyXCIsIGN1cnNvcjogXCJkZWZhdWx0XCIgfX0+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5jZWxsQ2xhbXB9IHRpdGxlPXtpdGVtLm5hbWV9PlxuICAgICAgICAgICAgICAgICAge2l0ZW0ubmFtZX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHRleHRBbGlnbjogXCJjZW50ZXJcIiwgY3Vyc29yOiBcImRlZmF1bHRcIiB9fT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmNlbGxDbGFtcH0gdGl0bGU9e2Zvcm1hdERhdGUoaXRlbS5kYXRlKX0+XG4gICAgICAgICAgICAgICAgICB7Zm9ybWF0RGF0ZShpdGVtLmRhdGUpfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgdGV4dEFsaWduOiBcImNlbnRlclwiLCBjdXJzb3I6IFwiZGVmYXVsdFwiIH19PlxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17c3R5bGVzLmNlbGxDbGFtcH1cbiAgICAgICAgICAgICAgICAgIHRpdGxlPXtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS53b3JrT3JkZXJzICYmIGl0ZW0ud29ya09yZGVycy5sZW5ndGggPiAwXG4gICAgICAgICAgICAgICAgICAgICAgPyBpdGVtLndvcmtPcmRlcnNbaXRlbS53b3JrT3JkZXJzLmxlbmd0aCAtIDFdLndvcmtPcmRlclxuICAgICAgICAgICAgICAgICAgICAgIDogXCJOL0FcIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIHtpdGVtLndvcmtPcmRlcnMgJiYgaXRlbS53b3JrT3JkZXJzLmxlbmd0aCA+IDBcbiAgICAgICAgICAgICAgICAgICAgPyBpdGVtLndvcmtPcmRlcnNbaXRlbS53b3JrT3JkZXJzLmxlbmd0aCAtIDFdLndvcmtPcmRlclxuICAgICAgICAgICAgICAgICAgICA6IFwiTi9BXCJ9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyB0ZXh0QWxpZ246IFwiY2VudGVyXCIsIGN1cnNvcjogXCJkZWZhdWx0XCIgfX0+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5jZWxsQ2xhbXB9IHRpdGxlPXtpdGVtLnBufT5cbiAgICAgICAgICAgICAgICAgIHtpdGVtLnBufVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgdGV4dEFsaWduOiBcImNlbnRlclwiLCBjdXJzb3I6IFwiZGVmYXVsdFwiIH19PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuY2VsbENsYW1wfSB0aXRsZT17aXRlbS5zbn0+XG4gICAgICAgICAgICAgICAgICB7aXRlbS5zbn1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT17c3R5bGVzLmFjdGlvbkNvbH0gc3R5bGU9e3sgdGV4dEFsaWduOiBcImNlbnRlclwiIH19PlxuICAgICAgICAgICAgICAgIDxGb3JtLkNoZWNrXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgICAgICAgICAgY2hlY2tlZD17c2VsZWN0ZWRJdGVtcy5pbmNsdWRlcyhpdGVtLmlkKX1cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpOyAvLyBQcmV2ZW50IHJvdyBjbGljayB3aGVuIGNoZWNrYm94IGlzIGNsaWNrZWRcbiAgICAgICAgICAgICAgICAgICAgLy8gVG9nZ2xlIHNlbGVjdGlvbiB1c2luZyBpdGVtLmlkIGRpcmVjdGx5XG4gICAgICAgICAgICAgICAgICAgIHNldFNlbGVjdGVkSXRlbXMoKHByZXZTZWxlY3RlZEl0ZW1zKSA9PlxuICAgICAgICAgICAgICAgICAgICAgIHByZXZTZWxlY3RlZEl0ZW1zLmluY2x1ZGVzKGl0ZW0uaWQpXG4gICAgICAgICAgICAgICAgICAgICAgICA/IHByZXZTZWxlY3RlZEl0ZW1zLmZpbHRlcigoaWQpID0+IGlkICE9PSBpdGVtLmlkKVxuICAgICAgICAgICAgICAgICAgICAgICAgOiBbLi4ucHJldlNlbGVjdGVkSXRlbXMsIGl0ZW0uaWRdXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17YFNlbGVjdCAke2l0ZW0ubmFtZX1gfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICkpfVxuICAgICAgICAgIHtpbmZvLmxlbmd0aCA8IDEwICYmXG4gICAgICAgICAgICBBcnJheS5mcm9tKHsgbGVuZ3RoOiAxMCAtIGluZm8ubGVuZ3RoIH0pLm1hcCgoXywgaW5kZXgpID0+IChcbiAgICAgICAgICAgICAgPHRyIGtleT17YGVtcHR5LSR7aW5kZXh9YH0+XG4gICAgICAgICAgICAgICAgPHRkIGNvbFNwYW49e2xhYmVscy5sZW5ndGggKyAxfSBzdHlsZT17eyB0ZXh0QWxpZ246IFwiY2VudGVyXCIgfX0+XG4gICAgICAgICAgICAgICAgICAmbmJzcDtcbiAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgKSl9XG4gICAgICAgIDwvdGJvZHk+XG4gICAgICA8L1RhYmxlPlxuICAgIDwvZGl2PlxuICApO1xufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IGZpcmViYXNlIGZyb20gXCIuLi9jb250ZXh0L0ZpcmViYXNlXCI7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmZXRjaFBhcnRzV2l0aE1hY2hpbmVEYXRhKCkge1xuICBjb25zdCBkYiA9IGZpcmViYXNlLmZpcmVzdG9yZSgpO1xuICBjb25zdCBwYXJ0c1NuYXBzaG90ID0gYXdhaXQgZGIuY29sbGVjdGlvbihcIlRlc3RcIikuZ2V0KCk7XG4gIGNvbnN0IHBhcnRzID0gYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgcGFydHNTbmFwc2hvdC5kb2NzLm1hcChhc3luYyAocGFydERvYykgPT4ge1xuICAgICAgY29uc3QgcGFydERhdGEgPSBwYXJ0RG9jLmRhdGEoKTtcbiAgICAgIHBhcnREYXRhLmlkID0gcGFydERvYy5pZDsgLy8gQWRkIGRvY3VtZW50IElEIGhlcmVcbiAgICAgIC8vIGNvbnNvbGUubG9nKHBhcnREYXRhKTtcbiAgICAgIGlmIChcbiAgICAgICAgcGFydERhdGEuTWFjaGluZSAmJlxuICAgICAgICBwYXJ0RGF0YS5NYWNoaW5lIGluc3RhbmNlb2YgZmlyZWJhc2UuZmlyZXN0b3JlLkRvY3VtZW50UmVmZXJlbmNlXG4gICAgICApIHtcbiAgICAgICAgY29uc29sZS5sb2cocGFydERhdGEuTWFjaGluZSk7XG4gICAgICAgIGNvbnN0IG1hY2hpbmVEb2MgPSBhd2FpdCBwYXJ0RGF0YS5NYWNoaW5lLmdldCgpO1xuICAgICAgICBwYXJ0RGF0YS5tYWNoaW5lRGF0YSA9IG1hY2hpbmVEb2MuZXhpc3RzID8gbWFjaGluZURvYy5kYXRhKCkgOiB7fTtcbiAgICAgICAgaWYgKHBhcnREYXRhLm1hY2hpbmVEYXRhLmNsaWVudCkge1xuICAgICAgICAgIGNvbnN0IGNsaWVudERvYyA9IGF3YWl0IHBhcnREYXRhLm1hY2hpbmVEYXRhLmNsaWVudC5nZXQoKTtcbiAgICAgICAgICBwYXJ0RGF0YS5tYWNoaW5lRGF0YS5DbGllbnQgPSBjbGllbnREb2MuZXhpc3RzXG4gICAgICAgICAgICA/IGNsaWVudERvYy5kYXRhKCkubmFtZVxuICAgICAgICAgICAgOiBcIlwiO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJ0RGF0YS5tYWNoaW5lRGF0YSA9IHt9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHBhcnREYXRhO1xuICAgIH0pXG4gICk7XG4gIHJldHVybiBwYXJ0cztcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZldGNoQ2xpZW50cyhzZWxlY3RlZE9FTSwgc2VsZWN0ZWRNb2RhbGl0eSkge1xuICBjb25zdCBkYiA9IGZpcmViYXNlLmZpcmVzdG9yZSgpO1xuICBjb25zdCBjbGllbnRzU25hcHNob3QgPSBhd2FpdCBkYi5jb2xsZWN0aW9uKFwiQ2xpZW50XCIpLmdldCgpO1xuICBjb25zdCBjbGllbnRzID0gY2xpZW50c1NuYXBzaG90LmRvY3MubWFwKChkb2MpID0+ICh7XG4gICAgaWQ6IGRvYy5pZCxcbiAgICAuLi5kb2MuZGF0YSgpLFxuICB9KSk7XG5cbiAgLy8gRmlsdGVyIGNsaWVudHMgYmFzZWQgb24gT0VNIGFuZCBNb2RhbGl0eSBpZiBzZWxlY3RlZFxuICBpZiAoc2VsZWN0ZWRPRU0gfHwgc2VsZWN0ZWRNb2RhbGl0eSkge1xuICAgIGNvbnN0IGZpbHRlcmVkQ2xpZW50cyA9IFtdO1xuICAgIGZvciAoY29uc3QgY2xpZW50IG9mIGNsaWVudHMpIHtcbiAgICAgIGxldCBtYXRjaCA9IHRydWU7XG4gICAgICBpZiAoc2VsZWN0ZWRPRU0gfHwgc2VsZWN0ZWRNb2RhbGl0eSkge1xuICAgICAgICBmb3IgKGNvbnN0IG1hY2hpbmVSZWYgb2YgY2xpZW50Lm1hY2hpbmVzKSB7XG4gICAgICAgICAgY29uc3QgbWFjaGluZURvYyA9IGF3YWl0IG1hY2hpbmVSZWYuZ2V0KCk7XG4gICAgICAgICAgY29uc3QgbWFjaGluZURhdGEgPSBtYWNoaW5lRG9jLmRhdGEoKTtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAoc2VsZWN0ZWRPRU0gJiYgbWFjaGluZURhdGEuT0VNID09PSBzZWxlY3RlZE9FTSkgfHxcbiAgICAgICAgICAgIChzZWxlY3RlZE1vZGFsaXR5ICYmIG1hY2hpbmVEYXRhLk1vZGFsaXR5ID09PSBzZWxlY3RlZE1vZGFsaXR5KVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgbWF0Y2ggPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1hdGNoID0gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgZmlsdGVyZWRDbGllbnRzLnB1c2goY2xpZW50KTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZpbHRlcmVkQ2xpZW50cztcbiAgfVxuXG4gIHJldHVybiBjbGllbnRzO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZmV0Y2hNb2RlbHMoXG4gIHNlbGVjdGVkT0VNLFxuICBzZWxlY3RlZE1vZGFsaXR5LFxuICBzZWxlY3RlZENsaWVudFxuKSB7XG4gIGNvbnN0IGRiID0gZmlyZWJhc2UuZmlyZXN0b3JlKCk7XG4gIGNvbnN0IG1hY2hpbmVzU25hcHNob3QgPSBhd2FpdCBkYi5jb2xsZWN0aW9uKFwiTWFjaGluZVwiKS5nZXQoKTtcbiAgY29uc3QgbW9kZWxzID0gbmV3IFNldCgpO1xuXG4gIGF3YWl0IFByb21pc2UuYWxsKFxuICAgIG1hY2hpbmVzU25hcHNob3QuZG9jcy5tYXAoYXN5bmMgKG1hY2hpbmVEb2MpID0+IHtcbiAgICAgIGNvbnN0IG1hY2hpbmVEYXRhID0gbWFjaGluZURvYy5kYXRhKCk7XG4gICAgICBsZXQgaXNWYWxpZCA9IHRydWU7XG5cbiAgICAgIGlmIChzZWxlY3RlZE9FTSAmJiBtYWNoaW5lRGF0YS5PRU0gIT09IHNlbGVjdGVkT0VNKSBpc1ZhbGlkID0gZmFsc2U7XG4gICAgICBpZiAoc2VsZWN0ZWRNb2RhbGl0eSAmJiBtYWNoaW5lRGF0YS5Nb2RhbGl0eSAhPT0gc2VsZWN0ZWRNb2RhbGl0eSlcbiAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xuICAgICAgaWYgKHNlbGVjdGVkQ2xpZW50ICYmIG1hY2hpbmVEYXRhLmNsaWVudCkge1xuICAgICAgICBjb25zdCBjbGllbnREb2MgPSBhd2FpdCBtYWNoaW5lRGF0YS5jbGllbnQuZ2V0KCk7XG4gICAgICAgIGlmICghY2xpZW50RG9jLmV4aXN0cyB8fCBjbGllbnREb2MuZGF0YSgpLm5hbWUgIT09IHNlbGVjdGVkQ2xpZW50KVxuICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgaWYgKGlzVmFsaWQpIHtcbiAgICAgICAgbW9kZWxzLmFkZChtYWNoaW5lRGF0YS5Nb2RlbCk7XG4gICAgICB9XG4gICAgfSlcbiAgKTtcblxuICByZXR1cm4gQXJyYXkuZnJvbShtb2RlbHMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0RGF0ZSh0aW1lc3RhbXApIHtcbiAgaWYgKCF0aW1lc3RhbXApIHJldHVybiBcIlwiO1xuICBsZXQgZGF0ZTtcbiAgaWYgKHRpbWVzdGFtcC50b0RhdGUpIHtcbiAgICBkYXRlID0gdGltZXN0YW1wLnRvRGF0ZSgpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiB0aW1lc3RhbXAgPT09IFwic3RyaW5nXCIgfHwgdHlwZW9mIHRpbWVzdGFtcCA9PT0gXCJudW1iZXJcIikge1xuICAgIGRhdGUgPSBuZXcgRGF0ZSh0aW1lc3RhbXApO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBcIlwiOyAvLyBoYW5kbGUgdW5leHBlY3RlZCBmb3JtYXRzXG4gIH1cbiAgY29uc3QgZGF5ID0gU3RyaW5nKGRhdGUuZ2V0RGF0ZSgpKS5wYWRTdGFydCgyLCBcIjBcIik7XG4gIGNvbnN0IG1vbnRoID0gU3RyaW5nKGRhdGUuZ2V0TW9udGgoKSArIDEpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcbiAgY29uc3QgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgcmV0dXJuIGAke21vbnRofS8ke2RheX0vJHt5ZWFyfWA7XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmaXJlYmFzZS9jb21wYXQvYXBwXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZpcmViYXNlL2NvbXBhdC9hdXRoXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZpcmViYXNlL2NvbXBhdC9maXJlc3RvcmVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZmlyZWJhc2UvY29tcGF0L3N0b3JhZ2VcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmV4dC9yb3V0ZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3RcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtYm9vdHN0cmFwXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LWlzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInN0eWxlZC1qc3gvc3R5bGVcIik7Il0sInNvdXJjZVJvb3QiOiIifQ==