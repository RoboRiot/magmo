webpackHotUpdate_N_E("pages/NewSearch/item/[id]",{

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vY29tcG9uZW50cy9XYXJlaG91c2VNYXBNb2RhbC5qcyJdLCJuYW1lcyI6WyJSRUdJT05fT1JERVIiLCJMRVRURVJTIiwiQXJyYXkiLCJmcm9tIiwibGVuZ3RoIiwiXyIsImkiLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJOVU1CRVJTIiwiV2FyZWhvdXNlTWFwTW9kYWwiLCJzaG93Iiwib25IaWRlIiwib25WaWV3Iiwib25TZWxlY3Rpb25DaGFuZ2UiLCJpbml0aWFsU2VsZWN0aW9uIiwidXNlU3RhdGUiLCJyZWdpb25PcHRpb25zIiwic2V0UmVnaW9uT3B0aW9ucyIsInNlY3Rpb25NYXAiLCJzZXRTZWN0aW9uTWFwIiwibWFwU3RlcCIsInNldE1hcFN0ZXAiLCJtYXBSZWdpb24iLCJzZXRNYXBSZWdpb24iLCJtYXBSb3ciLCJzZXRNYXBSb3ciLCJtYXBDb2wiLCJzZXRNYXBDb2wiLCJtYXBQYWxsZXQiLCJzZXRNYXBQYWxsZXQiLCJtYXBCaW4iLCJzZXRNYXBCaW4iLCJtYXBDZWxsUGFsbGV0cyIsInNldE1hcENlbGxQYWxsZXRzIiwibWFwUGFsbGV0QmlucyIsInNldE1hcFBhbGxldEJpbnMiLCJtYXBMb2FkaW5nIiwic2V0TWFwTG9hZGluZyIsIm1hcEVycm9yIiwic2V0TWFwRXJyb3IiLCJkaXJlY3RvcnlMb2FkZWQiLCJzZXREaXJlY3RvcnlMb2FkZWQiLCJsYXN0U2hvd1JlZiIsInVzZVJlZiIsIm5vdGlmeVNlbGVjdGlvbkNoYW5nZSIsInVzZUNhbGxiYWNrIiwic2VsZWN0aW9uIiwibG9hZERpcmVjdG9yeSIsImZpcmViYXNlIiwiZmlyZXN0b3JlIiwiY29sbGVjdGlvbiIsImRvYyIsImdldCIsImRhdGEiLCJSZWdpb24iLCJTZWN0aW9uIiwiY29uc29sZSIsImVycm9yIiwibG9hZFJlZ2lvbkludmVudG9yeSIsInJlZ2lvbklkIiwid2hlcmUiLCJzbmFwIiwiY2VsbFBhbGxldHMiLCJwYWxsZXRCaW5zIiwiZm9yRWFjaCIsImxvYyIsIm5ld0xvY2FsQ3VycmVudCIsInJvdyIsInNlY3Rpb24iLCJsZXR0ZXIiLCJjb2wiLCJudW1iZXIiLCJ0cmltbWVkIiwidHJpbSIsInNsaWNlIiwidW5kZWZpbmVkIiwicGFsbGV0IiwiYmluIiwiY2VsbEtleSIsIlNldCIsImFkZCIsInBhbGxldEtleSIsImNlbGxPYmoiLCJPYmplY3QiLCJrZXlzIiwia2V5Iiwic29ydCIsImEiLCJiIiwiTnVtYmVyIiwicGFsbGV0T2JqIiwiZ2V0UmVnaW9uRGltZW5zaW9ucyIsImVudHJ5IiwiaXNBcnJheSIsImNvbHMiLCJwYXJzZUludCIsInJvd3MiLCJpc0Zpbml0ZSIsInVzZUVmZmVjdCIsIndhc09wZW4iLCJjdXJyZW50IiwicmVnaW9uIiwic2VjdGlvbkxldHRlciIsInNlY3Rpb25OdW1iZXIiLCJoYW5kbGVTZWxlY3RSZWdpb24iLCJoYW5kbGVTZWxlY3RDZWxsIiwicm93TGV0dGVyIiwiY29sTnVtYmVyIiwiY29sVmFsdWUiLCJoYW5kbGVTZWxlY3RQYWxsZXQiLCJwYWxsZXRJZCIsInBhbGxldFZhbHVlIiwiaGFuZGxlU2VsZWN0QmluIiwiYmluSWQiLCJiaW5WYWx1ZSIsImhhbmRsZUJhY2siLCJoYW5kbGVWaWV3Iiwic3R5bGVzIiwibWFwU3RhZ2UiLCJtYXBIaW50IiwibWFwQ2FudmFzIiwibWFwIiwicmVnaW9uQmxvY2siLCJpbmNsdWRlcyIsImRpbXMiLCJtYXBFbXB0eSIsImdyaWRXcmFwcGVyIiwiZ3JpZCIsImhhc1BhbGxldHMiLCJCb29sZWFuIiwiZ3JpZENlbGwiLCJncmlkQ2VsbERpc2FibGVkIiwicGFsbGV0R3JpZCIsImJpbnMiLCJwYWxsZXRCdXR0b24iLCJiaW5CdXR0b24iLCJtYXBGb290ZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLElBQU1BLFlBQVksR0FBRyxDQUFDLEdBQUQsRUFBTSxHQUFOLEVBQVcsR0FBWCxFQUFnQixH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O0FBR0UsWUFBUSxFQUFFL0YsT0FBTyxLQUFLLFNBSHhCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFERixFQVFFLE1BQUMsc0RBQUQ7QUFBUSxXQUFPLEVBQUMsaUJBQWhCO0FBQWtDLFdBQU8sRUFBRWdHLFVBQTNDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFSRixFQVdFLE1BQUMsc0RBQUQ7QUFBUSxXQUFPLEVBQUMsV0FBaEI7QUFBNEIsV0FBTyxFQUFFekcsTUFBckM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQVhGLENBcEtGLENBREY7QUFzTEQ7O0dBL1p1QkYsaUI7O0tBQUFBLGlCIiwiZmlsZSI6InN0YXRpYy93ZWJwYWNrL3BhZ2VzL05ld1NlYXJjaC9pdGVtL1tpZF0uZWE0NjU0N2I5OWM5OTI4ZGQzNDMuaG90LXVwZGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBNb2RhbCwgQnV0dG9uLCBTcGlubmVyIH0gZnJvbSBcInJlYWN0LWJvb3RzdHJhcFwiO1xuaW1wb3J0IGZpcmViYXNlIGZyb20gXCIuLi9jb250ZXh0L0ZpcmViYXNlXCI7XG5pbXBvcnQgc3R5bGVzIGZyb20gXCIuL1dhcmVob3VzZU1hcE1vZGFsLm1vZHVsZS5jc3NcIjtcblxuY29uc3QgUkVHSU9OX09SREVSID0gW1wiRVwiLCBcIkZcIiwgXCJHXCIsIFwiQVwiLCBcIkRcIiwgXCJDXCIsIFwiQlwiXTtcbmNvbnN0IExFVFRFUlMgPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiAyNiB9LCAoXywgaSkgPT5cbiAgU3RyaW5nLmZyb21DaGFyQ29kZSg2NSArIGkpXG4pO1xuY29uc3QgTlVNQkVSUyA9IEFycmF5LmZyb20oeyBsZW5ndGg6IDUwIH0sIChfLCBpKSA9PiBpICsgMSk7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFdhcmVob3VzZU1hcE1vZGFsKHtcbiAgc2hvdyA9IGZhbHNlLFxuICBvbkhpZGUgPSAoKSA9PiB7fSxcbiAgb25WaWV3LFxuICBvblNlbGVjdGlvbkNoYW5nZSxcbiAgaW5pdGlhbFNlbGVjdGlvbiA9IHt9LFxufSkge1xuICBjb25zdCBbcmVnaW9uT3B0aW9ucywgc2V0UmVnaW9uT3B0aW9uc10gPSB1c2VTdGF0ZShbXSk7XG4gIGNvbnN0IFtzZWN0aW9uTWFwLCBzZXRTZWN0aW9uTWFwXSA9IHVzZVN0YXRlKHt9KTtcbiAgY29uc3QgW21hcFN0ZXAsIHNldE1hcFN0ZXBdID0gdXNlU3RhdGUoXCJyZWdpb25zXCIpO1xuICBjb25zdCBbbWFwUmVnaW9uLCBzZXRNYXBSZWdpb25dID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFttYXBSb3csIHNldE1hcFJvd10gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW21hcENvbCwgc2V0TWFwQ29sXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbbWFwUGFsbGV0LCBzZXRNYXBQYWxsZXRdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFttYXBCaW4sIHNldE1hcEJpbl0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW21hcENlbGxQYWxsZXRzLCBzZXRNYXBDZWxsUGFsbGV0c10gPSB1c2VTdGF0ZSh7fSk7XG4gIGNvbnN0IFttYXBQYWxsZXRCaW5zLCBzZXRNYXBQYWxsZXRCaW5zXSA9IHVzZVN0YXRlKHt9KTtcbiAgY29uc3QgW21hcExvYWRpbmcsIHNldE1hcExvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbbWFwRXJyb3IsIHNldE1hcEVycm9yXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbZGlyZWN0b3J5TG9hZGVkLCBzZXREaXJlY3RvcnlMb2FkZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBsYXN0U2hvd1JlZiA9IHVzZVJlZihmYWxzZSk7XG5cbiAgY29uc3Qgbm90aWZ5U2VsZWN0aW9uQ2hhbmdlID0gdXNlQ2FsbGJhY2soXG4gICAgKHNlbGVjdGlvbikgPT4ge1xuICAgICAgaWYgKHR5cGVvZiBvblNlbGVjdGlvbkNoYW5nZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIG9uU2VsZWN0aW9uQ2hhbmdlKHNlbGVjdGlvbik7XG4gICAgICB9XG4gICAgfSxcbiAgICBbb25TZWxlY3Rpb25DaGFuZ2VdXG4gICk7XG5cbiAgY29uc3QgbG9hZERpcmVjdG9yeSA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcbiAgICBpZiAoZGlyZWN0b3J5TG9hZGVkKSByZXR1cm47XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGRvYyA9IGF3YWl0IGZpcmViYXNlXG4gICAgICAgIC5maXJlc3RvcmUoKVxuICAgICAgICAuY29sbGVjdGlvbihcIldhcmVob3VzZVwiKVxuICAgICAgICAuZG9jKFwiZGlyZWN0b3J5XCIpXG4gICAgICAgIC5nZXQoKTtcbiAgICAgIGNvbnN0IGRhdGEgPSBkb2MuZGF0YSgpIHx8IHt9O1xuICAgICAgc2V0UmVnaW9uT3B0aW9ucyhkYXRhLlJlZ2lvbiB8fCBbXSk7XG4gICAgICBzZXRTZWN0aW9uTWFwKGRhdGEuU2VjdGlvbiB8fCB7fSk7XG4gICAgICBzZXREaXJlY3RvcnlMb2FkZWQodHJ1ZSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gbG9hZCBtYXAgZGlyZWN0b3J5XCIsIGVycm9yKTtcbiAgICAgIHNldE1hcEVycm9yKFwiRmFpbGVkIHRvIGxvYWQgd2FyZWhvdXNlIGRpcmVjdG9yeS5cIik7XG4gICAgfVxuICB9LCBbZGlyZWN0b3J5TG9hZGVkXSk7XG5cbiAgY29uc3QgbG9hZFJlZ2lvbkludmVudG9yeSA9IHVzZUNhbGxiYWNrKGFzeW5jIChyZWdpb25JZCkgPT4ge1xuICAgIGlmICghcmVnaW9uSWQpIHJldHVybjtcbiAgICBzZXRNYXBMb2FkaW5nKHRydWUpO1xuICAgIHNldE1hcEVycm9yKFwiXCIpO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBzbmFwID0gYXdhaXQgZmlyZWJhc2VcbiAgICAgICAgLmZpcmVzdG9yZSgpXG4gICAgICAgIC5jb2xsZWN0aW9uKFwiVGVzdFwiKVxuICAgICAgICAud2hlcmUoXCJuZXdMb2NhbEN1cnJlbnQucmVnaW9uXCIsIFwiPT1cIiwgcmVnaW9uSWQpXG4gICAgICAgIC5nZXQoKTtcblxuICAgICAgY29uc3QgY2VsbFBhbGxldHMgPSB7fTtcbiAgICAgIGNvbnN0IHBhbGxldEJpbnMgPSB7fTtcbiAgICAgIHNuYXAuZm9yRWFjaCgoZG9jKSA9PiB7XG4gICAgICAgIGNvbnN0IGxvYyA9IGRvYy5kYXRhKCk/Lm5ld0xvY2FsQ3VycmVudCB8fCB7fTtcbiAgICAgICAgbGV0IHJvdyA9IGxvYy5zZWN0aW9uPy5sZXR0ZXI7XG4gICAgICAgIGxldCBjb2wgPSBsb2Muc2VjdGlvbj8ubnVtYmVyO1xuICAgICAgICBpZiAoKCFyb3cgfHwgIWNvbCkgJiYgdHlwZW9mIGxvYy5zZWN0aW9uID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgY29uc3QgdHJpbW1lZCA9IGxvYy5zZWN0aW9uLnRyaW0oKTtcbiAgICAgICAgICByb3cgPSB0cmltbWVkLnNsaWNlKDAsIDEpO1xuICAgICAgICAgIGNvbCA9IHRyaW1tZWQuc2xpY2UoMSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbCAhPT0gdW5kZWZpbmVkICYmIGNvbCAhPT0gbnVsbCkge1xuICAgICAgICAgIGNvbCA9IFN0cmluZyhjb2wpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBhbGxldCA9IGxvYy5wYWxsZXQ7XG4gICAgICAgIGNvbnN0IGJpbiA9IGxvYy5iaW47XG4gICAgICAgIGlmICghcm93IHx8ICFjb2wpIHJldHVybjtcbiAgICAgICAgY29uc3QgY2VsbEtleSA9IGAke3Jvd30tJHtjb2x9YDtcbiAgICAgICAgaWYgKHBhbGxldCAhPT0gdW5kZWZpbmVkICYmIHBhbGxldCAhPT0gbnVsbCAmJiBgJHtwYWxsZXR9YCAhPT0gXCJcIikge1xuICAgICAgICAgIGlmICghY2VsbFBhbGxldHNbY2VsbEtleV0pIGNlbGxQYWxsZXRzW2NlbGxLZXldID0gbmV3IFNldCgpO1xuICAgICAgICAgIGNlbGxQYWxsZXRzW2NlbGxLZXldLmFkZChTdHJpbmcocGFsbGV0KSk7XG4gICAgICAgICAgaWYgKGJpbiAhPT0gdW5kZWZpbmVkICYmIGJpbiAhPT0gbnVsbCAmJiBgJHtiaW59YCAhPT0gXCJcIikge1xuICAgICAgICAgICAgY29uc3QgcGFsbGV0S2V5ID0gYCR7Y2VsbEtleX0tUCR7cGFsbGV0fWA7XG4gICAgICAgICAgICBpZiAoIXBhbGxldEJpbnNbcGFsbGV0S2V5XSkgcGFsbGV0Qmluc1twYWxsZXRLZXldID0gbmV3IFNldCgpO1xuICAgICAgICAgICAgcGFsbGV0Qmluc1twYWxsZXRLZXldLmFkZChTdHJpbmcoYmluKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgY29uc3QgY2VsbE9iaiA9IHt9O1xuICAgICAgT2JqZWN0LmtleXMoY2VsbFBhbGxldHMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICBjZWxsT2JqW2tleV0gPSBBcnJheS5mcm9tKGNlbGxQYWxsZXRzW2tleV0pLnNvcnQoXG4gICAgICAgICAgKGEsIGIpID0+IE51bWJlcihhKSAtIE51bWJlcihiKVxuICAgICAgICApO1xuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IHBhbGxldE9iaiA9IHt9O1xuICAgICAgT2JqZWN0LmtleXMocGFsbGV0QmlucykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgIHBhbGxldE9ialtrZXldID0gQXJyYXkuZnJvbShwYWxsZXRCaW5zW2tleV0pLnNvcnQoXG4gICAgICAgICAgKGEsIGIpID0+IE51bWJlcihhKSAtIE51bWJlcihiKVxuICAgICAgICApO1xuICAgICAgfSk7XG5cbiAgICAgIHNldE1hcENlbGxQYWxsZXRzKGNlbGxPYmopO1xuICAgICAgc2V0TWFwUGFsbGV0QmlucyhwYWxsZXRPYmopO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGxvYWQgbWFwIGludmVudG9yeVwiLCBlcnJvcik7XG4gICAgICBzZXRNYXBFcnJvcihcIkZhaWxlZCB0byBsb2FkIG1hcCBpbnZlbnRvcnkuXCIpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRNYXBMb2FkaW5nKGZhbHNlKTtcbiAgICB9XG4gIH0sIFtdKTtcblxuICBjb25zdCBnZXRSZWdpb25EaW1lbnNpb25zID0gdXNlQ2FsbGJhY2soXG4gICAgKHJlZ2lvbklkKSA9PiB7XG4gICAgICBjb25zdCBlbnRyeSA9IHNlY3Rpb25NYXA/LltyZWdpb25JZF07XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShlbnRyeSkgJiYgZW50cnkubGVuZ3RoID49IDIpIHtcbiAgICAgICAgY29uc3QgY29scyA9IHBhcnNlSW50KGVudHJ5WzBdLCAxMCk7XG4gICAgICAgIGNvbnN0IHJvd3MgPSBwYXJzZUludChlbnRyeVsxXSwgMTApO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGNvbHM6IE51bWJlci5pc0Zpbml0ZShjb2xzKSA/IGNvbHMgOiAwLFxuICAgICAgICAgIHJvd3M6IE51bWJlci5pc0Zpbml0ZShyb3dzKSA/IHJvd3MgOiAwLFxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHsgY29sczogMCwgcm93czogMCB9O1xuICAgIH0sXG4gICAgW3NlY3Rpb25NYXBdXG4gICk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCB3YXNPcGVuID0gbGFzdFNob3dSZWYuY3VycmVudDtcbiAgICBsYXN0U2hvd1JlZi5jdXJyZW50ID0gc2hvdztcbiAgICBpZiAoIXNob3cgfHwgd2FzT3BlbikgcmV0dXJuO1xuXG4gICAgbG9hZERpcmVjdG9yeSgpO1xuICAgIHNldE1hcEVycm9yKFwiXCIpO1xuICAgIGNvbnN0IHtcbiAgICAgIHJlZ2lvbixcbiAgICAgIHNlY3Rpb25MZXR0ZXIsXG4gICAgICBzZWN0aW9uTnVtYmVyLFxuICAgICAgcGFsbGV0LFxuICAgICAgYmluLFxuICAgIH0gPSBpbml0aWFsU2VsZWN0aW9uIHx8IHt9O1xuXG4gICAgc2V0TWFwUmVnaW9uKHJlZ2lvbiB8fCBcIlwiKTtcbiAgICBzZXRNYXBSb3coc2VjdGlvbkxldHRlciB8fCBcIlwiKTtcbiAgICBzZXRNYXBDb2woc2VjdGlvbk51bWJlciA/IFN0cmluZyhzZWN0aW9uTnVtYmVyKSA6IFwiXCIpO1xuICAgIHNldE1hcFBhbGxldChwYWxsZXQgPyBTdHJpbmcocGFsbGV0KSA6IFwiXCIpO1xuICAgIHNldE1hcEJpbihiaW4gPyBTdHJpbmcoYmluKSA6IFwiXCIpO1xuICAgIHNldE1hcFN0ZXAocmVnaW9uID8gXCJncmlkXCIgOiBcInJlZ2lvbnNcIik7XG4gICAgaWYgKHJlZ2lvbikgbG9hZFJlZ2lvbkludmVudG9yeShyZWdpb24pO1xuICB9LCBbc2hvdywgaW5pdGlhbFNlbGVjdGlvbiwgbG9hZERpcmVjdG9yeSwgbG9hZFJlZ2lvbkludmVudG9yeV0pO1xuXG4gIGNvbnN0IGhhbmRsZVNlbGVjdFJlZ2lvbiA9IChyZWdpb25JZCkgPT4ge1xuICAgIGNvbnN0IHNlbGVjdGlvbiA9IHtcbiAgICAgIHJlZ2lvbjogcmVnaW9uSWQsXG4gICAgICBzZWN0aW9uTGV0dGVyOiBcIlwiLFxuICAgICAgc2VjdGlvbk51bWJlcjogXCJcIixcbiAgICAgIHBhbGxldDogXCJcIixcbiAgICAgIGJpbjogXCJcIixcbiAgICB9O1xuICAgIHNldE1hcFJlZ2lvbihyZWdpb25JZCk7XG4gICAgc2V0TWFwUm93KFwiXCIpO1xuICAgIHNldE1hcENvbChcIlwiKTtcbiAgICBzZXRNYXBQYWxsZXQoXCJcIik7XG4gICAgc2V0TWFwQmluKFwiXCIpO1xuICAgIHNldE1hcFN0ZXAoXCJncmlkXCIpO1xuICAgIG5vdGlmeVNlbGVjdGlvbkNoYW5nZShzZWxlY3Rpb24pO1xuICAgIGxvYWRSZWdpb25JbnZlbnRvcnkocmVnaW9uSWQpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVNlbGVjdENlbGwgPSAocm93TGV0dGVyLCBjb2xOdW1iZXIpID0+IHtcbiAgICBjb25zdCBjb2xWYWx1ZSA9IFN0cmluZyhjb2xOdW1iZXIpO1xuICAgIGNvbnN0IHNlbGVjdGlvbiA9IHtcbiAgICAgIHJlZ2lvbjogbWFwUmVnaW9uLFxuICAgICAgc2VjdGlvbkxldHRlcjogcm93TGV0dGVyLFxuICAgICAgc2VjdGlvbk51bWJlcjogY29sVmFsdWUsXG4gICAgICBwYWxsZXQ6IFwiXCIsXG4gICAgICBiaW46IFwiXCIsXG4gICAgfTtcbiAgICBzZXRNYXBSb3cocm93TGV0dGVyKTtcbiAgICBzZXRNYXBDb2woY29sVmFsdWUpO1xuICAgIHNldE1hcFBhbGxldChcIlwiKTtcbiAgICBzZXRNYXBCaW4oXCJcIik7XG4gICAgc2V0TWFwU3RlcChcInBhbGxldHNcIik7XG4gICAgbm90aWZ5U2VsZWN0aW9uQ2hhbmdlKHNlbGVjdGlvbik7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlU2VsZWN0UGFsbGV0ID0gKHBhbGxldElkKSA9PiB7XG4gICAgY29uc3QgcGFsbGV0VmFsdWUgPSBTdHJpbmcocGFsbGV0SWQpO1xuICAgIGNvbnN0IHNlbGVjdGlvbiA9IHtcbiAgICAgIHJlZ2lvbjogbWFwUmVnaW9uLFxuICAgICAgc2VjdGlvbkxldHRlcjogbWFwUm93LFxuICAgICAgc2VjdGlvbk51bWJlcjogbWFwQ29sLFxuICAgICAgcGFsbGV0OiBwYWxsZXRWYWx1ZSxcbiAgICAgIGJpbjogXCJcIixcbiAgICB9O1xuICAgIHNldE1hcFBhbGxldChwYWxsZXRWYWx1ZSk7XG4gICAgc2V0TWFwQmluKFwiXCIpO1xuICAgIHNldE1hcFN0ZXAoXCJiaW5zXCIpO1xuICAgIG5vdGlmeVNlbGVjdGlvbkNoYW5nZShzZWxlY3Rpb24pO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVNlbGVjdEJpbiA9IChiaW5JZCkgPT4ge1xuICAgIGNvbnN0IGJpblZhbHVlID0gU3RyaW5nKGJpbklkKTtcbiAgICBjb25zdCBzZWxlY3Rpb24gPSB7XG4gICAgICByZWdpb246IG1hcFJlZ2lvbixcbiAgICAgIHNlY3Rpb25MZXR0ZXI6IG1hcFJvdyxcbiAgICAgIHNlY3Rpb25OdW1iZXI6IG1hcENvbCxcbiAgICAgIHBhbGxldDogbWFwUGFsbGV0LFxuICAgICAgYmluOiBiaW5WYWx1ZSxcbiAgICB9O1xuICAgIHNldE1hcEJpbihiaW5WYWx1ZSk7XG4gICAgbm90aWZ5U2VsZWN0aW9uQ2hhbmdlKHNlbGVjdGlvbik7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlQmFjayA9ICgpID0+IHtcbiAgICBpZiAobWFwU3RlcCA9PT0gXCJiaW5zXCIpIHNldE1hcFN0ZXAoXCJwYWxsZXRzXCIpO1xuICAgIGVsc2UgaWYgKG1hcFN0ZXAgPT09IFwicGFsbGV0c1wiKSBzZXRNYXBTdGVwKFwiZ3JpZFwiKTtcbiAgICBlbHNlIGlmIChtYXBTdGVwID09PSBcImdyaWRcIikgc2V0TWFwU3RlcChcInJlZ2lvbnNcIik7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlVmlldyA9ICgpID0+IHtcbiAgICBpZiAodHlwZW9mIG9uVmlldyAhPT0gXCJmdW5jdGlvblwiKSByZXR1cm47XG4gICAgb25WaWV3KHtcbiAgICAgIHJlZ2lvbjogbWFwUmVnaW9uLFxuICAgICAgc2VjdGlvbkxldHRlcjogbWFwUm93LFxuICAgICAgc2VjdGlvbk51bWJlcjogbWFwQ29sLFxuICAgICAgcGFsbGV0OiBtYXBQYWxsZXQsXG4gICAgICBiaW46IG1hcEJpbixcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxNb2RhbCBzaG93PXtzaG93fSBvbkhpZGU9e29uSGlkZX0gY2VudGVyZWQgc2l6ZT1cImxnXCI+XG4gICAgICA8TW9kYWwuSGVhZGVyIGNsb3NlQnV0dG9uPlxuICAgICAgICA8TW9kYWwuVGl0bGU+V2FyZWhvdXNlIE1hcDwvTW9kYWwuVGl0bGU+XG4gICAgICA8L01vZGFsLkhlYWRlcj5cbiAgICAgIDxNb2RhbC5Cb2R5PlxuICAgICAgICB7bWFwTG9hZGluZyAmJiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5tYXBMb2FkaW5nfT5cbiAgICAgICAgICAgIDxTcGlubmVyIGFuaW1hdGlvbj1cImJvcmRlclwiIC8+XG4gICAgICAgICAgICA8c3Bhbj5Mb2FkaW5nIG1hcCBkYXRhLi4uPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuICAgICAgICB7bWFwRXJyb3IgJiYgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5tYXBFcnJvcn0+e21hcEVycm9yfTwvZGl2Pn1cblxuICAgICAgICB7IW1hcExvYWRpbmcgJiYgbWFwU3RlcCA9PT0gXCJyZWdpb25zXCIgJiYgKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubWFwU3RhZ2V9PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5tYXBIaW50fT5TZWxlY3QgYSByZWdpb248L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubWFwQ2FudmFzfT5cbiAgICAgICAgICAgICAge1JFR0lPTl9PUkRFUi5tYXAoKHJlZ2lvbklkKSA9PiAoXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAga2V5PXtyZWdpb25JZH1cbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgJHtzdHlsZXMucmVnaW9uQmxvY2t9ICR7c3R5bGVzW2ByZWdpb24ke3JlZ2lvbklkfWBdfWB9XG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVTZWxlY3RSZWdpb24ocmVnaW9uSWQpfVxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e1xuICAgICAgICAgICAgICAgICAgICBBcnJheS5pc0FycmF5KHJlZ2lvbk9wdGlvbnMpICYmXG4gICAgICAgICAgICAgICAgICAgIHJlZ2lvbk9wdGlvbnMubGVuZ3RoID4gMCAmJlxuICAgICAgICAgICAgICAgICAgICAhcmVnaW9uT3B0aW9ucy5pbmNsdWRlcyhyZWdpb25JZClcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICB7cmVnaW9uSWR9XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9XG5cbiAgICAgICAgeyFtYXBMb2FkaW5nICYmIG1hcFN0ZXAgPT09IFwiZ3JpZFwiICYmIChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLm1hcFN0YWdlfT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubWFwSGludH0+XG4gICAgICAgICAgICAgIFJlZ2lvbiB7bWFwUmVnaW9ufTogY2hvb3NlIGEgcm93IGFuZCBjb2x1bW5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgeygoKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGRpbXMgPSBnZXRSZWdpb25EaW1lbnNpb25zKG1hcFJlZ2lvbik7XG4gICAgICAgICAgICAgIGNvbnN0IHJvd3MgPSBMRVRURVJTLnNsaWNlKDAsIGRpbXMucm93cyB8fCAwKTtcbiAgICAgICAgICAgICAgY29uc3QgY29scyA9IE5VTUJFUlMuc2xpY2UoMCwgZGltcy5jb2xzIHx8IDApO1xuICAgICAgICAgICAgICBpZiAoIXJvd3MubGVuZ3RoIHx8ICFjb2xzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLm1hcEVtcHR5fT5cbiAgICAgICAgICAgICAgICAgICAgTm8gZ3JpZCBkYXRhIGZvciB0aGlzIHJlZ2lvbi5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmdyaWRXcmFwcGVyfT5cbiAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMuZ3JpZH1cbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgXCItLWdyaWQtY29sc1wiOiBjb2xzLmxlbmd0aCB9fVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7cm93cy5tYXAoKHJvdykgPT5cbiAgICAgICAgICAgICAgICAgICAgICBjb2xzLm1hcCgoY29sKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjZWxsS2V5ID0gYCR7cm93fS0ke2NvbH1gO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaGFzUGFsbGV0cyA9IEJvb2xlYW4oXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG1hcENlbGxQYWxsZXRzW2NlbGxLZXldPy5sZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtjZWxsS2V5fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YCR7c3R5bGVzLmdyaWRDZWxsfSAke1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzUGFsbGV0cyA/IFwiXCIgOiBzdHlsZXMuZ3JpZENlbGxEaXNhYmxlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNQYWxsZXRzICYmIGhhbmRsZVNlbGVjdENlbGwocm93LCBjb2wpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXshaGFzUGFsbGV0c31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3Jvd31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtjb2x9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSkoKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cblxuICAgICAgICB7IW1hcExvYWRpbmcgJiYgbWFwU3RlcCA9PT0gXCJwYWxsZXRzXCIgJiYgKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubWFwU3RhZ2V9PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5tYXBIaW50fT5cbiAgICAgICAgICAgICAgUmVnaW9uIHttYXBSZWdpb259IC0gU2VjdGlvbiB7bWFwUm93fVxuICAgICAgICAgICAgICB7bWFwQ29sfTogc2VsZWN0IGEgcGFsbGV0XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMucGFsbGV0R3JpZH0+XG4gICAgICAgICAgICAgIHsobWFwQ2VsbFBhbGxldHNbYCR7bWFwUm93fS0ke21hcENvbH1gXSB8fCBbXSkubWFwKChwYWxsZXQpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBwYWxsZXRLZXkgPSBgJHttYXBSb3d9LSR7bWFwQ29sfS1QJHtwYWxsZXR9YDtcbiAgICAgICAgICAgICAgICBjb25zdCBiaW5zID0gbWFwUGFsbGV0Qmluc1twYWxsZXRLZXldIHx8IFtdO1xuICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGtleT17cGFsbGV0fVxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMucGFsbGV0QnV0dG9ufVxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChiaW5zLmxlbmd0aCA9PT0gMCAmJiB0eXBlb2Ygb25WaWV3ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNlbGVjdGlvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmVnaW9uOiBtYXBSZWdpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNlY3Rpb25MZXR0ZXI6IG1hcFJvdyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2VjdGlvbk51bWJlcjogbWFwQ29sLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBwYWxsZXQ6IFN0cmluZyhwYWxsZXQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBiaW46IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgbm90aWZ5U2VsZWN0aW9uQ2hhbmdlKHNlbGVjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBvblZpZXcoc2VsZWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgaGFuZGxlU2VsZWN0UGFsbGV0KHBhbGxldCk7XG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIFBhbGxldCB7cGFsbGV0fVxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgIHshKG1hcENlbGxQYWxsZXRzW2Ake21hcFJvd30tJHttYXBDb2x9YF0gfHwgW10pLmxlbmd0aCAmJiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5tYXBFbXB0eX0+XG4gICAgICAgICAgICAgICAgICBObyBwYWxsZXRzIGF2YWlsYWJsZSBoZXJlLlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9XG5cbiAgICAgICAgeyFtYXBMb2FkaW5nICYmIG1hcFN0ZXAgPT09IFwiYmluc1wiICYmIChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLm1hcFN0YWdlfT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubWFwSGludH0+XG4gICAgICAgICAgICAgIFJlZ2lvbiB7bWFwUmVnaW9ufSAtIFNlY3Rpb24ge21hcFJvd31cbiAgICAgICAgICAgICAge21hcENvbH0gLSBQYWxsZXQge21hcFBhbGxldH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5wYWxsZXRHcmlkfT5cbiAgICAgICAgICAgICAgeyhtYXBQYWxsZXRCaW5zW2Ake21hcFJvd30tJHttYXBDb2x9LVAke21hcFBhbGxldH1gXSB8fCBbXSkubWFwKFxuICAgICAgICAgICAgICAgIChiaW4pID0+IChcbiAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAga2V5PXtiaW59XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2Ake3N0eWxlcy5wYWxsZXRCdXR0b259ICR7c3R5bGVzLmJpbkJ1dHRvbn1gfVxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVTZWxlY3RCaW4oYmluKX1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgQmluIHtiaW59XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIHshKG1hcFBhbGxldEJpbnNbYCR7bWFwUm93fS0ke21hcENvbH0tUCR7bWFwUGFsbGV0fWBdIHx8IFtdKVxuICAgICAgICAgICAgICAgIC5sZW5ndGggJiYgKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubWFwRW1wdHl9PlxuICAgICAgICAgICAgICAgICAgTm8gYmlucyBhdmFpbGFibGUgb24gdGhpcyBwYWxsZXQuXG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgIDwvTW9kYWwuQm9keT5cbiAgICAgIDxNb2RhbC5Gb290ZXIgY2xhc3NOYW1lPXtzdHlsZXMubWFwRm9vdGVyfT5cbiAgICAgICAgPEJ1dHRvblxuICAgICAgICAgIHZhcmlhbnQ9XCJvdXRsaW5lLXNlY29uZGFyeVwiXG4gICAgICAgICAgb25DbGljaz17aGFuZGxlQmFja31cbiAgICAgICAgICBkaXNhYmxlZD17bWFwU3RlcCA9PT0gXCJyZWdpb25zXCJ9XG4gICAgICAgID5cbiAgICAgICAgICBCYWNrXG4gICAgICAgIDwvQnV0dG9uPlxuICAgICAgICA8QnV0dG9uIHZhcmlhbnQ9XCJvdXRsaW5lLXByaW1hcnlcIiBvbkNsaWNrPXtoYW5kbGVWaWV3fT5cbiAgICAgICAgICBWaWV3XG4gICAgICAgIDwvQnV0dG9uPlxuICAgICAgICA8QnV0dG9uIHZhcmlhbnQ9XCJzZWNvbmRhcnlcIiBvbkNsaWNrPXtvbkhpZGV9PlxuICAgICAgICAgIENsb3NlXG4gICAgICAgIDwvQnV0dG9uPlxuICAgICAgPC9Nb2RhbC5Gb290ZXI+XG4gICAgPC9Nb2RhbD5cbiAgKTtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=