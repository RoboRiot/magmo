_N_E =
(window["webpackJsonp_N_E"] = window["webpackJsonp_N_E"] || []).push([[65],{

/***/ "/0+H":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.isInAmpMode = isInAmpMode;
exports.useAmp = useAmp;

var _react = _interopRequireDefault(__webpack_require__("q1tI"));

var _ampContext = __webpack_require__("lwAK");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

function isInAmpMode() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$ampFirst = _ref.ampFirst,
      ampFirst = _ref$ampFirst === void 0 ? false : _ref$ampFirst,
      _ref$hybrid = _ref.hybrid,
      hybrid = _ref$hybrid === void 0 ? false : _ref$hybrid,
      _ref$hasQuery = _ref.hasQuery,
      hasQuery = _ref$hasQuery === void 0 ? false : _ref$hasQuery;

  return ampFirst || hybrid && hasQuery;
}

function useAmp() {
  // Don't assign the context value to a variable to save bytes
  return isInAmpMode(_react["default"].useContext(_ampContext.AmpStateContext));
}

/***/ }),

/***/ "20a2":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("nOHt")


/***/ }),

/***/ "48fX":
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__("qhzo");

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}

module.exports = _inherits;

/***/ }),

/***/ "5fIB":
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__("7eYB");

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return arrayLikeToArray(arr);
}

module.exports = _arrayWithoutHoles;

/***/ }),

/***/ "7A6N":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return useCallbackRef; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


/**
 * A convenience hook around `useState` designed to be paired with
 * the component [callback ref](https://reactjs.org/docs/refs-and-the-dom.html#callback-refs) api.
 * Callback refs are useful over `useRef()` when you need to respond to the ref being set
 * instead of lazily accessing it in an effect.
 *
 * ```ts
 * const [element, attachRef] = useCallbackRef<HTMLDivElement>()
 *
 * useEffect(() => {
 *   if (!element) return
 *
 *   const calendar = new FullCalendar.Calendar(element)
 *
 *   return () => {
 *     calendar.destroy()
 *   }
 * }, [element])
 *
 * return <div ref={attachRef} />
 * ```
 *
 * @category refs
 */
function useCallbackRef() {
  return Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null);
}

/***/ }),

/***/ "8Kt/":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _defineProperty = __webpack_require__("oI91");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

exports.__esModule = true;
exports.defaultHead = defaultHead;
exports["default"] = void 0;

var _react = _interopRequireWildcard(__webpack_require__("q1tI"));

var _sideEffect = _interopRequireDefault(__webpack_require__("Xuae"));

var _ampContext = __webpack_require__("lwAK");

var _headManagerContext = __webpack_require__("FYa8");

var _amp = __webpack_require__("/0+H");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

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

  if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
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

function defaultHead() {
  var inAmpMode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var head = [/*#__PURE__*/_react["default"].createElement("meta", {
    charSet: "utf-8"
  })];

  if (!inAmpMode) {
    head.push( /*#__PURE__*/_react["default"].createElement("meta", {
      name: "viewport",
      content: "width=device-width"
    }));
  }

  return head;
}

function onlyReactElement(list, child) {
  // React children can be "string" or "number" in this case we ignore them for backwards compat
  if (typeof child === 'string' || typeof child === 'number') {
    return list;
  } // Adds support for React.Fragment


  if (child.type === _react["default"].Fragment) {
    return list.concat(_react["default"].Children.toArray(child.props.children).reduce(function (fragmentList, fragmentChild) {
      if (typeof fragmentChild === 'string' || typeof fragmentChild === 'number') {
        return fragmentList;
      }

      return fragmentList.concat(fragmentChild);
    }, []));
  }

  return list.concat(child);
}

var METATYPES = ['name', 'httpEquiv', 'charSet', 'itemProp'];
/*
returns a function for filtering head child elements
which shouldn't be duplicated, like <title/>
Also adds support for deduplicated `key` properties
*/

