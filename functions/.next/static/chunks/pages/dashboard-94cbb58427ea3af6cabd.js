_N_E =
(window["webpackJsonp_N_E"] = window["webpackJsonp_N_E"] || []).push([[56],{

/***/ "20a2":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("nOHt")


/***/ }),

/***/ "2wU4":
/***/ (function(module, exports, __webpack_require__) {


    (window.__NEXT_P = window.__NEXT_P || []).push([
      "/dashboard",
      function () {
        return __webpack_require__("u9iw");
      }
    ]);
  

/***/ }),

/***/ "6xyR":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/react-bootstrap/node_modules/classnames/index.js
var classnames = __webpack_require__("eC2I");
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__("q1tI");

// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/ThemeProvider.js
var ThemeProvider = __webpack_require__("vUet");

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__("nKUr");

// CONCATENATED MODULE: ./node_modules/react-bootstrap/esm/CardBody.js
"use client";





const CardBody = /*#__PURE__*/react["forwardRef"](({
  className,
  bsPrefix,
  as: Component = 'div',
  ...props
}, ref) => {
  bsPrefix = Object(ThemeProvider["e" /* useBootstrapPrefix */])(bsPrefix, 'card-body');
  return /*#__PURE__*/Object(jsx_runtime["jsx"])(Component, {
    ref: ref,
    className: classnames_default()(className, bsPrefix),
    ...props
  });
});
CardBody.displayName = 'CardBody';
/* harmony default export */ var esm_CardBody = (CardBody);
// CONCATENATED MODULE: ./node_modules/react-bootstrap/esm/CardFooter.js
"use client";





const CardFooter = /*#__PURE__*/react["forwardRef"](({
  className,
  bsPrefix,
  as: Component = 'div',
  ...props
}, ref) => {
  bsPrefix = Object(ThemeProvider["e" /* useBootstrapPrefix */])(bsPrefix, 'card-footer');
  return /*#__PURE__*/Object(jsx_runtime["jsx"])(Component, {
    ref: ref,
    className: classnames_default()(className, bsPrefix),
    ...props
  });
});
CardFooter.displayName = 'CardFooter';
/* harmony default export */ var esm_CardFooter = (CardFooter);
// CONCATENATED MODULE: ./node_modules/react-bootstrap/esm/CardHeaderContext.js
"use client";


const context = /*#__PURE__*/react["createContext"](null);
context.displayName = 'CardHeaderContext';
/* harmony default export */ var CardHeaderContext = (context);
// CONCATENATED MODULE: ./node_modules/react-bootstrap/esm/CardHeader.js
"use client";







const CardHeader = /*#__PURE__*/react["forwardRef"](({
  bsPrefix,
  className,
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component = 'div',
  ...props
}, ref) => {
  const prefix = Object(ThemeProvider["e" /* useBootstrapPrefix */])(bsPrefix, 'card-header');
  const contextValue = Object(react["useMemo"])(() => ({
    cardHeaderBsPrefix: prefix
  }), [prefix]);
  return /*#__PURE__*/Object(jsx_runtime["jsx"])(CardHeaderContext.Provider, {
    value: contextValue,
    children: /*#__PURE__*/Object(jsx_runtime["jsx"])(Component, {
      ref: ref,
      ...props,
      className: classnames_default()(className, prefix)
    })
  });
});
CardHeader.displayName = 'CardHeader';
/* harmony default export */ var esm_CardHeader = (CardHeader);
// CONCATENATED MODULE: ./node_modules/react-bootstrap/esm/CardImg.js
"use client";





const CardImg = /*#__PURE__*/react["forwardRef"](
// Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
({
  bsPrefix,
  className,
  variant,
  as: Component = 'img',
  ...props
}, ref) => {
  const prefix = Object(ThemeProvider["e" /* useBootstrapPrefix */])(bsPrefix, 'card-img');
  return /*#__PURE__*/Object(jsx_runtime["jsx"])(Component, {
    ref: ref,
    className: classnames_default()(variant ? `${prefix}-${variant}` : prefix, className),
    ...props
  });
});
CardImg.displayName = 'CardImg';
/* harmony default export */ var esm_CardImg = (CardImg);
// CONCATENATED MODULE: ./node_modules/react-bootstrap/esm/CardImgOverlay.js
"use client";





const CardImgOverlay = /*#__PURE__*/react["forwardRef"](({
  className,
  bsPrefix,
  as: Component = 'div',
  ...props
}, ref) => {
  bsPrefix = Object(ThemeProvider["e" /* useBootstrapPrefix */])(bsPrefix, 'card-img-overlay');
  return /*#__PURE__*/Object(jsx_runtime["jsx"])(Component, {
    ref: ref,
    className: classnames_default()(className, bsPrefix),
    ...props
  });
});
CardImgOverlay.displayName = 'CardImgOverlay';
/* harmony default export */ var esm_CardImgOverlay = (CardImgOverlay);
// CONCATENATED MODULE: ./node_modules/react-bootstrap/esm/CardLink.js
"use client";





const CardLink = /*#__PURE__*/react["forwardRef"](({
  className,
  bsPrefix,
  as: Component = 'a',
  ...props
}, ref) => {
  bsPrefix = Object(ThemeProvider["e" /* useBootstrapPrefix */])(bsPrefix, 'card-link');
  return /*#__PURE__*/Object(jsx_runtime["jsx"])(Component, {
    ref: ref,
    className: classnames_default()(className, bsPrefix),
    ...props
  });
});
CardLink.displayName = 'CardLink';
/* harmony default export */ var esm_CardLink = (CardLink);
// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/divWithClassName.js
var divWithClassName = __webpack_require__("U1MP");

// CONCATENATED MODULE: ./node_modules/react-bootstrap/esm/CardSubtitle.js
"use client";






const DivStyledAsH6 = Object(divWithClassName["a" /* default */])('h6');
const CardSubtitle = /*#__PURE__*/react["forwardRef"](({
  className,
  bsPrefix,
  as: Component = DivStyledAsH6,
  ...props
}, ref) => {
  bsPrefix = Object(ThemeProvider["e" /* useBootstrapPrefix */])(bsPrefix, 'card-subtitle');
  return /*#__PURE__*/Object(jsx_runtime["jsx"])(Component, {
    ref: ref,
    className: classnames_default()(className, bsPrefix),
    ...props
  });
});
CardSubtitle.displayName = 'CardSubtitle';
/* harmony default export */ var esm_CardSubtitle = (CardSubtitle);
// CONCATENATED MODULE: ./node_modules/react-bootstrap/esm/CardText.js
"use client";





const CardText = /*#__PURE__*/react["forwardRef"](({
  className,
  bsPrefix,
  as: Component = 'p',
  ...props
}, ref) => {
  bsPrefix = Object(ThemeProvider["e" /* useBootstrapPrefix */])(bsPrefix, 'card-text');
  return /*#__PURE__*/Object(jsx_runtime["jsx"])(Component, {
    ref: ref,
    className: classnames_default()(className, bsPrefix),
    ...props
  });
});
CardText.displayName = 'CardText';
/* harmony default export */ var esm_CardText = (CardText);
// CONCATENATED MODULE: ./node_modules/react-bootstrap/esm/CardTitle.js
"use client";






const DivStyledAsH5 = Object(divWithClassName["a" /* default */])('h5');
const CardTitle = /*#__PURE__*/react["forwardRef"](({
  className,
  bsPrefix,
  as: Component = DivStyledAsH5,
  ...props
}, ref) => {
  bsPrefix = Object(ThemeProvider["e" /* useBootstrapPrefix */])(bsPrefix, 'card-title');
  return /*#__PURE__*/Object(jsx_runtime["jsx"])(Component, {
    ref: ref,
    className: classnames_default()(className, bsPrefix),
    ...props
  });
});
CardTitle.displayName = 'CardTitle';
/* harmony default export */ var esm_CardTitle = (CardTitle);
// CONCATENATED MODULE: ./node_modules/react-bootstrap/esm/Card.js
"use client";














const Card = /*#__PURE__*/react["forwardRef"](({
  bsPrefix,
  className,
  bg,
  text,
  border,
  body = false,
  children,
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component = 'div',
  ...props
}, ref) => {
  const prefix = Object(ThemeProvider["e" /* useBootstrapPrefix */])(bsPrefix, 'card');
  return /*#__PURE__*/Object(jsx_runtime["jsx"])(Component, {
    ref: ref,
    ...props,
    className: classnames_default()(className, prefix, bg && `bg-${bg}`, text && `text-${text}`, border && `border-${border}`),
    children: body ? /*#__PURE__*/Object(jsx_runtime["jsx"])(esm_CardBody, {
      children: children
    }) : children
  });
});
Card.displayName = 'Card';
/* harmony default export */ var esm_Card = __webpack_exports__["a"] = (Object.assign(Card, {
  Img: esm_CardImg,
  Title: esm_CardTitle,
  Subtitle: esm_CardSubtitle,
  Body: esm_CardBody,
  Link: esm_CardLink,
  Text: esm_CardText,
  Header: esm_CardHeader,
  Footer: esm_CardFooter,
  ImgOverlay: esm_CardImgOverlay
}));

/***/ }),

