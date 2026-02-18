webpackHotUpdate_N_E("pages/NewSearch/item/[id]",{

/***/ "./pages/NewSearch/item/[id]/NewLocal.js":
/*!***********************************************!*\
  !*** ./pages/NewSearch/item/[id]/NewLocal.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NewLocal; });
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/next/node_modules/@babel/runtime/regenerator */ "./node_modules/next/node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator */ "./node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/router */ "./node_modules/next/router.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _context_Firebase__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../context/Firebase */ "./context/Firebase.js");
/* harmony import */ var _NewLocal_module_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./NewLocal.module.css */ "./pages/NewSearch/item/[id]/NewLocal.module.css");
/* harmony import */ var _NewLocal_module_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_NewLocal_module_css__WEBPACK_IMPORTED_MODULE_6__);



var _jsxFileName = "C:\\Users\\mack2\\Desktop\\code\\pages\\NewSearch\\item\\[id]\\NewLocal.js",
    _s = $RefreshSig$();

var __jsx = react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement;
// NewLocal.js





function NewLocal(_ref) {
  _s();

  var _this = this;

  var _ref$onSave = _ref.onSave,
      onSave = _ref$onSave === void 0 ? function () {} : _ref$onSave,
      _ref$onCancel = _ref.onCancel,
      onCancel = _ref$onCancel === void 0 ? function () {} : _ref$onCancel,
      selectedClient = _ref.selectedClient,
      showLocalLoc = _ref.showLocalLoc,
      _ref$value = _ref.value,
      value = _ref$value === void 0 ? {} : _ref$value,
      onChange = _ref.onChange;
  var router = Object(next_router__WEBPACK_IMPORTED_MODULE_4__["useRouter"])();

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])([]),
      regionOptions = _useState[0],
      setRegionOptions = _useState[1];

  var _useState2 = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])({}),
      sectionMap = _useState2[0],
      setSectionMap = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])(0),
      binCount = _useState3[0],
      setBinCount = _useState3[1];

  var _useState4 = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])(0),
      palletCount = _useState4[0],
      setPalletCount = _useState4[1];

  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])(""),
      region = _useState5[0],
      setRegion = _useState5[1];

  var _useState6 = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])(""),
      sectionLetter = _useState6[0],
      setSectionLetter = _useState6[1];

  var _useState7 = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])(""),
      sectionNumber = _useState7[0],
      setSectionNumber = _useState7[1];

  var _useState8 = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])(""),
      binSelected = _useState8[0],
      setBinSelected = _useState8[1];

  var _useState9 = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])(""),
      palletSelected = _useState9[0],
      setPalletSelected = _useState9[1];

  var _useState10 = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])(false),
      showMap = _useState10[0],
      setShowMap = _useState10[1];

  var _useState11 = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])("regions"),
      mapStep = _useState11[0],
      setMapStep = _useState11[1];

  var _useState12 = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])(""),
      mapRegion = _useState12[0],
      setMapRegion = _useState12[1];

  var _useState13 = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])(""),
      mapRow = _useState13[0],
      setMapRow = _useState13[1];

  var _useState14 = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])(""),
      mapCol = _useState14[0],
      setMapCol = _useState14[1];

  var _useState15 = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])(""),
      mapPallet = _useState15[0],
      setMapPallet = _useState15[1];

  var _useState16 = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])({}),
      mapCellPallets = _useState16[0],
      setMapCellPallets = _useState16[1];

  var _useState17 = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])({}),
      mapPalletBins = _useState17[0],
      setMapPalletBins = _useState17[1];

  var _useState18 = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])(false),
      mapLoading = _useState18[0],
      setMapLoading = _useState18[1];

  var _useState19 = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])(""),
      mapError = _useState19[0],
      setMapError = _useState19[1]; // 1) load directory exactly as before


  Object(react__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(function () {
    if (!showLocalLoc) return;
    var db = _context_Firebase__WEBPACK_IMPORTED_MODULE_5__["default"].firestore();
    db.collection("Warehouse").doc("directory").get().then(function (doc) {
      var d = doc.data() || {};
      setRegionOptions(d.Region || []);
      setSectionMap(d.Section || {});
      setBinCount(d.Bin || 0);
      setPalletCount(d.Pallet || 0);
    });
  }, [showLocalLoc]); // 2) when we open the modal (or value changes), initialize from value

  Object(react__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(function () {
    var _value$section, _value$section2, _value$bin, _value$pallet;

    if (!showLocalLoc) return;
    setRegion(value.region || "");
    setSectionLetter(((_value$section = value.section) === null || _value$section === void 0 ? void 0 : _value$section.letter) || "");
    setSectionNumber(((_value$section2 = value.section) === null || _value$section2 === void 0 ? void 0 : _value$section2.number) || "");
    setBinSelected(((_value$bin = value.bin) === null || _value$bin === void 0 ? void 0 : _value$bin.toString()) || "");
    setPalletSelected(((_value$pallet = value.pallet) === null || _value$pallet === void 0 ? void 0 : _value$pallet.toString()) || "");
  }, [showLocalLoc]); // 3) notify parent on any change

  Object(react__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(function () {
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
  });
  var regionLetters = Object(react__WEBPACK_IMPORTED_MODULE_2__["useMemo"])(function () {
    return Array.isArray(regionOptions) && regionOptions.length ? regionOptions : ["A", "B", "C", "D", "E", "F", "G"];
  }, [regionOptions]);

  var getRegionDimensions = function getRegionDimensions(regionId) {
    var entry = sectionMap === null || sectionMap === void 0 ? void 0 : sectionMap[regionId];

    if (Array.isArray(entry) && entry.length >= 2) {
      var cols = parseInt(entry[0], 10);
      var rows = parseInt(entry[1], 10);
      return {
        cols: Number.isFinite(cols) ? cols : 0,
        rows: Number.isFinite(rows) ? rows : 0
      };
    }

    return {
      cols: 0,
      rows: 0
    };
  };

  var loadRegionInventory = /*#__PURE__*/function () {
    var _ref2 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(regionId) {
      var snap, cellPallets, palletBins, cellObj, palletObj;
      return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (regionId) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return");

            case 2:
              setMapLoading(true);
              setMapError("");
              _context.prev = 4;
              _context.next = 7;
              return _context_Firebase__WEBPACK_IMPORTED_MODULE_5__["default"].firestore().collection("Test").where("newLocalCurrent.region", "==", regionId).get();

            case 7:
              snap = _context.sent;
              cellPallets = {};
              palletBins = {};
              snap.forEach(function (doc) {
                var _doc$data, _loc$section, _loc$section2;

                var loc = ((_doc$data = doc.data()) === null || _doc$data === void 0 ? void 0 : _doc$data.newLocalCurrent) || {};
                var row = (_loc$section = loc.section) === null || _loc$section === void 0 ? void 0 : _loc$section.letter;
                var col = (_loc$section2 = loc.section) === null || _loc$section2 === void 0 ? void 0 : _loc$section2.number;

                if ((!row || !col) && typeof loc.section === "string") {
                  var trimmed = loc.section.trim();
                  row = trimmed.slice(0, 1);
                  col = trimmed.slice(1);
                }

                if (col !== undefined && col !== null) {
                  col = String(col);
                }

                var pallet = loc.pallet;
                var bin = loc.bin;
                if (!row || !col) return;
                var cellKey = "".concat(row, "-").concat(col);

                if (pallet !== undefined && pallet !== null && "".concat(pallet) !== "") {
                  if (!cellPallets[cellKey]) cellPallets[cellKey] = new Set();
                  cellPallets[cellKey].add(String(pallet));

                  if (bin !== undefined && bin !== null && "".concat(bin) !== "") {
                    var palletKey = "".concat(cellKey, "-P").concat(pallet);
                    if (!palletBins[palletKey]) palletBins[palletKey] = new Set();
                    palletBins[palletKey].add(String(bin));
                  }
                }
              });
              cellObj = {};
              Object.keys(cellPallets).forEach(function (key) {
                cellObj[key] = Array.from(cellPallets[key]).sort(function (a, b) {
                  return Number(a) - Number(b);
                });
              });
              palletObj = {};
              Object.keys(palletBins).forEach(function (key) {
                palletObj[key] = Array.from(palletBins[key]).sort(function (a, b) {
                  return Number(a) - Number(b);
                });
              });
              setMapCellPallets(cellObj);
              setMapPalletBins(palletObj);
              _context.next = 23;
              break;

            case 19:
              _context.prev = 19;
              _context.t0 = _context["catch"](4);
              console.error("Failed to load map inventory", _context.t0);
              setMapError("Failed to load map inventory.");

            case 23:
              _context.prev = 23;
              setMapLoading(false);
              return _context.finish(23);

            case 26:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[4, 19, 23, 26]]);
    }));

    return function loadRegionInventory(_x) {
      return _ref2.apply(this, arguments);
    };
  }(); // bump and persist bin count


  var handleAddBin = /*#__PURE__*/function () {
    var _ref3 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
      var next;
      return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              next = binCount + 1;
              _context2.next = 3;
              return _context_Firebase__WEBPACK_IMPORTED_MODULE_5__["default"].firestore().collection("Warehouse").doc("directory").update({
                Bin: next
              });

            case 3:
              setBinCount(next);
              setBinSelected(next.toString());

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function handleAddBin() {
      return _ref3.apply(this, arguments);
    };
  }(); // bump and persist pallet count


  var handleAddPallet = /*#__PURE__*/function () {
    var _ref4 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3() {
      var next;
      return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              next = palletCount + 1;
              _context3.next = 3;
              return _context_Firebase__WEBPACK_IMPORTED_MODULE_5__["default"].firestore().collection("Warehouse").doc("directory").update({
                Pallet: next
              });

            case 3:
              setPalletCount(next);
              setPalletSelected(next.toString());

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function handleAddPallet() {
      return _ref4.apply(this, arguments);
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
    setMapError("");

    if (region) {
      setMapRegion(region);
      setMapStep("grid");
      loadRegionInventory(region);
    } else {
      setMapRegion("");
      setMapStep("regions");
    }

    setShowMap(true);
  };

  var handleSelectRegion = function handleSelectRegion(regionId) {
    setMapRegion(regionId);
    setRegion(regionId);
    setMapRow("");
    setMapCol("");
    setMapPallet("");
    setPalletSelected("");
    setBinSelected("");
    setMapStep("grid");
    loadRegionInventory(regionId);
  };

  var handleSelectCell = function handleSelectCell(rowLetter, colNumber) {
    setMapRow(rowLetter);
    setMapCol(colNumber);
    setSectionLetter(rowLetter);
    setSectionNumber(String(colNumber));
    setMapPallet("");
    setPalletSelected("");
    setBinSelected("");
    setMapStep("pallets");
  };

  var handleSelectPallet = function handleSelectPallet(palletId) {
    setMapPallet(palletId);
    setPalletSelected(String(palletId));
    setBinSelected("");
    setMapStep("bins");
  };

  var handleSelectBin = function handleSelectBin(binId) {
    setBinSelected(String(binId));
  };

  var handleMapBack = function handleMapBack() {
    if (mapStep === "bins") setMapStep("pallets");else if (mapStep === "pallets") setMapStep("grid");else if (mapStep === "grid") setMapStep("regions");
  };

  var handleViewInventory = function handleViewInventory() {
    var _ref5, _overrides$region, _ref6, _overrides$sectionLet, _ref7, _overrides$sectionNum, _ref8, _overrides$pallet, _overrides$bin;

    var overrides = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var params = new URLSearchParams();
    var regionValue = (_ref5 = (_overrides$region = overrides.region) !== null && _overrides$region !== void 0 ? _overrides$region : mapRegion) !== null && _ref5 !== void 0 ? _ref5 : region;
    var letterValue = (_ref6 = (_overrides$sectionLet = overrides.sectionLetter) !== null && _overrides$sectionLet !== void 0 ? _overrides$sectionLet : mapRow) !== null && _ref6 !== void 0 ? _ref6 : sectionLetter;
    var numberValue = (_ref7 = (_overrides$sectionNum = overrides.sectionNumber) !== null && _overrides$sectionNum !== void 0 ? _overrides$sectionNum : mapCol) !== null && _ref7 !== void 0 ? _ref7 : sectionNumber;
    var palletValue = (_ref8 = (_overrides$pallet = overrides.pallet) !== null && _overrides$pallet !== void 0 ? _overrides$pallet : mapPallet) !== null && _ref8 !== void 0 ? _ref8 : palletSelected;
    var binValue = (_overrides$bin = overrides.bin) !== null && _overrides$bin !== void 0 ? _overrides$bin : binSelected;
    if (regionValue) params.set("region", regionValue);
    if (letterValue) params.set("sectionLetter", letterValue);
    if (numberValue) params.set("sectionNumber", numberValue);
    if (palletValue) params.set("pallet", palletValue);
    if (binValue) params.set("bin", binValue);
    var query = params.toString();
    router.push("/NewSearch/inventory/inventoryManage".concat(query ? "?".concat(query) : ""));
  };

  return __jsx("div", {
    className: _NewLocal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.wrapper,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 262,
      columnNumber: 5
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Row"], {
    className: _NewLocal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.formRow,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 263,
      columnNumber: 7
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 264,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, {
    className: _NewLocal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.formGroup,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 265,
      columnNumber: 11
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 266,
      columnNumber: 13
    }
  }, "Region"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Select, {
    value: region,
    onChange: function onChange(e) {
      return setRegion(e.target.value);
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 267,
      columnNumber: 13
    }
  }, __jsx("option", {
    value: "",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 270,
      columnNumber: 15
    }
  }, "Select region"), regionOptions.map(function (r) {
    return __jsx("option", {
      key: r,
      value: r,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 271,
        columnNumber: 38
      }
    }, r);
  })))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 275,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, {
    className: _NewLocal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.formGroup,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 276,
      columnNumber: 11
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 277,
      columnNumber: 13
    }
  }, "Section Letter"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Select, {
    value: sectionLetter,
    onChange: function onChange(e) {
      return setSectionLetter(e.target.value);
    } // disabled={!region}
    ,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 278,
      columnNumber: 13
    }
  }, __jsx("option", {
    value: "",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 283,
      columnNumber: 15
    }
  }, "Letter"), letters.map(function (l) {
    return __jsx("option", {
      key: l,
      value: l,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 284,
        columnNumber: 32
      }
    }, l);
  })))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 288,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, {
    className: _NewLocal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.formGroup,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 289,
      columnNumber: 11
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 290,
      columnNumber: 13
    }
  }, "Section Number"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Select, {
    value: sectionNumber,
    onChange: function onChange(e) {
      return setSectionNumber(e.target.value);
    } // disabled={!region}
    ,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 291,
      columnNumber: 13
    }
  }, __jsx("option", {
    value: "",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 296,
      columnNumber: 15
    }
  }, "Number"), numbers.map(function (n) {
    return __jsx("option", {
      key: n,
      value: n,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 297,
        columnNumber: 32
      }
    }, n);
  }))))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Row"], {
    className: "mt-3",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 302,
      columnNumber: 7
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 303,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, {
    className: _NewLocal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.formGroup,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 304,
      columnNumber: 11
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 305,
      columnNumber: 13
    }
  }, "Bin"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Stack"], {
    direction: "horizontal",
    gap: 2,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 306,
      columnNumber: 13
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Select, {
    value: binSelected,
    onChange: function onChange(e) {
      return setBinSelected(e.target.value);
    } // disabled={!region}
    ,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 307,
      columnNumber: 15
    }
  }, __jsx("option", {
    value: "",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 312,
      columnNumber: 17
    }
  }, "Select bin"), binOptions.map(function (b) {
    return __jsx("option", {
      key: b,
      value: b,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 313,
        columnNumber: 38
      }
    }, b);
  })), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], {
    variant: "outline-secondary",
    onClick: handleAddBin,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 315,
      columnNumber: 15
    }
  }, "+ Bin")))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 321,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, {
    className: _NewLocal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.formGroup,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 322,
      columnNumber: 11
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 323,
      columnNumber: 11
    }
  }, "Pallet"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Stack"], {
    direction: "horizontal",
    gap: 2,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 324,
      columnNumber: 11
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Select, {
    value: palletSelected,
    onChange: function onChange(e) {
      return setPalletSelected(e.target.value);
    } // disabled={!region}
    ,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 325,
      columnNumber: 11
    }
  }, __jsx("option", {
    value: "",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 330,
      columnNumber: 15
    }
  }, "Select pallet"), palletOptions.map(function (p) {
    return __jsx("option", {
      key: p,
      value: p,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 331,
        columnNumber: 41
      }
    }, p);
  })), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], {
    variant: "outline-secondary",
    onClick: handleAddPallet,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 333,
      columnNumber: 15
    }
  }, "+ Pallet"))))), __jsx("div", {
    className: _NewLocal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.actionRow,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 341,
      columnNumber: 7
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], {
    variant: "outline-primary",
    onClick: openMap,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 342,
      columnNumber: 9
    }
  }, "Map"), __jsx("div", {
    className: _NewLocal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.actionSpacer,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 345,
      columnNumber: 9
    }
  }), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], {
    variant: "secondary",
    onClick: onCancel,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 346,
      columnNumber: 9
    }
  }, "Cancel"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], {
    variant: "primary",
    onClick: handleOk,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 349,
      columnNumber: 9
    }
  }, "OK")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Modal"], {
    show: showMap,
    onHide: function onHide() {
      return setShowMap(false);
    },
    centered: true,
    size: "lg",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 354,
      columnNumber: 7
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Modal"].Header, {
    closeButton: true,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 360,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Modal"].Title, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 361,
      columnNumber: 11
    }
  }, "Warehouse Map")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Modal"].Body, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 363,
      columnNumber: 9
    }
  }, mapLoading && __jsx("div", {
    className: _NewLocal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.mapLoading,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 365,
      columnNumber: 13
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Spinner"], {
    animation: "border",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 366,
      columnNumber: 15
    }
  }), __jsx("span", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 367,
      columnNumber: 15
    }
  }, "Loading map data\u2026")), mapError && __jsx("div", {
    className: _NewLocal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.mapError,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 370,
      columnNumber: 24
    }
  }, mapError), !mapLoading && mapStep === "regions" && __jsx("div", {
    className: _NewLocal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.mapStage,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 373,
      columnNumber: 13
    }
  }, __jsx("div", {
    className: _NewLocal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.mapHint,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 374,
      columnNumber: 15
    }
  }, "Select a region"), __jsx("div", {
    className: _NewLocal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.mapCanvas,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 375,
      columnNumber: 15
    }
  }, ["E", "F", "G", "A", "D", "C", "B"].map(function (regionId) {
    return __jsx("button", {
      key: regionId,
      type: "button",
      className: "".concat(_NewLocal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.regionBlock, " ").concat(_NewLocal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a["region".concat(regionId)]),
      onClick: function onClick() {
        return handleSelectRegion(regionId);
      },
      disabled: !regionLetters.includes(regionId),
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 377,
        columnNumber: 19
      }
    }, regionId);
  }))), !mapLoading && mapStep === "grid" && __jsx("div", {
    className: _NewLocal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.mapStage,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 392,
      columnNumber: 13
    }
  }, __jsx("div", {
    className: _NewLocal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.mapHint,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 393,
      columnNumber: 15
    }
  }, "Region ", mapRegion, ": choose a row and column"), function () {
    var dims = getRegionDimensions(mapRegion);
    var rows = letters.slice(0, dims.rows || 0);
    var cols = numbers.slice(0, dims.cols || 0);

    if (!rows.length || !cols.length) {
      return __jsx("div", {
        className: _NewLocal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.mapEmpty,
        __self: _this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 402,
          columnNumber: 21
        }
      }, "No grid data for this region.");
    }

    return __jsx("div", {
      className: _NewLocal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.gridWrapper,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 408,
        columnNumber: 19
      }
    }, __jsx("div", {
      className: _NewLocal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.grid,
      style: {
        "--grid-cols": cols.length
      },
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 409,
        columnNumber: 21
      }
    }, rows.map(function (row) {
      return cols.map(function (col) {
        var _mapCellPallets$cellK;

        var cellKey = "".concat(row, "-").concat(col);
        var hasPallets = Boolean((_mapCellPallets$cellK = mapCellPallets[cellKey]) === null || _mapCellPallets$cellK === void 0 ? void 0 : _mapCellPallets$cellK.length);
        return __jsx("button", {
          key: cellKey,
          type: "button",
          className: "".concat(_NewLocal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.gridCell, " ").concat(hasPallets ? "" : _NewLocal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.gridCellDisabled),
          onClick: function onClick() {
            return hasPallets && handleSelectCell(row, col);
          },
          disabled: !hasPallets,
          __self: _this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 420,
            columnNumber: 29
          }
        }, __jsx("span", {
          __self: _this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 431,
            columnNumber: 31
          }
        }, row, col));
      });
    })));
  }()), !mapLoading && mapStep === "pallets" && __jsx("div", {
    className: _NewLocal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.mapStage,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 444,
      columnNumber: 13
    }
  }, __jsx("div", {
    className: _NewLocal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.mapHint,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 445,
      columnNumber: 15
    }
  }, "Region ", mapRegion, " \xB7 Section ", mapRow, mapCol, ": select a pallet"), __jsx("div", {
    className: _NewLocal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.palletGrid,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 448,
      columnNumber: 15
    }
  }, (mapCellPallets["".concat(mapRow, "-").concat(mapCol)] || []).map(function (pallet) {
    var palletKey = "".concat(mapRow, "-").concat(mapCol, "-P").concat(pallet);
    var bins = mapPalletBins[palletKey] || [];
    return __jsx("button", {
      key: pallet,
      type: "button",
      className: _NewLocal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.palletButton,
      onClick: function onClick() {
        if (bins.length === 0) {
          handleViewInventory({
            region: mapRegion,
            sectionLetter: mapRow,
            sectionNumber: mapCol,
            pallet: pallet,
            bin: ""
          });
          setShowMap(false);
          return;
        }

        handleSelectPallet(pallet);
      },
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 453,
        columnNumber: 21
      }
    }, "Pallet ", pallet);
  }), !(mapCellPallets["".concat(mapRow, "-").concat(mapCol)] || []).length && __jsx("div", {
    className: _NewLocal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.mapEmpty,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 477,
      columnNumber: 19
    }
  }, "No pallets available here."))), !mapLoading && mapStep === "bins" && __jsx("div", {
    className: _NewLocal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.mapStage,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 486,
      columnNumber: 13
    }
  }, __jsx("div", {
    className: _NewLocal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.mapHint,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 487,
      columnNumber: 15
    }
  }, "Region ", mapRegion, " \xB7 Section ", mapRow, mapCol, " \xB7 Pallet ", mapPallet), __jsx("div", {
    className: _NewLocal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.palletGrid,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 490,
      columnNumber: 15
    }
  }, (mapPalletBins["".concat(mapRow, "-").concat(mapCol, "-P").concat(mapPallet)] || []).map(function (bin) {
    return __jsx("button", {
      key: bin,
      type: "button",
      className: "".concat(_NewLocal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.palletButton, " ").concat(_NewLocal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.binButton),
      onClick: function onClick() {
        return handleSelectBin(bin);
      },
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 493,
        columnNumber: 21
      }
    }, "Bin ", bin);
  }), !(mapPalletBins["".concat(mapRow, "-").concat(mapCol, "-P").concat(mapPallet)] || []).length && __jsx("div", {
    className: _NewLocal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.mapEmpty,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 505,
      columnNumber: 19
    }
  }, "No bins available on this pallet.")))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Modal"].Footer, {
    className: _NewLocal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.mapFooter,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 513,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], {
    variant: "outline-secondary",
    onClick: handleMapBack,
    disabled: mapStep === "regions",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 514,
      columnNumber: 11
    }
  }, "Back"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], {
    variant: "outline-primary",
    onClick: handleViewInventory,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 521,
      columnNumber: 11
    }
  }, "View"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], {
    variant: "secondary",
    onClick: function onClick() {
      return setShowMap(false);
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 524,
      columnNumber: 11
    }
  }, "Close"))));
}

