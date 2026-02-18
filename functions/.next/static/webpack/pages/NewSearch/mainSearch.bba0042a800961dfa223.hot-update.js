webpackHotUpdate_N_E("pages/NewSearch/mainSearch",{

/***/ "./components/WarehouseMapModal.js":
/*!*****************************************!*\
  !*** ./components/WarehouseMapModal.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return WarehouseMapModal; });
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/next/node_modules/@babel/runtime/regenerator */ "./node_modules/next/node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator */ "./node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var _context_Firebase__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../context/Firebase */ "./context/Firebase.js");
/* harmony import */ var _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./WarehouseMapModal.module.css */ "./components/WarehouseMapModal.module.css");
/* harmony import */ var _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_5__);



var _jsxFileName = "C:\\Users\\mack2\\Desktop\\code\\components\\WarehouseMapModal.js",
    _s = $RefreshSig$();

var __jsx = react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement;




var REGION_ORDER = ["E", "F", "G", "A", "D", "C", "B"];
var LETTERS = Array.from({
  length: 26
}, function (_, i) {
  return String.fromCharCode(65 + i);
});
var NUMBERS = Array.from({
  length: 50
}, function (_, i) {
  return i + 1;
});
function WarehouseMapModal(_ref) {
  _s();

  var _this = this;

  var _ref$show = _ref.show,
      show = _ref$show === void 0 ? false : _ref$show,
      _ref$onHide = _ref.onHide,
      onHide = _ref$onHide === void 0 ? function () {} : _ref$onHide,
      onView = _ref.onView,
      onSelectionChange = _ref.onSelectionChange,
      _ref$initialSelection = _ref.initialSelection,
      initialSelection = _ref$initialSelection === void 0 ? {} : _ref$initialSelection;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])([]),
      regionOptions = _useState[0],
      setRegionOptions = _useState[1];

  var _useState2 = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])({}),
      sectionMap = _useState2[0],
      setSectionMap = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])("regions"),
      mapStep = _useState3[0],
      setMapStep = _useState3[1];

  var _useState4 = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])(""),
      mapRegion = _useState4[0],
      setMapRegion = _useState4[1];

  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])(""),
      mapRow = _useState5[0],
      setMapRow = _useState5[1];

  var _useState6 = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])(""),
      mapCol = _useState6[0],
      setMapCol = _useState6[1];

  var _useState7 = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])(""),
      mapPallet = _useState7[0],
      setMapPallet = _useState7[1];

  var _useState8 = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])(""),
      mapBin = _useState8[0],
      setMapBin = _useState8[1];

  var _useState9 = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])({}),
      mapCellPallets = _useState9[0],
      setMapCellPallets = _useState9[1];

  var _useState10 = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])({}),
      mapPalletBins = _useState10[0],
      setMapPalletBins = _useState10[1];

  var _useState11 = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])(false),
      mapLoading = _useState11[0],
      setMapLoading = _useState11[1];

  var _useState12 = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])(""),
      mapError = _useState12[0],
      setMapError = _useState12[1];

  var _useState13 = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])(false),
      directoryLoaded = _useState13[0],
      setDirectoryLoaded = _useState13[1];

  var notifySelectionChange = Object(react__WEBPACK_IMPORTED_MODULE_2__["useCallback"])(function (selection) {
    if (typeof onSelectionChange === "function") {
      onSelectionChange(selection);
    }
  }, [onSelectionChange]);
  var loadDirectory = Object(react__WEBPACK_IMPORTED_MODULE_2__["useCallback"])( /*#__PURE__*/Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
    var doc, data;
    return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!directoryLoaded) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return");

          case 2:
            _context.prev = 2;
            _context.next = 5;
            return _context_Firebase__WEBPACK_IMPORTED_MODULE_4__["default"].firestore().collection("Warehouse").doc("directory").get();

          case 5:
            doc = _context.sent;
            data = doc.data() || {};
            setRegionOptions(data.Region || []);
            setSectionMap(data.Section || {});
            setDirectoryLoaded(true);
            _context.next = 16;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](2);
            console.error("Failed to load map directory", _context.t0);
            setMapError("Failed to load warehouse directory.");

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 12]]);
  })), [directoryLoaded]);
  var loadRegionInventory = Object(react__WEBPACK_IMPORTED_MODULE_2__["useCallback"])( /*#__PURE__*/function () {
    var _ref3 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(regionId) {
      var snap, cellPallets, palletBins, cellObj, palletObj;
      return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (regionId) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt("return");

            case 2:
              setMapLoading(true);
              setMapError("");
              _context2.prev = 4;
              _context2.next = 7;
              return _context_Firebase__WEBPACK_IMPORTED_MODULE_4__["default"].firestore().collection("Test").where("newLocalCurrent.region", "==", regionId).get();

            case 7:
              snap = _context2.sent;
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
              _context2.next = 23;
              break;

            case 19:
              _context2.prev = 19;
              _context2.t0 = _context2["catch"](4);
              console.error("Failed to load map inventory", _context2.t0);
              setMapError("Failed to load map inventory.");

            case 23:
              _context2.prev = 23;
              setMapLoading(false);
              return _context2.finish(23);

            case 26:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[4, 19, 23, 26]]);
    }));

    return function (_x) {
      return _ref3.apply(this, arguments);
    };
  }(), []);
  var getRegionDimensions = Object(react__WEBPACK_IMPORTED_MODULE_2__["useCallback"])(function (regionId) {
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
  }, [sectionMap]);
  Object(react__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(function () {
    if (!show) return;
    loadDirectory();
    setMapError("");

    var _ref4 = initialSelection || {},
        region = _ref4.region,
        sectionLetter = _ref4.sectionLetter,
        sectionNumber = _ref4.sectionNumber,
        pallet = _ref4.pallet,
        bin = _ref4.bin;

    setMapRegion(region || "");
    setMapRow(sectionLetter || "");
    setMapCol(sectionNumber ? String(sectionNumber) : "");
    setMapPallet(pallet ? String(pallet) : "");
    setMapBin(bin ? String(bin) : "");
    setMapStep(region ? "grid" : "regions");
    if (region) loadRegionInventory(region);
  }, [show, initialSelection, loadDirectory, loadRegionInventory]);

  var handleSelectRegion = function handleSelectRegion(regionId) {
    var selection = {
      region: regionId,
      sectionLetter: "",
      sectionNumber: "",
      pallet: "",
      bin: ""
    };
    setMapRegion(regionId);
    setMapRow("");
    setMapCol("");
    setMapPallet("");
    setMapBin("");
    setMapStep("grid");
    notifySelectionChange(selection);
    loadRegionInventory(regionId);
  };

  var handleSelectCell = function handleSelectCell(rowLetter, colNumber) {
    var colValue = String(colNumber);
    var selection = {
      region: mapRegion,
      sectionLetter: rowLetter,
      sectionNumber: colValue,
      pallet: "",
      bin: ""
    };
    setMapRow(rowLetter);
    setMapCol(colValue);
    setMapPallet("");
    setMapBin("");
    setMapStep("pallets");
    notifySelectionChange(selection);
  };

  var handleSelectPallet = function handleSelectPallet(palletId) {
    var palletValue = String(palletId);
    var selection = {
      region: mapRegion,
      sectionLetter: mapRow,
      sectionNumber: mapCol,
      pallet: palletValue,
      bin: ""
    };
    setMapPallet(palletValue);
    setMapBin("");
    setMapStep("bins");
    notifySelectionChange(selection);
  };

  var handleSelectBin = function handleSelectBin(binId) {
    var binValue = String(binId);
    var selection = {
      region: mapRegion,
      sectionLetter: mapRow,
      sectionNumber: mapCol,
      pallet: mapPallet,
      bin: binValue
    };
    setMapBin(binValue);
    notifySelectionChange(selection);
  };

  var handleBack = function handleBack() {
    if (mapStep === "bins") setMapStep("pallets");else if (mapStep === "pallets") setMapStep("grid");else if (mapStep === "grid") setMapStep("regions");
  };

  var handleView = function handleView() {
    if (typeof onView !== "function") return;
    onView({
      region: mapRegion,
      sectionLetter: mapRow,
      sectionNumber: mapCol,
      pallet: mapPallet,
      bin: mapBin
    });
  };

  return __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Modal"], {
    show: show,
    onHide: onHide,
    centered: true,
    size: "lg",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 242,
      columnNumber: 5
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Modal"].Header, {
    closeButton: true,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 243,
      columnNumber: 7
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Modal"].Title, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 244,
      columnNumber: 9
    }
  }, "Warehouse Map")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Modal"].Body, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 246,
      columnNumber: 7
    }
  }, mapLoading && __jsx("div", {
    className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_5___default.a.mapLoading,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 248,
      columnNumber: 11
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Spinner"], {
    animation: "border",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 249,
      columnNumber: 13
    }
  }), __jsx("span", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 250,
      columnNumber: 13
    }
  }, "Loading map data...")), mapError && __jsx("div", {
    className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_5___default.a.mapError,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 253,
      columnNumber: 22
    }
  }, mapError), !mapLoading && mapStep === "regions" && __jsx("div", {
    className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_5___default.a.mapStage,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 256,
      columnNumber: 11
    }
  }, __jsx("div", {
    className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_5___default.a.mapHint,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 257,
      columnNumber: 13
    }
  }, "Select a region"), __jsx("div", {
    className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_5___default.a.mapCanvas,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 258,
      columnNumber: 13
    }
  }, REGION_ORDER.map(function (regionId) {
    return __jsx("button", {
      key: regionId,
      type: "button",
      className: "".concat(_WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_5___default.a.regionBlock, " ").concat(_WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_5___default.a["region".concat(regionId)]),
      onClick: function onClick() {
        return handleSelectRegion(regionId);
      },
      disabled: Array.isArray(regionOptions) && regionOptions.length > 0 && !regionOptions.includes(regionId),
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 260,
        columnNumber: 17
      }
    }, regionId);
  }))), !mapLoading && mapStep === "grid" && __jsx("div", {
    className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_5___default.a.mapStage,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 279,
      columnNumber: 11
    }
  }, __jsx("div", {
    className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_5___default.a.mapHint,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 280,
      columnNumber: 13
    }
  }, "Region ", mapRegion, ": choose a row and column"), function () {
    var dims = getRegionDimensions(mapRegion);
    var rows = LETTERS.slice(0, dims.rows || 0);
    var cols = NUMBERS.slice(0, dims.cols || 0);

    if (!rows.length || !cols.length) {
      return __jsx("div", {
        className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_5___default.a.mapEmpty,
        __self: _this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 289,
          columnNumber: 19
        }
      }, "No grid data for this region.");
    }

    return __jsx("div", {
      className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_5___default.a.gridWrapper,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 295,
        columnNumber: 17
      }
    }, __jsx("div", {
      className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_5___default.a.grid,
      style: {
        "--grid-cols": cols.length
      },
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 296,
        columnNumber: 19
      }
    }, rows.map(function (row) {
      return cols.map(function (col) {
        var _mapCellPallets$cellK;

        var cellKey = "".concat(row, "-").concat(col);
        var hasPallets = Boolean((_mapCellPallets$cellK = mapCellPallets[cellKey]) === null || _mapCellPallets$cellK === void 0 ? void 0 : _mapCellPallets$cellK.length);
        return __jsx("button", {
          key: cellKey,
          type: "button",
          className: "".concat(_WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_5___default.a.gridCell, " ").concat(hasPallets ? "" : _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_5___default.a.gridCellDisabled),
          onClick: function onClick() {
            return hasPallets && handleSelectCell(row, col);
          },
          disabled: !hasPallets,
          __self: _this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 307,
            columnNumber: 27
          }
        }, __jsx("span", {
          __self: _this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 318,
            columnNumber: 29
          }
        }, row, col));
      });
    })));
  }()), !mapLoading && mapStep === "pallets" && __jsx("div", {
    className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_5___default.a.mapStage,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 334,
      columnNumber: 11
    }
  }, __jsx("div", {
    className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_5___default.a.mapHint,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 335,
      columnNumber: 13
    }
  }, "Region ", mapRegion, " - Section ", mapRow, mapCol, ": select a pallet"), __jsx("div", {
    className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_5___default.a.palletGrid,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 339,
      columnNumber: 13
    }
  }, (mapCellPallets["".concat(mapRow, "-").concat(mapCol)] || []).map(function (pallet) {
    var palletKey = "".concat(mapRow, "-").concat(mapCol, "-P").concat(pallet);
    var bins = mapPalletBins[palletKey] || [];
    return __jsx("button", {
      key: pallet,
      type: "button",
      className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_5___default.a.palletButton,
      onClick: function onClick() {
        if (bins.length === 0 && typeof onView === "function") {
          var selection = {
            region: mapRegion,
            sectionLetter: mapRow,
            sectionNumber: mapCol,
            pallet: String(pallet),
            bin: ""
          };
          notifySelectionChange(selection);
          onView(selection);
          return;
        }

        handleSelectPallet(pallet);
      },
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 344,
        columnNumber: 19
      }
    }, "Pallet ", pallet);
  }), !(mapCellPallets["".concat(mapRow, "-").concat(mapCol)] || []).length && __jsx("div", {
    className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_5___default.a.mapEmpty,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 369,
      columnNumber: 17
    }
  }, "No pallets available here."))), !mapLoading && mapStep === "bins" && __jsx("div", {
    className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_5___default.a.mapStage,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 378,
      columnNumber: 11
    }
  }, __jsx("div", {
    className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_5___default.a.mapHint,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 379,
      columnNumber: 13
    }
  }, "Region ", mapRegion, " - Section ", mapRow, mapCol, " - Pallet ", mapPallet), __jsx("div", {
    className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_5___default.a.palletGrid,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 383,
      columnNumber: 13
    }
  }, (mapPalletBins["".concat(mapRow, "-").concat(mapCol, "-P").concat(mapPallet)] || []).map(function (bin) {
    return __jsx("button", {
      key: bin,
      type: "button",
      className: "".concat(_WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_5___default.a.palletButton, " ").concat(_WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_5___default.a.binButton),
      onClick: function onClick() {
        return handleSelectBin(bin);
      },
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 386,
        columnNumber: 19
      }
    }, "Bin ", bin);
  }), !(mapPalletBins["".concat(mapRow, "-").concat(mapCol, "-P").concat(mapPallet)] || []).length && __jsx("div", {
    className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_5___default.a.mapEmpty,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 398,
      columnNumber: 17
    }
  }, "No bins available on this pallet.")))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Modal"].Footer, {
    className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_5___default.a.mapFooter,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 406,
      columnNumber: 7
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], {
    variant: "outline-secondary",
    onClick: handleBack,
    disabled: mapStep === "regions",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 407,
      columnNumber: 9
    }
  }, "Back"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], {
    variant: "outline-primary",
    onClick: handleView,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 414,
      columnNumber: 9
    }
  }, "View"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], {
    variant: "secondary",
    onClick: onHide,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 417,
      columnNumber: 9
    }
  }, "Close")));
}

