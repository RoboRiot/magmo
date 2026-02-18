(window["webpackJsonp_N_E"] = window["webpackJsonp_N_E"] || []).push([[17],{

/***/ "8HvV":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("MBJH");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("cWnB");
/* harmony import */ var _styles_ClientTable_module_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("wL8p");
/* harmony import */ var _styles_ClientTable_module_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_ClientTable_module_css__WEBPACK_IMPORTED_MODULE_3__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;




var ClientTable = function ClientTable(_ref) {
  var clients = _ref.clients,
      onSelectClient = _ref.onSelectClient,
      onInfoClick = _ref.onInfoClick,
      clearSelection = _ref.clearSelection,
      onAddClient = _ref.onAddClient,
      disableSelect = _ref.disableSelect,
      disableInfo = _ref.disableInfo,
      isClientSearch = _ref.isClientSearch;
  var columnCount = 1 + (disableInfo ? 0 : 1) + (disableSelect ? 0 : 1);
  var showActions = Boolean(clearSelection || onAddClient);
  return __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"], {
    striped: true,
    bordered: true,
    hover: true,
    size: "sm",
    className: _styles_ClientTable_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.clientTable
  }, __jsx("thead", null, __jsx("tr", null, __jsx("th", null, "Client Name"), !disableInfo && __jsx("th", null, "Info"), !disableSelect && __jsx("th", null, "Select"))), __jsx("tbody", null, showActions && __jsx("tr", {
    className: _styles_ClientTable_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.actionRow
  }, __jsx("td", {
    colSpan: columnCount
  }, __jsx("div", {
    className: _styles_ClientTable_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.actionButtons
  }, clearSelection && __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], {
    variant: "secondary",
    onClick: clearSelection
  }, "Clear Selection"), onAddClient && __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], {
    variant: "primary",
    onClick: onAddClient,
    className: "ms-2"
  }, "Add New Client")))), clients.map(function (client) {
    return __jsx("tr", {
      key: client.id
    }, __jsx("td", null, client.name), !disableInfo && __jsx("td", null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], {
      variant: "info",
      onClick: function onClick() {
        return onInfoClick(client.id, client.name);
      }
    }, isClientSearch ? "Edit" : "Info")), !disableSelect && __jsx("td", null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], {
      variant: "primary",
      onClick: function onClick() {
        return onSelectClient(client.id);
      }
    }, "Select")));
  })));
};

/* harmony default export */ __webpack_exports__["a"] = (ClientTable);

/***/ }),

/***/ "9XnA":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const TabContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createContext"](null);
/* harmony default export */ __webpack_exports__["a"] = (TabContext);

/***/ }),

