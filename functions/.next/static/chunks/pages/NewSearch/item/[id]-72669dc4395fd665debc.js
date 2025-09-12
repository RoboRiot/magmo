_N_E =
(window["webpackJsonp_N_E"] = window["webpackJsonp_N_E"] || []).push([[37],{

/***/ "7wmr":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "default", function() { return /* binding */ NewLocal; });

// EXTERNAL MODULE: ./node_modules/next/node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__("vJKn");
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);

// EXTERNAL MODULE: ./node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("rg98");

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__("q1tI");
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/Row.js
var Row = __webpack_require__("3Z9Z");

// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/Col.js
var Col = __webpack_require__("JI6e");

// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/Form.js + 11 modules
var Form = __webpack_require__("QojX");

// EXTERNAL MODULE: ./node_modules/react-bootstrap/node_modules/classnames/index.js
var classnames = __webpack_require__("eC2I");
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);

// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/ThemeProvider.js
var ThemeProvider = __webpack_require__("vUet");

// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__("17x9");
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);

// CONCATENATED MODULE: ./node_modules/react-bootstrap/esm/createUtilityClasses.js


function responsivePropType(propType) {
  return prop_types_default.a.oneOfType([propType, prop_types_default.a.shape({
    xs: propType,
    sm: propType,
    md: propType,
    lg: propType,
    xl: propType,
    xxl: propType
  })]);
}
function createUtilityClassName(utilityValues, breakpoints = ThemeProvider["a" /* DEFAULT_BREAKPOINTS */], minBreakpoint = ThemeProvider["b" /* DEFAULT_MIN_BREAKPOINT */]) {
  const classes = [];
  Object.entries(utilityValues).forEach(([utilName, utilValue]) => {
    if (utilValue != null) {
      if (typeof utilValue === 'object') {
        breakpoints.forEach(brkPoint => {
          const bpValue = utilValue[brkPoint];
          if (bpValue != null) {
            const infix = brkPoint !== minBreakpoint ? `-${brkPoint}` : '';
            classes.push(`${utilName}${infix}-${bpValue}`);
          }
        });
      } else {
        classes.push(`${utilName}-${utilValue}`);
      }
    }
  });
  return classes;
}
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__("nKUr");

// CONCATENATED MODULE: ./node_modules/react-bootstrap/esm/Stack.js
"use client";






const Stack = /*#__PURE__*/react["forwardRef"](({
  as: Component = 'div',
  bsPrefix,
  className,
  direction,
  gap,
  ...props
}, ref) => {
  bsPrefix = Object(ThemeProvider["e" /* useBootstrapPrefix */])(bsPrefix, direction === 'horizontal' ? 'hstack' : 'vstack');
  const breakpoints = Object(ThemeProvider["c" /* useBootstrapBreakpoints */])();
  const minBreakpoint = Object(ThemeProvider["d" /* useBootstrapMinBreakpoint */])();
  return /*#__PURE__*/Object(jsx_runtime["jsx"])(Component, {
    ...props,
    ref: ref,
    className: classnames_default()(className, bsPrefix, ...createUtilityClassName({
      gap
    }, breakpoints, minBreakpoint))
  });
});
Stack.displayName = 'Stack';
/* harmony default export */ var esm_Stack = (Stack);
// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/Button.js
var Button = __webpack_require__("cWnB");

// EXTERNAL MODULE: ./context/Firebase.js + 6 modules
var Firebase = __webpack_require__("NY6m");

// CONCATENATED MODULE: ./pages/NewSearch/item/[id]/NewLocal.js


var __jsx = react_default.a.createElement;
// NewLocal.js



function NewLocal(_ref) {
  var _ref$onSave = _ref.onSave,
      onSave = _ref$onSave === void 0 ? function () {} : _ref$onSave,
      _ref$onCancel = _ref.onCancel,
      onCancel = _ref$onCancel === void 0 ? function () {} : _ref$onCancel,
      selectedClient = _ref.selectedClient,
      showLocalLoc = _ref.showLocalLoc,
      _ref$value = _ref.value,
      value = _ref$value === void 0 ? {} : _ref$value,
      onChange = _ref.onChange;

  var _useState = Object(react["useState"])([]),
      regionOptions = _useState[0],
      setRegionOptions = _useState[1];

  var _useState2 = Object(react["useState"])({}),
      sectionMap = _useState2[0],
      setSectionMap = _useState2[1];

  var _useState3 = Object(react["useState"])(0),
      binCount = _useState3[0],
      setBinCount = _useState3[1];

  var _useState4 = Object(react["useState"])(0),
      palletCount = _useState4[0],
      setPalletCount = _useState4[1];

  var _useState5 = Object(react["useState"])(""),
      region = _useState5[0],
      setRegion = _useState5[1];

  var _useState6 = Object(react["useState"])(""),
      sectionLetter = _useState6[0],
      setSectionLetter = _useState6[1];

  var _useState7 = Object(react["useState"])(""),
      sectionNumber = _useState7[0],
      setSectionNumber = _useState7[1];

  var _useState8 = Object(react["useState"])(""),
      binSelected = _useState8[0],
      setBinSelected = _useState8[1];

  var _useState9 = Object(react["useState"])(""),
      palletSelected = _useState9[0],
      setPalletSelected = _useState9[1]; // 1) load directory exactly as before


  Object(react["useEffect"])(function () {
    if (!showLocalLoc) return;
    var db = Firebase["b" /* default */].firestore();
    db.collection("Warehouse").doc("directory").get().then(function (doc) {
      var d = doc.data() || {};
      setRegionOptions(d.Region || []);
      setSectionMap(d.Section || {});
      setBinCount(d.Bin || 0);
      setPalletCount(d.Pallet || 0);
    });
  }, [showLocalLoc]); // 2) when we open the modal (or value changes), initialize from value

  Object(react["useEffect"])(function () {
    var _value$section, _value$section2, _value$bin, _value$pallet;

    if (!showLocalLoc) return;
    setRegion(value.region || "");
    setSectionLetter(((_value$section = value.section) === null || _value$section === void 0 ? void 0 : _value$section.letter) || "");
    setSectionNumber(((_value$section2 = value.section) === null || _value$section2 === void 0 ? void 0 : _value$section2.number) || "");
    setBinSelected(((_value$bin = value.bin) === null || _value$bin === void 0 ? void 0 : _value$bin.toString()) || "");
    setPalletSelected(((_value$pallet = value.pallet) === null || _value$pallet === void 0 ? void 0 : _value$pallet.toString()) || "");
  }, [showLocalLoc]); // 3) notify parent on any change

  Object(react["useEffect"])(function () {
    var p = {};
    if (region) p.region = region;
    if (sectionLetter && sectionNumber) p.section = {
      letter: sectionLetter,
      number: sectionNumber
    };
    if (binSelected) p.bin = parseInt(binSelected, 10);
    if (palletSelected) p.pallet = parseInt(palletSelected, 10);
    onChange(p);
  }, [region, sectionLetter, sectionNumber, binSelected, palletSelected]); // helpers:

  var letters = Array.from({
    length: 26
  }, function (_, i) {
    return String.fromCharCode(65 + i);
  });
  var numbers = Array.from({
    length: 50
  }, function (_, i) {
    return i + 1;
  });
  var binOptions = Array.from({
    length: binCount
  }, function (_, i) {
    return i + 1;
  });
  var palletOptions = Array.from({
    length: palletCount
  }, function (_, i) {
    return i + 1;
  }); // bump and persist bin count

  var handleAddBin = /*#__PURE__*/function () {
    var _ref2 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee() {
      var next;
      return regenerator_default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              next = binCount + 1;
              _context.next = 3;
              return Firebase["b" /* default */].firestore().collection("Warehouse").doc("directory").update({
                Bin: next
              });

            case 3:
              setBinCount(next);
              setBinSelected(next.toString());

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function handleAddBin() {
      return _ref2.apply(this, arguments);
    };
  }(); // bump and persist pallet count


  var handleAddPallet = /*#__PURE__*/function () {
    var _ref3 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee2() {
      var next;
      return regenerator_default.a.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              next = palletCount + 1;
              _context2.next = 3;
              return Firebase["b" /* default */].firestore().collection("Warehouse").doc("directory").update({
                Pallet: next
              });

            case 3:
              setPalletCount(next);
              setPalletSelected(next.toString());

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function handleAddPallet() {
      return _ref3.apply(this, arguments);
    };
  }(); // only fire parent when they click OK


  var handleOk = function handleOk() {
    var p = {};
    if (region) p.region = region;
    if (sectionLetter && sectionNumber) p.section = {
      letter: sectionLetter,
      number: sectionNumber
    };
    if (binSelected) p.bin = parseInt(binSelected, 10);
    if (palletSelected) p.pallet = parseInt(palletSelected, 10);
    onSave(p);
  };

  return __jsx("div", null, __jsx(Row["a" /* default */], null, __jsx(Col["a" /* default */], null, __jsx(Form["a" /* default */].Group, null, __jsx(Form["a" /* default */].Label, null, "Region"), __jsx(Form["a" /* default */].Select, {
    value: region,
    onChange: function onChange(e) {
      return setRegion(e.target.value);
    }
  }, __jsx("option", {
    value: ""
  }, "Select region"), regionOptions.map(function (r) {
    return __jsx("option", {
      key: r,
      value: r
    }, r);
  })))), __jsx(Col["a" /* default */], null, __jsx(Form["a" /* default */].Group, null, __jsx(Form["a" /* default */].Label, null, "Section Letter"), __jsx(Form["a" /* default */].Select, {
    value: sectionLetter,
    onChange: function onChange(e) {
      return setSectionLetter(e.target.value);
    } // disabled={!region}

  }, __jsx("option", {
    value: ""
  }, "Letter"), letters.map(function (l) {
    return __jsx("option", {
      key: l,
      value: l
    }, l);
  })))), __jsx(Col["a" /* default */], null, __jsx(Form["a" /* default */].Group, null, __jsx(Form["a" /* default */].Label, null, "Section Number"), __jsx(Form["a" /* default */].Select, {
    value: sectionNumber,
    onChange: function onChange(e) {
      return setSectionNumber(e.target.value);
    } // disabled={!region}

  }, __jsx("option", {
    value: ""
  }, "Number"), numbers.map(function (n) {
    return __jsx("option", {
      key: n,
      value: n
    }, n);
  }))))), __jsx(Row["a" /* default */], {
    className: "mt-3"
  }, __jsx(Col["a" /* default */], null, __jsx(Form["a" /* default */].Group, null, __jsx(Form["a" /* default */].Label, null, "Bin"), __jsx(esm_Stack, {
    direction: "horizontal",
    gap: 2
  }, __jsx(Form["a" /* default */].Select, {
    value: binSelected,
    onChange: function onChange(e) {
      return setBinSelected(e.target.value);
    } // disabled={!region}

  }, __jsx("option", {
    value: ""
  }, "Select bin"), binOptions.map(function (b) {
    return __jsx("option", {
      key: b,
      value: b
    }, b);
  })), __jsx(Button["a" /* default */], {
    variant: "outline-secondary",
    onClick: handleAddBin
  }, "+ Bin")))), __jsx(Col["a" /* default */], null, __jsx(Form["a" /* default */].Group, null, __jsx(Form["a" /* default */].Label, null, "Pallet"), __jsx(esm_Stack, {
    direction: "horizontal",
    gap: 2
  }, __jsx(Form["a" /* default */].Select, {
    value: palletSelected,
    onChange: function onChange(e) {
      return setPalletSelected(e.target.value);
    } // disabled={!region}

  }, __jsx("option", {
    value: ""
  }, "Select pallet"), palletOptions.map(function (p) {
    return __jsx("option", {
      key: p,
      value: p
    }, p);
  })), __jsx(Button["a" /* default */], {
    variant: "outline-secondary",
    onClick: handleAddPallet
  }, "+ Pallet"))))), __jsx(Row["a" /* default */], {
    className: "mt-4"
  }, __jsx(Col["a" /* default */], null, __jsx("div", {
    className: "mt-3 text-end"
  }, __jsx(Button["a" /* default */], {
    variant: "secondary",
    onClick: onCancel
  }, "Cancel"), __jsx(Button["a" /* default */], {
    variant: "primary",
    onClick: handleOk
  }, "OK")))));
}

/***/ }),

/***/ "MbKa":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("zM5D");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("MBJH");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("cWnB");
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;
// ClientInfoModal.js



var ClientInfoModal = function ClientInfoModal(_ref) {
  var show = _ref.show,
      handleClose = _ref.handleClose,
      selectedClient = _ref.selectedClient,
      _ref$machineOptions = _ref.machineOptions,
      machineOptions = _ref$machineOptions === void 0 ? [] : _ref$machineOptions,
      setSelectedMachine = _ref.setSelectedMachine;
  // Add warehouse options here
  // const warehouseOptions = [
  //   { id: "warehouse-socal", name: "SoCalWarehouse", local: "" },
  //   { id: "warehouse-norcal", name: "NorCalWarehouse", local: "" },
  // ];
  return __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"], {
    show: show,
    onHide: handleClose
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].Header, {
    closeButton: true
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].Title, null, "Select a Machine or Warehouse")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].Body, null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], {
    striped: true,
    bordered: true,
    hover: true,
    size: "sm"
  }, __jsx("thead", null, __jsx("tr", null, __jsx("th", null, "Name"), __jsx("th", null, "Location"), __jsx("th", null, "Select"))), __jsx("tbody", null, machineOptions.map(function (machine) {
    return __jsx("tr", {
      key: machine.id
    }, __jsx("td", null, machine.name), __jsx("td", null, machine.local), __jsx("td", null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], {
      variant: "primary",
      onClick: function onClick() {
        return setSelectedMachine(machine);
      }
    }, "Select")));
  })))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].Footer, null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], {
    variant: "secondary",
    onClick: handleClose
  }, "Close")));
};

/* harmony default export */ __webpack_exports__["default"] = (ClientInfoModal);

/***/ }),

/***/ "NySP":
/***/ (function(module, exports, __webpack_require__) {


    (window.__NEXT_P = window.__NEXT_P || []).push([
      "/NewSearch/item/[id]",
      function () {
        return __webpack_require__("oysE");
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

/***/ "VZWn":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("zM5D");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("cWnB");
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;
// InfoModal.js



var InfoModal = function InfoModal(_ref) {
  var show = _ref.show,
      handleClose = _ref.handleClose,
      itemName = _ref.itemName,
      dimensions = _ref.dimensions,
      price = _ref.price,
      freqI = _ref.freqI,
      freqM = _ref.freqM,
      usage = _ref.usage;
  return __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"], {
    show: show,
    onHide: handleClose
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].Header, {
    closeButton: true
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].Title, null, "Item Info")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].Body, null, __jsx("p", null, __jsx("strong", null, "Name:"), " ", itemName, " "), __jsx("p", null, __jsx("strong", null, "Dimensions:"), " ", dimensions), __jsx("p", null, __jsx("strong", null, "Price:"), " ", price), __jsx("p", null, __jsx("strong", null, "Frequency of item:"), " ", freqI, " "), __jsx("p", null, __jsx("strong", null, "Frequency of Machine:"), " ", freqM, " "), __jsx("p", null, __jsx("strong", null, "Usage past 1 year:"), " ", usage, " ")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].Footer, null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], {
    variant: "secondary",
    onClick: handleClose
  }, "Close")));
};

/* harmony default export */ __webpack_exports__["default"] = (InfoModal);

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

/***/ }),

/***/ "oysE":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "__N_SSP", function() { return /* binding */ __N_SSP; });
__webpack_require__.d(__webpack_exports__, "default", function() { return /* binding */ DisplayItem; });

// EXTERNAL MODULE: ./node_modules/next/node_modules/@babel/runtime/helpers/esm/toConsumableArray.js + 3 modules
var toConsumableArray = __webpack_require__("z7pX");