/***/ "7vrA":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("eC2I");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("vUet");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("nKUr");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);
"use client";





const Container = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["forwardRef"](({
  bsPrefix,
  fluid = false,
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component = 'div',
  className,
  ...props
}, ref) => {
  const prefix = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_2__[/* useBootstrapPrefix */ "e"])(bsPrefix, 'container');
  const suffix = typeof fluid === 'string' ? `-${fluid}` : '-fluid';
  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__["jsx"])(Component, {
    ref: ref,
    ...props,
    className: classnames__WEBPACK_IMPORTED_MODULE_0___default()(className, fluid ? `${prefix}${suffix}` : prefix)
  });
});
Container.displayName = 'Container';
/* harmony default export */ __webpack_exports__["a"] = (Container);

/***/ }),

/***/ "U1MP":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("eC2I");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("nKUr");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);



/* harmony default export */ __webpack_exports__["a"] = (className => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["forwardRef"]((p, ref) => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__["jsx"])("div", {
  ...p,
  ref: ref,
  className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(p.className, className)
})));

/***/ }),

/***/ "XrFm":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ AuthUserProvider; });
__webpack_require__.d(__webpack_exports__, "b", function() { return /* binding */ AuthUserContext_useAuth; });

// EXTERNAL MODULE: ./node_modules/next/node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__("vJKn");
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);