function unique() {
  var keys = new Set();
  var tags = new Set();
  var metaTypes = new Set();
  var metaCategories = {};
  return function (h) {
    var isUnique = true;
    var hasKey = false;

    if (h.key && typeof h.key !== 'number' && h.key.indexOf('$') > 0) {
      hasKey = true;
      var key = h.key.slice(h.key.indexOf('$') + 1);

      if (keys.has(key)) {
        isUnique = false;
      } else {
        keys.add(key);
      }
    } // eslint-disable-next-line default-case


    switch (h.type) {
      case 'title':
      case 'base':
        if (tags.has(h.type)) {
          isUnique = false;
        } else {
          tags.add(h.type);
        }

        break;

      case 'meta':
        for (var i = 0, len = METATYPES.length; i < len; i++) {
          var metatype = METATYPES[i];
          if (!h.props.hasOwnProperty(metatype)) continue;

          if (metatype === 'charSet') {
            if (metaTypes.has(metatype)) {
              isUnique = false;
            } else {
              metaTypes.add(metatype);
            }
          } else {
            var category = h.props[metatype];
            var categories = metaCategories[metatype] || new Set();

            if ((metatype !== 'name' || !hasKey) && categories.has(category)) {
              isUnique = false;
            } else {
              categories.add(category);
              metaCategories[metatype] = categories;
            }
          }
        }

        break;
    }

    return isUnique;
  };
}
/**
*
* @param headElements List of multiple <Head> instances
*/


function reduceComponents(headElements, props) {
  return headElements.reduce(function (list, headElement) {
    var headElementChildren = _react["default"].Children.toArray(headElement.props.children);

    return list.concat(headElementChildren);
  }, []).reduce(onlyReactElement, []).reverse().concat(defaultHead(props.inAmpMode)).filter(unique()).reverse().map(function (c, i) {
    var key = c.key || i;

    if ( true && !props.inAmpMode) {
      if (c.type === 'link' && c.props['href'] && // TODO(prateekbh@): Replace this with const from `constants` when the tree shaking works.
      ['https://fonts.googleapis.com/css', 'https://use.typekit.net/'].some(function (url) {
        return c.props['href'].startsWith(url);
      })) {
        var newProps = _objectSpread({}, c.props || {});

        newProps['data-href'] = newProps['href'];
        newProps['href'] = undefined; // Add this attribute to make it easy to identify optimized tags

        newProps['data-optimized-fonts'] = true;
        return /*#__PURE__*/_react["default"].cloneElement(c, newProps);
      }
    }

    return /*#__PURE__*/_react["default"].cloneElement(c, {
      key: key
    });
  });
}
/**
* This component injects elements to `<head>` of your page.
* To avoid duplicated `tags` in `<head>` you can use the `key` property, which will make sure every tag is only rendered once.
*/


function Head(_ref) {
  var children = _ref.children;
  var ampState = (0, _react.useContext)(_ampContext.AmpStateContext);
  var headManager = (0, _react.useContext)(_headManagerContext.HeadManagerContext);
  return /*#__PURE__*/_react["default"].createElement(_sideEffect["default"], {
    reduceComponentsToState: reduceComponents,
    headManager: headManager,
    inAmpMode: (0, _amp.isInAmpMode)(ampState)
  }, children);
} // TODO: Remove in the next major release


Head.rewind = function () {};

var _default = Head;
exports["default"] = _default;

/***/ }),

/***/ "FYa8":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.HeadManagerContext = void 0;

var _react = _interopRequireDefault(__webpack_require__("q1tI"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

var HeadManagerContext = /*#__PURE__*/_react["default"].createContext({});

exports.HeadManagerContext = HeadManagerContext;

if (false) {}

/***/ }),

/***/ "JdO7":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"page":"Login_page__158qp","shell":"Login_shell__3o3sg","logo":"Login_logo__1BqJS","card":"Login_card__Qc14X","cardTitle":"Login_cardTitle__2_wmp","status":"Login_status__2LF9H","googleButton":"Login_googleButton__38Yqn","googleIcon":"Login_googleIcon__azDWK","testButton":"Login_testButton__10Nby"};

/***/ }),

/***/ "RNiq":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Home; });
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("vJKn");
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("rg98");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("g4pe");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("TUci");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("cWnB");
/* harmony import */ var _styles_Login_module_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("JdO7");
/* harmony import */ var _styles_Login_module_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_styles_Login_module_css__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("20a2");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _context_Firebase__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("NY6m");


var __jsx = react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement;
// pages/index.js





 // compat default export ONLY

