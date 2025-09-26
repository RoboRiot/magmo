module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
/******/
/******/ 	// object to store loaded chunks
/******/ 	// "0" means "already loaded"
/******/ 	var installedChunks = {
/******/ 		17: 0
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
/******/ 	return __webpack_require__(__webpack_require__.s = 19);
/******/ })
/************************************************************************/
/******/ ({

/***/ "/T1H":
/***/ (function(module, exports) {

module.exports = require("next/dynamic");

/***/ }),

/***/ "/jkW":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.isDynamicRoute = isDynamicRoute; // Identify /[param]/ in route string

const TEST_ROUTE = /\/\[[^/]+?\](?=\/|$)/;

function isDynamicRoute(route) {
  return TEST_ROUTE.test(route);
}

/***/ }),

/***/ "0Bsm":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("AroE");

exports.__esModule = true;
exports.default = withRouter;

var _react = _interopRequireDefault(__webpack_require__("cDcd"));

var _router = __webpack_require__("nOHt");

function withRouter(ComposedComponent) {
  function WithRouterWrapper(props) {
    return /*#__PURE__*/_react.default.createElement(ComposedComponent, Object.assign({
      router: (0, _router.useRouter)()
    }, props));
  }

  WithRouterWrapper.getInitialProps = ComposedComponent.getInitialProps // This is needed to allow checking for custom getInitialProps in _app
  ;
  WithRouterWrapper.origGetInitialProps = ComposedComponent.origGetInitialProps;

  if (false) {}

  return WithRouterWrapper;
}

/***/ }),

/***/ "0G5g":
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

/***/ 19:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("oysE");


/***/ }),

/***/ "2Fd9":
/***/ (function(module, exports) {

module.exports = require("firebase/compat/firestore");

/***/ }),

/***/ "3WeD":
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

/***/ "3wub":
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

/***/ "4Q3z":
/***/ (function(module, exports) {

module.exports = require("next/router");

/***/ }),

/***/ "6D7l":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.formatUrl = formatUrl;

var querystring = _interopRequireWildcard(__webpack_require__("3WeD"));

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

/***/ "6mnf":
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

var _querystring = __webpack_require__("3WeD");

var _parseRelativeUrl = __webpack_require__("hS4m");

var pathToRegexp = _interopRequireWildcard(__webpack_require__("zOyy"));

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

/***/ "7KCV":
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__("C+bE");

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

/***/ "7wmr":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NewLocal; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("IZS3");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _context_Firebase__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("NY6m");
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;
// NewLocal.js



function NewLocal({
  onSave = () => {},
  onCancel = () => {},
  selectedClient,
  showLocalLoc,
  value = {},
  onChange
}) {
  const {
    0: regionOptions,
    1: setRegionOptions
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const {
    0: sectionMap,
    1: setSectionMap
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({});
  const {
    0: binCount,
    1: setBinCount
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(0);
  const {
    0: palletCount,
    1: setPalletCount
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(0);
  const {
    0: region,
    1: setRegion
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])("");
  const {
    0: sectionLetter,
    1: setSectionLetter
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])("");
  const {
    0: sectionNumber,
    1: setSectionNumber
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])("");
  const {
    0: binSelected,
    1: setBinSelected
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])("");
  const {
    0: palletSelected,
    1: setPalletSelected
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(""); // 1) load directory exactly as before

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    if (!showLocalLoc) return;
    const db = _context_Firebase__WEBPACK_IMPORTED_MODULE_2__[/* default */ "b"].firestore();
    db.collection("Warehouse").doc("directory").get().then(doc => {
      const d = doc.data() || {};
      setRegionOptions(d.Region || []);
      setSectionMap(d.Section || {});
      setBinCount(d.Bin || 0);
      setPalletCount(d.Pallet || 0);
    });
  }, [showLocalLoc]); // 2) when we open the modal (or value changes), initialize from value

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    var _value$section, _value$section2, _value$bin, _value$pallet;

    if (!showLocalLoc) return;
    setRegion(value.region || "");
    setSectionLetter(((_value$section = value.section) === null || _value$section === void 0 ? void 0 : _value$section.letter) || "");
    setSectionNumber(((_value$section2 = value.section) === null || _value$section2 === void 0 ? void 0 : _value$section2.number) || "");
    setBinSelected(((_value$bin = value.bin) === null || _value$bin === void 0 ? void 0 : _value$bin.toString()) || "");
    setPalletSelected(((_value$pallet = value.pallet) === null || _value$pallet === void 0 ? void 0 : _value$pallet.toString()) || "");
  }, [showLocalLoc]); // 3) notify parent on any change

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    const p = {};
    if (region) p.region = region;
    if (sectionLetter && sectionNumber) p.section = {
      letter: sectionLetter,
      number: sectionNumber
    };
    if (binSelected) p.bin = parseInt(binSelected, 10);
    if (palletSelected) p.pallet = parseInt(palletSelected, 10);
    onChange(p);
  }, [region, sectionLetter, sectionNumber, binSelected, palletSelected]); // helpers:

  const letters = Array.from({
    length: 26
  }, (_, i) => String.fromCharCode(65 + i));
  const numbers = Array.from({
    length: 50
  }, (_, i) => i + 1);
  const binOptions = Array.from({
    length: binCount
  }, (_, i) => i + 1);
  const palletOptions = Array.from({
    length: palletCount
  }, (_, i) => i + 1); // bump and persist bin count

  const handleAddBin = async () => {
    const next = binCount + 1;
    await _context_Firebase__WEBPACK_IMPORTED_MODULE_2__[/* default */ "b"].firestore().collection("Warehouse").doc("directory").update({
      Bin: next
    });
    setBinCount(next);
    setBinSelected(next.toString());
  }; // bump and persist pallet count


  const handleAddPallet = async () => {
    const next = palletCount + 1;
    await _context_Firebase__WEBPACK_IMPORTED_MODULE_2__[/* default */ "b"].firestore().collection("Warehouse").doc("directory").update({
      Pallet: next
    });
    setPalletCount(next);
    setPalletSelected(next.toString());
  }; // only fire parent when they click OK


  const handleOk = () => {
    const p = {};
    if (region) p.region = region;
    if (sectionLetter && sectionNumber) p.section = {
      letter: sectionLetter,
      number: sectionNumber
    };
    if (binSelected) p.bin = parseInt(binSelected, 10);
    if (palletSelected) p.pallet = parseInt(palletSelected, 10);
    onSave(p);
  };

  return __jsx("div", null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Row"], null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Group, null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Label, null, "Region"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Select, {
    value: region,
    onChange: e => setRegion(e.target.value)
  }, __jsx("option", {
    value: ""
  }, "Select region"), regionOptions.map(r => __jsx("option", {
    key: r,
    value: r
  }, r))))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Group, null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Label, null, "Section Letter"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Select, {
    value: sectionLetter,
    onChange: e => setSectionLetter(e.target.value) // disabled={!region}

  }, __jsx("option", {
    value: ""
  }, "Letter"), letters.map(l => __jsx("option", {
    key: l,
    value: l
  }, l))))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Group, null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Label, null, "Section Number"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Select, {
    value: sectionNumber,
    onChange: e => setSectionNumber(e.target.value) // disabled={!region}

  }, __jsx("option", {
    value: ""
  }, "Number"), numbers.map(n => __jsx("option", {
    key: n,
    value: n
  }, n)))))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Row"], {
    className: "mt-3"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Group, null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Label, null, "Bin"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Stack"], {
    direction: "horizontal",
    gap: 2
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Select, {
    value: binSelected,
    onChange: e => setBinSelected(e.target.value) // disabled={!region}

  }, __jsx("option", {
    value: ""
  }, "Select bin"), binOptions.map(b => __jsx("option", {
    key: b,
    value: b
  }, b))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    variant: "outline-secondary",
    onClick: handleAddBin
  }, "+ Bin")))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Group, null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Label, null, "Pallet"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Stack"], {
    direction: "horizontal",
    gap: 2
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Select, {
    value: palletSelected,
    onChange: e => setPalletSelected(e.target.value) // disabled={!region}

  }, __jsx("option", {
    value: ""
  }, "Select pallet"), palletOptions.map(p => __jsx("option", {
    key: p,
    value: p
  }, p))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    variant: "outline-secondary",
    onClick: handleAddPallet
  }, "+ Pallet"))))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Row"], {
    className: "mt-4"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], null, __jsx("div", {
    className: "mt-3 text-end"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    variant: "secondary",
    onClick: onCancel
  }, "Cancel"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    variant: "primary",
    onClick: handleOk
  }, "OK")))));
}

/***/ }),

/***/ "8HvV":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("IZS3");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _styles_ClientTable_module_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("wL8p");
/* harmony import */ var _styles_ClientTable_module_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_ClientTable_module_css__WEBPACK_IMPORTED_MODULE_2__);
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
    className: _styles_ClientTable_module_css__WEBPACK_IMPORTED_MODULE_2___default.a.clientTable
  }, __jsx("thead", null, __jsx("tr", null, __jsx("th", null, "Client Name"), !disableInfo && __jsx("th", null, "Info"), !disableSelect && __jsx("th", null, "Select"))), __jsx("tbody", null, __jsx("tr", null, __jsx("td", {
    colSpan: "3",
    style: {
      textAlign: "center"
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    variant: "secondary",
    onClick: clearSelection
  }, "Clear Selection"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    variant: "primary",
    onClick: onAddClient,
    className: "ms-2"
  }, "Add New Client"))), clients.map(client => __jsx("tr", {
    key: client.id
  }, __jsx("td", null, client.name), !disableInfo && __jsx("td", null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    variant: "info",
    onClick: () => onInfoClick(client.id, client.name)
  }, isClientSearch ? "Edit" : "Info")), !disableSelect && __jsx("td", null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    variant: "primary",
    onClick: () => onSelectClient(client.id)
  }, "Select"))))));
};

/* harmony default export */ __webpack_exports__["a"] = (ClientTable);

/***/ }),

/***/ "AroE":
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;

/***/ }),

/***/ "Aroy":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return adminDb; });
/* harmony import */ var firebase_admin_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("txAr");
/* harmony import */ var firebase_admin_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(firebase_admin_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var firebase_admin_firestore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("YFVX");
/* harmony import */ var firebase_admin_firestore__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(firebase_admin_firestore__WEBPACK_IMPORTED_MODULE_1__);

 // Import Firebase Functions for config access

let functions;

try {
  functions = __webpack_require__("O8Wp");
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


/* unused harmony default export */ var _unused_webpack_default_export = (adminDb);

/***/ }),

/***/ "C+bE":
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

/***/ "Dktn":
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

/***/ "HJQg":
/***/ (function(module, exports) {

module.exports = require("styled-jsx/style");

/***/ }),

/***/ "IZS3":
/***/ (function(module, exports) {

module.exports = require("react-bootstrap");

/***/ }),

/***/ "MSWM":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PartTable; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("IZS3");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _fetchAssociations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("qoNY");
/* harmony import */ var _styles_PartTable_module_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("cbdS");
/* harmony import */ var _styles_PartTable_module_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_PartTable_module_css__WEBPACK_IMPORTED_MODULE_3__);
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
    className: _styles_PartTable_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.scrollableTable
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Table"], {
    striped: true,
    bordered: true,
    hover: true,
    size: "sm",
    className: "mb-0"
  }, __jsx("thead", {
    className: _styles_PartTable_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.stickyHeader
  }, __jsx("tr", null, labels.map((item, index) => __jsx("th", {
    style: hoverStyle(index),
    onMouseOver: () => setHoverIndex(index),
    onMouseOut: () => setHoverIndex(null),
    onClick: () => sortCheckAll(index),
    key: index
  }, item)), __jsx("th", {
    style: {
      textAlign: "center"
    }
  }, selectedItems.length > 0 ? __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    variant: "danger",
    onClick: handleDeleteSelected,
    disabled: isDeleting,
    size: "sm"
  }, "Delete Selected (", selectedItems.length, ")") : "select"))), __jsx("tbody", null, info.map((item, index) => __jsx("tr", {
    key: index,
    onClick: e => {
      // Only trigger rowSelect if the target is not a checkbox
      if (e.target.type !== "checkbox") {
        rowSelect(item);
      }
    },
    className: "clickable-row"
  }, __jsx("td", {
    style: {
      textAlign: "center",
      cursor: "default"
    }
  }, item.name), __jsx("td", {
    style: {
      textAlign: "center",
      cursor: "default"
    }
  }, Object(_fetchAssociations__WEBPACK_IMPORTED_MODULE_2__[/* formatDate */ "d"])(item.date)), __jsx("td", {
    style: {
      textAlign: "center",
      cursor: "default"
    }
  }, item.workOrders && item.workOrders.length > 0 ? item.workOrders[item.workOrders.length - 1].workOrder : "N/A"), __jsx("td", {
    style: {
      textAlign: "center",
      cursor: "default"
    }
  }, item.pn), __jsx("td", {
    style: {
      textAlign: "center",
      cursor: "default"
    }
  }, item.sn), __jsx("td", {
    style: {
      textAlign: "center"
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Check, {
    type: "checkbox",
    checked: selectedItems.includes(item.id),
    onChange: e => {
      e.stopPropagation(); // Prevent row click when checkbox is clicked
      // Toggle selection using item.id directly

      setSelectedItems(prevSelectedItems => prevSelectedItems.includes(item.id) ? prevSelectedItems.filter(id => id !== item.id) : [...prevSelectedItems, item.id]);
    },
    "aria-label": `Select ${item.name}`
  })))), info.length < 10 && Array.from({
    length: 10 - info.length
  }).map((_, index) => __jsx("tr", {
    key: `empty-${index}`
  }, __jsx("td", {
    colSpan: labels.length + 1,
    style: {
      textAlign: "center"
    }
  }, "\xA0"))))));
}

/***/ }),

/***/ "MbKa":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("IZS3");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__);
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
    onHide: handleClose
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Header, {
    closeButton: true
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Title, null, "Select a Machine or Warehouse")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Body, null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Table"], {
    striped: true,
    bordered: true,
    hover: true,
    size: "sm"
  }, __jsx("thead", null, __jsx("tr", null, __jsx("th", null, "Name"), __jsx("th", null, "Location"), __jsx("th", null, "Select"))), __jsx("tbody", null, machineOptions.map(machine => __jsx("tr", {
    key: machine.id
  }, __jsx("td", null, machine.name), __jsx("td", null, machine.local), __jsx("td", null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    variant: "primary",
    onClick: () => setSelectedMachine(machine)
  }, "Select"))))))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Footer, null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    variant: "secondary",
    onClick: handleClose
  }, "Close")));
};

/* harmony default export */ __webpack_exports__["default"] = (ClientInfoModal);

/***/ }),

/***/ "N6Fi":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

exports.__esModule = true;
exports.pathToRegexp = exports.default = exports.customRouteMatcherOptions = exports.matcherOptions = void 0;

var pathToRegexp = _interopRequireWildcard(__webpack_require__("zOyy"));

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

/***/ "NY6m":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return auth; });
/* harmony import */ var firebase_compat_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("YMQe");
/* harmony import */ var firebase_compat_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(firebase_compat_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var firebase_compat_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("e9mW");
/* harmony import */ var firebase_compat_auth__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(firebase_compat_auth__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var firebase_compat_firestore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("2Fd9");
/* harmony import */ var firebase_compat_firestore__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(firebase_compat_firestore__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var firebase_compat_storage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("P/iy");
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
/* harmony default export */ __webpack_exports__["b"] = (firebase_compat_app__WEBPACK_IMPORTED_MODULE_0___default.a); // import { initializeApp } from 'firebase/app';
// import { getFirestore, collection, getDocs } from 'firebase/firestore';
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// export default app;

/***/ }),

/***/ "Nh2W":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("AroE");

exports.__esModule = true;
exports.markAssetError = markAssetError;
exports.isAssetError = isAssetError;
exports.getClientBuildManifest = getClientBuildManifest;
exports.default = void 0;

var _getAssetPathFromRoute = _interopRequireDefault(__webpack_require__("UhrY"));

var _requestIdleCallback = __webpack_require__("0G5g"); // 3.8s was arbitrarily chosen as it's what https://web.dev/interactive
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
  if (false) {}

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

/***/ "O8Wp":
/***/ (function(module, exports) {

module.exports = require("firebase-functions");

/***/ }),

/***/ "Osoz":
/***/ (function(module, exports) {

module.exports = require("next/dist/next-server/lib/router-context.js");

/***/ }),

/***/ "P/iy":
/***/ (function(module, exports) {

module.exports = require("firebase/compat/storage");

/***/ }),

/***/ "P7gm":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = resolveRewrites;

var _pathMatch = _interopRequireDefault(__webpack_require__("N6Fi"));

var _prepareDestination = _interopRequireWildcard(__webpack_require__("6mnf"));

var _normalizeTrailingSlash = __webpack_require__("X24+");

var _normalizeLocalePath = __webpack_require__("3wub");

var _parseRelativeUrl = __webpack_require__("hS4m");

var _router = __webpack_require__("elyg");

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

/***/ "TM8N":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("IZS3");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _styles_ClientTable_module_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("wL8p");
/* harmony import */ var _styles_ClientTable_module_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_ClientTable_module_css__WEBPACK_IMPORTED_MODULE_2__);
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
    className: _styles_ClientTable_module_css__WEBPACK_IMPORTED_MODULE_2___default.a.modelTable
  }, __jsx("thead", null, __jsx("tr", null, __jsx("th", null, "Model Name"), __jsx("th", null, "Select"))), __jsx("tbody", null, __jsx("tr", null, __jsx("td", {
    colSpan: "2",
    style: {
      textAlign: "center"
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    variant: "secondary",
    onClick: clearSelection
  }, "Clear Selection"))), models.map((model, index) => __jsx("tr", {
    key: index
  }, __jsx("td", null, model), __jsx("td", null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    variant: "primary",
    onClick: () => onSelectModel(model)
  }, "Select")))))));
};

/* harmony default export */ __webpack_exports__["a"] = (ModelTable);

/***/ }),

