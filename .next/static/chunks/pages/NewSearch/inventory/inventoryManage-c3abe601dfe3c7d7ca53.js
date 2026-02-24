_N_E =
(window["webpackJsonp_N_E"] = window["webpackJsonp_N_E"] || []).push([[42],{

/***/ "/y3y":
/***/ (function(module, exports, __webpack_require__) {


    (window.__NEXT_P = window.__NEXT_P || []).push([
      "/NewSearch/inventory/inventoryManage",
      function () {
        return __webpack_require__("ZSHz");
      }
    ]);
  

/***/ }),

/***/ "2W6z":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var __DEV__ = "production" !== 'production';

var warning = function() {};

if (__DEV__) {
  var printWarning = function printWarning(format, args) {
    var len = arguments.length;
    args = new Array(len > 1 ? len - 1 : 0);
    for (var key = 1; key < len; key++) {
      args[key - 1] = arguments[key];
    }
    var argIndex = 0;
    var message = 'Warning: ' +
      format.replace(/%s/g, function() {
        return args[argIndex++];
      });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  }

  warning = function(condition, format, args) {
    var len = arguments.length;
    args = new Array(len > 2 ? len - 2 : 0);
    for (var key = 2; key < len; key++) {
      args[key - 2] = arguments[key];
    }
    if (format === undefined) {
      throw new Error(
          '`warning(condition, format, ...args)` requires a warning ' +
          'message argument'
      );
    }
    if (!condition) {
      printWarning.apply(null, [format].concat(args));
    }
  };
}

module.exports = warning;


/***/ }),

/***/ "3Z9Z":
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





const Row = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["forwardRef"](({
  bsPrefix,
  className,
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component = 'div',
  ...props
}, ref) => {
  const decoratedBsPrefix = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_2__[/* useBootstrapPrefix */ "e"])(bsPrefix, 'row');
  const breakpoints = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_2__[/* useBootstrapBreakpoints */ "c"])();
  const minBreakpoint = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_2__[/* useBootstrapMinBreakpoint */ "d"])();
  const sizePrefix = `${decoratedBsPrefix}-cols`;
  const classes = [];
  breakpoints.forEach(brkPoint => {
    const propValue = props[brkPoint];
    delete props[brkPoint];
    let cols;
    if (propValue != null && typeof propValue === 'object') {
      ({
        cols
      } = propValue);
    } else {
      cols = propValue;
    }
    const infix = brkPoint !== minBreakpoint ? `-${brkPoint}` : '';
    if (cols != null) classes.push(`${sizePrefix}${infix}-${cols}`);
  });
  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__["jsx"])(Component, {
    ref: ref,
    ...props,
    className: classnames__WEBPACK_IMPORTED_MODULE_0___default()(className, decoratedBsPrefix, ...classes)
  });
});
Row.displayName = 'Row';
/* harmony default export */ __webpack_exports__["a"] = (Row);

/***/ }),

/***/ "9Iqo":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
"use client";



// TODO

const FormContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createContext"]({});
/* harmony default export */ __webpack_exports__["a"] = (FormContext);

/***/ }),

/***/ "MBJH":
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





const Table = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["forwardRef"](({
  bsPrefix,
  className,
  striped,
  bordered,
  borderless,
  hover,
  size,
  variant,
  responsive,
  ...props
}, ref) => {
  const decoratedBsPrefix = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_2__[/* useBootstrapPrefix */ "e"])(bsPrefix, 'table');
  const classes = classnames__WEBPACK_IMPORTED_MODULE_0___default()(className, decoratedBsPrefix, variant && `${decoratedBsPrefix}-${variant}`, size && `${decoratedBsPrefix}-${size}`, striped && `${decoratedBsPrefix}-${typeof striped === 'string' ? `striped-${striped}` : 'striped'}`, bordered && `${decoratedBsPrefix}-bordered`, borderless && `${decoratedBsPrefix}-borderless`, hover && `${decoratedBsPrefix}-hover`);
  const table = /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__["jsx"])("table", {
    ...props,
    className: classes,
    ref: ref
  });
  if (responsive) {
    let responsiveClass = `${decoratedBsPrefix}-responsive`;
    if (typeof responsive === 'string') {
      responsiveClass = `${responsiveClass}-${responsive}`;
    }
    return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__["jsx"])("div", {
      className: responsiveClass,
      children: table
    });
  }
  return table;
});
/* harmony default export */ __webpack_exports__["a"] = (Table);

/***/ }),