function Home() {
  var router = Object(next_router__WEBPACK_IMPORTED_MODULE_7__["useRouter"])();

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(""),
      error = _useState[0],
      setError = _useState[1];

  var _useState2 = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(false),
      hasMounted = _useState2[0],
      setHasMounted = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(false),
      authReady = _useState3[0],
      setAuthReady = _useState3[1];

  var unsubRef = Object(react__WEBPACK_IMPORTED_MODULE_3__["useRef"])(null);
  var persistenceModeRef = Object(react__WEBPACK_IMPORTED_MODULE_3__["useRef"])("unknown");

  var getDestination = function getDestination() {
    var _router$query;

    var q = router === null || router === void 0 ? void 0 : (_router$query = router.query) === null || _router$query === void 0 ? void 0 : _router$query.redirect;
    return Array.isArray(q) ? q[0] || "/NewSearch/mainSearch" : q || "/NewSearch/mainSearch";
  };

  var isIosSafari = function isIosSafari() {
    if (typeof navigator === "undefined") return false;
    var ua = navigator.userAgent;
    var isIOS = /iP(hone|ad|od)/i.test(ua);
    var isSafari = /Safari/i.test(ua) && !/Chrome|CriOS|FxiOS|EdgiOS/i.test(ua);
    return isIOS && isSafari;
  };

  Object(react__WEBPACK_IMPORTED_MODULE_3__["useEffect"])(function () {
    return setHasMounted(true);
  }, []);

  var ensurePersistence = /*#__PURE__*/function () {
    var _ref = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
      return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _context_Firebase__WEBPACK_IMPORTED_MODULE_8__[/* default */ "b"].auth().setPersistence(_context_Firebase__WEBPACK_IMPORTED_MODULE_8__[/* default */ "b"].auth.Auth.Persistence.LOCAL);

            case 3:
              persistenceModeRef.current = "local";
              return _context.abrupt("return", "local");

            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](0);
              console.warn("[auth] LOCAL persistence failed, falling back to SESSION", _context.t0);
              _context.prev = 10;
              _context.next = 13;
              return _context_Firebase__WEBPACK_IMPORTED_MODULE_8__[/* default */ "b"].auth().setPersistence(_context_Firebase__WEBPACK_IMPORTED_MODULE_8__[/* default */ "b"].auth.Auth.Persistence.SESSION);

            case 13:
              persistenceModeRef.current = "session";
              return _context.abrupt("return", "session");

            case 17:
              _context.prev = 17;
              _context.t1 = _context["catch"](10);
              console.warn("[auth] SESSION persistence failed", _context.t1);
              persistenceModeRef.current = "none";
              return _context.abrupt("return", "none");

            case 22:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 7], [10, 17]]);
    }));

    return function ensurePersistence() {
      return _ref.apply(this, arguments);
    };
  }(); // One-time auth listener


  Object(react__WEBPACK_IMPORTED_MODULE_3__["useEffect"])(function () {
    if (!hasMounted) return;

    Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
      var redirectResult, dest, hadAttempt;
      return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return ensurePersistence();

            case 3:
              // simple storage probe to detect hostile environments
              try {
                localStorage.setItem("__magmo_probe", "1");
              } catch (e) {
                console.warn("[auth] localStorage not available; redirects may fail");
              }

              _context2.prev = 4;
              _context2.next = 7;
              return _context_Firebase__WEBPACK_IMPORTED_MODULE_8__[/* default */ "b"].auth().getRedirectResult();

            case 7:
              redirectResult = _context2.sent;

              if (!(redirectResult && redirectResult.user)) {
                _context2.next = 12;
                break;
              }

              dest = getDestination();
              router.replace(dest);
              return _context2.abrupt("return");

            case 12:
              _context2.next = 18;
              break;

            case 14:
              _context2.prev = 14;
              _context2.t0 = _context2["catch"](4);
              console.error("[auth] redirect result error:", _context2.t0);
              setError("Google sign-in failed. Please try again.");

            case 18:
              try {
                hadAttempt = localStorage.getItem("__magmo_signin_attempt");

                if (hadAttempt) {
                  localStorage.removeItem("__magmo_signin_attempt");
                  setTimeout(function () {
                    var user = _context_Firebase__WEBPACK_IMPORTED_MODULE_8__[/* default */ "b"].auth().currentUser;

                    if (!user) {
                      setError("Google sign-in did not complete in Safari. Please allow cookies or try again.");
                    }
                  }, 1500);
                }
              } catch (_) {}

              unsubRef.current = _context_Firebase__WEBPACK_IMPORTED_MODULE_8__[/* default */ "b"].auth().onAuthStateChanged(function (user) {
                console.log("[auth] onAuthStateChanged:", user);
                setAuthReady(true);

                if (user) {
                  var _dest = getDestination();

                  router.replace(_dest);
                }
              });
              _context2.next = 26;
              break;

            case 22:
              _context2.prev = 22;
              _context2.t1 = _context2["catch"](0);
              console.error("[auth] persistence setup error:", _context2.t1);
              setError("Authentication init failed.");

            case 26:
              _context2.prev = 26;
              setAuthReady(true);
              return _context2.finish(26);

            case 29:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 22, 26, 29], [4, 14]]);
    }))();

    return function () {
      if (unsubRef.current) unsubRef.current();
    };
  }, [hasMounted, router]);
  if (!hasMounted) return null;

  var handleGoogleSignIn = /*#__PURE__*/function () {
    var _ref3 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3() {
      var provider, result, dest;
      return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              setError("");
              _context3.prev = 1;
              _context3.next = 4;
              return ensurePersistence();

            case 4:
              provider = new _context_Firebase__WEBPACK_IMPORTED_MODULE_8__[/* default */ "b"].auth.GoogleAuthProvider();
              provider.addScope("email");
              provider.addScope("profile");
              provider.setCustomParameters({
                prompt: "select_account"
              });
              console.log("[auth] Using popup");
              _context3.prev = 9;
              _context3.next = 12;
              return _context_Firebase__WEBPACK_IMPORTED_MODULE_8__[/* default */ "b"].auth().signInWithPopup(provider);

            case 12:
              result = _context3.sent;
              console.log("[auth] popup result:", result && result.user); // onAuthStateChanged will route; but we can route immediately too:

              if (result && result.user) {
                dest = getDestination();
                router.replace(dest);
              }

              _context3.next = 23;
              break;

            case 17:
              _context3.prev = 17;
              _context3.t0 = _context3["catch"](9);

              if (!(isIosSafari() && ((_context3.t0 === null || _context3.t0 === void 0 ? void 0 : _context3.t0.code) === "auth/popup-blocked" || (_context3.t0 === null || _context3.t0 === void 0 ? void 0 : _context3.t0.code) === "auth/popup-closed-by-user" || (_context3.t0 === null || _context3.t0 === void 0 ? void 0 : _context3.t0.code) === "auth/operation-not-supported-in-this-environment"))) {
                _context3.next = 22;
                break;
              }

              setError("Safari blocked the sign-in popup. Please allow popups and try again.");
              return _context3.abrupt("return");

            case 22:
              throw _context3.t0;

            case 23:
              _context3.next = 29;
              break;

            case 25:
              _context3.prev = 25;
              _context3.t1 = _context3["catch"](1);
              console.error("[auth] sign-in error:", _context3.t1);

              if ((_context3.t1 === null || _context3.t1 === void 0 ? void 0 : _context3.t1.code) === "auth/unauthorized-domain") {
                setError("This domain is not authorized for Google sign-in. Add magmo.cloud in Firebase Auth > Settings > Authorized domains.");
              } else {
                setError("Failed to log in with Google: " + (_context3.t1 && _context3.t1.message ? _context3.t1.message : String(_context3.t1)));
              }

            case 29:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[1, 25], [9, 17]]);
    }));

    return function handleGoogleSignIn() {
      return _ref3.apply(this, arguments);
    };
  }();

  var handleTestLogin = /*#__PURE__*/function () {
    var _ref4 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee4() {
      var password;
      return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              setError("");
              password = prompt("Enter password:");

              if (password) {
                _context4.next = 4;
                break;
              }

              return _context4.abrupt("return");

            case 4:
              _context4.prev = 4;
              _context4.next = 7;
              return _context_Firebase__WEBPACK_IMPORTED_MODULE_8__[/* default */ "b"].auth().signInWithEmailAndPassword("test@test.com", password);

            case 7:
              router.replace("/NewSearch/searchTest");
              _context4.next = 13;
              break;

            case 10:
              _context4.prev = 10;
              _context4.t0 = _context4["catch"](4);
              setError("Test login failed: " + (_context4.t0 && _context4.t0.message ? _context4.t0.message : String(_context4.t0)));

            case 13:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[4, 10]]);
    }));

    return function handleTestLogin() {
      return _ref4.apply(this, arguments);
    };
  }();

  return __jsx("div", {
    className: _styles_Login_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.page
  }, __jsx(next_head__WEBPACK_IMPORTED_MODULE_2___default.a, null, __jsx("title", null, "magmo"), __jsx("link", {
    rel: "icon",
    href: "/favicon.ico"
  }), __jsx("meta", {
    name: "viewport",
    content: "width=device-width, initial-scale=1.0"
  })), __jsx("div", {
    className: _styles_Login_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.shell
  }, __jsx("div", {
    className: _styles_Login_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.card
  }, __jsx("img", {
    src: "/magmo.png",
    alt: "Magmo Logo",
    className: _styles_Login_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.logo
  }), __jsx("div", {
    className: _styles_Login_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.cardTitle
  }, "Welcome back"), !authReady && __jsx("div", {
    className: _styles_Login_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.status
  }, "Initializing\u2026"), error && __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], {
    variant: "danger"
  }, error), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], {
    variant: "light",
    className: _styles_Login_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.googleButton,
    onClick: handleGoogleSignIn
  }, __jsx("span", {
    className: _styles_Login_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.googleIcon
  }, __jsx("img", {
    src: "https://www.svgrepo.com/show/355037/google.svg",
    alt: "Google logo",
    width: "20",
    height: "20"
  })), "Continue with Google"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], {
    variant: "outline-secondary",
    className: _styles_Login_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.testButton,
    onClick: handleTestLogin
  }, "Test"))));
}

