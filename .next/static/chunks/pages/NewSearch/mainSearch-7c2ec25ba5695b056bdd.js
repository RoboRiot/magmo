_N_E =
(window["webpackJsonp_N_E"] = window["webpackJsonp_N_E"] || []).push([[47],{

/***/ "ZptN":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "default", function() { return /* binding */ MainSearch; });

// EXTERNAL MODULE: ./node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__("cpVT");

// EXTERNAL MODULE: ./node_modules/next/node_modules/@babel/runtime/helpers/esm/toConsumableArray.js + 3 modules
var toConsumableArray = __webpack_require__("z7pX");

// EXTERNAL MODULE: ./node_modules/next/node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__("vJKn");
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);

// EXTERNAL MODULE: ./node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("rg98");

// EXTERNAL MODULE: ./node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray.js + 3 modules
var slicedToArray = __webpack_require__("xvhg");

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__("q1tI");
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/Pagination.js + 1 modules
var Pagination = __webpack_require__("zhAr");

// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/InputGroup.js + 1 modules
var InputGroup = __webpack_require__("zUrK");

// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/Dropdown.js + 70 modules
var Dropdown = __webpack_require__("97+O");

// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/Button.js
var Button = __webpack_require__("cWnB");

// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/Modal.js + 6 modules
var Modal = __webpack_require__("zM5D");

// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/FormControl.js
var FormControl = __webpack_require__("jDKy");

// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/Form.js + 11 modules
var Form = __webpack_require__("QojX");

// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/NavDropdown.js + 1 modules
var NavDropdown = __webpack_require__("GWEY");

// EXTERNAL MODULE: ./node_modules/react-bootstrap/node_modules/classnames/index.js
var classnames = __webpack_require__("eC2I");
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);

// EXTERNAL MODULE: ./node_modules/@restart/hooks/esm/useIsomorphicEffect.js
var useIsomorphicEffect = __webpack_require__("ccR7");

// CONCATENATED MODULE: ./node_modules/@restart/hooks/esm/useMediaQuery.js


const matchersByWindow = new WeakMap();
const getMatcher = (query, targetWindow) => {
  if (!query || !targetWindow) return undefined;
  const matchers = matchersByWindow.get(targetWindow) || new Map();
  matchersByWindow.set(targetWindow, matchers);
  let mql = matchers.get(query);
  if (!mql) {
    mql = targetWindow.matchMedia(query);
    mql.refCount = 0;
    matchers.set(mql.media, mql);
  }
  return mql;
};
/**
 * Match a media query and get updates as the match changes. The media string is
 * passed directly to `window.matchMedia` and run as a Layout Effect, so initial
 * matches are returned before the browser has a chance to paint.
 *
 * ```tsx
 * function Page() {
 *   const isWide = useMediaQuery('min-width: 1000px')
 *
 *   return isWide ? "very wide" : 'not so wide'
 * }
 * ```
 *
 * Media query lists are also reused globally, hook calls for the same query
 * will only create a matcher once under the hood.
 *
 * @param query A media query
 * @param targetWindow The window to match against, uses the globally available one as a default.
 */
function useMediaQuery(query, targetWindow = typeof window === 'undefined' ? undefined : window) {
  const mql = getMatcher(query, targetWindow);
  const [matches, setMatches] = Object(react["useState"])(() => mql ? mql.matches : false);
  Object(useIsomorphicEffect["a" /* default */])(() => {
    let mql = getMatcher(query, targetWindow);
    if (!mql) {
      return setMatches(false);
    }
    let matchers = matchersByWindow.get(targetWindow);
    const handleChange = () => {
      setMatches(mql.matches);
    };
    mql.refCount++;
    mql.addListener(handleChange);
    handleChange();
    return () => {
      mql.removeListener(handleChange);
      mql.refCount--;
      if (mql.refCount <= 0) {
        matchers == null ? void 0 : matchers.delete(mql.media);
      }
      mql = undefined;
    };
  }, [query]);
  return matches;
}
// CONCATENATED MODULE: ./node_modules/@restart/hooks/esm/useBreakpoint.js


/**
 * Create a responsive hook we a set of breakpoint names and widths.
 * You can use any valid css units as well as a numbers (for pixels).
 *
 * **NOTE:** The object key order is important! it's assumed to be in order from smallest to largest
 *
 * ```ts
 * const useBreakpoint = createBreakpointHook({
 *  xs: 0,
 *  sm: 576,
 *  md: 768,
 *  lg: 992,
 *  xl: 1200,
 * })
 * ```
 *
 * **Watch out!** using string values will sometimes construct media queries using css `calc()` which
 * is NOT supported in media queries by all browsers at the moment. use numbers for
 * the widest range of browser support.
 *
 * @param breakpointValues A object hash of names to breakpoint dimensions
 */
function createBreakpointHook(breakpointValues) {
  const names = Object.keys(breakpointValues);
  function and(query, next) {
    if (query === next) {
      return next;
    }
    return query ? `${query} and ${next}` : next;
  }
  function getNext(breakpoint) {
    return names[Math.min(names.indexOf(breakpoint) + 1, names.length - 1)];
  }
  function getMaxQuery(breakpoint) {
    const next = getNext(breakpoint);
    let value = breakpointValues[next];
    if (typeof value === 'number') value = `${value - 0.2}px`;else value = `calc(${value} - 0.2px)`;
    return `(max-width: ${value})`;
  }
  function getMinQuery(breakpoint) {
    let value = breakpointValues[breakpoint];
    if (typeof value === 'number') {
      value = `${value}px`;
    }
    return `(min-width: ${value})`;
  }

  /**
   * Match a set of breakpoints
   *
   * ```tsx
   * const MidSizeOnly = () => {
   *   const isMid = useBreakpoint({ lg: 'down', sm: 'up' });
   *
   *   if (isMid) return <div>On a Reasonable sized Screen!</div>
   *   return null;
   * }
   * ```
   * @param breakpointMap An object map of breakpoints and directions, queries are constructed using "and" to join
   * breakpoints together
   * @param window Optionally specify the target window to match against (useful when rendering into iframes)
   */

  /**
   * Match a single breakpoint exactly, up, or down.
   *
   * ```tsx
   * const PhoneOnly = () => {
   *   const isSmall = useBreakpoint('sm', 'down');
   *
   *   if (isSmall) return <div>On a Small Screen!</div>
   *   return null;
   * }
   * ```
   *
   * @param breakpoint The breakpoint key
   * @param direction A direction 'up' for a max, 'down' for min, true to match only the breakpoint
   * @param window Optionally specify the target window to match against (useful when rendering into iframes)
   */

  function useBreakpoint(breakpointOrMap, direction, window) {
    let breakpointMap;
    if (typeof breakpointOrMap === 'object') {
      breakpointMap = breakpointOrMap;
      window = direction;
      direction = true;
    } else {
      direction = direction || true;
      breakpointMap = {
        [breakpointOrMap]: direction
      };
    }
    let query = Object(react["useMemo"])(() => Object.entries(breakpointMap).reduce((query, [key, direction]) => {
      if (direction === 'up' || direction === true) {
        query = and(query, getMinQuery(key));
      }
      if (direction === 'down' || direction === true) {
        query = and(query, getMaxQuery(key));
      }
      return query;
    }, ''), [JSON.stringify(breakpointMap)]);
    return useMediaQuery(query, window);
  }
  return useBreakpoint;
}
const useBreakpoint_useBreakpoint = createBreakpointHook({
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400
});
/* harmony default export */ var esm_useBreakpoint = (useBreakpoint_useBreakpoint);
// EXTERNAL MODULE: ./node_modules/@restart/hooks/esm/useEventCallback.js
var useEventCallback = __webpack_require__("ZCiN");

// EXTERNAL MODULE: ./node_modules/@restart/ui/esm/Modal.js + 4 modules
var esm_Modal = __webpack_require__("UDM/");

// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/Fade.js
var Fade = __webpack_require__("7xGa");

// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/ThemeProvider.js
var ThemeProvider = __webpack_require__("vUet");

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__("nKUr");

// CONCATENATED MODULE: ./node_modules/react-bootstrap/esm/OffcanvasBody.js
"use client";





const OffcanvasBody = /*#__PURE__*/react["forwardRef"](({
  className,
  bsPrefix,
  as: Component = 'div',
  ...props
}, ref) => {
  bsPrefix = Object(ThemeProvider["e" /* useBootstrapPrefix */])(bsPrefix, 'offcanvas-body');
  return /*#__PURE__*/Object(jsx_runtime["jsx"])(Component, {
    ref: ref,
    className: classnames_default()(className, bsPrefix),
    ...props
  });
});
OffcanvasBody.displayName = 'OffcanvasBody';
/* harmony default export */ var esm_OffcanvasBody = (OffcanvasBody);
// EXTERNAL MODULE: ./node_modules/react-transition-group/esm/Transition.js + 3 modules
var Transition = __webpack_require__("dRu9");

// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/transitionEndListener.js
var transitionEndListener = __webpack_require__("wsUu");

// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/TransitionWrapper.js + 1 modules
var TransitionWrapper = __webpack_require__("ASpx");

// CONCATENATED MODULE: ./node_modules/react-bootstrap/esm/OffcanvasToggling.js
"use client";








const transitionStyles = {
  [Transition["b" /* ENTERING */]]: 'show',
  [Transition["a" /* ENTERED */]]: 'show'
};
const OffcanvasToggling = /*#__PURE__*/react["forwardRef"](({
  bsPrefix,
  className,
  children,
  in: inProp = false,
  mountOnEnter = false,
  unmountOnExit = false,
  appear = false,
  ...props
}, ref) => {
  bsPrefix = Object(ThemeProvider["e" /* useBootstrapPrefix */])(bsPrefix, 'offcanvas');
  return /*#__PURE__*/Object(jsx_runtime["jsx"])(TransitionWrapper["a" /* default */], {
    ref: ref,
    addEndListener: transitionEndListener["a" /* default */],
    in: inProp,
    mountOnEnter: mountOnEnter,
    unmountOnExit: unmountOnExit,
    appear: appear,
    ...props,
    childRef: children.ref,
    children: (status, innerProps) => /*#__PURE__*/react["cloneElement"](children, {
      ...innerProps,
      className: classnames_default()(className, children.props.className, (status === Transition["b" /* ENTERING */] || status === Transition["d" /* EXITING */]) && `${bsPrefix}-toggling`, transitionStyles[status])
    })
  });
});
OffcanvasToggling.displayName = 'OffcanvasToggling';
/* harmony default export */ var esm_OffcanvasToggling = (OffcanvasToggling);
// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/ModalContext.js
var ModalContext = __webpack_require__("7ihd");

// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/NavbarContext.js
var NavbarContext = __webpack_require__("qUpC");

// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/AbstractModalHeader.js
var AbstractModalHeader = __webpack_require__("56HL");

// CONCATENATED MODULE: ./node_modules/react-bootstrap/esm/OffcanvasHeader.js
"use client";