// EXTERNAL MODULE: ./node_modules/next/node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__("vJKn");
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);

// EXTERNAL MODULE: ./node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("rg98");

// EXTERNAL MODULE: ./node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__("cpVT");

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__("q1tI");
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/bootstrap/dist/css/bootstrap.min.css
var bootstrap_min = __webpack_require__("q4sD");

// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/Modal.js + 19 modules
var Modal = __webpack_require__("zM5D");

// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/Button.js
var Button = __webpack_require__("cWnB");

// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/Row.js
var Row = __webpack_require__("3Z9Z");

// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/Col.js
var Col = __webpack_require__("JI6e");

// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/Form.js + 11 modules
var Form = __webpack_require__("QojX");

// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/FormControl.js
var FormControl = __webpack_require__("jDKy");

// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/Container.js
var Container = __webpack_require__("7vrA");

// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/Card.js + 10 modules
var Card = __webpack_require__("6xyR");

// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/InputGroup.js + 1 modules
var InputGroup = __webpack_require__("zUrK");

// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/ButtonGroup.js
var ButtonGroup = __webpack_require__("pJDg");

// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/Collapse.js + 1 modules
var Collapse = __webpack_require__("vYJ8");

// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__("YFqc");
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);

// EXTERNAL MODULE: ./context/AuthUserContext.js + 1 modules
var AuthUserContext = __webpack_require__("XrFm");

// EXTERNAL MODULE: ./context/Firebase.js + 6 modules
var Firebase = __webpack_require__("NY6m");

// EXTERNAL MODULE: ./pages/LoggedIn.js
var LoggedIn = __webpack_require__("mJJZ");

// EXTERNAL MODULE: ./node_modules/next/router.js
var next_router = __webpack_require__("20a2");

// EXTERNAL MODULE: ./utils/fetchAssociations.js
var fetchAssociations = __webpack_require__("qoNY");

// EXTERNAL MODULE: ./utils/ClientTable.js
var ClientTable = __webpack_require__("8HvV");

// EXTERNAL MODULE: ./pages/NewSearch/ClientInfoModal.js
var ClientInfoModal = __webpack_require__("MbKa");

// EXTERNAL MODULE: ./pages/NewSearch/AddItem/parentModal.js
var parentModal = __webpack_require__("oGF+");

// EXTERNAL MODULE: ./node_modules/next/dynamic.js
var dynamic = __webpack_require__("Vvt1");
var dynamic_default = /*#__PURE__*/__webpack_require__.n(dynamic);

// EXTERNAL MODULE: ./pages/NewSearch/InfoModal.js
var InfoModal = __webpack_require__("VZWn");

// EXTERNAL MODULE: ./pages/NewSearch/item/[id]/MachineSelectionModal.js
var MachineSelectionModal = __webpack_require__("cJ15");

// CONCATENATED MODULE: ./utils/BluefolderService.js




function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { Object(defineProperty["a" /* default */])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// BluefolderService.js
var API_TOKEN = "9b224624-44db-49dd-9042-c3b15e9a39d4"; // your token

var ITEMS_URL = "https://app.bluefolder.com/api/2.0/items/add.aspx";
var MATERIALS_URL = "https://app.bluefolder.com/api/2.0/serviceRequests/addMaterial.aspx";
var HEADERS = {
  "Content-Type": "text/xml"
};
function addServiceItem(_x, _x2) {
  return _addServiceItem.apply(this, arguments);
}

function _addServiceItem() {
  _addServiceItem = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee(serviceRequestId, item) {
    var uniqueName, itemPayload, itemResponse, itemText, parser, itemXml, itemIdElem, itemId, nowStr, comment, materialPayload, materialResponse, materialText, materialXml;
    return regenerator_default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // Use "Service Item" for name and description
            uniqueName = "Service Item"; // Step 1: Create a new material item in BlueFolder

            itemPayload = "\n    <request>\n      <itemAdd>\n        <itemType>materials</itemType>\n        <itemName>".concat(uniqueName, "</itemName>\n        <description>Service Item</description>\n        <accountName></accountName>\n        <isFlatRate>false</isFlatRate>\n        <mfrDescription></mfrDescription>\n        <mfrItemNo></mfrItemNo>\n        <mfrName>BlueFolderTestManufacturer</mfrName>\n        <notes>Service Item</notes>\n        <taxableDefault>true</taxableDefault>\n        <unitCost>0.00</unitCost>\n        <unitPrice>0.00</unitPrice>\n        <unitListPrice>0.00</unitListPrice>\n      </itemAdd>\n    </request>\n  ");
            _context.next = 4;
            return fetch(ITEMS_URL, {
              method: "POST",
              headers: _objectSpread(_objectSpread({}, HEADERS), {}, {
                Authorization: "Basic " + btoa(API_TOKEN + ":x")
              }),
              body: itemPayload
            });

          case 4:
            itemResponse = _context.sent;
            _context.next = 7;
            return itemResponse.text();

          case 7:
            itemText = _context.sent;
            parser = new DOMParser();
            itemXml = parser.parseFromString(itemText, "application/xml");

            if (!(itemXml.documentElement.getAttribute("status") !== "ok")) {
              _context.next = 12;
              break;
            }

            throw new Error("Failed to create material item in BlueFolder");

          case 12:
            itemIdElem = itemXml.getElementsByTagName("itemId")[0];
            itemId = itemIdElem ? itemIdElem.textContent : null; // Step 2: Add the material to the specified work order

            nowStr = new Date().toLocaleString("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true
            });
            comment = "Name: ".concat(item.name, "\nPN: ").concat(item.pn, "\nSN: ").concat(item.sn, "\nStatus: ").concat(item.status, "\nDescription: ").concat(item.description);
            materialPayload = "\n    <request>\n      <serviceRequestAddMaterial>\n        <serviceRequestId>".concat(serviceRequestId, "</serviceRequestId>\n        <dateUsed>").concat(nowStr, "</dateUsed>\n        <quantity>1</quantity>\n        <billingStatus>billable</billingStatus>\n        <itemNo>").concat(uniqueName, "</itemNo>\n        <itemDescription>Service Item</itemDescription>\n        <itemUnitCost>0.00</itemUnitCost>\n        <itemUnitPrice>0.00</itemUnitPrice>\n        <comment>").concat(comment, "</comment>\n        <commentIsPublic>false</commentIsPublic>\n        <taxable>true</taxable>\n      </serviceRequestAddMaterial>\n    </request>\n  ");
            _context.next = 19;
            return fetch(MATERIALS_URL, {
              method: "POST",
              headers: _objectSpread(_objectSpread({}, HEADERS), {}, {
                Authorization: "Basic " + btoa(API_TOKEN + ":x")
              }),
              body: materialPayload
            });

          case 19:
            materialResponse = _context.sent;
            _context.next = 22;
            return materialResponse.text();

          case 22:
            materialText = _context.sent;
            materialXml = parser.parseFromString(materialText, "application/xml");

            if (!(materialXml.documentElement.getAttribute("status") !== "ok")) {
              _context.next = 26;
              break;
            }

            throw new Error("Failed to add material to work order in BlueFolder");

          case 26:
            return _context.abrupt("return", {
              itemId: itemId,
              materialResponse: materialText
            });

          case 27:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _addServiceItem.apply(this, arguments);
}
// EXTERNAL MODULE: ./pages/NewSearch/item/[id]/NewLocal.js + 2 modules
var NewLocal = __webpack_require__("7wmr");

// CONCATENATED MODULE: ./node_modules/next/node_modules/@babel/runtime/helpers/esm/classCallCheck.js
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
// CONCATENATED MODULE: ./node_modules/next/node_modules/@babel/runtime/helpers/esm/createClass.js
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
// CONCATENATED MODULE: ./utils/inflowAPI.js






function inflowAPI_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function inflowAPI_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { inflowAPI_ownKeys(Object(source), true).forEach(function (key) { Object(defineProperty["a" /* default */])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { inflowAPI_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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
var BASE_URL = 'https://cloudapi.inflowinventory.com';
var COMPANY_ID = 'e28dc600-32a4-4438-a374-68df72caebbd';
var API_KEY = '10336E10F0BF982AB7AEB639D2FEB3B2B1C9BD73634D153EA81EE2130A70F9C4-1';
var headers = {
  Authorization: "Bearer ".concat(API_KEY),
  'Content-Type': 'application/json',
  // stick to a stable version you know works in your tenant:
  Accept: 'application/json;version=2024-10-01'
};

var n = function n(s) {
  return (s !== null && s !== void 0 ? s : '').toString().trim();
};

function parseText(_x) {
  return _parseText.apply(this, arguments);
} // ---- EXACT lookup helpers (no fuzzy/SMART fallback) ------------------------


function _parseText() {
  _parseText = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee2(res) {
    var t;
    return regenerator_default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return res.text();

          case 2:
            t = _context2.sent;
            _context2.prev = 3;
            return _context2.abrupt("return", {
              json: JSON.parse(t),
              raw: t
            });

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](3);
            return _context2.abrupt("return", {
              json: null,
              raw: t
            });

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[3, 7]]);
  }));
  return _parseText.apply(this, arguments);
}

function findProductIdByExactName(_x2) {
  return _findProductIdByExactName.apply(this, arguments);
} // Prefer direct GET /products/{id}; fallback to collection filter by id