/***/ "UhrY":
/***/ (function(module, exports) {

module.exports = require("next/dist/next-server/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ "VZWn":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("IZS3");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__);
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
    onHide: handleClose
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Header, {
    closeButton: true
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Title, null, "Item Info")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Body, null, __jsx("p", null, __jsx("strong", null, "Name:"), " ", itemName, " "), __jsx("p", null, __jsx("strong", null, "Dimensions:"), " ", dimensions), __jsx("p", null, __jsx("strong", null, "Price:"), " ", price), __jsx("p", null, __jsx("strong", null, "Frequency of item:"), " ", freqI, " "), __jsx("p", null, __jsx("strong", null, "Frequency of Machine:"), " ", freqM, " "), __jsx("p", null, __jsx("strong", null, "Usage past 1 year:"), " ", usage, " ")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Footer, null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    variant: "secondary",
    onClick: handleClose
  }, "Close")));
};

/* harmony default export */ __webpack_exports__["default"] = (InfoModal);

/***/ }),

/***/ "X24+":
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

/***/ "XrFm":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ AuthUserProvider; });
__webpack_require__.d(__webpack_exports__, "b", function() { return /* binding */ useAuth; });

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__("cDcd");
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: ./context/Firebase.js
var Firebase = __webpack_require__("NY6m");

// CONCATENATED MODULE: ./context/useFirebaseAuth.js



const formatAuthUser = user => ({
  uid: user.uid,
  email: user.email
});

function useFirebaseAuth() {
  const {
    0: authUser,
    1: setAuthUser
  } = Object(external_react_["useState"])(null);
  const {
    0: loading,
    1: setLoading
  } = Object(external_react_["useState"])(true);

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
    const provider = new Firebase["b" /* default */].auth.GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account"
    });
    return Firebase["a" /* auth */].signInWithRedirect(provider).catch(error => {
      console.error("Google Sign-In Error:", error);
      throw error;
    });
  };

  const signOut = () => Firebase["a" /* auth */].signOut().then(clear); // Listen for Firebase auth state changes
  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged(authStateChanged);
  //   return () => unsubscribe();
  // }, []);


  Object(external_react_["useEffect"])(() => {
    let unsubscribe;
    Firebase["a" /* auth */].setPersistence(Firebase["b" /* default */].auth.Auth.Persistence.LOCAL).then(() => {
      // Now set up the listener
      unsubscribe = Firebase["a" /* auth */].onAuthStateChanged(authStateChanged);
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
// CONCATENATED MODULE: ./context/AuthUserContext.js

var __jsx = external_react_default.a.createElement;


const authUserContext = /*#__PURE__*/Object(external_react_["createContext"])({
  authUser: null,
  loading: true,
  signInWithGoogle: async () => {},
  signOut: async () => {}
});
function AuthUserProvider({
  children
}) {
  const auth = useFirebaseAuth();
  return __jsx(authUserContext.Provider, {
    value: auth
  }, children);
}
const useAuth = () => Object(external_react_["useContext"])(authUserContext);

/***/ }),

/***/ "YFVX":
/***/ (function(module, exports) {

module.exports = require("firebase-admin/firestore");

/***/ }),

/***/ "YFqc":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("cTJO")


/***/ }),

/***/ "YMQe":
/***/ (function(module, exports) {

module.exports = require("firebase/compat/app");

/***/ }),

/***/ "YTqd":
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

/***/ "cDcd":
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "cJ15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MachineSelectionModal; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("IZS3");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_fetchAssociations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("qoNY");
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
      Object(_utils_fetchAssociations__WEBPACK_IMPORTED_MODULE_2__[/* fetchModels */ "b"])(OEM, Modality).then(fetchedModels => {
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
    onHide: handleClose
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Header, {
    closeButton: true
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Title, null, "Select Machine")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Body, null, __jsx("div", {
    className: "mb-3"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Dropdown"], {
    onSelect: handleModalitySelect
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Dropdown"].Toggle, {
    variant: "outline-secondary",
    className: "w-100"
  }, Modality || "Select Modality"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Dropdown"].Menu, null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Dropdown"].Item, {
    eventKey: "CT"
  }, "CT"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Dropdown"].Item, {
    eventKey: "MRI"
  }, "MRI")))), Modality && __jsx("div", {
    className: "mb-3"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Dropdown"], {
    onSelect: handleOEMSelect
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Dropdown"].Toggle, {
    variant: "outline-secondary",
    className: "w-100"
  }, OEM || "Select OEM"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Dropdown"].Menu, null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Dropdown"].Item, {
    eventKey: "GE"
  }, "GE"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Dropdown"].Item, {
    eventKey: "Philips"
  }, "Philips"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Dropdown"].Item, {
    eventKey: "Siemens"
  }, "Siemens"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Dropdown"].Item, {
    eventKey: "Toshiba"
  }, "Toshiba")))), Modality && OEM && __jsx("div", {
    className: "mb-3"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["FormControl"], {
    placeholder: "Search models",
    "aria-label": "Search models",
    "aria-describedby": "basic-addon2",
    onChange: e => setSelectedModel(e.target.value)
  }), loadingModels ? __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Spinner"], {
    animation: "border"
  }) : models.length > 0 && __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Dropdown"], {
    onSelect: handleModelSelect
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Dropdown"].Toggle, {
    variant: "outline-secondary",
    className: "w-100"
  }, selectedModel || "Select Model"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Dropdown"].Menu, null, models.map(model => __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Dropdown"].Item, {
    key: model,
    eventKey: model
  }, model)))))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Footer, null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    variant: "secondary",
    onClick: handleClose
  }, "Close"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    variant: "primary",
    onClick: handleSaveSelection,
    disabled: !selectedModel
  }, "Save Selection")));
}

/***/ }),

/***/ "cTJO":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__("7KCV");

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireWildcard(__webpack_require__("cDcd"));

var _router = __webpack_require__("elyg");

var _router2 = __webpack_require__("nOHt");

var _useIntersection = __webpack_require__("vNVm");

const prefetched = {};

function prefetch(router, href, as, options) {
  if (true) return;
  if (!(0, _router.isLocalURL)(href)) return; // Prefetch the JSON page if asked (only in the client)
  // We need to handle a prefetch error here since we may be
  // loading with priority which can reject but we don't
  // want to force navigation since this is only a prefetch

  router.prefetch(href, as, options).catch(err => {
    if (false) {}
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
  if (false) {}

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

/***/ "cbdS":
/***/ (function(module, exports) {

// Exports
module.exports = {
	"tableContainer": "PartTable_tableContainer__18TCg",
	"scrollableTable": "PartTable_scrollableTable__2TybW",
	"stickyHeader": "PartTable_stickyHeader__1HJK1",
	"searchContainer": "PartTable_searchContainer__2r7ak",
	"divider": "PartTable_divider__1QxCq",
	"buttonGroup": "PartTable_buttonGroup__3ZfOO",
	"flexButton": "PartTable_flexButton__2po2e"
};


/***/ }),

/***/ "dZ6Y":
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

/***/ "e9mW":
/***/ (function(module, exports) {

module.exports = require("firebase/compat/auth");

/***/ }),

/***/ "elyg":
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

var _normalizeTrailingSlash = __webpack_require__("X24+");

var _routeLoader = __webpack_require__("Nh2W");

var _denormalizePagePath = __webpack_require__("wkBG");

var _normalizeLocalePath = __webpack_require__("3wub");

var _mitt = _interopRequireDefault(__webpack_require__("dZ6Y"));

var _utils = __webpack_require__("g/15");

var _isDynamic = __webpack_require__("/jkW");

var _parseRelativeUrl = __webpack_require__("hS4m");

var _querystring = __webpack_require__("3WeD");

var _resolveRewrites = _interopRequireDefault(__webpack_require__("P7gm"));

var _routeMatcher = __webpack_require__("gguc");

var _routeRegex = __webpack_require__("YTqd");

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
      if (false) {}

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
          if (false) {}

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

      if (false) {} // shallow routing is only allowed for same page URL changes.


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
    if (false) {}

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

      if (false) {}

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

    if (false) {}

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

    if ( true && !this.isPreview && this.sdc[cacheKey]) {
      return Promise.resolve(this.sdc[cacheKey]);
    }

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

/***/ "g/15":
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

var _formatUrl = __webpack_require__("6D7l");
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
  if (false) { var _App$prototype; } // when called from _app `ctx` is nested in `ctx`


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

  if (false) {}

  return props;
}

const urlObjectKeys = ['auth', 'hash', 'host', 'hostname', 'href', 'path', 'pathname', 'port', 'protocol', 'query', 'search', 'slashes'];
exports.urlObjectKeys = urlObjectKeys;

function formatWithValidation(url) {
  if (false) {}

  return (0, _formatUrl.formatUrl)(url);
}

const SP = typeof performance !== 'undefined';
exports.SP = SP;
const ST = SP && typeof performance.mark === 'function' && typeof performance.measure === 'function';
exports.ST = ST;

/***/ }),

/***/ "gguc":
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

/***/ "hS4m":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.parseRelativeUrl = parseRelativeUrl;

var _utils = __webpack_require__("g/15");

var _querystring = __webpack_require__("3WeD");
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

/***/ "lzi3":
/***/ (function(module, exports) {

module.exports = require("react-qr-barcode-scanner");

/***/ }),

/***/ "mJJZ":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("4Q3z");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _context_AuthUserContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("XrFm");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("IZS3");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__);

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;





const LoggedIn = ({
  children
}) => {
  const {
    authUser,
    loading
  } = Object(_context_AuthUserContext__WEBPACK_IMPORTED_MODULE_2__[/* useAuth */ "b"])();
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
      }
    }, __jsx("h3", null, "Loading..."));
  }

  return __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, authUser && children);
};

/* harmony default export */ __webpack_exports__["default"] = (LoggedIn);

/***/ }),

/***/ "nOHt":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__("7KCV");

var _interopRequireDefault = __webpack_require__("AroE");

exports.__esModule = true;
exports.useRouter = useRouter;
exports.makePublicRouterInstance = makePublicRouterInstance;
exports.createRouter = exports.withRouter = exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__("cDcd"));

var _router2 = _interopRequireWildcard(__webpack_require__("elyg"));

exports.Router = _router2.default;
exports.NextRouter = _router2.NextRouter;

var _routerContext = __webpack_require__("Osoz");

var _withRouter = _interopRequireDefault(__webpack_require__("0Bsm"));

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

/***/ "oGF+":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("HJQg");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("IZS3");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils_fetchAssociations__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("qoNY");
/* harmony import */ var _context_AuthUserContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("XrFm");
/* harmony import */ var _LoggedIn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("mJJZ");
/* harmony import */ var _utils_ClientTable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("8HvV");
/* harmony import */ var _utils_ModelTable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("TM8N");
/* harmony import */ var _utils_PartTable__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("MSWM");
/* harmony import */ var _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("Dktn");
/* harmony import */ var _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _context_Firebase__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("NY6m");

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
      const data = await Object(_utils_fetchAssociations__WEBPACK_IMPORTED_MODULE_3__[/* fetchPartsWithMachineData */ "c"])();
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
    const clientsData = await Object(_utils_fetchAssociations__WEBPACK_IMPORTED_MODULE_3__[/* fetchClients */ "a"])(selectedOEM, selectedModality);
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
    const modelsData = await Object(_utils_fetchAssociations__WEBPACK_IMPORTED_MODULE_3__[/* fetchModels */ "b"])(selectedOEM, selectedModality, selectedClient);
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
    dialogClassName: "parent-modal-dialog"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Header, {
    closeButton: true
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Title, null, "Select Parent")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Body, {
    style: {
      maxHeight: "75vh",
      overflowY: "auto"
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Container"], {
    className: "d-flex align-items-center justify-content-center",
    style: {
      minHeight: "unset"
    }
  }, __jsx("div", {
    className: "w-100",
    style: {
      maxWidth: "1200px"
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Card"], null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Card"].Body, null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Row"], null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], {
    md: 4
  }, __jsx("div", null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["InputGroup"], {
    className: "mb-3"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["InputGroup"].Text, null, "OEM"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Dropdown"], {
    onSelect: handleSelect1
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Dropdown"].Toggle, {
    variant: "outline-secondary",
    id: "dropdown-button-1",
    className: "w-100"
  }, dropdown1Text), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Dropdown"].Menu, {
    className: "w-100"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Dropdown"].Item, {
    eventKey: "unassigned"
  }, "Select Option"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Dropdown"].Item, {
    eventKey: "GE"
  }, "GE"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Dropdown"].Item, {
    eventKey: "Toshiba"
  }, "Toshiba"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Dropdown"].Item, {
    eventKey: "Siemens"
  }, "Siemens"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Dropdown"].Item, {
    eventKey: "Philips"
  }, "Philips")))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["InputGroup"], {
    className: "mb-3"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["InputGroup"].Text, null, "Modality"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Dropdown"], {
    onSelect: handleSelect2
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Dropdown"].Toggle, {
    variant: "outline-secondary",
    id: "dropdown-button-2",
    className: "w-100"
  }, dropdown2Text), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Dropdown"].Menu, {
    className: "w-100"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Dropdown"].Item, {
    eventKey: "unassigned"
  }, "Select Option"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Dropdown"].Item, {
    eventKey: "CT"
  }, "CT"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Dropdown"].Item, {
    eventKey: "MRI"
  }, "MRI")))), __jsx("div", null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["InputGroup"], {
    className: "mb-3"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["InputGroup"].Text, null, "Client"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "outline-secondary",
    className: "w-100",
    onClick: handleClientClick
  }, clientButtonText)), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["InputGroup"], {
    className: "mb-3"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["InputGroup"].Text, null, "Client-2"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "outline-secondary",
    className: "w-100",
    disabled: true
  }, "Select Option")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["InputGroup"], {
    className: "mb-3"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["InputGroup"].Text, null, "Model"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "outline-secondary",
    className: "w-100",
    onClick: handleModelClick
  }, modelButtonText)), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_9___default.a.divider
  }), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["InputGroup"], {
    className: "mb-3"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["InputGroup"].Text, null, "Warehouse"), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_9___default.a.buttonGroup
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "outline-secondary",
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_9___default.a.flexButton,
    onClick: handleWarehouseClick
  }, "Warehouse"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "outline-secondary",
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_9___default.a.flexButton,
    onClick: handleUnassignedClick
  }, "Unassigned")))))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], {
    md: 8
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_9___default.a.tableContainer
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Table"], {
    striped: true,
    bordered: true,
    hover: true,
    size: "sm",
    className: "mb-0"
  }, __jsx("thead", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_9___default.a.stickyHeader
  }, __jsx("tr", null, __jsx("th", {
    onClick: () => sortCheckAll(0)
  }, "Name"), __jsx("th", {
    onClick: () => sortCheckAll(1)
  }, "Date"), __jsx("th", {
    onClick: () => sortCheckAll(2)
  }, "Work Order"), __jsx("th", {
    onClick: () => sortCheckAll(3)
  }, "Product Number"), __jsx("th", {
    onClick: () => sortCheckAll(4)
  }, "Serial Number"), __jsx("th", null, "Select"))), __jsx("tbody", null, info.map(item => __jsx("tr", {
    className: "clickable-row",
    key: item.id
  }, __jsx("td", null, item.name), __jsx("td", null, Object(_utils_fetchAssociations__WEBPACK_IMPORTED_MODULE_3__[/* formatDate */ "d"])(item.date)), __jsx("td", null, item.workOrders && item.workOrders.length > 0 ? item.workOrders[item.workOrders.length - 1].workOrder : "N/A"), __jsx("td", null, item.pn), __jsx("td", null, item.sn), __jsx("td", null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "primary",
    onClick: () => rowSelect(item)
  }, "Select")))))), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_9___default.a.searchContainer
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"], {
    className: "d-flex pb-2"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["FormControl"], {
    type: showListSearch,
    placeholder: "Search",
    className: "me-2 flex-grow-1",
    "aria-label": "Search",
    value: search,
    onChange: searchChangeHandler,
    style: {
      flex: "1"
    }
  }), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["NavDropdown"], {
    title: select,
    id: "collasible-nav-dropdown",
    show: showList,
    onMouseEnter: () => setShowList(true),
    onMouseLeave: () => setShowList(false),
    style: {
      marginTop: "-5px"
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["NavDropdown"].Item, {
    onClick: () => setSelect("Name") & setShowListSearch("text")
  }, "Name"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["NavDropdown"].Item, {
    onClick: () => setSelect("Date") & setShowListSearch("date")
  }, "Date"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["NavDropdown"].Item, {
    onClick: () => setSelect("Work Order") & setShowListSearch("number")
  }, "Work Order"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["NavDropdown"].Item, {
    onClick: () => setSelect("Product Number") & setShowListSearch("number")
  }, "Product Number"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["NavDropdown"].Item, {
    onClick: () => setSelect("Description") & setShowListSearch("text")
  }, "Description")))))))))))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Footer, null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "secondary",
    onClick: handleClose
  }, "Cancel"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "warning",
    onClick: () => {
      setSelectedParent(null);
      handleClose();
    }
  }, "Clear Selection")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"], {
    show: showClientModal,
    onHide: handleCloseClientModal
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Header, {
    closeButton: true
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Title, null, "Select Client")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Body, null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["FormControl"], {
    type: "text",
    placeholder: "Search by name",
    className: "mb-3",
    value: clientSearchTerm,
    onChange: e => setClientSearchTerm(e.target.value)
  }), __jsx(_utils_ClientTable__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"], {
    clients: clients.filter(client => client.name.toLowerCase().includes(clientSearchTerm.toLowerCase())),
    disableInfo: true,
    onSelectClient: handleClientSelect,
    onInfoClick: handleClientInfo,
    clearSelection: () => handleClientSelect(null) // Clear selection handler

  }))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"], {
    show: showModelModal,
    onHide: handleCloseModelModal
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Header, {
    closeButton: true
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Title, null, "Select Model")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Body, null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["FormControl"], {
    type: "text",
    placeholder: "Search by name",
    className: "mb-3",
    value: modelSearchTerm,
    onChange: e => setModelSearchTerm(e.target.value)
  }), __jsx(_utils_ModelTable__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], {
    models: models.filter(model => typeof model === "string" ? model.toLowerCase().includes(modelSearchTerm.toLowerCase()) : false),
    onSelectModel: handleModelSelect,
    clearSelection: () => handleModelSelect(null) // Clear selection handler

  }))));
};

__jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {
  id: "2081140824",
  dynamic: [_styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_9___default.a.tableContainer]
}, [".parent-modal-dialog{max-width:95vw;margin:0 auto;}", `.parent-modal-dialog .modal-body .${_styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_9___default.a.tableContainer}{max-height:70vh;overflow:auto;}`]);