const OffcanvasHeader = /*#__PURE__*/react["forwardRef"](({
  bsPrefix,
  className,
  closeLabel = 'Close',
  closeButton = false,
  ...props
}, ref) => {
  bsPrefix = Object(ThemeProvider["e" /* useBootstrapPrefix */])(bsPrefix, 'offcanvas-header');
  return /*#__PURE__*/Object(jsx_runtime["jsx"])(AbstractModalHeader["a" /* default */], {
    ref: ref,
    ...props,
    className: classnames_default()(className, bsPrefix),
    closeLabel: closeLabel,
    closeButton: closeButton
  });
});
OffcanvasHeader.displayName = 'OffcanvasHeader';
/* harmony default export */ var esm_OffcanvasHeader = (OffcanvasHeader);
// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/divWithClassName.js
var divWithClassName = __webpack_require__("U1MP");

// CONCATENATED MODULE: ./node_modules/react-bootstrap/esm/OffcanvasTitle.js
"use client";






const DivStyledAsH5 = Object(divWithClassName["a" /* default */])('h5');
const OffcanvasTitle = /*#__PURE__*/react["forwardRef"](({
  className,
  bsPrefix,
  as: Component = DivStyledAsH5,
  ...props
}, ref) => {
  bsPrefix = Object(ThemeProvider["e" /* useBootstrapPrefix */])(bsPrefix, 'offcanvas-title');
  return /*#__PURE__*/Object(jsx_runtime["jsx"])(Component, {
    ref: ref,
    className: classnames_default()(className, bsPrefix),
    ...props
  });
});
OffcanvasTitle.displayName = 'OffcanvasTitle';
/* harmony default export */ var esm_OffcanvasTitle = (OffcanvasTitle);
// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/BootstrapModalManager.js + 3 modules
var BootstrapModalManager = __webpack_require__("auXL");

// CONCATENATED MODULE: ./node_modules/react-bootstrap/esm/Offcanvas.js
"use client";



















function DialogTransition(props) {
  return /*#__PURE__*/Object(jsx_runtime["jsx"])(esm_OffcanvasToggling, {
    ...props
  });
}
function BackdropTransition(props) {
  return /*#__PURE__*/Object(jsx_runtime["jsx"])(Fade["a" /* default */], {
    ...props
  });
}
const Offcanvas = /*#__PURE__*/react["forwardRef"](({
  bsPrefix,
  className,
  children,
  'aria-labelledby': ariaLabelledby,
  placement = 'start',
  responsive,
  /* BaseModal props */

  show = false,
  backdrop = true,
  keyboard = true,
  scroll = false,
  onEscapeKeyDown,
  onShow,
  onHide,
  container,
  autoFocus = true,
  enforceFocus = true,
  restoreFocus = true,
  restoreFocusOptions,
  onEntered,
  onExit,
  onExiting,
  onEnter,
  onEntering,
  onExited,
  backdropClassName,
  manager: propsManager,
  renderStaticNode = false,
  ...props
}, ref) => {
  const modalManager = Object(react["useRef"])();
  bsPrefix = Object(ThemeProvider["e" /* useBootstrapPrefix */])(bsPrefix, 'offcanvas');
  const {
    onToggle
  } = Object(react["useContext"])(NavbarContext["a" /* default */]) || {};
  const [showOffcanvas, setShowOffcanvas] = Object(react["useState"])(false);
  const hideResponsiveOffcanvas = esm_useBreakpoint(responsive || 'xs', 'up');
  Object(react["useEffect"])(() => {
    // Handles the case where screen is resized while the responsive
    // offcanvas is shown. If `responsive` not provided, just use `show`.
    setShowOffcanvas(responsive ? show && !hideResponsiveOffcanvas : show);
  }, [show, responsive, hideResponsiveOffcanvas]);
  const handleHide = Object(useEventCallback["a" /* default */])(() => {
    onToggle == null ? void 0 : onToggle();
    onHide == null ? void 0 : onHide();
  });
  const modalContext = Object(react["useMemo"])(() => ({
    onHide: handleHide
  }), [handleHide]);
  function getModalManager() {
    if (propsManager) return propsManager;
    if (scroll) {
      // Have to use a different modal manager since the shared
      // one handles overflow.
      if (!modalManager.current) modalManager.current = new BootstrapModalManager["a" /* default */]({
        handleContainerOverflow: false
      });
      return modalManager.current;
    }
    return Object(BootstrapModalManager["b" /* getSharedManager */])();
  }
  const handleEnter = (node, ...args) => {
    if (node) node.style.visibility = 'visible';
    onEnter == null ? void 0 : onEnter(node, ...args);
  };
  const handleExited = (node, ...args) => {
    if (node) node.style.visibility = '';
    onExited == null ? void 0 : onExited(...args);
  };
  const renderBackdrop = Object(react["useCallback"])(backdropProps => /*#__PURE__*/Object(jsx_runtime["jsx"])("div", {
    ...backdropProps,
    className: classnames_default()(`${bsPrefix}-backdrop`, backdropClassName)
  }), [backdropClassName, bsPrefix]);
  const renderDialog = dialogProps => /*#__PURE__*/Object(jsx_runtime["jsx"])("div", {
    ...dialogProps,
    ...props,
    className: classnames_default()(className, responsive ? `${bsPrefix}-${responsive}` : bsPrefix, `${bsPrefix}-${placement}`),
    "aria-labelledby": ariaLabelledby,
    children: children
  });
  return /*#__PURE__*/Object(jsx_runtime["jsxs"])(jsx_runtime["Fragment"], {
    children: [!showOffcanvas && (responsive || renderStaticNode) && renderDialog({}), /*#__PURE__*/Object(jsx_runtime["jsx"])(ModalContext["a" /* default */].Provider, {
      value: modalContext,
      children: /*#__PURE__*/Object(jsx_runtime["jsx"])(esm_Modal["a" /* default */], {
        show: showOffcanvas,
        ref: ref,
        backdrop: backdrop,
        container: container,
        keyboard: keyboard,
        autoFocus: autoFocus,
        enforceFocus: enforceFocus && !scroll,
        restoreFocus: restoreFocus,
        restoreFocusOptions: restoreFocusOptions,
        onEscapeKeyDown: onEscapeKeyDown,
        onShow: onShow,
        onHide: handleHide,
        onEnter: handleEnter,
        onEntering: onEntering,
        onEntered: onEntered,
        onExit: onExit,
        onExiting: onExiting,
        onExited: handleExited,
        manager: getModalManager(),
        transition: DialogTransition,
        backdropTransition: BackdropTransition,
        renderBackdrop: renderBackdrop,
        renderDialog: renderDialog
      })
    })]
  });
});
Offcanvas.displayName = 'Offcanvas';
/* harmony default export */ var esm_Offcanvas = (Object.assign(Offcanvas, {
  Body: esm_OffcanvasBody,
  Header: esm_OffcanvasHeader,
  Title: esm_OffcanvasTitle
}));
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__("YFqc");
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);

// EXTERNAL MODULE: ./node_modules/next/router.js
var next_router = __webpack_require__("20a2");

// EXTERNAL MODULE: ./utils/fetchAssociations.js
var fetchAssociations = __webpack_require__("qoNY");

// EXTERNAL MODULE: ./context/AuthUserContext.js + 1 modules
var AuthUserContext = __webpack_require__("XrFm");

// EXTERNAL MODULE: ./pages/LoggedIn.js
var LoggedIn = __webpack_require__("mJJZ");

// EXTERNAL MODULE: ./utils/ClientTable.js
var ClientTable = __webpack_require__("8HvV");

// EXTERNAL MODULE: ./utils/ModelTable.js
var ModelTable = __webpack_require__("TM8N");

// EXTERNAL MODULE: ./utils/PartTable.js
var PartTable = __webpack_require__("MSWM");

// EXTERNAL MODULE: ./styles/MainSearch.module.css
var MainSearch_module = __webpack_require__("Dktn");
var MainSearch_module_default = /*#__PURE__*/__webpack_require__.n(MainSearch_module);

// EXTERNAL MODULE: ./context/Firebase.js + 6 modules
var Firebase = __webpack_require__("NY6m");

// EXTERNAL MODULE: ./utils/itemFormShared.js
var itemFormShared = __webpack_require__("KWEF");

// EXTERNAL MODULE: ./components/WarehouseMapModal.js
var WarehouseMapModal = __webpack_require__("cmwG");

// CONCATENATED MODULE: ./pages/NewSearch/mainSearch.js





var __jsx = react_default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { Object(defineProperty["a" /* default */])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }














 // Predefined warehouse client IDs and display names

var SOCAL_CLIENT_ID = "AIS17182";
var NORCAL_CLIENT_ID = "AIS25097";
var UNASSIGNED_CLIENT_ID = "AIS00404";
var DEFAULT_PAGE_SIZE = 25; // Simulates a network request delay

function simulateNetworkRequest() {
  return new Promise(function (resolve) {
    return setTimeout(resolve, 2000);
  });
} // Custom LoadingButton component


function LoadingButton(_ref) {
  var type = _ref.type,
      name = _ref.name,
      route = _ref.route,
      className = _ref.className;

  var _useState = Object(react["useState"])(false),
      isLoading = _useState[0],
      setLoading = _useState[1];

  Object(react["useEffect"])(function () {
    if (isLoading) {
      var cancelled = false;
      simulateNetworkRequest().then(function () {
        if (!cancelled) setLoading(false);
      });
      return function () {
        cancelled = true;
      };
    }
  }, [isLoading]);
  return __jsx(link_default.a, {
    href: "/".concat(route)
  }, __jsx("a", {
    className: "btn btn-".concat(type, " ").concat(className || ""),
    disabled: isLoading,
    onClick: function onClick() {
      return !isLoading && setLoading(true);
    }
  }, isLoading ? "Loading..." : name));
} // ---- DATE HELPERS (top-level scope) ----
// Convert anything date-ish into a timestamp (ms since epoch).


function toTime(value) {
  if (!value) return null; // Firestore Timestamp { seconds, nanoseconds }

  if (typeof value === "object" && value !== null && value.seconds != null) {
    try {
      return value.seconds * 1000;
    } catch (_unused) {
      /* ignore */
    }
  } // Native Date


  if (value instanceof Date) {
    var _t = value.getTime();

    return isNaN(_t) ? null : _t;
  } // Strings


  if (typeof value === "string") {
    // ISO / yyyy-mm-dd
    var iso = Date.parse(value);
    if (!isNaN(iso)) return iso; // mm/dd/yyyy

    var parts = value.split("/");

    if (parts.length === 3) {
      var _parts = Object(slicedToArray["a" /* default */])(parts, 3),
          mm = _parts[0],
          dd = _parts[1],
          yyyy = _parts[2];

      var alt = Date.parse("".concat(yyyy, "-").concat(mm, "-").concat(dd));
      if (!isNaN(alt)) return alt;
    }
  } // Last resort


  var t = Date.parse(value);
  return isNaN(t) ? null : t;
} // Canonicalize to 'yyyy-mm-dd' (matches <input type="date">)


function toYMD(value) {
  var t = toTime(value);
  if (t == null) return null;
  var d = new Date(t);
  var yyyy = d.getFullYear();
  var mm = String(d.getMonth() + 1).padStart(2, "0");
  var dd = String(d.getDate()).padStart(2, "0");
  return "".concat(yyyy, "-").concat(mm, "-").concat(dd);
}