/***/ "Dktn":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"page":"MainSearch_page__3KWre","pageInner":"MainSearch_pageInner__2F-Do","header":"MainSearch_header__2XL-0","headerLeft":"MainSearch_headerLeft__2NHnY","burger":"MainSearch_burger__16E9G","brand":"MainSearch_brand__1HlT8","brandLogo":"MainSearch_brandLogo__1jzlV","brandName":"MainSearch_brandName__3sr6z","brandSub":"MainSearch_brandSub__2Wx6J","headerRight":"MainSearch_headerRight__1c7Xg","headerStatus":"MainSearch_headerStatus__39DSE","content":"MainSearch_content__3_dPC","sidebar":"MainSearch_sidebar__2Qe8Q","filtersPanel":"MainSearch_filtersPanel___mVSq","filtersHeader":"MainSearch_filtersHeader__27ytX","filtersTitle":"MainSearch_filtersTitle__2OPcr","filtersSubtitle":"MainSearch_filtersSubtitle__210Gy","filtersBadge":"MainSearch_filtersBadge__2T6ZC","filterSection":"MainSearch_filterSection__nQm7l","filterSectionTitle":"MainSearch_filterSectionTitle__3YmRX","inputGroup":"MainSearch_inputGroup__24zWb","inputButton":"MainSearch_inputButton__3AQ0k","buttonGroup":"MainSearch_buttonGroup__1GWI6","flexButton":"MainSearch_flexButton__3znqD","main":"MainSearch_main__9qWmb","tableCard":"MainSearch_tableCard__HWP00","tableHeader":"MainSearch_tableHeader__HKUbw","tableTitle":"MainSearch_tableTitle__2gEeo","tableSubtitle":"MainSearch_tableSubtitle__2cB64","tableMeta":"MainSearch_tableMeta__32GOq","tableBody":"MainSearch_tableBody__3oWc_","tableFooter":"MainSearch_tableFooter__Fv3zw","paginationRow":"MainSearch_paginationRow__3ppdE","searchRow":"MainSearch_searchRow__3-6fd","searchInput":"MainSearch_searchInput__25A5U","searchSelect":"MainSearch_searchSelect__30rPg","footerActions":"MainSearch_footerActions__2XPPC","actionButton":"MainSearch_actionButton__3m1LJ","mapActionButton":"MainSearch_mapActionButton__3rHb2","loadingOverlay":"MainSearch_loadingOverlay__1w9WW","spinnerCenter":"MainSearch_spinnerCenter__1RHnj","loadingState":"MainSearch_loadingState__isV-4","loadingLogo":"MainSearch_loadingLogo__3Sh4i","magmo-spin":"MainSearch_magmo-spin__3dFGQ","loadingText":"MainSearch_loadingText__1CCQX","errorState":"MainSearch_errorState__1GlB6","errorTitle":"MainSearch_errorTitle__150u3","errorMessage":"MainSearch_errorMessage__1Lbbg","filtersDrawer":"MainSearch_filtersDrawer__Q6N-m","mapLoading":"MainSearch_mapLoading__171fg","mapError":"MainSearch_mapError__2TQUX","mapStage":"MainSearch_mapStage__245Yb","mapHint":"MainSearch_mapHint__w1rLP","mapCanvas":"MainSearch_mapCanvas__331bH","regionBlock":"MainSearch_regionBlock__n5nnq","regionE":"MainSearch_regionE__1R4hT","regionF":"MainSearch_regionF__1UlI0","regionG":"MainSearch_regionG__2w4OS","regionA":"MainSearch_regionA__3ijLa","regionD":"MainSearch_regionD__3-Njx","regionC":"MainSearch_regionC__BUSOX","regionB":"MainSearch_regionB__35Lw8","gridWrapper":"MainSearch_gridWrapper__qJY3l","grid":"MainSearch_grid__1LLRe","gridCell":"MainSearch_gridCell__ZoFgs","gridCellDisabled":"MainSearch_gridCellDisabled__kSau0","palletGrid":"MainSearch_palletGrid__qEtK0","palletButton":"MainSearch_palletButton__2_86Y","binButton":"MainSearch_binButton__2otqw","mapEmpty":"MainSearch_mapEmpty__2Wz6h","mapFooter":"MainSearch_mapFooter__1Bonr"};

/***/ }),

/***/ "GWEY":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/react-bootstrap/node_modules/classnames/index.js
var classnames = __webpack_require__("eC2I");
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__("q1tI");

// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/ThemeProvider.js
var ThemeProvider = __webpack_require__("vUet");

// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/Dropdown.js + 70 modules
var Dropdown = __webpack_require__("97+O");

// EXTERNAL MODULE: ./node_modules/@restart/ui/esm/Anchor.js + 8 modules
var Anchor = __webpack_require__("8lGn");

// EXTERNAL MODULE: ./node_modules/@restart/ui/esm/NavItem.js
var NavItem = __webpack_require__("Wp5h");

// EXTERNAL MODULE: ./node_modules/@restart/ui/esm/SelectableContext.js
var SelectableContext = __webpack_require__("rCFR");

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__("nKUr");

// CONCATENATED MODULE: ./node_modules/react-bootstrap/esm/NavLink.js
"use client";