/* harmony default export */ __webpack_exports__["default"] = (ParentModal);

/***/ }),

/***/ "oysE":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "default", function() { return /* binding */ DisplayItem; });
__webpack_require__.d(__webpack_exports__, "getServerSideProps", function() { return /* binding */ getServerSideProps; });

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__("cDcd");
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: ./node_modules/bootstrap/dist/css/bootstrap.min.css
var bootstrap_min = __webpack_require__("q4sD");

// EXTERNAL MODULE: external "react-bootstrap"
var external_react_bootstrap_ = __webpack_require__("IZS3");

// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__("YFqc");
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);

// EXTERNAL MODULE: ./context/AuthUserContext.js + 1 modules
var AuthUserContext = __webpack_require__("XrFm");

// EXTERNAL MODULE: ./context/Firebase.js
var Firebase = __webpack_require__("NY6m");

// EXTERNAL MODULE: ./pages/LoggedIn.js
var LoggedIn = __webpack_require__("mJJZ");

// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__("4Q3z");

// EXTERNAL MODULE: ./utils/fetchAssociations.js
var fetchAssociations = __webpack_require__("qoNY");

// EXTERNAL MODULE: ./utils/ClientTable.js
var ClientTable = __webpack_require__("8HvV");

// EXTERNAL MODULE: ./pages/NewSearch/ClientInfoModal.js
var ClientInfoModal = __webpack_require__("MbKa");

// EXTERNAL MODULE: ./pages/NewSearch/AddItem/parentModal.js
var parentModal = __webpack_require__("oGF+");

// EXTERNAL MODULE: external "next/dynamic"
var dynamic_ = __webpack_require__("/T1H");
var dynamic_default = /*#__PURE__*/__webpack_require__.n(dynamic_);

// EXTERNAL MODULE: ./pages/NewSearch/InfoModal.js
var InfoModal = __webpack_require__("VZWn");

// EXTERNAL MODULE: ./pages/NewSearch/item/[id]/MachineSelectionModal.js
var MachineSelectionModal = __webpack_require__("cJ15");

// CONCATENATED MODULE: ./utils/BluefolderService.js
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// BluefolderService.js
const API_TOKEN = "9b224624-44db-49dd-9042-c3b15e9a39d4"; // your token

const ITEMS_URL = "https://app.bluefolder.com/api/2.0/items/add.aspx";
const MATERIALS_URL = "https://app.bluefolder.com/api/2.0/serviceRequests/addMaterial.aspx";
const HEADERS = {
  "Content-Type": "text/xml"
};
async function addServiceItem(serviceRequestId, item) {
  // Use "Service Item" for name and description
  const uniqueName = "Service Item"; // Step 1: Create a new material item in BlueFolder

  const itemPayload = `
    <request>
      <itemAdd>
        <itemType>materials</itemType>
        <itemName>${uniqueName}</itemName>
        <description>Service Item</description>
        <accountName></accountName>
        <isFlatRate>false</isFlatRate>
        <mfrDescription></mfrDescription>
        <mfrItemNo></mfrItemNo>
        <mfrName>BlueFolderTestManufacturer</mfrName>
        <notes>Service Item</notes>
        <taxableDefault>true</taxableDefault>
        <unitCost>0.00</unitCost>
        <unitPrice>0.00</unitPrice>
        <unitListPrice>0.00</unitListPrice>
      </itemAdd>
    </request>
  `;
  const itemResponse = await fetch(ITEMS_URL, {
    method: "POST",
    headers: _objectSpread(_objectSpread({}, HEADERS), {}, {
      Authorization: "Basic " + btoa(API_TOKEN + ":x")
    }),
    body: itemPayload
  });
  const itemText = await itemResponse.text();
  const parser = new DOMParser();
  const itemXml = parser.parseFromString(itemText, "application/xml");

  if (itemXml.documentElement.getAttribute("status") !== "ok") {
    throw new Error("Failed to create material item in BlueFolder");
  }

  const itemIdElem = itemXml.getElementsByTagName("itemId")[0];
  const itemId = itemIdElem ? itemIdElem.textContent : null; // Step 2: Add the material to the specified work order

  const nowStr = new Date().toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  });
  const comment = `Name: ${item.name}\nPN: ${item.pn}\nSN: ${item.sn}\nStatus: ${item.status}\nDescription: ${item.description}`;
  const materialPayload = `
    <request>
      <serviceRequestAddMaterial>
        <serviceRequestId>${serviceRequestId}</serviceRequestId>
        <dateUsed>${nowStr}</dateUsed>
        <quantity>1</quantity>
        <billingStatus>billable</billingStatus>
        <itemNo>${uniqueName}</itemNo>
        <itemDescription>Service Item</itemDescription>
        <itemUnitCost>0.00</itemUnitCost>
        <itemUnitPrice>0.00</itemUnitPrice>
        <comment>${comment}</comment>
        <commentIsPublic>false</commentIsPublic>
        <taxable>true</taxable>
      </serviceRequestAddMaterial>
    </request>
  `;
  const materialResponse = await fetch(MATERIALS_URL, {
    method: "POST",
    headers: _objectSpread(_objectSpread({}, HEADERS), {}, {
      Authorization: "Basic " + btoa(API_TOKEN + ":x")
    }),
    body: materialPayload
  });
  const materialText = await materialResponse.text();
  const materialXml = parser.parseFromString(materialText, "application/xml");

  if (materialXml.documentElement.getAttribute("status") !== "ok") {
    throw new Error("Failed to add material to work order in BlueFolder");
  }

  return {
    itemId,
    materialResponse: materialText
  };
}
// EXTERNAL MODULE: ./pages/NewSearch/item/[id]/NewLocal.js
var NewLocal = __webpack_require__("7wmr");