// EXTERNAL MODULE: ./node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("rg98");

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__("q1tI");
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./context/Firebase.js + 6 modules
var Firebase = __webpack_require__("NY6m");

// CONCATENATED MODULE: ./context/useFirebaseAuth.js





var formatAuthUser = function formatAuthUser(user) {
  return {
    uid: user.uid,
    email: user.email
  };
};

function useFirebaseAuth() {
  var _useState = Object(react["useState"])(null),
      authUser = _useState[0],
      setAuthUser = _useState[1];

  var _useState2 = Object(react["useState"])(true),
      loading = _useState2[0],
      setLoading = _useState2[1];

  var authStateChanged = /*#__PURE__*/function () {
    var _ref = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee(authState) {
      var formattedUser;
      return regenerator_default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (authState) {
                _context.next = 4;
                break;
              }

              setAuthUser(null);
              setLoading(false);
              return _context.abrupt("return");

            case 4:
              setLoading(true);
              formattedUser = formatAuthUser(authState);
              setAuthUser(formattedUser);
              setLoading(false);

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function authStateChanged(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var clear = function clear() {
    setAuthUser(null);
    setLoading(true);
  }; //sign in with google


  var signInWithGoogle = function signInWithGoogle() {
    var provider = new Firebase["b" /* default */].auth.GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account"
    });
    return Firebase["a" /* auth */].signInWithRedirect(provider)["catch"](function (error) {
      console.error("Google Sign-In Error:", error);
      throw error;
    });
  };

  var signOut = function signOut() {
    return Firebase["a" /* auth */].signOut().then(clear);
  }; // Listen for Firebase auth state changes
  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged(authStateChanged);
  //   return () => unsubscribe();
  // }, []);


  Object(react["useEffect"])(function () {
    var unsubscribe;
    Firebase["a" /* auth */].setPersistence(Firebase["b" /* default */].auth.Auth.Persistence.LOCAL).then(function () {
      // Now set up the listener
      unsubscribe = Firebase["a" /* auth */].onAuthStateChanged(authStateChanged);
    })["catch"](function (error) {
      return console.error("Error setting persistence:", error);
    });
    return function () {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);
  return {
    authUser: authUser,
    loading: loading,
    signInWithGoogle: signInWithGoogle,
    signOut: signOut
  };
}
// CONCATENATED MODULE: ./context/AuthUserContext.js



var __jsx = react_default.a.createElement;


var authUserContext = /*#__PURE__*/Object(react["createContext"])({
  authUser: null,
  loading: true,
  signInWithGoogle: function () {
    var _signInWithGoogle = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee() {
      return regenerator_default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function signInWithGoogle() {
      return _signInWithGoogle.apply(this, arguments);
    }

    return signInWithGoogle;
  }(),
  signOut: function () {
    var _signOut = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee2() {
      return regenerator_default.a.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function signOut() {
      return _signOut.apply(this, arguments);
    }

    return signOut;
  }()
});
function AuthUserProvider(_ref) {
  var children = _ref.children;
  var auth = useFirebaseAuth();
  return __jsx(authUserContext.Provider, {
    value: auth
  }, children);
}
var AuthUserContext_useAuth = function useAuth() {
  return Object(react["useContext"])(authUserContext);
};

/***/ }),

/***/ "YFqc":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("cTJO")


/***/ }),

/***/ "cTJO":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = __webpack_require__("zoAU");

var _interopRequireWildcard = __webpack_require__("7KCV");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(__webpack_require__("q1tI"));

var _router = __webpack_require__("elyg");

var _router2 = __webpack_require__("nOHt");

var _useIntersection = __webpack_require__("vNVm");

var prefetched = {};

function prefetch(router, href, as, options) {
  if ( false || !router) return;
  if (!(0, _router.isLocalURL)(href)) return; // Prefetch the JSON page if asked (only in the client)
  // We need to handle a prefetch error here since we may be
  // loading with priority which can reject but we don't
  // want to force navigation since this is only a prefetch

  router.prefetch(href, as, options)["catch"](function (err) {
    if (false) {}
  });
  var curLocale = options && typeof options.locale !== 'undefined' ? options.locale : router && router.locale; // Join on an invalid URI character

  prefetched[href + '%' + as + (curLocale ? '%' + curLocale : '')] = true;
}

function isModifiedEvent(event) {
  var target = event.currentTarget.target;
  return target && target !== '_self' || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || // triggers resource download
  event.nativeEvent && event.nativeEvent.which === 2;
}

function linkClicked(e, router, href, as, replace, shallow, scroll, locale) {
  var nodeName = e.currentTarget.nodeName;

  if (nodeName === 'A' && (isModifiedEvent(e) || !(0, _router.isLocalURL)(href))) {
    // ignore click for browser’s default behavior
    return;
  }

  e.preventDefault(); //  avoid scroll for urls with anchor refs

  if (scroll == null) {
    scroll = as.indexOf('#') < 0;
  } // replace state instead of push if prop is present


  router[replace ? 'replace' : 'push'](href, as, {
    shallow: shallow,
    locale: locale,
    scroll: scroll
  });
}

function Link(props) {
  if (false) { var hasWarned, optionalProps, optionalPropsGuard, requiredProps, requiredPropsGuard, createPropError; }

  var p = props.prefetch !== false;
  var router = (0, _router2.useRouter)();
  var pathname = router && router.asPath || '/';

  var _react$default$useMem = _react["default"].useMemo(function () {
    var _ref = (0, _router.resolveHref)(pathname, props.href, true),
        _ref2 = _slicedToArray(_ref, 2),
        resolvedHref = _ref2[0],
        resolvedAs = _ref2[1];

    return {
      href: resolvedHref,
      as: props.as ? (0, _router.resolveHref)(pathname, props.as) : resolvedAs || resolvedHref
    };
  }, [pathname, props.href, props.as]),
      href = _react$default$useMem.href,
      as = _react$default$useMem.as;

  var children = props.children,
      replace = props.replace,
      shallow = props.shallow,
      scroll = props.scroll,
      locale = props.locale; // Deprecated. Warning shown by propType check. If the children provided is a string (<Link>example</Link>) we wrap it in an <a> tag

  if (typeof children === 'string') {
    children = /*#__PURE__*/_react["default"].createElement("a", null, children);
  } // This will return the first child, if multiple are provided it will throw an error


  var child = _react.Children.only(children);

  var childRef = child && typeof child === 'object' && child.ref;

  var _ref3 = (0, _useIntersection.useIntersection)({
    rootMargin: '200px'
  }),
      _ref4 = _slicedToArray(_ref3, 2),
      setIntersectionRef = _ref4[0],
      isVisible = _ref4[1];

  var setRef = _react["default"].useCallback(function (el) {
    setIntersectionRef(el);

    if (childRef) {
      if (typeof childRef === 'function') childRef(el);else if (typeof childRef === 'object') {
        childRef.current = el;
      }
    }
  }, [childRef, setIntersectionRef]);

  (0, _react.useEffect)(function () {
    var shouldPrefetch = isVisible && p && (0, _router.isLocalURL)(href);
    var curLocale = typeof locale !== 'undefined' ? locale : router && router.locale;
    var isPrefetched = prefetched[href + '%' + as + (curLocale ? '%' + curLocale : '')];

    if (shouldPrefetch && !isPrefetched) {
      prefetch(router, href, as, {
        locale: curLocale
      });
    }
  }, [as, href, isVisible, locale, p, router]);
  var childProps = {
    ref: setRef,
    onClick: function onClick(e) {
      if (child.props && typeof child.props.onClick === 'function') {
        child.props.onClick(e);
      }

      if (!e.defaultPrevented) {
        linkClicked(e, router, href, as, replace, shallow, scroll, locale);
      }
    }
  };

  childProps.onMouseEnter = function (e) {
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
    var curLocale = typeof locale !== 'undefined' ? locale : router && router.locale; // we only render domain locales if we are currently on a domain locale
    // so that locale links are still visitable in development/preview envs

    var localeDomain = router && router.isLocaleDomain && (0, _router.getDomainLocale)(as, curLocale, router && router.locales, router && router.domainLocales);
    childProps.href = localeDomain || (0, _router.addBasePath)((0, _router.addLocale)(as, curLocale, router && router.defaultLocale));
  }

  return /*#__PURE__*/_react["default"].cloneElement(child, childProps);
}

var _default = Link;
exports["default"] = _default;

/***/ }),