const NavLink = /*#__PURE__*/react["forwardRef"](({
  bsPrefix,
  className,
  as: Component = Anchor["a" /* default */],
  active,
  eventKey,
  disabled = false,
  ...props
}, ref) => {
  bsPrefix = Object(ThemeProvider["e" /* useBootstrapPrefix */])(bsPrefix, 'nav-link');
  const [navItemProps, meta] = Object(NavItem["b" /* useNavItem */])({
    key: Object(SelectableContext["b" /* makeEventKey */])(eventKey, props.href),
    active,
    disabled,
    ...props
  });
  return /*#__PURE__*/Object(jsx_runtime["jsx"])(Component, {
    ...props,
    ...navItemProps,
    ref: ref,
    disabled: disabled,
    className: classnames_default()(className, bsPrefix, disabled && 'disabled', meta.isActive && 'active')
  });
});
NavLink.displayName = 'NavLink';
/* harmony default export */ var esm_NavLink = (NavLink);
// CONCATENATED MODULE: ./node_modules/react-bootstrap/esm/NavDropdown.js
"use client";








const NavDropdown = /*#__PURE__*/react["forwardRef"](({
  id,
  title,
  children,
  bsPrefix,
  className,
  rootCloseEvent,
  menuRole,
  disabled,
  active,
  renderMenuOnMount,
  menuVariant,
  ...props
}, ref) => {
  /* NavItem has no additional logic, it's purely presentational. Can set nav item class here to support "as" */
  const navItemPrefix = Object(ThemeProvider["e" /* useBootstrapPrefix */])(undefined, 'nav-item');
  return /*#__PURE__*/Object(jsx_runtime["jsxs"])(Dropdown["a" /* default */], {
    ref: ref,
    ...props,
    className: classnames_default()(className, navItemPrefix),
    children: [/*#__PURE__*/Object(jsx_runtime["jsx"])(Dropdown["a" /* default */].Toggle, {
      id: id,
      eventKey: null,
      active: active,
      disabled: disabled,
      childBsPrefix: bsPrefix,
      as: esm_NavLink,
      children: title
    }), /*#__PURE__*/Object(jsx_runtime["jsx"])(Dropdown["a" /* default */].Menu, {
      role: menuRole,
      renderOnMount: renderMenuOnMount,
      rootCloseEvent: rootCloseEvent,
      variant: menuVariant,
      children: children
    })]
  });
});
NavDropdown.displayName = 'NavDropdown';
/* harmony default export */ var esm_NavDropdown = __webpack_exports__["a"] = (Object.assign(NavDropdown, {
  Item: Dropdown["a" /* default */].Item,
  ItemText: Dropdown["a" /* default */].ItemText,
  Divider: Dropdown["a" /* default */].Divider,
  Header: Dropdown["a" /* default */].Header
}));

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

/***/ "MSWM":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PartTable; });
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("z7pX");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("MBJH");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("cWnB");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("QojX");
/* harmony import */ var _fetchAssociations__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("qoNY");
/* harmony import */ var _styles_PartTable_module_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("cbdS");
/* harmony import */ var _styles_PartTable_module_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_styles_PartTable_module_css__WEBPACK_IMPORTED_MODULE_6__);

var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;




