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

  var show = _ref.show,
      onHide = _ref.onHide,
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
          onView({
            region: mapRegion,
            sectionLetter: mapRow,
            sectionNumber: mapCol,
            pallet: String(pallet),
            bin: ""
          });
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
      lineNumber: 367,
      columnNumber: 17
    }
  }, "No pallets available here."))), !mapLoading && mapStep === "bins" && __jsx("div", {
    className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_5___default.a.mapStage,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 376,
      columnNumber: 11
    }
  }, __jsx("div", {
    className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_5___default.a.mapHint,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 377,
      columnNumber: 13
    }
  }, "Region ", mapRegion, " - Section ", mapRow, mapCol, " - Pallet ", mapPallet), __jsx("div", {
    className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_5___default.a.palletGrid,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 381,
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
        lineNumber: 384,
        columnNumber: 19
      }
    }, "Bin ", bin);
  }), !(mapPalletBins["".concat(mapRow, "-").concat(mapCol, "-P").concat(mapPallet)] || []).length && __jsx("div", {
    className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_5___default.a.mapEmpty,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 396,
      columnNumber: 17
    }
  }, "No bins available on this pallet.")))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Modal"].Footer, {
    className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_5___default.a.mapFooter,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 404,
      columnNumber: 7
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], {
    variant: "outline-secondary",
    onClick: handleBack,
    disabled: mapStep === "regions",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 405,
      columnNumber: 9
    }
  }, "Back"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], {
    variant: "outline-primary",
    onClick: handleView,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 412,
      columnNumber: 9
    }
  }, "View"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], {
    variant: "secondary",
    onClick: onHide,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 415,
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

/***/ }),

/***/ "./components/WarehouseMapModal.module.css":
/*!*************************************************!*\
  !*** ./components/WarehouseMapModal.module.css ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../node_modules/next/dist/build/webpack/loaders/next-style-loader/runtime/injectStylesIntoStyleTag.js */ "./node_modules/next/dist/build/webpack/loaders/next-style-loader/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../node_modules/next/dist/compiled/css-loader/cjs.js??ref--5-oneOf-2-1!../node_modules/next/dist/compiled/postcss-loader/cjs.js??ref--5-oneOf-2-2!./WarehouseMapModal.module.css */ "./node_modules/next/dist/compiled/css-loader/cjs.js?!./node_modules/next/dist/compiled/postcss-loader/cjs.js?!./components/WarehouseMapModal.module.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = function(element){// These elements should always exist. If they do not,
// this code should fail.
var anchorElement=document.querySelector('#__next_css__DO_NOT_USE__');var parentNode=anchorElement.parentNode;// Normally <head>
// Each style tag should be placed right before our
// anchor. By inserting before and not after, we do not
// need to track the last inserted element.
parentNode.insertBefore(element,anchorElement);};
options.singleton = false;

var update = api(content, options);


if (true) {
  if (!content.locals || module.hot.invalidate) {
    var isEqualLocals = function isEqualLocals(a,b,isNamedExport){if(!a&&b||a&&!b){return false;}let p;for(p in a){if(isNamedExport&&p==='default'){// eslint-disable-next-line no-continue
continue;}if(a[p]!==b[p]){return false;}}for(p in b){if(isNamedExport&&p==='default'){// eslint-disable-next-line no-continue
continue;}if(!a[p]){return false;}}return true;};
    var oldLocals = content.locals;

    module.hot.accept(
      /*! !../node_modules/next/dist/compiled/css-loader/cjs.js??ref--5-oneOf-2-1!../node_modules/next/dist/compiled/postcss-loader/cjs.js??ref--5-oneOf-2-2!./WarehouseMapModal.module.css */ "./node_modules/next/dist/compiled/css-loader/cjs.js?!./node_modules/next/dist/compiled/postcss-loader/cjs.js?!./components/WarehouseMapModal.module.css",
      function () {
        content = __webpack_require__(/*! !../node_modules/next/dist/compiled/css-loader/cjs.js??ref--5-oneOf-2-1!../node_modules/next/dist/compiled/postcss-loader/cjs.js??ref--5-oneOf-2-2!./WarehouseMapModal.module.css */ "./node_modules/next/dist/compiled/css-loader/cjs.js?!./node_modules/next/dist/compiled/postcss-loader/cjs.js?!./components/WarehouseMapModal.module.css");

              content = content.__esModule ? content.default : content;

              if (typeof content === 'string') {
                content = [[module.i, content, '']];
              }

              if (!isEqualLocals(oldLocals, content.locals)) {
                module.hot.invalidate();

                return;
              }

              oldLocals = content.locals;

              update(content);
      }
    )
  }

  module.hot.dispose(function() {
    update();
  });
}

module.exports = content.locals || {};

/***/ }),

/***/ "./node_modules/next/dist/compiled/css-loader/cjs.js?!./node_modules/next/dist/compiled/postcss-loader/cjs.js?!./components/WarehouseMapModal.module.css":
/*!*************************************************************************************************************************************************!*\
  !*** (webpack)/css-loader/cjs.js??ref--5-oneOf-2-1!(webpack)/postcss-loader/cjs.js??ref--5-oneOf-2-2!./components/WarehouseMapModal.module.css ***!
  \*************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../node_modules/next/dist/compiled/css-loader/api.js */ "./node_modules/next/dist/compiled/css-loader/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(true);
___CSS_LOADER_EXPORT___.push([module.i, "@import url(https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600&display=swap);"]);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".WarehouseMapModal_mapLoading__Tch_t {\n  display: -moz-box;\n  display: flex;\n  -moz-box-align: center;\n       align-items: center;\n  grid-gap: 12px;\n  gap: 12px;\n  color: #64748b;\n  padding: 12px 0;\n}\n\n.WarehouseMapModal_mapError__1BcWi {\n  color: #b91c1c;\n  font-weight: 600;\n  margin-bottom: 12px;\n}\n\n.WarehouseMapModal_mapStage__1kwg9 {\n  display: -moz-box;\n  display: flex;\n  -moz-box-orient: vertical;\n  -moz-box-direction: normal;\n       flex-direction: column;\n  grid-gap: 14px;\n  gap: 14px;\n  font-family: \"Space Grotesk\", \"Segoe UI\", sans-serif;\n}\n\n.WarehouseMapModal_mapHint__q3uQc {\n  font-weight: 600;\n  color: #0f172a;\n}\n\n.WarehouseMapModal_mapCanvas__sXfv7 {\n  position: relative;\n  background: #86c82e;\n  border-radius: 18px;\n  padding: 14px;\n  display: grid;\n  grid-template-columns: repeat(7, 1fr);\n  grid-template-rows: repeat(6, 1fr);\n  grid-gap: 10px;\n  gap: 10px;\n  min-height: 240px;\n  -webkit-box-shadow: inset 0 0 0 1px rgba(15, 23, 42, 0.08);\n          box-shadow: inset 0 0 0 1px rgba(15, 23, 42, 0.08);\n}\n\n.WarehouseMapModal_regionBlock__1XUlM {\n  border: none;\n  border-radius: 14px;\n  background: #c62828;\n  color: #ffffff;\n  font-size: 1.4rem;\n  font-weight: 700;\n  display: -moz-box;\n  display: flex;\n  -moz-box-align: center;\n       align-items: center;\n  -moz-box-pack: center;\n       justify-content: center;\n  -webkit-transition: -webkit-transform 0.15s ease, -webkit-box-shadow 0.15s ease;\n  transition: -webkit-transform 0.15s ease, -webkit-box-shadow 0.15s ease;\n  -moz-transition: transform 0.15s ease, box-shadow 0.15s ease, -moz-transform 0.15s ease;\n  transition: transform 0.15s ease, box-shadow 0.15s ease;\n  transition: transform 0.15s ease, box-shadow 0.15s ease, -webkit-transform 0.15s ease, -moz-transform 0.15s ease, -webkit-box-shadow 0.15s ease;\n  -webkit-box-shadow: 0 10px 20px rgba(15, 23, 42, 0.15);\n          box-shadow: 0 10px 20px rgba(15, 23, 42, 0.15);\n}\n\n.WarehouseMapModal_regionBlock__1XUlM:disabled {\n  opacity: 0.45;\n  cursor: not-allowed;\n}\n\n.WarehouseMapModal_regionBlock__1XUlM:not(:disabled):hover {\n  -webkit-transform: translateY(-1px);\n     -moz-transform: translateY(-1px);\n          transform: translateY(-1px);\n}\n\n.WarehouseMapModal_regionE__1uVAv { grid-column: 1 / 2; grid-row: 1 / 7; }\n.WarehouseMapModal_regionF__2Ghcs { grid-column: 2 / 3; grid-row: 1 / 7; }\n.WarehouseMapModal_regionG__2IToq { grid-column: 3 / 4; grid-row: 1 / 7; }\n.WarehouseMapModal_regionA__3Pn0Z { grid-column: 4 / 7; grid-row: 4 / 7; }\n.WarehouseMapModal_regionD__IcyCo { grid-column: 4 / 7; grid-row: 3 / 4; }\n.WarehouseMapModal_regionC__3lNq2 { grid-column: 4 / 7; grid-row: 1 / 3; }\n.WarehouseMapModal_regionB__3Byw_ { grid-column: 7 / 8; grid-row: 3 / 7; }\n\n.WarehouseMapModal_gridWrapper__1t3wN {\n  display: -moz-box;\n  display: flex;\n  -moz-box-orient: vertical;\n  -moz-box-direction: normal;\n       flex-direction: column;\n  grid-gap: 12px;\n  gap: 12px;\n  overflow-x: auto;\n}\n\n.WarehouseMapModal_grid__1BC9x {\n  display: grid;\n  grid-template-columns: repeat(var(--grid-cols, 10), minmax(44px, 1fr));\n  grid-gap: 8px;\n  gap: 8px;\n  min-width: -webkit-min-content;\n  min-width: -moz-min-content;\n  min-width: min-content;\n}\n\n.WarehouseMapModal_gridCell__1DS2V {\n  border: 1px solid #e2e8f0;\n  background: #ffffff;\n  border-radius: 10px;\n  padding: 10px 6px;\n  font-weight: 600;\n  color: #0f172a;\n  text-align: center;\n  -webkit-box-shadow: 0 6px 16px rgba(15, 23, 42, 0.08);\n          box-shadow: 0 6px 16px rgba(15, 23, 42, 0.08);\n}\n\n.WarehouseMapModal_gridCellDisabled__1n54C {\n  opacity: 0.4;\n  cursor: not-allowed;\n}\n\n.WarehouseMapModal_palletGrid__28eML {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));\n  grid-gap: 10px;\n  gap: 10px;\n}\n\n.WarehouseMapModal_palletButton__NuMn0 {\n  border: 1px solid #e2e8f0;\n  border-radius: 12px;\n  background: #ffffff;\n  padding: 10px 12px;\n  font-weight: 600;\n  color: #0f172a;\n  -webkit-box-shadow: 0 8px 18px rgba(15, 23, 42, 0.08);\n          box-shadow: 0 8px 18px rgba(15, 23, 42, 0.08);\n}\n\n.WarehouseMapModal_binButton__28ynB {\n  background: #0f172a;\n  color: #ffffff;\n}\n\n.WarehouseMapModal_mapEmpty__2hiUi {\n  color: #94a3b8;\n  font-weight: 600;\n}\n\n.WarehouseMapModal_mapFooter__1o0Ri {\n  -moz-box-pack: justify;\n       justify-content: space-between;\n  grid-gap: 12px;\n  gap: 12px;\n}\n\n@media (max-width: 600px) {\n  .WarehouseMapModal_mapCanvas__sXfv7 {\n    min-height: 200px;\n  }\n\n  .WarehouseMapModal_regionBlock__1XUlM {\n    font-size: 1.1rem;\n  }\n\n  .WarehouseMapModal_mapFooter__1o0Ri .btn {\n    -moz-box-flex: 1;\n         flex: 1 1;\n  }\n}\n", "",{"version":3,"sources":["webpack://components/WarehouseMapModal.module.css"],"names":[],"mappings":"AAEA;EACE,iBAAa;EAAb,aAAa;EACb,sBAAmB;OAAnB,mBAAmB;EACnB,cAAS;EAAT,SAAS;EACT,cAAc;EACd,eAAe;AACjB;;AAEA;EACE,cAAc;EACd,gBAAgB;EAChB,mBAAmB;AACrB;;AAEA;EACE,iBAAa;EAAb,aAAa;EACb,yBAAsB;EAAtB,0BAAsB;OAAtB,sBAAsB;EACtB,cAAS;EAAT,SAAS;EACT,oDAAoD;AACtD;;AAEA;EACE,gBAAgB;EAChB,cAAc;AAChB;;AAEA;EACE,kBAAkB;EAClB,mBAAmB;EACnB,mBAAmB;EACnB,aAAa;EACb,aAAa;EACb,qCAAqC;EACrC,kCAAkC;EAClC,cAAS;EAAT,SAAS;EACT,iBAAiB;EACjB,0DAAkD;UAAlD,kDAAkD;AACpD;;AAEA;EACE,YAAY;EACZ,mBAAmB;EACnB,mBAAmB;EACnB,cAAc;EACd,iBAAiB;EACjB,gBAAgB;EAChB,iBAAa;EAAb,aAAa;EACb,sBAAmB;OAAnB,mBAAmB;EACnB,qBAAuB;OAAvB,uBAAuB;EACvB,+EAAuD;EAAvD,uEAAuD;EAAvD,uFAAuD;EAAvD,uDAAuD;EAAvD,+IAAuD;EACvD,sDAA8C;UAA9C,8CAA8C;AAChD;;AAEA;EACE,aAAa;EACb,mBAAmB;AACrB;;AAEA;EACE,mCAA2B;KAA3B,gCAA2B;UAA3B,2BAA2B;AAC7B;;AAEA,oCAAW,kBAAkB,EAAE,eAAe,EAAE;AAChD,oCAAW,kBAAkB,EAAE,eAAe,EAAE;AAChD,oCAAW,kBAAkB,EAAE,eAAe,EAAE;AAChD,oCAAW,kBAAkB,EAAE,eAAe,EAAE;AAChD,oCAAW,kBAAkB,EAAE,eAAe,EAAE;AAChD,oCAAW,kBAAkB,EAAE,eAAe,EAAE;AAChD,oCAAW,kBAAkB,EAAE,eAAe,EAAE;;AAEhD;EACE,iBAAa;EAAb,aAAa;EACb,yBAAsB;EAAtB,0BAAsB;OAAtB,sBAAsB;EACtB,cAAS;EAAT,SAAS;EACT,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,sEAAsE;EACtE,aAAQ;EAAR,QAAQ;EACR,8BAAsB;EAAtB,2BAAsB;EAAtB,sBAAsB;AACxB;;AAEA;EACE,yBAAyB;EACzB,mBAAmB;EACnB,mBAAmB;EACnB,iBAAiB;EACjB,gBAAgB;EAChB,cAAc;EACd,kBAAkB;EAClB,qDAA6C;UAA7C,6CAA6C;AAC/C;;AAEA;EACE,YAAY;EACZ,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,2DAA2D;EAC3D,cAAS;EAAT,SAAS;AACX;;AAEA;EACE,yBAAyB;EACzB,mBAAmB;EACnB,mBAAmB;EACnB,kBAAkB;EAClB,gBAAgB;EAChB,cAAc;EACd,qDAA6C;UAA7C,6CAA6C;AAC/C;;AAEA;EACE,mBAAmB;EACnB,cAAc;AAChB;;AAEA;EACE,cAAc;EACd,gBAAgB;AAClB;;AAEA;EACE,sBAA8B;OAA9B,8BAA8B;EAC9B,cAAS;EAAT,SAAS;AACX;;AAEA;EACE;IACE,iBAAiB;EACnB;;EAEA;IACE,iBAAiB;EACnB;;EAEA;IACE,gBAAO;SAAP,SAAO;EACT;AACF","sourcesContent":["@import url(\"https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600&display=swap\");\n\n.mapLoading {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  color: #64748b;\n  padding: 12px 0;\n}\n\n.mapError {\n  color: #b91c1c;\n  font-weight: 600;\n  margin-bottom: 12px;\n}\n\n.mapStage {\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n  font-family: \"Space Grotesk\", \"Segoe UI\", sans-serif;\n}\n\n.mapHint {\n  font-weight: 600;\n  color: #0f172a;\n}\n\n.mapCanvas {\n  position: relative;\n  background: #86c82e;\n  border-radius: 18px;\n  padding: 14px;\n  display: grid;\n  grid-template-columns: repeat(7, 1fr);\n  grid-template-rows: repeat(6, 1fr);\n  gap: 10px;\n  min-height: 240px;\n  box-shadow: inset 0 0 0 1px rgba(15, 23, 42, 0.08);\n}\n\n.regionBlock {\n  border: none;\n  border-radius: 14px;\n  background: #c62828;\n  color: #ffffff;\n  font-size: 1.4rem;\n  font-weight: 700;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: transform 0.15s ease, box-shadow 0.15s ease;\n  box-shadow: 0 10px 20px rgba(15, 23, 42, 0.15);\n}\n\n.regionBlock:disabled {\n  opacity: 0.45;\n  cursor: not-allowed;\n}\n\n.regionBlock:not(:disabled):hover {\n  transform: translateY(-1px);\n}\n\n.regionE { grid-column: 1 / 2; grid-row: 1 / 7; }\n.regionF { grid-column: 2 / 3; grid-row: 1 / 7; }\n.regionG { grid-column: 3 / 4; grid-row: 1 / 7; }\n.regionA { grid-column: 4 / 7; grid-row: 4 / 7; }\n.regionD { grid-column: 4 / 7; grid-row: 3 / 4; }\n.regionC { grid-column: 4 / 7; grid-row: 1 / 3; }\n.regionB { grid-column: 7 / 8; grid-row: 3 / 7; }\n\n.gridWrapper {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  overflow-x: auto;\n}\n\n.grid {\n  display: grid;\n  grid-template-columns: repeat(var(--grid-cols, 10), minmax(44px, 1fr));\n  gap: 8px;\n  min-width: min-content;\n}\n\n.gridCell {\n  border: 1px solid #e2e8f0;\n  background: #ffffff;\n  border-radius: 10px;\n  padding: 10px 6px;\n  font-weight: 600;\n  color: #0f172a;\n  text-align: center;\n  box-shadow: 0 6px 16px rgba(15, 23, 42, 0.08);\n}\n\n.gridCellDisabled {\n  opacity: 0.4;\n  cursor: not-allowed;\n}\n\n.palletGrid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));\n  gap: 10px;\n}\n\n.palletButton {\n  border: 1px solid #e2e8f0;\n  border-radius: 12px;\n  background: #ffffff;\n  padding: 10px 12px;\n  font-weight: 600;\n  color: #0f172a;\n  box-shadow: 0 8px 18px rgba(15, 23, 42, 0.08);\n}\n\n.binButton {\n  background: #0f172a;\n  color: #ffffff;\n}\n\n.mapEmpty {\n  color: #94a3b8;\n  font-weight: 600;\n}\n\n.mapFooter {\n  justify-content: space-between;\n  gap: 12px;\n}\n\n@media (max-width: 600px) {\n  .mapCanvas {\n    min-height: 200px;\n  }\n\n  .regionBlock {\n    font-size: 1.1rem;\n  }\n\n  .mapFooter :global(.btn) {\n    flex: 1;\n  }\n}\n"],"sourceRoot":""}]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"mapLoading": "WarehouseMapModal_mapLoading__Tch_t",
	"mapError": "WarehouseMapModal_mapError__1BcWi",
	"mapStage": "WarehouseMapModal_mapStage__1kwg9",
	"mapHint": "WarehouseMapModal_mapHint__q3uQc",
	"mapCanvas": "WarehouseMapModal_mapCanvas__sXfv7",
	"regionBlock": "WarehouseMapModal_regionBlock__1XUlM",
	"regionE": "WarehouseMapModal_regionE__1uVAv",
	"regionF": "WarehouseMapModal_regionF__2Ghcs",
	"regionG": "WarehouseMapModal_regionG__2IToq",
	"regionA": "WarehouseMapModal_regionA__3Pn0Z",
	"regionD": "WarehouseMapModal_regionD__IcyCo",
	"regionC": "WarehouseMapModal_regionC__3lNq2",
	"regionB": "WarehouseMapModal_regionB__3Byw_",
	"gridWrapper": "WarehouseMapModal_gridWrapper__1t3wN",
	"grid": "WarehouseMapModal_grid__1BC9x",
	"gridCell": "WarehouseMapModal_gridCell__1DS2V",
	"gridCellDisabled": "WarehouseMapModal_gridCellDisabled__1n54C",
	"palletGrid": "WarehouseMapModal_palletGrid__28eML",
	"palletButton": "WarehouseMapModal_palletButton__NuMn0",
	"binButton": "WarehouseMapModal_binButton__28ynB",
	"mapEmpty": "WarehouseMapModal_mapEmpty__2hiUi",
	"mapFooter": "WarehouseMapModal_mapFooter__1o0Ri"
};
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./pages/NewSearch/mainSearch.js":
/*!***************************************!*\
  !*** ./pages/NewSearch/mainSearch.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MainSearch; });
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty */ "./node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/next/node_modules/@babel/runtime/helpers/esm/toConsumableArray */ "./node_modules/next/node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/next/node_modules/@babel/runtime/regenerator */ "./node_modules/next/node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator */ "./node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray */ "./node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! next/router */ "./node_modules/next/router.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _utils_fetchAssociations__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../utils/fetchAssociations */ "./utils/fetchAssociations.js");
/* harmony import */ var _context_AuthUserContext__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../context/AuthUserContext */ "./context/AuthUserContext.js");
/* harmony import */ var _LoggedIn__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../LoggedIn */ "./pages/LoggedIn.js");
/* harmony import */ var _utils_ClientTable__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../utils/ClientTable */ "./utils/ClientTable.js");
/* harmony import */ var _utils_ModelTable__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../utils/ModelTable */ "./utils/ModelTable.js");
/* harmony import */ var _utils_PartTable__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../utils/PartTable */ "./utils/PartTable.js");
/* harmony import */ var _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../styles/MainSearch.module.css */ "./styles/MainSearch.module.css");
/* harmony import */ var _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _context_Firebase__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../context/Firebase */ "./context/Firebase.js");
/* harmony import */ var _utils_itemFormShared__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../utils/itemFormShared */ "./utils/itemFormShared.js");
/* harmony import */ var _components_WarehouseMapModal__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../components/WarehouseMapModal */ "./components/WarehouseMapModal.js");






var _jsxFileName = "C:\\Users\\mack2\\Desktop\\code\\pages\\NewSearch\\mainSearch.js",
    _s = $RefreshSig$(),
    _s2 = $RefreshSig$();

var __jsx = react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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
  _s();

  var type = _ref.type,
      name = _ref.name,
      route = _ref.route,
      className = _ref.className;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(false),
      isLoading = _useState[0],
      setLoading = _useState[1];

  Object(react__WEBPACK_IMPORTED_MODULE_5__["useEffect"])(function () {
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
  return __jsx(next_link__WEBPACK_IMPORTED_MODULE_7___default.a, {
    href: "/".concat(route),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 59,
      columnNumber: 5
    }
  }, __jsx("a", {
    className: "btn btn-".concat(type, " ").concat(className || ""),
    disabled: isLoading,
    onClick: function onClick() {
      return !isLoading && setLoading(true);
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 60,
      columnNumber: 7
    }
  }, isLoading ? "Loading…" : name));
} // ---- DATE HELPERS (top-level scope) ----
// Convert anything date-ish into a timestamp (ms since epoch).


_s(LoadingButton, "LHJkidtbt8bk0SOCXf2Y2viet6g=");

_c = LoadingButton;

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
      var _parts = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_4__["default"])(parts, 3),
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

function getMachineField(item, key) {
  var _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _item$machineData$key, _item$machineData, _item$machineData2, _item$currentMachineD, _item$currentMachineD2, _item$theMachineData, _item$theMachineData2, _item$TheMachine, _item$TheMachine2;

  if (!item) return null;
  var lower = key.toLowerCase();
  return (_ref2 = (_ref3 = (_ref4 = (_ref5 = (_ref6 = (_ref7 = (_ref8 = (_item$machineData$key = item === null || item === void 0 ? void 0 : (_item$machineData = item.machineData) === null || _item$machineData === void 0 ? void 0 : _item$machineData[key]) !== null && _item$machineData$key !== void 0 ? _item$machineData$key : item === null || item === void 0 ? void 0 : (_item$machineData2 = item.machineData) === null || _item$machineData2 === void 0 ? void 0 : _item$machineData2[lower]) !== null && _ref8 !== void 0 ? _ref8 : item === null || item === void 0 ? void 0 : (_item$currentMachineD = item.currentMachineData) === null || _item$currentMachineD === void 0 ? void 0 : _item$currentMachineD[key]) !== null && _ref7 !== void 0 ? _ref7 : item === null || item === void 0 ? void 0 : (_item$currentMachineD2 = item.currentMachineData) === null || _item$currentMachineD2 === void 0 ? void 0 : _item$currentMachineD2[lower]) !== null && _ref6 !== void 0 ? _ref6 : item === null || item === void 0 ? void 0 : (_item$theMachineData = item.theMachineData) === null || _item$theMachineData === void 0 ? void 0 : _item$theMachineData[key]) !== null && _ref5 !== void 0 ? _ref5 : item === null || item === void 0 ? void 0 : (_item$theMachineData2 = item.theMachineData) === null || _item$theMachineData2 === void 0 ? void 0 : _item$theMachineData2[lower]) !== null && _ref4 !== void 0 ? _ref4 : item === null || item === void 0 ? void 0 : (_item$TheMachine = item.TheMachine) === null || _item$TheMachine === void 0 ? void 0 : _item$TheMachine[key]) !== null && _ref3 !== void 0 ? _ref3 : item === null || item === void 0 ? void 0 : (_item$TheMachine2 = item.TheMachine) === null || _item$TheMachine2 === void 0 ? void 0 : _item$TheMachine2[lower]) !== null && _ref2 !== void 0 ? _ref2 : null;
}