/***/ }),

/***/ "T0f4":
/***/ (function(module, exports) {

function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf;

/***/ }),

/***/ "TUci":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/react-bootstrap/node_modules/classnames/index.js
var classnames = __webpack_require__("eC2I");
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__("q1tI");

// EXTERNAL MODULE: ./node_modules/uncontrollable/lib/esm/index.js + 5 modules
var esm = __webpack_require__("y8DL");

// EXTERNAL MODULE: ./node_modules/@restart/hooks/esm/useEventCallback.js
var useEventCallback = __webpack_require__("ZCiN");

// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/ThemeProvider.js
var ThemeProvider = __webpack_require__("vUet");

// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/divWithClassName.js
var divWithClassName = __webpack_require__("U1MP");

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__("nKUr");

// CONCATENATED MODULE: ./node_modules/react-bootstrap/esm/AlertHeading.js
"use client";






const DivStyledAsH4 = Object(divWithClassName["a" /* default */])('h4');
DivStyledAsH4.displayName = 'DivStyledAsH4';
const AlertHeading = /*#__PURE__*/react["forwardRef"](({
  className,
  bsPrefix,
  as: Component = DivStyledAsH4,
  ...props
}, ref) => {
  bsPrefix = Object(ThemeProvider["e" /* useBootstrapPrefix */])(bsPrefix, 'alert-heading');
  return /*#__PURE__*/Object(jsx_runtime["jsx"])(Component, {
    ref: ref,
    className: classnames_default()(className, bsPrefix),
    ...props
  });
});
AlertHeading.displayName = 'AlertHeading';
/* harmony default export */ var esm_AlertHeading = (AlertHeading);
// EXTERNAL MODULE: ./node_modules/@restart/ui/esm/Anchor.js + 8 modules
var Anchor = __webpack_require__("8lGn");