/***/ "cWnB":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("eC2I");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _restart_ui_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("uN4Y");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("vUet");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("nKUr");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);
"use client";






const Button = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["forwardRef"](({
  as,
  bsPrefix,
  variant = 'primary',
  size,
  active = false,
  disabled = false,
  className,
  ...props
}, ref) => {
  const prefix = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__[/* useBootstrapPrefix */ "e"])(bsPrefix, 'btn');
  const [buttonProps, {
    tagName
  }] = Object(_restart_ui_Button__WEBPACK_IMPORTED_MODULE_2__[/* useButtonProps */ "b"])({
    tagName: as,
    disabled,
    ...props
  });
  const Component = tagName;
  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__["jsx"])(Component, {
    ...buttonProps,
    ...props,
    ref: ref,
    disabled: disabled,
    className: classnames__WEBPACK_IMPORTED_MODULE_0___default()(className, prefix, active && 'active', variant && `${prefix}-${variant}`, size && `${prefix}-${size}`, props.href && disabled && 'disabled')
  });
});
Button.displayName = 'Button';
/* harmony default export */ __webpack_exports__["a"] = (Button);

/***/ }),

/***/ "eC2I":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = '';

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (arg) {
				classes = appendClass(classes, parseValue(arg));
			}
		}

		return classes;
	}

	function parseValue (arg) {
		if (typeof arg === 'string' || typeof arg === 'number') {
			return arg;
		}

		if (typeof arg !== 'object') {
			return '';
		}

		if (Array.isArray(arg)) {
			return classNames.apply(null, arg);
		}

		if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes('[native code]')) {
			return arg.toString();
		}

		var classes = '';

		for (var key in arg) {
			if (hasOwn.call(arg, key) && arg[key]) {
				classes = appendClass(classes, key);
			}
		}

		return classes;
	}

	function appendClass (value, newClass) {
		if (!newClass) {
			return value;
		}
	
		if (value) {
			return value + ' ' + newClass;
		}
	
		return value + newClass;
	}

	if ( true && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
}());