_s(NewLocal, "vKdC31NiYYU9cZY5vwtIqxoKNAY=", false, function () {
  return [next_router__WEBPACK_IMPORTED_MODULE_4__["useRouter"]];
});

_c = NewLocal;

var _c;

$RefreshReg$(_c, "NewLocal");

;
    var _a, _b;
    // Legacy CSS implementations will `eval` browser code in a Node.js context
    // to extract CSS. For backwards compatibility, we need to check we're in a
    // browser context before continuing.
    if (typeof self !== 'undefined' &&
        // AMP / No-JS mode does not inject these helpers:
        '$RefreshHelpers$' in self) {
        var currentExports = module.__proto__.exports;
        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;
        // This cannot happen in MainTemplate because the exports mismatch between
        // templating and execution.
        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);
        // A module can be accepted automatically based on its exports, e.g. when
        // it is a Refresh Boundary.
        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
            // Save the previous exports on update so we can compare the boundary
            // signatures.
            module.hot.dispose(function (data) {
                data.prevExports = currentExports;
            });
            // Unconditionally accept an update to this module, we'll check if it's
            // still a Refresh Boundary later.
            module.hot.accept();
            // This field is set when the previous version of this module was a
            // Refresh Boundary, letting us know we need to check for invalidation or
            // enqueue an update.
            if (prevExports !== null) {
                // A boundary can become ineligible if its exports are incompatible
                // with the previous exports.
                //
                // For example, if you add/remove/change exports, we'll want to
                // re-execute the importing modules, and force those components to
                // re-render. Similarly, if you convert a class component to a
                // function, we want to invalidate the boundary.
                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {
                    module.hot.invalidate();
                }
                else {
                    self.$RefreshHelpers$.scheduleUpdate();
                }
            }
        }
        else {
            // Since we just executed the code for the module, it's possible that the
            // new exports made it ineligible for being a boundary.
            // We only care about the case when we were _previously_ a boundary,
            // because we already accepted this update (accidental side effect).
            var isNoLongerABoundary = prevExports !== null;
            if (isNoLongerABoundary) {
                module.hot.invalidate();
            }
        }
    }

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/next/dist/compiled/webpack/harmony-module.js */ "./node_modules/next/dist/compiled/webpack/harmony-module.js")(module)))