function PartTable(_ref) {
  var info = _ref.info,
      labels = _ref.labels,
      ids = _ref.ids,
      hoverStyle = _ref.hoverStyle,
      sortCheckAll = _ref.sortCheckAll,
      checkDelete = _ref.checkDelete,
      isDeleting = _ref.isDeleting,
      rowSelect = _ref.rowSelect,
      setHoverIndex = _ref.setHoverIndex,
      hoverIndex = _ref.hoverIndex,
      selectedItems = _ref.selectedItems,
      setSelectedItems = _ref.setSelectedItems,
      _ref$minRows = _ref.minRows,
      minRows = _ref$minRows === void 0 ? 10 : _ref$minRows;

  // const [selectedItems, setSelectedItems] = useState([]);
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(null),
      longPressName = _useState[0],
      setLongPressName = _useState[1];

  var _useState2 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(false),
      isMobile = _useState2[0],
      setIsMobile = _useState2[1];

  var pressTimerRef = Object(react__WEBPACK_IMPORTED_MODULE_1__["useRef"])(null);
  var longPressTriggeredRef = Object(react__WEBPACK_IMPORTED_MODULE_1__["useRef"])(false);
  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    if (false) {}
    var media = window.matchMedia("(max-width: 640px)");

    var update = function update() {
      return setIsMobile(media.matches);
    };

    update();

    if (media.addEventListener) {
      media.addEventListener("change", update);
      return function () {
        return media.removeEventListener("change", update);
      };
    }

    media.addListener(update);
    return function () {
      return media.removeListener(update);
    };
  }, []); // Toggle selection of items

  var handleSelectItem = function handleSelectItem(id) {
    setSelectedItems(function (prevSelectedItems) {
      return prevSelectedItems.includes(id) ? prevSelectedItems.filter(function (itemId) {
        return itemId !== id;
      }) : [].concat(Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(prevSelectedItems), [id]);
    });
  }; // Handle delete button click for selected items


  var handleDeleteSelected = function handleDeleteSelected() {
    if (selectedItems.length > 0) {
      checkDelete(null, null, selectedItems, "selected items");
    }
  };

  var startLongPress = function startLongPress(name) {
    return function () {
      if (!isMobile) return;

      if (pressTimerRef.current) {
        clearTimeout(pressTimerRef.current);
      }

      pressTimerRef.current = setTimeout(function () {
        longPressTriggeredRef.current = true;
        setLongPressName(name);
      }, 450);
    };
  };

  var cancelLongPress = function cancelLongPress() {
    if (pressTimerRef.current) {
      clearTimeout(pressTimerRef.current);
      pressTimerRef.current = null;
    }
  };

  var dismissLongPress = function dismissLongPress() {
    longPressTriggeredRef.current = false;
    setLongPressName(null);
  };

  var paddingCount = Math.max(0, minRows - info.length);
  return __jsx(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, __jsx("div", {
    className: _styles_PartTable_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.scrollableTable
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], {
    striped: true,
    bordered: true,
    hover: true,
    size: "sm",
    className: "mb-0 ".concat(_styles_PartTable_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.fixedTable)
  }, __jsx("thead", {
    className: _styles_PartTable_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.stickyHeader
  }, __jsx("tr", null, labels.map(function (item, index) {
    return __jsx("th", {
      style: hoverStyle(index),
      onMouseOver: function onMouseOver() {
        return setHoverIndex(index);
      },
      onMouseOut: function onMouseOut() {
        return setHoverIndex(null);
      },
      onClick: function onClick() {
        return sortCheckAll(index);
      },
      key: index
    }, item);
  }), __jsx("th", {
    className: _styles_PartTable_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.actionCol,
    style: {
      textAlign: "center"
    }
  }, selectedItems.length > 0 ? __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], {
    variant: "danger",
    onClick: handleDeleteSelected,
    disabled: isDeleting,
    size: "sm"
  }, "Delete Selected (", selectedItems.length, ")") : "select"))), __jsx("tbody", null, info.map(function (item, index) {
    return __jsx("tr", {
      key: index,
      onClick: function onClick(e) {
        if (longPressTriggeredRef.current) {
          longPressTriggeredRef.current = false;
          return;
        } // Only trigger rowSelect if the target is not a checkbox


        if (e.target.type !== "checkbox") {
          rowSelect(item);
        }
      },
      onTouchStart: startLongPress(item.name),
      onTouchEnd: cancelLongPress,
      onTouchCancel: cancelLongPress,
      onTouchMove: cancelLongPress,
      className: "clickable-row"
    }, __jsx("td", {
      style: {
        textAlign: "center",
        cursor: "default"
      }
    }, __jsx("div", {
      className: _styles_PartTable_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.cellClamp,
      title: item.name
    }, item.name)), __jsx("td", {
      style: {
        textAlign: "center",
        cursor: "default"
      }
    }, __jsx("div", {
      className: _styles_PartTable_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.cellClamp,
      title: Object(_fetchAssociations__WEBPACK_IMPORTED_MODULE_5__[/* formatDate */ "e"])(item.date)
    }, Object(_fetchAssociations__WEBPACK_IMPORTED_MODULE_5__[/* formatDate */ "e"])(item.date))), __jsx("td", {
      style: {
        textAlign: "center",
        cursor: "default"
      }
    }, __jsx("div", {
      className: _styles_PartTable_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.cellClamp,
      title: item.workOrders && item.workOrders.length > 0 ? item.workOrders[item.workOrders.length - 1].workOrder : "N/A"
    }, item.workOrders && item.workOrders.length > 0 ? item.workOrders[item.workOrders.length - 1].workOrder : "N/A")), __jsx("td", {
      style: {
        textAlign: "center",
        cursor: "default"
      }
    }, __jsx("div", {
      className: _styles_PartTable_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.cellClamp,
      title: item.pn
    }, item.pn)), __jsx("td", {
      style: {
        textAlign: "center",
        cursor: "default"
      }
    }, __jsx("div", {
      className: _styles_PartTable_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.cellClamp,
      title: item.sn
    }, item.sn)), __jsx("td", {
      className: _styles_PartTable_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.actionCol,
      style: {
        textAlign: "center"
      }
    }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].Check, {
      type: "checkbox",
      checked: selectedItems.includes(item.id),
      onChange: function onChange(e) {
        e.stopPropagation(); // Prevent row click when checkbox is clicked
        // Toggle selection using item.id directly

        setSelectedItems(function (prevSelectedItems) {
          return prevSelectedItems.includes(item.id) ? prevSelectedItems.filter(function (id) {
            return id !== item.id;
          }) : [].concat(Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(prevSelectedItems), [item.id]);
        });
      },
      "aria-label": "Select ".concat(item.name)
    })));
  }), paddingCount > 0 && Array.from({
    length: paddingCount
  }).map(function (_, index) {
    return __jsx("tr", {
      key: "empty-".concat(index)
    }, __jsx("td", {
      colSpan: labels.length + 1,
      style: {
        textAlign: "center"
      }
    }, "\xA0"));
  })))), isMobile && longPressName && __jsx("div", {
    className: _styles_PartTable_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.longPressOverlay,
    onClick: dismissLongPress,
    role: "button",
    tabIndex: 0
  }, __jsx("div", {
    className: _styles_PartTable_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.longPressCard
  }, longPressName)));
}

