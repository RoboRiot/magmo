(window["webpackJsonp_N_E"] = window["webpackJsonp_N_E"] || []).push([[16],{

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

/***/ "R4mU":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"modalDialog":"ParentModal_modalDialog__15Q08","modalContent":"ParentModal_modalContent__1gA4I","modalHeader":"ParentModal_modalHeader__onCFZ","modalTitle":"ParentModal_modalTitle__1lqve","modalSubtitle":"ParentModal_modalSubtitle__1oe9V","modalBody":"ParentModal_modalBody__2Yct2","modalFooter":"ParentModal_modalFooter__1xG48","modalGrid":"ParentModal_modalGrid__3Hzml","filtersPanel":"ParentModal_filtersPanel__3x6nG","panelTitle":"ParentModal_panelTitle__39v2f","panelHint":"ParentModal_panelHint__3dPSc","inputGroup":"ParentModal_inputGroup__2gkHd","panelDivider":"ParentModal_panelDivider__3bFLy","quickButtons":"ParentModal_quickButtons__1OLOj","quickButton":"ParentModal_quickButton__2OQPF","resultsPanel":"ParentModal_resultsPanel__3vLiX","resultsHeader":"ParentModal_resultsHeader__3Ldbc","resultsTitle":"ParentModal_resultsTitle__3263P","resultsSubtitle":"ParentModal_resultsSubtitle__2zTIV","pagination":"ParentModal_pagination__2gy06","searchRow":"ParentModal_searchRow__3xXUB","searchInput":"ParentModal_searchInput__2jJC5","tableWrap":"ParentModal_tableWrap__d7_0d","table":"ParentModal_table__2sQKG","stickyHeader":"ParentModal_stickyHeader__Uu7Ue","loadingState":"ParentModal_loadingState__1mfbA","loadingLogo":"ParentModal_loadingLogo__1wI4s","magmo-spin":"ParentModal_magmo-spin__mq-Xf","errorState":"ParentModal_errorState__K2vSB","emptyState":"ParentModal_emptyState__2Hy72"};

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

/***/ "oGF+":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("vJKn");
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("z7pX");
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("rg98");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("zhAr");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("zM5D");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("zUrK");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("97+O");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("cWnB");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("jDKy");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("GWEY");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("MBJH");
/* harmony import */ var _utils_fetchAssociations__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("qoNY");
/* harmony import */ var _utils_ClientTable__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("8HvV");
/* harmony import */ var _utils_ModelTable__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("TM8N");
/* harmony import */ var _ParentModal_module_css__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("R4mU");
/* harmony import */ var _ParentModal_module_css__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_ParentModal_module_css__WEBPACK_IMPORTED_MODULE_15__);



var __jsx = react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement;






var CLIENT_WAREHOUSE = "igor-house";
var CLIENT_UNASSIGNED = "unassigned";
var PAGE_SIZE = 20;

var ParentModal = function ParentModal(_ref) {
  var show = _ref.show,
      handleClose = _ref.handleClose,
      setSelectedParent = _ref.setSelectedParent;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])([]),
      info = _useState[0],
      setInfo = _useState[1];

  var _useState2 = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(false),
      isLoading = _useState2[0],
      setIsLoading = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(1),
      page = _useState3[0],
      setPage = _useState3[1];

  var _useState4 = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])([]),
      pageCursors = _useState4[0],
      setPageCursors = _useState4[1];

  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(false),
      hasNextPage = _useState5[0],
      setHasNextPage = _useState5[1];

  var _useState6 = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(0),
      queryEpoch = _useState6[0],
      setQueryEpoch = _useState6[1];

  var _useState7 = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(null),
      loadError = _useState7[0],
      setLoadError = _useState7[1];

  var _useState8 = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(""),
      search = _useState8[0],
      setSearch = _useState8[1];

  var _useState9 = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])("Name"),
      select = _useState9[0],
      setSelect = _useState9[1];

  var _useState10 = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(false),
      showList = _useState10[0],
      setShowList = _useState10[1];

  var _useState11 = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])("text"),
      showListSearch = _useState11[0],
      setShowListSearch = _useState11[1];

  var _useState12 = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(null),
      selectedOEM = _useState12[0],
      setSelectedOEM = _useState12[1];

  var _useState13 = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(null),
      selectedModality = _useState13[0],
      setSelectedModality = _useState13[1];

  var _useState14 = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(null),
      selectedClient = _useState14[0],
      setSelectedClient = _useState14[1];

  var _useState15 = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])([]),
      clients = _useState15[0],
      setClients = _useState15[1];

  var _useState16 = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(false),
      showClientModal = _useState16[0],
      setShowClientModal = _useState16[1];

  var _useState17 = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])("Select Option"),
      clientButtonText = _useState17[0],
      setClientButtonText = _useState17[1];

  var _useState18 = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(null),
      selectedModel = _useState18[0],
      setSelectedModel = _useState18[1];

  var _useState19 = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])([]),
      models = _useState19[0],
      setModels = _useState19[1];

  var _useState20 = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(false),
      showModelModal = _useState20[0],
      setShowModelModal = _useState20[1];

  var _useState21 = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])("Select Option"),
      modelButtonText = _useState21[0],
      setModelButtonText = _useState21[1];

  var _useState22 = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(""),
      clientSearchTerm = _useState22[0],
      setClientSearchTerm = _useState22[1];

  var _useState23 = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(""),
      modelSearchTerm = _useState23[0],
      setModelSearchTerm = _useState23[1];

  var normalizeText = function normalizeText(value) {
    if (value == null) return "";
    return String(value).toLowerCase().trim();
  };

  var fieldMatchesSelection = function fieldMatchesSelection(value, selected) {
    if (!selected) return true;

    if (Array.isArray(value)) {
      return value.some(function (entry) {
        return fieldMatchesSelection(entry, selected);
      });
    }

    return normalizeText(value) === normalizeText(selected);
  };

  var getMachineField = function getMachineField(item, key) {
    var _ref2, _ref3, _ref4, _ref5, _ref6, _item$machineData$key, _item$machineData, _item$machineData2, _key$toLowerCase, _item$currentMachineD, _item$currentMachineD2, _key$toLowerCase2, _item$TheMachine, _item$TheMachine2, _key$toLowerCase3;

    if (!item) return null;
    return (_ref2 = (_ref3 = (_ref4 = (_ref5 = (_ref6 = (_item$machineData$key = item === null || item === void 0 ? void 0 : (_item$machineData = item.machineData) === null || _item$machineData === void 0 ? void 0 : _item$machineData[key]) !== null && _item$machineData$key !== void 0 ? _item$machineData$key : item === null || item === void 0 ? void 0 : (_item$machineData2 = item.machineData) === null || _item$machineData2 === void 0 ? void 0 : _item$machineData2[key === null || key === void 0 ? void 0 : (_key$toLowerCase = key.toLowerCase) === null || _key$toLowerCase === void 0 ? void 0 : _key$toLowerCase.call(key)]) !== null && _ref6 !== void 0 ? _ref6 : item === null || item === void 0 ? void 0 : (_item$currentMachineD = item.currentMachineData) === null || _item$currentMachineD === void 0 ? void 0 : _item$currentMachineD[key]) !== null && _ref5 !== void 0 ? _ref5 : item === null || item === void 0 ? void 0 : (_item$currentMachineD2 = item.currentMachineData) === null || _item$currentMachineD2 === void 0 ? void 0 : _item$currentMachineD2[key === null || key === void 0 ? void 0 : (_key$toLowerCase2 = key.toLowerCase) === null || _key$toLowerCase2 === void 0 ? void 0 : _key$toLowerCase2.call(key)]) !== null && _ref4 !== void 0 ? _ref4 : item === null || item === void 0 ? void 0 : (_item$TheMachine = item.TheMachine) === null || _item$TheMachine === void 0 ? void 0 : _item$TheMachine[key]) !== null && _ref3 !== void 0 ? _ref3 : item === null || item === void 0 ? void 0 : (_item$TheMachine2 = item.TheMachine) === null || _item$TheMachine2 === void 0 ? void 0 : _item$TheMachine2[key === null || key === void 0 ? void 0 : (_key$toLowerCase3 = key.toLowerCase) === null || _key$toLowerCase3 === void 0 ? void 0 : _key$toLowerCase3.call(key)]) !== null && _ref2 !== void 0 ? _ref2 : null;
  };

  var resetPagination = function resetPagination() {
    setPage(1);
    setPageCursors([]);
    setHasNextPage(false);
  };

  var searchChangeHandler = function searchChangeHandler(event) {
    return setSearch(event.target.value);
  };

  var matchesFilters = Object(react__WEBPACK_IMPORTED_MODULE_3__["useCallback"])(function (item) {
    if (!item) return false;

    if (selectedOEM) {
      var OEM = getMachineField(item, "OEM");
      if (!fieldMatchesSelection(OEM, selectedOEM)) return false;
    }

    if (selectedModality) {
      var Modality = getMachineField(item, "Modality");
      if (!fieldMatchesSelection(Modality, selectedModality)) return false;
    }

    if (selectedModel) {
      var Model = getMachineField(item, "Model");
      if (!fieldMatchesSelection(Model, selectedModel)) return false;
    }

    if (selectedClient) {
      var clientRef = getMachineField(item, "client");
      var clientId = typeof clientRef === "string" ? clientRef : (clientRef === null || clientRef === void 0 ? void 0 : clientRef.id) || null;
      if (clientId !== selectedClient) return false;
    }

    return true;
  }, [selectedOEM, selectedModality, selectedModel, selectedClient]);
  var fetchData = Object(react__WEBPACK_IMPORTED_MODULE_3__["useCallback"])( /*#__PURE__*/Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
    var requestedPage,
        startAfterDoc,
        searchLower,
        _yield$fetchPartsWith,
        data,
        lastDoc,
        nextPage,
        _args = arguments;

    return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            requestedPage = _args.length > 0 && _args[0] !== undefined ? _args[0] : 1;

            if (show) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return");

          case 3:
            startAfterDoc = requestedPage > 1 ? pageCursors[requestedPage - 2] : null;

            if (!(requestedPage > 1 && !startAfterDoc)) {
              _context.next = 7;
              break;
            }

            setPage(1);
            return _context.abrupt("return");

          case 7:
            setIsLoading(true);
            setLoadError(null);
            searchLower = (search || "").toLowerCase().trim();
            _context.prev = 10;
            _context.next = 13;
            return Object(_utils_fetchAssociations__WEBPACK_IMPORTED_MODULE_12__[/* fetchPartsWithMachineDataPage */ "d"])({
              pageSize: PAGE_SIZE,
              startAfterDoc: startAfterDoc,
              visibleOnly: true,
              filterFn: selectedOEM || selectedModality || selectedModel || selectedClient ? matchesFilters : null,
              search: searchLower ? {
                type: select,
                raw: search,
                lower: searchLower
              } : null,
              needsMachineData: Boolean(selectedOEM) || Boolean(selectedModality) || Boolean(selectedModel) || Boolean(selectedClient)
            });

          case 13:
            _yield$fetchPartsWith = _context.sent;
            data = _yield$fetchPartsWith.parts;
            lastDoc = _yield$fetchPartsWith.lastDoc;
            nextPage = _yield$fetchPartsWith.hasNextPage;
            setInfo(data);
            setHasNextPage(nextPage);
            setPageCursors(function (prev) {
              var next = requestedPage === 1 ? [] : Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(prev);

              if (lastDoc) {
                next[requestedPage - 1] = lastDoc;
              }

              return next;
            });
            _context.next = 27;
            break;

          case 22:
            _context.prev = 22;
            _context.t0 = _context["catch"](10);
            console.error("Parent modal load failed:", _context.t0);
            setLoadError((_context.t0 === null || _context.t0 === void 0 ? void 0 : _context.t0.message) || "Failed to load items.");
            setInfo([]);

          case 27:
            _context.prev = 27;
            setIsLoading(false);
            return _context.finish(27);

          case 30:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[10, 22, 27, 30]]);
  })), [show, pageCursors, search, select, selectedOEM, selectedModality, selectedModel, selectedClient, matchesFilters]);
  Object(react__WEBPACK_IMPORTED_MODULE_3__["useEffect"])(function () {
    if (!show) return;
    resetPagination();
    setQueryEpoch(function (v) {
      return v + 1;
    });
  }, [show, selectedOEM, selectedModality, selectedModel, selectedClient, search, select]);
  Object(react__WEBPACK_IMPORTED_MODULE_3__["useEffect"])(function () {
    if (!show) return;
    fetchData(page);
  }, [show, page, queryEpoch, fetchData]);

  var rowSelect = function rowSelect(item) {
    setSelectedParent({
      id: item.id,
      name: item.name,
      pn: item.pn
    });
    handleClose();
  };

  var _useState24 = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])("Select Option"),
      dropdown1Text = _useState24[0],
      setDropdown1Text = _useState24[1];

  var _useState25 = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])("Select Option"),
      dropdown2Text = _useState25[0],
      setDropdown2Text = _useState25[1];

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
  };

  var handleClientClick = /*#__PURE__*/function () {
    var _ref8 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
      var clientsData;
      return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return Object(_utils_fetchAssociations__WEBPACK_IMPORTED_MODULE_12__[/* fetchClients */ "a"])(selectedOEM, selectedModality);

            case 2:
              clientsData = _context2.sent;
              setClients(clientsData);
              setClientSearchTerm("");
              setShowClientModal(true);

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function handleClientClick() {
      return _ref8.apply(this, arguments);
    };
  }();

  var handleClientSelect = function handleClientSelect(clientId) {
    if (!clientId) {
      setClientButtonText("Select Option");
      setSelectedClient(null);
      setShowClientModal(false);
      return;
    }

    var client = clients.find(function (c) {
      return c.id === clientId;
    });
    setClientButtonText((client === null || client === void 0 ? void 0 : client.name) || "Select Option");
    setSelectedClient(clientId);
    setShowClientModal(false);
  };

  var handleClientInfo = function handleClientInfo(clientId, clientName) {
    console.log("Client ID: ".concat(clientId, ", Client Name: ").concat(clientName));
  };

  var handleClearClientSelection = function handleClearClientSelection() {
    setClientButtonText("Select Option");
    setSelectedClient(null);
    setShowClientModal(false);
  };

  var handleModelClick = /*#__PURE__*/function () {
    var _ref9 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3() {
      var modelsData;
      return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return Object(_utils_fetchAssociations__WEBPACK_IMPORTED_MODULE_12__[/* fetchModels */ "b"])(selectedOEM, selectedModality, selectedClient);

            case 2:
              modelsData = _context3.sent;
              setModels(modelsData);
              setModelSearchTerm("");
              setShowModelModal(true);

            case 6:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function handleModelClick() {
      return _ref9.apply(this, arguments);
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
  };

  var handleWarehouseClick = function handleWarehouseClick() {
    setClientButtonText(CLIENT_WAREHOUSE);
    setSelectedClient(CLIENT_WAREHOUSE);
  };

  var handleUnassignedClick = function handleUnassignedClick() {
    setClientButtonText(CLIENT_UNASSIGNED);
    setSelectedClient(CLIENT_UNASSIGNED);
  };

  var totalKnownPages = Math.max(1, pageCursors.filter(Boolean).length + (hasNextPage ? 1 : 0));

  var pageButtons = function () {
    var buttons = [];
    var maxVisible = 6;

    var pushPage = function pushPage(p) {
      return buttons.push(__jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].Item, {
        key: "page-".concat(p),
        active: p === page,
        onClick: function onClick() {
          return setPage(p);
        }
      }, p));
    };

    var pushEllipsis = function pushEllipsis(key) {
      return buttons.push(__jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].Ellipsis, {
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

  return __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], {
    show: show,
    onHide: handleClose,
    size: "xl",
    centered: true,
    dialogClassName: _ParentModal_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.modalDialog,
    contentClassName: _ParentModal_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.modalContent
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"].Header, {
    closeButton: true,
    className: _ParentModal_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.modalHeader
  }, __jsx("div", null, __jsx("div", {
    className: _ParentModal_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.modalTitle
  }, "Select Parent"), __jsx("div", {
    className: _ParentModal_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.modalSubtitle
  }, "Search and choose a parent item for this part."))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"].Body, {
    className: _ParentModal_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.modalBody
  }, __jsx("div", {
    className: _ParentModal_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.modalGrid
  }, __jsx("aside", {
    className: _ParentModal_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.filtersPanel
  }, __jsx("div", {
    className: _ParentModal_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.panelTitle
  }, "Filters"), __jsx("div", {
    className: _ParentModal_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.panelHint
  }, "Narrow results with machine and client filters."), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"], {
    className: _ParentModal_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.inputGroup
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"].Text, null, "OEM"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], {
    onSelect: handleSelect1,
    className: "w-100"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].Toggle, {
    variant: "outline-secondary",
    id: "dropdown-button-1",
    className: "w-100"
  }, dropdown1Text), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].Menu, {
    className: "w-100"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].Item, {
    eventKey: "unassigned"
  }, "Select Option"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].Item, {
    eventKey: "GE"
  }, "GE"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].Item, {
    eventKey: "Toshiba"
  }, "Toshiba"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].Item, {
    eventKey: "Siemens"
  }, "Siemens"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].Item, {
    eventKey: "Philips"
  }, "Philips")))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"], {
    className: _ParentModal_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.inputGroup
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"].Text, null, "Modality"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], {
    onSelect: handleSelect2,
    className: "w-100"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].Toggle, {
    variant: "outline-secondary",
    id: "dropdown-button-2",
    className: "w-100"
  }, dropdown2Text), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].Menu, {
    className: "w-100"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].Item, {
    eventKey: "unassigned"
  }, "Select Option"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].Item, {
    eventKey: "CT"
  }, "CT"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].Item, {
    eventKey: "MRI"
  }, "MRI")))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"], {
    className: _ParentModal_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.inputGroup
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"].Text, null, "Client"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], {
    variant: "outline-secondary",
    className: "w-100",
    onClick: handleClientClick
  }, clientButtonText)), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"], {
    className: _ParentModal_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.inputGroup
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"].Text, null, "Model"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], {
    variant: "outline-secondary",
    className: "w-100",
    onClick: handleModelClick
  }, modelButtonText)), __jsx("div", {
    className: _ParentModal_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.panelDivider
  }), __jsx("div", {
    className: _ParentModal_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.panelTitle
  }, "Quick"), __jsx("div", {
    className: _ParentModal_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.quickButtons
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], {
    variant: "outline-secondary",
    className: _ParentModal_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.quickButton,
    onClick: handleWarehouseClick
  }, "Warehouse"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], {
    variant: "outline-secondary",
    className: _ParentModal_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.quickButton,
    onClick: handleUnassignedClick
  }, "Unassigned"))), __jsx("section", {
    className: _ParentModal_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.resultsPanel
  }, __jsx("div", {
    className: _ParentModal_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.resultsHeader
  }, __jsx("div", null, __jsx("div", {
    className: _ParentModal_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.resultsTitle
  }, "Results"), __jsx("div", {
    className: _ParentModal_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.resultsSubtitle
  }, isLoading ? "Loading items" : "".concat(info.length, " items"))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], {
    size: "sm",
    className: _ParentModal_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.pagination
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].Prev, {
    onClick: function onClick() {
      return setPage(function (p) {
        return Math.max(1, p - 1);
      });
    },
    disabled: page <= 1
  }), pageButtons, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].Next, {
    onClick: function onClick() {
      return setPage(function (p) {
        return p + 1;
      });
    },
    disabled: !hasNextPage
  }))), __jsx("div", {
    className: _ParentModal_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.searchRow
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"], {
    type: showListSearch,
    placeholder: "Search",
    className: _ParentModal_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.searchInput,
    "aria-label": "Search",
    value: search,
    onChange: searchChangeHandler
  }), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"], {
    title: select,
    id: "parent-search-dropdown",
    show: showList,
    onMouseEnter: function onMouseEnter() {
      return setShowList(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setShowList(false);
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"].Item, {
    onClick: function onClick() {
      setSelect("Name");
      setShowListSearch("text");
    }
  }, "Name"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"].Item, {
    onClick: function onClick() {
      setSelect("Date");
      setShowListSearch("date");
    }
  }, "Date"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"].Item, {
    onClick: function onClick() {
      setSelect("Work Order");
      setShowListSearch("text");
    }
  }, "Work Order"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"].Item, {
    onClick: function onClick() {
      setSelect("Product Number");
      setShowListSearch("text");
    }
  }, "Product Number"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"].Item, {
    onClick: function onClick() {
      setSelect("Serial Number");
      setShowListSearch("text");
    }
  }, "Serial Number"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"].Item, {
    onClick: function onClick() {
      setSelect("Description");
      setShowListSearch("text");
    }
  }, "Description"))), __jsx("div", {
    className: _ParentModal_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.tableWrap
  }, isLoading ? __jsx("div", {
    className: _ParentModal_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.loadingState
  }, __jsx("img", {
    src: "/magmo-logo.png",
    alt: "Loading",
    className: _ParentModal_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.loadingLogo
  })) : loadError ? __jsx("div", {
    className: _ParentModal_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.errorState
  }, loadError) : __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"], {
    striped: true,
    bordered: true,
    hover: true,
    size: "sm",
    className: _ParentModal_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.table
  }, __jsx("thead", {
    className: _ParentModal_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.stickyHeader
  }, __jsx("tr", null, __jsx("th", null, "Name"), __jsx("th", null, "Date"), __jsx("th", null, "Work Order"), __jsx("th", null, "Product Number"), __jsx("th", null, "Serial Number"), __jsx("th", null, "Select"))), __jsx("tbody", null, info.length === 0 && __jsx("tr", null, __jsx("td", {
    colSpan: 6,
    className: _ParentModal_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.emptyState
  }, "No items found.")), info.map(function (item) {
    return __jsx("tr", {
      key: item.id
    }, __jsx("td", null, item.name), __jsx("td", null, Object(_utils_fetchAssociations__WEBPACK_IMPORTED_MODULE_12__[/* formatDate */ "e"])(item.date)), __jsx("td", null, item.workOrders && item.workOrders.length > 0 ? item.workOrders[item.workOrders.length - 1].workOrder : "N/A"), __jsx("td", null, item.pn), __jsx("td", null, item.sn), __jsx("td", null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], {
      variant: "primary",
      size: "sm",
      onClick: function onClick() {
        return rowSelect(item);
      }
    }, "Select")));
  }))))))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"].Footer, {
    className: _ParentModal_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.modalFooter
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], {
    variant: "secondary",
    onClick: handleClose
  }, "Cancel"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], {
    variant: "warning",
    onClick: function onClick() {
      setSelectedParent(null);
      handleClose();
    }
  }, "Clear Selection")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], {
    show: showClientModal,
    onHide: function onHide() {
      return setShowClientModal(false);
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"].Header, {
    closeButton: true
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"].Title, null, "Select Client")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"].Body, null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"], {
    type: "text",
    placeholder: "Search by name",
    className: "mb-3",
    value: clientSearchTerm,
    onChange: function onChange(e) {
      return setClientSearchTerm(e.target.value);
    }
  }), __jsx(_utils_ClientTable__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"], {
    clients: clients.filter(function (client) {
      return (client.name || "").toLowerCase().includes(clientSearchTerm.toLowerCase());
    }),
    disableInfo: true,
    onSelectClient: handleClientSelect,
    onInfoClick: handleClientInfo,
    clearSelection: handleClearClientSelection
  }))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], {
    show: showModelModal,
    onHide: function onHide() {
      return setShowModelModal(false);
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"].Header, {
    closeButton: true
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"].Title, null, "Select Model")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"].Body, null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"], {
    type: "text",
    placeholder: "Search by name",
    className: "mb-3",
    value: modelSearchTerm,
    onChange: function onChange(e) {
      return setModelSearchTerm(e.target.value);
    }
  }), __jsx(_utils_ModelTable__WEBPACK_IMPORTED_MODULE_14__[/* default */ "a"], {
    models: models.filter(function (model) {
      return typeof model === "string" ? model.toLowerCase().includes(modelSearchTerm.toLowerCase()) : false;
    }),
    onSelectModel: handleModelSelect,
    clearSelection: handleClearModelSelection
  }))));
};

/* harmony default export */ __webpack_exports__["default"] = (ParentModal);

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

}]);