/***/ "Mlt0":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("eC2I");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("17x9");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("nKUr");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);




const propTypes = {
  /**
   * Specify whether the feedback is for valid or invalid fields
   *
   * @type {('valid'|'invalid')}
   */
  type: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,
  /** Display feedback as a tooltip. */
  tooltip: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool,
  as: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.elementType
};
const Feedback = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["forwardRef"](
// Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
({
  as: Component = 'div',
  className,
  type = 'valid',
  tooltip = false,
  ...props
}, ref) => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__["jsx"])(Component, {
  ...props,
  ref: ref,
  className: classnames__WEBPACK_IMPORTED_MODULE_0___default()(className, `${type}-${tooltip ? 'tooltip' : 'feedback'}`)
}));
Feedback.displayName = 'Feedback';
Feedback.propTypes = propTypes;
/* harmony default export */ __webpack_exports__["a"] = (Feedback);

/***/ }),

/***/ "T/rR":
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





const Spinner = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["forwardRef"](({
  bsPrefix,
  variant,
  animation = 'border',
  size,
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component = 'div',
  className,
  ...props
}, ref) => {
  bsPrefix = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_2__[/* useBootstrapPrefix */ "e"])(bsPrefix, 'spinner');
  const bsSpinnerPrefix = `${bsPrefix}-${animation}`;
  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__["jsx"])(Component, {
    ref: ref,
    ...props,
    className: classnames__WEBPACK_IMPORTED_MODULE_0___default()(className, bsSpinnerPrefix, size && `${bsSpinnerPrefix}-${size}`, variant && `text-${variant}`)
  });
});
Spinner.displayName = 'Spinner';
/* harmony default export */ __webpack_exports__["a"] = (Spinner);

/***/ }),

/***/ "ZSHz":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return InventoryManage; });
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cpVT");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _LoggedIn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("mJJZ");
/* harmony import */ var _context_Firebase__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("NY6m");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("7vrA");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("T/rR");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("3Z9Z");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("JI6e");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("QojX");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("cWnB");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("MBJH");
/* harmony import */ var bootstrap_dist_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("q4sD");
/* harmony import */ var bootstrap_dist_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(bootstrap_dist_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("YFqc");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("20a2");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _utils_itemFormShared__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("KWEF");

var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }









function InventoryManage() {
  var router = Object(next_router__WEBPACK_IMPORTED_MODULE_13__["useRouter"])();

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])([]),
      items = _useState[0],
      setItems = _useState[1];

  var _useState2 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(true),
      loading = _useState2[0],
      setLoading = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(new Set()),
      selectedIds = _useState3[0],
      setSelectedIds = _useState3[1];

  var _useState4 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])({
    region: "",
    sectionLetter: "",
    sectionNumber: "",
    bin: "",
    pallet: "",
    localSN: ""
  }),
      filters = _useState4[0],
      setFilters = _useState4[1];

  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(""),
      bulkField = _useState5[0],
      setBulkField = _useState5[1];

  var _useState6 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(""),
      bulkValue = _useState6[0],
      setBulkValue = _useState6[1]; // ---- load data once ----


  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    var db = _context_Firebase__WEBPACK_IMPORTED_MODULE_3__[/* default */ "b"].firestore();
    db.collection("Test").get().then(function (snap) {
      var data = snap.docs.map(function (d) {
        var _loc$region$toString, _loc$region, _loc$bin$toString, _loc$bin, _loc$pallet$toString, _loc$pallet;

        var doc = d.data();
        var loc = doc.newLocalCurrent || {};
        var sectionLetter = "";
        var sectionNumber = "";

        if (typeof loc.section === "string") {
          sectionLetter = loc.section.slice(0, 1);
          sectionNumber = loc.section.slice(1);
        } else if (loc.section) {
          sectionLetter = loc.section.letter || "";
          sectionNumber = loc.section.number !== undefined && loc.section.number !== null ? String(loc.section.number) : "";
        }

        return {
          id: d.id,
          name: doc.name || "",
          pn: doc.pn || "",
          sn: doc.sn || "",
          localSN: doc.localSN || "",
          region: (_loc$region$toString = (_loc$region = loc.region) === null || _loc$region === void 0 ? void 0 : _loc$region.toString()) !== null && _loc$region$toString !== void 0 ? _loc$region$toString : "",
          sectionLetter: sectionLetter,
          sectionNumber: sectionNumber,
          bin: (_loc$bin$toString = (_loc$bin = loc.bin) === null || _loc$bin === void 0 ? void 0 : _loc$bin.toString()) !== null && _loc$bin$toString !== void 0 ? _loc$bin$toString : "",
          pallet: (_loc$pallet$toString = (_loc$pallet = loc.pallet) === null || _loc$pallet === void 0 ? void 0 : _loc$pallet.toString()) !== null && _loc$pallet$toString !== void 0 ? _loc$pallet$toString : ""
        };
      });
      setItems(data);
    })["finally"](function () {
      return setLoading(false);
    });
  }, []);
  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    if (!router.isReady) return;
    var qp = router.query;

    var getParam = function getParam(key) {
      return Array.isArray(qp[key]) ? qp[key][0] : qp[key];
    };

    setFilters(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, {
        region: getParam("region") || "",
        sectionLetter: getParam("sectionLetter") || "",
        sectionNumber: getParam("sectionNumber") || "",
        bin: getParam("bin") || "",
        pallet: getParam("pallet") || "",
        localSN: getParam("localSN") || ""
      });
    });
  }, [router.isReady]); // ---- derive distinct filter options ----

  var distinct = function distinct(arr) {
    return Array.from(new Set(arr.filter(function (v) {
      return v;
    }))).sort();
  };

  var regions = Object(react__WEBPACK_IMPORTED_MODULE_1__["useMemo"])(function () {
    return distinct(items.map(function (i) {
      return i.region;
    }));
  }, [items]);
  var sectionLetters = Object(react__WEBPACK_IMPORTED_MODULE_1__["useMemo"])(function () {
    return distinct(items.map(function (i) {
      return i.sectionLetter;
    }));
  }, [items]);
  var sectionNumbers = Object(react__WEBPACK_IMPORTED_MODULE_1__["useMemo"])(function () {
    return distinct(items.map(function (i) {
      return i.sectionNumber;
    }));
  }, [items]);
  var bins = Object(react__WEBPACK_IMPORTED_MODULE_1__["useMemo"])(function () {
    return distinct(items.map(function (i) {
      return i.bin;
    }));
  }, [items]);
  var pallets = Object(react__WEBPACK_IMPORTED_MODULE_1__["useMemo"])(function () {
    return distinct(items.map(function (i) {
      return i.pallet;
    }));
  }, [items]); // ---- toggles ----

  var toggleSelect = function toggleSelect(id) {
    setSelectedIds(function (prev) {
      var next = new Set(prev);
      next.has(id) ? next["delete"](id) : next.add(id);
      return next;
    });
  };

  var toggleSelectAll = function toggleSelectAll() {
    var visibleIds = filteredItems.map(function (i) {
      return i.id;
    });
    setSelectedIds(function (prev) {
      var next = new Set(prev);

      if (visibleIds.every(function (id) {
        return next.has(id);
      })) {
        visibleIds.forEach(function (id) {
          return next["delete"](id);
        });
      } else {
        visibleIds.forEach(function (id) {
          return next.add(id);
        });
      }

      return next;
    });
  }; // ---- filtered list ----


  var filteredItems = items.filter(function (it) {
    return ["region", "sectionLetter", "sectionNumber", "bin", "pallet", "localSN"].every(function (f) {
      return !filters[f] || it[f] === filters[f];
    });
  }); // ---- bulk update handler ----

  var applyBulkUpdate = function applyBulkUpdate() {
    if (!bulkField || !bulkValue) return;
    var db = _context_Firebase__WEBPACK_IMPORTED_MODULE_3__[/* default */ "b"].firestore();
    var updates = Array.from(selectedIds).map(function (id) {
      var orig = items.find(function (i) {
        return i.id === id;
      }) || {};
      var newRegion = bulkField === "region" ? bulkValue : orig.region;
      var newSectionLetter = bulkField === "sectionLetter" ? bulkValue : orig.sectionLetter;
      var newSectionNumber = bulkField === "sectionNumber" ? bulkValue : orig.sectionNumber;
      var newBin = bulkField === "bin" ? bulkValue : orig.bin;
      var newPallet = bulkField === "pallet" ? bulkValue : orig.pallet;
      var newLocString = Object(_utils_itemFormShared__WEBPACK_IMPORTED_MODULE_14__[/* formatLoc */ "c"])({
        region: newRegion,
        section: newSectionLetter && newSectionNumber ? {
          letter: newSectionLetter,
          number: newSectionNumber
        } : undefined,
        bin: newBin,
        pallet: newPallet
      });
      var updateObj = {
        region: newRegion,
        bin: newBin,
        pallet: newPallet,
        localLocCurrent: newLocString,
        newLocalCurrent: {
          region: newRegion,
          bin: newBin,
          pallet: newPallet
        }
      };

      if (newSectionLetter && newSectionNumber) {
        updateObj.section = {
          letter: newSectionLetter,
          number: newSectionNumber
        };
        updateObj.newLocalCurrent.section = {
          letter: newSectionLetter,
          number: newSectionNumber
        };
      }

      return db.collection("Test").doc(id).update(updateObj).then(function () {
        setItems(function (prev) {
          return prev.map(function (item) {
            return item.id === id ? _objectSpread(_objectSpread({}, item), {}, {
              region: newRegion,
              sectionLetter: newSectionLetter,
              sectionNumber: newSectionNumber,
              bin: newBin,
              pallet: newPallet
            }) : item;
          });
        });
      });
    });
    Promise.all(updates).then(function () {
      setSelectedIds(new Set());
      setBulkField("");
      setBulkValue("");
    });
  }; // ---- loading state ----


  if (loading) {
    return __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], {
      className: "py-5 text-center"
    }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], {
      animation: "border"
    }));
  }

  function LoadingButton(_ref) {
    var type = _ref.type,
        name = _ref.name,
        route = _ref.route;

    var _useState7 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(false),
        isLoading = _useState7[0],
        setLoading = _useState7[1];

    Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
      if (isLoading) {
        simulateNetworkRequest().then(function () {
          return setLoading(false);
        });
      }
    }, [isLoading]);

    var handleClick = function handleClick() {
      return setLoading(true);
    };

    return __jsx(next_link__WEBPACK_IMPORTED_MODULE_12___default.a, {
      href: "/".concat(route)
    }, __jsx("a", {
      className: "btn btn-".concat(type),
      disabled: isLoading,
      onClick: !isLoading ? handleClick : null
    }, isLoading ? "Loading…" : name));
  }

  function simulateNetworkRequest() {
    return new Promise(function (resolve) {
      return setTimeout(resolve, 2000);
    });
  }

  return __jsx(_LoggedIn__WEBPACK_IMPORTED_MODULE_2__["default"], null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], {
    className: "py-4"
  }, __jsx("h2", null, "Inventory Management"), __jsx(LoadingButton, {
    type: "primary",
    name: "Back",
    route: "Warehousedb/WarehouseSelect"
  }), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"], {
    className: "mb-3"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"].Label, null, "Region"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"].Select, {
    value: filters.region,
    onChange: function onChange(e) {
      var v = e.target.value;
      setFilters(function (p) {
        return _objectSpread(_objectSpread({}, p), {}, {
          region: v
        });
      });
    }
  }, __jsx("option", {
    value: ""
  }, "All regions"), regions.map(function (r) {
    return __jsx("option", {
      key: r,
      value: r
    }, r);
  }))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"].Label, null, "Section Letter"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"].Select, {
    value: filters.sectionLetter,
    onChange: function onChange(e) {
      var v = e.target.value;
      setFilters(function (p) {
        return _objectSpread(_objectSpread({}, p), {}, {
          sectionLetter: v
        });
      });
    }
  }, __jsx("option", {
    value: ""
  }, "All letters"), sectionLetters.map(function (s) {
    return __jsx("option", {
      key: s,
      value: s
    }, s);
  }))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"].Label, null, "Section Number"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"].Select, {
    value: filters.sectionNumber,
    onChange: function onChange(e) {
      var v = e.target.value;
      setFilters(function (p) {
        return _objectSpread(_objectSpread({}, p), {}, {
          sectionNumber: v
        });
      });
    }
  }, __jsx("option", {
    value: ""
  }, "All numbers"), sectionNumbers.map(function (s) {
    return __jsx("option", {
      key: s,
      value: s
    }, s);
  }))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"].Label, null, "Bin"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"].Select, {
    value: filters.bin,
    onChange: function onChange(e) {
      var v = e.target.value;
      setFilters(function (p) {
        return _objectSpread(_objectSpread({}, p), {}, {
          bin: v
        });
      });
    }
  }, __jsx("option", {
    value: ""
  }, "All bins"), bins.map(function (b) {
    return __jsx("option", {
      key: b,
      value: b
    }, b);
  }))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"].Label, null, "Pallet"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"].Select, {
    value: filters.pallet,
    onChange: function onChange(e) {
      var v = e.target.value;
      setFilters(function (p) {
        return _objectSpread(_objectSpread({}, p), {}, {
          pallet: v
        });
      });
    }
  }, __jsx("option", {
    value: ""
  }, "All pallets"), pallets.map(function (p) {
    return __jsx("option", {
      key: p,
      value: p
    }, p);
  }))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"].Label, null, "Local SN"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"].Control, {
    placeholder: "Search SN",
    value: filters.localSN,
    onChange: function onChange(e) {
      var v = e.target.value;
      setFilters(function (p) {
        return _objectSpread(_objectSpread({}, p), {}, {
          localSN: v
        });
      });
    }
  }))), __jsx("div", {
    className: "d-flex mb-2 align-items-center"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"].Check, {
    type: "checkbox",
    label: "Select All",
    onChange: toggleSelectAll,
    checked: filteredItems.length > 0 && filteredItems.every(function (i) {
      return selectedIds.has(i.id);
    })
  }), selectedIds.size > 0 && __jsx(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"].Select, {
    className: "mx-2",
    value: bulkField,
    onChange: function onChange(e) {
      return setBulkField(e.target.value);
    },
    style: {
      width: "150px"
    }
  }, __jsx("option", {
    value: ""
  }, "Change\u2026"), __jsx("option", {
    value: "region"
  }, "Region"), __jsx("option", {
    value: "sectionLetter"
  }, "Section Letter"), __jsx("option", {
    value: "sectionNumber"
  }, "Section Number"), __jsx("option", {
    value: "bin"
  }, "Bin"), __jsx("option", {
    value: "pallet"
  }, "Pallet")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"].Control, {
    style: {
      width: "100px"
    },
    placeholder: "New value",
    value: bulkValue,
    onChange: function onChange(e) {
      return setBulkValue(e.target.value);
    }
  }), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"], {
    className: "ms-2",
    onClick: applyBulkUpdate
  }, "Apply"))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"], {
    bordered: true,
    hover: true,
    responsive: true
  }, __jsx("thead", null, __jsx("tr", null, __jsx("th", null), __jsx("th", null, "Name"), __jsx("th", null, "PN"), __jsx("th", null, "SN"), __jsx("th", null, "LocalSN"), __jsx("th", null, "Region"), __jsx("th", null, "Section"), __jsx("th", null, "Bin"), __jsx("th", null, "Pallet"))), __jsx("tbody", null, filteredItems.map(function (it) {
    return __jsx("tr", {
      key: it.id
    }, __jsx("td", null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"].Check, {
      type: "checkbox",
      checked: selectedIds.has(it.id),
      onChange: function onChange() {
        return toggleSelect(it.id);
      }
    })), __jsx("td", null, it.name), __jsx("td", null, it.pn), __jsx("td", null, it.sn), __jsx("td", null, it.localSN), __jsx("td", null, it.region), __jsx("td", null, it.sectionLetter, it.sectionNumber), __jsx("td", null, it.bin), __jsx("td", null, it.pallet));
  })))));
}

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