function normalizeText(value) {
  if (value == null) return "";
  return String(value).toLowerCase().trim();
}

function fieldMatchesSelection(value, selected) {
  if (!selected) return true;

  if (Array.isArray(value)) {
    return value.some(function (entry) {
      return fieldMatchesSelection(entry, selected);
    });
  }

  return normalizeText(value) === normalizeText(selected);
}

function getMachineField(item, key) {
  var _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _item$machineData$key, _item$machineData, _item$machineData2, _item$currentMachineD, _item$currentMachineD2, _item$theMachineData, _item$theMachineData2, _item$TheMachine, _item$TheMachine2;

  if (!item) return null;
  var lower = key.toLowerCase();
  return (_ref2 = (_ref3 = (_ref4 = (_ref5 = (_ref6 = (_ref7 = (_ref8 = (_item$machineData$key = item === null || item === void 0 ? void 0 : (_item$machineData = item.machineData) === null || _item$machineData === void 0 ? void 0 : _item$machineData[key]) !== null && _item$machineData$key !== void 0 ? _item$machineData$key : item === null || item === void 0 ? void 0 : (_item$machineData2 = item.machineData) === null || _item$machineData2 === void 0 ? void 0 : _item$machineData2[lower]) !== null && _ref8 !== void 0 ? _ref8 : item === null || item === void 0 ? void 0 : (_item$currentMachineD = item.currentMachineData) === null || _item$currentMachineD === void 0 ? void 0 : _item$currentMachineD[key]) !== null && _ref7 !== void 0 ? _ref7 : item === null || item === void 0 ? void 0 : (_item$currentMachineD2 = item.currentMachineData) === null || _item$currentMachineD2 === void 0 ? void 0 : _item$currentMachineD2[lower]) !== null && _ref6 !== void 0 ? _ref6 : item === null || item === void 0 ? void 0 : (_item$theMachineData = item.theMachineData) === null || _item$theMachineData === void 0 ? void 0 : _item$theMachineData[key]) !== null && _ref5 !== void 0 ? _ref5 : item === null || item === void 0 ? void 0 : (_item$theMachineData2 = item.theMachineData) === null || _item$theMachineData2 === void 0 ? void 0 : _item$theMachineData2[lower]) !== null && _ref4 !== void 0 ? _ref4 : item === null || item === void 0 ? void 0 : (_item$TheMachine = item.TheMachine) === null || _item$TheMachine === void 0 ? void 0 : _item$TheMachine[key]) !== null && _ref3 !== void 0 ? _ref3 : item === null || item === void 0 ? void 0 : (_item$TheMachine2 = item.TheMachine) === null || _item$TheMachine2 === void 0 ? void 0 : _item$TheMachine2[lower]) !== null && _ref2 !== void 0 ? _ref2 : null;
}