/***/ }),

/***/ "mJJZ":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("20a2");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _context_AuthUserContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("XrFm");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("7vrA");

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;





var LoggedIn = function LoggedIn(_ref) {
  var children = _ref.children;

  var _useAuth = Object(_context_AuthUserContext__WEBPACK_IMPORTED_MODULE_2__[/* useAuth */ "b"])(),
      authUser = _useAuth.authUser,
      loading = _useAuth.loading;

  var router = Object(next_router__WEBPACK_IMPORTED_MODULE_1__["useRouter"])(); // Redirect only after a short delay if authUser remains null.

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    console.log("=== LOGGEDIN AUTH CHECK ===");
    console.log("loading:", loading);
    console.log("authUser:", authUser);
    console.log("router.asPath:", router.asPath);

    if (!loading && authUser === null) {
      console.log("No auth user, will redirect to login in 800ms"); // Set a delay (e.g. 500ms) to give Firebase Auth a chance to rehydrate.

      var timer = setTimeout(function () {
        console.log("Redirecting to login now");
        router.push("/?redirect=".concat(encodeURIComponent(router.asPath)));
      }, 800);
      return function () {
        return clearTimeout(timer);
      };
    }
  }, [authUser, loading, router]);

  if (loading) {
    return __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], {
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

/***/ "q4sD":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "rg98":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _asyncToGenerator; });
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