/***/ "cpVT":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _defineProperty; });
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

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

/***/ "jDKy":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("eC2I");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("2W6z");
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(warning__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Feedback__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("Mlt0");
/* harmony import */ var _FormContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("9Iqo");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("vUet");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("nKUr");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__);
"use client";









const FormControl = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["forwardRef"](({
  bsPrefix,
  type,
  size,
  htmlSize,
  id,
  className,
  isValid = false,
  isInvalid = false,
  plaintext,
  readOnly,
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component = 'input',
  ...props
}, ref) => {
  const {
    controlId
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useContext"])(_FormContext__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"]);
  bsPrefix = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_5__[/* useBootstrapPrefix */ "e"])(bsPrefix, 'form-control');
   false ? undefined : void 0;
  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__["jsx"])(Component, {
    ...props,
    type: type,
    size: htmlSize,
    ref: ref,
    readOnly: readOnly,
    id: id || controlId,
    className: classnames__WEBPACK_IMPORTED_MODULE_0___default()(className, plaintext ? `${bsPrefix}-plaintext` : bsPrefix, size && `${bsPrefix}-${size}`, type === 'color' && `${bsPrefix}-color`, isValid && 'is-valid', isInvalid && 'is-invalid')
  });
});
FormControl.displayName = 'FormControl';
/* harmony default export */ __webpack_exports__["a"] = (Object.assign(FormControl, {
  Feedback: _Feedback__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"]
}));

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

},[["/y3y",1,0,5,3,8,2,4,6,13]]]);