// CONCATENATED MODULE: ./utils/inflowAPI.js
function inflowAPI_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function inflowAPI_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { inflowAPI_ownKeys(Object(source), true).forEach(function (key) { inflowAPI_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { inflowAPI_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function inflowAPI_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// // inflowAPI.js
// const BASE_URL   = 'https://cloudapi.inflowinventory.com';
// const COMPANY_ID = 'e28dc600-32a4-4438-a374-68df72caebbd';
// // (Move this to env vars in prod)
// const API_KEY    = '10336E10F0BF982AB7AEB639D2FEB3B2B1C9BD73634D153EA81EE2130A70F9C4-1';
// const headers = {
//   'Authorization': `Bearer ${API_KEY}`,
//   'Content-Type':  'application/json',
//   // Use the latest you saw in server responses; older also works, but stay current:
//   'Accept':        'application/json;version=2025-06-24',
// };
// async function parseErr(res) {
//   const t = await res.text();
//   try { return JSON.parse(t); } catch { return t; }
// }
// // --- Look up existing product by name on the collection endpoint ---
// // Use filter[name] if your tenant supports it; otherwise fall back to filter[smart].
// async function findProductByName(name) {
//   // Try exact name filter first
//   let url = `${BASE_URL}/${COMPANY_ID}/products?filter[name]=${encodeURIComponent(name)}&count=1`;
//   let res = await fetch(url, { headers });
//   if (res.ok) {
//     const data = await res.json();
//     const items = Array.isArray(data?.items) ? data.items : (Array.isArray(data) ? data : []);
//     if (items.length) return items[0];
//   }
//   // Fallback: smart filter (searches common fields)
//   url = `${BASE_URL}/${COMPANY_ID}/products?filter[smart]=${encodeURIComponent(name)}&count=1`;
//   res = await fetch(url, { headers });
//   if (!res.ok) return null;
//   const data2 = await res.json();
//   const items2 = Array.isArray(data2?.items) ? data2.items : (Array.isArray(data2) ? data2 : []);
//   return items2.length ? items2[0] : null;
// }
// class InflowAPI {
//   /**
//    * Upsert a product in inFlow via PUT to the collection.
//    * @param {{ productId?: string, name: string, description: string, imageUrls?: string[], sku?: string }} params
//    */
//   static async upsertProduct({ productId, name, description, imageUrls = [], sku }) {
//     if (!name || !name.trim()) throw new Error('Name is required');
//     // If no productId, check if one already exists with this name to avoid the unique-name error.
//     if (!productId) {
//       const existing = await findProductByName(name.trim());
//       if (existing && (existing.productId || existing.id)) {
//         productId = existing.productId || existing.id;
//       }
//     }
//     // If still no id, generate one (this matched your previously-working flow)
//     const id = productId || crypto.randomUUID();
//     // Build the payload exactly like your original—PUT to the collection with productId
//     const payload = {
//       productId: id,
//       name,
//       description,
//       ...(sku ? { sku } : {}),
//       ...(imageUrls.length > 0 && {
//         images: imageUrls.map(u => ({
//           imageId: crypto.randomUUID(),
//           originalUrl: u,
//         })),
//       }),
//     };
//     const url = `${BASE_URL}/${COMPANY_ID}/products`;
//     const res = await fetch(url, {
//       method: 'PUT',
//       headers,
//       body: JSON.stringify(payload),
//     });
//     if (!res.ok) {
//       const err = await parseErr(res);
//       throw new Error(`inFlow API error (${res.status}): ${typeof err === 'string' ? err : JSON.stringify(err)}`);
//     }
//     return res.json();
//   }
// }
// export default InflowAPI;
// utils/inflowAPI.js (only the changed bits)
const BASE_URL = 'https://cloudapi.inflowinventory.com';
const COMPANY_ID = 'e28dc600-32a4-4438-a374-68df72caebbd';
const API_KEY = '10336E10F0BF982AB7AEB639D2FEB3B2B1C9BD73634D153EA81EE2130A70F9C4-1';
const headers = {
  Authorization: `Bearer ${API_KEY}`,
  'Content-Type': 'application/json',
  // stick to a stable version you know works in your tenant:
  Accept: 'application/json;version=2024-10-01'
};

const n = s => (s !== null && s !== void 0 ? s : '').toString().trim();

async function parseText(res) {
  const t = await res.text();

  try {
    return {
      json: JSON.parse(t),
      raw: t
    };
  } catch {
    return {
      json: null,
      raw: t
    };
  }
} // ---- EXACT lookup helpers (no fuzzy/SMART fallback) ------------------------


async function findProductIdByExactName(name) {
  const nameNorm = n(name);
  if (!nameNorm) return null;
  const url = `${BASE_URL}/${COMPANY_ID}/products?filter[name]=` + `${encodeURIComponent(nameNorm)}&count=1`;
  const res = await fetch(url, {
    headers
  });
  if (!res.ok) return null;
  const data = await res.json();
  const items = Array.isArray(data === null || data === void 0 ? void 0 : data.items) ? data.items : Array.isArray(data) ? data : [];
  const item = items[0];
  if (!item) return null; // guard: only accept if name is an exact (case-insensitive) match

  if (n(item.name).toLowerCase() !== nameNorm.toLowerCase()) return null;
  return item.productId || item.id || null;
} // Prefer direct GET /products/{id}; fallback to collection filter by id


async function getProductById(productId) {
  // Try item endpoint
  let res = await fetch(`${BASE_URL}/${COMPANY_ID}/products/${encodeURIComponent(productId)}`, {
    headers
  });
  if (res.ok) return res.json(); // Fallback: filter by id on collection

  res = await fetch(`${BASE_URL}/${COMPANY_ID}/products?filter[productId]=${encodeURIComponent(productId)}&count=1`, {
    headers
  });
  if (!res.ok) return null;
  const data = await res.json();
  const items = Array.isArray(data === null || data === void 0 ? void 0 : data.items) ? data.items : Array.isArray(data) ? data : [];
  return items[0] || null;
}

function buildImages(imageUrls = []) {
  return imageUrls.filter(Boolean).map(u => ({
    imageId: crypto.randomUUID(),
    originalUrl: u
  }));
}

class InflowAPI {
  /**
   * Strict upsert: exact-name reuse only; verify by id afterward.
   */
  static async upsertProduct({
    productId,
    name,
    description,
    imageUrls = [],
    sku,
    customFields
  }) {
    var _ref, _after$isActive;

    const nameNorm = n(name);
    if (!nameNorm) throw new Error('Name is required'); // Only reuse an id if the name is an exact match. No SMART search.

    if (!productId) productId = await findProductIdByExactName(nameNorm);
    const id = productId || crypto.randomUUID();

    const payload = inflowAPI_objectSpread(inflowAPI_objectSpread(inflowAPI_objectSpread(inflowAPI_objectSpread({
      productId: id,
      name: nameNorm,
      isActive: true
    }, n(description) ? {
      description: n(description)
    } : {}), n(sku) ? {
      sku: n(sku)
    } : {}), imageUrls.length ? {
      images: buildImages(imageUrls)
    } : {}), customFields && Object.keys(customFields).length ? {
      customFields
    } : {});

    console.log('[inFlow] PUT payload:', payload);
    const res = await fetch(`${BASE_URL}/${COMPANY_ID}/products`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(payload)
    });
    const {
      json,
      raw
    } = await parseText(res);
    console.log('[inFlow] Raw PUT response:', res.status, raw);

    if (!res.ok) {
      throw new Error(`inFlow API error (${res.status}): ${raw}`);
    } // prefer the id the server gave us (if any), else the one we sent


    const resolvedId = json && (json.productId || json.id) || id; // Verify by ID only (no fuzzy). This prevents false “success”.

    const after = await getProductById(resolvedId);
    console.log('[inFlow] Verified by ID:', {
      productId: resolvedId,
      name: after === null || after === void 0 ? void 0 : after.name,
      sku: after === null || after === void 0 ? void 0 : after.sku,
      // many tenants surface one of these; log whatever exists so you can tell if it’s hidden
      isActive: (_ref = (_after$isActive = after === null || after === void 0 ? void 0 : after.isActive) !== null && _after$isActive !== void 0 ? _after$isActive : after === null || after === void 0 ? void 0 : after.active) !== null && _ref !== void 0 ? _ref : after === null || after === void 0 ? void 0 : after.status,
      categoryId: after === null || after === void 0 ? void 0 : after.categoryId
    });

    if (!after) {
      throw new Error('Write appeared to succeed, but GET by id returned nothing.');
    }

    return after;
  }

}

/* harmony default export */ var inflowAPI = (InflowAPI);
// EXTERNAL MODULE: ./context/FirebaseAdmin.js
var FirebaseAdmin = __webpack_require__("Aroy");

// CONCATENATED MODULE: ./pages/NewSearch/item/[id]/index.js
var __jsx = external_react_default.a.createElement;

function _id_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _id_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { _id_ownKeys(Object(source), true).forEach(function (key) { _id_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { _id_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _id_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

















 //inflow API

 // Import for SSR

 // === BUILD A MAP ONLY OF THOSE FIELDS THE USER ACTUALLY PICKED ===

function buildLocalLocObject(loc) {
  var _loc$section, _loc$section2;

  const o = {};
  if (loc.region) o.region = loc.region;
  if ((_loc$section = loc.section) !== null && _loc$section !== void 0 && _loc$section.letter && (_loc$section2 = loc.section) !== null && _loc$section2 !== void 0 && _loc$section2.number) o.section = loc.section; // pick up the new singular fields, too:

  if (loc.bin !== undefined && loc.bin !== "") o.bin = loc.bin;
  if (loc.pallet !== undefined && loc.pallet !== "") o.pallet = loc.pallet;
  return o;
} // This will only load the component on the client-side.


const BarcodeScannerComponent = dynamic_default()(() => Promise.resolve(/* import() */).then(__webpack_require__.t.bind(null, "lzi3", 7)), {
  ssr: false,
  loadableGenerated: {
    webpack: () => [/*require.resolve*/("lzi3")],
    modules: ["NewSearch\\item\\[id]\\index.js -> " + "react-qr-barcode-scanner"]
  }
}); // Simulates a network request delay.

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
  } = Object(external_react_["useState"])(false);
  Object(external_react_["useEffect"])(() => {
    if (isLoading) {
      simulateNetworkRequest().then(() => setLoading(false));
    }
  }, [isLoading]);

  const handleClick = () => setLoading(true);

  return __jsx(link_default.a, {
    href: `/${route}`
  }, __jsx("a", {
    className: `btn btn-${type}`,
    disabled: isLoading,
    onClick: !isLoading ? handleClick : null
  }, isLoading ? "Loading…" : name));
}

function DisplayItem({
  initialItem,
  initialMachineData,
  error
}) {
  var _initialItem$price, _initialItem$status, _initialItem$length, _initialItem$width, _initialItem$height, _initialItem$poNumber, _initialItem$tracking, _initialItem$visible, _descriptions$selecte3, _descriptions$selecte4, _newLocalFrom$section, _newLocalFrom$section2, _newLocalCurrent$sect, _newLocalCurrent$sect2;

  // Feature flag to show/hide the 3 Slack buttons
  const SHOW_SLACK_BUTTONS = "true" === "true";
  const router = Object(router_["useRouter"])();
  const {
    signOut
  } = Object(AuthUserContext["b" /* useAuth */])(); // const { id } = router.query;

  const {
    id: idFromRouter
  } = router.query;
  const initialId = (initialItem === null || initialItem === void 0 ? void 0 : initialItem.id) || idFromRouter; // Use a single local var everywhere in this component

  const id = initialId;
  const {
    0: items,
    1: setItems
  } = Object(external_react_["useState"])({
    name: (initialItem === null || initialItem === void 0 ? void 0 : initialItem.name) || "",
    pn: Array.isArray(initialItem === null || initialItem === void 0 ? void 0 : initialItem.pn) ? initialItem.pn : initialItem !== null && initialItem !== void 0 && initialItem.pn ? [initialItem.pn] : [],
    sn: Array.isArray(initialItem === null || initialItem === void 0 ? void 0 : initialItem.sn) ? initialItem.sn : initialItem !== null && initialItem !== void 0 && initialItem.sn ? [initialItem.sn] : [],
    // hydrate these from initialItem so SSR renders fully on deploy
    price: (_initialItem$price = initialItem === null || initialItem === void 0 ? void 0 : initialItem.price) !== null && _initialItem$price !== void 0 ? _initialItem$price : "",
    status: (_initialItem$status = initialItem === null || initialItem === void 0 ? void 0 : initialItem.status) !== null && _initialItem$status !== void 0 ? _initialItem$status : "",
    length: (_initialItem$length = initialItem === null || initialItem === void 0 ? void 0 : initialItem.length) !== null && _initialItem$length !== void 0 ? _initialItem$length : "",
    width: (_initialItem$width = initialItem === null || initialItem === void 0 ? void 0 : initialItem.width) !== null && _initialItem$width !== void 0 ? _initialItem$width : "",
    height: (_initialItem$height = initialItem === null || initialItem === void 0 ? void 0 : initialItem.height) !== null && _initialItem$height !== void 0 ? _initialItem$height : "",
    poNumber: (_initialItem$poNumber = initialItem === null || initialItem === void 0 ? void 0 : initialItem.poNumber) !== null && _initialItem$poNumber !== void 0 ? _initialItem$poNumber : "",
    trackingNumber: (_initialItem$tracking = initialItem === null || initialItem === void 0 ? void 0 : initialItem.trackingNumber) !== null && _initialItem$tracking !== void 0 ? _initialItem$tracking : "",
    localSN: (initialItem === null || initialItem === void 0 ? void 0 : initialItem.localSN) || "",
    arrival_date: (initialItem === null || initialItem === void 0 ? void 0 : initialItem.arrival_date) || "",
    visible: (_initialItem$visible = initialItem === null || initialItem === void 0 ? void 0 : initialItem.visible) !== null && _initialItem$visible !== void 0 ? _initialItem$visible : true
  }); // ⬇️ put this INSIDE DisplayItem, after the related useState hooks

  Object(external_react_["useEffect"])(() => {
    if (!initialItem) return;
    setDescriptions(initialItem.descriptions || []);
    setWorkOrders(initialItem.workOrders || []);
    setDOM(initialItem.DOM || "");
    setItems(prev => {
      var _ref, _initialItem$status2, _ref2, _initialItem$price2, _ref3, _initialItem$length2, _ref4, _initialItem$width2, _ref5, _initialItem$height2, _ref6, _initialItem$poNumber2, _ref7, _initialItem$tracking2;

      return _id_objectSpread(_id_objectSpread({}, prev), {}, {
        // only overwrite if SSR provided a value; otherwise keep what you have
        status: (_ref = (_initialItem$status2 = initialItem.status) !== null && _initialItem$status2 !== void 0 ? _initialItem$status2 : prev.status) !== null && _ref !== void 0 ? _ref : "",
        price: (_ref2 = (_initialItem$price2 = initialItem.price) !== null && _initialItem$price2 !== void 0 ? _initialItem$price2 : prev.price) !== null && _ref2 !== void 0 ? _ref2 : "",
        length: (_ref3 = (_initialItem$length2 = initialItem.length) !== null && _initialItem$length2 !== void 0 ? _initialItem$length2 : prev.length) !== null && _ref3 !== void 0 ? _ref3 : "",
        width: (_ref4 = (_initialItem$width2 = initialItem.width) !== null && _initialItem$width2 !== void 0 ? _initialItem$width2 : prev.width) !== null && _ref4 !== void 0 ? _ref4 : "",
        height: (_ref5 = (_initialItem$height2 = initialItem.height) !== null && _initialItem$height2 !== void 0 ? _initialItem$height2 : prev.height) !== null && _ref5 !== void 0 ? _ref5 : "",
        poNumber: (_ref6 = (_initialItem$poNumber2 = initialItem.poNumber) !== null && _initialItem$poNumber2 !== void 0 ? _initialItem$poNumber2 : prev.poNumber) !== null && _ref6 !== void 0 ? _ref6 : "",
        trackingNumber: (_ref7 = (_initialItem$tracking2 = initialItem.trackingNumber) !== null && _initialItem$tracking2 !== void 0 ? _initialItem$tracking2 : prev.trackingNumber) !== null && _ref7 !== void 0 ? _ref7 : ""
      });
    });
  }, [initialItem]);
  const {
    0: newLocalFrom,
    1: setNewLocalFrom
  } = Object(external_react_["useState"])({
    region: "",
    section: {
      letter: "",
      number: ""
    },
    bin: "",
    pallet: ""
  });
  const {
    0: newLocalCurrent,
    1: setNewLocalCurrent
  } = Object(external_react_["useState"])({
    region: "",
    section: {
      letter: "",
      number: ""
    },
    bin: "",
    pallet: ""
  }); // New states for separate client selections:

  const {
    0: selectedClientFrom,
    1: setSelectedClientFrom
  } = Object(external_react_["useState"])(null);
  const {
    0: selectedClientCurrent,
    1: setSelectedClientCurrent
  } = Object(external_react_["useState"])(null);
  const {
    0: selectedMachine,
    1: setSelectedMachine
  } = Object(external_react_["useState"])(null);
  const {
    0: selectedCurrentMachine,
    1: setSelectedCurrentMachine
  } = Object(external_react_["useState"])(null); // whenever you pick a new “From” client or machine, clear the old From-loc:
  // useEffect(() => {
  //   setNewLocalFrom({ region: "", section: { letter: "", number: "" }, bin: "", pallet: "" });
  // }, [selectedClientFrom, selectedMachine]);
  // const didMountFrom = useRef(false);
  // useEffect(() => {
  //   if (!didMountFrom.current) {
  //     // first time through (the data-load phase), don’t clear
  //     didMountFrom.current = true;
  //     return;
  //   }
  //   // thereafter, when the user picks a new client or machine, clear:
  //   setNewLocalFrom({ region: "", section: { letter: "", number: "" }, bin: "", pallet: "" });
  //   setLocalLocFrom("");
  // }, [selectedClientFrom, selectedMachine]);
  // whenever you pick a new “Current” client or machine, clear the old Current-loc:
  // useEffect(() => {
  //   setNewLocalCurrent({ region: "", section: { letter: "", number: "" }, bin: "", pallet: "" });
  // }, [selectedClientCurrent, selectedCurrentMachine]);
  // const [didFetch, setDidFetch] = useState(false);
  // useEffect(() => {
  //   if (!didFetch) {
  //     // we’re in the data-load phase, skip clearing
  //     setDidFetch(true);
  //     return;
  //   }
  //   // only clear on subsequent user changes:
  //   setNewLocalCurrent({ region: "", section: {}, bin: "", pallet: "" });
  // }, [selectedClientCurrent, selectedCurrentMachine]);
  // These arrays will be populated from Firebase.

  const {
    0: pnOptions,
    1: setPnOptions
  } = Object(external_react_["useState"])([]);
  const {
    0: snOptions,
    1: setSnOptions
  } = Object(external_react_["useState"])([]);
  const {
    0: descriptions,
    1: setDescriptions
  } = Object(external_react_["useState"])([{
    description: "",
    date: ""
  }]);
  const {
    0: workOrders,
    1: setWorkOrders
  } = Object(external_react_["useState"])([{
    workOrder: "",
    date: ""
  }]);
  const {
    0: clients,
    1: setClients
  } = Object(external_react_["useState"])([]);
  const {
    0: photos,
    1: setPhotos
  } = Object(external_react_["useState"])([]);
  const {
    0: show,
    1: setShow
  } = Object(external_react_["useState"])(false);
  const {
    0: showErr,
    1: setShowErr
  } = Object(external_react_["useState"])(false);
  const {
    0: Err,
    1: setErr
  } = Object(external_react_["useState"])("N/A");
  const {
    0: showDescModal,
    1: setShowDescModal
  } = Object(external_react_["useState"])(false);
  const {
    0: showWoModal,
    1: setShowWoModal
  } = Object(external_react_["useState"])(false);
  const {
    0: showClientModal,
    1: setShowClientModal
  } = Object(external_react_["useState"])(false);
  const {
    0: showMachineModal,
    1: setShowMachineModal
  } = Object(external_react_["useState"])(false);
  const {
    0: showParentModal,
    1: setShowParentModal
  } = Object(external_react_["useState"])(false);
  const {
    0: showCameraModal,
    1: setShowCameraModal
  } = Object(external_react_["useState"])(false);
  const {
    0: showSaveModal,
    1: setShowSaveModal
  } = Object(external_react_["useState"])(false);
  const {
    0: showPrintModal,
    1: setShowPrintModal
  } = Object(external_react_["useState"])(false);
  const {
    0: machineSelectionModal,
    1: setMachineSelectionModal
  } = Object(external_react_["useState"])(false);
  const {
    0: selectedDesc,
    1: setSelectedDesc
  } = Object(external_react_["useState"])(0);
  const {
    0: selectedClient,
    1: setSelectedClient
  } = Object(external_react_["useState"])(null);
  const {
    0: selectedParent,
    1: setSelectedParent
  } = Object(external_react_["useState"])(null);
  const {
    0: TheMachine,
    1: setTheMachine
  } = Object(external_react_["useState"])(null);
  const {
    0: machineOptions,
    1: setMachineOptions
  } = Object(external_react_["useState"])([]);
  const {
    0: search,
    1: setSearch
  } = Object(external_react_["useState"])("");
  const {
    0: capturedPhoto,
    1: setCapturedPhoto
  } = Object(external_react_["useState"])(null);
  const {
    0: cameraFacing,
    1: setCameraFacing
  } = Object(external_react_["useState"])("environment");
  const {
    0: addToWebsite,
    1: setAddToWebsite
  } = Object(external_react_["useState"])(false);
  const {
    0: machinePick,
    1: setMachinePick
  } = Object(external_react_["useState"])(false);
  const {
    0: freqItem,
    1: setFreqItem
  } = Object(external_react_["useState"])(0);
  const {
    0: usagePastYear,
    1: setUsagePastYear
  } = Object(external_react_["useState"])(0);
  const {
    0: machineFrequency,
    1: setMachineFrequency
  } = Object(external_react_["useState"])(0); // State for the extra (dimensions/price/DOM/PO Number) section.

  const {
    0: showExtra,
    1: setShowExtra
  } = Object(external_react_["useState"])(false); // State for the local warehouse location inputs.

  const {
    0: localLocFrom,
    1: setLocalLocFrom
  } = Object(external_react_["useState"])("");
  const {
    0: localLocCurrent,
    1: setLocalLocCurrent
  } = Object(external_react_["useState"])(""); // New state for DOM (Date of Manufacture)

  const {
    0: DOM,
    1: setDOM
  } = Object(external_react_["useState"])(""); // New state for OEM, Modality, and Model.

  const {
    0: oem,
    1: setOem
  } = Object(external_react_["useState"])("");
  const {
    0: modality,
    1: setModality
  } = Object(external_react_["useState"])("");
  const {
    0: model,
    1: setModel
  } = Object(external_react_["useState"])(""); // More info modal state.

  const {
    0: showInfoModal,
    1: setShowInfoModal
  } = Object(external_react_["useState"])(false);
  const {
    0: itemName,
    1: setItemName
  } = Object(external_react_["useState"])("");
  const {
    0: machineFieldsInitialized,
    1: setMachineFieldsInitialized
  } = Object(external_react_["useState"])(false); // near the top of DisplayItem()

  const {
    0: showLocalModalFrom,
    1: setShowLocalModalFrom
  } = Object(external_react_["useState"])(false);
  const {
    0: showLocalModalCurrent,
    1: setShowLocalModalCurrent
  } = Object(external_react_["useState"])(false);

  const openLocalModalFrom = () => setShowLocalModalFrom(true);

  const closeLocalModalFrom = () => setShowLocalModalFrom(false);

  const openLocalModalCurrent = () => setShowLocalModalCurrent(true);

  const closeLocalModalCurrent = () => setShowLocalModalCurrent(false); // at the top of DisplayItem()


  const {
    0: showNewLocalModalFrom,
    1: setShowNewLocalModalFrom
  } = Object(external_react_["useState"])(false);
  const {
    0: showNewLocalModalCurrent,
    1: setShowNewLocalModalCurrent
  } = Object(external_react_["useState"])(false);

  function formatLoc(loc) {
    var _loc$section3, _loc$section4;

    if (!loc) return "";
    const parts = [];
    if (loc.region) parts.push(loc.region);
    if ((_loc$section3 = loc.section) !== null && _loc$section3 !== void 0 && _loc$section3.letter && (_loc$section4 = loc.section) !== null && _loc$section4 !== void 0 && _loc$section4.number) parts.push(`${loc.section.letter}${loc.section.number}`);
    if (loc.bin) parts.push(`B${loc.bin}`);
    if (loc.pallet) parts.push(`P${loc.pallet}`);
    return parts.join("–");
  } // when the From-client changes, clear any old local-loc
  // useEffect(() => {
  //   setNewLocalFrom({ region: "", section: { letter: "", number: "" }, bin: "", pallet: "" });
  // }, [selectedClientFrom]);
  // // when the From-machine changes, clear any old local-loc
  // useEffect(() => {
  //   setNewLocalFrom({ region: "", section: { letter: "", number: "" }, bin: "", pallet: "" });
  // }, [selectedMachine]);
  // same for Current:
  // useEffect(() => {
  //   setNewLocalCurrent({ region: "", section: { letter: "", number: "" }, bin: "", pallet: "" });
  // }, [selectedClientCurrent, selectedCurrentMachine]);
  // const handleSendToInflow = async () => {
  //   try {
  //     const name = items.name;
  //     const description = descriptions[selectedDesc]?.description || "";
  //     // gather every photo URL from Firebase Storage
  //     const imageUrls = photos.map((p) => p.url);
  //     await InflowAPI.upsertProduct({ name, description, imageUrls });
  //     alert("Sent to inFlow successfully!");
  //   } catch (err) {
  //     console.error(err);
  //     alert("Error sending to inFlow: " + err.message);
  //   }
  // };


  const handleSendToInflow = async () => {
    try {
      var _descriptions$selecte;

      const name = (items.name || '').trim();

      if (!name) {
        alert('Item needs a name before sending to inFlow.');
        return;
      } // Regular description (don’t also send a custom “Description” unless you truly have one)


      const description = (((_descriptions$selecte = descriptions[selectedDesc]) === null || _descriptions$selecte === void 0 ? void 0 : _descriptions$selecte.description) || '').trim(); // Photos already fetched from storage

      const imageUrls = photos.map(p => p.url).filter(Boolean); // SKU = your item id

      const sku = (id !== null && id !== void 0 ? id : '').toString(); // Basic normalizers

      const toCSV = arr => Array.isArray(arr) ? arr.filter(Boolean).join(', ') : arr || ''; // YYYY-MM-DD for the date field in inFlow


      const arrivalISO = items.arrival_date ? new Date(items.arrival_date).toISOString().slice(0, 10) : '';
      const pnStr = Array.isArray(items.pn) ? items.pn.filter(Boolean).join(', ') : items.pn || '';
      const snStr = Array.isArray(items.sn) ? items.sn.filter(Boolean).join(', ') : items.sn || ''; // Most recent WO (you already have this)

      const mostRecentWO = workOrders !== null && workOrders !== void 0 && workOrders.length ? workOrders.reduce((latest, cur) => new Date(cur.date) > new Date(latest.date) ? cur : latest, workOrders[0]) : {
        workOrder: '',
        date: ''
      }; // Build the numbered fields (match your inFlow “Field 1..10”)

      const customFields = {
        custom1: (oem || '').trim(),
        // OEM   (dropdown)
        custom2: (modality || '').trim(),
        // Modality (dropdown)
        custom3: (model || '').trim(),
        // Model (dropdown)
        custom4: (description || '').trim(),
        // Description (text) - optional duplicate
        custom5: (mostRecentWO.workOrder || '').trim(),
        // Work Order (text)
        custom6: ((selectedClientFrom === null || selectedClientFrom === void 0 ? void 0 : selectedClientFrom.name) || '').trim(),
        // From (text)
        custom7: pnStr,
        // Product Number (text)
        custom8: snStr,
        // Serial Number (text)
        custom9: arrivalISO,
        // Arrival Date (date)
        custom10: ((selectedClientCurrent === null || selectedClientCurrent === void 0 ? void 0 : selectedClientCurrent.name) || '').trim() // Current (text)

      };
      console.log('[inFlow] customFields to send (numbered):', customFields);
      const created = await inflowAPI.upsertProduct({
        name,
        description,
        sku,
        imageUrls,
        customFields
      });
      alert(`Sent to inFlow successfully. ID: ${(created === null || created === void 0 ? void 0 : created.productId) || (created === null || created === void 0 ? void 0 : created.id) || '(unknown)'}`);
    } catch (err) {
      console.error(err);
      alert('Error sending to inFlow: ' + err.message);
    }
  }; // const [storedMachine, setStoredMachine] = useState(null);
  // useEffect(() => {
  //   // once any of these three change, re-merge:
  //   if (TheMachine || selectedCurrentMachine || selectedMachine) {
  //     const merged = updateMachineFields(
  //       TheMachine,
  //       selectedCurrentMachine,
  //       selectedMachine
  //     );
  //     setOem(merged.oem);
  //     setModality(merged.modality);
  //     setModel(merged.model);
  //   }
  // }, [TheMachine, selectedCurrentMachine, selectedMachine]);
  // whenever the “From” client changes:


  Object(external_react_["useEffect"])(() => {
    var _selectedClientFrom$n;

    setShowLocalLocFrom((selectedClientFrom === null || selectedClientFrom === void 0 ? void 0 : (_selectedClientFrom$n = selectedClientFrom.name) === null || _selectedClientFrom$n === void 0 ? void 0 : _selectedClientFrom$n.toLowerCase()) === "socalwarehouse");
  }, [selectedClientFrom]); // whenever the “Current” client changes:

  Object(external_react_["useEffect"])(() => {
    var _selectedClientCurren;

    setShowLocalLocCurrent((selectedClientCurrent === null || selectedClientCurrent === void 0 ? void 0 : (_selectedClientCurren = selectedClientCurrent.name) === null || _selectedClientCurren === void 0 ? void 0 : _selectedClientCurren.toLowerCase()) === "socalwarehouse");
  }, [selectedClientCurrent]); // Fetch clients data.

  Object(external_react_["useEffect"])(() => {
    async function fetchClientsData() {
      try {
        const clientsData = await Object(fetchAssociations["a" /* fetchClients */])();
        console.log(clientsData);
        setClients(clientsData);
      } catch (error) {
        console.error("Error fetching clients: ", error);
      }
    }

    fetchClientsData();
  }, []); // Fetch PN and SN options from Firebase.

  Object(external_react_["useEffect"])(() => {
    async function fetchPnSn() {
      const db = Firebase["b" /* default */].firestore();
      const snapshot = await db.collection("Test").get();
      let pnSet = new Set();
      let snSet = new Set();
      snapshot.forEach(doc => {
        const data = doc.data();
        if (data.pn) pnSet.add(data.pn);
        if (data.sn) snSet.add(data.sn);
      });
      const pnArray = [...pnSet];
      const snArray = [...snSet];
      setPnOptions(pnArray);
      setSnOptions(snArray);
    }

    fetchPnSn();
  }, []);
  Object(external_react_["useEffect"])(() => {
    if (id) fetchData(); // always hydrate on the client
  }, [id]);

  async function resolveClientFromMachine(machineRef, setClient, setMachine, isFrom = true) {
    const machineDoc = await machineRef.get();

    if (machineDoc.exists) {
      var _machineData$name;

      const machineData = machineDoc.data();
      setMachine(_id_objectSpread({
        id: machineDoc.id
      }, machineData)); // Determine if the machine is "interior socal"
      // const isSocalInterior = machineData.name && machineData.name.toLowerCase() === "interior socal";
      // if (isSocalInterior) {
      //   if (isFrom) {
      //     setShowLocalLocFrom(true);
      //   } else {
      //     setShowLocalLocCurrent(true);
      //   }
      // } else {
      // Optionally clear the flag if it is not "interior socal"
      // if (isFrom) {
      //   setShowLocalLocFrom(false);
      // } else {
      //   setShowLocalLocCurrent(false);
      // }
      // }
      // new: fetch client name and combine both checks

      const clientDoc = machineData.client && typeof machineData.client.get === "function" ? await machineData.client.get() : null;
      const clientName = clientDoc && clientDoc.exists ? clientDoc.data().name : null;
      const isSocalInterior = ((_machineData$name = machineData.name) === null || _machineData$name === void 0 ? void 0 : _machineData$name.toLowerCase()) === "interior socal";
      const shouldShow = isSocalInterior || clientName === "SoCalWarehouse";

      if (isFrom) {
        setShowLocalLocFrom(shouldShow);
      } else {
        setShowLocalLocCurrent(shouldShow);
      }

      if (machineData.client && typeof machineData.client.get === "function") {
        const clientDoc = await machineData.client.get();

        if (clientDoc.exists) {
          setClient(_id_objectSpread({
            id: clientDoc.id
          }, clientDoc.data()));
        }
      }
    }
  }

  const fetchData = async () => {
    const id = (initialItem === null || initialItem === void 0 ? void 0 : initialItem.id) || idFromRouter; // <- make sure id exists here

    const db = Firebase["b" /* default */].firestore();
    const doc = await db.collection("Test").doc(id).get();

    if (doc.exists) {
      var _machineFromData, _machineFromData$name, _machineCurrentData, _machineCurrentData$n, _selectedClientFrom$n2, _selectedClientCurren2;

      console.log("test");
      const data = doc.data();
      const normalizedPN = Array.isArray(data.pn) ? data.pn : [data.pn];
      const normalizedSN = Array.isArray(data.sn) ? data.sn : [data.sn];
      setItems(_id_objectSpread(_id_objectSpread({}, data), {}, {
        pn: normalizedPN,
        sn: normalizedSN
      }));
      setDescriptions(data.descriptions || []);
      setWorkOrders(data.workOrders || []);
      if (data.localLocFrom) setLocalLocFrom(data.localLocFrom);
      if (data.localLocCurrent) setLocalLocCurrent(data.localLocCurrent);

      if (data.DOM) {
        setDOM(data.DOM);
      } // …after you do setItems, setDescriptions, etc.
      // load the “newLocal” maps


      if (data.newLocalFrom) setNewLocalFrom(data.newLocalFrom);
      if (data.newLocalCurrent) setNewLocalCurrent(data.newLocalCurrent); // Load PO Number if it exists.

      if (data.poNumber) {
        setItems(prev => _id_objectSpread(_id_objectSpread({}, prev), {}, {
          poNumber: data.poNumber
        }));
      }

      if (data.ClientFrom) {
        const clientFromDoc = await data.ClientFrom.get();

        if (clientFromDoc.exists) {
          setSelectedClientFrom(_id_objectSpread({
            id: clientFromDoc.id
          }, clientFromDoc.data()));
        }
      }

      if (data.ClientCurrent) {
        const clientCurrentDoc = await data.ClientCurrent.get();

        if (clientCurrentDoc.exists) {
          setSelectedClientCurrent(_id_objectSpread({
            id: clientCurrentDoc.id
          }, clientCurrentDoc.data()));
        }
      }

      if (!data.ClientFrom && data.Machine && typeof data.Machine.get === "function") {
        console.log("Entered resolveClientFromMachine for Machine (old style for From)");
        await resolveClientFromMachine(data.Machine, setSelectedClientFrom, setSelectedMachine, true);
      }

      if (!data.ClientCurrent && data.CurrentMachine && typeof data.CurrentMachine.get === "function") {
        console.log("Entered resolveClientFromMachine for CurrentMachine (old style for Current)");
        await resolveClientFromMachine(data.CurrentMachine, setSelectedClientCurrent, setSelectedCurrentMachine, false);
      }

      let machineFromData = null;
      let machineCurrentData = null;

      if (data.MachineFrom) {
        const doc = await data.MachineFrom.get();
        machineFromData = doc.exists ? doc.data() : null;
        setSelectedMachine(_id_objectSpread({
          id: doc.id
        }, doc.data()));
      }

      if (data.MachineCurrent) {
        const doc = await data.MachineCurrent.get();
        machineCurrentData = doc.exists ? doc.data() : null;
        setSelectedCurrentMachine(_id_objectSpread({
          id: doc.id
        }, doc.data()));
      }

      const nameFrom = (_machineFromData = machineFromData) === null || _machineFromData === void 0 ? void 0 : (_machineFromData$name = _machineFromData.name) === null || _machineFromData$name === void 0 ? void 0 : _machineFromData$name.toLowerCase();
      const nameCurrent = (_machineCurrentData = machineCurrentData) === null || _machineCurrentData === void 0 ? void 0 : (_machineCurrentData$n = _machineCurrentData.name) === null || _machineCurrentData$n === void 0 ? void 0 : _machineCurrentData$n.toLowerCase(); // If the machine’s name is “interior socal”, show that branch:
      // setShowLocalLocFrom(nameFrom === "interior socal");
      // // Or if your Firestore already has a value for localLocFrom, show it anyway:
      // if (data.localLocFrom) setShowLocalLocFrom(true);
      // setShowLocalLocCurrent(nameCurrent === "interior socal");
      // if (data.localLocCurrent) setShowLocalLocCurrent(true);
      // new: combine machine-name OR client-name check, keep existing-data

      setShowLocalLocFrom(nameFrom === "interior socal" || (selectedClientFrom === null || selectedClientFrom === void 0 ? void 0 : (_selectedClientFrom$n2 = selectedClientFrom.name) === null || _selectedClientFrom$n2 === void 0 ? void 0 : _selectedClientFrom$n2.toLowerCase()) === "socalwarehouse" || Boolean(data.localLocFrom));
      setShowLocalLocCurrent(nameCurrent === "interior socal" || (selectedClientCurrent === null || selectedClientCurrent === void 0 ? void 0 : (_selectedClientCurren2 = selectedClientCurrent.name) === null || _selectedClientCurren2 === void 0 ? void 0 : _selectedClientCurren2.toLowerCase()) === "socalwarehouse" || Boolean(data.localLocCurrent));
      const theMachineData = data.TheMachine || null;
      setTheMachine(theMachineData);

      if (theMachineData) {
        var _theMachineData$oem, _theMachineData$modal, _theMachineData$model;

        // pull both variants, prefer lowercase if it exists
        const OEM = (_theMachineData$oem = theMachineData.oem) !== null && _theMachineData$oem !== void 0 ? _theMachineData$oem : theMachineData.OEM;
        const Modality = (_theMachineData$modal = theMachineData.modality) !== null && _theMachineData$modal !== void 0 ? _theMachineData$modal : theMachineData.Modality;
        const Model = (_theMachineData$model = theMachineData.model) !== null && _theMachineData$model !== void 0 ? _theMachineData$model : theMachineData.Model;
        setTheMachine(_id_objectSpread(_id_objectSpread({}, theMachineData), {}, {
          OEM,
          Modality,
          Model
        }));
      } // setStoredMachine(theMachineData);
      // **right here** merge from the three sources you just fetched:


      const merged = updateMachineFields(theMachineData, machineCurrentData, machineFromData);
      setOem(merged.oem);
      setModality(merged.modality);
      setModel(merged.model);
      console.log("SelectedMachine:", selectedMachine, "SelectedCurrentMachine:", selectedCurrentMachine); // Show local loc inputs if applicable
      // if (
      //   selectedMachine &&
      //   selectedMachine.name &&
      //   selectedMachine.name.toLowerCase() === "interior socal"
      // ) {
      //   setShowLocalLocFrom(true);
      // }
      // if (
      //   selectedCurrentMachine &&
      //   selectedCurrentMachine.name &&
      //   selectedCurrentMachine.name.toLowerCase() === "interior socal"
      // ) {
      //   setShowLocalLocCurrent(true);
      // }

      if (data.Parent) {
        const parentDoc = await data.Parent.get();
        setSelectedParent(_id_objectSpread({
          id: parentDoc.id
        }, parentDoc.data()));
      } // Priority auto‑population of machine fields.
      // const updatedFields = updateMachineFields(storedMachine, selectedCurrentMachine, selectedMachine);
      // // console.log("Updated machine fields:", updatedFields);
      // setOem(updatedFields.oem);
      // setModality(updatedFields.modality);
      // setModel(updatedFields.model);


      await fetchPhotos(id);
      await checkIfAddedToWebsite(id);
      await calculateItemFrequencyAndUsage(data.pn);
    } else {
      router.push({
        pathname: "../AddItem/NewItem",
        query: {
          signal: id
        }
      });
    }
  }; // Returns the value for a given field from the highest-priority source.


  function getPriorityMachineField(field, theMachine, currentMachine, fromMachine) {
    console.log("the machine: ", theMachine, "field: ", field);

    if (theMachine && theMachine[field] && theMachine[field] !== "N/A" && theMachine[field].trim() !== "") {
      return theMachine[field];
    }

    if (currentMachine && currentMachine[field] && currentMachine[field] !== "N/A" && currentMachine[field].trim() !== "") {
      return currentMachine[field];
    }

    if (fromMachine && fromMachine[field] && fromMachine[field] !== "N/A" && fromMachine[field].trim() !== "") {
      return fromMachine[field];
    }

    return "";
  } // Returns an object with updated OEM, modality, and model fields.


  function updateMachineFields(theMachine, currentMachine, fromMachine) {
    return {
      oem: getPriorityMachineField("OEM", theMachine, currentMachine, fromMachine),
      modality: getPriorityMachineField("Modality", theMachine, currentMachine, fromMachine),
      model: getPriorityMachineField("Model", theMachine, currentMachine, fromMachine)
    };
  }

  const calculateItemFrequencyAndUsage = async pn => {
    const db = Firebase["b" /* default */].firestore();
    const currentDate = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(currentDate.getFullYear() - 1);
    const normalizedPN = pn !== undefined ? pn : "";
    const itemsSnapshot = await db.collection("Test").where("pn", "==", normalizedPN).get();
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
  };

  const fetchMachine = async machineId => {
    const db = Firebase["b" /* default */].firestore();
    const doc = await db.collection("Machine").doc(machineId).get();

    if (doc.exists) {
      const machineData = doc.data();
      setTheMachine(machineData); // re-merge all three sources with correct priority:

      const merged = updateMachineFields(machineData, selectedCurrentMachine, selectedMachine);
      setOem(merged.oem);
      setModality(merged.modality);
      setModel(merged.model);
      const machinesSnapshot = await db.collection("Machine").where("Model", "==", machineData.Model || machineData.model).get();
      setMachineFrequency(machinesSnapshot.size);
    } else {
      console.error("Machine not found");
    }
  };

  const fetchPhotos = async docID => {
    const storageRef = Firebase["b" /* default */].storage().ref();
    const listRef = storageRef.child(`Parts/${docID}`);

    try {
      const res = await listRef.listAll();
      const urls = await Promise.all(res.items.map(item => item.getDownloadURL()));
      console.log("Fetched photo URLs:", urls);
      setPhotos(urls.map(url => ({
        url,
        file: null
      })));
    } catch (error) {
      console.error("Error fetching photos: ", error);
    }
  };

  const checkIfAddedToWebsite = async docID => {
    const db = Firebase["b" /* default */].firestore();
    const partsDoc = await db.collection("Parts").doc(docID).get();

    if (partsDoc.exists) {
      setAddToWebsite(true);
    }
  };

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  const handleCloseErr = () => setShowErr(false);

  const handleShowErr = () => setShowErr(true);

  const handleCloseSaveModal = () => setShowSaveModal(false);

  const handleClosePrintModal = () => setShowPrintModal(false);

  const handleShowSaveModal = () => setShowSaveModal(true);

  const handleShowPrintModal = () => setShowPrintModal(true);

  const handleMachineSelectionModal = () => setMachineSelectionModal(false);

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

  const handleShowParentModal = () => setShowParentModal(true); // When a client is selected from the client table.


  const handleClientInfo = async clientId => {
    // Clear any previously selected machine and local loc info for this branch.
    if (machinePick) {
      setSelectedMachine(null);
      setShowLocalLocFrom(false);
    } else {
      setSelectedCurrentMachine(null);
      setShowLocalLocCurrent(false);
    }

    const db = Firebase["b" /* default */].firestore();
    const clientDoc = await db.collection("Client").doc(clientId).get();

    if (clientDoc.exists) {
      const clientData = _id_objectSpread({
        id: clientDoc.id
      }, clientDoc.data());

      if (machinePick) {
        setSelectedClientFrom(clientData);
      } else {
        setSelectedClientCurrent(clientData);
      } // after setting selectedClientFrom/Current:


      if (clientData.name === "SoCalWarehouse") {
        if (machinePick) setShowLocalLocFrom(true);else setShowLocalLocCurrent(true);
      } // Fetch machines for this client:


      const machinePromises = clientData.machines.map(machineRef => machineRef.get());
      const machineDocs = await Promise.all(machinePromises);
      const machines = machineDocs.map(machineDoc => _id_objectSpread({
        id: machineDoc.id
      }, machineDoc.data()));
      setMachineOptions(machines); // Close the client modal

      handleCloseClientModal();
    }
  }; // Reordering function for dropdowns.


  const reorderArray = (arr, selectedValue) => {
    const newArr = arr.filter(val => val !== selectedValue);
    return [selectedValue, ...newArr];
  };

  const {
    0: addingNewPn,
    1: setAddingNewPn
  } = Object(external_react_["useState"])(false);
  const {
    0: newPn,
    1: setNewPn
  } = Object(external_react_["useState"])("");
  const {
    0: addingNewSn,
    1: setAddingNewSn
  } = Object(external_react_["useState"])(false);
  const {
    0: newSn,
    1: setNewSn
  } = Object(external_react_["useState"])("");

  const handlePnSelect = e => {
    const selected = e.target.value;
    setItems(prev => {
      let updatedPn = Array.isArray(prev.pn) ? [...prev.pn] : [];
      updatedPn[0] = selected;
      return _id_objectSpread(_id_objectSpread({}, prev), {}, {
        pn: updatedPn
      });
    });
  };

  const handleSnSelect = e => {
    const selected = e.target.value;
    setItems(prev => {
      let updatedSn = Array.isArray(prev.sn) ? [...prev.sn] : [];
      updatedSn[0] = selected;
      return _id_objectSpread(_id_objectSpread({}, prev), {}, {
        sn: updatedSn
      });
    });
  };

  const handleAddNewPn = () => {
    if (newPn.trim() !== "") {
      setItems(prev => _id_objectSpread(_id_objectSpread({}, prev), {}, {
        pn: [...prev.pn, newPn.trim()]
      }));
    }

    setNewPn("");
    setAddingNewPn(false);
  };

  const handleAddNewSn = () => {
    if (newSn.trim() !== "") {
      setItems(prev => _id_objectSpread(_id_objectSpread({}, prev), {}, {
        sn: [...prev.sn, newSn.trim()]
      }));
    }

    setNewSn("");
    setAddingNewSn(false);
  }; // Generate custom document ID if needed.


  const generateCustomID = () => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    return `AIS${randomNum}`;
  };

  function shallowClean(obj) {
    const newObj = {};

    for (const key in obj) {
      console.log(key, obj[key]);

      if (obj.hasOwnProperty(key)) {
        newObj[key] = obj[key] === undefined ? "" : obj[key];
      }
    }

    return newObj;
  }

  async function toSend() {
    var _fromDetails$section, _fromDetails$section2, _currentDetails$secti, _currentDetails$secti2;

    const db = Firebase["b" /* default */].firestore();
    const currentUser = Firebase["b" /* default */].auth().currentUser;
    const userEmail = currentUser ? currentUser.email : "unknown"; // Always use the current state values for OEM, modality, and model.

    const machineData = _id_objectSpread(_id_objectSpread({}, TheMachine || {}), {}, {
      oem: oem,
      modality: modality,
      model: model
    });

    const formattedItems = _id_objectSpread(_id_objectSpread({}, items), {}, {
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
    formattedItems.addedToWebsite = addToWebsite; // NEW: Add the user's email under the field "user"

    formattedItems.lastEdited = userEmail; // Clean pn and sn arrays to replace undefined values with an empty string.

    formattedItems.pn = (items.pn || []).map(value => value === undefined ? "" : value);
    formattedItems.sn = (items.sn || []).map(value => value === undefined ? "" : value);
    const fromDetails = buildLocalLocObject(newLocalFrom);
    const currentDetails = buildLocalLocObject(newLocalCurrent);
    console.log("From Details: " + fromDetails.region + " " + ((_fromDetails$section = fromDetails.section) === null || _fromDetails$section === void 0 ? void 0 : _fromDetails$section.letter) + ((_fromDetails$section2 = fromDetails.section) === null || _fromDetails$section2 === void 0 ? void 0 : _fromDetails$section2.number) + " " + fromDetails.bin + " " + fromDetails.pallet);
    console.log("Current Details: " + currentDetails.region + " " + ((_currentDetails$secti = currentDetails.section) === null || _currentDetails$secti === void 0 ? void 0 : _currentDetails$secti.letter) + ((_currentDetails$secti2 = currentDetails.section) === null || _currentDetails$secti2 === void 0 ? void 0 : _currentDetails$secti2.number) + " " + currentDetails.bin + " " + currentDetails.pallet);

    if (Object.keys(fromDetails).length) {
      formattedItems.newLocalFrom = fromDetails;
      formattedItems.localLocFrom = formatLoc(newLocalFrom) || "";
    } else {
      // all fields empty — force an empty string and remove any stray map
      console.log("entered empty fromDetails else");
      formattedItems.localLocFrom = "";
      formattedItems.newLocalFrom = {};
    }

    if (Object.keys(currentDetails).length) {
      formattedItems.newLocalCurrent = currentDetails;
      formattedItems.localLocCurrent = formatLoc(newLocalCurrent) || "";
    } else {
      // all fields empty — force an empty string and remove any stray map
      formattedItems.localLocCurrent = "";
      formattedItems.newLocalCurrent = {};
    }

    if (selectedMachine && selectedMachine.id) {
      formattedItems.MachineFrom = db.collection("Machine").doc(selectedMachine.id);
    }

    if (selectedCurrentMachine && selectedCurrentMachine.id) {
      formattedItems.MachineCurrent = db.collection("Machine").doc(selectedCurrentMachine.id);
    }

    if (selectedParent && selectedParent.id) {
      formattedItems.Parent = db.collection("Test").doc(selectedParent.id);
    } // NEW: Set separate client references.


    if (selectedClientFrom && selectedClientFrom.id) {
      formattedItems.ClientFrom = db.collection("Client").doc(selectedClientFrom.id);
    }

    if (selectedClientCurrent && selectedClientCurrent.id) {
      formattedItems.ClientCurrent = db.collection("Client").doc(selectedClientCurrent.id);
    } // Only attach the richer “newLocal” map when the user actually filled something in


    if (Object.keys(fromDetails).length) {
      formattedItems.newLocalFrom = fromDetails;
    }

    if (Object.keys(currentDetails).length) {
      formattedItems.newLocalCurrent = currentDetails;
    }

    let docId = id;

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
                associatedParts: Firebase["b" /* default */].firestore.FieldValue.arrayUnion(db.collection("Test").doc(newDocId))
              });
            }
          }

          if (selectedCurrentMachine && selectedCurrentMachine.id) {
            const currentMachineRef = db.collection("Machine").doc(selectedCurrentMachine.id);
            const currentMachineDoc = await currentMachineRef.get();

            if (currentMachineDoc.exists) {
              await currentMachineRef.update({
                associatedParts: Firebase["b" /* default */].firestore.FieldValue.arrayUnion(db.collection("Test").doc(newDocId))
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
                associatedParts: Firebase["b" /* default */].firestore.FieldValue.arrayUnion(db.collection("Test").doc(docId))
              });
            }
          }

          if (selectedCurrentMachine && selectedCurrentMachine.id) {
            const currentMachineRef = db.collection("Machine").doc(selectedCurrentMachine.id);
            const currentMachineDoc = await currentMachineRef.get();

            if (currentMachineDoc.exists) {
              await currentMachineRef.update({
                associatedParts: Firebase["b" /* default */].firestore.FieldValue.arrayUnion(db.collection("Test").doc(docId))
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
              associatedParts: Firebase["b" /* default */].firestore.FieldValue.arrayUnion(db.collection("Test").doc(docId))
            });
          }
        }

        if (selectedCurrentMachine && selectedCurrentMachine.id) {
          const currentMachineRef = db.collection("Machine").doc(selectedCurrentMachine.id);
          const currentMachineDoc = await currentMachineRef.get();

          if (currentMachineDoc.exists) {
            await currentMachineRef.update({
              associatedParts: Firebase["b" /* default */].firestore.FieldValue.arrayUnion(db.collection("Test").doc(docId))
            });
          }
        }
      } // Upload any new photos to Firebase Storage.


      await uploadPhotos(docId);
      console.log("Item saved and associatedParts updated!"); // Redirect to the new URL using the new document id.

      router.push(`/NewSearch/item/${docId}`); // Optionally, you can also show a save confirmation modal:

      handleShowSaveModal();
    } catch (error) {
      console.error("Error saving data:", error);
    }
  } // Additional state for local warehouse location inputs.


  const {
    0: showLocalLocFrom,
    1: setShowLocalLocFrom
  } = Object(external_react_["useState"])(false);
  const {
    0: showLocalLocCurrent,
    1: setShowLocalLocCurrent
  } = Object(external_react_["useState"])(false); // When a machine is selected from the modal.

  const handleSetSelectedMachine = machine => {
    var _machine$name;

    // const condition = (name) => name && name.toLowerCase() === "interior socal";
    const isSocalInterior = ((_machine$name = machine.name) === null || _machine$name === void 0 ? void 0 : _machine$name.toLowerCase()) === "interior socal";

    if (machinePick) {
      var _selectedClientFrom$n3;

      setSelectedMachine({
        id: machine.id,
        name: machine.name
      });
      setShowLocalLocFrom(isSocalInterior || (selectedClientFrom === null || selectedClientFrom === void 0 ? void 0 : (_selectedClientFrom$n3 = selectedClientFrom.name) === null || _selectedClientFrom$n3 === void 0 ? void 0 : _selectedClientFrom$n3.toLowerCase()) === "socalwarehouse");
    } else {
      var _selectedClientCurren3;

      setSelectedCurrentMachine({
        id: machine.id,
        name: machine.name
      });
      setShowLocalLocCurrent(isSocalInterior || (selectedClientCurrent === null || selectedClientCurrent === void 0 ? void 0 : (_selectedClientCurren3 = selectedClientCurrent.name) === null || _selectedClientCurren3 === void 0 ? void 0 : _selectedClientCurren3.toLowerCase()) === "socalwarehouse");
    }

    fetchMachine(machine.id); // Close the machine modal (assuming you're using showMachineModal to control it)

    setShowMachineModal(false);
  };

  const uploadPhotos = async docID => {
    const storageRef = Firebase["b" /* default */].storage().ref();

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
  }; // Function to handle printing the label.


  const handlePrint = async () => {
    if (!items.name) {
      alert("Missing name");
      return;
    }

    let clientName = ""; // Attempt to fetch client name from the Machine document reference.

    if (items.Machine && typeof items.Machine.get === "function") {
      try {
        const machineDoc = await items.Machine.get();

        if (machineDoc.exists) {
          const machineData = machineDoc.data();

          if (machineData.client && typeof machineData.client.get === "function") {
            const clientDoc = await machineData.client.get();

            if (clientDoc.exists) {
              clientName = clientDoc.data().name || "";
            }
          }
        }
      } catch (error) {
        console.error("Error fetching machine or client:", error);
      }
    } else {
      console.warn("No Machine reference available in the item");
    }

    console.log(clientName, ":", items.client); // Fallback: if no client name was found, check items.client.

    if (!clientName && items.client) {
      if (typeof items.client.get === "function") {
        try {
          const clientDoc = await items.client.get();

          if (clientDoc.exists) {
            clientName = clientDoc.data().name || "";
          }
        } catch (error) {
          console.error("Error fetching client from items.client:", error);
        }
      } else {
        clientName = items.client;
      }
    }

    console.log("descriptions:", descriptions[selectedDesc]);
    const payload = {
      name: items.name,
      pn: items.pn,
      sn: items.sn,
      wo: workOrders && workOrders.length > 0 ? workOrders[0].workOrder : "",
      client: clientName,
      status: items.status,
      local_sn: id,
      descriptions: [descriptions[selectedDesc] || {
        description: "",
        date: ""
      }],
      date: items.dateCreated || "",
      DOM: DOM,
      oem: oem,
      modality: modality,
      model: model,
      poNumber: items.poNumber,
      arrival_date: items.arrival_date // NEW: Include arrival_date

    };
    console.log("Payload for printing:", payload);

    try {
      const response = await fetch("https://9d70-174-76-22-138.ngrok-free.app/print-label", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      console.log("Print result:", result.status);

      if (result.status.includes("successfully.")) {
        handleShowPrintModal();
      } else {
        console.error("Error printing label:", result.error);
      }
    } catch (error) {
      console.error("Error printing label:", error);
    }
  };

  async function handleSubmit(event) {
    event.preventDefault(); // Only check that the Name field is filled out.

    if (!items.name) {
      handleShow(); // This shows the "missing field" modal.
    } else {
      toSend();
    }
  } // Handlers for input changes.


  const handleChange = field => event => {
    const value = event.target ? event.target.value : event.value;
    setItems(prevItems => _id_objectSpread(_id_objectSpread({}, prevItems), {}, {
      [field]: value
    }));
  };

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
    const newDescriptions = descriptions.map((desc, i) => i === index ? _id_objectSpread(_id_objectSpread({}, desc), {}, {
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
    const newWorkOrders = workOrders.map((wo, i) => i === index ? _id_objectSpread(_id_objectSpread({}, wo), {}, {
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
  };

  const handleShowCameraModal = () => {
    setShowCameraModal(true);
  };

  const handleCloseCameraModal = () => {
    setShowCameraModal(false);
    setCapturedPhoto(null);
  };

  const handleCapture = (err, result) => {
    if (result) {
      setCapturedPhoto(result);
    }
  };

  const savePhoto = () => {
    setPhotos(prevPhotos => [...prevPhotos, {
      file: capturedPhoto,
      url: URL.createObjectURL(capturedPhoto)
    }]);
    setCapturedPhoto(null);
    handleCloseCameraModal();
  };

  const removePhoto = index => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const mostRecentWorkOrder = workOrders && workOrders.length > 0 ? workOrders.reduce((latest, current) => {
    const latestDate = new Date(latest.date);
    const currentDate = new Date(current.date);
    return currentDate > latestDate ? current : latest;
  }, workOrders[0]) : {};

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

  const handleShowInfoModal = async () => {
    const db = Firebase["b" /* default */].firestore();

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

  const handlePnChange = (index, value) => {
    setItems(prev => {
      const newPn = [...prev.pn];
      newPn[index] = value;
      return _id_objectSpread(_id_objectSpread({}, prev), {}, {
        pn: newPn
      });
    });
  };

  const addPn = () => {
    setItems(prev => _id_objectSpread(_id_objectSpread({}, prev), {}, {
      pn: [...prev.pn, ""]
    }));
  };

  const handleSnChange = (index, value) => {
    setItems(prev => {
      const newSn = [...prev.sn];
      newSn[index] = value;
      return _id_objectSpread(_id_objectSpread({}, prev), {}, {
        sn: newSn
      });
    });
  };

  const addSn = () => {
    setItems(prev => _id_objectSpread(_id_objectSpread({}, prev), {}, {
      sn: [...prev.sn, ""]
    }));
  };

  const browseInputRef = Object(external_react_["useRef"])(null);

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
  };

  const {
    0: currentPnIndex,
    1: setCurrentPnIndex
  } = Object(external_react_["useState"])(0);
  const {
    0: showDropdown,
    1: setShowDropdown
  } = Object(external_react_["useState"])(false);
  const {
    0: currentSnIndex,
    1: setCurrentSnIndex
  } = Object(external_react_["useState"])(0);
  const {
    0: showSnDropdown,
    1: setShowSnDropdown
  } = Object(external_react_["useState"])(false);

  const handleAddNewClient = () => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    router.push(`../client/AIS${randomNum}/addClient?from=item&itemId=${id || ""}`);
  };

  const handleBluefolderButton = async () => {
    var _descriptions$selecte2;

    // Check that the work order field is filled out (using workOrders[0].workOrder as current)
    const currentWorkOrder = workOrders && workOrders.length > 0 ? workOrders[0].workOrder : "";

    if (!currentWorkOrder) {
      alert("Please fill out the work order field before adding to BlueFolder.");
      return;
    } // Build the payload to send to your proxy endpoint.


    const payload = {
      name: items.name,
      pn: items.pn[0] || "",
      sn: items.sn[0] || "",
      status: items.status,
      description: ((_descriptions$selecte2 = descriptions[selectedDesc]) === null || _descriptions$selecte2 === void 0 ? void 0 : _descriptions$selecte2.description) || "",
      workOrder: currentWorkOrder,
      localsn: items.localSN || ""
    };

    try {
      // Replace with your ngrok URL and appropriate endpoint path (e.g., /api/bluefolder)
      const response = await fetch("https://9d70-174-76-22-138.ngrok-free.app/bluefolder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      alert("BlueFolder service item added successfully!");
      console.log("BlueFolder result:", result);
    } catch (error) {
      console.error("BlueFolder error:", error);
      alert("Error adding data to BlueFolder.");
    }
  }; // // Slack integration handler.
  // const handleAddToSlack = async (which) => {
  //   try {
  //     const pn0 = Array.isArray(items.pn) ? items.pn[0] : items.pn;
  //     const sn0 = Array.isArray(items.sn) ? items.sn[0] : items.sn;
  //     const linkUrl = typeof window !== "undefined" ? window.location.href : "";
  //     const safeName = (items?.name || id || "Untitled").trim();
  //     const title = `${safeName}${id ? ` (${id})` : ""}`;
  //     console.log("[SLACK][handleAddToSlack] which:", which);
  //     console.log("[SLACK] title:", title);
  //     console.log("[SLACK] PN:", items.pn, "SN:", items.sn);
  //     const resp = await fetch("/api/slack/add-to-list", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         listKey: which,      // "shipping" | "receiving" | "tasks"
  //         title,
  //         pn: items.pn,
  //         sn: items.sn,
  //         // keeping it minimal by design while we stabilize PN/SN
  //         linkUrl,
  //       }),
  //     });
  // Slack integration handler (drop-in replacement)
  // Slack integration handler (drop-in replacement)
  // Slack integration handler (client) — replace your existing handleAddToSlack with this


  const handleAddToSlack = async (which = "shipping") => {
    try {
      var _sort$, _ref8, _items$trackingNumber, _json$debug, _json$debug2;

      const safeName = ((items === null || items === void 0 ? void 0 : items.name) || id || "Untitled").trim();
      const title = `${safeName}${id ? ` (${id})` : ""}`;
      const pn0 = Array.isArray(items === null || items === void 0 ? void 0 : items.pn) ? items.pn[0] : items === null || items === void 0 ? void 0 : items.pn;
      const sn0 = Array.isArray(items === null || items === void 0 ? void 0 : items.sn) ? items.sn[0] : items === null || items === void 0 ? void 0 : items.sn;
      const pn_sn = [pn0 && `PN: ${pn0}`, sn0 && `SN: ${sn0}`].filter(Boolean).join("  ");
      const mostRecentWO = workOrders && workOrders.length ? (_sort$ = [...workOrders].sort((a, b) => new Date((b === null || b === void 0 ? void 0 : b.date) || 0) - new Date((a === null || a === void 0 ? void 0 : a.date) || 0))[0]) === null || _sort$ === void 0 ? void 0 : _sort$.workOrder : "";
      const description = selectedDesc != null && descriptions !== null && descriptions !== void 0 && descriptions[selectedDesc] ? descriptions[selectedDesc].description || "" : (items === null || items === void 0 ? void 0 : items.description) || "";
      const tracking = (_ref8 = (_items$trackingNumber = items === null || items === void 0 ? void 0 : items.trackingNumber) !== null && _items$trackingNumber !== void 0 ? _items$trackingNumber : items === null || items === void 0 ? void 0 : items.tracking) !== null && _ref8 !== void 0 ? _ref8 : "";
      const local_sn = id || (items === null || items === void 0 ? void 0 : items.localSN) || "";
      const photoUrls = Array.isArray(photos) ? photos.map(p => p === null || p === void 0 ? void 0 : p.url).filter(Boolean) : [];
      const resp = await fetch("/api/slack/add-to-list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          listKey: which,
          title,
          pn_sn,
          // <— server expects this
          work_order: mostRecentWO || "",
          local_sn,
          tracking,
          description: (description || "").trim(),
          photoUrls // array of https URLs

        })
      });
      const json = await resp.json();
      console.log("[SLACK][handleAddToSlack] response:", json);
      if (json !== null && json !== void 0 && (_json$debug = json.debug) !== null && _json$debug !== void 0 && _json$debug.steps) console.table(json.debug.steps);
      if (json !== null && json !== void 0 && (_json$debug2 = json.debug) !== null && _json$debug2 !== void 0 && _json$debug2.photos) console.table(json.debug.photos);

      if (!resp.ok || !(json !== null && json !== void 0 && json.ok)) {
        setErr(`Slack add failed: ${(json === null || json === void 0 ? void 0 : json.error) || "unknown error"}`);
        setShowErr(true);
        return;
      }

      alert(`Added to Slack ${which === "shipping" ? "Shipping" : which === "receiving" ? "Receiving" : "Tasks"} list.`);
    } catch (e) {
      console.error(e);
      setErr("Error adding to Slack");
      setShowErr(true);
    }
  };

  return __jsx(LoggedIn["default"], null, __jsx("div", null, __jsx(external_react_bootstrap_["Modal"], {
    show: show,
    onHide: handleClose
  }, __jsx(external_react_bootstrap_["Modal"].Header, {
    closeButton: true
  }, __jsx(external_react_bootstrap_["Modal"].Title, null, "Error")), __jsx(external_react_bootstrap_["Modal"].Body, null, "Missing field"), __jsx(external_react_bootstrap_["Modal"].Footer, null, __jsx(external_react_bootstrap_["Button"], {
    variant: "primary",
    onClick: handleClose
  }, "Ok"))), __jsx(external_react_bootstrap_["Modal"], {
    show: showErr,
    onHide: handleCloseErr
  }, __jsx(external_react_bootstrap_["Modal"].Header, {
    closeButton: true
  }, __jsx(external_react_bootstrap_["Modal"].Title, null, "Error")), __jsx(external_react_bootstrap_["Modal"].Body, null, Err), __jsx(external_react_bootstrap_["Modal"].Footer, null, __jsx(external_react_bootstrap_["Button"], {
    variant: "primary",
    onClick: handleCloseErr
  }, "Ok"))), __jsx(external_react_bootstrap_["Modal"], {
    show: showSaveModal,
    onHide: handleCloseSaveModal
  }, __jsx(external_react_bootstrap_["Modal"].Header, {
    closeButton: true
  }, __jsx(external_react_bootstrap_["Modal"].Title, null, "Save Confirmation")), __jsx(external_react_bootstrap_["Modal"].Body, null, "Data has been saved successfully."), __jsx(external_react_bootstrap_["Modal"].Footer, null, __jsx(external_react_bootstrap_["Button"], {
    variant: "primary",
    onClick: handleCloseSaveModal
  }, "Ok"))), __jsx(external_react_bootstrap_["Modal"], {
    show: showPrintModal,
    onHide: handleClosePrintModal
  }, __jsx(external_react_bootstrap_["Modal"].Header, {
    closeButton: true
  }, __jsx(external_react_bootstrap_["Modal"].Title, null, "Print Confirmation")), __jsx(external_react_bootstrap_["Modal"].Body, null, "Info has been sent to print."), __jsx(external_react_bootstrap_["Modal"].Footer, null, __jsx(external_react_bootstrap_["Button"], {
    variant: "primary",
    onClick: handleClosePrintModal
  }, "Ok"))), __jsx(external_react_bootstrap_["Modal"], {
    show: showDescModal,
    onHide: handleCloseDescModal
  }, __jsx(external_react_bootstrap_["Modal"].Header, {
    closeButton: true
  }, __jsx(external_react_bootstrap_["Modal"].Title, null, "Descriptions")), __jsx(external_react_bootstrap_["Modal"].Body, null, __jsx(external_react_bootstrap_["Button"], {
    variant: "primary",
    className: "mb-3",
    onClick: addDescription
  }, "Add Description"), descriptions.map((desc, index) => __jsx(external_react_bootstrap_["Row"], {
    key: index,
    className: "mb-3"
  }, __jsx(external_react_bootstrap_["Button"], {
    variant: "outline-secondary",
    className: "w-100",
    onClick: () => selectDescription(index),
    style: {
      cursor: "pointer"
    }
  }, __jsx("div", {
    className: "d-flex justify-content-between"
  }, __jsx("span", null, desc.description || "Description"), __jsx("span", {
    style: {
      borderLeft: "1px solid #ccc",
      paddingLeft: "10px"
    }
  }, desc.date || "Date"))))), __jsx(external_react_bootstrap_["Button"], {
    variant: "primary",
    onClick: handleCloseDescModal
  }, "OK"))), __jsx(external_react_bootstrap_["Modal"], {
    show: showWoModal,
    onHide: handleCloseWoModal
  }, __jsx(external_react_bootstrap_["Modal"].Header, {
    closeButton: true
  }, __jsx(external_react_bootstrap_["Modal"].Title, null, "Work Orders")), __jsx(external_react_bootstrap_["Modal"].Body, null, __jsx(external_react_bootstrap_["Button"], {
    variant: "primary",
    className: "mb-3",
    onClick: addWorkOrder,
    style: {
      marginBottom: "1rem"
    }
  }, "Add Work Order"), workOrders.map((wo, index) => __jsx(external_react_bootstrap_["Row"], {
    key: index,
    className: "mb-3"
  }, __jsx(external_react_bootstrap_["Col"], null, __jsx(external_react_bootstrap_["Form"].Control, {
    type: "text",
    placeholder: "Work Order",
    value: wo.workOrder,
    onChange: e => handleWorkOrderChange(index, "workOrder", e.target.value),
    style: {
      marginBottom: "0.5rem"
    }
  })), __jsx(external_react_bootstrap_["Col"], null, __jsx(external_react_bootstrap_["Form"].Control, {
    type: "date",
    placeholder: "Date",
    value: wo.date,
    onChange: e => handleWorkOrderChange(index, "date", e.target.value)
  })), __jsx(external_react_bootstrap_["Col"], null, __jsx(external_react_bootstrap_["Button"], {
    variant: "danger",
    onClick: () => removeWorkOrder(index)
  }, "Remove")))), __jsx(external_react_bootstrap_["Button"], {
    variant: "primary",
    onClick: handleCloseWoModal
  }, "OK"))), __jsx(ClientInfoModal["default"], {
    show: showMachineModal,
    handleClose: handleCloseMachineModal,
    selectedClient: selectedClient,
    machineOptions: machineOptions,
    setSelectedMachine: handleSetSelectedMachine
  }), __jsx(external_react_bootstrap_["Modal"], {
    show: showClientModal,
    onHide: handleCloseClientModal
  }, __jsx(external_react_bootstrap_["Modal"].Header, {
    closeButton: true
  }, __jsx(external_react_bootstrap_["Modal"].Title, null, "Select Client")), __jsx(external_react_bootstrap_["Modal"].Body, null, __jsx(external_react_bootstrap_["FormControl"], {
    type: "text",
    placeholder: "Search by name",
    className: "mb-3",
    value: search,
    onChange: e => setSearch(e.target.value)
  }), __jsx(ClientTable["a" /* default */], {
    clients: clients.filter(client => (client.name || "").toLowerCase().includes(search.toLowerCase())),
    onSelectClient: handleClientInfo,
    onInfoClick: handleClientInfo,
    clearSelection: () => handleClientInfo(null),
    onAddClient: handleAddNewClient
  }))), __jsx(parentModal["default"], {
    show: showParentModal,
    handleClose: handleCloseParentModal,
    setSelectedParent: setSelectedParent
  }), __jsx(MachineSelectionModal["default"], {
    show: machineSelectionModal,
    handleClose: () => setMachineSelectionModal(false),
    setMachine: setTheMachine
  }), __jsx(external_react_bootstrap_["Modal"], {
    show: showCameraModal,
    onHide: handleCloseCameraModal
  }, __jsx(external_react_bootstrap_["Modal"].Header, {
    closeButton: true
  }, __jsx(external_react_bootstrap_["Modal"].Title, null, "Take a Photo")), __jsx(external_react_bootstrap_["Modal"].Body, null, __jsx("div", {
    className: "camera"
  }, !capturedPhoto && __jsx(BarcodeScannerComponent, {
    width: "100%",
    height: 300,
    onUpdate: handleCapture,
    facingMode: cameraFacing
  }), capturedPhoto && __jsx("div", {
    className: "photo-preview"
  }, __jsx("img", {
    src: URL.createObjectURL(capturedPhoto),
    alt: "captured",
    style: {
      width: "100%"
    }
  })))), __jsx(external_react_bootstrap_["Modal"].Footer, null, !capturedPhoto ? __jsx(external_react_default.a.Fragment, null, __jsx(external_react_bootstrap_["Button"], {
    onClick: capturePhoto,
    style: {
      borderRadius: "50%",
      width: "60px",
      height: "60px",
      position: "absolute",
      left: "50%",
      transform: "translateX(-50%)",
      bottom: "10px"
    }
  }, "\uD83D\uDCF7"), __jsx(external_react_bootstrap_["Button"], {
    onClick: () => setCameraFacing(prev => prev === "environment" ? "user" : "environment")
  }, "Flip Camera"), __jsx(external_react_bootstrap_["Button"], {
    variant: "secondary",
    onClick: handleCloseCameraModal
  }, "Cancel")) : __jsx(external_react_default.a.Fragment, null, __jsx(external_react_bootstrap_["Button"], {
    variant: "secondary",
    onClick: () => setCapturedPhoto(null)
  }, "Retake"), __jsx(external_react_bootstrap_["Button"], {
    variant: "primary",
    onClick: savePhoto
  }, "OK")))), __jsx(InfoModal["default"], {
    show: showInfoModal,
    handleClose: handleCloseInfoModal,
    itemName: items.name,
    dimensions: items.length + "," + items.width + "," + items.height,
    price: items.price,
    freqI: freqItem,
    freqM: machineFrequency,
    usage: usagePastYear
  }), __jsx(external_react_bootstrap_["Container"], {
    className: "d-flex align-items-center justify-content-center",
    style: {
      minHeight: "100vh"
    }
  }, __jsx("div", {
    className: "w-100",
    style: {
      maxWidth: "600px"
    }
  }, __jsx(external_react_bootstrap_["Card"], {
    className: "align-items-center justify-content-center"
  }, __jsx(external_react_bootstrap_["Card"].Body, null, __jsx("h2", {
    className: "text-center mb-4"
  }, "Item"), __jsx(external_react_bootstrap_["Form"], {
    onSubmit: handleSubmit
  }, __jsx(external_react_bootstrap_["Row"], {
    className: "mb-3"
  }, __jsx(external_react_bootstrap_["Col"], null, __jsx(external_react_bootstrap_["Form"].Group, {
    controlId: "name"
  }, __jsx(external_react_bootstrap_["Form"].Label, null, "Name"), __jsx(external_react_bootstrap_["Form"].Control, {
    type: "text",
    value: items.name,
    onChange: handleChange("name")
  }))), __jsx(external_react_bootstrap_["Col"], null, __jsx(external_react_bootstrap_["Form"].Group, {
    controlId: "pn"
  }, __jsx(external_react_bootstrap_["Form"].Label, null, "Product Number"), __jsx("div", {
    style: {
      position: "relative"
    }
  }, __jsx(external_react_bootstrap_["InputGroup"], null, __jsx(external_react_bootstrap_["Form"].Control, {
    type: "text",
    value: items.pn[currentPnIndex] || "",
    onChange: e => handlePnChange(currentPnIndex, e.target.value)
  }), __jsx(external_react_bootstrap_["Button"], {
    variant: "outline-secondary",
    onClick: () => setShowDropdown(!showDropdown)
  }, "\u25BE"), __jsx(external_react_bootstrap_["InputGroup"].Text, null, __jsx(external_react_bootstrap_["Button"], {
    variant: "outline-secondary",
    onClick: () => setAddingNewPn(true)
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
    }
  }, pnOptions.map((pnOption, idx) => __jsx("div", {
    key: idx,
    style: {
      padding: "8px",
      cursor: "pointer"
    },
    onClick: () => {
      setCurrentPnIndex(idx);
      setShowDropdown(false);
    }
  }, pnOption)))), addingNewPn && __jsx(external_react_bootstrap_["Form"].Control, {
    type: "text",
    placeholder: "Enter new PN",
    value: newPn,
    onChange: e => setNewPn(e.target.value),
    onBlur: handleAddNewPn,
    onKeyDown: e => e.key === "Enter" && handleAddNewPn()
  })))), __jsx(external_react_bootstrap_["Row"], {
    className: "mb-3"
  }, __jsx(external_react_bootstrap_["Col"], null, __jsx(external_react_bootstrap_["Form"].Group, {
    controlId: "sn"
  }, __jsx(external_react_bootstrap_["Form"].Label, null, "Serial Number"), __jsx("div", {
    style: {
      position: "relative"
    }
  }, __jsx(external_react_bootstrap_["InputGroup"], null, __jsx(external_react_bootstrap_["Form"].Control, {
    type: "text",
    value: items.sn[currentSnIndex] || "",
    onChange: e => handleSnChange(currentSnIndex, e.target.value)
  }), __jsx(external_react_bootstrap_["Button"], {
    variant: "outline-secondary",
    onClick: () => setShowSnDropdown(!showSnDropdown)
  }, "\u25BE"), __jsx(external_react_bootstrap_["InputGroup"].Text, null, __jsx(external_react_bootstrap_["Button"], {
    variant: "outline-secondary",
    onClick: () => setAddingNewSn(true)
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
    }
  }, snOptions.map((snOption, idx) => __jsx("div", {
    key: idx,
    style: {
      padding: "8px",
      cursor: "pointer"
    },
    onClick: () => {
      setCurrentSnIndex(idx);
      setShowSnDropdown(false);
    }
  }, snOption)))), addingNewSn && __jsx(external_react_bootstrap_["Form"].Control, {
    type: "text",
    placeholder: "Enter new SN",
    value: newSn,
    onChange: e => setNewSn(e.target.value),
    onBlur: handleAddNewSn,
    onKeyDown: e => e.key === "Enter" && handleAddNewSn()
  }))), __jsx(external_react_bootstrap_["Col"], null, __jsx(external_react_bootstrap_["Form"].Group, {
    controlId: "status"
  }, __jsx(external_react_bootstrap_["Form"].Label, null, "Status"), __jsx(external_react_bootstrap_["Form"].Select, {
    value: items.status || "",
    onChange: handleChange("status")
  }, __jsx("option", {
    value: ""
  }, "Select status"), __jsx("option", {
    value: "Good"
  }, "Good"), __jsx("option", {
    value: "Bad"
  }, "Bad"), __jsx("option", {
    value: "Unknown"
  }, "Unknown"))))), __jsx(external_react_bootstrap_["Row"], {
    className: "mb-3"
  }, __jsx(external_react_bootstrap_["Col"], null, __jsx(external_react_bootstrap_["Form"].Label, null, "OEM"), __jsx(external_react_bootstrap_["Form"].Control, {
    type: "text",
    placeholder: "OEM",
    value: oem,
    onChange: e => setOem(e.target.value)
  })), __jsx(external_react_bootstrap_["Col"], null, __jsx(external_react_bootstrap_["Form"].Label, null, "Modality"), __jsx(external_react_bootstrap_["Form"].Control, {
    type: "text",
    placeholder: "Modality",
    value: modality,
    onChange: e => setModality(e.target.value)
  })), __jsx(external_react_bootstrap_["Col"], null, __jsx(external_react_bootstrap_["Form"].Label, null, "Model"), __jsx(external_react_bootstrap_["Form"].Control, {
    type: "text",
    placeholder: "Model",
    value: model,
    onChange: e => setModel(e.target.value)
  }))), __jsx("div", {
    style: {
      marginBottom: "1rem",
      marginTop: "1rem"
    }
  }, __jsx("div", {
    className: "d-flex align-items-center"
  }, __jsx(external_react_bootstrap_["Button"], {
    variant: "outline-secondary",
    onClick: handleShowWoModal,
    className: "me-2"
  }, "Manage Work Orders"), workOrders.length > 0 && __jsx("div", {
    className: "d-flex flex-column align-items-start"
  }, __jsx(external_react_bootstrap_["Form"].Label, null, "Work Order"), __jsx(external_react_bootstrap_["Form"].Control, {
    type: "text",
    placeholder: "Most Recent Work Order",
    value: mostRecentWorkOrder.workOrder,
    onChange: e => handleWorkOrderChange(workOrders.indexOf(mostRecentWorkOrder), "workOrder", e.target.value),
    style: {
      marginBottom: "0.5rem"
    }
  }), __jsx(external_react_bootstrap_["Form"].Label, null, "Date"), __jsx(external_react_bootstrap_["Form"].Control, {
    type: "date",
    placeholder: "Work Order Date",
    value: mostRecentWorkOrder.date,
    onChange: e => handleWorkOrderChange(workOrders.indexOf(mostRecentWorkOrder), "date", e.target.value),
    style: {
      marginBottom: "0.5rem"
    }
  }))), __jsx("div", {
    style: {
      marginBottom: "1rem"
    }
  }, __jsx(external_react_bootstrap_["Form"].Group, {
    controlId: "desc"
  }, __jsx(external_react_bootstrap_["Button"], {
    variant: "outline-secondary",
    onClick: listDescriptions,
    className: "mb-2 me-2"
  }, "List Descriptions"), __jsx(external_react_bootstrap_["Form"].Control, {
    as: "textarea",
    rows: 3,
    placeholder: "Enter description",
    value: ((_descriptions$selecte3 = descriptions[selectedDesc]) === null || _descriptions$selecte3 === void 0 ? void 0 : _descriptions$selecte3.description) || "",
    onChange: e => handleDescriptionChange(selectedDesc, "description", e.target.value),
    style: {
      marginBottom: "0.5rem"
    }
  }), __jsx(external_react_bootstrap_["Form"].Control, {
    type: "date",
    value: ((_descriptions$selecte4 = descriptions[selectedDesc]) === null || _descriptions$selecte4 === void 0 ? void 0 : _descriptions$selecte4.date) || "",
    onChange: e => handleDescriptionChange(selectedDesc, "date", e.target.value),
    style: {
      marginTop: "0.5rem",
      marginBottom: "0.5rem"
    }
  })))), __jsx("div", {
    style: {
      marginBottom: "1rem"
    }
  }, __jsx(external_react_bootstrap_["Row"], {
    className: "mb-3"
  }, __jsx(external_react_bootstrap_["Col"], null, __jsx(external_react_bootstrap_["Button"], {
    variant: "outline-secondary",
    onClick: () => {
      setMachinePick(true);
      handleShowClientModal();
    },
    className: "me-2"
  }, "Select From"), selectedClientFrom && __jsx("div", {
    style: {
      border: "1px solid #ccc",
      padding: "0.75rem",
      borderRadius: "4px",
      marginBottom: "1rem"
    }
  }, __jsx("p", null, __jsx("strong", null, "Selected Client (From):"), " ", selectedClientFrom.name), __jsx("div", {
    style: {
      marginTop: "0.5rem"
    }
  }, __jsx(external_react_bootstrap_["Button"], {
    variant: "outline-secondary",
    onClick: () => setShowMachineModal(true)
  }, "Select Machine for ", selectedClientFrom.name), selectedMachine && __jsx(external_react_default.a.Fragment, null, __jsx("p", {
    style: {
      marginTop: "0.5rem"
    }
  }, __jsx("strong", null, "Selected Machine (From):"), " ", selectedMachine.name), showLocalLocFrom && __jsx(external_react_default.a.Fragment, null, __jsx(external_react_bootstrap_["Button"], {
    variant: "outline-secondary",
    onClick: () => setShowNewLocalModalFrom(true),
    className: "w-100 mb-2"
  }, [newLocalFrom.region, ((_newLocalFrom$section = newLocalFrom.section) === null || _newLocalFrom$section === void 0 ? void 0 : _newLocalFrom$section.letter) + ((_newLocalFrom$section2 = newLocalFrom.section) === null || _newLocalFrom$section2 === void 0 ? void 0 : _newLocalFrom$section2.number), newLocalFrom.bin && `B${newLocalFrom.bin}`, newLocalFrom.pallet && `P${newLocalFrom.pallet}`].filter(Boolean).join("-")), __jsx(external_react_bootstrap_["Modal"], {
    show: showNewLocalModalFrom,
    onHide: () => setShowNewLocalModalFrom(false),
    centered: true
  }, __jsx(external_react_bootstrap_["Modal"].Header, null, __jsx(external_react_bootstrap_["Modal"].Title, null, "Edit Local Loc (From)")), __jsx(external_react_bootstrap_["Modal"].Body, null, __jsx(NewLocal["default"], {
    selectedClient: selectedClientFrom,
    showLocalLoc: showNewLocalModalFrom,
    value: newLocalFrom,
    onChange: setNewLocalFrom,
    onSave: p => {
      setNewLocalFrom(p);
      setShowNewLocalModalFrom(false);
    },
    onCancel: () => setShowNewLocalModalFrom(false)
  })))))))), __jsx(external_react_bootstrap_["Col"], null, __jsx(external_react_bootstrap_["Button"], {
    variant: "outline-secondary",
    onClick: () => {
      setMachinePick(false);
      handleShowClientModal();
    },
    className: "me-2"
  }, "Select Current"), selectedClientCurrent && __jsx("div", {
    style: {
      border: "1px solid #ccc",
      padding: "0.75rem",
      borderRadius: "4px",
      marginBottom: "1rem"
    }
  }, __jsx("p", null, __jsx("strong", null, "Selected Client (Current):"), " ", selectedClientCurrent.name), __jsx("div", {
    style: {
      marginTop: "0.5rem"
    }
  }, __jsx(external_react_bootstrap_["Button"], {
    variant: "outline-secondary",
    onClick: () => setShowMachineModal(true)
  }, "Select Machine for ", selectedClientCurrent.name), selectedCurrentMachine && __jsx(external_react_default.a.Fragment, null, __jsx("p", {
    style: {
      marginTop: "0.5rem"
    }
  }, __jsx("strong", null, "Selected Machine (Current):"), " ", selectedCurrentMachine.name), showLocalLocCurrent && __jsx(external_react_default.a.Fragment, null, __jsx(external_react_bootstrap_["Button"], {
    variant: "outline-secondary",
    onClick: () => setShowNewLocalModalCurrent(true),
    className: "w-100 mb-2"
  }, [newLocalCurrent.region, ((_newLocalCurrent$sect = newLocalCurrent.section) === null || _newLocalCurrent$sect === void 0 ? void 0 : _newLocalCurrent$sect.letter) + ((_newLocalCurrent$sect2 = newLocalCurrent.section) === null || _newLocalCurrent$sect2 === void 0 ? void 0 : _newLocalCurrent$sect2.number), newLocalCurrent.bin && `B${newLocalCurrent.bin}`, newLocalCurrent.pallet && `P${newLocalCurrent.pallet}`].filter(Boolean).join("-")), __jsx(external_react_bootstrap_["Modal"], {
    show: showNewLocalModalCurrent,
    onHide: () => setShowNewLocalModalCurrent(false),
    centered: true
  }, __jsx(external_react_bootstrap_["Modal"].Header, null, __jsx(external_react_bootstrap_["Modal"].Title, null, "Edit Local Loc (Current)")), __jsx(external_react_bootstrap_["Modal"].Body, null, __jsx(NewLocal["default"], {
    selectedClient: selectedClientCurrent,
    showLocalLoc: showNewLocalModalCurrent,
    value: newLocalCurrent,
    onChange: setNewLocalCurrent,
    onSave: p => {
      setNewLocalCurrent(p);
      setShowNewLocalModalCurrent(false);
    },
    onCancel: () => setShowNewLocalModalCurrent(false)
  })))))))), __jsx(external_react_bootstrap_["Col"], null, __jsx(external_react_bootstrap_["Button"], {
    variant: "outline-secondary",
    onClick: handleShowParentModal,
    className: "me-2"
  }, "Select Parent"), selectedParent && __jsx(external_react_bootstrap_["Form"].Control, {
    type: "text",
    placeholder: "Selected Parent",
    value: selectedParent.name,
    readOnly: true,
    style: {
      marginTop: "0.5rem"
    }
  })))), __jsx("div", {
    style: {
      marginBottom: "1rem"
    }
  }, __jsx(external_react_bootstrap_["Row"], {
    className: "mb-3"
  }, __jsx(external_react_bootstrap_["Col"], {
    xs: 6
  }, __jsx(external_react_bootstrap_["ButtonGroup"], null, __jsx(external_react_bootstrap_["Button"], {
    variant: "outline-secondary",
    onClick: handleShowCameraModal
  }, "Take Photo"), __jsx(external_react_bootstrap_["Button"], {
    variant: "outline-secondary",
    onClick: handleBrowsePhotos
  }, "Browse"))), __jsx(external_react_bootstrap_["Col"], {
    xs: 6,
    className: "d-flex align-items-center"
  }, __jsx(external_react_bootstrap_["Button"], {
    variant: "success",
    onClick: handleSendToInflow,
    style: {
      marginLeft: "auto"
    }
  }, "Send to inFlow"), __jsx(external_react_bootstrap_["Button"], {
    variant: "secondary",
    onClick: handleBluefolderButton,
    style: {
      marginLeft: "0.5rem",
      marginRight: ".5rem"
    }
  }, "BlueFolder"), __jsx(external_react_bootstrap_["Button"], {
    variant: addToWebsite ? "primary" : "outline-primary",
    onClick: () => setAddToWebsite(prev => !prev)
  }, addToWebsite ? "✓ Add to Website" : "Add to Website"), __jsx(external_react_bootstrap_["Form"].Check, {
    type: "checkbox",
    id: "hide-checkbox",
    label: "Hide" // box is checked when we want visible = false
    ,
    checked: !items.visible,
    onChange: e => {
      // grab checked immediately
      const isHidden = e.currentTarget.checked;
      setItems(prev => _id_objectSpread(_id_objectSpread({}, prev), {}, {
        visible: !isHidden
      }));
    },
    className: "ms-3"
  }))), __jsx("input", {
    type: "file",
    accept: "image/*",
    multiple: true,
    ref: browseInputRef,
    style: {
      display: "none"
    },
    onChange: handleFilesSelected
  })), photos && photos.length > 0 && __jsx("div", {
    className: "photo-gallery",
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: "10px",
      marginBottom: "1rem"
    }
  }, photos.map((photo, index) => __jsx("div", {
    key: index,
    style: {
      position: "relative",
      width: "100px",
      height: "100px"
    }
  }, __jsx("img", {
    src: photo.url,
    alt: `Photo ${index + 1}`,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }), photo.file && __jsx(external_react_bootstrap_["Button"], {
    variant: "danger",
    size: "sm",
    style: {
      position: "absolute",
      top: 0,
      right: 0,
      padding: "0 5px"
    },
    onClick: () => removePhoto(index)
  }, "x")))), __jsx("div", {
    className: "mt-3 d-flex flex-wrap align-items-center"
  }, __jsx(external_react_bootstrap_["Button"], {
    variant: "primary",
    type: "submit",
    style: {
      marginRight: "1rem"
    }
  }, "Save"), __jsx(external_react_bootstrap_["Button"], {
    variant: "secondary",
    onClick: handleShowInfoModal,
    style: {
      marginRight: "1rem"
    }
  }, "More Info"), __jsx(LoadingButton, {
    type: "primary",
    name: "Back",
    route: "NewSearch/mainSearch"
  }), SHOW_SLACK_BUTTONS && __jsx("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      marginLeft: ".5rem"
    }
  }, __jsx("span", {
    style: {
      fontSize: 12,
      lineHeight: "12px",
      textAlign: "center"
    }
  }, "Slack"), __jsx("div", {
    style: {
      display: "flex",
      border: "1px solid #ced4da",
      borderRadius: 6,
      overflow: "hidden"
    }
  }, __jsx(external_react_bootstrap_["Button"], {
    variant: "outline-primary",
    onClick: () => handleAddToSlack("receiving"),
    style: {
      border: "none",
      borderRight: "1px solid #ced4da"
    }
  }, "Receiving"), __jsx(external_react_bootstrap_["Button"], {
    variant: "outline-primary",
    onClick: () => handleAddToSlack("shipping"),
    style: {
      border: "none"
    }
  }, "Shipping"))), __jsx(external_react_bootstrap_["Button"], {
    variant: "info",
    onClick: handlePrint,
    style: {
      marginLeft: "auto"
    }
  }, "Print Label")), __jsx("div", {
    style: {
      textAlign: "center",
      margin: "1rem 0"
    }
  }, __jsx(external_react_bootstrap_["Button"], {
    variant: "link",
    style: {
      textDecoration: "none",
      color: "black",
      fontSize: "24px"
    },
    onClick: () => setShowExtra(!showExtra)
  }, "\u25BC")), __jsx(external_react_bootstrap_["Collapse"], {
    in: showExtra
  }, __jsx("div", {
    id: "extra-collapse",
    className: "mt-3"
  }, __jsx(external_react_bootstrap_["Row"], null, __jsx(external_react_bootstrap_["Form"].Group, {
    as: external_react_bootstrap_["Col"],
    controlId: "dimensions"
  }, __jsx(external_react_bootstrap_["Form"].Label, null, "Dimensions"), __jsx("div", {
    style: {
      display: "flex",
      alignItems: "center"
    }
  }, __jsx(external_react_bootstrap_["Form"].Control, {
    placeholder: "Length",
    type: "text",
    value: items.length,
    onChange: handleChange("length")
  }), __jsx("span", {
    style: {
      padding: "0 5px"
    }
  }, "x"), __jsx(external_react_bootstrap_["Form"].Control, {
    placeholder: "Width",
    type: "text",
    value: items.width,
    onChange: handleChange("width")
  }), __jsx("span", {
    style: {
      padding: "0 5px"
    }
  }, "x"), __jsx(external_react_bootstrap_["Form"].Control, {
    placeholder: "Height",
    type: "text",
    value: items.height,
    onChange: handleChange("height")
  }))), __jsx(external_react_bootstrap_["Form"].Group, {
    as: external_react_bootstrap_["Col"],
    controlId: "trackingNumber"
  }, __jsx(external_react_bootstrap_["Form"].Label, null, "Tracking Number"), __jsx(external_react_bootstrap_["Form"].Control, {
    placeholder: "Tracking Number",
    type: "text",
    value: items.trackingNumber,
    onChange: handleChange("trackingNumber")
  }))), __jsx(external_react_bootstrap_["Row"], {
    className: "mt-3"
  }, __jsx(external_react_bootstrap_["Form"].Group, {
    as: external_react_bootstrap_["Col"],
    controlId: "Price"
  }, __jsx(external_react_bootstrap_["Form"].Label, null, "Price"), __jsx(external_react_bootstrap_["Form"].Control, {
    placeholder: "Price",
    type: "text",
    value: items.price,
    onChange: handleChange("price")
  })), __jsx(external_react_bootstrap_["Form"].Group, {
    as: external_react_bootstrap_["Col"],
    controlId: "DOM"
  }, __jsx(external_react_bootstrap_["Form"].Label, null, "DOM"), __jsx(external_react_bootstrap_["Form"].Control, {
    placeholder: "Date of Manufacture",
    type: "date",
    value: DOM,
    onChange: e => setDOM(e.target.value)
  })), __jsx(external_react_bootstrap_["Form"].Group, {
    as: external_react_bootstrap_["Col"],
    controlId: "poNumber"
  }, __jsx(external_react_bootstrap_["Form"].Label, null, "PO Number"), __jsx(external_react_bootstrap_["Form"].Control, {
    type: "text",
    placeholder: "PO Number",
    value: items.poNumber || "",
    onChange: handleChange("poNumber")
  }))), __jsx(external_react_bootstrap_["Row"], {
    className: "mt-3"
  }, __jsx(external_react_bootstrap_["Form"].Group, {
    as: external_react_bootstrap_["Col"],
    controlId: "localSN"
  }, __jsx(external_react_bootstrap_["Form"].Label, null, "Local SN"), __jsx(external_react_bootstrap_["Form"].Control, {
    type: "text",
    placeholder: "Enter Local SN",
    value: items.localSN || "",
    onChange: handleChange("localSN")
  })), __jsx(external_react_bootstrap_["Form"].Group, {
    as: external_react_bootstrap_["Col"],
    controlId: "arrivalDate"
  }, __jsx(external_react_bootstrap_["Form"].Label, null, "Arrival Date"), __jsx(external_react_bootstrap_["Form"].Control, {
    placeholder: "Enter Arrival Date",
    type: "date",
    value: items.arrival_date,
    onChange: e => {
      const value = e.target.value;
      setItems(prev => _id_objectSpread(_id_objectSpread({}, prev), {}, {
        arrival_date: value
      }));
    }
  }))))))))))), __jsx(external_react_bootstrap_["Modal"], {
    show: showCameraModal,
    onHide: handleCloseCameraModal
  }, __jsx(external_react_bootstrap_["Modal"].Header, {
    closeButton: true
  }, __jsx(external_react_bootstrap_["Modal"].Title, null, "Take a Photo")), __jsx(external_react_bootstrap_["Modal"].Body, null, __jsx("div", {
    className: "camera"
  }, !capturedPhoto ? __jsx(BarcodeScannerComponent, {
    width: "100%",
    height: 300,
    onUpdate: handleCapture,
    facingMode: cameraFacing
  }) : __jsx("div", {
    className: "photo-preview"
  }, __jsx("img", {
    src: URL.createObjectURL(capturedPhoto),
    alt: "captured",
    style: {
      width: "100%"
    }
  })))), __jsx(external_react_bootstrap_["Modal"].Footer, null, !capturedPhoto ? __jsx(external_react_default.a.Fragment, null, __jsx(external_react_bootstrap_["Button"], {
    onClick: capturePhoto,
    style: {
      borderRadius: "50%",
      width: "60px",
      height: "60px",
      position: "absolute",
      left: "50%",
      transform: "translateX(-50%)",
      bottom: "10px"
    }
  }, "\uD83D\uDCF7"), __jsx(external_react_bootstrap_["Button"], {
    onClick: () => setCameraFacing(prev => prev === "environment" ? "user" : "environment")
  }, "Flip Camera"), __jsx(external_react_bootstrap_["Button"], {
    variant: "secondary",
    onClick: handleCloseCameraModal
  }, "Cancel")) : __jsx(external_react_default.a.Fragment, null, __jsx(external_react_bootstrap_["Button"], {
    variant: "secondary",
    onClick: () => setCapturedPhoto(null)
  }, "Retake"), __jsx(external_react_bootstrap_["Button"], {
    variant: "primary",
    onClick: savePhoto
  }, "OK")))));
} // Server-side rendering function

async function getServerSideProps(context) {
  const {
    id
  } = context.params;

  try {
    const itemDoc = await FirebaseAdmin["a" /* adminDb */].collection("Test").doc(id).get();
    if (!itemDoc.exists) return {
      notFound: true
    };
    const itemData = itemDoc.data(); // normalize to arrays for consistent client-side handling

    const pnArray = Array.isArray(itemData.pn) ? itemData.pn : itemData.pn ? [itemData.pn] : [];
    const snArray = Array.isArray(itemData.sn) ? itemData.sn : itemData.sn ? [itemData.sn] : []; // fetch machineData (optional; you already had this)

    let machineData = {};

    if (itemData.Machine && itemData.Machine.path) {
      try {
        const machineDoc = await FirebaseAdmin["a" /* adminDb */].doc(itemData.Machine.path).get();

        if (machineDoc.exists) {
          machineData = machineDoc.data();

          if (machineData.client && machineData.client.path) {
            const clientDoc = await FirebaseAdmin["a" /* adminDb */].doc(machineData.client.path).get();
            if (clientDoc.exists) machineData.Client = clientDoc.data().name;
          }
        }
      } catch (e) {
        console.error("Error fetching machine data:", e);
      }
    }

    const serializedItem = {
      id,
      name: itemData.name || "",
      pn: pnArray,
      sn: snArray,
      price: itemData.price || "",
      status: itemData.status || "",
      length: itemData.length || "",
      width: itemData.width || "",
      height: itemData.height || "",
      poNumber: itemData.poNumber || "",
      trackingNumber: itemData.trackingNumber || "",
      localSN: itemData.localSN || "",
      arrival_date: itemData.arrival_date || "",
      visible: itemData.visible !== undefined ? itemData.visible : true,
      // add the pieces the UI reads directly
      descriptions: itemData.descriptions || [],
      workOrders: itemData.workOrders || [],
      DOM: itemData.DOM || ""
    };
    return {
      props: {
        initialItem: serializedItem,
        initialMachineData: machineData
      }
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);
    return {
      props: {
        error: "Failed to load item data"
      }
    };
  }
}

/***/ }),