// CONCATENATED MODULE: ./node_modules/react-bootstrap/esm/AlertLink.js
"use client";






const AlertLink = /*#__PURE__*/react["forwardRef"](({
  className,
  bsPrefix,
  as: Component = Anchor["a" /* default */],
  ...props
}, ref) => {
  bsPrefix = Object(ThemeProvider["e" /* useBootstrapPrefix */])(bsPrefix, 'alert-link');
  return /*#__PURE__*/Object(jsx_runtime["jsx"])(Component, {
    ref: ref,
    className: classnames_default()(className, bsPrefix),
    ...props
  });
});
AlertLink.displayName = 'AlertLink';
/* harmony default export */ var esm_AlertLink = (AlertLink);
// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/Fade.js
var Fade = __webpack_require__("7xGa");

// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/CloseButton.js
var CloseButton = __webpack_require__("XQC9");

// CONCATENATED MODULE: ./node_modules/react-bootstrap/esm/Alert.js
"use client";












const Alert = /*#__PURE__*/react["forwardRef"]((uncontrolledProps, ref) => {
  const {
    bsPrefix,
    show = true,
    closeLabel = 'Close alert',
    closeVariant,
    className,
    children,
    variant = 'primary',
    onClose,
    dismissible,
    transition = Fade["a" /* default */],
    ...props
  } = Object(esm["a" /* useUncontrolled */])(uncontrolledProps, {
    show: 'onClose'
  });
  const prefix = Object(ThemeProvider["e" /* useBootstrapPrefix */])(bsPrefix, 'alert');
  const handleClose = Object(useEventCallback["a" /* default */])(e => {
    if (onClose) {
      onClose(false, e);
    }
  });
  const Transition = transition === true ? Fade["a" /* default */] : transition;
  const alert = /*#__PURE__*/Object(jsx_runtime["jsxs"])("div", {
    role: "alert",
    ...(!Transition ? props : undefined),
    ref: ref,
    className: classnames_default()(className, prefix, variant && `${prefix}-${variant}`, dismissible && `${prefix}-dismissible`),
    children: [dismissible && /*#__PURE__*/Object(jsx_runtime["jsx"])(CloseButton["a" /* default */], {
      onClick: handleClose,
      "aria-label": closeLabel,
      variant: closeVariant
    }), children]
  });
  if (!Transition) return show ? alert : null;
  return /*#__PURE__*/Object(jsx_runtime["jsx"])(Transition, {
    unmountOnExit: true,
    ...props,
    ref: undefined,
    in: show,
    children: alert
  });
});
Alert.displayName = 'Alert';
/* harmony default export */ var esm_Alert = __webpack_exports__["a"] = (Object.assign(Alert, {
  Link: esm_AlertLink,
  Heading: esm_AlertHeading
}));