/***/ }),

/***/ "TM8N":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("MBJH");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("cWnB");
/* harmony import */ var _styles_ClientTable_module_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("wL8p");
/* harmony import */ var _styles_ClientTable_module_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_ClientTable_module_css__WEBPACK_IMPORTED_MODULE_3__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;
// components/ModelTable.js




var ModelTable = function ModelTable(_ref) {
  var models = _ref.models,
      onSelectModel = _ref.onSelectModel,
      clearSelection = _ref.clearSelection;
  return __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"], {
    striped: true,
    bordered: true,
    hover: true,
    size: "sm",
    className: _styles_ClientTable_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.modelTable
  }, __jsx("thead", null, __jsx("tr", null, __jsx("th", null, "Model Name"), __jsx("th", null, "Select"))), __jsx("tbody", null, __jsx("tr", null, __jsx("td", {
    colSpan: "2",
    style: {
      textAlign: "center"
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], {
    variant: "secondary",
    onClick: clearSelection
  }, "Clear Selection"))), models.map(function (model, index) {
    return __jsx("tr", {
      key: index
    }, __jsx("td", null, model), __jsx("td", null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], {
      variant: "primary",
      onClick: function onClick() {
        return onSelectModel(model);
      }
    }, "Select")));
  }))));
};

/* harmony default export */ __webpack_exports__["a"] = (ModelTable);