/***/ "q4sD":
/***/ (function(module, exports) {



/***/ }),

/***/ "qoNY":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return fetchPartsWithMachineData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return fetchClients; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return fetchModels; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return formatDate; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _context_Firebase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("NY6m");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



async function fetchPartsWithMachineData() {
  const db = _context_Firebase__WEBPACK_IMPORTED_MODULE_1__[/* default */ "b"].firestore();
  const partsSnapshot = await db.collection("Test").get();
  const parts = await Promise.all(partsSnapshot.docs.map(async partDoc => {
    const partData = partDoc.data();
    partData.id = partDoc.id; // Add document ID here
    // console.log(partData);

    if (partData.Machine && partData.Machine instanceof _context_Firebase__WEBPACK_IMPORTED_MODULE_1__[/* default */ "b"].firestore.DocumentReference) {
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
  const db = _context_Firebase__WEBPACK_IMPORTED_MODULE_1__[/* default */ "b"].firestore();
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
  const db = _context_Firebase__WEBPACK_IMPORTED_MODULE_1__[/* default */ "b"].firestore();
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

/***/ "txAr":
/***/ (function(module, exports) {

module.exports = require("firebase-admin/app");

/***/ }),

/***/ "vNVm":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.useIntersection = useIntersection;

var _react = __webpack_require__("cDcd");

var _requestIdleCallback = __webpack_require__("0G5g");

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

/***/ "wL8p":
/***/ (function(module, exports) {

// Exports
module.exports = {
	"clientTableContainer": "ClientTable_clientTableContainer__1e9un",
	"clientTable": "ClientTable_clientTable__194v7",
	"buttonGroup": "ClientTable_buttonGroup__pSZ7y",
	"flexButton": "ClientTable_flexButton__LoNiS"
};


/***/ }),

/***/ "wkBG":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
exports.__esModule=true;exports.normalizePathSep=normalizePathSep;exports.denormalizePagePath=denormalizePagePath;function normalizePathSep(path){return path.replace(/\\/g,'/');}function denormalizePagePath(page){page=normalizePathSep(page);if(page.startsWith('/index/')){page=page.slice(6);}else if(page==='/index'){page='/';}return page;}
//# sourceMappingURL=denormalize-page-path.js.map

/***/ }),

/***/ "zOyy":
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

/***/ })

/******/ });