/***/ }),

/***/ "XQC9":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("17x9");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("eC2I");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("nKUr");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);




const propTypes = {
  /** An accessible label indicating the relevant information about the Close Button. */
  'aria-label': prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  /** A callback fired after the Close Button is clicked. */
  onClick: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
  /**
   * Render different color variant for the button.
   *
   * Omitting this will render the default dark color.
   */
  variant: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOf(['white'])
};
const CloseButton = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["forwardRef"](({
  className,
  variant,
  'aria-label': ariaLabel = 'Close',
  ...props
}, ref) => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__["jsx"])("button", {
  ref: ref,
  type: "button",
  className: classnames__WEBPACK_IMPORTED_MODULE_2___default()('btn-close', variant && `btn-close-${variant}`, className),
  "aria-label": ariaLabel,
  ...props
}));
CloseButton.displayName = 'CloseButton';
CloseButton.propTypes = propTypes;
/* harmony default export */ __webpack_exports__["a"] = (CloseButton);

/***/ }),

/***/ "XcHJ":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return useMounted; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


/**
 * Track whether a component is current mounted. Generally less preferable than
 * properlly canceling effects so they don't run after a component is unmounted,
 * but helpful in cases where that isn't feasible, such as a `Promise` resolution.
 *
 * @returns a function that returns the current isMounted state of the component
 *
 * ```ts
 * const [data, setData] = useState(null)
 * const isMounted = useMounted()
 *
 * useEffect(() => {
 *   fetchdata().then((newData) => {
 *      if (isMounted()) {
 *        setData(newData);
 *      }
 *   })
 * })
 * ```
 */
function useMounted() {
  const mounted = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(true);
  const isMounted = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(() => mounted.current);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  return isMounted.current;
}

/***/ }),

/***/ "Xuae":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _toConsumableArray = __webpack_require__("mPvQ");

var _classCallCheck = __webpack_require__("/GRZ");

var _createClass = __webpack_require__("i2R6");

var _assertThisInitialized = __webpack_require__("qXWd");

var _inherits = __webpack_require__("48fX");

var _possibleConstructorReturn = __webpack_require__("tCBg");

var _getPrototypeOf = __webpack_require__("T0f4");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

