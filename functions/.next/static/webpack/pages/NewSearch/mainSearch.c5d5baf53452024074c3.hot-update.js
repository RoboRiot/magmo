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

  return __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"], {
    show: show,
    onHide: onHide,
    centered: true,
    size: "lg",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 246,
      columnNumber: 5
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Header, {
    closeButton: true,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 247,
      columnNumber: 7
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Title, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 248,
      columnNumber: 9
    }
  }, "Warehouse Map")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Body, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 250,
      columnNumber: 7
    }
  }, mapLoading && __jsx("div", {
    className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.mapLoading,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 252,
      columnNumber: 11
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Spinner"], {
    animation: "border",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 253,
      columnNumber: 13
    }
  }), __jsx("span", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 254,
      columnNumber: 13
    }
  }, "Loading map data...")), mapError && __jsx("div", {
    className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.mapError,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 257,
      columnNumber: 22
    }
  }, mapError), !mapLoading && mapStep === "regions" && __jsx("div", {
    className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.mapStage,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 260,
      columnNumber: 11
    }
  }, __jsx("div", {
    className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.mapHint,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 261,
      columnNumber: 13
    }
  }, "Select a region"), __jsx("div", {
    className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.mapCanvas,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 262,
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
        lineNumber: 264,
        columnNumber: 17
      }
    }, regionId);
  }))), !mapLoading && mapStep === "grid" && __jsx("div", {
    className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.mapStage,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 283,
      columnNumber: 11
    }
  }, __jsx("div", {
    className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.mapHint,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 284,
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
            lineNumber: 307,
            columnNumber: 21
          }
        }, "No grid data for this region.");
      }

      return __jsx("div", {
        className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.gridWrapper,
        __self: _this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 314,
          columnNumber: 19
        }
      }, __jsx("div", {
        className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.mapHint,
        __self: _this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 315,
          columnNumber: 21
        }
      }, "Grid not available. Select an available section below."), __jsx("div", {
        className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.palletGrid,
        __self: _this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 318,
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
            lineNumber: 320,
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
        lineNumber: 335,
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
        lineNumber: 336,
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
            lineNumber: 347,
            columnNumber: 27
          }
        }, __jsx("span", {
          __self: _this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 358,
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
      lineNumber: 374,
      columnNumber: 11
    }
  }, __jsx("div", {
    className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.mapHint,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 375,
      columnNumber: 13
    }
  }, "Region ", mapRegion, " - Section ", mapRow, mapCol, ": select a pallet"), __jsx("div", {
    className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.palletGrid,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 379,
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
        lineNumber: 384,
        columnNumber: 19
      }
    }, "Pallet ", pallet);
  }), !(mapCellPallets["".concat(mapRow, "-").concat(mapCol)] || []).length && __jsx("div", {
    className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.mapEmpty,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 409,
      columnNumber: 17
    }
  }, "No pallets available here."))), !mapLoading && mapStep === "bins" && __jsx("div", {
    className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.mapStage,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 418,
      columnNumber: 11
    }
  }, __jsx("div", {
    className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.mapHint,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 419,
      columnNumber: 13
    }
  }, "Region ", mapRegion, " - Section ", mapRow, mapCol, " - Pallet ", mapPallet), __jsx("div", {
    className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.palletGrid,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 423,
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
        lineNumber: 426,
        columnNumber: 19
      }
    }, "Bin ", bin);
  }), !(mapPalletBins["".concat(mapRow, "-").concat(mapCol, "-P").concat(mapPallet)] || []).length && __jsx("div", {
    className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.mapEmpty,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 438,
      columnNumber: 17
    }
  }, "No bins available on this pallet.")))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Footer, {
    className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.mapFooter,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 446,
      columnNumber: 7
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], {
    variant: "outline-secondary",
    onClick: handleBack,
    disabled: mapStep === "regions",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 447,
      columnNumber: 9
    }
  }, "Back"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], {
    variant: "outline-primary",
    onClick: handleView,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 454,
      columnNumber: 9
    }
  }, "View"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], {
    variant: "secondary",
    onClick: onHide,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 457,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vY29tcG9uZW50cy9XYXJlaG91c2VNYXBNb2RhbC5qcyJdLCJuYW1lcyI6WyJSRUdJT05fT1JERVIiLCJMRVRURVJTIiwiQXJyYXkiLCJmcm9tIiwibGVuZ3RoIiwiXyIsImkiLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJOVU1CRVJTIiwiV2FyZWhvdXNlTWFwTW9kYWwiLCJzaG93Iiwib25IaWRlIiwib25WaWV3Iiwib25TZWxlY3Rpb25DaGFuZ2UiLCJpbml0aWFsU2VsZWN0aW9uIiwidXNlU3RhdGUiLCJyZWdpb25PcHRpb25zIiwic2V0UmVnaW9uT3B0aW9ucyIsInNlY3Rpb25NYXAiLCJzZXRTZWN0aW9uTWFwIiwibWFwU3RlcCIsInNldE1hcFN0ZXAiLCJtYXBSZWdpb24iLCJzZXRNYXBSZWdpb24iLCJtYXBSb3ciLCJzZXRNYXBSb3ciLCJtYXBDb2wiLCJzZXRNYXBDb2wiLCJtYXBQYWxsZXQiLCJzZXRNYXBQYWxsZXQiLCJtYXBCaW4iLCJzZXRNYXBCaW4iLCJtYXBDZWxsUGFsbGV0cyIsInNldE1hcENlbGxQYWxsZXRzIiwibWFwUGFsbGV0QmlucyIsInNldE1hcFBhbGxldEJpbnMiLCJtYXBMb2FkaW5nIiwic2V0TWFwTG9hZGluZyIsIm1hcEVycm9yIiwic2V0TWFwRXJyb3IiLCJkaXJlY3RvcnlMb2FkZWQiLCJzZXREaXJlY3RvcnlMb2FkZWQiLCJsYXN0U2hvd1JlZiIsInVzZVJlZiIsIm5vdGlmeVNlbGVjdGlvbkNoYW5nZSIsInVzZUNhbGxiYWNrIiwic2VsZWN0aW9uIiwibG9hZERpcmVjdG9yeSIsImZpcmViYXNlIiwiZmlyZXN0b3JlIiwiY29sbGVjdGlvbiIsImRvYyIsImdldCIsImRhdGEiLCJSZWdpb24iLCJTZWN0aW9uIiwiY29uc29sZSIsImVycm9yIiwibG9hZFJlZ2lvbkludmVudG9yeSIsInJlZ2lvbklkIiwid2hlcmUiLCJzbmFwIiwiY2VsbFBhbGxldHMiLCJwYWxsZXRCaW5zIiwiZm9yRWFjaCIsImxvYyIsIm5ld0xvY2FsQ3VycmVudCIsInJvdyIsInNlY3Rpb24iLCJsZXR0ZXIiLCJjb2wiLCJudW1iZXIiLCJ0cmltbWVkIiwidHJpbSIsInNsaWNlIiwidW5kZWZpbmVkIiwicGFsbGV0IiwiYmluIiwiY2VsbEtleSIsIlNldCIsImFkZCIsInBhbGxldEtleSIsImNlbGxPYmoiLCJPYmplY3QiLCJrZXlzIiwia2V5Iiwic29ydCIsImEiLCJiIiwiTnVtYmVyIiwicGFsbGV0T2JqIiwiZ2V0UmVnaW9uRGltZW5zaW9ucyIsImVudHJ5IiwiaXNBcnJheSIsImNvbHMiLCJwYXJzZUludCIsInJvd3MiLCJpc0Zpbml0ZSIsInVzZUVmZmVjdCIsIndhc09wZW4iLCJjdXJyZW50IiwicmVnaW9uIiwic2VjdGlvbkxldHRlciIsInNlY3Rpb25OdW1iZXIiLCJoYW5kbGVTZWxlY3RSZWdpb24iLCJoYW5kbGVTZWxlY3RDZWxsIiwicm93TGV0dGVyIiwiY29sTnVtYmVyIiwiY29sVmFsdWUiLCJoYW5kbGVTZWxlY3RQYWxsZXQiLCJwYWxsZXRJZCIsInBhbGxldFZhbHVlIiwiaGFuZGxlU2VsZWN0QmluIiwiYmluSWQiLCJiaW5WYWx1ZSIsImhhbmRsZUJhY2siLCJoYW5kbGVWaWV3Iiwic3R5bGVzIiwibWFwU3RhZ2UiLCJtYXBIaW50IiwibWFwQ2FudmFzIiwibWFwIiwicmVnaW9uQmxvY2siLCJpbmNsdWRlcyIsImRpbXMiLCJyZXZlcnNlIiwic2VjdGlvbktleXMiLCJmaWx0ZXIiLCJCb29sZWFuIiwic3BsaXQiLCJsb2NhbGVDb21wYXJlIiwibWFwRW1wdHkiLCJncmlkV3JhcHBlciIsInBhbGxldEdyaWQiLCJwYWxsZXRCdXR0b24iLCJncmlkIiwiaGFzUGFsbGV0cyIsImdyaWRDZWxsIiwiZ3JpZENlbGxEaXNhYmxlZCIsImJpbnMiLCJiaW5CdXR0b24iLCJtYXBGb290ZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsSUFBTUEsWUFBWSxHQUFHLENBQUMsR0FBRCxFQUFNLEdBQU4sRUFBVyxHQUFYLEVBQWdCLEdBQWhCLEVBQXFCLEdBQXJCLEVBQTBCLEdBQTFCLEVBQStCLEdBQS9CLENBQXJCO0FBQ0EsSUFBTUMsT0FBTyxHQUFHQyxLQUFLLENBQUNDLElBQU4sQ0FBVztBQUFFQyxRQUFNLEVBQUU7QUFBVixDQUFYLEVBQTJCLFVBQUNDLENBQUQsRUFBSUMsQ0FBSjtBQUFBLFNBQ3pDQyxNQUFNLENBQUNDLFlBQVAsQ0FBb0IsS0FBS0YsQ0FBekIsQ0FEeUM7QUFBQSxDQUEzQixDQUFoQjtBQUdBLElBQU1HLE9BQU8sR0FBR1AsS0FBSyxDQUFDQyxJQUFOLENBQVc7QUFBRUMsUUFBTSxFQUFFO0FBQVYsQ0FBWCxFQUEyQixVQUFDQyxDQUFELEVBQUlDLENBQUo7QUFBQSxTQUFVQSxDQUFDLEdBQUcsQ0FBZDtBQUFBLENBQTNCLENBQWhCO0FBRWUsU0FBU0ksaUJBQVQsT0FNWjtBQUFBOztBQUFBOztBQUFBLHVCQUxEQyxJQUtDO0FBQUEsTUFMREEsSUFLQywwQkFMTSxLQUtOO0FBQUEseUJBSkRDLE1BSUM7QUFBQSxNQUpEQSxNQUlDLDRCQUpRLFlBQU0sQ0FBRSxDQUloQjtBQUFBLE1BSERDLE1BR0MsUUFIREEsTUFHQztBQUFBLE1BRkRDLGlCQUVDLFFBRkRBLGlCQUVDO0FBQUEsbUNBRERDLGdCQUNDO0FBQUEsTUFEREEsZ0JBQ0Msc0NBRGtCLEVBQ2xCOztBQUFBLGtCQUN5Q0Msc0RBQVEsQ0FBQyxFQUFELENBRGpEO0FBQUEsTUFDTUMsYUFETjtBQUFBLE1BQ3FCQyxnQkFEckI7O0FBQUEsbUJBRW1DRixzREFBUSxDQUFDLEVBQUQsQ0FGM0M7QUFBQSxNQUVNRyxVQUZOO0FBQUEsTUFFa0JDLGFBRmxCOztBQUFBLG1CQUc2Qkosc0RBQVEsQ0FBQyxTQUFELENBSHJDO0FBQUEsTUFHTUssT0FITjtBQUFBLE1BR2VDLFVBSGY7O0FBQUEsbUJBSWlDTixzREFBUSxDQUFDLEVBQUQsQ0FKekM7QUFBQSxNQUlNTyxTQUpOO0FBQUEsTUFJaUJDLFlBSmpCOztBQUFBLG1CQUsyQlIsc0RBQVEsQ0FBQyxFQUFELENBTG5DO0FBQUEsTUFLTVMsTUFMTjtBQUFBLE1BS2NDLFNBTGQ7O0FBQUEsbUJBTTJCVixzREFBUSxDQUFDLEVBQUQsQ0FObkM7QUFBQSxNQU1NVyxNQU5OO0FBQUEsTUFNY0MsU0FOZDs7QUFBQSxtQkFPaUNaLHNEQUFRLENBQUMsRUFBRCxDQVB6QztBQUFBLE1BT01hLFNBUE47QUFBQSxNQU9pQkMsWUFQakI7O0FBQUEsbUJBUTJCZCxzREFBUSxDQUFDLEVBQUQsQ0FSbkM7QUFBQSxNQVFNZSxNQVJOO0FBQUEsTUFRY0MsU0FSZDs7QUFBQSxtQkFTMkNoQixzREFBUSxDQUFDLEVBQUQsQ0FUbkQ7QUFBQSxNQVNNaUIsY0FUTjtBQUFBLE1BU3NCQyxpQkFUdEI7O0FBQUEsb0JBVXlDbEIsc0RBQVEsQ0FBQyxFQUFELENBVmpEO0FBQUEsTUFVTW1CLGFBVk47QUFBQSxNQVVxQkMsZ0JBVnJCOztBQUFBLG9CQVdtQ3BCLHNEQUFRLENBQUMsS0FBRCxDQVgzQztBQUFBLE1BV01xQixVQVhOO0FBQUEsTUFXa0JDLGFBWGxCOztBQUFBLG9CQVkrQnRCLHNEQUFRLENBQUMsRUFBRCxDQVp2QztBQUFBLE1BWU11QixRQVpOO0FBQUEsTUFZZ0JDLFdBWmhCOztBQUFBLG9CQWE2Q3hCLHNEQUFRLENBQUMsS0FBRCxDQWJyRDtBQUFBLE1BYU15QixlQWJOO0FBQUEsTUFhdUJDLGtCQWJ2Qjs7QUFjRCxNQUFNQyxXQUFXLEdBQUdDLG9EQUFNLENBQUMsS0FBRCxDQUExQjtBQUVBLE1BQU1DLHFCQUFxQixHQUFHQyx5REFBVyxDQUN2QyxVQUFDQyxTQUFELEVBQWU7QUFDYixRQUFJLE9BQU9qQyxpQkFBUCxLQUE2QixVQUFqQyxFQUE2QztBQUMzQ0EsdUJBQWlCLENBQUNpQyxTQUFELENBQWpCO0FBQ0Q7QUFDRixHQUxzQyxFQU12QyxDQUFDakMsaUJBQUQsQ0FOdUMsQ0FBekM7QUFTQSxNQUFNa0MsYUFBYSxHQUFHRix5REFBVyxrVEFBQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFDNUJMLGVBRDRCO0FBQUE7QUFBQTtBQUFBOztBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUdaUSx5REFBUSxDQUN2QkMsU0FEZSxHQUVmQyxVQUZlLENBRUosV0FGSSxFQUdmQyxHQUhlLENBR1gsV0FIVyxFQUlmQyxHQUplLEVBSFk7O0FBQUE7QUFHeEJELGVBSHdCO0FBUXhCRSxnQkFSd0IsR0FRakJGLEdBQUcsQ0FBQ0UsSUFBSixNQUFjLEVBUkc7QUFTOUJwQyw0QkFBZ0IsQ0FBQ29DLElBQUksQ0FBQ0MsTUFBTCxJQUFlLEVBQWhCLENBQWhCO0FBQ0FuQyx5QkFBYSxDQUFDa0MsSUFBSSxDQUFDRSxPQUFMLElBQWdCLEVBQWpCLENBQWI7QUFDQWQsOEJBQWtCLENBQUMsSUFBRCxDQUFsQjtBQVg4QjtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQWE5QmUsbUJBQU8sQ0FBQ0MsS0FBUixDQUFjLDhCQUFkO0FBQ0FsQix1QkFBVyxDQUFDLHFDQUFELENBQVg7O0FBZDhCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQUQsSUFnQjlCLENBQUNDLGVBQUQsQ0FoQjhCLENBQWpDO0FBa0JBLE1BQU1rQixtQkFBbUIsR0FBR2IseURBQVc7QUFBQSxtVEFBQyxrQkFBT2MsUUFBUDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxrQkFDakNBLFFBRGlDO0FBQUE7QUFBQTtBQUFBOztBQUFBOztBQUFBO0FBRXRDdEIsMkJBQWEsQ0FBQyxJQUFELENBQWI7QUFDQUUseUJBQVcsQ0FBQyxFQUFELENBQVg7QUFIc0M7QUFBQTtBQUFBLHFCQUtqQlMseURBQVEsQ0FDeEJDLFNBRGdCLEdBRWhCQyxVQUZnQixDQUVMLE1BRkssRUFHaEJVLEtBSGdCLENBR1Ysd0JBSFUsRUFHZ0IsSUFIaEIsRUFHc0JELFFBSHRCLEVBSWhCUCxHQUpnQixFQUxpQjs7QUFBQTtBQUs5QlMsa0JBTDhCO0FBVzlCQyx5QkFYOEIsR0FXaEIsRUFYZ0I7QUFZOUJDLHdCQVo4QixHQVlqQixFQVppQjtBQWFwQ0Ysa0JBQUksQ0FBQ0csT0FBTCxDQUFhLFVBQUNiLEdBQUQsRUFBUztBQUFBOztBQUNwQixvQkFBTWMsR0FBRyxHQUFHLGNBQUFkLEdBQUcsQ0FBQ0UsSUFBSiwwREFBWWEsZUFBWixLQUErQixFQUEzQztBQUNBLG9CQUFJQyxHQUFHLG1CQUFHRixHQUFHLENBQUNHLE9BQVAsaURBQUcsYUFBYUMsTUFBdkI7QUFDQSxvQkFBSUMsR0FBRyxvQkFBR0wsR0FBRyxDQUFDRyxPQUFQLGtEQUFHLGNBQWFHLE1BQXZCOztBQUNBLG9CQUFJLENBQUMsQ0FBQ0osR0FBRCxJQUFRLENBQUNHLEdBQVYsS0FBa0IsT0FBT0wsR0FBRyxDQUFDRyxPQUFYLEtBQXVCLFFBQTdDLEVBQXVEO0FBQ3JELHNCQUFNSSxPQUFPLEdBQUdQLEdBQUcsQ0FBQ0csT0FBSixDQUFZSyxJQUFaLEVBQWhCO0FBQ0FOLHFCQUFHLEdBQUdLLE9BQU8sQ0FBQ0UsS0FBUixDQUFjLENBQWQsRUFBaUIsQ0FBakIsQ0FBTjtBQUNBSixxQkFBRyxHQUFHRSxPQUFPLENBQUNFLEtBQVIsQ0FBYyxDQUFkLENBQU47QUFDRDs7QUFDRCxvQkFBSUosR0FBRyxLQUFLSyxTQUFSLElBQXFCTCxHQUFHLEtBQUssSUFBakMsRUFBdUM7QUFDckNBLHFCQUFHLEdBQUdoRSxNQUFNLENBQUNnRSxHQUFELENBQVo7QUFDRDs7QUFDRCxvQkFBTU0sTUFBTSxHQUFHWCxHQUFHLENBQUNXLE1BQW5CO0FBQ0Esb0JBQU1DLEdBQUcsR0FBR1osR0FBRyxDQUFDWSxHQUFoQjtBQUNBLG9CQUFJLENBQUNWLEdBQUQsSUFBUSxDQUFDRyxHQUFiLEVBQWtCO0FBQ2xCLG9CQUFNUSxPQUFPLGFBQU1YLEdBQU4sY0FBYUcsR0FBYixDQUFiOztBQUNBLG9CQUFJTSxNQUFNLEtBQUtELFNBQVgsSUFBd0JDLE1BQU0sS0FBSyxJQUFuQyxJQUEyQyxVQUFHQSxNQUFILE1BQWdCLEVBQS9ELEVBQW1FO0FBQ2pFLHNCQUFJLENBQUNkLFdBQVcsQ0FBQ2dCLE9BQUQsQ0FBaEIsRUFBMkJoQixXQUFXLENBQUNnQixPQUFELENBQVgsR0FBdUIsSUFBSUMsR0FBSixFQUF2QjtBQUMzQmpCLDZCQUFXLENBQUNnQixPQUFELENBQVgsQ0FBcUJFLEdBQXJCLENBQXlCMUUsTUFBTSxDQUFDc0UsTUFBRCxDQUEvQjs7QUFDQSxzQkFBSUMsR0FBRyxLQUFLRixTQUFSLElBQXFCRSxHQUFHLEtBQUssSUFBN0IsSUFBcUMsVUFBR0EsR0FBSCxNQUFhLEVBQXRELEVBQTBEO0FBQ3hELHdCQUFNSSxTQUFTLGFBQU1ILE9BQU4sZUFBa0JGLE1BQWxCLENBQWY7QUFDQSx3QkFBSSxDQUFDYixVQUFVLENBQUNrQixTQUFELENBQWYsRUFBNEJsQixVQUFVLENBQUNrQixTQUFELENBQVYsR0FBd0IsSUFBSUYsR0FBSixFQUF4QjtBQUM1QmhCLDhCQUFVLENBQUNrQixTQUFELENBQVYsQ0FBc0JELEdBQXRCLENBQTBCMUUsTUFBTSxDQUFDdUUsR0FBRCxDQUFoQztBQUNEO0FBQ0Y7QUFDRixlQXpCRDtBQTJCTUsscUJBeEM4QixHQXdDcEIsRUF4Q29CO0FBeUNwQ0Msb0JBQU0sQ0FBQ0MsSUFBUCxDQUFZdEIsV0FBWixFQUF5QkUsT0FBekIsQ0FBaUMsVUFBQ3FCLEdBQUQsRUFBUztBQUN4Q0gsdUJBQU8sQ0FBQ0csR0FBRCxDQUFQLEdBQWVwRixLQUFLLENBQUNDLElBQU4sQ0FBVzRELFdBQVcsQ0FBQ3VCLEdBQUQsQ0FBdEIsRUFBNkJDLElBQTdCLENBQ2IsVUFBQ0MsQ0FBRCxFQUFJQyxDQUFKO0FBQUEseUJBQVVDLE1BQU0sQ0FBQ0YsQ0FBRCxDQUFOLEdBQVlFLE1BQU0sQ0FBQ0QsQ0FBRCxDQUE1QjtBQUFBLGlCQURhLENBQWY7QUFHRCxlQUpEO0FBTU1FLHVCQS9DOEIsR0ErQ2xCLEVBL0NrQjtBQWdEcENQLG9CQUFNLENBQUNDLElBQVAsQ0FBWXJCLFVBQVosRUFBd0JDLE9BQXhCLENBQWdDLFVBQUNxQixHQUFELEVBQVM7QUFDdkNLLHlCQUFTLENBQUNMLEdBQUQsQ0FBVCxHQUFpQnBGLEtBQUssQ0FBQ0MsSUFBTixDQUFXNkQsVUFBVSxDQUFDc0IsR0FBRCxDQUFyQixFQUE0QkMsSUFBNUIsQ0FDZixVQUFDQyxDQUFELEVBQUlDLENBQUo7QUFBQSx5QkFBVUMsTUFBTSxDQUFDRixDQUFELENBQU4sR0FBWUUsTUFBTSxDQUFDRCxDQUFELENBQTVCO0FBQUEsaUJBRGUsQ0FBakI7QUFHRCxlQUpEO0FBTUF2RCwrQkFBaUIsQ0FBQ2lELE9BQUQsQ0FBakI7QUFDQS9DLDhCQUFnQixDQUFDdUQsU0FBRCxDQUFoQjtBQXZEb0M7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUF5RHBDbEMscUJBQU8sQ0FBQ0MsS0FBUixDQUFjLDhCQUFkO0FBQ0FsQix5QkFBVyxDQUFDLCtCQUFELENBQVg7O0FBMURvQztBQUFBO0FBNERwQ0YsMkJBQWEsQ0FBQyxLQUFELENBQWI7QUE1RG9DOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQUQ7O0FBQUE7QUFBQTtBQUFBO0FBQUEsT0E4RHBDLEVBOURvQyxDQUF2QztBQWdFQSxNQUFNc0QsbUJBQW1CLEdBQUc5Qyx5REFBVyxDQUNyQyxVQUFDYyxRQUFELEVBQWM7QUFDWixRQUFNaUMsS0FBSyxHQUFHMUUsVUFBSCxhQUFHQSxVQUFILHVCQUFHQSxVQUFVLENBQUd5QyxRQUFILENBQXhCOztBQUNBLFFBQUkxRCxLQUFLLENBQUM0RixPQUFOLENBQWNELEtBQWQsS0FBd0JBLEtBQUssQ0FBQ3pGLE1BQU4sSUFBZ0IsQ0FBNUMsRUFBK0M7QUFDN0MsVUFBTTJGLElBQUksR0FBR0MsUUFBUSxDQUFDSCxLQUFLLENBQUMsQ0FBRCxDQUFOLEVBQVcsRUFBWCxDQUFyQjtBQUNBLFVBQU1JLElBQUksR0FBR0QsUUFBUSxDQUFDSCxLQUFLLENBQUMsQ0FBRCxDQUFOLEVBQVcsRUFBWCxDQUFyQjtBQUNBLGFBQU87QUFDTEUsWUFBSSxFQUFFTCxNQUFNLENBQUNRLFFBQVAsQ0FBZ0JILElBQWhCLElBQXdCQSxJQUF4QixHQUErQixDQURoQztBQUVMRSxZQUFJLEVBQUVQLE1BQU0sQ0FBQ1EsUUFBUCxDQUFnQkQsSUFBaEIsSUFBd0JBLElBQXhCLEdBQStCO0FBRmhDLE9BQVA7QUFJRDs7QUFDRCxXQUFPO0FBQUVGLFVBQUksRUFBRSxDQUFSO0FBQVdFLFVBQUksRUFBRTtBQUFqQixLQUFQO0FBQ0QsR0Fab0MsRUFhckMsQ0FBQzlFLFVBQUQsQ0FicUMsQ0FBdkM7QUFnQkFnRix5REFBUyxDQUFDLFlBQU07QUFDZCxRQUFNQyxPQUFPLEdBQUd6RCxXQUFXLENBQUMwRCxPQUE1QjtBQUNBMUQsZUFBVyxDQUFDMEQsT0FBWixHQUFzQjFGLElBQXRCO0FBQ0EsUUFBSSxDQUFDQSxJQUFELElBQVN5RixPQUFiLEVBQXNCO0FBRXRCcEQsaUJBQWE7QUFDYlIsZUFBVyxDQUFDLEVBQUQsQ0FBWDs7QUFOYyxnQkFhVnpCLGdCQUFnQixJQUFJLEVBYlY7QUFBQSxRQVFadUYsTUFSWSxTQVFaQSxNQVJZO0FBQUEsUUFTWkMsYUFUWSxTQVNaQSxhQVRZO0FBQUEsUUFVWkMsYUFWWSxTQVVaQSxhQVZZO0FBQUEsUUFXWjNCLE1BWFksU0FXWkEsTUFYWTtBQUFBLFFBWVpDLEdBWlksU0FZWkEsR0FaWTs7QUFlZHRELGdCQUFZLENBQUM4RSxNQUFNLElBQUksRUFBWCxDQUFaO0FBQ0E1RSxhQUFTLENBQUM2RSxhQUFhLElBQUksRUFBbEIsQ0FBVDtBQUNBM0UsYUFBUyxDQUFDNEUsYUFBYSxHQUFHakcsTUFBTSxDQUFDaUcsYUFBRCxDQUFULEdBQTJCLEVBQXpDLENBQVQ7QUFDQTFFLGdCQUFZLENBQUMrQyxNQUFNLEdBQUd0RSxNQUFNLENBQUNzRSxNQUFELENBQVQsR0FBb0IsRUFBM0IsQ0FBWjtBQUNBN0MsYUFBUyxDQUFDOEMsR0FBRyxHQUFHdkUsTUFBTSxDQUFDdUUsR0FBRCxDQUFULEdBQWlCLEVBQXJCLENBQVQ7QUFDQXhELGNBQVUsQ0FBQ2dGLE1BQU0sR0FBRyxNQUFILEdBQVksU0FBbkIsQ0FBVjtBQUNBLFFBQUlBLE1BQUosRUFBWTNDLG1CQUFtQixDQUFDMkMsTUFBRCxDQUFuQjtBQUNiLEdBdEJRLEVBc0JOLENBQUMzRixJQUFELEVBQU9JLGdCQUFQLEVBQXlCaUMsYUFBekIsRUFBd0NXLG1CQUF4QyxDQXRCTSxDQUFUOztBQXdCQSxNQUFNOEMsa0JBQWtCLEdBQUcsU0FBckJBLGtCQUFxQixDQUFDN0MsUUFBRCxFQUFjO0FBQ3ZDLFFBQU1iLFNBQVMsR0FBRztBQUNoQnVELFlBQU0sRUFBRTFDLFFBRFE7QUFFaEIyQyxtQkFBYSxFQUFFLEVBRkM7QUFHaEJDLG1CQUFhLEVBQUUsRUFIQztBQUloQjNCLFlBQU0sRUFBRSxFQUpRO0FBS2hCQyxTQUFHLEVBQUU7QUFMVyxLQUFsQjtBQU9BdEQsZ0JBQVksQ0FBQ29DLFFBQUQsQ0FBWjtBQUNBbEMsYUFBUyxDQUFDLEVBQUQsQ0FBVDtBQUNBRSxhQUFTLENBQUMsRUFBRCxDQUFUO0FBQ0FFLGdCQUFZLENBQUMsRUFBRCxDQUFaO0FBQ0FFLGFBQVMsQ0FBQyxFQUFELENBQVQ7QUFDQVYsY0FBVSxDQUFDLE1BQUQsQ0FBVjtBQUNBdUIseUJBQXFCLENBQUNFLFNBQUQsQ0FBckI7QUFDQVksdUJBQW1CLENBQUNDLFFBQUQsQ0FBbkI7QUFDRCxHQWhCRDs7QUFrQkEsTUFBTThDLGdCQUFnQixHQUFHLFNBQW5CQSxnQkFBbUIsQ0FBQ0MsU0FBRCxFQUFZQyxTQUFaLEVBQTBCO0FBQ2pELFFBQU1DLFFBQVEsR0FBR3RHLE1BQU0sQ0FBQ3FHLFNBQUQsQ0FBdkI7QUFDQSxRQUFNN0QsU0FBUyxHQUFHO0FBQ2hCdUQsWUFBTSxFQUFFL0UsU0FEUTtBQUVoQmdGLG1CQUFhLEVBQUVJLFNBRkM7QUFHaEJILG1CQUFhLEVBQUVLLFFBSEM7QUFJaEJoQyxZQUFNLEVBQUUsRUFKUTtBQUtoQkMsU0FBRyxFQUFFO0FBTFcsS0FBbEI7QUFPQXBELGFBQVMsQ0FBQ2lGLFNBQUQsQ0FBVDtBQUNBL0UsYUFBUyxDQUFDaUYsUUFBRCxDQUFUO0FBQ0EvRSxnQkFBWSxDQUFDLEVBQUQsQ0FBWjtBQUNBRSxhQUFTLENBQUMsRUFBRCxDQUFUO0FBQ0FWLGNBQVUsQ0FBQyxTQUFELENBQVY7QUFDQXVCLHlCQUFxQixDQUFDRSxTQUFELENBQXJCO0FBQ0QsR0FmRDs7QUFpQkEsTUFBTStELGtCQUFrQixHQUFHLFNBQXJCQSxrQkFBcUIsQ0FBQ0MsUUFBRCxFQUFjO0FBQ3ZDLFFBQU1DLFdBQVcsR0FBR3pHLE1BQU0sQ0FBQ3dHLFFBQUQsQ0FBMUI7QUFDQSxRQUFNaEUsU0FBUyxHQUFHO0FBQ2hCdUQsWUFBTSxFQUFFL0UsU0FEUTtBQUVoQmdGLG1CQUFhLEVBQUU5RSxNQUZDO0FBR2hCK0UsbUJBQWEsRUFBRTdFLE1BSEM7QUFJaEJrRCxZQUFNLEVBQUVtQyxXQUpRO0FBS2hCbEMsU0FBRyxFQUFFO0FBTFcsS0FBbEI7QUFPQWhELGdCQUFZLENBQUNrRixXQUFELENBQVo7QUFDQWhGLGFBQVMsQ0FBQyxFQUFELENBQVQ7QUFDQVYsY0FBVSxDQUFDLE1BQUQsQ0FBVjtBQUNBdUIseUJBQXFCLENBQUNFLFNBQUQsQ0FBckI7QUFDRCxHQWJEOztBQWVBLE1BQU1rRSxlQUFlLEdBQUcsU0FBbEJBLGVBQWtCLENBQUNDLEtBQUQsRUFBVztBQUNqQyxRQUFNQyxRQUFRLEdBQUc1RyxNQUFNLENBQUMyRyxLQUFELENBQXZCO0FBQ0EsUUFBTW5FLFNBQVMsR0FBRztBQUNoQnVELFlBQU0sRUFBRS9FLFNBRFE7QUFFaEJnRixtQkFBYSxFQUFFOUUsTUFGQztBQUdoQitFLG1CQUFhLEVBQUU3RSxNQUhDO0FBSWhCa0QsWUFBTSxFQUFFaEQsU0FKUTtBQUtoQmlELFNBQUcsRUFBRXFDO0FBTFcsS0FBbEI7QUFPQW5GLGFBQVMsQ0FBQ21GLFFBQUQsQ0FBVDtBQUNBdEUseUJBQXFCLENBQUNFLFNBQUQsQ0FBckI7QUFDRCxHQVhEOztBQWFBLE1BQU1xRSxVQUFVLEdBQUcsU0FBYkEsVUFBYSxHQUFNO0FBQ3ZCLFFBQUkvRixPQUFPLEtBQUssTUFBaEIsRUFBd0JDLFVBQVUsQ0FBQyxTQUFELENBQVYsQ0FBeEIsS0FDSyxJQUFJRCxPQUFPLEtBQUssU0FBaEIsRUFBMkJDLFVBQVUsQ0FBQyxNQUFELENBQVYsQ0FBM0IsS0FDQSxJQUFJRCxPQUFPLEtBQUssTUFBaEIsRUFBd0JDLFVBQVUsQ0FBQyxTQUFELENBQVY7QUFDOUIsR0FKRDs7QUFNQSxNQUFNK0YsVUFBVSxHQUFHLFNBQWJBLFVBQWEsR0FBTTtBQUN2QixRQUFJLE9BQU94RyxNQUFQLEtBQWtCLFVBQXRCLEVBQWtDO0FBQ2xDQSxVQUFNLENBQUM7QUFDTHlGLFlBQU0sRUFBRS9FLFNBREg7QUFFTGdGLG1CQUFhLEVBQUU5RSxNQUZWO0FBR0wrRSxtQkFBYSxFQUFFN0UsTUFIVjtBQUlMa0QsWUFBTSxFQUFFaEQsU0FKSDtBQUtMaUQsU0FBRyxFQUFFL0M7QUFMQSxLQUFELENBQU47QUFPRCxHQVREOztBQVdBLFNBQ0UsTUFBQyxxREFBRDtBQUFPLFFBQUksRUFBRXBCLElBQWI7QUFBbUIsVUFBTSxFQUFFQyxNQUEzQjtBQUFtQyxZQUFRLE1BQTNDO0FBQTRDLFFBQUksRUFBQyxJQUFqRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0UsTUFBQyxxREFBRCxDQUFPLE1BQVA7QUFBYyxlQUFXLE1BQXpCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDRSxNQUFDLHFEQUFELENBQU8sS0FBUDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQURGLENBREYsRUFJRSxNQUFDLHFEQUFELENBQU8sSUFBUDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0d5QixVQUFVLElBQ1Q7QUFBSyxhQUFTLEVBQUVpRixvRUFBTSxDQUFDakYsVUFBdkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFLE1BQUMsdURBQUQ7QUFBUyxhQUFTLEVBQUMsUUFBbkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQURGLEVBRUU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSwyQkFGRixDQUZKLEVBT0dFLFFBQVEsSUFBSTtBQUFLLGFBQVMsRUFBRStFLG9FQUFNLENBQUMvRSxRQUF2QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQWtDQSxRQUFsQyxDQVBmLEVBU0csQ0FBQ0YsVUFBRCxJQUFlaEIsT0FBTyxLQUFLLFNBQTNCLElBQ0M7QUFBSyxhQUFTLEVBQUVpRyxvRUFBTSxDQUFDQyxRQUF2QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0U7QUFBSyxhQUFTLEVBQUVELG9FQUFNLENBQUNFLE9BQXZCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBREYsRUFFRTtBQUFLLGFBQVMsRUFBRUYsb0VBQU0sQ0FBQ0csU0FBdkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNHekgsWUFBWSxDQUFDMEgsR0FBYixDQUFpQixVQUFDOUQsUUFBRDtBQUFBLFdBQ2hCO0FBQ0UsU0FBRyxFQUFFQSxRQURQO0FBRUUsVUFBSSxFQUFDLFFBRlA7QUFHRSxlQUFTLFlBQUswRCxvRUFBTSxDQUFDSyxXQUFaLGNBQTJCTCxvRUFBTSxpQkFBVTFELFFBQVYsRUFBakMsQ0FIWDtBQUlFLGFBQU8sRUFBRTtBQUFBLGVBQU02QyxrQkFBa0IsQ0FBQzdDLFFBQUQsQ0FBeEI7QUFBQSxPQUpYO0FBS0UsY0FBUSxFQUNOMUQsS0FBSyxDQUFDNEYsT0FBTixDQUFjN0UsYUFBZCxLQUNBQSxhQUFhLENBQUNiLE1BQWQsR0FBdUIsQ0FEdkIsSUFFQSxDQUFDYSxhQUFhLENBQUMyRyxRQUFkLENBQXVCaEUsUUFBdkIsQ0FSTDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BV0dBLFFBWEgsQ0FEZ0I7QUFBQSxHQUFqQixDQURILENBRkYsQ0FWSixFQWdDRyxDQUFDdkIsVUFBRCxJQUFlaEIsT0FBTyxLQUFLLE1BQTNCLElBQ0M7QUFBSyxhQUFTLEVBQUVpRyxvRUFBTSxDQUFDQyxRQUF2QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0U7QUFBSyxhQUFTLEVBQUVELG9FQUFNLENBQUNFLE9BQXZCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsZ0JBQ1VqRyxTQURWLDhCQURGLEVBSUksWUFBTTtBQUNOLFFBQU1zRyxJQUFJLEdBQUdqQyxtQkFBbUIsQ0FBQ3JFLFNBQUQsQ0FBaEM7QUFDQSxRQUFNMEUsSUFBSSxHQUFHaEcsT0FBTyxDQUFDMEUsS0FBUixDQUFjLENBQWQsRUFBaUJrRCxJQUFJLENBQUM1QixJQUFMLElBQWEsQ0FBOUIsRUFBaUM2QixPQUFqQyxFQUFiO0FBQ0EsUUFBTS9CLElBQUksR0FBR3RGLE9BQU8sQ0FBQ2tFLEtBQVIsQ0FBYyxDQUFkLEVBQWlCa0QsSUFBSSxDQUFDOUIsSUFBTCxJQUFhLENBQTlCLENBQWI7O0FBQ0EsUUFBSSxDQUFDRSxJQUFJLENBQUM3RixNQUFOLElBQWdCLENBQUMyRixJQUFJLENBQUMzRixNQUExQixFQUFrQztBQUNoQyxVQUFNMkgsV0FBVyxHQUFHM0MsTUFBTSxDQUFDQyxJQUFQLENBQVlwRCxjQUFjLElBQUksRUFBOUIsRUFDakIrRixNQURpQixDQUNWQyxPQURVLEVBRWpCUCxHQUZpQixDQUViLFVBQUNwQyxHQUFELEVBQVM7QUFBQSx5QkFDT0EsR0FBRyxDQUFDNEMsS0FBSixDQUFVLEdBQVYsQ0FEUDtBQUFBO0FBQUEsWUFDTDlELEdBREs7QUFBQSxZQUNBRyxHQURBOztBQUVaLGVBQU87QUFBRWUsYUFBRyxFQUFIQSxHQUFGO0FBQU9sQixhQUFHLEVBQUhBLEdBQVA7QUFBWUcsYUFBRyxFQUFIQTtBQUFaLFNBQVA7QUFDRCxPQUxpQixFQU1qQmdCLElBTmlCLENBTVosVUFBQ0MsQ0FBRCxFQUFJQyxDQUFKLEVBQVU7QUFDZCxZQUFJRCxDQUFDLENBQUNwQixHQUFGLEtBQVVxQixDQUFDLENBQUNyQixHQUFoQixFQUFxQjtBQUNuQixpQkFBT3NCLE1BQU0sQ0FBQ0YsQ0FBQyxDQUFDakIsR0FBSCxDQUFOLEdBQWdCbUIsTUFBTSxDQUFDRCxDQUFDLENBQUNsQixHQUFILENBQTdCO0FBQ0Q7O0FBQ0QsZUFBT2tCLENBQUMsQ0FBQ3JCLEdBQUYsQ0FBTStELGFBQU4sQ0FBb0IzQyxDQUFDLENBQUNwQixHQUF0QixDQUFQO0FBQ0QsT0FYaUIsQ0FBcEI7O0FBYUEsVUFBSSxDQUFDMkQsV0FBVyxDQUFDM0gsTUFBakIsRUFBeUI7QUFDdkIsZUFDRTtBQUFLLG1CQUFTLEVBQUVrSCxvRUFBTSxDQUFDYyxRQUF2QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDJDQURGO0FBS0Q7O0FBRUQsYUFDRTtBQUFLLGlCQUFTLEVBQUVkLG9FQUFNLENBQUNlLFdBQXZCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FDRTtBQUFLLGlCQUFTLEVBQUVmLG9FQUFNLENBQUNFLE9BQXZCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsa0VBREYsRUFJRTtBQUFLLGlCQUFTLEVBQUVGLG9FQUFNLENBQUNnQixVQUF2QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBQ0dQLFdBQVcsQ0FBQ0wsR0FBWixDQUFnQjtBQUFBLFlBQUdwQyxHQUFILFNBQUdBLEdBQUg7QUFBQSxZQUFRbEIsR0FBUixTQUFRQSxHQUFSO0FBQUEsWUFBYUcsR0FBYixTQUFhQSxHQUFiO0FBQUEsZUFDZjtBQUNFLGFBQUcsRUFBRWUsR0FEUDtBQUVFLGNBQUksRUFBQyxRQUZQO0FBR0UsbUJBQVMsRUFBRWdDLG9FQUFNLENBQUNpQixZQUhwQjtBQUlFLGlCQUFPLEVBQUU7QUFBQSxtQkFBTTdCLGdCQUFnQixDQUFDdEMsR0FBRCxFQUFNRyxHQUFOLENBQXRCO0FBQUEsV0FKWDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBTUdILEdBTkgsRUFPR0csR0FQSCxDQURlO0FBQUEsT0FBaEIsQ0FESCxDQUpGLENBREY7QUFvQkQ7O0FBQ0QsV0FDRTtBQUFLLGVBQVMsRUFBRStDLG9FQUFNLENBQUNlLFdBQXZCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FDRTtBQUNFLGVBQVMsRUFBRWYsb0VBQU0sQ0FBQ2tCLElBRHBCO0FBRUUsV0FBSyxFQUFFO0FBQUUsdUJBQWV6QyxJQUFJLENBQUMzRjtBQUF0QixPQUZUO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FJRzZGLElBQUksQ0FBQ3lCLEdBQUwsQ0FBUyxVQUFDdEQsR0FBRDtBQUFBLGFBQ1IyQixJQUFJLENBQUMyQixHQUFMLENBQVMsVUFBQ25ELEdBQUQsRUFBUztBQUFBOztBQUNoQixZQUFNUSxPQUFPLGFBQU1YLEdBQU4sY0FBYUcsR0FBYixDQUFiO0FBQ0EsWUFBTWtFLFVBQVUsR0FBR1IsT0FBTywwQkFDeEJoRyxjQUFjLENBQUM4QyxPQUFELENBRFUsMERBQ3hCLHNCQUF5QjNFLE1BREQsQ0FBMUI7QUFHQSxlQUNFO0FBQ0UsYUFBRyxFQUFFMkUsT0FEUDtBQUVFLGNBQUksRUFBQyxRQUZQO0FBR0UsbUJBQVMsWUFBS3VDLG9FQUFNLENBQUNvQixRQUFaLGNBQ1BELFVBQVUsR0FBRyxFQUFILEdBQVFuQixvRUFBTSxDQUFDcUIsZ0JBRGxCLENBSFg7QUFNRSxpQkFBTyxFQUFFO0FBQUEsbUJBQ1BGLFVBQVUsSUFBSS9CLGdCQUFnQixDQUFDdEMsR0FBRCxFQUFNRyxHQUFOLENBRHZCO0FBQUEsV0FOWDtBQVNFLGtCQUFRLEVBQUUsQ0FBQ2tFLFVBVGI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQVdFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FDR3JFLEdBREgsRUFFR0csR0FGSCxDQVhGLENBREY7QUFrQkQsT0F2QkQsQ0FEUTtBQUFBLEtBQVQsQ0FKSCxDQURGLENBREY7QUFtQ0QsR0FsRkEsRUFKSCxDQWpDSixFQTJIRyxDQUFDbEMsVUFBRCxJQUFlaEIsT0FBTyxLQUFLLFNBQTNCLElBQ0M7QUFBSyxhQUFTLEVBQUVpRyxvRUFBTSxDQUFDQyxRQUF2QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0U7QUFBSyxhQUFTLEVBQUVELG9FQUFNLENBQUNFLE9BQXZCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsZ0JBQ1VqRyxTQURWLGlCQUNnQ0UsTUFEaEMsRUFFR0UsTUFGSCxzQkFERixFQUtFO0FBQUssYUFBUyxFQUFFMkYsb0VBQU0sQ0FBQ2dCLFVBQXZCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDRyxDQUFDckcsY0FBYyxXQUFJUixNQUFKLGNBQWNFLE1BQWQsRUFBZCxJQUF5QyxFQUExQyxFQUE4QytGLEdBQTlDLENBQWtELFVBQUM3QyxNQUFELEVBQVk7QUFDN0QsUUFBTUssU0FBUyxhQUFNekQsTUFBTixjQUFnQkUsTUFBaEIsZUFBMkJrRCxNQUEzQixDQUFmO0FBQ0EsUUFBTStELElBQUksR0FBR3pHLGFBQWEsQ0FBQytDLFNBQUQsQ0FBYixJQUE0QixFQUF6QztBQUNBLFdBQ0U7QUFDRSxTQUFHLEVBQUVMLE1BRFA7QUFFRSxVQUFJLEVBQUMsUUFGUDtBQUdFLGVBQVMsRUFBRXlDLG9FQUFNLENBQUNpQixZQUhwQjtBQUlBLGFBQU8sRUFBRSxtQkFBTTtBQUNYLFlBQUlLLElBQUksQ0FBQ3hJLE1BQUwsS0FBZ0IsQ0FBaEIsSUFBcUIsT0FBT1MsTUFBUCxLQUFrQixVQUEzQyxFQUF1RDtBQUNyRCxjQUFNa0MsU0FBUyxHQUFHO0FBQ2hCdUQsa0JBQU0sRUFBRS9FLFNBRFE7QUFFaEJnRix5QkFBYSxFQUFFOUUsTUFGQztBQUdoQitFLHlCQUFhLEVBQUU3RSxNQUhDO0FBSWhCa0Qsa0JBQU0sRUFBRXRFLE1BQU0sQ0FBQ3NFLE1BQUQsQ0FKRTtBQUtoQkMsZUFBRyxFQUFFO0FBTFcsV0FBbEI7QUFPQWpDLCtCQUFxQixDQUFDRSxTQUFELENBQXJCO0FBQ0FsQyxnQkFBTSxDQUFDa0MsU0FBRCxDQUFOO0FBQ0E7QUFDRDs7QUFDRCtELDBCQUFrQixDQUFDakMsTUFBRCxDQUFsQjtBQUNELE9BbEJIO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsa0JBb0JVQSxNQXBCVixDQURGO0FBd0JELEdBM0JBLENBREgsRUE2QkcsQ0FBQyxDQUFDNUMsY0FBYyxXQUFJUixNQUFKLGNBQWNFLE1BQWQsRUFBZCxJQUF5QyxFQUExQyxFQUE4Q3ZCLE1BQS9DLElBQ0M7QUFBSyxhQUFTLEVBQUVrSCxvRUFBTSxDQUFDYyxRQUF2QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGtDQTlCSixDQUxGLENBNUhKLEVBdUtHLENBQUMvRixVQUFELElBQWVoQixPQUFPLEtBQUssTUFBM0IsSUFDQztBQUFLLGFBQVMsRUFBRWlHLG9FQUFNLENBQUNDLFFBQXZCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDRTtBQUFLLGFBQVMsRUFBRUQsb0VBQU0sQ0FBQ0UsT0FBdkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxnQkFDVWpHLFNBRFYsaUJBQ2dDRSxNQURoQyxFQUVHRSxNQUZILGdCQUVxQkUsU0FGckIsQ0FERixFQUtFO0FBQUssYUFBUyxFQUFFeUYsb0VBQU0sQ0FBQ2dCLFVBQXZCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDRyxDQUFDbkcsYUFBYSxXQUFJVixNQUFKLGNBQWNFLE1BQWQsZUFBeUJFLFNBQXpCLEVBQWIsSUFBc0QsRUFBdkQsRUFBMkQ2RixHQUEzRCxDQUNDLFVBQUM1QyxHQUFEO0FBQUEsV0FDRTtBQUNFLFNBQUcsRUFBRUEsR0FEUDtBQUVFLFVBQUksRUFBQyxRQUZQO0FBR0UsZUFBUyxZQUFLd0Msb0VBQU0sQ0FBQ2lCLFlBQVosY0FBNEJqQixvRUFBTSxDQUFDdUIsU0FBbkMsQ0FIWDtBQUlFLGFBQU8sRUFBRTtBQUFBLGVBQU01QixlQUFlLENBQUNuQyxHQUFELENBQXJCO0FBQUEsT0FKWDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBTU9BLEdBTlAsQ0FERjtBQUFBLEdBREQsQ0FESCxFQWFHLENBQUMsQ0FBQzNDLGFBQWEsV0FBSVYsTUFBSixjQUFjRSxNQUFkLGVBQXlCRSxTQUF6QixFQUFiLElBQXNELEVBQXZELEVBQ0N6QixNQURGLElBRUM7QUFBSyxhQUFTLEVBQUVrSCxvRUFBTSxDQUFDYyxRQUF2QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHlDQWZKLENBTEYsQ0F4S0osQ0FKRixFQXdNRSxNQUFDLHFEQUFELENBQU8sTUFBUDtBQUFjLGFBQVMsRUFBRWQsb0VBQU0sQ0FBQ3dCLFNBQWhDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDRSxNQUFDLHNEQUFEO0FBQ0UsV0FBTyxFQUFDLG1CQURWO0FBRUUsV0FBTyxFQUFFMUIsVUFGWDtBQUdFLFlBQVEsRUFBRS9GLE9BQU8sS0FBSyxTQUh4QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFlBREYsRUFRRSxNQUFDLHNEQUFEO0FBQVEsV0FBTyxFQUFDLGlCQUFoQjtBQUFrQyxXQUFPLEVBQUVnRyxVQUEzQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFlBUkYsRUFXRSxNQUFDLHNEQUFEO0FBQVEsV0FBTyxFQUFDLFdBQWhCO0FBQTRCLFdBQU8sRUFBRXpHLE1BQXJDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFYRixDQXhNRixDQURGO0FBME5EOztHQW5jdUJGLGlCOztLQUFBQSxpQiIsImZpbGUiOiJzdGF0aWMvd2VicGFjay9wYWdlcy9OZXdTZWFyY2gvbWFpblNlYXJjaC5jNWQ1YmFmNTM0NTIwMjQwNzRjMy5ob3QtdXBkYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IE1vZGFsLCBCdXR0b24sIFNwaW5uZXIgfSBmcm9tIFwicmVhY3QtYm9vdHN0cmFwXCI7XG5pbXBvcnQgZmlyZWJhc2UgZnJvbSBcIi4uL2NvbnRleHQvRmlyZWJhc2VcIjtcbmltcG9ydCBzdHlsZXMgZnJvbSBcIi4vV2FyZWhvdXNlTWFwTW9kYWwubW9kdWxlLmNzc1wiO1xuXG5jb25zdCBSRUdJT05fT1JERVIgPSBbXCJFXCIsIFwiRlwiLCBcIkdcIiwgXCJBXCIsIFwiRFwiLCBcIkNcIiwgXCJCXCJdO1xuY29uc3QgTEVUVEVSUyA9IEFycmF5LmZyb20oeyBsZW5ndGg6IDI2IH0sIChfLCBpKSA9PlxuICBTdHJpbmcuZnJvbUNoYXJDb2RlKDY1ICsgaSlcbik7XG5jb25zdCBOVU1CRVJTID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogNTAgfSwgKF8sIGkpID0+IGkgKyAxKTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gV2FyZWhvdXNlTWFwTW9kYWwoe1xuICBzaG93ID0gZmFsc2UsXG4gIG9uSGlkZSA9ICgpID0+IHt9LFxuICBvblZpZXcsXG4gIG9uU2VsZWN0aW9uQ2hhbmdlLFxuICBpbml0aWFsU2VsZWN0aW9uID0ge30sXG59KSB7XG4gIGNvbnN0IFtyZWdpb25PcHRpb25zLCBzZXRSZWdpb25PcHRpb25zXSA9IHVzZVN0YXRlKFtdKTtcbiAgY29uc3QgW3NlY3Rpb25NYXAsIHNldFNlY3Rpb25NYXBdID0gdXNlU3RhdGUoe30pO1xuICBjb25zdCBbbWFwU3RlcCwgc2V0TWFwU3RlcF0gPSB1c2VTdGF0ZShcInJlZ2lvbnNcIik7XG4gIGNvbnN0IFttYXBSZWdpb24sIHNldE1hcFJlZ2lvbl0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW21hcFJvdywgc2V0TWFwUm93XSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbbWFwQ29sLCBzZXRNYXBDb2xdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFttYXBQYWxsZXQsIHNldE1hcFBhbGxldF0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW21hcEJpbiwgc2V0TWFwQmluXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbbWFwQ2VsbFBhbGxldHMsIHNldE1hcENlbGxQYWxsZXRzXSA9IHVzZVN0YXRlKHt9KTtcbiAgY29uc3QgW21hcFBhbGxldEJpbnMsIHNldE1hcFBhbGxldEJpbnNdID0gdXNlU3RhdGUoe30pO1xuICBjb25zdCBbbWFwTG9hZGluZywgc2V0TWFwTG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFttYXBFcnJvciwgc2V0TWFwRXJyb3JdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtkaXJlY3RvcnlMb2FkZWQsIHNldERpcmVjdG9yeUxvYWRlZF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IGxhc3RTaG93UmVmID0gdXNlUmVmKGZhbHNlKTtcblxuICBjb25zdCBub3RpZnlTZWxlY3Rpb25DaGFuZ2UgPSB1c2VDYWxsYmFjayhcbiAgICAoc2VsZWN0aW9uKSA9PiB7XG4gICAgICBpZiAodHlwZW9mIG9uU2VsZWN0aW9uQ2hhbmdlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgb25TZWxlY3Rpb25DaGFuZ2Uoc2VsZWN0aW9uKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIFtvblNlbGVjdGlvbkNoYW5nZV1cbiAgKTtcblxuICBjb25zdCBsb2FkRGlyZWN0b3J5ID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xuICAgIGlmIChkaXJlY3RvcnlMb2FkZWQpIHJldHVybjtcbiAgICB0cnkge1xuICAgICAgY29uc3QgZG9jID0gYXdhaXQgZmlyZWJhc2VcbiAgICAgICAgLmZpcmVzdG9yZSgpXG4gICAgICAgIC5jb2xsZWN0aW9uKFwiV2FyZWhvdXNlXCIpXG4gICAgICAgIC5kb2MoXCJkaXJlY3RvcnlcIilcbiAgICAgICAgLmdldCgpO1xuICAgICAgY29uc3QgZGF0YSA9IGRvYy5kYXRhKCkgfHwge307XG4gICAgICBzZXRSZWdpb25PcHRpb25zKGRhdGEuUmVnaW9uIHx8IFtdKTtcbiAgICAgIHNldFNlY3Rpb25NYXAoZGF0YS5TZWN0aW9uIHx8IHt9KTtcbiAgICAgIHNldERpcmVjdG9yeUxvYWRlZCh0cnVlKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byBsb2FkIG1hcCBkaXJlY3RvcnlcIiwgZXJyb3IpO1xuICAgICAgc2V0TWFwRXJyb3IoXCJGYWlsZWQgdG8gbG9hZCB3YXJlaG91c2UgZGlyZWN0b3J5LlwiKTtcbiAgICB9XG4gIH0sIFtkaXJlY3RvcnlMb2FkZWRdKTtcblxuICBjb25zdCBsb2FkUmVnaW9uSW52ZW50b3J5ID0gdXNlQ2FsbGJhY2soYXN5bmMgKHJlZ2lvbklkKSA9PiB7XG4gICAgaWYgKCFyZWdpb25JZCkgcmV0dXJuO1xuICAgIHNldE1hcExvYWRpbmcodHJ1ZSk7XG4gICAgc2V0TWFwRXJyb3IoXCJcIik7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHNuYXAgPSBhd2FpdCBmaXJlYmFzZVxuICAgICAgICAuZmlyZXN0b3JlKClcbiAgICAgICAgLmNvbGxlY3Rpb24oXCJUZXN0XCIpXG4gICAgICAgIC53aGVyZShcIm5ld0xvY2FsQ3VycmVudC5yZWdpb25cIiwgXCI9PVwiLCByZWdpb25JZClcbiAgICAgICAgLmdldCgpO1xuXG4gICAgICBjb25zdCBjZWxsUGFsbGV0cyA9IHt9O1xuICAgICAgY29uc3QgcGFsbGV0QmlucyA9IHt9O1xuICAgICAgc25hcC5mb3JFYWNoKChkb2MpID0+IHtcbiAgICAgICAgY29uc3QgbG9jID0gZG9jLmRhdGEoKT8ubmV3TG9jYWxDdXJyZW50IHx8IHt9O1xuICAgICAgICBsZXQgcm93ID0gbG9jLnNlY3Rpb24/LmxldHRlcjtcbiAgICAgICAgbGV0IGNvbCA9IGxvYy5zZWN0aW9uPy5udW1iZXI7XG4gICAgICAgIGlmICgoIXJvdyB8fCAhY29sKSAmJiB0eXBlb2YgbG9jLnNlY3Rpb24gPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICBjb25zdCB0cmltbWVkID0gbG9jLnNlY3Rpb24udHJpbSgpO1xuICAgICAgICAgIHJvdyA9IHRyaW1tZWQuc2xpY2UoMCwgMSk7XG4gICAgICAgICAgY29sID0gdHJpbW1lZC5zbGljZSgxKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29sICE9PSB1bmRlZmluZWQgJiYgY29sICE9PSBudWxsKSB7XG4gICAgICAgICAgY29sID0gU3RyaW5nKGNvbCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcGFsbGV0ID0gbG9jLnBhbGxldDtcbiAgICAgICAgY29uc3QgYmluID0gbG9jLmJpbjtcbiAgICAgICAgaWYgKCFyb3cgfHwgIWNvbCkgcmV0dXJuO1xuICAgICAgICBjb25zdCBjZWxsS2V5ID0gYCR7cm93fS0ke2NvbH1gO1xuICAgICAgICBpZiAocGFsbGV0ICE9PSB1bmRlZmluZWQgJiYgcGFsbGV0ICE9PSBudWxsICYmIGAke3BhbGxldH1gICE9PSBcIlwiKSB7XG4gICAgICAgICAgaWYgKCFjZWxsUGFsbGV0c1tjZWxsS2V5XSkgY2VsbFBhbGxldHNbY2VsbEtleV0gPSBuZXcgU2V0KCk7XG4gICAgICAgICAgY2VsbFBhbGxldHNbY2VsbEtleV0uYWRkKFN0cmluZyhwYWxsZXQpKTtcbiAgICAgICAgICBpZiAoYmluICE9PSB1bmRlZmluZWQgJiYgYmluICE9PSBudWxsICYmIGAke2Jpbn1gICE9PSBcIlwiKSB7XG4gICAgICAgICAgICBjb25zdCBwYWxsZXRLZXkgPSBgJHtjZWxsS2V5fS1QJHtwYWxsZXR9YDtcbiAgICAgICAgICAgIGlmICghcGFsbGV0Qmluc1twYWxsZXRLZXldKSBwYWxsZXRCaW5zW3BhbGxldEtleV0gPSBuZXcgU2V0KCk7XG4gICAgICAgICAgICBwYWxsZXRCaW5zW3BhbGxldEtleV0uYWRkKFN0cmluZyhiaW4pKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBjZWxsT2JqID0ge307XG4gICAgICBPYmplY3Qua2V5cyhjZWxsUGFsbGV0cykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgIGNlbGxPYmpba2V5XSA9IEFycmF5LmZyb20oY2VsbFBhbGxldHNba2V5XSkuc29ydChcbiAgICAgICAgICAoYSwgYikgPT4gTnVtYmVyKGEpIC0gTnVtYmVyKGIpXG4gICAgICAgICk7XG4gICAgICB9KTtcblxuICAgICAgY29uc3QgcGFsbGV0T2JqID0ge307XG4gICAgICBPYmplY3Qua2V5cyhwYWxsZXRCaW5zKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgcGFsbGV0T2JqW2tleV0gPSBBcnJheS5mcm9tKHBhbGxldEJpbnNba2V5XSkuc29ydChcbiAgICAgICAgICAoYSwgYikgPT4gTnVtYmVyKGEpIC0gTnVtYmVyKGIpXG4gICAgICAgICk7XG4gICAgICB9KTtcblxuICAgICAgc2V0TWFwQ2VsbFBhbGxldHMoY2VsbE9iaik7XG4gICAgICBzZXRNYXBQYWxsZXRCaW5zKHBhbGxldE9iaik7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gbG9hZCBtYXAgaW52ZW50b3J5XCIsIGVycm9yKTtcbiAgICAgIHNldE1hcEVycm9yKFwiRmFpbGVkIHRvIGxvYWQgbWFwIGludmVudG9yeS5cIik7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldE1hcExvYWRpbmcoZmFsc2UpO1xuICAgIH1cbiAgfSwgW10pO1xuXG4gIGNvbnN0IGdldFJlZ2lvbkRpbWVuc2lvbnMgPSB1c2VDYWxsYmFjayhcbiAgICAocmVnaW9uSWQpID0+IHtcbiAgICAgIGNvbnN0IGVudHJ5ID0gc2VjdGlvbk1hcD8uW3JlZ2lvbklkXTtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGVudHJ5KSAmJiBlbnRyeS5sZW5ndGggPj0gMikge1xuICAgICAgICBjb25zdCBjb2xzID0gcGFyc2VJbnQoZW50cnlbMF0sIDEwKTtcbiAgICAgICAgY29uc3Qgcm93cyA9IHBhcnNlSW50KGVudHJ5WzFdLCAxMCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgY29sczogTnVtYmVyLmlzRmluaXRlKGNvbHMpID8gY29scyA6IDAsXG4gICAgICAgICAgcm93czogTnVtYmVyLmlzRmluaXRlKHJvd3MpID8gcm93cyA6IDAsXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICByZXR1cm4geyBjb2xzOiAwLCByb3dzOiAwIH07XG4gICAgfSxcbiAgICBbc2VjdGlvbk1hcF1cbiAgKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IHdhc09wZW4gPSBsYXN0U2hvd1JlZi5jdXJyZW50O1xuICAgIGxhc3RTaG93UmVmLmN1cnJlbnQgPSBzaG93O1xuICAgIGlmICghc2hvdyB8fCB3YXNPcGVuKSByZXR1cm47XG5cbiAgICBsb2FkRGlyZWN0b3J5KCk7XG4gICAgc2V0TWFwRXJyb3IoXCJcIik7XG4gICAgY29uc3Qge1xuICAgICAgcmVnaW9uLFxuICAgICAgc2VjdGlvbkxldHRlcixcbiAgICAgIHNlY3Rpb25OdW1iZXIsXG4gICAgICBwYWxsZXQsXG4gICAgICBiaW4sXG4gICAgfSA9IGluaXRpYWxTZWxlY3Rpb24gfHwge307XG5cbiAgICBzZXRNYXBSZWdpb24ocmVnaW9uIHx8IFwiXCIpO1xuICAgIHNldE1hcFJvdyhzZWN0aW9uTGV0dGVyIHx8IFwiXCIpO1xuICAgIHNldE1hcENvbChzZWN0aW9uTnVtYmVyID8gU3RyaW5nKHNlY3Rpb25OdW1iZXIpIDogXCJcIik7XG4gICAgc2V0TWFwUGFsbGV0KHBhbGxldCA/IFN0cmluZyhwYWxsZXQpIDogXCJcIik7XG4gICAgc2V0TWFwQmluKGJpbiA/IFN0cmluZyhiaW4pIDogXCJcIik7XG4gICAgc2V0TWFwU3RlcChyZWdpb24gPyBcImdyaWRcIiA6IFwicmVnaW9uc1wiKTtcbiAgICBpZiAocmVnaW9uKSBsb2FkUmVnaW9uSW52ZW50b3J5KHJlZ2lvbik7XG4gIH0sIFtzaG93LCBpbml0aWFsU2VsZWN0aW9uLCBsb2FkRGlyZWN0b3J5LCBsb2FkUmVnaW9uSW52ZW50b3J5XSk7XG5cbiAgY29uc3QgaGFuZGxlU2VsZWN0UmVnaW9uID0gKHJlZ2lvbklkKSA9PiB7XG4gICAgY29uc3Qgc2VsZWN0aW9uID0ge1xuICAgICAgcmVnaW9uOiByZWdpb25JZCxcbiAgICAgIHNlY3Rpb25MZXR0ZXI6IFwiXCIsXG4gICAgICBzZWN0aW9uTnVtYmVyOiBcIlwiLFxuICAgICAgcGFsbGV0OiBcIlwiLFxuICAgICAgYmluOiBcIlwiLFxuICAgIH07XG4gICAgc2V0TWFwUmVnaW9uKHJlZ2lvbklkKTtcbiAgICBzZXRNYXBSb3coXCJcIik7XG4gICAgc2V0TWFwQ29sKFwiXCIpO1xuICAgIHNldE1hcFBhbGxldChcIlwiKTtcbiAgICBzZXRNYXBCaW4oXCJcIik7XG4gICAgc2V0TWFwU3RlcChcImdyaWRcIik7XG4gICAgbm90aWZ5U2VsZWN0aW9uQ2hhbmdlKHNlbGVjdGlvbik7XG4gICAgbG9hZFJlZ2lvbkludmVudG9yeShyZWdpb25JZCk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlU2VsZWN0Q2VsbCA9IChyb3dMZXR0ZXIsIGNvbE51bWJlcikgPT4ge1xuICAgIGNvbnN0IGNvbFZhbHVlID0gU3RyaW5nKGNvbE51bWJlcik7XG4gICAgY29uc3Qgc2VsZWN0aW9uID0ge1xuICAgICAgcmVnaW9uOiBtYXBSZWdpb24sXG4gICAgICBzZWN0aW9uTGV0dGVyOiByb3dMZXR0ZXIsXG4gICAgICBzZWN0aW9uTnVtYmVyOiBjb2xWYWx1ZSxcbiAgICAgIHBhbGxldDogXCJcIixcbiAgICAgIGJpbjogXCJcIixcbiAgICB9O1xuICAgIHNldE1hcFJvdyhyb3dMZXR0ZXIpO1xuICAgIHNldE1hcENvbChjb2xWYWx1ZSk7XG4gICAgc2V0TWFwUGFsbGV0KFwiXCIpO1xuICAgIHNldE1hcEJpbihcIlwiKTtcbiAgICBzZXRNYXBTdGVwKFwicGFsbGV0c1wiKTtcbiAgICBub3RpZnlTZWxlY3Rpb25DaGFuZ2Uoc2VsZWN0aW9uKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVTZWxlY3RQYWxsZXQgPSAocGFsbGV0SWQpID0+IHtcbiAgICBjb25zdCBwYWxsZXRWYWx1ZSA9IFN0cmluZyhwYWxsZXRJZCk7XG4gICAgY29uc3Qgc2VsZWN0aW9uID0ge1xuICAgICAgcmVnaW9uOiBtYXBSZWdpb24sXG4gICAgICBzZWN0aW9uTGV0dGVyOiBtYXBSb3csXG4gICAgICBzZWN0aW9uTnVtYmVyOiBtYXBDb2wsXG4gICAgICBwYWxsZXQ6IHBhbGxldFZhbHVlLFxuICAgICAgYmluOiBcIlwiLFxuICAgIH07XG4gICAgc2V0TWFwUGFsbGV0KHBhbGxldFZhbHVlKTtcbiAgICBzZXRNYXBCaW4oXCJcIik7XG4gICAgc2V0TWFwU3RlcChcImJpbnNcIik7XG4gICAgbm90aWZ5U2VsZWN0aW9uQ2hhbmdlKHNlbGVjdGlvbik7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlU2VsZWN0QmluID0gKGJpbklkKSA9PiB7XG4gICAgY29uc3QgYmluVmFsdWUgPSBTdHJpbmcoYmluSWQpO1xuICAgIGNvbnN0IHNlbGVjdGlvbiA9IHtcbiAgICAgIHJlZ2lvbjogbWFwUmVnaW9uLFxuICAgICAgc2VjdGlvbkxldHRlcjogbWFwUm93LFxuICAgICAgc2VjdGlvbk51bWJlcjogbWFwQ29sLFxuICAgICAgcGFsbGV0OiBtYXBQYWxsZXQsXG4gICAgICBiaW46IGJpblZhbHVlLFxuICAgIH07XG4gICAgc2V0TWFwQmluKGJpblZhbHVlKTtcbiAgICBub3RpZnlTZWxlY3Rpb25DaGFuZ2Uoc2VsZWN0aW9uKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVCYWNrID0gKCkgPT4ge1xuICAgIGlmIChtYXBTdGVwID09PSBcImJpbnNcIikgc2V0TWFwU3RlcChcInBhbGxldHNcIik7XG4gICAgZWxzZSBpZiAobWFwU3RlcCA9PT0gXCJwYWxsZXRzXCIpIHNldE1hcFN0ZXAoXCJncmlkXCIpO1xuICAgIGVsc2UgaWYgKG1hcFN0ZXAgPT09IFwiZ3JpZFwiKSBzZXRNYXBTdGVwKFwicmVnaW9uc1wiKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVWaWV3ID0gKCkgPT4ge1xuICAgIGlmICh0eXBlb2Ygb25WaWV3ICE9PSBcImZ1bmN0aW9uXCIpIHJldHVybjtcbiAgICBvblZpZXcoe1xuICAgICAgcmVnaW9uOiBtYXBSZWdpb24sXG4gICAgICBzZWN0aW9uTGV0dGVyOiBtYXBSb3csXG4gICAgICBzZWN0aW9uTnVtYmVyOiBtYXBDb2wsXG4gICAgICBwYWxsZXQ6IG1hcFBhbGxldCxcbiAgICAgIGJpbjogbWFwQmluLFxuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPE1vZGFsIHNob3c9e3Nob3d9IG9uSGlkZT17b25IaWRlfSBjZW50ZXJlZCBzaXplPVwibGdcIj5cbiAgICAgIDxNb2RhbC5IZWFkZXIgY2xvc2VCdXR0b24+XG4gICAgICAgIDxNb2RhbC5UaXRsZT5XYXJlaG91c2UgTWFwPC9Nb2RhbC5UaXRsZT5cbiAgICAgIDwvTW9kYWwuSGVhZGVyPlxuICAgICAgPE1vZGFsLkJvZHk+XG4gICAgICAgIHttYXBMb2FkaW5nICYmIChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLm1hcExvYWRpbmd9PlxuICAgICAgICAgICAgPFNwaW5uZXIgYW5pbWF0aW9uPVwiYm9yZGVyXCIgLz5cbiAgICAgICAgICAgIDxzcGFuPkxvYWRpbmcgbWFwIGRhdGEuLi48L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9XG4gICAgICAgIHttYXBFcnJvciAmJiA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLm1hcEVycm9yfT57bWFwRXJyb3J9PC9kaXY+fVxuXG4gICAgICAgIHshbWFwTG9hZGluZyAmJiBtYXBTdGVwID09PSBcInJlZ2lvbnNcIiAmJiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5tYXBTdGFnZX0+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLm1hcEhpbnR9PlNlbGVjdCBhIHJlZ2lvbjwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5tYXBDYW52YXN9PlxuICAgICAgICAgICAgICB7UkVHSU9OX09SREVSLm1hcCgocmVnaW9uSWQpID0+IChcbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBrZXk9e3JlZ2lvbklkfVxuICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2Ake3N0eWxlcy5yZWdpb25CbG9ja30gJHtzdHlsZXNbYHJlZ2lvbiR7cmVnaW9uSWR9YF19YH1cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZVNlbGVjdFJlZ2lvbihyZWdpb25JZCl9XG4gICAgICAgICAgICAgICAgICBkaXNhYmxlZD17XG4gICAgICAgICAgICAgICAgICAgIEFycmF5LmlzQXJyYXkocmVnaW9uT3B0aW9ucykgJiZcbiAgICAgICAgICAgICAgICAgICAgcmVnaW9uT3B0aW9ucy5sZW5ndGggPiAwICYmXG4gICAgICAgICAgICAgICAgICAgICFyZWdpb25PcHRpb25zLmluY2x1ZGVzKHJlZ2lvbklkKVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIHtyZWdpb25JZH1cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cblxuICAgICAgICB7IW1hcExvYWRpbmcgJiYgbWFwU3RlcCA9PT0gXCJncmlkXCIgJiYgKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubWFwU3RhZ2V9PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5tYXBIaW50fT5cbiAgICAgICAgICAgICAgUmVnaW9uIHttYXBSZWdpb259OiBjaG9vc2UgYSByb3cgYW5kIGNvbHVtblxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB7KCgpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgZGltcyA9IGdldFJlZ2lvbkRpbWVuc2lvbnMobWFwUmVnaW9uKTtcbiAgICAgICAgICAgICAgY29uc3Qgcm93cyA9IExFVFRFUlMuc2xpY2UoMCwgZGltcy5yb3dzIHx8IDApLnJldmVyc2UoKTtcbiAgICAgICAgICAgICAgY29uc3QgY29scyA9IE5VTUJFUlMuc2xpY2UoMCwgZGltcy5jb2xzIHx8IDApO1xuICAgICAgICAgICAgICBpZiAoIXJvd3MubGVuZ3RoIHx8ICFjb2xzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNlY3Rpb25LZXlzID0gT2JqZWN0LmtleXMobWFwQ2VsbFBhbGxldHMgfHwge30pXG4gICAgICAgICAgICAgICAgICAuZmlsdGVyKEJvb2xlYW4pXG4gICAgICAgICAgICAgICAgICAubWFwKChrZXkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgW3JvdywgY29sXSA9IGtleS5zcGxpdChcIi1cIik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGtleSwgcm93LCBjb2wgfTtcbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoYS5yb3cgPT09IGIucm93KSB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIE51bWJlcihhLmNvbCkgLSBOdW1iZXIoYi5jb2wpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBiLnJvdy5sb2NhbGVDb21wYXJlKGEucm93KTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFzZWN0aW9uS2V5cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubWFwRW1wdHl9PlxuICAgICAgICAgICAgICAgICAgICAgIE5vIGdyaWQgZGF0YSBmb3IgdGhpcyByZWdpb24uXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5ncmlkV3JhcHBlcn0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubWFwSGludH0+XG4gICAgICAgICAgICAgICAgICAgICAgR3JpZCBub3QgYXZhaWxhYmxlLiBTZWxlY3QgYW4gYXZhaWxhYmxlIHNlY3Rpb24gYmVsb3cuXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnBhbGxldEdyaWR9PlxuICAgICAgICAgICAgICAgICAgICAgIHtzZWN0aW9uS2V5cy5tYXAoKHsga2V5LCByb3csIGNvbCB9KSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17a2V5fVxuICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMucGFsbGV0QnV0dG9ufVxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVTZWxlY3RDZWxsKHJvdywgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAge3Jvd31cbiAgICAgICAgICAgICAgICAgICAgICAgICAge2NvbH1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmdyaWRXcmFwcGVyfT5cbiAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMuZ3JpZH1cbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgXCItLWdyaWQtY29sc1wiOiBjb2xzLmxlbmd0aCB9fVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7cm93cy5tYXAoKHJvdykgPT5cbiAgICAgICAgICAgICAgICAgICAgICBjb2xzLm1hcCgoY29sKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjZWxsS2V5ID0gYCR7cm93fS0ke2NvbH1gO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaGFzUGFsbGV0cyA9IEJvb2xlYW4oXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG1hcENlbGxQYWxsZXRzW2NlbGxLZXldPy5sZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtjZWxsS2V5fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YCR7c3R5bGVzLmdyaWRDZWxsfSAke1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzUGFsbGV0cyA/IFwiXCIgOiBzdHlsZXMuZ3JpZENlbGxEaXNhYmxlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNQYWxsZXRzICYmIGhhbmRsZVNlbGVjdENlbGwocm93LCBjb2wpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXshaGFzUGFsbGV0c31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3Jvd31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtjb2x9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSkoKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cblxuICAgICAgICB7IW1hcExvYWRpbmcgJiYgbWFwU3RlcCA9PT0gXCJwYWxsZXRzXCIgJiYgKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubWFwU3RhZ2V9PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5tYXBIaW50fT5cbiAgICAgICAgICAgICAgUmVnaW9uIHttYXBSZWdpb259IC0gU2VjdGlvbiB7bWFwUm93fVxuICAgICAgICAgICAgICB7bWFwQ29sfTogc2VsZWN0IGEgcGFsbGV0XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMucGFsbGV0R3JpZH0+XG4gICAgICAgICAgICAgIHsobWFwQ2VsbFBhbGxldHNbYCR7bWFwUm93fS0ke21hcENvbH1gXSB8fCBbXSkubWFwKChwYWxsZXQpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBwYWxsZXRLZXkgPSBgJHttYXBSb3d9LSR7bWFwQ29sfS1QJHtwYWxsZXR9YDtcbiAgICAgICAgICAgICAgICBjb25zdCBiaW5zID0gbWFwUGFsbGV0Qmluc1twYWxsZXRLZXldIHx8IFtdO1xuICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGtleT17cGFsbGV0fVxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMucGFsbGV0QnV0dG9ufVxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChiaW5zLmxlbmd0aCA9PT0gMCAmJiB0eXBlb2Ygb25WaWV3ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNlbGVjdGlvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmVnaW9uOiBtYXBSZWdpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNlY3Rpb25MZXR0ZXI6IG1hcFJvdyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2VjdGlvbk51bWJlcjogbWFwQ29sLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBwYWxsZXQ6IFN0cmluZyhwYWxsZXQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBiaW46IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgbm90aWZ5U2VsZWN0aW9uQ2hhbmdlKHNlbGVjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBvblZpZXcoc2VsZWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgaGFuZGxlU2VsZWN0UGFsbGV0KHBhbGxldCk7XG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIFBhbGxldCB7cGFsbGV0fVxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgIHshKG1hcENlbGxQYWxsZXRzW2Ake21hcFJvd30tJHttYXBDb2x9YF0gfHwgW10pLmxlbmd0aCAmJiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5tYXBFbXB0eX0+XG4gICAgICAgICAgICAgICAgICBObyBwYWxsZXRzIGF2YWlsYWJsZSBoZXJlLlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9XG5cbiAgICAgICAgeyFtYXBMb2FkaW5nICYmIG1hcFN0ZXAgPT09IFwiYmluc1wiICYmIChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLm1hcFN0YWdlfT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubWFwSGludH0+XG4gICAgICAgICAgICAgIFJlZ2lvbiB7bWFwUmVnaW9ufSAtIFNlY3Rpb24ge21hcFJvd31cbiAgICAgICAgICAgICAge21hcENvbH0gLSBQYWxsZXQge21hcFBhbGxldH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5wYWxsZXRHcmlkfT5cbiAgICAgICAgICAgICAgeyhtYXBQYWxsZXRCaW5zW2Ake21hcFJvd30tJHttYXBDb2x9LVAke21hcFBhbGxldH1gXSB8fCBbXSkubWFwKFxuICAgICAgICAgICAgICAgIChiaW4pID0+IChcbiAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAga2V5PXtiaW59XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2Ake3N0eWxlcy5wYWxsZXRCdXR0b259ICR7c3R5bGVzLmJpbkJ1dHRvbn1gfVxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVTZWxlY3RCaW4oYmluKX1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgQmluIHtiaW59XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIHshKG1hcFBhbGxldEJpbnNbYCR7bWFwUm93fS0ke21hcENvbH0tUCR7bWFwUGFsbGV0fWBdIHx8IFtdKVxuICAgICAgICAgICAgICAgIC5sZW5ndGggJiYgKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubWFwRW1wdHl9PlxuICAgICAgICAgICAgICAgICAgTm8gYmlucyBhdmFpbGFibGUgb24gdGhpcyBwYWxsZXQuXG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgIDwvTW9kYWwuQm9keT5cbiAgICAgIDxNb2RhbC5Gb290ZXIgY2xhc3NOYW1lPXtzdHlsZXMubWFwRm9vdGVyfT5cbiAgICAgICAgPEJ1dHRvblxuICAgICAgICAgIHZhcmlhbnQ9XCJvdXRsaW5lLXNlY29uZGFyeVwiXG4gICAgICAgICAgb25DbGljaz17aGFuZGxlQmFja31cbiAgICAgICAgICBkaXNhYmxlZD17bWFwU3RlcCA9PT0gXCJyZWdpb25zXCJ9XG4gICAgICAgID5cbiAgICAgICAgICBCYWNrXG4gICAgICAgIDwvQnV0dG9uPlxuICAgICAgICA8QnV0dG9uIHZhcmlhbnQ9XCJvdXRsaW5lLXByaW1hcnlcIiBvbkNsaWNrPXtoYW5kbGVWaWV3fT5cbiAgICAgICAgICBWaWV3XG4gICAgICAgIDwvQnV0dG9uPlxuICAgICAgICA8QnV0dG9uIHZhcmlhbnQ9XCJzZWNvbmRhcnlcIiBvbkNsaWNrPXtvbkhpZGV9PlxuICAgICAgICAgIENsb3NlXG4gICAgICAgIDwvQnV0dG9uPlxuICAgICAgPC9Nb2RhbC5Gb290ZXI+XG4gICAgPC9Nb2RhbD5cbiAgKTtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=