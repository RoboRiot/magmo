_N_E =
(window["webpackJsonp_N_E"] = window["webpackJsonp_N_E"] || []).push([[44],{

/***/ "PoBl":
/***/ (function(module, exports, __webpack_require__) {


    (window.__NEXT_P = window.__NEXT_P || []).push([
      "/NewSearch/item/[id]/MachineSelectionModal",
      function () {
        return __webpack_require__("cJ15");
      }
    ]);
  

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

/***/ "cJ15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MachineSelectionModal; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("zM5D");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("97+O");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("jDKy");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("T/rR");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("cWnB");
/* harmony import */ var _utils_fetchAssociations__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("qoNY");
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;


 // Assuming you already have this

function MachineSelectionModal(_ref) {
  var show = _ref.show,
      handleClose = _ref.handleClose,
      setMachine = _ref.setMachine;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null),
      Modality = _useState[0],
      setModality = _useState[1];

  var _useState2 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null),
      OEM = _useState2[0],
      setOEM = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]),
      models = _useState3[0],
      setModels = _useState3[1];

  var _useState4 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null),
      selectedModel = _useState4[0],
      setSelectedModel = _useState4[1];

  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false),
      loadingModels = _useState5[0],
      setLoadingModels = _useState5[1]; // Fetch models when Modality and OEM are selected


  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    if (Modality && OEM) {
      setLoadingModels(true);
      Object(_utils_fetchAssociations__WEBPACK_IMPORTED_MODULE_6__[/* fetchModels */ "b"])(OEM, Modality).then(function (fetchedModels) {
        setModels(fetchedModels);
        setLoadingModels(false);
      })["catch"](function (error) {
        console.error("Error fetching models: ", error);
        setLoadingModels(false);
      });
    }
  }, [Modality, OEM]);

  var handleModalitySelect = function handleModalitySelect(selectedModality) {
    setModality(selectedModality);
    setOEM(null); // Reset OEM and Model when Modality changes

    setSelectedModel(null);
  };

  var handleOEMSelect = function handleOEMSelect(selectedOEM) {
    setOEM(selectedOEM);
    setSelectedModel(null); // Reset Model when OEM changes
  };

  var handleModelSelect = function handleModelSelect(model) {
    setSelectedModel(model);
  };

  var handleSaveSelection = function handleSaveSelection() {
    if (selectedModel) {
      // Pass selected machine data back to the parent
      setMachine({
        Modality: Modality,
        OEM: OEM,
        Model: selectedModel
      });
      handleClose(); // Close the modal
    }
  };

  return __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"], {
    show: show,
    onHide: handleClose
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].Header, {
    closeButton: true
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].Title, null, "Select Machine")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].Body, null, __jsx("div", {
    className: "mb-3"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], {
    onSelect: handleModalitySelect
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].Toggle, {
    variant: "outline-secondary",
    className: "w-100"
  }, Modality || "Select Modality"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].Menu, null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].Item, {
    eventKey: "CT"
  }, "CT"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].Item, {
    eventKey: "MRI"
  }, "MRI")))), Modality && __jsx("div", {
    className: "mb-3"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], {
    onSelect: handleOEMSelect
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].Toggle, {
    variant: "outline-secondary",
    className: "w-100"
  }, OEM || "Select OEM"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].Menu, null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].Item, {
    eventKey: "GE"
  }, "GE"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].Item, {
    eventKey: "Philips"
  }, "Philips"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].Item, {
    eventKey: "Siemens"
  }, "Siemens"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].Item, {
    eventKey: "Toshiba"
  }, "Toshiba")))), Modality && OEM && __jsx("div", {
    className: "mb-3"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], {
    placeholder: "Search models",
    "aria-label": "Search models",
    "aria-describedby": "basic-addon2",
    onChange: function onChange(e) {
      return setSelectedModel(e.target.value);
    }
  }), loadingModels ? __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], {
    animation: "border"
  }) : models.length > 0 && __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], {
    onSelect: handleModelSelect
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].Toggle, {
    variant: "outline-secondary",
    className: "w-100"
  }, selectedModel || "Select Model"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].Menu, null, models.map(function (model) {
    return __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].Item, {
      key: model,
      eventKey: model
    }, model);
  }))))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].Footer, null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], {
    variant: "secondary",
    onClick: handleClose
  }, "Close"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], {
    variant: "primary",
    onClick: handleSaveSelection,
    disabled: !selectedModel
  }, "Save Selection")));
}

/***/ })

},[["PoBl",1,0,5,3,2,4,7,9,10,11,12]]]);