function MainSearch() {
  _s2();

  var _this = this;

  var _useAuth = Object(_context_AuthUserContext__WEBPACK_IMPORTED_MODULE_10__["useAuth"])(),
      signOut = _useAuth.signOut;

  var _useState2 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])([]),
      info = _useState2[0],
      setInfo = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])([]),
      backupInfo = _useState3[0],
      setBackupInfo = _useState3[1];

  var _useState4 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])([]),
      augmentedInfo = _useState4[0],
      setAugmentedInfo = _useState4[1]; // items with clientFromId/currentId added


  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(true),
      isLoading = _useState5[0],
      setIsLoading = _useState5[1];

  var _useState6 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])([]),
      ids = _useState6[0],
      setID = _useState6[1];

  var _useState7 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(false),
      show = _useState7[0],
      setShow = _useState7[1];

  var _useState8 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(false),
      showFilters = _useState8[0],
      setShowFilters = _useState8[1];

  var _useState9 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(DEFAULT_PAGE_SIZE),
      pageSize = _useState9[0],
      setPageSize = _useState9[1];

  var _useState10 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(false),
      isNavigating = _useState10[0],
      setIsNavigating = _useState10[1];

  var _useState11 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(),
      dItem = _useState11[0],
      setDItem = _useState11[1];

  var _useState12 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])("Name"),
      select = _useState12[0],
      setSelect = _useState12[1];

  var _useState13 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(false),
      showList = _useState13[0],
      setShowList = _useState13[1];

  var _useState14 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])("text"),
      showListSearch = _useState14[0],
      setShowListSearch = _useState14[1];

  var _useState15 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(""),
      search = _useState15[0],
      setSearch = _useState15[1];

  var _useState16 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(null),
      selectedOEM = _useState16[0],
      setSelectedOEM = _useState16[1];

  var _useState17 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(null),
      selectedModality = _useState17[0],
      setSelectedModality = _useState17[1]; // Replace the old single client state with two sets:


  var _useState18 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(null),
      selectedClientFrom = _useState18[0],
      setSelectedClientFrom = _useState18[1];

  var _useState19 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])("Select Option"),
      clientFromButtonText = _useState19[0],
      setClientFromButtonText = _useState19[1];

  var _useState20 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(null),
      selectedClientCurrent = _useState20[0],
      setSelectedClientCurrent = _useState20[1];

  var _useState21 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])("Select Option"),
      clientCurrentButtonText = _useState21[0],
      setClientCurrentButtonText = _useState21[1];

  var _useState22 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])([]),
      clients = _useState22[0],
      setClients = _useState22[1];

  var _useState23 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(false),
      showClientModal = _useState23[0],
      setShowClientModal = _useState23[1]; // This state tells the modal which client box is being updated: "from" or "current"


  var _useState24 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(null),
      clientSelectionType = _useState24[0],
      setClientSelectionType = _useState24[1];

  var _useState25 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(false),
      showMap = _useState25[0],
      setShowMap = _useState25[1];

  var router = Object(next_router__WEBPACK_IMPORTED_MODULE_8__["useRouter"])();
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

  var _useState26 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(labelBase),
      labels = _useState26[0],
      setLabels = _useState26[1];

  var _useState27 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(sortCheckBase),
      sortCheck = _useState27[0],
      setSortCheck = _useState27[1];

  var _useState28 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(null),
      hoverIndex = _useState28[0],
      setHoverIndex = _useState28[1];

  var _useState29 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(null),
      selectedModel = _useState29[0],
      setSelectedModel = _useState29[1];

  var _useState30 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(null),
      gPos = _useState30[0],
      setGPos = _useState30[1];

  var _useState31 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(null),
      gIde = _useState31[0],
      setGIde = _useState31[1];

  var _useState32 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(false),
      isDeleting = _useState32[0],
      setIsDeleting = _useState32[1];

  var _useState33 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(1),
      page = _useState33[0],
      setPage = _useState33[1];

  var _useState34 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])([]),
      pageCursors = _useState34[0],
      setPageCursors = _useState34[1];

  var _useState35 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(false),
      hasNextPage = _useState35[0],
      setHasNextPage = _useState35[1];

  var fetchSeq = Object(react__WEBPACK_IMPORTED_MODULE_5__["useRef"])(0);
  var backfillInFlight = Object(react__WEBPACK_IMPORTED_MODULE_5__["useRef"])(false);

  var _useState36 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(0),
      queryEpoch = _useState36[0],
      setQueryEpoch = _useState36[1];

  var _useState37 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(null),
      loadError = _useState37[0],
      setLoadError = _useState37[1];

  var tableBodyRef = Object(react__WEBPACK_IMPORTED_MODULE_5__["useRef"])(null);
  var rowHeightRef = Object(react__WEBPACK_IMPORTED_MODULE_5__["useRef"])(46);
  var headerHeightRef = Object(react__WEBPACK_IMPORTED_MODULE_5__["useRef"])(38);
  var LOAD_TIMEOUT_MS = 30000;

  var openMap = function openMap() {
    return setShowMap(true);
  };

  var handleMapView = Object(react__WEBPACK_IMPORTED_MODULE_5__["useCallback"])(function () {
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
  var startNameTokenBackfill = Object(react__WEBPACK_IMPORTED_MODULE_5__["useCallback"])( /*#__PURE__*/Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__["default"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee() {
    var reason,
        lastRun,
        db,
        lastDoc,
        tokensEqual,
        _loop,
        _ret,
        _args2 = arguments;

    return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee$(_context2) {
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
            db = _context_Firebase__WEBPACK_IMPORTED_MODULE_16__["default"].firestore();
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
            _loop = /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _loop() {
              var query, snap, batch, writes;
              return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _loop$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      query = db.collection("Test").orderBy(_context_Firebase__WEBPACK_IMPORTED_MODULE_16__["default"].firestore.FieldPath.documentId()).limit(200);
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
                        var nameTokens = Object(_utils_itemFormShared__WEBPACK_IMPORTED_MODULE_17__["buildNameTokens"])(name);
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

  var matchesFilters = Object(react__WEBPACK_IMPORTED_MODULE_5__["useCallback"])(function (item) {
    // hide explicitly hidden items
    if ((item === null || item === void 0 ? void 0 : item.visible) === false) return false; // OEM / Modality / Model filtering

    var OEM = getMachineField(item, "OEM");
    var Modality = getMachineField(item, "Modality");
    var Model = getMachineField(item, "Model");

    if (selectedOEM && normalizeText(OEM) !== normalizeText(selectedOEM)) {
      return false;
    }

    if (selectedModality && normalizeText(Modality) !== normalizeText(selectedModality)) {
      return false;
    }

    if (selectedModel && normalizeText(Model) !== normalizeText(selectedModel)) {
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


  Object(react__WEBPACK_IMPORTED_MODULE_5__["useEffect"])(function () {
    resetPagination();
    setQueryEpoch(function (v) {
      return v + 1;
    });
  }, [router.asPath]); // Reset and refetch when filters/search change

  Object(react__WEBPACK_IMPORTED_MODULE_5__["useEffect"])(function () {
    resetPagination();
    setQueryEpoch(function (v) {
      return v + 1;
    });
  }, [selectedOEM, selectedModality, selectedModel, selectedClientFrom, selectedClientCurrent, search, select]); // Fetch data on component mount and route change

  Object(react__WEBPACK_IMPORTED_MODULE_5__["useEffect"])(function () {
    fetchData(page);
  }, [page, queryEpoch]);
  Object(react__WEBPACK_IMPORTED_MODULE_5__["useEffect"])(function () {
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
    _fetchData = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__["default"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee9() {
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

      return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee9$(_context10) {
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
                var _ref16 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__["default"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee8() {
                  var attempt,
                      _args9 = arguments;
                  return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee8$(_context9) {
                    while (1) {
                      switch (_context9.prev = _context9.next) {
                        case 0:
                          attempt = _args9.length > 0 && _args9[0] !== undefined ? _args9[0] : 1;
                          _context9.prev = 1;
                          _context9.next = 4;
                          return Object(_utils_fetchAssociations__WEBPACK_IMPORTED_MODULE_9__["fetchPartsWithMachineDataPage"])({
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
                var next = requestedPage === 1 ? [] : Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__["default"])(prev);

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


  Object(react__WEBPACK_IMPORTED_MODULE_5__["useEffect"])(function () {
    var base = augmentedInfo || [];
    setInfo(base.filter(matchesFilters));
  }, [augmentedInfo, matchesFilters]);

  function sortCheckAll(pos) {
    // Determine next direction: toggle the clicked column only
    var nextSortCheck = sortCheck.map(function (v, i) {
      return i === pos ? !v : v;
    });
    var isDesc = nextSortCheck[pos]; // true means descending

    var sortedInfo = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__["default"])(info).sort(function (a, b) {
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

  var _useState38 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])([]),
      selectedItems = _useState38[0],
      setSelectedItems = _useState38[1];

  var _useState39 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(false),
      showDeleteModal = _useState39[0],
      setShowDeleteModal = _useState39[1];

  var handleSelectItem = function handleSelectItem(id) {
    setSelectedItems(function (prev) {
      return prev.includes(id) ? prev.filter(function (x) {
        return x !== id;
      }) : [].concat(Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__["default"])(prev), [id]);
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
    var _ref10 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__["default"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee2() {
      var db, _iterator2, _step2, itemId;

      return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee2$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              setIsDeleting(true);
              db = _context_Firebase__WEBPACK_IMPORTED_MODULE_16__["default"].firestore();
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

  var _useState40 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])("Select Option"),
      dropdown1Text = _useState40[0],
      setDropdown1Text = _useState40[1];

  var _useState41 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])("Select Option"),
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
    _buildClientsFromItems = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__["default"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee10(type) {
      var db, ids, filtered, _iterator3, _step3, it, id, out, idArray, i, chunk, snap;

      return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee10$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              db = _context_Firebase__WEBPACK_IMPORTED_MODULE_16__["default"].firestore();
              ids = new Set(); // Respect current OEM / Modality filters when deriving client options

              filtered = augmentedInfo.filter(function (item) {
                var OEM = getMachineField(item, "OEM");
                var Modality = getMachineField(item, "Modality");

                if (selectedOEM && normalizeText(OEM) !== normalizeText(selectedOEM)) {
                  return false;
                }

                if (selectedModality && normalizeText(Modality) !== normalizeText(selectedModality)) {
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
              idArray = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__["default"])(ids);
              i = 0;

            case 8:
              if (!(i < idArray.length)) {
                _context11.next = 17;
                break;
              }

              chunk = idArray.slice(i, i + 10);
              _context11.next = 12;
              return db.collection("Client").where(_context_Firebase__WEBPACK_IMPORTED_MODULE_16__["default"].firestore.FieldPath.documentId(), "in", chunk).get();

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
    var _ref11 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__["default"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee3() {
      var safeClients, clientsData, derived;
      return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee3$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              safeClients = [];
              _context4.prev = 1;
              _context4.next = 4;
              return Object(_utils_fetchAssociations__WEBPACK_IMPORTED_MODULE_9__["fetchClients"])(selectedOEM, selectedModality);

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
    var _ref12 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__["default"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee4(clientId) {
      var clientSnap, clientData;
      return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee4$(_context5) {
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
              return _context_Firebase__WEBPACK_IMPORTED_MODULE_16__["default"].firestore().collection("Client").doc(clientId).get();

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


  var _useState42 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])([]),
      models = _useState42[0],
      setModels = _useState42[1];

  var _useState43 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(false),
      showModelModal = _useState43[0],
      setShowModelModal = _useState43[1];

  var _useState44 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])("Select Option"),
      modelButtonText = _useState44[0],
      setModelButtonText = _useState44[1];

  var handleModelClick = /*#__PURE__*/function () {
    var _ref13 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__["default"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee5() {
      var modelsData;
      return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee5$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return Object(_utils_fetchAssociations__WEBPACK_IMPORTED_MODULE_9__["fetchModels"])(selectedOEM, selectedModality, selectedClientFrom);

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

  var _useState45 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(""),
      clientSearchTerm = _useState45[0],
      setClientSearchTerm = _useState45[1];

  var _useState46 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(""),
      modelSearchTerm = _useState46[0],
      setModelSearchTerm = _useState46[1];

  var deleteFromStorage = /*#__PURE__*/function () {
    var _ref14 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__["default"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee6(itemId) {
      var storageRef, folderRef, listResult, deletePromises;
      return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee6$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              storageRef = _context_Firebase__WEBPACK_IMPORTED_MODULE_16__["default"].storage().ref();
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
    var _ref15 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__["default"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee7(itemId) {
      var db;
      return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee7$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              db = _context_Firebase__WEBPACK_IMPORTED_MODULE_16__["default"].firestore();
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
      return buttons.push(__jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Pagination"].Item, {
        key: "page-".concat(p),
        active: p === page,
        onClick: function onClick() {
          return setPage(p);
        },
        __self: _this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1059,
          columnNumber: 9
        }
      }, p));
    };

    var pushEllipsis = function pushEllipsis(key) {
      return buttons.push(__jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Pagination"].Ellipsis, {
        key: key,
        disabled: true,
        __self: _this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1069,
          columnNumber: 20
        }
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

  var recalcPageSize = Object(react__WEBPACK_IMPORTED_MODULE_5__["useCallback"])(function () {
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
  Object(react__WEBPACK_IMPORTED_MODULE_5__["useEffect"])(function () {
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
  Object(react__WEBPACK_IMPORTED_MODULE_5__["useEffect"])(function () {
    if (isLoading || page !== 1) return;
    recalcPageSize();
  }, [page, isLoading, recalcPageSize]);

  var renderFilters = function renderFilters(idPrefix) {
    return __jsx("div", {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.filtersPanel,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1155,
        columnNumber: 5
      }
    }, __jsx("div", {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.filtersHeader,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1156,
        columnNumber: 7
      }
    }, __jsx("div", {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1157,
        columnNumber: 9
      }
    }, __jsx("div", {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.filtersTitle,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1158,
        columnNumber: 11
      }
    }, "Filters"), __jsx("div", {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.filtersSubtitle,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1159,
        columnNumber: 11
      }
    }, "Narrow results by machine, client, or warehouse.")), hasActiveFilters ? __jsx("span", {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.filtersBadge,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1164,
        columnNumber: 11
      }
    }, "Active") : null), __jsx("div", {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.filterSection,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1168,
        columnNumber: 7
      }
    }, __jsx("div", {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.filterSectionTitle,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1169,
        columnNumber: 9
      }
    }, "Machine"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["InputGroup"], {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.inputGroup,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1170,
        columnNumber: 9
      }
    }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["InputGroup"].Text, {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1171,
        columnNumber: 11
      }
    }, "OEM"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Dropdown"], {
      onSelect: handleSelect1,
      className: "w-100",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1172,
        columnNumber: 11
      }
    }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Dropdown"].Toggle, {
      variant: "outline-secondary",
      id: "".concat(idPrefix, "-oem"),
      className: "w-100 ".concat(_styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.inputButton),
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1173,
        columnNumber: 13
      }
    }, dropdown1Text), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Dropdown"].Menu, {
      className: "w-100",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1180,
        columnNumber: 13
      }
    }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Dropdown"].Item, {
      eventKey: "unassigned",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1181,
        columnNumber: 15
      }
    }, "Select Option"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Dropdown"].Item, {
      eventKey: "GE",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1182,
        columnNumber: 15
      }
    }, "GE"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Dropdown"].Item, {
      eventKey: "Toshiba",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1183,
        columnNumber: 15
      }
    }, "Toshiba"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Dropdown"].Item, {
      eventKey: "Siemens",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1184,
        columnNumber: 15
      }
    }, "Siemens"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Dropdown"].Item, {
      eventKey: "Philips",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1185,
        columnNumber: 15
      }
    }, "Philips")))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["InputGroup"], {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.inputGroup,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1190,
        columnNumber: 9
      }
    }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["InputGroup"].Text, {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1191,
        columnNumber: 11
      }
    }, "Modality"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Dropdown"], {
      onSelect: handleSelect2,
      className: "w-100",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1192,
        columnNumber: 11
      }
    }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Dropdown"].Toggle, {
      variant: "outline-secondary",
      id: "".concat(idPrefix, "-modality"),
      className: "w-100 ".concat(_styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.inputButton),
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1193,
        columnNumber: 13
      }
    }, dropdown2Text), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Dropdown"].Menu, {
      className: "w-100",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1200,
        columnNumber: 13
      }
    }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Dropdown"].Item, {
      eventKey: "unassigned",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1201,
        columnNumber: 15
      }
    }, "Select Option"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Dropdown"].Item, {
      eventKey: "CT",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1202,
        columnNumber: 15
      }
    }, "CT"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Dropdown"].Item, {
      eventKey: "MRI",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1203,
        columnNumber: 15
      }
    }, "MRI")))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["InputGroup"], {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.inputGroup,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1208,
        columnNumber: 9
      }
    }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["InputGroup"].Text, {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1209,
        columnNumber: 11
      }
    }, "Model"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Button"], {
      variant: "outline-secondary",
      className: "w-100 ".concat(_styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.inputButton),
      onClick: handleModelClick,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1210,
        columnNumber: 11
      }
    }, modelButtonText))), __jsx("div", {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.filterSection,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1220,
        columnNumber: 7
      }
    }, __jsx("div", {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.filterSectionTitle,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1221,
        columnNumber: 9
      }
    }, "Client"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["InputGroup"], {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.inputGroup,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1222,
        columnNumber: 9
      }
    }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["InputGroup"].Text, {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1223,
        columnNumber: 11
      }
    }, "Client From"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Button"], {
      variant: "outline-secondary",
      className: "w-100 ".concat(_styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.inputButton),
      onClick: function onClick() {
        return handleClientClick("from");
      },
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1224,
        columnNumber: 11
      }
    }, clientFromButtonText)), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["InputGroup"], {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.inputGroup,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1233,
        columnNumber: 9
      }
    }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["InputGroup"].Text, {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1234,
        columnNumber: 11
      }
    }, "Client Current"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Button"], {
      variant: "outline-secondary",
      className: "w-100 ".concat(_styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.inputButton),
      onClick: function onClick() {
        return handleClientClick("current");
      },
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1235,
        columnNumber: 11
      }
    }, clientCurrentButtonText))), __jsx("div", {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.filterSection,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1245,
        columnNumber: 7
      }
    }, __jsx("div", {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.filterSectionTitle,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1246,
        columnNumber: 9
      }
    }, "Warehouse"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["InputGroup"], {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.inputGroup,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1247,
        columnNumber: 9
      }
    }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["InputGroup"].Text, {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1248,
        columnNumber: 11
      }
    }, "Quick"), __jsx("div", {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.buttonGroup,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1249,
        columnNumber: 11
      }
    }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Button"], {
      variant: "outline-secondary",
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.flexButton,
      onClick: handleSoCalWarehouseClick,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1250,
        columnNumber: 13
      }
    }, "SoCal Warehouse"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Button"], {
      variant: "outline-secondary",
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.flexButton,
      onClick: handleNorCalWarehouseClick,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1257,
        columnNumber: 13
      }
    }, "NorCal Warehouse"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Button"], {
      variant: "outline-secondary",
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.flexButton,
      onClick: handleWarehouseUnassignedClick,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1264,
        columnNumber: 13
      }
    }, "Unassigned")))));
  };

  return __jsx(_LoggedIn__WEBPACK_IMPORTED_MODULE_11__["default"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1279,
      columnNumber: 5
    }
  }, (isDeleting || isNavigating) && __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.loadingOverlay,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1281,
      columnNumber: 9
    }
  }, __jsx("img", {
    src: "/magmo-logo.png",
    alt: "Loading Magmo",
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.loadingLogo,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1282,
      columnNumber: 11
    }
  })), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"], {
    show: showDeleteModal,
    onHide: handleCloseDeleteModal,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1289,
      columnNumber: 7
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Header, {
    closeButton: true,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1290,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Title, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1291,
      columnNumber: 11
    }
  }, "Confirm Deletion")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Body, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1293,
      columnNumber: 9
    }
  }, "Are you sure you want to delete ", selectedItems.length, " item", selectedItems.length > 1 ? "s" : "", "?"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Footer, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1297,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Button"], {
    variant: "danger",
    onClick: handleDeleteSelected,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1298,
      columnNumber: 11
    }
  }, "Yes, delete"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Button"], {
    variant: "secondary",
    onClick: handleCloseDeleteModal,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1301,
      columnNumber: 11
    }
  }, "Cancel"))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"], {
    show: showClientModal,
    onHide: function onHide() {
      return setShowClientModal(false);
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1307,
      columnNumber: 7
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Header, {
    closeButton: true,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1308,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Title, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1309,
      columnNumber: 11
    }
  }, "Select ", clientSelectionType === "from" ? "Client From" : "Client Current")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Body, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1313,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["FormControl"], {
    type: "text",
    placeholder: "Search by name",
    className: "mb-3",
    value: clientSearchTerm,
    onChange: function onChange(e) {
      return setClientSearchTerm(e.target.value);
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1314,
      columnNumber: 11
    }
  }), __jsx(_utils_ClientTable__WEBPACK_IMPORTED_MODULE_12__["default"], {
    clients: (Array.isArray(clients) ? clients : []).filter(function (client) {
      var _client$name;

      return ((_client$name = client === null || client === void 0 ? void 0 : client.name) !== null && _client$name !== void 0 ? _client$name : "").toLowerCase().includes(clientSearchTerm.toLowerCase());
    }),
    onSelectClient: handleClientSelect,
    onInfoClick: handleClientInfo,
    isClientSearch: false,
    clearSelection: function clearSelection() {
      return handleClientSelect(null);
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1321,
      columnNumber: 11
    }
  }))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"], {
    show: showModelModal,
    onHide: function onHide() {
      return setShowModelModal(false);
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1333,
      columnNumber: 7
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Header, {
    closeButton: true,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1334,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Title, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1335,
      columnNumber: 11
    }
  }, "Select Model")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Body, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1337,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["FormControl"], {
    type: "text",
    placeholder: "Search by name",
    className: "mb-3",
    value: modelSearchTerm,
    onChange: function onChange(e) {
      return setModelSearchTerm(e.target.value);
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1338,
      columnNumber: 11
    }
  }), __jsx(_utils_ModelTable__WEBPACK_IMPORTED_MODULE_13__["default"], {
    models: models.filter(function (model) {
      return typeof model === "string" ? model.toLowerCase().includes(modelSearchTerm.toLowerCase()) : false;
    }),
    onSelectModel: handleModelSelect,
    clearSelection: function clearSelection() {
      return handleModelSelect(null);
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1345,
      columnNumber: 11
    }
  }))), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.page,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1357,
      columnNumber: 7
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.pageInner,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1358,
      columnNumber: 9
    }
  }, __jsx("header", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.header,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1359,
      columnNumber: 11
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.headerLeft,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1360,
      columnNumber: 13
    }
  }, __jsx("button", {
    type: "button",
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.burger,
    onClick: function onClick() {
      return setShowFilters(true);
    },
    "aria-label": "Open filters",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1361,
      columnNumber: 15
    }
  }, __jsx("span", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1367,
      columnNumber: 17
    }
  }), __jsx("span", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1368,
      columnNumber: 17
    }
  }), __jsx("span", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1369,
      columnNumber: 17
    }
  })), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.brand,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1371,
      columnNumber: 15
    }
  }, __jsx("img", {
    src: "/magmo-logo.png",
    alt: "Magmo",
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.brandLogo,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1372,
      columnNumber: 17
    }
  }), __jsx("div", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1377,
      columnNumber: 17
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.brandName,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1378,
      columnNumber: 19
    }
  }, "Magmo"), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.brandSub,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1379,
      columnNumber: 19
    }
  }, "Inventory Search")))), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.headerRight,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1383,
      columnNumber: 13
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.headerStatus,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1384,
      columnNumber: 15
    }
  }, hasActiveFilters ? "Filters active" : "All items"))), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.content,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1390,
      columnNumber: 11
    }
  }, __jsx("aside", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.sidebar,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1391,
      columnNumber: 13
    }
  }, renderFilters("sidebar")), __jsx("main", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.main,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1392,
      columnNumber: 13
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.tableCard,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1393,
      columnNumber: 15
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.tableHeader,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1394,
      columnNumber: 17
    }
  }, __jsx("div", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1395,
      columnNumber: 19
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.tableTitle,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1396,
      columnNumber: 21
    }
  }, "Items"), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.tableSubtitle,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1397,
      columnNumber: 21
    }
  }, isLoading ? "Loading items" : "".concat(info.length, " items on this page"))), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.tableMeta,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1401,
      columnNumber: 19
    }
  }, "Page ", page, " ", hasNextPage ? "of ".concat(totalKnownPages, "+") : "of ".concat(totalKnownPages))), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.tableBody,
    ref: tableBodyRef,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1406,
      columnNumber: 17
    }
  }, isLoading ? __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.loadingState,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1408,
      columnNumber: 21
    }
  }, __jsx("img", {
    src: "/magmo-logo.png",
    alt: "Loading Magmo",
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.loadingLogo,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1409,
      columnNumber: 23
    }
  }), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.loadingText,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1414,
      columnNumber: 23
    }
  }, "Loading")) : loadError ? __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.errorState,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1417,
      columnNumber: 21
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.errorTitle,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1418,
      columnNumber: 23
    }
  }, "Load failed (", loadError.code, ")"), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.errorMessage,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1421,
      columnNumber: 23
    }
  }, loadError.message), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Button"], {
    variant: "outline-secondary",
    size: "sm",
    onClick: function onClick() {
      resetPagination();
      setQueryEpoch(function (v) {
        return v + 1;
      });
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1422,
      columnNumber: 23
    }
  }, "Retry")) : __jsx(_utils_PartTable__WEBPACK_IMPORTED_MODULE_14__["default"], {
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
    minRows: pageSize,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1434,
      columnNumber: 21
    }
  })), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.tableFooter,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1452,
      columnNumber: 17
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.paginationRow,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1453,
      columnNumber: 19
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Pagination"], {
    size: "sm",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1454,
      columnNumber: 21
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Pagination"].Prev, {
    onClick: function onClick() {
      return setPage(function (p) {
        return Math.max(1, p - 1);
      });
    },
    disabled: page <= 1,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1455,
      columnNumber: 23
    }
  }, "Previous"), pageButtons, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Pagination"].Next, {
    onClick: function onClick() {
      return setPage(function (p) {
        return p + 1;
      });
    },
    disabled: !hasNextPage,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1462,
      columnNumber: 23
    }
  }, "Next"))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Form"], {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.searchRow,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1470,
      columnNumber: 19
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["FormControl"], {
    type: showListSearch,
    placeholder: "Search",
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.searchInput,
    "aria-label": "Search",
    value: search,
    onChange: searchChangeHandler,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1471,
      columnNumber: 21
    }
  }), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["NavDropdown"], {
    title: select,
    id: "collasible-nav-dropdown",
    show: showList,
    onMouseEnter: function onMouseEnter() {
      return setShowList(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setShowList(false);
    },
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.searchSelect,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1479,
      columnNumber: 21
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["NavDropdown"].Item, {
    onClick: function onClick() {
      setSelect("Name");
      setShowListSearch("text");
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1487,
      columnNumber: 23
    }
  }, "Name"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["NavDropdown"].Item, {
    onClick: function onClick() {
      setSelect("Date");
      setShowListSearch("date");
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1495,
      columnNumber: 23
    }
  }, "Date"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["NavDropdown"].Item, {
    onClick: function onClick() {
      setSelect("Work Order");
      setShowListSearch("text");
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1503,
      columnNumber: 23
    }
  }, "Work Order"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["NavDropdown"].Item, {
    onClick: function onClick() {
      setSelect("Product Number");
      setShowListSearch("text");
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1511,
      columnNumber: 23
    }
  }, "Product Number"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["NavDropdown"].Item, {
    onClick: function onClick() {
      setSelect("Serial Number");
      setShowListSearch("text");
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1519,
      columnNumber: 23
    }
  }, "Serial Number"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["NavDropdown"].Item, {
    onClick: function onClick() {
      setSelect("Description");
      setShowListSearch("text");
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1527,
      columnNumber: 23
    }
  }, "Description"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["NavDropdown"].Item, {
    onClick: function onClick() {
      setSelect("SKU");
      setShowListSearch("text");
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1535,
      columnNumber: 23
    }
  }, "SKU"))), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.footerActions,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1545,
      columnNumber: 19
    }
  }, __jsx(LoadingButton, {
    type: "secondary",
    name: "Add New Item",
    route: "NewSearch/AddItem/NewItem",
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.actionButton,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1546,
      columnNumber: 21
    }
  }), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Button"], {
    variant: "info",
    className: "".concat(_styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.actionButton, " ").concat(_styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.mapActionButton),
    onClick: openMap,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1552,
      columnNumber: 21
    }
  }, "Map"), __jsx(LoadingButton, {
    type: "primary",
    name: "Back",
    route: "Warehousedb/WarehouseSelect",
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.actionButton,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1559,
      columnNumber: 21
    }
  }))))))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Offcanvas"], {
    show: showFilters,
    onHide: function onHide() {
      return setShowFilters(false);
    },
    placement: "start",
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.filtersDrawer,
    scroll: true,
    backdrop: true,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1572,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Offcanvas"].Header, {
    closeButton: true,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1580,
      columnNumber: 11
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Offcanvas"].Title, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1581,
      columnNumber: 13
    }
  }, "Filters")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Offcanvas"].Body, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1583,
      columnNumber: 11
    }
  }, renderFilters("drawer"))), __jsx(_components_WarehouseMapModal__WEBPACK_IMPORTED_MODULE_19__["default"], {
    show: showMap,
    onHide: function onHide() {
      return setShowMap(false);
    },
    onView: handleMapView,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1586,
      columnNumber: 9
    }
  })));
}

_s2(MainSearch, "2ZHT03e70CN3HzT1I823dEfc6rg=", false, function () {
  return [_context_AuthUserContext__WEBPACK_IMPORTED_MODULE_10__["useAuth"], next_router__WEBPACK_IMPORTED_MODULE_8__["useRouter"]];
});

_c2 = MainSearch;

var _c, _c2;

$RefreshReg$(_c, "LoadingButton");
$RefreshReg$(_c2, "MainSearch");

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

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/next/dist/compiled/webpack/harmony-module.js */ "./node_modules/next/dist/compiled/webpack/harmony-module.js")(module)))