/***/ }),

/***/ "Wp5h":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return useNavItem; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _restart_hooks_useEventCallback__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("ZCiN");
/* harmony import */ var _NavContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("NZYg");
/* harmony import */ var _SelectableContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("rCFR");
/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("uN4Y");
/* harmony import */ var _DataKey__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("dW1P");
/* harmony import */ var _TabContext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("9XnA");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("nKUr");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__);
const _excluded = ["as", "active", "eventKey"];
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }









function useNavItem({
  key,
  onClick,
  active,
  id,
  role,
  disabled
}) {
  const parentOnSelect = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_SelectableContext__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"]);
  const navContext = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_NavContext__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"]);
  const tabContext = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_TabContext__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"]);
  let isActive = active;
  const props = {
    role
  };
  if (navContext) {
    if (!role && navContext.role === 'tablist') props.role = 'tab';
    const contextControllerId = navContext.getControllerId(key != null ? key : null);
    const contextControlledId = navContext.getControlledId(key != null ? key : null);

    // @ts-ignore
    props[Object(_DataKey__WEBPACK_IMPORTED_MODULE_5__[/* dataAttr */ "a"])('event-key')] = key;
    props.id = contextControllerId || id;
    isActive = active == null && key != null ? navContext.activeKey === key : active;

    /**
     * Simplified scenario for `mountOnEnter`.
     *
     * While it would make sense to keep 'aria-controls' for tabs that have been mounted at least
     * once, it would also complicate the code quite a bit, for very little gain.
     * The following implementation is probably good enough.
     *
     * @see https://github.com/react-restart/ui/pull/40#issuecomment-1009971561
     */
    if (isActive || !(tabContext != null && tabContext.unmountOnExit) && !(tabContext != null && tabContext.mountOnEnter)) props['aria-controls'] = contextControlledId;
  }
  if (props.role === 'tab') {
    props['aria-selected'] = isActive;
    if (!isActive) {
      props.tabIndex = -1;
    }
    if (disabled) {
      props.tabIndex = -1;
      props['aria-disabled'] = true;
    }
  }
  props.onClick = Object(_restart_hooks_useEventCallback__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(e => {
    if (disabled) return;
    onClick == null ? void 0 : onClick(e);
    if (key == null) {
      return;
    }
    if (parentOnSelect && !e.isPropagationStopped()) {
      parentOnSelect(key, e);
    }
  });
  return [props, {
    isActive
  }];
}
const NavItem = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["forwardRef"]((_ref, ref) => {
  let {
      as: Component = _Button__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"],
      active,
      eventKey
    } = _ref,
    options = _objectWithoutPropertiesLoose(_ref, _excluded);
  const [props, meta] = useNavItem(Object.assign({
    key: Object(_SelectableContext__WEBPACK_IMPORTED_MODULE_3__[/* makeEventKey */ "b"])(eventKey, options.href),
    active
  }, options));

  // @ts-ignore
  props[Object(_DataKey__WEBPACK_IMPORTED_MODULE_5__[/* dataAttr */ "a"])('active')] = meta.isActive;
  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__["jsx"])(Component, Object.assign({}, options, props, {
    ref: ref
  }));
});
NavItem.displayName = 'NavItem';
/* harmony default export */ __webpack_exports__["a"] = (NavItem);

/***/ }),