function _findProductIdByExactName() {
  _findProductIdByExactName = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee3(name) {
    var nameNorm, url, res, data, items, item;
    return regenerator_default.a.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            nameNorm = n(name);

            if (nameNorm) {
              _context3.next = 3;
              break;
            }

            return _context3.abrupt("return", null);

          case 3:
            url = "".concat(BASE_URL, "/").concat(COMPANY_ID, "/products?filter[name]=") + "".concat(encodeURIComponent(nameNorm), "&count=1");
            _context3.next = 6;
            return fetch(url, {
              headers: headers
            });

          case 6:
            res = _context3.sent;

            if (res.ok) {
              _context3.next = 9;
              break;
            }

            return _context3.abrupt("return", null);

          case 9:
            _context3.next = 11;
            return res.json();

          case 11:
            data = _context3.sent;
            items = Array.isArray(data === null || data === void 0 ? void 0 : data.items) ? data.items : Array.isArray(data) ? data : [];
            item = items[0];

            if (item) {
              _context3.next = 16;
              break;
            }

            return _context3.abrupt("return", null);

          case 16:
            if (!(n(item.name).toLowerCase() !== nameNorm.toLowerCase())) {
              _context3.next = 18;
              break;
            }

            return _context3.abrupt("return", null);

          case 18:
            return _context3.abrupt("return", item.productId || item.id || null);

          case 19:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _findProductIdByExactName.apply(this, arguments);
}

function getProductById(_x3) {
  return _getProductById.apply(this, arguments);
}

function _getProductById() {
  _getProductById = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee4(productId) {
    var res, data, items;
    return regenerator_default.a.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return fetch("".concat(BASE_URL, "/").concat(COMPANY_ID, "/products/").concat(encodeURIComponent(productId)), {
              headers: headers
            });

          case 2:
            res = _context4.sent;

            if (!res.ok) {
              _context4.next = 5;
              break;
            }

            return _context4.abrupt("return", res.json());

          case 5:
            _context4.next = 7;
            return fetch("".concat(BASE_URL, "/").concat(COMPANY_ID, "/products?filter[productId]=").concat(encodeURIComponent(productId), "&count=1"), {
              headers: headers
            });

          case 7:
            res = _context4.sent;

            if (res.ok) {
              _context4.next = 10;
              break;
            }

            return _context4.abrupt("return", null);

          case 10:
            _context4.next = 12;
            return res.json();

          case 12:
            data = _context4.sent;
            items = Array.isArray(data === null || data === void 0 ? void 0 : data.items) ? data.items : Array.isArray(data) ? data : [];
            return _context4.abrupt("return", items[0] || null);

          case 15:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _getProductById.apply(this, arguments);
}

function buildImages() {
  var imageUrls = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return imageUrls.filter(Boolean).map(function (u) {
    return {
      imageId: crypto.randomUUID(),
      originalUrl: u
    };
  });
}

var inflowAPI_InflowAPI = /*#__PURE__*/function () {
  function InflowAPI() {
    _classCallCheck(this, InflowAPI);
  }

  _createClass(InflowAPI, null, [{
    key: "upsertProduct",

    /**
     * Strict upsert: exact-name reuse only; verify by id afterward.
     */
    value: function () {
      var _upsertProduct = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee(_ref) {
        var _ref2, _after$isActive;

        var productId, name, description, _ref$imageUrls, imageUrls, sku, customFields, nameNorm, id, payload, res, _yield$parseText, json, raw, resolvedId, after;

        return regenerator_default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                productId = _ref.productId, name = _ref.name, description = _ref.description, _ref$imageUrls = _ref.imageUrls, imageUrls = _ref$imageUrls === void 0 ? [] : _ref$imageUrls, sku = _ref.sku, customFields = _ref.customFields;
                nameNorm = n(name);

                if (nameNorm) {
                  _context.next = 4;
                  break;
                }

                throw new Error('Name is required');

              case 4:
                if (productId) {
                  _context.next = 8;
                  break;
                }

                _context.next = 7;
                return findProductIdByExactName(nameNorm);

              case 7:
                productId = _context.sent;

              case 8:
                id = productId || crypto.randomUUID();
                payload = inflowAPI_objectSpread(inflowAPI_objectSpread(inflowAPI_objectSpread(inflowAPI_objectSpread({
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
                  customFields: customFields
                } : {});
                console.log('[inFlow] PUT payload:', payload);
                _context.next = 13;
                return fetch("".concat(BASE_URL, "/").concat(COMPANY_ID, "/products"), {
                  method: 'PUT',
                  headers: headers,
                  body: JSON.stringify(payload)
                });

              case 13:
                res = _context.sent;
                _context.next = 16;
                return parseText(res);

              case 16:
                _yield$parseText = _context.sent;
                json = _yield$parseText.json;
                raw = _yield$parseText.raw;
                console.log('[inFlow] Raw PUT response:', res.status, raw);

                if (res.ok) {
                  _context.next = 22;
                  break;
                }

                throw new Error("inFlow API error (".concat(res.status, "): ").concat(raw));

              case 22:
                // prefer the id the server gave us (if any), else the one we sent
                resolvedId = json && (json.productId || json.id) || id; // Verify by ID only (no fuzzy). This prevents false “success”.

                _context.next = 25;
                return getProductById(resolvedId);

              case 25:
                after = _context.sent;
                console.log('[inFlow] Verified by ID:', {
                  productId: resolvedId,
                  name: after === null || after === void 0 ? void 0 : after.name,
                  sku: after === null || after === void 0 ? void 0 : after.sku,
                  // many tenants surface one of these; log whatever exists so you can tell if it’s hidden
                  isActive: (_ref2 = (_after$isActive = after === null || after === void 0 ? void 0 : after.isActive) !== null && _after$isActive !== void 0 ? _after$isActive : after === null || after === void 0 ? void 0 : after.active) !== null && _ref2 !== void 0 ? _ref2 : after === null || after === void 0 ? void 0 : after.status,
                  categoryId: after === null || after === void 0 ? void 0 : after.categoryId
                });

                if (after) {
                  _context.next = 29;
                  break;
                }

                throw new Error('Write appeared to succeed, but GET by id returned nothing.');

              case 29:
                return _context.abrupt("return", after);

              case 30:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function upsertProduct(_x4) {
        return _upsertProduct.apply(this, arguments);
      }

      return upsertProduct;
    }()
  }]);

  return InflowAPI;
}();

/* harmony default export */ var inflowAPI = (inflowAPI_InflowAPI);
// CONCATENATED MODULE: ./pages/NewSearch/item/[id]/index.js




var __jsx = react_default.a.createElement;

function _id_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _id_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { _id_ownKeys(Object(source), true).forEach(function (key) { Object(defineProperty["a" /* default */])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { _id_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

















 //inflow API

 // Import for SSR

// === BUILD A MAP ONLY OF THOSE FIELDS THE USER ACTUALLY PICKED ===
function buildLocalLocObject(loc) {
  var _loc$section, _loc$section2;

  var o = {};
  if (loc.region) o.region = loc.region;
  if ((_loc$section = loc.section) !== null && _loc$section !== void 0 && _loc$section.letter && (_loc$section2 = loc.section) !== null && _loc$section2 !== void 0 && _loc$section2.number) o.section = loc.section; // pick up the new singular fields, too:

  if (loc.bin !== undefined && loc.bin !== "") o.bin = loc.bin;
  if (loc.pallet !== undefined && loc.pallet !== "") o.pallet = loc.pallet;
  return o;
} // This will only load the component on the client-side.


var BarcodeScannerComponent = dynamic_default()(function () {
  return __webpack_require__.e(/* import() */ 17).then(__webpack_require__.t.bind(null, "ESy1", 7));
}, {
  ssr: false,
  loadableGenerated: {
    webpack: function webpack() {
      return [/*require.resolve*/("ESy1")];
    },
    modules: ["NewSearch\\item\\[id]\\index.js -> " + "react-qr-barcode-scanner"]
  }
}); // Simulates a network request delay.

function simulateNetworkRequest() {
  return new Promise(function (resolve) {
    return setTimeout(resolve, 2000);
  });
} // Custom LoadingButton component.


function LoadingButton(_ref) {
  var type = _ref.type,
      name = _ref.name,
      route = _ref.route;

  var _useState = Object(react["useState"])(false),
      isLoading = _useState[0],
      setLoading = _useState[1];

  Object(react["useEffect"])(function () {
    if (isLoading) {
      simulateNetworkRequest().then(function () {
        return setLoading(false);
      });
    }
  }, [isLoading]);

  var handleClick = function handleClick() {
    return setLoading(true);
  };

  return __jsx(link_default.a, {
    href: "/".concat(route)
  }, __jsx("a", {
    className: "btn btn-".concat(type),
    disabled: isLoading,
    onClick: !isLoading ? handleClick : null
  }, isLoading ? "Loading…" : name));
}

var __N_SSP = true;
function DisplayItem(_ref2) {
  var _initialItem$price, _initialItem$status, _initialItem$length, _initialItem$width, _initialItem$height, _initialItem$poNumber, _initialItem$tracking, _initialItem$visible, _descriptions$selecte3, _descriptions$selecte4, _newLocalFrom$section, _newLocalFrom$section2, _newLocalCurrent$sect, _newLocalCurrent$sect2;

  var initialItem = _ref2.initialItem,
      initialMachineData = _ref2.initialMachineData,
      error = _ref2.error;
  var router = Object(next_router["useRouter"])();

  var _useAuth = Object(AuthUserContext["b" /* useAuth */])(),
      signOut = _useAuth.signOut; // const { id } = router.query;


  var idFromRouter = router.query.id;
  var initialId = (initialItem === null || initialItem === void 0 ? void 0 : initialItem.id) || idFromRouter; // Use a single local var everywhere in this component

  var id = initialId;

  var _useState2 = Object(react["useState"])({
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
  }),
      items = _useState2[0],
      setItems = _useState2[1]; // ⬇️ put this INSIDE DisplayItem, after the related useState hooks


  Object(react["useEffect"])(function () {
    if (!initialItem) return;
    setDescriptions(initialItem.descriptions || []);
    setWorkOrders(initialItem.workOrders || []);
    setDOM(initialItem.DOM || "");
    setItems(function (prev) {
      var _ref3, _initialItem$status2, _ref4, _initialItem$price2, _ref5, _initialItem$length2, _ref6, _initialItem$width2, _ref7, _initialItem$height2, _ref8, _initialItem$poNumber2, _ref9, _initialItem$tracking2;

      return _id_objectSpread(_id_objectSpread({}, prev), {}, {
        // only overwrite if SSR provided a value; otherwise keep what you have
        status: (_ref3 = (_initialItem$status2 = initialItem.status) !== null && _initialItem$status2 !== void 0 ? _initialItem$status2 : prev.status) !== null && _ref3 !== void 0 ? _ref3 : "",
        price: (_ref4 = (_initialItem$price2 = initialItem.price) !== null && _initialItem$price2 !== void 0 ? _initialItem$price2 : prev.price) !== null && _ref4 !== void 0 ? _ref4 : "",
        length: (_ref5 = (_initialItem$length2 = initialItem.length) !== null && _initialItem$length2 !== void 0 ? _initialItem$length2 : prev.length) !== null && _ref5 !== void 0 ? _ref5 : "",
        width: (_ref6 = (_initialItem$width2 = initialItem.width) !== null && _initialItem$width2 !== void 0 ? _initialItem$width2 : prev.width) !== null && _ref6 !== void 0 ? _ref6 : "",
        height: (_ref7 = (_initialItem$height2 = initialItem.height) !== null && _initialItem$height2 !== void 0 ? _initialItem$height2 : prev.height) !== null && _ref7 !== void 0 ? _ref7 : "",
        poNumber: (_ref8 = (_initialItem$poNumber2 = initialItem.poNumber) !== null && _initialItem$poNumber2 !== void 0 ? _initialItem$poNumber2 : prev.poNumber) !== null && _ref8 !== void 0 ? _ref8 : "",
        trackingNumber: (_ref9 = (_initialItem$tracking2 = initialItem.trackingNumber) !== null && _initialItem$tracking2 !== void 0 ? _initialItem$tracking2 : prev.trackingNumber) !== null && _ref9 !== void 0 ? _ref9 : ""
      });
    });
  }, [initialItem]);

  var _useState3 = Object(react["useState"])({
    region: "",
    section: {
      letter: "",
      number: ""
    },
    bin: "",
    pallet: ""
  }),
      newLocalFrom = _useState3[0],
      setNewLocalFrom = _useState3[1];

  var _useState4 = Object(react["useState"])({
    region: "",
    section: {
      letter: "",
      number: ""
    },
    bin: "",
    pallet: ""
  }),
      newLocalCurrent = _useState4[0],
      setNewLocalCurrent = _useState4[1]; // New states for separate client selections:


  var _useState5 = Object(react["useState"])(null),
      selectedClientFrom = _useState5[0],
      setSelectedClientFrom = _useState5[1];

  var _useState6 = Object(react["useState"])(null),
      selectedClientCurrent = _useState6[0],
      setSelectedClientCurrent = _useState6[1];

  var _useState7 = Object(react["useState"])(null),
      selectedMachine = _useState7[0],
      setSelectedMachine = _useState7[1];

  var _useState8 = Object(react["useState"])(null),
      selectedCurrentMachine = _useState8[0],
      setSelectedCurrentMachine = _useState8[1]; // whenever you pick a new “From” client or machine, clear the old From-loc:
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


  var _useState9 = Object(react["useState"])([]),
      pnOptions = _useState9[0],
      setPnOptions = _useState9[1];

  var _useState10 = Object(react["useState"])([]),
      snOptions = _useState10[0],
      setSnOptions = _useState10[1];

  var _useState11 = Object(react["useState"])([{
    description: "",
    date: ""
  }]),
      descriptions = _useState11[0],
      setDescriptions = _useState11[1];

  var _useState12 = Object(react["useState"])([{
    workOrder: "",
    date: ""
  }]),
      workOrders = _useState12[0],
      setWorkOrders = _useState12[1];

  var _useState13 = Object(react["useState"])([]),
      clients = _useState13[0],
      setClients = _useState13[1];

  var _useState14 = Object(react["useState"])([]),
      photos = _useState14[0],
      setPhotos = _useState14[1];

  var _useState15 = Object(react["useState"])(false),
      show = _useState15[0],
      setShow = _useState15[1];

  var _useState16 = Object(react["useState"])(false),
      showErr = _useState16[0],
      setShowErr = _useState16[1];

  var _useState17 = Object(react["useState"])("N/A"),
      Err = _useState17[0],
      setErr = _useState17[1];

  var _useState18 = Object(react["useState"])(false),
      showDescModal = _useState18[0],
      setShowDescModal = _useState18[1];

  var _useState19 = Object(react["useState"])(false),
      showWoModal = _useState19[0],
      setShowWoModal = _useState19[1];

  var _useState20 = Object(react["useState"])(false),
      showClientModal = _useState20[0],
      setShowClientModal = _useState20[1];

  var _useState21 = Object(react["useState"])(false),
      showMachineModal = _useState21[0],
      setShowMachineModal = _useState21[1];

  var _useState22 = Object(react["useState"])(false),
      showParentModal = _useState22[0],
      setShowParentModal = _useState22[1];

  var _useState23 = Object(react["useState"])(false),
      showCameraModal = _useState23[0],
      setShowCameraModal = _useState23[1];

  var _useState24 = Object(react["useState"])(false),
      showSaveModal = _useState24[0],
      setShowSaveModal = _useState24[1];

  var _useState25 = Object(react["useState"])(false),
      showPrintModal = _useState25[0],
      setShowPrintModal = _useState25[1];

  var _useState26 = Object(react["useState"])(false),
      machineSelectionModal = _useState26[0],
      setMachineSelectionModal = _useState26[1];

  var _useState27 = Object(react["useState"])(0),
      selectedDesc = _useState27[0],
      setSelectedDesc = _useState27[1];

  var _useState28 = Object(react["useState"])(null),
      selectedClient = _useState28[0],
      setSelectedClient = _useState28[1];

  var _useState29 = Object(react["useState"])(null),
      selectedParent = _useState29[0],
      setSelectedParent = _useState29[1];

  var _useState30 = Object(react["useState"])(null),
      TheMachine = _useState30[0],
      setTheMachine = _useState30[1];

  var _useState31 = Object(react["useState"])([]),
      machineOptions = _useState31[0],
      setMachineOptions = _useState31[1];

  var _useState32 = Object(react["useState"])(""),
      search = _useState32[0],
      setSearch = _useState32[1];

  var _useState33 = Object(react["useState"])(null),
      capturedPhoto = _useState33[0],
      setCapturedPhoto = _useState33[1];

  var _useState34 = Object(react["useState"])("environment"),
      cameraFacing = _useState34[0],
      setCameraFacing = _useState34[1];

  var _useState35 = Object(react["useState"])(false),
      addToWebsite = _useState35[0],
      setAddToWebsite = _useState35[1];

  var _useState36 = Object(react["useState"])(false),
      machinePick = _useState36[0],
      setMachinePick = _useState36[1];

  var _useState37 = Object(react["useState"])(0),
      freqItem = _useState37[0],
      setFreqItem = _useState37[1];

  var _useState38 = Object(react["useState"])(0),
      usagePastYear = _useState38[0],
      setUsagePastYear = _useState38[1];

  var _useState39 = Object(react["useState"])(0),
      machineFrequency = _useState39[0],
      setMachineFrequency = _useState39[1]; // State for the extra (dimensions/price/DOM/PO Number) section.


  var _useState40 = Object(react["useState"])(false),
      showExtra = _useState40[0],
      setShowExtra = _useState40[1]; // State for the local warehouse location inputs.


  var _useState41 = Object(react["useState"])(""),
      localLocFrom = _useState41[0],
      setLocalLocFrom = _useState41[1];

  var _useState42 = Object(react["useState"])(""),
      localLocCurrent = _useState42[0],
      setLocalLocCurrent = _useState42[1]; // New state for DOM (Date of Manufacture)


  var _useState43 = Object(react["useState"])(""),
      DOM = _useState43[0],
      setDOM = _useState43[1]; // New state for OEM, Modality, and Model.


  var _useState44 = Object(react["useState"])(""),
      oem = _useState44[0],
      setOem = _useState44[1];

  var _useState45 = Object(react["useState"])(""),
      modality = _useState45[0],
      setModality = _useState45[1];

  var _useState46 = Object(react["useState"])(""),
      model = _useState46[0],
      setModel = _useState46[1]; // More info modal state.


  var _useState47 = Object(react["useState"])(false),
      showInfoModal = _useState47[0],
      setShowInfoModal = _useState47[1];

  var _useState48 = Object(react["useState"])(""),
      itemName = _useState48[0],
      setItemName = _useState48[1];

  var _useState49 = Object(react["useState"])(false),
      machineFieldsInitialized = _useState49[0],
      setMachineFieldsInitialized = _useState49[1]; // near the top of DisplayItem()


  var _useState50 = Object(react["useState"])(false),
      showLocalModalFrom = _useState50[0],
      setShowLocalModalFrom = _useState50[1];

  var _useState51 = Object(react["useState"])(false),
      showLocalModalCurrent = _useState51[0],
      setShowLocalModalCurrent = _useState51[1];

  var openLocalModalFrom = function openLocalModalFrom() {
    return setShowLocalModalFrom(true);
  };

  var closeLocalModalFrom = function closeLocalModalFrom() {
    return setShowLocalModalFrom(false);
  };

  var openLocalModalCurrent = function openLocalModalCurrent() {
    return setShowLocalModalCurrent(true);
  };

  var closeLocalModalCurrent = function closeLocalModalCurrent() {
    return setShowLocalModalCurrent(false);
  }; // at the top of DisplayItem()


  var _useState52 = Object(react["useState"])(false),
      showNewLocalModalFrom = _useState52[0],
      setShowNewLocalModalFrom = _useState52[1];

  var _useState53 = Object(react["useState"])(false),
      showNewLocalModalCurrent = _useState53[0],
      setShowNewLocalModalCurrent = _useState53[1];

  function formatLoc(loc) {
    var _loc$section3, _loc$section4;

    if (!loc) return "";
    var parts = [];
    if (loc.region) parts.push(loc.region);
    if ((_loc$section3 = loc.section) !== null && _loc$section3 !== void 0 && _loc$section3.letter && (_loc$section4 = loc.section) !== null && _loc$section4 !== void 0 && _loc$section4.number) parts.push("".concat(loc.section.letter).concat(loc.section.number));
    if (loc.bin) parts.push("B".concat(loc.bin));
    if (loc.pallet) parts.push("P".concat(loc.pallet));
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


  var handleSendToInflow = /*#__PURE__*/function () {
    var _ref10 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee() {
      var _descriptions$selecte, name, description, imageUrls, sku, toCSV, arrivalISO, pnStr, snStr, mostRecentWO, customFields, created;

      return regenerator_default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              name = (items.name || '').trim();

              if (name) {
                _context.next = 5;
                break;
              }

              alert('Item needs a name before sending to inFlow.');
              return _context.abrupt("return");

            case 5:
              // Regular description (don’t also send a custom “Description” unless you truly have one)
              description = (((_descriptions$selecte = descriptions[selectedDesc]) === null || _descriptions$selecte === void 0 ? void 0 : _descriptions$selecte.description) || '').trim(); // Photos already fetched from storage

              imageUrls = photos.map(function (p) {
                return p.url;
              }).filter(Boolean); // SKU = your item id

              sku = (id !== null && id !== void 0 ? id : '').toString(); // Basic normalizers

              toCSV = function toCSV(arr) {
                return Array.isArray(arr) ? arr.filter(Boolean).join(', ') : arr || '';
              }; // YYYY-MM-DD for the date field in inFlow


              arrivalISO = items.arrival_date ? new Date(items.arrival_date).toISOString().slice(0, 10) : '';
              pnStr = Array.isArray(items.pn) ? items.pn.filter(Boolean).join(', ') : items.pn || '';
              snStr = Array.isArray(items.sn) ? items.sn.filter(Boolean).join(', ') : items.sn || ''; // Most recent WO (you already have this)

              mostRecentWO = workOrders !== null && workOrders !== void 0 && workOrders.length ? workOrders.reduce(function (latest, cur) {
                return new Date(cur.date) > new Date(latest.date) ? cur : latest;
              }, workOrders[0]) : {
                workOrder: '',
                date: ''
              }; // Build the numbered fields (match your inFlow “Field 1..10”)

              customFields = {
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
              _context.next = 17;
              return inflowAPI.upsertProduct({
                name: name,
                description: description,
                sku: sku,
                imageUrls: imageUrls,
                customFields: customFields
              });

            case 17:
              created = _context.sent;
              alert("Sent to inFlow successfully. ID: ".concat((created === null || created === void 0 ? void 0 : created.productId) || (created === null || created === void 0 ? void 0 : created.id) || '(unknown)'));
              _context.next = 25;
              break;

            case 21:
              _context.prev = 21;
              _context.t0 = _context["catch"](0);
              console.error(_context.t0);
              alert('Error sending to inFlow: ' + _context.t0.message);

            case 25:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 21]]);
    }));

    return function handleSendToInflow() {
      return _ref10.apply(this, arguments);
    };
  }(); // const [storedMachine, setStoredMachine] = useState(null);
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


  Object(react["useEffect"])(function () {
    var _selectedClientFrom$n;

    setShowLocalLocFrom((selectedClientFrom === null || selectedClientFrom === void 0 ? void 0 : (_selectedClientFrom$n = selectedClientFrom.name) === null || _selectedClientFrom$n === void 0 ? void 0 : _selectedClientFrom$n.toLowerCase()) === "socalwarehouse");
  }, [selectedClientFrom]); // whenever the “Current” client changes:

  Object(react["useEffect"])(function () {
    var _selectedClientCurren;

    setShowLocalLocCurrent((selectedClientCurrent === null || selectedClientCurrent === void 0 ? void 0 : (_selectedClientCurren = selectedClientCurrent.name) === null || _selectedClientCurren === void 0 ? void 0 : _selectedClientCurren.toLowerCase()) === "socalwarehouse");
  }, [selectedClientCurrent]); // Fetch clients data.

  Object(react["useEffect"])(function () {
    function fetchClientsData() {
      return _fetchClientsData.apply(this, arguments);
    }

    function _fetchClientsData() {
      _fetchClientsData = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee2() {
        var clientsData;
        return regenerator_default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return Object(fetchAssociations["a" /* fetchClients */])();

              case 3:
                clientsData = _context2.sent;
                console.log(clientsData);
                setClients(clientsData);
                _context2.next = 11;
                break;

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](0);
                console.error("Error fetching clients: ", _context2.t0);

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 8]]);
      }));
      return _fetchClientsData.apply(this, arguments);
    }

    fetchClientsData();
  }, []); // Fetch PN and SN options from Firebase.

  Object(react["useEffect"])(function () {
    function fetchPnSn() {
      return _fetchPnSn.apply(this, arguments);
    }

    function _fetchPnSn() {
      _fetchPnSn = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee3() {
        var db, snapshot, pnSet, snSet, pnArray, snArray;
        return regenerator_default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                db = Firebase["b" /* default */].firestore();
                _context3.next = 3;
                return db.collection("Test").get();

              case 3:
                snapshot = _context3.sent;
                pnSet = new Set();
                snSet = new Set();
                snapshot.forEach(function (doc) {
                  var data = doc.data();
                  if (data.pn) pnSet.add(data.pn);
                  if (data.sn) snSet.add(data.sn);
                });
                pnArray = Object(toConsumableArray["a" /* default */])(pnSet);
                snArray = Object(toConsumableArray["a" /* default */])(snSet);
                setPnOptions(pnArray);
                setSnOptions(snArray);

              case 11:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));
      return _fetchPnSn.apply(this, arguments);
    }

    fetchPnSn();
  }, []);
  Object(react["useEffect"])(function () {
    if (!initialItem && idFromRouter) {
      fetchData();
    }
  }, [initialItem, idFromRouter]);

  function resolveClientFromMachine(_x, _x2, _x3) {
    return _resolveClientFromMachine.apply(this, arguments);
  }

  function _resolveClientFromMachine() {
    _resolveClientFromMachine = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee14(machineRef, setClient, setMachine) {
      var isFrom,
          machineDoc,
          _machineData$name,
          machineData,
          clientDoc,
          clientName,
          isSocalInterior,
          shouldShow,
          _clientDoc2,
          _args14 = arguments;

      return regenerator_default.a.wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              isFrom = _args14.length > 3 && _args14[3] !== undefined ? _args14[3] : true;
              _context14.next = 3;
              return machineRef.get();

            case 3:
              machineDoc = _context14.sent;

              if (!machineDoc.exists) {
                _context14.next = 24;
                break;
              }

              machineData = machineDoc.data();
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

              if (!(machineData.client && typeof machineData.client.get === "function")) {
                _context14.next = 13;
                break;
              }

              _context14.next = 10;
              return machineData.client.get();

            case 10:
              _context14.t0 = _context14.sent;
              _context14.next = 14;
              break;

            case 13:
              _context14.t0 = null;

            case 14:
              clientDoc = _context14.t0;
              clientName = clientDoc && clientDoc.exists ? clientDoc.data().name : null;
              isSocalInterior = ((_machineData$name = machineData.name) === null || _machineData$name === void 0 ? void 0 : _machineData$name.toLowerCase()) === "interior socal";
              shouldShow = isSocalInterior || clientName === "SoCalWarehouse";

              if (isFrom) {
                setShowLocalLocFrom(shouldShow);
              } else {
                setShowLocalLocCurrent(shouldShow);
              }

              if (!(machineData.client && typeof machineData.client.get === "function")) {
                _context14.next = 24;
                break;
              }

              _context14.next = 22;
              return machineData.client.get();

            case 22:
              _clientDoc2 = _context14.sent;

              if (_clientDoc2.exists) {
                setClient(_id_objectSpread({
                  id: _clientDoc2.id
                }, _clientDoc2.data()));
              }

            case 24:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14);
    }));
    return _resolveClientFromMachine.apply(this, arguments);
  }

  var fetchData = /*#__PURE__*/function () {
    var _ref11 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee4() {
      var id, db, doc, _machineFromData, _machineFromData$name, _machineCurrentData, _machineCurrentData$n, _selectedClientFrom$n2, _selectedClientCurren2, data, normalizedPN, normalizedSN, clientFromDoc, clientCurrentDoc, machineFromData, machineCurrentData, _doc, _doc2, nameFrom, nameCurrent, theMachineData, _theMachineData$oem, _theMachineData$modal, _theMachineData$model, OEM, Modality, Model, merged, parentDoc;

      return regenerator_default.a.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              id = (initialItem === null || initialItem === void 0 ? void 0 : initialItem.id) || idFromRouter; // <- make sure id exists here

              db = Firebase["b" /* default */].firestore();
              _context4.next = 4;
              return db.collection("Test").doc(id).get();

            case 4:
              doc = _context4.sent;

              if (!doc.exists) {
                _context4.next = 76;
                break;
              }

              console.log("test");
              data = doc.data();
              normalizedPN = Array.isArray(data.pn) ? data.pn : [data.pn];
              normalizedSN = Array.isArray(data.sn) ? data.sn : [data.sn];
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
                setItems(function (prev) {
                  return _id_objectSpread(_id_objectSpread({}, prev), {}, {
                    poNumber: data.poNumber
                  });
                });
              }

              if (!data.ClientFrom) {
                _context4.next = 24;
                break;
              }

              _context4.next = 22;
              return data.ClientFrom.get();

            case 22:
              clientFromDoc = _context4.sent;

              if (clientFromDoc.exists) {
                setSelectedClientFrom(_id_objectSpread({
                  id: clientFromDoc.id
                }, clientFromDoc.data()));
              }

            case 24:
              if (!data.ClientCurrent) {
                _context4.next = 29;
                break;
              }

              _context4.next = 27;
              return data.ClientCurrent.get();

            case 27:
              clientCurrentDoc = _context4.sent;

              if (clientCurrentDoc.exists) {
                setSelectedClientCurrent(_id_objectSpread({
                  id: clientCurrentDoc.id
                }, clientCurrentDoc.data()));
              }

            case 29:
              if (!(!data.ClientFrom && data.Machine && typeof data.Machine.get === "function")) {
                _context4.next = 33;
                break;
              }

              console.log("Entered resolveClientFromMachine for Machine (old style for From)");
              _context4.next = 33;
              return resolveClientFromMachine(data.Machine, setSelectedClientFrom, setSelectedMachine, true);

            case 33:
              if (!(!data.ClientCurrent && data.CurrentMachine && typeof data.CurrentMachine.get === "function")) {
                _context4.next = 37;
                break;
              }

              console.log("Entered resolveClientFromMachine for CurrentMachine (old style for Current)");
              _context4.next = 37;
              return resolveClientFromMachine(data.CurrentMachine, setSelectedClientCurrent, setSelectedCurrentMachine, false);

            case 37:
              machineFromData = null;
              machineCurrentData = null;

              if (!data.MachineFrom) {
                _context4.next = 45;
                break;
              }

              _context4.next = 42;
              return data.MachineFrom.get();

            case 42:
              _doc = _context4.sent;
              machineFromData = _doc.exists ? _doc.data() : null;
              setSelectedMachine(_id_objectSpread({
                id: _doc.id
              }, _doc.data()));

            case 45:
              if (!data.MachineCurrent) {
                _context4.next = 51;
                break;
              }

              _context4.next = 48;
              return data.MachineCurrent.get();

            case 48:
              _doc2 = _context4.sent;
              machineCurrentData = _doc2.exists ? _doc2.data() : null;
              setSelectedCurrentMachine(_id_objectSpread({
                id: _doc2.id
              }, _doc2.data()));

            case 51:
              nameFrom = (_machineFromData = machineFromData) === null || _machineFromData === void 0 ? void 0 : (_machineFromData$name = _machineFromData.name) === null || _machineFromData$name === void 0 ? void 0 : _machineFromData$name.toLowerCase();
              nameCurrent = (_machineCurrentData = machineCurrentData) === null || _machineCurrentData === void 0 ? void 0 : (_machineCurrentData$n = _machineCurrentData.name) === null || _machineCurrentData$n === void 0 ? void 0 : _machineCurrentData$n.toLowerCase(); // If the machine’s name is “interior socal”, show that branch:
              // setShowLocalLocFrom(nameFrom === "interior socal");
              // // Or if your Firestore already has a value for localLocFrom, show it anyway:
              // if (data.localLocFrom) setShowLocalLocFrom(true);
              // setShowLocalLocCurrent(nameCurrent === "interior socal");
              // if (data.localLocCurrent) setShowLocalLocCurrent(true);
              // new: combine machine-name OR client-name check, keep existing-data

              setShowLocalLocFrom(nameFrom === "interior socal" || (selectedClientFrom === null || selectedClientFrom === void 0 ? void 0 : (_selectedClientFrom$n2 = selectedClientFrom.name) === null || _selectedClientFrom$n2 === void 0 ? void 0 : _selectedClientFrom$n2.toLowerCase()) === "socalwarehouse" || Boolean(data.localLocFrom));
              setShowLocalLocCurrent(nameCurrent === "interior socal" || (selectedClientCurrent === null || selectedClientCurrent === void 0 ? void 0 : (_selectedClientCurren2 = selectedClientCurrent.name) === null || _selectedClientCurren2 === void 0 ? void 0 : _selectedClientCurren2.toLowerCase()) === "socalwarehouse" || Boolean(data.localLocCurrent));
              theMachineData = data.TheMachine || null;
              setTheMachine(theMachineData);

              if (theMachineData) {
                // pull both variants, prefer lowercase if it exists
                OEM = (_theMachineData$oem = theMachineData.oem) !== null && _theMachineData$oem !== void 0 ? _theMachineData$oem : theMachineData.OEM;
                Modality = (_theMachineData$modal = theMachineData.modality) !== null && _theMachineData$modal !== void 0 ? _theMachineData$modal : theMachineData.Modality;
                Model = (_theMachineData$model = theMachineData.model) !== null && _theMachineData$model !== void 0 ? _theMachineData$model : theMachineData.Model;
                setTheMachine(_id_objectSpread(_id_objectSpread({}, theMachineData), {}, {
                  OEM: OEM,
                  Modality: Modality,
                  Model: Model
                }));
              } // setStoredMachine(theMachineData);
              // **right here** merge from the three sources you just fetched:


              merged = updateMachineFields(theMachineData, machineCurrentData, machineFromData);
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

              if (!data.Parent) {
                _context4.next = 68;
                break;
              }

              _context4.next = 66;
              return data.Parent.get();

            case 66:
              parentDoc = _context4.sent;
              setSelectedParent(_id_objectSpread({
                id: parentDoc.id
              }, parentDoc.data()));

            case 68:
              _context4.next = 70;
              return fetchPhotos(id);

            case 70:
              _context4.next = 72;
              return checkIfAddedToWebsite(id);

            case 72:
              _context4.next = 74;
              return calculateItemFrequencyAndUsage(data.pn);

            case 74:
              _context4.next = 77;
              break;

            case 76:
              router.push({
                pathname: "../AddItem/NewItem",
                query: {
                  signal: id
                }
              });

            case 77:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function fetchData() {
      return _ref11.apply(this, arguments);
    };
  }(); // Returns the value for a given field from the highest-priority source.


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

  var calculateItemFrequencyAndUsage = /*#__PURE__*/function () {
    var _ref12 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee5(pn) {
      var db, currentDate, oneYearAgo, normalizedPN, itemsSnapshot, usagePastYear;
      return regenerator_default.a.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              db = Firebase["b" /* default */].firestore();
              currentDate = new Date();
              oneYearAgo = new Date();
              oneYearAgo.setFullYear(currentDate.getFullYear() - 1);
              normalizedPN = pn !== undefined ? pn : "";
              _context5.next = 7;
              return db.collection("Test").where("pn", "==", normalizedPN).get();

            case 7:
              itemsSnapshot = _context5.sent;
              setFreqItem(itemsSnapshot.size);
              usagePastYear = 0;
              itemsSnapshot.forEach(function (doc) {
                var itemData = doc.data();
                itemData.workOrders.forEach(function (workOrder) {
                  var workOrderDate = new Date(workOrder.date);

                  if (workOrderDate >= oneYearAgo && workOrderDate <= currentDate) {
                    usagePastYear++;
                  }
                });
              });
              setUsagePastYear(usagePastYear);

            case 12:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    return function calculateItemFrequencyAndUsage(_x4) {
      return _ref12.apply(this, arguments);
    };
  }();

  var fetchMachine = /*#__PURE__*/function () {
    var _ref13 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee6(machineId) {
      var db, doc, machineData, merged, machinesSnapshot;
      return regenerator_default.a.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              db = Firebase["b" /* default */].firestore();
              _context6.next = 3;
              return db.collection("Machine").doc(machineId).get();

            case 3:
              doc = _context6.sent;

              if (!doc.exists) {
                _context6.next = 17;
                break;
              }

              machineData = doc.data();
              setTheMachine(machineData); // re-merge all three sources with correct priority:

              merged = updateMachineFields(machineData, selectedCurrentMachine, selectedMachine);
              setOem(merged.oem);
              setModality(merged.modality);
              setModel(merged.model);
              _context6.next = 13;
              return db.collection("Machine").where("Model", "==", machineData.Model || machineData.model).get();

            case 13:
              machinesSnapshot = _context6.sent;
              setMachineFrequency(machinesSnapshot.size);
              _context6.next = 18;
              break;

            case 17:
              console.error("Machine not found");

            case 18:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    return function fetchMachine(_x5) {
      return _ref13.apply(this, arguments);
    };
  }();

  var fetchPhotos = /*#__PURE__*/function () {
    var _ref14 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee7(docID) {
      var storageRef, listRef, res, urls;
      return regenerator_default.a.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              storageRef = Firebase["b" /* default */].storage().ref();
              listRef = storageRef.child("Parts/".concat(docID));
              _context7.prev = 2;
              _context7.next = 5;
              return listRef.listAll();

            case 5:
              res = _context7.sent;
              _context7.next = 8;
              return Promise.all(res.items.map(function (item) {
                return item.getDownloadURL();
              }));

            case 8:
              urls = _context7.sent;
              console.log("Fetched photo URLs:", urls);
              setPhotos(urls.map(function (url) {
                return {
                  url: url,
                  file: null
                };
              }));
              _context7.next = 16;
              break;

            case 13:
              _context7.prev = 13;
              _context7.t0 = _context7["catch"](2);
              console.error("Error fetching photos: ", _context7.t0);

            case 16:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, null, [[2, 13]]);
    }));

    return function fetchPhotos(_x6) {
      return _ref14.apply(this, arguments);
    };
  }();

  var checkIfAddedToWebsite = /*#__PURE__*/function () {
    var _ref15 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee8(docID) {
      var db, partsDoc;
      return regenerator_default.a.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              db = Firebase["b" /* default */].firestore();
              _context8.next = 3;
              return db.collection("Parts").doc(docID).get();

            case 3:
              partsDoc = _context8.sent;

              if (partsDoc.exists) {
                setAddToWebsite(true);
              }

            case 5:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    }));

    return function checkIfAddedToWebsite(_x7) {
      return _ref15.apply(this, arguments);
    };
  }();

  var handleClose = function handleClose() {
    return setShow(false);
  };

  var handleShow = function handleShow() {
    return setShow(true);
  };

  var handleCloseErr = function handleCloseErr() {
    return setShowErr(false);
  };

  var handleShowErr = function handleShowErr() {
    return setShowErr(true);
  };

  var handleCloseSaveModal = function handleCloseSaveModal() {
    return setShowSaveModal(false);
  };

  var handleClosePrintModal = function handleClosePrintModal() {
    return setShowPrintModal(false);
  };

  var handleShowSaveModal = function handleShowSaveModal() {
    return setShowSaveModal(true);
  };

  var handleShowPrintModal = function handleShowPrintModal() {
    return setShowPrintModal(true);
  };

  var handleMachineSelectionModal = function handleMachineSelectionModal() {
    return setMachineSelectionModal(false);
  };

  var handleCloseDescModal = function handleCloseDescModal() {
    return setShowDescModal(false);
  };

  var handleShowDescModal = function handleShowDescModal() {
    return setShowDescModal(true);
  };

  var handleCloseWoModal = function handleCloseWoModal() {
    return setShowWoModal(false);
  };

  var handleShowWoModal = function handleShowWoModal() {
    return setShowWoModal(true);
  };

  var handleCloseClientModal = function handleCloseClientModal() {
    return setShowClientModal(false);
  };

  var handleShowClientModal = function handleShowClientModal() {
    return setShowClientModal(true);
  };

  var handleCloseMachineModal = function handleCloseMachineModal() {
    return setShowMachineModal(false);
  };

  var handleShowMachineModal = function handleShowMachineModal() {
    setShowMachineModal(true);
    setShowClientModal(false);
  };

  var handleCloseParentModal = function handleCloseParentModal() {
    return setShowParentModal(false);
  };

  var handleShowParentModal = function handleShowParentModal() {
    return setShowParentModal(true);
  }; // When a client is selected from the client table.


  var handleClientInfo = /*#__PURE__*/function () {
    var _ref16 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee9(clientId) {
      var db, clientDoc, clientData, machinePromises, machineDocs, machines;
      return regenerator_default.a.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              // Clear any previously selected machine and local loc info for this branch.
              if (machinePick) {
                setSelectedMachine(null);
                setShowLocalLocFrom(false);
              } else {
                setSelectedCurrentMachine(null);
                setShowLocalLocCurrent(false);
              }

              db = Firebase["b" /* default */].firestore();
              _context9.next = 4;
              return db.collection("Client").doc(clientId).get();

            case 4:
              clientDoc = _context9.sent;

              if (!clientDoc.exists) {
                _context9.next = 16;
                break;
              }

              clientData = _id_objectSpread({
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


              machinePromises = clientData.machines.map(function (machineRef) {
                return machineRef.get();
              });
              _context9.next = 12;
              return Promise.all(machinePromises);

            case 12:
              machineDocs = _context9.sent;
              machines = machineDocs.map(function (machineDoc) {
                return _id_objectSpread({
                  id: machineDoc.id
                }, machineDoc.data());
              });
              setMachineOptions(machines); // Close the client modal

              handleCloseClientModal();

            case 16:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    }));

    return function handleClientInfo(_x8) {
      return _ref16.apply(this, arguments);
    };
  }(); // Reordering function for dropdowns.


  var reorderArray = function reorderArray(arr, selectedValue) {
    var newArr = arr.filter(function (val) {
      return val !== selectedValue;
    });
    return [selectedValue].concat(Object(toConsumableArray["a" /* default */])(newArr));
  };

  var _useState54 = Object(react["useState"])(false),
      addingNewPn = _useState54[0],
      setAddingNewPn = _useState54[1];

  var _useState55 = Object(react["useState"])(""),
      newPn = _useState55[0],
      setNewPn = _useState55[1];

  var _useState56 = Object(react["useState"])(false),
      addingNewSn = _useState56[0],
      setAddingNewSn = _useState56[1];

  var _useState57 = Object(react["useState"])(""),
      newSn = _useState57[0],
      setNewSn = _useState57[1];

  var handlePnSelect = function handlePnSelect(e) {
    var selected = e.target.value;
    setItems(function (prev) {
      var updatedPn = Array.isArray(prev.pn) ? Object(toConsumableArray["a" /* default */])(prev.pn) : [];
      updatedPn[0] = selected;
      return _id_objectSpread(_id_objectSpread({}, prev), {}, {
        pn: updatedPn
      });
    });
  };

  var handleSnSelect = function handleSnSelect(e) {
    var selected = e.target.value;
    setItems(function (prev) {
      var updatedSn = Array.isArray(prev.sn) ? Object(toConsumableArray["a" /* default */])(prev.sn) : [];
      updatedSn[0] = selected;
      return _id_objectSpread(_id_objectSpread({}, prev), {}, {
        sn: updatedSn
      });
    });
  };

  var handleAddNewPn = function handleAddNewPn() {
    if (newPn.trim() !== "") {
      setItems(function (prev) {
        return _id_objectSpread(_id_objectSpread({}, prev), {}, {
          pn: [].concat(Object(toConsumableArray["a" /* default */])(prev.pn), [newPn.trim()])
        });
      });
    }

    setNewPn("");
    setAddingNewPn(false);
  };

  var handleAddNewSn = function handleAddNewSn() {
    if (newSn.trim() !== "") {
      setItems(function (prev) {
        return _id_objectSpread(_id_objectSpread({}, prev), {}, {
          sn: [].concat(Object(toConsumableArray["a" /* default */])(prev.sn), [newSn.trim()])
        });
      });
    }

    setNewSn("");
    setAddingNewSn(false);
  }; // Generate custom document ID if needed.


  var generateCustomID = function generateCustomID() {
    var randomNum = Math.floor(10000 + Math.random() * 90000);
    return "AIS".concat(randomNum);
  };

  function shallowClean(obj) {
    var newObj = {};

    for (var key in obj) {
      console.log(key, obj[key]);

      if (obj.hasOwnProperty(key)) {
        newObj[key] = obj[key] === undefined ? "" : obj[key];
      }
    }

    return newObj;
  }

  function toSend() {
    return _toSend.apply(this, arguments);
  } // Additional state for local warehouse location inputs.


  function _toSend() {
    _toSend = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee15() {
      var _fromDetails$section, _fromDetails$section2, _currentDetails$secti, _currentDetails$secti2;

      var db, currentUser, userEmail, machineData, formattedItems, fromDetails, currentDetails, docId, newDocId, machineRef, machineDoc, currentMachineRef, currentMachineDoc, cleanFormattedItems, _machineRef, _machineDoc, _currentMachineRef, _currentMachineDoc, _machineRef2, _machineDoc2, _currentMachineRef2, _currentMachineDoc2;

      return regenerator_default.a.wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              db = Firebase["b" /* default */].firestore();
              currentUser = Firebase["b" /* default */].auth().currentUser;
              userEmail = currentUser ? currentUser.email : "unknown"; // Always use the current state values for OEM, modality, and model.

              machineData = _id_objectSpread(_id_objectSpread({}, TheMachine || {}), {}, {
                oem: oem,
                modality: modality,
                model: model
              });
              formattedItems = _id_objectSpread(_id_objectSpread({}, items), {}, {
                descriptions: descriptions,
                workOrders: workOrders
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

              formattedItems.pn = (items.pn || []).map(function (value) {
                return value === undefined ? "" : value;
              });
              formattedItems.sn = (items.sn || []).map(function (value) {
                return value === undefined ? "" : value;
              });
              fromDetails = buildLocalLocObject(newLocalFrom);
              currentDetails = buildLocalLocObject(newLocalCurrent);
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

              docId = id;
              _context15.prev = 32;

              if (!docId) {
                _context15.next = 80;
                break;
              }

              // Check if a localSN is provided and if it differs from the current docId.
              newDocId = items.localSN && items.localSN.trim() !== "" ? items.localSN.trim() : docId;

              if (!(docId !== newDocId)) {
                _context15.next = 59;
                break;
              }

              _context15.next = 38;
              return db.collection("Test").doc(newDocId).set(formattedItems);

            case 38:
              if (!(selectedMachine && selectedMachine.id)) {
                _context15.next = 46;
                break;
              }

              machineRef = db.collection("Machine").doc(selectedMachine.id);
              _context15.next = 42;
              return machineRef.get();

            case 42:
              machineDoc = _context15.sent;

              if (!machineDoc.exists) {
                _context15.next = 46;
                break;
              }

              _context15.next = 46;
              return machineRef.update({
                associatedParts: Firebase["b" /* default */].firestore.FieldValue.arrayUnion(db.collection("Test").doc(newDocId))
              });

            case 46:
              if (!(selectedCurrentMachine && selectedCurrentMachine.id)) {
                _context15.next = 54;
                break;
              }

              currentMachineRef = db.collection("Machine").doc(selectedCurrentMachine.id);
              _context15.next = 50;
              return currentMachineRef.get();

            case 50:
              currentMachineDoc = _context15.sent;

              if (!currentMachineDoc.exists) {
                _context15.next = 54;
                break;
              }

              _context15.next = 54;
              return currentMachineRef.update({
                associatedParts: Firebase["b" /* default */].firestore.FieldValue.arrayUnion(db.collection("Test").doc(newDocId))
              });

            case 54:
              _context15.next = 56;
              return db.collection("Test").doc(docId)["delete"]();

            case 56:
              // Set docId to the new document ID.
              docId = newDocId;
              _context15.next = 78;
              break;

            case 59:
              // Deep-clean the formattedItems to remove any undefined nested values.
              cleanFormattedItems = shallowClean(formattedItems);
              _context15.next = 62;
              return db.collection("Test").doc(docId).update(cleanFormattedItems);

            case 62:
              if (!(selectedMachine && selectedMachine.id)) {
                _context15.next = 70;
                break;
              }

              _machineRef = db.collection("Machine").doc(selectedMachine.id);
              _context15.next = 66;
              return _machineRef.get();

            case 66:
              _machineDoc = _context15.sent;

              if (!_machineDoc.exists) {
                _context15.next = 70;
                break;
              }

              _context15.next = 70;
              return _machineRef.update({
                associatedParts: Firebase["b" /* default */].firestore.FieldValue.arrayUnion(db.collection("Test").doc(docId))
              });

            case 70:
              if (!(selectedCurrentMachine && selectedCurrentMachine.id)) {
                _context15.next = 78;
                break;
              }

              _currentMachineRef = db.collection("Machine").doc(selectedCurrentMachine.id);
              _context15.next = 74;
              return _currentMachineRef.get();

            case 74:
              _currentMachineDoc = _context15.sent;

              if (!_currentMachineDoc.exists) {
                _context15.next = 78;
                break;
              }

              _context15.next = 78;
              return _currentMachineRef.update({
                associatedParts: Firebase["b" /* default */].firestore.FieldValue.arrayUnion(db.collection("Test").doc(docId))
              });

            case 78:
              _context15.next = 99;
              break;

            case 80:
              // For a new item, if localSN is provided, use it; otherwise, generate a custom ID.
              docId = items.localSN && items.localSN.trim() !== "" ? items.localSN.trim() : generateCustomID();
              _context15.next = 83;
              return db.collection("Test").doc(docId).set(formattedItems);

            case 83:
              if (!(selectedMachine && selectedMachine.id)) {
                _context15.next = 91;
                break;
              }

              _machineRef2 = db.collection("Machine").doc(selectedMachine.id);
              _context15.next = 87;
              return _machineRef2.get();

            case 87:
              _machineDoc2 = _context15.sent;

              if (!_machineDoc2.exists) {
                _context15.next = 91;
                break;
              }

              _context15.next = 91;
              return _machineRef2.update({
                associatedParts: Firebase["b" /* default */].firestore.FieldValue.arrayUnion(db.collection("Test").doc(docId))
              });

            case 91:
              if (!(selectedCurrentMachine && selectedCurrentMachine.id)) {
                _context15.next = 99;
                break;
              }

              _currentMachineRef2 = db.collection("Machine").doc(selectedCurrentMachine.id);
              _context15.next = 95;
              return _currentMachineRef2.get();

            case 95:
              _currentMachineDoc2 = _context15.sent;

              if (!_currentMachineDoc2.exists) {
                _context15.next = 99;
                break;
              }

              _context15.next = 99;
              return _currentMachineRef2.update({
                associatedParts: Firebase["b" /* default */].firestore.FieldValue.arrayUnion(db.collection("Test").doc(docId))
              });

            case 99:
              _context15.next = 101;
              return uploadPhotos(docId);

            case 101:
              console.log("Item saved and associatedParts updated!"); // Redirect to the new URL using the new document id.

              router.push("/NewSearch/item/".concat(docId)); // Optionally, you can also show a save confirmation modal:

              handleShowSaveModal();
              _context15.next = 109;
              break;

            case 106:
              _context15.prev = 106;
              _context15.t0 = _context15["catch"](32);
              console.error("Error saving data:", _context15.t0);

            case 109:
            case "end":
              return _context15.stop();
          }
        }
      }, _callee15, null, [[32, 106]]);
    }));
    return _toSend.apply(this, arguments);
  }

  var _useState58 = Object(react["useState"])(false),
      showLocalLocFrom = _useState58[0],
      setShowLocalLocFrom = _useState58[1];

  var _useState59 = Object(react["useState"])(false),
      showLocalLocCurrent = _useState59[0],
      setShowLocalLocCurrent = _useState59[1]; // When a machine is selected from the modal.


  var handleSetSelectedMachine = function handleSetSelectedMachine(machine) {
    var _machine$name;

    // const condition = (name) => name && name.toLowerCase() === "interior socal";
    var isSocalInterior = ((_machine$name = machine.name) === null || _machine$name === void 0 ? void 0 : _machine$name.toLowerCase()) === "interior socal";

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

  var uploadPhotos = /*#__PURE__*/function () {
    var _ref17 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee10(docID) {
      var storageRef, i, photoRef, metadata, url;
      return regenerator_default.a.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              storageRef = Firebase["b" /* default */].storage().ref();
              i = 0;

            case 2:
              if (!(i < photos.length)) {
                _context10.next = 15;
                break;
              }

              if (!photos[i].file) {
                _context10.next = 12;
                break;
              }

              photoRef = storageRef.child("Parts/".concat(docID, "/").concat(docID).concat(i === 0 ? ".jpg" : ".".concat(i + 1, ".jpg")));
              metadata = {
                contentType: "image/png"
              };
              _context10.next = 8;
              return photoRef.put(photos[i].file, metadata);

            case 8:
              _context10.next = 10;
              return photoRef.getDownloadURL();

            case 10:
              url = _context10.sent;
              photos[i].url = url;

            case 12:
              i++;
              _context10.next = 2;
              break;

            case 15:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10);
    }));

    return function uploadPhotos(_x9) {
      return _ref17.apply(this, arguments);
    };
  }(); // Function to handle printing the label.


  var handlePrint = /*#__PURE__*/function () {
    var _ref18 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee11() {
      var clientName, machineDoc, machineData, clientDoc, _clientDoc, payload, response, result;

      return regenerator_default.a.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              if (items.name) {
                _context11.next = 3;
                break;
              }

              alert("Missing name");
              return _context11.abrupt("return");

            case 3:
              clientName = ""; // Attempt to fetch client name from the Machine document reference.

              if (!(items.Machine && typeof items.Machine.get === "function")) {
                _context11.next = 23;
                break;
              }

              _context11.prev = 5;
              _context11.next = 8;
              return items.Machine.get();

            case 8:
              machineDoc = _context11.sent;

              if (!machineDoc.exists) {
                _context11.next = 16;
                break;
              }

              machineData = machineDoc.data();

              if (!(machineData.client && typeof machineData.client.get === "function")) {
                _context11.next = 16;
                break;
              }

              _context11.next = 14;
              return machineData.client.get();

            case 14:
              clientDoc = _context11.sent;

              if (clientDoc.exists) {
                clientName = clientDoc.data().name || "";
              }

            case 16:
              _context11.next = 21;
              break;

            case 18:
              _context11.prev = 18;
              _context11.t0 = _context11["catch"](5);
              console.error("Error fetching machine or client:", _context11.t0);

            case 21:
              _context11.next = 24;
              break;

            case 23:
              console.warn("No Machine reference available in the item");

            case 24:
              console.log(clientName, ":", items.client); // Fallback: if no client name was found, check items.client.

              if (!(!clientName && items.client)) {
                _context11.next = 40;
                break;
              }

              if (!(typeof items.client.get === "function")) {
                _context11.next = 39;
                break;
              }

              _context11.prev = 27;
              _context11.next = 30;
              return items.client.get();

            case 30:
              _clientDoc = _context11.sent;

              if (_clientDoc.exists) {
                clientName = _clientDoc.data().name || "";
              }

              _context11.next = 37;
              break;

            case 34:
              _context11.prev = 34;
              _context11.t1 = _context11["catch"](27);
              console.error("Error fetching client from items.client:", _context11.t1);

            case 37:
              _context11.next = 40;
              break;

            case 39:
              clientName = items.client;

            case 40:
              console.log("descriptions:", descriptions[selectedDesc]);
              payload = {
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
              _context11.prev = 43;
              _context11.next = 46;
              return fetch("https://9d70-174-76-22-138.ngrok-free.app/print-label", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
              });

            case 46:
              response = _context11.sent;
              _context11.next = 49;
              return response.json();

            case 49:
              result = _context11.sent;
              console.log("Print result:", result.status);

              if (result.status.includes("successfully.")) {
                handleShowPrintModal();
              } else {
                console.error("Error printing label:", result.error);
              }

              _context11.next = 57;
              break;

            case 54:
              _context11.prev = 54;
              _context11.t2 = _context11["catch"](43);
              console.error("Error printing label:", _context11.t2);

            case 57:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11, null, [[5, 18], [27, 34], [43, 54]]);
    }));

    return function handlePrint() {
      return _ref18.apply(this, arguments);
    };
  }();

  function handleSubmit(_x10) {
    return _handleSubmit.apply(this, arguments);
  } // Handlers for input changes.


  function _handleSubmit() {
    _handleSubmit = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee16(event) {
      return regenerator_default.a.wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              event.preventDefault(); // Only check that the Name field is filled out.

              if (!items.name) {
                handleShow(); // This shows the "missing field" modal.
              } else {
                toSend();
              }

            case 2:
            case "end":
              return _context16.stop();
          }
        }
      }, _callee16);
    }));
    return _handleSubmit.apply(this, arguments);
  }

  var handleChange = function handleChange(field) {
    return function (event) {
      var value = event.target ? event.target.value : event.value;
      setItems(function (prevItems) {
        return _id_objectSpread(_id_objectSpread({}, prevItems), {}, Object(defineProperty["a" /* default */])({}, field, value));
      });
    };
  };

  var addDescription = function addDescription() {
    setDescriptions([].concat(Object(toConsumableArray["a" /* default */])(descriptions), [{
      description: "",
      date: ""
    }]));
  };

  var removeDescription = function removeDescription(index) {
    setDescriptions(descriptions.filter(function (_, i) {
      return i !== index;
    }));
  };

  var handleDescriptionChange = function handleDescriptionChange(index, field, value) {
    var newDescriptions = descriptions.map(function (desc, i) {
      return i === index ? _id_objectSpread(_id_objectSpread({}, desc), {}, Object(defineProperty["a" /* default */])({}, field, value)) : desc;
    });
    setDescriptions(newDescriptions);
  };

  var addWorkOrder = function addWorkOrder() {
    setWorkOrders([].concat(Object(toConsumableArray["a" /* default */])(workOrders), [{
      workOrder: "",
      date: ""
    }]));
  };

  var removeWorkOrder = function removeWorkOrder(index) {
    setWorkOrders(workOrders.filter(function (_, i) {
      return i !== index;
    }));
  };

  var handleWorkOrderChange = function handleWorkOrderChange(index, field, value) {
    var newWorkOrders = workOrders.map(function (wo, i) {
      return i === index ? _id_objectSpread(_id_objectSpread({}, wo), {}, Object(defineProperty["a" /* default */])({}, field, value)) : wo;
    });
    setWorkOrders(newWorkOrders);
  };

  var listDescriptions = function listDescriptions() {
    setShowDescModal(true);
  };

  var selectDescription = function selectDescription(index) {
    setSelectedDesc(index);
    setShowDescModal(false);
  };

  var handleShowCameraModal = function handleShowCameraModal() {
    setShowCameraModal(true);
  };

  var handleCloseCameraModal = function handleCloseCameraModal() {
    setShowCameraModal(false);
    setCapturedPhoto(null);
  };

  var handleCapture = function handleCapture(err, result) {
    if (result) {
      setCapturedPhoto(result);
    }
  };

  var savePhoto = function savePhoto() {
    setPhotos(function (prevPhotos) {
      return [].concat(Object(toConsumableArray["a" /* default */])(prevPhotos), [{
        file: capturedPhoto,
        url: URL.createObjectURL(capturedPhoto)
      }]);
    });
    setCapturedPhoto(null);
    handleCloseCameraModal();
  };

  var removePhoto = function removePhoto(index) {
    setPhotos(photos.filter(function (_, i) {
      return i !== index;
    }));
  };

  var mostRecentWorkOrder = workOrders && workOrders.length > 0 ? workOrders.reduce(function (latest, current) {
    var latestDate = new Date(latest.date);
    var currentDate = new Date(current.date);
    return currentDate > latestDate ? current : latest;
  }, workOrders[0]) : {};

  var capturePhoto = function capturePhoto() {
    var video = document.querySelector("video");
    var canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    var context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob(function (blob) {
      setCapturedPhoto(blob);
    }, "image/png");
  };

  var handleShowInfoModal = /*#__PURE__*/function () {
    var _ref19 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee12() {
      var db, doc, data;
      return regenerator_default.a.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              db = Firebase["b" /* default */].firestore();
              _context12.prev = 1;
              _context12.next = 4;
              return db.collection("Test").doc(id).get();

            case 4:
              doc = _context12.sent;

              if (doc.exists) {
                data = doc.data();
                setItemName(data.name || "N/A");
                setShowInfoModal(true);
              } else {
                console.error("Item not found");
              }

              _context12.next = 11;
              break;

            case 8:
              _context12.prev = 8;
              _context12.t0 = _context12["catch"](1);
              console.error("Error fetching item info:", _context12.t0);

            case 11:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12, null, [[1, 8]]);
    }));

    return function handleShowInfoModal() {
      return _ref19.apply(this, arguments);
    };
  }();

  var handleCloseInfoModal = function handleCloseInfoModal() {
    return setShowInfoModal(false);
  };

  var handlePnChange = function handlePnChange(index, value) {
    setItems(function (prev) {
      var newPn = Object(toConsumableArray["a" /* default */])(prev.pn);

      newPn[index] = value;
      return _id_objectSpread(_id_objectSpread({}, prev), {}, {
        pn: newPn
      });
    });
  };

  var addPn = function addPn() {
    setItems(function (prev) {
      return _id_objectSpread(_id_objectSpread({}, prev), {}, {
        pn: [].concat(Object(toConsumableArray["a" /* default */])(prev.pn), [""])
      });
    });
  };

  var handleSnChange = function handleSnChange(index, value) {
    setItems(function (prev) {
      var newSn = Object(toConsumableArray["a" /* default */])(prev.sn);

      newSn[index] = value;
      return _id_objectSpread(_id_objectSpread({}, prev), {}, {
        sn: newSn
      });
    });
  };

  var addSn = function addSn() {
    setItems(function (prev) {
      return _id_objectSpread(_id_objectSpread({}, prev), {}, {
        sn: [].concat(Object(toConsumableArray["a" /* default */])(prev.sn), [""])
      });
    });
  };

  var browseInputRef = Object(react["useRef"])(null);

  var handleBrowsePhotos = function handleBrowsePhotos() {
    if (browseInputRef.current) {
      browseInputRef.current.click();
    }
  };

  var handleFilesSelected = function handleFilesSelected(e) {
    var files = e.target.files;

    if (files.length) {
      var newPhotos = [];

      for (var i = 0; i < files.length; i++) {
        newPhotos.push({
          file: files[i],
          url: URL.createObjectURL(files[i])
        });
      }

      setPhotos(function (prevPhotos) {
        return [].concat(Object(toConsumableArray["a" /* default */])(prevPhotos), newPhotos);
      });
    }

    e.target.value = "";
  };

  var _useState60 = Object(react["useState"])(0),
      currentPnIndex = _useState60[0],
      setCurrentPnIndex = _useState60[1];

  var _useState61 = Object(react["useState"])(false),
      showDropdown = _useState61[0],
      setShowDropdown = _useState61[1];

  var _useState62 = Object(react["useState"])(0),
      currentSnIndex = _useState62[0],
      setCurrentSnIndex = _useState62[1];

  var _useState63 = Object(react["useState"])(false),
      showSnDropdown = _useState63[0],
      setShowSnDropdown = _useState63[1];

  var handleAddNewClient = function handleAddNewClient() {
    var randomNum = Math.floor(10000 + Math.random() * 90000);
    router.push("../client/AIS".concat(randomNum, "/addClient?from=item&itemId=").concat(id || ""));
  };

  var handleBluefolderButton = /*#__PURE__*/function () {
    var _ref20 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee13() {
      var _descriptions$selecte2;

      var currentWorkOrder, payload, response, result;
      return regenerator_default.a.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              // Check that the work order field is filled out (using workOrders[0].workOrder as current)
              currentWorkOrder = workOrders && workOrders.length > 0 ? workOrders[0].workOrder : "";

              if (currentWorkOrder) {
                _context13.next = 4;
                break;
              }

              alert("Please fill out the work order field before adding to BlueFolder.");
              return _context13.abrupt("return");

            case 4:
              // Build the payload to send to your proxy endpoint.
              payload = {
                name: items.name,
                pn: items.pn[0] || "",
                sn: items.sn[0] || "",
                status: items.status,
                description: ((_descriptions$selecte2 = descriptions[selectedDesc]) === null || _descriptions$selecte2 === void 0 ? void 0 : _descriptions$selecte2.description) || "",
                workOrder: currentWorkOrder,
                localsn: items.localSN || ""
              };
              _context13.prev = 5;
              _context13.next = 8;
              return fetch("https://9d70-174-76-22-138.ngrok-free.app/bluefolder", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
              });

            case 8:
              response = _context13.sent;
              _context13.next = 11;
              return response.json();

            case 11:
              result = _context13.sent;
              alert("BlueFolder service item added successfully!");
              console.log("BlueFolder result:", result);
              _context13.next = 20;
              break;

            case 16:
              _context13.prev = 16;
              _context13.t0 = _context13["catch"](5);
              console.error("BlueFolder error:", _context13.t0);
              alert("Error adding data to BlueFolder.");

            case 20:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13, null, [[5, 16]]);
    }));

    return function handleBluefolderButton() {
      return _ref20.apply(this, arguments);
    };
  }();

  return __jsx(LoggedIn["default"], null, __jsx("div", null, __jsx(Modal["a" /* default */], {
    show: show,
    onHide: handleClose
  }, __jsx(Modal["a" /* default */].Header, {
    closeButton: true
  }, __jsx(Modal["a" /* default */].Title, null, "Error")), __jsx(Modal["a" /* default */].Body, null, "Missing field"), __jsx(Modal["a" /* default */].Footer, null, __jsx(Button["a" /* default */], {
    variant: "primary",
    onClick: handleClose
  }, "Ok"))), __jsx(Modal["a" /* default */], {
    show: showErr,
    onHide: handleCloseErr
  }, __jsx(Modal["a" /* default */].Header, {
    closeButton: true
  }, __jsx(Modal["a" /* default */].Title, null, "Error")), __jsx(Modal["a" /* default */].Body, null, Err), __jsx(Modal["a" /* default */].Footer, null, __jsx(Button["a" /* default */], {
    variant: "primary",
    onClick: handleCloseErr
  }, "Ok"))), __jsx(Modal["a" /* default */], {
    show: showSaveModal,
    onHide: handleCloseSaveModal
  }, __jsx(Modal["a" /* default */].Header, {
    closeButton: true
  }, __jsx(Modal["a" /* default */].Title, null, "Save Confirmation")), __jsx(Modal["a" /* default */].Body, null, "Data has been saved successfully."), __jsx(Modal["a" /* default */].Footer, null, __jsx(Button["a" /* default */], {
    variant: "primary",
    onClick: handleCloseSaveModal
  }, "Ok"))), __jsx(Modal["a" /* default */], {
    show: showPrintModal,
    onHide: handleClosePrintModal
  }, __jsx(Modal["a" /* default */].Header, {
    closeButton: true
  }, __jsx(Modal["a" /* default */].Title, null, "Print Confirmation")), __jsx(Modal["a" /* default */].Body, null, "Info has been sent to print."), __jsx(Modal["a" /* default */].Footer, null, __jsx(Button["a" /* default */], {
    variant: "primary",
    onClick: handleClosePrintModal
  }, "Ok"))), __jsx(Modal["a" /* default */], {
    show: showDescModal,
    onHide: handleCloseDescModal
  }, __jsx(Modal["a" /* default */].Header, {
    closeButton: true
  }, __jsx(Modal["a" /* default */].Title, null, "Descriptions")), __jsx(Modal["a" /* default */].Body, null, __jsx(Button["a" /* default */], {
    variant: "primary",
    className: "mb-3",
    onClick: addDescription
  }, "Add Description"), descriptions.map(function (desc, index) {
    return __jsx(Row["a" /* default */], {
      key: index,
      className: "mb-3"
    }, __jsx(Button["a" /* default */], {
      variant: "outline-secondary",
      className: "w-100",
      onClick: function onClick() {
        return selectDescription(index);
      },
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
    }, desc.date || "Date"))));
  }), __jsx(Button["a" /* default */], {
    variant: "primary",
    onClick: handleCloseDescModal
  }, "OK"))), __jsx(Modal["a" /* default */], {
    show: showWoModal,
    onHide: handleCloseWoModal
  }, __jsx(Modal["a" /* default */].Header, {
    closeButton: true
  }, __jsx(Modal["a" /* default */].Title, null, "Work Orders")), __jsx(Modal["a" /* default */].Body, null, __jsx(Button["a" /* default */], {
    variant: "primary",
    className: "mb-3",
    onClick: addWorkOrder,
    style: {
      marginBottom: "1rem"
    }
  }, "Add Work Order"), workOrders.map(function (wo, index) {
    return __jsx(Row["a" /* default */], {
      key: index,
      className: "mb-3"
    }, __jsx(Col["a" /* default */], null, __jsx(Form["a" /* default */].Control, {
      type: "text",
      placeholder: "Work Order",
      value: wo.workOrder,
      onChange: function onChange(e) {
        return handleWorkOrderChange(index, "workOrder", e.target.value);
      },
      style: {
        marginBottom: "0.5rem"
      }
    })), __jsx(Col["a" /* default */], null, __jsx(Form["a" /* default */].Control, {
      type: "date",
      placeholder: "Date",
      value: wo.date,
      onChange: function onChange(e) {
        return handleWorkOrderChange(index, "date", e.target.value);
      }
    })), __jsx(Col["a" /* default */], null, __jsx(Button["a" /* default */], {
      variant: "danger",
      onClick: function onClick() {
        return removeWorkOrder(index);
      }
    }, "Remove")));
  }), __jsx(Button["a" /* default */], {
    variant: "primary",
    onClick: handleCloseWoModal
  }, "OK"))), __jsx(ClientInfoModal["default"], {
    show: showMachineModal,
    handleClose: handleCloseMachineModal,
    selectedClient: selectedClient,
    machineOptions: machineOptions,
    setSelectedMachine: handleSetSelectedMachine
  }), __jsx(Modal["a" /* default */], {
    show: showClientModal,
    onHide: handleCloseClientModal
  }, __jsx(Modal["a" /* default */].Header, {
    closeButton: true
  }, __jsx(Modal["a" /* default */].Title, null, "Select Client")), __jsx(Modal["a" /* default */].Body, null, __jsx(FormControl["a" /* default */], {
    type: "text",
    placeholder: "Search by name",
    className: "mb-3",
    value: search,
    onChange: function onChange(e) {
      return setSearch(e.target.value);
    }
  }), __jsx(ClientTable["a" /* default */], {
    clients: clients.filter(function (client) {
      return (client.name || "").toLowerCase().includes(search.toLowerCase());
    }),
    onSelectClient: handleClientInfo,
    onInfoClick: handleClientInfo,
    clearSelection: function clearSelection() {
      return handleClientInfo(null);
    },
    onAddClient: handleAddNewClient
  }))), __jsx(parentModal["default"], {
    show: showParentModal,
    handleClose: handleCloseParentModal,
    setSelectedParent: setSelectedParent
  }), __jsx(MachineSelectionModal["default"], {
    show: machineSelectionModal,
    handleClose: function handleClose() {
      return setMachineSelectionModal(false);
    },
    setMachine: setTheMachine
  }), __jsx(Modal["a" /* default */], {
    show: showCameraModal,
    onHide: handleCloseCameraModal
  }, __jsx(Modal["a" /* default */].Header, {
    closeButton: true
  }, __jsx(Modal["a" /* default */].Title, null, "Take a Photo")), __jsx(Modal["a" /* default */].Body, null, __jsx("div", {
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
  })))), __jsx(Modal["a" /* default */].Footer, null, !capturedPhoto ? __jsx(react_default.a.Fragment, null, __jsx(Button["a" /* default */], {
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
  }, "\uD83D\uDCF7"), __jsx(Button["a" /* default */], {
    onClick: function onClick() {
      return setCameraFacing(function (prev) {
        return prev === "environment" ? "user" : "environment";
      });
    }
  }, "Flip Camera"), __jsx(Button["a" /* default */], {
    variant: "secondary",
    onClick: handleCloseCameraModal
  }, "Cancel")) : __jsx(react_default.a.Fragment, null, __jsx(Button["a" /* default */], {
    variant: "secondary",
    onClick: function onClick() {
      return setCapturedPhoto(null);
    }
  }, "Retake"), __jsx(Button["a" /* default */], {
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
  }), __jsx(Container["a" /* default */], {
    className: "d-flex align-items-center justify-content-center",
    style: {
      minHeight: "100vh"
    }
  }, __jsx("div", {
    className: "w-100",
    style: {
      maxWidth: "600px"
    }
  }, __jsx(Card["a" /* default */], {
    className: "align-items-center justify-content-center"
  }, __jsx(Card["a" /* default */].Body, null, __jsx("h2", {
    className: "text-center mb-4"
  }, "Item"), __jsx(Form["a" /* default */], {
    onSubmit: handleSubmit
  }, __jsx(Row["a" /* default */], {
    className: "mb-3"
  }, __jsx(Col["a" /* default */], null, __jsx(Form["a" /* default */].Group, {
    controlId: "name"
  }, __jsx(Form["a" /* default */].Label, null, "Name"), __jsx(Form["a" /* default */].Control, {
    type: "text",
    value: items.name,
    onChange: handleChange("name")
  }))), __jsx(Col["a" /* default */], null, __jsx(Form["a" /* default */].Group, {
    controlId: "pn"
  }, __jsx(Form["a" /* default */].Label, null, "Product Number"), __jsx("div", {
    style: {
      position: "relative"
    }
  }, __jsx(InputGroup["a" /* default */], null, __jsx(Form["a" /* default */].Control, {
    type: "text",
    value: items.pn[currentPnIndex] || "",
    onChange: function onChange(e) {
      return handlePnChange(currentPnIndex, e.target.value);
    }
  }), __jsx(Button["a" /* default */], {
    variant: "outline-secondary",
    onClick: function onClick() {
      return setShowDropdown(!showDropdown);
    }
  }, "\u25BE"), __jsx(InputGroup["a" /* default */].Text, null, __jsx(Button["a" /* default */], {
    variant: "outline-secondary",
    onClick: function onClick() {
      return setAddingNewPn(true);
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
    }
  }, pnOptions.map(function (pnOption, idx) {
    return __jsx("div", {
      key: idx,
      style: {
        padding: "8px",
        cursor: "pointer"
      },
      onClick: function onClick() {
        setCurrentPnIndex(idx);
        setShowDropdown(false);
      }
    }, pnOption);
  }))), addingNewPn && __jsx(Form["a" /* default */].Control, {
    type: "text",
    placeholder: "Enter new PN",
    value: newPn,
    onChange: function onChange(e) {
      return setNewPn(e.target.value);
    },
    onBlur: handleAddNewPn,
    onKeyDown: function onKeyDown(e) {
      return e.key === "Enter" && handleAddNewPn();
    }
  })))), __jsx(Row["a" /* default */], {
    className: "mb-3"
  }, __jsx(Col["a" /* default */], null, __jsx(Form["a" /* default */].Group, {
    controlId: "sn"
  }, __jsx(Form["a" /* default */].Label, null, "Serial Number"), __jsx("div", {
    style: {
      position: "relative"
    }
  }, __jsx(InputGroup["a" /* default */], null, __jsx(Form["a" /* default */].Control, {
    type: "text",
    value: items.sn[currentSnIndex] || "",
    onChange: function onChange(e) {
      return handleSnChange(currentSnIndex, e.target.value);
    }
  }), __jsx(Button["a" /* default */], {
    variant: "outline-secondary",
    onClick: function onClick() {
      return setShowSnDropdown(!showSnDropdown);
    }
  }, "\u25BE"), __jsx(InputGroup["a" /* default */].Text, null, __jsx(Button["a" /* default */], {
    variant: "outline-secondary",
    onClick: function onClick() {
      return setAddingNewSn(true);
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
    }
  }, snOptions.map(function (snOption, idx) {
    return __jsx("div", {
      key: idx,
      style: {
        padding: "8px",
        cursor: "pointer"
      },
      onClick: function onClick() {
        setCurrentSnIndex(idx);
        setShowSnDropdown(false);
      }
    }, snOption);
  }))), addingNewSn && __jsx(Form["a" /* default */].Control, {
    type: "text",
    placeholder: "Enter new SN",
    value: newSn,
    onChange: function onChange(e) {
      return setNewSn(e.target.value);
    },
    onBlur: handleAddNewSn,
    onKeyDown: function onKeyDown(e) {
      return e.key === "Enter" && handleAddNewSn();
    }
  }))), __jsx(Col["a" /* default */], null, __jsx(Form["a" /* default */].Group, {
    controlId: "status"
  }, __jsx(Form["a" /* default */].Label, null, "Status"), __jsx(Form["a" /* default */].Select, {
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
  }, "Unknown"))))), __jsx(Row["a" /* default */], {
    className: "mb-3"
  }, __jsx(Col["a" /* default */], null, __jsx(Form["a" /* default */].Label, null, "OEM"), __jsx(Form["a" /* default */].Control, {
    type: "text",
    placeholder: "OEM",
    value: oem,
    onChange: function onChange(e) {
      return setOem(e.target.value);
    }
  })), __jsx(Col["a" /* default */], null, __jsx(Form["a" /* default */].Label, null, "Modality"), __jsx(Form["a" /* default */].Control, {
    type: "text",
    placeholder: "Modality",
    value: modality,
    onChange: function onChange(e) {
      return setModality(e.target.value);
    }
  })), __jsx(Col["a" /* default */], null, __jsx(Form["a" /* default */].Label, null, "Model"), __jsx(Form["a" /* default */].Control, {
    type: "text",
    placeholder: "Model",
    value: model,
    onChange: function onChange(e) {
      return setModel(e.target.value);
    }
  }))), __jsx("div", {
    style: {
      marginBottom: "1rem",
      marginTop: "1rem"
    }
  }, __jsx("div", {
    className: "d-flex align-items-center"
  }, __jsx(Button["a" /* default */], {
    variant: "outline-secondary",
    onClick: handleShowWoModal,
    className: "me-2"
  }, "Manage Work Orders"), workOrders.length > 0 && __jsx("div", {
    className: "d-flex flex-column align-items-start"
  }, __jsx(Form["a" /* default */].Label, null, "Work Order"), __jsx(Form["a" /* default */].Control, {
    type: "text",
    placeholder: "Most Recent Work Order",
    value: mostRecentWorkOrder.workOrder,
    onChange: function onChange(e) {
      return handleWorkOrderChange(workOrders.indexOf(mostRecentWorkOrder), "workOrder", e.target.value);
    },
    style: {
      marginBottom: "0.5rem"
    }
  }), __jsx(Form["a" /* default */].Label, null, "Date"), __jsx(Form["a" /* default */].Control, {
    type: "date",
    placeholder: "Work Order Date",
    value: mostRecentWorkOrder.date,
    onChange: function onChange(e) {
      return handleWorkOrderChange(workOrders.indexOf(mostRecentWorkOrder), "date", e.target.value);
    },
    style: {
      marginBottom: "0.5rem"
    }
  }))), __jsx("div", {
    style: {
      marginBottom: "1rem"
    }
  }, __jsx(Form["a" /* default */].Group, {
    controlId: "desc"
  }, __jsx(Button["a" /* default */], {
    variant: "outline-secondary",
    onClick: listDescriptions,
    className: "mb-2 me-2"
  }, "List Descriptions"), __jsx(Form["a" /* default */].Control, {
    as: "textarea",
    rows: 3,
    placeholder: "Enter description",
    value: ((_descriptions$selecte3 = descriptions[selectedDesc]) === null || _descriptions$selecte3 === void 0 ? void 0 : _descriptions$selecte3.description) || "",
    onChange: function onChange(e) {
      return handleDescriptionChange(selectedDesc, "description", e.target.value);
    },
    style: {
      marginBottom: "0.5rem"
    }
  }), __jsx(Form["a" /* default */].Control, {
    type: "date",
    value: ((_descriptions$selecte4 = descriptions[selectedDesc]) === null || _descriptions$selecte4 === void 0 ? void 0 : _descriptions$selecte4.date) || "",
    onChange: function onChange(e) {
      return handleDescriptionChange(selectedDesc, "date", e.target.value);
    },
    style: {
      marginTop: "0.5rem",
      marginBottom: "0.5rem"
    }
  })))), __jsx("div", {
    style: {
      marginBottom: "1rem"
    }
  }, __jsx(Row["a" /* default */], {
    className: "mb-3"
  }, __jsx(Col["a" /* default */], null, __jsx(Button["a" /* default */], {
    variant: "outline-secondary",
    onClick: function onClick() {
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
  }, __jsx(Button["a" /* default */], {
    variant: "outline-secondary",
    onClick: function onClick() {
      return setShowMachineModal(true);
    }
  }, "Select Machine for ", selectedClientFrom.name), selectedMachine && __jsx(react_default.a.Fragment, null, __jsx("p", {
    style: {
      marginTop: "0.5rem"
    }
  }, __jsx("strong", null, "Selected Machine (From):"), " ", selectedMachine.name), showLocalLocFrom && __jsx(react_default.a.Fragment, null, __jsx(Button["a" /* default */], {
    variant: "outline-secondary",
    onClick: function onClick() {
      return setShowNewLocalModalFrom(true);
    },
    className: "w-100 mb-2"
  }, [newLocalFrom.region, ((_newLocalFrom$section = newLocalFrom.section) === null || _newLocalFrom$section === void 0 ? void 0 : _newLocalFrom$section.letter) + ((_newLocalFrom$section2 = newLocalFrom.section) === null || _newLocalFrom$section2 === void 0 ? void 0 : _newLocalFrom$section2.number), newLocalFrom.bin && "B".concat(newLocalFrom.bin), newLocalFrom.pallet && "P".concat(newLocalFrom.pallet)].filter(Boolean).join("-")), __jsx(Modal["a" /* default */], {
    show: showNewLocalModalFrom,
    onHide: function onHide() {
      return setShowNewLocalModalFrom(false);
    },
    centered: true
  }, __jsx(Modal["a" /* default */].Header, null, __jsx(Modal["a" /* default */].Title, null, "Edit Local Loc (From)")), __jsx(Modal["a" /* default */].Body, null, __jsx(NewLocal["default"], {
    selectedClient: selectedClientFrom,
    showLocalLoc: showNewLocalModalFrom,
    value: newLocalFrom,
    onChange: setNewLocalFrom,
    onSave: function onSave(p) {
      setNewLocalFrom(p);
      setShowNewLocalModalFrom(false);
    },
    onCancel: function onCancel() {
      return setShowNewLocalModalFrom(false);
    }
  })))))))), __jsx(Col["a" /* default */], null, __jsx(Button["a" /* default */], {
    variant: "outline-secondary",
    onClick: function onClick() {
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
  }, __jsx(Button["a" /* default */], {
    variant: "outline-secondary",
    onClick: function onClick() {
      return setShowMachineModal(true);
    }
  }, "Select Machine for ", selectedClientCurrent.name), selectedCurrentMachine && __jsx(react_default.a.Fragment, null, __jsx("p", {
    style: {
      marginTop: "0.5rem"
    }
  }, __jsx("strong", null, "Selected Machine (Current):"), " ", selectedCurrentMachine.name), showLocalLocCurrent && __jsx(react_default.a.Fragment, null, __jsx(Button["a" /* default */], {
    variant: "outline-secondary",
    onClick: function onClick() {
      return setShowNewLocalModalCurrent(true);
    },
    className: "w-100 mb-2"
  }, [newLocalCurrent.region, ((_newLocalCurrent$sect = newLocalCurrent.section) === null || _newLocalCurrent$sect === void 0 ? void 0 : _newLocalCurrent$sect.letter) + ((_newLocalCurrent$sect2 = newLocalCurrent.section) === null || _newLocalCurrent$sect2 === void 0 ? void 0 : _newLocalCurrent$sect2.number), newLocalCurrent.bin && "B".concat(newLocalCurrent.bin), newLocalCurrent.pallet && "P".concat(newLocalCurrent.pallet)].filter(Boolean).join("-")), __jsx(Modal["a" /* default */], {
    show: showNewLocalModalCurrent,
    onHide: function onHide() {
      return setShowNewLocalModalCurrent(false);
    },
    centered: true
  }, __jsx(Modal["a" /* default */].Header, null, __jsx(Modal["a" /* default */].Title, null, "Edit Local Loc (Current)")), __jsx(Modal["a" /* default */].Body, null, __jsx(NewLocal["default"], {
    selectedClient: selectedClientCurrent,
    showLocalLoc: showNewLocalModalCurrent,
    value: newLocalCurrent,
    onChange: setNewLocalCurrent,
    onSave: function onSave(p) {
      setNewLocalCurrent(p);
      setShowNewLocalModalCurrent(false);
    },
    onCancel: function onCancel() {
      return setShowNewLocalModalCurrent(false);
    }
  })))))))), __jsx(Col["a" /* default */], null, __jsx(Button["a" /* default */], {
    variant: "outline-secondary",
    onClick: handleShowParentModal,
    className: "me-2"
  }, "Select Parent"), selectedParent && __jsx(Form["a" /* default */].Control, {
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
  }, __jsx(Row["a" /* default */], {
    className: "mb-3"
  }, __jsx(Col["a" /* default */], {
    xs: 6
  }, __jsx(ButtonGroup["a" /* default */], null, __jsx(Button["a" /* default */], {
    variant: "outline-secondary",
    onClick: handleShowCameraModal
  }, "Take Photo"), __jsx(Button["a" /* default */], {
    variant: "outline-secondary",
    onClick: handleBrowsePhotos
  }, "Browse"))), __jsx(Col["a" /* default */], {
    xs: 6,
    className: "d-flex align-items-center"
  }, __jsx(Button["a" /* default */], {
    variant: "success",
    onClick: handleSendToInflow,
    style: {
      marginLeft: "auto"
    }
  }, "Send to inFlow"), __jsx(Button["a" /* default */], {
    variant: "secondary",
    onClick: handleBluefolderButton,
    style: {
      marginLeft: "0.5rem",
      marginRight: ".5rem"
    }
  }, "BlueFolder"), __jsx(Button["a" /* default */], {
    variant: addToWebsite ? "primary" : "outline-primary",
    onClick: function onClick() {
      return setAddToWebsite(function (prev) {
        return !prev;
      });
    }
  }, addToWebsite ? "✓ Add to Website" : "Add to Website"), __jsx(Form["a" /* default */].Check, {
    type: "checkbox",
    id: "hide-checkbox",
    label: "Hide" // box is checked when we want visible = false
    ,
    checked: !items.visible,
    onChange: function onChange(e) {
      // grab checked immediately
      var isHidden = e.currentTarget.checked;
      setItems(function (prev) {
        return _id_objectSpread(_id_objectSpread({}, prev), {}, {
          visible: !isHidden
        });
      });
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
  }, photos.map(function (photo, index) {
    return __jsx("div", {
      key: index,
      style: {
        position: "relative",
        width: "100px",
        height: "100px"
      }
    }, __jsx("img", {
      src: photo.url,
      alt: "Photo ".concat(index + 1),
      style: {
        width: "100%",
        height: "100%",
        objectFit: "cover"
      }
    }), photo.file && __jsx(Button["a" /* default */], {
      variant: "danger",
      size: "sm",
      style: {
        position: "absolute",
        top: 0,
        right: 0,
        padding: "0 5px"
      },
      onClick: function onClick() {
        return removePhoto(index);
      }
    }, "x"));
  })), __jsx("div", {
    className: "mt-3 d-flex flex-wrap align-items-center"
  }, __jsx(Button["a" /* default */], {
    variant: "primary",
    type: "submit",
    style: {
      marginRight: "1rem"
    }
  }, "Save"), __jsx(Button["a" /* default */], {
    variant: "secondary",
    onClick: handleShowInfoModal,
    style: {
      marginRight: "1rem"
    }
  }, "More Info"), __jsx(LoadingButton, {
    type: "primary",
    name: "Back",
    route: "NewSearch/mainSearch"
  }), __jsx(Button["a" /* default */], {
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
  }, __jsx(Button["a" /* default */], {
    variant: "link",
    style: {
      textDecoration: "none",
      color: "black",
      fontSize: "24px"
    },
    onClick: function onClick() {
      return setShowExtra(!showExtra);
    }
  }, "\u25BC")), __jsx(Collapse["a" /* default */], {
    "in": showExtra
  }, __jsx("div", {
    id: "extra-collapse",
    className: "mt-3"
  }, __jsx(Row["a" /* default */], null, __jsx(Form["a" /* default */].Group, {
    as: Col["a" /* default */],
    controlId: "dimensions"
  }, __jsx(Form["a" /* default */].Label, null, "Dimensions"), __jsx("div", {
    style: {
      display: "flex",
      alignItems: "center"
    }
  }, __jsx(Form["a" /* default */].Control, {
    placeholder: "Length",
    type: "text",
    value: items.length,
    onChange: handleChange("length")
  }), __jsx("span", {
    style: {
      padding: "0 5px"
    }
  }, "x"), __jsx(Form["a" /* default */].Control, {
    placeholder: "Width",
    type: "text",
    value: items.width,
    onChange: handleChange("width")
  }), __jsx("span", {
    style: {
      padding: "0 5px"
    }
  }, "x"), __jsx(Form["a" /* default */].Control, {
    placeholder: "Height",
    type: "text",
    value: items.height,
    onChange: handleChange("height")
  }))), __jsx(Form["a" /* default */].Group, {
    as: Col["a" /* default */],
    controlId: "trackingNumber"
  }, __jsx(Form["a" /* default */].Label, null, "Tracking Number"), __jsx(Form["a" /* default */].Control, {
    placeholder: "Tracking Number",
    type: "text",
    value: items.trackingNumber,
    onChange: handleChange("trackingNumber")
  }))), __jsx(Row["a" /* default */], {
    className: "mt-3"
  }, __jsx(Form["a" /* default */].Group, {
    as: Col["a" /* default */],
    controlId: "Price"
  }, __jsx(Form["a" /* default */].Label, null, "Price"), __jsx(Form["a" /* default */].Control, {
    placeholder: "Price",
    type: "text",
    value: items.price,
    onChange: handleChange("price")
  })), __jsx(Form["a" /* default */].Group, {
    as: Col["a" /* default */],
    controlId: "DOM"
  }, __jsx(Form["a" /* default */].Label, null, "DOM"), __jsx(Form["a" /* default */].Control, {
    placeholder: "Date of Manufacture",
    type: "date",
    value: DOM,
    onChange: function onChange(e) {
      return setDOM(e.target.value);
    }
  })), __jsx(Form["a" /* default */].Group, {
    as: Col["a" /* default */],
    controlId: "poNumber"
  }, __jsx(Form["a" /* default */].Label, null, "PO Number"), __jsx(Form["a" /* default */].Control, {
    type: "text",
    placeholder: "PO Number",
    value: items.poNumber || "",
    onChange: handleChange("poNumber")
  }))), __jsx(Row["a" /* default */], {
    className: "mt-3"
  }, __jsx(Form["a" /* default */].Group, {
    as: Col["a" /* default */],
    controlId: "localSN"
  }, __jsx(Form["a" /* default */].Label, null, "Local SN"), __jsx(Form["a" /* default */].Control, {
    type: "text",
    placeholder: "Enter Local SN",
    value: items.localSN || "",
    onChange: handleChange("localSN")
  })), __jsx(Form["a" /* default */].Group, {
    as: Col["a" /* default */],
    controlId: "arrivalDate"
  }, __jsx(Form["a" /* default */].Label, null, "Arrival Date"), __jsx(Form["a" /* default */].Control, {
    placeholder: "Enter Arrival Date",
    type: "date",
    value: items.arrival_date,
    onChange: function onChange(e) {
      var value = e.target.value;
      setItems(function (prev) {
        return _id_objectSpread(_id_objectSpread({}, prev), {}, {
          arrival_date: value
        });
      });
    }
  }))))))))))), __jsx(Modal["a" /* default */], {
    show: showCameraModal,
    onHide: handleCloseCameraModal
  }, __jsx(Modal["a" /* default */].Header, {
    closeButton: true
  }, __jsx(Modal["a" /* default */].Title, null, "Take a Photo")), __jsx(Modal["a" /* default */].Body, null, __jsx("div", {
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
  })))), __jsx(Modal["a" /* default */].Footer, null, !capturedPhoto ? __jsx(react_default.a.Fragment, null, __jsx(Button["a" /* default */], {
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
  }, "\uD83D\uDCF7"), __jsx(Button["a" /* default */], {
    onClick: function onClick() {
      return setCameraFacing(function (prev) {
        return prev === "environment" ? "user" : "environment";
      });
    }
  }, "Flip Camera"), __jsx(Button["a" /* default */], {
    variant: "secondary",
    onClick: handleCloseCameraModal
  }, "Cancel")) : __jsx(react_default.a.Fragment, null, __jsx(Button["a" /* default */], {
    variant: "secondary",
    onClick: function onClick() {
      return setCapturedPhoto(null);
    }
  }, "Retake"), __jsx(Button["a" /* default */], {
    variant: "primary",
    onClick: savePhoto
  }, "OK")))));
} // Server-side rendering function

/***/ }),

/***/ "pJDg":
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





const ButtonGroup = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["forwardRef"](({
  bsPrefix,
  size,
  vertical = false,
  className,
  role = 'group',
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component = 'div',
  ...rest
}, ref) => {
  const prefix = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_2__[/* useBootstrapPrefix */ "e"])(bsPrefix, 'btn-group');
  let baseClass = prefix;
  if (vertical) baseClass = `${prefix}-vertical`;
  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__["jsx"])(Component, {
    ...rest,
    ref: ref,
    role: role,
    className: classnames__WEBPACK_IMPORTED_MODULE_0___default()(className, baseClass, size && `${prefix}-${size}`)
  });
});
ButtonGroup.displayName = 'ButtonGroup';
/* harmony default export */ __webpack_exports__["a"] = (ButtonGroup);

/***/ }),

/***/ "vYJ8":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/react-bootstrap/node_modules/classnames/index.js
var classnames = __webpack_require__("eC2I");
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);

// EXTERNAL MODULE: ./node_modules/dom-helpers/esm/css.js + 5 modules
var css = __webpack_require__("7j6X");

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__("q1tI");
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/react-transition-group/esm/Transition.js + 3 modules
var Transition = __webpack_require__("dRu9");

// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/transitionEndListener.js
var transitionEndListener = __webpack_require__("wsUu");

// CONCATENATED MODULE: ./node_modules/react-bootstrap/esm/createChainedFunction.js
/**
 * Safe chained function
 *
 * Will only create a new function if needed,
 * otherwise will pass back existing functions or null.
 *
 * @param {function} functions to chain
 * @returns {function|null}
 */
function createChainedFunction(...funcs) {
  return funcs.filter(f => f != null).reduce((acc, f) => {
    if (typeof f !== 'function') {
      throw new Error('Invalid Argument Type, must only provide functions, undefined, or null.');
    }
    if (acc === null) return f;
    return function chainedFunction(...args) {
      // @ts-ignore
      acc.apply(this, args);
      // @ts-ignore
      f.apply(this, args);
    };
  }, null);
}
/* harmony default export */ var esm_createChainedFunction = (createChainedFunction);
// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/triggerBrowserReflow.js
var triggerBrowserReflow = __webpack_require__("z+q/");

// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/TransitionWrapper.js + 1 modules
var TransitionWrapper = __webpack_require__("ASpx");

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__("nKUr");

// CONCATENATED MODULE: ./node_modules/react-bootstrap/esm/Collapse.js









const MARGINS = {
  height: ['marginTop', 'marginBottom'],
  width: ['marginLeft', 'marginRight']
};
function getDefaultDimensionValue(dimension, elem) {
  const offset = `offset${dimension[0].toUpperCase()}${dimension.slice(1)}`;
  const value = elem[offset];
  const margins = MARGINS[dimension];
  return value +
  // @ts-ignore
  parseInt(Object(css["a" /* default */])(elem, margins[0]), 10) +
  // @ts-ignore
  parseInt(Object(css["a" /* default */])(elem, margins[1]), 10);
}
const collapseStyles = {
  [Transition["c" /* EXITED */]]: 'collapse',
  [Transition["d" /* EXITING */]]: 'collapsing',
  [Transition["b" /* ENTERING */]]: 'collapsing',
  [Transition["a" /* ENTERED */]]: 'collapse show'
};
const Collapse = /*#__PURE__*/react_default.a.forwardRef(({
  onEnter,
  onEntering,
  onEntered,
  onExit,
  onExiting,
  className,
  children,
  dimension = 'height',
  in: inProp = false,
  timeout = 300,
  mountOnEnter = false,
  unmountOnExit = false,
  appear = false,
  getDimensionValue = getDefaultDimensionValue,
  ...props
}, ref) => {
  /* Compute dimension */
  const computedDimension = typeof dimension === 'function' ? dimension() : dimension;

  /* -- Expanding -- */
  const handleEnter = Object(react["useMemo"])(() => esm_createChainedFunction(elem => {
    elem.style[computedDimension] = '0';
  }, onEnter), [computedDimension, onEnter]);
  const handleEntering = Object(react["useMemo"])(() => esm_createChainedFunction(elem => {
    const scroll = `scroll${computedDimension[0].toUpperCase()}${computedDimension.slice(1)}`;
    elem.style[computedDimension] = `${elem[scroll]}px`;
  }, onEntering), [computedDimension, onEntering]);
  const handleEntered = Object(react["useMemo"])(() => esm_createChainedFunction(elem => {
    elem.style[computedDimension] = null;
  }, onEntered), [computedDimension, onEntered]);

  /* -- Collapsing -- */
  const handleExit = Object(react["useMemo"])(() => esm_createChainedFunction(elem => {
    elem.style[computedDimension] = `${getDimensionValue(computedDimension, elem)}px`;
    Object(triggerBrowserReflow["a" /* default */])(elem);
  }, onExit), [onExit, getDimensionValue, computedDimension]);
  const handleExiting = Object(react["useMemo"])(() => esm_createChainedFunction(elem => {
    elem.style[computedDimension] = null;
  }, onExiting), [computedDimension, onExiting]);
  return /*#__PURE__*/Object(jsx_runtime["jsx"])(TransitionWrapper["a" /* default */], {
    ref: ref,
    addEndListener: transitionEndListener["a" /* default */],
    ...props,
    "aria-expanded": props.role ? inProp : null,
    onEnter: handleEnter,
    onEntering: handleEntering,
    onEntered: handleEntered,
    onExit: handleExit,
    onExiting: handleExiting,
    childRef: children.ref,
    in: inProp,
    timeout: timeout,
    mountOnEnter: mountOnEnter,
    unmountOnExit: unmountOnExit,
    appear: appear,
    children: (state, innerProps) => /*#__PURE__*/react_default.a.cloneElement(children, {
      ...innerProps,
      className: classnames_default()(className, children.props.className, collapseStyles[state], computedDimension === 'width' && 'collapse-horizontal')
    })
  });
});

// @ts-ignore

/* harmony default export */ var esm_Collapse = __webpack_exports__["a"] = (Collapse);

/***/ })

},[["NySP",1,0,5,3,8,2,4,6,7,9,10,11,12,13,14,15]]]);