/***/ }),

/***/ "u9iw":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return dashboard; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var bootstrap_dist_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("q4sD");
/* harmony import */ var bootstrap_dist_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bootstrap_dist_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("7vrA");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("6xyR");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("cWnB");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("YFqc");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _context_AuthUserContext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("XrFm");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("20a2");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _LoggedIn__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("mJJZ");
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;









function simulateNetworkRequest() {
  return new Promise(function (resolve) {
    return setTimeout(resolve, 2000);
  });
}

function LoadingButton(_ref) {
  var type = _ref.type,
      name = _ref.name,
      route = _ref.route,
      _ref$enable = _ref.enable,
      enable = _ref$enable === void 0 ? true : _ref$enable;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false),
      isLoading = _useState[0],
      setLoading = _useState[1];

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    if (isLoading) {
      simulateNetworkRequest().then(function () {
        setLoading(false);
      });
    }
  }, [isLoading]);

  var handleClick = function handleClick() {
    return setLoading(true);
  }; // Guard against falsy route values


  if (!route) return null;
  var isExternal = route.startsWith('http://') || route.startsWith('https://');

  if (isExternal) {
    return __jsx("a", {
      href: route,
      className: "btn btn-".concat(type),
      disabled: !enable || isLoading,
      onClick: !isLoading ? handleClick : null,
      style: {
        pointerEvents: !enable ? 'none' : 'auto',
        opacity: !enable ? 0.65 : 1
      }
    }, isLoading ? "Loading…" : name);
  } else {
    return __jsx(next_link__WEBPACK_IMPORTED_MODULE_5___default.a, {
      href: route
    }, __jsx("a", {
      className: "btn btn-".concat(type),
      disabled: !enable || isLoading,
      onClick: !isLoading ? handleClick : null,
      style: {
        pointerEvents: !enable ? 'none' : 'auto',
        opacity: !enable ? 0.65 : 1
      }
    }, isLoading ? "Loading…" : name));
  }
}

function dashboard() {
  var _useAuth = Object(_context_AuthUserContext__WEBPACK_IMPORTED_MODULE_6__[/* useAuth */ "b"])(),
      authUser = _useAuth.authUser,
      loading = _useAuth.loading,
      signOut = _useAuth.signOut;

  var router = Object(next_router__WEBPACK_IMPORTED_MODULE_7__["useRouter"])(); // Redirect to login if not authenticated and not still loading

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    if (!loading && !authUser) {
      // router.push("/");
      console.log("user noy logged in also should not be here");
    }
  }, [authUser, loading, router]); // Show a loading message until auth state is determined

  if (loading || !authUser) {
    return __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], {
      className: "d-flex align-items-center justify-content-center",
      style: {
        minHeight: "100vh"
      }
    }, __jsx("h3", null, "Loading..."));
  }

  return __jsx(_LoggedIn__WEBPACK_IMPORTED_MODULE_8__["default"], null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], {
    className: "d-flex align-items-center justify-content-center",
    style: {
      minHeight: "100vh"
    }
  }, __jsx("div", {
    className: "w-100",
    style: {
      maxWidth: "400px"
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], {
    className: "align-items-center justify-content-center"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].Body, null, __jsx("h2", {
    className: "text-center mb-4"
  }, "Main Menu"), __jsx("div", {
    "class": "d-grid gap-3"
  }, __jsx(LoadingButton, {
    type: "primary",
    name: "Service Docs",
    route: "ServiceDocs/ServiceSelect",
    enable: false
  }), __jsx(LoadingButton, {
    type: "secondary",
    name: "MagMon",
    route: "http://mri.advancedimagingparts.com/login"
  }), __jsx(LoadingButton, {
    type: "primary",
    name: "Warehouse db",
    route: "Warehousedb/WarehouseSelect"
  }), __jsx(LoadingButton, {
    type: "primary",
    name: "Interview",
    route: "schedule/interview",
    enable: false
  }), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], {
    variant: "link",
    onClick: signOut
  }, "Sign out")))))));
}

