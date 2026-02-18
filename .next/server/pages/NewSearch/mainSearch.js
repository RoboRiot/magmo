module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./pages/NewSearch/mainSearch.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../next-server/lib/router-context":
/*!**************************************************************!*\
  !*** external "next/dist/next-server/lib/router-context.js" ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next/dist/next-server/lib/router-context.js");

/***/ }),

/***/ "../next-server/lib/router/utils/get-asset-path-from-route":
/*!**************************************************************************************!*\
  !*** external "next/dist/next-server/lib/router/utils/get-asset-path-from-route.js" ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next/dist/next-server/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ "./components/WarehouseMapModal.js":
/*!*****************************************!*\
  !*** ./components/WarehouseMapModal.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return WarehouseMapModal; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-bootstrap */ "react-bootstrap");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _context_Firebase__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../context/Firebase */ "./context/Firebase.js");
/* harmony import */ var _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./WarehouseMapModal.module.css */ "./components/WarehouseMapModal.module.css");
/* harmony import */ var _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_3__);
var _jsxFileName = "C:\\Users\\mack2\\Desktop\\code\\components\\WarehouseMapModal.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;




const REGION_ORDER = ["E", "F", "G", "A", "D", "C", "B"];
const NO_PALLET = "NoPallet";
const LETTERS = Array.from({
  length: 26
}, (_, i) => String.fromCharCode(65 + i));
const NUMBERS = Array.from({
  length: 50
}, (_, i) => i + 1);
function WarehouseMapModal({
  show = false,
  onHide = () => {},
  onView,
  onSelectionChange,
  initialSelection = {}
}) {
  const {
    0: regionOptions,
    1: setRegionOptions
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const {
    0: sectionMap,
    1: setSectionMap
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({});
  const {
    0: mapStep,
    1: setMapStep
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])("regions");
  const {
    0: mapRegion,
    1: setMapRegion
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])("");
  const {
    0: mapRow,
    1: setMapRow
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])("");
  const {
    0: mapCol,
    1: setMapCol
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])("");
  const {
    0: mapPallet,
    1: setMapPallet
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])("");
  const {
    0: mapBin,
    1: setMapBin
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])("");
  const {
    0: mapCellPallets,
    1: setMapCellPallets
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({});
  const {
    0: mapPalletBins,
    1: setMapPalletBins
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({});
  const {
    0: mapLoading,
    1: setMapLoading
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const {
    0: mapError,
    1: setMapError
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])("");
  const {
    0: directoryLoaded,
    1: setDirectoryLoaded
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const lastShowRef = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(false);
  const notifySelectionChange = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(selection => {
    if (typeof onSelectionChange === "function") {
      onSelectionChange(selection);
    }
  }, [onSelectionChange]);
  const loadDirectory = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(async () => {
    if (directoryLoaded) return;

    try {
      const doc = await _context_Firebase__WEBPACK_IMPORTED_MODULE_2__["default"].firestore().collection("Warehouse").doc("directory").get();
      const data = doc.data() || {};
      setRegionOptions(data.Region || []);
      setSectionMap(data.Section || {});
      setDirectoryLoaded(true);
    } catch (error) {
      console.error("Failed to load map directory", error);
      setMapError("Failed to load warehouse directory.");
    }
  }, [directoryLoaded]);
  const loadRegionInventory = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(async regionId => {
    if (!regionId) return;
    setMapLoading(true);
    setMapError("");

    try {
      const snap = await _context_Firebase__WEBPACK_IMPORTED_MODULE_2__["default"].firestore().collection("Test").where("newLocalCurrent.region", "==", regionId).get();
      const cellPallets = {};
      const palletBins = {};
      snap.forEach(doc => {
        var _doc$data, _loc$section, _loc$section2;

        const loc = ((_doc$data = doc.data()) === null || _doc$data === void 0 ? void 0 : _doc$data.newLocalCurrent) || {};
        let row = (_loc$section = loc.section) === null || _loc$section === void 0 ? void 0 : _loc$section.letter;
        let col = (_loc$section2 = loc.section) === null || _loc$section2 === void 0 ? void 0 : _loc$section2.number;

        if ((!row || !col) && typeof loc.section === "string") {
          const trimmed = loc.section.trim();
          row = trimmed.slice(0, 1);
          col = trimmed.slice(1);
        }

        if (col !== undefined && col !== null) {
          col = String(col);
        }

        const pallet = loc.pallet;
        const bin = loc.bin;
        if (!row || !col) return;
        const cellKey = `${row}-${col}`;
        const hasBin = bin !== undefined && bin !== null && `${bin}` !== "";
        const hasPallet = pallet !== undefined && pallet !== null && `${pallet}` !== "";
        if (!hasPallet && !hasBin) return;
        const palletId = hasPallet ? String(pallet) : NO_PALLET;
        if (!cellPallets[cellKey]) cellPallets[cellKey] = new Set();
        cellPallets[cellKey].add(palletId);

        if (hasBin) {
          const palletKey = `${cellKey}-P${palletId}`;
          if (!palletBins[palletKey]) palletBins[palletKey] = new Set();
          palletBins[palletKey].add(String(bin));
        }
      });
      const cellObj = {};
      Object.keys(cellPallets).forEach(key => {
        cellObj[key] = Array.from(cellPallets[key]).sort((a, b) => {
          if (a === NO_PALLET) return 1;
          if (b === NO_PALLET) return -1;
          const na = Number(a);
          const nb = Number(b);
          if (Number.isFinite(na) && Number.isFinite(nb)) return na - nb;
          return String(a).localeCompare(String(b));
        });
      });
      const palletObj = {};
      Object.keys(palletBins).forEach(key => {
        palletObj[key] = Array.from(palletBins[key]).sort((a, b) => Number(a) - Number(b));
      });
      setMapCellPallets(cellObj);
      setMapPalletBins(palletObj);
    } catch (error) {
      console.error("Failed to load map inventory", error);
      setMapError("Failed to load map inventory.");
    } finally {
      setMapLoading(false);
    }
  }, []);
  const getRegionDimensions = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(regionId => {
    const entry = sectionMap === null || sectionMap === void 0 ? void 0 : sectionMap[regionId];

    if (Array.isArray(entry) && entry.length >= 2) {
      const cols = parseInt(entry[0], 10);
      const rows = parseInt(entry[1], 10);
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
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    const wasOpen = lastShowRef.current;
    lastShowRef.current = show;
    if (!show || wasOpen) return;
    loadDirectory();
    setMapError("");
    const {
      region,
      sectionLetter,
      sectionNumber,
      pallet,
      bin
    } = initialSelection || {};
    setMapRegion(region || "");
    setMapRow(sectionLetter || "");
    setMapCol(sectionNumber ? String(sectionNumber) : "");
    setMapPallet(pallet ? String(pallet) : "");
    setMapBin(bin ? String(bin) : "");
    setMapStep(region ? "grid" : "regions");
    if (region) loadRegionInventory(region);
  }, [show, initialSelection, loadDirectory, loadRegionInventory]);

  const handleSelectRegion = regionId => {
    const selection = {
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

  const handleSelectCell = (rowLetter, colNumber) => {
    const colValue = String(colNumber);
    const selection = {
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

  const handleSelectPallet = palletId => {
    const palletValue = String(palletId);
    const normalizedPallet = palletValue === NO_PALLET ? "" : palletValue;
    const selection = {
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

  const handleSelectBin = binId => {
    const binValue = String(binId);
    const normalizedPallet = mapPallet === NO_PALLET ? "" : mapPallet;
    const selection = {
      region: mapRegion,
      sectionLetter: mapRow,
      sectionNumber: mapCol,
      pallet: normalizedPallet,
      bin: binValue
    };
    setMapBin(binValue);
    notifySelectionChange(selection);
  };

  const handleBack = () => {
    if (mapStep === "bins") setMapStep("pallets");else if (mapStep === "pallets") setMapStep("grid");else if (mapStep === "grid") setMapStep("regions");
  };

  const handleView = () => {
    if (typeof onView !== "function") return;
    const normalizedPallet = mapPallet === NO_PALLET ? "" : mapPallet;
    onView({
      region: mapRegion,
      sectionLetter: mapRow,
      sectionNumber: mapCol,
      pallet: normalizedPallet,
      bin: mapBin
    });
  };

  return __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"], {
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
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Header, {
    closeButton: true,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 261,
      columnNumber: 7
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Title, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 262,
      columnNumber: 9
    }
  }, "Warehouse Map")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Body, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 264,
      columnNumber: 7
    }
  }, mapLoading && __jsx("div", {
    className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.mapLoading,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 266,
      columnNumber: 11
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Spinner"], {
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
    className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.mapError,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 271,
      columnNumber: 22
    }
  }, mapError), !mapLoading && mapStep === "regions" && __jsx("div", {
    className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.mapStage,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 274,
      columnNumber: 11
    }
  }, __jsx("div", {
    className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.mapHint,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 275,
      columnNumber: 13
    }
  }, "Select a region"), __jsx("div", {
    className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.mapCanvas,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 276,
      columnNumber: 13
    }
  }, REGION_ORDER.map(regionId => __jsx("button", {
    key: regionId,
    type: "button",
    className: `${_WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.regionBlock} ${_WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_3___default.a[`region${regionId}`]}`,
    onClick: () => handleSelectRegion(regionId),
    disabled: Array.isArray(regionOptions) && regionOptions.length > 0 && !regionOptions.includes(regionId),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 278,
      columnNumber: 17
    }
  }, regionId)))), !mapLoading && mapStep === "grid" && __jsx("div", {
    className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.mapStage,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 297,
      columnNumber: 11
    }
  }, __jsx("div", {
    className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.mapHint,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 298,
      columnNumber: 13
    }
  }, "Region ", mapRegion, ": choose a row and column"), (() => {
    const dims = getRegionDimensions(mapRegion);
    const rows = LETTERS.slice(0, dims.rows || 0).reverse();
    const cols = NUMBERS.slice(0, dims.cols || 0);

    if (!rows.length || !cols.length) {
      const sectionKeys = Object.keys(mapCellPallets || {}).filter(Boolean).map(key => {
        const [row, col] = key.split("-");
        return {
          key,
          row,
          col
        };
      }).sort((a, b) => {
        if (a.row === b.row) {
          return Number(a.col) - Number(b.col);
        }

        return b.row.localeCompare(a.row);
      });

      if (!sectionKeys.length) {
        return __jsx("div", {
          className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.mapEmpty,
          __self: this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 321,
            columnNumber: 21
          }
        }, "No grid data for this region.");
      }

      return __jsx("div", {
        className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.gridWrapper,
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 328,
          columnNumber: 19
        }
      }, __jsx("div", {
        className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.mapHint,
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 329,
          columnNumber: 21
        }
      }, "Grid not available. Select an available section below."), __jsx("div", {
        className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.palletGrid,
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 332,
          columnNumber: 21
        }
      }, sectionKeys.map(({
        key,
        row,
        col
      }) => __jsx("button", {
        key: key,
        type: "button",
        className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.palletButton,
        onClick: () => handleSelectCell(row, col),
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 334,
          columnNumber: 25
        }
      }, row, col))));
    }

    return __jsx("div", {
      className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.gridWrapper,
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 349,
        columnNumber: 17
      }
    }, __jsx("div", {
      className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.grid,
      style: {
        "--grid-cols": cols.length
      },
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 350,
        columnNumber: 19
      }
    }, rows.map(row => cols.map(col => {
      var _mapCellPallets$cellK;

      const cellKey = `${row}-${col}`;
      const hasPallets = Boolean((_mapCellPallets$cellK = mapCellPallets[cellKey]) === null || _mapCellPallets$cellK === void 0 ? void 0 : _mapCellPallets$cellK.length);
      return __jsx("button", {
        key: cellKey,
        type: "button",
        className: `${_WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.gridCell} ${hasPallets ? "" : _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.gridCellDisabled}`,
        onClick: () => hasPallets && handleSelectCell(row, col),
        disabled: !hasPallets,
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 361,
          columnNumber: 27
        }
      }, __jsx("span", {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 372,
          columnNumber: 29
        }
      }, row, col));
    }))));
  })()), !mapLoading && mapStep === "pallets" && __jsx("div", {
    className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.mapStage,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 388,
      columnNumber: 11
    }
  }, __jsx("div", {
    className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.mapHint,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 389,
      columnNumber: 13
    }
  }, "Region ", mapRegion, " - Section ", mapRow, mapCol, ": select a pallet"), __jsx("div", {
    className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.palletGrid,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 393,
      columnNumber: 13
    }
  }, (mapCellPallets[`${mapRow}-${mapCol}`] || []).map(pallet => {
    const palletKey = `${mapRow}-${mapCol}-P${pallet}`;
    const bins = mapPalletBins[palletKey] || [];
    return __jsx("button", {
      key: pallet,
      type: "button",
      className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.palletButton,
      onClick: () => {
        if (bins.length === 0 && typeof onView === "function") {
          const selection = {
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
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 398,
        columnNumber: 19
      }
    }, pallet === NO_PALLET ? "No Pallet" : `Pallet ${pallet}`);
  }), !(mapCellPallets[`${mapRow}-${mapCol}`] || []).length && __jsx("div", {
    className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.mapEmpty,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 423,
      columnNumber: 17
    }
  }, "No pallets available here."))), !mapLoading && mapStep === "bins" && __jsx("div", {
    className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.mapStage,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 432,
      columnNumber: 11
    }
  }, __jsx("div", {
    className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.mapHint,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 433,
      columnNumber: 13
    }
  }, "Region ", mapRegion, " - Section ", mapRow, mapCol, " - Pallet ", mapPallet), __jsx("div", {
    className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.palletGrid,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 437,
      columnNumber: 13
    }
  }, (mapPalletBins[`${mapRow}-${mapCol}-P${mapPallet}`] || []).map(bin => __jsx("button", {
    key: bin,
    type: "button",
    className: `${_WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.palletButton} ${_WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.binButton}`,
    onClick: () => handleSelectBin(bin),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 440,
      columnNumber: 19
    }
  }, "Bin ", bin)), !(mapPalletBins[`${mapRow}-${mapCol}-P${mapPallet}`] || []).length && __jsx("div", {
    className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.mapEmpty,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 452,
      columnNumber: 17
    }
  }, "No bins available on this pallet.")))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Footer, {
    className: _WarehouseMapModal_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.mapFooter,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 460,
      columnNumber: 7
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    variant: "outline-secondary",
    onClick: handleBack,
    disabled: mapStep === "regions",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 461,
      columnNumber: 9
    }
  }, "Back"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    variant: "outline-primary",
    onClick: handleView,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 468,
      columnNumber: 9
    }
  }, "View"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
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

/***/ }),

/***/ "./components/WarehouseMapModal.module.css":
/*!*************************************************!*\
  !*** ./components/WarehouseMapModal.module.css ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Exports
module.exports = {
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


/***/ }),

/***/ "./context/AuthUserContext.js":
/*!************************************!*\
  !*** ./context/AuthUserContext.js ***!
  \************************************/
/*! exports provided: AuthUserProvider, useAuth */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthUserProvider", function() { return AuthUserProvider; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useAuth", function() { return useAuth; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _useFirebaseAuth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./useFirebaseAuth */ "./context/useFirebaseAuth.js");
var _jsxFileName = "C:\\Users\\mack2\\Desktop\\code\\context\\AuthUserContext.js";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;


const authUserContext = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["createContext"])({
  authUser: null,
  loading: true,
  signInWithGoogle: async () => {},
  signOut: async () => {}
});
function AuthUserProvider({
  children
}) {
  const auth = Object(_useFirebaseAuth__WEBPACK_IMPORTED_MODULE_1__["default"])();
  return __jsx(authUserContext.Provider, {
    value: auth,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14,
      columnNumber: 5
    }
  }, children);
}
const useAuth = () => Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(authUserContext);

/***/ }),

/***/ "./context/Firebase.js":
/*!*****************************!*\
  !*** ./context/Firebase.js ***!
  \*****************************/
/*! exports provided: auth, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "auth", function() { return auth; });
/* harmony import */ var firebase_compat_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! firebase/compat/app */ "firebase/compat/app");
/* harmony import */ var firebase_compat_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(firebase_compat_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var firebase_compat_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! firebase/compat/auth */ "firebase/compat/auth");
/* harmony import */ var firebase_compat_auth__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(firebase_compat_auth__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var firebase_compat_firestore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! firebase/compat/firestore */ "firebase/compat/firestore");
/* harmony import */ var firebase_compat_firestore__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(firebase_compat_firestore__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var firebase_compat_storage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! firebase/compat/storage */ "firebase/compat/storage");
/* harmony import */ var firebase_compat_storage__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(firebase_compat_storage__WEBPACK_IMPORTED_MODULE_3__);
// // import firebase from "firebase/app"
// import * as firebase from "firebase/app";
// // import "firebase/auth"
// const app = firebase.initializeApp({
//     apiKey: "AIzaSyCxC-a8b5Vhhey8GF47LpXZ1aMKYmiIhwE",
//     authDomain: "magmo-ac10c.firebaseapp.com",
//     projectId: "magmo-ac10c",
//     storageBucket: "magmo-ac10c.appspot.com",
//     messagingSenderId: "177857525147",
//     appId: "1:177857525147:web:ac8e3c87d82396beb1dd3e",
//     measurementId: "G-L0236JT5N3"
// })
// export const auth = app.auth()
// export default app
// apiKey: process.env.REACT_APP_FIREBASE_KEY,
//     authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//     projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//     appId: process.env.REACT_APP_FIREBASE_APP_ID,
//     measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID




const FirebaseCredentials = {
  apiKey: "AIzaSyCxC-a8b5Vhhey8GF47LpXZ1aMKYmiIhwE",
  authDomain: "magmo-ac10c.firebaseapp.com",
  projectId: "magmo-ac10c",
  storageBucket: "magmo-ac10c.appspot.com",
  messagingSenderId: "177857525147",
  appId: "1:177857525147:web:ac8e3c87d82396beb1dd3e",
  measurementId: "G-L0236JT5N3"
}; // if a Firebase instance doesn't exist, create one

if (!firebase_compat_app__WEBPACK_IMPORTED_MODULE_0___default.a.apps.length) {
  firebase_compat_app__WEBPACK_IMPORTED_MODULE_0___default.a.initializeApp(FirebaseCredentials);
} // Some networks/proxies block Firestore's streaming transport.
// Force long polling in the browser to avoid stalled writes/listens.


if (false) {}

const auth = firebase_compat_app__WEBPACK_IMPORTED_MODULE_0___default.a.auth();
/* harmony default export */ __webpack_exports__["default"] = (firebase_compat_app__WEBPACK_IMPORTED_MODULE_0___default.a); // import { initializeApp } from 'firebase/app';
// import { getFirestore, collection, getDocs } from 'firebase/firestore';
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// export default app;

/***/ }),

/***/ "./context/useFirebaseAuth.js":
/*!************************************!*\
  !*** ./context/useFirebaseAuth.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return useFirebaseAuth; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Firebase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Firebase */ "./context/Firebase.js");



const formatAuthUser = user => ({
  uid: user.uid,
  email: user.email
});

function useFirebaseAuth() {
  const {
    0: authUser,
    1: setAuthUser
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null);
  const {
    0: loading,
    1: setLoading
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(true);

  const authStateChanged = async authState => {
    if (!authState) {
      setAuthUser(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    const formattedUser = formatAuthUser(authState);
    setAuthUser(formattedUser);
    setLoading(false);
  };

  const clear = () => {
    setAuthUser(null);
    setLoading(true);
  }; //sign in with google


  const signInWithGoogle = () => {
    const provider = new _Firebase__WEBPACK_IMPORTED_MODULE_1__["default"].auth.GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account"
    });
    return _Firebase__WEBPACK_IMPORTED_MODULE_1__["auth"].signInWithRedirect(provider).catch(error => {
      console.error("Google Sign-In Error:", error);
      throw error;
    });
  };

  const signOut = () => _Firebase__WEBPACK_IMPORTED_MODULE_1__["auth"].signOut().then(clear); // Listen for Firebase auth state changes
  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged(authStateChanged);
  //   return () => unsubscribe();
  // }, []);


  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    let unsubscribe;
    _Firebase__WEBPACK_IMPORTED_MODULE_1__["auth"].setPersistence(_Firebase__WEBPACK_IMPORTED_MODULE_1__["default"].auth.Auth.Persistence.LOCAL).then(() => {
      // Now set up the listener
      unsubscribe = _Firebase__WEBPACK_IMPORTED_MODULE_1__["auth"].onAuthStateChanged(authStateChanged);
    }).catch(error => console.error("Error setting persistence:", error));
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);
  return {
    authUser,
    loading,
    signInWithGoogle,
    signOut
  };
}

/***/ }),

/***/ "./node_modules/next/dist/client/link.js":
/*!***********************************************!*\
  !*** ./node_modules/next/dist/client/link.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireWildcard.js");

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));

var _router = __webpack_require__(/*! ../next-server/lib/router/router */ "./node_modules/next/dist/next-server/lib/router/router.js");

var _router2 = __webpack_require__(/*! ./router */ "./node_modules/next/dist/client/router.js");

var _useIntersection = __webpack_require__(/*! ./use-intersection */ "./node_modules/next/dist/client/use-intersection.js");

const prefetched = {};

function prefetch(router, href, as, options) {
  if (true) return;
  if (!(0, _router.isLocalURL)(href)) return; // Prefetch the JSON page if asked (only in the client)
  // We need to handle a prefetch error here since we may be
  // loading with priority which can reject but we don't
  // want to force navigation since this is only a prefetch

  router.prefetch(href, as, options).catch(err => {
    if (true) {
      // rethrow to show invalid URL errors
      throw err;
    }
  });
  const curLocale = options && typeof options.locale !== 'undefined' ? options.locale : router && router.locale; // Join on an invalid URI character

  prefetched[href + '%' + as + (curLocale ? '%' + curLocale : '')] = true;
}

function isModifiedEvent(event) {
  const {
    target
  } = event.currentTarget;
  return target && target !== '_self' || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || // triggers resource download
  event.nativeEvent && event.nativeEvent.which === 2;
}

function linkClicked(e, router, href, as, replace, shallow, scroll, locale) {
  const {
    nodeName
  } = e.currentTarget;

  if (nodeName === 'A' && (isModifiedEvent(e) || !(0, _router.isLocalURL)(href))) {
    // ignore click for browser’s default behavior
    return;
  }

  e.preventDefault(); //  avoid scroll for urls with anchor refs

  if (scroll == null) {
    scroll = as.indexOf('#') < 0;
  } // replace state instead of push if prop is present


  router[replace ? 'replace' : 'push'](href, as, {
    shallow,
    locale,
    scroll
  });
}

function Link(props) {
  if (true) {
    function createPropError(args) {
      return new Error(`Failed prop type: The prop \`${args.key}\` expects a ${args.expected} in \`<Link>\`, but got \`${args.actual}\` instead.` + (false ? undefined : ''));
    } // TypeScript trick for type-guarding:


    const requiredPropsGuard = {
      href: true
    };
    const requiredProps = Object.keys(requiredPropsGuard);
    requiredProps.forEach(key => {
      if (key === 'href') {
        if (props[key] == null || typeof props[key] !== 'string' && typeof props[key] !== 'object') {
          throw createPropError({
            key,
            expected: '`string` or `object`',
            actual: props[key] === null ? 'null' : typeof props[key]
          });
        }
      } else {
        // TypeScript trick for type-guarding:
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const _ = key;
      }
    }); // TypeScript trick for type-guarding:

    const optionalPropsGuard = {
      as: true,
      replace: true,
      scroll: true,
      shallow: true,
      passHref: true,
      prefetch: true,
      locale: true
    };
    const optionalProps = Object.keys(optionalPropsGuard);
    optionalProps.forEach(key => {
      const valType = typeof props[key];

      if (key === 'as') {
        if (props[key] && valType !== 'string' && valType !== 'object') {
          throw createPropError({
            key,
            expected: '`string` or `object`',
            actual: valType
          });
        }
      } else if (key === 'locale') {
        if (props[key] && valType !== 'string') {
          throw createPropError({
            key,
            expected: '`string`',
            actual: valType
          });
        }
      } else if (key === 'replace' || key === 'scroll' || key === 'shallow' || key === 'passHref' || key === 'prefetch') {
        if (props[key] != null && valType !== 'boolean') {
          throw createPropError({
            key,
            expected: '`boolean`',
            actual: valType
          });
        }
      } else {
        // TypeScript trick for type-guarding:
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const _ = key;
      }
    }); // This hook is in a conditional but that is ok because `process.env.NODE_ENV` never changes
    // eslint-disable-next-line react-hooks/rules-of-hooks

    const hasWarned = _react.default.useRef(false);

    if (props.prefetch && !hasWarned.current) {
      hasWarned.current = true;
      console.warn('Next.js auto-prefetches automatically based on viewport. The prefetch attribute is no longer needed. More: https://nextjs.org/docs/messages/prefetch-true-deprecated');
    }
  }

  const p = props.prefetch !== false;
  const router = (0, _router2.useRouter)();
  const pathname = router && router.asPath || '/';

  const {
    href,
    as
  } = _react.default.useMemo(() => {
    const [resolvedHref, resolvedAs] = (0, _router.resolveHref)(pathname, props.href, true);
    return {
      href: resolvedHref,
      as: props.as ? (0, _router.resolveHref)(pathname, props.as) : resolvedAs || resolvedHref
    };
  }, [pathname, props.href, props.as]);

  let {
    children,
    replace,
    shallow,
    scroll,
    locale
  } = props; // Deprecated. Warning shown by propType check. If the children provided is a string (<Link>example</Link>) we wrap it in an <a> tag

  if (typeof children === 'string') {
    children = /*#__PURE__*/_react.default.createElement("a", null, children);
  } // This will return the first child, if multiple are provided it will throw an error


  const child = _react.Children.only(children);

  const childRef = child && typeof child === 'object' && child.ref;
  const [setIntersectionRef, isVisible] = (0, _useIntersection.useIntersection)({
    rootMargin: '200px'
  });

  const setRef = _react.default.useCallback(el => {
    setIntersectionRef(el);

    if (childRef) {
      if (typeof childRef === 'function') childRef(el);else if (typeof childRef === 'object') {
        childRef.current = el;
      }
    }
  }, [childRef, setIntersectionRef]);

  (0, _react.useEffect)(() => {
    const shouldPrefetch = isVisible && p && (0, _router.isLocalURL)(href);
    const curLocale = typeof locale !== 'undefined' ? locale : router && router.locale;
    const isPrefetched = prefetched[href + '%' + as + (curLocale ? '%' + curLocale : '')];

    if (shouldPrefetch && !isPrefetched) {
      prefetch(router, href, as, {
        locale: curLocale
      });
    }
  }, [as, href, isVisible, locale, p, router]);
  const childProps = {
    ref: setRef,
    onClick: e => {
      if (child.props && typeof child.props.onClick === 'function') {
        child.props.onClick(e);
      }

      if (!e.defaultPrevented) {
        linkClicked(e, router, href, as, replace, shallow, scroll, locale);
      }
    }
  };

  childProps.onMouseEnter = e => {
    if (!(0, _router.isLocalURL)(href)) return;

    if (child.props && typeof child.props.onMouseEnter === 'function') {
      child.props.onMouseEnter(e);
    }

    prefetch(router, href, as, {
      priority: true
    });
  }; // If child is an <a> tag and doesn't have a href attribute, or if the 'passHref' property is
  // defined, we specify the current 'href', so that repetition is not needed by the user


  if (props.passHref || child.type === 'a' && !('href' in child.props)) {
    const curLocale = typeof locale !== 'undefined' ? locale : router && router.locale; // we only render domain locales if we are currently on a domain locale
    // so that locale links are still visitable in development/preview envs

    const localeDomain = router && router.isLocaleDomain && (0, _router.getDomainLocale)(as, curLocale, router && router.locales, router && router.domainLocales);
    childProps.href = localeDomain || (0, _router.addBasePath)((0, _router.addLocale)(as, curLocale, router && router.defaultLocale));
  }

  return /*#__PURE__*/_react.default.cloneElement(child, childProps);
}

var _default = Link;
exports.default = _default;

/***/ }),

/***/ "./node_modules/next/dist/client/normalize-trailing-slash.js":
/*!*******************************************************************!*\
  !*** ./node_modules/next/dist/client/normalize-trailing-slash.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.removePathTrailingSlash = removePathTrailingSlash;
exports.normalizePathTrailingSlash = void 0;
/**
* Removes the trailing slash of a path if there is one. Preserves the root path `/`.
*/

function removePathTrailingSlash(path) {
  return path.endsWith('/') && path !== '/' ? path.slice(0, -1) : path;
}
/**
* Normalizes the trailing slash of a path according to the `trailingSlash` option
* in `next.config.js`.
*/


const normalizePathTrailingSlash =  false ? undefined : removePathTrailingSlash;
exports.normalizePathTrailingSlash = normalizePathTrailingSlash;

/***/ }),

/***/ "./node_modules/next/dist/client/request-idle-callback.js":
/*!****************************************************************!*\
  !*** ./node_modules/next/dist/client/request-idle-callback.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.cancelIdleCallback = exports.requestIdleCallback = void 0;

const requestIdleCallback = typeof self !== 'undefined' && self.requestIdleCallback || function (cb) {
  let start = Date.now();
  return setTimeout(function () {
    cb({
      didTimeout: false,
      timeRemaining: function () {
        return Math.max(0, 50 - (Date.now() - start));
      }
    });
  }, 1);
};

exports.requestIdleCallback = requestIdleCallback;

const cancelIdleCallback = typeof self !== 'undefined' && self.cancelIdleCallback || function (id) {
  return clearTimeout(id);
};

exports.cancelIdleCallback = cancelIdleCallback;

/***/ }),

/***/ "./node_modules/next/dist/client/route-loader.js":
/*!*******************************************************!*\
  !*** ./node_modules/next/dist/client/route-loader.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

exports.__esModule = true;
exports.markAssetError = markAssetError;
exports.isAssetError = isAssetError;
exports.getClientBuildManifest = getClientBuildManifest;
exports.default = void 0;

var _getAssetPathFromRoute = _interopRequireDefault(__webpack_require__(/*! ../next-server/lib/router/utils/get-asset-path-from-route */ "../next-server/lib/router/utils/get-asset-path-from-route"));

var _requestIdleCallback = __webpack_require__(/*! ./request-idle-callback */ "./node_modules/next/dist/client/request-idle-callback.js"); // 3.8s was arbitrarily chosen as it's what https://web.dev/interactive
// considers as "Good" time-to-interactive. We must assume something went
// wrong beyond this point, and then fall-back to a full page transition to
// show the user something of value.


const MS_MAX_IDLE_DELAY = 3800;

function withFuture(key, map, generator) {
  let entry = map.get(key);

  if (entry) {
    if ('future' in entry) {
      return entry.future;
    }

    return Promise.resolve(entry);
  }

  let resolver;
  const prom = new Promise(resolve => {
    resolver = resolve;
  });
  map.set(key, entry = {
    resolve: resolver,
    future: prom
  });
  return generator ? // eslint-disable-next-line no-sequences
  generator().then(value => (resolver(value), value)) : prom;
}

function hasPrefetch(link) {
  try {
    link = document.createElement('link');
    return (// detect IE11 since it supports prefetch but isn't detected
      // with relList.support
      !!window.MSInputMethodContext && !!document.documentMode || link.relList.supports('prefetch')
    );
  } catch (_unused) {
    return false;
  }
}

const canPrefetch = hasPrefetch();

function prefetchViaDom(href, as, link) {
  return new Promise((res, rej) => {
    if (document.querySelector(`link[rel="prefetch"][href^="${href}"]`)) {
      return res();
    }

    link = document.createElement('link'); // The order of property assignment here is intentional:

    if (as) link.as = as;
    link.rel = `prefetch`;
    link.crossOrigin = undefined;
    link.onload = res;
    link.onerror = rej; // `href` should always be last:

    link.href = href;
    document.head.appendChild(link);
  });
}

const ASSET_LOAD_ERROR = Symbol('ASSET_LOAD_ERROR'); // TODO: unexport

function markAssetError(err) {
  return Object.defineProperty(err, ASSET_LOAD_ERROR, {});
}

function isAssetError(err) {
  return err && ASSET_LOAD_ERROR in err;
}

function appendScript(src, script) {
  return new Promise((resolve, reject) => {
    script = document.createElement('script'); // The order of property assignment here is intentional.
    // 1. Setup success/failure hooks in case the browser synchronously
    //    executes when `src` is set.

    script.onload = resolve;

    script.onerror = () => reject(markAssetError(new Error(`Failed to load script: ${src}`))); // 2. Configure the cross-origin attribute before setting `src` in case the
    //    browser begins to fetch.


    script.crossOrigin = undefined; // 3. Finally, set the source and inject into the DOM in case the child
    //    must be appended for fetching to start.

    script.src = src;
    document.body.appendChild(script);
  });
} // Resolve a promise that times out after given amount of milliseconds.


function resolvePromiseWithTimeout(p, ms, err) {
  return new Promise((resolve, reject) => {
    let cancelled = false;
    p.then(r => {
      // Resolved, cancel the timeout
      cancelled = true;
      resolve(r);
    }).catch(reject);
    (0, _requestIdleCallback.requestIdleCallback)(() => setTimeout(() => {
      if (!cancelled) {
        reject(err);
      }
    }, ms));
  });
} // TODO: stop exporting or cache the failure
// It'd be best to stop exporting this. It's an implementation detail. We're
// only exporting it for backwards compatibilty with the `page-loader`.
// Only cache this response as a last resort if we cannot eliminate all other
// code branches that use the Build Manifest Callback and push them through
// the Route Loader interface.


function getClientBuildManifest() {
  if (self.__BUILD_MANIFEST) {
    return Promise.resolve(self.__BUILD_MANIFEST);
  }

  const onBuildManifest = new Promise(resolve => {
    // Mandatory because this is not concurrent safe:
    const cb = self.__BUILD_MANIFEST_CB;

    self.__BUILD_MANIFEST_CB = () => {
      resolve(self.__BUILD_MANIFEST);
      cb && cb();
    };
  });
  return resolvePromiseWithTimeout(onBuildManifest, MS_MAX_IDLE_DELAY, markAssetError(new Error('Failed to load client build manifest')));
}

function getFilesForRoute(assetPrefix, route) {
  if (true) {
    return Promise.resolve({
      scripts: [assetPrefix + '/_next/static/chunks/pages' + encodeURI((0, _getAssetPathFromRoute.default)(route, '.js'))],
      // Styles are handled by `style-loader` in development:
      css: []
    });
  }

  return getClientBuildManifest().then(manifest => {
    if (!(route in manifest)) {
      throw markAssetError(new Error(`Failed to lookup route: ${route}`));
    }

    const allFiles = manifest[route].map(entry => assetPrefix + '/_next/' + encodeURI(entry));
    return {
      scripts: allFiles.filter(v => v.endsWith('.js')),
      css: allFiles.filter(v => v.endsWith('.css'))
    };
  });
}

function createRouteLoader(assetPrefix) {
  const entrypoints = new Map();
  const loadedScripts = new Map();
  const styleSheets = new Map();
  const routes = new Map();

  function maybeExecuteScript(src) {
    let prom = loadedScripts.get(src);

    if (prom) {
      return prom;
    } // Skip executing script if it's already in the DOM:


    if (document.querySelector(`script[src^="${src}"]`)) {
      return Promise.resolve();
    }

    loadedScripts.set(src, prom = appendScript(src));
    return prom;
  }

  function fetchStyleSheet(href) {
    let prom = styleSheets.get(href);

    if (prom) {
      return prom;
    }

    styleSheets.set(href, prom = fetch(href).then(res => {
      if (!res.ok) {
        throw new Error(`Failed to load stylesheet: ${href}`);
      }

      return res.text().then(text => ({
        href: href,
        content: text
      }));
    }).catch(err => {
      throw markAssetError(err);
    }));
    return prom;
  }

  return {
    whenEntrypoint(route) {
      return withFuture(route, entrypoints);
    },

    onEntrypoint(route, execute) {
      Promise.resolve(execute).then(fn => fn()).then(exports => ({
        component: exports && exports.default || exports,
        exports: exports
      }), err => ({
        error: err
      })).then(input => {
        const old = entrypoints.get(route);
        entrypoints.set(route, input);
        if (old && 'resolve' in old) old.resolve(input);
      });
    },

    loadRoute(route, prefetch) {
      return withFuture(route, routes, () => {
        return resolvePromiseWithTimeout(getFilesForRoute(assetPrefix, route).then(({
          scripts,
          css
        }) => {
          return Promise.all([entrypoints.has(route) ? [] : Promise.all(scripts.map(maybeExecuteScript)), Promise.all(css.map(fetchStyleSheet))]);
        }).then(res => {
          return this.whenEntrypoint(route).then(entrypoint => ({
            entrypoint,
            styles: res[1]
          }));
        }), MS_MAX_IDLE_DELAY, markAssetError(new Error(`Route did not complete loading: ${route}`))).then(({
          entrypoint,
          styles
        }) => {
          const res = Object.assign({
            styles: styles
          }, entrypoint);
          return 'error' in entrypoint ? entrypoint : res;
        }).catch(err => {
          if (prefetch) {
            // we don't want to cache errors during prefetch
            throw err;
          }

          return {
            error: err
          };
        });
      });
    },

    prefetch(route) {
      // https://github.com/GoogleChromeLabs/quicklink/blob/453a661fa1fa940e2d2e044452398e38c67a98fb/src/index.mjs#L115-L118
      // License: Apache 2.0
      let cn;

      if (cn = navigator.connection) {
        // Don't prefetch if using 2G or if Save-Data is enabled.
        if (cn.saveData || /2g/.test(cn.effectiveType)) return Promise.resolve();
      }

      return getFilesForRoute(assetPrefix, route).then(output => Promise.all(canPrefetch ? output.scripts.map(script => prefetchViaDom(script, 'script')) : [])).then(() => {
        (0, _requestIdleCallback.requestIdleCallback)(() => this.loadRoute(route, true).catch(() => {}));
      }).catch( // swallow prefetch errors
      () => {});
    }

  };
}

var _default = createRouteLoader;
exports.default = _default;

/***/ }),

/***/ "./node_modules/next/dist/client/router.js":
/*!*************************************************!*\
  !*** ./node_modules/next/dist/client/router.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireWildcard.js");

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

exports.__esModule = true;
exports.useRouter = useRouter;
exports.makePublicRouterInstance = makePublicRouterInstance;
exports.createRouter = exports.withRouter = exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _router2 = _interopRequireWildcard(__webpack_require__(/*! ../next-server/lib/router/router */ "./node_modules/next/dist/next-server/lib/router/router.js"));

exports.Router = _router2.default;
exports.NextRouter = _router2.NextRouter;

var _routerContext = __webpack_require__(/*! ../next-server/lib/router-context */ "../next-server/lib/router-context");

var _withRouter = _interopRequireDefault(__webpack_require__(/*! ./with-router */ "./node_modules/next/dist/client/with-router.js"));

exports.withRouter = _withRouter.default;
/* global window */

const singletonRouter = {
  router: null,
  // holds the actual router instance
  readyCallbacks: [],

  ready(cb) {
    if (this.router) return cb();

    if (false) {}
  }

}; // Create public properties and methods of the router in the singletonRouter

const urlPropertyFields = ['pathname', 'route', 'query', 'asPath', 'components', 'isFallback', 'basePath', 'locale', 'locales', 'defaultLocale', 'isReady', 'isPreview', 'isLocaleDomain'];
const routerEvents = ['routeChangeStart', 'beforeHistoryChange', 'routeChangeComplete', 'routeChangeError', 'hashChangeStart', 'hashChangeComplete'];
const coreMethodFields = ['push', 'replace', 'reload', 'back', 'prefetch', 'beforePopState']; // Events is a static property on the router, the router doesn't have to be initialized to use it

Object.defineProperty(singletonRouter, 'events', {
  get() {
    return _router2.default.events;
  }

});
urlPropertyFields.forEach(field => {
  // Here we need to use Object.defineProperty because, we need to return
  // the property assigned to the actual router
  // The value might get changed as we change routes and this is the
  // proper way to access it
  Object.defineProperty(singletonRouter, field, {
    get() {
      const router = getRouter();
      return router[field];
    }

  });
});
coreMethodFields.forEach(field => {
  // We don't really know the types here, so we add them later instead
  ;

  singletonRouter[field] = (...args) => {
    const router = getRouter();
    return router[field](...args);
  };
});
routerEvents.forEach(event => {
  singletonRouter.ready(() => {
    _router2.default.events.on(event, (...args) => {
      const eventField = `on${event.charAt(0).toUpperCase()}${event.substring(1)}`;
      const _singletonRouter = singletonRouter;

      if (_singletonRouter[eventField]) {
        try {
          _singletonRouter[eventField](...args);
        } catch (err) {
          console.error(`Error when running the Router event: ${eventField}`);
          console.error(`${err.message}\n${err.stack}`);
        }
      }
    });
  });
});

function getRouter() {
  if (!singletonRouter.router) {
    const message = 'No router instance found.\n' + 'You should only use "next/router" inside the client side of your app.\n';
    throw new Error(message);
  }

  return singletonRouter.router;
} // Export the singletonRouter and this is the public API.


var _default = singletonRouter; // Reexport the withRoute HOC

exports.default = _default;

function useRouter() {
  return _react.default.useContext(_routerContext.RouterContext);
} // INTERNAL APIS
// -------------
// (do not use following exports inside the app)
// Create a router and assign it as the singleton instance.
// This is used in client side when we are initilizing the app.
// This should **not** use inside the server.


const createRouter = (...args) => {
  singletonRouter.router = new _router2.default(...args);
  singletonRouter.readyCallbacks.forEach(cb => cb());
  singletonRouter.readyCallbacks = [];
  return singletonRouter.router;
}; // This function is used to create the `withRouter` router instance


exports.createRouter = createRouter;

function makePublicRouterInstance(router) {
  const _router = router;
  const instance = {};

  for (const property of urlPropertyFields) {
    if (typeof _router[property] === 'object') {
      instance[property] = Object.assign(Array.isArray(_router[property]) ? [] : {}, _router[property]); // makes sure query is not stateful

      continue;
    }

    instance[property] = _router[property];
  } // Events is a static property on the router, the router doesn't have to be initialized to use it


  instance.events = _router2.default.events;
  coreMethodFields.forEach(field => {
    instance[field] = (...args) => {
      return _router[field](...args);
    };
  });
  return instance;
}

/***/ }),

/***/ "./node_modules/next/dist/client/use-intersection.js":
/*!***********************************************************!*\
  !*** ./node_modules/next/dist/client/use-intersection.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.useIntersection = useIntersection;

var _react = __webpack_require__(/*! react */ "react");

var _requestIdleCallback = __webpack_require__(/*! ./request-idle-callback */ "./node_modules/next/dist/client/request-idle-callback.js");

const hasIntersectionObserver = typeof IntersectionObserver !== 'undefined';

function useIntersection({
  rootMargin,
  disabled
}) {
  const isDisabled = disabled || !hasIntersectionObserver;
  const unobserve = (0, _react.useRef)();
  const [visible, setVisible] = (0, _react.useState)(false);
  const setRef = (0, _react.useCallback)(el => {
    if (unobserve.current) {
      unobserve.current();
      unobserve.current = undefined;
    }

    if (isDisabled || visible) return;

    if (el && el.tagName) {
      unobserve.current = observe(el, isVisible => isVisible && setVisible(isVisible), {
        rootMargin
      });
    }
  }, [isDisabled, rootMargin, visible]);
  (0, _react.useEffect)(() => {
    if (!hasIntersectionObserver) {
      if (!visible) {
        const idleCallback = (0, _requestIdleCallback.requestIdleCallback)(() => setVisible(true));
        return () => (0, _requestIdleCallback.cancelIdleCallback)(idleCallback);
      }
    }
  }, [visible]);
  return [setRef, visible];
}

function observe(element, callback, options) {
  const {
    id,
    observer,
    elements
  } = createObserver(options);
  elements.set(element, callback);
  observer.observe(element);
  return function unobserve() {
    elements.delete(element);
    observer.unobserve(element); // Destroy observer when there's nothing left to watch:

    if (elements.size === 0) {
      observer.disconnect();
      observers.delete(id);
    }
  };
}

const observers = new Map();

function createObserver(options) {
  const id = options.rootMargin || '';
  let instance = observers.get(id);

  if (instance) {
    return instance;
  }

  const elements = new Map();
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const callback = elements.get(entry.target);
      const isVisible = entry.isIntersecting || entry.intersectionRatio > 0;

      if (callback && isVisible) {
        callback(isVisible);
      }
    });
  }, options);
  observers.set(id, instance = {
    id,
    observer,
    elements
  });
  return instance;
}

/***/ }),

/***/ "./node_modules/next/dist/client/with-router.js":
/*!******************************************************!*\
  !*** ./node_modules/next/dist/client/with-router.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

exports.__esModule = true;
exports.default = withRouter;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _router = __webpack_require__(/*! ./router */ "./node_modules/next/dist/client/router.js");

function withRouter(ComposedComponent) {
  function WithRouterWrapper(props) {
    return /*#__PURE__*/_react.default.createElement(ComposedComponent, Object.assign({
      router: (0, _router.useRouter)()
    }, props));
  }

  WithRouterWrapper.getInitialProps = ComposedComponent.getInitialProps // This is needed to allow checking for custom getInitialProps in _app
  ;
  WithRouterWrapper.origGetInitialProps = ComposedComponent.origGetInitialProps;

  if (true) {
    const name = ComposedComponent.displayName || ComposedComponent.name || 'Unknown';
    WithRouterWrapper.displayName = `withRouter(${name})`;
  }

  return WithRouterWrapper;
}

/***/ }),

/***/ "./node_modules/next/dist/compiled/path-to-regexp/index.js":
/*!*****************************************!*\
  !*** (webpack)/path-to-regexp/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Tokenize input string.
 */
function lexer(str) {
    var tokens = [];
    var i = 0;
    while (i < str.length) {
        var char = str[i];
        if (char === "*" || char === "+" || char === "?") {
            tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
            continue;
        }
        if (char === "\\") {
            tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
            continue;
        }
        if (char === "{") {
            tokens.push({ type: "OPEN", index: i, value: str[i++] });
            continue;
        }
        if (char === "}") {
            tokens.push({ type: "CLOSE", index: i, value: str[i++] });
            continue;
        }
        if (char === ":") {
            var name = "";
            var j = i + 1;
            while (j < str.length) {
                var code = str.charCodeAt(j);
                if (
                // `0-9`
                (code >= 48 && code <= 57) ||
                    // `A-Z`
                    (code >= 65 && code <= 90) ||
                    // `a-z`
                    (code >= 97 && code <= 122) ||
                    // `_`
                    code === 95) {
                    name += str[j++];
                    continue;
                }
                break;
            }
            if (!name)
                throw new TypeError("Missing parameter name at " + i);
            tokens.push({ type: "NAME", index: i, value: name });
            i = j;
            continue;
        }
        if (char === "(") {
            var count = 1;
            var pattern = "";
            var j = i + 1;
            if (str[j] === "?") {
                throw new TypeError("Pattern cannot start with \"?\" at " + j);
            }
            while (j < str.length) {
                if (str[j] === "\\") {
                    pattern += str[j++] + str[j++];
                    continue;
                }
                if (str[j] === ")") {
                    count--;
                    if (count === 0) {
                        j++;
                        break;
                    }
                }
                else if (str[j] === "(") {
                    count++;
                    if (str[j + 1] !== "?") {
                        throw new TypeError("Capturing groups are not allowed at " + j);
                    }
                }
                pattern += str[j++];
            }
            if (count)
                throw new TypeError("Unbalanced pattern at " + i);
            if (!pattern)
                throw new TypeError("Missing pattern at " + i);
            tokens.push({ type: "PATTERN", index: i, value: pattern });
            i = j;
            continue;
        }
        tokens.push({ type: "CHAR", index: i, value: str[i++] });
    }
    tokens.push({ type: "END", index: i, value: "" });
    return tokens;
}
/**
 * Parse a string for the raw tokens.
 */
function parse(str, options) {
    if (options === void 0) { options = {}; }
    var tokens = lexer(str);
    var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a;
    var defaultPattern = "[^" + escapeString(options.delimiter || "/#?") + "]+?";
    var result = [];
    var key = 0;
    var i = 0;
    var path = "";
    var tryConsume = function (type) {
        if (i < tokens.length && tokens[i].type === type)
            return tokens[i++].value;
    };
    var mustConsume = function (type) {
        var value = tryConsume(type);
        if (value !== undefined)
            return value;
        var _a = tokens[i], nextType = _a.type, index = _a.index;
        throw new TypeError("Unexpected " + nextType + " at " + index + ", expected " + type);
    };
    var consumeText = function () {
        var result = "";
        var value;
        // tslint:disable-next-line
        while ((value = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR"))) {
            result += value;
        }
        return result;
    };
    while (i < tokens.length) {
        var char = tryConsume("CHAR");
        var name = tryConsume("NAME");
        var pattern = tryConsume("PATTERN");
        if (name || pattern) {
            var prefix = char || "";
            if (prefixes.indexOf(prefix) === -1) {
                path += prefix;
                prefix = "";
            }
            if (path) {
                result.push(path);
                path = "";
            }
            result.push({
                name: name || key++,
                prefix: prefix,
                suffix: "",
                pattern: pattern || defaultPattern,
                modifier: tryConsume("MODIFIER") || ""
            });
            continue;
        }
        var value = char || tryConsume("ESCAPED_CHAR");
        if (value) {
            path += value;
            continue;
        }
        if (path) {
            result.push(path);
            path = "";
        }
        var open = tryConsume("OPEN");
        if (open) {
            var prefix = consumeText();
            var name_1 = tryConsume("NAME") || "";
            var pattern_1 = tryConsume("PATTERN") || "";
            var suffix = consumeText();
            mustConsume("CLOSE");
            result.push({
                name: name_1 || (pattern_1 ? key++ : ""),
                pattern: name_1 && !pattern_1 ? defaultPattern : pattern_1,
                prefix: prefix,
                suffix: suffix,
                modifier: tryConsume("MODIFIER") || ""
            });
            continue;
        }
        mustConsume("END");
    }
    return result;
}
exports.parse = parse;
/**
 * Compile a string to a template function for the path.
 */
function compile(str, options) {
    return tokensToFunction(parse(str, options), options);
}
exports.compile = compile;
/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction(tokens, options) {
    if (options === void 0) { options = {}; }
    var reFlags = flags(options);
    var _a = options.encode, encode = _a === void 0 ? function (x) { return x; } : _a, _b = options.validate, validate = _b === void 0 ? true : _b;
    // Compile all the tokens into regexps.
    var matches = tokens.map(function (token) {
        if (typeof token === "object") {
            return new RegExp("^(?:" + token.pattern + ")$", reFlags);
        }
    });
    return function (data) {
        var path = "";
        for (var i = 0; i < tokens.length; i++) {
            var token = tokens[i];
            if (typeof token === "string") {
                path += token;
                continue;
            }
            var value = data ? data[token.name] : undefined;
            var optional = token.modifier === "?" || token.modifier === "*";
            var repeat = token.modifier === "*" || token.modifier === "+";
            if (Array.isArray(value)) {
                if (!repeat) {
                    throw new TypeError("Expected \"" + token.name + "\" to not repeat, but got an array");
                }
                if (value.length === 0) {
                    if (optional)
                        continue;
                    throw new TypeError("Expected \"" + token.name + "\" to not be empty");
                }
                for (var j = 0; j < value.length; j++) {
                    var segment = encode(value[j], token);
                    if (validate && !matches[i].test(segment)) {
                        throw new TypeError("Expected all \"" + token.name + "\" to match \"" + token.pattern + "\", but got \"" + segment + "\"");
                    }
                    path += token.prefix + segment + token.suffix;
                }
                continue;
            }
            if (typeof value === "string" || typeof value === "number") {
                var segment = encode(String(value), token);
                if (validate && !matches[i].test(segment)) {
                    throw new TypeError("Expected \"" + token.name + "\" to match \"" + token.pattern + "\", but got \"" + segment + "\"");
                }
                path += token.prefix + segment + token.suffix;
                continue;
            }
            if (optional)
                continue;
            var typeOfMessage = repeat ? "an array" : "a string";
            throw new TypeError("Expected \"" + token.name + "\" to be " + typeOfMessage);
        }
        return path;
    };
}
exports.tokensToFunction = tokensToFunction;
/**
 * Create path match function from `path-to-regexp` spec.
 */
function match(str, options) {
    var keys = [];
    var re = pathToRegexp(str, keys, options);
    return regexpToFunction(re, keys, options);
}
exports.match = match;
/**
 * Create a path match function from `path-to-regexp` output.
 */
function regexpToFunction(re, keys, options) {
    if (options === void 0) { options = {}; }
    var _a = options.decode, decode = _a === void 0 ? function (x) { return x; } : _a;
    return function (pathname) {
        var m = re.exec(pathname);
        if (!m)
            return false;
        var path = m[0], index = m.index;
        var params = Object.create(null);
        var _loop_1 = function (i) {
            // tslint:disable-next-line
            if (m[i] === undefined)
                return "continue";
            var key = keys[i - 1];
            if (key.modifier === "*" || key.modifier === "+") {
                params[key.name] = m[i].split(key.prefix + key.suffix).map(function (value) {
                    return decode(value, key);
                });
            }
            else {
                params[key.name] = decode(m[i], key);
            }
        };
        for (var i = 1; i < m.length; i++) {
            _loop_1(i);
        }
        return { path: path, index: index, params: params };
    };
}
exports.regexpToFunction = regexpToFunction;
/**
 * Escape a regular expression string.
 */
function escapeString(str) {
    return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
/**
 * Get the flags for a regexp from the options.
 */
function flags(options) {
    return options && options.sensitive ? "" : "i";
}
/**
 * Pull out keys from a regexp.
 */
function regexpToRegexp(path, keys) {
    if (!keys)
        return path;
    // Use a negative lookahead to match only capturing groups.
    var groups = path.source.match(/\((?!\?)/g);
    if (groups) {
        for (var i = 0; i < groups.length; i++) {
            keys.push({
                name: i,
                prefix: "",
                suffix: "",
                modifier: "",
                pattern: ""
            });
        }
    }
    return path;
}
/**
 * Transform an array into a regexp.
 */
function arrayToRegexp(paths, keys, options) {
    var parts = paths.map(function (path) { return pathToRegexp(path, keys, options).source; });
    return new RegExp("(?:" + parts.join("|") + ")", flags(options));
}
/**
 * Create a path regexp from string input.
 */
function stringToRegexp(path, keys, options) {
    return tokensToRegexp(parse(path, options), keys, options);
}
/**
 * Expose a function for taking tokens and returning a RegExp.
 */
function tokensToRegexp(tokens, keys, options) {
    if (options === void 0) { options = {}; }
    var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function (x) { return x; } : _d;
    var endsWith = "[" + escapeString(options.endsWith || "") + "]|$";
    var delimiter = "[" + escapeString(options.delimiter || "/#?") + "]";
    var route = start ? "^" : "";
    // Iterate over the tokens and create our regexp string.
    for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
        var token = tokens_1[_i];
        if (typeof token === "string") {
            route += escapeString(encode(token));
        }
        else {
            var prefix = escapeString(encode(token.prefix));
            var suffix = escapeString(encode(token.suffix));
            if (token.pattern) {
                if (keys)
                    keys.push(token);
                if (prefix || suffix) {
                    if (token.modifier === "+" || token.modifier === "*") {
                        var mod = token.modifier === "*" ? "?" : "";
                        route += "(?:" + prefix + "((?:" + token.pattern + ")(?:" + suffix + prefix + "(?:" + token.pattern + "))*)" + suffix + ")" + mod;
                    }
                    else {
                        route += "(?:" + prefix + "(" + token.pattern + ")" + suffix + ")" + token.modifier;
                    }
                }
                else {
                    route += "(" + token.pattern + ")" + token.modifier;
                }
            }
            else {
                route += "(?:" + prefix + suffix + ")" + token.modifier;
            }
        }
    }
    if (end) {
        if (!strict)
            route += delimiter + "?";
        route += !options.endsWith ? "$" : "(?=" + endsWith + ")";
    }
    else {
        var endToken = tokens[tokens.length - 1];
        var isEndDelimited = typeof endToken === "string"
            ? delimiter.indexOf(endToken[endToken.length - 1]) > -1
            : // tslint:disable-next-line
                endToken === undefined;
        if (!strict) {
            route += "(?:" + delimiter + "(?=" + endsWith + "))?";
        }
        if (!isEndDelimited) {
            route += "(?=" + delimiter + "|" + endsWith + ")";
        }
    }
    return new RegExp(route, flags(options));
}
exports.tokensToRegexp = tokensToRegexp;
/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 */
function pathToRegexp(path, keys, options) {
    if (path instanceof RegExp)
        return regexpToRegexp(path, keys);
    if (Array.isArray(path))
        return arrayToRegexp(path, keys, options);
    return stringToRegexp(path, keys, options);
}
exports.pathToRegexp = pathToRegexp;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/next/dist/next-server/lib/i18n/normalize-locale-path.js":
/*!******************************************************************************!*\
  !*** ./node_modules/next/dist/next-server/lib/i18n/normalize-locale-path.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.normalizeLocalePath = normalizeLocalePath;

function normalizeLocalePath(pathname, locales) {
  let detectedLocale; // first item will be empty string from splitting at first char

  const pathnameParts = pathname.split('/');
  (locales || []).some(locale => {
    if (pathnameParts[1].toLowerCase() === locale.toLowerCase()) {
      detectedLocale = locale;
      pathnameParts.splice(1, 1);
      pathname = pathnameParts.join('/') || '/';
      return true;
    }

    return false;
  });
  return {
    pathname,
    detectedLocale
  };
}

/***/ }),

/***/ "./node_modules/next/dist/next-server/lib/mitt.js":
/*!********************************************************!*\
  !*** ./node_modules/next/dist/next-server/lib/mitt.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = mitt;
/*
MIT License
Copyright (c) Jason Miller (https://jasonformat.com/)
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
// This file is based on https://github.com/developit/mitt/blob/v1.1.3/src/index.js
// It's been edited for the needs of this script
// See the LICENSE at the top of the file

function mitt() {
  const all = Object.create(null);
  return {
    on(type, handler) {
      ;
      (all[type] || (all[type] = [])).push(handler);
    },

    off(type, handler) {
      if (all[type]) {
        all[type].splice(all[type].indexOf(handler) >>> 0, 1);
      }
    },

    emit(type, ...evts) {
      // eslint-disable-next-line array-callback-return
      ;
      (all[type] || []).slice().map(handler => {
        handler(...evts);
      });
    }

  };
}

/***/ }),

/***/ "./node_modules/next/dist/next-server/lib/router/router.js":
/*!*****************************************************************!*\
  !*** ./node_modules/next/dist/next-server/lib/router/router.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.getDomainLocale = getDomainLocale;
exports.addLocale = addLocale;
exports.delLocale = delLocale;
exports.hasBasePath = hasBasePath;
exports.addBasePath = addBasePath;
exports.delBasePath = delBasePath;
exports.isLocalURL = isLocalURL;
exports.interpolateAs = interpolateAs;
exports.resolveHref = resolveHref;
exports.default = void 0;

var _normalizeTrailingSlash = __webpack_require__(/*! ../../../client/normalize-trailing-slash */ "./node_modules/next/dist/client/normalize-trailing-slash.js");

var _routeLoader = __webpack_require__(/*! ../../../client/route-loader */ "./node_modules/next/dist/client/route-loader.js");

var _denormalizePagePath = __webpack_require__(/*! ../../server/denormalize-page-path */ "./node_modules/next/dist/next-server/server/denormalize-page-path.js");

var _normalizeLocalePath = __webpack_require__(/*! ../i18n/normalize-locale-path */ "./node_modules/next/dist/next-server/lib/i18n/normalize-locale-path.js");

var _mitt = _interopRequireDefault(__webpack_require__(/*! ../mitt */ "./node_modules/next/dist/next-server/lib/mitt.js"));

var _utils = __webpack_require__(/*! ../utils */ "./node_modules/next/dist/next-server/lib/utils.js");

var _isDynamic = __webpack_require__(/*! ./utils/is-dynamic */ "./node_modules/next/dist/next-server/lib/router/utils/is-dynamic.js");

var _parseRelativeUrl = __webpack_require__(/*! ./utils/parse-relative-url */ "./node_modules/next/dist/next-server/lib/router/utils/parse-relative-url.js");

var _querystring = __webpack_require__(/*! ./utils/querystring */ "./node_modules/next/dist/next-server/lib/router/utils/querystring.js");

var _resolveRewrites = _interopRequireDefault(__webpack_require__(/*! ./utils/resolve-rewrites */ "./node_modules/next/dist/next-server/lib/router/utils/resolve-rewrites.js"));

var _routeMatcher = __webpack_require__(/*! ./utils/route-matcher */ "./node_modules/next/dist/next-server/lib/router/utils/route-matcher.js");

var _routeRegex = __webpack_require__(/*! ./utils/route-regex */ "./node_modules/next/dist/next-server/lib/router/utils/route-regex.js");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
} // tslint:disable:no-console


let detectDomainLocale;

if (false) {}

const basePath =  false || '';

function buildCancellationError() {
  return Object.assign(new Error('Route Cancelled'), {
    cancelled: true
  });
}

function addPathPrefix(path, prefix) {
  return prefix && path.startsWith('/') ? path === '/' ? (0, _normalizeTrailingSlash.normalizePathTrailingSlash)(prefix) : `${prefix}${pathNoQueryHash(path) === '/' ? path.substring(1) : path}` : path;
}

function getDomainLocale(path, locale, locales, domainLocales) {
  if (false) {}

  return false;
}

function addLocale(path, locale, defaultLocale) {
  if (false) {}

  return path;
}

function delLocale(path, locale) {
  if (false) {}

  return path;
}

function pathNoQueryHash(path) {
  const queryIndex = path.indexOf('?');
  const hashIndex = path.indexOf('#');

  if (queryIndex > -1 || hashIndex > -1) {
    path = path.substring(0, queryIndex > -1 ? queryIndex : hashIndex);
  }

  return path;
}

function hasBasePath(path) {
  path = pathNoQueryHash(path);
  return path === basePath || path.startsWith(basePath + '/');
}

function addBasePath(path) {
  // we only add the basepath on relative urls
  return addPathPrefix(path, basePath);
}

function delBasePath(path) {
  path = path.slice(basePath.length);
  if (!path.startsWith('/')) path = `/${path}`;
  return path;
}
/**
* Detects whether a given url is routable by the Next.js router (browser only).
*/


function isLocalURL(url) {
  // prevent a hydration mismatch on href for url with anchor refs
  if (url.startsWith('/') || url.startsWith('#')) return true;

  try {
    // absolute urls can be local if they are on the same origin
    const locationOrigin = (0, _utils.getLocationOrigin)();
    const resolved = new URL(url, locationOrigin);
    return resolved.origin === locationOrigin && hasBasePath(resolved.pathname);
  } catch (_) {
    return false;
  }
}

function interpolateAs(route, asPathname, query) {
  let interpolatedRoute = '';
  const dynamicRegex = (0, _routeRegex.getRouteRegex)(route);
  const dynamicGroups = dynamicRegex.groups;
  const dynamicMatches = // Try to match the dynamic route against the asPath
  (asPathname !== route ? (0, _routeMatcher.getRouteMatcher)(dynamicRegex)(asPathname) : '') || // Fall back to reading the values from the href
  // TODO: should this take priority; also need to change in the router.
  query;
  interpolatedRoute = route;
  const params = Object.keys(dynamicGroups);

  if (!params.every(param => {
    let value = dynamicMatches[param] || '';
    const {
      repeat,
      optional
    } = dynamicGroups[param]; // support single-level catch-all
    // TODO: more robust handling for user-error (passing `/`)

    let replaced = `[${repeat ? '...' : ''}${param}]`;

    if (optional) {
      replaced = `${!value ? '/' : ''}[${replaced}]`;
    }

    if (repeat && !Array.isArray(value)) value = [value];
    return (optional || param in dynamicMatches) && ( // Interpolate group into data URL if present
    interpolatedRoute = interpolatedRoute.replace(replaced, repeat ? value.map( // these values should be fully encoded instead of just
    // path delimiter escaped since they are being inserted
    // into the URL and we expect URL encoded segments
    // when parsing dynamic route params
    segment => encodeURIComponent(segment)).join('/') : encodeURIComponent(value)) || '/');
  })) {
    interpolatedRoute = ''; // did not satisfy all requirements
    // n.b. We ignore this error because we handle warning for this case in
    // development in the `<Link>` component directly.
  }

  return {
    params,
    result: interpolatedRoute
  };
}

function omitParmsFromQuery(query, params) {
  const filteredQuery = {};
  Object.keys(query).forEach(key => {
    if (!params.includes(key)) {
      filteredQuery[key] = query[key];
    }
  });
  return filteredQuery;
}
/**
* Resolves a given hyperlink with a certain router state (basePath not included).
* Preserves absolute urls.
*/


function resolveHref(currentPath, href, resolveAs) {
  // we use a dummy base url for relative urls
  let base;

  try {
    base = new URL(currentPath, 'http://n');
  } catch (_) {
    // fallback to / for invalid asPath values e.g. //
    base = new URL('/', 'http://n');
  }

  const urlAsString = typeof href === 'string' ? href : (0, _utils.formatWithValidation)(href); // Return because it cannot be routed by the Next.js router

  if (!isLocalURL(urlAsString)) {
    return resolveAs ? [urlAsString] : urlAsString;
  }

  try {
    const finalUrl = new URL(urlAsString, base);
    finalUrl.pathname = (0, _normalizeTrailingSlash.normalizePathTrailingSlash)(finalUrl.pathname);
    let interpolatedAs = '';

    if ((0, _isDynamic.isDynamicRoute)(finalUrl.pathname) && finalUrl.searchParams && resolveAs) {
      const query = (0, _querystring.searchParamsToUrlQuery)(finalUrl.searchParams);
      const {
        result,
        params
      } = interpolateAs(finalUrl.pathname, finalUrl.pathname, query);

      if (result) {
        interpolatedAs = (0, _utils.formatWithValidation)({
          pathname: result,
          hash: finalUrl.hash,
          query: omitParmsFromQuery(query, params)
        });
      }
    } // if the origin didn't change, it means we received a relative href


    const resolvedHref = finalUrl.origin === base.origin ? finalUrl.href.slice(finalUrl.origin.length) : finalUrl.href;
    return resolveAs ? [resolvedHref, interpolatedAs || resolvedHref] : resolvedHref;
  } catch (_) {
    return resolveAs ? [urlAsString] : urlAsString;
  }
}

function stripOrigin(url) {
  const origin = (0, _utils.getLocationOrigin)();
  return url.startsWith(origin) ? url.substring(origin.length) : url;
}

function prepareUrlAs(router, url, as) {
  // If url and as provided as an object representation,
  // we'll format them into the string version here.
  let [resolvedHref, resolvedAs] = resolveHref(router.asPath, url, true);
  const origin = (0, _utils.getLocationOrigin)();
  const hrefHadOrigin = resolvedHref.startsWith(origin);
  const asHadOrigin = resolvedAs && resolvedAs.startsWith(origin);
  resolvedHref = stripOrigin(resolvedHref);
  resolvedAs = resolvedAs ? stripOrigin(resolvedAs) : resolvedAs;
  const preparedUrl = hrefHadOrigin ? resolvedHref : addBasePath(resolvedHref);
  const preparedAs = as ? stripOrigin(resolveHref(router.asPath, as)) : resolvedAs || resolvedHref;
  return {
    url: preparedUrl,
    as: asHadOrigin ? preparedAs : addBasePath(preparedAs)
  };
}

function resolveDynamicRoute(pathname, pages) {
  const cleanPathname = (0, _normalizeTrailingSlash.removePathTrailingSlash)((0, _denormalizePagePath.denormalizePagePath)(pathname));

  if (cleanPathname === '/404' || cleanPathname === '/_error') {
    return pathname;
  } // handle resolving href for dynamic routes


  if (!pages.includes(cleanPathname)) {
    // eslint-disable-next-line array-callback-return
    pages.some(page => {
      if ((0, _isDynamic.isDynamicRoute)(page) && (0, _routeRegex.getRouteRegex)(page).re.test(cleanPathname)) {
        pathname = page;
        return true;
      }
    });
  }

  return (0, _normalizeTrailingSlash.removePathTrailingSlash)(pathname);
}

const manualScrollRestoration =  false && false;
const SSG_DATA_NOT_FOUND = Symbol('SSG_DATA_NOT_FOUND');

function fetchRetry(url, attempts) {
  return fetch(url, {
    // Cookies are required to be present for Next.js' SSG "Preview Mode".
    // Cookies may also be required for `getServerSideProps`.
    //
    // > `fetch` won’t send cookies, unless you set the credentials init
    // > option.
    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    //
    // > For maximum browser compatibility when it comes to sending &
    // > receiving cookies, always supply the `credentials: 'same-origin'`
    // > option instead of relying on the default.
    // https://github.com/github/fetch#caveats
    credentials: 'same-origin'
  }).then(res => {
    if (!res.ok) {
      if (attempts > 1 && res.status >= 500) {
        return fetchRetry(url, attempts - 1);
      }

      if (res.status === 404) {
        return res.json().then(data => {
          if (data.notFound) {
            return {
              notFound: SSG_DATA_NOT_FOUND
            };
          }

          throw new Error(`Failed to load static props`);
        });
      }

      throw new Error(`Failed to load static props`);
    }

    return res.json();
  });
}

function fetchNextData(dataHref, isServerRender) {
  return fetchRetry(dataHref, isServerRender ? 3 : 1).catch(err => {
    // We should only trigger a server-side transition if this was caused
    // on a client-side transition. Otherwise, we'd get into an infinite
    // loop.
    if (!isServerRender) {
      (0, _routeLoader.markAssetError)(err);
    }

    throw err;
  });
}

class Router {
  /**
  * Map of all components loaded in `Router`
  */
  // Static Data Cache
  // In-flight Server Data Requests, for deduping
  constructor(_pathname, _query, _as, {
    initialProps,
    pageLoader,
    App,
    wrapApp,
    Component,
    err,
    subscription,
    isFallback,
    locale,
    locales,
    defaultLocale,
    domainLocales,
    isPreview
  }) {
    this.route = void 0;
    this.pathname = void 0;
    this.query = void 0;
    this.asPath = void 0;
    this.basePath = void 0;
    this.components = void 0;
    this.sdc = {};
    this.sdr = {};
    this.sub = void 0;
    this.clc = void 0;
    this.pageLoader = void 0;
    this._bps = void 0;
    this.events = void 0;
    this._wrapApp = void 0;
    this.isSsr = void 0;
    this.isFallback = void 0;
    this._inFlightRoute = void 0;
    this._shallow = void 0;
    this.locale = void 0;
    this.locales = void 0;
    this.defaultLocale = void 0;
    this.domainLocales = void 0;
    this.isReady = void 0;
    this.isPreview = void 0;
    this.isLocaleDomain = void 0;
    this._idx = 0;

    this.onPopState = e => {
      const state = e.state;

      if (!state) {
        // We get state as undefined for two reasons.
        //  1. With older safari (< 8) and older chrome (< 34)
        //  2. When the URL changed with #
        //
        // In the both cases, we don't need to proceed and change the route.
        // (as it's already changed)
        // But we can simply replace the state with the new changes.
        // Actually, for (1) we don't need to nothing. But it's hard to detect that event.
        // So, doing the following for (1) does no harm.
        const {
          pathname,
          query
        } = this;
        this.changeState('replaceState', (0, _utils.formatWithValidation)({
          pathname: addBasePath(pathname),
          query
        }), (0, _utils.getURL)());
        return;
      }

      if (!state.__N) {
        return;
      }

      let forcedScroll;
      const {
        url,
        as,
        options,
        idx
      } = state;

      if (false) {}

      this._idx = idx;
      const {
        pathname
      } = (0, _parseRelativeUrl.parseRelativeUrl)(url); // Make sure we don't re-render on initial load,
      // can be caused by navigating back from an external site

      if (this.isSsr && as === this.asPath && pathname === this.pathname) {
        return;
      } // If the downstream application returns falsy, return.
      // They will then be responsible for handling the event.


      if (this._bps && !this._bps(state)) {
        return;
      }

      this.change('replaceState', url, as, Object.assign({}, options, {
        shallow: options.shallow && this._shallow,
        locale: options.locale || this.defaultLocale
      }), forcedScroll);
    }; // represents the current component key


    this.route = (0, _normalizeTrailingSlash.removePathTrailingSlash)(_pathname); // set up the component cache (by route keys)

    this.components = {}; // We should not keep the cache, if there's an error
    // Otherwise, this cause issues when when going back and
    // come again to the errored page.

    if (_pathname !== '/_error') {
      this.components[this.route] = {
        Component,
        initial: true,
        props: initialProps,
        err,
        __N_SSG: initialProps && initialProps.__N_SSG,
        __N_SSP: initialProps && initialProps.__N_SSP
      };
    }

    this.components['/_app'] = {
      Component: App,
      styleSheets: [
        /* /_app does not need its stylesheets managed */
      ]
    }; // Backwards compat for Router.router.events
    // TODO: Should be remove the following major version as it was never documented

    this.events = Router.events;
    this.pageLoader = pageLoader;
    this.pathname = _pathname;
    this.query = _query; // if auto prerendered and dynamic route wait to update asPath
    // until after mount to prevent hydration mismatch

    const autoExportDynamic = (0, _isDynamic.isDynamicRoute)(_pathname) && self.__NEXT_DATA__.autoExport;

    this.asPath = autoExportDynamic ? _pathname : _as;
    this.basePath = basePath;
    this.sub = subscription;
    this.clc = null;
    this._wrapApp = wrapApp; // make sure to ignore extra popState in safari on navigating
    // back from external site

    this.isSsr = true;
    this.isFallback = isFallback;
    this.isReady = !!(self.__NEXT_DATA__.gssp || self.__NEXT_DATA__.gip || !autoExportDynamic && !self.location.search && !true);
    this.isPreview = !!isPreview;
    this.isLocaleDomain = false;

    if (false) {}

    if (false) {}
  }

  reload() {
    window.location.reload();
  }
  /**
  * Go back in history
  */


  back() {
    window.history.back();
  }
  /**
  * Performs a `pushState` with arguments
  * @param url of the route
  * @param as masks `url` for the browser
  * @param options object you can define `shallow` and other options
  */


  push(url, as, options = {}) {
    if (false) {}

    ;
    ({
      url,
      as
    } = prepareUrlAs(this, url, as));
    return this.change('pushState', url, as, options);
  }
  /**
  * Performs a `replaceState` with arguments
  * @param url of the route
  * @param as masks `url` for the browser
  * @param options object you can define `shallow` and other options
  */


  replace(url, as, options = {}) {
    ;
    ({
      url,
      as
    } = prepareUrlAs(this, url, as));
    return this.change('replaceState', url, as, options);
  }

  async change(method, url, as, options, forcedScroll) {
    var _options$scroll;

    if (!isLocalURL(url)) {
      window.location.href = url;
      return false;
    }

    const shouldResolveHref = url === as || options._h; // for static pages with query params in the URL we delay
    // marking the router ready until after the query is updated

    if (options._h) {
      this.isReady = true;
    } // Default to scroll reset behavior unless explicitly specified to be
    // `false`! This makes the behavior between using `Router#push` and a
    // `<Link />` consistent.


    options.scroll = !!((_options$scroll = options.scroll) != null ? _options$scroll : true);
    let localeChange = options.locale !== this.locale;

    if (false) { var _this$locales; }

    if (!options._h) {
      this.isSsr = false;
    } // marking route changes as a navigation start entry


    if (_utils.ST) {
      performance.mark('routeChange');
    }

    const {
      shallow = false
    } = options;
    const routeProps = {
      shallow
    };

    if (this._inFlightRoute) {
      this.abortComponentLoad(this._inFlightRoute, routeProps);
    }

    as = addBasePath(addLocale(hasBasePath(as) ? delBasePath(as) : as, options.locale, this.defaultLocale));
    const cleanedAs = delLocale(hasBasePath(as) ? delBasePath(as) : as, this.locale);
    this._inFlightRoute = as; // If the url change is only related to a hash change
    // We should not proceed. We should only change the state.
    // WARNING: `_h` is an internal option for handing Next.js client-side
    // hydration. Your app should _never_ use this property. It may change at
    // any time without notice.

    if (!options._h && this.onlyAHashChange(cleanedAs)) {
      this.asPath = cleanedAs;
      Router.events.emit('hashChangeStart', as, routeProps); // TODO: do we need the resolved href when only a hash change?

      this.changeState(method, url, as, options);
      this.scrollToHash(cleanedAs);
      this.notify(this.components[this.route], null);
      Router.events.emit('hashChangeComplete', as, routeProps);
      return true;
    }

    let parsed = (0, _parseRelativeUrl.parseRelativeUrl)(url);
    let {
      pathname,
      query
    } = parsed; // The build manifest needs to be loaded before auto-static dynamic pages
    // get their query parameters to allow ensuring they can be parsed properly
    // when rewritten to

    let pages, rewrites;

    try {
      pages = await this.pageLoader.getPageList();
      ({
        __rewrites: rewrites
      } = await (0, _routeLoader.getClientBuildManifest)());
    } catch (err) {
      // If we fail to resolve the page list or client-build manifest, we must
      // do a server-side transition:
      window.location.href = as;
      return false;
    } // If asked to change the current URL we should reload the current page
    // (not location.reload() but reload getInitialProps and other Next.js stuffs)
    // We also need to set the method = replaceState always
    // as this should not go into the history (That's how browsers work)
    // We should compare the new asPath to the current asPath, not the url


    if (!this.urlIsNew(cleanedAs) && !localeChange) {
      method = 'replaceState';
    } // we need to resolve the as value using rewrites for dynamic SSG
    // pages to allow building the data URL correctly


    let resolvedAs = as; // url and as should always be prefixed with basePath by this
    // point by either next/link or router.push/replace so strip the
    // basePath from the pathname to match the pages dir 1-to-1

    pathname = pathname ? (0, _normalizeTrailingSlash.removePathTrailingSlash)(delBasePath(pathname)) : pathname;

    if (shouldResolveHref && pathname !== '/_error') {
      if ( true && as.startsWith('/')) {
        const rewritesResult = (0, _resolveRewrites.default)(addBasePath(addLocale(cleanedAs, this.locale)), pages, rewrites, query, p => resolveDynamicRoute(p, pages), this.locales);
        resolvedAs = rewritesResult.asPath;

        if (rewritesResult.matchedPage && rewritesResult.resolvedHref) {
          // if this directly matches a page we need to update the href to
          // allow the correct page chunk to be loaded
          pathname = rewritesResult.resolvedHref;
          parsed.pathname = pathname;
          url = (0, _utils.formatWithValidation)(parsed);
        }
      } else {
        parsed.pathname = resolveDynamicRoute(pathname, pages);

        if (parsed.pathname !== pathname) {
          pathname = parsed.pathname;
          url = (0, _utils.formatWithValidation)(parsed);
        }
      }
    }

    const route = (0, _normalizeTrailingSlash.removePathTrailingSlash)(pathname);

    if (!isLocalURL(as)) {
      if (true) {
        throw new Error(`Invalid href: "${url}" and as: "${as}", received relative href and external as` + `\nSee more info: https://nextjs.org/docs/messages/invalid-relative-url-external-as`);
      }

      window.location.href = as;
      return false;
    }

    resolvedAs = delLocale(delBasePath(resolvedAs), this.locale);

    if ((0, _isDynamic.isDynamicRoute)(route)) {
      const parsedAs = (0, _parseRelativeUrl.parseRelativeUrl)(resolvedAs);
      const asPathname = parsedAs.pathname;
      const routeRegex = (0, _routeRegex.getRouteRegex)(route);
      const routeMatch = (0, _routeMatcher.getRouteMatcher)(routeRegex)(asPathname);
      const shouldInterpolate = route === asPathname;
      const interpolatedAs = shouldInterpolate ? interpolateAs(route, asPathname, query) : {};

      if (!routeMatch || shouldInterpolate && !interpolatedAs.result) {
        const missingParams = Object.keys(routeRegex.groups).filter(param => !query[param]);

        if (missingParams.length > 0) {
          if (true) {
            console.warn(`${shouldInterpolate ? `Interpolating href` : `Mismatching \`as\` and \`href\``} failed to manually provide ` + `the params: ${missingParams.join(', ')} in the \`href\`'s \`query\``);
          }

          throw new Error((shouldInterpolate ? `The provided \`href\` (${url}) value is missing query values (${missingParams.join(', ')}) to be interpolated properly. ` : `The provided \`as\` value (${asPathname}) is incompatible with the \`href\` value (${route}). `) + `Read more: https://nextjs.org/docs/messages/${shouldInterpolate ? 'href-interpolation-failed' : 'incompatible-href-as'}`);
        }
      } else if (shouldInterpolate) {
        as = (0, _utils.formatWithValidation)(Object.assign({}, parsedAs, {
          pathname: interpolatedAs.result,
          query: omitParmsFromQuery(query, interpolatedAs.params)
        }));
      } else {
        // Merge params into `query`, overwriting any specified in search
        Object.assign(query, routeMatch);
      }
    }

    Router.events.emit('routeChangeStart', as, routeProps);

    try {
      var _self$__NEXT_DATA__$p, _self$__NEXT_DATA__$p2;

      let routeInfo = await this.getRouteInfo(route, pathname, query, as, resolvedAs, routeProps);
      let {
        error,
        props,
        __N_SSG,
        __N_SSP
      } = routeInfo; // handle redirect on client-transition

      if ((__N_SSG || __N_SSP) && props) {
        if (props.pageProps && props.pageProps.__N_REDIRECT) {
          const destination = props.pageProps.__N_REDIRECT; // check if destination is internal (resolves to a page) and attempt
          // client-navigation if it is falling back to hard navigation if
          // it's not

          if (destination.startsWith('/')) {
            const parsedHref = (0, _parseRelativeUrl.parseRelativeUrl)(destination);
            parsedHref.pathname = resolveDynamicRoute(parsedHref.pathname, pages);

            if (pages.includes(parsedHref.pathname)) {
              const {
                url: newUrl,
                as: newAs
              } = prepareUrlAs(this, destination, destination);
              return this.change(method, newUrl, newAs, options);
            }
          }

          window.location.href = destination;
          return new Promise(() => {});
        }

        this.isPreview = !!props.__N_PREVIEW; // handle SSG data 404

        if (props.notFound === SSG_DATA_NOT_FOUND) {
          let notFoundRoute;

          try {
            await this.fetchComponent('/404');
            notFoundRoute = '/404';
          } catch (_) {
            notFoundRoute = '/_error';
          }

          routeInfo = await this.getRouteInfo(notFoundRoute, notFoundRoute, query, as, resolvedAs, {
            shallow: false
          });
        }
      }

      Router.events.emit('beforeHistoryChange', as, routeProps);
      this.changeState(method, url, as, options);

      if (true) {
        const appComp = this.components['/_app'].Component;
        window.next.isPrerendered = appComp.getInitialProps === appComp.origGetInitialProps && !routeInfo.Component.getInitialProps;
      } // shallow routing is only allowed for same page URL changes.


      const isValidShallowRoute = options.shallow && this.route === route;

      if (options._h && pathname === '/_error' && ((_self$__NEXT_DATA__$p = self.__NEXT_DATA__.props) == null ? void 0 : (_self$__NEXT_DATA__$p2 = _self$__NEXT_DATA__$p.pageProps) == null ? void 0 : _self$__NEXT_DATA__$p2.statusCode) === 500 && props != null && props.pageProps) {
        // ensure statusCode is still correct for static 500 page
        // when updating query information
        props.pageProps.statusCode = 500;
      }

      await this.set(route, pathname, query, cleanedAs, routeInfo, forcedScroll || (isValidShallowRoute || !options.scroll ? null : {
        x: 0,
        y: 0
      })).catch(e => {
        if (e.cancelled) error = error || e;else throw e;
      });

      if (error) {
        Router.events.emit('routeChangeError', error, cleanedAs, routeProps);
        throw error;
      }

      if (false) {}

      Router.events.emit('routeChangeComplete', as, routeProps);
      return true;
    } catch (err) {
      if (err.cancelled) {
        return false;
      }

      throw err;
    }
  }

  changeState(method, url, as, options = {}) {
    if (true) {
      if (typeof window.history === 'undefined') {
        console.error(`Warning: window.history is not available.`);
        return;
      }

      if (typeof window.history[method] === 'undefined') {
        console.error(`Warning: window.history.${method} is not available`);
        return;
      }
    }

    if (method !== 'pushState' || (0, _utils.getURL)() !== as) {
      this._shallow = options.shallow;
      window.history[method]({
        url,
        as,
        options,
        __N: true,
        idx: this._idx = method !== 'pushState' ? this._idx : this._idx + 1
      }, // Most browsers currently ignores this parameter, although they may use it in the future.
      // Passing the empty string here should be safe against future changes to the method.
      // https://developer.mozilla.org/en-US/docs/Web/API/History/replaceState
      '', as);
    }
  }

  async handleRouteInfoError(err, pathname, query, as, routeProps, loadErrorFail) {
    if (err.cancelled) {
      // bubble up cancellation errors
      throw err;
    }

    if ((0, _routeLoader.isAssetError)(err) || loadErrorFail) {
      Router.events.emit('routeChangeError', err, as, routeProps); // If we can't load the page it could be one of following reasons
      //  1. Page doesn't exists
      //  2. Page does exist in a different zone
      //  3. Internal error while loading the page
      // So, doing a hard reload is the proper way to deal with this.

      window.location.href = as; // Changing the URL doesn't block executing the current code path.
      // So let's throw a cancellation error stop the routing logic.

      throw buildCancellationError();
    }

    try {
      let Component;
      let styleSheets;
      let props;

      if (typeof Component === 'undefined' || typeof styleSheets === 'undefined') {
        ;
        ({
          page: Component,
          styleSheets
        } = await this.fetchComponent('/_error'));
      }

      const routeInfo = {
        props,
        Component,
        styleSheets,
        err,
        error: err
      };

      if (!routeInfo.props) {
        try {
          routeInfo.props = await this.getInitialProps(Component, {
            err,
            pathname,
            query
          });
        } catch (gipErr) {
          console.error('Error in error page `getInitialProps`: ', gipErr);
          routeInfo.props = {};
        }
      }

      return routeInfo;
    } catch (routeInfoErr) {
      return this.handleRouteInfoError(routeInfoErr, pathname, query, as, routeProps, true);
    }
  }

  async getRouteInfo(route, pathname, query, as, resolvedAs, routeProps) {
    try {
      const existingRouteInfo = this.components[route];

      if (routeProps.shallow && existingRouteInfo && this.route === route) {
        return existingRouteInfo;
      }

      const cachedRouteInfo = existingRouteInfo && 'initial' in existingRouteInfo ? undefined : existingRouteInfo;
      const routeInfo = cachedRouteInfo ? cachedRouteInfo : await this.fetchComponent(route).then(res => ({
        Component: res.page,
        styleSheets: res.styleSheets,
        __N_SSG: res.mod.__N_SSG,
        __N_SSP: res.mod.__N_SSP
      }));
      const {
        Component,
        __N_SSG,
        __N_SSP
      } = routeInfo;

      if (true) {
        const {
          isValidElementType
        } = __webpack_require__(/*! react-is */ "react-is");

        if (!isValidElementType(Component)) {
          throw new Error(`The default export is not a React Component in page: "${pathname}"`);
        }
      }

      let dataHref;

      if (__N_SSG || __N_SSP) {
        dataHref = this.pageLoader.getDataHref((0, _utils.formatWithValidation)({
          pathname,
          query
        }), resolvedAs, __N_SSG, this.locale);
      }

      const props = await this._getData(() => __N_SSG ? this._getStaticData(dataHref) : __N_SSP ? this._getServerData(dataHref) : this.getInitialProps(Component, // we provide AppTree later so this needs to be `any`
      {
        pathname,
        query,
        asPath: as,
        locale: this.locale,
        locales: this.locales,
        defaultLocale: this.defaultLocale
      }));
      routeInfo.props = props;
      this.components[route] = routeInfo;
      return routeInfo;
    } catch (err) {
      return this.handleRouteInfoError(err, pathname, query, as, routeProps);
    }
  }

  set(route, pathname, query, as, data, resetScroll) {
    this.isFallback = false;
    this.route = route;
    this.pathname = pathname;
    this.query = query;
    this.asPath = as;
    return this.notify(data, resetScroll);
  }
  /**
  * Callback to execute before replacing router state
  * @param cb callback to be executed
  */


  beforePopState(cb) {
    this._bps = cb;
  }

  onlyAHashChange(as) {
    if (!this.asPath) return false;
    const [oldUrlNoHash, oldHash] = this.asPath.split('#');
    const [newUrlNoHash, newHash] = as.split('#'); // Makes sure we scroll to the provided hash if the url/hash are the same

    if (newHash && oldUrlNoHash === newUrlNoHash && oldHash === newHash) {
      return true;
    } // If the urls are change, there's more than a hash change


    if (oldUrlNoHash !== newUrlNoHash) {
      return false;
    } // If the hash has changed, then it's a hash only change.
    // This check is necessary to handle both the enter and
    // leave hash === '' cases. The identity case falls through
    // and is treated as a next reload.


    return oldHash !== newHash;
  }

  scrollToHash(as) {
    const [, hash] = as.split('#'); // Scroll to top if the hash is just `#` with no value or `#top`
    // To mirror browsers

    if (hash === '' || hash === 'top') {
      window.scrollTo(0, 0);
      return;
    } // First we check if the element by id is found


    const idEl = document.getElementById(hash);

    if (idEl) {
      idEl.scrollIntoView();
      return;
    } // If there's no element with the id, we check the `name` property
    // To mirror browsers


    const nameEl = document.getElementsByName(hash)[0];

    if (nameEl) {
      nameEl.scrollIntoView();
    }
  }

  urlIsNew(asPath) {
    return this.asPath !== asPath;
  }
  /**
  * Prefetch page code, you may wait for the data during page rendering.
  * This feature only works in production!
  * @param url the href of prefetched page
  * @param asPath the as path of the prefetched page
  */


  async prefetch(url, asPath = url, options = {}) {
    let parsed = (0, _parseRelativeUrl.parseRelativeUrl)(url);
    let {
      pathname
    } = parsed;

    if (false) {}

    const pages = await this.pageLoader.getPageList();
    let resolvedAs = asPath;

    if ( true && asPath.startsWith('/')) {
      let rewrites;
      ({
        __rewrites: rewrites
      } = await (0, _routeLoader.getClientBuildManifest)());
      const rewritesResult = (0, _resolveRewrites.default)(addBasePath(addLocale(asPath, this.locale)), pages, rewrites, parsed.query, p => resolveDynamicRoute(p, pages), this.locales);
      resolvedAs = delLocale(delBasePath(rewritesResult.asPath), this.locale);

      if (rewritesResult.matchedPage && rewritesResult.resolvedHref) {
        // if this directly matches a page we need to update the href to
        // allow the correct page chunk to be loaded
        pathname = rewritesResult.resolvedHref;
        parsed.pathname = pathname;
        url = (0, _utils.formatWithValidation)(parsed);
      }
    } else {
      parsed.pathname = resolveDynamicRoute(parsed.pathname, pages);

      if (parsed.pathname !== pathname) {
        pathname = parsed.pathname;
        url = (0, _utils.formatWithValidation)(parsed);
      }
    }

    const route = (0, _normalizeTrailingSlash.removePathTrailingSlash)(pathname); // Prefetch is not supported in development mode because it would trigger on-demand-entries

    if (true) {
      return;
    }

    await Promise.all([this.pageLoader._isSsg(route).then(isSsg => {
      return isSsg ? this._getStaticData(this.pageLoader.getDataHref(url, resolvedAs, true, typeof options.locale !== 'undefined' ? options.locale : this.locale)) : false;
    }), this.pageLoader[options.priority ? 'loadPage' : 'prefetch'](route)]);
  }

  async fetchComponent(route) {
    let cancelled = false;

    const cancel = this.clc = () => {
      cancelled = true;
    };

    const componentResult = await this.pageLoader.loadPage(route);

    if (cancelled) {
      const error = new Error(`Abort fetching component for route: "${route}"`);
      error.cancelled = true;
      throw error;
    }

    if (cancel === this.clc) {
      this.clc = null;
    }

    return componentResult;
  }

  _getData(fn) {
    let cancelled = false;

    const cancel = () => {
      cancelled = true;
    };

    this.clc = cancel;
    return fn().then(data => {
      if (cancel === this.clc) {
        this.clc = null;
      }

      if (cancelled) {
        const err = new Error('Loading initial props cancelled');
        err.cancelled = true;
        throw err;
      }

      return data;
    });
  }

  _getStaticData(dataHref) {
    const {
      href: cacheKey
    } = new URL(dataHref, window.location.href);

    if (false) {}

    return fetchNextData(dataHref, this.isSsr).then(data => {
      this.sdc[cacheKey] = data;
      return data;
    });
  }

  _getServerData(dataHref) {
    const {
      href: resourceKey
    } = new URL(dataHref, window.location.href);

    if (this.sdr[resourceKey]) {
      return this.sdr[resourceKey];
    }

    return this.sdr[resourceKey] = fetchNextData(dataHref, this.isSsr).then(data => {
      delete this.sdr[resourceKey];
      return data;
    }).catch(err => {
      delete this.sdr[resourceKey];
      throw err;
    });
  }

  getInitialProps(Component, ctx) {
    const {
      Component: App
    } = this.components['/_app'];

    const AppTree = this._wrapApp(App);

    ctx.AppTree = AppTree;
    return (0, _utils.loadGetInitialProps)(App, {
      AppTree,
      Component,
      router: this,
      ctx
    });
  }

  abortComponentLoad(as, routeProps) {
    if (this.clc) {
      Router.events.emit('routeChangeError', buildCancellationError(), as, routeProps);
      this.clc();
      this.clc = null;
    }
  }

  notify(data, resetScroll) {
    return this.sub(data, this.components['/_app'].Component, resetScroll);
  }

}

exports.default = Router;
Router.events = (0, _mitt.default)();

/***/ }),

/***/ "./node_modules/next/dist/next-server/lib/router/utils/format-url.js":
/*!***************************************************************************!*\
  !*** ./node_modules/next/dist/next-server/lib/router/utils/format-url.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.formatUrl = formatUrl;

var querystring = _interopRequireWildcard(__webpack_require__(/*! ./querystring */ "./node_modules/next/dist/next-server/lib/router/utils/querystring.js"));

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function () {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
    return {
      default: obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj.default = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
} // Format function modified from nodejs
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.


const slashedProtocols = /https?|ftp|gopher|file/;

function formatUrl(urlObj) {
  let {
    auth,
    hostname
  } = urlObj;
  let protocol = urlObj.protocol || '';
  let pathname = urlObj.pathname || '';
  let hash = urlObj.hash || '';
  let query = urlObj.query || '';
  let host = false;
  auth = auth ? encodeURIComponent(auth).replace(/%3A/i, ':') + '@' : '';

  if (urlObj.host) {
    host = auth + urlObj.host;
  } else if (hostname) {
    host = auth + (~hostname.indexOf(':') ? `[${hostname}]` : hostname);

    if (urlObj.port) {
      host += ':' + urlObj.port;
    }
  }

  if (query && typeof query === 'object') {
    query = String(querystring.urlQueryToSearchParams(query));
  }

  let search = urlObj.search || query && `?${query}` || '';
  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

  if (urlObj.slashes || (!protocol || slashedProtocols.test(protocol)) && host !== false) {
    host = '//' + (host || '');
    if (pathname && pathname[0] !== '/') pathname = '/' + pathname;
  } else if (!host) {
    host = '';
  }

  if (hash && hash[0] !== '#') hash = '#' + hash;
  if (search && search[0] !== '?') search = '?' + search;
  pathname = pathname.replace(/[?#]/g, encodeURIComponent);
  search = search.replace('#', '%23');
  return `${protocol}${host}${pathname}${search}${hash}`;
}

/***/ }),

/***/ "./node_modules/next/dist/next-server/lib/router/utils/is-dynamic.js":
/*!***************************************************************************!*\
  !*** ./node_modules/next/dist/next-server/lib/router/utils/is-dynamic.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.isDynamicRoute = isDynamicRoute; // Identify /[param]/ in route string

const TEST_ROUTE = /\/\[[^/]+?\](?=\/|$)/;

function isDynamicRoute(route) {
  return TEST_ROUTE.test(route);
}

/***/ }),

/***/ "./node_modules/next/dist/next-server/lib/router/utils/parse-relative-url.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/next/dist/next-server/lib/router/utils/parse-relative-url.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.parseRelativeUrl = parseRelativeUrl;

var _utils = __webpack_require__(/*! ../../utils */ "./node_modules/next/dist/next-server/lib/utils.js");

var _querystring = __webpack_require__(/*! ./querystring */ "./node_modules/next/dist/next-server/lib/router/utils/querystring.js");
/**
* Parses path-relative urls (e.g. `/hello/world?foo=bar`). If url isn't path-relative
* (e.g. `./hello`) then at least base must be.
* Absolute urls are rejected with one exception, in the browser, absolute urls that are on
* the current origin will be parsed as relative
*/


function parseRelativeUrl(url, base) {
  const globalBase = new URL(true ? 'http://n' : undefined);
  const resolvedBase = base ? new URL(base, globalBase) : globalBase;
  const {
    pathname,
    searchParams,
    search,
    hash,
    href,
    origin
  } = new URL(url, resolvedBase);

  if (origin !== globalBase.origin) {
    throw new Error(`invariant: invalid relative URL, router received ${url}`);
  }

  return {
    pathname,
    query: (0, _querystring.searchParamsToUrlQuery)(searchParams),
    search,
    hash,
    href: href.slice(globalBase.origin.length)
  };
}

/***/ }),

/***/ "./node_modules/next/dist/next-server/lib/router/utils/path-match.js":
/*!***************************************************************************!*\
  !*** ./node_modules/next/dist/next-server/lib/router/utils/path-match.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

exports.__esModule = true;
exports.pathToRegexp = exports.default = exports.customRouteMatcherOptions = exports.matcherOptions = void 0;

var pathToRegexp = _interopRequireWildcard(__webpack_require__(/*! next/dist/compiled/path-to-regexp */ "./node_modules/next/dist/compiled/path-to-regexp/index.js"));

exports.pathToRegexp = pathToRegexp;

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function () {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
    return {
      default: obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj.default = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

const matcherOptions = {
  sensitive: false,
  delimiter: '/'
};
exports.matcherOptions = matcherOptions;

const customRouteMatcherOptions = _objectSpread(_objectSpread({}, matcherOptions), {}, {
  strict: true
});

exports.customRouteMatcherOptions = customRouteMatcherOptions;

var _default = (customRoute = false) => {
  return path => {
    const keys = [];
    const matcherRegex = pathToRegexp.pathToRegexp(path, keys, customRoute ? customRouteMatcherOptions : matcherOptions);
    const matcher = pathToRegexp.regexpToFunction(matcherRegex, keys);
    return (pathname, params) => {
      const res = pathname == null ? false : matcher(pathname);

      if (!res) {
        return false;
      }

      if (customRoute) {
        for (const key of keys) {
          // unnamed params should be removed as they
          // are not allowed to be used in the destination
          if (typeof key.name === 'number') {
            delete res.params[key.name];
          }
        }
      }

      return _objectSpread(_objectSpread({}, params), res.params);
    };
  };
};

exports.default = _default;

/***/ }),

/***/ "./node_modules/next/dist/next-server/lib/router/utils/prepare-destination.js":
/*!************************************************************************************!*\
  !*** ./node_modules/next/dist/next-server/lib/router/utils/prepare-destination.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

exports.__esModule = true;
exports.matchHas = matchHas;
exports.compileNonPath = compileNonPath;
exports.default = prepareDestination;
exports.getSafeParamName = void 0;

var _querystring = __webpack_require__(/*! ./querystring */ "./node_modules/next/dist/next-server/lib/router/utils/querystring.js");

var _parseRelativeUrl = __webpack_require__(/*! ./parse-relative-url */ "./node_modules/next/dist/next-server/lib/router/utils/parse-relative-url.js");

var pathToRegexp = _interopRequireWildcard(__webpack_require__(/*! next/dist/compiled/path-to-regexp */ "./node_modules/next/dist/compiled/path-to-regexp/index.js"));

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function () {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
    return {
      default: obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj.default = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
} // ensure only a-zA-Z are used for param names for proper interpolating
// with path-to-regexp


const getSafeParamName = paramName => {
  let newParamName = '';

  for (let i = 0; i < paramName.length; i++) {
    const charCode = paramName.charCodeAt(i);

    if (charCode > 64 && charCode < 91 || // A-Z
    charCode > 96 && charCode < 123 // a-z
    ) {
        newParamName += paramName[i];
      }
  }

  return newParamName;
};

exports.getSafeParamName = getSafeParamName;

function matchHas(req, has, query) {
  const params = {};
  const allMatch = has.every(hasItem => {
    let value;
    let key = hasItem.key;

    switch (hasItem.type) {
      case 'header':
        {
          key = key.toLowerCase();
          value = req.headers[key];
          break;
        }

      case 'cookie':
        {
          value = req.cookies[hasItem.key];
          break;
        }

      case 'query':
        {
          value = query[key];
          break;
        }

      case 'host':
        {
          const {
            host
          } = (req == null ? void 0 : req.headers) || {}; // remove port from host if present

          const hostname = host == null ? void 0 : host.split(':')[0].toLowerCase();
          value = hostname;
          break;
        }

      default:
        {
          break;
        }
    }

    if (!hasItem.value && value) {
      params[getSafeParamName(key)] = value;
      return true;
    } else if (value) {
      const matcher = new RegExp(`^${hasItem.value}$`);
      const matches = value.match(matcher);

      if (matches) {
        if (matches.groups) {
          Object.keys(matches.groups).forEach(groupKey => {
            params[groupKey] = matches.groups[groupKey];
          });
        } else if (hasItem.type === 'host' && matches[0]) {
          params.host = matches[0];
        }

        return true;
      }
    }

    return false;
  });

  if (allMatch) {
    return params;
  }

  return false;
}

function compileNonPath(value, params) {
  if (!value.includes(':')) {
    return value;
  }

  for (const key of Object.keys(params)) {
    if (value.includes(`:${key}`)) {
      value = value.replace(new RegExp(`:${key}\\*`, 'g'), `:${key}--ESCAPED_PARAM_ASTERISKS`).replace(new RegExp(`:${key}\\?`, 'g'), `:${key}--ESCAPED_PARAM_QUESTION`).replace(new RegExp(`:${key}\\+`, 'g'), `:${key}--ESCAPED_PARAM_PLUS`).replace(new RegExp(`:${key}(?!\\w)`, 'g'), `--ESCAPED_PARAM_COLON${key}`);
    }
  }

  value = value.replace(/(:|\*|\?|\+|\(|\)|\{|\})/g, '\\$1').replace(/--ESCAPED_PARAM_PLUS/g, '+').replace(/--ESCAPED_PARAM_COLON/g, ':').replace(/--ESCAPED_PARAM_QUESTION/g, '?').replace(/--ESCAPED_PARAM_ASTERISKS/g, '*'); // the value needs to start with a forward-slash to be compiled
  // correctly

  return pathToRegexp.compile(`/${value}`, {
    validate: false
  })(params).substr(1);
}

function prepareDestination(destination, params, query, appendParamsToQuery) {
  let parsedDestination = {}; // clone query so we don't modify the original

  query = Object.assign({}, query);
  const hadLocale = query.__nextLocale;
  delete query.__nextLocale;
  delete query.__nextDefaultLocale;

  if (destination.startsWith('/')) {
    parsedDestination = (0, _parseRelativeUrl.parseRelativeUrl)(destination);
  } else {
    const {
      pathname,
      searchParams,
      hash,
      hostname,
      port,
      protocol,
      search,
      href
    } = new URL(destination);
    parsedDestination = {
      pathname,
      query: (0, _querystring.searchParamsToUrlQuery)(searchParams),
      hash,
      protocol,
      hostname,
      port,
      search,
      href
    };
  }

  const destQuery = parsedDestination.query;
  const destPath = `${parsedDestination.pathname}${parsedDestination.hash || ''}`;
  const destPathParamKeys = [];
  pathToRegexp.pathToRegexp(destPath, destPathParamKeys);
  const destPathParams = destPathParamKeys.map(key => key.name);
  let destinationCompiler = pathToRegexp.compile(destPath, // we don't validate while compiling the destination since we should
  // have already validated before we got to this point and validating
  // breaks compiling destinations with named pattern params from the source
  // e.g. /something:hello(.*) -> /another/:hello is broken with validation
  // since compile validation is meant for reversing and not for inserting
  // params from a separate path-regex into another
  {
    validate: false
  });
  let newUrl; // update any params in query values

  for (const [key, strOrArray] of Object.entries(destQuery)) {
    let value = Array.isArray(strOrArray) ? strOrArray[0] : strOrArray;

    if (value) {
      // the value needs to start with a forward-slash to be compiled
      // correctly
      value = compileNonPath(value, params);
    }

    destQuery[key] = value;
  } // add path params to query if it's not a redirect and not
  // already defined in destination query or path


  let paramKeys = Object.keys(params); // remove internal param for i18n

  if (hadLocale) {
    paramKeys = paramKeys.filter(name => name !== 'nextInternalLocale');
  }

  if (appendParamsToQuery && !paramKeys.some(key => destPathParams.includes(key))) {
    for (const key of paramKeys) {
      if (!(key in destQuery)) {
        destQuery[key] = params[key];
      }
    }
  }

  try {
    newUrl = destinationCompiler(params);
    const [pathname, hash] = newUrl.split('#');
    parsedDestination.pathname = pathname;
    parsedDestination.hash = `${hash ? '#' : ''}${hash || ''}`;
    delete parsedDestination.search;
  } catch (err) {
    if (err.message.match(/Expected .*? to not repeat, but got an array/)) {
      throw new Error(`To use a multi-match in the destination you must add \`*\` at the end of the param name to signify it should repeat. https://nextjs.org/docs/messages/invalid-multi-match`);
    }

    throw err;
  } // Query merge order lowest priority to highest
  // 1. initial URL query values
  // 2. path segment values
  // 3. destination specified query values


  parsedDestination.query = _objectSpread(_objectSpread({}, query), parsedDestination.query);
  return {
    newUrl,
    parsedDestination
  };
}

/***/ }),

/***/ "./node_modules/next/dist/next-server/lib/router/utils/querystring.js":
/*!****************************************************************************!*\
  !*** ./node_modules/next/dist/next-server/lib/router/utils/querystring.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.searchParamsToUrlQuery = searchParamsToUrlQuery;
exports.urlQueryToSearchParams = urlQueryToSearchParams;
exports.assign = assign;

function searchParamsToUrlQuery(searchParams) {
  const query = {};
  searchParams.forEach((value, key) => {
    if (typeof query[key] === 'undefined') {
      query[key] = value;
    } else if (Array.isArray(query[key])) {
      ;
      query[key].push(value);
    } else {
      query[key] = [query[key], value];
    }
  });
  return query;
}

function stringifyUrlQueryParam(param) {
  if (typeof param === 'string' || typeof param === 'number' && !isNaN(param) || typeof param === 'boolean') {
    return String(param);
  } else {
    return '';
  }
}

function urlQueryToSearchParams(urlQuery) {
  const result = new URLSearchParams();
  Object.entries(urlQuery).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach(item => result.append(key, stringifyUrlQueryParam(item)));
    } else {
      result.set(key, stringifyUrlQueryParam(value));
    }
  });
  return result;
}

function assign(target, ...searchParamsList) {
  searchParamsList.forEach(searchParams => {
    Array.from(searchParams.keys()).forEach(key => target.delete(key));
    searchParams.forEach((value, key) => target.append(key, value));
  });
  return target;
}

/***/ }),

/***/ "./node_modules/next/dist/next-server/lib/router/utils/resolve-rewrites.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/next/dist/next-server/lib/router/utils/resolve-rewrites.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = resolveRewrites;

var _pathMatch = _interopRequireDefault(__webpack_require__(/*! ./path-match */ "./node_modules/next/dist/next-server/lib/router/utils/path-match.js"));

var _prepareDestination = _interopRequireWildcard(__webpack_require__(/*! ./prepare-destination */ "./node_modules/next/dist/next-server/lib/router/utils/prepare-destination.js"));

var _normalizeTrailingSlash = __webpack_require__(/*! ../../../../client/normalize-trailing-slash */ "./node_modules/next/dist/client/normalize-trailing-slash.js");

var _normalizeLocalePath = __webpack_require__(/*! ../../i18n/normalize-locale-path */ "./node_modules/next/dist/next-server/lib/i18n/normalize-locale-path.js");

var _parseRelativeUrl = __webpack_require__(/*! ./parse-relative-url */ "./node_modules/next/dist/next-server/lib/router/utils/parse-relative-url.js");

var _router = __webpack_require__(/*! ../router */ "./node_modules/next/dist/next-server/lib/router/router.js");

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function () {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
    return {
      default: obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj.default = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

const customRouteMatcher = (0, _pathMatch.default)(true);

function resolveRewrites(asPath, pages, rewrites, query, resolveHref, locales) {
  let matchedPage = false;
  let parsedAs = (0, _parseRelativeUrl.parseRelativeUrl)(asPath);
  let fsPathname = (0, _normalizeTrailingSlash.removePathTrailingSlash)((0, _normalizeLocalePath.normalizeLocalePath)((0, _router.delBasePath)(parsedAs.pathname), locales).pathname);
  let resolvedHref;

  const handleRewrite = rewrite => {
    const matcher = customRouteMatcher(rewrite.source);
    let params = matcher(parsedAs.pathname);

    if (rewrite.has && params) {
      const hasParams = (0, _prepareDestination.matchHas)({
        headers: {
          host: document.location.hostname
        },
        cookies: document.cookie.split('; ').reduce((acc, item) => {
          const [key, ...value] = item.split('=');
          acc[key] = value.join('=');
          return acc;
        }, {})
      }, rewrite.has, parsedAs.query);

      if (hasParams) {
        Object.assign(params, hasParams);
      } else {
        params = false;
      }
    }

    if (params) {
      if (!rewrite.destination) {
        // this is a proxied rewrite which isn't handled on the client
        return true;
      }

      const destRes = (0, _prepareDestination.default)(rewrite.destination, params, query, true);
      parsedAs = destRes.parsedDestination;
      asPath = destRes.newUrl;
      Object.assign(query, destRes.parsedDestination.query);
      fsPathname = (0, _normalizeTrailingSlash.removePathTrailingSlash)((0, _normalizeLocalePath.normalizeLocalePath)((0, _router.delBasePath)(asPath), locales).pathname);

      if (pages.includes(fsPathname)) {
        // check if we now match a page as this means we are done
        // resolving the rewrites
        matchedPage = true;
        resolvedHref = fsPathname;
        return true;
      } // check if we match a dynamic-route, if so we break the rewrites chain


      resolvedHref = resolveHref(fsPathname);

      if (resolvedHref !== asPath && pages.includes(resolvedHref)) {
        matchedPage = true;
        return true;
      }
    }
  };

  let finished = false;

  for (let i = 0; i < rewrites.beforeFiles.length; i++) {
    // we don't end after match in beforeFiles to allow
    // continuing through all beforeFiles rewrites
    handleRewrite(rewrites.beforeFiles[i]);
  }

  matchedPage = pages.includes(fsPathname);

  if (!matchedPage) {
    if (!finished) {
      for (let i = 0; i < rewrites.afterFiles.length; i++) {
        if (handleRewrite(rewrites.afterFiles[i])) {
          finished = true;
          break;
        }
      }
    } // check dynamic route before processing fallback rewrites


    if (!finished) {
      resolvedHref = resolveHref(fsPathname);
      matchedPage = pages.includes(resolvedHref);
      finished = matchedPage;
    }

    if (!finished) {
      for (let i = 0; i < rewrites.fallback.length; i++) {
        if (handleRewrite(rewrites.fallback[i])) {
          finished = true;
          break;
        }
      }
    }
  }

  return {
    asPath,
    parsedAs,
    matchedPage,
    resolvedHref
  };
}

/***/ }),

/***/ "./node_modules/next/dist/next-server/lib/router/utils/route-matcher.js":
/*!******************************************************************************!*\
  !*** ./node_modules/next/dist/next-server/lib/router/utils/route-matcher.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.getRouteMatcher = getRouteMatcher;

function getRouteMatcher(routeRegex) {
  const {
    re,
    groups
  } = routeRegex;
  return pathname => {
    const routeMatch = re.exec(pathname);

    if (!routeMatch) {
      return false;
    }

    const decode = param => {
      try {
        return decodeURIComponent(param);
      } catch (_) {
        const err = new Error('failed to decode param');
        err.code = 'DECODE_FAILED';
        throw err;
      }
    };

    const params = {};
    Object.keys(groups).forEach(slugName => {
      const g = groups[slugName];
      const m = routeMatch[g.pos];

      if (m !== undefined) {
        params[slugName] = ~m.indexOf('/') ? m.split('/').map(entry => decode(entry)) : g.repeat ? [decode(m)] : decode(m);
      }
    });
    return params;
  };
}

/***/ }),

/***/ "./node_modules/next/dist/next-server/lib/router/utils/route-regex.js":
/*!****************************************************************************!*\
  !*** ./node_modules/next/dist/next-server/lib/router/utils/route-regex.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.getRouteRegex = getRouteRegex; // this isn't importing the escape-string-regex module
// to reduce bytes

function escapeRegex(str) {
  return str.replace(/[|\\{}()[\]^$+*?.-]/g, '\\$&');
}

function parseParameter(param) {
  const optional = param.startsWith('[') && param.endsWith(']');

  if (optional) {
    param = param.slice(1, -1);
  }

  const repeat = param.startsWith('...');

  if (repeat) {
    param = param.slice(3);
  }

  return {
    key: param,
    repeat,
    optional
  };
}

function getRouteRegex(normalizedRoute) {
  const segments = (normalizedRoute.replace(/\/$/, '') || '/').slice(1).split('/');
  const groups = {};
  let groupIndex = 1;
  const parameterizedRoute = segments.map(segment => {
    if (segment.startsWith('[') && segment.endsWith(']')) {
      const {
        key,
        optional,
        repeat
      } = parseParameter(segment.slice(1, -1));
      groups[key] = {
        pos: groupIndex++,
        repeat,
        optional
      };
      return repeat ? optional ? '(?:/(.+?))?' : '/(.+?)' : '/([^/]+?)';
    } else {
      return `/${escapeRegex(segment)}`;
    }
  }).join(''); // dead code eliminate for browser since it's only needed
  // while generating routes-manifest

  if (true) {
    let routeKeyCharCode = 97;
    let routeKeyCharLength = 1; // builds a minimal routeKey using only a-z and minimal number of characters

    const getSafeRouteKey = () => {
      let routeKey = '';

      for (let i = 0; i < routeKeyCharLength; i++) {
        routeKey += String.fromCharCode(routeKeyCharCode);
        routeKeyCharCode++;

        if (routeKeyCharCode > 122) {
          routeKeyCharLength++;
          routeKeyCharCode = 97;
        }
      }

      return routeKey;
    };

    const routeKeys = {};
    let namedParameterizedRoute = segments.map(segment => {
      if (segment.startsWith('[') && segment.endsWith(']')) {
        const {
          key,
          optional,
          repeat
        } = parseParameter(segment.slice(1, -1)); // replace any non-word characters since they can break
        // the named regex

        let cleanedKey = key.replace(/\W/g, '');
        let invalidKey = false; // check if the key is still invalid and fallback to using a known
        // safe key

        if (cleanedKey.length === 0 || cleanedKey.length > 30) {
          invalidKey = true;
        }

        if (!isNaN(parseInt(cleanedKey.substr(0, 1)))) {
          invalidKey = true;
        }

        if (invalidKey) {
          cleanedKey = getSafeRouteKey();
        }

        routeKeys[cleanedKey] = key;
        return repeat ? optional ? `(?:/(?<${cleanedKey}>.+?))?` : `/(?<${cleanedKey}>.+?)` : `/(?<${cleanedKey}>[^/]+?)`;
      } else {
        return `/${escapeRegex(segment)}`;
      }
    }).join('');
    return {
      re: new RegExp(`^${parameterizedRoute}(?:/)?$`),
      groups,
      routeKeys,
      namedRegex: `^${namedParameterizedRoute}(?:/)?$`
    };
  }

  return {
    re: new RegExp(`^${parameterizedRoute}(?:/)?$`),
    groups
  };
}

/***/ }),

/***/ "./node_modules/next/dist/next-server/lib/utils.js":
/*!*********************************************************!*\
  !*** ./node_modules/next/dist/next-server/lib/utils.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.execOnce = execOnce;
exports.getLocationOrigin = getLocationOrigin;
exports.getURL = getURL;
exports.getDisplayName = getDisplayName;
exports.isResSent = isResSent;
exports.loadGetInitialProps = loadGetInitialProps;
exports.formatWithValidation = formatWithValidation;
exports.ST = exports.SP = exports.urlObjectKeys = void 0;

var _formatUrl = __webpack_require__(/*! ./router/utils/format-url */ "./node_modules/next/dist/next-server/lib/router/utils/format-url.js");
/**
* Utils
*/


function execOnce(fn) {
  let used = false;
  let result;
  return (...args) => {
    if (!used) {
      used = true;
      result = fn(...args);
    }

    return result;
  };
}

function getLocationOrigin() {
  const {
    protocol,
    hostname,
    port
  } = window.location;
  return `${protocol}//${hostname}${port ? ':' + port : ''}`;
}

function getURL() {
  const {
    href
  } = window.location;
  const origin = getLocationOrigin();
  return href.substring(origin.length);
}

function getDisplayName(Component) {
  return typeof Component === 'string' ? Component : Component.displayName || Component.name || 'Unknown';
}

function isResSent(res) {
  return res.finished || res.headersSent;
}

async function loadGetInitialProps(App, ctx) {
  if (true) {
    var _App$prototype;

    if ((_App$prototype = App.prototype) != null && _App$prototype.getInitialProps) {
      const message = `"${getDisplayName(App)}.getInitialProps()" is defined as an instance method - visit https://nextjs.org/docs/messages/get-initial-props-as-an-instance-method for more information.`;
      throw new Error(message);
    }
  } // when called from _app `ctx` is nested in `ctx`


  const res = ctx.res || ctx.ctx && ctx.ctx.res;

  if (!App.getInitialProps) {
    if (ctx.ctx && ctx.Component) {
      // @ts-ignore pageProps default
      return {
        pageProps: await loadGetInitialProps(ctx.Component, ctx.ctx)
      };
    }

    return {};
  }

  const props = await App.getInitialProps(ctx);

  if (res && isResSent(res)) {
    return props;
  }

  if (!props) {
    const message = `"${getDisplayName(App)}.getInitialProps()" should resolve to an object. But found "${props}" instead.`;
    throw new Error(message);
  }

  if (true) {
    if (Object.keys(props).length === 0 && !ctx.ctx) {
      console.warn(`${getDisplayName(App)} returned an empty object from \`getInitialProps\`. This de-optimizes and prevents automatic static optimization. https://nextjs.org/docs/messages/empty-object-getInitialProps`);
    }
  }

  return props;
}

const urlObjectKeys = ['auth', 'hash', 'host', 'hostname', 'href', 'path', 'pathname', 'port', 'protocol', 'query', 'search', 'slashes'];
exports.urlObjectKeys = urlObjectKeys;

function formatWithValidation(url) {
  if (true) {
    if (url !== null && typeof url === 'object') {
      Object.keys(url).forEach(key => {
        if (urlObjectKeys.indexOf(key) === -1) {
          console.warn(`Unknown key passed via urlObject into url.format: ${key}`);
        }
      });
    }
  }

  return (0, _formatUrl.formatUrl)(url);
}

const SP = typeof performance !== 'undefined';
exports.SP = SP;
const ST = SP && typeof performance.mark === 'function' && typeof performance.measure === 'function';
exports.ST = ST;

/***/ }),

/***/ "./node_modules/next/dist/next-server/server/denormalize-page-path.js":
/*!****************************************************************************!*\
  !*** ./node_modules/next/dist/next-server/server/denormalize-page-path.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
exports.__esModule=true;exports.normalizePathSep=normalizePathSep;exports.denormalizePagePath=denormalizePagePath;function normalizePathSep(path){return path.replace(/\\/g,'/');}function denormalizePagePath(page){page=normalizePathSep(page);if(page.startsWith('/index/')){page=page.slice(6);}else if(page==='/index'){page='/';}return page;}
//# sourceMappingURL=denormalize-page-path.js.map

/***/ }),

/***/ "./node_modules/next/link.js":
/*!***********************************!*\
  !*** ./node_modules/next/link.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./dist/client/link */ "./node_modules/next/dist/client/link.js")


/***/ }),

/***/ "./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireDefault.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;

/***/ }),

/***/ "./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireWildcard.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireWildcard.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/next/node_modules/@babel/runtime/helpers/typeof.js");

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
    return {
      "default": obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj["default"] = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

module.exports = _interopRequireWildcard;

/***/ }),

/***/ "./node_modules/next/node_modules/@babel/runtime/helpers/typeof.js":
/*!*************************************************************************!*\
  !*** ./node_modules/next/node_modules/@babel/runtime/helpers/typeof.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;

/***/ }),

/***/ "./pages/LoggedIn.js":
/*!***************************!*\
  !*** ./pages/LoggedIn.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/router */ "next/router");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _context_AuthUserContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../context/AuthUserContext */ "./context/AuthUserContext.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-bootstrap */ "react-bootstrap");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__);
var _jsxFileName = "C:\\Users\\mack2\\Desktop\\code\\pages\\LoggedIn.js";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;





const LoggedIn = ({
  children
}) => {
  const {
    authUser,
    loading
  } = Object(_context_AuthUserContext__WEBPACK_IMPORTED_MODULE_2__["useAuth"])();
  const router = Object(next_router__WEBPACK_IMPORTED_MODULE_1__["useRouter"])(); // Redirect only after a short delay if authUser remains null.

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    console.log("=== LOGGEDIN AUTH CHECK ===");
    console.log("loading:", loading);
    console.log("authUser:", authUser);
    console.log("router.asPath:", router.asPath);

    if (!loading && authUser === null) {
      console.log("No auth user, will redirect to login in 800ms"); // Set a delay (e.g. 500ms) to give Firebase Auth a chance to rehydrate.

      const timer = setTimeout(() => {
        console.log("Redirecting to login now");
        router.push(`/?redirect=${encodeURIComponent(router.asPath)}`);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [authUser, loading, router]);

  if (loading) {
    return __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Container"], {
      className: "d-flex align-items-center justify-content-center",
      style: {
        minHeight: "100vh"
      },
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 30,
        columnNumber: 7
      }
    }, __jsx("h3", {
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 34,
        columnNumber: 9
      }
    }, "Loading..."));
  }

  return __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, authUser && children);
};

/* harmony default export */ __webpack_exports__["default"] = (LoggedIn);

/***/ }),

/***/ "./pages/NewSearch/mainSearch.js":
/*!***************************************!*\
  !*** ./pages/NewSearch/mainSearch.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MainSearch; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-bootstrap */ "react-bootstrap");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/router */ "next/router");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _utils_fetchAssociations__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/fetchAssociations */ "./utils/fetchAssociations.js");
/* harmony import */ var _context_AuthUserContext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../context/AuthUserContext */ "./context/AuthUserContext.js");
/* harmony import */ var _LoggedIn__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../LoggedIn */ "./pages/LoggedIn.js");
/* harmony import */ var _utils_ClientTable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../utils/ClientTable */ "./utils/ClientTable.js");
/* harmony import */ var _utils_ModelTable__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../utils/ModelTable */ "./utils/ModelTable.js");
/* harmony import */ var _utils_PartTable__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../utils/PartTable */ "./utils/PartTable.js");
/* harmony import */ var _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../styles/MainSearch.module.css */ "./styles/MainSearch.module.css");
/* harmony import */ var _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _context_Firebase__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../context/Firebase */ "./context/Firebase.js");
/* harmony import */ var _utils_itemFormShared__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../utils/itemFormShared */ "./utils/itemFormShared.js");
/* harmony import */ var _components_WarehouseMapModal__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../components/WarehouseMapModal */ "./components/WarehouseMapModal.js");
var _jsxFileName = "C:\\Users\\mack2\\Desktop\\code\\pages\\NewSearch\\mainSearch.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }














 // Predefined warehouse client IDs and display names

const SOCAL_CLIENT_ID = "AIS17182";
const NORCAL_CLIENT_ID = "AIS25097";
const UNASSIGNED_CLIENT_ID = "AIS00404";
const DEFAULT_PAGE_SIZE = 25; // Simulates a network request delay

function simulateNetworkRequest() {
  return new Promise(resolve => setTimeout(resolve, 2000));
} // Custom LoadingButton component


function LoadingButton({
  type,
  name,
  route,
  className
}) {
  const {
    0: isLoading,
    1: setLoading
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    if (isLoading) {
      let cancelled = false;
      simulateNetworkRequest().then(() => {
        if (!cancelled) setLoading(false);
      });
      return () => {
        cancelled = true;
      };
    }
  }, [isLoading]);
  return __jsx(next_link__WEBPACK_IMPORTED_MODULE_2___default.a, {
    href: `/${route}`,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 59,
      columnNumber: 5
    }
  }, __jsx("a", {
    className: `btn btn-${type} ${className || ""}`,
    disabled: isLoading,
    onClick: () => !isLoading && setLoading(true),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 60,
      columnNumber: 7
    }
  }, isLoading ? "Loading..." : name));
} // ---- DATE HELPERS (top-level scope) ----
// Convert anything date-ish into a timestamp (ms since epoch).


function toTime(value) {
  if (!value) return null; // Firestore Timestamp { seconds, nanoseconds }

  if (typeof value === "object" && value !== null && value.seconds != null) {
    try {
      return value.seconds * 1000;
    } catch {
      /* ignore */
    }
  } // Native Date


  if (value instanceof Date) {
    const t = value.getTime();
    return isNaN(t) ? null : t;
  } // Strings


  if (typeof value === "string") {
    // ISO / yyyy-mm-dd
    const iso = Date.parse(value);
    if (!isNaN(iso)) return iso; // mm/dd/yyyy

    const parts = value.split("/");

    if (parts.length === 3) {
      const [mm, dd, yyyy] = parts;
      const alt = Date.parse(`${yyyy}-${mm}-${dd}`);
      if (!isNaN(alt)) return alt;
    }
  } // Last resort


  const t = Date.parse(value);
  return isNaN(t) ? null : t;
} // Canonicalize to 'yyyy-mm-dd' (matches <input type="date">)


function toYMD(value) {
  const t = toTime(value);
  if (t == null) return null;
  const d = new Date(t);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function normalizeText(value) {
  if (value == null) return "";
  return String(value).toLowerCase().trim();
}

function getMachineField(item, key) {
  var _ref, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _item$machineData$key, _item$machineData, _item$machineData2, _item$currentMachineD, _item$currentMachineD2, _item$theMachineData, _item$theMachineData2, _item$TheMachine, _item$TheMachine2;

  if (!item) return null;
  const lower = key.toLowerCase();
  return (_ref = (_ref2 = (_ref3 = (_ref4 = (_ref5 = (_ref6 = (_ref7 = (_item$machineData$key = item === null || item === void 0 ? void 0 : (_item$machineData = item.machineData) === null || _item$machineData === void 0 ? void 0 : _item$machineData[key]) !== null && _item$machineData$key !== void 0 ? _item$machineData$key : item === null || item === void 0 ? void 0 : (_item$machineData2 = item.machineData) === null || _item$machineData2 === void 0 ? void 0 : _item$machineData2[lower]) !== null && _ref7 !== void 0 ? _ref7 : item === null || item === void 0 ? void 0 : (_item$currentMachineD = item.currentMachineData) === null || _item$currentMachineD === void 0 ? void 0 : _item$currentMachineD[key]) !== null && _ref6 !== void 0 ? _ref6 : item === null || item === void 0 ? void 0 : (_item$currentMachineD2 = item.currentMachineData) === null || _item$currentMachineD2 === void 0 ? void 0 : _item$currentMachineD2[lower]) !== null && _ref5 !== void 0 ? _ref5 : item === null || item === void 0 ? void 0 : (_item$theMachineData = item.theMachineData) === null || _item$theMachineData === void 0 ? void 0 : _item$theMachineData[key]) !== null && _ref4 !== void 0 ? _ref4 : item === null || item === void 0 ? void 0 : (_item$theMachineData2 = item.theMachineData) === null || _item$theMachineData2 === void 0 ? void 0 : _item$theMachineData2[lower]) !== null && _ref3 !== void 0 ? _ref3 : item === null || item === void 0 ? void 0 : (_item$TheMachine = item.TheMachine) === null || _item$TheMachine === void 0 ? void 0 : _item$TheMachine[key]) !== null && _ref2 !== void 0 ? _ref2 : item === null || item === void 0 ? void 0 : (_item$TheMachine2 = item.TheMachine) === null || _item$TheMachine2 === void 0 ? void 0 : _item$TheMachine2[lower]) !== null && _ref !== void 0 ? _ref : null;
}

function MainSearch() {
  const {
    signOut
  } = Object(_context_AuthUserContext__WEBPACK_IMPORTED_MODULE_5__["useAuth"])();
  const {
    0: info,
    1: setInfo
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const {
    0: backupInfo,
    1: setBackupInfo
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const {
    0: augmentedInfo,
    1: setAugmentedInfo
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]); // items with clientFromId/currentId added

  const {
    0: isLoading,
    1: setIsLoading
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(true);
  const {
    0: ids,
    1: setID
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const {
    0: show,
    1: setShow
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const {
    0: showFilters,
    1: setShowFilters
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const {
    0: pageSize,
    1: setPageSize
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(DEFAULT_PAGE_SIZE);
  const {
    0: isNavigating,
    1: setIsNavigating
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const {
    0: dItem,
    1: setDItem
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])();
  const {
    0: select,
    1: setSelect
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])("Name");
  const {
    0: showList,
    1: setShowList
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const {
    0: showListSearch,
    1: setShowListSearch
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])("text");
  const {
    0: search,
    1: setSearch
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])("");
  const {
    0: selectedOEM,
    1: setSelectedOEM
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null);
  const {
    0: selectedModality,
    1: setSelectedModality
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null); // Replace the old single client state with two sets:

  const {
    0: selectedClientFrom,
    1: setSelectedClientFrom
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null);
  const {
    0: clientFromButtonText,
    1: setClientFromButtonText
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])("Select Option");
  const {
    0: selectedClientCurrent,
    1: setSelectedClientCurrent
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null);
  const {
    0: clientCurrentButtonText,
    1: setClientCurrentButtonText
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])("Select Option");
  const {
    0: clients,
    1: setClients
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const {
    0: showClientModal,
    1: setShowClientModal
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false); // This state tells the modal which client box is being updated: "from" or "current"

  const {
    0: clientSelectionType,
    1: setClientSelectionType
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null);
  const {
    0: showMap,
    1: setShowMap
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const router = Object(next_router__WEBPACK_IMPORTED_MODULE_3__["useRouter"])();
  const labelBase = ["name", "date", "w/o", "p/n", "s/n"];
  const labelBaseNames = ["name", "date", "wo", "pn", "sn"];
  const sortCheckBase = [false, false, false, false, false, false];

  function withSortIcon(baseLabels, activeIndex, isDesc) {
    return baseLabels.map((text, i) => {
      if (i !== activeIndex) return text; // untouched

      const arrow = isDesc ? " ▼" : " ▲";
      return `${text}${arrow}`;
    });
  }

  const {
    0: labels,
    1: setLabels
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(labelBase);
  const {
    0: sortCheck,
    1: setSortCheck
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(sortCheckBase);
  const {
    0: hoverIndex,
    1: setHoverIndex
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null);
  const {
    0: selectedModel,
    1: setSelectedModel
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null);
  const {
    0: gPos,
    1: setGPos
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null);
  const {
    0: gIde,
    1: setGIde
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null);
  const {
    0: isDeleting,
    1: setIsDeleting
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const {
    0: page,
    1: setPage
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(1);
  const {
    0: pageCursors,
    1: setPageCursors
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const {
    0: hasNextPage,
    1: setHasNextPage
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const fetchSeq = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(0);
  const backfillInFlight = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(false);
  const {
    0: queryEpoch,
    1: setQueryEpoch
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(0);
  const {
    0: loadError,
    1: setLoadError
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null);
  const tableBodyRef = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);
  const rowHeightRef = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(46);
  const headerHeightRef = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(38);
  const LOAD_TIMEOUT_MS = 30000;

  const openMap = () => setShowMap(true);

  const handleMapView = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])((selection = {}) => {
    const params = new URLSearchParams();
    const {
      region,
      sectionLetter,
      sectionNumber,
      pallet,
      bin
    } = selection;
    if (region) params.set("region", region);
    if (sectionLetter) params.set("sectionLetter", sectionLetter);
    if (sectionNumber) params.set("sectionNumber", sectionNumber);
    if (pallet) params.set("pallet", pallet);
    if (bin) params.set("bin", bin);
    const query = params.toString();
    router.push(`/NewSearch/inventory/inventoryManage${query ? `?${query}` : ""}`);
    setShowMap(false);
  }, [router]);
  const startNameTokenBackfill = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(async (reason = "") => {
    if (backfillInFlight.current) return;

    if (false) {}

    backfillInFlight.current = true;
    const db = _context_Firebase__WEBPACK_IMPORTED_MODULE_11__["default"].firestore();
    let lastDoc = null;

    const tokensEqual = (a, b) => {
      if (a.length !== b.length) return false;
      const setA = new Set(a);
      const setB = new Set(b);
      if (setA.size !== setB.size) return false;

      for (const v of setA) if (!setB.has(v)) return false;

      return true;
    };

    try {
      while (true) {
        let query = db.collection("Test").orderBy(_context_Firebase__WEBPACK_IMPORTED_MODULE_11__["default"].firestore.FieldPath.documentId()).limit(200);
        if (lastDoc) query = query.startAfter(lastDoc);
        const snap = await query.get();
        if (snap.empty) break;
        const batch = db.batch();
        let writes = 0;
        snap.docs.forEach(doc => {
          const data = doc.data() || {};
          const name = typeof data.name === "string" ? data.name : "";
          const nameLower = name.toLowerCase();
          const nameTokens = Object(_utils_itemFormShared__WEBPACK_IMPORTED_MODULE_12__["buildNameTokens"])(name);
          const existingTokens = Array.isArray(data.nameTokens) ? Array.from(new Set(data.nameTokens.map(v => String(v)))) : [];
          const needsUpdate = data.nameLower !== nameLower || !tokensEqual(existingTokens, nameTokens);

          if (needsUpdate) {
            batch.update(doc.ref, {
              nameLower,
              nameTokens
            });
            writes += 1;
          }
        });

        if (writes > 0) {
          await batch.commit();
        }

        lastDoc = snap.docs[snap.docs.length - 1];
        await new Promise(resolve => setTimeout(resolve, 25));
      }

      if (false) {}
    } catch (error) {
      console.error("Name token backfill failed:", reason, error);
    } finally {
      backfillInFlight.current = false;
    }
  }, []);
  const searchLower = (search || "").toLowerCase().trim();
  const hasActiveFilters = Boolean(selectedOEM) || Boolean(selectedModality) || Boolean(selectedModel) || Boolean(selectedClientFrom) || Boolean(selectedClientCurrent) || Boolean(searchLower);

  const valueMatches = (value, s) => {
    if (!value) return false;

    if (Array.isArray(value)) {
      return value.some(v => valueMatches(v, s));
    }

    return String(value).toLowerCase().includes(s);
  };

  const matchesFilters = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(item => {
    // hide explicitly hidden items
    if ((item === null || item === void 0 ? void 0 : item.visible) === false) return false; // OEM / Modality / Model filtering

    const OEM = getMachineField(item, "OEM");
    const Modality = getMachineField(item, "Modality");
    const Model = getMachineField(item, "Model");

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
        const wantedDay = searchLower; // yyyy-mm-dd from input

        const itemYMD = toYMD(item === null || item === void 0 ? void 0 : item.date);
        if (itemYMD && itemYMD === wantedDay) return true;

        if (Array.isArray(item === null || item === void 0 ? void 0 : item.descriptions)) {
          if (item.descriptions.some(d => toYMD(d === null || d === void 0 ? void 0 : d.date) === wantedDay)) {
            return true;
          }
        }

        if (Array.isArray(item === null || item === void 0 ? void 0 : item.workOrders)) {
          if (item.workOrders.some(w => toYMD(w === null || w === void 0 ? void 0 : w.date) === wantedDay)) {
            return true;
          }
        }

        return false;
      }

      if (select === "Work Order") {
        return Array.isArray(item === null || item === void 0 ? void 0 : item.workOrders) && item.workOrders.some(wo => valueMatches(wo === null || wo === void 0 ? void 0 : wo.workOrder, searchLower));
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
          return item.descriptions.some(d => valueMatches(d === null || d === void 0 ? void 0 : d.description, searchLower));
        }

        return false;
      }

      if (select === "SKU") {
        return valueMatches(item === null || item === void 0 ? void 0 : item.id, searchLower) || valueMatches(item === null || item === void 0 ? void 0 : item.localSN, searchLower) || valueMatches(item === null || item === void 0 ? void 0 : item.local_sn, searchLower);
      }
    }

    return true;
  }, [selectedOEM, selectedModality, selectedModel, selectedClientFrom, selectedClientCurrent, searchLower, select]);

  const resetPagination = () => {
    setPage(1);
    setPageCursors([]);
    setHasNextPage(false);
  }; // Reset pagination on route/query change (prevents stale pages like “starting at 6”)


  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    resetPagination();
    setQueryEpoch(v => v + 1);
  }, [router.asPath]); // Reset and refetch when filters/search change

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    resetPagination();
    setQueryEpoch(v => v + 1);
  }, [selectedOEM, selectedModality, selectedModel, selectedClientFrom, selectedClientCurrent, search, select]); // Fetch data on component mount and route change

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    fetchData(page);
  }, [page, queryEpoch]);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    if (!(router !== null && router !== void 0 && router.events)) return;

    const handleDone = () => setIsNavigating(false);

    router.events.on("routeChangeComplete", handleDone);
    router.events.on("routeChangeError", handleDone);
    return () => {
      router.events.off("routeChangeComplete", handleDone);
      router.events.off("routeChangeError", handleDone);
    };
  }, [router]);

  async function fetchData(requestedPage = 1) {
    const seq = ++fetchSeq.current;
    let timedOut = false;
    setIsLoading(true);
    setLoadError(null);
    const timeoutId = setTimeout(() => {
      timedOut = true;

      if (seq === fetchSeq.current) {
        setLoadError({
          code: "timeout",
          message: `Loading is taking longer than ${Math.round(LOAD_TIMEOUT_MS / 1000)}s. This is likely due to very selective filters.`
        });
        setIsLoading(false);
      }
    }, LOAD_TIMEOUT_MS);

    try {
      if (router.query.inputText && router.query.selectedType) {
        setSelect(router.query.selectedType);
        setSearch(router.query.inputText);
      }

      const startAfterDoc = requestedPage > 1 ? pageCursors[requestedPage - 2] : null;

      if (requestedPage > 1 && !startAfterDoc) {
        setPage(1);

        if (seq === fetchSeq.current) {
          clearTimeout(timeoutId);
          setIsLoading(false);
        }

        return;
      }

      const effectiveSelect = router.query.selectedType || select;
      const effectiveSearch = router.query.inputText || search;
      const effectiveSearchLower = (effectiveSearch || "").toLowerCase().trim(); // light retry for transient Firestore hiccups

      const load = async (attempt = 1) => {
        try {
          return await Object(_utils_fetchAssociations__WEBPACK_IMPORTED_MODULE_4__["fetchPartsWithMachineDataPage"])({
            pageSize,
            startAfterDoc,
            visibleOnly: true,
            filterFn: hasActiveFilters ? matchesFilters : null,
            search: effectiveSearchLower ? {
              type: effectiveSelect,
              raw: effectiveSearch,
              lower: effectiveSearchLower
            } : null,
            needsMachineData: Boolean(selectedOEM) || Boolean(selectedModality) || Boolean(selectedModel) || Boolean(selectedClientFrom) || Boolean(selectedClientCurrent)
          });
        } catch (e) {
          if (attempt >= 3) throw e;
          await new Promise(r => setTimeout(r, 250 * Math.pow(2, attempt - 1)));
          return load(attempt + 1);
        }
      };

      const {
        parts: data,
        lastDoc,
        hasNextPage: nextPage
      } = await load();
      if (timedOut || seq !== fetchSeq.current) return;
      const hasNameSearch = Boolean(effectiveSearchLower) && effectiveSelect === "Name";

      if (hasNameSearch && (data.length === 0 || data.some(item => !Array.isArray(item === null || item === void 0 ? void 0 : item.nameTokens) || item.nameTokens.length === 0))) {
        startNameTokenBackfill("name-search");
      }

      if (requestedPage === 1 && data.length === 0) {
        setPageCursors([]);
        setHasNextPage(false);
      }

      setBackupInfo(data);
      setLabels(labelBase); // <-- add this line after setBackupInfo(data)

      setID(data.map(item => item.id));

      if (requestedPage > 1 && data.length === 0) {
        setHasNextPage(false);
        setPage(1);
        return;
      }

      setHasNextPage(nextPage);
      setPageCursors(prev => {
        const next = requestedPage === 1 ? [] : [...prev];

        if (lastDoc) {
          next[requestedPage - 1] = lastDoc;
        }

        return next;
      });
      setSelectedItems([]); // Normalize client ids for filtering

      const augmented = data.map(item => {
        var _ref8, _ref9, _item$clientFromId, _item$ClientFrom, _ref10, _ref11, _item$clientCurrentId, _item$ClientCurrent;

        return _objectSpread(_objectSpread({}, item), {}, {
          clientFromId: (_ref8 = (_ref9 = (_item$clientFromId = item === null || item === void 0 ? void 0 : item.clientFromId) !== null && _item$clientFromId !== void 0 ? _item$clientFromId : typeof (item === null || item === void 0 ? void 0 : item.ClientFrom) === "string" ? item.ClientFrom : null) !== null && _ref9 !== void 0 ? _ref9 : item === null || item === void 0 ? void 0 : (_item$ClientFrom = item.ClientFrom) === null || _item$ClientFrom === void 0 ? void 0 : _item$ClientFrom.id) !== null && _ref8 !== void 0 ? _ref8 : null,
          clientCurrentId: (_ref10 = (_ref11 = (_item$clientCurrentId = item === null || item === void 0 ? void 0 : item.clientCurrentId) !== null && _item$clientCurrentId !== void 0 ? _item$clientCurrentId : typeof (item === null || item === void 0 ? void 0 : item.ClientCurrent) === "string" ? item.ClientCurrent : null) !== null && _ref11 !== void 0 ? _ref11 : item === null || item === void 0 ? void 0 : (_item$ClientCurrent = item.ClientCurrent) === null || _item$ClientCurrent === void 0 ? void 0 : _item$ClientCurrent.id) !== null && _ref10 !== void 0 ? _ref10 : null
        });
      });
      setAugmentedInfo(augmented); // default view = filtered (keeps pagination and filters consistent)

      setInfo(augmented.filter(matchesFilters));
    } catch (err) {
      if (seq !== fetchSeq.current) return;
      console.error("Error fetching data:", err);
      const code = (err === null || err === void 0 ? void 0 : err.code) || "unknown";
      setLoadError({
        code,
        message: (err === null || err === void 0 ? void 0 : err.message) || "Failed to load items."
      });
      setInfo([]);
      setAugmentedInfo([]);
    } finally {
      clearTimeout(timeoutId);
      if (seq === fetchSeq.current && !timedOut) setIsLoading(false);
    }
  }

  const searchChangeHandler = event => setSearch(event.target.value); // Filter the currently loaded items (now consistent with paged filtering)


  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    const base = augmentedInfo || [];
    setInfo(base.filter(matchesFilters));
  }, [augmentedInfo, matchesFilters]);

  function sortCheckAll(pos) {
    // Determine next direction: toggle the clicked column only
    const nextSortCheck = sortCheck.map((v, i) => i === pos ? !v : v);
    const isDesc = nextSortCheck[pos]; // true means descending

    const sortedInfo = [...info].sort((a, b) => {
      const key = labelBaseNames[pos];

      if (pos === 1) {
        // DATE column
        const ta = toTime(a[key]);
        const tb = toTime(b[key]); // Put missing dates at the end for ascending, at the start for descending

        if (ta === null && tb === null) return 0;
        if (ta === null) return isDesc ? -1 : 1;
        if (tb === null) return isDesc ? 1 : -1;
        return isDesc ? tb - ta : ta - tb;
      } // NAME or SKU (string-y columns): indexes 0 or 5 in your original logic


      if (pos === 0 || pos === 5) {
        var _a$key, _b$key;

        const av = ((_a$key = a[key]) !== null && _a$key !== void 0 ? _a$key : "").toString();
        const bv = ((_b$key = b[key]) !== null && _b$key !== void 0 ? _b$key : "").toString();
        return isDesc ? bv.localeCompare(av) : av.localeCompare(bv);
      } // Numeric-ish columns (wo, pn, sn) — fall back to string compare if NaN


      const an = Number(a[key]);
      const bn = Number(b[key]);

      if (!isNaN(an) && !isNaN(bn)) {
        return isDesc ? bn - an : an - bn;
      } else {
        var _a$key2, _b$key2;

        const av = ((_a$key2 = a[key]) !== null && _a$key2 !== void 0 ? _a$key2 : "").toString();
        const bv = ((_b$key2 = b[key]) !== null && _b$key2 !== void 0 ? _b$key2 : "").toString();
        return isDesc ? bv.localeCompare(av) : av.localeCompare(bv);
      }
    });
    setInfo(sortedInfo);
    setSortCheck(nextSortCheck); // Update header labels to show the little arrow on the active column

    setLabels(withSortIcon(labelBase, pos, isDesc));
  }

  const rowSelect = item => {
    if (item && item.id) {
      console.log("Selected item:", item);
      setIsNavigating(true);
      router.push("./item/" + item.id);
    } else {
      console.error("Unable to determine the selected item’s ID: ", item);
    }
  };

  const {
    0: selectedItems,
    1: setSelectedItems
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const {
    0: showDeleteModal,
    1: setShowDeleteModal
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);

  const handleSelectItem = id => {
    setSelectedItems(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  }; // setSelectedItems((prev) => {
  //   const newSelection = prev.includes(id)
  //     ? prev.filter((itemId) => itemId !== id)
  //     : [...prev, id];
  //   console.log("Selected items:", newSelection);
  //   return newSelection; // <- important
  // });


  const handleShowDeleteModal = () => setShowDeleteModal(true);

  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  const handleDeleteSelected = async () => {
    setIsDeleting(true);
    const db = _context_Firebase__WEBPACK_IMPORTED_MODULE_11__["default"].firestore();

    try {
      // Loop over each selected item one at a time
      for (const itemId of selectedItems) {
        console.log(itemId);

        try {
          // Delete from "Test" collection
          await db.collection("Test").doc(itemId).delete();
        } catch (err) {
          console.error(`Error deleting document ${itemId} from Test:`, err);
        }

        try {
          // Delete from "Parts" collection
          await db.collection("Parts").doc(itemId).delete();
        } catch (err) {
          console.error(`Error deleting document ${itemId} from Parts:`, err);
        }

        try {
          // Delete associated photos from storage
          await deleteFromStorage(itemId);
        } catch (err) {
          console.error(`Error deleting storage for ${itemId}:`, err);
        }
      } // Update local state by filtering out the deleted items


      setInfo(info.filter(item => !selectedItems.includes(item.id)));
      setSelectedItems([]);
    } catch (error) {
      console.error("Error deleting items:", error);
    } finally {
      setIsDeleting(false);
      handleCloseDeleteModal(); // Optionally, reload the page
      // router.reload();
    }
  };

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  const checkDelete = (event, pos, idsToDelete, name) => {
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


  const hoverStyle = index => ({
    backgroundColor: hoverIndex === index ? "#ddd" : "transparent",
    textAlign: "center",
    cursor: "default"
  });

  const {
    0: dropdown1Text,
    1: setDropdown1Text
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])("Select Option");
  const {
    0: dropdown2Text,
    1: setDropdown2Text
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])("Select Option");

  const handleSelect1 = (eventKey, event) => {
    if (eventKey === "unassigned") {
      setDropdown1Text("Select Option");
      setSelectedOEM(null);
    } else {
      setDropdown1Text(event.target.textContent);
      setSelectedOEM(event.target.textContent);
    }
  };

  const handleSelect2 = (eventKey, event) => {
    if (eventKey === "unassigned") {
      setDropdown2Text("Select Option");
      setSelectedModality(null);
    } else {
      setDropdown2Text(event.target.textContent);
      setSelectedModality(event.target.textContent);
    }
  }; // Build a unique list of clients from the items currently loaded, filtered by OEM/Modality.
  // `type` is "from" or "current" to decide which client ref to read.


  async function buildClientsFromItems(type) {
    const db = _context_Firebase__WEBPACK_IMPORTED_MODULE_11__["default"].firestore();
    const ids = new Set(); // Respect current OEM / Modality filters when deriving client options

    const filtered = augmentedInfo.filter(item => {
      const OEM = getMachineField(item, "OEM");
      const Modality = getMachineField(item, "Modality");

      if (selectedOEM && normalizeText(OEM) !== normalizeText(selectedOEM)) {
        return false;
      }

      if (selectedModality && normalizeText(Modality) !== normalizeText(selectedModality)) {
        return false;
      }

      return true;
    });

    for (const it of filtered) {
      const id = type === "from" ? it.clientFromId : it.clientCurrentId;
      if (id) ids.add(id);
    }

    const out = [];
    const idArray = [...ids];

    for (let i = 0; i < idArray.length; i += 10) {
      const chunk = idArray.slice(i, i + 10);
      const snap = await db.collection("Client").where(_context_Firebase__WEBPACK_IMPORTED_MODULE_11__["default"].firestore.FieldPath.documentId(), "in", chunk).get();
      snap.forEach(doc => {
        const d = doc.data() || {};
        out.push({
          id: doc.id,
          name: d.name || doc.id
        });
      });
    } // sort by name for nicer UX


    out.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    return out;
  } // --------------------
  // CLIENT SELECTION HANDLING
  // --------------------
  // This function fetches clients and opens the client modal.


  const handleClientClick = async () => {
    let safeClients = [];

    try {
      const clientsData = await Object(_utils_fetchAssociations__WEBPACK_IMPORTED_MODULE_4__["fetchClients"])(selectedOEM, selectedModality);
      safeClients = Array.isArray(clientsData) ? clientsData : [];
    } catch (e) {
      console.error("fetchClients failed:", e);
    } // Fallback to building from loaded items if API gave us nothing


    if (safeClients.length === 0) {
      try {
        if (!clientSelectionType) {
          // if somehow not set yet, default to "from"
          setClientSelectionType("from");
        }

        const derived = await buildClientsFromItems(clientSelectionType || "from");
        safeClients = derived;
      } catch (e) {
        console.error("Fallback buildClientsFromItems failed:", e);
        safeClients = [];
      }
    }

    setClients(safeClients);
    setClientSearchTerm("");
    setShowClientModal(true);
  }; // When a client is selected in the modal, we now assume the parameter is a client ID.
  // If the passed value is null, we clear the selection.


  const handleClientSelect = async clientId => {
    console.log("User selected client id:", clientId);

    if (!clientId) {
      if (clientSelectionType === "from") {
        setClientFromButtonText("Select Option");
        setSelectedClientFrom(null);
      } else if (clientSelectionType === "current") {
        setClientCurrentButtonText("Select Option");
        setSelectedClientCurrent(null);
      }

      setShowClientModal(false);
      return;
    }

    try {
      const clientSnap = await _context_Firebase__WEBPACK_IMPORTED_MODULE_11__["default"].firestore().collection("Client").doc(clientId).get();

      if (clientSnap.exists) {
        const clientData = clientSnap.data();

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
    } catch (error) {
      console.error("Error fetching client data:", error);
    }

    setShowClientModal(false);
  };

  const handleClientInfo = (clientId, clientName) => {
    console.log(`Client ID: ${clientId}, Client Name: ${clientName}`);
    router.push("client/" + clientId);
  };

  const handleClearClientSelection = () => {
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


  const {
    0: models,
    1: setModels
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const {
    0: showModelModal,
    1: setShowModelModal
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const {
    0: modelButtonText,
    1: setModelButtonText
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])("Select Option");

  const handleModelClick = async () => {
    const modelsData = await Object(_utils_fetchAssociations__WEBPACK_IMPORTED_MODULE_4__["fetchModels"])(selectedOEM, selectedModality, selectedClientFrom);
    setModels(modelsData);
    setModelSearchTerm("");
    setShowModelModal(true);
  };

  const handleModelSelect = modelName => {
    setModelButtonText(modelName || "Select Option");
    setSelectedModel(modelName || null);
    setShowModelModal(false);
  };

  const handleClearModelSelection = () => {
    setModelButtonText("Select Option");
    setSelectedModel(null);
    setShowModelModal(false);
  }; // --------------------
  // WAREHOUSE BUTTONS (for Client Current)
  // --------------------


  const handleSoCalWarehouseClick = () => {
    setClientCurrentButtonText("SoCal Warehouse");
    setSelectedClientCurrent(SOCAL_CLIENT_ID);
    console.log("Warehouse button clicked: setting Client Current to", SOCAL_CLIENT_ID);
  };

  const handleNorCalWarehouseClick = () => {
    setClientCurrentButtonText("NorCal Warehouse");
    setSelectedClientCurrent(NORCAL_CLIENT_ID);
    console.log("Warehouse button clicked: setting Client Current to", NORCAL_CLIENT_ID);
  };

  const handleWarehouseUnassignedClick = () => {
    setClientCurrentButtonText("Unassigned");
    setSelectedClientCurrent(UNASSIGNED_CLIENT_ID);
    console.log("Warehouse button clicked: setting Client Current to", UNASSIGNED_CLIENT_ID);
  };

  const {
    0: clientSearchTerm,
    1: setClientSearchTerm
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])("");
  const {
    0: modelSearchTerm,
    1: setModelSearchTerm
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])("");

  const deleteFromStorage = async itemId => {
    const storageRef = _context_Firebase__WEBPACK_IMPORTED_MODULE_11__["default"].storage().ref();
    const folderRef = storageRef.child(`Parts/${itemId}/`);

    try {
      const listResult = await folderRef.listAll();
      const deletePromises = listResult.items.map(item => item.delete());
      await Promise.all(deletePromises);
    } catch (error) {
      console.error("Error deleting from storage:", error);
    }
  };

  const deleteFromPartsCollection = async itemId => {
    const db = _context_Firebase__WEBPACK_IMPORTED_MODULE_11__["default"].firestore();

    try {
      await db.collection("Parts").doc(itemId).delete();
      console.log(`Deleted item from Parts collection: ${itemId}`);
    } catch (error) {
      console.error("Error deleting from Parts collection:", error);
    }
  }; //   // Safely convert any date-ish value into a comparable timestamp (ms since epoch).
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


  const totalKnownPages = Math.max(1, pageCursors.filter(Boolean).length + (hasNextPage ? 1 : 0));

  const pageButtons = (() => {
    const buttons = [];
    const maxVisible = 7;

    const pushPage = p => buttons.push(__jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Pagination"].Item, {
      key: `page-${p}`,
      active: p === page,
      onClick: () => setPage(p),
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1059,
        columnNumber: 9
      }
    }, p));

    const pushEllipsis = key => buttons.push(__jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Pagination"].Ellipsis, {
      key: key,
      disabled: true,
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1069,
        columnNumber: 20
      }
    }));

    if (totalKnownPages <= maxVisible) {
      for (let i = 1; i <= totalKnownPages; i += 1) pushPage(i);

      return buttons;
    }

    let start = Math.max(2, page - 1);
    let end = Math.min(totalKnownPages - 1, page + 1);
    const desiredWindow = maxVisible - 2;
    let currentWindow = end - start + 1;
    let remaining = desiredWindow - currentWindow;

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

    for (let i = start; i <= end; i += 1) pushPage(i);

    if (end < totalKnownPages - 1) pushEllipsis("end-ellipsis");
    pushPage(totalKnownPages);
    if (hasNextPage) pushEllipsis("more-ellipsis");
    return buttons;
  })();

  const recalcPageSize = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(() => {
    if (true) return;
    if (page !== 1) return;
    if (!tableBodyRef.current) return;
    const containerHeight = tableBodyRef.current.getBoundingClientRect().height || 0;
    if (!containerHeight) return;
    const headerRow = tableBodyRef.current.querySelector("table thead tr") || tableBodyRef.current.querySelector("thead tr");
    const bodyRow = tableBodyRef.current.querySelector("table tbody tr") || tableBodyRef.current.querySelector("tbody tr");

    if (headerRow) {
      const h = headerRow.getBoundingClientRect().height;
      if (h) headerHeightRef.current = h;
    }

    if (bodyRow) {
      const r = bodyRow.getBoundingClientRect().height;
      if (r) rowHeightRef.current = r;
    }

    const verticalPadding = 24;
    const available = containerHeight - headerHeightRef.current - verticalPadding;
    const estimated = Math.floor(available / rowHeightRef.current);
    const clamped = Math.max(5, Math.min(50, estimated));

    if (clamped > 0 && clamped !== pageSize) {
      setPageSize(clamped);
      resetPagination();
      setQueryEpoch(v => v + 1);
    }
  }, [page, pageSize]);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    if (true) return;
    recalcPageSize();

    const onResize = () => recalcPageSize();

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [recalcPageSize]);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    if (isLoading || page !== 1) return;
    recalcPageSize();
  }, [page, isLoading, recalcPageSize]);

  const renderFilters = idPrefix => __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.filtersPanel,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1155,
      columnNumber: 5
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.filtersHeader,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1156,
      columnNumber: 7
    }
  }, __jsx("div", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1157,
      columnNumber: 9
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.filtersTitle,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1158,
      columnNumber: 11
    }
  }, "Filters"), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.filtersSubtitle,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1159,
      columnNumber: 11
    }
  }, "Narrow results by machine, client, or warehouse.")), hasActiveFilters ? __jsx("span", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.filtersBadge,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1164,
      columnNumber: 11
    }
  }, "Active") : null), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.filterSection,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1168,
      columnNumber: 7
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.filterSectionTitle,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1169,
      columnNumber: 9
    }
  }, "Machine"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["InputGroup"], {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.inputGroup,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1170,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["InputGroup"].Text, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1171,
      columnNumber: 11
    }
  }, "OEM"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Dropdown"], {
    onSelect: handleSelect1,
    className: "w-100",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1172,
      columnNumber: 11
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Dropdown"].Toggle, {
    variant: "outline-secondary",
    id: `${idPrefix}-oem`,
    className: `w-100 ${_styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.inputButton}`,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1173,
      columnNumber: 13
    }
  }, dropdown1Text), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Dropdown"].Menu, {
    className: "w-100",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1180,
      columnNumber: 13
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Dropdown"].Item, {
    eventKey: "unassigned",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1181,
      columnNumber: 15
    }
  }, "Select Option"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Dropdown"].Item, {
    eventKey: "GE",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1182,
      columnNumber: 15
    }
  }, "GE"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Dropdown"].Item, {
    eventKey: "Toshiba",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1183,
      columnNumber: 15
    }
  }, "Toshiba"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Dropdown"].Item, {
    eventKey: "Siemens",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1184,
      columnNumber: 15
    }
  }, "Siemens"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Dropdown"].Item, {
    eventKey: "Philips",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1185,
      columnNumber: 15
    }
  }, "Philips")))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["InputGroup"], {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.inputGroup,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1190,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["InputGroup"].Text, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1191,
      columnNumber: 11
    }
  }, "Modality"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Dropdown"], {
    onSelect: handleSelect2,
    className: "w-100",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1192,
      columnNumber: 11
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Dropdown"].Toggle, {
    variant: "outline-secondary",
    id: `${idPrefix}-modality`,
    className: `w-100 ${_styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.inputButton}`,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1193,
      columnNumber: 13
    }
  }, dropdown2Text), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Dropdown"].Menu, {
    className: "w-100",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1200,
      columnNumber: 13
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Dropdown"].Item, {
    eventKey: "unassigned",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1201,
      columnNumber: 15
    }
  }, "Select Option"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Dropdown"].Item, {
    eventKey: "CT",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1202,
      columnNumber: 15
    }
  }, "CT"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Dropdown"].Item, {
    eventKey: "MRI",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1203,
      columnNumber: 15
    }
  }, "MRI")))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["InputGroup"], {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.inputGroup,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1208,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["InputGroup"].Text, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1209,
      columnNumber: 11
    }
  }, "Model"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    variant: "outline-secondary",
    className: `w-100 ${_styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.inputButton}`,
    onClick: handleModelClick,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1210,
      columnNumber: 11
    }
  }, modelButtonText))), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.filterSection,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1220,
      columnNumber: 7
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.filterSectionTitle,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1221,
      columnNumber: 9
    }
  }, "Client"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["InputGroup"], {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.inputGroup,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1222,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["InputGroup"].Text, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1223,
      columnNumber: 11
    }
  }, "Client From"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    variant: "outline-secondary",
    className: `w-100 ${_styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.inputButton}`,
    onClick: () => handleClientClick("from"),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1224,
      columnNumber: 11
    }
  }, clientFromButtonText)), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["InputGroup"], {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.inputGroup,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1233,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["InputGroup"].Text, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1234,
      columnNumber: 11
    }
  }, "Client Current"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    variant: "outline-secondary",
    className: `w-100 ${_styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.inputButton}`,
    onClick: () => handleClientClick("current"),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1235,
      columnNumber: 11
    }
  }, clientCurrentButtonText))), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.filterSection,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1245,
      columnNumber: 7
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.filterSectionTitle,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1246,
      columnNumber: 9
    }
  }, "Warehouse"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["InputGroup"], {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.inputGroup,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1247,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["InputGroup"].Text, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1248,
      columnNumber: 11
    }
  }, "Quick"), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.buttonGroup,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1249,
      columnNumber: 11
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    variant: "outline-secondary",
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.flexButton,
    onClick: handleSoCalWarehouseClick,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1250,
      columnNumber: 13
    }
  }, "SoCal Warehouse"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    variant: "outline-secondary",
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.flexButton,
    onClick: handleNorCalWarehouseClick,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1257,
      columnNumber: 13
    }
  }, "NorCal Warehouse"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    variant: "outline-secondary",
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.flexButton,
    onClick: handleWarehouseUnassignedClick,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1264,
      columnNumber: 13
    }
  }, "Unassigned")))));

  return __jsx(_LoggedIn__WEBPACK_IMPORTED_MODULE_6__["default"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1279,
      columnNumber: 5
    }
  }, (isDeleting || isNavigating) && __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.loadingOverlay,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1281,
      columnNumber: 9
    }
  }, __jsx("img", {
    src: "/magmo-logo.png",
    alt: "Loading Magmo",
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.loadingLogo,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1282,
      columnNumber: 11
    }
  })), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"], {
    show: showDeleteModal,
    onHide: handleCloseDeleteModal,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1289,
      columnNumber: 7
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Header, {
    closeButton: true,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1290,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Title, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1291,
      columnNumber: 11
    }
  }, "Confirm Deletion")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Body, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1293,
      columnNumber: 9
    }
  }, "Are you sure you want to delete ", selectedItems.length, " item", selectedItems.length > 1 ? "s" : "", "?"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Footer, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1297,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    variant: "danger",
    onClick: handleDeleteSelected,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1298,
      columnNumber: 11
    }
  }, "Yes, delete"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    variant: "secondary",
    onClick: handleCloseDeleteModal,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1301,
      columnNumber: 11
    }
  }, "Cancel"))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"], {
    show: showClientModal,
    onHide: () => setShowClientModal(false),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1307,
      columnNumber: 7
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Header, {
    closeButton: true,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1308,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Title, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1309,
      columnNumber: 11
    }
  }, "Select ", clientSelectionType === "from" ? "Client From" : "Client Current")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Body, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1313,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["FormControl"], {
    type: "text",
    placeholder: "Search by name",
    className: "mb-3",
    value: clientSearchTerm,
    onChange: e => setClientSearchTerm(e.target.value),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1314,
      columnNumber: 11
    }
  }), __jsx(_utils_ClientTable__WEBPACK_IMPORTED_MODULE_7__["default"], {
    clients: (Array.isArray(clients) ? clients : []).filter(client => {
      var _client$name;

      return ((_client$name = client === null || client === void 0 ? void 0 : client.name) !== null && _client$name !== void 0 ? _client$name : "").toLowerCase().includes(clientSearchTerm.toLowerCase());
    }),
    onSelectClient: handleClientSelect,
    onInfoClick: handleClientInfo,
    isClientSearch: false,
    clearSelection: () => handleClientSelect(null),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1321,
      columnNumber: 11
    }
  }))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"], {
    show: showModelModal,
    onHide: () => setShowModelModal(false),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1333,
      columnNumber: 7
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Header, {
    closeButton: true,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1334,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Title, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1335,
      columnNumber: 11
    }
  }, "Select Model")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Body, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1337,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["FormControl"], {
    type: "text",
    placeholder: "Search by name",
    className: "mb-3",
    value: modelSearchTerm,
    onChange: e => setModelSearchTerm(e.target.value),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1338,
      columnNumber: 11
    }
  }), __jsx(_utils_ModelTable__WEBPACK_IMPORTED_MODULE_8__["default"], {
    models: models.filter(model => typeof model === "string" ? model.toLowerCase().includes(modelSearchTerm.toLowerCase()) : false),
    onSelectModel: handleModelSelect,
    clearSelection: () => handleModelSelect(null),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1345,
      columnNumber: 11
    }
  }))), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.page,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1357,
      columnNumber: 7
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.pageInner,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1358,
      columnNumber: 9
    }
  }, __jsx("header", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.header,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1359,
      columnNumber: 11
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.headerLeft,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1360,
      columnNumber: 13
    }
  }, __jsx("button", {
    type: "button",
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.burger,
    onClick: () => setShowFilters(true),
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
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.brand,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1371,
      columnNumber: 15
    }
  }, __jsx("img", {
    src: "/magmo-logo.png",
    alt: "Magmo",
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.brandLogo,
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
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.brandName,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1378,
      columnNumber: 19
    }
  }, "Magmo"), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.brandSub,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1379,
      columnNumber: 19
    }
  }, "Inventory Search")))), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.headerRight,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1383,
      columnNumber: 13
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.headerStatus,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1384,
      columnNumber: 15
    }
  }, hasActiveFilters ? "Filters active" : "All items"))), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.content,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1390,
      columnNumber: 11
    }
  }, __jsx("aside", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.sidebar,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1391,
      columnNumber: 13
    }
  }, renderFilters("sidebar")), __jsx("main", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.main,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1392,
      columnNumber: 13
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.tableCard,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1393,
      columnNumber: 15
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.tableHeader,
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
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.tableTitle,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1396,
      columnNumber: 21
    }
  }, "Items"), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.tableSubtitle,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1397,
      columnNumber: 21
    }
  }, isLoading ? "Loading items" : `${info.length} items on this page`)), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.tableMeta,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1401,
      columnNumber: 19
    }
  }, "Page ", page, " ", hasNextPage ? `of ${totalKnownPages}+` : `of ${totalKnownPages}`)), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.tableBody,
    ref: tableBodyRef,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1406,
      columnNumber: 17
    }
  }, isLoading ? __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.loadingState,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1408,
      columnNumber: 21
    }
  }, __jsx("img", {
    src: "/magmo-logo.png",
    alt: "Loading Magmo",
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.loadingLogo,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1409,
      columnNumber: 23
    }
  }), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.loadingText,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1414,
      columnNumber: 23
    }
  }, "Loading")) : loadError ? __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.errorState,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1417,
      columnNumber: 21
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.errorTitle,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1418,
      columnNumber: 23
    }
  }, "Load failed (", loadError.code, ")"), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.errorMessage,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1421,
      columnNumber: 23
    }
  }, loadError.message), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    variant: "outline-secondary",
    size: "sm",
    onClick: () => {
      resetPagination();
      setQueryEpoch(v => v + 1);
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1422,
      columnNumber: 23
    }
  }, "Retry")) : __jsx(_utils_PartTable__WEBPACK_IMPORTED_MODULE_9__["default"], {
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
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.tableFooter,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1452,
      columnNumber: 17
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.paginationRow,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1453,
      columnNumber: 19
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Pagination"], {
    size: "sm",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1454,
      columnNumber: 21
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Pagination"].Prev, {
    onClick: () => setPage(p => Math.max(1, p - 1)),
    disabled: page <= 1,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1455,
      columnNumber: 23
    }
  }, "Previous"), pageButtons, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Pagination"].Next, {
    onClick: () => setPage(p => p + 1),
    disabled: !hasNextPage,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1462,
      columnNumber: 23
    }
  }, "Next"))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"], {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.searchRow,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1470,
      columnNumber: 19
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["FormControl"], {
    type: showListSearch,
    placeholder: "Search",
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.searchInput,
    "aria-label": "Search",
    value: search,
    onChange: searchChangeHandler,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1471,
      columnNumber: 21
    }
  }), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NavDropdown"], {
    title: select,
    id: "collasible-nav-dropdown",
    show: showList,
    onMouseEnter: () => setShowList(true),
    onMouseLeave: () => setShowList(false),
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.searchSelect,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1479,
      columnNumber: 21
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NavDropdown"].Item, {
    onClick: () => {
      setSelect("Name");
      setShowListSearch("text");
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1487,
      columnNumber: 23
    }
  }, "Name"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NavDropdown"].Item, {
    onClick: () => {
      setSelect("Date");
      setShowListSearch("date");
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1495,
      columnNumber: 23
    }
  }, "Date"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NavDropdown"].Item, {
    onClick: () => {
      setSelect("Work Order");
      setShowListSearch("text");
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1503,
      columnNumber: 23
    }
  }, "Work Order"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NavDropdown"].Item, {
    onClick: () => {
      setSelect("Product Number");
      setShowListSearch("text");
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1511,
      columnNumber: 23
    }
  }, "Product Number"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NavDropdown"].Item, {
    onClick: () => {
      setSelect("Serial Number");
      setShowListSearch("text");
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1519,
      columnNumber: 23
    }
  }, "Serial Number"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NavDropdown"].Item, {
    onClick: () => {
      setSelect("Description");
      setShowListSearch("text");
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1527,
      columnNumber: 23
    }
  }, "Description"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NavDropdown"].Item, {
    onClick: () => {
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
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.footerActions,
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
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.actionButton,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1546,
      columnNumber: 21
    }
  }), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    variant: "info",
    className: `${_styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.actionButton} ${_styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.mapActionButton}`,
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
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.actionButton,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1559,
      columnNumber: 21
    }
  }))))))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Offcanvas"], {
    show: showFilters,
    onHide: () => setShowFilters(false),
    placement: "start",
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.filtersDrawer,
    scroll: true,
    backdrop: true,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1572,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Offcanvas"].Header, {
    closeButton: true,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1580,
      columnNumber: 11
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Offcanvas"].Title, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1581,
      columnNumber: 13
    }
  }, "Filters")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Offcanvas"].Body, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1583,
      columnNumber: 11
    }
  }, renderFilters("drawer"))), __jsx(_components_WarehouseMapModal__WEBPACK_IMPORTED_MODULE_13__["default"], {
    show: showMap,
    onHide: () => setShowMap(false),
    onView: handleMapView,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1586,
      columnNumber: 9
    }
  })));
}

/***/ }),

/***/ "./styles/ClientTable.module.css":
/*!***************************************!*\
  !*** ./styles/ClientTable.module.css ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Exports
module.exports = {
	"clientTableContainer": "ClientTable_clientTableContainer__1e9un",
	"clientTable": "ClientTable_clientTable__194v7",
	"actionRow": "ClientTable_actionRow__9EfKK",
	"actionButtons": "ClientTable_actionButtons__1Vtgg",
	"buttonGroup": "ClientTable_buttonGroup__pSZ7y",
	"flexButton": "ClientTable_flexButton__LoNiS"
};


/***/ }),

/***/ "./styles/MainSearch.module.css":
/*!**************************************!*\
  !*** ./styles/MainSearch.module.css ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Exports
module.exports = {
	"page": "MainSearch_page__3KWre",
	"pageInner": "MainSearch_pageInner__2F-Do",
	"header": "MainSearch_header__2XL-0",
	"headerLeft": "MainSearch_headerLeft__2NHnY",
	"burger": "MainSearch_burger__16E9G",
	"brand": "MainSearch_brand__1HlT8",
	"brandLogo": "MainSearch_brandLogo__1jzlV",
	"brandName": "MainSearch_brandName__3sr6z",
	"brandSub": "MainSearch_brandSub__2Wx6J",
	"headerRight": "MainSearch_headerRight__1c7Xg",
	"headerStatus": "MainSearch_headerStatus__39DSE",
	"content": "MainSearch_content__3_dPC",
	"sidebar": "MainSearch_sidebar__2Qe8Q",
	"filtersPanel": "MainSearch_filtersPanel___mVSq",
	"filtersHeader": "MainSearch_filtersHeader__27ytX",
	"filtersTitle": "MainSearch_filtersTitle__2OPcr",
	"filtersSubtitle": "MainSearch_filtersSubtitle__210Gy",
	"filtersBadge": "MainSearch_filtersBadge__2T6ZC",
	"filterSection": "MainSearch_filterSection__nQm7l",
	"filterSectionTitle": "MainSearch_filterSectionTitle__3YmRX",
	"inputGroup": "MainSearch_inputGroup__24zWb",
	"inputButton": "MainSearch_inputButton__3AQ0k",
	"buttonGroup": "MainSearch_buttonGroup__1GWI6",
	"flexButton": "MainSearch_flexButton__3znqD",
	"main": "MainSearch_main__9qWmb",
	"tableCard": "MainSearch_tableCard__HWP00",
	"tableHeader": "MainSearch_tableHeader__HKUbw",
	"tableTitle": "MainSearch_tableTitle__2gEeo",
	"tableSubtitle": "MainSearch_tableSubtitle__2cB64",
	"tableMeta": "MainSearch_tableMeta__32GOq",
	"tableBody": "MainSearch_tableBody__3oWc_",
	"tableFooter": "MainSearch_tableFooter__Fv3zw",
	"paginationRow": "MainSearch_paginationRow__3ppdE",
	"searchRow": "MainSearch_searchRow__3-6fd",
	"searchInput": "MainSearch_searchInput__25A5U",
	"searchSelect": "MainSearch_searchSelect__30rPg",
	"footerActions": "MainSearch_footerActions__2XPPC",
	"actionButton": "MainSearch_actionButton__3m1LJ",
	"mapActionButton": "MainSearch_mapActionButton__3rHb2",
	"loadingOverlay": "MainSearch_loadingOverlay__1w9WW",
	"spinnerCenter": "MainSearch_spinnerCenter__1RHnj",
	"loadingState": "MainSearch_loadingState__isV-4",
	"loadingLogo": "MainSearch_loadingLogo__3Sh4i",
	"magmo-spin": "MainSearch_magmo-spin__3dFGQ",
	"loadingText": "MainSearch_loadingText__1CCQX",
	"errorState": "MainSearch_errorState__1GlB6",
	"errorTitle": "MainSearch_errorTitle__150u3",
	"errorMessage": "MainSearch_errorMessage__1Lbbg",
	"filtersDrawer": "MainSearch_filtersDrawer__Q6N-m",
	"mapLoading": "MainSearch_mapLoading__171fg",
	"mapError": "MainSearch_mapError__2TQUX",
	"mapStage": "MainSearch_mapStage__245Yb",
	"mapHint": "MainSearch_mapHint__w1rLP",
	"mapCanvas": "MainSearch_mapCanvas__331bH",
	"regionBlock": "MainSearch_regionBlock__n5nnq",
	"regionE": "MainSearch_regionE__1R4hT",
	"regionF": "MainSearch_regionF__1UlI0",
	"regionG": "MainSearch_regionG__2w4OS",
	"regionA": "MainSearch_regionA__3ijLa",
	"regionD": "MainSearch_regionD__3-Njx",
	"regionC": "MainSearch_regionC__BUSOX",
	"regionB": "MainSearch_regionB__35Lw8",
	"gridWrapper": "MainSearch_gridWrapper__qJY3l",
	"grid": "MainSearch_grid__1LLRe",
	"gridCell": "MainSearch_gridCell__ZoFgs",
	"gridCellDisabled": "MainSearch_gridCellDisabled__kSau0",
	"palletGrid": "MainSearch_palletGrid__qEtK0",
	"palletButton": "MainSearch_palletButton__2_86Y",
	"binButton": "MainSearch_binButton__2otqw",
	"mapEmpty": "MainSearch_mapEmpty__2Wz6h",
	"mapFooter": "MainSearch_mapFooter__1Bonr"
};


/***/ }),

/***/ "./styles/PartTable.module.css":
/*!*************************************!*\
  !*** ./styles/PartTable.module.css ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Exports
module.exports = {
	"tableContainer": "PartTable_tableContainer__18TCg",
	"scrollableTable": "PartTable_scrollableTable__2TybW",
	"stickyHeader": "PartTable_stickyHeader__1HJK1",
	"searchContainer": "PartTable_searchContainer__2r7ak",
	"divider": "PartTable_divider__1QxCq",
	"buttonGroup": "PartTable_buttonGroup__3ZfOO",
	"flexButton": "PartTable_flexButton__2po2e",
	"fixedTable": "PartTable_fixedTable__3hJCc",
	"cellClamp": "PartTable_cellClamp__3itXM",
	"actionCol": "PartTable_actionCol__2xfPb",
	"longPressOverlay": "PartTable_longPressOverlay__19I5P",
	"longPressCard": "PartTable_longPressCard__1NuHw"
};


/***/ }),

/***/ "./utils/ClientTable.js":
/*!******************************!*\
  !*** ./utils/ClientTable.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-bootstrap */ "react-bootstrap");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _styles_ClientTable_module_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../styles/ClientTable.module.css */ "./styles/ClientTable.module.css");
/* harmony import */ var _styles_ClientTable_module_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_ClientTable_module_css__WEBPACK_IMPORTED_MODULE_2__);
var _jsxFileName = "C:\\Users\\mack2\\Desktop\\code\\utils\\ClientTable.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;




const ClientTable = ({
  clients,
  onSelectClient,
  onInfoClick,
  clearSelection,
  onAddClient,
  // new prop for add-new-client action
  disableSelect,
  disableInfo,
  isClientSearch
}) => {
  const columnCount = 1 + (disableInfo ? 0 : 1) + (disableSelect ? 0 : 1);
  const showActions = Boolean(clearSelection || onAddClient);
  return __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Table"], {
    striped: true,
    bordered: true,
    hover: true,
    size: "sm",
    className: _styles_ClientTable_module_css__WEBPACK_IMPORTED_MODULE_2___default.a.clientTable,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20,
      columnNumber: 5
    }
  }, __jsx("thead", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21,
      columnNumber: 7
    }
  }, __jsx("tr", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22,
      columnNumber: 9
    }
  }, __jsx("th", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23,
      columnNumber: 11
    }
  }, "Client Name"), !disableInfo && __jsx("th", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24,
      columnNumber: 28
    }
  }, "Info"), !disableSelect && __jsx("th", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25,
      columnNumber: 30
    }
  }, "Select"))), __jsx("tbody", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28,
      columnNumber: 7
    }
  }, showActions && __jsx("tr", {
    className: _styles_ClientTable_module_css__WEBPACK_IMPORTED_MODULE_2___default.a.actionRow,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30,
      columnNumber: 11
    }
  }, __jsx("td", {
    colSpan: columnCount,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31,
      columnNumber: 13
    }
  }, __jsx("div", {
    className: _styles_ClientTable_module_css__WEBPACK_IMPORTED_MODULE_2___default.a.actionButtons,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32,
      columnNumber: 15
    }
  }, clearSelection && __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    variant: "secondary",
    onClick: clearSelection,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 34,
      columnNumber: 19
    }
  }, "Clear Selection"), onAddClient && __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    variant: "primary",
    onClick: onAddClient,
    className: "ms-2",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 39,
      columnNumber: 19
    }
  }, "Add New Client")))), clients.map(client => __jsx("tr", {
    key: client.id,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 52,
      columnNumber: 11
    }
  }, __jsx("td", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 53,
      columnNumber: 13
    }
  }, client.name), !disableInfo && __jsx("td", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55,
      columnNumber: 15
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    variant: "info",
    onClick: () => onInfoClick(client.id, client.name),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 56,
      columnNumber: 17
    }
  }, isClientSearch ? "Edit" : "Info")), !disableSelect && __jsx("td", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 65,
      columnNumber: 15
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    variant: "primary",
    onClick: () => onSelectClient(client.id),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 66,
      columnNumber: 17
    }
  }, "Select"))))));
};

/* harmony default export */ __webpack_exports__["default"] = (ClientTable);

/***/ }),

/***/ "./utils/ModelTable.js":
/*!*****************************!*\
  !*** ./utils/ModelTable.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-bootstrap */ "react-bootstrap");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _styles_ClientTable_module_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../styles/ClientTable.module.css */ "./styles/ClientTable.module.css");
/* harmony import */ var _styles_ClientTable_module_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_ClientTable_module_css__WEBPACK_IMPORTED_MODULE_2__);
var _jsxFileName = "C:\\Users\\mack2\\Desktop\\code\\utils\\ModelTable.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;
// components/ModelTable.js




const ModelTable = ({
  models,
  onSelectModel,
  clearSelection
}) => {
  return __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Table"], {
    striped: true,
    bordered: true,
    hover: true,
    size: "sm",
    className: _styles_ClientTable_module_css__WEBPACK_IMPORTED_MODULE_2___default.a.modelTable,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9,
      columnNumber: 7
    }
  }, __jsx("thead", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10,
      columnNumber: 9
    }
  }, __jsx("tr", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11,
      columnNumber: 11
    }
  }, __jsx("th", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12,
      columnNumber: 13
    }
  }, "Model Name"), __jsx("th", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13,
      columnNumber: 13
    }
  }, "Select"))), __jsx("tbody", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16,
      columnNumber: 9
    }
  }, __jsx("tr", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17,
      columnNumber: 11
    }
  }, __jsx("td", {
    colSpan: "2",
    style: {
      textAlign: "center"
    },
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18,
      columnNumber: 13
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    variant: "secondary",
    onClick: clearSelection,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19,
      columnNumber: 15
    }
  }, "Clear Selection"))), models.map((model, index) => __jsx("tr", {
    key: index,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25,
      columnNumber: 13
    }
  }, __jsx("td", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26,
      columnNumber: 15
    }
  }, model), __jsx("td", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27,
      columnNumber: 15
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    variant: "primary",
    onClick: () => onSelectModel(model),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28,
      columnNumber: 17
    }
  }, "Select")))))));
};

/* harmony default export */ __webpack_exports__["default"] = (ModelTable);

/***/ }),

/***/ "./utils/PartTable.js":
/*!****************************!*\
  !*** ./utils/PartTable.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PartTable; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-bootstrap */ "react-bootstrap");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _fetchAssociations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./fetchAssociations */ "./utils/fetchAssociations.js");
/* harmony import */ var _styles_PartTable_module_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../styles/PartTable.module.css */ "./styles/PartTable.module.css");
/* harmony import */ var _styles_PartTable_module_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_PartTable_module_css__WEBPACK_IMPORTED_MODULE_3__);
var _jsxFileName = "C:\\Users\\mack2\\Desktop\\code\\utils\\PartTable.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;




function PartTable({
  info,
  labels,
  ids,
  hoverStyle,
  sortCheckAll,
  checkDelete,
  isDeleting,
  rowSelect,
  setHoverIndex,
  hoverIndex,
  selectedItems,
  setSelectedItems,
  minRows = 10
}) {
  // const [selectedItems, setSelectedItems] = useState([]);
  const {
    0: longPressName,
    1: setLongPressName
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null);
  const {
    0: isMobile,
    1: setIsMobile
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const pressTimerRef = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);
  const longPressTriggeredRef = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(false);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    if (true) return undefined;
    const media = window.matchMedia("(max-width: 640px)");

    const update = () => setIsMobile(media.matches);

    update();

    if (media.addEventListener) {
      media.addEventListener("change", update);
      return () => media.removeEventListener("change", update);
    }

    media.addListener(update);
    return () => media.removeListener(update);
  }, []); // Toggle selection of items

  const handleSelectItem = id => {
    setSelectedItems(prevSelectedItems => prevSelectedItems.includes(id) ? prevSelectedItems.filter(itemId => itemId !== id) : [...prevSelectedItems, id]);
  }; // Handle delete button click for selected items


  const handleDeleteSelected = () => {
    if (selectedItems.length > 0) {
      checkDelete(null, null, selectedItems, "selected items");
    }
  };

  const startLongPress = name => () => {
    if (!isMobile) return;

    if (pressTimerRef.current) {
      clearTimeout(pressTimerRef.current);
    }

    pressTimerRef.current = setTimeout(() => {
      longPressTriggeredRef.current = true;
      setLongPressName(name);
    }, 450);
  };

  const cancelLongPress = () => {
    if (pressTimerRef.current) {
      clearTimeout(pressTimerRef.current);
      pressTimerRef.current = null;
    }
  };

  const dismissLongPress = () => {
    longPressTriggeredRef.current = false;
    setLongPressName(null);
  };

  const paddingCount = Math.max(0, minRows - info.length);
  return __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx("div", {
    className: _styles_PartTable_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.scrollableTable,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 84,
      columnNumber: 7
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Table"], {
    striped: true,
    bordered: true,
    hover: true,
    size: "sm",
    className: `mb-0 ${_styles_PartTable_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.fixedTable}`,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 85,
      columnNumber: 9
    }
  }, __jsx("thead", {
    className: _styles_PartTable_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.stickyHeader,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 92,
      columnNumber: 11
    }
  }, __jsx("tr", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 93,
      columnNumber: 13
    }
  }, labels.map((item, index) => __jsx("th", {
    style: hoverStyle(index),
    onMouseOver: () => setHoverIndex(index),
    onMouseOut: () => setHoverIndex(null),
    onClick: () => sortCheckAll(index),
    key: index,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 95,
      columnNumber: 17
    }
  }, item)), __jsx("th", {
    className: _styles_PartTable_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.actionCol,
    style: {
      textAlign: "center"
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 105,
      columnNumber: 15
    }
  }, selectedItems.length > 0 ? __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    variant: "danger",
    onClick: handleDeleteSelected,
    disabled: isDeleting,
    size: "sm",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 107,
      columnNumber: 19
    }
  }, "Delete Selected (", selectedItems.length, ")") : "select"))), __jsx("tbody", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 121,
      columnNumber: 11
    }
  }, info.map((item, index) => __jsx("tr", {
    key: index,
    onClick: e => {
      if (longPressTriggeredRef.current) {
        longPressTriggeredRef.current = false;
        return;
      } // Only trigger rowSelect if the target is not a checkbox


      if (e.target.type !== "checkbox") {
        rowSelect(item);
      }
    },
    onTouchStart: startLongPress(item.name),
    onTouchEnd: cancelLongPress,
    onTouchCancel: cancelLongPress,
    onTouchMove: cancelLongPress,
    className: "clickable-row",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 123,
      columnNumber: 15
    }
  }, __jsx("td", {
    style: {
      textAlign: "center",
      cursor: "default"
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 141,
      columnNumber: 17
    }
  }, __jsx("div", {
    className: _styles_PartTable_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.cellClamp,
    title: item.name,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 142,
      columnNumber: 19
    }
  }, item.name)), __jsx("td", {
    style: {
      textAlign: "center",
      cursor: "default"
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 146,
      columnNumber: 17
    }
  }, __jsx("div", {
    className: _styles_PartTable_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.cellClamp,
    title: Object(_fetchAssociations__WEBPACK_IMPORTED_MODULE_2__["formatDate"])(item.date),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 147,
      columnNumber: 19
    }
  }, Object(_fetchAssociations__WEBPACK_IMPORTED_MODULE_2__["formatDate"])(item.date))), __jsx("td", {
    style: {
      textAlign: "center",
      cursor: "default"
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 151,
      columnNumber: 17
    }
  }, __jsx("div", {
    className: _styles_PartTable_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.cellClamp,
    title: item.workOrders && item.workOrders.length > 0 ? item.workOrders[item.workOrders.length - 1].workOrder : "N/A",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 152,
      columnNumber: 19
    }
  }, item.workOrders && item.workOrders.length > 0 ? item.workOrders[item.workOrders.length - 1].workOrder : "N/A")), __jsx("td", {
    style: {
      textAlign: "center",
      cursor: "default"
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 165,
      columnNumber: 17
    }
  }, __jsx("div", {
    className: _styles_PartTable_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.cellClamp,
    title: item.pn,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 166,
      columnNumber: 19
    }
  }, item.pn)), __jsx("td", {
    style: {
      textAlign: "center",
      cursor: "default"
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 170,
      columnNumber: 17
    }
  }, __jsx("div", {
    className: _styles_PartTable_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.cellClamp,
    title: item.sn,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 171,
      columnNumber: 19
    }
  }, item.sn)), __jsx("td", {
    className: _styles_PartTable_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.actionCol,
    style: {
      textAlign: "center"
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 175,
      columnNumber: 17
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Check, {
    type: "checkbox",
    checked: selectedItems.includes(item.id),
    onChange: e => {
      e.stopPropagation(); // Prevent row click when checkbox is clicked
      // Toggle selection using item.id directly

      setSelectedItems(prevSelectedItems => prevSelectedItems.includes(item.id) ? prevSelectedItems.filter(id => id !== item.id) : [...prevSelectedItems, item.id]);
    },
    "aria-label": `Select ${item.name}`,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 176,
      columnNumber: 19
    }
  })))), paddingCount > 0 && Array.from({
    length: paddingCount
  }).map((_, index) => __jsx("tr", {
    key: `empty-${index}`,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 195,
      columnNumber: 17
    }
  }, __jsx("td", {
    colSpan: labels.length + 1,
    style: {
      textAlign: "center"
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 196,
      columnNumber: 19
    }
  }, "\xA0")))))), isMobile && longPressName && __jsx("div", {
    className: _styles_PartTable_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.longPressOverlay,
    onClick: dismissLongPress,
    role: "button",
    tabIndex: 0,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 205,
      columnNumber: 9
    }
  }, __jsx("div", {
    className: _styles_PartTable_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.longPressCard,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 211,
      columnNumber: 11
    }
  }, longPressName)));
}

/***/ }),

/***/ "./utils/fetchAssociations.js":
/*!************************************!*\
  !*** ./utils/fetchAssociations.js ***!
  \************************************/
/*! exports provided: fetchPartsWithMachineData, fetchPartsWithMachineDataPage, fetchClients, fetchModels, formatDate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchPartsWithMachineData", function() { return fetchPartsWithMachineData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchPartsWithMachineDataPage", function() { return fetchPartsWithMachineDataPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchClients", function() { return fetchClients; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchModels", function() { return fetchModels; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatDate", function() { return formatDate; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _context_Firebase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../context/Firebase */ "./context/Firebase.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



async function fetchPartsWithMachineData() {
  const db = _context_Firebase__WEBPACK_IMPORTED_MODULE_1__["default"].firestore();
  const partsSnapshot = await db.collection("Test").get();
  const parts = await Promise.all(partsSnapshot.docs.map(async partDoc => {
    var _ref, _getRefId, _ref2, _getRefId2;

    const partData = partDoc.data();
    partData.id = partDoc.id; // Add document ID here

    const getRefId = ref => {
      if (!ref) return null;
      if (typeof ref === "string") return ref;
      if (ref instanceof _context_Firebase__WEBPACK_IMPORTED_MODULE_1__["default"].firestore.DocumentReference) return ref.id;
      if (ref.id) return ref.id;
      return null;
    };

    partData.clientFromId = (_ref = (_getRefId = getRefId(partData === null || partData === void 0 ? void 0 : partData.ClientFrom)) !== null && _getRefId !== void 0 ? _getRefId : partData === null || partData === void 0 ? void 0 : partData.clientFromId) !== null && _ref !== void 0 ? _ref : null;
    partData.clientCurrentId = (_ref2 = (_getRefId2 = getRefId(partData === null || partData === void 0 ? void 0 : partData.ClientCurrent)) !== null && _getRefId2 !== void 0 ? _getRefId2 : partData === null || partData === void 0 ? void 0 : partData.clientCurrentId) !== null && _ref2 !== void 0 ? _ref2 : null; // console.log(partData);

    const fetchMachineData = async ref => {
      if (!ref) return null;

      if (typeof ref.get === "function") {
        const doc = await ref.get();
        return doc.exists ? doc.data() : null;
      }

      if (typeof ref === "string") {
        const doc = await db.collection("Machine").doc(ref).get();
        return doc.exists ? doc.data() : null;
      }

      if (ref !== null && ref !== void 0 && ref.id) {
        const doc = await db.collection("Machine").doc(ref.id).get();
        return doc.exists ? doc.data() : null;
      }

      return null;
    };

    const machineRef = partData.Machine || partData.MachineFrom;
    const currentMachineRef = partData.CurrentMachine || partData.MachineCurrent;
    const machineData = await fetchMachineData(machineRef);
    partData.machineData = machineData || {};

    if (machineData !== null && machineData !== void 0 && machineData.client) {
      const clientRef = machineData.client;
      const clientId = getRefId(clientRef);

      if (clientId && !partData.clientFromId) {
        partData.clientFromId = clientId;
      }

      if (typeof (clientRef === null || clientRef === void 0 ? void 0 : clientRef.get) === "function") {
        const clientDoc = await clientRef.get();
        partData.machineData.Client = clientDoc.exists ? clientDoc.data().name : "";
      }
    }

    const currentMachineData = await fetchMachineData(currentMachineRef);
    partData.currentMachineData = currentMachineData || {};

    if (currentMachineData !== null && currentMachineData !== void 0 && currentMachineData.client) {
      const clientRef = currentMachineData.client;
      const clientId = getRefId(clientRef);

      if (clientId && !partData.clientCurrentId) {
        partData.clientCurrentId = clientId;
      }

      if (typeof (clientRef === null || clientRef === void 0 ? void 0 : clientRef.get) === "function") {
        const clientDoc = await clientRef.get();
        partData.currentMachineData.Client = clientDoc.exists ? clientDoc.data().name : "";
      }
    }

    return partData;
  }));
  return parts;
} // Paginated version for faster list views (e.g., mainSearch).
// Uses documentId order for stable pagination.

async function fetchPartsWithMachineDataPage({
  pageSize = 25,
  startAfterDoc = null,
  visibleOnly = false,
  filterFn = null,
  needsMachineData = true,
  search = null
} = {}) {
  const db = _context_Firebase__WEBPACK_IMPORTED_MODULE_1__["default"].firestore();
  const limit = pageSize + 1;

  const getRefId = ref => {
    if (!ref) return null;
    if (typeof ref === "string") return ref;
    if (ref instanceof _context_Firebase__WEBPACK_IMPORTED_MODULE_1__["default"].firestore.DocumentReference) return ref.id;
    if (ref.id) return ref.id;
    return null;
  };

  const MACHINE_SELECT_FIELDS = ["OEM", "Modality", "Model", "client", "name"];

  const withMachineSelect = query => typeof query.select === "function" ? query.select(...MACHINE_SELECT_FIELDS) : query;

  const buildPart = (partDoc, machineMap, currentMachineMap) => {
    var _ref3, _getRefId3, _ref4, _getRefId4;

    const partData = partDoc.data();
    partData.id = partDoc.id; // Add document ID here

    partData.clientFromId = (_ref3 = (_getRefId3 = getRefId(partData === null || partData === void 0 ? void 0 : partData.ClientFrom)) !== null && _getRefId3 !== void 0 ? _getRefId3 : partData === null || partData === void 0 ? void 0 : partData.clientFromId) !== null && _ref3 !== void 0 ? _ref3 : null;
    partData.clientCurrentId = (_ref4 = (_getRefId4 = getRefId(partData === null || partData === void 0 ? void 0 : partData.ClientCurrent)) !== null && _getRefId4 !== void 0 ? _getRefId4 : partData === null || partData === void 0 ? void 0 : partData.clientCurrentId) !== null && _ref4 !== void 0 ? _ref4 : null;
    const machineRef = partData.Machine || partData.MachineFrom;
    const currentMachineRef = partData.CurrentMachine || partData.MachineCurrent;
    const machineId = getRefId(machineRef);
    const currentMachineId = getRefId(currentMachineRef);
    const machineData = machineId ? machineMap[machineId] : null;
    const currentMachineData = currentMachineId ? currentMachineMap[currentMachineId] : null;
    partData.machineData = machineData || {};
    partData.currentMachineData = currentMachineData || {};

    if (!partData.clientFromId && machineData !== null && machineData !== void 0 && machineData.client) {
      partData.clientFromId = getRefId(machineData.client);
    }

    if (!partData.clientCurrentId && currentMachineData !== null && currentMachineData !== void 0 && currentMachineData.client) {
      partData.clientCurrentId = getRefId(currentMachineData.client);
    }

    return partData;
  };

  const searchRaw = ((search === null || search === void 0 ? void 0 : search.raw) || "").toString().trim();
  const searchLower = ((search === null || search === void 0 ? void 0 : search.lower) || "").toString().trim();
  const searchType = (search === null || search === void 0 ? void 0 : search.type) || null;
  const hasSearch = Boolean(searchRaw);

  const toTitleCase = text => text.split(" ").filter(Boolean).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

  const buildSearchQuery = () => {
    if (!hasSearch || !searchType) return {
      mode: "scan",
      query: null
    };
    const col = db.collection("Test");

    switch (searchType) {
      case "SKU":
        return {
          mode: "sku",
          query: null
        };

      case "Name":
        {
          const titleFallback = searchRaw && searchRaw === searchRaw.toLowerCase() ? toTitleCase(searchRaw) : null;
          const terms = searchLower ? searchLower.split(/\s+/).filter(Boolean) : [];
          const tokens = [...terms];
          if (searchLower && !tokens.includes(searchLower)) tokens.push(searchLower);
          if (!tokens.length) return {
            mode: "scan",
            query: null
          };

          const prefixQuery = value => col.orderBy("name").startAt(value).endAt(`${value}\uf8ff`);

          return {
            mode: "query",
            query: tokens.length === 1 ? col.where("nameTokens", "array-contains", tokens[0]) : col.where("nameTokens", "array-contains-any", tokens.slice(0, 10)),
            fallback: titleFallback ? () => prefixQuery(titleFallback) : () => prefixQuery(searchRaw)
          };
        }

      case "Product Number":
        return {
          mode: "query",
          query: col.where("pn", "array-contains", searchRaw),
          fallback: () => col.where("pn", "==", searchRaw)
        };

      case "Serial Number":
        return {
          mode: "query",
          query: col.where("sn", "array-contains", searchRaw),
          fallback: () => col.where("sn", "==", searchRaw)
        };

      case "Date":
        {
          const asDate = (() => {
            try {
              const d = new Date(searchRaw);
              return isNaN(d.getTime()) ? null : d;
            } catch {
              return null;
            }
          })();

          return {
            mode: "query",
            query: col.where("date", "==", searchRaw),
            fallback: asDate ? () => col.where("date", "==", asDate) : null
          };
        }

      default:
        return {
          mode: "scan",
          query: null
        };
    }
  };

  const {
    mode: searchMode,
    query: searchQuery,
    fallback: searchFallback
  } = buildSearchQuery();

  if (searchMode === "sku" && hasSearch) {
    const docs = [];
    const rawUpper = searchRaw.toUpperCase();
    let doc = await db.collection("Test").doc(searchRaw).get();

    if (!doc.exists && rawUpper !== searchRaw) {
      doc = await db.collection("Test").doc(rawUpper).get();
    }

    if (doc.exists) docs.push(doc);
    const localValues = rawUpper !== searchRaw ? [searchRaw, rawUpper] : [searchRaw];
    const localSnap = await db.collection("Test").where("localSN", "in", localValues).limit(limit).get();
    localSnap.forEach(d => {
      if (!docs.find(existing => existing.id === d.id)) {
        docs.push(d);
      }
    });
    let machineMap = {};
    let currentMachineMap = {};

    if (needsMachineData && docs.length) {
      const machineIds = new Set();
      const currentMachineIds = new Set();

      for (const docSnap of docs) {
        const raw = docSnap.data();
        const machineId = getRefId(raw.Machine || raw.MachineFrom);
        const currentMachineId = getRefId(raw.CurrentMachine || raw.MachineCurrent);
        if (machineId) machineIds.add(machineId);
        if (currentMachineId) currentMachineIds.add(currentMachineId);
      }

      const fetchMachineMap = async ids => {
        if (!ids.length) return {};
        const out = {};
        const chunks = [];

        for (let i = 0; i < ids.length; i += 10) {
          chunks.push(ids.slice(i, i + 10));
        }

        for (const chunk of chunks) {
          const snap = await withMachineSelect(db.collection("Machine").where(_context_Firebase__WEBPACK_IMPORTED_MODULE_1__["default"].firestore.FieldPath.documentId(), "in", chunk)).get();
          snap.forEach(docSnap => {
            out[docSnap.id] = docSnap.data() || {};
          });
        }

        return out;
      };

      [machineMap, currentMachineMap] = await Promise.all([fetchMachineMap([...machineIds]), fetchMachineMap([...currentMachineIds])]);
    }

    const built = docs.map(docSnap => buildPart(docSnap, machineMap, currentMachineMap)).filter(item => !visibleOnly || (item === null || item === void 0 ? void 0 : item.visible) !== false).filter(item => filterFn ? filterFn(item) : true).slice(0, pageSize);
    return {
      parts: built,
      lastDoc: built.length ? docs[built.length - 1] : null,
      hasNextPage: false
    };
  }

  let parts = [];
  let cursor = startAfterDoc || null;
  let lastDoc = null;
  let pageLastDoc = null;
  let hasNextPage = false;
  let filled = false;
  let usedFallback = false;
  const scanBaseQuery = db.collection("Test").orderBy(_context_Firebase__WEBPACK_IMPORTED_MODULE_1__["default"].firestore.FieldPath.documentId());

  while (true) {
    let query = searchQuery || scanBaseQuery;

    if (searchMode === "query" && usedFallback && searchFallback) {
      query = searchFallback();
    }

    if (cursor) query = query.startAfter(cursor);
    query = query.limit(limit);
    const snap = await query.get();

    if (snap.empty) {
      if (searchMode === "query" && searchFallback && !cursor && !usedFallback) {
        usedFallback = true;
        continue;
      }

      hasNextPage = false;
      break;
    }

    const batchDocs = snap.docs;
    let machineMap = {};
    let currentMachineMap = {};

    if (needsMachineData) {
      const machineIds = new Set();
      const currentMachineIds = new Set();

      for (const doc of batchDocs) {
        const raw = doc.data();

        if (visibleOnly && raw.visible === false) {
          continue;
        }

        const machineId = getRefId(raw.Machine || raw.MachineFrom);
        const currentMachineId = getRefId(raw.CurrentMachine || raw.MachineCurrent);
        if (machineId) machineIds.add(machineId);
        if (currentMachineId) currentMachineIds.add(currentMachineId);
      }

      const fetchMachineMap = async ids => {
        if (!ids.length) return {};
        const out = {};
        const chunks = [];

        for (let i = 0; i < ids.length; i += 10) {
          chunks.push(ids.slice(i, i + 10));
        }

        for (const chunk of chunks) {
          const snap = await withMachineSelect(db.collection("Machine").where(_context_Firebase__WEBPACK_IMPORTED_MODULE_1__["default"].firestore.FieldPath.documentId(), "in", chunk)).get();
          snap.forEach(doc => {
            out[doc.id] = doc.data() || {};
          });
        }

        return out;
      };

      [machineMap, currentMachineMap] = await Promise.all([fetchMachineMap([...machineIds]), fetchMachineMap([...currentMachineIds])]);
    }

    for (let i = 0; i < snap.docs.length; i++) {
      const doc = batchDocs[i];
      cursor = doc;
      const raw = doc.data();

      if (visibleOnly && raw.visible === false) {
        continue; // skip hidden items but keep advancing the cursor
      }

      const built = buildPart(doc, machineMap, currentMachineMap);

      if (filterFn && !filterFn(built)) {
        continue;
      }

      if (!filled) {
        parts.push(built);

        if (parts.length === pageSize) {
          filled = true;
          pageLastDoc = doc;
        }

        continue;
      } // We already filled the page and found an extra matching item.


      hasNextPage = true;
      return {
        parts,
        lastDoc: pageLastDoc,
        hasNextPage
      };
    } // We exhausted this batch without filling the page.


    if (snap.size < limit) {
      hasNextPage = false;
      break;
    } // There might be more docs; continue scanning for visible items.


    hasNextPage = true;
  }

  lastDoc = pageLastDoc || (parts.length ? cursor : null);
  return {
    parts,
    lastDoc,
    hasNextPage: filled ? hasNextPage : false
  };
}
async function fetchClients(selectedOEM, selectedModality) {
  const db = _context_Firebase__WEBPACK_IMPORTED_MODULE_1__["default"].firestore();
  const clientsSnapshot = await db.collection("Client").get();
  const clients = clientsSnapshot.docs.map(doc => _objectSpread({
    id: doc.id
  }, doc.data())); // Filter clients based on OEM and Modality if selected

  if (selectedOEM || selectedModality) {
    const filteredClients = [];

    for (const client of clients) {
      let match = true;

      if (selectedOEM || selectedModality) {
        for (const machineRef of client.machines) {
          const machineDoc = await machineRef.get();
          const machineData = machineDoc.data();

          if (selectedOEM && machineData.OEM === selectedOEM || selectedModality && machineData.Modality === selectedModality) {
            match = true;
            break;
          } else {
            match = false;
          }
        }
      }

      if (match) {
        filteredClients.push(client);
      }
    }

    return filteredClients;
  }

  return clients;
}
async function fetchModels(selectedOEM, selectedModality, selectedClient) {
  const db = _context_Firebase__WEBPACK_IMPORTED_MODULE_1__["default"].firestore();
  const machinesSnapshot = await db.collection("Machine").get();
  const models = new Set();
  await Promise.all(machinesSnapshot.docs.map(async machineDoc => {
    const machineData = machineDoc.data();
    let isValid = true;
    if (selectedOEM && machineData.OEM !== selectedOEM) isValid = false;
    if (selectedModality && machineData.Modality !== selectedModality) isValid = false;

    if (selectedClient && machineData.client) {
      var _machineData$client;

      let clientDoc = null;

      if (typeof ((_machineData$client = machineData.client) === null || _machineData$client === void 0 ? void 0 : _machineData$client.get) === "function") {
        clientDoc = await machineData.client.get();
      } else if (typeof machineData.client === "string") {
        clientDoc = await db.collection("Client").doc(machineData.client).get();
      }

      if (!clientDoc || !clientDoc.exists) {
        isValid = false;
      } else {
        const clientName = clientDoc.data().name;
        const clientId = clientDoc.id;

        if (selectedClient !== clientName && selectedClient !== clientId) {
          isValid = false;
        }
      }
    }

    if (isValid) {
      models.add(machineData.Model);
    }
  }));
  return Array.from(models);
}
function formatDate(timestamp) {
  if (!timestamp) return "";
  let date;

  if (timestamp.toDate) {
    date = timestamp.toDate();
  } else if (typeof timestamp === "string" || typeof timestamp === "number") {
    date = new Date(timestamp);
  } else {
    return ""; // handle unexpected formats
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}

/***/ }),

/***/ "./utils/itemFormShared.js":
/*!*********************************!*\
  !*** ./utils/itemFormShared.js ***!
  \*********************************/
/*! exports provided: buildLocalLocObject, formatLoc, getPriorityMachineField, updateMachineFields, buildNameTokens */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildLocalLocObject", function() { return buildLocalLocObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatLoc", function() { return formatLoc; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPriorityMachineField", function() { return getPriorityMachineField; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateMachineFields", function() { return updateMachineFields; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildNameTokens", function() { return buildNameTokens; });
function buildLocalLocObject(loc) {
  var _loc$section, _loc$section2;

  const o = {};
  if (loc !== null && loc !== void 0 && loc.region) o.region = loc.region;
  if (loc !== null && loc !== void 0 && (_loc$section = loc.section) !== null && _loc$section !== void 0 && _loc$section.letter && loc !== null && loc !== void 0 && (_loc$section2 = loc.section) !== null && _loc$section2 !== void 0 && _loc$section2.number) o.section = loc.section;
  if ((loc === null || loc === void 0 ? void 0 : loc.bin) !== undefined && (loc === null || loc === void 0 ? void 0 : loc.bin) !== "") o.bin = loc.bin;
  if ((loc === null || loc === void 0 ? void 0 : loc.pallet) !== undefined && (loc === null || loc === void 0 ? void 0 : loc.pallet) !== "") o.pallet = loc.pallet;
  return o;
}
function formatLoc(loc) {
  var _loc$section3, _loc$section4;

  if (!loc) return "";
  const parts = [];
  if (loc.region) parts.push(loc.region);

  if ((_loc$section3 = loc.section) !== null && _loc$section3 !== void 0 && _loc$section3.letter && (_loc$section4 = loc.section) !== null && _loc$section4 !== void 0 && _loc$section4.number) {
    parts.push(`${loc.section.letter}${loc.section.number}`);
  }

  if (loc.bin) parts.push(`B${loc.bin}`);
  if (loc.pallet) parts.push(`P${loc.pallet}`);
  return parts.join("–");
}

function isValidField(value) {
  if (typeof value !== "string") return Boolean(value);
  const trimmed = value.trim();
  return trimmed !== "" && trimmed !== "N/A";
}

function getPriorityMachineField(field, theMachine, currentMachine, fromMachine) {
  if (theMachine && isValidField(theMachine[field])) return theMachine[field];
  if (currentMachine && isValidField(currentMachine[field])) return currentMachine[field];
  if (fromMachine && isValidField(fromMachine[field])) return fromMachine[field];
  return "";
}
function updateMachineFields(theMachine, currentMachine, fromMachine) {
  const pick = (primary, fallback) => getPriorityMachineField(primary, theMachine, currentMachine, fromMachine) || getPriorityMachineField(fallback, theMachine, currentMachine, fromMachine);

  return {
    oem: pick("OEM", "oem"),
    modality: pick("Modality", "modality"),
    model: pick("Model", "model")
  };
}
function buildNameTokens(name) {
  if (!name || typeof name !== "string") return [];
  const lower = name.toLowerCase().trim();
  if (!lower) return [];
  const tokens = lower.split(/[^a-z0-9]+/).filter(Boolean); // include the full phrase so exact multi-word searches can match

  tokens.push(lower);
  return Array.from(new Set(tokens));
}

/***/ }),

/***/ "firebase/compat/app":
/*!**************************************!*\
  !*** external "firebase/compat/app" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("firebase/compat/app");

/***/ }),

/***/ "firebase/compat/auth":
/*!***************************************!*\
  !*** external "firebase/compat/auth" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("firebase/compat/auth");

/***/ }),

/***/ "firebase/compat/firestore":
/*!********************************************!*\
  !*** external "firebase/compat/firestore" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("firebase/compat/firestore");

/***/ }),

/***/ "firebase/compat/storage":
/*!******************************************!*\
  !*** external "firebase/compat/storage" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("firebase/compat/storage");

/***/ }),

/***/ "next/router":
/*!******************************!*\
  !*** external "next/router" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next/router");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-bootstrap":
/*!**********************************!*\
  !*** external "react-bootstrap" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-bootstrap");

/***/ }),

/***/ "react-is":
/*!***************************!*\
  !*** external "react-is" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-is");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibmV4dC9kaXN0L25leHQtc2VydmVyL2xpYi9yb3V0ZXItY29udGV4dC5qc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm5leHQvZGlzdC9uZXh0LXNlcnZlci9saWIvcm91dGVyL3V0aWxzL2dldC1hc3NldC1wYXRoLWZyb20tcm91dGUuanNcIiIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL1dhcmVob3VzZU1hcE1vZGFsLmpzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvV2FyZWhvdXNlTWFwTW9kYWwubW9kdWxlLmNzcyIsIndlYnBhY2s6Ly8vLi9jb250ZXh0L0F1dGhVc2VyQ29udGV4dC5qcyIsIndlYnBhY2s6Ly8vLi9jb250ZXh0L0ZpcmViYXNlLmpzIiwid2VicGFjazovLy8uL2NvbnRleHQvdXNlRmlyZWJhc2VBdXRoLmpzIiwid2VicGFjazovLy8uLi8uLi9jbGllbnQvbGluay50c3giLCJ3ZWJwYWNrOi8vLy4uLy4uL2NsaWVudC9ub3JtYWxpemUtdHJhaWxpbmctc2xhc2gudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uL2NsaWVudC9yZXF1ZXN0LWlkbGUtY2FsbGJhY2sudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uL2NsaWVudC9yb3V0ZS1sb2FkZXIudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uL2NsaWVudC9yb3V0ZXIudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uL2NsaWVudC91c2UtaW50ZXJzZWN0aW9uLnRzeCIsIndlYnBhY2s6Ly8vLi4vLi4vY2xpZW50L3dpdGgtcm91dGVyLnRzeCIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL3BhdGgtdG8tcmVnZXhwL2luZGV4LmpzIiwid2VicGFjazovLy8uLi8uLi8uLi8uLi9uZXh0LXNlcnZlci9saWIvaTE4bi9ub3JtYWxpemUtbG9jYWxlLXBhdGgudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL25leHQtc2VydmVyL2xpYi9taXR0LnRzIiwid2VicGFjazovLy8uLi8uLi8uLi8uLi9uZXh0LXNlcnZlci9saWIvcm91dGVyL3JvdXRlci50cyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vLi4vbmV4dC1zZXJ2ZXIvbGliL3JvdXRlci91dGlscy9mb3JtYXQtdXJsLnRzIiwid2VicGFjazovLy8uLi8uLi8uLi8uLi8uLi9uZXh0LXNlcnZlci9saWIvcm91dGVyL3V0aWxzL2lzLWR5bmFtaWMudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uLy4uL25leHQtc2VydmVyL2xpYi9yb3V0ZXIvdXRpbHMvcGFyc2UtcmVsYXRpdmUtdXJsLnRzIiwid2VicGFjazovLy8uLi8uLi8uLi8uLi8uLi9uZXh0LXNlcnZlci9saWIvcm91dGVyL3V0aWxzL3BhdGgtbWF0Y2gudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uLy4uL25leHQtc2VydmVyL2xpYi9yb3V0ZXIvdXRpbHMvcHJlcGFyZS1kZXN0aW5hdGlvbi50cyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vLi4vbmV4dC1zZXJ2ZXIvbGliL3JvdXRlci91dGlscy9xdWVyeXN0cmluZy50cyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vLi4vbmV4dC1zZXJ2ZXIvbGliL3JvdXRlci91dGlscy9yZXNvbHZlLXJld3JpdGVzLnRzIiwid2VicGFjazovLy8uLi8uLi8uLi8uLi8uLi9uZXh0LXNlcnZlci9saWIvcm91dGVyL3V0aWxzL3JvdXRlLW1hdGNoZXIudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uLy4uL25leHQtc2VydmVyL2xpYi9yb3V0ZXIvdXRpbHMvcm91dGUtcmVnZXgudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL25leHQtc2VydmVyL2xpYi91dGlscy50cyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L25leHQtc2VydmVyL3NlcnZlci9kZW5vcm1hbGl6ZS1wYWdlLXBhdGguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL25leHQvbGluay5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmV4dC9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL25leHQvbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVXaWxkY2FyZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmV4dC9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy90eXBlb2YuanMiLCJ3ZWJwYWNrOi8vLy4vcGFnZXMvTG9nZ2VkSW4uanMiLCJ3ZWJwYWNrOi8vLy4vcGFnZXMvTmV3U2VhcmNoL21haW5TZWFyY2guanMiLCJ3ZWJwYWNrOi8vLy4vc3R5bGVzL0NsaWVudFRhYmxlLm1vZHVsZS5jc3MiLCJ3ZWJwYWNrOi8vLy4vc3R5bGVzL01haW5TZWFyY2gubW9kdWxlLmNzcyIsIndlYnBhY2s6Ly8vLi9zdHlsZXMvUGFydFRhYmxlLm1vZHVsZS5jc3MiLCJ3ZWJwYWNrOi8vLy4vdXRpbHMvQ2xpZW50VGFibGUuanMiLCJ3ZWJwYWNrOi8vLy4vdXRpbHMvTW9kZWxUYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi91dGlscy9QYXJ0VGFibGUuanMiLCJ3ZWJwYWNrOi8vLy4vdXRpbHMvZmV0Y2hBc3NvY2lhdGlvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vdXRpbHMvaXRlbUZvcm1TaGFyZWQuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZmlyZWJhc2UvY29tcGF0L2FwcFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImZpcmViYXNlL2NvbXBhdC9hdXRoXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZmlyZWJhc2UvY29tcGF0L2ZpcmVzdG9yZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImZpcmViYXNlL2NvbXBhdC9zdG9yYWdlXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibmV4dC9yb3V0ZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LWJvb3RzdHJhcFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LWlzXCIiXSwibmFtZXMiOlsiUkVHSU9OX09SREVSIiwiTk9fUEFMTEVUIiwiTEVUVEVSUyIsIkFycmF5IiwiZnJvbSIsImxlbmd0aCIsIl8iLCJpIiwiU3RyaW5nIiwiZnJvbUNoYXJDb2RlIiwiTlVNQkVSUyIsIldhcmVob3VzZU1hcE1vZGFsIiwic2hvdyIsIm9uSGlkZSIsIm9uVmlldyIsIm9uU2VsZWN0aW9uQ2hhbmdlIiwiaW5pdGlhbFNlbGVjdGlvbiIsInJlZ2lvbk9wdGlvbnMiLCJzZXRSZWdpb25PcHRpb25zIiwidXNlU3RhdGUiLCJzZWN0aW9uTWFwIiwic2V0U2VjdGlvbk1hcCIsIm1hcFN0ZXAiLCJzZXRNYXBTdGVwIiwibWFwUmVnaW9uIiwic2V0TWFwUmVnaW9uIiwibWFwUm93Iiwic2V0TWFwUm93IiwibWFwQ29sIiwic2V0TWFwQ29sIiwibWFwUGFsbGV0Iiwic2V0TWFwUGFsbGV0IiwibWFwQmluIiwic2V0TWFwQmluIiwibWFwQ2VsbFBhbGxldHMiLCJzZXRNYXBDZWxsUGFsbGV0cyIsIm1hcFBhbGxldEJpbnMiLCJzZXRNYXBQYWxsZXRCaW5zIiwibWFwTG9hZGluZyIsInNldE1hcExvYWRpbmciLCJtYXBFcnJvciIsInNldE1hcEVycm9yIiwiZGlyZWN0b3J5TG9hZGVkIiwic2V0RGlyZWN0b3J5TG9hZGVkIiwibGFzdFNob3dSZWYiLCJ1c2VSZWYiLCJub3RpZnlTZWxlY3Rpb25DaGFuZ2UiLCJ1c2VDYWxsYmFjayIsInNlbGVjdGlvbiIsImxvYWREaXJlY3RvcnkiLCJkb2MiLCJmaXJlYmFzZSIsImZpcmVzdG9yZSIsImNvbGxlY3Rpb24iLCJnZXQiLCJkYXRhIiwiUmVnaW9uIiwiU2VjdGlvbiIsImVycm9yIiwiY29uc29sZSIsImxvYWRSZWdpb25JbnZlbnRvcnkiLCJyZWdpb25JZCIsInNuYXAiLCJ3aGVyZSIsImNlbGxQYWxsZXRzIiwicGFsbGV0QmlucyIsImZvckVhY2giLCJsb2MiLCJuZXdMb2NhbEN1cnJlbnQiLCJyb3ciLCJzZWN0aW9uIiwibGV0dGVyIiwiY29sIiwibnVtYmVyIiwidHJpbW1lZCIsInRyaW0iLCJzbGljZSIsInVuZGVmaW5lZCIsInBhbGxldCIsImJpbiIsImNlbGxLZXkiLCJoYXNCaW4iLCJoYXNQYWxsZXQiLCJwYWxsZXRJZCIsIlNldCIsImFkZCIsInBhbGxldEtleSIsImNlbGxPYmoiLCJPYmplY3QiLCJrZXlzIiwia2V5Iiwic29ydCIsImEiLCJiIiwibmEiLCJOdW1iZXIiLCJuYiIsImlzRmluaXRlIiwibG9jYWxlQ29tcGFyZSIsInBhbGxldE9iaiIsImdldFJlZ2lvbkRpbWVuc2lvbnMiLCJlbnRyeSIsImlzQXJyYXkiLCJjb2xzIiwicGFyc2VJbnQiLCJyb3dzIiwidXNlRWZmZWN0Iiwid2FzT3BlbiIsImN1cnJlbnQiLCJyZWdpb24iLCJzZWN0aW9uTGV0dGVyIiwic2VjdGlvbk51bWJlciIsImhhbmRsZVNlbGVjdFJlZ2lvbiIsImhhbmRsZVNlbGVjdENlbGwiLCJyb3dMZXR0ZXIiLCJjb2xOdW1iZXIiLCJjb2xWYWx1ZSIsImhhbmRsZVNlbGVjdFBhbGxldCIsInBhbGxldFZhbHVlIiwibm9ybWFsaXplZFBhbGxldCIsImhhbmRsZVNlbGVjdEJpbiIsImJpbklkIiwiYmluVmFsdWUiLCJoYW5kbGVCYWNrIiwiaGFuZGxlVmlldyIsInN0eWxlcyIsIm1hcFN0YWdlIiwibWFwSGludCIsIm1hcENhbnZhcyIsIm1hcCIsInJlZ2lvbkJsb2NrIiwiaW5jbHVkZXMiLCJkaW1zIiwicmV2ZXJzZSIsInNlY3Rpb25LZXlzIiwiZmlsdGVyIiwiQm9vbGVhbiIsInNwbGl0IiwibWFwRW1wdHkiLCJncmlkV3JhcHBlciIsInBhbGxldEdyaWQiLCJwYWxsZXRCdXR0b24iLCJncmlkIiwiaGFzUGFsbGV0cyIsImdyaWRDZWxsIiwiZ3JpZENlbGxEaXNhYmxlZCIsImJpbnMiLCJiaW5CdXR0b24iLCJtYXBGb290ZXIiLCJhdXRoVXNlckNvbnRleHQiLCJjcmVhdGVDb250ZXh0IiwiYXV0aFVzZXIiLCJsb2FkaW5nIiwic2lnbkluV2l0aEdvb2dsZSIsInNpZ25PdXQiLCJBdXRoVXNlclByb3ZpZGVyIiwiY2hpbGRyZW4iLCJhdXRoIiwidXNlRmlyZWJhc2VBdXRoIiwidXNlQXV0aCIsInVzZUNvbnRleHQiLCJGaXJlYmFzZUNyZWRlbnRpYWxzIiwiYXBpS2V5IiwiYXV0aERvbWFpbiIsInByb2plY3RJZCIsInN0b3JhZ2VCdWNrZXQiLCJtZXNzYWdpbmdTZW5kZXJJZCIsImFwcElkIiwibWVhc3VyZW1lbnRJZCIsIkZpcmViYXNlIiwiYXBwcyIsImluaXRpYWxpemVBcHAiLCJmb3JtYXRBdXRoVXNlciIsInVzZXIiLCJ1aWQiLCJlbWFpbCIsInNldEF1dGhVc2VyIiwic2V0TG9hZGluZyIsImF1dGhTdGF0ZUNoYW5nZWQiLCJhdXRoU3RhdGUiLCJmb3JtYXR0ZWRVc2VyIiwiY2xlYXIiLCJwcm92aWRlciIsIkdvb2dsZUF1dGhQcm92aWRlciIsInNldEN1c3RvbVBhcmFtZXRlcnMiLCJwcm9tcHQiLCJzaWduSW5XaXRoUmVkaXJlY3QiLCJjYXRjaCIsInRoZW4iLCJ1bnN1YnNjcmliZSIsInNldFBlcnNpc3RlbmNlIiwiQXV0aCIsIlBlcnNpc3RlbmNlIiwiTE9DQUwiLCJvbkF1dGhTdGF0ZUNoYW5nZWQiLCJwcmVmZXRjaGVkIiwicm91dGVyIiwiZXJyIiwiY3VyTG9jYWxlIiwib3B0aW9ucyIsImhyZWYiLCJldmVudCIsInRhcmdldCIsImUiLCJub2RlTmFtZSIsImlzTW9kaWZpZWRFdmVudCIsInNjcm9sbCIsImFzIiwicmVwbGFjZSIsImFyZ3MiLCJleHBlY3RlZCIsImFjdHVhbCIsInJlcXVpcmVkUHJvcHNHdWFyZCIsInJlcXVpcmVkUHJvcHMiLCJwcm9wcyIsImNyZWF0ZVByb3BFcnJvciIsIm9wdGlvbmFsUHJvcHNHdWFyZCIsInNoYWxsb3ciLCJwYXNzSHJlZiIsInByZWZldGNoIiwibG9jYWxlIiwib3B0aW9uYWxQcm9wcyIsInZhbFR5cGUiLCJoYXNXYXJuZWQiLCJSZWFjdCIsInAiLCJwYXRobmFtZSIsInJlc29sdmVkQXMiLCJjaGlsZCIsIkNoaWxkcmVuIiwiY2hpbGRSZWYiLCJyb290TWFyZ2luIiwic2V0UmVmIiwiZWwiLCJzZXRJbnRlcnNlY3Rpb25SZWYiLCJzaG91bGRQcmVmZXRjaCIsImlzVmlzaWJsZSIsImlzUHJlZmV0Y2hlZCIsImNoaWxkUHJvcHMiLCJyZWYiLCJvbkNsaWNrIiwibGlua0NsaWNrZWQiLCJwcmlvcml0eSIsImxvY2FsZURvbWFpbiIsIkxpbmsiLCJwYXRoIiwibm9ybWFsaXplUGF0aFRyYWlsaW5nU2xhc2giLCJwcm9jZXNzIiwicmVxdWVzdElkbGVDYWxsYmFjayIsInNlbGYiLCJzdGFydCIsIkRhdGUiLCJzZXRUaW1lb3V0IiwiY2IiLCJkaWRUaW1lb3V0IiwidGltZVJlbWFpbmluZyIsIk1hdGgiLCJjYW5jZWxJZGxlQ2FsbGJhY2siLCJjbGVhclRpbWVvdXQiLCJNU19NQVhfSURMRV9ERUxBWSIsIlByb21pc2UiLCJwcm9tIiwicmVzb2x2ZSIsInJlc29sdmVyIiwiZnV0dXJlIiwiZ2VuZXJhdG9yIiwidmFsdWUiLCJsaW5rIiwiZG9jdW1lbnQiLCJ3aW5kb3ciLCJjYW5QcmVmZXRjaCIsImhhc1ByZWZldGNoIiwicmVzIiwiQVNTRVRfTE9BRF9FUlJPUiIsIlN5bWJvbCIsInNjcmlwdCIsInJlamVjdCIsIm1hcmtBc3NldEVycm9yIiwic3JjIiwiY2FuY2VsbGVkIiwiciIsIm9uQnVpbGRNYW5pZmVzdCIsInJlc29sdmVQcm9taXNlV2l0aFRpbWVvdXQiLCJzY3JpcHRzIiwiYXNzZXRQcmVmaXgiLCJlbmNvZGVVUkkiLCJjc3MiLCJnZXRDbGllbnRCdWlsZE1hbmlmZXN0IiwibWFuaWZlc3QiLCJyb3V0ZSIsImFsbEZpbGVzIiwidiIsImVudHJ5cG9pbnRzIiwibG9hZGVkU2NyaXB0cyIsInN0eWxlU2hlZXRzIiwicm91dGVzIiwiYXBwZW5kU2NyaXB0IiwiZmV0Y2giLCJ0ZXh0IiwiY29udGVudCIsIndoZW5FbnRyeXBvaW50Iiwid2l0aEZ1dHVyZSIsIm9uRW50cnlwb2ludCIsImZuIiwiZXhwb3J0cyIsImNvbXBvbmVudCIsImlucHV0Iiwib2xkIiwibG9hZFJvdXRlIiwiZ2V0RmlsZXNGb3JSb3V0ZSIsImVudHJ5cG9pbnQiLCJjbiIsIm5hdmlnYXRvciIsIm91dHB1dCIsInByZWZldGNoVmlhRG9tIiwiY3JlYXRlUm91dGVMb2FkZXIiLCJzaW5nbGV0b25Sb3V0ZXIiLCJyZWFkeUNhbGxiYWNrcyIsInJlYWR5IiwidXJsUHJvcGVydHlGaWVsZHMiLCJyb3V0ZXJFdmVudHMiLCJjb3JlTWV0aG9kRmllbGRzIiwiUm91dGVyIiwiZmllbGQiLCJnZXRSb3V0ZXIiLCJldmVudEZpZWxkIiwiX3NpbmdsZXRvblJvdXRlciIsIm1lc3NhZ2UiLCJzdGFjayIsIlJvdXRlckNvbnRleHQiLCJjcmVhdGVSb3V0ZXIiLCJfcm91dGVyIiwiaW5zdGFuY2UiLCJoYXNJbnRlcnNlY3Rpb25PYnNlcnZlciIsImlzRGlzYWJsZWQiLCJkaXNhYmxlZCIsInVub2JzZXJ2ZSIsIm9ic2VydmUiLCJzZXRWaXNpYmxlIiwiaWRsZUNhbGxiYWNrIiwiY3JlYXRlT2JzZXJ2ZXIiLCJlbGVtZW50cyIsIm9ic2VydmVyIiwib2JzZXJ2ZXJzIiwiaWQiLCJlbnRyaWVzIiwiY2FsbGJhY2siLCJDb21wb3NlZENvbXBvbmVudCIsImdldEluaXRpYWxQcm9wcyIsIldpdGhSb3V0ZXJXcmFwcGVyIiwibmFtZSIsInBhdGhuYW1lUGFydHMiLCJsb2NhbGVzIiwiZGV0ZWN0ZWRMb2NhbGUiLCJhbGwiLCJvbiIsIm9mZiIsImVtaXQiLCJoYW5kbGVyIiwiYmFzZVBhdGgiLCJwcmVmaXgiLCJwYXRoTm9RdWVyeUhhc2giLCJxdWVyeUluZGV4IiwiaGFzaEluZGV4IiwiYWRkUGF0aFByZWZpeCIsInVybCIsImxvY2F0aW9uT3JpZ2luIiwicmVzb2x2ZWQiLCJoYXNCYXNlUGF0aCIsImludGVycG9sYXRlZFJvdXRlIiwiZHluYW1pY1JlZ2V4IiwiZHluYW1pY0dyb3VwcyIsImR5bmFtaWNNYXRjaGVzIiwiYXNQYXRobmFtZSIsInBhcmFtcyIsInBhcmFtIiwicmVwbGFjZWQiLCJyZXBlYXQiLCJvcHRpb25hbCIsInNlZ21lbnQiLCJlbmNvZGVVUklDb21wb25lbnQiLCJyZXN1bHQiLCJmaWx0ZXJlZFF1ZXJ5IiwicXVlcnkiLCJiYXNlIiwidXJsQXNTdHJpbmciLCJpc0xvY2FsVVJMIiwicmVzb2x2ZUFzIiwiZmluYWxVcmwiLCJpbnRlcnBvbGF0ZWRBcyIsImludGVycG9sYXRlQXMiLCJoYXNoIiwib21pdFBhcm1zRnJvbVF1ZXJ5IiwicmVzb2x2ZWRIcmVmIiwib3JpZ2luIiwicmVzb2x2ZUhyZWYiLCJocmVmSGFkT3JpZ2luIiwiYXNIYWRPcmlnaW4iLCJzdHJpcE9yaWdpbiIsInByZXBhcmVkVXJsIiwiYWRkQmFzZVBhdGgiLCJwcmVwYXJlZEFzIiwiY2xlYW5QYXRobmFtZSIsInBhZ2VzIiwicGFnZSIsIm1hbnVhbFNjcm9sbFJlc3RvcmF0aW9uIiwiU1NHX0RBVEFfTk9UX0ZPVU5EIiwiY3JlZGVudGlhbHMiLCJhdHRlbXB0cyIsImZldGNoUmV0cnkiLCJub3RGb3VuZCIsImlzU2VydmVyUmVuZGVyIiwiY29uc3RydWN0b3IiLCJhc1BhdGgiLCJjb21wb25lbnRzIiwic2RjIiwic2RyIiwic3ViIiwiY2xjIiwicGFnZUxvYWRlciIsIl9icHMiLCJldmVudHMiLCJfd3JhcEFwcCIsImlzU3NyIiwiaXNGYWxsYmFjayIsIl9pbkZsaWdodFJvdXRlIiwiX3NoYWxsb3ciLCJkZWZhdWx0TG9jYWxlIiwiZG9tYWluTG9jYWxlcyIsImlzUmVhZHkiLCJpc1ByZXZpZXciLCJpc0xvY2FsZURvbWFpbiIsIl9pZHgiLCJzdGF0ZSIsImluaXRpYWwiLCJfX05fU1NHIiwiaW5pdGlhbFByb3BzIiwiX19OX1NTUCIsIkNvbXBvbmVudCIsImF1dG9FeHBvcnREeW5hbWljIiwicmVsb2FkIiwiYmFjayIsInB1c2giLCJwcmVwYXJlVXJsQXMiLCJzaG91bGRSZXNvbHZlSHJlZiIsImxvY2FsZUNoYW5nZSIsIlNUIiwicGVyZm9ybWFuY2UiLCJyb3V0ZVByb3BzIiwiYWRkTG9jYWxlIiwiZGVsQmFzZVBhdGgiLCJjbGVhbmVkQXMiLCJkZWxMb2NhbGUiLCJwYXJzZWQiLCJfX3Jld3JpdGVzIiwibWV0aG9kIiwicmV3cml0ZXNSZXN1bHQiLCJyZXNvbHZlRHluYW1pY1JvdXRlIiwicGFyc2VkQXMiLCJyb3V0ZVJlZ2V4Iiwicm91dGVNYXRjaCIsInNob3VsZEludGVycG9sYXRlIiwibWlzc2luZ1BhcmFtcyIsInJvdXRlSW5mbyIsImRlc3RpbmF0aW9uIiwicGFyc2VkSHJlZiIsIm5vdEZvdW5kUm91dGUiLCJhcHBDb21wIiwiaXNWYWxpZFNoYWxsb3dSb3V0ZSIsImZvcmNlZFNjcm9sbCIsIngiLCJ5IiwiY2hhbmdlU3RhdGUiLCJfX04iLCJpZHgiLCJidWlsZENhbmNlbGxhdGlvbkVycm9yIiwiZXhpc3RpbmdSb3V0ZUluZm8iLCJjYWNoZWRSb3V0ZUluZm8iLCJyZXF1aXJlIiwiaXNWYWxpZEVsZW1lbnRUeXBlIiwiZGF0YUhyZWYiLCJzZXQiLCJiZWZvcmVQb3BTdGF0ZSIsIm9ubHlBSGFzaENoYW5nZSIsIm5ld0hhc2giLCJvbGRVcmxOb0hhc2giLCJvbGRIYXNoIiwic2Nyb2xsVG9IYXNoIiwiaWRFbCIsIm5hbWVFbCIsInVybElzTmV3IiwiaXNTc2ciLCJjYW5jZWwiLCJjb21wb25lbnRSZXN1bHQiLCJfZ2V0RGF0YSIsIl9nZXRTdGF0aWNEYXRhIiwiZmV0Y2hOZXh0RGF0YSIsIl9nZXRTZXJ2ZXJEYXRhIiwiQXBwVHJlZSIsImN0eCIsImFib3J0Q29tcG9uZW50TG9hZCIsIm5vdGlmeSIsInNsYXNoZWRQcm90b2NvbHMiLCJwcm90b2NvbCIsInVybE9iaiIsImhvc3QiLCJob3N0bmFtZSIsInF1ZXJ5c3RyaW5nIiwic2VhcmNoIiwiVEVTVF9ST1VURSIsImdsb2JhbEJhc2UiLCJyZXNvbHZlZEJhc2UiLCJtYXRjaGVyT3B0aW9ucyIsInNlbnNpdGl2ZSIsImRlbGltaXRlciIsImN1c3RvbVJvdXRlTWF0Y2hlck9wdGlvbnMiLCJzdHJpY3QiLCJjdXN0b21Sb3V0ZSIsIm1hdGNoZXJSZWdleCIsInBhdGhUb1JlZ2V4cCIsIm1hdGNoZXIiLCJnZXRTYWZlUGFyYW1OYW1lIiwicGFyYW1OYW1lIiwibmV3UGFyYW1OYW1lIiwiY2hhckNvZGUiLCJhbGxNYXRjaCIsImhhcyIsImhhc0l0ZW0iLCJyZXEiLCJtYXRjaGVzIiwiZ3JvdXBLZXkiLCJ2YWxpZGF0ZSIsInBhcnNlZERlc3RpbmF0aW9uIiwiaGFkTG9jYWxlIiwiZGVzdFF1ZXJ5IiwiZGVzdFBhdGgiLCJkZXN0UGF0aFBhcmFtS2V5cyIsImRlc3RQYXRoUGFyYW1zIiwiZGVzdGluYXRpb25Db21waWxlciIsInN0ck9yQXJyYXkiLCJjb21waWxlTm9uUGF0aCIsInBhcmFtS2V5cyIsImFwcGVuZFBhcmFtc1RvUXVlcnkiLCJuZXdVcmwiLCJzZWFyY2hQYXJhbXMiLCJpc05hTiIsIml0ZW0iLCJzdHJpbmdpZnlVcmxRdWVyeVBhcmFtIiwic2VhcmNoUGFyYW1zTGlzdCIsImN1c3RvbVJvdXRlTWF0Y2hlciIsIm1hdGNoZWRQYWdlIiwiZnNQYXRobmFtZSIsImhhbmRsZVJld3JpdGUiLCJyZXdyaXRlIiwiaGFzUGFyYW1zIiwiaGVhZGVycyIsImNvb2tpZXMiLCJhY2MiLCJkZXN0UmVzIiwiZmluaXNoZWQiLCJyZXdyaXRlcyIsInJlIiwiZGVjb2RlIiwiZGVjb2RlVVJJQ29tcG9uZW50Iiwic2x1Z05hbWUiLCJnIiwiZ3JvdXBzIiwibSIsInN0ciIsInNlZ21lbnRzIiwibm9ybWFsaXplZFJvdXRlIiwiZ3JvdXBJbmRleCIsInBhcmFtZXRlcml6ZWRSb3V0ZSIsInBhcnNlUGFyYW1ldGVyIiwicG9zIiwiZXNjYXBlUmVnZXgiLCJyb3V0ZUtleUNoYXJDb2RlIiwicm91dGVLZXlDaGFyTGVuZ3RoIiwiZ2V0U2FmZVJvdXRlS2V5Iiwicm91dGVLZXkiLCJyb3V0ZUtleXMiLCJuYW1lZFBhcmFtZXRlcml6ZWRSb3V0ZSIsImNsZWFuZWRLZXkiLCJpbnZhbGlkS2V5IiwibmFtZWRSZWdleCIsInVzZWQiLCJwb3J0IiwiZ2V0TG9jYXRpb25PcmlnaW4iLCJBcHAiLCJnZXREaXNwbGF5TmFtZSIsInBhZ2VQcm9wcyIsImxvYWRHZXRJbml0aWFsUHJvcHMiLCJpc1Jlc1NlbnQiLCJ1cmxPYmplY3RLZXlzIiwiU1AiLCJMb2dnZWRJbiIsInVzZVJvdXRlciIsImxvZyIsInRpbWVyIiwibWluSGVpZ2h0IiwiU09DQUxfQ0xJRU5UX0lEIiwiTk9SQ0FMX0NMSUVOVF9JRCIsIlVOQVNTSUdORURfQ0xJRU5UX0lEIiwiREVGQVVMVF9QQUdFX1NJWkUiLCJzaW11bGF0ZU5ldHdvcmtSZXF1ZXN0IiwiTG9hZGluZ0J1dHRvbiIsInR5cGUiLCJjbGFzc05hbWUiLCJpc0xvYWRpbmciLCJ0b1RpbWUiLCJzZWNvbmRzIiwidCIsImdldFRpbWUiLCJpc28iLCJwYXJzZSIsInBhcnRzIiwibW0iLCJkZCIsInl5eXkiLCJhbHQiLCJ0b1lNRCIsImQiLCJnZXRGdWxsWWVhciIsImdldE1vbnRoIiwicGFkU3RhcnQiLCJnZXREYXRlIiwibm9ybWFsaXplVGV4dCIsInRvTG93ZXJDYXNlIiwiZ2V0TWFjaGluZUZpZWxkIiwibG93ZXIiLCJtYWNoaW5lRGF0YSIsImN1cnJlbnRNYWNoaW5lRGF0YSIsInRoZU1hY2hpbmVEYXRhIiwiVGhlTWFjaGluZSIsIk1haW5TZWFyY2giLCJpbmZvIiwic2V0SW5mbyIsImJhY2t1cEluZm8iLCJzZXRCYWNrdXBJbmZvIiwiYXVnbWVudGVkSW5mbyIsInNldEF1Z21lbnRlZEluZm8iLCJzZXRJc0xvYWRpbmciLCJpZHMiLCJzZXRJRCIsInNldFNob3ciLCJzaG93RmlsdGVycyIsInNldFNob3dGaWx0ZXJzIiwicGFnZVNpemUiLCJzZXRQYWdlU2l6ZSIsImlzTmF2aWdhdGluZyIsInNldElzTmF2aWdhdGluZyIsImRJdGVtIiwic2V0REl0ZW0iLCJzZWxlY3QiLCJzZXRTZWxlY3QiLCJzaG93TGlzdCIsInNldFNob3dMaXN0Iiwic2hvd0xpc3RTZWFyY2giLCJzZXRTaG93TGlzdFNlYXJjaCIsInNldFNlYXJjaCIsInNlbGVjdGVkT0VNIiwic2V0U2VsZWN0ZWRPRU0iLCJzZWxlY3RlZE1vZGFsaXR5Iiwic2V0U2VsZWN0ZWRNb2RhbGl0eSIsInNlbGVjdGVkQ2xpZW50RnJvbSIsInNldFNlbGVjdGVkQ2xpZW50RnJvbSIsImNsaWVudEZyb21CdXR0b25UZXh0Iiwic2V0Q2xpZW50RnJvbUJ1dHRvblRleHQiLCJzZWxlY3RlZENsaWVudEN1cnJlbnQiLCJzZXRTZWxlY3RlZENsaWVudEN1cnJlbnQiLCJjbGllbnRDdXJyZW50QnV0dG9uVGV4dCIsInNldENsaWVudEN1cnJlbnRCdXR0b25UZXh0IiwiY2xpZW50cyIsInNldENsaWVudHMiLCJzaG93Q2xpZW50TW9kYWwiLCJzZXRTaG93Q2xpZW50TW9kYWwiLCJjbGllbnRTZWxlY3Rpb25UeXBlIiwic2V0Q2xpZW50U2VsZWN0aW9uVHlwZSIsInNob3dNYXAiLCJzZXRTaG93TWFwIiwibGFiZWxCYXNlIiwibGFiZWxCYXNlTmFtZXMiLCJzb3J0Q2hlY2tCYXNlIiwid2l0aFNvcnRJY29uIiwiYmFzZUxhYmVscyIsImFjdGl2ZUluZGV4IiwiaXNEZXNjIiwiYXJyb3ciLCJsYWJlbHMiLCJzZXRMYWJlbHMiLCJzb3J0Q2hlY2siLCJzZXRTb3J0Q2hlY2siLCJob3ZlckluZGV4Iiwic2V0SG92ZXJJbmRleCIsInNlbGVjdGVkTW9kZWwiLCJzZXRTZWxlY3RlZE1vZGVsIiwiZ1BvcyIsInNldEdQb3MiLCJnSWRlIiwic2V0R0lkZSIsImlzRGVsZXRpbmciLCJzZXRJc0RlbGV0aW5nIiwic2V0UGFnZSIsInBhZ2VDdXJzb3JzIiwic2V0UGFnZUN1cnNvcnMiLCJoYXNOZXh0UGFnZSIsInNldEhhc05leHRQYWdlIiwiZmV0Y2hTZXEiLCJiYWNrZmlsbEluRmxpZ2h0IiwicXVlcnlFcG9jaCIsInNldFF1ZXJ5RXBvY2giLCJsb2FkRXJyb3IiLCJzZXRMb2FkRXJyb3IiLCJ0YWJsZUJvZHlSZWYiLCJyb3dIZWlnaHRSZWYiLCJoZWFkZXJIZWlnaHRSZWYiLCJMT0FEX1RJTUVPVVRfTVMiLCJvcGVuTWFwIiwiaGFuZGxlTWFwVmlldyIsIlVSTFNlYXJjaFBhcmFtcyIsInRvU3RyaW5nIiwic3RhcnROYW1lVG9rZW5CYWNrZmlsbCIsInJlYXNvbiIsImRiIiwibGFzdERvYyIsInRva2Vuc0VxdWFsIiwic2V0QSIsInNldEIiLCJzaXplIiwib3JkZXJCeSIsIkZpZWxkUGF0aCIsImRvY3VtZW50SWQiLCJsaW1pdCIsInN0YXJ0QWZ0ZXIiLCJlbXB0eSIsImJhdGNoIiwid3JpdGVzIiwiZG9jcyIsIm5hbWVMb3dlciIsIm5hbWVUb2tlbnMiLCJidWlsZE5hbWVUb2tlbnMiLCJleGlzdGluZ1Rva2VucyIsIm5lZWRzVXBkYXRlIiwidXBkYXRlIiwiY29tbWl0Iiwic2VhcmNoTG93ZXIiLCJoYXNBY3RpdmVGaWx0ZXJzIiwidmFsdWVNYXRjaGVzIiwicyIsInNvbWUiLCJtYXRjaGVzRmlsdGVycyIsInZpc2libGUiLCJPRU0iLCJNb2RhbGl0eSIsIk1vZGVsIiwiY2xpZW50RnJvbUlkIiwiY2xpZW50Q3VycmVudElkIiwid2FudGVkRGF5IiwiaXRlbVlNRCIsImRhdGUiLCJkZXNjcmlwdGlvbnMiLCJ3b3JrT3JkZXJzIiwidyIsIndvIiwid29ya09yZGVyIiwicG4iLCJzbiIsImRlc2MiLCJkZXNjcmlwdGlvbiIsImxvY2FsU04iLCJsb2NhbF9zbiIsInJlc2V0UGFnaW5hdGlvbiIsImZldGNoRGF0YSIsImhhbmRsZURvbmUiLCJyZXF1ZXN0ZWRQYWdlIiwic2VxIiwidGltZWRPdXQiLCJ0aW1lb3V0SWQiLCJjb2RlIiwicm91bmQiLCJpbnB1dFRleHQiLCJzZWxlY3RlZFR5cGUiLCJzdGFydEFmdGVyRG9jIiwiZWZmZWN0aXZlU2VsZWN0IiwiZWZmZWN0aXZlU2VhcmNoIiwiZWZmZWN0aXZlU2VhcmNoTG93ZXIiLCJsb2FkIiwiYXR0ZW1wdCIsImZldGNoUGFydHNXaXRoTWFjaGluZURhdGFQYWdlIiwidmlzaWJsZU9ubHkiLCJmaWx0ZXJGbiIsInJhdyIsIm5lZWRzTWFjaGluZURhdGEiLCJwb3ciLCJuZXh0UGFnZSIsImhhc05hbWVTZWFyY2giLCJwcmV2IiwibmV4dCIsInNldFNlbGVjdGVkSXRlbXMiLCJhdWdtZW50ZWQiLCJDbGllbnRGcm9tIiwiQ2xpZW50Q3VycmVudCIsInNlYXJjaENoYW5nZUhhbmRsZXIiLCJzb3J0Q2hlY2tBbGwiLCJuZXh0U29ydENoZWNrIiwic29ydGVkSW5mbyIsInRhIiwidGIiLCJhdiIsImJ2IiwiYW4iLCJibiIsInJvd1NlbGVjdCIsInNlbGVjdGVkSXRlbXMiLCJzaG93RGVsZXRlTW9kYWwiLCJzZXRTaG93RGVsZXRlTW9kYWwiLCJoYW5kbGVTZWxlY3RJdGVtIiwiaGFuZGxlU2hvd0RlbGV0ZU1vZGFsIiwiaGFuZGxlQ2xvc2VEZWxldGVNb2RhbCIsImhhbmRsZURlbGV0ZVNlbGVjdGVkIiwiaXRlbUlkIiwiZGVsZXRlIiwiZGVsZXRlRnJvbVN0b3JhZ2UiLCJoYW5kbGVDbG9zZSIsImhhbmRsZVNob3ciLCJjaGVja0RlbGV0ZSIsImlkc1RvRGVsZXRlIiwicHJldmVudERlZmF1bHQiLCJzdG9wUHJvcGFnYXRpb24iLCJob3ZlclN0eWxlIiwiaW5kZXgiLCJiYWNrZ3JvdW5kQ29sb3IiLCJ0ZXh0QWxpZ24iLCJjdXJzb3IiLCJkcm9wZG93bjFUZXh0Iiwic2V0RHJvcGRvd24xVGV4dCIsImRyb3Bkb3duMlRleHQiLCJzZXREcm9wZG93bjJUZXh0IiwiaGFuZGxlU2VsZWN0MSIsImV2ZW50S2V5IiwidGV4dENvbnRlbnQiLCJoYW5kbGVTZWxlY3QyIiwiYnVpbGRDbGllbnRzRnJvbUl0ZW1zIiwiZmlsdGVyZWQiLCJpdCIsIm91dCIsImlkQXJyYXkiLCJjaHVuayIsImhhbmRsZUNsaWVudENsaWNrIiwic2FmZUNsaWVudHMiLCJjbGllbnRzRGF0YSIsImZldGNoQ2xpZW50cyIsImRlcml2ZWQiLCJzZXRDbGllbnRTZWFyY2hUZXJtIiwiaGFuZGxlQ2xpZW50U2VsZWN0IiwiY2xpZW50SWQiLCJjbGllbnRTbmFwIiwiZXhpc3RzIiwiY2xpZW50RGF0YSIsImhhbmRsZUNsaWVudEluZm8iLCJjbGllbnROYW1lIiwiaGFuZGxlQ2xlYXJDbGllbnRTZWxlY3Rpb24iLCJtb2RlbHMiLCJzZXRNb2RlbHMiLCJzaG93TW9kZWxNb2RhbCIsInNldFNob3dNb2RlbE1vZGFsIiwibW9kZWxCdXR0b25UZXh0Iiwic2V0TW9kZWxCdXR0b25UZXh0IiwiaGFuZGxlTW9kZWxDbGljayIsIm1vZGVsc0RhdGEiLCJmZXRjaE1vZGVscyIsInNldE1vZGVsU2VhcmNoVGVybSIsImhhbmRsZU1vZGVsU2VsZWN0IiwibW9kZWxOYW1lIiwiaGFuZGxlQ2xlYXJNb2RlbFNlbGVjdGlvbiIsImhhbmRsZVNvQ2FsV2FyZWhvdXNlQ2xpY2siLCJoYW5kbGVOb3JDYWxXYXJlaG91c2VDbGljayIsImhhbmRsZVdhcmVob3VzZVVuYXNzaWduZWRDbGljayIsImNsaWVudFNlYXJjaFRlcm0iLCJtb2RlbFNlYXJjaFRlcm0iLCJzdG9yYWdlUmVmIiwic3RvcmFnZSIsImZvbGRlclJlZiIsImxpc3RSZXN1bHQiLCJsaXN0QWxsIiwiZGVsZXRlUHJvbWlzZXMiLCJpdGVtcyIsImRlbGV0ZUZyb21QYXJ0c0NvbGxlY3Rpb24iLCJ0b3RhbEtub3duUGFnZXMiLCJtYXgiLCJwYWdlQnV0dG9ucyIsImJ1dHRvbnMiLCJtYXhWaXNpYmxlIiwicHVzaFBhZ2UiLCJwdXNoRWxsaXBzaXMiLCJlbmQiLCJtaW4iLCJkZXNpcmVkV2luZG93IiwiY3VycmVudFdpbmRvdyIsInJlbWFpbmluZyIsInJlY2FsY1BhZ2VTaXplIiwiY29udGFpbmVySGVpZ2h0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiaGVpZ2h0IiwiaGVhZGVyUm93IiwicXVlcnlTZWxlY3RvciIsImJvZHlSb3ciLCJoIiwidmVydGljYWxQYWRkaW5nIiwiYXZhaWxhYmxlIiwiZXN0aW1hdGVkIiwiZmxvb3IiLCJjbGFtcGVkIiwib25SZXNpemUiLCJhZGRFdmVudExpc3RlbmVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInJlbmRlckZpbHRlcnMiLCJpZFByZWZpeCIsImZpbHRlcnNQYW5lbCIsImZpbHRlcnNIZWFkZXIiLCJmaWx0ZXJzVGl0bGUiLCJmaWx0ZXJzU3VidGl0bGUiLCJmaWx0ZXJzQmFkZ2UiLCJmaWx0ZXJTZWN0aW9uIiwiZmlsdGVyU2VjdGlvblRpdGxlIiwiaW5wdXRHcm91cCIsImlucHV0QnV0dG9uIiwiYnV0dG9uR3JvdXAiLCJmbGV4QnV0dG9uIiwibG9hZGluZ092ZXJsYXkiLCJsb2FkaW5nTG9nbyIsImNsaWVudCIsIm1vZGVsIiwicGFnZUlubmVyIiwiaGVhZGVyIiwiaGVhZGVyTGVmdCIsImJ1cmdlciIsImJyYW5kIiwiYnJhbmRMb2dvIiwiYnJhbmROYW1lIiwiYnJhbmRTdWIiLCJoZWFkZXJSaWdodCIsImhlYWRlclN0YXR1cyIsInNpZGViYXIiLCJtYWluIiwidGFibGVDYXJkIiwidGFibGVIZWFkZXIiLCJ0YWJsZVRpdGxlIiwidGFibGVTdWJ0aXRsZSIsInRhYmxlTWV0YSIsInRhYmxlQm9keSIsImxvYWRpbmdTdGF0ZSIsImxvYWRpbmdUZXh0IiwiZXJyb3JTdGF0ZSIsImVycm9yVGl0bGUiLCJlcnJvck1lc3NhZ2UiLCJ0YWJsZUZvb3RlciIsInBhZ2luYXRpb25Sb3ciLCJzZWFyY2hSb3ciLCJzZWFyY2hJbnB1dCIsInNlYXJjaFNlbGVjdCIsImZvb3RlckFjdGlvbnMiLCJhY3Rpb25CdXR0b24iLCJtYXBBY3Rpb25CdXR0b24iLCJmaWx0ZXJzRHJhd2VyIiwiQ2xpZW50VGFibGUiLCJvblNlbGVjdENsaWVudCIsIm9uSW5mb0NsaWNrIiwiY2xlYXJTZWxlY3Rpb24iLCJvbkFkZENsaWVudCIsImRpc2FibGVTZWxlY3QiLCJkaXNhYmxlSW5mbyIsImlzQ2xpZW50U2VhcmNoIiwiY29sdW1uQ291bnQiLCJzaG93QWN0aW9ucyIsImNsaWVudFRhYmxlIiwiYWN0aW9uUm93IiwiYWN0aW9uQnV0dG9ucyIsIk1vZGVsVGFibGUiLCJvblNlbGVjdE1vZGVsIiwibW9kZWxUYWJsZSIsIlBhcnRUYWJsZSIsIm1pblJvd3MiLCJsb25nUHJlc3NOYW1lIiwic2V0TG9uZ1ByZXNzTmFtZSIsImlzTW9iaWxlIiwic2V0SXNNb2JpbGUiLCJwcmVzc1RpbWVyUmVmIiwibG9uZ1ByZXNzVHJpZ2dlcmVkUmVmIiwibWVkaWEiLCJtYXRjaE1lZGlhIiwiYWRkTGlzdGVuZXIiLCJyZW1vdmVMaXN0ZW5lciIsInByZXZTZWxlY3RlZEl0ZW1zIiwic3RhcnRMb25nUHJlc3MiLCJjYW5jZWxMb25nUHJlc3MiLCJkaXNtaXNzTG9uZ1ByZXNzIiwicGFkZGluZ0NvdW50Iiwic2Nyb2xsYWJsZVRhYmxlIiwiZml4ZWRUYWJsZSIsInN0aWNreUhlYWRlciIsImFjdGlvbkNvbCIsImNlbGxDbGFtcCIsImZvcm1hdERhdGUiLCJsb25nUHJlc3NPdmVybGF5IiwibG9uZ1ByZXNzQ2FyZCIsImZldGNoUGFydHNXaXRoTWFjaGluZURhdGEiLCJwYXJ0c1NuYXBzaG90IiwicGFydERvYyIsInBhcnREYXRhIiwiZ2V0UmVmSWQiLCJEb2N1bWVudFJlZmVyZW5jZSIsImZldGNoTWFjaGluZURhdGEiLCJtYWNoaW5lUmVmIiwiTWFjaGluZSIsIk1hY2hpbmVGcm9tIiwiY3VycmVudE1hY2hpbmVSZWYiLCJDdXJyZW50TWFjaGluZSIsIk1hY2hpbmVDdXJyZW50IiwiY2xpZW50UmVmIiwiY2xpZW50RG9jIiwiQ2xpZW50IiwiTUFDSElORV9TRUxFQ1RfRklFTERTIiwid2l0aE1hY2hpbmVTZWxlY3QiLCJidWlsZFBhcnQiLCJtYWNoaW5lTWFwIiwiY3VycmVudE1hY2hpbmVNYXAiLCJtYWNoaW5lSWQiLCJjdXJyZW50TWFjaGluZUlkIiwic2VhcmNoUmF3Iiwic2VhcmNoVHlwZSIsImhhc1NlYXJjaCIsInRvVGl0bGVDYXNlIiwid29yZCIsImNoYXJBdCIsInRvVXBwZXJDYXNlIiwiam9pbiIsImJ1aWxkU2VhcmNoUXVlcnkiLCJtb2RlIiwidGl0bGVGYWxsYmFjayIsInRlcm1zIiwidG9rZW5zIiwicHJlZml4UXVlcnkiLCJzdGFydEF0IiwiZW5kQXQiLCJmYWxsYmFjayIsImFzRGF0ZSIsInNlYXJjaE1vZGUiLCJzZWFyY2hRdWVyeSIsInNlYXJjaEZhbGxiYWNrIiwicmF3VXBwZXIiLCJsb2NhbFZhbHVlcyIsImxvY2FsU25hcCIsImZpbmQiLCJleGlzdGluZyIsIm1hY2hpbmVJZHMiLCJjdXJyZW50TWFjaGluZUlkcyIsImRvY1NuYXAiLCJmZXRjaE1hY2hpbmVNYXAiLCJjaHVua3MiLCJidWlsdCIsInBhZ2VMYXN0RG9jIiwiZmlsbGVkIiwidXNlZEZhbGxiYWNrIiwic2NhbkJhc2VRdWVyeSIsImJhdGNoRG9jcyIsImNsaWVudHNTbmFwc2hvdCIsImZpbHRlcmVkQ2xpZW50cyIsIm1hdGNoIiwibWFjaGluZXMiLCJtYWNoaW5lRG9jIiwic2VsZWN0ZWRDbGllbnQiLCJtYWNoaW5lc1NuYXBzaG90IiwiaXNWYWxpZCIsInRpbWVzdGFtcCIsInRvRGF0ZSIsImRheSIsIm1vbnRoIiwieWVhciIsImJ1aWxkTG9jYWxMb2NPYmplY3QiLCJvIiwiZm9ybWF0TG9jIiwiaXNWYWxpZEZpZWxkIiwiZ2V0UHJpb3JpdHlNYWNoaW5lRmllbGQiLCJ0aGVNYWNoaW5lIiwiY3VycmVudE1hY2hpbmUiLCJmcm9tTWFjaGluZSIsInVwZGF0ZU1hY2hpbmVGaWVsZHMiLCJwaWNrIiwicHJpbWFyeSIsIm9lbSIsIm1vZGFsaXR5Il0sIm1hcHBpbmdzIjoiOztRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsSUFBSTtRQUNKO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7QUN4RkEsd0U7Ozs7Ozs7Ozs7O0FDQUEsZ0c7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQSxNQUFNQSxZQUFZLEdBQUcsQ0FBQyxHQUFELEVBQU0sR0FBTixFQUFXLEdBQVgsRUFBZ0IsR0FBaEIsRUFBcUIsR0FBckIsRUFBMEIsR0FBMUIsRUFBK0IsR0FBL0IsQ0FBckI7QUFDQSxNQUFNQyxTQUFTLEdBQUcsVUFBbEI7QUFDQSxNQUFNQyxPQUFPLEdBQUdDLEtBQUssQ0FBQ0MsSUFBTixDQUFXO0FBQUVDLFFBQU0sRUFBRTtBQUFWLENBQVgsRUFBMkIsQ0FBQ0MsQ0FBRCxFQUFJQyxDQUFKLEtBQ3pDQyxNQUFNLENBQUNDLFlBQVAsQ0FBb0IsS0FBS0YsQ0FBekIsQ0FEYyxDQUFoQjtBQUdBLE1BQU1HLE9BQU8sR0FBR1AsS0FBSyxDQUFDQyxJQUFOLENBQVc7QUFBRUMsUUFBTSxFQUFFO0FBQVYsQ0FBWCxFQUEyQixDQUFDQyxDQUFELEVBQUlDLENBQUosS0FBVUEsQ0FBQyxHQUFHLENBQXpDLENBQWhCO0FBRWUsU0FBU0ksaUJBQVQsQ0FBMkI7QUFDeENDLE1BQUksR0FBRyxLQURpQztBQUV4Q0MsUUFBTSxHQUFHLE1BQU0sQ0FBRSxDQUZ1QjtBQUd4Q0MsUUFId0M7QUFJeENDLG1CQUp3QztBQUt4Q0Msa0JBQWdCLEdBQUc7QUFMcUIsQ0FBM0IsRUFNWjtBQUNELFFBQU07QUFBQSxPQUFDQyxhQUFEO0FBQUEsT0FBZ0JDO0FBQWhCLE1BQW9DQyxzREFBUSxDQUFDLEVBQUQsQ0FBbEQ7QUFDQSxRQUFNO0FBQUEsT0FBQ0MsVUFBRDtBQUFBLE9BQWFDO0FBQWIsTUFBOEJGLHNEQUFRLENBQUMsRUFBRCxDQUE1QztBQUNBLFFBQU07QUFBQSxPQUFDRyxPQUFEO0FBQUEsT0FBVUM7QUFBVixNQUF3Qkosc0RBQVEsQ0FBQyxTQUFELENBQXRDO0FBQ0EsUUFBTTtBQUFBLE9BQUNLLFNBQUQ7QUFBQSxPQUFZQztBQUFaLE1BQTRCTixzREFBUSxDQUFDLEVBQUQsQ0FBMUM7QUFDQSxRQUFNO0FBQUEsT0FBQ08sTUFBRDtBQUFBLE9BQVNDO0FBQVQsTUFBc0JSLHNEQUFRLENBQUMsRUFBRCxDQUFwQztBQUNBLFFBQU07QUFBQSxPQUFDUyxNQUFEO0FBQUEsT0FBU0M7QUFBVCxNQUFzQlYsc0RBQVEsQ0FBQyxFQUFELENBQXBDO0FBQ0EsUUFBTTtBQUFBLE9BQUNXLFNBQUQ7QUFBQSxPQUFZQztBQUFaLE1BQTRCWixzREFBUSxDQUFDLEVBQUQsQ0FBMUM7QUFDQSxRQUFNO0FBQUEsT0FBQ2EsTUFBRDtBQUFBLE9BQVNDO0FBQVQsTUFBc0JkLHNEQUFRLENBQUMsRUFBRCxDQUFwQztBQUNBLFFBQU07QUFBQSxPQUFDZSxjQUFEO0FBQUEsT0FBaUJDO0FBQWpCLE1BQXNDaEIsc0RBQVEsQ0FBQyxFQUFELENBQXBEO0FBQ0EsUUFBTTtBQUFBLE9BQUNpQixhQUFEO0FBQUEsT0FBZ0JDO0FBQWhCLE1BQW9DbEIsc0RBQVEsQ0FBQyxFQUFELENBQWxEO0FBQ0EsUUFBTTtBQUFBLE9BQUNtQixVQUFEO0FBQUEsT0FBYUM7QUFBYixNQUE4QnBCLHNEQUFRLENBQUMsS0FBRCxDQUE1QztBQUNBLFFBQU07QUFBQSxPQUFDcUIsUUFBRDtBQUFBLE9BQVdDO0FBQVgsTUFBMEJ0QixzREFBUSxDQUFDLEVBQUQsQ0FBeEM7QUFDQSxRQUFNO0FBQUEsT0FBQ3VCLGVBQUQ7QUFBQSxPQUFrQkM7QUFBbEIsTUFBd0N4QixzREFBUSxDQUFDLEtBQUQsQ0FBdEQ7QUFDQSxRQUFNeUIsV0FBVyxHQUFHQyxvREFBTSxDQUFDLEtBQUQsQ0FBMUI7QUFFQSxRQUFNQyxxQkFBcUIsR0FBR0MseURBQVcsQ0FDdENDLFNBQUQsSUFBZTtBQUNiLFFBQUksT0FBT2pDLGlCQUFQLEtBQTZCLFVBQWpDLEVBQTZDO0FBQzNDQSx1QkFBaUIsQ0FBQ2lDLFNBQUQsQ0FBakI7QUFDRDtBQUNGLEdBTHNDLEVBTXZDLENBQUNqQyxpQkFBRCxDQU51QyxDQUF6QztBQVNBLFFBQU1rQyxhQUFhLEdBQUdGLHlEQUFXLENBQUMsWUFBWTtBQUM1QyxRQUFJTCxlQUFKLEVBQXFCOztBQUNyQixRQUFJO0FBQ0YsWUFBTVEsR0FBRyxHQUFHLE1BQU1DLHlEQUFRLENBQ3ZCQyxTQURlLEdBRWZDLFVBRmUsQ0FFSixXQUZJLEVBR2ZILEdBSGUsQ0FHWCxXQUhXLEVBSWZJLEdBSmUsRUFBbEI7QUFLQSxZQUFNQyxJQUFJLEdBQUdMLEdBQUcsQ0FBQ0ssSUFBSixNQUFjLEVBQTNCO0FBQ0FyQyxzQkFBZ0IsQ0FBQ3FDLElBQUksQ0FBQ0MsTUFBTCxJQUFlLEVBQWhCLENBQWhCO0FBQ0FuQyxtQkFBYSxDQUFDa0MsSUFBSSxDQUFDRSxPQUFMLElBQWdCLEVBQWpCLENBQWI7QUFDQWQsd0JBQWtCLENBQUMsSUFBRCxDQUFsQjtBQUNELEtBVkQsQ0FVRSxPQUFPZSxLQUFQLEVBQWM7QUFDZEMsYUFBTyxDQUFDRCxLQUFSLENBQWMsOEJBQWQsRUFBOENBLEtBQTlDO0FBQ0FqQixpQkFBVyxDQUFDLHFDQUFELENBQVg7QUFDRDtBQUNGLEdBaEJnQyxFQWdCOUIsQ0FBQ0MsZUFBRCxDQWhCOEIsQ0FBakM7QUFrQkEsUUFBTWtCLG1CQUFtQixHQUFHYix5REFBVyxDQUFDLE1BQU9jLFFBQVAsSUFBb0I7QUFDMUQsUUFBSSxDQUFDQSxRQUFMLEVBQWU7QUFDZnRCLGlCQUFhLENBQUMsSUFBRCxDQUFiO0FBQ0FFLGVBQVcsQ0FBQyxFQUFELENBQVg7O0FBQ0EsUUFBSTtBQUNGLFlBQU1xQixJQUFJLEdBQUcsTUFBTVgseURBQVEsQ0FDeEJDLFNBRGdCLEdBRWhCQyxVQUZnQixDQUVMLE1BRkssRUFHaEJVLEtBSGdCLENBR1Ysd0JBSFUsRUFHZ0IsSUFIaEIsRUFHc0JGLFFBSHRCLEVBSWhCUCxHQUpnQixFQUFuQjtBQU1BLFlBQU1VLFdBQVcsR0FBRyxFQUFwQjtBQUNBLFlBQU1DLFVBQVUsR0FBRyxFQUFuQjtBQUNBSCxVQUFJLENBQUNJLE9BQUwsQ0FBY2hCLEdBQUQsSUFBUztBQUFBOztBQUNwQixjQUFNaUIsR0FBRyxHQUFHLGNBQUFqQixHQUFHLENBQUNLLElBQUosMERBQVlhLGVBQVosS0FBK0IsRUFBM0M7QUFDQSxZQUFJQyxHQUFHLG1CQUFHRixHQUFHLENBQUNHLE9BQVAsaURBQUcsYUFBYUMsTUFBdkI7QUFDQSxZQUFJQyxHQUFHLG9CQUFHTCxHQUFHLENBQUNHLE9BQVAsa0RBQUcsY0FBYUcsTUFBdkI7O0FBQ0EsWUFBSSxDQUFDLENBQUNKLEdBQUQsSUFBUSxDQUFDRyxHQUFWLEtBQWtCLE9BQU9MLEdBQUcsQ0FBQ0csT0FBWCxLQUF1QixRQUE3QyxFQUF1RDtBQUNyRCxnQkFBTUksT0FBTyxHQUFHUCxHQUFHLENBQUNHLE9BQUosQ0FBWUssSUFBWixFQUFoQjtBQUNBTixhQUFHLEdBQUdLLE9BQU8sQ0FBQ0UsS0FBUixDQUFjLENBQWQsRUFBaUIsQ0FBakIsQ0FBTjtBQUNBSixhQUFHLEdBQUdFLE9BQU8sQ0FBQ0UsS0FBUixDQUFjLENBQWQsQ0FBTjtBQUNEOztBQUNELFlBQUlKLEdBQUcsS0FBS0ssU0FBUixJQUFxQkwsR0FBRyxLQUFLLElBQWpDLEVBQXVDO0FBQ3JDQSxhQUFHLEdBQUdoRSxNQUFNLENBQUNnRSxHQUFELENBQVo7QUFDRDs7QUFDRCxjQUFNTSxNQUFNLEdBQUdYLEdBQUcsQ0FBQ1csTUFBbkI7QUFDQSxjQUFNQyxHQUFHLEdBQUdaLEdBQUcsQ0FBQ1ksR0FBaEI7QUFDQSxZQUFJLENBQUNWLEdBQUQsSUFBUSxDQUFDRyxHQUFiLEVBQWtCO0FBQ2xCLGNBQU1RLE9BQU8sR0FBSSxHQUFFWCxHQUFJLElBQUdHLEdBQUksRUFBOUI7QUFDQSxjQUFNUyxNQUFNLEdBQUdGLEdBQUcsS0FBS0YsU0FBUixJQUFxQkUsR0FBRyxLQUFLLElBQTdCLElBQXNDLEdBQUVBLEdBQUksRUFBUCxLQUFhLEVBQWpFO0FBQ0EsY0FBTUcsU0FBUyxHQUNiSixNQUFNLEtBQUtELFNBQVgsSUFBd0JDLE1BQU0sS0FBSyxJQUFuQyxJQUE0QyxHQUFFQSxNQUFPLEVBQVYsS0FBZ0IsRUFEN0Q7QUFFQSxZQUFJLENBQUNJLFNBQUQsSUFBYyxDQUFDRCxNQUFuQixFQUEyQjtBQUUzQixjQUFNRSxRQUFRLEdBQUdELFNBQVMsR0FBRzFFLE1BQU0sQ0FBQ3NFLE1BQUQsQ0FBVCxHQUFvQjdFLFNBQTlDO0FBQ0EsWUFBSSxDQUFDK0QsV0FBVyxDQUFDZ0IsT0FBRCxDQUFoQixFQUEyQmhCLFdBQVcsQ0FBQ2dCLE9BQUQsQ0FBWCxHQUF1QixJQUFJSSxHQUFKLEVBQXZCO0FBQzNCcEIsbUJBQVcsQ0FBQ2dCLE9BQUQsQ0FBWCxDQUFxQkssR0FBckIsQ0FBeUJGLFFBQXpCOztBQUVBLFlBQUlGLE1BQUosRUFBWTtBQUNWLGdCQUFNSyxTQUFTLEdBQUksR0FBRU4sT0FBUSxLQUFJRyxRQUFTLEVBQTFDO0FBQ0EsY0FBSSxDQUFDbEIsVUFBVSxDQUFDcUIsU0FBRCxDQUFmLEVBQTRCckIsVUFBVSxDQUFDcUIsU0FBRCxDQUFWLEdBQXdCLElBQUlGLEdBQUosRUFBeEI7QUFDNUJuQixvQkFBVSxDQUFDcUIsU0FBRCxDQUFWLENBQXNCRCxHQUF0QixDQUEwQjdFLE1BQU0sQ0FBQ3VFLEdBQUQsQ0FBaEM7QUFDRDtBQUNGLE9BOUJEO0FBZ0NBLFlBQU1RLE9BQU8sR0FBRyxFQUFoQjtBQUNBQyxZQUFNLENBQUNDLElBQVAsQ0FBWXpCLFdBQVosRUFBeUJFLE9BQXpCLENBQWtDd0IsR0FBRCxJQUFTO0FBQ3hDSCxlQUFPLENBQUNHLEdBQUQsQ0FBUCxHQUFldkYsS0FBSyxDQUFDQyxJQUFOLENBQVc0RCxXQUFXLENBQUMwQixHQUFELENBQXRCLEVBQTZCQyxJQUE3QixDQUFrQyxDQUFDQyxDQUFELEVBQUlDLENBQUosS0FBVTtBQUN6RCxjQUFJRCxDQUFDLEtBQUszRixTQUFWLEVBQXFCLE9BQU8sQ0FBUDtBQUNyQixjQUFJNEYsQ0FBQyxLQUFLNUYsU0FBVixFQUFxQixPQUFPLENBQUMsQ0FBUjtBQUNyQixnQkFBTTZGLEVBQUUsR0FBR0MsTUFBTSxDQUFDSCxDQUFELENBQWpCO0FBQ0EsZ0JBQU1JLEVBQUUsR0FBR0QsTUFBTSxDQUFDRixDQUFELENBQWpCO0FBQ0EsY0FBSUUsTUFBTSxDQUFDRSxRQUFQLENBQWdCSCxFQUFoQixLQUF1QkMsTUFBTSxDQUFDRSxRQUFQLENBQWdCRCxFQUFoQixDQUEzQixFQUFnRCxPQUFPRixFQUFFLEdBQUdFLEVBQVo7QUFDaEQsaUJBQU94RixNQUFNLENBQUNvRixDQUFELENBQU4sQ0FBVU0sYUFBVixDQUF3QjFGLE1BQU0sQ0FBQ3FGLENBQUQsQ0FBOUIsQ0FBUDtBQUNELFNBUGMsQ0FBZjtBQVFELE9BVEQ7QUFXQSxZQUFNTSxTQUFTLEdBQUcsRUFBbEI7QUFDQVgsWUFBTSxDQUFDQyxJQUFQLENBQVl4QixVQUFaLEVBQXdCQyxPQUF4QixDQUFpQ3dCLEdBQUQsSUFBUztBQUN2Q1MsaUJBQVMsQ0FBQ1QsR0FBRCxDQUFULEdBQWlCdkYsS0FBSyxDQUFDQyxJQUFOLENBQVc2RCxVQUFVLENBQUN5QixHQUFELENBQXJCLEVBQTRCQyxJQUE1QixDQUNmLENBQUNDLENBQUQsRUFBSUMsQ0FBSixLQUFVRSxNQUFNLENBQUNILENBQUQsQ0FBTixHQUFZRyxNQUFNLENBQUNGLENBQUQsQ0FEYixDQUFqQjtBQUdELE9BSkQ7QUFNQTFELHVCQUFpQixDQUFDb0QsT0FBRCxDQUFqQjtBQUNBbEQsc0JBQWdCLENBQUM4RCxTQUFELENBQWhCO0FBQ0QsS0E5REQsQ0E4REUsT0FBT3pDLEtBQVAsRUFBYztBQUNkQyxhQUFPLENBQUNELEtBQVIsQ0FBYyw4QkFBZCxFQUE4Q0EsS0FBOUM7QUFDQWpCLGlCQUFXLENBQUMsK0JBQUQsQ0FBWDtBQUNELEtBakVELFNBaUVVO0FBQ1JGLG1CQUFhLENBQUMsS0FBRCxDQUFiO0FBQ0Q7QUFDRixHQXhFc0MsRUF3RXBDLEVBeEVvQyxDQUF2QztBQTBFQSxRQUFNNkQsbUJBQW1CLEdBQUdyRCx5REFBVyxDQUNwQ2MsUUFBRCxJQUFjO0FBQ1osVUFBTXdDLEtBQUssR0FBR2pGLFVBQUgsYUFBR0EsVUFBSCx1QkFBR0EsVUFBVSxDQUFHeUMsUUFBSCxDQUF4Qjs7QUFDQSxRQUFJMUQsS0FBSyxDQUFDbUcsT0FBTixDQUFjRCxLQUFkLEtBQXdCQSxLQUFLLENBQUNoRyxNQUFOLElBQWdCLENBQTVDLEVBQStDO0FBQzdDLFlBQU1rRyxJQUFJLEdBQUdDLFFBQVEsQ0FBQ0gsS0FBSyxDQUFDLENBQUQsQ0FBTixFQUFXLEVBQVgsQ0FBckI7QUFDQSxZQUFNSSxJQUFJLEdBQUdELFFBQVEsQ0FBQ0gsS0FBSyxDQUFDLENBQUQsQ0FBTixFQUFXLEVBQVgsQ0FBckI7QUFDQSxhQUFPO0FBQ0xFLFlBQUksRUFBRVIsTUFBTSxDQUFDRSxRQUFQLENBQWdCTSxJQUFoQixJQUF3QkEsSUFBeEIsR0FBK0IsQ0FEaEM7QUFFTEUsWUFBSSxFQUFFVixNQUFNLENBQUNFLFFBQVAsQ0FBZ0JRLElBQWhCLElBQXdCQSxJQUF4QixHQUErQjtBQUZoQyxPQUFQO0FBSUQ7O0FBQ0QsV0FBTztBQUFFRixVQUFJLEVBQUUsQ0FBUjtBQUFXRSxVQUFJLEVBQUU7QUFBakIsS0FBUDtBQUNELEdBWm9DLEVBYXJDLENBQUNyRixVQUFELENBYnFDLENBQXZDO0FBZ0JBc0YseURBQVMsQ0FBQyxNQUFNO0FBQ2QsVUFBTUMsT0FBTyxHQUFHL0QsV0FBVyxDQUFDZ0UsT0FBNUI7QUFDQWhFLGVBQVcsQ0FBQ2dFLE9BQVosR0FBc0JoRyxJQUF0QjtBQUNBLFFBQUksQ0FBQ0EsSUFBRCxJQUFTK0YsT0FBYixFQUFzQjtBQUV0QjFELGlCQUFhO0FBQ2JSLGVBQVcsQ0FBQyxFQUFELENBQVg7QUFDQSxVQUFNO0FBQ0pvRSxZQURJO0FBRUpDLG1CQUZJO0FBR0pDLG1CQUhJO0FBSUpqQyxZQUpJO0FBS0pDO0FBTEksUUFNRi9ELGdCQUFnQixJQUFJLEVBTnhCO0FBUUFTLGdCQUFZLENBQUNvRixNQUFNLElBQUksRUFBWCxDQUFaO0FBQ0FsRixhQUFTLENBQUNtRixhQUFhLElBQUksRUFBbEIsQ0FBVDtBQUNBakYsYUFBUyxDQUFDa0YsYUFBYSxHQUFHdkcsTUFBTSxDQUFDdUcsYUFBRCxDQUFULEdBQTJCLEVBQXpDLENBQVQ7QUFDQWhGLGdCQUFZLENBQUMrQyxNQUFNLEdBQUd0RSxNQUFNLENBQUNzRSxNQUFELENBQVQsR0FBb0IsRUFBM0IsQ0FBWjtBQUNBN0MsYUFBUyxDQUFDOEMsR0FBRyxHQUFHdkUsTUFBTSxDQUFDdUUsR0FBRCxDQUFULEdBQWlCLEVBQXJCLENBQVQ7QUFDQXhELGNBQVUsQ0FBQ3NGLE1BQU0sR0FBRyxNQUFILEdBQVksU0FBbkIsQ0FBVjtBQUNBLFFBQUlBLE1BQUosRUFBWWpELG1CQUFtQixDQUFDaUQsTUFBRCxDQUFuQjtBQUNiLEdBdEJRLEVBc0JOLENBQUNqRyxJQUFELEVBQU9JLGdCQUFQLEVBQXlCaUMsYUFBekIsRUFBd0NXLG1CQUF4QyxDQXRCTSxDQUFUOztBQXdCQSxRQUFNb0Qsa0JBQWtCLEdBQUluRCxRQUFELElBQWM7QUFDdkMsVUFBTWIsU0FBUyxHQUFHO0FBQ2hCNkQsWUFBTSxFQUFFaEQsUUFEUTtBQUVoQmlELG1CQUFhLEVBQUUsRUFGQztBQUdoQkMsbUJBQWEsRUFBRSxFQUhDO0FBSWhCakMsWUFBTSxFQUFFLEVBSlE7QUFLaEJDLFNBQUcsRUFBRTtBQUxXLEtBQWxCO0FBT0F0RCxnQkFBWSxDQUFDb0MsUUFBRCxDQUFaO0FBQ0FsQyxhQUFTLENBQUMsRUFBRCxDQUFUO0FBQ0FFLGFBQVMsQ0FBQyxFQUFELENBQVQ7QUFDQUUsZ0JBQVksQ0FBQyxFQUFELENBQVo7QUFDQUUsYUFBUyxDQUFDLEVBQUQsQ0FBVDtBQUNBVixjQUFVLENBQUMsTUFBRCxDQUFWO0FBQ0F1Qix5QkFBcUIsQ0FBQ0UsU0FBRCxDQUFyQjtBQUNBWSx1QkFBbUIsQ0FBQ0MsUUFBRCxDQUFuQjtBQUNELEdBaEJEOztBQWtCQSxRQUFNb0QsZ0JBQWdCLEdBQUcsQ0FBQ0MsU0FBRCxFQUFZQyxTQUFaLEtBQTBCO0FBQ2pELFVBQU1DLFFBQVEsR0FBRzVHLE1BQU0sQ0FBQzJHLFNBQUQsQ0FBdkI7QUFDQSxVQUFNbkUsU0FBUyxHQUFHO0FBQ2hCNkQsWUFBTSxFQUFFckYsU0FEUTtBQUVoQnNGLG1CQUFhLEVBQUVJLFNBRkM7QUFHaEJILG1CQUFhLEVBQUVLLFFBSEM7QUFJaEJ0QyxZQUFNLEVBQUUsRUFKUTtBQUtoQkMsU0FBRyxFQUFFO0FBTFcsS0FBbEI7QUFPQXBELGFBQVMsQ0FBQ3VGLFNBQUQsQ0FBVDtBQUNBckYsYUFBUyxDQUFDdUYsUUFBRCxDQUFUO0FBQ0FyRixnQkFBWSxDQUFDLEVBQUQsQ0FBWjtBQUNBRSxhQUFTLENBQUMsRUFBRCxDQUFUO0FBQ0FWLGNBQVUsQ0FBQyxTQUFELENBQVY7QUFDQXVCLHlCQUFxQixDQUFDRSxTQUFELENBQXJCO0FBQ0QsR0FmRDs7QUFpQkEsUUFBTXFFLGtCQUFrQixHQUFJbEMsUUFBRCxJQUFjO0FBQ3ZDLFVBQU1tQyxXQUFXLEdBQUc5RyxNQUFNLENBQUMyRSxRQUFELENBQTFCO0FBQ0EsVUFBTW9DLGdCQUFnQixHQUFHRCxXQUFXLEtBQUtySCxTQUFoQixHQUE0QixFQUE1QixHQUFpQ3FILFdBQTFEO0FBQ0EsVUFBTXRFLFNBQVMsR0FBRztBQUNoQjZELFlBQU0sRUFBRXJGLFNBRFE7QUFFaEJzRixtQkFBYSxFQUFFcEYsTUFGQztBQUdoQnFGLG1CQUFhLEVBQUVuRixNQUhDO0FBSWhCa0QsWUFBTSxFQUFFeUMsZ0JBSlE7QUFLaEJ4QyxTQUFHLEVBQUU7QUFMVyxLQUFsQjtBQU9BaEQsZ0JBQVksQ0FBQ3VGLFdBQUQsQ0FBWjtBQUNBckYsYUFBUyxDQUFDLEVBQUQsQ0FBVDtBQUNBVixjQUFVLENBQUMsTUFBRCxDQUFWO0FBQ0F1Qix5QkFBcUIsQ0FBQ0UsU0FBRCxDQUFyQjtBQUNELEdBZEQ7O0FBZ0JBLFFBQU13RSxlQUFlLEdBQUlDLEtBQUQsSUFBVztBQUNqQyxVQUFNQyxRQUFRLEdBQUdsSCxNQUFNLENBQUNpSCxLQUFELENBQXZCO0FBQ0EsVUFBTUYsZ0JBQWdCLEdBQUd6RixTQUFTLEtBQUs3QixTQUFkLEdBQTBCLEVBQTFCLEdBQStCNkIsU0FBeEQ7QUFDQSxVQUFNa0IsU0FBUyxHQUFHO0FBQ2hCNkQsWUFBTSxFQUFFckYsU0FEUTtBQUVoQnNGLG1CQUFhLEVBQUVwRixNQUZDO0FBR2hCcUYsbUJBQWEsRUFBRW5GLE1BSEM7QUFJaEJrRCxZQUFNLEVBQUV5QyxnQkFKUTtBQUtoQnhDLFNBQUcsRUFBRTJDO0FBTFcsS0FBbEI7QUFPQXpGLGFBQVMsQ0FBQ3lGLFFBQUQsQ0FBVDtBQUNBNUUseUJBQXFCLENBQUNFLFNBQUQsQ0FBckI7QUFDRCxHQVpEOztBQWNBLFFBQU0yRSxVQUFVLEdBQUcsTUFBTTtBQUN2QixRQUFJckcsT0FBTyxLQUFLLE1BQWhCLEVBQXdCQyxVQUFVLENBQUMsU0FBRCxDQUFWLENBQXhCLEtBQ0ssSUFBSUQsT0FBTyxLQUFLLFNBQWhCLEVBQTJCQyxVQUFVLENBQUMsTUFBRCxDQUFWLENBQTNCLEtBQ0EsSUFBSUQsT0FBTyxLQUFLLE1BQWhCLEVBQXdCQyxVQUFVLENBQUMsU0FBRCxDQUFWO0FBQzlCLEdBSkQ7O0FBTUEsUUFBTXFHLFVBQVUsR0FBRyxNQUFNO0FBQ3ZCLFFBQUksT0FBTzlHLE1BQVAsS0FBa0IsVUFBdEIsRUFBa0M7QUFDbEMsVUFBTXlHLGdCQUFnQixHQUFHekYsU0FBUyxLQUFLN0IsU0FBZCxHQUEwQixFQUExQixHQUErQjZCLFNBQXhEO0FBQ0FoQixVQUFNLENBQUM7QUFDTCtGLFlBQU0sRUFBRXJGLFNBREg7QUFFTHNGLG1CQUFhLEVBQUVwRixNQUZWO0FBR0xxRixtQkFBYSxFQUFFbkYsTUFIVjtBQUlMa0QsWUFBTSxFQUFFeUMsZ0JBSkg7QUFLTHhDLFNBQUcsRUFBRS9DO0FBTEEsS0FBRCxDQUFOO0FBT0QsR0FWRDs7QUFZQSxTQUNFLE1BQUMscURBQUQ7QUFBTyxRQUFJLEVBQUVwQixJQUFiO0FBQW1CLFVBQU0sRUFBRUMsTUFBM0I7QUFBbUMsWUFBUSxNQUEzQztBQUE0QyxRQUFJLEVBQUMsSUFBakQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFLE1BQUMscURBQUQsQ0FBTyxNQUFQO0FBQWMsZUFBVyxNQUF6QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0UsTUFBQyxxREFBRCxDQUFPLEtBQVA7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFERixDQURGLEVBSUUsTUFBQyxxREFBRCxDQUFPLElBQVA7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNHeUIsVUFBVSxJQUNUO0FBQUssYUFBUyxFQUFFdUYsb0VBQU0sQ0FBQ3ZGLFVBQXZCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDRSxNQUFDLHVEQUFEO0FBQVMsYUFBUyxFQUFDLFFBQW5CO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFERixFQUVFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsMkJBRkYsQ0FGSixFQU9HRSxRQUFRLElBQUk7QUFBSyxhQUFTLEVBQUVxRixvRUFBTSxDQUFDckYsUUFBdkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUFrQ0EsUUFBbEMsQ0FQZixFQVNHLENBQUNGLFVBQUQsSUFBZWhCLE9BQU8sS0FBSyxTQUEzQixJQUNDO0FBQUssYUFBUyxFQUFFdUcsb0VBQU0sQ0FBQ0MsUUFBdkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFO0FBQUssYUFBUyxFQUFFRCxvRUFBTSxDQUFDRSxPQUF2QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQURGLEVBRUU7QUFBSyxhQUFTLEVBQUVGLG9FQUFNLENBQUNHLFNBQXZCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDR2hJLFlBQVksQ0FBQ2lJLEdBQWIsQ0FBa0JwRSxRQUFELElBQ2hCO0FBQ0UsT0FBRyxFQUFFQSxRQURQO0FBRUUsUUFBSSxFQUFDLFFBRlA7QUFHRSxhQUFTLEVBQUcsR0FBRWdFLG9FQUFNLENBQUNLLFdBQVksSUFBR0wsb0VBQU0sQ0FBRSxTQUFRaEUsUUFBUyxFQUFuQixDQUFzQixFQUhsRTtBQUlFLFdBQU8sRUFBRSxNQUFNbUQsa0JBQWtCLENBQUNuRCxRQUFELENBSm5DO0FBS0UsWUFBUSxFQUNOMUQsS0FBSyxDQUFDbUcsT0FBTixDQUFjckYsYUFBZCxLQUNBQSxhQUFhLENBQUNaLE1BQWQsR0FBdUIsQ0FEdkIsSUFFQSxDQUFDWSxhQUFhLENBQUNrSCxRQUFkLENBQXVCdEUsUUFBdkIsQ0FSTDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBV0dBLFFBWEgsQ0FERCxDQURILENBRkYsQ0FWSixFQWdDRyxDQUFDdkIsVUFBRCxJQUFlaEIsT0FBTyxLQUFLLE1BQTNCLElBQ0M7QUFBSyxhQUFTLEVBQUV1RyxvRUFBTSxDQUFDQyxRQUF2QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0U7QUFBSyxhQUFTLEVBQUVELG9FQUFNLENBQUNFLE9BQXZCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsZ0JBQ1V2RyxTQURWLDhCQURGLEVBSUcsQ0FBQyxNQUFNO0FBQ04sVUFBTTRHLElBQUksR0FBR2hDLG1CQUFtQixDQUFDNUUsU0FBRCxDQUFoQztBQUNBLFVBQU1pRixJQUFJLEdBQUd2RyxPQUFPLENBQUMwRSxLQUFSLENBQWMsQ0FBZCxFQUFpQndELElBQUksQ0FBQzNCLElBQUwsSUFBYSxDQUE5QixFQUFpQzRCLE9BQWpDLEVBQWI7QUFDQSxVQUFNOUIsSUFBSSxHQUFHN0YsT0FBTyxDQUFDa0UsS0FBUixDQUFjLENBQWQsRUFBaUJ3RCxJQUFJLENBQUM3QixJQUFMLElBQWEsQ0FBOUIsQ0FBYjs7QUFDQSxRQUFJLENBQUNFLElBQUksQ0FBQ3BHLE1BQU4sSUFBZ0IsQ0FBQ2tHLElBQUksQ0FBQ2xHLE1BQTFCLEVBQWtDO0FBQ2hDLFlBQU1pSSxXQUFXLEdBQUc5QyxNQUFNLENBQUNDLElBQVAsQ0FBWXZELGNBQWMsSUFBSSxFQUE5QixFQUNqQnFHLE1BRGlCLENBQ1ZDLE9BRFUsRUFFakJQLEdBRmlCLENBRVp2QyxHQUFELElBQVM7QUFDWixjQUFNLENBQUNyQixHQUFELEVBQU1HLEdBQU4sSUFBYWtCLEdBQUcsQ0FBQytDLEtBQUosQ0FBVSxHQUFWLENBQW5CO0FBQ0EsZUFBTztBQUFFL0MsYUFBRjtBQUFPckIsYUFBUDtBQUFZRztBQUFaLFNBQVA7QUFDRCxPQUxpQixFQU1qQm1CLElBTmlCLENBTVosQ0FBQ0MsQ0FBRCxFQUFJQyxDQUFKLEtBQVU7QUFDZCxZQUFJRCxDQUFDLENBQUN2QixHQUFGLEtBQVV3QixDQUFDLENBQUN4QixHQUFoQixFQUFxQjtBQUNuQixpQkFBTzBCLE1BQU0sQ0FBQ0gsQ0FBQyxDQUFDcEIsR0FBSCxDQUFOLEdBQWdCdUIsTUFBTSxDQUFDRixDQUFDLENBQUNyQixHQUFILENBQTdCO0FBQ0Q7O0FBQ0QsZUFBT3FCLENBQUMsQ0FBQ3hCLEdBQUYsQ0FBTTZCLGFBQU4sQ0FBb0JOLENBQUMsQ0FBQ3ZCLEdBQXRCLENBQVA7QUFDRCxPQVhpQixDQUFwQjs7QUFhQSxVQUFJLENBQUNpRSxXQUFXLENBQUNqSSxNQUFqQixFQUF5QjtBQUN2QixlQUNFO0FBQUssbUJBQVMsRUFBRXdILG9FQUFNLENBQUNhLFFBQXZCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsMkNBREY7QUFLRDs7QUFFRCxhQUNFO0FBQUssaUJBQVMsRUFBRWIsb0VBQU0sQ0FBQ2MsV0FBdkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUNFO0FBQUssaUJBQVMsRUFBRWQsb0VBQU0sQ0FBQ0UsT0FBdkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxrRUFERixFQUlFO0FBQUssaUJBQVMsRUFBRUYsb0VBQU0sQ0FBQ2UsVUFBdkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUNHTixXQUFXLENBQUNMLEdBQVosQ0FBZ0IsQ0FBQztBQUFFdkMsV0FBRjtBQUFPckIsV0FBUDtBQUFZRztBQUFaLE9BQUQsS0FDZjtBQUNFLFdBQUcsRUFBRWtCLEdBRFA7QUFFRSxZQUFJLEVBQUMsUUFGUDtBQUdFLGlCQUFTLEVBQUVtQyxvRUFBTSxDQUFDZ0IsWUFIcEI7QUFJRSxlQUFPLEVBQUUsTUFBTTVCLGdCQUFnQixDQUFDNUMsR0FBRCxFQUFNRyxHQUFOLENBSmpDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FNR0gsR0FOSCxFQU9HRyxHQVBILENBREQsQ0FESCxDQUpGLENBREY7QUFvQkQ7O0FBQ0QsV0FDRTtBQUFLLGVBQVMsRUFBRXFELG9FQUFNLENBQUNjLFdBQXZCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FDRTtBQUNFLGVBQVMsRUFBRWQsb0VBQU0sQ0FBQ2lCLElBRHBCO0FBRUUsV0FBSyxFQUFFO0FBQUUsdUJBQWV2QyxJQUFJLENBQUNsRztBQUF0QixPQUZUO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FJR29HLElBQUksQ0FBQ3dCLEdBQUwsQ0FBVTVELEdBQUQsSUFDUmtDLElBQUksQ0FBQzBCLEdBQUwsQ0FBVXpELEdBQUQsSUFBUztBQUFBOztBQUNoQixZQUFNUSxPQUFPLEdBQUksR0FBRVgsR0FBSSxJQUFHRyxHQUFJLEVBQTlCO0FBQ0EsWUFBTXVFLFVBQVUsR0FBR1AsT0FBTywwQkFDeEJ0RyxjQUFjLENBQUM4QyxPQUFELENBRFUsMERBQ3hCLHNCQUF5QjNFLE1BREQsQ0FBMUI7QUFHQSxhQUNFO0FBQ0UsV0FBRyxFQUFFMkUsT0FEUDtBQUVFLFlBQUksRUFBQyxRQUZQO0FBR0UsaUJBQVMsRUFBRyxHQUFFNkMsb0VBQU0sQ0FBQ21CLFFBQVMsSUFDNUJELFVBQVUsR0FBRyxFQUFILEdBQVFsQixvRUFBTSxDQUFDb0IsZ0JBQzFCLEVBTEg7QUFNRSxlQUFPLEVBQUUsTUFDUEYsVUFBVSxJQUFJOUIsZ0JBQWdCLENBQUM1QyxHQUFELEVBQU1HLEdBQU4sQ0FQbEM7QUFTRSxnQkFBUSxFQUFFLENBQUN1RSxVQVRiO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FXRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBQ0cxRSxHQURILEVBRUdHLEdBRkgsQ0FYRixDQURGO0FBa0JELEtBdkJELENBREQsQ0FKSCxDQURGLENBREY7QUFtQ0QsR0FsRkEsR0FKSCxDQWpDSixFQTJIRyxDQUFDbEMsVUFBRCxJQUFlaEIsT0FBTyxLQUFLLFNBQTNCLElBQ0M7QUFBSyxhQUFTLEVBQUV1RyxvRUFBTSxDQUFDQyxRQUF2QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0U7QUFBSyxhQUFTLEVBQUVELG9FQUFNLENBQUNFLE9BQXZCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsZ0JBQ1V2RyxTQURWLGlCQUNnQ0UsTUFEaEMsRUFFR0UsTUFGSCxzQkFERixFQUtFO0FBQUssYUFBUyxFQUFFaUcsb0VBQU0sQ0FBQ2UsVUFBdkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNHLENBQUMxRyxjQUFjLENBQUUsR0FBRVIsTUFBTyxJQUFHRSxNQUFPLEVBQXJCLENBQWQsSUFBeUMsRUFBMUMsRUFBOENxRyxHQUE5QyxDQUFtRG5ELE1BQUQsSUFBWTtBQUM3RCxVQUFNUSxTQUFTLEdBQUksR0FBRTVELE1BQU8sSUFBR0UsTUFBTyxLQUFJa0QsTUFBTyxFQUFqRDtBQUNBLFVBQU1vRSxJQUFJLEdBQUc5RyxhQUFhLENBQUNrRCxTQUFELENBQWIsSUFBNEIsRUFBekM7QUFDQSxXQUNFO0FBQ0UsU0FBRyxFQUFFUixNQURQO0FBRUUsVUFBSSxFQUFDLFFBRlA7QUFHRSxlQUFTLEVBQUUrQyxvRUFBTSxDQUFDZ0IsWUFIcEI7QUFJRSxhQUFPLEVBQUUsTUFBTTtBQUNiLFlBQUlLLElBQUksQ0FBQzdJLE1BQUwsS0FBZ0IsQ0FBaEIsSUFBcUIsT0FBT1MsTUFBUCxLQUFrQixVQUEzQyxFQUF1RDtBQUNyRCxnQkFBTWtDLFNBQVMsR0FBRztBQUNoQjZELGtCQUFNLEVBQUVyRixTQURRO0FBRWhCc0YseUJBQWEsRUFBRXBGLE1BRkM7QUFHaEJxRix5QkFBYSxFQUFFbkYsTUFIQztBQUloQmtELGtCQUFNLEVBQUVBLE1BQU0sS0FBSzdFLFNBQVgsR0FBdUIsRUFBdkIsR0FBNEJPLE1BQU0sQ0FBQ3NFLE1BQUQsQ0FKMUI7QUFLaEJDLGVBQUcsRUFBRTtBQUxXLFdBQWxCO0FBT0FqQywrQkFBcUIsQ0FBQ0UsU0FBRCxDQUFyQjtBQUNBbEMsZ0JBQU0sQ0FBQ2tDLFNBQUQsQ0FBTjtBQUNBO0FBQ0Q7O0FBQ0RxRSwwQkFBa0IsQ0FBQ3ZDLE1BQUQsQ0FBbEI7QUFDRCxPQWxCSDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9Bb0JHQSxNQUFNLEtBQUs3RSxTQUFYLEdBQXVCLFdBQXZCLEdBQXNDLFVBQVM2RSxNQUFPLEVBcEJ6RCxDQURGO0FBd0JELEdBM0JBLENBREgsRUE2QkcsQ0FBQyxDQUFDNUMsY0FBYyxDQUFFLEdBQUVSLE1BQU8sSUFBR0UsTUFBTyxFQUFyQixDQUFkLElBQXlDLEVBQTFDLEVBQThDdkIsTUFBL0MsSUFDQztBQUFLLGFBQVMsRUFBRXdILG9FQUFNLENBQUNhLFFBQXZCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsa0NBOUJKLENBTEYsQ0E1SEosRUF1S0csQ0FBQ3BHLFVBQUQsSUFBZWhCLE9BQU8sS0FBSyxNQUEzQixJQUNDO0FBQUssYUFBUyxFQUFFdUcsb0VBQU0sQ0FBQ0MsUUFBdkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFO0FBQUssYUFBUyxFQUFFRCxvRUFBTSxDQUFDRSxPQUF2QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGdCQUNVdkcsU0FEVixpQkFDZ0NFLE1BRGhDLEVBRUdFLE1BRkgsZ0JBRXFCRSxTQUZyQixDQURGLEVBS0U7QUFBSyxhQUFTLEVBQUUrRixvRUFBTSxDQUFDZSxVQUF2QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0csQ0FBQ3hHLGFBQWEsQ0FBRSxHQUFFVixNQUFPLElBQUdFLE1BQU8sS0FBSUUsU0FBVSxFQUFuQyxDQUFiLElBQXNELEVBQXZELEVBQTJEbUcsR0FBM0QsQ0FDRWxELEdBQUQsSUFDRTtBQUNFLE9BQUcsRUFBRUEsR0FEUDtBQUVFLFFBQUksRUFBQyxRQUZQO0FBR0UsYUFBUyxFQUFHLEdBQUU4QyxvRUFBTSxDQUFDZ0IsWUFBYSxJQUFHaEIsb0VBQU0sQ0FBQ3NCLFNBQVUsRUFIeEQ7QUFJRSxXQUFPLEVBQUUsTUFBTTNCLGVBQWUsQ0FBQ3pDLEdBQUQsQ0FKaEM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQU1PQSxHQU5QLENBRkgsQ0FESCxFQWFHLENBQUMsQ0FBQzNDLGFBQWEsQ0FBRSxHQUFFVixNQUFPLElBQUdFLE1BQU8sS0FBSUUsU0FBVSxFQUFuQyxDQUFiLElBQXNELEVBQXZELEVBQ0N6QixNQURGLElBRUM7QUFBSyxhQUFTLEVBQUV3SCxvRUFBTSxDQUFDYSxRQUF2QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHlDQWZKLENBTEYsQ0F4S0osQ0FKRixFQXdNRSxNQUFDLHFEQUFELENBQU8sTUFBUDtBQUFjLGFBQVMsRUFBRWIsb0VBQU0sQ0FBQ3VCLFNBQWhDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDRSxNQUFDLHNEQUFEO0FBQ0UsV0FBTyxFQUFDLG1CQURWO0FBRUUsV0FBTyxFQUFFekIsVUFGWDtBQUdFLFlBQVEsRUFBRXJHLE9BQU8sS0FBSyxTQUh4QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFlBREYsRUFRRSxNQUFDLHNEQUFEO0FBQVEsV0FBTyxFQUFDLGlCQUFoQjtBQUFrQyxXQUFPLEVBQUVzRyxVQUEzQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFlBUkYsRUFXRSxNQUFDLHNEQUFEO0FBQVEsV0FBTyxFQUFDLFdBQWhCO0FBQTRCLFdBQU8sRUFBRS9HLE1BQXJDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFYRixDQXhNRixDQURGO0FBME5ELEM7Ozs7Ozs7Ozs7O0FDNWREO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeEJBO0FBQ0E7QUFFQSxNQUFNd0ksZUFBZSxnQkFBR0MsMkRBQWEsQ0FBQztBQUNwQ0MsVUFBUSxFQUFFLElBRDBCO0FBRXBDQyxTQUFPLEVBQUUsSUFGMkI7QUFHcENDLGtCQUFnQixFQUFFLFlBQVksQ0FBRSxDQUhJO0FBSXBDQyxTQUFPLEVBQUUsWUFBWSxDQUFFO0FBSmEsQ0FBRCxDQUFyQztBQU9PLFNBQVNDLGdCQUFULENBQTBCO0FBQUVDO0FBQUYsQ0FBMUIsRUFBd0M7QUFDN0MsUUFBTUMsSUFBSSxHQUFHQyxnRUFBZSxFQUE1QjtBQUNBLFNBQ0UsTUFBQyxlQUFELENBQWlCLFFBQWpCO0FBQTBCLFNBQUssRUFBRUQsSUFBakM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUF3Q0QsUUFBeEMsQ0FERjtBQUdEO0FBRU0sTUFBTUcsT0FBTyxHQUFHLE1BQU1DLHdEQUFVLENBQUNYLGVBQUQsQ0FBaEMsQzs7Ozs7Ozs7Ozs7O0FDakJQO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQSxNQUFNWSxtQkFBbUIsR0FBRztBQUMxQkMsUUFBTSxFQUFFLHlDQURrQjtBQUUxQkMsWUFBVSxFQUFFLDZCQUZjO0FBRzFCQyxXQUFTLEVBQUUsYUFIZTtBQUkxQkMsZUFBYSxFQUFFLHlCQUpXO0FBSzFCQyxtQkFBaUIsRUFBRSxjQUxPO0FBTTFCQyxPQUFLLEVBQUUsMkNBTm1CO0FBTzFCQyxlQUFhLEVBQUU7QUFQVyxDQUE1QixDLENBU0E7O0FBQ0EsSUFBSSxDQUFDQywwREFBUSxDQUFDQyxJQUFULENBQWNySyxNQUFuQixFQUEyQjtBQUN6Qm9LLDREQUFRLENBQUNFLGFBQVQsQ0FBdUJWLG1CQUF2QjtBQUNELEMsQ0FFRDtBQUNBOzs7QUFDQSxXQUFtQyxFQU1sQzs7QUFFTSxNQUFNSixJQUFJLEdBQUdZLDBEQUFRLENBQUNaLElBQVQsRUFBYjtBQUNRWSx5SEFBZixFLENBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQSxzQjs7Ozs7Ozs7Ozs7O0FDL0RBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBOztBQUVBLE1BQU1HLGNBQWMsR0FBSUMsSUFBRCxLQUFXO0FBQ2hDQyxLQUFHLEVBQUVELElBQUksQ0FBQ0MsR0FEc0I7QUFFaENDLE9BQUssRUFBRUYsSUFBSSxDQUFDRTtBQUZvQixDQUFYLENBQXZCOztBQUtlLFNBQVNqQixlQUFULEdBQTJCO0FBQ3hDLFFBQU07QUFBQSxPQUFDUCxRQUFEO0FBQUEsT0FBV3lCO0FBQVgsTUFBMEI3SixzREFBUSxDQUFDLElBQUQsQ0FBeEM7QUFDQSxRQUFNO0FBQUEsT0FBQ3FJLE9BQUQ7QUFBQSxPQUFVeUI7QUFBVixNQUF3QjlKLHNEQUFRLENBQUMsSUFBRCxDQUF0Qzs7QUFFQSxRQUFNK0osZ0JBQWdCLEdBQUcsTUFBT0MsU0FBUCxJQUFxQjtBQUM1QyxRQUFJLENBQUNBLFNBQUwsRUFBZ0I7QUFDZEgsaUJBQVcsQ0FBQyxJQUFELENBQVg7QUFDQUMsZ0JBQVUsQ0FBQyxLQUFELENBQVY7QUFDQTtBQUNEOztBQUVEQSxjQUFVLENBQUMsSUFBRCxDQUFWO0FBQ0EsVUFBTUcsYUFBYSxHQUFHUixjQUFjLENBQUNPLFNBQUQsQ0FBcEM7QUFDQUgsZUFBVyxDQUFDSSxhQUFELENBQVg7QUFDQUgsY0FBVSxDQUFDLEtBQUQsQ0FBVjtBQUNELEdBWEQ7O0FBYUEsUUFBTUksS0FBSyxHQUFHLE1BQU07QUFDbEJMLGVBQVcsQ0FBQyxJQUFELENBQVg7QUFDQUMsY0FBVSxDQUFDLElBQUQsQ0FBVjtBQUNELEdBSEQsQ0FqQndDLENBc0J4Qzs7O0FBQ0EsUUFBTXhCLGdCQUFnQixHQUFHLE1BQU07QUFDN0IsVUFBTTZCLFFBQVEsR0FBRyxJQUFJYixpREFBUSxDQUFDWixJQUFULENBQWMwQixrQkFBbEIsRUFBakI7QUFDQUQsWUFBUSxDQUFDRSxtQkFBVCxDQUE2QjtBQUFFQyxZQUFNLEVBQUU7QUFBVixLQUE3QjtBQUVBLFdBQU81Qiw4Q0FBSSxDQUFDNkIsa0JBQUwsQ0FBd0JKLFFBQXhCLEVBQWtDSyxLQUFsQyxDQUF5Q2pJLEtBQUQsSUFBVztBQUN4REMsYUFBTyxDQUFDRCxLQUFSLENBQWMsdUJBQWQsRUFBdUNBLEtBQXZDO0FBQ0EsWUFBTUEsS0FBTjtBQUNELEtBSE0sQ0FBUDtBQUlELEdBUkQ7O0FBVUEsUUFBTWdHLE9BQU8sR0FBRyxNQUFNRyw4Q0FBSSxDQUFDSCxPQUFMLEdBQWVrQyxJQUFmLENBQW9CUCxLQUFwQixDQUF0QixDQWpDd0MsQ0FtQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBM0UseURBQVMsQ0FBQyxNQUFNO0FBQ2QsUUFBSW1GLFdBQUo7QUFDQWhDLGtEQUFJLENBQ0RpQyxjQURILENBQ2tCckIsaURBQVEsQ0FBQ1osSUFBVCxDQUFja0MsSUFBZCxDQUFtQkMsV0FBbkIsQ0FBK0JDLEtBRGpELEVBRUdMLElBRkgsQ0FFUSxNQUFNO0FBQ1Y7QUFDQUMsaUJBQVcsR0FBR2hDLDhDQUFJLENBQUNxQyxrQkFBTCxDQUF3QmhCLGdCQUF4QixDQUFkO0FBQ0QsS0FMSCxFQU1HUyxLQU5ILENBTVVqSSxLQUFELElBQVdDLE9BQU8sQ0FBQ0QsS0FBUixDQUFjLDRCQUFkLEVBQTRDQSxLQUE1QyxDQU5wQjtBQVFBLFdBQU8sTUFBTTtBQUNYLFVBQUltSSxXQUFKLEVBQWlCO0FBQ2ZBLG1CQUFXO0FBQ1o7QUFDRixLQUpEO0FBS0QsR0FmUSxFQWVOLEVBZk0sQ0FBVDtBQWlCQSxTQUFPO0FBQ0x0QyxZQURLO0FBRUxDLFdBRks7QUFHTEMsb0JBSEs7QUFJTEM7QUFKSyxHQUFQO0FBTUQsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZFRDs7QUFFQTs7QUFTQTs7QUFDQTs7QUF1QkEsTUFBTXlDLFVBQTJDLEdBQWpEOztBQUVBLDZDQUtRO0FBQ04sTUFBSSxJQUFKLEVBQThDO0FBQzlDLE1BQUksQ0FBQyx3QkFBTCxJQUFLLENBQUwsRUFBdUIsT0FGakIsQ0FHTjtBQUNBO0FBQ0E7QUFDQTs7QUFDQUMsUUFBTSxDQUFOQSxrQ0FBMENDLEdBQUQsSUFBUztBQUNoRCxjQUEyQztBQUN6QztBQUNBO0FBRUg7QUFMREQ7QUFNQSxRQUFNRSxTQUFTLEdBQ2JDLE9BQU8sSUFBSSxPQUFPQSxPQUFPLENBQWQsV0FBWEEsY0FDSUEsT0FBTyxDQURYQSxTQUVJSCxNQUFNLElBQUlBLE1BQU0sQ0FIdEIsT0FiTSxDQWtCTjs7QUFDQUQsWUFBVSxDQUFDSyxJQUFJLEdBQUpBLFlBQW1CRixTQUFTLEdBQUcsTUFBSCxZQUF2Q0gsRUFBV0ssQ0FBRCxDQUFWTDtBQUdGOztBQUFBLGdDQUEyRDtBQUN6RCxRQUFNO0FBQUE7QUFBQSxNQUFhTSxLQUFLLENBQXhCO0FBQ0EsU0FDR0MsTUFBTSxJQUFJQSxNQUFNLEtBQWpCLE9BQUNBLElBQ0RELEtBQUssQ0FETCxPQUFDQyxJQUVERCxLQUFLLENBRkwsT0FBQ0MsSUFHREQsS0FBSyxDQUhMLFFBQUNDLElBSURELEtBQUssQ0FKTCxNQUFDQyxJQUllO0FBQ2ZELE9BQUssQ0FBTEEsZUFBcUJBLEtBQUssQ0FBTEEsc0JBTnhCO0FBVUY7O0FBQUEsNEVBU1E7QUFDTixRQUFNO0FBQUE7QUFBQSxNQUFlRSxDQUFDLENBQXRCOztBQUVBLE1BQUlDLFFBQVEsS0FBUkEsUUFBcUJDLGVBQWUsQ0FBZkEsQ0FBZSxDQUFmQSxJQUFzQixDQUFDLHdCQUFoRCxJQUFnRCxDQUE1Q0QsQ0FBSixFQUFtRTtBQUNqRTtBQUNBO0FBR0ZEOztBQUFBQSxHQUFDLENBQURBLGlCQVJNLENBVU47O0FBQ0EsTUFBSUcsTUFBTSxJQUFWLE1BQW9CO0FBQ2xCQSxVQUFNLEdBQUdDLEVBQUUsQ0FBRkEsZUFBVEQ7QUFHRixHQWZNLENBZU47OztBQUNBVixRQUFNLENBQUNZLE9BQU8sZUFBZFosTUFBTSxDQUFOQSxXQUErQztBQUFBO0FBQUE7QUFBL0NBO0FBQStDLEdBQS9DQTtBQU9GOztBQUFBLHFCQUF5RDtBQUN2RCxZQUEyQztBQUN6QyxtQ0FJRztBQUNELGFBQU8sVUFDSixnQ0FBK0JhLElBQUksQ0FBQ3ZILEdBQUksZ0JBQWV1SCxJQUFJLENBQUNDLFFBQVMsNkJBQTRCRCxJQUFJLENBQUNFLE1BQXZHLGFBQUMsSUFDRSxvQkFGTCxFQUNHLENBREksQ0FBUDtBQVFGLEtBZHlDLENBY3pDOzs7QUFDQSxVQUFNQyxrQkFBbUQsR0FBRztBQUMxRFosVUFBSSxFQUROO0FBQTRELEtBQTVEO0FBR0EsVUFBTWEsYUFBa0MsR0FBRzdILE1BQU0sQ0FBTkEsS0FBM0Msa0JBQTJDQSxDQUEzQztBQUdBLGlCQUFhLENBQWIsUUFBdUJFLEdBQUQsSUFBNEI7QUFDaEQsVUFBSUEsR0FBRyxLQUFQLFFBQW9CO0FBQ2xCLFlBQ0U0SCxLQUFLLENBQUxBLEdBQUssQ0FBTEEsWUFDQyxPQUFPQSxLQUFLLENBQVosR0FBWSxDQUFaLGlCQUFrQyxPQUFPQSxLQUFLLENBQVosR0FBWSxDQUFaLEtBRnJDLFVBR0U7QUFDQSxnQkFBTUMsZUFBZSxDQUFDO0FBQUE7QUFFcEJMLG9CQUFRLEVBRlk7QUFHcEJDLGtCQUFNLEVBQUVHLEtBQUssQ0FBTEEsR0FBSyxDQUFMQSxxQkFBK0IsT0FBT0EsS0FBSyxDQUhyRCxHQUdxRDtBQUgvQixXQUFELENBQXJCO0FBTUg7QUFYRCxhQVdPO0FBQ0w7QUFDQTtBQUNBLGNBQU1oTixDQUFRLEdBQWQ7QUFFSDtBQWpCRCxPQXJCeUMsQ0F3Q3pDOztBQUNBLFVBQU1rTixrQkFBbUQsR0FBRztBQUMxRFQsUUFBRSxFQUR3RDtBQUUxREMsYUFBTyxFQUZtRDtBQUcxREYsWUFBTSxFQUhvRDtBQUkxRFcsYUFBTyxFQUptRDtBQUsxREMsY0FBUSxFQUxrRDtBQU0xREMsY0FBUSxFQU5rRDtBQU8xREMsWUFBTSxFQVBSO0FBQTRELEtBQTVEO0FBU0EsVUFBTUMsYUFBa0MsR0FBR3JJLE1BQU0sQ0FBTkEsS0FBM0Msa0JBQTJDQSxDQUEzQztBQUdBLGlCQUFhLENBQWIsUUFBdUJFLEdBQUQsSUFBNEI7QUFDaEQsWUFBTW9JLE9BQU8sR0FBRyxPQUFPUixLQUFLLENBQTVCLEdBQTRCLENBQTVCOztBQUVBLFVBQUk1SCxHQUFHLEtBQVAsTUFBa0I7QUFDaEIsWUFBSTRILEtBQUssQ0FBTEEsR0FBSyxDQUFMQSxJQUFjUSxPQUFPLEtBQXJCUixZQUFzQ1EsT0FBTyxLQUFqRCxVQUFnRTtBQUM5RCxnQkFBTVAsZUFBZSxDQUFDO0FBQUE7QUFFcEJMLG9CQUFRLEVBRlk7QUFHcEJDLGtCQUFNLEVBSFI7QUFBc0IsV0FBRCxDQUFyQjtBQU1IO0FBUkQsYUFRTyxJQUFJekgsR0FBRyxLQUFQLFVBQXNCO0FBQzNCLFlBQUk0SCxLQUFLLENBQUxBLEdBQUssQ0FBTEEsSUFBY1EsT0FBTyxLQUF6QixVQUF3QztBQUN0QyxnQkFBTVAsZUFBZSxDQUFDO0FBQUE7QUFFcEJMLG9CQUFRLEVBRlk7QUFHcEJDLGtCQUFNLEVBSFI7QUFBc0IsV0FBRCxDQUFyQjtBQU1IO0FBUk0sYUFRQSxJQUNMekgsR0FBRyxLQUFIQSxhQUNBQSxHQUFHLEtBREhBLFlBRUFBLEdBQUcsS0FGSEEsYUFHQUEsR0FBRyxLQUhIQSxjQUlBQSxHQUFHLEtBTEUsWUFNTDtBQUNBLFlBQUk0SCxLQUFLLENBQUxBLEdBQUssQ0FBTEEsWUFBc0JRLE9BQU8sS0FBakMsV0FBaUQ7QUFDL0MsZ0JBQU1QLGVBQWUsQ0FBQztBQUFBO0FBRXBCTCxvQkFBUSxFQUZZO0FBR3BCQyxrQkFBTSxFQUhSO0FBQXNCLFdBQUQsQ0FBckI7QUFNSDtBQWRNLGFBY0E7QUFDTDtBQUNBO0FBQ0EsY0FBTTdNLENBQVEsR0FBZDtBQUVIO0FBdENELE9BckR5QyxDQTZGekM7QUFDQTs7QUFDQSxVQUFNeU4sU0FBUyxHQUFHQyxzQkFBbEIsS0FBa0JBLENBQWxCOztBQUNBLFFBQUlWLEtBQUssQ0FBTEEsWUFBa0IsQ0FBQ1MsU0FBUyxDQUFoQyxTQUEwQztBQUN4Q0EsZUFBUyxDQUFUQTtBQUNBcEssYUFBTyxDQUFQQTtBQUlIO0FBQ0Q7O0FBQUEsUUFBTXNLLENBQUMsR0FBR1gsS0FBSyxDQUFMQSxhQUFWO0FBRUEsUUFBTWxCLE1BQU0sR0FBRyxhQUFmLFNBQWUsR0FBZjtBQUNBLFFBQU04QixRQUFRLEdBQUk5QixNQUFNLElBQUlBLE1BQU0sQ0FBakIsTUFBQ0EsSUFBbEI7O0FBRUEsUUFBTTtBQUFBO0FBQUE7QUFBQSxNQUFlNEIsdUJBQWMsTUFBTTtBQUN2QyxVQUFNLDZCQUE2QixtQ0FBc0JWLEtBQUssQ0FBM0IsTUFBbkMsSUFBbUMsQ0FBbkM7QUFDQSxXQUFPO0FBQ0xkLFVBQUksRUFEQztBQUVMTyxRQUFFLEVBQUVPLEtBQUssQ0FBTEEsS0FDQSxtQ0FBc0JBLEtBQUssQ0FEM0JBLEVBQ0EsQ0FEQUEsR0FFQWEsVUFBVSxJQUpoQjtBQUFPLEtBQVA7QUFGbUJILEtBUWxCLFdBQVdWLEtBQUssQ0FBaEIsTUFBdUJBLEtBQUssQ0FSL0IsRUFRRyxDQVJrQlUsQ0FBckI7O0FBVUEsTUFBSTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQUFKLE1Bdkh1RCxDQXlIdkQ7O0FBQ0EsTUFBSSxvQkFBSixVQUFrQztBQUNoQ3BFLFlBQVEsZ0JBQUcsd0NBQVhBLFFBQVcsQ0FBWEE7QUFHRixHQTlIdUQsQ0E4SHZEOzs7QUFDQSxRQUFNd0UsS0FBVSxHQUFHQyxxQkFBbkIsUUFBbUJBLENBQW5COztBQUNBLFFBQU1DLFFBQWEsR0FBR0YsS0FBSyxJQUFJLGlCQUFUQSxZQUFzQ0EsS0FBSyxDQUFqRTtBQUVBLFFBQU0sa0NBQWtDLHNDQUFnQjtBQUN0REcsY0FBVSxFQURaO0FBQXdELEdBQWhCLENBQXhDOztBQUdBLFFBQU1DLE1BQU0sR0FBR1IsMkJBQ1pTLEVBQUQsSUFBaUI7QUFDZkMsc0JBQWtCLENBQWxCQSxFQUFrQixDQUFsQkE7O0FBQ0Esa0JBQWM7QUFDWixVQUFJLG9CQUFKLFlBQW9DSixRQUFRLENBQTVDLEVBQTRDLENBQVJBLENBQXBDLEtBQ0ssSUFBSSxvQkFBSixVQUFrQztBQUNyQ0EsZ0JBQVEsQ0FBUkE7QUFFSDtBQUNGO0FBVFlOLEtBVWIsV0FWRixrQkFVRSxDQVZhQSxDQUFmOztBQVlBLHdCQUFVLE1BQU07QUFDZCxVQUFNVyxjQUFjLEdBQUdDLFNBQVMsSUFBVEEsS0FBa0Isd0JBQXpDLElBQXlDLENBQXpDO0FBQ0EsVUFBTXRDLFNBQVMsR0FDYix5Q0FBeUNGLE1BQU0sSUFBSUEsTUFBTSxDQUQzRDtBQUVBLFVBQU15QyxZQUFZLEdBQ2hCMUMsVUFBVSxDQUFDSyxJQUFJLEdBQUpBLFlBQW1CRixTQUFTLEdBQUcsTUFBSCxZQUR6QyxFQUNhRSxDQUFELENBRFo7O0FBRUEsUUFBSW1DLGNBQWMsSUFBSSxDQUF0QixjQUFxQztBQUNuQ2hCLGNBQVEsbUJBQW1CO0FBQ3pCQyxjQUFNLEVBRFJEO0FBQTJCLE9BQW5CLENBQVJBO0FBSUg7QUFYRCxLQVdHLGlDQVhILE1BV0csQ0FYSDtBQWFBLFFBQU1tQixVQUtMLEdBQUc7QUFDRkMsT0FBRyxFQUREO0FBRUZDLFdBQU8sRUFBR3JDLENBQUQsSUFBeUI7QUFDaEMsVUFBSXlCLEtBQUssQ0FBTEEsU0FBZSxPQUFPQSxLQUFLLENBQUxBLE1BQVAsWUFBbkIsWUFBOEQ7QUFDNURBLGFBQUssQ0FBTEE7QUFFRjs7QUFBQSxVQUFJLENBQUN6QixDQUFDLENBQU4sa0JBQXlCO0FBQ3ZCc0MsbUJBQVcsZ0RBQVhBLE1BQVcsQ0FBWEE7QUFFSDtBQWRIO0FBS0ksR0FMSjs7QUFpQkFILFlBQVUsQ0FBVkEsZUFBMkJuQyxDQUFELElBQXlCO0FBQ2pELFFBQUksQ0FBQyx3QkFBTCxJQUFLLENBQUwsRUFBdUI7O0FBQ3ZCLFFBQUl5QixLQUFLLENBQUxBLFNBQWUsT0FBT0EsS0FBSyxDQUFMQSxNQUFQLGlCQUFuQixZQUFtRTtBQUNqRUEsV0FBSyxDQUFMQTtBQUVGVDs7QUFBQUEsWUFBUSxtQkFBbUI7QUFBRXVCLGNBQVEsRUFBckN2QjtBQUEyQixLQUFuQixDQUFSQTtBQUxGbUIsSUEvS3VELENBdUx2RDtBQUNBOzs7QUFDQSxNQUFJeEIsS0FBSyxDQUFMQSxZQUFtQmMsS0FBSyxDQUFMQSxnQkFBc0IsRUFBRSxVQUFVQSxLQUFLLENBQTlELEtBQTZDLENBQTdDLEVBQXdFO0FBQ3RFLFVBQU05QixTQUFTLEdBQ2IseUNBQXlDRixNQUFNLElBQUlBLE1BQU0sQ0FEM0QsT0FEc0UsQ0FJdEU7QUFDQTs7QUFDQSxVQUFNK0MsWUFBWSxHQUNoQi9DLE1BQU0sSUFDTkEsTUFBTSxDQUROQSxrQkFFQSw0Q0FHRUEsTUFBTSxJQUFJQSxNQUFNLENBSGxCLFNBSUVBLE1BQU0sSUFBSUEsTUFBTSxDQVBwQixhQUdFLENBSEY7QUFVQTBDLGNBQVUsQ0FBVkEsT0FDRUssWUFBWSxJQUNaLHlCQUFZLHNDQUF5Qi9DLE1BQU0sSUFBSUEsTUFBTSxDQUZ2RDBDLGFBRWMsQ0FBWixDQUZGQTtBQUtGOztBQUFBLHNCQUFPZCxtQ0FBUCxVQUFPQSxDQUFQOzs7ZUFHYW9CLEk7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzdUZjtBQUNBO0FBQ0E7O0FBQ08sdUNBQXVEO0FBQzVELFNBQU9DLElBQUksQ0FBSkEsaUJBQXNCQSxJQUFJLEtBQTFCQSxNQUFxQ0EsSUFBSSxDQUFKQSxTQUFjLENBQW5EQSxDQUFxQ0EsQ0FBckNBLEdBQVA7QUFHRjtBQUFBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDTyxNQUFNQywwQkFBMEIsR0FBR0MsU0FDckNGLFNBRHFDRSxHQUFuQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDUUEsTUFBTUMsbUJBQW1CLEdBQzdCLCtCQUErQkMsSUFBSSxDQUFwQyxtQkFBQyxJQUNELGNBRWtCO0FBQ2hCLE1BQUlDLEtBQUssR0FBR0MsSUFBSSxDQUFoQixHQUFZQSxFQUFaO0FBQ0EsU0FBT0MsVUFBVSxDQUFDLFlBQVk7QUFDNUJDLE1BQUUsQ0FBQztBQUNEQyxnQkFBVSxFQURUO0FBRURDLG1CQUFhLEVBQUUsWUFBWTtBQUN6QixlQUFPQyxJQUFJLENBQUpBLE9BQVksTUFBTUwsSUFBSSxDQUFKQSxRQUF6QixLQUFtQixDQUFaSyxDQUFQO0FBSEpIO0FBQUcsS0FBRCxDQUFGQTtBQURlLEtBQWpCLENBQWlCLENBQWpCO0FBTkc7Ozs7QUFnQkEsTUFBTUksa0JBQWtCLEdBQzVCLCtCQUErQlIsSUFBSSxDQUFwQyxrQkFBQyxJQUNELGNBQXlDO0FBQ3ZDLFNBQU9TLFlBQVksQ0FBbkIsRUFBbUIsQ0FBbkI7QUFIRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakNQOztBQUNBLDBJLENBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUNBLE1BQU1DLGlCQUFpQixHQUF2Qjs7QUFtQ0EseUNBSWM7QUFDWixNQUFJOUosS0FBZ0MsR0FBRzRCLEdBQUcsQ0FBSEEsSUFBdkMsR0FBdUNBLENBQXZDOztBQUNBLGFBQVc7QUFDVCxRQUFJLFlBQUosT0FBdUI7QUFDckIsYUFBTzVCLEtBQUssQ0FBWjtBQUVGOztBQUFBLFdBQU8rSixPQUFPLENBQVBBLFFBQVAsS0FBT0EsQ0FBUDtBQUVGOztBQUFBO0FBQ0EsUUFBTUMsSUFBZ0IsR0FBRyxZQUFnQkMsT0FBRCxJQUFhO0FBQ25EQyxZQUFRLEdBQVJBO0FBREYsR0FBeUIsQ0FBekI7QUFHQXRJLEtBQUcsQ0FBSEEsU0FBYzVCLEtBQUssR0FBRztBQUFFaUssV0FBTyxFQUFUO0FBQXNCRSxVQUFNLEVBQWxEdkk7QUFBc0IsR0FBdEJBO0FBQ0EsU0FBT3dJLFNBQVMsR0FDWjtBQUNBQSxXQUFTLEdBQVRBLEtBQWtCQyxLQUFELEtBQVlILFFBQVEsQ0FBUkEsS0FBUSxDQUFSQSxFQUZqQixLQUVLLENBQWpCRSxDQUZZLEdBQWhCO0FBYUY7O0FBQUEsMkJBQXNEO0FBQ3BELE1BQUk7QUFDRkUsUUFBSSxHQUFHQyxRQUFRLENBQVJBLGNBQVBELE1BQU9DLENBQVBEO0FBQ0EsV0FDRTtBQUNBO0FBQ0MsT0FBQyxDQUFDRSxNQUFNLENBQVIsd0JBQWlDLENBQUMsQ0FBRUQsUUFBRCxDQUFwQyxZQUFDLElBQ0RELElBQUksQ0FBSkEsaUJBSkYsVUFJRUE7QUFKRjtBQU1BLEdBUkYsQ0FRRSxnQkFBTTtBQUNOO0FBRUg7QUFFRDs7QUFBQSxNQUFNRyxXQUFvQixHQUFHQyxXQUE3Qjs7QUFFQSx3Q0FJZ0I7QUFDZCxTQUFPLFlBQVksY0FBYztBQUMvQixRQUFJSCxRQUFRLENBQVJBLGNBQXdCLCtCQUE4QnBFLElBQTFELElBQUlvRSxDQUFKLEVBQXFFO0FBQ25FLGFBQU9JLEdBQVA7QUFHRkw7O0FBQUFBLFFBQUksR0FBR0MsUUFBUSxDQUFSQSxjQUFQRCxNQUFPQyxDQUFQRCxDQUwrQixDQU8vQjs7QUFDQSxZQUFRQSxJQUFJLENBQUpBO0FBQ1JBLFFBQUksQ0FBSkE7QUFDQUEsUUFBSSxDQUFKQSxjQUFvQnBCLFNBQXBCb0I7QUFDQUEsUUFBSSxDQUFKQTtBQUNBQSxRQUFJLENBQUpBLGNBWitCLENBYy9COztBQUNBQSxRQUFJLENBQUpBO0FBRUFDLFlBQVEsQ0FBUkE7QUFqQkYsR0FBTyxDQUFQO0FBcUJGOztBQUFBLE1BQU1LLGdCQUFnQixHQUFHQyxNQUFNLENBQS9CLGtCQUErQixDQUEvQixDLENBQ0E7O0FBQ08sNkJBQTJDO0FBQ2hELFNBQU8xTCxNQUFNLENBQU5BLHNDQUFQLEVBQU9BLENBQVA7QUFHSzs7QUFBQSwyQkFBd0Q7QUFDN0QsU0FBTzZHLEdBQUcsSUFBSTRFLGdCQUFnQixJQUE5QjtBQUdGOztBQUFBLG1DQUdvQjtBQUNsQixTQUFPLFlBQVkscUJBQXFCO0FBQ3RDRSxVQUFNLEdBQUdQLFFBQVEsQ0FBUkEsY0FBVE8sUUFBU1AsQ0FBVE8sQ0FEc0MsQ0FHdEM7QUFDQTtBQUNBOztBQUNBQSxVQUFNLENBQU5BOztBQUNBQSxVQUFNLENBQU5BLFVBQWlCLE1BQ2ZDLE1BQU0sQ0FBQ0MsY0FBYyxDQUFDLFVBQVcsMEJBQXlCQyxHQUQ1REgsRUFDd0IsQ0FBRCxDQUFmLENBRFJBLENBUHNDLENBVXRDO0FBQ0E7OztBQUNBQSxVQUFNLENBQU5BLGNBQXFCNUIsU0FBckI0QixDQVpzQyxDQWN0QztBQUNBOztBQUNBQSxVQUFNLENBQU5BO0FBQ0FQLFlBQVEsQ0FBUkE7QUFqQkYsR0FBTyxDQUFQO0FBcUJGLEMsQ0FBQTs7O0FBQ0EsK0NBSWM7QUFDWixTQUFPLFlBQVkscUJBQXFCO0FBQ3RDLFFBQUlXLFNBQVMsR0FBYjtBQUVBLEtBQUMsQ0FBRCxLQUFRQyxDQUFELElBQU87QUFDWjtBQUNBRCxlQUFTLEdBQVRBO0FBQ0FqQixhQUFPLENBQVBBLENBQU8sQ0FBUEE7QUFIRjtBQU1BLGtEQUFvQixNQUNsQlYsVUFBVSxDQUFDLE1BQU07QUFDZixVQUFJLENBQUosV0FBZ0I7QUFDZHdCLGNBQU0sQ0FBTkEsR0FBTSxDQUFOQTtBQUVIO0FBSlMsT0FEWixFQUNZLENBRFo7QUFURixHQUFPLENBQVA7QUFtQkYsQyxDQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ08sa0NBQWdFO0FBQ3JFLE1BQUkzQixJQUFJLENBQVIsa0JBQTJCO0FBQ3pCLFdBQU9XLE9BQU8sQ0FBUEEsUUFBZ0JYLElBQUksQ0FBM0IsZ0JBQU9XLENBQVA7QUFHRjs7QUFBQSxRQUFNcUIsZUFBNkMsR0FBRyxZQUVuRG5CLE9BQUQsSUFBYTtBQUNiO0FBQ0EsVUFBTVQsRUFBRSxHQUFHSixJQUFJLENBQWY7O0FBQ0FBLFFBQUksQ0FBSkEsc0JBQTJCLE1BQU07QUFDL0JhLGFBQU8sQ0FBQ2IsSUFBSSxDQUFaYSxnQkFBTyxDQUFQQTtBQUNBVCxRQUFFLElBQUlBLEVBQU5BO0FBRkZKO0FBTEYsR0FBc0QsQ0FBdEQ7QUFXQSxTQUFPaUMseUJBQXlCLHFDQUc5QkwsY0FBYyxDQUFDLFVBSGpCLHNDQUdpQixDQUFELENBSGdCLENBQWhDO0FBV0Y7O0FBQUEsOENBR3VCO0FBQ3JCLFlBQTRDO0FBQzFDLFdBQU8sT0FBTyxDQUFQLFFBQWdCO0FBQ3JCTSxhQUFPLEVBQUUsQ0FDUEMsV0FBVyxHQUFYQSwrQkFFRUMsU0FBUyxDQUFDLDJDQUpPLEtBSVAsQ0FBRCxDQUhKLENBRFk7QUFNckI7QUFDQUMsU0FBRyxFQVBMO0FBQXVCLEtBQWhCLENBQVA7QUFVRjs7QUFBQSxTQUFPQyxzQkFBc0IsR0FBdEJBLEtBQStCQyxRQUFELElBQWM7QUFDakQsUUFBSSxFQUFFQyxLQUFLLElBQVgsUUFBSSxDQUFKLEVBQTBCO0FBQ3hCLFlBQU1aLGNBQWMsQ0FBQyxVQUFXLDJCQUEwQlksS0FBMUQsRUFBcUIsQ0FBRCxDQUFwQjtBQUVGOztBQUFBLFVBQU1DLFFBQVEsR0FBR0YsUUFBUSxDQUFSQSxLQUFRLENBQVJBLEtBQ2QzTCxLQUFELElBQVd1TCxXQUFXLEdBQVhBLFlBQTBCQyxTQUFTLENBRGhELEtBQ2dELENBRC9CRyxDQUFqQjtBQUdBLFdBQU87QUFDTEwsYUFBTyxFQUFFTyxRQUFRLENBQVJBLE9BQWlCQyxDQUFELElBQU9BLENBQUMsQ0FBREEsU0FEM0IsS0FDMkJBLENBQXZCRCxDQURKO0FBRUxKLFNBQUcsRUFBRUksUUFBUSxDQUFSQSxPQUFpQkMsQ0FBRCxJQUFPQSxDQUFDLENBQURBLFNBRjlCLE1BRThCQSxDQUF2QkQ7QUFGQSxLQUFQO0FBUEYsR0FBT0gsQ0FBUDtBQWNGOztBQUFBLHdDQUE2RDtBQUMzRCxRQUFNSyxXQUdMLEdBQUcsSUFISixHQUdJLEVBSEo7QUFJQSxRQUFNQyxhQUE0QyxHQUFHLElBQXJELEdBQXFELEVBQXJEO0FBQ0EsUUFBTUMsV0FBa0QsR0FBRyxJQUEzRCxHQUEyRCxFQUEzRDtBQUNBLFFBQU1DLE1BR0wsR0FBRyxJQUhKLEdBR0ksRUFISjs7QUFLQSxtQ0FBMkQ7QUFDekQsUUFBSWxDLElBQWtDLEdBQUdnQyxhQUFhLENBQWJBLElBQXpDLEdBQXlDQSxDQUF6Qzs7QUFDQSxjQUFVO0FBQ1I7QUFHRixLQU55RCxDQU16RDs7O0FBQ0EsUUFBSXpCLFFBQVEsQ0FBUkEsY0FBd0IsZ0JBQWVVLEdBQTNDLElBQUlWLENBQUosRUFBcUQ7QUFDbkQsYUFBT1IsT0FBTyxDQUFkLE9BQU9BLEVBQVA7QUFHRmlDOztBQUFBQSxpQkFBYSxDQUFiQSxTQUF3QmhDLElBQUksR0FBR21DLFlBQVksQ0FBM0NILEdBQTJDLENBQTNDQTtBQUNBO0FBR0Y7O0FBQUEsaUNBQWlFO0FBQy9ELFFBQUloQyxJQUEwQyxHQUFHaUMsV0FBVyxDQUFYQSxJQUFqRCxJQUFpREEsQ0FBakQ7O0FBQ0EsY0FBVTtBQUNSO0FBR0ZBOztBQUFBQSxlQUFXLENBQVhBLFVBRUdqQyxJQUFJLEdBQUdvQyxLQUFLLENBQUxBLElBQUssQ0FBTEEsTUFDQ3pCLEdBQUQsSUFBUztBQUNiLFVBQUksQ0FBQ0EsR0FBRyxDQUFSLElBQWE7QUFDWCxjQUFNLFVBQVcsOEJBQTZCeEUsSUFBOUMsRUFBTSxDQUFOO0FBRUY7O0FBQUEsYUFBT3dFLEdBQUcsQ0FBSEEsWUFBaUIwQixJQUFELEtBQVc7QUFBRWxHLFlBQUksRUFBTjtBQUFjbUcsZUFBTyxFQUF2RDtBQUFrQyxPQUFYLENBQWhCM0IsQ0FBUDtBQUxJeUIsYUFPRXBHLEdBQUQsSUFBUztBQUNkLFlBQU1nRixjQUFjLENBQXBCLEdBQW9CLENBQXBCO0FBVk5pQixLQUVVRyxDQUZWSDtBQWFBO0FBR0Y7O0FBQUEsU0FBTztBQUNMTSxrQkFBYyxRQUFnQjtBQUM1QixhQUFPQyxVQUFVLFFBQWpCLFdBQWlCLENBQWpCO0FBRkc7O0FBSUxDLGdCQUFZLGlCQUF3QztBQUNsRDFDLGFBQU8sQ0FBUEEsc0JBQ1MyQyxFQUFELElBQVFBLEVBRGhCM0MsU0FHSzRDLE9BQUQsS0FBbUI7QUFDakJDLGlCQUFTLEVBQUdELE9BQU8sSUFBSUEsT0FBTyxDQUFuQixPQUFDQSxJQURLO0FBRWpCQSxlQUFPLEVBTGI1QztBQUd1QixPQUFuQixDQUhKQSxFQU9LL0QsR0FBRCxLQUFVO0FBQUUzSSxhQUFLLEVBUHJCME07QUFPYyxPQUFWLENBUEpBLE9BU1M4QyxLQUFELElBQTRCO0FBQ2hDLGNBQU1DLEdBQUcsR0FBR2YsV0FBVyxDQUFYQSxJQUFaLEtBQVlBLENBQVo7QUFDQUEsbUJBQVcsQ0FBWEE7QUFDQSxZQUFJZSxHQUFHLElBQUksYUFBWCxLQUE2QkEsR0FBRyxDQUFIQTtBQVpqQy9DO0FBTEc7O0FBb0JMZ0QsYUFBUyxrQkFBb0M7QUFDM0MsYUFBT1AsVUFBVSxnQkFBa0MsTUFBTTtBQUN2RCxlQUFPLHlCQUF5QixDQUM5QlEsZ0JBQWdCLGNBQWhCQSxLQUFnQixDQUFoQkEsTUFDUSxDQUFDO0FBQUE7QUFBRDtBQUFDLFNBQUQsS0FBc0I7QUFDMUIsaUJBQU9qRCxPQUFPLENBQVBBLElBQVksQ0FDakJnQyxXQUFXLENBQVhBLGtCQUVJaEMsT0FBTyxDQUFQQSxJQUFZdUIsT0FBTyxDQUFQQSxJQUhDLGtCQUdEQSxDQUFadkIsQ0FIYSxFQUlqQkEsT0FBTyxDQUFQQSxJQUFZMEIsR0FBRyxDQUFIQSxJQUpkLGVBSWNBLENBQVoxQixDQUppQixDQUFaQSxDQUFQO0FBRkppRCxnQkFTU3JDLEdBQUQsSUFBUztBQUNiLGlCQUFPLGdDQUFpQ3NDLFVBQUQsS0FBaUI7QUFBQTtBQUV0RHpMLGtCQUFNLEVBQUVtSixHQUFHLENBRmIsQ0FFYTtBQUYyQyxXQUFqQixDQUFoQyxDQUFQO0FBWDBCLFNBQzlCcUMsQ0FEOEIscUJBaUI5QmhDLGNBQWMsQ0FBQyxVQUFXLG1DQUFrQ1ksS0FqQnZELEVBaUJVLENBQUQsQ0FqQmdCLENBQXpCLE1BbUJDLENBQUM7QUFBQTtBQUFEO0FBQUMsU0FBRCxLQUE0QjtBQUNoQyxnQkFBTWpCLEdBQXFCLEdBQUd4TCxNQUFNLENBQU5BLE9BRzVCO0FBQUVxQyxrQkFBTSxFQUhvQnJDO0FBRzVCLFdBSDRCQSxFQUE5QixVQUE4QkEsQ0FBOUI7QUFJQSxpQkFBTyxxQ0FBUDtBQXhCRyxpQkEwQkc2RyxHQUFELElBQVM7QUFDZCx3QkFBYztBQUNaO0FBQ0E7QUFFRjs7QUFBQSxpQkFBTztBQUFFM0ksaUJBQUssRUFBZDtBQUFPLFdBQVA7QUEvQkosU0FBTyxDQUFQO0FBREYsT0FBaUIsQ0FBakI7QUFyQkc7O0FBeURMaUssWUFBUSxRQUErQjtBQUNyQztBQUNBO0FBQ0E7O0FBQ0EsVUFBSzRGLEVBQUUsR0FBSUMsU0FBRCxDQUFWLFlBQTBDO0FBQ3hDO0FBQ0EsWUFBSUQsRUFBRSxDQUFGQSxZQUFlLFVBQVVBLEVBQUUsQ0FBL0IsYUFBbUIsQ0FBbkIsRUFBZ0QsT0FBT25ELE9BQU8sQ0FBZCxPQUFPQSxFQUFQO0FBRWxEOztBQUFBLGFBQU8sZ0JBQWdCLGNBQWhCLEtBQWdCLENBQWhCLE1BQ0VxRCxNQUFELElBQ0pyRCxPQUFPLENBQVBBLElBQ0VVLFdBQVcsR0FDUDJDLE1BQU0sQ0FBTkEsWUFBb0J0QyxNQUFELElBQVl1QyxjQUFjLFNBRHRDLFFBQ3NDLENBQTdDRCxDQURPLEdBSFYsRUFFSHJELENBRkcsT0FRQyxNQUFNO0FBQ1Ysc0RBQW9CLE1BQU0sa0NBQWtDLE1BQU0sQ0FBbEUsQ0FBMEIsQ0FBMUI7QUFURyxnQkFZSDtBQUNBLFlBQU0sQ0FiVixDQUFPLENBQVA7QUFqRUo7O0FBQU8sR0FBUDs7O2VBb0ZhdUQsaUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xYZjs7QUFDQTs7Ozs7QUFDQTs7QUF5SEE7OztBQTVIQTs7QUFtQkEsTUFBTUMsZUFBb0MsR0FBRztBQUMzQ3hILFFBQU0sRUFEcUM7QUFDN0I7QUFDZHlILGdCQUFjLEVBRjZCOztBQUczQ0MsT0FBSyxLQUFpQjtBQUNwQixRQUFJLEtBQUosUUFBaUIsT0FBT2pFLEVBQVA7O0FBQ2pCLGVBQW1DLEVBR3BDO0FBUkg7O0FBQTZDLENBQTdDLEMsQ0FXQTs7QUFDQSxNQUFNa0UsaUJBQWlCLEdBQUcsK0lBQTFCLGdCQUEwQixDQUExQjtBQWVBLE1BQU1DLFlBQVksR0FBRywwR0FBckIsb0JBQXFCLENBQXJCO0FBUUEsTUFBTUMsZ0JBQWdCLEdBQUcsa0RBQXpCLGdCQUF5QixDQUF6QixDLENBU0E7O0FBQ0F6TyxNQUFNLENBQU5BLDBDQUFpRDtBQUMvQ2xDLEtBQUcsR0FBRztBQUNKLFdBQU80USxpQkFBUDtBQUZKMU87O0FBQWlELENBQWpEQTtBQU1BdU8saUJBQWlCLENBQWpCQSxRQUEyQkksS0FBRCxJQUFtQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBM08sUUFBTSxDQUFOQSx1Q0FBOEM7QUFDNUNsQyxPQUFHLEdBQUc7QUFDSixZQUFNOEksTUFBTSxHQUFHZ0ksU0FBZjtBQUNBLGFBQU9oSSxNQUFNLENBQWIsS0FBYSxDQUFiO0FBSEo1Rzs7QUFBOEMsR0FBOUNBO0FBTEZ1TztBQWFBLGdCQUFnQixDQUFoQixRQUEwQkksS0FBRCxJQUFtQjtBQUMxQztBQUNBOztBQUFFUCxpQkFBRCxPQUFDQSxHQUFpQyxDQUFDLEdBQUQsU0FBb0I7QUFDckQsVUFBTXhILE1BQU0sR0FBR2dJLFNBQWY7QUFDQSxXQUFPaEksTUFBTSxDQUFOQSxLQUFNLENBQU5BLENBQWMsR0FBckIsSUFBT0EsQ0FBUDtBQUZELEdBQUN3SDtBQUZKO0FBUUFJLFlBQVksQ0FBWkEsUUFBc0J2SCxLQUFELElBQW1CO0FBQ3RDbUgsaUJBQWUsQ0FBZkEsTUFBc0IsTUFBTTtBQUMxQk0sc0NBQXdCLENBQUMsR0FBRCxTQUFhO0FBQ25DLFlBQU1HLFVBQVUsR0FBSSxLQUFJNUgsS0FBSyxDQUFMQSx1QkFBOEIsR0FBRUEsS0FBSyxDQUFMQSxZQUF4RDtBQUdBLFlBQU02SCxnQkFBZ0IsR0FBdEI7O0FBQ0EsVUFBSUEsZ0JBQWdCLENBQXBCLFVBQW9CLENBQXBCLEVBQWtDO0FBQ2hDLFlBQUk7QUFDRkEsMEJBQWdCLENBQWhCQSxVQUFnQixDQUFoQkEsQ0FBNkIsR0FBN0JBO0FBQ0EsU0FGRixDQUVFLFlBQVk7QUFDWjNRLGlCQUFPLENBQVBBLE1BQWUsd0NBQXVDMFEsVUFBdEQxUTtBQUNBQSxpQkFBTyxDQUFQQSxNQUFlLEdBQUUwSSxHQUFHLENBQUNrSSxPQUFRLEtBQUlsSSxHQUFHLENBQUNtSSxLQUFyQzdRO0FBRUg7QUFDRjtBQWJEdVE7QUFERk47QUFERkk7O0FBbUJBLHFCQUE2QjtBQUMzQixNQUFJLENBQUNKLGVBQWUsQ0FBcEIsUUFBNkI7QUFDM0IsVUFBTVcsT0FBTyxHQUNYLGdDQURGO0FBR0EsVUFBTSxVQUFOLE9BQU0sQ0FBTjtBQUVGOztBQUFBLFNBQU9YLGVBQWUsQ0FBdEI7QUFHRixDLENBQUE7OztlQUNlQSxlLEVBRWY7Ozs7QUFHTyxxQkFBaUM7QUFDdEMsU0FBTzVGLDBCQUFpQnlHLGVBQXhCLGFBQU96RyxDQUFQO0FBR0YsQyxDQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTs7O0FBQ08sTUFBTTBHLFlBQVksR0FBRyxDQUFDLEdBQUQsU0FBaUM7QUFDM0RkLGlCQUFlLENBQWZBLFNBQXlCLElBQUlNLFNBQUosUUFBVyxHQUFwQ04sSUFBeUIsQ0FBekJBO0FBQ0FBLGlCQUFlLENBQWZBLHVCQUF3Qy9ELEVBQUQsSUFBUUEsRUFBL0MrRDtBQUNBQSxpQkFBZSxDQUFmQTtBQUVBLFNBQU9BLGVBQWUsQ0FBdEI7QUFMSyxFLENBUVA7Ozs7O0FBQ08sMENBQThEO0FBQ25FLFFBQU1lLE9BQU8sR0FBYjtBQUNBLFFBQU1DLFFBQVEsR0FBZDs7QUFFQSxPQUFLLE1BQUwsK0JBQTBDO0FBQ3hDLFFBQUksT0FBT0QsT0FBTyxDQUFkLFFBQWMsQ0FBZCxLQUFKLFVBQTJDO0FBQ3pDQyxjQUFRLENBQVJBLFFBQVEsQ0FBUkEsR0FBcUJwUCxNQUFNLENBQU5BLE9BQ25CckYsS0FBSyxDQUFMQSxRQUFjd1UsT0FBTyxDQUFyQnhVLFFBQXFCLENBQXJCQSxTQURtQnFGLElBRW5CbVAsT0FBTyxDQUZUQyxRQUVTLENBRllwUCxDQUFyQm9QLENBRHlDLENBSXZDOztBQUNGO0FBR0ZBOztBQUFBQSxZQUFRLENBQVJBLFFBQVEsQ0FBUkEsR0FBcUJELE9BQU8sQ0FBNUJDLFFBQTRCLENBQTVCQTtBQUdGLEdBaEJtRSxDQWdCbkU7OztBQUNBQSxVQUFRLENBQVJBLFNBQWtCVixpQkFBbEJVO0FBRUFYLGtCQUFnQixDQUFoQkEsUUFBMEJFLEtBQUQsSUFBVztBQUNsQ1MsWUFBUSxDQUFSQSxLQUFRLENBQVJBLEdBQWtCLENBQUMsR0FBRCxTQUFvQjtBQUNwQyxhQUFPRCxPQUFPLENBQVBBLEtBQU8sQ0FBUEEsQ0FBZSxHQUF0QixJQUFPQSxDQUFQO0FBREZDO0FBREZYO0FBTUE7QUFDRCxDOzs7Ozs7Ozs7Ozs7Ozs7OztBQzVLRDs7QUFDQTs7QUFjQSxNQUFNWSx1QkFBdUIsR0FBRyxnQ0FBaEM7O0FBRU8seUJBQTRDO0FBQUE7QUFBNUM7QUFBNEMsQ0FBNUMsRUFHcUQ7QUFDMUQsUUFBTUMsVUFBbUIsR0FBR0MsUUFBUSxJQUFJLENBQXhDO0FBRUEsUUFBTUMsU0FBUyxHQUFHLFdBQWxCLE1BQWtCLEdBQWxCO0FBQ0EsUUFBTSx3QkFBd0IscUJBQTlCLEtBQThCLENBQTlCO0FBRUEsUUFBTXhHLE1BQU0sR0FBRyx3QkFDWkMsRUFBRCxJQUFrQjtBQUNoQixRQUFJdUcsU0FBUyxDQUFiLFNBQXVCO0FBQ3JCQSxlQUFTLENBQVRBO0FBQ0FBLGVBQVMsQ0FBVEE7QUFHRjs7QUFBQSxRQUFJRixVQUFVLElBQWQsU0FBMkI7O0FBRTNCLFFBQUlyRyxFQUFFLElBQUlBLEVBQUUsQ0FBWixTQUFzQjtBQUNwQnVHLGVBQVMsQ0FBVEEsVUFBb0JDLE9BQU8sS0FFeEJyRyxTQUFELElBQWVBLFNBQVMsSUFBSXNHLFVBQVUsQ0FGYixTQUVhLENBRmIsRUFHekI7QUFIRkY7QUFHRSxPQUh5QixDQUEzQkE7QUFNSDtBQWhCWSxLQWlCYix5QkFqQkYsT0FpQkUsQ0FqQmEsQ0FBZjtBQW9CQSx3QkFBVSxNQUFNO0FBQ2QsUUFBSSxDQUFKLHlCQUE4QjtBQUM1QixVQUFJLENBQUosU0FBYztBQUNaLGNBQU1HLFlBQVksR0FBRyw4Q0FBb0IsTUFBTUQsVUFBVSxDQUF6RCxJQUF5RCxDQUFwQyxDQUFyQjtBQUNBLGVBQU8sTUFBTSw2Q0FBYixZQUFhLENBQWI7QUFFSDtBQUNGO0FBUEQsS0FPRyxDQVBILE9BT0csQ0FQSDtBQVNBLFNBQU8sU0FBUCxPQUFPLENBQVA7QUFHRjs7QUFBQSw2Q0FJYztBQUNaLFFBQU07QUFBQTtBQUFBO0FBQUE7QUFBQSxNQUE2QkUsY0FBYyxDQUFqRCxPQUFpRCxDQUFqRDtBQUNBQyxVQUFRLENBQVJBO0FBRUFDLFVBQVEsQ0FBUkE7QUFDQSxTQUFPLHFCQUEyQjtBQUNoQ0QsWUFBUSxDQUFSQTtBQUNBQyxZQUFRLENBQVJBLG1CQUZnQyxDQUloQzs7QUFDQSxRQUFJRCxRQUFRLENBQVJBLFNBQUosR0FBeUI7QUFDdkJDLGNBQVEsQ0FBUkE7QUFDQUMsZUFBUyxDQUFUQTtBQUVIO0FBVEQ7QUFZRjs7QUFBQSxNQUFNQSxTQUFTLEdBQUcsSUFBbEIsR0FBa0IsRUFBbEI7O0FBQ0EsaUNBQXdFO0FBQ3RFLFFBQU1DLEVBQUUsR0FBR2pKLE9BQU8sQ0FBUEEsY0FBWDtBQUNBLE1BQUlxSSxRQUFRLEdBQUdXLFNBQVMsQ0FBVEEsSUFBZixFQUFlQSxDQUFmOztBQUNBLGdCQUFjO0FBQ1o7QUFHRjs7QUFBQSxRQUFNRixRQUFRLEdBQUcsSUFBakIsR0FBaUIsRUFBakI7QUFDQSxRQUFNQyxRQUFRLEdBQUcseUJBQTBCRyxPQUFELElBQWE7QUFDckRBLFdBQU8sQ0FBUEEsUUFBaUJwUCxLQUFELElBQVc7QUFDekIsWUFBTXFQLFFBQVEsR0FBR0wsUUFBUSxDQUFSQSxJQUFhaFAsS0FBSyxDQUFuQyxNQUFpQmdQLENBQWpCO0FBQ0EsWUFBTXpHLFNBQVMsR0FBR3ZJLEtBQUssQ0FBTEEsa0JBQXdCQSxLQUFLLENBQUxBLG9CQUExQzs7QUFDQSxVQUFJcVAsUUFBUSxJQUFaLFdBQTJCO0FBQ3pCQSxnQkFBUSxDQUFSQSxTQUFRLENBQVJBO0FBRUg7QUFOREQ7QUFEZSxLQUFqQixPQUFpQixDQUFqQjtBQVVBRixXQUFTLENBQVRBLFFBRUdYLFFBQVEsR0FBRztBQUFBO0FBQUE7QUFGZFc7QUFFYyxHQUZkQTtBQVFBO0FBQ0QsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzNHRDs7QUFFQTs7QUFXZSx1Q0FLK0I7QUFDNUMsb0NBQW9EO0FBQ2xELHdCQUFPO0FBQW1CLFlBQU0sRUFBRSxZQUEzQixTQUEyQjtBQUEzQixPQUFQLEtBQU8sRUFBUDtBQUdGOztBQUFBLG1CQUFpQixDQUFqQixrQkFBb0NJLGlCQUFpQixDQUFDQyxlQUF0RCxDQUNBO0FBREE7QUFFRUMsbUJBQUQsb0JBQUNBLEdBQWlERixpQkFBRCxDQUFqRCxtQkFBQ0U7O0FBQ0YsWUFBMkM7QUFDekMsVUFBTUMsSUFBSSxHQUNSSCxpQkFBaUIsQ0FBakJBLGVBQWlDQSxpQkFBaUIsQ0FBbERBLFFBREY7QUFFQUUscUJBQWlCLENBQWpCQSxjQUFpQyxjQUFhQyxJQUE5Q0Q7QUFHRjs7QUFBQTtBQUNELEM7Ozs7Ozs7Ozs7OztBQ2pDWTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5Qiw4Q0FBOEM7QUFDdkU7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLG9EQUFvRDtBQUM3RTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCLHlCQUF5QiwwQ0FBMEM7QUFDbkU7QUFDQTtBQUNBLHVCQUF1QjtBQUN2Qix5QkFBeUIsMkNBQTJDO0FBQ3BFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsc0NBQXNDO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLDRDQUE0QztBQUNyRTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsMENBQTBDO0FBQy9EO0FBQ0EsaUJBQWlCLG1DQUFtQztBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsY0FBYztBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsY0FBYztBQUMzQztBQUNBLG9FQUFvRSxVQUFVLEVBQUU7QUFDaEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsdUJBQXVCLG1CQUFtQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLGtCQUFrQjtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLGNBQWM7QUFDM0Msb0VBQW9FLFVBQVUsRUFBRTtBQUNoRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsY0FBYztBQUNyQztBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLG1CQUFtQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyxpREFBaUQsRUFBRTtBQUM5RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsY0FBYztBQUMzQyx3T0FBd08sVUFBVSxFQUFFO0FBQ3BQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLHNCQUFzQjtBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLDZEQUE2RDtBQUMzRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyWk8sZ0RBTUw7QUFDQSxxQkFEQSxDQUVBOztBQUNBLFFBQU1FLGFBQWEsR0FBRzdILFFBQVEsQ0FBUkEsTUFBdEIsR0FBc0JBLENBQXRCO0FBRUMsR0FBQzhILE9BQU8sSUFBUixTQUFzQnBJLE1BQUQsSUFBWTtBQUNoQyxRQUFJbUksYUFBYSxDQUFiQSxDQUFhLENBQWJBLG1CQUFtQ25JLE1BQU0sQ0FBN0MsV0FBdUNBLEVBQXZDLEVBQTZEO0FBQzNEcUksb0JBQWMsR0FBZEE7QUFDQUYsbUJBQWEsQ0FBYkE7QUFDQTdILGNBQVEsR0FBRzZILGFBQWEsQ0FBYkEsYUFBWDdIO0FBQ0E7QUFFRjs7QUFBQTtBQVBEO0FBVUQsU0FBTztBQUFBO0FBQVA7QUFBTyxHQUFQO0FBSUQsQzs7Ozs7Ozs7Ozs7Ozs7OztBQ3pCRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU1BO0FBQ0E7QUFDQTs7QUFVZSxnQkFBNkI7QUFDMUMsUUFBTWdJLEdBQStCLEdBQUcxUSxNQUFNLENBQU5BLE9BQXhDLElBQXdDQSxDQUF4QztBQUVBLFNBQU87QUFDTDJRLE1BQUUsZ0JBQWlDO0FBQ2pDO0FBQUMsT0FBQ0QsR0FBRyxDQUFIQSxJQUFHLENBQUhBLEtBQWNBLEdBQUcsQ0FBSEEsSUFBRyxDQUFIQSxHQUFmLEVBQUNBLENBQUQ7QUFGRTs7QUFLTEUsT0FBRyxnQkFBaUM7QUFDbEMsVUFBSUYsR0FBRyxDQUFQLElBQU8sQ0FBUCxFQUFlO0FBQ2JBLFdBQUcsQ0FBSEEsSUFBRyxDQUFIQSxRQUFpQkEsR0FBRyxDQUFIQSxJQUFHLENBQUhBLHNCQUFqQkE7QUFFSDtBQVRJOztBQVdMRyxRQUFJLE9BQWUsR0FBZixNQUErQjtBQUNqQztBQUNBO0FBQUMsT0FBQ0gsR0FBRyxDQUFIQSxJQUFHLENBQUhBLElBQUQsZ0JBQStCSSxPQUFELElBQXNCO0FBQ25EQSxlQUFPLENBQUMsR0FBUkEsSUFBTyxDQUFQQTtBQUREO0FBYkw7O0FBQU8sR0FBUDtBQWtCRCxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3pDRDs7QUFLQTs7QUFNQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFVQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7O0FBakNBLEMsQ0FBQTs7O0FBK0RBOztBQUVBLElBQUkvRyxLQUFKLEVBQXFDLEVBS3JDOztBQUFBLE1BQU1nSCxRQUFRLEdBQUloSCxVQUFsQjs7QUFFQSxrQ0FBa0M7QUFDaEMsU0FBTy9KLE1BQU0sQ0FBTkEsT0FBYyxVQUFkQSxpQkFBYyxDQUFkQSxFQUE0QztBQUNqRCtMLGFBQVMsRUFEWDtBQUFtRCxHQUE1Qy9MLENBQVA7QUFLRjs7QUFBQSxxQ0FBc0Q7QUFDcEQsU0FBT2dSLE1BQU0sSUFBSW5ILElBQUksQ0FBSkEsV0FBVm1ILEdBQVVuSCxDQUFWbUgsR0FDSG5ILElBQUksS0FBSkEsTUFDRSx3REFERkEsTUFDRSxDQURGQSxHQUVHLEdBQUVtSCxNQUFPLEdBQUVDLGVBQWUsQ0FBZkEsSUFBZSxDQUFmQSxXQUFnQ3BILElBQUksQ0FBSkEsVUFBaENvSCxDQUFnQ3BILENBQWhDb0gsR0FBb0RwSCxJQUgvRG1ILEtBQVA7QUFPSzs7QUFBQSwrREFLTDtBQUNBLE1BQUlqSCxLQUFKLEVBQXFDLEVBYXJDOztBQUFBO0FBR0s7O0FBQUEsZ0RBSUw7QUFDQSxNQUFJQSxLQUFKLEVBQXFDLEVBWXJDOztBQUFBO0FBR0s7O0FBQUEsaUNBQWtEO0FBQ3ZELE1BQUlBLEtBQUosRUFBcUMsRUFZckM7O0FBQUE7QUFHRjs7QUFBQSwrQkFBdUM7QUFDckMsUUFBTW1ILFVBQVUsR0FBR3JILElBQUksQ0FBSkEsUUFBbkIsR0FBbUJBLENBQW5CO0FBQ0EsUUFBTXNILFNBQVMsR0FBR3RILElBQUksQ0FBSkEsUUFBbEIsR0FBa0JBLENBQWxCOztBQUVBLE1BQUlxSCxVQUFVLEdBQUcsQ0FBYkEsS0FBbUJDLFNBQVMsR0FBRyxDQUFuQyxHQUF1QztBQUNyQ3RILFFBQUksR0FBR0EsSUFBSSxDQUFKQSxhQUFrQnFILFVBQVUsR0FBRyxDQUFiQSxpQkFBekJySCxTQUFPQSxDQUFQQTtBQUVGOztBQUFBO0FBR0s7O0FBQUEsMkJBQTRDO0FBQ2pEQSxNQUFJLEdBQUdvSCxlQUFlLENBQXRCcEgsSUFBc0IsQ0FBdEJBO0FBQ0EsU0FBT0EsSUFBSSxLQUFKQSxZQUFxQkEsSUFBSSxDQUFKQSxXQUFnQmtILFFBQVEsR0FBcEQsR0FBNEJsSCxDQUE1QjtBQUdLOztBQUFBLDJCQUEyQztBQUNoRDtBQUNBLFNBQU91SCxhQUFhLE9BQXBCLFFBQW9CLENBQXBCO0FBR0s7O0FBQUEsMkJBQTJDO0FBQ2hEdkgsTUFBSSxHQUFHQSxJQUFJLENBQUpBLE1BQVdrSCxRQUFRLENBQTFCbEgsTUFBT0EsQ0FBUEE7QUFDQSxNQUFJLENBQUNBLElBQUksQ0FBSkEsV0FBTCxHQUFLQSxDQUFMLEVBQTJCQSxJQUFJLEdBQUksSUFBR0EsSUFBWEE7QUFDM0I7QUFHRjtBQUFBO0FBQ0E7QUFDQTs7O0FBQ08seUJBQTBDO0FBQy9DO0FBQ0EsTUFBSXdILEdBQUcsQ0FBSEEsbUJBQXVCQSxHQUFHLENBQUhBLFdBQTNCLEdBQTJCQSxDQUEzQixFQUFnRDs7QUFDaEQsTUFBSTtBQUNGO0FBQ0EsVUFBTUMsY0FBYyxHQUFHLFdBQXZCLGlCQUF1QixHQUF2QjtBQUNBLFVBQU1DLFFBQVEsR0FBRyxhQUFqQixjQUFpQixDQUFqQjtBQUNBLFdBQU9BLFFBQVEsQ0FBUkEsNkJBQXNDQyxXQUFXLENBQUNELFFBQVEsQ0FBakUsUUFBd0QsQ0FBeEQ7QUFDQSxHQUxGLENBS0UsVUFBVTtBQUNWO0FBRUg7QUFJTTs7QUFBQSxpREFJTDtBQUNBLE1BQUlFLGlCQUFpQixHQUFyQjtBQUVBLFFBQU1DLFlBQVksR0FBRywrQkFBckIsS0FBcUIsQ0FBckI7QUFDQSxRQUFNQyxhQUFhLEdBQUdELFlBQVksQ0FBbEM7QUFDQSxRQUFNRSxjQUFjLEdBQ2xCO0FBQ0EsR0FBQ0MsVUFBVSxLQUFWQSxRQUF1QixpREFBdkJBLFVBQXVCLENBQXZCQSxHQUFELE9BQ0E7QUFDQTtBQUpGO0FBT0FKLG1CQUFpQixHQUFqQkE7QUFDQSxRQUFNSyxNQUFNLEdBQUc5UixNQUFNLENBQU5BLEtBQWYsYUFBZUEsQ0FBZjs7QUFFQSxNQUNFLENBQUM4UixNQUFNLENBQU5BLE1BQWNDLEtBQUQsSUFBVztBQUN2QixRQUFJN0csS0FBSyxHQUFHMEcsY0FBYyxDQUFkQSxLQUFjLENBQWRBLElBQVo7QUFDQSxVQUFNO0FBQUE7QUFBQTtBQUFBLFFBQXVCRCxhQUFhLENBQTFDLEtBQTBDLENBQTFDLENBRnVCLENBSXZCO0FBQ0E7O0FBQ0EsUUFBSUssUUFBUSxHQUFJLElBQUdDLE1BQU0sV0FBVyxFQUFHLEdBQUVGLEtBQXpDOztBQUNBLGtCQUFjO0FBQ1pDLGNBQVEsR0FBSSxHQUFFLGVBQWUsRUFBRyxJQUFHQSxRQUFuQ0E7QUFFRjs7QUFBQSxRQUFJQyxNQUFNLElBQUksQ0FBQ3RYLEtBQUssQ0FBTEEsUUFBZixLQUFlQSxDQUFmLEVBQXFDdVEsS0FBSyxHQUFHLENBQVJBLEtBQVEsQ0FBUkE7QUFFckMsV0FDRSxDQUFDZ0gsUUFBUSxJQUFJSCxLQUFLLElBQWxCLHFCQUNBO0FBQ0NOLHFCQUFpQixHQUNoQkEsaUJBQWlCLENBQWpCQSxrQkFFRVEsTUFBTSxHQUNEL0csS0FBRCxJQUFDQSxFQUVHO0FBQ0E7QUFDQTtBQUNBO0FBQ0NpSCxXQUFELElBQWFDLGtCQUFrQixDQU5uQyxPQU1tQyxDQU5sQ2xILEVBQUQsSUFBQ0EsQ0FEQyxHQUNEQSxDQURDLEdBVUZrSCxrQkFBa0IsQ0FaeEJYLEtBWXdCLENBWnhCQSxLQUpKLEdBQ0UsQ0FERjtBQWJKLEdBQ0dLLENBREgsRUFpQ0U7QUFDQUwscUJBQWlCLEdBQWpCQSxHQURBLENBQ3VCO0FBRXZCO0FBQ0E7QUFFRjs7QUFBQSxTQUFPO0FBQUE7QUFFTFksVUFBTSxFQUZSO0FBQU8sR0FBUDtBQU1GOztBQUFBLDJDQUFxRTtBQUNuRSxRQUFNQyxhQUE2QixHQUFuQztBQUVBdFMsUUFBTSxDQUFOQSxvQkFBNEJFLEdBQUQsSUFBUztBQUNsQyxRQUFJLENBQUM0UixNQUFNLENBQU5BLFNBQUwsR0FBS0EsQ0FBTCxFQUEyQjtBQUN6QlEsbUJBQWEsQ0FBYkEsR0FBYSxDQUFiQSxHQUFxQkMsS0FBSyxDQUExQkQsR0FBMEIsQ0FBMUJBO0FBRUg7QUFKRHRTO0FBS0E7QUFHRjtBQUFBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDTyxtREFJRztBQUNSO0FBQ0E7O0FBRUEsTUFBSTtBQUNGd1MsUUFBSSxHQUFHLHFCQUFQQSxVQUFPLENBQVBBO0FBQ0EsR0FGRixDQUVFLFVBQVU7QUFDVjtBQUNBQSxRQUFJLEdBQUcsYUFBUEEsVUFBTyxDQUFQQTtBQUVGOztBQUFBLFFBQU1DLFdBQVcsR0FDZixrQ0FBa0MsaUNBRHBDLElBQ29DLENBRHBDLENBVlEsQ0FZUjs7QUFDQSxNQUFJLENBQUNDLFVBQVUsQ0FBZixXQUFlLENBQWYsRUFBOEI7QUFDNUIsV0FBUUMsU0FBUyxHQUFHLENBQUgsV0FBRyxDQUFILEdBQWpCO0FBRUY7O0FBQUEsTUFBSTtBQUNGLFVBQU1DLFFBQVEsR0FBRyxxQkFBakIsSUFBaUIsQ0FBakI7QUFDQUEsWUFBUSxDQUFSQSxXQUFvQix3REFBMkJBLFFBQVEsQ0FBdkRBLFFBQW9CLENBQXBCQTtBQUNBLFFBQUlDLGNBQWMsR0FBbEI7O0FBRUEsUUFDRSwrQkFBZUQsUUFBUSxDQUF2QixhQUNBQSxRQUFRLENBRFIsZ0JBREYsV0FJRTtBQUNBLFlBQU1MLEtBQUssR0FBRyx5Q0FBdUJLLFFBQVEsQ0FBN0MsWUFBYyxDQUFkO0FBRUEsWUFBTTtBQUFBO0FBQUE7QUFBQSxVQUFxQkUsYUFBYSxDQUN0Q0YsUUFBUSxDQUQ4QixVQUV0Q0EsUUFBUSxDQUY4QixVQUF4QyxLQUF3QyxDQUF4Qzs7QUFNQSxrQkFBWTtBQUNWQyxzQkFBYyxHQUFHLGlDQUFxQjtBQUNwQ25LLGtCQUFRLEVBRDRCO0FBRXBDcUssY0FBSSxFQUFFSCxRQUFRLENBRnNCO0FBR3BDTCxlQUFLLEVBQUVTLGtCQUFrQixRQUgzQkgsTUFHMkI7QUFIVyxTQUFyQixDQUFqQkE7QUFNSDtBQUVELEtBM0JFLENBMkJGOzs7QUFDQSxVQUFNSSxZQUFZLEdBQ2hCTCxRQUFRLENBQVJBLFdBQW9CSixJQUFJLENBQXhCSSxTQUNJQSxRQUFRLENBQVJBLFdBQW9CQSxRQUFRLENBQVJBLE9BRHhCQSxNQUNJQSxDQURKQSxHQUVJQSxRQUFRLENBSGQ7QUFLQSxXQUFRRCxTQUFTLEdBQ2IsZUFBZUUsY0FBYyxJQURoQixZQUNiLENBRGEsR0FBakI7QUFHQSxHQXBDRixDQW9DRSxVQUFVO0FBQ1YsV0FBUUYsU0FBUyxHQUFHLENBQUgsV0FBRyxDQUFILEdBQWpCO0FBRUg7QUFFRDs7QUFBQSwwQkFBa0M7QUFDaEMsUUFBTU8sTUFBTSxHQUFHLFdBQWYsaUJBQWUsR0FBZjtBQUVBLFNBQU83QixHQUFHLENBQUhBLHFCQUF5QkEsR0FBRyxDQUFIQSxVQUFjNkIsTUFBTSxDQUE3QzdCLE1BQXlCQSxDQUF6QkEsR0FBUDtBQUdGOztBQUFBLHVDQUE4RDtBQUM1RDtBQUNBO0FBQ0EsTUFBSSw2QkFBNkI4QixXQUFXLENBQUN2TSxNQUFNLENBQVAsYUFBNUMsSUFBNEMsQ0FBNUM7QUFDQSxRQUFNc00sTUFBTSxHQUFHLFdBQWYsaUJBQWUsR0FBZjtBQUNBLFFBQU1FLGFBQWEsR0FBR0gsWUFBWSxDQUFaQSxXQUF0QixNQUFzQkEsQ0FBdEI7QUFDQSxRQUFNSSxXQUFXLEdBQUcxSyxVQUFVLElBQUlBLFVBQVUsQ0FBVkEsV0FBbEMsTUFBa0NBLENBQWxDO0FBRUFzSyxjQUFZLEdBQUdLLFdBQVcsQ0FBMUJMLFlBQTBCLENBQTFCQTtBQUNBdEssWUFBVSxHQUFHQSxVQUFVLEdBQUcySyxXQUFXLENBQWQsVUFBYyxDQUFkLEdBQXZCM0s7QUFFQSxRQUFNNEssV0FBVyxHQUFHSCxhQUFhLGtCQUFrQkksV0FBVyxDQUE5RCxZQUE4RCxDQUE5RDtBQUNBLFFBQU1DLFVBQVUsR0FBR2xNLEVBQUUsR0FDakIrTCxXQUFXLENBQUNILFdBQVcsQ0FBQ3ZNLE1BQU0sQ0FBUCxRQUROLEVBQ00sQ0FBWixDQURNLEdBRWpCK0IsVUFBVSxJQUZkO0FBSUEsU0FBTztBQUNMMEksT0FBRyxFQURFO0FBRUw5SixNQUFFLEVBQUU4TCxXQUFXLGdCQUFnQkcsV0FBVyxDQUY1QyxVQUU0QztBQUZyQyxHQUFQO0FBTUY7O0FBQUEsOENBQWdFO0FBQzlELFFBQU1FLGFBQWEsR0FBRyxxREFBd0IsOENBQTlDLFFBQThDLENBQXhCLENBQXRCOztBQUVBLE1BQUlBLGFBQWEsS0FBYkEsVUFBNEJBLGFBQWEsS0FBN0MsV0FBNkQ7QUFDM0Q7QUFHRixHQVA4RCxDQU85RDs7O0FBQ0EsTUFBSSxDQUFDQyxLQUFLLENBQUxBLFNBQUwsYUFBS0EsQ0FBTCxFQUFxQztBQUNuQztBQUNBQSxTQUFLLENBQUxBLEtBQVlDLElBQUQsSUFBVTtBQUNuQixVQUFJLHdDQUF3Qiw2Q0FBNUIsYUFBNEIsQ0FBNUIsRUFBeUU7QUFDdkVsTCxnQkFBUSxHQUFSQTtBQUNBO0FBRUg7QUFMRGlMO0FBT0Y7O0FBQUEsU0FBTyxxREFBUCxRQUFPLENBQVA7QUFtRUY7O0FBQUEsTUFBTUUsdUJBQXVCLEdBQzNCOUosVUFHQSxLQUpGO0FBWUEsTUFBTStKLGtCQUFrQixHQUFHcEksTUFBTSxDQUFqQyxvQkFBaUMsQ0FBakM7O0FBRUEsbUNBQWlFO0FBQy9ELFNBQU8sS0FBSyxNQUFNO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQXFJLGVBQVcsRUFaTjtBQUFXLEdBQU4sQ0FBTCxNQWFFdkksR0FBRCxJQUFTO0FBQ2YsUUFBSSxDQUFDQSxHQUFHLENBQVIsSUFBYTtBQUNYLFVBQUl3SSxRQUFRLEdBQVJBLEtBQWdCeEksR0FBRyxDQUFIQSxVQUFwQixLQUF1QztBQUNyQyxlQUFPeUksVUFBVSxNQUFNRCxRQUFRLEdBQS9CLENBQWlCLENBQWpCO0FBRUY7O0FBQUEsVUFBSXhJLEdBQUcsQ0FBSEEsV0FBSixLQUF3QjtBQUN0QixlQUFPQSxHQUFHLENBQUhBLFlBQWlCek4sSUFBRCxJQUFVO0FBQy9CLGNBQUlBLElBQUksQ0FBUixVQUFtQjtBQUNqQixtQkFBTztBQUFFbVcsc0JBQVEsRUFBakI7QUFBTyxhQUFQO0FBRUY7O0FBQUEsZ0JBQU0sVUFBTiw2QkFBTSxDQUFOO0FBSkYsU0FBTzFJLENBQVA7QUFPRjs7QUFBQSxZQUFNLFVBQU4sNkJBQU0sQ0FBTjtBQUVGOztBQUFBLFdBQU9BLEdBQUcsQ0FBVixJQUFPQSxFQUFQO0FBNUJGLEdBQU8sQ0FBUDtBQWdDRjs7QUFBQSxpREFBa0U7QUFDaEUsU0FBTyxVQUFVLFdBQVcySSxjQUFjLE9BQW5DLENBQVUsQ0FBVixPQUFvRHROLEdBQUQsSUFBZ0I7QUFDeEU7QUFDQTtBQUNBO0FBRUEsUUFBSSxDQUFKLGdCQUFxQjtBQUNuQjtBQUVGOztBQUFBO0FBUkYsR0FBTyxDQUFQO0FBWWE7O0FBQUEsTUFBTTZILE1BQU4sQ0FBbUM7QUFPaEQ7QUFDRjtBQVJrRDtBQVdoRDtBQUVBO0FBeUJBMEYsYUFBVyx5QkFJVDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUpTO0FBSVQsR0FKUyxFQWlDVDtBQUFBLFNBdEVGM0gsS0FzRUU7QUFBQSxTQXJFRi9ELFFBcUVFO0FBQUEsU0FwRUY2SixLQW9FRTtBQUFBLFNBbkVGOEIsTUFtRUU7QUFBQSxTQWxFRnRELFFBa0VFO0FBQUEsU0E3REZ1RCxVQTZERTtBQUFBLFNBM0RGQyxHQTJERSxHQTNEa0MsRUEyRGxDO0FBQUEsU0F6REZDLEdBeURFLEdBekQyQyxFQXlEM0M7QUFBQSxTQXZERkMsR0F1REU7QUFBQSxTQXRERkMsR0FzREU7QUFBQSxTQXJERkMsVUFxREU7QUFBQSxTQXBERkMsSUFvREU7QUFBQSxTQW5ERkMsTUFtREU7QUFBQSxTQWxERkMsUUFrREU7QUFBQSxTQWpERkMsS0FpREU7QUFBQSxTQWhERkMsVUFnREU7QUFBQSxTQS9DRkMsY0ErQ0U7QUFBQSxTQTlDRkMsUUE4Q0U7QUFBQSxTQTdDRjlNLE1BNkNFO0FBQUEsU0E1Q0ZvSSxPQTRDRTtBQUFBLFNBM0NGMkUsYUEyQ0U7QUFBQSxTQTFDRkMsYUEwQ0U7QUFBQSxTQXpDRkMsT0F5Q0U7QUFBQSxTQXhDRkMsU0F3Q0U7QUFBQSxTQXZDRkMsY0F1Q0U7QUFBQSxTQXJDTUMsSUFxQ04sR0FyQ3FCLENBcUNyQjs7QUFBQSxzQkFpR1lyTyxDQUFELElBQTRCO0FBQ3ZDLFlBQU1zTyxLQUFLLEdBQUd0TyxDQUFDLENBQWY7O0FBRUEsVUFBSSxDQUFKLE9BQVk7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQUE7QUFBQTtBQUFBLFlBQU47QUFDQSx5Q0FFRSxpQ0FBcUI7QUFBRXVCLGtCQUFRLEVBQUU4SyxXQUFXLENBQXZCLFFBQXVCLENBQXZCO0FBRnZCO0FBRXVCLFNBQXJCLENBRkYsRUFHRSxXQUhGLE1BR0UsR0FIRjtBQUtBO0FBR0Y7O0FBQUEsVUFBSSxDQUFDaUMsS0FBSyxDQUFWLEtBQWdCO0FBQ2Q7QUFHRjs7QUFBQTtBQUNBLFlBQU07QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFVBQU47O0FBQ0EsVUFBSTFMLEtBQUosRUFBMkMsRUFxQjNDOztBQUFBO0FBRUEsWUFBTTtBQUFBO0FBQUEsVUFBZSx3Q0FBckIsR0FBcUIsQ0FBckIsQ0FuRHVDLENBcUR2QztBQUNBOztBQUNBLFVBQUksY0FBY3hDLEVBQUUsS0FBSyxLQUFyQixVQUFvQ21CLFFBQVEsS0FBSyxLQUFyRCxVQUFvRTtBQUNsRTtBQUdGLE9BM0R1QyxDQTJEdkM7QUFDQTs7O0FBQ0EsVUFBSSxhQUFhLENBQUMsVUFBbEIsS0FBa0IsQ0FBbEIsRUFBb0M7QUFDbEM7QUFHRjs7QUFBQSwyQ0FJRTFJLE1BQU0sQ0FBTkEsb0JBQXFFO0FBQ25FaUksZUFBTyxFQUFFbEIsT0FBTyxDQUFQQSxXQUFtQixLQUR1QztBQUVuRXFCLGNBQU0sRUFBRXJCLE9BQU8sQ0FBUEEsVUFBa0IsS0FOOUI7QUFJdUUsT0FBckUvRyxDQUpGO0FBbEtBLE9BQ0E7OztBQUNBLGlCQUFhLHFEQUFiLFNBQWEsQ0FBYixDQUZBLENBSUE7O0FBQ0EseUJBTEEsQ0FNQTtBQUNBO0FBQ0E7O0FBQ0EsUUFBSTBJLFNBQVEsS0FBWixXQUE0QjtBQUMxQixzQkFBZ0IsS0FBaEIsU0FBOEI7QUFBQTtBQUU1QmdOLGVBQU8sRUFGcUI7QUFHNUI1TixhQUFLLEVBSHVCO0FBQUE7QUFLNUI2TixlQUFPLEVBQUVDLFlBQVksSUFBSUEsWUFBWSxDQUxUO0FBTTVCQyxlQUFPLEVBQUVELFlBQVksSUFBSUEsWUFBWSxDQU52QztBQUE4QixPQUE5QjtBQVVGOztBQUFBLCtCQUEyQjtBQUN6QkUsZUFBUyxFQURnQjtBQUV6QmhKLGlCQUFXLEVBQUU7QUFGZjtBQUVlO0FBRlksS0FBM0IsQ0FwQkEsQ0EyQkE7QUFDQTs7QUFDQSxrQkFBYzRCLE1BQU0sQ0FBcEI7QUFFQTtBQUNBO0FBQ0Esd0JBakNBLENBa0NBO0FBQ0E7O0FBQ0EsVUFBTXFILGlCQUFpQixHQUNyQiw2Q0FBNEI5TCxJQUFJLENBQUpBLGNBRDlCOztBQUdBLGtCQUFjOEwsaUJBQWlCLGVBQS9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBM0NBLENBNENBO0FBQ0E7O0FBQ0E7QUFFQTtBQUVBLG1CQUFlLENBQUMsRUFDZDlMLElBQUksQ0FBSkEsc0JBQ0FBLElBQUksQ0FBSkEsY0FEQUEsT0FFQyxzQkFDQyxDQUFDQSxJQUFJLENBQUpBLFNBREYsVUFFQyxDQUFDRixJQUxXLENBQWhCO0FBT0EscUJBQWlCLENBQUMsQ0FBbEI7QUFDQTs7QUFFQSxRQUFJQSxLQUFKLEVBQXFDLEVBV3JDOztBQUFBLGVBQW1DLEVBd0JwQztBQStFRGlNOztBQUFBQSxRQUFNLEdBQVM7QUFDYjNLLFVBQU0sQ0FBTkE7QUFHRjtBQUFBO0FBQ0Y7QUFDQTs7O0FBQ0U0SyxNQUFJLEdBQUc7QUFDTDVLLFVBQU0sQ0FBTkE7QUFHRjtBQUFBO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0U2SyxNQUFJLFVBQXFCblAsT0FBMEIsR0FBL0MsSUFBc0Q7QUFDeEQsUUFBSWdELEtBQUosRUFBMkMsRUFhM0M7O0FBQUE7QUFBQyxLQUFDO0FBQUE7QUFBQTtBQUFBLFFBQWNvTSxZQUFZLFlBQTNCLEVBQTJCLENBQTNCO0FBQ0QsV0FBTyxrQ0FBUCxPQUFPLENBQVA7QUFHRjtBQUFBO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0UzTyxTQUFPLFVBQXFCVCxPQUEwQixHQUEvQyxJQUFzRDtBQUMzRDtBQUFDLEtBQUM7QUFBQTtBQUFBO0FBQUEsUUFBY29QLFlBQVksWUFBM0IsRUFBMkIsQ0FBM0I7QUFDRCxXQUFPLHFDQUFQLE9BQU8sQ0FBUDtBQUdGOztBQUFBLHVEQU1vQjtBQUFBOztBQUNsQixRQUFJLENBQUN6RCxVQUFVLENBQWYsR0FBZSxDQUFmLEVBQXNCO0FBQ3BCckgsWUFBTSxDQUFOQTtBQUNBO0FBRUY7O0FBQUEsVUFBTStLLGlCQUFpQixHQUFHL0UsR0FBRyxLQUFIQSxNQUFldEssT0FBRCxDQUF4QyxHQUxrQixDQU9sQjtBQUNBOztBQUNBLFFBQUtBLE9BQUQsQ0FBSixJQUF5QjtBQUN2QjtBQUdGLEtBYmtCLENBYWxCO0FBQ0E7QUFDQTs7O0FBQ0FBLFdBQU8sQ0FBUEEsU0FBaUIsQ0FBQyxxQkFBRUEsT0FBTyxDQUFULG9DQUFsQkEsSUFBa0IsQ0FBbEJBO0FBRUEsUUFBSXNQLFlBQVksR0FBR3RQLE9BQU8sQ0FBUEEsV0FBbUIsS0FBdEM7O0FBRUEsUUFBSWdELEtBQUosRUFBcUMsc0JBZ0ZyQzs7QUFBQSxRQUFJLENBQUVoRCxPQUFELENBQUwsSUFBMEI7QUFDeEI7QUFFRixLQXZHa0IsQ0F1R2xCOzs7QUFDQSxRQUFJdVAsT0FBSixJQUFRO0FBQ05DLGlCQUFXLENBQVhBO0FBR0Y7O0FBQUEsVUFBTTtBQUFFdE8sYUFBTyxHQUFUO0FBQUEsUUFBTjtBQUNBLFVBQU11TyxVQUFVLEdBQUc7QUFBbkI7QUFBbUIsS0FBbkI7O0FBRUEsUUFBSSxLQUFKLGdCQUF5QjtBQUN2Qiw4QkFBd0IsS0FBeEI7QUFHRmpQOztBQUFBQSxNQUFFLEdBQUdpTSxXQUFXLENBQ2RpRCxTQUFTLENBQ1BqRixXQUFXLENBQVhBLEVBQVcsQ0FBWEEsR0FBa0JrRixXQUFXLENBQTdCbEYsRUFBNkIsQ0FBN0JBLEdBRE8sSUFFUHpLLE9BQU8sQ0FGQSxRQUdQLEtBSkpRLGFBQ1csQ0FESyxDQUFoQkE7QUFPQSxVQUFNb1AsU0FBUyxHQUFHQyxTQUFTLENBQ3pCcEYsV0FBVyxDQUFYQSxFQUFXLENBQVhBLEdBQWtCa0YsV0FBVyxDQUE3QmxGLEVBQTZCLENBQTdCQSxHQUR5QixJQUV6QixLQUZGLE1BQTJCLENBQTNCO0FBSUEsNkJBOUhrQixDQWdJbEI7QUFDQTtBQUVBO0FBQ0E7QUFDQTs7QUFDQSxRQUFJLENBQUV6SyxPQUFELENBQUQsTUFBd0IscUJBQTVCLFNBQTRCLENBQTVCLEVBQTZEO0FBQzNEO0FBQ0EySCxZQUFNLENBQU5BLCtDQUYyRCxDQUczRDs7QUFDQTtBQUNBO0FBQ0Esa0JBQVksZ0JBQWdCLEtBQTVCLEtBQVksQ0FBWjtBQUNBQSxZQUFNLENBQU5BO0FBQ0E7QUFHRjs7QUFBQSxRQUFJbUksTUFBTSxHQUFHLHdDQUFiLEdBQWEsQ0FBYjtBQUNBLFFBQUk7QUFBQTtBQUFBO0FBQUEsUUFBSixPQWxKa0IsQ0FvSmxCO0FBQ0E7QUFDQTs7QUFDQTs7QUFDQSxRQUFJO0FBQ0ZsRCxXQUFLLEdBQUcsTUFBTSxnQkFBZEEsV0FBYyxFQUFkQTtBQUNDLE9BQUM7QUFBRW1ELGtCQUFVLEVBQVo7QUFBQSxVQUEyQixNQUFNLGlCQUFsQyxzQkFBa0MsR0FBbEM7QUFDRCxLQUhGLENBR0UsWUFBWTtBQUNaO0FBQ0E7QUFDQXpMLFlBQU0sQ0FBTkE7QUFDQTtBQUdGLEtBbEtrQixDQWtLbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0EsUUFBSSxDQUFDLGNBQUQsU0FBQyxDQUFELElBQTZCLENBQWpDLGNBQWdEO0FBQzlDMEwsWUFBTSxHQUFOQTtBQUdGLEtBM0trQixDQTJLbEI7QUFDQTs7O0FBQ0EsUUFBSXBPLFVBQVUsR0FBZCxHQTdLa0IsQ0ErS2xCO0FBQ0E7QUFDQTs7QUFDQUQsWUFBUSxHQUFHQSxRQUFRLEdBQ2YscURBQXdCZ08sV0FBVyxDQURwQixRQUNvQixDQUFuQyxDQURlLEdBQW5CaE87O0FBSUEsUUFBSTBOLGlCQUFpQixJQUFJMU4sUUFBUSxLQUFqQyxXQUFpRDtBQUMvQyxVQUFJcUIsU0FBbUN4QyxFQUFFLENBQUZBLFdBQXZDLEdBQXVDQSxDQUF2QyxFQUEyRDtBQUN6RCxjQUFNeVAsY0FBYyxHQUFHLDhCQUNyQnhELFdBQVcsQ0FBQ2lELFNBQVMsWUFBWSxLQURaLE1BQ0EsQ0FBVixDQURVLDBCQUtwQmhPLENBQUQsSUFBZXdPLG1CQUFtQixJQUxiLEtBS2EsQ0FMYixFQU1yQixLQU5GLE9BQXVCLENBQXZCO0FBUUF0TyxrQkFBVSxHQUFHcU8sY0FBYyxDQUEzQnJPOztBQUVBLFlBQUlxTyxjQUFjLENBQWRBLGVBQThCQSxjQUFjLENBQWhELGNBQStEO0FBQzdEO0FBQ0E7QUFDQXRPLGtCQUFRLEdBQUdzTyxjQUFjLENBQXpCdE87QUFDQW1PLGdCQUFNLENBQU5BO0FBQ0F4RixhQUFHLEdBQUcsaUNBQU5BLE1BQU0sQ0FBTkE7QUFFSDtBQWxCRCxhQWtCTztBQUNMd0YsY0FBTSxDQUFOQSxXQUFrQkksbUJBQW1CLFdBQXJDSixLQUFxQyxDQUFyQ0E7O0FBRUEsWUFBSUEsTUFBTSxDQUFOQSxhQUFKLFVBQWtDO0FBQ2hDbk8sa0JBQVEsR0FBR21PLE1BQU0sQ0FBakJuTztBQUNBMkksYUFBRyxHQUFHLGlDQUFOQSxNQUFNLENBQU5BO0FBRUg7QUFDRjtBQUVEOztBQUFBLFVBQU01RSxLQUFLLEdBQUcscURBQWQsUUFBYyxDQUFkOztBQUVBLFFBQUksQ0FBQ2lHLFVBQVUsQ0FBZixFQUFlLENBQWYsRUFBcUI7QUFDbkIsZ0JBQTJDO0FBQ3pDLGNBQU0sVUFDSCxrQkFBaUJyQixHQUFJLGNBQWE5SixFQUFuQywyQ0FBQyxHQURILG9GQUFNLENBQU47QUFNRjhEOztBQUFBQSxZQUFNLENBQU5BO0FBQ0E7QUFHRjFDOztBQUFBQSxjQUFVLEdBQUdpTyxTQUFTLENBQUNGLFdBQVcsQ0FBWixVQUFZLENBQVosRUFBMEIsS0FBaEQvTixNQUFzQixDQUF0QkE7O0FBRUEsUUFBSSwrQkFBSixLQUFJLENBQUosRUFBMkI7QUFDekIsWUFBTXVPLFFBQVEsR0FBRyx3Q0FBakIsVUFBaUIsQ0FBakI7QUFDQSxZQUFNckYsVUFBVSxHQUFHcUYsUUFBUSxDQUEzQjtBQUVBLFlBQU1DLFVBQVUsR0FBRywrQkFBbkIsS0FBbUIsQ0FBbkI7QUFDQSxZQUFNQyxVQUFVLEdBQUcsK0NBQW5CLFVBQW1CLENBQW5CO0FBQ0EsWUFBTUMsaUJBQWlCLEdBQUc1SyxLQUFLLEtBQS9CO0FBQ0EsWUFBTW9HLGNBQWMsR0FBR3dFLGlCQUFpQixHQUNwQ3ZFLGFBQWEsb0JBRHVCLEtBQ3ZCLENBRHVCLEdBQXhDOztBQUlBLFVBQUksZUFBZ0J1RSxpQkFBaUIsSUFBSSxDQUFDeEUsY0FBYyxDQUF4RCxRQUFrRTtBQUNoRSxjQUFNeUUsYUFBYSxHQUFHdFgsTUFBTSxDQUFOQSxLQUFZbVgsVUFBVSxDQUF0Qm5YLGVBQ25CK1IsS0FBRCxJQUFXLENBQUNRLEtBQUssQ0FEbkIsS0FDbUIsQ0FER3ZTLENBQXRCOztBQUlBLFlBQUlzWCxhQUFhLENBQWJBLFNBQUosR0FBOEI7QUFDNUIsb0JBQTJDO0FBQ3pDblosbUJBQU8sQ0FBUEEsS0FDRyxHQUNDa1osaUJBQWlCLDBCQUVaLGlDQUhQLDhCQUFDLEdBS0UsZUFBY0MsYUFBYSxDQUFiQSxVQU5uQm5aO0FBWUY7O0FBQUEsZ0JBQU0sVUFDSixDQUFDa1osaUJBQWlCLEdBQ2IsMEJBQXlCaEcsR0FBSSxvQ0FBbUNpRyxhQUFhLENBQWJBLFVBRG5ELG9DQUliLDhCQUE2QnpGLFVBQVcsOENBQTZDcEYsS0FKMUYsU0FLRywrQ0FDQzRLLGlCQUFpQixpQ0FFYixzQkFUVixFQUFNLENBQU47QUFhSDtBQWhDRCxhQWdDTyx1QkFBdUI7QUFDNUI5UCxVQUFFLEdBQUcsaUNBQ0h2SCxNQUFNLENBQU5BLHFCQUE0QjtBQUMxQjBJLGtCQUFRLEVBQUVtSyxjQUFjLENBREU7QUFFMUJOLGVBQUssRUFBRVMsa0JBQWtCLFFBQVFILGNBQWMsQ0FIbkR0TCxNQUc2QjtBQUZDLFNBQTVCdkgsQ0FERyxDQUFMdUg7QUFESyxhQU9BO0FBQ0w7QUFDQXZILGNBQU0sQ0FBTkE7QUFFSDtBQUVEME87O0FBQUFBLFVBQU0sQ0FBTkE7O0FBRUEsUUFBSTtBQUFBOztBQUNGLFVBQUk2SSxTQUFTLEdBQUcsTUFBTSwwREFBdEIsVUFBc0IsQ0FBdEI7QUFRQSxVQUFJO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxVQUFKLFVBVEUsQ0FXRjs7QUFDQSxVQUFJLENBQUM1QixPQUFPLElBQVIsWUFBSixPQUFtQztBQUNqQyxZQUFLN04sS0FBRCxVQUFDQSxJQUE0QkEsS0FBRCxVQUFDQSxDQUFqQyxjQUF1RTtBQUNyRSxnQkFBTTBQLFdBQVcsR0FBSTFQLEtBQUQsVUFBQ0EsQ0FBckIsYUFEcUUsQ0FHckU7QUFDQTtBQUNBOztBQUNBLGNBQUkwUCxXQUFXLENBQVhBLFdBQUosR0FBSUEsQ0FBSixFQUFpQztBQUMvQixrQkFBTUMsVUFBVSxHQUFHLHdDQUFuQixXQUFtQixDQUFuQjtBQUNBQSxzQkFBVSxDQUFWQSxXQUFzQlIsbUJBQW1CLENBQ3ZDUSxVQUFVLENBRDZCLFVBQXpDQSxLQUF5QyxDQUF6Q0E7O0FBS0EsZ0JBQUk5RCxLQUFLLENBQUxBLFNBQWU4RCxVQUFVLENBQTdCLFFBQUk5RCxDQUFKLEVBQXlDO0FBQ3ZDLG9CQUFNO0FBQUV0QyxtQkFBRyxFQUFMO0FBQWU5SixrQkFBRSxFQUFqQjtBQUFBLGtCQUE2QjRPLFlBQVksb0JBQS9DLFdBQStDLENBQS9DO0FBS0EscUJBQU8sbUNBQVAsT0FBTyxDQUFQO0FBRUg7QUFFRDlLOztBQUFBQSxnQkFBTSxDQUFOQTtBQUNBLGlCQUFPLFlBQVksTUFBTSxDQUF6QixDQUFPLENBQVA7QUFHRjs7QUFBQSx5QkFBaUIsQ0FBQyxDQUFDdkQsS0FBSyxDQUF4QixZQTVCaUMsQ0E4QmpDOztBQUNBLFlBQUlBLEtBQUssQ0FBTEEsYUFBSixvQkFBMkM7QUFDekM7O0FBRUEsY0FBSTtBQUNGLGtCQUFNLG9CQUFOLE1BQU0sQ0FBTjtBQUNBNFAseUJBQWEsR0FBYkE7QUFDQSxXQUhGLENBR0UsVUFBVTtBQUNWQSx5QkFBYSxHQUFiQTtBQUdGSDs7QUFBQUEsbUJBQVMsR0FBRyxNQUFNLHVFQU1oQjtBQUFFdFAsbUJBQU8sRUFOWHNQO0FBTUUsV0FOZ0IsQ0FBbEJBO0FBU0g7QUFFRDdJOztBQUFBQSxZQUFNLENBQU5BO0FBQ0E7O0FBRUEsZ0JBQTJDO0FBQ3pDLGNBQU1pSixPQUFZLEdBQUcseUJBQXJCO0FBQ0V0TSxjQUFELEtBQUNBLENBQUQsYUFBQ0EsR0FDQXNNLE9BQU8sQ0FBUEEsb0JBQTRCQSxPQUFPLENBQW5DQSx1QkFDQSxDQUFFSixTQUFTLENBQVYsU0FBQ0EsQ0FGSCxlQUFDbE07QUFLSixPQTFFRSxDQTBFRjs7O0FBQ0EsWUFBTXVNLG1CQUFtQixHQUFHN1EsT0FBTyxDQUFQQSxXQUFtQixlQUEvQzs7QUFFQSxVQUNHQSxPQUFELEdBQUNBLElBQ0QyQixRQUFRLEtBRFIsU0FBQzNCLElBRUQsOEJBQUksQ0FBSiw2SkFGQSxHQUFDQSxJQUdEZSxLQUhBLFFBQUNmLElBR0RlLEtBQUssQ0FKUCxXQUtFO0FBQ0E7QUFDQTtBQUNBQSxhQUFLLENBQUxBO0FBR0Y7O0FBQUEsWUFBTSx1REFNSitQLFlBQVksS0FDVEQsbUJBQW1CLElBQUksQ0FBQzdRLE9BQU8sQ0FBL0I2USxnQkFBZ0Q7QUFBRUUsU0FBQyxFQUFIO0FBQVFDLFNBQUMsRUFQeEQ7QUFPK0MsT0FEdkMsQ0FOUixRQVFHNVEsQ0FBRCxJQUFPO0FBQ2IsWUFBSUEsQ0FBQyxDQUFMLFdBQWlCakosS0FBSyxHQUFHQSxLQUFLLElBQTlCLENBQWlCQSxDQUFqQixLQUNLO0FBVlAsT0FBTSxDQUFOOztBQWFBLGlCQUFXO0FBQ1R3USxjQUFNLENBQU5BO0FBQ0E7QUFHRjs7QUFBQSxVQUFJM0UsS0FBSixFQUFxQyxFQUtyQzJFOztBQUFBQSxZQUFNLENBQU5BO0FBRUE7QUFDQSxLQWxIRixDQWtIRSxZQUFZO0FBQ1osVUFBSTdILEdBQUcsQ0FBUCxXQUFtQjtBQUNqQjtBQUVGOztBQUFBO0FBRUg7QUFFRG1SOztBQUFBQSxhQUFXLGtCQUlUalIsT0FBMEIsR0FKakIsSUFLSDtBQUNOLGNBQTJDO0FBQ3pDLFVBQUksT0FBT3NFLE1BQU0sQ0FBYixZQUFKLGFBQTJDO0FBQ3pDbE4sZUFBTyxDQUFQQTtBQUNBO0FBR0Y7O0FBQUEsVUFBSSxPQUFPa04sTUFBTSxDQUFOQSxRQUFQLE1BQU9BLENBQVAsS0FBSixhQUFtRDtBQUNqRGxOLGVBQU8sQ0FBUEEsTUFBZSwyQkFBMEI0WSxNQUF6QzVZO0FBQ0E7QUFFSDtBQUVEOztBQUFBLFFBQUk0WSxNQUFNLEtBQU5BLGVBQTBCLHlCQUE5QixJQUErQztBQUM3QyxzQkFBZ0JoUSxPQUFPLENBQXZCO0FBQ0EsWUFBTSxDQUFOLGdCQUNFO0FBQUE7QUFBQTtBQUFBO0FBSUVrUixXQUFHLEVBSkw7QUFLRUMsV0FBRyxFQUFFLFlBQVluQixNQUFNLEtBQU5BLGNBQXlCLEtBQXpCQSxPQUFxQyxZQU4xRDtBQUNFLE9BREYsRUFRRTtBQUNBO0FBQ0E7QUFWRjtBQWVIO0FBRUQ7O0FBQUEsa0ZBT3FDO0FBQ25DLFFBQUlsUSxHQUFHLENBQVAsV0FBbUI7QUFDakI7QUFDQTtBQUdGOztBQUFBLFFBQUksdUNBQUosZUFBd0M7QUFDdEM2SCxZQUFNLENBQU5BLHFEQURzQyxDQUd0QztBQUNBO0FBQ0E7QUFDQTtBQUVBOztBQUNBckQsWUFBTSxDQUFOQSxtQkFUc0MsQ0FXdEM7QUFDQTs7QUFDQSxZQUFNOE0sc0JBQU47QUFHRjs7QUFBQSxRQUFJO0FBQ0Y7QUFDQTtBQUNBOztBQUVBLFVBQ0Usb0NBQ0EsdUJBRkYsYUFHRTtBQUNBO0FBQUMsU0FBQztBQUFFdkUsY0FBSSxFQUFOO0FBQUE7QUFBQSxZQUFtQyxNQUFNLG9CQUExQyxTQUEwQyxDQUExQztBQUtIOztBQUFBLFlBQU0yRCxTQUFtQyxHQUFHO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFLMUNyWixhQUFLLEVBTFA7QUFBNEMsT0FBNUM7O0FBUUEsVUFBSSxDQUFDcVosU0FBUyxDQUFkLE9BQXNCO0FBQ3BCLFlBQUk7QUFDRkEsbUJBQVMsQ0FBVEEsUUFBa0IsTUFBTSxnQ0FBZ0M7QUFBQTtBQUFBO0FBQXhEQTtBQUF3RCxXQUFoQyxDQUF4QkE7QUFLQSxTQU5GLENBTUUsZUFBZTtBQUNmcFosaUJBQU8sQ0FBUEE7QUFDQW9aLG1CQUFTLENBQVRBO0FBRUg7QUFFRDs7QUFBQTtBQUNBLEtBcENGLENBb0NFLHFCQUFxQjtBQUNyQixhQUFPLHlFQUFQLElBQU8sQ0FBUDtBQVNIO0FBRUQ7O0FBQUEseUVBTzZCO0FBQzNCLFFBQUk7QUFDRixZQUFNYSxpQkFBK0MsR0FBRyxnQkFBeEQsS0FBd0QsQ0FBeEQ7O0FBR0EsVUFBSTVCLFVBQVUsQ0FBVkEsZ0NBQTJDLGVBQS9DLE9BQXFFO0FBQ25FO0FBR0Y7O0FBQUEsWUFBTTZCLGVBQXFELEdBQ3pERCxpQkFBaUIsSUFBSSxhQUFyQkEsZ0NBREY7QUFJQSxZQUFNYixTQUFtQyxHQUFHYyxlQUFlLHFCQUV2RCxNQUFNLGdDQUFpQzdNLEdBQUQsS0FBVTtBQUM5Q3NLLGlCQUFTLEVBQUV0SyxHQUFHLENBRGdDO0FBRTlDc0IsbUJBQVcsRUFBRXRCLEdBQUcsQ0FGOEI7QUFHOUNtSyxlQUFPLEVBQUVuSyxHQUFHLENBQUhBLElBSHFDO0FBSTlDcUssZUFBTyxFQUFFckssR0FBRyxDQUFIQSxJQU5mO0FBRW9ELE9BQVYsQ0FBaEMsQ0FGVjtBQVNBLFlBQU07QUFBQTtBQUFBO0FBQUE7QUFBQSxVQUFOOztBQUVBLGdCQUEyQztBQUN6QyxjQUFNO0FBQUE7QUFBQSxZQUF5QjhNLG1CQUFPLENBQXRDLDBCQUFzQyxDQUF0Qzs7QUFDQSxZQUFJLENBQUNDLGtCQUFrQixDQUF2QixTQUF1QixDQUF2QixFQUFvQztBQUNsQyxnQkFBTSxVQUNILHlEQUF3RDdQLFFBRDNELEdBQU0sQ0FBTjtBQUlIO0FBRUQ7O0FBQUE7O0FBRUEsVUFBSWlOLE9BQU8sSUFBWCxTQUF3QjtBQUN0QjZDLGdCQUFRLEdBQUcsNEJBQ1QsaUNBQXFCO0FBQUE7QUFEWjtBQUNZLFNBQXJCLENBRFMsdUJBSVQsS0FKRkEsTUFBVyxDQUFYQTtBQVFGOztBQUFBLFlBQU0xUSxLQUFLLEdBQUcsTUFBTSxjQUF3QyxNQUMxRDZOLE9BQU8sR0FDSCxvQkFERyxRQUNILENBREcsR0FFSEUsT0FBTyxHQUNQLG9CQURPLFFBQ1AsQ0FETyxHQUVQLGdDQUVFO0FBQ0E7QUFBQTtBQUFBO0FBR0V4QixjQUFNLEVBSFI7QUFJRWpNLGNBQU0sRUFBRSxLQUpWO0FBS0VvSSxlQUFPLEVBQUUsS0FMWDtBQU1FMkUscUJBQWEsRUFBRSxLQWR6QjtBQVFRLE9BSEYsQ0FMYyxDQUFwQjtBQW1CQW9DLGVBQVMsQ0FBVEE7QUFDQTtBQUNBO0FBQ0EsS0FqRUYsQ0FpRUUsWUFBWTtBQUNaLGFBQU8sb0RBQVAsVUFBTyxDQUFQO0FBRUg7QUFFRGtCOztBQUFBQSxLQUFHLGdEQU9jO0FBQ2Y7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQU8sa0JBQVAsV0FBTyxDQUFQO0FBR0Y7QUFBQTtBQUNGO0FBQ0E7QUFDQTs7O0FBQ0VDLGdCQUFjLEtBQTZCO0FBQ3pDO0FBR0ZDOztBQUFBQSxpQkFBZSxLQUFzQjtBQUNuQyxRQUFJLENBQUMsS0FBTCxRQUFrQjtBQUNsQixVQUFNLDBCQUEwQixrQkFBaEMsR0FBZ0MsQ0FBaEM7QUFDQSxVQUFNLDBCQUEwQnBSLEVBQUUsQ0FBRkEsTUFBaEMsR0FBZ0NBLENBQWhDLENBSG1DLENBS25DOztBQUNBLFFBQUlxUixPQUFPLElBQUlDLFlBQVksS0FBdkJELGdCQUE0Q0UsT0FBTyxLQUF2RCxTQUFxRTtBQUNuRTtBQUdGLEtBVm1DLENBVW5DOzs7QUFDQSxRQUFJRCxZQUFZLEtBQWhCLGNBQW1DO0FBQ2pDO0FBR0YsS0FmbUMsQ0FlbkM7QUFDQTtBQUNBO0FBQ0E7OztBQUNBLFdBQU9DLE9BQU8sS0FBZDtBQUdGQzs7QUFBQUEsY0FBWSxLQUFtQjtBQUM3QixVQUFNLFdBQVd4UixFQUFFLENBQUZBLE1BQWpCLEdBQWlCQSxDQUFqQixDQUQ2QixDQUU3QjtBQUNBOztBQUNBLFFBQUl3TCxJQUFJLEtBQUpBLE1BQWVBLElBQUksS0FBdkIsT0FBbUM7QUFDakMxSCxZQUFNLENBQU5BO0FBQ0E7QUFHRixLQVQ2QixDQVM3Qjs7O0FBQ0EsVUFBTTJOLElBQUksR0FBRzVOLFFBQVEsQ0FBUkEsZUFBYixJQUFhQSxDQUFiOztBQUNBLGNBQVU7QUFDUjROLFVBQUksQ0FBSkE7QUFDQTtBQUVGLEtBZjZCLENBZTdCO0FBQ0E7OztBQUNBLFVBQU1DLE1BQU0sR0FBRzdOLFFBQVEsQ0FBUkEsd0JBQWYsQ0FBZUEsQ0FBZjs7QUFDQSxnQkFBWTtBQUNWNk4sWUFBTSxDQUFOQTtBQUVIO0FBRURDOztBQUFBQSxVQUFRLFNBQTBCO0FBQ2hDLFdBQU8sZ0JBQVA7QUFHRjtBQUFBO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0Usc0JBRUU3RSxNQUFjLEdBRmhCLEtBR0V0TixPQUF3QixHQUgxQixJQUlpQjtBQUNmLFFBQUk4UCxNQUFNLEdBQUcsd0NBQWIsR0FBYSxDQUFiO0FBRUEsUUFBSTtBQUFBO0FBQUEsUUFBSjs7QUFFQSxRQUFJOU0sS0FBSixFQUFxQyxFQWlCckM7O0FBQUEsVUFBTTRKLEtBQUssR0FBRyxNQUFNLGdCQUFwQixXQUFvQixFQUFwQjtBQUNBLFFBQUloTCxVQUFVLEdBQWQ7O0FBRUEsUUFBSW9CLFNBQW1Dc0ssTUFBTSxDQUFOQSxXQUF2QyxHQUF1Q0EsQ0FBdkMsRUFBK0Q7QUFDN0Q7QUFDQyxPQUFDO0FBQUV5QyxrQkFBVSxFQUFaO0FBQUEsVUFBMkIsTUFBTSxpQkFBbEMsc0JBQWtDLEdBQWxDO0FBRUQsWUFBTUUsY0FBYyxHQUFHLDhCQUNyQnhELFdBQVcsQ0FBQ2lELFNBQVMsU0FBUyxLQURULE1BQ0EsQ0FBVixDQURVLG1CQUlyQkksTUFBTSxDQUplLE9BS3BCcE8sQ0FBRCxJQUFld08sbUJBQW1CLElBTGIsS0FLYSxDQUxiLEVBTXJCLEtBTkYsT0FBdUIsQ0FBdkI7QUFRQXRPLGdCQUFVLEdBQUdpTyxTQUFTLENBQUNGLFdBQVcsQ0FBQ00sY0FBYyxDQUEzQixNQUFZLENBQVosRUFBcUMsS0FBM0RyTyxNQUFzQixDQUF0QkE7O0FBRUEsVUFBSXFPLGNBQWMsQ0FBZEEsZUFBOEJBLGNBQWMsQ0FBaEQsY0FBK0Q7QUFDN0Q7QUFDQTtBQUNBdE8sZ0JBQVEsR0FBR3NPLGNBQWMsQ0FBekJ0TztBQUNBbU8sY0FBTSxDQUFOQTtBQUNBeEYsV0FBRyxHQUFHLGlDQUFOQSxNQUFNLENBQU5BO0FBRUg7QUFyQkQsV0FxQk87QUFDTHdGLFlBQU0sQ0FBTkEsV0FBa0JJLG1CQUFtQixDQUFDSixNQUFNLENBQVAsVUFBckNBLEtBQXFDLENBQXJDQTs7QUFFQSxVQUFJQSxNQUFNLENBQU5BLGFBQUosVUFBa0M7QUFDaENuTyxnQkFBUSxHQUFHbU8sTUFBTSxDQUFqQm5PO0FBQ0EySSxXQUFHLEdBQUcsaUNBQU5BLE1BQU0sQ0FBTkE7QUFFSDtBQUNEOztBQUFBLFVBQU01RSxLQUFLLEdBQUcscURBQWQsUUFBYyxDQUFkLENBdERlLENBd0RmOztBQUNBLGNBQTJDO0FBQ3pDO0FBR0Y7O0FBQUEsVUFBTTdCLE9BQU8sQ0FBUEEsSUFBWSxDQUNoQixtQ0FBb0N1TyxLQUFELElBQW9CO0FBQ3JELGFBQU9BLEtBQUssR0FDUixvQkFDRSxtREFJRSxPQUFPcFMsT0FBTyxDQUFkLHlCQUNJQSxPQUFPLENBRFgsU0FFSSxLQVJBLE1BRU4sQ0FERixDQURRLEdBQVo7QUFGYyxLQUNoQixDQURnQixFQWVoQixnQkFBZ0JBLE9BQU8sQ0FBUEEsd0JBQWhCLFlBZkYsS0FlRSxDQWZnQixDQUFaNkQsQ0FBTjtBQW1CRjs7QUFBQSw4QkFBNEQ7QUFDMUQsUUFBSW1CLFNBQVMsR0FBYjs7QUFDQSxVQUFNcU4sTUFBTSxHQUFJLFdBQVcsTUFBTTtBQUMvQnJOLGVBQVMsR0FBVEE7QUFERjs7QUFJQSxVQUFNc04sZUFBZSxHQUFHLE1BQU0seUJBQTlCLEtBQThCLENBQTlCOztBQUVBLG1CQUFlO0FBQ2IsWUFBTW5iLEtBQVUsR0FBRyxVQUNoQix3Q0FBdUN1TyxLQUQxQyxHQUFtQixDQUFuQjtBQUdBdk8sV0FBSyxDQUFMQTtBQUNBO0FBR0Y7O0FBQUEsUUFBSWtiLE1BQU0sS0FBSyxLQUFmLEtBQXlCO0FBQ3ZCO0FBR0Y7O0FBQUE7QUFHRkU7O0FBQUFBLFVBQVEsS0FBc0M7QUFDNUMsUUFBSXZOLFNBQVMsR0FBYjs7QUFDQSxVQUFNcU4sTUFBTSxHQUFHLE1BQU07QUFDbkJyTixlQUFTLEdBQVRBO0FBREY7O0FBR0E7QUFDQSxXQUFPd0IsRUFBRSxHQUFGQSxLQUFXeFAsSUFBRCxJQUFVO0FBQ3pCLFVBQUlxYixNQUFNLEtBQUssS0FBZixLQUF5QjtBQUN2QjtBQUdGOztBQUFBLHFCQUFlO0FBQ2IsY0FBTXZTLEdBQVEsR0FBRyxVQUFqQixpQ0FBaUIsQ0FBakI7QUFDQUEsV0FBRyxDQUFIQTtBQUNBO0FBR0Y7O0FBQUE7QUFYRixLQUFPMEcsQ0FBUDtBQWVGZ007O0FBQUFBLGdCQUFjLFdBQW9DO0FBQ2hELFVBQU07QUFBRXZTLFVBQUksRUFBTjtBQUFBLFFBQXFCLGtCQUFrQnFFLE1BQU0sQ0FBTkEsU0FBN0MsSUFBMkIsQ0FBM0I7O0FBQ0EsUUFDRXRCLEtBREYsRUFJRSxFQUdGOztBQUFBLFdBQU95UCxhQUFhLFdBQVcsS0FBeEJBLEtBQWEsQ0FBYkEsTUFBMEN6YixJQUFELElBQVU7QUFDeEQ7QUFDQTtBQUZGLEtBQU95YixDQUFQO0FBTUZDOztBQUFBQSxnQkFBYyxXQUFvQztBQUNoRCxVQUFNO0FBQUV6UyxVQUFJLEVBQU47QUFBQSxRQUF3QixrQkFBa0JxRSxNQUFNLENBQU5BLFNBQWhELElBQThCLENBQTlCOztBQUNBLFFBQUksU0FBSixXQUFJLENBQUosRUFBMkI7QUFDekIsYUFBTyxTQUFQLFdBQU8sQ0FBUDtBQUVGOztBQUFBLFdBQVEsd0JBQXdCbU8sYUFBYSxXQUFXLEtBQXhCQSxLQUFhLENBQWJBLE1BQ3ZCemIsSUFBRCxJQUFVO0FBQ2QsYUFBTyxTQUFQLFdBQU8sQ0FBUDtBQUNBO0FBSDRCeWIsYUFLdEIzUyxHQUFELElBQVM7QUFDZCxhQUFPLFNBQVAsV0FBTyxDQUFQO0FBQ0E7QUFQSixLQUFnQzJTLENBQWhDO0FBV0ZwSjs7QUFBQUEsaUJBQWUsaUJBR0M7QUFDZCxVQUFNO0FBQUUwRixlQUFTLEVBQVg7QUFBQSxRQUFxQixnQkFBM0IsT0FBMkIsQ0FBM0I7O0FBQ0EsVUFBTTRELE9BQU8sR0FBRyxjQUFoQixHQUFnQixDQUFoQjs7QUFDQUMsT0FBRyxDQUFIQTtBQUNBLFdBQU8scUNBQWlEO0FBQUE7QUFBQTtBQUd0RC9TLFlBQU0sRUFIZ0Q7QUFBeEQ7QUFBd0QsS0FBakQsQ0FBUDtBQVFGZ1Q7O0FBQUFBLG9CQUFrQixpQkFBZ0Q7QUFDaEUsUUFBSSxLQUFKLEtBQWM7QUFDWmxMLFlBQU0sQ0FBTkEsZ0NBRUV5SixzQkFGRnpKO0FBTUE7QUFDQTtBQUVIO0FBRURtTDs7QUFBQUEsUUFBTSxvQkFHVztBQUNmLFdBQU8sZUFFTCx5QkFGSyxXQUFQLFdBQU8sQ0FBUDtBQS9vQzhDOztBQUFBOzs7QUFBN0JuTCxNLENBb0NabUcsTUFwQ1luRyxHQW9DVSxvQkFwQ1ZBLEM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNWRyQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXhCQSxDLENBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFNQSxNQUFNb0wsZ0JBQWdCLEdBQXRCOztBQUVPLDJCQUFzQztBQUMzQyxNQUFJO0FBQUE7QUFBQTtBQUFBLE1BQUo7QUFDQSxNQUFJQyxRQUFRLEdBQUdDLE1BQU0sQ0FBTkEsWUFBZjtBQUNBLE1BQUl0UixRQUFRLEdBQUdzUixNQUFNLENBQU5BLFlBQWY7QUFDQSxNQUFJakgsSUFBSSxHQUFHaUgsTUFBTSxDQUFOQSxRQUFYO0FBQ0EsTUFBSXpILEtBQUssR0FBR3lILE1BQU0sQ0FBTkEsU0FBWjtBQUNBLE1BQUlDLElBQW9CLEdBQXhCO0FBRUE1VixNQUFJLEdBQUdBLElBQUksR0FBRytOLGtCQUFrQixDQUFsQkEsSUFBa0IsQ0FBbEJBLHdCQUFILE1BQVgvTjs7QUFFQSxNQUFJMlYsTUFBTSxDQUFWLE1BQWlCO0FBQ2ZDLFFBQUksR0FBRzVWLElBQUksR0FBRzJWLE1BQU0sQ0FBcEJDO0FBREYsU0FFTyxjQUFjO0FBQ25CQSxRQUFJLEdBQUc1VixJQUFJLElBQUksQ0FBQzZWLFFBQVEsQ0FBUkEsUUFBRCxHQUFDQSxDQUFELEdBQTBCLElBQUdBLFFBQTdCLE1BQWZELFFBQVcsQ0FBWEE7O0FBQ0EsUUFBSUQsTUFBTSxDQUFWLE1BQWlCO0FBQ2ZDLFVBQUksSUFBSSxNQUFNRCxNQUFNLENBQXBCQztBQUVIO0FBRUQ7O0FBQUEsTUFBSTFILEtBQUssSUFBSSxpQkFBYixVQUF3QztBQUN0Q0EsU0FBSyxHQUFHdlgsTUFBTSxDQUFDbWYsV0FBVyxDQUFYQSx1QkFBZjVILEtBQWU0SCxDQUFELENBQWQ1SDtBQUdGOztBQUFBLE1BQUk2SCxNQUFNLEdBQUdKLE1BQU0sQ0FBTkEsVUFBa0J6SCxLQUFLLElBQUssSUFBR0EsS0FBL0J5SCxNQUFiO0FBRUEsTUFBSUQsUUFBUSxJQUFJQSxRQUFRLENBQVJBLE9BQWdCLENBQWhCQSxPQUFoQixLQUE2Q0EsUUFBUSxJQUFSQTs7QUFFN0MsTUFDRUMsTUFBTSxDQUFOQSxXQUNDLENBQUMsYUFBYUYsZ0JBQWdCLENBQWhCQSxLQUFkLFFBQWNBLENBQWQsS0FBa0RHLElBQUksS0FGekQsT0FHRTtBQUNBQSxRQUFJLEdBQUcsUUFBUUEsSUFBSSxJQUFuQkEsRUFBTyxDQUFQQTtBQUNBLFFBQUl2UixRQUFRLElBQUlBLFFBQVEsQ0FBUkEsQ0FBUSxDQUFSQSxLQUFoQixLQUFxQ0EsUUFBUSxHQUFHLE1BQVhBO0FBTHZDLFNBTU8sSUFBSSxDQUFKLE1BQVc7QUFDaEJ1UixRQUFJLEdBQUpBO0FBR0Y7O0FBQUEsTUFBSWxILElBQUksSUFBSUEsSUFBSSxDQUFKQSxDQUFJLENBQUpBLEtBQVosS0FBNkJBLElBQUksR0FBRyxNQUFQQTtBQUM3QixNQUFJcUgsTUFBTSxJQUFJQSxNQUFNLENBQU5BLENBQU0sQ0FBTkEsS0FBZCxLQUFpQ0EsTUFBTSxHQUFHLE1BQVRBO0FBRWpDMVIsVUFBUSxHQUFHQSxRQUFRLENBQVJBLGlCQUFYQSxrQkFBV0EsQ0FBWEE7QUFDQTBSLFFBQU0sR0FBR0EsTUFBTSxDQUFOQSxhQUFUQSxLQUFTQSxDQUFUQTtBQUVBLFNBQVEsR0FBRUwsUUFBUyxHQUFFRSxJQUFLLEdBQUV2UixRQUFTLEdBQUUwUixNQUFPLEdBQUVySCxJQUFoRDtBQUNELEM7Ozs7Ozs7Ozs7Ozs7Ozt5Q0N4RUQ7O0FBQ0EsTUFBTXNILFVBQVUsR0FBaEI7O0FBRU8sK0JBQWdEO0FBQ3JELFNBQU9BLFVBQVUsQ0FBVkEsS0FBUCxLQUFPQSxDQUFQO0FBQ0QsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNMRDs7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ08scUNBQXNEO0FBQzNELFFBQU1DLFVBQVUsR0FBRyxRQUNqQixvQkFBNkMsU0FENUIsQ0FBbkI7QUFHQSxRQUFNQyxZQUFZLEdBQUcvSCxJQUFJLEdBQUcsY0FBSCxVQUFHLENBQUgsR0FBekI7QUFDQSxRQUFNO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFBeUQsYUFBL0QsWUFBK0QsQ0FBL0Q7O0FBSUEsTUFBSVUsTUFBTSxLQUFLb0gsVUFBVSxDQUF6QixRQUFrQztBQUNoQyxVQUFNLFVBQVcsb0RBQW1EakosR0FBcEUsRUFBTSxDQUFOO0FBRUY7O0FBQUEsU0FBTztBQUFBO0FBRUxrQixTQUFLLEVBQUUseUNBRkYsWUFFRSxDQUZGO0FBQUE7QUFBQTtBQUtMdkwsUUFBSSxFQUFFQSxJQUFJLENBQUpBLE1BQVdzVCxVQUFVLENBQVZBLE9BTG5CLE1BS1F0VDtBQUxELEdBQVA7QUFPRCxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzVCRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSU87O0FBQUEsTUFBTXdULGNBQ2MsR0FBRztBQUM1QkMsV0FBUyxFQURtQjtBQUU1QkMsV0FBUyxFQUhKO0FBQ3VCLENBRHZCOzs7QUFNQSxNQUFNQyx5QkFDYyxtQ0FBRyxjQUFIO0FBRXpCQyxRQUFNLEVBSEQ7QUFDb0IsRUFEcEI7Ozs7ZUFNUSxDQUFDQyxXQUFXLEdBQVosVUFBeUI7QUFDdEMsU0FBUWhSLElBQUQsSUFBa0I7QUFDdkIsVUFBTTVKLElBQXdCLEdBQTlCO0FBQ0EsVUFBTTZhLFlBQVksR0FBR0MsWUFBWSxDQUFaQSx5QkFHbkJGLFdBQVcsK0JBSGIsY0FBcUJFLENBQXJCO0FBS0EsVUFBTUMsT0FBTyxHQUFHRCxZQUFZLENBQVpBLCtCQUFoQixJQUFnQkEsQ0FBaEI7QUFFQSxXQUFPLHNCQUF1RDtBQUM1RCxZQUFNdlAsR0FBRyxHQUFHOUMsUUFBUSxJQUFSQSxlQUEyQnNTLE9BQU8sQ0FBOUMsUUFBOEMsQ0FBOUM7O0FBQ0EsVUFBSSxDQUFKLEtBQVU7QUFDUjtBQUdGOztBQUFBLHVCQUFpQjtBQUNmLGFBQUssTUFBTCxhQUF3QjtBQUN0QjtBQUNBO0FBQ0EsY0FBSSxPQUFPOWEsR0FBRyxDQUFWLFNBQUosVUFBa0M7QUFDaEMsbUJBQVFzTCxHQUFHLENBQUosTUFBQ0EsQ0FBbUJ0TCxHQUFHLENBQTlCLElBQVFzTCxDQUFSO0FBRUg7QUFDRjtBQUVEOztBQUFBLDZDQUFPLE1BQVAsR0FBdUJBLEdBQUcsQ0FBMUI7QUFoQkY7QUFURjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNmRjs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUtBLEMsQ0FBQTtBQUNBOzs7QUFDTyxNQUFNeVAsZ0JBQWdCLEdBQUlDLFNBQUQsSUFBdUI7QUFDckQsTUFBSUMsWUFBWSxHQUFoQjs7QUFFQSxPQUFLLElBQUlwZ0IsQ0FBQyxHQUFWLEdBQWdCQSxDQUFDLEdBQUdtZ0IsU0FBUyxDQUE3QixRQUFzQ25nQixDQUF0QyxJQUEyQztBQUN6QyxVQUFNcWdCLFFBQVEsR0FBR0YsU0FBUyxDQUFUQSxXQUFqQixDQUFpQkEsQ0FBakI7O0FBRUEsUUFDR0UsUUFBUSxHQUFSQSxNQUFpQkEsUUFBUSxHQUExQixFQUFDQSxJQUFtQztBQUNuQ0EsWUFBUSxHQUFSQSxNQUFpQkEsUUFBUSxHQUFHLEdBRi9CLENBRW9DO0FBRnBDLE1BR0U7QUFDQUQsb0JBQVksSUFBSUQsU0FBUyxDQUF6QkMsQ0FBeUIsQ0FBekJBO0FBRUg7QUFDRDs7QUFBQTtBQWJLOzs7O0FBZ0JBLG1DQUlXO0FBQ2hCLFFBQU1ySixNQUFjLEdBQXBCO0FBQ0EsUUFBTXVKLFFBQVEsR0FBR0MsR0FBRyxDQUFIQSxNQUFXQyxPQUFELElBQWE7QUFDdEM7QUFDQSxRQUFJcmIsR0FBRyxHQUFHcWIsT0FBTyxDQUFqQjs7QUFFQSxZQUFRQSxPQUFPLENBQWY7QUFDRTtBQUFlO0FBQ2JyYixhQUFHLEdBQUdBLEdBQUcsQ0FBVEEsV0FBTUEsRUFBTkE7QUFDQWdMLGVBQUssR0FBR3NRLEdBQUcsQ0FBSEEsUUFBUnRRLEdBQVFzUSxDQUFSdFE7QUFDQTtBQUVGOztBQUFBO0FBQWU7QUFDYkEsZUFBSyxHQUFJc1EsR0FBRCxRQUFDQSxDQUFvQkQsT0FBTyxDQUFwQ3JRLEdBQVNzUSxDQUFUdFE7QUFDQTtBQUVGOztBQUFBO0FBQWM7QUFDWkEsZUFBSyxHQUFHcUgsS0FBSyxDQUFickgsR0FBYSxDQUFiQTtBQUNBO0FBRUY7O0FBQUE7QUFBYTtBQUNYLGdCQUFNO0FBQUE7QUFBQSxjQUFXLElBQUcsSUFBSCxtQkFBRyxDQUFILFlBQWpCLEdBRFcsQ0FFWDs7QUFDQSxnQkFBTWdQLFFBQVEsR0FBR0QsSUFBSCxRQUFHQSxHQUFILE1BQUdBLE9BQUksQ0FBSkEsY0FBakIsV0FBaUJBLEVBQWpCO0FBQ0EvTyxlQUFLLEdBQUxBO0FBQ0E7QUFFRjs7QUFBQTtBQUFTO0FBQ1A7QUF0Qko7QUFBQTs7QUEwQkEsUUFBSSxDQUFDcVEsT0FBTyxDQUFSLFNBQUosT0FBNkI7QUFDM0J6SixZQUFNLENBQUNtSixnQkFBZ0IsQ0FBdkJuSixHQUF1QixDQUFqQixDQUFOQTtBQUNBO0FBRkYsV0FHTyxXQUFXO0FBQ2hCLFlBQU1rSixPQUFPLEdBQUcsV0FBWSxJQUFHTyxPQUFPLENBQUNyUSxLQUF2QyxHQUFnQixDQUFoQjtBQUNBLFlBQU11USxPQUFPLEdBQUd2USxLQUFLLENBQUxBLE1BQWhCLE9BQWdCQSxDQUFoQjs7QUFFQSxtQkFBYTtBQUNYLFlBQUl1USxPQUFPLENBQVgsUUFBb0I7QUFDbEJ6YixnQkFBTSxDQUFOQSxLQUFZeWIsT0FBTyxDQUFuQnpiLGdCQUFxQzBiLFFBQUQsSUFBYztBQUNoRDVKLGtCQUFNLENBQU5BLFFBQU0sQ0FBTkEsR0FBbUIySixPQUFPLENBQVBBLE9BQW5CM0osUUFBbUIySixDQUFuQjNKO0FBREY5UjtBQURGLGVBSU8sSUFBSXViLE9BQU8sQ0FBUEEsbUJBQTJCRSxPQUFPLENBQXRDLENBQXNDLENBQXRDLEVBQTJDO0FBQ2hEM0osZ0JBQU0sQ0FBTkEsT0FBYzJKLE9BQU8sQ0FBckIzSixDQUFxQixDQUFyQkE7QUFFRjs7QUFBQTtBQUVIO0FBQ0Q7O0FBQUE7QUFoREYsR0FBaUJ3SixDQUFqQjs7QUFtREEsZ0JBQWM7QUFDWjtBQUVGOztBQUFBO0FBR0s7O0FBQUEsdUNBQStEO0FBQ3BFLE1BQUksQ0FBQ3BRLEtBQUssQ0FBTEEsU0FBTCxHQUFLQSxDQUFMLEVBQTBCO0FBQ3hCO0FBR0Y7O0FBQUEsT0FBSyxNQUFMLE9BQWtCbEwsTUFBTSxDQUFOQSxLQUFsQixNQUFrQkEsQ0FBbEIsRUFBdUM7QUFDckMsUUFBSWtMLEtBQUssQ0FBTEEsU0FBZ0IsSUFBR2hMLEdBQXZCLEVBQUlnTCxDQUFKLEVBQStCO0FBQzdCQSxXQUFLLEdBQUdBLEtBQUssQ0FBTEEsUUFFSixXQUFZLElBQUdoTCxHQUFmLE9BRklnTCxHQUVKLENBRklBLEVBR0gsSUFBR2hMLEdBSEFnTCxxQ0FNSixXQUFZLElBQUdoTCxHQUFmLE9BTklnTCxHQU1KLENBTklBLEVBT0gsSUFBR2hMLEdBUEFnTCxvQ0FTRyxXQUFZLElBQUdoTCxHQUFmLE9BVEhnTCxHQVNHLENBVEhBLEVBU21DLElBQUdoTCxHQVR0Q2dMLGdDQVdKLFdBQVksSUFBR2hMLEdBQWYsV0FYSWdMLEdBV0osQ0FYSUEsRUFZSCx3QkFBdUJoTCxHQVo1QmdMLEVBQVFBLENBQVJBO0FBZUg7QUFDREE7O0FBQUFBLE9BQUssR0FBR0EsS0FBSyxDQUFMQSwwTUFBUkEsR0FBUUEsQ0FBUkEsQ0F2Qm9FLENBOEJwRTtBQUNBOztBQUNBLFNBQU82UCxZQUFZLENBQVpBLFFBQ0ssSUFBRzdQLEtBRFI2UCxJQUNpQjtBQUFFWSxZQUFRLEVBRDNCWjtBQUNpQixHQURqQkEsaUJBQVAsQ0FBT0EsQ0FBUDtBQUthOztBQUFBLDZFQUtiO0FBQ0EsTUFBSWEsaUJBS21DLEdBTHZDLEdBREEsQ0FRQTs7QUFDQXJKLE9BQUssR0FBR3ZTLE1BQU0sQ0FBTkEsV0FBUnVTLEtBQVF2UyxDQUFSdVM7QUFDQSxRQUFNc0osU0FBUyxHQUFHdEosS0FBSyxDQUF2QjtBQUNBLFNBQU9BLEtBQUssQ0FBWjtBQUNBLFNBQU9BLEtBQUssQ0FBWjs7QUFFQSxNQUFJaUYsV0FBVyxDQUFYQSxXQUFKLEdBQUlBLENBQUosRUFBaUM7QUFDL0JvRSxxQkFBaUIsR0FBRyx3Q0FBcEJBLFdBQW9CLENBQXBCQTtBQURGLFNBRU87QUFDTCxVQUFNO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFFBU0YsUUFUSixXQVNJLENBVEo7QUFXQUEscUJBQWlCLEdBQUc7QUFBQTtBQUVsQnJKLFdBQUssRUFBRSx5Q0FGVyxZQUVYLENBRlc7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQXBCcUo7QUFBb0IsS0FBcEJBO0FBWUY7O0FBQUEsUUFBTUUsU0FBUyxHQUFHRixpQkFBaUIsQ0FBbkM7QUFDQSxRQUFNRyxRQUFRLEdBQUksR0FBRUgsaUJBQWlCLENBQUNsVCxRQUFVLEdBQzlDa1QsaUJBQWlCLENBQWpCQSxRQUEwQixFQUQ1QjtBQUdBLFFBQU1JLGlCQUFxQyxHQUEzQztBQUNBakIsY0FBWSxDQUFaQTtBQUVBLFFBQU1rQixjQUFjLEdBQUdELGlCQUFpQixDQUFqQkEsSUFBdUI5YixHQUFELElBQVNBLEdBQUcsQ0FBekQsSUFBdUI4YixDQUF2QjtBQUVBLE1BQUlFLG1CQUFtQixHQUFHLFlBQVksQ0FBWixrQkFFeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBRVAsWUFBUSxFQVJaO0FBUUUsR0FSd0IsQ0FBMUI7QUFVQSxhQTNEQSxDQTZEQTs7QUFDQSxPQUFLLE1BQU0sTUFBWCxVQUFXLENBQVgsSUFBZ0MzYixNQUFNLENBQU5BLFFBQWhDLFNBQWdDQSxDQUFoQyxFQUEyRDtBQUN6RCxRQUFJa0wsS0FBSyxHQUFHdlEsS0FBSyxDQUFMQSxzQkFBNEJ3aEIsVUFBVSxDQUF0Q3hoQixDQUFzQyxDQUF0Q0EsR0FBWjs7QUFDQSxlQUFXO0FBQ1Q7QUFDQTtBQUNBdVEsV0FBSyxHQUFHa1IsY0FBYyxRQUF0QmxSLE1BQXNCLENBQXRCQTtBQUVGNFE7O0FBQUFBLGFBQVMsQ0FBVEEsR0FBUyxDQUFUQTtBQUdGLEdBeEVBLENBd0VBO0FBQ0E7OztBQUNBLE1BQUlPLFNBQVMsR0FBR3JjLE1BQU0sQ0FBTkEsS0FBaEIsTUFBZ0JBLENBQWhCLENBMUVBLENBNEVBOztBQUNBLGlCQUFlO0FBQ2JxYyxhQUFTLEdBQUdBLFNBQVMsQ0FBVEEsT0FBa0IvTCxJQUFELElBQVVBLElBQUksS0FBM0MrTCxvQkFBWUEsQ0FBWkE7QUFHRjs7QUFBQSxNQUNFQyxtQkFBbUIsSUFDbkIsQ0FBQ0QsU0FBUyxDQUFUQSxLQUFnQm5jLEdBQUQsSUFBUytiLGNBQWMsQ0FBZEEsU0FGM0IsR0FFMkJBLENBQXhCSSxDQUZILEVBR0U7QUFDQSxTQUFLLE1BQUwsa0JBQTZCO0FBQzNCLFVBQUksRUFBRW5jLEdBQUcsSUFBVCxTQUFJLENBQUosRUFBeUI7QUFDdkI0YixpQkFBUyxDQUFUQSxHQUFTLENBQVRBLEdBQWlCaEssTUFBTSxDQUF2QmdLLEdBQXVCLENBQXZCQTtBQUVIO0FBQ0Y7QUFFRDs7QUFBQSxNQUFJO0FBQ0ZTLFVBQU0sR0FBR0wsbUJBQW1CLENBQTVCSyxNQUE0QixDQUE1QkE7QUFFQSxVQUFNLG1CQUFtQkEsTUFBTSxDQUFOQSxNQUF6QixHQUF5QkEsQ0FBekI7QUFDQVgscUJBQWlCLENBQWpCQTtBQUNBQSxxQkFBaUIsQ0FBakJBLE9BQTBCLEdBQUU3SSxJQUFJLFNBQVMsRUFBRyxHQUFFQSxJQUFJLElBQUksRUFBdEQ2STtBQUNBLFdBQVFBLGlCQUFELENBQVA7QUFDQSxHQVBGLENBT0UsWUFBWTtBQUNaLFFBQUkvVSxHQUFHLENBQUhBLGNBQUosOENBQUlBLENBQUosRUFBdUU7QUFDckUsWUFBTSxVQUFOLDJLQUFNLENBQU47QUFJRjs7QUFBQTtBQUdGLEdBNUdBLENBNEdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQStVLG1CQUFpQixDQUFqQkEsd0NBQTBCLEtBQTFCQSxHQUVLQSxpQkFBaUIsQ0FGdEJBO0FBS0EsU0FBTztBQUFBO0FBQVA7QUFBTyxHQUFQO0FBSUQsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzNQTSw4Q0FFVztBQUNoQixRQUFNckosS0FBcUIsR0FBM0I7QUFDQWlLLGNBQVksQ0FBWkEsUUFBcUIsZ0JBQWdCO0FBQ25DLFFBQUksT0FBT2pLLEtBQUssQ0FBWixHQUFZLENBQVosS0FBSixhQUF1QztBQUNyQ0EsV0FBSyxDQUFMQSxHQUFLLENBQUxBO0FBREYsV0FFTyxJQUFJNVgsS0FBSyxDQUFMQSxRQUFjNFgsS0FBSyxDQUF2QixHQUF1QixDQUFuQjVYLENBQUosRUFBK0I7QUFDcEM7QUFBRTRYLFdBQUssQ0FBTixHQUFNLENBQUxBLENBQUQsSUFBQ0EsQ0FBRCxLQUFDQTtBQURHLFdBRUE7QUFDTEEsV0FBSyxDQUFMQSxHQUFLLENBQUxBLEdBQWEsQ0FBQ0EsS0FBSyxDQUFOLEdBQU0sQ0FBTixFQUFiQSxLQUFhLENBQWJBO0FBRUg7QUFSRGlLO0FBU0E7QUFHRjs7QUFBQSx1Q0FBdUQ7QUFDckQsTUFDRSw2QkFDQyw2QkFBNkIsQ0FBQ0MsS0FBSyxDQURwQyxLQUNvQyxDQURwQyxJQUVBLGlCQUhGLFdBSUU7QUFDQSxXQUFPemhCLE1BQU0sQ0FBYixLQUFhLENBQWI7QUFMRixTQU1PO0FBQ0w7QUFFSDtBQUVNOztBQUFBLDBDQUVZO0FBQ2pCLFFBQU1xWCxNQUFNLEdBQUcsSUFBZixlQUFlLEVBQWY7QUFDQXJTLFFBQU0sQ0FBTkEsMEJBQWlDLENBQUMsTUFBRCxLQUFDLENBQUQsS0FBa0I7QUFDakQsUUFBSXJGLEtBQUssQ0FBTEEsUUFBSixLQUFJQSxDQUFKLEVBQTBCO0FBQ3hCdVEsV0FBSyxDQUFMQSxRQUFld1IsSUFBRCxJQUFVckssTUFBTSxDQUFOQSxZQUFtQnNLLHNCQUFzQixDQUFqRXpSLElBQWlFLENBQXpDbUgsQ0FBeEJuSDtBQURGLFdBRU87QUFDTG1ILFlBQU0sQ0FBTkEsU0FBZ0JzSyxzQkFBc0IsQ0FBdEN0SyxLQUFzQyxDQUF0Q0E7QUFFSDtBQU5EclM7QUFPQTtBQUdLOztBQUFBLHdCQUVMLEdBRkssa0JBR1k7QUFDakI0YyxrQkFBZ0IsQ0FBaEJBLFFBQTBCSixZQUFELElBQWtCO0FBQ3pDN2hCLFNBQUssQ0FBTEEsS0FBVzZoQixZQUFZLENBQXZCN2hCLElBQVc2aEIsRUFBWDdoQixVQUF5Q3VGLEdBQUQsSUFBU2dILE1BQU0sQ0FBTkEsT0FBakR2TSxHQUFpRHVNLENBQWpEdk07QUFDQTZoQixnQkFBWSxDQUFaQSxRQUFxQixnQkFBZ0J0VixNQUFNLENBQU5BLFlBQXJDc1YsS0FBcUN0VixDQUFyQ3NWO0FBRkZJO0FBSUE7QUFDRCxDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3BERDs7QUFDQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBOztBQUFBLE1BQU1DLGtCQUFrQixHQUFHLHdCQUEzQixJQUEyQixDQUEzQjs7QUFFZSwrRUFnQmI7QUFDQSxNQUFJQyxXQUFXLEdBQWY7QUFDQSxNQUFJNUYsUUFBUSxHQUFHLHdDQUFmLE1BQWUsQ0FBZjtBQUNBLE1BQUk2RixVQUFVLEdBQUcscURBQ2YsOENBQW9CLHlCQUFZN0YsUUFBUSxDQUF4QyxRQUFvQixDQUFwQixXQURGLFFBQWlCLENBQWpCO0FBR0E7O0FBRUEsUUFBTThGLGFBQWEsR0FBSUMsT0FBRCxJQUFzQjtBQUMxQyxVQUFNakMsT0FBTyxHQUFHNkIsa0JBQWtCLENBQUNJLE9BQU8sQ0FBMUMsTUFBa0MsQ0FBbEM7QUFDQSxRQUFJbkwsTUFBTSxHQUFHa0osT0FBTyxDQUFDOUQsUUFBUSxDQUE3QixRQUFvQixDQUFwQjs7QUFFQSxRQUFJK0YsT0FBTyxDQUFQQSxPQUFKLFFBQTJCO0FBQ3pCLFlBQU1DLFNBQVMsR0FBRyxrQ0FDaEI7QUFDRUMsZUFBTyxFQUFFO0FBQ1BsRCxjQUFJLEVBQUU3TyxRQUFRLENBQVJBLFNBRlY7QUFDVyxTQURYO0FBSUVnUyxlQUFPLEVBQUVoUyxRQUFRLENBQVJBLDBCQUV5QixlQUFlO0FBQzdDLGdCQUFNLE1BQU0sR0FBTixTQUFrQnNSLElBQUksQ0FBSkEsTUFBeEIsR0FBd0JBLENBQXhCO0FBQ0FXLGFBQUcsQ0FBSEEsR0FBRyxDQUFIQSxHQUFXblMsS0FBSyxDQUFMQSxLQUFYbVMsR0FBV25TLENBQVhtUztBQUNBO0FBTEtqUyxXQUxLLEVBS0xBO0FBSlgsT0FEZ0IsRUFhaEI2UixPQUFPLENBYlMsS0FjaEIvRixRQUFRLENBZFYsS0FBa0IsQ0FBbEI7O0FBaUJBLHFCQUFlO0FBQ2JsWCxjQUFNLENBQU5BO0FBREYsYUFFTztBQUNMOFIsY0FBTSxHQUFOQTtBQUVIO0FBRUQ7O0FBQUEsZ0JBQVk7QUFDVixVQUFJLENBQUNtTCxPQUFPLENBQVosYUFBMEI7QUFDeEI7QUFDQTtBQUVGOztBQUFBLFlBQU1LLE9BQU8sR0FBRyxpQ0FDZEwsT0FBTyxDQURPLDRCQUFoQixJQUFnQixDQUFoQjtBQU1BL0YsY0FBUSxHQUFHb0csT0FBTyxDQUFsQnBHO0FBQ0E3QyxZQUFNLEdBQUdpSixPQUFPLENBQWhCako7QUFDQXJVLFlBQU0sQ0FBTkEsY0FBcUJzZCxPQUFPLENBQVBBLGtCQUFyQnRkO0FBRUErYyxnQkFBVSxHQUFHLHFEQUNYLDhDQUFvQix5QkFBcEIsTUFBb0IsQ0FBcEIsV0FERkEsUUFBYSxDQUFiQTs7QUFJQSxVQUFJcEosS0FBSyxDQUFMQSxTQUFKLFVBQUlBLENBQUosRUFBZ0M7QUFDOUI7QUFDQTtBQUNBbUosbUJBQVcsR0FBWEE7QUFDQTdKLG9CQUFZLEdBQVpBO0FBQ0E7QUFHRixPQTNCVSxDQTJCVjs7O0FBQ0FBLGtCQUFZLEdBQUdFLFdBQVcsQ0FBMUJGLFVBQTBCLENBQTFCQTs7QUFFQSxVQUFJQSxZQUFZLEtBQVpBLFVBQTJCVSxLQUFLLENBQUxBLFNBQS9CLFlBQStCQSxDQUEvQixFQUE2RDtBQUMzRG1KLG1CQUFXLEdBQVhBO0FBQ0E7QUFFSDtBQUNGO0FBaEVEOztBQWlFQSxNQUFJUyxRQUFRLEdBQVo7O0FBRUEsT0FBSyxJQUFJeGlCLENBQUMsR0FBVixHQUFnQkEsQ0FBQyxHQUFHeWlCLFFBQVEsQ0FBUkEsWUFBcEIsUUFBaUR6aUIsQ0FBakQsSUFBc0Q7QUFDcEQ7QUFDQTtBQUNBaWlCLGlCQUFhLENBQUNRLFFBQVEsQ0FBUkEsWUFBZFIsQ0FBY1EsQ0FBRCxDQUFiUjtBQUVGRjs7QUFBQUEsYUFBVyxHQUFHbkosS0FBSyxDQUFMQSxTQUFkbUosVUFBY25KLENBQWRtSjs7QUFFQSxNQUFJLENBQUosYUFBa0I7QUFDaEIsUUFBSSxDQUFKLFVBQWU7QUFDYixXQUFLLElBQUkvaEIsQ0FBQyxHQUFWLEdBQWdCQSxDQUFDLEdBQUd5aUIsUUFBUSxDQUFSQSxXQUFwQixRQUFnRHppQixDQUFoRCxJQUFxRDtBQUNuRCxZQUFJaWlCLGFBQWEsQ0FBQ1EsUUFBUSxDQUFSQSxXQUFsQixDQUFrQkEsQ0FBRCxDQUFqQixFQUEyQztBQUN6Q0Qsa0JBQVEsR0FBUkE7QUFDQTtBQUVIO0FBQ0Y7QUFFRCxLQVZnQixDQVVoQjs7O0FBQ0EsUUFBSSxDQUFKLFVBQWU7QUFDYnRLLGtCQUFZLEdBQUdFLFdBQVcsQ0FBMUJGLFVBQTBCLENBQTFCQTtBQUNBNkosaUJBQVcsR0FBR25KLEtBQUssQ0FBTEEsU0FBZG1KLFlBQWNuSixDQUFkbUo7QUFDQVMsY0FBUSxHQUFSQTtBQUdGOztBQUFBLFFBQUksQ0FBSixVQUFlO0FBQ2IsV0FBSyxJQUFJeGlCLENBQUMsR0FBVixHQUFnQkEsQ0FBQyxHQUFHeWlCLFFBQVEsQ0FBUkEsU0FBcEIsUUFBOEN6aUIsQ0FBOUMsSUFBbUQ7QUFDakQsWUFBSWlpQixhQUFhLENBQUNRLFFBQVEsQ0FBUkEsU0FBbEIsQ0FBa0JBLENBQUQsQ0FBakIsRUFBeUM7QUFDdkNELGtCQUFRLEdBQVJBO0FBQ0E7QUFFSDtBQUNGO0FBQ0Y7QUFFRDs7QUFBQSxTQUFPO0FBQUE7QUFBQTtBQUFBO0FBQVA7QUFBTyxHQUFQO0FBTUQsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1SU0scUNBQXVFO0FBQzVFLFFBQU07QUFBQTtBQUFBO0FBQUEsTUFBTjtBQUNBLFNBQVE3VSxRQUFELElBQXlDO0FBQzlDLFVBQU0wTyxVQUFVLEdBQUdxRyxFQUFFLENBQUZBLEtBQW5CLFFBQW1CQSxDQUFuQjs7QUFDQSxRQUFJLENBQUosWUFBaUI7QUFDZjtBQUdGOztBQUFBLFVBQU1DLE1BQU0sR0FBSTNMLEtBQUQsSUFBbUI7QUFDaEMsVUFBSTtBQUNGLGVBQU80TCxrQkFBa0IsQ0FBekIsS0FBeUIsQ0FBekI7QUFDQSxPQUZGLENBRUUsVUFBVTtBQUNWLGNBQU05VyxHQUE4QixHQUFHLFVBQXZDLHdCQUF1QyxDQUF2QztBQUdBQSxXQUFHLENBQUhBO0FBQ0E7QUFFSDtBQVZEOztBQVdBLFVBQU1pTCxNQUFrRCxHQUF4RDtBQUVBOVIsVUFBTSxDQUFOQSxxQkFBNkI0ZCxRQUFELElBQXNCO0FBQ2hELFlBQU1DLENBQUMsR0FBR0MsTUFBTSxDQUFoQixRQUFnQixDQUFoQjtBQUNBLFlBQU1DLENBQUMsR0FBRzNHLFVBQVUsQ0FBQ3lHLENBQUMsQ0FBdEIsR0FBb0IsQ0FBcEI7O0FBQ0EsVUFBSUUsQ0FBQyxLQUFMLFdBQXFCO0FBQ25Cak0sY0FBTSxDQUFOQSxRQUFNLENBQU5BLEdBQW1CLENBQUNpTSxDQUFDLENBQURBLFFBQUQsR0FBQ0EsQ0FBRCxHQUNmQSxDQUFDLENBQURBLGVBQWtCbGQsS0FBRCxJQUFXNmMsTUFBTSxDQURuQixLQUNtQixDQUFsQ0ssQ0FEZSxHQUVmRixDQUFDLENBQURBLFNBQ0EsQ0FBQ0gsTUFBTSxDQURQRyxDQUNPLENBQVAsQ0FEQUEsR0FFQUgsTUFBTSxDQUpWNUwsQ0FJVSxDQUpWQTtBQU1IO0FBVkQ5UjtBQVdBO0FBOUJGO0FBZ0NELEM7Ozs7Ozs7Ozs7Ozs7Ozt1Q0M5QkQ7QUFDQTs7QUFDQSwwQkFBa0M7QUFDaEMsU0FBT2dlLEdBQUcsQ0FBSEEsZ0NBQVAsTUFBT0EsQ0FBUDtBQUdGOztBQUFBLCtCQUF1QztBQUNyQyxRQUFNOUwsUUFBUSxHQUFHSCxLQUFLLENBQUxBLG1CQUF5QkEsS0FBSyxDQUFMQSxTQUExQyxHQUEwQ0EsQ0FBMUM7O0FBQ0EsZ0JBQWM7QUFDWkEsU0FBSyxHQUFHQSxLQUFLLENBQUxBLFNBQWUsQ0FBdkJBLENBQVFBLENBQVJBO0FBRUY7O0FBQUEsUUFBTUUsTUFBTSxHQUFHRixLQUFLLENBQUxBLFdBQWYsS0FBZUEsQ0FBZjs7QUFDQSxjQUFZO0FBQ1ZBLFNBQUssR0FBR0EsS0FBSyxDQUFMQSxNQUFSQSxDQUFRQSxDQUFSQTtBQUVGOztBQUFBLFNBQU87QUFBRTdSLE9BQUcsRUFBTDtBQUFBO0FBQVA7QUFBTyxHQUFQO0FBR0s7O0FBQUEsd0NBT0w7QUFDQSxRQUFNK2QsUUFBUSxHQUFHLENBQUNDLGVBQWUsQ0FBZkEsc0JBQUQsb0JBQWpCLEdBQWlCLENBQWpCO0FBSUEsUUFBTUosTUFBc0MsR0FBNUM7QUFDQSxNQUFJSyxVQUFVLEdBQWQ7QUFDQSxRQUFNQyxrQkFBa0IsR0FBR0gsUUFBUSxDQUFSQSxJQUNuQjlMLE9BQUQsSUFBYTtBQUNoQixRQUFJQSxPQUFPLENBQVBBLG1CQUEyQkEsT0FBTyxDQUFQQSxTQUEvQixHQUErQkEsQ0FBL0IsRUFBc0Q7QUFDcEQsWUFBTTtBQUFBO0FBQUE7QUFBQTtBQUFBLFVBQTRCa00sY0FBYyxDQUFDbE0sT0FBTyxDQUFQQSxTQUFpQixDQUFsRSxDQUFpREEsQ0FBRCxDQUFoRDtBQUNBMkwsWUFBTSxDQUFOQSxHQUFNLENBQU5BLEdBQWM7QUFBRVEsV0FBRyxFQUFFSCxVQUFQO0FBQUE7QUFBZEw7QUFBYyxPQUFkQTtBQUNBLGFBQU83TCxNQUFNLEdBQUlDLFFBQVEsbUJBQVosV0FBYjtBQUhGLFdBSU87QUFDTCxhQUFRLElBQUdxTSxXQUFXLFNBQXRCO0FBRUg7QUFUd0JOLFVBQTNCLEVBQTJCQSxDQUEzQixDQVBBLENBbUJBO0FBQ0E7O0FBQ0EsWUFBbUM7QUFDakMsUUFBSU8sZ0JBQWdCLEdBQXBCO0FBQ0EsUUFBSUMsa0JBQWtCLEdBQXRCLEVBRmlDLENBSWpDOztBQUNBLFVBQU1DLGVBQWUsR0FBRyxNQUFNO0FBQzVCLFVBQUlDLFFBQVEsR0FBWjs7QUFFQSxXQUFLLElBQUk1akIsQ0FBQyxHQUFWLEdBQWdCQSxDQUFDLEdBQWpCLG9CQUF3Q0EsQ0FBeEMsSUFBNkM7QUFDM0M0akIsZ0JBQVEsSUFBSTNqQixNQUFNLENBQU5BLGFBQVoyakIsZ0JBQVkzakIsQ0FBWjJqQjtBQUNBSCx3QkFBZ0I7O0FBRWhCLFlBQUlBLGdCQUFnQixHQUFwQixLQUE0QjtBQUMxQkMsNEJBQWtCO0FBQ2xCRCwwQkFBZ0IsR0FBaEJBO0FBRUg7QUFDRDs7QUFBQTtBQVpGOztBQWVBLFVBQU1JLFNBQXNDLEdBQTVDO0FBRUEsUUFBSUMsdUJBQXVCLEdBQUdaLFFBQVEsQ0FBUkEsSUFDdEI5TCxPQUFELElBQWE7QUFDaEIsVUFBSUEsT0FBTyxDQUFQQSxtQkFBMkJBLE9BQU8sQ0FBUEEsU0FBL0IsR0FBK0JBLENBQS9CLEVBQXNEO0FBQ3BELGNBQU07QUFBQTtBQUFBO0FBQUE7QUFBQSxZQUE0QmtNLGNBQWMsQ0FBQ2xNLE9BQU8sQ0FBUEEsU0FBaUIsQ0FBbEUsQ0FBaURBLENBQUQsQ0FBaEQsQ0FEb0QsQ0FFcEQ7QUFDQTs7QUFDQSxZQUFJMk0sVUFBVSxHQUFHNWUsR0FBRyxDQUFIQSxlQUFqQixFQUFpQkEsQ0FBakI7QUFDQSxZQUFJNmUsVUFBVSxHQUFkLE1BTG9ELENBT3BEO0FBQ0E7O0FBQ0EsWUFBSUQsVUFBVSxDQUFWQSxnQkFBMkJBLFVBQVUsQ0FBVkEsU0FBL0IsSUFBdUQ7QUFDckRDLG9CQUFVLEdBQVZBO0FBRUY7O0FBQUEsWUFBSSxDQUFDdEMsS0FBSyxDQUFDemIsUUFBUSxDQUFDOGQsVUFBVSxDQUFWQSxVQUFwQixDQUFvQkEsQ0FBRCxDQUFULENBQVYsRUFBK0M7QUFDN0NDLG9CQUFVLEdBQVZBO0FBR0Y7O0FBQUEsd0JBQWdCO0FBQ2RELG9CQUFVLEdBQUdKLGVBQWJJO0FBR0ZGOztBQUFBQSxpQkFBUyxDQUFUQSxVQUFTLENBQVRBO0FBQ0EsZUFBTzNNLE1BQU0sR0FDVEMsUUFBUSxHQUNMLFVBQVM0TSxVQURKLFlBRUwsT0FBTUEsVUFIQSxVQUlSLE9BQU1BLFVBSlg7QUFyQkYsYUEwQk87QUFDTCxlQUFRLElBQUdQLFdBQVcsU0FBdEI7QUFFSDtBQS9CMkJOLFlBQTlCLEVBQThCQSxDQUE5QjtBQWtDQSxXQUFPO0FBQ0xSLFFBQUUsRUFBRSxXQUFZLElBQUdXLGtCQURkLFNBQ0QsQ0FEQztBQUFBO0FBQUE7QUFJTFksZ0JBQVUsRUFBRyxJQUFHSCx1QkFKbEI7QUFBTyxLQUFQO0FBUUY7O0FBQUEsU0FBTztBQUNMcEIsTUFBRSxFQUFFLFdBQVksSUFBR1csa0JBRGQsU0FDRCxDQURDO0FBQVA7QUFBTyxHQUFQO0FBSUQsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcEhEO0FBeVJBO0FBQ0E7QUFDQTs7O0FBQ08sc0JBRUY7QUFDSCxNQUFJYSxJQUFJLEdBQVI7QUFDQTtBQUVBLFNBQVEsQ0FBQyxHQUFELFNBQW9CO0FBQzFCLFFBQUksQ0FBSixNQUFXO0FBQ1RBLFVBQUksR0FBSkE7QUFDQTVNLFlBQU0sR0FBRzlFLEVBQUUsQ0FBQyxHQUFaOEUsSUFBVyxDQUFYQTtBQUVGOztBQUFBO0FBTEY7QUFTSzs7QUFBQSw2QkFBNkI7QUFDbEMsUUFBTTtBQUFBO0FBQUE7QUFBQTtBQUFBLE1BQStCaEgsTUFBTSxDQUEzQztBQUNBLFNBQVEsR0FBRTBPLFFBQVMsS0FBSUcsUUFBUyxHQUFFZ0YsSUFBSSxHQUFHLE1BQUgsT0FBZ0IsRUFBdEQ7QUFHSzs7QUFBQSxrQkFBa0I7QUFDdkIsUUFBTTtBQUFBO0FBQUEsTUFBVzdULE1BQU0sQ0FBdkI7QUFDQSxRQUFNNkgsTUFBTSxHQUFHaU0saUJBQWY7QUFDQSxTQUFPblksSUFBSSxDQUFKQSxVQUFla00sTUFBTSxDQUE1QixNQUFPbE0sQ0FBUDtBQUdLOztBQUFBLG1DQUF3RDtBQUM3RCxTQUFPLDRDQUVIOE8sU0FBUyxDQUFUQSxlQUF5QkEsU0FBUyxDQUFsQ0EsUUFGSjtBQUtLOztBQUFBLHdCQUF3QztBQUM3QyxTQUFPdEssR0FBRyxDQUFIQSxZQUFnQkEsR0FBRyxDQUExQjtBQUdLOztBQUFBLDZDQUlrRDtBQUN2RCxZQUEyQztBQUFBOztBQUN6QywwQkFBSTRULEdBQUcsQ0FBUCxzQkFBSUEsZUFBSixpQkFBb0M7QUFDbEMsWUFBTXJRLE9BQU8sR0FBSSxJQUFHc1EsY0FBYyxLQUFsQztBQUdBLFlBQU0sVUFBTixPQUFNLENBQU47QUFFSDtBQUNELEdBVHVELENBU3ZEOzs7QUFDQSxRQUFNN1QsR0FBRyxHQUFHbU8sR0FBRyxDQUFIQSxPQUFZQSxHQUFHLENBQUhBLE9BQVdBLEdBQUcsQ0FBSEEsSUFBbkM7O0FBRUEsTUFBSSxDQUFDeUYsR0FBRyxDQUFSLGlCQUEwQjtBQUN4QixRQUFJekYsR0FBRyxDQUFIQSxPQUFXQSxHQUFHLENBQWxCLFdBQThCO0FBQzVCO0FBQ0EsYUFBTztBQUNMMkYsaUJBQVMsRUFBRSxNQUFNQyxtQkFBbUIsQ0FBQzVGLEdBQUcsQ0FBSixXQUFnQkEsR0FBRyxDQUR6RCxHQUNzQztBQUQvQixPQUFQO0FBSUY7O0FBQUE7QUFHRjs7QUFBQSxRQUFNN1IsS0FBSyxHQUFHLE1BQU1zWCxHQUFHLENBQUhBLGdCQUFwQixHQUFvQkEsQ0FBcEI7O0FBRUEsTUFBSTVULEdBQUcsSUFBSWdVLFNBQVMsQ0FBcEIsR0FBb0IsQ0FBcEIsRUFBMkI7QUFDekI7QUFHRjs7QUFBQSxNQUFJLENBQUosT0FBWTtBQUNWLFVBQU16USxPQUFPLEdBQUksSUFBR3NRLGNBQWMsS0FFaEMsK0RBQThEdlgsS0FGaEU7QUFHQSxVQUFNLFVBQU4sT0FBTSxDQUFOO0FBR0Y7O0FBQUEsWUFBMkM7QUFDekMsUUFBSTlILE1BQU0sQ0FBTkEsNEJBQW1DLENBQUMyWixHQUFHLENBQTNDLEtBQWlEO0FBQy9DeGIsYUFBTyxDQUFQQSxLQUNHLEdBQUVraEIsY0FBYyxLQURuQmxoQjtBQU1IO0FBRUQ7O0FBQUE7QUFHSzs7QUFBQSxNQUFNc2hCLGFBQWEsR0FBRyx3R0FBdEIsU0FBc0IsQ0FBdEI7OztBQWVBLG1DQUFzRDtBQUMzRCxZQUE0QztBQUMxQyxRQUFJcE8sR0FBRyxLQUFIQSxRQUFnQixlQUFwQixVQUE2QztBQUMzQ3JSLFlBQU0sQ0FBTkEsa0JBQTBCRSxHQUFELElBQVM7QUFDaEMsWUFBSXVmLGFBQWEsQ0FBYkEsaUJBQStCLENBQW5DLEdBQXVDO0FBQ3JDdGhCLGlCQUFPLENBQVBBLEtBQ0cscURBQW9EK0IsR0FEdkQvQjtBQUlIO0FBTkQ2QjtBQVFIO0FBRUQ7O0FBQUEsU0FBTywwQkFBUCxHQUFPLENBQVA7QUFHSzs7QUFBQSxNQUFNMGYsRUFBRSxHQUFHLHVCQUFYOztBQUNBLE1BQU1wSixFQUFFLEdBQ2JvSixFQUFFLElBQ0YsT0FBT25KLFdBQVcsQ0FBbEIsU0FEQW1KLGNBRUEsT0FBT25KLFdBQVcsQ0FBbEIsWUFISzs7Ozs7Ozs7Ozs7OztBQ3haTSx3QkFBd0IsMENBQTBDLGdEQUFnRCxnQ0FBZ0MsZ0NBQWdDLG1DQUFtQyw0QkFBNEIsK0JBQStCLG9CQUFvQix5QkFBeUIsVUFBVTtBQUNwVixpRDs7Ozs7Ozs7Ozs7QUNEQSxpQkFBaUIsbUJBQU8sQ0FBQyxtRUFBb0I7Ozs7Ozs7Ozs7OztBQ0E3QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHdDOzs7Ozs7Ozs7OztBQ05BLGNBQWMsbUJBQU8sQ0FBQyx3R0FBK0I7O0FBRXJEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLHlDOzs7Ozs7Ozs7OztBQ3REQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEseUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE1BQU1vSixRQUFRLEdBQUcsQ0FBQztBQUFFdmI7QUFBRixDQUFELEtBQWtCO0FBQ2pDLFFBQU07QUFBRUwsWUFBRjtBQUFZQztBQUFaLE1BQXdCTyx3RUFBTyxFQUFyQztBQUNBLFFBQU1xQyxNQUFNLEdBQUdnWiw2REFBUyxFQUF4QixDQUZpQyxDQUlqQzs7QUFDQTFlLHlEQUFTLENBQUMsTUFBTTtBQUNkL0MsV0FBTyxDQUFDMGhCLEdBQVIsQ0FBWSw2QkFBWjtBQUNBMWhCLFdBQU8sQ0FBQzBoQixHQUFSLENBQVksVUFBWixFQUF3QjdiLE9BQXhCO0FBQ0E3RixXQUFPLENBQUMwaEIsR0FBUixDQUFZLFdBQVosRUFBeUI5YixRQUF6QjtBQUNBNUYsV0FBTyxDQUFDMGhCLEdBQVIsQ0FBWSxnQkFBWixFQUE4QmpaLE1BQU0sQ0FBQ3lOLE1BQXJDOztBQUVBLFFBQUksQ0FBQ3JRLE9BQUQsSUFBWUQsUUFBUSxLQUFLLElBQTdCLEVBQW1DO0FBQ2pDNUYsYUFBTyxDQUFDMGhCLEdBQVIsQ0FBWSwrQ0FBWixFQURpQyxDQUVqQzs7QUFDQSxZQUFNQyxLQUFLLEdBQUcxVixVQUFVLENBQUMsTUFBTTtBQUM3QmpNLGVBQU8sQ0FBQzBoQixHQUFSLENBQVksMEJBQVo7QUFDQWpaLGNBQU0sQ0FBQ3NQLElBQVAsQ0FBYSxjQUFhOUQsa0JBQWtCLENBQUN4TCxNQUFNLENBQUN5TixNQUFSLENBQWdCLEVBQTVEO0FBQ0QsT0FIdUIsRUFHckIsR0FIcUIsQ0FBeEI7QUFJQSxhQUFPLE1BQU0zSixZQUFZLENBQUNvVixLQUFELENBQXpCO0FBQ0Q7QUFDRixHQWZRLEVBZU4sQ0FBQy9iLFFBQUQsRUFBV0MsT0FBWCxFQUFvQjRDLE1BQXBCLENBZk0sQ0FBVDs7QUFpQkEsTUFBSTVDLE9BQUosRUFBYTtBQUNYLFdBQ0UsTUFBQyx5REFBRDtBQUNFLGVBQVMsRUFBQyxrREFEWjtBQUVFLFdBQUssRUFBRTtBQUFFK2IsaUJBQVMsRUFBRTtBQUFiLE9BRlQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQUlFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsb0JBSkYsQ0FERjtBQVFEOztBQUVELFNBQU8sbUVBQUdoYyxRQUFRLElBQUlLLFFBQWYsQ0FBUDtBQUNELENBbENEOztBQW9DZXViLHVFQUFmLEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3pDQTtBQUNBO0FBV0E7QUFDQTtBQUNBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtDQUdBOztBQUNBLE1BQU1LLGVBQWUsR0FBRyxVQUF4QjtBQUNBLE1BQU1DLGdCQUFnQixHQUFHLFVBQXpCO0FBQ0EsTUFBTUMsb0JBQW9CLEdBQUcsVUFBN0I7QUFDQSxNQUFNQyxpQkFBaUIsR0FBRyxFQUExQixDLENBR0E7O0FBQ0EsU0FBU0Msc0JBQVQsR0FBa0M7QUFDaEMsU0FBTyxJQUFJeFYsT0FBSixDQUFhRSxPQUFELElBQWFWLFVBQVUsQ0FBQ1UsT0FBRCxFQUFVLElBQVYsQ0FBbkMsQ0FBUDtBQUNELEMsQ0FFRDs7O0FBQ0EsU0FBU3VWLGFBQVQsQ0FBdUI7QUFBRUMsTUFBRjtBQUFRaFEsTUFBUjtBQUFjN0QsT0FBZDtBQUFxQjhUO0FBQXJCLENBQXZCLEVBQXlEO0FBQ3ZELFFBQU07QUFBQSxPQUFDQyxTQUFEO0FBQUEsT0FBWS9hO0FBQVosTUFBMEI5SixzREFBUSxDQUFDLEtBQUQsQ0FBeEM7QUFFQXVGLHlEQUFTLENBQUMsTUFBTTtBQUNkLFFBQUlzZixTQUFKLEVBQWU7QUFDYixVQUFJelUsU0FBUyxHQUFHLEtBQWhCO0FBQ0FxVSw0QkFBc0IsR0FBR2hhLElBQXpCLENBQThCLE1BQU07QUFDbEMsWUFBSSxDQUFDMkYsU0FBTCxFQUFnQnRHLFVBQVUsQ0FBQyxLQUFELENBQVY7QUFDakIsT0FGRDtBQUdBLGFBQU8sTUFBTTtBQUNYc0csaUJBQVMsR0FBRyxJQUFaO0FBQ0QsT0FGRDtBQUdEO0FBQ0YsR0FWUSxFQVVOLENBQUN5VSxTQUFELENBVk0sQ0FBVDtBQVlBLFNBQ0UsTUFBQyxnREFBRDtBQUFNLFFBQUksRUFBRyxJQUFHL1QsS0FBTSxFQUF0QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0U7QUFDRSxhQUFTLEVBQUcsV0FBVTZULElBQUssSUFBR0MsU0FBUyxJQUFJLEVBQUcsRUFEaEQ7QUFFRSxZQUFRLEVBQUVDLFNBRlo7QUFHRSxXQUFPLEVBQUUsTUFBTSxDQUFDQSxTQUFELElBQWMvYSxVQUFVLENBQUMsSUFBRCxDQUh6QztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBS0crYSxTQUFTLEdBQUcsWUFBSCxHQUFrQmxRLElBTDlCLENBREYsQ0FERjtBQVdELEMsQ0FFRDtBQUVBOzs7QUFDQSxTQUFTbVEsTUFBVCxDQUFnQnZWLEtBQWhCLEVBQXVCO0FBQ3JCLE1BQUksQ0FBQ0EsS0FBTCxFQUFZLE9BQU8sSUFBUCxDQURTLENBR3JCOztBQUNBLE1BQUksT0FBT0EsS0FBUCxLQUFpQixRQUFqQixJQUE2QkEsS0FBSyxLQUFLLElBQXZDLElBQStDQSxLQUFLLENBQUN3VixPQUFOLElBQWlCLElBQXBFLEVBQTBFO0FBQ3hFLFFBQUk7QUFBRSxhQUFPeFYsS0FBSyxDQUFDd1YsT0FBTixHQUFnQixJQUF2QjtBQUE4QixLQUFwQyxDQUFxQyxNQUFNO0FBQUU7QUFBYztBQUM1RCxHQU5vQixDQVFyQjs7O0FBQ0EsTUFBSXhWLEtBQUssWUFBWWYsSUFBckIsRUFBMkI7QUFDekIsVUFBTXdXLENBQUMsR0FBR3pWLEtBQUssQ0FBQzBWLE9BQU4sRUFBVjtBQUNBLFdBQU9uRSxLQUFLLENBQUNrRSxDQUFELENBQUwsR0FBVyxJQUFYLEdBQWtCQSxDQUF6QjtBQUNELEdBWm9CLENBY3JCOzs7QUFDQSxNQUFJLE9BQU96VixLQUFQLEtBQWlCLFFBQXJCLEVBQStCO0FBQzdCO0FBQ0EsVUFBTTJWLEdBQUcsR0FBRzFXLElBQUksQ0FBQzJXLEtBQUwsQ0FBVzVWLEtBQVgsQ0FBWjtBQUNBLFFBQUksQ0FBQ3VSLEtBQUssQ0FBQ29FLEdBQUQsQ0FBVixFQUFpQixPQUFPQSxHQUFQLENBSFksQ0FLN0I7O0FBQ0EsVUFBTUUsS0FBSyxHQUFHN1YsS0FBSyxDQUFDakksS0FBTixDQUFZLEdBQVosQ0FBZDs7QUFDQSxRQUFJOGQsS0FBSyxDQUFDbG1CLE1BQU4sS0FBaUIsQ0FBckIsRUFBd0I7QUFDdEIsWUFBTSxDQUFDbW1CLEVBQUQsRUFBS0MsRUFBTCxFQUFTQyxJQUFULElBQWlCSCxLQUF2QjtBQUNBLFlBQU1JLEdBQUcsR0FBR2hYLElBQUksQ0FBQzJXLEtBQUwsQ0FBWSxHQUFFSSxJQUFLLElBQUdGLEVBQUcsSUFBR0MsRUFBRyxFQUEvQixDQUFaO0FBQ0EsVUFBSSxDQUFDeEUsS0FBSyxDQUFDMEUsR0FBRCxDQUFWLEVBQWlCLE9BQU9BLEdBQVA7QUFDbEI7QUFDRixHQTNCb0IsQ0E2QnJCOzs7QUFDQSxRQUFNUixDQUFDLEdBQUd4VyxJQUFJLENBQUMyVyxLQUFMLENBQVc1VixLQUFYLENBQVY7QUFDQSxTQUFPdVIsS0FBSyxDQUFDa0UsQ0FBRCxDQUFMLEdBQVcsSUFBWCxHQUFrQkEsQ0FBekI7QUFDRCxDLENBRUQ7OztBQUNBLFNBQVNTLEtBQVQsQ0FBZWxXLEtBQWYsRUFBc0I7QUFDcEIsUUFBTXlWLENBQUMsR0FBR0YsTUFBTSxDQUFDdlYsS0FBRCxDQUFoQjtBQUNBLE1BQUl5VixDQUFDLElBQUksSUFBVCxFQUFlLE9BQU8sSUFBUDtBQUNmLFFBQU1VLENBQUMsR0FBRyxJQUFJbFgsSUFBSixDQUFTd1csQ0FBVCxDQUFWO0FBQ0EsUUFBTU8sSUFBSSxHQUFHRyxDQUFDLENBQUNDLFdBQUYsRUFBYjtBQUNBLFFBQU1OLEVBQUUsR0FBR2htQixNQUFNLENBQUNxbUIsQ0FBQyxDQUFDRSxRQUFGLEtBQWUsQ0FBaEIsQ0FBTixDQUF5QkMsUUFBekIsQ0FBa0MsQ0FBbEMsRUFBcUMsR0FBckMsQ0FBWDtBQUNBLFFBQU1QLEVBQUUsR0FBR2ptQixNQUFNLENBQUNxbUIsQ0FBQyxDQUFDSSxPQUFGLEVBQUQsQ0FBTixDQUFvQkQsUUFBcEIsQ0FBNkIsQ0FBN0IsRUFBZ0MsR0FBaEMsQ0FBWDtBQUNBLFNBQVEsR0FBRU4sSUFBSyxJQUFHRixFQUFHLElBQUdDLEVBQUcsRUFBM0I7QUFDRDs7QUFFRCxTQUFTUyxhQUFULENBQXVCeFcsS0FBdkIsRUFBOEI7QUFDNUIsTUFBSUEsS0FBSyxJQUFJLElBQWIsRUFBbUIsT0FBTyxFQUFQO0FBQ25CLFNBQU9sUSxNQUFNLENBQUNrUSxLQUFELENBQU4sQ0FBY3lXLFdBQWQsR0FBNEJ4aUIsSUFBNUIsRUFBUDtBQUNEOztBQUVELFNBQVN5aUIsZUFBVCxDQUF5QmxGLElBQXpCLEVBQStCeGMsR0FBL0IsRUFBb0M7QUFBQTs7QUFDbEMsTUFBSSxDQUFDd2MsSUFBTCxFQUFXLE9BQU8sSUFBUDtBQUNYLFFBQU1tRixLQUFLLEdBQUczaEIsR0FBRyxDQUFDeWhCLFdBQUosRUFBZDtBQUNBLGdHQUNFakYsSUFERixhQUNFQSxJQURGLDRDQUNFQSxJQUFJLENBQUVvRixXQURSLHNEQUNFLGtCQUFvQjVoQixHQUFwQixDQURGLHlFQUVFd2MsSUFGRixhQUVFQSxJQUZGLDZDQUVFQSxJQUFJLENBQUVvRixXQUZSLHVEQUVFLG1CQUFvQkQsS0FBcEIsQ0FGRix5Q0FHRW5GLElBSEYsYUFHRUEsSUFIRixnREFHRUEsSUFBSSxDQUFFcUYsa0JBSFIsMERBR0Usc0JBQTJCN2hCLEdBQTNCLENBSEYseUNBSUV3YyxJQUpGLGFBSUVBLElBSkYsaURBSUVBLElBQUksQ0FBRXFGLGtCQUpSLDJEQUlFLHVCQUEyQkYsS0FBM0IsQ0FKRix5Q0FLRW5GLElBTEYsYUFLRUEsSUFMRiwrQ0FLRUEsSUFBSSxDQUFFc0YsY0FMUix5REFLRSxxQkFBdUI5aEIsR0FBdkIsQ0FMRix5Q0FNRXdjLElBTkYsYUFNRUEsSUFORixnREFNRUEsSUFBSSxDQUFFc0YsY0FOUiwwREFNRSxzQkFBdUJILEtBQXZCLENBTkYseUNBT0VuRixJQVBGLGFBT0VBLElBUEYsMkNBT0VBLElBQUksQ0FBRXVGLFVBUFIscURBT0UsaUJBQW1CL2hCLEdBQW5CLENBUEYseUNBUUV3YyxJQVJGLGFBUUVBLElBUkYsNENBUUVBLElBQUksQ0FBRXVGLFVBUlIsc0RBUUUsa0JBQW1CSixLQUFuQixDQVJGLHVDQVNFLElBVEY7QUFXRDs7QUFHYyxTQUFTSyxVQUFULEdBQXNCO0FBQ25DLFFBQU07QUFBRWhlO0FBQUYsTUFBY0ssd0VBQU8sRUFBM0I7QUFDQSxRQUFNO0FBQUEsT0FBQzRkLElBQUQ7QUFBQSxPQUFPQztBQUFQLE1BQWtCem1CLHNEQUFRLENBQUMsRUFBRCxDQUFoQztBQUNBLFFBQU07QUFBQSxPQUFDMG1CLFVBQUQ7QUFBQSxPQUFhQztBQUFiLE1BQThCM21CLHNEQUFRLENBQUMsRUFBRCxDQUE1QztBQUNBLFFBQU07QUFBQSxPQUFDNG1CLGFBQUQ7QUFBQSxPQUFnQkM7QUFBaEIsTUFBb0M3bUIsc0RBQVEsQ0FBQyxFQUFELENBQWxELENBSm1DLENBSXFCOztBQUN4RCxRQUFNO0FBQUEsT0FBQzZrQixTQUFEO0FBQUEsT0FBWWlDO0FBQVosTUFBNEI5bUIsc0RBQVEsQ0FBQyxJQUFELENBQTFDO0FBQ0EsUUFBTTtBQUFBLE9BQUMrbUIsR0FBRDtBQUFBLE9BQU1DO0FBQU4sTUFBZWhuQixzREFBUSxDQUFDLEVBQUQsQ0FBN0I7QUFDQSxRQUFNO0FBQUEsT0FBQ1AsSUFBRDtBQUFBLE9BQU93bkI7QUFBUCxNQUFrQmpuQixzREFBUSxDQUFDLEtBQUQsQ0FBaEM7QUFDQSxRQUFNO0FBQUEsT0FBQ2tuQixXQUFEO0FBQUEsT0FBY0M7QUFBZCxNQUFnQ25uQixzREFBUSxDQUFDLEtBQUQsQ0FBOUM7QUFDQSxRQUFNO0FBQUEsT0FBQ29uQixRQUFEO0FBQUEsT0FBV0M7QUFBWCxNQUEwQnJuQixzREFBUSxDQUFDd2tCLGlCQUFELENBQXhDO0FBQ0EsUUFBTTtBQUFBLE9BQUM4QyxZQUFEO0FBQUEsT0FBZUM7QUFBZixNQUFrQ3ZuQixzREFBUSxDQUFDLEtBQUQsQ0FBaEQ7QUFDQSxRQUFNO0FBQUEsT0FBQ3duQixLQUFEO0FBQUEsT0FBUUM7QUFBUixNQUFvQnpuQixzREFBUSxFQUFsQztBQUNBLFFBQU07QUFBQSxPQUFDMG5CLE1BQUQ7QUFBQSxPQUFTQztBQUFULE1BQXNCM25CLHNEQUFRLENBQUMsTUFBRCxDQUFwQztBQUNBLFFBQU07QUFBQSxPQUFDNG5CLFFBQUQ7QUFBQSxPQUFXQztBQUFYLE1BQTBCN25CLHNEQUFRLENBQUMsS0FBRCxDQUF4QztBQUNBLFFBQU07QUFBQSxPQUFDOG5CLGNBQUQ7QUFBQSxPQUFpQkM7QUFBakIsTUFBc0MvbkIsc0RBQVEsQ0FBQyxNQUFELENBQXBEO0FBQ0EsUUFBTTtBQUFBLE9BQUN5ZSxNQUFEO0FBQUEsT0FBU3VKO0FBQVQsTUFBc0Job0Isc0RBQVEsQ0FBQyxFQUFELENBQXBDO0FBQ0EsUUFBTTtBQUFBLE9BQUNpb0IsV0FBRDtBQUFBLE9BQWNDO0FBQWQsTUFBZ0Nsb0Isc0RBQVEsQ0FBQyxJQUFELENBQTlDO0FBQ0EsUUFBTTtBQUFBLE9BQUNtb0IsZ0JBQUQ7QUFBQSxPQUFtQkM7QUFBbkIsTUFBMENwb0Isc0RBQVEsQ0FBQyxJQUFELENBQXhELENBakJtQyxDQWtCbkM7O0FBQ0EsUUFBTTtBQUFBLE9BQUNxb0Isa0JBQUQ7QUFBQSxPQUFxQkM7QUFBckIsTUFBOEN0b0Isc0RBQVEsQ0FBQyxJQUFELENBQTVEO0FBQ0EsUUFBTTtBQUFBLE9BQUN1b0Isb0JBQUQ7QUFBQSxPQUF1QkM7QUFBdkIsTUFBa0R4b0Isc0RBQVEsQ0FBQyxlQUFELENBQWhFO0FBQ0EsUUFBTTtBQUFBLE9BQUN5b0IscUJBQUQ7QUFBQSxPQUF3QkM7QUFBeEIsTUFBb0Qxb0Isc0RBQVEsQ0FBQyxJQUFELENBQWxFO0FBQ0EsUUFBTTtBQUFBLE9BQUMyb0IsdUJBQUQ7QUFBQSxPQUEwQkM7QUFBMUIsTUFBd0Q1b0Isc0RBQVEsQ0FBQyxlQUFELENBQXRFO0FBRUEsUUFBTTtBQUFBLE9BQUM2b0IsT0FBRDtBQUFBLE9BQVVDO0FBQVYsTUFBd0I5b0Isc0RBQVEsQ0FBQyxFQUFELENBQXRDO0FBQ0EsUUFBTTtBQUFBLE9BQUMrb0IsZUFBRDtBQUFBLE9BQWtCQztBQUFsQixNQUF3Q2hwQixzREFBUSxDQUFDLEtBQUQsQ0FBdEQsQ0F6Qm1DLENBMEJuQzs7QUFDQSxRQUFNO0FBQUEsT0FBQ2lwQixtQkFBRDtBQUFBLE9BQXNCQztBQUF0QixNQUFnRGxwQixzREFBUSxDQUFDLElBQUQsQ0FBOUQ7QUFDQSxRQUFNO0FBQUEsT0FBQ21wQixPQUFEO0FBQUEsT0FBVUM7QUFBVixNQUF3QnBwQixzREFBUSxDQUFDLEtBQUQsQ0FBdEM7QUFFQSxRQUFNaUwsTUFBTSxHQUFHZ1osNkRBQVMsRUFBeEI7QUFDQSxRQUFNb0YsU0FBUyxHQUFHLENBQUMsTUFBRCxFQUFTLE1BQVQsRUFBaUIsS0FBakIsRUFBd0IsS0FBeEIsRUFBK0IsS0FBL0IsQ0FBbEI7QUFDQSxRQUFNQyxjQUFjLEdBQUcsQ0FBQyxNQUFELEVBQVMsTUFBVCxFQUFpQixJQUFqQixFQUF1QixJQUF2QixFQUE2QixJQUE3QixDQUF2QjtBQUNBLFFBQU1DLGFBQWEsR0FBRyxDQUFDLEtBQUQsRUFBUSxLQUFSLEVBQWUsS0FBZixFQUFzQixLQUF0QixFQUE2QixLQUE3QixFQUFvQyxLQUFwQyxDQUF0Qjs7QUFFQSxXQUFTQyxZQUFULENBQXNCQyxVQUF0QixFQUFrQ0MsV0FBbEMsRUFBK0NDLE1BQS9DLEVBQXVEO0FBQ3JELFdBQU9GLFVBQVUsQ0FBQzNpQixHQUFYLENBQWUsQ0FBQ3lLLElBQUQsRUFBT25TLENBQVAsS0FBYTtBQUNqQyxVQUFJQSxDQUFDLEtBQUtzcUIsV0FBVixFQUF1QixPQUFPblksSUFBUCxDQURVLENBQ0c7O0FBQ3BDLFlBQU1xWSxLQUFLLEdBQUdELE1BQU0sR0FBRyxJQUFILEdBQVUsSUFBOUI7QUFDQSxhQUFRLEdBQUVwWSxJQUFLLEdBQUVxWSxLQUFNLEVBQXZCO0FBQ0QsS0FKTSxDQUFQO0FBS0Q7O0FBR0QsUUFBTTtBQUFBLE9BQUNDLE1BQUQ7QUFBQSxPQUFTQztBQUFULE1BQXNCOXBCLHNEQUFRLENBQUNxcEIsU0FBRCxDQUFwQztBQUNBLFFBQU07QUFBQSxPQUFDVSxTQUFEO0FBQUEsT0FBWUM7QUFBWixNQUE0QmhxQixzREFBUSxDQUFDdXBCLGFBQUQsQ0FBMUM7QUFDQSxRQUFNO0FBQUEsT0FBQ1UsVUFBRDtBQUFBLE9BQWFDO0FBQWIsTUFBOEJscUIsc0RBQVEsQ0FBQyxJQUFELENBQTVDO0FBQ0EsUUFBTTtBQUFBLE9BQUNtcUIsYUFBRDtBQUFBLE9BQWdCQztBQUFoQixNQUFvQ3BxQixzREFBUSxDQUFDLElBQUQsQ0FBbEQ7QUFDQSxRQUFNO0FBQUEsT0FBQ3FxQixJQUFEO0FBQUEsT0FBT0M7QUFBUCxNQUFrQnRxQixzREFBUSxDQUFDLElBQUQsQ0FBaEM7QUFDQSxRQUFNO0FBQUEsT0FBQ3VxQixJQUFEO0FBQUEsT0FBT0M7QUFBUCxNQUFrQnhxQixzREFBUSxDQUFDLElBQUQsQ0FBaEM7QUFDQSxRQUFNO0FBQUEsT0FBQ3lxQixVQUFEO0FBQUEsT0FBYUM7QUFBYixNQUE4QjFxQixzREFBUSxDQUFDLEtBQUQsQ0FBNUM7QUFDQSxRQUFNO0FBQUEsT0FBQ2lZLElBQUQ7QUFBQSxPQUFPMFM7QUFBUCxNQUFrQjNxQixzREFBUSxDQUFDLENBQUQsQ0FBaEM7QUFDQSxRQUFNO0FBQUEsT0FBQzRxQixXQUFEO0FBQUEsT0FBY0M7QUFBZCxNQUFnQzdxQixzREFBUSxDQUFDLEVBQUQsQ0FBOUM7QUFDQSxRQUFNO0FBQUEsT0FBQzhxQixXQUFEO0FBQUEsT0FBY0M7QUFBZCxNQUFnQy9xQixzREFBUSxDQUFDLEtBQUQsQ0FBOUM7QUFDQSxRQUFNZ3JCLFFBQVEsR0FBR3RwQixvREFBTSxDQUFDLENBQUQsQ0FBdkI7QUFDQSxRQUFNdXBCLGdCQUFnQixHQUFHdnBCLG9EQUFNLENBQUMsS0FBRCxDQUEvQjtBQUNBLFFBQU07QUFBQSxPQUFDd3BCLFVBQUQ7QUFBQSxPQUFhQztBQUFiLE1BQThCbnJCLHNEQUFRLENBQUMsQ0FBRCxDQUE1QztBQUNBLFFBQU07QUFBQSxPQUFDb3JCLFNBQUQ7QUFBQSxPQUFZQztBQUFaLE1BQTRCcnJCLHNEQUFRLENBQUMsSUFBRCxDQUExQztBQUNBLFFBQU1zckIsWUFBWSxHQUFHNXBCLG9EQUFNLENBQUMsSUFBRCxDQUEzQjtBQUNBLFFBQU02cEIsWUFBWSxHQUFHN3BCLG9EQUFNLENBQUMsRUFBRCxDQUEzQjtBQUNBLFFBQU04cEIsZUFBZSxHQUFHOXBCLG9EQUFNLENBQUMsRUFBRCxDQUE5QjtBQUVBLFFBQU0rcEIsZUFBZSxHQUFHLEtBQXhCOztBQUNBLFFBQU1DLE9BQU8sR0FBRyxNQUFNdEMsVUFBVSxDQUFDLElBQUQsQ0FBaEM7O0FBRUEsUUFBTXVDLGFBQWEsR0FBRy9wQix5REFBVyxDQUMvQixDQUFDQyxTQUFTLEdBQUcsRUFBYixLQUFvQjtBQUNsQixVQUFNc1UsTUFBTSxHQUFHLElBQUl5VixlQUFKLEVBQWY7QUFDQSxVQUFNO0FBQ0psbUIsWUFESTtBQUVKQyxtQkFGSTtBQUdKQyxtQkFISTtBQUlKakMsWUFKSTtBQUtKQztBQUxJLFFBTUYvQixTQU5KO0FBUUEsUUFBSTZELE1BQUosRUFBWXlRLE1BQU0sQ0FBQzJHLEdBQVAsQ0FBVyxRQUFYLEVBQXFCcFgsTUFBckI7QUFDWixRQUFJQyxhQUFKLEVBQW1Cd1EsTUFBTSxDQUFDMkcsR0FBUCxDQUFXLGVBQVgsRUFBNEJuWCxhQUE1QjtBQUNuQixRQUFJQyxhQUFKLEVBQW1CdVEsTUFBTSxDQUFDMkcsR0FBUCxDQUFXLGVBQVgsRUFBNEJsWCxhQUE1QjtBQUNuQixRQUFJakMsTUFBSixFQUFZd1MsTUFBTSxDQUFDMkcsR0FBUCxDQUFXLFFBQVgsRUFBcUJuWixNQUFyQjtBQUNaLFFBQUlDLEdBQUosRUFBU3VTLE1BQU0sQ0FBQzJHLEdBQVAsQ0FBVyxLQUFYLEVBQWtCbFosR0FBbEI7QUFFVCxVQUFNZ1QsS0FBSyxHQUFHVCxNQUFNLENBQUMwVixRQUFQLEVBQWQ7QUFDQTVnQixVQUFNLENBQUNzUCxJQUFQLENBQ0csdUNBQXNDM0QsS0FBSyxHQUFJLElBQUdBLEtBQU0sRUFBYixHQUFpQixFQUFHLEVBRGxFO0FBR0F3UyxjQUFVLENBQUMsS0FBRCxDQUFWO0FBQ0QsR0F0QjhCLEVBdUIvQixDQUFDbmUsTUFBRCxDQXZCK0IsQ0FBakM7QUEwQkEsUUFBTTZnQixzQkFBc0IsR0FBR2xxQix5REFBVyxDQUFDLE9BQU9tcUIsTUFBTSxHQUFHLEVBQWhCLEtBQXVCO0FBQ2hFLFFBQUlkLGdCQUFnQixDQUFDeGxCLE9BQXJCLEVBQThCOztBQUM5QixlQUFtQyxFQUtsQzs7QUFFRHdsQixvQkFBZ0IsQ0FBQ3hsQixPQUFqQixHQUEyQixJQUEzQjtBQUNBLFVBQU11bUIsRUFBRSxHQUFHaHFCLDBEQUFRLENBQUNDLFNBQVQsRUFBWDtBQUNBLFFBQUlncUIsT0FBTyxHQUFHLElBQWQ7O0FBRUEsVUFBTUMsV0FBVyxHQUFHLENBQUN6bkIsQ0FBRCxFQUFJQyxDQUFKLEtBQVU7QUFDNUIsVUFBSUQsQ0FBQyxDQUFDdkYsTUFBRixLQUFhd0YsQ0FBQyxDQUFDeEYsTUFBbkIsRUFBMkIsT0FBTyxLQUFQO0FBQzNCLFlBQU1pdEIsSUFBSSxHQUFHLElBQUlsb0IsR0FBSixDQUFRUSxDQUFSLENBQWI7QUFDQSxZQUFNMm5CLElBQUksR0FBRyxJQUFJbm9CLEdBQUosQ0FBUVMsQ0FBUixDQUFiO0FBQ0EsVUFBSXluQixJQUFJLENBQUNFLElBQUwsS0FBY0QsSUFBSSxDQUFDQyxJQUF2QixFQUE2QixPQUFPLEtBQVA7O0FBQzdCLFdBQUssTUFBTXJiLENBQVgsSUFBZ0JtYixJQUFoQixFQUFzQixJQUFJLENBQUNDLElBQUksQ0FBQ3pNLEdBQUwsQ0FBUzNPLENBQVQsQ0FBTCxFQUFrQixPQUFPLEtBQVA7O0FBQ3hDLGFBQU8sSUFBUDtBQUNELEtBUEQ7O0FBU0EsUUFBSTtBQUNGLGFBQU8sSUFBUCxFQUFhO0FBQ1gsWUFBSTRGLEtBQUssR0FBR29WLEVBQUUsQ0FDWDlwQixVQURTLENBQ0UsTUFERixFQUVUb3FCLE9BRlMsQ0FFRHRxQiwwREFBUSxDQUFDQyxTQUFULENBQW1Cc3FCLFNBQW5CLENBQTZCQyxVQUE3QixFQUZDLEVBR1RDLEtBSFMsQ0FHSCxHQUhHLENBQVo7QUFJQSxZQUFJUixPQUFKLEVBQWFyVixLQUFLLEdBQUdBLEtBQUssQ0FBQzhWLFVBQU4sQ0FBaUJULE9BQWpCLENBQVI7QUFFYixjQUFNdHBCLElBQUksR0FBRyxNQUFNaVUsS0FBSyxDQUFDelUsR0FBTixFQUFuQjtBQUNBLFlBQUlRLElBQUksQ0FBQ2dxQixLQUFULEVBQWdCO0FBRWhCLGNBQU1DLEtBQUssR0FBR1osRUFBRSxDQUFDWSxLQUFILEVBQWQ7QUFDQSxZQUFJQyxNQUFNLEdBQUcsQ0FBYjtBQUVBbHFCLFlBQUksQ0FBQ21xQixJQUFMLENBQVUvcEIsT0FBVixDQUFtQmhCLEdBQUQsSUFBUztBQUN6QixnQkFBTUssSUFBSSxHQUFHTCxHQUFHLENBQUNLLElBQUosTUFBYyxFQUEzQjtBQUNBLGdCQUFNdVMsSUFBSSxHQUFHLE9BQU92UyxJQUFJLENBQUN1UyxJQUFaLEtBQXFCLFFBQXJCLEdBQWdDdlMsSUFBSSxDQUFDdVMsSUFBckMsR0FBNEMsRUFBekQ7QUFDQSxnQkFBTW9ZLFNBQVMsR0FBR3BZLElBQUksQ0FBQ3FSLFdBQUwsRUFBbEI7QUFDQSxnQkFBTWdILFVBQVUsR0FBR0MsOEVBQWUsQ0FBQ3RZLElBQUQsQ0FBbEM7QUFDQSxnQkFBTXVZLGNBQWMsR0FBR2x1QixLQUFLLENBQUNtRyxPQUFOLENBQWMvQyxJQUFJLENBQUM0cUIsVUFBbkIsSUFDbkJodUIsS0FBSyxDQUFDQyxJQUFOLENBQVcsSUFBSWdGLEdBQUosQ0FBUTdCLElBQUksQ0FBQzRxQixVQUFMLENBQWdCbG1CLEdBQWhCLENBQXFCa0ssQ0FBRCxJQUFPM1IsTUFBTSxDQUFDMlIsQ0FBRCxDQUFqQyxDQUFSLENBQVgsQ0FEbUIsR0FFbkIsRUFGSjtBQUlBLGdCQUFNbWMsV0FBVyxHQUNmL3FCLElBQUksQ0FBQzJxQixTQUFMLEtBQW1CQSxTQUFuQixJQUNBLENBQUNiLFdBQVcsQ0FBQ2dCLGNBQUQsRUFBaUJGLFVBQWpCLENBRmQ7O0FBSUEsY0FBSUcsV0FBSixFQUFpQjtBQUNmUCxpQkFBSyxDQUFDUSxNQUFOLENBQWFyckIsR0FBRyxDQUFDNkwsR0FBakIsRUFBc0I7QUFBRW1mLHVCQUFGO0FBQWFDO0FBQWIsYUFBdEI7QUFDQUgsa0JBQU0sSUFBSSxDQUFWO0FBQ0Q7QUFDRixTQWpCRDs7QUFtQkEsWUFBSUEsTUFBTSxHQUFHLENBQWIsRUFBZ0I7QUFDZCxnQkFBTUQsS0FBSyxDQUFDUyxNQUFOLEVBQU47QUFDRDs7QUFFRHBCLGVBQU8sR0FBR3RwQixJQUFJLENBQUNtcUIsSUFBTCxDQUFVbnFCLElBQUksQ0FBQ21xQixJQUFMLENBQVU1dEIsTUFBVixHQUFtQixDQUE3QixDQUFWO0FBQ0EsY0FBTSxJQUFJK1AsT0FBSixDQUFhRSxPQUFELElBQWFWLFVBQVUsQ0FBQ1UsT0FBRCxFQUFVLEVBQVYsQ0FBbkMsQ0FBTjtBQUNEOztBQUVELGlCQUFtQyxFQUtsQztBQUNGLEtBL0NELENBK0NFLE9BQU81TSxLQUFQLEVBQWM7QUFDZEMsYUFBTyxDQUFDRCxLQUFSLENBQWMsNkJBQWQsRUFBNkN3cEIsTUFBN0MsRUFBcUR4cEIsS0FBckQ7QUFDRCxLQWpERCxTQWlEVTtBQUNSMG9CLHNCQUFnQixDQUFDeGxCLE9BQWpCLEdBQTJCLEtBQTNCO0FBQ0Q7QUFDRixHQTFFeUMsRUEwRXZDLEVBMUV1QyxDQUExQztBQTRFQSxRQUFNNm5CLFdBQVcsR0FBRyxDQUFDN08sTUFBTSxJQUFJLEVBQVgsRUFBZXVILFdBQWYsR0FBNkJ4aUIsSUFBN0IsRUFBcEI7QUFDQSxRQUFNK3BCLGdCQUFnQixHQUNwQmxtQixPQUFPLENBQUM0Z0IsV0FBRCxDQUFQLElBQ0E1Z0IsT0FBTyxDQUFDOGdCLGdCQUFELENBRFAsSUFFQTlnQixPQUFPLENBQUM4aUIsYUFBRCxDQUZQLElBR0E5aUIsT0FBTyxDQUFDZ2hCLGtCQUFELENBSFAsSUFJQWhoQixPQUFPLENBQUNvaEIscUJBQUQsQ0FKUCxJQUtBcGhCLE9BQU8sQ0FBQ2ltQixXQUFELENBTlQ7O0FBUUEsUUFBTUUsWUFBWSxHQUFHLENBQUNqZSxLQUFELEVBQVFrZSxDQUFSLEtBQWM7QUFDakMsUUFBSSxDQUFDbGUsS0FBTCxFQUFZLE9BQU8sS0FBUDs7QUFDWixRQUFJdlEsS0FBSyxDQUFDbUcsT0FBTixDQUFjb0ssS0FBZCxDQUFKLEVBQTBCO0FBQ3hCLGFBQU9BLEtBQUssQ0FBQ21lLElBQU4sQ0FBWTFjLENBQUQsSUFBT3djLFlBQVksQ0FBQ3hjLENBQUQsRUFBSXljLENBQUosQ0FBOUIsQ0FBUDtBQUNEOztBQUNELFdBQU9wdUIsTUFBTSxDQUFDa1EsS0FBRCxDQUFOLENBQWN5VyxXQUFkLEdBQTRCaGYsUUFBNUIsQ0FBcUN5bUIsQ0FBckMsQ0FBUDtBQUNELEdBTkQ7O0FBUUEsUUFBTUUsY0FBYyxHQUFHL3JCLHlEQUFXLENBQy9CbWYsSUFBRCxJQUFVO0FBQ1I7QUFDQSxRQUFJLENBQUFBLElBQUksU0FBSixJQUFBQSxJQUFJLFdBQUosWUFBQUEsSUFBSSxDQUFFNk0sT0FBTixNQUFrQixLQUF0QixFQUE2QixPQUFPLEtBQVAsQ0FGckIsQ0FJUjs7QUFDQSxVQUFNQyxHQUFHLEdBQUc1SCxlQUFlLENBQUNsRixJQUFELEVBQU8sS0FBUCxDQUEzQjtBQUNBLFVBQU0rTSxRQUFRLEdBQUc3SCxlQUFlLENBQUNsRixJQUFELEVBQU8sVUFBUCxDQUFoQztBQUNBLFVBQU1nTixLQUFLLEdBQUc5SCxlQUFlLENBQUNsRixJQUFELEVBQU8sT0FBUCxDQUE3Qjs7QUFFQSxRQUFJa0gsV0FBVyxJQUFJbEMsYUFBYSxDQUFDOEgsR0FBRCxDQUFiLEtBQXVCOUgsYUFBYSxDQUFDa0MsV0FBRCxDQUF2RCxFQUFzRTtBQUNwRSxhQUFPLEtBQVA7QUFDRDs7QUFDRCxRQUNFRSxnQkFBZ0IsSUFDaEJwQyxhQUFhLENBQUMrSCxRQUFELENBQWIsS0FBNEIvSCxhQUFhLENBQUNvQyxnQkFBRCxDQUYzQyxFQUdFO0FBQ0EsYUFBTyxLQUFQO0FBQ0Q7O0FBQ0QsUUFBSWdDLGFBQWEsSUFBSXBFLGFBQWEsQ0FBQ2dJLEtBQUQsQ0FBYixLQUF5QmhJLGFBQWEsQ0FBQ29FLGFBQUQsQ0FBM0QsRUFBNEU7QUFDMUUsYUFBTyxLQUFQO0FBQ0QsS0FwQk8sQ0FzQlI7OztBQUNBLFFBQUk5QixrQkFBa0IsSUFBSSxDQUFBdEgsSUFBSSxTQUFKLElBQUFBLElBQUksV0FBSixZQUFBQSxJQUFJLENBQUVpTixZQUFOLE1BQXVCM0Ysa0JBQWpELEVBQXFFO0FBQ25FLGFBQU8sS0FBUDtBQUNEOztBQUNELFFBQ0VJLHFCQUFxQixJQUNyQixDQUFBMUgsSUFBSSxTQUFKLElBQUFBLElBQUksV0FBSixZQUFBQSxJQUFJLENBQUVrTixlQUFOLE1BQTBCeEYscUJBRjVCLEVBR0U7QUFDQSxhQUFPLEtBQVA7QUFDRCxLQS9CTyxDQWlDUjs7O0FBQ0EsUUFBSTZFLFdBQUosRUFBaUI7QUFDZixVQUFJNUYsTUFBTSxLQUFLLE1BQWYsRUFBdUI7QUFDckIsZUFBTzhGLFlBQVksQ0FBQ3pNLElBQUQsYUFBQ0EsSUFBRCx1QkFBQ0EsSUFBSSxDQUFFcE0sSUFBUCxFQUFhMlksV0FBYixDQUFuQjtBQUNEOztBQUNELFVBQUk1RixNQUFNLEtBQUssTUFBZixFQUF1QjtBQUNyQixjQUFNd0csU0FBUyxHQUFHWixXQUFsQixDQURxQixDQUNVOztBQUMvQixjQUFNYSxPQUFPLEdBQUcxSSxLQUFLLENBQUMxRSxJQUFELGFBQUNBLElBQUQsdUJBQUNBLElBQUksQ0FBRXFOLElBQVAsQ0FBckI7QUFDQSxZQUFJRCxPQUFPLElBQUlBLE9BQU8sS0FBS0QsU0FBM0IsRUFBc0MsT0FBTyxJQUFQOztBQUN0QyxZQUFJbHZCLEtBQUssQ0FBQ21HLE9BQU4sQ0FBYzRiLElBQWQsYUFBY0EsSUFBZCx1QkFBY0EsSUFBSSxDQUFFc04sWUFBcEIsQ0FBSixFQUF1QztBQUNyQyxjQUFJdE4sSUFBSSxDQUFDc04sWUFBTCxDQUFrQlgsSUFBbEIsQ0FBd0JoSSxDQUFELElBQU9ELEtBQUssQ0FBQ0MsQ0FBRCxhQUFDQSxDQUFELHVCQUFDQSxDQUFDLENBQUUwSSxJQUFKLENBQUwsS0FBbUJGLFNBQWpELENBQUosRUFBaUU7QUFDL0QsbUJBQU8sSUFBUDtBQUNEO0FBQ0Y7O0FBQ0QsWUFBSWx2QixLQUFLLENBQUNtRyxPQUFOLENBQWM0YixJQUFkLGFBQWNBLElBQWQsdUJBQWNBLElBQUksQ0FBRXVOLFVBQXBCLENBQUosRUFBcUM7QUFDbkMsY0FBSXZOLElBQUksQ0FBQ3VOLFVBQUwsQ0FBZ0JaLElBQWhCLENBQXNCYSxDQUFELElBQU85SSxLQUFLLENBQUM4SSxDQUFELGFBQUNBLENBQUQsdUJBQUNBLENBQUMsQ0FBRUgsSUFBSixDQUFMLEtBQW1CRixTQUEvQyxDQUFKLEVBQStEO0FBQzdELG1CQUFPLElBQVA7QUFDRDtBQUNGOztBQUNELGVBQU8sS0FBUDtBQUNEOztBQUNELFVBQUl4RyxNQUFNLEtBQUssWUFBZixFQUE2QjtBQUMzQixlQUNFMW9CLEtBQUssQ0FBQ21HLE9BQU4sQ0FBYzRiLElBQWQsYUFBY0EsSUFBZCx1QkFBY0EsSUFBSSxDQUFFdU4sVUFBcEIsS0FDQXZOLElBQUksQ0FBQ3VOLFVBQUwsQ0FBZ0JaLElBQWhCLENBQXNCYyxFQUFELElBQ25CaEIsWUFBWSxDQUFDZ0IsRUFBRCxhQUFDQSxFQUFELHVCQUFDQSxFQUFFLENBQUVDLFNBQUwsRUFBZ0JuQixXQUFoQixDQURkLENBRkY7QUFNRDs7QUFDRCxVQUFJNUYsTUFBTSxLQUFLLGdCQUFmLEVBQWlDO0FBQy9CLGVBQU84RixZQUFZLENBQUN6TSxJQUFELGFBQUNBLElBQUQsdUJBQUNBLElBQUksQ0FBRTJOLEVBQVAsRUFBV3BCLFdBQVgsQ0FBbkI7QUFDRDs7QUFDRCxVQUFJNUYsTUFBTSxLQUFLLGVBQWYsRUFBZ0M7QUFDOUIsZUFBTzhGLFlBQVksQ0FBQ3pNLElBQUQsYUFBQ0EsSUFBRCx1QkFBQ0EsSUFBSSxDQUFFNE4sRUFBUCxFQUFXckIsV0FBWCxDQUFuQjtBQUNEOztBQUNELFVBQUk1RixNQUFNLEtBQUssYUFBZixFQUE4QjtBQUM1QixZQUFJOEYsWUFBWSxDQUFDek0sSUFBRCxhQUFDQSxJQUFELHVCQUFDQSxJQUFJLENBQUU2TixJQUFQLEVBQWF0QixXQUFiLENBQWhCLEVBQTJDLE9BQU8sSUFBUDtBQUMzQyxZQUFJRSxZQUFZLENBQUN6TSxJQUFELGFBQUNBLElBQUQsdUJBQUNBLElBQUksQ0FBRThOLFdBQVAsRUFBb0J2QixXQUFwQixDQUFoQixFQUFrRCxPQUFPLElBQVA7O0FBQ2xELFlBQUl0dUIsS0FBSyxDQUFDbUcsT0FBTixDQUFjNGIsSUFBZCxhQUFjQSxJQUFkLHVCQUFjQSxJQUFJLENBQUVzTixZQUFwQixDQUFKLEVBQXVDO0FBQ3JDLGlCQUFPdE4sSUFBSSxDQUFDc04sWUFBTCxDQUFrQlgsSUFBbEIsQ0FBd0JoSSxDQUFELElBQzVCOEgsWUFBWSxDQUFDOUgsQ0FBRCxhQUFDQSxDQUFELHVCQUFDQSxDQUFDLENBQUVtSixXQUFKLEVBQWlCdkIsV0FBakIsQ0FEUCxDQUFQO0FBR0Q7O0FBQ0QsZUFBTyxLQUFQO0FBQ0Q7O0FBQ0QsVUFBSTVGLE1BQU0sS0FBSyxLQUFmLEVBQXNCO0FBQ3BCLGVBQ0U4RixZQUFZLENBQUN6TSxJQUFELGFBQUNBLElBQUQsdUJBQUNBLElBQUksQ0FBRTFNLEVBQVAsRUFBV2laLFdBQVgsQ0FBWixJQUNBRSxZQUFZLENBQUN6TSxJQUFELGFBQUNBLElBQUQsdUJBQUNBLElBQUksQ0FBRStOLE9BQVAsRUFBZ0J4QixXQUFoQixDQURaLElBRUFFLFlBQVksQ0FBQ3pNLElBQUQsYUFBQ0EsSUFBRCx1QkFBQ0EsSUFBSSxDQUFFZ08sUUFBUCxFQUFpQnpCLFdBQWpCLENBSGQ7QUFLRDtBQUNGOztBQUVELFdBQU8sSUFBUDtBQUNELEdBekYrQixFQTBGaEMsQ0FDRXJGLFdBREYsRUFFRUUsZ0JBRkYsRUFHRWdDLGFBSEYsRUFJRTlCLGtCQUpGLEVBS0VJLHFCQUxGLEVBTUU2RSxXQU5GLEVBT0U1RixNQVBGLENBMUZnQyxDQUFsQzs7QUFxR0EsUUFBTXNILGVBQWUsR0FBRyxNQUFNO0FBQzVCckUsV0FBTyxDQUFDLENBQUQsQ0FBUDtBQUNBRSxrQkFBYyxDQUFDLEVBQUQsQ0FBZDtBQUNBRSxrQkFBYyxDQUFDLEtBQUQsQ0FBZDtBQUNELEdBSkQsQ0E3Um1DLENBbVNuQzs7O0FBQ0F4bEIseURBQVMsQ0FBQyxNQUFNO0FBQ2R5cEIsbUJBQWU7QUFDZjdELGlCQUFhLENBQUVuYSxDQUFELElBQU9BLENBQUMsR0FBRyxDQUFaLENBQWI7QUFDRCxHQUhRLEVBR04sQ0FBQy9GLE1BQU0sQ0FBQ3lOLE1BQVIsQ0FITSxDQUFULENBcFNtQyxDQXlTbkM7O0FBQ0FuVCx5REFBUyxDQUFDLE1BQU07QUFDZHlwQixtQkFBZTtBQUNmN0QsaUJBQWEsQ0FBRW5hLENBQUQsSUFBT0EsQ0FBQyxHQUFHLENBQVosQ0FBYjtBQUNELEdBSFEsRUFHTixDQUNEaVgsV0FEQyxFQUVERSxnQkFGQyxFQUdEZ0MsYUFIQyxFQUlEOUIsa0JBSkMsRUFLREkscUJBTEMsRUFNRGhLLE1BTkMsRUFPRGlKLE1BUEMsQ0FITSxDQUFULENBMVNtQyxDQXdUbkM7O0FBQ0FuaUIseURBQVMsQ0FBQyxNQUFNO0FBQ2QwcEIsYUFBUyxDQUFDaFgsSUFBRCxDQUFUO0FBQ0QsR0FGUSxFQUVOLENBQUNBLElBQUQsRUFBT2lULFVBQVAsQ0FGTSxDQUFUO0FBSUEzbEIseURBQVMsQ0FBQyxNQUFNO0FBQ2QsUUFBSSxFQUFDMEYsTUFBRCxhQUFDQSxNQUFELGVBQUNBLE1BQU0sQ0FBRWlPLE1BQVQsQ0FBSixFQUFxQjs7QUFDckIsVUFBTWdXLFVBQVUsR0FBRyxNQUFNM0gsZUFBZSxDQUFDLEtBQUQsQ0FBeEM7O0FBQ0F0YyxVQUFNLENBQUNpTyxNQUFQLENBQWNsRSxFQUFkLENBQWlCLHFCQUFqQixFQUF3Q2thLFVBQXhDO0FBQ0Fqa0IsVUFBTSxDQUFDaU8sTUFBUCxDQUFjbEUsRUFBZCxDQUFpQixrQkFBakIsRUFBcUNrYSxVQUFyQztBQUNBLFdBQU8sTUFBTTtBQUNYamtCLFlBQU0sQ0FBQ2lPLE1BQVAsQ0FBY2pFLEdBQWQsQ0FBa0IscUJBQWxCLEVBQXlDaWEsVUFBekM7QUFDQWprQixZQUFNLENBQUNpTyxNQUFQLENBQWNqRSxHQUFkLENBQWtCLGtCQUFsQixFQUFzQ2lhLFVBQXRDO0FBQ0QsS0FIRDtBQUlELEdBVFEsRUFTTixDQUFDamtCLE1BQUQsQ0FUTSxDQUFUOztBQVdBLGlCQUFlZ2tCLFNBQWYsQ0FBeUJFLGFBQWEsR0FBRyxDQUF6QyxFQUE0QztBQUMxQyxVQUFNQyxHQUFHLEdBQUcsRUFBRXBFLFFBQVEsQ0FBQ3ZsQixPQUF2QjtBQUNBLFFBQUk0cEIsUUFBUSxHQUFHLEtBQWY7QUFDQXZJLGdCQUFZLENBQUMsSUFBRCxDQUFaO0FBQ0F1RSxnQkFBWSxDQUFDLElBQUQsQ0FBWjtBQUNBLFVBQU1pRSxTQUFTLEdBQUc3Z0IsVUFBVSxDQUFDLE1BQU07QUFDakM0Z0IsY0FBUSxHQUFHLElBQVg7O0FBQ0EsVUFBSUQsR0FBRyxLQUFLcEUsUUFBUSxDQUFDdmxCLE9BQXJCLEVBQThCO0FBQzVCNGxCLG9CQUFZLENBQUM7QUFDWGtFLGNBQUksRUFBRSxTQURLO0FBRVhuYyxpQkFBTyxFQUFHLGlDQUFnQ3ZFLElBQUksQ0FBQzJnQixLQUFMLENBQ3hDL0QsZUFBZSxHQUFHLElBRHNCLENBRXhDO0FBSlMsU0FBRCxDQUFaO0FBTUEzRSxvQkFBWSxDQUFDLEtBQUQsQ0FBWjtBQUNEO0FBQ0YsS0FYMkIsRUFXekIyRSxlQVh5QixDQUE1Qjs7QUFZQSxRQUFJO0FBQ0YsVUFBSXhnQixNQUFNLENBQUMyTCxLQUFQLENBQWE2WSxTQUFiLElBQTBCeGtCLE1BQU0sQ0FBQzJMLEtBQVAsQ0FBYThZLFlBQTNDLEVBQXlEO0FBQ3ZEL0gsaUJBQVMsQ0FBQzFjLE1BQU0sQ0FBQzJMLEtBQVAsQ0FBYThZLFlBQWQsQ0FBVDtBQUNBMUgsaUJBQVMsQ0FBQy9jLE1BQU0sQ0FBQzJMLEtBQVAsQ0FBYTZZLFNBQWQsQ0FBVDtBQUNEOztBQUNELFlBQU1FLGFBQWEsR0FDakJSLGFBQWEsR0FBRyxDQUFoQixHQUFvQnZFLFdBQVcsQ0FBQ3VFLGFBQWEsR0FBRyxDQUFqQixDQUEvQixHQUFxRCxJQUR2RDs7QUFFQSxVQUFJQSxhQUFhLEdBQUcsQ0FBaEIsSUFBcUIsQ0FBQ1EsYUFBMUIsRUFBeUM7QUFDdkNoRixlQUFPLENBQUMsQ0FBRCxDQUFQOztBQUNBLFlBQUl5RSxHQUFHLEtBQUtwRSxRQUFRLENBQUN2bEIsT0FBckIsRUFBOEI7QUFDNUJzSixzQkFBWSxDQUFDdWdCLFNBQUQsQ0FBWjtBQUNBeEksc0JBQVksQ0FBQyxLQUFELENBQVo7QUFDRDs7QUFDRDtBQUNEOztBQUNELFlBQU04SSxlQUFlLEdBQUcza0IsTUFBTSxDQUFDMkwsS0FBUCxDQUFhOFksWUFBYixJQUE2QmhJLE1BQXJEO0FBQ0EsWUFBTW1JLGVBQWUsR0FBRzVrQixNQUFNLENBQUMyTCxLQUFQLENBQWE2WSxTQUFiLElBQTBCaFIsTUFBbEQ7QUFDQSxZQUFNcVIsb0JBQW9CLEdBQUcsQ0FBQ0QsZUFBZSxJQUFJLEVBQXBCLEVBQzFCN0osV0FEMEIsR0FFMUJ4aUIsSUFGMEIsRUFBN0IsQ0FqQkUsQ0FxQkY7O0FBQ0EsWUFBTXVzQixJQUFJLEdBQUcsT0FBT0MsT0FBTyxHQUFHLENBQWpCLEtBQXVCO0FBQ2xDLFlBQUk7QUFDRixpQkFBTyxNQUFNQyw4RkFBNkIsQ0FBQztBQUN6QzdJLG9CQUR5QztBQUV6Q3VJLHlCQUZ5QztBQUd6Q08sdUJBQVcsRUFBRSxJQUg0QjtBQUl6Q0Msb0JBQVEsRUFBRTVDLGdCQUFnQixHQUFHSSxjQUFILEdBQW9CLElBSkw7QUFLekNsUCxrQkFBTSxFQUFFcVIsb0JBQW9CLEdBQ3hCO0FBQ0VuTCxrQkFBSSxFQUFFaUwsZUFEUjtBQUVFUSxpQkFBRyxFQUFFUCxlQUZQO0FBR0UzSixtQkFBSyxFQUFFNEo7QUFIVCxhQUR3QixHQU14QixJQVhxQztBQVl6Q08sNEJBQWdCLEVBQ2RocEIsT0FBTyxDQUFDNGdCLFdBQUQsQ0FBUCxJQUNBNWdCLE9BQU8sQ0FBQzhnQixnQkFBRCxDQURQLElBRUE5Z0IsT0FBTyxDQUFDOGlCLGFBQUQsQ0FGUCxJQUdBOWlCLE9BQU8sQ0FBQ2doQixrQkFBRCxDQUhQLElBSUFoaEIsT0FBTyxDQUFDb2hCLHFCQUFEO0FBakJnQyxXQUFELENBQTFDO0FBbUJELFNBcEJELENBb0JFLE9BQU9qZCxDQUFQLEVBQVU7QUFDVixjQUFJd2tCLE9BQU8sSUFBSSxDQUFmLEVBQWtCLE1BQU14a0IsQ0FBTjtBQUNsQixnQkFBTSxJQUFJeUQsT0FBSixDQUFZb0IsQ0FBQyxJQUFJNUIsVUFBVSxDQUFDNEIsQ0FBRCxFQUFJLE1BQU14QixJQUFJLENBQUN5aEIsR0FBTCxDQUFTLENBQVQsRUFBWU4sT0FBTyxHQUFHLENBQXRCLENBQVYsQ0FBM0IsQ0FBTjtBQUNBLGlCQUFPRCxJQUFJLENBQUNDLE9BQU8sR0FBRyxDQUFYLENBQVg7QUFDRDtBQUNGLE9BMUJEOztBQTJCQSxZQUFNO0FBQUU1SyxhQUFLLEVBQUVoakIsSUFBVDtBQUFlNnBCLGVBQWY7QUFBd0JuQixtQkFBVyxFQUFFeUY7QUFBckMsVUFBa0QsTUFBTVIsSUFBSSxFQUFsRTtBQUNBLFVBQUlWLFFBQVEsSUFBSUQsR0FBRyxLQUFLcEUsUUFBUSxDQUFDdmxCLE9BQWpDLEVBQTBDO0FBQzFDLFlBQU0rcUIsYUFBYSxHQUNqQm5wQixPQUFPLENBQUN5b0Isb0JBQUQsQ0FBUCxJQUFpQ0YsZUFBZSxLQUFLLE1BRHZEOztBQUVBLFVBQ0VZLGFBQWEsS0FDWnB1QixJQUFJLENBQUNsRCxNQUFMLEtBQWdCLENBQWhCLElBQ0NrRCxJQUFJLENBQUNzckIsSUFBTCxDQUNHM00sSUFBRCxJQUNFLENBQUMvaEIsS0FBSyxDQUFDbUcsT0FBTixDQUFjNGIsSUFBZCxhQUFjQSxJQUFkLHVCQUFjQSxJQUFJLENBQUVpTSxVQUFwQixDQUFELElBQW9Dak0sSUFBSSxDQUFDaU0sVUFBTCxDQUFnQjl0QixNQUFoQixLQUEyQixDQUZuRSxDQUZXLENBRGYsRUFPRTtBQUNBNHNCLDhCQUFzQixDQUFDLGFBQUQsQ0FBdEI7QUFDRDs7QUFDRCxVQUFJcUQsYUFBYSxLQUFLLENBQWxCLElBQXVCL3NCLElBQUksQ0FBQ2xELE1BQUwsS0FBZ0IsQ0FBM0MsRUFBOEM7QUFDNUMyckIsc0JBQWMsQ0FBQyxFQUFELENBQWQ7QUFDQUUsc0JBQWMsQ0FBQyxLQUFELENBQWQ7QUFDRDs7QUFDRHBFLG1CQUFhLENBQUN2a0IsSUFBRCxDQUFiO0FBQ0EwbkIsZUFBUyxDQUFDVCxTQUFELENBQVQsQ0FwRUUsQ0FvRW9COztBQUN0QnJDLFdBQUssQ0FBQzVrQixJQUFJLENBQUMwRSxHQUFMLENBQVVpYSxJQUFELElBQVVBLElBQUksQ0FBQzFNLEVBQXhCLENBQUQsQ0FBTDs7QUFDQSxVQUFJOGEsYUFBYSxHQUFHLENBQWhCLElBQXFCL3NCLElBQUksQ0FBQ2xELE1BQUwsS0FBZ0IsQ0FBekMsRUFBNEM7QUFDMUM2ckIsc0JBQWMsQ0FBQyxLQUFELENBQWQ7QUFDQUosZUFBTyxDQUFDLENBQUQsQ0FBUDtBQUNBO0FBQ0Q7O0FBQ0RJLG9CQUFjLENBQUN3RixRQUFELENBQWQ7QUFDQTFGLG9CQUFjLENBQUU0RixJQUFELElBQVU7QUFDdkIsY0FBTUMsSUFBSSxHQUFHdkIsYUFBYSxLQUFLLENBQWxCLEdBQXNCLEVBQXRCLEdBQTJCLENBQUMsR0FBR3NCLElBQUosQ0FBeEM7O0FBQ0EsWUFBSXhFLE9BQUosRUFBYTtBQUNYeUUsY0FBSSxDQUFDdkIsYUFBYSxHQUFHLENBQWpCLENBQUosR0FBMEJsRCxPQUExQjtBQUNEOztBQUNELGVBQU95RSxJQUFQO0FBQ0QsT0FOYSxDQUFkO0FBT0FDLHNCQUFnQixDQUFDLEVBQUQsQ0FBaEIsQ0FuRkUsQ0FxRkY7O0FBQ0EsWUFBTUMsU0FBUyxHQUFHeHVCLElBQUksQ0FBQzBFLEdBQUwsQ0FBVWlhLElBQUQ7QUFBQTs7QUFBQSwrQ0FDdEJBLElBRHNCO0FBRXpCaU4sc0JBQVksMENBQ1ZqTixJQURVLGFBQ1ZBLElBRFUsdUJBQ1ZBLElBQUksQ0FBRWlOLFlBREksbUVBRVQsUUFBT2pOLElBQVAsYUFBT0EsSUFBUCx1QkFBT0EsSUFBSSxDQUFFOFAsVUFBYixNQUE0QixRQUE1QixHQUF1QzlQLElBQUksQ0FBQzhQLFVBQTVDLEdBQXlELElBRmhELHlDQUdWOVAsSUFIVSxhQUdWQSxJQUhVLDJDQUdWQSxJQUFJLENBQUU4UCxVQUhJLHFEQUdWLGlCQUFrQnhjLEVBSFIseUNBSVYsSUFOdUI7QUFPekI0Wix5QkFBZSwrQ0FDYmxOLElBRGEsYUFDYkEsSUFEYSx1QkFDYkEsSUFBSSxDQUFFa04sZUFETyx5RUFFWixRQUFPbE4sSUFBUCxhQUFPQSxJQUFQLHVCQUFPQSxJQUFJLENBQUUrUCxhQUFiLE1BQStCLFFBQS9CLEdBQTBDL1AsSUFBSSxDQUFDK1AsYUFBL0MsR0FBK0QsSUFGbkQsMkNBR2IvUCxJQUhhLGFBR2JBLElBSGEsOENBR2JBLElBQUksQ0FBRStQLGFBSE8sd0RBR2Isb0JBQXFCemMsRUFIUiwyQ0FJYjtBQVh1QjtBQUFBLE9BQVQsQ0FBbEI7QUFjQXdTLHNCQUFnQixDQUFDK0osU0FBRCxDQUFoQixDQXBHRSxDQXFHRjs7QUFDQW5LLGFBQU8sQ0FBQ21LLFNBQVMsQ0FBQ3hwQixNQUFWLENBQWlCdW1CLGNBQWpCLENBQUQsQ0FBUDtBQUNELEtBdkdELENBdUdFLE9BQU96aUIsR0FBUCxFQUFZO0FBQ1osVUFBSWtrQixHQUFHLEtBQUtwRSxRQUFRLENBQUN2bEIsT0FBckIsRUFBOEI7QUFDOUJqRCxhQUFPLENBQUNELEtBQVIsQ0FBYyxzQkFBZCxFQUFzQzJJLEdBQXRDO0FBQ0EsWUFBTXFrQixJQUFJLEdBQUcsQ0FBQXJrQixHQUFHLFNBQUgsSUFBQUEsR0FBRyxXQUFILFlBQUFBLEdBQUcsQ0FBRXFrQixJQUFMLEtBQWEsU0FBMUI7QUFDQWxFLGtCQUFZLENBQUM7QUFDWGtFLFlBRFc7QUFFWG5jLGVBQU8sRUFBRSxDQUFBbEksR0FBRyxTQUFILElBQUFBLEdBQUcsV0FBSCxZQUFBQSxHQUFHLENBQUVrSSxPQUFMLEtBQWdCO0FBRmQsT0FBRCxDQUFaO0FBSUFxVCxhQUFPLENBQUMsRUFBRCxDQUFQO0FBQ0FJLHNCQUFnQixDQUFDLEVBQUQsQ0FBaEI7QUFDRCxLQWpIRCxTQWlIVTtBQUNSOVgsa0JBQVksQ0FBQ3VnQixTQUFELENBQVo7QUFDQSxVQUFJRixHQUFHLEtBQUtwRSxRQUFRLENBQUN2bEIsT0FBakIsSUFBNEIsQ0FBQzRwQixRQUFqQyxFQUEyQ3ZJLFlBQVksQ0FBQyxLQUFELENBQVo7QUFDNUM7QUFDRjs7QUFFRCxRQUFNaUssbUJBQW1CLEdBQUl6bEIsS0FBRCxJQUFXMGMsU0FBUyxDQUFDMWMsS0FBSyxDQUFDQyxNQUFOLENBQWFnRSxLQUFkLENBQWhELENBaGRtQyxDQWtkbkM7OztBQUNBaEsseURBQVMsQ0FBQyxNQUFNO0FBQ2QsVUFBTXNSLElBQUksR0FBRytQLGFBQWEsSUFBSSxFQUE5QjtBQUNBSCxXQUFPLENBQUM1UCxJQUFJLENBQUN6UCxNQUFMLENBQVl1bUIsY0FBWixDQUFELENBQVA7QUFDRCxHQUhRLEVBR04sQ0FBQy9HLGFBQUQsRUFBZ0IrRyxjQUFoQixDQUhNLENBQVQ7O0FBS0EsV0FBU3FELFlBQVQsQ0FBc0JyTyxHQUF0QixFQUEyQjtBQUN6QjtBQUNBLFVBQU1zTyxhQUFhLEdBQUdsSCxTQUFTLENBQUNqakIsR0FBVixDQUFjLENBQUNrSyxDQUFELEVBQUk1UixDQUFKLEtBQVdBLENBQUMsS0FBS3VqQixHQUFOLEdBQVksQ0FBQzNSLENBQWIsR0FBaUJBLENBQTFDLENBQXRCO0FBQ0EsVUFBTTJZLE1BQU0sR0FBR3NILGFBQWEsQ0FBQ3RPLEdBQUQsQ0FBNUIsQ0FIeUIsQ0FHVTs7QUFFbkMsVUFBTXVPLFVBQVUsR0FBRyxDQUFDLEdBQUcxSyxJQUFKLEVBQVVoaUIsSUFBVixDQUFlLENBQUNDLENBQUQsRUFBSUMsQ0FBSixLQUFVO0FBQzFDLFlBQU1ILEdBQUcsR0FBRytrQixjQUFjLENBQUMzRyxHQUFELENBQTFCOztBQUVBLFVBQUlBLEdBQUcsS0FBSyxDQUFaLEVBQWU7QUFDYjtBQUNBLGNBQU13TyxFQUFFLEdBQUdyTSxNQUFNLENBQUNyZ0IsQ0FBQyxDQUFDRixHQUFELENBQUYsQ0FBakI7QUFDQSxjQUFNNnNCLEVBQUUsR0FBR3RNLE1BQU0sQ0FBQ3BnQixDQUFDLENBQUNILEdBQUQsQ0FBRixDQUFqQixDQUhhLENBS2I7O0FBQ0EsWUFBSTRzQixFQUFFLEtBQUssSUFBUCxJQUFlQyxFQUFFLEtBQUssSUFBMUIsRUFBZ0MsT0FBTyxDQUFQO0FBQ2hDLFlBQUlELEVBQUUsS0FBSyxJQUFYLEVBQWlCLE9BQU94SCxNQUFNLEdBQUcsQ0FBQyxDQUFKLEdBQVEsQ0FBckI7QUFDakIsWUFBSXlILEVBQUUsS0FBSyxJQUFYLEVBQWlCLE9BQU96SCxNQUFNLEdBQUcsQ0FBSCxHQUFPLENBQUMsQ0FBckI7QUFFakIsZUFBT0EsTUFBTSxHQUFJeUgsRUFBRSxHQUFHRCxFQUFULEdBQWdCQSxFQUFFLEdBQUdDLEVBQWxDO0FBQ0QsT0FkeUMsQ0FnQjFDOzs7QUFDQSxVQUFJek8sR0FBRyxLQUFLLENBQVIsSUFBYUEsR0FBRyxLQUFLLENBQXpCLEVBQTRCO0FBQUE7O0FBQzFCLGNBQU0wTyxFQUFFLEdBQUcsV0FBQzVzQixDQUFDLENBQUNGLEdBQUQsQ0FBRiwyQ0FBVyxFQUFYLEVBQWVzbkIsUUFBZixFQUFYO0FBQ0EsY0FBTXlGLEVBQUUsR0FBRyxXQUFDNXNCLENBQUMsQ0FBQ0gsR0FBRCxDQUFGLDJDQUFXLEVBQVgsRUFBZXNuQixRQUFmLEVBQVg7QUFDQSxlQUFPbEMsTUFBTSxHQUFHMkgsRUFBRSxDQUFDdnNCLGFBQUgsQ0FBaUJzc0IsRUFBakIsQ0FBSCxHQUEwQkEsRUFBRSxDQUFDdHNCLGFBQUgsQ0FBaUJ1c0IsRUFBakIsQ0FBdkM7QUFDRCxPQXJCeUMsQ0F1QjFDOzs7QUFDQSxZQUFNQyxFQUFFLEdBQUczc0IsTUFBTSxDQUFDSCxDQUFDLENBQUNGLEdBQUQsQ0FBRixDQUFqQjtBQUNBLFlBQU1pdEIsRUFBRSxHQUFHNXNCLE1BQU0sQ0FBQ0YsQ0FBQyxDQUFDSCxHQUFELENBQUYsQ0FBakI7O0FBRUEsVUFBSSxDQUFDdWMsS0FBSyxDQUFDeVEsRUFBRCxDQUFOLElBQWMsQ0FBQ3pRLEtBQUssQ0FBQzBRLEVBQUQsQ0FBeEIsRUFBOEI7QUFDNUIsZUFBTzdILE1BQU0sR0FBSTZILEVBQUUsR0FBR0QsRUFBVCxHQUFnQkEsRUFBRSxHQUFHQyxFQUFsQztBQUNELE9BRkQsTUFFTztBQUFBOztBQUNMLGNBQU1ILEVBQUUsR0FBRyxZQUFDNXNCLENBQUMsQ0FBQ0YsR0FBRCxDQUFGLDZDQUFXLEVBQVgsRUFBZXNuQixRQUFmLEVBQVg7QUFDQSxjQUFNeUYsRUFBRSxHQUFHLFlBQUM1c0IsQ0FBQyxDQUFDSCxHQUFELENBQUYsNkNBQVcsRUFBWCxFQUFlc25CLFFBQWYsRUFBWDtBQUNBLGVBQU9sQyxNQUFNLEdBQUcySCxFQUFFLENBQUN2c0IsYUFBSCxDQUFpQnNzQixFQUFqQixDQUFILEdBQTBCQSxFQUFFLENBQUN0c0IsYUFBSCxDQUFpQnVzQixFQUFqQixDQUF2QztBQUNEO0FBQ0YsS0FsQ2tCLENBQW5CO0FBb0NBN0ssV0FBTyxDQUFDeUssVUFBRCxDQUFQO0FBQ0FsSCxnQkFBWSxDQUFDaUgsYUFBRCxDQUFaLENBMUN5QixDQTRDekI7O0FBQ0FuSCxhQUFTLENBQUNOLFlBQVksQ0FBQ0gsU0FBRCxFQUFZMUcsR0FBWixFQUFpQmdILE1BQWpCLENBQWIsQ0FBVDtBQUNEOztBQUdELFFBQU04SCxTQUFTLEdBQUkxUSxJQUFELElBQVU7QUFDMUIsUUFBSUEsSUFBSSxJQUFJQSxJQUFJLENBQUMxTSxFQUFqQixFQUFxQjtBQUNuQjdSLGFBQU8sQ0FBQzBoQixHQUFSLENBQVksZ0JBQVosRUFBOEJuRCxJQUE5QjtBQUNBd0cscUJBQWUsQ0FBQyxJQUFELENBQWY7QUFDQXRjLFlBQU0sQ0FBQ3NQLElBQVAsQ0FBWSxZQUFZd0csSUFBSSxDQUFDMU0sRUFBN0I7QUFDRCxLQUpELE1BSU87QUFDTDdSLGFBQU8sQ0FBQ0QsS0FBUixDQUFjLDhDQUFkLEVBQThEd2UsSUFBOUQ7QUFDRDtBQUNGLEdBUkQ7O0FBVUEsUUFBTTtBQUFBLE9BQUMyUSxhQUFEO0FBQUEsT0FBZ0JmO0FBQWhCLE1BQW9DM3dCLHNEQUFRLENBQUMsRUFBRCxDQUFsRDtBQUNBLFFBQU07QUFBQSxPQUFDMnhCLGVBQUQ7QUFBQSxPQUFrQkM7QUFBbEIsTUFBd0M1eEIsc0RBQVEsQ0FBQyxLQUFELENBQXREOztBQUVBLFFBQU02eEIsZ0JBQWdCLEdBQUl4ZCxFQUFELElBQVE7QUFDL0JzYyxvQkFBZ0IsQ0FBQ0YsSUFBSSxJQUNuQkEsSUFBSSxDQUFDenBCLFFBQUwsQ0FBY3FOLEVBQWQsSUFBb0JvYyxJQUFJLENBQUNycEIsTUFBTCxDQUFZK1UsQ0FBQyxJQUFJQSxDQUFDLEtBQUs5SCxFQUF2QixDQUFwQixHQUFpRCxDQUFDLEdBQUdvYyxJQUFKLEVBQVVwYyxFQUFWLENBRG5DLENBQWhCO0FBR0QsR0FKRCxDQXRoQm1DLENBNmhCbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBLFFBQU15ZCxxQkFBcUIsR0FBRyxNQUFNRixrQkFBa0IsQ0FBQyxJQUFELENBQXREOztBQUNBLFFBQU1HLHNCQUFzQixHQUFHLE1BQU1ILGtCQUFrQixDQUFDLEtBQUQsQ0FBdkQ7O0FBRUEsUUFBTUksb0JBQW9CLEdBQUcsWUFBWTtBQUN2Q3RILGlCQUFhLENBQUMsSUFBRCxDQUFiO0FBQ0EsVUFBTXNCLEVBQUUsR0FBR2hxQiwwREFBUSxDQUFDQyxTQUFULEVBQVg7O0FBQ0EsUUFBSTtBQUNGO0FBQ0EsV0FBSyxNQUFNZ3dCLE1BQVgsSUFBcUJQLGFBQXJCLEVBQW9DO0FBQ2xDbHZCLGVBQU8sQ0FBQzBoQixHQUFSLENBQVkrTixNQUFaOztBQUNBLFlBQUk7QUFDRjtBQUNBLGdCQUFNakcsRUFBRSxDQUFDOXBCLFVBQUgsQ0FBYyxNQUFkLEVBQXNCSCxHQUF0QixDQUEwQmt3QixNQUExQixFQUFrQ0MsTUFBbEMsRUFBTjtBQUNELFNBSEQsQ0FHRSxPQUFPaG5CLEdBQVAsRUFBWTtBQUNaMUksaUJBQU8sQ0FBQ0QsS0FBUixDQUFlLDJCQUEwQjB2QixNQUFPLGFBQWhELEVBQThEL21CLEdBQTlEO0FBQ0Q7O0FBQ0QsWUFBSTtBQUNGO0FBQ0EsZ0JBQU04Z0IsRUFBRSxDQUFDOXBCLFVBQUgsQ0FBYyxPQUFkLEVBQXVCSCxHQUF2QixDQUEyQmt3QixNQUEzQixFQUFtQ0MsTUFBbkMsRUFBTjtBQUNELFNBSEQsQ0FHRSxPQUFPaG5CLEdBQVAsRUFBWTtBQUNaMUksaUJBQU8sQ0FBQ0QsS0FBUixDQUFlLDJCQUEwQjB2QixNQUFPLGNBQWhELEVBQStEL21CLEdBQS9EO0FBQ0Q7O0FBQ0QsWUFBSTtBQUNGO0FBQ0EsZ0JBQU1pbkIsaUJBQWlCLENBQUNGLE1BQUQsQ0FBdkI7QUFDRCxTQUhELENBR0UsT0FBTy9tQixHQUFQLEVBQVk7QUFDWjFJLGlCQUFPLENBQUNELEtBQVIsQ0FBZSw4QkFBNkIwdkIsTUFBTyxHQUFuRCxFQUF1RC9tQixHQUF2RDtBQUNEO0FBQ0YsT0F0QkMsQ0F1QkY7OztBQUNBdWIsYUFBTyxDQUFDRCxJQUFJLENBQUNwZixNQUFMLENBQWEyWixJQUFELElBQVUsQ0FBQzJRLGFBQWEsQ0FBQzFxQixRQUFkLENBQXVCK1osSUFBSSxDQUFDMU0sRUFBNUIsQ0FBdkIsQ0FBRCxDQUFQO0FBQ0FzYyxzQkFBZ0IsQ0FBQyxFQUFELENBQWhCO0FBQ0QsS0ExQkQsQ0EwQkUsT0FBT3B1QixLQUFQLEVBQWM7QUFDZEMsYUFBTyxDQUFDRCxLQUFSLENBQWMsdUJBQWQsRUFBdUNBLEtBQXZDO0FBQ0QsS0E1QkQsU0E0QlU7QUFDUm1vQixtQkFBYSxDQUFDLEtBQUQsQ0FBYjtBQUNBcUgsNEJBQXNCLEdBRmQsQ0FHUjtBQUNBO0FBQ0Q7QUFDRixHQXJDRDs7QUF3Q0EsUUFBTUssV0FBVyxHQUFHLE1BQU1uTCxPQUFPLENBQUMsS0FBRCxDQUFqQzs7QUFDQSxRQUFNb0wsVUFBVSxHQUFHLE1BQU1wTCxPQUFPLENBQUMsSUFBRCxDQUFoQzs7QUFFQSxRQUFNcUwsV0FBVyxHQUFHLENBQUNobkIsS0FBRCxFQUFRcVgsR0FBUixFQUFhNFAsV0FBYixFQUEwQjVkLElBQTFCLEtBQW1DO0FBQ3JELFFBQUlySixLQUFKLEVBQVc7QUFDVEEsV0FBSyxDQUFDa25CLGNBQU47QUFDQWxuQixXQUFLLENBQUNtbkIsZUFBTjtBQUNEOztBQUNEandCLFdBQU8sQ0FBQzBoQixHQUFSLENBQVkseUJBQVosRUFBdUNxTyxXQUF2QztBQUNBNUIsb0JBQWdCLENBQUM0QixXQUFELENBQWhCO0FBQ0E5SyxZQUFRLENBQUM5UyxJQUFELENBQVI7QUFDQWlkLHNCQUFrQixDQUFDLElBQUQsQ0FBbEI7QUFDRCxHQVRELENBbmxCbUMsQ0E4bEJuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQSxRQUFNYyxVQUFVLEdBQUlDLEtBQUQsS0FBWTtBQUM3QkMsbUJBQWUsRUFBRTNJLFVBQVUsS0FBSzBJLEtBQWYsR0FBdUIsTUFBdkIsR0FBZ0MsYUFEcEI7QUFFN0JFLGFBQVMsRUFBRSxRQUZrQjtBQUc3QkMsVUFBTSxFQUFFO0FBSHFCLEdBQVosQ0FBbkI7O0FBTUEsUUFBTTtBQUFBLE9BQUNDLGFBQUQ7QUFBQSxPQUFnQkM7QUFBaEIsTUFBb0NoekIsc0RBQVEsQ0FBQyxlQUFELENBQWxEO0FBQ0EsUUFBTTtBQUFBLE9BQUNpekIsYUFBRDtBQUFBLE9BQWdCQztBQUFoQixNQUFvQ2x6QixzREFBUSxDQUFDLGVBQUQsQ0FBbEQ7O0FBRUEsUUFBTW16QixhQUFhLEdBQUcsQ0FBQ0MsUUFBRCxFQUFXOW5CLEtBQVgsS0FBcUI7QUFDekMsUUFBSThuQixRQUFRLEtBQUssWUFBakIsRUFBK0I7QUFDN0JKLHNCQUFnQixDQUFDLGVBQUQsQ0FBaEI7QUFDQTlLLG9CQUFjLENBQUMsSUFBRCxDQUFkO0FBQ0QsS0FIRCxNQUdPO0FBQ0w4SyxzQkFBZ0IsQ0FBQzFuQixLQUFLLENBQUNDLE1BQU4sQ0FBYThuQixXQUFkLENBQWhCO0FBQ0FuTCxvQkFBYyxDQUFDNWMsS0FBSyxDQUFDQyxNQUFOLENBQWE4bkIsV0FBZCxDQUFkO0FBQ0Q7QUFDRixHQVJEOztBQVVBLFFBQU1DLGFBQWEsR0FBRyxDQUFDRixRQUFELEVBQVc5bkIsS0FBWCxLQUFxQjtBQUN6QyxRQUFJOG5CLFFBQVEsS0FBSyxZQUFqQixFQUErQjtBQUM3QkYsc0JBQWdCLENBQUMsZUFBRCxDQUFoQjtBQUNBOUsseUJBQW1CLENBQUMsSUFBRCxDQUFuQjtBQUNELEtBSEQsTUFHTztBQUNMOEssc0JBQWdCLENBQUM1bkIsS0FBSyxDQUFDQyxNQUFOLENBQWE4bkIsV0FBZCxDQUFoQjtBQUNBakwseUJBQW1CLENBQUM5YyxLQUFLLENBQUNDLE1BQU4sQ0FBYThuQixXQUFkLENBQW5CO0FBQ0Q7QUFDRixHQVJELENBbm9CbUMsQ0E2b0JuQztBQUNBOzs7QUFDQSxpQkFBZUUscUJBQWYsQ0FBcUM1TyxJQUFyQyxFQUEyQztBQUN6QyxVQUFNcUgsRUFBRSxHQUFHaHFCLDBEQUFRLENBQUNDLFNBQVQsRUFBWDtBQUNBLFVBQU04a0IsR0FBRyxHQUFHLElBQUk5aUIsR0FBSixFQUFaLENBRnlDLENBSXpDOztBQUNBLFVBQU11dkIsUUFBUSxHQUFHNU0sYUFBYSxDQUFDeGYsTUFBZCxDQUFzQjJaLElBQUQsSUFBVTtBQUM5QyxZQUFNOE0sR0FBRyxHQUFHNUgsZUFBZSxDQUFDbEYsSUFBRCxFQUFPLEtBQVAsQ0FBM0I7QUFDQSxZQUFNK00sUUFBUSxHQUFHN0gsZUFBZSxDQUFDbEYsSUFBRCxFQUFPLFVBQVAsQ0FBaEM7O0FBQ0EsVUFBSWtILFdBQVcsSUFBSWxDLGFBQWEsQ0FBQzhILEdBQUQsQ0FBYixLQUF1QjlILGFBQWEsQ0FBQ2tDLFdBQUQsQ0FBdkQsRUFBc0U7QUFDcEUsZUFBTyxLQUFQO0FBQ0Q7O0FBQ0QsVUFDRUUsZ0JBQWdCLElBQ2hCcEMsYUFBYSxDQUFDK0gsUUFBRCxDQUFiLEtBQTRCL0gsYUFBYSxDQUFDb0MsZ0JBQUQsQ0FGM0MsRUFHRTtBQUNBLGVBQU8sS0FBUDtBQUNEOztBQUNELGFBQU8sSUFBUDtBQUNELEtBYmdCLENBQWpCOztBQWVBLFNBQUssTUFBTXNMLEVBQVgsSUFBaUJELFFBQWpCLEVBQTJCO0FBQ3pCLFlBQU1uZixFQUFFLEdBQUdzUSxJQUFJLEtBQUssTUFBVCxHQUFrQjhPLEVBQUUsQ0FBQ3pGLFlBQXJCLEdBQW9DeUYsRUFBRSxDQUFDeEYsZUFBbEQ7QUFDQSxVQUFJNVosRUFBSixFQUFRMFMsR0FBRyxDQUFDN2lCLEdBQUosQ0FBUW1RLEVBQVI7QUFDVDs7QUFFRCxVQUFNcWYsR0FBRyxHQUFHLEVBQVo7QUFDQSxVQUFNQyxPQUFPLEdBQUcsQ0FBQyxHQUFHNU0sR0FBSixDQUFoQjs7QUFDQSxTQUFLLElBQUkzbkIsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR3UwQixPQUFPLENBQUN6MEIsTUFBNUIsRUFBb0NFLENBQUMsSUFBSSxFQUF6QyxFQUE2QztBQUMzQyxZQUFNdzBCLEtBQUssR0FBR0QsT0FBTyxDQUFDbHdCLEtBQVIsQ0FBY3JFLENBQWQsRUFBaUJBLENBQUMsR0FBRyxFQUFyQixDQUFkO0FBQ0EsWUFBTXVELElBQUksR0FBRyxNQUFNcXBCLEVBQUUsQ0FDbEI5cEIsVUFEZ0IsQ0FDTCxRQURLLEVBRWhCVSxLQUZnQixDQUVWWiwwREFBUSxDQUFDQyxTQUFULENBQW1Cc3FCLFNBQW5CLENBQTZCQyxVQUE3QixFQUZVLEVBRWlDLElBRmpDLEVBRXVDb0gsS0FGdkMsRUFHaEJ6eEIsR0FIZ0IsRUFBbkI7QUFJQVEsVUFBSSxDQUFDSSxPQUFMLENBQWNoQixHQUFELElBQVM7QUFDcEIsY0FBTTJqQixDQUFDLEdBQUczakIsR0FBRyxDQUFDSyxJQUFKLE1BQWMsRUFBeEI7QUFDQXN4QixXQUFHLENBQUNuWixJQUFKLENBQVM7QUFBRWxHLFlBQUUsRUFBRXRTLEdBQUcsQ0FBQ3NTLEVBQVY7QUFBY00sY0FBSSxFQUFFK1EsQ0FBQyxDQUFDL1EsSUFBRixJQUFVNVMsR0FBRyxDQUFDc1M7QUFBbEMsU0FBVDtBQUNELE9BSEQ7QUFJRCxLQXJDd0MsQ0F1Q3pDOzs7QUFDQXFmLE9BQUcsQ0FBQ2x2QixJQUFKLENBQVMsQ0FBQ0MsQ0FBRCxFQUFJQyxDQUFKLEtBQVUsQ0FBQ0QsQ0FBQyxDQUFDa1EsSUFBRixJQUFVLEVBQVgsRUFBZTVQLGFBQWYsQ0FBNkJMLENBQUMsQ0FBQ2lRLElBQUYsSUFBVSxFQUF2QyxDQUFuQjtBQUNBLFdBQU8rZSxHQUFQO0FBQ0QsR0F6ckJrQyxDQTRyQm5DO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQSxRQUFNRyxpQkFBaUIsR0FBRyxZQUFZO0FBQ3BDLFFBQUlDLFdBQVcsR0FBRyxFQUFsQjs7QUFDQSxRQUFJO0FBQ0YsWUFBTUMsV0FBVyxHQUFHLE1BQU1DLDZFQUFZLENBQUMvTCxXQUFELEVBQWNFLGdCQUFkLENBQXRDO0FBQ0EyTCxpQkFBVyxHQUFHOTBCLEtBQUssQ0FBQ21HLE9BQU4sQ0FBYzR1QixXQUFkLElBQTZCQSxXQUE3QixHQUEyQyxFQUF6RDtBQUNELEtBSEQsQ0FHRSxPQUFPdm9CLENBQVAsRUFBVTtBQUNWaEosYUFBTyxDQUFDRCxLQUFSLENBQWMsc0JBQWQsRUFBc0NpSixDQUF0QztBQUNELEtBUG1DLENBU3BDOzs7QUFDQSxRQUFJc29CLFdBQVcsQ0FBQzUwQixNQUFaLEtBQXVCLENBQTNCLEVBQThCO0FBQzVCLFVBQUk7QUFDRixZQUFJLENBQUMrcEIsbUJBQUwsRUFBMEI7QUFDeEI7QUFDQUMsZ0NBQXNCLENBQUMsTUFBRCxDQUF0QjtBQUNEOztBQUNELGNBQU0rSyxPQUFPLEdBQUcsTUFBTVYscUJBQXFCLENBQUN0SyxtQkFBbUIsSUFBSSxNQUF4QixDQUEzQztBQUNBNkssbUJBQVcsR0FBR0csT0FBZDtBQUNELE9BUEQsQ0FPRSxPQUFPem9CLENBQVAsRUFBVTtBQUNWaEosZUFBTyxDQUFDRCxLQUFSLENBQWMsd0NBQWQsRUFBd0RpSixDQUF4RDtBQUNBc29CLG1CQUFXLEdBQUcsRUFBZDtBQUNEO0FBQ0Y7O0FBRURoTCxjQUFVLENBQUNnTCxXQUFELENBQVY7QUFDQUksdUJBQW1CLENBQUMsRUFBRCxDQUFuQjtBQUNBbEwsc0JBQWtCLENBQUMsSUFBRCxDQUFsQjtBQUNELEdBM0JELENBaHNCbUMsQ0ErdEJuQztBQUNBOzs7QUFDQSxRQUFNbUwsa0JBQWtCLEdBQUcsTUFBT0MsUUFBUCxJQUFvQjtBQUM3QzV4QixXQUFPLENBQUMwaEIsR0FBUixDQUFZLDBCQUFaLEVBQXdDa1EsUUFBeEM7O0FBQ0EsUUFBSSxDQUFDQSxRQUFMLEVBQWU7QUFDYixVQUFJbkwsbUJBQW1CLEtBQUssTUFBNUIsRUFBb0M7QUFDbENULCtCQUF1QixDQUFDLGVBQUQsQ0FBdkI7QUFDQUYsNkJBQXFCLENBQUMsSUFBRCxDQUFyQjtBQUNELE9BSEQsTUFHTyxJQUFJVyxtQkFBbUIsS0FBSyxTQUE1QixFQUF1QztBQUM1Q0wsa0NBQTBCLENBQUMsZUFBRCxDQUExQjtBQUNBRixnQ0FBd0IsQ0FBQyxJQUFELENBQXhCO0FBQ0Q7O0FBQ0RNLHdCQUFrQixDQUFDLEtBQUQsQ0FBbEI7QUFDQTtBQUNEOztBQUNELFFBQUk7QUFDRixZQUFNcUwsVUFBVSxHQUFHLE1BQU1yeUIsMERBQVEsQ0FBQ0MsU0FBVCxHQUFxQkMsVUFBckIsQ0FBZ0MsUUFBaEMsRUFBMENILEdBQTFDLENBQThDcXlCLFFBQTlDLEVBQXdEanlCLEdBQXhELEVBQXpCOztBQUNBLFVBQUlreUIsVUFBVSxDQUFDQyxNQUFmLEVBQXVCO0FBQ3JCLGNBQU1DLFVBQVUsR0FBR0YsVUFBVSxDQUFDanlCLElBQVgsRUFBbkI7O0FBQ0EsWUFBSTZtQixtQkFBbUIsS0FBSyxNQUE1QixFQUFvQztBQUNsQ1QsaUNBQXVCLENBQUMrTCxVQUFVLENBQUM1ZixJQUFaLENBQXZCO0FBQ0EyVCwrQkFBcUIsQ0FBQzhMLFFBQUQsQ0FBckI7QUFDRCxTQUhELE1BR08sSUFBSW5MLG1CQUFtQixLQUFLLFNBQTVCLEVBQXVDO0FBQzVDTCxvQ0FBMEIsQ0FBQzJMLFVBQVUsQ0FBQzVmLElBQVosQ0FBMUI7QUFDQStULGtDQUF3QixDQUFDMEwsUUFBRCxDQUF4QjtBQUNEO0FBQ0YsT0FURCxNQVNPO0FBQ0w1eEIsZUFBTyxDQUFDRCxLQUFSLENBQWMsa0NBQWQsRUFBa0Q2eEIsUUFBbEQ7QUFDRDtBQUNGLEtBZEQsQ0FjRSxPQUFPN3hCLEtBQVAsRUFBYztBQUNkQyxhQUFPLENBQUNELEtBQVIsQ0FBYyw2QkFBZCxFQUE2Q0EsS0FBN0M7QUFDRDs7QUFDRHltQixzQkFBa0IsQ0FBQyxLQUFELENBQWxCO0FBQ0QsR0EvQkQ7O0FBaUNBLFFBQU13TCxnQkFBZ0IsR0FBRyxDQUFDSixRQUFELEVBQVdLLFVBQVgsS0FBMEI7QUFDakRqeUIsV0FBTyxDQUFDMGhCLEdBQVIsQ0FBYSxjQUFha1EsUUFBUyxrQkFBaUJLLFVBQVcsRUFBL0Q7QUFDQXhwQixVQUFNLENBQUNzUCxJQUFQLENBQVksWUFBWTZaLFFBQXhCO0FBQ0QsR0FIRDs7QUFLQSxRQUFNTSwwQkFBMEIsR0FBRyxNQUFNO0FBQ3ZDLFFBQUl6TCxtQkFBbUIsS0FBSyxNQUE1QixFQUFvQztBQUNsQ1QsNkJBQXVCLENBQUMsZUFBRCxDQUF2QjtBQUNBRiwyQkFBcUIsQ0FBQyxJQUFELENBQXJCO0FBQ0QsS0FIRCxNQUdPLElBQUlXLG1CQUFtQixLQUFLLFNBQTVCLEVBQXVDO0FBQzVDTCxnQ0FBMEIsQ0FBQyxlQUFELENBQTFCO0FBQ0FGLDhCQUF3QixDQUFDLElBQUQsQ0FBeEI7QUFDRDs7QUFDRE0sc0JBQWtCLENBQUMsS0FBRCxDQUFsQjtBQUNELEdBVEQsQ0F2d0JtQyxDQWt4Qm5DO0FBQ0E7QUFDQTs7O0FBQ0EsUUFBTTtBQUFBLE9BQUMyTCxNQUFEO0FBQUEsT0FBU0M7QUFBVCxNQUFzQjUwQixzREFBUSxDQUFDLEVBQUQsQ0FBcEM7QUFDQSxRQUFNO0FBQUEsT0FBQzYwQixjQUFEO0FBQUEsT0FBaUJDO0FBQWpCLE1BQXNDOTBCLHNEQUFRLENBQUMsS0FBRCxDQUFwRDtBQUNBLFFBQU07QUFBQSxPQUFDKzBCLGVBQUQ7QUFBQSxPQUFrQkM7QUFBbEIsTUFBd0NoMUIsc0RBQVEsQ0FBQyxlQUFELENBQXREOztBQUVBLFFBQU1pMUIsZ0JBQWdCLEdBQUcsWUFBWTtBQUNuQyxVQUFNQyxVQUFVLEdBQUcsTUFBTUMsNEVBQVcsQ0FDbENsTixXQURrQyxFQUVsQ0UsZ0JBRmtDLEVBR2xDRSxrQkFIa0MsQ0FBcEM7QUFLQXVNLGFBQVMsQ0FBQ00sVUFBRCxDQUFUO0FBQ0FFLHNCQUFrQixDQUFDLEVBQUQsQ0FBbEI7QUFDQU4scUJBQWlCLENBQUMsSUFBRCxDQUFqQjtBQUNELEdBVEQ7O0FBV0EsUUFBTU8saUJBQWlCLEdBQUlDLFNBQUQsSUFBZTtBQUN2Q04sc0JBQWtCLENBQUNNLFNBQVMsSUFBSSxlQUFkLENBQWxCO0FBQ0FsTCxvQkFBZ0IsQ0FBQ2tMLFNBQVMsSUFBSSxJQUFkLENBQWhCO0FBQ0FSLHFCQUFpQixDQUFDLEtBQUQsQ0FBakI7QUFDRCxHQUpEOztBQU1BLFFBQU1TLHlCQUF5QixHQUFHLE1BQU07QUFDdENQLHNCQUFrQixDQUFDLGVBQUQsQ0FBbEI7QUFDQTVLLG9CQUFnQixDQUFDLElBQUQsQ0FBaEI7QUFDQTBLLHFCQUFpQixDQUFDLEtBQUQsQ0FBakI7QUFDRCxHQUpELENBMXlCbUMsQ0FnekJuQztBQUNBO0FBQ0E7OztBQUNBLFFBQU1VLHlCQUF5QixHQUFHLE1BQU07QUFDdEM1TSw4QkFBMEIsQ0FBQyxpQkFBRCxDQUExQjtBQUNBRiw0QkFBd0IsQ0FBQ3JFLGVBQUQsQ0FBeEI7QUFDQTdoQixXQUFPLENBQUMwaEIsR0FBUixDQUFZLHFEQUFaLEVBQW1FRyxlQUFuRTtBQUNELEdBSkQ7O0FBTUEsUUFBTW9SLDBCQUEwQixHQUFHLE1BQU07QUFDdkM3TSw4QkFBMEIsQ0FBQyxrQkFBRCxDQUExQjtBQUNBRiw0QkFBd0IsQ0FBQ3BFLGdCQUFELENBQXhCO0FBQ0E5aEIsV0FBTyxDQUFDMGhCLEdBQVIsQ0FBWSxxREFBWixFQUFtRUksZ0JBQW5FO0FBQ0QsR0FKRDs7QUFNQSxRQUFNb1IsOEJBQThCLEdBQUcsTUFBTTtBQUMzQzlNLDhCQUEwQixDQUFDLFlBQUQsQ0FBMUI7QUFDQUYsNEJBQXdCLENBQUNuRSxvQkFBRCxDQUF4QjtBQUNBL2hCLFdBQU8sQ0FBQzBoQixHQUFSLENBQVkscURBQVosRUFBbUVLLG9CQUFuRTtBQUNELEdBSkQ7O0FBTUEsUUFBTTtBQUFBLE9BQUNvUixnQkFBRDtBQUFBLE9BQW1CekI7QUFBbkIsTUFBMENsMEIsc0RBQVEsQ0FBQyxFQUFELENBQXhEO0FBQ0EsUUFBTTtBQUFBLE9BQUM0MUIsZUFBRDtBQUFBLE9BQWtCUjtBQUFsQixNQUF3Q3AxQixzREFBUSxDQUFDLEVBQUQsQ0FBdEQ7O0FBRUEsUUFBTW15QixpQkFBaUIsR0FBRyxNQUFPRixNQUFQLElBQWtCO0FBQzFDLFVBQU00RCxVQUFVLEdBQUc3ekIsMERBQVEsQ0FBQzh6QixPQUFULEdBQW1CbG9CLEdBQW5CLEVBQW5CO0FBQ0EsVUFBTW1vQixTQUFTLEdBQUdGLFVBQVUsQ0FBQzVvQixLQUFYLENBQWtCLFNBQVFnbEIsTUFBTyxHQUFqQyxDQUFsQjs7QUFDQSxRQUFJO0FBQ0YsWUFBTStELFVBQVUsR0FBRyxNQUFNRCxTQUFTLENBQUNFLE9BQVYsRUFBekI7QUFDQSxZQUFNQyxjQUFjLEdBQUdGLFVBQVUsQ0FBQ0csS0FBWCxDQUFpQnJ2QixHQUFqQixDQUFzQmlhLElBQUQsSUFBVUEsSUFBSSxDQUFDbVIsTUFBTCxFQUEvQixDQUF2QjtBQUNBLFlBQU1qakIsT0FBTyxDQUFDOEYsR0FBUixDQUFZbWhCLGNBQVosQ0FBTjtBQUNELEtBSkQsQ0FJRSxPQUFPM3pCLEtBQVAsRUFBYztBQUNkQyxhQUFPLENBQUNELEtBQVIsQ0FBYyw4QkFBZCxFQUE4Q0EsS0FBOUM7QUFDRDtBQUNGLEdBVkQ7O0FBWUEsUUFBTTZ6Qix5QkFBeUIsR0FBRyxNQUFPbkUsTUFBUCxJQUFrQjtBQUNsRCxVQUFNakcsRUFBRSxHQUFHaHFCLDBEQUFRLENBQUNDLFNBQVQsRUFBWDs7QUFDQSxRQUFJO0FBQ0YsWUFBTStwQixFQUFFLENBQUM5cEIsVUFBSCxDQUFjLE9BQWQsRUFBdUJILEdBQXZCLENBQTJCa3dCLE1BQTNCLEVBQW1DQyxNQUFuQyxFQUFOO0FBQ0ExdkIsYUFBTyxDQUFDMGhCLEdBQVIsQ0FBYSx1Q0FBc0MrTixNQUFPLEVBQTFEO0FBQ0QsS0FIRCxDQUdFLE9BQU8xdkIsS0FBUCxFQUFjO0FBQ2RDLGFBQU8sQ0FBQ0QsS0FBUixDQUFjLHVDQUFkLEVBQXVEQSxLQUF2RDtBQUNEO0FBQ0YsR0FSRCxDQXAxQm1DLENBODFCbkM7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUEsUUFBTTh6QixlQUFlLEdBQUd4bkIsSUFBSSxDQUFDeW5CLEdBQUwsQ0FDdEIsQ0FEc0IsRUFFdEIxTCxXQUFXLENBQUN4akIsTUFBWixDQUFtQkMsT0FBbkIsRUFBNEJuSSxNQUE1QixJQUFzQzRyQixXQUFXLEdBQUcsQ0FBSCxHQUFPLENBQXhELENBRnNCLENBQXhCOztBQUlBLFFBQU15TCxXQUFXLEdBQUcsQ0FBQyxNQUFNO0FBQ3pCLFVBQU1DLE9BQU8sR0FBRyxFQUFoQjtBQUNBLFVBQU1DLFVBQVUsR0FBRyxDQUFuQjs7QUFFQSxVQUFNQyxRQUFRLEdBQUk1cEIsQ0FBRCxJQUNmMHBCLE9BQU8sQ0FBQ2pjLElBQVIsQ0FDRSxNQUFDLDBEQUFELENBQVksSUFBWjtBQUNFLFNBQUcsRUFBRyxRQUFPek4sQ0FBRSxFQURqQjtBQUVFLFlBQU0sRUFBRUEsQ0FBQyxLQUFLbUwsSUFGaEI7QUFHRSxhQUFPLEVBQUUsTUFBTTBTLE9BQU8sQ0FBQzdkLENBQUQsQ0FIeEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQUtHQSxDQUxILENBREYsQ0FERjs7QUFXQSxVQUFNNnBCLFlBQVksR0FBSXB5QixHQUFELElBQ25CaXlCLE9BQU8sQ0FBQ2pjLElBQVIsQ0FBYSxNQUFDLDBEQUFELENBQVksUUFBWjtBQUFxQixTQUFHLEVBQUVoVyxHQUExQjtBQUErQixjQUFRLE1BQXZDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFBYixDQURGOztBQUdBLFFBQUk4eEIsZUFBZSxJQUFJSSxVQUF2QixFQUFtQztBQUNqQyxXQUFLLElBQUlyM0IsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsSUFBSWkzQixlQUFyQixFQUFzQ2ozQixDQUFDLElBQUksQ0FBM0MsRUFBOENzM0IsUUFBUSxDQUFDdDNCLENBQUQsQ0FBUjs7QUFDOUMsYUFBT28zQixPQUFQO0FBQ0Q7O0FBRUQsUUFBSWpvQixLQUFLLEdBQUdNLElBQUksQ0FBQ3luQixHQUFMLENBQVMsQ0FBVCxFQUFZcmUsSUFBSSxHQUFHLENBQW5CLENBQVo7QUFDQSxRQUFJMmUsR0FBRyxHQUFHL25CLElBQUksQ0FBQ2dvQixHQUFMLENBQVNSLGVBQWUsR0FBRyxDQUEzQixFQUE4QnBlLElBQUksR0FBRyxDQUFyQyxDQUFWO0FBRUEsVUFBTTZlLGFBQWEsR0FBR0wsVUFBVSxHQUFHLENBQW5DO0FBQ0EsUUFBSU0sYUFBYSxHQUFHSCxHQUFHLEdBQUdyb0IsS0FBTixHQUFjLENBQWxDO0FBQ0EsUUFBSXlvQixTQUFTLEdBQUdGLGFBQWEsR0FBR0MsYUFBaEM7O0FBRUEsV0FBT0MsU0FBUyxHQUFHLENBQW5CLEVBQXNCO0FBQ3BCLFVBQUl6b0IsS0FBSyxHQUFHLENBQVosRUFBZTtBQUNiQSxhQUFLLElBQUksQ0FBVDtBQUNBeW9CLGlCQUFTLElBQUksQ0FBYjtBQUNEOztBQUNELFVBQUlBLFNBQVMsR0FBRyxDQUFaLElBQWlCSixHQUFHLEdBQUdQLGVBQWUsR0FBRyxDQUE3QyxFQUFnRDtBQUM5Q08sV0FBRyxJQUFJLENBQVA7QUFDQUksaUJBQVMsSUFBSSxDQUFiO0FBQ0Q7O0FBQ0QsVUFBSXpvQixLQUFLLEtBQUssQ0FBVixJQUFlcW9CLEdBQUcsS0FBS1AsZUFBZSxHQUFHLENBQTdDLEVBQWdEO0FBQ2pEOztBQUVESyxZQUFRLENBQUMsQ0FBRCxDQUFSO0FBQ0EsUUFBSW5vQixLQUFLLEdBQUcsQ0FBWixFQUFlb29CLFlBQVksQ0FBQyxnQkFBRCxDQUFaOztBQUNmLFNBQUssSUFBSXYzQixDQUFDLEdBQUdtUCxLQUFiLEVBQW9CblAsQ0FBQyxJQUFJdzNCLEdBQXpCLEVBQThCeDNCLENBQUMsSUFBSSxDQUFuQyxFQUFzQ3MzQixRQUFRLENBQUN0M0IsQ0FBRCxDQUFSOztBQUN0QyxRQUFJdzNCLEdBQUcsR0FBR1AsZUFBZSxHQUFHLENBQTVCLEVBQStCTSxZQUFZLENBQUMsY0FBRCxDQUFaO0FBQy9CRCxZQUFRLENBQUNMLGVBQUQsQ0FBUjtBQUNBLFFBQUl2TCxXQUFKLEVBQWlCNkwsWUFBWSxDQUFDLGVBQUQsQ0FBWjtBQUVqQixXQUFPSCxPQUFQO0FBQ0QsR0FsRG1CLEdBQXBCOztBQW9EQSxRQUFNUyxjQUFjLEdBQUdyMUIseURBQVcsQ0FBQyxNQUFNO0FBQ3ZDLGNBQW1DO0FBQ25DLFFBQUlxVyxJQUFJLEtBQUssQ0FBYixFQUFnQjtBQUNoQixRQUFJLENBQUNxVCxZQUFZLENBQUM3bEIsT0FBbEIsRUFBMkI7QUFDM0IsVUFBTXl4QixlQUFlLEdBQ25CNUwsWUFBWSxDQUFDN2xCLE9BQWIsQ0FBcUIweEIscUJBQXJCLEdBQTZDQyxNQUE3QyxJQUF1RCxDQUR6RDtBQUVBLFFBQUksQ0FBQ0YsZUFBTCxFQUFzQjtBQUV0QixVQUFNRyxTQUFTLEdBQ2IvTCxZQUFZLENBQUM3bEIsT0FBYixDQUFxQjZ4QixhQUFyQixDQUFtQyxnQkFBbkMsS0FDQWhNLFlBQVksQ0FBQzdsQixPQUFiLENBQXFCNnhCLGFBQXJCLENBQW1DLFVBQW5DLENBRkY7QUFHQSxVQUFNQyxPQUFPLEdBQ1hqTSxZQUFZLENBQUM3bEIsT0FBYixDQUFxQjZ4QixhQUFyQixDQUFtQyxnQkFBbkMsS0FDQWhNLFlBQVksQ0FBQzdsQixPQUFiLENBQXFCNnhCLGFBQXJCLENBQW1DLFVBQW5DLENBRkY7O0FBSUEsUUFBSUQsU0FBSixFQUFlO0FBQ2IsWUFBTUcsQ0FBQyxHQUFHSCxTQUFTLENBQUNGLHFCQUFWLEdBQWtDQyxNQUE1QztBQUNBLFVBQUlJLENBQUosRUFBT2hNLGVBQWUsQ0FBQy9sQixPQUFoQixHQUEwQit4QixDQUExQjtBQUNSOztBQUNELFFBQUlELE9BQUosRUFBYTtBQUNYLFlBQU1sbkIsQ0FBQyxHQUFHa25CLE9BQU8sQ0FBQ0oscUJBQVIsR0FBZ0NDLE1BQTFDO0FBQ0EsVUFBSS9tQixDQUFKLEVBQU9rYixZQUFZLENBQUM5bEIsT0FBYixHQUF1QjRLLENBQXZCO0FBQ1I7O0FBRUQsVUFBTW9uQixlQUFlLEdBQUcsRUFBeEI7QUFDQSxVQUFNQyxTQUFTLEdBQ2JSLGVBQWUsR0FBRzFMLGVBQWUsQ0FBQy9sQixPQUFsQyxHQUE0Q2d5QixlQUQ5QztBQUVBLFVBQU1FLFNBQVMsR0FBRzlvQixJQUFJLENBQUMrb0IsS0FBTCxDQUFXRixTQUFTLEdBQUduTSxZQUFZLENBQUM5bEIsT0FBcEMsQ0FBbEI7QUFDQSxVQUFNb3lCLE9BQU8sR0FBR2hwQixJQUFJLENBQUN5bkIsR0FBTCxDQUFTLENBQVQsRUFBWXpuQixJQUFJLENBQUNnb0IsR0FBTCxDQUFTLEVBQVQsRUFBYWMsU0FBYixDQUFaLENBQWhCOztBQUNBLFFBQUlFLE9BQU8sR0FBRyxDQUFWLElBQWVBLE9BQU8sS0FBS3pRLFFBQS9CLEVBQXlDO0FBQ3ZDQyxpQkFBVyxDQUFDd1EsT0FBRCxDQUFYO0FBQ0E3SSxxQkFBZTtBQUNmN0QsbUJBQWEsQ0FBRW5hLENBQUQsSUFBT0EsQ0FBQyxHQUFHLENBQVosQ0FBYjtBQUNEO0FBQ0YsR0FsQ2lDLEVBa0MvQixDQUFDaUgsSUFBRCxFQUFPbVAsUUFBUCxDQWxDK0IsQ0FBbEM7QUFvQ0E3aEIseURBQVMsQ0FBQyxNQUFNO0FBQ2QsY0FBbUM7QUFDbkMweEIsa0JBQWM7O0FBQ2QsVUFBTWEsUUFBUSxHQUFHLE1BQU1iLGNBQWMsRUFBckM7O0FBQ0F2bkIsVUFBTSxDQUFDcW9CLGdCQUFQLENBQXdCLFFBQXhCLEVBQWtDRCxRQUFsQztBQUNBLFdBQU8sTUFBTXBvQixNQUFNLENBQUNzb0IsbUJBQVAsQ0FBMkIsUUFBM0IsRUFBcUNGLFFBQXJDLENBQWI7QUFDRCxHQU5RLEVBTU4sQ0FBQ2IsY0FBRCxDQU5NLENBQVQ7QUFRQTF4Qix5REFBUyxDQUFDLE1BQU07QUFDZCxRQUFJc2YsU0FBUyxJQUFJNU0sSUFBSSxLQUFLLENBQTFCLEVBQTZCO0FBQzdCZ2Ysa0JBQWM7QUFDZixHQUhRLEVBR04sQ0FBQ2hmLElBQUQsRUFBTzRNLFNBQVAsRUFBa0JvUyxjQUFsQixDQUhNLENBQVQ7O0FBS0EsUUFBTWdCLGFBQWEsR0FBSUMsUUFBRCxJQUNwQjtBQUFLLGFBQVMsRUFBRXh4QixxRUFBTSxDQUFDeXhCLFlBQXZCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDRTtBQUFLLGFBQVMsRUFBRXp4QixxRUFBTSxDQUFDMHhCLGFBQXZCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0U7QUFBSyxhQUFTLEVBQUUxeEIscUVBQU0sQ0FBQzJ4QixZQUF2QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBREYsRUFFRTtBQUFLLGFBQVMsRUFBRTN4QixxRUFBTSxDQUFDNHhCLGVBQXZCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsd0RBRkYsQ0FERixFQU9HL0ssZ0JBQWdCLEdBQ2Y7QUFBTSxhQUFTLEVBQUU3bUIscUVBQU0sQ0FBQzZ4QixZQUF4QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGNBRGUsR0FFYixJQVROLENBREYsRUFhRTtBQUFLLGFBQVMsRUFBRTd4QixxRUFBTSxDQUFDOHhCLGFBQXZCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDRTtBQUFLLGFBQVMsRUFBRTl4QixxRUFBTSxDQUFDK3hCLGtCQUF2QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBREYsRUFFRSxNQUFDLDBEQUFEO0FBQVksYUFBUyxFQUFFL3hCLHFFQUFNLENBQUNneUIsVUFBOUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFLE1BQUMsMERBQUQsQ0FBWSxJQUFaO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FERixFQUVFLE1BQUMsd0RBQUQ7QUFBVSxZQUFRLEVBQUV2RixhQUFwQjtBQUFtQyxhQUFTLEVBQUMsT0FBN0M7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFLE1BQUMsd0RBQUQsQ0FBVSxNQUFWO0FBQ0UsV0FBTyxFQUFDLG1CQURWO0FBRUUsTUFBRSxFQUFHLEdBQUUrRSxRQUFTLE1BRmxCO0FBR0UsYUFBUyxFQUFHLFNBQVF4eEIscUVBQU0sQ0FBQ2l5QixXQUFZLEVBSHpDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FLRzVGLGFBTEgsQ0FERixFQVFFLE1BQUMsd0RBQUQsQ0FBVSxJQUFWO0FBQWUsYUFBUyxFQUFDLE9BQXpCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDRSxNQUFDLHdEQUFELENBQVUsSUFBVjtBQUFlLFlBQVEsRUFBQyxZQUF4QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQURGLEVBRUUsTUFBQyx3REFBRCxDQUFVLElBQVY7QUFBZSxZQUFRLEVBQUMsSUFBeEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxVQUZGLEVBR0UsTUFBQyx3REFBRCxDQUFVLElBQVY7QUFBZSxZQUFRLEVBQUMsU0FBeEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUhGLEVBSUUsTUFBQyx3REFBRCxDQUFVLElBQVY7QUFBZSxZQUFRLEVBQUMsU0FBeEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUpGLEVBS0UsTUFBQyx3REFBRCxDQUFVLElBQVY7QUFBZSxZQUFRLEVBQUMsU0FBeEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUxGLENBUkYsQ0FGRixDQUZGLEVBc0JFLE1BQUMsMERBQUQ7QUFBWSxhQUFTLEVBQUVyc0IscUVBQU0sQ0FBQ2d5QixVQUE5QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0UsTUFBQywwREFBRCxDQUFZLElBQVo7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxnQkFERixFQUVFLE1BQUMsd0RBQUQ7QUFBVSxZQUFRLEVBQUVwRixhQUFwQjtBQUFtQyxhQUFTLEVBQUMsT0FBN0M7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFLE1BQUMsd0RBQUQsQ0FBVSxNQUFWO0FBQ0UsV0FBTyxFQUFDLG1CQURWO0FBRUUsTUFBRSxFQUFHLEdBQUU0RSxRQUFTLFdBRmxCO0FBR0UsYUFBUyxFQUFHLFNBQVF4eEIscUVBQU0sQ0FBQ2l5QixXQUFZLEVBSHpDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FLRzFGLGFBTEgsQ0FERixFQVFFLE1BQUMsd0RBQUQsQ0FBVSxJQUFWO0FBQWUsYUFBUyxFQUFDLE9BQXpCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDRSxNQUFDLHdEQUFELENBQVUsSUFBVjtBQUFlLFlBQVEsRUFBQyxZQUF4QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQURGLEVBRUUsTUFBQyx3REFBRCxDQUFVLElBQVY7QUFBZSxZQUFRLEVBQUMsSUFBeEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxVQUZGLEVBR0UsTUFBQyx3REFBRCxDQUFVLElBQVY7QUFBZSxZQUFRLEVBQUMsS0FBeEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQUhGLENBUkYsQ0FGRixDQXRCRixFQXdDRSxNQUFDLDBEQUFEO0FBQVksYUFBUyxFQUFFdnNCLHFFQUFNLENBQUNneUIsVUFBOUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFLE1BQUMsMERBQUQsQ0FBWSxJQUFaO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFERixFQUVFLE1BQUMsc0RBQUQ7QUFDRSxXQUFPLEVBQUMsbUJBRFY7QUFFRSxhQUFTLEVBQUcsU0FBUWh5QixxRUFBTSxDQUFDaXlCLFdBQVksRUFGekM7QUFHRSxXQUFPLEVBQUUxRCxnQkFIWDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBS0dGLGVBTEgsQ0FGRixDQXhDRixDQWJGLEVBaUVFO0FBQUssYUFBUyxFQUFFcnVCLHFFQUFNLENBQUM4eEIsYUFBdkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFO0FBQUssYUFBUyxFQUFFOXhCLHFFQUFNLENBQUMreEIsa0JBQXZCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsY0FERixFQUVFLE1BQUMsMERBQUQ7QUFBWSxhQUFTLEVBQUUveEIscUVBQU0sQ0FBQ2d5QixVQUE5QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0UsTUFBQywwREFBRCxDQUFZLElBQVo7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFERixFQUVFLE1BQUMsc0RBQUQ7QUFDRSxXQUFPLEVBQUMsbUJBRFY7QUFFRSxhQUFTLEVBQUcsU0FBUWh5QixxRUFBTSxDQUFDaXlCLFdBQVksRUFGekM7QUFHRSxXQUFPLEVBQUUsTUFBTTlFLGlCQUFpQixDQUFDLE1BQUQsQ0FIbEM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUtHdEwsb0JBTEgsQ0FGRixDQUZGLEVBYUUsTUFBQywwREFBRDtBQUFZLGFBQVMsRUFBRTdoQixxRUFBTSxDQUFDZ3lCLFVBQTlCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDRSxNQUFDLDBEQUFELENBQVksSUFBWjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHNCQURGLEVBRUUsTUFBQyxzREFBRDtBQUNFLFdBQU8sRUFBQyxtQkFEVjtBQUVFLGFBQVMsRUFBRyxTQUFRaHlCLHFFQUFNLENBQUNpeUIsV0FBWSxFQUZ6QztBQUdFLFdBQU8sRUFBRSxNQUFNOUUsaUJBQWlCLENBQUMsU0FBRCxDQUhsQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBS0dsTCx1QkFMSCxDQUZGLENBYkYsQ0FqRUYsRUEwRkU7QUFBSyxhQUFTLEVBQUVqaUIscUVBQU0sQ0FBQzh4QixhQUF2QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0U7QUFBSyxhQUFTLEVBQUU5eEIscUVBQU0sQ0FBQyt4QixrQkFBdkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFERixFQUVFLE1BQUMsMERBQUQ7QUFBWSxhQUFTLEVBQUUveEIscUVBQU0sQ0FBQ2d5QixVQUE5QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0UsTUFBQywwREFBRCxDQUFZLElBQVo7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQURGLEVBRUU7QUFBSyxhQUFTLEVBQUVoeUIscUVBQU0sQ0FBQ2t5QixXQUF2QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0UsTUFBQyxzREFBRDtBQUNFLFdBQU8sRUFBQyxtQkFEVjtBQUVFLGFBQVMsRUFBRWx5QixxRUFBTSxDQUFDbXlCLFVBRnBCO0FBR0UsV0FBTyxFQUFFckQseUJBSFg7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFERixFQVFFLE1BQUMsc0RBQUQ7QUFDRSxXQUFPLEVBQUMsbUJBRFY7QUFFRSxhQUFTLEVBQUU5dUIscUVBQU0sQ0FBQ215QixVQUZwQjtBQUdFLFdBQU8sRUFBRXBELDBCQUhYO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsd0JBUkYsRUFlRSxNQUFDLHNEQUFEO0FBQ0UsV0FBTyxFQUFDLG1CQURWO0FBRUUsYUFBUyxFQUFFL3VCLHFFQUFNLENBQUNteUIsVUFGcEI7QUFHRSxXQUFPLEVBQUVuRCw4QkFIWDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGtCQWZGLENBRkYsQ0FGRixDQTFGRixDQURGOztBQTRIQSxTQUNFLE1BQUMsaURBQUQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNHLENBQUNqTCxVQUFVLElBQUluRCxZQUFmLEtBQ0M7QUFBSyxhQUFTLEVBQUU1Z0IscUVBQU0sQ0FBQ295QixjQUF2QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0U7QUFDRSxPQUFHLEVBQUMsaUJBRE47QUFFRSxPQUFHLEVBQUMsZUFGTjtBQUdFLGFBQVMsRUFBRXB5QixxRUFBTSxDQUFDcXlCLFdBSHBCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFERixDQUZKLEVBVUUsTUFBQyxxREFBRDtBQUFPLFFBQUksRUFBRXBILGVBQWI7QUFBOEIsVUFBTSxFQUFFSSxzQkFBdEM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFLE1BQUMscURBQUQsQ0FBTyxNQUFQO0FBQWMsZUFBVyxNQUF6QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0UsTUFBQyxxREFBRCxDQUFPLEtBQVA7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx3QkFERixDQURGLEVBSUUsTUFBQyxxREFBRCxDQUFPLElBQVA7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx5Q0FDbUNMLGFBQWEsQ0FBQ3h5QixNQURqRCxXQUVHd3lCLGFBQWEsQ0FBQ3h5QixNQUFkLEdBQXVCLENBQXZCLEdBQTJCLEdBQTNCLEdBQWlDLEVBRnBDLE1BSkYsRUFRRSxNQUFDLHFEQUFELENBQU8sTUFBUDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0UsTUFBQyxzREFBRDtBQUFRLFdBQU8sRUFBQyxRQUFoQjtBQUF5QixXQUFPLEVBQUU4eUIsb0JBQWxDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBREYsRUFJRSxNQUFDLHNEQUFEO0FBQVEsV0FBTyxFQUFDLFdBQWhCO0FBQTRCLFdBQU8sRUFBRUQsc0JBQXJDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsY0FKRixDQVJGLENBVkYsRUE0QkUsTUFBQyxxREFBRDtBQUFPLFFBQUksRUFBRWhKLGVBQWI7QUFBOEIsVUFBTSxFQUFFLE1BQU1DLGtCQUFrQixDQUFDLEtBQUQsQ0FBOUQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFLE1BQUMscURBQUQsQ0FBTyxNQUFQO0FBQWMsZUFBVyxNQUF6QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0UsTUFBQyxxREFBRCxDQUFPLEtBQVA7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxnQkFDVUMsbUJBQW1CLEtBQUssTUFBeEIsR0FBaUMsYUFBakMsR0FBaUQsZ0JBRDNELENBREYsQ0FERixFQU1FLE1BQUMscURBQUQsQ0FBTyxJQUFQO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDRSxNQUFDLDJEQUFEO0FBQ0UsUUFBSSxFQUFDLE1BRFA7QUFFRSxlQUFXLEVBQUMsZ0JBRmQ7QUFHRSxhQUFTLEVBQUMsTUFIWjtBQUlFLFNBQUssRUFBRTBNLGdCQUpUO0FBS0UsWUFBUSxFQUFHbnFCLENBQUQsSUFBTzBvQixtQkFBbUIsQ0FBQzFvQixDQUFDLENBQUNELE1BQUYsQ0FBU2dFLEtBQVYsQ0FMdEM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQURGLEVBUUUsTUFBQywwREFBRDtBQUNFLFdBQU8sRUFBRSxDQUFDdlEsS0FBSyxDQUFDbUcsT0FBTixDQUFjMGpCLE9BQWQsSUFBeUJBLE9BQXpCLEdBQW1DLEVBQXBDLEVBQXdDemhCLE1BQXhDLENBQ040eEIsTUFBRDtBQUFBOztBQUFBLGFBQVksaUJBQUNBLE1BQUQsYUFBQ0EsTUFBRCx1QkFBQ0EsTUFBTSxDQUFFcmtCLElBQVQsdURBQWlCLEVBQWpCLEVBQXFCcVIsV0FBckIsR0FBbUNoZixRQUFuQyxDQUE0QzJ1QixnQkFBZ0IsQ0FBQzNQLFdBQWpCLEVBQTVDLENBQVo7QUFBQSxLQURPLENBRFg7QUFJRSxrQkFBYyxFQUFFbU8sa0JBSmxCO0FBS0UsZUFBVyxFQUFFSyxnQkFMZjtBQU1FLGtCQUFjLEVBQUUsS0FObEI7QUFPRSxrQkFBYyxFQUFFLE1BQU1MLGtCQUFrQixDQUFDLElBQUQsQ0FQMUM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQVJGLENBTkYsQ0E1QkYsRUFzREUsTUFBQyxxREFBRDtBQUFPLFFBQUksRUFBRVUsY0FBYjtBQUE2QixVQUFNLEVBQUUsTUFBTUMsaUJBQWlCLENBQUMsS0FBRCxDQUE1RDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0UsTUFBQyxxREFBRCxDQUFPLE1BQVA7QUFBYyxlQUFXLE1BQXpCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDRSxNQUFDLHFEQUFELENBQU8sS0FBUDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG9CQURGLENBREYsRUFJRSxNQUFDLHFEQUFELENBQU8sSUFBUDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0UsTUFBQywyREFBRDtBQUNFLFFBQUksRUFBQyxNQURQO0FBRUUsZUFBVyxFQUFDLGdCQUZkO0FBR0UsYUFBUyxFQUFDLE1BSFo7QUFJRSxTQUFLLEVBQUVjLGVBSlQ7QUFLRSxZQUFRLEVBQUdwcUIsQ0FBRCxJQUFPNHBCLGtCQUFrQixDQUFDNXBCLENBQUMsQ0FBQ0QsTUFBRixDQUFTZ0UsS0FBVixDQUxyQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBREYsRUFRRSxNQUFDLHlEQUFEO0FBQ0UsVUFBTSxFQUFFb2xCLE1BQU0sQ0FBQ3Z0QixNQUFQLENBQWU2eEIsS0FBRCxJQUNwQixPQUFPQSxLQUFQLEtBQWlCLFFBQWpCLEdBQ0lBLEtBQUssQ0FBQ2pULFdBQU4sR0FBb0JoZixRQUFwQixDQUE2QjR1QixlQUFlLENBQUM1UCxXQUFoQixFQUE3QixDQURKLEdBRUksS0FIRSxDQURWO0FBTUUsaUJBQWEsRUFBRXFQLGlCQU5qQjtBQU9FLGtCQUFjLEVBQUUsTUFBTUEsaUJBQWlCLENBQUMsSUFBRCxDQVB6QztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBUkYsQ0FKRixDQXRERixFQThFRTtBQUFLLGFBQVMsRUFBRTN1QixxRUFBTSxDQUFDdVIsSUFBdkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFO0FBQUssYUFBUyxFQUFFdlIscUVBQU0sQ0FBQ3d5QixTQUF2QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0U7QUFBUSxhQUFTLEVBQUV4eUIscUVBQU0sQ0FBQ3l5QixNQUExQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0U7QUFBSyxhQUFTLEVBQUV6eUIscUVBQU0sQ0FBQzB5QixVQUF2QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0U7QUFDRSxRQUFJLEVBQUMsUUFEUDtBQUVFLGFBQVMsRUFBRTF5QixxRUFBTSxDQUFDMnlCLE1BRnBCO0FBR0UsV0FBTyxFQUFFLE1BQU1sUyxjQUFjLENBQUMsSUFBRCxDQUgvQjtBQUlFLGtCQUFXLGNBSmI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQU1FO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFORixFQU9FO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFQRixFQVFFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFSRixDQURGLEVBV0U7QUFBSyxhQUFTLEVBQUV6Z0IscUVBQU0sQ0FBQzR5QixLQUF2QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0U7QUFDRSxPQUFHLEVBQUMsaUJBRE47QUFFRSxPQUFHLEVBQUMsT0FGTjtBQUdFLGFBQVMsRUFBRTV5QixxRUFBTSxDQUFDNnlCLFNBSHBCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFERixFQU1FO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDRTtBQUFLLGFBQVMsRUFBRTd5QixxRUFBTSxDQUFDOHlCLFNBQXZCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFERixFQUVFO0FBQUssYUFBUyxFQUFFOXlCLHFFQUFNLENBQUMreUIsUUFBdkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx3QkFGRixDQU5GLENBWEYsQ0FERixFQXdCRTtBQUFLLGFBQVMsRUFBRS95QixxRUFBTSxDQUFDZ3pCLFdBQXZCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDRTtBQUFLLGFBQVMsRUFBRWh6QixxRUFBTSxDQUFDaXpCLFlBQXZCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDR3BNLGdCQUFnQixHQUFHLGdCQUFILEdBQXNCLFdBRHpDLENBREYsQ0F4QkYsQ0FERixFQWdDRTtBQUFLLGFBQVMsRUFBRTdtQixxRUFBTSxDQUFDOEssT0FBdkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFO0FBQU8sYUFBUyxFQUFFOUsscUVBQU0sQ0FBQ2t6QixPQUF6QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQW1DM0IsYUFBYSxDQUFDLFNBQUQsQ0FBaEQsQ0FERixFQUVFO0FBQU0sYUFBUyxFQUFFdnhCLHFFQUFNLENBQUNtekIsSUFBeEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFO0FBQUssYUFBUyxFQUFFbnpCLHFFQUFNLENBQUNvekIsU0FBdkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFO0FBQUssYUFBUyxFQUFFcHpCLHFFQUFNLENBQUNxekIsV0FBdkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDRTtBQUFLLGFBQVMsRUFBRXJ6QixxRUFBTSxDQUFDc3pCLFVBQXZCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFERixFQUVFO0FBQUssYUFBUyxFQUFFdHpCLHFFQUFNLENBQUN1ekIsYUFBdkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNHcFYsU0FBUyxHQUFHLGVBQUgsR0FBc0IsR0FBRTJCLElBQUksQ0FBQ3RuQixNQUFPLHFCQURoRCxDQUZGLENBREYsRUFPRTtBQUFLLGFBQVMsRUFBRXdILHFFQUFNLENBQUN3ekIsU0FBdkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxjQUNRamlCLElBRFIsT0FDZTZTLFdBQVcsR0FBSSxNQUFLdUwsZUFBZ0IsR0FBekIsR0FBK0IsTUFBS0EsZUFBZ0IsRUFEOUUsQ0FQRixDQURGLEVBYUU7QUFBSyxhQUFTLEVBQUUzdkIscUVBQU0sQ0FBQ3l6QixTQUF2QjtBQUFrQyxPQUFHLEVBQUU3TyxZQUF2QztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0d6RyxTQUFTLEdBQ1I7QUFBSyxhQUFTLEVBQUVuZSxxRUFBTSxDQUFDMHpCLFlBQXZCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDRTtBQUNFLE9BQUcsRUFBQyxpQkFETjtBQUVFLE9BQUcsRUFBQyxlQUZOO0FBR0UsYUFBUyxFQUFFMXpCLHFFQUFNLENBQUNxeUIsV0FIcEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQURGLEVBTUU7QUFBSyxhQUFTLEVBQUVyeUIscUVBQU0sQ0FBQzJ6QixXQUF2QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBTkYsQ0FEUSxHQVNOalAsU0FBUyxHQUNYO0FBQUssYUFBUyxFQUFFMWtCLHFFQUFNLENBQUM0ekIsVUFBdkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFO0FBQUssYUFBUyxFQUFFNXpCLHFFQUFNLENBQUM2ekIsVUFBdkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxzQkFDZ0JuUCxTQUFTLENBQUNtRSxJQUQxQixNQURGLEVBSUU7QUFBSyxhQUFTLEVBQUU3b0IscUVBQU0sQ0FBQzh6QixZQUF2QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQXNDcFAsU0FBUyxDQUFDaFksT0FBaEQsQ0FKRixFQUtFLE1BQUMsc0RBQUQ7QUFDRSxXQUFPLEVBQUMsbUJBRFY7QUFFRSxRQUFJLEVBQUMsSUFGUDtBQUdFLFdBQU8sRUFBRSxNQUFNO0FBQ2I0YixxQkFBZTtBQUNmN0QsbUJBQWEsQ0FBRW5hLENBQUQsSUFBT0EsQ0FBQyxHQUFHLENBQVosQ0FBYjtBQUNELEtBTkg7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUxGLENBRFcsR0FrQlgsTUFBQyx3REFBRDtBQUNFLFFBQUksRUFBRXdWLElBRFI7QUFFRSxVQUFNLEVBQUVxRCxNQUZWO0FBR0UsT0FBRyxFQUFFOUMsR0FIUDtBQUlFLGNBQVUsRUFBRTJMLFVBSmQ7QUFLRSxnQkFBWSxFQUFFMUIsWUFMaEI7QUFNRSxlQUFXLEVBQUVzQixXQU5mO0FBT0UsY0FBVSxFQUFFN0gsVUFQZDtBQVFFLGFBQVMsRUFBRWdILFNBUmI7QUFTRSxpQkFBYSxFQUFFdkgsYUFUakI7QUFVRSxjQUFVLEVBQUVELFVBVmQ7QUFXRSxpQkFBYSxFQUFFeUgsYUFYakI7QUFZRSxvQkFBZ0IsRUFBRWYsZ0JBWnBCO0FBYUUsV0FBTyxFQUFFdkosUUFiWDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBNUJKLENBYkYsRUEyREU7QUFBSyxhQUFTLEVBQUUxZ0IscUVBQU0sQ0FBQyt6QixXQUF2QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0U7QUFBSyxhQUFTLEVBQUUvekIscUVBQU0sQ0FBQ2cwQixhQUF2QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0UsTUFBQywwREFBRDtBQUFZLFFBQUksRUFBQyxJQUFqQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0UsTUFBQywwREFBRCxDQUFZLElBQVo7QUFDRSxXQUFPLEVBQUUsTUFBTS9QLE9BQU8sQ0FBRTdkLENBQUQsSUFBTytCLElBQUksQ0FBQ3luQixHQUFMLENBQVMsQ0FBVCxFQUFZeHBCLENBQUMsR0FBRyxDQUFoQixDQUFSLENBRHhCO0FBRUUsWUFBUSxFQUFFbUwsSUFBSSxJQUFJLENBRnBCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsZ0JBREYsRUFPR3NlLFdBUEgsRUFRRSxNQUFDLDBEQUFELENBQVksSUFBWjtBQUNFLFdBQU8sRUFBRSxNQUFNNUwsT0FBTyxDQUFFN2QsQ0FBRCxJQUFPQSxDQUFDLEdBQUcsQ0FBWixDQUR4QjtBQUVFLFlBQVEsRUFBRSxDQUFDZ2UsV0FGYjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFlBUkYsQ0FERixDQURGLEVBa0JFLE1BQUMsb0RBQUQ7QUFBTSxhQUFTLEVBQUVwa0IscUVBQU0sQ0FBQ2kwQixTQUF4QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0UsTUFBQywyREFBRDtBQUNFLFFBQUksRUFBRTdTLGNBRFI7QUFFRSxlQUFXLEVBQUMsUUFGZDtBQUdFLGFBQVMsRUFBRXBoQixxRUFBTSxDQUFDazBCLFdBSHBCO0FBSUUsa0JBQVcsUUFKYjtBQUtFLFNBQUssRUFBRW5jLE1BTFQ7QUFNRSxZQUFRLEVBQUVzUyxtQkFOWjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBREYsRUFTRSxNQUFDLDJEQUFEO0FBQ0UsU0FBSyxFQUFFckosTUFEVDtBQUVFLE1BQUUsRUFBQyx5QkFGTDtBQUdFLFFBQUksRUFBRUUsUUFIUjtBQUlFLGdCQUFZLEVBQUUsTUFBTUMsV0FBVyxDQUFDLElBQUQsQ0FKakM7QUFLRSxnQkFBWSxFQUFFLE1BQU1BLFdBQVcsQ0FBQyxLQUFELENBTGpDO0FBTUUsYUFBUyxFQUFFbmhCLHFFQUFNLENBQUNtMEIsWUFOcEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQVFFLE1BQUMsMkRBQUQsQ0FBYSxJQUFiO0FBQ0UsV0FBTyxFQUFFLE1BQU07QUFDYmxULGVBQVMsQ0FBQyxNQUFELENBQVQ7QUFDQUksdUJBQWlCLENBQUMsTUFBRCxDQUFqQjtBQUNELEtBSkg7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQVJGLEVBZ0JFLE1BQUMsMkRBQUQsQ0FBYSxJQUFiO0FBQ0UsV0FBTyxFQUFFLE1BQU07QUFDYkosZUFBUyxDQUFDLE1BQUQsQ0FBVDtBQUNBSSx1QkFBaUIsQ0FBQyxNQUFELENBQWpCO0FBQ0QsS0FKSDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFlBaEJGLEVBd0JFLE1BQUMsMkRBQUQsQ0FBYSxJQUFiO0FBQ0UsV0FBTyxFQUFFLE1BQU07QUFDYkosZUFBUyxDQUFDLFlBQUQsQ0FBVDtBQUNBSSx1QkFBaUIsQ0FBQyxNQUFELENBQWpCO0FBQ0QsS0FKSDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGtCQXhCRixFQWdDRSxNQUFDLDJEQUFELENBQWEsSUFBYjtBQUNFLFdBQU8sRUFBRSxNQUFNO0FBQ2JKLGVBQVMsQ0FBQyxnQkFBRCxDQUFUO0FBQ0FJLHVCQUFpQixDQUFDLE1BQUQsQ0FBakI7QUFDRCxLQUpIO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsc0JBaENGLEVBd0NFLE1BQUMsMkRBQUQsQ0FBYSxJQUFiO0FBQ0UsV0FBTyxFQUFFLE1BQU07QUFDYkosZUFBUyxDQUFDLGVBQUQsQ0FBVDtBQUNBSSx1QkFBaUIsQ0FBQyxNQUFELENBQWpCO0FBQ0QsS0FKSDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQXhDRixFQWdERSxNQUFDLDJEQUFELENBQWEsSUFBYjtBQUNFLFdBQU8sRUFBRSxNQUFNO0FBQ2JKLGVBQVMsQ0FBQyxhQUFELENBQVQ7QUFDQUksdUJBQWlCLENBQUMsTUFBRCxDQUFqQjtBQUNELEtBSkg7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFoREYsRUF3REUsTUFBQywyREFBRCxDQUFhLElBQWI7QUFDRSxXQUFPLEVBQUUsTUFBTTtBQUNiSixlQUFTLENBQUMsS0FBRCxDQUFUO0FBQ0FJLHVCQUFpQixDQUFDLE1BQUQsQ0FBakI7QUFDRCxLQUpIO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0F4REYsQ0FURixDQWxCRixFQTZGRTtBQUFLLGFBQVMsRUFBRXJoQixxRUFBTSxDQUFDbzBCLGFBQXZCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDRSxNQUFDLGFBQUQ7QUFDRSxRQUFJLEVBQUMsV0FEUDtBQUVFLFFBQUksRUFBQyxjQUZQO0FBR0UsU0FBSyxFQUFDLDJCQUhSO0FBSUUsYUFBUyxFQUFFcDBCLHFFQUFNLENBQUNxMEIsWUFKcEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQURGLEVBT0UsTUFBQyxzREFBRDtBQUNFLFdBQU8sRUFBQyxNQURWO0FBRUUsYUFBUyxFQUFHLEdBQUVyMEIscUVBQU0sQ0FBQ3EwQixZQUFhLElBQUdyMEIscUVBQU0sQ0FBQ3MwQixlQUFnQixFQUY5RDtBQUdFLFdBQU8sRUFBRXRQLE9BSFg7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQVBGLEVBY0UsTUFBQyxhQUFEO0FBQ0UsUUFBSSxFQUFDLFNBRFA7QUFFRSxRQUFJLEVBQUMsTUFGUDtBQUdFLFNBQUssRUFBQyw2QkFIUjtBQUlFLGFBQVMsRUFBRWhsQixxRUFBTSxDQUFDcTBCLFlBSnBCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFkRixDQTdGRixDQTNERixDQURGLENBRkYsQ0FoQ0YsQ0FERixFQXVORSxNQUFDLHlEQUFEO0FBQ0UsUUFBSSxFQUFFN1QsV0FEUjtBQUVFLFVBQU0sRUFBRSxNQUFNQyxjQUFjLENBQUMsS0FBRCxDQUY5QjtBQUdFLGFBQVMsRUFBQyxPQUhaO0FBSUUsYUFBUyxFQUFFemdCLHFFQUFNLENBQUN1MEIsYUFKcEI7QUFLRSxVQUFNLE1BTFI7QUFNRSxZQUFRLE1BTlY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQVFFLE1BQUMseURBQUQsQ0FBVyxNQUFYO0FBQWtCLGVBQVcsTUFBN0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFLE1BQUMseURBQUQsQ0FBVyxLQUFYO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFERixDQVJGLEVBV0UsTUFBQyx5REFBRCxDQUFXLElBQVg7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUFpQmhELGFBQWEsQ0FBQyxRQUFELENBQTlCLENBWEYsQ0F2TkYsRUFxT0UsTUFBQyxzRUFBRDtBQUNFLFFBQUksRUFBRTlPLE9BRFI7QUFFRSxVQUFNLEVBQUUsTUFBTUMsVUFBVSxDQUFDLEtBQUQsQ0FGMUI7QUFHRSxVQUFNLEVBQUV1QyxhQUhWO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFyT0YsQ0E5RUYsQ0FERjtBQThURCxDOzs7Ozs7Ozs7OztBQzNqREQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN6RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDZEE7QUFDQTtBQUNBOztBQUVBLE1BQU11UCxXQUFXLEdBQUcsQ0FBQztBQUNuQnJTLFNBRG1CO0FBRW5Cc1MsZ0JBRm1CO0FBR25CQyxhQUhtQjtBQUluQkMsZ0JBSm1CO0FBS25CQyxhQUxtQjtBQUtOO0FBQ2JDLGVBTm1CO0FBT25CQyxhQVBtQjtBQVFuQkM7QUFSbUIsQ0FBRCxLQVNkO0FBQ0osUUFBTUMsV0FBVyxHQUNmLEtBQUtGLFdBQVcsR0FBRyxDQUFILEdBQU8sQ0FBdkIsS0FBNkJELGFBQWEsR0FBRyxDQUFILEdBQU8sQ0FBakQsQ0FERjtBQUVBLFFBQU1JLFdBQVcsR0FBR3QwQixPQUFPLENBQUNnMEIsY0FBYyxJQUFJQyxXQUFuQixDQUEzQjtBQUVBLFNBQ0UsTUFBQyxxREFBRDtBQUFPLFdBQU8sTUFBZDtBQUFlLFlBQVEsTUFBdkI7QUFBd0IsU0FBSyxNQUE3QjtBQUE4QixRQUFJLEVBQUMsSUFBbkM7QUFBd0MsYUFBUyxFQUFFNTBCLHFFQUFNLENBQUNrMUIsV0FBMUQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFERixFQUVHLENBQUNKLFdBQUQsSUFBZ0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQUZuQixFQUdHLENBQUNELGFBQUQsSUFBa0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxjQUhyQixDQURGLENBREYsRUFRRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0dJLFdBQVcsSUFDVjtBQUFJLGFBQVMsRUFBRWoxQixxRUFBTSxDQUFDbTFCLFNBQXRCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDRTtBQUFJLFdBQU8sRUFBRUgsV0FBYjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0U7QUFBSyxhQUFTLEVBQUVoMUIscUVBQU0sQ0FBQ28xQixhQUF2QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0dULGNBQWMsSUFDYixNQUFDLHNEQUFEO0FBQVEsV0FBTyxFQUFDLFdBQWhCO0FBQTRCLFdBQU8sRUFBRUEsY0FBckM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFGSixFQU1HQyxXQUFXLElBQ1YsTUFBQyxzREFBRDtBQUNFLFdBQU8sRUFBQyxTQURWO0FBRUUsV0FBTyxFQUFFQSxXQUZYO0FBR0UsYUFBUyxFQUFDLE1BSFo7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxzQkFQSixDQURGLENBREYsQ0FGSixFQXVCR3pTLE9BQU8sQ0FBQy9oQixHQUFSLENBQWFreUIsTUFBRCxJQUNYO0FBQUksT0FBRyxFQUFFQSxNQUFNLENBQUMza0IsRUFBaEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FBSzJrQixNQUFNLENBQUNya0IsSUFBWixDQURGLEVBRUcsQ0FBQzZtQixXQUFELElBQ0M7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFLE1BQUMsc0RBQUQ7QUFDRSxXQUFPLEVBQUMsTUFEVjtBQUVFLFdBQU8sRUFBRSxNQUFNSixXQUFXLENBQUNwQyxNQUFNLENBQUMza0IsRUFBUixFQUFZMmtCLE1BQU0sQ0FBQ3JrQixJQUFuQixDQUY1QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBSUc4bUIsY0FBYyxHQUFHLE1BQUgsR0FBWSxNQUo3QixDQURGLENBSEosRUFZRyxDQUFDRixhQUFELElBQ0M7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFLE1BQUMsc0RBQUQ7QUFDRSxXQUFPLEVBQUMsU0FEVjtBQUVFLFdBQU8sRUFBRSxNQUFNSixjQUFjLENBQUNuQyxNQUFNLENBQUMza0IsRUFBUixDQUYvQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGNBREYsQ0FiSixDQURELENBdkJILENBUkYsQ0FERjtBQTRERCxDQTFFRDs7QUE0RWU2bUIsMEVBQWYsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaEZBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE1BQU1hLFVBQVUsR0FBRyxDQUFDO0FBQUVwSCxRQUFGO0FBQVVxSCxlQUFWO0FBQXlCWDtBQUF6QixDQUFELEtBQStDO0FBQ2hFLFNBQ0UsbUVBQ0UsTUFBQyxxREFBRDtBQUFPLFdBQU8sTUFBZDtBQUFlLFlBQVEsTUFBdkI7QUFBd0IsU0FBSyxNQUE3QjtBQUE4QixRQUFJLEVBQUMsSUFBbkM7QUFBd0MsYUFBUyxFQUFFMzBCLHFFQUFNLENBQUN1MUIsVUFBMUQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxrQkFERixFQUVFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsY0FGRixDQURGLENBREYsRUFPRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFO0FBQUksV0FBTyxFQUFDLEdBQVo7QUFBZ0IsU0FBSyxFQUFFO0FBQUVwSixlQUFTLEVBQUU7QUFBYixLQUF2QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0UsTUFBQyxzREFBRDtBQUFRLFdBQU8sRUFBQyxXQUFoQjtBQUE0QixXQUFPLEVBQUV3SSxjQUFyQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQURGLENBREYsQ0FERixFQVFHMUcsTUFBTSxDQUFDN3RCLEdBQVAsQ0FBVyxDQUFDbXlCLEtBQUQsRUFBUXRHLEtBQVIsS0FDVjtBQUFJLE9BQUcsRUFBRUEsS0FBVDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUFLc0csS0FBTCxDQURGLEVBRUU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFLE1BQUMsc0RBQUQ7QUFBUSxXQUFPLEVBQUMsU0FBaEI7QUFBMEIsV0FBTyxFQUFFLE1BQU0rQyxhQUFhLENBQUMvQyxLQUFELENBQXREO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsY0FERixDQUZGLENBREQsQ0FSSCxDQVBGLENBREYsQ0FERjtBQStCRCxDQWhDRDs7QUFrQ2U4Qyx5RUFBZixFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUdlLFNBQVNHLFNBQVQsQ0FBbUI7QUFDaEMxVixNQURnQztBQUVoQ3FELFFBRmdDO0FBR2hDOUMsS0FIZ0M7QUFJaEMyTCxZQUpnQztBQUtoQzFCLGNBTGdDO0FBTWhDc0IsYUFOZ0M7QUFPaEM3SCxZQVBnQztBQVFoQ2dILFdBUmdDO0FBU2hDdkgsZUFUZ0M7QUFVaENELFlBVmdDO0FBV2hDeUgsZUFYZ0M7QUFZaENmLGtCQVpnQztBQWFoQ3dMLFNBQU8sR0FBRztBQWJzQixDQUFuQixFQWNaO0FBQ0Q7QUFDQSxRQUFNO0FBQUEsT0FBQ0MsYUFBRDtBQUFBLE9BQWdCQztBQUFoQixNQUFvQ3I4QixzREFBUSxDQUFDLElBQUQsQ0FBbEQ7QUFDQSxRQUFNO0FBQUEsT0FBQ3M4QixRQUFEO0FBQUEsT0FBV0M7QUFBWCxNQUEwQnY4QixzREFBUSxDQUFDLEtBQUQsQ0FBeEM7QUFDQSxRQUFNdzhCLGFBQWEsR0FBRzk2QixvREFBTSxDQUFDLElBQUQsQ0FBNUI7QUFDQSxRQUFNKzZCLHFCQUFxQixHQUFHLzZCLG9EQUFNLENBQUMsS0FBRCxDQUFwQztBQUVBNkQseURBQVMsQ0FBQyxNQUFNO0FBQ2QsY0FBbUMsT0FBTzdCLFNBQVA7QUFDbkMsVUFBTWc1QixLQUFLLEdBQUdodEIsTUFBTSxDQUFDaXRCLFVBQVAsQ0FBa0Isb0JBQWxCLENBQWQ7O0FBQ0EsVUFBTXZQLE1BQU0sR0FBRyxNQUFNbVAsV0FBVyxDQUFDRyxLQUFLLENBQUM1YyxPQUFQLENBQWhDOztBQUNBc04sVUFBTTs7QUFDTixRQUFJc1AsS0FBSyxDQUFDM0UsZ0JBQVYsRUFBNEI7QUFDMUIyRSxXQUFLLENBQUMzRSxnQkFBTixDQUF1QixRQUF2QixFQUFpQzNLLE1BQWpDO0FBQ0EsYUFBTyxNQUFNc1AsS0FBSyxDQUFDMUUsbUJBQU4sQ0FBMEIsUUFBMUIsRUFBb0M1SyxNQUFwQyxDQUFiO0FBQ0Q7O0FBQ0RzUCxTQUFLLENBQUNFLFdBQU4sQ0FBa0J4UCxNQUFsQjtBQUNBLFdBQU8sTUFBTXNQLEtBQUssQ0FBQ0csY0FBTixDQUFxQnpQLE1BQXJCLENBQWI7QUFDRCxHQVhRLEVBV04sRUFYTSxDQUFULENBUEMsQ0FvQkQ7O0FBQ0EsUUFBTXlFLGdCQUFnQixHQUFJeGQsRUFBRCxJQUFRO0FBQy9Cc2Msb0JBQWdCLENBQUVtTSxpQkFBRCxJQUNmQSxpQkFBaUIsQ0FBQzkxQixRQUFsQixDQUEyQnFOLEVBQTNCLElBQ0l5b0IsaUJBQWlCLENBQUMxMUIsTUFBbEIsQ0FBMEI2cUIsTUFBRCxJQUFZQSxNQUFNLEtBQUs1ZCxFQUFoRCxDQURKLEdBRUksQ0FBQyxHQUFHeW9CLGlCQUFKLEVBQXVCem9CLEVBQXZCLENBSFUsQ0FBaEI7QUFLRCxHQU5ELENBckJDLENBNkJEOzs7QUFDQSxRQUFNMmQsb0JBQW9CLEdBQUcsTUFBTTtBQUNqQyxRQUFJTixhQUFhLENBQUN4eUIsTUFBZCxHQUF1QixDQUEzQixFQUE4QjtBQUM1Qm96QixpQkFBVyxDQUFDLElBQUQsRUFBTyxJQUFQLEVBQWFaLGFBQWIsRUFBNEIsZ0JBQTVCLENBQVg7QUFDRDtBQUNGLEdBSkQ7O0FBTUEsUUFBTXFMLGNBQWMsR0FBSXBvQixJQUFELElBQVUsTUFBTTtBQUNyQyxRQUFJLENBQUMybkIsUUFBTCxFQUFlOztBQUNmLFFBQUlFLGFBQWEsQ0FBQy8yQixPQUFsQixFQUEyQjtBQUN6QnNKLGtCQUFZLENBQUN5dEIsYUFBYSxDQUFDLzJCLE9BQWYsQ0FBWjtBQUNEOztBQUNEKzJCLGlCQUFhLENBQUMvMkIsT0FBZCxHQUF3QmdKLFVBQVUsQ0FBQyxNQUFNO0FBQ3ZDZ3VCLDJCQUFxQixDQUFDaDNCLE9BQXRCLEdBQWdDLElBQWhDO0FBQ0E0MkIsc0JBQWdCLENBQUMxbkIsSUFBRCxDQUFoQjtBQUNELEtBSGlDLEVBRy9CLEdBSCtCLENBQWxDO0FBSUQsR0FURDs7QUFXQSxRQUFNcW9CLGVBQWUsR0FBRyxNQUFNO0FBQzVCLFFBQUlSLGFBQWEsQ0FBQy8yQixPQUFsQixFQUEyQjtBQUN6QnNKLGtCQUFZLENBQUN5dEIsYUFBYSxDQUFDLzJCLE9BQWYsQ0FBWjtBQUNBKzJCLG1CQUFhLENBQUMvMkIsT0FBZCxHQUF3QixJQUF4QjtBQUNEO0FBQ0YsR0FMRDs7QUFPQSxRQUFNdzNCLGdCQUFnQixHQUFHLE1BQU07QUFDN0JSLHlCQUFxQixDQUFDaDNCLE9BQXRCLEdBQWdDLEtBQWhDO0FBQ0E0MkIsb0JBQWdCLENBQUMsSUFBRCxDQUFoQjtBQUNELEdBSEQ7O0FBS0EsUUFBTWEsWUFBWSxHQUFHcnVCLElBQUksQ0FBQ3luQixHQUFMLENBQVMsQ0FBVCxFQUFZNkYsT0FBTyxHQUFHM1YsSUFBSSxDQUFDdG5CLE1BQTNCLENBQXJCO0FBRUEsU0FDRSxtRUFDRTtBQUFLLGFBQVMsRUFBRXdILG1FQUFNLENBQUN5MkIsZUFBdkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFLE1BQUMscURBQUQ7QUFDRSxXQUFPLE1BRFQ7QUFFRSxZQUFRLE1BRlY7QUFHRSxTQUFLLE1BSFA7QUFJRSxRQUFJLEVBQUMsSUFKUDtBQUtFLGFBQVMsRUFBRyxRQUFPejJCLG1FQUFNLENBQUMwMkIsVUFBVyxFQUx2QztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBT0U7QUFBTyxhQUFTLEVBQUUxMkIsbUVBQU0sQ0FBQzIyQixZQUF6QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNHeFQsTUFBTSxDQUFDL2lCLEdBQVAsQ0FBVyxDQUFDaWEsSUFBRCxFQUFPNFIsS0FBUCxLQUNWO0FBQ0UsU0FBSyxFQUFFRCxVQUFVLENBQUNDLEtBQUQsQ0FEbkI7QUFFRSxlQUFXLEVBQUUsTUFBTXpJLGFBQWEsQ0FBQ3lJLEtBQUQsQ0FGbEM7QUFHRSxjQUFVLEVBQUUsTUFBTXpJLGFBQWEsQ0FBQyxJQUFELENBSGpDO0FBSUUsV0FBTyxFQUFFLE1BQU04RyxZQUFZLENBQUMyQixLQUFELENBSjdCO0FBS0UsT0FBRyxFQUFFQSxLQUxQO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FPRzVSLElBUEgsQ0FERCxDQURILEVBWUU7QUFBSSxhQUFTLEVBQUVyYSxtRUFBTSxDQUFDNDJCLFNBQXRCO0FBQWlDLFNBQUssRUFBRTtBQUFFekssZUFBUyxFQUFFO0FBQWIsS0FBeEM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNHbkIsYUFBYSxDQUFDeHlCLE1BQWQsR0FBdUIsQ0FBdkIsR0FDQyxNQUFDLHNEQUFEO0FBQ0UsV0FBTyxFQUFDLFFBRFY7QUFFRSxXQUFPLEVBQUU4eUIsb0JBRlg7QUFHRSxZQUFRLEVBQUV2SCxVQUhaO0FBSUUsUUFBSSxFQUFDLElBSlA7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSwwQkFNb0JpSCxhQUFhLENBQUN4eUIsTUFObEMsTUFERCxHQVVDLFFBWEosQ0FaRixDQURGLENBUEYsRUFvQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNHc25CLElBQUksQ0FBQzFmLEdBQUwsQ0FBUyxDQUFDaWEsSUFBRCxFQUFPNFIsS0FBUCxLQUNSO0FBQ0UsT0FBRyxFQUFFQSxLQURQO0FBRUUsV0FBTyxFQUFHbm5CLENBQUQsSUFBTztBQUNkLFVBQUlpeEIscUJBQXFCLENBQUNoM0IsT0FBMUIsRUFBbUM7QUFDakNnM0IsNkJBQXFCLENBQUNoM0IsT0FBdEIsR0FBZ0MsS0FBaEM7QUFDQTtBQUNELE9BSmEsQ0FLZDs7O0FBQ0EsVUFBSStGLENBQUMsQ0FBQ0QsTUFBRixDQUFTb1osSUFBVCxLQUFrQixVQUF0QixFQUFrQztBQUNoQzhNLGlCQUFTLENBQUMxUSxJQUFELENBQVQ7QUFDRDtBQUNGLEtBWEg7QUFZRSxnQkFBWSxFQUFFZ2MsY0FBYyxDQUFDaGMsSUFBSSxDQUFDcE0sSUFBTixDQVo5QjtBQWFFLGNBQVUsRUFBRXFvQixlQWJkO0FBY0UsaUJBQWEsRUFBRUEsZUFkakI7QUFlRSxlQUFXLEVBQUVBLGVBZmY7QUFnQkUsYUFBUyxFQUFDLGVBaEJaO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FrQkU7QUFBSSxTQUFLLEVBQUU7QUFBRW5LLGVBQVMsRUFBRSxRQUFiO0FBQXVCQyxZQUFNLEVBQUU7QUFBL0IsS0FBWDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0U7QUFBSyxhQUFTLEVBQUVwc0IsbUVBQU0sQ0FBQzYyQixTQUF2QjtBQUFrQyxTQUFLLEVBQUV4YyxJQUFJLENBQUNwTSxJQUE5QztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0dvTSxJQUFJLENBQUNwTSxJQURSLENBREYsQ0FsQkYsRUF1QkU7QUFBSSxTQUFLLEVBQUU7QUFBRWtlLGVBQVMsRUFBRSxRQUFiO0FBQXVCQyxZQUFNLEVBQUU7QUFBL0IsS0FBWDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0U7QUFBSyxhQUFTLEVBQUVwc0IsbUVBQU0sQ0FBQzYyQixTQUF2QjtBQUFrQyxTQUFLLEVBQUVDLHFFQUFVLENBQUN6YyxJQUFJLENBQUNxTixJQUFOLENBQW5EO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDR29QLHFFQUFVLENBQUN6YyxJQUFJLENBQUNxTixJQUFOLENBRGIsQ0FERixDQXZCRixFQTRCRTtBQUFJLFNBQUssRUFBRTtBQUFFeUUsZUFBUyxFQUFFLFFBQWI7QUFBdUJDLFlBQU0sRUFBRTtBQUEvQixLQUFYO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDRTtBQUNFLGFBQVMsRUFBRXBzQixtRUFBTSxDQUFDNjJCLFNBRHBCO0FBRUUsU0FBSyxFQUNIeGMsSUFBSSxDQUFDdU4sVUFBTCxJQUFtQnZOLElBQUksQ0FBQ3VOLFVBQUwsQ0FBZ0JwdkIsTUFBaEIsR0FBeUIsQ0FBNUMsR0FDSTZoQixJQUFJLENBQUN1TixVQUFMLENBQWdCdk4sSUFBSSxDQUFDdU4sVUFBTCxDQUFnQnB2QixNQUFoQixHQUF5QixDQUF6QyxFQUE0Q3V2QixTQURoRCxHQUVJLEtBTFI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQVFHMU4sSUFBSSxDQUFDdU4sVUFBTCxJQUFtQnZOLElBQUksQ0FBQ3VOLFVBQUwsQ0FBZ0JwdkIsTUFBaEIsR0FBeUIsQ0FBNUMsR0FDRzZoQixJQUFJLENBQUN1TixVQUFMLENBQWdCdk4sSUFBSSxDQUFDdU4sVUFBTCxDQUFnQnB2QixNQUFoQixHQUF5QixDQUF6QyxFQUE0Q3V2QixTQUQvQyxHQUVHLEtBVk4sQ0FERixDQTVCRixFQTBDRTtBQUFJLFNBQUssRUFBRTtBQUFFb0UsZUFBUyxFQUFFLFFBQWI7QUFBdUJDLFlBQU0sRUFBRTtBQUEvQixLQUFYO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDRTtBQUFLLGFBQVMsRUFBRXBzQixtRUFBTSxDQUFDNjJCLFNBQXZCO0FBQWtDLFNBQUssRUFBRXhjLElBQUksQ0FBQzJOLEVBQTlDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDRzNOLElBQUksQ0FBQzJOLEVBRFIsQ0FERixDQTFDRixFQStDRTtBQUFJLFNBQUssRUFBRTtBQUFFbUUsZUFBUyxFQUFFLFFBQWI7QUFBdUJDLFlBQU0sRUFBRTtBQUEvQixLQUFYO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDRTtBQUFLLGFBQVMsRUFBRXBzQixtRUFBTSxDQUFDNjJCLFNBQXZCO0FBQWtDLFNBQUssRUFBRXhjLElBQUksQ0FBQzROLEVBQTlDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDRzVOLElBQUksQ0FBQzROLEVBRFIsQ0FERixDQS9DRixFQW9ERTtBQUFJLGFBQVMsRUFBRWpvQixtRUFBTSxDQUFDNDJCLFNBQXRCO0FBQWlDLFNBQUssRUFBRTtBQUFFekssZUFBUyxFQUFFO0FBQWIsS0FBeEM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFLE1BQUMsb0RBQUQsQ0FBTSxLQUFOO0FBQ0UsUUFBSSxFQUFDLFVBRFA7QUFFRSxXQUFPLEVBQUVuQixhQUFhLENBQUMxcUIsUUFBZCxDQUF1QitaLElBQUksQ0FBQzFNLEVBQTVCLENBRlg7QUFHRSxZQUFRLEVBQUc3SSxDQUFELElBQU87QUFDZkEsT0FBQyxDQUFDaW5CLGVBQUYsR0FEZSxDQUNNO0FBQ3JCOztBQUNBOUIsc0JBQWdCLENBQUVtTSxpQkFBRCxJQUNmQSxpQkFBaUIsQ0FBQzkxQixRQUFsQixDQUEyQitaLElBQUksQ0FBQzFNLEVBQWhDLElBQ0l5b0IsaUJBQWlCLENBQUMxMUIsTUFBbEIsQ0FBMEJpTixFQUFELElBQVFBLEVBQUUsS0FBSzBNLElBQUksQ0FBQzFNLEVBQTdDLENBREosR0FFSSxDQUFDLEdBQUd5b0IsaUJBQUosRUFBdUIvYixJQUFJLENBQUMxTSxFQUE1QixDQUhVLENBQWhCO0FBS0QsS0FYSDtBQVlFLGtCQUFhLFVBQVMwTSxJQUFJLENBQUNwTSxJQUFLLEVBWmxDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFERixDQXBERixDQURELENBREgsRUF3RUd1b0IsWUFBWSxHQUFHLENBQWYsSUFDQ2wrQixLQUFLLENBQUNDLElBQU4sQ0FBVztBQUFFQyxVQUFNLEVBQUVnK0I7QUFBVixHQUFYLEVBQXFDcDJCLEdBQXJDLENBQXlDLENBQUMzSCxDQUFELEVBQUl3ekIsS0FBSixLQUN2QztBQUFJLE9BQUcsRUFBRyxTQUFRQSxLQUFNLEVBQXhCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDRTtBQUFJLFdBQU8sRUFBRTlJLE1BQU0sQ0FBQzNxQixNQUFQLEdBQWdCLENBQTdCO0FBQWdDLFNBQUssRUFBRTtBQUFFMnpCLGVBQVMsRUFBRTtBQUFiLEtBQXZDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFERixDQURGLENBekVKLENBcENGLENBREYsQ0FERixFQXlIR3lKLFFBQVEsSUFBSUYsYUFBWixJQUNDO0FBQ0UsYUFBUyxFQUFFMTFCLG1FQUFNLENBQUMrMkIsZ0JBRHBCO0FBRUUsV0FBTyxFQUFFUixnQkFGWDtBQUdFLFFBQUksRUFBQyxRQUhQO0FBSUUsWUFBUSxFQUFFLENBSlo7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQU1FO0FBQUssYUFBUyxFQUFFdjJCLG1FQUFNLENBQUNnM0IsYUFBdkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUF1Q3RCLGFBQXZDLENBTkYsQ0ExSEosQ0FERjtBQXNJRCxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2TkQ7QUFDQTtBQUVPLGVBQWV1Qix5QkFBZixHQUEyQztBQUNoRCxRQUFNM1IsRUFBRSxHQUFHaHFCLHlEQUFRLENBQUNDLFNBQVQsRUFBWDtBQUNBLFFBQU0yN0IsYUFBYSxHQUFHLE1BQU01UixFQUFFLENBQUM5cEIsVUFBSCxDQUFjLE1BQWQsRUFBc0JDLEdBQXRCLEVBQTVCO0FBQ0EsUUFBTWlqQixLQUFLLEdBQUcsTUFBTW5XLE9BQU8sQ0FBQzhGLEdBQVIsQ0FDbEI2b0IsYUFBYSxDQUFDOVEsSUFBZCxDQUFtQmhtQixHQUFuQixDQUF1QixNQUFPKzJCLE9BQVAsSUFBbUI7QUFBQTs7QUFDeEMsVUFBTUMsUUFBUSxHQUFHRCxPQUFPLENBQUN6N0IsSUFBUixFQUFqQjtBQUNBMDdCLFlBQVEsQ0FBQ3pwQixFQUFULEdBQWN3cEIsT0FBTyxDQUFDeHBCLEVBQXRCLENBRndDLENBRWQ7O0FBQzFCLFVBQU0wcEIsUUFBUSxHQUFJbndCLEdBQUQsSUFBUztBQUN4QixVQUFJLENBQUNBLEdBQUwsRUFBVSxPQUFPLElBQVA7QUFDVixVQUFJLE9BQU9BLEdBQVAsS0FBZSxRQUFuQixFQUE2QixPQUFPQSxHQUFQO0FBQzdCLFVBQUlBLEdBQUcsWUFBWTVMLHlEQUFRLENBQUNDLFNBQVQsQ0FBbUIrN0IsaUJBQXRDLEVBQXlELE9BQU9wd0IsR0FBRyxDQUFDeUcsRUFBWDtBQUN6RCxVQUFJekcsR0FBRyxDQUFDeUcsRUFBUixFQUFZLE9BQU96RyxHQUFHLENBQUN5RyxFQUFYO0FBQ1osYUFBTyxJQUFQO0FBQ0QsS0FORDs7QUFPQXlwQixZQUFRLENBQUM5UCxZQUFULHdCQUNFK1AsUUFBUSxDQUFDRCxRQUFELGFBQUNBLFFBQUQsdUJBQUNBLFFBQVEsQ0FBRWpOLFVBQVgsQ0FEVixpREFDb0NpTixRQURwQyxhQUNvQ0EsUUFEcEMsdUJBQ29DQSxRQUFRLENBQUU5UCxZQUQ5Qyx1Q0FDOEQsSUFEOUQ7QUFFQThQLFlBQVEsQ0FBQzdQLGVBQVQsMEJBQ0U4UCxRQUFRLENBQUNELFFBQUQsYUFBQ0EsUUFBRCx1QkFBQ0EsUUFBUSxDQUFFaE4sYUFBWCxDQURWLG1EQUN1Q2dOLFFBRHZDLGFBQ3VDQSxRQUR2Qyx1QkFDdUNBLFFBQVEsQ0FBRTdQLGVBRGpELHlDQUNvRSxJQURwRSxDQVp3QyxDQWN4Qzs7QUFDQSxVQUFNZ1EsZ0JBQWdCLEdBQUcsTUFBT3J3QixHQUFQLElBQWU7QUFDdEMsVUFBSSxDQUFDQSxHQUFMLEVBQVUsT0FBTyxJQUFQOztBQUNWLFVBQUksT0FBT0EsR0FBRyxDQUFDekwsR0FBWCxLQUFtQixVQUF2QixFQUFtQztBQUNqQyxjQUFNSixHQUFHLEdBQUcsTUFBTTZMLEdBQUcsQ0FBQ3pMLEdBQUosRUFBbEI7QUFDQSxlQUFPSixHQUFHLENBQUN1eUIsTUFBSixHQUFhdnlCLEdBQUcsQ0FBQ0ssSUFBSixFQUFiLEdBQTBCLElBQWpDO0FBQ0Q7O0FBQ0QsVUFBSSxPQUFPd0wsR0FBUCxLQUFlLFFBQW5CLEVBQTZCO0FBQzNCLGNBQU03TCxHQUFHLEdBQUcsTUFBTWlxQixFQUFFLENBQUM5cEIsVUFBSCxDQUFjLFNBQWQsRUFBeUJILEdBQXpCLENBQTZCNkwsR0FBN0IsRUFBa0N6TCxHQUFsQyxFQUFsQjtBQUNBLGVBQU9KLEdBQUcsQ0FBQ3V5QixNQUFKLEdBQWF2eUIsR0FBRyxDQUFDSyxJQUFKLEVBQWIsR0FBMEIsSUFBakM7QUFDRDs7QUFDRCxVQUFJd0wsR0FBSixhQUFJQSxHQUFKLGVBQUlBLEdBQUcsQ0FBRXlHLEVBQVQsRUFBYTtBQUNYLGNBQU10UyxHQUFHLEdBQUcsTUFBTWlxQixFQUFFLENBQUM5cEIsVUFBSCxDQUFjLFNBQWQsRUFBeUJILEdBQXpCLENBQTZCNkwsR0FBRyxDQUFDeUcsRUFBakMsRUFBcUNsUyxHQUFyQyxFQUFsQjtBQUNBLGVBQU9KLEdBQUcsQ0FBQ3V5QixNQUFKLEdBQWF2eUIsR0FBRyxDQUFDSyxJQUFKLEVBQWIsR0FBMEIsSUFBakM7QUFDRDs7QUFDRCxhQUFPLElBQVA7QUFDRCxLQWZEOztBQWlCQSxVQUFNODdCLFVBQVUsR0FBR0osUUFBUSxDQUFDSyxPQUFULElBQW9CTCxRQUFRLENBQUNNLFdBQWhEO0FBQ0EsVUFBTUMsaUJBQWlCLEdBQ3JCUCxRQUFRLENBQUNRLGNBQVQsSUFBMkJSLFFBQVEsQ0FBQ1MsY0FEdEM7QUFHQSxVQUFNcFksV0FBVyxHQUFHLE1BQU04WCxnQkFBZ0IsQ0FBQ0MsVUFBRCxDQUExQztBQUNBSixZQUFRLENBQUMzWCxXQUFULEdBQXVCQSxXQUFXLElBQUksRUFBdEM7O0FBQ0EsUUFBSUEsV0FBSixhQUFJQSxXQUFKLGVBQUlBLFdBQVcsQ0FBRTZTLE1BQWpCLEVBQXlCO0FBQ3ZCLFlBQU13RixTQUFTLEdBQUdyWSxXQUFXLENBQUM2UyxNQUE5QjtBQUNBLFlBQU01RSxRQUFRLEdBQUcySixRQUFRLENBQUNTLFNBQUQsQ0FBekI7O0FBQ0EsVUFBSXBLLFFBQVEsSUFBSSxDQUFDMEosUUFBUSxDQUFDOVAsWUFBMUIsRUFBd0M7QUFDdEM4UCxnQkFBUSxDQUFDOVAsWUFBVCxHQUF3Qm9HLFFBQXhCO0FBQ0Q7O0FBQ0QsVUFBSSxRQUFPb0ssU0FBUCxhQUFPQSxTQUFQLHVCQUFPQSxTQUFTLENBQUVyOEIsR0FBbEIsTUFBMEIsVUFBOUIsRUFBMEM7QUFDeEMsY0FBTXM4QixTQUFTLEdBQUcsTUFBTUQsU0FBUyxDQUFDcjhCLEdBQVYsRUFBeEI7QUFDQTI3QixnQkFBUSxDQUFDM1gsV0FBVCxDQUFxQnVZLE1BQXJCLEdBQThCRCxTQUFTLENBQUNuSyxNQUFWLEdBQzFCbUssU0FBUyxDQUFDcjhCLElBQVYsR0FBaUJ1UyxJQURTLEdBRTFCLEVBRko7QUFHRDtBQUNGOztBQUVELFVBQU15UixrQkFBa0IsR0FBRyxNQUFNNlgsZ0JBQWdCLENBQUNJLGlCQUFELENBQWpEO0FBQ0FQLFlBQVEsQ0FBQzFYLGtCQUFULEdBQThCQSxrQkFBa0IsSUFBSSxFQUFwRDs7QUFDQSxRQUFJQSxrQkFBSixhQUFJQSxrQkFBSixlQUFJQSxrQkFBa0IsQ0FBRTRTLE1BQXhCLEVBQWdDO0FBQzlCLFlBQU13RixTQUFTLEdBQUdwWSxrQkFBa0IsQ0FBQzRTLE1BQXJDO0FBQ0EsWUFBTTVFLFFBQVEsR0FBRzJKLFFBQVEsQ0FBQ1MsU0FBRCxDQUF6Qjs7QUFDQSxVQUFJcEssUUFBUSxJQUFJLENBQUMwSixRQUFRLENBQUM3UCxlQUExQixFQUEyQztBQUN6QzZQLGdCQUFRLENBQUM3UCxlQUFULEdBQTJCbUcsUUFBM0I7QUFDRDs7QUFDRCxVQUFJLFFBQU9vSyxTQUFQLGFBQU9BLFNBQVAsdUJBQU9BLFNBQVMsQ0FBRXI4QixHQUFsQixNQUEwQixVQUE5QixFQUEwQztBQUN4QyxjQUFNczhCLFNBQVMsR0FBRyxNQUFNRCxTQUFTLENBQUNyOEIsR0FBVixFQUF4QjtBQUNBMjdCLGdCQUFRLENBQUMxWCxrQkFBVCxDQUE0QnNZLE1BQTVCLEdBQXFDRCxTQUFTLENBQUNuSyxNQUFWLEdBQ2pDbUssU0FBUyxDQUFDcjhCLElBQVYsR0FBaUJ1UyxJQURnQixHQUVqQyxFQUZKO0FBR0Q7QUFDRjs7QUFDRCxXQUFPbXBCLFFBQVA7QUFDRCxHQXBFRCxDQURrQixDQUFwQjtBQXVFQSxTQUFPMVksS0FBUDtBQUNELEMsQ0FFRDtBQUNBOztBQUNPLGVBQWU2Syw2QkFBZixDQUE2QztBQUNsRDdJLFVBQVEsR0FBRyxFQUR1QztBQUVsRHVJLGVBQWEsR0FBRyxJQUZrQztBQUdsRE8sYUFBVyxHQUFHLEtBSG9DO0FBSWxEQyxVQUFRLEdBQUcsSUFKdUM7QUFLbERFLGtCQUFnQixHQUFHLElBTCtCO0FBTWxENVIsUUFBTSxHQUFHO0FBTnlDLElBT2hELEVBUEcsRUFPQztBQUNOLFFBQU11TixFQUFFLEdBQUdocUIseURBQVEsQ0FBQ0MsU0FBVCxFQUFYO0FBQ0EsUUFBTXdxQixLQUFLLEdBQUdyRixRQUFRLEdBQUcsQ0FBekI7O0FBRUEsUUFBTTJXLFFBQVEsR0FBSW53QixHQUFELElBQVM7QUFDeEIsUUFBSSxDQUFDQSxHQUFMLEVBQVUsT0FBTyxJQUFQO0FBQ1YsUUFBSSxPQUFPQSxHQUFQLEtBQWUsUUFBbkIsRUFBNkIsT0FBT0EsR0FBUDtBQUM3QixRQUFJQSxHQUFHLFlBQVk1TCx5REFBUSxDQUFDQyxTQUFULENBQW1CKzdCLGlCQUF0QyxFQUF5RCxPQUFPcHdCLEdBQUcsQ0FBQ3lHLEVBQVg7QUFDekQsUUFBSXpHLEdBQUcsQ0FBQ3lHLEVBQVIsRUFBWSxPQUFPekcsR0FBRyxDQUFDeUcsRUFBWDtBQUNaLFdBQU8sSUFBUDtBQUNELEdBTkQ7O0FBUUEsUUFBTXNxQixxQkFBcUIsR0FBRyxDQUFDLEtBQUQsRUFBUSxVQUFSLEVBQW9CLE9BQXBCLEVBQTZCLFFBQTdCLEVBQXVDLE1BQXZDLENBQTlCOztBQUNBLFFBQU1DLGlCQUFpQixHQUFJaG9CLEtBQUQsSUFDeEIsT0FBT0EsS0FBSyxDQUFDOFEsTUFBYixLQUF3QixVQUF4QixHQUNJOVEsS0FBSyxDQUFDOFEsTUFBTixDQUFhLEdBQUdpWCxxQkFBaEIsQ0FESixHQUVJL25CLEtBSE47O0FBS0EsUUFBTWlvQixTQUFTLEdBQUcsQ0FBQ2hCLE9BQUQsRUFBVWlCLFVBQVYsRUFBc0JDLGlCQUF0QixLQUE0QztBQUFBOztBQUM1RCxVQUFNakIsUUFBUSxHQUFHRCxPQUFPLENBQUN6N0IsSUFBUixFQUFqQjtBQUNBMDdCLFlBQVEsQ0FBQ3pwQixFQUFULEdBQWN3cEIsT0FBTyxDQUFDeHBCLEVBQXRCLENBRjRELENBRWxDOztBQUMxQnlwQixZQUFRLENBQUM5UCxZQUFULDBCQUNFK1AsUUFBUSxDQUFDRCxRQUFELGFBQUNBLFFBQUQsdUJBQUNBLFFBQVEsQ0FBRWpOLFVBQVgsQ0FEVixtREFDb0NpTixRQURwQyxhQUNvQ0EsUUFEcEMsdUJBQ29DQSxRQUFRLENBQUU5UCxZQUQ5Qyx5Q0FDOEQsSUFEOUQ7QUFFQThQLFlBQVEsQ0FBQzdQLGVBQVQsMEJBQ0U4UCxRQUFRLENBQUNELFFBQUQsYUFBQ0EsUUFBRCx1QkFBQ0EsUUFBUSxDQUFFaE4sYUFBWCxDQURWLG1EQUN1Q2dOLFFBRHZDLGFBQ3VDQSxRQUR2Qyx1QkFDdUNBLFFBQVEsQ0FBRTdQLGVBRGpELHlDQUNvRSxJQURwRTtBQUdBLFVBQU1pUSxVQUFVLEdBQUdKLFFBQVEsQ0FBQ0ssT0FBVCxJQUFvQkwsUUFBUSxDQUFDTSxXQUFoRDtBQUNBLFVBQU1DLGlCQUFpQixHQUNyQlAsUUFBUSxDQUFDUSxjQUFULElBQTJCUixRQUFRLENBQUNTLGNBRHRDO0FBR0EsVUFBTVMsU0FBUyxHQUFHakIsUUFBUSxDQUFDRyxVQUFELENBQTFCO0FBQ0EsVUFBTWUsZ0JBQWdCLEdBQUdsQixRQUFRLENBQUNNLGlCQUFELENBQWpDO0FBRUEsVUFBTWxZLFdBQVcsR0FBRzZZLFNBQVMsR0FBR0YsVUFBVSxDQUFDRSxTQUFELENBQWIsR0FBMkIsSUFBeEQ7QUFDQSxVQUFNNVksa0JBQWtCLEdBQUc2WSxnQkFBZ0IsR0FDdkNGLGlCQUFpQixDQUFDRSxnQkFBRCxDQURzQixHQUV2QyxJQUZKO0FBSUFuQixZQUFRLENBQUMzWCxXQUFULEdBQXVCQSxXQUFXLElBQUksRUFBdEM7QUFDQTJYLFlBQVEsQ0FBQzFYLGtCQUFULEdBQThCQSxrQkFBa0IsSUFBSSxFQUFwRDs7QUFFQSxRQUFJLENBQUMwWCxRQUFRLENBQUM5UCxZQUFWLElBQTBCN0gsV0FBMUIsYUFBMEJBLFdBQTFCLGVBQTBCQSxXQUFXLENBQUU2UyxNQUEzQyxFQUFtRDtBQUNqRDhFLGNBQVEsQ0FBQzlQLFlBQVQsR0FBd0IrUCxRQUFRLENBQUM1WCxXQUFXLENBQUM2UyxNQUFiLENBQWhDO0FBQ0Q7O0FBQ0QsUUFBSSxDQUFDOEUsUUFBUSxDQUFDN1AsZUFBVixJQUE2QjdILGtCQUE3QixhQUE2QkEsa0JBQTdCLGVBQTZCQSxrQkFBa0IsQ0FBRTRTLE1BQXJELEVBQTZEO0FBQzNEOEUsY0FBUSxDQUFDN1AsZUFBVCxHQUEyQjhQLFFBQVEsQ0FBQzNYLGtCQUFrQixDQUFDNFMsTUFBcEIsQ0FBbkM7QUFDRDs7QUFFRCxXQUFPOEUsUUFBUDtBQUNELEdBL0JEOztBQWlDQSxRQUFNb0IsU0FBUyxHQUFHLENBQUMsQ0FBQXpnQixNQUFNLFNBQU4sSUFBQUEsTUFBTSxXQUFOLFlBQUFBLE1BQU0sQ0FBRTJSLEdBQVIsS0FBZSxFQUFoQixFQUFvQnZFLFFBQXBCLEdBQStCcm9CLElBQS9CLEVBQWxCO0FBQ0EsUUFBTThwQixXQUFXLEdBQUcsQ0FBQyxDQUFBN08sTUFBTSxTQUFOLElBQUFBLE1BQU0sV0FBTixZQUFBQSxNQUFNLENBQUV5SCxLQUFSLEtBQWlCLEVBQWxCLEVBQXNCMkYsUUFBdEIsR0FBaUNyb0IsSUFBakMsRUFBcEI7QUFDQSxRQUFNMjdCLFVBQVUsR0FBRyxDQUFBMWdCLE1BQU0sU0FBTixJQUFBQSxNQUFNLFdBQU4sWUFBQUEsTUFBTSxDQUFFa0csSUFBUixLQUFnQixJQUFuQztBQUNBLFFBQU15YSxTQUFTLEdBQUcvM0IsT0FBTyxDQUFDNjNCLFNBQUQsQ0FBekI7O0FBRUEsUUFBTUcsV0FBVyxHQUFJOXRCLElBQUQsSUFDbEJBLElBQUksQ0FDRGpLLEtBREgsQ0FDUyxHQURULEVBRUdGLE1BRkgsQ0FFVUMsT0FGVixFQUdHUCxHQUhILENBR1F3NEIsSUFBRCxJQUFVQSxJQUFJLENBQUNDLE1BQUwsQ0FBWSxDQUFaLEVBQWVDLFdBQWYsS0FBK0JGLElBQUksQ0FBQzc3QixLQUFMLENBQVcsQ0FBWCxDQUhoRCxFQUlHZzhCLElBSkgsQ0FJUSxHQUpSLENBREY7O0FBT0EsUUFBTUMsZ0JBQWdCLEdBQUcsTUFBTTtBQUM3QixRQUFJLENBQUNOLFNBQUQsSUFBYyxDQUFDRCxVQUFuQixFQUErQixPQUFPO0FBQUVRLFVBQUksRUFBRSxNQUFSO0FBQWdCL29CLFdBQUssRUFBRTtBQUF2QixLQUFQO0FBQy9CLFVBQU12VCxHQUFHLEdBQUcyb0IsRUFBRSxDQUFDOXBCLFVBQUgsQ0FBYyxNQUFkLENBQVo7O0FBRUEsWUFBUWk5QixVQUFSO0FBQ0UsV0FBSyxLQUFMO0FBQ0UsZUFBTztBQUFFUSxjQUFJLEVBQUUsS0FBUjtBQUFlL29CLGVBQUssRUFBRTtBQUF0QixTQUFQOztBQUNGLFdBQUssTUFBTDtBQUFhO0FBQ1gsZ0JBQU1ncEIsYUFBYSxHQUNqQlYsU0FBUyxJQUFJQSxTQUFTLEtBQUtBLFNBQVMsQ0FBQ2xaLFdBQVYsRUFBM0IsR0FDSXFaLFdBQVcsQ0FBQ0gsU0FBRCxDQURmLEdBRUksSUFITjtBQUlBLGdCQUFNVyxLQUFLLEdBQUd2UyxXQUFXLEdBQUdBLFdBQVcsQ0FBQ2htQixLQUFaLENBQWtCLEtBQWxCLEVBQXlCRixNQUF6QixDQUFnQ0MsT0FBaEMsQ0FBSCxHQUE4QyxFQUF2RTtBQUNBLGdCQUFNeTRCLE1BQU0sR0FBRyxDQUFDLEdBQUdELEtBQUosQ0FBZjtBQUNBLGNBQUl2UyxXQUFXLElBQUksQ0FBQ3dTLE1BQU0sQ0FBQzk0QixRQUFQLENBQWdCc21CLFdBQWhCLENBQXBCLEVBQWtEd1MsTUFBTSxDQUFDdmxCLElBQVAsQ0FBWStTLFdBQVo7QUFDbEQsY0FBSSxDQUFDd1MsTUFBTSxDQUFDNWdDLE1BQVosRUFBb0IsT0FBTztBQUFFeWdDLGdCQUFJLEVBQUUsTUFBUjtBQUFnQi9vQixpQkFBSyxFQUFFO0FBQXZCLFdBQVA7O0FBRXBCLGdCQUFNbXBCLFdBQVcsR0FBSXh3QixLQUFELElBQ2xCbE0sR0FBRyxDQUFDaXBCLE9BQUosQ0FBWSxNQUFaLEVBQW9CMFQsT0FBcEIsQ0FBNEJ6d0IsS0FBNUIsRUFBbUMwd0IsS0FBbkMsQ0FBMEMsR0FBRTF3QixLQUFNLFFBQWxELENBREY7O0FBR0EsaUJBQU87QUFDTG93QixnQkFBSSxFQUFFLE9BREQ7QUFFTC9vQixpQkFBSyxFQUNIa3BCLE1BQU0sQ0FBQzVnQyxNQUFQLEtBQWtCLENBQWxCLEdBQ0ltRSxHQUFHLENBQUNULEtBQUosQ0FBVSxZQUFWLEVBQXdCLGdCQUF4QixFQUEwQ2s5QixNQUFNLENBQUMsQ0FBRCxDQUFoRCxDQURKLEdBRUl6OEIsR0FBRyxDQUFDVCxLQUFKLENBQ0UsWUFERixFQUVFLG9CQUZGLEVBR0VrOUIsTUFBTSxDQUFDcjhCLEtBQVAsQ0FBYSxDQUFiLEVBQWdCLEVBQWhCLENBSEYsQ0FMRDtBQVVMeThCLG9CQUFRLEVBQUVOLGFBQWEsR0FDbkIsTUFBTUcsV0FBVyxDQUFDSCxhQUFELENBREUsR0FFbkIsTUFBTUcsV0FBVyxDQUFDYixTQUFEO0FBWmhCLFdBQVA7QUFjRDs7QUFDRCxXQUFLLGdCQUFMO0FBQ0UsZUFBTztBQUNMUyxjQUFJLEVBQUUsT0FERDtBQUVML29CLGVBQUssRUFBRXZULEdBQUcsQ0FBQ1QsS0FBSixDQUFVLElBQVYsRUFBZ0IsZ0JBQWhCLEVBQWtDczhCLFNBQWxDLENBRkY7QUFHTGdCLGtCQUFRLEVBQUUsTUFBTTc4QixHQUFHLENBQUNULEtBQUosQ0FBVSxJQUFWLEVBQWdCLElBQWhCLEVBQXNCczhCLFNBQXRCO0FBSFgsU0FBUDs7QUFLRixXQUFLLGVBQUw7QUFDRSxlQUFPO0FBQ0xTLGNBQUksRUFBRSxPQUREO0FBRUwvb0IsZUFBSyxFQUFFdlQsR0FBRyxDQUFDVCxLQUFKLENBQVUsSUFBVixFQUFnQixnQkFBaEIsRUFBa0NzOEIsU0FBbEMsQ0FGRjtBQUdMZ0Isa0JBQVEsRUFBRSxNQUFNNzhCLEdBQUcsQ0FBQ1QsS0FBSixDQUFVLElBQVYsRUFBZ0IsSUFBaEIsRUFBc0JzOEIsU0FBdEI7QUFIWCxTQUFQOztBQUtGLFdBQUssTUFBTDtBQUFhO0FBQ1gsZ0JBQU1pQixNQUFNLEdBQUcsQ0FBQyxNQUFNO0FBQ3BCLGdCQUFJO0FBQ0Ysb0JBQU16YSxDQUFDLEdBQUcsSUFBSWxYLElBQUosQ0FBUzB3QixTQUFULENBQVY7QUFDQSxxQkFBT3BlLEtBQUssQ0FBQzRFLENBQUMsQ0FBQ1QsT0FBRixFQUFELENBQUwsR0FBcUIsSUFBckIsR0FBNEJTLENBQW5DO0FBQ0QsYUFIRCxDQUdFLE1BQU07QUFDTixxQkFBTyxJQUFQO0FBQ0Q7QUFDRixXQVBjLEdBQWY7O0FBUUEsaUJBQU87QUFDTGlhLGdCQUFJLEVBQUUsT0FERDtBQUVML29CLGlCQUFLLEVBQUV2VCxHQUFHLENBQUNULEtBQUosQ0FBVSxNQUFWLEVBQWtCLElBQWxCLEVBQXdCczhCLFNBQXhCLENBRkY7QUFHTGdCLG9CQUFRLEVBQUVDLE1BQU0sR0FBRyxNQUFNOThCLEdBQUcsQ0FBQ1QsS0FBSixDQUFVLE1BQVYsRUFBa0IsSUFBbEIsRUFBd0J1OUIsTUFBeEIsQ0FBVCxHQUEyQztBQUh0RCxXQUFQO0FBS0Q7O0FBQ0Q7QUFDRSxlQUFPO0FBQUVSLGNBQUksRUFBRSxNQUFSO0FBQWdCL29CLGVBQUssRUFBRTtBQUF2QixTQUFQO0FBM0RKO0FBNkRELEdBakVEOztBQW1FQSxRQUFNO0FBQUUrb0IsUUFBSSxFQUFFUyxVQUFSO0FBQW9CeHBCLFNBQUssRUFBRXlwQixXQUEzQjtBQUF3Q0gsWUFBUSxFQUFFSTtBQUFsRCxNQUNKWixnQkFBZ0IsRUFEbEI7O0FBR0EsTUFBSVUsVUFBVSxLQUFLLEtBQWYsSUFBd0JoQixTQUE1QixFQUF1QztBQUNyQyxVQUFNdFMsSUFBSSxHQUFHLEVBQWI7QUFDQSxVQUFNeVQsUUFBUSxHQUFHckIsU0FBUyxDQUFDTSxXQUFWLEVBQWpCO0FBQ0EsUUFBSXo5QixHQUFHLEdBQUcsTUFBTWlxQixFQUFFLENBQUM5cEIsVUFBSCxDQUFjLE1BQWQsRUFBc0JILEdBQXRCLENBQTBCbTlCLFNBQTFCLEVBQXFDLzhCLEdBQXJDLEVBQWhCOztBQUNBLFFBQUksQ0FBQ0osR0FBRyxDQUFDdXlCLE1BQUwsSUFBZWlNLFFBQVEsS0FBS3JCLFNBQWhDLEVBQTJDO0FBQ3pDbjlCLFNBQUcsR0FBRyxNQUFNaXFCLEVBQUUsQ0FBQzlwQixVQUFILENBQWMsTUFBZCxFQUFzQkgsR0FBdEIsQ0FBMEJ3K0IsUUFBMUIsRUFBb0NwK0IsR0FBcEMsRUFBWjtBQUNEOztBQUNELFFBQUlKLEdBQUcsQ0FBQ3V5QixNQUFSLEVBQWdCeEgsSUFBSSxDQUFDdlMsSUFBTCxDQUFVeFksR0FBVjtBQUVoQixVQUFNeStCLFdBQVcsR0FDZkQsUUFBUSxLQUFLckIsU0FBYixHQUF5QixDQUFDQSxTQUFELEVBQVlxQixRQUFaLENBQXpCLEdBQWlELENBQUNyQixTQUFELENBRG5EO0FBRUEsVUFBTXVCLFNBQVMsR0FBRyxNQUFNelUsRUFBRSxDQUN2QjlwQixVQURxQixDQUNWLE1BRFUsRUFFckJVLEtBRnFCLENBRWYsU0FGZSxFQUVKLElBRkksRUFFRTQ5QixXQUZGLEVBR3JCL1QsS0FIcUIsQ0FHZkEsS0FIZSxFQUlyQnRxQixHQUpxQixFQUF4QjtBQUtBcytCLGFBQVMsQ0FBQzE5QixPQUFWLENBQW1CMmlCLENBQUQsSUFBTztBQUN2QixVQUFJLENBQUNvSCxJQUFJLENBQUM0VCxJQUFMLENBQVdDLFFBQUQsSUFBY0EsUUFBUSxDQUFDdHNCLEVBQVQsS0FBZ0JxUixDQUFDLENBQUNyUixFQUExQyxDQUFMLEVBQW9EO0FBQ2xEeVksWUFBSSxDQUFDdlMsSUFBTCxDQUFVbUwsQ0FBVjtBQUNEO0FBQ0YsS0FKRDtBQU1BLFFBQUlvWixVQUFVLEdBQUcsRUFBakI7QUFDQSxRQUFJQyxpQkFBaUIsR0FBRyxFQUF4Qjs7QUFDQSxRQUFJMU8sZ0JBQWdCLElBQUl2RCxJQUFJLENBQUM1dEIsTUFBN0IsRUFBcUM7QUFDbkMsWUFBTTBoQyxVQUFVLEdBQUcsSUFBSTM4QixHQUFKLEVBQW5CO0FBQ0EsWUFBTTQ4QixpQkFBaUIsR0FBRyxJQUFJNThCLEdBQUosRUFBMUI7O0FBQ0EsV0FBSyxNQUFNNjhCLE9BQVgsSUFBc0JoVSxJQUF0QixFQUE0QjtBQUMxQixjQUFNc0QsR0FBRyxHQUFHMFEsT0FBTyxDQUFDMStCLElBQVIsRUFBWjtBQUNBLGNBQU00OEIsU0FBUyxHQUFHakIsUUFBUSxDQUFDM04sR0FBRyxDQUFDK04sT0FBSixJQUFlL04sR0FBRyxDQUFDZ08sV0FBcEIsQ0FBMUI7QUFDQSxjQUFNYSxnQkFBZ0IsR0FBR2xCLFFBQVEsQ0FDL0IzTixHQUFHLENBQUNrTyxjQUFKLElBQXNCbE8sR0FBRyxDQUFDbU8sY0FESyxDQUFqQztBQUdBLFlBQUlTLFNBQUosRUFBZTRCLFVBQVUsQ0FBQzE4QixHQUFYLENBQWU4NkIsU0FBZjtBQUNmLFlBQUlDLGdCQUFKLEVBQXNCNEIsaUJBQWlCLENBQUMzOEIsR0FBbEIsQ0FBc0IrNkIsZ0JBQXRCO0FBQ3ZCOztBQUNELFlBQU04QixlQUFlLEdBQUcsTUFBT2hhLEdBQVAsSUFBZTtBQUNyQyxZQUFJLENBQUNBLEdBQUcsQ0FBQzduQixNQUFULEVBQWlCLE9BQU8sRUFBUDtBQUNqQixjQUFNdzBCLEdBQUcsR0FBRyxFQUFaO0FBQ0EsY0FBTXNOLE1BQU0sR0FBRyxFQUFmOztBQUNBLGFBQUssSUFBSTVoQyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHMm5CLEdBQUcsQ0FBQzduQixNQUF4QixFQUFnQ0UsQ0FBQyxJQUFJLEVBQXJDLEVBQXlDO0FBQ3ZDNGhDLGdCQUFNLENBQUN6bUIsSUFBUCxDQUFZd00sR0FBRyxDQUFDdGpCLEtBQUosQ0FBVXJFLENBQVYsRUFBYUEsQ0FBQyxHQUFHLEVBQWpCLENBQVo7QUFDRDs7QUFDRCxhQUFLLE1BQU13MEIsS0FBWCxJQUFvQm9OLE1BQXBCLEVBQTRCO0FBQzFCLGdCQUFNcitCLElBQUksR0FBRyxNQUFNaThCLGlCQUFpQixDQUNsQzVTLEVBQUUsQ0FDQzlwQixVQURILENBQ2MsU0FEZCxFQUVHVSxLQUZILENBRVNaLHlEQUFRLENBQUNDLFNBQVQsQ0FBbUJzcUIsU0FBbkIsQ0FBNkJDLFVBQTdCLEVBRlQsRUFFb0QsSUFGcEQsRUFFMERvSCxLQUYxRCxDQURrQyxDQUFqQixDQUlqQnp4QixHQUppQixFQUFuQjtBQUtBUSxjQUFJLENBQUNJLE9BQUwsQ0FBYys5QixPQUFELElBQWE7QUFDeEJwTixlQUFHLENBQUNvTixPQUFPLENBQUN6c0IsRUFBVCxDQUFILEdBQWtCeXNCLE9BQU8sQ0FBQzErQixJQUFSLE1BQWtCLEVBQXBDO0FBQ0QsV0FGRDtBQUdEOztBQUNELGVBQU9zeEIsR0FBUDtBQUNELE9BbEJEOztBQW1CQSxPQUFDb0wsVUFBRCxFQUFhQyxpQkFBYixJQUFrQyxNQUFNOXZCLE9BQU8sQ0FBQzhGLEdBQVIsQ0FBWSxDQUNsRGdzQixlQUFlLENBQUMsQ0FBQyxHQUFHSCxVQUFKLENBQUQsQ0FEbUMsRUFFbERHLGVBQWUsQ0FBQyxDQUFDLEdBQUdGLGlCQUFKLENBQUQsQ0FGbUMsQ0FBWixDQUF4QztBQUlEOztBQUVELFVBQU1JLEtBQUssR0FBR25VLElBQUksQ0FDZmhtQixHQURXLENBQ05nNkIsT0FBRCxJQUFhakMsU0FBUyxDQUFDaUMsT0FBRCxFQUFVaEMsVUFBVixFQUFzQkMsaUJBQXRCLENBRGYsRUFFWDMzQixNQUZXLENBRUgyWixJQUFELElBQVcsQ0FBQ21QLFdBQUQsSUFBZ0IsQ0FBQW5QLElBQUksU0FBSixJQUFBQSxJQUFJLFdBQUosWUFBQUEsSUFBSSxDQUFFNk0sT0FBTixNQUFrQixLQUZ6QyxFQUdYeG1CLE1BSFcsQ0FHSDJaLElBQUQsSUFBV29QLFFBQVEsR0FBR0EsUUFBUSxDQUFDcFAsSUFBRCxDQUFYLEdBQW9CLElBSG5DLEVBSVh0ZCxLQUpXLENBSUwsQ0FKSyxFQUlGMmpCLFFBSkUsQ0FBZDtBQU1BLFdBQU87QUFDTGhDLFdBQUssRUFBRTZiLEtBREY7QUFFTGhWLGFBQU8sRUFBRWdWLEtBQUssQ0FBQy9oQyxNQUFOLEdBQWU0dEIsSUFBSSxDQUFDbVUsS0FBSyxDQUFDL2hDLE1BQU4sR0FBZSxDQUFoQixDQUFuQixHQUF3QyxJQUY1QztBQUdMNHJCLGlCQUFXLEVBQUU7QUFIUixLQUFQO0FBS0Q7O0FBRUQsTUFBSTFGLEtBQUssR0FBRyxFQUFaO0FBQ0EsTUFBSTBOLE1BQU0sR0FBR25ELGFBQWEsSUFBSSxJQUE5QjtBQUNBLE1BQUkxRCxPQUFPLEdBQUcsSUFBZDtBQUNBLE1BQUlpVixXQUFXLEdBQUcsSUFBbEI7QUFDQSxNQUFJcFcsV0FBVyxHQUFHLEtBQWxCO0FBQ0EsTUFBSXFXLE1BQU0sR0FBRyxLQUFiO0FBQ0EsTUFBSUMsWUFBWSxHQUFHLEtBQW5CO0FBQ0EsUUFBTUMsYUFBYSxHQUFHclYsRUFBRSxDQUNyQjlwQixVQURtQixDQUNSLE1BRFEsRUFFbkJvcUIsT0FGbUIsQ0FFWHRxQix5REFBUSxDQUFDQyxTQUFULENBQW1Cc3FCLFNBQW5CLENBQTZCQyxVQUE3QixFQUZXLENBQXRCOztBQUlBLFNBQU8sSUFBUCxFQUFhO0FBQ1gsUUFBSTVWLEtBQUssR0FBR3lwQixXQUFXLElBQUlnQixhQUEzQjs7QUFDQSxRQUFJakIsVUFBVSxLQUFLLE9BQWYsSUFBMEJnQixZQUExQixJQUEwQ2QsY0FBOUMsRUFBOEQ7QUFDNUQxcEIsV0FBSyxHQUFHMHBCLGNBQWMsRUFBdEI7QUFDRDs7QUFDRCxRQUFJeE4sTUFBSixFQUFZbGMsS0FBSyxHQUFHQSxLQUFLLENBQUM4VixVQUFOLENBQWlCb0csTUFBakIsQ0FBUjtBQUNabGMsU0FBSyxHQUFHQSxLQUFLLENBQUM2VixLQUFOLENBQVlBLEtBQVosQ0FBUjtBQUVBLFVBQU05cEIsSUFBSSxHQUFHLE1BQU1pVSxLQUFLLENBQUN6VSxHQUFOLEVBQW5COztBQUNBLFFBQUlRLElBQUksQ0FBQ2dxQixLQUFULEVBQWdCO0FBQ2QsVUFBSXlULFVBQVUsS0FBSyxPQUFmLElBQTBCRSxjQUExQixJQUE0QyxDQUFDeE4sTUFBN0MsSUFBdUQsQ0FBQ3NPLFlBQTVELEVBQTBFO0FBQ3hFQSxvQkFBWSxHQUFHLElBQWY7QUFDQTtBQUNEOztBQUNEdFcsaUJBQVcsR0FBRyxLQUFkO0FBQ0E7QUFDRDs7QUFFRCxVQUFNd1csU0FBUyxHQUFHMytCLElBQUksQ0FBQ21xQixJQUF2QjtBQUNBLFFBQUlnUyxVQUFVLEdBQUcsRUFBakI7QUFDQSxRQUFJQyxpQkFBaUIsR0FBRyxFQUF4Qjs7QUFFQSxRQUFJMU8sZ0JBQUosRUFBc0I7QUFDcEIsWUFBTXVRLFVBQVUsR0FBRyxJQUFJMzhCLEdBQUosRUFBbkI7QUFDQSxZQUFNNDhCLGlCQUFpQixHQUFHLElBQUk1OEIsR0FBSixFQUExQjs7QUFDQSxXQUFLLE1BQU1sQyxHQUFYLElBQWtCdS9CLFNBQWxCLEVBQTZCO0FBQzNCLGNBQU1sUixHQUFHLEdBQUdydUIsR0FBRyxDQUFDSyxJQUFKLEVBQVo7O0FBQ0EsWUFBSTh0QixXQUFXLElBQUlFLEdBQUcsQ0FBQ3hDLE9BQUosS0FBZ0IsS0FBbkMsRUFBMEM7QUFDeEM7QUFDRDs7QUFDRCxjQUFNb1IsU0FBUyxHQUFHakIsUUFBUSxDQUFDM04sR0FBRyxDQUFDK04sT0FBSixJQUFlL04sR0FBRyxDQUFDZ08sV0FBcEIsQ0FBMUI7QUFDQSxjQUFNYSxnQkFBZ0IsR0FBR2xCLFFBQVEsQ0FDL0IzTixHQUFHLENBQUNrTyxjQUFKLElBQXNCbE8sR0FBRyxDQUFDbU8sY0FESyxDQUFqQztBQUdBLFlBQUlTLFNBQUosRUFBZTRCLFVBQVUsQ0FBQzE4QixHQUFYLENBQWU4NkIsU0FBZjtBQUNmLFlBQUlDLGdCQUFKLEVBQXNCNEIsaUJBQWlCLENBQUMzOEIsR0FBbEIsQ0FBc0IrNkIsZ0JBQXRCO0FBQ3ZCOztBQUVDLFlBQU04QixlQUFlLEdBQUcsTUFBT2hhLEdBQVAsSUFBZTtBQUNyQyxZQUFJLENBQUNBLEdBQUcsQ0FBQzduQixNQUFULEVBQWlCLE9BQU8sRUFBUDtBQUNqQixjQUFNdzBCLEdBQUcsR0FBRyxFQUFaO0FBQ0EsY0FBTXNOLE1BQU0sR0FBRyxFQUFmOztBQUNBLGFBQUssSUFBSTVoQyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHMm5CLEdBQUcsQ0FBQzduQixNQUF4QixFQUFnQ0UsQ0FBQyxJQUFJLEVBQXJDLEVBQXlDO0FBQ3ZDNGhDLGdCQUFNLENBQUN6bUIsSUFBUCxDQUFZd00sR0FBRyxDQUFDdGpCLEtBQUosQ0FBVXJFLENBQVYsRUFBYUEsQ0FBQyxHQUFHLEVBQWpCLENBQVo7QUFDRDs7QUFDRCxhQUFLLE1BQU13MEIsS0FBWCxJQUFvQm9OLE1BQXBCLEVBQTRCO0FBQzFCLGdCQUFNcitCLElBQUksR0FBRyxNQUFNaThCLGlCQUFpQixDQUNsQzVTLEVBQUUsQ0FDQzlwQixVQURILENBQ2MsU0FEZCxFQUVHVSxLQUZILENBRVNaLHlEQUFRLENBQUNDLFNBQVQsQ0FBbUJzcUIsU0FBbkIsQ0FBNkJDLFVBQTdCLEVBRlQsRUFFb0QsSUFGcEQsRUFFMERvSCxLQUYxRCxDQURrQyxDQUFqQixDQUlqQnp4QixHQUppQixFQUFuQjtBQUtBUSxjQUFJLENBQUNJLE9BQUwsQ0FBY2hCLEdBQUQsSUFBUztBQUNwQjJ4QixlQUFHLENBQUMzeEIsR0FBRyxDQUFDc1MsRUFBTCxDQUFILEdBQWN0UyxHQUFHLENBQUNLLElBQUosTUFBYyxFQUE1QjtBQUNELFdBRkQ7QUFHRDs7QUFDSCxlQUFPc3hCLEdBQVA7QUFDRCxPQWxCQzs7QUFvQkYsT0FBQ29MLFVBQUQsRUFBYUMsaUJBQWIsSUFBa0MsTUFBTTl2QixPQUFPLENBQUM4RixHQUFSLENBQVksQ0FDbERnc0IsZUFBZSxDQUFDLENBQUMsR0FBR0gsVUFBSixDQUFELENBRG1DLEVBRWxERyxlQUFlLENBQUMsQ0FBQyxHQUFHRixpQkFBSixDQUFELENBRm1DLENBQVosQ0FBeEM7QUFJRDs7QUFFRCxTQUFLLElBQUl6aEMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR3VELElBQUksQ0FBQ21xQixJQUFMLENBQVU1dEIsTUFBOUIsRUFBc0NFLENBQUMsRUFBdkMsRUFBMkM7QUFDekMsWUFBTTJDLEdBQUcsR0FBR3UvQixTQUFTLENBQUNsaUMsQ0FBRCxDQUFyQjtBQUNBMHpCLFlBQU0sR0FBRy93QixHQUFUO0FBRUEsWUFBTXF1QixHQUFHLEdBQUdydUIsR0FBRyxDQUFDSyxJQUFKLEVBQVo7O0FBQ0EsVUFBSTh0QixXQUFXLElBQUlFLEdBQUcsQ0FBQ3hDLE9BQUosS0FBZ0IsS0FBbkMsRUFBMEM7QUFDeEMsaUJBRHdDLENBQzlCO0FBQ1g7O0FBRUQsWUFBTXFULEtBQUssR0FBR3BDLFNBQVMsQ0FBQzk4QixHQUFELEVBQU0rOEIsVUFBTixFQUFrQkMsaUJBQWxCLENBQXZCOztBQUNBLFVBQUk1TyxRQUFRLElBQUksQ0FBQ0EsUUFBUSxDQUFDOFEsS0FBRCxDQUF6QixFQUFrQztBQUNoQztBQUNEOztBQUVELFVBQUksQ0FBQ0UsTUFBTCxFQUFhO0FBQ1gvYixhQUFLLENBQUM3SyxJQUFOLENBQVcwbUIsS0FBWDs7QUFDQSxZQUFJN2IsS0FBSyxDQUFDbG1CLE1BQU4sS0FBaUJrb0IsUUFBckIsRUFBK0I7QUFDN0IrWixnQkFBTSxHQUFHLElBQVQ7QUFDQUQscUJBQVcsR0FBR24vQixHQUFkO0FBQ0Q7O0FBQ0Q7QUFDRCxPQXJCd0MsQ0F1QnpDOzs7QUFDQStvQixpQkFBVyxHQUFHLElBQWQ7QUFDQSxhQUFPO0FBQUUxRixhQUFGO0FBQVM2RyxlQUFPLEVBQUVpVixXQUFsQjtBQUErQnBXO0FBQS9CLE9BQVA7QUFDRCxLQTFGVSxDQTRGWDs7O0FBQ0EsUUFBSW5vQixJQUFJLENBQUMwcEIsSUFBTCxHQUFZSSxLQUFoQixFQUF1QjtBQUNyQjNCLGlCQUFXLEdBQUcsS0FBZDtBQUNBO0FBQ0QsS0FoR1UsQ0FrR1g7OztBQUNBQSxlQUFXLEdBQUcsSUFBZDtBQUNEOztBQUVEbUIsU0FBTyxHQUFHaVYsV0FBVyxLQUFLOWIsS0FBSyxDQUFDbG1CLE1BQU4sR0FBZTR6QixNQUFmLEdBQXdCLElBQTdCLENBQXJCO0FBQ0EsU0FBTztBQUFFMU4sU0FBRjtBQUFTNkcsV0FBVDtBQUFrQm5CLGVBQVcsRUFBRXFXLE1BQU0sR0FBR3JXLFdBQUgsR0FBaUI7QUFBdEQsR0FBUDtBQUNEO0FBRU0sZUFBZWtKLFlBQWYsQ0FBNEIvTCxXQUE1QixFQUF5Q0UsZ0JBQXpDLEVBQTJEO0FBQ2hFLFFBQU02RCxFQUFFLEdBQUdocUIseURBQVEsQ0FBQ0MsU0FBVCxFQUFYO0FBQ0EsUUFBTXMvQixlQUFlLEdBQUcsTUFBTXZWLEVBQUUsQ0FBQzlwQixVQUFILENBQWMsUUFBZCxFQUF3QkMsR0FBeEIsRUFBOUI7QUFDQSxRQUFNMG1CLE9BQU8sR0FBRzBZLGVBQWUsQ0FBQ3pVLElBQWhCLENBQXFCaG1CLEdBQXJCLENBQTBCL0UsR0FBRDtBQUN2Q3NTLE1BQUUsRUFBRXRTLEdBQUcsQ0FBQ3NTO0FBRCtCLEtBRXBDdFMsR0FBRyxDQUFDSyxJQUFKLEVBRm9DLENBQXpCLENBQWhCLENBSGdFLENBUWhFOztBQUNBLE1BQUk2bEIsV0FBVyxJQUFJRSxnQkFBbkIsRUFBcUM7QUFDbkMsVUFBTXFaLGVBQWUsR0FBRyxFQUF4Qjs7QUFDQSxTQUFLLE1BQU14SSxNQUFYLElBQXFCblEsT0FBckIsRUFBOEI7QUFDNUIsVUFBSTRZLEtBQUssR0FBRyxJQUFaOztBQUNBLFVBQUl4WixXQUFXLElBQUlFLGdCQUFuQixFQUFxQztBQUNuQyxhQUFLLE1BQU0rVixVQUFYLElBQXlCbEYsTUFBTSxDQUFDMEksUUFBaEMsRUFBMEM7QUFDeEMsZ0JBQU1DLFVBQVUsR0FBRyxNQUFNekQsVUFBVSxDQUFDLzdCLEdBQVgsRUFBekI7QUFDQSxnQkFBTWdrQixXQUFXLEdBQUd3YixVQUFVLENBQUN2L0IsSUFBWCxFQUFwQjs7QUFDQSxjQUNHNmxCLFdBQVcsSUFBSTlCLFdBQVcsQ0FBQzBILEdBQVosS0FBb0I1RixXQUFwQyxJQUNDRSxnQkFBZ0IsSUFBSWhDLFdBQVcsQ0FBQzJILFFBQVosS0FBeUIzRixnQkFGaEQsRUFHRTtBQUNBc1osaUJBQUssR0FBRyxJQUFSO0FBQ0E7QUFDRCxXQU5ELE1BTU87QUFDTEEsaUJBQUssR0FBRyxLQUFSO0FBQ0Q7QUFDRjtBQUNGOztBQUNELFVBQUlBLEtBQUosRUFBVztBQUNURCx1QkFBZSxDQUFDam5CLElBQWhCLENBQXFCeWUsTUFBckI7QUFDRDtBQUNGOztBQUNELFdBQU93SSxlQUFQO0FBQ0Q7O0FBRUQsU0FBTzNZLE9BQVA7QUFDRDtBQUVNLGVBQWVzTSxXQUFmLENBQ0xsTixXQURLLEVBRUxFLGdCQUZLLEVBR0x5WixjQUhLLEVBSUw7QUFDQSxRQUFNNVYsRUFBRSxHQUFHaHFCLHlEQUFRLENBQUNDLFNBQVQsRUFBWDtBQUNBLFFBQU00L0IsZ0JBQWdCLEdBQUcsTUFBTTdWLEVBQUUsQ0FBQzlwQixVQUFILENBQWMsU0FBZCxFQUF5QkMsR0FBekIsRUFBL0I7QUFDQSxRQUFNd3lCLE1BQU0sR0FBRyxJQUFJMXdCLEdBQUosRUFBZjtBQUVBLFFBQU1nTCxPQUFPLENBQUM4RixHQUFSLENBQ0o4c0IsZ0JBQWdCLENBQUMvVSxJQUFqQixDQUFzQmhtQixHQUF0QixDQUEwQixNQUFPNjZCLFVBQVAsSUFBc0I7QUFDOUMsVUFBTXhiLFdBQVcsR0FBR3diLFVBQVUsQ0FBQ3YvQixJQUFYLEVBQXBCO0FBQ0EsUUFBSTAvQixPQUFPLEdBQUcsSUFBZDtBQUVBLFFBQUk3WixXQUFXLElBQUk5QixXQUFXLENBQUMwSCxHQUFaLEtBQW9CNUYsV0FBdkMsRUFBb0Q2WixPQUFPLEdBQUcsS0FBVjtBQUNwRCxRQUFJM1osZ0JBQWdCLElBQUloQyxXQUFXLENBQUMySCxRQUFaLEtBQXlCM0YsZ0JBQWpELEVBQ0UyWixPQUFPLEdBQUcsS0FBVjs7QUFDRixRQUFJRixjQUFjLElBQUl6YixXQUFXLENBQUM2UyxNQUFsQyxFQUEwQztBQUFBOztBQUN4QyxVQUFJeUYsU0FBUyxHQUFHLElBQWhCOztBQUNBLFVBQUksK0JBQU90WSxXQUFXLENBQUM2UyxNQUFuQix3REFBTyxvQkFBb0I3MkIsR0FBM0IsTUFBbUMsVUFBdkMsRUFBbUQ7QUFDakRzOEIsaUJBQVMsR0FBRyxNQUFNdFksV0FBVyxDQUFDNlMsTUFBWixDQUFtQjcyQixHQUFuQixFQUFsQjtBQUNELE9BRkQsTUFFTyxJQUFJLE9BQU9na0IsV0FBVyxDQUFDNlMsTUFBbkIsS0FBOEIsUUFBbEMsRUFBNEM7QUFDakR5RixpQkFBUyxHQUFHLE1BQU16UyxFQUFFLENBQUM5cEIsVUFBSCxDQUFjLFFBQWQsRUFBd0JILEdBQXhCLENBQTRCb2tCLFdBQVcsQ0FBQzZTLE1BQXhDLEVBQWdENzJCLEdBQWhELEVBQWxCO0FBQ0Q7O0FBQ0QsVUFBSSxDQUFDczhCLFNBQUQsSUFBYyxDQUFDQSxTQUFTLENBQUNuSyxNQUE3QixFQUFxQztBQUNuQ3dOLGVBQU8sR0FBRyxLQUFWO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsY0FBTXJOLFVBQVUsR0FBR2dLLFNBQVMsQ0FBQ3I4QixJQUFWLEdBQWlCdVMsSUFBcEM7QUFDQSxjQUFNeWYsUUFBUSxHQUFHcUssU0FBUyxDQUFDcHFCLEVBQTNCOztBQUNBLFlBQUl1dEIsY0FBYyxLQUFLbk4sVUFBbkIsSUFBaUNtTixjQUFjLEtBQUt4TixRQUF4RCxFQUFrRTtBQUNoRTBOLGlCQUFPLEdBQUcsS0FBVjtBQUNEO0FBQ0Y7QUFDRjs7QUFFRCxRQUFJQSxPQUFKLEVBQWE7QUFDWG5OLFlBQU0sQ0FBQ3p3QixHQUFQLENBQVdpaUIsV0FBVyxDQUFDNEgsS0FBdkI7QUFDRDtBQUNGLEdBNUJELENBREksQ0FBTjtBQWdDQSxTQUFPL3VCLEtBQUssQ0FBQ0MsSUFBTixDQUFXMDFCLE1BQVgsQ0FBUDtBQUNEO0FBRU0sU0FBUzZJLFVBQVQsQ0FBb0J1RSxTQUFwQixFQUErQjtBQUNwQyxNQUFJLENBQUNBLFNBQUwsRUFBZ0IsT0FBTyxFQUFQO0FBQ2hCLE1BQUkzVCxJQUFKOztBQUNBLE1BQUkyVCxTQUFTLENBQUNDLE1BQWQsRUFBc0I7QUFDcEI1VCxRQUFJLEdBQUcyVCxTQUFTLENBQUNDLE1BQVYsRUFBUDtBQUNELEdBRkQsTUFFTyxJQUFJLE9BQU9ELFNBQVAsS0FBcUIsUUFBckIsSUFBaUMsT0FBT0EsU0FBUCxLQUFxQixRQUExRCxFQUFvRTtBQUN6RTNULFFBQUksR0FBRyxJQUFJNWYsSUFBSixDQUFTdXpCLFNBQVQsQ0FBUDtBQUNELEdBRk0sTUFFQTtBQUNMLFdBQU8sRUFBUCxDQURLLENBQ007QUFDWjs7QUFDRCxRQUFNRSxHQUFHLEdBQUc1aUMsTUFBTSxDQUFDK3VCLElBQUksQ0FBQ3RJLE9BQUwsRUFBRCxDQUFOLENBQXVCRCxRQUF2QixDQUFnQyxDQUFoQyxFQUFtQyxHQUFuQyxDQUFaO0FBQ0EsUUFBTXFjLEtBQUssR0FBRzdpQyxNQUFNLENBQUMrdUIsSUFBSSxDQUFDeEksUUFBTCxLQUFrQixDQUFuQixDQUFOLENBQTRCQyxRQUE1QixDQUFxQyxDQUFyQyxFQUF3QyxHQUF4QyxDQUFkO0FBQ0EsUUFBTXNjLElBQUksR0FBRy9ULElBQUksQ0FBQ3pJLFdBQUwsRUFBYjtBQUNBLFNBQVEsR0FBRXVjLEtBQU0sSUFBR0QsR0FBSSxJQUFHRSxJQUFLLEVBQS9CO0FBQ0QsQzs7Ozs7Ozs7Ozs7O0FDN2ZEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFPLFNBQVNDLG1CQUFULENBQTZCcC9CLEdBQTdCLEVBQWtDO0FBQUE7O0FBQ3ZDLFFBQU1xL0IsQ0FBQyxHQUFHLEVBQVY7QUFDQSxNQUFJci9CLEdBQUosYUFBSUEsR0FBSixlQUFJQSxHQUFHLENBQUUwQyxNQUFULEVBQWlCMjhCLENBQUMsQ0FBQzM4QixNQUFGLEdBQVcxQyxHQUFHLENBQUMwQyxNQUFmO0FBQ2pCLE1BQUkxQyxHQUFHLFNBQUgsSUFBQUEsR0FBRyxXQUFILG9CQUFBQSxHQUFHLENBQUVHLE9BQUwsc0RBQWNDLE1BQWQsSUFBd0JKLEdBQXhCLGFBQXdCQSxHQUF4QixnQ0FBd0JBLEdBQUcsQ0FBRUcsT0FBN0IsMENBQXdCLGNBQWNHLE1BQTFDLEVBQWtEKytCLENBQUMsQ0FBQ2wvQixPQUFGLEdBQVlILEdBQUcsQ0FBQ0csT0FBaEI7QUFDbEQsTUFBSSxDQUFBSCxHQUFHLFNBQUgsSUFBQUEsR0FBRyxXQUFILFlBQUFBLEdBQUcsQ0FBRVksR0FBTCxNQUFhRixTQUFiLElBQTBCLENBQUFWLEdBQUcsU0FBSCxJQUFBQSxHQUFHLFdBQUgsWUFBQUEsR0FBRyxDQUFFWSxHQUFMLE1BQWEsRUFBM0MsRUFBK0N5K0IsQ0FBQyxDQUFDeitCLEdBQUYsR0FBUVosR0FBRyxDQUFDWSxHQUFaO0FBQy9DLE1BQUksQ0FBQVosR0FBRyxTQUFILElBQUFBLEdBQUcsV0FBSCxZQUFBQSxHQUFHLENBQUVXLE1BQUwsTUFBZ0JELFNBQWhCLElBQTZCLENBQUFWLEdBQUcsU0FBSCxJQUFBQSxHQUFHLFdBQUgsWUFBQUEsR0FBRyxDQUFFVyxNQUFMLE1BQWdCLEVBQWpELEVBQXFEMCtCLENBQUMsQ0FBQzErQixNQUFGLEdBQVdYLEdBQUcsQ0FBQ1csTUFBZjtBQUNyRCxTQUFPMCtCLENBQVA7QUFDRDtBQUVNLFNBQVNDLFNBQVQsQ0FBbUJ0L0IsR0FBbkIsRUFBd0I7QUFBQTs7QUFDN0IsTUFBSSxDQUFDQSxHQUFMLEVBQVUsT0FBTyxFQUFQO0FBQ1YsUUFBTW9pQixLQUFLLEdBQUcsRUFBZDtBQUNBLE1BQUlwaUIsR0FBRyxDQUFDMEMsTUFBUixFQUFnQjBmLEtBQUssQ0FBQzdLLElBQU4sQ0FBV3ZYLEdBQUcsQ0FBQzBDLE1BQWY7O0FBQ2hCLE1BQUksaUJBQUExQyxHQUFHLENBQUNHLE9BQUosd0RBQWFDLE1BQWIscUJBQXVCSixHQUFHLENBQUNHLE9BQTNCLDBDQUF1QixjQUFhRyxNQUF4QyxFQUFnRDtBQUM5QzhoQixTQUFLLENBQUM3SyxJQUFOLENBQVksR0FBRXZYLEdBQUcsQ0FBQ0csT0FBSixDQUFZQyxNQUFPLEdBQUVKLEdBQUcsQ0FBQ0csT0FBSixDQUFZRyxNQUFPLEVBQXREO0FBQ0Q7O0FBQ0QsTUFBSU4sR0FBRyxDQUFDWSxHQUFSLEVBQWF3aEIsS0FBSyxDQUFDN0ssSUFBTixDQUFZLElBQUd2WCxHQUFHLENBQUNZLEdBQUksRUFBdkI7QUFDYixNQUFJWixHQUFHLENBQUNXLE1BQVIsRUFBZ0J5aEIsS0FBSyxDQUFDN0ssSUFBTixDQUFZLElBQUd2WCxHQUFHLENBQUNXLE1BQU8sRUFBMUI7QUFDaEIsU0FBT3loQixLQUFLLENBQUNxYSxJQUFOLENBQVcsR0FBWCxDQUFQO0FBQ0Q7O0FBRUQsU0FBUzhDLFlBQVQsQ0FBc0JoekIsS0FBdEIsRUFBNkI7QUFDM0IsTUFBSSxPQUFPQSxLQUFQLEtBQWlCLFFBQXJCLEVBQStCLE9BQU9sSSxPQUFPLENBQUNrSSxLQUFELENBQWQ7QUFDL0IsUUFBTWhNLE9BQU8sR0FBR2dNLEtBQUssQ0FBQy9MLElBQU4sRUFBaEI7QUFDQSxTQUFPRCxPQUFPLEtBQUssRUFBWixJQUFrQkEsT0FBTyxLQUFLLEtBQXJDO0FBQ0Q7O0FBRU0sU0FBU2kvQix1QkFBVCxDQUNMeHZCLEtBREssRUFFTHl2QixVQUZLLEVBR0xDLGNBSEssRUFJTEMsV0FKSyxFQUtMO0FBQ0EsTUFBSUYsVUFBVSxJQUFJRixZQUFZLENBQUNFLFVBQVUsQ0FBQ3p2QixLQUFELENBQVgsQ0FBOUIsRUFBbUQsT0FBT3l2QixVQUFVLENBQUN6dkIsS0FBRCxDQUFqQjtBQUNuRCxNQUFJMHZCLGNBQWMsSUFBSUgsWUFBWSxDQUFDRyxjQUFjLENBQUMxdkIsS0FBRCxDQUFmLENBQWxDLEVBQ0UsT0FBTzB2QixjQUFjLENBQUMxdkIsS0FBRCxDQUFyQjtBQUNGLE1BQUkydkIsV0FBVyxJQUFJSixZQUFZLENBQUNJLFdBQVcsQ0FBQzN2QixLQUFELENBQVosQ0FBL0IsRUFBcUQsT0FBTzJ2QixXQUFXLENBQUMzdkIsS0FBRCxDQUFsQjtBQUNyRCxTQUFPLEVBQVA7QUFDRDtBQUVNLFNBQVM0dkIsbUJBQVQsQ0FBNkJILFVBQTdCLEVBQXlDQyxjQUF6QyxFQUF5REMsV0FBekQsRUFBc0U7QUFDM0UsUUFBTUUsSUFBSSxHQUFHLENBQUNDLE9BQUQsRUFBVTVDLFFBQVYsS0FDWHNDLHVCQUF1QixDQUFDTSxPQUFELEVBQVVMLFVBQVYsRUFBc0JDLGNBQXRCLEVBQXNDQyxXQUF0QyxDQUF2QixJQUNBSCx1QkFBdUIsQ0FBQ3RDLFFBQUQsRUFBV3VDLFVBQVgsRUFBdUJDLGNBQXZCLEVBQXVDQyxXQUF2QyxDQUZ6Qjs7QUFJQSxTQUFPO0FBQ0xJLE9BQUcsRUFBRUYsSUFBSSxDQUFDLEtBQUQsRUFBUSxLQUFSLENBREo7QUFFTEcsWUFBUSxFQUFFSCxJQUFJLENBQUMsVUFBRCxFQUFhLFVBQWIsQ0FGVDtBQUdMNUosU0FBSyxFQUFFNEosSUFBSSxDQUFDLE9BQUQsRUFBVSxPQUFWO0FBSE4sR0FBUDtBQUtEO0FBRU0sU0FBUzVWLGVBQVQsQ0FBeUJ0WSxJQUF6QixFQUErQjtBQUNwQyxNQUFJLENBQUNBLElBQUQsSUFBUyxPQUFPQSxJQUFQLEtBQWdCLFFBQTdCLEVBQXVDLE9BQU8sRUFBUDtBQUN2QyxRQUFNdVIsS0FBSyxHQUFHdlIsSUFBSSxDQUFDcVIsV0FBTCxHQUFtQnhpQixJQUFuQixFQUFkO0FBQ0EsTUFBSSxDQUFDMGlCLEtBQUwsRUFBWSxPQUFPLEVBQVA7QUFDWixRQUFNNFosTUFBTSxHQUFHNVosS0FBSyxDQUFDNWUsS0FBTixDQUFZLFlBQVosRUFBMEJGLE1BQTFCLENBQWlDQyxPQUFqQyxDQUFmLENBSm9DLENBS3BDOztBQUNBeTRCLFFBQU0sQ0FBQ3ZsQixJQUFQLENBQVkyTCxLQUFaO0FBQ0EsU0FBT2xuQixLQUFLLENBQUNDLElBQU4sQ0FBVyxJQUFJZ0YsR0FBSixDQUFRNjdCLE1BQVIsQ0FBWCxDQUFQO0FBQ0QsQzs7Ozs7Ozs7Ozs7QUM1REQsZ0Q7Ozs7Ozs7Ozs7O0FDQUEsaUQ7Ozs7Ozs7Ozs7O0FDQUEsc0Q7Ozs7Ozs7Ozs7O0FDQUEsb0Q7Ozs7Ozs7Ozs7O0FDQUEsd0M7Ozs7Ozs7Ozs7O0FDQUEsa0M7Ozs7Ozs7Ozs7O0FDQUEsNEM7Ozs7Ozs7Ozs7O0FDQUEscUMiLCJmaWxlIjoicGFnZXMvTmV3U2VhcmNoL21haW5TZWFyY2guanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHJlcXVpcmUoJy4uLy4uL3Nzci1tb2R1bGUtY2FjaGUuanMnKTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0dmFyIHRocmV3ID0gdHJ1ZTtcbiBcdFx0dHJ5IHtcbiBcdFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcbiBcdFx0XHR0aHJldyA9IGZhbHNlO1xuIFx0XHR9IGZpbmFsbHkge1xuIFx0XHRcdGlmKHRocmV3KSBkZWxldGUgaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdH1cblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3BhZ2VzL05ld1NlYXJjaC9tYWluU2VhcmNoLmpzXCIpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmV4dC9kaXN0L25leHQtc2VydmVyL2xpYi9yb3V0ZXItY29udGV4dC5qc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXh0L2Rpc3QvbmV4dC1zZXJ2ZXIvbGliL3JvdXRlci91dGlscy9nZXQtYXNzZXQtcGF0aC1mcm9tLXJvdXRlLmpzXCIpOyIsImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBNb2RhbCwgQnV0dG9uLCBTcGlubmVyIH0gZnJvbSBcInJlYWN0LWJvb3RzdHJhcFwiO1xuaW1wb3J0IGZpcmViYXNlIGZyb20gXCIuLi9jb250ZXh0L0ZpcmViYXNlXCI7XG5pbXBvcnQgc3R5bGVzIGZyb20gXCIuL1dhcmVob3VzZU1hcE1vZGFsLm1vZHVsZS5jc3NcIjtcblxuY29uc3QgUkVHSU9OX09SREVSID0gW1wiRVwiLCBcIkZcIiwgXCJHXCIsIFwiQVwiLCBcIkRcIiwgXCJDXCIsIFwiQlwiXTtcbmNvbnN0IE5PX1BBTExFVCA9IFwiTm9QYWxsZXRcIjtcbmNvbnN0IExFVFRFUlMgPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiAyNiB9LCAoXywgaSkgPT5cbiAgU3RyaW5nLmZyb21DaGFyQ29kZSg2NSArIGkpXG4pO1xuY29uc3QgTlVNQkVSUyA9IEFycmF5LmZyb20oeyBsZW5ndGg6IDUwIH0sIChfLCBpKSA9PiBpICsgMSk7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFdhcmVob3VzZU1hcE1vZGFsKHtcbiAgc2hvdyA9IGZhbHNlLFxuICBvbkhpZGUgPSAoKSA9PiB7fSxcbiAgb25WaWV3LFxuICBvblNlbGVjdGlvbkNoYW5nZSxcbiAgaW5pdGlhbFNlbGVjdGlvbiA9IHt9LFxufSkge1xuICBjb25zdCBbcmVnaW9uT3B0aW9ucywgc2V0UmVnaW9uT3B0aW9uc10gPSB1c2VTdGF0ZShbXSk7XG4gIGNvbnN0IFtzZWN0aW9uTWFwLCBzZXRTZWN0aW9uTWFwXSA9IHVzZVN0YXRlKHt9KTtcbiAgY29uc3QgW21hcFN0ZXAsIHNldE1hcFN0ZXBdID0gdXNlU3RhdGUoXCJyZWdpb25zXCIpO1xuICBjb25zdCBbbWFwUmVnaW9uLCBzZXRNYXBSZWdpb25dID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFttYXBSb3csIHNldE1hcFJvd10gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW21hcENvbCwgc2V0TWFwQ29sXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbbWFwUGFsbGV0LCBzZXRNYXBQYWxsZXRdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFttYXBCaW4sIHNldE1hcEJpbl0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW21hcENlbGxQYWxsZXRzLCBzZXRNYXBDZWxsUGFsbGV0c10gPSB1c2VTdGF0ZSh7fSk7XG4gIGNvbnN0IFttYXBQYWxsZXRCaW5zLCBzZXRNYXBQYWxsZXRCaW5zXSA9IHVzZVN0YXRlKHt9KTtcbiAgY29uc3QgW21hcExvYWRpbmcsIHNldE1hcExvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbbWFwRXJyb3IsIHNldE1hcEVycm9yXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbZGlyZWN0b3J5TG9hZGVkLCBzZXREaXJlY3RvcnlMb2FkZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBsYXN0U2hvd1JlZiA9IHVzZVJlZihmYWxzZSk7XG5cbiAgY29uc3Qgbm90aWZ5U2VsZWN0aW9uQ2hhbmdlID0gdXNlQ2FsbGJhY2soXG4gICAgKHNlbGVjdGlvbikgPT4ge1xuICAgICAgaWYgKHR5cGVvZiBvblNlbGVjdGlvbkNoYW5nZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIG9uU2VsZWN0aW9uQ2hhbmdlKHNlbGVjdGlvbik7XG4gICAgICB9XG4gICAgfSxcbiAgICBbb25TZWxlY3Rpb25DaGFuZ2VdXG4gICk7XG5cbiAgY29uc3QgbG9hZERpcmVjdG9yeSA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcbiAgICBpZiAoZGlyZWN0b3J5TG9hZGVkKSByZXR1cm47XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGRvYyA9IGF3YWl0IGZpcmViYXNlXG4gICAgICAgIC5maXJlc3RvcmUoKVxuICAgICAgICAuY29sbGVjdGlvbihcIldhcmVob3VzZVwiKVxuICAgICAgICAuZG9jKFwiZGlyZWN0b3J5XCIpXG4gICAgICAgIC5nZXQoKTtcbiAgICAgIGNvbnN0IGRhdGEgPSBkb2MuZGF0YSgpIHx8IHt9O1xuICAgICAgc2V0UmVnaW9uT3B0aW9ucyhkYXRhLlJlZ2lvbiB8fCBbXSk7XG4gICAgICBzZXRTZWN0aW9uTWFwKGRhdGEuU2VjdGlvbiB8fCB7fSk7XG4gICAgICBzZXREaXJlY3RvcnlMb2FkZWQodHJ1ZSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gbG9hZCBtYXAgZGlyZWN0b3J5XCIsIGVycm9yKTtcbiAgICAgIHNldE1hcEVycm9yKFwiRmFpbGVkIHRvIGxvYWQgd2FyZWhvdXNlIGRpcmVjdG9yeS5cIik7XG4gICAgfVxuICB9LCBbZGlyZWN0b3J5TG9hZGVkXSk7XG5cbiAgY29uc3QgbG9hZFJlZ2lvbkludmVudG9yeSA9IHVzZUNhbGxiYWNrKGFzeW5jIChyZWdpb25JZCkgPT4ge1xuICAgIGlmICghcmVnaW9uSWQpIHJldHVybjtcbiAgICBzZXRNYXBMb2FkaW5nKHRydWUpO1xuICAgIHNldE1hcEVycm9yKFwiXCIpO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBzbmFwID0gYXdhaXQgZmlyZWJhc2VcbiAgICAgICAgLmZpcmVzdG9yZSgpXG4gICAgICAgIC5jb2xsZWN0aW9uKFwiVGVzdFwiKVxuICAgICAgICAud2hlcmUoXCJuZXdMb2NhbEN1cnJlbnQucmVnaW9uXCIsIFwiPT1cIiwgcmVnaW9uSWQpXG4gICAgICAgIC5nZXQoKTtcblxuICAgICAgY29uc3QgY2VsbFBhbGxldHMgPSB7fTtcbiAgICAgIGNvbnN0IHBhbGxldEJpbnMgPSB7fTtcbiAgICAgIHNuYXAuZm9yRWFjaCgoZG9jKSA9PiB7XG4gICAgICAgIGNvbnN0IGxvYyA9IGRvYy5kYXRhKCk/Lm5ld0xvY2FsQ3VycmVudCB8fCB7fTtcbiAgICAgICAgbGV0IHJvdyA9IGxvYy5zZWN0aW9uPy5sZXR0ZXI7XG4gICAgICAgIGxldCBjb2wgPSBsb2Muc2VjdGlvbj8ubnVtYmVyO1xuICAgICAgICBpZiAoKCFyb3cgfHwgIWNvbCkgJiYgdHlwZW9mIGxvYy5zZWN0aW9uID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgY29uc3QgdHJpbW1lZCA9IGxvYy5zZWN0aW9uLnRyaW0oKTtcbiAgICAgICAgICByb3cgPSB0cmltbWVkLnNsaWNlKDAsIDEpO1xuICAgICAgICAgIGNvbCA9IHRyaW1tZWQuc2xpY2UoMSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbCAhPT0gdW5kZWZpbmVkICYmIGNvbCAhPT0gbnVsbCkge1xuICAgICAgICAgIGNvbCA9IFN0cmluZyhjb2wpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBhbGxldCA9IGxvYy5wYWxsZXQ7XG4gICAgICAgIGNvbnN0IGJpbiA9IGxvYy5iaW47XG4gICAgICAgIGlmICghcm93IHx8ICFjb2wpIHJldHVybjtcbiAgICAgICAgY29uc3QgY2VsbEtleSA9IGAke3Jvd30tJHtjb2x9YDtcbiAgICAgICAgY29uc3QgaGFzQmluID0gYmluICE9PSB1bmRlZmluZWQgJiYgYmluICE9PSBudWxsICYmIGAke2Jpbn1gICE9PSBcIlwiO1xuICAgICAgICBjb25zdCBoYXNQYWxsZXQgPVxuICAgICAgICAgIHBhbGxldCAhPT0gdW5kZWZpbmVkICYmIHBhbGxldCAhPT0gbnVsbCAmJiBgJHtwYWxsZXR9YCAhPT0gXCJcIjtcbiAgICAgICAgaWYgKCFoYXNQYWxsZXQgJiYgIWhhc0JpbikgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IHBhbGxldElkID0gaGFzUGFsbGV0ID8gU3RyaW5nKHBhbGxldCkgOiBOT19QQUxMRVQ7XG4gICAgICAgIGlmICghY2VsbFBhbGxldHNbY2VsbEtleV0pIGNlbGxQYWxsZXRzW2NlbGxLZXldID0gbmV3IFNldCgpO1xuICAgICAgICBjZWxsUGFsbGV0c1tjZWxsS2V5XS5hZGQocGFsbGV0SWQpO1xuXG4gICAgICAgIGlmIChoYXNCaW4pIHtcbiAgICAgICAgICBjb25zdCBwYWxsZXRLZXkgPSBgJHtjZWxsS2V5fS1QJHtwYWxsZXRJZH1gO1xuICAgICAgICAgIGlmICghcGFsbGV0Qmluc1twYWxsZXRLZXldKSBwYWxsZXRCaW5zW3BhbGxldEtleV0gPSBuZXcgU2V0KCk7XG4gICAgICAgICAgcGFsbGV0Qmluc1twYWxsZXRLZXldLmFkZChTdHJpbmcoYmluKSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBjZWxsT2JqID0ge307XG4gICAgICBPYmplY3Qua2V5cyhjZWxsUGFsbGV0cykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgIGNlbGxPYmpba2V5XSA9IEFycmF5LmZyb20oY2VsbFBhbGxldHNba2V5XSkuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICAgIGlmIChhID09PSBOT19QQUxMRVQpIHJldHVybiAxO1xuICAgICAgICAgIGlmIChiID09PSBOT19QQUxMRVQpIHJldHVybiAtMTtcbiAgICAgICAgICBjb25zdCBuYSA9IE51bWJlcihhKTtcbiAgICAgICAgICBjb25zdCBuYiA9IE51bWJlcihiKTtcbiAgICAgICAgICBpZiAoTnVtYmVyLmlzRmluaXRlKG5hKSAmJiBOdW1iZXIuaXNGaW5pdGUobmIpKSByZXR1cm4gbmEgLSBuYjtcbiAgICAgICAgICByZXR1cm4gU3RyaW5nKGEpLmxvY2FsZUNvbXBhcmUoU3RyaW5nKGIpKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgY29uc3QgcGFsbGV0T2JqID0ge307XG4gICAgICBPYmplY3Qua2V5cyhwYWxsZXRCaW5zKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgcGFsbGV0T2JqW2tleV0gPSBBcnJheS5mcm9tKHBhbGxldEJpbnNba2V5XSkuc29ydChcbiAgICAgICAgICAoYSwgYikgPT4gTnVtYmVyKGEpIC0gTnVtYmVyKGIpXG4gICAgICAgICk7XG4gICAgICB9KTtcblxuICAgICAgc2V0TWFwQ2VsbFBhbGxldHMoY2VsbE9iaik7XG4gICAgICBzZXRNYXBQYWxsZXRCaW5zKHBhbGxldE9iaik7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gbG9hZCBtYXAgaW52ZW50b3J5XCIsIGVycm9yKTtcbiAgICAgIHNldE1hcEVycm9yKFwiRmFpbGVkIHRvIGxvYWQgbWFwIGludmVudG9yeS5cIik7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldE1hcExvYWRpbmcoZmFsc2UpO1xuICAgIH1cbiAgfSwgW10pO1xuXG4gIGNvbnN0IGdldFJlZ2lvbkRpbWVuc2lvbnMgPSB1c2VDYWxsYmFjayhcbiAgICAocmVnaW9uSWQpID0+IHtcbiAgICAgIGNvbnN0IGVudHJ5ID0gc2VjdGlvbk1hcD8uW3JlZ2lvbklkXTtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGVudHJ5KSAmJiBlbnRyeS5sZW5ndGggPj0gMikge1xuICAgICAgICBjb25zdCBjb2xzID0gcGFyc2VJbnQoZW50cnlbMF0sIDEwKTtcbiAgICAgICAgY29uc3Qgcm93cyA9IHBhcnNlSW50KGVudHJ5WzFdLCAxMCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgY29sczogTnVtYmVyLmlzRmluaXRlKGNvbHMpID8gY29scyA6IDAsXG4gICAgICAgICAgcm93czogTnVtYmVyLmlzRmluaXRlKHJvd3MpID8gcm93cyA6IDAsXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICByZXR1cm4geyBjb2xzOiAwLCByb3dzOiAwIH07XG4gICAgfSxcbiAgICBbc2VjdGlvbk1hcF1cbiAgKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IHdhc09wZW4gPSBsYXN0U2hvd1JlZi5jdXJyZW50O1xuICAgIGxhc3RTaG93UmVmLmN1cnJlbnQgPSBzaG93O1xuICAgIGlmICghc2hvdyB8fCB3YXNPcGVuKSByZXR1cm47XG5cbiAgICBsb2FkRGlyZWN0b3J5KCk7XG4gICAgc2V0TWFwRXJyb3IoXCJcIik7XG4gICAgY29uc3Qge1xuICAgICAgcmVnaW9uLFxuICAgICAgc2VjdGlvbkxldHRlcixcbiAgICAgIHNlY3Rpb25OdW1iZXIsXG4gICAgICBwYWxsZXQsXG4gICAgICBiaW4sXG4gICAgfSA9IGluaXRpYWxTZWxlY3Rpb24gfHwge307XG5cbiAgICBzZXRNYXBSZWdpb24ocmVnaW9uIHx8IFwiXCIpO1xuICAgIHNldE1hcFJvdyhzZWN0aW9uTGV0dGVyIHx8IFwiXCIpO1xuICAgIHNldE1hcENvbChzZWN0aW9uTnVtYmVyID8gU3RyaW5nKHNlY3Rpb25OdW1iZXIpIDogXCJcIik7XG4gICAgc2V0TWFwUGFsbGV0KHBhbGxldCA/IFN0cmluZyhwYWxsZXQpIDogXCJcIik7XG4gICAgc2V0TWFwQmluKGJpbiA/IFN0cmluZyhiaW4pIDogXCJcIik7XG4gICAgc2V0TWFwU3RlcChyZWdpb24gPyBcImdyaWRcIiA6IFwicmVnaW9uc1wiKTtcbiAgICBpZiAocmVnaW9uKSBsb2FkUmVnaW9uSW52ZW50b3J5KHJlZ2lvbik7XG4gIH0sIFtzaG93LCBpbml0aWFsU2VsZWN0aW9uLCBsb2FkRGlyZWN0b3J5LCBsb2FkUmVnaW9uSW52ZW50b3J5XSk7XG5cbiAgY29uc3QgaGFuZGxlU2VsZWN0UmVnaW9uID0gKHJlZ2lvbklkKSA9PiB7XG4gICAgY29uc3Qgc2VsZWN0aW9uID0ge1xuICAgICAgcmVnaW9uOiByZWdpb25JZCxcbiAgICAgIHNlY3Rpb25MZXR0ZXI6IFwiXCIsXG4gICAgICBzZWN0aW9uTnVtYmVyOiBcIlwiLFxuICAgICAgcGFsbGV0OiBcIlwiLFxuICAgICAgYmluOiBcIlwiLFxuICAgIH07XG4gICAgc2V0TWFwUmVnaW9uKHJlZ2lvbklkKTtcbiAgICBzZXRNYXBSb3coXCJcIik7XG4gICAgc2V0TWFwQ29sKFwiXCIpO1xuICAgIHNldE1hcFBhbGxldChcIlwiKTtcbiAgICBzZXRNYXBCaW4oXCJcIik7XG4gICAgc2V0TWFwU3RlcChcImdyaWRcIik7XG4gICAgbm90aWZ5U2VsZWN0aW9uQ2hhbmdlKHNlbGVjdGlvbik7XG4gICAgbG9hZFJlZ2lvbkludmVudG9yeShyZWdpb25JZCk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlU2VsZWN0Q2VsbCA9IChyb3dMZXR0ZXIsIGNvbE51bWJlcikgPT4ge1xuICAgIGNvbnN0IGNvbFZhbHVlID0gU3RyaW5nKGNvbE51bWJlcik7XG4gICAgY29uc3Qgc2VsZWN0aW9uID0ge1xuICAgICAgcmVnaW9uOiBtYXBSZWdpb24sXG4gICAgICBzZWN0aW9uTGV0dGVyOiByb3dMZXR0ZXIsXG4gICAgICBzZWN0aW9uTnVtYmVyOiBjb2xWYWx1ZSxcbiAgICAgIHBhbGxldDogXCJcIixcbiAgICAgIGJpbjogXCJcIixcbiAgICB9O1xuICAgIHNldE1hcFJvdyhyb3dMZXR0ZXIpO1xuICAgIHNldE1hcENvbChjb2xWYWx1ZSk7XG4gICAgc2V0TWFwUGFsbGV0KFwiXCIpO1xuICAgIHNldE1hcEJpbihcIlwiKTtcbiAgICBzZXRNYXBTdGVwKFwicGFsbGV0c1wiKTtcbiAgICBub3RpZnlTZWxlY3Rpb25DaGFuZ2Uoc2VsZWN0aW9uKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVTZWxlY3RQYWxsZXQgPSAocGFsbGV0SWQpID0+IHtcbiAgICBjb25zdCBwYWxsZXRWYWx1ZSA9IFN0cmluZyhwYWxsZXRJZCk7XG4gICAgY29uc3Qgbm9ybWFsaXplZFBhbGxldCA9IHBhbGxldFZhbHVlID09PSBOT19QQUxMRVQgPyBcIlwiIDogcGFsbGV0VmFsdWU7XG4gICAgY29uc3Qgc2VsZWN0aW9uID0ge1xuICAgICAgcmVnaW9uOiBtYXBSZWdpb24sXG4gICAgICBzZWN0aW9uTGV0dGVyOiBtYXBSb3csXG4gICAgICBzZWN0aW9uTnVtYmVyOiBtYXBDb2wsXG4gICAgICBwYWxsZXQ6IG5vcm1hbGl6ZWRQYWxsZXQsXG4gICAgICBiaW46IFwiXCIsXG4gICAgfTtcbiAgICBzZXRNYXBQYWxsZXQocGFsbGV0VmFsdWUpO1xuICAgIHNldE1hcEJpbihcIlwiKTtcbiAgICBzZXRNYXBTdGVwKFwiYmluc1wiKTtcbiAgICBub3RpZnlTZWxlY3Rpb25DaGFuZ2Uoc2VsZWN0aW9uKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVTZWxlY3RCaW4gPSAoYmluSWQpID0+IHtcbiAgICBjb25zdCBiaW5WYWx1ZSA9IFN0cmluZyhiaW5JZCk7XG4gICAgY29uc3Qgbm9ybWFsaXplZFBhbGxldCA9IG1hcFBhbGxldCA9PT0gTk9fUEFMTEVUID8gXCJcIiA6IG1hcFBhbGxldDtcbiAgICBjb25zdCBzZWxlY3Rpb24gPSB7XG4gICAgICByZWdpb246IG1hcFJlZ2lvbixcbiAgICAgIHNlY3Rpb25MZXR0ZXI6IG1hcFJvdyxcbiAgICAgIHNlY3Rpb25OdW1iZXI6IG1hcENvbCxcbiAgICAgIHBhbGxldDogbm9ybWFsaXplZFBhbGxldCxcbiAgICAgIGJpbjogYmluVmFsdWUsXG4gICAgfTtcbiAgICBzZXRNYXBCaW4oYmluVmFsdWUpO1xuICAgIG5vdGlmeVNlbGVjdGlvbkNoYW5nZShzZWxlY3Rpb24pO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUJhY2sgPSAoKSA9PiB7XG4gICAgaWYgKG1hcFN0ZXAgPT09IFwiYmluc1wiKSBzZXRNYXBTdGVwKFwicGFsbGV0c1wiKTtcbiAgICBlbHNlIGlmIChtYXBTdGVwID09PSBcInBhbGxldHNcIikgc2V0TWFwU3RlcChcImdyaWRcIik7XG4gICAgZWxzZSBpZiAobWFwU3RlcCA9PT0gXCJncmlkXCIpIHNldE1hcFN0ZXAoXCJyZWdpb25zXCIpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVZpZXcgPSAoKSA9PiB7XG4gICAgaWYgKHR5cGVvZiBvblZpZXcgIT09IFwiZnVuY3Rpb25cIikgcmV0dXJuO1xuICAgIGNvbnN0IG5vcm1hbGl6ZWRQYWxsZXQgPSBtYXBQYWxsZXQgPT09IE5PX1BBTExFVCA/IFwiXCIgOiBtYXBQYWxsZXQ7XG4gICAgb25WaWV3KHtcbiAgICAgIHJlZ2lvbjogbWFwUmVnaW9uLFxuICAgICAgc2VjdGlvbkxldHRlcjogbWFwUm93LFxuICAgICAgc2VjdGlvbk51bWJlcjogbWFwQ29sLFxuICAgICAgcGFsbGV0OiBub3JtYWxpemVkUGFsbGV0LFxuICAgICAgYmluOiBtYXBCaW4sXG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8TW9kYWwgc2hvdz17c2hvd30gb25IaWRlPXtvbkhpZGV9IGNlbnRlcmVkIHNpemU9XCJsZ1wiPlxuICAgICAgPE1vZGFsLkhlYWRlciBjbG9zZUJ1dHRvbj5cbiAgICAgICAgPE1vZGFsLlRpdGxlPldhcmVob3VzZSBNYXA8L01vZGFsLlRpdGxlPlxuICAgICAgPC9Nb2RhbC5IZWFkZXI+XG4gICAgICA8TW9kYWwuQm9keT5cbiAgICAgICAge21hcExvYWRpbmcgJiYgKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubWFwTG9hZGluZ30+XG4gICAgICAgICAgICA8U3Bpbm5lciBhbmltYXRpb249XCJib3JkZXJcIiAvPlxuICAgICAgICAgICAgPHNwYW4+TG9hZGluZyBtYXAgZGF0YS4uLjwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgICAge21hcEVycm9yICYmIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubWFwRXJyb3J9PnttYXBFcnJvcn08L2Rpdj59XG5cbiAgICAgICAgeyFtYXBMb2FkaW5nICYmIG1hcFN0ZXAgPT09IFwicmVnaW9uc1wiICYmIChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLm1hcFN0YWdlfT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubWFwSGludH0+U2VsZWN0IGEgcmVnaW9uPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLm1hcENhbnZhc30+XG4gICAgICAgICAgICAgIHtSRUdJT05fT1JERVIubWFwKChyZWdpb25JZCkgPT4gKFxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIGtleT17cmVnaW9uSWR9XG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YCR7c3R5bGVzLnJlZ2lvbkJsb2NrfSAke3N0eWxlc1tgcmVnaW9uJHtyZWdpb25JZH1gXX1gfVxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlU2VsZWN0UmVnaW9uKHJlZ2lvbklkKX1cbiAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtcbiAgICAgICAgICAgICAgICAgICAgQXJyYXkuaXNBcnJheShyZWdpb25PcHRpb25zKSAmJlxuICAgICAgICAgICAgICAgICAgICByZWdpb25PcHRpb25zLmxlbmd0aCA+IDAgJiZcbiAgICAgICAgICAgICAgICAgICAgIXJlZ2lvbk9wdGlvbnMuaW5jbHVkZXMocmVnaW9uSWQpXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAge3JlZ2lvbklkfVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuXG4gICAgICAgIHshbWFwTG9hZGluZyAmJiBtYXBTdGVwID09PSBcImdyaWRcIiAmJiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5tYXBTdGFnZX0+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLm1hcEhpbnR9PlxuICAgICAgICAgICAgICBSZWdpb24ge21hcFJlZ2lvbn06IGNob29zZSBhIHJvdyBhbmQgY29sdW1uXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIHsoKCkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBkaW1zID0gZ2V0UmVnaW9uRGltZW5zaW9ucyhtYXBSZWdpb24pO1xuICAgICAgICAgICAgICBjb25zdCByb3dzID0gTEVUVEVSUy5zbGljZSgwLCBkaW1zLnJvd3MgfHwgMCkucmV2ZXJzZSgpO1xuICAgICAgICAgICAgICBjb25zdCBjb2xzID0gTlVNQkVSUy5zbGljZSgwLCBkaW1zLmNvbHMgfHwgMCk7XG4gICAgICAgICAgICAgIGlmICghcm93cy5sZW5ndGggfHwgIWNvbHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2VjdGlvbktleXMgPSBPYmplY3Qua2V5cyhtYXBDZWxsUGFsbGV0cyB8fCB7fSlcbiAgICAgICAgICAgICAgICAgIC5maWx0ZXIoQm9vbGVhbilcbiAgICAgICAgICAgICAgICAgIC5tYXAoKGtleSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBbcm93LCBjb2xdID0ga2V5LnNwbGl0KFwiLVwiKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsga2V5LCByb3csIGNvbCB9O1xuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIC5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhLnJvdyA9PT0gYi5yb3cpIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gTnVtYmVyKGEuY29sKSAtIE51bWJlcihiLmNvbCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGIucm93LmxvY2FsZUNvbXBhcmUoYS5yb3cpO1xuICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIXNlY3Rpb25LZXlzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5tYXBFbXB0eX0+XG4gICAgICAgICAgICAgICAgICAgICAgTm8gZ3JpZCBkYXRhIGZvciB0aGlzIHJlZ2lvbi5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmdyaWRXcmFwcGVyfT5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5tYXBIaW50fT5cbiAgICAgICAgICAgICAgICAgICAgICBHcmlkIG5vdCBhdmFpbGFibGUuIFNlbGVjdCBhbiBhdmFpbGFibGUgc2VjdGlvbiBiZWxvdy5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMucGFsbGV0R3JpZH0+XG4gICAgICAgICAgICAgICAgICAgICAge3NlY3Rpb25LZXlzLm1hcCgoeyBrZXksIHJvdywgY29sIH0pID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5wYWxsZXRCdXR0b259XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZVNlbGVjdENlbGwocm93LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7cm93fVxuICAgICAgICAgICAgICAgICAgICAgICAgICB7Y29sfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuZ3JpZFdyYXBwZXJ9PlxuICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5ncmlkfVxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyBcIi0tZ3JpZC1jb2xzXCI6IGNvbHMubGVuZ3RoIH19XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHtyb3dzLm1hcCgocm93KSA9PlxuICAgICAgICAgICAgICAgICAgICAgIGNvbHMubWFwKChjb2wpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNlbGxLZXkgPSBgJHtyb3d9LSR7Y29sfWA7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBoYXNQYWxsZXRzID0gQm9vbGVhbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwQ2VsbFBhbGxldHNbY2VsbEtleV0/Lmxlbmd0aFxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2NlbGxLZXl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgJHtzdHlsZXMuZ3JpZENlbGx9ICR7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNQYWxsZXRzID8gXCJcIiA6IHN0eWxlcy5ncmlkQ2VsbERpc2FibGVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc1BhbGxldHMgJiYgaGFuZGxlU2VsZWN0Q2VsbChyb3csIGNvbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFoYXNQYWxsZXRzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cm93fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2NvbH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KSgpfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuXG4gICAgICAgIHshbWFwTG9hZGluZyAmJiBtYXBTdGVwID09PSBcInBhbGxldHNcIiAmJiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5tYXBTdGFnZX0+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLm1hcEhpbnR9PlxuICAgICAgICAgICAgICBSZWdpb24ge21hcFJlZ2lvbn0gLSBTZWN0aW9uIHttYXBSb3d9XG4gICAgICAgICAgICAgIHttYXBDb2x9OiBzZWxlY3QgYSBwYWxsZXRcbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5wYWxsZXRHcmlkfT5cbiAgICAgICAgICAgICAgeyhtYXBDZWxsUGFsbGV0c1tgJHttYXBSb3d9LSR7bWFwQ29sfWBdIHx8IFtdKS5tYXAoKHBhbGxldCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBhbGxldEtleSA9IGAke21hcFJvd30tJHttYXBDb2x9LVAke3BhbGxldH1gO1xuICAgICAgICAgICAgICAgIGNvbnN0IGJpbnMgPSBtYXBQYWxsZXRCaW5zW3BhbGxldEtleV0gfHwgW107XG4gICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAga2V5PXtwYWxsZXR9XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5wYWxsZXRCdXR0b259XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoYmlucy5sZW5ndGggPT09IDAgJiYgdHlwZW9mIG9uVmlldyA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3Rpb24gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2lvbjogbWFwUmVnaW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBzZWN0aW9uTGV0dGVyOiBtYXBSb3csXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNlY3Rpb25OdW1iZXI6IG1hcENvbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcGFsbGV0OiBwYWxsZXQgPT09IE5PX1BBTExFVCA/IFwiXCIgOiBTdHJpbmcocGFsbGV0KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYmluOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vdGlmeVNlbGVjdGlvbkNoYW5nZShzZWxlY3Rpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgb25WaWV3KHNlbGVjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZVNlbGVjdFBhbGxldChwYWxsZXQpO1xuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7cGFsbGV0ID09PSBOT19QQUxMRVQgPyBcIk5vIFBhbGxldFwiIDogYFBhbGxldCAke3BhbGxldH1gfVxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgIHshKG1hcENlbGxQYWxsZXRzW2Ake21hcFJvd30tJHttYXBDb2x9YF0gfHwgW10pLmxlbmd0aCAmJiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5tYXBFbXB0eX0+XG4gICAgICAgICAgICAgICAgICBObyBwYWxsZXRzIGF2YWlsYWJsZSBoZXJlLlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9XG5cbiAgICAgICAgeyFtYXBMb2FkaW5nICYmIG1hcFN0ZXAgPT09IFwiYmluc1wiICYmIChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLm1hcFN0YWdlfT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubWFwSGludH0+XG4gICAgICAgICAgICAgIFJlZ2lvbiB7bWFwUmVnaW9ufSAtIFNlY3Rpb24ge21hcFJvd31cbiAgICAgICAgICAgICAge21hcENvbH0gLSBQYWxsZXQge21hcFBhbGxldH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5wYWxsZXRHcmlkfT5cbiAgICAgICAgICAgICAgeyhtYXBQYWxsZXRCaW5zW2Ake21hcFJvd30tJHttYXBDb2x9LVAke21hcFBhbGxldH1gXSB8fCBbXSkubWFwKFxuICAgICAgICAgICAgICAgIChiaW4pID0+IChcbiAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAga2V5PXtiaW59XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2Ake3N0eWxlcy5wYWxsZXRCdXR0b259ICR7c3R5bGVzLmJpbkJ1dHRvbn1gfVxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVTZWxlY3RCaW4oYmluKX1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgQmluIHtiaW59XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIHshKG1hcFBhbGxldEJpbnNbYCR7bWFwUm93fS0ke21hcENvbH0tUCR7bWFwUGFsbGV0fWBdIHx8IFtdKVxuICAgICAgICAgICAgICAgIC5sZW5ndGggJiYgKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubWFwRW1wdHl9PlxuICAgICAgICAgICAgICAgICAgTm8gYmlucyBhdmFpbGFibGUgb24gdGhpcyBwYWxsZXQuXG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgIDwvTW9kYWwuQm9keT5cbiAgICAgIDxNb2RhbC5Gb290ZXIgY2xhc3NOYW1lPXtzdHlsZXMubWFwRm9vdGVyfT5cbiAgICAgICAgPEJ1dHRvblxuICAgICAgICAgIHZhcmlhbnQ9XCJvdXRsaW5lLXNlY29uZGFyeVwiXG4gICAgICAgICAgb25DbGljaz17aGFuZGxlQmFja31cbiAgICAgICAgICBkaXNhYmxlZD17bWFwU3RlcCA9PT0gXCJyZWdpb25zXCJ9XG4gICAgICAgID5cbiAgICAgICAgICBCYWNrXG4gICAgICAgIDwvQnV0dG9uPlxuICAgICAgICA8QnV0dG9uIHZhcmlhbnQ9XCJvdXRsaW5lLXByaW1hcnlcIiBvbkNsaWNrPXtoYW5kbGVWaWV3fT5cbiAgICAgICAgICBWaWV3XG4gICAgICAgIDwvQnV0dG9uPlxuICAgICAgICA8QnV0dG9uIHZhcmlhbnQ9XCJzZWNvbmRhcnlcIiBvbkNsaWNrPXtvbkhpZGV9PlxuICAgICAgICAgIENsb3NlXG4gICAgICAgIDwvQnV0dG9uPlxuICAgICAgPC9Nb2RhbC5Gb290ZXI+XG4gICAgPC9Nb2RhbD5cbiAgKTtcbn1cbiIsIi8vIEV4cG9ydHNcbm1vZHVsZS5leHBvcnRzID0ge1xuXHRcIm1hcExvYWRpbmdcIjogXCJXYXJlaG91c2VNYXBNb2RhbF9tYXBMb2FkaW5nX19UY2hfdFwiLFxuXHRcIm1hcEVycm9yXCI6IFwiV2FyZWhvdXNlTWFwTW9kYWxfbWFwRXJyb3JfXzFCY1dpXCIsXG5cdFwibWFwU3RhZ2VcIjogXCJXYXJlaG91c2VNYXBNb2RhbF9tYXBTdGFnZV9fMWt3ZzlcIixcblx0XCJtYXBIaW50XCI6IFwiV2FyZWhvdXNlTWFwTW9kYWxfbWFwSGludF9fcTN1UWNcIixcblx0XCJtYXBDYW52YXNcIjogXCJXYXJlaG91c2VNYXBNb2RhbF9tYXBDYW52YXNfX3NYZnY3XCIsXG5cdFwicmVnaW9uQmxvY2tcIjogXCJXYXJlaG91c2VNYXBNb2RhbF9yZWdpb25CbG9ja19fMVhVbE1cIixcblx0XCJyZWdpb25FXCI6IFwiV2FyZWhvdXNlTWFwTW9kYWxfcmVnaW9uRV9fMXVWQXZcIixcblx0XCJyZWdpb25GXCI6IFwiV2FyZWhvdXNlTWFwTW9kYWxfcmVnaW9uRl9fMkdoY3NcIixcblx0XCJyZWdpb25HXCI6IFwiV2FyZWhvdXNlTWFwTW9kYWxfcmVnaW9uR19fMklUb3FcIixcblx0XCJyZWdpb25BXCI6IFwiV2FyZWhvdXNlTWFwTW9kYWxfcmVnaW9uQV9fM1BuMFpcIixcblx0XCJyZWdpb25EXCI6IFwiV2FyZWhvdXNlTWFwTW9kYWxfcmVnaW9uRF9fSWN5Q29cIixcblx0XCJyZWdpb25DXCI6IFwiV2FyZWhvdXNlTWFwTW9kYWxfcmVnaW9uQ19fM2xOcTJcIixcblx0XCJyZWdpb25CXCI6IFwiV2FyZWhvdXNlTWFwTW9kYWxfcmVnaW9uQl9fM0J5d19cIixcblx0XCJncmlkV3JhcHBlclwiOiBcIldhcmVob3VzZU1hcE1vZGFsX2dyaWRXcmFwcGVyX18xdDN3TlwiLFxuXHRcImdyaWRcIjogXCJXYXJlaG91c2VNYXBNb2RhbF9ncmlkX18xQkM5eFwiLFxuXHRcImdyaWRDZWxsXCI6IFwiV2FyZWhvdXNlTWFwTW9kYWxfZ3JpZENlbGxfXzFEUzJWXCIsXG5cdFwiZ3JpZENlbGxEaXNhYmxlZFwiOiBcIldhcmVob3VzZU1hcE1vZGFsX2dyaWRDZWxsRGlzYWJsZWRfXzFuNTRDXCIsXG5cdFwicGFsbGV0R3JpZFwiOiBcIldhcmVob3VzZU1hcE1vZGFsX3BhbGxldEdyaWRfXzI4ZU1MXCIsXG5cdFwicGFsbGV0QnV0dG9uXCI6IFwiV2FyZWhvdXNlTWFwTW9kYWxfcGFsbGV0QnV0dG9uX19OdU1uMFwiLFxuXHRcImJpbkJ1dHRvblwiOiBcIldhcmVob3VzZU1hcE1vZGFsX2JpbkJ1dHRvbl9fMjh5bkJcIixcblx0XCJtYXBFbXB0eVwiOiBcIldhcmVob3VzZU1hcE1vZGFsX21hcEVtcHR5X18yaGlVaVwiLFxuXHRcIm1hcEZvb3RlclwiOiBcIldhcmVob3VzZU1hcE1vZGFsX21hcEZvb3Rlcl9fMW8wUmlcIlxufTtcbiIsImltcG9ydCB7IGNyZWF0ZUNvbnRleHQsIHVzZUNvbnRleHQgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB1c2VGaXJlYmFzZUF1dGggZnJvbSBcIi4vdXNlRmlyZWJhc2VBdXRoXCI7XG5cbmNvbnN0IGF1dGhVc2VyQ29udGV4dCA9IGNyZWF0ZUNvbnRleHQoe1xuICBhdXRoVXNlcjogbnVsbCxcbiAgbG9hZGluZzogdHJ1ZSxcbiAgc2lnbkluV2l0aEdvb2dsZTogYXN5bmMgKCkgPT4ge30sXG4gIHNpZ25PdXQ6IGFzeW5jICgpID0+IHt9LFxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBBdXRoVXNlclByb3ZpZGVyKHsgY2hpbGRyZW4gfSkge1xuICBjb25zdCBhdXRoID0gdXNlRmlyZWJhc2VBdXRoKCk7XG4gIHJldHVybiAoXG4gICAgPGF1dGhVc2VyQ29udGV4dC5Qcm92aWRlciB2YWx1ZT17YXV0aH0+e2NoaWxkcmVufTwvYXV0aFVzZXJDb250ZXh0LlByb3ZpZGVyPlxuICApO1xufVxuXG5leHBvcnQgY29uc3QgdXNlQXV0aCA9ICgpID0+IHVzZUNvbnRleHQoYXV0aFVzZXJDb250ZXh0KTtcbiIsIi8vIC8vIGltcG9ydCBmaXJlYmFzZSBmcm9tIFwiZmlyZWJhc2UvYXBwXCJcbi8vIGltcG9ydCAqIGFzIGZpcmViYXNlIGZyb20gXCJmaXJlYmFzZS9hcHBcIjtcbi8vIC8vIGltcG9ydCBcImZpcmViYXNlL2F1dGhcIlxuXG4vLyBjb25zdCBhcHAgPSBmaXJlYmFzZS5pbml0aWFsaXplQXBwKHtcbi8vICAgICBhcGlLZXk6IFwiQUl6YVN5Q3hDLWE4YjVWaGhleThHRjQ3THBYWjFhTUtZbWlJaHdFXCIsXG4vLyAgICAgYXV0aERvbWFpbjogXCJtYWdtby1hYzEwYy5maXJlYmFzZWFwcC5jb21cIixcbi8vICAgICBwcm9qZWN0SWQ6IFwibWFnbW8tYWMxMGNcIixcbi8vICAgICBzdG9yYWdlQnVja2V0OiBcIm1hZ21vLWFjMTBjLmFwcHNwb3QuY29tXCIsXG4vLyAgICAgbWVzc2FnaW5nU2VuZGVySWQ6IFwiMTc3ODU3NTI1MTQ3XCIsXG4vLyAgICAgYXBwSWQ6IFwiMToxNzc4NTc1MjUxNDc6d2ViOmFjOGUzYzg3ZDgyMzk2YmViMWRkM2VcIixcbi8vICAgICBtZWFzdXJlbWVudElkOiBcIkctTDAyMzZKVDVOM1wiXG4vLyB9KVxuXG4vLyBleHBvcnQgY29uc3QgYXV0aCA9IGFwcC5hdXRoKClcbi8vIGV4cG9ydCBkZWZhdWx0IGFwcFxuXG4vLyBhcGlLZXk6IHByb2Nlc3MuZW52LlJFQUNUX0FQUF9GSVJFQkFTRV9LRVksXG4vLyAgICAgYXV0aERvbWFpbjogcHJvY2Vzcy5lbnYuUkVBQ1RfQVBQX0ZJUkVCQVNFX0FVVEhfRE9NQUlOLFxuLy8gICAgIHByb2plY3RJZDogcHJvY2Vzcy5lbnYuUkVBQ1RfQVBQX0ZJUkVCQVNFX1BST0pFQ1RfSUQsXG4vLyAgICAgc3RvcmFnZUJ1Y2tldDogcHJvY2Vzcy5lbnYuUkVBQ1RfQVBQX0ZJUkVCQVNFX1NUT1JBR0VfQlVDS0VULFxuLy8gICAgIG1lc3NhZ2luZ1NlbmRlcklkOiBwcm9jZXNzLmVudi5SRUFDVF9BUFBfRklSRUJBU0VfTUVTU0FHSU5HX1NFTkRFUl9JRCxcbi8vICAgICBhcHBJZDogcHJvY2Vzcy5lbnYuUkVBQ1RfQVBQX0ZJUkVCQVNFX0FQUF9JRCxcbi8vICAgICBtZWFzdXJlbWVudElkOiBwcm9jZXNzLmVudi5SRUFDVF9BUFBfRklSRUJBU0VfTUVBU1VSRU1FTlRfSURcblxuaW1wb3J0IEZpcmViYXNlIGZyb20gXCJmaXJlYmFzZS9jb21wYXQvYXBwXCI7XG5pbXBvcnQgXCJmaXJlYmFzZS9jb21wYXQvYXV0aFwiO1xuaW1wb3J0IFwiZmlyZWJhc2UvY29tcGF0L2ZpcmVzdG9yZVwiO1xuaW1wb3J0IFwiZmlyZWJhc2UvY29tcGF0L3N0b3JhZ2VcIjtcblxuY29uc3QgRmlyZWJhc2VDcmVkZW50aWFscyA9IHtcbiAgYXBpS2V5OiBcIkFJemFTeUN4Qy1hOGI1VmhoZXk4R0Y0N0xwWFoxYU1LWW1pSWh3RVwiLFxuICBhdXRoRG9tYWluOiBcIm1hZ21vLWFjMTBjLmZpcmViYXNlYXBwLmNvbVwiLFxuICBwcm9qZWN0SWQ6IFwibWFnbW8tYWMxMGNcIixcbiAgc3RvcmFnZUJ1Y2tldDogXCJtYWdtby1hYzEwYy5hcHBzcG90LmNvbVwiLFxuICBtZXNzYWdpbmdTZW5kZXJJZDogXCIxNzc4NTc1MjUxNDdcIixcbiAgYXBwSWQ6IFwiMToxNzc4NTc1MjUxNDc6d2ViOmFjOGUzYzg3ZDgyMzk2YmViMWRkM2VcIixcbiAgbWVhc3VyZW1lbnRJZDogXCJHLUwwMjM2SlQ1TjNcIixcbn07XG4vLyBpZiBhIEZpcmViYXNlIGluc3RhbmNlIGRvZXNuJ3QgZXhpc3QsIGNyZWF0ZSBvbmVcbmlmICghRmlyZWJhc2UuYXBwcy5sZW5ndGgpIHtcbiAgRmlyZWJhc2UuaW5pdGlhbGl6ZUFwcChGaXJlYmFzZUNyZWRlbnRpYWxzKTtcbn1cblxuLy8gU29tZSBuZXR3b3Jrcy9wcm94aWVzIGJsb2NrIEZpcmVzdG9yZSdzIHN0cmVhbWluZyB0cmFuc3BvcnQuXG4vLyBGb3JjZSBsb25nIHBvbGxpbmcgaW4gdGhlIGJyb3dzZXIgdG8gYXZvaWQgc3RhbGxlZCB3cml0ZXMvbGlzdGVucy5cbmlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gIHRyeSB7XG4gICAgRmlyZWJhc2UuZmlyZXN0b3JlKCkuc2V0dGluZ3MoeyBleHBlcmltZW50YWxGb3JjZUxvbmdQb2xsaW5nOiB0cnVlIH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIC8vIElnbm9yZSBpZiBGaXJlc3RvcmUgaGFzIGFscmVhZHkgYmVlbiBpbml0aWFsaXplZCB3aXRoIHNldHRpbmdzLlxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBhdXRoID0gRmlyZWJhc2UuYXV0aCgpO1xuZXhwb3J0IGRlZmF1bHQgRmlyZWJhc2U7XG5cbi8vIGltcG9ydCB7IGluaXRpYWxpemVBcHAgfSBmcm9tICdmaXJlYmFzZS9hcHAnO1xuLy8gaW1wb3J0IHsgZ2V0RmlyZXN0b3JlLCBjb2xsZWN0aW9uLCBnZXREb2NzIH0gZnJvbSAnZmlyZWJhc2UvZmlyZXN0b3JlJztcblxuLy8gY29uc3QgYXBwID0gaW5pdGlhbGl6ZUFwcChmaXJlYmFzZUNvbmZpZyk7XG4vLyBjb25zdCBkYiA9IGdldEZpcmVzdG9yZShhcHApO1xuXG4vLyBleHBvcnQgZGVmYXVsdCBhcHA7XG4iLCJpbXBvcnQgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgRmlyZWJhc2UsIHsgYXV0aCB9IGZyb20gXCIuL0ZpcmViYXNlXCI7XG5cbmNvbnN0IGZvcm1hdEF1dGhVc2VyID0gKHVzZXIpID0+ICh7XG4gIHVpZDogdXNlci51aWQsXG4gIGVtYWlsOiB1c2VyLmVtYWlsLFxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHVzZUZpcmViYXNlQXV0aCgpIHtcbiAgY29uc3QgW2F1dGhVc2VyLCBzZXRBdXRoVXNlcl0gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUodHJ1ZSk7XG5cbiAgY29uc3QgYXV0aFN0YXRlQ2hhbmdlZCA9IGFzeW5jIChhdXRoU3RhdGUpID0+IHtcbiAgICBpZiAoIWF1dGhTdGF0ZSkge1xuICAgICAgc2V0QXV0aFVzZXIobnVsbCk7XG4gICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzZXRMb2FkaW5nKHRydWUpO1xuICAgIGNvbnN0IGZvcm1hdHRlZFVzZXIgPSBmb3JtYXRBdXRoVXNlcihhdXRoU3RhdGUpO1xuICAgIHNldEF1dGhVc2VyKGZvcm1hdHRlZFVzZXIpO1xuICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICB9O1xuXG4gIGNvbnN0IGNsZWFyID0gKCkgPT4ge1xuICAgIHNldEF1dGhVc2VyKG51bGwpO1xuICAgIHNldExvYWRpbmcodHJ1ZSk7XG4gIH07XG5cbiAgLy9zaWduIGluIHdpdGggZ29vZ2xlXG4gIGNvbnN0IHNpZ25JbldpdGhHb29nbGUgPSAoKSA9PiB7XG4gICAgY29uc3QgcHJvdmlkZXIgPSBuZXcgRmlyZWJhc2UuYXV0aC5Hb29nbGVBdXRoUHJvdmlkZXIoKTtcbiAgICBwcm92aWRlci5zZXRDdXN0b21QYXJhbWV0ZXJzKHsgcHJvbXB0OiBcInNlbGVjdF9hY2NvdW50XCIgfSk7XG5cbiAgICByZXR1cm4gYXV0aC5zaWduSW5XaXRoUmVkaXJlY3QocHJvdmlkZXIpLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgY29uc29sZS5lcnJvcihcIkdvb2dsZSBTaWduLUluIEVycm9yOlwiLCBlcnJvcik7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBzaWduT3V0ID0gKCkgPT4gYXV0aC5zaWduT3V0KCkudGhlbihjbGVhcik7XG5cbiAgLy8gTGlzdGVuIGZvciBGaXJlYmFzZSBhdXRoIHN0YXRlIGNoYW5nZXNcbiAgLy8gdXNlRWZmZWN0KCgpID0+IHtcbiAgLy8gICBjb25zdCB1bnN1YnNjcmliZSA9IGF1dGgub25BdXRoU3RhdGVDaGFuZ2VkKGF1dGhTdGF0ZUNoYW5nZWQpO1xuICAvLyAgIHJldHVybiAoKSA9PiB1bnN1YnNjcmliZSgpO1xuICAvLyB9LCBbXSk7XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgbGV0IHVuc3Vic2NyaWJlO1xuICAgIGF1dGhcbiAgICAgIC5zZXRQZXJzaXN0ZW5jZShGaXJlYmFzZS5hdXRoLkF1dGguUGVyc2lzdGVuY2UuTE9DQUwpXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIC8vIE5vdyBzZXQgdXAgdGhlIGxpc3RlbmVyXG4gICAgICAgIHVuc3Vic2NyaWJlID0gYXV0aC5vbkF1dGhTdGF0ZUNoYW5nZWQoYXV0aFN0YXRlQ2hhbmdlZCk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4gY29uc29sZS5lcnJvcihcIkVycm9yIHNldHRpbmcgcGVyc2lzdGVuY2U6XCIsIGVycm9yKSk7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgaWYgKHVuc3Vic2NyaWJlKSB7XG4gICAgICAgIHVuc3Vic2NyaWJlKCk7XG4gICAgICB9XG4gICAgfTtcbiAgfSwgW10pO1xuXG4gIHJldHVybiB7XG4gICAgYXV0aFVzZXIsXG4gICAgbG9hZGluZyxcbiAgICBzaWduSW5XaXRoR29vZ2xlLFxuICAgIHNpZ25PdXQsXG4gIH07XG59XG4iLCJpbXBvcnQgUmVhY3QsIHsgQ2hpbGRyZW4sIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgVXJsT2JqZWN0IH0gZnJvbSAndXJsJ1xuaW1wb3J0IHtcbiAgYWRkQmFzZVBhdGgsXG4gIGFkZExvY2FsZSxcbiAgZ2V0RG9tYWluTG9jYWxlLFxuICBpc0xvY2FsVVJMLFxuICBOZXh0Um91dGVyLFxuICBQcmVmZXRjaE9wdGlvbnMsXG4gIHJlc29sdmVIcmVmLFxufSBmcm9tICcuLi9uZXh0LXNlcnZlci9saWIvcm91dGVyL3JvdXRlcidcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gJy4vcm91dGVyJ1xuaW1wb3J0IHsgdXNlSW50ZXJzZWN0aW9uIH0gZnJvbSAnLi91c2UtaW50ZXJzZWN0aW9uJ1xuXG50eXBlIFVybCA9IHN0cmluZyB8IFVybE9iamVjdFxudHlwZSBSZXF1aXJlZEtleXM8VD4gPSB7XG4gIFtLIGluIGtleW9mIFRdLT86IHt9IGV4dGVuZHMgUGljazxULCBLPiA/IG5ldmVyIDogS1xufVtrZXlvZiBUXVxudHlwZSBPcHRpb25hbEtleXM8VD4gPSB7XG4gIFtLIGluIGtleW9mIFRdLT86IHt9IGV4dGVuZHMgUGljazxULCBLPiA/IEsgOiBuZXZlclxufVtrZXlvZiBUXVxuXG5leHBvcnQgdHlwZSBMaW5rUHJvcHMgPSB7XG4gIGhyZWY6IFVybFxuICBhcz86IFVybFxuICByZXBsYWNlPzogYm9vbGVhblxuICBzY3JvbGw/OiBib29sZWFuXG4gIHNoYWxsb3c/OiBib29sZWFuXG4gIHBhc3NIcmVmPzogYm9vbGVhblxuICBwcmVmZXRjaD86IGJvb2xlYW5cbiAgbG9jYWxlPzogc3RyaW5nIHwgZmFsc2Vcbn1cbnR5cGUgTGlua1Byb3BzUmVxdWlyZWQgPSBSZXF1aXJlZEtleXM8TGlua1Byb3BzPlxudHlwZSBMaW5rUHJvcHNPcHRpb25hbCA9IE9wdGlvbmFsS2V5czxMaW5rUHJvcHM+XG5cbmNvbnN0IHByZWZldGNoZWQ6IHsgW2NhY2hlS2V5OiBzdHJpbmddOiBib29sZWFuIH0gPSB7fVxuXG5mdW5jdGlvbiBwcmVmZXRjaChcbiAgcm91dGVyOiBOZXh0Um91dGVyLFxuICBocmVmOiBzdHJpbmcsXG4gIGFzOiBzdHJpbmcsXG4gIG9wdGlvbnM/OiBQcmVmZXRjaE9wdGlvbnNcbik6IHZvaWQge1xuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgfHwgIXJvdXRlcikgcmV0dXJuXG4gIGlmICghaXNMb2NhbFVSTChocmVmKSkgcmV0dXJuXG4gIC8vIFByZWZldGNoIHRoZSBKU09OIHBhZ2UgaWYgYXNrZWQgKG9ubHkgaW4gdGhlIGNsaWVudClcbiAgLy8gV2UgbmVlZCB0byBoYW5kbGUgYSBwcmVmZXRjaCBlcnJvciBoZXJlIHNpbmNlIHdlIG1heSBiZVxuICAvLyBsb2FkaW5nIHdpdGggcHJpb3JpdHkgd2hpY2ggY2FuIHJlamVjdCBidXQgd2UgZG9uJ3RcbiAgLy8gd2FudCB0byBmb3JjZSBuYXZpZ2F0aW9uIHNpbmNlIHRoaXMgaXMgb25seSBhIHByZWZldGNoXG4gIHJvdXRlci5wcmVmZXRjaChocmVmLCBhcywgb3B0aW9ucykuY2F0Y2goKGVycikgPT4ge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAvLyByZXRocm93IHRvIHNob3cgaW52YWxpZCBVUkwgZXJyb3JzXG4gICAgICB0aHJvdyBlcnJcbiAgICB9XG4gIH0pXG4gIGNvbnN0IGN1ckxvY2FsZSA9XG4gICAgb3B0aW9ucyAmJiB0eXBlb2Ygb3B0aW9ucy5sb2NhbGUgIT09ICd1bmRlZmluZWQnXG4gICAgICA/IG9wdGlvbnMubG9jYWxlXG4gICAgICA6IHJvdXRlciAmJiByb3V0ZXIubG9jYWxlXG5cbiAgLy8gSm9pbiBvbiBhbiBpbnZhbGlkIFVSSSBjaGFyYWN0ZXJcbiAgcHJlZmV0Y2hlZFtocmVmICsgJyUnICsgYXMgKyAoY3VyTG9jYWxlID8gJyUnICsgY3VyTG9jYWxlIDogJycpXSA9IHRydWVcbn1cblxuZnVuY3Rpb24gaXNNb2RpZmllZEV2ZW50KGV2ZW50OiBSZWFjdC5Nb3VzZUV2ZW50KTogYm9vbGVhbiB7XG4gIGNvbnN0IHsgdGFyZ2V0IH0gPSBldmVudC5jdXJyZW50VGFyZ2V0IGFzIEhUTUxBbmNob3JFbGVtZW50XG4gIHJldHVybiAoXG4gICAgKHRhcmdldCAmJiB0YXJnZXQgIT09ICdfc2VsZicpIHx8XG4gICAgZXZlbnQubWV0YUtleSB8fFxuICAgIGV2ZW50LmN0cmxLZXkgfHxcbiAgICBldmVudC5zaGlmdEtleSB8fFxuICAgIGV2ZW50LmFsdEtleSB8fCAvLyB0cmlnZ2VycyByZXNvdXJjZSBkb3dubG9hZFxuICAgIChldmVudC5uYXRpdmVFdmVudCAmJiBldmVudC5uYXRpdmVFdmVudC53aGljaCA9PT0gMilcbiAgKVxufVxuXG5mdW5jdGlvbiBsaW5rQ2xpY2tlZChcbiAgZTogUmVhY3QuTW91c2VFdmVudCxcbiAgcm91dGVyOiBOZXh0Um91dGVyLFxuICBocmVmOiBzdHJpbmcsXG4gIGFzOiBzdHJpbmcsXG4gIHJlcGxhY2U/OiBib29sZWFuLFxuICBzaGFsbG93PzogYm9vbGVhbixcbiAgc2Nyb2xsPzogYm9vbGVhbixcbiAgbG9jYWxlPzogc3RyaW5nIHwgZmFsc2Vcbik6IHZvaWQge1xuICBjb25zdCB7IG5vZGVOYW1lIH0gPSBlLmN1cnJlbnRUYXJnZXRcblxuICBpZiAobm9kZU5hbWUgPT09ICdBJyAmJiAoaXNNb2RpZmllZEV2ZW50KGUpIHx8ICFpc0xvY2FsVVJMKGhyZWYpKSkge1xuICAgIC8vIGlnbm9yZSBjbGljayBmb3IgYnJvd3NlcuKAmXMgZGVmYXVsdCBiZWhhdmlvclxuICAgIHJldHVyblxuICB9XG5cbiAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgLy8gIGF2b2lkIHNjcm9sbCBmb3IgdXJscyB3aXRoIGFuY2hvciByZWZzXG4gIGlmIChzY3JvbGwgPT0gbnVsbCkge1xuICAgIHNjcm9sbCA9IGFzLmluZGV4T2YoJyMnKSA8IDBcbiAgfVxuXG4gIC8vIHJlcGxhY2Ugc3RhdGUgaW5zdGVhZCBvZiBwdXNoIGlmIHByb3AgaXMgcHJlc2VudFxuICByb3V0ZXJbcmVwbGFjZSA/ICdyZXBsYWNlJyA6ICdwdXNoJ10oaHJlZiwgYXMsIHtcbiAgICBzaGFsbG93LFxuICAgIGxvY2FsZSxcbiAgICBzY3JvbGwsXG4gIH0pXG59XG5cbmZ1bmN0aW9uIExpbmsocHJvcHM6IFJlYWN0LlByb3BzV2l0aENoaWxkcmVuPExpbmtQcm9wcz4pIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBmdW5jdGlvbiBjcmVhdGVQcm9wRXJyb3IoYXJnczoge1xuICAgICAga2V5OiBzdHJpbmdcbiAgICAgIGV4cGVjdGVkOiBzdHJpbmdcbiAgICAgIGFjdHVhbDogc3RyaW5nXG4gICAgfSkge1xuICAgICAgcmV0dXJuIG5ldyBFcnJvcihcbiAgICAgICAgYEZhaWxlZCBwcm9wIHR5cGU6IFRoZSBwcm9wIFxcYCR7YXJncy5rZXl9XFxgIGV4cGVjdHMgYSAke2FyZ3MuZXhwZWN0ZWR9IGluIFxcYDxMaW5rPlxcYCwgYnV0IGdvdCBcXGAke2FyZ3MuYWN0dWFsfVxcYCBpbnN0ZWFkLmAgK1xuICAgICAgICAgICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJ1xuICAgICAgICAgICAgPyBcIlxcbk9wZW4geW91ciBicm93c2VyJ3MgY29uc29sZSB0byB2aWV3IHRoZSBDb21wb25lbnQgc3RhY2sgdHJhY2UuXCJcbiAgICAgICAgICAgIDogJycpXG4gICAgICApXG4gICAgfVxuXG4gICAgLy8gVHlwZVNjcmlwdCB0cmljayBmb3IgdHlwZS1ndWFyZGluZzpcbiAgICBjb25zdCByZXF1aXJlZFByb3BzR3VhcmQ6IFJlY29yZDxMaW5rUHJvcHNSZXF1aXJlZCwgdHJ1ZT4gPSB7XG4gICAgICBocmVmOiB0cnVlLFxuICAgIH0gYXMgY29uc3RcbiAgICBjb25zdCByZXF1aXJlZFByb3BzOiBMaW5rUHJvcHNSZXF1aXJlZFtdID0gT2JqZWN0LmtleXMoXG4gICAgICByZXF1aXJlZFByb3BzR3VhcmRcbiAgICApIGFzIExpbmtQcm9wc1JlcXVpcmVkW11cbiAgICByZXF1aXJlZFByb3BzLmZvckVhY2goKGtleTogTGlua1Byb3BzUmVxdWlyZWQpID0+IHtcbiAgICAgIGlmIChrZXkgPT09ICdocmVmJykge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgcHJvcHNba2V5XSA9PSBudWxsIHx8XG4gICAgICAgICAgKHR5cGVvZiBwcm9wc1trZXldICE9PSAnc3RyaW5nJyAmJiB0eXBlb2YgcHJvcHNba2V5XSAhPT0gJ29iamVjdCcpXG4gICAgICAgICkge1xuICAgICAgICAgIHRocm93IGNyZWF0ZVByb3BFcnJvcih7XG4gICAgICAgICAgICBrZXksXG4gICAgICAgICAgICBleHBlY3RlZDogJ2BzdHJpbmdgIG9yIGBvYmplY3RgJyxcbiAgICAgICAgICAgIGFjdHVhbDogcHJvcHNba2V5XSA9PT0gbnVsbCA/ICdudWxsJyA6IHR5cGVvZiBwcm9wc1trZXldLFxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFR5cGVTY3JpcHQgdHJpY2sgZm9yIHR5cGUtZ3VhcmRpbmc6XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcbiAgICAgICAgY29uc3QgXzogbmV2ZXIgPSBrZXlcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgLy8gVHlwZVNjcmlwdCB0cmljayBmb3IgdHlwZS1ndWFyZGluZzpcbiAgICBjb25zdCBvcHRpb25hbFByb3BzR3VhcmQ6IFJlY29yZDxMaW5rUHJvcHNPcHRpb25hbCwgdHJ1ZT4gPSB7XG4gICAgICBhczogdHJ1ZSxcbiAgICAgIHJlcGxhY2U6IHRydWUsXG4gICAgICBzY3JvbGw6IHRydWUsXG4gICAgICBzaGFsbG93OiB0cnVlLFxuICAgICAgcGFzc0hyZWY6IHRydWUsXG4gICAgICBwcmVmZXRjaDogdHJ1ZSxcbiAgICAgIGxvY2FsZTogdHJ1ZSxcbiAgICB9IGFzIGNvbnN0XG4gICAgY29uc3Qgb3B0aW9uYWxQcm9wczogTGlua1Byb3BzT3B0aW9uYWxbXSA9IE9iamVjdC5rZXlzKFxuICAgICAgb3B0aW9uYWxQcm9wc0d1YXJkXG4gICAgKSBhcyBMaW5rUHJvcHNPcHRpb25hbFtdXG4gICAgb3B0aW9uYWxQcm9wcy5mb3JFYWNoKChrZXk6IExpbmtQcm9wc09wdGlvbmFsKSA9PiB7XG4gICAgICBjb25zdCB2YWxUeXBlID0gdHlwZW9mIHByb3BzW2tleV1cblxuICAgICAgaWYgKGtleSA9PT0gJ2FzJykge1xuICAgICAgICBpZiAocHJvcHNba2V5XSAmJiB2YWxUeXBlICE9PSAnc3RyaW5nJyAmJiB2YWxUeXBlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICAgIHRocm93IGNyZWF0ZVByb3BFcnJvcih7XG4gICAgICAgICAgICBrZXksXG4gICAgICAgICAgICBleHBlY3RlZDogJ2BzdHJpbmdgIG9yIGBvYmplY3RgJyxcbiAgICAgICAgICAgIGFjdHVhbDogdmFsVHlwZSxcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGtleSA9PT0gJ2xvY2FsZScpIHtcbiAgICAgICAgaWYgKHByb3BzW2tleV0gJiYgdmFsVHlwZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICB0aHJvdyBjcmVhdGVQcm9wRXJyb3Ioe1xuICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgZXhwZWN0ZWQ6ICdgc3RyaW5nYCcsXG4gICAgICAgICAgICBhY3R1YWw6IHZhbFR5cGUsXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAga2V5ID09PSAncmVwbGFjZScgfHxcbiAgICAgICAga2V5ID09PSAnc2Nyb2xsJyB8fFxuICAgICAgICBrZXkgPT09ICdzaGFsbG93JyB8fFxuICAgICAgICBrZXkgPT09ICdwYXNzSHJlZicgfHxcbiAgICAgICAga2V5ID09PSAncHJlZmV0Y2gnXG4gICAgICApIHtcbiAgICAgICAgaWYgKHByb3BzW2tleV0gIT0gbnVsbCAmJiB2YWxUeXBlICE9PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICB0aHJvdyBjcmVhdGVQcm9wRXJyb3Ioe1xuICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgZXhwZWN0ZWQ6ICdgYm9vbGVhbmAnLFxuICAgICAgICAgICAgYWN0dWFsOiB2YWxUeXBlLFxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFR5cGVTY3JpcHQgdHJpY2sgZm9yIHR5cGUtZ3VhcmRpbmc6XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcbiAgICAgICAgY29uc3QgXzogbmV2ZXIgPSBrZXlcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgLy8gVGhpcyBob29rIGlzIGluIGEgY29uZGl0aW9uYWwgYnV0IHRoYXQgaXMgb2sgYmVjYXVzZSBgcHJvY2Vzcy5lbnYuTk9ERV9FTlZgIG5ldmVyIGNoYW5nZXNcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVhY3QtaG9va3MvcnVsZXMtb2YtaG9va3NcbiAgICBjb25zdCBoYXNXYXJuZWQgPSBSZWFjdC51c2VSZWYoZmFsc2UpXG4gICAgaWYgKHByb3BzLnByZWZldGNoICYmICFoYXNXYXJuZWQuY3VycmVudCkge1xuICAgICAgaGFzV2FybmVkLmN1cnJlbnQgPSB0cnVlXG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICdOZXh0LmpzIGF1dG8tcHJlZmV0Y2hlcyBhdXRvbWF0aWNhbGx5IGJhc2VkIG9uIHZpZXdwb3J0LiBUaGUgcHJlZmV0Y2ggYXR0cmlidXRlIGlzIG5vIGxvbmdlciBuZWVkZWQuIE1vcmU6IGh0dHBzOi8vbmV4dGpzLm9yZy9kb2NzL21lc3NhZ2VzL3ByZWZldGNoLXRydWUtZGVwcmVjYXRlZCdcbiAgICAgIClcbiAgICB9XG4gIH1cbiAgY29uc3QgcCA9IHByb3BzLnByZWZldGNoICE9PSBmYWxzZVxuXG4gIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpXG4gIGNvbnN0IHBhdGhuYW1lID0gKHJvdXRlciAmJiByb3V0ZXIuYXNQYXRoKSB8fCAnLydcblxuICBjb25zdCB7IGhyZWYsIGFzIH0gPSBSZWFjdC51c2VNZW1vKCgpID0+IHtcbiAgICBjb25zdCBbcmVzb2x2ZWRIcmVmLCByZXNvbHZlZEFzXSA9IHJlc29sdmVIcmVmKHBhdGhuYW1lLCBwcm9wcy5ocmVmLCB0cnVlKVxuICAgIHJldHVybiB7XG4gICAgICBocmVmOiByZXNvbHZlZEhyZWYsXG4gICAgICBhczogcHJvcHMuYXNcbiAgICAgICAgPyByZXNvbHZlSHJlZihwYXRobmFtZSwgcHJvcHMuYXMpXG4gICAgICAgIDogcmVzb2x2ZWRBcyB8fCByZXNvbHZlZEhyZWYsXG4gICAgfVxuICB9LCBbcGF0aG5hbWUsIHByb3BzLmhyZWYsIHByb3BzLmFzXSlcblxuICBsZXQgeyBjaGlsZHJlbiwgcmVwbGFjZSwgc2hhbGxvdywgc2Nyb2xsLCBsb2NhbGUgfSA9IHByb3BzXG5cbiAgLy8gRGVwcmVjYXRlZC4gV2FybmluZyBzaG93biBieSBwcm9wVHlwZSBjaGVjay4gSWYgdGhlIGNoaWxkcmVuIHByb3ZpZGVkIGlzIGEgc3RyaW5nICg8TGluaz5leGFtcGxlPC9MaW5rPikgd2Ugd3JhcCBpdCBpbiBhbiA8YT4gdGFnXG4gIGlmICh0eXBlb2YgY2hpbGRyZW4gPT09ICdzdHJpbmcnKSB7XG4gICAgY2hpbGRyZW4gPSA8YT57Y2hpbGRyZW59PC9hPlxuICB9XG5cbiAgLy8gVGhpcyB3aWxsIHJldHVybiB0aGUgZmlyc3QgY2hpbGQsIGlmIG11bHRpcGxlIGFyZSBwcm92aWRlZCBpdCB3aWxsIHRocm93IGFuIGVycm9yXG4gIGNvbnN0IGNoaWxkOiBhbnkgPSBDaGlsZHJlbi5vbmx5KGNoaWxkcmVuKVxuICBjb25zdCBjaGlsZFJlZjogYW55ID0gY2hpbGQgJiYgdHlwZW9mIGNoaWxkID09PSAnb2JqZWN0JyAmJiBjaGlsZC5yZWZcblxuICBjb25zdCBbc2V0SW50ZXJzZWN0aW9uUmVmLCBpc1Zpc2libGVdID0gdXNlSW50ZXJzZWN0aW9uKHtcbiAgICByb290TWFyZ2luOiAnMjAwcHgnLFxuICB9KVxuICBjb25zdCBzZXRSZWYgPSBSZWFjdC51c2VDYWxsYmFjayhcbiAgICAoZWw6IEVsZW1lbnQpID0+IHtcbiAgICAgIHNldEludGVyc2VjdGlvblJlZihlbClcbiAgICAgIGlmIChjaGlsZFJlZikge1xuICAgICAgICBpZiAodHlwZW9mIGNoaWxkUmVmID09PSAnZnVuY3Rpb24nKSBjaGlsZFJlZihlbClcbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIGNoaWxkUmVmID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgIGNoaWxkUmVmLmN1cnJlbnQgPSBlbFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBbY2hpbGRSZWYsIHNldEludGVyc2VjdGlvblJlZl1cbiAgKVxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IHNob3VsZFByZWZldGNoID0gaXNWaXNpYmxlICYmIHAgJiYgaXNMb2NhbFVSTChocmVmKVxuICAgIGNvbnN0IGN1ckxvY2FsZSA9XG4gICAgICB0eXBlb2YgbG9jYWxlICE9PSAndW5kZWZpbmVkJyA/IGxvY2FsZSA6IHJvdXRlciAmJiByb3V0ZXIubG9jYWxlXG4gICAgY29uc3QgaXNQcmVmZXRjaGVkID1cbiAgICAgIHByZWZldGNoZWRbaHJlZiArICclJyArIGFzICsgKGN1ckxvY2FsZSA/ICclJyArIGN1ckxvY2FsZSA6ICcnKV1cbiAgICBpZiAoc2hvdWxkUHJlZmV0Y2ggJiYgIWlzUHJlZmV0Y2hlZCkge1xuICAgICAgcHJlZmV0Y2gocm91dGVyLCBocmVmLCBhcywge1xuICAgICAgICBsb2NhbGU6IGN1ckxvY2FsZSxcbiAgICAgIH0pXG4gICAgfVxuICB9LCBbYXMsIGhyZWYsIGlzVmlzaWJsZSwgbG9jYWxlLCBwLCByb3V0ZXJdKVxuXG4gIGNvbnN0IGNoaWxkUHJvcHM6IHtcbiAgICBvbk1vdXNlRW50ZXI/OiBSZWFjdC5Nb3VzZUV2ZW50SGFuZGxlclxuICAgIG9uQ2xpY2s6IFJlYWN0Lk1vdXNlRXZlbnRIYW5kbGVyXG4gICAgaHJlZj86IHN0cmluZ1xuICAgIHJlZj86IGFueVxuICB9ID0ge1xuICAgIHJlZjogc2V0UmVmLFxuICAgIG9uQ2xpY2s6IChlOiBSZWFjdC5Nb3VzZUV2ZW50KSA9PiB7XG4gICAgICBpZiAoY2hpbGQucHJvcHMgJiYgdHlwZW9mIGNoaWxkLnByb3BzLm9uQ2xpY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgY2hpbGQucHJvcHMub25DbGljayhlKVxuICAgICAgfVxuICAgICAgaWYgKCFlLmRlZmF1bHRQcmV2ZW50ZWQpIHtcbiAgICAgICAgbGlua0NsaWNrZWQoZSwgcm91dGVyLCBocmVmLCBhcywgcmVwbGFjZSwgc2hhbGxvdywgc2Nyb2xsLCBsb2NhbGUpXG4gICAgICB9XG4gICAgfSxcbiAgfVxuXG4gIGNoaWxkUHJvcHMub25Nb3VzZUVudGVyID0gKGU6IFJlYWN0Lk1vdXNlRXZlbnQpID0+IHtcbiAgICBpZiAoIWlzTG9jYWxVUkwoaHJlZikpIHJldHVyblxuICAgIGlmIChjaGlsZC5wcm9wcyAmJiB0eXBlb2YgY2hpbGQucHJvcHMub25Nb3VzZUVudGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjaGlsZC5wcm9wcy5vbk1vdXNlRW50ZXIoZSlcbiAgICB9XG4gICAgcHJlZmV0Y2gocm91dGVyLCBocmVmLCBhcywgeyBwcmlvcml0eTogdHJ1ZSB9KVxuICB9XG5cbiAgLy8gSWYgY2hpbGQgaXMgYW4gPGE+IHRhZyBhbmQgZG9lc24ndCBoYXZlIGEgaHJlZiBhdHRyaWJ1dGUsIG9yIGlmIHRoZSAncGFzc0hyZWYnIHByb3BlcnR5IGlzXG4gIC8vIGRlZmluZWQsIHdlIHNwZWNpZnkgdGhlIGN1cnJlbnQgJ2hyZWYnLCBzbyB0aGF0IHJlcGV0aXRpb24gaXMgbm90IG5lZWRlZCBieSB0aGUgdXNlclxuICBpZiAocHJvcHMucGFzc0hyZWYgfHwgKGNoaWxkLnR5cGUgPT09ICdhJyAmJiAhKCdocmVmJyBpbiBjaGlsZC5wcm9wcykpKSB7XG4gICAgY29uc3QgY3VyTG9jYWxlID1cbiAgICAgIHR5cGVvZiBsb2NhbGUgIT09ICd1bmRlZmluZWQnID8gbG9jYWxlIDogcm91dGVyICYmIHJvdXRlci5sb2NhbGVcblxuICAgIC8vIHdlIG9ubHkgcmVuZGVyIGRvbWFpbiBsb2NhbGVzIGlmIHdlIGFyZSBjdXJyZW50bHkgb24gYSBkb21haW4gbG9jYWxlXG4gICAgLy8gc28gdGhhdCBsb2NhbGUgbGlua3MgYXJlIHN0aWxsIHZpc2l0YWJsZSBpbiBkZXZlbG9wbWVudC9wcmV2aWV3IGVudnNcbiAgICBjb25zdCBsb2NhbGVEb21haW4gPVxuICAgICAgcm91dGVyICYmXG4gICAgICByb3V0ZXIuaXNMb2NhbGVEb21haW4gJiZcbiAgICAgIGdldERvbWFpbkxvY2FsZShcbiAgICAgICAgYXMsXG4gICAgICAgIGN1ckxvY2FsZSxcbiAgICAgICAgcm91dGVyICYmIHJvdXRlci5sb2NhbGVzLFxuICAgICAgICByb3V0ZXIgJiYgcm91dGVyLmRvbWFpbkxvY2FsZXNcbiAgICAgIClcblxuICAgIGNoaWxkUHJvcHMuaHJlZiA9XG4gICAgICBsb2NhbGVEb21haW4gfHxcbiAgICAgIGFkZEJhc2VQYXRoKGFkZExvY2FsZShhcywgY3VyTG9jYWxlLCByb3V0ZXIgJiYgcm91dGVyLmRlZmF1bHRMb2NhbGUpKVxuICB9XG5cbiAgcmV0dXJuIFJlYWN0LmNsb25lRWxlbWVudChjaGlsZCwgY2hpbGRQcm9wcylcbn1cblxuZXhwb3J0IGRlZmF1bHQgTGlua1xuIiwiLyoqXG4gKiBSZW1vdmVzIHRoZSB0cmFpbGluZyBzbGFzaCBvZiBhIHBhdGggaWYgdGhlcmUgaXMgb25lLiBQcmVzZXJ2ZXMgdGhlIHJvb3QgcGF0aCBgL2AuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVQYXRoVHJhaWxpbmdTbGFzaChwYXRoOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gcGF0aC5lbmRzV2l0aCgnLycpICYmIHBhdGggIT09ICcvJyA/IHBhdGguc2xpY2UoMCwgLTEpIDogcGF0aFxufVxuXG4vKipcbiAqIE5vcm1hbGl6ZXMgdGhlIHRyYWlsaW5nIHNsYXNoIG9mIGEgcGF0aCBhY2NvcmRpbmcgdG8gdGhlIGB0cmFpbGluZ1NsYXNoYCBvcHRpb25cbiAqIGluIGBuZXh0LmNvbmZpZy5qc2AuXG4gKi9cbmV4cG9ydCBjb25zdCBub3JtYWxpemVQYXRoVHJhaWxpbmdTbGFzaCA9IHByb2Nlc3MuZW52Ll9fTkVYVF9UUkFJTElOR19TTEFTSFxuICA/IChwYXRoOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICAgICAgaWYgKC9cXC5bXi9dK1xcLz8kLy50ZXN0KHBhdGgpKSB7XG4gICAgICAgIHJldHVybiByZW1vdmVQYXRoVHJhaWxpbmdTbGFzaChwYXRoKVxuICAgICAgfSBlbHNlIGlmIChwYXRoLmVuZHNXaXRoKCcvJykpIHtcbiAgICAgICAgcmV0dXJuIHBhdGhcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBwYXRoICsgJy8nXG4gICAgICB9XG4gICAgfVxuICA6IHJlbW92ZVBhdGhUcmFpbGluZ1NsYXNoXG4iLCJ0eXBlIFJlcXVlc3RJZGxlQ2FsbGJhY2tIYW5kbGUgPSBhbnlcbnR5cGUgUmVxdWVzdElkbGVDYWxsYmFja09wdGlvbnMgPSB7XG4gIHRpbWVvdXQ6IG51bWJlclxufVxudHlwZSBSZXF1ZXN0SWRsZUNhbGxiYWNrRGVhZGxpbmUgPSB7XG4gIHJlYWRvbmx5IGRpZFRpbWVvdXQ6IGJvb2xlYW5cbiAgdGltZVJlbWFpbmluZzogKCkgPT4gbnVtYmVyXG59XG5cbmRlY2xhcmUgZ2xvYmFsIHtcbiAgaW50ZXJmYWNlIFdpbmRvdyB7XG4gICAgcmVxdWVzdElkbGVDYWxsYmFjazogKFxuICAgICAgY2FsbGJhY2s6IChkZWFkbGluZTogUmVxdWVzdElkbGVDYWxsYmFja0RlYWRsaW5lKSA9PiB2b2lkLFxuICAgICAgb3B0cz86IFJlcXVlc3RJZGxlQ2FsbGJhY2tPcHRpb25zXG4gICAgKSA9PiBSZXF1ZXN0SWRsZUNhbGxiYWNrSGFuZGxlXG4gICAgY2FuY2VsSWRsZUNhbGxiYWNrOiAoaWQ6IFJlcXVlc3RJZGxlQ2FsbGJhY2tIYW5kbGUpID0+IHZvaWRcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgcmVxdWVzdElkbGVDYWxsYmFjayA9XG4gICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgJiYgc2VsZi5yZXF1ZXN0SWRsZUNhbGxiYWNrKSB8fFxuICBmdW5jdGlvbiAoXG4gICAgY2I6IChkZWFkbGluZTogUmVxdWVzdElkbGVDYWxsYmFja0RlYWRsaW5lKSA9PiB2b2lkXG4gICk6IE5vZGVKUy5UaW1lb3V0IHtcbiAgICBsZXQgc3RhcnQgPSBEYXRlLm5vdygpXG4gICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgY2Ioe1xuICAgICAgICBkaWRUaW1lb3V0OiBmYWxzZSxcbiAgICAgICAgdGltZVJlbWFpbmluZzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBNYXRoLm1heCgwLCA1MCAtIChEYXRlLm5vdygpIC0gc3RhcnQpKVxuICAgICAgICB9LFxuICAgICAgfSlcbiAgICB9LCAxKVxuICB9XG5cbmV4cG9ydCBjb25zdCBjYW5jZWxJZGxlQ2FsbGJhY2sgPVxuICAodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnICYmIHNlbGYuY2FuY2VsSWRsZUNhbGxiYWNrKSB8fFxuICBmdW5jdGlvbiAoaWQ6IFJlcXVlc3RJZGxlQ2FsbGJhY2tIYW5kbGUpIHtcbiAgICByZXR1cm4gY2xlYXJUaW1lb3V0KGlkKVxuICB9XG4iLCJpbXBvcnQgeyBDb21wb25lbnRUeXBlIH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBDbGllbnRCdWlsZE1hbmlmZXN0IH0gZnJvbSAnLi4vYnVpbGQvd2VicGFjay9wbHVnaW5zL2J1aWxkLW1hbmlmZXN0LXBsdWdpbidcbmltcG9ydCBnZXRBc3NldFBhdGhGcm9tUm91dGUgZnJvbSAnLi4vbmV4dC1zZXJ2ZXIvbGliL3JvdXRlci91dGlscy9nZXQtYXNzZXQtcGF0aC1mcm9tLXJvdXRlJ1xuaW1wb3J0IHsgcmVxdWVzdElkbGVDYWxsYmFjayB9IGZyb20gJy4vcmVxdWVzdC1pZGxlLWNhbGxiYWNrJ1xuXG4vLyAzLjhzIHdhcyBhcmJpdHJhcmlseSBjaG9zZW4gYXMgaXQncyB3aGF0IGh0dHBzOi8vd2ViLmRldi9pbnRlcmFjdGl2ZVxuLy8gY29uc2lkZXJzIGFzIFwiR29vZFwiIHRpbWUtdG8taW50ZXJhY3RpdmUuIFdlIG11c3QgYXNzdW1lIHNvbWV0aGluZyB3ZW50XG4vLyB3cm9uZyBiZXlvbmQgdGhpcyBwb2ludCwgYW5kIHRoZW4gZmFsbC1iYWNrIHRvIGEgZnVsbCBwYWdlIHRyYW5zaXRpb24gdG9cbi8vIHNob3cgdGhlIHVzZXIgc29tZXRoaW5nIG9mIHZhbHVlLlxuY29uc3QgTVNfTUFYX0lETEVfREVMQVkgPSAzODAwXG5cbmRlY2xhcmUgZ2xvYmFsIHtcbiAgaW50ZXJmYWNlIFdpbmRvdyB7XG4gICAgX19CVUlMRF9NQU5JRkVTVD86IENsaWVudEJ1aWxkTWFuaWZlc3RcbiAgICBfX0JVSUxEX01BTklGRVNUX0NCPzogRnVuY3Rpb25cbiAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIExvYWRlZEVudHJ5cG9pbnRTdWNjZXNzIHtcbiAgY29tcG9uZW50OiBDb21wb25lbnRUeXBlXG4gIGV4cG9ydHM6IGFueVxufVxuZXhwb3J0IGludGVyZmFjZSBMb2FkZWRFbnRyeXBvaW50RmFpbHVyZSB7XG4gIGVycm9yOiB1bmtub3duXG59XG5leHBvcnQgdHlwZSBSb3V0ZUVudHJ5cG9pbnQgPSBMb2FkZWRFbnRyeXBvaW50U3VjY2VzcyB8IExvYWRlZEVudHJ5cG9pbnRGYWlsdXJlXG5cbmV4cG9ydCBpbnRlcmZhY2UgUm91dGVTdHlsZVNoZWV0IHtcbiAgaHJlZjogc3RyaW5nXG4gIGNvbnRlbnQ6IHN0cmluZ1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIExvYWRlZFJvdXRlU3VjY2VzcyBleHRlbmRzIExvYWRlZEVudHJ5cG9pbnRTdWNjZXNzIHtcbiAgc3R5bGVzOiBSb3V0ZVN0eWxlU2hlZXRbXVxufVxuZXhwb3J0IGludGVyZmFjZSBMb2FkZWRSb3V0ZUZhaWx1cmUge1xuICBlcnJvcjogdW5rbm93blxufVxuZXhwb3J0IHR5cGUgUm91dGVMb2FkZXJFbnRyeSA9IExvYWRlZFJvdXRlU3VjY2VzcyB8IExvYWRlZFJvdXRlRmFpbHVyZVxuXG5leHBvcnQgdHlwZSBGdXR1cmU8Vj4gPSB7XG4gIHJlc29sdmU6IChlbnRyeXBvaW50OiBWKSA9PiB2b2lkXG4gIGZ1dHVyZTogUHJvbWlzZTxWPlxufVxuZnVuY3Rpb24gd2l0aEZ1dHVyZTxUPihcbiAga2V5OiBzdHJpbmcsXG4gIG1hcDogTWFwPHN0cmluZywgRnV0dXJlPFQ+IHwgVD4sXG4gIGdlbmVyYXRvcj86ICgpID0+IFByb21pc2U8VD5cbik6IFByb21pc2U8VD4ge1xuICBsZXQgZW50cnk6IEZ1dHVyZTxUPiB8IFQgfCB1bmRlZmluZWQgPSBtYXAuZ2V0KGtleSlcbiAgaWYgKGVudHJ5KSB7XG4gICAgaWYgKCdmdXR1cmUnIGluIGVudHJ5KSB7XG4gICAgICByZXR1cm4gZW50cnkuZnV0dXJlXG4gICAgfVxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZW50cnkpXG4gIH1cbiAgbGV0IHJlc29sdmVyOiAoZW50cnlwb2ludDogVCkgPT4gdm9pZFxuICBjb25zdCBwcm9tOiBQcm9taXNlPFQ+ID0gbmV3IFByb21pc2U8VD4oKHJlc29sdmUpID0+IHtcbiAgICByZXNvbHZlciA9IHJlc29sdmVcbiAgfSlcbiAgbWFwLnNldChrZXksIChlbnRyeSA9IHsgcmVzb2x2ZTogcmVzb2x2ZXIhLCBmdXR1cmU6IHByb20gfSkpXG4gIHJldHVybiBnZW5lcmF0b3JcbiAgICA/IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZXF1ZW5jZXNcbiAgICAgIGdlbmVyYXRvcigpLnRoZW4oKHZhbHVlKSA9PiAocmVzb2x2ZXIodmFsdWUpLCB2YWx1ZSkpXG4gICAgOiBwcm9tXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUm91dGVMb2FkZXIge1xuICB3aGVuRW50cnlwb2ludChyb3V0ZTogc3RyaW5nKTogUHJvbWlzZTxSb3V0ZUVudHJ5cG9pbnQ+XG4gIG9uRW50cnlwb2ludChyb3V0ZTogc3RyaW5nLCBleGVjdXRlOiAoKSA9PiB1bmtub3duKTogdm9pZFxuICBsb2FkUm91dGUocm91dGU6IHN0cmluZywgcHJlZmV0Y2g/OiBib29sZWFuKTogUHJvbWlzZTxSb3V0ZUxvYWRlckVudHJ5PlxuICBwcmVmZXRjaChyb3V0ZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPlxufVxuXG5mdW5jdGlvbiBoYXNQcmVmZXRjaChsaW5rPzogSFRNTExpbmtFbGVtZW50KTogYm9vbGVhbiB7XG4gIHRyeSB7XG4gICAgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKVxuICAgIHJldHVybiAoXG4gICAgICAvLyBkZXRlY3QgSUUxMSBzaW5jZSBpdCBzdXBwb3J0cyBwcmVmZXRjaCBidXQgaXNuJ3QgZGV0ZWN0ZWRcbiAgICAgIC8vIHdpdGggcmVsTGlzdC5zdXBwb3J0XG4gICAgICAoISF3aW5kb3cuTVNJbnB1dE1ldGhvZENvbnRleHQgJiYgISEoZG9jdW1lbnQgYXMgYW55KS5kb2N1bWVudE1vZGUpIHx8XG4gICAgICBsaW5rLnJlbExpc3Quc3VwcG9ydHMoJ3ByZWZldGNoJylcbiAgICApXG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG59XG5cbmNvbnN0IGNhblByZWZldGNoOiBib29sZWFuID0gaGFzUHJlZmV0Y2goKVxuXG5mdW5jdGlvbiBwcmVmZXRjaFZpYURvbShcbiAgaHJlZjogc3RyaW5nLFxuICBhczogc3RyaW5nLFxuICBsaW5rPzogSFRNTExpbmtFbGVtZW50XG4pOiBQcm9taXNlPGFueT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlcywgcmVqKSA9PiB7XG4gICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGxpbmtbcmVsPVwicHJlZmV0Y2hcIl1baHJlZl49XCIke2hyZWZ9XCJdYCkpIHtcbiAgICAgIHJldHVybiByZXMoKVxuICAgIH1cblxuICAgIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJylcblxuICAgIC8vIFRoZSBvcmRlciBvZiBwcm9wZXJ0eSBhc3NpZ25tZW50IGhlcmUgaXMgaW50ZW50aW9uYWw6XG4gICAgaWYgKGFzKSBsaW5rIS5hcyA9IGFzXG4gICAgbGluayEucmVsID0gYHByZWZldGNoYFxuICAgIGxpbmshLmNyb3NzT3JpZ2luID0gcHJvY2Vzcy5lbnYuX19ORVhUX0NST1NTX09SSUdJTiFcbiAgICBsaW5rIS5vbmxvYWQgPSByZXNcbiAgICBsaW5rIS5vbmVycm9yID0gcmVqXG5cbiAgICAvLyBgaHJlZmAgc2hvdWxkIGFsd2F5cyBiZSBsYXN0OlxuICAgIGxpbmshLmhyZWYgPSBocmVmXG5cbiAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGxpbmspXG4gIH0pXG59XG5cbmNvbnN0IEFTU0VUX0xPQURfRVJST1IgPSBTeW1ib2woJ0FTU0VUX0xPQURfRVJST1InKVxuLy8gVE9ETzogdW5leHBvcnRcbmV4cG9ydCBmdW5jdGlvbiBtYXJrQXNzZXRFcnJvcihlcnI6IEVycm9yKTogRXJyb3Ige1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KGVyciwgQVNTRVRfTE9BRF9FUlJPUiwge30pXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0Fzc2V0RXJyb3IoZXJyPzogRXJyb3IpOiBib29sZWFuIHwgdW5kZWZpbmVkIHtcbiAgcmV0dXJuIGVyciAmJiBBU1NFVF9MT0FEX0VSUk9SIGluIGVyclxufVxuXG5mdW5jdGlvbiBhcHBlbmRTY3JpcHQoXG4gIHNyYzogc3RyaW5nLFxuICBzY3JpcHQ/OiBIVE1MU2NyaXB0RWxlbWVudFxuKTogUHJvbWlzZTx1bmtub3duPiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0JylcblxuICAgIC8vIFRoZSBvcmRlciBvZiBwcm9wZXJ0eSBhc3NpZ25tZW50IGhlcmUgaXMgaW50ZW50aW9uYWwuXG4gICAgLy8gMS4gU2V0dXAgc3VjY2Vzcy9mYWlsdXJlIGhvb2tzIGluIGNhc2UgdGhlIGJyb3dzZXIgc3luY2hyb25vdXNseVxuICAgIC8vICAgIGV4ZWN1dGVzIHdoZW4gYHNyY2AgaXMgc2V0LlxuICAgIHNjcmlwdC5vbmxvYWQgPSByZXNvbHZlXG4gICAgc2NyaXB0Lm9uZXJyb3IgPSAoKSA9PlxuICAgICAgcmVqZWN0KG1hcmtBc3NldEVycm9yKG5ldyBFcnJvcihgRmFpbGVkIHRvIGxvYWQgc2NyaXB0OiAke3NyY31gKSkpXG5cbiAgICAvLyAyLiBDb25maWd1cmUgdGhlIGNyb3NzLW9yaWdpbiBhdHRyaWJ1dGUgYmVmb3JlIHNldHRpbmcgYHNyY2AgaW4gY2FzZSB0aGVcbiAgICAvLyAgICBicm93c2VyIGJlZ2lucyB0byBmZXRjaC5cbiAgICBzY3JpcHQuY3Jvc3NPcmlnaW4gPSBwcm9jZXNzLmVudi5fX05FWFRfQ1JPU1NfT1JJR0lOIVxuXG4gICAgLy8gMy4gRmluYWxseSwgc2V0IHRoZSBzb3VyY2UgYW5kIGluamVjdCBpbnRvIHRoZSBET00gaW4gY2FzZSB0aGUgY2hpbGRcbiAgICAvLyAgICBtdXN0IGJlIGFwcGVuZGVkIGZvciBmZXRjaGluZyB0byBzdGFydC5cbiAgICBzY3JpcHQuc3JjID0gc3JjXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JpcHQpXG4gIH0pXG59XG5cbi8vIFJlc29sdmUgYSBwcm9taXNlIHRoYXQgdGltZXMgb3V0IGFmdGVyIGdpdmVuIGFtb3VudCBvZiBtaWxsaXNlY29uZHMuXG5mdW5jdGlvbiByZXNvbHZlUHJvbWlzZVdpdGhUaW1lb3V0PFQ+KFxuICBwOiBQcm9taXNlPFQ+LFxuICBtczogbnVtYmVyLFxuICBlcnI6IEVycm9yXG4pOiBQcm9taXNlPFQ+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBsZXQgY2FuY2VsbGVkID0gZmFsc2VcblxuICAgIHAudGhlbigocikgPT4ge1xuICAgICAgLy8gUmVzb2x2ZWQsIGNhbmNlbCB0aGUgdGltZW91dFxuICAgICAgY2FuY2VsbGVkID0gdHJ1ZVxuICAgICAgcmVzb2x2ZShyKVxuICAgIH0pLmNhdGNoKHJlamVjdClcblxuICAgIHJlcXVlc3RJZGxlQ2FsbGJhY2soKCkgPT5cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBpZiAoIWNhbmNlbGxlZCkge1xuICAgICAgICAgIHJlamVjdChlcnIpXG4gICAgICAgIH1cbiAgICAgIH0sIG1zKVxuICAgIClcbiAgfSlcbn1cblxuLy8gVE9ETzogc3RvcCBleHBvcnRpbmcgb3IgY2FjaGUgdGhlIGZhaWx1cmVcbi8vIEl0J2QgYmUgYmVzdCB0byBzdG9wIGV4cG9ydGluZyB0aGlzLiBJdCdzIGFuIGltcGxlbWVudGF0aW9uIGRldGFpbC4gV2UncmVcbi8vIG9ubHkgZXhwb3J0aW5nIGl0IGZvciBiYWNrd2FyZHMgY29tcGF0aWJpbHR5IHdpdGggdGhlIGBwYWdlLWxvYWRlcmAuXG4vLyBPbmx5IGNhY2hlIHRoaXMgcmVzcG9uc2UgYXMgYSBsYXN0IHJlc29ydCBpZiB3ZSBjYW5ub3QgZWxpbWluYXRlIGFsbCBvdGhlclxuLy8gY29kZSBicmFuY2hlcyB0aGF0IHVzZSB0aGUgQnVpbGQgTWFuaWZlc3QgQ2FsbGJhY2sgYW5kIHB1c2ggdGhlbSB0aHJvdWdoXG4vLyB0aGUgUm91dGUgTG9hZGVyIGludGVyZmFjZS5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDbGllbnRCdWlsZE1hbmlmZXN0KCk6IFByb21pc2U8Q2xpZW50QnVpbGRNYW5pZmVzdD4ge1xuICBpZiAoc2VsZi5fX0JVSUxEX01BTklGRVNUKSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShzZWxmLl9fQlVJTERfTUFOSUZFU1QpXG4gIH1cblxuICBjb25zdCBvbkJ1aWxkTWFuaWZlc3Q6IFByb21pc2U8Q2xpZW50QnVpbGRNYW5pZmVzdD4gPSBuZXcgUHJvbWlzZTxcbiAgICBDbGllbnRCdWlsZE1hbmlmZXN0XG4gID4oKHJlc29sdmUpID0+IHtcbiAgICAvLyBNYW5kYXRvcnkgYmVjYXVzZSB0aGlzIGlzIG5vdCBjb25jdXJyZW50IHNhZmU6XG4gICAgY29uc3QgY2IgPSBzZWxmLl9fQlVJTERfTUFOSUZFU1RfQ0JcbiAgICBzZWxmLl9fQlVJTERfTUFOSUZFU1RfQ0IgPSAoKSA9PiB7XG4gICAgICByZXNvbHZlKHNlbGYuX19CVUlMRF9NQU5JRkVTVCEpXG4gICAgICBjYiAmJiBjYigpXG4gICAgfVxuICB9KVxuXG4gIHJldHVybiByZXNvbHZlUHJvbWlzZVdpdGhUaW1lb3V0PENsaWVudEJ1aWxkTWFuaWZlc3Q+KFxuICAgIG9uQnVpbGRNYW5pZmVzdCxcbiAgICBNU19NQVhfSURMRV9ERUxBWSxcbiAgICBtYXJrQXNzZXRFcnJvcihuZXcgRXJyb3IoJ0ZhaWxlZCB0byBsb2FkIGNsaWVudCBidWlsZCBtYW5pZmVzdCcpKVxuICApXG59XG5cbmludGVyZmFjZSBSb3V0ZUZpbGVzIHtcbiAgc2NyaXB0czogc3RyaW5nW11cbiAgY3NzOiBzdHJpbmdbXVxufVxuZnVuY3Rpb24gZ2V0RmlsZXNGb3JSb3V0ZShcbiAgYXNzZXRQcmVmaXg6IHN0cmluZyxcbiAgcm91dGU6IHN0cmluZ1xuKTogUHJvbWlzZTxSb3V0ZUZpbGVzPiB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jykge1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoe1xuICAgICAgc2NyaXB0czogW1xuICAgICAgICBhc3NldFByZWZpeCArXG4gICAgICAgICAgJy9fbmV4dC9zdGF0aWMvY2h1bmtzL3BhZ2VzJyArXG4gICAgICAgICAgZW5jb2RlVVJJKGdldEFzc2V0UGF0aEZyb21Sb3V0ZShyb3V0ZSwgJy5qcycpKSxcbiAgICAgIF0sXG4gICAgICAvLyBTdHlsZXMgYXJlIGhhbmRsZWQgYnkgYHN0eWxlLWxvYWRlcmAgaW4gZGV2ZWxvcG1lbnQ6XG4gICAgICBjc3M6IFtdLFxuICAgIH0pXG4gIH1cbiAgcmV0dXJuIGdldENsaWVudEJ1aWxkTWFuaWZlc3QoKS50aGVuKChtYW5pZmVzdCkgPT4ge1xuICAgIGlmICghKHJvdXRlIGluIG1hbmlmZXN0KSkge1xuICAgICAgdGhyb3cgbWFya0Fzc2V0RXJyb3IobmV3IEVycm9yKGBGYWlsZWQgdG8gbG9va3VwIHJvdXRlOiAke3JvdXRlfWApKVxuICAgIH1cbiAgICBjb25zdCBhbGxGaWxlcyA9IG1hbmlmZXN0W3JvdXRlXS5tYXAoXG4gICAgICAoZW50cnkpID0+IGFzc2V0UHJlZml4ICsgJy9fbmV4dC8nICsgZW5jb2RlVVJJKGVudHJ5KVxuICAgIClcbiAgICByZXR1cm4ge1xuICAgICAgc2NyaXB0czogYWxsRmlsZXMuZmlsdGVyKCh2KSA9PiB2LmVuZHNXaXRoKCcuanMnKSksXG4gICAgICBjc3M6IGFsbEZpbGVzLmZpbHRlcigodikgPT4gdi5lbmRzV2l0aCgnLmNzcycpKSxcbiAgICB9XG4gIH0pXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVJvdXRlTG9hZGVyKGFzc2V0UHJlZml4OiBzdHJpbmcpOiBSb3V0ZUxvYWRlciB7XG4gIGNvbnN0IGVudHJ5cG9pbnRzOiBNYXA8XG4gICAgc3RyaW5nLFxuICAgIEZ1dHVyZTxSb3V0ZUVudHJ5cG9pbnQ+IHwgUm91dGVFbnRyeXBvaW50XG4gID4gPSBuZXcgTWFwKClcbiAgY29uc3QgbG9hZGVkU2NyaXB0czogTWFwPHN0cmluZywgUHJvbWlzZTx1bmtub3duPj4gPSBuZXcgTWFwKClcbiAgY29uc3Qgc3R5bGVTaGVldHM6IE1hcDxzdHJpbmcsIFByb21pc2U8Um91dGVTdHlsZVNoZWV0Pj4gPSBuZXcgTWFwKClcbiAgY29uc3Qgcm91dGVzOiBNYXA8XG4gICAgc3RyaW5nLFxuICAgIEZ1dHVyZTxSb3V0ZUxvYWRlckVudHJ5PiB8IFJvdXRlTG9hZGVyRW50cnlcbiAgPiA9IG5ldyBNYXAoKVxuXG4gIGZ1bmN0aW9uIG1heWJlRXhlY3V0ZVNjcmlwdChzcmM6IHN0cmluZyk6IFByb21pc2U8dW5rbm93bj4ge1xuICAgIGxldCBwcm9tOiBQcm9taXNlPHVua25vd24+IHwgdW5kZWZpbmVkID0gbG9hZGVkU2NyaXB0cy5nZXQoc3JjKVxuICAgIGlmIChwcm9tKSB7XG4gICAgICByZXR1cm4gcHJvbVxuICAgIH1cblxuICAgIC8vIFNraXAgZXhlY3V0aW5nIHNjcmlwdCBpZiBpdCdzIGFscmVhZHkgaW4gdGhlIERPTTpcbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihgc2NyaXB0W3NyY149XCIke3NyY31cIl1gKSkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXG4gICAgfVxuXG4gICAgbG9hZGVkU2NyaXB0cy5zZXQoc3JjLCAocHJvbSA9IGFwcGVuZFNjcmlwdChzcmMpKSlcbiAgICByZXR1cm4gcHJvbVxuICB9XG5cbiAgZnVuY3Rpb24gZmV0Y2hTdHlsZVNoZWV0KGhyZWY6IHN0cmluZyk6IFByb21pc2U8Um91dGVTdHlsZVNoZWV0PiB7XG4gICAgbGV0IHByb206IFByb21pc2U8Um91dGVTdHlsZVNoZWV0PiB8IHVuZGVmaW5lZCA9IHN0eWxlU2hlZXRzLmdldChocmVmKVxuICAgIGlmIChwcm9tKSB7XG4gICAgICByZXR1cm4gcHJvbVxuICAgIH1cblxuICAgIHN0eWxlU2hlZXRzLnNldChcbiAgICAgIGhyZWYsXG4gICAgICAocHJvbSA9IGZldGNoKGhyZWYpXG4gICAgICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICBpZiAoIXJlcy5vaykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBGYWlsZWQgdG8gbG9hZCBzdHlsZXNoZWV0OiAke2hyZWZ9YClcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHJlcy50ZXh0KCkudGhlbigodGV4dCkgPT4gKHsgaHJlZjogaHJlZiwgY29udGVudDogdGV4dCB9KSlcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICB0aHJvdyBtYXJrQXNzZXRFcnJvcihlcnIpXG4gICAgICAgIH0pKVxuICAgIClcbiAgICByZXR1cm4gcHJvbVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB3aGVuRW50cnlwb2ludChyb3V0ZTogc3RyaW5nKSB7XG4gICAgICByZXR1cm4gd2l0aEZ1dHVyZShyb3V0ZSwgZW50cnlwb2ludHMpXG4gICAgfSxcbiAgICBvbkVudHJ5cG9pbnQocm91dGU6IHN0cmluZywgZXhlY3V0ZTogKCkgPT4gdW5rbm93bikge1xuICAgICAgUHJvbWlzZS5yZXNvbHZlKGV4ZWN1dGUpXG4gICAgICAgIC50aGVuKChmbikgPT4gZm4oKSlcbiAgICAgICAgLnRoZW4oXG4gICAgICAgICAgKGV4cG9ydHM6IGFueSkgPT4gKHtcbiAgICAgICAgICAgIGNvbXBvbmVudDogKGV4cG9ydHMgJiYgZXhwb3J0cy5kZWZhdWx0KSB8fCBleHBvcnRzLFxuICAgICAgICAgICAgZXhwb3J0czogZXhwb3J0cyxcbiAgICAgICAgICB9KSxcbiAgICAgICAgICAoZXJyKSA9PiAoeyBlcnJvcjogZXJyIH0pXG4gICAgICAgIClcbiAgICAgICAgLnRoZW4oKGlucHV0OiBSb3V0ZUVudHJ5cG9pbnQpID0+IHtcbiAgICAgICAgICBjb25zdCBvbGQgPSBlbnRyeXBvaW50cy5nZXQocm91dGUpXG4gICAgICAgICAgZW50cnlwb2ludHMuc2V0KHJvdXRlLCBpbnB1dClcbiAgICAgICAgICBpZiAob2xkICYmICdyZXNvbHZlJyBpbiBvbGQpIG9sZC5yZXNvbHZlKGlucHV0KVxuICAgICAgICB9KVxuICAgIH0sXG4gICAgbG9hZFJvdXRlKHJvdXRlOiBzdHJpbmcsIHByZWZldGNoPzogYm9vbGVhbikge1xuICAgICAgcmV0dXJuIHdpdGhGdXR1cmU8Um91dGVMb2FkZXJFbnRyeT4ocm91dGUsIHJvdXRlcywgKCkgPT4ge1xuICAgICAgICByZXR1cm4gcmVzb2x2ZVByb21pc2VXaXRoVGltZW91dChcbiAgICAgICAgICBnZXRGaWxlc0ZvclJvdXRlKGFzc2V0UHJlZml4LCByb3V0ZSlcbiAgICAgICAgICAgIC50aGVuKCh7IHNjcmlwdHMsIGNzcyB9KSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICAgICAgZW50cnlwb2ludHMuaGFzKHJvdXRlKVxuICAgICAgICAgICAgICAgICAgPyBbXVxuICAgICAgICAgICAgICAgICAgOiBQcm9taXNlLmFsbChzY3JpcHRzLm1hcChtYXliZUV4ZWN1dGVTY3JpcHQpKSxcbiAgICAgICAgICAgICAgICBQcm9taXNlLmFsbChjc3MubWFwKGZldGNoU3R5bGVTaGVldCkpLFxuICAgICAgICAgICAgICBdIGFzIGNvbnN0KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMud2hlbkVudHJ5cG9pbnQocm91dGUpLnRoZW4oKGVudHJ5cG9pbnQpID0+ICh7XG4gICAgICAgICAgICAgICAgZW50cnlwb2ludCxcbiAgICAgICAgICAgICAgICBzdHlsZXM6IHJlc1sxXSxcbiAgICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICBNU19NQVhfSURMRV9ERUxBWSxcbiAgICAgICAgICBtYXJrQXNzZXRFcnJvcihuZXcgRXJyb3IoYFJvdXRlIGRpZCBub3QgY29tcGxldGUgbG9hZGluZzogJHtyb3V0ZX1gKSlcbiAgICAgICAgKVxuICAgICAgICAgIC50aGVuKCh7IGVudHJ5cG9pbnQsIHN0eWxlcyB9KSA9PiB7XG4gICAgICAgICAgICBjb25zdCByZXM6IFJvdXRlTG9hZGVyRW50cnkgPSBPYmplY3QuYXNzaWduPFxuICAgICAgICAgICAgICB7IHN0eWxlczogUm91dGVTdHlsZVNoZWV0W10gfSxcbiAgICAgICAgICAgICAgUm91dGVFbnRyeXBvaW50XG4gICAgICAgICAgICA+KHsgc3R5bGVzOiBzdHlsZXMhIH0sIGVudHJ5cG9pbnQpXG4gICAgICAgICAgICByZXR1cm4gJ2Vycm9yJyBpbiBlbnRyeXBvaW50ID8gZW50cnlwb2ludCA6IHJlc1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgIGlmIChwcmVmZXRjaCkge1xuICAgICAgICAgICAgICAvLyB3ZSBkb24ndCB3YW50IHRvIGNhY2hlIGVycm9ycyBkdXJpbmcgcHJlZmV0Y2hcbiAgICAgICAgICAgICAgdGhyb3cgZXJyXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4geyBlcnJvcjogZXJyIH1cbiAgICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9LFxuICAgIHByZWZldGNoKHJvdXRlOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9Hb29nbGVDaHJvbWVMYWJzL3F1aWNrbGluay9ibG9iLzQ1M2E2NjFmYTFmYTk0MGUyZDJlMDQ0NDUyMzk4ZTM4YzY3YTk4ZmIvc3JjL2luZGV4Lm1qcyNMMTE1LUwxMThcbiAgICAgIC8vIExpY2Vuc2U6IEFwYWNoZSAyLjBcbiAgICAgIGxldCBjblxuICAgICAgaWYgKChjbiA9IChuYXZpZ2F0b3IgYXMgYW55KS5jb25uZWN0aW9uKSkge1xuICAgICAgICAvLyBEb24ndCBwcmVmZXRjaCBpZiB1c2luZyAyRyBvciBpZiBTYXZlLURhdGEgaXMgZW5hYmxlZC5cbiAgICAgICAgaWYgKGNuLnNhdmVEYXRhIHx8IC8yZy8udGVzdChjbi5lZmZlY3RpdmVUeXBlKSkgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXG4gICAgICB9XG4gICAgICByZXR1cm4gZ2V0RmlsZXNGb3JSb3V0ZShhc3NldFByZWZpeCwgcm91dGUpXG4gICAgICAgIC50aGVuKChvdXRwdXQpID0+XG4gICAgICAgICAgUHJvbWlzZS5hbGwoXG4gICAgICAgICAgICBjYW5QcmVmZXRjaFxuICAgICAgICAgICAgICA/IG91dHB1dC5zY3JpcHRzLm1hcCgoc2NyaXB0KSA9PiBwcmVmZXRjaFZpYURvbShzY3JpcHQsICdzY3JpcHQnKSlcbiAgICAgICAgICAgICAgOiBbXVxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgcmVxdWVzdElkbGVDYWxsYmFjaygoKSA9PiB0aGlzLmxvYWRSb3V0ZShyb3V0ZSwgdHJ1ZSkuY2F0Y2goKCkgPT4ge30pKVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goXG4gICAgICAgICAgLy8gc3dhbGxvdyBwcmVmZXRjaCBlcnJvcnNcbiAgICAgICAgICAoKSA9PiB7fVxuICAgICAgICApXG4gICAgfSxcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVSb3V0ZUxvYWRlclxuIiwiLyogZ2xvYmFsIHdpbmRvdyAqL1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IFJvdXRlciwgeyBOZXh0Um91dGVyIH0gZnJvbSAnLi4vbmV4dC1zZXJ2ZXIvbGliL3JvdXRlci9yb3V0ZXInXG5pbXBvcnQgeyBSb3V0ZXJDb250ZXh0IH0gZnJvbSAnLi4vbmV4dC1zZXJ2ZXIvbGliL3JvdXRlci1jb250ZXh0J1xuXG50eXBlIENsYXNzQXJndW1lbnRzPFQ+ID0gVCBleHRlbmRzIG5ldyAoLi4uYXJnczogaW5mZXIgVSkgPT4gYW55ID8gVSA6IGFueVxuXG50eXBlIFJvdXRlckFyZ3MgPSBDbGFzc0FyZ3VtZW50czx0eXBlb2YgUm91dGVyPlxuXG50eXBlIFNpbmdsZXRvblJvdXRlckJhc2UgPSB7XG4gIHJvdXRlcjogUm91dGVyIHwgbnVsbFxuICByZWFkeUNhbGxiYWNrczogQXJyYXk8KCkgPT4gYW55PlxuICByZWFkeShjYjogKCkgPT4gYW55KTogdm9pZFxufVxuXG5leHBvcnQgeyBSb3V0ZXIsIE5leHRSb3V0ZXIgfVxuXG5leHBvcnQgdHlwZSBTaW5nbGV0b25Sb3V0ZXIgPSBTaW5nbGV0b25Sb3V0ZXJCYXNlICYgTmV4dFJvdXRlclxuXG5jb25zdCBzaW5nbGV0b25Sb3V0ZXI6IFNpbmdsZXRvblJvdXRlckJhc2UgPSB7XG4gIHJvdXRlcjogbnVsbCwgLy8gaG9sZHMgdGhlIGFjdHVhbCByb3V0ZXIgaW5zdGFuY2VcbiAgcmVhZHlDYWxsYmFja3M6IFtdLFxuICByZWFkeShjYjogKCkgPT4gdm9pZCkge1xuICAgIGlmICh0aGlzLnJvdXRlcikgcmV0dXJuIGNiKClcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRoaXMucmVhZHlDYWxsYmFja3MucHVzaChjYilcbiAgICB9XG4gIH0sXG59XG5cbi8vIENyZWF0ZSBwdWJsaWMgcHJvcGVydGllcyBhbmQgbWV0aG9kcyBvZiB0aGUgcm91dGVyIGluIHRoZSBzaW5nbGV0b25Sb3V0ZXJcbmNvbnN0IHVybFByb3BlcnR5RmllbGRzID0gW1xuICAncGF0aG5hbWUnLFxuICAncm91dGUnLFxuICAncXVlcnknLFxuICAnYXNQYXRoJyxcbiAgJ2NvbXBvbmVudHMnLFxuICAnaXNGYWxsYmFjaycsXG4gICdiYXNlUGF0aCcsXG4gICdsb2NhbGUnLFxuICAnbG9jYWxlcycsXG4gICdkZWZhdWx0TG9jYWxlJyxcbiAgJ2lzUmVhZHknLFxuICAnaXNQcmV2aWV3JyxcbiAgJ2lzTG9jYWxlRG9tYWluJyxcbl1cbmNvbnN0IHJvdXRlckV2ZW50cyA9IFtcbiAgJ3JvdXRlQ2hhbmdlU3RhcnQnLFxuICAnYmVmb3JlSGlzdG9yeUNoYW5nZScsXG4gICdyb3V0ZUNoYW5nZUNvbXBsZXRlJyxcbiAgJ3JvdXRlQ2hhbmdlRXJyb3InLFxuICAnaGFzaENoYW5nZVN0YXJ0JyxcbiAgJ2hhc2hDaGFuZ2VDb21wbGV0ZScsXG5dXG5jb25zdCBjb3JlTWV0aG9kRmllbGRzID0gW1xuICAncHVzaCcsXG4gICdyZXBsYWNlJyxcbiAgJ3JlbG9hZCcsXG4gICdiYWNrJyxcbiAgJ3ByZWZldGNoJyxcbiAgJ2JlZm9yZVBvcFN0YXRlJyxcbl1cblxuLy8gRXZlbnRzIGlzIGEgc3RhdGljIHByb3BlcnR5IG9uIHRoZSByb3V0ZXIsIHRoZSByb3V0ZXIgZG9lc24ndCBoYXZlIHRvIGJlIGluaXRpYWxpemVkIHRvIHVzZSBpdFxuT2JqZWN0LmRlZmluZVByb3BlcnR5KHNpbmdsZXRvblJvdXRlciwgJ2V2ZW50cycsIHtcbiAgZ2V0KCkge1xuICAgIHJldHVybiBSb3V0ZXIuZXZlbnRzXG4gIH0sXG59KVxuXG51cmxQcm9wZXJ0eUZpZWxkcy5mb3JFYWNoKChmaWVsZDogc3RyaW5nKSA9PiB7XG4gIC8vIEhlcmUgd2UgbmVlZCB0byB1c2UgT2JqZWN0LmRlZmluZVByb3BlcnR5IGJlY2F1c2UsIHdlIG5lZWQgdG8gcmV0dXJuXG4gIC8vIHRoZSBwcm9wZXJ0eSBhc3NpZ25lZCB0byB0aGUgYWN0dWFsIHJvdXRlclxuICAvLyBUaGUgdmFsdWUgbWlnaHQgZ2V0IGNoYW5nZWQgYXMgd2UgY2hhbmdlIHJvdXRlcyBhbmQgdGhpcyBpcyB0aGVcbiAgLy8gcHJvcGVyIHdheSB0byBhY2Nlc3MgaXRcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHNpbmdsZXRvblJvdXRlciwgZmllbGQsIHtcbiAgICBnZXQoKSB7XG4gICAgICBjb25zdCByb3V0ZXIgPSBnZXRSb3V0ZXIoKSBhcyBhbnlcbiAgICAgIHJldHVybiByb3V0ZXJbZmllbGRdIGFzIHN0cmluZ1xuICAgIH0sXG4gIH0pXG59KVxuXG5jb3JlTWV0aG9kRmllbGRzLmZvckVhY2goKGZpZWxkOiBzdHJpbmcpID0+IHtcbiAgLy8gV2UgZG9uJ3QgcmVhbGx5IGtub3cgdGhlIHR5cGVzIGhlcmUsIHNvIHdlIGFkZCB0aGVtIGxhdGVyIGluc3RlYWRcbiAgOyhzaW5nbGV0b25Sb3V0ZXIgYXMgYW55KVtmaWVsZF0gPSAoLi4uYXJnczogYW55W10pID0+IHtcbiAgICBjb25zdCByb3V0ZXIgPSBnZXRSb3V0ZXIoKSBhcyBhbnlcbiAgICByZXR1cm4gcm91dGVyW2ZpZWxkXSguLi5hcmdzKVxuICB9XG59KVxuXG5yb3V0ZXJFdmVudHMuZm9yRWFjaCgoZXZlbnQ6IHN0cmluZykgPT4ge1xuICBzaW5nbGV0b25Sb3V0ZXIucmVhZHkoKCkgPT4ge1xuICAgIFJvdXRlci5ldmVudHMub24oZXZlbnQsICguLi5hcmdzKSA9PiB7XG4gICAgICBjb25zdCBldmVudEZpZWxkID0gYG9uJHtldmVudC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKX0ke2V2ZW50LnN1YnN0cmluZyhcbiAgICAgICAgMVxuICAgICAgKX1gXG4gICAgICBjb25zdCBfc2luZ2xldG9uUm91dGVyID0gc2luZ2xldG9uUm91dGVyIGFzIGFueVxuICAgICAgaWYgKF9zaW5nbGV0b25Sb3V0ZXJbZXZlbnRGaWVsZF0pIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBfc2luZ2xldG9uUm91dGVyW2V2ZW50RmllbGRdKC4uLmFyZ3MpXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEVycm9yIHdoZW4gcnVubmluZyB0aGUgUm91dGVyIGV2ZW50OiAke2V2ZW50RmllbGR9YClcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGAke2Vyci5tZXNzYWdlfVxcbiR7ZXJyLnN0YWNrfWApXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9KVxufSlcblxuZnVuY3Rpb24gZ2V0Um91dGVyKCk6IFJvdXRlciB7XG4gIGlmICghc2luZ2xldG9uUm91dGVyLnJvdXRlcikge1xuICAgIGNvbnN0IG1lc3NhZ2UgPVxuICAgICAgJ05vIHJvdXRlciBpbnN0YW5jZSBmb3VuZC5cXG4nICtcbiAgICAgICdZb3Ugc2hvdWxkIG9ubHkgdXNlIFwibmV4dC9yb3V0ZXJcIiBpbnNpZGUgdGhlIGNsaWVudCBzaWRlIG9mIHlvdXIgYXBwLlxcbidcbiAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSlcbiAgfVxuICByZXR1cm4gc2luZ2xldG9uUm91dGVyLnJvdXRlclxufVxuXG4vLyBFeHBvcnQgdGhlIHNpbmdsZXRvblJvdXRlciBhbmQgdGhpcyBpcyB0aGUgcHVibGljIEFQSS5cbmV4cG9ydCBkZWZhdWx0IHNpbmdsZXRvblJvdXRlciBhcyBTaW5nbGV0b25Sb3V0ZXJcblxuLy8gUmVleHBvcnQgdGhlIHdpdGhSb3V0ZSBIT0NcbmV4cG9ydCB7IGRlZmF1bHQgYXMgd2l0aFJvdXRlciB9IGZyb20gJy4vd2l0aC1yb3V0ZXInXG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VSb3V0ZXIoKTogTmV4dFJvdXRlciB7XG4gIHJldHVybiBSZWFjdC51c2VDb250ZXh0KFJvdXRlckNvbnRleHQpXG59XG5cbi8vIElOVEVSTkFMIEFQSVNcbi8vIC0tLS0tLS0tLS0tLS1cbi8vIChkbyBub3QgdXNlIGZvbGxvd2luZyBleHBvcnRzIGluc2lkZSB0aGUgYXBwKVxuXG4vLyBDcmVhdGUgYSByb3V0ZXIgYW5kIGFzc2lnbiBpdCBhcyB0aGUgc2luZ2xldG9uIGluc3RhbmNlLlxuLy8gVGhpcyBpcyB1c2VkIGluIGNsaWVudCBzaWRlIHdoZW4gd2UgYXJlIGluaXRpbGl6aW5nIHRoZSBhcHAuXG4vLyBUaGlzIHNob3VsZCAqKm5vdCoqIHVzZSBpbnNpZGUgdGhlIHNlcnZlci5cbmV4cG9ydCBjb25zdCBjcmVhdGVSb3V0ZXIgPSAoLi4uYXJnczogUm91dGVyQXJncyk6IFJvdXRlciA9PiB7XG4gIHNpbmdsZXRvblJvdXRlci5yb3V0ZXIgPSBuZXcgUm91dGVyKC4uLmFyZ3MpXG4gIHNpbmdsZXRvblJvdXRlci5yZWFkeUNhbGxiYWNrcy5mb3JFYWNoKChjYikgPT4gY2IoKSlcbiAgc2luZ2xldG9uUm91dGVyLnJlYWR5Q2FsbGJhY2tzID0gW11cblxuICByZXR1cm4gc2luZ2xldG9uUm91dGVyLnJvdXRlclxufVxuXG4vLyBUaGlzIGZ1bmN0aW9uIGlzIHVzZWQgdG8gY3JlYXRlIHRoZSBgd2l0aFJvdXRlcmAgcm91dGVyIGluc3RhbmNlXG5leHBvcnQgZnVuY3Rpb24gbWFrZVB1YmxpY1JvdXRlckluc3RhbmNlKHJvdXRlcjogUm91dGVyKTogTmV4dFJvdXRlciB7XG4gIGNvbnN0IF9yb3V0ZXIgPSByb3V0ZXIgYXMgYW55XG4gIGNvbnN0IGluc3RhbmNlID0ge30gYXMgYW55XG5cbiAgZm9yIChjb25zdCBwcm9wZXJ0eSBvZiB1cmxQcm9wZXJ0eUZpZWxkcykge1xuICAgIGlmICh0eXBlb2YgX3JvdXRlcltwcm9wZXJ0eV0gPT09ICdvYmplY3QnKSB7XG4gICAgICBpbnN0YW5jZVtwcm9wZXJ0eV0gPSBPYmplY3QuYXNzaWduKFxuICAgICAgICBBcnJheS5pc0FycmF5KF9yb3V0ZXJbcHJvcGVydHldKSA/IFtdIDoge30sXG4gICAgICAgIF9yb3V0ZXJbcHJvcGVydHldXG4gICAgICApIC8vIG1ha2VzIHN1cmUgcXVlcnkgaXMgbm90IHN0YXRlZnVsXG4gICAgICBjb250aW51ZVxuICAgIH1cblxuICAgIGluc3RhbmNlW3Byb3BlcnR5XSA9IF9yb3V0ZXJbcHJvcGVydHldXG4gIH1cblxuICAvLyBFdmVudHMgaXMgYSBzdGF0aWMgcHJvcGVydHkgb24gdGhlIHJvdXRlciwgdGhlIHJvdXRlciBkb2Vzbid0IGhhdmUgdG8gYmUgaW5pdGlhbGl6ZWQgdG8gdXNlIGl0XG4gIGluc3RhbmNlLmV2ZW50cyA9IFJvdXRlci5ldmVudHNcblxuICBjb3JlTWV0aG9kRmllbGRzLmZvckVhY2goKGZpZWxkKSA9PiB7XG4gICAgaW5zdGFuY2VbZmllbGRdID0gKC4uLmFyZ3M6IGFueVtdKSA9PiB7XG4gICAgICByZXR1cm4gX3JvdXRlcltmaWVsZF0oLi4uYXJncylcbiAgICB9XG4gIH0pXG5cbiAgcmV0dXJuIGluc3RhbmNlXG59XG4iLCJpbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnXG5pbXBvcnQge1xuICByZXF1ZXN0SWRsZUNhbGxiYWNrLFxuICBjYW5jZWxJZGxlQ2FsbGJhY2ssXG59IGZyb20gJy4vcmVxdWVzdC1pZGxlLWNhbGxiYWNrJ1xuXG50eXBlIFVzZUludGVyc2VjdGlvbk9ic2VydmVySW5pdCA9IFBpY2s8SW50ZXJzZWN0aW9uT2JzZXJ2ZXJJbml0LCAncm9vdE1hcmdpbic+XG50eXBlIFVzZUludGVyc2VjdGlvbiA9IHsgZGlzYWJsZWQ/OiBib29sZWFuIH0gJiBVc2VJbnRlcnNlY3Rpb25PYnNlcnZlckluaXRcbnR5cGUgT2JzZXJ2ZUNhbGxiYWNrID0gKGlzVmlzaWJsZTogYm9vbGVhbikgPT4gdm9pZFxudHlwZSBPYnNlcnZlciA9IHtcbiAgaWQ6IHN0cmluZ1xuICBvYnNlcnZlcjogSW50ZXJzZWN0aW9uT2JzZXJ2ZXJcbiAgZWxlbWVudHM6IE1hcDxFbGVtZW50LCBPYnNlcnZlQ2FsbGJhY2s+XG59XG5cbmNvbnN0IGhhc0ludGVyc2VjdGlvbk9ic2VydmVyID0gdHlwZW9mIEludGVyc2VjdGlvbk9ic2VydmVyICE9PSAndW5kZWZpbmVkJ1xuXG5leHBvcnQgZnVuY3Rpb24gdXNlSW50ZXJzZWN0aW9uPFQgZXh0ZW5kcyBFbGVtZW50Pih7XG4gIHJvb3RNYXJnaW4sXG4gIGRpc2FibGVkLFxufTogVXNlSW50ZXJzZWN0aW9uKTogWyhlbGVtZW50OiBUIHwgbnVsbCkgPT4gdm9pZCwgYm9vbGVhbl0ge1xuICBjb25zdCBpc0Rpc2FibGVkOiBib29sZWFuID0gZGlzYWJsZWQgfHwgIWhhc0ludGVyc2VjdGlvbk9ic2VydmVyXG5cbiAgY29uc3QgdW5vYnNlcnZlID0gdXNlUmVmPEZ1bmN0aW9uPigpXG4gIGNvbnN0IFt2aXNpYmxlLCBzZXRWaXNpYmxlXSA9IHVzZVN0YXRlKGZhbHNlKVxuXG4gIGNvbnN0IHNldFJlZiA9IHVzZUNhbGxiYWNrKFxuICAgIChlbDogVCB8IG51bGwpID0+IHtcbiAgICAgIGlmICh1bm9ic2VydmUuY3VycmVudCkge1xuICAgICAgICB1bm9ic2VydmUuY3VycmVudCgpXG4gICAgICAgIHVub2JzZXJ2ZS5jdXJyZW50ID0gdW5kZWZpbmVkXG4gICAgICB9XG5cbiAgICAgIGlmIChpc0Rpc2FibGVkIHx8IHZpc2libGUpIHJldHVyblxuXG4gICAgICBpZiAoZWwgJiYgZWwudGFnTmFtZSkge1xuICAgICAgICB1bm9ic2VydmUuY3VycmVudCA9IG9ic2VydmUoXG4gICAgICAgICAgZWwsXG4gICAgICAgICAgKGlzVmlzaWJsZSkgPT4gaXNWaXNpYmxlICYmIHNldFZpc2libGUoaXNWaXNpYmxlKSxcbiAgICAgICAgICB7IHJvb3RNYXJnaW4gfVxuICAgICAgICApXG4gICAgICB9XG4gICAgfSxcbiAgICBbaXNEaXNhYmxlZCwgcm9vdE1hcmdpbiwgdmlzaWJsZV1cbiAgKVxuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFoYXNJbnRlcnNlY3Rpb25PYnNlcnZlcikge1xuICAgICAgaWYgKCF2aXNpYmxlKSB7XG4gICAgICAgIGNvbnN0IGlkbGVDYWxsYmFjayA9IHJlcXVlc3RJZGxlQ2FsbGJhY2soKCkgPT4gc2V0VmlzaWJsZSh0cnVlKSlcbiAgICAgICAgcmV0dXJuICgpID0+IGNhbmNlbElkbGVDYWxsYmFjayhpZGxlQ2FsbGJhY2spXG4gICAgICB9XG4gICAgfVxuICB9LCBbdmlzaWJsZV0pXG5cbiAgcmV0dXJuIFtzZXRSZWYsIHZpc2libGVdXG59XG5cbmZ1bmN0aW9uIG9ic2VydmUoXG4gIGVsZW1lbnQ6IEVsZW1lbnQsXG4gIGNhbGxiYWNrOiBPYnNlcnZlQ2FsbGJhY2ssXG4gIG9wdGlvbnM6IFVzZUludGVyc2VjdGlvbk9ic2VydmVySW5pdFxuKTogKCkgPT4gdm9pZCB7XG4gIGNvbnN0IHsgaWQsIG9ic2VydmVyLCBlbGVtZW50cyB9ID0gY3JlYXRlT2JzZXJ2ZXIob3B0aW9ucylcbiAgZWxlbWVudHMuc2V0KGVsZW1lbnQsIGNhbGxiYWNrKVxuXG4gIG9ic2VydmVyLm9ic2VydmUoZWxlbWVudClcbiAgcmV0dXJuIGZ1bmN0aW9uIHVub2JzZXJ2ZSgpOiB2b2lkIHtcbiAgICBlbGVtZW50cy5kZWxldGUoZWxlbWVudClcbiAgICBvYnNlcnZlci51bm9ic2VydmUoZWxlbWVudClcblxuICAgIC8vIERlc3Ryb3kgb2JzZXJ2ZXIgd2hlbiB0aGVyZSdzIG5vdGhpbmcgbGVmdCB0byB3YXRjaDpcbiAgICBpZiAoZWxlbWVudHMuc2l6ZSA9PT0gMCkge1xuICAgICAgb2JzZXJ2ZXIuZGlzY29ubmVjdCgpXG4gICAgICBvYnNlcnZlcnMuZGVsZXRlKGlkKVxuICAgIH1cbiAgfVxufVxuXG5jb25zdCBvYnNlcnZlcnMgPSBuZXcgTWFwPHN0cmluZywgT2JzZXJ2ZXI+KClcbmZ1bmN0aW9uIGNyZWF0ZU9ic2VydmVyKG9wdGlvbnM6IFVzZUludGVyc2VjdGlvbk9ic2VydmVySW5pdCk6IE9ic2VydmVyIHtcbiAgY29uc3QgaWQgPSBvcHRpb25zLnJvb3RNYXJnaW4gfHwgJydcbiAgbGV0IGluc3RhbmNlID0gb2JzZXJ2ZXJzLmdldChpZClcbiAgaWYgKGluc3RhbmNlKSB7XG4gICAgcmV0dXJuIGluc3RhbmNlXG4gIH1cblxuICBjb25zdCBlbGVtZW50cyA9IG5ldyBNYXA8RWxlbWVudCwgT2JzZXJ2ZUNhbGxiYWNrPigpXG4gIGNvbnN0IG9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKChlbnRyaWVzKSA9PiB7XG4gICAgZW50cmllcy5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgICAgY29uc3QgY2FsbGJhY2sgPSBlbGVtZW50cy5nZXQoZW50cnkudGFyZ2V0KVxuICAgICAgY29uc3QgaXNWaXNpYmxlID0gZW50cnkuaXNJbnRlcnNlY3RpbmcgfHwgZW50cnkuaW50ZXJzZWN0aW9uUmF0aW8gPiAwXG4gICAgICBpZiAoY2FsbGJhY2sgJiYgaXNWaXNpYmxlKSB7XG4gICAgICAgIGNhbGxiYWNrKGlzVmlzaWJsZSlcbiAgICAgIH1cbiAgICB9KVxuICB9LCBvcHRpb25zKVxuXG4gIG9ic2VydmVycy5zZXQoXG4gICAgaWQsXG4gICAgKGluc3RhbmNlID0ge1xuICAgICAgaWQsXG4gICAgICBvYnNlcnZlcixcbiAgICAgIGVsZW1lbnRzLFxuICAgIH0pXG4gIClcbiAgcmV0dXJuIGluc3RhbmNlXG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBOZXh0Q29tcG9uZW50VHlwZSwgTmV4dFBhZ2VDb250ZXh0IH0gZnJvbSAnLi4vbmV4dC1zZXJ2ZXIvbGliL3V0aWxzJ1xuaW1wb3J0IHsgTmV4dFJvdXRlciwgdXNlUm91dGVyIH0gZnJvbSAnLi9yb3V0ZXInXG5cbmV4cG9ydCB0eXBlIFdpdGhSb3V0ZXJQcm9wcyA9IHtcbiAgcm91dGVyOiBOZXh0Um91dGVyXG59XG5cbmV4cG9ydCB0eXBlIEV4Y2x1ZGVSb3V0ZXJQcm9wczxQPiA9IFBpY2s8XG4gIFAsXG4gIEV4Y2x1ZGU8a2V5b2YgUCwga2V5b2YgV2l0aFJvdXRlclByb3BzPlxuPlxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB3aXRoUm91dGVyPFxuICBQIGV4dGVuZHMgV2l0aFJvdXRlclByb3BzLFxuICBDID0gTmV4dFBhZ2VDb250ZXh0XG4+KFxuICBDb21wb3NlZENvbXBvbmVudDogTmV4dENvbXBvbmVudFR5cGU8QywgYW55LCBQPlxuKTogUmVhY3QuQ29tcG9uZW50VHlwZTxFeGNsdWRlUm91dGVyUHJvcHM8UD4+IHtcbiAgZnVuY3Rpb24gV2l0aFJvdXRlcldyYXBwZXIocHJvcHM6IGFueSk6IEpTWC5FbGVtZW50IHtcbiAgICByZXR1cm4gPENvbXBvc2VkQ29tcG9uZW50IHJvdXRlcj17dXNlUm91dGVyKCl9IHsuLi5wcm9wc30gLz5cbiAgfVxuXG4gIFdpdGhSb3V0ZXJXcmFwcGVyLmdldEluaXRpYWxQcm9wcyA9IENvbXBvc2VkQ29tcG9uZW50LmdldEluaXRpYWxQcm9wc1xuICAvLyBUaGlzIGlzIG5lZWRlZCB0byBhbGxvdyBjaGVja2luZyBmb3IgY3VzdG9tIGdldEluaXRpYWxQcm9wcyBpbiBfYXBwXG4gIDsoV2l0aFJvdXRlcldyYXBwZXIgYXMgYW55KS5vcmlnR2V0SW5pdGlhbFByb3BzID0gKENvbXBvc2VkQ29tcG9uZW50IGFzIGFueSkub3JpZ0dldEluaXRpYWxQcm9wc1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGNvbnN0IG5hbWUgPVxuICAgICAgQ29tcG9zZWRDb21wb25lbnQuZGlzcGxheU5hbWUgfHwgQ29tcG9zZWRDb21wb25lbnQubmFtZSB8fCAnVW5rbm93bidcbiAgICBXaXRoUm91dGVyV3JhcHBlci5kaXNwbGF5TmFtZSA9IGB3aXRoUm91dGVyKCR7bmFtZX0pYFxuICB9XG5cbiAgcmV0dXJuIFdpdGhSb3V0ZXJXcmFwcGVyXG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogVG9rZW5pemUgaW5wdXQgc3RyaW5nLlxuICovXG5mdW5jdGlvbiBsZXhlcihzdHIpIHtcbiAgICB2YXIgdG9rZW5zID0gW107XG4gICAgdmFyIGkgPSAwO1xuICAgIHdoaWxlIChpIDwgc3RyLmxlbmd0aCkge1xuICAgICAgICB2YXIgY2hhciA9IHN0cltpXTtcbiAgICAgICAgaWYgKGNoYXIgPT09IFwiKlwiIHx8IGNoYXIgPT09IFwiK1wiIHx8IGNoYXIgPT09IFwiP1wiKSB7XG4gICAgICAgICAgICB0b2tlbnMucHVzaCh7IHR5cGU6IFwiTU9ESUZJRVJcIiwgaW5kZXg6IGksIHZhbHVlOiBzdHJbaSsrXSB9KTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjaGFyID09PSBcIlxcXFxcIikge1xuICAgICAgICAgICAgdG9rZW5zLnB1c2goeyB0eXBlOiBcIkVTQ0FQRURfQ0hBUlwiLCBpbmRleDogaSsrLCB2YWx1ZTogc3RyW2krK10gfSk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2hhciA9PT0gXCJ7XCIpIHtcbiAgICAgICAgICAgIHRva2Vucy5wdXNoKHsgdHlwZTogXCJPUEVOXCIsIGluZGV4OiBpLCB2YWx1ZTogc3RyW2krK10gfSk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2hhciA9PT0gXCJ9XCIpIHtcbiAgICAgICAgICAgIHRva2Vucy5wdXNoKHsgdHlwZTogXCJDTE9TRVwiLCBpbmRleDogaSwgdmFsdWU6IHN0cltpKytdIH0pO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoYXIgPT09IFwiOlwiKSB7XG4gICAgICAgICAgICB2YXIgbmFtZSA9IFwiXCI7XG4gICAgICAgICAgICB2YXIgaiA9IGkgKyAxO1xuICAgICAgICAgICAgd2hpbGUgKGogPCBzdHIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvZGUgPSBzdHIuY2hhckNvZGVBdChqKTtcbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgLy8gYDAtOWBcbiAgICAgICAgICAgICAgICAoY29kZSA+PSA0OCAmJiBjb2RlIDw9IDU3KSB8fFxuICAgICAgICAgICAgICAgICAgICAvLyBgQS1aYFxuICAgICAgICAgICAgICAgICAgICAoY29kZSA+PSA2NSAmJiBjb2RlIDw9IDkwKSB8fFxuICAgICAgICAgICAgICAgICAgICAvLyBgYS16YFxuICAgICAgICAgICAgICAgICAgICAoY29kZSA+PSA5NyAmJiBjb2RlIDw9IDEyMikgfHxcbiAgICAgICAgICAgICAgICAgICAgLy8gYF9gXG4gICAgICAgICAgICAgICAgICAgIGNvZGUgPT09IDk1KSB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWUgKz0gc3RyW2orK107XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghbmFtZSlcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiTWlzc2luZyBwYXJhbWV0ZXIgbmFtZSBhdCBcIiArIGkpO1xuICAgICAgICAgICAgdG9rZW5zLnB1c2goeyB0eXBlOiBcIk5BTUVcIiwgaW5kZXg6IGksIHZhbHVlOiBuYW1lIH0pO1xuICAgICAgICAgICAgaSA9IGo7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2hhciA9PT0gXCIoXCIpIHtcbiAgICAgICAgICAgIHZhciBjb3VudCA9IDE7XG4gICAgICAgICAgICB2YXIgcGF0dGVybiA9IFwiXCI7XG4gICAgICAgICAgICB2YXIgaiA9IGkgKyAxO1xuICAgICAgICAgICAgaWYgKHN0cltqXSA9PT0gXCI/XCIpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUGF0dGVybiBjYW5ub3Qgc3RhcnQgd2l0aCBcXFwiP1xcXCIgYXQgXCIgKyBqKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdoaWxlIChqIDwgc3RyLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGlmIChzdHJbal0gPT09IFwiXFxcXFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhdHRlcm4gKz0gc3RyW2orK10gKyBzdHJbaisrXTtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzdHJbal0gPT09IFwiKVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvdW50LS07XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb3VudCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaisrO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoc3RyW2pdID09PSBcIihcIikge1xuICAgICAgICAgICAgICAgICAgICBjb3VudCsrO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3RyW2ogKyAxXSAhPT0gXCI/XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYXB0dXJpbmcgZ3JvdXBzIGFyZSBub3QgYWxsb3dlZCBhdCBcIiArIGopO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBhdHRlcm4gKz0gc3RyW2orK107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY291bnQpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlVuYmFsYW5jZWQgcGF0dGVybiBhdCBcIiArIGkpO1xuICAgICAgICAgICAgaWYgKCFwYXR0ZXJuKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJNaXNzaW5nIHBhdHRlcm4gYXQgXCIgKyBpKTtcbiAgICAgICAgICAgIHRva2Vucy5wdXNoKHsgdHlwZTogXCJQQVRURVJOXCIsIGluZGV4OiBpLCB2YWx1ZTogcGF0dGVybiB9KTtcbiAgICAgICAgICAgIGkgPSBqO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgdG9rZW5zLnB1c2goeyB0eXBlOiBcIkNIQVJcIiwgaW5kZXg6IGksIHZhbHVlOiBzdHJbaSsrXSB9KTtcbiAgICB9XG4gICAgdG9rZW5zLnB1c2goeyB0eXBlOiBcIkVORFwiLCBpbmRleDogaSwgdmFsdWU6IFwiXCIgfSk7XG4gICAgcmV0dXJuIHRva2Vucztcbn1cbi8qKlxuICogUGFyc2UgYSBzdHJpbmcgZm9yIHRoZSByYXcgdG9rZW5zLlxuICovXG5mdW5jdGlvbiBwYXJzZShzdHIsIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSB7fTsgfVxuICAgIHZhciB0b2tlbnMgPSBsZXhlcihzdHIpO1xuICAgIHZhciBfYSA9IG9wdGlvbnMucHJlZml4ZXMsIHByZWZpeGVzID0gX2EgPT09IHZvaWQgMCA/IFwiLi9cIiA6IF9hO1xuICAgIHZhciBkZWZhdWx0UGF0dGVybiA9IFwiW15cIiArIGVzY2FwZVN0cmluZyhvcHRpb25zLmRlbGltaXRlciB8fCBcIi8jP1wiKSArIFwiXSs/XCI7XG4gICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgIHZhciBrZXkgPSAwO1xuICAgIHZhciBpID0gMDtcbiAgICB2YXIgcGF0aCA9IFwiXCI7XG4gICAgdmFyIHRyeUNvbnN1bWUgPSBmdW5jdGlvbiAodHlwZSkge1xuICAgICAgICBpZiAoaSA8IHRva2Vucy5sZW5ndGggJiYgdG9rZW5zW2ldLnR5cGUgPT09IHR5cGUpXG4gICAgICAgICAgICByZXR1cm4gdG9rZW5zW2krK10udmFsdWU7XG4gICAgfTtcbiAgICB2YXIgbXVzdENvbnN1bWUgPSBmdW5jdGlvbiAodHlwZSkge1xuICAgICAgICB2YXIgdmFsdWUgPSB0cnlDb25zdW1lKHR5cGUpO1xuICAgICAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgdmFyIF9hID0gdG9rZW5zW2ldLCBuZXh0VHlwZSA9IF9hLnR5cGUsIGluZGV4ID0gX2EuaW5kZXg7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJVbmV4cGVjdGVkIFwiICsgbmV4dFR5cGUgKyBcIiBhdCBcIiArIGluZGV4ICsgXCIsIGV4cGVjdGVkIFwiICsgdHlwZSk7XG4gICAgfTtcbiAgICB2YXIgY29uc3VtZVRleHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSBcIlwiO1xuICAgICAgICB2YXIgdmFsdWU7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZVxuICAgICAgICB3aGlsZSAoKHZhbHVlID0gdHJ5Q29uc3VtZShcIkNIQVJcIikgfHwgdHJ5Q29uc3VtZShcIkVTQ0FQRURfQ0hBUlwiKSkpIHtcbiAgICAgICAgICAgIHJlc3VsdCArPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gICAgd2hpbGUgKGkgPCB0b2tlbnMubGVuZ3RoKSB7XG4gICAgICAgIHZhciBjaGFyID0gdHJ5Q29uc3VtZShcIkNIQVJcIik7XG4gICAgICAgIHZhciBuYW1lID0gdHJ5Q29uc3VtZShcIk5BTUVcIik7XG4gICAgICAgIHZhciBwYXR0ZXJuID0gdHJ5Q29uc3VtZShcIlBBVFRFUk5cIik7XG4gICAgICAgIGlmIChuYW1lIHx8IHBhdHRlcm4pIHtcbiAgICAgICAgICAgIHZhciBwcmVmaXggPSBjaGFyIHx8IFwiXCI7XG4gICAgICAgICAgICBpZiAocHJlZml4ZXMuaW5kZXhPZihwcmVmaXgpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIHBhdGggKz0gcHJlZml4O1xuICAgICAgICAgICAgICAgIHByZWZpeCA9IFwiXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocGF0aCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHBhdGgpO1xuICAgICAgICAgICAgICAgIHBhdGggPSBcIlwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzdWx0LnB1c2goe1xuICAgICAgICAgICAgICAgIG5hbWU6IG5hbWUgfHwga2V5KyssXG4gICAgICAgICAgICAgICAgcHJlZml4OiBwcmVmaXgsXG4gICAgICAgICAgICAgICAgc3VmZml4OiBcIlwiLFxuICAgICAgICAgICAgICAgIHBhdHRlcm46IHBhdHRlcm4gfHwgZGVmYXVsdFBhdHRlcm4sXG4gICAgICAgICAgICAgICAgbW9kaWZpZXI6IHRyeUNvbnN1bWUoXCJNT0RJRklFUlwiKSB8fCBcIlwiXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHZhciB2YWx1ZSA9IGNoYXIgfHwgdHJ5Q29uc3VtZShcIkVTQ0FQRURfQ0hBUlwiKTtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICBwYXRoICs9IHZhbHVlO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBhdGgpIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHBhdGgpO1xuICAgICAgICAgICAgcGF0aCA9IFwiXCI7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG9wZW4gPSB0cnlDb25zdW1lKFwiT1BFTlwiKTtcbiAgICAgICAgaWYgKG9wZW4pIHtcbiAgICAgICAgICAgIHZhciBwcmVmaXggPSBjb25zdW1lVGV4dCgpO1xuICAgICAgICAgICAgdmFyIG5hbWVfMSA9IHRyeUNvbnN1bWUoXCJOQU1FXCIpIHx8IFwiXCI7XG4gICAgICAgICAgICB2YXIgcGF0dGVybl8xID0gdHJ5Q29uc3VtZShcIlBBVFRFUk5cIikgfHwgXCJcIjtcbiAgICAgICAgICAgIHZhciBzdWZmaXggPSBjb25zdW1lVGV4dCgpO1xuICAgICAgICAgICAgbXVzdENvbnN1bWUoXCJDTE9TRVwiKTtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHtcbiAgICAgICAgICAgICAgICBuYW1lOiBuYW1lXzEgfHwgKHBhdHRlcm5fMSA/IGtleSsrIDogXCJcIiksXG4gICAgICAgICAgICAgICAgcGF0dGVybjogbmFtZV8xICYmICFwYXR0ZXJuXzEgPyBkZWZhdWx0UGF0dGVybiA6IHBhdHRlcm5fMSxcbiAgICAgICAgICAgICAgICBwcmVmaXg6IHByZWZpeCxcbiAgICAgICAgICAgICAgICBzdWZmaXg6IHN1ZmZpeCxcbiAgICAgICAgICAgICAgICBtb2RpZmllcjogdHJ5Q29uc3VtZShcIk1PRElGSUVSXCIpIHx8IFwiXCJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgbXVzdENvbnN1bWUoXCJFTkRcIik7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG5leHBvcnRzLnBhcnNlID0gcGFyc2U7XG4vKipcbiAqIENvbXBpbGUgYSBzdHJpbmcgdG8gYSB0ZW1wbGF0ZSBmdW5jdGlvbiBmb3IgdGhlIHBhdGguXG4gKi9cbmZ1bmN0aW9uIGNvbXBpbGUoc3RyLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIHRva2Vuc1RvRnVuY3Rpb24ocGFyc2Uoc3RyLCBvcHRpb25zKSwgb3B0aW9ucyk7XG59XG5leHBvcnRzLmNvbXBpbGUgPSBjb21waWxlO1xuLyoqXG4gKiBFeHBvc2UgYSBtZXRob2QgZm9yIHRyYW5zZm9ybWluZyB0b2tlbnMgaW50byB0aGUgcGF0aCBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gdG9rZW5zVG9GdW5jdGlvbih0b2tlbnMsIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSB7fTsgfVxuICAgIHZhciByZUZsYWdzID0gZmxhZ3Mob3B0aW9ucyk7XG4gICAgdmFyIF9hID0gb3B0aW9ucy5lbmNvZGUsIGVuY29kZSA9IF9hID09PSB2b2lkIDAgPyBmdW5jdGlvbiAoeCkgeyByZXR1cm4geDsgfSA6IF9hLCBfYiA9IG9wdGlvbnMudmFsaWRhdGUsIHZhbGlkYXRlID0gX2IgPT09IHZvaWQgMCA/IHRydWUgOiBfYjtcbiAgICAvLyBDb21waWxlIGFsbCB0aGUgdG9rZW5zIGludG8gcmVnZXhwcy5cbiAgICB2YXIgbWF0Y2hlcyA9IHRva2Vucy5tYXAoZnVuY3Rpb24gKHRva2VuKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdG9rZW4gPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUmVnRXhwKFwiXig/OlwiICsgdG9rZW4ucGF0dGVybiArIFwiKSRcIiwgcmVGbGFncyk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgdmFyIHBhdGggPSBcIlwiO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHRva2VuID0gdG9rZW5zW2ldO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB0b2tlbiA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICAgIHBhdGggKz0gdG9rZW47XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBkYXRhID8gZGF0YVt0b2tlbi5uYW1lXSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHZhciBvcHRpb25hbCA9IHRva2VuLm1vZGlmaWVyID09PSBcIj9cIiB8fCB0b2tlbi5tb2RpZmllciA9PT0gXCIqXCI7XG4gICAgICAgICAgICB2YXIgcmVwZWF0ID0gdG9rZW4ubW9kaWZpZXIgPT09IFwiKlwiIHx8IHRva2VuLm1vZGlmaWVyID09PSBcIitcIjtcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGlmICghcmVwZWF0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJFeHBlY3RlZCBcXFwiXCIgKyB0b2tlbi5uYW1lICsgXCJcXFwiIHRvIG5vdCByZXBlYXQsIGJ1dCBnb3QgYW4gYXJyYXlcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbmFsKVxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJFeHBlY3RlZCBcXFwiXCIgKyB0b2tlbi5uYW1lICsgXCJcXFwiIHRvIG5vdCBiZSBlbXB0eVwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB2YWx1ZS5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2VnbWVudCA9IGVuY29kZSh2YWx1ZVtqXSwgdG9rZW4pO1xuICAgICAgICAgICAgICAgICAgICBpZiAodmFsaWRhdGUgJiYgIW1hdGNoZXNbaV0udGVzdChzZWdtZW50KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkV4cGVjdGVkIGFsbCBcXFwiXCIgKyB0b2tlbi5uYW1lICsgXCJcXFwiIHRvIG1hdGNoIFxcXCJcIiArIHRva2VuLnBhdHRlcm4gKyBcIlxcXCIsIGJ1dCBnb3QgXFxcIlwiICsgc2VnbWVudCArIFwiXFxcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBwYXRoICs9IHRva2VuLnByZWZpeCArIHNlZ21lbnQgKyB0b2tlbi5zdWZmaXg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiB8fCB0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgICAgICAgICB2YXIgc2VnbWVudCA9IGVuY29kZShTdHJpbmcodmFsdWUpLCB0b2tlbik7XG4gICAgICAgICAgICAgICAgaWYgKHZhbGlkYXRlICYmICFtYXRjaGVzW2ldLnRlc3Qoc2VnbWVudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkV4cGVjdGVkIFxcXCJcIiArIHRva2VuLm5hbWUgKyBcIlxcXCIgdG8gbWF0Y2ggXFxcIlwiICsgdG9rZW4ucGF0dGVybiArIFwiXFxcIiwgYnV0IGdvdCBcXFwiXCIgKyBzZWdtZW50ICsgXCJcXFwiXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwYXRoICs9IHRva2VuLnByZWZpeCArIHNlZ21lbnQgKyB0b2tlbi5zdWZmaXg7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAob3B0aW9uYWwpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB2YXIgdHlwZU9mTWVzc2FnZSA9IHJlcGVhdCA/IFwiYW4gYXJyYXlcIiA6IFwiYSBzdHJpbmdcIjtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJFeHBlY3RlZCBcXFwiXCIgKyB0b2tlbi5uYW1lICsgXCJcXFwiIHRvIGJlIFwiICsgdHlwZU9mTWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBhdGg7XG4gICAgfTtcbn1cbmV4cG9ydHMudG9rZW5zVG9GdW5jdGlvbiA9IHRva2Vuc1RvRnVuY3Rpb247XG4vKipcbiAqIENyZWF0ZSBwYXRoIG1hdGNoIGZ1bmN0aW9uIGZyb20gYHBhdGgtdG8tcmVnZXhwYCBzcGVjLlxuICovXG5mdW5jdGlvbiBtYXRjaChzdHIsIG9wdGlvbnMpIHtcbiAgICB2YXIga2V5cyA9IFtdO1xuICAgIHZhciByZSA9IHBhdGhUb1JlZ2V4cChzdHIsIGtleXMsIG9wdGlvbnMpO1xuICAgIHJldHVybiByZWdleHBUb0Z1bmN0aW9uKHJlLCBrZXlzLCBvcHRpb25zKTtcbn1cbmV4cG9ydHMubWF0Y2ggPSBtYXRjaDtcbi8qKlxuICogQ3JlYXRlIGEgcGF0aCBtYXRjaCBmdW5jdGlvbiBmcm9tIGBwYXRoLXRvLXJlZ2V4cGAgb3V0cHV0LlxuICovXG5mdW5jdGlvbiByZWdleHBUb0Z1bmN0aW9uKHJlLCBrZXlzLCBvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cbiAgICB2YXIgX2EgPSBvcHRpb25zLmRlY29kZSwgZGVjb2RlID0gX2EgPT09IHZvaWQgMCA/IGZ1bmN0aW9uICh4KSB7IHJldHVybiB4OyB9IDogX2E7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChwYXRobmFtZSkge1xuICAgICAgICB2YXIgbSA9IHJlLmV4ZWMocGF0aG5hbWUpO1xuICAgICAgICBpZiAoIW0pXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIHZhciBwYXRoID0gbVswXSwgaW5kZXggPSBtLmluZGV4O1xuICAgICAgICB2YXIgcGFyYW1zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgdmFyIF9sb29wXzEgPSBmdW5jdGlvbiAoaSkge1xuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lXG4gICAgICAgICAgICBpZiAobVtpXSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIHJldHVybiBcImNvbnRpbnVlXCI7XG4gICAgICAgICAgICB2YXIga2V5ID0ga2V5c1tpIC0gMV07XG4gICAgICAgICAgICBpZiAoa2V5Lm1vZGlmaWVyID09PSBcIipcIiB8fCBrZXkubW9kaWZpZXIgPT09IFwiK1wiKSB7XG4gICAgICAgICAgICAgICAgcGFyYW1zW2tleS5uYW1lXSA9IG1baV0uc3BsaXQoa2V5LnByZWZpeCArIGtleS5zdWZmaXgpLm1hcChmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlY29kZSh2YWx1ZSwga2V5KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHBhcmFtc1trZXkubmFtZV0gPSBkZWNvZGUobVtpXSwga2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBtLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBfbG9vcF8xKGkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IHBhdGg6IHBhdGgsIGluZGV4OiBpbmRleCwgcGFyYW1zOiBwYXJhbXMgfTtcbiAgICB9O1xufVxuZXhwb3J0cy5yZWdleHBUb0Z1bmN0aW9uID0gcmVnZXhwVG9GdW5jdGlvbjtcbi8qKlxuICogRXNjYXBlIGEgcmVndWxhciBleHByZXNzaW9uIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gZXNjYXBlU3RyaW5nKHN0cikge1xuICAgIHJldHVybiBzdHIucmVwbGFjZSgvKFsuKyo/PV4hOiR7fSgpW1xcXXwvXFxcXF0pL2csIFwiXFxcXCQxXCIpO1xufVxuLyoqXG4gKiBHZXQgdGhlIGZsYWdzIGZvciBhIHJlZ2V4cCBmcm9tIHRoZSBvcHRpb25zLlxuICovXG5mdW5jdGlvbiBmbGFncyhvcHRpb25zKSB7XG4gICAgcmV0dXJuIG9wdGlvbnMgJiYgb3B0aW9ucy5zZW5zaXRpdmUgPyBcIlwiIDogXCJpXCI7XG59XG4vKipcbiAqIFB1bGwgb3V0IGtleXMgZnJvbSBhIHJlZ2V4cC5cbiAqL1xuZnVuY3Rpb24gcmVnZXhwVG9SZWdleHAocGF0aCwga2V5cykge1xuICAgIGlmICgha2V5cylcbiAgICAgICAgcmV0dXJuIHBhdGg7XG4gICAgLy8gVXNlIGEgbmVnYXRpdmUgbG9va2FoZWFkIHRvIG1hdGNoIG9ubHkgY2FwdHVyaW5nIGdyb3Vwcy5cbiAgICB2YXIgZ3JvdXBzID0gcGF0aC5zb3VyY2UubWF0Y2goL1xcKCg/IVxcPykvZyk7XG4gICAgaWYgKGdyb3Vwcykge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGdyb3Vwcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAga2V5cy5wdXNoKHtcbiAgICAgICAgICAgICAgICBuYW1lOiBpLFxuICAgICAgICAgICAgICAgIHByZWZpeDogXCJcIixcbiAgICAgICAgICAgICAgICBzdWZmaXg6IFwiXCIsXG4gICAgICAgICAgICAgICAgbW9kaWZpZXI6IFwiXCIsXG4gICAgICAgICAgICAgICAgcGF0dGVybjogXCJcIlxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHBhdGg7XG59XG4vKipcbiAqIFRyYW5zZm9ybSBhbiBhcnJheSBpbnRvIGEgcmVnZXhwLlxuICovXG5mdW5jdGlvbiBhcnJheVRvUmVnZXhwKHBhdGhzLCBrZXlzLCBvcHRpb25zKSB7XG4gICAgdmFyIHBhcnRzID0gcGF0aHMubWFwKGZ1bmN0aW9uIChwYXRoKSB7IHJldHVybiBwYXRoVG9SZWdleHAocGF0aCwga2V5cywgb3B0aW9ucykuc291cmNlOyB9KTtcbiAgICByZXR1cm4gbmV3IFJlZ0V4cChcIig/OlwiICsgcGFydHMuam9pbihcInxcIikgKyBcIilcIiwgZmxhZ3Mob3B0aW9ucykpO1xufVxuLyoqXG4gKiBDcmVhdGUgYSBwYXRoIHJlZ2V4cCBmcm9tIHN0cmluZyBpbnB1dC5cbiAqL1xuZnVuY3Rpb24gc3RyaW5nVG9SZWdleHAocGF0aCwga2V5cywgb3B0aW9ucykge1xuICAgIHJldHVybiB0b2tlbnNUb1JlZ2V4cChwYXJzZShwYXRoLCBvcHRpb25zKSwga2V5cywgb3B0aW9ucyk7XG59XG4vKipcbiAqIEV4cG9zZSBhIGZ1bmN0aW9uIGZvciB0YWtpbmcgdG9rZW5zIGFuZCByZXR1cm5pbmcgYSBSZWdFeHAuXG4gKi9cbmZ1bmN0aW9uIHRva2Vuc1RvUmVnZXhwKHRva2Vucywga2V5cywgb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IHt9OyB9XG4gICAgdmFyIF9hID0gb3B0aW9ucy5zdHJpY3QsIHN0cmljdCA9IF9hID09PSB2b2lkIDAgPyBmYWxzZSA6IF9hLCBfYiA9IG9wdGlvbnMuc3RhcnQsIHN0YXJ0ID0gX2IgPT09IHZvaWQgMCA/IHRydWUgOiBfYiwgX2MgPSBvcHRpb25zLmVuZCwgZW5kID0gX2MgPT09IHZvaWQgMCA/IHRydWUgOiBfYywgX2QgPSBvcHRpb25zLmVuY29kZSwgZW5jb2RlID0gX2QgPT09IHZvaWQgMCA/IGZ1bmN0aW9uICh4KSB7IHJldHVybiB4OyB9IDogX2Q7XG4gICAgdmFyIGVuZHNXaXRoID0gXCJbXCIgKyBlc2NhcGVTdHJpbmcob3B0aW9ucy5lbmRzV2l0aCB8fCBcIlwiKSArIFwiXXwkXCI7XG4gICAgdmFyIGRlbGltaXRlciA9IFwiW1wiICsgZXNjYXBlU3RyaW5nKG9wdGlvbnMuZGVsaW1pdGVyIHx8IFwiLyM/XCIpICsgXCJdXCI7XG4gICAgdmFyIHJvdXRlID0gc3RhcnQgPyBcIl5cIiA6IFwiXCI7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIHRoZSB0b2tlbnMgYW5kIGNyZWF0ZSBvdXIgcmVnZXhwIHN0cmluZy5cbiAgICBmb3IgKHZhciBfaSA9IDAsIHRva2Vuc18xID0gdG9rZW5zOyBfaSA8IHRva2Vuc18xLmxlbmd0aDsgX2krKykge1xuICAgICAgICB2YXIgdG9rZW4gPSB0b2tlbnNfMVtfaV07XG4gICAgICAgIGlmICh0eXBlb2YgdG9rZW4gPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIHJvdXRlICs9IGVzY2FwZVN0cmluZyhlbmNvZGUodG9rZW4pKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciBwcmVmaXggPSBlc2NhcGVTdHJpbmcoZW5jb2RlKHRva2VuLnByZWZpeCkpO1xuICAgICAgICAgICAgdmFyIHN1ZmZpeCA9IGVzY2FwZVN0cmluZyhlbmNvZGUodG9rZW4uc3VmZml4KSk7XG4gICAgICAgICAgICBpZiAodG9rZW4ucGF0dGVybikge1xuICAgICAgICAgICAgICAgIGlmIChrZXlzKVxuICAgICAgICAgICAgICAgICAgICBrZXlzLnB1c2godG9rZW4pO1xuICAgICAgICAgICAgICAgIGlmIChwcmVmaXggfHwgc3VmZml4KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0b2tlbi5tb2RpZmllciA9PT0gXCIrXCIgfHwgdG9rZW4ubW9kaWZpZXIgPT09IFwiKlwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbW9kID0gdG9rZW4ubW9kaWZpZXIgPT09IFwiKlwiID8gXCI/XCIgOiBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgcm91dGUgKz0gXCIoPzpcIiArIHByZWZpeCArIFwiKCg/OlwiICsgdG9rZW4ucGF0dGVybiArIFwiKSg/OlwiICsgc3VmZml4ICsgcHJlZml4ICsgXCIoPzpcIiArIHRva2VuLnBhdHRlcm4gKyBcIikpKilcIiArIHN1ZmZpeCArIFwiKVwiICsgbW9kO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcm91dGUgKz0gXCIoPzpcIiArIHByZWZpeCArIFwiKFwiICsgdG9rZW4ucGF0dGVybiArIFwiKVwiICsgc3VmZml4ICsgXCIpXCIgKyB0b2tlbi5tb2RpZmllcjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcm91dGUgKz0gXCIoXCIgKyB0b2tlbi5wYXR0ZXJuICsgXCIpXCIgKyB0b2tlbi5tb2RpZmllcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByb3V0ZSArPSBcIig/OlwiICsgcHJlZml4ICsgc3VmZml4ICsgXCIpXCIgKyB0b2tlbi5tb2RpZmllcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoZW5kKSB7XG4gICAgICAgIGlmICghc3RyaWN0KVxuICAgICAgICAgICAgcm91dGUgKz0gZGVsaW1pdGVyICsgXCI/XCI7XG4gICAgICAgIHJvdXRlICs9ICFvcHRpb25zLmVuZHNXaXRoID8gXCIkXCIgOiBcIig/PVwiICsgZW5kc1dpdGggKyBcIilcIjtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHZhciBlbmRUb2tlbiA9IHRva2Vuc1t0b2tlbnMubGVuZ3RoIC0gMV07XG4gICAgICAgIHZhciBpc0VuZERlbGltaXRlZCA9IHR5cGVvZiBlbmRUb2tlbiA9PT0gXCJzdHJpbmdcIlxuICAgICAgICAgICAgPyBkZWxpbWl0ZXIuaW5kZXhPZihlbmRUb2tlbltlbmRUb2tlbi5sZW5ndGggLSAxXSkgPiAtMVxuICAgICAgICAgICAgOiAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgICAgICAgICAgICBlbmRUb2tlbiA9PT0gdW5kZWZpbmVkO1xuICAgICAgICBpZiAoIXN0cmljdCkge1xuICAgICAgICAgICAgcm91dGUgKz0gXCIoPzpcIiArIGRlbGltaXRlciArIFwiKD89XCIgKyBlbmRzV2l0aCArIFwiKSk/XCI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFpc0VuZERlbGltaXRlZCkge1xuICAgICAgICAgICAgcm91dGUgKz0gXCIoPz1cIiArIGRlbGltaXRlciArIFwifFwiICsgZW5kc1dpdGggKyBcIilcIjtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbmV3IFJlZ0V4cChyb3V0ZSwgZmxhZ3Mob3B0aW9ucykpO1xufVxuZXhwb3J0cy50b2tlbnNUb1JlZ2V4cCA9IHRva2Vuc1RvUmVnZXhwO1xuLyoqXG4gKiBOb3JtYWxpemUgdGhlIGdpdmVuIHBhdGggc3RyaW5nLCByZXR1cm5pbmcgYSByZWd1bGFyIGV4cHJlc3Npb24uXG4gKlxuICogQW4gZW1wdHkgYXJyYXkgY2FuIGJlIHBhc3NlZCBpbiBmb3IgdGhlIGtleXMsIHdoaWNoIHdpbGwgaG9sZCB0aGVcbiAqIHBsYWNlaG9sZGVyIGtleSBkZXNjcmlwdGlvbnMuIEZvciBleGFtcGxlLCB1c2luZyBgL3VzZXIvOmlkYCwgYGtleXNgIHdpbGxcbiAqIGNvbnRhaW4gYFt7IG5hbWU6ICdpZCcsIGRlbGltaXRlcjogJy8nLCBvcHRpb25hbDogZmFsc2UsIHJlcGVhdDogZmFsc2UgfV1gLlxuICovXG5mdW5jdGlvbiBwYXRoVG9SZWdleHAocGF0aCwga2V5cywgb3B0aW9ucykge1xuICAgIGlmIChwYXRoIGluc3RhbmNlb2YgUmVnRXhwKVxuICAgICAgICByZXR1cm4gcmVnZXhwVG9SZWdleHAocGF0aCwga2V5cyk7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkocGF0aCkpXG4gICAgICAgIHJldHVybiBhcnJheVRvUmVnZXhwKHBhdGgsIGtleXMsIG9wdGlvbnMpO1xuICAgIHJldHVybiBzdHJpbmdUb1JlZ2V4cChwYXRoLCBrZXlzLCBvcHRpb25zKTtcbn1cbmV4cG9ydHMucGF0aFRvUmVnZXhwID0gcGF0aFRvUmVnZXhwO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZUxvY2FsZVBhdGgoXG4gIHBhdGhuYW1lOiBzdHJpbmcsXG4gIGxvY2FsZXM/OiBzdHJpbmdbXVxuKToge1xuICBkZXRlY3RlZExvY2FsZT86IHN0cmluZ1xuICBwYXRobmFtZTogc3RyaW5nXG59IHtcbiAgbGV0IGRldGVjdGVkTG9jYWxlOiBzdHJpbmcgfCB1bmRlZmluZWRcbiAgLy8gZmlyc3QgaXRlbSB3aWxsIGJlIGVtcHR5IHN0cmluZyBmcm9tIHNwbGl0dGluZyBhdCBmaXJzdCBjaGFyXG4gIGNvbnN0IHBhdGhuYW1lUGFydHMgPSBwYXRobmFtZS5zcGxpdCgnLycpXG5cbiAgOyhsb2NhbGVzIHx8IFtdKS5zb21lKChsb2NhbGUpID0+IHtcbiAgICBpZiAocGF0aG5hbWVQYXJ0c1sxXS50b0xvd2VyQ2FzZSgpID09PSBsb2NhbGUudG9Mb3dlckNhc2UoKSkge1xuICAgICAgZGV0ZWN0ZWRMb2NhbGUgPSBsb2NhbGVcbiAgICAgIHBhdGhuYW1lUGFydHMuc3BsaWNlKDEsIDEpXG4gICAgICBwYXRobmFtZSA9IHBhdGhuYW1lUGFydHMuam9pbignLycpIHx8ICcvJ1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlXG4gIH0pXG5cbiAgcmV0dXJuIHtcbiAgICBwYXRobmFtZSxcbiAgICBkZXRlY3RlZExvY2FsZSxcbiAgfVxufVxuIiwiLypcbk1JVCBMaWNlbnNlXG5cbkNvcHlyaWdodCAoYykgSmFzb24gTWlsbGVyIChodHRwczovL2phc29uZm9ybWF0LmNvbS8pXG5cblBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cblRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cbiovXG5cbi8vIFRoaXMgZmlsZSBpcyBiYXNlZCBvbiBodHRwczovL2dpdGh1Yi5jb20vZGV2ZWxvcGl0L21pdHQvYmxvYi92MS4xLjMvc3JjL2luZGV4LmpzXG4vLyBJdCdzIGJlZW4gZWRpdGVkIGZvciB0aGUgbmVlZHMgb2YgdGhpcyBzY3JpcHRcbi8vIFNlZSB0aGUgTElDRU5TRSBhdCB0aGUgdG9wIG9mIHRoZSBmaWxlXG5cbnR5cGUgSGFuZGxlciA9ICguLi5ldnRzOiBhbnlbXSkgPT4gdm9pZFxuXG5leHBvcnQgdHlwZSBNaXR0RW1pdHRlciA9IHtcbiAgb24odHlwZTogc3RyaW5nLCBoYW5kbGVyOiBIYW5kbGVyKTogdm9pZFxuICBvZmYodHlwZTogc3RyaW5nLCBoYW5kbGVyOiBIYW5kbGVyKTogdm9pZFxuICBlbWl0KHR5cGU6IHN0cmluZywgLi4uZXZ0czogYW55W10pOiB2b2lkXG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1pdHQoKTogTWl0dEVtaXR0ZXIge1xuICBjb25zdCBhbGw6IHsgW3M6IHN0cmluZ106IEhhbmRsZXJbXSB9ID0gT2JqZWN0LmNyZWF0ZShudWxsKVxuXG4gIHJldHVybiB7XG4gICAgb24odHlwZTogc3RyaW5nLCBoYW5kbGVyOiBIYW5kbGVyKSB7XG4gICAgICA7KGFsbFt0eXBlXSB8fCAoYWxsW3R5cGVdID0gW10pKS5wdXNoKGhhbmRsZXIpXG4gICAgfSxcblxuICAgIG9mZih0eXBlOiBzdHJpbmcsIGhhbmRsZXI6IEhhbmRsZXIpIHtcbiAgICAgIGlmIChhbGxbdHlwZV0pIHtcbiAgICAgICAgYWxsW3R5cGVdLnNwbGljZShhbGxbdHlwZV0uaW5kZXhPZihoYW5kbGVyKSA+Pj4gMCwgMSlcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgZW1pdCh0eXBlOiBzdHJpbmcsIC4uLmV2dHM6IGFueVtdKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgYXJyYXktY2FsbGJhY2stcmV0dXJuXG4gICAgICA7KGFsbFt0eXBlXSB8fCBbXSkuc2xpY2UoKS5tYXAoKGhhbmRsZXI6IEhhbmRsZXIpID0+IHtcbiAgICAgICAgaGFuZGxlciguLi5ldnRzKVxuICAgICAgfSlcbiAgICB9LFxuICB9XG59XG4iLCIvLyB0c2xpbnQ6ZGlzYWJsZTpuby1jb25zb2xlXG5pbXBvcnQgeyBQYXJzZWRVcmxRdWVyeSB9IGZyb20gJ3F1ZXJ5c3RyaW5nJ1xuaW1wb3J0IHsgQ29tcG9uZW50VHlwZSB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgVXJsT2JqZWN0IH0gZnJvbSAndXJsJ1xuaW1wb3J0IHtcbiAgbm9ybWFsaXplUGF0aFRyYWlsaW5nU2xhc2gsXG4gIHJlbW92ZVBhdGhUcmFpbGluZ1NsYXNoLFxufSBmcm9tICcuLi8uLi8uLi9jbGllbnQvbm9ybWFsaXplLXRyYWlsaW5nLXNsYXNoJ1xuaW1wb3J0IHsgR29vZFBhZ2VDYWNoZSwgU3R5bGVTaGVldFR1cGxlIH0gZnJvbSAnLi4vLi4vLi4vY2xpZW50L3BhZ2UtbG9hZGVyJ1xuaW1wb3J0IHtcbiAgZ2V0Q2xpZW50QnVpbGRNYW5pZmVzdCxcbiAgaXNBc3NldEVycm9yLFxuICBtYXJrQXNzZXRFcnJvcixcbn0gZnJvbSAnLi4vLi4vLi4vY2xpZW50L3JvdXRlLWxvYWRlcidcbmltcG9ydCB7IERvbWFpbkxvY2FsZXMgfSBmcm9tICcuLi8uLi9zZXJ2ZXIvY29uZmlnJ1xuaW1wb3J0IHsgZGVub3JtYWxpemVQYWdlUGF0aCB9IGZyb20gJy4uLy4uL3NlcnZlci9kZW5vcm1hbGl6ZS1wYWdlLXBhdGgnXG5pbXBvcnQgeyBub3JtYWxpemVMb2NhbGVQYXRoIH0gZnJvbSAnLi4vaTE4bi9ub3JtYWxpemUtbG9jYWxlLXBhdGgnXG5pbXBvcnQgbWl0dCwgeyBNaXR0RW1pdHRlciB9IGZyb20gJy4uL21pdHQnXG5pbXBvcnQge1xuICBBcHBDb250ZXh0VHlwZSxcbiAgZm9ybWF0V2l0aFZhbGlkYXRpb24sXG4gIGdldExvY2F0aW9uT3JpZ2luLFxuICBnZXRVUkwsXG4gIGxvYWRHZXRJbml0aWFsUHJvcHMsXG4gIE5leHRQYWdlQ29udGV4dCxcbiAgU1QsXG4gIE5FWFRfREFUQSxcbn0gZnJvbSAnLi4vdXRpbHMnXG5pbXBvcnQgeyBpc0R5bmFtaWNSb3V0ZSB9IGZyb20gJy4vdXRpbHMvaXMtZHluYW1pYydcbmltcG9ydCB7IHBhcnNlUmVsYXRpdmVVcmwgfSBmcm9tICcuL3V0aWxzL3BhcnNlLXJlbGF0aXZlLXVybCdcbmltcG9ydCB7IHNlYXJjaFBhcmFtc1RvVXJsUXVlcnkgfSBmcm9tICcuL3V0aWxzL3F1ZXJ5c3RyaW5nJ1xuaW1wb3J0IHJlc29sdmVSZXdyaXRlcyBmcm9tICcuL3V0aWxzL3Jlc29sdmUtcmV3cml0ZXMnXG5pbXBvcnQgeyBnZXRSb3V0ZU1hdGNoZXIgfSBmcm9tICcuL3V0aWxzL3JvdXRlLW1hdGNoZXInXG5pbXBvcnQgeyBnZXRSb3V0ZVJlZ2V4IH0gZnJvbSAnLi91dGlscy9yb3V0ZS1yZWdleCdcblxuZGVjbGFyZSBnbG9iYWwge1xuICBpbnRlcmZhY2UgV2luZG93IHtcbiAgICAvKiBwcm9kICovXG4gICAgX19ORVhUX0RBVEFfXzogTkVYVF9EQVRBXG4gIH1cbn1cblxuaW50ZXJmYWNlIFJvdXRlUHJvcGVydGllcyB7XG4gIHNoYWxsb3c6IGJvb2xlYW5cbn1cblxuaW50ZXJmYWNlIFRyYW5zaXRpb25PcHRpb25zIHtcbiAgc2hhbGxvdz86IGJvb2xlYW5cbiAgbG9jYWxlPzogc3RyaW5nIHwgZmFsc2VcbiAgc2Nyb2xsPzogYm9vbGVhblxufVxuXG5pbnRlcmZhY2UgTmV4dEhpc3RvcnlTdGF0ZSB7XG4gIHVybDogc3RyaW5nXG4gIGFzOiBzdHJpbmdcbiAgb3B0aW9uczogVHJhbnNpdGlvbk9wdGlvbnNcbn1cblxudHlwZSBIaXN0b3J5U3RhdGUgPVxuICB8IG51bGxcbiAgfCB7IF9fTjogZmFsc2UgfVxuICB8ICh7IF9fTjogdHJ1ZTsgaWR4OiBudW1iZXIgfSAmIE5leHRIaXN0b3J5U3RhdGUpXG5cbmxldCBkZXRlY3REb21haW5Mb2NhbGU6IHR5cGVvZiBpbXBvcnQoJy4uL2kxOG4vZGV0ZWN0LWRvbWFpbi1sb2NhbGUnKS5kZXRlY3REb21haW5Mb2NhbGVcblxuaWYgKHByb2Nlc3MuZW52Ll9fTkVYVF9JMThOX1NVUFBPUlQpIHtcbiAgZGV0ZWN0RG9tYWluTG9jYWxlID0gcmVxdWlyZSgnLi4vaTE4bi9kZXRlY3QtZG9tYWluLWxvY2FsZScpXG4gICAgLmRldGVjdERvbWFpbkxvY2FsZVxufVxuXG5jb25zdCBiYXNlUGF0aCA9IChwcm9jZXNzLmVudi5fX05FWFRfUk9VVEVSX0JBU0VQQVRIIGFzIHN0cmluZykgfHwgJydcblxuZnVuY3Rpb24gYnVpbGRDYW5jZWxsYXRpb25FcnJvcigpIHtcbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24obmV3IEVycm9yKCdSb3V0ZSBDYW5jZWxsZWQnKSwge1xuICAgIGNhbmNlbGxlZDogdHJ1ZSxcbiAgfSlcbn1cblxuZnVuY3Rpb24gYWRkUGF0aFByZWZpeChwYXRoOiBzdHJpbmcsIHByZWZpeD86IHN0cmluZykge1xuICByZXR1cm4gcHJlZml4ICYmIHBhdGguc3RhcnRzV2l0aCgnLycpXG4gICAgPyBwYXRoID09PSAnLydcbiAgICAgID8gbm9ybWFsaXplUGF0aFRyYWlsaW5nU2xhc2gocHJlZml4KVxuICAgICAgOiBgJHtwcmVmaXh9JHtwYXRoTm9RdWVyeUhhc2gocGF0aCkgPT09ICcvJyA/IHBhdGguc3Vic3RyaW5nKDEpIDogcGF0aH1gXG4gICAgOiBwYXRoXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXREb21haW5Mb2NhbGUoXG4gIHBhdGg6IHN0cmluZyxcbiAgbG9jYWxlPzogc3RyaW5nIHwgZmFsc2UsXG4gIGxvY2FsZXM/OiBzdHJpbmdbXSxcbiAgZG9tYWluTG9jYWxlcz86IERvbWFpbkxvY2FsZXNcbikge1xuICBpZiAocHJvY2Vzcy5lbnYuX19ORVhUX0kxOE5fU1VQUE9SVCkge1xuICAgIGxvY2FsZSA9IGxvY2FsZSB8fCBub3JtYWxpemVMb2NhbGVQYXRoKHBhdGgsIGxvY2FsZXMpLmRldGVjdGVkTG9jYWxlXG5cbiAgICBjb25zdCBkZXRlY3RlZERvbWFpbiA9IGRldGVjdERvbWFpbkxvY2FsZShkb21haW5Mb2NhbGVzLCB1bmRlZmluZWQsIGxvY2FsZSlcblxuICAgIGlmIChkZXRlY3RlZERvbWFpbikge1xuICAgICAgcmV0dXJuIGBodHRwJHtkZXRlY3RlZERvbWFpbi5odHRwID8gJycgOiAncyd9Oi8vJHtkZXRlY3RlZERvbWFpbi5kb21haW59JHtcbiAgICAgICAgYmFzZVBhdGggfHwgJydcbiAgICAgIH0ke2xvY2FsZSA9PT0gZGV0ZWN0ZWREb21haW4uZGVmYXVsdExvY2FsZSA/ICcnIDogYC8ke2xvY2FsZX1gfSR7cGF0aH1gXG4gICAgfVxuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRMb2NhbGUoXG4gIHBhdGg6IHN0cmluZyxcbiAgbG9jYWxlPzogc3RyaW5nIHwgZmFsc2UsXG4gIGRlZmF1bHRMb2NhbGU/OiBzdHJpbmdcbikge1xuICBpZiAocHJvY2Vzcy5lbnYuX19ORVhUX0kxOE5fU1VQUE9SVCkge1xuICAgIGNvbnN0IHBhdGhuYW1lID0gcGF0aE5vUXVlcnlIYXNoKHBhdGgpXG4gICAgY29uc3QgcGF0aExvd2VyID0gcGF0aG5hbWUudG9Mb3dlckNhc2UoKVxuICAgIGNvbnN0IGxvY2FsZUxvd2VyID0gbG9jYWxlICYmIGxvY2FsZS50b0xvd2VyQ2FzZSgpXG5cbiAgICByZXR1cm4gbG9jYWxlICYmXG4gICAgICBsb2NhbGUgIT09IGRlZmF1bHRMb2NhbGUgJiZcbiAgICAgICFwYXRoTG93ZXIuc3RhcnRzV2l0aCgnLycgKyBsb2NhbGVMb3dlciArICcvJykgJiZcbiAgICAgIHBhdGhMb3dlciAhPT0gJy8nICsgbG9jYWxlTG93ZXJcbiAgICAgID8gYWRkUGF0aFByZWZpeChwYXRoLCAnLycgKyBsb2NhbGUpXG4gICAgICA6IHBhdGhcbiAgfVxuICByZXR1cm4gcGF0aFxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVsTG9jYWxlKHBhdGg6IHN0cmluZywgbG9jYWxlPzogc3RyaW5nKSB7XG4gIGlmIChwcm9jZXNzLmVudi5fX05FWFRfSTE4Tl9TVVBQT1JUKSB7XG4gICAgY29uc3QgcGF0aG5hbWUgPSBwYXRoTm9RdWVyeUhhc2gocGF0aClcbiAgICBjb25zdCBwYXRoTG93ZXIgPSBwYXRobmFtZS50b0xvd2VyQ2FzZSgpXG4gICAgY29uc3QgbG9jYWxlTG93ZXIgPSBsb2NhbGUgJiYgbG9jYWxlLnRvTG93ZXJDYXNlKClcblxuICAgIHJldHVybiBsb2NhbGUgJiZcbiAgICAgIChwYXRoTG93ZXIuc3RhcnRzV2l0aCgnLycgKyBsb2NhbGVMb3dlciArICcvJykgfHxcbiAgICAgICAgcGF0aExvd2VyID09PSAnLycgKyBsb2NhbGVMb3dlcilcbiAgICAgID8gKHBhdGhuYW1lLmxlbmd0aCA9PT0gbG9jYWxlLmxlbmd0aCArIDEgPyAnLycgOiAnJykgK1xuICAgICAgICAgIHBhdGguc3Vic3RyKGxvY2FsZS5sZW5ndGggKyAxKVxuICAgICAgOiBwYXRoXG4gIH1cbiAgcmV0dXJuIHBhdGhcbn1cblxuZnVuY3Rpb24gcGF0aE5vUXVlcnlIYXNoKHBhdGg6IHN0cmluZykge1xuICBjb25zdCBxdWVyeUluZGV4ID0gcGF0aC5pbmRleE9mKCc/JylcbiAgY29uc3QgaGFzaEluZGV4ID0gcGF0aC5pbmRleE9mKCcjJylcblxuICBpZiAocXVlcnlJbmRleCA+IC0xIHx8IGhhc2hJbmRleCA+IC0xKSB7XG4gICAgcGF0aCA9IHBhdGguc3Vic3RyaW5nKDAsIHF1ZXJ5SW5kZXggPiAtMSA/IHF1ZXJ5SW5kZXggOiBoYXNoSW5kZXgpXG4gIH1cbiAgcmV0dXJuIHBhdGhcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhhc0Jhc2VQYXRoKHBhdGg6IHN0cmluZyk6IGJvb2xlYW4ge1xuICBwYXRoID0gcGF0aE5vUXVlcnlIYXNoKHBhdGgpXG4gIHJldHVybiBwYXRoID09PSBiYXNlUGF0aCB8fCBwYXRoLnN0YXJ0c1dpdGgoYmFzZVBhdGggKyAnLycpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRCYXNlUGF0aChwYXRoOiBzdHJpbmcpOiBzdHJpbmcge1xuICAvLyB3ZSBvbmx5IGFkZCB0aGUgYmFzZXBhdGggb24gcmVsYXRpdmUgdXJsc1xuICByZXR1cm4gYWRkUGF0aFByZWZpeChwYXRoLCBiYXNlUGF0aClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlbEJhc2VQYXRoKHBhdGg6IHN0cmluZyk6IHN0cmluZyB7XG4gIHBhdGggPSBwYXRoLnNsaWNlKGJhc2VQYXRoLmxlbmd0aClcbiAgaWYgKCFwYXRoLnN0YXJ0c1dpdGgoJy8nKSkgcGF0aCA9IGAvJHtwYXRofWBcbiAgcmV0dXJuIHBhdGhcbn1cblxuLyoqXG4gKiBEZXRlY3RzIHdoZXRoZXIgYSBnaXZlbiB1cmwgaXMgcm91dGFibGUgYnkgdGhlIE5leHQuanMgcm91dGVyIChicm93c2VyIG9ubHkpLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNMb2NhbFVSTCh1cmw6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAvLyBwcmV2ZW50IGEgaHlkcmF0aW9uIG1pc21hdGNoIG9uIGhyZWYgZm9yIHVybCB3aXRoIGFuY2hvciByZWZzXG4gIGlmICh1cmwuc3RhcnRzV2l0aCgnLycpIHx8IHVybC5zdGFydHNXaXRoKCcjJykpIHJldHVybiB0cnVlXG4gIHRyeSB7XG4gICAgLy8gYWJzb2x1dGUgdXJscyBjYW4gYmUgbG9jYWwgaWYgdGhleSBhcmUgb24gdGhlIHNhbWUgb3JpZ2luXG4gICAgY29uc3QgbG9jYXRpb25PcmlnaW4gPSBnZXRMb2NhdGlvbk9yaWdpbigpXG4gICAgY29uc3QgcmVzb2x2ZWQgPSBuZXcgVVJMKHVybCwgbG9jYXRpb25PcmlnaW4pXG4gICAgcmV0dXJuIHJlc29sdmVkLm9yaWdpbiA9PT0gbG9jYXRpb25PcmlnaW4gJiYgaGFzQmFzZVBhdGgocmVzb2x2ZWQucGF0aG5hbWUpXG4gIH0gY2F0Y2ggKF8pIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG50eXBlIFVybCA9IFVybE9iamVjdCB8IHN0cmluZ1xuXG5leHBvcnQgZnVuY3Rpb24gaW50ZXJwb2xhdGVBcyhcbiAgcm91dGU6IHN0cmluZyxcbiAgYXNQYXRobmFtZTogc3RyaW5nLFxuICBxdWVyeTogUGFyc2VkVXJsUXVlcnlcbikge1xuICBsZXQgaW50ZXJwb2xhdGVkUm91dGUgPSAnJ1xuXG4gIGNvbnN0IGR5bmFtaWNSZWdleCA9IGdldFJvdXRlUmVnZXgocm91dGUpXG4gIGNvbnN0IGR5bmFtaWNHcm91cHMgPSBkeW5hbWljUmVnZXguZ3JvdXBzXG4gIGNvbnN0IGR5bmFtaWNNYXRjaGVzID1cbiAgICAvLyBUcnkgdG8gbWF0Y2ggdGhlIGR5bmFtaWMgcm91dGUgYWdhaW5zdCB0aGUgYXNQYXRoXG4gICAgKGFzUGF0aG5hbWUgIT09IHJvdXRlID8gZ2V0Um91dGVNYXRjaGVyKGR5bmFtaWNSZWdleCkoYXNQYXRobmFtZSkgOiAnJykgfHxcbiAgICAvLyBGYWxsIGJhY2sgdG8gcmVhZGluZyB0aGUgdmFsdWVzIGZyb20gdGhlIGhyZWZcbiAgICAvLyBUT0RPOiBzaG91bGQgdGhpcyB0YWtlIHByaW9yaXR5OyBhbHNvIG5lZWQgdG8gY2hhbmdlIGluIHRoZSByb3V0ZXIuXG4gICAgcXVlcnlcblxuICBpbnRlcnBvbGF0ZWRSb3V0ZSA9IHJvdXRlXG4gIGNvbnN0IHBhcmFtcyA9IE9iamVjdC5rZXlzKGR5bmFtaWNHcm91cHMpXG5cbiAgaWYgKFxuICAgICFwYXJhbXMuZXZlcnkoKHBhcmFtKSA9PiB7XG4gICAgICBsZXQgdmFsdWUgPSBkeW5hbWljTWF0Y2hlc1twYXJhbV0gfHwgJydcbiAgICAgIGNvbnN0IHsgcmVwZWF0LCBvcHRpb25hbCB9ID0gZHluYW1pY0dyb3Vwc1twYXJhbV1cblxuICAgICAgLy8gc3VwcG9ydCBzaW5nbGUtbGV2ZWwgY2F0Y2gtYWxsXG4gICAgICAvLyBUT0RPOiBtb3JlIHJvYnVzdCBoYW5kbGluZyBmb3IgdXNlci1lcnJvciAocGFzc2luZyBgL2ApXG4gICAgICBsZXQgcmVwbGFjZWQgPSBgWyR7cmVwZWF0ID8gJy4uLicgOiAnJ30ke3BhcmFtfV1gXG4gICAgICBpZiAob3B0aW9uYWwpIHtcbiAgICAgICAgcmVwbGFjZWQgPSBgJHshdmFsdWUgPyAnLycgOiAnJ31bJHtyZXBsYWNlZH1dYFxuICAgICAgfVxuICAgICAgaWYgKHJlcGVhdCAmJiAhQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHZhbHVlID0gW3ZhbHVlXVxuXG4gICAgICByZXR1cm4gKFxuICAgICAgICAob3B0aW9uYWwgfHwgcGFyYW0gaW4gZHluYW1pY01hdGNoZXMpICYmXG4gICAgICAgIC8vIEludGVycG9sYXRlIGdyb3VwIGludG8gZGF0YSBVUkwgaWYgcHJlc2VudFxuICAgICAgICAoaW50ZXJwb2xhdGVkUm91dGUgPVxuICAgICAgICAgIGludGVycG9sYXRlZFJvdXRlIS5yZXBsYWNlKFxuICAgICAgICAgICAgcmVwbGFjZWQsXG4gICAgICAgICAgICByZXBlYXRcbiAgICAgICAgICAgICAgPyAodmFsdWUgYXMgc3RyaW5nW10pXG4gICAgICAgICAgICAgICAgICAubWFwKFxuICAgICAgICAgICAgICAgICAgICAvLyB0aGVzZSB2YWx1ZXMgc2hvdWxkIGJlIGZ1bGx5IGVuY29kZWQgaW5zdGVhZCBvZiBqdXN0XG4gICAgICAgICAgICAgICAgICAgIC8vIHBhdGggZGVsaW1pdGVyIGVzY2FwZWQgc2luY2UgdGhleSBhcmUgYmVpbmcgaW5zZXJ0ZWRcbiAgICAgICAgICAgICAgICAgICAgLy8gaW50byB0aGUgVVJMIGFuZCB3ZSBleHBlY3QgVVJMIGVuY29kZWQgc2VnbWVudHNcbiAgICAgICAgICAgICAgICAgICAgLy8gd2hlbiBwYXJzaW5nIGR5bmFtaWMgcm91dGUgcGFyYW1zXG4gICAgICAgICAgICAgICAgICAgIChzZWdtZW50KSA9PiBlbmNvZGVVUklDb21wb25lbnQoc2VnbWVudClcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIC5qb2luKCcvJylcbiAgICAgICAgICAgICAgOiBlbmNvZGVVUklDb21wb25lbnQodmFsdWUgYXMgc3RyaW5nKVxuICAgICAgICAgICkgfHwgJy8nKVxuICAgICAgKVxuICAgIH0pXG4gICkge1xuICAgIGludGVycG9sYXRlZFJvdXRlID0gJycgLy8gZGlkIG5vdCBzYXRpc2Z5IGFsbCByZXF1aXJlbWVudHNcblxuICAgIC8vIG4uYi4gV2UgaWdub3JlIHRoaXMgZXJyb3IgYmVjYXVzZSB3ZSBoYW5kbGUgd2FybmluZyBmb3IgdGhpcyBjYXNlIGluXG4gICAgLy8gZGV2ZWxvcG1lbnQgaW4gdGhlIGA8TGluaz5gIGNvbXBvbmVudCBkaXJlY3RseS5cbiAgfVxuICByZXR1cm4ge1xuICAgIHBhcmFtcyxcbiAgICByZXN1bHQ6IGludGVycG9sYXRlZFJvdXRlLFxuICB9XG59XG5cbmZ1bmN0aW9uIG9taXRQYXJtc0Zyb21RdWVyeShxdWVyeTogUGFyc2VkVXJsUXVlcnksIHBhcmFtczogc3RyaW5nW10pIHtcbiAgY29uc3QgZmlsdGVyZWRRdWVyeTogUGFyc2VkVXJsUXVlcnkgPSB7fVxuXG4gIE9iamVjdC5rZXlzKHF1ZXJ5KS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICBpZiAoIXBhcmFtcy5pbmNsdWRlcyhrZXkpKSB7XG4gICAgICBmaWx0ZXJlZFF1ZXJ5W2tleV0gPSBxdWVyeVtrZXldXG4gICAgfVxuICB9KVxuICByZXR1cm4gZmlsdGVyZWRRdWVyeVxufVxuXG4vKipcbiAqIFJlc29sdmVzIGEgZ2l2ZW4gaHlwZXJsaW5rIHdpdGggYSBjZXJ0YWluIHJvdXRlciBzdGF0ZSAoYmFzZVBhdGggbm90IGluY2x1ZGVkKS5cbiAqIFByZXNlcnZlcyBhYnNvbHV0ZSB1cmxzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVzb2x2ZUhyZWYoXG4gIGN1cnJlbnRQYXRoOiBzdHJpbmcsXG4gIGhyZWY6IFVybCxcbiAgcmVzb2x2ZUFzPzogYm9vbGVhblxuKTogc3RyaW5nIHtcbiAgLy8gd2UgdXNlIGEgZHVtbXkgYmFzZSB1cmwgZm9yIHJlbGF0aXZlIHVybHNcbiAgbGV0IGJhc2U6IFVSTFxuXG4gIHRyeSB7XG4gICAgYmFzZSA9IG5ldyBVUkwoY3VycmVudFBhdGgsICdodHRwOi8vbicpXG4gIH0gY2F0Y2ggKF8pIHtcbiAgICAvLyBmYWxsYmFjayB0byAvIGZvciBpbnZhbGlkIGFzUGF0aCB2YWx1ZXMgZS5nLiAvL1xuICAgIGJhc2UgPSBuZXcgVVJMKCcvJywgJ2h0dHA6Ly9uJylcbiAgfVxuICBjb25zdCB1cmxBc1N0cmluZyA9XG4gICAgdHlwZW9mIGhyZWYgPT09ICdzdHJpbmcnID8gaHJlZiA6IGZvcm1hdFdpdGhWYWxpZGF0aW9uKGhyZWYpXG4gIC8vIFJldHVybiBiZWNhdXNlIGl0IGNhbm5vdCBiZSByb3V0ZWQgYnkgdGhlIE5leHQuanMgcm91dGVyXG4gIGlmICghaXNMb2NhbFVSTCh1cmxBc1N0cmluZykpIHtcbiAgICByZXR1cm4gKHJlc29sdmVBcyA/IFt1cmxBc1N0cmluZ10gOiB1cmxBc1N0cmluZykgYXMgc3RyaW5nXG4gIH1cbiAgdHJ5IHtcbiAgICBjb25zdCBmaW5hbFVybCA9IG5ldyBVUkwodXJsQXNTdHJpbmcsIGJhc2UpXG4gICAgZmluYWxVcmwucGF0aG5hbWUgPSBub3JtYWxpemVQYXRoVHJhaWxpbmdTbGFzaChmaW5hbFVybC5wYXRobmFtZSlcbiAgICBsZXQgaW50ZXJwb2xhdGVkQXMgPSAnJ1xuXG4gICAgaWYgKFxuICAgICAgaXNEeW5hbWljUm91dGUoZmluYWxVcmwucGF0aG5hbWUpICYmXG4gICAgICBmaW5hbFVybC5zZWFyY2hQYXJhbXMgJiZcbiAgICAgIHJlc29sdmVBc1xuICAgICkge1xuICAgICAgY29uc3QgcXVlcnkgPSBzZWFyY2hQYXJhbXNUb1VybFF1ZXJ5KGZpbmFsVXJsLnNlYXJjaFBhcmFtcylcblxuICAgICAgY29uc3QgeyByZXN1bHQsIHBhcmFtcyB9ID0gaW50ZXJwb2xhdGVBcyhcbiAgICAgICAgZmluYWxVcmwucGF0aG5hbWUsXG4gICAgICAgIGZpbmFsVXJsLnBhdGhuYW1lLFxuICAgICAgICBxdWVyeVxuICAgICAgKVxuXG4gICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgIGludGVycG9sYXRlZEFzID0gZm9ybWF0V2l0aFZhbGlkYXRpb24oe1xuICAgICAgICAgIHBhdGhuYW1lOiByZXN1bHQsXG4gICAgICAgICAgaGFzaDogZmluYWxVcmwuaGFzaCxcbiAgICAgICAgICBxdWVyeTogb21pdFBhcm1zRnJvbVF1ZXJ5KHF1ZXJ5LCBwYXJhbXMpLFxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGlmIHRoZSBvcmlnaW4gZGlkbid0IGNoYW5nZSwgaXQgbWVhbnMgd2UgcmVjZWl2ZWQgYSByZWxhdGl2ZSBocmVmXG4gICAgY29uc3QgcmVzb2x2ZWRIcmVmID1cbiAgICAgIGZpbmFsVXJsLm9yaWdpbiA9PT0gYmFzZS5vcmlnaW5cbiAgICAgICAgPyBmaW5hbFVybC5ocmVmLnNsaWNlKGZpbmFsVXJsLm9yaWdpbi5sZW5ndGgpXG4gICAgICAgIDogZmluYWxVcmwuaHJlZlxuXG4gICAgcmV0dXJuIChyZXNvbHZlQXNcbiAgICAgID8gW3Jlc29sdmVkSHJlZiwgaW50ZXJwb2xhdGVkQXMgfHwgcmVzb2x2ZWRIcmVmXVxuICAgICAgOiByZXNvbHZlZEhyZWYpIGFzIHN0cmluZ1xuICB9IGNhdGNoIChfKSB7XG4gICAgcmV0dXJuIChyZXNvbHZlQXMgPyBbdXJsQXNTdHJpbmddIDogdXJsQXNTdHJpbmcpIGFzIHN0cmluZ1xuICB9XG59XG5cbmZ1bmN0aW9uIHN0cmlwT3JpZ2luKHVybDogc3RyaW5nKSB7XG4gIGNvbnN0IG9yaWdpbiA9IGdldExvY2F0aW9uT3JpZ2luKClcblxuICByZXR1cm4gdXJsLnN0YXJ0c1dpdGgob3JpZ2luKSA/IHVybC5zdWJzdHJpbmcob3JpZ2luLmxlbmd0aCkgOiB1cmxcbn1cblxuZnVuY3Rpb24gcHJlcGFyZVVybEFzKHJvdXRlcjogTmV4dFJvdXRlciwgdXJsOiBVcmwsIGFzPzogVXJsKSB7XG4gIC8vIElmIHVybCBhbmQgYXMgcHJvdmlkZWQgYXMgYW4gb2JqZWN0IHJlcHJlc2VudGF0aW9uLFxuICAvLyB3ZSdsbCBmb3JtYXQgdGhlbSBpbnRvIHRoZSBzdHJpbmcgdmVyc2lvbiBoZXJlLlxuICBsZXQgW3Jlc29sdmVkSHJlZiwgcmVzb2x2ZWRBc10gPSByZXNvbHZlSHJlZihyb3V0ZXIuYXNQYXRoLCB1cmwsIHRydWUpXG4gIGNvbnN0IG9yaWdpbiA9IGdldExvY2F0aW9uT3JpZ2luKClcbiAgY29uc3QgaHJlZkhhZE9yaWdpbiA9IHJlc29sdmVkSHJlZi5zdGFydHNXaXRoKG9yaWdpbilcbiAgY29uc3QgYXNIYWRPcmlnaW4gPSByZXNvbHZlZEFzICYmIHJlc29sdmVkQXMuc3RhcnRzV2l0aChvcmlnaW4pXG5cbiAgcmVzb2x2ZWRIcmVmID0gc3RyaXBPcmlnaW4ocmVzb2x2ZWRIcmVmKVxuICByZXNvbHZlZEFzID0gcmVzb2x2ZWRBcyA/IHN0cmlwT3JpZ2luKHJlc29sdmVkQXMpIDogcmVzb2x2ZWRBc1xuXG4gIGNvbnN0IHByZXBhcmVkVXJsID0gaHJlZkhhZE9yaWdpbiA/IHJlc29sdmVkSHJlZiA6IGFkZEJhc2VQYXRoKHJlc29sdmVkSHJlZilcbiAgY29uc3QgcHJlcGFyZWRBcyA9IGFzXG4gICAgPyBzdHJpcE9yaWdpbihyZXNvbHZlSHJlZihyb3V0ZXIuYXNQYXRoLCBhcykpXG4gICAgOiByZXNvbHZlZEFzIHx8IHJlc29sdmVkSHJlZlxuXG4gIHJldHVybiB7XG4gICAgdXJsOiBwcmVwYXJlZFVybCxcbiAgICBhczogYXNIYWRPcmlnaW4gPyBwcmVwYXJlZEFzIDogYWRkQmFzZVBhdGgocHJlcGFyZWRBcyksXG4gIH1cbn1cblxuZnVuY3Rpb24gcmVzb2x2ZUR5bmFtaWNSb3V0ZShwYXRobmFtZTogc3RyaW5nLCBwYWdlczogc3RyaW5nW10pIHtcbiAgY29uc3QgY2xlYW5QYXRobmFtZSA9IHJlbW92ZVBhdGhUcmFpbGluZ1NsYXNoKGRlbm9ybWFsaXplUGFnZVBhdGgocGF0aG5hbWUhKSlcblxuICBpZiAoY2xlYW5QYXRobmFtZSA9PT0gJy80MDQnIHx8IGNsZWFuUGF0aG5hbWUgPT09ICcvX2Vycm9yJykge1xuICAgIHJldHVybiBwYXRobmFtZVxuICB9XG5cbiAgLy8gaGFuZGxlIHJlc29sdmluZyBocmVmIGZvciBkeW5hbWljIHJvdXRlc1xuICBpZiAoIXBhZ2VzLmluY2x1ZGVzKGNsZWFuUGF0aG5hbWUhKSkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBhcnJheS1jYWxsYmFjay1yZXR1cm5cbiAgICBwYWdlcy5zb21lKChwYWdlKSA9PiB7XG4gICAgICBpZiAoaXNEeW5hbWljUm91dGUocGFnZSkgJiYgZ2V0Um91dGVSZWdleChwYWdlKS5yZS50ZXN0KGNsZWFuUGF0aG5hbWUhKSkge1xuICAgICAgICBwYXRobmFtZSA9IHBhZ2VcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH1cbiAgICB9KVxuICB9XG4gIHJldHVybiByZW1vdmVQYXRoVHJhaWxpbmdTbGFzaChwYXRobmFtZSlcbn1cblxuZXhwb3J0IHR5cGUgQmFzZVJvdXRlciA9IHtcbiAgcm91dGU6IHN0cmluZ1xuICBwYXRobmFtZTogc3RyaW5nXG4gIHF1ZXJ5OiBQYXJzZWRVcmxRdWVyeVxuICBhc1BhdGg6IHN0cmluZ1xuICBiYXNlUGF0aDogc3RyaW5nXG4gIGxvY2FsZT86IHN0cmluZ1xuICBsb2NhbGVzPzogc3RyaW5nW11cbiAgZGVmYXVsdExvY2FsZT86IHN0cmluZ1xuICBkb21haW5Mb2NhbGVzPzogRG9tYWluTG9jYWxlc1xuICBpc0xvY2FsZURvbWFpbjogYm9vbGVhblxufVxuXG5leHBvcnQgdHlwZSBOZXh0Um91dGVyID0gQmFzZVJvdXRlciAmXG4gIFBpY2s8XG4gICAgUm91dGVyLFxuICAgIHwgJ3B1c2gnXG4gICAgfCAncmVwbGFjZSdcbiAgICB8ICdyZWxvYWQnXG4gICAgfCAnYmFjaydcbiAgICB8ICdwcmVmZXRjaCdcbiAgICB8ICdiZWZvcmVQb3BTdGF0ZSdcbiAgICB8ICdldmVudHMnXG4gICAgfCAnaXNGYWxsYmFjaydcbiAgICB8ICdpc1JlYWR5J1xuICAgIHwgJ2lzUHJldmlldydcbiAgPlxuXG5leHBvcnQgdHlwZSBQcmVmZXRjaE9wdGlvbnMgPSB7XG4gIHByaW9yaXR5PzogYm9vbGVhblxuICBsb2NhbGU/OiBzdHJpbmcgfCBmYWxzZVxufVxuXG5leHBvcnQgdHlwZSBQcml2YXRlUm91dGVJbmZvID1cbiAgfCAoT21pdDxDb21wbGV0ZVByaXZhdGVSb3V0ZUluZm8sICdzdHlsZVNoZWV0cyc+ICYgeyBpbml0aWFsOiB0cnVlIH0pXG4gIHwgQ29tcGxldGVQcml2YXRlUm91dGVJbmZvXG5cbmV4cG9ydCB0eXBlIENvbXBsZXRlUHJpdmF0ZVJvdXRlSW5mbyA9IHtcbiAgQ29tcG9uZW50OiBDb21wb25lbnRUeXBlXG4gIHN0eWxlU2hlZXRzOiBTdHlsZVNoZWV0VHVwbGVbXVxuICBfX05fU1NHPzogYm9vbGVhblxuICBfX05fU1NQPzogYm9vbGVhblxuICBwcm9wcz86IFJlY29yZDxzdHJpbmcsIGFueT5cbiAgZXJyPzogRXJyb3JcbiAgZXJyb3I/OiBhbnlcbn1cblxuZXhwb3J0IHR5cGUgQXBwUHJvcHMgPSBQaWNrPENvbXBsZXRlUHJpdmF0ZVJvdXRlSW5mbywgJ0NvbXBvbmVudCcgfCAnZXJyJz4gJiB7XG4gIHJvdXRlcjogUm91dGVyXG59ICYgUmVjb3JkPHN0cmluZywgYW55PlxuZXhwb3J0IHR5cGUgQXBwQ29tcG9uZW50ID0gQ29tcG9uZW50VHlwZTxBcHBQcm9wcz5cblxudHlwZSBTdWJzY3JpcHRpb24gPSAoXG4gIGRhdGE6IFByaXZhdGVSb3V0ZUluZm8sXG4gIEFwcDogQXBwQ29tcG9uZW50LFxuICByZXNldFNjcm9sbDogeyB4OiBudW1iZXI7IHk6IG51bWJlciB9IHwgbnVsbFxuKSA9PiBQcm9taXNlPHZvaWQ+XG5cbnR5cGUgQmVmb3JlUG9wU3RhdGVDYWxsYmFjayA9IChzdGF0ZTogTmV4dEhpc3RvcnlTdGF0ZSkgPT4gYm9vbGVhblxuXG50eXBlIENvbXBvbmVudExvYWRDYW5jZWwgPSAoKCkgPT4gdm9pZCkgfCBudWxsXG5cbnR5cGUgSGlzdG9yeU1ldGhvZCA9ICdyZXBsYWNlU3RhdGUnIHwgJ3B1c2hTdGF0ZSdcblxuY29uc3QgbWFudWFsU2Nyb2xsUmVzdG9yYXRpb24gPVxuICBwcm9jZXNzLmVudi5fX05FWFRfU0NST0xMX1JFU1RPUkFUSU9OICYmXG4gIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmXG4gICdzY3JvbGxSZXN0b3JhdGlvbicgaW4gd2luZG93Lmhpc3RvcnkgJiZcbiAgISEoZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICBsZXQgdiA9ICdfX25leHQnXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VxdWVuY2VzXG4gICAgICByZXR1cm4gc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSh2LCB2KSwgc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbSh2KSwgdHJ1ZVxuICAgIH0gY2F0Y2ggKG4pIHt9XG4gIH0pKClcblxuY29uc3QgU1NHX0RBVEFfTk9UX0ZPVU5EID0gU3ltYm9sKCdTU0dfREFUQV9OT1RfRk9VTkQnKVxuXG5mdW5jdGlvbiBmZXRjaFJldHJ5KHVybDogc3RyaW5nLCBhdHRlbXB0czogbnVtYmVyKTogUHJvbWlzZTxhbnk+IHtcbiAgcmV0dXJuIGZldGNoKHVybCwge1xuICAgIC8vIENvb2tpZXMgYXJlIHJlcXVpcmVkIHRvIGJlIHByZXNlbnQgZm9yIE5leHQuanMnIFNTRyBcIlByZXZpZXcgTW9kZVwiLlxuICAgIC8vIENvb2tpZXMgbWF5IGFsc28gYmUgcmVxdWlyZWQgZm9yIGBnZXRTZXJ2ZXJTaWRlUHJvcHNgLlxuICAgIC8vXG4gICAgLy8gPiBgZmV0Y2hgIHdvbuKAmXQgc2VuZCBjb29raWVzLCB1bmxlc3MgeW91IHNldCB0aGUgY3JlZGVudGlhbHMgaW5pdFxuICAgIC8vID4gb3B0aW9uLlxuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9GZXRjaF9BUEkvVXNpbmdfRmV0Y2hcbiAgICAvL1xuICAgIC8vID4gRm9yIG1heGltdW0gYnJvd3NlciBjb21wYXRpYmlsaXR5IHdoZW4gaXQgY29tZXMgdG8gc2VuZGluZyAmXG4gICAgLy8gPiByZWNlaXZpbmcgY29va2llcywgYWx3YXlzIHN1cHBseSB0aGUgYGNyZWRlbnRpYWxzOiAnc2FtZS1vcmlnaW4nYFxuICAgIC8vID4gb3B0aW9uIGluc3RlYWQgb2YgcmVseWluZyBvbiB0aGUgZGVmYXVsdC5cbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vZ2l0aHViL2ZldGNoI2NhdmVhdHNcbiAgICBjcmVkZW50aWFsczogJ3NhbWUtb3JpZ2luJyxcbiAgfSkudGhlbigocmVzKSA9PiB7XG4gICAgaWYgKCFyZXMub2spIHtcbiAgICAgIGlmIChhdHRlbXB0cyA+IDEgJiYgcmVzLnN0YXR1cyA+PSA1MDApIHtcbiAgICAgICAgcmV0dXJuIGZldGNoUmV0cnkodXJsLCBhdHRlbXB0cyAtIDEpXG4gICAgICB9XG4gICAgICBpZiAocmVzLnN0YXR1cyA9PT0gNDA0KSB7XG4gICAgICAgIHJldHVybiByZXMuanNvbigpLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICBpZiAoZGF0YS5ub3RGb3VuZCkge1xuICAgICAgICAgICAgcmV0dXJuIHsgbm90Rm91bmQ6IFNTR19EQVRBX05PVF9GT1VORCB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRmFpbGVkIHRvIGxvYWQgc3RhdGljIHByb3BzYClcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICAgIHRocm93IG5ldyBFcnJvcihgRmFpbGVkIHRvIGxvYWQgc3RhdGljIHByb3BzYClcbiAgICB9XG4gICAgcmV0dXJuIHJlcy5qc29uKClcbiAgfSlcbn1cblxuZnVuY3Rpb24gZmV0Y2hOZXh0RGF0YShkYXRhSHJlZjogc3RyaW5nLCBpc1NlcnZlclJlbmRlcjogYm9vbGVhbikge1xuICByZXR1cm4gZmV0Y2hSZXRyeShkYXRhSHJlZiwgaXNTZXJ2ZXJSZW5kZXIgPyAzIDogMSkuY2F0Y2goKGVycjogRXJyb3IpID0+IHtcbiAgICAvLyBXZSBzaG91bGQgb25seSB0cmlnZ2VyIGEgc2VydmVyLXNpZGUgdHJhbnNpdGlvbiBpZiB0aGlzIHdhcyBjYXVzZWRcbiAgICAvLyBvbiBhIGNsaWVudC1zaWRlIHRyYW5zaXRpb24uIE90aGVyd2lzZSwgd2UnZCBnZXQgaW50byBhbiBpbmZpbml0ZVxuICAgIC8vIGxvb3AuXG5cbiAgICBpZiAoIWlzU2VydmVyUmVuZGVyKSB7XG4gICAgICBtYXJrQXNzZXRFcnJvcihlcnIpXG4gICAgfVxuICAgIHRocm93IGVyclxuICB9KVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb3V0ZXIgaW1wbGVtZW50cyBCYXNlUm91dGVyIHtcbiAgcm91dGU6IHN0cmluZ1xuICBwYXRobmFtZTogc3RyaW5nXG4gIHF1ZXJ5OiBQYXJzZWRVcmxRdWVyeVxuICBhc1BhdGg6IHN0cmluZ1xuICBiYXNlUGF0aDogc3RyaW5nXG5cbiAgLyoqXG4gICAqIE1hcCBvZiBhbGwgY29tcG9uZW50cyBsb2FkZWQgaW4gYFJvdXRlcmBcbiAgICovXG4gIGNvbXBvbmVudHM6IHsgW3BhdGhuYW1lOiBzdHJpbmddOiBQcml2YXRlUm91dGVJbmZvIH1cbiAgLy8gU3RhdGljIERhdGEgQ2FjaGVcbiAgc2RjOiB7IFthc1BhdGg6IHN0cmluZ106IG9iamVjdCB9ID0ge31cbiAgLy8gSW4tZmxpZ2h0IFNlcnZlciBEYXRhIFJlcXVlc3RzLCBmb3IgZGVkdXBpbmdcbiAgc2RyOiB7IFthc1BhdGg6IHN0cmluZ106IFByb21pc2U8b2JqZWN0PiB9ID0ge31cblxuICBzdWI6IFN1YnNjcmlwdGlvblxuICBjbGM6IENvbXBvbmVudExvYWRDYW5jZWxcbiAgcGFnZUxvYWRlcjogYW55XG4gIF9icHM6IEJlZm9yZVBvcFN0YXRlQ2FsbGJhY2sgfCB1bmRlZmluZWRcbiAgZXZlbnRzOiBNaXR0RW1pdHRlclxuICBfd3JhcEFwcDogKEFwcDogQXBwQ29tcG9uZW50KSA9PiBhbnlcbiAgaXNTc3I6IGJvb2xlYW5cbiAgaXNGYWxsYmFjazogYm9vbGVhblxuICBfaW5GbGlnaHRSb3V0ZT86IHN0cmluZ1xuICBfc2hhbGxvdz86IGJvb2xlYW5cbiAgbG9jYWxlPzogc3RyaW5nXG4gIGxvY2FsZXM/OiBzdHJpbmdbXVxuICBkZWZhdWx0TG9jYWxlPzogc3RyaW5nXG4gIGRvbWFpbkxvY2FsZXM/OiBEb21haW5Mb2NhbGVzXG4gIGlzUmVhZHk6IGJvb2xlYW5cbiAgaXNQcmV2aWV3OiBib29sZWFuXG4gIGlzTG9jYWxlRG9tYWluOiBib29sZWFuXG5cbiAgcHJpdmF0ZSBfaWR4OiBudW1iZXIgPSAwXG5cbiAgc3RhdGljIGV2ZW50czogTWl0dEVtaXR0ZXIgPSBtaXR0KClcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwYXRobmFtZTogc3RyaW5nLFxuICAgIHF1ZXJ5OiBQYXJzZWRVcmxRdWVyeSxcbiAgICBhczogc3RyaW5nLFxuICAgIHtcbiAgICAgIGluaXRpYWxQcm9wcyxcbiAgICAgIHBhZ2VMb2FkZXIsXG4gICAgICBBcHAsXG4gICAgICB3cmFwQXBwLFxuICAgICAgQ29tcG9uZW50LFxuICAgICAgZXJyLFxuICAgICAgc3Vic2NyaXB0aW9uLFxuICAgICAgaXNGYWxsYmFjayxcbiAgICAgIGxvY2FsZSxcbiAgICAgIGxvY2FsZXMsXG4gICAgICBkZWZhdWx0TG9jYWxlLFxuICAgICAgZG9tYWluTG9jYWxlcyxcbiAgICAgIGlzUHJldmlldyxcbiAgICB9OiB7XG4gICAgICBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvblxuICAgICAgaW5pdGlhbFByb3BzOiBhbnlcbiAgICAgIHBhZ2VMb2FkZXI6IGFueVxuICAgICAgQ29tcG9uZW50OiBDb21wb25lbnRUeXBlXG4gICAgICBBcHA6IEFwcENvbXBvbmVudFxuICAgICAgd3JhcEFwcDogKFdyYXBBcHBDb21wb25lbnQ6IEFwcENvbXBvbmVudCkgPT4gYW55XG4gICAgICBlcnI/OiBFcnJvclxuICAgICAgaXNGYWxsYmFjazogYm9vbGVhblxuICAgICAgbG9jYWxlPzogc3RyaW5nXG4gICAgICBsb2NhbGVzPzogc3RyaW5nW11cbiAgICAgIGRlZmF1bHRMb2NhbGU/OiBzdHJpbmdcbiAgICAgIGRvbWFpbkxvY2FsZXM/OiBEb21haW5Mb2NhbGVzXG4gICAgICBpc1ByZXZpZXc/OiBib29sZWFuXG4gICAgfVxuICApIHtcbiAgICAvLyByZXByZXNlbnRzIHRoZSBjdXJyZW50IGNvbXBvbmVudCBrZXlcbiAgICB0aGlzLnJvdXRlID0gcmVtb3ZlUGF0aFRyYWlsaW5nU2xhc2gocGF0aG5hbWUpXG5cbiAgICAvLyBzZXQgdXAgdGhlIGNvbXBvbmVudCBjYWNoZSAoYnkgcm91dGUga2V5cylcbiAgICB0aGlzLmNvbXBvbmVudHMgPSB7fVxuICAgIC8vIFdlIHNob3VsZCBub3Qga2VlcCB0aGUgY2FjaGUsIGlmIHRoZXJlJ3MgYW4gZXJyb3JcbiAgICAvLyBPdGhlcndpc2UsIHRoaXMgY2F1c2UgaXNzdWVzIHdoZW4gd2hlbiBnb2luZyBiYWNrIGFuZFxuICAgIC8vIGNvbWUgYWdhaW4gdG8gdGhlIGVycm9yZWQgcGFnZS5cbiAgICBpZiAocGF0aG5hbWUgIT09ICcvX2Vycm9yJykge1xuICAgICAgdGhpcy5jb21wb25lbnRzW3RoaXMucm91dGVdID0ge1xuICAgICAgICBDb21wb25lbnQsXG4gICAgICAgIGluaXRpYWw6IHRydWUsXG4gICAgICAgIHByb3BzOiBpbml0aWFsUHJvcHMsXG4gICAgICAgIGVycixcbiAgICAgICAgX19OX1NTRzogaW5pdGlhbFByb3BzICYmIGluaXRpYWxQcm9wcy5fX05fU1NHLFxuICAgICAgICBfX05fU1NQOiBpbml0aWFsUHJvcHMgJiYgaW5pdGlhbFByb3BzLl9fTl9TU1AsXG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5jb21wb25lbnRzWycvX2FwcCddID0ge1xuICAgICAgQ29tcG9uZW50OiBBcHAgYXMgQ29tcG9uZW50VHlwZSxcbiAgICAgIHN0eWxlU2hlZXRzOiBbXG4gICAgICAgIC8qIC9fYXBwIGRvZXMgbm90IG5lZWQgaXRzIHN0eWxlc2hlZXRzIG1hbmFnZWQgKi9cbiAgICAgIF0sXG4gICAgfVxuXG4gICAgLy8gQmFja3dhcmRzIGNvbXBhdCBmb3IgUm91dGVyLnJvdXRlci5ldmVudHNcbiAgICAvLyBUT0RPOiBTaG91bGQgYmUgcmVtb3ZlIHRoZSBmb2xsb3dpbmcgbWFqb3IgdmVyc2lvbiBhcyBpdCB3YXMgbmV2ZXIgZG9jdW1lbnRlZFxuICAgIHRoaXMuZXZlbnRzID0gUm91dGVyLmV2ZW50c1xuXG4gICAgdGhpcy5wYWdlTG9hZGVyID0gcGFnZUxvYWRlclxuICAgIHRoaXMucGF0aG5hbWUgPSBwYXRobmFtZVxuICAgIHRoaXMucXVlcnkgPSBxdWVyeVxuICAgIC8vIGlmIGF1dG8gcHJlcmVuZGVyZWQgYW5kIGR5bmFtaWMgcm91dGUgd2FpdCB0byB1cGRhdGUgYXNQYXRoXG4gICAgLy8gdW50aWwgYWZ0ZXIgbW91bnQgdG8gcHJldmVudCBoeWRyYXRpb24gbWlzbWF0Y2hcbiAgICBjb25zdCBhdXRvRXhwb3J0RHluYW1pYyA9XG4gICAgICBpc0R5bmFtaWNSb3V0ZShwYXRobmFtZSkgJiYgc2VsZi5fX05FWFRfREFUQV9fLmF1dG9FeHBvcnRcblxuICAgIHRoaXMuYXNQYXRoID0gYXV0b0V4cG9ydER5bmFtaWMgPyBwYXRobmFtZSA6IGFzXG4gICAgdGhpcy5iYXNlUGF0aCA9IGJhc2VQYXRoXG4gICAgdGhpcy5zdWIgPSBzdWJzY3JpcHRpb25cbiAgICB0aGlzLmNsYyA9IG51bGxcbiAgICB0aGlzLl93cmFwQXBwID0gd3JhcEFwcFxuICAgIC8vIG1ha2Ugc3VyZSB0byBpZ25vcmUgZXh0cmEgcG9wU3RhdGUgaW4gc2FmYXJpIG9uIG5hdmlnYXRpbmdcbiAgICAvLyBiYWNrIGZyb20gZXh0ZXJuYWwgc2l0ZVxuICAgIHRoaXMuaXNTc3IgPSB0cnVlXG5cbiAgICB0aGlzLmlzRmFsbGJhY2sgPSBpc0ZhbGxiYWNrXG5cbiAgICB0aGlzLmlzUmVhZHkgPSAhIShcbiAgICAgIHNlbGYuX19ORVhUX0RBVEFfXy5nc3NwIHx8XG4gICAgICBzZWxmLl9fTkVYVF9EQVRBX18uZ2lwIHx8XG4gICAgICAoIWF1dG9FeHBvcnREeW5hbWljICYmXG4gICAgICAgICFzZWxmLmxvY2F0aW9uLnNlYXJjaCAmJlxuICAgICAgICAhcHJvY2Vzcy5lbnYuX19ORVhUX0hBU19SRVdSSVRFUylcbiAgICApXG4gICAgdGhpcy5pc1ByZXZpZXcgPSAhIWlzUHJldmlld1xuICAgIHRoaXMuaXNMb2NhbGVEb21haW4gPSBmYWxzZVxuXG4gICAgaWYgKHByb2Nlc3MuZW52Ll9fTkVYVF9JMThOX1NVUFBPUlQpIHtcbiAgICAgIHRoaXMubG9jYWxlID0gbG9jYWxlXG4gICAgICB0aGlzLmxvY2FsZXMgPSBsb2NhbGVzXG4gICAgICB0aGlzLmRlZmF1bHRMb2NhbGUgPSBkZWZhdWx0TG9jYWxlXG4gICAgICB0aGlzLmRvbWFpbkxvY2FsZXMgPSBkb21haW5Mb2NhbGVzXG4gICAgICB0aGlzLmlzTG9jYWxlRG9tYWluID0gISFkZXRlY3REb21haW5Mb2NhbGUoXG4gICAgICAgIGRvbWFpbkxvY2FsZXMsXG4gICAgICAgIHNlbGYubG9jYXRpb24uaG9zdG5hbWVcbiAgICAgIClcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIC8vIG1ha2Ugc3VyZSBcImFzXCIgZG9lc24ndCBzdGFydCB3aXRoIGRvdWJsZSBzbGFzaGVzIG9yIGVsc2UgaXQgY2FuXG4gICAgICAvLyB0aHJvdyBhbiBlcnJvciBhcyBpdCdzIGNvbnNpZGVyZWQgaW52YWxpZFxuICAgICAgaWYgKGFzLnN1YnN0cigwLCAyKSAhPT0gJy8vJykge1xuICAgICAgICAvLyBpbiBvcmRlciBmb3IgYGUuc3RhdGVgIHRvIHdvcmsgb24gdGhlIGBvbnBvcHN0YXRlYCBldmVudFxuICAgICAgICAvLyB3ZSBoYXZlIHRvIHJlZ2lzdGVyIHRoZSBpbml0aWFsIHJvdXRlIHVwb24gaW5pdGlhbGl6YXRpb25cbiAgICAgICAgdGhpcy5jaGFuZ2VTdGF0ZShcbiAgICAgICAgICAncmVwbGFjZVN0YXRlJyxcbiAgICAgICAgICBmb3JtYXRXaXRoVmFsaWRhdGlvbih7IHBhdGhuYW1lOiBhZGRCYXNlUGF0aChwYXRobmFtZSksIHF1ZXJ5IH0pLFxuICAgICAgICAgIGdldFVSTCgpLFxuICAgICAgICAgIHsgbG9jYWxlIH1cbiAgICAgICAgKVxuICAgICAgfVxuXG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncG9wc3RhdGUnLCB0aGlzLm9uUG9wU3RhdGUpXG5cbiAgICAgIC8vIGVuYWJsZSBjdXN0b20gc2Nyb2xsIHJlc3RvcmF0aW9uIGhhbmRsaW5nIHdoZW4gYXZhaWxhYmxlXG4gICAgICAvLyBvdGhlcndpc2UgZmFsbGJhY2sgdG8gYnJvd3NlcidzIGRlZmF1bHQgaGFuZGxpbmdcbiAgICAgIGlmIChwcm9jZXNzLmVudi5fX05FWFRfU0NST0xMX1JFU1RPUkFUSU9OKSB7XG4gICAgICAgIGlmIChtYW51YWxTY3JvbGxSZXN0b3JhdGlvbikge1xuICAgICAgICAgIHdpbmRvdy5oaXN0b3J5LnNjcm9sbFJlc3RvcmF0aW9uID0gJ21hbnVhbCdcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG9uUG9wU3RhdGUgPSAoZTogUG9wU3RhdGVFdmVudCk6IHZvaWQgPT4ge1xuICAgIGNvbnN0IHN0YXRlID0gZS5zdGF0ZSBhcyBIaXN0b3J5U3RhdGVcblxuICAgIGlmICghc3RhdGUpIHtcbiAgICAgIC8vIFdlIGdldCBzdGF0ZSBhcyB1bmRlZmluZWQgZm9yIHR3byByZWFzb25zLlxuICAgICAgLy8gIDEuIFdpdGggb2xkZXIgc2FmYXJpICg8IDgpIGFuZCBvbGRlciBjaHJvbWUgKDwgMzQpXG4gICAgICAvLyAgMi4gV2hlbiB0aGUgVVJMIGNoYW5nZWQgd2l0aCAjXG4gICAgICAvL1xuICAgICAgLy8gSW4gdGhlIGJvdGggY2FzZXMsIHdlIGRvbid0IG5lZWQgdG8gcHJvY2VlZCBhbmQgY2hhbmdlIHRoZSByb3V0ZS5cbiAgICAgIC8vIChhcyBpdCdzIGFscmVhZHkgY2hhbmdlZClcbiAgICAgIC8vIEJ1dCB3ZSBjYW4gc2ltcGx5IHJlcGxhY2UgdGhlIHN0YXRlIHdpdGggdGhlIG5ldyBjaGFuZ2VzLlxuICAgICAgLy8gQWN0dWFsbHksIGZvciAoMSkgd2UgZG9uJ3QgbmVlZCB0byBub3RoaW5nLiBCdXQgaXQncyBoYXJkIHRvIGRldGVjdCB0aGF0IGV2ZW50LlxuICAgICAgLy8gU28sIGRvaW5nIHRoZSBmb2xsb3dpbmcgZm9yICgxKSBkb2VzIG5vIGhhcm0uXG4gICAgICBjb25zdCB7IHBhdGhuYW1lLCBxdWVyeSB9ID0gdGhpc1xuICAgICAgdGhpcy5jaGFuZ2VTdGF0ZShcbiAgICAgICAgJ3JlcGxhY2VTdGF0ZScsXG4gICAgICAgIGZvcm1hdFdpdGhWYWxpZGF0aW9uKHsgcGF0aG5hbWU6IGFkZEJhc2VQYXRoKHBhdGhuYW1lKSwgcXVlcnkgfSksXG4gICAgICAgIGdldFVSTCgpXG4gICAgICApXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpZiAoIXN0YXRlLl9fTikge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgbGV0IGZvcmNlZFNjcm9sbDogeyB4OiBudW1iZXI7IHk6IG51bWJlciB9IHwgdW5kZWZpbmVkXG4gICAgY29uc3QgeyB1cmwsIGFzLCBvcHRpb25zLCBpZHggfSA9IHN0YXRlXG4gICAgaWYgKHByb2Nlc3MuZW52Ll9fTkVYVF9TQ1JPTExfUkVTVE9SQVRJT04pIHtcbiAgICAgIGlmIChtYW51YWxTY3JvbGxSZXN0b3JhdGlvbikge1xuICAgICAgICBpZiAodGhpcy5faWR4ICE9PSBpZHgpIHtcbiAgICAgICAgICAvLyBTbmFwc2hvdCBjdXJyZW50IHNjcm9sbCBwb3NpdGlvbjpcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShcbiAgICAgICAgICAgICAgJ19fbmV4dF9zY3JvbGxfJyArIHRoaXMuX2lkeCxcbiAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoeyB4OiBzZWxmLnBhZ2VYT2Zmc2V0LCB5OiBzZWxmLnBhZ2VZT2Zmc2V0IH0pXG4gICAgICAgICAgICApXG4gICAgICAgICAgfSBjYXRjaCB7fVxuXG4gICAgICAgICAgLy8gUmVzdG9yZSBvbGQgc2Nyb2xsIHBvc2l0aW9uOlxuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCB2ID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnX19uZXh0X3Njcm9sbF8nICsgaWR4KVxuICAgICAgICAgICAgZm9yY2VkU2Nyb2xsID0gSlNPTi5wYXJzZSh2ISlcbiAgICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICAgIGZvcmNlZFNjcm9sbCA9IHsgeDogMCwgeTogMCB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuX2lkeCA9IGlkeFxuXG4gICAgY29uc3QgeyBwYXRobmFtZSB9ID0gcGFyc2VSZWxhdGl2ZVVybCh1cmwpXG5cbiAgICAvLyBNYWtlIHN1cmUgd2UgZG9uJ3QgcmUtcmVuZGVyIG9uIGluaXRpYWwgbG9hZCxcbiAgICAvLyBjYW4gYmUgY2F1c2VkIGJ5IG5hdmlnYXRpbmcgYmFjayBmcm9tIGFuIGV4dGVybmFsIHNpdGVcbiAgICBpZiAodGhpcy5pc1NzciAmJiBhcyA9PT0gdGhpcy5hc1BhdGggJiYgcGF0aG5hbWUgPT09IHRoaXMucGF0aG5hbWUpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIC8vIElmIHRoZSBkb3duc3RyZWFtIGFwcGxpY2F0aW9uIHJldHVybnMgZmFsc3ksIHJldHVybi5cbiAgICAvLyBUaGV5IHdpbGwgdGhlbiBiZSByZXNwb25zaWJsZSBmb3IgaGFuZGxpbmcgdGhlIGV2ZW50LlxuICAgIGlmICh0aGlzLl9icHMgJiYgIXRoaXMuX2JwcyhzdGF0ZSkpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHRoaXMuY2hhbmdlKFxuICAgICAgJ3JlcGxhY2VTdGF0ZScsXG4gICAgICB1cmwsXG4gICAgICBhcyxcbiAgICAgIE9iamVjdC5hc3NpZ248e30sIFRyYW5zaXRpb25PcHRpb25zLCBUcmFuc2l0aW9uT3B0aW9ucz4oe30sIG9wdGlvbnMsIHtcbiAgICAgICAgc2hhbGxvdzogb3B0aW9ucy5zaGFsbG93ICYmIHRoaXMuX3NoYWxsb3csXG4gICAgICAgIGxvY2FsZTogb3B0aW9ucy5sb2NhbGUgfHwgdGhpcy5kZWZhdWx0TG9jYWxlLFxuICAgICAgfSksXG4gICAgICBmb3JjZWRTY3JvbGxcbiAgICApXG4gIH1cblxuICByZWxvYWQoKTogdm9pZCB7XG4gICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpXG4gIH1cblxuICAvKipcbiAgICogR28gYmFjayBpbiBoaXN0b3J5XG4gICAqL1xuICBiYWNrKCkge1xuICAgIHdpbmRvdy5oaXN0b3J5LmJhY2soKVxuICB9XG5cbiAgLyoqXG4gICAqIFBlcmZvcm1zIGEgYHB1c2hTdGF0ZWAgd2l0aCBhcmd1bWVudHNcbiAgICogQHBhcmFtIHVybCBvZiB0aGUgcm91dGVcbiAgICogQHBhcmFtIGFzIG1hc2tzIGB1cmxgIGZvciB0aGUgYnJvd3NlclxuICAgKiBAcGFyYW0gb3B0aW9ucyBvYmplY3QgeW91IGNhbiBkZWZpbmUgYHNoYWxsb3dgIGFuZCBvdGhlciBvcHRpb25zXG4gICAqL1xuICBwdXNoKHVybDogVXJsLCBhcz86IFVybCwgb3B0aW9uczogVHJhbnNpdGlvbk9wdGlvbnMgPSB7fSkge1xuICAgIGlmIChwcm9jZXNzLmVudi5fX05FWFRfU0NST0xMX1JFU1RPUkFUSU9OKSB7XG4gICAgICAvLyBUT0RPOiByZW1vdmUgaW4gdGhlIGZ1dHVyZSB3aGVuIHdlIHVwZGF0ZSBoaXN0b3J5IGJlZm9yZSByb3V0ZSBjaGFuZ2VcbiAgICAgIC8vIGlzIGNvbXBsZXRlLCBhcyB0aGUgcG9wc3RhdGUgZXZlbnQgc2hvdWxkIGhhbmRsZSB0aGlzIGNhcHR1cmUuXG4gICAgICBpZiAobWFudWFsU2Nyb2xsUmVzdG9yYXRpb24pIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAvLyBTbmFwc2hvdCBzY3JvbGwgcG9zaXRpb24gcmlnaHQgYmVmb3JlIG5hdmlnYXRpbmcgdG8gYSBuZXcgcGFnZTpcbiAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFxuICAgICAgICAgICAgJ19fbmV4dF9zY3JvbGxfJyArIHRoaXMuX2lkeCxcbiAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHsgeDogc2VsZi5wYWdlWE9mZnNldCwgeTogc2VsZi5wYWdlWU9mZnNldCB9KVxuICAgICAgICAgIClcbiAgICAgICAgfSBjYXRjaCB7fVxuICAgICAgfVxuICAgIH1cbiAgICA7KHsgdXJsLCBhcyB9ID0gcHJlcGFyZVVybEFzKHRoaXMsIHVybCwgYXMpKVxuICAgIHJldHVybiB0aGlzLmNoYW5nZSgncHVzaFN0YXRlJywgdXJsLCBhcywgb3B0aW9ucylcbiAgfVxuXG4gIC8qKlxuICAgKiBQZXJmb3JtcyBhIGByZXBsYWNlU3RhdGVgIHdpdGggYXJndW1lbnRzXG4gICAqIEBwYXJhbSB1cmwgb2YgdGhlIHJvdXRlXG4gICAqIEBwYXJhbSBhcyBtYXNrcyBgdXJsYCBmb3IgdGhlIGJyb3dzZXJcbiAgICogQHBhcmFtIG9wdGlvbnMgb2JqZWN0IHlvdSBjYW4gZGVmaW5lIGBzaGFsbG93YCBhbmQgb3RoZXIgb3B0aW9uc1xuICAgKi9cbiAgcmVwbGFjZSh1cmw6IFVybCwgYXM/OiBVcmwsIG9wdGlvbnM6IFRyYW5zaXRpb25PcHRpb25zID0ge30pIHtcbiAgICA7KHsgdXJsLCBhcyB9ID0gcHJlcGFyZVVybEFzKHRoaXMsIHVybCwgYXMpKVxuICAgIHJldHVybiB0aGlzLmNoYW5nZSgncmVwbGFjZVN0YXRlJywgdXJsLCBhcywgb3B0aW9ucylcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgY2hhbmdlKFxuICAgIG1ldGhvZDogSGlzdG9yeU1ldGhvZCxcbiAgICB1cmw6IHN0cmluZyxcbiAgICBhczogc3RyaW5nLFxuICAgIG9wdGlvbnM6IFRyYW5zaXRpb25PcHRpb25zLFxuICAgIGZvcmNlZFNjcm9sbD86IHsgeDogbnVtYmVyOyB5OiBudW1iZXIgfVxuICApOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBpZiAoIWlzTG9jYWxVUkwodXJsKSkge1xuICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSB1cmxcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICBjb25zdCBzaG91bGRSZXNvbHZlSHJlZiA9IHVybCA9PT0gYXMgfHwgKG9wdGlvbnMgYXMgYW55KS5faFxuXG4gICAgLy8gZm9yIHN0YXRpYyBwYWdlcyB3aXRoIHF1ZXJ5IHBhcmFtcyBpbiB0aGUgVVJMIHdlIGRlbGF5XG4gICAgLy8gbWFya2luZyB0aGUgcm91dGVyIHJlYWR5IHVudGlsIGFmdGVyIHRoZSBxdWVyeSBpcyB1cGRhdGVkXG4gICAgaWYgKChvcHRpb25zIGFzIGFueSkuX2gpIHtcbiAgICAgIHRoaXMuaXNSZWFkeSA9IHRydWVcbiAgICB9XG5cbiAgICAvLyBEZWZhdWx0IHRvIHNjcm9sbCByZXNldCBiZWhhdmlvciB1bmxlc3MgZXhwbGljaXRseSBzcGVjaWZpZWQgdG8gYmVcbiAgICAvLyBgZmFsc2VgISBUaGlzIG1ha2VzIHRoZSBiZWhhdmlvciBiZXR3ZWVuIHVzaW5nIGBSb3V0ZXIjcHVzaGAgYW5kIGFcbiAgICAvLyBgPExpbmsgLz5gIGNvbnNpc3RlbnQuXG4gICAgb3B0aW9ucy5zY3JvbGwgPSAhIShvcHRpb25zLnNjcm9sbCA/PyB0cnVlKVxuXG4gICAgbGV0IGxvY2FsZUNoYW5nZSA9IG9wdGlvbnMubG9jYWxlICE9PSB0aGlzLmxvY2FsZVxuXG4gICAgaWYgKHByb2Nlc3MuZW52Ll9fTkVYVF9JMThOX1NVUFBPUlQpIHtcbiAgICAgIHRoaXMubG9jYWxlID1cbiAgICAgICAgb3B0aW9ucy5sb2NhbGUgPT09IGZhbHNlXG4gICAgICAgICAgPyB0aGlzLmRlZmF1bHRMb2NhbGVcbiAgICAgICAgICA6IG9wdGlvbnMubG9jYWxlIHx8IHRoaXMubG9jYWxlXG5cbiAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5sb2NhbGUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIG9wdGlvbnMubG9jYWxlID0gdGhpcy5sb2NhbGVcbiAgICAgIH1cblxuICAgICAgY29uc3QgcGFyc2VkQXMgPSBwYXJzZVJlbGF0aXZlVXJsKGhhc0Jhc2VQYXRoKGFzKSA/IGRlbEJhc2VQYXRoKGFzKSA6IGFzKVxuICAgICAgY29uc3QgbG9jYWxlUGF0aFJlc3VsdCA9IG5vcm1hbGl6ZUxvY2FsZVBhdGgoXG4gICAgICAgIHBhcnNlZEFzLnBhdGhuYW1lLFxuICAgICAgICB0aGlzLmxvY2FsZXNcbiAgICAgIClcblxuICAgICAgaWYgKGxvY2FsZVBhdGhSZXN1bHQuZGV0ZWN0ZWRMb2NhbGUpIHtcbiAgICAgICAgdGhpcy5sb2NhbGUgPSBsb2NhbGVQYXRoUmVzdWx0LmRldGVjdGVkTG9jYWxlXG4gICAgICAgIHBhcnNlZEFzLnBhdGhuYW1lID0gYWRkQmFzZVBhdGgocGFyc2VkQXMucGF0aG5hbWUpXG4gICAgICAgIGFzID0gZm9ybWF0V2l0aFZhbGlkYXRpb24ocGFyc2VkQXMpXG4gICAgICAgIHVybCA9IGFkZEJhc2VQYXRoKFxuICAgICAgICAgIG5vcm1hbGl6ZUxvY2FsZVBhdGgoXG4gICAgICAgICAgICBoYXNCYXNlUGF0aCh1cmwpID8gZGVsQmFzZVBhdGgodXJsKSA6IHVybCxcbiAgICAgICAgICAgIHRoaXMubG9jYWxlc1xuICAgICAgICAgICkucGF0aG5hbWVcbiAgICAgICAgKVxuICAgICAgfVxuICAgICAgbGV0IGRpZE5hdmlnYXRlID0gZmFsc2VcblxuICAgICAgLy8gd2UgbmVlZCB0byB3cmFwIHRoaXMgaW4gdGhlIGVudiBjaGVjayBhZ2FpbiBzaW5jZSByZWdlbmVyYXRvciBydW50aW1lXG4gICAgICAvLyBtb3ZlcyB0aGlzIG9uIGl0cyBvd24gZHVlIHRvIHRoZSByZXR1cm5cbiAgICAgIGlmIChwcm9jZXNzLmVudi5fX05FWFRfSTE4Tl9TVVBQT1JUKSB7XG4gICAgICAgIC8vIGlmIHRoZSBsb2NhbGUgaXNuJ3QgY29uZmlndXJlZCBoYXJkIG5hdmlnYXRlIHRvIHNob3cgNDA0IHBhZ2VcbiAgICAgICAgaWYgKCF0aGlzLmxvY2FsZXM/LmluY2x1ZGVzKHRoaXMubG9jYWxlISkpIHtcbiAgICAgICAgICBwYXJzZWRBcy5wYXRobmFtZSA9IGFkZExvY2FsZShwYXJzZWRBcy5wYXRobmFtZSwgdGhpcy5sb2NhbGUpXG4gICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBmb3JtYXRXaXRoVmFsaWRhdGlvbihwYXJzZWRBcylcbiAgICAgICAgICAvLyB0aGlzIHdhcyBwcmV2aW91c2x5IGEgcmV0dXJuIGJ1dCB3YXMgcmVtb3ZlZCBpbiBmYXZvclxuICAgICAgICAgIC8vIG9mIGJldHRlciBkZWFkIGNvZGUgZWxpbWluYXRpb24gd2l0aCByZWdlbmVyYXRvciBydW50aW1lXG4gICAgICAgICAgZGlkTmF2aWdhdGUgPSB0cnVlXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3QgZGV0ZWN0ZWREb21haW4gPSBkZXRlY3REb21haW5Mb2NhbGUoXG4gICAgICAgIHRoaXMuZG9tYWluTG9jYWxlcyxcbiAgICAgICAgdW5kZWZpbmVkLFxuICAgICAgICB0aGlzLmxvY2FsZVxuICAgICAgKVxuXG4gICAgICAvLyB3ZSBuZWVkIHRvIHdyYXAgdGhpcyBpbiB0aGUgZW52IGNoZWNrIGFnYWluIHNpbmNlIHJlZ2VuZXJhdG9yIHJ1bnRpbWVcbiAgICAgIC8vIG1vdmVzIHRoaXMgb24gaXRzIG93biBkdWUgdG8gdGhlIHJldHVyblxuICAgICAgaWYgKHByb2Nlc3MuZW52Ll9fTkVYVF9JMThOX1NVUFBPUlQpIHtcbiAgICAgICAgLy8gaWYgd2UgYXJlIG5hdmlnYXRpbmcgdG8gYSBkb21haW4gbG9jYWxlIGVuc3VyZSB3ZSByZWRpcmVjdCB0byB0aGVcbiAgICAgICAgLy8gY29ycmVjdCBkb21haW5cbiAgICAgICAgaWYgKFxuICAgICAgICAgICFkaWROYXZpZ2F0ZSAmJlxuICAgICAgICAgIGRldGVjdGVkRG9tYWluICYmXG4gICAgICAgICAgdGhpcy5pc0xvY2FsZURvbWFpbiAmJlxuICAgICAgICAgIHNlbGYubG9jYXRpb24uaG9zdG5hbWUgIT09IGRldGVjdGVkRG9tYWluLmRvbWFpblxuICAgICAgICApIHtcbiAgICAgICAgICBjb25zdCBhc05vQmFzZVBhdGggPSBkZWxCYXNlUGF0aChhcylcbiAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGBodHRwJHtkZXRlY3RlZERvbWFpbi5odHRwID8gJycgOiAncyd9Oi8vJHtcbiAgICAgICAgICAgIGRldGVjdGVkRG9tYWluLmRvbWFpblxuICAgICAgICAgIH0ke2FkZEJhc2VQYXRoKFxuICAgICAgICAgICAgYCR7XG4gICAgICAgICAgICAgIHRoaXMubG9jYWxlID09PSBkZXRlY3RlZERvbWFpbi5kZWZhdWx0TG9jYWxlXG4gICAgICAgICAgICAgICAgPyAnJ1xuICAgICAgICAgICAgICAgIDogYC8ke3RoaXMubG9jYWxlfWBcbiAgICAgICAgICAgIH0ke2FzTm9CYXNlUGF0aCA9PT0gJy8nID8gJycgOiBhc05vQmFzZVBhdGh9YCB8fCAnLydcbiAgICAgICAgICApfWBcbiAgICAgICAgICAvLyB0aGlzIHdhcyBwcmV2aW91c2x5IGEgcmV0dXJuIGJ1dCB3YXMgcmVtb3ZlZCBpbiBmYXZvclxuICAgICAgICAgIC8vIG9mIGJldHRlciBkZWFkIGNvZGUgZWxpbWluYXRpb24gd2l0aCByZWdlbmVyYXRvciBydW50aW1lXG4gICAgICAgICAgZGlkTmF2aWdhdGUgPSB0cnVlXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGRpZE5hdmlnYXRlKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgoKSA9PiB7fSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIShvcHRpb25zIGFzIGFueSkuX2gpIHtcbiAgICAgIHRoaXMuaXNTc3IgPSBmYWxzZVxuICAgIH1cbiAgICAvLyBtYXJraW5nIHJvdXRlIGNoYW5nZXMgYXMgYSBuYXZpZ2F0aW9uIHN0YXJ0IGVudHJ5XG4gICAgaWYgKFNUKSB7XG4gICAgICBwZXJmb3JtYW5jZS5tYXJrKCdyb3V0ZUNoYW5nZScpXG4gICAgfVxuXG4gICAgY29uc3QgeyBzaGFsbG93ID0gZmFsc2UgfSA9IG9wdGlvbnNcbiAgICBjb25zdCByb3V0ZVByb3BzID0geyBzaGFsbG93IH1cblxuICAgIGlmICh0aGlzLl9pbkZsaWdodFJvdXRlKSB7XG4gICAgICB0aGlzLmFib3J0Q29tcG9uZW50TG9hZCh0aGlzLl9pbkZsaWdodFJvdXRlLCByb3V0ZVByb3BzKVxuICAgIH1cblxuICAgIGFzID0gYWRkQmFzZVBhdGgoXG4gICAgICBhZGRMb2NhbGUoXG4gICAgICAgIGhhc0Jhc2VQYXRoKGFzKSA/IGRlbEJhc2VQYXRoKGFzKSA6IGFzLFxuICAgICAgICBvcHRpb25zLmxvY2FsZSxcbiAgICAgICAgdGhpcy5kZWZhdWx0TG9jYWxlXG4gICAgICApXG4gICAgKVxuICAgIGNvbnN0IGNsZWFuZWRBcyA9IGRlbExvY2FsZShcbiAgICAgIGhhc0Jhc2VQYXRoKGFzKSA/IGRlbEJhc2VQYXRoKGFzKSA6IGFzLFxuICAgICAgdGhpcy5sb2NhbGVcbiAgICApXG4gICAgdGhpcy5faW5GbGlnaHRSb3V0ZSA9IGFzXG5cbiAgICAvLyBJZiB0aGUgdXJsIGNoYW5nZSBpcyBvbmx5IHJlbGF0ZWQgdG8gYSBoYXNoIGNoYW5nZVxuICAgIC8vIFdlIHNob3VsZCBub3QgcHJvY2VlZC4gV2Ugc2hvdWxkIG9ubHkgY2hhbmdlIHRoZSBzdGF0ZS5cblxuICAgIC8vIFdBUk5JTkc6IGBfaGAgaXMgYW4gaW50ZXJuYWwgb3B0aW9uIGZvciBoYW5kaW5nIE5leHQuanMgY2xpZW50LXNpZGVcbiAgICAvLyBoeWRyYXRpb24uIFlvdXIgYXBwIHNob3VsZCBfbmV2ZXJfIHVzZSB0aGlzIHByb3BlcnR5LiBJdCBtYXkgY2hhbmdlIGF0XG4gICAgLy8gYW55IHRpbWUgd2l0aG91dCBub3RpY2UuXG4gICAgaWYgKCEob3B0aW9ucyBhcyBhbnkpLl9oICYmIHRoaXMub25seUFIYXNoQ2hhbmdlKGNsZWFuZWRBcykpIHtcbiAgICAgIHRoaXMuYXNQYXRoID0gY2xlYW5lZEFzXG4gICAgICBSb3V0ZXIuZXZlbnRzLmVtaXQoJ2hhc2hDaGFuZ2VTdGFydCcsIGFzLCByb3V0ZVByb3BzKVxuICAgICAgLy8gVE9ETzogZG8gd2UgbmVlZCB0aGUgcmVzb2x2ZWQgaHJlZiB3aGVuIG9ubHkgYSBoYXNoIGNoYW5nZT9cbiAgICAgIHRoaXMuY2hhbmdlU3RhdGUobWV0aG9kLCB1cmwsIGFzLCBvcHRpb25zKVxuICAgICAgdGhpcy5zY3JvbGxUb0hhc2goY2xlYW5lZEFzKVxuICAgICAgdGhpcy5ub3RpZnkodGhpcy5jb21wb25lbnRzW3RoaXMucm91dGVdLCBudWxsKVxuICAgICAgUm91dGVyLmV2ZW50cy5lbWl0KCdoYXNoQ2hhbmdlQ29tcGxldGUnLCBhcywgcm91dGVQcm9wcylcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuXG4gICAgbGV0IHBhcnNlZCA9IHBhcnNlUmVsYXRpdmVVcmwodXJsKVxuICAgIGxldCB7IHBhdGhuYW1lLCBxdWVyeSB9ID0gcGFyc2VkXG5cbiAgICAvLyBUaGUgYnVpbGQgbWFuaWZlc3QgbmVlZHMgdG8gYmUgbG9hZGVkIGJlZm9yZSBhdXRvLXN0YXRpYyBkeW5hbWljIHBhZ2VzXG4gICAgLy8gZ2V0IHRoZWlyIHF1ZXJ5IHBhcmFtZXRlcnMgdG8gYWxsb3cgZW5zdXJpbmcgdGhleSBjYW4gYmUgcGFyc2VkIHByb3Blcmx5XG4gICAgLy8gd2hlbiByZXdyaXR0ZW4gdG9cbiAgICBsZXQgcGFnZXM6IGFueSwgcmV3cml0ZXM6IGFueVxuICAgIHRyeSB7XG4gICAgICBwYWdlcyA9IGF3YWl0IHRoaXMucGFnZUxvYWRlci5nZXRQYWdlTGlzdCgpXG4gICAgICA7KHsgX19yZXdyaXRlczogcmV3cml0ZXMgfSA9IGF3YWl0IGdldENsaWVudEJ1aWxkTWFuaWZlc3QoKSlcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIC8vIElmIHdlIGZhaWwgdG8gcmVzb2x2ZSB0aGUgcGFnZSBsaXN0IG9yIGNsaWVudC1idWlsZCBtYW5pZmVzdCwgd2UgbXVzdFxuICAgICAgLy8gZG8gYSBzZXJ2ZXItc2lkZSB0cmFuc2l0aW9uOlxuICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBhc1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgLy8gSWYgYXNrZWQgdG8gY2hhbmdlIHRoZSBjdXJyZW50IFVSTCB3ZSBzaG91bGQgcmVsb2FkIHRoZSBjdXJyZW50IHBhZ2VcbiAgICAvLyAobm90IGxvY2F0aW9uLnJlbG9hZCgpIGJ1dCByZWxvYWQgZ2V0SW5pdGlhbFByb3BzIGFuZCBvdGhlciBOZXh0LmpzIHN0dWZmcylcbiAgICAvLyBXZSBhbHNvIG5lZWQgdG8gc2V0IHRoZSBtZXRob2QgPSByZXBsYWNlU3RhdGUgYWx3YXlzXG4gICAgLy8gYXMgdGhpcyBzaG91bGQgbm90IGdvIGludG8gdGhlIGhpc3RvcnkgKFRoYXQncyBob3cgYnJvd3NlcnMgd29yaylcbiAgICAvLyBXZSBzaG91bGQgY29tcGFyZSB0aGUgbmV3IGFzUGF0aCB0byB0aGUgY3VycmVudCBhc1BhdGgsIG5vdCB0aGUgdXJsXG4gICAgaWYgKCF0aGlzLnVybElzTmV3KGNsZWFuZWRBcykgJiYgIWxvY2FsZUNoYW5nZSkge1xuICAgICAgbWV0aG9kID0gJ3JlcGxhY2VTdGF0ZSdcbiAgICB9XG5cbiAgICAvLyB3ZSBuZWVkIHRvIHJlc29sdmUgdGhlIGFzIHZhbHVlIHVzaW5nIHJld3JpdGVzIGZvciBkeW5hbWljIFNTR1xuICAgIC8vIHBhZ2VzIHRvIGFsbG93IGJ1aWxkaW5nIHRoZSBkYXRhIFVSTCBjb3JyZWN0bHlcbiAgICBsZXQgcmVzb2x2ZWRBcyA9IGFzXG5cbiAgICAvLyB1cmwgYW5kIGFzIHNob3VsZCBhbHdheXMgYmUgcHJlZml4ZWQgd2l0aCBiYXNlUGF0aCBieSB0aGlzXG4gICAgLy8gcG9pbnQgYnkgZWl0aGVyIG5leHQvbGluayBvciByb3V0ZXIucHVzaC9yZXBsYWNlIHNvIHN0cmlwIHRoZVxuICAgIC8vIGJhc2VQYXRoIGZyb20gdGhlIHBhdGhuYW1lIHRvIG1hdGNoIHRoZSBwYWdlcyBkaXIgMS10by0xXG4gICAgcGF0aG5hbWUgPSBwYXRobmFtZVxuICAgICAgPyByZW1vdmVQYXRoVHJhaWxpbmdTbGFzaChkZWxCYXNlUGF0aChwYXRobmFtZSkpXG4gICAgICA6IHBhdGhuYW1lXG5cbiAgICBpZiAoc2hvdWxkUmVzb2x2ZUhyZWYgJiYgcGF0aG5hbWUgIT09ICcvX2Vycm9yJykge1xuICAgICAgaWYgKHByb2Nlc3MuZW52Ll9fTkVYVF9IQVNfUkVXUklURVMgJiYgYXMuc3RhcnRzV2l0aCgnLycpKSB7XG4gICAgICAgIGNvbnN0IHJld3JpdGVzUmVzdWx0ID0gcmVzb2x2ZVJld3JpdGVzKFxuICAgICAgICAgIGFkZEJhc2VQYXRoKGFkZExvY2FsZShjbGVhbmVkQXMsIHRoaXMubG9jYWxlKSksXG4gICAgICAgICAgcGFnZXMsXG4gICAgICAgICAgcmV3cml0ZXMsXG4gICAgICAgICAgcXVlcnksXG4gICAgICAgICAgKHA6IHN0cmluZykgPT4gcmVzb2x2ZUR5bmFtaWNSb3V0ZShwLCBwYWdlcyksXG4gICAgICAgICAgdGhpcy5sb2NhbGVzXG4gICAgICAgIClcbiAgICAgICAgcmVzb2x2ZWRBcyA9IHJld3JpdGVzUmVzdWx0LmFzUGF0aFxuXG4gICAgICAgIGlmIChyZXdyaXRlc1Jlc3VsdC5tYXRjaGVkUGFnZSAmJiByZXdyaXRlc1Jlc3VsdC5yZXNvbHZlZEhyZWYpIHtcbiAgICAgICAgICAvLyBpZiB0aGlzIGRpcmVjdGx5IG1hdGNoZXMgYSBwYWdlIHdlIG5lZWQgdG8gdXBkYXRlIHRoZSBocmVmIHRvXG4gICAgICAgICAgLy8gYWxsb3cgdGhlIGNvcnJlY3QgcGFnZSBjaHVuayB0byBiZSBsb2FkZWRcbiAgICAgICAgICBwYXRobmFtZSA9IHJld3JpdGVzUmVzdWx0LnJlc29sdmVkSHJlZlxuICAgICAgICAgIHBhcnNlZC5wYXRobmFtZSA9IHBhdGhuYW1lXG4gICAgICAgICAgdXJsID0gZm9ybWF0V2l0aFZhbGlkYXRpb24ocGFyc2VkKVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJzZWQucGF0aG5hbWUgPSByZXNvbHZlRHluYW1pY1JvdXRlKHBhdGhuYW1lLCBwYWdlcylcblxuICAgICAgICBpZiAocGFyc2VkLnBhdGhuYW1lICE9PSBwYXRobmFtZSkge1xuICAgICAgICAgIHBhdGhuYW1lID0gcGFyc2VkLnBhdGhuYW1lXG4gICAgICAgICAgdXJsID0gZm9ybWF0V2l0aFZhbGlkYXRpb24ocGFyc2VkKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3Qgcm91dGUgPSByZW1vdmVQYXRoVHJhaWxpbmdTbGFzaChwYXRobmFtZSlcblxuICAgIGlmICghaXNMb2NhbFVSTChhcykpIHtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICBgSW52YWxpZCBocmVmOiBcIiR7dXJsfVwiIGFuZCBhczogXCIke2FzfVwiLCByZWNlaXZlZCByZWxhdGl2ZSBocmVmIGFuZCBleHRlcm5hbCBhc2AgK1xuICAgICAgICAgICAgYFxcblNlZSBtb3JlIGluZm86IGh0dHBzOi8vbmV4dGpzLm9yZy9kb2NzL21lc3NhZ2VzL2ludmFsaWQtcmVsYXRpdmUtdXJsLWV4dGVybmFsLWFzYFxuICAgICAgICApXG4gICAgICB9XG5cbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYXNcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIHJlc29sdmVkQXMgPSBkZWxMb2NhbGUoZGVsQmFzZVBhdGgocmVzb2x2ZWRBcyksIHRoaXMubG9jYWxlKVxuXG4gICAgaWYgKGlzRHluYW1pY1JvdXRlKHJvdXRlKSkge1xuICAgICAgY29uc3QgcGFyc2VkQXMgPSBwYXJzZVJlbGF0aXZlVXJsKHJlc29sdmVkQXMpXG4gICAgICBjb25zdCBhc1BhdGhuYW1lID0gcGFyc2VkQXMucGF0aG5hbWVcblxuICAgICAgY29uc3Qgcm91dGVSZWdleCA9IGdldFJvdXRlUmVnZXgocm91dGUpXG4gICAgICBjb25zdCByb3V0ZU1hdGNoID0gZ2V0Um91dGVNYXRjaGVyKHJvdXRlUmVnZXgpKGFzUGF0aG5hbWUpXG4gICAgICBjb25zdCBzaG91bGRJbnRlcnBvbGF0ZSA9IHJvdXRlID09PSBhc1BhdGhuYW1lXG4gICAgICBjb25zdCBpbnRlcnBvbGF0ZWRBcyA9IHNob3VsZEludGVycG9sYXRlXG4gICAgICAgID8gaW50ZXJwb2xhdGVBcyhyb3V0ZSwgYXNQYXRobmFtZSwgcXVlcnkpXG4gICAgICAgIDogKHt9IGFzIHsgcmVzdWx0OiB1bmRlZmluZWQ7IHBhcmFtczogdW5kZWZpbmVkIH0pXG5cbiAgICAgIGlmICghcm91dGVNYXRjaCB8fCAoc2hvdWxkSW50ZXJwb2xhdGUgJiYgIWludGVycG9sYXRlZEFzLnJlc3VsdCkpIHtcbiAgICAgICAgY29uc3QgbWlzc2luZ1BhcmFtcyA9IE9iamVjdC5rZXlzKHJvdXRlUmVnZXguZ3JvdXBzKS5maWx0ZXIoXG4gICAgICAgICAgKHBhcmFtKSA9PiAhcXVlcnlbcGFyYW1dXG4gICAgICAgIClcblxuICAgICAgICBpZiAobWlzc2luZ1BhcmFtcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICAgICAgYCR7XG4gICAgICAgICAgICAgICAgc2hvdWxkSW50ZXJwb2xhdGVcbiAgICAgICAgICAgICAgICAgID8gYEludGVycG9sYXRpbmcgaHJlZmBcbiAgICAgICAgICAgICAgICAgIDogYE1pc21hdGNoaW5nIFxcYGFzXFxgIGFuZCBcXGBocmVmXFxgYFxuICAgICAgICAgICAgICB9IGZhaWxlZCB0byBtYW51YWxseSBwcm92aWRlIGAgK1xuICAgICAgICAgICAgICAgIGB0aGUgcGFyYW1zOiAke21pc3NpbmdQYXJhbXMuam9pbihcbiAgICAgICAgICAgICAgICAgICcsICdcbiAgICAgICAgICAgICAgICApfSBpbiB0aGUgXFxgaHJlZlxcYCdzIFxcYHF1ZXJ5XFxgYFxuICAgICAgICAgICAgKVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgIChzaG91bGRJbnRlcnBvbGF0ZVxuICAgICAgICAgICAgICA/IGBUaGUgcHJvdmlkZWQgXFxgaHJlZlxcYCAoJHt1cmx9KSB2YWx1ZSBpcyBtaXNzaW5nIHF1ZXJ5IHZhbHVlcyAoJHttaXNzaW5nUGFyYW1zLmpvaW4oXG4gICAgICAgICAgICAgICAgICAnLCAnXG4gICAgICAgICAgICAgICAgKX0pIHRvIGJlIGludGVycG9sYXRlZCBwcm9wZXJseS4gYFxuICAgICAgICAgICAgICA6IGBUaGUgcHJvdmlkZWQgXFxgYXNcXGAgdmFsdWUgKCR7YXNQYXRobmFtZX0pIGlzIGluY29tcGF0aWJsZSB3aXRoIHRoZSBcXGBocmVmXFxgIHZhbHVlICgke3JvdXRlfSkuIGApICtcbiAgICAgICAgICAgICAgYFJlYWQgbW9yZTogaHR0cHM6Ly9uZXh0anMub3JnL2RvY3MvbWVzc2FnZXMvJHtcbiAgICAgICAgICAgICAgICBzaG91bGRJbnRlcnBvbGF0ZVxuICAgICAgICAgICAgICAgICAgPyAnaHJlZi1pbnRlcnBvbGF0aW9uLWZhaWxlZCdcbiAgICAgICAgICAgICAgICAgIDogJ2luY29tcGF0aWJsZS1ocmVmLWFzJ1xuICAgICAgICAgICAgICB9YFxuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChzaG91bGRJbnRlcnBvbGF0ZSkge1xuICAgICAgICBhcyA9IGZvcm1hdFdpdGhWYWxpZGF0aW9uKFxuICAgICAgICAgIE9iamVjdC5hc3NpZ24oe30sIHBhcnNlZEFzLCB7XG4gICAgICAgICAgICBwYXRobmFtZTogaW50ZXJwb2xhdGVkQXMucmVzdWx0LFxuICAgICAgICAgICAgcXVlcnk6IG9taXRQYXJtc0Zyb21RdWVyeShxdWVyeSwgaW50ZXJwb2xhdGVkQXMucGFyYW1zISksXG4gICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gTWVyZ2UgcGFyYW1zIGludG8gYHF1ZXJ5YCwgb3ZlcndyaXRpbmcgYW55IHNwZWNpZmllZCBpbiBzZWFyY2hcbiAgICAgICAgT2JqZWN0LmFzc2lnbihxdWVyeSwgcm91dGVNYXRjaClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBSb3V0ZXIuZXZlbnRzLmVtaXQoJ3JvdXRlQ2hhbmdlU3RhcnQnLCBhcywgcm91dGVQcm9wcylcblxuICAgIHRyeSB7XG4gICAgICBsZXQgcm91dGVJbmZvID0gYXdhaXQgdGhpcy5nZXRSb3V0ZUluZm8oXG4gICAgICAgIHJvdXRlLFxuICAgICAgICBwYXRobmFtZSxcbiAgICAgICAgcXVlcnksXG4gICAgICAgIGFzLFxuICAgICAgICByZXNvbHZlZEFzLFxuICAgICAgICByb3V0ZVByb3BzXG4gICAgICApXG4gICAgICBsZXQgeyBlcnJvciwgcHJvcHMsIF9fTl9TU0csIF9fTl9TU1AgfSA9IHJvdXRlSW5mb1xuXG4gICAgICAvLyBoYW5kbGUgcmVkaXJlY3Qgb24gY2xpZW50LXRyYW5zaXRpb25cbiAgICAgIGlmICgoX19OX1NTRyB8fCBfX05fU1NQKSAmJiBwcm9wcykge1xuICAgICAgICBpZiAoKHByb3BzIGFzIGFueSkucGFnZVByb3BzICYmIChwcm9wcyBhcyBhbnkpLnBhZ2VQcm9wcy5fX05fUkVESVJFQ1QpIHtcbiAgICAgICAgICBjb25zdCBkZXN0aW5hdGlvbiA9IChwcm9wcyBhcyBhbnkpLnBhZ2VQcm9wcy5fX05fUkVESVJFQ1RcblxuICAgICAgICAgIC8vIGNoZWNrIGlmIGRlc3RpbmF0aW9uIGlzIGludGVybmFsIChyZXNvbHZlcyB0byBhIHBhZ2UpIGFuZCBhdHRlbXB0XG4gICAgICAgICAgLy8gY2xpZW50LW5hdmlnYXRpb24gaWYgaXQgaXMgZmFsbGluZyBiYWNrIHRvIGhhcmQgbmF2aWdhdGlvbiBpZlxuICAgICAgICAgIC8vIGl0J3Mgbm90XG4gICAgICAgICAgaWYgKGRlc3RpbmF0aW9uLnN0YXJ0c1dpdGgoJy8nKSkge1xuICAgICAgICAgICAgY29uc3QgcGFyc2VkSHJlZiA9IHBhcnNlUmVsYXRpdmVVcmwoZGVzdGluYXRpb24pXG4gICAgICAgICAgICBwYXJzZWRIcmVmLnBhdGhuYW1lID0gcmVzb2x2ZUR5bmFtaWNSb3V0ZShcbiAgICAgICAgICAgICAgcGFyc2VkSHJlZi5wYXRobmFtZSxcbiAgICAgICAgICAgICAgcGFnZXNcbiAgICAgICAgICAgIClcblxuICAgICAgICAgICAgaWYgKHBhZ2VzLmluY2x1ZGVzKHBhcnNlZEhyZWYucGF0aG5hbWUpKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHsgdXJsOiBuZXdVcmwsIGFzOiBuZXdBcyB9ID0gcHJlcGFyZVVybEFzKFxuICAgICAgICAgICAgICAgIHRoaXMsXG4gICAgICAgICAgICAgICAgZGVzdGluYXRpb24sXG4gICAgICAgICAgICAgICAgZGVzdGluYXRpb25cbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jaGFuZ2UobWV0aG9kLCBuZXdVcmwsIG5ld0FzLCBvcHRpb25zKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gZGVzdGluYXRpb25cbiAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKCkgPT4ge30pXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmlzUHJldmlldyA9ICEhcHJvcHMuX19OX1BSRVZJRVdcblxuICAgICAgICAvLyBoYW5kbGUgU1NHIGRhdGEgNDA0XG4gICAgICAgIGlmIChwcm9wcy5ub3RGb3VuZCA9PT0gU1NHX0RBVEFfTk9UX0ZPVU5EKSB7XG4gICAgICAgICAgbGV0IG5vdEZvdW5kUm91dGVcblxuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmZldGNoQ29tcG9uZW50KCcvNDA0JylcbiAgICAgICAgICAgIG5vdEZvdW5kUm91dGUgPSAnLzQwNCdcbiAgICAgICAgICB9IGNhdGNoIChfKSB7XG4gICAgICAgICAgICBub3RGb3VuZFJvdXRlID0gJy9fZXJyb3InXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcm91dGVJbmZvID0gYXdhaXQgdGhpcy5nZXRSb3V0ZUluZm8oXG4gICAgICAgICAgICBub3RGb3VuZFJvdXRlLFxuICAgICAgICAgICAgbm90Rm91bmRSb3V0ZSxcbiAgICAgICAgICAgIHF1ZXJ5LFxuICAgICAgICAgICAgYXMsXG4gICAgICAgICAgICByZXNvbHZlZEFzLFxuICAgICAgICAgICAgeyBzaGFsbG93OiBmYWxzZSB9XG4gICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIFJvdXRlci5ldmVudHMuZW1pdCgnYmVmb3JlSGlzdG9yeUNoYW5nZScsIGFzLCByb3V0ZVByb3BzKVxuICAgICAgdGhpcy5jaGFuZ2VTdGF0ZShtZXRob2QsIHVybCwgYXMsIG9wdGlvbnMpXG5cbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIGNvbnN0IGFwcENvbXA6IGFueSA9IHRoaXMuY29tcG9uZW50c1snL19hcHAnXS5Db21wb25lbnRcbiAgICAgICAgOyh3aW5kb3cgYXMgYW55KS5uZXh0LmlzUHJlcmVuZGVyZWQgPVxuICAgICAgICAgIGFwcENvbXAuZ2V0SW5pdGlhbFByb3BzID09PSBhcHBDb21wLm9yaWdHZXRJbml0aWFsUHJvcHMgJiZcbiAgICAgICAgICAhKHJvdXRlSW5mby5Db21wb25lbnQgYXMgYW55KS5nZXRJbml0aWFsUHJvcHNcbiAgICAgIH1cblxuICAgICAgLy8gc2hhbGxvdyByb3V0aW5nIGlzIG9ubHkgYWxsb3dlZCBmb3Igc2FtZSBwYWdlIFVSTCBjaGFuZ2VzLlxuICAgICAgY29uc3QgaXNWYWxpZFNoYWxsb3dSb3V0ZSA9IG9wdGlvbnMuc2hhbGxvdyAmJiB0aGlzLnJvdXRlID09PSByb3V0ZVxuXG4gICAgICBpZiAoXG4gICAgICAgIChvcHRpb25zIGFzIGFueSkuX2ggJiZcbiAgICAgICAgcGF0aG5hbWUgPT09ICcvX2Vycm9yJyAmJlxuICAgICAgICBzZWxmLl9fTkVYVF9EQVRBX18ucHJvcHM/LnBhZ2VQcm9wcz8uc3RhdHVzQ29kZSA9PT0gNTAwICYmXG4gICAgICAgIHByb3BzPy5wYWdlUHJvcHNcbiAgICAgICkge1xuICAgICAgICAvLyBlbnN1cmUgc3RhdHVzQ29kZSBpcyBzdGlsbCBjb3JyZWN0IGZvciBzdGF0aWMgNTAwIHBhZ2VcbiAgICAgICAgLy8gd2hlbiB1cGRhdGluZyBxdWVyeSBpbmZvcm1hdGlvblxuICAgICAgICBwcm9wcy5wYWdlUHJvcHMuc3RhdHVzQ29kZSA9IDUwMFxuICAgICAgfVxuXG4gICAgICBhd2FpdCB0aGlzLnNldChcbiAgICAgICAgcm91dGUsXG4gICAgICAgIHBhdGhuYW1lISxcbiAgICAgICAgcXVlcnksXG4gICAgICAgIGNsZWFuZWRBcyxcbiAgICAgICAgcm91dGVJbmZvLFxuICAgICAgICBmb3JjZWRTY3JvbGwgfHxcbiAgICAgICAgICAoaXNWYWxpZFNoYWxsb3dSb3V0ZSB8fCAhb3B0aW9ucy5zY3JvbGwgPyBudWxsIDogeyB4OiAwLCB5OiAwIH0pXG4gICAgICApLmNhdGNoKChlKSA9PiB7XG4gICAgICAgIGlmIChlLmNhbmNlbGxlZCkgZXJyb3IgPSBlcnJvciB8fCBlXG4gICAgICAgIGVsc2UgdGhyb3cgZVxuICAgICAgfSlcblxuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIFJvdXRlci5ldmVudHMuZW1pdCgncm91dGVDaGFuZ2VFcnJvcicsIGVycm9yLCBjbGVhbmVkQXMsIHJvdXRlUHJvcHMpXG4gICAgICAgIHRocm93IGVycm9yXG4gICAgICB9XG5cbiAgICAgIGlmIChwcm9jZXNzLmVudi5fX05FWFRfSTE4Tl9TVVBQT1JUKSB7XG4gICAgICAgIGlmICh0aGlzLmxvY2FsZSkge1xuICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5sYW5nID0gdGhpcy5sb2NhbGVcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgUm91dGVyLmV2ZW50cy5lbWl0KCdyb3V0ZUNoYW5nZUNvbXBsZXRlJywgYXMsIHJvdXRlUHJvcHMpXG5cbiAgICAgIHJldHVybiB0cnVlXG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBpZiAoZXJyLmNhbmNlbGxlZCkge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICAgIHRocm93IGVyclxuICAgIH1cbiAgfVxuXG4gIGNoYW5nZVN0YXRlKFxuICAgIG1ldGhvZDogSGlzdG9yeU1ldGhvZCxcbiAgICB1cmw6IHN0cmluZyxcbiAgICBhczogc3RyaW5nLFxuICAgIG9wdGlvbnM6IFRyYW5zaXRpb25PcHRpb25zID0ge31cbiAgKTogdm9pZCB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIGlmICh0eXBlb2Ygd2luZG93Lmhpc3RvcnkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYFdhcm5pbmc6IHdpbmRvdy5oaXN0b3J5IGlzIG5vdCBhdmFpbGFibGUuYClcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2Ygd2luZG93Lmhpc3RvcnlbbWV0aG9kXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihgV2FybmluZzogd2luZG93Lmhpc3RvcnkuJHttZXRob2R9IGlzIG5vdCBhdmFpbGFibGVgKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAobWV0aG9kICE9PSAncHVzaFN0YXRlJyB8fCBnZXRVUkwoKSAhPT0gYXMpIHtcbiAgICAgIHRoaXMuX3NoYWxsb3cgPSBvcHRpb25zLnNoYWxsb3dcbiAgICAgIHdpbmRvdy5oaXN0b3J5W21ldGhvZF0oXG4gICAgICAgIHtcbiAgICAgICAgICB1cmwsXG4gICAgICAgICAgYXMsXG4gICAgICAgICAgb3B0aW9ucyxcbiAgICAgICAgICBfX046IHRydWUsXG4gICAgICAgICAgaWR4OiB0aGlzLl9pZHggPSBtZXRob2QgIT09ICdwdXNoU3RhdGUnID8gdGhpcy5faWR4IDogdGhpcy5faWR4ICsgMSxcbiAgICAgICAgfSBhcyBIaXN0b3J5U3RhdGUsXG4gICAgICAgIC8vIE1vc3QgYnJvd3NlcnMgY3VycmVudGx5IGlnbm9yZXMgdGhpcyBwYXJhbWV0ZXIsIGFsdGhvdWdoIHRoZXkgbWF5IHVzZSBpdCBpbiB0aGUgZnV0dXJlLlxuICAgICAgICAvLyBQYXNzaW5nIHRoZSBlbXB0eSBzdHJpbmcgaGVyZSBzaG91bGQgYmUgc2FmZSBhZ2FpbnN0IGZ1dHVyZSBjaGFuZ2VzIHRvIHRoZSBtZXRob2QuXG4gICAgICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9IaXN0b3J5L3JlcGxhY2VTdGF0ZVxuICAgICAgICAnJyxcbiAgICAgICAgYXNcbiAgICAgIClcbiAgICB9XG4gIH1cblxuICBhc3luYyBoYW5kbGVSb3V0ZUluZm9FcnJvcihcbiAgICBlcnI6IEVycm9yICYgeyBjb2RlOiBhbnk7IGNhbmNlbGxlZDogYm9vbGVhbiB9LFxuICAgIHBhdGhuYW1lOiBzdHJpbmcsXG4gICAgcXVlcnk6IFBhcnNlZFVybFF1ZXJ5LFxuICAgIGFzOiBzdHJpbmcsXG4gICAgcm91dGVQcm9wczogUm91dGVQcm9wZXJ0aWVzLFxuICAgIGxvYWRFcnJvckZhaWw/OiBib29sZWFuXG4gICk6IFByb21pc2U8Q29tcGxldGVQcml2YXRlUm91dGVJbmZvPiB7XG4gICAgaWYgKGVyci5jYW5jZWxsZWQpIHtcbiAgICAgIC8vIGJ1YmJsZSB1cCBjYW5jZWxsYXRpb24gZXJyb3JzXG4gICAgICB0aHJvdyBlcnJcbiAgICB9XG5cbiAgICBpZiAoaXNBc3NldEVycm9yKGVycikgfHwgbG9hZEVycm9yRmFpbCkge1xuICAgICAgUm91dGVyLmV2ZW50cy5lbWl0KCdyb3V0ZUNoYW5nZUVycm9yJywgZXJyLCBhcywgcm91dGVQcm9wcylcblxuICAgICAgLy8gSWYgd2UgY2FuJ3QgbG9hZCB0aGUgcGFnZSBpdCBjb3VsZCBiZSBvbmUgb2YgZm9sbG93aW5nIHJlYXNvbnNcbiAgICAgIC8vICAxLiBQYWdlIGRvZXNuJ3QgZXhpc3RzXG4gICAgICAvLyAgMi4gUGFnZSBkb2VzIGV4aXN0IGluIGEgZGlmZmVyZW50IHpvbmVcbiAgICAgIC8vICAzLiBJbnRlcm5hbCBlcnJvciB3aGlsZSBsb2FkaW5nIHRoZSBwYWdlXG5cbiAgICAgIC8vIFNvLCBkb2luZyBhIGhhcmQgcmVsb2FkIGlzIHRoZSBwcm9wZXIgd2F5IHRvIGRlYWwgd2l0aCB0aGlzLlxuICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBhc1xuXG4gICAgICAvLyBDaGFuZ2luZyB0aGUgVVJMIGRvZXNuJ3QgYmxvY2sgZXhlY3V0aW5nIHRoZSBjdXJyZW50IGNvZGUgcGF0aC5cbiAgICAgIC8vIFNvIGxldCdzIHRocm93IGEgY2FuY2VsbGF0aW9uIGVycm9yIHN0b3AgdGhlIHJvdXRpbmcgbG9naWMuXG4gICAgICB0aHJvdyBidWlsZENhbmNlbGxhdGlvbkVycm9yKClcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgbGV0IENvbXBvbmVudDogQ29tcG9uZW50VHlwZVxuICAgICAgbGV0IHN0eWxlU2hlZXRzOiBTdHlsZVNoZWV0VHVwbGVbXVxuICAgICAgbGV0IHByb3BzOiBSZWNvcmQ8c3RyaW5nLCBhbnk+IHwgdW5kZWZpbmVkXG5cbiAgICAgIGlmIChcbiAgICAgICAgdHlwZW9mIENvbXBvbmVudCEgPT09ICd1bmRlZmluZWQnIHx8XG4gICAgICAgIHR5cGVvZiBzdHlsZVNoZWV0cyEgPT09ICd1bmRlZmluZWQnXG4gICAgICApIHtcbiAgICAgICAgOyh7IHBhZ2U6IENvbXBvbmVudCwgc3R5bGVTaGVldHMgfSA9IGF3YWl0IHRoaXMuZmV0Y2hDb21wb25lbnQoXG4gICAgICAgICAgJy9fZXJyb3InXG4gICAgICAgICkpXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJvdXRlSW5mbzogQ29tcGxldGVQcml2YXRlUm91dGVJbmZvID0ge1xuICAgICAgICBwcm9wcyxcbiAgICAgICAgQ29tcG9uZW50LFxuICAgICAgICBzdHlsZVNoZWV0cyxcbiAgICAgICAgZXJyLFxuICAgICAgICBlcnJvcjogZXJyLFxuICAgICAgfVxuXG4gICAgICBpZiAoIXJvdXRlSW5mby5wcm9wcykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHJvdXRlSW5mby5wcm9wcyA9IGF3YWl0IHRoaXMuZ2V0SW5pdGlhbFByb3BzKENvbXBvbmVudCwge1xuICAgICAgICAgICAgZXJyLFxuICAgICAgICAgICAgcGF0aG5hbWUsXG4gICAgICAgICAgICBxdWVyeSxcbiAgICAgICAgICB9IGFzIGFueSlcbiAgICAgICAgfSBjYXRjaCAoZ2lwRXJyKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgaW4gZXJyb3IgcGFnZSBgZ2V0SW5pdGlhbFByb3BzYDogJywgZ2lwRXJyKVxuICAgICAgICAgIHJvdXRlSW5mby5wcm9wcyA9IHt9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJvdXRlSW5mb1xuICAgIH0gY2F0Y2ggKHJvdXRlSW5mb0Vycikge1xuICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlUm91dGVJbmZvRXJyb3IoXG4gICAgICAgIHJvdXRlSW5mb0VycixcbiAgICAgICAgcGF0aG5hbWUsXG4gICAgICAgIHF1ZXJ5LFxuICAgICAgICBhcyxcbiAgICAgICAgcm91dGVQcm9wcyxcbiAgICAgICAgdHJ1ZVxuICAgICAgKVxuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGdldFJvdXRlSW5mbyhcbiAgICByb3V0ZTogc3RyaW5nLFxuICAgIHBhdGhuYW1lOiBzdHJpbmcsXG4gICAgcXVlcnk6IGFueSxcbiAgICBhczogc3RyaW5nLFxuICAgIHJlc29sdmVkQXM6IHN0cmluZyxcbiAgICByb3V0ZVByb3BzOiBSb3V0ZVByb3BlcnRpZXNcbiAgKTogUHJvbWlzZTxQcml2YXRlUm91dGVJbmZvPiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGV4aXN0aW5nUm91dGVJbmZvOiBQcml2YXRlUm91dGVJbmZvIHwgdW5kZWZpbmVkID0gdGhpcy5jb21wb25lbnRzW1xuICAgICAgICByb3V0ZVxuICAgICAgXVxuICAgICAgaWYgKHJvdXRlUHJvcHMuc2hhbGxvdyAmJiBleGlzdGluZ1JvdXRlSW5mbyAmJiB0aGlzLnJvdXRlID09PSByb3V0ZSkge1xuICAgICAgICByZXR1cm4gZXhpc3RpbmdSb3V0ZUluZm9cbiAgICAgIH1cblxuICAgICAgY29uc3QgY2FjaGVkUm91dGVJbmZvOiBDb21wbGV0ZVByaXZhdGVSb3V0ZUluZm8gfCB1bmRlZmluZWQgPVxuICAgICAgICBleGlzdGluZ1JvdXRlSW5mbyAmJiAnaW5pdGlhbCcgaW4gZXhpc3RpbmdSb3V0ZUluZm9cbiAgICAgICAgICA/IHVuZGVmaW5lZFxuICAgICAgICAgIDogZXhpc3RpbmdSb3V0ZUluZm9cbiAgICAgIGNvbnN0IHJvdXRlSW5mbzogQ29tcGxldGVQcml2YXRlUm91dGVJbmZvID0gY2FjaGVkUm91dGVJbmZvXG4gICAgICAgID8gY2FjaGVkUm91dGVJbmZvXG4gICAgICAgIDogYXdhaXQgdGhpcy5mZXRjaENvbXBvbmVudChyb3V0ZSkudGhlbigocmVzKSA9PiAoe1xuICAgICAgICAgICAgQ29tcG9uZW50OiByZXMucGFnZSxcbiAgICAgICAgICAgIHN0eWxlU2hlZXRzOiByZXMuc3R5bGVTaGVldHMsXG4gICAgICAgICAgICBfX05fU1NHOiByZXMubW9kLl9fTl9TU0csXG4gICAgICAgICAgICBfX05fU1NQOiByZXMubW9kLl9fTl9TU1AsXG4gICAgICAgICAgfSkpXG5cbiAgICAgIGNvbnN0IHsgQ29tcG9uZW50LCBfX05fU1NHLCBfX05fU1NQIH0gPSByb3V0ZUluZm9cblxuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgY29uc3QgeyBpc1ZhbGlkRWxlbWVudFR5cGUgfSA9IHJlcXVpcmUoJ3JlYWN0LWlzJylcbiAgICAgICAgaWYgKCFpc1ZhbGlkRWxlbWVudFR5cGUoQ29tcG9uZW50KSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgIGBUaGUgZGVmYXVsdCBleHBvcnQgaXMgbm90IGEgUmVhY3QgQ29tcG9uZW50IGluIHBhZ2U6IFwiJHtwYXRobmFtZX1cImBcbiAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGV0IGRhdGFIcmVmOiBzdHJpbmcgfCB1bmRlZmluZWRcblxuICAgICAgaWYgKF9fTl9TU0cgfHwgX19OX1NTUCkge1xuICAgICAgICBkYXRhSHJlZiA9IHRoaXMucGFnZUxvYWRlci5nZXREYXRhSHJlZihcbiAgICAgICAgICBmb3JtYXRXaXRoVmFsaWRhdGlvbih7IHBhdGhuYW1lLCBxdWVyeSB9KSxcbiAgICAgICAgICByZXNvbHZlZEFzLFxuICAgICAgICAgIF9fTl9TU0csXG4gICAgICAgICAgdGhpcy5sb2NhbGVcbiAgICAgICAgKVxuICAgICAgfVxuXG4gICAgICBjb25zdCBwcm9wcyA9IGF3YWl0IHRoaXMuX2dldERhdGE8Q29tcGxldGVQcml2YXRlUm91dGVJbmZvPigoKSA9PlxuICAgICAgICBfX05fU1NHXG4gICAgICAgICAgPyB0aGlzLl9nZXRTdGF0aWNEYXRhKGRhdGFIcmVmISlcbiAgICAgICAgICA6IF9fTl9TU1BcbiAgICAgICAgICA/IHRoaXMuX2dldFNlcnZlckRhdGEoZGF0YUhyZWYhKVxuICAgICAgICAgIDogdGhpcy5nZXRJbml0aWFsUHJvcHMoXG4gICAgICAgICAgICAgIENvbXBvbmVudCxcbiAgICAgICAgICAgICAgLy8gd2UgcHJvdmlkZSBBcHBUcmVlIGxhdGVyIHNvIHRoaXMgbmVlZHMgdG8gYmUgYGFueWBcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHBhdGhuYW1lLFxuICAgICAgICAgICAgICAgIHF1ZXJ5LFxuICAgICAgICAgICAgICAgIGFzUGF0aDogYXMsXG4gICAgICAgICAgICAgICAgbG9jYWxlOiB0aGlzLmxvY2FsZSxcbiAgICAgICAgICAgICAgICBsb2NhbGVzOiB0aGlzLmxvY2FsZXMsXG4gICAgICAgICAgICAgICAgZGVmYXVsdExvY2FsZTogdGhpcy5kZWZhdWx0TG9jYWxlLFxuICAgICAgICAgICAgICB9IGFzIGFueVxuICAgICAgICAgICAgKVxuICAgICAgKVxuXG4gICAgICByb3V0ZUluZm8ucHJvcHMgPSBwcm9wc1xuICAgICAgdGhpcy5jb21wb25lbnRzW3JvdXRlXSA9IHJvdXRlSW5mb1xuICAgICAgcmV0dXJuIHJvdXRlSW5mb1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlUm91dGVJbmZvRXJyb3IoZXJyLCBwYXRobmFtZSwgcXVlcnksIGFzLCByb3V0ZVByb3BzKVxuICAgIH1cbiAgfVxuXG4gIHNldChcbiAgICByb3V0ZTogc3RyaW5nLFxuICAgIHBhdGhuYW1lOiBzdHJpbmcsXG4gICAgcXVlcnk6IFBhcnNlZFVybFF1ZXJ5LFxuICAgIGFzOiBzdHJpbmcsXG4gICAgZGF0YTogUHJpdmF0ZVJvdXRlSW5mbyxcbiAgICByZXNldFNjcm9sbDogeyB4OiBudW1iZXI7IHk6IG51bWJlciB9IHwgbnVsbFxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0aGlzLmlzRmFsbGJhY2sgPSBmYWxzZVxuXG4gICAgdGhpcy5yb3V0ZSA9IHJvdXRlXG4gICAgdGhpcy5wYXRobmFtZSA9IHBhdGhuYW1lXG4gICAgdGhpcy5xdWVyeSA9IHF1ZXJ5XG4gICAgdGhpcy5hc1BhdGggPSBhc1xuICAgIHJldHVybiB0aGlzLm5vdGlmeShkYXRhLCByZXNldFNjcm9sbClcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsYmFjayB0byBleGVjdXRlIGJlZm9yZSByZXBsYWNpbmcgcm91dGVyIHN0YXRlXG4gICAqIEBwYXJhbSBjYiBjYWxsYmFjayB0byBiZSBleGVjdXRlZFxuICAgKi9cbiAgYmVmb3JlUG9wU3RhdGUoY2I6IEJlZm9yZVBvcFN0YXRlQ2FsbGJhY2spIHtcbiAgICB0aGlzLl9icHMgPSBjYlxuICB9XG5cbiAgb25seUFIYXNoQ2hhbmdlKGFzOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBpZiAoIXRoaXMuYXNQYXRoKSByZXR1cm4gZmFsc2VcbiAgICBjb25zdCBbb2xkVXJsTm9IYXNoLCBvbGRIYXNoXSA9IHRoaXMuYXNQYXRoLnNwbGl0KCcjJylcbiAgICBjb25zdCBbbmV3VXJsTm9IYXNoLCBuZXdIYXNoXSA9IGFzLnNwbGl0KCcjJylcblxuICAgIC8vIE1ha2VzIHN1cmUgd2Ugc2Nyb2xsIHRvIHRoZSBwcm92aWRlZCBoYXNoIGlmIHRoZSB1cmwvaGFzaCBhcmUgdGhlIHNhbWVcbiAgICBpZiAobmV3SGFzaCAmJiBvbGRVcmxOb0hhc2ggPT09IG5ld1VybE5vSGFzaCAmJiBvbGRIYXNoID09PSBuZXdIYXNoKSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cblxuICAgIC8vIElmIHRoZSB1cmxzIGFyZSBjaGFuZ2UsIHRoZXJlJ3MgbW9yZSB0aGFuIGEgaGFzaCBjaGFuZ2VcbiAgICBpZiAob2xkVXJsTm9IYXNoICE9PSBuZXdVcmxOb0hhc2gpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIC8vIElmIHRoZSBoYXNoIGhhcyBjaGFuZ2VkLCB0aGVuIGl0J3MgYSBoYXNoIG9ubHkgY2hhbmdlLlxuICAgIC8vIFRoaXMgY2hlY2sgaXMgbmVjZXNzYXJ5IHRvIGhhbmRsZSBib3RoIHRoZSBlbnRlciBhbmRcbiAgICAvLyBsZWF2ZSBoYXNoID09PSAnJyBjYXNlcy4gVGhlIGlkZW50aXR5IGNhc2UgZmFsbHMgdGhyb3VnaFxuICAgIC8vIGFuZCBpcyB0cmVhdGVkIGFzIGEgbmV4dCByZWxvYWQuXG4gICAgcmV0dXJuIG9sZEhhc2ggIT09IG5ld0hhc2hcbiAgfVxuXG4gIHNjcm9sbFRvSGFzaChhczogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgWywgaGFzaF0gPSBhcy5zcGxpdCgnIycpXG4gICAgLy8gU2Nyb2xsIHRvIHRvcCBpZiB0aGUgaGFzaCBpcyBqdXN0IGAjYCB3aXRoIG5vIHZhbHVlIG9yIGAjdG9wYFxuICAgIC8vIFRvIG1pcnJvciBicm93c2Vyc1xuICAgIGlmIChoYXNoID09PSAnJyB8fCBoYXNoID09PSAndG9wJykge1xuICAgICAgd2luZG93LnNjcm9sbFRvKDAsIDApXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICAvLyBGaXJzdCB3ZSBjaGVjayBpZiB0aGUgZWxlbWVudCBieSBpZCBpcyBmb3VuZFxuICAgIGNvbnN0IGlkRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChoYXNoKVxuICAgIGlmIChpZEVsKSB7XG4gICAgICBpZEVsLnNjcm9sbEludG9WaWV3KClcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICAvLyBJZiB0aGVyZSdzIG5vIGVsZW1lbnQgd2l0aCB0aGUgaWQsIHdlIGNoZWNrIHRoZSBgbmFtZWAgcHJvcGVydHlcbiAgICAvLyBUbyBtaXJyb3IgYnJvd3NlcnNcbiAgICBjb25zdCBuYW1lRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZShoYXNoKVswXVxuICAgIGlmIChuYW1lRWwpIHtcbiAgICAgIG5hbWVFbC5zY3JvbGxJbnRvVmlldygpXG4gICAgfVxuICB9XG5cbiAgdXJsSXNOZXcoYXNQYXRoOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5hc1BhdGggIT09IGFzUGF0aFxuICB9XG5cbiAgLyoqXG4gICAqIFByZWZldGNoIHBhZ2UgY29kZSwgeW91IG1heSB3YWl0IGZvciB0aGUgZGF0YSBkdXJpbmcgcGFnZSByZW5kZXJpbmcuXG4gICAqIFRoaXMgZmVhdHVyZSBvbmx5IHdvcmtzIGluIHByb2R1Y3Rpb24hXG4gICAqIEBwYXJhbSB1cmwgdGhlIGhyZWYgb2YgcHJlZmV0Y2hlZCBwYWdlXG4gICAqIEBwYXJhbSBhc1BhdGggdGhlIGFzIHBhdGggb2YgdGhlIHByZWZldGNoZWQgcGFnZVxuICAgKi9cbiAgYXN5bmMgcHJlZmV0Y2goXG4gICAgdXJsOiBzdHJpbmcsXG4gICAgYXNQYXRoOiBzdHJpbmcgPSB1cmwsXG4gICAgb3B0aW9uczogUHJlZmV0Y2hPcHRpb25zID0ge31cbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgbGV0IHBhcnNlZCA9IHBhcnNlUmVsYXRpdmVVcmwodXJsKVxuXG4gICAgbGV0IHsgcGF0aG5hbWUgfSA9IHBhcnNlZFxuXG4gICAgaWYgKHByb2Nlc3MuZW52Ll9fTkVYVF9JMThOX1NVUFBPUlQpIHtcbiAgICAgIGlmIChvcHRpb25zLmxvY2FsZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgcGF0aG5hbWUgPSBub3JtYWxpemVMb2NhbGVQYXRoIShwYXRobmFtZSwgdGhpcy5sb2NhbGVzKS5wYXRobmFtZVxuICAgICAgICBwYXJzZWQucGF0aG5hbWUgPSBwYXRobmFtZVxuICAgICAgICB1cmwgPSBmb3JtYXRXaXRoVmFsaWRhdGlvbihwYXJzZWQpXG5cbiAgICAgICAgbGV0IHBhcnNlZEFzID0gcGFyc2VSZWxhdGl2ZVVybChhc1BhdGgpXG4gICAgICAgIGNvbnN0IGxvY2FsZVBhdGhSZXN1bHQgPSBub3JtYWxpemVMb2NhbGVQYXRoIShcbiAgICAgICAgICBwYXJzZWRBcy5wYXRobmFtZSxcbiAgICAgICAgICB0aGlzLmxvY2FsZXNcbiAgICAgICAgKVxuICAgICAgICBwYXJzZWRBcy5wYXRobmFtZSA9IGxvY2FsZVBhdGhSZXN1bHQucGF0aG5hbWVcbiAgICAgICAgb3B0aW9ucy5sb2NhbGUgPSBsb2NhbGVQYXRoUmVzdWx0LmRldGVjdGVkTG9jYWxlIHx8IHRoaXMuZGVmYXVsdExvY2FsZVxuICAgICAgICBhc1BhdGggPSBmb3JtYXRXaXRoVmFsaWRhdGlvbihwYXJzZWRBcylcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBwYWdlcyA9IGF3YWl0IHRoaXMucGFnZUxvYWRlci5nZXRQYWdlTGlzdCgpXG4gICAgbGV0IHJlc29sdmVkQXMgPSBhc1BhdGhcblxuICAgIGlmIChwcm9jZXNzLmVudi5fX05FWFRfSEFTX1JFV1JJVEVTICYmIGFzUGF0aC5zdGFydHNXaXRoKCcvJykpIHtcbiAgICAgIGxldCByZXdyaXRlczogYW55XG4gICAgICA7KHsgX19yZXdyaXRlczogcmV3cml0ZXMgfSA9IGF3YWl0IGdldENsaWVudEJ1aWxkTWFuaWZlc3QoKSlcblxuICAgICAgY29uc3QgcmV3cml0ZXNSZXN1bHQgPSByZXNvbHZlUmV3cml0ZXMoXG4gICAgICAgIGFkZEJhc2VQYXRoKGFkZExvY2FsZShhc1BhdGgsIHRoaXMubG9jYWxlKSksXG4gICAgICAgIHBhZ2VzLFxuICAgICAgICByZXdyaXRlcyxcbiAgICAgICAgcGFyc2VkLnF1ZXJ5LFxuICAgICAgICAocDogc3RyaW5nKSA9PiByZXNvbHZlRHluYW1pY1JvdXRlKHAsIHBhZ2VzKSxcbiAgICAgICAgdGhpcy5sb2NhbGVzXG4gICAgICApXG4gICAgICByZXNvbHZlZEFzID0gZGVsTG9jYWxlKGRlbEJhc2VQYXRoKHJld3JpdGVzUmVzdWx0LmFzUGF0aCksIHRoaXMubG9jYWxlKVxuXG4gICAgICBpZiAocmV3cml0ZXNSZXN1bHQubWF0Y2hlZFBhZ2UgJiYgcmV3cml0ZXNSZXN1bHQucmVzb2x2ZWRIcmVmKSB7XG4gICAgICAgIC8vIGlmIHRoaXMgZGlyZWN0bHkgbWF0Y2hlcyBhIHBhZ2Ugd2UgbmVlZCB0byB1cGRhdGUgdGhlIGhyZWYgdG9cbiAgICAgICAgLy8gYWxsb3cgdGhlIGNvcnJlY3QgcGFnZSBjaHVuayB0byBiZSBsb2FkZWRcbiAgICAgICAgcGF0aG5hbWUgPSByZXdyaXRlc1Jlc3VsdC5yZXNvbHZlZEhyZWZcbiAgICAgICAgcGFyc2VkLnBhdGhuYW1lID0gcGF0aG5hbWVcbiAgICAgICAgdXJsID0gZm9ybWF0V2l0aFZhbGlkYXRpb24ocGFyc2VkKVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBwYXJzZWQucGF0aG5hbWUgPSByZXNvbHZlRHluYW1pY1JvdXRlKHBhcnNlZC5wYXRobmFtZSwgcGFnZXMpXG5cbiAgICAgIGlmIChwYXJzZWQucGF0aG5hbWUgIT09IHBhdGhuYW1lKSB7XG4gICAgICAgIHBhdGhuYW1lID0gcGFyc2VkLnBhdGhuYW1lXG4gICAgICAgIHVybCA9IGZvcm1hdFdpdGhWYWxpZGF0aW9uKHBhcnNlZClcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3Qgcm91dGUgPSByZW1vdmVQYXRoVHJhaWxpbmdTbGFzaChwYXRobmFtZSlcblxuICAgIC8vIFByZWZldGNoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gZGV2ZWxvcG1lbnQgbW9kZSBiZWNhdXNlIGl0IHdvdWxkIHRyaWdnZXIgb24tZGVtYW5kLWVudHJpZXNcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgdGhpcy5wYWdlTG9hZGVyLl9pc1NzZyhyb3V0ZSkudGhlbigoaXNTc2c6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgcmV0dXJuIGlzU3NnXG4gICAgICAgICAgPyB0aGlzLl9nZXRTdGF0aWNEYXRhKFxuICAgICAgICAgICAgICB0aGlzLnBhZ2VMb2FkZXIuZ2V0RGF0YUhyZWYoXG4gICAgICAgICAgICAgICAgdXJsLFxuICAgICAgICAgICAgICAgIHJlc29sdmVkQXMsXG4gICAgICAgICAgICAgICAgdHJ1ZSxcbiAgICAgICAgICAgICAgICB0eXBlb2Ygb3B0aW9ucy5sb2NhbGUgIT09ICd1bmRlZmluZWQnXG4gICAgICAgICAgICAgICAgICA/IG9wdGlvbnMubG9jYWxlXG4gICAgICAgICAgICAgICAgICA6IHRoaXMubG9jYWxlXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIClcbiAgICAgICAgICA6IGZhbHNlXG4gICAgICB9KSxcbiAgICAgIHRoaXMucGFnZUxvYWRlcltvcHRpb25zLnByaW9yaXR5ID8gJ2xvYWRQYWdlJyA6ICdwcmVmZXRjaCddKHJvdXRlKSxcbiAgICBdKVxuICB9XG5cbiAgYXN5bmMgZmV0Y2hDb21wb25lbnQocm91dGU6IHN0cmluZyk6IFByb21pc2U8R29vZFBhZ2VDYWNoZT4ge1xuICAgIGxldCBjYW5jZWxsZWQgPSBmYWxzZVxuICAgIGNvbnN0IGNhbmNlbCA9ICh0aGlzLmNsYyA9ICgpID0+IHtcbiAgICAgIGNhbmNlbGxlZCA9IHRydWVcbiAgICB9KVxuXG4gICAgY29uc3QgY29tcG9uZW50UmVzdWx0ID0gYXdhaXQgdGhpcy5wYWdlTG9hZGVyLmxvYWRQYWdlKHJvdXRlKVxuXG4gICAgaWYgKGNhbmNlbGxlZCkge1xuICAgICAgY29uc3QgZXJyb3I6IGFueSA9IG5ldyBFcnJvcihcbiAgICAgICAgYEFib3J0IGZldGNoaW5nIGNvbXBvbmVudCBmb3Igcm91dGU6IFwiJHtyb3V0ZX1cImBcbiAgICAgIClcbiAgICAgIGVycm9yLmNhbmNlbGxlZCA9IHRydWVcbiAgICAgIHRocm93IGVycm9yXG4gICAgfVxuXG4gICAgaWYgKGNhbmNlbCA9PT0gdGhpcy5jbGMpIHtcbiAgICAgIHRoaXMuY2xjID0gbnVsbFxuICAgIH1cblxuICAgIHJldHVybiBjb21wb25lbnRSZXN1bHRcbiAgfVxuXG4gIF9nZXREYXRhPFQ+KGZuOiAoKSA9PiBQcm9taXNlPFQ+KTogUHJvbWlzZTxUPiB7XG4gICAgbGV0IGNhbmNlbGxlZCA9IGZhbHNlXG4gICAgY29uc3QgY2FuY2VsID0gKCkgPT4ge1xuICAgICAgY2FuY2VsbGVkID0gdHJ1ZVxuICAgIH1cbiAgICB0aGlzLmNsYyA9IGNhbmNlbFxuICAgIHJldHVybiBmbigpLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgIGlmIChjYW5jZWwgPT09IHRoaXMuY2xjKSB7XG4gICAgICAgIHRoaXMuY2xjID0gbnVsbFxuICAgICAgfVxuXG4gICAgICBpZiAoY2FuY2VsbGVkKSB7XG4gICAgICAgIGNvbnN0IGVycjogYW55ID0gbmV3IEVycm9yKCdMb2FkaW5nIGluaXRpYWwgcHJvcHMgY2FuY2VsbGVkJylcbiAgICAgICAgZXJyLmNhbmNlbGxlZCA9IHRydWVcbiAgICAgICAgdGhyb3cgZXJyXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkYXRhXG4gICAgfSlcbiAgfVxuXG4gIF9nZXRTdGF0aWNEYXRhKGRhdGFIcmVmOiBzdHJpbmcpOiBQcm9taXNlPG9iamVjdD4ge1xuICAgIGNvbnN0IHsgaHJlZjogY2FjaGVLZXkgfSA9IG5ldyBVUkwoZGF0YUhyZWYsIHdpbmRvdy5sb2NhdGlvbi5ocmVmKVxuICAgIGlmIChcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicgJiZcbiAgICAgICF0aGlzLmlzUHJldmlldyAmJlxuICAgICAgdGhpcy5zZGNbY2FjaGVLZXldXG4gICAgKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMuc2RjW2NhY2hlS2V5XSlcbiAgICB9XG4gICAgcmV0dXJuIGZldGNoTmV4dERhdGEoZGF0YUhyZWYsIHRoaXMuaXNTc3IpLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgIHRoaXMuc2RjW2NhY2hlS2V5XSA9IGRhdGFcbiAgICAgIHJldHVybiBkYXRhXG4gICAgfSlcbiAgfVxuXG4gIF9nZXRTZXJ2ZXJEYXRhKGRhdGFIcmVmOiBzdHJpbmcpOiBQcm9taXNlPG9iamVjdD4ge1xuICAgIGNvbnN0IHsgaHJlZjogcmVzb3VyY2VLZXkgfSA9IG5ldyBVUkwoZGF0YUhyZWYsIHdpbmRvdy5sb2NhdGlvbi5ocmVmKVxuICAgIGlmICh0aGlzLnNkcltyZXNvdXJjZUtleV0pIHtcbiAgICAgIHJldHVybiB0aGlzLnNkcltyZXNvdXJjZUtleV1cbiAgICB9XG4gICAgcmV0dXJuICh0aGlzLnNkcltyZXNvdXJjZUtleV0gPSBmZXRjaE5leHREYXRhKGRhdGFIcmVmLCB0aGlzLmlzU3NyKVxuICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgZGVsZXRlIHRoaXMuc2RyW3Jlc291cmNlS2V5XVxuICAgICAgICByZXR1cm4gZGF0YVxuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLnNkcltyZXNvdXJjZUtleV1cbiAgICAgICAgdGhyb3cgZXJyXG4gICAgICB9KSlcbiAgfVxuXG4gIGdldEluaXRpYWxQcm9wcyhcbiAgICBDb21wb25lbnQ6IENvbXBvbmVudFR5cGUsXG4gICAgY3R4OiBOZXh0UGFnZUNvbnRleHRcbiAgKTogUHJvbWlzZTxhbnk+IHtcbiAgICBjb25zdCB7IENvbXBvbmVudDogQXBwIH0gPSB0aGlzLmNvbXBvbmVudHNbJy9fYXBwJ11cbiAgICBjb25zdCBBcHBUcmVlID0gdGhpcy5fd3JhcEFwcChBcHAgYXMgQXBwQ29tcG9uZW50KVxuICAgIGN0eC5BcHBUcmVlID0gQXBwVHJlZVxuICAgIHJldHVybiBsb2FkR2V0SW5pdGlhbFByb3BzPEFwcENvbnRleHRUeXBlPFJvdXRlcj4+KEFwcCwge1xuICAgICAgQXBwVHJlZSxcbiAgICAgIENvbXBvbmVudCxcbiAgICAgIHJvdXRlcjogdGhpcyxcbiAgICAgIGN0eCxcbiAgICB9KVxuICB9XG5cbiAgYWJvcnRDb21wb25lbnRMb2FkKGFzOiBzdHJpbmcsIHJvdXRlUHJvcHM6IFJvdXRlUHJvcGVydGllcyk6IHZvaWQge1xuICAgIGlmICh0aGlzLmNsYykge1xuICAgICAgUm91dGVyLmV2ZW50cy5lbWl0KFxuICAgICAgICAncm91dGVDaGFuZ2VFcnJvcicsXG4gICAgICAgIGJ1aWxkQ2FuY2VsbGF0aW9uRXJyb3IoKSxcbiAgICAgICAgYXMsXG4gICAgICAgIHJvdXRlUHJvcHNcbiAgICAgIClcbiAgICAgIHRoaXMuY2xjKClcbiAgICAgIHRoaXMuY2xjID0gbnVsbFxuICAgIH1cbiAgfVxuXG4gIG5vdGlmeShcbiAgICBkYXRhOiBQcml2YXRlUm91dGVJbmZvLFxuICAgIHJlc2V0U2Nyb2xsOiB7IHg6IG51bWJlcjsgeTogbnVtYmVyIH0gfCBudWxsXG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLnN1YihcbiAgICAgIGRhdGEsXG4gICAgICB0aGlzLmNvbXBvbmVudHNbJy9fYXBwJ10uQ29tcG9uZW50IGFzIEFwcENvbXBvbmVudCxcbiAgICAgIHJlc2V0U2Nyb2xsXG4gICAgKVxuICB9XG59XG4iLCIvLyBGb3JtYXQgZnVuY3Rpb24gbW9kaWZpZWQgZnJvbSBub2RlanNcbi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgeyBVcmxPYmplY3QgfSBmcm9tICd1cmwnXG5pbXBvcnQgeyBQYXJzZWRVcmxRdWVyeSB9IGZyb20gJ3F1ZXJ5c3RyaW5nJ1xuaW1wb3J0ICogYXMgcXVlcnlzdHJpbmcgZnJvbSAnLi9xdWVyeXN0cmluZydcblxuY29uc3Qgc2xhc2hlZFByb3RvY29scyA9IC9odHRwcz98ZnRwfGdvcGhlcnxmaWxlL1xuXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0VXJsKHVybE9iajogVXJsT2JqZWN0KSB7XG4gIGxldCB7IGF1dGgsIGhvc3RuYW1lIH0gPSB1cmxPYmpcbiAgbGV0IHByb3RvY29sID0gdXJsT2JqLnByb3RvY29sIHx8ICcnXG4gIGxldCBwYXRobmFtZSA9IHVybE9iai5wYXRobmFtZSB8fCAnJ1xuICBsZXQgaGFzaCA9IHVybE9iai5oYXNoIHx8ICcnXG4gIGxldCBxdWVyeSA9IHVybE9iai5xdWVyeSB8fCAnJ1xuICBsZXQgaG9zdDogc3RyaW5nIHwgZmFsc2UgPSBmYWxzZVxuXG4gIGF1dGggPSBhdXRoID8gZW5jb2RlVVJJQ29tcG9uZW50KGF1dGgpLnJlcGxhY2UoLyUzQS9pLCAnOicpICsgJ0AnIDogJydcblxuICBpZiAodXJsT2JqLmhvc3QpIHtcbiAgICBob3N0ID0gYXV0aCArIHVybE9iai5ob3N0XG4gIH0gZWxzZSBpZiAoaG9zdG5hbWUpIHtcbiAgICBob3N0ID0gYXV0aCArICh+aG9zdG5hbWUuaW5kZXhPZignOicpID8gYFske2hvc3RuYW1lfV1gIDogaG9zdG5hbWUpXG4gICAgaWYgKHVybE9iai5wb3J0KSB7XG4gICAgICBob3N0ICs9ICc6JyArIHVybE9iai5wb3J0XG4gICAgfVxuICB9XG5cbiAgaWYgKHF1ZXJ5ICYmIHR5cGVvZiBxdWVyeSA9PT0gJ29iamVjdCcpIHtcbiAgICBxdWVyeSA9IFN0cmluZyhxdWVyeXN0cmluZy51cmxRdWVyeVRvU2VhcmNoUGFyYW1zKHF1ZXJ5IGFzIFBhcnNlZFVybFF1ZXJ5KSlcbiAgfVxuXG4gIGxldCBzZWFyY2ggPSB1cmxPYmouc2VhcmNoIHx8IChxdWVyeSAmJiBgPyR7cXVlcnl9YCkgfHwgJydcblxuICBpZiAocHJvdG9jb2wgJiYgcHJvdG9jb2wuc3Vic3RyKC0xKSAhPT0gJzonKSBwcm90b2NvbCArPSAnOidcblxuICBpZiAoXG4gICAgdXJsT2JqLnNsYXNoZXMgfHxcbiAgICAoKCFwcm90b2NvbCB8fCBzbGFzaGVkUHJvdG9jb2xzLnRlc3QocHJvdG9jb2wpKSAmJiBob3N0ICE9PSBmYWxzZSlcbiAgKSB7XG4gICAgaG9zdCA9ICcvLycgKyAoaG9zdCB8fCAnJylcbiAgICBpZiAocGF0aG5hbWUgJiYgcGF0aG5hbWVbMF0gIT09ICcvJykgcGF0aG5hbWUgPSAnLycgKyBwYXRobmFtZVxuICB9IGVsc2UgaWYgKCFob3N0KSB7XG4gICAgaG9zdCA9ICcnXG4gIH1cblxuICBpZiAoaGFzaCAmJiBoYXNoWzBdICE9PSAnIycpIGhhc2ggPSAnIycgKyBoYXNoXG4gIGlmIChzZWFyY2ggJiYgc2VhcmNoWzBdICE9PSAnPycpIHNlYXJjaCA9ICc/JyArIHNlYXJjaFxuXG4gIHBhdGhuYW1lID0gcGF0aG5hbWUucmVwbGFjZSgvWz8jXS9nLCBlbmNvZGVVUklDb21wb25lbnQpXG4gIHNlYXJjaCA9IHNlYXJjaC5yZXBsYWNlKCcjJywgJyUyMycpXG5cbiAgcmV0dXJuIGAke3Byb3RvY29sfSR7aG9zdH0ke3BhdGhuYW1lfSR7c2VhcmNofSR7aGFzaH1gXG59XG4iLCIvLyBJZGVudGlmeSAvW3BhcmFtXS8gaW4gcm91dGUgc3RyaW5nXG5jb25zdCBURVNUX1JPVVRFID0gL1xcL1xcW1teL10rP1xcXSg/PVxcL3wkKS9cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRHluYW1pY1JvdXRlKHJvdXRlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgcmV0dXJuIFRFU1RfUk9VVEUudGVzdChyb3V0ZSlcbn1cbiIsImltcG9ydCB7IGdldExvY2F0aW9uT3JpZ2luIH0gZnJvbSAnLi4vLi4vdXRpbHMnXG5pbXBvcnQgeyBzZWFyY2hQYXJhbXNUb1VybFF1ZXJ5IH0gZnJvbSAnLi9xdWVyeXN0cmluZydcblxuLyoqXG4gKiBQYXJzZXMgcGF0aC1yZWxhdGl2ZSB1cmxzIChlLmcuIGAvaGVsbG8vd29ybGQ/Zm9vPWJhcmApLiBJZiB1cmwgaXNuJ3QgcGF0aC1yZWxhdGl2ZVxuICogKGUuZy4gYC4vaGVsbG9gKSB0aGVuIGF0IGxlYXN0IGJhc2UgbXVzdCBiZS5cbiAqIEFic29sdXRlIHVybHMgYXJlIHJlamVjdGVkIHdpdGggb25lIGV4Y2VwdGlvbiwgaW4gdGhlIGJyb3dzZXIsIGFic29sdXRlIHVybHMgdGhhdCBhcmUgb25cbiAqIHRoZSBjdXJyZW50IG9yaWdpbiB3aWxsIGJlIHBhcnNlZCBhcyByZWxhdGl2ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VSZWxhdGl2ZVVybCh1cmw6IHN0cmluZywgYmFzZT86IHN0cmluZykge1xuICBjb25zdCBnbG9iYWxCYXNlID0gbmV3IFVSTChcbiAgICB0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJyA/ICdodHRwOi8vbicgOiBnZXRMb2NhdGlvbk9yaWdpbigpXG4gIClcbiAgY29uc3QgcmVzb2x2ZWRCYXNlID0gYmFzZSA/IG5ldyBVUkwoYmFzZSwgZ2xvYmFsQmFzZSkgOiBnbG9iYWxCYXNlXG4gIGNvbnN0IHsgcGF0aG5hbWUsIHNlYXJjaFBhcmFtcywgc2VhcmNoLCBoYXNoLCBocmVmLCBvcmlnaW4gfSA9IG5ldyBVUkwoXG4gICAgdXJsLFxuICAgIHJlc29sdmVkQmFzZVxuICApXG4gIGlmIChvcmlnaW4gIT09IGdsb2JhbEJhc2Uub3JpZ2luKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBpbnZhcmlhbnQ6IGludmFsaWQgcmVsYXRpdmUgVVJMLCByb3V0ZXIgcmVjZWl2ZWQgJHt1cmx9YClcbiAgfVxuICByZXR1cm4ge1xuICAgIHBhdGhuYW1lLFxuICAgIHF1ZXJ5OiBzZWFyY2hQYXJhbXNUb1VybFF1ZXJ5KHNlYXJjaFBhcmFtcyksXG4gICAgc2VhcmNoLFxuICAgIGhhc2gsXG4gICAgaHJlZjogaHJlZi5zbGljZShnbG9iYWxCYXNlLm9yaWdpbi5sZW5ndGgpLFxuICB9XG59XG4iLCJpbXBvcnQgKiBhcyBwYXRoVG9SZWdleHAgZnJvbSAnbmV4dC9kaXN0L2NvbXBpbGVkL3BhdGgtdG8tcmVnZXhwJ1xuXG5leHBvcnQgeyBwYXRoVG9SZWdleHAgfVxuXG5leHBvcnQgY29uc3QgbWF0Y2hlck9wdGlvbnM6IHBhdGhUb1JlZ2V4cC5Ub2tlbnNUb1JlZ2V4cE9wdGlvbnMgJlxuICBwYXRoVG9SZWdleHAuUGFyc2VPcHRpb25zID0ge1xuICBzZW5zaXRpdmU6IGZhbHNlLFxuICBkZWxpbWl0ZXI6ICcvJyxcbn1cblxuZXhwb3J0IGNvbnN0IGN1c3RvbVJvdXRlTWF0Y2hlck9wdGlvbnM6IHBhdGhUb1JlZ2V4cC5Ub2tlbnNUb1JlZ2V4cE9wdGlvbnMgJlxuICBwYXRoVG9SZWdleHAuUGFyc2VPcHRpb25zID0ge1xuICAuLi5tYXRjaGVyT3B0aW9ucyxcbiAgc3RyaWN0OiB0cnVlLFxufVxuXG5leHBvcnQgZGVmYXVsdCAoY3VzdG9tUm91dGUgPSBmYWxzZSkgPT4ge1xuICByZXR1cm4gKHBhdGg6IHN0cmluZykgPT4ge1xuICAgIGNvbnN0IGtleXM6IHBhdGhUb1JlZ2V4cC5LZXlbXSA9IFtdXG4gICAgY29uc3QgbWF0Y2hlclJlZ2V4ID0gcGF0aFRvUmVnZXhwLnBhdGhUb1JlZ2V4cChcbiAgICAgIHBhdGgsXG4gICAgICBrZXlzLFxuICAgICAgY3VzdG9tUm91dGUgPyBjdXN0b21Sb3V0ZU1hdGNoZXJPcHRpb25zIDogbWF0Y2hlck9wdGlvbnNcbiAgICApXG4gICAgY29uc3QgbWF0Y2hlciA9IHBhdGhUb1JlZ2V4cC5yZWdleHBUb0Z1bmN0aW9uKG1hdGNoZXJSZWdleCwga2V5cylcblxuICAgIHJldHVybiAocGF0aG5hbWU6IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQsIHBhcmFtcz86IGFueSkgPT4ge1xuICAgICAgY29uc3QgcmVzID0gcGF0aG5hbWUgPT0gbnVsbCA/IGZhbHNlIDogbWF0Y2hlcihwYXRobmFtZSlcbiAgICAgIGlmICghcmVzKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuXG4gICAgICBpZiAoY3VzdG9tUm91dGUpIHtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgb2Yga2V5cykge1xuICAgICAgICAgIC8vIHVubmFtZWQgcGFyYW1zIHNob3VsZCBiZSByZW1vdmVkIGFzIHRoZXlcbiAgICAgICAgICAvLyBhcmUgbm90IGFsbG93ZWQgdG8gYmUgdXNlZCBpbiB0aGUgZGVzdGluYXRpb25cbiAgICAgICAgICBpZiAodHlwZW9mIGtleS5uYW1lID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgZGVsZXRlIChyZXMucGFyYW1zIGFzIGFueSlba2V5Lm5hbWVdXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7IC4uLnBhcmFtcywgLi4ucmVzLnBhcmFtcyB9XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBJbmNvbWluZ01lc3NhZ2UgfSBmcm9tICdodHRwJ1xuaW1wb3J0IHsgUGFyc2VkVXJsUXVlcnkgfSBmcm9tICdxdWVyeXN0cmluZydcbmltcG9ydCB7IHNlYXJjaFBhcmFtc1RvVXJsUXVlcnkgfSBmcm9tICcuL3F1ZXJ5c3RyaW5nJ1xuaW1wb3J0IHsgcGFyc2VSZWxhdGl2ZVVybCB9IGZyb20gJy4vcGFyc2UtcmVsYXRpdmUtdXJsJ1xuaW1wb3J0ICogYXMgcGF0aFRvUmVnZXhwIGZyb20gJ25leHQvZGlzdC9jb21waWxlZC9wYXRoLXRvLXJlZ2V4cCdcbmltcG9ydCB7IFJvdXRlSGFzIH0gZnJvbSAnLi4vLi4vLi4vLi4vbGliL2xvYWQtY3VzdG9tLXJvdXRlcydcblxudHlwZSBQYXJhbXMgPSB7IFtwYXJhbTogc3RyaW5nXTogYW55IH1cblxuLy8gZW5zdXJlIG9ubHkgYS16QS1aIGFyZSB1c2VkIGZvciBwYXJhbSBuYW1lcyBmb3IgcHJvcGVyIGludGVycG9sYXRpbmdcbi8vIHdpdGggcGF0aC10by1yZWdleHBcbmV4cG9ydCBjb25zdCBnZXRTYWZlUGFyYW1OYW1lID0gKHBhcmFtTmFtZTogc3RyaW5nKSA9PiB7XG4gIGxldCBuZXdQYXJhbU5hbWUgPSAnJ1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcGFyYW1OYW1lLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgY2hhckNvZGUgPSBwYXJhbU5hbWUuY2hhckNvZGVBdChpKVxuXG4gICAgaWYgKFxuICAgICAgKGNoYXJDb2RlID4gNjQgJiYgY2hhckNvZGUgPCA5MSkgfHwgLy8gQS1aXG4gICAgICAoY2hhckNvZGUgPiA5NiAmJiBjaGFyQ29kZSA8IDEyMykgLy8gYS16XG4gICAgKSB7XG4gICAgICBuZXdQYXJhbU5hbWUgKz0gcGFyYW1OYW1lW2ldXG4gICAgfVxuICB9XG4gIHJldHVybiBuZXdQYXJhbU5hbWVcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1hdGNoSGFzKFxuICByZXE6IEluY29taW5nTWVzc2FnZSxcbiAgaGFzOiBSb3V0ZUhhc1tdLFxuICBxdWVyeTogUGFyYW1zXG4pOiBmYWxzZSB8IFBhcmFtcyB7XG4gIGNvbnN0IHBhcmFtczogUGFyYW1zID0ge31cbiAgY29uc3QgYWxsTWF0Y2ggPSBoYXMuZXZlcnkoKGhhc0l0ZW0pID0+IHtcbiAgICBsZXQgdmFsdWU6IHVuZGVmaW5lZCB8IHN0cmluZ1xuICAgIGxldCBrZXkgPSBoYXNJdGVtLmtleVxuXG4gICAgc3dpdGNoIChoYXNJdGVtLnR5cGUpIHtcbiAgICAgIGNhc2UgJ2hlYWRlcic6IHtcbiAgICAgICAga2V5ID0ga2V5IS50b0xvd2VyQ2FzZSgpXG4gICAgICAgIHZhbHVlID0gcmVxLmhlYWRlcnNba2V5XSBhcyBzdHJpbmdcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICAgIGNhc2UgJ2Nvb2tpZSc6IHtcbiAgICAgICAgdmFsdWUgPSAocmVxIGFzIGFueSkuY29va2llc1toYXNJdGVtLmtleV1cbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICAgIGNhc2UgJ3F1ZXJ5Jzoge1xuICAgICAgICB2YWx1ZSA9IHF1ZXJ5W2tleSFdXG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgICBjYXNlICdob3N0Jzoge1xuICAgICAgICBjb25zdCB7IGhvc3QgfSA9IHJlcT8uaGVhZGVycyB8fCB7fVxuICAgICAgICAvLyByZW1vdmUgcG9ydCBmcm9tIGhvc3QgaWYgcHJlc2VudFxuICAgICAgICBjb25zdCBob3N0bmFtZSA9IGhvc3Q/LnNwbGl0KCc6JylbMF0udG9Mb3dlckNhc2UoKVxuICAgICAgICB2YWx1ZSA9IGhvc3RuYW1lXG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFoYXNJdGVtLnZhbHVlICYmIHZhbHVlKSB7XG4gICAgICBwYXJhbXNbZ2V0U2FmZVBhcmFtTmFtZShrZXkhKV0gPSB2YWx1ZVxuICAgICAgcmV0dXJuIHRydWVcbiAgICB9IGVsc2UgaWYgKHZhbHVlKSB7XG4gICAgICBjb25zdCBtYXRjaGVyID0gbmV3IFJlZ0V4cChgXiR7aGFzSXRlbS52YWx1ZX0kYClcbiAgICAgIGNvbnN0IG1hdGNoZXMgPSB2YWx1ZS5tYXRjaChtYXRjaGVyKVxuXG4gICAgICBpZiAobWF0Y2hlcykge1xuICAgICAgICBpZiAobWF0Y2hlcy5ncm91cHMpIHtcbiAgICAgICAgICBPYmplY3Qua2V5cyhtYXRjaGVzLmdyb3VwcykuZm9yRWFjaCgoZ3JvdXBLZXkpID0+IHtcbiAgICAgICAgICAgIHBhcmFtc1tncm91cEtleV0gPSBtYXRjaGVzLmdyb3VwcyFbZ3JvdXBLZXldXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIGlmIChoYXNJdGVtLnR5cGUgPT09ICdob3N0JyAmJiBtYXRjaGVzWzBdKSB7XG4gICAgICAgICAgcGFyYW1zLmhvc3QgPSBtYXRjaGVzWzBdXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlXG4gIH0pXG5cbiAgaWYgKGFsbE1hdGNoKSB7XG4gICAgcmV0dXJuIHBhcmFtc1xuICB9XG4gIHJldHVybiBmYWxzZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY29tcGlsZU5vblBhdGgodmFsdWU6IHN0cmluZywgcGFyYW1zOiBQYXJhbXMpOiBzdHJpbmcge1xuICBpZiAoIXZhbHVlLmluY2x1ZGVzKCc6JykpIHtcbiAgICByZXR1cm4gdmFsdWVcbiAgfVxuXG4gIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKHBhcmFtcykpIHtcbiAgICBpZiAodmFsdWUuaW5jbHVkZXMoYDoke2tleX1gKSkge1xuICAgICAgdmFsdWUgPSB2YWx1ZVxuICAgICAgICAucmVwbGFjZShcbiAgICAgICAgICBuZXcgUmVnRXhwKGA6JHtrZXl9XFxcXCpgLCAnZycpLFxuICAgICAgICAgIGA6JHtrZXl9LS1FU0NBUEVEX1BBUkFNX0FTVEVSSVNLU2BcbiAgICAgICAgKVxuICAgICAgICAucmVwbGFjZShcbiAgICAgICAgICBuZXcgUmVnRXhwKGA6JHtrZXl9XFxcXD9gLCAnZycpLFxuICAgICAgICAgIGA6JHtrZXl9LS1FU0NBUEVEX1BBUkFNX1FVRVNUSU9OYFxuICAgICAgICApXG4gICAgICAgIC5yZXBsYWNlKG5ldyBSZWdFeHAoYDoke2tleX1cXFxcK2AsICdnJyksIGA6JHtrZXl9LS1FU0NBUEVEX1BBUkFNX1BMVVNgKVxuICAgICAgICAucmVwbGFjZShcbiAgICAgICAgICBuZXcgUmVnRXhwKGA6JHtrZXl9KD8hXFxcXHcpYCwgJ2cnKSxcbiAgICAgICAgICBgLS1FU0NBUEVEX1BBUkFNX0NPTE9OJHtrZXl9YFxuICAgICAgICApXG4gICAgfVxuICB9XG4gIHZhbHVlID0gdmFsdWVcbiAgICAucmVwbGFjZSgvKDp8XFwqfFxcP3xcXCt8XFwofFxcKXxcXHt8XFx9KS9nLCAnXFxcXCQxJylcbiAgICAucmVwbGFjZSgvLS1FU0NBUEVEX1BBUkFNX1BMVVMvZywgJysnKVxuICAgIC5yZXBsYWNlKC8tLUVTQ0FQRURfUEFSQU1fQ09MT04vZywgJzonKVxuICAgIC5yZXBsYWNlKC8tLUVTQ0FQRURfUEFSQU1fUVVFU1RJT04vZywgJz8nKVxuICAgIC5yZXBsYWNlKC8tLUVTQ0FQRURfUEFSQU1fQVNURVJJU0tTL2csICcqJylcblxuICAvLyB0aGUgdmFsdWUgbmVlZHMgdG8gc3RhcnQgd2l0aCBhIGZvcndhcmQtc2xhc2ggdG8gYmUgY29tcGlsZWRcbiAgLy8gY29ycmVjdGx5XG4gIHJldHVybiBwYXRoVG9SZWdleHBcbiAgICAuY29tcGlsZShgLyR7dmFsdWV9YCwgeyB2YWxpZGF0ZTogZmFsc2UgfSkocGFyYW1zKVxuICAgIC5zdWJzdHIoMSlcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcHJlcGFyZURlc3RpbmF0aW9uKFxuICBkZXN0aW5hdGlvbjogc3RyaW5nLFxuICBwYXJhbXM6IFBhcmFtcyxcbiAgcXVlcnk6IFBhcnNlZFVybFF1ZXJ5LFxuICBhcHBlbmRQYXJhbXNUb1F1ZXJ5OiBib29sZWFuXG4pIHtcbiAgbGV0IHBhcnNlZERlc3RpbmF0aW9uOiB7XG4gICAgcXVlcnk/OiBQYXJzZWRVcmxRdWVyeVxuICAgIHByb3RvY29sPzogc3RyaW5nXG4gICAgaG9zdG5hbWU/OiBzdHJpbmdcbiAgICBwb3J0Pzogc3RyaW5nXG4gIH0gJiBSZXR1cm5UeXBlPHR5cGVvZiBwYXJzZVJlbGF0aXZlVXJsPiA9IHt9IGFzIGFueVxuXG4gIC8vIGNsb25lIHF1ZXJ5IHNvIHdlIGRvbid0IG1vZGlmeSB0aGUgb3JpZ2luYWxcbiAgcXVlcnkgPSBPYmplY3QuYXNzaWduKHt9LCBxdWVyeSlcbiAgY29uc3QgaGFkTG9jYWxlID0gcXVlcnkuX19uZXh0TG9jYWxlXG4gIGRlbGV0ZSBxdWVyeS5fX25leHRMb2NhbGVcbiAgZGVsZXRlIHF1ZXJ5Ll9fbmV4dERlZmF1bHRMb2NhbGVcblxuICBpZiAoZGVzdGluYXRpb24uc3RhcnRzV2l0aCgnLycpKSB7XG4gICAgcGFyc2VkRGVzdGluYXRpb24gPSBwYXJzZVJlbGF0aXZlVXJsKGRlc3RpbmF0aW9uKVxuICB9IGVsc2Uge1xuICAgIGNvbnN0IHtcbiAgICAgIHBhdGhuYW1lLFxuICAgICAgc2VhcmNoUGFyYW1zLFxuICAgICAgaGFzaCxcbiAgICAgIGhvc3RuYW1lLFxuICAgICAgcG9ydCxcbiAgICAgIHByb3RvY29sLFxuICAgICAgc2VhcmNoLFxuICAgICAgaHJlZixcbiAgICB9ID0gbmV3IFVSTChkZXN0aW5hdGlvbilcblxuICAgIHBhcnNlZERlc3RpbmF0aW9uID0ge1xuICAgICAgcGF0aG5hbWUsXG4gICAgICBxdWVyeTogc2VhcmNoUGFyYW1zVG9VcmxRdWVyeShzZWFyY2hQYXJhbXMpLFxuICAgICAgaGFzaCxcbiAgICAgIHByb3RvY29sLFxuICAgICAgaG9zdG5hbWUsXG4gICAgICBwb3J0LFxuICAgICAgc2VhcmNoLFxuICAgICAgaHJlZixcbiAgICB9XG4gIH1cblxuICBjb25zdCBkZXN0UXVlcnkgPSBwYXJzZWREZXN0aW5hdGlvbi5xdWVyeVxuICBjb25zdCBkZXN0UGF0aCA9IGAke3BhcnNlZERlc3RpbmF0aW9uLnBhdGhuYW1lIX0ke1xuICAgIHBhcnNlZERlc3RpbmF0aW9uLmhhc2ggfHwgJydcbiAgfWBcbiAgY29uc3QgZGVzdFBhdGhQYXJhbUtleXM6IHBhdGhUb1JlZ2V4cC5LZXlbXSA9IFtdXG4gIHBhdGhUb1JlZ2V4cC5wYXRoVG9SZWdleHAoZGVzdFBhdGgsIGRlc3RQYXRoUGFyYW1LZXlzKVxuXG4gIGNvbnN0IGRlc3RQYXRoUGFyYW1zID0gZGVzdFBhdGhQYXJhbUtleXMubWFwKChrZXkpID0+IGtleS5uYW1lKVxuXG4gIGxldCBkZXN0aW5hdGlvbkNvbXBpbGVyID0gcGF0aFRvUmVnZXhwLmNvbXBpbGUoXG4gICAgZGVzdFBhdGgsXG4gICAgLy8gd2UgZG9uJ3QgdmFsaWRhdGUgd2hpbGUgY29tcGlsaW5nIHRoZSBkZXN0aW5hdGlvbiBzaW5jZSB3ZSBzaG91bGRcbiAgICAvLyBoYXZlIGFscmVhZHkgdmFsaWRhdGVkIGJlZm9yZSB3ZSBnb3QgdG8gdGhpcyBwb2ludCBhbmQgdmFsaWRhdGluZ1xuICAgIC8vIGJyZWFrcyBjb21waWxpbmcgZGVzdGluYXRpb25zIHdpdGggbmFtZWQgcGF0dGVybiBwYXJhbXMgZnJvbSB0aGUgc291cmNlXG4gICAgLy8gZS5nLiAvc29tZXRoaW5nOmhlbGxvKC4qKSAtPiAvYW5vdGhlci86aGVsbG8gaXMgYnJva2VuIHdpdGggdmFsaWRhdGlvblxuICAgIC8vIHNpbmNlIGNvbXBpbGUgdmFsaWRhdGlvbiBpcyBtZWFudCBmb3IgcmV2ZXJzaW5nIGFuZCBub3QgZm9yIGluc2VydGluZ1xuICAgIC8vIHBhcmFtcyBmcm9tIGEgc2VwYXJhdGUgcGF0aC1yZWdleCBpbnRvIGFub3RoZXJcbiAgICB7IHZhbGlkYXRlOiBmYWxzZSB9XG4gIClcbiAgbGV0IG5ld1VybFxuXG4gIC8vIHVwZGF0ZSBhbnkgcGFyYW1zIGluIHF1ZXJ5IHZhbHVlc1xuICBmb3IgKGNvbnN0IFtrZXksIHN0ck9yQXJyYXldIG9mIE9iamVjdC5lbnRyaWVzKGRlc3RRdWVyeSkpIHtcbiAgICBsZXQgdmFsdWUgPSBBcnJheS5pc0FycmF5KHN0ck9yQXJyYXkpID8gc3RyT3JBcnJheVswXSA6IHN0ck9yQXJyYXlcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIC8vIHRoZSB2YWx1ZSBuZWVkcyB0byBzdGFydCB3aXRoIGEgZm9yd2FyZC1zbGFzaCB0byBiZSBjb21waWxlZFxuICAgICAgLy8gY29ycmVjdGx5XG4gICAgICB2YWx1ZSA9IGNvbXBpbGVOb25QYXRoKHZhbHVlLCBwYXJhbXMpXG4gICAgfVxuICAgIGRlc3RRdWVyeVtrZXldID0gdmFsdWVcbiAgfVxuXG4gIC8vIGFkZCBwYXRoIHBhcmFtcyB0byBxdWVyeSBpZiBpdCdzIG5vdCBhIHJlZGlyZWN0IGFuZCBub3RcbiAgLy8gYWxyZWFkeSBkZWZpbmVkIGluIGRlc3RpbmF0aW9uIHF1ZXJ5IG9yIHBhdGhcbiAgbGV0IHBhcmFtS2V5cyA9IE9iamVjdC5rZXlzKHBhcmFtcylcblxuICAvLyByZW1vdmUgaW50ZXJuYWwgcGFyYW0gZm9yIGkxOG5cbiAgaWYgKGhhZExvY2FsZSkge1xuICAgIHBhcmFtS2V5cyA9IHBhcmFtS2V5cy5maWx0ZXIoKG5hbWUpID0+IG5hbWUgIT09ICduZXh0SW50ZXJuYWxMb2NhbGUnKVxuICB9XG5cbiAgaWYgKFxuICAgIGFwcGVuZFBhcmFtc1RvUXVlcnkgJiZcbiAgICAhcGFyYW1LZXlzLnNvbWUoKGtleSkgPT4gZGVzdFBhdGhQYXJhbXMuaW5jbHVkZXMoa2V5KSlcbiAgKSB7XG4gICAgZm9yIChjb25zdCBrZXkgb2YgcGFyYW1LZXlzKSB7XG4gICAgICBpZiAoIShrZXkgaW4gZGVzdFF1ZXJ5KSkge1xuICAgICAgICBkZXN0UXVlcnlba2V5XSA9IHBhcmFtc1trZXldXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdHJ5IHtcbiAgICBuZXdVcmwgPSBkZXN0aW5hdGlvbkNvbXBpbGVyKHBhcmFtcylcblxuICAgIGNvbnN0IFtwYXRobmFtZSwgaGFzaF0gPSBuZXdVcmwuc3BsaXQoJyMnKVxuICAgIHBhcnNlZERlc3RpbmF0aW9uLnBhdGhuYW1lID0gcGF0aG5hbWVcbiAgICBwYXJzZWREZXN0aW5hdGlvbi5oYXNoID0gYCR7aGFzaCA/ICcjJyA6ICcnfSR7aGFzaCB8fCAnJ31gXG4gICAgZGVsZXRlIChwYXJzZWREZXN0aW5hdGlvbiBhcyBhbnkpLnNlYXJjaFxuICB9IGNhdGNoIChlcnIpIHtcbiAgICBpZiAoZXJyLm1lc3NhZ2UubWF0Y2goL0V4cGVjdGVkIC4qPyB0byBub3QgcmVwZWF0LCBidXQgZ290IGFuIGFycmF5LykpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYFRvIHVzZSBhIG11bHRpLW1hdGNoIGluIHRoZSBkZXN0aW5hdGlvbiB5b3UgbXVzdCBhZGQgXFxgKlxcYCBhdCB0aGUgZW5kIG9mIHRoZSBwYXJhbSBuYW1lIHRvIHNpZ25pZnkgaXQgc2hvdWxkIHJlcGVhdC4gaHR0cHM6Ly9uZXh0anMub3JnL2RvY3MvbWVzc2FnZXMvaW52YWxpZC1tdWx0aS1tYXRjaGBcbiAgICAgIClcbiAgICB9XG4gICAgdGhyb3cgZXJyXG4gIH1cblxuICAvLyBRdWVyeSBtZXJnZSBvcmRlciBsb3dlc3QgcHJpb3JpdHkgdG8gaGlnaGVzdFxuICAvLyAxLiBpbml0aWFsIFVSTCBxdWVyeSB2YWx1ZXNcbiAgLy8gMi4gcGF0aCBzZWdtZW50IHZhbHVlc1xuICAvLyAzLiBkZXN0aW5hdGlvbiBzcGVjaWZpZWQgcXVlcnkgdmFsdWVzXG4gIHBhcnNlZERlc3RpbmF0aW9uLnF1ZXJ5ID0ge1xuICAgIC4uLnF1ZXJ5LFxuICAgIC4uLnBhcnNlZERlc3RpbmF0aW9uLnF1ZXJ5LFxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBuZXdVcmwsXG4gICAgcGFyc2VkRGVzdGluYXRpb24sXG4gIH1cbn1cbiIsImltcG9ydCB7IFBhcnNlZFVybFF1ZXJ5IH0gZnJvbSAncXVlcnlzdHJpbmcnXG5cbmV4cG9ydCBmdW5jdGlvbiBzZWFyY2hQYXJhbXNUb1VybFF1ZXJ5KFxuICBzZWFyY2hQYXJhbXM6IFVSTFNlYXJjaFBhcmFtc1xuKTogUGFyc2VkVXJsUXVlcnkge1xuICBjb25zdCBxdWVyeTogUGFyc2VkVXJsUXVlcnkgPSB7fVxuICBzZWFyY2hQYXJhbXMuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xuICAgIGlmICh0eXBlb2YgcXVlcnlba2V5XSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHF1ZXJ5W2tleV0gPSB2YWx1ZVxuICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShxdWVyeVtrZXldKSkge1xuICAgICAgOyhxdWVyeVtrZXldIGFzIHN0cmluZ1tdKS5wdXNoKHZhbHVlKVxuICAgIH0gZWxzZSB7XG4gICAgICBxdWVyeVtrZXldID0gW3F1ZXJ5W2tleV0gYXMgc3RyaW5nLCB2YWx1ZV1cbiAgICB9XG4gIH0pXG4gIHJldHVybiBxdWVyeVxufVxuXG5mdW5jdGlvbiBzdHJpbmdpZnlVcmxRdWVyeVBhcmFtKHBhcmFtOiBzdHJpbmcpOiBzdHJpbmcge1xuICBpZiAoXG4gICAgdHlwZW9mIHBhcmFtID09PSAnc3RyaW5nJyB8fFxuICAgICh0eXBlb2YgcGFyYW0gPT09ICdudW1iZXInICYmICFpc05hTihwYXJhbSkpIHx8XG4gICAgdHlwZW9mIHBhcmFtID09PSAnYm9vbGVhbidcbiAgKSB7XG4gICAgcmV0dXJuIFN0cmluZyhwYXJhbSlcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gJydcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdXJsUXVlcnlUb1NlYXJjaFBhcmFtcyhcbiAgdXJsUXVlcnk6IFBhcnNlZFVybFF1ZXJ5XG4pOiBVUkxTZWFyY2hQYXJhbXMge1xuICBjb25zdCByZXN1bHQgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKClcbiAgT2JqZWN0LmVudHJpZXModXJsUXVlcnkpLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgdmFsdWUuZm9yRWFjaCgoaXRlbSkgPT4gcmVzdWx0LmFwcGVuZChrZXksIHN0cmluZ2lmeVVybFF1ZXJ5UGFyYW0oaXRlbSkpKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHQuc2V0KGtleSwgc3RyaW5naWZ5VXJsUXVlcnlQYXJhbSh2YWx1ZSkpXG4gICAgfVxuICB9KVxuICByZXR1cm4gcmVzdWx0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3NpZ24oXG4gIHRhcmdldDogVVJMU2VhcmNoUGFyYW1zLFxuICAuLi5zZWFyY2hQYXJhbXNMaXN0OiBVUkxTZWFyY2hQYXJhbXNbXVxuKTogVVJMU2VhcmNoUGFyYW1zIHtcbiAgc2VhcmNoUGFyYW1zTGlzdC5mb3JFYWNoKChzZWFyY2hQYXJhbXMpID0+IHtcbiAgICBBcnJheS5mcm9tKHNlYXJjaFBhcmFtcy5rZXlzKCkpLmZvckVhY2goKGtleSkgPT4gdGFyZ2V0LmRlbGV0ZShrZXkpKVxuICAgIHNlYXJjaFBhcmFtcy5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB0YXJnZXQuYXBwZW5kKGtleSwgdmFsdWUpKVxuICB9KVxuICByZXR1cm4gdGFyZ2V0XG59XG4iLCJpbXBvcnQgeyBQYXJzZWRVcmxRdWVyeSB9IGZyb20gJ3F1ZXJ5c3RyaW5nJ1xuaW1wb3J0IHBhdGhNYXRjaCBmcm9tICcuL3BhdGgtbWF0Y2gnXG5pbXBvcnQgcHJlcGFyZURlc3RpbmF0aW9uLCB7IG1hdGNoSGFzIH0gZnJvbSAnLi9wcmVwYXJlLWRlc3RpbmF0aW9uJ1xuaW1wb3J0IHsgUmV3cml0ZSB9IGZyb20gJy4uLy4uLy4uLy4uL2xpYi9sb2FkLWN1c3RvbS1yb3V0ZXMnXG5pbXBvcnQgeyByZW1vdmVQYXRoVHJhaWxpbmdTbGFzaCB9IGZyb20gJy4uLy4uLy4uLy4uL2NsaWVudC9ub3JtYWxpemUtdHJhaWxpbmctc2xhc2gnXG5pbXBvcnQgeyBub3JtYWxpemVMb2NhbGVQYXRoIH0gZnJvbSAnLi4vLi4vaTE4bi9ub3JtYWxpemUtbG9jYWxlLXBhdGgnXG5pbXBvcnQgeyBwYXJzZVJlbGF0aXZlVXJsIH0gZnJvbSAnLi9wYXJzZS1yZWxhdGl2ZS11cmwnXG5pbXBvcnQgeyBkZWxCYXNlUGF0aCB9IGZyb20gJy4uL3JvdXRlcidcblxuY29uc3QgY3VzdG9tUm91dGVNYXRjaGVyID0gcGF0aE1hdGNoKHRydWUpXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlc29sdmVSZXdyaXRlcyhcbiAgYXNQYXRoOiBzdHJpbmcsXG4gIHBhZ2VzOiBzdHJpbmdbXSxcbiAgcmV3cml0ZXM6IHtcbiAgICBiZWZvcmVGaWxlczogUmV3cml0ZVtdXG4gICAgYWZ0ZXJGaWxlczogUmV3cml0ZVtdXG4gICAgZmFsbGJhY2s6IFJld3JpdGVbXVxuICB9LFxuICBxdWVyeTogUGFyc2VkVXJsUXVlcnksXG4gIHJlc29sdmVIcmVmOiAocGF0aDogc3RyaW5nKSA9PiBzdHJpbmcsXG4gIGxvY2FsZXM/OiBzdHJpbmdbXVxuKToge1xuICBtYXRjaGVkUGFnZTogYm9vbGVhblxuICBwYXJzZWRBczogUmV0dXJuVHlwZTx0eXBlb2YgcGFyc2VSZWxhdGl2ZVVybD5cbiAgYXNQYXRoOiBzdHJpbmdcbiAgcmVzb2x2ZWRIcmVmPzogc3RyaW5nXG59IHtcbiAgbGV0IG1hdGNoZWRQYWdlID0gZmFsc2VcbiAgbGV0IHBhcnNlZEFzID0gcGFyc2VSZWxhdGl2ZVVybChhc1BhdGgpXG4gIGxldCBmc1BhdGhuYW1lID0gcmVtb3ZlUGF0aFRyYWlsaW5nU2xhc2goXG4gICAgbm9ybWFsaXplTG9jYWxlUGF0aChkZWxCYXNlUGF0aChwYXJzZWRBcy5wYXRobmFtZSksIGxvY2FsZXMpLnBhdGhuYW1lXG4gIClcbiAgbGV0IHJlc29sdmVkSHJlZlxuXG4gIGNvbnN0IGhhbmRsZVJld3JpdGUgPSAocmV3cml0ZTogUmV3cml0ZSkgPT4ge1xuICAgIGNvbnN0IG1hdGNoZXIgPSBjdXN0b21Sb3V0ZU1hdGNoZXIocmV3cml0ZS5zb3VyY2UpXG4gICAgbGV0IHBhcmFtcyA9IG1hdGNoZXIocGFyc2VkQXMucGF0aG5hbWUpXG5cbiAgICBpZiAocmV3cml0ZS5oYXMgJiYgcGFyYW1zKSB7XG4gICAgICBjb25zdCBoYXNQYXJhbXMgPSBtYXRjaEhhcyhcbiAgICAgICAge1xuICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgIGhvc3Q6IGRvY3VtZW50LmxvY2F0aW9uLmhvc3RuYW1lLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgY29va2llczogZG9jdW1lbnQuY29va2llXG4gICAgICAgICAgICAuc3BsaXQoJzsgJylcbiAgICAgICAgICAgIC5yZWR1Y2U8UmVjb3JkPHN0cmluZywgc3RyaW5nPj4oKGFjYywgaXRlbSkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBba2V5LCAuLi52YWx1ZV0gPSBpdGVtLnNwbGl0KCc9JylcbiAgICAgICAgICAgICAgYWNjW2tleV0gPSB2YWx1ZS5qb2luKCc9JylcbiAgICAgICAgICAgICAgcmV0dXJuIGFjY1xuICAgICAgICAgICAgfSwge30pLFxuICAgICAgICB9IGFzIGFueSxcbiAgICAgICAgcmV3cml0ZS5oYXMsXG4gICAgICAgIHBhcnNlZEFzLnF1ZXJ5XG4gICAgICApXG5cbiAgICAgIGlmIChoYXNQYXJhbXMpIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihwYXJhbXMsIGhhc1BhcmFtcylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhcmFtcyA9IGZhbHNlXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHBhcmFtcykge1xuICAgICAgaWYgKCFyZXdyaXRlLmRlc3RpbmF0aW9uKSB7XG4gICAgICAgIC8vIHRoaXMgaXMgYSBwcm94aWVkIHJld3JpdGUgd2hpY2ggaXNuJ3QgaGFuZGxlZCBvbiB0aGUgY2xpZW50XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG4gICAgICBjb25zdCBkZXN0UmVzID0gcHJlcGFyZURlc3RpbmF0aW9uKFxuICAgICAgICByZXdyaXRlLmRlc3RpbmF0aW9uLFxuICAgICAgICBwYXJhbXMsXG4gICAgICAgIHF1ZXJ5LFxuICAgICAgICB0cnVlXG4gICAgICApXG4gICAgICBwYXJzZWRBcyA9IGRlc3RSZXMucGFyc2VkRGVzdGluYXRpb25cbiAgICAgIGFzUGF0aCA9IGRlc3RSZXMubmV3VXJsXG4gICAgICBPYmplY3QuYXNzaWduKHF1ZXJ5LCBkZXN0UmVzLnBhcnNlZERlc3RpbmF0aW9uLnF1ZXJ5KVxuXG4gICAgICBmc1BhdGhuYW1lID0gcmVtb3ZlUGF0aFRyYWlsaW5nU2xhc2goXG4gICAgICAgIG5vcm1hbGl6ZUxvY2FsZVBhdGgoZGVsQmFzZVBhdGgoYXNQYXRoKSwgbG9jYWxlcykucGF0aG5hbWVcbiAgICAgIClcblxuICAgICAgaWYgKHBhZ2VzLmluY2x1ZGVzKGZzUGF0aG5hbWUpKSB7XG4gICAgICAgIC8vIGNoZWNrIGlmIHdlIG5vdyBtYXRjaCBhIHBhZ2UgYXMgdGhpcyBtZWFucyB3ZSBhcmUgZG9uZVxuICAgICAgICAvLyByZXNvbHZpbmcgdGhlIHJld3JpdGVzXG4gICAgICAgIG1hdGNoZWRQYWdlID0gdHJ1ZVxuICAgICAgICByZXNvbHZlZEhyZWYgPSBmc1BhdGhuYW1lXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG5cbiAgICAgIC8vIGNoZWNrIGlmIHdlIG1hdGNoIGEgZHluYW1pYy1yb3V0ZSwgaWYgc28gd2UgYnJlYWsgdGhlIHJld3JpdGVzIGNoYWluXG4gICAgICByZXNvbHZlZEhyZWYgPSByZXNvbHZlSHJlZihmc1BhdGhuYW1lKVxuXG4gICAgICBpZiAocmVzb2x2ZWRIcmVmICE9PSBhc1BhdGggJiYgcGFnZXMuaW5jbHVkZXMocmVzb2x2ZWRIcmVmKSkge1xuICAgICAgICBtYXRjaGVkUGFnZSA9IHRydWVcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgbGV0IGZpbmlzaGVkID0gZmFsc2VcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHJld3JpdGVzLmJlZm9yZUZpbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgLy8gd2UgZG9uJ3QgZW5kIGFmdGVyIG1hdGNoIGluIGJlZm9yZUZpbGVzIHRvIGFsbG93XG4gICAgLy8gY29udGludWluZyB0aHJvdWdoIGFsbCBiZWZvcmVGaWxlcyByZXdyaXRlc1xuICAgIGhhbmRsZVJld3JpdGUocmV3cml0ZXMuYmVmb3JlRmlsZXNbaV0pXG4gIH1cbiAgbWF0Y2hlZFBhZ2UgPSBwYWdlcy5pbmNsdWRlcyhmc1BhdGhuYW1lKVxuXG4gIGlmICghbWF0Y2hlZFBhZ2UpIHtcbiAgICBpZiAoIWZpbmlzaGVkKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJld3JpdGVzLmFmdGVyRmlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGhhbmRsZVJld3JpdGUocmV3cml0ZXMuYWZ0ZXJGaWxlc1tpXSkpIHtcbiAgICAgICAgICBmaW5pc2hlZCA9IHRydWVcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gY2hlY2sgZHluYW1pYyByb3V0ZSBiZWZvcmUgcHJvY2Vzc2luZyBmYWxsYmFjayByZXdyaXRlc1xuICAgIGlmICghZmluaXNoZWQpIHtcbiAgICAgIHJlc29sdmVkSHJlZiA9IHJlc29sdmVIcmVmKGZzUGF0aG5hbWUpXG4gICAgICBtYXRjaGVkUGFnZSA9IHBhZ2VzLmluY2x1ZGVzKHJlc29sdmVkSHJlZilcbiAgICAgIGZpbmlzaGVkID0gbWF0Y2hlZFBhZ2VcbiAgICB9XG5cbiAgICBpZiAoIWZpbmlzaGVkKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJld3JpdGVzLmZhbGxiYWNrLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChoYW5kbGVSZXdyaXRlKHJld3JpdGVzLmZhbGxiYWNrW2ldKSkge1xuICAgICAgICAgIGZpbmlzaGVkID0gdHJ1ZVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGFzUGF0aCxcbiAgICBwYXJzZWRBcyxcbiAgICBtYXRjaGVkUGFnZSxcbiAgICByZXNvbHZlZEhyZWYsXG4gIH1cbn1cbiIsImltcG9ydCB7IGdldFJvdXRlUmVnZXggfSBmcm9tICcuL3JvdXRlLXJlZ2V4J1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Um91dGVNYXRjaGVyKHJvdXRlUmVnZXg6IFJldHVyblR5cGU8dHlwZW9mIGdldFJvdXRlUmVnZXg+KSB7XG4gIGNvbnN0IHsgcmUsIGdyb3VwcyB9ID0gcm91dGVSZWdleFxuICByZXR1cm4gKHBhdGhuYW1lOiBzdHJpbmcgfCBudWxsIHwgdW5kZWZpbmVkKSA9PiB7XG4gICAgY29uc3Qgcm91dGVNYXRjaCA9IHJlLmV4ZWMocGF0aG5hbWUhKVxuICAgIGlmICghcm91dGVNYXRjaCkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgY29uc3QgZGVjb2RlID0gKHBhcmFtOiBzdHJpbmcpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQocGFyYW0pXG4gICAgICB9IGNhdGNoIChfKSB7XG4gICAgICAgIGNvbnN0IGVycjogRXJyb3IgJiB7IGNvZGU/OiBzdHJpbmcgfSA9IG5ldyBFcnJvcihcbiAgICAgICAgICAnZmFpbGVkIHRvIGRlY29kZSBwYXJhbSdcbiAgICAgICAgKVxuICAgICAgICBlcnIuY29kZSA9ICdERUNPREVfRkFJTEVEJ1xuICAgICAgICB0aHJvdyBlcnJcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgcGFyYW1zOiB7IFtwYXJhbU5hbWU6IHN0cmluZ106IHN0cmluZyB8IHN0cmluZ1tdIH0gPSB7fVxuXG4gICAgT2JqZWN0LmtleXMoZ3JvdXBzKS5mb3JFYWNoKChzbHVnTmFtZTogc3RyaW5nKSA9PiB7XG4gICAgICBjb25zdCBnID0gZ3JvdXBzW3NsdWdOYW1lXVxuICAgICAgY29uc3QgbSA9IHJvdXRlTWF0Y2hbZy5wb3NdXG4gICAgICBpZiAobSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHBhcmFtc1tzbHVnTmFtZV0gPSB+bS5pbmRleE9mKCcvJylcbiAgICAgICAgICA/IG0uc3BsaXQoJy8nKS5tYXAoKGVudHJ5KSA9PiBkZWNvZGUoZW50cnkpKVxuICAgICAgICAgIDogZy5yZXBlYXRcbiAgICAgICAgICA/IFtkZWNvZGUobSldXG4gICAgICAgICAgOiBkZWNvZGUobSlcbiAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBwYXJhbXNcbiAgfVxufVxuIiwiZXhwb3J0IGludGVyZmFjZSBHcm91cCB7XG4gIHBvczogbnVtYmVyXG4gIHJlcGVhdDogYm9vbGVhblxuICBvcHRpb25hbDogYm9vbGVhblxufVxuXG4vLyB0aGlzIGlzbid0IGltcG9ydGluZyB0aGUgZXNjYXBlLXN0cmluZy1yZWdleCBtb2R1bGVcbi8vIHRvIHJlZHVjZSBieXRlc1xuZnVuY3Rpb24gZXNjYXBlUmVnZXgoc3RyOiBzdHJpbmcpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9bfFxcXFx7fSgpW1xcXV4kKyo/Li1dL2csICdcXFxcJCYnKVxufVxuXG5mdW5jdGlvbiBwYXJzZVBhcmFtZXRlcihwYXJhbTogc3RyaW5nKSB7XG4gIGNvbnN0IG9wdGlvbmFsID0gcGFyYW0uc3RhcnRzV2l0aCgnWycpICYmIHBhcmFtLmVuZHNXaXRoKCddJylcbiAgaWYgKG9wdGlvbmFsKSB7XG4gICAgcGFyYW0gPSBwYXJhbS5zbGljZSgxLCAtMSlcbiAgfVxuICBjb25zdCByZXBlYXQgPSBwYXJhbS5zdGFydHNXaXRoKCcuLi4nKVxuICBpZiAocmVwZWF0KSB7XG4gICAgcGFyYW0gPSBwYXJhbS5zbGljZSgzKVxuICB9XG4gIHJldHVybiB7IGtleTogcGFyYW0sIHJlcGVhdCwgb3B0aW9uYWwgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Um91dGVSZWdleChcbiAgbm9ybWFsaXplZFJvdXRlOiBzdHJpbmdcbik6IHtcbiAgcmU6IFJlZ0V4cFxuICBuYW1lZFJlZ2V4Pzogc3RyaW5nXG4gIHJvdXRlS2V5cz86IHsgW25hbWVkOiBzdHJpbmddOiBzdHJpbmcgfVxuICBncm91cHM6IHsgW2dyb3VwTmFtZTogc3RyaW5nXTogR3JvdXAgfVxufSB7XG4gIGNvbnN0IHNlZ21lbnRzID0gKG5vcm1hbGl6ZWRSb3V0ZS5yZXBsYWNlKC9cXC8kLywgJycpIHx8ICcvJylcbiAgICAuc2xpY2UoMSlcbiAgICAuc3BsaXQoJy8nKVxuXG4gIGNvbnN0IGdyb3VwczogeyBbZ3JvdXBOYW1lOiBzdHJpbmddOiBHcm91cCB9ID0ge31cbiAgbGV0IGdyb3VwSW5kZXggPSAxXG4gIGNvbnN0IHBhcmFtZXRlcml6ZWRSb3V0ZSA9IHNlZ21lbnRzXG4gICAgLm1hcCgoc2VnbWVudCkgPT4ge1xuICAgICAgaWYgKHNlZ21lbnQuc3RhcnRzV2l0aCgnWycpICYmIHNlZ21lbnQuZW5kc1dpdGgoJ10nKSkge1xuICAgICAgICBjb25zdCB7IGtleSwgb3B0aW9uYWwsIHJlcGVhdCB9ID0gcGFyc2VQYXJhbWV0ZXIoc2VnbWVudC5zbGljZSgxLCAtMSkpXG4gICAgICAgIGdyb3Vwc1trZXldID0geyBwb3M6IGdyb3VwSW5kZXgrKywgcmVwZWF0LCBvcHRpb25hbCB9XG4gICAgICAgIHJldHVybiByZXBlYXQgPyAob3B0aW9uYWwgPyAnKD86LyguKz8pKT8nIDogJy8oLis/KScpIDogJy8oW14vXSs/KSdcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBgLyR7ZXNjYXBlUmVnZXgoc2VnbWVudCl9YFxuICAgICAgfVxuICAgIH0pXG4gICAgLmpvaW4oJycpXG5cbiAgLy8gZGVhZCBjb2RlIGVsaW1pbmF0ZSBmb3IgYnJvd3NlciBzaW5jZSBpdCdzIG9ubHkgbmVlZGVkXG4gIC8vIHdoaWxlIGdlbmVyYXRpbmcgcm91dGVzLW1hbmlmZXN0XG4gIGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykge1xuICAgIGxldCByb3V0ZUtleUNoYXJDb2RlID0gOTdcbiAgICBsZXQgcm91dGVLZXlDaGFyTGVuZ3RoID0gMVxuXG4gICAgLy8gYnVpbGRzIGEgbWluaW1hbCByb3V0ZUtleSB1c2luZyBvbmx5IGEteiBhbmQgbWluaW1hbCBudW1iZXIgb2YgY2hhcmFjdGVyc1xuICAgIGNvbnN0IGdldFNhZmVSb3V0ZUtleSA9ICgpID0+IHtcbiAgICAgIGxldCByb3V0ZUtleSA9ICcnXG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcm91dGVLZXlDaGFyTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcm91dGVLZXkgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShyb3V0ZUtleUNoYXJDb2RlKVxuICAgICAgICByb3V0ZUtleUNoYXJDb2RlKytcblxuICAgICAgICBpZiAocm91dGVLZXlDaGFyQ29kZSA+IDEyMikge1xuICAgICAgICAgIHJvdXRlS2V5Q2hhckxlbmd0aCsrXG4gICAgICAgICAgcm91dGVLZXlDaGFyQ29kZSA9IDk3XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiByb3V0ZUtleVxuICAgIH1cblxuICAgIGNvbnN0IHJvdXRlS2V5czogeyBbbmFtZWQ6IHN0cmluZ106IHN0cmluZyB9ID0ge31cblxuICAgIGxldCBuYW1lZFBhcmFtZXRlcml6ZWRSb3V0ZSA9IHNlZ21lbnRzXG4gICAgICAubWFwKChzZWdtZW50KSA9PiB7XG4gICAgICAgIGlmIChzZWdtZW50LnN0YXJ0c1dpdGgoJ1snKSAmJiBzZWdtZW50LmVuZHNXaXRoKCddJykpIHtcbiAgICAgICAgICBjb25zdCB7IGtleSwgb3B0aW9uYWwsIHJlcGVhdCB9ID0gcGFyc2VQYXJhbWV0ZXIoc2VnbWVudC5zbGljZSgxLCAtMSkpXG4gICAgICAgICAgLy8gcmVwbGFjZSBhbnkgbm9uLXdvcmQgY2hhcmFjdGVycyBzaW5jZSB0aGV5IGNhbiBicmVha1xuICAgICAgICAgIC8vIHRoZSBuYW1lZCByZWdleFxuICAgICAgICAgIGxldCBjbGVhbmVkS2V5ID0ga2V5LnJlcGxhY2UoL1xcVy9nLCAnJylcbiAgICAgICAgICBsZXQgaW52YWxpZEtleSA9IGZhbHNlXG5cbiAgICAgICAgICAvLyBjaGVjayBpZiB0aGUga2V5IGlzIHN0aWxsIGludmFsaWQgYW5kIGZhbGxiYWNrIHRvIHVzaW5nIGEga25vd25cbiAgICAgICAgICAvLyBzYWZlIGtleVxuICAgICAgICAgIGlmIChjbGVhbmVkS2V5Lmxlbmd0aCA9PT0gMCB8fCBjbGVhbmVkS2V5Lmxlbmd0aCA+IDMwKSB7XG4gICAgICAgICAgICBpbnZhbGlkS2V5ID0gdHJ1ZVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIWlzTmFOKHBhcnNlSW50KGNsZWFuZWRLZXkuc3Vic3RyKDAsIDEpKSkpIHtcbiAgICAgICAgICAgIGludmFsaWRLZXkgPSB0cnVlXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGludmFsaWRLZXkpIHtcbiAgICAgICAgICAgIGNsZWFuZWRLZXkgPSBnZXRTYWZlUm91dGVLZXkoKVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHJvdXRlS2V5c1tjbGVhbmVkS2V5XSA9IGtleVxuICAgICAgICAgIHJldHVybiByZXBlYXRcbiAgICAgICAgICAgID8gb3B0aW9uYWxcbiAgICAgICAgICAgICAgPyBgKD86Lyg/PCR7Y2xlYW5lZEtleX0+Lis/KSk/YFxuICAgICAgICAgICAgICA6IGAvKD88JHtjbGVhbmVkS2V5fT4uKz8pYFxuICAgICAgICAgICAgOiBgLyg/PCR7Y2xlYW5lZEtleX0+W14vXSs/KWBcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gYC8ke2VzY2FwZVJlZ2V4KHNlZ21lbnQpfWBcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5qb2luKCcnKVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHJlOiBuZXcgUmVnRXhwKGBeJHtwYXJhbWV0ZXJpemVkUm91dGV9KD86Lyk/JGApLFxuICAgICAgZ3JvdXBzLFxuICAgICAgcm91dGVLZXlzLFxuICAgICAgbmFtZWRSZWdleDogYF4ke25hbWVkUGFyYW1ldGVyaXplZFJvdXRlfSg/Oi8pPyRgLFxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgcmU6IG5ldyBSZWdFeHAoYF4ke3BhcmFtZXRlcml6ZWRSb3V0ZX0oPzovKT8kYCksXG4gICAgZ3JvdXBzLFxuICB9XG59XG4iLCJpbXBvcnQgeyBJbmNvbWluZ01lc3NhZ2UsIFNlcnZlclJlc3BvbnNlIH0gZnJvbSAnaHR0cCdcbmltcG9ydCB7IFBhcnNlZFVybFF1ZXJ5IH0gZnJvbSAncXVlcnlzdHJpbmcnXG5pbXBvcnQgeyBDb21wb25lbnRUeXBlIH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBVcmxPYmplY3QgfSBmcm9tICd1cmwnXG5pbXBvcnQgeyBmb3JtYXRVcmwgfSBmcm9tICcuL3JvdXRlci91dGlscy9mb3JtYXQtdXJsJ1xuaW1wb3J0IHsgTmV4dFJvdXRlciB9IGZyb20gJy4vcm91dGVyL3JvdXRlcidcbmltcG9ydCB7IEVudiB9IGZyb20gJ0BuZXh0L2VudidcbmltcG9ydCB7IEJ1aWxkTWFuaWZlc3QgfSBmcm9tICcuLi9zZXJ2ZXIvZ2V0LXBhZ2UtZmlsZXMnXG5pbXBvcnQgeyBEb21haW5Mb2NhbGVzIH0gZnJvbSAnLi4vc2VydmVyL2NvbmZpZydcbmltcG9ydCB7IFByZXZpZXdEYXRhIH0gZnJvbSAnbmV4dC90eXBlcydcblxuLyoqXG4gKiBUeXBlcyB1c2VkIGJ5IGJvdGggbmV4dCBhbmQgbmV4dC1zZXJ2ZXJcbiAqL1xuXG5leHBvcnQgdHlwZSBOZXh0Q29tcG9uZW50VHlwZTxcbiAgQyBleHRlbmRzIEJhc2VDb250ZXh0ID0gTmV4dFBhZ2VDb250ZXh0LFxuICBJUCA9IHt9LFxuICBQID0ge31cbj4gPSBDb21wb25lbnRUeXBlPFA+ICYge1xuICAvKipcbiAgICogVXNlZCBmb3IgaW5pdGlhbCBwYWdlIGxvYWQgZGF0YSBwb3B1bGF0aW9uLiBEYXRhIHJldHVybmVkIGZyb20gYGdldEluaXRpYWxQcm9wc2AgaXMgc2VyaWFsaXplZCB3aGVuIHNlcnZlciByZW5kZXJlZC5cbiAgICogTWFrZSBzdXJlIHRvIHJldHVybiBwbGFpbiBgT2JqZWN0YCB3aXRob3V0IHVzaW5nIGBEYXRlYCwgYE1hcGAsIGBTZXRgLlxuICAgKiBAcGFyYW0gY3R4IENvbnRleHQgb2YgYHBhZ2VgXG4gICAqL1xuICBnZXRJbml0aWFsUHJvcHM/KGNvbnRleHQ6IEMpOiBJUCB8IFByb21pc2U8SVA+XG59XG5cbmV4cG9ydCB0eXBlIERvY3VtZW50VHlwZSA9IE5leHRDb21wb25lbnRUeXBlPFxuICBEb2N1bWVudENvbnRleHQsXG4gIERvY3VtZW50SW5pdGlhbFByb3BzLFxuICBEb2N1bWVudFByb3BzXG4+ICYge1xuICByZW5kZXJEb2N1bWVudChcbiAgICBEb2N1bWVudDogRG9jdW1lbnRUeXBlLFxuICAgIHByb3BzOiBEb2N1bWVudFByb3BzXG4gICk6IFJlYWN0LlJlYWN0RWxlbWVudFxufVxuXG5leHBvcnQgdHlwZSBBcHBUeXBlID0gTmV4dENvbXBvbmVudFR5cGU8XG4gIEFwcENvbnRleHRUeXBlLFxuICBBcHBJbml0aWFsUHJvcHMsXG4gIEFwcFByb3BzVHlwZVxuPlxuXG5leHBvcnQgdHlwZSBBcHBUcmVlVHlwZSA9IENvbXBvbmVudFR5cGU8XG4gIEFwcEluaXRpYWxQcm9wcyAmIHsgW25hbWU6IHN0cmluZ106IGFueSB9XG4+XG5cbi8qKlxuICogV2ViIHZpdGFscyBwcm92aWRlZCB0byBfYXBwLnJlcG9ydFdlYlZpdGFscyBieSBDb3JlIFdlYiBWaXRhbHMgcGx1Z2luIGRldmVsb3BlZCBieSBHb29nbGUgQ2hyb21lIHRlYW0uXG4gKiBodHRwczovL25leHRqcy5vcmcvYmxvZy9uZXh0LTktNCNpbnRlZ3JhdGVkLXdlYi12aXRhbHMtcmVwb3J0aW5nXG4gKi9cbmV4cG9ydCB0eXBlIE5leHRXZWJWaXRhbHNNZXRyaWMgPSB7XG4gIGlkOiBzdHJpbmdcbiAgbGFiZWw6IHN0cmluZ1xuICBuYW1lOiBzdHJpbmdcbiAgc3RhcnRUaW1lOiBudW1iZXJcbiAgdmFsdWU6IG51bWJlclxufVxuXG5leHBvcnQgdHlwZSBFbmhhbmNlcjxDPiA9IChDb21wb25lbnQ6IEMpID0+IENcblxuZXhwb3J0IHR5cGUgQ29tcG9uZW50c0VuaGFuY2VyID1cbiAgfCB7XG4gICAgICBlbmhhbmNlQXBwPzogRW5oYW5jZXI8QXBwVHlwZT5cbiAgICAgIGVuaGFuY2VDb21wb25lbnQ/OiBFbmhhbmNlcjxOZXh0Q29tcG9uZW50VHlwZT5cbiAgICB9XG4gIHwgRW5oYW5jZXI8TmV4dENvbXBvbmVudFR5cGU+XG5cbmV4cG9ydCB0eXBlIFJlbmRlclBhZ2VSZXN1bHQgPSB7XG4gIGh0bWw6IHN0cmluZ1xuICBoZWFkPzogQXJyYXk8SlNYLkVsZW1lbnQgfCBudWxsPlxufVxuXG5leHBvcnQgdHlwZSBSZW5kZXJQYWdlID0gKFxuICBvcHRpb25zPzogQ29tcG9uZW50c0VuaGFuY2VyXG4pID0+IFJlbmRlclBhZ2VSZXN1bHQgfCBQcm9taXNlPFJlbmRlclBhZ2VSZXN1bHQ+XG5cbmV4cG9ydCB0eXBlIEJhc2VDb250ZXh0ID0ge1xuICByZXM/OiBTZXJ2ZXJSZXNwb25zZVxuICBbazogc3RyaW5nXTogYW55XG59XG5cbmV4cG9ydCB0eXBlIE5FWFRfREFUQSA9IHtcbiAgcHJvcHM6IFJlY29yZDxzdHJpbmcsIGFueT5cbiAgcGFnZTogc3RyaW5nXG4gIHF1ZXJ5OiBQYXJzZWRVcmxRdWVyeVxuICBidWlsZElkOiBzdHJpbmdcbiAgYXNzZXRQcmVmaXg/OiBzdHJpbmdcbiAgcnVudGltZUNvbmZpZz86IHsgW2tleTogc3RyaW5nXTogYW55IH1cbiAgbmV4dEV4cG9ydD86IGJvb2xlYW5cbiAgYXV0b0V4cG9ydD86IGJvb2xlYW5cbiAgaXNGYWxsYmFjaz86IGJvb2xlYW5cbiAgZHluYW1pY0lkcz86IChzdHJpbmcgfCBudW1iZXIpW11cbiAgZXJyPzogRXJyb3IgJiB7IHN0YXR1c0NvZGU/OiBudW1iZXIgfVxuICBnc3A/OiBib29sZWFuXG4gIGdzc3A/OiBib29sZWFuXG4gIGN1c3RvbVNlcnZlcj86IGJvb2xlYW5cbiAgZ2lwPzogYm9vbGVhblxuICBhcHBHaXA/OiBib29sZWFuXG4gIGxvY2FsZT86IHN0cmluZ1xuICBsb2NhbGVzPzogc3RyaW5nW11cbiAgZGVmYXVsdExvY2FsZT86IHN0cmluZ1xuICBkb21haW5Mb2NhbGVzPzogRG9tYWluTG9jYWxlc1xuICBzY3JpcHRMb2FkZXI/OiBhbnlbXVxuICBpc1ByZXZpZXc/OiBib29sZWFuXG59XG5cbi8qKlxuICogYE5leHRgIGNvbnRleHRcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBOZXh0UGFnZUNvbnRleHQge1xuICAvKipcbiAgICogRXJyb3Igb2JqZWN0IGlmIGVuY291bnRlcmVkIGR1cmluZyByZW5kZXJpbmdcbiAgICovXG4gIGVycj86IChFcnJvciAmIHsgc3RhdHVzQ29kZT86IG51bWJlciB9KSB8IG51bGxcbiAgLyoqXG4gICAqIGBIVFRQYCByZXF1ZXN0IG9iamVjdC5cbiAgICovXG4gIHJlcT86IEluY29taW5nTWVzc2FnZVxuICAvKipcbiAgICogYEhUVFBgIHJlc3BvbnNlIG9iamVjdC5cbiAgICovXG4gIHJlcz86IFNlcnZlclJlc3BvbnNlXG4gIC8qKlxuICAgKiBQYXRoIHNlY3Rpb24gb2YgYFVSTGAuXG4gICAqL1xuICBwYXRobmFtZTogc3RyaW5nXG4gIC8qKlxuICAgKiBRdWVyeSBzdHJpbmcgc2VjdGlvbiBvZiBgVVJMYCBwYXJzZWQgYXMgYW4gb2JqZWN0LlxuICAgKi9cbiAgcXVlcnk6IFBhcnNlZFVybFF1ZXJ5XG4gIC8qKlxuICAgKiBgU3RyaW5nYCBvZiB0aGUgYWN0dWFsIHBhdGggaW5jbHVkaW5nIHF1ZXJ5LlxuICAgKi9cbiAgYXNQYXRoPzogc3RyaW5nXG4gIC8qKlxuICAgKiBUaGUgY3VycmVudGx5IGFjdGl2ZSBsb2NhbGVcbiAgICovXG4gIGxvY2FsZT86IHN0cmluZ1xuICAvKipcbiAgICogQWxsIGNvbmZpZ3VyZWQgbG9jYWxlc1xuICAgKi9cbiAgbG9jYWxlcz86IHN0cmluZ1tdXG4gIC8qKlxuICAgKiBUaGUgY29uZmlndXJlZCBkZWZhdWx0IGxvY2FsZVxuICAgKi9cbiAgZGVmYXVsdExvY2FsZT86IHN0cmluZ1xuICAvKipcbiAgICogYENvbXBvbmVudGAgdGhlIHRyZWUgb2YgdGhlIEFwcCB0byB1c2UgaWYgbmVlZGluZyB0byByZW5kZXIgc2VwYXJhdGVseVxuICAgKi9cbiAgQXBwVHJlZTogQXBwVHJlZVR5cGVcbn1cblxuZXhwb3J0IHR5cGUgQXBwQ29udGV4dFR5cGU8UiBleHRlbmRzIE5leHRSb3V0ZXIgPSBOZXh0Um91dGVyPiA9IHtcbiAgQ29tcG9uZW50OiBOZXh0Q29tcG9uZW50VHlwZTxOZXh0UGFnZUNvbnRleHQ+XG4gIEFwcFRyZWU6IEFwcFRyZWVUeXBlXG4gIGN0eDogTmV4dFBhZ2VDb250ZXh0XG4gIHJvdXRlcjogUlxufVxuXG5leHBvcnQgdHlwZSBBcHBJbml0aWFsUHJvcHMgPSB7XG4gIHBhZ2VQcm9wczogYW55XG59XG5cbmV4cG9ydCB0eXBlIEFwcFByb3BzVHlwZTxcbiAgUiBleHRlbmRzIE5leHRSb3V0ZXIgPSBOZXh0Um91dGVyLFxuICBQID0ge31cbj4gPSBBcHBJbml0aWFsUHJvcHMgJiB7XG4gIENvbXBvbmVudDogTmV4dENvbXBvbmVudFR5cGU8TmV4dFBhZ2VDb250ZXh0LCBhbnksIFA+XG4gIHJvdXRlcjogUlxuICBfX05fU1NHPzogYm9vbGVhblxuICBfX05fU1NQPzogYm9vbGVhblxufVxuXG5leHBvcnQgdHlwZSBEb2N1bWVudENvbnRleHQgPSBOZXh0UGFnZUNvbnRleHQgJiB7XG4gIHJlbmRlclBhZ2U6IFJlbmRlclBhZ2Vcbn1cblxuZXhwb3J0IHR5cGUgRG9jdW1lbnRJbml0aWFsUHJvcHMgPSBSZW5kZXJQYWdlUmVzdWx0ICYge1xuICBzdHlsZXM/OiBSZWFjdC5SZWFjdEVsZW1lbnRbXSB8IFJlYWN0LlJlYWN0RnJhZ21lbnRcbn1cblxuZXhwb3J0IHR5cGUgRG9jdW1lbnRQcm9wcyA9IERvY3VtZW50SW5pdGlhbFByb3BzICYge1xuICBfX05FWFRfREFUQV9fOiBORVhUX0RBVEFcbiAgZGFuZ2Vyb3VzQXNQYXRoOiBzdHJpbmdcbiAgZG9jQ29tcG9uZW50c1JlbmRlcmVkOiB7XG4gICAgSHRtbD86IGJvb2xlYW5cbiAgICBNYWluPzogYm9vbGVhblxuICAgIEhlYWQ/OiBib29sZWFuXG4gICAgTmV4dFNjcmlwdD86IGJvb2xlYW5cbiAgfVxuICBidWlsZE1hbmlmZXN0OiBCdWlsZE1hbmlmZXN0XG4gIGFtcFBhdGg6IHN0cmluZ1xuICBpbkFtcE1vZGU6IGJvb2xlYW5cbiAgaHlicmlkQW1wOiBib29sZWFuXG4gIGlzRGV2ZWxvcG1lbnQ6IGJvb2xlYW5cbiAgZHluYW1pY0ltcG9ydHM6IHN0cmluZ1tdXG4gIGFzc2V0UHJlZml4Pzogc3RyaW5nXG4gIGNhbm9uaWNhbEJhc2U6IHN0cmluZ1xuICBoZWFkVGFnczogYW55W11cbiAgdW5zdGFibGVfcnVudGltZUpTPzogZmFsc2VcbiAgdW5zdGFibGVfSnNQcmVsb2FkPzogZmFsc2VcbiAgZGV2T25seUNhY2hlQnVzdGVyUXVlcnlTdHJpbmc6IHN0cmluZ1xuICBzY3JpcHRMb2FkZXI6IHsgYWZ0ZXJJbnRlcmFjdGl2ZT86IHN0cmluZ1tdOyBiZWZvcmVJbnRlcmFjdGl2ZT86IGFueVtdIH1cbiAgbG9jYWxlPzogc3RyaW5nXG4gIGRpc2FibGVPcHRpbWl6ZWRMb2FkaW5nPzogYm9vbGVhblxufVxuXG4vKipcbiAqIE5leHQgYEFQSWAgcm91dGUgcmVxdWVzdFxuICovXG5leHBvcnQgaW50ZXJmYWNlIE5leHRBcGlSZXF1ZXN0IGV4dGVuZHMgSW5jb21pbmdNZXNzYWdlIHtcbiAgLyoqXG4gICAqIE9iamVjdCBvZiBgcXVlcnlgIHZhbHVlcyBmcm9tIHVybFxuICAgKi9cbiAgcXVlcnk6IHtcbiAgICBba2V5OiBzdHJpbmddOiBzdHJpbmcgfCBzdHJpbmdbXVxuICB9XG4gIC8qKlxuICAgKiBPYmplY3Qgb2YgYGNvb2tpZXNgIGZyb20gaGVhZGVyXG4gICAqL1xuICBjb29raWVzOiB7XG4gICAgW2tleTogc3RyaW5nXTogc3RyaW5nXG4gIH1cblxuICBib2R5OiBhbnlcblxuICBlbnY6IEVudlxuXG4gIHByZXZpZXc/OiBib29sZWFuXG4gIC8qKlxuICAgKiBQcmV2aWV3IGRhdGEgc2V0IG9uIHRoZSByZXF1ZXN0LCBpZiBhbnlcbiAgICogKi9cbiAgcHJldmlld0RhdGE/OiBQcmV2aWV3RGF0YVxufVxuXG4vKipcbiAqIFNlbmQgYm9keSBvZiByZXNwb25zZVxuICovXG50eXBlIFNlbmQ8VD4gPSAoYm9keTogVCkgPT4gdm9pZFxuXG4vKipcbiAqIE5leHQgYEFQSWAgcm91dGUgcmVzcG9uc2VcbiAqL1xuZXhwb3J0IHR5cGUgTmV4dEFwaVJlc3BvbnNlPFQgPSBhbnk+ID0gU2VydmVyUmVzcG9uc2UgJiB7XG4gIC8qKlxuICAgKiBTZW5kIGRhdGEgYGFueWAgZGF0YSBpbiByZXNwb25zZVxuICAgKi9cbiAgc2VuZDogU2VuZDxUPlxuICAvKipcbiAgICogU2VuZCBkYXRhIGBqc29uYCBkYXRhIGluIHJlc3BvbnNlXG4gICAqL1xuICBqc29uOiBTZW5kPFQ+XG4gIHN0YXR1czogKHN0YXR1c0NvZGU6IG51bWJlcikgPT4gTmV4dEFwaVJlc3BvbnNlPFQ+XG4gIHJlZGlyZWN0KHVybDogc3RyaW5nKTogTmV4dEFwaVJlc3BvbnNlPFQ+XG4gIHJlZGlyZWN0KHN0YXR1czogbnVtYmVyLCB1cmw6IHN0cmluZyk6IE5leHRBcGlSZXNwb25zZTxUPlxuXG4gIC8qKlxuICAgKiBTZXQgcHJldmlldyBkYXRhIGZvciBOZXh0LmpzJyBwcmVyZW5kZXIgbW9kZVxuICAgKi9cbiAgc2V0UHJldmlld0RhdGE6IChcbiAgICBkYXRhOiBvYmplY3QgfCBzdHJpbmcsXG4gICAgb3B0aW9ucz86IHtcbiAgICAgIC8qKlxuICAgICAgICogU3BlY2lmaWVzIHRoZSBudW1iZXIgKGluIHNlY29uZHMpIGZvciB0aGUgcHJldmlldyBzZXNzaW9uIHRvIGxhc3QgZm9yLlxuICAgICAgICogVGhlIGdpdmVuIG51bWJlciB3aWxsIGJlIGNvbnZlcnRlZCB0byBhbiBpbnRlZ2VyIGJ5IHJvdW5kaW5nIGRvd24uXG4gICAgICAgKiBCeSBkZWZhdWx0LCBubyBtYXhpbXVtIGFnZSBpcyBzZXQgYW5kIHRoZSBwcmV2aWV3IHNlc3Npb24gZmluaXNoZXNcbiAgICAgICAqIHdoZW4gdGhlIGNsaWVudCBzaHV0cyBkb3duIChicm93c2VyIGlzIGNsb3NlZCkuXG4gICAgICAgKi9cbiAgICAgIG1heEFnZT86IG51bWJlclxuICAgIH1cbiAgKSA9PiBOZXh0QXBpUmVzcG9uc2U8VD5cbiAgY2xlYXJQcmV2aWV3RGF0YTogKCkgPT4gTmV4dEFwaVJlc3BvbnNlPFQ+XG59XG5cbi8qKlxuICogTmV4dCBgQVBJYCByb3V0ZSBoYW5kbGVyXG4gKi9cbmV4cG9ydCB0eXBlIE5leHRBcGlIYW5kbGVyPFQgPSBhbnk+ID0gKFxuICByZXE6IE5leHRBcGlSZXF1ZXN0LFxuICByZXM6IE5leHRBcGlSZXNwb25zZTxUPlxuKSA9PiB2b2lkIHwgUHJvbWlzZTx2b2lkPlxuXG4vKipcbiAqIFV0aWxzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBleGVjT25jZTxUIGV4dGVuZHMgKC4uLmFyZ3M6IGFueVtdKSA9PiBSZXR1cm5UeXBlPFQ+PihcbiAgZm46IFRcbik6IFQge1xuICBsZXQgdXNlZCA9IGZhbHNlXG4gIGxldCByZXN1bHQ6IFJldHVyblR5cGU8VD5cblxuICByZXR1cm4gKCguLi5hcmdzOiBhbnlbXSkgPT4ge1xuICAgIGlmICghdXNlZCkge1xuICAgICAgdXNlZCA9IHRydWVcbiAgICAgIHJlc3VsdCA9IGZuKC4uLmFyZ3MpXG4gICAgfVxuICAgIHJldHVybiByZXN1bHRcbiAgfSkgYXMgVFxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TG9jYXRpb25PcmlnaW4oKSB7XG4gIGNvbnN0IHsgcHJvdG9jb2wsIGhvc3RuYW1lLCBwb3J0IH0gPSB3aW5kb3cubG9jYXRpb25cbiAgcmV0dXJuIGAke3Byb3RvY29sfS8vJHtob3N0bmFtZX0ke3BvcnQgPyAnOicgKyBwb3J0IDogJyd9YFxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VVJMKCkge1xuICBjb25zdCB7IGhyZWYgfSA9IHdpbmRvdy5sb2NhdGlvblxuICBjb25zdCBvcmlnaW4gPSBnZXRMb2NhdGlvbk9yaWdpbigpXG4gIHJldHVybiBocmVmLnN1YnN0cmluZyhvcmlnaW4ubGVuZ3RoKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGlzcGxheU5hbWU8UD4oQ29tcG9uZW50OiBDb21wb25lbnRUeXBlPFA+KSB7XG4gIHJldHVybiB0eXBlb2YgQ29tcG9uZW50ID09PSAnc3RyaW5nJ1xuICAgID8gQ29tcG9uZW50XG4gICAgOiBDb21wb25lbnQuZGlzcGxheU5hbWUgfHwgQ29tcG9uZW50Lm5hbWUgfHwgJ1Vua25vd24nXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1Jlc1NlbnQocmVzOiBTZXJ2ZXJSZXNwb25zZSkge1xuICByZXR1cm4gcmVzLmZpbmlzaGVkIHx8IHJlcy5oZWFkZXJzU2VudFxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbG9hZEdldEluaXRpYWxQcm9wczxcbiAgQyBleHRlbmRzIEJhc2VDb250ZXh0LFxuICBJUCA9IHt9LFxuICBQID0ge31cbj4oQXBwOiBOZXh0Q29tcG9uZW50VHlwZTxDLCBJUCwgUD4sIGN0eDogQyk6IFByb21pc2U8SVA+IHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBpZiAoQXBwLnByb3RvdHlwZT8uZ2V0SW5pdGlhbFByb3BzKSB7XG4gICAgICBjb25zdCBtZXNzYWdlID0gYFwiJHtnZXREaXNwbGF5TmFtZShcbiAgICAgICAgQXBwXG4gICAgICApfS5nZXRJbml0aWFsUHJvcHMoKVwiIGlzIGRlZmluZWQgYXMgYW4gaW5zdGFuY2UgbWV0aG9kIC0gdmlzaXQgaHR0cHM6Ly9uZXh0anMub3JnL2RvY3MvbWVzc2FnZXMvZ2V0LWluaXRpYWwtcHJvcHMtYXMtYW4taW5zdGFuY2UtbWV0aG9kIGZvciBtb3JlIGluZm9ybWF0aW9uLmBcbiAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKVxuICAgIH1cbiAgfVxuICAvLyB3aGVuIGNhbGxlZCBmcm9tIF9hcHAgYGN0eGAgaXMgbmVzdGVkIGluIGBjdHhgXG4gIGNvbnN0IHJlcyA9IGN0eC5yZXMgfHwgKGN0eC5jdHggJiYgY3R4LmN0eC5yZXMpXG5cbiAgaWYgKCFBcHAuZ2V0SW5pdGlhbFByb3BzKSB7XG4gICAgaWYgKGN0eC5jdHggJiYgY3R4LkNvbXBvbmVudCkge1xuICAgICAgLy8gQHRzLWlnbm9yZSBwYWdlUHJvcHMgZGVmYXVsdFxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcGFnZVByb3BzOiBhd2FpdCBsb2FkR2V0SW5pdGlhbFByb3BzKGN0eC5Db21wb25lbnQsIGN0eC5jdHgpLFxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4ge30gYXMgSVBcbiAgfVxuXG4gIGNvbnN0IHByb3BzID0gYXdhaXQgQXBwLmdldEluaXRpYWxQcm9wcyhjdHgpXG5cbiAgaWYgKHJlcyAmJiBpc1Jlc1NlbnQocmVzKSkge1xuICAgIHJldHVybiBwcm9wc1xuICB9XG5cbiAgaWYgKCFwcm9wcykge1xuICAgIGNvbnN0IG1lc3NhZ2UgPSBgXCIke2dldERpc3BsYXlOYW1lKFxuICAgICAgQXBwXG4gICAgKX0uZ2V0SW5pdGlhbFByb3BzKClcIiBzaG91bGQgcmVzb2x2ZSB0byBhbiBvYmplY3QuIEJ1dCBmb3VuZCBcIiR7cHJvcHN9XCIgaW5zdGVhZC5gXG4gICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpXG4gIH1cblxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGlmIChPYmplY3Qua2V5cyhwcm9wcykubGVuZ3RoID09PSAwICYmICFjdHguY3R4KSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgIGAke2dldERpc3BsYXlOYW1lKFxuICAgICAgICAgIEFwcFxuICAgICAgICApfSByZXR1cm5lZCBhbiBlbXB0eSBvYmplY3QgZnJvbSBcXGBnZXRJbml0aWFsUHJvcHNcXGAuIFRoaXMgZGUtb3B0aW1pemVzIGFuZCBwcmV2ZW50cyBhdXRvbWF0aWMgc3RhdGljIG9wdGltaXphdGlvbi4gaHR0cHM6Ly9uZXh0anMub3JnL2RvY3MvbWVzc2FnZXMvZW1wdHktb2JqZWN0LWdldEluaXRpYWxQcm9wc2BcbiAgICAgIClcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcHJvcHNcbn1cblxuZXhwb3J0IGNvbnN0IHVybE9iamVjdEtleXMgPSBbXG4gICdhdXRoJyxcbiAgJ2hhc2gnLFxuICAnaG9zdCcsXG4gICdob3N0bmFtZScsXG4gICdocmVmJyxcbiAgJ3BhdGgnLFxuICAncGF0aG5hbWUnLFxuICAncG9ydCcsXG4gICdwcm90b2NvbCcsXG4gICdxdWVyeScsXG4gICdzZWFyY2gnLFxuICAnc2xhc2hlcycsXG5dXG5cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXRXaXRoVmFsaWRhdGlvbih1cmw6IFVybE9iamVjdCk6IHN0cmluZyB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jykge1xuICAgIGlmICh1cmwgIT09IG51bGwgJiYgdHlwZW9mIHVybCA9PT0gJ29iamVjdCcpIHtcbiAgICAgIE9iamVjdC5rZXlzKHVybCkuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgIGlmICh1cmxPYmplY3RLZXlzLmluZGV4T2Yoa2V5KSA9PT0gLTEpIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgICBgVW5rbm93biBrZXkgcGFzc2VkIHZpYSB1cmxPYmplY3QgaW50byB1cmwuZm9ybWF0OiAke2tleX1gXG4gICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmb3JtYXRVcmwodXJsKVxufVxuXG5leHBvcnQgY29uc3QgU1AgPSB0eXBlb2YgcGVyZm9ybWFuY2UgIT09ICd1bmRlZmluZWQnXG5leHBvcnQgY29uc3QgU1QgPVxuICBTUCAmJlxuICB0eXBlb2YgcGVyZm9ybWFuY2UubWFyayA9PT0gJ2Z1bmN0aW9uJyAmJlxuICB0eXBlb2YgcGVyZm9ybWFuY2UubWVhc3VyZSA9PT0gJ2Z1bmN0aW9uJ1xuIiwiXCJ1c2Ugc3RyaWN0XCI7ZXhwb3J0cy5fX2VzTW9kdWxlPXRydWU7ZXhwb3J0cy5ub3JtYWxpemVQYXRoU2VwPW5vcm1hbGl6ZVBhdGhTZXA7ZXhwb3J0cy5kZW5vcm1hbGl6ZVBhZ2VQYXRoPWRlbm9ybWFsaXplUGFnZVBhdGg7ZnVuY3Rpb24gbm9ybWFsaXplUGF0aFNlcChwYXRoKXtyZXR1cm4gcGF0aC5yZXBsYWNlKC9cXFxcL2csJy8nKTt9ZnVuY3Rpb24gZGVub3JtYWxpemVQYWdlUGF0aChwYWdlKXtwYWdlPW5vcm1hbGl6ZVBhdGhTZXAocGFnZSk7aWYocGFnZS5zdGFydHNXaXRoKCcvaW5kZXgvJykpe3BhZ2U9cGFnZS5zbGljZSg2KTt9ZWxzZSBpZihwYWdlPT09Jy9pbmRleCcpe3BhZ2U9Jy8nO31yZXR1cm4gcGFnZTt9XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kZW5vcm1hbGl6ZS1wYWdlLXBhdGguanMubWFwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Rpc3QvY2xpZW50L2xpbmsnKVxuIiwiZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHtcbiAgICBcImRlZmF1bHRcIjogb2JqXG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdDsiLCJ2YXIgX3R5cGVvZiA9IHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL3R5cGVvZlwiKTtcblxuZnVuY3Rpb24gX2dldFJlcXVpcmVXaWxkY2FyZENhY2hlKCkge1xuICBpZiAodHlwZW9mIFdlYWtNYXAgIT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIG51bGw7XG4gIHZhciBjYWNoZSA9IG5ldyBXZWFrTWFwKCk7XG5cbiAgX2dldFJlcXVpcmVXaWxkY2FyZENhY2hlID0gZnVuY3Rpb24gX2dldFJlcXVpcmVXaWxkY2FyZENhY2hlKCkge1xuICAgIHJldHVybiBjYWNoZTtcbiAgfTtcblxuICByZXR1cm4gY2FjaGU7XG59XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKG9iaikge1xuICBpZiAob2JqICYmIG9iai5fX2VzTW9kdWxlKSB7XG4gICAgcmV0dXJuIG9iajtcbiAgfVxuXG4gIGlmIChvYmogPT09IG51bGwgfHwgX3R5cGVvZihvYmopICE9PSBcIm9iamVjdFwiICYmIHR5cGVvZiBvYmogIT09IFwiZnVuY3Rpb25cIikge1xuICAgIHJldHVybiB7XG4gICAgICBcImRlZmF1bHRcIjogb2JqXG4gICAgfTtcbiAgfVxuXG4gIHZhciBjYWNoZSA9IF9nZXRSZXF1aXJlV2lsZGNhcmRDYWNoZSgpO1xuXG4gIGlmIChjYWNoZSAmJiBjYWNoZS5oYXMob2JqKSkge1xuICAgIHJldHVybiBjYWNoZS5nZXQob2JqKTtcbiAgfVxuXG4gIHZhciBuZXdPYmogPSB7fTtcbiAgdmFyIGhhc1Byb3BlcnR5RGVzY3JpcHRvciA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSAmJiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuXG4gIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkge1xuICAgICAgdmFyIGRlc2MgPSBoYXNQcm9wZXJ0eURlc2NyaXB0b3IgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwga2V5KSA6IG51bGw7XG5cbiAgICAgIGlmIChkZXNjICYmIChkZXNjLmdldCB8fCBkZXNjLnNldCkpIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG5ld09iaiwga2V5LCBkZXNjKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5ld09ialtrZXldID0gb2JqW2tleV07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbmV3T2JqW1wiZGVmYXVsdFwiXSA9IG9iajtcblxuICBpZiAoY2FjaGUpIHtcbiAgICBjYWNoZS5zZXQob2JqLCBuZXdPYmopO1xuICB9XG5cbiAgcmV0dXJuIG5ld09iajtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZDsiLCJmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICBcIkBiYWJlbC9oZWxwZXJzIC0gdHlwZW9mXCI7XG5cbiAgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgICAgIHJldHVybiB0eXBlb2Ygb2JqO1xuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgICAgIHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqO1xuICAgIH07XG4gIH1cblxuICByZXR1cm4gX3R5cGVvZihvYmopO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF90eXBlb2Y7IiwiaW1wb3J0IHsgdXNlRWZmZWN0IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tIFwibmV4dC9yb3V0ZXJcIjtcbmltcG9ydCB7IHVzZUF1dGggfSBmcm9tIFwiLi4vY29udGV4dC9BdXRoVXNlckNvbnRleHRcIjtcbmltcG9ydCB7IENvbnRhaW5lciB9IGZyb20gXCJyZWFjdC1ib290c3RyYXBcIjtcblxuY29uc3QgTG9nZ2VkSW4gPSAoeyBjaGlsZHJlbiB9KSA9PiB7XG4gIGNvbnN0IHsgYXV0aFVzZXIsIGxvYWRpbmcgfSA9IHVzZUF1dGgoKTtcbiAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XG5cbiAgLy8gUmVkaXJlY3Qgb25seSBhZnRlciBhIHNob3J0IGRlbGF5IGlmIGF1dGhVc2VyIHJlbWFpbnMgbnVsbC5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zb2xlLmxvZyhcIj09PSBMT0dHRURJTiBBVVRIIENIRUNLID09PVwiKTtcbiAgICBjb25zb2xlLmxvZyhcImxvYWRpbmc6XCIsIGxvYWRpbmcpO1xuICAgIGNvbnNvbGUubG9nKFwiYXV0aFVzZXI6XCIsIGF1dGhVc2VyKTtcbiAgICBjb25zb2xlLmxvZyhcInJvdXRlci5hc1BhdGg6XCIsIHJvdXRlci5hc1BhdGgpO1xuXG4gICAgaWYgKCFsb2FkaW5nICYmIGF1dGhVc2VyID09PSBudWxsKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIk5vIGF1dGggdXNlciwgd2lsbCByZWRpcmVjdCB0byBsb2dpbiBpbiA4MDBtc1wiKTtcbiAgICAgIC8vIFNldCBhIGRlbGF5IChlLmcuIDUwMG1zKSB0byBnaXZlIEZpcmViYXNlIEF1dGggYSBjaGFuY2UgdG8gcmVoeWRyYXRlLlxuICAgICAgY29uc3QgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJSZWRpcmVjdGluZyB0byBsb2dpbiBub3dcIik7XG4gICAgICAgIHJvdXRlci5wdXNoKGAvP3JlZGlyZWN0PSR7ZW5jb2RlVVJJQ29tcG9uZW50KHJvdXRlci5hc1BhdGgpfWApO1xuICAgICAgfSwgODAwKTtcbiAgICAgIHJldHVybiAoKSA9PiBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgIH1cbiAgfSwgW2F1dGhVc2VyLCBsb2FkaW5nLCByb3V0ZXJdKTtcblxuICBpZiAobG9hZGluZykge1xuICAgIHJldHVybiAoXG4gICAgICA8Q29udGFpbmVyXG4gICAgICAgIGNsYXNzTmFtZT1cImQtZmxleCBhbGlnbi1pdGVtcy1jZW50ZXIganVzdGlmeS1jb250ZW50LWNlbnRlclwiXG4gICAgICAgIHN0eWxlPXt7IG1pbkhlaWdodDogXCIxMDB2aFwiIH19XG4gICAgICA+XG4gICAgICAgIDxoMz5Mb2FkaW5nLi4uPC9oMz5cbiAgICAgIDwvQ29udGFpbmVyPlxuICAgICk7XG4gIH1cblxuICByZXR1cm4gPD57YXV0aFVzZXIgJiYgY2hpbGRyZW59PC8+O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgTG9nZ2VkSW47XG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSwgdXNlUmVmLCB1c2VDYWxsYmFjayB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHtcbiAgSW5wdXRHcm91cCxcbiAgRHJvcGRvd24sXG4gIEZvcm1Db250cm9sLFxuICBCdXR0b24sXG4gIE5hdkRyb3Bkb3duLFxuICBGb3JtLFxuICBNb2RhbCxcbiAgUGFnaW5hdGlvbixcbiAgT2ZmY2FudmFzLFxufSBmcm9tIFwicmVhY3QtYm9vdHN0cmFwXCI7XG5pbXBvcnQgTGluayBmcm9tIFwibmV4dC9saW5rXCI7XG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tIFwibmV4dC9yb3V0ZXJcIjtcbmltcG9ydCB7XG4gIGZldGNoUGFydHNXaXRoTWFjaGluZURhdGFQYWdlLFxuICBmZXRjaENsaWVudHMsXG4gIGZldGNoTW9kZWxzLFxufSBmcm9tIFwiLi4vLi4vdXRpbHMvZmV0Y2hBc3NvY2lhdGlvbnNcIjtcbmltcG9ydCB7IHVzZUF1dGggfSBmcm9tIFwiLi4vLi4vY29udGV4dC9BdXRoVXNlckNvbnRleHRcIjtcclxuaW1wb3J0IExvZ2dlZEluIGZyb20gXCIuLi9Mb2dnZWRJblwiO1xyXG5pbXBvcnQgQ2xpZW50VGFibGUgZnJvbSBcIi4uLy4uL3V0aWxzL0NsaWVudFRhYmxlXCI7XG5pbXBvcnQgTW9kZWxUYWJsZSBmcm9tIFwiLi4vLi4vdXRpbHMvTW9kZWxUYWJsZVwiO1xuaW1wb3J0IFBhcnRUYWJsZSBmcm9tIFwiLi4vLi4vdXRpbHMvUGFydFRhYmxlXCI7XG5pbXBvcnQgc3R5bGVzIGZyb20gXCIuLi8uLi9zdHlsZXMvTWFpblNlYXJjaC5tb2R1bGUuY3NzXCI7XG5pbXBvcnQgZmlyZWJhc2UgZnJvbSBcIi4uLy4uL2NvbnRleHQvRmlyZWJhc2VcIjtcbmltcG9ydCB7IGJ1aWxkTmFtZVRva2VucyB9IGZyb20gXCIuLi8uLi91dGlscy9pdGVtRm9ybVNoYXJlZFwiO1xuaW1wb3J0IFdhcmVob3VzZU1hcE1vZGFsIGZyb20gXCIuLi8uLi9jb21wb25lbnRzL1dhcmVob3VzZU1hcE1vZGFsXCI7XG5cclxuLy8gUHJlZGVmaW5lZCB3YXJlaG91c2UgY2xpZW50IElEcyBhbmQgZGlzcGxheSBuYW1lc1xyXG5jb25zdCBTT0NBTF9DTElFTlRfSUQgPSBcIkFJUzE3MTgyXCI7XHJcbmNvbnN0IE5PUkNBTF9DTElFTlRfSUQgPSBcIkFJUzI1MDk3XCI7XG5jb25zdCBVTkFTU0lHTkVEX0NMSUVOVF9JRCA9IFwiQUlTMDA0MDRcIjtcbmNvbnN0IERFRkFVTFRfUEFHRV9TSVpFID0gMjU7XG5cclxuXHJcbi8vIFNpbXVsYXRlcyBhIG5ldHdvcmsgcmVxdWVzdCBkZWxheVxyXG5mdW5jdGlvbiBzaW11bGF0ZU5ldHdvcmtSZXF1ZXN0KCkge1xyXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gc2V0VGltZW91dChyZXNvbHZlLCAyMDAwKSk7XHJcbn1cclxuXHJcbi8vIEN1c3RvbSBMb2FkaW5nQnV0dG9uIGNvbXBvbmVudFxyXG5mdW5jdGlvbiBMb2FkaW5nQnV0dG9uKHsgdHlwZSwgbmFtZSwgcm91dGUsIGNsYXNzTmFtZSB9KSB7XG4gIGNvbnN0IFtpc0xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKGlzTG9hZGluZykge1xuICAgICAgbGV0IGNhbmNlbGxlZCA9IGZhbHNlO1xuICAgICAgc2ltdWxhdGVOZXR3b3JrUmVxdWVzdCgpLnRoZW4oKCkgPT4ge1xuICAgICAgICBpZiAoIWNhbmNlbGxlZCkgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGNhbmNlbGxlZCA9IHRydWU7XG4gICAgICB9O1xuICAgIH1cbiAgfSwgW2lzTG9hZGluZ10pO1xuXHJcbiAgcmV0dXJuIChcbiAgICA8TGluayBocmVmPXtgLyR7cm91dGV9YH0+XG4gICAgICA8YVxuICAgICAgICBjbGFzc05hbWU9e2BidG4gYnRuLSR7dHlwZX0gJHtjbGFzc05hbWUgfHwgXCJcIn1gfVxuICAgICAgICBkaXNhYmxlZD17aXNMb2FkaW5nfVxuICAgICAgICBvbkNsaWNrPXsoKSA9PiAhaXNMb2FkaW5nICYmIHNldExvYWRpbmcodHJ1ZSl9XG4gICAgICA+XG4gICAgICAgIHtpc0xvYWRpbmcgPyBcIkxvYWRpbmcuLi5cIiA6IG5hbWV9XG4gICAgICA8L2E+XHJcbiAgICA8L0xpbms+XHJcbiAgKTtcclxufVxyXG5cclxuLy8gLS0tLSBEQVRFIEhFTFBFUlMgKHRvcC1sZXZlbCBzY29wZSkgLS0tLVxyXG5cclxuLy8gQ29udmVydCBhbnl0aGluZyBkYXRlLWlzaCBpbnRvIGEgdGltZXN0YW1wIChtcyBzaW5jZSBlcG9jaCkuXHJcbmZ1bmN0aW9uIHRvVGltZSh2YWx1ZSkge1xyXG4gIGlmICghdmFsdWUpIHJldHVybiBudWxsO1xyXG5cclxuICAvLyBGaXJlc3RvcmUgVGltZXN0YW1wIHsgc2Vjb25kcywgbmFub3NlY29uZHMgfVxyXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiYgdmFsdWUgIT09IG51bGwgJiYgdmFsdWUuc2Vjb25kcyAhPSBudWxsKSB7XHJcbiAgICB0cnkgeyByZXR1cm4gdmFsdWUuc2Vjb25kcyAqIDEwMDA7IH0gY2F0Y2ggeyAvKiBpZ25vcmUgKi8gfVxyXG4gIH1cclxuXHJcbiAgLy8gTmF0aXZlIERhdGVcclxuICBpZiAodmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XHJcbiAgICBjb25zdCB0ID0gdmFsdWUuZ2V0VGltZSgpO1xyXG4gICAgcmV0dXJuIGlzTmFOKHQpID8gbnVsbCA6IHQ7XHJcbiAgfVxyXG5cclxuICAvLyBTdHJpbmdzXHJcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgLy8gSVNPIC8geXl5eS1tbS1kZFxyXG4gICAgY29uc3QgaXNvID0gRGF0ZS5wYXJzZSh2YWx1ZSk7XHJcbiAgICBpZiAoIWlzTmFOKGlzbykpIHJldHVybiBpc287XHJcblxyXG4gICAgLy8gbW0vZGQveXl5eVxyXG4gICAgY29uc3QgcGFydHMgPSB2YWx1ZS5zcGxpdChcIi9cIik7XHJcbiAgICBpZiAocGFydHMubGVuZ3RoID09PSAzKSB7XHJcbiAgICAgIGNvbnN0IFttbSwgZGQsIHl5eXldID0gcGFydHM7XHJcbiAgICAgIGNvbnN0IGFsdCA9IERhdGUucGFyc2UoYCR7eXl5eX0tJHttbX0tJHtkZH1gKTtcclxuICAgICAgaWYgKCFpc05hTihhbHQpKSByZXR1cm4gYWx0O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gTGFzdCByZXNvcnRcclxuICBjb25zdCB0ID0gRGF0ZS5wYXJzZSh2YWx1ZSk7XHJcbiAgcmV0dXJuIGlzTmFOKHQpID8gbnVsbCA6IHQ7XHJcbn1cclxuXHJcbi8vIENhbm9uaWNhbGl6ZSB0byAneXl5eS1tbS1kZCcgKG1hdGNoZXMgPGlucHV0IHR5cGU9XCJkYXRlXCI+KVxyXG5mdW5jdGlvbiB0b1lNRCh2YWx1ZSkge1xuICBjb25zdCB0ID0gdG9UaW1lKHZhbHVlKTtcbiAgaWYgKHQgPT0gbnVsbCkgcmV0dXJuIG51bGw7XG4gIGNvbnN0IGQgPSBuZXcgRGF0ZSh0KTtcbiAgY29uc3QgeXl5eSA9IGQuZ2V0RnVsbFllYXIoKTtcbiAgY29uc3QgbW0gPSBTdHJpbmcoZC5nZXRNb250aCgpICsgMSkucGFkU3RhcnQoMiwgXCIwXCIpO1xuICBjb25zdCBkZCA9IFN0cmluZyhkLmdldERhdGUoKSkucGFkU3RhcnQoMiwgXCIwXCIpO1xuICByZXR1cm4gYCR7eXl5eX0tJHttbX0tJHtkZH1gO1xufVxuXG5mdW5jdGlvbiBub3JtYWxpemVUZXh0KHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PSBudWxsKSByZXR1cm4gXCJcIjtcbiAgcmV0dXJuIFN0cmluZyh2YWx1ZSkudG9Mb3dlckNhc2UoKS50cmltKCk7XG59XG5cbmZ1bmN0aW9uIGdldE1hY2hpbmVGaWVsZChpdGVtLCBrZXkpIHtcbiAgaWYgKCFpdGVtKSByZXR1cm4gbnVsbDtcbiAgY29uc3QgbG93ZXIgPSBrZXkudG9Mb3dlckNhc2UoKTtcbiAgcmV0dXJuIChcbiAgICBpdGVtPy5tYWNoaW5lRGF0YT8uW2tleV0gPz9cbiAgICBpdGVtPy5tYWNoaW5lRGF0YT8uW2xvd2VyXSA/P1xuICAgIGl0ZW0/LmN1cnJlbnRNYWNoaW5lRGF0YT8uW2tleV0gPz9cbiAgICBpdGVtPy5jdXJyZW50TWFjaGluZURhdGE/Lltsb3dlcl0gPz9cbiAgICBpdGVtPy50aGVNYWNoaW5lRGF0YT8uW2tleV0gPz9cbiAgICBpdGVtPy50aGVNYWNoaW5lRGF0YT8uW2xvd2VyXSA/P1xuICAgIGl0ZW0/LlRoZU1hY2hpbmU/LltrZXldID8/XG4gICAgaXRlbT8uVGhlTWFjaGluZT8uW2xvd2VyXSA/P1xuICAgIG51bGxcbiAgKTtcbn1cblxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBNYWluU2VhcmNoKCkge1xuICBjb25zdCB7IHNpZ25PdXQgfSA9IHVzZUF1dGgoKTtcclxuICBjb25zdCBbaW5mbywgc2V0SW5mb10gPSB1c2VTdGF0ZShbXSk7XHJcbiAgY29uc3QgW2JhY2t1cEluZm8sIHNldEJhY2t1cEluZm9dID0gdXNlU3RhdGUoW10pO1xyXG4gIGNvbnN0IFthdWdtZW50ZWRJbmZvLCBzZXRBdWdtZW50ZWRJbmZvXSA9IHVzZVN0YXRlKFtdKTsgLy8gaXRlbXMgd2l0aCBjbGllbnRGcm9tSWQvY3VycmVudElkIGFkZGVkXHJcbiAgY29uc3QgW2lzTG9hZGluZywgc2V0SXNMb2FkaW5nXSA9IHVzZVN0YXRlKHRydWUpO1xyXG4gIGNvbnN0IFtpZHMsIHNldElEXSA9IHVzZVN0YXRlKFtdKTtcbiAgY29uc3QgW3Nob3csIHNldFNob3ddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbc2hvd0ZpbHRlcnMsIHNldFNob3dGaWx0ZXJzXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3BhZ2VTaXplLCBzZXRQYWdlU2l6ZV0gPSB1c2VTdGF0ZShERUZBVUxUX1BBR0VfU0laRSk7XG4gIGNvbnN0IFtpc05hdmlnYXRpbmcsIHNldElzTmF2aWdhdGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtkSXRlbSwgc2V0REl0ZW1dID0gdXNlU3RhdGUoKTtcclxuICBjb25zdCBbc2VsZWN0LCBzZXRTZWxlY3RdID0gdXNlU3RhdGUoXCJOYW1lXCIpO1xyXG4gIGNvbnN0IFtzaG93TGlzdCwgc2V0U2hvd0xpc3RdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtzaG93TGlzdFNlYXJjaCwgc2V0U2hvd0xpc3RTZWFyY2hdID0gdXNlU3RhdGUoXCJ0ZXh0XCIpO1xyXG4gIGNvbnN0IFtzZWFyY2gsIHNldFNlYXJjaF0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbc2VsZWN0ZWRPRU0sIHNldFNlbGVjdGVkT0VNXSA9IHVzZVN0YXRlKG51bGwpO1xyXG4gIGNvbnN0IFtzZWxlY3RlZE1vZGFsaXR5LCBzZXRTZWxlY3RlZE1vZGFsaXR5XSA9IHVzZVN0YXRlKG51bGwpO1xyXG4gIC8vIFJlcGxhY2UgdGhlIG9sZCBzaW5nbGUgY2xpZW50IHN0YXRlIHdpdGggdHdvIHNldHM6XHJcbiAgY29uc3QgW3NlbGVjdGVkQ2xpZW50RnJvbSwgc2V0U2VsZWN0ZWRDbGllbnRGcm9tXSA9IHVzZVN0YXRlKG51bGwpO1xyXG4gIGNvbnN0IFtjbGllbnRGcm9tQnV0dG9uVGV4dCwgc2V0Q2xpZW50RnJvbUJ1dHRvblRleHRdID0gdXNlU3RhdGUoXCJTZWxlY3QgT3B0aW9uXCIpO1xyXG4gIGNvbnN0IFtzZWxlY3RlZENsaWVudEN1cnJlbnQsIHNldFNlbGVjdGVkQ2xpZW50Q3VycmVudF0gPSB1c2VTdGF0ZShudWxsKTtcclxuICBjb25zdCBbY2xpZW50Q3VycmVudEJ1dHRvblRleHQsIHNldENsaWVudEN1cnJlbnRCdXR0b25UZXh0XSA9IHVzZVN0YXRlKFwiU2VsZWN0IE9wdGlvblwiKTtcclxuXHJcbiAgY29uc3QgW2NsaWVudHMsIHNldENsaWVudHNdID0gdXNlU3RhdGUoW10pO1xuICBjb25zdCBbc2hvd0NsaWVudE1vZGFsLCBzZXRTaG93Q2xpZW50TW9kYWxdID0gdXNlU3RhdGUoZmFsc2UpO1xuICAvLyBUaGlzIHN0YXRlIHRlbGxzIHRoZSBtb2RhbCB3aGljaCBjbGllbnQgYm94IGlzIGJlaW5nIHVwZGF0ZWQ6IFwiZnJvbVwiIG9yIFwiY3VycmVudFwiXG4gIGNvbnN0IFtjbGllbnRTZWxlY3Rpb25UeXBlLCBzZXRDbGllbnRTZWxlY3Rpb25UeXBlXSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbc2hvd01hcCwgc2V0U2hvd01hcF0gPSB1c2VTdGF0ZShmYWxzZSk7XG5cclxuICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcclxuICBjb25zdCBsYWJlbEJhc2UgPSBbXCJuYW1lXCIsIFwiZGF0ZVwiLCBcIncvb1wiLCBcInAvblwiLCBcInMvblwiXTtcclxuICBjb25zdCBsYWJlbEJhc2VOYW1lcyA9IFtcIm5hbWVcIiwgXCJkYXRlXCIsIFwid29cIiwgXCJwblwiLCBcInNuXCJdO1xyXG4gIGNvbnN0IHNvcnRDaGVja0Jhc2UgPSBbZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZV07XHJcblxyXG4gIGZ1bmN0aW9uIHdpdGhTb3J0SWNvbihiYXNlTGFiZWxzLCBhY3RpdmVJbmRleCwgaXNEZXNjKSB7XHJcbiAgICByZXR1cm4gYmFzZUxhYmVscy5tYXAoKHRleHQsIGkpID0+IHtcclxuICAgICAgaWYgKGkgIT09IGFjdGl2ZUluZGV4KSByZXR1cm4gdGV4dDsgLy8gdW50b3VjaGVkXHJcbiAgICAgIGNvbnN0IGFycm93ID0gaXNEZXNjID8gXCIg4pa8XCIgOiBcIiDilrJcIjtcclxuICAgICAgcmV0dXJuIGAke3RleHR9JHthcnJvd31gO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgY29uc3QgW2xhYmVscywgc2V0TGFiZWxzXSA9IHVzZVN0YXRlKGxhYmVsQmFzZSk7XHJcbiAgY29uc3QgW3NvcnRDaGVjaywgc2V0U29ydENoZWNrXSA9IHVzZVN0YXRlKHNvcnRDaGVja0Jhc2UpO1xyXG4gIGNvbnN0IFtob3ZlckluZGV4LCBzZXRIb3ZlckluZGV4XSA9IHVzZVN0YXRlKG51bGwpO1xyXG4gIGNvbnN0IFtzZWxlY3RlZE1vZGVsLCBzZXRTZWxlY3RlZE1vZGVsXSA9IHVzZVN0YXRlKG51bGwpO1xyXG4gIGNvbnN0IFtnUG9zLCBzZXRHUG9zXSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbZ0lkZSwgc2V0R0lkZV0gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW2lzRGVsZXRpbmcsIHNldElzRGVsZXRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbcGFnZSwgc2V0UGFnZV0gPSB1c2VTdGF0ZSgxKTtcbiAgY29uc3QgW3BhZ2VDdXJzb3JzLCBzZXRQYWdlQ3Vyc29yc10gPSB1c2VTdGF0ZShbXSk7XG4gIGNvbnN0IFtoYXNOZXh0UGFnZSwgc2V0SGFzTmV4dFBhZ2VdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBmZXRjaFNlcSA9IHVzZVJlZigwKTtcbiAgY29uc3QgYmFja2ZpbGxJbkZsaWdodCA9IHVzZVJlZihmYWxzZSk7XG4gIGNvbnN0IFtxdWVyeUVwb2NoLCBzZXRRdWVyeUVwb2NoXSA9IHVzZVN0YXRlKDApO1xuICBjb25zdCBbbG9hZEVycm9yLCBzZXRMb2FkRXJyb3JdID0gdXNlU3RhdGUobnVsbCk7XG4gIGNvbnN0IHRhYmxlQm9keVJlZiA9IHVzZVJlZihudWxsKTtcbiAgY29uc3Qgcm93SGVpZ2h0UmVmID0gdXNlUmVmKDQ2KTtcbiAgY29uc3QgaGVhZGVySGVpZ2h0UmVmID0gdXNlUmVmKDM4KTtcblxuICBjb25zdCBMT0FEX1RJTUVPVVRfTVMgPSAzMDAwMDtcbiAgY29uc3Qgb3Blbk1hcCA9ICgpID0+IHNldFNob3dNYXAodHJ1ZSk7XG5cbiAgY29uc3QgaGFuZGxlTWFwVmlldyA9IHVzZUNhbGxiYWNrKFxuICAgIChzZWxlY3Rpb24gPSB7fSkgPT4ge1xuICAgICAgY29uc3QgcGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcygpO1xuICAgICAgY29uc3Qge1xuICAgICAgICByZWdpb24sXG4gICAgICAgIHNlY3Rpb25MZXR0ZXIsXG4gICAgICAgIHNlY3Rpb25OdW1iZXIsXG4gICAgICAgIHBhbGxldCxcbiAgICAgICAgYmluLFxuICAgICAgfSA9IHNlbGVjdGlvbjtcblxuICAgICAgaWYgKHJlZ2lvbikgcGFyYW1zLnNldChcInJlZ2lvblwiLCByZWdpb24pO1xuICAgICAgaWYgKHNlY3Rpb25MZXR0ZXIpIHBhcmFtcy5zZXQoXCJzZWN0aW9uTGV0dGVyXCIsIHNlY3Rpb25MZXR0ZXIpO1xuICAgICAgaWYgKHNlY3Rpb25OdW1iZXIpIHBhcmFtcy5zZXQoXCJzZWN0aW9uTnVtYmVyXCIsIHNlY3Rpb25OdW1iZXIpO1xuICAgICAgaWYgKHBhbGxldCkgcGFyYW1zLnNldChcInBhbGxldFwiLCBwYWxsZXQpO1xuICAgICAgaWYgKGJpbikgcGFyYW1zLnNldChcImJpblwiLCBiaW4pO1xuXG4gICAgICBjb25zdCBxdWVyeSA9IHBhcmFtcy50b1N0cmluZygpO1xuICAgICAgcm91dGVyLnB1c2goXG4gICAgICAgIGAvTmV3U2VhcmNoL2ludmVudG9yeS9pbnZlbnRvcnlNYW5hZ2Uke3F1ZXJ5ID8gYD8ke3F1ZXJ5fWAgOiBcIlwifWBcbiAgICAgICk7XG4gICAgICBzZXRTaG93TWFwKGZhbHNlKTtcbiAgICB9LFxuICAgIFtyb3V0ZXJdXG4gICk7XG5cbiAgY29uc3Qgc3RhcnROYW1lVG9rZW5CYWNrZmlsbCA9IHVzZUNhbGxiYWNrKGFzeW5jIChyZWFzb24gPSBcIlwiKSA9PiB7XG4gICAgaWYgKGJhY2tmaWxsSW5GbGlnaHQuY3VycmVudCkgcmV0dXJuO1xuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICBjb25zdCBsYXN0UnVuID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwibmFtZVRva2Vuc0JhY2tmaWxsQXRcIik7XG4gICAgICBpZiAobGFzdFJ1biAmJiBEYXRlLm5vdygpIC0gTnVtYmVyKGxhc3RSdW4pIDwgMjQgKiA2MCAqIDYwICogMTAwMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgYmFja2ZpbGxJbkZsaWdodC5jdXJyZW50ID0gdHJ1ZTtcbiAgICBjb25zdCBkYiA9IGZpcmViYXNlLmZpcmVzdG9yZSgpO1xuICAgIGxldCBsYXN0RG9jID0gbnVsbDtcblxuICAgIGNvbnN0IHRva2Vuc0VxdWFsID0gKGEsIGIpID0+IHtcbiAgICAgIGlmIChhLmxlbmd0aCAhPT0gYi5sZW5ndGgpIHJldHVybiBmYWxzZTtcbiAgICAgIGNvbnN0IHNldEEgPSBuZXcgU2V0KGEpO1xuICAgICAgY29uc3Qgc2V0QiA9IG5ldyBTZXQoYik7XG4gICAgICBpZiAoc2V0QS5zaXplICE9PSBzZXRCLnNpemUpIHJldHVybiBmYWxzZTtcbiAgICAgIGZvciAoY29uc3QgdiBvZiBzZXRBKSBpZiAoIXNldEIuaGFzKHYpKSByZXR1cm4gZmFsc2U7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgdHJ5IHtcbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIGxldCBxdWVyeSA9IGRiXG4gICAgICAgICAgLmNvbGxlY3Rpb24oXCJUZXN0XCIpXG4gICAgICAgICAgLm9yZGVyQnkoZmlyZWJhc2UuZmlyZXN0b3JlLkZpZWxkUGF0aC5kb2N1bWVudElkKCkpXG4gICAgICAgICAgLmxpbWl0KDIwMCk7XG4gICAgICAgIGlmIChsYXN0RG9jKSBxdWVyeSA9IHF1ZXJ5LnN0YXJ0QWZ0ZXIobGFzdERvYyk7XG5cbiAgICAgICAgY29uc3Qgc25hcCA9IGF3YWl0IHF1ZXJ5LmdldCgpO1xuICAgICAgICBpZiAoc25hcC5lbXB0eSkgYnJlYWs7XG5cbiAgICAgICAgY29uc3QgYmF0Y2ggPSBkYi5iYXRjaCgpO1xuICAgICAgICBsZXQgd3JpdGVzID0gMDtcblxuICAgICAgICBzbmFwLmRvY3MuZm9yRWFjaCgoZG9jKSA9PiB7XG4gICAgICAgICAgY29uc3QgZGF0YSA9IGRvYy5kYXRhKCkgfHwge307XG4gICAgICAgICAgY29uc3QgbmFtZSA9IHR5cGVvZiBkYXRhLm5hbWUgPT09IFwic3RyaW5nXCIgPyBkYXRhLm5hbWUgOiBcIlwiO1xuICAgICAgICAgIGNvbnN0IG5hbWVMb3dlciA9IG5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICBjb25zdCBuYW1lVG9rZW5zID0gYnVpbGROYW1lVG9rZW5zKG5hbWUpO1xuICAgICAgICAgIGNvbnN0IGV4aXN0aW5nVG9rZW5zID0gQXJyYXkuaXNBcnJheShkYXRhLm5hbWVUb2tlbnMpXG4gICAgICAgICAgICA/IEFycmF5LmZyb20obmV3IFNldChkYXRhLm5hbWVUb2tlbnMubWFwKCh2KSA9PiBTdHJpbmcodikpKSlcbiAgICAgICAgICAgIDogW107XG5cbiAgICAgICAgICBjb25zdCBuZWVkc1VwZGF0ZSA9XG4gICAgICAgICAgICBkYXRhLm5hbWVMb3dlciAhPT0gbmFtZUxvd2VyIHx8XG4gICAgICAgICAgICAhdG9rZW5zRXF1YWwoZXhpc3RpbmdUb2tlbnMsIG5hbWVUb2tlbnMpO1xuXG4gICAgICAgICAgaWYgKG5lZWRzVXBkYXRlKSB7XG4gICAgICAgICAgICBiYXRjaC51cGRhdGUoZG9jLnJlZiwgeyBuYW1lTG93ZXIsIG5hbWVUb2tlbnMgfSk7XG4gICAgICAgICAgICB3cml0ZXMgKz0gMTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh3cml0ZXMgPiAwKSB7XG4gICAgICAgICAgYXdhaXQgYmF0Y2guY29tbWl0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBsYXN0RG9jID0gc25hcC5kb2NzW3NuYXAuZG9jcy5sZW5ndGggLSAxXTtcbiAgICAgICAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgMjUpKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKFxuICAgICAgICAgIFwibmFtZVRva2Vuc0JhY2tmaWxsQXRcIixcbiAgICAgICAgICBTdHJpbmcoRGF0ZS5ub3coKSlcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihcIk5hbWUgdG9rZW4gYmFja2ZpbGwgZmFpbGVkOlwiLCByZWFzb24sIGVycm9yKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgYmFja2ZpbGxJbkZsaWdodC5jdXJyZW50ID0gZmFsc2U7XG4gICAgfVxuICB9LCBbXSk7XG5cbiAgY29uc3Qgc2VhcmNoTG93ZXIgPSAoc2VhcmNoIHx8IFwiXCIpLnRvTG93ZXJDYXNlKCkudHJpbSgpO1xuICBjb25zdCBoYXNBY3RpdmVGaWx0ZXJzID1cbiAgICBCb29sZWFuKHNlbGVjdGVkT0VNKSB8fFxuICAgIEJvb2xlYW4oc2VsZWN0ZWRNb2RhbGl0eSkgfHxcbiAgICBCb29sZWFuKHNlbGVjdGVkTW9kZWwpIHx8XG4gICAgQm9vbGVhbihzZWxlY3RlZENsaWVudEZyb20pIHx8XG4gICAgQm9vbGVhbihzZWxlY3RlZENsaWVudEN1cnJlbnQpIHx8XG4gICAgQm9vbGVhbihzZWFyY2hMb3dlcik7XG5cbiAgY29uc3QgdmFsdWVNYXRjaGVzID0gKHZhbHVlLCBzKSA9PiB7XG4gICAgaWYgKCF2YWx1ZSkgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHZhbHVlLnNvbWUoKHYpID0+IHZhbHVlTWF0Y2hlcyh2LCBzKSk7XG4gICAgfVxuICAgIHJldHVybiBTdHJpbmcodmFsdWUpLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMocyk7XG4gIH07XG5cbiAgY29uc3QgbWF0Y2hlc0ZpbHRlcnMgPSB1c2VDYWxsYmFjayhcbiAgICAoaXRlbSkgPT4ge1xuICAgICAgLy8gaGlkZSBleHBsaWNpdGx5IGhpZGRlbiBpdGVtc1xuICAgICAgaWYgKGl0ZW0/LnZpc2libGUgPT09IGZhbHNlKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgIC8vIE9FTSAvIE1vZGFsaXR5IC8gTW9kZWwgZmlsdGVyaW5nXG4gICAgICBjb25zdCBPRU0gPSBnZXRNYWNoaW5lRmllbGQoaXRlbSwgXCJPRU1cIik7XG4gICAgICBjb25zdCBNb2RhbGl0eSA9IGdldE1hY2hpbmVGaWVsZChpdGVtLCBcIk1vZGFsaXR5XCIpO1xuICAgICAgY29uc3QgTW9kZWwgPSBnZXRNYWNoaW5lRmllbGQoaXRlbSwgXCJNb2RlbFwiKTtcblxuICAgICAgaWYgKHNlbGVjdGVkT0VNICYmIG5vcm1hbGl6ZVRleHQoT0VNKSAhPT0gbm9ybWFsaXplVGV4dChzZWxlY3RlZE9FTSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKFxuICAgICAgICBzZWxlY3RlZE1vZGFsaXR5ICYmXG4gICAgICAgIG5vcm1hbGl6ZVRleHQoTW9kYWxpdHkpICE9PSBub3JtYWxpemVUZXh0KHNlbGVjdGVkTW9kYWxpdHkpXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKHNlbGVjdGVkTW9kZWwgJiYgbm9ybWFsaXplVGV4dChNb2RlbCkgIT09IG5vcm1hbGl6ZVRleHQoc2VsZWN0ZWRNb2RlbCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICAvLyBDbGllbnQgZmlsdGVyc1xuICAgICAgaWYgKHNlbGVjdGVkQ2xpZW50RnJvbSAmJiBpdGVtPy5jbGllbnRGcm9tSWQgIT09IHNlbGVjdGVkQ2xpZW50RnJvbSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoXG4gICAgICAgIHNlbGVjdGVkQ2xpZW50Q3VycmVudCAmJlxuICAgICAgICBpdGVtPy5jbGllbnRDdXJyZW50SWQgIT09IHNlbGVjdGVkQ2xpZW50Q3VycmVudFxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgLy8gU2VhcmNoXG4gICAgICBpZiAoc2VhcmNoTG93ZXIpIHtcbiAgICAgICAgaWYgKHNlbGVjdCA9PT0gXCJOYW1lXCIpIHtcbiAgICAgICAgICByZXR1cm4gdmFsdWVNYXRjaGVzKGl0ZW0/Lm5hbWUsIHNlYXJjaExvd2VyKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2VsZWN0ID09PSBcIkRhdGVcIikge1xuICAgICAgICAgIGNvbnN0IHdhbnRlZERheSA9IHNlYXJjaExvd2VyOyAvLyB5eXl5LW1tLWRkIGZyb20gaW5wdXRcbiAgICAgICAgICBjb25zdCBpdGVtWU1EID0gdG9ZTUQoaXRlbT8uZGF0ZSk7XG4gICAgICAgICAgaWYgKGl0ZW1ZTUQgJiYgaXRlbVlNRCA9PT0gd2FudGVkRGF5KSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShpdGVtPy5kZXNjcmlwdGlvbnMpKSB7XG4gICAgICAgICAgICBpZiAoaXRlbS5kZXNjcmlwdGlvbnMuc29tZSgoZCkgPT4gdG9ZTUQoZD8uZGF0ZSkgPT09IHdhbnRlZERheSkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGl0ZW0/LndvcmtPcmRlcnMpKSB7XG4gICAgICAgICAgICBpZiAoaXRlbS53b3JrT3JkZXJzLnNvbWUoKHcpID0+IHRvWU1EKHc/LmRhdGUpID09PSB3YW50ZWREYXkpKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNlbGVjdCA9PT0gXCJXb3JrIE9yZGVyXCIpIHtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgQXJyYXkuaXNBcnJheShpdGVtPy53b3JrT3JkZXJzKSAmJlxuICAgICAgICAgICAgaXRlbS53b3JrT3JkZXJzLnNvbWUoKHdvKSA9PlxuICAgICAgICAgICAgICB2YWx1ZU1hdGNoZXMod28/LndvcmtPcmRlciwgc2VhcmNoTG93ZXIpXG4gICAgICAgICAgICApXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2VsZWN0ID09PSBcIlByb2R1Y3QgTnVtYmVyXCIpIHtcbiAgICAgICAgICByZXR1cm4gdmFsdWVNYXRjaGVzKGl0ZW0/LnBuLCBzZWFyY2hMb3dlcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNlbGVjdCA9PT0gXCJTZXJpYWwgTnVtYmVyXCIpIHtcbiAgICAgICAgICByZXR1cm4gdmFsdWVNYXRjaGVzKGl0ZW0/LnNuLCBzZWFyY2hMb3dlcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNlbGVjdCA9PT0gXCJEZXNjcmlwdGlvblwiKSB7XG4gICAgICAgICAgaWYgKHZhbHVlTWF0Y2hlcyhpdGVtPy5kZXNjLCBzZWFyY2hMb3dlcikpIHJldHVybiB0cnVlO1xuICAgICAgICAgIGlmICh2YWx1ZU1hdGNoZXMoaXRlbT8uZGVzY3JpcHRpb24sIHNlYXJjaExvd2VyKSkgcmV0dXJuIHRydWU7XG4gICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoaXRlbT8uZGVzY3JpcHRpb25zKSkge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW0uZGVzY3JpcHRpb25zLnNvbWUoKGQpID0+XG4gICAgICAgICAgICAgIHZhbHVlTWF0Y2hlcyhkPy5kZXNjcmlwdGlvbiwgc2VhcmNoTG93ZXIpXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNlbGVjdCA9PT0gXCJTS1VcIikge1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICB2YWx1ZU1hdGNoZXMoaXRlbT8uaWQsIHNlYXJjaExvd2VyKSB8fFxuICAgICAgICAgICAgdmFsdWVNYXRjaGVzKGl0ZW0/LmxvY2FsU04sIHNlYXJjaExvd2VyKSB8fFxuICAgICAgICAgICAgdmFsdWVNYXRjaGVzKGl0ZW0/LmxvY2FsX3NuLCBzZWFyY2hMb3dlcilcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG4gICAgW1xuICAgICAgc2VsZWN0ZWRPRU0sXG4gICAgICBzZWxlY3RlZE1vZGFsaXR5LFxuICAgICAgc2VsZWN0ZWRNb2RlbCxcbiAgICAgIHNlbGVjdGVkQ2xpZW50RnJvbSxcbiAgICAgIHNlbGVjdGVkQ2xpZW50Q3VycmVudCxcbiAgICAgIHNlYXJjaExvd2VyLFxuICAgICAgc2VsZWN0LFxuICAgIF1cbiAgKTtcblxuICBjb25zdCByZXNldFBhZ2luYXRpb24gPSAoKSA9PiB7XG4gICAgc2V0UGFnZSgxKTtcbiAgICBzZXRQYWdlQ3Vyc29ycyhbXSk7XG4gICAgc2V0SGFzTmV4dFBhZ2UoZmFsc2UpO1xuICB9O1xuXG4gIC8vIFJlc2V0IHBhZ2luYXRpb24gb24gcm91dGUvcXVlcnkgY2hhbmdlIChwcmV2ZW50cyBzdGFsZSBwYWdlcyBsaWtlIOKAnHN0YXJ0aW5nIGF0IDbigJ0pXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgcmVzZXRQYWdpbmF0aW9uKCk7XG4gICAgc2V0UXVlcnlFcG9jaCgodikgPT4gdiArIDEpO1xuICB9LCBbcm91dGVyLmFzUGF0aF0pO1xuXG4gIC8vIFJlc2V0IGFuZCByZWZldGNoIHdoZW4gZmlsdGVycy9zZWFyY2ggY2hhbmdlXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgcmVzZXRQYWdpbmF0aW9uKCk7XG4gICAgc2V0UXVlcnlFcG9jaCgodikgPT4gdiArIDEpO1xuICB9LCBbXG4gICAgc2VsZWN0ZWRPRU0sXG4gICAgc2VsZWN0ZWRNb2RhbGl0eSxcbiAgICBzZWxlY3RlZE1vZGVsLFxuICAgIHNlbGVjdGVkQ2xpZW50RnJvbSxcbiAgICBzZWxlY3RlZENsaWVudEN1cnJlbnQsXG4gICAgc2VhcmNoLFxuICAgIHNlbGVjdCxcbiAgXSk7XG5cblxuICAvLyBGZXRjaCBkYXRhIG9uIGNvbXBvbmVudCBtb3VudCBhbmQgcm91dGUgY2hhbmdlXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgZmV0Y2hEYXRhKHBhZ2UpO1xuICB9LCBbcGFnZSwgcXVlcnlFcG9jaF0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFyb3V0ZXI/LmV2ZW50cykgcmV0dXJuO1xuICAgIGNvbnN0IGhhbmRsZURvbmUgPSAoKSA9PiBzZXRJc05hdmlnYXRpbmcoZmFsc2UpO1xuICAgIHJvdXRlci5ldmVudHMub24oXCJyb3V0ZUNoYW5nZUNvbXBsZXRlXCIsIGhhbmRsZURvbmUpO1xuICAgIHJvdXRlci5ldmVudHMub24oXCJyb3V0ZUNoYW5nZUVycm9yXCIsIGhhbmRsZURvbmUpO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICByb3V0ZXIuZXZlbnRzLm9mZihcInJvdXRlQ2hhbmdlQ29tcGxldGVcIiwgaGFuZGxlRG9uZSk7XG4gICAgICByb3V0ZXIuZXZlbnRzLm9mZihcInJvdXRlQ2hhbmdlRXJyb3JcIiwgaGFuZGxlRG9uZSk7XG4gICAgfTtcbiAgfSwgW3JvdXRlcl0pO1xuXG4gIGFzeW5jIGZ1bmN0aW9uIGZldGNoRGF0YShyZXF1ZXN0ZWRQYWdlID0gMSkge1xuICAgIGNvbnN0IHNlcSA9ICsrZmV0Y2hTZXEuY3VycmVudDtcbiAgICBsZXQgdGltZWRPdXQgPSBmYWxzZTtcbiAgICBzZXRJc0xvYWRpbmcodHJ1ZSk7XG4gICAgc2V0TG9hZEVycm9yKG51bGwpO1xuICAgIGNvbnN0IHRpbWVvdXRJZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGltZWRPdXQgPSB0cnVlO1xuICAgICAgaWYgKHNlcSA9PT0gZmV0Y2hTZXEuY3VycmVudCkge1xuICAgICAgICBzZXRMb2FkRXJyb3Ioe1xuICAgICAgICAgIGNvZGU6IFwidGltZW91dFwiLFxuICAgICAgICAgIG1lc3NhZ2U6IGBMb2FkaW5nIGlzIHRha2luZyBsb25nZXIgdGhhbiAke01hdGgucm91bmQoXG4gICAgICAgICAgICBMT0FEX1RJTUVPVVRfTVMgLyAxMDAwXG4gICAgICAgICAgKX1zLiBUaGlzIGlzIGxpa2VseSBkdWUgdG8gdmVyeSBzZWxlY3RpdmUgZmlsdGVycy5gLFxuICAgICAgICB9KTtcbiAgICAgICAgc2V0SXNMb2FkaW5nKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9LCBMT0FEX1RJTUVPVVRfTVMpO1xuICAgIHRyeSB7XG4gICAgICBpZiAocm91dGVyLnF1ZXJ5LmlucHV0VGV4dCAmJiByb3V0ZXIucXVlcnkuc2VsZWN0ZWRUeXBlKSB7XG4gICAgICAgIHNldFNlbGVjdChyb3V0ZXIucXVlcnkuc2VsZWN0ZWRUeXBlKTtcbiAgICAgICAgc2V0U2VhcmNoKHJvdXRlci5xdWVyeS5pbnB1dFRleHQpO1xuICAgICAgfVxuICAgICAgY29uc3Qgc3RhcnRBZnRlckRvYyA9XG4gICAgICAgIHJlcXVlc3RlZFBhZ2UgPiAxID8gcGFnZUN1cnNvcnNbcmVxdWVzdGVkUGFnZSAtIDJdIDogbnVsbDtcbiAgICAgIGlmIChyZXF1ZXN0ZWRQYWdlID4gMSAmJiAhc3RhcnRBZnRlckRvYykge1xuICAgICAgICBzZXRQYWdlKDEpO1xuICAgICAgICBpZiAoc2VxID09PSBmZXRjaFNlcS5jdXJyZW50KSB7XG4gICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXRJZCk7XG4gICAgICAgICAgc2V0SXNMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBlZmZlY3RpdmVTZWxlY3QgPSByb3V0ZXIucXVlcnkuc2VsZWN0ZWRUeXBlIHx8IHNlbGVjdDtcbiAgICAgIGNvbnN0IGVmZmVjdGl2ZVNlYXJjaCA9IHJvdXRlci5xdWVyeS5pbnB1dFRleHQgfHwgc2VhcmNoO1xuICAgICAgY29uc3QgZWZmZWN0aXZlU2VhcmNoTG93ZXIgPSAoZWZmZWN0aXZlU2VhcmNoIHx8IFwiXCIpXG4gICAgICAgIC50b0xvd2VyQ2FzZSgpXG4gICAgICAgIC50cmltKCk7XG5cbiAgICAgIC8vIGxpZ2h0IHJldHJ5IGZvciB0cmFuc2llbnQgRmlyZXN0b3JlIGhpY2N1cHNcbiAgICAgIGNvbnN0IGxvYWQgPSBhc3luYyAoYXR0ZW1wdCA9IDEpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXR1cm4gYXdhaXQgZmV0Y2hQYXJ0c1dpdGhNYWNoaW5lRGF0YVBhZ2Uoe1xuICAgICAgICAgICAgcGFnZVNpemUsXG4gICAgICAgICAgICBzdGFydEFmdGVyRG9jLFxuICAgICAgICAgICAgdmlzaWJsZU9ubHk6IHRydWUsXG4gICAgICAgICAgICBmaWx0ZXJGbjogaGFzQWN0aXZlRmlsdGVycyA/IG1hdGNoZXNGaWx0ZXJzIDogbnVsbCxcbiAgICAgICAgICAgIHNlYXJjaDogZWZmZWN0aXZlU2VhcmNoTG93ZXJcbiAgICAgICAgICAgICAgPyB7XG4gICAgICAgICAgICAgICAgICB0eXBlOiBlZmZlY3RpdmVTZWxlY3QsXG4gICAgICAgICAgICAgICAgICByYXc6IGVmZmVjdGl2ZVNlYXJjaCxcbiAgICAgICAgICAgICAgICAgIGxvd2VyOiBlZmZlY3RpdmVTZWFyY2hMb3dlcixcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIDogbnVsbCxcbiAgICAgICAgICAgIG5lZWRzTWFjaGluZURhdGE6XG4gICAgICAgICAgICAgIEJvb2xlYW4oc2VsZWN0ZWRPRU0pIHx8XG4gICAgICAgICAgICAgIEJvb2xlYW4oc2VsZWN0ZWRNb2RhbGl0eSkgfHxcbiAgICAgICAgICAgICAgQm9vbGVhbihzZWxlY3RlZE1vZGVsKSB8fFxuICAgICAgICAgICAgICBCb29sZWFuKHNlbGVjdGVkQ2xpZW50RnJvbSkgfHxcbiAgICAgICAgICAgICAgQm9vbGVhbihzZWxlY3RlZENsaWVudEN1cnJlbnQpLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgaWYgKGF0dGVtcHQgPj0gMykgdGhyb3cgZTtcbiAgICAgICAgICBhd2FpdCBuZXcgUHJvbWlzZShyID0+IHNldFRpbWVvdXQociwgMjUwICogTWF0aC5wb3coMiwgYXR0ZW1wdCAtIDEpKSk7XG4gICAgICAgICAgcmV0dXJuIGxvYWQoYXR0ZW1wdCArIDEpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgY29uc3QgeyBwYXJ0czogZGF0YSwgbGFzdERvYywgaGFzTmV4dFBhZ2U6IG5leHRQYWdlIH0gPSBhd2FpdCBsb2FkKCk7XG4gICAgICBpZiAodGltZWRPdXQgfHwgc2VxICE9PSBmZXRjaFNlcS5jdXJyZW50KSByZXR1cm47XG4gICAgICBjb25zdCBoYXNOYW1lU2VhcmNoID1cbiAgICAgICAgQm9vbGVhbihlZmZlY3RpdmVTZWFyY2hMb3dlcikgJiYgZWZmZWN0aXZlU2VsZWN0ID09PSBcIk5hbWVcIjtcbiAgICAgIGlmIChcbiAgICAgICAgaGFzTmFtZVNlYXJjaCAmJlxuICAgICAgICAoZGF0YS5sZW5ndGggPT09IDAgfHxcbiAgICAgICAgICBkYXRhLnNvbWUoXG4gICAgICAgICAgICAoaXRlbSkgPT5cbiAgICAgICAgICAgICAgIUFycmF5LmlzQXJyYXkoaXRlbT8ubmFtZVRva2VucykgfHwgaXRlbS5uYW1lVG9rZW5zLmxlbmd0aCA9PT0gMFxuICAgICAgICAgICkpXG4gICAgICApIHtcbiAgICAgICAgc3RhcnROYW1lVG9rZW5CYWNrZmlsbChcIm5hbWUtc2VhcmNoXCIpO1xuICAgICAgfVxuICAgICAgaWYgKHJlcXVlc3RlZFBhZ2UgPT09IDEgJiYgZGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgc2V0UGFnZUN1cnNvcnMoW10pO1xuICAgICAgICBzZXRIYXNOZXh0UGFnZShmYWxzZSk7XG4gICAgICB9XG4gICAgICBzZXRCYWNrdXBJbmZvKGRhdGEpO1xuICAgICAgc2V0TGFiZWxzKGxhYmVsQmFzZSk7IC8vIDwtLSBhZGQgdGhpcyBsaW5lIGFmdGVyIHNldEJhY2t1cEluZm8oZGF0YSlcbiAgICAgIHNldElEKGRhdGEubWFwKChpdGVtKSA9PiBpdGVtLmlkKSk7XG4gICAgICBpZiAocmVxdWVzdGVkUGFnZSA+IDEgJiYgZGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgc2V0SGFzTmV4dFBhZ2UoZmFsc2UpO1xuICAgICAgICBzZXRQYWdlKDEpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBzZXRIYXNOZXh0UGFnZShuZXh0UGFnZSk7XG4gICAgICBzZXRQYWdlQ3Vyc29ycygocHJldikgPT4ge1xuICAgICAgICBjb25zdCBuZXh0ID0gcmVxdWVzdGVkUGFnZSA9PT0gMSA/IFtdIDogWy4uLnByZXZdO1xuICAgICAgICBpZiAobGFzdERvYykge1xuICAgICAgICAgIG5leHRbcmVxdWVzdGVkUGFnZSAtIDFdID0gbGFzdERvYztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgIH0pO1xuICAgICAgc2V0U2VsZWN0ZWRJdGVtcyhbXSk7XG5cbiAgICAgIC8vIE5vcm1hbGl6ZSBjbGllbnQgaWRzIGZvciBmaWx0ZXJpbmdcbiAgICAgIGNvbnN0IGF1Z21lbnRlZCA9IGRhdGEubWFwKChpdGVtKSA9PiAoe1xuICAgICAgICAuLi5pdGVtLFxuICAgICAgICBjbGllbnRGcm9tSWQ6XG4gICAgICAgICAgaXRlbT8uY2xpZW50RnJvbUlkID8/XG4gICAgICAgICAgKHR5cGVvZiBpdGVtPy5DbGllbnRGcm9tID09PSBcInN0cmluZ1wiID8gaXRlbS5DbGllbnRGcm9tIDogbnVsbCkgPz9cbiAgICAgICAgICBpdGVtPy5DbGllbnRGcm9tPy5pZCA/P1xuICAgICAgICAgIG51bGwsXG4gICAgICAgIGNsaWVudEN1cnJlbnRJZDpcbiAgICAgICAgICBpdGVtPy5jbGllbnRDdXJyZW50SWQgPz9cbiAgICAgICAgICAodHlwZW9mIGl0ZW0/LkNsaWVudEN1cnJlbnQgPT09IFwic3RyaW5nXCIgPyBpdGVtLkNsaWVudEN1cnJlbnQgOiBudWxsKSA/P1xuICAgICAgICAgIGl0ZW0/LkNsaWVudEN1cnJlbnQ/LmlkID8/XG4gICAgICAgICAgbnVsbCxcbiAgICAgIH0pKTtcblxyXG4gICAgICBzZXRBdWdtZW50ZWRJbmZvKGF1Z21lbnRlZCk7XG4gICAgICAvLyBkZWZhdWx0IHZpZXcgPSBmaWx0ZXJlZCAoa2VlcHMgcGFnaW5hdGlvbiBhbmQgZmlsdGVycyBjb25zaXN0ZW50KVxuICAgICAgc2V0SW5mbyhhdWdtZW50ZWQuZmlsdGVyKG1hdGNoZXNGaWx0ZXJzKSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBpZiAoc2VxICE9PSBmZXRjaFNlcS5jdXJyZW50KSByZXR1cm47XG4gICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZmV0Y2hpbmcgZGF0YTpcIiwgZXJyKTtcbiAgICAgIGNvbnN0IGNvZGUgPSBlcnI/LmNvZGUgfHwgXCJ1bmtub3duXCI7XG4gICAgICBzZXRMb2FkRXJyb3Ioe1xuICAgICAgICBjb2RlLFxuICAgICAgICBtZXNzYWdlOiBlcnI/Lm1lc3NhZ2UgfHwgXCJGYWlsZWQgdG8gbG9hZCBpdGVtcy5cIixcbiAgICAgIH0pO1xuICAgICAgc2V0SW5mbyhbXSk7XG4gICAgICBzZXRBdWdtZW50ZWRJbmZvKFtdKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXRJZCk7XG4gICAgICBpZiAoc2VxID09PSBmZXRjaFNlcS5jdXJyZW50ICYmICF0aW1lZE91dCkgc2V0SXNMb2FkaW5nKGZhbHNlKTtcbiAgICB9XG4gIH1cblxyXG4gIGNvbnN0IHNlYXJjaENoYW5nZUhhbmRsZXIgPSAoZXZlbnQpID0+IHNldFNlYXJjaChldmVudC50YXJnZXQudmFsdWUpO1xyXG5cclxuICAvLyBGaWx0ZXIgdGhlIGN1cnJlbnRseSBsb2FkZWQgaXRlbXMgKG5vdyBjb25zaXN0ZW50IHdpdGggcGFnZWQgZmlsdGVyaW5nKVxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGJhc2UgPSBhdWdtZW50ZWRJbmZvIHx8IFtdO1xuICAgIHNldEluZm8oYmFzZS5maWx0ZXIobWF0Y2hlc0ZpbHRlcnMpKTtcbiAgfSwgW2F1Z21lbnRlZEluZm8sIG1hdGNoZXNGaWx0ZXJzXSk7XG5cclxuICBmdW5jdGlvbiBzb3J0Q2hlY2tBbGwocG9zKSB7XHJcbiAgICAvLyBEZXRlcm1pbmUgbmV4dCBkaXJlY3Rpb246IHRvZ2dsZSB0aGUgY2xpY2tlZCBjb2x1bW4gb25seVxyXG4gICAgY29uc3QgbmV4dFNvcnRDaGVjayA9IHNvcnRDaGVjay5tYXAoKHYsIGkpID0+IChpID09PSBwb3MgPyAhdiA6IHYpKTtcclxuICAgIGNvbnN0IGlzRGVzYyA9IG5leHRTb3J0Q2hlY2tbcG9zXTsgLy8gdHJ1ZSBtZWFucyBkZXNjZW5kaW5nXHJcblxyXG4gICAgY29uc3Qgc29ydGVkSW5mbyA9IFsuLi5pbmZvXS5zb3J0KChhLCBiKSA9PiB7XHJcbiAgICAgIGNvbnN0IGtleSA9IGxhYmVsQmFzZU5hbWVzW3Bvc107XHJcblxyXG4gICAgICBpZiAocG9zID09PSAxKSB7XHJcbiAgICAgICAgLy8gREFURSBjb2x1bW5cclxuICAgICAgICBjb25zdCB0YSA9IHRvVGltZShhW2tleV0pO1xyXG4gICAgICAgIGNvbnN0IHRiID0gdG9UaW1lKGJba2V5XSk7XHJcblxyXG4gICAgICAgIC8vIFB1dCBtaXNzaW5nIGRhdGVzIGF0IHRoZSBlbmQgZm9yIGFzY2VuZGluZywgYXQgdGhlIHN0YXJ0IGZvciBkZXNjZW5kaW5nXHJcbiAgICAgICAgaWYgKHRhID09PSBudWxsICYmIHRiID09PSBudWxsKSByZXR1cm4gMDtcclxuICAgICAgICBpZiAodGEgPT09IG51bGwpIHJldHVybiBpc0Rlc2MgPyAtMSA6IDE7XHJcbiAgICAgICAgaWYgKHRiID09PSBudWxsKSByZXR1cm4gaXNEZXNjID8gMSA6IC0xO1xyXG5cclxuICAgICAgICByZXR1cm4gaXNEZXNjID8gKHRiIC0gdGEpIDogKHRhIC0gdGIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBOQU1FIG9yIFNLVSAoc3RyaW5nLXkgY29sdW1ucyk6IGluZGV4ZXMgMCBvciA1IGluIHlvdXIgb3JpZ2luYWwgbG9naWNcclxuICAgICAgaWYgKHBvcyA9PT0gMCB8fCBwb3MgPT09IDUpIHtcclxuICAgICAgICBjb25zdCBhdiA9IChhW2tleV0gPz8gXCJcIikudG9TdHJpbmcoKTtcclxuICAgICAgICBjb25zdCBidiA9IChiW2tleV0gPz8gXCJcIikudG9TdHJpbmcoKTtcclxuICAgICAgICByZXR1cm4gaXNEZXNjID8gYnYubG9jYWxlQ29tcGFyZShhdikgOiBhdi5sb2NhbGVDb21wYXJlKGJ2KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gTnVtZXJpYy1pc2ggY29sdW1ucyAod28sIHBuLCBzbikg4oCUIGZhbGwgYmFjayB0byBzdHJpbmcgY29tcGFyZSBpZiBOYU5cclxuICAgICAgY29uc3QgYW4gPSBOdW1iZXIoYVtrZXldKTtcclxuICAgICAgY29uc3QgYm4gPSBOdW1iZXIoYltrZXldKTtcclxuXHJcbiAgICAgIGlmICghaXNOYU4oYW4pICYmICFpc05hTihibikpIHtcclxuICAgICAgICByZXR1cm4gaXNEZXNjID8gKGJuIC0gYW4pIDogKGFuIC0gYm4pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IGF2ID0gKGFba2V5XSA/PyBcIlwiKS50b1N0cmluZygpO1xyXG4gICAgICAgIGNvbnN0IGJ2ID0gKGJba2V5XSA/PyBcIlwiKS50b1N0cmluZygpO1xyXG4gICAgICAgIHJldHVybiBpc0Rlc2MgPyBidi5sb2NhbGVDb21wYXJlKGF2KSA6IGF2LmxvY2FsZUNvbXBhcmUoYnYpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBzZXRJbmZvKHNvcnRlZEluZm8pO1xyXG4gICAgc2V0U29ydENoZWNrKG5leHRTb3J0Q2hlY2spO1xyXG5cclxuICAgIC8vIFVwZGF0ZSBoZWFkZXIgbGFiZWxzIHRvIHNob3cgdGhlIGxpdHRsZSBhcnJvdyBvbiB0aGUgYWN0aXZlIGNvbHVtblxyXG4gICAgc2V0TGFiZWxzKHdpdGhTb3J0SWNvbihsYWJlbEJhc2UsIHBvcywgaXNEZXNjKSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgY29uc3Qgcm93U2VsZWN0ID0gKGl0ZW0pID0+IHtcclxuICAgIGlmIChpdGVtICYmIGl0ZW0uaWQpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJTZWxlY3RlZCBpdGVtOlwiLCBpdGVtKTtcbiAgICAgIHNldElzTmF2aWdhdGluZyh0cnVlKTtcbiAgICAgIHJvdXRlci5wdXNoKFwiLi9pdGVtL1wiICsgaXRlbS5pZCk7XG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5lcnJvcihcIlVuYWJsZSB0byBkZXRlcm1pbmUgdGhlIHNlbGVjdGVkIGl0ZW3igJlzIElEOiBcIiwgaXRlbSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgW3NlbGVjdGVkSXRlbXMsIHNldFNlbGVjdGVkSXRlbXNdID0gdXNlU3RhdGUoW10pO1xyXG4gIGNvbnN0IFtzaG93RGVsZXRlTW9kYWwsIHNldFNob3dEZWxldGVNb2RhbF0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZVNlbGVjdEl0ZW0gPSAoaWQpID0+IHtcclxuICAgIHNldFNlbGVjdGVkSXRlbXMocHJldiA9PlxyXG4gICAgICBwcmV2LmluY2x1ZGVzKGlkKSA/IHByZXYuZmlsdGVyKHggPT4geCAhPT0gaWQpIDogWy4uLnByZXYsIGlkXVxyXG4gICAgKTtcclxuICB9O1xyXG5cclxuXHJcbiAgLy8gc2V0U2VsZWN0ZWRJdGVtcygocHJldikgPT4ge1xyXG4gIC8vICAgY29uc3QgbmV3U2VsZWN0aW9uID0gcHJldi5pbmNsdWRlcyhpZClcclxuICAvLyAgICAgPyBwcmV2LmZpbHRlcigoaXRlbUlkKSA9PiBpdGVtSWQgIT09IGlkKVxyXG4gIC8vICAgICA6IFsuLi5wcmV2LCBpZF07XHJcbiAgLy8gICBjb25zb2xlLmxvZyhcIlNlbGVjdGVkIGl0ZW1zOlwiLCBuZXdTZWxlY3Rpb24pO1xyXG4gIC8vICAgcmV0dXJuIG5ld1NlbGVjdGlvbjsgLy8gPC0gaW1wb3J0YW50XHJcbiAgLy8gfSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZVNob3dEZWxldGVNb2RhbCA9ICgpID0+IHNldFNob3dEZWxldGVNb2RhbCh0cnVlKTtcclxuICBjb25zdCBoYW5kbGVDbG9zZURlbGV0ZU1vZGFsID0gKCkgPT4gc2V0U2hvd0RlbGV0ZU1vZGFsKGZhbHNlKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlRGVsZXRlU2VsZWN0ZWQgPSBhc3luYyAoKSA9PiB7XHJcbiAgICBzZXRJc0RlbGV0aW5nKHRydWUpO1xyXG4gICAgY29uc3QgZGIgPSBmaXJlYmFzZS5maXJlc3RvcmUoKTtcclxuICAgIHRyeSB7XHJcbiAgICAgIC8vIExvb3Agb3ZlciBlYWNoIHNlbGVjdGVkIGl0ZW0gb25lIGF0IGEgdGltZVxyXG4gICAgICBmb3IgKGNvbnN0IGl0ZW1JZCBvZiBzZWxlY3RlZEl0ZW1zKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coaXRlbUlkKVxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAvLyBEZWxldGUgZnJvbSBcIlRlc3RcIiBjb2xsZWN0aW9uXHJcbiAgICAgICAgICBhd2FpdCBkYi5jb2xsZWN0aW9uKFwiVGVzdFwiKS5kb2MoaXRlbUlkKS5kZWxldGUoKTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEVycm9yIGRlbGV0aW5nIGRvY3VtZW50ICR7aXRlbUlkfSBmcm9tIFRlc3Q6YCwgZXJyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIC8vIERlbGV0ZSBmcm9tIFwiUGFydHNcIiBjb2xsZWN0aW9uXHJcbiAgICAgICAgICBhd2FpdCBkYi5jb2xsZWN0aW9uKFwiUGFydHNcIikuZG9jKGl0ZW1JZCkuZGVsZXRlKCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGBFcnJvciBkZWxldGluZyBkb2N1bWVudCAke2l0ZW1JZH0gZnJvbSBQYXJ0czpgLCBlcnIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgLy8gRGVsZXRlIGFzc29jaWF0ZWQgcGhvdG9zIGZyb20gc3RvcmFnZVxyXG4gICAgICAgICAgYXdhaXQgZGVsZXRlRnJvbVN0b3JhZ2UoaXRlbUlkKTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEVycm9yIGRlbGV0aW5nIHN0b3JhZ2UgZm9yICR7aXRlbUlkfTpgLCBlcnIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICAvLyBVcGRhdGUgbG9jYWwgc3RhdGUgYnkgZmlsdGVyaW5nIG91dCB0aGUgZGVsZXRlZCBpdGVtc1xyXG4gICAgICBzZXRJbmZvKGluZm8uZmlsdGVyKChpdGVtKSA9PiAhc2VsZWN0ZWRJdGVtcy5pbmNsdWRlcyhpdGVtLmlkKSkpO1xyXG4gICAgICBzZXRTZWxlY3RlZEl0ZW1zKFtdKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBkZWxldGluZyBpdGVtczpcIiwgZXJyb3IpO1xyXG4gICAgfSBmaW5hbGx5IHtcclxuICAgICAgc2V0SXNEZWxldGluZyhmYWxzZSk7XHJcbiAgICAgIGhhbmRsZUNsb3NlRGVsZXRlTW9kYWwoKTtcclxuICAgICAgLy8gT3B0aW9uYWxseSwgcmVsb2FkIHRoZSBwYWdlXHJcbiAgICAgIC8vIHJvdXRlci5yZWxvYWQoKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuXHJcbiAgY29uc3QgaGFuZGxlQ2xvc2UgPSAoKSA9PiBzZXRTaG93KGZhbHNlKTtcclxuICBjb25zdCBoYW5kbGVTaG93ID0gKCkgPT4gc2V0U2hvdyh0cnVlKTtcclxuXHJcbiAgY29uc3QgY2hlY2tEZWxldGUgPSAoZXZlbnQsIHBvcywgaWRzVG9EZWxldGUsIG5hbWUpID0+IHtcclxuICAgIGlmIChldmVudCkge1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH1cclxuICAgIGNvbnNvbGUubG9nKFwiU2VsZWN0ZWQgSURzIHRvIGRlbGV0ZTpcIiwgaWRzVG9EZWxldGUpO1xyXG4gICAgc2V0U2VsZWN0ZWRJdGVtcyhpZHNUb0RlbGV0ZSk7XHJcbiAgICBzZXRESXRlbShuYW1lKTtcclxuICAgIHNldFNob3dEZWxldGVNb2RhbCh0cnVlKTtcclxuICB9O1xyXG5cclxuICAvLyBjb25zdCBoYW5kbGVEZWxldGUgPSBhc3luYyAoKSA9PiB7XHJcbiAgLy8gICBsZXQgaXRlbUlkID0gZ0lkZTtcclxuICAvLyAgIHRyeSB7XHJcbiAgLy8gICAgIHNldElzRGVsZXRpbmcodHJ1ZSk7XHJcbiAgLy8gICAgIGNvbnN0IGRiID0gZmlyZWJhc2UuZmlyZXN0b3JlKCk7XHJcbiAgLy8gICAgIGF3YWl0IGRiLmNvbGxlY3Rpb24oXCJUZXN0XCIpLmRvYyhpdGVtSWQpLmRlbGV0ZSgpO1xyXG4gIC8vICAgICBhd2FpdCBkZWxldGVGcm9tUGFydHNDb2xsZWN0aW9uKGl0ZW1JZCk7XHJcbiAgLy8gICAgIGF3YWl0IGRlbGV0ZUZyb21TdG9yYWdlKGl0ZW1JZCk7XHJcbiAgLy8gICAgIHNldEluZm8oaW5mby5maWx0ZXIoKF8sIGkpID0+IGdQb3MgIT09IGkpKTtcclxuICAvLyAgICAgY29uc29sZS5sb2coYERlbGV0ZWQgaXRlbTogJHtpdGVtSWR9YCk7XHJcbiAgLy8gICB9IGNhdGNoIChlcnJvcikge1xyXG4gIC8vICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZGVsZXRpbmcgaXRlbTpcIiwgZXJyb3IpO1xyXG4gIC8vICAgfSBmaW5hbGx5IHtcclxuICAvLyAgICAgc2V0SXNEZWxldGluZyhmYWxzZSk7XHJcbiAgLy8gICB9XHJcbiAgLy8gICBoYW5kbGVDbG9zZSgpO1xyXG4gIC8vIH07XHJcblxyXG4gIGNvbnN0IGhvdmVyU3R5bGUgPSAoaW5kZXgpID0+ICh7XHJcbiAgICBiYWNrZ3JvdW5kQ29sb3I6IGhvdmVySW5kZXggPT09IGluZGV4ID8gXCIjZGRkXCIgOiBcInRyYW5zcGFyZW50XCIsXHJcbiAgICB0ZXh0QWxpZ246IFwiY2VudGVyXCIsXHJcbiAgICBjdXJzb3I6IFwiZGVmYXVsdFwiLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBbZHJvcGRvd24xVGV4dCwgc2V0RHJvcGRvd24xVGV4dF0gPSB1c2VTdGF0ZShcIlNlbGVjdCBPcHRpb25cIik7XHJcbiAgY29uc3QgW2Ryb3Bkb3duMlRleHQsIHNldERyb3Bkb3duMlRleHRdID0gdXNlU3RhdGUoXCJTZWxlY3QgT3B0aW9uXCIpO1xyXG5cclxuICBjb25zdCBoYW5kbGVTZWxlY3QxID0gKGV2ZW50S2V5LCBldmVudCkgPT4ge1xyXG4gICAgaWYgKGV2ZW50S2V5ID09PSBcInVuYXNzaWduZWRcIikge1xyXG4gICAgICBzZXREcm9wZG93bjFUZXh0KFwiU2VsZWN0IE9wdGlvblwiKTtcclxuICAgICAgc2V0U2VsZWN0ZWRPRU0obnVsbCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzZXREcm9wZG93bjFUZXh0KGV2ZW50LnRhcmdldC50ZXh0Q29udGVudCk7XHJcbiAgICAgIHNldFNlbGVjdGVkT0VNKGV2ZW50LnRhcmdldC50ZXh0Q29udGVudCk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaGFuZGxlU2VsZWN0MiA9IChldmVudEtleSwgZXZlbnQpID0+IHtcclxuICAgIGlmIChldmVudEtleSA9PT0gXCJ1bmFzc2lnbmVkXCIpIHtcclxuICAgICAgc2V0RHJvcGRvd24yVGV4dChcIlNlbGVjdCBPcHRpb25cIik7XHJcbiAgICAgIHNldFNlbGVjdGVkTW9kYWxpdHkobnVsbCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzZXREcm9wZG93bjJUZXh0KGV2ZW50LnRhcmdldC50ZXh0Q29udGVudCk7XHJcbiAgICAgIHNldFNlbGVjdGVkTW9kYWxpdHkoZXZlbnQudGFyZ2V0LnRleHRDb250ZW50KTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICAvLyBCdWlsZCBhIHVuaXF1ZSBsaXN0IG9mIGNsaWVudHMgZnJvbSB0aGUgaXRlbXMgY3VycmVudGx5IGxvYWRlZCwgZmlsdGVyZWQgYnkgT0VNL01vZGFsaXR5LlxyXG4gIC8vIGB0eXBlYCBpcyBcImZyb21cIiBvciBcImN1cnJlbnRcIiB0byBkZWNpZGUgd2hpY2ggY2xpZW50IHJlZiB0byByZWFkLlxyXG4gIGFzeW5jIGZ1bmN0aW9uIGJ1aWxkQ2xpZW50c0Zyb21JdGVtcyh0eXBlKSB7XG4gICAgY29uc3QgZGIgPSBmaXJlYmFzZS5maXJlc3RvcmUoKTtcbiAgICBjb25zdCBpZHMgPSBuZXcgU2V0KCk7XG5cbiAgICAvLyBSZXNwZWN0IGN1cnJlbnQgT0VNIC8gTW9kYWxpdHkgZmlsdGVycyB3aGVuIGRlcml2aW5nIGNsaWVudCBvcHRpb25zXG4gICAgY29uc3QgZmlsdGVyZWQgPSBhdWdtZW50ZWRJbmZvLmZpbHRlcigoaXRlbSkgPT4ge1xuICAgICAgY29uc3QgT0VNID0gZ2V0TWFjaGluZUZpZWxkKGl0ZW0sIFwiT0VNXCIpO1xuICAgICAgY29uc3QgTW9kYWxpdHkgPSBnZXRNYWNoaW5lRmllbGQoaXRlbSwgXCJNb2RhbGl0eVwiKTtcbiAgICAgIGlmIChzZWxlY3RlZE9FTSAmJiBub3JtYWxpemVUZXh0KE9FTSkgIT09IG5vcm1hbGl6ZVRleHQoc2VsZWN0ZWRPRU0pKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmIChcbiAgICAgICAgc2VsZWN0ZWRNb2RhbGl0eSAmJlxuICAgICAgICBub3JtYWxpemVUZXh0KE1vZGFsaXR5KSAhPT0gbm9ybWFsaXplVGV4dChzZWxlY3RlZE1vZGFsaXR5KVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0pO1xuXHJcbiAgICBmb3IgKGNvbnN0IGl0IG9mIGZpbHRlcmVkKSB7XHJcbiAgICAgIGNvbnN0IGlkID0gdHlwZSA9PT0gXCJmcm9tXCIgPyBpdC5jbGllbnRGcm9tSWQgOiBpdC5jbGllbnRDdXJyZW50SWQ7XHJcbiAgICAgIGlmIChpZCkgaWRzLmFkZChpZCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgb3V0ID0gW107XHJcbiAgICBjb25zdCBpZEFycmF5ID0gWy4uLmlkc107XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGlkQXJyYXkubGVuZ3RoOyBpICs9IDEwKSB7XHJcbiAgICAgIGNvbnN0IGNodW5rID0gaWRBcnJheS5zbGljZShpLCBpICsgMTApO1xyXG4gICAgICBjb25zdCBzbmFwID0gYXdhaXQgZGJcclxuICAgICAgICAuY29sbGVjdGlvbihcIkNsaWVudFwiKVxyXG4gICAgICAgIC53aGVyZShmaXJlYmFzZS5maXJlc3RvcmUuRmllbGRQYXRoLmRvY3VtZW50SWQoKSwgXCJpblwiLCBjaHVuaylcclxuICAgICAgICAuZ2V0KCk7XHJcbiAgICAgIHNuYXAuZm9yRWFjaCgoZG9jKSA9PiB7XHJcbiAgICAgICAgY29uc3QgZCA9IGRvYy5kYXRhKCkgfHwge307XHJcbiAgICAgICAgb3V0LnB1c2goeyBpZDogZG9jLmlkLCBuYW1lOiBkLm5hbWUgfHwgZG9jLmlkIH0pO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBzb3J0IGJ5IG5hbWUgZm9yIG5pY2VyIFVYXHJcbiAgICBvdXQuc29ydCgoYSwgYikgPT4gKGEubmFtZSB8fCBcIlwiKS5sb2NhbGVDb21wYXJlKGIubmFtZSB8fCBcIlwiKSk7XHJcbiAgICByZXR1cm4gb3V0O1xyXG4gIH1cclxuXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQ0xJRU5UIFNFTEVDVElPTiBIQU5ETElOR1xyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gVGhpcyBmdW5jdGlvbiBmZXRjaGVzIGNsaWVudHMgYW5kIG9wZW5zIHRoZSBjbGllbnQgbW9kYWwuXHJcbiAgY29uc3QgaGFuZGxlQ2xpZW50Q2xpY2sgPSBhc3luYyAoKSA9PiB7XHJcbiAgICBsZXQgc2FmZUNsaWVudHMgPSBbXTtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IGNsaWVudHNEYXRhID0gYXdhaXQgZmV0Y2hDbGllbnRzKHNlbGVjdGVkT0VNLCBzZWxlY3RlZE1vZGFsaXR5KTtcclxuICAgICAgc2FmZUNsaWVudHMgPSBBcnJheS5pc0FycmF5KGNsaWVudHNEYXRhKSA/IGNsaWVudHNEYXRhIDogW107XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJmZXRjaENsaWVudHMgZmFpbGVkOlwiLCBlKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBGYWxsYmFjayB0byBidWlsZGluZyBmcm9tIGxvYWRlZCBpdGVtcyBpZiBBUEkgZ2F2ZSB1cyBub3RoaW5nXHJcbiAgICBpZiAoc2FmZUNsaWVudHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgaWYgKCFjbGllbnRTZWxlY3Rpb25UeXBlKSB7XHJcbiAgICAgICAgICAvLyBpZiBzb21laG93IG5vdCBzZXQgeWV0LCBkZWZhdWx0IHRvIFwiZnJvbVwiXHJcbiAgICAgICAgICBzZXRDbGllbnRTZWxlY3Rpb25UeXBlKFwiZnJvbVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgZGVyaXZlZCA9IGF3YWl0IGJ1aWxkQ2xpZW50c0Zyb21JdGVtcyhjbGllbnRTZWxlY3Rpb25UeXBlIHx8IFwiZnJvbVwiKTtcclxuICAgICAgICBzYWZlQ2xpZW50cyA9IGRlcml2ZWQ7XHJcbiAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFsbGJhY2sgYnVpbGRDbGllbnRzRnJvbUl0ZW1zIGZhaWxlZDpcIiwgZSk7XHJcbiAgICAgICAgc2FmZUNsaWVudHMgPSBbXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNldENsaWVudHMoc2FmZUNsaWVudHMpO1xyXG4gICAgc2V0Q2xpZW50U2VhcmNoVGVybShcIlwiKTtcclxuICAgIHNldFNob3dDbGllbnRNb2RhbCh0cnVlKTtcclxuICB9O1xyXG5cclxuXHJcblxyXG4gIC8vIFdoZW4gYSBjbGllbnQgaXMgc2VsZWN0ZWQgaW4gdGhlIG1vZGFsLCB3ZSBub3cgYXNzdW1lIHRoZSBwYXJhbWV0ZXIgaXMgYSBjbGllbnQgSUQuXHJcbiAgLy8gSWYgdGhlIHBhc3NlZCB2YWx1ZSBpcyBudWxsLCB3ZSBjbGVhciB0aGUgc2VsZWN0aW9uLlxyXG4gIGNvbnN0IGhhbmRsZUNsaWVudFNlbGVjdCA9IGFzeW5jIChjbGllbnRJZCkgPT4ge1xyXG4gICAgY29uc29sZS5sb2coXCJVc2VyIHNlbGVjdGVkIGNsaWVudCBpZDpcIiwgY2xpZW50SWQpO1xyXG4gICAgaWYgKCFjbGllbnRJZCkge1xyXG4gICAgICBpZiAoY2xpZW50U2VsZWN0aW9uVHlwZSA9PT0gXCJmcm9tXCIpIHtcclxuICAgICAgICBzZXRDbGllbnRGcm9tQnV0dG9uVGV4dChcIlNlbGVjdCBPcHRpb25cIik7XHJcbiAgICAgICAgc2V0U2VsZWN0ZWRDbGllbnRGcm9tKG51bGwpO1xyXG4gICAgICB9IGVsc2UgaWYgKGNsaWVudFNlbGVjdGlvblR5cGUgPT09IFwiY3VycmVudFwiKSB7XHJcbiAgICAgICAgc2V0Q2xpZW50Q3VycmVudEJ1dHRvblRleHQoXCJTZWxlY3QgT3B0aW9uXCIpO1xyXG4gICAgICAgIHNldFNlbGVjdGVkQ2xpZW50Q3VycmVudChudWxsKTtcclxuICAgICAgfVxyXG4gICAgICBzZXRTaG93Q2xpZW50TW9kYWwoZmFsc2UpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBjbGllbnRTbmFwID0gYXdhaXQgZmlyZWJhc2UuZmlyZXN0b3JlKCkuY29sbGVjdGlvbihcIkNsaWVudFwiKS5kb2MoY2xpZW50SWQpLmdldCgpO1xyXG4gICAgICBpZiAoY2xpZW50U25hcC5leGlzdHMpIHtcclxuICAgICAgICBjb25zdCBjbGllbnREYXRhID0gY2xpZW50U25hcC5kYXRhKCk7XHJcbiAgICAgICAgaWYgKGNsaWVudFNlbGVjdGlvblR5cGUgPT09IFwiZnJvbVwiKSB7XHJcbiAgICAgICAgICBzZXRDbGllbnRGcm9tQnV0dG9uVGV4dChjbGllbnREYXRhLm5hbWUpO1xyXG4gICAgICAgICAgc2V0U2VsZWN0ZWRDbGllbnRGcm9tKGNsaWVudElkKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGNsaWVudFNlbGVjdGlvblR5cGUgPT09IFwiY3VycmVudFwiKSB7XHJcbiAgICAgICAgICBzZXRDbGllbnRDdXJyZW50QnV0dG9uVGV4dChjbGllbnREYXRhLm5hbWUpO1xyXG4gICAgICAgICAgc2V0U2VsZWN0ZWRDbGllbnRDdXJyZW50KGNsaWVudElkKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIk5vIGNsaWVudCBkb2N1bWVudCBmb3VuZCBmb3IgaWQ6XCIsIGNsaWVudElkKTtcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGZldGNoaW5nIGNsaWVudCBkYXRhOlwiLCBlcnJvcik7XHJcbiAgICB9XHJcbiAgICBzZXRTaG93Q2xpZW50TW9kYWwoZmFsc2UpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGhhbmRsZUNsaWVudEluZm8gPSAoY2xpZW50SWQsIGNsaWVudE5hbWUpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKGBDbGllbnQgSUQ6ICR7Y2xpZW50SWR9LCBDbGllbnQgTmFtZTogJHtjbGllbnROYW1lfWApO1xyXG4gICAgcm91dGVyLnB1c2goXCJjbGllbnQvXCIgKyBjbGllbnRJZCk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQ2xlYXJDbGllbnRTZWxlY3Rpb24gPSAoKSA9PiB7XHJcbiAgICBpZiAoY2xpZW50U2VsZWN0aW9uVHlwZSA9PT0gXCJmcm9tXCIpIHtcclxuICAgICAgc2V0Q2xpZW50RnJvbUJ1dHRvblRleHQoXCJTZWxlY3QgT3B0aW9uXCIpO1xyXG4gICAgICBzZXRTZWxlY3RlZENsaWVudEZyb20obnVsbCk7XHJcbiAgICB9IGVsc2UgaWYgKGNsaWVudFNlbGVjdGlvblR5cGUgPT09IFwiY3VycmVudFwiKSB7XHJcbiAgICAgIHNldENsaWVudEN1cnJlbnRCdXR0b25UZXh0KFwiU2VsZWN0IE9wdGlvblwiKTtcclxuICAgICAgc2V0U2VsZWN0ZWRDbGllbnRDdXJyZW50KG51bGwpO1xyXG4gICAgfVxyXG4gICAgc2V0U2hvd0NsaWVudE1vZGFsKGZhbHNlKTtcclxuICB9O1xyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIE1PREVMIFNFTEVDVElPTiBIQU5ETElOR1xyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgY29uc3QgW21vZGVscywgc2V0TW9kZWxzXSA9IHVzZVN0YXRlKFtdKTtcclxuICBjb25zdCBbc2hvd01vZGVsTW9kYWwsIHNldFNob3dNb2RlbE1vZGFsXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbbW9kZWxCdXR0b25UZXh0LCBzZXRNb2RlbEJ1dHRvblRleHRdID0gdXNlU3RhdGUoXCJTZWxlY3QgT3B0aW9uXCIpO1xyXG5cclxuICBjb25zdCBoYW5kbGVNb2RlbENsaWNrID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgY29uc3QgbW9kZWxzRGF0YSA9IGF3YWl0IGZldGNoTW9kZWxzKFxyXG4gICAgICBzZWxlY3RlZE9FTSxcclxuICAgICAgc2VsZWN0ZWRNb2RhbGl0eSxcclxuICAgICAgc2VsZWN0ZWRDbGllbnRGcm9tXHJcbiAgICApO1xyXG4gICAgc2V0TW9kZWxzKG1vZGVsc0RhdGEpO1xyXG4gICAgc2V0TW9kZWxTZWFyY2hUZXJtKFwiXCIpO1xyXG4gICAgc2V0U2hvd01vZGVsTW9kYWwodHJ1ZSk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaGFuZGxlTW9kZWxTZWxlY3QgPSAobW9kZWxOYW1lKSA9PiB7XHJcbiAgICBzZXRNb2RlbEJ1dHRvblRleHQobW9kZWxOYW1lIHx8IFwiU2VsZWN0IE9wdGlvblwiKTtcclxuICAgIHNldFNlbGVjdGVkTW9kZWwobW9kZWxOYW1lIHx8IG51bGwpO1xyXG4gICAgc2V0U2hvd01vZGVsTW9kYWwoZmFsc2UpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGhhbmRsZUNsZWFyTW9kZWxTZWxlY3Rpb24gPSAoKSA9PiB7XHJcbiAgICBzZXRNb2RlbEJ1dHRvblRleHQoXCJTZWxlY3QgT3B0aW9uXCIpO1xyXG4gICAgc2V0U2VsZWN0ZWRNb2RlbChudWxsKTtcclxuICAgIHNldFNob3dNb2RlbE1vZGFsKGZhbHNlKTtcclxuICB9O1xyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIFdBUkVIT1VTRSBCVVRUT05TIChmb3IgQ2xpZW50IEN1cnJlbnQpXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICBjb25zdCBoYW5kbGVTb0NhbFdhcmVob3VzZUNsaWNrID0gKCkgPT4ge1xyXG4gICAgc2V0Q2xpZW50Q3VycmVudEJ1dHRvblRleHQoXCJTb0NhbCBXYXJlaG91c2VcIik7XHJcbiAgICBzZXRTZWxlY3RlZENsaWVudEN1cnJlbnQoU09DQUxfQ0xJRU5UX0lEKTtcclxuICAgIGNvbnNvbGUubG9nKFwiV2FyZWhvdXNlIGJ1dHRvbiBjbGlja2VkOiBzZXR0aW5nIENsaWVudCBDdXJyZW50IHRvXCIsIFNPQ0FMX0NMSUVOVF9JRCk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaGFuZGxlTm9yQ2FsV2FyZWhvdXNlQ2xpY2sgPSAoKSA9PiB7XHJcbiAgICBzZXRDbGllbnRDdXJyZW50QnV0dG9uVGV4dChcIk5vckNhbCBXYXJlaG91c2VcIik7XHJcbiAgICBzZXRTZWxlY3RlZENsaWVudEN1cnJlbnQoTk9SQ0FMX0NMSUVOVF9JRCk7XHJcbiAgICBjb25zb2xlLmxvZyhcIldhcmVob3VzZSBidXR0b24gY2xpY2tlZDogc2V0dGluZyBDbGllbnQgQ3VycmVudCB0b1wiLCBOT1JDQUxfQ0xJRU5UX0lEKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBoYW5kbGVXYXJlaG91c2VVbmFzc2lnbmVkQ2xpY2sgPSAoKSA9PiB7XHJcbiAgICBzZXRDbGllbnRDdXJyZW50QnV0dG9uVGV4dChcIlVuYXNzaWduZWRcIik7XHJcbiAgICBzZXRTZWxlY3RlZENsaWVudEN1cnJlbnQoVU5BU1NJR05FRF9DTElFTlRfSUQpO1xyXG4gICAgY29uc29sZS5sb2coXCJXYXJlaG91c2UgYnV0dG9uIGNsaWNrZWQ6IHNldHRpbmcgQ2xpZW50IEN1cnJlbnQgdG9cIiwgVU5BU1NJR05FRF9DTElFTlRfSUQpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IFtjbGllbnRTZWFyY2hUZXJtLCBzZXRDbGllbnRTZWFyY2hUZXJtXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFttb2RlbFNlYXJjaFRlcm0sIHNldE1vZGVsU2VhcmNoVGVybV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuXHJcbiAgY29uc3QgZGVsZXRlRnJvbVN0b3JhZ2UgPSBhc3luYyAoaXRlbUlkKSA9PiB7XHJcbiAgICBjb25zdCBzdG9yYWdlUmVmID0gZmlyZWJhc2Uuc3RvcmFnZSgpLnJlZigpO1xyXG4gICAgY29uc3QgZm9sZGVyUmVmID0gc3RvcmFnZVJlZi5jaGlsZChgUGFydHMvJHtpdGVtSWR9L2ApO1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgbGlzdFJlc3VsdCA9IGF3YWl0IGZvbGRlclJlZi5saXN0QWxsKCk7XHJcbiAgICAgIGNvbnN0IGRlbGV0ZVByb21pc2VzID0gbGlzdFJlc3VsdC5pdGVtcy5tYXAoKGl0ZW0pID0+IGl0ZW0uZGVsZXRlKCkpO1xyXG4gICAgICBhd2FpdCBQcm9taXNlLmFsbChkZWxldGVQcm9taXNlcyk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZGVsZXRpbmcgZnJvbSBzdG9yYWdlOlwiLCBlcnJvcik7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgZGVsZXRlRnJvbVBhcnRzQ29sbGVjdGlvbiA9IGFzeW5jIChpdGVtSWQpID0+IHtcclxuICAgIGNvbnN0IGRiID0gZmlyZWJhc2UuZmlyZXN0b3JlKCk7XHJcbiAgICB0cnkge1xyXG4gICAgICBhd2FpdCBkYi5jb2xsZWN0aW9uKFwiUGFydHNcIikuZG9jKGl0ZW1JZCkuZGVsZXRlKCk7XHJcbiAgICAgIGNvbnNvbGUubG9nKGBEZWxldGVkIGl0ZW0gZnJvbSBQYXJ0cyBjb2xsZWN0aW9uOiAke2l0ZW1JZH1gKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBkZWxldGluZyBmcm9tIFBhcnRzIGNvbGxlY3Rpb246XCIsIGVycm9yKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICAvLyAgIC8vIFNhZmVseSBjb252ZXJ0IGFueSBkYXRlLWlzaCB2YWx1ZSBpbnRvIGEgY29tcGFyYWJsZSB0aW1lc3RhbXAgKG1zIHNpbmNlIGVwb2NoKS5cclxuICAvLyBmdW5jdGlvbiB0b1RpbWUodmFsdWUpIHtcclxuICAvLyAgIGlmICghdmFsdWUpIHJldHVybiBudWxsO1xyXG5cclxuICAvLyAgIC8vIEZpcmVzdG9yZSBUaW1lc3RhbXA6IHsgc2Vjb25kcywgbmFub3NlY29uZHMgfVxyXG4gIC8vICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJiB2YWx1ZS5zZWNvbmRzKSB7XHJcbiAgLy8gICAgIHRyeSB7XHJcbiAgLy8gICAgICAgcmV0dXJuIHZhbHVlLnNlY29uZHMgKiAxMDAwO1xyXG4gIC8vICAgICB9IGNhdGNoIHsgLyogZmFsbHRocm91Z2ggKi8gfVxyXG4gIC8vICAgfVxyXG5cclxuICAvLyAgIC8vIElmIGFscmVhZHkgYSBEYXRlXHJcbiAgLy8gICBpZiAodmFsdWUgaW5zdGFuY2VvZiBEYXRlKSByZXR1cm4gaXNOYU4odmFsdWUuZ2V0VGltZSgpKSA/IG51bGwgOiB2YWx1ZS5nZXRUaW1lKCk7XHJcblxyXG4gIC8vICAgLy8gSWYgc3RyaW5nOiB0cnkgSVNPIGZpcnN0XHJcbiAgLy8gICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB7XHJcbiAgLy8gICAgIC8vIHl5eXktbW0tZGQgKGZyb20geW91ciBmb3JtIGlucHV0cylcclxuICAvLyAgICAgY29uc3QgaXNvID0gRGF0ZS5wYXJzZSh2YWx1ZSk7XHJcbiAgLy8gICAgIGlmICghaXNOYU4oaXNvKSkgcmV0dXJuIGlzbztcclxuXHJcbiAgLy8gICAgIC8vIG1tL2RkL3l5eXkgZmFsbGJhY2sgKG9sZGVyIGl0ZW1zKVxyXG4gIC8vICAgICBjb25zdCBwYXJ0cyA9IHZhbHVlLnNwbGl0KFwiL1wiKTtcclxuICAvLyAgICAgaWYgKHBhcnRzLmxlbmd0aCA9PT0gMykge1xyXG4gIC8vICAgICAgIGNvbnN0IFttbSwgZGQsIHl5eXldID0gcGFydHM7XHJcbiAgLy8gICAgICAgY29uc3QgYWx0ID0gRGF0ZS5wYXJzZShgJHt5eXl5fS0ke21tfS0ke2RkfWApO1xyXG4gIC8vICAgICAgIGlmICghaXNOYU4oYWx0KSkgcmV0dXJuIGFsdDtcclxuICAvLyAgICAgfVxyXG4gIC8vICAgfVxyXG5cclxuICAvLyAgIC8vIENhbm9uaWNhbGl6ZSBhbnkgZGF0ZS1pc2ggdmFsdWUgdG8gJ3l5eXktbW0tZGQnIHNvIGl0IG1hdGNoZXMgPGlucHV0IHR5cGU9XCJkYXRlXCI+IHZhbHVlc1xyXG4gIC8vICAgZnVuY3Rpb24gdG9ZTUQodmFsdWUpIHtcclxuICAvLyAgICAgY29uc3QgdCA9IHRvVGltZSh2YWx1ZSk7XHJcbiAgLy8gICAgIGlmICh0ID09IG51bGwpIHJldHVybiBudWxsO1xyXG4gIC8vICAgICBjb25zdCBkID0gbmV3IERhdGUodCk7XHJcbiAgLy8gICAgIGNvbnN0IHl5eXkgPSBkLmdldEZ1bGxZZWFyKCk7XHJcbiAgLy8gICAgIGNvbnN0IG1tID0gU3RyaW5nKGQuZ2V0TW9udGgoKSArIDEpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcclxuICAvLyAgICAgY29uc3QgZGQgPSBTdHJpbmcoZC5nZXREYXRlKCkpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcclxuICAvLyAgICAgcmV0dXJuIGAke3l5eXl9LSR7bW19LSR7ZGR9YDtcclxuICAvLyAgIH1cclxuXHJcblxyXG4gIC8vICAgLy8gTGFzdCByZXNvcnRcbiAgLy8gICBjb25zdCB0ID0gRGF0ZS5wYXJzZSh2YWx1ZSk7XG4gIC8vICAgcmV0dXJuIGlzTmFOKHQpID8gbnVsbCA6IHQ7XG4gIC8vIH1cblxuICBjb25zdCB0b3RhbEtub3duUGFnZXMgPSBNYXRoLm1heChcbiAgICAxLFxuICAgIHBhZ2VDdXJzb3JzLmZpbHRlcihCb29sZWFuKS5sZW5ndGggKyAoaGFzTmV4dFBhZ2UgPyAxIDogMClcbiAgKTtcbiAgY29uc3QgcGFnZUJ1dHRvbnMgPSAoKCkgPT4ge1xuICAgIGNvbnN0IGJ1dHRvbnMgPSBbXTtcbiAgICBjb25zdCBtYXhWaXNpYmxlID0gNztcblxuICAgIGNvbnN0IHB1c2hQYWdlID0gKHApID0+XG4gICAgICBidXR0b25zLnB1c2goXG4gICAgICAgIDxQYWdpbmF0aW9uLkl0ZW1cbiAgICAgICAgICBrZXk9e2BwYWdlLSR7cH1gfVxuICAgICAgICAgIGFjdGl2ZT17cCA9PT0gcGFnZX1cbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRQYWdlKHApfVxuICAgICAgICA+XG4gICAgICAgICAge3B9XG4gICAgICAgIDwvUGFnaW5hdGlvbi5JdGVtPlxuICAgICAgKTtcblxuICAgIGNvbnN0IHB1c2hFbGxpcHNpcyA9IChrZXkpID0+XG4gICAgICBidXR0b25zLnB1c2goPFBhZ2luYXRpb24uRWxsaXBzaXMga2V5PXtrZXl9IGRpc2FibGVkIC8+KTtcblxuICAgIGlmICh0b3RhbEtub3duUGFnZXMgPD0gbWF4VmlzaWJsZSkge1xuICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gdG90YWxLbm93blBhZ2VzOyBpICs9IDEpIHB1c2hQYWdlKGkpO1xuICAgICAgcmV0dXJuIGJ1dHRvbnM7XG4gICAgfVxuXG4gICAgbGV0IHN0YXJ0ID0gTWF0aC5tYXgoMiwgcGFnZSAtIDEpO1xuICAgIGxldCBlbmQgPSBNYXRoLm1pbih0b3RhbEtub3duUGFnZXMgLSAxLCBwYWdlICsgMSk7XG5cbiAgICBjb25zdCBkZXNpcmVkV2luZG93ID0gbWF4VmlzaWJsZSAtIDI7XG4gICAgbGV0IGN1cnJlbnRXaW5kb3cgPSBlbmQgLSBzdGFydCArIDE7XG4gICAgbGV0IHJlbWFpbmluZyA9IGRlc2lyZWRXaW5kb3cgLSBjdXJyZW50V2luZG93O1xuXG4gICAgd2hpbGUgKHJlbWFpbmluZyA+IDApIHtcbiAgICAgIGlmIChzdGFydCA+IDIpIHtcbiAgICAgICAgc3RhcnQgLT0gMTtcbiAgICAgICAgcmVtYWluaW5nIC09IDE7XG4gICAgICB9XG4gICAgICBpZiAocmVtYWluaW5nID4gMCAmJiBlbmQgPCB0b3RhbEtub3duUGFnZXMgLSAxKSB7XG4gICAgICAgIGVuZCArPSAxO1xuICAgICAgICByZW1haW5pbmcgLT0gMTtcbiAgICAgIH1cbiAgICAgIGlmIChzdGFydCA9PT0gMiAmJiBlbmQgPT09IHRvdGFsS25vd25QYWdlcyAtIDEpIGJyZWFrO1xuICAgIH1cblxuICAgIHB1c2hQYWdlKDEpO1xuICAgIGlmIChzdGFydCA+IDIpIHB1c2hFbGxpcHNpcyhcInN0YXJ0LWVsbGlwc2lzXCIpO1xuICAgIGZvciAobGV0IGkgPSBzdGFydDsgaSA8PSBlbmQ7IGkgKz0gMSkgcHVzaFBhZ2UoaSk7XG4gICAgaWYgKGVuZCA8IHRvdGFsS25vd25QYWdlcyAtIDEpIHB1c2hFbGxpcHNpcyhcImVuZC1lbGxpcHNpc1wiKTtcbiAgICBwdXNoUGFnZSh0b3RhbEtub3duUGFnZXMpO1xuICAgIGlmIChoYXNOZXh0UGFnZSkgcHVzaEVsbGlwc2lzKFwibW9yZS1lbGxpcHNpc1wiKTtcblxuICAgIHJldHVybiBidXR0b25zO1xuICB9KSgpO1xuXG4gIGNvbnN0IHJlY2FsY1BhZ2VTaXplID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm47XG4gICAgaWYgKHBhZ2UgIT09IDEpIHJldHVybjtcbiAgICBpZiAoIXRhYmxlQm9keVJlZi5jdXJyZW50KSByZXR1cm47XG4gICAgY29uc3QgY29udGFpbmVySGVpZ2h0ID1cbiAgICAgIHRhYmxlQm9keVJlZi5jdXJyZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodCB8fCAwO1xuICAgIGlmICghY29udGFpbmVySGVpZ2h0KSByZXR1cm47XG5cbiAgICBjb25zdCBoZWFkZXJSb3cgPVxuICAgICAgdGFibGVCb2R5UmVmLmN1cnJlbnQucXVlcnlTZWxlY3RvcihcInRhYmxlIHRoZWFkIHRyXCIpIHx8XG4gICAgICB0YWJsZUJvZHlSZWYuY3VycmVudC5xdWVyeVNlbGVjdG9yKFwidGhlYWQgdHJcIik7XG4gICAgY29uc3QgYm9keVJvdyA9XG4gICAgICB0YWJsZUJvZHlSZWYuY3VycmVudC5xdWVyeVNlbGVjdG9yKFwidGFibGUgdGJvZHkgdHJcIikgfHxcbiAgICAgIHRhYmxlQm9keVJlZi5jdXJyZW50LnF1ZXJ5U2VsZWN0b3IoXCJ0Ym9keSB0clwiKTtcblxuICAgIGlmIChoZWFkZXJSb3cpIHtcbiAgICAgIGNvbnN0IGggPSBoZWFkZXJSb3cuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xuICAgICAgaWYgKGgpIGhlYWRlckhlaWdodFJlZi5jdXJyZW50ID0gaDtcbiAgICB9XG4gICAgaWYgKGJvZHlSb3cpIHtcbiAgICAgIGNvbnN0IHIgPSBib2R5Um93LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcbiAgICAgIGlmIChyKSByb3dIZWlnaHRSZWYuY3VycmVudCA9IHI7XG4gICAgfVxuXG4gICAgY29uc3QgdmVydGljYWxQYWRkaW5nID0gMjQ7XG4gICAgY29uc3QgYXZhaWxhYmxlID1cbiAgICAgIGNvbnRhaW5lckhlaWdodCAtIGhlYWRlckhlaWdodFJlZi5jdXJyZW50IC0gdmVydGljYWxQYWRkaW5nO1xuICAgIGNvbnN0IGVzdGltYXRlZCA9IE1hdGguZmxvb3IoYXZhaWxhYmxlIC8gcm93SGVpZ2h0UmVmLmN1cnJlbnQpO1xuICAgIGNvbnN0IGNsYW1wZWQgPSBNYXRoLm1heCg1LCBNYXRoLm1pbig1MCwgZXN0aW1hdGVkKSk7XG4gICAgaWYgKGNsYW1wZWQgPiAwICYmIGNsYW1wZWQgIT09IHBhZ2VTaXplKSB7XG4gICAgICBzZXRQYWdlU2l6ZShjbGFtcGVkKTtcbiAgICAgIHJlc2V0UGFnaW5hdGlvbigpO1xuICAgICAgc2V0UXVlcnlFcG9jaCgodikgPT4gdiArIDEpO1xuICAgIH1cbiAgfSwgW3BhZ2UsIHBhZ2VTaXplXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuO1xuICAgIHJlY2FsY1BhZ2VTaXplKCk7XG4gICAgY29uc3Qgb25SZXNpemUgPSAoKSA9PiByZWNhbGNQYWdlU2l6ZSgpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIG9uUmVzaXplKTtcbiAgICByZXR1cm4gKCkgPT4gd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgb25SZXNpemUpO1xuICB9LCBbcmVjYWxjUGFnZVNpemVdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChpc0xvYWRpbmcgfHwgcGFnZSAhPT0gMSkgcmV0dXJuO1xuICAgIHJlY2FsY1BhZ2VTaXplKCk7XG4gIH0sIFtwYWdlLCBpc0xvYWRpbmcsIHJlY2FsY1BhZ2VTaXplXSk7XG5cbiAgY29uc3QgcmVuZGVyRmlsdGVycyA9IChpZFByZWZpeCkgPT4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuZmlsdGVyc1BhbmVsfT5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuZmlsdGVyc0hlYWRlcn0+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5maWx0ZXJzVGl0bGV9PkZpbHRlcnM8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmZpbHRlcnNTdWJ0aXRsZX0+XG4gICAgICAgICAgICBOYXJyb3cgcmVzdWx0cyBieSBtYWNoaW5lLCBjbGllbnQsIG9yIHdhcmVob3VzZS5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHtoYXNBY3RpdmVGaWx0ZXJzID8gKFxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17c3R5bGVzLmZpbHRlcnNCYWRnZX0+QWN0aXZlPC9zcGFuPlxuICAgICAgICApIDogbnVsbH1cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmZpbHRlclNlY3Rpb259PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmZpbHRlclNlY3Rpb25UaXRsZX0+TWFjaGluZTwvZGl2PlxuICAgICAgICA8SW5wdXRHcm91cCBjbGFzc05hbWU9e3N0eWxlcy5pbnB1dEdyb3VwfT5cbiAgICAgICAgICA8SW5wdXRHcm91cC5UZXh0Pk9FTTwvSW5wdXRHcm91cC5UZXh0PlxuICAgICAgICAgIDxEcm9wZG93biBvblNlbGVjdD17aGFuZGxlU2VsZWN0MX0gY2xhc3NOYW1lPVwidy0xMDBcIj5cbiAgICAgICAgICAgIDxEcm9wZG93bi5Ub2dnbGVcbiAgICAgICAgICAgICAgdmFyaWFudD1cIm91dGxpbmUtc2Vjb25kYXJ5XCJcbiAgICAgICAgICAgICAgaWQ9e2Ake2lkUHJlZml4fS1vZW1gfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2B3LTEwMCAke3N0eWxlcy5pbnB1dEJ1dHRvbn1gfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7ZHJvcGRvd24xVGV4dH1cbiAgICAgICAgICAgIDwvRHJvcGRvd24uVG9nZ2xlPlxuICAgICAgICAgICAgPERyb3Bkb3duLk1lbnUgY2xhc3NOYW1lPVwidy0xMDBcIj5cbiAgICAgICAgICAgICAgPERyb3Bkb3duLkl0ZW0gZXZlbnRLZXk9XCJ1bmFzc2lnbmVkXCI+U2VsZWN0IE9wdGlvbjwvRHJvcGRvd24uSXRlbT5cbiAgICAgICAgICAgICAgPERyb3Bkb3duLkl0ZW0gZXZlbnRLZXk9XCJHRVwiPkdFPC9Ecm9wZG93bi5JdGVtPlxuICAgICAgICAgICAgICA8RHJvcGRvd24uSXRlbSBldmVudEtleT1cIlRvc2hpYmFcIj5Ub3NoaWJhPC9Ecm9wZG93bi5JdGVtPlxuICAgICAgICAgICAgICA8RHJvcGRvd24uSXRlbSBldmVudEtleT1cIlNpZW1lbnNcIj5TaWVtZW5zPC9Ecm9wZG93bi5JdGVtPlxuICAgICAgICAgICAgICA8RHJvcGRvd24uSXRlbSBldmVudEtleT1cIlBoaWxpcHNcIj5QaGlsaXBzPC9Ecm9wZG93bi5JdGVtPlxuICAgICAgICAgICAgPC9Ecm9wZG93bi5NZW51PlxuICAgICAgICAgIDwvRHJvcGRvd24+XG4gICAgICAgIDwvSW5wdXRHcm91cD5cblxuICAgICAgICA8SW5wdXRHcm91cCBjbGFzc05hbWU9e3N0eWxlcy5pbnB1dEdyb3VwfT5cbiAgICAgICAgICA8SW5wdXRHcm91cC5UZXh0Pk1vZGFsaXR5PC9JbnB1dEdyb3VwLlRleHQ+XG4gICAgICAgICAgPERyb3Bkb3duIG9uU2VsZWN0PXtoYW5kbGVTZWxlY3QyfSBjbGFzc05hbWU9XCJ3LTEwMFwiPlxuICAgICAgICAgICAgPERyb3Bkb3duLlRvZ2dsZVxuICAgICAgICAgICAgICB2YXJpYW50PVwib3V0bGluZS1zZWNvbmRhcnlcIlxuICAgICAgICAgICAgICBpZD17YCR7aWRQcmVmaXh9LW1vZGFsaXR5YH1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdy0xMDAgJHtzdHlsZXMuaW5wdXRCdXR0b259YH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge2Ryb3Bkb3duMlRleHR9XG4gICAgICAgICAgICA8L0Ryb3Bkb3duLlRvZ2dsZT5cbiAgICAgICAgICAgIDxEcm9wZG93bi5NZW51IGNsYXNzTmFtZT1cInctMTAwXCI+XG4gICAgICAgICAgICAgIDxEcm9wZG93bi5JdGVtIGV2ZW50S2V5PVwidW5hc3NpZ25lZFwiPlNlbGVjdCBPcHRpb248L0Ryb3Bkb3duLkl0ZW0+XG4gICAgICAgICAgICAgIDxEcm9wZG93bi5JdGVtIGV2ZW50S2V5PVwiQ1RcIj5DVDwvRHJvcGRvd24uSXRlbT5cbiAgICAgICAgICAgICAgPERyb3Bkb3duLkl0ZW0gZXZlbnRLZXk9XCJNUklcIj5NUkk8L0Ryb3Bkb3duLkl0ZW0+XG4gICAgICAgICAgICA8L0Ryb3Bkb3duLk1lbnU+XG4gICAgICAgICAgPC9Ecm9wZG93bj5cbiAgICAgICAgPC9JbnB1dEdyb3VwPlxuXG4gICAgICAgIDxJbnB1dEdyb3VwIGNsYXNzTmFtZT17c3R5bGVzLmlucHV0R3JvdXB9PlxuICAgICAgICAgIDxJbnB1dEdyb3VwLlRleHQ+TW9kZWw8L0lucHV0R3JvdXAuVGV4dD5cbiAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICB2YXJpYW50PVwib3V0bGluZS1zZWNvbmRhcnlcIlxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgdy0xMDAgJHtzdHlsZXMuaW5wdXRCdXR0b259YH1cbiAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZU1vZGVsQ2xpY2t9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge21vZGVsQnV0dG9uVGV4dH1cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgPC9JbnB1dEdyb3VwPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuZmlsdGVyU2VjdGlvbn0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuZmlsdGVyU2VjdGlvblRpdGxlfT5DbGllbnQ8L2Rpdj5cbiAgICAgICAgPElucHV0R3JvdXAgY2xhc3NOYW1lPXtzdHlsZXMuaW5wdXRHcm91cH0+XG4gICAgICAgICAgPElucHV0R3JvdXAuVGV4dD5DbGllbnQgRnJvbTwvSW5wdXRHcm91cC5UZXh0PlxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIHZhcmlhbnQ9XCJvdXRsaW5lLXNlY29uZGFyeVwiXG4gICAgICAgICAgICBjbGFzc05hbWU9e2B3LTEwMCAke3N0eWxlcy5pbnB1dEJ1dHRvbn1gfVxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlQ2xpZW50Q2xpY2soXCJmcm9tXCIpfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtjbGllbnRGcm9tQnV0dG9uVGV4dH1cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgPC9JbnB1dEdyb3VwPlxuXG4gICAgICAgIDxJbnB1dEdyb3VwIGNsYXNzTmFtZT17c3R5bGVzLmlucHV0R3JvdXB9PlxuICAgICAgICAgIDxJbnB1dEdyb3VwLlRleHQ+Q2xpZW50IEN1cnJlbnQ8L0lucHV0R3JvdXAuVGV4dD5cbiAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICB2YXJpYW50PVwib3V0bGluZS1zZWNvbmRhcnlcIlxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgdy0xMDAgJHtzdHlsZXMuaW5wdXRCdXR0b259YH1cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZUNsaWVudENsaWNrKFwiY3VycmVudFwiKX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7Y2xpZW50Q3VycmVudEJ1dHRvblRleHR9XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgIDwvSW5wdXRHcm91cD5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmZpbHRlclNlY3Rpb259PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmZpbHRlclNlY3Rpb25UaXRsZX0+V2FyZWhvdXNlPC9kaXY+XG4gICAgICAgIDxJbnB1dEdyb3VwIGNsYXNzTmFtZT17c3R5bGVzLmlucHV0R3JvdXB9PlxuICAgICAgICAgIDxJbnB1dEdyb3VwLlRleHQ+UXVpY2s8L0lucHV0R3JvdXAuVGV4dD5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmJ1dHRvbkdyb3VwfT5cbiAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgdmFyaWFudD1cIm91dGxpbmUtc2Vjb25kYXJ5XCJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMuZmxleEJ1dHRvbn1cbiAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlU29DYWxXYXJlaG91c2VDbGlja31cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgU29DYWwgV2FyZWhvdXNlXG4gICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgdmFyaWFudD1cIm91dGxpbmUtc2Vjb25kYXJ5XCJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMuZmxleEJ1dHRvbn1cbiAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlTm9yQ2FsV2FyZWhvdXNlQ2xpY2t9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIE5vckNhbCBXYXJlaG91c2VcbiAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICB2YXJpYW50PVwib3V0bGluZS1zZWNvbmRhcnlcIlxuICAgICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5mbGV4QnV0dG9ufVxuICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVXYXJlaG91c2VVbmFzc2lnbmVkQ2xpY2t9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIFVuYXNzaWduZWRcbiAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L0lucHV0R3JvdXA+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcblxuXG4gIHJldHVybiAoXG4gICAgPExvZ2dlZEluPlxuICAgICAgeyhpc0RlbGV0aW5nIHx8IGlzTmF2aWdhdGluZykgJiYgKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmxvYWRpbmdPdmVybGF5fT5cbiAgICAgICAgICA8aW1nXG4gICAgICAgICAgICBzcmM9XCIvbWFnbW8tbG9nby5wbmdcIlxuICAgICAgICAgICAgYWx0PVwiTG9hZGluZyBNYWdtb1wiXG4gICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5sb2FkaW5nTG9nb31cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG4gICAgICA8TW9kYWwgc2hvdz17c2hvd0RlbGV0ZU1vZGFsfSBvbkhpZGU9e2hhbmRsZUNsb3NlRGVsZXRlTW9kYWx9PlxyXG4gICAgICAgIDxNb2RhbC5IZWFkZXIgY2xvc2VCdXR0b24+XHJcbiAgICAgICAgICA8TW9kYWwuVGl0bGU+Q29uZmlybSBEZWxldGlvbjwvTW9kYWwuVGl0bGU+XHJcbiAgICAgICAgPC9Nb2RhbC5IZWFkZXI+XHJcbiAgICAgICAgPE1vZGFsLkJvZHk+XHJcbiAgICAgICAgICBBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIHtzZWxlY3RlZEl0ZW1zLmxlbmd0aH0gaXRlbVxyXG4gICAgICAgICAge3NlbGVjdGVkSXRlbXMubGVuZ3RoID4gMSA/IFwic1wiIDogXCJcIn0/XHJcbiAgICAgICAgPC9Nb2RhbC5Cb2R5PlxyXG4gICAgICAgIDxNb2RhbC5Gb290ZXI+XHJcbiAgICAgICAgICA8QnV0dG9uIHZhcmlhbnQ9XCJkYW5nZXJcIiBvbkNsaWNrPXtoYW5kbGVEZWxldGVTZWxlY3RlZH0+XHJcbiAgICAgICAgICAgIFllcywgZGVsZXRlXHJcbiAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICAgIDxCdXR0b24gdmFyaWFudD1cInNlY29uZGFyeVwiIG9uQ2xpY2s9e2hhbmRsZUNsb3NlRGVsZXRlTW9kYWx9PlxyXG4gICAgICAgICAgICBDYW5jZWxcclxuICAgICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICAgIDwvTW9kYWwuRm9vdGVyPlxyXG4gICAgICA8L01vZGFsPlxyXG5cclxuICAgICAgPE1vZGFsIHNob3c9e3Nob3dDbGllbnRNb2RhbH0gb25IaWRlPXsoKSA9PiBzZXRTaG93Q2xpZW50TW9kYWwoZmFsc2UpfT5cclxuICAgICAgICA8TW9kYWwuSGVhZGVyIGNsb3NlQnV0dG9uPlxyXG4gICAgICAgICAgPE1vZGFsLlRpdGxlPlxyXG4gICAgICAgICAgICBTZWxlY3Qge2NsaWVudFNlbGVjdGlvblR5cGUgPT09IFwiZnJvbVwiID8gXCJDbGllbnQgRnJvbVwiIDogXCJDbGllbnQgQ3VycmVudFwifVxyXG4gICAgICAgICAgPC9Nb2RhbC5UaXRsZT5cclxuICAgICAgICA8L01vZGFsLkhlYWRlcj5cclxuICAgICAgICA8TW9kYWwuQm9keT5cclxuICAgICAgICAgIDxGb3JtQ29udHJvbFxyXG4gICAgICAgICAgICB0eXBlPVwidGV4dFwiXHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoIGJ5IG5hbWVcIlxyXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJtYi0zXCJcclxuICAgICAgICAgICAgdmFsdWU9e2NsaWVudFNlYXJjaFRlcm19XHJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0Q2xpZW50U2VhcmNoVGVybShlLnRhcmdldC52YWx1ZSl9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICAgPENsaWVudFRhYmxlXHJcbiAgICAgICAgICAgIGNsaWVudHM9eyhBcnJheS5pc0FycmF5KGNsaWVudHMpID8gY2xpZW50cyA6IFtdKS5maWx0ZXIoXHJcbiAgICAgICAgICAgICAgKGNsaWVudCkgPT4gKGNsaWVudD8ubmFtZSA/PyBcIlwiKS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKGNsaWVudFNlYXJjaFRlcm0udG9Mb3dlckNhc2UoKSlcclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgb25TZWxlY3RDbGllbnQ9e2hhbmRsZUNsaWVudFNlbGVjdH1cclxuICAgICAgICAgICAgb25JbmZvQ2xpY2s9e2hhbmRsZUNsaWVudEluZm99XHJcbiAgICAgICAgICAgIGlzQ2xpZW50U2VhcmNoPXtmYWxzZX1cclxuICAgICAgICAgICAgY2xlYXJTZWxlY3Rpb249eygpID0+IGhhbmRsZUNsaWVudFNlbGVjdChudWxsKX1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgPC9Nb2RhbC5Cb2R5PlxyXG4gICAgICA8L01vZGFsPlxyXG5cclxuICAgICAgPE1vZGFsIHNob3c9e3Nob3dNb2RlbE1vZGFsfSBvbkhpZGU9eygpID0+IHNldFNob3dNb2RlbE1vZGFsKGZhbHNlKX0+XHJcbiAgICAgICAgPE1vZGFsLkhlYWRlciBjbG9zZUJ1dHRvbj5cclxuICAgICAgICAgIDxNb2RhbC5UaXRsZT5TZWxlY3QgTW9kZWw8L01vZGFsLlRpdGxlPlxyXG4gICAgICAgIDwvTW9kYWwuSGVhZGVyPlxyXG4gICAgICAgIDxNb2RhbC5Cb2R5PlxyXG4gICAgICAgICAgPEZvcm1Db250cm9sXHJcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJTZWFyY2ggYnkgbmFtZVwiXHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1iLTNcIlxyXG4gICAgICAgICAgICB2YWx1ZT17bW9kZWxTZWFyY2hUZXJtfVxyXG4gICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldE1vZGVsU2VhcmNoVGVybShlLnRhcmdldC52YWx1ZSl9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICAgPE1vZGVsVGFibGVcclxuICAgICAgICAgICAgbW9kZWxzPXttb2RlbHMuZmlsdGVyKChtb2RlbCkgPT5cclxuICAgICAgICAgICAgICB0eXBlb2YgbW9kZWwgPT09IFwic3RyaW5nXCJcclxuICAgICAgICAgICAgICAgID8gbW9kZWwudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhtb2RlbFNlYXJjaFRlcm0udG9Mb3dlckNhc2UoKSlcclxuICAgICAgICAgICAgICAgIDogZmFsc2VcclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgb25TZWxlY3RNb2RlbD17aGFuZGxlTW9kZWxTZWxlY3R9XHJcbiAgICAgICAgICAgIGNsZWFyU2VsZWN0aW9uPXsoKSA9PiBoYW5kbGVNb2RlbFNlbGVjdChudWxsKX1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgPC9Nb2RhbC5Cb2R5PlxyXG4gICAgICA8L01vZGFsPlxyXG5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5wYWdlfT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5wYWdlSW5uZXJ9PlxuICAgICAgICAgIDxoZWFkZXIgY2xhc3NOYW1lPXtzdHlsZXMuaGVhZGVyfT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuaGVhZGVyTGVmdH0+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5idXJnZXJ9XG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0U2hvd0ZpbHRlcnModHJ1ZSl9XG4gICAgICAgICAgICAgICAgYXJpYS1sYWJlbD1cIk9wZW4gZmlsdGVyc1wiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8c3Bhbj48L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4+PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuPjwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuYnJhbmR9PlxuICAgICAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgICAgIHNyYz1cIi9tYWdtby1sb2dvLnBuZ1wiXG4gICAgICAgICAgICAgICAgICBhbHQ9XCJNYWdtb1wiXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5icmFuZExvZ299XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5icmFuZE5hbWV9Pk1hZ21vPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmJyYW5kU3VifT5JbnZlbnRvcnkgU2VhcmNoPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmhlYWRlclJpZ2h0fT5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5oZWFkZXJTdGF0dXN9PlxuICAgICAgICAgICAgICAgIHtoYXNBY3RpdmVGaWx0ZXJzID8gXCJGaWx0ZXJzIGFjdGl2ZVwiIDogXCJBbGwgaXRlbXNcIn1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2hlYWRlcj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuY29udGVudH0+XG4gICAgICAgICAgICA8YXNpZGUgY2xhc3NOYW1lPXtzdHlsZXMuc2lkZWJhcn0+e3JlbmRlckZpbHRlcnMoXCJzaWRlYmFyXCIpfTwvYXNpZGU+XG4gICAgICAgICAgICA8bWFpbiBjbGFzc05hbWU9e3N0eWxlcy5tYWlufT5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy50YWJsZUNhcmR9PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMudGFibGVIZWFkZXJ9PlxuICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy50YWJsZVRpdGxlfT5JdGVtczwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnRhYmxlU3VidGl0bGV9PlxuICAgICAgICAgICAgICAgICAgICAgIHtpc0xvYWRpbmcgPyBcIkxvYWRpbmcgaXRlbXNcIiA6IGAke2luZm8ubGVuZ3RofSBpdGVtcyBvbiB0aGlzIHBhZ2VgfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy50YWJsZU1ldGF9PlxuICAgICAgICAgICAgICAgICAgICBQYWdlIHtwYWdlfSB7aGFzTmV4dFBhZ2UgPyBgb2YgJHt0b3RhbEtub3duUGFnZXN9K2AgOiBgb2YgJHt0b3RhbEtub3duUGFnZXN9YH1cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy50YWJsZUJvZHl9IHJlZj17dGFibGVCb2R5UmVmfT5cbiAgICAgICAgICAgICAgICAgIHtpc0xvYWRpbmcgPyAoXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubG9hZGluZ1N0YXRlfT5cbiAgICAgICAgICAgICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgICAgICAgICAgICBzcmM9XCIvbWFnbW8tbG9nby5wbmdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgYWx0PVwiTG9hZGluZyBNYWdtb1wiXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5sb2FkaW5nTG9nb31cbiAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubG9hZGluZ1RleHR9PkxvYWRpbmc8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICApIDogbG9hZEVycm9yID8gKFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmVycm9yU3RhdGV9PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuZXJyb3JUaXRsZX0+XG4gICAgICAgICAgICAgICAgICAgICAgICBMb2FkIGZhaWxlZCAoe2xvYWRFcnJvci5jb2RlfSlcbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmVycm9yTWVzc2FnZX0+e2xvYWRFcnJvci5tZXNzYWdlfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhbnQ9XCJvdXRsaW5lLXNlY29uZGFyeVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBzaXplPVwic21cIlxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICByZXNldFBhZ2luYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0UXVlcnlFcG9jaCgodikgPT4gdiArIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICBSZXRyeVxuICAgICAgICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICAgIDxQYXJ0VGFibGVcbiAgICAgICAgICAgICAgICAgICAgICBpbmZvPXtpbmZvfVxuICAgICAgICAgICAgICAgICAgICAgIGxhYmVscz17bGFiZWxzfVxuICAgICAgICAgICAgICAgICAgICAgIGlkcz17aWRzfVxuICAgICAgICAgICAgICAgICAgICAgIGhvdmVyU3R5bGU9e2hvdmVyU3R5bGV9XG4gICAgICAgICAgICAgICAgICAgICAgc29ydENoZWNrQWxsPXtzb3J0Q2hlY2tBbGx9XG4gICAgICAgICAgICAgICAgICAgICAgY2hlY2tEZWxldGU9e2NoZWNrRGVsZXRlfVxuICAgICAgICAgICAgICAgICAgICAgIGlzRGVsZXRpbmc9e2lzRGVsZXRpbmd9XG4gICAgICAgICAgICAgICAgICAgICAgcm93U2VsZWN0PXtyb3dTZWxlY3R9XG4gICAgICAgICAgICAgICAgICAgICAgc2V0SG92ZXJJbmRleD17c2V0SG92ZXJJbmRleH1cbiAgICAgICAgICAgICAgICAgICAgICBob3ZlckluZGV4PXtob3ZlckluZGV4fVxuICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkSXRlbXM9e3NlbGVjdGVkSXRlbXN9XG4gICAgICAgICAgICAgICAgICAgICAgc2V0U2VsZWN0ZWRJdGVtcz17c2V0U2VsZWN0ZWRJdGVtc31cbiAgICAgICAgICAgICAgICAgICAgICBtaW5Sb3dzPXtwYWdlU2l6ZX1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnRhYmxlRm9vdGVyfT5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMucGFnaW5hdGlvblJvd30+XG4gICAgICAgICAgICAgICAgICAgIDxQYWdpbmF0aW9uIHNpemU9XCJzbVwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxQYWdpbmF0aW9uLlByZXZcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFBhZ2UoKHApID0+IE1hdGgubWF4KDEsIHAgLSAxKSl9XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17cGFnZSA8PSAxfVxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIFByZXZpb3VzXG4gICAgICAgICAgICAgICAgICAgICAgPC9QYWdpbmF0aW9uLlByZXY+XG4gICAgICAgICAgICAgICAgICAgICAge3BhZ2VCdXR0b25zfVxuICAgICAgICAgICAgICAgICAgICAgIDxQYWdpbmF0aW9uLk5leHRcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFBhZ2UoKHApID0+IHAgKyAxKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXshaGFzTmV4dFBhZ2V9XG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgTmV4dFxuICAgICAgICAgICAgICAgICAgICAgIDwvUGFnaW5hdGlvbi5OZXh0PlxuICAgICAgICAgICAgICAgICAgICA8L1BhZ2luYXRpb24+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxGb3JtIGNsYXNzTmFtZT17c3R5bGVzLnNlYXJjaFJvd30+XG4gICAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbFxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU9e3Nob3dMaXN0U2VhcmNofVxuICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoXCJcbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5zZWFyY2hJbnB1dH1cbiAgICAgICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPVwiU2VhcmNoXCJcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17c2VhcmNofVxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtzZWFyY2hDaGFuZ2VIYW5kbGVyfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8TmF2RHJvcGRvd25cbiAgICAgICAgICAgICAgICAgICAgICB0aXRsZT17c2VsZWN0fVxuICAgICAgICAgICAgICAgICAgICAgIGlkPVwiY29sbGFzaWJsZS1uYXYtZHJvcGRvd25cIlxuICAgICAgICAgICAgICAgICAgICAgIHNob3c9e3Nob3dMaXN0fVxuICAgICAgICAgICAgICAgICAgICAgIG9uTW91c2VFbnRlcj17KCkgPT4gc2V0U2hvd0xpc3QodHJ1ZSl9XG4gICAgICAgICAgICAgICAgICAgICAgb25Nb3VzZUxlYXZlPXsoKSA9PiBzZXRTaG93TGlzdChmYWxzZSl9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMuc2VhcmNoU2VsZWN0fVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgPE5hdkRyb3Bkb3duLkl0ZW1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2VsZWN0KFwiTmFtZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2hvd0xpc3RTZWFyY2goXCJ0ZXh0XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICBOYW1lXG4gICAgICAgICAgICAgICAgICAgICAgPC9OYXZEcm9wZG93bi5JdGVtPlxuICAgICAgICAgICAgICAgICAgICAgIDxOYXZEcm9wZG93bi5JdGVtXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNlbGVjdChcIkRhdGVcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNob3dMaXN0U2VhcmNoKFwiZGF0ZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgRGF0ZVxuICAgICAgICAgICAgICAgICAgICAgIDwvTmF2RHJvcGRvd24uSXRlbT5cbiAgICAgICAgICAgICAgICAgICAgICA8TmF2RHJvcGRvd24uSXRlbVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTZWxlY3QoXCJXb3JrIE9yZGVyXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTaG93TGlzdFNlYXJjaChcInRleHRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIFdvcmsgT3JkZXJcbiAgICAgICAgICAgICAgICAgICAgICA8L05hdkRyb3Bkb3duLkl0ZW0+XG4gICAgICAgICAgICAgICAgICAgICAgPE5hdkRyb3Bkb3duLkl0ZW1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2VsZWN0KFwiUHJvZHVjdCBOdW1iZXJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNob3dMaXN0U2VhcmNoKFwidGV4dFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgUHJvZHVjdCBOdW1iZXJcbiAgICAgICAgICAgICAgICAgICAgICA8L05hdkRyb3Bkb3duLkl0ZW0+XG4gICAgICAgICAgICAgICAgICAgICAgPE5hdkRyb3Bkb3duLkl0ZW1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2VsZWN0KFwiU2VyaWFsIE51bWJlclwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2hvd0xpc3RTZWFyY2goXCJ0ZXh0XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICBTZXJpYWwgTnVtYmVyXG4gICAgICAgICAgICAgICAgICAgICAgPC9OYXZEcm9wZG93bi5JdGVtPlxuICAgICAgICAgICAgICAgICAgICAgIDxOYXZEcm9wZG93bi5JdGVtXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNlbGVjdChcIkRlc2NyaXB0aW9uXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTaG93TGlzdFNlYXJjaChcInRleHRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIERlc2NyaXB0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgPC9OYXZEcm9wZG93bi5JdGVtPlxuICAgICAgICAgICAgICAgICAgICAgIDxOYXZEcm9wZG93bi5JdGVtXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNlbGVjdChcIlNLVVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2hvd0xpc3RTZWFyY2goXCJ0ZXh0XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICBTS1VcbiAgICAgICAgICAgICAgICAgICAgICA8L05hdkRyb3Bkb3duLkl0ZW0+XG4gICAgICAgICAgICAgICAgICAgIDwvTmF2RHJvcGRvd24+XG4gICAgICAgICAgICAgICAgICA8L0Zvcm0+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmZvb3RlckFjdGlvbnN9PlxuICAgICAgICAgICAgICAgICAgICA8TG9hZGluZ0J1dHRvblxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJzZWNvbmRhcnlcIlxuICAgICAgICAgICAgICAgICAgICAgIG5hbWU9XCJBZGQgTmV3IEl0ZW1cIlxuICAgICAgICAgICAgICAgICAgICAgIHJvdXRlPVwiTmV3U2VhcmNoL0FkZEl0ZW0vTmV3SXRlbVwiXG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMuYWN0aW9uQnV0dG9ufVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgdmFyaWFudD1cImluZm9cIlxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YCR7c3R5bGVzLmFjdGlvbkJ1dHRvbn0gJHtzdHlsZXMubWFwQWN0aW9uQnV0dG9ufWB9XG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17b3Blbk1hcH1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIE1hcFxuICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPExvYWRpbmdCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwicHJpbWFyeVwiXG4gICAgICAgICAgICAgICAgICAgICAgbmFtZT1cIkJhY2tcIlxuICAgICAgICAgICAgICAgICAgICAgIHJvdXRlPVwiV2FyZWhvdXNlZGIvV2FyZWhvdXNlU2VsZWN0XCJcbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5hY3Rpb25CdXR0b259XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L21haW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxPZmZjYW52YXNcbiAgICAgICAgICBzaG93PXtzaG93RmlsdGVyc31cbiAgICAgICAgICBvbkhpZGU9eygpID0+IHNldFNob3dGaWx0ZXJzKGZhbHNlKX1cbiAgICAgICAgICBwbGFjZW1lbnQ9XCJzdGFydFwiXG4gICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMuZmlsdGVyc0RyYXdlcn1cbiAgICAgICAgICBzY3JvbGxcbiAgICAgICAgICBiYWNrZHJvcFxuICAgICAgICA+XG4gICAgICAgICAgPE9mZmNhbnZhcy5IZWFkZXIgY2xvc2VCdXR0b24+XG4gICAgICAgICAgICA8T2ZmY2FudmFzLlRpdGxlPkZpbHRlcnM8L09mZmNhbnZhcy5UaXRsZT5cbiAgICAgICAgICA8L09mZmNhbnZhcy5IZWFkZXI+XG4gICAgICAgICAgPE9mZmNhbnZhcy5Cb2R5PntyZW5kZXJGaWx0ZXJzKFwiZHJhd2VyXCIpfTwvT2ZmY2FudmFzLkJvZHk+XG4gICAgICAgIDwvT2ZmY2FudmFzPlxuXG4gICAgICAgIDxXYXJlaG91c2VNYXBNb2RhbFxuICAgICAgICAgIHNob3c9e3Nob3dNYXB9XG4gICAgICAgICAgb25IaWRlPXsoKSA9PiBzZXRTaG93TWFwKGZhbHNlKX1cbiAgICAgICAgICBvblZpZXc9e2hhbmRsZU1hcFZpZXd9XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICA8L0xvZ2dlZEluPlxuICApO1xuXHJcblxyXG59XHJcblxyXG4iLCIvLyBFeHBvcnRzXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0XCJjbGllbnRUYWJsZUNvbnRhaW5lclwiOiBcIkNsaWVudFRhYmxlX2NsaWVudFRhYmxlQ29udGFpbmVyX18xZTl1blwiLFxuXHRcImNsaWVudFRhYmxlXCI6IFwiQ2xpZW50VGFibGVfY2xpZW50VGFibGVfXzE5NHY3XCIsXG5cdFwiYWN0aW9uUm93XCI6IFwiQ2xpZW50VGFibGVfYWN0aW9uUm93X185RWZLS1wiLFxuXHRcImFjdGlvbkJ1dHRvbnNcIjogXCJDbGllbnRUYWJsZV9hY3Rpb25CdXR0b25zX18xVnRnZ1wiLFxuXHRcImJ1dHRvbkdyb3VwXCI6IFwiQ2xpZW50VGFibGVfYnV0dG9uR3JvdXBfX3BTWjd5XCIsXG5cdFwiZmxleEJ1dHRvblwiOiBcIkNsaWVudFRhYmxlX2ZsZXhCdXR0b25fX0xvTmlTXCJcbn07XG4iLCIvLyBFeHBvcnRzXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0XCJwYWdlXCI6IFwiTWFpblNlYXJjaF9wYWdlX18zS1dyZVwiLFxuXHRcInBhZ2VJbm5lclwiOiBcIk1haW5TZWFyY2hfcGFnZUlubmVyX18yRi1Eb1wiLFxuXHRcImhlYWRlclwiOiBcIk1haW5TZWFyY2hfaGVhZGVyX18yWEwtMFwiLFxuXHRcImhlYWRlckxlZnRcIjogXCJNYWluU2VhcmNoX2hlYWRlckxlZnRfXzJOSG5ZXCIsXG5cdFwiYnVyZ2VyXCI6IFwiTWFpblNlYXJjaF9idXJnZXJfXzE2RTlHXCIsXG5cdFwiYnJhbmRcIjogXCJNYWluU2VhcmNoX2JyYW5kX18xSGxUOFwiLFxuXHRcImJyYW5kTG9nb1wiOiBcIk1haW5TZWFyY2hfYnJhbmRMb2dvX18xanpsVlwiLFxuXHRcImJyYW5kTmFtZVwiOiBcIk1haW5TZWFyY2hfYnJhbmROYW1lX18zc3I2elwiLFxuXHRcImJyYW5kU3ViXCI6IFwiTWFpblNlYXJjaF9icmFuZFN1Yl9fMld4NkpcIixcblx0XCJoZWFkZXJSaWdodFwiOiBcIk1haW5TZWFyY2hfaGVhZGVyUmlnaHRfXzFjN1hnXCIsXG5cdFwiaGVhZGVyU3RhdHVzXCI6IFwiTWFpblNlYXJjaF9oZWFkZXJTdGF0dXNfXzM5RFNFXCIsXG5cdFwiY29udGVudFwiOiBcIk1haW5TZWFyY2hfY29udGVudF9fM19kUENcIixcblx0XCJzaWRlYmFyXCI6IFwiTWFpblNlYXJjaF9zaWRlYmFyX18yUWU4UVwiLFxuXHRcImZpbHRlcnNQYW5lbFwiOiBcIk1haW5TZWFyY2hfZmlsdGVyc1BhbmVsX19fbVZTcVwiLFxuXHRcImZpbHRlcnNIZWFkZXJcIjogXCJNYWluU2VhcmNoX2ZpbHRlcnNIZWFkZXJfXzI3eXRYXCIsXG5cdFwiZmlsdGVyc1RpdGxlXCI6IFwiTWFpblNlYXJjaF9maWx0ZXJzVGl0bGVfXzJPUGNyXCIsXG5cdFwiZmlsdGVyc1N1YnRpdGxlXCI6IFwiTWFpblNlYXJjaF9maWx0ZXJzU3VidGl0bGVfXzIxMEd5XCIsXG5cdFwiZmlsdGVyc0JhZGdlXCI6IFwiTWFpblNlYXJjaF9maWx0ZXJzQmFkZ2VfXzJUNlpDXCIsXG5cdFwiZmlsdGVyU2VjdGlvblwiOiBcIk1haW5TZWFyY2hfZmlsdGVyU2VjdGlvbl9fblFtN2xcIixcblx0XCJmaWx0ZXJTZWN0aW9uVGl0bGVcIjogXCJNYWluU2VhcmNoX2ZpbHRlclNlY3Rpb25UaXRsZV9fM1ltUlhcIixcblx0XCJpbnB1dEdyb3VwXCI6IFwiTWFpblNlYXJjaF9pbnB1dEdyb3VwX18yNHpXYlwiLFxuXHRcImlucHV0QnV0dG9uXCI6IFwiTWFpblNlYXJjaF9pbnB1dEJ1dHRvbl9fM0FRMGtcIixcblx0XCJidXR0b25Hcm91cFwiOiBcIk1haW5TZWFyY2hfYnV0dG9uR3JvdXBfXzFHV0k2XCIsXG5cdFwiZmxleEJ1dHRvblwiOiBcIk1haW5TZWFyY2hfZmxleEJ1dHRvbl9fM3pucURcIixcblx0XCJtYWluXCI6IFwiTWFpblNlYXJjaF9tYWluX185cVdtYlwiLFxuXHRcInRhYmxlQ2FyZFwiOiBcIk1haW5TZWFyY2hfdGFibGVDYXJkX19IV1AwMFwiLFxuXHRcInRhYmxlSGVhZGVyXCI6IFwiTWFpblNlYXJjaF90YWJsZUhlYWRlcl9fSEtVYndcIixcblx0XCJ0YWJsZVRpdGxlXCI6IFwiTWFpblNlYXJjaF90YWJsZVRpdGxlX18yZ0Vlb1wiLFxuXHRcInRhYmxlU3VidGl0bGVcIjogXCJNYWluU2VhcmNoX3RhYmxlU3VidGl0bGVfXzJjQjY0XCIsXG5cdFwidGFibGVNZXRhXCI6IFwiTWFpblNlYXJjaF90YWJsZU1ldGFfXzMyR09xXCIsXG5cdFwidGFibGVCb2R5XCI6IFwiTWFpblNlYXJjaF90YWJsZUJvZHlfXzNvV2NfXCIsXG5cdFwidGFibGVGb290ZXJcIjogXCJNYWluU2VhcmNoX3RhYmxlRm9vdGVyX19GdjN6d1wiLFxuXHRcInBhZ2luYXRpb25Sb3dcIjogXCJNYWluU2VhcmNoX3BhZ2luYXRpb25Sb3dfXzNwcGRFXCIsXG5cdFwic2VhcmNoUm93XCI6IFwiTWFpblNlYXJjaF9zZWFyY2hSb3dfXzMtNmZkXCIsXG5cdFwic2VhcmNoSW5wdXRcIjogXCJNYWluU2VhcmNoX3NlYXJjaElucHV0X18yNUE1VVwiLFxuXHRcInNlYXJjaFNlbGVjdFwiOiBcIk1haW5TZWFyY2hfc2VhcmNoU2VsZWN0X18zMHJQZ1wiLFxuXHRcImZvb3RlckFjdGlvbnNcIjogXCJNYWluU2VhcmNoX2Zvb3RlckFjdGlvbnNfXzJYUFBDXCIsXG5cdFwiYWN0aW9uQnV0dG9uXCI6IFwiTWFpblNlYXJjaF9hY3Rpb25CdXR0b25fXzNtMUxKXCIsXG5cdFwibWFwQWN0aW9uQnV0dG9uXCI6IFwiTWFpblNlYXJjaF9tYXBBY3Rpb25CdXR0b25fXzNySGIyXCIsXG5cdFwibG9hZGluZ092ZXJsYXlcIjogXCJNYWluU2VhcmNoX2xvYWRpbmdPdmVybGF5X18xdzlXV1wiLFxuXHRcInNwaW5uZXJDZW50ZXJcIjogXCJNYWluU2VhcmNoX3NwaW5uZXJDZW50ZXJfXzFSSG5qXCIsXG5cdFwibG9hZGluZ1N0YXRlXCI6IFwiTWFpblNlYXJjaF9sb2FkaW5nU3RhdGVfX2lzVi00XCIsXG5cdFwibG9hZGluZ0xvZ29cIjogXCJNYWluU2VhcmNoX2xvYWRpbmdMb2dvX18zU2g0aVwiLFxuXHRcIm1hZ21vLXNwaW5cIjogXCJNYWluU2VhcmNoX21hZ21vLXNwaW5fXzNkRkdRXCIsXG5cdFwibG9hZGluZ1RleHRcIjogXCJNYWluU2VhcmNoX2xvYWRpbmdUZXh0X18xQ0NRWFwiLFxuXHRcImVycm9yU3RhdGVcIjogXCJNYWluU2VhcmNoX2Vycm9yU3RhdGVfXzFHbEI2XCIsXG5cdFwiZXJyb3JUaXRsZVwiOiBcIk1haW5TZWFyY2hfZXJyb3JUaXRsZV9fMTUwdTNcIixcblx0XCJlcnJvck1lc3NhZ2VcIjogXCJNYWluU2VhcmNoX2Vycm9yTWVzc2FnZV9fMUxiYmdcIixcblx0XCJmaWx0ZXJzRHJhd2VyXCI6IFwiTWFpblNlYXJjaF9maWx0ZXJzRHJhd2VyX19RNk4tbVwiLFxuXHRcIm1hcExvYWRpbmdcIjogXCJNYWluU2VhcmNoX21hcExvYWRpbmdfXzE3MWZnXCIsXG5cdFwibWFwRXJyb3JcIjogXCJNYWluU2VhcmNoX21hcEVycm9yX18yVFFVWFwiLFxuXHRcIm1hcFN0YWdlXCI6IFwiTWFpblNlYXJjaF9tYXBTdGFnZV9fMjQ1WWJcIixcblx0XCJtYXBIaW50XCI6IFwiTWFpblNlYXJjaF9tYXBIaW50X193MXJMUFwiLFxuXHRcIm1hcENhbnZhc1wiOiBcIk1haW5TZWFyY2hfbWFwQ2FudmFzX18zMzFiSFwiLFxuXHRcInJlZ2lvbkJsb2NrXCI6IFwiTWFpblNlYXJjaF9yZWdpb25CbG9ja19fbjVubnFcIixcblx0XCJyZWdpb25FXCI6IFwiTWFpblNlYXJjaF9yZWdpb25FX18xUjRoVFwiLFxuXHRcInJlZ2lvbkZcIjogXCJNYWluU2VhcmNoX3JlZ2lvbkZfXzFVbEkwXCIsXG5cdFwicmVnaW9uR1wiOiBcIk1haW5TZWFyY2hfcmVnaW9uR19fMnc0T1NcIixcblx0XCJyZWdpb25BXCI6IFwiTWFpblNlYXJjaF9yZWdpb25BX18zaWpMYVwiLFxuXHRcInJlZ2lvbkRcIjogXCJNYWluU2VhcmNoX3JlZ2lvbkRfXzMtTmp4XCIsXG5cdFwicmVnaW9uQ1wiOiBcIk1haW5TZWFyY2hfcmVnaW9uQ19fQlVTT1hcIixcblx0XCJyZWdpb25CXCI6IFwiTWFpblNlYXJjaF9yZWdpb25CX18zNUx3OFwiLFxuXHRcImdyaWRXcmFwcGVyXCI6IFwiTWFpblNlYXJjaF9ncmlkV3JhcHBlcl9fcUpZM2xcIixcblx0XCJncmlkXCI6IFwiTWFpblNlYXJjaF9ncmlkX18xTExSZVwiLFxuXHRcImdyaWRDZWxsXCI6IFwiTWFpblNlYXJjaF9ncmlkQ2VsbF9fWm9GZ3NcIixcblx0XCJncmlkQ2VsbERpc2FibGVkXCI6IFwiTWFpblNlYXJjaF9ncmlkQ2VsbERpc2FibGVkX19rU2F1MFwiLFxuXHRcInBhbGxldEdyaWRcIjogXCJNYWluU2VhcmNoX3BhbGxldEdyaWRfX3FFdEswXCIsXG5cdFwicGFsbGV0QnV0dG9uXCI6IFwiTWFpblNlYXJjaF9wYWxsZXRCdXR0b25fXzJfODZZXCIsXG5cdFwiYmluQnV0dG9uXCI6IFwiTWFpblNlYXJjaF9iaW5CdXR0b25fXzJvdHF3XCIsXG5cdFwibWFwRW1wdHlcIjogXCJNYWluU2VhcmNoX21hcEVtcHR5X18yV3o2aFwiLFxuXHRcIm1hcEZvb3RlclwiOiBcIk1haW5TZWFyY2hfbWFwRm9vdGVyX18xQm9uclwiXG59O1xuIiwiLy8gRXhwb3J0c1xubW9kdWxlLmV4cG9ydHMgPSB7XG5cdFwidGFibGVDb250YWluZXJcIjogXCJQYXJ0VGFibGVfdGFibGVDb250YWluZXJfXzE4VENnXCIsXG5cdFwic2Nyb2xsYWJsZVRhYmxlXCI6IFwiUGFydFRhYmxlX3Njcm9sbGFibGVUYWJsZV9fMlR5YldcIixcblx0XCJzdGlja3lIZWFkZXJcIjogXCJQYXJ0VGFibGVfc3RpY2t5SGVhZGVyX18xSEpLMVwiLFxuXHRcInNlYXJjaENvbnRhaW5lclwiOiBcIlBhcnRUYWJsZV9zZWFyY2hDb250YWluZXJfXzJyN2FrXCIsXG5cdFwiZGl2aWRlclwiOiBcIlBhcnRUYWJsZV9kaXZpZGVyX18xUXhDcVwiLFxuXHRcImJ1dHRvbkdyb3VwXCI6IFwiUGFydFRhYmxlX2J1dHRvbkdyb3VwX18zWmZPT1wiLFxuXHRcImZsZXhCdXR0b25cIjogXCJQYXJ0VGFibGVfZmxleEJ1dHRvbl9fMnBvMmVcIixcblx0XCJmaXhlZFRhYmxlXCI6IFwiUGFydFRhYmxlX2ZpeGVkVGFibGVfXzNoSkNjXCIsXG5cdFwiY2VsbENsYW1wXCI6IFwiUGFydFRhYmxlX2NlbGxDbGFtcF9fM2l0WE1cIixcblx0XCJhY3Rpb25Db2xcIjogXCJQYXJ0VGFibGVfYWN0aW9uQ29sX18yeGZQYlwiLFxuXHRcImxvbmdQcmVzc092ZXJsYXlcIjogXCJQYXJ0VGFibGVfbG9uZ1ByZXNzT3ZlcmxheV9fMTlJNVBcIixcblx0XCJsb25nUHJlc3NDYXJkXCI6IFwiUGFydFRhYmxlX2xvbmdQcmVzc0NhcmRfXzFOdUh3XCJcbn07XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBUYWJsZSwgQnV0dG9uIH0gZnJvbSBcInJlYWN0LWJvb3RzdHJhcFwiO1xuaW1wb3J0IHN0eWxlcyBmcm9tIFwiLi4vc3R5bGVzL0NsaWVudFRhYmxlLm1vZHVsZS5jc3NcIjtcblxuY29uc3QgQ2xpZW50VGFibGUgPSAoe1xuICBjbGllbnRzLFxuICBvblNlbGVjdENsaWVudCxcbiAgb25JbmZvQ2xpY2ssXG4gIGNsZWFyU2VsZWN0aW9uLFxuICBvbkFkZENsaWVudCwgLy8gbmV3IHByb3AgZm9yIGFkZC1uZXctY2xpZW50IGFjdGlvblxuICBkaXNhYmxlU2VsZWN0LFxuICBkaXNhYmxlSW5mbyxcbiAgaXNDbGllbnRTZWFyY2gsXG59KSA9PiB7XG4gIGNvbnN0IGNvbHVtbkNvdW50ID1cbiAgICAxICsgKGRpc2FibGVJbmZvID8gMCA6IDEpICsgKGRpc2FibGVTZWxlY3QgPyAwIDogMSk7XG4gIGNvbnN0IHNob3dBY3Rpb25zID0gQm9vbGVhbihjbGVhclNlbGVjdGlvbiB8fCBvbkFkZENsaWVudCk7XG5cbiAgcmV0dXJuIChcbiAgICA8VGFibGUgc3RyaXBlZCBib3JkZXJlZCBob3ZlciBzaXplPVwic21cIiBjbGFzc05hbWU9e3N0eWxlcy5jbGllbnRUYWJsZX0+XG4gICAgICA8dGhlYWQ+XG4gICAgICAgIDx0cj5cbiAgICAgICAgICA8dGg+Q2xpZW50IE5hbWU8L3RoPlxuICAgICAgICAgIHshZGlzYWJsZUluZm8gJiYgPHRoPkluZm88L3RoPn1cbiAgICAgICAgICB7IWRpc2FibGVTZWxlY3QgJiYgPHRoPlNlbGVjdDwvdGg+fVxuICAgICAgICA8L3RyPlxuICAgICAgPC90aGVhZD5cbiAgICAgIDx0Ym9keT5cbiAgICAgICAge3Nob3dBY3Rpb25zICYmIChcbiAgICAgICAgICA8dHIgY2xhc3NOYW1lPXtzdHlsZXMuYWN0aW9uUm93fT5cbiAgICAgICAgICAgIDx0ZCBjb2xTcGFuPXtjb2x1bW5Db3VudH0+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuYWN0aW9uQnV0dG9uc30+XG4gICAgICAgICAgICAgICAge2NsZWFyU2VsZWN0aW9uICYmIChcbiAgICAgICAgICAgICAgICAgIDxCdXR0b24gdmFyaWFudD1cInNlY29uZGFyeVwiIG9uQ2xpY2s9e2NsZWFyU2VsZWN0aW9ufT5cbiAgICAgICAgICAgICAgICAgICAgQ2xlYXIgU2VsZWN0aW9uXG4gICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIHtvbkFkZENsaWVudCAmJiAoXG4gICAgICAgICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIHZhcmlhbnQ9XCJwcmltYXJ5XCJcbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17b25BZGRDbGllbnR9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1zLTJcIlxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICBBZGQgTmV3IENsaWVudFxuICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L3RkPlxuICAgICAgICAgIDwvdHI+XG4gICAgICAgICl9XG4gICAgICAgIHtjbGllbnRzLm1hcCgoY2xpZW50KSA9PiAoXG4gICAgICAgICAgPHRyIGtleT17Y2xpZW50LmlkfT5cbiAgICAgICAgICAgIDx0ZD57Y2xpZW50Lm5hbWV9PC90ZD5cbiAgICAgICAgICAgIHshZGlzYWJsZUluZm8gJiYgKFxuICAgICAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICAgICAgdmFyaWFudD1cImluZm9cIlxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gb25JbmZvQ2xpY2soY2xpZW50LmlkLCBjbGllbnQubmFtZSl9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAge2lzQ2xpZW50U2VhcmNoID8gXCJFZGl0XCIgOiBcIkluZm9cIn1cbiAgICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICB7IWRpc2FibGVTZWxlY3QgJiYgKFxuICAgICAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICAgICAgdmFyaWFudD1cInByaW1hcnlcIlxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gb25TZWxlY3RDbGllbnQoY2xpZW50LmlkKX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICBTZWxlY3RcbiAgICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC90cj5cbiAgICAgICAgKSl9XG4gICAgICA8L3Rib2R5PlxuICAgIDwvVGFibGU+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDbGllbnRUYWJsZTtcbiIsIi8vIGNvbXBvbmVudHMvTW9kZWxUYWJsZS5qc1xuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgVGFibGUsIEJ1dHRvbiwgRm9ybUNvbnRyb2wgfSBmcm9tIFwicmVhY3QtYm9vdHN0cmFwXCI7XG5pbXBvcnQgc3R5bGVzIGZyb20gXCIuLi9zdHlsZXMvQ2xpZW50VGFibGUubW9kdWxlLmNzc1wiO1xuXG5jb25zdCBNb2RlbFRhYmxlID0gKHsgbW9kZWxzLCBvblNlbGVjdE1vZGVsLCBjbGVhclNlbGVjdGlvbiB9KSA9PiB7XG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxUYWJsZSBzdHJpcGVkIGJvcmRlcmVkIGhvdmVyIHNpemU9XCJzbVwiIGNsYXNzTmFtZT17c3R5bGVzLm1vZGVsVGFibGV9PlxuICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgPHRyPlxuICAgICAgICAgICAgPHRoPk1vZGVsIE5hbWU8L3RoPlxuICAgICAgICAgICAgPHRoPlNlbGVjdDwvdGg+XG4gICAgICAgICAgPC90cj5cbiAgICAgICAgPC90aGVhZD5cbiAgICAgICAgPHRib2R5PlxuICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgIDx0ZCBjb2xTcGFuPVwiMlwiIHN0eWxlPXt7IHRleHRBbGlnbjogXCJjZW50ZXJcIiB9fT5cbiAgICAgICAgICAgICAgPEJ1dHRvbiB2YXJpYW50PVwic2Vjb25kYXJ5XCIgb25DbGljaz17Y2xlYXJTZWxlY3Rpb259PlxuICAgICAgICAgICAgICAgIENsZWFyIFNlbGVjdGlvblxuICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgPC90cj5cbiAgICAgICAgICB7bW9kZWxzLm1hcCgobW9kZWwsIGluZGV4KSA9PiAoXG4gICAgICAgICAgICA8dHIga2V5PXtpbmRleH0+XG4gICAgICAgICAgICAgIDx0ZD57bW9kZWx9PC90ZD5cbiAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgIDxCdXR0b24gdmFyaWFudD1cInByaW1hcnlcIiBvbkNsaWNrPXsoKSA9PiBvblNlbGVjdE1vZGVsKG1vZGVsKX0+XG4gICAgICAgICAgICAgICAgICBTZWxlY3RcbiAgICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgKSl9XG4gICAgICAgIDwvdGJvZHk+XG4gICAgICA8L1RhYmxlPlxuICAgIDwvPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgTW9kZWxUYWJsZTtcbiIsImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0LCB1c2VSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IFRhYmxlLCBCdXR0b24sIEZvcm0gfSBmcm9tIFwicmVhY3QtYm9vdHN0cmFwXCI7XG5pbXBvcnQgeyBmb3JtYXREYXRlIH0gZnJvbSBcIi4vZmV0Y2hBc3NvY2lhdGlvbnNcIjtcbmltcG9ydCBzdHlsZXMgZnJvbSBcIi4uL3N0eWxlcy9QYXJ0VGFibGUubW9kdWxlLmNzc1wiO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFBhcnRUYWJsZSh7XG4gIGluZm8sXG4gIGxhYmVscyxcbiAgaWRzLFxuICBob3ZlclN0eWxlLFxuICBzb3J0Q2hlY2tBbGwsXG4gIGNoZWNrRGVsZXRlLFxuICBpc0RlbGV0aW5nLFxuICByb3dTZWxlY3QsXG4gIHNldEhvdmVySW5kZXgsXG4gIGhvdmVySW5kZXgsXG4gIHNlbGVjdGVkSXRlbXMsXG4gIHNldFNlbGVjdGVkSXRlbXMsXG4gIG1pblJvd3MgPSAxMCxcbn0pIHtcbiAgLy8gY29uc3QgW3NlbGVjdGVkSXRlbXMsIHNldFNlbGVjdGVkSXRlbXNdID0gdXNlU3RhdGUoW10pO1xuICBjb25zdCBbbG9uZ1ByZXNzTmFtZSwgc2V0TG9uZ1ByZXNzTmFtZV0gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW2lzTW9iaWxlLCBzZXRJc01vYmlsZV0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IHByZXNzVGltZXJSZWYgPSB1c2VSZWYobnVsbCk7XG4gIGNvbnN0IGxvbmdQcmVzc1RyaWdnZXJlZFJlZiA9IHVzZVJlZihmYWxzZSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICBjb25zdCBtZWRpYSA9IHdpbmRvdy5tYXRjaE1lZGlhKFwiKG1heC13aWR0aDogNjQwcHgpXCIpO1xuICAgIGNvbnN0IHVwZGF0ZSA9ICgpID0+IHNldElzTW9iaWxlKG1lZGlhLm1hdGNoZXMpO1xuICAgIHVwZGF0ZSgpO1xuICAgIGlmIChtZWRpYS5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgICBtZWRpYS5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIHVwZGF0ZSk7XG4gICAgICByZXR1cm4gKCkgPT4gbWVkaWEucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCB1cGRhdGUpO1xuICAgIH1cbiAgICBtZWRpYS5hZGRMaXN0ZW5lcih1cGRhdGUpO1xuICAgIHJldHVybiAoKSA9PiBtZWRpYS5yZW1vdmVMaXN0ZW5lcih1cGRhdGUpO1xuICB9LCBbXSk7XG5cbiAgLy8gVG9nZ2xlIHNlbGVjdGlvbiBvZiBpdGVtc1xuICBjb25zdCBoYW5kbGVTZWxlY3RJdGVtID0gKGlkKSA9PiB7XG4gICAgc2V0U2VsZWN0ZWRJdGVtcygocHJldlNlbGVjdGVkSXRlbXMpID0+XG4gICAgICBwcmV2U2VsZWN0ZWRJdGVtcy5pbmNsdWRlcyhpZClcbiAgICAgICAgPyBwcmV2U2VsZWN0ZWRJdGVtcy5maWx0ZXIoKGl0ZW1JZCkgPT4gaXRlbUlkICE9PSBpZClcbiAgICAgICAgOiBbLi4ucHJldlNlbGVjdGVkSXRlbXMsIGlkXVxuICAgICk7XG4gIH07XG5cbiAgLy8gSGFuZGxlIGRlbGV0ZSBidXR0b24gY2xpY2sgZm9yIHNlbGVjdGVkIGl0ZW1zXG4gIGNvbnN0IGhhbmRsZURlbGV0ZVNlbGVjdGVkID0gKCkgPT4ge1xuICAgIGlmIChzZWxlY3RlZEl0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICAgIGNoZWNrRGVsZXRlKG51bGwsIG51bGwsIHNlbGVjdGVkSXRlbXMsIFwic2VsZWN0ZWQgaXRlbXNcIik7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHN0YXJ0TG9uZ1ByZXNzID0gKG5hbWUpID0+ICgpID0+IHtcbiAgICBpZiAoIWlzTW9iaWxlKSByZXR1cm47XG4gICAgaWYgKHByZXNzVGltZXJSZWYuY3VycmVudCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHByZXNzVGltZXJSZWYuY3VycmVudCk7XG4gICAgfVxuICAgIHByZXNzVGltZXJSZWYuY3VycmVudCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgbG9uZ1ByZXNzVHJpZ2dlcmVkUmVmLmN1cnJlbnQgPSB0cnVlO1xuICAgICAgc2V0TG9uZ1ByZXNzTmFtZShuYW1lKTtcbiAgICB9LCA0NTApO1xuICB9O1xuXG4gIGNvbnN0IGNhbmNlbExvbmdQcmVzcyA9ICgpID0+IHtcbiAgICBpZiAocHJlc3NUaW1lclJlZi5jdXJyZW50KSB7XG4gICAgICBjbGVhclRpbWVvdXQocHJlc3NUaW1lclJlZi5jdXJyZW50KTtcbiAgICAgIHByZXNzVGltZXJSZWYuY3VycmVudCA9IG51bGw7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGRpc21pc3NMb25nUHJlc3MgPSAoKSA9PiB7XG4gICAgbG9uZ1ByZXNzVHJpZ2dlcmVkUmVmLmN1cnJlbnQgPSBmYWxzZTtcbiAgICBzZXRMb25nUHJlc3NOYW1lKG51bGwpO1xuICB9O1xuXG4gIGNvbnN0IHBhZGRpbmdDb3VudCA9IE1hdGgubWF4KDAsIG1pblJvd3MgLSBpbmZvLmxlbmd0aCk7XG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5zY3JvbGxhYmxlVGFibGV9PlxuICAgICAgICA8VGFibGVcbiAgICAgICAgICBzdHJpcGVkXG4gICAgICAgICAgYm9yZGVyZWRcbiAgICAgICAgICBob3ZlclxuICAgICAgICAgIHNpemU9XCJzbVwiXG4gICAgICAgICAgY2xhc3NOYW1lPXtgbWItMCAke3N0eWxlcy5maXhlZFRhYmxlfWB9XG4gICAgICAgID5cbiAgICAgICAgICA8dGhlYWQgY2xhc3NOYW1lPXtzdHlsZXMuc3RpY2t5SGVhZGVyfT5cbiAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAge2xhYmVscy5tYXAoKGl0ZW0sIGluZGV4KSA9PiAoXG4gICAgICAgICAgICAgICAgPHRoXG4gICAgICAgICAgICAgICAgICBzdHlsZT17aG92ZXJTdHlsZShpbmRleCl9XG4gICAgICAgICAgICAgICAgICBvbk1vdXNlT3Zlcj17KCkgPT4gc2V0SG92ZXJJbmRleChpbmRleCl9XG4gICAgICAgICAgICAgICAgICBvbk1vdXNlT3V0PXsoKSA9PiBzZXRIb3ZlckluZGV4KG51bGwpfVxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc29ydENoZWNrQWxsKGluZGV4KX1cbiAgICAgICAgICAgICAgICAgIGtleT17aW5kZXh9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAge2l0ZW19XG4gICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9e3N0eWxlcy5hY3Rpb25Db2x9IHN0eWxlPXt7IHRleHRBbGlnbjogXCJjZW50ZXJcIiB9fT5cbiAgICAgICAgICAgICAgICB7c2VsZWN0ZWRJdGVtcy5sZW5ndGggPiAwID8gKFxuICAgICAgICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICAgICAgICB2YXJpYW50PVwiZGFuZ2VyXCJcbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlRGVsZXRlU2VsZWN0ZWR9XG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtpc0RlbGV0aW5nfVxuICAgICAgICAgICAgICAgICAgICBzaXplPVwic21cIlxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICBEZWxldGUgU2VsZWN0ZWQgKHtzZWxlY3RlZEl0ZW1zLmxlbmd0aH0pXG4gICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgXCJzZWxlY3RcIlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAge2luZm8ubWFwKChpdGVtLCBpbmRleCkgPT4gKFxuICAgICAgICAgICAgICA8dHJcbiAgICAgICAgICAgICAgICBrZXk9e2luZGV4fVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyhlKSA9PiB7XG4gICAgICAgICAgICAgICAgICBpZiAobG9uZ1ByZXNzVHJpZ2dlcmVkUmVmLmN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgbG9uZ1ByZXNzVHJpZ2dlcmVkUmVmLmN1cnJlbnQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgLy8gT25seSB0cmlnZ2VyIHJvd1NlbGVjdCBpZiB0aGUgdGFyZ2V0IGlzIG5vdCBhIGNoZWNrYm94XG4gICAgICAgICAgICAgICAgICBpZiAoZS50YXJnZXQudHlwZSAhPT0gXCJjaGVja2JveFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHJvd1NlbGVjdChpdGVtKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIG9uVG91Y2hTdGFydD17c3RhcnRMb25nUHJlc3MoaXRlbS5uYW1lKX1cbiAgICAgICAgICAgICAgICBvblRvdWNoRW5kPXtjYW5jZWxMb25nUHJlc3N9XG4gICAgICAgICAgICAgICAgb25Ub3VjaENhbmNlbD17Y2FuY2VsTG9uZ1ByZXNzfVxuICAgICAgICAgICAgICAgIG9uVG91Y2hNb3ZlPXtjYW5jZWxMb25nUHJlc3N9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiY2xpY2thYmxlLXJvd1wiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgdGV4dEFsaWduOiBcImNlbnRlclwiLCBjdXJzb3I6IFwiZGVmYXVsdFwiIH19PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5jZWxsQ2xhbXB9IHRpdGxlPXtpdGVtLm5hbWV9PlxuICAgICAgICAgICAgICAgICAgICB7aXRlbS5uYW1lfVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgdGV4dEFsaWduOiBcImNlbnRlclwiLCBjdXJzb3I6IFwiZGVmYXVsdFwiIH19PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5jZWxsQ2xhbXB9IHRpdGxlPXtmb3JtYXREYXRlKGl0ZW0uZGF0ZSl9PlxuICAgICAgICAgICAgICAgICAgICB7Zm9ybWF0RGF0ZShpdGVtLmRhdGUpfVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgdGV4dEFsaWduOiBcImNlbnRlclwiLCBjdXJzb3I6IFwiZGVmYXVsdFwiIH19PlxuICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5jZWxsQ2xhbXB9XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlPXtcbiAgICAgICAgICAgICAgICAgICAgICBpdGVtLndvcmtPcmRlcnMgJiYgaXRlbS53b3JrT3JkZXJzLmxlbmd0aCA+IDBcbiAgICAgICAgICAgICAgICAgICAgICAgID8gaXRlbS53b3JrT3JkZXJzW2l0ZW0ud29ya09yZGVycy5sZW5ndGggLSAxXS53b3JrT3JkZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogXCJOL0FcIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHtpdGVtLndvcmtPcmRlcnMgJiYgaXRlbS53b3JrT3JkZXJzLmxlbmd0aCA+IDBcbiAgICAgICAgICAgICAgICAgICAgICA/IGl0ZW0ud29ya09yZGVyc1tpdGVtLndvcmtPcmRlcnMubGVuZ3RoIC0gMV0ud29ya09yZGVyXG4gICAgICAgICAgICAgICAgICAgICAgOiBcIk4vQVwifVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgdGV4dEFsaWduOiBcImNlbnRlclwiLCBjdXJzb3I6IFwiZGVmYXVsdFwiIH19PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5jZWxsQ2xhbXB9IHRpdGxlPXtpdGVtLnBufT5cbiAgICAgICAgICAgICAgICAgICAge2l0ZW0ucG59XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyB0ZXh0QWxpZ246IFwiY2VudGVyXCIsIGN1cnNvcjogXCJkZWZhdWx0XCIgfX0+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmNlbGxDbGFtcH0gdGl0bGU9e2l0ZW0uc259PlxuICAgICAgICAgICAgICAgICAgICB7aXRlbS5zbn1cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT17c3R5bGVzLmFjdGlvbkNvbH0gc3R5bGU9e3sgdGV4dEFsaWduOiBcImNlbnRlclwiIH19PlxuICAgICAgICAgICAgICAgICAgPEZvcm0uQ2hlY2tcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tlZD17c2VsZWN0ZWRJdGVtcy5pbmNsdWRlcyhpdGVtLmlkKX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTsgLy8gUHJldmVudCByb3cgY2xpY2sgd2hlbiBjaGVja2JveCBpcyBjbGlja2VkXG4gICAgICAgICAgICAgICAgICAgICAgLy8gVG9nZ2xlIHNlbGVjdGlvbiB1c2luZyBpdGVtLmlkIGRpcmVjdGx5XG4gICAgICAgICAgICAgICAgICAgICAgc2V0U2VsZWN0ZWRJdGVtcygocHJldlNlbGVjdGVkSXRlbXMpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2U2VsZWN0ZWRJdGVtcy5pbmNsdWRlcyhpdGVtLmlkKVxuICAgICAgICAgICAgICAgICAgICAgICAgICA/IHByZXZTZWxlY3RlZEl0ZW1zLmZpbHRlcigoaWQpID0+IGlkICE9PSBpdGVtLmlkKVxuICAgICAgICAgICAgICAgICAgICAgICAgICA6IFsuLi5wcmV2U2VsZWN0ZWRJdGVtcywgaXRlbS5pZF1cbiAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtgU2VsZWN0ICR7aXRlbS5uYW1lfWB9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICAgIHtwYWRkaW5nQ291bnQgPiAwICYmXG4gICAgICAgICAgICAgIEFycmF5LmZyb20oeyBsZW5ndGg6IHBhZGRpbmdDb3VudCB9KS5tYXAoKF8sIGluZGV4KSA9PiAoXG4gICAgICAgICAgICAgICAgPHRyIGtleT17YGVtcHR5LSR7aW5kZXh9YH0+XG4gICAgICAgICAgICAgICAgICA8dGQgY29sU3Bhbj17bGFiZWxzLmxlbmd0aCArIDF9IHN0eWxlPXt7IHRleHRBbGlnbjogXCJjZW50ZXJcIiB9fT5cbiAgICAgICAgICAgICAgICAgICAgJm5ic3A7XG4gICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgIDwvVGFibGU+XG4gICAgICA8L2Rpdj5cbiAgICAgIHtpc01vYmlsZSAmJiBsb25nUHJlc3NOYW1lICYmIChcbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT17c3R5bGVzLmxvbmdQcmVzc092ZXJsYXl9XG4gICAgICAgICAgb25DbGljaz17ZGlzbWlzc0xvbmdQcmVzc31cbiAgICAgICAgICByb2xlPVwiYnV0dG9uXCJcbiAgICAgICAgICB0YWJJbmRleD17MH1cbiAgICAgICAgPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubG9uZ1ByZXNzQ2FyZH0+e2xvbmdQcmVzc05hbWV9PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cbiAgICA8Lz5cbiAgKTtcbn1cbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCBmaXJlYmFzZSBmcm9tIFwiLi4vY29udGV4dC9GaXJlYmFzZVwiO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZmV0Y2hQYXJ0c1dpdGhNYWNoaW5lRGF0YSgpIHtcbiAgY29uc3QgZGIgPSBmaXJlYmFzZS5maXJlc3RvcmUoKTtcbiAgY29uc3QgcGFydHNTbmFwc2hvdCA9IGF3YWl0IGRiLmNvbGxlY3Rpb24oXCJUZXN0XCIpLmdldCgpO1xuICBjb25zdCBwYXJ0cyA9IGF3YWl0IFByb21pc2UuYWxsKFxuICAgIHBhcnRzU25hcHNob3QuZG9jcy5tYXAoYXN5bmMgKHBhcnREb2MpID0+IHtcbiAgICAgIGNvbnN0IHBhcnREYXRhID0gcGFydERvYy5kYXRhKCk7XG4gICAgICBwYXJ0RGF0YS5pZCA9IHBhcnREb2MuaWQ7IC8vIEFkZCBkb2N1bWVudCBJRCBoZXJlXG4gICAgICBjb25zdCBnZXRSZWZJZCA9IChyZWYpID0+IHtcbiAgICAgICAgaWYgKCFyZWYpIHJldHVybiBudWxsO1xuICAgICAgICBpZiAodHlwZW9mIHJlZiA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIHJlZjtcbiAgICAgICAgaWYgKHJlZiBpbnN0YW5jZW9mIGZpcmViYXNlLmZpcmVzdG9yZS5Eb2N1bWVudFJlZmVyZW5jZSkgcmV0dXJuIHJlZi5pZDtcbiAgICAgICAgaWYgKHJlZi5pZCkgcmV0dXJuIHJlZi5pZDtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9O1xuICAgICAgcGFydERhdGEuY2xpZW50RnJvbUlkID1cbiAgICAgICAgZ2V0UmVmSWQocGFydERhdGE/LkNsaWVudEZyb20pID8/IHBhcnREYXRhPy5jbGllbnRGcm9tSWQgPz8gbnVsbDtcbiAgICAgIHBhcnREYXRhLmNsaWVudEN1cnJlbnRJZCA9XG4gICAgICAgIGdldFJlZklkKHBhcnREYXRhPy5DbGllbnRDdXJyZW50KSA/PyBwYXJ0RGF0YT8uY2xpZW50Q3VycmVudElkID8/IG51bGw7XG4gICAgICAvLyBjb25zb2xlLmxvZyhwYXJ0RGF0YSk7XG4gICAgICBjb25zdCBmZXRjaE1hY2hpbmVEYXRhID0gYXN5bmMgKHJlZikgPT4ge1xuICAgICAgICBpZiAoIXJlZikgcmV0dXJuIG51bGw7XG4gICAgICAgIGlmICh0eXBlb2YgcmVmLmdldCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgY29uc3QgZG9jID0gYXdhaXQgcmVmLmdldCgpO1xuICAgICAgICAgIHJldHVybiBkb2MuZXhpc3RzID8gZG9jLmRhdGEoKSA6IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiByZWYgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICBjb25zdCBkb2MgPSBhd2FpdCBkYi5jb2xsZWN0aW9uKFwiTWFjaGluZVwiKS5kb2MocmVmKS5nZXQoKTtcbiAgICAgICAgICByZXR1cm4gZG9jLmV4aXN0cyA/IGRvYy5kYXRhKCkgOiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZWY/LmlkKSB7XG4gICAgICAgICAgY29uc3QgZG9jID0gYXdhaXQgZGIuY29sbGVjdGlvbihcIk1hY2hpbmVcIikuZG9jKHJlZi5pZCkuZ2V0KCk7XG4gICAgICAgICAgcmV0dXJuIGRvYy5leGlzdHMgPyBkb2MuZGF0YSgpIDogbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IG1hY2hpbmVSZWYgPSBwYXJ0RGF0YS5NYWNoaW5lIHx8IHBhcnREYXRhLk1hY2hpbmVGcm9tO1xuICAgICAgY29uc3QgY3VycmVudE1hY2hpbmVSZWYgPVxuICAgICAgICBwYXJ0RGF0YS5DdXJyZW50TWFjaGluZSB8fCBwYXJ0RGF0YS5NYWNoaW5lQ3VycmVudDtcblxuICAgICAgY29uc3QgbWFjaGluZURhdGEgPSBhd2FpdCBmZXRjaE1hY2hpbmVEYXRhKG1hY2hpbmVSZWYpO1xuICAgICAgcGFydERhdGEubWFjaGluZURhdGEgPSBtYWNoaW5lRGF0YSB8fCB7fTtcbiAgICAgIGlmIChtYWNoaW5lRGF0YT8uY2xpZW50KSB7XG4gICAgICAgIGNvbnN0IGNsaWVudFJlZiA9IG1hY2hpbmVEYXRhLmNsaWVudDtcbiAgICAgICAgY29uc3QgY2xpZW50SWQgPSBnZXRSZWZJZChjbGllbnRSZWYpO1xuICAgICAgICBpZiAoY2xpZW50SWQgJiYgIXBhcnREYXRhLmNsaWVudEZyb21JZCkge1xuICAgICAgICAgIHBhcnREYXRhLmNsaWVudEZyb21JZCA9IGNsaWVudElkO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgY2xpZW50UmVmPy5nZXQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIGNvbnN0IGNsaWVudERvYyA9IGF3YWl0IGNsaWVudFJlZi5nZXQoKTtcbiAgICAgICAgICBwYXJ0RGF0YS5tYWNoaW5lRGF0YS5DbGllbnQgPSBjbGllbnREb2MuZXhpc3RzXG4gICAgICAgICAgICA/IGNsaWVudERvYy5kYXRhKCkubmFtZVxuICAgICAgICAgICAgOiBcIlwiO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGN1cnJlbnRNYWNoaW5lRGF0YSA9IGF3YWl0IGZldGNoTWFjaGluZURhdGEoY3VycmVudE1hY2hpbmVSZWYpO1xuICAgICAgcGFydERhdGEuY3VycmVudE1hY2hpbmVEYXRhID0gY3VycmVudE1hY2hpbmVEYXRhIHx8IHt9O1xuICAgICAgaWYgKGN1cnJlbnRNYWNoaW5lRGF0YT8uY2xpZW50KSB7XG4gICAgICAgIGNvbnN0IGNsaWVudFJlZiA9IGN1cnJlbnRNYWNoaW5lRGF0YS5jbGllbnQ7XG4gICAgICAgIGNvbnN0IGNsaWVudElkID0gZ2V0UmVmSWQoY2xpZW50UmVmKTtcbiAgICAgICAgaWYgKGNsaWVudElkICYmICFwYXJ0RGF0YS5jbGllbnRDdXJyZW50SWQpIHtcbiAgICAgICAgICBwYXJ0RGF0YS5jbGllbnRDdXJyZW50SWQgPSBjbGllbnRJZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIGNsaWVudFJlZj8uZ2V0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICBjb25zdCBjbGllbnREb2MgPSBhd2FpdCBjbGllbnRSZWYuZ2V0KCk7XG4gICAgICAgICAgcGFydERhdGEuY3VycmVudE1hY2hpbmVEYXRhLkNsaWVudCA9IGNsaWVudERvYy5leGlzdHNcbiAgICAgICAgICAgID8gY2xpZW50RG9jLmRhdGEoKS5uYW1lXG4gICAgICAgICAgICA6IFwiXCI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBwYXJ0RGF0YTtcbiAgICB9KVxuICApO1xuICByZXR1cm4gcGFydHM7XG59XG5cbi8vIFBhZ2luYXRlZCB2ZXJzaW9uIGZvciBmYXN0ZXIgbGlzdCB2aWV3cyAoZS5nLiwgbWFpblNlYXJjaCkuXG4vLyBVc2VzIGRvY3VtZW50SWQgb3JkZXIgZm9yIHN0YWJsZSBwYWdpbmF0aW9uLlxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZldGNoUGFydHNXaXRoTWFjaGluZURhdGFQYWdlKHtcbiAgcGFnZVNpemUgPSAyNSxcbiAgc3RhcnRBZnRlckRvYyA9IG51bGwsXG4gIHZpc2libGVPbmx5ID0gZmFsc2UsXG4gIGZpbHRlckZuID0gbnVsbCxcbiAgbmVlZHNNYWNoaW5lRGF0YSA9IHRydWUsXG4gIHNlYXJjaCA9IG51bGwsXG59ID0ge30pIHtcbiAgY29uc3QgZGIgPSBmaXJlYmFzZS5maXJlc3RvcmUoKTtcbiAgY29uc3QgbGltaXQgPSBwYWdlU2l6ZSArIDE7XG5cbiAgY29uc3QgZ2V0UmVmSWQgPSAocmVmKSA9PiB7XG4gICAgaWYgKCFyZWYpIHJldHVybiBudWxsO1xuICAgIGlmICh0eXBlb2YgcmVmID09PSBcInN0cmluZ1wiKSByZXR1cm4gcmVmO1xuICAgIGlmIChyZWYgaW5zdGFuY2VvZiBmaXJlYmFzZS5maXJlc3RvcmUuRG9jdW1lbnRSZWZlcmVuY2UpIHJldHVybiByZWYuaWQ7XG4gICAgaWYgKHJlZi5pZCkgcmV0dXJuIHJlZi5pZDtcbiAgICByZXR1cm4gbnVsbDtcbiAgfTtcblxuICBjb25zdCBNQUNISU5FX1NFTEVDVF9GSUVMRFMgPSBbXCJPRU1cIiwgXCJNb2RhbGl0eVwiLCBcIk1vZGVsXCIsIFwiY2xpZW50XCIsIFwibmFtZVwiXTtcbiAgY29uc3Qgd2l0aE1hY2hpbmVTZWxlY3QgPSAocXVlcnkpID0+XG4gICAgdHlwZW9mIHF1ZXJ5LnNlbGVjdCA9PT0gXCJmdW5jdGlvblwiXG4gICAgICA/IHF1ZXJ5LnNlbGVjdCguLi5NQUNISU5FX1NFTEVDVF9GSUVMRFMpXG4gICAgICA6IHF1ZXJ5O1xuXG4gIGNvbnN0IGJ1aWxkUGFydCA9IChwYXJ0RG9jLCBtYWNoaW5lTWFwLCBjdXJyZW50TWFjaGluZU1hcCkgPT4ge1xuICAgIGNvbnN0IHBhcnREYXRhID0gcGFydERvYy5kYXRhKCk7XG4gICAgcGFydERhdGEuaWQgPSBwYXJ0RG9jLmlkOyAvLyBBZGQgZG9jdW1lbnQgSUQgaGVyZVxuICAgIHBhcnREYXRhLmNsaWVudEZyb21JZCA9XG4gICAgICBnZXRSZWZJZChwYXJ0RGF0YT8uQ2xpZW50RnJvbSkgPz8gcGFydERhdGE/LmNsaWVudEZyb21JZCA/PyBudWxsO1xuICAgIHBhcnREYXRhLmNsaWVudEN1cnJlbnRJZCA9XG4gICAgICBnZXRSZWZJZChwYXJ0RGF0YT8uQ2xpZW50Q3VycmVudCkgPz8gcGFydERhdGE/LmNsaWVudEN1cnJlbnRJZCA/PyBudWxsO1xuXG4gICAgY29uc3QgbWFjaGluZVJlZiA9IHBhcnREYXRhLk1hY2hpbmUgfHwgcGFydERhdGEuTWFjaGluZUZyb207XG4gICAgY29uc3QgY3VycmVudE1hY2hpbmVSZWYgPVxuICAgICAgcGFydERhdGEuQ3VycmVudE1hY2hpbmUgfHwgcGFydERhdGEuTWFjaGluZUN1cnJlbnQ7XG5cbiAgICBjb25zdCBtYWNoaW5lSWQgPSBnZXRSZWZJZChtYWNoaW5lUmVmKTtcbiAgICBjb25zdCBjdXJyZW50TWFjaGluZUlkID0gZ2V0UmVmSWQoY3VycmVudE1hY2hpbmVSZWYpO1xuXG4gICAgY29uc3QgbWFjaGluZURhdGEgPSBtYWNoaW5lSWQgPyBtYWNoaW5lTWFwW21hY2hpbmVJZF0gOiBudWxsO1xuICAgIGNvbnN0IGN1cnJlbnRNYWNoaW5lRGF0YSA9IGN1cnJlbnRNYWNoaW5lSWRcbiAgICAgID8gY3VycmVudE1hY2hpbmVNYXBbY3VycmVudE1hY2hpbmVJZF1cbiAgICAgIDogbnVsbDtcblxuICAgIHBhcnREYXRhLm1hY2hpbmVEYXRhID0gbWFjaGluZURhdGEgfHwge307XG4gICAgcGFydERhdGEuY3VycmVudE1hY2hpbmVEYXRhID0gY3VycmVudE1hY2hpbmVEYXRhIHx8IHt9O1xuXG4gICAgaWYgKCFwYXJ0RGF0YS5jbGllbnRGcm9tSWQgJiYgbWFjaGluZURhdGE/LmNsaWVudCkge1xuICAgICAgcGFydERhdGEuY2xpZW50RnJvbUlkID0gZ2V0UmVmSWQobWFjaGluZURhdGEuY2xpZW50KTtcbiAgICB9XG4gICAgaWYgKCFwYXJ0RGF0YS5jbGllbnRDdXJyZW50SWQgJiYgY3VycmVudE1hY2hpbmVEYXRhPy5jbGllbnQpIHtcbiAgICAgIHBhcnREYXRhLmNsaWVudEN1cnJlbnRJZCA9IGdldFJlZklkKGN1cnJlbnRNYWNoaW5lRGF0YS5jbGllbnQpO1xuICAgIH1cblxuICAgIHJldHVybiBwYXJ0RGF0YTtcbiAgfTtcblxuICBjb25zdCBzZWFyY2hSYXcgPSAoc2VhcmNoPy5yYXcgfHwgXCJcIikudG9TdHJpbmcoKS50cmltKCk7XG4gIGNvbnN0IHNlYXJjaExvd2VyID0gKHNlYXJjaD8ubG93ZXIgfHwgXCJcIikudG9TdHJpbmcoKS50cmltKCk7XG4gIGNvbnN0IHNlYXJjaFR5cGUgPSBzZWFyY2g/LnR5cGUgfHwgbnVsbDtcbiAgY29uc3QgaGFzU2VhcmNoID0gQm9vbGVhbihzZWFyY2hSYXcpO1xuXG4gIGNvbnN0IHRvVGl0bGVDYXNlID0gKHRleHQpID0+XG4gICAgdGV4dFxuICAgICAgLnNwbGl0KFwiIFwiKVxuICAgICAgLmZpbHRlcihCb29sZWFuKVxuICAgICAgLm1hcCgod29yZCkgPT4gd29yZC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHdvcmQuc2xpY2UoMSkpXG4gICAgICAuam9pbihcIiBcIik7XG5cbiAgY29uc3QgYnVpbGRTZWFyY2hRdWVyeSA9ICgpID0+IHtcbiAgICBpZiAoIWhhc1NlYXJjaCB8fCAhc2VhcmNoVHlwZSkgcmV0dXJuIHsgbW9kZTogXCJzY2FuXCIsIHF1ZXJ5OiBudWxsIH07XG4gICAgY29uc3QgY29sID0gZGIuY29sbGVjdGlvbihcIlRlc3RcIik7XG5cbiAgICBzd2l0Y2ggKHNlYXJjaFR5cGUpIHtcbiAgICAgIGNhc2UgXCJTS1VcIjpcbiAgICAgICAgcmV0dXJuIHsgbW9kZTogXCJza3VcIiwgcXVlcnk6IG51bGwgfTtcbiAgICAgIGNhc2UgXCJOYW1lXCI6IHtcbiAgICAgICAgY29uc3QgdGl0bGVGYWxsYmFjayA9XG4gICAgICAgICAgc2VhcmNoUmF3ICYmIHNlYXJjaFJhdyA9PT0gc2VhcmNoUmF3LnRvTG93ZXJDYXNlKClcbiAgICAgICAgICAgID8gdG9UaXRsZUNhc2Uoc2VhcmNoUmF3KVxuICAgICAgICAgICAgOiBudWxsO1xuICAgICAgICBjb25zdCB0ZXJtcyA9IHNlYXJjaExvd2VyID8gc2VhcmNoTG93ZXIuc3BsaXQoL1xccysvKS5maWx0ZXIoQm9vbGVhbikgOiBbXTtcbiAgICAgICAgY29uc3QgdG9rZW5zID0gWy4uLnRlcm1zXTtcbiAgICAgICAgaWYgKHNlYXJjaExvd2VyICYmICF0b2tlbnMuaW5jbHVkZXMoc2VhcmNoTG93ZXIpKSB0b2tlbnMucHVzaChzZWFyY2hMb3dlcik7XG4gICAgICAgIGlmICghdG9rZW5zLmxlbmd0aCkgcmV0dXJuIHsgbW9kZTogXCJzY2FuXCIsIHF1ZXJ5OiBudWxsIH07XG5cbiAgICAgICAgY29uc3QgcHJlZml4UXVlcnkgPSAodmFsdWUpID0+XG4gICAgICAgICAgY29sLm9yZGVyQnkoXCJuYW1lXCIpLnN0YXJ0QXQodmFsdWUpLmVuZEF0KGAke3ZhbHVlfVxcdWY4ZmZgKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIG1vZGU6IFwicXVlcnlcIixcbiAgICAgICAgICBxdWVyeTpcbiAgICAgICAgICAgIHRva2Vucy5sZW5ndGggPT09IDFcbiAgICAgICAgICAgICAgPyBjb2wud2hlcmUoXCJuYW1lVG9rZW5zXCIsIFwiYXJyYXktY29udGFpbnNcIiwgdG9rZW5zWzBdKVxuICAgICAgICAgICAgICA6IGNvbC53aGVyZShcbiAgICAgICAgICAgICAgICAgIFwibmFtZVRva2Vuc1wiLFxuICAgICAgICAgICAgICAgICAgXCJhcnJheS1jb250YWlucy1hbnlcIixcbiAgICAgICAgICAgICAgICAgIHRva2Vucy5zbGljZSgwLCAxMClcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgIGZhbGxiYWNrOiB0aXRsZUZhbGxiYWNrXG4gICAgICAgICAgICA/ICgpID0+IHByZWZpeFF1ZXJ5KHRpdGxlRmFsbGJhY2spXG4gICAgICAgICAgICA6ICgpID0+IHByZWZpeFF1ZXJ5KHNlYXJjaFJhdyksXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICBjYXNlIFwiUHJvZHVjdCBOdW1iZXJcIjpcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBtb2RlOiBcInF1ZXJ5XCIsXG4gICAgICAgICAgcXVlcnk6IGNvbC53aGVyZShcInBuXCIsIFwiYXJyYXktY29udGFpbnNcIiwgc2VhcmNoUmF3KSxcbiAgICAgICAgICBmYWxsYmFjazogKCkgPT4gY29sLndoZXJlKFwicG5cIiwgXCI9PVwiLCBzZWFyY2hSYXcpLFxuICAgICAgICB9O1xuICAgICAgY2FzZSBcIlNlcmlhbCBOdW1iZXJcIjpcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBtb2RlOiBcInF1ZXJ5XCIsXG4gICAgICAgICAgcXVlcnk6IGNvbC53aGVyZShcInNuXCIsIFwiYXJyYXktY29udGFpbnNcIiwgc2VhcmNoUmF3KSxcbiAgICAgICAgICBmYWxsYmFjazogKCkgPT4gY29sLndoZXJlKFwic25cIiwgXCI9PVwiLCBzZWFyY2hSYXcpLFxuICAgICAgICB9O1xuICAgICAgY2FzZSBcIkRhdGVcIjoge1xuICAgICAgICBjb25zdCBhc0RhdGUgPSAoKCkgPT4ge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBkID0gbmV3IERhdGUoc2VhcmNoUmF3KTtcbiAgICAgICAgICAgIHJldHVybiBpc05hTihkLmdldFRpbWUoKSkgPyBudWxsIDogZDtcbiAgICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgfSkoKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBtb2RlOiBcInF1ZXJ5XCIsXG4gICAgICAgICAgcXVlcnk6IGNvbC53aGVyZShcImRhdGVcIiwgXCI9PVwiLCBzZWFyY2hSYXcpLFxuICAgICAgICAgIGZhbGxiYWNrOiBhc0RhdGUgPyAoKSA9PiBjb2wud2hlcmUoXCJkYXRlXCIsIFwiPT1cIiwgYXNEYXRlKSA6IG51bGwsXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4geyBtb2RlOiBcInNjYW5cIiwgcXVlcnk6IG51bGwgfTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgeyBtb2RlOiBzZWFyY2hNb2RlLCBxdWVyeTogc2VhcmNoUXVlcnksIGZhbGxiYWNrOiBzZWFyY2hGYWxsYmFjayB9ID1cbiAgICBidWlsZFNlYXJjaFF1ZXJ5KCk7XG5cbiAgaWYgKHNlYXJjaE1vZGUgPT09IFwic2t1XCIgJiYgaGFzU2VhcmNoKSB7XG4gICAgY29uc3QgZG9jcyA9IFtdO1xuICAgIGNvbnN0IHJhd1VwcGVyID0gc2VhcmNoUmF3LnRvVXBwZXJDYXNlKCk7XG4gICAgbGV0IGRvYyA9IGF3YWl0IGRiLmNvbGxlY3Rpb24oXCJUZXN0XCIpLmRvYyhzZWFyY2hSYXcpLmdldCgpO1xuICAgIGlmICghZG9jLmV4aXN0cyAmJiByYXdVcHBlciAhPT0gc2VhcmNoUmF3KSB7XG4gICAgICBkb2MgPSBhd2FpdCBkYi5jb2xsZWN0aW9uKFwiVGVzdFwiKS5kb2MocmF3VXBwZXIpLmdldCgpO1xuICAgIH1cbiAgICBpZiAoZG9jLmV4aXN0cykgZG9jcy5wdXNoKGRvYyk7XG5cbiAgICBjb25zdCBsb2NhbFZhbHVlcyA9XG4gICAgICByYXdVcHBlciAhPT0gc2VhcmNoUmF3ID8gW3NlYXJjaFJhdywgcmF3VXBwZXJdIDogW3NlYXJjaFJhd107XG4gICAgY29uc3QgbG9jYWxTbmFwID0gYXdhaXQgZGJcbiAgICAgIC5jb2xsZWN0aW9uKFwiVGVzdFwiKVxuICAgICAgLndoZXJlKFwibG9jYWxTTlwiLCBcImluXCIsIGxvY2FsVmFsdWVzKVxuICAgICAgLmxpbWl0KGxpbWl0KVxuICAgICAgLmdldCgpO1xuICAgIGxvY2FsU25hcC5mb3JFYWNoKChkKSA9PiB7XG4gICAgICBpZiAoIWRvY3MuZmluZCgoZXhpc3RpbmcpID0+IGV4aXN0aW5nLmlkID09PSBkLmlkKSkge1xuICAgICAgICBkb2NzLnB1c2goZCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBsZXQgbWFjaGluZU1hcCA9IHt9O1xuICAgIGxldCBjdXJyZW50TWFjaGluZU1hcCA9IHt9O1xuICAgIGlmIChuZWVkc01hY2hpbmVEYXRhICYmIGRvY3MubGVuZ3RoKSB7XG4gICAgICBjb25zdCBtYWNoaW5lSWRzID0gbmV3IFNldCgpO1xuICAgICAgY29uc3QgY3VycmVudE1hY2hpbmVJZHMgPSBuZXcgU2V0KCk7XG4gICAgICBmb3IgKGNvbnN0IGRvY1NuYXAgb2YgZG9jcykge1xuICAgICAgICBjb25zdCByYXcgPSBkb2NTbmFwLmRhdGEoKTtcbiAgICAgICAgY29uc3QgbWFjaGluZUlkID0gZ2V0UmVmSWQocmF3Lk1hY2hpbmUgfHwgcmF3Lk1hY2hpbmVGcm9tKTtcbiAgICAgICAgY29uc3QgY3VycmVudE1hY2hpbmVJZCA9IGdldFJlZklkKFxuICAgICAgICAgIHJhdy5DdXJyZW50TWFjaGluZSB8fCByYXcuTWFjaGluZUN1cnJlbnRcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKG1hY2hpbmVJZCkgbWFjaGluZUlkcy5hZGQobWFjaGluZUlkKTtcbiAgICAgICAgaWYgKGN1cnJlbnRNYWNoaW5lSWQpIGN1cnJlbnRNYWNoaW5lSWRzLmFkZChjdXJyZW50TWFjaGluZUlkKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGZldGNoTWFjaGluZU1hcCA9IGFzeW5jIChpZHMpID0+IHtcbiAgICAgICAgaWYgKCFpZHMubGVuZ3RoKSByZXR1cm4ge307XG4gICAgICAgIGNvbnN0IG91dCA9IHt9O1xuICAgICAgICBjb25zdCBjaHVua3MgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpZHMubGVuZ3RoOyBpICs9IDEwKSB7XG4gICAgICAgICAgY2h1bmtzLnB1c2goaWRzLnNsaWNlKGksIGkgKyAxMCkpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgY2h1bmsgb2YgY2h1bmtzKSB7XG4gICAgICAgICAgY29uc3Qgc25hcCA9IGF3YWl0IHdpdGhNYWNoaW5lU2VsZWN0KFxuICAgICAgICAgICAgZGJcbiAgICAgICAgICAgICAgLmNvbGxlY3Rpb24oXCJNYWNoaW5lXCIpXG4gICAgICAgICAgICAgIC53aGVyZShmaXJlYmFzZS5maXJlc3RvcmUuRmllbGRQYXRoLmRvY3VtZW50SWQoKSwgXCJpblwiLCBjaHVuaylcbiAgICAgICAgICApLmdldCgpO1xuICAgICAgICAgIHNuYXAuZm9yRWFjaCgoZG9jU25hcCkgPT4ge1xuICAgICAgICAgICAgb3V0W2RvY1NuYXAuaWRdID0gZG9jU25hcC5kYXRhKCkgfHwge307XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICAgIH07XG4gICAgICBbbWFjaGluZU1hcCwgY3VycmVudE1hY2hpbmVNYXBdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgICBmZXRjaE1hY2hpbmVNYXAoWy4uLm1hY2hpbmVJZHNdKSxcbiAgICAgICAgZmV0Y2hNYWNoaW5lTWFwKFsuLi5jdXJyZW50TWFjaGluZUlkc10pLFxuICAgICAgXSk7XG4gICAgfVxuXG4gICAgY29uc3QgYnVpbHQgPSBkb2NzXG4gICAgICAubWFwKChkb2NTbmFwKSA9PiBidWlsZFBhcnQoZG9jU25hcCwgbWFjaGluZU1hcCwgY3VycmVudE1hY2hpbmVNYXApKVxuICAgICAgLmZpbHRlcigoaXRlbSkgPT4gKCF2aXNpYmxlT25seSB8fCBpdGVtPy52aXNpYmxlICE9PSBmYWxzZSkpXG4gICAgICAuZmlsdGVyKChpdGVtKSA9PiAoZmlsdGVyRm4gPyBmaWx0ZXJGbihpdGVtKSA6IHRydWUpKVxuICAgICAgLnNsaWNlKDAsIHBhZ2VTaXplKTtcblxuICAgIHJldHVybiB7XG4gICAgICBwYXJ0czogYnVpbHQsXG4gICAgICBsYXN0RG9jOiBidWlsdC5sZW5ndGggPyBkb2NzW2J1aWx0Lmxlbmd0aCAtIDFdIDogbnVsbCxcbiAgICAgIGhhc05leHRQYWdlOiBmYWxzZSxcbiAgICB9O1xuICB9XG5cbiAgbGV0IHBhcnRzID0gW107XG4gIGxldCBjdXJzb3IgPSBzdGFydEFmdGVyRG9jIHx8IG51bGw7XG4gIGxldCBsYXN0RG9jID0gbnVsbDtcbiAgbGV0IHBhZ2VMYXN0RG9jID0gbnVsbDtcbiAgbGV0IGhhc05leHRQYWdlID0gZmFsc2U7XG4gIGxldCBmaWxsZWQgPSBmYWxzZTtcbiAgbGV0IHVzZWRGYWxsYmFjayA9IGZhbHNlO1xuICBjb25zdCBzY2FuQmFzZVF1ZXJ5ID0gZGJcbiAgICAuY29sbGVjdGlvbihcIlRlc3RcIilcbiAgICAub3JkZXJCeShmaXJlYmFzZS5maXJlc3RvcmUuRmllbGRQYXRoLmRvY3VtZW50SWQoKSk7XG5cbiAgd2hpbGUgKHRydWUpIHtcbiAgICBsZXQgcXVlcnkgPSBzZWFyY2hRdWVyeSB8fCBzY2FuQmFzZVF1ZXJ5O1xuICAgIGlmIChzZWFyY2hNb2RlID09PSBcInF1ZXJ5XCIgJiYgdXNlZEZhbGxiYWNrICYmIHNlYXJjaEZhbGxiYWNrKSB7XG4gICAgICBxdWVyeSA9IHNlYXJjaEZhbGxiYWNrKCk7XG4gICAgfVxuICAgIGlmIChjdXJzb3IpIHF1ZXJ5ID0gcXVlcnkuc3RhcnRBZnRlcihjdXJzb3IpO1xuICAgIHF1ZXJ5ID0gcXVlcnkubGltaXQobGltaXQpO1xuXG4gICAgY29uc3Qgc25hcCA9IGF3YWl0IHF1ZXJ5LmdldCgpO1xuICAgIGlmIChzbmFwLmVtcHR5KSB7XG4gICAgICBpZiAoc2VhcmNoTW9kZSA9PT0gXCJxdWVyeVwiICYmIHNlYXJjaEZhbGxiYWNrICYmICFjdXJzb3IgJiYgIXVzZWRGYWxsYmFjaykge1xuICAgICAgICB1c2VkRmFsbGJhY2sgPSB0cnVlO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGhhc05leHRQYWdlID0gZmFsc2U7XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICBjb25zdCBiYXRjaERvY3MgPSBzbmFwLmRvY3M7XG4gICAgbGV0IG1hY2hpbmVNYXAgPSB7fTtcbiAgICBsZXQgY3VycmVudE1hY2hpbmVNYXAgPSB7fTtcblxuICAgIGlmIChuZWVkc01hY2hpbmVEYXRhKSB7XG4gICAgICBjb25zdCBtYWNoaW5lSWRzID0gbmV3IFNldCgpO1xuICAgICAgY29uc3QgY3VycmVudE1hY2hpbmVJZHMgPSBuZXcgU2V0KCk7XG4gICAgICBmb3IgKGNvbnN0IGRvYyBvZiBiYXRjaERvY3MpIHtcbiAgICAgICAgY29uc3QgcmF3ID0gZG9jLmRhdGEoKTtcbiAgICAgICAgaWYgKHZpc2libGVPbmx5ICYmIHJhdy52aXNpYmxlID09PSBmYWxzZSkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG1hY2hpbmVJZCA9IGdldFJlZklkKHJhdy5NYWNoaW5lIHx8IHJhdy5NYWNoaW5lRnJvbSk7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRNYWNoaW5lSWQgPSBnZXRSZWZJZChcbiAgICAgICAgICByYXcuQ3VycmVudE1hY2hpbmUgfHwgcmF3Lk1hY2hpbmVDdXJyZW50XG4gICAgICAgICk7XG4gICAgICAgIGlmIChtYWNoaW5lSWQpIG1hY2hpbmVJZHMuYWRkKG1hY2hpbmVJZCk7XG4gICAgICAgIGlmIChjdXJyZW50TWFjaGluZUlkKSBjdXJyZW50TWFjaGluZUlkcy5hZGQoY3VycmVudE1hY2hpbmVJZCk7XG4gICAgICB9XG5cbiAgICAgICAgY29uc3QgZmV0Y2hNYWNoaW5lTWFwID0gYXN5bmMgKGlkcykgPT4ge1xuICAgICAgICAgIGlmICghaWRzLmxlbmd0aCkgcmV0dXJuIHt9O1xuICAgICAgICAgIGNvbnN0IG91dCA9IHt9O1xuICAgICAgICAgIGNvbnN0IGNodW5rcyA9IFtdO1xuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaWRzLmxlbmd0aDsgaSArPSAxMCkge1xuICAgICAgICAgICAgY2h1bmtzLnB1c2goaWRzLnNsaWNlKGksIGkgKyAxMCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBmb3IgKGNvbnN0IGNodW5rIG9mIGNodW5rcykge1xuICAgICAgICAgICAgY29uc3Qgc25hcCA9IGF3YWl0IHdpdGhNYWNoaW5lU2VsZWN0KFxuICAgICAgICAgICAgICBkYlxuICAgICAgICAgICAgICAgIC5jb2xsZWN0aW9uKFwiTWFjaGluZVwiKVxuICAgICAgICAgICAgICAgIC53aGVyZShmaXJlYmFzZS5maXJlc3RvcmUuRmllbGRQYXRoLmRvY3VtZW50SWQoKSwgXCJpblwiLCBjaHVuaylcbiAgICAgICAgICAgICkuZ2V0KCk7XG4gICAgICAgICAgICBzbmFwLmZvckVhY2goKGRvYykgPT4ge1xuICAgICAgICAgICAgICBvdXRbZG9jLmlkXSA9IGRvYy5kYXRhKCkgfHwge307XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgICB9O1xuXG4gICAgICBbbWFjaGluZU1hcCwgY3VycmVudE1hY2hpbmVNYXBdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgICBmZXRjaE1hY2hpbmVNYXAoWy4uLm1hY2hpbmVJZHNdKSxcbiAgICAgICAgZmV0Y2hNYWNoaW5lTWFwKFsuLi5jdXJyZW50TWFjaGluZUlkc10pLFxuICAgICAgXSk7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzbmFwLmRvY3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGRvYyA9IGJhdGNoRG9jc1tpXTtcbiAgICAgIGN1cnNvciA9IGRvYztcblxuICAgICAgY29uc3QgcmF3ID0gZG9jLmRhdGEoKTtcbiAgICAgIGlmICh2aXNpYmxlT25seSAmJiByYXcudmlzaWJsZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgY29udGludWU7IC8vIHNraXAgaGlkZGVuIGl0ZW1zIGJ1dCBrZWVwIGFkdmFuY2luZyB0aGUgY3Vyc29yXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGJ1aWx0ID0gYnVpbGRQYXJ0KGRvYywgbWFjaGluZU1hcCwgY3VycmVudE1hY2hpbmVNYXApO1xuICAgICAgaWYgKGZpbHRlckZuICYmICFmaWx0ZXJGbihidWlsdCkpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICghZmlsbGVkKSB7XG4gICAgICAgIHBhcnRzLnB1c2goYnVpbHQpO1xuICAgICAgICBpZiAocGFydHMubGVuZ3RoID09PSBwYWdlU2l6ZSkge1xuICAgICAgICAgIGZpbGxlZCA9IHRydWU7XG4gICAgICAgICAgcGFnZUxhc3REb2MgPSBkb2M7XG4gICAgICAgIH1cbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIC8vIFdlIGFscmVhZHkgZmlsbGVkIHRoZSBwYWdlIGFuZCBmb3VuZCBhbiBleHRyYSBtYXRjaGluZyBpdGVtLlxuICAgICAgaGFzTmV4dFBhZ2UgPSB0cnVlO1xuICAgICAgcmV0dXJuIHsgcGFydHMsIGxhc3REb2M6IHBhZ2VMYXN0RG9jLCBoYXNOZXh0UGFnZSB9O1xuICAgIH1cblxuICAgIC8vIFdlIGV4aGF1c3RlZCB0aGlzIGJhdGNoIHdpdGhvdXQgZmlsbGluZyB0aGUgcGFnZS5cbiAgICBpZiAoc25hcC5zaXplIDwgbGltaXQpIHtcbiAgICAgIGhhc05leHRQYWdlID0gZmFsc2U7XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICAvLyBUaGVyZSBtaWdodCBiZSBtb3JlIGRvY3M7IGNvbnRpbnVlIHNjYW5uaW5nIGZvciB2aXNpYmxlIGl0ZW1zLlxuICAgIGhhc05leHRQYWdlID0gdHJ1ZTtcbiAgfVxuXG4gIGxhc3REb2MgPSBwYWdlTGFzdERvYyB8fCAocGFydHMubGVuZ3RoID8gY3Vyc29yIDogbnVsbCk7XG4gIHJldHVybiB7IHBhcnRzLCBsYXN0RG9jLCBoYXNOZXh0UGFnZTogZmlsbGVkID8gaGFzTmV4dFBhZ2UgOiBmYWxzZSB9O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZmV0Y2hDbGllbnRzKHNlbGVjdGVkT0VNLCBzZWxlY3RlZE1vZGFsaXR5KSB7XG4gIGNvbnN0IGRiID0gZmlyZWJhc2UuZmlyZXN0b3JlKCk7XG4gIGNvbnN0IGNsaWVudHNTbmFwc2hvdCA9IGF3YWl0IGRiLmNvbGxlY3Rpb24oXCJDbGllbnRcIikuZ2V0KCk7XG4gIGNvbnN0IGNsaWVudHMgPSBjbGllbnRzU25hcHNob3QuZG9jcy5tYXAoKGRvYykgPT4gKHtcbiAgICBpZDogZG9jLmlkLFxuICAgIC4uLmRvYy5kYXRhKCksXG4gIH0pKTtcblxuICAvLyBGaWx0ZXIgY2xpZW50cyBiYXNlZCBvbiBPRU0gYW5kIE1vZGFsaXR5IGlmIHNlbGVjdGVkXG4gIGlmIChzZWxlY3RlZE9FTSB8fCBzZWxlY3RlZE1vZGFsaXR5KSB7XG4gICAgY29uc3QgZmlsdGVyZWRDbGllbnRzID0gW107XG4gICAgZm9yIChjb25zdCBjbGllbnQgb2YgY2xpZW50cykge1xuICAgICAgbGV0IG1hdGNoID0gdHJ1ZTtcbiAgICAgIGlmIChzZWxlY3RlZE9FTSB8fCBzZWxlY3RlZE1vZGFsaXR5KSB7XG4gICAgICAgIGZvciAoY29uc3QgbWFjaGluZVJlZiBvZiBjbGllbnQubWFjaGluZXMpIHtcbiAgICAgICAgICBjb25zdCBtYWNoaW5lRG9jID0gYXdhaXQgbWFjaGluZVJlZi5nZXQoKTtcbiAgICAgICAgICBjb25zdCBtYWNoaW5lRGF0YSA9IG1hY2hpbmVEb2MuZGF0YSgpO1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIChzZWxlY3RlZE9FTSAmJiBtYWNoaW5lRGF0YS5PRU0gPT09IHNlbGVjdGVkT0VNKSB8fFxuICAgICAgICAgICAgKHNlbGVjdGVkTW9kYWxpdHkgJiYgbWFjaGluZURhdGEuTW9kYWxpdHkgPT09IHNlbGVjdGVkTW9kYWxpdHkpXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBtYXRjaCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbWF0Y2ggPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICBmaWx0ZXJlZENsaWVudHMucHVzaChjbGllbnQpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmlsdGVyZWRDbGllbnRzO1xuICB9XG5cbiAgcmV0dXJuIGNsaWVudHM7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmZXRjaE1vZGVscyhcbiAgc2VsZWN0ZWRPRU0sXG4gIHNlbGVjdGVkTW9kYWxpdHksXG4gIHNlbGVjdGVkQ2xpZW50XG4pIHtcbiAgY29uc3QgZGIgPSBmaXJlYmFzZS5maXJlc3RvcmUoKTtcbiAgY29uc3QgbWFjaGluZXNTbmFwc2hvdCA9IGF3YWl0IGRiLmNvbGxlY3Rpb24oXCJNYWNoaW5lXCIpLmdldCgpO1xuICBjb25zdCBtb2RlbHMgPSBuZXcgU2V0KCk7XG5cbiAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgbWFjaGluZXNTbmFwc2hvdC5kb2NzLm1hcChhc3luYyAobWFjaGluZURvYykgPT4ge1xuICAgICAgY29uc3QgbWFjaGluZURhdGEgPSBtYWNoaW5lRG9jLmRhdGEoKTtcbiAgICAgIGxldCBpc1ZhbGlkID0gdHJ1ZTtcblxuICAgICAgaWYgKHNlbGVjdGVkT0VNICYmIG1hY2hpbmVEYXRhLk9FTSAhPT0gc2VsZWN0ZWRPRU0pIGlzVmFsaWQgPSBmYWxzZTtcbiAgICAgIGlmIChzZWxlY3RlZE1vZGFsaXR5ICYmIG1hY2hpbmVEYXRhLk1vZGFsaXR5ICE9PSBzZWxlY3RlZE1vZGFsaXR5KVxuICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XG4gICAgICBpZiAoc2VsZWN0ZWRDbGllbnQgJiYgbWFjaGluZURhdGEuY2xpZW50KSB7XG4gICAgICAgIGxldCBjbGllbnREb2MgPSBudWxsO1xuICAgICAgICBpZiAodHlwZW9mIG1hY2hpbmVEYXRhLmNsaWVudD8uZ2V0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICBjbGllbnREb2MgPSBhd2FpdCBtYWNoaW5lRGF0YS5jbGllbnQuZ2V0KCk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG1hY2hpbmVEYXRhLmNsaWVudCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgIGNsaWVudERvYyA9IGF3YWl0IGRiLmNvbGxlY3Rpb24oXCJDbGllbnRcIikuZG9jKG1hY2hpbmVEYXRhLmNsaWVudCkuZ2V0KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFjbGllbnREb2MgfHwgIWNsaWVudERvYy5leGlzdHMpIHtcbiAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3QgY2xpZW50TmFtZSA9IGNsaWVudERvYy5kYXRhKCkubmFtZTtcbiAgICAgICAgICBjb25zdCBjbGllbnRJZCA9IGNsaWVudERvYy5pZDtcbiAgICAgICAgICBpZiAoc2VsZWN0ZWRDbGllbnQgIT09IGNsaWVudE5hbWUgJiYgc2VsZWN0ZWRDbGllbnQgIT09IGNsaWVudElkKSB7XG4gICAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChpc1ZhbGlkKSB7XG4gICAgICAgIG1vZGVscy5hZGQobWFjaGluZURhdGEuTW9kZWwpO1xuICAgICAgfVxuICAgIH0pXG4gICk7XG5cbiAgcmV0dXJuIEFycmF5LmZyb20obW9kZWxzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdERhdGUodGltZXN0YW1wKSB7XG4gIGlmICghdGltZXN0YW1wKSByZXR1cm4gXCJcIjtcbiAgbGV0IGRhdGU7XG4gIGlmICh0aW1lc3RhbXAudG9EYXRlKSB7XG4gICAgZGF0ZSA9IHRpbWVzdGFtcC50b0RhdGUoKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgdGltZXN0YW1wID09PSBcInN0cmluZ1wiIHx8IHR5cGVvZiB0aW1lc3RhbXAgPT09IFwibnVtYmVyXCIpIHtcbiAgICBkYXRlID0gbmV3IERhdGUodGltZXN0YW1wKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gXCJcIjsgLy8gaGFuZGxlIHVuZXhwZWN0ZWQgZm9ybWF0c1xuICB9XG4gIGNvbnN0IGRheSA9IFN0cmluZyhkYXRlLmdldERhdGUoKSkucGFkU3RhcnQoMiwgXCIwXCIpO1xuICBjb25zdCBtb250aCA9IFN0cmluZyhkYXRlLmdldE1vbnRoKCkgKyAxKS5wYWRTdGFydCgyLCBcIjBcIik7XG4gIGNvbnN0IHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XG4gIHJldHVybiBgJHttb250aH0vJHtkYXl9LyR7eWVhcn1gO1xufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkTG9jYWxMb2NPYmplY3QobG9jKSB7XG4gIGNvbnN0IG8gPSB7fTtcbiAgaWYgKGxvYz8ucmVnaW9uKSBvLnJlZ2lvbiA9IGxvYy5yZWdpb247XG4gIGlmIChsb2M/LnNlY3Rpb24/LmxldHRlciAmJiBsb2M/LnNlY3Rpb24/Lm51bWJlcikgby5zZWN0aW9uID0gbG9jLnNlY3Rpb247XG4gIGlmIChsb2M/LmJpbiAhPT0gdW5kZWZpbmVkICYmIGxvYz8uYmluICE9PSBcIlwiKSBvLmJpbiA9IGxvYy5iaW47XG4gIGlmIChsb2M/LnBhbGxldCAhPT0gdW5kZWZpbmVkICYmIGxvYz8ucGFsbGV0ICE9PSBcIlwiKSBvLnBhbGxldCA9IGxvYy5wYWxsZXQ7XG4gIHJldHVybiBvO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0TG9jKGxvYykge1xuICBpZiAoIWxvYykgcmV0dXJuIFwiXCI7XG4gIGNvbnN0IHBhcnRzID0gW107XG4gIGlmIChsb2MucmVnaW9uKSBwYXJ0cy5wdXNoKGxvYy5yZWdpb24pO1xuICBpZiAobG9jLnNlY3Rpb24/LmxldHRlciAmJiBsb2Muc2VjdGlvbj8ubnVtYmVyKSB7XG4gICAgcGFydHMucHVzaChgJHtsb2Muc2VjdGlvbi5sZXR0ZXJ9JHtsb2Muc2VjdGlvbi5udW1iZXJ9YCk7XG4gIH1cbiAgaWYgKGxvYy5iaW4pIHBhcnRzLnB1c2goYEIke2xvYy5iaW59YCk7XG4gIGlmIChsb2MucGFsbGV0KSBwYXJ0cy5wdXNoKGBQJHtsb2MucGFsbGV0fWApO1xuICByZXR1cm4gcGFydHMuam9pbihcIuKAk1wiKTtcbn1cblxuZnVuY3Rpb24gaXNWYWxpZEZpZWxkKHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgIT09IFwic3RyaW5nXCIpIHJldHVybiBCb29sZWFuKHZhbHVlKTtcbiAgY29uc3QgdHJpbW1lZCA9IHZhbHVlLnRyaW0oKTtcbiAgcmV0dXJuIHRyaW1tZWQgIT09IFwiXCIgJiYgdHJpbW1lZCAhPT0gXCJOL0FcIjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFByaW9yaXR5TWFjaGluZUZpZWxkKFxuICBmaWVsZCxcbiAgdGhlTWFjaGluZSxcbiAgY3VycmVudE1hY2hpbmUsXG4gIGZyb21NYWNoaW5lXG4pIHtcbiAgaWYgKHRoZU1hY2hpbmUgJiYgaXNWYWxpZEZpZWxkKHRoZU1hY2hpbmVbZmllbGRdKSkgcmV0dXJuIHRoZU1hY2hpbmVbZmllbGRdO1xuICBpZiAoY3VycmVudE1hY2hpbmUgJiYgaXNWYWxpZEZpZWxkKGN1cnJlbnRNYWNoaW5lW2ZpZWxkXSkpXG4gICAgcmV0dXJuIGN1cnJlbnRNYWNoaW5lW2ZpZWxkXTtcbiAgaWYgKGZyb21NYWNoaW5lICYmIGlzVmFsaWRGaWVsZChmcm9tTWFjaGluZVtmaWVsZF0pKSByZXR1cm4gZnJvbU1hY2hpbmVbZmllbGRdO1xuICByZXR1cm4gXCJcIjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZU1hY2hpbmVGaWVsZHModGhlTWFjaGluZSwgY3VycmVudE1hY2hpbmUsIGZyb21NYWNoaW5lKSB7XG4gIGNvbnN0IHBpY2sgPSAocHJpbWFyeSwgZmFsbGJhY2spID0+XG4gICAgZ2V0UHJpb3JpdHlNYWNoaW5lRmllbGQocHJpbWFyeSwgdGhlTWFjaGluZSwgY3VycmVudE1hY2hpbmUsIGZyb21NYWNoaW5lKSB8fFxuICAgIGdldFByaW9yaXR5TWFjaGluZUZpZWxkKGZhbGxiYWNrLCB0aGVNYWNoaW5lLCBjdXJyZW50TWFjaGluZSwgZnJvbU1hY2hpbmUpO1xuXG4gIHJldHVybiB7XG4gICAgb2VtOiBwaWNrKFwiT0VNXCIsIFwib2VtXCIpLFxuICAgIG1vZGFsaXR5OiBwaWNrKFwiTW9kYWxpdHlcIiwgXCJtb2RhbGl0eVwiKSxcbiAgICBtb2RlbDogcGljayhcIk1vZGVsXCIsIFwibW9kZWxcIiksXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBidWlsZE5hbWVUb2tlbnMobmFtZSkge1xuICBpZiAoIW5hbWUgfHwgdHlwZW9mIG5hbWUgIT09IFwic3RyaW5nXCIpIHJldHVybiBbXTtcbiAgY29uc3QgbG93ZXIgPSBuYW1lLnRvTG93ZXJDYXNlKCkudHJpbSgpO1xuICBpZiAoIWxvd2VyKSByZXR1cm4gW107XG4gIGNvbnN0IHRva2VucyA9IGxvd2VyLnNwbGl0KC9bXmEtejAtOV0rLykuZmlsdGVyKEJvb2xlYW4pO1xuICAvLyBpbmNsdWRlIHRoZSBmdWxsIHBocmFzZSBzbyBleGFjdCBtdWx0aS13b3JkIHNlYXJjaGVzIGNhbiBtYXRjaFxuICB0b2tlbnMucHVzaChsb3dlcik7XG4gIHJldHVybiBBcnJheS5mcm9tKG5ldyBTZXQodG9rZW5zKSk7XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmaXJlYmFzZS9jb21wYXQvYXBwXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZpcmViYXNlL2NvbXBhdC9hdXRoXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZpcmViYXNlL2NvbXBhdC9maXJlc3RvcmVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZmlyZWJhc2UvY29tcGF0L3N0b3JhZ2VcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmV4dC9yb3V0ZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3RcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtYm9vdHN0cmFwXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LWlzXCIpOyJdLCJzb3VyY2VSb290IjoiIn0=