/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vcGFnZXMvTmV3U2VhcmNoL2l0ZW0vL05ld0xvY2FsLmpzIl0sIm5hbWVzIjpbIk5ld0xvY2FsIiwib25TYXZlIiwib25DYW5jZWwiLCJzZWxlY3RlZENsaWVudCIsInNob3dMb2NhbExvYyIsInZhbHVlIiwib25DaGFuZ2UiLCJyb3V0ZXIiLCJ1c2VSb3V0ZXIiLCJ1c2VTdGF0ZSIsInJlZ2lvbk9wdGlvbnMiLCJzZXRSZWdpb25PcHRpb25zIiwic2VjdGlvbk1hcCIsInNldFNlY3Rpb25NYXAiLCJiaW5Db3VudCIsInNldEJpbkNvdW50IiwicGFsbGV0Q291bnQiLCJzZXRQYWxsZXRDb3VudCIsInJlZ2lvbiIsInNldFJlZ2lvbiIsInNlY3Rpb25MZXR0ZXIiLCJzZXRTZWN0aW9uTGV0dGVyIiwic2VjdGlvbk51bWJlciIsInNldFNlY3Rpb25OdW1iZXIiLCJiaW5TZWxlY3RlZCIsInNldEJpblNlbGVjdGVkIiwicGFsbGV0U2VsZWN0ZWQiLCJzZXRQYWxsZXRTZWxlY3RlZCIsInNob3dNYXAiLCJzZXRTaG93TWFwIiwibWFwU3RlcCIsInNldE1hcFN0ZXAiLCJtYXBSZWdpb24iLCJzZXRNYXBSZWdpb24iLCJtYXBSb3ciLCJzZXRNYXBSb3ciLCJtYXBDb2wiLCJzZXRNYXBDb2wiLCJtYXBQYWxsZXQiLCJzZXRNYXBQYWxsZXQiLCJtYXBDZWxsUGFsbGV0cyIsInNldE1hcENlbGxQYWxsZXRzIiwibWFwUGFsbGV0QmlucyIsInNldE1hcFBhbGxldEJpbnMiLCJtYXBMb2FkaW5nIiwic2V0TWFwTG9hZGluZyIsIm1hcEVycm9yIiwic2V0TWFwRXJyb3IiLCJ1c2VFZmZlY3QiLCJkYiIsImZpcmViYXNlIiwiZmlyZXN0b3JlIiwiY29sbGVjdGlvbiIsImRvYyIsImdldCIsInRoZW4iLCJkIiwiZGF0YSIsIlJlZ2lvbiIsIlNlY3Rpb24iLCJCaW4iLCJQYWxsZXQiLCJzZWN0aW9uIiwibGV0dGVyIiwibnVtYmVyIiwiYmluIiwidG9TdHJpbmciLCJwYWxsZXQiLCJwIiwicGFyc2VJbnQiLCJsZXR0ZXJzIiwiQXJyYXkiLCJmcm9tIiwibGVuZ3RoIiwiXyIsImkiLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJudW1iZXJzIiwiYmluT3B0aW9ucyIsInBhbGxldE9wdGlvbnMiLCJyZWdpb25MZXR0ZXJzIiwidXNlTWVtbyIsImlzQXJyYXkiLCJnZXRSZWdpb25EaW1lbnNpb25zIiwicmVnaW9uSWQiLCJlbnRyeSIsImNvbHMiLCJyb3dzIiwiTnVtYmVyIiwiaXNGaW5pdGUiLCJsb2FkUmVnaW9uSW52ZW50b3J5Iiwid2hlcmUiLCJzbmFwIiwiY2VsbFBhbGxldHMiLCJwYWxsZXRCaW5zIiwiZm9yRWFjaCIsImxvYyIsIm5ld0xvY2FsQ3VycmVudCIsInJvdyIsImNvbCIsInRyaW1tZWQiLCJ0cmltIiwic2xpY2UiLCJ1bmRlZmluZWQiLCJjZWxsS2V5IiwiU2V0IiwiYWRkIiwicGFsbGV0S2V5IiwiY2VsbE9iaiIsIk9iamVjdCIsImtleXMiLCJrZXkiLCJzb3J0IiwiYSIsImIiLCJwYWxsZXRPYmoiLCJjb25zb2xlIiwiZXJyb3IiLCJoYW5kbGVBZGRCaW4iLCJuZXh0IiwidXBkYXRlIiwiaGFuZGxlQWRkUGFsbGV0IiwiaGFuZGxlT2siLCJvcGVuTWFwIiwiaGFuZGxlU2VsZWN0UmVnaW9uIiwiaGFuZGxlU2VsZWN0Q2VsbCIsInJvd0xldHRlciIsImNvbE51bWJlciIsImhhbmRsZVNlbGVjdFBhbGxldCIsInBhbGxldElkIiwiaGFuZGxlU2VsZWN0QmluIiwiYmluSWQiLCJoYW5kbGVNYXBCYWNrIiwiaGFuZGxlVmlld0ludmVudG9yeSIsIm92ZXJyaWRlcyIsInBhcmFtcyIsIlVSTFNlYXJjaFBhcmFtcyIsInJlZ2lvblZhbHVlIiwibGV0dGVyVmFsdWUiLCJudW1iZXJWYWx1ZSIsInBhbGxldFZhbHVlIiwiYmluVmFsdWUiLCJzZXQiLCJxdWVyeSIsInB1c2giLCJzdHlsZXMiLCJ3cmFwcGVyIiwiZm9ybVJvdyIsImZvcm1Hcm91cCIsImUiLCJ0YXJnZXQiLCJtYXAiLCJyIiwibCIsIm4iLCJhY3Rpb25Sb3ciLCJhY3Rpb25TcGFjZXIiLCJtYXBTdGFnZSIsIm1hcEhpbnQiLCJtYXBDYW52YXMiLCJyZWdpb25CbG9jayIsImluY2x1ZGVzIiwiZGltcyIsIm1hcEVtcHR5IiwiZ3JpZFdyYXBwZXIiLCJncmlkIiwiaGFzUGFsbGV0cyIsIkJvb2xlYW4iLCJncmlkQ2VsbCIsImdyaWRDZWxsRGlzYWJsZWQiLCJwYWxsZXRHcmlkIiwiYmlucyIsInBhbGxldEJ1dHRvbiIsImJpbkJ1dHRvbiIsIm1hcEZvb3RlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRWUsU0FBU0EsUUFBVCxPQU9aO0FBQUE7O0FBQUE7O0FBQUEseUJBTkRDLE1BTUM7QUFBQSxNQU5EQSxNQU1DLDRCQU5RLFlBQU0sQ0FBRSxDQU1oQjtBQUFBLDJCQUxEQyxRQUtDO0FBQUEsTUFMREEsUUFLQyw4QkFMVSxZQUFNLENBQUUsQ0FLbEI7QUFBQSxNQUpEQyxjQUlDLFFBSkRBLGNBSUM7QUFBQSxNQUhEQyxZQUdDLFFBSERBLFlBR0M7QUFBQSx3QkFGREMsS0FFQztBQUFBLE1BRkRBLEtBRUMsMkJBRk8sRUFFUDtBQUFBLE1BRERDLFFBQ0MsUUFEREEsUUFDQztBQUNELE1BQU1DLE1BQU0sR0FBR0MsNkRBQVMsRUFBeEI7O0FBREMsa0JBRXlDQyxzREFBUSxDQUFDLEVBQUQsQ0FGakQ7QUFBQSxNQUVNQyxhQUZOO0FBQUEsTUFFcUJDLGdCQUZyQjs7QUFBQSxtQkFHdUNGLHNEQUFRLENBQUMsRUFBRCxDQUgvQztBQUFBLE1BR01HLFVBSE47QUFBQSxNQUdrQkMsYUFIbEI7O0FBQUEsbUJBSXVDSixzREFBUSxDQUFDLENBQUQsQ0FKL0M7QUFBQSxNQUlNSyxRQUpOO0FBQUEsTUFJZ0JDLFdBSmhCOztBQUFBLG1CQUt1Q04sc0RBQVEsQ0FBQyxDQUFELENBTC9DO0FBQUEs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QUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQVJGLEVBV0UsTUFBQyxzREFBRDtBQUFRLFdBQU8sRUFBQyxXQUFoQjtBQUE0QixXQUFPLEVBQUU7QUFBQSxhQUFNekcsVUFBVSxDQUFDLEtBQUQsQ0FBaEI7QUFBQSxLQUFyQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBWEYsQ0EvSkYsQ0E1RkYsQ0FERjtBQThRRDs7R0EzZ0J1QjdCLFE7VUFRUFEscUQ7OztLQVJPUixRIiwiZmlsZSI6InN0YXRpYy93ZWJwYWNrL3BhZ2VzL05ld1NlYXJjaC9pdGVtL1tpZF0uNTRkZjQzNjlmMTk1ODVhODBlOTAuaG90LXVwZGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5ld0xvY2FsLmpzXG5pbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCwgdXNlTWVtbyB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgRm9ybSwgUm93LCBDb2wsIEJ1dHRvbiwgU3RhY2ssIE1vZGFsLCBTcGlubmVyIH0gZnJvbSBcInJlYWN0LWJvb3RzdHJhcFwiO1xuaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSBcIm5leHQvcm91dGVyXCI7XG5pbXBvcnQgZmlyZWJhc2UgZnJvbSBcIi4uLy4uLy4uLy4uL2NvbnRleHQvRmlyZWJhc2VcIjtcbmltcG9ydCBzdHlsZXMgZnJvbSBcIi4vTmV3TG9jYWwubW9kdWxlLmNzc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBOZXdMb2NhbCh7XG4gIG9uU2F2ZSA9ICgpID0+IHt9LFxuICBvbkNhbmNlbCA9ICgpID0+IHt9LFxuICBzZWxlY3RlZENsaWVudCxcbiAgc2hvd0xvY2FsTG9jLFxuICB2YWx1ZSA9IHt9LFxuICBvbkNoYW5nZSxcbn0pIHtcbiAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XG4gIGNvbnN0IFtyZWdpb25PcHRpb25zLCBzZXRSZWdpb25PcHRpb25zXSA9IHVzZVN0YXRlKFtdKTtcbiAgY29uc3QgW3NlY3Rpb25NYXAsIHNldFNlY3Rpb25NYXBdICAgICA9IHVzZVN0YXRlKHt9KTtcbiAgY29uc3QgW2JpbkNvdW50LCBzZXRCaW5Db3VudF0gICAgICAgICA9IHVzZVN0YXRlKDApO1xuICBjb25zdCBbcGFsbGV0Q291bnQsIHNldFBhbGxldENvdW50XSAgID0gdXNlU3RhdGUoMCk7XG5cbiAgY29uc3QgW3JlZ2lvbiwgc2V0UmVnaW9uXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbc2VjdGlvbkxldHRlciwgc2V0U2VjdGlvbkxldHRlcl0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW3NlY3Rpb25OdW1iZXIsIHNldFNlY3Rpb25OdW1iZXJdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtiaW5TZWxlY3RlZCwgc2V0QmluU2VsZWN0ZWRdICAgICA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbcGFsbGV0U2VsZWN0ZWQsIHNldFBhbGxldFNlbGVjdGVkXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbc2hvd01hcCwgc2V0U2hvd01hcF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFttYXBTdGVwLCBzZXRNYXBTdGVwXSA9IHVzZVN0YXRlKFwicmVnaW9uc1wiKTtcbiAgY29uc3QgW21hcFJlZ2lvbiwgc2V0TWFwUmVnaW9uXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbbWFwUm93LCBzZXRNYXBSb3ddID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFttYXBDb2wsIHNldE1hcENvbF0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW21hcFBhbGxldCwgc2V0TWFwUGFsbGV0XSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbbWFwQ2VsbFBhbGxldHMsIHNldE1hcENlbGxQYWxsZXRzXSA9IHVzZVN0YXRlKHt9KTtcbiAgY29uc3QgW21hcFBhbGxldEJpbnMsIHNldE1hcFBhbGxldEJpbnNdID0gdXNlU3RhdGUoe30pO1xuICBjb25zdCBbbWFwTG9hZGluZywgc2V0TWFwTG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFttYXBFcnJvciwgc2V0TWFwRXJyb3JdID0gdXNlU3RhdGUoXCJcIik7XG5cbiAgLy8gMSkgbG9hZCBkaXJlY3RvcnkgZXhhY3RseSBhcyBiZWZvcmVcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIXNob3dMb2NhbExvYykgcmV0dXJuO1xuICAgIGNvbnN0IGRiID0gZmlyZWJhc2UuZmlyZXN0b3JlKCk7XG4gICAgZGIuY29sbGVjdGlvbihcIldhcmVob3VzZVwiKS5kb2MoXCJkaXJlY3RvcnlcIikuZ2V0KCkudGhlbihkb2MgPT4ge1xuICAgICAgY29uc3QgZCA9IGRvYy5kYXRhKCkgfHwge307XG4gICAgICBzZXRSZWdpb25PcHRpb25zKGQuUmVnaW9uICAgfHwgW10pO1xuICAgICAgc2V0U2VjdGlvbk1hcCAgIChkLlNlY3Rpb24gIHx8IHt9KTtcbiAgICAgIHNldEJpbkNvdW50ICAgICAoZC5CaW4gICAgICB8fCAwKTtcbiAgICAgIHNldFBhbGxldENvdW50ICAoZC5QYWxsZXQgICB8fCAwKTtcbiAgICB9KTtcbiAgfSwgW3Nob3dMb2NhbExvY10pO1xuXG4gIC8vIDIpIHdoZW4gd2Ugb3BlbiB0aGUgbW9kYWwgKG9yIHZhbHVlIGNoYW5nZXMpLCBpbml0aWFsaXplIGZyb20gdmFsdWVcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIXNob3dMb2NhbExvYykgcmV0dXJuO1xuICAgIHNldFJlZ2lvbiAgICAgICAgKHZhbHVlLnJlZ2lvbiAgICAgICAgICAgICB8fCBcIlwiKTtcbiAgICBzZXRTZWN0aW9uTGV0dGVyKHZhbHVlLnNlY3Rpb24/LmxldHRlciAgICB8fCBcIlwiKTtcbiAgICBzZXRTZWN0aW9uTnVtYmVyKHZhbHVlLnNlY3Rpb24/Lm51bWJlciAgICB8fCBcIlwiKTtcbiAgICBzZXRCaW5TZWxlY3RlZCAgICh2YWx1ZS5iaW4/LnRvU3RyaW5nKCkgICAgfHwgXCJcIik7XG4gICAgc2V0UGFsbGV0U2VsZWN0ZWQodmFsdWUucGFsbGV0Py50b1N0cmluZygpfHwgXCJcIik7XG4gIH0sIFtzaG93TG9jYWxMb2NdKTtcblxuICAvLyAzKSBub3RpZnkgcGFyZW50IG9uIGFueSBjaGFuZ2VcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBwID0ge307XG4gICAgaWYgKHJlZ2lvbikgICAgICAgICBwLnJlZ2lvbiAgPSByZWdpb247XG4gICAgaWYgKHNlY3Rpb25MZXR0ZXIgJiYgc2VjdGlvbk51bWJlcikgcC5zZWN0aW9uID0geyBsZXR0ZXI6IHNlY3Rpb25MZXR0ZXIsIG51bWJlcjogc2VjdGlvbk51bWJlciB9O1xuICAgIGlmIChiaW5TZWxlY3RlZCkgICAgcC5iaW4gICAgID0gcGFyc2VJbnQoYmluU2VsZWN0ZWQsMTApO1xuICAgIGlmIChwYWxsZXRTZWxlY3RlZCkgcC5wYWxsZXQgID0gcGFyc2VJbnQocGFsbGV0U2VsZWN0ZWQsMTApO1xuICAgIG9uQ2hhbmdlKHApO1xuICB9LCBbcmVnaW9uLCBzZWN0aW9uTGV0dGVyLCBzZWN0aW9uTnVtYmVyLCBiaW5TZWxlY3RlZCwgcGFsbGV0U2VsZWN0ZWRdKTtcblxuICAvLyBoZWxwZXJzOlxuY29uc3QgbGV0dGVycyA9IEFycmF5LmZyb20oeyBsZW5ndGg6IDI2IH0sIChfLCBpKSA9PiBTdHJpbmcuZnJvbUNoYXJDb2RlKDY1ICsgaSkpO1xuY29uc3QgbnVtYmVycyA9IEFycmF5LmZyb20oeyBsZW5ndGg6IDUwIH0sIChfLCBpKSA9PiBpICsgMSk7XG4gIGNvbnN0IGJpbk9wdGlvbnMgPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiBiaW5Db3VudCB9LCAoXywgaSkgPT4gaSArIDEpO1xuICBjb25zdCBwYWxsZXRPcHRpb25zID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogcGFsbGV0Q291bnQgfSwgKF8sIGkpID0+IGkgKyAxKTtcbiAgY29uc3QgcmVnaW9uTGV0dGVycyA9IHVzZU1lbW8oXG4gICAgKCkgPT4gKEFycmF5LmlzQXJyYXkocmVnaW9uT3B0aW9ucykgJiYgcmVnaW9uT3B0aW9ucy5sZW5ndGggPyByZWdpb25PcHRpb25zIDogW1wiQVwiLCBcIkJcIiwgXCJDXCIsIFwiRFwiLCBcIkVcIiwgXCJGXCIsIFwiR1wiXSksXG4gICAgW3JlZ2lvbk9wdGlvbnNdXG4gICk7XG4gIGNvbnN0IGdldFJlZ2lvbkRpbWVuc2lvbnMgPSAocmVnaW9uSWQpID0+IHtcbiAgICBjb25zdCBlbnRyeSA9IHNlY3Rpb25NYXA/LltyZWdpb25JZF07XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZW50cnkpICYmIGVudHJ5Lmxlbmd0aCA+PSAyKSB7XG4gICAgICBjb25zdCBjb2xzID0gcGFyc2VJbnQoZW50cnlbMF0sIDEwKTtcbiAgICAgIGNvbnN0IHJvd3MgPSBwYXJzZUludChlbnRyeVsxXSwgMTApO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY29sczogTnVtYmVyLmlzRmluaXRlKGNvbHMpID8gY29scyA6IDAsXG4gICAgICAgIHJvd3M6IE51bWJlci5pc0Zpbml0ZShyb3dzKSA/IHJvd3MgOiAwLFxuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHsgY29sczogMCwgcm93czogMCB9O1xuICB9O1xuXG4gIGNvbnN0IGxvYWRSZWdpb25JbnZlbnRvcnkgPSBhc3luYyAocmVnaW9uSWQpID0+IHtcbiAgICBpZiAoIXJlZ2lvbklkKSByZXR1cm47XG4gICAgc2V0TWFwTG9hZGluZyh0cnVlKTtcbiAgICBzZXRNYXBFcnJvcihcIlwiKTtcbiAgICB0cnkge1xuICAgICAgY29uc3Qgc25hcCA9IGF3YWl0IGZpcmViYXNlXG4gICAgICAgIC5maXJlc3RvcmUoKVxuICAgICAgICAuY29sbGVjdGlvbihcIlRlc3RcIilcbiAgICAgICAgLndoZXJlKFwibmV3TG9jYWxDdXJyZW50LnJlZ2lvblwiLCBcIj09XCIsIHJlZ2lvbklkKVxuICAgICAgICAuZ2V0KCk7XG5cbiAgICAgIGNvbnN0IGNlbGxQYWxsZXRzID0ge307XG4gICAgICBjb25zdCBwYWxsZXRCaW5zID0ge307XG4gICAgICBzbmFwLmZvckVhY2goKGRvYykgPT4ge1xuICAgICAgICBjb25zdCBsb2MgPSBkb2MuZGF0YSgpPy5uZXdMb2NhbEN1cnJlbnQgfHwge307XG4gICAgICAgIGxldCByb3cgPSBsb2Muc2VjdGlvbj8ubGV0dGVyO1xuICAgICAgICBsZXQgY29sID0gbG9jLnNlY3Rpb24/Lm51bWJlcjtcbiAgICAgICAgaWYgKCghcm93IHx8ICFjb2wpICYmIHR5cGVvZiBsb2Muc2VjdGlvbiA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgIGNvbnN0IHRyaW1tZWQgPSBsb2Muc2VjdGlvbi50cmltKCk7XG4gICAgICAgICAgcm93ID0gdHJpbW1lZC5zbGljZSgwLCAxKTtcbiAgICAgICAgICBjb2wgPSB0cmltbWVkLnNsaWNlKDEpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb2wgIT09IHVuZGVmaW5lZCAmJiBjb2wgIT09IG51bGwpIHtcbiAgICAgICAgICBjb2wgPSBTdHJpbmcoY29sKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwYWxsZXQgPSBsb2MucGFsbGV0O1xuICAgICAgICBjb25zdCBiaW4gPSBsb2MuYmluO1xuICAgICAgICBpZiAoIXJvdyB8fCAhY29sKSByZXR1cm47XG4gICAgICAgIGNvbnN0IGNlbGxLZXkgPSBgJHtyb3d9LSR7Y29sfWA7XG4gICAgICAgIGlmIChwYWxsZXQgIT09IHVuZGVmaW5lZCAmJiBwYWxsZXQgIT09IG51bGwgJiYgYCR7cGFsbGV0fWAgIT09IFwiXCIpIHtcbiAgICAgICAgICBpZiAoIWNlbGxQYWxsZXRzW2NlbGxLZXldKSBjZWxsUGFsbGV0c1tjZWxsS2V5XSA9IG5ldyBTZXQoKTtcbiAgICAgICAgICBjZWxsUGFsbGV0c1tjZWxsS2V5XS5hZGQoU3RyaW5nKHBhbGxldCkpO1xuICAgICAgICAgIGlmIChiaW4gIT09IHVuZGVmaW5lZCAmJiBiaW4gIT09IG51bGwgJiYgYCR7YmlufWAgIT09IFwiXCIpIHtcbiAgICAgICAgICAgIGNvbnN0IHBhbGxldEtleSA9IGAke2NlbGxLZXl9LVAke3BhbGxldH1gO1xuICAgICAgICAgICAgaWYgKCFwYWxsZXRCaW5zW3BhbGxldEtleV0pIHBhbGxldEJpbnNbcGFsbGV0S2V5XSA9IG5ldyBTZXQoKTtcbiAgICAgICAgICAgIHBhbGxldEJpbnNbcGFsbGV0S2V5XS5hZGQoU3RyaW5nKGJpbikpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IGNlbGxPYmogPSB7fTtcbiAgICAgIE9iamVjdC5rZXlzKGNlbGxQYWxsZXRzKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgY2VsbE9ialtrZXldID0gQXJyYXkuZnJvbShjZWxsUGFsbGV0c1trZXldKS5zb3J0KFxuICAgICAgICAgIChhLCBiKSA9PiBOdW1iZXIoYSkgLSBOdW1iZXIoYilcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBwYWxsZXRPYmogPSB7fTtcbiAgICAgIE9iamVjdC5rZXlzKHBhbGxldEJpbnMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICBwYWxsZXRPYmpba2V5XSA9IEFycmF5LmZyb20ocGFsbGV0Qmluc1trZXldKS5zb3J0KFxuICAgICAgICAgIChhLCBiKSA9PiBOdW1iZXIoYSkgLSBOdW1iZXIoYilcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuXG4gICAgICBzZXRNYXBDZWxsUGFsbGV0cyhjZWxsT2JqKTtcbiAgICAgIHNldE1hcFBhbGxldEJpbnMocGFsbGV0T2JqKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byBsb2FkIG1hcCBpbnZlbnRvcnlcIiwgZXJyb3IpO1xuICAgICAgc2V0TWFwRXJyb3IoXCJGYWlsZWQgdG8gbG9hZCBtYXAgaW52ZW50b3J5LlwiKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0TWFwTG9hZGluZyhmYWxzZSk7XG4gICAgfVxuICB9O1xuXG4gIC8vIGJ1bXAgYW5kIHBlcnNpc3QgYmluIGNvdW50XG4gIGNvbnN0IGhhbmRsZUFkZEJpbiA9IGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBuZXh0ID0gYmluQ291bnQgKyAxO1xuICAgIGF3YWl0IGZpcmViYXNlLmZpcmVzdG9yZSgpXG4gICAgICAuY29sbGVjdGlvbihcIldhcmVob3VzZVwiKS5kb2MoXCJkaXJlY3RvcnlcIilcbiAgICAgIC51cGRhdGUoeyBCaW46IG5leHQgfSk7XG4gICAgc2V0QmluQ291bnQobmV4dCk7XG4gICAgc2V0QmluU2VsZWN0ZWQobmV4dC50b1N0cmluZygpKTtcbiAgfTtcblxuICAvLyBidW1wIGFuZCBwZXJzaXN0IHBhbGxldCBjb3VudFxuICBjb25zdCBoYW5kbGVBZGRQYWxsZXQgPSBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgbmV4dCA9IHBhbGxldENvdW50ICsgMTtcbiAgICBhd2FpdCBmaXJlYmFzZS5maXJlc3RvcmUoKVxuICAgICAgLmNvbGxlY3Rpb24oXCJXYXJlaG91c2VcIikuZG9jKFwiZGlyZWN0b3J5XCIpXG4gICAgICAudXBkYXRlKHsgUGFsbGV0OiBuZXh0IH0pO1xuICAgIHNldFBhbGxldENvdW50KG5leHQpO1xuICAgIHNldFBhbGxldFNlbGVjdGVkKG5leHQudG9TdHJpbmcoKSk7XG4gIH07XG5cbiAgLy8gb25seSBmaXJlIHBhcmVudCB3aGVuIHRoZXkgY2xpY2sgT0tcbiAgY29uc3QgaGFuZGxlT2sgPSAoKSA9PiB7XG4gICAgY29uc3QgcCA9IHt9O1xuICAgIGlmIChyZWdpb24pIHAucmVnaW9uID0gcmVnaW9uO1xuICAgIGlmIChzZWN0aW9uTGV0dGVyICYmIHNlY3Rpb25OdW1iZXIpXG4gICAgICBwLnNlY3Rpb24gPSB7IGxldHRlcjogc2VjdGlvbkxldHRlciwgbnVtYmVyOiBzZWN0aW9uTnVtYmVyIH07XG4gICAgaWYgKGJpblNlbGVjdGVkKSBwLmJpbiA9IHBhcnNlSW50KGJpblNlbGVjdGVkLCAxMCk7XG4gICAgaWYgKHBhbGxldFNlbGVjdGVkKSBwLnBhbGxldCA9IHBhcnNlSW50KHBhbGxldFNlbGVjdGVkLCAxMCk7XG4gICAgb25TYXZlKHApO1xuICB9O1xuXG4gIGNvbnN0IG9wZW5NYXAgPSAoKSA9PiB7XG4gICAgc2V0TWFwRXJyb3IoXCJcIik7XG4gICAgaWYgKHJlZ2lvbikge1xuICAgICAgc2V0TWFwUmVnaW9uKHJlZ2lvbik7XG4gICAgICBzZXRNYXBTdGVwKFwiZ3JpZFwiKTtcbiAgICAgIGxvYWRSZWdpb25JbnZlbnRvcnkocmVnaW9uKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2V0TWFwUmVnaW9uKFwiXCIpO1xuICAgICAgc2V0TWFwU3RlcChcInJlZ2lvbnNcIik7XG4gICAgfVxuICAgIHNldFNob3dNYXAodHJ1ZSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlU2VsZWN0UmVnaW9uID0gKHJlZ2lvbklkKSA9PiB7XG4gICAgc2V0TWFwUmVnaW9uKHJlZ2lvbklkKTtcbiAgICBzZXRSZWdpb24ocmVnaW9uSWQpO1xuICAgIHNldE1hcFJvdyhcIlwiKTtcbiAgICBzZXRNYXBDb2woXCJcIik7XG4gICAgc2V0TWFwUGFsbGV0KFwiXCIpO1xuICAgIHNldFBhbGxldFNlbGVjdGVkKFwiXCIpO1xuICAgIHNldEJpblNlbGVjdGVkKFwiXCIpO1xuICAgIHNldE1hcFN0ZXAoXCJncmlkXCIpO1xuICAgIGxvYWRSZWdpb25JbnZlbnRvcnkocmVnaW9uSWQpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVNlbGVjdENlbGwgPSAocm93TGV0dGVyLCBjb2xOdW1iZXIpID0+IHtcbiAgICBzZXRNYXBSb3cocm93TGV0dGVyKTtcbiAgICBzZXRNYXBDb2woY29sTnVtYmVyKTtcbiAgICBzZXRTZWN0aW9uTGV0dGVyKHJvd0xldHRlcik7XG4gICAgc2V0U2VjdGlvbk51bWJlcihTdHJpbmcoY29sTnVtYmVyKSk7XG4gICAgc2V0TWFwUGFsbGV0KFwiXCIpO1xuICAgIHNldFBhbGxldFNlbGVjdGVkKFwiXCIpO1xuICAgIHNldEJpblNlbGVjdGVkKFwiXCIpO1xuICAgIHNldE1hcFN0ZXAoXCJwYWxsZXRzXCIpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVNlbGVjdFBhbGxldCA9IChwYWxsZXRJZCkgPT4ge1xuICAgIHNldE1hcFBhbGxldChwYWxsZXRJZCk7XG4gICAgc2V0UGFsbGV0U2VsZWN0ZWQoU3RyaW5nKHBhbGxldElkKSk7XG4gICAgc2V0QmluU2VsZWN0ZWQoXCJcIik7XG4gICAgc2V0TWFwU3RlcChcImJpbnNcIik7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlU2VsZWN0QmluID0gKGJpbklkKSA9PiB7XG4gICAgc2V0QmluU2VsZWN0ZWQoU3RyaW5nKGJpbklkKSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlTWFwQmFjayA9ICgpID0+IHtcbiAgICBpZiAobWFwU3RlcCA9PT0gXCJiaW5zXCIpIHNldE1hcFN0ZXAoXCJwYWxsZXRzXCIpO1xuICAgIGVsc2UgaWYgKG1hcFN0ZXAgPT09IFwicGFsbGV0c1wiKSBzZXRNYXBTdGVwKFwiZ3JpZFwiKTtcbiAgICBlbHNlIGlmIChtYXBTdGVwID09PSBcImdyaWRcIikgc2V0TWFwU3RlcChcInJlZ2lvbnNcIik7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlVmlld0ludmVudG9yeSA9IChvdmVycmlkZXMgPSB7fSkgPT4ge1xuICAgIGNvbnN0IHBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoKTtcbiAgICBjb25zdCByZWdpb25WYWx1ZSA9IG92ZXJyaWRlcy5yZWdpb24gPz8gbWFwUmVnaW9uID8/IHJlZ2lvbjtcbiAgICBjb25zdCBsZXR0ZXJWYWx1ZSA9IG92ZXJyaWRlcy5zZWN0aW9uTGV0dGVyID8/IG1hcFJvdyA/PyBzZWN0aW9uTGV0dGVyO1xuICAgIGNvbnN0IG51bWJlclZhbHVlID0gb3ZlcnJpZGVzLnNlY3Rpb25OdW1iZXIgPz8gbWFwQ29sID8/IHNlY3Rpb25OdW1iZXI7XG4gICAgY29uc3QgcGFsbGV0VmFsdWUgPSBvdmVycmlkZXMucGFsbGV0ID8/IG1hcFBhbGxldCA/PyBwYWxsZXRTZWxlY3RlZDtcbiAgICBjb25zdCBiaW5WYWx1ZSA9IG92ZXJyaWRlcy5iaW4gPz8gYmluU2VsZWN0ZWQ7XG5cbiAgICBpZiAocmVnaW9uVmFsdWUpIHBhcmFtcy5zZXQoXCJyZWdpb25cIiwgcmVnaW9uVmFsdWUpO1xuICAgIGlmIChsZXR0ZXJWYWx1ZSkgcGFyYW1zLnNldChcInNlY3Rpb25MZXR0ZXJcIiwgbGV0dGVyVmFsdWUpO1xuICAgIGlmIChudW1iZXJWYWx1ZSkgcGFyYW1zLnNldChcInNlY3Rpb25OdW1iZXJcIiwgbnVtYmVyVmFsdWUpO1xuICAgIGlmIChwYWxsZXRWYWx1ZSkgcGFyYW1zLnNldChcInBhbGxldFwiLCBwYWxsZXRWYWx1ZSk7XG4gICAgaWYgKGJpblZhbHVlKSBwYXJhbXMuc2V0KFwiYmluXCIsIGJpblZhbHVlKTtcblxuICAgIGNvbnN0IHF1ZXJ5ID0gcGFyYW1zLnRvU3RyaW5nKCk7XG4gICAgcm91dGVyLnB1c2goXG4gICAgICBgL05ld1NlYXJjaC9pbnZlbnRvcnkvaW52ZW50b3J5TWFuYWdlJHtxdWVyeSA/IGA/JHtxdWVyeX1gIDogXCJcIn1gXG4gICAgKTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMud3JhcHBlcn0+XG4gICAgICA8Um93IGNsYXNzTmFtZT17c3R5bGVzLmZvcm1Sb3d9PlxuICAgICAgICA8Q29sPlxuICAgICAgICAgIDxGb3JtLkdyb3VwIGNsYXNzTmFtZT17c3R5bGVzLmZvcm1Hcm91cH0+XG4gICAgICAgICAgICA8Rm9ybS5MYWJlbD5SZWdpb248L0Zvcm0uTGFiZWw+XG4gICAgICAgICAgICA8Rm9ybS5TZWxlY3RcbiAgICAgICAgICAgICAgdmFsdWU9e3JlZ2lvbn0gb25DaGFuZ2U9e2U9PnNldFJlZ2lvbihlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJcIj5TZWxlY3QgcmVnaW9uPC9vcHRpb24+XG4gICAgICAgICAgICAgIHtyZWdpb25PcHRpb25zLm1hcChyPT4gPG9wdGlvbiBrZXk9e3J9IHZhbHVlPXtyfT57cn08L29wdGlvbj4pfVxuICAgICAgICAgICAgPC9Gb3JtLlNlbGVjdD5cbiAgICAgICAgICA8L0Zvcm0uR3JvdXA+XG4gICAgICAgIDwvQ29sPlxuICAgICAgICA8Q29sPlxuICAgICAgICAgIDxGb3JtLkdyb3VwIGNsYXNzTmFtZT17c3R5bGVzLmZvcm1Hcm91cH0+XG4gICAgICAgICAgICA8Rm9ybS5MYWJlbD5TZWN0aW9uIExldHRlcjwvRm9ybS5MYWJlbD5cbiAgICAgICAgICAgIDxGb3JtLlNlbGVjdFxuICAgICAgICAgICAgICB2YWx1ZT17c2VjdGlvbkxldHRlcn1cbiAgICAgICAgICAgICAgb25DaGFuZ2U9e2U9PnNldFNlY3Rpb25MZXR0ZXIoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAvLyBkaXNhYmxlZD17IXJlZ2lvbn1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlwiPkxldHRlcjwvb3B0aW9uPlxuICAgICAgICAgICAgICB7bGV0dGVycy5tYXAobD0+IDxvcHRpb24ga2V5PXtsfSB2YWx1ZT17bH0+e2x9PC9vcHRpb24+KX1cbiAgICAgICAgICAgIDwvRm9ybS5TZWxlY3Q+XG4gICAgICAgICAgPC9Gb3JtLkdyb3VwPlxuICAgICAgICA8L0NvbD5cbiAgICAgICAgPENvbD5cbiAgICAgICAgICA8Rm9ybS5Hcm91cCBjbGFzc05hbWU9e3N0eWxlcy5mb3JtR3JvdXB9PlxuICAgICAgICAgICAgPEZvcm0uTGFiZWw+U2VjdGlvbiBOdW1iZXI8L0Zvcm0uTGFiZWw+XG4gICAgICAgICAgICA8Rm9ybS5TZWxlY3RcbiAgICAgICAgICAgICAgdmFsdWU9e3NlY3Rpb25OdW1iZXJ9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXtlPT5zZXRTZWN0aW9uTnVtYmVyKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgLy8gZGlzYWJsZWQ9eyFyZWdpb259XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJcIj5OdW1iZXI8L29wdGlvbj5cbiAgICAgICAgICAgICAge251bWJlcnMubWFwKG49PiA8b3B0aW9uIGtleT17bn0gdmFsdWU9e259PntufTwvb3B0aW9uPil9XG4gICAgICAgICAgICA8L0Zvcm0uU2VsZWN0PlxuICAgICAgICAgIDwvRm9ybS5Hcm91cD5cbiAgICAgICAgPC9Db2w+XG4gICAgICA8L1Jvdz5cbiAgICAgIDxSb3cgY2xhc3NOYW1lPVwibXQtM1wiPlxuICAgICAgICA8Q29sPlxuICAgICAgICAgIDxGb3JtLkdyb3VwIGNsYXNzTmFtZT17c3R5bGVzLmZvcm1Hcm91cH0+XG4gICAgICAgICAgICA8Rm9ybS5MYWJlbD5CaW48L0Zvcm0uTGFiZWw+XG4gICAgICAgICAgICA8U3RhY2sgZGlyZWN0aW9uPVwiaG9yaXpvbnRhbFwiIGdhcD17Mn0+XG4gICAgICAgICAgICAgIDxGb3JtLlNlbGVjdFxuICAgICAgICAgICAgICAgIHZhbHVlPXtiaW5TZWxlY3RlZH1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17ZSA9PiBzZXRCaW5TZWxlY3RlZChlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgLy8gZGlzYWJsZWQ9eyFyZWdpb259XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiXCI+U2VsZWN0IGJpbjwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIHtiaW5PcHRpb25zLm1hcChiID0+IDxvcHRpb24ga2V5PXtifSB2YWx1ZT17Yn0+e2J9PC9vcHRpb24+KX1cbiAgICAgICAgICAgICAgPC9Gb3JtLlNlbGVjdD5cbiAgICAgICAgICAgICAgPEJ1dHRvbiB2YXJpYW50PVwib3V0bGluZS1zZWNvbmRhcnlcIiBvbkNsaWNrPXtoYW5kbGVBZGRCaW59ID5cbiAgICAgICAgICAgICAgICArIEJpblxuICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgIDwvU3RhY2s+XG4gICAgICAgICAgPC9Gb3JtLkdyb3VwPlxuICAgICAgICA8L0NvbD5cbiAgICAgICAgPENvbD5cbiAgICAgICAgICA8Rm9ybS5Hcm91cCBjbGFzc05hbWU9e3N0eWxlcy5mb3JtR3JvdXB9PlxuICAgICAgICAgIDxGb3JtLkxhYmVsPlBhbGxldDwvRm9ybS5MYWJlbD5cbiAgICAgICAgICA8U3RhY2sgZGlyZWN0aW9uPVwiaG9yaXpvbnRhbFwiIGdhcD17Mn0+XG4gICAgICAgICAgPEZvcm0uU2VsZWN0XG4gICAgICAgICAgICB2YWx1ZT17cGFsbGV0U2VsZWN0ZWR9XG4gICAgICAgICAgICBvbkNoYW5nZT17ZSA9PnNldFBhbGxldFNlbGVjdGVkKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgLy8gZGlzYWJsZWQ9eyFyZWdpb259XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJcIj5TZWxlY3QgcGFsbGV0PC9vcHRpb24+XG4gICAgICAgICAgICAgICAge3BhbGxldE9wdGlvbnMubWFwKHAgPT4gPG9wdGlvbiBrZXk9e3B9IHZhbHVlPXtwfT57cH08L29wdGlvbj4pfVxuICAgICAgICAgICAgICA8L0Zvcm0uU2VsZWN0PlxuICAgICAgICAgICAgICA8QnV0dG9uIHZhcmlhbnQ9XCJvdXRsaW5lLXNlY29uZGFyeVwiIG9uQ2xpY2s9e2hhbmRsZUFkZFBhbGxldH0gPlxuICAgICAgICAgICAgICAgICsgUGFsbGV0XG4gICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgPC9TdGFjaz5cbiAgICAgICAgICA8L0Zvcm0uR3JvdXA+XG4gICAgICAgIDwvQ29sPlxuICAgICAgPC9Sb3c+XG4gICAgICB7LyogT0sgLyBDYW5jZWwgZm9vdGVyICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5hY3Rpb25Sb3d9PlxuICAgICAgICA8QnV0dG9uIHZhcmlhbnQ9XCJvdXRsaW5lLXByaW1hcnlcIiBvbkNsaWNrPXtvcGVuTWFwfT5cbiAgICAgICAgICBNYXBcbiAgICAgICAgPC9CdXR0b24+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuYWN0aW9uU3BhY2VyfSAvPlxuICAgICAgICA8QnV0dG9uIHZhcmlhbnQ9XCJzZWNvbmRhcnlcIiBvbkNsaWNrPXtvbkNhbmNlbH0+XG4gICAgICAgICAgQ2FuY2VsXG4gICAgICAgIDwvQnV0dG9uPlxuICAgICAgICA8QnV0dG9uIHZhcmlhbnQ9XCJwcmltYXJ5XCIgb25DbGljaz17aGFuZGxlT2t9PlxuICAgICAgICAgIE9LXG4gICAgICAgIDwvQnV0dG9uPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxNb2RhbFxuICAgICAgICBzaG93PXtzaG93TWFwfVxuICAgICAgICBvbkhpZGU9eygpID0+IHNldFNob3dNYXAoZmFsc2UpfVxuICAgICAgICBjZW50ZXJlZFxuICAgICAgICBzaXplPVwibGdcIlxuICAgICAgPlxuICAgICAgICA8TW9kYWwuSGVhZGVyIGNsb3NlQnV0dG9uPlxuICAgICAgICAgIDxNb2RhbC5UaXRsZT5XYXJlaG91c2UgTWFwPC9Nb2RhbC5UaXRsZT5cbiAgICAgICAgPC9Nb2RhbC5IZWFkZXI+XG4gICAgICAgIDxNb2RhbC5Cb2R5PlxuICAgICAgICAgIHttYXBMb2FkaW5nICYmIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubWFwTG9hZGluZ30+XG4gICAgICAgICAgICAgIDxTcGlubmVyIGFuaW1hdGlvbj1cImJvcmRlclwiIC8+XG4gICAgICAgICAgICAgIDxzcGFuPkxvYWRpbmcgbWFwIGRhdGHigKY8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApfVxuICAgICAgICAgIHttYXBFcnJvciAmJiA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLm1hcEVycm9yfT57bWFwRXJyb3J9PC9kaXY+fVxuXG4gICAgICAgICAgeyFtYXBMb2FkaW5nICYmIG1hcFN0ZXAgPT09IFwicmVnaW9uc1wiICYmIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubWFwU3RhZ2V9PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLm1hcEhpbnR9PlNlbGVjdCBhIHJlZ2lvbjwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLm1hcENhbnZhc30+XG4gICAgICAgICAgICAgICAge1tcIkVcIiwgXCJGXCIsIFwiR1wiLCBcIkFcIiwgXCJEXCIsIFwiQ1wiLCBcIkJcIl0ubWFwKChyZWdpb25JZCkgPT4gKFxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBrZXk9e3JlZ2lvbklkfVxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgJHtzdHlsZXMucmVnaW9uQmxvY2t9ICR7c3R5bGVzW2ByZWdpb24ke3JlZ2lvbklkfWBdfWB9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZVNlbGVjdFJlZ2lvbihyZWdpb25JZCl9XG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXshcmVnaW9uTGV0dGVycy5pbmNsdWRlcyhyZWdpb25JZCl9XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHtyZWdpb25JZH1cbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG5cbiAgICAgICAgICB7IW1hcExvYWRpbmcgJiYgbWFwU3RlcCA9PT0gXCJncmlkXCIgJiYgKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5tYXBTdGFnZX0+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubWFwSGludH0+XG4gICAgICAgICAgICAgICAgUmVnaW9uIHttYXBSZWdpb259OiBjaG9vc2UgYSByb3cgYW5kIGNvbHVtblxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgeygoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGltcyA9IGdldFJlZ2lvbkRpbWVuc2lvbnMobWFwUmVnaW9uKTtcbiAgICAgICAgICAgICAgICBjb25zdCByb3dzID0gbGV0dGVycy5zbGljZSgwLCBkaW1zLnJvd3MgfHwgMCk7XG4gICAgICAgICAgICAgICAgY29uc3QgY29scyA9IG51bWJlcnMuc2xpY2UoMCwgZGltcy5jb2xzIHx8IDApO1xuICAgICAgICAgICAgICAgIGlmICghcm93cy5sZW5ndGggfHwgIWNvbHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLm1hcEVtcHR5fT5cbiAgICAgICAgICAgICAgICAgICAgICBObyBncmlkIGRhdGEgZm9yIHRoaXMgcmVnaW9uLlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmdyaWRXcmFwcGVyfT5cbiAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17c3R5bGVzLmdyaWR9XG4gICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgXCItLWdyaWQtY29sc1wiOiBjb2xzLmxlbmd0aCB9fVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAge3Jvd3MubWFwKChyb3cpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xzLm1hcCgoY29sKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNlbGxLZXkgPSBgJHtyb3d9LSR7Y29sfWA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGhhc1BhbGxldHMgPSBCb29sZWFuKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcENlbGxQYWxsZXRzW2NlbGxLZXldPy5sZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2NlbGxLZXl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YCR7c3R5bGVzLmdyaWRDZWxsfSAke1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNQYWxsZXRzID8gXCJcIiA6IHN0eWxlcy5ncmlkQ2VsbERpc2FibGVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc1BhbGxldHMgJiYgaGFuZGxlU2VsZWN0Q2VsbChyb3csIGNvbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXshaGFzUGFsbGV0c31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57cm93fXtjb2x9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH0pKCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApfVxuXG4gICAgICAgICAgeyFtYXBMb2FkaW5nICYmIG1hcFN0ZXAgPT09IFwicGFsbGV0c1wiICYmIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubWFwU3RhZ2V9PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLm1hcEhpbnR9PlxuICAgICAgICAgICAgICAgIFJlZ2lvbiB7bWFwUmVnaW9ufSDCtyBTZWN0aW9uIHttYXBSb3d9e21hcENvbH06IHNlbGVjdCBhIHBhbGxldFxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5wYWxsZXRHcmlkfT5cbiAgICAgICAgICAgICAgICB7KG1hcENlbGxQYWxsZXRzW2Ake21hcFJvd30tJHttYXBDb2x9YF0gfHwgW10pLm1hcCgocGFsbGV0KSA9PiB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBwYWxsZXRLZXkgPSBgJHttYXBSb3d9LSR7bWFwQ29sfS1QJHtwYWxsZXR9YDtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGJpbnMgPSBtYXBQYWxsZXRCaW5zW3BhbGxldEtleV0gfHwgW107XG4gICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAga2V5PXtwYWxsZXR9XG4gICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMucGFsbGV0QnV0dG9ufVxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChiaW5zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVWaWV3SW52ZW50b3J5KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWdpb246IG1hcFJlZ2lvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWN0aW9uTGV0dGVyOiBtYXBSb3csXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VjdGlvbk51bWJlcjogbWFwQ29sLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhbGxldCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiaW46IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTaG93TWFwKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlU2VsZWN0UGFsbGV0KHBhbGxldCk7XG4gICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIFBhbGxldCB7cGFsbGV0fVxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgeyEobWFwQ2VsbFBhbGxldHNbYCR7bWFwUm93fS0ke21hcENvbH1gXSB8fCBbXSkubGVuZ3RoICYmIChcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubWFwRW1wdHl9PlxuICAgICAgICAgICAgICAgICAgICBObyBwYWxsZXRzIGF2YWlsYWJsZSBoZXJlLlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApfVxuXG4gICAgICAgICAgeyFtYXBMb2FkaW5nICYmIG1hcFN0ZXAgPT09IFwiYmluc1wiICYmIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubWFwU3RhZ2V9PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLm1hcEhpbnR9PlxuICAgICAgICAgICAgICAgIFJlZ2lvbiB7bWFwUmVnaW9ufSDCtyBTZWN0aW9uIHttYXBSb3d9e21hcENvbH0gwrcgUGFsbGV0IHttYXBQYWxsZXR9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnBhbGxldEdyaWR9PlxuICAgICAgICAgICAgICAgIHsobWFwUGFsbGV0Qmluc1tgJHttYXBSb3d9LSR7bWFwQ29sfS1QJHttYXBQYWxsZXR9YF0gfHwgW10pLm1hcChcbiAgICAgICAgICAgICAgICAgIChiaW4pID0+IChcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgIGtleT17YmlufVxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YCR7c3R5bGVzLnBhbGxldEJ1dHRvbn0gJHtzdHlsZXMuYmluQnV0dG9ufWB9XG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlU2VsZWN0QmluKGJpbil9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICBCaW4ge2Jpbn1cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICB7IShtYXBQYWxsZXRCaW5zW2Ake21hcFJvd30tJHttYXBDb2x9LVAke21hcFBhbGxldH1gXSB8fCBbXSlcbiAgICAgICAgICAgICAgICAgIC5sZW5ndGggJiYgKFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5tYXBFbXB0eX0+XG4gICAgICAgICAgICAgICAgICAgIE5vIGJpbnMgYXZhaWxhYmxlIG9uIHRoaXMgcGFsbGV0LlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApfVxuICAgICAgICA8L01vZGFsLkJvZHk+XG4gICAgICAgIDxNb2RhbC5Gb290ZXIgY2xhc3NOYW1lPXtzdHlsZXMubWFwRm9vdGVyfT5cbiAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICB2YXJpYW50PVwib3V0bGluZS1zZWNvbmRhcnlcIlxuICAgICAgICAgICAgb25DbGljaz17aGFuZGxlTWFwQmFja31cbiAgICAgICAgICAgIGRpc2FibGVkPXttYXBTdGVwID09PSBcInJlZ2lvbnNcIn1cbiAgICAgICAgICA+XG4gICAgICAgICAgICBCYWNrXG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgPEJ1dHRvbiB2YXJpYW50PVwib3V0bGluZS1wcmltYXJ5XCIgb25DbGljaz17aGFuZGxlVmlld0ludmVudG9yeX0+XG4gICAgICAgICAgICBWaWV3XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgPEJ1dHRvbiB2YXJpYW50PVwic2Vjb25kYXJ5XCIgb25DbGljaz17KCkgPT4gc2V0U2hvd01hcChmYWxzZSl9PlxuICAgICAgICAgICAgQ2xvc2VcbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgPC9Nb2RhbC5Gb290ZXI+XG4gICAgICA8L01vZGFsPlxuICAgIDwvZGl2PlxuICApO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==