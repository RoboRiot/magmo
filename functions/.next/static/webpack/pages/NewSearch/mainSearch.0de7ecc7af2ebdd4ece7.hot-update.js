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
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray */ "./node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/next/node_modules/@babel/runtime/regenerator */ "./node_modules/next/node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator */ "./node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var _context_Firebase__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../context/Firebase */ "./context/Firebase.js");
/* harmony import */ var _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./WarehouseMapModal.module.css */ "./components/WarehouseMapModal.module.css");
/* harmony import */ var _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_6__);




var _jsxFileName = "C:\\Users\\mack2\\Desktop\\code\\components\\WarehouseMapModal.js",
    _s = $RefreshSig$();

var __jsx = react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement;




var REGION_ORDER = ["E", "F", "G", "A", "D", "C", "B"];
var NO_PALLET = "NoPallet";
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

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])([]),
      regionOptions = _useState[0],
      setRegionOptions = _useState[1];

  var _useState2 = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])({}),
      sectionMap = _useState2[0],
      setSectionMap = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])("regions"),
      mapStep = _useState3[0],
      setMapStep = _useState3[1];

  var _useState4 = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(""),
      mapRegion = _useState4[0],
      setMapRegion = _useState4[1];

  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(""),
      mapRow = _useState5[0],
      setMapRow = _useState5[1];

  var _useState6 = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(""),
      mapCol = _useState6[0],
      setMapCol = _useState6[1];

  var _useState7 = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(""),
      mapPallet = _useState7[0],
      setMapPallet = _useState7[1];

  var _useState8 = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(""),
      mapBin = _useState8[0],
      setMapBin = _useState8[1];

  var _useState9 = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])({}),
      mapCellPallets = _useState9[0],
      setMapCellPallets = _useState9[1];

  var _useState10 = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])({}),
      mapPalletBins = _useState10[0],
      setMapPalletBins = _useState10[1];

  var _useState11 = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(false),
      mapLoading = _useState11[0],
      setMapLoading = _useState11[1];

  var _useState12 = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(""),
      mapError = _useState12[0],
      setMapError = _useState12[1];

  var _useState13 = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(false),
      directoryLoaded = _useState13[0],
      setDirectoryLoaded = _useState13[1];

  var lastShowRef = Object(react__WEBPACK_IMPORTED_MODULE_3__["useRef"])(false);
  var notifySelectionChange = Object(react__WEBPACK_IMPORTED_MODULE_3__["useCallback"])(function (selection) {
    if (typeof onSelectionChange === "function") {
      onSelectionChange(selection);
    }
  }, [onSelectionChange]);
  var loadDirectory = Object(react__WEBPACK_IMPORTED_MODULE_3__["useCallback"])( /*#__PURE__*/Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__["default"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee() {
    var doc, data;
    return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee$(_context) {
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
            return _context_Firebase__WEBPACK_IMPORTED_MODULE_5__["default"].firestore().collection("Warehouse").doc("directory").get();

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
  var loadRegionInventory = Object(react__WEBPACK_IMPORTED_MODULE_3__["useCallback"])( /*#__PURE__*/function () {
    var _ref3 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__["default"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee2(regionId) {
      var snap, cellPallets, palletBins, cellObj, palletObj;
      return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee2$(_context2) {
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
              return _context_Firebase__WEBPACK_IMPORTED_MODULE_5__["default"].firestore().collection("Test").where("newLocalCurrent.region", "==", regionId).get();

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
                var hasBin = bin !== undefined && bin !== null && "".concat(bin) !== "";
                var hasPallet = pallet !== undefined && pallet !== null && "".concat(pallet) !== "";
                if (!hasPallet && !hasBin) return;
                var palletId = hasPallet ? String(pallet) : NO_PALLET;
                if (!cellPallets[cellKey]) cellPallets[cellKey] = new Set();
                cellPallets[cellKey].add(palletId);

                if (hasBin) {
                  var palletKey = "".concat(cellKey, "-P").concat(palletId);
                  if (!palletBins[palletKey]) palletBins[palletKey] = new Set();
                  palletBins[palletKey].add(String(bin));
                }
              });
              cellObj = {};
              Object.keys(cellPallets).forEach(function (key) {
                cellObj[key] = Array.from(cellPallets[key]).sort(function (a, b) {
                  if (a === NO_PALLET) return 1;
                  if (b === NO_PALLET) return -1;
                  var na = Number(a);
                  var nb = Number(b);
                  if (Number.isFinite(na) && Number.isFinite(nb)) return na - nb;
                  return String(a).localeCompare(String(b));
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
  var getRegionDimensions = Object(react__WEBPACK_IMPORTED_MODULE_3__["useCallback"])(function (regionId) {
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
  Object(react__WEBPACK_IMPORTED_MODULE_3__["useEffect"])(function () {
    var wasOpen = lastShowRef.current;
    lastShowRef.current = show;
    if (!show || wasOpen) return;
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
    var normalizedPallet = palletValue === NO_PALLET ? "" : palletValue;
    var selection = {
      region: mapRegion,
      sectionLetter: mapRow,
      sectionNumber: mapCol,
      pallet: normalizedPallet,
      bin: ""
    };
    setMapPallet(palletValue);
    setMapBin("");
    setMapStep("bins");
    notifySelectionChange(selection);
  };

  var handleSelectBin = function handleSelectBin(binId) {
    var binValue = String(binId);
    var normalizedPallet = mapPallet === NO_PALLET ? "" : mapPallet;
    var selection = {
      region: mapRegion,
      sectionLetter: mapRow,
      sectionNumber: mapCol,
      pallet: normalizedPallet,
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
    var normalizedPallet = mapPallet === NO_PALLET ? "" : mapPallet;
    onView({
      region: mapRegion,
      sectionLetter: mapRow,
      sectionNumber: mapCol,
      pallet: normalizedPallet,
      bin: mapBin
    });
  };

  return __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"], {
    show: show,
    onHide: onHide,
    centered: true,
    size: "lg",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 260,
      columnNumber: 5
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Header, {
    closeButton: true,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 261,
      columnNumber: 7
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Title, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 262,
      columnNumber: 9
    }
  }, "Warehouse Map")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Body, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 264,
      columnNumber: 7
    }
  }, mapLoading && __jsx("div", {
    className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.mapLoading,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 266,
      columnNumber: 11
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Spinner"], {
    animation: "border",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 267,
      columnNumber: 13
    }
  }), __jsx("span", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 268,
      columnNumber: 13
    }
  }, "Loading map data...")), mapError && __jsx("div", {
    className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.mapError,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 271,
      columnNumber: 22
    }
  }, mapError), !mapLoading && mapStep === "regions" && __jsx("div", {
    className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.mapStage,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 274,
      columnNumber: 11
    }
  }, __jsx("div", {
    className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.mapHint,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 275,
      columnNumber: 13
    }
  }, "Select a region"), __jsx("div", {
    className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.mapCanvas,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 276,
      columnNumber: 13
    }
  }, REGION_ORDER.map(function (regionId) {
    return __jsx("button", {
      key: regionId,
      type: "button",
      className: "".concat(_WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.regionBlock, " ").concat(_WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a["region".concat(regionId)]),
      onClick: function onClick() {
        return handleSelectRegion(regionId);
      },
      disabled: Array.isArray(regionOptions) && regionOptions.length > 0 && !regionOptions.includes(regionId),
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 278,
        columnNumber: 17
      }
    }, regionId);
  }))), !mapLoading && mapStep === "grid" && __jsx("div", {
    className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.mapStage,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 297,
      columnNumber: 11
    }
  }, __jsx("div", {
    className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.mapHint,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 298,
      columnNumber: 13
    }
  }, "Region ", mapRegion, ": choose a row and column"), function () {
    var dims = getRegionDimensions(mapRegion);
    var rows = LETTERS.slice(0, dims.rows || 0).reverse();
    var cols = NUMBERS.slice(0, dims.cols || 0);

    if (!rows.length || !cols.length) {
      var sectionKeys = Object.keys(mapCellPallets || {}).filter(Boolean).map(function (key) {
        var _key$split = key.split("-"),
            _key$split2 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_key$split, 2),
            row = _key$split2[0],
            col = _key$split2[1];

        return {
          key: key,
          row: row,
          col: col
        };
      }).sort(function (a, b) {
        if (a.row === b.row) {
          return Number(a.col) - Number(b.col);
        }

        return b.row.localeCompare(a.row);
      });

      if (!sectionKeys.length) {
        return __jsx("div", {
          className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.mapEmpty,
          __self: _this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 321,
            columnNumber: 21
          }
        }, "No grid data for this region.");
      }

      return __jsx("div", {
        className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.gridWrapper,
        __self: _this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 328,
          columnNumber: 19
        }
      }, __jsx("div", {
        className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.mapHint,
        __self: _this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 329,
          columnNumber: 21
        }
      }, "Grid not available. Select an available section below."), __jsx("div", {
        className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.palletGrid,
        __self: _this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 332,
          columnNumber: 21
        }
      }, sectionKeys.map(function (_ref5) {
        var key = _ref5.key,
            row = _ref5.row,
            col = _ref5.col;
        return __jsx("button", {
          key: key,
          type: "button",
          className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.palletButton,
          onClick: function onClick() {
            return handleSelectCell(row, col);
          },
          __self: _this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 334,
            columnNumber: 25
          }
        }, row, col);
      })));
    }

    return __jsx("div", {
      className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.gridWrapper,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 349,
        columnNumber: 17
      }
    }, __jsx("div", {
      className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.grid,
      style: {
        "--grid-cols": cols.length
      },
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 350,
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
          className: "".concat(_WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.gridCell, " ").concat(hasPallets ? "" : _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.gridCellDisabled),
          onClick: function onClick() {
            return hasPallets && handleSelectCell(row, col);
          },
          disabled: !hasPallets,
          __self: _this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 361,
            columnNumber: 27
          }
        }, __jsx("span", {
          __self: _this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 372,
            columnNumber: 29
          }
        }, row, col));
      });
    })));
  }()), !mapLoading && mapStep === "pallets" && __jsx("div", {
    className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.mapStage,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 388,
      columnNumber: 11
    }
  }, __jsx("div", {
    className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.mapHint,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 389,
      columnNumber: 13
    }
  }, "Region ", mapRegion, " - Section ", mapRow, mapCol, ": select a pallet"), __jsx("div", {
    className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.palletGrid,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 393,
      columnNumber: 13
    }
  }, (mapCellPallets["".concat(mapRow, "-").concat(mapCol)] || []).map(function (pallet) {
    var palletKey = "".concat(mapRow, "-").concat(mapCol, "-P").concat(pallet);
    var bins = mapPalletBins[palletKey] || [];
    return __jsx("button", {
      key: pallet,
      type: "button",
      className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.palletButton,
      onClick: function onClick() {
        if (bins.length === 0 && typeof onView === "function") {
          var selection = {
            region: mapRegion,
            sectionLetter: mapRow,
            sectionNumber: mapCol,
            pallet: pallet === NO_PALLET ? "" : String(pallet),
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
        lineNumber: 398,
        columnNumber: 19
      }
    }, pallet === NO_PALLET ? "No Pallet" : "Pallet ".concat(pallet));
  }), !(mapCellPallets["".concat(mapRow, "-").concat(mapCol)] || []).length && __jsx("div", {
    className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.mapEmpty,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 423,
      columnNumber: 17
    }
  }, "No pallets available here."))), !mapLoading && mapStep === "bins" && __jsx("div", {
    className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.mapStage,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 432,
      columnNumber: 11
    }
  }, __jsx("div", {
    className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.mapHint,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 433,
      columnNumber: 13
    }
  }, "Region ", mapRegion, " - Section ", mapRow, mapCol, " - Pallet ", mapPallet), __jsx("div", {
    className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.palletGrid,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 437,
      columnNumber: 13
    }
  }, (mapPalletBins["".concat(mapRow, "-").concat(mapCol, "-P").concat(mapPallet)] || []).map(function (bin) {
    return __jsx("button", {
      key: bin,
      type: "button",
      className: "".concat(_WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.palletButton, " ").concat(_WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.binButton),
      onClick: function onClick() {
        return handleSelectBin(bin);
      },
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 440,
        columnNumber: 19
      }
    }, "Bin ", bin);
  }), !(mapPalletBins["".concat(mapRow, "-").concat(mapCol, "-P").concat(mapPallet)] || []).length && __jsx("div", {
    className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.mapEmpty,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 452,
      columnNumber: 17
    }
  }, "No bins available on this pallet.")))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Footer, {
    className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.mapFooter,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 460,
      columnNumber: 7
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], {
    variant: "outline-secondary",
    onClick: handleBack,
    disabled: mapStep === "regions",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 461,
      columnNumber: 9
    }
  }, "Back"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], {
    variant: "outline-primary",
    onClick: handleView,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 468,
      columnNumber: 9
    }
  }, "View"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], {
    variant: "secondary",
    onClick: onHide,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 471,
      columnNumber: 9
    }
  }, "Close")));
}