function MainSearch() {
  var _useAuth = Object(AuthUserContext["b" /* useAuth */])(),
      signOut = _useAuth.signOut;

  var _useState2 = Object(react["useState"])([]),
      info = _useState2[0],
      setInfo = _useState2[1];

  var _useState3 = Object(react["useState"])([]),
      backupInfo = _useState3[0],
      setBackupInfo = _useState3[1];

  var _useState4 = Object(react["useState"])([]),
      augmentedInfo = _useState4[0],
      setAugmentedInfo = _useState4[1]; // items with clientFromId/currentId added


  var _useState5 = Object(react["useState"])(true),
      isLoading = _useState5[0],
      setIsLoading = _useState5[1];

  var _useState6 = Object(react["useState"])([]),
      ids = _useState6[0],
      setID = _useState6[1];

  var _useState7 = Object(react["useState"])(false),
      show = _useState7[0],
      setShow = _useState7[1];

  var _useState8 = Object(react["useState"])(false),
      showFilters = _useState8[0],
      setShowFilters = _useState8[1];

  var _useState9 = Object(react["useState"])(DEFAULT_PAGE_SIZE),
      pageSize = _useState9[0],
      setPageSize = _useState9[1];

  var _useState10 = Object(react["useState"])(false),
      isNavigating = _useState10[0],
      setIsNavigating = _useState10[1];

  var _useState11 = Object(react["useState"])(),
      dItem = _useState11[0],
      setDItem = _useState11[1];

  var _useState12 = Object(react["useState"])("Name"),
      select = _useState12[0],
      setSelect = _useState12[1];

  var _useState13 = Object(react["useState"])(false),
      showList = _useState13[0],
      setShowList = _useState13[1];

  var _useState14 = Object(react["useState"])("text"),
      showListSearch = _useState14[0],
      setShowListSearch = _useState14[1];

  var _useState15 = Object(react["useState"])(""),
      search = _useState15[0],
      setSearch = _useState15[1];

  var _useState16 = Object(react["useState"])(null),
      selectedOEM = _useState16[0],
      setSelectedOEM = _useState16[1];

  var _useState17 = Object(react["useState"])(null),
      selectedModality = _useState17[0],
      setSelectedModality = _useState17[1]; // Replace the old single client state with two sets:


  var _useState18 = Object(react["useState"])(null),
      selectedClientFrom = _useState18[0],
      setSelectedClientFrom = _useState18[1];

  var _useState19 = Object(react["useState"])("Select Option"),
      clientFromButtonText = _useState19[0],
      setClientFromButtonText = _useState19[1];

  var _useState20 = Object(react["useState"])(null),
      selectedClientCurrent = _useState20[0],
      setSelectedClientCurrent = _useState20[1];

  var _useState21 = Object(react["useState"])("Select Option"),
      clientCurrentButtonText = _useState21[0],
      setClientCurrentButtonText = _useState21[1];

  var _useState22 = Object(react["useState"])([]),
      clients = _useState22[0],
      setClients = _useState22[1];

  var _useState23 = Object(react["useState"])(false),
      showClientModal = _useState23[0],
      setShowClientModal = _useState23[1]; // This state tells the modal which client box is being updated: "from" or "current"


  var _useState24 = Object(react["useState"])(null),
      clientSelectionType = _useState24[0],
      setClientSelectionType = _useState24[1];

  var _useState25 = Object(react["useState"])(false),
      showMap = _useState25[0],
      setShowMap = _useState25[1];

  var router = Object(next_router["useRouter"])();
  var labelBase = ["name", "date", "w/o", "p/n", "s/n"];
  var labelBaseNames = ["name", "date", "wo", "pn", "sn"];
  var sortCheckBase = [false, false, false, false, false, false];

  function withSortIcon(baseLabels, activeIndex, isDesc) {
    return baseLabels.map(function (text, i) {
      if (i !== activeIndex) return text; // untouched

      var arrow = isDesc ? " ▼" : " ▲";
      return "".concat(text).concat(arrow);
    });
  }

  var _useState26 = Object(react["useState"])(labelBase),
      labels = _useState26[0],
      setLabels = _useState26[1];

  var _useState27 = Object(react["useState"])(sortCheckBase),
      sortCheck = _useState27[0],
      setSortCheck = _useState27[1];

  var _useState28 = Object(react["useState"])(null),
      hoverIndex = _useState28[0],
      setHoverIndex = _useState28[1];

  var _useState29 = Object(react["useState"])(null),
      selectedModel = _useState29[0],
      setSelectedModel = _useState29[1];

  var _useState30 = Object(react["useState"])(null),
      gPos = _useState30[0],
      setGPos = _useState30[1];

  var _useState31 = Object(react["useState"])(null),
      gIde = _useState31[0],
      setGIde = _useState31[1];

  var _useState32 = Object(react["useState"])(false),
      isDeleting = _useState32[0],
      setIsDeleting = _useState32[1];

  var _useState33 = Object(react["useState"])(1),
      page = _useState33[0],
      setPage = _useState33[1];

  var _useState34 = Object(react["useState"])([]),
      pageCursors = _useState34[0],
      setPageCursors = _useState34[1];

  var _useState35 = Object(react["useState"])(false),
      hasNextPage = _useState35[0],
      setHasNextPage = _useState35[1];

  var fetchSeq = Object(react["useRef"])(0);
  var backfillInFlight = Object(react["useRef"])(false);

  var _useState36 = Object(react["useState"])(0),
      queryEpoch = _useState36[0],
      setQueryEpoch = _useState36[1];

  var _useState37 = Object(react["useState"])(null),
      loadError = _useState37[0],
      setLoadError = _useState37[1];

  var tableBodyRef = Object(react["useRef"])(null);
  var rowHeightRef = Object(react["useRef"])(46);
  var headerHeightRef = Object(react["useRef"])(38);
  var LOAD_TIMEOUT_MS = 30000;

  var openMap = function openMap() {
    return setShowMap(true);
  };

  var handleMapView = Object(react["useCallback"])(function () {
    var selection = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var params = new URLSearchParams();
    var region = selection.region,
        sectionLetter = selection.sectionLetter,
        sectionNumber = selection.sectionNumber,
        pallet = selection.pallet,
        bin = selection.bin;
    if (region) params.set("region", region);
    if (sectionLetter) params.set("sectionLetter", sectionLetter);
    if (sectionNumber) params.set("sectionNumber", sectionNumber);
    if (pallet) params.set("pallet", pallet);
    if (bin) params.set("bin", bin);
    var query = params.toString();
    router.push("/NewSearch/inventory/inventoryManage".concat(query ? "?".concat(query) : ""));
    setShowMap(false);
  }, [router]);
  var startNameTokenBackfill = Object(react["useCallback"])( /*#__PURE__*/Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee() {
    var reason,
        lastRun,
        db,
        lastDoc,
        tokensEqual,
        _loop,
        _ret,
        _args2 = arguments;

    return regenerator_default.a.wrap(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            reason = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : "";

            if (!backfillInFlight.current) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt("return");

          case 3:
            if (false) {}

            lastRun = window.localStorage.getItem("nameTokensBackfillAt");

            if (!(lastRun && Date.now() - Number(lastRun) < 24 * 60 * 60 * 1000)) {
              _context2.next = 7;
              break;
            }

            return _context2.abrupt("return");

          case 7:
            backfillInFlight.current = true;
            db = Firebase["b" /* default */].firestore();
            lastDoc = null;

            tokensEqual = function tokensEqual(a, b) {
              if (a.length !== b.length) return false;
              var setA = new Set(a);
              var setB = new Set(b);
              if (setA.size !== setB.size) return false;

              var _iterator = _createForOfIteratorHelper(setA),
                  _step;

              try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  var v = _step.value;
                  if (!setB.has(v)) return false;
                }
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }

              return true;
            };

            _context2.prev = 11;
            _loop = /*#__PURE__*/regenerator_default.a.mark(function _loop() {
              var query, snap, batch, writes;
              return regenerator_default.a.wrap(function _loop$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      query = db.collection("Test").orderBy(Firebase["b" /* default */].firestore.FieldPath.documentId()).limit(200);
                      if (lastDoc) query = query.startAfter(lastDoc);
                      _context.next = 4;
                      return query.get();

                    case 4:
                      snap = _context.sent;

                      if (!snap.empty) {
                        _context.next = 7;
                        break;
                      }

                      return _context.abrupt("return", "break");

                    case 7:
                      batch = db.batch();
                      writes = 0;
                      snap.docs.forEach(function (doc) {
                        var data = doc.data() || {};
                        var name = typeof data.name === "string" ? data.name : "";
                        var nameLower = name.toLowerCase();
                        var nameTokens = Object(itemFormShared["b" /* buildNameTokens */])(name);
                        var existingTokens = Array.isArray(data.nameTokens) ? Array.from(new Set(data.nameTokens.map(function (v) {
                          return String(v);
                        }))) : [];
                        var needsUpdate = data.nameLower !== nameLower || !tokensEqual(existingTokens, nameTokens);

                        if (needsUpdate) {
                          batch.update(doc.ref, {
                            nameLower: nameLower,
                            nameTokens: nameTokens
                          });
                          writes += 1;
                        }
                      });

                      if (!(writes > 0)) {
                        _context.next = 13;
                        break;
                      }

                      _context.next = 13;
                      return batch.commit();

                    case 13:
                      lastDoc = snap.docs[snap.docs.length - 1];
                      _context.next = 16;
                      return new Promise(function (resolve) {
                        return setTimeout(resolve, 25);
                      });

                    case 16:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _loop);
            });

          case 13:
            if (false) {}

            return _context2.delegateYield(_loop(), "t0", 15);

          case 15:
            _ret = _context2.t0;

            if (!(_ret === "break")) {
              _context2.next = 18;
              break;
            }

            return _context2.abrupt("break", 20);

          case 18:
            _context2.next = 13;
            break;

          case 20:
            if (true) {
              window.localStorage.setItem("nameTokensBackfillAt", String(Date.now()));
            }

            _context2.next = 26;
            break;

          case 23:
            _context2.prev = 23;
            _context2.t1 = _context2["catch"](11);
            console.error("Name token backfill failed:", reason, _context2.t1);

          case 26:
            _context2.prev = 26;
            backfillInFlight.current = false;
            return _context2.finish(26);

          case 29:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee, null, [[11, 23, 26, 29]]);
  })), []);
  var searchLower = (search || "").toLowerCase().trim();
  var hasActiveFilters = Boolean(selectedOEM) || Boolean(selectedModality) || Boolean(selectedModel) || Boolean(selectedClientFrom) || Boolean(selectedClientCurrent) || Boolean(searchLower);

  var valueMatches = function valueMatches(value, s) {
    if (!value) return false;

    if (Array.isArray(value)) {
      return value.some(function (v) {
        return valueMatches(v, s);
      });
    }

    return String(value).toLowerCase().includes(s);
  };

  var matchesFilters = Object(react["useCallback"])(function (item) {
    // hide explicitly hidden items
    if ((item === null || item === void 0 ? void 0 : item.visible) === false) return false; // OEM / Modality / Model filtering

    var OEM = getMachineField(item, "OEM");
    var Modality = getMachineField(item, "Modality");
    var Model = getMachineField(item, "Model");

    if (!fieldMatchesSelection(OEM, selectedOEM)) {
      return false;
    }

    if (!fieldMatchesSelection(Modality, selectedModality)) {
      return false;
    }

    if (!fieldMatchesSelection(Model, selectedModel)) {
      return false;
    } // Client filters


    if (selectedClientFrom && (item === null || item === void 0 ? void 0 : item.clientFromId) !== selectedClientFrom) {
      return false;
    }

    if (selectedClientCurrent && (item === null || item === void 0 ? void 0 : item.clientCurrentId) !== selectedClientCurrent) {
      return false;
    } // Search


    if (searchLower) {
      if (select === "Name") {
        return valueMatches(item === null || item === void 0 ? void 0 : item.name, searchLower);
      }

      if (select === "Date") {
        var wantedDay = searchLower; // yyyy-mm-dd from input

        var itemYMD = toYMD(item === null || item === void 0 ? void 0 : item.date);
        if (itemYMD && itemYMD === wantedDay) return true;

        if (Array.isArray(item === null || item === void 0 ? void 0 : item.descriptions)) {
          if (item.descriptions.some(function (d) {
            return toYMD(d === null || d === void 0 ? void 0 : d.date) === wantedDay;
          })) {
            return true;
          }
        }

        if (Array.isArray(item === null || item === void 0 ? void 0 : item.workOrders)) {
          if (item.workOrders.some(function (w) {
            return toYMD(w === null || w === void 0 ? void 0 : w.date) === wantedDay;
          })) {
            return true;
          }
        }

        return false;
      }

      if (select === "Work Order") {
        return Array.isArray(item === null || item === void 0 ? void 0 : item.workOrders) && item.workOrders.some(function (wo) {
          return valueMatches(wo === null || wo === void 0 ? void 0 : wo.workOrder, searchLower);
        });
      }

      if (select === "Product Number") {
        return valueMatches(item === null || item === void 0 ? void 0 : item.pn, searchLower);
      }

      if (select === "Serial Number") {
        return valueMatches(item === null || item === void 0 ? void 0 : item.sn, searchLower);
      }

      if (select === "Description") {
        if (valueMatches(item === null || item === void 0 ? void 0 : item.desc, searchLower)) return true;
        if (valueMatches(item === null || item === void 0 ? void 0 : item.description, searchLower)) return true;

        if (Array.isArray(item === null || item === void 0 ? void 0 : item.descriptions)) {
          return item.descriptions.some(function (d) {
            return valueMatches(d === null || d === void 0 ? void 0 : d.description, searchLower);
          });
        }

        return false;
      }

      if (select === "SKU") {
        return valueMatches(item === null || item === void 0 ? void 0 : item.id, searchLower) || valueMatches(item === null || item === void 0 ? void 0 : item.localSN, searchLower) || valueMatches(item === null || item === void 0 ? void 0 : item.local_sn, searchLower);
      }
    }

    return true;
  }, [selectedOEM, selectedModality, selectedModel, selectedClientFrom, selectedClientCurrent, searchLower, select]);

  var resetPagination = function resetPagination() {
    setPage(1);
    setPageCursors([]);
    setHasNextPage(false);
  }; // Reset pagination on route/query change (prevents stale pages like “starting at 6”)


  Object(react["useEffect"])(function () {
    resetPagination();
    setQueryEpoch(function (v) {
      return v + 1;
    });
  }, [router.asPath]); // Reset and refetch when filters/search change

  Object(react["useEffect"])(function () {
    resetPagination();
    setQueryEpoch(function (v) {
      return v + 1;
    });
  }, [selectedOEM, selectedModality, selectedModel, selectedClientFrom, selectedClientCurrent, search, select]); // Fetch data on component mount and route change

  Object(react["useEffect"])(function () {
    fetchData(page);
  }, [page, queryEpoch]);
  Object(react["useEffect"])(function () {
    if (!(router !== null && router !== void 0 && router.events)) return;

    var handleDone = function handleDone() {
      return setIsNavigating(false);
    };

    router.events.on("routeChangeComplete", handleDone);
    router.events.on("routeChangeError", handleDone);
    return function () {
      router.events.off("routeChangeComplete", handleDone);
      router.events.off("routeChangeError", handleDone);
    };
  }, [router]);

  function fetchData() {
    return _fetchData.apply(this, arguments);
  }

  function _fetchData() {
    _fetchData = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee9() {
      var requestedPage,
          seq,
          timedOut,
          timeoutId,
          startAfterDoc,
          effectiveSelect,
          effectiveSearch,
          effectiveSearchLower,
          load,
          _yield$load,
          data,
          lastDoc,
          nextPage,
          hasNameSearch,
          augmented,
          code,
          _args10 = arguments;

      return regenerator_default.a.wrap(function _callee9$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              requestedPage = _args10.length > 0 && _args10[0] !== undefined ? _args10[0] : 1;
              seq = ++fetchSeq.current;
              timedOut = false;
              setIsLoading(true);
              setLoadError(null);
              timeoutId = setTimeout(function () {
                timedOut = true;

                if (seq === fetchSeq.current) {
                  setLoadError({
                    code: "timeout",
                    message: "Loading is taking longer than ".concat(Math.round(LOAD_TIMEOUT_MS / 1000), "s. This is likely due to very selective filters.")
                  });
                  setIsLoading(false);
                }
              }, LOAD_TIMEOUT_MS);
              _context10.prev = 6;

              if (router.query.inputText && router.query.selectedType) {
                setSelect(router.query.selectedType);
                setSearch(router.query.inputText);
              }

              startAfterDoc = requestedPage > 1 ? pageCursors[requestedPage - 2] : null;

              if (!(requestedPage > 1 && !startAfterDoc)) {
                _context10.next = 13;
                break;
              }

              setPage(1);

              if (seq === fetchSeq.current) {
                clearTimeout(timeoutId);
                setIsLoading(false);
              }

              return _context10.abrupt("return");

            case 13:
              effectiveSelect = router.query.selectedType || select;
              effectiveSearch = router.query.inputText || search;
              effectiveSearchLower = (effectiveSearch || "").toLowerCase().trim(); // light retry for transient Firestore hiccups

              load = /*#__PURE__*/function () {
                var _ref16 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee8() {
                  var attempt,
                      _args9 = arguments;
                  return regenerator_default.a.wrap(function _callee8$(_context9) {
                    while (1) {
                      switch (_context9.prev = _context9.next) {
                        case 0:
                          attempt = _args9.length > 0 && _args9[0] !== undefined ? _args9[0] : 1;
                          _context9.prev = 1;
                          _context9.next = 4;
                          return Object(fetchAssociations["d" /* fetchPartsWithMachineDataPage */])({
                            pageSize: pageSize,
                            startAfterDoc: startAfterDoc,
                            visibleOnly: true,
                            filterFn: hasActiveFilters ? matchesFilters : null,
                            search: effectiveSearchLower ? {
                              type: effectiveSelect,
                              raw: effectiveSearch,
                              lower: effectiveSearchLower
                            } : null,
                            needsMachineData: Boolean(selectedOEM) || Boolean(selectedModality) || Boolean(selectedModel) || Boolean(selectedClientFrom) || Boolean(selectedClientCurrent)
                          });

                        case 4:
                          return _context9.abrupt("return", _context9.sent);

                        case 7:
                          _context9.prev = 7;
                          _context9.t0 = _context9["catch"](1);

                          if (!(attempt >= 3)) {
                            _context9.next = 11;
                            break;
                          }

                          throw _context9.t0;

                        case 11:
                          _context9.next = 13;
                          return new Promise(function (r) {
                            return setTimeout(r, 250 * Math.pow(2, attempt - 1));
                          });

                        case 13:
                          return _context9.abrupt("return", load(attempt + 1));

                        case 14:
                        case "end":
                          return _context9.stop();
                      }
                    }
                  }, _callee8, null, [[1, 7]]);
                }));

                return function load() {
                  return _ref16.apply(this, arguments);
                };
              }();

              _context10.next = 19;
              return load();

            case 19:
              _yield$load = _context10.sent;
              data = _yield$load.parts;
              lastDoc = _yield$load.lastDoc;
              nextPage = _yield$load.hasNextPage;

              if (!(timedOut || seq !== fetchSeq.current)) {
                _context10.next = 25;
                break;
              }

              return _context10.abrupt("return");

            case 25:
              hasNameSearch = Boolean(effectiveSearchLower) && effectiveSelect === "Name";

              if (hasNameSearch && (data.length === 0 || data.some(function (item) {
                return !Array.isArray(item === null || item === void 0 ? void 0 : item.nameTokens) || item.nameTokens.length === 0;
              }))) {
                startNameTokenBackfill("name-search");
              }

              if (requestedPage === 1 && data.length === 0) {
                setPageCursors([]);
                setHasNextPage(false);
              }

              setBackupInfo(data);
              setLabels(labelBase); // <-- add this line after setBackupInfo(data)

              setID(data.map(function (item) {
                return item.id;
              }));

              if (!(requestedPage > 1 && data.length === 0)) {
                _context10.next = 35;
                break;
              }

              setHasNextPage(false);
              setPage(1);
              return _context10.abrupt("return");

            case 35:
              setHasNextPage(nextPage);
              setPageCursors(function (prev) {
                var next = requestedPage === 1 ? [] : Object(toConsumableArray["a" /* default */])(prev);

                if (lastDoc) {
                  next[requestedPage - 1] = lastDoc;
                }

                return next;
              });
              setSelectedItems([]); // Normalize client ids for filtering

              augmented = data.map(function (item) {
                var _ref17, _ref18, _item$clientFromId, _item$ClientFrom, _ref19, _ref20, _item$clientCurrentId, _item$ClientCurrent;

                return _objectSpread(_objectSpread({}, item), {}, {
                  clientFromId: (_ref17 = (_ref18 = (_item$clientFromId = item === null || item === void 0 ? void 0 : item.clientFromId) !== null && _item$clientFromId !== void 0 ? _item$clientFromId : typeof (item === null || item === void 0 ? void 0 : item.ClientFrom) === "string" ? item.ClientFrom : null) !== null && _ref18 !== void 0 ? _ref18 : item === null || item === void 0 ? void 0 : (_item$ClientFrom = item.ClientFrom) === null || _item$ClientFrom === void 0 ? void 0 : _item$ClientFrom.id) !== null && _ref17 !== void 0 ? _ref17 : null,
                  clientCurrentId: (_ref19 = (_ref20 = (_item$clientCurrentId = item === null || item === void 0 ? void 0 : item.clientCurrentId) !== null && _item$clientCurrentId !== void 0 ? _item$clientCurrentId : typeof (item === null || item === void 0 ? void 0 : item.ClientCurrent) === "string" ? item.ClientCurrent : null) !== null && _ref20 !== void 0 ? _ref20 : item === null || item === void 0 ? void 0 : (_item$ClientCurrent = item.ClientCurrent) === null || _item$ClientCurrent === void 0 ? void 0 : _item$ClientCurrent.id) !== null && _ref19 !== void 0 ? _ref19 : null
                });
              });
              setAugmentedInfo(augmented); // default view = filtered (keeps pagination and filters consistent)

              setInfo(augmented.filter(matchesFilters));
              _context10.next = 52;
              break;

            case 43:
              _context10.prev = 43;
              _context10.t0 = _context10["catch"](6);

              if (!(seq !== fetchSeq.current)) {
                _context10.next = 47;
                break;
              }

              return _context10.abrupt("return");

            case 47:
              console.error("Error fetching data:", _context10.t0);
              code = (_context10.t0 === null || _context10.t0 === void 0 ? void 0 : _context10.t0.code) || "unknown";
              setLoadError({
                code: code,
                message: (_context10.t0 === null || _context10.t0 === void 0 ? void 0 : _context10.t0.message) || "Failed to load items."
              });
              setInfo([]);
              setAugmentedInfo([]);

            case 52:
              _context10.prev = 52;
              clearTimeout(timeoutId);
              if (seq === fetchSeq.current && !timedOut) setIsLoading(false);
              return _context10.finish(52);

            case 56:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee9, null, [[6, 43, 52, 56]]);
    }));
    return _fetchData.apply(this, arguments);
  }

  var searchChangeHandler = function searchChangeHandler(event) {
    return setSearch(event.target.value);
  }; // Filter the currently loaded items (now consistent with paged filtering)


  Object(react["useEffect"])(function () {
    var base = augmentedInfo || [];
    setInfo(base.filter(matchesFilters));
  }, [augmentedInfo, matchesFilters]);

  function sortCheckAll(pos) {
    // Determine next direction: toggle the clicked column only
    var nextSortCheck = sortCheck.map(function (v, i) {
      return i === pos ? !v : v;
    });
    var isDesc = nextSortCheck[pos]; // true means descending

    var sortedInfo = Object(toConsumableArray["a" /* default */])(info).sort(function (a, b) {
      var key = labelBaseNames[pos];

      if (pos === 1) {
        // DATE column
        var ta = toTime(a[key]);
        var tb = toTime(b[key]); // Put missing dates at the end for ascending, at the start for descending

        if (ta === null && tb === null) return 0;
        if (ta === null) return isDesc ? -1 : 1;
        if (tb === null) return isDesc ? 1 : -1;
        return isDesc ? tb - ta : ta - tb;
      } // NAME or SKU (string-y columns): indexes 0 or 5 in your original logic


      if (pos === 0 || pos === 5) {
        var _a$key, _b$key;

        var av = ((_a$key = a[key]) !== null && _a$key !== void 0 ? _a$key : "").toString();
        var bv = ((_b$key = b[key]) !== null && _b$key !== void 0 ? _b$key : "").toString();
        return isDesc ? bv.localeCompare(av) : av.localeCompare(bv);
      } // Numeric-ish columns (wo, pn, sn) — fall back to string compare if NaN


      var an = Number(a[key]);
      var bn = Number(b[key]);

      if (!isNaN(an) && !isNaN(bn)) {
        return isDesc ? bn - an : an - bn;
      } else {
        var _a$key2, _b$key2;

        var _av = ((_a$key2 = a[key]) !== null && _a$key2 !== void 0 ? _a$key2 : "").toString();

        var _bv = ((_b$key2 = b[key]) !== null && _b$key2 !== void 0 ? _b$key2 : "").toString();

        return isDesc ? _bv.localeCompare(_av) : _av.localeCompare(_bv);
      }
    });

    setInfo(sortedInfo);
    setSortCheck(nextSortCheck); // Update header labels to show the little arrow on the active column

    setLabels(withSortIcon(labelBase, pos, isDesc));
  }

  var rowSelect = function rowSelect(item) {
    if (item && item.id) {
      console.log("Selected item:", item);
      setIsNavigating(true);
      router.push("./item/" + item.id);
    } else {
      console.error("Unable to determine the selected item’s ID: ", item);
    }
  };

  var _useState38 = Object(react["useState"])([]),
      selectedItems = _useState38[0],
      setSelectedItems = _useState38[1];

  var _useState39 = Object(react["useState"])(false),
      showDeleteModal = _useState39[0],
      setShowDeleteModal = _useState39[1];

  var handleSelectItem = function handleSelectItem(id) {
    setSelectedItems(function (prev) {
      return prev.includes(id) ? prev.filter(function (x) {
        return x !== id;
      }) : [].concat(Object(toConsumableArray["a" /* default */])(prev), [id]);
    });
  }; // setSelectedItems((prev) => {
  //   const newSelection = prev.includes(id)
  //     ? prev.filter((itemId) => itemId !== id)
  //     : [...prev, id];
  //   console.log("Selected items:", newSelection);
  //   return newSelection; // <- important
  // });


  var handleShowDeleteModal = function handleShowDeleteModal() {
    return setShowDeleteModal(true);
  };

  var handleCloseDeleteModal = function handleCloseDeleteModal() {
    return setShowDeleteModal(false);
  };

  var handleDeleteSelected = /*#__PURE__*/function () {
    var _ref10 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee2() {
      var db, _iterator2, _step2, itemId;

      return regenerator_default.a.wrap(function _callee2$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              setIsDeleting(true);
              db = Firebase["b" /* default */].firestore();
              _context3.prev = 2;
              // Loop over each selected item one at a time
              _iterator2 = _createForOfIteratorHelper(selectedItems);
              _context3.prev = 4;

              _iterator2.s();

            case 6:
              if ((_step2 = _iterator2.n()).done) {
                _context3.next = 35;
                break;
              }

              itemId = _step2.value;
              console.log(itemId);
              _context3.prev = 9;
              _context3.next = 12;
              return db.collection("Test").doc(itemId)["delete"]();

            case 12:
              _context3.next = 17;
              break;

            case 14:
              _context3.prev = 14;
              _context3.t0 = _context3["catch"](9);
              console.error("Error deleting document ".concat(itemId, " from Test:"), _context3.t0);

            case 17:
              _context3.prev = 17;
              _context3.next = 20;
              return db.collection("Parts").doc(itemId)["delete"]();

            case 20:
              _context3.next = 25;
              break;

            case 22:
              _context3.prev = 22;
              _context3.t1 = _context3["catch"](17);
              console.error("Error deleting document ".concat(itemId, " from Parts:"), _context3.t1);

            case 25:
              _context3.prev = 25;
              _context3.next = 28;
              return deleteFromStorage(itemId);

            case 28:
              _context3.next = 33;
              break;

            case 30:
              _context3.prev = 30;
              _context3.t2 = _context3["catch"](25);
              console.error("Error deleting storage for ".concat(itemId, ":"), _context3.t2);

            case 33:
              _context3.next = 6;
              break;

            case 35:
              _context3.next = 40;
              break;

            case 37:
              _context3.prev = 37;
              _context3.t3 = _context3["catch"](4);

              _iterator2.e(_context3.t3);

            case 40:
              _context3.prev = 40;

              _iterator2.f();

              return _context3.finish(40);

            case 43:
              // Update local state by filtering out the deleted items
              setInfo(info.filter(function (item) {
                return !selectedItems.includes(item.id);
              }));
              setSelectedItems([]);
              _context3.next = 50;
              break;

            case 47:
              _context3.prev = 47;
              _context3.t4 = _context3["catch"](2);
              console.error("Error deleting items:", _context3.t4);

            case 50:
              _context3.prev = 50;
              setIsDeleting(false);
              handleCloseDeleteModal(); // Optionally, reload the page
              // router.reload();

              return _context3.finish(50);

            case 54:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee2, null, [[2, 47, 50, 54], [4, 37, 40, 43], [9, 14], [17, 22], [25, 30]]);
    }));

    return function handleDeleteSelected() {
      return _ref10.apply(this, arguments);
    };
  }();

  var handleClose = function handleClose() {
    return setShow(false);
  };

  var handleShow = function handleShow() {
    return setShow(true);
  };

  var checkDelete = function checkDelete(event, pos, idsToDelete, name) {
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


  var hoverStyle = function hoverStyle(index) {
    return {
      backgroundColor: hoverIndex === index ? "#ddd" : "transparent",
      textAlign: "center",
      cursor: "default"
    };
  };

  var _useState40 = Object(react["useState"])("Select Option"),
      dropdown1Text = _useState40[0],
      setDropdown1Text = _useState40[1];

  var _useState41 = Object(react["useState"])("Select Option"),
      dropdown2Text = _useState41[0],
      setDropdown2Text = _useState41[1];

  var handleSelect1 = function handleSelect1(eventKey, event) {
    if (eventKey === "unassigned") {
      setDropdown1Text("Select Option");
      setSelectedOEM(null);
    } else {
      setDropdown1Text(event.target.textContent);
      setSelectedOEM(event.target.textContent);
    }
  };

  var handleSelect2 = function handleSelect2(eventKey, event) {
    if (eventKey === "unassigned") {
      setDropdown2Text("Select Option");
      setSelectedModality(null);
    } else {
      setDropdown2Text(event.target.textContent);
      setSelectedModality(event.target.textContent);
    }
  }; // Build a unique list of clients from the items currently loaded, filtered by OEM/Modality.
  // `type` is "from" or "current" to decide which client ref to read.


  function buildClientsFromItems(_x) {
    return _buildClientsFromItems.apply(this, arguments);
  } // --------------------
  // CLIENT SELECTION HANDLING
  // --------------------
  // This function fetches clients and opens the client modal.


  function _buildClientsFromItems() {
    _buildClientsFromItems = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee10(type) {
      var db, ids, filtered, _iterator3, _step3, it, id, out, idArray, i, chunk, snap;

      return regenerator_default.a.wrap(function _callee10$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              db = Firebase["b" /* default */].firestore();
              ids = new Set(); // Respect current OEM / Modality filters when deriving client options

              filtered = augmentedInfo.filter(function (item) {
                var OEM = getMachineField(item, "OEM");
                var Modality = getMachineField(item, "Modality");

                if (!fieldMatchesSelection(OEM, selectedOEM)) {
                  return false;
                }

                if (!fieldMatchesSelection(Modality, selectedModality)) {
                  return false;
                }

                return true;
              });
              _iterator3 = _createForOfIteratorHelper(filtered);

              try {
                for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                  it = _step3.value;
                  id = type === "from" ? it.clientFromId : it.clientCurrentId;
                  if (id) ids.add(id);
                }
              } catch (err) {
                _iterator3.e(err);
              } finally {
                _iterator3.f();
              }

              out = [];
              idArray = Object(toConsumableArray["a" /* default */])(ids);
              i = 0;

            case 8:
              if (!(i < idArray.length)) {
                _context11.next = 17;
                break;
              }

              chunk = idArray.slice(i, i + 10);
              _context11.next = 12;
              return db.collection("Client").where(Firebase["b" /* default */].firestore.FieldPath.documentId(), "in", chunk).get();

            case 12:
              snap = _context11.sent;
              snap.forEach(function (doc) {
                var d = doc.data() || {};
                out.push({
                  id: doc.id,
                  name: d.name || doc.id
                });
              });

            case 14:
              i += 10;
              _context11.next = 8;
              break;

            case 17:
              // sort by name for nicer UX
              out.sort(function (a, b) {
                return (a.name || "").localeCompare(b.name || "");
              });
              return _context11.abrupt("return", out);

            case 19:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee10);
    }));
    return _buildClientsFromItems.apply(this, arguments);
  }

  var handleClientClick = /*#__PURE__*/function () {
    var _ref11 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee3() {
      var safeClients, clientsData, derived;
      return regenerator_default.a.wrap(function _callee3$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              safeClients = [];
              _context4.prev = 1;
              _context4.next = 4;
              return Object(fetchAssociations["a" /* fetchClients */])(selectedOEM, selectedModality);

            case 4:
              clientsData = _context4.sent;
              safeClients = Array.isArray(clientsData) ? clientsData : [];
              _context4.next = 11;
              break;

            case 8:
              _context4.prev = 8;
              _context4.t0 = _context4["catch"](1);
              console.error("fetchClients failed:", _context4.t0);

            case 11:
              if (!(safeClients.length === 0)) {
                _context4.next = 24;
                break;
              }

              _context4.prev = 12;

              if (!clientSelectionType) {
                // if somehow not set yet, default to "from"
                setClientSelectionType("from");
              }

              _context4.next = 16;
              return buildClientsFromItems(clientSelectionType || "from");

            case 16:
              derived = _context4.sent;
              safeClients = derived;
              _context4.next = 24;
              break;

            case 20:
              _context4.prev = 20;
              _context4.t1 = _context4["catch"](12);
              console.error("Fallback buildClientsFromItems failed:", _context4.t1);
              safeClients = [];

            case 24:
              setClients(safeClients);
              setClientSearchTerm("");
              setShowClientModal(true);

            case 27:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee3, null, [[1, 8], [12, 20]]);
    }));

    return function handleClientClick() {
      return _ref11.apply(this, arguments);
    };
  }(); // When a client is selected in the modal, we now assume the parameter is a client ID.
  // If the passed value is null, we clear the selection.


  var handleClientSelect = /*#__PURE__*/function () {
    var _ref12 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee4(clientId) {
      var clientSnap, clientData;
      return regenerator_default.a.wrap(function _callee4$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              console.log("User selected client id:", clientId);

              if (clientId) {
                _context5.next = 5;
                break;
              }

              if (clientSelectionType === "from") {
                setClientFromButtonText("Select Option");
                setSelectedClientFrom(null);
              } else if (clientSelectionType === "current") {
                setClientCurrentButtonText("Select Option");
                setSelectedClientCurrent(null);
              }

              setShowClientModal(false);
              return _context5.abrupt("return");

            case 5:
              _context5.prev = 5;
              _context5.next = 8;
              return Firebase["b" /* default */].firestore().collection("Client").doc(clientId).get();

            case 8:
              clientSnap = _context5.sent;

              if (clientSnap.exists) {
                clientData = clientSnap.data();

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

              _context5.next = 15;
              break;

            case 12:
              _context5.prev = 12;
              _context5.t0 = _context5["catch"](5);
              console.error("Error fetching client data:", _context5.t0);

            case 15:
              setShowClientModal(false);

            case 16:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee4, null, [[5, 12]]);
    }));

    return function handleClientSelect(_x2) {
      return _ref12.apply(this, arguments);
    };
  }();

  var handleClientInfo = function handleClientInfo(clientId, clientName) {
    console.log("Client ID: ".concat(clientId, ", Client Name: ").concat(clientName));
    router.push("client/" + clientId);
  };

  var handleClearClientSelection = function handleClearClientSelection() {
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


  var _useState42 = Object(react["useState"])([]),
      models = _useState42[0],
      setModels = _useState42[1];

  var _useState43 = Object(react["useState"])(false),
      showModelModal = _useState43[0],
      setShowModelModal = _useState43[1];

  var _useState44 = Object(react["useState"])("Select Option"),
      modelButtonText = _useState44[0],
      setModelButtonText = _useState44[1];

  var handleModelClick = /*#__PURE__*/function () {
    var _ref13 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee5() {
      var modelsData;
      return regenerator_default.a.wrap(function _callee5$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return Object(fetchAssociations["b" /* fetchModels */])(selectedOEM, selectedModality, selectedClientFrom);

            case 2:
              modelsData = _context6.sent;
              setModels(modelsData);
              setModelSearchTerm("");
              setShowModelModal(true);

            case 6:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee5);
    }));

    return function handleModelClick() {
      return _ref13.apply(this, arguments);
    };
  }();

  var handleModelSelect = function handleModelSelect(modelName) {
    setModelButtonText(modelName || "Select Option");
    setSelectedModel(modelName || null);
    setShowModelModal(false);
  };

  var handleClearModelSelection = function handleClearModelSelection() {
    setModelButtonText("Select Option");
    setSelectedModel(null);
    setShowModelModal(false);
  }; // --------------------
  // WAREHOUSE BUTTONS (for Client Current)
  // --------------------


  var handleSoCalWarehouseClick = function handleSoCalWarehouseClick() {
    setClientCurrentButtonText("SoCal Warehouse");
    setSelectedClientCurrent(SOCAL_CLIENT_ID);
    console.log("Warehouse button clicked: setting Client Current to", SOCAL_CLIENT_ID);
  };

  var handleNorCalWarehouseClick = function handleNorCalWarehouseClick() {
    setClientCurrentButtonText("NorCal Warehouse");
    setSelectedClientCurrent(NORCAL_CLIENT_ID);
    console.log("Warehouse button clicked: setting Client Current to", NORCAL_CLIENT_ID);
  };

  var handleWarehouseUnassignedClick = function handleWarehouseUnassignedClick() {
    setClientCurrentButtonText("Unassigned");
    setSelectedClientCurrent(UNASSIGNED_CLIENT_ID);
    console.log("Warehouse button clicked: setting Client Current to", UNASSIGNED_CLIENT_ID);
  };

  var _useState45 = Object(react["useState"])(""),
      clientSearchTerm = _useState45[0],
      setClientSearchTerm = _useState45[1];

  var _useState46 = Object(react["useState"])(""),
      modelSearchTerm = _useState46[0],
      setModelSearchTerm = _useState46[1];

  var deleteFromStorage = /*#__PURE__*/function () {
    var _ref14 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee6(itemId) {
      var storageRef, folderRef, listResult, deletePromises;
      return regenerator_default.a.wrap(function _callee6$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              storageRef = Firebase["b" /* default */].storage().ref();
              folderRef = storageRef.child("Parts/".concat(itemId, "/"));
              _context7.prev = 2;
              _context7.next = 5;
              return folderRef.listAll();

            case 5:
              listResult = _context7.sent;
              deletePromises = listResult.items.map(function (item) {
                return item["delete"]();
              });
              _context7.next = 9;
              return Promise.all(deletePromises);

            case 9:
              _context7.next = 14;
              break;

            case 11:
              _context7.prev = 11;
              _context7.t0 = _context7["catch"](2);
              console.error("Error deleting from storage:", _context7.t0);

            case 14:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee6, null, [[2, 11]]);
    }));

    return function deleteFromStorage(_x3) {
      return _ref14.apply(this, arguments);
    };
  }();

  var deleteFromPartsCollection = /*#__PURE__*/function () {
    var _ref15 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee7(itemId) {
      var db;
      return regenerator_default.a.wrap(function _callee7$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              db = Firebase["b" /* default */].firestore();
              _context8.prev = 1;
              _context8.next = 4;
              return db.collection("Parts").doc(itemId)["delete"]();

            case 4:
              console.log("Deleted item from Parts collection: ".concat(itemId));
              _context8.next = 10;
              break;

            case 7:
              _context8.prev = 7;
              _context8.t0 = _context8["catch"](1);
              console.error("Error deleting from Parts collection:", _context8.t0);

            case 10:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee7, null, [[1, 7]]);
    }));

    return function deleteFromPartsCollection(_x4) {
      return _ref15.apply(this, arguments);
    };
  }(); //   // Safely convert any date-ish value into a comparable timestamp (ms since epoch).
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


  var totalKnownPages = Math.max(1, pageCursors.filter(Boolean).length + (hasNextPage ? 1 : 0));

  var pageButtons = function () {
    var buttons = [];
    var maxVisible = 7;

    var pushPage = function pushPage(p) {
      return buttons.push(__jsx(Pagination["a" /* default */].Item, {
        key: "page-".concat(p),
        active: p === page,
        onClick: function onClick() {
          return setPage(p);
        }
      }, p));
    };

    var pushEllipsis = function pushEllipsis(key) {
      return buttons.push(__jsx(Pagination["a" /* default */].Ellipsis, {
        key: key,
        disabled: true
      }));
    };

    if (totalKnownPages <= maxVisible) {
      for (var i = 1; i <= totalKnownPages; i += 1) {
        pushPage(i);
      }

      return buttons;
    }

    var start = Math.max(2, page - 1);
    var end = Math.min(totalKnownPages - 1, page + 1);
    var desiredWindow = maxVisible - 2;
    var currentWindow = end - start + 1;
    var remaining = desiredWindow - currentWindow;

    while (remaining > 0) {
      if (start > 2) {
        start -= 1;
        remaining -= 1;
      }

      if (remaining > 0 && end < totalKnownPages - 1) {
        end += 1;
        remaining -= 1;
      }

      if (start === 2 && end === totalKnownPages - 1) break;
    }

    pushPage(1);
    if (start > 2) pushEllipsis("start-ellipsis");

    for (var _i = start; _i <= end; _i += 1) {
      pushPage(_i);
    }

    if (end < totalKnownPages - 1) pushEllipsis("end-ellipsis");
    pushPage(totalKnownPages);
    if (hasNextPage) pushEllipsis("more-ellipsis");
    return buttons;
  }();

  var recalcPageSize = Object(react["useCallback"])(function () {
    if (false) {}
    if (page !== 1) return;
    if (!tableBodyRef.current) return;
    var containerHeight = tableBodyRef.current.getBoundingClientRect().height || 0;
    if (!containerHeight) return;
    var headerRow = tableBodyRef.current.querySelector("table thead tr") || tableBodyRef.current.querySelector("thead tr");
    var bodyRow = tableBodyRef.current.querySelector("table tbody tr") || tableBodyRef.current.querySelector("tbody tr");

    if (headerRow) {
      var h = headerRow.getBoundingClientRect().height;
      if (h) headerHeightRef.current = h;
    }

    if (bodyRow) {
      var r = bodyRow.getBoundingClientRect().height;
      if (r) rowHeightRef.current = r;
    }

    var verticalPadding = 24;
    var available = containerHeight - headerHeightRef.current - verticalPadding;
    var estimated = Math.floor(available / rowHeightRef.current);
    var clamped = Math.max(5, Math.min(50, estimated));

    if (clamped > 0 && clamped !== pageSize) {
      setPageSize(clamped);
      resetPagination();
      setQueryEpoch(function (v) {
        return v + 1;
      });
    }
  }, [page, pageSize]);
  Object(react["useEffect"])(function () {
    if (false) {}
    recalcPageSize();

    var onResize = function onResize() {
      return recalcPageSize();
    };

    window.addEventListener("resize", onResize);
    return function () {
      return window.removeEventListener("resize", onResize);
    };
  }, [recalcPageSize]);
  Object(react["useEffect"])(function () {
    if (isLoading || page !== 1) return;
    recalcPageSize();
  }, [page, isLoading, recalcPageSize]);

  var renderFilters = function renderFilters(idPrefix) {
    return __jsx("div", {
      className: MainSearch_module_default.a.filtersPanel
    }, __jsx("div", {
      className: MainSearch_module_default.a.filtersHeader
    }, __jsx("div", null, __jsx("div", {
      className: MainSearch_module_default.a.filtersTitle
    }, "Filters"), __jsx("div", {
      className: MainSearch_module_default.a.filtersSubtitle
    }, "Narrow results by machine, client, or warehouse.")), hasActiveFilters ? __jsx("span", {
      className: MainSearch_module_default.a.filtersBadge
    }, "Active") : null), __jsx("div", {
      className: MainSearch_module_default.a.filterSection
    }, __jsx("div", {
      className: MainSearch_module_default.a.filterSectionTitle
    }, "Machine"), __jsx(InputGroup["a" /* default */], {
      className: MainSearch_module_default.a.inputGroup
    }, __jsx(InputGroup["a" /* default */].Text, null, "OEM"), __jsx(Dropdown["a" /* default */], {
      onSelect: handleSelect1,
      className: "w-100"
    }, __jsx(Dropdown["a" /* default */].Toggle, {
      variant: "outline-secondary",
      id: "".concat(idPrefix, "-oem"),
      className: "w-100 ".concat(MainSearch_module_default.a.inputButton)
    }, dropdown1Text), __jsx(Dropdown["a" /* default */].Menu, {
      className: "w-100"
    }, __jsx(Dropdown["a" /* default */].Item, {
      eventKey: "unassigned"
    }, "Select Option"), __jsx(Dropdown["a" /* default */].Item, {
      eventKey: "GE"
    }, "GE"), __jsx(Dropdown["a" /* default */].Item, {
      eventKey: "Toshiba"
    }, "Toshiba"), __jsx(Dropdown["a" /* default */].Item, {
      eventKey: "Siemens"
    }, "Siemens"), __jsx(Dropdown["a" /* default */].Item, {
      eventKey: "Philips"
    }, "Philips")))), __jsx(InputGroup["a" /* default */], {
      className: MainSearch_module_default.a.inputGroup
    }, __jsx(InputGroup["a" /* default */].Text, null, "Modality"), __jsx(Dropdown["a" /* default */], {
      onSelect: handleSelect2,
      className: "w-100"
    }, __jsx(Dropdown["a" /* default */].Toggle, {
      variant: "outline-secondary",
      id: "".concat(idPrefix, "-modality"),
      className: "w-100 ".concat(MainSearch_module_default.a.inputButton)
    }, dropdown2Text), __jsx(Dropdown["a" /* default */].Menu, {
      className: "w-100"
    }, __jsx(Dropdown["a" /* default */].Item, {
      eventKey: "unassigned"
    }, "Select Option"), __jsx(Dropdown["a" /* default */].Item, {
      eventKey: "CT"
    }, "CT"), __jsx(Dropdown["a" /* default */].Item, {
      eventKey: "MRI"
    }, "MRI")))), __jsx(InputGroup["a" /* default */], {
      className: MainSearch_module_default.a.inputGroup
    }, __jsx(InputGroup["a" /* default */].Text, null, "Model"), __jsx(Button["a" /* default */], {
      variant: "outline-secondary",
      className: "w-100 ".concat(MainSearch_module_default.a.inputButton),
      onClick: handleModelClick
    }, modelButtonText))), __jsx("div", {
      className: MainSearch_module_default.a.filterSection
    }, __jsx("div", {
      className: MainSearch_module_default.a.filterSectionTitle
    }, "Client"), __jsx(InputGroup["a" /* default */], {
      className: MainSearch_module_default.a.inputGroup
    }, __jsx(InputGroup["a" /* default */].Text, null, "Client From"), __jsx(Button["a" /* default */], {
      variant: "outline-secondary",
      className: "w-100 ".concat(MainSearch_module_default.a.inputButton),
      onClick: function onClick() {
        return handleClientClick("from");
      }
    }, clientFromButtonText)), __jsx(InputGroup["a" /* default */], {
      className: MainSearch_module_default.a.inputGroup
    }, __jsx(InputGroup["a" /* default */].Text, null, "Client Current"), __jsx(Button["a" /* default */], {
      variant: "outline-secondary",
      className: "w-100 ".concat(MainSearch_module_default.a.inputButton),
      onClick: function onClick() {
        return handleClientClick("current");
      }
    }, clientCurrentButtonText))), __jsx("div", {
      className: MainSearch_module_default.a.filterSection
    }, __jsx("div", {
      className: MainSearch_module_default.a.filterSectionTitle
    }, "Warehouse"), __jsx(InputGroup["a" /* default */], {
      className: MainSearch_module_default.a.inputGroup
    }, __jsx(InputGroup["a" /* default */].Text, null, "Quick"), __jsx("div", {
      className: MainSearch_module_default.a.buttonGroup
    }, __jsx(Button["a" /* default */], {
      variant: "outline-secondary",
      className: MainSearch_module_default.a.flexButton,
      onClick: handleSoCalWarehouseClick
    }, "SoCal Warehouse"), __jsx(Button["a" /* default */], {
      variant: "outline-secondary",
      className: MainSearch_module_default.a.flexButton,
      onClick: handleNorCalWarehouseClick
    }, "NorCal Warehouse"), __jsx(Button["a" /* default */], {
      variant: "outline-secondary",
      className: MainSearch_module_default.a.flexButton,
      onClick: handleWarehouseUnassignedClick
    }, "Unassigned")))));
  };

  return __jsx(LoggedIn["default"], null, (isDeleting || isNavigating) && __jsx("div", {
    className: MainSearch_module_default.a.loadingOverlay
  }, __jsx("img", {
    src: "/magmo-logo.png",
    alt: "Loading Magmo",
    className: MainSearch_module_default.a.loadingLogo
  })), __jsx(Modal["a" /* default */], {
    show: showDeleteModal,
    onHide: handleCloseDeleteModal
  }, __jsx(Modal["a" /* default */].Header, {
    closeButton: true
  }, __jsx(Modal["a" /* default */].Title, null, "Confirm Deletion")), __jsx(Modal["a" /* default */].Body, null, "Are you sure you want to delete ", selectedItems.length, " item", selectedItems.length > 1 ? "s" : "", "?"), __jsx(Modal["a" /* default */].Footer, null, __jsx(Button["a" /* default */], {
    variant: "danger",
    onClick: handleDeleteSelected
  }, "Yes, delete"), __jsx(Button["a" /* default */], {
    variant: "secondary",
    onClick: handleCloseDeleteModal
  }, "Cancel"))), __jsx(Modal["a" /* default */], {
    show: showClientModal,
    onHide: function onHide() {
      return setShowClientModal(false);
    }
  }, __jsx(Modal["a" /* default */].Header, {
    closeButton: true
  }, __jsx(Modal["a" /* default */].Title, null, "Select ", clientSelectionType === "from" ? "Client From" : "Client Current")), __jsx(Modal["a" /* default */].Body, null, __jsx(FormControl["a" /* default */], {
    type: "text",
    placeholder: "Search by name",
    className: "mb-3",
    value: clientSearchTerm,
    onChange: function onChange(e) {
      return setClientSearchTerm(e.target.value);
    }
  }), __jsx(ClientTable["a" /* default */], {
    clients: (Array.isArray(clients) ? clients : []).filter(function (client) {
      var _client$name;

      return ((_client$name = client === null || client === void 0 ? void 0 : client.name) !== null && _client$name !== void 0 ? _client$name : "").toLowerCase().includes(clientSearchTerm.toLowerCase());
    }),
    onSelectClient: handleClientSelect,
    onInfoClick: handleClientInfo,
    isClientSearch: false,
    clearSelection: function clearSelection() {
      return handleClientSelect(null);
    }
  }))), __jsx(Modal["a" /* default */], {
    show: showModelModal,
    onHide: function onHide() {
      return setShowModelModal(false);
    }
  }, __jsx(Modal["a" /* default */].Header, {
    closeButton: true
  }, __jsx(Modal["a" /* default */].Title, null, "Select Model")), __jsx(Modal["a" /* default */].Body, null, __jsx(FormControl["a" /* default */], {
    type: "text",
    placeholder: "Search by name",
    className: "mb-3",
    value: modelSearchTerm,
    onChange: function onChange(e) {
      return setModelSearchTerm(e.target.value);
    }
  }), __jsx(ModelTable["a" /* default */], {
    models: models.filter(function (model) {
      return typeof model === "string" ? model.toLowerCase().includes(modelSearchTerm.toLowerCase()) : false;
    }),
    onSelectModel: handleModelSelect,
    clearSelection: function clearSelection() {
      return handleModelSelect(null);
    }
  }))), __jsx("div", {
    className: MainSearch_module_default.a.page
  }, __jsx("div", {
    className: MainSearch_module_default.a.pageInner
  }, __jsx("header", {
    className: MainSearch_module_default.a.header
  }, __jsx("div", {
    className: MainSearch_module_default.a.headerLeft
  }, __jsx("button", {
    type: "button",
    className: MainSearch_module_default.a.burger,
    onClick: function onClick() {
      return setShowFilters(true);
    },
    "aria-label": "Open filters"
  }, __jsx("span", null), __jsx("span", null), __jsx("span", null)), __jsx("div", {
    className: MainSearch_module_default.a.brand
  }, __jsx("img", {
    src: "/magmo-logo.png",
    alt: "Magmo",
    className: MainSearch_module_default.a.brandLogo
  }), __jsx("div", null, __jsx("div", {
    className: MainSearch_module_default.a.brandName
  }, "Magmo"), __jsx("div", {
    className: MainSearch_module_default.a.brandSub
  }, "Inventory Search")))), __jsx("div", {
    className: MainSearch_module_default.a.headerRight
  }, __jsx("div", {
    className: MainSearch_module_default.a.headerStatus
  }, hasActiveFilters ? "Filters active" : "All items"))), __jsx("div", {
    className: MainSearch_module_default.a.content
  }, __jsx("aside", {
    className: MainSearch_module_default.a.sidebar
  }, renderFilters("sidebar")), __jsx("main", {
    className: MainSearch_module_default.a.main
  }, __jsx("div", {
    className: MainSearch_module_default.a.tableCard
  }, __jsx("div", {
    className: MainSearch_module_default.a.tableHeader
  }, __jsx("div", null, __jsx("div", {
    className: MainSearch_module_default.a.tableTitle
  }, "Items"), __jsx("div", {
    className: MainSearch_module_default.a.tableSubtitle
  }, isLoading ? "Loading items" : "".concat(info.length, " items on this page"))), __jsx("div", {
    className: MainSearch_module_default.a.tableMeta
  }, "Page ", page, " ", hasNextPage ? "of ".concat(totalKnownPages, "+") : "of ".concat(totalKnownPages))), __jsx("div", {
    className: MainSearch_module_default.a.tableBody,
    ref: tableBodyRef
  }, isLoading ? __jsx("div", {
    className: MainSearch_module_default.a.loadingState
  }, __jsx("img", {
    src: "/magmo-logo.png",
    alt: "Loading Magmo",
    className: MainSearch_module_default.a.loadingLogo
  }), __jsx("div", {
    className: MainSearch_module_default.a.loadingText
  }, "Loading")) : loadError ? __jsx("div", {
    className: MainSearch_module_default.a.errorState
  }, __jsx("div", {
    className: MainSearch_module_default.a.errorTitle
  }, "Load failed (", loadError.code, ")"), __jsx("div", {
    className: MainSearch_module_default.a.errorMessage
  }, loadError.message), __jsx(Button["a" /* default */], {
    variant: "outline-secondary",
    size: "sm",
    onClick: function onClick() {
      resetPagination();
      setQueryEpoch(function (v) {
        return v + 1;
      });
    }
  }, "Retry")) : __jsx(PartTable["a" /* default */], {
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
    minRows: pageSize
  })), __jsx("div", {
    className: MainSearch_module_default.a.tableFooter
  }, __jsx("div", {
    className: MainSearch_module_default.a.paginationRow
  }, __jsx(Pagination["a" /* default */], {
    size: "sm"
  }, __jsx(Pagination["a" /* default */].Prev, {
    onClick: function onClick() {
      return setPage(function (p) {
        return Math.max(1, p - 1);
      });
    },
    disabled: page <= 1
  }, "Previous"), pageButtons, __jsx(Pagination["a" /* default */].Next, {
    onClick: function onClick() {
      return setPage(function (p) {
        return p + 1;
      });
    },
    disabled: !hasNextPage
  }, "Next"))), __jsx(Form["a" /* default */], {
    className: MainSearch_module_default.a.searchRow
  }, __jsx(FormControl["a" /* default */], {
    type: showListSearch,
    placeholder: "Search",
    className: MainSearch_module_default.a.searchInput,
    "aria-label": "Search",
    value: search,
    onChange: searchChangeHandler
  }), __jsx(NavDropdown["a" /* default */], {
    title: select,
    id: "collasible-nav-dropdown",
    show: showList,
    onMouseEnter: function onMouseEnter() {
      return setShowList(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setShowList(false);
    },
    className: MainSearch_module_default.a.searchSelect
  }, __jsx(NavDropdown["a" /* default */].Item, {
    onClick: function onClick() {
      setSelect("Name");
      setShowListSearch("text");
    }
  }, "Name"), __jsx(NavDropdown["a" /* default */].Item, {
    onClick: function onClick() {
      setSelect("Date");
      setShowListSearch("date");
    }
  }, "Date"), __jsx(NavDropdown["a" /* default */].Item, {
    onClick: function onClick() {
      setSelect("Work Order");
      setShowListSearch("text");
    }
  }, "Work Order"), __jsx(NavDropdown["a" /* default */].Item, {
    onClick: function onClick() {
      setSelect("Product Number");
      setShowListSearch("text");
    }
  }, "Product Number"), __jsx(NavDropdown["a" /* default */].Item, {
    onClick: function onClick() {
      setSelect("Serial Number");
      setShowListSearch("text");
    }
  }, "Serial Number"), __jsx(NavDropdown["a" /* default */].Item, {
    onClick: function onClick() {
      setSelect("Description");
      setShowListSearch("text");
    }
  }, "Description"), __jsx(NavDropdown["a" /* default */].Item, {
    onClick: function onClick() {
      setSelect("SKU");
      setShowListSearch("text");
    }
  }, "SKU"))), __jsx("div", {
    className: MainSearch_module_default.a.footerActions
  }, __jsx(LoadingButton, {
    type: "secondary",
    name: "Add New Item",
    route: "NewSearch/AddItem/NewItem",
    className: MainSearch_module_default.a.actionButton
  }), __jsx(Button["a" /* default */], {
    variant: "info",
    className: "".concat(MainSearch_module_default.a.actionButton, " ").concat(MainSearch_module_default.a.mapActionButton),
    onClick: openMap
  }, "Map"), __jsx(LoadingButton, {
    type: "primary",
    name: "Back",
    route: "Warehousedb/WarehouseSelect",
    className: MainSearch_module_default.a.actionButton
  }))))))), __jsx(esm_Offcanvas, {
    show: showFilters,
    onHide: function onHide() {
      return setShowFilters(false);
    },
    placement: "start",
    className: MainSearch_module_default.a.filtersDrawer,
    scroll: true,
    backdrop: true
  }, __jsx(esm_Offcanvas.Header, {
    closeButton: true
  }, __jsx(esm_Offcanvas.Title, null, "Filters")), __jsx(esm_Offcanvas.Body, null, renderFilters("drawer"))), __jsx(WarehouseMapModal["a" /* default */], {
    show: showMap,
    onHide: function onHide() {
      return setShowMap(false);
    },
    onView: handleMapView
  })));
}

