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

  var lastShowRef = Object(react__WEBPACK_IMPORTED_MODULE_2__["useRef"])(false);
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

  return __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Modal"], {
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
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Modal"].Header, {
    closeButton: true,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 247,
      columnNumber: 7
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Modal"].Title, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 248,
      columnNumber: 9
    }
  }, "Warehouse Map")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Modal"].Body, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 250,
      columnNumber: 7
    }
  }, mapLoading && __jsx("div", {
    className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_5___default.a.mapLoading,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 252,
      columnNumber: 11
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Spinner"], {
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
    className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_5___default.a.mapError,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 257,
      columnNumber: 22
    }
  }, mapError), !mapLoading && mapStep === "regions" && __jsx("div", {
    className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_5___default.a.mapStage,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 260,
      columnNumber: 11
    }
  }, __jsx("div", {
    className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_5___default.a.mapHint,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 261,
      columnNumber: 13
    }
  }, "Select a region"), __jsx("div", {
    className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_5___default.a.mapCanvas,
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
      className: "".concat(_WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_5___default.a.regionBlock, " ").concat(_WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_5___default.a["region".concat(regionId)]),
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
    className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_5___default.a.mapStage,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 283,
      columnNumber: 11
    }
  }, __jsx("div", {
    className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_5___default.a.mapHint,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 284,
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
          lineNumber: 293,
          columnNumber: 19
        }
      }, "No grid data for this region.");
    }

    return __jsx("div", {
      className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_5___default.a.gridWrapper,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 299,
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
        lineNumber: 300,
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
            lineNumber: 311,
            columnNumber: 27
          }
        }, __jsx("span", {
          __self: _this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 322,
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
      lineNumber: 338,
      columnNumber: 11
    }
  }, __jsx("div", {
    className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_5___default.a.mapHint,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 339,
      columnNumber: 13
    }
  }, "Region ", mapRegion, " - Section ", mapRow, mapCol, ": select a pallet"), __jsx("div", {
    className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_5___default.a.palletGrid,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 343,
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
        lineNumber: 348,
        columnNumber: 19
      }
    }, "Pallet ", pallet);
  }), !(mapCellPallets["".concat(mapRow, "-").concat(mapCol)] || []).length && __jsx("div", {
    className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_5___default.a.mapEmpty,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 373,
      columnNumber: 17
    }
  }, "No pallets available here."))), !mapLoading && mapStep === "bins" && __jsx("div", {
    className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_5___default.a.mapStage,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 382,
      columnNumber: 11
    }
  }, __jsx("div", {
    className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_5___default.a.mapHint,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 383,
      columnNumber: 13
    }
  }, "Region ", mapRegion, " - Section ", mapRow, mapCol, " - Pallet ", mapPallet), __jsx("div", {
    className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_5___default.a.palletGrid,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 387,
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
        lineNumber: 390,
        columnNumber: 19
      }
    }, "Bin ", bin);
  }), !(mapPalletBins["".concat(mapRow, "-").concat(mapCol, "-P").concat(mapPallet)] || []).length && __jsx("div", {
    className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_5___default.a.mapEmpty,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 402,
      columnNumber: 17
    }
  }, "No bins available on this pallet.")))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Modal"].Footer, {
    className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_5___default.a.mapFooter,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 410,
      columnNumber: 7
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], {
    variant: "outline-secondary",
    onClick: handleBack,
    disabled: mapStep === "regions",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 411,
      columnNumber: 9
    }
  }, "Back"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], {
    variant: "outline-primary",
    onClick: handleView,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 418,
      columnNumber: 9
    }
  }, "View"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], {
    variant: "secondary",
    onClick: onHide,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 421,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vY29tcG9uZW50cy9XYXJlaG91c2VNYXBNb2RhbC5qcyJdLCJuYW1lcyI6WyJSRUdJT05fT1JERVIiLCJMRVRURVJTIiwiQXJyYXkiLCJmcm9tIiwibGVuZ3RoIiwiXyIsImkiLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJOVU1CRVJTIiwiV2FyZWhvdXNlTWFwTW9kYWwiLCJzaG93Iiwib25IaWRlIiwib25WaWV3Iiwib25TZWxlY3Rpb25DaGFuZ2UiLCJpbml0aWFsU2VsZWN0aW9uIiwidXNlU3RhdGUiLCJyZWdpb25PcHRpb25zIiwic2V0UmVnaW9uT3B0aW9ucyIsInNlY3Rpb25NYXAiLCJzZXRTZWN0aW9uTWFwIiwibWFwU3RlcCIsInNldE1hcFN0ZXAiLCJtYXBSZWdpb24iLCJzZXRNYXBSZWdpb24iLCJtYXBSb3ciLCJzZXRNYXBSb3ciLCJtYXBDb2wiLCJzZXRNYXBDb2wiLCJtYXBQYWxsZXQiLCJzZXRNYXBQYWxsZXQiLCJtYXBCaW4iLCJzZXRNYXBCaW4iLCJtYXBDZWxsUGFsbGV0cyIsInNldE1hcENlbGxQYWxsZXRzIiwibWFwUGFsbGV0QmlucyIsInNldE1hcFBhbGxldEJpbnMiLCJtYXBMb2FkaW5nIiwic2V0TWFwTG9hZGluZyIsIm1hcEVycm9yIiwic2V0TWFwRXJyb3IiLCJkaXJlY3RvcnlMb2FkZWQiLCJzZXREaXJlY3RvcnlMb2FkZWQiLCJsYXN0U2hvd1JlZiIsInVzZVJlZiIsIm5vdGlmeVNlbGVjdGlvbkNoYW5nZSIsInVzZUNhbGxiYWNrIiwic2VsZWN0aW9uIiwibG9hZERpcmVjdG9yeSIsImZpcmViYXNlIiwiZmlyZXN0b3JlIiwiY29sbGVjdGlvbiIsImRvYyIsImdldCIsImRhdGEiLCJSZWdpb24iLCJTZWN0aW9uIiwiY29uc29sZSIsImVycm9yIiwibG9hZFJlZ2lvbkludmVudG9yeSIsInJlZ2lvbklkIiwid2hlcmUiLCJzbmFwIiwiY2VsbFBhbGxldHMiLCJwYWxsZXRCaW5zIiwiZm9yRWFjaCIsImxvYyIsIm5ld0xvY2FsQ3VycmVudCIsInJvdyIsInNlY3Rpb24iLCJsZXR0ZXIiLCJjb2wiLCJudW1iZXIiLCJ0cmltbWVkIiwidHJpbSIsInNsaWNlIiwidW5kZWZpbmVkIiwicGFsbGV0IiwiYmluIiwiY2VsbEtleSIsIlNldCIsImFkZCIsInBhbGxldEtleSIsImNlbGxPYmoiLCJPYmplY3QiLCJrZXlzIiwia2V5Iiwic29ydCIsImEiLCJiIiwiTnVtYmVyIiwicGFsbGV0T2JqIiwiZ2V0UmVnaW9uRGltZW5zaW9ucyIsImVudHJ5IiwiaXNBcnJheSIsImNvbHMiLCJwYXJzZUludCIsInJvd3MiLCJpc0Zpbml0ZSIsInVzZUVmZmVjdCIsIndhc09wZW4iLCJjdXJyZW50IiwicmVnaW9uIiwic2VjdGlvbkxldHRlciIsInNlY3Rpb25OdW1iZXIiLCJoYW5kbGVTZWxlY3RSZWdpb24iLCJoYW5kbGVTZWxlY3RDZWxsIiwicm93TGV0dGVyIiwiY29sTnVtYmVyIiwiY29sVmFsdWUiLCJoYW5kbGVTZWxlY3RQYWxsZXQiLCJwYWxsZXRJZCIsInBhbGxldFZhbHVlIiwiaGFuZGxlU2VsZWN0QmluIiwiYmluSWQiLCJiaW5WYWx1ZSIsImhhbmRsZUJhY2siLCJoYW5kbGVWaWV3Iiwic3R5bGVzIiwibWFwU3RhZ2UiLCJtYXBIaW50IiwibWFwQ2FudmFzIiwibWFwIiwicmVnaW9uQmxvY2siLCJpbmNsdWRlcyIsImRpbXMiLCJtYXBFbXB0eSIsImdyaWRXcmFwcGVyIiwiZ3JpZCIsImhhc1BhbGxldHMiLCJCb29sZWFuIiwiZ3JpZENlbGwiLCJncmlkQ2VsbERpc2FibGVkIiwicGFsbGV0R3JpZCIsImJpbnMiLCJwYWxsZXRCdXR0b24iLCJiaW5CdXR0b24iLCJtYXBGb290ZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLElBQU1BLFlBQVksR0FBRyxDQUFDLEdBQUQsRUFBTSxHQUFOLEVBQVcsR0FBWCxFQUFnQixH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O0FBR0UsWUFBUSxFQUFFL0YsT0FBTyxLQUFLLFNBSHhCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFERixFQVFFLE1BQUMsc0RBQUQ7QUFBUSxXQUFPLEVBQUMsaUJBQWhCO0FBQWtDLFdBQU8sRUFBRWdHLFVBQTNDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFSRixFQVdFLE1BQUMsc0RBQUQ7QUFBUSxXQUFPLEVBQUMsV0FBaEI7QUFBNEIsV0FBTyxFQUFFekcsTUFBckM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQVhGLENBcEtGLENBREY7QUFzTEQ7O0dBL1p1QkYsaUI7O0tBQUFBLGlCIiwiZmlsZSI6InN0YXRpYy93ZWJwYWNrL3BhZ2VzL05ld1NlYXJjaC9tYWluU2VhcmNoLmVhNDY1NDdiOTljOTkyOGRkMzQzLmhvdC11cGRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgTW9kYWwsIEJ1dHRvbiwgU3Bpbm5lciB9IGZyb20gXCJyZWFjdC1ib290c3RyYXBcIjtcbmltcG9ydCBmaXJlYmFzZSBmcm9tIFwiLi4vY29udGV4dC9GaXJlYmFzZVwiO1xuaW1wb3J0IHN0eWxlcyBmcm9tIFwiLi9XYXJlaG91c2VNYXBNb2RhbC5tb2R1bGUuY3NzXCI7XG5cbmNvbnN0IFJFR0lPTl9PUkRFUiA9IFtcIkVcIiwgXCJGXCIsIFwiR1wiLCBcIkFcIiwgXCJEXCIsIFwiQ1wiLCBcIkJcIl07XG5jb25zdCBMRVRURVJTID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogMjYgfSwgKF8sIGkpID0+XG4gIFN0cmluZy5mcm9tQ2hhckNvZGUoNjUgKyBpKVxuKTtcbmNvbnN0IE5VTUJFUlMgPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiA1MCB9LCAoXywgaSkgPT4gaSArIDEpO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBXYXJlaG91c2VNYXBNb2RhbCh7XG4gIHNob3cgPSBmYWxzZSxcbiAgb25IaWRlID0gKCkgPT4ge30sXG4gIG9uVmlldyxcbiAgb25TZWxlY3Rpb25DaGFuZ2UsXG4gIGluaXRpYWxTZWxlY3Rpb24gPSB7fSxcbn0pIHtcbiAgY29uc3QgW3JlZ2lvbk9wdGlvbnMsIHNldFJlZ2lvbk9wdGlvbnNdID0gdXNlU3RhdGUoW10pO1xuICBjb25zdCBbc2VjdGlvbk1hcCwgc2V0U2VjdGlvbk1hcF0gPSB1c2VTdGF0ZSh7fSk7XG4gIGNvbnN0IFttYXBTdGVwLCBzZXRNYXBTdGVwXSA9IHVzZVN0YXRlKFwicmVnaW9uc1wiKTtcbiAgY29uc3QgW21hcFJlZ2lvbiwgc2V0TWFwUmVnaW9uXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbbWFwUm93LCBzZXRNYXBSb3ddID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFttYXBDb2wsIHNldE1hcENvbF0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW21hcFBhbGxldCwgc2V0TWFwUGFsbGV0XSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbbWFwQmluLCBzZXRNYXBCaW5dID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFttYXBDZWxsUGFsbGV0cywgc2V0TWFwQ2VsbFBhbGxldHNdID0gdXNlU3RhdGUoe30pO1xuICBjb25zdCBbbWFwUGFsbGV0Qmlucywgc2V0TWFwUGFsbGV0Qmluc10gPSB1c2VTdGF0ZSh7fSk7XG4gIGNvbnN0IFttYXBMb2FkaW5nLCBzZXRNYXBMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW21hcEVycm9yLCBzZXRNYXBFcnJvcl0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2RpcmVjdG9yeUxvYWRlZCwgc2V0RGlyZWN0b3J5TG9hZGVkXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgbGFzdFNob3dSZWYgPSB1c2VSZWYoZmFsc2UpO1xuXG4gIGNvbnN0IG5vdGlmeVNlbGVjdGlvbkNoYW5nZSA9IHVzZUNhbGxiYWNrKFxuICAgIChzZWxlY3Rpb24pID0+IHtcbiAgICAgIGlmICh0eXBlb2Ygb25TZWxlY3Rpb25DaGFuZ2UgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBvblNlbGVjdGlvbkNoYW5nZShzZWxlY3Rpb24pO1xuICAgICAgfVxuICAgIH0sXG4gICAgW29uU2VsZWN0aW9uQ2hhbmdlXVxuICApO1xuXG4gIGNvbnN0IGxvYWREaXJlY3RvcnkgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XG4gICAgaWYgKGRpcmVjdG9yeUxvYWRlZCkgcmV0dXJuO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBkb2MgPSBhd2FpdCBmaXJlYmFzZVxuICAgICAgICAuZmlyZXN0b3JlKClcbiAgICAgICAgLmNvbGxlY3Rpb24oXCJXYXJlaG91c2VcIilcbiAgICAgICAgLmRvYyhcImRpcmVjdG9yeVwiKVxuICAgICAgICAuZ2V0KCk7XG4gICAgICBjb25zdCBkYXRhID0gZG9jLmRhdGEoKSB8fCB7fTtcbiAgICAgIHNldFJlZ2lvbk9wdGlvbnMoZGF0YS5SZWdpb24gfHwgW10pO1xuICAgICAgc2V0U2VjdGlvbk1hcChkYXRhLlNlY3Rpb24gfHwge30pO1xuICAgICAgc2V0RGlyZWN0b3J5TG9hZGVkKHRydWUpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGxvYWQgbWFwIGRpcmVjdG9yeVwiLCBlcnJvcik7XG4gICAgICBzZXRNYXBFcnJvcihcIkZhaWxlZCB0byBsb2FkIHdhcmVob3VzZSBkaXJlY3RvcnkuXCIpO1xuICAgIH1cbiAgfSwgW2RpcmVjdG9yeUxvYWRlZF0pO1xuXG4gIGNvbnN0IGxvYWRSZWdpb25JbnZlbnRvcnkgPSB1c2VDYWxsYmFjayhhc3luYyAocmVnaW9uSWQpID0+IHtcbiAgICBpZiAoIXJlZ2lvbklkKSByZXR1cm47XG4gICAgc2V0TWFwTG9hZGluZyh0cnVlKTtcbiAgICBzZXRNYXBFcnJvcihcIlwiKTtcbiAgICB0cnkge1xuICAgICAgY29uc3Qgc25hcCA9IGF3YWl0IGZpcmViYXNlXG4gICAgICAgIC5maXJlc3RvcmUoKVxuICAgICAgICAuY29sbGVjdGlvbihcIlRlc3RcIilcbiAgICAgICAgLndoZXJlKFwibmV3TG9jYWxDdXJyZW50LnJlZ2lvblwiLCBcIj09XCIsIHJlZ2lvbklkKVxuICAgICAgICAuZ2V0KCk7XG5cbiAgICAgIGNvbnN0IGNlbGxQYWxsZXRzID0ge307XG4gICAgICBjb25zdCBwYWxsZXRCaW5zID0ge307XG4gICAgICBzbmFwLmZvckVhY2goKGRvYykgPT4ge1xuICAgICAgICBjb25zdCBsb2MgPSBkb2MuZGF0YSgpPy5uZXdMb2NhbEN1cnJlbnQgfHwge307XG4gICAgICAgIGxldCByb3cgPSBsb2Muc2VjdGlvbj8ubGV0dGVyO1xuICAgICAgICBsZXQgY29sID0gbG9jLnNlY3Rpb24/Lm51bWJlcjtcbiAgICAgICAgaWYgKCghcm93IHx8ICFjb2wpICYmIHR5cGVvZiBsb2Muc2VjdGlvbiA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgIGNvbnN0IHRyaW1tZWQgPSBsb2Muc2VjdGlvbi50cmltKCk7XG4gICAgICAgICAgcm93ID0gdHJpbW1lZC5zbGljZSgwLCAxKTtcbiAgICAgICAgICBjb2wgPSB0cmltbWVkLnNsaWNlKDEpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb2wgIT09IHVuZGVmaW5lZCAmJiBjb2wgIT09IG51bGwpIHtcbiAgICAgICAgICBjb2wgPSBTdHJpbmcoY29sKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwYWxsZXQgPSBsb2MucGFsbGV0O1xuICAgICAgICBjb25zdCBiaW4gPSBsb2MuYmluO1xuICAgICAgICBpZiAoIXJvdyB8fCAhY29sKSByZXR1cm47XG4gICAgICAgIGNvbnN0IGNlbGxLZXkgPSBgJHtyb3d9LSR7Y29sfWA7XG4gICAgICAgIGlmIChwYWxsZXQgIT09IHVuZGVmaW5lZCAmJiBwYWxsZXQgIT09IG51bGwgJiYgYCR7cGFsbGV0fWAgIT09IFwiXCIpIHtcbiAgICAgICAgICBpZiAoIWNlbGxQYWxsZXRzW2NlbGxLZXldKSBjZWxsUGFsbGV0c1tjZWxsS2V5XSA9IG5ldyBTZXQoKTtcbiAgICAgICAgICBjZWxsUGFsbGV0c1tjZWxsS2V5XS5hZGQoU3RyaW5nKHBhbGxldCkpO1xuICAgICAgICAgIGlmIChiaW4gIT09IHVuZGVmaW5lZCAmJiBiaW4gIT09IG51bGwgJiYgYCR7YmlufWAgIT09IFwiXCIpIHtcbiAgICAgICAgICAgIGNvbnN0IHBhbGxldEtleSA9IGAke2NlbGxLZXl9LVAke3BhbGxldH1gO1xuICAgICAgICAgICAgaWYgKCFwYWxsZXRCaW5zW3BhbGxldEtleV0pIHBhbGxldEJpbnNbcGFsbGV0S2V5XSA9IG5ldyBTZXQoKTtcbiAgICAgICAgICAgIHBhbGxldEJpbnNbcGFsbGV0S2V5XS5hZGQoU3RyaW5nKGJpbikpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IGNlbGxPYmogPSB7fTtcbiAgICAgIE9iamVjdC5rZXlzKGNlbGxQYWxsZXRzKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgY2VsbE9ialtrZXldID0gQXJyYXkuZnJvbShjZWxsUGFsbGV0c1trZXldKS5zb3J0KFxuICAgICAgICAgIChhLCBiKSA9PiBOdW1iZXIoYSkgLSBOdW1iZXIoYilcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBwYWxsZXRPYmogPSB7fTtcbiAgICAgIE9iamVjdC5rZXlzKHBhbGxldEJpbnMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICBwYWxsZXRPYmpba2V5XSA9IEFycmF5LmZyb20ocGFsbGV0Qmluc1trZXldKS5zb3J0KFxuICAgICAgICAgIChhLCBiKSA9PiBOdW1iZXIoYSkgLSBOdW1iZXIoYilcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuXG4gICAgICBzZXRNYXBDZWxsUGFsbGV0cyhjZWxsT2JqKTtcbiAgICAgIHNldE1hcFBhbGxldEJpbnMocGFsbGV0T2JqKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byBsb2FkIG1hcCBpbnZlbnRvcnlcIiwgZXJyb3IpO1xuICAgICAgc2V0TWFwRXJyb3IoXCJGYWlsZWQgdG8gbG9hZCBtYXAgaW52ZW50b3J5LlwiKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0TWFwTG9hZGluZyhmYWxzZSk7XG4gICAgfVxuICB9LCBbXSk7XG5cbiAgY29uc3QgZ2V0UmVnaW9uRGltZW5zaW9ucyA9IHVzZUNhbGxiYWNrKFxuICAgIChyZWdpb25JZCkgPT4ge1xuICAgICAgY29uc3QgZW50cnkgPSBzZWN0aW9uTWFwPy5bcmVnaW9uSWRdO1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZW50cnkpICYmIGVudHJ5Lmxlbmd0aCA+PSAyKSB7XG4gICAgICAgIGNvbnN0IGNvbHMgPSBwYXJzZUludChlbnRyeVswXSwgMTApO1xuICAgICAgICBjb25zdCByb3dzID0gcGFyc2VJbnQoZW50cnlbMV0sIDEwKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBjb2xzOiBOdW1iZXIuaXNGaW5pdGUoY29scykgPyBjb2xzIDogMCxcbiAgICAgICAgICByb3dzOiBOdW1iZXIuaXNGaW5pdGUocm93cykgPyByb3dzIDogMCxcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB7IGNvbHM6IDAsIHJvd3M6IDAgfTtcbiAgICB9LFxuICAgIFtzZWN0aW9uTWFwXVxuICApO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3Qgd2FzT3BlbiA9IGxhc3RTaG93UmVmLmN1cnJlbnQ7XG4gICAgbGFzdFNob3dSZWYuY3VycmVudCA9IHNob3c7XG4gICAgaWYgKCFzaG93IHx8IHdhc09wZW4pIHJldHVybjtcblxuICAgIGxvYWREaXJlY3RvcnkoKTtcbiAgICBzZXRNYXBFcnJvcihcIlwiKTtcbiAgICBjb25zdCB7XG4gICAgICByZWdpb24sXG4gICAgICBzZWN0aW9uTGV0dGVyLFxuICAgICAgc2VjdGlvbk51bWJlcixcbiAgICAgIHBhbGxldCxcbiAgICAgIGJpbixcbiAgICB9ID0gaW5pdGlhbFNlbGVjdGlvbiB8fCB7fTtcblxuICAgIHNldE1hcFJlZ2lvbihyZWdpb24gfHwgXCJcIik7XG4gICAgc2V0TWFwUm93KHNlY3Rpb25MZXR0ZXIgfHwgXCJcIik7XG4gICAgc2V0TWFwQ29sKHNlY3Rpb25OdW1iZXIgPyBTdHJpbmcoc2VjdGlvbk51bWJlcikgOiBcIlwiKTtcbiAgICBzZXRNYXBQYWxsZXQocGFsbGV0ID8gU3RyaW5nKHBhbGxldCkgOiBcIlwiKTtcbiAgICBzZXRNYXBCaW4oYmluID8gU3RyaW5nKGJpbikgOiBcIlwiKTtcbiAgICBzZXRNYXBTdGVwKHJlZ2lvbiA/IFwiZ3JpZFwiIDogXCJyZWdpb25zXCIpO1xuICAgIGlmIChyZWdpb24pIGxvYWRSZWdpb25JbnZlbnRvcnkocmVnaW9uKTtcbiAgfSwgW3Nob3csIGluaXRpYWxTZWxlY3Rpb24sIGxvYWREaXJlY3RvcnksIGxvYWRSZWdpb25JbnZlbnRvcnldKTtcblxuICBjb25zdCBoYW5kbGVTZWxlY3RSZWdpb24gPSAocmVnaW9uSWQpID0+IHtcbiAgICBjb25zdCBzZWxlY3Rpb24gPSB7XG4gICAgICByZWdpb246IHJlZ2lvbklkLFxuICAgICAgc2VjdGlvbkxldHRlcjogXCJcIixcbiAgICAgIHNlY3Rpb25OdW1iZXI6IFwiXCIsXG4gICAgICBwYWxsZXQ6IFwiXCIsXG4gICAgICBiaW46IFwiXCIsXG4gICAgfTtcbiAgICBzZXRNYXBSZWdpb24ocmVnaW9uSWQpO1xuICAgIHNldE1hcFJvdyhcIlwiKTtcbiAgICBzZXRNYXBDb2woXCJcIik7XG4gICAgc2V0TWFwUGFsbGV0KFwiXCIpO1xuICAgIHNldE1hcEJpbihcIlwiKTtcbiAgICBzZXRNYXBTdGVwKFwiZ3JpZFwiKTtcbiAgICBub3RpZnlTZWxlY3Rpb25DaGFuZ2Uoc2VsZWN0aW9uKTtcbiAgICBsb2FkUmVnaW9uSW52ZW50b3J5KHJlZ2lvbklkKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVTZWxlY3RDZWxsID0gKHJvd0xldHRlciwgY29sTnVtYmVyKSA9PiB7XG4gICAgY29uc3QgY29sVmFsdWUgPSBTdHJpbmcoY29sTnVtYmVyKTtcbiAgICBjb25zdCBzZWxlY3Rpb24gPSB7XG4gICAgICByZWdpb246IG1hcFJlZ2lvbixcbiAgICAgIHNlY3Rpb25MZXR0ZXI6IHJvd0xldHRlcixcbiAgICAgIHNlY3Rpb25OdW1iZXI6IGNvbFZhbHVlLFxuICAgICAgcGFsbGV0OiBcIlwiLFxuICAgICAgYmluOiBcIlwiLFxuICAgIH07XG4gICAgc2V0TWFwUm93KHJvd0xldHRlcik7XG4gICAgc2V0TWFwQ29sKGNvbFZhbHVlKTtcbiAgICBzZXRNYXBQYWxsZXQoXCJcIik7XG4gICAgc2V0TWFwQmluKFwiXCIpO1xuICAgIHNldE1hcFN0ZXAoXCJwYWxsZXRzXCIpO1xuICAgIG5vdGlmeVNlbGVjdGlvbkNoYW5nZShzZWxlY3Rpb24pO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVNlbGVjdFBhbGxldCA9IChwYWxsZXRJZCkgPT4ge1xuICAgIGNvbnN0IHBhbGxldFZhbHVlID0gU3RyaW5nKHBhbGxldElkKTtcbiAgICBjb25zdCBzZWxlY3Rpb24gPSB7XG4gICAgICByZWdpb246IG1hcFJlZ2lvbixcbiAgICAgIHNlY3Rpb25MZXR0ZXI6IG1hcFJvdyxcbiAgICAgIHNlY3Rpb25OdW1iZXI6IG1hcENvbCxcbiAgICAgIHBhbGxldDogcGFsbGV0VmFsdWUsXG4gICAgICBiaW46IFwiXCIsXG4gICAgfTtcbiAgICBzZXRNYXBQYWxsZXQocGFsbGV0VmFsdWUpO1xuICAgIHNldE1hcEJpbihcIlwiKTtcbiAgICBzZXRNYXBTdGVwKFwiYmluc1wiKTtcbiAgICBub3RpZnlTZWxlY3Rpb25DaGFuZ2Uoc2VsZWN0aW9uKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVTZWxlY3RCaW4gPSAoYmluSWQpID0+IHtcbiAgICBjb25zdCBiaW5WYWx1ZSA9IFN0cmluZyhiaW5JZCk7XG4gICAgY29uc3Qgc2VsZWN0aW9uID0ge1xuICAgICAgcmVnaW9uOiBtYXBSZWdpb24sXG4gICAgICBzZWN0aW9uTGV0dGVyOiBtYXBSb3csXG4gICAgICBzZWN0aW9uTnVtYmVyOiBtYXBDb2wsXG4gICAgICBwYWxsZXQ6IG1hcFBhbGxldCxcbiAgICAgIGJpbjogYmluVmFsdWUsXG4gICAgfTtcbiAgICBzZXRNYXBCaW4oYmluVmFsdWUpO1xuICAgIG5vdGlmeVNlbGVjdGlvbkNoYW5nZShzZWxlY3Rpb24pO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUJhY2sgPSAoKSA9PiB7XG4gICAgaWYgKG1hcFN0ZXAgPT09IFwiYmluc1wiKSBzZXRNYXBTdGVwKFwicGFsbGV0c1wiKTtcbiAgICBlbHNlIGlmIChtYXBTdGVwID09PSBcInBhbGxldHNcIikgc2V0TWFwU3RlcChcImdyaWRcIik7XG4gICAgZWxzZSBpZiAobWFwU3RlcCA9PT0gXCJncmlkXCIpIHNldE1hcFN0ZXAoXCJyZWdpb25zXCIpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVZpZXcgPSAoKSA9PiB7XG4gICAgaWYgKHR5cGVvZiBvblZpZXcgIT09IFwiZnVuY3Rpb25cIikgcmV0dXJuO1xuICAgIG9uVmlldyh7XG4gICAgICByZWdpb246IG1hcFJlZ2lvbixcbiAgICAgIHNlY3Rpb25MZXR0ZXI6IG1hcFJvdyxcbiAgICAgIHNlY3Rpb25OdW1iZXI6IG1hcENvbCxcbiAgICAgIHBhbGxldDogbWFwUGFsbGV0LFxuICAgICAgYmluOiBtYXBCaW4sXG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8TW9kYWwgc2hvdz17c2hvd30gb25IaWRlPXtvbkhpZGV9IGNlbnRlcmVkIHNpemU9XCJsZ1wiPlxuICAgICAgPE1vZGFsLkhlYWRlciBjbG9zZUJ1dHRvbj5cbiAgICAgICAgPE1vZGFsLlRpdGxlPldhcmVob3VzZSBNYXA8L01vZGFsLlRpdGxlPlxuICAgICAgPC9Nb2RhbC5IZWFkZXI+XG4gICAgICA8TW9kYWwuQm9keT5cbiAgICAgICAge21hcExvYWRpbmcgJiYgKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubWFwTG9hZGluZ30+XG4gICAgICAgICAgICA8U3Bpbm5lciBhbmltYXRpb249XCJib3JkZXJcIiAvPlxuICAgICAgICAgICAgPHNwYW4+TG9hZGluZyBtYXAgZGF0YS4uLjwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgICAge21hcEVycm9yICYmIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubWFwRXJyb3J9PnttYXBFcnJvcn08L2Rpdj59XG5cbiAgICAgICAgeyFtYXBMb2FkaW5nICYmIG1hcFN0ZXAgPT09IFwicmVnaW9uc1wiICYmIChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLm1hcFN0YWdlfT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubWFwSGludH0+U2VsZWN0IGEgcmVnaW9uPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLm1hcENhbnZhc30+XG4gICAgICAgICAgICAgIHtSRUdJT05fT1JERVIubWFwKChyZWdpb25JZCkgPT4gKFxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIGtleT17cmVnaW9uSWR9XG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YCR7c3R5bGVzLnJlZ2lvbkJsb2NrfSAke3N0eWxlc1tgcmVnaW9uJHtyZWdpb25JZH1gXX1gfVxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlU2VsZWN0UmVnaW9uKHJlZ2lvbklkKX1cbiAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtcbiAgICAgICAgICAgICAgICAgICAgQXJyYXkuaXNBcnJheShyZWdpb25PcHRpb25zKSAmJlxuICAgICAgICAgICAgICAgICAgICByZWdpb25PcHRpb25zLmxlbmd0aCA+IDAgJiZcbiAgICAgICAgICAgICAgICAgICAgIXJlZ2lvbk9wdGlvbnMuaW5jbHVkZXMocmVnaW9uSWQpXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAge3JlZ2lvbklkfVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuXG4gICAgICAgIHshbWFwTG9hZGluZyAmJiBtYXBTdGVwID09PSBcImdyaWRcIiAmJiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5tYXBTdGFnZX0+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLm1hcEhpbnR9PlxuICAgICAgICAgICAgICBSZWdpb24ge21hcFJlZ2lvbn06IGNob29zZSBhIHJvdyBhbmQgY29sdW1uXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIHsoKCkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBkaW1zID0gZ2V0UmVnaW9uRGltZW5zaW9ucyhtYXBSZWdpb24pO1xuICAgICAgICAgICAgICBjb25zdCByb3dzID0gTEVUVEVSUy5zbGljZSgwLCBkaW1zLnJvd3MgfHwgMCk7XG4gICAgICAgICAgICAgIGNvbnN0IGNvbHMgPSBOVU1CRVJTLnNsaWNlKDAsIGRpbXMuY29scyB8fCAwKTtcbiAgICAgICAgICAgICAgaWYgKCFyb3dzLmxlbmd0aCB8fCAhY29scy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5tYXBFbXB0eX0+XG4gICAgICAgICAgICAgICAgICAgIE5vIGdyaWQgZGF0YSBmb3IgdGhpcyByZWdpb24uXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5ncmlkV3JhcHBlcn0+XG4gICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17c3R5bGVzLmdyaWR9XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IFwiLS1ncmlkLWNvbHNcIjogY29scy5sZW5ndGggfX1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAge3Jvd3MubWFwKChyb3cpID0+XG4gICAgICAgICAgICAgICAgICAgICAgY29scy5tYXAoKGNvbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2VsbEtleSA9IGAke3Jvd30tJHtjb2x9YDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGhhc1BhbGxldHMgPSBCb29sZWFuKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBtYXBDZWxsUGFsbGV0c1tjZWxsS2V5XT8ubGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17Y2VsbEtleX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2Ake3N0eWxlcy5ncmlkQ2VsbH0gJHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc1BhbGxldHMgPyBcIlwiIDogc3R5bGVzLmdyaWRDZWxsRGlzYWJsZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzUGFsbGV0cyAmJiBoYW5kbGVTZWxlY3RDZWxsKHJvdywgY29sKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17IWhhc1BhbGxldHN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtyb3d9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Y29sfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pKCl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9XG5cbiAgICAgICAgeyFtYXBMb2FkaW5nICYmIG1hcFN0ZXAgPT09IFwicGFsbGV0c1wiICYmIChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLm1hcFN0YWdlfT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubWFwSGludH0+XG4gICAgICAgICAgICAgIFJlZ2lvbiB7bWFwUmVnaW9ufSAtIFNlY3Rpb24ge21hcFJvd31cbiAgICAgICAgICAgICAge21hcENvbH06IHNlbGVjdCBhIHBhbGxldFxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnBhbGxldEdyaWR9PlxuICAgICAgICAgICAgICB7KG1hcENlbGxQYWxsZXRzW2Ake21hcFJvd30tJHttYXBDb2x9YF0gfHwgW10pLm1hcCgocGFsbGV0KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcGFsbGV0S2V5ID0gYCR7bWFwUm93fS0ke21hcENvbH0tUCR7cGFsbGV0fWA7XG4gICAgICAgICAgICAgICAgY29uc3QgYmlucyA9IG1hcFBhbGxldEJpbnNbcGFsbGV0S2V5XSB8fCBbXTtcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBrZXk9e3BhbGxldH1cbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17c3R5bGVzLnBhbGxldEJ1dHRvbn1cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoYmlucy5sZW5ndGggPT09IDAgJiYgdHlwZW9mIG9uVmlldyA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3Rpb24gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2lvbjogbWFwUmVnaW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBzZWN0aW9uTGV0dGVyOiBtYXBSb3csXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNlY3Rpb25OdW1iZXI6IG1hcENvbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcGFsbGV0OiBTdHJpbmcocGFsbGV0KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYmluOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vdGlmeVNlbGVjdGlvbkNoYW5nZShzZWxlY3Rpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgb25WaWV3KHNlbGVjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZVNlbGVjdFBhbGxldChwYWxsZXQpO1xuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICBQYWxsZXQge3BhbGxldH1cbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICB7IShtYXBDZWxsUGFsbGV0c1tgJHttYXBSb3d9LSR7bWFwQ29sfWBdIHx8IFtdKS5sZW5ndGggJiYgKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubWFwRW1wdHl9PlxuICAgICAgICAgICAgICAgICAgTm8gcGFsbGV0cyBhdmFpbGFibGUgaGVyZS5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuXG4gICAgICAgIHshbWFwTG9hZGluZyAmJiBtYXBTdGVwID09PSBcImJpbnNcIiAmJiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5tYXBTdGFnZX0+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLm1hcEhpbnR9PlxuICAgICAgICAgICAgICBSZWdpb24ge21hcFJlZ2lvbn0gLSBTZWN0aW9uIHttYXBSb3d9XG4gICAgICAgICAgICAgIHttYXBDb2x9IC0gUGFsbGV0IHttYXBQYWxsZXR9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMucGFsbGV0R3JpZH0+XG4gICAgICAgICAgICAgIHsobWFwUGFsbGV0Qmluc1tgJHttYXBSb3d9LSR7bWFwQ29sfS1QJHttYXBQYWxsZXR9YF0gfHwgW10pLm1hcChcbiAgICAgICAgICAgICAgICAoYmluKSA9PiAoXG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGtleT17YmlufVxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgJHtzdHlsZXMucGFsbGV0QnV0dG9ufSAke3N0eWxlcy5iaW5CdXR0b259YH1cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlU2VsZWN0QmluKGJpbil9XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIEJpbiB7YmlufVxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICB7IShtYXBQYWxsZXRCaW5zW2Ake21hcFJvd30tJHttYXBDb2x9LVAke21hcFBhbGxldH1gXSB8fCBbXSlcbiAgICAgICAgICAgICAgICAubGVuZ3RoICYmIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLm1hcEVtcHR5fT5cbiAgICAgICAgICAgICAgICAgIE5vIGJpbnMgYXZhaWxhYmxlIG9uIHRoaXMgcGFsbGV0LlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9XG4gICAgICA8L01vZGFsLkJvZHk+XG4gICAgICA8TW9kYWwuRm9vdGVyIGNsYXNzTmFtZT17c3R5bGVzLm1hcEZvb3Rlcn0+XG4gICAgICAgIDxCdXR0b25cbiAgICAgICAgICB2YXJpYW50PVwib3V0bGluZS1zZWNvbmRhcnlcIlxuICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZUJhY2t9XG4gICAgICAgICAgZGlzYWJsZWQ9e21hcFN0ZXAgPT09IFwicmVnaW9uc1wifVxuICAgICAgICA+XG4gICAgICAgICAgQmFja1xuICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgPEJ1dHRvbiB2YXJpYW50PVwib3V0bGluZS1wcmltYXJ5XCIgb25DbGljaz17aGFuZGxlVmlld30+XG4gICAgICAgICAgVmlld1xuICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgPEJ1dHRvbiB2YXJpYW50PVwic2Vjb25kYXJ5XCIgb25DbGljaz17b25IaWRlfT5cbiAgICAgICAgICBDbG9zZVxuICAgICAgICA8L0J1dHRvbj5cbiAgICAgIDwvTW9kYWwuRm9vdGVyPlxuICAgIDwvTW9kYWw+XG4gICk7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9