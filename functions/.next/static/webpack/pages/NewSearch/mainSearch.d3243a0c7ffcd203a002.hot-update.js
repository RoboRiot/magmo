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
    var rows = LETTERS.slice(0, dims.rows || 0).reverse();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vY29tcG9uZW50cy9XYXJlaG91c2VNYXBNb2RhbC5qcyJdLCJuYW1lcyI6WyJSRUdJT05fT1JERVIiLCJMRVRURVJTIiwiQXJyYXkiLCJmcm9tIiwibGVuZ3RoIiwiXyIsImkiLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJOVU1CRVJTIiwiV2FyZWhvdXNlTWFwTW9kYWwiLCJzaG93Iiwib25IaWRlIiwib25WaWV3Iiwib25TZWxlY3Rpb25DaGFuZ2UiLCJpbml0aWFsU2VsZWN0aW9uIiwidXNlU3RhdGUiLCJyZWdpb25PcHRpb25zIiwic2V0UmVnaW9uT3B0aW9ucyIsInNlY3Rpb25NYXAiLCJzZXRTZWN0aW9uTWFwIiwibWFwU3RlcCIsInNldE1hcFN0ZXAiLCJtYXBSZWdpb24iLCJzZXRNYXBSZWdpb24iLCJtYXBSb3ciLCJzZXRNYXBSb3ciLCJtYXBDb2wiLCJzZXRNYXBDb2wiLCJtYXBQYWxsZXQiLCJzZXRNYXBQYWxsZXQiLCJtYXBCaW4iLCJzZXRNYXBCaW4iLCJtYXBDZWxsUGFsbGV0cyIsInNldE1hcENlbGxQYWxsZXRzIiwibWFwUGFsbGV0QmlucyIsInNldE1hcFBhbGxldEJpbnMiLCJtYXBMb2FkaW5nIiwic2V0TWFwTG9hZGluZyIsIm1hcEVycm9yIiwic2V0TWFwRXJyb3IiLCJkaXJlY3RvcnlMb2FkZWQiLCJzZXREaXJlY3RvcnlMb2FkZWQiLCJsYXN0U2hvd1JlZiIsInVzZVJlZiIsIm5vdGlmeVNlbGVjdGlvbkNoYW5nZSIsInVzZUNhbGxiYWNrIiwic2VsZWN0aW9uIiwibG9hZERpcmVjdG9yeSIsImZpcmViYXNlIiwiZmlyZXN0b3JlIiwiY29sbGVjdGlvbiIsImRvYyIsImdldCIsImRhdGEiLCJSZWdpb24iLCJTZWN0aW9uIiwiY29uc29sZSIsImVycm9yIiwibG9hZFJlZ2lvbkludmVudG9yeSIsInJlZ2lvbklkIiwid2hlcmUiLCJzbmFwIiwiY2VsbFBhbGxldHMiLCJwYWxsZXRCaW5zIiwiZm9yRWFjaCIsImxvYyIsIm5ld0xvY2FsQ3VycmVudCIsInJvdyIsInNlY3Rpb24iLCJsZXR0ZXIiLCJjb2wiLCJudW1iZXIiLCJ0cmltbWVkIiwidHJpbSIsInNsaWNlIiwidW5kZWZpbmVkIiwicGFsbGV0IiwiYmluIiwiY2VsbEtleSIsIlNldCIsImFkZCIsInBhbGxldEtleSIsImNlbGxPYmoiLCJPYmplY3QiLCJrZXlzIiwia2V5Iiwic29ydCIsImEiLCJiIiwiTnVtYmVyIiwicGFsbGV0T2JqIiwiZ2V0UmVnaW9uRGltZW5zaW9ucyIsImVudHJ5IiwiaXNBcnJheSIsImNvbHMiLCJwYXJzZUludCIsInJvd3MiLCJpc0Zpbml0ZSIsInVzZUVmZmVjdCIsIndhc09wZW4iLCJjdXJyZW50IiwicmVnaW9uIiwic2VjdGlvbkxldHRlciIsInNlY3Rpb25OdW1iZXIiLCJoYW5kbGVTZWxlY3RSZWdpb24iLCJoYW5kbGVTZWxlY3RDZWxsIiwicm93TGV0dGVyIiwiY29sTnVtYmVyIiwiY29sVmFsdWUiLCJoYW5kbGVTZWxlY3RQYWxsZXQiLCJwYWxsZXRJZCIsInBhbGxldFZhbHVlIiwiaGFuZGxlU2VsZWN0QmluIiwiYmluSWQiLCJiaW5WYWx1ZSIsImhhbmRsZUJhY2siLCJoYW5kbGVWaWV3Iiwic3R5bGVzIiwibWFwU3RhZ2UiLCJtYXBIaW50IiwibWFwQ2FudmFzIiwibWFwIiwicmVnaW9uQmxvY2siLCJpbmNsdWRlcyIsImRpbXMiLCJyZXZlcnNlIiwibWFwRW1wdHkiLCJncmlkV3JhcHBlciIsImdyaWQiLCJoYXNQYWxsZXRzIiwiQm9vbGVhbiIsImdyaWRDZWxsIiwiZ3JpZENlbGxEaXNhYmxlZCIsInBhbGxldEdyaWQiLCJiaW5zIiwicGFsbGV0QnV0dG9uIiwiYmluQnV0dG9uIiwibWFwRm9vdGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQSxJQUFNQSxZQUFZLEdBQUcsQ0FBQyxHQUFELEVBQU0sR0FBTixFQUFXLEdB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bUJBRFY7QUFFRSxXQUFPLEVBQUV0QixVQUZYO0FBR0UsWUFBUSxFQUFFL0YsT0FBTyxLQUFLLFNBSHhCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFERixFQVFFLE1BQUMsc0RBQUQ7QUFBUSxXQUFPLEVBQUMsaUJBQWhCO0FBQWtDLFdBQU8sRUFBRWdHLFVBQTNDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFSRixFQVdFLE1BQUMsc0RBQUQ7QUFBUSxXQUFPLEVBQUMsV0FBaEI7QUFBNEIsV0FBTyxFQUFFekcsTUFBckM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQVhGLENBcEtGLENBREY7QUFzTEQ7O0dBL1p1QkYsaUI7O0tBQUFBLGlCIiwiZmlsZSI6InN0YXRpYy93ZWJwYWNrL3BhZ2VzL05ld1NlYXJjaC9tYWluU2VhcmNoLmQzMjQzYTBjN2ZmY2QyMDNhMDAyLmhvdC11cGRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgTW9kYWwsIEJ1dHRvbiwgU3Bpbm5lciB9IGZyb20gXCJyZWFjdC1ib290c3RyYXBcIjtcbmltcG9ydCBmaXJlYmFzZSBmcm9tIFwiLi4vY29udGV4dC9GaXJlYmFzZVwiO1xuaW1wb3J0IHN0eWxlcyBmcm9tIFwiLi9XYXJlaG91c2VNYXBNb2RhbC5tb2R1bGUuY3NzXCI7XG5cbmNvbnN0IFJFR0lPTl9PUkRFUiA9IFtcIkVcIiwgXCJGXCIsIFwiR1wiLCBcIkFcIiwgXCJEXCIsIFwiQ1wiLCBcIkJcIl07XG5jb25zdCBMRVRURVJTID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogMjYgfSwgKF8sIGkpID0+XG4gIFN0cmluZy5mcm9tQ2hhckNvZGUoNjUgKyBpKVxuKTtcbmNvbnN0IE5VTUJFUlMgPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiA1MCB9LCAoXywgaSkgPT4gaSArIDEpO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBXYXJlaG91c2VNYXBNb2RhbCh7XG4gIHNob3cgPSBmYWxzZSxcbiAgb25IaWRlID0gKCkgPT4ge30sXG4gIG9uVmlldyxcbiAgb25TZWxlY3Rpb25DaGFuZ2UsXG4gIGluaXRpYWxTZWxlY3Rpb24gPSB7fSxcbn0pIHtcbiAgY29uc3QgW3JlZ2lvbk9wdGlvbnMsIHNldFJlZ2lvbk9wdGlvbnNdID0gdXNlU3RhdGUoW10pO1xuICBjb25zdCBbc2VjdGlvbk1hcCwgc2V0U2VjdGlvbk1hcF0gPSB1c2VTdGF0ZSh7fSk7XG4gIGNvbnN0IFttYXBTdGVwLCBzZXRNYXBTdGVwXSA9IHVzZVN0YXRlKFwicmVnaW9uc1wiKTtcbiAgY29uc3QgW21hcFJlZ2lvbiwgc2V0TWFwUmVnaW9uXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbbWFwUm93LCBzZXRNYXBSb3ddID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFttYXBDb2wsIHNldE1hcENvbF0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW21hcFBhbGxldCwgc2V0TWFwUGFsbGV0XSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbbWFwQmluLCBzZXRNYXBCaW5dID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFttYXBDZWxsUGFsbGV0cywgc2V0TWFwQ2VsbFBhbGxldHNdID0gdXNlU3RhdGUoe30pO1xuICBjb25zdCBbbWFwUGFsbGV0Qmlucywgc2V0TWFwUGFsbGV0Qmluc10gPSB1c2VTdGF0ZSh7fSk7XG4gIGNvbnN0IFttYXBMb2FkaW5nLCBzZXRNYXBMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW21hcEVycm9yLCBzZXRNYXBFcnJvcl0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2RpcmVjdG9yeUxvYWRlZCwgc2V0RGlyZWN0b3J5TG9hZGVkXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgbGFzdFNob3dSZWYgPSB1c2VSZWYoZmFsc2UpO1xuXG4gIGNvbnN0IG5vdGlmeVNlbGVjdGlvbkNoYW5nZSA9IHVzZUNhbGxiYWNrKFxuICAgIChzZWxlY3Rpb24pID0+IHtcbiAgICAgIGlmICh0eXBlb2Ygb25TZWxlY3Rpb25DaGFuZ2UgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBvblNlbGVjdGlvbkNoYW5nZShzZWxlY3Rpb24pO1xuICAgICAgfVxuICAgIH0sXG4gICAgW29uU2VsZWN0aW9uQ2hhbmdlXVxuICApO1xuXG4gIGNvbnN0IGxvYWREaXJlY3RvcnkgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XG4gICAgaWYgKGRpcmVjdG9yeUxvYWRlZCkgcmV0dXJuO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBkb2MgPSBhd2FpdCBmaXJlYmFzZVxuICAgICAgICAuZmlyZXN0b3JlKClcbiAgICAgICAgLmNvbGxlY3Rpb24oXCJXYXJlaG91c2VcIilcbiAgICAgICAgLmRvYyhcImRpcmVjdG9yeVwiKVxuICAgICAgICAuZ2V0KCk7XG4gICAgICBjb25zdCBkYXRhID0gZG9jLmRhdGEoKSB8fCB7fTtcbiAgICAgIHNldFJlZ2lvbk9wdGlvbnMoZGF0YS5SZWdpb24gfHwgW10pO1xuICAgICAgc2V0U2VjdGlvbk1hcChkYXRhLlNlY3Rpb24gfHwge30pO1xuICAgICAgc2V0RGlyZWN0b3J5TG9hZGVkKHRydWUpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGxvYWQgbWFwIGRpcmVjdG9yeVwiLCBlcnJvcik7XG4gICAgICBzZXRNYXBFcnJvcihcIkZhaWxlZCB0byBsb2FkIHdhcmVob3VzZSBkaXJlY3RvcnkuXCIpO1xuICAgIH1cbiAgfSwgW2RpcmVjdG9yeUxvYWRlZF0pO1xuXG4gIGNvbnN0IGxvYWRSZWdpb25JbnZlbnRvcnkgPSB1c2VDYWxsYmFjayhhc3luYyAocmVnaW9uSWQpID0+IHtcbiAgICBpZiAoIXJlZ2lvbklkKSByZXR1cm47XG4gICAgc2V0TWFwTG9hZGluZyh0cnVlKTtcbiAgICBzZXRNYXBFcnJvcihcIlwiKTtcbiAgICB0cnkge1xuICAgICAgY29uc3Qgc25hcCA9IGF3YWl0IGZpcmViYXNlXG4gICAgICAgIC5maXJlc3RvcmUoKVxuICAgICAgICAuY29sbGVjdGlvbihcIlRlc3RcIilcbiAgICAgICAgLndoZXJlKFwibmV3TG9jYWxDdXJyZW50LnJlZ2lvblwiLCBcIj09XCIsIHJlZ2lvbklkKVxuICAgICAgICAuZ2V0KCk7XG5cbiAgICAgIGNvbnN0IGNlbGxQYWxsZXRzID0ge307XG4gICAgICBjb25zdCBwYWxsZXRCaW5zID0ge307XG4gICAgICBzbmFwLmZvckVhY2goKGRvYykgPT4ge1xuICAgICAgICBjb25zdCBsb2MgPSBkb2MuZGF0YSgpPy5uZXdMb2NhbEN1cnJlbnQgfHwge307XG4gICAgICAgIGxldCByb3cgPSBsb2Muc2VjdGlvbj8ubGV0dGVyO1xuICAgICAgICBsZXQgY29sID0gbG9jLnNlY3Rpb24/Lm51bWJlcjtcbiAgICAgICAgaWYgKCghcm93IHx8ICFjb2wpICYmIHR5cGVvZiBsb2Muc2VjdGlvbiA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgIGNvbnN0IHRyaW1tZWQgPSBsb2Muc2VjdGlvbi50cmltKCk7XG4gICAgICAgICAgcm93ID0gdHJpbW1lZC5zbGljZSgwLCAxKTtcbiAgICAgICAgICBjb2wgPSB0cmltbWVkLnNsaWNlKDEpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb2wgIT09IHVuZGVmaW5lZCAmJiBjb2wgIT09IG51bGwpIHtcbiAgICAgICAgICBjb2wgPSBTdHJpbmcoY29sKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwYWxsZXQgPSBsb2MucGFsbGV0O1xuICAgICAgICBjb25zdCBiaW4gPSBsb2MuYmluO1xuICAgICAgICBpZiAoIXJvdyB8fCAhY29sKSByZXR1cm47XG4gICAgICAgIGNvbnN0IGNlbGxLZXkgPSBgJHtyb3d9LSR7Y29sfWA7XG4gICAgICAgIGlmIChwYWxsZXQgIT09IHVuZGVmaW5lZCAmJiBwYWxsZXQgIT09IG51bGwgJiYgYCR7cGFsbGV0fWAgIT09IFwiXCIpIHtcbiAgICAgICAgICBpZiAoIWNlbGxQYWxsZXRzW2NlbGxLZXldKSBjZWxsUGFsbGV0c1tjZWxsS2V5XSA9IG5ldyBTZXQoKTtcbiAgICAgICAgICBjZWxsUGFsbGV0c1tjZWxsS2V5XS5hZGQoU3RyaW5nKHBhbGxldCkpO1xuICAgICAgICAgIGlmIChiaW4gIT09IHVuZGVmaW5lZCAmJiBiaW4gIT09IG51bGwgJiYgYCR7YmlufWAgIT09IFwiXCIpIHtcbiAgICAgICAgICAgIGNvbnN0IHBhbGxldEtleSA9IGAke2NlbGxLZXl9LVAke3BhbGxldH1gO1xuICAgICAgICAgICAgaWYgKCFwYWxsZXRCaW5zW3BhbGxldEtleV0pIHBhbGxldEJpbnNbcGFsbGV0S2V5XSA9IG5ldyBTZXQoKTtcbiAgICAgICAgICAgIHBhbGxldEJpbnNbcGFsbGV0S2V5XS5hZGQoU3RyaW5nKGJpbikpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IGNlbGxPYmogPSB7fTtcbiAgICAgIE9iamVjdC5rZXlzKGNlbGxQYWxsZXRzKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgY2VsbE9ialtrZXldID0gQXJyYXkuZnJvbShjZWxsUGFsbGV0c1trZXldKS5zb3J0KFxuICAgICAgICAgIChhLCBiKSA9PiBOdW1iZXIoYSkgLSBOdW1iZXIoYilcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBwYWxsZXRPYmogPSB7fTtcbiAgICAgIE9iamVjdC5rZXlzKHBhbGxldEJpbnMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICBwYWxsZXRPYmpba2V5XSA9IEFycmF5LmZyb20ocGFsbGV0Qmluc1trZXldKS5zb3J0KFxuICAgICAgICAgIChhLCBiKSA9PiBOdW1iZXIoYSkgLSBOdW1iZXIoYilcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuXG4gICAgICBzZXRNYXBDZWxsUGFsbGV0cyhjZWxsT2JqKTtcbiAgICAgIHNldE1hcFBhbGxldEJpbnMocGFsbGV0T2JqKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byBsb2FkIG1hcCBpbnZlbnRvcnlcIiwgZXJyb3IpO1xuICAgICAgc2V0TWFwRXJyb3IoXCJGYWlsZWQgdG8gbG9hZCBtYXAgaW52ZW50b3J5LlwiKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0TWFwTG9hZGluZyhmYWxzZSk7XG4gICAgfVxuICB9LCBbXSk7XG5cbiAgY29uc3QgZ2V0UmVnaW9uRGltZW5zaW9ucyA9IHVzZUNhbGxiYWNrKFxuICAgIChyZWdpb25JZCkgPT4ge1xuICAgICAgY29uc3QgZW50cnkgPSBzZWN0aW9uTWFwPy5bcmVnaW9uSWRdO1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZW50cnkpICYmIGVudHJ5Lmxlbmd0aCA+PSAyKSB7XG4gICAgICAgIGNvbnN0IGNvbHMgPSBwYXJzZUludChlbnRyeVswXSwgMTApO1xuICAgICAgICBjb25zdCByb3dzID0gcGFyc2VJbnQoZW50cnlbMV0sIDEwKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBjb2xzOiBOdW1iZXIuaXNGaW5pdGUoY29scykgPyBjb2xzIDogMCxcbiAgICAgICAgICByb3dzOiBOdW1iZXIuaXNGaW5pdGUocm93cykgPyByb3dzIDogMCxcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB7IGNvbHM6IDAsIHJvd3M6IDAgfTtcbiAgICB9LFxuICAgIFtzZWN0aW9uTWFwXVxuICApO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3Qgd2FzT3BlbiA9IGxhc3RTaG93UmVmLmN1cnJlbnQ7XG4gICAgbGFzdFNob3dSZWYuY3VycmVudCA9IHNob3c7XG4gICAgaWYgKCFzaG93IHx8IHdhc09wZW4pIHJldHVybjtcblxuICAgIGxvYWREaXJlY3RvcnkoKTtcbiAgICBzZXRNYXBFcnJvcihcIlwiKTtcbiAgICBjb25zdCB7XG4gICAgICByZWdpb24sXG4gICAgICBzZWN0aW9uTGV0dGVyLFxuICAgICAgc2VjdGlvbk51bWJlcixcbiAgICAgIHBhbGxldCxcbiAgICAgIGJpbixcbiAgICB9ID0gaW5pdGlhbFNlbGVjdGlvbiB8fCB7fTtcblxuICAgIHNldE1hcFJlZ2lvbihyZWdpb24gfHwgXCJcIik7XG4gICAgc2V0TWFwUm93KHNlY3Rpb25MZXR0ZXIgfHwgXCJcIik7XG4gICAgc2V0TWFwQ29sKHNlY3Rpb25OdW1iZXIgPyBTdHJpbmcoc2VjdGlvbk51bWJlcikgOiBcIlwiKTtcbiAgICBzZXRNYXBQYWxsZXQocGFsbGV0ID8gU3RyaW5nKHBhbGxldCkgOiBcIlwiKTtcbiAgICBzZXRNYXBCaW4oYmluID8gU3RyaW5nKGJpbikgOiBcIlwiKTtcbiAgICBzZXRNYXBTdGVwKHJlZ2lvbiA/IFwiZ3JpZFwiIDogXCJyZWdpb25zXCIpO1xuICAgIGlmIChyZWdpb24pIGxvYWRSZWdpb25JbnZlbnRvcnkocmVnaW9uKTtcbiAgfSwgW3Nob3csIGluaXRpYWxTZWxlY3Rpb24sIGxvYWREaXJlY3RvcnksIGxvYWRSZWdpb25JbnZlbnRvcnldKTtcblxuICBjb25zdCBoYW5kbGVTZWxlY3RSZWdpb24gPSAocmVnaW9uSWQpID0+IHtcbiAgICBjb25zdCBzZWxlY3Rpb24gPSB7XG4gICAgICByZWdpb246IHJlZ2lvbklkLFxuICAgICAgc2VjdGlvbkxldHRlcjogXCJcIixcbiAgICAgIHNlY3Rpb25OdW1iZXI6IFwiXCIsXG4gICAgICBwYWxsZXQ6IFwiXCIsXG4gICAgICBiaW46IFwiXCIsXG4gICAgfTtcbiAgICBzZXRNYXBSZWdpb24ocmVnaW9uSWQpO1xuICAgIHNldE1hcFJvdyhcIlwiKTtcbiAgICBzZXRNYXBDb2woXCJcIik7XG4gICAgc2V0TWFwUGFsbGV0KFwiXCIpO1xuICAgIHNldE1hcEJpbihcIlwiKTtcbiAgICBzZXRNYXBTdGVwKFwiZ3JpZFwiKTtcbiAgICBub3RpZnlTZWxlY3Rpb25DaGFuZ2Uoc2VsZWN0aW9uKTtcbiAgICBsb2FkUmVnaW9uSW52ZW50b3J5KHJlZ2lvbklkKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVTZWxlY3RDZWxsID0gKHJvd0xldHRlciwgY29sTnVtYmVyKSA9PiB7XG4gICAgY29uc3QgY29sVmFsdWUgPSBTdHJpbmcoY29sTnVtYmVyKTtcbiAgICBjb25zdCBzZWxlY3Rpb24gPSB7XG4gICAgICByZWdpb246IG1hcFJlZ2lvbixcbiAgICAgIHNlY3Rpb25MZXR0ZXI6IHJvd0xldHRlcixcbiAgICAgIHNlY3Rpb25OdW1iZXI6IGNvbFZhbHVlLFxuICAgICAgcGFsbGV0OiBcIlwiLFxuICAgICAgYmluOiBcIlwiLFxuICAgIH07XG4gICAgc2V0TWFwUm93KHJvd0xldHRlcik7XG4gICAgc2V0TWFwQ29sKGNvbFZhbHVlKTtcbiAgICBzZXRNYXBQYWxsZXQoXCJcIik7XG4gICAgc2V0TWFwQmluKFwiXCIpO1xuICAgIHNldE1hcFN0ZXAoXCJwYWxsZXRzXCIpO1xuICAgIG5vdGlmeVNlbGVjdGlvbkNoYW5nZShzZWxlY3Rpb24pO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVNlbGVjdFBhbGxldCA9IChwYWxsZXRJZCkgPT4ge1xuICAgIGNvbnN0IHBhbGxldFZhbHVlID0gU3RyaW5nKHBhbGxldElkKTtcbiAgICBjb25zdCBzZWxlY3Rpb24gPSB7XG4gICAgICByZWdpb246IG1hcFJlZ2lvbixcbiAgICAgIHNlY3Rpb25MZXR0ZXI6IG1hcFJvdyxcbiAgICAgIHNlY3Rpb25OdW1iZXI6IG1hcENvbCxcbiAgICAgIHBhbGxldDogcGFsbGV0VmFsdWUsXG4gICAgICBiaW46IFwiXCIsXG4gICAgfTtcbiAgICBzZXRNYXBQYWxsZXQocGFsbGV0VmFsdWUpO1xuICAgIHNldE1hcEJpbihcIlwiKTtcbiAgICBzZXRNYXBTdGVwKFwiYmluc1wiKTtcbiAgICBub3RpZnlTZWxlY3Rpb25DaGFuZ2Uoc2VsZWN0aW9uKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVTZWxlY3RCaW4gPSAoYmluSWQpID0+IHtcbiAgICBjb25zdCBiaW5WYWx1ZSA9IFN0cmluZyhiaW5JZCk7XG4gICAgY29uc3Qgc2VsZWN0aW9uID0ge1xuICAgICAgcmVnaW9uOiBtYXBSZWdpb24sXG4gICAgICBzZWN0aW9uTGV0dGVyOiBtYXBSb3csXG4gICAgICBzZWN0aW9uTnVtYmVyOiBtYXBDb2wsXG4gICAgICBwYWxsZXQ6IG1hcFBhbGxldCxcbiAgICAgIGJpbjogYmluVmFsdWUsXG4gICAgfTtcbiAgICBzZXRNYXBCaW4oYmluVmFsdWUpO1xuICAgIG5vdGlmeVNlbGVjdGlvbkNoYW5nZShzZWxlY3Rpb24pO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUJhY2sgPSAoKSA9PiB7XG4gICAgaWYgKG1hcFN0ZXAgPT09IFwiYmluc1wiKSBzZXRNYXBTdGVwKFwicGFsbGV0c1wiKTtcbiAgICBlbHNlIGlmIChtYXBTdGVwID09PSBcInBhbGxldHNcIikgc2V0TWFwU3RlcChcImdyaWRcIik7XG4gICAgZWxzZSBpZiAobWFwU3RlcCA9PT0gXCJncmlkXCIpIHNldE1hcFN0ZXAoXCJyZWdpb25zXCIpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVZpZXcgPSAoKSA9PiB7XG4gICAgaWYgKHR5cGVvZiBvblZpZXcgIT09IFwiZnVuY3Rpb25cIikgcmV0dXJuO1xuICAgIG9uVmlldyh7XG4gICAgICByZWdpb246IG1hcFJlZ2lvbixcbiAgICAgIHNlY3Rpb25MZXR0ZXI6IG1hcFJvdyxcbiAgICAgIHNlY3Rpb25OdW1iZXI6IG1hcENvbCxcbiAgICAgIHBhbGxldDogbWFwUGFsbGV0LFxuICAgICAgYmluOiBtYXBCaW4sXG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8TW9kYWwgc2hvdz17c2hvd30gb25IaWRlPXtvbkhpZGV9IGNlbnRlcmVkIHNpemU9XCJsZ1wiPlxuICAgICAgPE1vZGFsLkhlYWRlciBjbG9zZUJ1dHRvbj5cbiAgICAgICAgPE1vZGFsLlRpdGxlPldhcmVob3VzZSBNYXA8L01vZGFsLlRpdGxlPlxuICAgICAgPC9Nb2RhbC5IZWFkZXI+XG4gICAgICA8TW9kYWwuQm9keT5cbiAgICAgICAge21hcExvYWRpbmcgJiYgKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubWFwTG9hZGluZ30+XG4gICAgICAgICAgICA8U3Bpbm5lciBhbmltYXRpb249XCJib3JkZXJcIiAvPlxuICAgICAgICAgICAgPHNwYW4+TG9hZGluZyBtYXAgZGF0YS4uLjwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgICAge21hcEVycm9yICYmIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubWFwRXJyb3J9PnttYXBFcnJvcn08L2Rpdj59XG5cbiAgICAgICAgeyFtYXBMb2FkaW5nICYmIG1hcFN0ZXAgPT09IFwicmVnaW9uc1wiICYmIChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLm1hcFN0YWdlfT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubWFwSGludH0+U2VsZWN0IGEgcmVnaW9uPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLm1hcENhbnZhc30+XG4gICAgICAgICAgICAgIHtSRUdJT05fT1JERVIubWFwKChyZWdpb25JZCkgPT4gKFxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIGtleT17cmVnaW9uSWR9XG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YCR7c3R5bGVzLnJlZ2lvbkJsb2NrfSAke3N0eWxlc1tgcmVnaW9uJHtyZWdpb25JZH1gXX1gfVxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlU2VsZWN0UmVnaW9uKHJlZ2lvbklkKX1cbiAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtcbiAgICAgICAgICAgICAgICAgICAgQXJyYXkuaXNBcnJheShyZWdpb25PcHRpb25zKSAmJlxuICAgICAgICAgICAgICAgICAgICByZWdpb25PcHRpb25zLmxlbmd0aCA+IDAgJiZcbiAgICAgICAgICAgICAgICAgICAgIXJlZ2lvbk9wdGlvbnMuaW5jbHVkZXMocmVnaW9uSWQpXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAge3JlZ2lvbklkfVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuXG4gICAgICAgIHshbWFwTG9hZGluZyAmJiBtYXBTdGVwID09PSBcImdyaWRcIiAmJiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5tYXBTdGFnZX0+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLm1hcEhpbnR9PlxuICAgICAgICAgICAgICBSZWdpb24ge21hcFJlZ2lvbn06IGNob29zZSBhIHJvdyBhbmQgY29sdW1uXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIHsoKCkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBkaW1zID0gZ2V0UmVnaW9uRGltZW5zaW9ucyhtYXBSZWdpb24pO1xuICAgICAgICAgICAgICBjb25zdCByb3dzID0gTEVUVEVSUy5zbGljZSgwLCBkaW1zLnJvd3MgfHwgMCkucmV2ZXJzZSgpO1xuICAgICAgICAgICAgICBjb25zdCBjb2xzID0gTlVNQkVSUy5zbGljZSgwLCBkaW1zLmNvbHMgfHwgMCk7XG4gICAgICAgICAgICAgIGlmICghcm93cy5sZW5ndGggfHwgIWNvbHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubWFwRW1wdHl9PlxuICAgICAgICAgICAgICAgICAgICBObyBncmlkIGRhdGEgZm9yIHRoaXMgcmVnaW9uLlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuZ3JpZFdyYXBwZXJ9PlxuICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5ncmlkfVxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyBcIi0tZ3JpZC1jb2xzXCI6IGNvbHMubGVuZ3RoIH19XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHtyb3dzLm1hcCgocm93KSA9PlxuICAgICAgICAgICAgICAgICAgICAgIGNvbHMubWFwKChjb2wpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNlbGxLZXkgPSBgJHtyb3d9LSR7Y29sfWA7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBoYXNQYWxsZXRzID0gQm9vbGVhbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwQ2VsbFBhbGxldHNbY2VsbEtleV0/Lmxlbmd0aFxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2NlbGxLZXl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgJHtzdHlsZXMuZ3JpZENlbGx9ICR7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNQYWxsZXRzID8gXCJcIiA6IHN0eWxlcy5ncmlkQ2VsbERpc2FibGVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc1BhbGxldHMgJiYgaGFuZGxlU2VsZWN0Q2VsbChyb3csIGNvbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFoYXNQYWxsZXRzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cm93fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2NvbH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KSgpfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuXG4gICAgICAgIHshbWFwTG9hZGluZyAmJiBtYXBTdGVwID09PSBcInBhbGxldHNcIiAmJiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5tYXBTdGFnZX0+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLm1hcEhpbnR9PlxuICAgICAgICAgICAgICBSZWdpb24ge21hcFJlZ2lvbn0gLSBTZWN0aW9uIHttYXBSb3d9XG4gICAgICAgICAgICAgIHttYXBDb2x9OiBzZWxlY3QgYSBwYWxsZXRcbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5wYWxsZXRHcmlkfT5cbiAgICAgICAgICAgICAgeyhtYXBDZWxsUGFsbGV0c1tgJHttYXBSb3d9LSR7bWFwQ29sfWBdIHx8IFtdKS5tYXAoKHBhbGxldCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBhbGxldEtleSA9IGAke21hcFJvd30tJHttYXBDb2x9LVAke3BhbGxldH1gO1xuICAgICAgICAgICAgICAgIGNvbnN0IGJpbnMgPSBtYXBQYWxsZXRCaW5zW3BhbGxldEtleV0gfHwgW107XG4gICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAga2V5PXtwYWxsZXR9XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5wYWxsZXRCdXR0b259XG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKGJpbnMubGVuZ3RoID09PSAwICYmIHR5cGVvZiBvblZpZXcgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0aW9uID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICByZWdpb246IG1hcFJlZ2lvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2VjdGlvbkxldHRlcjogbWFwUm93LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBzZWN0aW9uTnVtYmVyOiBtYXBDb2wsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHBhbGxldDogU3RyaW5nKHBhbGxldCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJpbjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICBub3RpZnlTZWxlY3Rpb25DaGFuZ2Uoc2VsZWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uVmlldyhzZWxlY3Rpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVTZWxlY3RQYWxsZXQocGFsbGV0KTtcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgUGFsbGV0IHtwYWxsZXR9XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgeyEobWFwQ2VsbFBhbGxldHNbYCR7bWFwUm93fS0ke21hcENvbH1gXSB8fCBbXSkubGVuZ3RoICYmIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLm1hcEVtcHR5fT5cbiAgICAgICAgICAgICAgICAgIE5vIHBhbGxldHMgYXZhaWxhYmxlIGhlcmUuXG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cblxuICAgICAgICB7IW1hcExvYWRpbmcgJiYgbWFwU3RlcCA9PT0gXCJiaW5zXCIgJiYgKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubWFwU3RhZ2V9PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5tYXBIaW50fT5cbiAgICAgICAgICAgICAgUmVnaW9uIHttYXBSZWdpb259IC0gU2VjdGlvbiB7bWFwUm93fVxuICAgICAgICAgICAgICB7bWFwQ29sfSAtIFBhbGxldCB7bWFwUGFsbGV0fVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnBhbGxldEdyaWR9PlxuICAgICAgICAgICAgICB7KG1hcFBhbGxldEJpbnNbYCR7bWFwUm93fS0ke21hcENvbH0tUCR7bWFwUGFsbGV0fWBdIHx8IFtdKS5tYXAoXG4gICAgICAgICAgICAgICAgKGJpbikgPT4gKFxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBrZXk9e2Jpbn1cbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YCR7c3R5bGVzLnBhbGxldEJ1dHRvbn0gJHtzdHlsZXMuYmluQnV0dG9ufWB9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZVNlbGVjdEJpbihiaW4pfVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICBCaW4ge2Jpbn1cbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgeyEobWFwUGFsbGV0Qmluc1tgJHttYXBSb3d9LSR7bWFwQ29sfS1QJHttYXBQYWxsZXR9YF0gfHwgW10pXG4gICAgICAgICAgICAgICAgLmxlbmd0aCAmJiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5tYXBFbXB0eX0+XG4gICAgICAgICAgICAgICAgICBObyBiaW5zIGF2YWlsYWJsZSBvbiB0aGlzIHBhbGxldC5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuICAgICAgPC9Nb2RhbC5Cb2R5PlxuICAgICAgPE1vZGFsLkZvb3RlciBjbGFzc05hbWU9e3N0eWxlcy5tYXBGb290ZXJ9PlxuICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgdmFyaWFudD1cIm91dGxpbmUtc2Vjb25kYXJ5XCJcbiAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVCYWNrfVxuICAgICAgICAgIGRpc2FibGVkPXttYXBTdGVwID09PSBcInJlZ2lvbnNcIn1cbiAgICAgICAgPlxuICAgICAgICAgIEJhY2tcbiAgICAgICAgPC9CdXR0b24+XG4gICAgICAgIDxCdXR0b24gdmFyaWFudD1cIm91dGxpbmUtcHJpbWFyeVwiIG9uQ2xpY2s9e2hhbmRsZVZpZXd9PlxuICAgICAgICAgIFZpZXdcbiAgICAgICAgPC9CdXR0b24+XG4gICAgICAgIDxCdXR0b24gdmFyaWFudD1cInNlY29uZGFyeVwiIG9uQ2xpY2s9e29uSGlkZX0+XG4gICAgICAgICAgQ2xvc2VcbiAgICAgICAgPC9CdXR0b24+XG4gICAgICA8L01vZGFsLkZvb3Rlcj5cbiAgICA8L01vZGFsPlxuICApO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==