/***/ "cbdS":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"tableContainer":"PartTable_tableContainer__18TCg","scrollableTable":"PartTable_scrollableTable__2TybW","stickyHeader":"PartTable_stickyHeader__1HJK1","searchContainer":"PartTable_searchContainer__2r7ak","divider":"PartTable_divider__1QxCq","buttonGroup":"PartTable_buttonGroup__3ZfOO","flexButton":"PartTable_flexButton__2po2e","fixedTable":"PartTable_fixedTable__3hJCc","cellClamp":"PartTable_cellClamp__3itXM","actionCol":"PartTable_actionCol__2xfPb","longPressOverlay":"PartTable_longPressOverlay__19I5P","longPressCard":"PartTable_longPressCard__1NuHw"};

/***/ }),

/***/ "wL8p":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"clientTableContainer":"ClientTable_clientTableContainer__1e9un","clientTable":"ClientTable_clientTable__194v7","actionRow":"ClientTable_actionRow__9EfKK","actionButtons":"ClientTable_actionButtons__1Vtgg","buttonGroup":"ClientTable_buttonGroup__pSZ7y","flexButton":"ClientTable_flexButton__LoNiS"};

/***/ }),

/***/ "zUrK":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/react-bootstrap/node_modules/classnames/index.js
var classnames = __webpack_require__("eC2I");
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__("q1tI");

// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/ThemeProvider.js
var ThemeProvider = __webpack_require__("vUet");

// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/FormCheckInput.js
var FormCheckInput = __webpack_require__("tXs5");

// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/InputGroupContext.js
var InputGroupContext = __webpack_require__("PYdC");

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__("nKUr");

// CONCATENATED MODULE: ./node_modules/react-bootstrap/esm/InputGroupText.js
"use client";





const InputGroupText = /*#__PURE__*/react["forwardRef"](({
  className,
  bsPrefix,
  as: Component = 'span',
  ...props
}, ref) => {
  bsPrefix = Object(ThemeProvider["e" /* useBootstrapPrefix */])(bsPrefix, 'input-group-text');
  return /*#__PURE__*/Object(jsx_runtime["jsx"])(Component, {
    ref: ref,
    className: classnames_default()(className, bsPrefix),
    ...props
  });
});
InputGroupText.displayName = 'InputGroupText';
/* harmony default export */ var esm_InputGroupText = (InputGroupText);
// CONCATENATED MODULE: ./node_modules/react-bootstrap/esm/InputGroup.js
"use client";









const InputGroupCheckbox = props => /*#__PURE__*/Object(jsx_runtime["jsx"])(esm_InputGroupText, {
  children: /*#__PURE__*/Object(jsx_runtime["jsx"])(FormCheckInput["a" /* default */], {
    type: "checkbox",
    ...props
  })
});
const InputGroupRadio = props => /*#__PURE__*/Object(jsx_runtime["jsx"])(esm_InputGroupText, {
  children: /*#__PURE__*/Object(jsx_runtime["jsx"])(FormCheckInput["a" /* default */], {
    type: "radio",
    ...props
  })
});
const InputGroup = /*#__PURE__*/react["forwardRef"](({
  bsPrefix,
  size,
  hasValidation,
  className,
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component = 'div',
  ...props
}, ref) => {
  bsPrefix = Object(ThemeProvider["e" /* useBootstrapPrefix */])(bsPrefix, 'input-group');

  // Intentionally an empty object. Used in detecting if a dropdown
  // exists under an input group.
  const contextValue = Object(react["useMemo"])(() => ({}), []);
  return /*#__PURE__*/Object(jsx_runtime["jsx"])(InputGroupContext["a" /* default */].Provider, {
    value: contextValue,
    children: /*#__PURE__*/Object(jsx_runtime["jsx"])(Component, {
      ref: ref,
      ...props,
      className: classnames_default()(className, bsPrefix, size && `${bsPrefix}-${size}`, hasValidation && 'has-validation')
    })
  });
});
InputGroup.displayName = 'InputGroup';
/* harmony default export */ var esm_InputGroup = __webpack_exports__["a"] = (Object.assign(InputGroup, {
  Text: esm_InputGroupText,
  Radio: InputGroupRadio,
  Checkbox: InputGroupCheckbox
}));

/***/ })

}]);