_s(WarehouseMapModal, "K3jZUBqumdfQwS4G3Gpw4/L1+uc=");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vY29tcG9uZW50cy9XYXJlaG91c2VNYXBNb2RhbC5qcyJdLCJuYW1lcyI6WyJSRUdJT05fT1JERVIiLCJOT19QQUxMRVQiLCJMRVRURVJTIiwiQXJyYXkiLCJmcm9tIiwibGVuZ3RoIiwiXyIsImkiLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJOVU1CRVJTIiwiV2FyZWhvdXNlTWFwTW9kYWwiLCJzaG93Iiwib25IaWRlIiwib25WaWV3Iiwib25TZWxlY3Rpb25DaGFuZ2UiLCJpbml0aWFsU2VsZWN0aW9uIiwidXNlU3RhdGUiLCJyZWdpb25PcHRpb25zIiwic2V0UmVnaW9uT3B0aW9ucyIsInNlY3Rpb25NYXAiLCJzZXRTZWN0aW9uTWFwIiwibWFwU3RlcCIsInNldE1hcFN0ZXAiLCJtYXBSZWdpb24iLCJzZXRNYXBSZWdpb24iLCJtYXBSb3ciLCJzZXRNYXBSb3ciLCJtYXBDb2wiLCJzZXRNYXBDb2wiLCJtYXBQYWxsZXQiLCJzZXRNYXBQYWxsZXQiLCJtYXBCaW4iLCJzZXRNYXBCaW4iLCJtYXBDZWxsUGFsbGV0cyIsInNldE1hcENlbGxQYWxsZXRzIiwibWFwUGFsbGV0QmlucyIsInNldE1hcFBhbGxldEJpbnMiLCJtYXBMb2FkaW5nIiwic2V0TWFwTG9hZGluZyIsIm1hcEVycm9yIiwic2V0TWFwRXJyb3IiLCJkaXJlY3RvcnlMb2FkZWQiLCJzZXREaXJlY3RvcnlMb2FkZWQiLCJsYXN0U2hvd1JlZiIsInVzZVJlZiIsIm5vdGlmeVNlbGVjdGlvbkNoYW5nZSIsInVzZUNhbGxiYWNrIiwic2VsZWN0aW9uIiwibG9hZERpcmVjdG9yeSIsImZpcmViYXNlIiwiZmlyZXN0b3JlIiwiY29sbGVjdGlvbiIsImRvYyIsImdldCIsImRhdGEiLCJSZWdpb24iLCJTZWN0aW9uIiwiY29uc29sZSIsImVycm9yIiwibG9hZFJlZ2lvbkludmVudG9yeSIsInJlZ2lvbklkIiwid2hlcmUiLCJzbmFwIiwiY2VsbFBhbGxldHMiLCJwYWxsZXRCaW5zIiwiZm9yRWFjaCIsImxvYyIsIm5ld0xvY2FsQ3VycmVudCIsInJvdyIsInNlY3Rpb24iLCJsZXR0ZXIiLCJjb2wiLCJudW1iZXIiLCJ0cmltbWVkIiwidHJpbSIsInNsaWNlIiwidW5kZWZpbmVkIiwicGFsbGV0IiwiYmluIiwiY2VsbEtleSIsImhhc0JpbiIsImhhc1BhbGxldCIsInBhbGxldElkIiwiU2V0IiwiYWRkIiwicGFsbGV0S2V5IiwiY2VsbE9iaiIsIk9iamVjdCIsImtleXMiLCJrZXkiLCJzb3J0IiwiYSIsImIiLCJuYSIsIk51bWJlciIsIm5iIiwiaXNGaW5pdGUiLCJsb2NhbGVDb21wYXJlIiwicGFsbGV0T2JqIiwiZ2V0UmVnaW9uRGltZW5zaW9ucyIsImVudHJ5IiwiaXNBcnJheSIsImNvbHMiLCJwYXJzZUludCIsInJvd3MiLCJ1c2VFZmZlY3QiLCJ3YXNPcGVuIiwiY3VycmVudCIsInJlZ2lvbiIsInNlY3Rpb25MZXR0ZXIiLCJzZWN0aW9uTnVtYmVyIiwiaGFuZGxlU2VsZWN0UmVnaW9uIiwiaGFuZGxlU2VsZWN0Q2VsbCIsInJvd0xldHRlciIsImNvbE51bWJlciIsImNvbFZhbHVlIiwiaGFuZGxlU2VsZWN0UGFsbGV0IiwicGFsbGV0VmFsdWUiLCJub3JtYWxpemVkUGFsbGV0IiwiaGFuZGxlU2VsZWN0QmluIiwiYmluSWQiLCJiaW5WYWx1ZSIsImhhbmRsZUJhY2siLCJoYW5kbGVWaWV3Iiwic3R5bGVzIiwibWFwU3RhZ2UiLCJtYXBIaW50IiwibWFwQ2FudmFzIiwibWFwIiwicmVnaW9uQmxvY2siLCJpbmNsdWRlcyIsImRpbXMiLCJyZXZlcnNlIiwic2VjdGlvbktleXMiLCJmaWx0ZXIiLCJCb29sZWFuIiwic3BsaXQiLCJtYXBFbXB0eSIsImdyaWRXcmFwcGVyIiwicGFsbGV0R3JpZCIsInBhbGxldEJ1dHRvbiIsImdyaWQiLCJoYXNQYWxsZXRzIiwiZ3JpZENlbGwiLCJncmlkQ2VsbERpc2FibGVkIiwiYmlucyIsImJpbkJ1dHRvbiIsIm1hcEZvb3RlciJd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QUEsR0FERCxDQURILEVBYUcsQ0FBQyxDQUFDM0MsYUFBYSxXQUFJVixNQUFKLGNBQWNFLE1BQWQsZUFBeUJFLFNBQXpCLEVBQWIsSUFBc0QsRUFBdkQsRUFDQ3pCLE1BREYsSUFFQztBQUFLLGFBQVMsRUFBRXdILG9FQUFNLENBQUNhLFFBQXZCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEseUNBZkosQ0FMRixDQXhLSixDQUpGLEVBd01FLE1BQUMscURBQUQsQ0FBTyxNQUFQO0FBQWMsYUFBUyxFQUFFYixvRUFBTSxDQUFDdUIsU0FBaEM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFLE1BQUMsc0RBQUQ7QUFDRSxXQUFPLEVBQUMsbUJBRFY7QUFFRSxXQUFPLEVBQUV6QixVQUZYO0FBR0UsWUFBUSxFQUFFckcsT0FBTyxLQUFLLFNBSHhCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFERixFQVFFLE1BQUMsc0RBQUQ7QUFBUSxXQUFPLEVBQUMsaUJBQWhCO0FBQWtDLFdBQU8sRUFBRXNHLFVBQTNDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFSRixFQVdFLE1BQUMsc0RBQUQ7QUFBUSxXQUFPLEVBQUMsV0FBaEI7QUFBNEIsV0FBTyxFQUFFL0csTUFBckM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQVhGLENBeE1GLENBREY7QUEwTkQ7O0dBaGR1QkYsaUI7O0tBQUFBLGlCIiwiZmlsZSI6InN0YXRpYy93ZWJwYWNrL3BhZ2VzL05ld1NlYXJjaC9tYWluU2VhcmNoLjBkZTdlY2M3YWYyZWJkZDRlY2U3LmhvdC11cGRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgTW9kYWwsIEJ1dHRvbiwgU3Bpbm5lciB9IGZyb20gXCJyZWFjdC1ib290c3RyYXBcIjtcbmltcG9ydCBmaXJlYmFzZSBmcm9tIFwiLi4vY29udGV4dC9GaXJlYmFzZVwiO1xuaW1wb3J0IHN0eWxlcyBmcm9tIFwiLi9XYXJlaG91c2VNYXBNb2RhbC5tb2R1bGUuY3NzXCI7XG5cbmNvbnN0IFJFR0lPTl9PUkRFUiA9IFtcIkVcIiwgXCJGXCIsIFwiR1wiLCBcIkFcIiwgXCJEXCIsIFwiQ1wiLCBcIkJcIl07XG5jb25zdCBOT19QQUxMRVQgPSBcIk5vUGFsbGV0XCI7XG5jb25zdCBMRVRURVJTID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogMjYgfSwgKF8sIGkpID0+XG4gIFN0cmluZy5mcm9tQ2hhckNvZGUoNjUgKyBpKVxuKTtcbmNvbnN0IE5VTUJFUlMgPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiA1MCB9LCAoXywgaSkgPT4gaSArIDEpO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBXYXJlaG91c2VNYXBNb2RhbCh7XG4gIHNob3cgPSBmYWxzZSxcbiAgb25IaWRlID0gKCkgPT4ge30sXG4gIG9uVmlldyxcbiAgb25TZWxlY3Rpb25DaGFuZ2UsXG4gIGluaXRpYWxTZWxlY3Rpb24gPSB7fSxcbn0pIHtcbiAgY29uc3QgW3JlZ2lvbk9wdGlvbnMsIHNldFJlZ2lvbk9wdGlvbnNdID0gdXNlU3RhdGUoW10pO1xuICBjb25zdCBbc2VjdGlvbk1hcCwgc2V0U2VjdGlvbk1hcF0gPSB1c2VTdGF0ZSh7fSk7XG4gIGNvbnN0IFttYXBTdGVwLCBzZXRNYXBTdGVwXSA9IHVzZVN0YXRlKFwicmVnaW9uc1wiKTtcbiAgY29uc3QgW21hcFJlZ2lvbiwgc2V0TWFwUmVnaW9uXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbbWFwUm93LCBzZXRNYXBSb3ddID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFttYXBDb2wsIHNldE1hcENvbF0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW21hcFBhbGxldCwgc2V0TWFwUGFsbGV0XSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbbWFwQmluLCBzZXRNYXBCaW5dID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFttYXBDZWxsUGFsbGV0cywgc2V0TWFwQ2VsbFBhbGxldHNdID0gdXNlU3RhdGUoe30pO1xuICBjb25zdCBbbWFwUGFsbGV0Qmlucywgc2V0TWFwUGFsbGV0Qmluc10gPSB1c2VTdGF0ZSh7fSk7XG4gIGNvbnN0IFttYXBMb2FkaW5nLCBzZXRNYXBMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW21hcEVycm9yLCBzZXRNYXBFcnJvcl0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2RpcmVjdG9yeUxvYWRlZCwgc2V0RGlyZWN0b3J5TG9hZGVkXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgbGFzdFNob3dSZWYgPSB1c2VSZWYoZmFsc2UpO1xuXG4gIGNvbnN0IG5vdGlmeVNlbGVjdGlvbkNoYW5nZSA9IHVzZUNhbGxiYWNrKFxuICAgIChzZWxlY3Rpb24pID0+IHtcbiAgICAgIGlmICh0eXBlb2Ygb25TZWxlY3Rpb25DaGFuZ2UgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBvblNlbGVjdGlvbkNoYW5nZShzZWxlY3Rpb24pO1xuICAgICAgfVxuICAgIH0sXG4gICAgW29uU2VsZWN0aW9uQ2hhbmdlXVxuICApO1xuXG4gIGNvbnN0IGxvYWREaXJlY3RvcnkgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XG4gICAgaWYgKGRpcmVjdG9yeUxvYWRlZCkgcmV0dXJuO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBkb2MgPSBhd2FpdCBmaXJlYmFzZVxuICAgICAgICAuZmlyZXN0b3JlKClcbiAgICAgICAgLmNvbGxlY3Rpb24oXCJXYXJlaG91c2VcIilcbiAgICAgICAgLmRvYyhcImRpcmVjdG9yeVwiKVxuICAgICAgICAuZ2V0KCk7XG4gICAgICBjb25zdCBkYXRhID0gZG9jLmRhdGEoKSB8fCB7fTtcbiAgICAgIHNldFJlZ2lvbk9wdGlvbnMoZGF0YS5SZWdpb24gfHwgW10pO1xuICAgICAgc2V0U2VjdGlvbk1hcChkYXRhLlNlY3Rpb24gfHwge30pO1xuICAgICAgc2V0RGlyZWN0b3J5TG9hZGVkKHRydWUpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGxvYWQgbWFwIGRpcmVjdG9yeVwiLCBlcnJvcik7XG4gICAgICBzZXRNYXBFcnJvcihcIkZhaWxlZCB0byBsb2FkIHdhcmVob3VzZSBkaXJlY3RvcnkuXCIpO1xuICAgIH1cbiAgfSwgW2RpcmVjdG9yeUxvYWRlZF0pO1xuXG4gIGNvbnN0IGxvYWRSZWdpb25JbnZlbnRvcnkgPSB1c2VDYWxsYmFjayhhc3luYyAocmVnaW9uSWQpID0+IHtcbiAgICBpZiAoIXJlZ2lvbklkKSByZXR1cm47XG4gICAgc2V0TWFwTG9hZGluZyh0cnVlKTtcbiAgICBzZXRNYXBFcnJvcihcIlwiKTtcbiAgICB0cnkge1xuICAgICAgY29uc3Qgc25hcCA9IGF3YWl0IGZpcmViYXNlXG4gICAgICAgIC5maXJlc3RvcmUoKVxuICAgICAgICAuY29sbGVjdGlvbihcIlRlc3RcIilcbiAgICAgICAgLndoZXJlKFwibmV3TG9jYWxDdXJyZW50LnJlZ2lvblwiLCBcIj09XCIsIHJlZ2lvbklkKVxuICAgICAgICAuZ2V0KCk7XG5cbiAgICAgIGNvbnN0IGNlbGxQYWxsZXRzID0ge307XG4gICAgICBjb25zdCBwYWxsZXRCaW5zID0ge307XG4gICAgICBzbmFwLmZvckVhY2goKGRvYykgPT4ge1xuICAgICAgICBjb25zdCBsb2MgPSBkb2MuZGF0YSgpPy5uZXdMb2NhbEN1cnJlbnQgfHwge307XG4gICAgICAgIGxldCByb3cgPSBsb2Muc2VjdGlvbj8ubGV0dGVyO1xuICAgICAgICBsZXQgY29sID0gbG9jLnNlY3Rpb24/Lm51bWJlcjtcbiAgICAgICAgaWYgKCghcm93IHx8ICFjb2wpICYmIHR5cGVvZiBsb2Muc2VjdGlvbiA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgIGNvbnN0IHRyaW1tZWQgPSBsb2Muc2VjdGlvbi50cmltKCk7XG4gICAgICAgICAgcm93ID0gdHJpbW1lZC5zbGljZSgwLCAxKTtcbiAgICAgICAgICBjb2wgPSB0cmltbWVkLnNsaWNlKDEpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb2wgIT09IHVuZGVmaW5lZCAmJiBjb2wgIT09IG51bGwpIHtcbiAgICAgICAgICBjb2wgPSBTdHJpbmcoY29sKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwYWxsZXQgPSBsb2MucGFsbGV0O1xuICAgICAgICBjb25zdCBiaW4gPSBsb2MuYmluO1xuICAgICAgICBpZiAoIXJvdyB8fCAhY29sKSByZXR1cm47XG4gICAgICAgIGNvbnN0IGNlbGxLZXkgPSBgJHtyb3d9LSR7Y29sfWA7XG4gICAgICAgIGNvbnN0IGhhc0JpbiA9IGJpbiAhPT0gdW5kZWZpbmVkICYmIGJpbiAhPT0gbnVsbCAmJiBgJHtiaW59YCAhPT0gXCJcIjtcbiAgICAgICAgY29uc3QgaGFzUGFsbGV0ID1cbiAgICAgICAgICBwYWxsZXQgIT09IHVuZGVmaW5lZCAmJiBwYWxsZXQgIT09IG51bGwgJiYgYCR7cGFsbGV0fWAgIT09IFwiXCI7XG4gICAgICAgIGlmICghaGFzUGFsbGV0ICYmICFoYXNCaW4pIHJldHVybjtcblxuICAgICAgICBjb25zdCBwYWxsZXRJZCA9IGhhc1BhbGxldCA/IFN0cmluZyhwYWxsZXQpIDogTk9fUEFMTEVUO1xuICAgICAgICBpZiAoIWNlbGxQYWxsZXRzW2NlbGxLZXldKSBjZWxsUGFsbGV0c1tjZWxsS2V5XSA9IG5ldyBTZXQoKTtcbiAgICAgICAgY2VsbFBhbGxldHNbY2VsbEtleV0uYWRkKHBhbGxldElkKTtcblxuICAgICAgICBpZiAoaGFzQmluKSB7XG4gICAgICAgICAgY29uc3QgcGFsbGV0S2V5ID0gYCR7Y2VsbEtleX0tUCR7cGFsbGV0SWR9YDtcbiAgICAgICAgICBpZiAoIXBhbGxldEJpbnNbcGFsbGV0S2V5XSkgcGFsbGV0Qmluc1twYWxsZXRLZXldID0gbmV3IFNldCgpO1xuICAgICAgICAgIHBhbGxldEJpbnNbcGFsbGV0S2V5XS5hZGQoU3RyaW5nKGJpbikpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgY29uc3QgY2VsbE9iaiA9IHt9O1xuICAgICAgT2JqZWN0LmtleXMoY2VsbFBhbGxldHMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICBjZWxsT2JqW2tleV0gPSBBcnJheS5mcm9tKGNlbGxQYWxsZXRzW2tleV0pLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICBpZiAoYSA9PT0gTk9fUEFMTEVUKSByZXR1cm4gMTtcbiAgICAgICAgICBpZiAoYiA9PT0gTk9fUEFMTEVUKSByZXR1cm4gLTE7XG4gICAgICAgICAgY29uc3QgbmEgPSBOdW1iZXIoYSk7XG4gICAgICAgICAgY29uc3QgbmIgPSBOdW1iZXIoYik7XG4gICAgICAgICAgaWYgKE51bWJlci5pc0Zpbml0ZShuYSkgJiYgTnVtYmVyLmlzRmluaXRlKG5iKSkgcmV0dXJuIG5hIC0gbmI7XG4gICAgICAgICAgcmV0dXJuIFN0cmluZyhhKS5sb2NhbGVDb21wYXJlKFN0cmluZyhiKSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IHBhbGxldE9iaiA9IHt9O1xuICAgICAgT2JqZWN0LmtleXMocGFsbGV0QmlucykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgIHBhbGxldE9ialtrZXldID0gQXJyYXkuZnJvbShwYWxsZXRCaW5zW2tleV0pLnNvcnQoXG4gICAgICAgICAgKGEsIGIpID0+IE51bWJlcihhKSAtIE51bWJlcihiKVxuICAgICAgICApO1xuICAgICAgfSk7XG5cbiAgICAgIHNldE1hcENlbGxQYWxsZXRzKGNlbGxPYmopO1xuICAgICAgc2V0TWFwUGFsbGV0QmlucyhwYWxsZXRPYmopO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGxvYWQgbWFwIGludmVudG9yeVwiLCBlcnJvcik7XG4gICAgICBzZXRNYXBFcnJvcihcIkZhaWxlZCB0byBsb2FkIG1hcCBpbnZlbnRvcnkuXCIpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRNYXBMb2FkaW5nKGZhbHNlKTtcbiAgICB9XG4gIH0sIFtdKTtcblxuICBjb25zdCBnZXRSZWdpb25EaW1lbnNpb25zID0gdXNlQ2FsbGJhY2soXG4gICAgKHJlZ2lvbklkKSA9PiB7XG4gICAgICBjb25zdCBlbnRyeSA9IHNlY3Rpb25NYXA/LltyZWdpb25JZF07XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShlbnRyeSkgJiYgZW50cnkubGVuZ3RoID49IDIpIHtcbiAgICAgICAgY29uc3QgY29scyA9IHBhcnNlSW50KGVudHJ5WzBdLCAxMCk7XG4gICAgICAgIGNvbnN0IHJvd3MgPSBwYXJzZUludChlbnRyeVsxXSwgMTApO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGNvbHM6IE51bWJlci5pc0Zpbml0ZShjb2xzKSA/IGNvbHMgOiAwLFxuICAgICAgICAgIHJvd3M6IE51bWJlci5pc0Zpbml0ZShyb3dzKSA/IHJvd3MgOiAwLFxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHsgY29sczogMCwgcm93czogMCB9O1xuICAgIH0sXG4gICAgW3NlY3Rpb25NYXBdXG4gICk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCB3YXNPcGVuID0gbGFzdFNob3dSZWYuY3VycmVudDtcbiAgICBsYXN0U2hvd1JlZi5jdXJyZW50ID0gc2hvdztcbiAgICBpZiAoIXNob3cgfHwgd2FzT3BlbikgcmV0dXJuO1xuXG4gICAgbG9hZERpcmVjdG9yeSgpO1xuICAgIHNldE1hcEVycm9yKFwiXCIpO1xuICAgIGNvbnN0IHtcbiAgICAgIHJlZ2lvbixcbiAgICAgIHNlY3Rpb25MZXR0ZXIsXG4gICAgICBzZWN0aW9uTnVtYmVyLFxuICAgICAgcGFsbGV0LFxuICAgICAgYmluLFxuICAgIH0gPSBpbml0aWFsU2VsZWN0aW9uIHx8IHt9O1xuXG4gICAgc2V0TWFwUmVnaW9uKHJlZ2lvbiB8fCBcIlwiKTtcbiAgICBzZXRNYXBSb3coc2VjdGlvbkxldHRlciB8fCBcIlwiKTtcbiAgICBzZXRNYXBDb2woc2VjdGlvbk51bWJlciA/IFN0cmluZyhzZWN0aW9uTnVtYmVyKSA6IFwiXCIpO1xuICAgIHNldE1hcFBhbGxldChwYWxsZXQgPyBTdHJpbmcocGFsbGV0KSA6IFwiXCIpO1xuICAgIHNldE1hcEJpbihiaW4gPyBTdHJpbmcoYmluKSA6IFwiXCIpO1xuICAgIHNldE1hcFN0ZXAocmVnaW9uID8gXCJncmlkXCIgOiBcInJlZ2lvbnNcIik7XG4gICAgaWYgKHJlZ2lvbikgbG9hZFJlZ2lvbkludmVudG9yeShyZWdpb24pO1xuICB9LCBbc2hvdywgaW5pdGlhbFNlbGVjdGlvbiwgbG9hZERpcmVjdG9yeSwgbG9hZFJlZ2lvbkludmVudG9yeV0pO1xuXG4gIGNvbnN0IGhhbmRsZVNlbGVjdFJlZ2lvbiA9IChyZWdpb25JZCkgPT4ge1xuICAgIGNvbnN0IHNlbGVjdGlvbiA9IHtcbiAgICAgIHJlZ2lvbjogcmVnaW9uSWQsXG4gICAgICBzZWN0aW9uTGV0dGVyOiBcIlwiLFxuICAgICAgc2VjdGlvbk51bWJlcjogXCJcIixcbiAgICAgIHBhbGxldDogXCJcIixcbiAgICAgIGJpbjogXCJcIixcbiAgICB9O1xuICAgIHNldE1hcFJlZ2lvbihyZWdpb25JZCk7XG4gICAgc2V0TWFwUm93KFwiXCIpO1xuICAgIHNldE1hcENvbChcIlwiKTtcbiAgICBzZXRNYXBQYWxsZXQoXCJcIik7XG4gICAgc2V0TWFwQmluKFwiXCIpO1xuICAgIHNldE1hcFN0ZXAoXCJncmlkXCIpO1xuICAgIG5vdGlmeVNlbGVjdGlvbkNoYW5nZShzZWxlY3Rpb24pO1xuICAgIGxvYWRSZWdpb25JbnZlbnRvcnkocmVnaW9uSWQpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVNlbGVjdENlbGwgPSAocm93TGV0dGVyLCBjb2xOdW1iZXIpID0+IHtcbiAgICBjb25zdCBjb2xWYWx1ZSA9IFN0cmluZyhjb2xOdW1iZXIpO1xuICAgIGNvbnN0IHNlbGVjdGlvbiA9IHtcbiAgICAgIHJlZ2lvbjogbWFwUmVnaW9uLFxuICAgICAgc2VjdGlvbkxldHRlcjogcm93TGV0dGVyLFxuICAgICAgc2VjdGlvbk51bWJlcjogY29sVmFsdWUsXG4gICAgICBwYWxsZXQ6IFwiXCIsXG4gICAgICBiaW46IFwiXCIsXG4gICAgfTtcbiAgICBzZXRNYXBSb3cocm93TGV0dGVyKTtcbiAgICBzZXRNYXBDb2woY29sVmFsdWUpO1xuICAgIHNldE1hcFBhbGxldChcIlwiKTtcbiAgICBzZXRNYXBCaW4oXCJcIik7XG4gICAgc2V0TWFwU3RlcChcInBhbGxldHNcIik7XG4gICAgbm90aWZ5U2VsZWN0aW9uQ2hhbmdlKHNlbGVjdGlvbik7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlU2VsZWN0UGFsbGV0ID0gKHBhbGxldElkKSA9PiB7XG4gICAgY29uc3QgcGFsbGV0VmFsdWUgPSBTdHJpbmcocGFsbGV0SWQpO1xuICAgIGNvbnN0IG5vcm1hbGl6ZWRQYWxsZXQgPSBwYWxsZXRWYWx1ZSA9PT0gTk9fUEFMTEVUID8gXCJcIiA6IHBhbGxldFZhbHVlO1xuICAgIGNvbnN0IHNlbGVjdGlvbiA9IHtcbiAgICAgIHJlZ2lvbjogbWFwUmVnaW9uLFxuICAgICAgc2VjdGlvbkxldHRlcjogbWFwUm93LFxuICAgICAgc2VjdGlvbk51bWJlcjogbWFwQ29sLFxuICAgICAgcGFsbGV0OiBub3JtYWxpemVkUGFsbGV0LFxuICAgICAgYmluOiBcIlwiLFxuICAgIH07XG4gICAgc2V0TWFwUGFsbGV0KHBhbGxldFZhbHVlKTtcbiAgICBzZXRNYXBCaW4oXCJcIik7XG4gICAgc2V0TWFwU3RlcChcImJpbnNcIik7XG4gICAgbm90aWZ5U2VsZWN0aW9uQ2hhbmdlKHNlbGVjdGlvbik7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlU2VsZWN0QmluID0gKGJpbklkKSA9PiB7XG4gICAgY29uc3QgYmluVmFsdWUgPSBTdHJpbmcoYmluSWQpO1xuICAgIGNvbnN0IG5vcm1hbGl6ZWRQYWxsZXQgPSBtYXBQYWxsZXQgPT09IE5PX1BBTExFVCA/IFwiXCIgOiBtYXBQYWxsZXQ7XG4gICAgY29uc3Qgc2VsZWN0aW9uID0ge1xuICAgICAgcmVnaW9uOiBtYXBSZWdpb24sXG4gICAgICBzZWN0aW9uTGV0dGVyOiBtYXBSb3csXG4gICAgICBzZWN0aW9uTnVtYmVyOiBtYXBDb2wsXG4gICAgICBwYWxsZXQ6IG5vcm1hbGl6ZWRQYWxsZXQsXG4gICAgICBiaW46IGJpblZhbHVlLFxuICAgIH07XG4gICAgc2V0TWFwQmluKGJpblZhbHVlKTtcbiAgICBub3RpZnlTZWxlY3Rpb25DaGFuZ2Uoc2VsZWN0aW9uKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVCYWNrID0gKCkgPT4ge1xuICAgIGlmIChtYXBTdGVwID09PSBcImJpbnNcIikgc2V0TWFwU3RlcChcInBhbGxldHNcIik7XG4gICAgZWxzZSBpZiAobWFwU3RlcCA9PT0gXCJwYWxsZXRzXCIpIHNldE1hcFN0ZXAoXCJncmlkXCIpO1xuICAgIGVsc2UgaWYgKG1hcFN0ZXAgPT09IFwiZ3JpZFwiKSBzZXRNYXBTdGVwKFwicmVnaW9uc1wiKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVWaWV3ID0gKCkgPT4ge1xuICAgIGlmICh0eXBlb2Ygb25WaWV3ICE9PSBcImZ1bmN0aW9uXCIpIHJldHVybjtcbiAgICBjb25zdCBub3JtYWxpemVkUGFsbGV0ID0gbWFwUGFsbGV0ID09PSBOT19QQUxMRVQgPyBcIlwiIDogbWFwUGFsbGV0O1xuICAgIG9uVmlldyh7XG4gICAgICByZWdpb246IG1hcFJlZ2lvbixcbiAgICAgIHNlY3Rpb25MZXR0ZXI6IG1hcFJvdyxcbiAgICAgIHNlY3Rpb25OdW1iZXI6IG1hcENvbCxcbiAgICAgIHBhbGxldDogbm9ybWFsaXplZFBhbGxldCxcbiAgICAgIGJpbjogbWFwQmluLFxuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPE1vZGFsIHNob3c9e3Nob3d9IG9uSGlkZT17b25IaWRlfSBjZW50ZXJlZCBzaXplPVwibGdcIj5cbiAgICAgIDxNb2RhbC5IZWFkZXIgY2xvc2VCdXR0b24+XG4gICAgICAgIDxNb2RhbC5UaXRsZT5XYXJlaG91c2UgTWFwPC9Nb2RhbC5UaXRsZT5cbiAgICAgIDwvTW9kYWwuSGVhZGVyPlxuICAgICAgPE1vZGFsLkJvZHk+XG4gICAgICAgIHttYXBMb2FkaW5nICYmIChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLm1hcExvYWRpbmd9PlxuICAgICAgICAgICAgPFNwaW5uZXIgYW5pbWF0aW9uPVwiYm9yZGVyXCIgLz5cbiAgICAgICAgICAgIDxzcGFuPkxvYWRpbmcgbWFwIGRhdGEuLi48L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9XG4gICAgICAgIHttYXBFcnJvciAmJiA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLm1hcEVycm9yfT57bWFwRXJyb3J9PC9kaXY+fVxuXG4gICAgICAgIHshbWFwTG9hZGluZyAmJiBtYXBTdGVwID09PSBcInJlZ2lvbnNcIiAmJiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5tYXBTdGFnZX0+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLm1hcEhpbnR9PlNlbGVjdCBhIHJlZ2lvbjwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5tYXBDYW52YXN9PlxuICAgICAgICAgICAgICB7UkVHSU9OX09SREVSLm1hcCgocmVnaW9uSWQpID0+IChcbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBrZXk9e3JlZ2lvbklkfVxuICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2Ake3N0eWxlcy5yZWdpb25CbG9ja30gJHtzdHlsZXNbYHJlZ2lvbiR7cmVnaW9uSWR9YF19YH1cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZVNlbGVjdFJlZ2lvbihyZWdpb25JZCl9XG4gICAgICAgICAgICAgICAgICBkaXNhYmxlZD17XG4gICAgICAgICAgICAgICAgICAgIEFycmF5LmlzQXJyYXkocmVnaW9uT3B0aW9ucykgJiZcbiAgICAgICAgICAgICAgICAgICAgcmVnaW9uT3B0aW9ucy5sZW5ndGggPiAwICYmXG4gICAgICAgICAgICAgICAgICAgICFyZWdpb25PcHRpb25zLmluY2x1ZGVzKHJlZ2lvbklkKVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIHtyZWdpb25JZH1cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cblxuICAgICAgICB7IW1hcExvYWRpbmcgJiYgbWFwU3RlcCA9PT0gXCJncmlkXCIgJiYgKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubWFwU3RhZ2V9PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5tYXBIaW50fT5cbiAgICAgICAgICAgICAgUmVnaW9uIHttYXBSZWdpb259OiBjaG9vc2UgYSByb3cgYW5kIGNvbHVtblxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB7KCgpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgZGltcyA9IGdldFJlZ2lvbkRpbWVuc2lvbnMobWFwUmVnaW9uKTtcbiAgICAgICAgICAgICAgY29uc3Qgcm93cyA9IExFVFRFUlMuc2xpY2UoMCwgZGltcy5yb3dzIHx8IDApLnJldmVyc2UoKTtcbiAgICAgICAgICAgICAgY29uc3QgY29scyA9IE5VTUJFUlMuc2xpY2UoMCwgZGltcy5jb2xzIHx8IDApO1xuICAgICAgICAgICAgICBpZiAoIXJvd3MubGVuZ3RoIHx8ICFjb2xzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNlY3Rpb25LZXlzID0gT2JqZWN0LmtleXMobWFwQ2VsbFBhbGxldHMgfHwge30pXG4gICAgICAgICAgICAgICAgICAuZmlsdGVyKEJvb2xlYW4pXG4gICAgICAgICAgICAgICAgICAubWFwKChrZXkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgW3JvdywgY29sXSA9IGtleS5zcGxpdChcIi1cIik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGtleSwgcm93LCBjb2wgfTtcbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoYS5yb3cgPT09IGIucm93KSB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIE51bWJlcihhLmNvbCkgLSBOdW1iZXIoYi5jb2wpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBiLnJvdy5sb2NhbGVDb21wYXJlKGEucm93KTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFzZWN0aW9uS2V5cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubWFwRW1wdHl9PlxuICAgICAgICAgICAgICAgICAgICAgIE5vIGdyaWQgZGF0YSBmb3IgdGhpcyByZWdpb24uXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5ncmlkV3JhcHBlcn0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubWFwSGludH0+XG4gICAgICAgICAgICAgICAgICAgICAgR3JpZCBub3QgYXZhaWxhYmxlLiBTZWxlY3QgYW4gYXZhaWxhYmxlIHNlY3Rpb24gYmVsb3cuXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnBhbGxldEdyaWR9PlxuICAgICAgICAgICAgICAgICAgICAgIHtzZWN0aW9uS2V5cy5tYXAoKHsga2V5LCByb3csIGNvbCB9KSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17a2V5fVxuICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMucGFsbGV0QnV0dG9ufVxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVTZWxlY3RDZWxsKHJvdywgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAge3Jvd31cbiAgICAgICAgICAgICAgICAgICAgICAgICAge2NvbH1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmdyaWRXcmFwcGVyfT5cbiAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMuZ3JpZH1cbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgXCItLWdyaWQtY29sc1wiOiBjb2xzLmxlbmd0aCB9fVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7cm93cy5tYXAoKHJvdykgPT5cbiAgICAgICAgICAgICAgICAgICAgICBjb2xzLm1hcCgoY29sKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjZWxsS2V5ID0gYCR7cm93fS0ke2NvbH1gO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaGFzUGFsbGV0cyA9IEJvb2xlYW4oXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG1hcENlbGxQYWxsZXRzW2NlbGxLZXldPy5sZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtjZWxsS2V5fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YCR7c3R5bGVzLmdyaWRDZWxsfSAke1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzUGFsbGV0cyA/IFwiXCIgOiBzdHlsZXMuZ3JpZENlbGxEaXNhYmxlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNQYWxsZXRzICYmIGhhbmRsZVNlbGVjdENlbGwocm93LCBjb2wpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXshaGFzUGFsbGV0c31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3Jvd31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtjb2x9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSkoKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cblxuICAgICAgICB7IW1hcExvYWRpbmcgJiYgbWFwU3RlcCA9PT0gXCJwYWxsZXRzXCIgJiYgKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubWFwU3RhZ2V9PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5tYXBIaW50fT5cbiAgICAgICAgICAgICAgUmVnaW9uIHttYXBSZWdpb259IC0gU2VjdGlvbiB7bWFwUm93fVxuICAgICAgICAgICAgICB7bWFwQ29sfTogc2VsZWN0IGEgcGFsbGV0XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMucGFsbGV0R3JpZH0+XG4gICAgICAgICAgICAgIHsobWFwQ2VsbFBhbGxldHNbYCR7bWFwUm93fS0ke21hcENvbH1gXSB8fCBbXSkubWFwKChwYWxsZXQpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBwYWxsZXRLZXkgPSBgJHttYXBSb3d9LSR7bWFwQ29sfS1QJHtwYWxsZXR9YDtcbiAgICAgICAgICAgICAgICBjb25zdCBiaW5zID0gbWFwUGFsbGV0Qmluc1twYWxsZXRLZXldIHx8IFtdO1xuICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGtleT17cGFsbGV0fVxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMucGFsbGV0QnV0dG9ufVxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKGJpbnMubGVuZ3RoID09PSAwICYmIHR5cGVvZiBvblZpZXcgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0aW9uID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICByZWdpb246IG1hcFJlZ2lvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2VjdGlvbkxldHRlcjogbWFwUm93LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBzZWN0aW9uTnVtYmVyOiBtYXBDb2wsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHBhbGxldDogcGFsbGV0ID09PSBOT19QQUxMRVQgPyBcIlwiIDogU3RyaW5nKHBhbGxldCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJpbjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICBub3RpZnlTZWxlY3Rpb25DaGFuZ2Uoc2VsZWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uVmlldyhzZWxlY3Rpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVTZWxlY3RQYWxsZXQocGFsbGV0KTtcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAge3BhbGxldCA9PT0gTk9fUEFMTEVUID8gXCJObyBQYWxsZXRcIiA6IGBQYWxsZXQgJHtwYWxsZXR9YH1cbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICB7IShtYXBDZWxsUGFsbGV0c1tgJHttYXBSb3d9LSR7bWFwQ29sfWBdIHx8IFtdKS5sZW5ndGggJiYgKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubWFwRW1wdHl9PlxuICAgICAgICAgICAgICAgICAgTm8gcGFsbGV0cyBhdmFpbGFibGUgaGVyZS5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuXG4gICAgICAgIHshbWFwTG9hZGluZyAmJiBtYXBTdGVwID09PSBcImJpbnNcIiAmJiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5tYXBTdGFnZX0+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLm1hcEhpbnR9PlxuICAgICAgICAgICAgICBSZWdpb24ge21hcFJlZ2lvbn0gLSBTZWN0aW9uIHttYXBSb3d9XG4gICAgICAgICAgICAgIHttYXBDb2x9IC0gUGFsbGV0IHttYXBQYWxsZXR9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMucGFsbGV0R3JpZH0+XG4gICAgICAgICAgICAgIHsobWFwUGFsbGV0Qmluc1tgJHttYXBSb3d9LSR7bWFwQ29sfS1QJHttYXBQYWxsZXR9YF0gfHwgW10pLm1hcChcbiAgICAgICAgICAgICAgICAoYmluKSA9PiAoXG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGtleT17YmlufVxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgJHtzdHlsZXMucGFsbGV0QnV0dG9ufSAke3N0eWxlcy5iaW5CdXR0b259YH1cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlU2VsZWN0QmluKGJpbil9XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIEJpbiB7YmlufVxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICB7IShtYXBQYWxsZXRCaW5zW2Ake21hcFJvd30tJHttYXBDb2x9LVAke21hcFBhbGxldH1gXSB8fCBbXSlcbiAgICAgICAgICAgICAgICAubGVuZ3RoICYmIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLm1hcEVtcHR5fT5cbiAgICAgICAgICAgICAgICAgIE5vIGJpbnMgYXZhaWxhYmxlIG9uIHRoaXMgcGFsbGV0LlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9XG4gICAgICA8L01vZGFsLkJvZHk+XG4gICAgICA8TW9kYWwuRm9vdGVyIGNsYXNzTmFtZT17c3R5bGVzLm1hcEZvb3Rlcn0+XG4gICAgICAgIDxCdXR0b25cbiAgICAgICAgICB2YXJpYW50PVwib3V0bGluZS1zZWNvbmRhcnlcIlxuICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZUJhY2t9XG4gICAgICAgICAgZGlzYWJsZWQ9e21hcFN0ZXAgPT09IFwicmVnaW9uc1wifVxuICAgICAgICA+XG4gICAgICAgICAgQmFja1xuICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgPEJ1dHRvbiB2YXJpYW50PVwib3V0bGluZS1wcmltYXJ5XCIgb25DbGljaz17aGFuZGxlVmlld30+XG4gICAgICAgICAgVmlld1xuICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgPEJ1dHRvbiB2YXJpYW50PVwic2Vjb25kYXJ5XCIgb25DbGljaz17b25IaWRlfT5cbiAgICAgICAgICBDbG9zZVxuICAgICAgICA8L0J1dHRvbj5cbiAgICAgIDwvTW9kYWwuRm9vdGVyPlxuICAgIDwvTW9kYWw+XG4gICk7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9