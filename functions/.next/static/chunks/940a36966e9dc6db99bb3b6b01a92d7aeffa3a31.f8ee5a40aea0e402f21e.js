(window["webpackJsonp_N_E"] = window["webpackJsonp_N_E"] || []).push([[22],{

/***/ "1SzK":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"wrapper":"NewLocal_wrapper__2Txmh","formRow":"NewLocal_formRow__2vj9Q","formGroup":"NewLocal_formGroup__1xlVK","actionRow":"NewLocal_actionRow__3SZ2D","actionSpacer":"NewLocal_actionSpacer__2x5sD","mapLoading":"NewLocal_mapLoading__3HyyY","mapError":"NewLocal_mapError__i9ZnV","mapStage":"NewLocal_mapStage__1eA_Y","mapHint":"NewLocal_mapHint__2PIrR","mapCanvas":"NewLocal_mapCanvas__aW2OO","regionBlock":"NewLocal_regionBlock__2bFHn","regionE":"NewLocal_regionE__1Zg5S","regionF":"NewLocal_regionF__1LErC","regionG":"NewLocal_regionG__1duPB","regionA":"NewLocal_regionA__1Vqyy","regionD":"NewLocal_regionD__1fmkS","regionC":"NewLocal_regionC__3HqII","regionB":"NewLocal_regionB__3figN","gridWrapper":"NewLocal_gridWrapper__HtKWl","grid":"NewLocal_grid__1cy5i","gridCell":"NewLocal_gridCell__S3ktj","gridCellDisabled":"NewLocal_gridCellDisabled__2HA95","palletGrid":"NewLocal_palletGrid__9vHpI","palletButton":"NewLocal_palletButton__ol8vB","binButton":"NewLocal_binButton__3K18J","mapEmpty":"NewLocal_mapEmpty__1X06Q","mapFooter":"NewLocal_mapFooter__3L5rZ"};

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

// EXTERNAL MODULE: ./node_modules/next/router.js
var next_router = __webpack_require__("20a2");

// EXTERNAL MODULE: ./context/Firebase.js + 6 modules
var Firebase = __webpack_require__("NY6m");

// EXTERNAL MODULE: ./components/WarehouseMapModal.js
var WarehouseMapModal = __webpack_require__("cmwG");

// EXTERNAL MODULE: ./pages/NewSearch/item/[id]/NewLocal.module.css
var NewLocal_module = __webpack_require__("1SzK");
var NewLocal_module_default = /*#__PURE__*/__webpack_require__.n(NewLocal_module);

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
  var router = Object(next_router["useRouter"])();

  var _useState = Object(react["useState"])([]),
      regionOptions = _useState[0],
      setRegionOptions = _useState[1];

  var _useState2 = Object(react["useState"])(0),
      binCount = _useState2[0],
      setBinCount = _useState2[1];

  var _useState3 = Object(react["useState"])(0),
      palletCount = _useState3[0],
      setPalletCount = _useState3[1];

  var _useState4 = Object(react["useState"])(""),
      region = _useState4[0],
      setRegion = _useState4[1];

  var _useState5 = Object(react["useState"])(""),
      sectionLetter = _useState5[0],
      setSectionLetter = _useState5[1];

  var _useState6 = Object(react["useState"])(""),
      sectionNumber = _useState6[0],
      setSectionNumber = _useState6[1];

  var _useState7 = Object(react["useState"])(""),
      binSelected = _useState7[0],
      setBinSelected = _useState7[1];

  var _useState8 = Object(react["useState"])(""),
      palletSelected = _useState8[0],
      setPalletSelected = _useState8[1];

  var _useState9 = Object(react["useState"])(false),
      showMap = _useState9[0],
      setShowMap = _useState9[1]; // 1) load directory exactly as before


  Object(react["useEffect"])(function () {
    if (!showLocalLoc) return;
    var db = Firebase["b" /* default */].firestore();
    db.collection("Warehouse").doc("directory").get().then(function (doc) {
      var d = doc.data() || {};
      setRegionOptions(d.Region || []);
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

  var openMap = function openMap() {
    setShowMap(true);
  };

  var handleMapSelectionChange = function handleMapSelectionChange() {
    var selection = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (Object.prototype.hasOwnProperty.call(selection, "region")) {
      setRegion(selection.region || "");
    }

    if (Object.prototype.hasOwnProperty.call(selection, "sectionLetter")) {
      setSectionLetter(selection.sectionLetter || "");
    }

    if (Object.prototype.hasOwnProperty.call(selection, "sectionNumber")) {
      setSectionNumber(selection.sectionNumber ? String(selection.sectionNumber) : "");
    }

    if (Object.prototype.hasOwnProperty.call(selection, "pallet")) {
      setPalletSelected(selection.pallet ? String(selection.pallet) : "");
    }

    if (Object.prototype.hasOwnProperty.call(selection, "bin")) {
      setBinSelected(selection.bin ? String(selection.bin) : "");
    }
  };

  var handleViewInventory = function handleViewInventory() {
    var _selection$region, _selection$sectionLet, _selection$sectionNum, _selection$pallet, _selection$bin;

    var selection = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var params = new URLSearchParams();
    var regionValue = (_selection$region = selection.region) !== null && _selection$region !== void 0 ? _selection$region : region;
    var letterValue = (_selection$sectionLet = selection.sectionLetter) !== null && _selection$sectionLet !== void 0 ? _selection$sectionLet : sectionLetter;
    var numberValue = (_selection$sectionNum = selection.sectionNumber) !== null && _selection$sectionNum !== void 0 ? _selection$sectionNum : sectionNumber;
    var palletValue = (_selection$pallet = selection.pallet) !== null && _selection$pallet !== void 0 ? _selection$pallet : palletSelected;
    var binValue = (_selection$bin = selection.bin) !== null && _selection$bin !== void 0 ? _selection$bin : binSelected;
    if (regionValue) params.set("region", regionValue);
    if (letterValue) params.set("sectionLetter", letterValue);
    if (numberValue) params.set("sectionNumber", numberValue);
    if (palletValue) params.set("pallet", palletValue);
    if (binValue) params.set("bin", binValue);
    var query = params.toString();
    router.push("/NewSearch/inventory/inventoryManage".concat(query ? "?".concat(query) : ""));
    setShowMap(false);
  };

  return __jsx("div", {
    className: NewLocal_module_default.a.wrapper
  }, __jsx(Row["a" /* default */], {
    className: NewLocal_module_default.a.formRow
  }, __jsx(Col["a" /* default */], null, __jsx(Form["a" /* default */].Group, {
    className: NewLocal_module_default.a.formGroup
  }, __jsx(Form["a" /* default */].Label, null, "Region"), __jsx(Form["a" /* default */].Select, {
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
  })))), __jsx(Col["a" /* default */], null, __jsx(Form["a" /* default */].Group, {
    className: NewLocal_module_default.a.formGroup
  }, __jsx(Form["a" /* default */].Label, null, "Section Letter"), __jsx(Form["a" /* default */].Select, {
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
  })))), __jsx(Col["a" /* default */], null, __jsx(Form["a" /* default */].Group, {
    className: NewLocal_module_default.a.formGroup
  }, __jsx(Form["a" /* default */].Label, null, "Section Number"), __jsx(Form["a" /* default */].Select, {
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
  }, __jsx(Col["a" /* default */], null, __jsx(Form["a" /* default */].Group, {
    className: NewLocal_module_default.a.formGroup
  }, __jsx(Form["a" /* default */].Label, null, "Bin"), __jsx(esm_Stack, {
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
  }, "+ Bin")))), __jsx(Col["a" /* default */], null, __jsx(Form["a" /* default */].Group, {
    className: NewLocal_module_default.a.formGroup
  }, __jsx(Form["a" /* default */].Label, null, "Pallet"), __jsx(esm_Stack, {
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
  }, "+ Pallet"))))), __jsx("div", {
    className: NewLocal_module_default.a.actionRow
  }, __jsx(Button["a" /* default */], {
    variant: "outline-primary",
    onClick: openMap
  }, "Map"), __jsx("div", {
    className: NewLocal_module_default.a.actionSpacer
  }), __jsx(Button["a" /* default */], {
    variant: "secondary",
    onClick: onCancel
  }, "Cancel"), __jsx(Button["a" /* default */], {
    variant: "primary",
    onClick: handleOk
  }, "OK")), __jsx(WarehouseMapModal["a" /* default */], {
    show: showMap,
    onHide: function onHide() {
      return setShowMap(false);
    },
    onView: handleViewInventory,
    onSelectionChange: handleMapSelectionChange,
    initialSelection: {
      region: region,
      sectionLetter: sectionLetter,
      sectionNumber: sectionNumber,
      pallet: palletSelected,
      bin: binSelected
    }
  }));
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

/***/ "bD1r":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"page":"NewItem_page__N0Jxp","shell":"NewItem_shell__3f3Fm","card":"NewItem_card__5nd6m","cardBody":"NewItem_cardBody__3f2A4","header":"NewItem_header__1FsVc","kicker":"NewItem_kicker__3Lmoo","title":"NewItem_title__JU5wf","subtitle":"NewItem_subtitle__1XWYi","photoActionsRow":"NewItem_photoActionsRow__1hQM1","photoActionsRight":"NewItem_photoActionsRight__37LiR","actionRow":"NewItem_actionRow__F0l13","loadingOverlay":"NewItem_loadingOverlay__2Y0iE","loadingLogo":"NewItem_loadingLogo__1mDO9","magmo-spin":"NewItem_magmo-spin__so7m1"};

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

/***/ "nc39":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/next/node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__("vJKn");
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);

// EXTERNAL MODULE: ./node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__("cpVT");

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
// EXTERNAL MODULE: ./node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("rg98");

// CONCATENATED MODULE: ./utils/inflowAPI.js






function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { Object(defineProperty["a" /* default */])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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
                payload = _objectSpread(_objectSpread(_objectSpread(_objectSpread({
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

/* harmony default export */ var inflowAPI = __webpack_exports__["a"] = (inflowAPI_InflowAPI);

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

}]);