/***/ }),

/***/ "uN4Y":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export isTrivialHref */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return useButtonProps; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("nKUr");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);
const _excluded = ["as", "disabled"];
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }


function isTrivialHref(href) {
  return !href || href.trim() === '#';
}
function useButtonProps({
  tagName,
  disabled,
  href,
  target,
  rel,
  role,
  onClick,
  tabIndex = 0,
  type
}) {
  if (!tagName) {
    if (href != null || target != null || rel != null) {
      tagName = 'a';
    } else {
      tagName = 'button';
    }
  }
  const meta = {
    tagName
  };
  if (tagName === 'button') {
    return [{
      type: type || 'button',
      disabled
    }, meta];
  }
  const handleClick = event => {
    if (disabled || tagName === 'a' && isTrivialHref(href)) {
      event.preventDefault();
    }
    if (disabled) {
      event.stopPropagation();
      return;
    }
    onClick == null ? void 0 : onClick(event);
  };
  const handleKeyDown = event => {
    if (event.key === ' ') {
      event.preventDefault();
      handleClick(event);
    }
  };
  if (tagName === 'a') {
    // Ensure there's a href so Enter can trigger anchor button.
    href || (href = '#');
    if (disabled) {
      href = undefined;
    }
  }
  return [{
    role: role != null ? role : 'button',
    // explicitly undefined so that it overrides the props disabled in a spread
    // e.g. <Tag {...props} {...hookProps} />
    disabled: undefined,
    tabIndex: disabled ? undefined : tabIndex,
    href,
    target: tagName === 'a' ? target : undefined,
    'aria-disabled': !disabled ? undefined : disabled,
    rel: tagName === 'a' ? rel : undefined,
    onClick: handleClick,
    onKeyDown: handleKeyDown
  }, meta];
}
const Button = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["forwardRef"]((_ref, ref) => {
  let {
      as: asProp,
      disabled
    } = _ref,
    props = _objectWithoutPropertiesLoose(_ref, _excluded);
  const [buttonProps, {
    tagName: Component
  }] = useButtonProps(Object.assign({
    tagName: asProp,
    disabled
  }, props));
  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__["jsx"])(Component, Object.assign({}, props, buttonProps, {
    ref: ref
  }));
});
Button.displayName = 'Button';
/* harmony default export */ __webpack_exports__["a"] = (Button);

/***/ }),

/***/ "vNVm":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = __webpack_require__("zoAU");

exports.__esModule = true;
exports.useIntersection = useIntersection;

var _react = __webpack_require__("q1tI");

var _requestIdleCallback = __webpack_require__("0G5g");

var hasIntersectionObserver = typeof IntersectionObserver !== 'undefined';

function useIntersection(_ref) {
  var rootMargin = _ref.rootMargin,
      disabled = _ref.disabled;
  var isDisabled = disabled || !hasIntersectionObserver;
  var unobserve = (0, _react.useRef)();

  var _ref2 = (0, _react.useState)(false),
      _ref3 = _slicedToArray(_ref2, 2),
      visible = _ref3[0],
      setVisible = _ref3[1];

  var setRef = (0, _react.useCallback)(function (el) {
    if (unobserve.current) {
      unobserve.current();
      unobserve.current = undefined;
    }

    if (isDisabled || visible) return;

    if (el && el.tagName) {
      unobserve.current = observe(el, function (isVisible) {
        return isVisible && setVisible(isVisible);
      }, {
        rootMargin: rootMargin
      });
    }
  }, [isDisabled, rootMargin, visible]);
  (0, _react.useEffect)(function () {
    if (!hasIntersectionObserver) {
      if (!visible) {
        var idleCallback = (0, _requestIdleCallback.requestIdleCallback)(function () {
          return setVisible(true);
        });
        return function () {
          return (0, _requestIdleCallback.cancelIdleCallback)(idleCallback);
        };
      }
    }
  }, [visible]);
  return [setRef, visible];
}

