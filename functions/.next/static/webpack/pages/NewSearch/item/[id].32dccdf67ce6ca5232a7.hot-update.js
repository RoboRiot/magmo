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
    var params = new URLSearchParams();
    var regionValue = mapRegion || region;
    var letterValue = mapRow || sectionLetter;
    var numberValue = mapCol || sectionNumber;
    var palletValue = mapPallet || palletSelected;
    var binValue = binSelected;
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
            lineNumber: 417,
            columnNumber: 29
          }
        }, __jsx("span", {
          __self: _this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 428,
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
      lineNumber: 441,
      columnNumber: 13
    }
  }, __jsx("div", {
    className: _NewLocal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.mapHint,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 442,
      columnNumber: 15
    }
  }, "Region ", mapRegion, " \xB7 Section ", mapRow, mapCol, ": select a pallet"), __jsx("div", {
    className: _NewLocal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.palletGrid,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 445,
      columnNumber: 15
    }
  }, (mapCellPallets["".concat(mapRow, "-").concat(mapCol)] || []).map(function (pallet) {
    var palletKey = "".concat(mapRow, "-").concat(mapCol, "-P").concat(pallet);
    var bins = mapPalletBins[palletKey] || [];
    var disabled = bins.length === 0;
    return __jsx("button", {
      key: pallet,
      type: "button",
      className: "".concat(_NewLocal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.palletButton, " ").concat(disabled ? _NewLocal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.gridCellDisabled : ""),
      onClick: function onClick() {
        return !disabled && handleSelectPallet(pallet);
      },
      disabled: disabled,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 451,
        columnNumber: 21
      }
    }, "Pallet ", pallet);
  }), !(mapCellPallets["".concat(mapRow, "-").concat(mapCol)] || []).length && __jsx("div", {
    className: _NewLocal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.mapEmpty,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 465,
      columnNumber: 19
    }
  }, "No pallets available here."))), !mapLoading && mapStep === "bins" && __jsx("div", {
    className: _NewLocal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.mapStage,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 474,
      columnNumber: 13
    }
  }, __jsx("div", {
    className: _NewLocal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.mapHint,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 475,
      columnNumber: 15
    }
  }, "Region ", mapRegion, " \xB7 Section ", mapRow, mapCol, " \xB7 Pallet ", mapPallet), __jsx("div", {
    className: _NewLocal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.palletGrid,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 478,
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
        lineNumber: 481,
        columnNumber: 21
      }
    }, "Bin ", bin);
  }), !(mapPalletBins["".concat(mapRow, "-").concat(mapCol, "-P").concat(mapPallet)] || []).length && __jsx("div", {
    className: _NewLocal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.mapEmpty,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 493,
      columnNumber: 19
    }
  }, "No bins available on this pallet.")))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Modal"].Footer, {
    className: _NewLocal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.mapFooter,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 501,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], {
    variant: "outline-secondary",
    onClick: handleMapBack,
    disabled: mapStep === "regions",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 502,
      columnNumber: 11
    }
  }, "Back"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], {
    variant: "outline-primary",
    onClick: handleViewInventory,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 509,
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
      lineNumber: 512,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vcGFnZXMvTmV3U2VhcmNoL2l0ZW0vL05ld0xvY2FsLmpzIl0sIm5hbWVzIjpbIk5ld0xvY2FsIiwib25TYXZlIiwib25DYW5jZWwiLCJzZWxlY3RlZENsaWVudCIsInNob3dMb2NhbExvYyIsInZhbHVlIiwib25DaGFuZ2UiLCJyb3V0ZXIiLCJ1c2VSb3V0ZXIiLCJ1c2VTdGF0ZSIsInJlZ2lvbk9wdGlvbnMiLCJzZXRSZWdpb25PcHRpb25zIiwic2VjdGlvbk1hcCIsInNldFNlY3Rpb25NYXAiLCJiaW5Db3VudCIsInNldEJpbkNvdW50IiwicGFsbGV0Q291bnQiLCJzZXRQYWxsZXRDb3VudCIsInJlZ2lvbiIsInNldFJlZ2lvbiIsInNlY3Rpb25MZXR0ZXIiLCJzZXRTZWN0aW9uTGV0dGVyIiwic2VjdGlvbk51bWJlciIsInNldFNlY3Rpb25OdW1iZXIiLCJiaW5TZWxlY3RlZCIsInNldEJpblNlbGVjdGVkIiwicGFsbGV0U2VsZWN0ZWQiLCJzZXRQYWxsZXRTZWxlY3RlZCIsInNob3dNYXAiLCJzZXRTaG93TWFwIiwibWFwU3RlcCIsInNldE1hcFN0ZXAiLCJtYXBSZWdpb24iLCJzZXRNYXBSZWdpb24iLCJtYXBSb3ciLCJzZXRNYXBSb3ciLCJtYXBDb2wiLCJzZXRNYXBDb2wiLCJtYXBQYWxsZXQiLCJzZXRNYXBQYWxsZXQiLCJtYXBDZWxsUGFsbGV0cyIsInNldE1hcENlbGxQYWxsZXRzIiwibWFwUGFsbGV0QmlucyIsInNldE1hcFBhbGxldEJpbnMiLCJtYXBMb2FkaW5nIiwic2V0TWFwTG9hZGluZyIsIm1hcEVycm9yIiwic2V0TWFwRXJyb3IiLCJ1c2VFZmZlY3QiLCJkYiIsImZpcmViYXNlIiwiZmlyZXN0b3JlIiwiY29sbGVjdGlvbiIsImRvYyIsImdldCIsInRoZW4iLCJkIiwiZGF0YSIsIlJlZ2lvbiIsIlNlY3Rpb24iLCJCaW4iLCJQYWxsZXQiLCJzZWN0aW9uIiwibGV0dGVyIiwibnVtYmVyIiwiYmluIiwidG9TdHJpbmciLCJwYWxsZXQiLCJwIiwicGFyc2VJbnQiLCJsZXR0ZXJzIiwiQXJyYXkiLCJmcm9tIiwibGVuZ3RoIiwiXyIsImkiLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJudW1iZXJzIiwiYmluT3B0aW9ucyIsInBhbGxldE9wdGlvbnMiLCJyZWdpb25MZXR0ZXJzIiwidXNlTWVtbyIsImlzQXJyYXkiLCJnZXRSZWdpb25EaW1lbnNpb25zIiwicmVnaW9uSWQiLCJlbnRyeSIsImNvbHMiLCJyb3dzIiwiTnVtYmVyIiwiaXNGaW5pdGUiLCJsb2FkUmVnaW9uSW52ZW50b3J5Iiwid2hlcmUiLCJzbmFwIiwiY2VsbFBhbGxldHMiLCJwYWxsZXRCaW5zIiwiZm9yRWFjaCIsImxvYyIsIm5ld0xvY2FsQ3VycmVudCIsInJvdyIsImNvbCIsInRyaW1tZWQiLCJ0cmltIiwic2xpY2UiLCJ1bmRlZmluZWQiLCJjZWxsS2V5IiwiU2V0IiwiYWRkIiwicGFsbGV0S2V5IiwiY2VsbE9iaiIsIk9iamVjdCIsImtleXMiLCJrZXkiLCJzb3J0IiwiYSIsImIiLCJwYWxsZXRPYmoiLCJjb25zb2xlIiwiZXJyb3IiLCJoYW5kbGVBZGRCaW4iLCJuZXh0IiwidXBkYXRlIiwiaGFuZGxlQWRkUGFsbGV0IiwiaGFuZGxlT2siLCJvcGVuTWFwIiwiaGFuZGxlU2VsZWN0UmVnaW9uIiwiaGFuZGxlU2VsZWN0Q2VsbCIsInJvd0xldHRlciIsImNvbE51bWJlciIsImhhbmRsZVNlbGVjdFBhbGxldCIsInBhbGxldElkIiwiaGFuZGxlU2VsZWN0QmluIiwiYmluSWQiLCJoYW5kbGVNYXBCYWNrIiwiaGFuZGxlVmlld0ludmVudG9yeSIsInBhcmFtcyIsIlVSTFNlYXJjaFBhcmFtcyIsInJlZ2lvblZhbHVlIiwibGV0dGVyVmFsdWUiLCJudW1iZXJWYWx1ZSIsInBhbGxldFZhbHVlIiwiYmluVmFsdWUiLCJzZXQiLCJxdWVyeSIsInB1c2giLCJzdHlsZXMiLCJ3cmFwcGVyIiwiZm9ybVJvdyIsImZvcm1Hcm91cCIsImUiLCJ0YXJnZXQiLCJtYXAiLCJyIiwibCIsIm4iLCJhY3Rpb25Sb3ciLCJhY3Rpb25TcGFjZXIiLCJtYXBTdGFnZSIsIm1hcEhpbnQiLCJtYXBDYW52YXMiLCJyZWdpb25CbG9jayIsImluY2x1ZGVzIiwiZGltcyIsIm1hcEVtcHR5IiwiZ3JpZFdyYXBwZXIiLCJncmlkIiwiaGFzUGFsbGV0cyIsIkJvb2xlYW4iLCJncmlkQ2VsbCIsImdyaWRDZWxsRGlzYWJsZWQiLCJwYWxsZXRHcmlkIiwiYmlucyIsImRpc2FibGVkIiwicGFsbGV0QnV0dG9uIiwiYmluQnV0dG9uIiwibWFwRm9vdGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFZSxTQUFTQSxRQUFULE9BT1o7QUFBQTs7QUFBQTs7QUFBQSx5QkFOREMsTUFNQztBQUFBLE1BTkRBLE1BTUMsNEJBTlEsWUFBTSxDQUFFLENBTWhCO0FBQUEsMkJBTERDLFFBS0M7QUFBQSxNQUxEQSxRQUtDLDhCQUxVLFlBQU0sQ0FBRSxDQUtsQjtBQUFBLE1BSkRDLGNBSUMsUUFKREEsY0FJQztBQUFBLE1BSERDLFlBR0MsUUFIREEsWUFHQztBQUFBLHdCQUZEQyxLQUVDO0FBQUEsTUFGREEsS0FFQywyQkFGTyxFQUVQO0FBQUEsTUFEREMsUUFDQyxRQUREQSxRQUNDO0FBQ0QsTUFBTUMsTUFBTSxHQUFHQyw2REFBUyxFQUF4Qjs7QUFEQyxrQkFFeUNDLHNEQUFRLENBQUMsRUFBRCxDQUZqRDtBQUFBLE1BRU1DLGFBRk47QUFBQSxNQUVxQkMsZ0JBRnJCOztBQUFBLG1CQUd1Q0Ysc0RBQVEsQ0FBQyxFQUFELENBSC9DO0FBQUEsTUFHTUcsVUFITjtBQUFBLE1BR2tCQyxhQUhsQjs7QUFBQSxtQkFJdUNKLHNEQUFRLENBQUMsQ0FBRCxDQUovQztBQUFBLE1BSU1LLFFBSk47QUFBQSxNQUlnQkMsV0FKaEI7O0FBQUEsbUJBS3VDTixzREFBUSxDQUFDLENBQUQsQ0FML0M7QUFBQSxNQUtNTyxXQUxOO0FBQUEsTUFLbUJDLGNBTG5COztBQUFBLG1CQU8yQlIsc0RBQVEsQ0FBQyxFQUFELENBUG5DO0FBQUEsTUFPTVMsTUFQTjtBQUFBLE1BT2NDLFNBUGQ7O0FBQUEsbUJBUXlDVixzREFBUSxDQUFDLEVBQUQsQ0FSakQ7QUFBQSxNQVFNVyxhQVJOO0FBQUEsTUFRcUJDLGdCQVJyQjs7QUFBQSxtQkFTeUNaLHNEQUFRLENBQUMsRUFBRCxDQVRqRDtBQUFBLE1BU01hLGFBVE47QUFBQSxNQVNxQkMsZ0JBVHJCOztBQUFBLG1CQVV5Q2Qsc0RBQVEsQ0FBQyxFQUFELENBVmpEO0FBQUEsTUFVTWUsV0FWTjtBQUFBLE1BVW1CQyxjQVZuQjs7QUFBQSxtQkFXMkNoQixzREFBUSxDQUFDLEVBQUQsQ0FYbkQ7QUFBQSxNQVdNaUIsY0FYTjtBQUFBLE1BV3NCQyxpQkFYdEI7O0FBQUEsb0JBWTZCbEIsc0RBQVEsQ0FBQyxLQUFELENBWnJDO0FBQUEsTUFZTW1CLE9BWk47QUFBQSxNQVllQyxVQVpmOztBQUFBLG9CQWE2QnBCLHNEQUFRLENBQUMsU0FBRCxDQWJyQztBQUFBLE1BYU1xQixPQWJOO0FBQUEsTUFhZUMsVUFiZjs7QUFBQSxvQkFjaUN0QixzREFBUSxDQUFDLEVBQUQsQ0FkekM7QUFBQSxNQWNNdUIsU0FkTjtBQUFBLE1BY2lCQyxZQWRqQjs7QUFBQSxvQkFlMkJ4QixzREFBUSxDQUFDLEVBQUQsQ0FmbkM7QUFBQSxNQWVNeUIsTUFmTjtBQUFBLE1BZWNDLFNBZmQ7O0FBQUEsb0JBZ0IyQjFCLHNEQUFRLENBQUMsRUFBRCxDQWhCbkM7QUFBQSxNQWdCTTJCLE1BaEJOO0FBQUEsTUFnQmNDLFNBaEJkOztBQUFBLG9CQWlCaUM1QixzREFBUSxDQUFDLEVBQUQsQ0FqQnpDO0FBQUEsTUFpQk02QixTQWpCTjtBQUFBLE1BaUJpQkMsWUFqQmpCOztBQUFBLG9CQWtCMkM5QixzREFBUSxDQUFDLEVBQUQsQ0FsQm5EO0FBQUEsTUFrQk0rQixjQWxCTjtBQUFBLE1Ba0JzQkMsaUJBbEJ0Qjs7QUFBQSxvQkFtQnlDaEMsc0RBQVEsQ0FBQyxFQUFELENBbkJqRDtBQUFBLE1BbUJNaUMsYUFuQk47QUFBQSxNQW1CcUJDLGdCQW5CckI7O0FBQUEsb0JBb0JtQ2xDLHNEQUFRLENBQUMsS0FBRCxDQXBCM0M7QUFBQSxNQW9CTW1DLFVBcEJOO0FBQUEsTUFvQmtCQyxhQXBCbEI7O0FBQUEsb0JBcUIrQnBDLHNEQUFRLENBQUMsRUFBRCxDQXJCdkM7QUFBQSxNQXFCTXFDLFFBckJOO0FBQUEsTUFxQmdCQyxXQXJCaEIsbUJBdUJEOzs7QUFDQUMseURBQVMsQ0FBQyxZQUFNO0FBQ2QsUUFBSSxDQUFDNUMsWUFBTCxFQUFtQjtBQUNuQixRQUFNNkMsRUFBRSxHQUFHQyx5REFBUSxDQUFDQyxTQUFULEVBQVg7QUFDQUYsTUFBRSxDQUFDRyxVQUFILENBQWMsV0FBZCxFQUEyQkMsR0FBM0IsQ0FBK0IsV0FBL0IsRUFBNENDLEdBQTVDLEdBQWtEQyxJQUFsRCxDQUF1RCxVQUFBRixHQUFHLEVBQUk7QUFDNUQsVUFBTUcsQ0FBQyxHQUFHSCxHQUFHLENBQUNJLElBQUosTUFBYyxFQUF4QjtBQUNBOUMsc0JBQWdCLENBQUM2QyxDQUFDLENBQUNFLE1BQUYsSUFBYyxFQUFmLENBQWhCO0FBQ0E3QyxtQkFBYSxDQUFJMkMsQ0FBQyxDQUFDRyxPQUFGLElBQWMsRUFBbEIsQ0FBYjtBQUNBNUMsaUJBQVcsQ0FBTXlDLENBQUMsQ0FBQ0ksR0FBRixJQUFjLENBQXBCLENBQVg7QUFDQTNDLG9CQUFjLENBQUd1QyxDQUFDLENBQUNLLE1BQUYsSUFBYyxDQUFqQixDQUFkO0FBQ0QsS0FORDtBQU9ELEdBVlEsRUFVTixDQUFDekQsWUFBRCxDQVZNLENBQVQsQ0F4QkMsQ0FvQ0Q7O0FBQ0E0Qyx5REFBUyxDQUFDLFlBQU07QUFBQTs7QUFDZCxRQUFJLENBQUM1QyxZQUFMLEVBQW1CO0FBQ25CZSxhQUFTLENBQVNkLEtBQUssQ0FBQ2EsTUFBTixJQUE0QixFQUFyQyxDQUFUO0FBQ0FHLG9CQUFnQixDQUFDLG1CQUFBaEIsS0FBSyxDQUFDeUQsT0FBTixrRUFBZUMsTUFBZixLQUE0QixFQUE3QixDQUFoQjtBQUNBeEMsb0JBQWdCLENBQUMsb0JBQUFsQixLQUFLLENBQUN5RCxPQUFOLG9FQUFlRSxNQUFmLEtBQTRCLEVBQTdCLENBQWhCO0FBQ0F2QyxrQkFBYyxDQUFJLGVBQUFwQixLQUFLLENBQUM0RCxHQUFOLDBEQUFXQyxRQUFYLE9BQTRCLEVBQWhDLENBQWQ7QUFDQXZDLHFCQUFpQixDQUFDLGtCQUFBdEIsS0FBSyxDQUFDOEQsTUFBTixnRUFBY0QsUUFBZCxPQUEyQixFQUE1QixDQUFqQjtBQUNELEdBUFEsRUFPTixDQUFDOUQsWUFBRCxDQVBNLENBQVQsQ0FyQ0MsQ0E4Q0Q7O0FBQ0E0Qyx5REFBUyxDQUFDLFlBQU07QUFDZCxRQUFNb0IsQ0FBQyxHQUFHLEVBQVY7QUFDQSxRQUFJbEQsTUFBSixFQUFvQmtELENBQUMsQ0FBQ2xELE1BQUYsR0FBWUEsTUFBWjtBQUNwQixRQUFJRSxhQUFhLElBQUlFLGFBQXJCLEVBQW9DOEMsQ0FBQyxDQUFDTixPQUFGLEdBQVk7QUFBRUMsWUFBTSxFQUFFM0MsYUFBVjtBQUF5QjRDLFlBQU0sRUFBRTFDO0FBQWpDLEtBQVo7QUFDcEMsUUFBSUUsV0FBSixFQUFvQjRDLENBQUMsQ0FBQ0gsR0FBRixHQUFZSSxRQUFRLENBQUM3QyxXQUFELEVBQWEsRUFBYixDQUFwQjtBQUNwQixRQUFJRSxjQUFKLEVBQW9CMEMsQ0FBQyxDQUFDRCxNQUFGLEdBQVlFLFFBQVEsQ0FBQzNDLGNBQUQsRUFBZ0IsRUFBaEIsQ0FBcEI7QUFDcEJwQixZQUFRLENBQUM4RCxDQUFELENBQVI7QUFDRCxHQVBRLEVBT04sQ0FBQ2xELE1BQUQsRUFBU0UsYUFBVCxFQUF3QkUsYUFBeEIsRUFBdUNFLFdBQXZDLEVBQW9ERSxjQUFwRCxDQVBNLENBQVQsQ0EvQ0MsQ0F3REQ7O0FBQ0YsTUFBTTRDLE9BQU8sR0FBR0MsS0FBSyxDQUFDQyxJQUFOLENBQVc7QUFBRUMsVUFBTSxFQUFFO0FBQVYsR0FBWCxFQUEyQixVQUFDQyxDQUFELEVBQUlDLENBQUo7QUFBQSxXQUFVQyxNQUFNLENBQUNDLFlBQVAsQ0FBb0IsS0FBS0YsQ0FBekIsQ0FBVjtBQUFBLEdBQTNCLENBQWhCO0FBQ0EsTUFBTUcsT0FBTyxHQUFHUCxLQUFLLENBQUNDLElBQU4sQ0FBVztBQUFFQyxVQUFNLEVBQUU7QUFBVixHQUFYLEVBQTJCLFVBQUNDLENBQUQsRUFBSUMsQ0FBSjtBQUFBLFdBQVVBLENBQUMsR0FBRyxDQUFkO0FBQUEsR0FBM0IsQ0FBaEI7QUFDRSxNQUFNSSxVQUFVLEdBQUdSLEtBQUssQ0FBQ0MsSUFBTixDQUFXO0FBQUVDLFVBQU0sRUFBRTNEO0FBQVYsR0FBWCxFQUFpQyxVQUFDNEQsQ0FBRCxFQUFJQyxDQUFKO0FBQUEsV0FBVUEsQ0FBQyxHQUFHLENBQWQ7QUFBQSxHQUFqQyxDQUFuQjtBQUNBLE1BQU1LLGFBQWEsR0FBR1QsS0FBSyxDQUFDQyxJQUFOLENBQVc7QUFBRUMsVUFBTSxFQUFFekQ7QUFBVixHQUFYLEVBQW9DLFVBQUMwRCxDQUFELEVBQUlDLENBQUo7QUFBQSxXQUFVQSxDQUFDLEdBQUcsQ0FBZDtBQUFBLEdBQXBDLENBQXRCO0FBQ0EsTUFBTU0sYUFBYSxHQUFHQyxxREFBTyxDQUMzQjtBQUFBLFdBQU9YLEtBQUssQ0FBQ1ksT0FBTixDQUFjekUsYUFBZCxLQUFnQ0EsYUFBYSxDQUFDK0QsTUFBOUMsR0FBdUQvRCxhQUF2RCxHQUF1RSxDQUFDLEdBQUQsRUFBTSxHQUFOLEVBQVcsR0FBWCxFQUFnQixHQUFoQixFQUFxQixHQUFyQixFQUEwQixHQUExQixFQUErQixHQUEvQixDQUE5RTtBQUFBLEdBRDJCLEVBRTNCLENBQUNBLGFBQUQsQ0FGMkIsQ0FBN0I7O0FBSUEsTUFBTTBFLG1CQUFtQixHQUFHLFNBQXRCQSxtQkFBc0IsQ0FBQ0MsUUFBRCxFQUFjO0FBQ3hDLFFBQU1DLEtBQUssR0FBRzFFLFVBQUgsYUFBR0EsVUFBSCx1QkFBR0EsVUFBVSxDQUFHeUUsUUFBSCxDQUF4Qjs7QUFDQSxRQUFJZCxLQUFLLENBQUNZLE9BQU4sQ0FBY0csS0FBZCxLQUF3QkEsS0FBSyxDQUFDYixNQUFOLElBQWdCLENBQTVDLEVBQStDO0FBQzdDLFVBQU1jLElBQUksR0FBR2xCLFFBQVEsQ0FBQ2lCLEtBQUssQ0FBQyxDQUFELENBQU4sRUFBVyxFQUFYLENBQXJCO0FBQ0EsVUFBTUUsSUFBSSxHQUFHbkIsUUFBUSxDQUFDaUIsS0FBSyxDQUFDLENBQUQsQ0FBTixFQUFXLEVBQVgsQ0FBckI7QUFDQSxhQUFPO0FBQ0xDLFlBQUksRUFBRUUsTUFBTSxDQUFDQyxRQUFQLENBQWdCSCxJQUFoQixJQUF3QkEsSUFBeEIsR0FBK0IsQ0FEaEM7QUFFTEMsWUFBSSxFQUFFQyxNQUFNLENBQUNDLFFBQVAsQ0FBZ0JGLElBQWhCLElBQXdCQSxJQUF4QixHQUErQjtBQUZoQyxPQUFQO0FBSUQ7O0FBQ0QsV0FBTztBQUFFRCxVQUFJLEVBQUUsQ0FBUjtBQUFXQyxVQUFJLEVBQUU7QUFBakIsS0FBUDtBQUNELEdBWEQ7O0FBYUEsTUFBTUcsbUJBQW1CO0FBQUEsbVRBQUcsaUJBQU9OLFFBQVA7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsa0JBQ3JCQSxRQURxQjtBQUFBO0FBQUE7QUFBQTs7QUFBQTs7QUFBQTtBQUUxQnhDLDJCQUFhLENBQUMsSUFBRCxDQUFiO0FBQ0FFLHlCQUFXLENBQUMsRUFBRCxDQUFYO0FBSDBCO0FBQUE7QUFBQSxxQkFLTEcseURBQVEsQ0FDeEJDLFNBRGdCLEdBRWhCQyxVQUZnQixDQUVMLE1BRkssRUFHaEJ3QyxLQUhnQixDQUdWLHdCQUhVLEVBR2dCLElBSGhCLEVBR3NCUCxRQUh0QixFQUloQi9CLEdBSmdCLEVBTEs7O0FBQUE7QUFLbEJ1QyxrQkFMa0I7QUFXbEJDLHlCQVhrQixHQVdKLEVBWEk7QUFZbEJDLHdCQVprQixHQVlMLEVBWks7QUFheEJGLGtCQUFJLENBQUNHLE9BQUwsQ0FBYSxVQUFDM0MsR0FBRCxFQUFTO0FBQUE7O0FBQ3BCLG9CQUFNNEMsR0FBRyxHQUFHLGNBQUE1QyxHQUFHLENBQUNJLElBQUosMERBQVl5QyxlQUFaLEtBQStCLEVBQTNDO0FBQ0Esb0JBQUlDLEdBQUcsbUJBQUdGLEdBQUcsQ0FBQ25DLE9BQVAsaURBQUcsYUFBYUMsTUFBdkI7QUFDQSxvQkFBSXFDLEdBQUcsb0JBQUdILEdBQUcsQ0FBQ25DLE9BQVAsa0RBQUcsY0FBYUUsTUFBdkI7O0FBQ0Esb0JBQUksQ0FBQyxDQUFDbUMsR0FBRCxJQUFRLENBQUNDLEdBQVYsS0FBa0IsT0FBT0gsR0FBRyxDQUFDbkMsT0FBWCxLQUF1QixRQUE3QyxFQUF1RDtBQUNyRCxzQkFBTXVDLE9BQU8sR0FBR0osR0FBRyxDQUFDbkMsT0FBSixDQUFZd0MsSUFBWixFQUFoQjtBQUNBSCxxQkFBRyxHQUFHRSxPQUFPLENBQUNFLEtBQVIsQ0FBYyxDQUFkLEVBQWlCLENBQWpCLENBQU47QUFDQUgscUJBQUcsR0FBR0MsT0FBTyxDQUFDRSxLQUFSLENBQWMsQ0FBZCxDQUFOO0FBQ0Q7O0FBQ0Qsb0JBQUlILEdBQUcsS0FBS0ksU0FBUixJQUFxQkosR0FBRyxLQUFLLElBQWpDLEVBQXVDO0FBQ3JDQSxxQkFBRyxHQUFHeEIsTUFBTSxDQUFDd0IsR0FBRCxDQUFaO0FBQ0Q7O0FBQ0Qsb0JBQU1qQyxNQUFNLEdBQUc4QixHQUFHLENBQUM5QixNQUFuQjtBQUNBLG9CQUFNRixHQUFHLEdBQUdnQyxHQUFHLENBQUNoQyxHQUFoQjtBQUNBLG9CQUFJLENBQUNrQyxHQUFELElBQVEsQ0FBQ0MsR0FBYixFQUFrQjtBQUNsQixvQkFBTUssT0FBTyxhQUFNTixHQUFOLGNBQWFDLEdBQWIsQ0FBYjs7QUFDQSxvQkFBSWpDLE1BQU0sS0FBS3FDLFNBQVgsSUFBd0JyQyxNQUFNLEtBQUssSUFBbkMsSUFBMkMsVUFBR0EsTUFBSCxNQUFnQixFQUEvRCxFQUFtRTtBQUNqRSxzQkFBSSxDQUFDMkIsV0FBVyxDQUFDVyxPQUFELENBQWhCLEVBQTJCWCxXQUFXLENBQUNXLE9BQUQsQ0FBWCxHQUF1QixJQUFJQyxHQUFKLEVBQXZCO0FBQzNCWiw2QkFBVyxDQUFDVyxPQUFELENBQVgsQ0FBcUJFLEdBQXJCLENBQXlCL0IsTUFBTSxDQUFDVCxNQUFELENBQS9COztBQUNBLHNCQUFJRixHQUFHLEtBQUt1QyxTQUFSLElBQXFCdkMsR0FBRyxLQUFLLElBQTdCLElBQXFDLFVBQUdBLEdBQUgsTUFBYSxFQUF0RCxFQUEwRDtBQUN4RCx3QkFBTTJDLFNBQVMsYUFBTUgsT0FBTixlQUFrQnRDLE1BQWxCLENBQWY7QUFDQSx3QkFBSSxDQUFDNEIsVUFBVSxDQUFDYSxTQUFELENBQWYsRUFBNEJiLFVBQVUsQ0FBQ2EsU0FBRCxDQUFWLEdBQXdCLElBQUlGLEdBQUosRUFBeEI7QUFDNUJYLDhCQUFVLENBQUNhLFNBQUQsQ0FBVixDQUFzQkQsR0FBdEIsQ0FBMEIvQixNQUFNLENBQUNYLEdBQUQsQ0FBaEM7QUFDRDtBQUNGO0FBQ0YsZUF6QkQ7QUEyQk00QyxxQkF4Q2tCLEdBd0NSLEVBeENRO0FBeUN4QkMsb0JBQU0sQ0FBQ0MsSUFBUCxDQUFZakIsV0FBWixFQUF5QkUsT0FBekIsQ0FBaUMsVUFBQ2dCLEdBQUQsRUFBUztBQUN4Q0gsdUJBQU8sQ0FBQ0csR0FBRCxDQUFQLEdBQWV6QyxLQUFLLENBQUNDLElBQU4sQ0FBV3NCLFdBQVcsQ0FBQ2tCLEdBQUQsQ0FBdEIsRUFBNkJDLElBQTdCLENBQ2IsVUFBQ0MsQ0FBRCxFQUFJQyxDQUFKO0FBQUEseUJBQVUxQixNQUFNLENBQUN5QixDQUFELENBQU4sR0FBWXpCLE1BQU0sQ0FBQzBCLENBQUQsQ0FBNUI7QUFBQSxpQkFEYSxDQUFmO0FBR0QsZUFKRDtBQU1NQyx1QkEvQ2tCLEdBK0NOLEVBL0NNO0FBZ0R4Qk4sb0JBQU0sQ0FBQ0MsSUFBUCxDQUFZaEIsVUFBWixFQUF3QkMsT0FBeEIsQ0FBZ0MsVUFBQ2dCLEdBQUQsRUFBUztBQUN2Q0kseUJBQVMsQ0FBQ0osR0FBRCxDQUFULEdBQWlCekMsS0FBSyxDQUFDQyxJQUFOLENBQVd1QixVQUFVLENBQUNpQixHQUFELENBQXJCLEVBQTRCQyxJQUE1QixDQUNmLFVBQUNDLENBQUQsRUFBSUMsQ0FBSjtBQUFBLHlCQUFVMUIsTUFBTSxDQUFDeUIsQ0FBRCxDQUFOLEdBQVl6QixNQUFNLENBQUMwQixDQUFELENBQTVCO0FBQUEsaUJBRGUsQ0FBakI7QUFHRCxlQUpEO0FBTUExRSwrQkFBaUIsQ0FBQ29FLE9BQUQsQ0FBakI7QUFDQWxFLDhCQUFnQixDQUFDeUUsU0FBRCxDQUFoQjtBQXZEd0I7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUF5RHhCQyxxQkFBTyxDQUFDQyxLQUFSLENBQWMsOEJBQWQ7QUFDQXZFLHlCQUFXLENBQUMsK0JBQUQsQ0FBWDs7QUExRHdCO0FBQUE7QUE0RHhCRiwyQkFBYSxDQUFDLEtBQUQsQ0FBYjtBQTVEd0I7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FBSDs7QUFBQSxvQkFBbkI4QyxtQkFBbUI7QUFBQTtBQUFBO0FBQUEsS0FBekIsQ0E5RUMsQ0E4SUQ7OztBQUNBLE1BQU00QixZQUFZO0FBQUEsbVRBQUc7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ2JDLGtCQURhLEdBQ04xRyxRQUFRLEdBQUcsQ0FETDtBQUFBO0FBQUEscUJBRWJvQyx5REFBUSxDQUFDQyxTQUFULEdBQ0hDLFVBREcsQ0FDUSxXQURSLEVBQ3FCQyxHQURyQixDQUN5QixXQUR6QixFQUVIb0UsTUFGRyxDQUVJO0FBQUU3RCxtQkFBRyxFQUFFNEQ7QUFBUCxlQUZKLENBRmE7O0FBQUE7QUFLbkJ6Ryx5QkFBVyxDQUFDeUcsSUFBRCxDQUFYO0FBQ0EvRiw0QkFBYyxDQUFDK0YsSUFBSSxDQUFDdEQsUUFBTCxFQUFELENBQWQ7O0FBTm1CO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQUg7O0FBQUEsb0JBQVpxRCxZQUFZO0FBQUE7QUFBQTtBQUFBLEtBQWxCLENBL0lDLENBd0pEOzs7QUFDQSxNQUFNRyxlQUFlO0FBQUEsbVRBQUc7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ2hCRixrQkFEZ0IsR0FDVHhHLFdBQVcsR0FBRyxDQURMO0FBQUE7QUFBQSxxQkFFaEJrQyx5REFBUSxDQUFDQyxTQUFULEdBQ0hDLFVBREcsQ0FDUSxXQURSLEVBQ3FCQyxHQURyQixDQUN5QixXQUR6QixFQUVIb0UsTUFGRyxDQUVJO0FBQUU1RCxzQkFBTSxFQUFFMkQ7QUFBVixlQUZKLENBRmdCOztBQUFBO0FBS3RCdkcsNEJBQWMsQ0FBQ3VHLElBQUQsQ0FBZDtBQUNBN0YsK0JBQWlCLENBQUM2RixJQUFJLENBQUN0RCxRQUFMLEVBQUQsQ0FBakI7O0FBTnNCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQUg7O0FBQUEsb0JBQWZ3RCxlQUFlO0FBQUE7QUFBQTtBQUFBLEtBQXJCLENBekpDLENBa0tEOzs7QUFDQSxNQUFNQyxRQUFRLEdBQUcsU0FBWEEsUUFBVyxHQUFNO0FBQ3JCLFFBQU12RCxDQUFDLEdBQUcsRUFBVjtBQUNBLFFBQUlsRCxNQUFKLEVBQVlrRCxDQUFDLENBQUNsRCxNQUFGLEdBQVdBLE1BQVg7QUFDWixRQUFJRSxhQUFhLElBQUlFLGFBQXJCLEVBQ0U4QyxDQUFDLENBQUNOLE9BQUYsR0FBWTtBQUFFQyxZQUFNLEVBQUUzQyxhQUFWO0FBQXlCNEMsWUFBTSxFQUFFMUM7QUFBakMsS0FBWjtBQUNGLFFBQUlFLFdBQUosRUFBaUI0QyxDQUFDLENBQUNILEdBQUYsR0FBUUksUUFBUSxDQUFDN0MsV0FBRCxFQUFjLEVBQWQsQ0FBaEI7QUFDakIsUUFBSUUsY0FBSixFQUFvQjBDLENBQUMsQ0FBQ0QsTUFBRixHQUFXRSxRQUFRLENBQUMzQyxjQUFELEVBQWlCLEVBQWpCLENBQW5CO0FBQ3BCekIsVUFBTSxDQUFDbUUsQ0FBRCxDQUFOO0FBQ0QsR0FSRDs7QUFVQSxNQUFNd0QsT0FBTyxHQUFHLFNBQVZBLE9BQVUsR0FBTTtBQUNwQjdFLGVBQVcsQ0FBQyxFQUFELENBQVg7O0FBQ0EsUUFBSTdCLE1BQUosRUFBWTtBQUNWZSxrQkFBWSxDQUFDZixNQUFELENBQVo7QUFDQWEsZ0JBQVUsQ0FBQyxNQUFELENBQVY7QUFDQTRELHlCQUFtQixDQUFDekUsTUFBRCxDQUFuQjtBQUNELEtBSkQsTUFJTztBQUNMZSxrQkFBWSxDQUFDLEVBQUQsQ0FBWjtBQUNBRixnQkFBVSxDQUFDLFNBQUQsQ0FBVjtBQUNEOztBQUNERixjQUFVLENBQUMsSUFBRCxDQUFWO0FBQ0QsR0FYRDs7QUFhQSxNQUFNZ0csa0JBQWtCLEdBQUcsU0FBckJBLGtCQUFxQixDQUFDeEMsUUFBRCxFQUFjO0FBQ3ZDcEQsZ0JBQVksQ0FBQ29ELFFBQUQsQ0FBWjtBQUNBbEUsYUFBUyxDQUFDa0UsUUFBRCxDQUFUO0FBQ0FsRCxhQUFTLENBQUMsRUFBRCxDQUFUO0FBQ0FFLGFBQVMsQ0FBQyxFQUFELENBQVQ7QUFDQUUsZ0JBQVksQ0FBQyxFQUFELENBQVo7QUFDQVoscUJBQWlCLENBQUMsRUFBRCxDQUFqQjtBQUNBRixrQkFBYyxDQUFDLEVBQUQsQ0FBZDtBQUNBTSxjQUFVLENBQUMsTUFBRCxDQUFWO0FBQ0E0RCx1QkFBbUIsQ0FBQ04sUUFBRCxDQUFuQjtBQUNELEdBVkQ7O0FBWUEsTUFBTXlDLGdCQUFnQixHQUFHLFNBQW5CQSxnQkFBbUIsQ0FBQ0MsU0FBRCxFQUFZQyxTQUFaLEVBQTBCO0FBQ2pEN0YsYUFBUyxDQUFDNEYsU0FBRCxDQUFUO0FBQ0ExRixhQUFTLENBQUMyRixTQUFELENBQVQ7QUFDQTNHLG9CQUFnQixDQUFDMEcsU0FBRCxDQUFoQjtBQUNBeEcsb0JBQWdCLENBQUNxRCxNQUFNLENBQUNvRCxTQUFELENBQVAsQ0FBaEI7QUFDQXpGLGdCQUFZLENBQUMsRUFBRCxDQUFaO0FBQ0FaLHFCQUFpQixDQUFDLEVBQUQsQ0FBakI7QUFDQUYsa0JBQWMsQ0FBQyxFQUFELENBQWQ7QUFDQU0sY0FBVSxDQUFDLFNBQUQsQ0FBVjtBQUNELEdBVEQ7O0FBV0EsTUFBTWtHLGtCQUFrQixHQUFHLFNBQXJCQSxrQkFBcUIsQ0FBQ0MsUUFBRCxFQUFjO0FBQ3ZDM0YsZ0JBQVksQ0FBQzJGLFFBQUQsQ0FBWjtBQUNBdkcscUJBQWlCLENBQUNpRCxNQUFNLENBQUNzRCxRQUFELENBQVAsQ0FBakI7QUFDQXpHLGtCQUFjLENBQUMsRUFBRCxDQUFkO0FBQ0FNLGNBQVUsQ0FBQyxNQUFELENBQVY7QUFDRCxHQUxEOztBQU9BLE1BQU1vRyxlQUFlLEdBQUcsU0FBbEJBLGVBQWtCLENBQUNDLEtBQUQsRUFBVztBQUNqQzNHLGtCQUFjLENBQUNtRCxNQUFNLENBQUN3RCxLQUFELENBQVAsQ0FBZDtBQUNELEdBRkQ7O0FBSUEsTUFBTUMsYUFBYSxHQUFHLFNBQWhCQSxhQUFnQixHQUFNO0FBQzFCLFFBQUl2RyxPQUFPLEtBQUssTUFBaEIsRUFBd0JDLFVBQVUsQ0FBQyxTQUFELENBQVYsQ0FBeEIsS0FDSyxJQUFJRCxPQUFPLEtBQUssU0FBaEIsRUFBMkJDLFVBQVUsQ0FBQyxNQUFELENBQVYsQ0FBM0IsS0FDQSxJQUFJRCxPQUFPLEtBQUssTUFBaEIsRUFBd0JDLFVBQVUsQ0FBQyxTQUFELENBQVY7QUFDOUIsR0FKRDs7QUFNQSxNQUFNdUcsbUJBQW1CLEdBQUcsU0FBdEJBLG1CQUFzQixHQUFNO0FBQ2hDLFFBQU1DLE1BQU0sR0FBRyxJQUFJQyxlQUFKLEVBQWY7QUFDQSxRQUFNQyxXQUFXLEdBQUd6RyxTQUFTLElBQUlkLE1BQWpDO0FBQ0EsUUFBTXdILFdBQVcsR0FBR3hHLE1BQU0sSUFBSWQsYUFBOUI7QUFDQSxRQUFNdUgsV0FBVyxHQUFHdkcsTUFBTSxJQUFJZCxhQUE5QjtBQUNBLFFBQU1zSCxXQUFXLEdBQUd0RyxTQUFTLElBQUlaLGNBQWpDO0FBQ0EsUUFBTW1ILFFBQVEsR0FBR3JILFdBQWpCO0FBRUEsUUFBSWlILFdBQUosRUFBaUJGLE1BQU0sQ0FBQ08sR0FBUCxDQUFXLFFBQVgsRUFBcUJMLFdBQXJCO0FBQ2pCLFFBQUlDLFdBQUosRUFBaUJILE1BQU0sQ0FBQ08sR0FBUCxDQUFXLGVBQVgsRUFBNEJKLFdBQTVCO0FBQ2pCLFFBQUlDLFdBQUosRUFBaUJKLE1BQU0sQ0FBQ08sR0FBUCxDQUFXLGVBQVgsRUFBNEJILFdBQTVCO0FBQ2pCLFFBQUlDLFdBQUosRUFBaUJMLE1BQU0sQ0FBQ08sR0FBUCxDQUFXLFFBQVgsRUFBcUJGLFdBQXJCO0FBQ2pCLFFBQUlDLFFBQUosRUFBY04sTUFBTSxDQUFDTyxHQUFQLENBQVcsS0FBWCxFQUFrQkQsUUFBbEI7QUFFZCxRQUFNRSxLQUFLLEdBQUdSLE1BQU0sQ0FBQ3JFLFFBQVAsRUFBZDtBQUNBM0QsVUFBTSxDQUFDeUksSUFBUCwrQ0FDeUNELEtBQUssY0FBT0EsS0FBUCxJQUFpQixFQUQvRDtBQUdELEdBbEJEOztBQW9CQSxTQUNFO0FBQUssYUFBUyxFQUFFRSwyREFBTSxDQUFDQyxPQUF2QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0UsTUFBQyxtREFBRDtBQUFLLGFBQVMsRUFBRUQsMkRBQU0sQ0FBQ0UsT0FBdkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFLE1BQUMsbURBQUQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFLE1BQUMsb0RBQUQsQ0FBTSxLQUFOO0FBQVksYUFBUyxFQUFFRiwyREFBTSxDQUFDRyxTQUE5QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0UsTUFBQyxvREFBRCxDQUFNLEtBQU47QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxjQURGLEVBRUUsTUFBQyxvREFBRCxDQUFNLE1BQU47QUFDRSxTQUFLLEVBQUVsSSxNQURUO0FBQ2lCLFlBQVEsRUFBRSxrQkFBQW1JLENBQUM7QUFBQSxhQUFFbEksU0FBUyxDQUFDa0ksQ0FBQyxDQUFDQyxNQUFGLENBQVNqSixLQUFWLENBQVg7QUFBQSxLQUQ1QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBR0U7QUFBUSxTQUFLLEVBQUMsRUFBZDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUhGLEVBSUdLLGFBQWEsQ0FBQzZJLEdBQWQsQ0FBa0IsVUFBQUMsQ0FBQztBQUFBLFdBQUc7QUFBUSxTQUFHLEVBQUVBLENBQWI7QUFBZ0IsV0FBSyxFQUFFQSxDQUF2QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BQTJCQSxDQUEzQixDQUFIO0FBQUEsR0FBbkIsQ0FKSCxDQUZGLENBREYsQ0FERixFQVlFLE1BQUMsbURBQUQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFLE1BQUMsb0RBQUQsQ0FBTSxLQUFOO0FBQVksYUFBUyxFQUFFUCwyREFBTSxDQUFDRyxTQUE5QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0UsTUFBQyxvREFBRCxDQUFNLEtBQU47QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxzQkFERixFQUVFLE1BQUMsb0RBQUQsQ0FBTSxNQUFOO0FBQ0UsU0FBSyxFQUFFaEksYUFEVDtBQUVFLFlBQVEsRUFBRSxrQkFBQWlJLENBQUM7QUFBQSxhQUFFaEksZ0JBQWdCLENBQUNnSSxDQUFDLENBQUNDLE1BQUYsQ0FBU2pKLEtBQVYsQ0FBbEI7QUFBQSxLQUZiLENBR0U7QUFIRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBS0U7QUFBUSxTQUFLLEVBQUMsRUFBZDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGNBTEYsRUFNR2lFLE9BQU8sQ0FBQ2lGLEdBQVIsQ0FBWSxVQUFBRSxDQUFDO0FBQUEsV0FBRztBQUFRLFNBQUcsRUFBRUEsQ0FBYjtBQUFnQixXQUFLLEVBQUVBLENBQXZCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FBMkJBLENBQTNCLENBQUg7QUFBQSxHQUFiLENBTkgsQ0FGRixDQURGLENBWkYsRUF5QkUsTUFBQyxtREFBRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0UsTUFBQyxvREFBRCxDQUFNLEtBQU47QUFBWSxhQUFTLEVBQUVSLDJEQUFNLENBQUNHLFNBQTlCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDRSxNQUFDLG9EQUFELENBQU0sS0FBTjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHNCQURGLEVBRUUsTUFBQyxvREFBRCxDQUFNLE1BQU47QUFDRSxTQUFLLEVBQUU5SCxhQURUO0FBRUUsWUFBUSxFQUFFLGtCQUFBK0gsQ0FBQztBQUFBLGFBQUU5SCxnQkFBZ0IsQ0FBQzhILENBQUMsQ0FBQ0MsTUFBRixDQUFTakosS0FBVixDQUFsQjtBQUFBLEtBRmIsQ0FHRTtBQUhGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FLRTtBQUFRLFNBQUssRUFBQyxFQUFkO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsY0FMRixFQU1HeUUsT0FBTyxDQUFDeUUsR0FBUixDQUFZLFVBQUFHLENBQUM7QUFBQSxXQUFHO0FBQVEsU0FBRyxFQUFFQSxDQUFiO0FBQWdCLFdBQUssRUFBRUEsQ0FBdkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQUEyQkEsQ0FBM0IsQ0FBSDtBQUFBLEdBQWIsQ0FOSCxDQUZGLENBREYsQ0F6QkYsQ0FERixFQXdDRSxNQUFDLG1EQUFEO0FBQUssYUFBUyxFQUFDLE1BQWY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFLE1BQUMsbURBQUQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFLE1BQUMsb0RBQUQsQ0FBTSxLQUFOO0FBQVksYUFBUyxFQUFFVCwyREFBTSxDQUFDRyxTQUE5QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0UsTUFBQyxvREFBRCxDQUFNLEtBQU47QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQURGLEVBRUUsTUFBQyxxREFBRDtBQUFPLGFBQVMsRUFBQyxZQUFqQjtBQUE4QixPQUFHLEVBQUUsQ0FBbkM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFLE1BQUMsb0RBQUQsQ0FBTSxNQUFOO0FBQ0UsU0FBSyxFQUFFNUgsV0FEVDtBQUVFLFlBQVEsRUFBRSxrQkFBQTZILENBQUM7QUFBQSxhQUFJNUgsY0FBYyxDQUFDNEgsQ0FBQyxDQUFDQyxNQUFGLENBQVNqSixLQUFWLENBQWxCO0FBQUEsS0FGYixDQUdFO0FBSEY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUtFO0FBQVEsU0FBSyxFQUFDLEVBQWQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxrQkFMRixFQU1HMEUsVUFBVSxDQUFDd0UsR0FBWCxDQUFlLFVBQUFwQyxDQUFDO0FBQUEsV0FBSTtBQUFRLFNBQUcsRUFBRUEsQ0FBYjtBQUFnQixXQUFLLEVBQUVBLENBQXZCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FBMkJBLENBQTNCLENBQUo7QUFBQSxHQUFoQixDQU5ILENBREYsRUFTRSxNQUFDLHNEQUFEO0FBQVEsV0FBTyxFQUFDLG1CQUFoQjtBQUFvQyxXQUFPLEVBQUVJLFlBQTdDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFURixDQUZGLENBREYsQ0FERixFQW1CRSxNQUFDLG1EQUFEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDRSxNQUFDLG9EQUFELENBQU0sS0FBTjtBQUFZLGFBQVMsRUFBRTBCLDJEQUFNLENBQUNHLFNBQTlCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDQSxNQUFDLG9EQUFELENBQU0sS0FBTjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGNBREEsRUFFQSxNQUFDLHFEQUFEO0FBQU8sYUFBUyxFQUFDLFlBQWpCO0FBQThCLE9BQUcsRUFBRSxDQUFuQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0EsTUFBQyxvREFBRCxDQUFNLE1BQU47QUFDRSxTQUFLLEVBQUUxSCxjQURUO0FBRUUsWUFBUSxFQUFFLGtCQUFBMkgsQ0FBQztBQUFBLGFBQUcxSCxpQkFBaUIsQ0FBQzBILENBQUMsQ0FBQ0MsTUFBRixDQUFTakosS0FBVixDQUFwQjtBQUFBLEtBRmIsQ0FHSTtBQUhKO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FLSTtBQUFRLFNBQUssRUFBQyxFQUFkO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBTEosRUFNTzJFLGFBQWEsQ0FBQ3VFLEdBQWQsQ0FBa0IsVUFBQW5GLENBQUM7QUFBQSxXQUFJO0FBQVEsU0FBRyxFQUFFQSxDQUFiO0FBQWdCLFdBQUssRUFBRUEsQ0FBdkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQUEyQkEsQ0FBM0IsQ0FBSjtBQUFBLEdBQW5CLENBTlAsQ0FEQSxFQVNJLE1BQUMsc0RBQUQ7QUFBUSxXQUFPLEVBQUMsbUJBQWhCO0FBQW9DLFdBQU8sRUFBRXNELGVBQTdDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsZ0JBVEosQ0FGQSxDQURGLENBbkJGLENBeENGLEVBK0VFO0FBQUssYUFBUyxFQUFFdUIsMkRBQU0sQ0FBQ1UsU0FBdkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFLE1BQUMsc0RBQUQ7QUFBUSxXQUFPLEVBQUMsaUJBQWhCO0FBQWtDLFdBQU8sRUFBRS9CLE9BQTNDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FERixFQUlFO0FBQUssYUFBUyxFQUFFcUIsMkRBQU0sQ0FBQ1csWUFBdkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQUpGLEVBS0UsTUFBQyxzREFBRDtBQUFRLFdBQU8sRUFBQyxXQUFoQjtBQUE0QixXQUFPLEVBQUUxSixRQUFyQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGNBTEYsRUFRRSxNQUFDLHNEQUFEO0FBQVEsV0FBTyxFQUFDLFNBQWhCO0FBQTBCLFdBQU8sRUFBRXlILFFBQW5DO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsVUFSRixDQS9FRixFQTRGRSxNQUFDLHFEQUFEO0FBQ0UsUUFBSSxFQUFFL0YsT0FEUjtBQUVFLFVBQU0sRUFBRTtBQUFBLGFBQU1DLFVBQVUsQ0FBQyxLQUFELENBQWhCO0FBQUEsS0FGVjtBQUdFLFlBQVEsTUFIVjtBQUlFLFFBQUksRUFBQyxJQUpQO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FNRSxNQUFDLHFEQUFELENBQU8sTUFBUDtBQUFjLGVBQVcsTUFBekI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFLE1BQUMscURBQUQsQ0FBTyxLQUFQO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBREYsQ0FORixFQVNFLE1BQUMscURBQUQsQ0FBTyxJQUFQO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDR2UsVUFBVSxJQUNUO0FBQUssYUFBUyxFQUFFcUcsMkRBQU0sQ0FBQ3JHLFVBQXZCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDRSxNQUFDLHVEQUFEO0FBQVMsYUFBUyxFQUFDLFFBQW5CO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFERixFQUVFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsOEJBRkYsQ0FGSixFQU9HRSxRQUFRLElBQUk7QUFBSyxhQUFTLEVBQUVtRywyREFBTSxDQUFDbkcsUUFBdkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUFrQ0EsUUFBbEMsQ0FQZixFQVNHLENBQUNGLFVBQUQsSUFBZWQsT0FBTyxLQUFLLFNBQTNCLElBQ0M7QUFBSyxhQUFTLEVBQUVtSCwyREFBTSxDQUFDWSxRQUF2QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0U7QUFBSyxhQUFTLEVBQUVaLDJEQUFNLENBQUNhLE9BQXZCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBREYsRUFFRTtBQUFLLGFBQVMsRUFBRWIsMkRBQU0sQ0FBQ2MsU0FBdkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNHLENBQUMsR0FBRCxFQUFNLEdBQU4sRUFBVyxHQUFYLEVBQWdCLEdBQWhCLEVBQXFCLEdBQXJCLEVBQTBCLEdBQTFCLEVBQStCLEdBQS9CLEVBQW9DUixHQUFwQyxDQUF3QyxVQUFDbEUsUUFBRDtBQUFBLFdBQ3ZDO0FBQ0UsU0FBRyxFQUFFQSxRQURQO0FBRUUsVUFBSSxFQUFDLFFBRlA7QUFHRSxlQUFTLFlBQUs0RCwyREFBTSxDQUFDZSxXQUFaLGNBQTJCZiwyREFBTSxpQkFBVTVELFFBQVYsRUFBakMsQ0FIWDtBQUlFLGFBQU8sRUFBRTtBQUFBLGVBQU13QyxrQkFBa0IsQ0FBQ3hDLFFBQUQsQ0FBeEI7QUFBQSxPQUpYO0FBS0UsY0FBUSxFQUFFLENBQUNKLGFBQWEsQ0FBQ2dGLFFBQWQsQ0FBdUI1RSxRQUF2QixDQUxiO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FPR0EsUUFQSCxDQUR1QztBQUFBLEdBQXhDLENBREgsQ0FGRixDQVZKLEVBNEJHLENBQUN6QyxVQUFELElBQWVkLE9BQU8sS0FBSyxNQUEzQixJQUNDO0FBQUssYUFBUyxFQUFFbUgsMkRBQU0sQ0FBQ1ksUUFBdkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFO0FBQUssYUFBUyxFQUFFWiwyREFBTSxDQUFDYSxPQUF2QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGdCQUNVOUgsU0FEViw4QkFERixFQUlJLFlBQU07QUFDTixRQUFNa0ksSUFBSSxHQUFHOUUsbUJBQW1CLENBQUNwRCxTQUFELENBQWhDO0FBQ0EsUUFBTXdELElBQUksR0FBR2xCLE9BQU8sQ0FBQ2lDLEtBQVIsQ0FBYyxDQUFkLEVBQWlCMkQsSUFBSSxDQUFDMUUsSUFBTCxJQUFhLENBQTlCLENBQWI7QUFDQSxRQUFNRCxJQUFJLEdBQUdULE9BQU8sQ0FBQ3lCLEtBQVIsQ0FBYyxDQUFkLEVBQWlCMkQsSUFBSSxDQUFDM0UsSUFBTCxJQUFhLENBQTlCLENBQWI7O0FBQ0EsUUFBSSxDQUFDQyxJQUFJLENBQUNmLE1BQU4sSUFBZ0IsQ0FBQ2MsSUFBSSxDQUFDZCxNQUExQixFQUFrQztBQUNoQyxhQUNFO0FBQUssaUJBQVMsRUFBRXdFLDJEQUFNLENBQUNrQixRQUF2QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHlDQURGO0FBS0Q7O0FBQ0QsV0FDRTtBQUFLLGVBQVMsRUFBRWxCLDJEQUFNLENBQUNtQixXQUF2QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BQ0U7QUFBSyxlQUFTLEVBQUVuQiwyREFBTSxDQUFDb0IsSUFBdkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQUNHN0UsSUFBSSxDQUFDK0QsR0FBTCxDQUFTLFVBQUNwRCxHQUFEO0FBQUEsYUFDUlosSUFBSSxDQUFDZ0UsR0FBTCxDQUFTLFVBQUNuRCxHQUFELEVBQVM7QUFBQTs7QUFDaEIsWUFBTUssT0FBTyxhQUFNTixHQUFOLGNBQWFDLEdBQWIsQ0FBYjtBQUNBLFlBQU1rRSxVQUFVLEdBQUdDLE9BQU8sMEJBQ3hCL0gsY0FBYyxDQUFDaUUsT0FBRCxDQURVLDBEQUN4QixzQkFBeUJoQyxNQURELENBQTFCO0FBR0EsZUFDRTtBQUNFLGFBQUcsRUFBRWdDLE9BRFA7QUFFRSxjQUFJLEVBQUMsUUFGUDtBQUdFLG1CQUFTLFlBQUt3QywyREFBTSxDQUFDdUIsUUFBWixjQUNQRixVQUFVLEdBQUcsRUFBSCxHQUFRckIsMkRBQU0sQ0FBQ3dCLGdCQURsQixDQUhYO0FBTUUsaUJBQU8sRUFBRTtBQUFBLG1CQUNQSCxVQUFVLElBQUl4QyxnQkFBZ0IsQ0FBQzNCLEdBQUQsRUFBTUMsR0FBTixDQUR2QjtBQUFBLFdBTlg7QUFTRSxrQkFBUSxFQUFFLENBQUNrRSxVQVRiO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FXRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBQU9uRSxHQUFQLEVBQVlDLEdBQVosQ0FYRixDQURGO0FBZUQsT0FwQkQsQ0FEUTtBQUFBLEtBQVQsQ0FESCxDQURGLENBREY7QUE2QkQsR0F4Q0EsRUFKSCxDQTdCSixFQTZFRyxDQUFDeEQsVUFBRCxJQUFlZCxPQUFPLEtBQUssU0FBM0IsSUFDQztBQUFLLGFBQVMsRUFBRW1ILDJEQUFNLENBQUNZLFFBQXZCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDRTtBQUFLLGFBQVMsRUFBRVosMkRBQU0sQ0FBQ2EsT0FBdkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxnQkFDVTlILFNBRFYsb0JBQ2dDRSxNQURoQyxFQUN3Q0UsTUFEeEMsc0JBREYsRUFJRTtBQUFLLGFBQVMsRUFBRTZHLDJEQUFNLENBQUN5QixVQUF2QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0csQ0FBQ2xJLGNBQWMsV0FBSU4sTUFBSixjQUFjRSxNQUFkLEVBQWQsSUFBeUMsRUFBMUMsRUFBOENtSCxHQUE5QyxDQUFrRCxVQUFDcEYsTUFBRCxFQUFZO0FBQzdELFFBQU15QyxTQUFTLGFBQU0xRSxNQUFOLGNBQWdCRSxNQUFoQixlQUEyQitCLE1BQTNCLENBQWY7QUFDQSxRQUFNd0csSUFBSSxHQUFHakksYUFBYSxDQUFDa0UsU0FBRCxDQUFiLElBQTRCLEVBQXpDO0FBQ0EsUUFBTWdFLFFBQVEsR0FBR0QsSUFBSSxDQUFDbEcsTUFBTCxLQUFnQixDQUFqQztBQUNBLFdBQ0U7QUFDRSxTQUFHLEVBQUVOLE1BRFA7QUFFRSxVQUFJLEVBQUMsUUFGUDtBQUdFLGVBQVMsWUFBSzhFLDJEQUFNLENBQUM0QixZQUFaLGNBQ1BELFFBQVEsR0FBRzNCLDJEQUFNLENBQUN3QixnQkFBVixHQUE2QixFQUQ5QixDQUhYO0FBTUUsYUFBTyxFQUFFO0FBQUEsZUFBTSxDQUFDRyxRQUFELElBQWEzQyxrQkFBa0IsQ0FBQzlELE1BQUQsQ0FBckM7QUFBQSxPQU5YO0FBT0UsY0FBUSxFQUFFeUcsUUFQWjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGtCQVNVekcsTUFUVixDQURGO0FBYUQsR0FqQkEsQ0FESCxFQW1CRyxDQUFDLENBQUMzQixjQUFjLFdBQUlOLE1BQUosY0FBY0UsTUFBZCxFQUFkLElBQXlDLEVBQTFDLEVBQThDcUMsTUFBL0MsSUFDQztBQUFLLGFBQVMsRUFBRXdFLDJEQUFNLENBQUNrQixRQUF2QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGtDQXBCSixDQUpGLENBOUVKLEVBOEdHLENBQUN2SCxVQUFELElBQWVkLE9BQU8sS0FBSyxNQUEzQixJQUNDO0FBQUssYUFBUyxFQUFFbUgsMkRBQU0sQ0FBQ1ksUUFBdkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFO0FBQUssYUFBUyxFQUFFWiwyREFBTSxDQUFDYSxPQUF2QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGdCQUNVOUgsU0FEVixvQkFDZ0NFLE1BRGhDLEVBQ3dDRSxNQUR4QyxtQkFDMERFLFNBRDFELENBREYsRUFJRTtBQUFLLGFBQVMsRUFBRTJHLDJEQUFNLENBQUN5QixVQUF2QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0csQ0FBQ2hJLGFBQWEsV0FBSVIsTUFBSixjQUFjRSxNQUFkLGVBQXlCRSxTQUF6QixFQUFiLElBQXNELEVBQXZELEVBQTJEaUgsR0FBM0QsQ0FDQyxVQUFDdEYsR0FBRDtBQUFBLFdBQ0U7QUFDRSxTQUFHLEVBQUVBLEdBRFA7QUFFRSxVQUFJLEVBQUMsUUFGUDtBQUdFLGVBQVMsWUFBS2dGLDJEQUFNLENBQUM0QixZQUFaLGNBQTRCNUIsMkRBQU0sQ0FBQzZCLFNBQW5DLENBSFg7QUFJRSxhQUFPLEVBQUU7QUFBQSxlQUFNM0MsZUFBZSxDQUFDbEUsR0FBRCxDQUFyQjtBQUFBLE9BSlg7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQU1PQSxHQU5QLENBREY7QUFBQSxHQURELENBREgsRUFhRyxDQUFDLENBQUN2QixhQUFhLFdBQUlSLE1BQUosY0FBY0UsTUFBZCxlQUF5QkUsU0FBekIsRUFBYixJQUFzRCxFQUF2RCxFQUNDbUMsTUFERixJQUVDO0FBQUssYUFBUyxFQUFFd0UsMkRBQU0sQ0FBQ2tCLFFBQXZCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEseUNBZkosQ0FKRixDQS9HSixDQVRGLEVBbUpFLE1BQUMscURBQUQsQ0FBTyxNQUFQO0FBQWMsYUFBUyxFQUFFbEIsMkRBQU0sQ0FBQzhCLFNBQWhDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDRSxNQUFDLHNEQUFEO0FBQ0UsV0FBTyxFQUFDLG1CQURWO0FBRUUsV0FBTyxFQUFFMUMsYUFGWDtBQUdFLFlBQVEsRUFBRXZHLE9BQU8sS0FBSyxTQUh4QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFlBREYsRUFRRSxNQUFDLHNEQUFEO0FBQVEsV0FBTyxFQUFDLGlCQUFoQjtBQUFrQyxXQUFPLEVBQUV3RyxtQkFBM0M7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQVJGLEVBV0UsTUFBQyxzREFBRDtBQUFRLFdBQU8sRUFBQyxXQUFoQjtBQUE0QixXQUFPLEVBQUU7QUFBQSxhQUFNekcsVUFBVSxDQUFDLEtBQUQsQ0FBaEI7QUFBQSxLQUFyQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBWEYsQ0FuSkYsQ0E1RkYsQ0FERjtBQWtRRDs7R0EvZnVCN0IsUTtVQVFQUSxxRDs7O0tBUk9SLFEiLCJmaWxlIjoic3RhdGljL3dlYnBhY2svcGFnZXMvTmV3U2VhcmNoL2l0ZW0vW2lkXS4zMmRjY2RmNjdjZTZjYTUyMzJhNy5ob3QtdXBkYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTmV3TG9jYWwuanNcbmltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0LCB1c2VNZW1vIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBGb3JtLCBSb3csIENvbCwgQnV0dG9uLCBTdGFjaywgTW9kYWwsIFNwaW5uZXIgfSBmcm9tIFwicmVhY3QtYm9vdHN0cmFwXCI7XG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tIFwibmV4dC9yb3V0ZXJcIjtcbmltcG9ydCBmaXJlYmFzZSBmcm9tIFwiLi4vLi4vLi4vLi4vY29udGV4dC9GaXJlYmFzZVwiO1xuaW1wb3J0IHN0eWxlcyBmcm9tIFwiLi9OZXdMb2NhbC5tb2R1bGUuY3NzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIE5ld0xvY2FsKHtcbiAgb25TYXZlID0gKCkgPT4ge30sXG4gIG9uQ2FuY2VsID0gKCkgPT4ge30sXG4gIHNlbGVjdGVkQ2xpZW50LFxuICBzaG93TG9jYWxMb2MsXG4gIHZhbHVlID0ge30sXG4gIG9uQ2hhbmdlLFxufSkge1xuICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcbiAgY29uc3QgW3JlZ2lvbk9wdGlvbnMsIHNldFJlZ2lvbk9wdGlvbnNdID0gdXNlU3RhdGUoW10pO1xuICBjb25zdCBbc2VjdGlvbk1hcCwgc2V0U2VjdGlvbk1hcF0gICAgID0gdXNlU3RhdGUoe30pO1xuICBjb25zdCBbYmluQ291bnQsIHNldEJpbkNvdW50XSAgICAgICAgID0gdXNlU3RhdGUoMCk7XG4gIGNvbnN0IFtwYWxsZXRDb3VudCwgc2V0UGFsbGV0Q291bnRdICAgPSB1c2VTdGF0ZSgwKTtcblxuICBjb25zdCBbcmVnaW9uLCBzZXRSZWdpb25dID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtzZWN0aW9uTGV0dGVyLCBzZXRTZWN0aW9uTGV0dGVyXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbc2VjdGlvbk51bWJlciwgc2V0U2VjdGlvbk51bWJlcl0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2JpblNlbGVjdGVkLCBzZXRCaW5TZWxlY3RlZF0gICAgID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtwYWxsZXRTZWxlY3RlZCwgc2V0UGFsbGV0U2VsZWN0ZWRdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtzaG93TWFwLCBzZXRTaG93TWFwXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW21hcFN0ZXAsIHNldE1hcFN0ZXBdID0gdXNlU3RhdGUoXCJyZWdpb25zXCIpO1xuICBjb25zdCBbbWFwUmVnaW9uLCBzZXRNYXBSZWdpb25dID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFttYXBSb3csIHNldE1hcFJvd10gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW21hcENvbCwgc2V0TWFwQ29sXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbbWFwUGFsbGV0LCBzZXRNYXBQYWxsZXRdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFttYXBDZWxsUGFsbGV0cywgc2V0TWFwQ2VsbFBhbGxldHNdID0gdXNlU3RhdGUoe30pO1xuICBjb25zdCBbbWFwUGFsbGV0Qmlucywgc2V0TWFwUGFsbGV0Qmluc10gPSB1c2VTdGF0ZSh7fSk7XG4gIGNvbnN0IFttYXBMb2FkaW5nLCBzZXRNYXBMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW21hcEVycm9yLCBzZXRNYXBFcnJvcl0gPSB1c2VTdGF0ZShcIlwiKTtcblxuICAvLyAxKSBsb2FkIGRpcmVjdG9yeSBleGFjdGx5IGFzIGJlZm9yZVxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghc2hvd0xvY2FsTG9jKSByZXR1cm47XG4gICAgY29uc3QgZGIgPSBmaXJlYmFzZS5maXJlc3RvcmUoKTtcbiAgICBkYi5jb2xsZWN0aW9uKFwiV2FyZWhvdXNlXCIpLmRvYyhcImRpcmVjdG9yeVwiKS5nZXQoKS50aGVuKGRvYyA9PiB7XG4gICAgICBjb25zdCBkID0gZG9jLmRhdGEoKSB8fCB7fTtcbiAgICAgIHNldFJlZ2lvbk9wdGlvbnMoZC5SZWdpb24gICB8fCBbXSk7XG4gICAgICBzZXRTZWN0aW9uTWFwICAgKGQuU2VjdGlvbiAgfHwge30pO1xuICAgICAgc2V0QmluQ291bnQgICAgIChkLkJpbiAgICAgIHx8IDApO1xuICAgICAgc2V0UGFsbGV0Q291bnQgIChkLlBhbGxldCAgIHx8IDApO1xuICAgIH0pO1xuICB9LCBbc2hvd0xvY2FsTG9jXSk7XG5cbiAgLy8gMikgd2hlbiB3ZSBvcGVuIHRoZSBtb2RhbCAob3IgdmFsdWUgY2hhbmdlcyksIGluaXRpYWxpemUgZnJvbSB2YWx1ZVxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghc2hvd0xvY2FsTG9jKSByZXR1cm47XG4gICAgc2V0UmVnaW9uICAgICAgICAodmFsdWUucmVnaW9uICAgICAgICAgICAgIHx8IFwiXCIpO1xuICAgIHNldFNlY3Rpb25MZXR0ZXIodmFsdWUuc2VjdGlvbj8ubGV0dGVyICAgIHx8IFwiXCIpO1xuICAgIHNldFNlY3Rpb25OdW1iZXIodmFsdWUuc2VjdGlvbj8ubnVtYmVyICAgIHx8IFwiXCIpO1xuICAgIHNldEJpblNlbGVjdGVkICAgKHZhbHVlLmJpbj8udG9TdHJpbmcoKSAgICB8fCBcIlwiKTtcbiAgICBzZXRQYWxsZXRTZWxlY3RlZCh2YWx1ZS5wYWxsZXQ/LnRvU3RyaW5nKCl8fCBcIlwiKTtcbiAgfSwgW3Nob3dMb2NhbExvY10pO1xuXG4gIC8vIDMpIG5vdGlmeSBwYXJlbnQgb24gYW55IGNoYW5nZVxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IHAgPSB7fTtcbiAgICBpZiAocmVnaW9uKSAgICAgICAgIHAucmVnaW9uICA9IHJlZ2lvbjtcbiAgICBpZiAoc2VjdGlvbkxldHRlciAmJiBzZWN0aW9uTnVtYmVyKSBwLnNlY3Rpb24gPSB7IGxldHRlcjogc2VjdGlvbkxldHRlciwgbnVtYmVyOiBzZWN0aW9uTnVtYmVyIH07XG4gICAgaWYgKGJpblNlbGVjdGVkKSAgICBwLmJpbiAgICAgPSBwYXJzZUludChiaW5TZWxlY3RlZCwxMCk7XG4gICAgaWYgKHBhbGxldFNlbGVjdGVkKSBwLnBhbGxldCAgPSBwYXJzZUludChwYWxsZXRTZWxlY3RlZCwxMCk7XG4gICAgb25DaGFuZ2UocCk7XG4gIH0sIFtyZWdpb24sIHNlY3Rpb25MZXR0ZXIsIHNlY3Rpb25OdW1iZXIsIGJpblNlbGVjdGVkLCBwYWxsZXRTZWxlY3RlZF0pO1xuXG4gIC8vIGhlbHBlcnM6XG5jb25zdCBsZXR0ZXJzID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogMjYgfSwgKF8sIGkpID0+IFN0cmluZy5mcm9tQ2hhckNvZGUoNjUgKyBpKSk7XG5jb25zdCBudW1iZXJzID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogNTAgfSwgKF8sIGkpID0+IGkgKyAxKTtcbiAgY29uc3QgYmluT3B0aW9ucyA9IEFycmF5LmZyb20oeyBsZW5ndGg6IGJpbkNvdW50IH0sIChfLCBpKSA9PiBpICsgMSk7XG4gIGNvbnN0IHBhbGxldE9wdGlvbnMgPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiBwYWxsZXRDb3VudCB9LCAoXywgaSkgPT4gaSArIDEpO1xuICBjb25zdCByZWdpb25MZXR0ZXJzID0gdXNlTWVtbyhcbiAgICAoKSA9PiAoQXJyYXkuaXNBcnJheShyZWdpb25PcHRpb25zKSAmJiByZWdpb25PcHRpb25zLmxlbmd0aCA/IHJlZ2lvbk9wdGlvbnMgOiBbXCJBXCIsIFwiQlwiLCBcIkNcIiwgXCJEXCIsIFwiRVwiLCBcIkZcIiwgXCJHXCJdKSxcbiAgICBbcmVnaW9uT3B0aW9uc11cbiAgKTtcbiAgY29uc3QgZ2V0UmVnaW9uRGltZW5zaW9ucyA9IChyZWdpb25JZCkgPT4ge1xuICAgIGNvbnN0IGVudHJ5ID0gc2VjdGlvbk1hcD8uW3JlZ2lvbklkXTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShlbnRyeSkgJiYgZW50cnkubGVuZ3RoID49IDIpIHtcbiAgICAgIGNvbnN0IGNvbHMgPSBwYXJzZUludChlbnRyeVswXSwgMTApO1xuICAgICAgY29uc3Qgcm93cyA9IHBhcnNlSW50KGVudHJ5WzFdLCAxMCk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBjb2xzOiBOdW1iZXIuaXNGaW5pdGUoY29scykgPyBjb2xzIDogMCxcbiAgICAgICAgcm93czogTnVtYmVyLmlzRmluaXRlKHJvd3MpID8gcm93cyA6IDAsXG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4geyBjb2xzOiAwLCByb3dzOiAwIH07XG4gIH07XG5cbiAgY29uc3QgbG9hZFJlZ2lvbkludmVudG9yeSA9IGFzeW5jIChyZWdpb25JZCkgPT4ge1xuICAgIGlmICghcmVnaW9uSWQpIHJldHVybjtcbiAgICBzZXRNYXBMb2FkaW5nKHRydWUpO1xuICAgIHNldE1hcEVycm9yKFwiXCIpO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBzbmFwID0gYXdhaXQgZmlyZWJhc2VcbiAgICAgICAgLmZpcmVzdG9yZSgpXG4gICAgICAgIC5jb2xsZWN0aW9uKFwiVGVzdFwiKVxuICAgICAgICAud2hlcmUoXCJuZXdMb2NhbEN1cnJlbnQucmVnaW9uXCIsIFwiPT1cIiwgcmVnaW9uSWQpXG4gICAgICAgIC5nZXQoKTtcblxuICAgICAgY29uc3QgY2VsbFBhbGxldHMgPSB7fTtcbiAgICAgIGNvbnN0IHBhbGxldEJpbnMgPSB7fTtcbiAgICAgIHNuYXAuZm9yRWFjaCgoZG9jKSA9PiB7XG4gICAgICAgIGNvbnN0IGxvYyA9IGRvYy5kYXRhKCk/Lm5ld0xvY2FsQ3VycmVudCB8fCB7fTtcbiAgICAgICAgbGV0IHJvdyA9IGxvYy5zZWN0aW9uPy5sZXR0ZXI7XG4gICAgICAgIGxldCBjb2wgPSBsb2Muc2VjdGlvbj8ubnVtYmVyO1xuICAgICAgICBpZiAoKCFyb3cgfHwgIWNvbCkgJiYgdHlwZW9mIGxvYy5zZWN0aW9uID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgY29uc3QgdHJpbW1lZCA9IGxvYy5zZWN0aW9uLnRyaW0oKTtcbiAgICAgICAgICByb3cgPSB0cmltbWVkLnNsaWNlKDAsIDEpO1xuICAgICAgICAgIGNvbCA9IHRyaW1tZWQuc2xpY2UoMSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbCAhPT0gdW5kZWZpbmVkICYmIGNvbCAhPT0gbnVsbCkge1xuICAgICAgICAgIGNvbCA9IFN0cmluZyhjb2wpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBhbGxldCA9IGxvYy5wYWxsZXQ7XG4gICAgICAgIGNvbnN0IGJpbiA9IGxvYy5iaW47XG4gICAgICAgIGlmICghcm93IHx8ICFjb2wpIHJldHVybjtcbiAgICAgICAgY29uc3QgY2VsbEtleSA9IGAke3Jvd30tJHtjb2x9YDtcbiAgICAgICAgaWYgKHBhbGxldCAhPT0gdW5kZWZpbmVkICYmIHBhbGxldCAhPT0gbnVsbCAmJiBgJHtwYWxsZXR9YCAhPT0gXCJcIikge1xuICAgICAgICAgIGlmICghY2VsbFBhbGxldHNbY2VsbEtleV0pIGNlbGxQYWxsZXRzW2NlbGxLZXldID0gbmV3IFNldCgpO1xuICAgICAgICAgIGNlbGxQYWxsZXRzW2NlbGxLZXldLmFkZChTdHJpbmcocGFsbGV0KSk7XG4gICAgICAgICAgaWYgKGJpbiAhPT0gdW5kZWZpbmVkICYmIGJpbiAhPT0gbnVsbCAmJiBgJHtiaW59YCAhPT0gXCJcIikge1xuICAgICAgICAgICAgY29uc3QgcGFsbGV0S2V5ID0gYCR7Y2VsbEtleX0tUCR7cGFsbGV0fWA7XG4gICAgICAgICAgICBpZiAoIXBhbGxldEJpbnNbcGFsbGV0S2V5XSkgcGFsbGV0Qmluc1twYWxsZXRLZXldID0gbmV3IFNldCgpO1xuICAgICAgICAgICAgcGFsbGV0Qmluc1twYWxsZXRLZXldLmFkZChTdHJpbmcoYmluKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgY29uc3QgY2VsbE9iaiA9IHt9O1xuICAgICAgT2JqZWN0LmtleXMoY2VsbFBhbGxldHMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICBjZWxsT2JqW2tleV0gPSBBcnJheS5mcm9tKGNlbGxQYWxsZXRzW2tleV0pLnNvcnQoXG4gICAgICAgICAgKGEsIGIpID0+IE51bWJlcihhKSAtIE51bWJlcihiKVxuICAgICAgICApO1xuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IHBhbGxldE9iaiA9IHt9O1xuICAgICAgT2JqZWN0LmtleXMocGFsbGV0QmlucykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgIHBhbGxldE9ialtrZXldID0gQXJyYXkuZnJvbShwYWxsZXRCaW5zW2tleV0pLnNvcnQoXG4gICAgICAgICAgKGEsIGIpID0+IE51bWJlcihhKSAtIE51bWJlcihiKVxuICAgICAgICApO1xuICAgICAgfSk7XG5cbiAgICAgIHNldE1hcENlbGxQYWxsZXRzKGNlbGxPYmopO1xuICAgICAgc2V0TWFwUGFsbGV0QmlucyhwYWxsZXRPYmopO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGxvYWQgbWFwIGludmVudG9yeVwiLCBlcnJvcik7XG4gICAgICBzZXRNYXBFcnJvcihcIkZhaWxlZCB0byBsb2FkIG1hcCBpbnZlbnRvcnkuXCIpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRNYXBMb2FkaW5nKGZhbHNlKTtcbiAgICB9XG4gIH07XG5cbiAgLy8gYnVtcCBhbmQgcGVyc2lzdCBiaW4gY291bnRcbiAgY29uc3QgaGFuZGxlQWRkQmluID0gYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IG5leHQgPSBiaW5Db3VudCArIDE7XG4gICAgYXdhaXQgZmlyZWJhc2UuZmlyZXN0b3JlKClcbiAgICAgIC5jb2xsZWN0aW9uKFwiV2FyZWhvdXNlXCIpLmRvYyhcImRpcmVjdG9yeVwiKVxuICAgICAgLnVwZGF0ZSh7IEJpbjogbmV4dCB9KTtcbiAgICBzZXRCaW5Db3VudChuZXh0KTtcbiAgICBzZXRCaW5TZWxlY3RlZChuZXh0LnRvU3RyaW5nKCkpO1xuICB9O1xuXG4gIC8vIGJ1bXAgYW5kIHBlcnNpc3QgcGFsbGV0IGNvdW50XG4gIGNvbnN0IGhhbmRsZUFkZFBhbGxldCA9IGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBuZXh0ID0gcGFsbGV0Q291bnQgKyAxO1xuICAgIGF3YWl0IGZpcmViYXNlLmZpcmVzdG9yZSgpXG4gICAgICAuY29sbGVjdGlvbihcIldhcmVob3VzZVwiKS5kb2MoXCJkaXJlY3RvcnlcIilcbiAgICAgIC51cGRhdGUoeyBQYWxsZXQ6IG5leHQgfSk7XG4gICAgc2V0UGFsbGV0Q291bnQobmV4dCk7XG4gICAgc2V0UGFsbGV0U2VsZWN0ZWQobmV4dC50b1N0cmluZygpKTtcbiAgfTtcblxuICAvLyBvbmx5IGZpcmUgcGFyZW50IHdoZW4gdGhleSBjbGljayBPS1xuICBjb25zdCBoYW5kbGVPayA9ICgpID0+IHtcbiAgICBjb25zdCBwID0ge307XG4gICAgaWYgKHJlZ2lvbikgcC5yZWdpb24gPSByZWdpb247XG4gICAgaWYgKHNlY3Rpb25MZXR0ZXIgJiYgc2VjdGlvbk51bWJlcilcbiAgICAgIHAuc2VjdGlvbiA9IHsgbGV0dGVyOiBzZWN0aW9uTGV0dGVyLCBudW1iZXI6IHNlY3Rpb25OdW1iZXIgfTtcbiAgICBpZiAoYmluU2VsZWN0ZWQpIHAuYmluID0gcGFyc2VJbnQoYmluU2VsZWN0ZWQsIDEwKTtcbiAgICBpZiAocGFsbGV0U2VsZWN0ZWQpIHAucGFsbGV0ID0gcGFyc2VJbnQocGFsbGV0U2VsZWN0ZWQsIDEwKTtcbiAgICBvblNhdmUocCk7XG4gIH07XG5cbiAgY29uc3Qgb3Blbk1hcCA9ICgpID0+IHtcbiAgICBzZXRNYXBFcnJvcihcIlwiKTtcbiAgICBpZiAocmVnaW9uKSB7XG4gICAgICBzZXRNYXBSZWdpb24ocmVnaW9uKTtcbiAgICAgIHNldE1hcFN0ZXAoXCJncmlkXCIpO1xuICAgICAgbG9hZFJlZ2lvbkludmVudG9yeShyZWdpb24pO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZXRNYXBSZWdpb24oXCJcIik7XG4gICAgICBzZXRNYXBTdGVwKFwicmVnaW9uc1wiKTtcbiAgICB9XG4gICAgc2V0U2hvd01hcCh0cnVlKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVTZWxlY3RSZWdpb24gPSAocmVnaW9uSWQpID0+IHtcbiAgICBzZXRNYXBSZWdpb24ocmVnaW9uSWQpO1xuICAgIHNldFJlZ2lvbihyZWdpb25JZCk7XG4gICAgc2V0TWFwUm93KFwiXCIpO1xuICAgIHNldE1hcENvbChcIlwiKTtcbiAgICBzZXRNYXBQYWxsZXQoXCJcIik7XG4gICAgc2V0UGFsbGV0U2VsZWN0ZWQoXCJcIik7XG4gICAgc2V0QmluU2VsZWN0ZWQoXCJcIik7XG4gICAgc2V0TWFwU3RlcChcImdyaWRcIik7XG4gICAgbG9hZFJlZ2lvbkludmVudG9yeShyZWdpb25JZCk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlU2VsZWN0Q2VsbCA9IChyb3dMZXR0ZXIsIGNvbE51bWJlcikgPT4ge1xuICAgIHNldE1hcFJvdyhyb3dMZXR0ZXIpO1xuICAgIHNldE1hcENvbChjb2xOdW1iZXIpO1xuICAgIHNldFNlY3Rpb25MZXR0ZXIocm93TGV0dGVyKTtcbiAgICBzZXRTZWN0aW9uTnVtYmVyKFN0cmluZyhjb2xOdW1iZXIpKTtcbiAgICBzZXRNYXBQYWxsZXQoXCJcIik7XG4gICAgc2V0UGFsbGV0U2VsZWN0ZWQoXCJcIik7XG4gICAgc2V0QmluU2VsZWN0ZWQoXCJcIik7XG4gICAgc2V0TWFwU3RlcChcInBhbGxldHNcIik7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlU2VsZWN0UGFsbGV0ID0gKHBhbGxldElkKSA9PiB7XG4gICAgc2V0TWFwUGFsbGV0KHBhbGxldElkKTtcbiAgICBzZXRQYWxsZXRTZWxlY3RlZChTdHJpbmcocGFsbGV0SWQpKTtcbiAgICBzZXRCaW5TZWxlY3RlZChcIlwiKTtcbiAgICBzZXRNYXBTdGVwKFwiYmluc1wiKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVTZWxlY3RCaW4gPSAoYmluSWQpID0+IHtcbiAgICBzZXRCaW5TZWxlY3RlZChTdHJpbmcoYmluSWQpKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVNYXBCYWNrID0gKCkgPT4ge1xuICAgIGlmIChtYXBTdGVwID09PSBcImJpbnNcIikgc2V0TWFwU3RlcChcInBhbGxldHNcIik7XG4gICAgZWxzZSBpZiAobWFwU3RlcCA9PT0gXCJwYWxsZXRzXCIpIHNldE1hcFN0ZXAoXCJncmlkXCIpO1xuICAgIGVsc2UgaWYgKG1hcFN0ZXAgPT09IFwiZ3JpZFwiKSBzZXRNYXBTdGVwKFwicmVnaW9uc1wiKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVWaWV3SW52ZW50b3J5ID0gKCkgPT4ge1xuICAgIGNvbnN0IHBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoKTtcbiAgICBjb25zdCByZWdpb25WYWx1ZSA9IG1hcFJlZ2lvbiB8fCByZWdpb247XG4gICAgY29uc3QgbGV0dGVyVmFsdWUgPSBtYXBSb3cgfHwgc2VjdGlvbkxldHRlcjtcbiAgICBjb25zdCBudW1iZXJWYWx1ZSA9IG1hcENvbCB8fCBzZWN0aW9uTnVtYmVyO1xuICAgIGNvbnN0IHBhbGxldFZhbHVlID0gbWFwUGFsbGV0IHx8IHBhbGxldFNlbGVjdGVkO1xuICAgIGNvbnN0IGJpblZhbHVlID0gYmluU2VsZWN0ZWQ7XG5cbiAgICBpZiAocmVnaW9uVmFsdWUpIHBhcmFtcy5zZXQoXCJyZWdpb25cIiwgcmVnaW9uVmFsdWUpO1xuICAgIGlmIChsZXR0ZXJWYWx1ZSkgcGFyYW1zLnNldChcInNlY3Rpb25MZXR0ZXJcIiwgbGV0dGVyVmFsdWUpO1xuICAgIGlmIChudW1iZXJWYWx1ZSkgcGFyYW1zLnNldChcInNlY3Rpb25OdW1iZXJcIiwgbnVtYmVyVmFsdWUpO1xuICAgIGlmIChwYWxsZXRWYWx1ZSkgcGFyYW1zLnNldChcInBhbGxldFwiLCBwYWxsZXRWYWx1ZSk7XG4gICAgaWYgKGJpblZhbHVlKSBwYXJhbXMuc2V0KFwiYmluXCIsIGJpblZhbHVlKTtcblxuICAgIGNvbnN0IHF1ZXJ5ID0gcGFyYW1zLnRvU3RyaW5nKCk7XG4gICAgcm91dGVyLnB1c2goXG4gICAgICBgL05ld1NlYXJjaC9pbnZlbnRvcnkvaW52ZW50b3J5TWFuYWdlJHtxdWVyeSA/IGA/JHtxdWVyeX1gIDogXCJcIn1gXG4gICAgKTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMud3JhcHBlcn0+XG4gICAgICA8Um93IGNsYXNzTmFtZT17c3R5bGVzLmZvcm1Sb3d9PlxuICAgICAgICA8Q29sPlxuICAgICAgICAgIDxGb3JtLkdyb3VwIGNsYXNzTmFtZT17c3R5bGVzLmZvcm1Hcm91cH0+XG4gICAgICAgICAgICA8Rm9ybS5MYWJlbD5SZWdpb248L0Zvcm0uTGFiZWw+XG4gICAgICAgICAgICA8Rm9ybS5TZWxlY3RcbiAgICAgICAgICAgICAgdmFsdWU9e3JlZ2lvbn0gb25DaGFuZ2U9e2U9PnNldFJlZ2lvbihlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJcIj5TZWxlY3QgcmVnaW9uPC9vcHRpb24+XG4gICAgICAgICAgICAgIHtyZWdpb25PcHRpb25zLm1hcChyPT4gPG9wdGlvbiBrZXk9e3J9IHZhbHVlPXtyfT57cn08L29wdGlvbj4pfVxuICAgICAgICAgICAgPC9Gb3JtLlNlbGVjdD5cbiAgICAgICAgICA8L0Zvcm0uR3JvdXA+XG4gICAgICAgIDwvQ29sPlxuICAgICAgICA8Q29sPlxuICAgICAgICAgIDxGb3JtLkdyb3VwIGNsYXNzTmFtZT17c3R5bGVzLmZvcm1Hcm91cH0+XG4gICAgICAgICAgICA8Rm9ybS5MYWJlbD5TZWN0aW9uIExldHRlcjwvRm9ybS5MYWJlbD5cbiAgICAgICAgICAgIDxGb3JtLlNlbGVjdFxuICAgICAgICAgICAgICB2YWx1ZT17c2VjdGlvbkxldHRlcn1cbiAgICAgICAgICAgICAgb25DaGFuZ2U9e2U9PnNldFNlY3Rpb25MZXR0ZXIoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAvLyBkaXNhYmxlZD17IXJlZ2lvbn1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlwiPkxldHRlcjwvb3B0aW9uPlxuICAgICAgICAgICAgICB7bGV0dGVycy5tYXAobD0+IDxvcHRpb24ga2V5PXtsfSB2YWx1ZT17bH0+e2x9PC9vcHRpb24+KX1cbiAgICAgICAgICAgIDwvRm9ybS5TZWxlY3Q+XG4gICAgICAgICAgPC9Gb3JtLkdyb3VwPlxuICAgICAgICA8L0NvbD5cbiAgICAgICAgPENvbD5cbiAgICAgICAgICA8Rm9ybS5Hcm91cCBjbGFzc05hbWU9e3N0eWxlcy5mb3JtR3JvdXB9PlxuICAgICAgICAgICAgPEZvcm0uTGFiZWw+U2VjdGlvbiBOdW1iZXI8L0Zvcm0uTGFiZWw+XG4gICAgICAgICAgICA8Rm9ybS5TZWxlY3RcbiAgICAgICAgICAgICAgdmFsdWU9e3NlY3Rpb25OdW1iZXJ9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXtlPT5zZXRTZWN0aW9uTnVtYmVyKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgLy8gZGlzYWJsZWQ9eyFyZWdpb259XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJcIj5OdW1iZXI8L29wdGlvbj5cbiAgICAgICAgICAgICAge251bWJlcnMubWFwKG49PiA8b3B0aW9uIGtleT17bn0gdmFsdWU9e259PntufTwvb3B0aW9uPil9XG4gICAgICAgICAgICA8L0Zvcm0uU2VsZWN0PlxuICAgICAgICAgIDwvRm9ybS5Hcm91cD5cbiAgICAgICAgPC9Db2w+XG4gICAgICA8L1Jvdz5cbiAgICAgIDxSb3cgY2xhc3NOYW1lPVwibXQtM1wiPlxuICAgICAgICA8Q29sPlxuICAgICAgICAgIDxGb3JtLkdyb3VwIGNsYXNzTmFtZT17c3R5bGVzLmZvcm1Hcm91cH0+XG4gICAgICAgICAgICA8Rm9ybS5MYWJlbD5CaW48L0Zvcm0uTGFiZWw+XG4gICAgICAgICAgICA8U3RhY2sgZGlyZWN0aW9uPVwiaG9yaXpvbnRhbFwiIGdhcD17Mn0+XG4gICAgICAgICAgICAgIDxGb3JtLlNlbGVjdFxuICAgICAgICAgICAgICAgIHZhbHVlPXtiaW5TZWxlY3RlZH1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17ZSA9PiBzZXRCaW5TZWxlY3RlZChlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgLy8gZGlzYWJsZWQ9eyFyZWdpb259XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiXCI+U2VsZWN0IGJpbjwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIHtiaW5PcHRpb25zLm1hcChiID0+IDxvcHRpb24ga2V5PXtifSB2YWx1ZT17Yn0+e2J9PC9vcHRpb24+KX1cbiAgICAgICAgICAgICAgPC9Gb3JtLlNlbGVjdD5cbiAgICAgICAgICAgICAgPEJ1dHRvbiB2YXJpYW50PVwib3V0bGluZS1zZWNvbmRhcnlcIiBvbkNsaWNrPXtoYW5kbGVBZGRCaW59ID5cbiAgICAgICAgICAgICAgICArIEJpblxuICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgIDwvU3RhY2s+XG4gICAgICAgICAgPC9Gb3JtLkdyb3VwPlxuICAgICAgICA8L0NvbD5cbiAgICAgICAgPENvbD5cbiAgICAgICAgICA8Rm9ybS5Hcm91cCBjbGFzc05hbWU9e3N0eWxlcy5mb3JtR3JvdXB9PlxuICAgICAgICAgIDxGb3JtLkxhYmVsPlBhbGxldDwvRm9ybS5MYWJlbD5cbiAgICAgICAgICA8U3RhY2sgZGlyZWN0aW9uPVwiaG9yaXpvbnRhbFwiIGdhcD17Mn0+XG4gICAgICAgICAgPEZvcm0uU2VsZWN0XG4gICAgICAgICAgICB2YWx1ZT17cGFsbGV0U2VsZWN0ZWR9XG4gICAgICAgICAgICBvbkNoYW5nZT17ZSA9PnNldFBhbGxldFNlbGVjdGVkKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgLy8gZGlzYWJsZWQ9eyFyZWdpb259XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJcIj5TZWxlY3QgcGFsbGV0PC9vcHRpb24+XG4gICAgICAgICAgICAgICAge3BhbGxldE9wdGlvbnMubWFwKHAgPT4gPG9wdGlvbiBrZXk9e3B9IHZhbHVlPXtwfT57cH08L29wdGlvbj4pfVxuICAgICAgICAgICAgICA8L0Zvcm0uU2VsZWN0PlxuICAgICAgICAgICAgICA8QnV0dG9uIHZhcmlhbnQ9XCJvdXRsaW5lLXNlY29uZGFyeVwiIG9uQ2xpY2s9e2hhbmRsZUFkZFBhbGxldH0gPlxuICAgICAgICAgICAgICAgICsgUGFsbGV0XG4gICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgPC9TdGFjaz5cbiAgICAgICAgICA8L0Zvcm0uR3JvdXA+XG4gICAgICAgIDwvQ29sPlxuICAgICAgPC9Sb3c+XG4gICAgICB7LyogT0sgLyBDYW5jZWwgZm9vdGVyICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5hY3Rpb25Sb3d9PlxuICAgICAgICA8QnV0dG9uIHZhcmlhbnQ9XCJvdXRsaW5lLXByaW1hcnlcIiBvbkNsaWNrPXtvcGVuTWFwfT5cbiAgICAgICAgICBNYXBcbiAgICAgICAgPC9CdXR0b24+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuYWN0aW9uU3BhY2VyfSAvPlxuICAgICAgICA8QnV0dG9uIHZhcmlhbnQ9XCJzZWNvbmRhcnlcIiBvbkNsaWNrPXtvbkNhbmNlbH0+XG4gICAgICAgICAgQ2FuY2VsXG4gICAgICAgIDwvQnV0dG9uPlxuICAgICAgICA8QnV0dG9uIHZhcmlhbnQ9XCJwcmltYXJ5XCIgb25DbGljaz17aGFuZGxlT2t9PlxuICAgICAgICAgIE9LXG4gICAgICAgIDwvQnV0dG9uPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxNb2RhbFxuICAgICAgICBzaG93PXtzaG93TWFwfVxuICAgICAgICBvbkhpZGU9eygpID0+IHNldFNob3dNYXAoZmFsc2UpfVxuICAgICAgICBjZW50ZXJlZFxuICAgICAgICBzaXplPVwibGdcIlxuICAgICAgPlxuICAgICAgICA8TW9kYWwuSGVhZGVyIGNsb3NlQnV0dG9uPlxuICAgICAgICAgIDxNb2RhbC5UaXRsZT5XYXJlaG91c2UgTWFwPC9Nb2RhbC5UaXRsZT5cbiAgICAgICAgPC9Nb2RhbC5IZWFkZXI+XG4gICAgICAgIDxNb2RhbC5Cb2R5PlxuICAgICAgICAgIHttYXBMb2FkaW5nICYmIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubWFwTG9hZGluZ30+XG4gICAgICAgICAgICAgIDxTcGlubmVyIGFuaW1hdGlvbj1cImJvcmRlclwiIC8+XG4gICAgICAgICAgICAgIDxzcGFuPkxvYWRpbmcgbWFwIGRhdGHigKY8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApfVxuICAgICAgICAgIHttYXBFcnJvciAmJiA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLm1hcEVycm9yfT57bWFwRXJyb3J9PC9kaXY+fVxuXG4gICAgICAgICAgeyFtYXBMb2FkaW5nICYmIG1hcFN0ZXAgPT09IFwicmVnaW9uc1wiICYmIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubWFwU3RhZ2V9PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLm1hcEhpbnR9PlNlbGVjdCBhIHJlZ2lvbjwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLm1hcENhbnZhc30+XG4gICAgICAgICAgICAgICAge1tcIkVcIiwgXCJGXCIsIFwiR1wiLCBcIkFcIiwgXCJEXCIsIFwiQ1wiLCBcIkJcIl0ubWFwKChyZWdpb25JZCkgPT4gKFxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBrZXk9e3JlZ2lvbklkfVxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgJHtzdHlsZXMucmVnaW9uQmxvY2t9ICR7c3R5bGVzW2ByZWdpb24ke3JlZ2lvbklkfWBdfWB9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZVNlbGVjdFJlZ2lvbihyZWdpb25JZCl9XG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXshcmVnaW9uTGV0dGVycy5pbmNsdWRlcyhyZWdpb25JZCl9XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHtyZWdpb25JZH1cbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG5cbiAgICAgICAgICB7IW1hcExvYWRpbmcgJiYgbWFwU3RlcCA9PT0gXCJncmlkXCIgJiYgKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5tYXBTdGFnZX0+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubWFwSGludH0+XG4gICAgICAgICAgICAgICAgUmVnaW9uIHttYXBSZWdpb259OiBjaG9vc2UgYSByb3cgYW5kIGNvbHVtblxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgeygoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGltcyA9IGdldFJlZ2lvbkRpbWVuc2lvbnMobWFwUmVnaW9uKTtcbiAgICAgICAgICAgICAgICBjb25zdCByb3dzID0gbGV0dGVycy5zbGljZSgwLCBkaW1zLnJvd3MgfHwgMCk7XG4gICAgICAgICAgICAgICAgY29uc3QgY29scyA9IG51bWJlcnMuc2xpY2UoMCwgZGltcy5jb2xzIHx8IDApO1xuICAgICAgICAgICAgICAgIGlmICghcm93cy5sZW5ndGggfHwgIWNvbHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLm1hcEVtcHR5fT5cbiAgICAgICAgICAgICAgICAgICAgICBObyBncmlkIGRhdGEgZm9yIHRoaXMgcmVnaW9uLlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmdyaWRXcmFwcGVyfT5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5ncmlkfT5cbiAgICAgICAgICAgICAgICAgICAgICB7cm93cy5tYXAoKHJvdykgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbHMubWFwKChjb2wpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2VsbEtleSA9IGAke3Jvd30tJHtjb2x9YDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaGFzUGFsbGV0cyA9IEJvb2xlYW4oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwQ2VsbFBhbGxldHNbY2VsbEtleV0/Lmxlbmd0aFxuICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17Y2VsbEtleX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgJHtzdHlsZXMuZ3JpZENlbGx9ICR7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc1BhbGxldHMgPyBcIlwiIDogc3R5bGVzLmdyaWRDZWxsRGlzYWJsZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzUGFsbGV0cyAmJiBoYW5kbGVTZWxlY3RDZWxsKHJvdywgY29sKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFoYXNQYWxsZXRzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPntyb3d9e2NvbH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfSkoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG5cbiAgICAgICAgICB7IW1hcExvYWRpbmcgJiYgbWFwU3RlcCA9PT0gXCJwYWxsZXRzXCIgJiYgKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5tYXBTdGFnZX0+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubWFwSGludH0+XG4gICAgICAgICAgICAgICAgUmVnaW9uIHttYXBSZWdpb259IMK3IFNlY3Rpb24ge21hcFJvd317bWFwQ29sfTogc2VsZWN0IGEgcGFsbGV0XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnBhbGxldEdyaWR9PlxuICAgICAgICAgICAgICAgIHsobWFwQ2VsbFBhbGxldHNbYCR7bWFwUm93fS0ke21hcENvbH1gXSB8fCBbXSkubWFwKChwYWxsZXQpID0+IHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHBhbGxldEtleSA9IGAke21hcFJvd30tJHttYXBDb2x9LVAke3BhbGxldH1gO1xuICAgICAgICAgICAgICAgICAgY29uc3QgYmlucyA9IG1hcFBhbGxldEJpbnNbcGFsbGV0S2V5XSB8fCBbXTtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGRpc2FibGVkID0gYmlucy5sZW5ndGggPT09IDA7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAga2V5PXtwYWxsZXR9XG4gICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgJHtzdHlsZXMucGFsbGV0QnV0dG9ufSAke1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQgPyBzdHlsZXMuZ3JpZENlbGxEaXNhYmxlZCA6IFwiXCJcbiAgICAgICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiAhZGlzYWJsZWQgJiYgaGFuZGxlU2VsZWN0UGFsbGV0KHBhbGxldCl9XG4gICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgUGFsbGV0IHtwYWxsZXR9XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICB7IShtYXBDZWxsUGFsbGV0c1tgJHttYXBSb3d9LSR7bWFwQ29sfWBdIHx8IFtdKS5sZW5ndGggJiYgKFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5tYXBFbXB0eX0+XG4gICAgICAgICAgICAgICAgICAgIE5vIHBhbGxldHMgYXZhaWxhYmxlIGhlcmUuXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG5cbiAgICAgICAgICB7IW1hcExvYWRpbmcgJiYgbWFwU3RlcCA9PT0gXCJiaW5zXCIgJiYgKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5tYXBTdGFnZX0+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubWFwSGludH0+XG4gICAgICAgICAgICAgICAgUmVnaW9uIHttYXBSZWdpb259IMK3IFNlY3Rpb24ge21hcFJvd317bWFwQ29sfSDCtyBQYWxsZXQge21hcFBhbGxldH1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMucGFsbGV0R3JpZH0+XG4gICAgICAgICAgICAgICAgeyhtYXBQYWxsZXRCaW5zW2Ake21hcFJvd30tJHttYXBDb2x9LVAke21hcFBhbGxldH1gXSB8fCBbXSkubWFwKFxuICAgICAgICAgICAgICAgICAgKGJpbikgPT4gKFxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAga2V5PXtiaW59XG4gICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgJHtzdHlsZXMucGFsbGV0QnV0dG9ufSAke3N0eWxlcy5iaW5CdXR0b259YH1cbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVTZWxlY3RCaW4oYmluKX1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIEJpbiB7YmlufVxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIHshKG1hcFBhbGxldEJpbnNbYCR7bWFwUm93fS0ke21hcENvbH0tUCR7bWFwUGFsbGV0fWBdIHx8IFtdKVxuICAgICAgICAgICAgICAgICAgLmxlbmd0aCAmJiAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLm1hcEVtcHR5fT5cbiAgICAgICAgICAgICAgICAgICAgTm8gYmlucyBhdmFpbGFibGUgb24gdGhpcyBwYWxsZXQuXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG4gICAgICAgIDwvTW9kYWwuQm9keT5cbiAgICAgICAgPE1vZGFsLkZvb3RlciBjbGFzc05hbWU9e3N0eWxlcy5tYXBGb290ZXJ9PlxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIHZhcmlhbnQ9XCJvdXRsaW5lLXNlY29uZGFyeVwiXG4gICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVNYXBCYWNrfVxuICAgICAgICAgICAgZGlzYWJsZWQ9e21hcFN0ZXAgPT09IFwicmVnaW9uc1wifVxuICAgICAgICAgID5cbiAgICAgICAgICAgIEJhY2tcbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICA8QnV0dG9uIHZhcmlhbnQ9XCJvdXRsaW5lLXByaW1hcnlcIiBvbkNsaWNrPXtoYW5kbGVWaWV3SW52ZW50b3J5fT5cbiAgICAgICAgICAgIFZpZXdcbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICA8QnV0dG9uIHZhcmlhbnQ9XCJzZWNvbmRhcnlcIiBvbkNsaWNrPXsoKSA9PiBzZXRTaG93TWFwKGZhbHNlKX0+XG4gICAgICAgICAgICBDbG9zZVxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICA8L01vZGFsLkZvb3Rlcj5cbiAgICAgIDwvTW9kYWw+XG4gICAgPC9kaXY+XG4gICk7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9