exports.__esModule = true;
exports["default"] = void 0;

var _react = __webpack_require__("q1tI");

var isServer = false;

var _default = /*#__PURE__*/function (_react$Component) {
  _inherits(_default, _react$Component);

  var _super = _createSuper(_default);

  function _default(props) {
    var _this;

    _classCallCheck(this, _default);

    _this = _super.call(this, props);
    _this._hasHeadManager = void 0;

    _this.emitChange = function () {
      if (_this._hasHeadManager) {
        _this.props.headManager.updateHead(_this.props.reduceComponentsToState(_toConsumableArray(_this.props.headManager.mountedInstances), _this.props));
      }
    };

    _this._hasHeadManager = _this.props.headManager && _this.props.headManager.mountedInstances;

    if (isServer && _this._hasHeadManager) {
      _this.props.headManager.mountedInstances.add(_assertThisInitialized(_this));

      _this.emitChange();
    }

    return _this;
  }

  _createClass(_default, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this._hasHeadManager) {
        this.props.headManager.mountedInstances.add(this);
      }

      this.emitChange();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.emitChange();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this._hasHeadManager) {
        this.props.headManager.mountedInstances["delete"](this);
      }

      this.emitChange();
    }
  }, {
    key: "render",
    value: function render() {
      return null;
    }
  }]);

  return _default;
}(_react.Component);

exports["default"] = _default;

/***/ }),

/***/ "ccR7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const isReactNative = typeof global !== 'undefined' &&
// @ts-ignore
global.navigator &&
// @ts-ignore
global.navigator.product === 'ReactNative';
const isDOM = typeof document !== 'undefined';

/**
 * Is `useLayoutEffect` in a DOM or React Native environment, otherwise resolves to useEffect
 * Only useful to avoid the console warning.
 *
 * PREFER `useEffect` UNLESS YOU KNOW WHAT YOU ARE DOING.
 *
 * @category effects
 */
/* harmony default export */ __webpack_exports__["a"] = (isDOM || isReactNative ? react__WEBPACK_IMPORTED_MODULE_0__["useLayoutEffect"] : react__WEBPACK_IMPORTED_MODULE_0__["useEffect"]);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("ntbh")))

/***/ }),

/***/ "g4pe":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("8Kt/")


/***/ }),

/***/ "kG2m":
/***/ (function(module, exports) {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = _nonIterableSpread;

/***/ }),

/***/ "lwAK":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.AmpStateContext = void 0;

var _react = _interopRequireDefault(__webpack_require__("q1tI"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

var AmpStateContext = /*#__PURE__*/_react["default"].createContext({});

exports.AmpStateContext = AmpStateContext;

if (false) {}

/***/ }),

/***/ "mPvQ":
/***/ (function(module, exports, __webpack_require__) {

var arrayWithoutHoles = __webpack_require__("5fIB");

var iterableToArray = __webpack_require__("rlHP");

var unsupportedIterableToArray = __webpack_require__("KckH");

var nonIterableSpread = __webpack_require__("kG2m");

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}

module.exports = _toConsumableArray;

/***/ }),

/***/ "qXWd":
/***/ (function(module, exports) {

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

module.exports = _assertThisInitialized;

/***/ }),

/***/ "qvwu":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return usePrevious; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


/**
 * Store the last of some value. Tracked via a `Ref` only updating it
 * after the component renders.
 *
 * Helpful if you need to compare a prop value to it's previous value during render.
 *
 * ```ts
 * function Component(props) {
 *   const lastProps = usePrevious(props)
 *
 *   if (lastProps.foo !== props.foo)
 *     resetValueFromProps(props.foo)
 * }
 * ```
 *
 * @param value the value to track
 */
function usePrevious(value) {
  const ref = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    ref.current = value;
  });
  return ref.current;
}

/***/ }),

/***/ "tCBg":
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__("C+bE");

var assertThisInitialized = __webpack_require__("qXWd");

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

module.exports = _possibleConstructorReturn;

/***/ }),

/***/ "vlRD":
/***/ (function(module, exports, __webpack_require__) {


    (window.__NEXT_P = window.__NEXT_P || []).push([
      "/",
      function () {
        return __webpack_require__("RNiq");
      }
    ]);
  

/***/ })

},[["vlRD",1,0,5,3,2,4,6,7,10]]]);