function observe(element, callback, options) {
  var _createObserver = createObserver(options),
      id = _createObserver.id,
      observer = _createObserver.observer,
      elements = _createObserver.elements;

  elements.set(element, callback);
  observer.observe(element);
  return function unobserve() {
    elements["delete"](element);
    observer.unobserve(element); // Destroy observer when there's nothing left to watch:

    if (elements.size === 0) {
      observer.disconnect();
      observers["delete"](id);
    }
  };
}

var observers = new Map();

function createObserver(options) {
  var id = options.rootMargin || '';
  var instance = observers.get(id);

  if (instance) {
    return instance;
  }

  var elements = new Map();
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      var callback = elements.get(entry.target);
      var isVisible = entry.isIntersecting || entry.intersectionRatio > 0;

      if (callback && isVisible) {
        callback(isVisible);
      }
    });
  }, options);
  observers.set(id, instance = {
    id: id,
    observer: observer,
    elements: elements
  });
  return instance;
}

/***/ }),

/***/ "vUet":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DEFAULT_BREAKPOINTS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return DEFAULT_MIN_BREAKPOINT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return useBootstrapPrefix; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return useBootstrapBreakpoints; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return useBootstrapMinBreakpoint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return useIsRTL; });
/* unused harmony export createBootstrapComponent */
/* unused harmony export ThemeConsumer */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("nKUr");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);
"use client";




const DEFAULT_BREAKPOINTS = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'];
const DEFAULT_MIN_BREAKPOINT = 'xs';
const ThemeContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createContext"]({
  prefixes: {},
  breakpoints: DEFAULT_BREAKPOINTS,
  minBreakpoint: DEFAULT_MIN_BREAKPOINT
});
const {
  Consumer,
  Provider
} = ThemeContext;
function ThemeProvider({
  prefixes = {},
  breakpoints = DEFAULT_BREAKPOINTS,
  minBreakpoint = DEFAULT_MIN_BREAKPOINT,
  dir,
  children
}) {
  const contextValue = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => ({
    prefixes: {
      ...prefixes
    },
    breakpoints,
    minBreakpoint,
    dir
  }), [prefixes, breakpoints, minBreakpoint, dir]);
  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__["jsx"])(Provider, {
    value: contextValue,
    children: children
  });
}
function useBootstrapPrefix(prefix, defaultPrefix) {
  const {
    prefixes
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(ThemeContext);
  return prefix || prefixes[defaultPrefix] || defaultPrefix;
}
function useBootstrapBreakpoints() {
  const {
    breakpoints
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(ThemeContext);
  return breakpoints;
}
function useBootstrapMinBreakpoint() {
  const {
    minBreakpoint
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(ThemeContext);
  return minBreakpoint;
}
function useIsRTL() {
  const {
    dir
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(ThemeContext);
  return dir === 'rtl';
}
function createBootstrapComponent(Component, opts) {
  if (typeof opts === 'string') opts = {
    prefix: opts
  };
  const isClassy = Component.prototype && Component.prototype.isReactComponent;
  // If it's a functional component make sure we don't break it with a ref
  const {
    prefix,
    forwardRefAs = isClassy ? 'ref' : 'innerRef'
  } = opts;
  const Wrapped = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["forwardRef"](({
    ...props
  }, ref) => {
    props[forwardRefAs] = ref;
    const bsPrefix = useBootstrapPrefix(props.bsPrefix, prefix);
    return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__["jsx"])(Component, {
      ...props,
      bsPrefix: bsPrefix
    });
  });
  Wrapped.displayName = `Bootstrap(${Component.displayName || Component.name})`;
  return Wrapped;
}

/* unused harmony default export */ var _unused_webpack_default_export = (ThemeProvider);

/***/ })

},[["2wU4",1,0,5,3,8,2,4,6]]]);