_s(WarehouseMapModal, "hKbCory+2rBGMMt7lyfZnbxYMs4=");

_c = WarehouseMapModal;

var _c;

$RefreshReg$(_c, "WarehouseMapModal");

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

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/next/dist/compiled/webpack/harmony-module.js */ "./node_modules/next/dist/compiled/webpack/harmony-module.js")(module)))

/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vY29tcG9uZW50cy9XYXJlaG91c2VNYXBNb2RhbC5qcyJdLCJuYW1lcyI6WyJSRUdJT05fT1JERVIiLCJMRVRURVJTIiwiQXJyYXkiLCJmcm9tIiwibGVuZ3RoIiwiXyIsImkiLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJOVU1CRVJTIiwiV2FyZWhvdXNlTWFwTW9kYWwiLCJzaG93Iiwib25IaWRlIiwib25WaWV3Iiwib25TZWxlY3Rpb25DaGFuZ2UiLCJpbml0aWFsU2VsZWN0aW9uIiwidXNlU3RhdGUiLCJyZWdpb25PcHRpb25zIiwic2V0UmVnaW9uT3B0aW9ucyIsInNlY3Rpb25NYXAiLCJzZXRTZWN0aW9uTWFwIiwibWFwU3RlcCIsInNldE1hcFN0ZXAiLCJtYXBSZWdpb24iLCJzZXRNYXBSZWdpb24iLCJtYXBSb3ciLCJzZXRNYXBSb3ciLCJtYXBDb2wiLCJzZXRNYXBDb2wiLCJtYXBQYWxsZXQiLCJzZXRNYXBQYWxsZXQiLCJtYXBCaW4iLCJzZXRNYXBCaW4iLCJtYXBDZWxsUGFsbGV0cyIsInNldE1hcENlbGxQYWxsZXRzIiwibWFwUGFsbGV0QmlucyIsInNldE1hcFBhbGxldEJpbnMiLCJtYXBMb2FkaW5nIiwic2V0TWFwTG9hZGluZyIsIm1hcEVycm9yIiwic2V0TWFwRXJyb3IiLCJkaXJlY3RvcnlMb2FkZWQiLCJzZXREaXJlY3RvcnlMb2FkZWQiLCJub3RpZnlTZWxlY3Rpb25DaGFuZ2UiLCJ1c2VDYWxsYmFjayIsInNlbGVjdGlvbiIsImxvYWREaXJlY3RvcnkiLCJmaXJlYmFzZSIsImZpcmVzdG9yZSIsImNvbGxlY3Rpb24iLCJkb2MiLCJnZXQiLCJkYXRhIiwiUmVnaW9uIiwiU2VjdGlvbiIsImNvbnNvbGUiLCJlcnJvciIsImxvYWRSZWdpb25JbnZlbnRvcnkiLCJyZWdpb25JZCIsIndoZXJlIiwic25hcCIsImNlbGxQYWxsZXRzIiwicGFsbGV0QmlucyIsImZvckVhY2giLCJsb2MiLCJuZXdMb2NhbEN1cnJlbnQiLCJyb3ciLCJzZWN0aW9uIiwibGV0dGVyIiwiY29sIiwibnVtYmVyIiwidHJpbW1lZCIsInRyaW0iLCJzbGljZSIsInVuZGVmaW5lZCIsInBhbGxldCIsImJpbiIsImNlbGxLZXkiLCJTZXQiLCJhZGQiLCJwYWxsZXRLZXkiLCJjZWxsT2JqIiwiT2JqZWN0Iiwia2V5cyIsImtleSIsInNvcnQiLCJhIiwiYiIsIk51bWJlciIsInBhbGxldE9iaiIsImdldFJlZ2lvbkRpbWVuc2lvbnMiLCJlbnRyeSIsImlzQXJyYXkiLCJjb2xzIiwicGFyc2VJbnQiLCJyb3dzIiwiaXNGaW5pdGUiLCJ1c2VFZmZlY3QiLCJyZWdpb24iLCJzZWN0aW9uTGV0dGVyIiwic2VjdGlvbk51bWJlciIsImhhbmRsZVNlbGVjdFJlZ2lvbiIsImhhbmRsZVNlbGVjdENlbGwiLCJyb3dMZXR0ZXIiLCJjb2xOdW1iZXIiLCJjb2xWYWx1ZSIsImhhbmRsZVNlbGVjdFBhbGxldCIsInBhbGxldElkIiwicGFsbGV0VmFsdWUiLCJoYW5kbGVTZWxlY3RCaW4iLCJiaW5JZCIsImJpblZhbHVlIiwiaGFuZGxlQmFjayIsImhhbmRsZVZpZXciLCJzdHlsZXMiLCJtYXBTdGFnZSIsIm1hcEhpbnQiLCJtYXBDYW52YXMiLCJtYXAiLCJyZWdpb25CbG9jayIsImluY2x1ZGVzIiwiZGltcyIsIm1hcEVtcHR5IiwiZ3JpZFdyYXBwZXIiLCJncmlkIiwiaGFzUGFsbGV0cyIsIkJvb2xlYW4iLCJncmlkQ2VsbCIsImdyaWRDZWxsRGlzYWJsZWQiLCJwYWxsZXRHcmlkIiwiYmlucyIsInBhbGxldEJ1dHRvbiIsImJpbkJ1dHRvbiIsIm1hcEZvb3RlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsSUFBTUEsWUFBWSxHQUFHLENBQUMsR0FBRCxFQUFNLEdBQU4sRUFBVyxHQUFYLEVBQWdCLEdBQWhCLEVBQXFCLEdBQXJCLEVBQTBCLEdBQTFCLEVBQStCLEdBQS9CLENB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RSxNQUFDLHNEQUFEO0FBQVEsV0FBTyxFQUFDLFdBQWhCO0FBQTRCLFdBQU8sRUFBRXJHLE1BQXJDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFYRixDQXBLRixDQURGO0FBc0xEOztHQTNadUJGLGlCOztLQUFBQSxpQiIsImZpbGUiOiJzdGF0aWMvd2VicGFjay9wYWdlcy9OZXdTZWFyY2gvbWFpblNlYXJjaC5iYmEwMDQyYTgwMDk2MWRmYTIyMy5ob3QtdXBkYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBNb2RhbCwgQnV0dG9uLCBTcGlubmVyIH0gZnJvbSBcInJlYWN0LWJvb3RzdHJhcFwiO1xuaW1wb3J0IGZpcmViYXNlIGZyb20gXCIuLi9jb250ZXh0L0ZpcmViYXNlXCI7XG5pbXBvcnQgc3R5bGVzIGZyb20gXCIuL1dhcmVob3VzZU1hcE1vZGFsLm1vZHVsZS5jc3NcIjtcblxuY29uc3QgUkVHSU9OX09SREVSID0gW1wiRVwiLCBcIkZcIiwgXCJHXCIsIFwiQVwiLCBcIkRcIiwgXCJDXCIsIFwiQlwiXTtcbmNvbnN0IExFVFRFUlMgPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiAyNiB9LCAoXywgaSkgPT5cbiAgU3RyaW5nLmZyb21DaGFyQ29kZSg2NSArIGkpXG4pO1xuY29uc3QgTlVNQkVSUyA9IEFycmF5LmZyb20oeyBsZW5ndGg6IDUwIH0sIChfLCBpKSA9PiBpICsgMSk7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFdhcmVob3VzZU1hcE1vZGFsKHtcbiAgc2hvdyA9IGZhbHNlLFxuICBvbkhpZGUgPSAoKSA9PiB7fSxcbiAgb25WaWV3LFxuICBvblNlbGVjdGlvbkNoYW5nZSxcbiAgaW5pdGlhbFNlbGVjdGlvbiA9IHt9LFxufSkge1xuICBjb25zdCBbcmVnaW9uT3B0aW9ucywgc2V0UmVnaW9uT3B0aW9uc10gPSB1c2VTdGF0ZShbXSk7XG4gIGNvbnN0IFtzZWN0aW9uTWFwLCBzZXRTZWN0aW9uTWFwXSA9IHVzZVN0YXRlKHt9KTtcbiAgY29uc3QgW21hcFN0ZXAsIHNldE1hcFN0ZXBdID0gdXNlU3RhdGUoXCJyZWdpb25zXCIpO1xuICBjb25zdCBbbWFwUmVnaW9uLCBzZXRNYXBSZWdpb25dID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFttYXBSb3csIHNldE1hcFJvd10gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW21hcENvbCwgc2V0TWFwQ29sXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbbWFwUGFsbGV0LCBzZXRNYXBQYWxsZXRdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFttYXBCaW4sIHNldE1hcEJpbl0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW21hcENlbGxQYWxsZXRzLCBzZXRNYXBDZWxsUGFsbGV0c10gPSB1c2VTdGF0ZSh7fSk7XG4gIGNvbnN0IFttYXBQYWxsZXRCaW5zLCBzZXRNYXBQYWxsZXRCaW5zXSA9IHVzZVN0YXRlKHt9KTtcbiAgY29uc3QgW21hcExvYWRpbmcsIHNldE1hcExvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbbWFwRXJyb3IsIHNldE1hcEVycm9yXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbZGlyZWN0b3J5TG9hZGVkLCBzZXREaXJlY3RvcnlMb2FkZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIGNvbnN0IG5vdGlmeVNlbGVjdGlvbkNoYW5nZSA9IHVzZUNhbGxiYWNrKFxuICAgIChzZWxlY3Rpb24pID0+IHtcbiAgICAgIGlmICh0eXBlb2Ygb25TZWxlY3Rpb25DaGFuZ2UgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBvblNlbGVjdGlvbkNoYW5nZShzZWxlY3Rpb24pO1xuICAgICAgfVxuICAgIH0sXG4gICAgW29uU2VsZWN0aW9uQ2hhbmdlXVxuICApO1xuXG4gIGNvbnN0IGxvYWREaXJlY3RvcnkgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XG4gICAgaWYgKGRpcmVjdG9yeUxvYWRlZCkgcmV0dXJuO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBkb2MgPSBhd2FpdCBmaXJlYmFzZVxuICAgICAgICAuZmlyZXN0b3JlKClcbiAgICAgICAgLmNvbGxlY3Rpb24oXCJXYXJlaG91c2VcIilcbiAgICAgICAgLmRvYyhcImRpcmVjdG9yeVwiKVxuICAgICAgICAuZ2V0KCk7XG4gICAgICBjb25zdCBkYXRhID0gZG9jLmRhdGEoKSB8fCB7fTtcbiAgICAgIHNldFJlZ2lvbk9wdGlvbnMoZGF0YS5SZWdpb24gfHwgW10pO1xuICAgICAgc2V0U2VjdGlvbk1hcChkYXRhLlNlY3Rpb24gfHwge30pO1xuICAgICAgc2V0RGlyZWN0b3J5TG9hZGVkKHRydWUpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGxvYWQgbWFwIGRpcmVjdG9yeVwiLCBlcnJvcik7XG4gICAgICBzZXRNYXBFcnJvcihcIkZhaWxlZCB0byBsb2FkIHdhcmVob3VzZSBkaXJlY3RvcnkuXCIpO1xuICAgIH1cbiAgfSwgW2RpcmVjdG9yeUxvYWRlZF0pO1xuXG4gIGNvbnN0IGxvYWRSZWdpb25JbnZlbnRvcnkgPSB1c2VDYWxsYmFjayhhc3luYyAocmVnaW9uSWQpID0+IHtcbiAgICBpZiAoIXJlZ2lvbklkKSByZXR1cm47XG4gICAgc2V0TWFwTG9hZGluZyh0cnVlKTtcbiAgICBzZXRNYXBFcnJvcihcIlwiKTtcbiAgICB0cnkge1xuICAgICAgY29uc3Qgc25hcCA9IGF3YWl0IGZpcmViYXNlXG4gICAgICAgIC5maXJlc3RvcmUoKVxuICAgICAgICAuY29sbGVjdGlvbihcIlRlc3RcIilcbiAgICAgICAgLndoZXJlKFwibmV3TG9jYWxDdXJyZW50LnJlZ2lvblwiLCBcIj09XCIsIHJlZ2lvbklkKVxuICAgICAgICAuZ2V0KCk7XG5cbiAgICAgIGNvbnN0IGNlbGxQYWxsZXRzID0ge307XG4gICAgICBjb25zdCBwYWxsZXRCaW5zID0ge307XG4gICAgICBzbmFwLmZvckVhY2goKGRvYykgPT4ge1xuICAgICAgICBjb25zdCBsb2MgPSBkb2MuZGF0YSgpPy5uZXdMb2NhbEN1cnJlbnQgfHwge307XG4gICAgICAgIGxldCByb3cgPSBsb2Muc2VjdGlvbj8ubGV0dGVyO1xuICAgICAgICBsZXQgY29sID0gbG9jLnNlY3Rpb24/Lm51bWJlcjtcbiAgICAgICAgaWYgKCghcm93IHx8ICFjb2wpICYmIHR5cGVvZiBsb2Muc2VjdGlvbiA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgIGNvbnN0IHRyaW1tZWQgPSBsb2Muc2VjdGlvbi50cmltKCk7XG4gICAgICAgICAgcm93ID0gdHJpbW1lZC5zbGljZSgwLCAxKTtcbiAgICAgICAgICBjb2wgPSB0cmltbWVkLnNsaWNlKDEpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb2wgIT09IHVuZGVmaW5lZCAmJiBjb2wgIT09IG51bGwpIHtcbiAgICAgICAgICBjb2wgPSBTdHJpbmcoY29sKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwYWxsZXQgPSBsb2MucGFsbGV0O1xuICAgICAgICBjb25zdCBiaW4gPSBsb2MuYmluO1xuICAgICAgICBpZiAoIXJvdyB8fCAhY29sKSByZXR1cm47XG4gICAgICAgIGNvbnN0IGNlbGxLZXkgPSBgJHtyb3d9LSR7Y29sfWA7XG4gICAgICAgIGlmIChwYWxsZXQgIT09IHVuZGVmaW5lZCAmJiBwYWxsZXQgIT09IG51bGwgJiYgYCR7cGFsbGV0fWAgIT09IFwiXCIpIHtcbiAgICAgICAgICBpZiAoIWNlbGxQYWxsZXRzW2NlbGxLZXldKSBjZWxsUGFsbGV0c1tjZWxsS2V5XSA9IG5ldyBTZXQoKTtcbiAgICAgICAgICBjZWxsUGFsbGV0c1tjZWxsS2V5XS5hZGQoU3RyaW5nKHBhbGxldCkpO1xuICAgICAgICAgIGlmIChiaW4gIT09IHVuZGVmaW5lZCAmJiBiaW4gIT09IG51bGwgJiYgYCR7YmlufWAgIT09IFwiXCIpIHtcbiAgICAgICAgICAgIGNvbnN0IHBhbGxldEtleSA9IGAke2NlbGxLZXl9LVAke3BhbGxldH1gO1xuICAgICAgICAgICAgaWYgKCFwYWxsZXRCaW5zW3BhbGxldEtleV0pIHBhbGxldEJpbnNbcGFsbGV0S2V5XSA9IG5ldyBTZXQoKTtcbiAgICAgICAgICAgIHBhbGxldEJpbnNbcGFsbGV0S2V5XS5hZGQoU3RyaW5nKGJpbikpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IGNlbGxPYmogPSB7fTtcbiAgICAgIE9iamVjdC5rZXlzKGNlbGxQYWxsZXRzKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgY2VsbE9ialtrZXldID0gQXJyYXkuZnJvbShjZWxsUGFsbGV0c1trZXldKS5zb3J0KFxuICAgICAgICAgIChhLCBiKSA9PiBOdW1iZXIoYSkgLSBOdW1iZXIoYilcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBwYWxsZXRPYmogPSB7fTtcbiAgICAgIE9iamVjdC5rZXlzKHBhbGxldEJpbnMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICBwYWxsZXRPYmpba2V5XSA9IEFycmF5LmZyb20ocGFsbGV0Qmluc1trZXldKS5zb3J0KFxuICAgICAgICAgIChhLCBiKSA9PiBOdW1iZXIoYSkgLSBOdW1iZXIoYilcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuXG4gICAgICBzZXRNYXBDZWxsUGFsbGV0cyhjZWxsT2JqKTtcbiAgICAgIHNldE1hcFBhbGxldEJpbnMocGFsbGV0T2JqKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byBsb2FkIG1hcCBpbnZlbnRvcnlcIiwgZXJyb3IpO1xuICAgICAgc2V0TWFwRXJyb3IoXCJGYWlsZWQgdG8gbG9hZCBtYXAgaW52ZW50b3J5LlwiKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0TWFwTG9hZGluZyhmYWxzZSk7XG4gICAgfVxuICB9LCBbXSk7XG5cbiAgY29uc3QgZ2V0UmVnaW9uRGltZW5zaW9ucyA9IHVzZUNhbGxiYWNrKFxuICAgIChyZWdpb25JZCkgPT4ge1xuICAgICAgY29uc3QgZW50cnkgPSBzZWN0aW9uTWFwPy5bcmVnaW9uSWRdO1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZW50cnkpICYmIGVudHJ5Lmxlbmd0aCA+PSAyKSB7XG4gICAgICAgIGNvbnN0IGNvbHMgPSBwYXJzZUludChlbnRyeVswXSwgMTApO1xuICAgICAgICBjb25zdCByb3dzID0gcGFyc2VJbnQoZW50cnlbMV0sIDEwKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBjb2xzOiBOdW1iZXIuaXNGaW5pdGUoY29scykgPyBjb2xzIDogMCxcbiAgICAgICAgICByb3dzOiBOdW1iZXIuaXNGaW5pdGUocm93cykgPyByb3dzIDogMCxcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB7IGNvbHM6IDAsIHJvd3M6IDAgfTtcbiAgICB9LFxuICAgIFtzZWN0aW9uTWFwXVxuICApO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFzaG93KSByZXR1cm47XG4gICAgbG9hZERpcmVjdG9yeSgpO1xuICAgIHNldE1hcEVycm9yKFwiXCIpO1xuICAgIGNvbnN0IHtcbiAgICAgIHJlZ2lvbixcbiAgICAgIHNlY3Rpb25MZXR0ZXIsXG4gICAgICBzZWN0aW9uTnVtYmVyLFxuICAgICAgcGFsbGV0LFxuICAgICAgYmluLFxuICAgIH0gPSBpbml0aWFsU2VsZWN0aW9uIHx8IHt9O1xuXG4gICAgc2V0TWFwUmVnaW9uKHJlZ2lvbiB8fCBcIlwiKTtcbiAgICBzZXRNYXBSb3coc2VjdGlvbkxldHRlciB8fCBcIlwiKTtcbiAgICBzZXRNYXBDb2woc2VjdGlvbk51bWJlciA/IFN0cmluZyhzZWN0aW9uTnVtYmVyKSA6IFwiXCIpO1xuICAgIHNldE1hcFBhbGxldChwYWxsZXQgPyBTdHJpbmcocGFsbGV0KSA6IFwiXCIpO1xuICAgIHNldE1hcEJpbihiaW4gPyBTdHJpbmcoYmluKSA6IFwiXCIpO1xuICAgIHNldE1hcFN0ZXAocmVnaW9uID8gXCJncmlkXCIgOiBcInJlZ2lvbnNcIik7XG4gICAgaWYgKHJlZ2lvbikgbG9hZFJlZ2lvbkludmVudG9yeShyZWdpb24pO1xuICB9LCBbc2hvdywgaW5pdGlhbFNlbGVjdGlvbiwgbG9hZERpcmVjdG9yeSwgbG9hZFJlZ2lvbkludmVudG9yeV0pO1xuXG4gIGNvbnN0IGhhbmRsZVNlbGVjdFJlZ2lvbiA9IChyZWdpb25JZCkgPT4ge1xuICAgIGNvbnN0IHNlbGVjdGlvbiA9IHtcbiAgICAgIHJlZ2lvbjogcmVnaW9uSWQsXG4gICAgICBzZWN0aW9uTGV0dGVyOiBcIlwiLFxuICAgICAgc2VjdGlvbk51bWJlcjogXCJcIixcbiAgICAgIHBhbGxldDogXCJcIixcbiAgICAgIGJpbjogXCJcIixcbiAgICB9O1xuICAgIHNldE1hcFJlZ2lvbihyZWdpb25JZCk7XG4gICAgc2V0TWFwUm93KFwiXCIpO1xuICAgIHNldE1hcENvbChcIlwiKTtcbiAgICBzZXRNYXBQYWxsZXQoXCJcIik7XG4gICAgc2V0TWFwQmluKFwiXCIpO1xuICAgIHNldE1hcFN0ZXAoXCJncmlkXCIpO1xuICAgIG5vdGlmeVNlbGVjdGlvbkNoYW5nZShzZWxlY3Rpb24pO1xuICAgIGxvYWRSZWdpb25JbnZlbnRvcnkocmVnaW9uSWQpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVNlbGVjdENlbGwgPSAocm93TGV0dGVyLCBjb2xOdW1iZXIpID0+IHtcbiAgICBjb25zdCBjb2xWYWx1ZSA9IFN0cmluZyhjb2xOdW1iZXIpO1xuICAgIGNvbnN0IHNlbGVjdGlvbiA9IHtcbiAgICAgIHJlZ2lvbjogbWFwUmVnaW9uLFxuICAgICAgc2VjdGlvbkxldHRlcjogcm93TGV0dGVyLFxuICAgICAgc2VjdGlvbk51bWJlcjogY29sVmFsdWUsXG4gICAgICBwYWxsZXQ6IFwiXCIsXG4gICAgICBiaW46IFwiXCIsXG4gICAgfTtcbiAgICBzZXRNYXBSb3cocm93TGV0dGVyKTtcbiAgICBzZXRNYXBDb2woY29sVmFsdWUpO1xuICAgIHNldE1hcFBhbGxldChcIlwiKTtcbiAgICBzZXRNYXBCaW4oXCJcIik7XG4gICAgc2V0TWFwU3RlcChcInBhbGxldHNcIik7XG4gICAgbm90aWZ5U2VsZWN0aW9uQ2hhbmdlKHNlbGVjdGlvbik7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlU2VsZWN0UGFsbGV0ID0gKHBhbGxldElkKSA9PiB7XG4gICAgY29uc3QgcGFsbGV0VmFsdWUgPSBTdHJpbmcocGFsbGV0SWQpO1xuICAgIGNvbnN0IHNlbGVjdGlvbiA9IHtcbiAgICAgIHJlZ2lvbjogbWFwUmVnaW9uLFxuICAgICAgc2VjdGlvbkxldHRlcjogbWFwUm93LFxuICAgICAgc2VjdGlvbk51bWJlcjogbWFwQ29sLFxuICAgICAgcGFsbGV0OiBwYWxsZXRWYWx1ZSxcbiAgICAgIGJpbjogXCJcIixcbiAgICB9O1xuICAgIHNldE1hcFBhbGxldChwYWxsZXRWYWx1ZSk7XG4gICAgc2V0TWFwQmluKFwiXCIpO1xuICAgIHNldE1hcFN0ZXAoXCJiaW5zXCIpO1xuICAgIG5vdGlmeVNlbGVjdGlvbkNoYW5nZShzZWxlY3Rpb24pO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVNlbGVjdEJpbiA9IChiaW5JZCkgPT4ge1xuICAgIGNvbnN0IGJpblZhbHVlID0gU3RyaW5nKGJpbklkKTtcbiAgICBjb25zdCBzZWxlY3Rpb24gPSB7XG4gICAgICByZWdpb246IG1hcFJlZ2lvbixcbiAgICAgIHNlY3Rpb25MZXR0ZXI6IG1hcFJvdyxcbiAgICAgIHNlY3Rpb25OdW1iZXI6IG1hcENvbCxcbiAgICAgIHBhbGxldDogbWFwUGFsbGV0LFxuICAgICAgYmluOiBiaW5WYWx1ZSxcbiAgICB9O1xuICAgIHNldE1hcEJpbihiaW5WYWx1ZSk7XG4gICAgbm90aWZ5U2VsZWN0aW9uQ2hhbmdlKHNlbGVjdGlvbik7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlQmFjayA9ICgpID0+IHtcbiAgICBpZiAobWFwU3RlcCA9PT0gXCJiaW5zXCIpIHNldE1hcFN0ZXAoXCJwYWxsZXRzXCIpO1xuICAgIGVsc2UgaWYgKG1hcFN0ZXAgPT09IFwicGFsbGV0c1wiKSBzZXRNYXBTdGVwKFwiZ3JpZFwiKTtcbiAgICBlbHNlIGlmIChtYXBTdGVwID09PSBcImdyaWRcIikgc2V0TWFwU3RlcChcInJlZ2lvbnNcIik7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlVmlldyA9ICgpID0+IHtcbiAgICBpZiAodHlwZW9mIG9uVmlldyAhPT0gXCJmdW5jdGlvblwiKSByZXR1cm47XG4gICAgb25WaWV3KHtcbiAgICAgIHJlZ2lvbjogbWFwUmVnaW9uLFxuICAgICAgc2VjdGlvbkxldHRlcjogbWFwUm93LFxuICAgICAgc2VjdGlvbk51bWJlcjogbWFwQ29sLFxuICAgICAgcGFsbGV0OiBtYXBQYWxsZXQsXG4gICAgICBiaW46IG1hcEJpbixcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxNb2RhbCBzaG93PXtzaG93fSBvbkhpZGU9e29uSGlkZX0gY2VudGVyZWQgc2l6ZT1cImxnXCI+XG4gICAgICA8TW9kYWwuSGVhZGVyIGNsb3NlQnV0dG9uPlxuICAgICAgICA8TW9kYWwuVGl0bGU+V2FyZWhvdXNlIE1hcDwvTW9kYWwuVGl0bGU+XG4gICAgICA8L01vZGFsLkhlYWRlcj5cbiAgICAgIDxNb2RhbC5Cb2R5PlxuICAgICAgICB7bWFwTG9hZGluZyAmJiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5tYXBMb2FkaW5nfT5cbiAgICAgICAgICAgIDxTcGlubmVyIGFuaW1hdGlvbj1cImJvcmRlclwiIC8+XG4gICAgICAgICAgICA8c3Bhbj5Mb2FkaW5nIG1hcCBkYXRhLi4uPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuICAgICAgICB7bWFwRXJyb3IgJiYgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5tYXBFcnJvcn0+e21hcEVycm9yfTwvZGl2Pn1cblxuICAgICAgICB7IW1hcExvYWRpbmcgJiYgbWFwU3RlcCA9PT0gXCJyZWdpb25zXCIgJiYgKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubWFwU3RhZ2V9PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5tYXBIaW50fT5TZWxlY3QgYSByZWdpb248L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubWFwQ2FudmFzfT5cbiAgICAgICAgICAgICAge1JFR0lPTl9PUkRFUi5tYXAoKHJlZ2lvbklkKSA9PiAoXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAga2V5PXtyZWdpb25JZH1cbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgJHtzdHlsZXMucmVnaW9uQmxvY2t9ICR7c3R5bGVzW2ByZWdpb24ke3JlZ2lvbklkfWBdfWB9XG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVTZWxlY3RSZWdpb24ocmVnaW9uSWQpfVxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e1xuICAgICAgICAgICAgICAgICAgICBBcnJheS5pc0FycmF5KHJlZ2lvbk9wdGlvbnMpICYmXG4gICAgICAgICAgICAgICAgICAgIHJlZ2lvbk9wdGlvbnMubGVuZ3RoID4gMCAmJlxuICAgICAgICAgICAgICAgICAgICAhcmVnaW9uT3B0aW9ucy5pbmNsdWRlcyhyZWdpb25JZClcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICB7cmVnaW9uSWR9XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9XG5cbiAgICAgICAgeyFtYXBMb2FkaW5nICYmIG1hcFN0ZXAgPT09IFwiZ3JpZFwiICYmIChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLm1hcFN0YWdlfT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubWFwSGludH0+XG4gICAgICAgICAgICAgIFJlZ2lvbiB7bWFwUmVnaW9ufTogY2hvb3NlIGEgcm93IGFuZCBjb2x1bW5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgeygoKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGRpbXMgPSBnZXRSZWdpb25EaW1lbnNpb25zKG1hcFJlZ2lvbik7XG4gICAgICAgICAgICAgIGNvbnN0IHJvd3MgPSBMRVRURVJTLnNsaWNlKDAsIGRpbXMucm93cyB8fCAwKTtcbiAgICAgICAgICAgICAgY29uc3QgY29scyA9IE5VTUJFUlMuc2xpY2UoMCwgZGltcy5jb2xzIHx8IDApO1xuICAgICAgICAgICAgICBpZiAoIXJvd3MubGVuZ3RoIHx8ICFjb2xzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLm1hcEVtcHR5fT5cbiAgICAgICAgICAgICAgICAgICAgTm8gZ3JpZCBkYXRhIGZvciB0aGlzIHJlZ2lvbi5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmdyaWRXcmFwcGVyfT5cbiAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMuZ3JpZH1cbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgXCItLWdyaWQtY29sc1wiOiBjb2xzLmxlbmd0aCB9fVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7cm93cy5tYXAoKHJvdykgPT5cbiAgICAgICAgICAgICAgICAgICAgICBjb2xzLm1hcCgoY29sKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjZWxsS2V5ID0gYCR7cm93fS0ke2NvbH1gO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaGFzUGFsbGV0cyA9IEJvb2xlYW4oXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG1hcENlbGxQYWxsZXRzW2NlbGxLZXldPy5sZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtjZWxsS2V5fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YCR7c3R5bGVzLmdyaWRDZWxsfSAke1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzUGFsbGV0cyA/IFwiXCIgOiBzdHlsZXMuZ3JpZENlbGxEaXNhYmxlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNQYWxsZXRzICYmIGhhbmRsZVNlbGVjdENlbGwocm93LCBjb2wpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXshaGFzUGFsbGV0c31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3Jvd31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtjb2x9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSkoKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cblxuICAgICAgICB7IW1hcExvYWRpbmcgJiYgbWFwU3RlcCA9PT0gXCJwYWxsZXRzXCIgJiYgKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubWFwU3RhZ2V9PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5tYXBIaW50fT5cbiAgICAgICAgICAgICAgUmVnaW9uIHttYXBSZWdpb259IC0gU2VjdGlvbiB7bWFwUm93fVxuICAgICAgICAgICAgICB7bWFwQ29sfTogc2VsZWN0IGEgcGFsbGV0XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMucGFsbGV0R3JpZH0+XG4gICAgICAgICAgICAgIHsobWFwQ2VsbFBhbGxldHNbYCR7bWFwUm93fS0ke21hcENvbH1gXSB8fCBbXSkubWFwKChwYWxsZXQpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBwYWxsZXRLZXkgPSBgJHttYXBSb3d9LSR7bWFwQ29sfS1QJHtwYWxsZXR9YDtcbiAgICAgICAgICAgICAgICBjb25zdCBiaW5zID0gbWFwUGFsbGV0Qmluc1twYWxsZXRLZXldIHx8IFtdO1xuICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGtleT17cGFsbGV0fVxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMucGFsbGV0QnV0dG9ufVxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChiaW5zLmxlbmd0aCA9PT0gMCAmJiB0eXBlb2Ygb25WaWV3ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNlbGVjdGlvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmVnaW9uOiBtYXBSZWdpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNlY3Rpb25MZXR0ZXI6IG1hcFJvdyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2VjdGlvbk51bWJlcjogbWFwQ29sLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBwYWxsZXQ6IFN0cmluZyhwYWxsZXQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBiaW46IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgbm90aWZ5U2VsZWN0aW9uQ2hhbmdlKHNlbGVjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBvblZpZXcoc2VsZWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgaGFuZGxlU2VsZWN0UGFsbGV0KHBhbGxldCk7XG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIFBhbGxldCB7cGFsbGV0fVxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgIHshKG1hcENlbGxQYWxsZXRzW2Ake21hcFJvd30tJHttYXBDb2x9YF0gfHwgW10pLmxlbmd0aCAmJiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5tYXBFbXB0eX0+XG4gICAgICAgICAgICAgICAgICBObyBwYWxsZXRzIGF2YWlsYWJsZSBoZXJlLlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9XG5cbiAgICAgICAgeyFtYXBMb2FkaW5nICYmIG1hcFN0ZXAgPT09IFwiYmluc1wiICYmIChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLm1hcFN0YWdlfT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubWFwSGludH0+XG4gICAgICAgICAgICAgIFJlZ2lvbiB7bWFwUmVnaW9ufSAtIFNlY3Rpb24ge21hcFJvd31cbiAgICAgICAgICAgICAge21hcENvbH0gLSBQYWxsZXQge21hcFBhbGxldH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5wYWxsZXRHcmlkfT5cbiAgICAgICAgICAgICAgeyhtYXBQYWxsZXRCaW5zW2Ake21hcFJvd30tJHttYXBDb2x9LVAke21hcFBhbGxldH1gXSB8fCBbXSkubWFwKFxuICAgICAgICAgICAgICAgIChiaW4pID0+IChcbiAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAga2V5PXtiaW59XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2Ake3N0eWxlcy5wYWxsZXRCdXR0b259ICR7c3R5bGVzLmJpbkJ1dHRvbn1gfVxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVTZWxlY3RCaW4oYmluKX1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgQmluIHtiaW59XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIHshKG1hcFBhbGxldEJpbnNbYCR7bWFwUm93fS0ke21hcENvbH0tUCR7bWFwUGFsbGV0fWBdIHx8IFtdKVxuICAgICAgICAgICAgICAgIC5sZW5ndGggJiYgKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubWFwRW1wdHl9PlxuICAgICAgICAgICAgICAgICAgTm8gYmlucyBhdmFpbGFibGUgb24gdGhpcyBwYWxsZXQuXG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgIDwvTW9kYWwuQm9keT5cbiAgICAgIDxNb2RhbC5Gb290ZXIgY2xhc3NOYW1lPXtzdHlsZXMubWFwRm9vdGVyfT5cbiAgICAgICAgPEJ1dHRvblxuICAgICAgICAgIHZhcmlhbnQ9XCJvdXRsaW5lLXNlY29uZGFyeVwiXG4gICAgICAgICAgb25DbGljaz17aGFuZGxlQmFja31cbiAgICAgICAgICBkaXNhYmxlZD17bWFwU3RlcCA9PT0gXCJyZWdpb25zXCJ9XG4gICAgICAgID5cbiAgICAgICAgICBCYWNrXG4gICAgICAgIDwvQnV0dG9uPlxuICAgICAgICA8QnV0dG9uIHZhcmlhbnQ9XCJvdXRsaW5lLXByaW1hcnlcIiBvbkNsaWNrPXtoYW5kbGVWaWV3fT5cbiAgICAgICAgICBWaWV3XG4gICAgICAgIDwvQnV0dG9uPlxuICAgICAgICA8QnV0dG9uIHZhcmlhbnQ9XCJzZWNvbmRhcnlcIiBvbkNsaWNrPXtvbkhpZGV9PlxuICAgICAgICAgIENsb3NlXG4gICAgICAgIDwvQnV0dG9uPlxuICAgICAgPC9Nb2RhbC5Gb290ZXI+XG4gICAgPC9Nb2RhbD5cbiAgKTtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=