/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vY29tcG9uZW50cy9XYXJlaG91c2VNYXBNb2RhbC5qcyIsIndlYnBhY2s6Ly9fTl9FLy4vY29tcG9uZW50cy9XYXJlaG91c2VNYXBNb2RhbC5tb2R1bGUuY3NzPzkyNTIiLCJ3ZWJwYWNrOi8vX05fRS8uL2NvbXBvbmVudHMvV2FyZWhvdXNlTWFwTW9kYWwubW9kdWxlLmNzcyIsIndlYnBhY2s6Ly9fTl9FLy4vcGFnZXMvTmV3U2VhcmNoL21haW5TZWFyY2guanMiXSwibmFtZXMiOlsiUkVHSU9OX09SREVSIiwiTEVUVEVSUyIsIkFycmF5IiwiZnJvbSIsImxlbmd0aCIsIl8iLCJpIiwiU3RyaW5nIiwiZnJvbUNoYXJDb2RlIiwiTlVNQkVSUyIsIldhcmVob3VzZU1hcE1vZGFsIiwic2hvdyIsIm9uSGlkZSIsIm9uVmlldyIsIm9uU2VsZWN0aW9uQ2hhbmdlIiwiaW5pdGlhbFNlbGVjdGlvbiIsInVzZVN0YXRlIiwicmVnaW9uT3B0aW9ucyIsInNldFJlZ2lvbk9wdGlvbnMiLCJzZWN0aW9uTWFwIiwic2V0U2VjdGlvbk1hcCIsIm1hcFN0ZXAiLCJzZXRNYXBTdGVwIiwibWFwUmVnaW9uIiwic2V0TWFwUmVnaW9uIiwibWFwUm93Iiwic2V0TWFwUm93IiwibWFwQ29sIiwic2V0TWFwQ29sIiwibWFwUGFsbGV0Iiwic2V0TWFwUGFsbGV0IiwibWFwQmluIiwic2V0TWFwQmluIiwibWFwQ2VsbFBhbGxldHMiLCJzZXRNYXBDZWxsUGFsbGV0cyIsIm1hcFBhbGxldEJpbnMiLCJzZXRNYXBQYWxsZXRCaW5zIiwibWFwTG9hZGluZyIsInNldE1hcExvYWRpbmciLCJtYXBFcnJvciIsInNldE1hcEVycm9yIiwiZGlyZWN0b3J5TG9hZGVkIiwic2V0RGlyZWN0b3J5TG9hZGVkIiwibm90aWZ5U2VsZWN0aW9uQ2hhbmdlIiwidXNlQ2FsbGJhY2siLCJzZWxlY3Rpb24iLCJsb2FkRGlyZWN0b3J5IiwiZmlyZWJhc2UiLCJmaXJlc3RvcmUiLCJjb2xsZWN0aW9uIiwiZG9jIiwiZ2V0IiwiZGF0YSIsIlJlZ2lvbiIsIlNlY3Rpb24iLCJjb25zb2xlIiwiZXJyb3IiLCJsb2FkUmVnaW9uSW52ZW50b3J5IiwicmVnaW9uSWQiLCJ3aGVyZSIsInNuYXAiLCJjZWxsUGFsbGV0cyIsInBhbGxldEJpbnMiLCJmb3JFYWNoIiwibG9jIiwibmV3TG9jYWxDdXJyZW50Iiwicm93Iiwic2VjdGlvbiIsImxldHRlciIsImNvbCIsIm51bWJlciIsInRyaW1tZWQiLCJ0cmltIiwic2xpY2UiLCJ1bmRlZmluZWQiLCJwYWxsZXQiLCJiaW4iLCJjZWxsS2V5IiwiU2V0IiwiYWRkIiwicGFsbGV0S2V5IiwiY2VsbE9iaiIsIk9iamVjdCIsImtleXMiLCJrZXkiLCJzb3J0IiwiYSIsImIiLCJOdW1iZXIiLCJwYWxsZXRPYmoiLCJnZXRSZWdpb25EaW1lbnNpb25zIiwiZW50cnkiLCJpc0FycmF5IiwiY29scyIsInBhcnNlSW50Iiwicm93cyIsImlzRmluaXRlIiwidXNlRWZmZWN0IiwicmVnaW9uIiwic2VjdGlvbkxldHRlciIsInNlY3Rpb25OdW1iZXIiLCJoYW5kbGVTZWxlY3RSZWdpb24iLCJoYW5kbGVTZWxlY3RDZWxsIiwicm93TGV0dGVyIiwiY29sTnVtYmVyIiwiY29sVmFsdWUiLCJoYW5kbGVTZWxlY3RQYWxsZXQiLCJwYWxsZXRJZCIsInBhbGxldFZhbHVlIiwiaGFuZGxlU2VsZWN0QmluIiwiYmluSWQiLCJiaW5WYWx1ZSIsImhhbmRsZUJhY2siLCJoYW5kbGVWaWV3Iiwic3R5bGVzIiwibWFwU3RhZ2UiLCJtYXBIaW50IiwibWFwQ2FudmFzIiwibWFwIiwicmVnaW9uQmxvY2siLCJpbmNsdWRlcyIsImRpbXMiLCJtYXBFbXB0eSIsImdyaWRXcmFwcGVyIiwiZ3JpZCIsImhhc1BhbGxldHMiLCJCb29sZWFuIiwiZ3JpZENlbGwiLCJncmlkQ2VsbERpc2FibGVkIiwicGFsbGV0R3JpZCIsImJpbnMiLCJwYWxsZXRCdXR0b24iLCJiaW5CdXR0b24iLCJtYXBGb290ZXIiLCJTT0NBTF9DTElFTlRfSUQiLCJOT1JDQUxfQ0xJRU5UX0lEIiwiVU5BU1NJR05FRF9DTElFTlRfSUQiLCJERUZBVUxUX1BBR0VfU0laRSIsInNpbXVsYXRlTmV0d29ya1JlcXVlc3QiLCJQcm9taXNlIiwicmVzb2x2ZSIsInNldFRpbWVvdXQiLCJMb2FkaW5nQnV0dG9uIiwidHlwZSIsIm5hbWUiLCJyb3V0ZSIsImNsYXNzTmFtZSIsImlzTG9hZGluZyIsInNldExvYWRpbmciLCJjYW5jZWxsZWQiLCJ0aGVuIiwidG9UaW1lIiwidmFsdWUiLCJzZWNvbmRzIiwiRGF0ZSIsInQiLCJnZXRUaW1lIiwiaXNOYU4iLCJpc28iLCJwYXJzZSIsInBhcnRzIiwic3BsaXQiLCJtbSIsImRkIiwieXl5eSIsImFsdCIsInRvWU1EIiwiZCIsImdldEZ1bGxZZWFyIiwiZ2V0TW9udGgiLCJwYWRTdGFydCIsImdldERhdGUiLCJub3JtYWxpemVUZXh0IiwidG9Mb3dlckNhc2UiLCJnZXRNYWNoaW5lRmllbGQiLCJpdGVtIiwibG93ZXIiLCJtYWNoaW5lRGF0YSIsImN1cnJlbnRNYWNoaW5lRGF0YSIsInRoZU1hY2hpbmVEYXRhIiwiVGhlTWFjaGluZSIsIk1haW5TZWFyY2giLCJ1c2VBdXRoIiwic2lnbk91dCIsImluZm8iLCJzZXRJbmZvIiwiYmFja3VwSW5mbyIsInNldEJhY2t1cEluZm8iLCJhdWdtZW50ZWRJbmZvIiwic2V0QXVnbWVudGVkSW5mbyIsInNldElzTG9hZGluZyIsImlkcyIsInNldElEIiwic2V0U2hvdyIsInNob3dGaWx0ZXJzIiwic2V0U2hvd0ZpbHRlcnMiLCJwYWdlU2l6ZSIsInNldFBhZ2VTaXplIiwiaXNOYXZpZ2F0aW5nIiwic2V0SXNOYXZpZ2F0aW5nIiwiZEl0ZW0iLCJzZXRESXRlbSIsInNlbGVjdCIsInNldFNlbGVjdCIsInNob3dMaXN0Iiwic2V0U2hvd0xpc3QiLCJzaG93TGlzdFNlYXJjaCIsInNldFNob3dMaXN0U2VhcmNoIiwic2VhcmNoIiwic2V0U2VhcmNoIiwic2VsZWN0ZWRPRU0iLCJzZXRTZWxlY3RlZE9FTSIsInNlbGVjdGVkTW9kYWxpdHkiLCJzZXRTZWxlY3RlZE1vZGFsaXR5Iiwic2VsZWN0ZWRDbGllbnRGcm9tIiwic2V0U2VsZWN0ZWRDbGllbnRGcm9tIiwiY2xpZW50RnJvbUJ1dHRvblRleHQiLCJzZXRDbGllbnRGcm9tQnV0dG9uVGV4dCIsInNlbGVjdGVkQ2xpZW50Q3VycmVudCIsInNldFNlbGVjdGVkQ2xpZW50Q3VycmVudCIsImNsaWVudEN1cnJlbnRCdXR0b25UZXh0Iiwic2V0Q2xpZW50Q3VycmVudEJ1dHRvblRleHQiLCJjbGllbnRzIiwic2V0Q2xpZW50cyIsInNob3dDbGllbnRNb2RhbCIsInNldFNob3dDbGllbnRNb2RhbCIsImNsaWVudFNlbGVjdGlvblR5cGUiLCJzZXRDbGllbnRTZWxlY3Rpb25UeXBlIiwic2hvd01hcCIsInNldFNob3dNYXAiLCJyb3V0ZXIiLCJ1c2VSb3V0ZXIiLCJsYWJlbEJhc2UiLCJsYWJlbEJhc2VOYW1lcyIsInNvcnRDaGVja0Jhc2UiLCJ3aXRoU29ydEljb24iLCJiYXNlTGFiZWxzIiwiYWN0aXZlSW5kZXgiLCJpc0Rlc2MiLCJ0ZXh0IiwiYXJyb3ciLCJsYWJlbHMiLCJzZXRMYWJlbHMiLCJzb3J0Q2hlY2siLCJzZXRTb3J0Q2hlY2siLCJob3ZlckluZGV4Iiwic2V0SG92ZXJJbmRleCIsInNlbGVjdGVkTW9kZWwiLCJzZXRTZWxlY3RlZE1vZGVsIiwiZ1BvcyIsInNldEdQb3MiLCJnSWRlIiwic2V0R0lkZSIsImlzRGVsZXRpbmciLCJzZXRJc0RlbGV0aW5nIiwicGFnZSIsInNldFBhZ2UiLCJwYWdlQ3Vyc29ycyIsInNldFBhZ2VDdXJzb3JzIiwiaGFzTmV4dFBhZ2UiLCJzZXRIYXNOZXh0UGFnZSIsImZldGNoU2VxIiwidXNlUmVmIiwiYmFja2ZpbGxJbkZsaWdodCIsInF1ZXJ5RXBvY2giLCJzZXRRdWVyeUVwb2NoIiwibG9hZEVycm9yIiwic2V0TG9hZEVycm9yIiwidGFibGVCb2R5UmVmIiwicm93SGVpZ2h0UmVmIiwiaGVhZGVySGVpZ2h0UmVmIiwiTE9BRF9USU1FT1VUX01TIiwib3Blbk1hcCIsImhhbmRsZU1hcFZpZXciLCJwYXJhbXMiLCJVUkxTZWFyY2hQYXJhbXMiLCJzZXQiLCJxdWVyeSIsInRvU3RyaW5nIiwicHVzaCIsInN0YXJ0TmFtZVRva2VuQmFja2ZpbGwiLCJyZWFzb24iLCJjdXJyZW50IiwibGFzdFJ1biIsIndpbmRvdyIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJub3ciLCJkYiIsImxhc3REb2MiLCJ0b2tlbnNFcXVhbCIsInNldEEiLCJzZXRCIiwic2l6ZSIsInYiLCJoYXMiLCJvcmRlckJ5IiwiRmllbGRQYXRoIiwiZG9jdW1lbnRJZCIsImxpbWl0Iiwic3RhcnRBZnRlciIsImVtcHR5IiwiYmF0Y2giLCJ3cml0ZXMiLCJkb2NzIiwibmFtZUxvd2VyIiwibmFtZVRva2VucyIsImJ1aWxkTmFtZVRva2VucyIsImV4aXN0aW5nVG9rZW5zIiwibmVlZHNVcGRhdGUiLCJ1cGRhdGUiLCJyZWYiLCJjb21taXQiLCJzZXRJdGVtIiwic2VhcmNoTG93ZXIiLCJoYXNBY3RpdmVGaWx0ZXJzIiwidmFsdWVNYXRjaGVzIiwicyIsInNvbWUiLCJtYXRjaGVzRmlsdGVycyIsInZpc2libGUiLCJPRU0iLCJNb2RhbGl0eSIsIk1vZGVsIiwiY2xpZW50RnJvbUlkIiwiY2xpZW50Q3VycmVudElkIiwid2FudGVkRGF5IiwiaXRlbVlNRCIsImRhdGUiLCJkZXNjcmlwdGlvbnMiLCJ3b3JrT3JkZXJzIiwidyIsIndvIiwid29ya09yZGVyIiwicG4iLCJzbiIsImRlc2MiLCJkZXNjcmlwdGlvbiIsImlkIiwibG9jYWxTTiIsImxvY2FsX3NuIiwicmVzZXRQYWdpbmF0aW9uIiwiYXNQYXRoIiwiZmV0Y2hEYXRhIiwiZXZlbnRzIiwiaGFuZGxlRG9uZSIsIm9uIiwib2ZmIiwicmVxdWVzdGVkUGFnZSIsInNlcSIsInRpbWVkT3V0IiwidGltZW91dElkIiwiY29kZSIsIm1lc3NhZ2UiLCJNYXRoIiwicm91bmQiLCJpbnB1dFRleHQiLCJzZWxlY3RlZFR5cGUiLCJzdGFydEFmdGVyRG9jIiwiY2xlYXJUaW1lb3V0IiwiZWZmZWN0aXZlU2VsZWN0IiwiZWZmZWN0aXZlU2VhcmNoIiwiZWZmZWN0aXZlU2VhcmNoTG93ZXIiLCJsb2FkIiwiYXR0ZW1wdCIsImZldGNoUGFydHNXaXRoTWFjaGluZURhdGFQYWdlIiwidmlzaWJsZU9ubHkiLCJmaWx0ZXJGbiIsInJhdyIsIm5lZWRzTWFjaGluZURhdGEiLCJyIiwicG93IiwibmV4dFBhZ2UiLCJoYXNOYW1lU2VhcmNoIiwicHJldiIsIm5leHQiLCJzZXRTZWxlY3RlZEl0ZW1zIiwiYXVnbWVudGVkIiwiQ2xpZW50RnJvbSIsIkNsaWVudEN1cnJlbnQiLCJmaWx0ZXIiLCJzZWFyY2hDaGFuZ2VIYW5kbGVyIiwiZXZlbnQiLCJ0YXJnZXQiLCJiYXNlIiwic29ydENoZWNrQWxsIiwicG9zIiwibmV4dFNvcnRDaGVjayIsInNvcnRlZEluZm8iLCJ0YSIsInRiIiwiYXYiLCJidiIsImxvY2FsZUNvbXBhcmUiLCJhbiIsImJuIiwicm93U2VsZWN0IiwibG9nIiwic2VsZWN0ZWRJdGVtcyIsInNob3dEZWxldGVNb2RhbCIsInNldFNob3dEZWxldGVNb2RhbCIsImhhbmRsZVNlbGVjdEl0ZW0iLCJ4IiwiaGFuZGxlU2hvd0RlbGV0ZU1vZGFsIiwiaGFuZGxlQ2xvc2VEZWxldGVNb2RhbCIsImhhbmRsZURlbGV0ZVNlbGVjdGVkIiwiaXRlbUlkIiwiZGVsZXRlRnJvbVN0b3JhZ2UiLCJoYW5kbGVDbG9zZSIsImhhbmRsZVNob3ciLCJjaGVja0RlbGV0ZSIsImlkc1RvRGVsZXRlIiwicHJldmVudERlZmF1bHQiLCJzdG9wUHJvcGFnYXRpb24iLCJob3ZlclN0eWxlIiwiaW5kZXgiLCJiYWNrZ3JvdW5kQ29sb3IiLCJ0ZXh0QWxpZ24iLCJjdXJzb3IiLCJkcm9wZG93bjFUZXh0Iiwic2V0RHJvcGRvd24xVGV4dCIsImRyb3Bkb3duMlRleHQiLCJzZXREcm9wZG93bjJUZXh0IiwiaGFuZGxlU2VsZWN0MSIsImV2ZW50S2V5IiwidGV4dENvbnRlbnQiLCJoYW5kbGVTZWxlY3QyIiwiYnVpbGRDbGllbnRzRnJvbUl0ZW1zIiwiZmlsdGVyZWQiLCJpdCIsIm91dCIsImlkQXJyYXkiLCJjaHVuayIsImhhbmRsZUNsaWVudENsaWNrIiwic2FmZUNsaWVudHMiLCJmZXRjaENsaWVudHMiLCJjbGllbnRzRGF0YSIsImRlcml2ZWQiLCJzZXRDbGllbnRTZWFyY2hUZXJtIiwiaGFuZGxlQ2xpZW50U2VsZWN0IiwiY2xpZW50SWQiLCJjbGllbnRTbmFwIiwiZXhpc3RzIiwiY2xpZW50RGF0YSIsImhhbmRsZUNsaWVudEluZm8iLCJjbGllbnROYW1lIiwiaGFuZGxlQ2xlYXJDbGllbnRTZWxlY3Rpb24iLCJtb2RlbHMiLCJzZXRNb2RlbHMiLCJzaG93TW9kZWxNb2RhbCIsInNldFNob3dNb2RlbE1vZGFsIiwibW9kZWxCdXR0b25UZXh0Iiwic2V0TW9kZWxCdXR0b25UZXh0IiwiaGFuZGxlTW9kZWxDbGljayIsImZldGNoTW9kZWxzIiwibW9kZWxzRGF0YSIsInNldE1vZGVsU2VhcmNoVGVybSIsImhhbmRsZU1vZGVsU2VsZWN0IiwibW9kZWxOYW1lIiwiaGFuZGxlQ2xlYXJNb2RlbFNlbGVjdGlvbiIsImhhbmRsZVNvQ2FsV2FyZWhvdXNlQ2xpY2siLCJoYW5kbGVOb3JDYWxXYXJlaG91c2VDbGljayIsImhhbmRsZVdhcmVob3VzZVVuYXNzaWduZWRDbGljayIsImNsaWVudFNlYXJjaFRlcm0iLCJtb2RlbFNlYXJjaFRlcm0iLCJzdG9yYWdlUmVmIiwic3RvcmFnZSIsImZvbGRlclJlZiIsImNoaWxkIiwibGlzdEFsbCIsImxpc3RSZXN1bHQiLCJkZWxldGVQcm9taXNlcyIsIml0ZW1zIiwiYWxsIiwiZGVsZXRlRnJvbVBhcnRzQ29sbGVjdGlvbiIsInRvdGFsS25vd25QYWdlcyIsIm1heCIsInBhZ2VCdXR0b25zIiwiYnV0dG9ucyIsIm1heFZpc2libGUiLCJwdXNoUGFnZSIsInAiLCJwdXNoRWxsaXBzaXMiLCJzdGFydCIsImVuZCIsIm1pbiIsImRlc2lyZWRXaW5kb3ciLCJjdXJyZW50V2luZG93IiwicmVtYWluaW5nIiwicmVjYWxjUGFnZVNpemUiLCJjb250YWluZXJIZWlnaHQiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJoZWlnaHQiLCJoZWFkZXJSb3ciLCJxdWVyeVNlbGVjdG9yIiwiYm9keVJvdyIsImgiLCJ2ZXJ0aWNhbFBhZGRpbmciLCJhdmFpbGFibGUiLCJlc3RpbWF0ZWQiLCJmbG9vciIsImNsYW1wZWQiLCJvblJlc2l6ZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwicmVuZGVyRmlsdGVycyIsImlkUHJlZml4IiwiZmlsdGVyc1BhbmVsIiwiZmlsdGVyc0hlYWRlciIsImZpbHRlcnNUaXRsZSIsImZpbHRlcnNTdWJ0aXRsZSIsImZpbHRlcnNCYWRnZSIsImZpbHRlclNlY3Rpb24iLCJmaWx0ZXJTZWN0aW9uVGl0bGUiLCJpbnB1dEdyb3VwIiwiaW5wdXRCdXR0b24iLCJidXR0b25Hcm91cCIsImZsZXhCdXR0b24iLCJsb2FkaW5nT3ZlcmxheSIsImxvYWRpbmdMb2dvIiwiZSIsImNsaWVudCIsIm1vZGVsIiwicGFnZUlubmVyIiwiaGVhZGVyIiwiaGVhZGVyTGVmdCIsImJ1cmdlciIsImJyYW5kIiwiYnJhbmRMb2dvIiwiYnJhbmROYW1lIiwiYnJhbmRTdWIiLCJoZWFkZXJSaWdodCIsImhlYWRlclN0YXR1cyIsImNvbnRlbnQiLCJzaWRlYmFyIiwibWFpbiIsInRhYmxlQ2FyZCIsInRhYmxlSGVhZGVyIiwidGFibGVUaXRsZSIsInRhYmxlU3VidGl0bGUiLCJ0YWJsZU1ldGEiLCJ0YWJsZUJvZHkiLCJsb2FkaW5nU3RhdGUiLCJsb2FkaW5nVGV4dCIsImVycm9yU3RhdGUiLCJlcnJvclRpdGxlIiwiZXJyb3JNZXNzYWdlIiwidGFibGVGb290ZXIiLCJwYWdpbmF0aW9uUm93Iiwic2VhcmNoUm93Iiwic2VhcmNoSW5wdXQiLCJzZWFyY2hTZWxlY3QiLCJmb290ZXJBY3Rpb25zIiwiYWN0aW9uQnV0dG9uIiwibWFwQWN0aW9uQnV0dG9uIiwiZmlsdGVyc0RyYXdlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsSUFBTUEsWUFBWSxHQUFHLENBQUMsR0FBRCxFQUFNLEdBQU4sRUFBVyxHQUFYLEVBQWdCLEdBQWhCLEVBQXFCLEdBQXJCLEVBQTBCLEdBQTFCLEVBQStCLEdBQS9CLENBQXJCO0FBQ0EsSUFBTUMsT0FBTyxHQUFHQyxLQUFLLENBQUNDLElBQU4sQ0FBVztBQUFFQyxRQUFNLEVBQUU7QUFBVixDQUFYLEVBQTJCLFVBQUNDLENBQUQsRUFBSUMsQ0FBSjtBQUFBLFNBQ3pDQyxNQUFNLENBQUNDLFlBQVAsQ0FBb0IsS0FBS0YsQ0FBekIsQ0FEeUM7QUFBQSxDQUEzQixDQUFoQjtBQUdBLElBQU1HLE9BQU8sR0FBR1AsS0FBSyxDQUFDQyxJQUFOLENBQVc7QUFBRUMsUUFBTSxFQUFFO0FBQVYsQ0FBWCxFQUEyQixVQUFDQyxDQUFELEVBQUlDLENBQUo7QUFBQSxTQUFVQSxDQUFDLEdBQUcsQ0FBZDtBQUFBLENBQTNCLENBQWhCO0FBRWUsU0FBU0ksaUJBQVQsT0FNWjtBQUFBOztBQUFBOztBQUFBLE1BTERDLElBS0MsUUFMREEsSUFLQztBQUFBLE1BSkRDLE1BSUMsUUFKREEsTUFJQztBQUFBLE1BSERDLE1BR0MsUUFIREEsTUFHQztBQUFBLE1BRkRDLGlCQUVDLFFBRkRBLGlCQUVDO0FBQUEsbUNBRERDLGdCQUNDO0FBQUEsTUFEREEsZ0JBQ0Msc0NBRGtCLEVBQ2xCOztBQUFBLGtCQUN5Q0Msc0RBQVEsQ0FBQyxFQUFELENBRGpEO0FBQUEsTUFDTUMsYUFETjtBQUFBLE1BQ3FCQyxnQkFEckI7O0FBQUEsbUJBRW1DRixzREFBUSxDQUFDLEVBQUQsQ0FGM0M7QUFBQSxNQUVNRyxVQUZOO0FBQUEsTUFFa0JDLGFBRmxCOztBQUFBLG1CQUc2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RjtBQThURDs7SUEvNkN1QjVGLFU7VUFDRkMsaUUsRUE2QkxpRCxxRDs7O01BOUJPbEQsVSIsImZpbGUiOiJzdGF0aWMvd2VicGFjay9wYWdlcy9OZXdTZWFyY2gvbWFpblNlYXJjaC5iYjJjZjU2OTgyZmVhY2NlMjhiNi5ob3QtdXBkYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBNb2RhbCwgQnV0dG9uLCBTcGlubmVyIH0gZnJvbSBcInJlYWN0LWJvb3RzdHJhcFwiO1xuaW1wb3J0IGZpcmViYXNlIGZyb20gXCIuLi9jb250ZXh0L0ZpcmViYXNlXCI7XG5pbXBvcnQgc3R5bGVzIGZyb20gXCIuL1dhcmVob3VzZU1hcE1vZGFsLm1vZHVsZS5jc3NcIjtcblxuY29uc3QgUkVHSU9OX09SREVSID0gW1wiRVwiLCBcIkZcIiwgXCJHXCIsIFwiQVwiLCBcIkRcIiwgXCJDXCIsIFwiQlwiXTtcbmNvbnN0IExFVFRFUlMgPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiAyNiB9LCAoXywgaSkgPT5cbiAgU3RyaW5nLmZyb21DaGFyQ29kZSg2NSArIGkpXG4pO1xuY29uc3QgTlVNQkVSUyA9IEFycmF5LmZyb20oeyBsZW5ndGg6IDUwIH0sIChfLCBpKSA9PiBpICsgMSk7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFdhcmVob3VzZU1hcE1vZGFsKHtcbiAgc2hvdyxcbiAgb25IaWRlLFxuICBvblZpZXcsXG4gIG9uU2VsZWN0aW9uQ2hhbmdlLFxuICBpbml0aWFsU2VsZWN0aW9uID0ge30sXG59KSB7XG4gIGNvbnN0IFtyZWdpb25PcHRpb25zLCBzZXRSZWdpb25PcHRpb25zXSA9IHVzZVN0YXRlKFtdKTtcbiAgY29uc3QgW3NlY3Rpb25NYXAsIHNldFNlY3Rpb25NYXBdID0gdXNlU3RhdGUoe30pO1xuICBjb25zdCBbbWFwU3RlcCwgc2V0TWFwU3RlcF0gPSB1c2VTdGF0ZShcInJlZ2lvbnNcIik7XG4gIGNvbnN0IFttYXBSZWdpb24sIHNldE1hcFJlZ2lvbl0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW21hcFJvdywgc2V0TWFwUm93XSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbbWFwQ29sLCBzZXRNYXBDb2xdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFttYXBQYWxsZXQsIHNldE1hcFBhbGxldF0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW21hcEJpbiwgc2V0TWFwQmluXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbbWFwQ2VsbFBhbGxldHMsIHNldE1hcENlbGxQYWxsZXRzXSA9IHVzZVN0YXRlKHt9KTtcbiAgY29uc3QgW21hcFBhbGxldEJpbnMsIHNldE1hcFBhbGxldEJpbnNdID0gdXNlU3RhdGUoe30pO1xuICBjb25zdCBbbWFwTG9hZGluZywgc2V0TWFwTG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFttYXBFcnJvciwgc2V0TWFwRXJyb3JdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtkaXJlY3RvcnlMb2FkZWQsIHNldERpcmVjdG9yeUxvYWRlZF0gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgY29uc3Qgbm90aWZ5U2VsZWN0aW9uQ2hhbmdlID0gdXNlQ2FsbGJhY2soXG4gICAgKHNlbGVjdGlvbikgPT4ge1xuICAgICAgaWYgKHR5cGVvZiBvblNlbGVjdGlvbkNoYW5nZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIG9uU2VsZWN0aW9uQ2hhbmdlKHNlbGVjdGlvbik7XG4gICAgICB9XG4gICAgfSxcbiAgICBbb25TZWxlY3Rpb25DaGFuZ2VdXG4gICk7XG5cbiAgY29uc3QgbG9hZERpcmVjdG9yeSA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcbiAgICBpZiAoZGlyZWN0b3J5TG9hZGVkKSByZXR1cm47XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGRvYyA9IGF3YWl0IGZpcmViYXNlXG4gICAgICAgIC5maXJlc3RvcmUoKVxuICAgICAgICAuY29sbGVjdGlvbihcIldhcmVob3VzZVwiKVxuICAgICAgICAuZG9jKFwiZGlyZWN0b3J5XCIpXG4gICAgICAgIC5nZXQoKTtcbiAgICAgIGNvbnN0IGRhdGEgPSBkb2MuZGF0YSgpIHx8IHt9O1xuICAgICAgc2V0UmVnaW9uT3B0aW9ucyhkYXRhLlJlZ2lvbiB8fCBbXSk7XG4gICAgICBzZXRTZWN0aW9uTWFwKGRhdGEuU2VjdGlvbiB8fCB7fSk7XG4gICAgICBzZXREaXJlY3RvcnlMb2FkZWQodHJ1ZSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gbG9hZCBtYXAgZGlyZWN0b3J5XCIsIGVycm9yKTtcbiAgICAgIHNldE1hcEVycm9yKFwiRmFpbGVkIHRvIGxvYWQgd2FyZWhvdXNlIGRpcmVjdG9yeS5cIik7XG4gICAgfVxuICB9LCBbZGlyZWN0b3J5TG9hZGVkXSk7XG5cbiAgY29uc3QgbG9hZFJlZ2lvbkludmVudG9yeSA9IHVzZUNhbGxiYWNrKGFzeW5jIChyZWdpb25JZCkgPT4ge1xuICAgIGlmICghcmVnaW9uSWQpIHJldHVybjtcbiAgICBzZXRNYXBMb2FkaW5nKHRydWUpO1xuICAgIHNldE1hcEVycm9yKFwiXCIpO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBzbmFwID0gYXdhaXQgZmlyZWJhc2VcbiAgICAgICAgLmZpcmVzdG9yZSgpXG4gICAgICAgIC5jb2xsZWN0aW9uKFwiVGVzdFwiKVxuICAgICAgICAud2hlcmUoXCJuZXdMb2NhbEN1cnJlbnQucmVnaW9uXCIsIFwiPT1cIiwgcmVnaW9uSWQpXG4gICAgICAgIC5nZXQoKTtcblxuICAgICAgY29uc3QgY2VsbFBhbGxldHMgPSB7fTtcbiAgICAgIGNvbnN0IHBhbGxldEJpbnMgPSB7fTtcbiAgICAgIHNuYXAuZm9yRWFjaCgoZG9jKSA9PiB7XG4gICAgICAgIGNvbnN0IGxvYyA9IGRvYy5kYXRhKCk/Lm5ld0xvY2FsQ3VycmVudCB8fCB7fTtcbiAgICAgICAgbGV0IHJvdyA9IGxvYy5zZWN0aW9uPy5sZXR0ZXI7XG4gICAgICAgIGxldCBjb2wgPSBsb2Muc2VjdGlvbj8ubnVtYmVyO1xuICAgICAgICBpZiAoKCFyb3cgfHwgIWNvbCkgJiYgdHlwZW9mIGxvYy5zZWN0aW9uID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgY29uc3QgdHJpbW1lZCA9IGxvYy5zZWN0aW9uLnRyaW0oKTtcbiAgICAgICAgICByb3cgPSB0cmltbWVkLnNsaWNlKDAsIDEpO1xuICAgICAgICAgIGNvbCA9IHRyaW1tZWQuc2xpY2UoMSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbCAhPT0gdW5kZWZpbmVkICYmIGNvbCAhPT0gbnVsbCkge1xuICAgICAgICAgIGNvbCA9IFN0cmluZyhjb2wpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBhbGxldCA9IGxvYy5wYWxsZXQ7XG4gICAgICAgIGNvbnN0IGJpbiA9IGxvYy5iaW47XG4gICAgICAgIGlmICghcm93IHx8ICFjb2wpIHJldHVybjtcbiAgICAgICAgY29uc3QgY2VsbEtleSA9IGAke3Jvd30tJHtjb2x9YDtcbiAgICAgICAgaWYgKHBhbGxldCAhPT0gdW5kZWZpbmVkICYmIHBhbGxldCAhPT0gbnVsbCAmJiBgJHtwYWxsZXR9YCAhPT0gXCJcIikge1xuICAgICAgICAgIGlmICghY2VsbFBhbGxldHNbY2VsbEtleV0pIGNlbGxQYWxsZXRzW2NlbGxLZXldID0gbmV3IFNldCgpO1xuICAgICAgICAgIGNlbGxQYWxsZXRzW2NlbGxLZXldLmFkZChTdHJpbmcocGFsbGV0KSk7XG4gICAgICAgICAgaWYgKGJpbiAhPT0gdW5kZWZpbmVkICYmIGJpbiAhPT0gbnVsbCAmJiBgJHtiaW59YCAhPT0gXCJcIikge1xuICAgICAgICAgICAgY29uc3QgcGFsbGV0S2V5ID0gYCR7Y2VsbEtleX0tUCR7cGFsbGV0fWA7XG4gICAgICAgICAgICBpZiAoIXBhbGxldEJpbnNbcGFsbGV0S2V5XSkgcGFsbGV0Qmluc1twYWxsZXRLZXldID0gbmV3IFNldCgpO1xuICAgICAgICAgICAgcGFsbGV0Qmluc1twYWxsZXRLZXldLmFkZChTdHJpbmcoYmluKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgY29uc3QgY2VsbE9iaiA9IHt9O1xuICAgICAgT2JqZWN0LmtleXMoY2VsbFBhbGxldHMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICBjZWxsT2JqW2tleV0gPSBBcnJheS5mcm9tKGNlbGxQYWxsZXRzW2tleV0pLnNvcnQoXG4gICAgICAgICAgKGEsIGIpID0+IE51bWJlcihhKSAtIE51bWJlcihiKVxuICAgICAgICApO1xuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IHBhbGxldE9iaiA9IHt9O1xuICAgICAgT2JqZWN0LmtleXMocGFsbGV0QmlucykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgIHBhbGxldE9ialtrZXldID0gQXJyYXkuZnJvbShwYWxsZXRCaW5zW2tleV0pLnNvcnQoXG4gICAgICAgICAgKGEsIGIpID0+IE51bWJlcihhKSAtIE51bWJlcihiKVxuICAgICAgICApO1xuICAgICAgfSk7XG5cbiAgICAgIHNldE1hcENlbGxQYWxsZXRzKGNlbGxPYmopO1xuICAgICAgc2V0TWFwUGFsbGV0QmlucyhwYWxsZXRPYmopO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGxvYWQgbWFwIGludmVudG9yeVwiLCBlcnJvcik7XG4gICAgICBzZXRNYXBFcnJvcihcIkZhaWxlZCB0byBsb2FkIG1hcCBpbnZlbnRvcnkuXCIpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRNYXBMb2FkaW5nKGZhbHNlKTtcbiAgICB9XG4gIH0sIFtdKTtcblxuICBjb25zdCBnZXRSZWdpb25EaW1lbnNpb25zID0gdXNlQ2FsbGJhY2soXG4gICAgKHJlZ2lvbklkKSA9PiB7XG4gICAgICBjb25zdCBlbnRyeSA9IHNlY3Rpb25NYXA/LltyZWdpb25JZF07XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShlbnRyeSkgJiYgZW50cnkubGVuZ3RoID49IDIpIHtcbiAgICAgICAgY29uc3QgY29scyA9IHBhcnNlSW50KGVudHJ5WzBdLCAxMCk7XG4gICAgICAgIGNvbnN0IHJvd3MgPSBwYXJzZUludChlbnRyeVsxXSwgMTApO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGNvbHM6IE51bWJlci5pc0Zpbml0ZShjb2xzKSA/IGNvbHMgOiAwLFxuICAgICAgICAgIHJvd3M6IE51bWJlci5pc0Zpbml0ZShyb3dzKSA/IHJvd3MgOiAwLFxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHsgY29sczogMCwgcm93czogMCB9O1xuICAgIH0sXG4gICAgW3NlY3Rpb25NYXBdXG4gICk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIXNob3cpIHJldHVybjtcbiAgICBsb2FkRGlyZWN0b3J5KCk7XG4gICAgc2V0TWFwRXJyb3IoXCJcIik7XG4gICAgY29uc3Qge1xuICAgICAgcmVnaW9uLFxuICAgICAgc2VjdGlvbkxldHRlcixcbiAgICAgIHNlY3Rpb25OdW1iZXIsXG4gICAgICBwYWxsZXQsXG4gICAgICBiaW4sXG4gICAgfSA9IGluaXRpYWxTZWxlY3Rpb24gfHwge307XG5cbiAgICBzZXRNYXBSZWdpb24ocmVnaW9uIHx8IFwiXCIpO1xuICAgIHNldE1hcFJvdyhzZWN0aW9uTGV0dGVyIHx8IFwiXCIpO1xuICAgIHNldE1hcENvbChzZWN0aW9uTnVtYmVyID8gU3RyaW5nKHNlY3Rpb25OdW1iZXIpIDogXCJcIik7XG4gICAgc2V0TWFwUGFsbGV0KHBhbGxldCA/IFN0cmluZyhwYWxsZXQpIDogXCJcIik7XG4gICAgc2V0TWFwQmluKGJpbiA/IFN0cmluZyhiaW4pIDogXCJcIik7XG4gICAgc2V0TWFwU3RlcChyZWdpb24gPyBcImdyaWRcIiA6IFwicmVnaW9uc1wiKTtcbiAgICBpZiAocmVnaW9uKSBsb2FkUmVnaW9uSW52ZW50b3J5KHJlZ2lvbik7XG4gIH0sIFtzaG93LCBpbml0aWFsU2VsZWN0aW9uLCBsb2FkRGlyZWN0b3J5LCBsb2FkUmVnaW9uSW52ZW50b3J5XSk7XG5cbiAgY29uc3QgaGFuZGxlU2VsZWN0UmVnaW9uID0gKHJlZ2lvbklkKSA9PiB7XG4gICAgY29uc3Qgc2VsZWN0aW9uID0ge1xuICAgICAgcmVnaW9uOiByZWdpb25JZCxcbiAgICAgIHNlY3Rpb25MZXR0ZXI6IFwiXCIsXG4gICAgICBzZWN0aW9uTnVtYmVyOiBcIlwiLFxuICAgICAgcGFsbGV0OiBcIlwiLFxuICAgICAgYmluOiBcIlwiLFxuICAgIH07XG4gICAgc2V0TWFwUmVnaW9uKHJlZ2lvbklkKTtcbiAgICBzZXRNYXBSb3coXCJcIik7XG4gICAgc2V0TWFwQ29sKFwiXCIpO1xuICAgIHNldE1hcFBhbGxldChcIlwiKTtcbiAgICBzZXRNYXBCaW4oXCJcIik7XG4gICAgc2V0TWFwU3RlcChcImdyaWRcIik7XG4gICAgbm90aWZ5U2VsZWN0aW9uQ2hhbmdlKHNlbGVjdGlvbik7XG4gICAgbG9hZFJlZ2lvbkludmVudG9yeShyZWdpb25JZCk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlU2VsZWN0Q2VsbCA9IChyb3dMZXR0ZXIsIGNvbE51bWJlcikgPT4ge1xuICAgIGNvbnN0IGNvbFZhbHVlID0gU3RyaW5nKGNvbE51bWJlcik7XG4gICAgY29uc3Qgc2VsZWN0aW9uID0ge1xuICAgICAgcmVnaW9uOiBtYXBSZWdpb24sXG4gICAgICBzZWN0aW9uTGV0dGVyOiByb3dMZXR0ZXIsXG4gICAgICBzZWN0aW9uTnVtYmVyOiBjb2xWYWx1ZSxcbiAgICAgIHBhbGxldDogXCJcIixcbiAgICAgIGJpbjogXCJcIixcbiAgICB9O1xuICAgIHNldE1hcFJvdyhyb3dMZXR0ZXIpO1xuICAgIHNldE1hcENvbChjb2xWYWx1ZSk7XG4gICAgc2V0TWFwUGFsbGV0KFwiXCIpO1xuICAgIHNldE1hcEJpbihcIlwiKTtcbiAgICBzZXRNYXBTdGVwKFwicGFsbGV0c1wiKTtcbiAgICBub3RpZnlTZWxlY3Rpb25DaGFuZ2Uoc2VsZWN0aW9uKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVTZWxlY3RQYWxsZXQgPSAocGFsbGV0SWQpID0+IHtcbiAgICBjb25zdCBwYWxsZXRWYWx1ZSA9IFN0cmluZyhwYWxsZXRJZCk7XG4gICAgY29uc3Qgc2VsZWN0aW9uID0ge1xuICAgICAgcmVnaW9uOiBtYXBSZWdpb24sXG4gICAgICBzZWN0aW9uTGV0dGVyOiBtYXBSb3csXG4gICAgICBzZWN0aW9uTnVtYmVyOiBtYXBDb2wsXG4gICAgICBwYWxsZXQ6IHBhbGxldFZhbHVlLFxuICAgICAgYmluOiBcIlwiLFxuICAgIH07XG4gICAgc2V0TWFwUGFsbGV0KHBhbGxldFZhbHVlKTtcbiAgICBzZXRNYXBCaW4oXCJcIik7XG4gICAgc2V0TWFwU3RlcChcImJpbnNcIik7XG4gICAgbm90aWZ5U2VsZWN0aW9uQ2hhbmdlKHNlbGVjdGlvbik7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlU2VsZWN0QmluID0gKGJpbklkKSA9PiB7XG4gICAgY29uc3QgYmluVmFsdWUgPSBTdHJpbmcoYmluSWQpO1xuICAgIGNvbnN0IHNlbGVjdGlvbiA9IHtcbiAgICAgIHJlZ2lvbjogbWFwUmVnaW9uLFxuICAgICAgc2VjdGlvbkxldHRlcjogbWFwUm93LFxuICAgICAgc2VjdGlvbk51bWJlcjogbWFwQ29sLFxuICAgICAgcGFsbGV0OiBtYXBQYWxsZXQsXG4gICAgICBiaW46IGJpblZhbHVlLFxuICAgIH07XG4gICAgc2V0TWFwQmluKGJpblZhbHVlKTtcbiAgICBub3RpZnlTZWxlY3Rpb25DaGFuZ2Uoc2VsZWN0aW9uKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVCYWNrID0gKCkgPT4ge1xuICAgIGlmIChtYXBTdGVwID09PSBcImJpbnNcIikgc2V0TWFwU3RlcChcInBhbGxldHNcIik7XG4gICAgZWxzZSBpZiAobWFwU3RlcCA9PT0gXCJwYWxsZXRzXCIpIHNldE1hcFN0ZXAoXCJncmlkXCIpO1xuICAgIGVsc2UgaWYgKG1hcFN0ZXAgPT09IFwiZ3JpZFwiKSBzZXRNYXBTdGVwKFwicmVnaW9uc1wiKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVWaWV3ID0gKCkgPT4ge1xuICAgIGlmICh0eXBlb2Ygb25WaWV3ICE9PSBcImZ1bmN0aW9uXCIpIHJldHVybjtcbiAgICBvblZpZXcoe1xuICAgICAgcmVnaW9uOiBtYXBSZWdpb24sXG4gICAgICBzZWN0aW9uTGV0dGVyOiBtYXBSb3csXG4gICAgICBzZWN0aW9uTnVtYmVyOiBtYXBDb2wsXG4gICAgICBwYWxsZXQ6IG1hcFBhbGxldCxcbiAgICAgIGJpbjogbWFwQmluLFxuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPE1vZGFsIHNob3c9e3Nob3d9IG9uSGlkZT17b25IaWRlfSBjZW50ZXJlZCBzaXplPVwibGdcIj5cbiAgICAgIDxNb2RhbC5IZWFkZXIgY2xvc2VCdXR0b24+XG4gICAgICAgIDxNb2RhbC5UaXRsZT5XYXJlaG91c2UgTWFwPC9Nb2RhbC5UaXRsZT5cbiAgICAgIDwvTW9kYWwuSGVhZGVyPlxuICAgICAgPE1vZGFsLkJvZHk+XG4gICAgICAgIHttYXBMb2FkaW5nICYmIChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLm1hcExvYWRpbmd9PlxuICAgICAgICAgICAgPFNwaW5uZXIgYW5pbWF0aW9uPVwiYm9yZGVyXCIgLz5cbiAgICAgICAgICAgIDxzcGFuPkxvYWRpbmcgbWFwIGRhdGEuLi48L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9XG4gICAgICAgIHttYXBFcnJvciAmJiA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLm1hcEVycm9yfT57bWFwRXJyb3J9PC9kaXY+fVxuXG4gICAgICAgIHshbWFwTG9hZGluZyAmJiBtYXBTdGVwID09PSBcInJlZ2lvbnNcIiAmJiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5tYXBTdGFnZX0+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLm1hcEhpbnR9PlNlbGVjdCBhIHJlZ2lvbjwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5tYXBDYW52YXN9PlxuICAgICAgICAgICAgICB7UkVHSU9OX09SREVSLm1hcCgocmVnaW9uSWQpID0+IChcbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBrZXk9e3JlZ2lvbklkfVxuICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2Ake3N0eWxlcy5yZWdpb25CbG9ja30gJHtzdHlsZXNbYHJlZ2lvbiR7cmVnaW9uSWR9YF19YH1cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZVNlbGVjdFJlZ2lvbihyZWdpb25JZCl9XG4gICAgICAgICAgICAgICAgICBkaXNhYmxlZD17XG4gICAgICAgICAgICAgICAgICAgIEFycmF5LmlzQXJyYXkocmVnaW9uT3B0aW9ucykgJiZcbiAgICAgICAgICAgICAgICAgICAgcmVnaW9uT3B0aW9ucy5sZW5ndGggPiAwICYmXG4gICAgICAgICAgICAgICAgICAgICFyZWdpb25PcHRpb25zLmluY2x1ZGVzKHJlZ2lvbklkKVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIHtyZWdpb25JZH1cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cblxuICAgICAgICB7IW1hcExvYWRpbmcgJiYgbWFwU3RlcCA9PT0gXCJncmlkXCIgJiYgKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubWFwU3RhZ2V9PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5tYXBIaW50fT5cbiAgICAgICAgICAgICAgUmVnaW9uIHttYXBSZWdpb259OiBjaG9vc2UgYSByb3cgYW5kIGNvbHVtblxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB7KCgpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgZGltcyA9IGdldFJlZ2lvbkRpbWVuc2lvbnMobWFwUmVnaW9uKTtcbiAgICAgICAgICAgICAgY29uc3Qgcm93cyA9IExFVFRFUlMuc2xpY2UoMCwgZGltcy5yb3dzIHx8IDApO1xuICAgICAgICAgICAgICBjb25zdCBjb2xzID0gTlVNQkVSUy5zbGljZSgwLCBkaW1zLmNvbHMgfHwgMCk7XG4gICAgICAgICAgICAgIGlmICghcm93cy5sZW5ndGggfHwgIWNvbHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubWFwRW1wdHl9PlxuICAgICAgICAgICAgICAgICAgICBObyBncmlkIGRhdGEgZm9yIHRoaXMgcmVnaW9uLlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuZ3JpZFdyYXBwZXJ9PlxuICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5ncmlkfVxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyBcIi0tZ3JpZC1jb2xzXCI6IGNvbHMubGVuZ3RoIH19XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHtyb3dzLm1hcCgocm93KSA9PlxuICAgICAgICAgICAgICAgICAgICAgIGNvbHMubWFwKChjb2wpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNlbGxLZXkgPSBgJHtyb3d9LSR7Y29sfWA7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBoYXNQYWxsZXRzID0gQm9vbGVhbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwQ2VsbFBhbGxldHNbY2VsbEtleV0/Lmxlbmd0aFxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2NlbGxLZXl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgJHtzdHlsZXMuZ3JpZENlbGx9ICR7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNQYWxsZXRzID8gXCJcIiA6IHN0eWxlcy5ncmlkQ2VsbERpc2FibGVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc1BhbGxldHMgJiYgaGFuZGxlU2VsZWN0Q2VsbChyb3csIGNvbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFoYXNQYWxsZXRzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cm93fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2NvbH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KSgpfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuXG4gICAgICAgIHshbWFwTG9hZGluZyAmJiBtYXBTdGVwID09PSBcInBhbGxldHNcIiAmJiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5tYXBTdGFnZX0+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLm1hcEhpbnR9PlxuICAgICAgICAgICAgICBSZWdpb24ge21hcFJlZ2lvbn0gLSBTZWN0aW9uIHttYXBSb3d9XG4gICAgICAgICAgICAgIHttYXBDb2x9OiBzZWxlY3QgYSBwYWxsZXRcbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5wYWxsZXRHcmlkfT5cbiAgICAgICAgICAgICAgeyhtYXBDZWxsUGFsbGV0c1tgJHttYXBSb3d9LSR7bWFwQ29sfWBdIHx8IFtdKS5tYXAoKHBhbGxldCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBhbGxldEtleSA9IGAke21hcFJvd30tJHttYXBDb2x9LVAke3BhbGxldH1gO1xuICAgICAgICAgICAgICAgIGNvbnN0IGJpbnMgPSBtYXBQYWxsZXRCaW5zW3BhbGxldEtleV0gfHwgW107XG4gICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAga2V5PXtwYWxsZXR9XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5wYWxsZXRCdXR0b259XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoYmlucy5sZW5ndGggPT09IDAgJiYgdHlwZW9mIG9uVmlldyA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvblZpZXcoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICByZWdpb246IG1hcFJlZ2lvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2VjdGlvbkxldHRlcjogbWFwUm93LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBzZWN0aW9uTnVtYmVyOiBtYXBDb2wsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHBhbGxldDogU3RyaW5nKHBhbGxldCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJpbjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVTZWxlY3RQYWxsZXQocGFsbGV0KTtcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgUGFsbGV0IHtwYWxsZXR9XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgeyEobWFwQ2VsbFBhbGxldHNbYCR7bWFwUm93fS0ke21hcENvbH1gXSB8fCBbXSkubGVuZ3RoICYmIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLm1hcEVtcHR5fT5cbiAgICAgICAgICAgICAgICAgIE5vIHBhbGxldHMgYXZhaWxhYmxlIGhlcmUuXG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cblxuICAgICAgICB7IW1hcExvYWRpbmcgJiYgbWFwU3RlcCA9PT0gXCJiaW5zXCIgJiYgKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubWFwU3RhZ2V9PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5tYXBIaW50fT5cbiAgICAgICAgICAgICAgUmVnaW9uIHttYXBSZWdpb259IC0gU2VjdGlvbiB7bWFwUm93fVxuICAgICAgICAgICAgICB7bWFwQ29sfSAtIFBhbGxldCB7bWFwUGFsbGV0fVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnBhbGxldEdyaWR9PlxuICAgICAgICAgICAgICB7KG1hcFBhbGxldEJpbnNbYCR7bWFwUm93fS0ke21hcENvbH0tUCR7bWFwUGFsbGV0fWBdIHx8IFtdKS5tYXAoXG4gICAgICAgICAgICAgICAgKGJpbikgPT4gKFxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBrZXk9e2Jpbn1cbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YCR7c3R5bGVzLnBhbGxldEJ1dHRvbn0gJHtzdHlsZXMuYmluQnV0dG9ufWB9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZVNlbGVjdEJpbihiaW4pfVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICBCaW4ge2Jpbn1cbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgeyEobWFwUGFsbGV0Qmluc1tgJHttYXBSb3d9LSR7bWFwQ29sfS1QJHttYXBQYWxsZXR9YF0gfHwgW10pXG4gICAgICAgICAgICAgICAgLmxlbmd0aCAmJiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5tYXBFbXB0eX0+XG4gICAgICAgICAgICAgICAgICBObyBiaW5zIGF2YWlsYWJsZSBvbiB0aGlzIHBhbGxldC5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuICAgICAgPC9Nb2RhbC5Cb2R5PlxuICAgICAgPE1vZGFsLkZvb3RlciBjbGFzc05hbWU9e3N0eWxlcy5tYXBGb290ZXJ9PlxuICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgdmFyaWFudD1cIm91dGxpbmUtc2Vjb25kYXJ5XCJcbiAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVCYWNrfVxuICAgICAgICAgIGRpc2FibGVkPXttYXBTdGVwID09PSBcInJlZ2lvbnNcIn1cbiAgICAgICAgPlxuICAgICAgICAgIEJhY2tcbiAgICAgICAgPC9CdXR0b24+XG4gICAgICAgIDxCdXR0b24gdmFyaWFudD1cIm91dGxpbmUtcHJpbWFyeVwiIG9uQ2xpY2s9e2hhbmRsZVZpZXd9PlxuICAgICAgICAgIFZpZXdcbiAgICAgICAgPC9CdXR0b24+XG4gICAgICAgIDxCdXR0b24gdmFyaWFudD1cInNlY29uZGFyeVwiIG9uQ2xpY2s9e29uSGlkZX0+XG4gICAgICAgICAgQ2xvc2VcbiAgICAgICAgPC9CdXR0b24+XG4gICAgICA8L01vZGFsLkZvb3Rlcj5cbiAgICA8L01vZGFsPlxuICApO1xufVxuIiwidmFyIGFwaSA9IHJlcXVpcmUoXCIhLi4vbm9kZV9tb2R1bGVzL25leHQvZGlzdC9idWlsZC93ZWJwYWNrL2xvYWRlcnMvbmV4dC1zdHlsZS1sb2FkZXIvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIik7XG4gICAgICAgICAgICB2YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uL25vZGVfbW9kdWxlcy9uZXh0L2Rpc3QvY29tcGlsZWQvY3NzLWxvYWRlci9janMuanM/P3JlZi0tNS1vbmVPZi0yLTEhLi4vbm9kZV9tb2R1bGVzL25leHQvZGlzdC9jb21waWxlZC9wb3N0Y3NzLWxvYWRlci9janMuanM/P3JlZi0tNS1vbmVPZi0yLTIhLi9XYXJlaG91c2VNYXBNb2RhbC5tb2R1bGUuY3NzXCIpO1xuXG4gICAgICAgICAgICBjb250ZW50ID0gY29udGVudC5fX2VzTW9kdWxlID8gY29udGVudC5kZWZhdWx0IDogY29udGVudDtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgICAgICAgICB9XG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuaW5zZXJ0ID0gZnVuY3Rpb24oZWxlbWVudCl7Ly8gVGhlc2UgZWxlbWVudHMgc2hvdWxkIGFsd2F5cyBleGlzdC4gSWYgdGhleSBkbyBub3QsXG4vLyB0aGlzIGNvZGUgc2hvdWxkIGZhaWwuXG52YXIgYW5jaG9yRWxlbWVudD1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjX19uZXh0X2Nzc19fRE9fTk9UX1VTRV9fJyk7dmFyIHBhcmVudE5vZGU9YW5jaG9yRWxlbWVudC5wYXJlbnROb2RlOy8vIE5vcm1hbGx5IDxoZWFkPlxuLy8gRWFjaCBzdHlsZSB0YWcgc2hvdWxkIGJlIHBsYWNlZCByaWdodCBiZWZvcmUgb3VyXG4vLyBhbmNob3IuIEJ5IGluc2VydGluZyBiZWZvcmUgYW5kIG5vdCBhZnRlciwgd2UgZG8gbm90XG4vLyBuZWVkIHRvIHRyYWNrIHRoZSBsYXN0IGluc2VydGVkIGVsZW1lbnQuXG5wYXJlbnROb2RlLmluc2VydEJlZm9yZShlbGVtZW50LGFuY2hvckVsZW1lbnQpO307XG5vcHRpb25zLnNpbmdsZXRvbiA9IGZhbHNlO1xuXG52YXIgdXBkYXRlID0gYXBpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cbmlmIChtb2R1bGUuaG90KSB7XG4gIGlmICghY29udGVudC5sb2NhbHMgfHwgbW9kdWxlLmhvdC5pbnZhbGlkYXRlKSB7XG4gICAgdmFyIGlzRXF1YWxMb2NhbHMgPSBmdW5jdGlvbiBpc0VxdWFsTG9jYWxzKGEsYixpc05hbWVkRXhwb3J0KXtpZighYSYmYnx8YSYmIWIpe3JldHVybiBmYWxzZTt9bGV0IHA7Zm9yKHAgaW4gYSl7aWYoaXNOYW1lZEV4cG9ydCYmcD09PSdkZWZhdWx0Jyl7Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnRpbnVlXG5jb250aW51ZTt9aWYoYVtwXSE9PWJbcF0pe3JldHVybiBmYWxzZTt9fWZvcihwIGluIGIpe2lmKGlzTmFtZWRFeHBvcnQmJnA9PT0nZGVmYXVsdCcpey8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb250aW51ZVxuY29udGludWU7fWlmKCFhW3BdKXtyZXR1cm4gZmFsc2U7fX1yZXR1cm4gdHJ1ZTt9O1xuICAgIHZhciBvbGRMb2NhbHMgPSBjb250ZW50LmxvY2FscztcblxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KFxuICAgICAgXCIhIS4uL25vZGVfbW9kdWxlcy9uZXh0L2Rpc3QvY29tcGlsZWQvY3NzLWxvYWRlci9janMuanM/P3JlZi0tNS1vbmVPZi0yLTEhLi4vbm9kZV9tb2R1bGVzL25leHQvZGlzdC9jb21waWxlZC9wb3N0Y3NzLWxvYWRlci9janMuanM/P3JlZi0tNS1vbmVPZi0yLTIhLi9XYXJlaG91c2VNYXBNb2RhbC5tb2R1bGUuY3NzXCIsXG4gICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2NvbXBpbGVkL2Nzcy1sb2FkZXIvY2pzLmpzPz9yZWYtLTUtb25lT2YtMi0xIS4uL25vZGVfbW9kdWxlcy9uZXh0L2Rpc3QvY29tcGlsZWQvcG9zdGNzcy1sb2FkZXIvY2pzLmpzPz9yZWYtLTUtb25lT2YtMi0yIS4vV2FyZWhvdXNlTWFwTW9kYWwubW9kdWxlLmNzc1wiKTtcblxuICAgICAgICAgICAgICBjb250ZW50ID0gY29udGVudC5fX2VzTW9kdWxlID8gY29udGVudC5kZWZhdWx0IDogY29udGVudDtcblxuICAgICAgICAgICAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaWYgKCFpc0VxdWFsTG9jYWxzKG9sZExvY2FscywgY29udGVudC5sb2NhbHMpKSB7XG4gICAgICAgICAgICAgICAgbW9kdWxlLmhvdC5pbnZhbGlkYXRlKCk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBvbGRMb2NhbHMgPSBjb250ZW50LmxvY2FscztcblxuICAgICAgICAgICAgICB1cGRhdGUoY29udGVudCk7XG4gICAgICB9XG4gICAgKVxuICB9XG5cbiAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkge1xuICAgIHVwZGF0ZSgpO1xuICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscyB8fCB7fTsiLCIvLyBJbXBvcnRzXG52YXIgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fID0gcmVxdWlyZShcIi4uL25vZGVfbW9kdWxlcy9uZXh0L2Rpc3QvY29tcGlsZWQvY3NzLWxvYWRlci9hcGkuanNcIik7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18odHJ1ZSk7XG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiQGltcG9ydCB1cmwoaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1TcGFjZStHcm90ZXNrOndnaHRANDAwOzYwMCZkaXNwbGF5PXN3YXApO1wiXSk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIuV2FyZWhvdXNlTWFwTW9kYWxfbWFwTG9hZGluZ19fVGNoX3Qge1xcbiAgZGlzcGxheTogLW1vei1ib3g7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgLW1vei1ib3gtYWxpZ246IGNlbnRlcjtcXG4gICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGdyaWQtZ2FwOiAxMnB4O1xcbiAgZ2FwOiAxMnB4O1xcbiAgY29sb3I6ICM2NDc0OGI7XFxuICBwYWRkaW5nOiAxMnB4IDA7XFxufVxcblxcbi5XYXJlaG91c2VNYXBNb2RhbF9tYXBFcnJvcl9fMUJjV2kge1xcbiAgY29sb3I6ICNiOTFjMWM7XFxuICBmb250LXdlaWdodDogNjAwO1xcbiAgbWFyZ2luLWJvdHRvbTogMTJweDtcXG59XFxuXFxuLldhcmVob3VzZU1hcE1vZGFsX21hcFN0YWdlX18xa3dnOSB7XFxuICBkaXNwbGF5OiAtbW96LWJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICAtbW96LWJveC1vcmllbnQ6IHZlcnRpY2FsO1xcbiAgLW1vei1ib3gtZGlyZWN0aW9uOiBub3JtYWw7XFxuICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBncmlkLWdhcDogMTRweDtcXG4gIGdhcDogMTRweDtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiU3BhY2UgR3JvdGVza1xcXCIsIFxcXCJTZWdvZSBVSVxcXCIsIHNhbnMtc2VyaWY7XFxufVxcblxcbi5XYXJlaG91c2VNYXBNb2RhbF9tYXBIaW50X19xM3VRYyB7XFxuICBmb250LXdlaWdodDogNjAwO1xcbiAgY29sb3I6ICMwZjE3MmE7XFxufVxcblxcbi5XYXJlaG91c2VNYXBNb2RhbF9tYXBDYW52YXNfX3NYZnY3IHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGJhY2tncm91bmQ6ICM4NmM4MmU7XFxuICBib3JkZXItcmFkaXVzOiAxOHB4O1xcbiAgcGFkZGluZzogMTRweDtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg3LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoNiwgMWZyKTtcXG4gIGdyaWQtZ2FwOiAxMHB4O1xcbiAgZ2FwOiAxMHB4O1xcbiAgbWluLWhlaWdodDogMjQwcHg7XFxuICAtd2Via2l0LWJveC1zaGFkb3c6IGluc2V0IDAgMCAwIDFweCByZ2JhKDE1LCAyMywgNDIsIDAuMDgpO1xcbiAgICAgICAgICBib3gtc2hhZG93OiBpbnNldCAwIDAgMCAxcHggcmdiYSgxNSwgMjMsIDQyLCAwLjA4KTtcXG59XFxuXFxuLldhcmVob3VzZU1hcE1vZGFsX3JlZ2lvbkJsb2NrX18xWFVsTSB7XFxuICBib3JkZXI6IG5vbmU7XFxuICBib3JkZXItcmFkaXVzOiAxNHB4O1xcbiAgYmFja2dyb3VuZDogI2M2MjgyODtcXG4gIGNvbG9yOiAjZmZmZmZmO1xcbiAgZm9udC1zaXplOiAxLjRyZW07XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgZGlzcGxheTogLW1vei1ib3g7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgLW1vei1ib3gtYWxpZ246IGNlbnRlcjtcXG4gICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIC1tb3otYm94LXBhY2s6IGNlbnRlcjtcXG4gICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAtd2Via2l0LXRyYW5zaXRpb246IC13ZWJraXQtdHJhbnNmb3JtIDAuMTVzIGVhc2UsIC13ZWJraXQtYm94LXNoYWRvdyAwLjE1cyBlYXNlO1xcbiAgdHJhbnNpdGlvbjogLXdlYmtpdC10cmFuc2Zvcm0gMC4xNXMgZWFzZSwgLXdlYmtpdC1ib3gtc2hhZG93IDAuMTVzIGVhc2U7XFxuICAtbW96LXRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjE1cyBlYXNlLCBib3gtc2hhZG93IDAuMTVzIGVhc2UsIC1tb3otdHJhbnNmb3JtIDAuMTVzIGVhc2U7XFxuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4xNXMgZWFzZSwgYm94LXNoYWRvdyAwLjE1cyBlYXNlO1xcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuMTVzIGVhc2UsIGJveC1zaGFkb3cgMC4xNXMgZWFzZSwgLXdlYmtpdC10cmFuc2Zvcm0gMC4xNXMgZWFzZSwgLW1vei10cmFuc2Zvcm0gMC4xNXMgZWFzZSwgLXdlYmtpdC1ib3gtc2hhZG93IDAuMTVzIGVhc2U7XFxuICAtd2Via2l0LWJveC1zaGFkb3c6IDAgMTBweCAyMHB4IHJnYmEoMTUsIDIzLCA0MiwgMC4xNSk7XFxuICAgICAgICAgIGJveC1zaGFkb3c6IDAgMTBweCAyMHB4IHJnYmEoMTUsIDIzLCA0MiwgMC4xNSk7XFxufVxcblxcbi5XYXJlaG91c2VNYXBNb2RhbF9yZWdpb25CbG9ja19fMVhVbE06ZGlzYWJsZWQge1xcbiAgb3BhY2l0eTogMC40NTtcXG4gIGN1cnNvcjogbm90LWFsbG93ZWQ7XFxufVxcblxcbi5XYXJlaG91c2VNYXBNb2RhbF9yZWdpb25CbG9ja19fMVhVbE06bm90KDpkaXNhYmxlZCk6aG92ZXIge1xcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTFweCk7XFxuICAgICAtbW96LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMXB4KTtcXG4gICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xcHgpO1xcbn1cXG5cXG4uV2FyZWhvdXNlTWFwTW9kYWxfcmVnaW9uRV9fMXVWQXYgeyBncmlkLWNvbHVtbjogMSAvIDI7IGdyaWQtcm93OiAxIC8gNzsgfVxcbi5XYXJlaG91c2VNYXBNb2RhbF9yZWdpb25GX18yR2hjcyB7IGdyaWQtY29sdW1uOiAyIC8gMzsgZ3JpZC1yb3c6IDEgLyA3OyB9XFxuLldhcmVob3VzZU1hcE1vZGFsX3JlZ2lvbkdfXzJJVG9xIHsgZ3JpZC1jb2x1bW46IDMgLyA0OyBncmlkLXJvdzogMSAvIDc7IH1cXG4uV2FyZWhvdXNlTWFwTW9kYWxfcmVnaW9uQV9fM1BuMFogeyBncmlkLWNvbHVtbjogNCAvIDc7IGdyaWQtcm93OiA0IC8gNzsgfVxcbi5XYXJlaG91c2VNYXBNb2RhbF9yZWdpb25EX19JY3lDbyB7IGdyaWQtY29sdW1uOiA0IC8gNzsgZ3JpZC1yb3c6IDMgLyA0OyB9XFxuLldhcmVob3VzZU1hcE1vZGFsX3JlZ2lvbkNfXzNsTnEyIHsgZ3JpZC1jb2x1bW46IDQgLyA3OyBncmlkLXJvdzogMSAvIDM7IH1cXG4uV2FyZWhvdXNlTWFwTW9kYWxfcmVnaW9uQl9fM0J5d18geyBncmlkLWNvbHVtbjogNyAvIDg7IGdyaWQtcm93OiAzIC8gNzsgfVxcblxcbi5XYXJlaG91c2VNYXBNb2RhbF9ncmlkV3JhcHBlcl9fMXQzd04ge1xcbiAgZGlzcGxheTogLW1vei1ib3g7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgLW1vei1ib3gtb3JpZW50OiB2ZXJ0aWNhbDtcXG4gIC1tb3otYm94LWRpcmVjdGlvbjogbm9ybWFsO1xcbiAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgZ3JpZC1nYXA6IDEycHg7XFxuICBnYXA6IDEycHg7XFxuICBvdmVyZmxvdy14OiBhdXRvO1xcbn1cXG5cXG4uV2FyZWhvdXNlTWFwTW9kYWxfZ3JpZF9fMUJDOXgge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KHZhcigtLWdyaWQtY29scywgMTApLCBtaW5tYXgoNDRweCwgMWZyKSk7XFxuICBncmlkLWdhcDogOHB4O1xcbiAgZ2FwOiA4cHg7XFxuICBtaW4td2lkdGg6IC13ZWJraXQtbWluLWNvbnRlbnQ7XFxuICBtaW4td2lkdGg6IC1tb3otbWluLWNvbnRlbnQ7XFxuICBtaW4td2lkdGg6IG1pbi1jb250ZW50O1xcbn1cXG5cXG4uV2FyZWhvdXNlTWFwTW9kYWxfZ3JpZENlbGxfXzFEUzJWIHtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICNlMmU4ZjA7XFxuICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcXG4gIHBhZGRpbmc6IDEwcHggNnB4O1xcbiAgZm9udC13ZWlnaHQ6IDYwMDtcXG4gIGNvbG9yOiAjMGYxNzJhO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiAwIDZweCAxNnB4IHJnYmEoMTUsIDIzLCA0MiwgMC4wOCk7XFxuICAgICAgICAgIGJveC1zaGFkb3c6IDAgNnB4IDE2cHggcmdiYSgxNSwgMjMsIDQyLCAwLjA4KTtcXG59XFxuXFxuLldhcmVob3VzZU1hcE1vZGFsX2dyaWRDZWxsRGlzYWJsZWRfXzFuNTRDIHtcXG4gIG9wYWNpdHk6IDAuNDtcXG4gIGN1cnNvcjogbm90LWFsbG93ZWQ7XFxufVxcblxcbi5XYXJlaG91c2VNYXBNb2RhbF9wYWxsZXRHcmlkX18yOGVNTCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoYXV0by1maXQsIG1pbm1heCgxMjBweCwgMWZyKSk7XFxuICBncmlkLWdhcDogMTBweDtcXG4gIGdhcDogMTBweDtcXG59XFxuXFxuLldhcmVob3VzZU1hcE1vZGFsX3BhbGxldEJ1dHRvbl9fTnVNbjAge1xcbiAgYm9yZGVyOiAxcHggc29saWQgI2UyZThmMDtcXG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XFxuICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xcbiAgcGFkZGluZzogMTBweCAxMnB4O1xcbiAgZm9udC13ZWlnaHQ6IDYwMDtcXG4gIGNvbG9yOiAjMGYxNzJhO1xcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiAwIDhweCAxOHB4IHJnYmEoMTUsIDIzLCA0MiwgMC4wOCk7XFxuICAgICAgICAgIGJveC1zaGFkb3c6IDAgOHB4IDE4cHggcmdiYSgxNSwgMjMsIDQyLCAwLjA4KTtcXG59XFxuXFxuLldhcmVob3VzZU1hcE1vZGFsX2JpbkJ1dHRvbl9fMjh5bkIge1xcbiAgYmFja2dyb3VuZDogIzBmMTcyYTtcXG4gIGNvbG9yOiAjZmZmZmZmO1xcbn1cXG5cXG4uV2FyZWhvdXNlTWFwTW9kYWxfbWFwRW1wdHlfXzJoaVVpIHtcXG4gIGNvbG9yOiAjOTRhM2I4O1xcbiAgZm9udC13ZWlnaHQ6IDYwMDtcXG59XFxuXFxuLldhcmVob3VzZU1hcE1vZGFsX21hcEZvb3Rlcl9fMW8wUmkge1xcbiAgLW1vei1ib3gtcGFjazoganVzdGlmeTtcXG4gICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgZ3JpZC1nYXA6IDEycHg7XFxuICBnYXA6IDEycHg7XFxufVxcblxcbkBtZWRpYSAobWF4LXdpZHRoOiA2MDBweCkge1xcbiAgLldhcmVob3VzZU1hcE1vZGFsX21hcENhbnZhc19fc1hmdjcge1xcbiAgICBtaW4taGVpZ2h0OiAyMDBweDtcXG4gIH1cXG5cXG4gIC5XYXJlaG91c2VNYXBNb2RhbF9yZWdpb25CbG9ja19fMVhVbE0ge1xcbiAgICBmb250LXNpemU6IDEuMXJlbTtcXG4gIH1cXG5cXG4gIC5XYXJlaG91c2VNYXBNb2RhbF9tYXBGb290ZXJfXzFvMFJpIC5idG4ge1xcbiAgICAtbW96LWJveC1mbGV4OiAxO1xcbiAgICAgICAgIGZsZXg6IDEgMTtcXG4gIH1cXG59XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovL2NvbXBvbmVudHMvV2FyZWhvdXNlTWFwTW9kYWwubW9kdWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFFQTtFQUNFLGlCQUFhO0VBQWIsYUFBYTtFQUNiLHNCQUFtQjtPQUFuQixtQkFBbUI7RUFDbkIsY0FBUztFQUFULFNBQVM7RUFDVCxjQUFjO0VBQ2QsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLGNBQWM7RUFDZCxnQkFBZ0I7RUFDaEIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsaUJBQWE7RUFBYixhQUFhO0VBQ2IseUJBQXNCO0VBQXRCLDBCQUFzQjtPQUF0QixzQkFBc0I7RUFDdEIsY0FBUztFQUFULFNBQVM7RUFDVCxvREFBb0Q7QUFDdEQ7O0FBRUE7RUFDRSxnQkFBZ0I7RUFDaEIsY0FBYztBQUNoQjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixtQkFBbUI7RUFDbkIsbUJBQW1CO0VBQ25CLGFBQWE7RUFDYixhQUFhO0VBQ2IscUNBQXFDO0VBQ3JDLGtDQUFrQztFQUNsQyxjQUFTO0VBQVQsU0FBUztFQUNULGlCQUFpQjtFQUNqQiwwREFBa0Q7VUFBbEQsa0RBQWtEO0FBQ3BEOztBQUVBO0VBQ0UsWUFBWTtFQUNaLG1CQUFtQjtFQUNuQixtQkFBbUI7RUFDbkIsY0FBYztFQUNkLGlCQUFpQjtFQUNqQixnQkFBZ0I7RUFDaEIsaUJBQWE7RUFBYixhQUFhO0VBQ2Isc0JBQW1CO09BQW5CLG1CQUFtQjtFQUNuQixxQkFBdUI7T0FBdkIsdUJBQXVCO0VBQ3ZCLCtFQUF1RDtFQUF2RCx1RUFBdUQ7RUFBdkQsdUZBQXVEO0VBQXZELHVEQUF1RDtFQUF2RCwrSUFBdUQ7RUFDdkQsc0RBQThDO1VBQTlDLDhDQUE4QztBQUNoRDs7QUFFQTtFQUNFLGFBQWE7RUFDYixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxtQ0FBMkI7S0FBM0IsZ0NBQTJCO1VBQTNCLDJCQUEyQjtBQUM3Qjs7QUFFQSxvQ0FBVyxrQkFBa0IsRUFBRSxlQUFlLEVBQUU7QUFDaEQsb0NBQVcsa0JBQWtCLEVBQUUsZUFBZSxFQUFFO0FBQ2hELG9DQUFXLGtCQUFrQixFQUFFLGVBQWUsRUFBRTtBQUNoRCxvQ0FBVyxrQkFBa0IsRUFBRSxlQUFlLEVBQUU7QUFDaEQsb0NBQVcsa0JBQWtCLEVBQUUsZUFBZSxFQUFFO0FBQ2hELG9DQUFXLGtCQUFrQixFQUFFLGVBQWUsRUFBRTtBQUNoRCxvQ0FBVyxrQkFBa0IsRUFBRSxlQUFlLEVBQUU7O0FBRWhEO0VBQ0UsaUJBQWE7RUFBYixhQUFhO0VBQ2IseUJBQXNCO0VBQXRCLDBCQUFzQjtPQUF0QixzQkFBc0I7RUFDdEIsY0FBUztFQUFULFNBQVM7RUFDVCxnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxhQUFhO0VBQ2Isc0VBQXNFO0VBQ3RFLGFBQVE7RUFBUixRQUFRO0VBQ1IsOEJBQXNCO0VBQXRCLDJCQUFzQjtFQUF0QixzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSx5QkFBeUI7RUFDekIsbUJBQW1CO0VBQ25CLG1CQUFtQjtFQUNuQixpQkFBaUI7RUFDakIsZ0JBQWdCO0VBQ2hCLGNBQWM7RUFDZCxrQkFBa0I7RUFDbEIscURBQTZDO1VBQTdDLDZDQUE2QztBQUMvQzs7QUFFQTtFQUNFLFlBQVk7RUFDWixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsMkRBQTJEO0VBQzNELGNBQVM7RUFBVCxTQUFTO0FBQ1g7O0FBRUE7RUFDRSx5QkFBeUI7RUFDekIsbUJBQW1CO0VBQ25CLG1CQUFtQjtFQUNuQixrQkFBa0I7RUFDbEIsZ0JBQWdCO0VBQ2hCLGNBQWM7RUFDZCxxREFBNkM7VUFBN0MsNkNBQTZDO0FBQy9DOztBQUVBO0VBQ0UsbUJBQW1CO0VBQ25CLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxjQUFjO0VBQ2QsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0Usc0JBQThCO09BQTlCLDhCQUE4QjtFQUM5QixjQUFTO0VBQVQsU0FBUztBQUNYOztBQUVBO0VBQ0U7SUFDRSxpQkFBaUI7RUFDbkI7O0VBRUE7SUFDRSxpQkFBaUI7RUFDbkI7O0VBRUE7SUFDRSxnQkFBTztTQUFQLFNBQU87RUFDVDtBQUNGXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIkBpbXBvcnQgdXJsKFxcXCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PVNwYWNlK0dyb3Rlc2s6d2dodEA0MDA7NjAwJmRpc3BsYXk9c3dhcFxcXCIpO1xcblxcbi5tYXBMb2FkaW5nIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZ2FwOiAxMnB4O1xcbiAgY29sb3I6ICM2NDc0OGI7XFxuICBwYWRkaW5nOiAxMnB4IDA7XFxufVxcblxcbi5tYXBFcnJvciB7XFxuICBjb2xvcjogI2I5MWMxYztcXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XFxuICBtYXJnaW4tYm90dG9tOiAxMnB4O1xcbn1cXG5cXG4ubWFwU3RhZ2Uge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBnYXA6IDE0cHg7XFxuICBmb250LWZhbWlseTogXFxcIlNwYWNlIEdyb3Rlc2tcXFwiLCBcXFwiU2Vnb2UgVUlcXFwiLCBzYW5zLXNlcmlmO1xcbn1cXG5cXG4ubWFwSGludCB7XFxuICBmb250LXdlaWdodDogNjAwO1xcbiAgY29sb3I6ICMwZjE3MmE7XFxufVxcblxcbi5tYXBDYW52YXMge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgYmFja2dyb3VuZDogIzg2YzgyZTtcXG4gIGJvcmRlci1yYWRpdXM6IDE4cHg7XFxuICBwYWRkaW5nOiAxNHB4O1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDcsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCg2LCAxZnIpO1xcbiAgZ2FwOiAxMHB4O1xcbiAgbWluLWhlaWdodDogMjQwcHg7XFxuICBib3gtc2hhZG93OiBpbnNldCAwIDAgMCAxcHggcmdiYSgxNSwgMjMsIDQyLCAwLjA4KTtcXG59XFxuXFxuLnJlZ2lvbkJsb2NrIHtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGJvcmRlci1yYWRpdXM6IDE0cHg7XFxuICBiYWNrZ3JvdW5kOiAjYzYyODI4O1xcbiAgY29sb3I6ICNmZmZmZmY7XFxuICBmb250LXNpemU6IDEuNHJlbTtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuMTVzIGVhc2UsIGJveC1zaGFkb3cgMC4xNXMgZWFzZTtcXG4gIGJveC1zaGFkb3c6IDAgMTBweCAyMHB4IHJnYmEoMTUsIDIzLCA0MiwgMC4xNSk7XFxufVxcblxcbi5yZWdpb25CbG9jazpkaXNhYmxlZCB7XFxuICBvcGFjaXR5OiAwLjQ1O1xcbiAgY3Vyc29yOiBub3QtYWxsb3dlZDtcXG59XFxuXFxuLnJlZ2lvbkJsb2NrOm5vdCg6ZGlzYWJsZWQpOmhvdmVyIHtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMXB4KTtcXG59XFxuXFxuLnJlZ2lvbkUgeyBncmlkLWNvbHVtbjogMSAvIDI7IGdyaWQtcm93OiAxIC8gNzsgfVxcbi5yZWdpb25GIHsgZ3JpZC1jb2x1bW46IDIgLyAzOyBncmlkLXJvdzogMSAvIDc7IH1cXG4ucmVnaW9uRyB7IGdyaWQtY29sdW1uOiAzIC8gNDsgZ3JpZC1yb3c6IDEgLyA3OyB9XFxuLnJlZ2lvbkEgeyBncmlkLWNvbHVtbjogNCAvIDc7IGdyaWQtcm93OiA0IC8gNzsgfVxcbi5yZWdpb25EIHsgZ3JpZC1jb2x1bW46IDQgLyA3OyBncmlkLXJvdzogMyAvIDQ7IH1cXG4ucmVnaW9uQyB7IGdyaWQtY29sdW1uOiA0IC8gNzsgZ3JpZC1yb3c6IDEgLyAzOyB9XFxuLnJlZ2lvbkIgeyBncmlkLWNvbHVtbjogNyAvIDg7IGdyaWQtcm93OiAzIC8gNzsgfVxcblxcbi5ncmlkV3JhcHBlciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGdhcDogMTJweDtcXG4gIG92ZXJmbG93LXg6IGF1dG87XFxufVxcblxcbi5ncmlkIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCh2YXIoLS1ncmlkLWNvbHMsIDEwKSwgbWlubWF4KDQ0cHgsIDFmcikpO1xcbiAgZ2FwOiA4cHg7XFxuICBtaW4td2lkdGg6IG1pbi1jb250ZW50O1xcbn1cXG5cXG4uZ3JpZENlbGwge1xcbiAgYm9yZGVyOiAxcHggc29saWQgI2UyZThmMDtcXG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7XFxuICBib3JkZXItcmFkaXVzOiAxMHB4O1xcbiAgcGFkZGluZzogMTBweCA2cHg7XFxuICBmb250LXdlaWdodDogNjAwO1xcbiAgY29sb3I6ICMwZjE3MmE7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBib3gtc2hhZG93OiAwIDZweCAxNnB4IHJnYmEoMTUsIDIzLCA0MiwgMC4wOCk7XFxufVxcblxcbi5ncmlkQ2VsbERpc2FibGVkIHtcXG4gIG9wYWNpdHk6IDAuNDtcXG4gIGN1cnNvcjogbm90LWFsbG93ZWQ7XFxufVxcblxcbi5wYWxsZXRHcmlkIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdChhdXRvLWZpdCwgbWlubWF4KDEyMHB4LCAxZnIpKTtcXG4gIGdhcDogMTBweDtcXG59XFxuXFxuLnBhbGxldEJ1dHRvbiB7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjZTJlOGYwO1xcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcXG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7XFxuICBwYWRkaW5nOiAxMHB4IDEycHg7XFxuICBmb250LXdlaWdodDogNjAwO1xcbiAgY29sb3I6ICMwZjE3MmE7XFxuICBib3gtc2hhZG93OiAwIDhweCAxOHB4IHJnYmEoMTUsIDIzLCA0MiwgMC4wOCk7XFxufVxcblxcbi5iaW5CdXR0b24ge1xcbiAgYmFja2dyb3VuZDogIzBmMTcyYTtcXG4gIGNvbG9yOiAjZmZmZmZmO1xcbn1cXG5cXG4ubWFwRW1wdHkge1xcbiAgY29sb3I6ICM5NGEzYjg7XFxuICBmb250LXdlaWdodDogNjAwO1xcbn1cXG5cXG4ubWFwRm9vdGVyIHtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIGdhcDogMTJweDtcXG59XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDYwMHB4KSB7XFxuICAubWFwQ2FudmFzIHtcXG4gICAgbWluLWhlaWdodDogMjAwcHg7XFxuICB9XFxuXFxuICAucmVnaW9uQmxvY2sge1xcbiAgICBmb250LXNpemU6IDEuMXJlbTtcXG4gIH1cXG5cXG4gIC5tYXBGb290ZXIgOmdsb2JhbCguYnRuKSB7XFxuICAgIGZsZXg6IDE7XFxuICB9XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ubG9jYWxzID0ge1xuXHRcIm1hcExvYWRpbmdcIjogXCJXYXJlaG91c2VNYXBNb2RhbF9tYXBMb2FkaW5nX19UY2hfdFwiLFxuXHRcIm1hcEVycm9yXCI6IFwiV2FyZWhvdXNlTWFwTW9kYWxfbWFwRXJyb3JfXzFCY1dpXCIsXG5cdFwibWFwU3RhZ2VcIjogXCJXYXJlaG91c2VNYXBNb2RhbF9tYXBTdGFnZV9fMWt3ZzlcIixcblx0XCJtYXBIaW50XCI6IFwiV2FyZWhvdXNlTWFwTW9kYWxfbWFwSGludF9fcTN1UWNcIixcblx0XCJtYXBDYW52YXNcIjogXCJXYXJlaG91c2VNYXBNb2RhbF9tYXBDYW52YXNfX3NYZnY3XCIsXG5cdFwicmVnaW9uQmxvY2tcIjogXCJXYXJlaG91c2VNYXBNb2RhbF9yZWdpb25CbG9ja19fMVhVbE1cIixcblx0XCJyZWdpb25FXCI6IFwiV2FyZWhvdXNlTWFwTW9kYWxfcmVnaW9uRV9fMXVWQXZcIixcblx0XCJyZWdpb25GXCI6IFwiV2FyZWhvdXNlTWFwTW9kYWxfcmVnaW9uRl9fMkdoY3NcIixcblx0XCJyZWdpb25HXCI6IFwiV2FyZWhvdXNlTWFwTW9kYWxfcmVnaW9uR19fMklUb3FcIixcblx0XCJyZWdpb25BXCI6IFwiV2FyZWhvdXNlTWFwTW9kYWxfcmVnaW9uQV9fM1BuMFpcIixcblx0XCJyZWdpb25EXCI6IFwiV2FyZWhvdXNlTWFwTW9kYWxfcmVnaW9uRF9fSWN5Q29cIixcblx0XCJyZWdpb25DXCI6IFwiV2FyZWhvdXNlTWFwTW9kYWxfcmVnaW9uQ19fM2xOcTJcIixcblx0XCJyZWdpb25CXCI6IFwiV2FyZWhvdXNlTWFwTW9kYWxfcmVnaW9uQl9fM0J5d19cIixcblx0XCJncmlkV3JhcHBlclwiOiBcIldhcmVob3VzZU1hcE1vZGFsX2dyaWRXcmFwcGVyX18xdDN3TlwiLFxuXHRcImdyaWRcIjogXCJXYXJlaG91c2VNYXBNb2RhbF9ncmlkX18xQkM5eFwiLFxuXHRcImdyaWRDZWxsXCI6IFwiV2FyZWhvdXNlTWFwTW9kYWxfZ3JpZENlbGxfXzFEUzJWXCIsXG5cdFwiZ3JpZENlbGxEaXNhYmxlZFwiOiBcIldhcmVob3VzZU1hcE1vZGFsX2dyaWRDZWxsRGlzYWJsZWRfXzFuNTRDXCIsXG5cdFwicGFsbGV0R3JpZFwiOiBcIldhcmVob3VzZU1hcE1vZGFsX3BhbGxldEdyaWRfXzI4ZU1MXCIsXG5cdFwicGFsbGV0QnV0dG9uXCI6IFwiV2FyZWhvdXNlTWFwTW9kYWxfcGFsbGV0QnV0dG9uX19OdU1uMFwiLFxuXHRcImJpbkJ1dHRvblwiOiBcIldhcmVob3VzZU1hcE1vZGFsX2JpbkJ1dHRvbl9fMjh5bkJcIixcblx0XCJtYXBFbXB0eVwiOiBcIldhcmVob3VzZU1hcE1vZGFsX21hcEVtcHR5X18yaGlVaVwiLFxuXHRcIm1hcEZvb3RlclwiOiBcIldhcmVob3VzZU1hcE1vZGFsX21hcEZvb3Rlcl9fMW8wUmlcIlxufTtcbm1vZHVsZS5leHBvcnRzID0gX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSwgdXNlUmVmLCB1c2VDYWxsYmFjayB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHtcbiAgSW5wdXRHcm91cCxcbiAgRHJvcGRvd24sXG4gIEZvcm1Db250cm9sLFxuICBCdXR0b24sXG4gIE5hdkRyb3Bkb3duLFxuICBGb3JtLFxuICBNb2RhbCxcbiAgUGFnaW5hdGlvbixcbiAgT2ZmY2FudmFzLFxufSBmcm9tIFwicmVhY3QtYm9vdHN0cmFwXCI7XG5pbXBvcnQgTGluayBmcm9tIFwibmV4dC9saW5rXCI7XG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tIFwibmV4dC9yb3V0ZXJcIjtcbmltcG9ydCB7XG4gIGZldGNoUGFydHNXaXRoTWFjaGluZURhdGFQYWdlLFxuICBmZXRjaENsaWVudHMsXG4gIGZldGNoTW9kZWxzLFxufSBmcm9tIFwiLi4vLi4vdXRpbHMvZmV0Y2hBc3NvY2lhdGlvbnNcIjtcbmltcG9ydCB7IHVzZUF1dGggfSBmcm9tIFwiLi4vLi4vY29udGV4dC9BdXRoVXNlckNvbnRleHRcIjtcclxuaW1wb3J0IExvZ2dlZEluIGZyb20gXCIuLi9Mb2dnZWRJblwiO1xyXG5pbXBvcnQgQ2xpZW50VGFibGUgZnJvbSBcIi4uLy4uL3V0aWxzL0NsaWVudFRhYmxlXCI7XG5pbXBvcnQgTW9kZWxUYWJsZSBmcm9tIFwiLi4vLi4vdXRpbHMvTW9kZWxUYWJsZVwiO1xuaW1wb3J0IFBhcnRUYWJsZSBmcm9tIFwiLi4vLi4vdXRpbHMvUGFydFRhYmxlXCI7XG5pbXBvcnQgc3R5bGVzIGZyb20gXCIuLi8uLi9zdHlsZXMvTWFpblNlYXJjaC5tb2R1bGUuY3NzXCI7XG5pbXBvcnQgZmlyZWJhc2UgZnJvbSBcIi4uLy4uL2NvbnRleHQvRmlyZWJhc2VcIjtcbmltcG9ydCB7IGJ1aWxkTmFtZVRva2VucyB9IGZyb20gXCIuLi8uLi91dGlscy9pdGVtRm9ybVNoYXJlZFwiO1xuaW1wb3J0IFdhcmVob3VzZU1hcE1vZGFsIGZyb20gXCIuLi8uLi9jb21wb25lbnRzL1dhcmVob3VzZU1hcE1vZGFsXCI7XG5cclxuLy8gUHJlZGVmaW5lZCB3YXJlaG91c2UgY2xpZW50IElEcyBhbmQgZGlzcGxheSBuYW1lc1xyXG5jb25zdCBTT0NBTF9DTElFTlRfSUQgPSBcIkFJUzE3MTgyXCI7XHJcbmNvbnN0IE5PUkNBTF9DTElFTlRfSUQgPSBcIkFJUzI1MDk3XCI7XG5jb25zdCBVTkFTU0lHTkVEX0NMSUVOVF9JRCA9IFwiQUlTMDA0MDRcIjtcbmNvbnN0IERFRkFVTFRfUEFHRV9TSVpFID0gMjU7XG5cclxuXHJcbi8vIFNpbXVsYXRlcyBhIG5ldHdvcmsgcmVxdWVzdCBkZWxheVxyXG5mdW5jdGlvbiBzaW11bGF0ZU5ldHdvcmtSZXF1ZXN0KCkge1xyXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gc2V0VGltZW91dChyZXNvbHZlLCAyMDAwKSk7XHJcbn1cclxuXHJcbi8vIEN1c3RvbSBMb2FkaW5nQnV0dG9uIGNvbXBvbmVudFxyXG5mdW5jdGlvbiBMb2FkaW5nQnV0dG9uKHsgdHlwZSwgbmFtZSwgcm91dGUsIGNsYXNzTmFtZSB9KSB7XG4gIGNvbnN0IFtpc0xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKGlzTG9hZGluZykge1xuICAgICAgbGV0IGNhbmNlbGxlZCA9IGZhbHNlO1xuICAgICAgc2ltdWxhdGVOZXR3b3JrUmVxdWVzdCgpLnRoZW4oKCkgPT4ge1xuICAgICAgICBpZiAoIWNhbmNlbGxlZCkgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGNhbmNlbGxlZCA9IHRydWU7XG4gICAgICB9O1xuICAgIH1cbiAgfSwgW2lzTG9hZGluZ10pO1xuXHJcbiAgcmV0dXJuIChcbiAgICA8TGluayBocmVmPXtgLyR7cm91dGV9YH0+XG4gICAgICA8YVxuICAgICAgICBjbGFzc05hbWU9e2BidG4gYnRuLSR7dHlwZX0gJHtjbGFzc05hbWUgfHwgXCJcIn1gfVxuICAgICAgICBkaXNhYmxlZD17aXNMb2FkaW5nfVxuICAgICAgICBvbkNsaWNrPXsoKSA9PiAhaXNMb2FkaW5nICYmIHNldExvYWRpbmcodHJ1ZSl9XG4gICAgICA+XG4gICAgICAgIHtpc0xvYWRpbmcgPyBcIkxvYWRpbmfigKZcIiA6IG5hbWV9XHJcbiAgICAgIDwvYT5cclxuICAgIDwvTGluaz5cclxuICApO1xyXG59XHJcblxyXG4vLyAtLS0tIERBVEUgSEVMUEVSUyAodG9wLWxldmVsIHNjb3BlKSAtLS0tXHJcblxyXG4vLyBDb252ZXJ0IGFueXRoaW5nIGRhdGUtaXNoIGludG8gYSB0aW1lc3RhbXAgKG1zIHNpbmNlIGVwb2NoKS5cclxuZnVuY3Rpb24gdG9UaW1lKHZhbHVlKSB7XHJcbiAgaWYgKCF2YWx1ZSkgcmV0dXJuIG51bGw7XHJcblxyXG4gIC8vIEZpcmVzdG9yZSBUaW1lc3RhbXAgeyBzZWNvbmRzLCBuYW5vc2Vjb25kcyB9XHJcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZS5zZWNvbmRzICE9IG51bGwpIHtcclxuICAgIHRyeSB7IHJldHVybiB2YWx1ZS5zZWNvbmRzICogMTAwMDsgfSBjYXRjaCB7IC8qIGlnbm9yZSAqLyB9XHJcbiAgfVxyXG5cclxuICAvLyBOYXRpdmUgRGF0ZVxyXG4gIGlmICh2YWx1ZSBpbnN0YW5jZW9mIERhdGUpIHtcclxuICAgIGNvbnN0IHQgPSB2YWx1ZS5nZXRUaW1lKCk7XHJcbiAgICByZXR1cm4gaXNOYU4odCkgPyBudWxsIDogdDtcclxuICB9XHJcblxyXG4gIC8vIFN0cmluZ3NcclxuICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAvLyBJU08gLyB5eXl5LW1tLWRkXHJcbiAgICBjb25zdCBpc28gPSBEYXRlLnBhcnNlKHZhbHVlKTtcclxuICAgIGlmICghaXNOYU4oaXNvKSkgcmV0dXJuIGlzbztcclxuXHJcbiAgICAvLyBtbS9kZC95eXl5XHJcbiAgICBjb25zdCBwYXJ0cyA9IHZhbHVlLnNwbGl0KFwiL1wiKTtcclxuICAgIGlmIChwYXJ0cy5sZW5ndGggPT09IDMpIHtcclxuICAgICAgY29uc3QgW21tLCBkZCwgeXl5eV0gPSBwYXJ0cztcclxuICAgICAgY29uc3QgYWx0ID0gRGF0ZS5wYXJzZShgJHt5eXl5fS0ke21tfS0ke2RkfWApO1xyXG4gICAgICBpZiAoIWlzTmFOKGFsdCkpIHJldHVybiBhbHQ7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBMYXN0IHJlc29ydFxyXG4gIGNvbnN0IHQgPSBEYXRlLnBhcnNlKHZhbHVlKTtcclxuICByZXR1cm4gaXNOYU4odCkgPyBudWxsIDogdDtcclxufVxyXG5cclxuLy8gQ2Fub25pY2FsaXplIHRvICd5eXl5LW1tLWRkJyAobWF0Y2hlcyA8aW5wdXQgdHlwZT1cImRhdGVcIj4pXHJcbmZ1bmN0aW9uIHRvWU1EKHZhbHVlKSB7XG4gIGNvbnN0IHQgPSB0b1RpbWUodmFsdWUpO1xuICBpZiAodCA9PSBudWxsKSByZXR1cm4gbnVsbDtcbiAgY29uc3QgZCA9IG5ldyBEYXRlKHQpO1xuICBjb25zdCB5eXl5ID0gZC5nZXRGdWxsWWVhcigpO1xuICBjb25zdCBtbSA9IFN0cmluZyhkLmdldE1vbnRoKCkgKyAxKS5wYWRTdGFydCgyLCBcIjBcIik7XG4gIGNvbnN0IGRkID0gU3RyaW5nKGQuZ2V0RGF0ZSgpKS5wYWRTdGFydCgyLCBcIjBcIik7XG4gIHJldHVybiBgJHt5eXl5fS0ke21tfS0ke2RkfWA7XG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZVRleHQodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09IG51bGwpIHJldHVybiBcIlwiO1xuICByZXR1cm4gU3RyaW5nKHZhbHVlKS50b0xvd2VyQ2FzZSgpLnRyaW0oKTtcbn1cblxuZnVuY3Rpb24gZ2V0TWFjaGluZUZpZWxkKGl0ZW0sIGtleSkge1xuICBpZiAoIWl0ZW0pIHJldHVybiBudWxsO1xuICBjb25zdCBsb3dlciA9IGtleS50b0xvd2VyQ2FzZSgpO1xuICByZXR1cm4gKFxuICAgIGl0ZW0/Lm1hY2hpbmVEYXRhPy5ba2V5XSA/P1xuICAgIGl0ZW0/Lm1hY2hpbmVEYXRhPy5bbG93ZXJdID8/XG4gICAgaXRlbT8uY3VycmVudE1hY2hpbmVEYXRhPy5ba2V5XSA/P1xuICAgIGl0ZW0/LmN1cnJlbnRNYWNoaW5lRGF0YT8uW2xvd2VyXSA/P1xuICAgIGl0ZW0/LnRoZU1hY2hpbmVEYXRhPy5ba2V5XSA/P1xuICAgIGl0ZW0/LnRoZU1hY2hpbmVEYXRhPy5bbG93ZXJdID8/XG4gICAgaXRlbT8uVGhlTWFjaGluZT8uW2tleV0gPz9cbiAgICBpdGVtPy5UaGVNYWNoaW5lPy5bbG93ZXJdID8/XG4gICAgbnVsbFxuICApO1xufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIE1haW5TZWFyY2goKSB7XG4gIGNvbnN0IHsgc2lnbk91dCB9ID0gdXNlQXV0aCgpO1xyXG4gIGNvbnN0IFtpbmZvLCBzZXRJbmZvXSA9IHVzZVN0YXRlKFtdKTtcclxuICBjb25zdCBbYmFja3VwSW5mbywgc2V0QmFja3VwSW5mb10gPSB1c2VTdGF0ZShbXSk7XHJcbiAgY29uc3QgW2F1Z21lbnRlZEluZm8sIHNldEF1Z21lbnRlZEluZm9dID0gdXNlU3RhdGUoW10pOyAvLyBpdGVtcyB3aXRoIGNsaWVudEZyb21JZC9jdXJyZW50SWQgYWRkZWRcclxuICBjb25zdCBbaXNMb2FkaW5nLCBzZXRJc0xvYWRpbmddID0gdXNlU3RhdGUodHJ1ZSk7XHJcbiAgY29uc3QgW2lkcywgc2V0SURdID0gdXNlU3RhdGUoW10pO1xuICBjb25zdCBbc2hvdywgc2V0U2hvd10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtzaG93RmlsdGVycywgc2V0U2hvd0ZpbHRlcnNdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbcGFnZVNpemUsIHNldFBhZ2VTaXplXSA9IHVzZVN0YXRlKERFRkFVTFRfUEFHRV9TSVpFKTtcbiAgY29uc3QgW2lzTmF2aWdhdGluZywgc2V0SXNOYXZpZ2F0aW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2RJdGVtLCBzZXRESXRlbV0gPSB1c2VTdGF0ZSgpO1xyXG4gIGNvbnN0IFtzZWxlY3QsIHNldFNlbGVjdF0gPSB1c2VTdGF0ZShcIk5hbWVcIik7XHJcbiAgY29uc3QgW3Nob3dMaXN0LCBzZXRTaG93TGlzdF0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW3Nob3dMaXN0U2VhcmNoLCBzZXRTaG93TGlzdFNlYXJjaF0gPSB1c2VTdGF0ZShcInRleHRcIik7XHJcbiAgY29uc3QgW3NlYXJjaCwgc2V0U2VhcmNoXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtzZWxlY3RlZE9FTSwgc2V0U2VsZWN0ZWRPRU1dID0gdXNlU3RhdGUobnVsbCk7XHJcbiAgY29uc3QgW3NlbGVjdGVkTW9kYWxpdHksIHNldFNlbGVjdGVkTW9kYWxpdHldID0gdXNlU3RhdGUobnVsbCk7XHJcbiAgLy8gUmVwbGFjZSB0aGUgb2xkIHNpbmdsZSBjbGllbnQgc3RhdGUgd2l0aCB0d28gc2V0czpcclxuICBjb25zdCBbc2VsZWN0ZWRDbGllbnRGcm9tLCBzZXRTZWxlY3RlZENsaWVudEZyb21dID0gdXNlU3RhdGUobnVsbCk7XHJcbiAgY29uc3QgW2NsaWVudEZyb21CdXR0b25UZXh0LCBzZXRDbGllbnRGcm9tQnV0dG9uVGV4dF0gPSB1c2VTdGF0ZShcIlNlbGVjdCBPcHRpb25cIik7XHJcbiAgY29uc3QgW3NlbGVjdGVkQ2xpZW50Q3VycmVudCwgc2V0U2VsZWN0ZWRDbGllbnRDdXJyZW50XSA9IHVzZVN0YXRlKG51bGwpO1xyXG4gIGNvbnN0IFtjbGllbnRDdXJyZW50QnV0dG9uVGV4dCwgc2V0Q2xpZW50Q3VycmVudEJ1dHRvblRleHRdID0gdXNlU3RhdGUoXCJTZWxlY3QgT3B0aW9uXCIpO1xyXG5cclxuICBjb25zdCBbY2xpZW50cywgc2V0Q2xpZW50c10gPSB1c2VTdGF0ZShbXSk7XG4gIGNvbnN0IFtzaG93Q2xpZW50TW9kYWwsIHNldFNob3dDbGllbnRNb2RhbF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIC8vIFRoaXMgc3RhdGUgdGVsbHMgdGhlIG1vZGFsIHdoaWNoIGNsaWVudCBib3ggaXMgYmVpbmcgdXBkYXRlZDogXCJmcm9tXCIgb3IgXCJjdXJyZW50XCJcbiAgY29uc3QgW2NsaWVudFNlbGVjdGlvblR5cGUsIHNldENsaWVudFNlbGVjdGlvblR5cGVdID0gdXNlU3RhdGUobnVsbCk7XG4gIGNvbnN0IFtzaG93TWFwLCBzZXRTaG93TWFwXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxyXG4gIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpO1xyXG4gIGNvbnN0IGxhYmVsQmFzZSA9IFtcIm5hbWVcIiwgXCJkYXRlXCIsIFwidy9vXCIsIFwicC9uXCIsIFwicy9uXCJdO1xyXG4gIGNvbnN0IGxhYmVsQmFzZU5hbWVzID0gW1wibmFtZVwiLCBcImRhdGVcIiwgXCJ3b1wiLCBcInBuXCIsIFwic25cIl07XHJcbiAgY29uc3Qgc29ydENoZWNrQmFzZSA9IFtmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlXTtcclxuXHJcbiAgZnVuY3Rpb24gd2l0aFNvcnRJY29uKGJhc2VMYWJlbHMsIGFjdGl2ZUluZGV4LCBpc0Rlc2MpIHtcclxuICAgIHJldHVybiBiYXNlTGFiZWxzLm1hcCgodGV4dCwgaSkgPT4ge1xyXG4gICAgICBpZiAoaSAhPT0gYWN0aXZlSW5kZXgpIHJldHVybiB0ZXh0OyAvLyB1bnRvdWNoZWRcclxuICAgICAgY29uc3QgYXJyb3cgPSBpc0Rlc2MgPyBcIiDilrxcIiA6IFwiIOKWslwiO1xyXG4gICAgICByZXR1cm4gYCR7dGV4dH0ke2Fycm93fWA7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG5cclxuICBjb25zdCBbbGFiZWxzLCBzZXRMYWJlbHNdID0gdXNlU3RhdGUobGFiZWxCYXNlKTtcclxuICBjb25zdCBbc29ydENoZWNrLCBzZXRTb3J0Q2hlY2tdID0gdXNlU3RhdGUoc29ydENoZWNrQmFzZSk7XHJcbiAgY29uc3QgW2hvdmVySW5kZXgsIHNldEhvdmVySW5kZXhdID0gdXNlU3RhdGUobnVsbCk7XHJcbiAgY29uc3QgW3NlbGVjdGVkTW9kZWwsIHNldFNlbGVjdGVkTW9kZWxdID0gdXNlU3RhdGUobnVsbCk7XHJcbiAgY29uc3QgW2dQb3MsIHNldEdQb3NdID0gdXNlU3RhdGUobnVsbCk7XG4gIGNvbnN0IFtnSWRlLCBzZXRHSWRlXSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbaXNEZWxldGluZywgc2V0SXNEZWxldGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtwYWdlLCBzZXRQYWdlXSA9IHVzZVN0YXRlKDEpO1xuICBjb25zdCBbcGFnZUN1cnNvcnMsIHNldFBhZ2VDdXJzb3JzXSA9IHVzZVN0YXRlKFtdKTtcbiAgY29uc3QgW2hhc05leHRQYWdlLCBzZXRIYXNOZXh0UGFnZV0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IGZldGNoU2VxID0gdXNlUmVmKDApO1xuICBjb25zdCBiYWNrZmlsbEluRmxpZ2h0ID0gdXNlUmVmKGZhbHNlKTtcbiAgY29uc3QgW3F1ZXJ5RXBvY2gsIHNldFF1ZXJ5RXBvY2hdID0gdXNlU3RhdGUoMCk7XG4gIGNvbnN0IFtsb2FkRXJyb3IsIHNldExvYWRFcnJvcl0gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgdGFibGVCb2R5UmVmID0gdXNlUmVmKG51bGwpO1xuICBjb25zdCByb3dIZWlnaHRSZWYgPSB1c2VSZWYoNDYpO1xuICBjb25zdCBoZWFkZXJIZWlnaHRSZWYgPSB1c2VSZWYoMzgpO1xuXG4gIGNvbnN0IExPQURfVElNRU9VVF9NUyA9IDMwMDAwO1xuICBjb25zdCBvcGVuTWFwID0gKCkgPT4gc2V0U2hvd01hcCh0cnVlKTtcblxuICBjb25zdCBoYW5kbGVNYXBWaWV3ID0gdXNlQ2FsbGJhY2soXG4gICAgKHNlbGVjdGlvbiA9IHt9KSA9PiB7XG4gICAgICBjb25zdCBwYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKCk7XG4gICAgICBjb25zdCB7XG4gICAgICAgIHJlZ2lvbixcbiAgICAgICAgc2VjdGlvbkxldHRlcixcbiAgICAgICAgc2VjdGlvbk51bWJlcixcbiAgICAgICAgcGFsbGV0LFxuICAgICAgICBiaW4sXG4gICAgICB9ID0gc2VsZWN0aW9uO1xuXG4gICAgICBpZiAocmVnaW9uKSBwYXJhbXMuc2V0KFwicmVnaW9uXCIsIHJlZ2lvbik7XG4gICAgICBpZiAoc2VjdGlvbkxldHRlcikgcGFyYW1zLnNldChcInNlY3Rpb25MZXR0ZXJcIiwgc2VjdGlvbkxldHRlcik7XG4gICAgICBpZiAoc2VjdGlvbk51bWJlcikgcGFyYW1zLnNldChcInNlY3Rpb25OdW1iZXJcIiwgc2VjdGlvbk51bWJlcik7XG4gICAgICBpZiAocGFsbGV0KSBwYXJhbXMuc2V0KFwicGFsbGV0XCIsIHBhbGxldCk7XG4gICAgICBpZiAoYmluKSBwYXJhbXMuc2V0KFwiYmluXCIsIGJpbik7XG5cbiAgICAgIGNvbnN0IHF1ZXJ5ID0gcGFyYW1zLnRvU3RyaW5nKCk7XG4gICAgICByb3V0ZXIucHVzaChcbiAgICAgICAgYC9OZXdTZWFyY2gvaW52ZW50b3J5L2ludmVudG9yeU1hbmFnZSR7cXVlcnkgPyBgPyR7cXVlcnl9YCA6IFwiXCJ9YFxuICAgICAgKTtcbiAgICAgIHNldFNob3dNYXAoZmFsc2UpO1xuICAgIH0sXG4gICAgW3JvdXRlcl1cbiAgKTtcblxuICBjb25zdCBzdGFydE5hbWVUb2tlbkJhY2tmaWxsID0gdXNlQ2FsbGJhY2soYXN5bmMgKHJlYXNvbiA9IFwiXCIpID0+IHtcbiAgICBpZiAoYmFja2ZpbGxJbkZsaWdodC5jdXJyZW50KSByZXR1cm47XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIGNvbnN0IGxhc3RSdW4gPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJuYW1lVG9rZW5zQmFja2ZpbGxBdFwiKTtcbiAgICAgIGlmIChsYXN0UnVuICYmIERhdGUubm93KCkgLSBOdW1iZXIobGFzdFJ1bikgPCAyNCAqIDYwICogNjAgKiAxMDAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBiYWNrZmlsbEluRmxpZ2h0LmN1cnJlbnQgPSB0cnVlO1xuICAgIGNvbnN0IGRiID0gZmlyZWJhc2UuZmlyZXN0b3JlKCk7XG4gICAgbGV0IGxhc3REb2MgPSBudWxsO1xuXG4gICAgY29uc3QgdG9rZW5zRXF1YWwgPSAoYSwgYikgPT4ge1xuICAgICAgaWYgKGEubGVuZ3RoICE9PSBiLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuICAgICAgY29uc3Qgc2V0QSA9IG5ldyBTZXQoYSk7XG4gICAgICBjb25zdCBzZXRCID0gbmV3IFNldChiKTtcbiAgICAgIGlmIChzZXRBLnNpemUgIT09IHNldEIuc2l6ZSkgcmV0dXJuIGZhbHNlO1xuICAgICAgZm9yIChjb25zdCB2IG9mIHNldEEpIGlmICghc2V0Qi5oYXModikpIHJldHVybiBmYWxzZTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG5cbiAgICB0cnkge1xuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgbGV0IHF1ZXJ5ID0gZGJcbiAgICAgICAgICAuY29sbGVjdGlvbihcIlRlc3RcIilcbiAgICAgICAgICAub3JkZXJCeShmaXJlYmFzZS5maXJlc3RvcmUuRmllbGRQYXRoLmRvY3VtZW50SWQoKSlcbiAgICAgICAgICAubGltaXQoMjAwKTtcbiAgICAgICAgaWYgKGxhc3REb2MpIHF1ZXJ5ID0gcXVlcnkuc3RhcnRBZnRlcihsYXN0RG9jKTtcblxuICAgICAgICBjb25zdCBzbmFwID0gYXdhaXQgcXVlcnkuZ2V0KCk7XG4gICAgICAgIGlmIChzbmFwLmVtcHR5KSBicmVhaztcblxuICAgICAgICBjb25zdCBiYXRjaCA9IGRiLmJhdGNoKCk7XG4gICAgICAgIGxldCB3cml0ZXMgPSAwO1xuXG4gICAgICAgIHNuYXAuZG9jcy5mb3JFYWNoKChkb2MpID0+IHtcbiAgICAgICAgICBjb25zdCBkYXRhID0gZG9jLmRhdGEoKSB8fCB7fTtcbiAgICAgICAgICBjb25zdCBuYW1lID0gdHlwZW9mIGRhdGEubmFtZSA9PT0gXCJzdHJpbmdcIiA/IGRhdGEubmFtZSA6IFwiXCI7XG4gICAgICAgICAgY29uc3QgbmFtZUxvd2VyID0gbmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgIGNvbnN0IG5hbWVUb2tlbnMgPSBidWlsZE5hbWVUb2tlbnMobmFtZSk7XG4gICAgICAgICAgY29uc3QgZXhpc3RpbmdUb2tlbnMgPSBBcnJheS5pc0FycmF5KGRhdGEubmFtZVRva2VucylcbiAgICAgICAgICAgID8gQXJyYXkuZnJvbShuZXcgU2V0KGRhdGEubmFtZVRva2Vucy5tYXAoKHYpID0+IFN0cmluZyh2KSkpKVxuICAgICAgICAgICAgOiBbXTtcblxuICAgICAgICAgIGNvbnN0IG5lZWRzVXBkYXRlID1cbiAgICAgICAgICAgIGRhdGEubmFtZUxvd2VyICE9PSBuYW1lTG93ZXIgfHxcbiAgICAgICAgICAgICF0b2tlbnNFcXVhbChleGlzdGluZ1Rva2VucywgbmFtZVRva2Vucyk7XG5cbiAgICAgICAgICBpZiAobmVlZHNVcGRhdGUpIHtcbiAgICAgICAgICAgIGJhdGNoLnVwZGF0ZShkb2MucmVmLCB7IG5hbWVMb3dlciwgbmFtZVRva2VucyB9KTtcbiAgICAgICAgICAgIHdyaXRlcyArPSAxO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHdyaXRlcyA+IDApIHtcbiAgICAgICAgICBhd2FpdCBiYXRjaC5jb21taXQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxhc3REb2MgPSBzbmFwLmRvY3Nbc25hcC5kb2NzLmxlbmd0aCAtIDFdO1xuICAgICAgICBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gc2V0VGltZW91dChyZXNvbHZlLCAyNSkpO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oXG4gICAgICAgICAgXCJuYW1lVG9rZW5zQmFja2ZpbGxBdFwiLFxuICAgICAgICAgIFN0cmluZyhEYXRlLm5vdygpKVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiTmFtZSB0b2tlbiBiYWNrZmlsbCBmYWlsZWQ6XCIsIHJlYXNvbiwgZXJyb3IpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBiYWNrZmlsbEluRmxpZ2h0LmN1cnJlbnQgPSBmYWxzZTtcbiAgICB9XG4gIH0sIFtdKTtcblxuICBjb25zdCBzZWFyY2hMb3dlciA9IChzZWFyY2ggfHwgXCJcIikudG9Mb3dlckNhc2UoKS50cmltKCk7XG4gIGNvbnN0IGhhc0FjdGl2ZUZpbHRlcnMgPVxuICAgIEJvb2xlYW4oc2VsZWN0ZWRPRU0pIHx8XG4gICAgQm9vbGVhbihzZWxlY3RlZE1vZGFsaXR5KSB8fFxuICAgIEJvb2xlYW4oc2VsZWN0ZWRNb2RlbCkgfHxcbiAgICBCb29sZWFuKHNlbGVjdGVkQ2xpZW50RnJvbSkgfHxcbiAgICBCb29sZWFuKHNlbGVjdGVkQ2xpZW50Q3VycmVudCkgfHxcbiAgICBCb29sZWFuKHNlYXJjaExvd2VyKTtcblxuICBjb25zdCB2YWx1ZU1hdGNoZXMgPSAodmFsdWUsIHMpID0+IHtcbiAgICBpZiAoIXZhbHVlKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICByZXR1cm4gdmFsdWUuc29tZSgodikgPT4gdmFsdWVNYXRjaGVzKHYsIHMpKTtcbiAgICB9XG4gICAgcmV0dXJuIFN0cmluZyh2YWx1ZSkudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhzKTtcbiAgfTtcblxuICBjb25zdCBtYXRjaGVzRmlsdGVycyA9IHVzZUNhbGxiYWNrKFxuICAgIChpdGVtKSA9PiB7XG4gICAgICAvLyBoaWRlIGV4cGxpY2l0bHkgaGlkZGVuIGl0ZW1zXG4gICAgICBpZiAoaXRlbT8udmlzaWJsZSA9PT0gZmFsc2UpIHJldHVybiBmYWxzZTtcblxuICAgICAgLy8gT0VNIC8gTW9kYWxpdHkgLyBNb2RlbCBmaWx0ZXJpbmdcbiAgICAgIGNvbnN0IE9FTSA9IGdldE1hY2hpbmVGaWVsZChpdGVtLCBcIk9FTVwiKTtcbiAgICAgIGNvbnN0IE1vZGFsaXR5ID0gZ2V0TWFjaGluZUZpZWxkKGl0ZW0sIFwiTW9kYWxpdHlcIik7XG4gICAgICBjb25zdCBNb2RlbCA9IGdldE1hY2hpbmVGaWVsZChpdGVtLCBcIk1vZGVsXCIpO1xuXG4gICAgICBpZiAoc2VsZWN0ZWRPRU0gJiYgbm9ybWFsaXplVGV4dChPRU0pICE9PSBub3JtYWxpemVUZXh0KHNlbGVjdGVkT0VNKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoXG4gICAgICAgIHNlbGVjdGVkTW9kYWxpdHkgJiZcbiAgICAgICAgbm9ybWFsaXplVGV4dChNb2RhbGl0eSkgIT09IG5vcm1hbGl6ZVRleHQoc2VsZWN0ZWRNb2RhbGl0eSlcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoc2VsZWN0ZWRNb2RlbCAmJiBub3JtYWxpemVUZXh0KE1vZGVsKSAhPT0gbm9ybWFsaXplVGV4dChzZWxlY3RlZE1vZGVsKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIC8vIENsaWVudCBmaWx0ZXJzXG4gICAgICBpZiAoc2VsZWN0ZWRDbGllbnRGcm9tICYmIGl0ZW0/LmNsaWVudEZyb21JZCAhPT0gc2VsZWN0ZWRDbGllbnRGcm9tKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmIChcbiAgICAgICAgc2VsZWN0ZWRDbGllbnRDdXJyZW50ICYmXG4gICAgICAgIGl0ZW0/LmNsaWVudEN1cnJlbnRJZCAhPT0gc2VsZWN0ZWRDbGllbnRDdXJyZW50XG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICAvLyBTZWFyY2hcbiAgICAgIGlmIChzZWFyY2hMb3dlcikge1xuICAgICAgICBpZiAoc2VsZWN0ID09PSBcIk5hbWVcIikge1xuICAgICAgICAgIHJldHVybiB2YWx1ZU1hdGNoZXMoaXRlbT8ubmFtZSwgc2VhcmNoTG93ZXIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzZWxlY3QgPT09IFwiRGF0ZVwiKSB7XG4gICAgICAgICAgY29uc3Qgd2FudGVkRGF5ID0gc2VhcmNoTG93ZXI7IC8vIHl5eXktbW0tZGQgZnJvbSBpbnB1dFxuICAgICAgICAgIGNvbnN0IGl0ZW1ZTUQgPSB0b1lNRChpdGVtPy5kYXRlKTtcbiAgICAgICAgICBpZiAoaXRlbVlNRCAmJiBpdGVtWU1EID09PSB3YW50ZWREYXkpIHJldHVybiB0cnVlO1xuICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGl0ZW0/LmRlc2NyaXB0aW9ucykpIHtcbiAgICAgICAgICAgIGlmIChpdGVtLmRlc2NyaXB0aW9ucy5zb21lKChkKSA9PiB0b1lNRChkPy5kYXRlKSA9PT0gd2FudGVkRGF5KSkge1xuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoaXRlbT8ud29ya09yZGVycykpIHtcbiAgICAgICAgICAgIGlmIChpdGVtLndvcmtPcmRlcnMuc29tZSgodykgPT4gdG9ZTUQodz8uZGF0ZSkgPT09IHdhbnRlZERheSkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2VsZWN0ID09PSBcIldvcmsgT3JkZXJcIikge1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBBcnJheS5pc0FycmF5KGl0ZW0/LndvcmtPcmRlcnMpICYmXG4gICAgICAgICAgICBpdGVtLndvcmtPcmRlcnMuc29tZSgod28pID0+XG4gICAgICAgICAgICAgIHZhbHVlTWF0Y2hlcyh3bz8ud29ya09yZGVyLCBzZWFyY2hMb3dlcilcbiAgICAgICAgICAgIClcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzZWxlY3QgPT09IFwiUHJvZHVjdCBOdW1iZXJcIikge1xuICAgICAgICAgIHJldHVybiB2YWx1ZU1hdGNoZXMoaXRlbT8ucG4sIHNlYXJjaExvd2VyKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2VsZWN0ID09PSBcIlNlcmlhbCBOdW1iZXJcIikge1xuICAgICAgICAgIHJldHVybiB2YWx1ZU1hdGNoZXMoaXRlbT8uc24sIHNlYXJjaExvd2VyKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2VsZWN0ID09PSBcIkRlc2NyaXB0aW9uXCIpIHtcbiAgICAgICAgICBpZiAodmFsdWVNYXRjaGVzKGl0ZW0/LmRlc2MsIHNlYXJjaExvd2VyKSkgcmV0dXJuIHRydWU7XG4gICAgICAgICAgaWYgKHZhbHVlTWF0Y2hlcyhpdGVtPy5kZXNjcmlwdGlvbiwgc2VhcmNoTG93ZXIpKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShpdGVtPy5kZXNjcmlwdGlvbnMpKSB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbS5kZXNjcmlwdGlvbnMuc29tZSgoZCkgPT5cbiAgICAgICAgICAgICAgdmFsdWVNYXRjaGVzKGQ/LmRlc2NyaXB0aW9uLCBzZWFyY2hMb3dlcilcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2VsZWN0ID09PSBcIlNLVVwiKSB7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIHZhbHVlTWF0Y2hlcyhpdGVtPy5pZCwgc2VhcmNoTG93ZXIpIHx8XG4gICAgICAgICAgICB2YWx1ZU1hdGNoZXMoaXRlbT8ubG9jYWxTTiwgc2VhcmNoTG93ZXIpIHx8XG4gICAgICAgICAgICB2YWx1ZU1hdGNoZXMoaXRlbT8ubG9jYWxfc24sIHNlYXJjaExvd2VyKVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcbiAgICBbXG4gICAgICBzZWxlY3RlZE9FTSxcbiAgICAgIHNlbGVjdGVkTW9kYWxpdHksXG4gICAgICBzZWxlY3RlZE1vZGVsLFxuICAgICAgc2VsZWN0ZWRDbGllbnRGcm9tLFxuICAgICAgc2VsZWN0ZWRDbGllbnRDdXJyZW50LFxuICAgICAgc2VhcmNoTG93ZXIsXG4gICAgICBzZWxlY3QsXG4gICAgXVxuICApO1xuXG4gIGNvbnN0IHJlc2V0UGFnaW5hdGlvbiA9ICgpID0+IHtcbiAgICBzZXRQYWdlKDEpO1xuICAgIHNldFBhZ2VDdXJzb3JzKFtdKTtcbiAgICBzZXRIYXNOZXh0UGFnZShmYWxzZSk7XG4gIH07XG5cbiAgLy8gUmVzZXQgcGFnaW5hdGlvbiBvbiByb3V0ZS9xdWVyeSBjaGFuZ2UgKHByZXZlbnRzIHN0YWxlIHBhZ2VzIGxpa2Ug4oCcc3RhcnRpbmcgYXQgNuKAnSlcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICByZXNldFBhZ2luYXRpb24oKTtcbiAgICBzZXRRdWVyeUVwb2NoKCh2KSA9PiB2ICsgMSk7XG4gIH0sIFtyb3V0ZXIuYXNQYXRoXSk7XG5cbiAgLy8gUmVzZXQgYW5kIHJlZmV0Y2ggd2hlbiBmaWx0ZXJzL3NlYXJjaCBjaGFuZ2VcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICByZXNldFBhZ2luYXRpb24oKTtcbiAgICBzZXRRdWVyeUVwb2NoKCh2KSA9PiB2ICsgMSk7XG4gIH0sIFtcbiAgICBzZWxlY3RlZE9FTSxcbiAgICBzZWxlY3RlZE1vZGFsaXR5LFxuICAgIHNlbGVjdGVkTW9kZWwsXG4gICAgc2VsZWN0ZWRDbGllbnRGcm9tLFxuICAgIHNlbGVjdGVkQ2xpZW50Q3VycmVudCxcbiAgICBzZWFyY2gsXG4gICAgc2VsZWN0LFxuICBdKTtcblxuXG4gIC8vIEZldGNoIGRhdGEgb24gY29tcG9uZW50IG1vdW50IGFuZCByb3V0ZSBjaGFuZ2VcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBmZXRjaERhdGEocGFnZSk7XG4gIH0sIFtwYWdlLCBxdWVyeUVwb2NoXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIXJvdXRlcj8uZXZlbnRzKSByZXR1cm47XG4gICAgY29uc3QgaGFuZGxlRG9uZSA9ICgpID0+IHNldElzTmF2aWdhdGluZyhmYWxzZSk7XG4gICAgcm91dGVyLmV2ZW50cy5vbihcInJvdXRlQ2hhbmdlQ29tcGxldGVcIiwgaGFuZGxlRG9uZSk7XG4gICAgcm91dGVyLmV2ZW50cy5vbihcInJvdXRlQ2hhbmdlRXJyb3JcIiwgaGFuZGxlRG9uZSk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHJvdXRlci5ldmVudHMub2ZmKFwicm91dGVDaGFuZ2VDb21wbGV0ZVwiLCBoYW5kbGVEb25lKTtcbiAgICAgIHJvdXRlci5ldmVudHMub2ZmKFwicm91dGVDaGFuZ2VFcnJvclwiLCBoYW5kbGVEb25lKTtcbiAgICB9O1xuICB9LCBbcm91dGVyXSk7XG5cbiAgYXN5bmMgZnVuY3Rpb24gZmV0Y2hEYXRhKHJlcXVlc3RlZFBhZ2UgPSAxKSB7XG4gICAgY29uc3Qgc2VxID0gKytmZXRjaFNlcS5jdXJyZW50O1xuICAgIGxldCB0aW1lZE91dCA9IGZhbHNlO1xuICAgIHNldElzTG9hZGluZyh0cnVlKTtcbiAgICBzZXRMb2FkRXJyb3IobnVsbCk7XG4gICAgY29uc3QgdGltZW91dElkID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aW1lZE91dCA9IHRydWU7XG4gICAgICBpZiAoc2VxID09PSBmZXRjaFNlcS5jdXJyZW50KSB7XG4gICAgICAgIHNldExvYWRFcnJvcih7XG4gICAgICAgICAgY29kZTogXCJ0aW1lb3V0XCIsXG4gICAgICAgICAgbWVzc2FnZTogYExvYWRpbmcgaXMgdGFraW5nIGxvbmdlciB0aGFuICR7TWF0aC5yb3VuZChcbiAgICAgICAgICAgIExPQURfVElNRU9VVF9NUyAvIDEwMDBcbiAgICAgICAgICApfXMuIFRoaXMgaXMgbGlrZWx5IGR1ZSB0byB2ZXJ5IHNlbGVjdGl2ZSBmaWx0ZXJzLmAsXG4gICAgICAgIH0pO1xuICAgICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xuICAgICAgfVxuICAgIH0sIExPQURfVElNRU9VVF9NUyk7XG4gICAgdHJ5IHtcbiAgICAgIGlmIChyb3V0ZXIucXVlcnkuaW5wdXRUZXh0ICYmIHJvdXRlci5xdWVyeS5zZWxlY3RlZFR5cGUpIHtcbiAgICAgICAgc2V0U2VsZWN0KHJvdXRlci5xdWVyeS5zZWxlY3RlZFR5cGUpO1xuICAgICAgICBzZXRTZWFyY2gocm91dGVyLnF1ZXJ5LmlucHV0VGV4dCk7XG4gICAgICB9XG4gICAgICBjb25zdCBzdGFydEFmdGVyRG9jID1cbiAgICAgICAgcmVxdWVzdGVkUGFnZSA+IDEgPyBwYWdlQ3Vyc29yc1tyZXF1ZXN0ZWRQYWdlIC0gMl0gOiBudWxsO1xuICAgICAgaWYgKHJlcXVlc3RlZFBhZ2UgPiAxICYmICFzdGFydEFmdGVyRG9jKSB7XG4gICAgICAgIHNldFBhZ2UoMSk7XG4gICAgICAgIGlmIChzZXEgPT09IGZldGNoU2VxLmN1cnJlbnQpIHtcbiAgICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dElkKTtcbiAgICAgICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGVmZmVjdGl2ZVNlbGVjdCA9IHJvdXRlci5xdWVyeS5zZWxlY3RlZFR5cGUgfHwgc2VsZWN0O1xuICAgICAgY29uc3QgZWZmZWN0aXZlU2VhcmNoID0gcm91dGVyLnF1ZXJ5LmlucHV0VGV4dCB8fCBzZWFyY2g7XG4gICAgICBjb25zdCBlZmZlY3RpdmVTZWFyY2hMb3dlciA9IChlZmZlY3RpdmVTZWFyY2ggfHwgXCJcIilcbiAgICAgICAgLnRvTG93ZXJDYXNlKClcbiAgICAgICAgLnRyaW0oKTtcblxuICAgICAgLy8gbGlnaHQgcmV0cnkgZm9yIHRyYW5zaWVudCBGaXJlc3RvcmUgaGljY3Vwc1xuICAgICAgY29uc3QgbG9hZCA9IGFzeW5jIChhdHRlbXB0ID0gMSkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHJldHVybiBhd2FpdCBmZXRjaFBhcnRzV2l0aE1hY2hpbmVEYXRhUGFnZSh7XG4gICAgICAgICAgICBwYWdlU2l6ZSxcbiAgICAgICAgICAgIHN0YXJ0QWZ0ZXJEb2MsXG4gICAgICAgICAgICB2aXNpYmxlT25seTogdHJ1ZSxcbiAgICAgICAgICAgIGZpbHRlckZuOiBoYXNBY3RpdmVGaWx0ZXJzID8gbWF0Y2hlc0ZpbHRlcnMgOiBudWxsLFxuICAgICAgICAgICAgc2VhcmNoOiBlZmZlY3RpdmVTZWFyY2hMb3dlclxuICAgICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICAgIHR5cGU6IGVmZmVjdGl2ZVNlbGVjdCxcbiAgICAgICAgICAgICAgICAgIHJhdzogZWZmZWN0aXZlU2VhcmNoLFxuICAgICAgICAgICAgICAgICAgbG93ZXI6IGVmZmVjdGl2ZVNlYXJjaExvd2VyLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgOiBudWxsLFxuICAgICAgICAgICAgbmVlZHNNYWNoaW5lRGF0YTpcbiAgICAgICAgICAgICAgQm9vbGVhbihzZWxlY3RlZE9FTSkgfHxcbiAgICAgICAgICAgICAgQm9vbGVhbihzZWxlY3RlZE1vZGFsaXR5KSB8fFxuICAgICAgICAgICAgICBCb29sZWFuKHNlbGVjdGVkTW9kZWwpIHx8XG4gICAgICAgICAgICAgIEJvb2xlYW4oc2VsZWN0ZWRDbGllbnRGcm9tKSB8fFxuICAgICAgICAgICAgICBCb29sZWFuKHNlbGVjdGVkQ2xpZW50Q3VycmVudCksXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBpZiAoYXR0ZW1wdCA+PSAzKSB0aHJvdyBlO1xuICAgICAgICAgIGF3YWl0IG5ldyBQcm9taXNlKHIgPT4gc2V0VGltZW91dChyLCAyNTAgKiBNYXRoLnBvdygyLCBhdHRlbXB0IC0gMSkpKTtcbiAgICAgICAgICByZXR1cm4gbG9hZChhdHRlbXB0ICsgMSk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBjb25zdCB7IHBhcnRzOiBkYXRhLCBsYXN0RG9jLCBoYXNOZXh0UGFnZTogbmV4dFBhZ2UgfSA9IGF3YWl0IGxvYWQoKTtcbiAgICAgIGlmICh0aW1lZE91dCB8fCBzZXEgIT09IGZldGNoU2VxLmN1cnJlbnQpIHJldHVybjtcbiAgICAgIGNvbnN0IGhhc05hbWVTZWFyY2ggPVxuICAgICAgICBCb29sZWFuKGVmZmVjdGl2ZVNlYXJjaExvd2VyKSAmJiBlZmZlY3RpdmVTZWxlY3QgPT09IFwiTmFtZVwiO1xuICAgICAgaWYgKFxuICAgICAgICBoYXNOYW1lU2VhcmNoICYmXG4gICAgICAgIChkYXRhLmxlbmd0aCA9PT0gMCB8fFxuICAgICAgICAgIGRhdGEuc29tZShcbiAgICAgICAgICAgIChpdGVtKSA9PlxuICAgICAgICAgICAgICAhQXJyYXkuaXNBcnJheShpdGVtPy5uYW1lVG9rZW5zKSB8fCBpdGVtLm5hbWVUb2tlbnMubGVuZ3RoID09PSAwXG4gICAgICAgICAgKSlcbiAgICAgICkge1xuICAgICAgICBzdGFydE5hbWVUb2tlbkJhY2tmaWxsKFwibmFtZS1zZWFyY2hcIik7XG4gICAgICB9XG4gICAgICBpZiAocmVxdWVzdGVkUGFnZSA9PT0gMSAmJiBkYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBzZXRQYWdlQ3Vyc29ycyhbXSk7XG4gICAgICAgIHNldEhhc05leHRQYWdlKGZhbHNlKTtcbiAgICAgIH1cbiAgICAgIHNldEJhY2t1cEluZm8oZGF0YSk7XG4gICAgICBzZXRMYWJlbHMobGFiZWxCYXNlKTsgLy8gPC0tIGFkZCB0aGlzIGxpbmUgYWZ0ZXIgc2V0QmFja3VwSW5mbyhkYXRhKVxuICAgICAgc2V0SUQoZGF0YS5tYXAoKGl0ZW0pID0+IGl0ZW0uaWQpKTtcbiAgICAgIGlmIChyZXF1ZXN0ZWRQYWdlID4gMSAmJiBkYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBzZXRIYXNOZXh0UGFnZShmYWxzZSk7XG4gICAgICAgIHNldFBhZ2UoMSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHNldEhhc05leHRQYWdlKG5leHRQYWdlKTtcbiAgICAgIHNldFBhZ2VDdXJzb3JzKChwcmV2KSA9PiB7XG4gICAgICAgIGNvbnN0IG5leHQgPSByZXF1ZXN0ZWRQYWdlID09PSAxID8gW10gOiBbLi4ucHJldl07XG4gICAgICAgIGlmIChsYXN0RG9jKSB7XG4gICAgICAgICAgbmV4dFtyZXF1ZXN0ZWRQYWdlIC0gMV0gPSBsYXN0RG9jO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgfSk7XG4gICAgICBzZXRTZWxlY3RlZEl0ZW1zKFtdKTtcblxuICAgICAgLy8gTm9ybWFsaXplIGNsaWVudCBpZHMgZm9yIGZpbHRlcmluZ1xuICAgICAgY29uc3QgYXVnbWVudGVkID0gZGF0YS5tYXAoKGl0ZW0pID0+ICh7XG4gICAgICAgIC4uLml0ZW0sXG4gICAgICAgIGNsaWVudEZyb21JZDpcbiAgICAgICAgICBpdGVtPy5jbGllbnRGcm9tSWQgPz9cbiAgICAgICAgICAodHlwZW9mIGl0ZW0/LkNsaWVudEZyb20gPT09IFwic3RyaW5nXCIgPyBpdGVtLkNsaWVudEZyb20gOiBudWxsKSA/P1xuICAgICAgICAgIGl0ZW0/LkNsaWVudEZyb20/LmlkID8/XG4gICAgICAgICAgbnVsbCxcbiAgICAgICAgY2xpZW50Q3VycmVudElkOlxuICAgICAgICAgIGl0ZW0/LmNsaWVudEN1cnJlbnRJZCA/P1xuICAgICAgICAgICh0eXBlb2YgaXRlbT8uQ2xpZW50Q3VycmVudCA9PT0gXCJzdHJpbmdcIiA/IGl0ZW0uQ2xpZW50Q3VycmVudCA6IG51bGwpID8/XG4gICAgICAgICAgaXRlbT8uQ2xpZW50Q3VycmVudD8uaWQgPz9cbiAgICAgICAgICBudWxsLFxuICAgICAgfSkpO1xuXHJcbiAgICAgIHNldEF1Z21lbnRlZEluZm8oYXVnbWVudGVkKTtcbiAgICAgIC8vIGRlZmF1bHQgdmlldyA9IGZpbHRlcmVkIChrZWVwcyBwYWdpbmF0aW9uIGFuZCBmaWx0ZXJzIGNvbnNpc3RlbnQpXG4gICAgICBzZXRJbmZvKGF1Z21lbnRlZC5maWx0ZXIobWF0Y2hlc0ZpbHRlcnMpKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGlmIChzZXEgIT09IGZldGNoU2VxLmN1cnJlbnQpIHJldHVybjtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBmZXRjaGluZyBkYXRhOlwiLCBlcnIpO1xuICAgICAgY29uc3QgY29kZSA9IGVycj8uY29kZSB8fCBcInVua25vd25cIjtcbiAgICAgIHNldExvYWRFcnJvcih7XG4gICAgICAgIGNvZGUsXG4gICAgICAgIG1lc3NhZ2U6IGVycj8ubWVzc2FnZSB8fCBcIkZhaWxlZCB0byBsb2FkIGl0ZW1zLlwiLFxuICAgICAgfSk7XG4gICAgICBzZXRJbmZvKFtdKTtcbiAgICAgIHNldEF1Z21lbnRlZEluZm8oW10pO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBjbGVhclRpbWVvdXQodGltZW91dElkKTtcbiAgICAgIGlmIChzZXEgPT09IGZldGNoU2VxLmN1cnJlbnQgJiYgIXRpbWVkT3V0KSBzZXRJc0xvYWRpbmcoZmFsc2UpO1xuICAgIH1cbiAgfVxuXHJcbiAgY29uc3Qgc2VhcmNoQ2hhbmdlSGFuZGxlciA9IChldmVudCkgPT4gc2V0U2VhcmNoKGV2ZW50LnRhcmdldC52YWx1ZSk7XHJcblxyXG4gIC8vIEZpbHRlciB0aGUgY3VycmVudGx5IGxvYWRlZCBpdGVtcyAobm93IGNvbnNpc3RlbnQgd2l0aCBwYWdlZCBmaWx0ZXJpbmcpXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgYmFzZSA9IGF1Z21lbnRlZEluZm8gfHwgW107XG4gICAgc2V0SW5mbyhiYXNlLmZpbHRlcihtYXRjaGVzRmlsdGVycykpO1xuICB9LCBbYXVnbWVudGVkSW5mbywgbWF0Y2hlc0ZpbHRlcnNdKTtcblxyXG4gIGZ1bmN0aW9uIHNvcnRDaGVja0FsbChwb3MpIHtcclxuICAgIC8vIERldGVybWluZSBuZXh0IGRpcmVjdGlvbjogdG9nZ2xlIHRoZSBjbGlja2VkIGNvbHVtbiBvbmx5XHJcbiAgICBjb25zdCBuZXh0U29ydENoZWNrID0gc29ydENoZWNrLm1hcCgodiwgaSkgPT4gKGkgPT09IHBvcyA/ICF2IDogdikpO1xyXG4gICAgY29uc3QgaXNEZXNjID0gbmV4dFNvcnRDaGVja1twb3NdOyAvLyB0cnVlIG1lYW5zIGRlc2NlbmRpbmdcclxuXHJcbiAgICBjb25zdCBzb3J0ZWRJbmZvID0gWy4uLmluZm9dLnNvcnQoKGEsIGIpID0+IHtcclxuICAgICAgY29uc3Qga2V5ID0gbGFiZWxCYXNlTmFtZXNbcG9zXTtcclxuXHJcbiAgICAgIGlmIChwb3MgPT09IDEpIHtcclxuICAgICAgICAvLyBEQVRFIGNvbHVtblxyXG4gICAgICAgIGNvbnN0IHRhID0gdG9UaW1lKGFba2V5XSk7XHJcbiAgICAgICAgY29uc3QgdGIgPSB0b1RpbWUoYltrZXldKTtcclxuXHJcbiAgICAgICAgLy8gUHV0IG1pc3NpbmcgZGF0ZXMgYXQgdGhlIGVuZCBmb3IgYXNjZW5kaW5nLCBhdCB0aGUgc3RhcnQgZm9yIGRlc2NlbmRpbmdcclxuICAgICAgICBpZiAodGEgPT09IG51bGwgJiYgdGIgPT09IG51bGwpIHJldHVybiAwO1xyXG4gICAgICAgIGlmICh0YSA9PT0gbnVsbCkgcmV0dXJuIGlzRGVzYyA/IC0xIDogMTtcclxuICAgICAgICBpZiAodGIgPT09IG51bGwpIHJldHVybiBpc0Rlc2MgPyAxIDogLTE7XHJcblxyXG4gICAgICAgIHJldHVybiBpc0Rlc2MgPyAodGIgLSB0YSkgOiAodGEgLSB0Yik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIE5BTUUgb3IgU0tVIChzdHJpbmcteSBjb2x1bW5zKTogaW5kZXhlcyAwIG9yIDUgaW4geW91ciBvcmlnaW5hbCBsb2dpY1xyXG4gICAgICBpZiAocG9zID09PSAwIHx8IHBvcyA9PT0gNSkge1xyXG4gICAgICAgIGNvbnN0IGF2ID0gKGFba2V5XSA/PyBcIlwiKS50b1N0cmluZygpO1xyXG4gICAgICAgIGNvbnN0IGJ2ID0gKGJba2V5XSA/PyBcIlwiKS50b1N0cmluZygpO1xyXG4gICAgICAgIHJldHVybiBpc0Rlc2MgPyBidi5sb2NhbGVDb21wYXJlKGF2KSA6IGF2LmxvY2FsZUNvbXBhcmUoYnYpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBOdW1lcmljLWlzaCBjb2x1bW5zICh3bywgcG4sIHNuKSDigJQgZmFsbCBiYWNrIHRvIHN0cmluZyBjb21wYXJlIGlmIE5hTlxyXG4gICAgICBjb25zdCBhbiA9IE51bWJlcihhW2tleV0pO1xyXG4gICAgICBjb25zdCBibiA9IE51bWJlcihiW2tleV0pO1xyXG5cclxuICAgICAgaWYgKCFpc05hTihhbikgJiYgIWlzTmFOKGJuKSkge1xyXG4gICAgICAgIHJldHVybiBpc0Rlc2MgPyAoYm4gLSBhbikgOiAoYW4gLSBibik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc3QgYXYgPSAoYVtrZXldID8/IFwiXCIpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgY29uc3QgYnYgPSAoYltrZXldID8/IFwiXCIpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgcmV0dXJuIGlzRGVzYyA/IGJ2LmxvY2FsZUNvbXBhcmUoYXYpIDogYXYubG9jYWxlQ29tcGFyZShidik7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHNldEluZm8oc29ydGVkSW5mbyk7XHJcbiAgICBzZXRTb3J0Q2hlY2sobmV4dFNvcnRDaGVjayk7XHJcblxyXG4gICAgLy8gVXBkYXRlIGhlYWRlciBsYWJlbHMgdG8gc2hvdyB0aGUgbGl0dGxlIGFycm93IG9uIHRoZSBhY3RpdmUgY29sdW1uXHJcbiAgICBzZXRMYWJlbHMod2l0aFNvcnRJY29uKGxhYmVsQmFzZSwgcG9zLCBpc0Rlc2MpKTtcclxuICB9XHJcblxyXG5cclxuICBjb25zdCByb3dTZWxlY3QgPSAoaXRlbSkgPT4ge1xyXG4gICAgaWYgKGl0ZW0gJiYgaXRlbS5pZCkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIlNlbGVjdGVkIGl0ZW06XCIsIGl0ZW0pO1xuICAgICAgc2V0SXNOYXZpZ2F0aW5nKHRydWUpO1xuICAgICAgcm91dGVyLnB1c2goXCIuL2l0ZW0vXCIgKyBpdGVtLmlkKTtcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmVycm9yKFwiVW5hYmxlIHRvIGRldGVybWluZSB0aGUgc2VsZWN0ZWQgaXRlbeKAmXMgSUQ6IFwiLCBpdGVtKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBjb25zdCBbc2VsZWN0ZWRJdGVtcywgc2V0U2VsZWN0ZWRJdGVtc10gPSB1c2VTdGF0ZShbXSk7XHJcbiAgY29uc3QgW3Nob3dEZWxldGVNb2RhbCwgc2V0U2hvd0RlbGV0ZU1vZGFsXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlU2VsZWN0SXRlbSA9IChpZCkgPT4ge1xyXG4gICAgc2V0U2VsZWN0ZWRJdGVtcyhwcmV2ID0+XHJcbiAgICAgIHByZXYuaW5jbHVkZXMoaWQpID8gcHJldi5maWx0ZXIoeCA9PiB4ICE9PSBpZCkgOiBbLi4ucHJldiwgaWRdXHJcbiAgICApO1xyXG4gIH07XHJcblxyXG5cclxuICAvLyBzZXRTZWxlY3RlZEl0ZW1zKChwcmV2KSA9PiB7XHJcbiAgLy8gICBjb25zdCBuZXdTZWxlY3Rpb24gPSBwcmV2LmluY2x1ZGVzKGlkKVxyXG4gIC8vICAgICA/IHByZXYuZmlsdGVyKChpdGVtSWQpID0+IGl0ZW1JZCAhPT0gaWQpXHJcbiAgLy8gICAgIDogWy4uLnByZXYsIGlkXTtcclxuICAvLyAgIGNvbnNvbGUubG9nKFwiU2VsZWN0ZWQgaXRlbXM6XCIsIG5ld1NlbGVjdGlvbik7XHJcbiAgLy8gICByZXR1cm4gbmV3U2VsZWN0aW9uOyAvLyA8LSBpbXBvcnRhbnRcclxuICAvLyB9KTtcclxuXHJcbiAgY29uc3QgaGFuZGxlU2hvd0RlbGV0ZU1vZGFsID0gKCkgPT4gc2V0U2hvd0RlbGV0ZU1vZGFsKHRydWUpO1xyXG4gIGNvbnN0IGhhbmRsZUNsb3NlRGVsZXRlTW9kYWwgPSAoKSA9PiBzZXRTaG93RGVsZXRlTW9kYWwoZmFsc2UpO1xyXG5cclxuICBjb25zdCBoYW5kbGVEZWxldGVTZWxlY3RlZCA9IGFzeW5jICgpID0+IHtcclxuICAgIHNldElzRGVsZXRpbmcodHJ1ZSk7XHJcbiAgICBjb25zdCBkYiA9IGZpcmViYXNlLmZpcmVzdG9yZSgpO1xyXG4gICAgdHJ5IHtcclxuICAgICAgLy8gTG9vcCBvdmVyIGVhY2ggc2VsZWN0ZWQgaXRlbSBvbmUgYXQgYSB0aW1lXHJcbiAgICAgIGZvciAoY29uc3QgaXRlbUlkIG9mIHNlbGVjdGVkSXRlbXMpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhpdGVtSWQpXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIC8vIERlbGV0ZSBmcm9tIFwiVGVzdFwiIGNvbGxlY3Rpb25cclxuICAgICAgICAgIGF3YWl0IGRiLmNvbGxlY3Rpb24oXCJUZXN0XCIpLmRvYyhpdGVtSWQpLmRlbGV0ZSgpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgY29uc29sZS5lcnJvcihgRXJyb3IgZGVsZXRpbmcgZG9jdW1lbnQgJHtpdGVtSWR9IGZyb20gVGVzdDpgLCBlcnIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgLy8gRGVsZXRlIGZyb20gXCJQYXJ0c1wiIGNvbGxlY3Rpb25cclxuICAgICAgICAgIGF3YWl0IGRiLmNvbGxlY3Rpb24oXCJQYXJ0c1wiKS5kb2MoaXRlbUlkKS5kZWxldGUoKTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEVycm9yIGRlbGV0aW5nIGRvY3VtZW50ICR7aXRlbUlkfSBmcm9tIFBhcnRzOmAsIGVycik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAvLyBEZWxldGUgYXNzb2NpYXRlZCBwaG90b3MgZnJvbSBzdG9yYWdlXHJcbiAgICAgICAgICBhd2FpdCBkZWxldGVGcm9tU3RvcmFnZShpdGVtSWQpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgY29uc29sZS5lcnJvcihgRXJyb3IgZGVsZXRpbmcgc3RvcmFnZSBmb3IgJHtpdGVtSWR9OmAsIGVycik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIC8vIFVwZGF0ZSBsb2NhbCBzdGF0ZSBieSBmaWx0ZXJpbmcgb3V0IHRoZSBkZWxldGVkIGl0ZW1zXHJcbiAgICAgIHNldEluZm8oaW5mby5maWx0ZXIoKGl0ZW0pID0+ICFzZWxlY3RlZEl0ZW1zLmluY2x1ZGVzKGl0ZW0uaWQpKSk7XHJcbiAgICAgIHNldFNlbGVjdGVkSXRlbXMoW10pO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGRlbGV0aW5nIGl0ZW1zOlwiLCBlcnJvcik7XHJcbiAgICB9IGZpbmFsbHkge1xyXG4gICAgICBzZXRJc0RlbGV0aW5nKGZhbHNlKTtcclxuICAgICAgaGFuZGxlQ2xvc2VEZWxldGVNb2RhbCgpO1xyXG4gICAgICAvLyBPcHRpb25hbGx5LCByZWxvYWQgdGhlIHBhZ2VcclxuICAgICAgLy8gcm91dGVyLnJlbG9hZCgpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG5cclxuICBjb25zdCBoYW5kbGVDbG9zZSA9ICgpID0+IHNldFNob3coZmFsc2UpO1xyXG4gIGNvbnN0IGhhbmRsZVNob3cgPSAoKSA9PiBzZXRTaG93KHRydWUpO1xyXG5cclxuICBjb25zdCBjaGVja0RlbGV0ZSA9IChldmVudCwgcG9zLCBpZHNUb0RlbGV0ZSwgbmFtZSkgPT4ge1xyXG4gICAgaWYgKGV2ZW50KSB7XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgfVxyXG4gICAgY29uc29sZS5sb2coXCJTZWxlY3RlZCBJRHMgdG8gZGVsZXRlOlwiLCBpZHNUb0RlbGV0ZSk7XHJcbiAgICBzZXRTZWxlY3RlZEl0ZW1zKGlkc1RvRGVsZXRlKTtcclxuICAgIHNldERJdGVtKG5hbWUpO1xyXG4gICAgc2V0U2hvd0RlbGV0ZU1vZGFsKHRydWUpO1xyXG4gIH07XHJcblxyXG4gIC8vIGNvbnN0IGhhbmRsZURlbGV0ZSA9IGFzeW5jICgpID0+IHtcclxuICAvLyAgIGxldCBpdGVtSWQgPSBnSWRlO1xyXG4gIC8vICAgdHJ5IHtcclxuICAvLyAgICAgc2V0SXNEZWxldGluZyh0cnVlKTtcclxuICAvLyAgICAgY29uc3QgZGIgPSBmaXJlYmFzZS5maXJlc3RvcmUoKTtcclxuICAvLyAgICAgYXdhaXQgZGIuY29sbGVjdGlvbihcIlRlc3RcIikuZG9jKGl0ZW1JZCkuZGVsZXRlKCk7XHJcbiAgLy8gICAgIGF3YWl0IGRlbGV0ZUZyb21QYXJ0c0NvbGxlY3Rpb24oaXRlbUlkKTtcclxuICAvLyAgICAgYXdhaXQgZGVsZXRlRnJvbVN0b3JhZ2UoaXRlbUlkKTtcclxuICAvLyAgICAgc2V0SW5mbyhpbmZvLmZpbHRlcigoXywgaSkgPT4gZ1BvcyAhPT0gaSkpO1xyXG4gIC8vICAgICBjb25zb2xlLmxvZyhgRGVsZXRlZCBpdGVtOiAke2l0ZW1JZH1gKTtcclxuICAvLyAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgLy8gICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBkZWxldGluZyBpdGVtOlwiLCBlcnJvcik7XHJcbiAgLy8gICB9IGZpbmFsbHkge1xyXG4gIC8vICAgICBzZXRJc0RlbGV0aW5nKGZhbHNlKTtcclxuICAvLyAgIH1cclxuICAvLyAgIGhhbmRsZUNsb3NlKCk7XHJcbiAgLy8gfTtcclxuXHJcbiAgY29uc3QgaG92ZXJTdHlsZSA9IChpbmRleCkgPT4gKHtcclxuICAgIGJhY2tncm91bmRDb2xvcjogaG92ZXJJbmRleCA9PT0gaW5kZXggPyBcIiNkZGRcIiA6IFwidHJhbnNwYXJlbnRcIixcclxuICAgIHRleHRBbGlnbjogXCJjZW50ZXJcIixcclxuICAgIGN1cnNvcjogXCJkZWZhdWx0XCIsXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IFtkcm9wZG93bjFUZXh0LCBzZXREcm9wZG93bjFUZXh0XSA9IHVzZVN0YXRlKFwiU2VsZWN0IE9wdGlvblwiKTtcclxuICBjb25zdCBbZHJvcGRvd24yVGV4dCwgc2V0RHJvcGRvd24yVGV4dF0gPSB1c2VTdGF0ZShcIlNlbGVjdCBPcHRpb25cIik7XHJcblxyXG4gIGNvbnN0IGhhbmRsZVNlbGVjdDEgPSAoZXZlbnRLZXksIGV2ZW50KSA9PiB7XHJcbiAgICBpZiAoZXZlbnRLZXkgPT09IFwidW5hc3NpZ25lZFwiKSB7XHJcbiAgICAgIHNldERyb3Bkb3duMVRleHQoXCJTZWxlY3QgT3B0aW9uXCIpO1xyXG4gICAgICBzZXRTZWxlY3RlZE9FTShudWxsKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHNldERyb3Bkb3duMVRleHQoZXZlbnQudGFyZ2V0LnRleHRDb250ZW50KTtcclxuICAgICAgc2V0U2VsZWN0ZWRPRU0oZXZlbnQudGFyZ2V0LnRleHRDb250ZW50KTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBjb25zdCBoYW5kbGVTZWxlY3QyID0gKGV2ZW50S2V5LCBldmVudCkgPT4ge1xyXG4gICAgaWYgKGV2ZW50S2V5ID09PSBcInVuYXNzaWduZWRcIikge1xyXG4gICAgICBzZXREcm9wZG93bjJUZXh0KFwiU2VsZWN0IE9wdGlvblwiKTtcclxuICAgICAgc2V0U2VsZWN0ZWRNb2RhbGl0eShudWxsKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHNldERyb3Bkb3duMlRleHQoZXZlbnQudGFyZ2V0LnRleHRDb250ZW50KTtcclxuICAgICAgc2V0U2VsZWN0ZWRNb2RhbGl0eShldmVudC50YXJnZXQudGV4dENvbnRlbnQpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIC8vIEJ1aWxkIGEgdW5pcXVlIGxpc3Qgb2YgY2xpZW50cyBmcm9tIHRoZSBpdGVtcyBjdXJyZW50bHkgbG9hZGVkLCBmaWx0ZXJlZCBieSBPRU0vTW9kYWxpdHkuXHJcbiAgLy8gYHR5cGVgIGlzIFwiZnJvbVwiIG9yIFwiY3VycmVudFwiIHRvIGRlY2lkZSB3aGljaCBjbGllbnQgcmVmIHRvIHJlYWQuXHJcbiAgYXN5bmMgZnVuY3Rpb24gYnVpbGRDbGllbnRzRnJvbUl0ZW1zKHR5cGUpIHtcbiAgICBjb25zdCBkYiA9IGZpcmViYXNlLmZpcmVzdG9yZSgpO1xuICAgIGNvbnN0IGlkcyA9IG5ldyBTZXQoKTtcblxuICAgIC8vIFJlc3BlY3QgY3VycmVudCBPRU0gLyBNb2RhbGl0eSBmaWx0ZXJzIHdoZW4gZGVyaXZpbmcgY2xpZW50IG9wdGlvbnNcbiAgICBjb25zdCBmaWx0ZXJlZCA9IGF1Z21lbnRlZEluZm8uZmlsdGVyKChpdGVtKSA9PiB7XG4gICAgICBjb25zdCBPRU0gPSBnZXRNYWNoaW5lRmllbGQoaXRlbSwgXCJPRU1cIik7XG4gICAgICBjb25zdCBNb2RhbGl0eSA9IGdldE1hY2hpbmVGaWVsZChpdGVtLCBcIk1vZGFsaXR5XCIpO1xuICAgICAgaWYgKHNlbGVjdGVkT0VNICYmIG5vcm1hbGl6ZVRleHQoT0VNKSAhPT0gbm9ybWFsaXplVGV4dChzZWxlY3RlZE9FTSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKFxuICAgICAgICBzZWxlY3RlZE1vZGFsaXR5ICYmXG4gICAgICAgIG5vcm1hbGl6ZVRleHQoTW9kYWxpdHkpICE9PSBub3JtYWxpemVUZXh0KHNlbGVjdGVkTW9kYWxpdHkpXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSk7XG5cclxuICAgIGZvciAoY29uc3QgaXQgb2YgZmlsdGVyZWQpIHtcclxuICAgICAgY29uc3QgaWQgPSB0eXBlID09PSBcImZyb21cIiA/IGl0LmNsaWVudEZyb21JZCA6IGl0LmNsaWVudEN1cnJlbnRJZDtcclxuICAgICAgaWYgKGlkKSBpZHMuYWRkKGlkKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBvdXQgPSBbXTtcclxuICAgIGNvbnN0IGlkQXJyYXkgPSBbLi4uaWRzXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaWRBcnJheS5sZW5ndGg7IGkgKz0gMTApIHtcclxuICAgICAgY29uc3QgY2h1bmsgPSBpZEFycmF5LnNsaWNlKGksIGkgKyAxMCk7XHJcbiAgICAgIGNvbnN0IHNuYXAgPSBhd2FpdCBkYlxyXG4gICAgICAgIC5jb2xsZWN0aW9uKFwiQ2xpZW50XCIpXHJcbiAgICAgICAgLndoZXJlKGZpcmViYXNlLmZpcmVzdG9yZS5GaWVsZFBhdGguZG9jdW1lbnRJZCgpLCBcImluXCIsIGNodW5rKVxyXG4gICAgICAgIC5nZXQoKTtcclxuICAgICAgc25hcC5mb3JFYWNoKChkb2MpID0+IHtcclxuICAgICAgICBjb25zdCBkID0gZG9jLmRhdGEoKSB8fCB7fTtcclxuICAgICAgICBvdXQucHVzaCh7IGlkOiBkb2MuaWQsIG5hbWU6IGQubmFtZSB8fCBkb2MuaWQgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHNvcnQgYnkgbmFtZSBmb3IgbmljZXIgVVhcclxuICAgIG91dC5zb3J0KChhLCBiKSA9PiAoYS5uYW1lIHx8IFwiXCIpLmxvY2FsZUNvbXBhcmUoYi5uYW1lIHx8IFwiXCIpKTtcclxuICAgIHJldHVybiBvdXQ7XHJcbiAgfVxyXG5cclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBDTElFTlQgU0VMRUNUSU9OIEhBTkRMSU5HXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBUaGlzIGZ1bmN0aW9uIGZldGNoZXMgY2xpZW50cyBhbmQgb3BlbnMgdGhlIGNsaWVudCBtb2RhbC5cclxuICBjb25zdCBoYW5kbGVDbGllbnRDbGljayA9IGFzeW5jICgpID0+IHtcclxuICAgIGxldCBzYWZlQ2xpZW50cyA9IFtdO1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgY2xpZW50c0RhdGEgPSBhd2FpdCBmZXRjaENsaWVudHMoc2VsZWN0ZWRPRU0sIHNlbGVjdGVkTW9kYWxpdHkpO1xyXG4gICAgICBzYWZlQ2xpZW50cyA9IEFycmF5LmlzQXJyYXkoY2xpZW50c0RhdGEpID8gY2xpZW50c0RhdGEgOiBbXTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgY29uc29sZS5lcnJvcihcImZldGNoQ2xpZW50cyBmYWlsZWQ6XCIsIGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEZhbGxiYWNrIHRvIGJ1aWxkaW5nIGZyb20gbG9hZGVkIGl0ZW1zIGlmIEFQSSBnYXZlIHVzIG5vdGhpbmdcclxuICAgIGlmIChzYWZlQ2xpZW50cy5sZW5ndGggPT09IDApIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBpZiAoIWNsaWVudFNlbGVjdGlvblR5cGUpIHtcclxuICAgICAgICAgIC8vIGlmIHNvbWVob3cgbm90IHNldCB5ZXQsIGRlZmF1bHQgdG8gXCJmcm9tXCJcclxuICAgICAgICAgIHNldENsaWVudFNlbGVjdGlvblR5cGUoXCJmcm9tXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBkZXJpdmVkID0gYXdhaXQgYnVpbGRDbGllbnRzRnJvbUl0ZW1zKGNsaWVudFNlbGVjdGlvblR5cGUgfHwgXCJmcm9tXCIpO1xyXG4gICAgICAgIHNhZmVDbGllbnRzID0gZGVyaXZlZDtcclxuICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYWxsYmFjayBidWlsZENsaWVudHNGcm9tSXRlbXMgZmFpbGVkOlwiLCBlKTtcclxuICAgICAgICBzYWZlQ2xpZW50cyA9IFtdO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0Q2xpZW50cyhzYWZlQ2xpZW50cyk7XHJcbiAgICBzZXRDbGllbnRTZWFyY2hUZXJtKFwiXCIpO1xyXG4gICAgc2V0U2hvd0NsaWVudE1vZGFsKHRydWUpO1xyXG4gIH07XHJcblxyXG5cclxuXHJcbiAgLy8gV2hlbiBhIGNsaWVudCBpcyBzZWxlY3RlZCBpbiB0aGUgbW9kYWwsIHdlIG5vdyBhc3N1bWUgdGhlIHBhcmFtZXRlciBpcyBhIGNsaWVudCBJRC5cclxuICAvLyBJZiB0aGUgcGFzc2VkIHZhbHVlIGlzIG51bGwsIHdlIGNsZWFyIHRoZSBzZWxlY3Rpb24uXHJcbiAgY29uc3QgaGFuZGxlQ2xpZW50U2VsZWN0ID0gYXN5bmMgKGNsaWVudElkKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhcIlVzZXIgc2VsZWN0ZWQgY2xpZW50IGlkOlwiLCBjbGllbnRJZCk7XHJcbiAgICBpZiAoIWNsaWVudElkKSB7XHJcbiAgICAgIGlmIChjbGllbnRTZWxlY3Rpb25UeXBlID09PSBcImZyb21cIikge1xyXG4gICAgICAgIHNldENsaWVudEZyb21CdXR0b25UZXh0KFwiU2VsZWN0IE9wdGlvblwiKTtcclxuICAgICAgICBzZXRTZWxlY3RlZENsaWVudEZyb20obnVsbCk7XHJcbiAgICAgIH0gZWxzZSBpZiAoY2xpZW50U2VsZWN0aW9uVHlwZSA9PT0gXCJjdXJyZW50XCIpIHtcclxuICAgICAgICBzZXRDbGllbnRDdXJyZW50QnV0dG9uVGV4dChcIlNlbGVjdCBPcHRpb25cIik7XHJcbiAgICAgICAgc2V0U2VsZWN0ZWRDbGllbnRDdXJyZW50KG51bGwpO1xyXG4gICAgICB9XHJcbiAgICAgIHNldFNob3dDbGllbnRNb2RhbChmYWxzZSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IGNsaWVudFNuYXAgPSBhd2FpdCBmaXJlYmFzZS5maXJlc3RvcmUoKS5jb2xsZWN0aW9uKFwiQ2xpZW50XCIpLmRvYyhjbGllbnRJZCkuZ2V0KCk7XHJcbiAgICAgIGlmIChjbGllbnRTbmFwLmV4aXN0cykge1xyXG4gICAgICAgIGNvbnN0IGNsaWVudERhdGEgPSBjbGllbnRTbmFwLmRhdGEoKTtcclxuICAgICAgICBpZiAoY2xpZW50U2VsZWN0aW9uVHlwZSA9PT0gXCJmcm9tXCIpIHtcclxuICAgICAgICAgIHNldENsaWVudEZyb21CdXR0b25UZXh0KGNsaWVudERhdGEubmFtZSk7XHJcbiAgICAgICAgICBzZXRTZWxlY3RlZENsaWVudEZyb20oY2xpZW50SWQpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoY2xpZW50U2VsZWN0aW9uVHlwZSA9PT0gXCJjdXJyZW50XCIpIHtcclxuICAgICAgICAgIHNldENsaWVudEN1cnJlbnRCdXR0b25UZXh0KGNsaWVudERhdGEubmFtZSk7XHJcbiAgICAgICAgICBzZXRTZWxlY3RlZENsaWVudEN1cnJlbnQoY2xpZW50SWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiTm8gY2xpZW50IGRvY3VtZW50IGZvdW5kIGZvciBpZDpcIiwgY2xpZW50SWQpO1xyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZmV0Y2hpbmcgY2xpZW50IGRhdGE6XCIsIGVycm9yKTtcclxuICAgIH1cclxuICAgIHNldFNob3dDbGllbnRNb2RhbChmYWxzZSk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQ2xpZW50SW5mbyA9IChjbGllbnRJZCwgY2xpZW50TmFtZSkgPT4ge1xyXG4gICAgY29uc29sZS5sb2coYENsaWVudCBJRDogJHtjbGllbnRJZH0sIENsaWVudCBOYW1lOiAke2NsaWVudE5hbWV9YCk7XHJcbiAgICByb3V0ZXIucHVzaChcImNsaWVudC9cIiArIGNsaWVudElkKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBoYW5kbGVDbGVhckNsaWVudFNlbGVjdGlvbiA9ICgpID0+IHtcclxuICAgIGlmIChjbGllbnRTZWxlY3Rpb25UeXBlID09PSBcImZyb21cIikge1xyXG4gICAgICBzZXRDbGllbnRGcm9tQnV0dG9uVGV4dChcIlNlbGVjdCBPcHRpb25cIik7XHJcbiAgICAgIHNldFNlbGVjdGVkQ2xpZW50RnJvbShudWxsKTtcclxuICAgIH0gZWxzZSBpZiAoY2xpZW50U2VsZWN0aW9uVHlwZSA9PT0gXCJjdXJyZW50XCIpIHtcclxuICAgICAgc2V0Q2xpZW50Q3VycmVudEJ1dHRvblRleHQoXCJTZWxlY3QgT3B0aW9uXCIpO1xyXG4gICAgICBzZXRTZWxlY3RlZENsaWVudEN1cnJlbnQobnVsbCk7XHJcbiAgICB9XHJcbiAgICBzZXRTaG93Q2xpZW50TW9kYWwoZmFsc2UpO1xyXG4gIH07XHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gTU9ERUwgU0VMRUNUSU9OIEhBTkRMSU5HXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICBjb25zdCBbbW9kZWxzLCBzZXRNb2RlbHNdID0gdXNlU3RhdGUoW10pO1xyXG4gIGNvbnN0IFtzaG93TW9kZWxNb2RhbCwgc2V0U2hvd01vZGVsTW9kYWxdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFttb2RlbEJ1dHRvblRleHQsIHNldE1vZGVsQnV0dG9uVGV4dF0gPSB1c2VTdGF0ZShcIlNlbGVjdCBPcHRpb25cIik7XHJcblxyXG4gIGNvbnN0IGhhbmRsZU1vZGVsQ2xpY2sgPSBhc3luYyAoKSA9PiB7XHJcbiAgICBjb25zdCBtb2RlbHNEYXRhID0gYXdhaXQgZmV0Y2hNb2RlbHMoXHJcbiAgICAgIHNlbGVjdGVkT0VNLFxyXG4gICAgICBzZWxlY3RlZE1vZGFsaXR5LFxyXG4gICAgICBzZWxlY3RlZENsaWVudEZyb21cclxuICAgICk7XHJcbiAgICBzZXRNb2RlbHMobW9kZWxzRGF0YSk7XHJcbiAgICBzZXRNb2RlbFNlYXJjaFRlcm0oXCJcIik7XHJcbiAgICBzZXRTaG93TW9kZWxNb2RhbCh0cnVlKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBoYW5kbGVNb2RlbFNlbGVjdCA9IChtb2RlbE5hbWUpID0+IHtcclxuICAgIHNldE1vZGVsQnV0dG9uVGV4dChtb2RlbE5hbWUgfHwgXCJTZWxlY3QgT3B0aW9uXCIpO1xyXG4gICAgc2V0U2VsZWN0ZWRNb2RlbChtb2RlbE5hbWUgfHwgbnVsbCk7XHJcbiAgICBzZXRTaG93TW9kZWxNb2RhbChmYWxzZSk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQ2xlYXJNb2RlbFNlbGVjdGlvbiA9ICgpID0+IHtcclxuICAgIHNldE1vZGVsQnV0dG9uVGV4dChcIlNlbGVjdCBPcHRpb25cIik7XHJcbiAgICBzZXRTZWxlY3RlZE1vZGVsKG51bGwpO1xyXG4gICAgc2V0U2hvd01vZGVsTW9kYWwoZmFsc2UpO1xyXG4gIH07XHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gV0FSRUhPVVNFIEJVVFRPTlMgKGZvciBDbGllbnQgQ3VycmVudClcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIGNvbnN0IGhhbmRsZVNvQ2FsV2FyZWhvdXNlQ2xpY2sgPSAoKSA9PiB7XHJcbiAgICBzZXRDbGllbnRDdXJyZW50QnV0dG9uVGV4dChcIlNvQ2FsIFdhcmVob3VzZVwiKTtcclxuICAgIHNldFNlbGVjdGVkQ2xpZW50Q3VycmVudChTT0NBTF9DTElFTlRfSUQpO1xyXG4gICAgY29uc29sZS5sb2coXCJXYXJlaG91c2UgYnV0dG9uIGNsaWNrZWQ6IHNldHRpbmcgQ2xpZW50IEN1cnJlbnQgdG9cIiwgU09DQUxfQ0xJRU5UX0lEKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBoYW5kbGVOb3JDYWxXYXJlaG91c2VDbGljayA9ICgpID0+IHtcclxuICAgIHNldENsaWVudEN1cnJlbnRCdXR0b25UZXh0KFwiTm9yQ2FsIFdhcmVob3VzZVwiKTtcclxuICAgIHNldFNlbGVjdGVkQ2xpZW50Q3VycmVudChOT1JDQUxfQ0xJRU5UX0lEKTtcclxuICAgIGNvbnNvbGUubG9nKFwiV2FyZWhvdXNlIGJ1dHRvbiBjbGlja2VkOiBzZXR0aW5nIENsaWVudCBDdXJyZW50IHRvXCIsIE5PUkNBTF9DTElFTlRfSUQpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGhhbmRsZVdhcmVob3VzZVVuYXNzaWduZWRDbGljayA9ICgpID0+IHtcclxuICAgIHNldENsaWVudEN1cnJlbnRCdXR0b25UZXh0KFwiVW5hc3NpZ25lZFwiKTtcclxuICAgIHNldFNlbGVjdGVkQ2xpZW50Q3VycmVudChVTkFTU0lHTkVEX0NMSUVOVF9JRCk7XHJcbiAgICBjb25zb2xlLmxvZyhcIldhcmVob3VzZSBidXR0b24gY2xpY2tlZDogc2V0dGluZyBDbGllbnQgQ3VycmVudCB0b1wiLCBVTkFTU0lHTkVEX0NMSUVOVF9JRCk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgW2NsaWVudFNlYXJjaFRlcm0sIHNldENsaWVudFNlYXJjaFRlcm1dID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW21vZGVsU2VhcmNoVGVybSwgc2V0TW9kZWxTZWFyY2hUZXJtXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG5cclxuICBjb25zdCBkZWxldGVGcm9tU3RvcmFnZSA9IGFzeW5jIChpdGVtSWQpID0+IHtcclxuICAgIGNvbnN0IHN0b3JhZ2VSZWYgPSBmaXJlYmFzZS5zdG9yYWdlKCkucmVmKCk7XHJcbiAgICBjb25zdCBmb2xkZXJSZWYgPSBzdG9yYWdlUmVmLmNoaWxkKGBQYXJ0cy8ke2l0ZW1JZH0vYCk7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBsaXN0UmVzdWx0ID0gYXdhaXQgZm9sZGVyUmVmLmxpc3RBbGwoKTtcclxuICAgICAgY29uc3QgZGVsZXRlUHJvbWlzZXMgPSBsaXN0UmVzdWx0Lml0ZW1zLm1hcCgoaXRlbSkgPT4gaXRlbS5kZWxldGUoKSk7XHJcbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKGRlbGV0ZVByb21pc2VzKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBkZWxldGluZyBmcm9tIHN0b3JhZ2U6XCIsIGVycm9yKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBjb25zdCBkZWxldGVGcm9tUGFydHNDb2xsZWN0aW9uID0gYXN5bmMgKGl0ZW1JZCkgPT4ge1xyXG4gICAgY29uc3QgZGIgPSBmaXJlYmFzZS5maXJlc3RvcmUoKTtcclxuICAgIHRyeSB7XHJcbiAgICAgIGF3YWl0IGRiLmNvbGxlY3Rpb24oXCJQYXJ0c1wiKS5kb2MoaXRlbUlkKS5kZWxldGUoKTtcclxuICAgICAgY29uc29sZS5sb2coYERlbGV0ZWQgaXRlbSBmcm9tIFBhcnRzIGNvbGxlY3Rpb246ICR7aXRlbUlkfWApO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGRlbGV0aW5nIGZyb20gUGFydHMgY29sbGVjdGlvbjpcIiwgZXJyb3IpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIC8vICAgLy8gU2FmZWx5IGNvbnZlcnQgYW55IGRhdGUtaXNoIHZhbHVlIGludG8gYSBjb21wYXJhYmxlIHRpbWVzdGFtcCAobXMgc2luY2UgZXBvY2gpLlxyXG4gIC8vIGZ1bmN0aW9uIHRvVGltZSh2YWx1ZSkge1xyXG4gIC8vICAgaWYgKCF2YWx1ZSkgcmV0dXJuIG51bGw7XHJcblxyXG4gIC8vICAgLy8gRmlyZXN0b3JlIFRpbWVzdGFtcDogeyBzZWNvbmRzLCBuYW5vc2Vjb25kcyB9XHJcbiAgLy8gICBpZiAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmIHZhbHVlLnNlY29uZHMpIHtcclxuICAvLyAgICAgdHJ5IHtcclxuICAvLyAgICAgICByZXR1cm4gdmFsdWUuc2Vjb25kcyAqIDEwMDA7XHJcbiAgLy8gICAgIH0gY2F0Y2ggeyAvKiBmYWxsdGhyb3VnaCAqLyB9XHJcbiAgLy8gICB9XHJcblxyXG4gIC8vICAgLy8gSWYgYWxyZWFkeSBhIERhdGVcclxuICAvLyAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIERhdGUpIHJldHVybiBpc05hTih2YWx1ZS5nZXRUaW1lKCkpID8gbnVsbCA6IHZhbHVlLmdldFRpbWUoKTtcclxuXHJcbiAgLy8gICAvLyBJZiBzdHJpbmc6IHRyeSBJU08gZmlyc3RcclxuICAvLyAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpIHtcclxuICAvLyAgICAgLy8geXl5eS1tbS1kZCAoZnJvbSB5b3VyIGZvcm0gaW5wdXRzKVxyXG4gIC8vICAgICBjb25zdCBpc28gPSBEYXRlLnBhcnNlKHZhbHVlKTtcclxuICAvLyAgICAgaWYgKCFpc05hTihpc28pKSByZXR1cm4gaXNvO1xyXG5cclxuICAvLyAgICAgLy8gbW0vZGQveXl5eSBmYWxsYmFjayAob2xkZXIgaXRlbXMpXHJcbiAgLy8gICAgIGNvbnN0IHBhcnRzID0gdmFsdWUuc3BsaXQoXCIvXCIpO1xyXG4gIC8vICAgICBpZiAocGFydHMubGVuZ3RoID09PSAzKSB7XHJcbiAgLy8gICAgICAgY29uc3QgW21tLCBkZCwgeXl5eV0gPSBwYXJ0cztcclxuICAvLyAgICAgICBjb25zdCBhbHQgPSBEYXRlLnBhcnNlKGAke3l5eXl9LSR7bW19LSR7ZGR9YCk7XHJcbiAgLy8gICAgICAgaWYgKCFpc05hTihhbHQpKSByZXR1cm4gYWx0O1xyXG4gIC8vICAgICB9XHJcbiAgLy8gICB9XHJcblxyXG4gIC8vICAgLy8gQ2Fub25pY2FsaXplIGFueSBkYXRlLWlzaCB2YWx1ZSB0byAneXl5eS1tbS1kZCcgc28gaXQgbWF0Y2hlcyA8aW5wdXQgdHlwZT1cImRhdGVcIj4gdmFsdWVzXHJcbiAgLy8gICBmdW5jdGlvbiB0b1lNRCh2YWx1ZSkge1xyXG4gIC8vICAgICBjb25zdCB0ID0gdG9UaW1lKHZhbHVlKTtcclxuICAvLyAgICAgaWYgKHQgPT0gbnVsbCkgcmV0dXJuIG51bGw7XHJcbiAgLy8gICAgIGNvbnN0IGQgPSBuZXcgRGF0ZSh0KTtcclxuICAvLyAgICAgY29uc3QgeXl5eSA9IGQuZ2V0RnVsbFllYXIoKTtcclxuICAvLyAgICAgY29uc3QgbW0gPSBTdHJpbmcoZC5nZXRNb250aCgpICsgMSkucGFkU3RhcnQoMiwgXCIwXCIpO1xyXG4gIC8vICAgICBjb25zdCBkZCA9IFN0cmluZyhkLmdldERhdGUoKSkucGFkU3RhcnQoMiwgXCIwXCIpO1xyXG4gIC8vICAgICByZXR1cm4gYCR7eXl5eX0tJHttbX0tJHtkZH1gO1xyXG4gIC8vICAgfVxyXG5cclxuXHJcbiAgLy8gICAvLyBMYXN0IHJlc29ydFxuICAvLyAgIGNvbnN0IHQgPSBEYXRlLnBhcnNlKHZhbHVlKTtcbiAgLy8gICByZXR1cm4gaXNOYU4odCkgPyBudWxsIDogdDtcbiAgLy8gfVxuXG4gIGNvbnN0IHRvdGFsS25vd25QYWdlcyA9IE1hdGgubWF4KFxuICAgIDEsXG4gICAgcGFnZUN1cnNvcnMuZmlsdGVyKEJvb2xlYW4pLmxlbmd0aCArIChoYXNOZXh0UGFnZSA/IDEgOiAwKVxuICApO1xuICBjb25zdCBwYWdlQnV0dG9ucyA9ICgoKSA9PiB7XG4gICAgY29uc3QgYnV0dG9ucyA9IFtdO1xuICAgIGNvbnN0IG1heFZpc2libGUgPSA3O1xuXG4gICAgY29uc3QgcHVzaFBhZ2UgPSAocCkgPT5cbiAgICAgIGJ1dHRvbnMucHVzaChcbiAgICAgICAgPFBhZ2luYXRpb24uSXRlbVxuICAgICAgICAgIGtleT17YHBhZ2UtJHtwfWB9XG4gICAgICAgICAgYWN0aXZlPXtwID09PSBwYWdlfVxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFBhZ2UocCl9XG4gICAgICAgID5cbiAgICAgICAgICB7cH1cbiAgICAgICAgPC9QYWdpbmF0aW9uLkl0ZW0+XG4gICAgICApO1xuXG4gICAgY29uc3QgcHVzaEVsbGlwc2lzID0gKGtleSkgPT5cbiAgICAgIGJ1dHRvbnMucHVzaCg8UGFnaW5hdGlvbi5FbGxpcHNpcyBrZXk9e2tleX0gZGlzYWJsZWQgLz4pO1xuXG4gICAgaWYgKHRvdGFsS25vd25QYWdlcyA8PSBtYXhWaXNpYmxlKSB7XG4gICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSB0b3RhbEtub3duUGFnZXM7IGkgKz0gMSkgcHVzaFBhZ2UoaSk7XG4gICAgICByZXR1cm4gYnV0dG9ucztcbiAgICB9XG5cbiAgICBsZXQgc3RhcnQgPSBNYXRoLm1heCgyLCBwYWdlIC0gMSk7XG4gICAgbGV0IGVuZCA9IE1hdGgubWluKHRvdGFsS25vd25QYWdlcyAtIDEsIHBhZ2UgKyAxKTtcblxuICAgIGNvbnN0IGRlc2lyZWRXaW5kb3cgPSBtYXhWaXNpYmxlIC0gMjtcbiAgICBsZXQgY3VycmVudFdpbmRvdyA9IGVuZCAtIHN0YXJ0ICsgMTtcbiAgICBsZXQgcmVtYWluaW5nID0gZGVzaXJlZFdpbmRvdyAtIGN1cnJlbnRXaW5kb3c7XG5cbiAgICB3aGlsZSAocmVtYWluaW5nID4gMCkge1xuICAgICAgaWYgKHN0YXJ0ID4gMikge1xuICAgICAgICBzdGFydCAtPSAxO1xuICAgICAgICByZW1haW5pbmcgLT0gMTtcbiAgICAgIH1cbiAgICAgIGlmIChyZW1haW5pbmcgPiAwICYmIGVuZCA8IHRvdGFsS25vd25QYWdlcyAtIDEpIHtcbiAgICAgICAgZW5kICs9IDE7XG4gICAgICAgIHJlbWFpbmluZyAtPSAxO1xuICAgICAgfVxuICAgICAgaWYgKHN0YXJ0ID09PSAyICYmIGVuZCA9PT0gdG90YWxLbm93blBhZ2VzIC0gMSkgYnJlYWs7XG4gICAgfVxuXG4gICAgcHVzaFBhZ2UoMSk7XG4gICAgaWYgKHN0YXJ0ID4gMikgcHVzaEVsbGlwc2lzKFwic3RhcnQtZWxsaXBzaXNcIik7XG4gICAgZm9yIChsZXQgaSA9IHN0YXJ0OyBpIDw9IGVuZDsgaSArPSAxKSBwdXNoUGFnZShpKTtcbiAgICBpZiAoZW5kIDwgdG90YWxLbm93blBhZ2VzIC0gMSkgcHVzaEVsbGlwc2lzKFwiZW5kLWVsbGlwc2lzXCIpO1xuICAgIHB1c2hQYWdlKHRvdGFsS25vd25QYWdlcyk7XG4gICAgaWYgKGhhc05leHRQYWdlKSBwdXNoRWxsaXBzaXMoXCJtb3JlLWVsbGlwc2lzXCIpO1xuXG4gICAgcmV0dXJuIGJ1dHRvbnM7XG4gIH0pKCk7XG5cbiAgY29uc3QgcmVjYWxjUGFnZVNpemUgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybjtcbiAgICBpZiAocGFnZSAhPT0gMSkgcmV0dXJuO1xuICAgIGlmICghdGFibGVCb2R5UmVmLmN1cnJlbnQpIHJldHVybjtcbiAgICBjb25zdCBjb250YWluZXJIZWlnaHQgPVxuICAgICAgdGFibGVCb2R5UmVmLmN1cnJlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0IHx8IDA7XG4gICAgaWYgKCFjb250YWluZXJIZWlnaHQpIHJldHVybjtcblxuICAgIGNvbnN0IGhlYWRlclJvdyA9XG4gICAgICB0YWJsZUJvZHlSZWYuY3VycmVudC5xdWVyeVNlbGVjdG9yKFwidGFibGUgdGhlYWQgdHJcIikgfHxcbiAgICAgIHRhYmxlQm9keVJlZi5jdXJyZW50LnF1ZXJ5U2VsZWN0b3IoXCJ0aGVhZCB0clwiKTtcbiAgICBjb25zdCBib2R5Um93ID1cbiAgICAgIHRhYmxlQm9keVJlZi5jdXJyZW50LnF1ZXJ5U2VsZWN0b3IoXCJ0YWJsZSB0Ym9keSB0clwiKSB8fFxuICAgICAgdGFibGVCb2R5UmVmLmN1cnJlbnQucXVlcnlTZWxlY3RvcihcInRib2R5IHRyXCIpO1xuXG4gICAgaWYgKGhlYWRlclJvdykge1xuICAgICAgY29uc3QgaCA9IGhlYWRlclJvdy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7XG4gICAgICBpZiAoaCkgaGVhZGVySGVpZ2h0UmVmLmN1cnJlbnQgPSBoO1xuICAgIH1cbiAgICBpZiAoYm9keVJvdykge1xuICAgICAgY29uc3QgciA9IGJvZHlSb3cuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xuICAgICAgaWYgKHIpIHJvd0hlaWdodFJlZi5jdXJyZW50ID0gcjtcbiAgICB9XG5cbiAgICBjb25zdCB2ZXJ0aWNhbFBhZGRpbmcgPSAyNDtcbiAgICBjb25zdCBhdmFpbGFibGUgPVxuICAgICAgY29udGFpbmVySGVpZ2h0IC0gaGVhZGVySGVpZ2h0UmVmLmN1cnJlbnQgLSB2ZXJ0aWNhbFBhZGRpbmc7XG4gICAgY29uc3QgZXN0aW1hdGVkID0gTWF0aC5mbG9vcihhdmFpbGFibGUgLyByb3dIZWlnaHRSZWYuY3VycmVudCk7XG4gICAgY29uc3QgY2xhbXBlZCA9IE1hdGgubWF4KDUsIE1hdGgubWluKDUwLCBlc3RpbWF0ZWQpKTtcbiAgICBpZiAoY2xhbXBlZCA+IDAgJiYgY2xhbXBlZCAhPT0gcGFnZVNpemUpIHtcbiAgICAgIHNldFBhZ2VTaXplKGNsYW1wZWQpO1xuICAgICAgcmVzZXRQYWdpbmF0aW9uKCk7XG4gICAgICBzZXRRdWVyeUVwb2NoKCh2KSA9PiB2ICsgMSk7XG4gICAgfVxuICB9LCBbcGFnZSwgcGFnZVNpemVdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm47XG4gICAgcmVjYWxjUGFnZVNpemUoKTtcbiAgICBjb25zdCBvblJlc2l6ZSA9ICgpID0+IHJlY2FsY1BhZ2VTaXplKCk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgb25SZXNpemUpO1xuICAgIHJldHVybiAoKSA9PiB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBvblJlc2l6ZSk7XG4gIH0sIFtyZWNhbGNQYWdlU2l6ZV0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKGlzTG9hZGluZyB8fCBwYWdlICE9PSAxKSByZXR1cm47XG4gICAgcmVjYWxjUGFnZVNpemUoKTtcbiAgfSwgW3BhZ2UsIGlzTG9hZGluZywgcmVjYWxjUGFnZVNpemVdKTtcblxuICBjb25zdCByZW5kZXJGaWx0ZXJzID0gKGlkUHJlZml4KSA9PiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5maWx0ZXJzUGFuZWx9PlxuICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5maWx0ZXJzSGVhZGVyfT5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmZpbHRlcnNUaXRsZX0+RmlsdGVyczwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuZmlsdGVyc1N1YnRpdGxlfT5cbiAgICAgICAgICAgIE5hcnJvdyByZXN1bHRzIGJ5IG1hY2hpbmUsIGNsaWVudCwgb3Igd2FyZWhvdXNlLlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAge2hhc0FjdGl2ZUZpbHRlcnMgPyAoXG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtzdHlsZXMuZmlsdGVyc0JhZGdlfT5BY3RpdmU8L3NwYW4+XG4gICAgICAgICkgOiBudWxsfVxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuZmlsdGVyU2VjdGlvbn0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuZmlsdGVyU2VjdGlvblRpdGxlfT5NYWNoaW5lPC9kaXY+XG4gICAgICAgIDxJbnB1dEdyb3VwIGNsYXNzTmFtZT17c3R5bGVzLmlucHV0R3JvdXB9PlxuICAgICAgICAgIDxJbnB1dEdyb3VwLlRleHQ+T0VNPC9JbnB1dEdyb3VwLlRleHQ+XG4gICAgICAgICAgPERyb3Bkb3duIG9uU2VsZWN0PXtoYW5kbGVTZWxlY3QxfSBjbGFzc05hbWU9XCJ3LTEwMFwiPlxuICAgICAgICAgICAgPERyb3Bkb3duLlRvZ2dsZVxuICAgICAgICAgICAgICB2YXJpYW50PVwib3V0bGluZS1zZWNvbmRhcnlcIlxuICAgICAgICAgICAgICBpZD17YCR7aWRQcmVmaXh9LW9lbWB9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YHctMTAwICR7c3R5bGVzLmlucHV0QnV0dG9ufWB9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHtkcm9wZG93bjFUZXh0fVxuICAgICAgICAgICAgPC9Ecm9wZG93bi5Ub2dnbGU+XG4gICAgICAgICAgICA8RHJvcGRvd24uTWVudSBjbGFzc05hbWU9XCJ3LTEwMFwiPlxuICAgICAgICAgICAgICA8RHJvcGRvd24uSXRlbSBldmVudEtleT1cInVuYXNzaWduZWRcIj5TZWxlY3QgT3B0aW9uPC9Ecm9wZG93bi5JdGVtPlxuICAgICAgICAgICAgICA8RHJvcGRvd24uSXRlbSBldmVudEtleT1cIkdFXCI+R0U8L0Ryb3Bkb3duLkl0ZW0+XG4gICAgICAgICAgICAgIDxEcm9wZG93bi5JdGVtIGV2ZW50S2V5PVwiVG9zaGliYVwiPlRvc2hpYmE8L0Ryb3Bkb3duLkl0ZW0+XG4gICAgICAgICAgICAgIDxEcm9wZG93bi5JdGVtIGV2ZW50S2V5PVwiU2llbWVuc1wiPlNpZW1lbnM8L0Ryb3Bkb3duLkl0ZW0+XG4gICAgICAgICAgICAgIDxEcm9wZG93bi5JdGVtIGV2ZW50S2V5PVwiUGhpbGlwc1wiPlBoaWxpcHM8L0Ryb3Bkb3duLkl0ZW0+XG4gICAgICAgICAgICA8L0Ryb3Bkb3duLk1lbnU+XG4gICAgICAgICAgPC9Ecm9wZG93bj5cbiAgICAgICAgPC9JbnB1dEdyb3VwPlxuXG4gICAgICAgIDxJbnB1dEdyb3VwIGNsYXNzTmFtZT17c3R5bGVzLmlucHV0R3JvdXB9PlxuICAgICAgICAgIDxJbnB1dEdyb3VwLlRleHQ+TW9kYWxpdHk8L0lucHV0R3JvdXAuVGV4dD5cbiAgICAgICAgICA8RHJvcGRvd24gb25TZWxlY3Q9e2hhbmRsZVNlbGVjdDJ9IGNsYXNzTmFtZT1cInctMTAwXCI+XG4gICAgICAgICAgICA8RHJvcGRvd24uVG9nZ2xlXG4gICAgICAgICAgICAgIHZhcmlhbnQ9XCJvdXRsaW5lLXNlY29uZGFyeVwiXG4gICAgICAgICAgICAgIGlkPXtgJHtpZFByZWZpeH0tbW9kYWxpdHlgfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2B3LTEwMCAke3N0eWxlcy5pbnB1dEJ1dHRvbn1gfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7ZHJvcGRvd24yVGV4dH1cbiAgICAgICAgICAgIDwvRHJvcGRvd24uVG9nZ2xlPlxuICAgICAgICAgICAgPERyb3Bkb3duLk1lbnUgY2xhc3NOYW1lPVwidy0xMDBcIj5cbiAgICAgICAgICAgICAgPERyb3Bkb3duLkl0ZW0gZXZlbnRLZXk9XCJ1bmFzc2lnbmVkXCI+U2VsZWN0IE9wdGlvbjwvRHJvcGRvd24uSXRlbT5cbiAgICAgICAgICAgICAgPERyb3Bkb3duLkl0ZW0gZXZlbnRLZXk9XCJDVFwiPkNUPC9Ecm9wZG93bi5JdGVtPlxuICAgICAgICAgICAgICA8RHJvcGRvd24uSXRlbSBldmVudEtleT1cIk1SSVwiPk1SSTwvRHJvcGRvd24uSXRlbT5cbiAgICAgICAgICAgIDwvRHJvcGRvd24uTWVudT5cbiAgICAgICAgICA8L0Ryb3Bkb3duPlxuICAgICAgICA8L0lucHV0R3JvdXA+XG5cbiAgICAgICAgPElucHV0R3JvdXAgY2xhc3NOYW1lPXtzdHlsZXMuaW5wdXRHcm91cH0+XG4gICAgICAgICAgPElucHV0R3JvdXAuVGV4dD5Nb2RlbDwvSW5wdXRHcm91cC5UZXh0PlxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIHZhcmlhbnQ9XCJvdXRsaW5lLXNlY29uZGFyeVwiXG4gICAgICAgICAgICBjbGFzc05hbWU9e2B3LTEwMCAke3N0eWxlcy5pbnB1dEJ1dHRvbn1gfVxuICAgICAgICAgICAgb25DbGljaz17aGFuZGxlTW9kZWxDbGlja31cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7bW9kZWxCdXR0b25UZXh0fVxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICA8L0lucHV0R3JvdXA+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5maWx0ZXJTZWN0aW9ufT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5maWx0ZXJTZWN0aW9uVGl0bGV9PkNsaWVudDwvZGl2PlxuICAgICAgICA8SW5wdXRHcm91cCBjbGFzc05hbWU9e3N0eWxlcy5pbnB1dEdyb3VwfT5cbiAgICAgICAgICA8SW5wdXRHcm91cC5UZXh0PkNsaWVudCBGcm9tPC9JbnB1dEdyb3VwLlRleHQ+XG4gICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgdmFyaWFudD1cIm91dGxpbmUtc2Vjb25kYXJ5XCJcbiAgICAgICAgICAgIGNsYXNzTmFtZT17YHctMTAwICR7c3R5bGVzLmlucHV0QnV0dG9ufWB9XG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVDbGllbnRDbGljayhcImZyb21cIil9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge2NsaWVudEZyb21CdXR0b25UZXh0fVxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICA8L0lucHV0R3JvdXA+XG5cbiAgICAgICAgPElucHV0R3JvdXAgY2xhc3NOYW1lPXtzdHlsZXMuaW5wdXRHcm91cH0+XG4gICAgICAgICAgPElucHV0R3JvdXAuVGV4dD5DbGllbnQgQ3VycmVudDwvSW5wdXRHcm91cC5UZXh0PlxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIHZhcmlhbnQ9XCJvdXRsaW5lLXNlY29uZGFyeVwiXG4gICAgICAgICAgICBjbGFzc05hbWU9e2B3LTEwMCAke3N0eWxlcy5pbnB1dEJ1dHRvbn1gfVxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlQ2xpZW50Q2xpY2soXCJjdXJyZW50XCIpfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtjbGllbnRDdXJyZW50QnV0dG9uVGV4dH1cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgPC9JbnB1dEdyb3VwPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuZmlsdGVyU2VjdGlvbn0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuZmlsdGVyU2VjdGlvblRpdGxlfT5XYXJlaG91c2U8L2Rpdj5cbiAgICAgICAgPElucHV0R3JvdXAgY2xhc3NOYW1lPXtzdHlsZXMuaW5wdXRHcm91cH0+XG4gICAgICAgICAgPElucHV0R3JvdXAuVGV4dD5RdWljazwvSW5wdXRHcm91cC5UZXh0PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuYnV0dG9uR3JvdXB9PlxuICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICB2YXJpYW50PVwib3V0bGluZS1zZWNvbmRhcnlcIlxuICAgICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5mbGV4QnV0dG9ufVxuICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVTb0NhbFdhcmVob3VzZUNsaWNrfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICBTb0NhbCBXYXJlaG91c2VcbiAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICB2YXJpYW50PVwib3V0bGluZS1zZWNvbmRhcnlcIlxuICAgICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5mbGV4QnV0dG9ufVxuICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVOb3JDYWxXYXJlaG91c2VDbGlja31cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgTm9yQ2FsIFdhcmVob3VzZVxuICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgIHZhcmlhbnQ9XCJvdXRsaW5lLXNlY29uZGFyeVwiXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17c3R5bGVzLmZsZXhCdXR0b259XG4gICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZVdhcmVob3VzZVVuYXNzaWduZWRDbGlja31cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgVW5hc3NpZ25lZFxuICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvSW5wdXRHcm91cD5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xuXG5cbiAgcmV0dXJuIChcbiAgICA8TG9nZ2VkSW4+XG4gICAgICB7KGlzRGVsZXRpbmcgfHwgaXNOYXZpZ2F0aW5nKSAmJiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubG9hZGluZ092ZXJsYXl9PlxuICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgIHNyYz1cIi9tYWdtby1sb2dvLnBuZ1wiXG4gICAgICAgICAgICBhbHQ9XCJMb2FkaW5nIE1hZ21vXCJcbiAgICAgICAgICAgIGNsYXNzTmFtZT17c3R5bGVzLmxvYWRpbmdMb2dvfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cbiAgICAgIDxNb2RhbCBzaG93PXtzaG93RGVsZXRlTW9kYWx9IG9uSGlkZT17aGFuZGxlQ2xvc2VEZWxldGVNb2RhbH0+XHJcbiAgICAgICAgPE1vZGFsLkhlYWRlciBjbG9zZUJ1dHRvbj5cclxuICAgICAgICAgIDxNb2RhbC5UaXRsZT5Db25maXJtIERlbGV0aW9uPC9Nb2RhbC5UaXRsZT5cclxuICAgICAgICA8L01vZGFsLkhlYWRlcj5cclxuICAgICAgICA8TW9kYWwuQm9keT5cclxuICAgICAgICAgIEFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUge3NlbGVjdGVkSXRlbXMubGVuZ3RofSBpdGVtXHJcbiAgICAgICAgICB7c2VsZWN0ZWRJdGVtcy5sZW5ndGggPiAxID8gXCJzXCIgOiBcIlwifT9cclxuICAgICAgICA8L01vZGFsLkJvZHk+XHJcbiAgICAgICAgPE1vZGFsLkZvb3Rlcj5cclxuICAgICAgICAgIDxCdXR0b24gdmFyaWFudD1cImRhbmdlclwiIG9uQ2xpY2s9e2hhbmRsZURlbGV0ZVNlbGVjdGVkfT5cclxuICAgICAgICAgICAgWWVzLCBkZWxldGVcclxuICAgICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICAgICAgPEJ1dHRvbiB2YXJpYW50PVwic2Vjb25kYXJ5XCIgb25DbGljaz17aGFuZGxlQ2xvc2VEZWxldGVNb2RhbH0+XHJcbiAgICAgICAgICAgIENhbmNlbFxyXG4gICAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgICAgPC9Nb2RhbC5Gb290ZXI+XHJcbiAgICAgIDwvTW9kYWw+XHJcblxyXG4gICAgICA8TW9kYWwgc2hvdz17c2hvd0NsaWVudE1vZGFsfSBvbkhpZGU9eygpID0+IHNldFNob3dDbGllbnRNb2RhbChmYWxzZSl9PlxyXG4gICAgICAgIDxNb2RhbC5IZWFkZXIgY2xvc2VCdXR0b24+XHJcbiAgICAgICAgICA8TW9kYWwuVGl0bGU+XHJcbiAgICAgICAgICAgIFNlbGVjdCB7Y2xpZW50U2VsZWN0aW9uVHlwZSA9PT0gXCJmcm9tXCIgPyBcIkNsaWVudCBGcm9tXCIgOiBcIkNsaWVudCBDdXJyZW50XCJ9XHJcbiAgICAgICAgICA8L01vZGFsLlRpdGxlPlxyXG4gICAgICAgIDwvTW9kYWwuSGVhZGVyPlxyXG4gICAgICAgIDxNb2RhbC5Cb2R5PlxyXG4gICAgICAgICAgPEZvcm1Db250cm9sXHJcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJTZWFyY2ggYnkgbmFtZVwiXHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1iLTNcIlxyXG4gICAgICAgICAgICB2YWx1ZT17Y2xpZW50U2VhcmNoVGVybX1cclxuICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRDbGllbnRTZWFyY2hUZXJtKGUudGFyZ2V0LnZhbHVlKX1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8Q2xpZW50VGFibGVcclxuICAgICAgICAgICAgY2xpZW50cz17KEFycmF5LmlzQXJyYXkoY2xpZW50cykgPyBjbGllbnRzIDogW10pLmZpbHRlcihcclxuICAgICAgICAgICAgICAoY2xpZW50KSA9PiAoY2xpZW50Py5uYW1lID8/IFwiXCIpLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoY2xpZW50U2VhcmNoVGVybS50b0xvd2VyQ2FzZSgpKVxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgICAgICBvblNlbGVjdENsaWVudD17aGFuZGxlQ2xpZW50U2VsZWN0fVxyXG4gICAgICAgICAgICBvbkluZm9DbGljaz17aGFuZGxlQ2xpZW50SW5mb31cclxuICAgICAgICAgICAgaXNDbGllbnRTZWFyY2g9e2ZhbHNlfVxyXG4gICAgICAgICAgICBjbGVhclNlbGVjdGlvbj17KCkgPT4gaGFuZGxlQ2xpZW50U2VsZWN0KG51bGwpfVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICA8L01vZGFsLkJvZHk+XHJcbiAgICAgIDwvTW9kYWw+XHJcblxyXG4gICAgICA8TW9kYWwgc2hvdz17c2hvd01vZGVsTW9kYWx9IG9uSGlkZT17KCkgPT4gc2V0U2hvd01vZGVsTW9kYWwoZmFsc2UpfT5cclxuICAgICAgICA8TW9kYWwuSGVhZGVyIGNsb3NlQnV0dG9uPlxyXG4gICAgICAgICAgPE1vZGFsLlRpdGxlPlNlbGVjdCBNb2RlbDwvTW9kYWwuVGl0bGU+XHJcbiAgICAgICAgPC9Nb2RhbC5IZWFkZXI+XHJcbiAgICAgICAgPE1vZGFsLkJvZHk+XHJcbiAgICAgICAgICA8Rm9ybUNvbnRyb2xcclxuICAgICAgICAgICAgdHlwZT1cInRleHRcIlxyXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlNlYXJjaCBieSBuYW1lXCJcclxuICAgICAgICAgICAgY2xhc3NOYW1lPVwibWItM1wiXHJcbiAgICAgICAgICAgIHZhbHVlPXttb2RlbFNlYXJjaFRlcm19XHJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0TW9kZWxTZWFyY2hUZXJtKGUudGFyZ2V0LnZhbHVlKX1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8TW9kZWxUYWJsZVxyXG4gICAgICAgICAgICBtb2RlbHM9e21vZGVscy5maWx0ZXIoKG1vZGVsKSA9PlxyXG4gICAgICAgICAgICAgIHR5cGVvZiBtb2RlbCA9PT0gXCJzdHJpbmdcIlxyXG4gICAgICAgICAgICAgICAgPyBtb2RlbC50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKG1vZGVsU2VhcmNoVGVybS50b0xvd2VyQ2FzZSgpKVxyXG4gICAgICAgICAgICAgICAgOiBmYWxzZVxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgICAgICBvblNlbGVjdE1vZGVsPXtoYW5kbGVNb2RlbFNlbGVjdH1cclxuICAgICAgICAgICAgY2xlYXJTZWxlY3Rpb249eygpID0+IGhhbmRsZU1vZGVsU2VsZWN0KG51bGwpfVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICA8L01vZGFsLkJvZHk+XHJcbiAgICAgIDwvTW9kYWw+XHJcblxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnBhZ2V9PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnBhZ2VJbm5lcn0+XG4gICAgICAgICAgPGhlYWRlciBjbGFzc05hbWU9e3N0eWxlcy5oZWFkZXJ9PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5oZWFkZXJMZWZ0fT5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17c3R5bGVzLmJ1cmdlcn1cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTaG93RmlsdGVycyh0cnVlKX1cbiAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPVwiT3BlbiBmaWx0ZXJzXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxzcGFuPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3Bhbj48L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4+PC9zcGFuPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5icmFuZH0+XG4gICAgICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICAgICAgc3JjPVwiL21hZ21vLWxvZ28ucG5nXCJcbiAgICAgICAgICAgICAgICAgIGFsdD1cIk1hZ21vXCJcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17c3R5bGVzLmJyYW5kTG9nb31cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmJyYW5kTmFtZX0+TWFnbW88L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuYnJhbmRTdWJ9PkludmVudG9yeSBTZWFyY2g8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuaGVhZGVyUmlnaHR9PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmhlYWRlclN0YXR1c30+XG4gICAgICAgICAgICAgICAge2hhc0FjdGl2ZUZpbHRlcnMgPyBcIkZpbHRlcnMgYWN0aXZlXCIgOiBcIkFsbCBpdGVtc1wifVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvaGVhZGVyPlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5jb250ZW50fT5cbiAgICAgICAgICAgIDxhc2lkZSBjbGFzc05hbWU9e3N0eWxlcy5zaWRlYmFyfT57cmVuZGVyRmlsdGVycyhcInNpZGViYXJcIil9PC9hc2lkZT5cbiAgICAgICAgICAgIDxtYWluIGNsYXNzTmFtZT17c3R5bGVzLm1haW59PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnRhYmxlQ2FyZH0+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy50YWJsZUhlYWRlcn0+XG4gICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnRhYmxlVGl0bGV9Pkl0ZW1zPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMudGFibGVTdWJ0aXRsZX0+XG4gICAgICAgICAgICAgICAgICAgICAge2lzTG9hZGluZyA/IFwiTG9hZGluZyBpdGVtc1wiIDogYCR7aW5mby5sZW5ndGh9IGl0ZW1zIG9uIHRoaXMgcGFnZWB9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnRhYmxlTWV0YX0+XG4gICAgICAgICAgICAgICAgICAgIFBhZ2Uge3BhZ2V9IHtoYXNOZXh0UGFnZSA/IGBvZiAke3RvdGFsS25vd25QYWdlc30rYCA6IGBvZiAke3RvdGFsS25vd25QYWdlc31gfVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnRhYmxlQm9keX0gcmVmPXt0YWJsZUJvZHlSZWZ9PlxuICAgICAgICAgICAgICAgICAge2lzTG9hZGluZyA/IChcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5sb2FkaW5nU3RhdGV9PlxuICAgICAgICAgICAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgICAgICAgICAgIHNyYz1cIi9tYWdtby1sb2dvLnBuZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICBhbHQ9XCJMb2FkaW5nIE1hZ21vXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17c3R5bGVzLmxvYWRpbmdMb2dvfVxuICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5sb2FkaW5nVGV4dH0+TG9hZGluZzwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICkgOiBsb2FkRXJyb3IgPyAoXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuZXJyb3JTdGF0ZX0+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5lcnJvclRpdGxlfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIExvYWQgZmFpbGVkICh7bG9hZEVycm9yLmNvZGV9KVxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuZXJyb3JNZXNzYWdlfT57bG9hZEVycm9yLm1lc3NhZ2V9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFudD1cIm91dGxpbmUtc2Vjb25kYXJ5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpemU9XCJzbVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJlc2V0UGFnaW5hdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRRdWVyeUVwb2NoKCh2KSA9PiB2ICsgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIFJldHJ5XG4gICAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICAgPFBhcnRUYWJsZVxuICAgICAgICAgICAgICAgICAgICAgIGluZm89e2luZm99XG4gICAgICAgICAgICAgICAgICAgICAgbGFiZWxzPXtsYWJlbHN9XG4gICAgICAgICAgICAgICAgICAgICAgaWRzPXtpZHN9XG4gICAgICAgICAgICAgICAgICAgICAgaG92ZXJTdHlsZT17aG92ZXJTdHlsZX1cbiAgICAgICAgICAgICAgICAgICAgICBzb3J0Q2hlY2tBbGw9e3NvcnRDaGVja0FsbH1cbiAgICAgICAgICAgICAgICAgICAgICBjaGVja0RlbGV0ZT17Y2hlY2tEZWxldGV9XG4gICAgICAgICAgICAgICAgICAgICAgaXNEZWxldGluZz17aXNEZWxldGluZ31cbiAgICAgICAgICAgICAgICAgICAgICByb3dTZWxlY3Q9e3Jvd1NlbGVjdH1cbiAgICAgICAgICAgICAgICAgICAgICBzZXRIb3ZlckluZGV4PXtzZXRIb3ZlckluZGV4fVxuICAgICAgICAgICAgICAgICAgICAgIGhvdmVySW5kZXg9e2hvdmVySW5kZXh9XG4gICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRJdGVtcz17c2VsZWN0ZWRJdGVtc31cbiAgICAgICAgICAgICAgICAgICAgICBzZXRTZWxlY3RlZEl0ZW1zPXtzZXRTZWxlY3RlZEl0ZW1zfVxuICAgICAgICAgICAgICAgICAgICAgIG1pblJvd3M9e3BhZ2VTaXplfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMudGFibGVGb290ZXJ9PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5wYWdpbmF0aW9uUm93fT5cbiAgICAgICAgICAgICAgICAgICAgPFBhZ2luYXRpb24gc2l6ZT1cInNtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPFBhZ2luYXRpb24uUHJldlxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0UGFnZSgocCkgPT4gTWF0aC5tYXgoMSwgcCAtIDEpKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtwYWdlIDw9IDF9XG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgUHJldmlvdXNcbiAgICAgICAgICAgICAgICAgICAgICA8L1BhZ2luYXRpb24uUHJldj5cbiAgICAgICAgICAgICAgICAgICAgICB7cGFnZUJ1dHRvbnN9XG4gICAgICAgICAgICAgICAgICAgICAgPFBhZ2luYXRpb24uTmV4dFxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0UGFnZSgocCkgPT4gcCArIDEpfVxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFoYXNOZXh0UGFnZX1cbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICBOZXh0XG4gICAgICAgICAgICAgICAgICAgICAgPC9QYWdpbmF0aW9uLk5leHQ+XG4gICAgICAgICAgICAgICAgICAgIDwvUGFnaW5hdGlvbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPEZvcm0gY2xhc3NOYW1lPXtzdHlsZXMuc2VhcmNoUm93fT5cbiAgICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sXG4gICAgICAgICAgICAgICAgICAgICAgdHlwZT17c2hvd0xpc3RTZWFyY2h9XG4gICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJTZWFyY2hcIlxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17c3R5bGVzLnNlYXJjaElucHV0fVxuICAgICAgICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJTZWFyY2hcIlxuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtzZWFyY2h9XG4gICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3NlYXJjaENoYW5nZUhhbmRsZXJ9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDxOYXZEcm9wZG93blxuICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPXtzZWxlY3R9XG4gICAgICAgICAgICAgICAgICAgICAgaWQ9XCJjb2xsYXNpYmxlLW5hdi1kcm9wZG93blwiXG4gICAgICAgICAgICAgICAgICAgICAgc2hvdz17c2hvd0xpc3R9XG4gICAgICAgICAgICAgICAgICAgICAgb25Nb3VzZUVudGVyPXsoKSA9PiBzZXRTaG93TGlzdCh0cnVlKX1cbiAgICAgICAgICAgICAgICAgICAgICBvbk1vdXNlTGVhdmU9eygpID0+IHNldFNob3dMaXN0KGZhbHNlKX1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5zZWFyY2hTZWxlY3R9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICA8TmF2RHJvcGRvd24uSXRlbVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTZWxlY3QoXCJOYW1lXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTaG93TGlzdFNlYXJjaChcInRleHRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIE5hbWVcbiAgICAgICAgICAgICAgICAgICAgICA8L05hdkRyb3Bkb3duLkl0ZW0+XG4gICAgICAgICAgICAgICAgICAgICAgPE5hdkRyb3Bkb3duLkl0ZW1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2VsZWN0KFwiRGF0ZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2hvd0xpc3RTZWFyY2goXCJkYXRlXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICBEYXRlXG4gICAgICAgICAgICAgICAgICAgICAgPC9OYXZEcm9wZG93bi5JdGVtPlxuICAgICAgICAgICAgICAgICAgICAgIDxOYXZEcm9wZG93bi5JdGVtXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNlbGVjdChcIldvcmsgT3JkZXJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNob3dMaXN0U2VhcmNoKFwidGV4dFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgV29yayBPcmRlclxuICAgICAgICAgICAgICAgICAgICAgIDwvTmF2RHJvcGRvd24uSXRlbT5cbiAgICAgICAgICAgICAgICAgICAgICA8TmF2RHJvcGRvd24uSXRlbVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTZWxlY3QoXCJQcm9kdWN0IE51bWJlclwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2hvd0xpc3RTZWFyY2goXCJ0ZXh0XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICBQcm9kdWN0IE51bWJlclxuICAgICAgICAgICAgICAgICAgICAgIDwvTmF2RHJvcGRvd24uSXRlbT5cbiAgICAgICAgICAgICAgICAgICAgICA8TmF2RHJvcGRvd24uSXRlbVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTZWxlY3QoXCJTZXJpYWwgTnVtYmVyXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTaG93TGlzdFNlYXJjaChcInRleHRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIFNlcmlhbCBOdW1iZXJcbiAgICAgICAgICAgICAgICAgICAgICA8L05hdkRyb3Bkb3duLkl0ZW0+XG4gICAgICAgICAgICAgICAgICAgICAgPE5hdkRyb3Bkb3duLkl0ZW1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2VsZWN0KFwiRGVzY3JpcHRpb25cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNob3dMaXN0U2VhcmNoKFwidGV4dFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgRGVzY3JpcHRpb25cbiAgICAgICAgICAgICAgICAgICAgICA8L05hdkRyb3Bkb3duLkl0ZW0+XG4gICAgICAgICAgICAgICAgICAgICAgPE5hdkRyb3Bkb3duLkl0ZW1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2VsZWN0KFwiU0tVXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTaG93TGlzdFNlYXJjaChcInRleHRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIFNLVVxuICAgICAgICAgICAgICAgICAgICAgIDwvTmF2RHJvcGRvd24uSXRlbT5cbiAgICAgICAgICAgICAgICAgICAgPC9OYXZEcm9wZG93bj5cbiAgICAgICAgICAgICAgICAgIDwvRm9ybT5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuZm9vdGVyQWN0aW9uc30+XG4gICAgICAgICAgICAgICAgICAgIDxMb2FkaW5nQnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInNlY29uZGFyeVwiXG4gICAgICAgICAgICAgICAgICAgICAgbmFtZT1cIkFkZCBOZXcgSXRlbVwiXG4gICAgICAgICAgICAgICAgICAgICAgcm91dGU9XCJOZXdTZWFyY2gvQWRkSXRlbS9OZXdJdGVtXCJcbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5hY3Rpb25CdXR0b259XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgICB2YXJpYW50PVwiaW5mb1wiXG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgJHtzdHlsZXMuYWN0aW9uQnV0dG9ufSAke3N0eWxlcy5tYXBBY3Rpb25CdXR0b259YH1cbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtvcGVuTWFwfVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgTWFwXG4gICAgICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8TG9hZGluZ0J1dHRvblxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJwcmltYXJ5XCJcbiAgICAgICAgICAgICAgICAgICAgICBuYW1lPVwiQmFja1wiXG4gICAgICAgICAgICAgICAgICAgICAgcm91dGU9XCJXYXJlaG91c2VkYi9XYXJlaG91c2VTZWxlY3RcIlxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17c3R5bGVzLmFjdGlvbkJ1dHRvbn1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvbWFpbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPE9mZmNhbnZhc1xuICAgICAgICAgIHNob3c9e3Nob3dGaWx0ZXJzfVxuICAgICAgICAgIG9uSGlkZT17KCkgPT4gc2V0U2hvd0ZpbHRlcnMoZmFsc2UpfVxuICAgICAgICAgIHBsYWNlbWVudD1cInN0YXJ0XCJcbiAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5maWx0ZXJzRHJhd2VyfVxuICAgICAgICAgIHNjcm9sbFxuICAgICAgICAgIGJhY2tkcm9wXG4gICAgICAgID5cbiAgICAgICAgICA8T2ZmY2FudmFzLkhlYWRlciBjbG9zZUJ1dHRvbj5cbiAgICAgICAgICAgIDxPZmZjYW52YXMuVGl0bGU+RmlsdGVyczwvT2ZmY2FudmFzLlRpdGxlPlxuICAgICAgICAgIDwvT2ZmY2FudmFzLkhlYWRlcj5cbiAgICAgICAgICA8T2ZmY2FudmFzLkJvZHk+e3JlbmRlckZpbHRlcnMoXCJkcmF3ZXJcIil9PC9PZmZjYW52YXMuQm9keT5cbiAgICAgICAgPC9PZmZjYW52YXM+XG5cbiAgICAgICAgPFdhcmVob3VzZU1hcE1vZGFsXG4gICAgICAgICAgc2hvdz17c2hvd01hcH1cbiAgICAgICAgICBvbkhpZGU9eygpID0+IHNldFNob3dNYXAoZmFsc2UpfVxuICAgICAgICAgIG9uVmlldz17aGFuZGxlTWFwVmlld31cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgIDwvTG9nZ2VkSW4+XG4gICk7XG5cclxuXHJcbn1cclxuXHJcbiJdLCJzb3VyY2VSb290IjoiIn0=