/***/ }),

/***/ "etfB":
/***/ (function(module, exports, __webpack_require__) {


    (window.__NEXT_P = window.__NEXT_P || []).push([
      "/NewSearch/mainSearch",
      function () {
        return __webpack_require__("ZptN");
      }
    ]);
  

/***/ }),

/***/ "zhAr":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/react-bootstrap/node_modules/classnames/index.js
var classnames = __webpack_require__("eC2I");
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__("q1tI");

// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/ThemeProvider.js
var ThemeProvider = __webpack_require__("vUet");

// EXTERNAL MODULE: ./node_modules/@restart/ui/esm/Anchor.js + 8 modules
var Anchor = __webpack_require__("8lGn");

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__("nKUr");

// CONCATENATED MODULE: ./node_modules/react-bootstrap/esm/PageItem.js
/* eslint-disable react/no-multi-comp */





const PageItem = /*#__PURE__*/react["forwardRef"](({
  active = false,
  disabled = false,
  className,
  style,
  activeLabel = '(current)',
  children,
  linkStyle,
  linkClassName,
  as = Anchor["a" /* default */],
  ...props
}, ref) => {
  const Component = active || disabled ? 'span' : as;
  return /*#__PURE__*/Object(jsx_runtime["jsx"])("li", {
    ref: ref,
    style: style,
    className: classnames_default()(className, 'page-item', {
      active,
      disabled
    }),
    children: /*#__PURE__*/Object(jsx_runtime["jsxs"])(Component, {
      className: classnames_default()('page-link', linkClassName),
      style: linkStyle,
      ...props,
      children: [children, active && activeLabel && /*#__PURE__*/Object(jsx_runtime["jsx"])("span", {
        className: "visually-hidden",
        children: activeLabel
      })]
    })
  });
});
PageItem.displayName = 'PageItem';
/* harmony default export */ var esm_PageItem = (PageItem);
function createButton(name, defaultValue, label = name) {
  const Button = /*#__PURE__*/react["forwardRef"](({
    children,
    ...props
  }, ref) => /*#__PURE__*/Object(jsx_runtime["jsxs"])(PageItem, {
    ...props,
    ref: ref,
    children: [/*#__PURE__*/Object(jsx_runtime["jsx"])("span", {
      "aria-hidden": "true",
      children: children || defaultValue
    }), /*#__PURE__*/Object(jsx_runtime["jsx"])("span", {
      className: "visually-hidden",
      children: label
    })]
  }));
  Button.displayName = name;
  return Button;
}
const First = createButton('First', '«');
const Prev = createButton('Prev', '‹', 'Previous');
const Ellipsis = createButton('Ellipsis', '…', 'More');
const Next = createButton('Next', '›');
const Last = createButton('Last', '»');
// CONCATENATED MODULE: ./node_modules/react-bootstrap/esm/Pagination.js
"use client";






const Pagination = /*#__PURE__*/react["forwardRef"](({
  bsPrefix,
  className,
  size,
  ...props
}, ref) => {
  const decoratedBsPrefix = Object(ThemeProvider["e" /* useBootstrapPrefix */])(bsPrefix, 'pagination');
  return /*#__PURE__*/Object(jsx_runtime["jsx"])("ul", {
    ref: ref,
    ...props,
    className: classnames_default()(className, decoratedBsPrefix, size && `${decoratedBsPrefix}-${size}`)
  });
});
Pagination.displayName = 'Pagination';
/* harmony default export */ var esm_Pagination = __webpack_exports__["a"] = (Object.assign(Pagination, {
  First: First,
  Prev: Prev,
  Ellipsis: Ellipsis,
  Item: esm_PageItem,
  Next: Next,
  Last: Last
}));

/***/ })

},[["etfB",1,0,5,3,2,4,6,7,9,10,11,12,13,15,17,18]]]);