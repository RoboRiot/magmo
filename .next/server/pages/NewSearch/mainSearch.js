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

function fieldMatchesSelection(value, selected) {
  if (!selected) return true;

  if (Array.isArray(value)) {
    return value.some(entry => fieldMatchesSelection(entry, selected));
  }

  return normalizeText(value) === normalizeText(selected);
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

    if (!fieldMatchesSelection(OEM, selectedOEM)) {
      return false;
    }

    if (!fieldMatchesSelection(Modality, selectedModality)) {
      return false;
    }

    if (!fieldMatchesSelection(Model, selectedModel)) {
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

      if (!fieldMatchesSelection(OEM, selectedOEM)) {
        return false;
      }

      if (!fieldMatchesSelection(Modality, selectedModality)) {
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
        lineNumber: 1065,
        columnNumber: 9
      }
    }, p));

    const pushEllipsis = key => buttons.push(__jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Pagination"].Ellipsis, {
      key: key,
      disabled: true,
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1075,
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
      lineNumber: 1161,
      columnNumber: 5
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.filtersHeader,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1162,
      columnNumber: 7
    }
  }, __jsx("div", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1163,
      columnNumber: 9
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.filtersTitle,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1164,
      columnNumber: 11
    }
  }, "Filters"), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.filtersSubtitle,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1165,
      columnNumber: 11
    }
  }, "Narrow results by machine, client, or warehouse.")), hasActiveFilters ? __jsx("span", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.filtersBadge,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1170,
      columnNumber: 11
    }
  }, "Active") : null), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.filterSection,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1174,
      columnNumber: 7
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.filterSectionTitle,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1175,
      columnNumber: 9
    }
  }, "Machine"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["InputGroup"], {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.inputGroup,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1176,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["InputGroup"].Text, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1177,
      columnNumber: 11
    }
  }, "OEM"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Dropdown"], {
    onSelect: handleSelect1,
    className: "w-100",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1178,
      columnNumber: 11
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Dropdown"].Toggle, {
    variant: "outline-secondary",
    id: `${idPrefix}-oem`,
    className: `w-100 ${_styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.inputButton}`,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1179,
      columnNumber: 13
    }
  }, dropdown1Text), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Dropdown"].Menu, {
    className: "w-100",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1186,
      columnNumber: 13
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Dropdown"].Item, {
    eventKey: "unassigned",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1187,
      columnNumber: 15
    }
  }, "Select Option"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Dropdown"].Item, {
    eventKey: "GE",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1188,
      columnNumber: 15
    }
  }, "GE"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Dropdown"].Item, {
    eventKey: "Toshiba",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1189,
      columnNumber: 15
    }
  }, "Toshiba"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Dropdown"].Item, {
    eventKey: "Siemens",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1190,
      columnNumber: 15
    }
  }, "Siemens"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Dropdown"].Item, {
    eventKey: "Philips",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1191,
      columnNumber: 15
    }
  }, "Philips")))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["InputGroup"], {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.inputGroup,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1196,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["InputGroup"].Text, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1197,
      columnNumber: 11
    }
  }, "Modality"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Dropdown"], {
    onSelect: handleSelect2,
    className: "w-100",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1198,
      columnNumber: 11
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Dropdown"].Toggle, {
    variant: "outline-secondary",
    id: `${idPrefix}-modality`,
    className: `w-100 ${_styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.inputButton}`,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1199,
      columnNumber: 13
    }
  }, dropdown2Text), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Dropdown"].Menu, {
    className: "w-100",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1206,
      columnNumber: 13
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Dropdown"].Item, {
    eventKey: "unassigned",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1207,
      columnNumber: 15
    }
  }, "Select Option"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Dropdown"].Item, {
    eventKey: "CT",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1208,
      columnNumber: 15
    }
  }, "CT"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Dropdown"].Item, {
    eventKey: "MRI",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1209,
      columnNumber: 15
    }
  }, "MRI")))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["InputGroup"], {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.inputGroup,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1214,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["InputGroup"].Text, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1215,
      columnNumber: 11
    }
  }, "Model"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    variant: "outline-secondary",
    className: `w-100 ${_styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.inputButton}`,
    onClick: handleModelClick,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1216,
      columnNumber: 11
    }
  }, modelButtonText))), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.filterSection,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1226,
      columnNumber: 7
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.filterSectionTitle,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1227,
      columnNumber: 9
    }
  }, "Client"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["InputGroup"], {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.inputGroup,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1228,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["InputGroup"].Text, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1229,
      columnNumber: 11
    }
  }, "Client From"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    variant: "outline-secondary",
    className: `w-100 ${_styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.inputButton}`,
    onClick: () => handleClientClick("from"),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1230,
      columnNumber: 11
    }
  }, clientFromButtonText)), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["InputGroup"], {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.inputGroup,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1239,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["InputGroup"].Text, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1240,
      columnNumber: 11
    }
  }, "Client Current"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    variant: "outline-secondary",
    className: `w-100 ${_styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.inputButton}`,
    onClick: () => handleClientClick("current"),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1241,
      columnNumber: 11
    }
  }, clientCurrentButtonText))), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.filterSection,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1251,
      columnNumber: 7
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.filterSectionTitle,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1252,
      columnNumber: 9
    }
  }, "Warehouse"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["InputGroup"], {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.inputGroup,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1253,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["InputGroup"].Text, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1254,
      columnNumber: 11
    }
  }, "Quick"), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.buttonGroup,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1255,
      columnNumber: 11
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    variant: "outline-secondary",
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.flexButton,
    onClick: handleSoCalWarehouseClick,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1256,
      columnNumber: 13
    }
  }, "SoCal Warehouse"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    variant: "outline-secondary",
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.flexButton,
    onClick: handleNorCalWarehouseClick,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1263,
      columnNumber: 13
    }
  }, "NorCal Warehouse"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    variant: "outline-secondary",
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.flexButton,
    onClick: handleWarehouseUnassignedClick,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1270,
      columnNumber: 13
    }
  }, "Unassigned")))));

  return __jsx(_LoggedIn__WEBPACK_IMPORTED_MODULE_6__["default"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1285,
      columnNumber: 5
    }
  }, (isDeleting || isNavigating) && __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.loadingOverlay,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1287,
      columnNumber: 9
    }
  }, __jsx("img", {
    src: "/magmo-logo.png",
    alt: "Loading Magmo",
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.loadingLogo,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1288,
      columnNumber: 11
    }
  })), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"], {
    show: showDeleteModal,
    onHide: handleCloseDeleteModal,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1295,
      columnNumber: 7
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Header, {
    closeButton: true,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1296,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Title, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1297,
      columnNumber: 11
    }
  }, "Confirm Deletion")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Body, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1299,
      columnNumber: 9
    }
  }, "Are you sure you want to delete ", selectedItems.length, " item", selectedItems.length > 1 ? "s" : "", "?"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Footer, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1303,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    variant: "danger",
    onClick: handleDeleteSelected,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1304,
      columnNumber: 11
    }
  }, "Yes, delete"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    variant: "secondary",
    onClick: handleCloseDeleteModal,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1307,
      columnNumber: 11
    }
  }, "Cancel"))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"], {
    show: showClientModal,
    onHide: () => setShowClientModal(false),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1313,
      columnNumber: 7
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Header, {
    closeButton: true,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1314,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Title, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1315,
      columnNumber: 11
    }
  }, "Select ", clientSelectionType === "from" ? "Client From" : "Client Current")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Body, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1319,
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
      lineNumber: 1320,
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
      lineNumber: 1327,
      columnNumber: 11
    }
  }))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"], {
    show: showModelModal,
    onHide: () => setShowModelModal(false),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1339,
      columnNumber: 7
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Header, {
    closeButton: true,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1340,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Title, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1341,
      columnNumber: 11
    }
  }, "Select Model")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Body, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1343,
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
      lineNumber: 1344,
      columnNumber: 11
    }
  }), __jsx(_utils_ModelTable__WEBPACK_IMPORTED_MODULE_8__["default"], {
    models: models.filter(model => typeof model === "string" ? model.toLowerCase().includes(modelSearchTerm.toLowerCase()) : false),
    onSelectModel: handleModelSelect,
    clearSelection: () => handleModelSelect(null),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1351,
      columnNumber: 11
    }
  }))), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.page,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1363,
      columnNumber: 7
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.pageInner,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1364,
      columnNumber: 9
    }
  }, __jsx("header", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.header,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1365,
      columnNumber: 11
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.headerLeft,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1366,
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
      lineNumber: 1367,
      columnNumber: 15
    }
  }, __jsx("span", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1373,
      columnNumber: 17
    }
  }), __jsx("span", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1374,
      columnNumber: 17
    }
  }), __jsx("span", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1375,
      columnNumber: 17
    }
  })), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.brand,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1377,
      columnNumber: 15
    }
  }, __jsx("img", {
    src: "/magmo-logo.png",
    alt: "Magmo",
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.brandLogo,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1378,
      columnNumber: 17
    }
  }), __jsx("div", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1383,
      columnNumber: 17
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.brandName,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1384,
      columnNumber: 19
    }
  }, "Magmo"), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.brandSub,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1385,
      columnNumber: 19
    }
  }, "Inventory Search")))), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.headerRight,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1389,
      columnNumber: 13
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.headerStatus,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1390,
      columnNumber: 15
    }
  }, hasActiveFilters ? "Filters active" : "All items"))), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.content,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1396,
      columnNumber: 11
    }
  }, __jsx("aside", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.sidebar,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1397,
      columnNumber: 13
    }
  }, renderFilters("sidebar")), __jsx("main", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.main,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1398,
      columnNumber: 13
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.tableCard,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1399,
      columnNumber: 15
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.tableHeader,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1400,
      columnNumber: 17
    }
  }, __jsx("div", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1401,
      columnNumber: 19
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.tableTitle,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1402,
      columnNumber: 21
    }
  }, "Items"), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.tableSubtitle,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1403,
      columnNumber: 21
    }
  }, isLoading ? "Loading items" : `${info.length} items on this page`)), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.tableMeta,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1407,
      columnNumber: 19
    }
  }, "Page ", page, " ", hasNextPage ? `of ${totalKnownPages}+` : `of ${totalKnownPages}`)), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.tableBody,
    ref: tableBodyRef,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1412,
      columnNumber: 17
    }
  }, isLoading ? __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.loadingState,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1414,
      columnNumber: 21
    }
  }, __jsx("img", {
    src: "/magmo-logo.png",
    alt: "Loading Magmo",
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.loadingLogo,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1415,
      columnNumber: 23
    }
  }), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.loadingText,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1420,
      columnNumber: 23
    }
  }, "Loading")) : loadError ? __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.errorState,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1423,
      columnNumber: 21
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.errorTitle,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1424,
      columnNumber: 23
    }
  }, "Load failed (", loadError.code, ")"), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.errorMessage,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1427,
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
      lineNumber: 1428,
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
      lineNumber: 1440,
      columnNumber: 21
    }
  })), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.tableFooter,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1458,
      columnNumber: 17
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.paginationRow,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1459,
      columnNumber: 19
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Pagination"], {
    size: "sm",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1460,
      columnNumber: 21
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Pagination"].Prev, {
    onClick: () => setPage(p => Math.max(1, p - 1)),
    disabled: page <= 1,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1461,
      columnNumber: 23
    }
  }, "Previous"), pageButtons, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Pagination"].Next, {
    onClick: () => setPage(p => p + 1),
    disabled: !hasNextPage,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1468,
      columnNumber: 23
    }
  }, "Next"))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"], {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.searchRow,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1476,
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
      lineNumber: 1477,
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
      lineNumber: 1485,
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
      lineNumber: 1493,
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
      lineNumber: 1501,
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
      lineNumber: 1509,
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
      lineNumber: 1517,
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
      lineNumber: 1525,
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
      lineNumber: 1533,
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
      lineNumber: 1541,
      columnNumber: 23
    }
  }, "SKU"))), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.footerActions,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1551,
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
      lineNumber: 1552,
      columnNumber: 21
    }
  }), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    variant: "info",
    className: `${_styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.actionButton} ${_styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_10___default.a.mapActionButton}`,
    onClick: openMap,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1558,
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
      lineNumber: 1565,
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
      lineNumber: 1578,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Offcanvas"].Header, {
    closeButton: true,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1586,
      columnNumber: 11
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Offcanvas"].Title, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1587,
      columnNumber: 13
    }
  }, "Filters")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Offcanvas"].Body, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1589,
      columnNumber: 11
    }
  }, renderFilters("drawer"))), __jsx(_components_WarehouseMapModal__WEBPACK_IMPORTED_MODULE_13__["default"], {
    show: showMap,
    onHide: () => setShowMap(false),
    onView: handleMapView,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1592,
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
  const normalizeText = value => {
    if (value == null) return "";
    return String(value).toLowerCase().trim();
  };

  const fieldMatchesSelection = (value, selected) => {
    if (!selected) return false;

    if (Array.isArray(value)) {
      return value.some(entry => fieldMatchesSelection(entry, selected));
    }

    return normalizeText(value) === normalizeText(selected);
  };

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
          var _machineData$OEM, _machineData$Modality;

          const machineDoc = await machineRef.get();
          const machineData = machineDoc.data();

          if (selectedOEM && fieldMatchesSelection((_machineData$OEM = machineData.OEM) !== null && _machineData$OEM !== void 0 ? _machineData$OEM : machineData.oem, selectedOEM) || selectedModality && fieldMatchesSelection((_machineData$Modality = machineData.Modality) !== null && _machineData$Modality !== void 0 ? _machineData$Modality : machineData.modality, selectedModality)) {
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
  const normalizeText = value => {
    if (value == null) return "";
    return String(value).toLowerCase().trim();
  };

  const fieldMatchesSelection = (value, selected) => {
    if (!selected) return true;

    if (Array.isArray(value)) {
      return value.some(entry => fieldMatchesSelection(entry, selected));
    }

    return normalizeText(value) === normalizeText(selected);
  };

  const db = _context_Firebase__WEBPACK_IMPORTED_MODULE_1__["default"].firestore();
  const machinesSnapshot = await db.collection("Machine").get();
  const models = new Set();
  await Promise.all(machinesSnapshot.docs.map(async machineDoc => {
    var _machineData$OEM2, _machineData$Modality2;

    const machineData = machineDoc.data();
    let isValid = true;
    if (!fieldMatchesSelection((_machineData$OEM2 = machineData.OEM) !== null && _machineData$OEM2 !== void 0 ? _machineData$OEM2 : machineData.oem, selectedOEM)) isValid = false;
    if (!fieldMatchesSelection((_machineData$Modality2 = machineData.Modality) !== null && _machineData$Modality2 !== void 0 ? _machineData$Modality2 : machineData.modality, selectedModality)) isValid = false;

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
      var _machineData$Model;

      const modelValue = (_machineData$Model = machineData.Model) !== null && _machineData$Model !== void 0 ? _machineData$Model : machineData.model;

      if (Array.isArray(modelValue)) {
        modelValue.forEach(entry => entry && models.add(entry));
      } else if (modelValue) {
        models.add(modelValue);
      }
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
  if (Array.isArray(value)) {
    return value.some(entry => {
      const trimmed = String(entry || "").trim();
      return trimmed !== "" && trimmed.toLowerCase() !== "n/a";
    });
  }

  if (typeof value !== "string") return Boolean(value);
  const trimmed = value.trim();
  return trimmed !== "" && trimmed.toLowerCase() !== "n/a";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibmV4dC9kaXN0L25leHQtc2VydmVyL2xpYi9yb3V0ZXItY29udGV4dC5qc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm5leHQvZGlzdC9uZXh0LXNlcnZlci9saWIvcm91dGVyL3V0aWxzL2dldC1hc3NldC1wYXRoLWZyb20tcm91dGUuanNcIiIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL1dhcmVob3VzZU1hcE1vZGFsLmpzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvV2FyZWhvdXNlTWFwTW9kYWwubW9kdWxlLmNzcyIsIndlYnBhY2s6Ly8vLi9jb250ZXh0L0F1dGhVc2VyQ29udGV4dC5qcyIsIndlYnBhY2s6Ly8vLi9jb250ZXh0L0ZpcmViYXNlLmpzIiwid2VicGFjazovLy8uL2NvbnRleHQvdXNlRmlyZWJhc2VBdXRoLmpzIiwid2VicGFjazovLy8uLi8uLi9jbGllbnQvbGluay50c3giLCJ3ZWJwYWNrOi8vLy4uLy4uL2NsaWVudC9ub3JtYWxpemUtdHJhaWxpbmctc2xhc2gudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uL2NsaWVudC9yZXF1ZXN0LWlkbGUtY2FsbGJhY2sudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uL2NsaWVudC9yb3V0ZS1sb2FkZXIudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uL2NsaWVudC9yb3V0ZXIudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uL2NsaWVudC91c2UtaW50ZXJzZWN0aW9uLnRzeCIsIndlYnBhY2s6Ly8vLi4vLi4vY2xpZW50L3dpdGgtcm91dGVyLnRzeCIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL3BhdGgtdG8tcmVnZXhwL2luZGV4LmpzIiwid2VicGFjazovLy8uLi8uLi8uLi8uLi9uZXh0LXNlcnZlci9saWIvaTE4bi9ub3JtYWxpemUtbG9jYWxlLXBhdGgudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL25leHQtc2VydmVyL2xpYi9taXR0LnRzIiwid2VicGFjazovLy8uLi8uLi8uLi8uLi9uZXh0LXNlcnZlci9saWIvcm91dGVyL3JvdXRlci50cyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vLi4vbmV4dC1zZXJ2ZXIvbGliL3JvdXRlci91dGlscy9mb3JtYXQtdXJsLnRzIiwid2VicGFjazovLy8uLi8uLi8uLi8uLi8uLi9uZXh0LXNlcnZlci9saWIvcm91dGVyL3V0aWxzL2lzLWR5bmFtaWMudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uLy4uL25leHQtc2VydmVyL2xpYi9yb3V0ZXIvdXRpbHMvcGFyc2UtcmVsYXRpdmUtdXJsLnRzIiwid2VicGFjazovLy8uLi8uLi8uLi8uLi8uLi9uZXh0LXNlcnZlci9saWIvcm91dGVyL3V0aWxzL3BhdGgtbWF0Y2gudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uLy4uL25leHQtc2VydmVyL2xpYi9yb3V0ZXIvdXRpbHMvcHJlcGFyZS1kZXN0aW5hdGlvbi50cyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vLi4vbmV4dC1zZXJ2ZXIvbGliL3JvdXRlci91dGlscy9xdWVyeXN0cmluZy50cyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vLi4vbmV4dC1zZXJ2ZXIvbGliL3JvdXRlci91dGlscy9yZXNvbHZlLXJld3JpdGVzLnRzIiwid2VicGFjazovLy8uLi8uLi8uLi8uLi8uLi9uZXh0LXNlcnZlci9saWIvcm91dGVyL3V0aWxzL3JvdXRlLW1hdGNoZXIudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uLy4uL25leHQtc2VydmVyL2xpYi9yb3V0ZXIvdXRpbHMvcm91dGUtcmVnZXgudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL25leHQtc2VydmVyL2xpYi91dGlscy50cyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L25leHQtc2VydmVyL3NlcnZlci9kZW5vcm1hbGl6ZS1wYWdlLXBhdGguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL25leHQvbGluay5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmV4dC9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL25leHQvbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVXaWxkY2FyZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmV4dC9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy90eXBlb2YuanMiLCJ3ZWJwYWNrOi8vLy4vcGFnZXMvTG9nZ2VkSW4uanMiLCJ3ZWJwYWNrOi8vLy4vcGFnZXMvTmV3U2VhcmNoL21haW5TZWFyY2guanMiLCJ3ZWJwYWNrOi8vLy4vc3R5bGVzL0NsaWVudFRhYmxlLm1vZHVsZS5jc3MiLCJ3ZWJwYWNrOi8vLy4vc3R5bGVzL01haW5TZWFyY2gubW9kdWxlLmNzcyIsIndlYnBhY2s6Ly8vLi9zdHlsZXMvUGFydFRhYmxlLm1vZHVsZS5jc3MiLCJ3ZWJwYWNrOi8vLy4vdXRpbHMvQ2xpZW50VGFibGUuanMiLCJ3ZWJwYWNrOi8vLy4vdXRpbHMvTW9kZWxUYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi91dGlscy9QYXJ0VGFibGUuanMiLCJ3ZWJwYWNrOi8vLy4vdXRpbHMvZmV0Y2hBc3NvY2lhdGlvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vdXRpbHMvaXRlbUZvcm1TaGFyZWQuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZmlyZWJhc2UvY29tcGF0L2FwcFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImZpcmViYXNlL2NvbXBhdC9hdXRoXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZmlyZWJhc2UvY29tcGF0L2ZpcmVzdG9yZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImZpcmViYXNlL2NvbXBhdC9zdG9yYWdlXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibmV4dC9yb3V0ZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LWJvb3RzdHJhcFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LWlzXCIiXSwibmFtZXMiOlsiUkVHSU9OX09SREVSIiwiTk9fUEFMTEVUIiwiTEVUVEVSUyIsIkFycmF5IiwiZnJvbSIsImxlbmd0aCIsIl8iLCJpIiwiU3RyaW5nIiwiZnJvbUNoYXJDb2RlIiwiTlVNQkVSUyIsIldhcmVob3VzZU1hcE1vZGFsIiwic2hvdyIsIm9uSGlkZSIsIm9uVmlldyIsIm9uU2VsZWN0aW9uQ2hhbmdlIiwiaW5pdGlhbFNlbGVjdGlvbiIsInJlZ2lvbk9wdGlvbnMiLCJzZXRSZWdpb25PcHRpb25zIiwidXNlU3RhdGUiLCJzZWN0aW9uTWFwIiwic2V0U2VjdGlvbk1hcCIsIm1hcFN0ZXAiLCJzZXRNYXBTdGVwIiwibWFwUmVnaW9uIiwic2V0TWFwUmVnaW9uIiwibWFwUm93Iiwic2V0TWFwUm93IiwibWFwQ29sIiwic2V0TWFwQ29sIiwibWFwUGFsbGV0Iiwic2V0TWFwUGFsbGV0IiwibWFwQmluIiwic2V0TWFwQmluIiwibWFwQ2VsbFBhbGxldHMiLCJzZXRNYXBDZWxsUGFsbGV0cyIsIm1hcFBhbGxldEJpbnMiLCJzZXRNYXBQYWxsZXRCaW5zIiwibWFwTG9hZGluZyIsInNldE1hcExvYWRpbmciLCJtYXBFcnJvciIsInNldE1hcEVycm9yIiwiZGlyZWN0b3J5TG9hZGVkIiwic2V0RGlyZWN0b3J5TG9hZGVkIiwibGFzdFNob3dSZWYiLCJ1c2VSZWYiLCJub3RpZnlTZWxlY3Rpb25DaGFuZ2UiLCJ1c2VDYWxsYmFjayIsInNlbGVjdGlvbiIsImxvYWREaXJlY3RvcnkiLCJkb2MiLCJmaXJlYmFzZSIsImZpcmVzdG9yZSIsImNvbGxlY3Rpb24iLCJnZXQiLCJkYXRhIiwiUmVnaW9uIiwiU2VjdGlvbiIsImVycm9yIiwiY29uc29sZSIsImxvYWRSZWdpb25JbnZlbnRvcnkiLCJyZWdpb25JZCIsInNuYXAiLCJ3aGVyZSIsImNlbGxQYWxsZXRzIiwicGFsbGV0QmlucyIsImZvckVhY2giLCJsb2MiLCJuZXdMb2NhbEN1cnJlbnQiLCJyb3ciLCJzZWN0aW9uIiwibGV0dGVyIiwiY29sIiwibnVtYmVyIiwidHJpbW1lZCIsInRyaW0iLCJzbGljZSIsInVuZGVmaW5lZCIsInBhbGxldCIsImJpbiIsImNlbGxLZXkiLCJoYXNCaW4iLCJoYXNQYWxsZXQiLCJwYWxsZXRJZCIsIlNldCIsImFkZCIsInBhbGxldEtleSIsImNlbGxPYmoiLCJPYmplY3QiLCJrZXlzIiwia2V5Iiwic29ydCIsImEiLCJiIiwibmEiLCJOdW1iZXIiLCJuYiIsImlzRmluaXRlIiwibG9jYWxlQ29tcGFyZSIsInBhbGxldE9iaiIsImdldFJlZ2lvbkRpbWVuc2lvbnMiLCJlbnRyeSIsImlzQXJyYXkiLCJjb2xzIiwicGFyc2VJbnQiLCJyb3dzIiwidXNlRWZmZWN0Iiwid2FzT3BlbiIsImN1cnJlbnQiLCJyZWdpb24iLCJzZWN0aW9uTGV0dGVyIiwic2VjdGlvbk51bWJlciIsImhhbmRsZVNlbGVjdFJlZ2lvbiIsImhhbmRsZVNlbGVjdENlbGwiLCJyb3dMZXR0ZXIiLCJjb2xOdW1iZXIiLCJjb2xWYWx1ZSIsImhhbmRsZVNlbGVjdFBhbGxldCIsInBhbGxldFZhbHVlIiwibm9ybWFsaXplZFBhbGxldCIsImhhbmRsZVNlbGVjdEJpbiIsImJpbklkIiwiYmluVmFsdWUiLCJoYW5kbGVCYWNrIiwiaGFuZGxlVmlldyIsInN0eWxlcyIsIm1hcFN0YWdlIiwibWFwSGludCIsIm1hcENhbnZhcyIsIm1hcCIsInJlZ2lvbkJsb2NrIiwiaW5jbHVkZXMiLCJkaW1zIiwicmV2ZXJzZSIsInNlY3Rpb25LZXlzIiwiZmlsdGVyIiwiQm9vbGVhbiIsInNwbGl0IiwibWFwRW1wdHkiLCJncmlkV3JhcHBlciIsInBhbGxldEdyaWQiLCJwYWxsZXRCdXR0b24iLCJncmlkIiwiaGFzUGFsbGV0cyIsImdyaWRDZWxsIiwiZ3JpZENlbGxEaXNhYmxlZCIsImJpbnMiLCJiaW5CdXR0b24iLCJtYXBGb290ZXIiLCJhdXRoVXNlckNvbnRleHQiLCJjcmVhdGVDb250ZXh0IiwiYXV0aFVzZXIiLCJsb2FkaW5nIiwic2lnbkluV2l0aEdvb2dsZSIsInNpZ25PdXQiLCJBdXRoVXNlclByb3ZpZGVyIiwiY2hpbGRyZW4iLCJhdXRoIiwidXNlRmlyZWJhc2VBdXRoIiwidXNlQXV0aCIsInVzZUNvbnRleHQiLCJGaXJlYmFzZUNyZWRlbnRpYWxzIiwiYXBpS2V5IiwiYXV0aERvbWFpbiIsInByb2plY3RJZCIsInN0b3JhZ2VCdWNrZXQiLCJtZXNzYWdpbmdTZW5kZXJJZCIsImFwcElkIiwibWVhc3VyZW1lbnRJZCIsIkZpcmViYXNlIiwiYXBwcyIsImluaXRpYWxpemVBcHAiLCJmb3JtYXRBdXRoVXNlciIsInVzZXIiLCJ1aWQiLCJlbWFpbCIsInNldEF1dGhVc2VyIiwic2V0TG9hZGluZyIsImF1dGhTdGF0ZUNoYW5nZWQiLCJhdXRoU3RhdGUiLCJmb3JtYXR0ZWRVc2VyIiwiY2xlYXIiLCJwcm92aWRlciIsIkdvb2dsZUF1dGhQcm92aWRlciIsInNldEN1c3RvbVBhcmFtZXRlcnMiLCJwcm9tcHQiLCJzaWduSW5XaXRoUmVkaXJlY3QiLCJjYXRjaCIsInRoZW4iLCJ1bnN1YnNjcmliZSIsInNldFBlcnNpc3RlbmNlIiwiQXV0aCIsIlBlcnNpc3RlbmNlIiwiTE9DQUwiLCJvbkF1dGhTdGF0ZUNoYW5nZWQiLCJwcmVmZXRjaGVkIiwicm91dGVyIiwiZXJyIiwiY3VyTG9jYWxlIiwib3B0aW9ucyIsImhyZWYiLCJldmVudCIsInRhcmdldCIsImUiLCJub2RlTmFtZSIsImlzTW9kaWZpZWRFdmVudCIsInNjcm9sbCIsImFzIiwicmVwbGFjZSIsImFyZ3MiLCJleHBlY3RlZCIsImFjdHVhbCIsInJlcXVpcmVkUHJvcHNHdWFyZCIsInJlcXVpcmVkUHJvcHMiLCJwcm9wcyIsImNyZWF0ZVByb3BFcnJvciIsIm9wdGlvbmFsUHJvcHNHdWFyZCIsInNoYWxsb3ciLCJwYXNzSHJlZiIsInByZWZldGNoIiwibG9jYWxlIiwib3B0aW9uYWxQcm9wcyIsInZhbFR5cGUiLCJoYXNXYXJuZWQiLCJSZWFjdCIsInAiLCJwYXRobmFtZSIsInJlc29sdmVkQXMiLCJjaGlsZCIsIkNoaWxkcmVuIiwiY2hpbGRSZWYiLCJyb290TWFyZ2luIiwic2V0UmVmIiwiZWwiLCJzZXRJbnRlcnNlY3Rpb25SZWYiLCJzaG91bGRQcmVmZXRjaCIsImlzVmlzaWJsZSIsImlzUHJlZmV0Y2hlZCIsImNoaWxkUHJvcHMiLCJyZWYiLCJvbkNsaWNrIiwibGlua0NsaWNrZWQiLCJwcmlvcml0eSIsImxvY2FsZURvbWFpbiIsIkxpbmsiLCJwYXRoIiwibm9ybWFsaXplUGF0aFRyYWlsaW5nU2xhc2giLCJwcm9jZXNzIiwicmVxdWVzdElkbGVDYWxsYmFjayIsInNlbGYiLCJzdGFydCIsIkRhdGUiLCJzZXRUaW1lb3V0IiwiY2IiLCJkaWRUaW1lb3V0IiwidGltZVJlbWFpbmluZyIsIk1hdGgiLCJjYW5jZWxJZGxlQ2FsbGJhY2siLCJjbGVhclRpbWVvdXQiLCJNU19NQVhfSURMRV9ERUxBWSIsIlByb21pc2UiLCJwcm9tIiwicmVzb2x2ZSIsInJlc29sdmVyIiwiZnV0dXJlIiwiZ2VuZXJhdG9yIiwidmFsdWUiLCJsaW5rIiwiZG9jdW1lbnQiLCJ3aW5kb3ciLCJjYW5QcmVmZXRjaCIsImhhc1ByZWZldGNoIiwicmVzIiwiQVNTRVRfTE9BRF9FUlJPUiIsIlN5bWJvbCIsInNjcmlwdCIsInJlamVjdCIsIm1hcmtBc3NldEVycm9yIiwic3JjIiwiY2FuY2VsbGVkIiwiciIsIm9uQnVpbGRNYW5pZmVzdCIsInJlc29sdmVQcm9taXNlV2l0aFRpbWVvdXQiLCJzY3JpcHRzIiwiYXNzZXRQcmVmaXgiLCJlbmNvZGVVUkkiLCJjc3MiLCJnZXRDbGllbnRCdWlsZE1hbmlmZXN0IiwibWFuaWZlc3QiLCJyb3V0ZSIsImFsbEZpbGVzIiwidiIsImVudHJ5cG9pbnRzIiwibG9hZGVkU2NyaXB0cyIsInN0eWxlU2hlZXRzIiwicm91dGVzIiwiYXBwZW5kU2NyaXB0IiwiZmV0Y2giLCJ0ZXh0IiwiY29udGVudCIsIndoZW5FbnRyeXBvaW50Iiwid2l0aEZ1dHVyZSIsIm9uRW50cnlwb2ludCIsImZuIiwiZXhwb3J0cyIsImNvbXBvbmVudCIsImlucHV0Iiwib2xkIiwibG9hZFJvdXRlIiwiZ2V0RmlsZXNGb3JSb3V0ZSIsImVudHJ5cG9pbnQiLCJjbiIsIm5hdmlnYXRvciIsIm91dHB1dCIsInByZWZldGNoVmlhRG9tIiwiY3JlYXRlUm91dGVMb2FkZXIiLCJzaW5nbGV0b25Sb3V0ZXIiLCJyZWFkeUNhbGxiYWNrcyIsInJlYWR5IiwidXJsUHJvcGVydHlGaWVsZHMiLCJyb3V0ZXJFdmVudHMiLCJjb3JlTWV0aG9kRmllbGRzIiwiUm91dGVyIiwiZmllbGQiLCJnZXRSb3V0ZXIiLCJldmVudEZpZWxkIiwiX3NpbmdsZXRvblJvdXRlciIsIm1lc3NhZ2UiLCJzdGFjayIsIlJvdXRlckNvbnRleHQiLCJjcmVhdGVSb3V0ZXIiLCJfcm91dGVyIiwiaW5zdGFuY2UiLCJoYXNJbnRlcnNlY3Rpb25PYnNlcnZlciIsImlzRGlzYWJsZWQiLCJkaXNhYmxlZCIsInVub2JzZXJ2ZSIsIm9ic2VydmUiLCJzZXRWaXNpYmxlIiwiaWRsZUNhbGxiYWNrIiwiY3JlYXRlT2JzZXJ2ZXIiLCJlbGVtZW50cyIsIm9ic2VydmVyIiwib2JzZXJ2ZXJzIiwiaWQiLCJlbnRyaWVzIiwiY2FsbGJhY2siLCJDb21wb3NlZENvbXBvbmVudCIsImdldEluaXRpYWxQcm9wcyIsIldpdGhSb3V0ZXJXcmFwcGVyIiwibmFtZSIsInBhdGhuYW1lUGFydHMiLCJsb2NhbGVzIiwiZGV0ZWN0ZWRMb2NhbGUiLCJhbGwiLCJvbiIsIm9mZiIsImVtaXQiLCJoYW5kbGVyIiwiYmFzZVBhdGgiLCJwcmVmaXgiLCJwYXRoTm9RdWVyeUhhc2giLCJxdWVyeUluZGV4IiwiaGFzaEluZGV4IiwiYWRkUGF0aFByZWZpeCIsInVybCIsImxvY2F0aW9uT3JpZ2luIiwicmVzb2x2ZWQiLCJoYXNCYXNlUGF0aCIsImludGVycG9sYXRlZFJvdXRlIiwiZHluYW1pY1JlZ2V4IiwiZHluYW1pY0dyb3VwcyIsImR5bmFtaWNNYXRjaGVzIiwiYXNQYXRobmFtZSIsInBhcmFtcyIsInBhcmFtIiwicmVwbGFjZWQiLCJyZXBlYXQiLCJvcHRpb25hbCIsInNlZ21lbnQiLCJlbmNvZGVVUklDb21wb25lbnQiLCJyZXN1bHQiLCJmaWx0ZXJlZFF1ZXJ5IiwicXVlcnkiLCJiYXNlIiwidXJsQXNTdHJpbmciLCJpc0xvY2FsVVJMIiwicmVzb2x2ZUFzIiwiZmluYWxVcmwiLCJpbnRlcnBvbGF0ZWRBcyIsImludGVycG9sYXRlQXMiLCJoYXNoIiwib21pdFBhcm1zRnJvbVF1ZXJ5IiwicmVzb2x2ZWRIcmVmIiwib3JpZ2luIiwicmVzb2x2ZUhyZWYiLCJocmVmSGFkT3JpZ2luIiwiYXNIYWRPcmlnaW4iLCJzdHJpcE9yaWdpbiIsInByZXBhcmVkVXJsIiwiYWRkQmFzZVBhdGgiLCJwcmVwYXJlZEFzIiwiY2xlYW5QYXRobmFtZSIsInBhZ2VzIiwicGFnZSIsIm1hbnVhbFNjcm9sbFJlc3RvcmF0aW9uIiwiU1NHX0RBVEFfTk9UX0ZPVU5EIiwiY3JlZGVudGlhbHMiLCJhdHRlbXB0cyIsImZldGNoUmV0cnkiLCJub3RGb3VuZCIsImlzU2VydmVyUmVuZGVyIiwiY29uc3RydWN0b3IiLCJhc1BhdGgiLCJjb21wb25lbnRzIiwic2RjIiwic2RyIiwic3ViIiwiY2xjIiwicGFnZUxvYWRlciIsIl9icHMiLCJldmVudHMiLCJfd3JhcEFwcCIsImlzU3NyIiwiaXNGYWxsYmFjayIsIl9pbkZsaWdodFJvdXRlIiwiX3NoYWxsb3ciLCJkZWZhdWx0TG9jYWxlIiwiZG9tYWluTG9jYWxlcyIsImlzUmVhZHkiLCJpc1ByZXZpZXciLCJpc0xvY2FsZURvbWFpbiIsIl9pZHgiLCJzdGF0ZSIsImluaXRpYWwiLCJfX05fU1NHIiwiaW5pdGlhbFByb3BzIiwiX19OX1NTUCIsIkNvbXBvbmVudCIsImF1dG9FeHBvcnREeW5hbWljIiwicmVsb2FkIiwiYmFjayIsInB1c2giLCJwcmVwYXJlVXJsQXMiLCJzaG91bGRSZXNvbHZlSHJlZiIsImxvY2FsZUNoYW5nZSIsIlNUIiwicGVyZm9ybWFuY2UiLCJyb3V0ZVByb3BzIiwiYWRkTG9jYWxlIiwiZGVsQmFzZVBhdGgiLCJjbGVhbmVkQXMiLCJkZWxMb2NhbGUiLCJwYXJzZWQiLCJfX3Jld3JpdGVzIiwibWV0aG9kIiwicmV3cml0ZXNSZXN1bHQiLCJyZXNvbHZlRHluYW1pY1JvdXRlIiwicGFyc2VkQXMiLCJyb3V0ZVJlZ2V4Iiwicm91dGVNYXRjaCIsInNob3VsZEludGVycG9sYXRlIiwibWlzc2luZ1BhcmFtcyIsInJvdXRlSW5mbyIsImRlc3RpbmF0aW9uIiwicGFyc2VkSHJlZiIsIm5vdEZvdW5kUm91dGUiLCJhcHBDb21wIiwiaXNWYWxpZFNoYWxsb3dSb3V0ZSIsImZvcmNlZFNjcm9sbCIsIngiLCJ5IiwiY2hhbmdlU3RhdGUiLCJfX04iLCJpZHgiLCJidWlsZENhbmNlbGxhdGlvbkVycm9yIiwiZXhpc3RpbmdSb3V0ZUluZm8iLCJjYWNoZWRSb3V0ZUluZm8iLCJyZXF1aXJlIiwiaXNWYWxpZEVsZW1lbnRUeXBlIiwiZGF0YUhyZWYiLCJzZXQiLCJiZWZvcmVQb3BTdGF0ZSIsIm9ubHlBSGFzaENoYW5nZSIsIm5ld0hhc2giLCJvbGRVcmxOb0hhc2giLCJvbGRIYXNoIiwic2Nyb2xsVG9IYXNoIiwiaWRFbCIsIm5hbWVFbCIsInVybElzTmV3IiwiaXNTc2ciLCJjYW5jZWwiLCJjb21wb25lbnRSZXN1bHQiLCJfZ2V0RGF0YSIsIl9nZXRTdGF0aWNEYXRhIiwiZmV0Y2hOZXh0RGF0YSIsIl9nZXRTZXJ2ZXJEYXRhIiwiQXBwVHJlZSIsImN0eCIsImFib3J0Q29tcG9uZW50TG9hZCIsIm5vdGlmeSIsInNsYXNoZWRQcm90b2NvbHMiLCJwcm90b2NvbCIsInVybE9iaiIsImhvc3QiLCJob3N0bmFtZSIsInF1ZXJ5c3RyaW5nIiwic2VhcmNoIiwiVEVTVF9ST1VURSIsImdsb2JhbEJhc2UiLCJyZXNvbHZlZEJhc2UiLCJtYXRjaGVyT3B0aW9ucyIsInNlbnNpdGl2ZSIsImRlbGltaXRlciIsImN1c3RvbVJvdXRlTWF0Y2hlck9wdGlvbnMiLCJzdHJpY3QiLCJjdXN0b21Sb3V0ZSIsIm1hdGNoZXJSZWdleCIsInBhdGhUb1JlZ2V4cCIsIm1hdGNoZXIiLCJnZXRTYWZlUGFyYW1OYW1lIiwicGFyYW1OYW1lIiwibmV3UGFyYW1OYW1lIiwiY2hhckNvZGUiLCJhbGxNYXRjaCIsImhhcyIsImhhc0l0ZW0iLCJyZXEiLCJtYXRjaGVzIiwiZ3JvdXBLZXkiLCJ2YWxpZGF0ZSIsInBhcnNlZERlc3RpbmF0aW9uIiwiaGFkTG9jYWxlIiwiZGVzdFF1ZXJ5IiwiZGVzdFBhdGgiLCJkZXN0UGF0aFBhcmFtS2V5cyIsImRlc3RQYXRoUGFyYW1zIiwiZGVzdGluYXRpb25Db21waWxlciIsInN0ck9yQXJyYXkiLCJjb21waWxlTm9uUGF0aCIsInBhcmFtS2V5cyIsImFwcGVuZFBhcmFtc1RvUXVlcnkiLCJuZXdVcmwiLCJzZWFyY2hQYXJhbXMiLCJpc05hTiIsIml0ZW0iLCJzdHJpbmdpZnlVcmxRdWVyeVBhcmFtIiwic2VhcmNoUGFyYW1zTGlzdCIsImN1c3RvbVJvdXRlTWF0Y2hlciIsIm1hdGNoZWRQYWdlIiwiZnNQYXRobmFtZSIsImhhbmRsZVJld3JpdGUiLCJyZXdyaXRlIiwiaGFzUGFyYW1zIiwiaGVhZGVycyIsImNvb2tpZXMiLCJhY2MiLCJkZXN0UmVzIiwiZmluaXNoZWQiLCJyZXdyaXRlcyIsInJlIiwiZGVjb2RlIiwiZGVjb2RlVVJJQ29tcG9uZW50Iiwic2x1Z05hbWUiLCJnIiwiZ3JvdXBzIiwibSIsInN0ciIsInNlZ21lbnRzIiwibm9ybWFsaXplZFJvdXRlIiwiZ3JvdXBJbmRleCIsInBhcmFtZXRlcml6ZWRSb3V0ZSIsInBhcnNlUGFyYW1ldGVyIiwicG9zIiwiZXNjYXBlUmVnZXgiLCJyb3V0ZUtleUNoYXJDb2RlIiwicm91dGVLZXlDaGFyTGVuZ3RoIiwiZ2V0U2FmZVJvdXRlS2V5Iiwicm91dGVLZXkiLCJyb3V0ZUtleXMiLCJuYW1lZFBhcmFtZXRlcml6ZWRSb3V0ZSIsImNsZWFuZWRLZXkiLCJpbnZhbGlkS2V5IiwibmFtZWRSZWdleCIsInVzZWQiLCJwb3J0IiwiZ2V0TG9jYXRpb25PcmlnaW4iLCJBcHAiLCJnZXREaXNwbGF5TmFtZSIsInBhZ2VQcm9wcyIsImxvYWRHZXRJbml0aWFsUHJvcHMiLCJpc1Jlc1NlbnQiLCJ1cmxPYmplY3RLZXlzIiwiU1AiLCJMb2dnZWRJbiIsInVzZVJvdXRlciIsImxvZyIsInRpbWVyIiwibWluSGVpZ2h0IiwiU09DQUxfQ0xJRU5UX0lEIiwiTk9SQ0FMX0NMSUVOVF9JRCIsIlVOQVNTSUdORURfQ0xJRU5UX0lEIiwiREVGQVVMVF9QQUdFX1NJWkUiLCJzaW11bGF0ZU5ldHdvcmtSZXF1ZXN0IiwiTG9hZGluZ0J1dHRvbiIsInR5cGUiLCJjbGFzc05hbWUiLCJpc0xvYWRpbmciLCJ0b1RpbWUiLCJzZWNvbmRzIiwidCIsImdldFRpbWUiLCJpc28iLCJwYXJzZSIsInBhcnRzIiwibW0iLCJkZCIsInl5eXkiLCJhbHQiLCJ0b1lNRCIsImQiLCJnZXRGdWxsWWVhciIsImdldE1vbnRoIiwicGFkU3RhcnQiLCJnZXREYXRlIiwibm9ybWFsaXplVGV4dCIsInRvTG93ZXJDYXNlIiwiZmllbGRNYXRjaGVzU2VsZWN0aW9uIiwic2VsZWN0ZWQiLCJzb21lIiwiZ2V0TWFjaGluZUZpZWxkIiwibG93ZXIiLCJtYWNoaW5lRGF0YSIsImN1cnJlbnRNYWNoaW5lRGF0YSIsInRoZU1hY2hpbmVEYXRhIiwiVGhlTWFjaGluZSIsIk1haW5TZWFyY2giLCJpbmZvIiwic2V0SW5mbyIsImJhY2t1cEluZm8iLCJzZXRCYWNrdXBJbmZvIiwiYXVnbWVudGVkSW5mbyIsInNldEF1Z21lbnRlZEluZm8iLCJzZXRJc0xvYWRpbmciLCJpZHMiLCJzZXRJRCIsInNldFNob3ciLCJzaG93RmlsdGVycyIsInNldFNob3dGaWx0ZXJzIiwicGFnZVNpemUiLCJzZXRQYWdlU2l6ZSIsImlzTmF2aWdhdGluZyIsInNldElzTmF2aWdhdGluZyIsImRJdGVtIiwic2V0REl0ZW0iLCJzZWxlY3QiLCJzZXRTZWxlY3QiLCJzaG93TGlzdCIsInNldFNob3dMaXN0Iiwic2hvd0xpc3RTZWFyY2giLCJzZXRTaG93TGlzdFNlYXJjaCIsInNldFNlYXJjaCIsInNlbGVjdGVkT0VNIiwic2V0U2VsZWN0ZWRPRU0iLCJzZWxlY3RlZE1vZGFsaXR5Iiwic2V0U2VsZWN0ZWRNb2RhbGl0eSIsInNlbGVjdGVkQ2xpZW50RnJvbSIsInNldFNlbGVjdGVkQ2xpZW50RnJvbSIsImNsaWVudEZyb21CdXR0b25UZXh0Iiwic2V0Q2xpZW50RnJvbUJ1dHRvblRleHQiLCJzZWxlY3RlZENsaWVudEN1cnJlbnQiLCJzZXRTZWxlY3RlZENsaWVudEN1cnJlbnQiLCJjbGllbnRDdXJyZW50QnV0dG9uVGV4dCIsInNldENsaWVudEN1cnJlbnRCdXR0b25UZXh0IiwiY2xpZW50cyIsInNldENsaWVudHMiLCJzaG93Q2xpZW50TW9kYWwiLCJzZXRTaG93Q2xpZW50TW9kYWwiLCJjbGllbnRTZWxlY3Rpb25UeXBlIiwic2V0Q2xpZW50U2VsZWN0aW9uVHlwZSIsInNob3dNYXAiLCJzZXRTaG93TWFwIiwibGFiZWxCYXNlIiwibGFiZWxCYXNlTmFtZXMiLCJzb3J0Q2hlY2tCYXNlIiwid2l0aFNvcnRJY29uIiwiYmFzZUxhYmVscyIsImFjdGl2ZUluZGV4IiwiaXNEZXNjIiwiYXJyb3ciLCJsYWJlbHMiLCJzZXRMYWJlbHMiLCJzb3J0Q2hlY2siLCJzZXRTb3J0Q2hlY2siLCJob3ZlckluZGV4Iiwic2V0SG92ZXJJbmRleCIsInNlbGVjdGVkTW9kZWwiLCJzZXRTZWxlY3RlZE1vZGVsIiwiZ1BvcyIsInNldEdQb3MiLCJnSWRlIiwic2V0R0lkZSIsImlzRGVsZXRpbmciLCJzZXRJc0RlbGV0aW5nIiwic2V0UGFnZSIsInBhZ2VDdXJzb3JzIiwic2V0UGFnZUN1cnNvcnMiLCJoYXNOZXh0UGFnZSIsInNldEhhc05leHRQYWdlIiwiZmV0Y2hTZXEiLCJiYWNrZmlsbEluRmxpZ2h0IiwicXVlcnlFcG9jaCIsInNldFF1ZXJ5RXBvY2giLCJsb2FkRXJyb3IiLCJzZXRMb2FkRXJyb3IiLCJ0YWJsZUJvZHlSZWYiLCJyb3dIZWlnaHRSZWYiLCJoZWFkZXJIZWlnaHRSZWYiLCJMT0FEX1RJTUVPVVRfTVMiLCJvcGVuTWFwIiwiaGFuZGxlTWFwVmlldyIsIlVSTFNlYXJjaFBhcmFtcyIsInRvU3RyaW5nIiwic3RhcnROYW1lVG9rZW5CYWNrZmlsbCIsInJlYXNvbiIsImRiIiwibGFzdERvYyIsInRva2Vuc0VxdWFsIiwic2V0QSIsInNldEIiLCJzaXplIiwib3JkZXJCeSIsIkZpZWxkUGF0aCIsImRvY3VtZW50SWQiLCJsaW1pdCIsInN0YXJ0QWZ0ZXIiLCJlbXB0eSIsImJhdGNoIiwid3JpdGVzIiwiZG9jcyIsIm5hbWVMb3dlciIsIm5hbWVUb2tlbnMiLCJidWlsZE5hbWVUb2tlbnMiLCJleGlzdGluZ1Rva2VucyIsIm5lZWRzVXBkYXRlIiwidXBkYXRlIiwiY29tbWl0Iiwic2VhcmNoTG93ZXIiLCJoYXNBY3RpdmVGaWx0ZXJzIiwidmFsdWVNYXRjaGVzIiwicyIsIm1hdGNoZXNGaWx0ZXJzIiwidmlzaWJsZSIsIk9FTSIsIk1vZGFsaXR5IiwiTW9kZWwiLCJjbGllbnRGcm9tSWQiLCJjbGllbnRDdXJyZW50SWQiLCJ3YW50ZWREYXkiLCJpdGVtWU1EIiwiZGF0ZSIsImRlc2NyaXB0aW9ucyIsIndvcmtPcmRlcnMiLCJ3Iiwid28iLCJ3b3JrT3JkZXIiLCJwbiIsInNuIiwiZGVzYyIsImRlc2NyaXB0aW9uIiwibG9jYWxTTiIsImxvY2FsX3NuIiwicmVzZXRQYWdpbmF0aW9uIiwiZmV0Y2hEYXRhIiwiaGFuZGxlRG9uZSIsInJlcXVlc3RlZFBhZ2UiLCJzZXEiLCJ0aW1lZE91dCIsInRpbWVvdXRJZCIsImNvZGUiLCJyb3VuZCIsImlucHV0VGV4dCIsInNlbGVjdGVkVHlwZSIsInN0YXJ0QWZ0ZXJEb2MiLCJlZmZlY3RpdmVTZWxlY3QiLCJlZmZlY3RpdmVTZWFyY2giLCJlZmZlY3RpdmVTZWFyY2hMb3dlciIsImxvYWQiLCJhdHRlbXB0IiwiZmV0Y2hQYXJ0c1dpdGhNYWNoaW5lRGF0YVBhZ2UiLCJ2aXNpYmxlT25seSIsImZpbHRlckZuIiwicmF3IiwibmVlZHNNYWNoaW5lRGF0YSIsInBvdyIsIm5leHRQYWdlIiwiaGFzTmFtZVNlYXJjaCIsInByZXYiLCJuZXh0Iiwic2V0U2VsZWN0ZWRJdGVtcyIsImF1Z21lbnRlZCIsIkNsaWVudEZyb20iLCJDbGllbnRDdXJyZW50Iiwic2VhcmNoQ2hhbmdlSGFuZGxlciIsInNvcnRDaGVja0FsbCIsIm5leHRTb3J0Q2hlY2siLCJzb3J0ZWRJbmZvIiwidGEiLCJ0YiIsImF2IiwiYnYiLCJhbiIsImJuIiwicm93U2VsZWN0Iiwic2VsZWN0ZWRJdGVtcyIsInNob3dEZWxldGVNb2RhbCIsInNldFNob3dEZWxldGVNb2RhbCIsImhhbmRsZVNlbGVjdEl0ZW0iLCJoYW5kbGVTaG93RGVsZXRlTW9kYWwiLCJoYW5kbGVDbG9zZURlbGV0ZU1vZGFsIiwiaGFuZGxlRGVsZXRlU2VsZWN0ZWQiLCJpdGVtSWQiLCJkZWxldGUiLCJkZWxldGVGcm9tU3RvcmFnZSIsImhhbmRsZUNsb3NlIiwiaGFuZGxlU2hvdyIsImNoZWNrRGVsZXRlIiwiaWRzVG9EZWxldGUiLCJwcmV2ZW50RGVmYXVsdCIsInN0b3BQcm9wYWdhdGlvbiIsImhvdmVyU3R5bGUiLCJpbmRleCIsImJhY2tncm91bmRDb2xvciIsInRleHRBbGlnbiIsImN1cnNvciIsImRyb3Bkb3duMVRleHQiLCJzZXREcm9wZG93bjFUZXh0IiwiZHJvcGRvd24yVGV4dCIsInNldERyb3Bkb3duMlRleHQiLCJoYW5kbGVTZWxlY3QxIiwiZXZlbnRLZXkiLCJ0ZXh0Q29udGVudCIsImhhbmRsZVNlbGVjdDIiLCJidWlsZENsaWVudHNGcm9tSXRlbXMiLCJmaWx0ZXJlZCIsIml0Iiwib3V0IiwiaWRBcnJheSIsImNodW5rIiwiaGFuZGxlQ2xpZW50Q2xpY2siLCJzYWZlQ2xpZW50cyIsImNsaWVudHNEYXRhIiwiZmV0Y2hDbGllbnRzIiwiZGVyaXZlZCIsInNldENsaWVudFNlYXJjaFRlcm0iLCJoYW5kbGVDbGllbnRTZWxlY3QiLCJjbGllbnRJZCIsImNsaWVudFNuYXAiLCJleGlzdHMiLCJjbGllbnREYXRhIiwiaGFuZGxlQ2xpZW50SW5mbyIsImNsaWVudE5hbWUiLCJoYW5kbGVDbGVhckNsaWVudFNlbGVjdGlvbiIsIm1vZGVscyIsInNldE1vZGVscyIsInNob3dNb2RlbE1vZGFsIiwic2V0U2hvd01vZGVsTW9kYWwiLCJtb2RlbEJ1dHRvblRleHQiLCJzZXRNb2RlbEJ1dHRvblRleHQiLCJoYW5kbGVNb2RlbENsaWNrIiwibW9kZWxzRGF0YSIsImZldGNoTW9kZWxzIiwic2V0TW9kZWxTZWFyY2hUZXJtIiwiaGFuZGxlTW9kZWxTZWxlY3QiLCJtb2RlbE5hbWUiLCJoYW5kbGVDbGVhck1vZGVsU2VsZWN0aW9uIiwiaGFuZGxlU29DYWxXYXJlaG91c2VDbGljayIsImhhbmRsZU5vckNhbFdhcmVob3VzZUNsaWNrIiwiaGFuZGxlV2FyZWhvdXNlVW5hc3NpZ25lZENsaWNrIiwiY2xpZW50U2VhcmNoVGVybSIsIm1vZGVsU2VhcmNoVGVybSIsInN0b3JhZ2VSZWYiLCJzdG9yYWdlIiwiZm9sZGVyUmVmIiwibGlzdFJlc3VsdCIsImxpc3RBbGwiLCJkZWxldGVQcm9taXNlcyIsIml0ZW1zIiwiZGVsZXRlRnJvbVBhcnRzQ29sbGVjdGlvbiIsInRvdGFsS25vd25QYWdlcyIsIm1heCIsInBhZ2VCdXR0b25zIiwiYnV0dG9ucyIsIm1heFZpc2libGUiLCJwdXNoUGFnZSIsInB1c2hFbGxpcHNpcyIsImVuZCIsIm1pbiIsImRlc2lyZWRXaW5kb3ciLCJjdXJyZW50V2luZG93IiwicmVtYWluaW5nIiwicmVjYWxjUGFnZVNpemUiLCJjb250YWluZXJIZWlnaHQiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJoZWlnaHQiLCJoZWFkZXJSb3ciLCJxdWVyeVNlbGVjdG9yIiwiYm9keVJvdyIsImgiLCJ2ZXJ0aWNhbFBhZGRpbmciLCJhdmFpbGFibGUiLCJlc3RpbWF0ZWQiLCJmbG9vciIsImNsYW1wZWQiLCJvblJlc2l6ZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwicmVuZGVyRmlsdGVycyIsImlkUHJlZml4IiwiZmlsdGVyc1BhbmVsIiwiZmlsdGVyc0hlYWRlciIsImZpbHRlcnNUaXRsZSIsImZpbHRlcnNTdWJ0aXRsZSIsImZpbHRlcnNCYWRnZSIsImZpbHRlclNlY3Rpb24iLCJmaWx0ZXJTZWN0aW9uVGl0bGUiLCJpbnB1dEdyb3VwIiwiaW5wdXRCdXR0b24iLCJidXR0b25Hcm91cCIsImZsZXhCdXR0b24iLCJsb2FkaW5nT3ZlcmxheSIsImxvYWRpbmdMb2dvIiwiY2xpZW50IiwibW9kZWwiLCJwYWdlSW5uZXIiLCJoZWFkZXIiLCJoZWFkZXJMZWZ0IiwiYnVyZ2VyIiwiYnJhbmQiLCJicmFuZExvZ28iLCJicmFuZE5hbWUiLCJicmFuZFN1YiIsImhlYWRlclJpZ2h0IiwiaGVhZGVyU3RhdHVzIiwic2lkZWJhciIsIm1haW4iLCJ0YWJsZUNhcmQiLCJ0YWJsZUhlYWRlciIsInRhYmxlVGl0bGUiLCJ0YWJsZVN1YnRpdGxlIiwidGFibGVNZXRhIiwidGFibGVCb2R5IiwibG9hZGluZ1N0YXRlIiwibG9hZGluZ1RleHQiLCJlcnJvclN0YXRlIiwiZXJyb3JUaXRsZSIsImVycm9yTWVzc2FnZSIsInRhYmxlRm9vdGVyIiwicGFnaW5hdGlvblJvdyIsInNlYXJjaFJvdyIsInNlYXJjaElucHV0Iiwic2VhcmNoU2VsZWN0IiwiZm9vdGVyQWN0aW9ucyIsImFjdGlvbkJ1dHRvbiIsIm1hcEFjdGlvbkJ1dHRvbiIsImZpbHRlcnNEcmF3ZXIiLCJDbGllbnRUYWJsZSIsIm9uU2VsZWN0Q2xpZW50Iiwib25JbmZvQ2xpY2siLCJjbGVhclNlbGVjdGlvbiIsIm9uQWRkQ2xpZW50IiwiZGlzYWJsZVNlbGVjdCIsImRpc2FibGVJbmZvIiwiaXNDbGllbnRTZWFyY2giLCJjb2x1bW5Db3VudCIsInNob3dBY3Rpb25zIiwiY2xpZW50VGFibGUiLCJhY3Rpb25Sb3ciLCJhY3Rpb25CdXR0b25zIiwiTW9kZWxUYWJsZSIsIm9uU2VsZWN0TW9kZWwiLCJtb2RlbFRhYmxlIiwiUGFydFRhYmxlIiwibWluUm93cyIsImxvbmdQcmVzc05hbWUiLCJzZXRMb25nUHJlc3NOYW1lIiwiaXNNb2JpbGUiLCJzZXRJc01vYmlsZSIsInByZXNzVGltZXJSZWYiLCJsb25nUHJlc3NUcmlnZ2VyZWRSZWYiLCJtZWRpYSIsIm1hdGNoTWVkaWEiLCJhZGRMaXN0ZW5lciIsInJlbW92ZUxpc3RlbmVyIiwicHJldlNlbGVjdGVkSXRlbXMiLCJzdGFydExvbmdQcmVzcyIsImNhbmNlbExvbmdQcmVzcyIsImRpc21pc3NMb25nUHJlc3MiLCJwYWRkaW5nQ291bnQiLCJzY3JvbGxhYmxlVGFibGUiLCJmaXhlZFRhYmxlIiwic3RpY2t5SGVhZGVyIiwiYWN0aW9uQ29sIiwiY2VsbENsYW1wIiwiZm9ybWF0RGF0ZSIsImxvbmdQcmVzc092ZXJsYXkiLCJsb25nUHJlc3NDYXJkIiwiZmV0Y2hQYXJ0c1dpdGhNYWNoaW5lRGF0YSIsInBhcnRzU25hcHNob3QiLCJwYXJ0RG9jIiwicGFydERhdGEiLCJnZXRSZWZJZCIsIkRvY3VtZW50UmVmZXJlbmNlIiwiZmV0Y2hNYWNoaW5lRGF0YSIsIm1hY2hpbmVSZWYiLCJNYWNoaW5lIiwiTWFjaGluZUZyb20iLCJjdXJyZW50TWFjaGluZVJlZiIsIkN1cnJlbnRNYWNoaW5lIiwiTWFjaGluZUN1cnJlbnQiLCJjbGllbnRSZWYiLCJjbGllbnREb2MiLCJDbGllbnQiLCJNQUNISU5FX1NFTEVDVF9GSUVMRFMiLCJ3aXRoTWFjaGluZVNlbGVjdCIsImJ1aWxkUGFydCIsIm1hY2hpbmVNYXAiLCJjdXJyZW50TWFjaGluZU1hcCIsIm1hY2hpbmVJZCIsImN1cnJlbnRNYWNoaW5lSWQiLCJzZWFyY2hSYXciLCJzZWFyY2hUeXBlIiwiaGFzU2VhcmNoIiwidG9UaXRsZUNhc2UiLCJ3b3JkIiwiY2hhckF0IiwidG9VcHBlckNhc2UiLCJqb2luIiwiYnVpbGRTZWFyY2hRdWVyeSIsIm1vZGUiLCJ0aXRsZUZhbGxiYWNrIiwidGVybXMiLCJ0b2tlbnMiLCJwcmVmaXhRdWVyeSIsInN0YXJ0QXQiLCJlbmRBdCIsImZhbGxiYWNrIiwiYXNEYXRlIiwic2VhcmNoTW9kZSIsInNlYXJjaFF1ZXJ5Iiwic2VhcmNoRmFsbGJhY2siLCJyYXdVcHBlciIsImxvY2FsVmFsdWVzIiwibG9jYWxTbmFwIiwiZmluZCIsImV4aXN0aW5nIiwibWFjaGluZUlkcyIsImN1cnJlbnRNYWNoaW5lSWRzIiwiZG9jU25hcCIsImZldGNoTWFjaGluZU1hcCIsImNodW5rcyIsImJ1aWx0IiwicGFnZUxhc3REb2MiLCJmaWxsZWQiLCJ1c2VkRmFsbGJhY2siLCJzY2FuQmFzZVF1ZXJ5IiwiYmF0Y2hEb2NzIiwiY2xpZW50c1NuYXBzaG90IiwiZmlsdGVyZWRDbGllbnRzIiwibWF0Y2giLCJtYWNoaW5lcyIsIm1hY2hpbmVEb2MiLCJvZW0iLCJtb2RhbGl0eSIsInNlbGVjdGVkQ2xpZW50IiwibWFjaGluZXNTbmFwc2hvdCIsImlzVmFsaWQiLCJtb2RlbFZhbHVlIiwidGltZXN0YW1wIiwidG9EYXRlIiwiZGF5IiwibW9udGgiLCJ5ZWFyIiwiYnVpbGRMb2NhbExvY09iamVjdCIsIm8iLCJmb3JtYXRMb2MiLCJpc1ZhbGlkRmllbGQiLCJnZXRQcmlvcml0eU1hY2hpbmVGaWVsZCIsInRoZU1hY2hpbmUiLCJjdXJyZW50TWFjaGluZSIsImZyb21NYWNoaW5lIiwidXBkYXRlTWFjaGluZUZpZWxkcyIsInBpY2siLCJwcmltYXJ5Il0sIm1hcHBpbmdzIjoiOztRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0Es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QUczWixLQUFLLENBQUMvZSxLQUFOLENBQVksWUFBWixFQUEwQkYsTUFBMUIsQ0FBaUNDLE9BQWpDLENBQWYsQ0FKb0MsQ0FLcEM7O0FBQ0EyNEIsUUFBTSxDQUFDemxCLElBQVAsQ0FBWThMLEtBQVo7QUFDQSxTQUFPcm5CLEtBQUssQ0FBQ0MsSUFBTixDQUFXLElBQUlnRixHQUFKLENBQVErN0IsTUFBUixDQUFYLENBQVA7QUFDRCxDOzs7Ozs7Ozs7OztBQ2xFRCxnRDs7Ozs7Ozs7Ozs7QUNBQSxpRDs7Ozs7Ozs7Ozs7QUNBQSxzRDs7Ozs7Ozs7Ozs7QUNBQSxvRDs7Ozs7Ozs7Ozs7QUNBQSx3Qzs7Ozs7Ozs7Ozs7QUNBQSxrQzs7Ozs7Ozs7Ozs7QUNBQSw0Qzs7Ozs7Ozs7Ozs7QUNBQSxxQyIsImZpbGUiOiJwYWdlcy9OZXdTZWFyY2gvbWFpblNlYXJjaC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0gcmVxdWlyZSgnLi4vLi4vc3NyLW1vZHVsZS1jYWNoZS5qcycpO1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHR2YXIgdGhyZXcgPSB0cnVlO1xuIFx0XHR0cnkge1xuIFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuIFx0XHRcdHRocmV3ID0gZmFsc2U7XG4gXHRcdH0gZmluYWxseSB7XG4gXHRcdFx0aWYodGhyZXcpIGRlbGV0ZSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0fVxuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vcGFnZXMvTmV3U2VhcmNoL21haW5TZWFyY2guanNcIik7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXh0L2Rpc3QvbmV4dC1zZXJ2ZXIvbGliL3JvdXRlci1jb250ZXh0LmpzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5leHQvZGlzdC9uZXh0LXNlcnZlci9saWIvcm91dGVyL3V0aWxzL2dldC1hc3NldC1wYXRoLWZyb20tcm91dGUuanNcIik7IiwiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IE1vZGFsLCBCdXR0b24sIFNwaW5uZXIgfSBmcm9tIFwicmVhY3QtYm9vdHN0cmFwXCI7XG5pbXBvcnQgZmlyZWJhc2UgZnJvbSBcIi4uL2NvbnRleHQvRmlyZWJhc2VcIjtcbmltcG9ydCBzdHlsZXMgZnJvbSBcIi4vV2FyZWhvdXNlTWFwTW9kYWwubW9kdWxlLmNzc1wiO1xuXG5jb25zdCBSRUdJT05fT1JERVIgPSBbXCJFXCIsIFwiRlwiLCBcIkdcIiwgXCJBXCIsIFwiRFwiLCBcIkNcIiwgXCJCXCJdO1xuY29uc3QgTk9fUEFMTEVUID0gXCJOb1BhbGxldFwiO1xuY29uc3QgTEVUVEVSUyA9IEFycmF5LmZyb20oeyBsZW5ndGg6IDI2IH0sIChfLCBpKSA9PlxuICBTdHJpbmcuZnJvbUNoYXJDb2RlKDY1ICsgaSlcbik7XG5jb25zdCBOVU1CRVJTID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogNTAgfSwgKF8sIGkpID0+IGkgKyAxKTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gV2FyZWhvdXNlTWFwTW9kYWwoe1xuICBzaG93ID0gZmFsc2UsXG4gIG9uSGlkZSA9ICgpID0+IHt9LFxuICBvblZpZXcsXG4gIG9uU2VsZWN0aW9uQ2hhbmdlLFxuICBpbml0aWFsU2VsZWN0aW9uID0ge30sXG59KSB7XG4gIGNvbnN0IFtyZWdpb25PcHRpb25zLCBzZXRSZWdpb25PcHRpb25zXSA9IHVzZVN0YXRlKFtdKTtcbiAgY29uc3QgW3NlY3Rpb25NYXAsIHNldFNlY3Rpb25NYXBdID0gdXNlU3RhdGUoe30pO1xuICBjb25zdCBbbWFwU3RlcCwgc2V0TWFwU3RlcF0gPSB1c2VTdGF0ZShcInJlZ2lvbnNcIik7XG4gIGNvbnN0IFttYXBSZWdpb24sIHNldE1hcFJlZ2lvbl0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW21hcFJvdywgc2V0TWFwUm93XSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbbWFwQ29sLCBzZXRNYXBDb2xdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFttYXBQYWxsZXQsIHNldE1hcFBhbGxldF0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW21hcEJpbiwgc2V0TWFwQmluXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbbWFwQ2VsbFBhbGxldHMsIHNldE1hcENlbGxQYWxsZXRzXSA9IHVzZVN0YXRlKHt9KTtcbiAgY29uc3QgW21hcFBhbGxldEJpbnMsIHNldE1hcFBhbGxldEJpbnNdID0gdXNlU3RhdGUoe30pO1xuICBjb25zdCBbbWFwTG9hZGluZywgc2V0TWFwTG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFttYXBFcnJvciwgc2V0TWFwRXJyb3JdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtkaXJlY3RvcnlMb2FkZWQsIHNldERpcmVjdG9yeUxvYWRlZF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IGxhc3RTaG93UmVmID0gdXNlUmVmKGZhbHNlKTtcblxuICBjb25zdCBub3RpZnlTZWxlY3Rpb25DaGFuZ2UgPSB1c2VDYWxsYmFjayhcbiAgICAoc2VsZWN0aW9uKSA9PiB7XG4gICAgICBpZiAodHlwZW9mIG9uU2VsZWN0aW9uQ2hhbmdlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgb25TZWxlY3Rpb25DaGFuZ2Uoc2VsZWN0aW9uKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIFtvblNlbGVjdGlvbkNoYW5nZV1cbiAgKTtcblxuICBjb25zdCBsb2FkRGlyZWN0b3J5ID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xuICAgIGlmIChkaXJlY3RvcnlMb2FkZWQpIHJldHVybjtcbiAgICB0cnkge1xuICAgICAgY29uc3QgZG9jID0gYXdhaXQgZmlyZWJhc2VcbiAgICAgICAgLmZpcmVzdG9yZSgpXG4gICAgICAgIC5jb2xsZWN0aW9uKFwiV2FyZWhvdXNlXCIpXG4gICAgICAgIC5kb2MoXCJkaXJlY3RvcnlcIilcbiAgICAgICAgLmdldCgpO1xuICAgICAgY29uc3QgZGF0YSA9IGRvYy5kYXRhKCkgfHwge307XG4gICAgICBzZXRSZWdpb25PcHRpb25zKGRhdGEuUmVnaW9uIHx8IFtdKTtcbiAgICAgIHNldFNlY3Rpb25NYXAoZGF0YS5TZWN0aW9uIHx8IHt9KTtcbiAgICAgIHNldERpcmVjdG9yeUxvYWRlZCh0cnVlKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byBsb2FkIG1hcCBkaXJlY3RvcnlcIiwgZXJyb3IpO1xuICAgICAgc2V0TWFwRXJyb3IoXCJGYWlsZWQgdG8gbG9hZCB3YXJlaG91c2UgZGlyZWN0b3J5LlwiKTtcbiAgICB9XG4gIH0sIFtkaXJlY3RvcnlMb2FkZWRdKTtcblxuICBjb25zdCBsb2FkUmVnaW9uSW52ZW50b3J5ID0gdXNlQ2FsbGJhY2soYXN5bmMgKHJlZ2lvbklkKSA9PiB7XG4gICAgaWYgKCFyZWdpb25JZCkgcmV0dXJuO1xuICAgIHNldE1hcExvYWRpbmcodHJ1ZSk7XG4gICAgc2V0TWFwRXJyb3IoXCJcIik7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHNuYXAgPSBhd2FpdCBmaXJlYmFzZVxuICAgICAgICAuZmlyZXN0b3JlKClcbiAgICAgICAgLmNvbGxlY3Rpb24oXCJUZXN0XCIpXG4gICAgICAgIC53aGVyZShcIm5ld0xvY2FsQ3VycmVudC5yZWdpb25cIiwgXCI9PVwiLCByZWdpb25JZClcbiAgICAgICAgLmdldCgpO1xuXG4gICAgICBjb25zdCBjZWxsUGFsbGV0cyA9IHt9O1xuICAgICAgY29uc3QgcGFsbGV0QmlucyA9IHt9O1xuICAgICAgc25hcC5mb3JFYWNoKChkb2MpID0+IHtcbiAgICAgICAgY29uc3QgbG9jID0gZG9jLmRhdGEoKT8ubmV3TG9jYWxDdXJyZW50IHx8IHt9O1xuICAgICAgICBsZXQgcm93ID0gbG9jLnNlY3Rpb24/LmxldHRlcjtcbiAgICAgICAgbGV0IGNvbCA9IGxvYy5zZWN0aW9uPy5udW1iZXI7XG4gICAgICAgIGlmICgoIXJvdyB8fCAhY29sKSAmJiB0eXBlb2YgbG9jLnNlY3Rpb24gPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICBjb25zdCB0cmltbWVkID0gbG9jLnNlY3Rpb24udHJpbSgpO1xuICAgICAgICAgIHJvdyA9IHRyaW1tZWQuc2xpY2UoMCwgMSk7XG4gICAgICAgICAgY29sID0gdHJpbW1lZC5zbGljZSgxKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29sICE9PSB1bmRlZmluZWQgJiYgY29sICE9PSBudWxsKSB7XG4gICAgICAgICAgY29sID0gU3RyaW5nKGNvbCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcGFsbGV0ID0gbG9jLnBhbGxldDtcbiAgICAgICAgY29uc3QgYmluID0gbG9jLmJpbjtcbiAgICAgICAgaWYgKCFyb3cgfHwgIWNvbCkgcmV0dXJuO1xuICAgICAgICBjb25zdCBjZWxsS2V5ID0gYCR7cm93fS0ke2NvbH1gO1xuICAgICAgICBjb25zdCBoYXNCaW4gPSBiaW4gIT09IHVuZGVmaW5lZCAmJiBiaW4gIT09IG51bGwgJiYgYCR7YmlufWAgIT09IFwiXCI7XG4gICAgICAgIGNvbnN0IGhhc1BhbGxldCA9XG4gICAgICAgICAgcGFsbGV0ICE9PSB1bmRlZmluZWQgJiYgcGFsbGV0ICE9PSBudWxsICYmIGAke3BhbGxldH1gICE9PSBcIlwiO1xuICAgICAgICBpZiAoIWhhc1BhbGxldCAmJiAhaGFzQmluKSByZXR1cm47XG5cbiAgICAgICAgY29uc3QgcGFsbGV0SWQgPSBoYXNQYWxsZXQgPyBTdHJpbmcocGFsbGV0KSA6IE5PX1BBTExFVDtcbiAgICAgICAgaWYgKCFjZWxsUGFsbGV0c1tjZWxsS2V5XSkgY2VsbFBhbGxldHNbY2VsbEtleV0gPSBuZXcgU2V0KCk7XG4gICAgICAgIGNlbGxQYWxsZXRzW2NlbGxLZXldLmFkZChwYWxsZXRJZCk7XG5cbiAgICAgICAgaWYgKGhhc0Jpbikge1xuICAgICAgICAgIGNvbnN0IHBhbGxldEtleSA9IGAke2NlbGxLZXl9LVAke3BhbGxldElkfWA7XG4gICAgICAgICAgaWYgKCFwYWxsZXRCaW5zW3BhbGxldEtleV0pIHBhbGxldEJpbnNbcGFsbGV0S2V5XSA9IG5ldyBTZXQoKTtcbiAgICAgICAgICBwYWxsZXRCaW5zW3BhbGxldEtleV0uYWRkKFN0cmluZyhiaW4pKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IGNlbGxPYmogPSB7fTtcbiAgICAgIE9iamVjdC5rZXlzKGNlbGxQYWxsZXRzKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgY2VsbE9ialtrZXldID0gQXJyYXkuZnJvbShjZWxsUGFsbGV0c1trZXldKS5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgICAgaWYgKGEgPT09IE5PX1BBTExFVCkgcmV0dXJuIDE7XG4gICAgICAgICAgaWYgKGIgPT09IE5PX1BBTExFVCkgcmV0dXJuIC0xO1xuICAgICAgICAgIGNvbnN0IG5hID0gTnVtYmVyKGEpO1xuICAgICAgICAgIGNvbnN0IG5iID0gTnVtYmVyKGIpO1xuICAgICAgICAgIGlmIChOdW1iZXIuaXNGaW5pdGUobmEpICYmIE51bWJlci5pc0Zpbml0ZShuYikpIHJldHVybiBuYSAtIG5iO1xuICAgICAgICAgIHJldHVybiBTdHJpbmcoYSkubG9jYWxlQ29tcGFyZShTdHJpbmcoYikpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBwYWxsZXRPYmogPSB7fTtcbiAgICAgIE9iamVjdC5rZXlzKHBhbGxldEJpbnMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICBwYWxsZXRPYmpba2V5XSA9IEFycmF5LmZyb20ocGFsbGV0Qmluc1trZXldKS5zb3J0KFxuICAgICAgICAgIChhLCBiKSA9PiBOdW1iZXIoYSkgLSBOdW1iZXIoYilcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuXG4gICAgICBzZXRNYXBDZWxsUGFsbGV0cyhjZWxsT2JqKTtcbiAgICAgIHNldE1hcFBhbGxldEJpbnMocGFsbGV0T2JqKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byBsb2FkIG1hcCBpbnZlbnRvcnlcIiwgZXJyb3IpO1xuICAgICAgc2V0TWFwRXJyb3IoXCJGYWlsZWQgdG8gbG9hZCBtYXAgaW52ZW50b3J5LlwiKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0TWFwTG9hZGluZyhmYWxzZSk7XG4gICAgfVxuICB9LCBbXSk7XG5cbiAgY29uc3QgZ2V0UmVnaW9uRGltZW5zaW9ucyA9IHVzZUNhbGxiYWNrKFxuICAgIChyZWdpb25JZCkgPT4ge1xuICAgICAgY29uc3QgZW50cnkgPSBzZWN0aW9uTWFwPy5bcmVnaW9uSWRdO1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZW50cnkpICYmIGVudHJ5Lmxlbmd0aCA+PSAyKSB7XG4gICAgICAgIGNvbnN0IGNvbHMgPSBwYXJzZUludChlbnRyeVswXSwgMTApO1xuICAgICAgICBjb25zdCByb3dzID0gcGFyc2VJbnQoZW50cnlbMV0sIDEwKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBjb2xzOiBOdW1iZXIuaXNGaW5pdGUoY29scykgPyBjb2xzIDogMCxcbiAgICAgICAgICByb3dzOiBOdW1iZXIuaXNGaW5pdGUocm93cykgPyByb3dzIDogMCxcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB7IGNvbHM6IDAsIHJvd3M6IDAgfTtcbiAgICB9LFxuICAgIFtzZWN0aW9uTWFwXVxuICApO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3Qgd2FzT3BlbiA9IGxhc3RTaG93UmVmLmN1cnJlbnQ7XG4gICAgbGFzdFNob3dSZWYuY3VycmVudCA9IHNob3c7XG4gICAgaWYgKCFzaG93IHx8IHdhc09wZW4pIHJldHVybjtcblxuICAgIGxvYWREaXJlY3RvcnkoKTtcbiAgICBzZXRNYXBFcnJvcihcIlwiKTtcbiAgICBjb25zdCB7XG4gICAgICByZWdpb24sXG4gICAgICBzZWN0aW9uTGV0dGVyLFxuICAgICAgc2VjdGlvbk51bWJlcixcbiAgICAgIHBhbGxldCxcbiAgICAgIGJpbixcbiAgICB9ID0gaW5pdGlhbFNlbGVjdGlvbiB8fCB7fTtcblxuICAgIHNldE1hcFJlZ2lvbihyZWdpb24gfHwgXCJcIik7XG4gICAgc2V0TWFwUm93KHNlY3Rpb25MZXR0ZXIgfHwgXCJcIik7XG4gICAgc2V0TWFwQ29sKHNlY3Rpb25OdW1iZXIgPyBTdHJpbmcoc2VjdGlvbk51bWJlcikgOiBcIlwiKTtcbiAgICBzZXRNYXBQYWxsZXQocGFsbGV0ID8gU3RyaW5nKHBhbGxldCkgOiBcIlwiKTtcbiAgICBzZXRNYXBCaW4oYmluID8gU3RyaW5nKGJpbikgOiBcIlwiKTtcbiAgICBzZXRNYXBTdGVwKHJlZ2lvbiA/IFwiZ3JpZFwiIDogXCJyZWdpb25zXCIpO1xuICAgIGlmIChyZWdpb24pIGxvYWRSZWdpb25JbnZlbnRvcnkocmVnaW9uKTtcbiAgfSwgW3Nob3csIGluaXRpYWxTZWxlY3Rpb24sIGxvYWREaXJlY3RvcnksIGxvYWRSZWdpb25JbnZlbnRvcnldKTtcblxuICBjb25zdCBoYW5kbGVTZWxlY3RSZWdpb24gPSAocmVnaW9uSWQpID0+IHtcbiAgICBjb25zdCBzZWxlY3Rpb24gPSB7XG4gICAgICByZWdpb246IHJlZ2lvbklkLFxuICAgICAgc2VjdGlvbkxldHRlcjogXCJcIixcbiAgICAgIHNlY3Rpb25OdW1iZXI6IFwiXCIsXG4gICAgICBwYWxsZXQ6IFwiXCIsXG4gICAgICBiaW46IFwiXCIsXG4gICAgfTtcbiAgICBzZXRNYXBSZWdpb24ocmVnaW9uSWQpO1xuICAgIHNldE1hcFJvdyhcIlwiKTtcbiAgICBzZXRNYXBDb2woXCJcIik7XG4gICAgc2V0TWFwUGFsbGV0KFwiXCIpO1xuICAgIHNldE1hcEJpbihcIlwiKTtcbiAgICBzZXRNYXBTdGVwKFwiZ3JpZFwiKTtcbiAgICBub3RpZnlTZWxlY3Rpb25DaGFuZ2Uoc2VsZWN0aW9uKTtcbiAgICBsb2FkUmVnaW9uSW52ZW50b3J5KHJlZ2lvbklkKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVTZWxlY3RDZWxsID0gKHJvd0xldHRlciwgY29sTnVtYmVyKSA9PiB7XG4gICAgY29uc3QgY29sVmFsdWUgPSBTdHJpbmcoY29sTnVtYmVyKTtcbiAgICBjb25zdCBzZWxlY3Rpb24gPSB7XG4gICAgICByZWdpb246IG1hcFJlZ2lvbixcbiAgICAgIHNlY3Rpb25MZXR0ZXI6IHJvd0xldHRlcixcbiAgICAgIHNlY3Rpb25OdW1iZXI6IGNvbFZhbHVlLFxuICAgICAgcGFsbGV0OiBcIlwiLFxuICAgICAgYmluOiBcIlwiLFxuICAgIH07XG4gICAgc2V0TWFwUm93KHJvd0xldHRlcik7XG4gICAgc2V0TWFwQ29sKGNvbFZhbHVlKTtcbiAgICBzZXRNYXBQYWxsZXQoXCJcIik7XG4gICAgc2V0TWFwQmluKFwiXCIpO1xuICAgIHNldE1hcFN0ZXAoXCJwYWxsZXRzXCIpO1xuICAgIG5vdGlmeVNlbGVjdGlvbkNoYW5nZShzZWxlY3Rpb24pO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVNlbGVjdFBhbGxldCA9IChwYWxsZXRJZCkgPT4ge1xuICAgIGNvbnN0IHBhbGxldFZhbHVlID0gU3RyaW5nKHBhbGxldElkKTtcbiAgICBjb25zdCBub3JtYWxpemVkUGFsbGV0ID0gcGFsbGV0VmFsdWUgPT09IE5PX1BBTExFVCA/IFwiXCIgOiBwYWxsZXRWYWx1ZTtcbiAgICBjb25zdCBzZWxlY3Rpb24gPSB7XG4gICAgICByZWdpb246IG1hcFJlZ2lvbixcbiAgICAgIHNlY3Rpb25MZXR0ZXI6IG1hcFJvdyxcbiAgICAgIHNlY3Rpb25OdW1iZXI6IG1hcENvbCxcbiAgICAgIHBhbGxldDogbm9ybWFsaXplZFBhbGxldCxcbiAgICAgIGJpbjogXCJcIixcbiAgICB9O1xuICAgIHNldE1hcFBhbGxldChwYWxsZXRWYWx1ZSk7XG4gICAgc2V0TWFwQmluKFwiXCIpO1xuICAgIHNldE1hcFN0ZXAoXCJiaW5zXCIpO1xuICAgIG5vdGlmeVNlbGVjdGlvbkNoYW5nZShzZWxlY3Rpb24pO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVNlbGVjdEJpbiA9IChiaW5JZCkgPT4ge1xuICAgIGNvbnN0IGJpblZhbHVlID0gU3RyaW5nKGJpbklkKTtcbiAgICBjb25zdCBub3JtYWxpemVkUGFsbGV0ID0gbWFwUGFsbGV0ID09PSBOT19QQUxMRVQgPyBcIlwiIDogbWFwUGFsbGV0O1xuICAgIGNvbnN0IHNlbGVjdGlvbiA9IHtcbiAgICAgIHJlZ2lvbjogbWFwUmVnaW9uLFxuICAgICAgc2VjdGlvbkxldHRlcjogbWFwUm93LFxuICAgICAgc2VjdGlvbk51bWJlcjogbWFwQ29sLFxuICAgICAgcGFsbGV0OiBub3JtYWxpemVkUGFsbGV0LFxuICAgICAgYmluOiBiaW5WYWx1ZSxcbiAgICB9O1xuICAgIHNldE1hcEJpbihiaW5WYWx1ZSk7XG4gICAgbm90aWZ5U2VsZWN0aW9uQ2hhbmdlKHNlbGVjdGlvbik7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlQmFjayA9ICgpID0+IHtcbiAgICBpZiAobWFwU3RlcCA9PT0gXCJiaW5zXCIpIHNldE1hcFN0ZXAoXCJwYWxsZXRzXCIpO1xuICAgIGVsc2UgaWYgKG1hcFN0ZXAgPT09IFwicGFsbGV0c1wiKSBzZXRNYXBTdGVwKFwiZ3JpZFwiKTtcbiAgICBlbHNlIGlmIChtYXBTdGVwID09PSBcImdyaWRcIikgc2V0TWFwU3RlcChcInJlZ2lvbnNcIik7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlVmlldyA9ICgpID0+IHtcbiAgICBpZiAodHlwZW9mIG9uVmlldyAhPT0gXCJmdW5jdGlvblwiKSByZXR1cm47XG4gICAgY29uc3Qgbm9ybWFsaXplZFBhbGxldCA9IG1hcFBhbGxldCA9PT0gTk9fUEFMTEVUID8gXCJcIiA6IG1hcFBhbGxldDtcbiAgICBvblZpZXcoe1xuICAgICAgcmVnaW9uOiBtYXBSZWdpb24sXG4gICAgICBzZWN0aW9uTGV0dGVyOiBtYXBSb3csXG4gICAgICBzZWN0aW9uTnVtYmVyOiBtYXBDb2wsXG4gICAgICBwYWxsZXQ6IG5vcm1hbGl6ZWRQYWxsZXQsXG4gICAgICBiaW46IG1hcEJpbixcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxNb2RhbCBzaG93PXtzaG93fSBvbkhpZGU9e29uSGlkZX0gY2VudGVyZWQgc2l6ZT1cImxnXCI+XG4gICAgICA8TW9kYWwuSGVhZGVyIGNsb3NlQnV0dG9uPlxuICAgICAgICA8TW9kYWwuVGl0bGU+V2FyZWhvdXNlIE1hcDwvTW9kYWwuVGl0bGU+XG4gICAgICA8L01vZGFsLkhlYWRlcj5cbiAgICAgIDxNb2RhbC5Cb2R5PlxuICAgICAgICB7bWFwTG9hZGluZyAmJiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5tYXBMb2FkaW5nfT5cbiAgICAgICAgICAgIDxTcGlubmVyIGFuaW1hdGlvbj1cImJvcmRlclwiIC8+XG4gICAgICAgICAgICA8c3Bhbj5Mb2FkaW5nIG1hcCBkYXRhLi4uPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuICAgICAgICB7bWFwRXJyb3IgJiYgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5tYXBFcnJvcn0+e21hcEVycm9yfTwvZGl2Pn1cblxuICAgICAgICB7IW1hcExvYWRpbmcgJiYgbWFwU3RlcCA9PT0gXCJyZWdpb25zXCIgJiYgKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubWFwU3RhZ2V9PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5tYXBIaW50fT5TZWxlY3QgYSByZWdpb248L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubWFwQ2FudmFzfT5cbiAgICAgICAgICAgICAge1JFR0lPTl9PUkRFUi5tYXAoKHJlZ2lvbklkKSA9PiAoXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAga2V5PXtyZWdpb25JZH1cbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgJHtzdHlsZXMucmVnaW9uQmxvY2t9ICR7c3R5bGVzW2ByZWdpb24ke3JlZ2lvbklkfWBdfWB9XG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVTZWxlY3RSZWdpb24ocmVnaW9uSWQpfVxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e1xuICAgICAgICAgICAgICAgICAgICBBcnJheS5pc0FycmF5KHJlZ2lvbk9wdGlvbnMpICYmXG4gICAgICAgICAgICAgICAgICAgIHJlZ2lvbk9wdGlvbnMubGVuZ3RoID4gMCAmJlxuICAgICAgICAgICAgICAgICAgICAhcmVnaW9uT3B0aW9ucy5pbmNsdWRlcyhyZWdpb25JZClcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICB7cmVnaW9uSWR9XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9XG5cbiAgICAgICAgeyFtYXBMb2FkaW5nICYmIG1hcFN0ZXAgPT09IFwiZ3JpZFwiICYmIChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLm1hcFN0YWdlfT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubWFwSGludH0+XG4gICAgICAgICAgICAgIFJlZ2lvbiB7bWFwUmVnaW9ufTogY2hvb3NlIGEgcm93IGFuZCBjb2x1bW5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgeygoKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGRpbXMgPSBnZXRSZWdpb25EaW1lbnNpb25zKG1hcFJlZ2lvbik7XG4gICAgICAgICAgICAgIGNvbnN0IHJvd3MgPSBMRVRURVJTLnNsaWNlKDAsIGRpbXMucm93cyB8fCAwKS5yZXZlcnNlKCk7XG4gICAgICAgICAgICAgIGNvbnN0IGNvbHMgPSBOVU1CRVJTLnNsaWNlKDAsIGRpbXMuY29scyB8fCAwKTtcbiAgICAgICAgICAgICAgaWYgKCFyb3dzLmxlbmd0aCB8fCAhY29scy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzZWN0aW9uS2V5cyA9IE9iamVjdC5rZXlzKG1hcENlbGxQYWxsZXRzIHx8IHt9KVxuICAgICAgICAgICAgICAgICAgLmZpbHRlcihCb29sZWFuKVxuICAgICAgICAgICAgICAgICAgLm1hcCgoa2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IFtyb3csIGNvbF0gPSBrZXkuc3BsaXQoXCItXCIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBrZXksIHJvdywgY29sIH07XG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGEucm93ID09PSBiLnJvdykge1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBOdW1iZXIoYS5jb2wpIC0gTnVtYmVyKGIuY29sKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYi5yb3cubG9jYWxlQ29tcGFyZShhLnJvdyk7XG4gICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGlmICghc2VjdGlvbktleXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLm1hcEVtcHR5fT5cbiAgICAgICAgICAgICAgICAgICAgICBObyBncmlkIGRhdGEgZm9yIHRoaXMgcmVnaW9uLlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuZ3JpZFdyYXBwZXJ9PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLm1hcEhpbnR9PlxuICAgICAgICAgICAgICAgICAgICAgIEdyaWQgbm90IGF2YWlsYWJsZS4gU2VsZWN0IGFuIGF2YWlsYWJsZSBzZWN0aW9uIGJlbG93LlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5wYWxsZXRHcmlkfT5cbiAgICAgICAgICAgICAgICAgICAgICB7c2VjdGlvbktleXMubWFwKCh7IGtleSwgcm93LCBjb2wgfSkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17c3R5bGVzLnBhbGxldEJ1dHRvbn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlU2VsZWN0Q2VsbChyb3csIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtyb3d9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtjb2x9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5ncmlkV3JhcHBlcn0+XG4gICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17c3R5bGVzLmdyaWR9XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IFwiLS1ncmlkLWNvbHNcIjogY29scy5sZW5ndGggfX1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAge3Jvd3MubWFwKChyb3cpID0+XG4gICAgICAgICAgICAgICAgICAgICAgY29scy5tYXAoKGNvbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2VsbEtleSA9IGAke3Jvd30tJHtjb2x9YDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGhhc1BhbGxldHMgPSBCb29sZWFuKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBtYXBDZWxsUGFsbGV0c1tjZWxsS2V5XT8ubGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17Y2VsbEtleX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2Ake3N0eWxlcy5ncmlkQ2VsbH0gJHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc1BhbGxldHMgPyBcIlwiIDogc3R5bGVzLmdyaWRDZWxsRGlzYWJsZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzUGFsbGV0cyAmJiBoYW5kbGVTZWxlY3RDZWxsKHJvdywgY29sKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17IWhhc1BhbGxldHN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtyb3d9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Y29sfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pKCl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9XG5cbiAgICAgICAgeyFtYXBMb2FkaW5nICYmIG1hcFN0ZXAgPT09IFwicGFsbGV0c1wiICYmIChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLm1hcFN0YWdlfT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubWFwSGludH0+XG4gICAgICAgICAgICAgIFJlZ2lvbiB7bWFwUmVnaW9ufSAtIFNlY3Rpb24ge21hcFJvd31cbiAgICAgICAgICAgICAge21hcENvbH06IHNlbGVjdCBhIHBhbGxldFxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnBhbGxldEdyaWR9PlxuICAgICAgICAgICAgICB7KG1hcENlbGxQYWxsZXRzW2Ake21hcFJvd30tJHttYXBDb2x9YF0gfHwgW10pLm1hcCgocGFsbGV0KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcGFsbGV0S2V5ID0gYCR7bWFwUm93fS0ke21hcENvbH0tUCR7cGFsbGV0fWA7XG4gICAgICAgICAgICAgICAgY29uc3QgYmlucyA9IG1hcFBhbGxldEJpbnNbcGFsbGV0S2V5XSB8fCBbXTtcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBrZXk9e3BhbGxldH1cbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17c3R5bGVzLnBhbGxldEJ1dHRvbn1cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChiaW5zLmxlbmd0aCA9PT0gMCAmJiB0eXBlb2Ygb25WaWV3ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNlbGVjdGlvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmVnaW9uOiBtYXBSZWdpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNlY3Rpb25MZXR0ZXI6IG1hcFJvdyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2VjdGlvbk51bWJlcjogbWFwQ29sLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBwYWxsZXQ6IHBhbGxldCA9PT0gTk9fUEFMTEVUID8gXCJcIiA6IFN0cmluZyhwYWxsZXQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBiaW46IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgbm90aWZ5U2VsZWN0aW9uQ2hhbmdlKHNlbGVjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBvblZpZXcoc2VsZWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgaGFuZGxlU2VsZWN0UGFsbGV0KHBhbGxldCk7XG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHtwYWxsZXQgPT09IE5PX1BBTExFVCA/IFwiTm8gUGFsbGV0XCIgOiBgUGFsbGV0ICR7cGFsbGV0fWB9XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgeyEobWFwQ2VsbFBhbGxldHNbYCR7bWFwUm93fS0ke21hcENvbH1gXSB8fCBbXSkubGVuZ3RoICYmIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLm1hcEVtcHR5fT5cbiAgICAgICAgICAgICAgICAgIE5vIHBhbGxldHMgYXZhaWxhYmxlIGhlcmUuXG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cblxuICAgICAgICB7IW1hcExvYWRpbmcgJiYgbWFwU3RlcCA9PT0gXCJiaW5zXCIgJiYgKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubWFwU3RhZ2V9PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5tYXBIaW50fT5cbiAgICAgICAgICAgICAgUmVnaW9uIHttYXBSZWdpb259IC0gU2VjdGlvbiB7bWFwUm93fVxuICAgICAgICAgICAgICB7bWFwQ29sfSAtIFBhbGxldCB7bWFwUGFsbGV0fVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnBhbGxldEdyaWR9PlxuICAgICAgICAgICAgICB7KG1hcFBhbGxldEJpbnNbYCR7bWFwUm93fS0ke21hcENvbH0tUCR7bWFwUGFsbGV0fWBdIHx8IFtdKS5tYXAoXG4gICAgICAgICAgICAgICAgKGJpbikgPT4gKFxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBrZXk9e2Jpbn1cbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YCR7c3R5bGVzLnBhbGxldEJ1dHRvbn0gJHtzdHlsZXMuYmluQnV0dG9ufWB9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZVNlbGVjdEJpbihiaW4pfVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICBCaW4ge2Jpbn1cbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgeyEobWFwUGFsbGV0Qmluc1tgJHttYXBSb3d9LSR7bWFwQ29sfS1QJHttYXBQYWxsZXR9YF0gfHwgW10pXG4gICAgICAgICAgICAgICAgLmxlbmd0aCAmJiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5tYXBFbXB0eX0+XG4gICAgICAgICAgICAgICAgICBObyBiaW5zIGF2YWlsYWJsZSBvbiB0aGlzIHBhbGxldC5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuICAgICAgPC9Nb2RhbC5Cb2R5PlxuICAgICAgPE1vZGFsLkZvb3RlciBjbGFzc05hbWU9e3N0eWxlcy5tYXBGb290ZXJ9PlxuICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgdmFyaWFudD1cIm91dGxpbmUtc2Vjb25kYXJ5XCJcbiAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVCYWNrfVxuICAgICAgICAgIGRpc2FibGVkPXttYXBTdGVwID09PSBcInJlZ2lvbnNcIn1cbiAgICAgICAgPlxuICAgICAgICAgIEJhY2tcbiAgICAgICAgPC9CdXR0b24+XG4gICAgICAgIDxCdXR0b24gdmFyaWFudD1cIm91dGxpbmUtcHJpbWFyeVwiIG9uQ2xpY2s9e2hhbmRsZVZpZXd9PlxuICAgICAgICAgIFZpZXdcbiAgICAgICAgPC9CdXR0b24+XG4gICAgICAgIDxCdXR0b24gdmFyaWFudD1cInNlY29uZGFyeVwiIG9uQ2xpY2s9e29uSGlkZX0+XG4gICAgICAgICAgQ2xvc2VcbiAgICAgICAgPC9CdXR0b24+XG4gICAgICA8L01vZGFsLkZvb3Rlcj5cbiAgICA8L01vZGFsPlxuICApO1xufVxuIiwiLy8gRXhwb3J0c1xubW9kdWxlLmV4cG9ydHMgPSB7XG5cdFwibWFwTG9hZGluZ1wiOiBcIldhcmVob3VzZU1hcE1vZGFsX21hcExvYWRpbmdfX1RjaF90XCIsXG5cdFwibWFwRXJyb3JcIjogXCJXYXJlaG91c2VNYXBNb2RhbF9tYXBFcnJvcl9fMUJjV2lcIixcblx0XCJtYXBTdGFnZVwiOiBcIldhcmVob3VzZU1hcE1vZGFsX21hcFN0YWdlX18xa3dnOVwiLFxuXHRcIm1hcEhpbnRcIjogXCJXYXJlaG91c2VNYXBNb2RhbF9tYXBIaW50X19xM3VRY1wiLFxuXHRcIm1hcENhbnZhc1wiOiBcIldhcmVob3VzZU1hcE1vZGFsX21hcENhbnZhc19fc1hmdjdcIixcblx0XCJyZWdpb25CbG9ja1wiOiBcIldhcmVob3VzZU1hcE1vZGFsX3JlZ2lvbkJsb2NrX18xWFVsTVwiLFxuXHRcInJlZ2lvbkVcIjogXCJXYXJlaG91c2VNYXBNb2RhbF9yZWdpb25FX18xdVZBdlwiLFxuXHRcInJlZ2lvbkZcIjogXCJXYXJlaG91c2VNYXBNb2RhbF9yZWdpb25GX18yR2hjc1wiLFxuXHRcInJlZ2lvbkdcIjogXCJXYXJlaG91c2VNYXBNb2RhbF9yZWdpb25HX18ySVRvcVwiLFxuXHRcInJlZ2lvbkFcIjogXCJXYXJlaG91c2VNYXBNb2RhbF9yZWdpb25BX18zUG4wWlwiLFxuXHRcInJlZ2lvbkRcIjogXCJXYXJlaG91c2VNYXBNb2RhbF9yZWdpb25EX19JY3lDb1wiLFxuXHRcInJlZ2lvbkNcIjogXCJXYXJlaG91c2VNYXBNb2RhbF9yZWdpb25DX18zbE5xMlwiLFxuXHRcInJlZ2lvbkJcIjogXCJXYXJlaG91c2VNYXBNb2RhbF9yZWdpb25CX18zQnl3X1wiLFxuXHRcImdyaWRXcmFwcGVyXCI6IFwiV2FyZWhvdXNlTWFwTW9kYWxfZ3JpZFdyYXBwZXJfXzF0M3dOXCIsXG5cdFwiZ3JpZFwiOiBcIldhcmVob3VzZU1hcE1vZGFsX2dyaWRfXzFCQzl4XCIsXG5cdFwiZ3JpZENlbGxcIjogXCJXYXJlaG91c2VNYXBNb2RhbF9ncmlkQ2VsbF9fMURTMlZcIixcblx0XCJncmlkQ2VsbERpc2FibGVkXCI6IFwiV2FyZWhvdXNlTWFwTW9kYWxfZ3JpZENlbGxEaXNhYmxlZF9fMW41NENcIixcblx0XCJwYWxsZXRHcmlkXCI6IFwiV2FyZWhvdXNlTWFwTW9kYWxfcGFsbGV0R3JpZF9fMjhlTUxcIixcblx0XCJwYWxsZXRCdXR0b25cIjogXCJXYXJlaG91c2VNYXBNb2RhbF9wYWxsZXRCdXR0b25fX051TW4wXCIsXG5cdFwiYmluQnV0dG9uXCI6IFwiV2FyZWhvdXNlTWFwTW9kYWxfYmluQnV0dG9uX18yOHluQlwiLFxuXHRcIm1hcEVtcHR5XCI6IFwiV2FyZWhvdXNlTWFwTW9kYWxfbWFwRW1wdHlfXzJoaVVpXCIsXG5cdFwibWFwRm9vdGVyXCI6IFwiV2FyZWhvdXNlTWFwTW9kYWxfbWFwRm9vdGVyX18xbzBSaVwiXG59O1xuIiwiaW1wb3J0IHsgY3JlYXRlQ29udGV4dCwgdXNlQ29udGV4dCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHVzZUZpcmViYXNlQXV0aCBmcm9tIFwiLi91c2VGaXJlYmFzZUF1dGhcIjtcblxuY29uc3QgYXV0aFVzZXJDb250ZXh0ID0gY3JlYXRlQ29udGV4dCh7XG4gIGF1dGhVc2VyOiBudWxsLFxuICBsb2FkaW5nOiB0cnVlLFxuICBzaWduSW5XaXRoR29vZ2xlOiBhc3luYyAoKSA9PiB7fSxcbiAgc2lnbk91dDogYXN5bmMgKCkgPT4ge30sXG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIEF1dGhVc2VyUHJvdmlkZXIoeyBjaGlsZHJlbiB9KSB7XG4gIGNvbnN0IGF1dGggPSB1c2VGaXJlYmFzZUF1dGgoKTtcbiAgcmV0dXJuIChcbiAgICA8YXV0aFVzZXJDb250ZXh0LlByb3ZpZGVyIHZhbHVlPXthdXRofT57Y2hpbGRyZW59PC9hdXRoVXNlckNvbnRleHQuUHJvdmlkZXI+XG4gICk7XG59XG5cbmV4cG9ydCBjb25zdCB1c2VBdXRoID0gKCkgPT4gdXNlQ29udGV4dChhdXRoVXNlckNvbnRleHQpO1xuIiwiLy8gLy8gaW1wb3J0IGZpcmViYXNlIGZyb20gXCJmaXJlYmFzZS9hcHBcIlxuLy8gaW1wb3J0ICogYXMgZmlyZWJhc2UgZnJvbSBcImZpcmViYXNlL2FwcFwiO1xuLy8gLy8gaW1wb3J0IFwiZmlyZWJhc2UvYXV0aFwiXG5cbi8vIGNvbnN0IGFwcCA9IGZpcmViYXNlLmluaXRpYWxpemVBcHAoe1xuLy8gICAgIGFwaUtleTogXCJBSXphU3lDeEMtYThiNVZoaGV5OEdGNDdMcFhaMWFNS1ltaUlod0VcIixcbi8vICAgICBhdXRoRG9tYWluOiBcIm1hZ21vLWFjMTBjLmZpcmViYXNlYXBwLmNvbVwiLFxuLy8gICAgIHByb2plY3RJZDogXCJtYWdtby1hYzEwY1wiLFxuLy8gICAgIHN0b3JhZ2VCdWNrZXQ6IFwibWFnbW8tYWMxMGMuYXBwc3BvdC5jb21cIixcbi8vICAgICBtZXNzYWdpbmdTZW5kZXJJZDogXCIxNzc4NTc1MjUxNDdcIixcbi8vICAgICBhcHBJZDogXCIxOjE3Nzg1NzUyNTE0Nzp3ZWI6YWM4ZTNjODdkODIzOTZiZWIxZGQzZVwiLFxuLy8gICAgIG1lYXN1cmVtZW50SWQ6IFwiRy1MMDIzNkpUNU4zXCJcbi8vIH0pXG5cbi8vIGV4cG9ydCBjb25zdCBhdXRoID0gYXBwLmF1dGgoKVxuLy8gZXhwb3J0IGRlZmF1bHQgYXBwXG5cbi8vIGFwaUtleTogcHJvY2Vzcy5lbnYuUkVBQ1RfQVBQX0ZJUkVCQVNFX0tFWSxcbi8vICAgICBhdXRoRG9tYWluOiBwcm9jZXNzLmVudi5SRUFDVF9BUFBfRklSRUJBU0VfQVVUSF9ET01BSU4sXG4vLyAgICAgcHJvamVjdElkOiBwcm9jZXNzLmVudi5SRUFDVF9BUFBfRklSRUJBU0VfUFJPSkVDVF9JRCxcbi8vICAgICBzdG9yYWdlQnVja2V0OiBwcm9jZXNzLmVudi5SRUFDVF9BUFBfRklSRUJBU0VfU1RPUkFHRV9CVUNLRVQsXG4vLyAgICAgbWVzc2FnaW5nU2VuZGVySWQ6IHByb2Nlc3MuZW52LlJFQUNUX0FQUF9GSVJFQkFTRV9NRVNTQUdJTkdfU0VOREVSX0lELFxuLy8gICAgIGFwcElkOiBwcm9jZXNzLmVudi5SRUFDVF9BUFBfRklSRUJBU0VfQVBQX0lELFxuLy8gICAgIG1lYXN1cmVtZW50SWQ6IHByb2Nlc3MuZW52LlJFQUNUX0FQUF9GSVJFQkFTRV9NRUFTVVJFTUVOVF9JRFxuXG5pbXBvcnQgRmlyZWJhc2UgZnJvbSBcImZpcmViYXNlL2NvbXBhdC9hcHBcIjtcbmltcG9ydCBcImZpcmViYXNlL2NvbXBhdC9hdXRoXCI7XG5pbXBvcnQgXCJmaXJlYmFzZS9jb21wYXQvZmlyZXN0b3JlXCI7XG5pbXBvcnQgXCJmaXJlYmFzZS9jb21wYXQvc3RvcmFnZVwiO1xuXG5jb25zdCBGaXJlYmFzZUNyZWRlbnRpYWxzID0ge1xuICBhcGlLZXk6IFwiQUl6YVN5Q3hDLWE4YjVWaGhleThHRjQ3THBYWjFhTUtZbWlJaHdFXCIsXG4gIGF1dGhEb21haW46IFwibWFnbW8tYWMxMGMuZmlyZWJhc2VhcHAuY29tXCIsXG4gIHByb2plY3RJZDogXCJtYWdtby1hYzEwY1wiLFxuICBzdG9yYWdlQnVja2V0OiBcIm1hZ21vLWFjMTBjLmFwcHNwb3QuY29tXCIsXG4gIG1lc3NhZ2luZ1NlbmRlcklkOiBcIjE3Nzg1NzUyNTE0N1wiLFxuICBhcHBJZDogXCIxOjE3Nzg1NzUyNTE0Nzp3ZWI6YWM4ZTNjODdkODIzOTZiZWIxZGQzZVwiLFxuICBtZWFzdXJlbWVudElkOiBcIkctTDAyMzZKVDVOM1wiLFxufTtcbi8vIGlmIGEgRmlyZWJhc2UgaW5zdGFuY2UgZG9lc24ndCBleGlzdCwgY3JlYXRlIG9uZVxuaWYgKCFGaXJlYmFzZS5hcHBzLmxlbmd0aCkge1xuICBGaXJlYmFzZS5pbml0aWFsaXplQXBwKEZpcmViYXNlQ3JlZGVudGlhbHMpO1xufVxuXG4vLyBTb21lIG5ldHdvcmtzL3Byb3hpZXMgYmxvY2sgRmlyZXN0b3JlJ3Mgc3RyZWFtaW5nIHRyYW5zcG9ydC5cbi8vIEZvcmNlIGxvbmcgcG9sbGluZyBpbiB0aGUgYnJvd3NlciB0byBhdm9pZCBzdGFsbGVkIHdyaXRlcy9saXN0ZW5zLlxuaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgdHJ5IHtcbiAgICBGaXJlYmFzZS5maXJlc3RvcmUoKS5zZXR0aW5ncyh7IGV4cGVyaW1lbnRhbEZvcmNlTG9uZ1BvbGxpbmc6IHRydWUgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgLy8gSWdub3JlIGlmIEZpcmVzdG9yZSBoYXMgYWxyZWFkeSBiZWVuIGluaXRpYWxpemVkIHdpdGggc2V0dGluZ3MuXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGF1dGggPSBGaXJlYmFzZS5hdXRoKCk7XG5leHBvcnQgZGVmYXVsdCBGaXJlYmFzZTtcblxuLy8gaW1wb3J0IHsgaW5pdGlhbGl6ZUFwcCB9IGZyb20gJ2ZpcmViYXNlL2FwcCc7XG4vLyBpbXBvcnQgeyBnZXRGaXJlc3RvcmUsIGNvbGxlY3Rpb24sIGdldERvY3MgfSBmcm9tICdmaXJlYmFzZS9maXJlc3RvcmUnO1xuXG4vLyBjb25zdCBhcHAgPSBpbml0aWFsaXplQXBwKGZpcmViYXNlQ29uZmlnKTtcbi8vIGNvbnN0IGRiID0gZ2V0RmlyZXN0b3JlKGFwcCk7XG5cbi8vIGV4cG9ydCBkZWZhdWx0IGFwcDtcbiIsImltcG9ydCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBGaXJlYmFzZSwgeyBhdXRoIH0gZnJvbSBcIi4vRmlyZWJhc2VcIjtcblxuY29uc3QgZm9ybWF0QXV0aFVzZXIgPSAodXNlcikgPT4gKHtcbiAgdWlkOiB1c2VyLnVpZCxcbiAgZW1haWw6IHVzZXIuZW1haWwsXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdXNlRmlyZWJhc2VBdXRoKCkge1xuICBjb25zdCBbYXV0aFVzZXIsIHNldEF1dGhVc2VyXSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcblxuICBjb25zdCBhdXRoU3RhdGVDaGFuZ2VkID0gYXN5bmMgKGF1dGhTdGF0ZSkgPT4ge1xuICAgIGlmICghYXV0aFN0YXRlKSB7XG4gICAgICBzZXRBdXRoVXNlcihudWxsKTtcbiAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHNldExvYWRpbmcodHJ1ZSk7XG4gICAgY29uc3QgZm9ybWF0dGVkVXNlciA9IGZvcm1hdEF1dGhVc2VyKGF1dGhTdGF0ZSk7XG4gICAgc2V0QXV0aFVzZXIoZm9ybWF0dGVkVXNlcik7XG4gICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gIH07XG5cbiAgY29uc3QgY2xlYXIgPSAoKSA9PiB7XG4gICAgc2V0QXV0aFVzZXIobnVsbCk7XG4gICAgc2V0TG9hZGluZyh0cnVlKTtcbiAgfTtcblxuICAvL3NpZ24gaW4gd2l0aCBnb29nbGVcbiAgY29uc3Qgc2lnbkluV2l0aEdvb2dsZSA9ICgpID0+IHtcbiAgICBjb25zdCBwcm92aWRlciA9IG5ldyBGaXJlYmFzZS5hdXRoLkdvb2dsZUF1dGhQcm92aWRlcigpO1xuICAgIHByb3ZpZGVyLnNldEN1c3RvbVBhcmFtZXRlcnMoeyBwcm9tcHQ6IFwic2VsZWN0X2FjY291bnRcIiB9KTtcblxuICAgIHJldHVybiBhdXRoLnNpZ25JbldpdGhSZWRpcmVjdChwcm92aWRlcikuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiR29vZ2xlIFNpZ24tSW4gRXJyb3I6XCIsIGVycm9yKTtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IHNpZ25PdXQgPSAoKSA9PiBhdXRoLnNpZ25PdXQoKS50aGVuKGNsZWFyKTtcblxuICAvLyBMaXN0ZW4gZm9yIEZpcmViYXNlIGF1dGggc3RhdGUgY2hhbmdlc1xuICAvLyB1c2VFZmZlY3QoKCkgPT4ge1xuICAvLyAgIGNvbnN0IHVuc3Vic2NyaWJlID0gYXV0aC5vbkF1dGhTdGF0ZUNoYW5nZWQoYXV0aFN0YXRlQ2hhbmdlZCk7XG4gIC8vICAgcmV0dXJuICgpID0+IHVuc3Vic2NyaWJlKCk7XG4gIC8vIH0sIFtdKTtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBsZXQgdW5zdWJzY3JpYmU7XG4gICAgYXV0aFxuICAgICAgLnNldFBlcnNpc3RlbmNlKEZpcmViYXNlLmF1dGguQXV0aC5QZXJzaXN0ZW5jZS5MT0NBTClcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgLy8gTm93IHNldCB1cCB0aGUgbGlzdGVuZXJcbiAgICAgICAgdW5zdWJzY3JpYmUgPSBhdXRoLm9uQXV0aFN0YXRlQ2hhbmdlZChhdXRoU3RhdGVDaGFuZ2VkKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiBjb25zb2xlLmVycm9yKFwiRXJyb3Igc2V0dGluZyBwZXJzaXN0ZW5jZTpcIiwgZXJyb3IpKTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBpZiAodW5zdWJzY3JpYmUpIHtcbiAgICAgICAgdW5zdWJzY3JpYmUoKTtcbiAgICAgIH1cbiAgICB9O1xuICB9LCBbXSk7XG5cbiAgcmV0dXJuIHtcbiAgICBhdXRoVXNlcixcbiAgICBsb2FkaW5nLFxuICAgIHNpZ25JbldpdGhHb29nbGUsXG4gICAgc2lnbk91dCxcbiAgfTtcbn1cbiIsImltcG9ydCBSZWFjdCwgeyBDaGlsZHJlbiwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBVcmxPYmplY3QgfSBmcm9tICd1cmwnXG5pbXBvcnQge1xuICBhZGRCYXNlUGF0aCxcbiAgYWRkTG9jYWxlLFxuICBnZXREb21haW5Mb2NhbGUsXG4gIGlzTG9jYWxVUkwsXG4gIE5leHRSb3V0ZXIsXG4gIFByZWZldGNoT3B0aW9ucyxcbiAgcmVzb2x2ZUhyZWYsXG59IGZyb20gJy4uL25leHQtc2VydmVyL2xpYi9yb3V0ZXIvcm91dGVyJ1xuaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSAnLi9yb3V0ZXInXG5pbXBvcnQgeyB1c2VJbnRlcnNlY3Rpb24gfSBmcm9tICcuL3VzZS1pbnRlcnNlY3Rpb24nXG5cbnR5cGUgVXJsID0gc3RyaW5nIHwgVXJsT2JqZWN0XG50eXBlIFJlcXVpcmVkS2V5czxUPiA9IHtcbiAgW0sgaW4ga2V5b2YgVF0tPzoge30gZXh0ZW5kcyBQaWNrPFQsIEs+ID8gbmV2ZXIgOiBLXG59W2tleW9mIFRdXG50eXBlIE9wdGlvbmFsS2V5czxUPiA9IHtcbiAgW0sgaW4ga2V5b2YgVF0tPzoge30gZXh0ZW5kcyBQaWNrPFQsIEs+ID8gSyA6IG5ldmVyXG59W2tleW9mIFRdXG5cbmV4cG9ydCB0eXBlIExpbmtQcm9wcyA9IHtcbiAgaHJlZjogVXJsXG4gIGFzPzogVXJsXG4gIHJlcGxhY2U/OiBib29sZWFuXG4gIHNjcm9sbD86IGJvb2xlYW5cbiAgc2hhbGxvdz86IGJvb2xlYW5cbiAgcGFzc0hyZWY/OiBib29sZWFuXG4gIHByZWZldGNoPzogYm9vbGVhblxuICBsb2NhbGU/OiBzdHJpbmcgfCBmYWxzZVxufVxudHlwZSBMaW5rUHJvcHNSZXF1aXJlZCA9IFJlcXVpcmVkS2V5czxMaW5rUHJvcHM+XG50eXBlIExpbmtQcm9wc09wdGlvbmFsID0gT3B0aW9uYWxLZXlzPExpbmtQcm9wcz5cblxuY29uc3QgcHJlZmV0Y2hlZDogeyBbY2FjaGVLZXk6IHN0cmluZ106IGJvb2xlYW4gfSA9IHt9XG5cbmZ1bmN0aW9uIHByZWZldGNoKFxuICByb3V0ZXI6IE5leHRSb3V0ZXIsXG4gIGhyZWY6IHN0cmluZyxcbiAgYXM6IHN0cmluZyxcbiAgb3B0aW9ucz86IFByZWZldGNoT3B0aW9uc1xuKTogdm9pZCB7XG4gIGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJyB8fCAhcm91dGVyKSByZXR1cm5cbiAgaWYgKCFpc0xvY2FsVVJMKGhyZWYpKSByZXR1cm5cbiAgLy8gUHJlZmV0Y2ggdGhlIEpTT04gcGFnZSBpZiBhc2tlZCAob25seSBpbiB0aGUgY2xpZW50KVxuICAvLyBXZSBuZWVkIHRvIGhhbmRsZSBhIHByZWZldGNoIGVycm9yIGhlcmUgc2luY2Ugd2UgbWF5IGJlXG4gIC8vIGxvYWRpbmcgd2l0aCBwcmlvcml0eSB3aGljaCBjYW4gcmVqZWN0IGJ1dCB3ZSBkb24ndFxuICAvLyB3YW50IHRvIGZvcmNlIG5hdmlnYXRpb24gc2luY2UgdGhpcyBpcyBvbmx5IGEgcHJlZmV0Y2hcbiAgcm91dGVyLnByZWZldGNoKGhyZWYsIGFzLCBvcHRpb25zKS5jYXRjaCgoZXJyKSA9PiB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIC8vIHJldGhyb3cgdG8gc2hvdyBpbnZhbGlkIFVSTCBlcnJvcnNcbiAgICAgIHRocm93IGVyclxuICAgIH1cbiAgfSlcbiAgY29uc3QgY3VyTG9jYWxlID1cbiAgICBvcHRpb25zICYmIHR5cGVvZiBvcHRpb25zLmxvY2FsZSAhPT0gJ3VuZGVmaW5lZCdcbiAgICAgID8gb3B0aW9ucy5sb2NhbGVcbiAgICAgIDogcm91dGVyICYmIHJvdXRlci5sb2NhbGVcblxuICAvLyBKb2luIG9uIGFuIGludmFsaWQgVVJJIGNoYXJhY3RlclxuICBwcmVmZXRjaGVkW2hyZWYgKyAnJScgKyBhcyArIChjdXJMb2NhbGUgPyAnJScgKyBjdXJMb2NhbGUgOiAnJyldID0gdHJ1ZVxufVxuXG5mdW5jdGlvbiBpc01vZGlmaWVkRXZlbnQoZXZlbnQ6IFJlYWN0Lk1vdXNlRXZlbnQpOiBib29sZWFuIHtcbiAgY29uc3QgeyB0YXJnZXQgfSA9IGV2ZW50LmN1cnJlbnRUYXJnZXQgYXMgSFRNTEFuY2hvckVsZW1lbnRcbiAgcmV0dXJuIChcbiAgICAodGFyZ2V0ICYmIHRhcmdldCAhPT0gJ19zZWxmJykgfHxcbiAgICBldmVudC5tZXRhS2V5IHx8XG4gICAgZXZlbnQuY3RybEtleSB8fFxuICAgIGV2ZW50LnNoaWZ0S2V5IHx8XG4gICAgZXZlbnQuYWx0S2V5IHx8IC8vIHRyaWdnZXJzIHJlc291cmNlIGRvd25sb2FkXG4gICAgKGV2ZW50Lm5hdGl2ZUV2ZW50ICYmIGV2ZW50Lm5hdGl2ZUV2ZW50LndoaWNoID09PSAyKVxuICApXG59XG5cbmZ1bmN0aW9uIGxpbmtDbGlja2VkKFxuICBlOiBSZWFjdC5Nb3VzZUV2ZW50LFxuICByb3V0ZXI6IE5leHRSb3V0ZXIsXG4gIGhyZWY6IHN0cmluZyxcbiAgYXM6IHN0cmluZyxcbiAgcmVwbGFjZT86IGJvb2xlYW4sXG4gIHNoYWxsb3c/OiBib29sZWFuLFxuICBzY3JvbGw/OiBib29sZWFuLFxuICBsb2NhbGU/OiBzdHJpbmcgfCBmYWxzZVxuKTogdm9pZCB7XG4gIGNvbnN0IHsgbm9kZU5hbWUgfSA9IGUuY3VycmVudFRhcmdldFxuXG4gIGlmIChub2RlTmFtZSA9PT0gJ0EnICYmIChpc01vZGlmaWVkRXZlbnQoZSkgfHwgIWlzTG9jYWxVUkwoaHJlZikpKSB7XG4gICAgLy8gaWdub3JlIGNsaWNrIGZvciBicm93c2Vy4oCZcyBkZWZhdWx0IGJlaGF2aW9yXG4gICAgcmV0dXJuXG4gIH1cblxuICBlLnByZXZlbnREZWZhdWx0KClcblxuICAvLyAgYXZvaWQgc2Nyb2xsIGZvciB1cmxzIHdpdGggYW5jaG9yIHJlZnNcbiAgaWYgKHNjcm9sbCA9PSBudWxsKSB7XG4gICAgc2Nyb2xsID0gYXMuaW5kZXhPZignIycpIDwgMFxuICB9XG5cbiAgLy8gcmVwbGFjZSBzdGF0ZSBpbnN0ZWFkIG9mIHB1c2ggaWYgcHJvcCBpcyBwcmVzZW50XG4gIHJvdXRlcltyZXBsYWNlID8gJ3JlcGxhY2UnIDogJ3B1c2gnXShocmVmLCBhcywge1xuICAgIHNoYWxsb3csXG4gICAgbG9jYWxlLFxuICAgIHNjcm9sbCxcbiAgfSlcbn1cblxuZnVuY3Rpb24gTGluayhwcm9wczogUmVhY3QuUHJvcHNXaXRoQ2hpbGRyZW48TGlua1Byb3BzPikge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGZ1bmN0aW9uIGNyZWF0ZVByb3BFcnJvcihhcmdzOiB7XG4gICAgICBrZXk6IHN0cmluZ1xuICAgICAgZXhwZWN0ZWQ6IHN0cmluZ1xuICAgICAgYWN0dWFsOiBzdHJpbmdcbiAgICB9KSB7XG4gICAgICByZXR1cm4gbmV3IEVycm9yKFxuICAgICAgICBgRmFpbGVkIHByb3AgdHlwZTogVGhlIHByb3AgXFxgJHthcmdzLmtleX1cXGAgZXhwZWN0cyBhICR7YXJncy5leHBlY3RlZH0gaW4gXFxgPExpbms+XFxgLCBidXQgZ290IFxcYCR7YXJncy5hY3R1YWx9XFxgIGluc3RlYWQuYCArXG4gICAgICAgICAgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnXG4gICAgICAgICAgICA/IFwiXFxuT3BlbiB5b3VyIGJyb3dzZXIncyBjb25zb2xlIHRvIHZpZXcgdGhlIENvbXBvbmVudCBzdGFjayB0cmFjZS5cIlxuICAgICAgICAgICAgOiAnJylcbiAgICAgIClcbiAgICB9XG5cbiAgICAvLyBUeXBlU2NyaXB0IHRyaWNrIGZvciB0eXBlLWd1YXJkaW5nOlxuICAgIGNvbnN0IHJlcXVpcmVkUHJvcHNHdWFyZDogUmVjb3JkPExpbmtQcm9wc1JlcXVpcmVkLCB0cnVlPiA9IHtcbiAgICAgIGhyZWY6IHRydWUsXG4gICAgfSBhcyBjb25zdFxuICAgIGNvbnN0IHJlcXVpcmVkUHJvcHM6IExpbmtQcm9wc1JlcXVpcmVkW10gPSBPYmplY3Qua2V5cyhcbiAgICAgIHJlcXVpcmVkUHJvcHNHdWFyZFxuICAgICkgYXMgTGlua1Byb3BzUmVxdWlyZWRbXVxuICAgIHJlcXVpcmVkUHJvcHMuZm9yRWFjaCgoa2V5OiBMaW5rUHJvcHNSZXF1aXJlZCkgPT4ge1xuICAgICAgaWYgKGtleSA9PT0gJ2hyZWYnKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBwcm9wc1trZXldID09IG51bGwgfHxcbiAgICAgICAgICAodHlwZW9mIHByb3BzW2tleV0gIT09ICdzdHJpbmcnICYmIHR5cGVvZiBwcm9wc1trZXldICE9PSAnb2JqZWN0JylcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhyb3cgY3JlYXRlUHJvcEVycm9yKHtcbiAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgIGV4cGVjdGVkOiAnYHN0cmluZ2Agb3IgYG9iamVjdGAnLFxuICAgICAgICAgICAgYWN0dWFsOiBwcm9wc1trZXldID09PSBudWxsID8gJ251bGwnIDogdHlwZW9mIHByb3BzW2tleV0sXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gVHlwZVNjcmlwdCB0cmljayBmb3IgdHlwZS1ndWFyZGluZzpcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xuICAgICAgICBjb25zdCBfOiBuZXZlciA9IGtleVxuICAgICAgfVxuICAgIH0pXG5cbiAgICAvLyBUeXBlU2NyaXB0IHRyaWNrIGZvciB0eXBlLWd1YXJkaW5nOlxuICAgIGNvbnN0IG9wdGlvbmFsUHJvcHNHdWFyZDogUmVjb3JkPExpbmtQcm9wc09wdGlvbmFsLCB0cnVlPiA9IHtcbiAgICAgIGFzOiB0cnVlLFxuICAgICAgcmVwbGFjZTogdHJ1ZSxcbiAgICAgIHNjcm9sbDogdHJ1ZSxcbiAgICAgIHNoYWxsb3c6IHRydWUsXG4gICAgICBwYXNzSHJlZjogdHJ1ZSxcbiAgICAgIHByZWZldGNoOiB0cnVlLFxuICAgICAgbG9jYWxlOiB0cnVlLFxuICAgIH0gYXMgY29uc3RcbiAgICBjb25zdCBvcHRpb25hbFByb3BzOiBMaW5rUHJvcHNPcHRpb25hbFtdID0gT2JqZWN0LmtleXMoXG4gICAgICBvcHRpb25hbFByb3BzR3VhcmRcbiAgICApIGFzIExpbmtQcm9wc09wdGlvbmFsW11cbiAgICBvcHRpb25hbFByb3BzLmZvckVhY2goKGtleTogTGlua1Byb3BzT3B0aW9uYWwpID0+IHtcbiAgICAgIGNvbnN0IHZhbFR5cGUgPSB0eXBlb2YgcHJvcHNba2V5XVxuXG4gICAgICBpZiAoa2V5ID09PSAnYXMnKSB7XG4gICAgICAgIGlmIChwcm9wc1trZXldICYmIHZhbFR5cGUgIT09ICdzdHJpbmcnICYmIHZhbFR5cGUgIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgdGhyb3cgY3JlYXRlUHJvcEVycm9yKHtcbiAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgIGV4cGVjdGVkOiAnYHN0cmluZ2Agb3IgYG9iamVjdGAnLFxuICAgICAgICAgICAgYWN0dWFsOiB2YWxUeXBlLFxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSAnbG9jYWxlJykge1xuICAgICAgICBpZiAocHJvcHNba2V5XSAmJiB2YWxUeXBlICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgIHRocm93IGNyZWF0ZVByb3BFcnJvcih7XG4gICAgICAgICAgICBrZXksXG4gICAgICAgICAgICBleHBlY3RlZDogJ2BzdHJpbmdgJyxcbiAgICAgICAgICAgIGFjdHVhbDogdmFsVHlwZSxcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICBrZXkgPT09ICdyZXBsYWNlJyB8fFxuICAgICAgICBrZXkgPT09ICdzY3JvbGwnIHx8XG4gICAgICAgIGtleSA9PT0gJ3NoYWxsb3cnIHx8XG4gICAgICAgIGtleSA9PT0gJ3Bhc3NIcmVmJyB8fFxuICAgICAgICBrZXkgPT09ICdwcmVmZXRjaCdcbiAgICAgICkge1xuICAgICAgICBpZiAocHJvcHNba2V5XSAhPSBudWxsICYmIHZhbFR5cGUgIT09ICdib29sZWFuJykge1xuICAgICAgICAgIHRocm93IGNyZWF0ZVByb3BFcnJvcih7XG4gICAgICAgICAgICBrZXksXG4gICAgICAgICAgICBleHBlY3RlZDogJ2Bib29sZWFuYCcsXG4gICAgICAgICAgICBhY3R1YWw6IHZhbFR5cGUsXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gVHlwZVNjcmlwdCB0cmljayBmb3IgdHlwZS1ndWFyZGluZzpcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xuICAgICAgICBjb25zdCBfOiBuZXZlciA9IGtleVxuICAgICAgfVxuICAgIH0pXG5cbiAgICAvLyBUaGlzIGhvb2sgaXMgaW4gYSBjb25kaXRpb25hbCBidXQgdGhhdCBpcyBvayBiZWNhdXNlIGBwcm9jZXNzLmVudi5OT0RFX0VOVmAgbmV2ZXIgY2hhbmdlc1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC1ob29rcy9ydWxlcy1vZi1ob29rc1xuICAgIGNvbnN0IGhhc1dhcm5lZCA9IFJlYWN0LnVzZVJlZihmYWxzZSlcbiAgICBpZiAocHJvcHMucHJlZmV0Y2ggJiYgIWhhc1dhcm5lZC5jdXJyZW50KSB7XG4gICAgICBoYXNXYXJuZWQuY3VycmVudCA9IHRydWVcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgJ05leHQuanMgYXV0by1wcmVmZXRjaGVzIGF1dG9tYXRpY2FsbHkgYmFzZWQgb24gdmlld3BvcnQuIFRoZSBwcmVmZXRjaCBhdHRyaWJ1dGUgaXMgbm8gbG9uZ2VyIG5lZWRlZC4gTW9yZTogaHR0cHM6Ly9uZXh0anMub3JnL2RvY3MvbWVzc2FnZXMvcHJlZmV0Y2gtdHJ1ZS1kZXByZWNhdGVkJ1xuICAgICAgKVxuICAgIH1cbiAgfVxuICBjb25zdCBwID0gcHJvcHMucHJlZmV0Y2ggIT09IGZhbHNlXG5cbiAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKClcbiAgY29uc3QgcGF0aG5hbWUgPSAocm91dGVyICYmIHJvdXRlci5hc1BhdGgpIHx8ICcvJ1xuXG4gIGNvbnN0IHsgaHJlZiwgYXMgfSA9IFJlYWN0LnVzZU1lbW8oKCkgPT4ge1xuICAgIGNvbnN0IFtyZXNvbHZlZEhyZWYsIHJlc29sdmVkQXNdID0gcmVzb2x2ZUhyZWYocGF0aG5hbWUsIHByb3BzLmhyZWYsIHRydWUpXG4gICAgcmV0dXJuIHtcbiAgICAgIGhyZWY6IHJlc29sdmVkSHJlZixcbiAgICAgIGFzOiBwcm9wcy5hc1xuICAgICAgICA/IHJlc29sdmVIcmVmKHBhdGhuYW1lLCBwcm9wcy5hcylcbiAgICAgICAgOiByZXNvbHZlZEFzIHx8IHJlc29sdmVkSHJlZixcbiAgICB9XG4gIH0sIFtwYXRobmFtZSwgcHJvcHMuaHJlZiwgcHJvcHMuYXNdKVxuXG4gIGxldCB7IGNoaWxkcmVuLCByZXBsYWNlLCBzaGFsbG93LCBzY3JvbGwsIGxvY2FsZSB9ID0gcHJvcHNcblxuICAvLyBEZXByZWNhdGVkLiBXYXJuaW5nIHNob3duIGJ5IHByb3BUeXBlIGNoZWNrLiBJZiB0aGUgY2hpbGRyZW4gcHJvdmlkZWQgaXMgYSBzdHJpbmcgKDxMaW5rPmV4YW1wbGU8L0xpbms+KSB3ZSB3cmFwIGl0IGluIGFuIDxhPiB0YWdcbiAgaWYgKHR5cGVvZiBjaGlsZHJlbiA9PT0gJ3N0cmluZycpIHtcbiAgICBjaGlsZHJlbiA9IDxhPntjaGlsZHJlbn08L2E+XG4gIH1cblxuICAvLyBUaGlzIHdpbGwgcmV0dXJuIHRoZSBmaXJzdCBjaGlsZCwgaWYgbXVsdGlwbGUgYXJlIHByb3ZpZGVkIGl0IHdpbGwgdGhyb3cgYW4gZXJyb3JcbiAgY29uc3QgY2hpbGQ6IGFueSA9IENoaWxkcmVuLm9ubHkoY2hpbGRyZW4pXG4gIGNvbnN0IGNoaWxkUmVmOiBhbnkgPSBjaGlsZCAmJiB0eXBlb2YgY2hpbGQgPT09ICdvYmplY3QnICYmIGNoaWxkLnJlZlxuXG4gIGNvbnN0IFtzZXRJbnRlcnNlY3Rpb25SZWYsIGlzVmlzaWJsZV0gPSB1c2VJbnRlcnNlY3Rpb24oe1xuICAgIHJvb3RNYXJnaW46ICcyMDBweCcsXG4gIH0pXG4gIGNvbnN0IHNldFJlZiA9IFJlYWN0LnVzZUNhbGxiYWNrKFxuICAgIChlbDogRWxlbWVudCkgPT4ge1xuICAgICAgc2V0SW50ZXJzZWN0aW9uUmVmKGVsKVxuICAgICAgaWYgKGNoaWxkUmVmKSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2hpbGRSZWYgPT09ICdmdW5jdGlvbicpIGNoaWxkUmVmKGVsKVxuICAgICAgICBlbHNlIGlmICh0eXBlb2YgY2hpbGRSZWYgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgY2hpbGRSZWYuY3VycmVudCA9IGVsXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIFtjaGlsZFJlZiwgc2V0SW50ZXJzZWN0aW9uUmVmXVxuICApXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3Qgc2hvdWxkUHJlZmV0Y2ggPSBpc1Zpc2libGUgJiYgcCAmJiBpc0xvY2FsVVJMKGhyZWYpXG4gICAgY29uc3QgY3VyTG9jYWxlID1cbiAgICAgIHR5cGVvZiBsb2NhbGUgIT09ICd1bmRlZmluZWQnID8gbG9jYWxlIDogcm91dGVyICYmIHJvdXRlci5sb2NhbGVcbiAgICBjb25zdCBpc1ByZWZldGNoZWQgPVxuICAgICAgcHJlZmV0Y2hlZFtocmVmICsgJyUnICsgYXMgKyAoY3VyTG9jYWxlID8gJyUnICsgY3VyTG9jYWxlIDogJycpXVxuICAgIGlmIChzaG91bGRQcmVmZXRjaCAmJiAhaXNQcmVmZXRjaGVkKSB7XG4gICAgICBwcmVmZXRjaChyb3V0ZXIsIGhyZWYsIGFzLCB7XG4gICAgICAgIGxvY2FsZTogY3VyTG9jYWxlLFxuICAgICAgfSlcbiAgICB9XG4gIH0sIFthcywgaHJlZiwgaXNWaXNpYmxlLCBsb2NhbGUsIHAsIHJvdXRlcl0pXG5cbiAgY29uc3QgY2hpbGRQcm9wczoge1xuICAgIG9uTW91c2VFbnRlcj86IFJlYWN0Lk1vdXNlRXZlbnRIYW5kbGVyXG4gICAgb25DbGljazogUmVhY3QuTW91c2VFdmVudEhhbmRsZXJcbiAgICBocmVmPzogc3RyaW5nXG4gICAgcmVmPzogYW55XG4gIH0gPSB7XG4gICAgcmVmOiBzZXRSZWYsXG4gICAgb25DbGljazogKGU6IFJlYWN0Lk1vdXNlRXZlbnQpID0+IHtcbiAgICAgIGlmIChjaGlsZC5wcm9wcyAmJiB0eXBlb2YgY2hpbGQucHJvcHMub25DbGljayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBjaGlsZC5wcm9wcy5vbkNsaWNrKGUpXG4gICAgICB9XG4gICAgICBpZiAoIWUuZGVmYXVsdFByZXZlbnRlZCkge1xuICAgICAgICBsaW5rQ2xpY2tlZChlLCByb3V0ZXIsIGhyZWYsIGFzLCByZXBsYWNlLCBzaGFsbG93LCBzY3JvbGwsIGxvY2FsZSlcbiAgICAgIH1cbiAgICB9LFxuICB9XG5cbiAgY2hpbGRQcm9wcy5vbk1vdXNlRW50ZXIgPSAoZTogUmVhY3QuTW91c2VFdmVudCkgPT4ge1xuICAgIGlmICghaXNMb2NhbFVSTChocmVmKSkgcmV0dXJuXG4gICAgaWYgKGNoaWxkLnByb3BzICYmIHR5cGVvZiBjaGlsZC5wcm9wcy5vbk1vdXNlRW50ZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNoaWxkLnByb3BzLm9uTW91c2VFbnRlcihlKVxuICAgIH1cbiAgICBwcmVmZXRjaChyb3V0ZXIsIGhyZWYsIGFzLCB7IHByaW9yaXR5OiB0cnVlIH0pXG4gIH1cblxuICAvLyBJZiBjaGlsZCBpcyBhbiA8YT4gdGFnIGFuZCBkb2Vzbid0IGhhdmUgYSBocmVmIGF0dHJpYnV0ZSwgb3IgaWYgdGhlICdwYXNzSHJlZicgcHJvcGVydHkgaXNcbiAgLy8gZGVmaW5lZCwgd2Ugc3BlY2lmeSB0aGUgY3VycmVudCAnaHJlZicsIHNvIHRoYXQgcmVwZXRpdGlvbiBpcyBub3QgbmVlZGVkIGJ5IHRoZSB1c2VyXG4gIGlmIChwcm9wcy5wYXNzSHJlZiB8fCAoY2hpbGQudHlwZSA9PT0gJ2EnICYmICEoJ2hyZWYnIGluIGNoaWxkLnByb3BzKSkpIHtcbiAgICBjb25zdCBjdXJMb2NhbGUgPVxuICAgICAgdHlwZW9mIGxvY2FsZSAhPT0gJ3VuZGVmaW5lZCcgPyBsb2NhbGUgOiByb3V0ZXIgJiYgcm91dGVyLmxvY2FsZVxuXG4gICAgLy8gd2Ugb25seSByZW5kZXIgZG9tYWluIGxvY2FsZXMgaWYgd2UgYXJlIGN1cnJlbnRseSBvbiBhIGRvbWFpbiBsb2NhbGVcbiAgICAvLyBzbyB0aGF0IGxvY2FsZSBsaW5rcyBhcmUgc3RpbGwgdmlzaXRhYmxlIGluIGRldmVsb3BtZW50L3ByZXZpZXcgZW52c1xuICAgIGNvbnN0IGxvY2FsZURvbWFpbiA9XG4gICAgICByb3V0ZXIgJiZcbiAgICAgIHJvdXRlci5pc0xvY2FsZURvbWFpbiAmJlxuICAgICAgZ2V0RG9tYWluTG9jYWxlKFxuICAgICAgICBhcyxcbiAgICAgICAgY3VyTG9jYWxlLFxuICAgICAgICByb3V0ZXIgJiYgcm91dGVyLmxvY2FsZXMsXG4gICAgICAgIHJvdXRlciAmJiByb3V0ZXIuZG9tYWluTG9jYWxlc1xuICAgICAgKVxuXG4gICAgY2hpbGRQcm9wcy5ocmVmID1cbiAgICAgIGxvY2FsZURvbWFpbiB8fFxuICAgICAgYWRkQmFzZVBhdGgoYWRkTG9jYWxlKGFzLCBjdXJMb2NhbGUsIHJvdXRlciAmJiByb3V0ZXIuZGVmYXVsdExvY2FsZSkpXG4gIH1cblxuICByZXR1cm4gUmVhY3QuY2xvbmVFbGVtZW50KGNoaWxkLCBjaGlsZFByb3BzKVxufVxuXG5leHBvcnQgZGVmYXVsdCBMaW5rXG4iLCIvKipcbiAqIFJlbW92ZXMgdGhlIHRyYWlsaW5nIHNsYXNoIG9mIGEgcGF0aCBpZiB0aGVyZSBpcyBvbmUuIFByZXNlcnZlcyB0aGUgcm9vdCBwYXRoIGAvYC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZVBhdGhUcmFpbGluZ1NsYXNoKHBhdGg6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBwYXRoLmVuZHNXaXRoKCcvJykgJiYgcGF0aCAhPT0gJy8nID8gcGF0aC5zbGljZSgwLCAtMSkgOiBwYXRoXG59XG5cbi8qKlxuICogTm9ybWFsaXplcyB0aGUgdHJhaWxpbmcgc2xhc2ggb2YgYSBwYXRoIGFjY29yZGluZyB0byB0aGUgYHRyYWlsaW5nU2xhc2hgIG9wdGlvblxuICogaW4gYG5leHQuY29uZmlnLmpzYC5cbiAqL1xuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZVBhdGhUcmFpbGluZ1NsYXNoID0gcHJvY2Vzcy5lbnYuX19ORVhUX1RSQUlMSU5HX1NMQVNIXG4gID8gKHBhdGg6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gICAgICBpZiAoL1xcLlteL10rXFwvPyQvLnRlc3QocGF0aCkpIHtcbiAgICAgICAgcmV0dXJuIHJlbW92ZVBhdGhUcmFpbGluZ1NsYXNoKHBhdGgpXG4gICAgICB9IGVsc2UgaWYgKHBhdGguZW5kc1dpdGgoJy8nKSkge1xuICAgICAgICByZXR1cm4gcGF0aFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHBhdGggKyAnLydcbiAgICAgIH1cbiAgICB9XG4gIDogcmVtb3ZlUGF0aFRyYWlsaW5nU2xhc2hcbiIsInR5cGUgUmVxdWVzdElkbGVDYWxsYmFja0hhbmRsZSA9IGFueVxudHlwZSBSZXF1ZXN0SWRsZUNhbGxiYWNrT3B0aW9ucyA9IHtcbiAgdGltZW91dDogbnVtYmVyXG59XG50eXBlIFJlcXVlc3RJZGxlQ2FsbGJhY2tEZWFkbGluZSA9IHtcbiAgcmVhZG9ubHkgZGlkVGltZW91dDogYm9vbGVhblxuICB0aW1lUmVtYWluaW5nOiAoKSA9PiBudW1iZXJcbn1cblxuZGVjbGFyZSBnbG9iYWwge1xuICBpbnRlcmZhY2UgV2luZG93IHtcbiAgICByZXF1ZXN0SWRsZUNhbGxiYWNrOiAoXG4gICAgICBjYWxsYmFjazogKGRlYWRsaW5lOiBSZXF1ZXN0SWRsZUNhbGxiYWNrRGVhZGxpbmUpID0+IHZvaWQsXG4gICAgICBvcHRzPzogUmVxdWVzdElkbGVDYWxsYmFja09wdGlvbnNcbiAgICApID0+IFJlcXVlc3RJZGxlQ2FsbGJhY2tIYW5kbGVcbiAgICBjYW5jZWxJZGxlQ2FsbGJhY2s6IChpZDogUmVxdWVzdElkbGVDYWxsYmFja0hhbmRsZSkgPT4gdm9pZFxuICB9XG59XG5cbmV4cG9ydCBjb25zdCByZXF1ZXN0SWRsZUNhbGxiYWNrID1cbiAgKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyAmJiBzZWxmLnJlcXVlc3RJZGxlQ2FsbGJhY2spIHx8XG4gIGZ1bmN0aW9uIChcbiAgICBjYjogKGRlYWRsaW5lOiBSZXF1ZXN0SWRsZUNhbGxiYWNrRGVhZGxpbmUpID0+IHZvaWRcbiAgKTogTm9kZUpTLlRpbWVvdXQge1xuICAgIGxldCBzdGFydCA9IERhdGUubm93KClcbiAgICByZXR1cm4gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICBjYih7XG4gICAgICAgIGRpZFRpbWVvdXQ6IGZhbHNlLFxuICAgICAgICB0aW1lUmVtYWluaW5nOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIE1hdGgubWF4KDAsIDUwIC0gKERhdGUubm93KCkgLSBzdGFydCkpXG4gICAgICAgIH0sXG4gICAgICB9KVxuICAgIH0sIDEpXG4gIH1cblxuZXhwb3J0IGNvbnN0IGNhbmNlbElkbGVDYWxsYmFjayA9XG4gICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgJiYgc2VsZi5jYW5jZWxJZGxlQ2FsbGJhY2spIHx8XG4gIGZ1bmN0aW9uIChpZDogUmVxdWVzdElkbGVDYWxsYmFja0hhbmRsZSkge1xuICAgIHJldHVybiBjbGVhclRpbWVvdXQoaWQpXG4gIH1cbiIsImltcG9ydCB7IENvbXBvbmVudFR5cGUgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IENsaWVudEJ1aWxkTWFuaWZlc3QgfSBmcm9tICcuLi9idWlsZC93ZWJwYWNrL3BsdWdpbnMvYnVpbGQtbWFuaWZlc3QtcGx1Z2luJ1xuaW1wb3J0IGdldEFzc2V0UGF0aEZyb21Sb3V0ZSBmcm9tICcuLi9uZXh0LXNlcnZlci9saWIvcm91dGVyL3V0aWxzL2dldC1hc3NldC1wYXRoLWZyb20tcm91dGUnXG5pbXBvcnQgeyByZXF1ZXN0SWRsZUNhbGxiYWNrIH0gZnJvbSAnLi9yZXF1ZXN0LWlkbGUtY2FsbGJhY2snXG5cbi8vIDMuOHMgd2FzIGFyYml0cmFyaWx5IGNob3NlbiBhcyBpdCdzIHdoYXQgaHR0cHM6Ly93ZWIuZGV2L2ludGVyYWN0aXZlXG4vLyBjb25zaWRlcnMgYXMgXCJHb29kXCIgdGltZS10by1pbnRlcmFjdGl2ZS4gV2UgbXVzdCBhc3N1bWUgc29tZXRoaW5nIHdlbnRcbi8vIHdyb25nIGJleW9uZCB0aGlzIHBvaW50LCBhbmQgdGhlbiBmYWxsLWJhY2sgdG8gYSBmdWxsIHBhZ2UgdHJhbnNpdGlvbiB0b1xuLy8gc2hvdyB0aGUgdXNlciBzb21ldGhpbmcgb2YgdmFsdWUuXG5jb25zdCBNU19NQVhfSURMRV9ERUxBWSA9IDM4MDBcblxuZGVjbGFyZSBnbG9iYWwge1xuICBpbnRlcmZhY2UgV2luZG93IHtcbiAgICBfX0JVSUxEX01BTklGRVNUPzogQ2xpZW50QnVpbGRNYW5pZmVzdFxuICAgIF9fQlVJTERfTUFOSUZFU1RfQ0I/OiBGdW5jdGlvblxuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTG9hZGVkRW50cnlwb2ludFN1Y2Nlc3Mge1xuICBjb21wb25lbnQ6IENvbXBvbmVudFR5cGVcbiAgZXhwb3J0czogYW55XG59XG5leHBvcnQgaW50ZXJmYWNlIExvYWRlZEVudHJ5cG9pbnRGYWlsdXJlIHtcbiAgZXJyb3I6IHVua25vd25cbn1cbmV4cG9ydCB0eXBlIFJvdXRlRW50cnlwb2ludCA9IExvYWRlZEVudHJ5cG9pbnRTdWNjZXNzIHwgTG9hZGVkRW50cnlwb2ludEZhaWx1cmVcblxuZXhwb3J0IGludGVyZmFjZSBSb3V0ZVN0eWxlU2hlZXQge1xuICBocmVmOiBzdHJpbmdcbiAgY29udGVudDogc3RyaW5nXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTG9hZGVkUm91dGVTdWNjZXNzIGV4dGVuZHMgTG9hZGVkRW50cnlwb2ludFN1Y2Nlc3Mge1xuICBzdHlsZXM6IFJvdXRlU3R5bGVTaGVldFtdXG59XG5leHBvcnQgaW50ZXJmYWNlIExvYWRlZFJvdXRlRmFpbHVyZSB7XG4gIGVycm9yOiB1bmtub3duXG59XG5leHBvcnQgdHlwZSBSb3V0ZUxvYWRlckVudHJ5ID0gTG9hZGVkUm91dGVTdWNjZXNzIHwgTG9hZGVkUm91dGVGYWlsdXJlXG5cbmV4cG9ydCB0eXBlIEZ1dHVyZTxWPiA9IHtcbiAgcmVzb2x2ZTogKGVudHJ5cG9pbnQ6IFYpID0+IHZvaWRcbiAgZnV0dXJlOiBQcm9taXNlPFY+XG59XG5mdW5jdGlvbiB3aXRoRnV0dXJlPFQ+KFxuICBrZXk6IHN0cmluZyxcbiAgbWFwOiBNYXA8c3RyaW5nLCBGdXR1cmU8VD4gfCBUPixcbiAgZ2VuZXJhdG9yPzogKCkgPT4gUHJvbWlzZTxUPlxuKTogUHJvbWlzZTxUPiB7XG4gIGxldCBlbnRyeTogRnV0dXJlPFQ+IHwgVCB8IHVuZGVmaW5lZCA9IG1hcC5nZXQoa2V5KVxuICBpZiAoZW50cnkpIHtcbiAgICBpZiAoJ2Z1dHVyZScgaW4gZW50cnkpIHtcbiAgICAgIHJldHVybiBlbnRyeS5mdXR1cmVcbiAgICB9XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShlbnRyeSlcbiAgfVxuICBsZXQgcmVzb2x2ZXI6IChlbnRyeXBvaW50OiBUKSA9PiB2b2lkXG4gIGNvbnN0IHByb206IFByb21pc2U8VD4gPSBuZXcgUHJvbWlzZTxUPigocmVzb2x2ZSkgPT4ge1xuICAgIHJlc29sdmVyID0gcmVzb2x2ZVxuICB9KVxuICBtYXAuc2V0KGtleSwgKGVudHJ5ID0geyByZXNvbHZlOiByZXNvbHZlciEsIGZ1dHVyZTogcHJvbSB9KSlcbiAgcmV0dXJuIGdlbmVyYXRvclxuICAgID8gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlcXVlbmNlc1xuICAgICAgZ2VuZXJhdG9yKCkudGhlbigodmFsdWUpID0+IChyZXNvbHZlcih2YWx1ZSksIHZhbHVlKSlcbiAgICA6IHByb21cbn1cblxuZXhwb3J0IGludGVyZmFjZSBSb3V0ZUxvYWRlciB7XG4gIHdoZW5FbnRyeXBvaW50KHJvdXRlOiBzdHJpbmcpOiBQcm9taXNlPFJvdXRlRW50cnlwb2ludD5cbiAgb25FbnRyeXBvaW50KHJvdXRlOiBzdHJpbmcsIGV4ZWN1dGU6ICgpID0+IHVua25vd24pOiB2b2lkXG4gIGxvYWRSb3V0ZShyb3V0ZTogc3RyaW5nLCBwcmVmZXRjaD86IGJvb2xlYW4pOiBQcm9taXNlPFJvdXRlTG9hZGVyRW50cnk+XG4gIHByZWZldGNoKHJvdXRlOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+XG59XG5cbmZ1bmN0aW9uIGhhc1ByZWZldGNoKGxpbms/OiBIVE1MTGlua0VsZW1lbnQpOiBib29sZWFuIHtcbiAgdHJ5IHtcbiAgICBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpXG4gICAgcmV0dXJuIChcbiAgICAgIC8vIGRldGVjdCBJRTExIHNpbmNlIGl0IHN1cHBvcnRzIHByZWZldGNoIGJ1dCBpc24ndCBkZXRlY3RlZFxuICAgICAgLy8gd2l0aCByZWxMaXN0LnN1cHBvcnRcbiAgICAgICghIXdpbmRvdy5NU0lucHV0TWV0aG9kQ29udGV4dCAmJiAhIShkb2N1bWVudCBhcyBhbnkpLmRvY3VtZW50TW9kZSkgfHxcbiAgICAgIGxpbmsucmVsTGlzdC5zdXBwb3J0cygncHJlZmV0Y2gnKVxuICAgIClcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxuY29uc3QgY2FuUHJlZmV0Y2g6IGJvb2xlYW4gPSBoYXNQcmVmZXRjaCgpXG5cbmZ1bmN0aW9uIHByZWZldGNoVmlhRG9tKFxuICBocmVmOiBzdHJpbmcsXG4gIGFzOiBzdHJpbmcsXG4gIGxpbms/OiBIVE1MTGlua0VsZW1lbnRcbik6IFByb21pc2U8YW55PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgbGlua1tyZWw9XCJwcmVmZXRjaFwiXVtocmVmXj1cIiR7aHJlZn1cIl1gKSkge1xuICAgICAgcmV0dXJuIHJlcygpXG4gICAgfVxuXG4gICAgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKVxuXG4gICAgLy8gVGhlIG9yZGVyIG9mIHByb3BlcnR5IGFzc2lnbm1lbnQgaGVyZSBpcyBpbnRlbnRpb25hbDpcbiAgICBpZiAoYXMpIGxpbmshLmFzID0gYXNcbiAgICBsaW5rIS5yZWwgPSBgcHJlZmV0Y2hgXG4gICAgbGluayEuY3Jvc3NPcmlnaW4gPSBwcm9jZXNzLmVudi5fX05FWFRfQ1JPU1NfT1JJR0lOIVxuICAgIGxpbmshLm9ubG9hZCA9IHJlc1xuICAgIGxpbmshLm9uZXJyb3IgPSByZWpcblxuICAgIC8vIGBocmVmYCBzaG91bGQgYWx3YXlzIGJlIGxhc3Q6XG4gICAgbGluayEuaHJlZiA9IGhyZWZcblxuICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQobGluaylcbiAgfSlcbn1cblxuY29uc3QgQVNTRVRfTE9BRF9FUlJPUiA9IFN5bWJvbCgnQVNTRVRfTE9BRF9FUlJPUicpXG4vLyBUT0RPOiB1bmV4cG9ydFxuZXhwb3J0IGZ1bmN0aW9uIG1hcmtBc3NldEVycm9yKGVycjogRXJyb3IpOiBFcnJvciB7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXJyLCBBU1NFVF9MT0FEX0VSUk9SLCB7fSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQXNzZXRFcnJvcihlcnI/OiBFcnJvcik6IGJvb2xlYW4gfCB1bmRlZmluZWQge1xuICByZXR1cm4gZXJyICYmIEFTU0VUX0xPQURfRVJST1IgaW4gZXJyXG59XG5cbmZ1bmN0aW9uIGFwcGVuZFNjcmlwdChcbiAgc3JjOiBzdHJpbmcsXG4gIHNjcmlwdD86IEhUTUxTY3JpcHRFbGVtZW50XG4pOiBQcm9taXNlPHVua25vd24+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKVxuXG4gICAgLy8gVGhlIG9yZGVyIG9mIHByb3BlcnR5IGFzc2lnbm1lbnQgaGVyZSBpcyBpbnRlbnRpb25hbC5cbiAgICAvLyAxLiBTZXR1cCBzdWNjZXNzL2ZhaWx1cmUgaG9va3MgaW4gY2FzZSB0aGUgYnJvd3NlciBzeW5jaHJvbm91c2x5XG4gICAgLy8gICAgZXhlY3V0ZXMgd2hlbiBgc3JjYCBpcyBzZXQuXG4gICAgc2NyaXB0Lm9ubG9hZCA9IHJlc29sdmVcbiAgICBzY3JpcHQub25lcnJvciA9ICgpID0+XG4gICAgICByZWplY3QobWFya0Fzc2V0RXJyb3IobmV3IEVycm9yKGBGYWlsZWQgdG8gbG9hZCBzY3JpcHQ6ICR7c3JjfWApKSlcblxuICAgIC8vIDIuIENvbmZpZ3VyZSB0aGUgY3Jvc3Mtb3JpZ2luIGF0dHJpYnV0ZSBiZWZvcmUgc2V0dGluZyBgc3JjYCBpbiBjYXNlIHRoZVxuICAgIC8vICAgIGJyb3dzZXIgYmVnaW5zIHRvIGZldGNoLlxuICAgIHNjcmlwdC5jcm9zc09yaWdpbiA9IHByb2Nlc3MuZW52Ll9fTkVYVF9DUk9TU19PUklHSU4hXG5cbiAgICAvLyAzLiBGaW5hbGx5LCBzZXQgdGhlIHNvdXJjZSBhbmQgaW5qZWN0IGludG8gdGhlIERPTSBpbiBjYXNlIHRoZSBjaGlsZFxuICAgIC8vICAgIG11c3QgYmUgYXBwZW5kZWQgZm9yIGZldGNoaW5nIHRvIHN0YXJ0LlxuICAgIHNjcmlwdC5zcmMgPSBzcmNcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNjcmlwdClcbiAgfSlcbn1cblxuLy8gUmVzb2x2ZSBhIHByb21pc2UgdGhhdCB0aW1lcyBvdXQgYWZ0ZXIgZ2l2ZW4gYW1vdW50IG9mIG1pbGxpc2Vjb25kcy5cbmZ1bmN0aW9uIHJlc29sdmVQcm9taXNlV2l0aFRpbWVvdXQ8VD4oXG4gIHA6IFByb21pc2U8VD4sXG4gIG1zOiBudW1iZXIsXG4gIGVycjogRXJyb3Jcbik6IFByb21pc2U8VD4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGxldCBjYW5jZWxsZWQgPSBmYWxzZVxuXG4gICAgcC50aGVuKChyKSA9PiB7XG4gICAgICAvLyBSZXNvbHZlZCwgY2FuY2VsIHRoZSB0aW1lb3V0XG4gICAgICBjYW5jZWxsZWQgPSB0cnVlXG4gICAgICByZXNvbHZlKHIpXG4gICAgfSkuY2F0Y2gocmVqZWN0KVxuXG4gICAgcmVxdWVzdElkbGVDYWxsYmFjaygoKSA9PlxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGlmICghY2FuY2VsbGVkKSB7XG4gICAgICAgICAgcmVqZWN0KGVycilcbiAgICAgICAgfVxuICAgICAgfSwgbXMpXG4gICAgKVxuICB9KVxufVxuXG4vLyBUT0RPOiBzdG9wIGV4cG9ydGluZyBvciBjYWNoZSB0aGUgZmFpbHVyZVxuLy8gSXQnZCBiZSBiZXN0IHRvIHN0b3AgZXhwb3J0aW5nIHRoaXMuIEl0J3MgYW4gaW1wbGVtZW50YXRpb24gZGV0YWlsLiBXZSdyZVxuLy8gb25seSBleHBvcnRpbmcgaXQgZm9yIGJhY2t3YXJkcyBjb21wYXRpYmlsdHkgd2l0aCB0aGUgYHBhZ2UtbG9hZGVyYC5cbi8vIE9ubHkgY2FjaGUgdGhpcyByZXNwb25zZSBhcyBhIGxhc3QgcmVzb3J0IGlmIHdlIGNhbm5vdCBlbGltaW5hdGUgYWxsIG90aGVyXG4vLyBjb2RlIGJyYW5jaGVzIHRoYXQgdXNlIHRoZSBCdWlsZCBNYW5pZmVzdCBDYWxsYmFjayBhbmQgcHVzaCB0aGVtIHRocm91Z2hcbi8vIHRoZSBSb3V0ZSBMb2FkZXIgaW50ZXJmYWNlLlxuZXhwb3J0IGZ1bmN0aW9uIGdldENsaWVudEJ1aWxkTWFuaWZlc3QoKTogUHJvbWlzZTxDbGllbnRCdWlsZE1hbmlmZXN0PiB7XG4gIGlmIChzZWxmLl9fQlVJTERfTUFOSUZFU1QpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHNlbGYuX19CVUlMRF9NQU5JRkVTVClcbiAgfVxuXG4gIGNvbnN0IG9uQnVpbGRNYW5pZmVzdDogUHJvbWlzZTxDbGllbnRCdWlsZE1hbmlmZXN0PiA9IG5ldyBQcm9taXNlPFxuICAgIENsaWVudEJ1aWxkTWFuaWZlc3RcbiAgPigocmVzb2x2ZSkgPT4ge1xuICAgIC8vIE1hbmRhdG9yeSBiZWNhdXNlIHRoaXMgaXMgbm90IGNvbmN1cnJlbnQgc2FmZTpcbiAgICBjb25zdCBjYiA9IHNlbGYuX19CVUlMRF9NQU5JRkVTVF9DQlxuICAgIHNlbGYuX19CVUlMRF9NQU5JRkVTVF9DQiA9ICgpID0+IHtcbiAgICAgIHJlc29sdmUoc2VsZi5fX0JVSUxEX01BTklGRVNUISlcbiAgICAgIGNiICYmIGNiKClcbiAgICB9XG4gIH0pXG5cbiAgcmV0dXJuIHJlc29sdmVQcm9taXNlV2l0aFRpbWVvdXQ8Q2xpZW50QnVpbGRNYW5pZmVzdD4oXG4gICAgb25CdWlsZE1hbmlmZXN0LFxuICAgIE1TX01BWF9JRExFX0RFTEFZLFxuICAgIG1hcmtBc3NldEVycm9yKG5ldyBFcnJvcignRmFpbGVkIHRvIGxvYWQgY2xpZW50IGJ1aWxkIG1hbmlmZXN0JykpXG4gIClcbn1cblxuaW50ZXJmYWNlIFJvdXRlRmlsZXMge1xuICBzY3JpcHRzOiBzdHJpbmdbXVxuICBjc3M6IHN0cmluZ1tdXG59XG5mdW5jdGlvbiBnZXRGaWxlc0ZvclJvdXRlKFxuICBhc3NldFByZWZpeDogc3RyaW5nLFxuICByb3V0ZTogc3RyaW5nXG4pOiBQcm9taXNlPFJvdXRlRmlsZXM+IHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh7XG4gICAgICBzY3JpcHRzOiBbXG4gICAgICAgIGFzc2V0UHJlZml4ICtcbiAgICAgICAgICAnL19uZXh0L3N0YXRpYy9jaHVua3MvcGFnZXMnICtcbiAgICAgICAgICBlbmNvZGVVUkkoZ2V0QXNzZXRQYXRoRnJvbVJvdXRlKHJvdXRlLCAnLmpzJykpLFxuICAgICAgXSxcbiAgICAgIC8vIFN0eWxlcyBhcmUgaGFuZGxlZCBieSBgc3R5bGUtbG9hZGVyYCBpbiBkZXZlbG9wbWVudDpcbiAgICAgIGNzczogW10sXG4gICAgfSlcbiAgfVxuICByZXR1cm4gZ2V0Q2xpZW50QnVpbGRNYW5pZmVzdCgpLnRoZW4oKG1hbmlmZXN0KSA9PiB7XG4gICAgaWYgKCEocm91dGUgaW4gbWFuaWZlc3QpKSB7XG4gICAgICB0aHJvdyBtYXJrQXNzZXRFcnJvcihuZXcgRXJyb3IoYEZhaWxlZCB0byBsb29rdXAgcm91dGU6ICR7cm91dGV9YCkpXG4gICAgfVxuICAgIGNvbnN0IGFsbEZpbGVzID0gbWFuaWZlc3Rbcm91dGVdLm1hcChcbiAgICAgIChlbnRyeSkgPT4gYXNzZXRQcmVmaXggKyAnL19uZXh0LycgKyBlbmNvZGVVUkkoZW50cnkpXG4gICAgKVxuICAgIHJldHVybiB7XG4gICAgICBzY3JpcHRzOiBhbGxGaWxlcy5maWx0ZXIoKHYpID0+IHYuZW5kc1dpdGgoJy5qcycpKSxcbiAgICAgIGNzczogYWxsRmlsZXMuZmlsdGVyKCh2KSA9PiB2LmVuZHNXaXRoKCcuY3NzJykpLFxuICAgIH1cbiAgfSlcbn1cblxuZnVuY3Rpb24gY3JlYXRlUm91dGVMb2FkZXIoYXNzZXRQcmVmaXg6IHN0cmluZyk6IFJvdXRlTG9hZGVyIHtcbiAgY29uc3QgZW50cnlwb2ludHM6IE1hcDxcbiAgICBzdHJpbmcsXG4gICAgRnV0dXJlPFJvdXRlRW50cnlwb2ludD4gfCBSb3V0ZUVudHJ5cG9pbnRcbiAgPiA9IG5ldyBNYXAoKVxuICBjb25zdCBsb2FkZWRTY3JpcHRzOiBNYXA8c3RyaW5nLCBQcm9taXNlPHVua25vd24+PiA9IG5ldyBNYXAoKVxuICBjb25zdCBzdHlsZVNoZWV0czogTWFwPHN0cmluZywgUHJvbWlzZTxSb3V0ZVN0eWxlU2hlZXQ+PiA9IG5ldyBNYXAoKVxuICBjb25zdCByb3V0ZXM6IE1hcDxcbiAgICBzdHJpbmcsXG4gICAgRnV0dXJlPFJvdXRlTG9hZGVyRW50cnk+IHwgUm91dGVMb2FkZXJFbnRyeVxuICA+ID0gbmV3IE1hcCgpXG5cbiAgZnVuY3Rpb24gbWF5YmVFeGVjdXRlU2NyaXB0KHNyYzogc3RyaW5nKTogUHJvbWlzZTx1bmtub3duPiB7XG4gICAgbGV0IHByb206IFByb21pc2U8dW5rbm93bj4gfCB1bmRlZmluZWQgPSBsb2FkZWRTY3JpcHRzLmdldChzcmMpXG4gICAgaWYgKHByb20pIHtcbiAgICAgIHJldHVybiBwcm9tXG4gICAgfVxuXG4gICAgLy8gU2tpcCBleGVjdXRpbmcgc2NyaXB0IGlmIGl0J3MgYWxyZWFkeSBpbiB0aGUgRE9NOlxuICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBzY3JpcHRbc3JjXj1cIiR7c3JjfVwiXWApKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcbiAgICB9XG5cbiAgICBsb2FkZWRTY3JpcHRzLnNldChzcmMsIChwcm9tID0gYXBwZW5kU2NyaXB0KHNyYykpKVxuICAgIHJldHVybiBwcm9tXG4gIH1cblxuICBmdW5jdGlvbiBmZXRjaFN0eWxlU2hlZXQoaHJlZjogc3RyaW5nKTogUHJvbWlzZTxSb3V0ZVN0eWxlU2hlZXQ+IHtcbiAgICBsZXQgcHJvbTogUHJvbWlzZTxSb3V0ZVN0eWxlU2hlZXQ+IHwgdW5kZWZpbmVkID0gc3R5bGVTaGVldHMuZ2V0KGhyZWYpXG4gICAgaWYgKHByb20pIHtcbiAgICAgIHJldHVybiBwcm9tXG4gICAgfVxuXG4gICAgc3R5bGVTaGVldHMuc2V0KFxuICAgICAgaHJlZixcbiAgICAgIChwcm9tID0gZmV0Y2goaHJlZilcbiAgICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgIGlmICghcmVzLm9rKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEZhaWxlZCB0byBsb2FkIHN0eWxlc2hlZXQ6ICR7aHJlZn1gKVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcmVzLnRleHQoKS50aGVuKCh0ZXh0KSA9PiAoeyBocmVmOiBocmVmLCBjb250ZW50OiB0ZXh0IH0pKVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgIHRocm93IG1hcmtBc3NldEVycm9yKGVycilcbiAgICAgICAgfSkpXG4gICAgKVxuICAgIHJldHVybiBwcm9tXG4gIH1cblxuICByZXR1cm4ge1xuICAgIHdoZW5FbnRyeXBvaW50KHJvdXRlOiBzdHJpbmcpIHtcbiAgICAgIHJldHVybiB3aXRoRnV0dXJlKHJvdXRlLCBlbnRyeXBvaW50cylcbiAgICB9LFxuICAgIG9uRW50cnlwb2ludChyb3V0ZTogc3RyaW5nLCBleGVjdXRlOiAoKSA9PiB1bmtub3duKSB7XG4gICAgICBQcm9taXNlLnJlc29sdmUoZXhlY3V0ZSlcbiAgICAgICAgLnRoZW4oKGZuKSA9PiBmbigpKVxuICAgICAgICAudGhlbihcbiAgICAgICAgICAoZXhwb3J0czogYW55KSA9PiAoe1xuICAgICAgICAgICAgY29tcG9uZW50OiAoZXhwb3J0cyAmJiBleHBvcnRzLmRlZmF1bHQpIHx8IGV4cG9ydHMsXG4gICAgICAgICAgICBleHBvcnRzOiBleHBvcnRzLFxuICAgICAgICAgIH0pLFxuICAgICAgICAgIChlcnIpID0+ICh7IGVycm9yOiBlcnIgfSlcbiAgICAgICAgKVxuICAgICAgICAudGhlbigoaW5wdXQ6IFJvdXRlRW50cnlwb2ludCkgPT4ge1xuICAgICAgICAgIGNvbnN0IG9sZCA9IGVudHJ5cG9pbnRzLmdldChyb3V0ZSlcbiAgICAgICAgICBlbnRyeXBvaW50cy5zZXQocm91dGUsIGlucHV0KVxuICAgICAgICAgIGlmIChvbGQgJiYgJ3Jlc29sdmUnIGluIG9sZCkgb2xkLnJlc29sdmUoaW5wdXQpXG4gICAgICAgIH0pXG4gICAgfSxcbiAgICBsb2FkUm91dGUocm91dGU6IHN0cmluZywgcHJlZmV0Y2g/OiBib29sZWFuKSB7XG4gICAgICByZXR1cm4gd2l0aEZ1dHVyZTxSb3V0ZUxvYWRlckVudHJ5Pihyb3V0ZSwgcm91dGVzLCAoKSA9PiB7XG4gICAgICAgIHJldHVybiByZXNvbHZlUHJvbWlzZVdpdGhUaW1lb3V0KFxuICAgICAgICAgIGdldEZpbGVzRm9yUm91dGUoYXNzZXRQcmVmaXgsIHJvdXRlKVxuICAgICAgICAgICAgLnRoZW4oKHsgc2NyaXB0cywgY3NzIH0pID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgICAgICBlbnRyeXBvaW50cy5oYXMocm91dGUpXG4gICAgICAgICAgICAgICAgICA/IFtdXG4gICAgICAgICAgICAgICAgICA6IFByb21pc2UuYWxsKHNjcmlwdHMubWFwKG1heWJlRXhlY3V0ZVNjcmlwdCkpLFxuICAgICAgICAgICAgICAgIFByb21pc2UuYWxsKGNzcy5tYXAoZmV0Y2hTdHlsZVNoZWV0KSksXG4gICAgICAgICAgICAgIF0gYXMgY29uc3QpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gdGhpcy53aGVuRW50cnlwb2ludChyb3V0ZSkudGhlbigoZW50cnlwb2ludCkgPT4gKHtcbiAgICAgICAgICAgICAgICBlbnRyeXBvaW50LFxuICAgICAgICAgICAgICAgIHN0eWxlczogcmVzWzFdLFxuICAgICAgICAgICAgICB9KSlcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgIE1TX01BWF9JRExFX0RFTEFZLFxuICAgICAgICAgIG1hcmtBc3NldEVycm9yKG5ldyBFcnJvcihgUm91dGUgZGlkIG5vdCBjb21wbGV0ZSBsb2FkaW5nOiAke3JvdXRlfWApKVxuICAgICAgICApXG4gICAgICAgICAgLnRoZW4oKHsgZW50cnlwb2ludCwgc3R5bGVzIH0pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHJlczogUm91dGVMb2FkZXJFbnRyeSA9IE9iamVjdC5hc3NpZ248XG4gICAgICAgICAgICAgIHsgc3R5bGVzOiBSb3V0ZVN0eWxlU2hlZXRbXSB9LFxuICAgICAgICAgICAgICBSb3V0ZUVudHJ5cG9pbnRcbiAgICAgICAgICAgID4oeyBzdHlsZXM6IHN0eWxlcyEgfSwgZW50cnlwb2ludClcbiAgICAgICAgICAgIHJldHVybiAnZXJyb3InIGluIGVudHJ5cG9pbnQgPyBlbnRyeXBvaW50IDogcmVzXG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgaWYgKHByZWZldGNoKSB7XG4gICAgICAgICAgICAgIC8vIHdlIGRvbid0IHdhbnQgdG8gY2FjaGUgZXJyb3JzIGR1cmluZyBwcmVmZXRjaFxuICAgICAgICAgICAgICB0aHJvdyBlcnJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7IGVycm9yOiBlcnIgfVxuICAgICAgICAgIH0pXG4gICAgICB9KVxuICAgIH0sXG4gICAgcHJlZmV0Y2gocm91dGU6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL0dvb2dsZUNocm9tZUxhYnMvcXVpY2tsaW5rL2Jsb2IvNDUzYTY2MWZhMWZhOTQwZTJkMmUwNDQ0NTIzOThlMzhjNjdhOThmYi9zcmMvaW5kZXgubWpzI0wxMTUtTDExOFxuICAgICAgLy8gTGljZW5zZTogQXBhY2hlIDIuMFxuICAgICAgbGV0IGNuXG4gICAgICBpZiAoKGNuID0gKG5hdmlnYXRvciBhcyBhbnkpLmNvbm5lY3Rpb24pKSB7XG4gICAgICAgIC8vIERvbid0IHByZWZldGNoIGlmIHVzaW5nIDJHIG9yIGlmIFNhdmUtRGF0YSBpcyBlbmFibGVkLlxuICAgICAgICBpZiAoY24uc2F2ZURhdGEgfHwgLzJnLy50ZXN0KGNuLmVmZmVjdGl2ZVR5cGUpKSByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcbiAgICAgIH1cbiAgICAgIHJldHVybiBnZXRGaWxlc0ZvclJvdXRlKGFzc2V0UHJlZml4LCByb3V0ZSlcbiAgICAgICAgLnRoZW4oKG91dHB1dCkgPT5cbiAgICAgICAgICBQcm9taXNlLmFsbChcbiAgICAgICAgICAgIGNhblByZWZldGNoXG4gICAgICAgICAgICAgID8gb3V0cHV0LnNjcmlwdHMubWFwKChzY3JpcHQpID0+IHByZWZldGNoVmlhRG9tKHNjcmlwdCwgJ3NjcmlwdCcpKVxuICAgICAgICAgICAgICA6IFtdXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICByZXF1ZXN0SWRsZUNhbGxiYWNrKCgpID0+IHRoaXMubG9hZFJvdXRlKHJvdXRlLCB0cnVlKS5jYXRjaCgoKSA9PiB7fSkpXG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChcbiAgICAgICAgICAvLyBzd2FsbG93IHByZWZldGNoIGVycm9yc1xuICAgICAgICAgICgpID0+IHt9XG4gICAgICAgIClcbiAgICB9LFxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVJvdXRlTG9hZGVyXG4iLCIvKiBnbG9iYWwgd2luZG93ICovXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgUm91dGVyLCB7IE5leHRSb3V0ZXIgfSBmcm9tICcuLi9uZXh0LXNlcnZlci9saWIvcm91dGVyL3JvdXRlcidcbmltcG9ydCB7IFJvdXRlckNvbnRleHQgfSBmcm9tICcuLi9uZXh0LXNlcnZlci9saWIvcm91dGVyLWNvbnRleHQnXG5cbnR5cGUgQ2xhc3NBcmd1bWVudHM8VD4gPSBUIGV4dGVuZHMgbmV3ICguLi5hcmdzOiBpbmZlciBVKSA9PiBhbnkgPyBVIDogYW55XG5cbnR5cGUgUm91dGVyQXJncyA9IENsYXNzQXJndW1lbnRzPHR5cGVvZiBSb3V0ZXI+XG5cbnR5cGUgU2luZ2xldG9uUm91dGVyQmFzZSA9IHtcbiAgcm91dGVyOiBSb3V0ZXIgfCBudWxsXG4gIHJlYWR5Q2FsbGJhY2tzOiBBcnJheTwoKSA9PiBhbnk+XG4gIHJlYWR5KGNiOiAoKSA9PiBhbnkpOiB2b2lkXG59XG5cbmV4cG9ydCB7IFJvdXRlciwgTmV4dFJvdXRlciB9XG5cbmV4cG9ydCB0eXBlIFNpbmdsZXRvblJvdXRlciA9IFNpbmdsZXRvblJvdXRlckJhc2UgJiBOZXh0Um91dGVyXG5cbmNvbnN0IHNpbmdsZXRvblJvdXRlcjogU2luZ2xldG9uUm91dGVyQmFzZSA9IHtcbiAgcm91dGVyOiBudWxsLCAvLyBob2xkcyB0aGUgYWN0dWFsIHJvdXRlciBpbnN0YW5jZVxuICByZWFkeUNhbGxiYWNrczogW10sXG4gIHJlYWR5KGNiOiAoKSA9PiB2b2lkKSB7XG4gICAgaWYgKHRoaXMucm91dGVyKSByZXR1cm4gY2IoKVxuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhpcy5yZWFkeUNhbGxiYWNrcy5wdXNoKGNiKVxuICAgIH1cbiAgfSxcbn1cblxuLy8gQ3JlYXRlIHB1YmxpYyBwcm9wZXJ0aWVzIGFuZCBtZXRob2RzIG9mIHRoZSByb3V0ZXIgaW4gdGhlIHNpbmdsZXRvblJvdXRlclxuY29uc3QgdXJsUHJvcGVydHlGaWVsZHMgPSBbXG4gICdwYXRobmFtZScsXG4gICdyb3V0ZScsXG4gICdxdWVyeScsXG4gICdhc1BhdGgnLFxuICAnY29tcG9uZW50cycsXG4gICdpc0ZhbGxiYWNrJyxcbiAgJ2Jhc2VQYXRoJyxcbiAgJ2xvY2FsZScsXG4gICdsb2NhbGVzJyxcbiAgJ2RlZmF1bHRMb2NhbGUnLFxuICAnaXNSZWFkeScsXG4gICdpc1ByZXZpZXcnLFxuICAnaXNMb2NhbGVEb21haW4nLFxuXVxuY29uc3Qgcm91dGVyRXZlbnRzID0gW1xuICAncm91dGVDaGFuZ2VTdGFydCcsXG4gICdiZWZvcmVIaXN0b3J5Q2hhbmdlJyxcbiAgJ3JvdXRlQ2hhbmdlQ29tcGxldGUnLFxuICAncm91dGVDaGFuZ2VFcnJvcicsXG4gICdoYXNoQ2hhbmdlU3RhcnQnLFxuICAnaGFzaENoYW5nZUNvbXBsZXRlJyxcbl1cbmNvbnN0IGNvcmVNZXRob2RGaWVsZHMgPSBbXG4gICdwdXNoJyxcbiAgJ3JlcGxhY2UnLFxuICAncmVsb2FkJyxcbiAgJ2JhY2snLFxuICAncHJlZmV0Y2gnLFxuICAnYmVmb3JlUG9wU3RhdGUnLFxuXVxuXG4vLyBFdmVudHMgaXMgYSBzdGF0aWMgcHJvcGVydHkgb24gdGhlIHJvdXRlciwgdGhlIHJvdXRlciBkb2Vzbid0IGhhdmUgdG8gYmUgaW5pdGlhbGl6ZWQgdG8gdXNlIGl0XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoc2luZ2xldG9uUm91dGVyLCAnZXZlbnRzJywge1xuICBnZXQoKSB7XG4gICAgcmV0dXJuIFJvdXRlci5ldmVudHNcbiAgfSxcbn0pXG5cbnVybFByb3BlcnR5RmllbGRzLmZvckVhY2goKGZpZWxkOiBzdHJpbmcpID0+IHtcbiAgLy8gSGVyZSB3ZSBuZWVkIHRvIHVzZSBPYmplY3QuZGVmaW5lUHJvcGVydHkgYmVjYXVzZSwgd2UgbmVlZCB0byByZXR1cm5cbiAgLy8gdGhlIHByb3BlcnR5IGFzc2lnbmVkIHRvIHRoZSBhY3R1YWwgcm91dGVyXG4gIC8vIFRoZSB2YWx1ZSBtaWdodCBnZXQgY2hhbmdlZCBhcyB3ZSBjaGFuZ2Ugcm91dGVzIGFuZCB0aGlzIGlzIHRoZVxuICAvLyBwcm9wZXIgd2F5IHRvIGFjY2VzcyBpdFxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoc2luZ2xldG9uUm91dGVyLCBmaWVsZCwge1xuICAgIGdldCgpIHtcbiAgICAgIGNvbnN0IHJvdXRlciA9IGdldFJvdXRlcigpIGFzIGFueVxuICAgICAgcmV0dXJuIHJvdXRlcltmaWVsZF0gYXMgc3RyaW5nXG4gICAgfSxcbiAgfSlcbn0pXG5cbmNvcmVNZXRob2RGaWVsZHMuZm9yRWFjaCgoZmllbGQ6IHN0cmluZykgPT4ge1xuICAvLyBXZSBkb24ndCByZWFsbHkga25vdyB0aGUgdHlwZXMgaGVyZSwgc28gd2UgYWRkIHRoZW0gbGF0ZXIgaW5zdGVhZFxuICA7KHNpbmdsZXRvblJvdXRlciBhcyBhbnkpW2ZpZWxkXSA9ICguLi5hcmdzOiBhbnlbXSkgPT4ge1xuICAgIGNvbnN0IHJvdXRlciA9IGdldFJvdXRlcigpIGFzIGFueVxuICAgIHJldHVybiByb3V0ZXJbZmllbGRdKC4uLmFyZ3MpXG4gIH1cbn0pXG5cbnJvdXRlckV2ZW50cy5mb3JFYWNoKChldmVudDogc3RyaW5nKSA9PiB7XG4gIHNpbmdsZXRvblJvdXRlci5yZWFkeSgoKSA9PiB7XG4gICAgUm91dGVyLmV2ZW50cy5vbihldmVudCwgKC4uLmFyZ3MpID0+IHtcbiAgICAgIGNvbnN0IGV2ZW50RmllbGQgPSBgb24ke2V2ZW50LmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpfSR7ZXZlbnQuc3Vic3RyaW5nKFxuICAgICAgICAxXG4gICAgICApfWBcbiAgICAgIGNvbnN0IF9zaW5nbGV0b25Sb3V0ZXIgPSBzaW5nbGV0b25Sb3V0ZXIgYXMgYW55XG4gICAgICBpZiAoX3NpbmdsZXRvblJvdXRlcltldmVudEZpZWxkXSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIF9zaW5nbGV0b25Sb3V0ZXJbZXZlbnRGaWVsZF0oLi4uYXJncylcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihgRXJyb3Igd2hlbiBydW5uaW5nIHRoZSBSb3V0ZXIgZXZlbnQ6ICR7ZXZlbnRGaWVsZH1gKVxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYCR7ZXJyLm1lc3NhZ2V9XFxuJHtlcnIuc3RhY2t9YClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gIH0pXG59KVxuXG5mdW5jdGlvbiBnZXRSb3V0ZXIoKTogUm91dGVyIHtcbiAgaWYgKCFzaW5nbGV0b25Sb3V0ZXIucm91dGVyKSB7XG4gICAgY29uc3QgbWVzc2FnZSA9XG4gICAgICAnTm8gcm91dGVyIGluc3RhbmNlIGZvdW5kLlxcbicgK1xuICAgICAgJ1lvdSBzaG91bGQgb25seSB1c2UgXCJuZXh0L3JvdXRlclwiIGluc2lkZSB0aGUgY2xpZW50IHNpZGUgb2YgeW91ciBhcHAuXFxuJ1xuICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKVxuICB9XG4gIHJldHVybiBzaW5nbGV0b25Sb3V0ZXIucm91dGVyXG59XG5cbi8vIEV4cG9ydCB0aGUgc2luZ2xldG9uUm91dGVyIGFuZCB0aGlzIGlzIHRoZSBwdWJsaWMgQVBJLlxuZXhwb3J0IGRlZmF1bHQgc2luZ2xldG9uUm91dGVyIGFzIFNpbmdsZXRvblJvdXRlclxuXG4vLyBSZWV4cG9ydCB0aGUgd2l0aFJvdXRlIEhPQ1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB3aXRoUm91dGVyIH0gZnJvbSAnLi93aXRoLXJvdXRlcidcblxuZXhwb3J0IGZ1bmN0aW9uIHVzZVJvdXRlcigpOiBOZXh0Um91dGVyIHtcbiAgcmV0dXJuIFJlYWN0LnVzZUNvbnRleHQoUm91dGVyQ29udGV4dClcbn1cblxuLy8gSU5URVJOQUwgQVBJU1xuLy8gLS0tLS0tLS0tLS0tLVxuLy8gKGRvIG5vdCB1c2UgZm9sbG93aW5nIGV4cG9ydHMgaW5zaWRlIHRoZSBhcHApXG5cbi8vIENyZWF0ZSBhIHJvdXRlciBhbmQgYXNzaWduIGl0IGFzIHRoZSBzaW5nbGV0b24gaW5zdGFuY2UuXG4vLyBUaGlzIGlzIHVzZWQgaW4gY2xpZW50IHNpZGUgd2hlbiB3ZSBhcmUgaW5pdGlsaXppbmcgdGhlIGFwcC5cbi8vIFRoaXMgc2hvdWxkICoqbm90KiogdXNlIGluc2lkZSB0aGUgc2VydmVyLlxuZXhwb3J0IGNvbnN0IGNyZWF0ZVJvdXRlciA9ICguLi5hcmdzOiBSb3V0ZXJBcmdzKTogUm91dGVyID0+IHtcbiAgc2luZ2xldG9uUm91dGVyLnJvdXRlciA9IG5ldyBSb3V0ZXIoLi4uYXJncylcbiAgc2luZ2xldG9uUm91dGVyLnJlYWR5Q2FsbGJhY2tzLmZvckVhY2goKGNiKSA9PiBjYigpKVxuICBzaW5nbGV0b25Sb3V0ZXIucmVhZHlDYWxsYmFja3MgPSBbXVxuXG4gIHJldHVybiBzaW5nbGV0b25Sb3V0ZXIucm91dGVyXG59XG5cbi8vIFRoaXMgZnVuY3Rpb24gaXMgdXNlZCB0byBjcmVhdGUgdGhlIGB3aXRoUm91dGVyYCByb3V0ZXIgaW5zdGFuY2VcbmV4cG9ydCBmdW5jdGlvbiBtYWtlUHVibGljUm91dGVySW5zdGFuY2Uocm91dGVyOiBSb3V0ZXIpOiBOZXh0Um91dGVyIHtcbiAgY29uc3QgX3JvdXRlciA9IHJvdXRlciBhcyBhbnlcbiAgY29uc3QgaW5zdGFuY2UgPSB7fSBhcyBhbnlcblxuICBmb3IgKGNvbnN0IHByb3BlcnR5IG9mIHVybFByb3BlcnR5RmllbGRzKSB7XG4gICAgaWYgKHR5cGVvZiBfcm91dGVyW3Byb3BlcnR5XSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGluc3RhbmNlW3Byb3BlcnR5XSA9IE9iamVjdC5hc3NpZ24oXG4gICAgICAgIEFycmF5LmlzQXJyYXkoX3JvdXRlcltwcm9wZXJ0eV0pID8gW10gOiB7fSxcbiAgICAgICAgX3JvdXRlcltwcm9wZXJ0eV1cbiAgICAgICkgLy8gbWFrZXMgc3VyZSBxdWVyeSBpcyBub3Qgc3RhdGVmdWxcbiAgICAgIGNvbnRpbnVlXG4gICAgfVxuXG4gICAgaW5zdGFuY2VbcHJvcGVydHldID0gX3JvdXRlcltwcm9wZXJ0eV1cbiAgfVxuXG4gIC8vIEV2ZW50cyBpcyBhIHN0YXRpYyBwcm9wZXJ0eSBvbiB0aGUgcm91dGVyLCB0aGUgcm91dGVyIGRvZXNuJ3QgaGF2ZSB0byBiZSBpbml0aWFsaXplZCB0byB1c2UgaXRcbiAgaW5zdGFuY2UuZXZlbnRzID0gUm91dGVyLmV2ZW50c1xuXG4gIGNvcmVNZXRob2RGaWVsZHMuZm9yRWFjaCgoZmllbGQpID0+IHtcbiAgICBpbnN0YW5jZVtmaWVsZF0gPSAoLi4uYXJnczogYW55W10pID0+IHtcbiAgICAgIHJldHVybiBfcm91dGVyW2ZpZWxkXSguLi5hcmdzKVxuICAgIH1cbiAgfSlcblxuICByZXR1cm4gaW5zdGFuY2Vcbn1cbiIsImltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7XG4gIHJlcXVlc3RJZGxlQ2FsbGJhY2ssXG4gIGNhbmNlbElkbGVDYWxsYmFjayxcbn0gZnJvbSAnLi9yZXF1ZXN0LWlkbGUtY2FsbGJhY2snXG5cbnR5cGUgVXNlSW50ZXJzZWN0aW9uT2JzZXJ2ZXJJbml0ID0gUGljazxJbnRlcnNlY3Rpb25PYnNlcnZlckluaXQsICdyb290TWFyZ2luJz5cbnR5cGUgVXNlSW50ZXJzZWN0aW9uID0geyBkaXNhYmxlZD86IGJvb2xlYW4gfSAmIFVzZUludGVyc2VjdGlvbk9ic2VydmVySW5pdFxudHlwZSBPYnNlcnZlQ2FsbGJhY2sgPSAoaXNWaXNpYmxlOiBib29sZWFuKSA9PiB2b2lkXG50eXBlIE9ic2VydmVyID0ge1xuICBpZDogc3RyaW5nXG4gIG9ic2VydmVyOiBJbnRlcnNlY3Rpb25PYnNlcnZlclxuICBlbGVtZW50czogTWFwPEVsZW1lbnQsIE9ic2VydmVDYWxsYmFjaz5cbn1cblxuY29uc3QgaGFzSW50ZXJzZWN0aW9uT2JzZXJ2ZXIgPSB0eXBlb2YgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIgIT09ICd1bmRlZmluZWQnXG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VJbnRlcnNlY3Rpb248VCBleHRlbmRzIEVsZW1lbnQ+KHtcbiAgcm9vdE1hcmdpbixcbiAgZGlzYWJsZWQsXG59OiBVc2VJbnRlcnNlY3Rpb24pOiBbKGVsZW1lbnQ6IFQgfCBudWxsKSA9PiB2b2lkLCBib29sZWFuXSB7XG4gIGNvbnN0IGlzRGlzYWJsZWQ6IGJvb2xlYW4gPSBkaXNhYmxlZCB8fCAhaGFzSW50ZXJzZWN0aW9uT2JzZXJ2ZXJcblxuICBjb25zdCB1bm9ic2VydmUgPSB1c2VSZWY8RnVuY3Rpb24+KClcbiAgY29uc3QgW3Zpc2libGUsIHNldFZpc2libGVdID0gdXNlU3RhdGUoZmFsc2UpXG5cbiAgY29uc3Qgc2V0UmVmID0gdXNlQ2FsbGJhY2soXG4gICAgKGVsOiBUIHwgbnVsbCkgPT4ge1xuICAgICAgaWYgKHVub2JzZXJ2ZS5jdXJyZW50KSB7XG4gICAgICAgIHVub2JzZXJ2ZS5jdXJyZW50KClcbiAgICAgICAgdW5vYnNlcnZlLmN1cnJlbnQgPSB1bmRlZmluZWRcbiAgICAgIH1cblxuICAgICAgaWYgKGlzRGlzYWJsZWQgfHwgdmlzaWJsZSkgcmV0dXJuXG5cbiAgICAgIGlmIChlbCAmJiBlbC50YWdOYW1lKSB7XG4gICAgICAgIHVub2JzZXJ2ZS5jdXJyZW50ID0gb2JzZXJ2ZShcbiAgICAgICAgICBlbCxcbiAgICAgICAgICAoaXNWaXNpYmxlKSA9PiBpc1Zpc2libGUgJiYgc2V0VmlzaWJsZShpc1Zpc2libGUpLFxuICAgICAgICAgIHsgcm9vdE1hcmdpbiB9XG4gICAgICAgIClcbiAgICAgIH1cbiAgICB9LFxuICAgIFtpc0Rpc2FibGVkLCByb290TWFyZ2luLCB2aXNpYmxlXVxuICApXG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWhhc0ludGVyc2VjdGlvbk9ic2VydmVyKSB7XG4gICAgICBpZiAoIXZpc2libGUpIHtcbiAgICAgICAgY29uc3QgaWRsZUNhbGxiYWNrID0gcmVxdWVzdElkbGVDYWxsYmFjaygoKSA9PiBzZXRWaXNpYmxlKHRydWUpKVxuICAgICAgICByZXR1cm4gKCkgPT4gY2FuY2VsSWRsZUNhbGxiYWNrKGlkbGVDYWxsYmFjaylcbiAgICAgIH1cbiAgICB9XG4gIH0sIFt2aXNpYmxlXSlcblxuICByZXR1cm4gW3NldFJlZiwgdmlzaWJsZV1cbn1cblxuZnVuY3Rpb24gb2JzZXJ2ZShcbiAgZWxlbWVudDogRWxlbWVudCxcbiAgY2FsbGJhY2s6IE9ic2VydmVDYWxsYmFjayxcbiAgb3B0aW9uczogVXNlSW50ZXJzZWN0aW9uT2JzZXJ2ZXJJbml0XG4pOiAoKSA9PiB2b2lkIHtcbiAgY29uc3QgeyBpZCwgb2JzZXJ2ZXIsIGVsZW1lbnRzIH0gPSBjcmVhdGVPYnNlcnZlcihvcHRpb25zKVxuICBlbGVtZW50cy5zZXQoZWxlbWVudCwgY2FsbGJhY2spXG5cbiAgb2JzZXJ2ZXIub2JzZXJ2ZShlbGVtZW50KVxuICByZXR1cm4gZnVuY3Rpb24gdW5vYnNlcnZlKCk6IHZvaWQge1xuICAgIGVsZW1lbnRzLmRlbGV0ZShlbGVtZW50KVxuICAgIG9ic2VydmVyLnVub2JzZXJ2ZShlbGVtZW50KVxuXG4gICAgLy8gRGVzdHJveSBvYnNlcnZlciB3aGVuIHRoZXJlJ3Mgbm90aGluZyBsZWZ0IHRvIHdhdGNoOlxuICAgIGlmIChlbGVtZW50cy5zaXplID09PSAwKSB7XG4gICAgICBvYnNlcnZlci5kaXNjb25uZWN0KClcbiAgICAgIG9ic2VydmVycy5kZWxldGUoaWQpXG4gICAgfVxuICB9XG59XG5cbmNvbnN0IG9ic2VydmVycyA9IG5ldyBNYXA8c3RyaW5nLCBPYnNlcnZlcj4oKVxuZnVuY3Rpb24gY3JlYXRlT2JzZXJ2ZXIob3B0aW9uczogVXNlSW50ZXJzZWN0aW9uT2JzZXJ2ZXJJbml0KTogT2JzZXJ2ZXIge1xuICBjb25zdCBpZCA9IG9wdGlvbnMucm9vdE1hcmdpbiB8fCAnJ1xuICBsZXQgaW5zdGFuY2UgPSBvYnNlcnZlcnMuZ2V0KGlkKVxuICBpZiAoaW5zdGFuY2UpIHtcbiAgICByZXR1cm4gaW5zdGFuY2VcbiAgfVxuXG4gIGNvbnN0IGVsZW1lbnRzID0gbmV3IE1hcDxFbGVtZW50LCBPYnNlcnZlQ2FsbGJhY2s+KClcbiAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoKGVudHJpZXMpID0+IHtcbiAgICBlbnRyaWVzLmZvckVhY2goKGVudHJ5KSA9PiB7XG4gICAgICBjb25zdCBjYWxsYmFjayA9IGVsZW1lbnRzLmdldChlbnRyeS50YXJnZXQpXG4gICAgICBjb25zdCBpc1Zpc2libGUgPSBlbnRyeS5pc0ludGVyc2VjdGluZyB8fCBlbnRyeS5pbnRlcnNlY3Rpb25SYXRpbyA+IDBcbiAgICAgIGlmIChjYWxsYmFjayAmJiBpc1Zpc2libGUpIHtcbiAgICAgICAgY2FsbGJhY2soaXNWaXNpYmxlKVxuICAgICAgfVxuICAgIH0pXG4gIH0sIG9wdGlvbnMpXG5cbiAgb2JzZXJ2ZXJzLnNldChcbiAgICBpZCxcbiAgICAoaW5zdGFuY2UgPSB7XG4gICAgICBpZCxcbiAgICAgIG9ic2VydmVyLFxuICAgICAgZWxlbWVudHMsXG4gICAgfSlcbiAgKVxuICByZXR1cm4gaW5zdGFuY2Vcbn1cbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IE5leHRDb21wb25lbnRUeXBlLCBOZXh0UGFnZUNvbnRleHQgfSBmcm9tICcuLi9uZXh0LXNlcnZlci9saWIvdXRpbHMnXG5pbXBvcnQgeyBOZXh0Um91dGVyLCB1c2VSb3V0ZXIgfSBmcm9tICcuL3JvdXRlcidcblxuZXhwb3J0IHR5cGUgV2l0aFJvdXRlclByb3BzID0ge1xuICByb3V0ZXI6IE5leHRSb3V0ZXJcbn1cblxuZXhwb3J0IHR5cGUgRXhjbHVkZVJvdXRlclByb3BzPFA+ID0gUGljazxcbiAgUCxcbiAgRXhjbHVkZTxrZXlvZiBQLCBrZXlvZiBXaXRoUm91dGVyUHJvcHM+XG4+XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHdpdGhSb3V0ZXI8XG4gIFAgZXh0ZW5kcyBXaXRoUm91dGVyUHJvcHMsXG4gIEMgPSBOZXh0UGFnZUNvbnRleHRcbj4oXG4gIENvbXBvc2VkQ29tcG9uZW50OiBOZXh0Q29tcG9uZW50VHlwZTxDLCBhbnksIFA+XG4pOiBSZWFjdC5Db21wb25lbnRUeXBlPEV4Y2x1ZGVSb3V0ZXJQcm9wczxQPj4ge1xuICBmdW5jdGlvbiBXaXRoUm91dGVyV3JhcHBlcihwcm9wczogYW55KTogSlNYLkVsZW1lbnQge1xuICAgIHJldHVybiA8Q29tcG9zZWRDb21wb25lbnQgcm91dGVyPXt1c2VSb3V0ZXIoKX0gey4uLnByb3BzfSAvPlxuICB9XG5cbiAgV2l0aFJvdXRlcldyYXBwZXIuZ2V0SW5pdGlhbFByb3BzID0gQ29tcG9zZWRDb21wb25lbnQuZ2V0SW5pdGlhbFByb3BzXG4gIC8vIFRoaXMgaXMgbmVlZGVkIHRvIGFsbG93IGNoZWNraW5nIGZvciBjdXN0b20gZ2V0SW5pdGlhbFByb3BzIGluIF9hcHBcbiAgOyhXaXRoUm91dGVyV3JhcHBlciBhcyBhbnkpLm9yaWdHZXRJbml0aWFsUHJvcHMgPSAoQ29tcG9zZWRDb21wb25lbnQgYXMgYW55KS5vcmlnR2V0SW5pdGlhbFByb3BzXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgY29uc3QgbmFtZSA9XG4gICAgICBDb21wb3NlZENvbXBvbmVudC5kaXNwbGF5TmFtZSB8fCBDb21wb3NlZENvbXBvbmVudC5uYW1lIHx8ICdVbmtub3duJ1xuICAgIFdpdGhSb3V0ZXJXcmFwcGVyLmRpc3BsYXlOYW1lID0gYHdpdGhSb3V0ZXIoJHtuYW1lfSlgXG4gIH1cblxuICByZXR1cm4gV2l0aFJvdXRlcldyYXBwZXJcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBUb2tlbml6ZSBpbnB1dCBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIGxleGVyKHN0cikge1xuICAgIHZhciB0b2tlbnMgPSBbXTtcbiAgICB2YXIgaSA9IDA7XG4gICAgd2hpbGUgKGkgPCBzdHIubGVuZ3RoKSB7XG4gICAgICAgIHZhciBjaGFyID0gc3RyW2ldO1xuICAgICAgICBpZiAoY2hhciA9PT0gXCIqXCIgfHwgY2hhciA9PT0gXCIrXCIgfHwgY2hhciA9PT0gXCI/XCIpIHtcbiAgICAgICAgICAgIHRva2Vucy5wdXNoKHsgdHlwZTogXCJNT0RJRklFUlwiLCBpbmRleDogaSwgdmFsdWU6IHN0cltpKytdIH0pO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoYXIgPT09IFwiXFxcXFwiKSB7XG4gICAgICAgICAgICB0b2tlbnMucHVzaCh7IHR5cGU6IFwiRVNDQVBFRF9DSEFSXCIsIGluZGV4OiBpKyssIHZhbHVlOiBzdHJbaSsrXSB9KTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjaGFyID09PSBcIntcIikge1xuICAgICAgICAgICAgdG9rZW5zLnB1c2goeyB0eXBlOiBcIk9QRU5cIiwgaW5kZXg6IGksIHZhbHVlOiBzdHJbaSsrXSB9KTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjaGFyID09PSBcIn1cIikge1xuICAgICAgICAgICAgdG9rZW5zLnB1c2goeyB0eXBlOiBcIkNMT1NFXCIsIGluZGV4OiBpLCB2YWx1ZTogc3RyW2krK10gfSk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2hhciA9PT0gXCI6XCIpIHtcbiAgICAgICAgICAgIHZhciBuYW1lID0gXCJcIjtcbiAgICAgICAgICAgIHZhciBqID0gaSArIDE7XG4gICAgICAgICAgICB3aGlsZSAoaiA8IHN0ci5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB2YXIgY29kZSA9IHN0ci5jaGFyQ29kZUF0KGopO1xuICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAvLyBgMC05YFxuICAgICAgICAgICAgICAgIChjb2RlID49IDQ4ICYmIGNvZGUgPD0gNTcpIHx8XG4gICAgICAgICAgICAgICAgICAgIC8vIGBBLVpgXG4gICAgICAgICAgICAgICAgICAgIChjb2RlID49IDY1ICYmIGNvZGUgPD0gOTApIHx8XG4gICAgICAgICAgICAgICAgICAgIC8vIGBhLXpgXG4gICAgICAgICAgICAgICAgICAgIChjb2RlID49IDk3ICYmIGNvZGUgPD0gMTIyKSB8fFxuICAgICAgICAgICAgICAgICAgICAvLyBgX2BcbiAgICAgICAgICAgICAgICAgICAgY29kZSA9PT0gOTUpIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZSArPSBzdHJbaisrXTtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFuYW1lKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJNaXNzaW5nIHBhcmFtZXRlciBuYW1lIGF0IFwiICsgaSk7XG4gICAgICAgICAgICB0b2tlbnMucHVzaCh7IHR5cGU6IFwiTkFNRVwiLCBpbmRleDogaSwgdmFsdWU6IG5hbWUgfSk7XG4gICAgICAgICAgICBpID0gajtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjaGFyID09PSBcIihcIikge1xuICAgICAgICAgICAgdmFyIGNvdW50ID0gMTtcbiAgICAgICAgICAgIHZhciBwYXR0ZXJuID0gXCJcIjtcbiAgICAgICAgICAgIHZhciBqID0gaSArIDE7XG4gICAgICAgICAgICBpZiAoc3RyW2pdID09PSBcIj9cIikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQYXR0ZXJuIGNhbm5vdCBzdGFydCB3aXRoIFxcXCI/XFxcIiBhdCBcIiArIGopO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2hpbGUgKGogPCBzdHIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN0cltqXSA9PT0gXCJcXFxcXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgcGF0dGVybiArPSBzdHJbaisrXSArIHN0cltqKytdO1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHN0cltqXSA9PT0gXCIpXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgY291bnQtLTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvdW50ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBqKys7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChzdHJbal0gPT09IFwiKFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdHJbaiArIDFdICE9PSBcIj9cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhcHR1cmluZyBncm91cHMgYXJlIG5vdCBhbGxvd2VkIGF0IFwiICsgaik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcGF0dGVybiArPSBzdHJbaisrXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjb3VudClcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiVW5iYWxhbmNlZCBwYXR0ZXJuIGF0IFwiICsgaSk7XG4gICAgICAgICAgICBpZiAoIXBhdHRlcm4pXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIk1pc3NpbmcgcGF0dGVybiBhdCBcIiArIGkpO1xuICAgICAgICAgICAgdG9rZW5zLnB1c2goeyB0eXBlOiBcIlBBVFRFUk5cIiwgaW5kZXg6IGksIHZhbHVlOiBwYXR0ZXJuIH0pO1xuICAgICAgICAgICAgaSA9IGo7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICB0b2tlbnMucHVzaCh7IHR5cGU6IFwiQ0hBUlwiLCBpbmRleDogaSwgdmFsdWU6IHN0cltpKytdIH0pO1xuICAgIH1cbiAgICB0b2tlbnMucHVzaCh7IHR5cGU6IFwiRU5EXCIsIGluZGV4OiBpLCB2YWx1ZTogXCJcIiB9KTtcbiAgICByZXR1cm4gdG9rZW5zO1xufVxuLyoqXG4gKiBQYXJzZSBhIHN0cmluZyBmb3IgdGhlIHJhdyB0b2tlbnMuXG4gKi9cbmZ1bmN0aW9uIHBhcnNlKHN0ciwgb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IHt9OyB9XG4gICAgdmFyIHRva2VucyA9IGxleGVyKHN0cik7XG4gICAgdmFyIF9hID0gb3B0aW9ucy5wcmVmaXhlcywgcHJlZml4ZXMgPSBfYSA9PT0gdm9pZCAwID8gXCIuL1wiIDogX2E7XG4gICAgdmFyIGRlZmF1bHRQYXR0ZXJuID0gXCJbXlwiICsgZXNjYXBlU3RyaW5nKG9wdGlvbnMuZGVsaW1pdGVyIHx8IFwiLyM/XCIpICsgXCJdKz9cIjtcbiAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgdmFyIGtleSA9IDA7XG4gICAgdmFyIGkgPSAwO1xuICAgIHZhciBwYXRoID0gXCJcIjtcbiAgICB2YXIgdHJ5Q29uc3VtZSA9IGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgICAgIGlmIChpIDwgdG9rZW5zLmxlbmd0aCAmJiB0b2tlbnNbaV0udHlwZSA9PT0gdHlwZSlcbiAgICAgICAgICAgIHJldHVybiB0b2tlbnNbaSsrXS52YWx1ZTtcbiAgICB9O1xuICAgIHZhciBtdXN0Q29uc3VtZSA9IGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IHRyeUNvbnN1bWUodHlwZSk7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB2YXIgX2EgPSB0b2tlbnNbaV0sIG5leHRUeXBlID0gX2EudHlwZSwgaW5kZXggPSBfYS5pbmRleDtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlVuZXhwZWN0ZWQgXCIgKyBuZXh0VHlwZSArIFwiIGF0IFwiICsgaW5kZXggKyBcIiwgZXhwZWN0ZWQgXCIgKyB0eXBlKTtcbiAgICB9O1xuICAgIHZhciBjb25zdW1lVGV4dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IFwiXCI7XG4gICAgICAgIHZhciB2YWx1ZTtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lXG4gICAgICAgIHdoaWxlICgodmFsdWUgPSB0cnlDb25zdW1lKFwiQ0hBUlwiKSB8fCB0cnlDb25zdW1lKFwiRVNDQVBFRF9DSEFSXCIpKSkge1xuICAgICAgICAgICAgcmVzdWx0ICs9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgICB3aGlsZSAoaSA8IHRva2Vucy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGNoYXIgPSB0cnlDb25zdW1lKFwiQ0hBUlwiKTtcbiAgICAgICAgdmFyIG5hbWUgPSB0cnlDb25zdW1lKFwiTkFNRVwiKTtcbiAgICAgICAgdmFyIHBhdHRlcm4gPSB0cnlDb25zdW1lKFwiUEFUVEVSTlwiKTtcbiAgICAgICAgaWYgKG5hbWUgfHwgcGF0dGVybikge1xuICAgICAgICAgICAgdmFyIHByZWZpeCA9IGNoYXIgfHwgXCJcIjtcbiAgICAgICAgICAgIGlmIChwcmVmaXhlcy5pbmRleE9mKHByZWZpeCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgcGF0aCArPSBwcmVmaXg7XG4gICAgICAgICAgICAgICAgcHJlZml4ID0gXCJcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwYXRoKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2gocGF0aCk7XG4gICAgICAgICAgICAgICAgcGF0aCA9IFwiXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXN1bHQucHVzaCh7XG4gICAgICAgICAgICAgICAgbmFtZTogbmFtZSB8fCBrZXkrKyxcbiAgICAgICAgICAgICAgICBwcmVmaXg6IHByZWZpeCxcbiAgICAgICAgICAgICAgICBzdWZmaXg6IFwiXCIsXG4gICAgICAgICAgICAgICAgcGF0dGVybjogcGF0dGVybiB8fCBkZWZhdWx0UGF0dGVybixcbiAgICAgICAgICAgICAgICBtb2RpZmllcjogdHJ5Q29uc3VtZShcIk1PRElGSUVSXCIpIHx8IFwiXCJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHZhbHVlID0gY2hhciB8fCB0cnlDb25zdW1lKFwiRVNDQVBFRF9DSEFSXCIpO1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHBhdGggKz0gdmFsdWU7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGF0aCkge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2gocGF0aCk7XG4gICAgICAgICAgICBwYXRoID0gXCJcIjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgb3BlbiA9IHRyeUNvbnN1bWUoXCJPUEVOXCIpO1xuICAgICAgICBpZiAob3Blbikge1xuICAgICAgICAgICAgdmFyIHByZWZpeCA9IGNvbnN1bWVUZXh0KCk7XG4gICAgICAgICAgICB2YXIgbmFtZV8xID0gdHJ5Q29uc3VtZShcIk5BTUVcIikgfHwgXCJcIjtcbiAgICAgICAgICAgIHZhciBwYXR0ZXJuXzEgPSB0cnlDb25zdW1lKFwiUEFUVEVSTlwiKSB8fCBcIlwiO1xuICAgICAgICAgICAgdmFyIHN1ZmZpeCA9IGNvbnN1bWVUZXh0KCk7XG4gICAgICAgICAgICBtdXN0Q29uc3VtZShcIkNMT1NFXCIpO1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goe1xuICAgICAgICAgICAgICAgIG5hbWU6IG5hbWVfMSB8fCAocGF0dGVybl8xID8ga2V5KysgOiBcIlwiKSxcbiAgICAgICAgICAgICAgICBwYXR0ZXJuOiBuYW1lXzEgJiYgIXBhdHRlcm5fMSA/IGRlZmF1bHRQYXR0ZXJuIDogcGF0dGVybl8xLFxuICAgICAgICAgICAgICAgIHByZWZpeDogcHJlZml4LFxuICAgICAgICAgICAgICAgIHN1ZmZpeDogc3VmZml4LFxuICAgICAgICAgICAgICAgIG1vZGlmaWVyOiB0cnlDb25zdW1lKFwiTU9ESUZJRVJcIikgfHwgXCJcIlxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBtdXN0Q29uc3VtZShcIkVORFwiKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmV4cG9ydHMucGFyc2UgPSBwYXJzZTtcbi8qKlxuICogQ29tcGlsZSBhIHN0cmluZyB0byBhIHRlbXBsYXRlIGZ1bmN0aW9uIGZvciB0aGUgcGF0aC5cbiAqL1xuZnVuY3Rpb24gY29tcGlsZShzdHIsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdG9rZW5zVG9GdW5jdGlvbihwYXJzZShzdHIsIG9wdGlvbnMpLCBvcHRpb25zKTtcbn1cbmV4cG9ydHMuY29tcGlsZSA9IGNvbXBpbGU7XG4vKipcbiAqIEV4cG9zZSBhIG1ldGhvZCBmb3IgdHJhbnNmb3JtaW5nIHRva2VucyBpbnRvIHRoZSBwYXRoIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiB0b2tlbnNUb0Z1bmN0aW9uKHRva2Vucywgb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IHt9OyB9XG4gICAgdmFyIHJlRmxhZ3MgPSBmbGFncyhvcHRpb25zKTtcbiAgICB2YXIgX2EgPSBvcHRpb25zLmVuY29kZSwgZW5jb2RlID0gX2EgPT09IHZvaWQgMCA/IGZ1bmN0aW9uICh4KSB7IHJldHVybiB4OyB9IDogX2EsIF9iID0gb3B0aW9ucy52YWxpZGF0ZSwgdmFsaWRhdGUgPSBfYiA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9iO1xuICAgIC8vIENvbXBpbGUgYWxsIHRoZSB0b2tlbnMgaW50byByZWdleHBzLlxuICAgIHZhciBtYXRjaGVzID0gdG9rZW5zLm1hcChmdW5jdGlvbiAodG9rZW4pIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0b2tlbiA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBSZWdFeHAoXCJeKD86XCIgKyB0b2tlbi5wYXR0ZXJuICsgXCIpJFwiLCByZUZsYWdzKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICB2YXIgcGF0aCA9IFwiXCI7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdG9rZW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgdG9rZW4gPSB0b2tlbnNbaV07XG4gICAgICAgICAgICBpZiAodHlwZW9mIHRva2VuID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgcGF0aCArPSB0b2tlbjtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IGRhdGEgPyBkYXRhW3Rva2VuLm5hbWVdIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgdmFyIG9wdGlvbmFsID0gdG9rZW4ubW9kaWZpZXIgPT09IFwiP1wiIHx8IHRva2VuLm1vZGlmaWVyID09PSBcIipcIjtcbiAgICAgICAgICAgIHZhciByZXBlYXQgPSB0b2tlbi5tb2RpZmllciA9PT0gXCIqXCIgfHwgdG9rZW4ubW9kaWZpZXIgPT09IFwiK1wiO1xuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFyZXBlYXQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkV4cGVjdGVkIFxcXCJcIiArIHRva2VuLm5hbWUgKyBcIlxcXCIgdG8gbm90IHJlcGVhdCwgYnV0IGdvdCBhbiBhcnJheVwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9uYWwpXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkV4cGVjdGVkIFxcXCJcIiArIHRva2VuLm5hbWUgKyBcIlxcXCIgdG8gbm90IGJlIGVtcHR5XCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHZhbHVlLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzZWdtZW50ID0gZW5jb2RlKHZhbHVlW2pdLCB0b2tlbik7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWxpZGF0ZSAmJiAhbWF0Y2hlc1tpXS50ZXN0KHNlZ21lbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiRXhwZWN0ZWQgYWxsIFxcXCJcIiArIHRva2VuLm5hbWUgKyBcIlxcXCIgdG8gbWF0Y2ggXFxcIlwiICsgdG9rZW4ucGF0dGVybiArIFwiXFxcIiwgYnV0IGdvdCBcXFwiXCIgKyBzZWdtZW50ICsgXCJcXFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHBhdGggKz0gdG9rZW4ucHJlZml4ICsgc2VnbWVudCArIHRva2VuLnN1ZmZpeDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiIHx8IHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIikge1xuICAgICAgICAgICAgICAgIHZhciBzZWdtZW50ID0gZW5jb2RlKFN0cmluZyh2YWx1ZSksIHRva2VuKTtcbiAgICAgICAgICAgICAgICBpZiAodmFsaWRhdGUgJiYgIW1hdGNoZXNbaV0udGVzdChzZWdtZW50KSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiRXhwZWN0ZWQgXFxcIlwiICsgdG9rZW4ubmFtZSArIFwiXFxcIiB0byBtYXRjaCBcXFwiXCIgKyB0b2tlbi5wYXR0ZXJuICsgXCJcXFwiLCBidXQgZ290IFxcXCJcIiArIHNlZ21lbnQgKyBcIlxcXCJcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBhdGggKz0gdG9rZW4ucHJlZml4ICsgc2VnbWVudCArIHRva2VuLnN1ZmZpeDtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvcHRpb25hbClcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIHZhciB0eXBlT2ZNZXNzYWdlID0gcmVwZWF0ID8gXCJhbiBhcnJheVwiIDogXCJhIHN0cmluZ1wiO1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkV4cGVjdGVkIFxcXCJcIiArIHRva2VuLm5hbWUgKyBcIlxcXCIgdG8gYmUgXCIgKyB0eXBlT2ZNZXNzYWdlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcGF0aDtcbiAgICB9O1xufVxuZXhwb3J0cy50b2tlbnNUb0Z1bmN0aW9uID0gdG9rZW5zVG9GdW5jdGlvbjtcbi8qKlxuICogQ3JlYXRlIHBhdGggbWF0Y2ggZnVuY3Rpb24gZnJvbSBgcGF0aC10by1yZWdleHBgIHNwZWMuXG4gKi9cbmZ1bmN0aW9uIG1hdGNoKHN0ciwgb3B0aW9ucykge1xuICAgIHZhciBrZXlzID0gW107XG4gICAgdmFyIHJlID0gcGF0aFRvUmVnZXhwKHN0ciwga2V5cywgb3B0aW9ucyk7XG4gICAgcmV0dXJuIHJlZ2V4cFRvRnVuY3Rpb24ocmUsIGtleXMsIG9wdGlvbnMpO1xufVxuZXhwb3J0cy5tYXRjaCA9IG1hdGNoO1xuLyoqXG4gKiBDcmVhdGUgYSBwYXRoIG1hdGNoIGZ1bmN0aW9uIGZyb20gYHBhdGgtdG8tcmVnZXhwYCBvdXRwdXQuXG4gKi9cbmZ1bmN0aW9uIHJlZ2V4cFRvRnVuY3Rpb24ocmUsIGtleXMsIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSB7fTsgfVxuICAgIHZhciBfYSA9IG9wdGlvbnMuZGVjb2RlLCBkZWNvZGUgPSBfYSA9PT0gdm9pZCAwID8gZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHg7IH0gOiBfYTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHBhdGhuYW1lKSB7XG4gICAgICAgIHZhciBtID0gcmUuZXhlYyhwYXRobmFtZSk7XG4gICAgICAgIGlmICghbSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgdmFyIHBhdGggPSBtWzBdLCBpbmRleCA9IG0uaW5kZXg7XG4gICAgICAgIHZhciBwYXJhbXMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICB2YXIgX2xvb3BfMSA9IGZ1bmN0aW9uIChpKSB7XG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgICAgICAgIGlmIChtW2ldID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiY29udGludWVcIjtcbiAgICAgICAgICAgIHZhciBrZXkgPSBrZXlzW2kgLSAxXTtcbiAgICAgICAgICAgIGlmIChrZXkubW9kaWZpZXIgPT09IFwiKlwiIHx8IGtleS5tb2RpZmllciA9PT0gXCIrXCIpIHtcbiAgICAgICAgICAgICAgICBwYXJhbXNba2V5Lm5hbWVdID0gbVtpXS5zcGxpdChrZXkucHJlZml4ICsga2V5LnN1ZmZpeCkubWFwKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVjb2RlKHZhbHVlLCBrZXkpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcGFyYW1zW2tleS5uYW1lXSA9IGRlY29kZShtW2ldLCBrZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IG0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIF9sb29wXzEoaSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgcGF0aDogcGF0aCwgaW5kZXg6IGluZGV4LCBwYXJhbXM6IHBhcmFtcyB9O1xuICAgIH07XG59XG5leHBvcnRzLnJlZ2V4cFRvRnVuY3Rpb24gPSByZWdleHBUb0Z1bmN0aW9uO1xuLyoqXG4gKiBFc2NhcGUgYSByZWd1bGFyIGV4cHJlc3Npb24gc3RyaW5nLlxuICovXG5mdW5jdGlvbiBlc2NhcGVTdHJpbmcoc3RyKSB7XG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKC8oWy4rKj89XiE6JHt9KClbXFxdfC9cXFxcXSkvZywgXCJcXFxcJDFcIik7XG59XG4vKipcbiAqIEdldCB0aGUgZmxhZ3MgZm9yIGEgcmVnZXhwIGZyb20gdGhlIG9wdGlvbnMuXG4gKi9cbmZ1bmN0aW9uIGZsYWdzKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gb3B0aW9ucyAmJiBvcHRpb25zLnNlbnNpdGl2ZSA/IFwiXCIgOiBcImlcIjtcbn1cbi8qKlxuICogUHVsbCBvdXQga2V5cyBmcm9tIGEgcmVnZXhwLlxuICovXG5mdW5jdGlvbiByZWdleHBUb1JlZ2V4cChwYXRoLCBrZXlzKSB7XG4gICAgaWYgKCFrZXlzKVxuICAgICAgICByZXR1cm4gcGF0aDtcbiAgICAvLyBVc2UgYSBuZWdhdGl2ZSBsb29rYWhlYWQgdG8gbWF0Y2ggb25seSBjYXB0dXJpbmcgZ3JvdXBzLlxuICAgIHZhciBncm91cHMgPSBwYXRoLnNvdXJjZS5tYXRjaCgvXFwoKD8hXFw/KS9nKTtcbiAgICBpZiAoZ3JvdXBzKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZ3JvdXBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBrZXlzLnB1c2goe1xuICAgICAgICAgICAgICAgIG5hbWU6IGksXG4gICAgICAgICAgICAgICAgcHJlZml4OiBcIlwiLFxuICAgICAgICAgICAgICAgIHN1ZmZpeDogXCJcIixcbiAgICAgICAgICAgICAgICBtb2RpZmllcjogXCJcIixcbiAgICAgICAgICAgICAgICBwYXR0ZXJuOiBcIlwiXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcGF0aDtcbn1cbi8qKlxuICogVHJhbnNmb3JtIGFuIGFycmF5IGludG8gYSByZWdleHAuXG4gKi9cbmZ1bmN0aW9uIGFycmF5VG9SZWdleHAocGF0aHMsIGtleXMsIG9wdGlvbnMpIHtcbiAgICB2YXIgcGFydHMgPSBwYXRocy5tYXAoZnVuY3Rpb24gKHBhdGgpIHsgcmV0dXJuIHBhdGhUb1JlZ2V4cChwYXRoLCBrZXlzLCBvcHRpb25zKS5zb3VyY2U7IH0pO1xuICAgIHJldHVybiBuZXcgUmVnRXhwKFwiKD86XCIgKyBwYXJ0cy5qb2luKFwifFwiKSArIFwiKVwiLCBmbGFncyhvcHRpb25zKSk7XG59XG4vKipcbiAqIENyZWF0ZSBhIHBhdGggcmVnZXhwIGZyb20gc3RyaW5nIGlucHV0LlxuICovXG5mdW5jdGlvbiBzdHJpbmdUb1JlZ2V4cChwYXRoLCBrZXlzLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIHRva2Vuc1RvUmVnZXhwKHBhcnNlKHBhdGgsIG9wdGlvbnMpLCBrZXlzLCBvcHRpb25zKTtcbn1cbi8qKlxuICogRXhwb3NlIGEgZnVuY3Rpb24gZm9yIHRha2luZyB0b2tlbnMgYW5kIHJldHVybmluZyBhIFJlZ0V4cC5cbiAqL1xuZnVuY3Rpb24gdG9rZW5zVG9SZWdleHAodG9rZW5zLCBrZXlzLCBvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cbiAgICB2YXIgX2EgPSBvcHRpb25zLnN0cmljdCwgc3RyaWN0ID0gX2EgPT09IHZvaWQgMCA/IGZhbHNlIDogX2EsIF9iID0gb3B0aW9ucy5zdGFydCwgc3RhcnQgPSBfYiA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9iLCBfYyA9IG9wdGlvbnMuZW5kLCBlbmQgPSBfYyA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9jLCBfZCA9IG9wdGlvbnMuZW5jb2RlLCBlbmNvZGUgPSBfZCA9PT0gdm9pZCAwID8gZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHg7IH0gOiBfZDtcbiAgICB2YXIgZW5kc1dpdGggPSBcIltcIiArIGVzY2FwZVN0cmluZyhvcHRpb25zLmVuZHNXaXRoIHx8IFwiXCIpICsgXCJdfCRcIjtcbiAgICB2YXIgZGVsaW1pdGVyID0gXCJbXCIgKyBlc2NhcGVTdHJpbmcob3B0aW9ucy5kZWxpbWl0ZXIgfHwgXCIvIz9cIikgKyBcIl1cIjtcbiAgICB2YXIgcm91dGUgPSBzdGFydCA/IFwiXlwiIDogXCJcIjtcbiAgICAvLyBJdGVyYXRlIG92ZXIgdGhlIHRva2VucyBhbmQgY3JlYXRlIG91ciByZWdleHAgc3RyaW5nLlxuICAgIGZvciAodmFyIF9pID0gMCwgdG9rZW5zXzEgPSB0b2tlbnM7IF9pIDwgdG9rZW5zXzEubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIHZhciB0b2tlbiA9IHRva2Vuc18xW19pXTtcbiAgICAgICAgaWYgKHR5cGVvZiB0b2tlbiA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgcm91dGUgKz0gZXNjYXBlU3RyaW5nKGVuY29kZSh0b2tlbikpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyIHByZWZpeCA9IGVzY2FwZVN0cmluZyhlbmNvZGUodG9rZW4ucHJlZml4KSk7XG4gICAgICAgICAgICB2YXIgc3VmZml4ID0gZXNjYXBlU3RyaW5nKGVuY29kZSh0b2tlbi5zdWZmaXgpKTtcbiAgICAgICAgICAgIGlmICh0b2tlbi5wYXR0ZXJuKSB7XG4gICAgICAgICAgICAgICAgaWYgKGtleXMpXG4gICAgICAgICAgICAgICAgICAgIGtleXMucHVzaCh0b2tlbik7XG4gICAgICAgICAgICAgICAgaWYgKHByZWZpeCB8fCBzdWZmaXgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRva2VuLm1vZGlmaWVyID09PSBcIitcIiB8fCB0b2tlbi5tb2RpZmllciA9PT0gXCIqXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtb2QgPSB0b2tlbi5tb2RpZmllciA9PT0gXCIqXCIgPyBcIj9cIiA6IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICByb3V0ZSArPSBcIig/OlwiICsgcHJlZml4ICsgXCIoKD86XCIgKyB0b2tlbi5wYXR0ZXJuICsgXCIpKD86XCIgKyBzdWZmaXggKyBwcmVmaXggKyBcIig/OlwiICsgdG9rZW4ucGF0dGVybiArIFwiKSkqKVwiICsgc3VmZml4ICsgXCIpXCIgKyBtb2Q7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByb3V0ZSArPSBcIig/OlwiICsgcHJlZml4ICsgXCIoXCIgKyB0b2tlbi5wYXR0ZXJuICsgXCIpXCIgKyBzdWZmaXggKyBcIilcIiArIHRva2VuLm1vZGlmaWVyO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByb3V0ZSArPSBcIihcIiArIHRva2VuLnBhdHRlcm4gKyBcIilcIiArIHRva2VuLm1vZGlmaWVyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJvdXRlICs9IFwiKD86XCIgKyBwcmVmaXggKyBzdWZmaXggKyBcIilcIiArIHRva2VuLm1vZGlmaWVyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChlbmQpIHtcbiAgICAgICAgaWYgKCFzdHJpY3QpXG4gICAgICAgICAgICByb3V0ZSArPSBkZWxpbWl0ZXIgKyBcIj9cIjtcbiAgICAgICAgcm91dGUgKz0gIW9wdGlvbnMuZW5kc1dpdGggPyBcIiRcIiA6IFwiKD89XCIgKyBlbmRzV2l0aCArIFwiKVwiO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdmFyIGVuZFRva2VuID0gdG9rZW5zW3Rva2Vucy5sZW5ndGggLSAxXTtcbiAgICAgICAgdmFyIGlzRW5kRGVsaW1pdGVkID0gdHlwZW9mIGVuZFRva2VuID09PSBcInN0cmluZ1wiXG4gICAgICAgICAgICA/IGRlbGltaXRlci5pbmRleE9mKGVuZFRva2VuW2VuZFRva2VuLmxlbmd0aCAtIDFdKSA+IC0xXG4gICAgICAgICAgICA6IC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZVxuICAgICAgICAgICAgICAgIGVuZFRva2VuID09PSB1bmRlZmluZWQ7XG4gICAgICAgIGlmICghc3RyaWN0KSB7XG4gICAgICAgICAgICByb3V0ZSArPSBcIig/OlwiICsgZGVsaW1pdGVyICsgXCIoPz1cIiArIGVuZHNXaXRoICsgXCIpKT9cIjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWlzRW5kRGVsaW1pdGVkKSB7XG4gICAgICAgICAgICByb3V0ZSArPSBcIig/PVwiICsgZGVsaW1pdGVyICsgXCJ8XCIgKyBlbmRzV2l0aCArIFwiKVwiO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBuZXcgUmVnRXhwKHJvdXRlLCBmbGFncyhvcHRpb25zKSk7XG59XG5leHBvcnRzLnRva2Vuc1RvUmVnZXhwID0gdG9rZW5zVG9SZWdleHA7XG4vKipcbiAqIE5vcm1hbGl6ZSB0aGUgZ2l2ZW4gcGF0aCBzdHJpbmcsIHJldHVybmluZyBhIHJlZ3VsYXIgZXhwcmVzc2lvbi5cbiAqXG4gKiBBbiBlbXB0eSBhcnJheSBjYW4gYmUgcGFzc2VkIGluIGZvciB0aGUga2V5cywgd2hpY2ggd2lsbCBob2xkIHRoZVxuICogcGxhY2Vob2xkZXIga2V5IGRlc2NyaXB0aW9ucy4gRm9yIGV4YW1wbGUsIHVzaW5nIGAvdXNlci86aWRgLCBga2V5c2Agd2lsbFxuICogY29udGFpbiBgW3sgbmFtZTogJ2lkJywgZGVsaW1pdGVyOiAnLycsIG9wdGlvbmFsOiBmYWxzZSwgcmVwZWF0OiBmYWxzZSB9XWAuXG4gKi9cbmZ1bmN0aW9uIHBhdGhUb1JlZ2V4cChwYXRoLCBrZXlzLCBvcHRpb25zKSB7XG4gICAgaWYgKHBhdGggaW5zdGFuY2VvZiBSZWdFeHApXG4gICAgICAgIHJldHVybiByZWdleHBUb1JlZ2V4cChwYXRoLCBrZXlzKTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShwYXRoKSlcbiAgICAgICAgcmV0dXJuIGFycmF5VG9SZWdleHAocGF0aCwga2V5cywgb3B0aW9ucyk7XG4gICAgcmV0dXJuIHN0cmluZ1RvUmVnZXhwKHBhdGgsIGtleXMsIG9wdGlvbnMpO1xufVxuZXhwb3J0cy5wYXRoVG9SZWdleHAgPSBwYXRoVG9SZWdleHA7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJleHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplTG9jYWxlUGF0aChcbiAgcGF0aG5hbWU6IHN0cmluZyxcbiAgbG9jYWxlcz86IHN0cmluZ1tdXG4pOiB7XG4gIGRldGVjdGVkTG9jYWxlPzogc3RyaW5nXG4gIHBhdGhuYW1lOiBzdHJpbmdcbn0ge1xuICBsZXQgZGV0ZWN0ZWRMb2NhbGU6IHN0cmluZyB8IHVuZGVmaW5lZFxuICAvLyBmaXJzdCBpdGVtIHdpbGwgYmUgZW1wdHkgc3RyaW5nIGZyb20gc3BsaXR0aW5nIGF0IGZpcnN0IGNoYXJcbiAgY29uc3QgcGF0aG5hbWVQYXJ0cyA9IHBhdGhuYW1lLnNwbGl0KCcvJylcblxuICA7KGxvY2FsZXMgfHwgW10pLnNvbWUoKGxvY2FsZSkgPT4ge1xuICAgIGlmIChwYXRobmFtZVBhcnRzWzFdLnRvTG93ZXJDYXNlKCkgPT09IGxvY2FsZS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICBkZXRlY3RlZExvY2FsZSA9IGxvY2FsZVxuICAgICAgcGF0aG5hbWVQYXJ0cy5zcGxpY2UoMSwgMSlcbiAgICAgIHBhdGhuYW1lID0gcGF0aG5hbWVQYXJ0cy5qb2luKCcvJykgfHwgJy8nXG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2VcbiAgfSlcblxuICByZXR1cm4ge1xuICAgIHBhdGhuYW1lLFxuICAgIGRldGVjdGVkTG9jYWxlLFxuICB9XG59XG4iLCIvKlxuTUlUIExpY2Vuc2VcblxuQ29weXJpZ2h0IChjKSBKYXNvbiBNaWxsZXIgKGh0dHBzOi8vamFzb25mb3JtYXQuY29tLylcblxuUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuKi9cblxuLy8gVGhpcyBmaWxlIGlzIGJhc2VkIG9uIGh0dHBzOi8vZ2l0aHViLmNvbS9kZXZlbG9waXQvbWl0dC9ibG9iL3YxLjEuMy9zcmMvaW5kZXguanNcbi8vIEl0J3MgYmVlbiBlZGl0ZWQgZm9yIHRoZSBuZWVkcyBvZiB0aGlzIHNjcmlwdFxuLy8gU2VlIHRoZSBMSUNFTlNFIGF0IHRoZSB0b3Agb2YgdGhlIGZpbGVcblxudHlwZSBIYW5kbGVyID0gKC4uLmV2dHM6IGFueVtdKSA9PiB2b2lkXG5cbmV4cG9ydCB0eXBlIE1pdHRFbWl0dGVyID0ge1xuICBvbih0eXBlOiBzdHJpbmcsIGhhbmRsZXI6IEhhbmRsZXIpOiB2b2lkXG4gIG9mZih0eXBlOiBzdHJpbmcsIGhhbmRsZXI6IEhhbmRsZXIpOiB2b2lkXG4gIGVtaXQodHlwZTogc3RyaW5nLCAuLi5ldnRzOiBhbnlbXSk6IHZvaWRcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWl0dCgpOiBNaXR0RW1pdHRlciB7XG4gIGNvbnN0IGFsbDogeyBbczogc3RyaW5nXTogSGFuZGxlcltdIH0gPSBPYmplY3QuY3JlYXRlKG51bGwpXG5cbiAgcmV0dXJuIHtcbiAgICBvbih0eXBlOiBzdHJpbmcsIGhhbmRsZXI6IEhhbmRsZXIpIHtcbiAgICAgIDsoYWxsW3R5cGVdIHx8IChhbGxbdHlwZV0gPSBbXSkpLnB1c2goaGFuZGxlcilcbiAgICB9LFxuXG4gICAgb2ZmKHR5cGU6IHN0cmluZywgaGFuZGxlcjogSGFuZGxlcikge1xuICAgICAgaWYgKGFsbFt0eXBlXSkge1xuICAgICAgICBhbGxbdHlwZV0uc3BsaWNlKGFsbFt0eXBlXS5pbmRleE9mKGhhbmRsZXIpID4+PiAwLCAxKVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBlbWl0KHR5cGU6IHN0cmluZywgLi4uZXZ0czogYW55W10pIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBhcnJheS1jYWxsYmFjay1yZXR1cm5cbiAgICAgIDsoYWxsW3R5cGVdIHx8IFtdKS5zbGljZSgpLm1hcCgoaGFuZGxlcjogSGFuZGxlcikgPT4ge1xuICAgICAgICBoYW5kbGVyKC4uLmV2dHMpXG4gICAgICB9KVxuICAgIH0sXG4gIH1cbn1cbiIsIi8vIHRzbGludDpkaXNhYmxlOm5vLWNvbnNvbGVcbmltcG9ydCB7IFBhcnNlZFVybFF1ZXJ5IH0gZnJvbSAncXVlcnlzdHJpbmcnXG5pbXBvcnQgeyBDb21wb25lbnRUeXBlIH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBVcmxPYmplY3QgfSBmcm9tICd1cmwnXG5pbXBvcnQge1xuICBub3JtYWxpemVQYXRoVHJhaWxpbmdTbGFzaCxcbiAgcmVtb3ZlUGF0aFRyYWlsaW5nU2xhc2gsXG59IGZyb20gJy4uLy4uLy4uL2NsaWVudC9ub3JtYWxpemUtdHJhaWxpbmctc2xhc2gnXG5pbXBvcnQgeyBHb29kUGFnZUNhY2hlLCBTdHlsZVNoZWV0VHVwbGUgfSBmcm9tICcuLi8uLi8uLi9jbGllbnQvcGFnZS1sb2FkZXInXG5pbXBvcnQge1xuICBnZXRDbGllbnRCdWlsZE1hbmlmZXN0LFxuICBpc0Fzc2V0RXJyb3IsXG4gIG1hcmtBc3NldEVycm9yLFxufSBmcm9tICcuLi8uLi8uLi9jbGllbnQvcm91dGUtbG9hZGVyJ1xuaW1wb3J0IHsgRG9tYWluTG9jYWxlcyB9IGZyb20gJy4uLy4uL3NlcnZlci9jb25maWcnXG5pbXBvcnQgeyBkZW5vcm1hbGl6ZVBhZ2VQYXRoIH0gZnJvbSAnLi4vLi4vc2VydmVyL2Rlbm9ybWFsaXplLXBhZ2UtcGF0aCdcbmltcG9ydCB7IG5vcm1hbGl6ZUxvY2FsZVBhdGggfSBmcm9tICcuLi9pMThuL25vcm1hbGl6ZS1sb2NhbGUtcGF0aCdcbmltcG9ydCBtaXR0LCB7IE1pdHRFbWl0dGVyIH0gZnJvbSAnLi4vbWl0dCdcbmltcG9ydCB7XG4gIEFwcENvbnRleHRUeXBlLFxuICBmb3JtYXRXaXRoVmFsaWRhdGlvbixcbiAgZ2V0TG9jYXRpb25PcmlnaW4sXG4gIGdldFVSTCxcbiAgbG9hZEdldEluaXRpYWxQcm9wcyxcbiAgTmV4dFBhZ2VDb250ZXh0LFxuICBTVCxcbiAgTkVYVF9EQVRBLFxufSBmcm9tICcuLi91dGlscydcbmltcG9ydCB7IGlzRHluYW1pY1JvdXRlIH0gZnJvbSAnLi91dGlscy9pcy1keW5hbWljJ1xuaW1wb3J0IHsgcGFyc2VSZWxhdGl2ZVVybCB9IGZyb20gJy4vdXRpbHMvcGFyc2UtcmVsYXRpdmUtdXJsJ1xuaW1wb3J0IHsgc2VhcmNoUGFyYW1zVG9VcmxRdWVyeSB9IGZyb20gJy4vdXRpbHMvcXVlcnlzdHJpbmcnXG5pbXBvcnQgcmVzb2x2ZVJld3JpdGVzIGZyb20gJy4vdXRpbHMvcmVzb2x2ZS1yZXdyaXRlcydcbmltcG9ydCB7IGdldFJvdXRlTWF0Y2hlciB9IGZyb20gJy4vdXRpbHMvcm91dGUtbWF0Y2hlcidcbmltcG9ydCB7IGdldFJvdXRlUmVnZXggfSBmcm9tICcuL3V0aWxzL3JvdXRlLXJlZ2V4J1xuXG5kZWNsYXJlIGdsb2JhbCB7XG4gIGludGVyZmFjZSBXaW5kb3cge1xuICAgIC8qIHByb2QgKi9cbiAgICBfX05FWFRfREFUQV9fOiBORVhUX0RBVEFcbiAgfVxufVxuXG5pbnRlcmZhY2UgUm91dGVQcm9wZXJ0aWVzIHtcbiAgc2hhbGxvdzogYm9vbGVhblxufVxuXG5pbnRlcmZhY2UgVHJhbnNpdGlvbk9wdGlvbnMge1xuICBzaGFsbG93PzogYm9vbGVhblxuICBsb2NhbGU/OiBzdHJpbmcgfCBmYWxzZVxuICBzY3JvbGw/OiBib29sZWFuXG59XG5cbmludGVyZmFjZSBOZXh0SGlzdG9yeVN0YXRlIHtcbiAgdXJsOiBzdHJpbmdcbiAgYXM6IHN0cmluZ1xuICBvcHRpb25zOiBUcmFuc2l0aW9uT3B0aW9uc1xufVxuXG50eXBlIEhpc3RvcnlTdGF0ZSA9XG4gIHwgbnVsbFxuICB8IHsgX19OOiBmYWxzZSB9XG4gIHwgKHsgX19OOiB0cnVlOyBpZHg6IG51bWJlciB9ICYgTmV4dEhpc3RvcnlTdGF0ZSlcblxubGV0IGRldGVjdERvbWFpbkxvY2FsZTogdHlwZW9mIGltcG9ydCgnLi4vaTE4bi9kZXRlY3QtZG9tYWluLWxvY2FsZScpLmRldGVjdERvbWFpbkxvY2FsZVxuXG5pZiAocHJvY2Vzcy5lbnYuX19ORVhUX0kxOE5fU1VQUE9SVCkge1xuICBkZXRlY3REb21haW5Mb2NhbGUgPSByZXF1aXJlKCcuLi9pMThuL2RldGVjdC1kb21haW4tbG9jYWxlJylcbiAgICAuZGV0ZWN0RG9tYWluTG9jYWxlXG59XG5cbmNvbnN0IGJhc2VQYXRoID0gKHByb2Nlc3MuZW52Ll9fTkVYVF9ST1VURVJfQkFTRVBBVEggYXMgc3RyaW5nKSB8fCAnJ1xuXG5mdW5jdGlvbiBidWlsZENhbmNlbGxhdGlvbkVycm9yKCkge1xuICByZXR1cm4gT2JqZWN0LmFzc2lnbihuZXcgRXJyb3IoJ1JvdXRlIENhbmNlbGxlZCcpLCB7XG4gICAgY2FuY2VsbGVkOiB0cnVlLFxuICB9KVxufVxuXG5mdW5jdGlvbiBhZGRQYXRoUHJlZml4KHBhdGg6IHN0cmluZywgcHJlZml4Pzogc3RyaW5nKSB7XG4gIHJldHVybiBwcmVmaXggJiYgcGF0aC5zdGFydHNXaXRoKCcvJylcbiAgICA/IHBhdGggPT09ICcvJ1xuICAgICAgPyBub3JtYWxpemVQYXRoVHJhaWxpbmdTbGFzaChwcmVmaXgpXG4gICAgICA6IGAke3ByZWZpeH0ke3BhdGhOb1F1ZXJ5SGFzaChwYXRoKSA9PT0gJy8nID8gcGF0aC5zdWJzdHJpbmcoMSkgOiBwYXRofWBcbiAgICA6IHBhdGhcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldERvbWFpbkxvY2FsZShcbiAgcGF0aDogc3RyaW5nLFxuICBsb2NhbGU/OiBzdHJpbmcgfCBmYWxzZSxcbiAgbG9jYWxlcz86IHN0cmluZ1tdLFxuICBkb21haW5Mb2NhbGVzPzogRG9tYWluTG9jYWxlc1xuKSB7XG4gIGlmIChwcm9jZXNzLmVudi5fX05FWFRfSTE4Tl9TVVBQT1JUKSB7XG4gICAgbG9jYWxlID0gbG9jYWxlIHx8IG5vcm1hbGl6ZUxvY2FsZVBhdGgocGF0aCwgbG9jYWxlcykuZGV0ZWN0ZWRMb2NhbGVcblxuICAgIGNvbnN0IGRldGVjdGVkRG9tYWluID0gZGV0ZWN0RG9tYWluTG9jYWxlKGRvbWFpbkxvY2FsZXMsIHVuZGVmaW5lZCwgbG9jYWxlKVxuXG4gICAgaWYgKGRldGVjdGVkRG9tYWluKSB7XG4gICAgICByZXR1cm4gYGh0dHAke2RldGVjdGVkRG9tYWluLmh0dHAgPyAnJyA6ICdzJ306Ly8ke2RldGVjdGVkRG9tYWluLmRvbWFpbn0ke1xuICAgICAgICBiYXNlUGF0aCB8fCAnJ1xuICAgICAgfSR7bG9jYWxlID09PSBkZXRlY3RlZERvbWFpbi5kZWZhdWx0TG9jYWxlID8gJycgOiBgLyR7bG9jYWxlfWB9JHtwYXRofWBcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICByZXR1cm4gZmFsc2Vcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZExvY2FsZShcbiAgcGF0aDogc3RyaW5nLFxuICBsb2NhbGU/OiBzdHJpbmcgfCBmYWxzZSxcbiAgZGVmYXVsdExvY2FsZT86IHN0cmluZ1xuKSB7XG4gIGlmIChwcm9jZXNzLmVudi5fX05FWFRfSTE4Tl9TVVBQT1JUKSB7XG4gICAgY29uc3QgcGF0aG5hbWUgPSBwYXRoTm9RdWVyeUhhc2gocGF0aClcbiAgICBjb25zdCBwYXRoTG93ZXIgPSBwYXRobmFtZS50b0xvd2VyQ2FzZSgpXG4gICAgY29uc3QgbG9jYWxlTG93ZXIgPSBsb2NhbGUgJiYgbG9jYWxlLnRvTG93ZXJDYXNlKClcblxuICAgIHJldHVybiBsb2NhbGUgJiZcbiAgICAgIGxvY2FsZSAhPT0gZGVmYXVsdExvY2FsZSAmJlxuICAgICAgIXBhdGhMb3dlci5zdGFydHNXaXRoKCcvJyArIGxvY2FsZUxvd2VyICsgJy8nKSAmJlxuICAgICAgcGF0aExvd2VyICE9PSAnLycgKyBsb2NhbGVMb3dlclxuICAgICAgPyBhZGRQYXRoUHJlZml4KHBhdGgsICcvJyArIGxvY2FsZSlcbiAgICAgIDogcGF0aFxuICB9XG4gIHJldHVybiBwYXRoXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWxMb2NhbGUocGF0aDogc3RyaW5nLCBsb2NhbGU/OiBzdHJpbmcpIHtcbiAgaWYgKHByb2Nlc3MuZW52Ll9fTkVYVF9JMThOX1NVUFBPUlQpIHtcbiAgICBjb25zdCBwYXRobmFtZSA9IHBhdGhOb1F1ZXJ5SGFzaChwYXRoKVxuICAgIGNvbnN0IHBhdGhMb3dlciA9IHBhdGhuYW1lLnRvTG93ZXJDYXNlKClcbiAgICBjb25zdCBsb2NhbGVMb3dlciA9IGxvY2FsZSAmJiBsb2NhbGUudG9Mb3dlckNhc2UoKVxuXG4gICAgcmV0dXJuIGxvY2FsZSAmJlxuICAgICAgKHBhdGhMb3dlci5zdGFydHNXaXRoKCcvJyArIGxvY2FsZUxvd2VyICsgJy8nKSB8fFxuICAgICAgICBwYXRoTG93ZXIgPT09ICcvJyArIGxvY2FsZUxvd2VyKVxuICAgICAgPyAocGF0aG5hbWUubGVuZ3RoID09PSBsb2NhbGUubGVuZ3RoICsgMSA/ICcvJyA6ICcnKSArXG4gICAgICAgICAgcGF0aC5zdWJzdHIobG9jYWxlLmxlbmd0aCArIDEpXG4gICAgICA6IHBhdGhcbiAgfVxuICByZXR1cm4gcGF0aFxufVxuXG5mdW5jdGlvbiBwYXRoTm9RdWVyeUhhc2gocGF0aDogc3RyaW5nKSB7XG4gIGNvbnN0IHF1ZXJ5SW5kZXggPSBwYXRoLmluZGV4T2YoJz8nKVxuICBjb25zdCBoYXNoSW5kZXggPSBwYXRoLmluZGV4T2YoJyMnKVxuXG4gIGlmIChxdWVyeUluZGV4ID4gLTEgfHwgaGFzaEluZGV4ID4gLTEpIHtcbiAgICBwYXRoID0gcGF0aC5zdWJzdHJpbmcoMCwgcXVlcnlJbmRleCA+IC0xID8gcXVlcnlJbmRleCA6IGhhc2hJbmRleClcbiAgfVxuICByZXR1cm4gcGF0aFxufVxuXG5leHBvcnQgZnVuY3Rpb24gaGFzQmFzZVBhdGgocGF0aDogc3RyaW5nKTogYm9vbGVhbiB7XG4gIHBhdGggPSBwYXRoTm9RdWVyeUhhc2gocGF0aClcbiAgcmV0dXJuIHBhdGggPT09IGJhc2VQYXRoIHx8IHBhdGguc3RhcnRzV2l0aChiYXNlUGF0aCArICcvJylcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZEJhc2VQYXRoKHBhdGg6IHN0cmluZyk6IHN0cmluZyB7XG4gIC8vIHdlIG9ubHkgYWRkIHRoZSBiYXNlcGF0aCBvbiByZWxhdGl2ZSB1cmxzXG4gIHJldHVybiBhZGRQYXRoUHJlZml4KHBhdGgsIGJhc2VQYXRoKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVsQmFzZVBhdGgocGF0aDogc3RyaW5nKTogc3RyaW5nIHtcbiAgcGF0aCA9IHBhdGguc2xpY2UoYmFzZVBhdGgubGVuZ3RoKVxuICBpZiAoIXBhdGguc3RhcnRzV2l0aCgnLycpKSBwYXRoID0gYC8ke3BhdGh9YFxuICByZXR1cm4gcGF0aFxufVxuXG4vKipcbiAqIERldGVjdHMgd2hldGhlciBhIGdpdmVuIHVybCBpcyByb3V0YWJsZSBieSB0aGUgTmV4dC5qcyByb3V0ZXIgKGJyb3dzZXIgb25seSkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0xvY2FsVVJMKHVybDogc3RyaW5nKTogYm9vbGVhbiB7XG4gIC8vIHByZXZlbnQgYSBoeWRyYXRpb24gbWlzbWF0Y2ggb24gaHJlZiBmb3IgdXJsIHdpdGggYW5jaG9yIHJlZnNcbiAgaWYgKHVybC5zdGFydHNXaXRoKCcvJykgfHwgdXJsLnN0YXJ0c1dpdGgoJyMnKSkgcmV0dXJuIHRydWVcbiAgdHJ5IHtcbiAgICAvLyBhYnNvbHV0ZSB1cmxzIGNhbiBiZSBsb2NhbCBpZiB0aGV5IGFyZSBvbiB0aGUgc2FtZSBvcmlnaW5cbiAgICBjb25zdCBsb2NhdGlvbk9yaWdpbiA9IGdldExvY2F0aW9uT3JpZ2luKClcbiAgICBjb25zdCByZXNvbHZlZCA9IG5ldyBVUkwodXJsLCBsb2NhdGlvbk9yaWdpbilcbiAgICByZXR1cm4gcmVzb2x2ZWQub3JpZ2luID09PSBsb2NhdGlvbk9yaWdpbiAmJiBoYXNCYXNlUGF0aChyZXNvbHZlZC5wYXRobmFtZSlcbiAgfSBjYXRjaCAoXykge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG59XG5cbnR5cGUgVXJsID0gVXJsT2JqZWN0IHwgc3RyaW5nXG5cbmV4cG9ydCBmdW5jdGlvbiBpbnRlcnBvbGF0ZUFzKFxuICByb3V0ZTogc3RyaW5nLFxuICBhc1BhdGhuYW1lOiBzdHJpbmcsXG4gIHF1ZXJ5OiBQYXJzZWRVcmxRdWVyeVxuKSB7XG4gIGxldCBpbnRlcnBvbGF0ZWRSb3V0ZSA9ICcnXG5cbiAgY29uc3QgZHluYW1pY1JlZ2V4ID0gZ2V0Um91dGVSZWdleChyb3V0ZSlcbiAgY29uc3QgZHluYW1pY0dyb3VwcyA9IGR5bmFtaWNSZWdleC5ncm91cHNcbiAgY29uc3QgZHluYW1pY01hdGNoZXMgPVxuICAgIC8vIFRyeSB0byBtYXRjaCB0aGUgZHluYW1pYyByb3V0ZSBhZ2FpbnN0IHRoZSBhc1BhdGhcbiAgICAoYXNQYXRobmFtZSAhPT0gcm91dGUgPyBnZXRSb3V0ZU1hdGNoZXIoZHluYW1pY1JlZ2V4KShhc1BhdGhuYW1lKSA6ICcnKSB8fFxuICAgIC8vIEZhbGwgYmFjayB0byByZWFkaW5nIHRoZSB2YWx1ZXMgZnJvbSB0aGUgaHJlZlxuICAgIC8vIFRPRE86IHNob3VsZCB0aGlzIHRha2UgcHJpb3JpdHk7IGFsc28gbmVlZCB0byBjaGFuZ2UgaW4gdGhlIHJvdXRlci5cbiAgICBxdWVyeVxuXG4gIGludGVycG9sYXRlZFJvdXRlID0gcm91dGVcbiAgY29uc3QgcGFyYW1zID0gT2JqZWN0LmtleXMoZHluYW1pY0dyb3VwcylcblxuICBpZiAoXG4gICAgIXBhcmFtcy5ldmVyeSgocGFyYW0pID0+IHtcbiAgICAgIGxldCB2YWx1ZSA9IGR5bmFtaWNNYXRjaGVzW3BhcmFtXSB8fCAnJ1xuICAgICAgY29uc3QgeyByZXBlYXQsIG9wdGlvbmFsIH0gPSBkeW5hbWljR3JvdXBzW3BhcmFtXVxuXG4gICAgICAvLyBzdXBwb3J0IHNpbmdsZS1sZXZlbCBjYXRjaC1hbGxcbiAgICAgIC8vIFRPRE86IG1vcmUgcm9idXN0IGhhbmRsaW5nIGZvciB1c2VyLWVycm9yIChwYXNzaW5nIGAvYClcbiAgICAgIGxldCByZXBsYWNlZCA9IGBbJHtyZXBlYXQgPyAnLi4uJyA6ICcnfSR7cGFyYW19XWBcbiAgICAgIGlmIChvcHRpb25hbCkge1xuICAgICAgICByZXBsYWNlZCA9IGAkeyF2YWx1ZSA/ICcvJyA6ICcnfVske3JlcGxhY2VkfV1gXG4gICAgICB9XG4gICAgICBpZiAocmVwZWF0ICYmICFBcnJheS5pc0FycmF5KHZhbHVlKSkgdmFsdWUgPSBbdmFsdWVdXG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIChvcHRpb25hbCB8fCBwYXJhbSBpbiBkeW5hbWljTWF0Y2hlcykgJiZcbiAgICAgICAgLy8gSW50ZXJwb2xhdGUgZ3JvdXAgaW50byBkYXRhIFVSTCBpZiBwcmVzZW50XG4gICAgICAgIChpbnRlcnBvbGF0ZWRSb3V0ZSA9XG4gICAgICAgICAgaW50ZXJwb2xhdGVkUm91dGUhLnJlcGxhY2UoXG4gICAgICAgICAgICByZXBsYWNlZCxcbiAgICAgICAgICAgIHJlcGVhdFxuICAgICAgICAgICAgICA/ICh2YWx1ZSBhcyBzdHJpbmdbXSlcbiAgICAgICAgICAgICAgICAgIC5tYXAoXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoZXNlIHZhbHVlcyBzaG91bGQgYmUgZnVsbHkgZW5jb2RlZCBpbnN0ZWFkIG9mIGp1c3RcbiAgICAgICAgICAgICAgICAgICAgLy8gcGF0aCBkZWxpbWl0ZXIgZXNjYXBlZCBzaW5jZSB0aGV5IGFyZSBiZWluZyBpbnNlcnRlZFxuICAgICAgICAgICAgICAgICAgICAvLyBpbnRvIHRoZSBVUkwgYW5kIHdlIGV4cGVjdCBVUkwgZW5jb2RlZCBzZWdtZW50c1xuICAgICAgICAgICAgICAgICAgICAvLyB3aGVuIHBhcnNpbmcgZHluYW1pYyByb3V0ZSBwYXJhbXNcbiAgICAgICAgICAgICAgICAgICAgKHNlZ21lbnQpID0+IGVuY29kZVVSSUNvbXBvbmVudChzZWdtZW50KVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgLmpvaW4oJy8nKVxuICAgICAgICAgICAgICA6IGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSBhcyBzdHJpbmcpXG4gICAgICAgICAgKSB8fCAnLycpXG4gICAgICApXG4gICAgfSlcbiAgKSB7XG4gICAgaW50ZXJwb2xhdGVkUm91dGUgPSAnJyAvLyBkaWQgbm90IHNhdGlzZnkgYWxsIHJlcXVpcmVtZW50c1xuXG4gICAgLy8gbi5iLiBXZSBpZ25vcmUgdGhpcyBlcnJvciBiZWNhdXNlIHdlIGhhbmRsZSB3YXJuaW5nIGZvciB0aGlzIGNhc2UgaW5cbiAgICAvLyBkZXZlbG9wbWVudCBpbiB0aGUgYDxMaW5rPmAgY29tcG9uZW50IGRpcmVjdGx5LlxuICB9XG4gIHJldHVybiB7XG4gICAgcGFyYW1zLFxuICAgIHJlc3VsdDogaW50ZXJwb2xhdGVkUm91dGUsXG4gIH1cbn1cblxuZnVuY3Rpb24gb21pdFBhcm1zRnJvbVF1ZXJ5KHF1ZXJ5OiBQYXJzZWRVcmxRdWVyeSwgcGFyYW1zOiBzdHJpbmdbXSkge1xuICBjb25zdCBmaWx0ZXJlZFF1ZXJ5OiBQYXJzZWRVcmxRdWVyeSA9IHt9XG5cbiAgT2JqZWN0LmtleXMocXVlcnkpLmZvckVhY2goKGtleSkgPT4ge1xuICAgIGlmICghcGFyYW1zLmluY2x1ZGVzKGtleSkpIHtcbiAgICAgIGZpbHRlcmVkUXVlcnlba2V5XSA9IHF1ZXJ5W2tleV1cbiAgICB9XG4gIH0pXG4gIHJldHVybiBmaWx0ZXJlZFF1ZXJ5XG59XG5cbi8qKlxuICogUmVzb2x2ZXMgYSBnaXZlbiBoeXBlcmxpbmsgd2l0aCBhIGNlcnRhaW4gcm91dGVyIHN0YXRlIChiYXNlUGF0aCBub3QgaW5jbHVkZWQpLlxuICogUHJlc2VydmVzIGFic29sdXRlIHVybHMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZXNvbHZlSHJlZihcbiAgY3VycmVudFBhdGg6IHN0cmluZyxcbiAgaHJlZjogVXJsLFxuICByZXNvbHZlQXM/OiBib29sZWFuXG4pOiBzdHJpbmcge1xuICAvLyB3ZSB1c2UgYSBkdW1teSBiYXNlIHVybCBmb3IgcmVsYXRpdmUgdXJsc1xuICBsZXQgYmFzZTogVVJMXG5cbiAgdHJ5IHtcbiAgICBiYXNlID0gbmV3IFVSTChjdXJyZW50UGF0aCwgJ2h0dHA6Ly9uJylcbiAgfSBjYXRjaCAoXykge1xuICAgIC8vIGZhbGxiYWNrIHRvIC8gZm9yIGludmFsaWQgYXNQYXRoIHZhbHVlcyBlLmcuIC8vXG4gICAgYmFzZSA9IG5ldyBVUkwoJy8nLCAnaHR0cDovL24nKVxuICB9XG4gIGNvbnN0IHVybEFzU3RyaW5nID1cbiAgICB0eXBlb2YgaHJlZiA9PT0gJ3N0cmluZycgPyBocmVmIDogZm9ybWF0V2l0aFZhbGlkYXRpb24oaHJlZilcbiAgLy8gUmV0dXJuIGJlY2F1c2UgaXQgY2Fubm90IGJlIHJvdXRlZCBieSB0aGUgTmV4dC5qcyByb3V0ZXJcbiAgaWYgKCFpc0xvY2FsVVJMKHVybEFzU3RyaW5nKSkge1xuICAgIHJldHVybiAocmVzb2x2ZUFzID8gW3VybEFzU3RyaW5nXSA6IHVybEFzU3RyaW5nKSBhcyBzdHJpbmdcbiAgfVxuICB0cnkge1xuICAgIGNvbnN0IGZpbmFsVXJsID0gbmV3IFVSTCh1cmxBc1N0cmluZywgYmFzZSlcbiAgICBmaW5hbFVybC5wYXRobmFtZSA9IG5vcm1hbGl6ZVBhdGhUcmFpbGluZ1NsYXNoKGZpbmFsVXJsLnBhdGhuYW1lKVxuICAgIGxldCBpbnRlcnBvbGF0ZWRBcyA9ICcnXG5cbiAgICBpZiAoXG4gICAgICBpc0R5bmFtaWNSb3V0ZShmaW5hbFVybC5wYXRobmFtZSkgJiZcbiAgICAgIGZpbmFsVXJsLnNlYXJjaFBhcmFtcyAmJlxuICAgICAgcmVzb2x2ZUFzXG4gICAgKSB7XG4gICAgICBjb25zdCBxdWVyeSA9IHNlYXJjaFBhcmFtc1RvVXJsUXVlcnkoZmluYWxVcmwuc2VhcmNoUGFyYW1zKVxuXG4gICAgICBjb25zdCB7IHJlc3VsdCwgcGFyYW1zIH0gPSBpbnRlcnBvbGF0ZUFzKFxuICAgICAgICBmaW5hbFVybC5wYXRobmFtZSxcbiAgICAgICAgZmluYWxVcmwucGF0aG5hbWUsXG4gICAgICAgIHF1ZXJ5XG4gICAgICApXG5cbiAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgaW50ZXJwb2xhdGVkQXMgPSBmb3JtYXRXaXRoVmFsaWRhdGlvbih7XG4gICAgICAgICAgcGF0aG5hbWU6IHJlc3VsdCxcbiAgICAgICAgICBoYXNoOiBmaW5hbFVybC5oYXNoLFxuICAgICAgICAgIHF1ZXJ5OiBvbWl0UGFybXNGcm9tUXVlcnkocXVlcnksIHBhcmFtcyksXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gaWYgdGhlIG9yaWdpbiBkaWRuJ3QgY2hhbmdlLCBpdCBtZWFucyB3ZSByZWNlaXZlZCBhIHJlbGF0aXZlIGhyZWZcbiAgICBjb25zdCByZXNvbHZlZEhyZWYgPVxuICAgICAgZmluYWxVcmwub3JpZ2luID09PSBiYXNlLm9yaWdpblxuICAgICAgICA/IGZpbmFsVXJsLmhyZWYuc2xpY2UoZmluYWxVcmwub3JpZ2luLmxlbmd0aClcbiAgICAgICAgOiBmaW5hbFVybC5ocmVmXG5cbiAgICByZXR1cm4gKHJlc29sdmVBc1xuICAgICAgPyBbcmVzb2x2ZWRIcmVmLCBpbnRlcnBvbGF0ZWRBcyB8fCByZXNvbHZlZEhyZWZdXG4gICAgICA6IHJlc29sdmVkSHJlZikgYXMgc3RyaW5nXG4gIH0gY2F0Y2ggKF8pIHtcbiAgICByZXR1cm4gKHJlc29sdmVBcyA/IFt1cmxBc1N0cmluZ10gOiB1cmxBc1N0cmluZykgYXMgc3RyaW5nXG4gIH1cbn1cblxuZnVuY3Rpb24gc3RyaXBPcmlnaW4odXJsOiBzdHJpbmcpIHtcbiAgY29uc3Qgb3JpZ2luID0gZ2V0TG9jYXRpb25PcmlnaW4oKVxuXG4gIHJldHVybiB1cmwuc3RhcnRzV2l0aChvcmlnaW4pID8gdXJsLnN1YnN0cmluZyhvcmlnaW4ubGVuZ3RoKSA6IHVybFxufVxuXG5mdW5jdGlvbiBwcmVwYXJlVXJsQXMocm91dGVyOiBOZXh0Um91dGVyLCB1cmw6IFVybCwgYXM/OiBVcmwpIHtcbiAgLy8gSWYgdXJsIGFuZCBhcyBwcm92aWRlZCBhcyBhbiBvYmplY3QgcmVwcmVzZW50YXRpb24sXG4gIC8vIHdlJ2xsIGZvcm1hdCB0aGVtIGludG8gdGhlIHN0cmluZyB2ZXJzaW9uIGhlcmUuXG4gIGxldCBbcmVzb2x2ZWRIcmVmLCByZXNvbHZlZEFzXSA9IHJlc29sdmVIcmVmKHJvdXRlci5hc1BhdGgsIHVybCwgdHJ1ZSlcbiAgY29uc3Qgb3JpZ2luID0gZ2V0TG9jYXRpb25PcmlnaW4oKVxuICBjb25zdCBocmVmSGFkT3JpZ2luID0gcmVzb2x2ZWRIcmVmLnN0YXJ0c1dpdGgob3JpZ2luKVxuICBjb25zdCBhc0hhZE9yaWdpbiA9IHJlc29sdmVkQXMgJiYgcmVzb2x2ZWRBcy5zdGFydHNXaXRoKG9yaWdpbilcblxuICByZXNvbHZlZEhyZWYgPSBzdHJpcE9yaWdpbihyZXNvbHZlZEhyZWYpXG4gIHJlc29sdmVkQXMgPSByZXNvbHZlZEFzID8gc3RyaXBPcmlnaW4ocmVzb2x2ZWRBcykgOiByZXNvbHZlZEFzXG5cbiAgY29uc3QgcHJlcGFyZWRVcmwgPSBocmVmSGFkT3JpZ2luID8gcmVzb2x2ZWRIcmVmIDogYWRkQmFzZVBhdGgocmVzb2x2ZWRIcmVmKVxuICBjb25zdCBwcmVwYXJlZEFzID0gYXNcbiAgICA/IHN0cmlwT3JpZ2luKHJlc29sdmVIcmVmKHJvdXRlci5hc1BhdGgsIGFzKSlcbiAgICA6IHJlc29sdmVkQXMgfHwgcmVzb2x2ZWRIcmVmXG5cbiAgcmV0dXJuIHtcbiAgICB1cmw6IHByZXBhcmVkVXJsLFxuICAgIGFzOiBhc0hhZE9yaWdpbiA/IHByZXBhcmVkQXMgOiBhZGRCYXNlUGF0aChwcmVwYXJlZEFzKSxcbiAgfVxufVxuXG5mdW5jdGlvbiByZXNvbHZlRHluYW1pY1JvdXRlKHBhdGhuYW1lOiBzdHJpbmcsIHBhZ2VzOiBzdHJpbmdbXSkge1xuICBjb25zdCBjbGVhblBhdGhuYW1lID0gcmVtb3ZlUGF0aFRyYWlsaW5nU2xhc2goZGVub3JtYWxpemVQYWdlUGF0aChwYXRobmFtZSEpKVxuXG4gIGlmIChjbGVhblBhdGhuYW1lID09PSAnLzQwNCcgfHwgY2xlYW5QYXRobmFtZSA9PT0gJy9fZXJyb3InKSB7XG4gICAgcmV0dXJuIHBhdGhuYW1lXG4gIH1cblxuICAvLyBoYW5kbGUgcmVzb2x2aW5nIGhyZWYgZm9yIGR5bmFtaWMgcm91dGVzXG4gIGlmICghcGFnZXMuaW5jbHVkZXMoY2xlYW5QYXRobmFtZSEpKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGFycmF5LWNhbGxiYWNrLXJldHVyblxuICAgIHBhZ2VzLnNvbWUoKHBhZ2UpID0+IHtcbiAgICAgIGlmIChpc0R5bmFtaWNSb3V0ZShwYWdlKSAmJiBnZXRSb3V0ZVJlZ2V4KHBhZ2UpLnJlLnRlc3QoY2xlYW5QYXRobmFtZSEpKSB7XG4gICAgICAgIHBhdGhuYW1lID0gcGFnZVxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuICAgIH0pXG4gIH1cbiAgcmV0dXJuIHJlbW92ZVBhdGhUcmFpbGluZ1NsYXNoKHBhdGhuYW1lKVxufVxuXG5leHBvcnQgdHlwZSBCYXNlUm91dGVyID0ge1xuICByb3V0ZTogc3RyaW5nXG4gIHBhdGhuYW1lOiBzdHJpbmdcbiAgcXVlcnk6IFBhcnNlZFVybFF1ZXJ5XG4gIGFzUGF0aDogc3RyaW5nXG4gIGJhc2VQYXRoOiBzdHJpbmdcbiAgbG9jYWxlPzogc3RyaW5nXG4gIGxvY2FsZXM/OiBzdHJpbmdbXVxuICBkZWZhdWx0TG9jYWxlPzogc3RyaW5nXG4gIGRvbWFpbkxvY2FsZXM/OiBEb21haW5Mb2NhbGVzXG4gIGlzTG9jYWxlRG9tYWluOiBib29sZWFuXG59XG5cbmV4cG9ydCB0eXBlIE5leHRSb3V0ZXIgPSBCYXNlUm91dGVyICZcbiAgUGljazxcbiAgICBSb3V0ZXIsXG4gICAgfCAncHVzaCdcbiAgICB8ICdyZXBsYWNlJ1xuICAgIHwgJ3JlbG9hZCdcbiAgICB8ICdiYWNrJ1xuICAgIHwgJ3ByZWZldGNoJ1xuICAgIHwgJ2JlZm9yZVBvcFN0YXRlJ1xuICAgIHwgJ2V2ZW50cydcbiAgICB8ICdpc0ZhbGxiYWNrJ1xuICAgIHwgJ2lzUmVhZHknXG4gICAgfCAnaXNQcmV2aWV3J1xuICA+XG5cbmV4cG9ydCB0eXBlIFByZWZldGNoT3B0aW9ucyA9IHtcbiAgcHJpb3JpdHk/OiBib29sZWFuXG4gIGxvY2FsZT86IHN0cmluZyB8IGZhbHNlXG59XG5cbmV4cG9ydCB0eXBlIFByaXZhdGVSb3V0ZUluZm8gPVxuICB8IChPbWl0PENvbXBsZXRlUHJpdmF0ZVJvdXRlSW5mbywgJ3N0eWxlU2hlZXRzJz4gJiB7IGluaXRpYWw6IHRydWUgfSlcbiAgfCBDb21wbGV0ZVByaXZhdGVSb3V0ZUluZm9cblxuZXhwb3J0IHR5cGUgQ29tcGxldGVQcml2YXRlUm91dGVJbmZvID0ge1xuICBDb21wb25lbnQ6IENvbXBvbmVudFR5cGVcbiAgc3R5bGVTaGVldHM6IFN0eWxlU2hlZXRUdXBsZVtdXG4gIF9fTl9TU0c/OiBib29sZWFuXG4gIF9fTl9TU1A/OiBib29sZWFuXG4gIHByb3BzPzogUmVjb3JkPHN0cmluZywgYW55PlxuICBlcnI/OiBFcnJvclxuICBlcnJvcj86IGFueVxufVxuXG5leHBvcnQgdHlwZSBBcHBQcm9wcyA9IFBpY2s8Q29tcGxldGVQcml2YXRlUm91dGVJbmZvLCAnQ29tcG9uZW50JyB8ICdlcnInPiAmIHtcbiAgcm91dGVyOiBSb3V0ZXJcbn0gJiBSZWNvcmQ8c3RyaW5nLCBhbnk+XG5leHBvcnQgdHlwZSBBcHBDb21wb25lbnQgPSBDb21wb25lbnRUeXBlPEFwcFByb3BzPlxuXG50eXBlIFN1YnNjcmlwdGlvbiA9IChcbiAgZGF0YTogUHJpdmF0ZVJvdXRlSW5mbyxcbiAgQXBwOiBBcHBDb21wb25lbnQsXG4gIHJlc2V0U2Nyb2xsOiB7IHg6IG51bWJlcjsgeTogbnVtYmVyIH0gfCBudWxsXG4pID0+IFByb21pc2U8dm9pZD5cblxudHlwZSBCZWZvcmVQb3BTdGF0ZUNhbGxiYWNrID0gKHN0YXRlOiBOZXh0SGlzdG9yeVN0YXRlKSA9PiBib29sZWFuXG5cbnR5cGUgQ29tcG9uZW50TG9hZENhbmNlbCA9ICgoKSA9PiB2b2lkKSB8IG51bGxcblxudHlwZSBIaXN0b3J5TWV0aG9kID0gJ3JlcGxhY2VTdGF0ZScgfCAncHVzaFN0YXRlJ1xuXG5jb25zdCBtYW51YWxTY3JvbGxSZXN0b3JhdGlvbiA9XG4gIHByb2Nlc3MuZW52Ll9fTkVYVF9TQ1JPTExfUkVTVE9SQVRJT04gJiZcbiAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgJ3Njcm9sbFJlc3RvcmF0aW9uJyBpbiB3aW5kb3cuaGlzdG9yeSAmJlxuICAhIShmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCB2ID0gJ19fbmV4dCdcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZXF1ZW5jZXNcbiAgICAgIHJldHVybiBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKHYsIHYpLCBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKHYpLCB0cnVlXG4gICAgfSBjYXRjaCAobikge31cbiAgfSkoKVxuXG5jb25zdCBTU0dfREFUQV9OT1RfRk9VTkQgPSBTeW1ib2woJ1NTR19EQVRBX05PVF9GT1VORCcpXG5cbmZ1bmN0aW9uIGZldGNoUmV0cnkodXJsOiBzdHJpbmcsIGF0dGVtcHRzOiBudW1iZXIpOiBQcm9taXNlPGFueT4ge1xuICByZXR1cm4gZmV0Y2godXJsLCB7XG4gICAgLy8gQ29va2llcyBhcmUgcmVxdWlyZWQgdG8gYmUgcHJlc2VudCBmb3IgTmV4dC5qcycgU1NHIFwiUHJldmlldyBNb2RlXCIuXG4gICAgLy8gQ29va2llcyBtYXkgYWxzbyBiZSByZXF1aXJlZCBmb3IgYGdldFNlcnZlclNpZGVQcm9wc2AuXG4gICAgLy9cbiAgICAvLyA+IGBmZXRjaGAgd29u4oCZdCBzZW5kIGNvb2tpZXMsIHVubGVzcyB5b3Ugc2V0IHRoZSBjcmVkZW50aWFscyBpbml0XG4gICAgLy8gPiBvcHRpb24uXG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0ZldGNoX0FQSS9Vc2luZ19GZXRjaFxuICAgIC8vXG4gICAgLy8gPiBGb3IgbWF4aW11bSBicm93c2VyIGNvbXBhdGliaWxpdHkgd2hlbiBpdCBjb21lcyB0byBzZW5kaW5nICZcbiAgICAvLyA+IHJlY2VpdmluZyBjb29raWVzLCBhbHdheXMgc3VwcGx5IHRoZSBgY3JlZGVudGlhbHM6ICdzYW1lLW9yaWdpbidgXG4gICAgLy8gPiBvcHRpb24gaW5zdGVhZCBvZiByZWx5aW5nIG9uIHRoZSBkZWZhdWx0LlxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9naXRodWIvZmV0Y2gjY2F2ZWF0c1xuICAgIGNyZWRlbnRpYWxzOiAnc2FtZS1vcmlnaW4nLFxuICB9KS50aGVuKChyZXMpID0+IHtcbiAgICBpZiAoIXJlcy5vaykge1xuICAgICAgaWYgKGF0dGVtcHRzID4gMSAmJiByZXMuc3RhdHVzID49IDUwMCkge1xuICAgICAgICByZXR1cm4gZmV0Y2hSZXRyeSh1cmwsIGF0dGVtcHRzIC0gMSlcbiAgICAgIH1cbiAgICAgIGlmIChyZXMuc3RhdHVzID09PSA0MDQpIHtcbiAgICAgICAgcmV0dXJuIHJlcy5qc29uKCkudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgIGlmIChkYXRhLm5vdEZvdW5kKSB7XG4gICAgICAgICAgICByZXR1cm4geyBub3RGb3VuZDogU1NHX0RBVEFfTk9UX0ZPVU5EIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBGYWlsZWQgdG8gbG9hZCBzdGF0aWMgcHJvcHNgKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBGYWlsZWQgdG8gbG9hZCBzdGF0aWMgcHJvcHNgKVxuICAgIH1cbiAgICByZXR1cm4gcmVzLmpzb24oKVxuICB9KVxufVxuXG5mdW5jdGlvbiBmZXRjaE5leHREYXRhKGRhdGFIcmVmOiBzdHJpbmcsIGlzU2VydmVyUmVuZGVyOiBib29sZWFuKSB7XG4gIHJldHVybiBmZXRjaFJldHJ5KGRhdGFIcmVmLCBpc1NlcnZlclJlbmRlciA/IDMgOiAxKS5jYXRjaCgoZXJyOiBFcnJvcikgPT4ge1xuICAgIC8vIFdlIHNob3VsZCBvbmx5IHRyaWdnZXIgYSBzZXJ2ZXItc2lkZSB0cmFuc2l0aW9uIGlmIHRoaXMgd2FzIGNhdXNlZFxuICAgIC8vIG9uIGEgY2xpZW50LXNpZGUgdHJhbnNpdGlvbi4gT3RoZXJ3aXNlLCB3ZSdkIGdldCBpbnRvIGFuIGluZmluaXRlXG4gICAgLy8gbG9vcC5cblxuICAgIGlmICghaXNTZXJ2ZXJSZW5kZXIpIHtcbiAgICAgIG1hcmtBc3NldEVycm9yKGVycilcbiAgICB9XG4gICAgdGhyb3cgZXJyXG4gIH0pXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvdXRlciBpbXBsZW1lbnRzIEJhc2VSb3V0ZXIge1xuICByb3V0ZTogc3RyaW5nXG4gIHBhdGhuYW1lOiBzdHJpbmdcbiAgcXVlcnk6IFBhcnNlZFVybFF1ZXJ5XG4gIGFzUGF0aDogc3RyaW5nXG4gIGJhc2VQYXRoOiBzdHJpbmdcblxuICAvKipcbiAgICogTWFwIG9mIGFsbCBjb21wb25lbnRzIGxvYWRlZCBpbiBgUm91dGVyYFxuICAgKi9cbiAgY29tcG9uZW50czogeyBbcGF0aG5hbWU6IHN0cmluZ106IFByaXZhdGVSb3V0ZUluZm8gfVxuICAvLyBTdGF0aWMgRGF0YSBDYWNoZVxuICBzZGM6IHsgW2FzUGF0aDogc3RyaW5nXTogb2JqZWN0IH0gPSB7fVxuICAvLyBJbi1mbGlnaHQgU2VydmVyIERhdGEgUmVxdWVzdHMsIGZvciBkZWR1cGluZ1xuICBzZHI6IHsgW2FzUGF0aDogc3RyaW5nXTogUHJvbWlzZTxvYmplY3Q+IH0gPSB7fVxuXG4gIHN1YjogU3Vic2NyaXB0aW9uXG4gIGNsYzogQ29tcG9uZW50TG9hZENhbmNlbFxuICBwYWdlTG9hZGVyOiBhbnlcbiAgX2JwczogQmVmb3JlUG9wU3RhdGVDYWxsYmFjayB8IHVuZGVmaW5lZFxuICBldmVudHM6IE1pdHRFbWl0dGVyXG4gIF93cmFwQXBwOiAoQXBwOiBBcHBDb21wb25lbnQpID0+IGFueVxuICBpc1NzcjogYm9vbGVhblxuICBpc0ZhbGxiYWNrOiBib29sZWFuXG4gIF9pbkZsaWdodFJvdXRlPzogc3RyaW5nXG4gIF9zaGFsbG93PzogYm9vbGVhblxuICBsb2NhbGU/OiBzdHJpbmdcbiAgbG9jYWxlcz86IHN0cmluZ1tdXG4gIGRlZmF1bHRMb2NhbGU/OiBzdHJpbmdcbiAgZG9tYWluTG9jYWxlcz86IERvbWFpbkxvY2FsZXNcbiAgaXNSZWFkeTogYm9vbGVhblxuICBpc1ByZXZpZXc6IGJvb2xlYW5cbiAgaXNMb2NhbGVEb21haW46IGJvb2xlYW5cblxuICBwcml2YXRlIF9pZHg6IG51bWJlciA9IDBcblxuICBzdGF0aWMgZXZlbnRzOiBNaXR0RW1pdHRlciA9IG1pdHQoKVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHBhdGhuYW1lOiBzdHJpbmcsXG4gICAgcXVlcnk6IFBhcnNlZFVybFF1ZXJ5LFxuICAgIGFzOiBzdHJpbmcsXG4gICAge1xuICAgICAgaW5pdGlhbFByb3BzLFxuICAgICAgcGFnZUxvYWRlcixcbiAgICAgIEFwcCxcbiAgICAgIHdyYXBBcHAsXG4gICAgICBDb21wb25lbnQsXG4gICAgICBlcnIsXG4gICAgICBzdWJzY3JpcHRpb24sXG4gICAgICBpc0ZhbGxiYWNrLFxuICAgICAgbG9jYWxlLFxuICAgICAgbG9jYWxlcyxcbiAgICAgIGRlZmF1bHRMb2NhbGUsXG4gICAgICBkb21haW5Mb2NhbGVzLFxuICAgICAgaXNQcmV2aWV3LFxuICAgIH06IHtcbiAgICAgIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uXG4gICAgICBpbml0aWFsUHJvcHM6IGFueVxuICAgICAgcGFnZUxvYWRlcjogYW55XG4gICAgICBDb21wb25lbnQ6IENvbXBvbmVudFR5cGVcbiAgICAgIEFwcDogQXBwQ29tcG9uZW50XG4gICAgICB3cmFwQXBwOiAoV3JhcEFwcENvbXBvbmVudDogQXBwQ29tcG9uZW50KSA9PiBhbnlcbiAgICAgIGVycj86IEVycm9yXG4gICAgICBpc0ZhbGxiYWNrOiBib29sZWFuXG4gICAgICBsb2NhbGU/OiBzdHJpbmdcbiAgICAgIGxvY2FsZXM/OiBzdHJpbmdbXVxuICAgICAgZGVmYXVsdExvY2FsZT86IHN0cmluZ1xuICAgICAgZG9tYWluTG9jYWxlcz86IERvbWFpbkxvY2FsZXNcbiAgICAgIGlzUHJldmlldz86IGJvb2xlYW5cbiAgICB9XG4gICkge1xuICAgIC8vIHJlcHJlc2VudHMgdGhlIGN1cnJlbnQgY29tcG9uZW50IGtleVxuICAgIHRoaXMucm91dGUgPSByZW1vdmVQYXRoVHJhaWxpbmdTbGFzaChwYXRobmFtZSlcblxuICAgIC8vIHNldCB1cCB0aGUgY29tcG9uZW50IGNhY2hlIChieSByb3V0ZSBrZXlzKVxuICAgIHRoaXMuY29tcG9uZW50cyA9IHt9XG4gICAgLy8gV2Ugc2hvdWxkIG5vdCBrZWVwIHRoZSBjYWNoZSwgaWYgdGhlcmUncyBhbiBlcnJvclxuICAgIC8vIE90aGVyd2lzZSwgdGhpcyBjYXVzZSBpc3N1ZXMgd2hlbiB3aGVuIGdvaW5nIGJhY2sgYW5kXG4gICAgLy8gY29tZSBhZ2FpbiB0byB0aGUgZXJyb3JlZCBwYWdlLlxuICAgIGlmIChwYXRobmFtZSAhPT0gJy9fZXJyb3InKSB7XG4gICAgICB0aGlzLmNvbXBvbmVudHNbdGhpcy5yb3V0ZV0gPSB7XG4gICAgICAgIENvbXBvbmVudCxcbiAgICAgICAgaW5pdGlhbDogdHJ1ZSxcbiAgICAgICAgcHJvcHM6IGluaXRpYWxQcm9wcyxcbiAgICAgICAgZXJyLFxuICAgICAgICBfX05fU1NHOiBpbml0aWFsUHJvcHMgJiYgaW5pdGlhbFByb3BzLl9fTl9TU0csXG4gICAgICAgIF9fTl9TU1A6IGluaXRpYWxQcm9wcyAmJiBpbml0aWFsUHJvcHMuX19OX1NTUCxcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmNvbXBvbmVudHNbJy9fYXBwJ10gPSB7XG4gICAgICBDb21wb25lbnQ6IEFwcCBhcyBDb21wb25lbnRUeXBlLFxuICAgICAgc3R5bGVTaGVldHM6IFtcbiAgICAgICAgLyogL19hcHAgZG9lcyBub3QgbmVlZCBpdHMgc3R5bGVzaGVldHMgbWFuYWdlZCAqL1xuICAgICAgXSxcbiAgICB9XG5cbiAgICAvLyBCYWNrd2FyZHMgY29tcGF0IGZvciBSb3V0ZXIucm91dGVyLmV2ZW50c1xuICAgIC8vIFRPRE86IFNob3VsZCBiZSByZW1vdmUgdGhlIGZvbGxvd2luZyBtYWpvciB2ZXJzaW9uIGFzIGl0IHdhcyBuZXZlciBkb2N1bWVudGVkXG4gICAgdGhpcy5ldmVudHMgPSBSb3V0ZXIuZXZlbnRzXG5cbiAgICB0aGlzLnBhZ2VMb2FkZXIgPSBwYWdlTG9hZGVyXG4gICAgdGhpcy5wYXRobmFtZSA9IHBhdGhuYW1lXG4gICAgdGhpcy5xdWVyeSA9IHF1ZXJ5XG4gICAgLy8gaWYgYXV0byBwcmVyZW5kZXJlZCBhbmQgZHluYW1pYyByb3V0ZSB3YWl0IHRvIHVwZGF0ZSBhc1BhdGhcbiAgICAvLyB1bnRpbCBhZnRlciBtb3VudCB0byBwcmV2ZW50IGh5ZHJhdGlvbiBtaXNtYXRjaFxuICAgIGNvbnN0IGF1dG9FeHBvcnREeW5hbWljID1cbiAgICAgIGlzRHluYW1pY1JvdXRlKHBhdGhuYW1lKSAmJiBzZWxmLl9fTkVYVF9EQVRBX18uYXV0b0V4cG9ydFxuXG4gICAgdGhpcy5hc1BhdGggPSBhdXRvRXhwb3J0RHluYW1pYyA/IHBhdGhuYW1lIDogYXNcbiAgICB0aGlzLmJhc2VQYXRoID0gYmFzZVBhdGhcbiAgICB0aGlzLnN1YiA9IHN1YnNjcmlwdGlvblxuICAgIHRoaXMuY2xjID0gbnVsbFxuICAgIHRoaXMuX3dyYXBBcHAgPSB3cmFwQXBwXG4gICAgLy8gbWFrZSBzdXJlIHRvIGlnbm9yZSBleHRyYSBwb3BTdGF0ZSBpbiBzYWZhcmkgb24gbmF2aWdhdGluZ1xuICAgIC8vIGJhY2sgZnJvbSBleHRlcm5hbCBzaXRlXG4gICAgdGhpcy5pc1NzciA9IHRydWVcblxuICAgIHRoaXMuaXNGYWxsYmFjayA9IGlzRmFsbGJhY2tcblxuICAgIHRoaXMuaXNSZWFkeSA9ICEhKFxuICAgICAgc2VsZi5fX05FWFRfREFUQV9fLmdzc3AgfHxcbiAgICAgIHNlbGYuX19ORVhUX0RBVEFfXy5naXAgfHxcbiAgICAgICghYXV0b0V4cG9ydER5bmFtaWMgJiZcbiAgICAgICAgIXNlbGYubG9jYXRpb24uc2VhcmNoICYmXG4gICAgICAgICFwcm9jZXNzLmVudi5fX05FWFRfSEFTX1JFV1JJVEVTKVxuICAgIClcbiAgICB0aGlzLmlzUHJldmlldyA9ICEhaXNQcmV2aWV3XG4gICAgdGhpcy5pc0xvY2FsZURvbWFpbiA9IGZhbHNlXG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuX19ORVhUX0kxOE5fU1VQUE9SVCkge1xuICAgICAgdGhpcy5sb2NhbGUgPSBsb2NhbGVcbiAgICAgIHRoaXMubG9jYWxlcyA9IGxvY2FsZXNcbiAgICAgIHRoaXMuZGVmYXVsdExvY2FsZSA9IGRlZmF1bHRMb2NhbGVcbiAgICAgIHRoaXMuZG9tYWluTG9jYWxlcyA9IGRvbWFpbkxvY2FsZXNcbiAgICAgIHRoaXMuaXNMb2NhbGVEb21haW4gPSAhIWRldGVjdERvbWFpbkxvY2FsZShcbiAgICAgICAgZG9tYWluTG9jYWxlcyxcbiAgICAgICAgc2VsZi5sb2NhdGlvbi5ob3N0bmFtZVxuICAgICAgKVxuICAgIH1cblxuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgLy8gbWFrZSBzdXJlIFwiYXNcIiBkb2Vzbid0IHN0YXJ0IHdpdGggZG91YmxlIHNsYXNoZXMgb3IgZWxzZSBpdCBjYW5cbiAgICAgIC8vIHRocm93IGFuIGVycm9yIGFzIGl0J3MgY29uc2lkZXJlZCBpbnZhbGlkXG4gICAgICBpZiAoYXMuc3Vic3RyKDAsIDIpICE9PSAnLy8nKSB7XG4gICAgICAgIC8vIGluIG9yZGVyIGZvciBgZS5zdGF0ZWAgdG8gd29yayBvbiB0aGUgYG9ucG9wc3RhdGVgIGV2ZW50XG4gICAgICAgIC8vIHdlIGhhdmUgdG8gcmVnaXN0ZXIgdGhlIGluaXRpYWwgcm91dGUgdXBvbiBpbml0aWFsaXphdGlvblxuICAgICAgICB0aGlzLmNoYW5nZVN0YXRlKFxuICAgICAgICAgICdyZXBsYWNlU3RhdGUnLFxuICAgICAgICAgIGZvcm1hdFdpdGhWYWxpZGF0aW9uKHsgcGF0aG5hbWU6IGFkZEJhc2VQYXRoKHBhdGhuYW1lKSwgcXVlcnkgfSksXG4gICAgICAgICAgZ2V0VVJMKCksXG4gICAgICAgICAgeyBsb2NhbGUgfVxuICAgICAgICApXG4gICAgICB9XG5cbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwb3BzdGF0ZScsIHRoaXMub25Qb3BTdGF0ZSlcblxuICAgICAgLy8gZW5hYmxlIGN1c3RvbSBzY3JvbGwgcmVzdG9yYXRpb24gaGFuZGxpbmcgd2hlbiBhdmFpbGFibGVcbiAgICAgIC8vIG90aGVyd2lzZSBmYWxsYmFjayB0byBicm93c2VyJ3MgZGVmYXVsdCBoYW5kbGluZ1xuICAgICAgaWYgKHByb2Nlc3MuZW52Ll9fTkVYVF9TQ1JPTExfUkVTVE9SQVRJT04pIHtcbiAgICAgICAgaWYgKG1hbnVhbFNjcm9sbFJlc3RvcmF0aW9uKSB7XG4gICAgICAgICAgd2luZG93Lmhpc3Rvcnkuc2Nyb2xsUmVzdG9yYXRpb24gPSAnbWFudWFsJ1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgb25Qb3BTdGF0ZSA9IChlOiBQb3BTdGF0ZUV2ZW50KTogdm9pZCA9PiB7XG4gICAgY29uc3Qgc3RhdGUgPSBlLnN0YXRlIGFzIEhpc3RvcnlTdGF0ZVxuXG4gICAgaWYgKCFzdGF0ZSkge1xuICAgICAgLy8gV2UgZ2V0IHN0YXRlIGFzIHVuZGVmaW5lZCBmb3IgdHdvIHJlYXNvbnMuXG4gICAgICAvLyAgMS4gV2l0aCBvbGRlciBzYWZhcmkgKDwgOCkgYW5kIG9sZGVyIGNocm9tZSAoPCAzNClcbiAgICAgIC8vICAyLiBXaGVuIHRoZSBVUkwgY2hhbmdlZCB3aXRoICNcbiAgICAgIC8vXG4gICAgICAvLyBJbiB0aGUgYm90aCBjYXNlcywgd2UgZG9uJ3QgbmVlZCB0byBwcm9jZWVkIGFuZCBjaGFuZ2UgdGhlIHJvdXRlLlxuICAgICAgLy8gKGFzIGl0J3MgYWxyZWFkeSBjaGFuZ2VkKVxuICAgICAgLy8gQnV0IHdlIGNhbiBzaW1wbHkgcmVwbGFjZSB0aGUgc3RhdGUgd2l0aCB0aGUgbmV3IGNoYW5nZXMuXG4gICAgICAvLyBBY3R1YWxseSwgZm9yICgxKSB3ZSBkb24ndCBuZWVkIHRvIG5vdGhpbmcuIEJ1dCBpdCdzIGhhcmQgdG8gZGV0ZWN0IHRoYXQgZXZlbnQuXG4gICAgICAvLyBTbywgZG9pbmcgdGhlIGZvbGxvd2luZyBmb3IgKDEpIGRvZXMgbm8gaGFybS5cbiAgICAgIGNvbnN0IHsgcGF0aG5hbWUsIHF1ZXJ5IH0gPSB0aGlzXG4gICAgICB0aGlzLmNoYW5nZVN0YXRlKFxuICAgICAgICAncmVwbGFjZVN0YXRlJyxcbiAgICAgICAgZm9ybWF0V2l0aFZhbGlkYXRpb24oeyBwYXRobmFtZTogYWRkQmFzZVBhdGgocGF0aG5hbWUpLCBxdWVyeSB9KSxcbiAgICAgICAgZ2V0VVJMKClcbiAgICAgIClcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGlmICghc3RhdGUuX19OKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBsZXQgZm9yY2VkU2Nyb2xsOiB7IHg6IG51bWJlcjsgeTogbnVtYmVyIH0gfCB1bmRlZmluZWRcbiAgICBjb25zdCB7IHVybCwgYXMsIG9wdGlvbnMsIGlkeCB9ID0gc3RhdGVcbiAgICBpZiAocHJvY2Vzcy5lbnYuX19ORVhUX1NDUk9MTF9SRVNUT1JBVElPTikge1xuICAgICAgaWYgKG1hbnVhbFNjcm9sbFJlc3RvcmF0aW9uKSB7XG4gICAgICAgIGlmICh0aGlzLl9pZHggIT09IGlkeCkge1xuICAgICAgICAgIC8vIFNuYXBzaG90IGN1cnJlbnQgc2Nyb2xsIHBvc2l0aW9uOlxuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFxuICAgICAgICAgICAgICAnX19uZXh0X3Njcm9sbF8nICsgdGhpcy5faWR4LFxuICAgICAgICAgICAgICBKU09OLnN0cmluZ2lmeSh7IHg6IHNlbGYucGFnZVhPZmZzZXQsIHk6IHNlbGYucGFnZVlPZmZzZXQgfSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9IGNhdGNoIHt9XG5cbiAgICAgICAgICAvLyBSZXN0b3JlIG9sZCBzY3JvbGwgcG9zaXRpb246XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHYgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdfX25leHRfc2Nyb2xsXycgKyBpZHgpXG4gICAgICAgICAgICBmb3JjZWRTY3JvbGwgPSBKU09OLnBhcnNlKHYhKVxuICAgICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgICAgZm9yY2VkU2Nyb2xsID0geyB4OiAwLCB5OiAwIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5faWR4ID0gaWR4XG5cbiAgICBjb25zdCB7IHBhdGhuYW1lIH0gPSBwYXJzZVJlbGF0aXZlVXJsKHVybClcblxuICAgIC8vIE1ha2Ugc3VyZSB3ZSBkb24ndCByZS1yZW5kZXIgb24gaW5pdGlhbCBsb2FkLFxuICAgIC8vIGNhbiBiZSBjYXVzZWQgYnkgbmF2aWdhdGluZyBiYWNrIGZyb20gYW4gZXh0ZXJuYWwgc2l0ZVxuICAgIGlmICh0aGlzLmlzU3NyICYmIGFzID09PSB0aGlzLmFzUGF0aCAmJiBwYXRobmFtZSA9PT0gdGhpcy5wYXRobmFtZSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgLy8gSWYgdGhlIGRvd25zdHJlYW0gYXBwbGljYXRpb24gcmV0dXJucyBmYWxzeSwgcmV0dXJuLlxuICAgIC8vIFRoZXkgd2lsbCB0aGVuIGJlIHJlc3BvbnNpYmxlIGZvciBoYW5kbGluZyB0aGUgZXZlbnQuXG4gICAgaWYgKHRoaXMuX2JwcyAmJiAhdGhpcy5fYnBzKHN0YXRlKSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgdGhpcy5jaGFuZ2UoXG4gICAgICAncmVwbGFjZVN0YXRlJyxcbiAgICAgIHVybCxcbiAgICAgIGFzLFxuICAgICAgT2JqZWN0LmFzc2lnbjx7fSwgVHJhbnNpdGlvbk9wdGlvbnMsIFRyYW5zaXRpb25PcHRpb25zPih7fSwgb3B0aW9ucywge1xuICAgICAgICBzaGFsbG93OiBvcHRpb25zLnNoYWxsb3cgJiYgdGhpcy5fc2hhbGxvdyxcbiAgICAgICAgbG9jYWxlOiBvcHRpb25zLmxvY2FsZSB8fCB0aGlzLmRlZmF1bHRMb2NhbGUsXG4gICAgICB9KSxcbiAgICAgIGZvcmNlZFNjcm9sbFxuICAgIClcbiAgfVxuXG4gIHJlbG9hZCgpOiB2b2lkIHtcbiAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKClcbiAgfVxuXG4gIC8qKlxuICAgKiBHbyBiYWNrIGluIGhpc3RvcnlcbiAgICovXG4gIGJhY2soKSB7XG4gICAgd2luZG93Lmhpc3RvcnkuYmFjaygpXG4gIH1cblxuICAvKipcbiAgICogUGVyZm9ybXMgYSBgcHVzaFN0YXRlYCB3aXRoIGFyZ3VtZW50c1xuICAgKiBAcGFyYW0gdXJsIG9mIHRoZSByb3V0ZVxuICAgKiBAcGFyYW0gYXMgbWFza3MgYHVybGAgZm9yIHRoZSBicm93c2VyXG4gICAqIEBwYXJhbSBvcHRpb25zIG9iamVjdCB5b3UgY2FuIGRlZmluZSBgc2hhbGxvd2AgYW5kIG90aGVyIG9wdGlvbnNcbiAgICovXG4gIHB1c2godXJsOiBVcmwsIGFzPzogVXJsLCBvcHRpb25zOiBUcmFuc2l0aW9uT3B0aW9ucyA9IHt9KSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Ll9fTkVYVF9TQ1JPTExfUkVTVE9SQVRJT04pIHtcbiAgICAgIC8vIFRPRE86IHJlbW92ZSBpbiB0aGUgZnV0dXJlIHdoZW4gd2UgdXBkYXRlIGhpc3RvcnkgYmVmb3JlIHJvdXRlIGNoYW5nZVxuICAgICAgLy8gaXMgY29tcGxldGUsIGFzIHRoZSBwb3BzdGF0ZSBldmVudCBzaG91bGQgaGFuZGxlIHRoaXMgY2FwdHVyZS5cbiAgICAgIGlmIChtYW51YWxTY3JvbGxSZXN0b3JhdGlvbikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIC8vIFNuYXBzaG90IHNjcm9sbCBwb3NpdGlvbiByaWdodCBiZWZvcmUgbmF2aWdhdGluZyB0byBhIG5ldyBwYWdlOlxuICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXG4gICAgICAgICAgICAnX19uZXh0X3Njcm9sbF8nICsgdGhpcy5faWR4LFxuICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoeyB4OiBzZWxmLnBhZ2VYT2Zmc2V0LCB5OiBzZWxmLnBhZ2VZT2Zmc2V0IH0pXG4gICAgICAgICAgKVxuICAgICAgICB9IGNhdGNoIHt9XG4gICAgICB9XG4gICAgfVxuICAgIDsoeyB1cmwsIGFzIH0gPSBwcmVwYXJlVXJsQXModGhpcywgdXJsLCBhcykpXG4gICAgcmV0dXJuIHRoaXMuY2hhbmdlKCdwdXNoU3RhdGUnLCB1cmwsIGFzLCBvcHRpb25zKVxuICB9XG5cbiAgLyoqXG4gICAqIFBlcmZvcm1zIGEgYHJlcGxhY2VTdGF0ZWAgd2l0aCBhcmd1bWVudHNcbiAgICogQHBhcmFtIHVybCBvZiB0aGUgcm91dGVcbiAgICogQHBhcmFtIGFzIG1hc2tzIGB1cmxgIGZvciB0aGUgYnJvd3NlclxuICAgKiBAcGFyYW0gb3B0aW9ucyBvYmplY3QgeW91IGNhbiBkZWZpbmUgYHNoYWxsb3dgIGFuZCBvdGhlciBvcHRpb25zXG4gICAqL1xuICByZXBsYWNlKHVybDogVXJsLCBhcz86IFVybCwgb3B0aW9uczogVHJhbnNpdGlvbk9wdGlvbnMgPSB7fSkge1xuICAgIDsoeyB1cmwsIGFzIH0gPSBwcmVwYXJlVXJsQXModGhpcywgdXJsLCBhcykpXG4gICAgcmV0dXJuIHRoaXMuY2hhbmdlKCdyZXBsYWNlU3RhdGUnLCB1cmwsIGFzLCBvcHRpb25zKVxuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBjaGFuZ2UoXG4gICAgbWV0aG9kOiBIaXN0b3J5TWV0aG9kLFxuICAgIHVybDogc3RyaW5nLFxuICAgIGFzOiBzdHJpbmcsXG4gICAgb3B0aW9uczogVHJhbnNpdGlvbk9wdGlvbnMsXG4gICAgZm9yY2VkU2Nyb2xsPzogeyB4OiBudW1iZXI7IHk6IG51bWJlciB9XG4gICk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGlmICghaXNMb2NhbFVSTCh1cmwpKSB7XG4gICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHVybFxuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIGNvbnN0IHNob3VsZFJlc29sdmVIcmVmID0gdXJsID09PSBhcyB8fCAob3B0aW9ucyBhcyBhbnkpLl9oXG5cbiAgICAvLyBmb3Igc3RhdGljIHBhZ2VzIHdpdGggcXVlcnkgcGFyYW1zIGluIHRoZSBVUkwgd2UgZGVsYXlcbiAgICAvLyBtYXJraW5nIHRoZSByb3V0ZXIgcmVhZHkgdW50aWwgYWZ0ZXIgdGhlIHF1ZXJ5IGlzIHVwZGF0ZWRcbiAgICBpZiAoKG9wdGlvbnMgYXMgYW55KS5faCkge1xuICAgICAgdGhpcy5pc1JlYWR5ID0gdHJ1ZVxuICAgIH1cblxuICAgIC8vIERlZmF1bHQgdG8gc2Nyb2xsIHJlc2V0IGJlaGF2aW9yIHVubGVzcyBleHBsaWNpdGx5IHNwZWNpZmllZCB0byBiZVxuICAgIC8vIGBmYWxzZWAhIFRoaXMgbWFrZXMgdGhlIGJlaGF2aW9yIGJldHdlZW4gdXNpbmcgYFJvdXRlciNwdXNoYCBhbmQgYVxuICAgIC8vIGA8TGluayAvPmAgY29uc2lzdGVudC5cbiAgICBvcHRpb25zLnNjcm9sbCA9ICEhKG9wdGlvbnMuc2Nyb2xsID8/IHRydWUpXG5cbiAgICBsZXQgbG9jYWxlQ2hhbmdlID0gb3B0aW9ucy5sb2NhbGUgIT09IHRoaXMubG9jYWxlXG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuX19ORVhUX0kxOE5fU1VQUE9SVCkge1xuICAgICAgdGhpcy5sb2NhbGUgPVxuICAgICAgICBvcHRpb25zLmxvY2FsZSA9PT0gZmFsc2VcbiAgICAgICAgICA/IHRoaXMuZGVmYXVsdExvY2FsZVxuICAgICAgICAgIDogb3B0aW9ucy5sb2NhbGUgfHwgdGhpcy5sb2NhbGVcblxuICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLmxvY2FsZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgb3B0aW9ucy5sb2NhbGUgPSB0aGlzLmxvY2FsZVxuICAgICAgfVxuXG4gICAgICBjb25zdCBwYXJzZWRBcyA9IHBhcnNlUmVsYXRpdmVVcmwoaGFzQmFzZVBhdGgoYXMpID8gZGVsQmFzZVBhdGgoYXMpIDogYXMpXG4gICAgICBjb25zdCBsb2NhbGVQYXRoUmVzdWx0ID0gbm9ybWFsaXplTG9jYWxlUGF0aChcbiAgICAgICAgcGFyc2VkQXMucGF0aG5hbWUsXG4gICAgICAgIHRoaXMubG9jYWxlc1xuICAgICAgKVxuXG4gICAgICBpZiAobG9jYWxlUGF0aFJlc3VsdC5kZXRlY3RlZExvY2FsZSkge1xuICAgICAgICB0aGlzLmxvY2FsZSA9IGxvY2FsZVBhdGhSZXN1bHQuZGV0ZWN0ZWRMb2NhbGVcbiAgICAgICAgcGFyc2VkQXMucGF0aG5hbWUgPSBhZGRCYXNlUGF0aChwYXJzZWRBcy5wYXRobmFtZSlcbiAgICAgICAgYXMgPSBmb3JtYXRXaXRoVmFsaWRhdGlvbihwYXJzZWRBcylcbiAgICAgICAgdXJsID0gYWRkQmFzZVBhdGgoXG4gICAgICAgICAgbm9ybWFsaXplTG9jYWxlUGF0aChcbiAgICAgICAgICAgIGhhc0Jhc2VQYXRoKHVybCkgPyBkZWxCYXNlUGF0aCh1cmwpIDogdXJsLFxuICAgICAgICAgICAgdGhpcy5sb2NhbGVzXG4gICAgICAgICAgKS5wYXRobmFtZVxuICAgICAgICApXG4gICAgICB9XG4gICAgICBsZXQgZGlkTmF2aWdhdGUgPSBmYWxzZVxuXG4gICAgICAvLyB3ZSBuZWVkIHRvIHdyYXAgdGhpcyBpbiB0aGUgZW52IGNoZWNrIGFnYWluIHNpbmNlIHJlZ2VuZXJhdG9yIHJ1bnRpbWVcbiAgICAgIC8vIG1vdmVzIHRoaXMgb24gaXRzIG93biBkdWUgdG8gdGhlIHJldHVyblxuICAgICAgaWYgKHByb2Nlc3MuZW52Ll9fTkVYVF9JMThOX1NVUFBPUlQpIHtcbiAgICAgICAgLy8gaWYgdGhlIGxvY2FsZSBpc24ndCBjb25maWd1cmVkIGhhcmQgbmF2aWdhdGUgdG8gc2hvdyA0MDQgcGFnZVxuICAgICAgICBpZiAoIXRoaXMubG9jYWxlcz8uaW5jbHVkZXModGhpcy5sb2NhbGUhKSkge1xuICAgICAgICAgIHBhcnNlZEFzLnBhdGhuYW1lID0gYWRkTG9jYWxlKHBhcnNlZEFzLnBhdGhuYW1lLCB0aGlzLmxvY2FsZSlcbiAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGZvcm1hdFdpdGhWYWxpZGF0aW9uKHBhcnNlZEFzKVxuICAgICAgICAgIC8vIHRoaXMgd2FzIHByZXZpb3VzbHkgYSByZXR1cm4gYnV0IHdhcyByZW1vdmVkIGluIGZhdm9yXG4gICAgICAgICAgLy8gb2YgYmV0dGVyIGRlYWQgY29kZSBlbGltaW5hdGlvbiB3aXRoIHJlZ2VuZXJhdG9yIHJ1bnRpbWVcbiAgICAgICAgICBkaWROYXZpZ2F0ZSA9IHRydWVcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCBkZXRlY3RlZERvbWFpbiA9IGRldGVjdERvbWFpbkxvY2FsZShcbiAgICAgICAgdGhpcy5kb21haW5Mb2NhbGVzLFxuICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgIHRoaXMubG9jYWxlXG4gICAgICApXG5cbiAgICAgIC8vIHdlIG5lZWQgdG8gd3JhcCB0aGlzIGluIHRoZSBlbnYgY2hlY2sgYWdhaW4gc2luY2UgcmVnZW5lcmF0b3IgcnVudGltZVxuICAgICAgLy8gbW92ZXMgdGhpcyBvbiBpdHMgb3duIGR1ZSB0byB0aGUgcmV0dXJuXG4gICAgICBpZiAocHJvY2Vzcy5lbnYuX19ORVhUX0kxOE5fU1VQUE9SVCkge1xuICAgICAgICAvLyBpZiB3ZSBhcmUgbmF2aWdhdGluZyB0byBhIGRvbWFpbiBsb2NhbGUgZW5zdXJlIHdlIHJlZGlyZWN0IHRvIHRoZVxuICAgICAgICAvLyBjb3JyZWN0IGRvbWFpblxuICAgICAgICBpZiAoXG4gICAgICAgICAgIWRpZE5hdmlnYXRlICYmXG4gICAgICAgICAgZGV0ZWN0ZWREb21haW4gJiZcbiAgICAgICAgICB0aGlzLmlzTG9jYWxlRG9tYWluICYmXG4gICAgICAgICAgc2VsZi5sb2NhdGlvbi5ob3N0bmFtZSAhPT0gZGV0ZWN0ZWREb21haW4uZG9tYWluXG4gICAgICAgICkge1xuICAgICAgICAgIGNvbnN0IGFzTm9CYXNlUGF0aCA9IGRlbEJhc2VQYXRoKGFzKVxuICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYGh0dHAke2RldGVjdGVkRG9tYWluLmh0dHAgPyAnJyA6ICdzJ306Ly8ke1xuICAgICAgICAgICAgZGV0ZWN0ZWREb21haW4uZG9tYWluXG4gICAgICAgICAgfSR7YWRkQmFzZVBhdGgoXG4gICAgICAgICAgICBgJHtcbiAgICAgICAgICAgICAgdGhpcy5sb2NhbGUgPT09IGRldGVjdGVkRG9tYWluLmRlZmF1bHRMb2NhbGVcbiAgICAgICAgICAgICAgICA/ICcnXG4gICAgICAgICAgICAgICAgOiBgLyR7dGhpcy5sb2NhbGV9YFxuICAgICAgICAgICAgfSR7YXNOb0Jhc2VQYXRoID09PSAnLycgPyAnJyA6IGFzTm9CYXNlUGF0aH1gIHx8ICcvJ1xuICAgICAgICAgICl9YFxuICAgICAgICAgIC8vIHRoaXMgd2FzIHByZXZpb3VzbHkgYSByZXR1cm4gYnV0IHdhcyByZW1vdmVkIGluIGZhdm9yXG4gICAgICAgICAgLy8gb2YgYmV0dGVyIGRlYWQgY29kZSBlbGltaW5hdGlvbiB3aXRoIHJlZ2VuZXJhdG9yIHJ1bnRpbWVcbiAgICAgICAgICBkaWROYXZpZ2F0ZSA9IHRydWVcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoZGlkTmF2aWdhdGUpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKCgpID0+IHt9KVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghKG9wdGlvbnMgYXMgYW55KS5faCkge1xuICAgICAgdGhpcy5pc1NzciA9IGZhbHNlXG4gICAgfVxuICAgIC8vIG1hcmtpbmcgcm91dGUgY2hhbmdlcyBhcyBhIG5hdmlnYXRpb24gc3RhcnQgZW50cnlcbiAgICBpZiAoU1QpIHtcbiAgICAgIHBlcmZvcm1hbmNlLm1hcmsoJ3JvdXRlQ2hhbmdlJylcbiAgICB9XG5cbiAgICBjb25zdCB7IHNoYWxsb3cgPSBmYWxzZSB9ID0gb3B0aW9uc1xuICAgIGNvbnN0IHJvdXRlUHJvcHMgPSB7IHNoYWxsb3cgfVxuXG4gICAgaWYgKHRoaXMuX2luRmxpZ2h0Um91dGUpIHtcbiAgICAgIHRoaXMuYWJvcnRDb21wb25lbnRMb2FkKHRoaXMuX2luRmxpZ2h0Um91dGUsIHJvdXRlUHJvcHMpXG4gICAgfVxuXG4gICAgYXMgPSBhZGRCYXNlUGF0aChcbiAgICAgIGFkZExvY2FsZShcbiAgICAgICAgaGFzQmFzZVBhdGgoYXMpID8gZGVsQmFzZVBhdGgoYXMpIDogYXMsXG4gICAgICAgIG9wdGlvbnMubG9jYWxlLFxuICAgICAgICB0aGlzLmRlZmF1bHRMb2NhbGVcbiAgICAgIClcbiAgICApXG4gICAgY29uc3QgY2xlYW5lZEFzID0gZGVsTG9jYWxlKFxuICAgICAgaGFzQmFzZVBhdGgoYXMpID8gZGVsQmFzZVBhdGgoYXMpIDogYXMsXG4gICAgICB0aGlzLmxvY2FsZVxuICAgIClcbiAgICB0aGlzLl9pbkZsaWdodFJvdXRlID0gYXNcblxuICAgIC8vIElmIHRoZSB1cmwgY2hhbmdlIGlzIG9ubHkgcmVsYXRlZCB0byBhIGhhc2ggY2hhbmdlXG4gICAgLy8gV2Ugc2hvdWxkIG5vdCBwcm9jZWVkLiBXZSBzaG91bGQgb25seSBjaGFuZ2UgdGhlIHN0YXRlLlxuXG4gICAgLy8gV0FSTklORzogYF9oYCBpcyBhbiBpbnRlcm5hbCBvcHRpb24gZm9yIGhhbmRpbmcgTmV4dC5qcyBjbGllbnQtc2lkZVxuICAgIC8vIGh5ZHJhdGlvbi4gWW91ciBhcHAgc2hvdWxkIF9uZXZlcl8gdXNlIHRoaXMgcHJvcGVydHkuIEl0IG1heSBjaGFuZ2UgYXRcbiAgICAvLyBhbnkgdGltZSB3aXRob3V0IG5vdGljZS5cbiAgICBpZiAoIShvcHRpb25zIGFzIGFueSkuX2ggJiYgdGhpcy5vbmx5QUhhc2hDaGFuZ2UoY2xlYW5lZEFzKSkge1xuICAgICAgdGhpcy5hc1BhdGggPSBjbGVhbmVkQXNcbiAgICAgIFJvdXRlci5ldmVudHMuZW1pdCgnaGFzaENoYW5nZVN0YXJ0JywgYXMsIHJvdXRlUHJvcHMpXG4gICAgICAvLyBUT0RPOiBkbyB3ZSBuZWVkIHRoZSByZXNvbHZlZCBocmVmIHdoZW4gb25seSBhIGhhc2ggY2hhbmdlP1xuICAgICAgdGhpcy5jaGFuZ2VTdGF0ZShtZXRob2QsIHVybCwgYXMsIG9wdGlvbnMpXG4gICAgICB0aGlzLnNjcm9sbFRvSGFzaChjbGVhbmVkQXMpXG4gICAgICB0aGlzLm5vdGlmeSh0aGlzLmNvbXBvbmVudHNbdGhpcy5yb3V0ZV0sIG51bGwpXG4gICAgICBSb3V0ZXIuZXZlbnRzLmVtaXQoJ2hhc2hDaGFuZ2VDb21wbGV0ZScsIGFzLCByb3V0ZVByb3BzKVxuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG5cbiAgICBsZXQgcGFyc2VkID0gcGFyc2VSZWxhdGl2ZVVybCh1cmwpXG4gICAgbGV0IHsgcGF0aG5hbWUsIHF1ZXJ5IH0gPSBwYXJzZWRcblxuICAgIC8vIFRoZSBidWlsZCBtYW5pZmVzdCBuZWVkcyB0byBiZSBsb2FkZWQgYmVmb3JlIGF1dG8tc3RhdGljIGR5bmFtaWMgcGFnZXNcbiAgICAvLyBnZXQgdGhlaXIgcXVlcnkgcGFyYW1ldGVycyB0byBhbGxvdyBlbnN1cmluZyB0aGV5IGNhbiBiZSBwYXJzZWQgcHJvcGVybHlcbiAgICAvLyB3aGVuIHJld3JpdHRlbiB0b1xuICAgIGxldCBwYWdlczogYW55LCByZXdyaXRlczogYW55XG4gICAgdHJ5IHtcbiAgICAgIHBhZ2VzID0gYXdhaXQgdGhpcy5wYWdlTG9hZGVyLmdldFBhZ2VMaXN0KClcbiAgICAgIDsoeyBfX3Jld3JpdGVzOiByZXdyaXRlcyB9ID0gYXdhaXQgZ2V0Q2xpZW50QnVpbGRNYW5pZmVzdCgpKVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgLy8gSWYgd2UgZmFpbCB0byByZXNvbHZlIHRoZSBwYWdlIGxpc3Qgb3IgY2xpZW50LWJ1aWxkIG1hbmlmZXN0LCB3ZSBtdXN0XG4gICAgICAvLyBkbyBhIHNlcnZlci1zaWRlIHRyYW5zaXRpb246XG4gICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGFzXG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICAvLyBJZiBhc2tlZCB0byBjaGFuZ2UgdGhlIGN1cnJlbnQgVVJMIHdlIHNob3VsZCByZWxvYWQgdGhlIGN1cnJlbnQgcGFnZVxuICAgIC8vIChub3QgbG9jYXRpb24ucmVsb2FkKCkgYnV0IHJlbG9hZCBnZXRJbml0aWFsUHJvcHMgYW5kIG90aGVyIE5leHQuanMgc3R1ZmZzKVxuICAgIC8vIFdlIGFsc28gbmVlZCB0byBzZXQgdGhlIG1ldGhvZCA9IHJlcGxhY2VTdGF0ZSBhbHdheXNcbiAgICAvLyBhcyB0aGlzIHNob3VsZCBub3QgZ28gaW50byB0aGUgaGlzdG9yeSAoVGhhdCdzIGhvdyBicm93c2VycyB3b3JrKVxuICAgIC8vIFdlIHNob3VsZCBjb21wYXJlIHRoZSBuZXcgYXNQYXRoIHRvIHRoZSBjdXJyZW50IGFzUGF0aCwgbm90IHRoZSB1cmxcbiAgICBpZiAoIXRoaXMudXJsSXNOZXcoY2xlYW5lZEFzKSAmJiAhbG9jYWxlQ2hhbmdlKSB7XG4gICAgICBtZXRob2QgPSAncmVwbGFjZVN0YXRlJ1xuICAgIH1cblxuICAgIC8vIHdlIG5lZWQgdG8gcmVzb2x2ZSB0aGUgYXMgdmFsdWUgdXNpbmcgcmV3cml0ZXMgZm9yIGR5bmFtaWMgU1NHXG4gICAgLy8gcGFnZXMgdG8gYWxsb3cgYnVpbGRpbmcgdGhlIGRhdGEgVVJMIGNvcnJlY3RseVxuICAgIGxldCByZXNvbHZlZEFzID0gYXNcblxuICAgIC8vIHVybCBhbmQgYXMgc2hvdWxkIGFsd2F5cyBiZSBwcmVmaXhlZCB3aXRoIGJhc2VQYXRoIGJ5IHRoaXNcbiAgICAvLyBwb2ludCBieSBlaXRoZXIgbmV4dC9saW5rIG9yIHJvdXRlci5wdXNoL3JlcGxhY2Ugc28gc3RyaXAgdGhlXG4gICAgLy8gYmFzZVBhdGggZnJvbSB0aGUgcGF0aG5hbWUgdG8gbWF0Y2ggdGhlIHBhZ2VzIGRpciAxLXRvLTFcbiAgICBwYXRobmFtZSA9IHBhdGhuYW1lXG4gICAgICA/IHJlbW92ZVBhdGhUcmFpbGluZ1NsYXNoKGRlbEJhc2VQYXRoKHBhdGhuYW1lKSlcbiAgICAgIDogcGF0aG5hbWVcblxuICAgIGlmIChzaG91bGRSZXNvbHZlSHJlZiAmJiBwYXRobmFtZSAhPT0gJy9fZXJyb3InKSB7XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuX19ORVhUX0hBU19SRVdSSVRFUyAmJiBhcy5zdGFydHNXaXRoKCcvJykpIHtcbiAgICAgICAgY29uc3QgcmV3cml0ZXNSZXN1bHQgPSByZXNvbHZlUmV3cml0ZXMoXG4gICAgICAgICAgYWRkQmFzZVBhdGgoYWRkTG9jYWxlKGNsZWFuZWRBcywgdGhpcy5sb2NhbGUpKSxcbiAgICAgICAgICBwYWdlcyxcbiAgICAgICAgICByZXdyaXRlcyxcbiAgICAgICAgICBxdWVyeSxcbiAgICAgICAgICAocDogc3RyaW5nKSA9PiByZXNvbHZlRHluYW1pY1JvdXRlKHAsIHBhZ2VzKSxcbiAgICAgICAgICB0aGlzLmxvY2FsZXNcbiAgICAgICAgKVxuICAgICAgICByZXNvbHZlZEFzID0gcmV3cml0ZXNSZXN1bHQuYXNQYXRoXG5cbiAgICAgICAgaWYgKHJld3JpdGVzUmVzdWx0Lm1hdGNoZWRQYWdlICYmIHJld3JpdGVzUmVzdWx0LnJlc29sdmVkSHJlZikge1xuICAgICAgICAgIC8vIGlmIHRoaXMgZGlyZWN0bHkgbWF0Y2hlcyBhIHBhZ2Ugd2UgbmVlZCB0byB1cGRhdGUgdGhlIGhyZWYgdG9cbiAgICAgICAgICAvLyBhbGxvdyB0aGUgY29ycmVjdCBwYWdlIGNodW5rIHRvIGJlIGxvYWRlZFxuICAgICAgICAgIHBhdGhuYW1lID0gcmV3cml0ZXNSZXN1bHQucmVzb2x2ZWRIcmVmXG4gICAgICAgICAgcGFyc2VkLnBhdGhuYW1lID0gcGF0aG5hbWVcbiAgICAgICAgICB1cmwgPSBmb3JtYXRXaXRoVmFsaWRhdGlvbihwYXJzZWQpXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhcnNlZC5wYXRobmFtZSA9IHJlc29sdmVEeW5hbWljUm91dGUocGF0aG5hbWUsIHBhZ2VzKVxuXG4gICAgICAgIGlmIChwYXJzZWQucGF0aG5hbWUgIT09IHBhdGhuYW1lKSB7XG4gICAgICAgICAgcGF0aG5hbWUgPSBwYXJzZWQucGF0aG5hbWVcbiAgICAgICAgICB1cmwgPSBmb3JtYXRXaXRoVmFsaWRhdGlvbihwYXJzZWQpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCByb3V0ZSA9IHJlbW92ZVBhdGhUcmFpbGluZ1NsYXNoKHBhdGhuYW1lKVxuXG4gICAgaWYgKCFpc0xvY2FsVVJMKGFzKSkge1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgIGBJbnZhbGlkIGhyZWY6IFwiJHt1cmx9XCIgYW5kIGFzOiBcIiR7YXN9XCIsIHJlY2VpdmVkIHJlbGF0aXZlIGhyZWYgYW5kIGV4dGVybmFsIGFzYCArXG4gICAgICAgICAgICBgXFxuU2VlIG1vcmUgaW5mbzogaHR0cHM6Ly9uZXh0anMub3JnL2RvY3MvbWVzc2FnZXMvaW52YWxpZC1yZWxhdGl2ZS11cmwtZXh0ZXJuYWwtYXNgXG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBhc1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgcmVzb2x2ZWRBcyA9IGRlbExvY2FsZShkZWxCYXNlUGF0aChyZXNvbHZlZEFzKSwgdGhpcy5sb2NhbGUpXG5cbiAgICBpZiAoaXNEeW5hbWljUm91dGUocm91dGUpKSB7XG4gICAgICBjb25zdCBwYXJzZWRBcyA9IHBhcnNlUmVsYXRpdmVVcmwocmVzb2x2ZWRBcylcbiAgICAgIGNvbnN0IGFzUGF0aG5hbWUgPSBwYXJzZWRBcy5wYXRobmFtZVxuXG4gICAgICBjb25zdCByb3V0ZVJlZ2V4ID0gZ2V0Um91dGVSZWdleChyb3V0ZSlcbiAgICAgIGNvbnN0IHJvdXRlTWF0Y2ggPSBnZXRSb3V0ZU1hdGNoZXIocm91dGVSZWdleCkoYXNQYXRobmFtZSlcbiAgICAgIGNvbnN0IHNob3VsZEludGVycG9sYXRlID0gcm91dGUgPT09IGFzUGF0aG5hbWVcbiAgICAgIGNvbnN0IGludGVycG9sYXRlZEFzID0gc2hvdWxkSW50ZXJwb2xhdGVcbiAgICAgICAgPyBpbnRlcnBvbGF0ZUFzKHJvdXRlLCBhc1BhdGhuYW1lLCBxdWVyeSlcbiAgICAgICAgOiAoe30gYXMgeyByZXN1bHQ6IHVuZGVmaW5lZDsgcGFyYW1zOiB1bmRlZmluZWQgfSlcblxuICAgICAgaWYgKCFyb3V0ZU1hdGNoIHx8IChzaG91bGRJbnRlcnBvbGF0ZSAmJiAhaW50ZXJwb2xhdGVkQXMucmVzdWx0KSkge1xuICAgICAgICBjb25zdCBtaXNzaW5nUGFyYW1zID0gT2JqZWN0LmtleXMocm91dGVSZWdleC5ncm91cHMpLmZpbHRlcihcbiAgICAgICAgICAocGFyYW0pID0+ICFxdWVyeVtwYXJhbV1cbiAgICAgICAgKVxuXG4gICAgICAgIGlmIChtaXNzaW5nUGFyYW1zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICAgICBgJHtcbiAgICAgICAgICAgICAgICBzaG91bGRJbnRlcnBvbGF0ZVxuICAgICAgICAgICAgICAgICAgPyBgSW50ZXJwb2xhdGluZyBocmVmYFxuICAgICAgICAgICAgICAgICAgOiBgTWlzbWF0Y2hpbmcgXFxgYXNcXGAgYW5kIFxcYGhyZWZcXGBgXG4gICAgICAgICAgICAgIH0gZmFpbGVkIHRvIG1hbnVhbGx5IHByb3ZpZGUgYCArXG4gICAgICAgICAgICAgICAgYHRoZSBwYXJhbXM6ICR7bWlzc2luZ1BhcmFtcy5qb2luKFxuICAgICAgICAgICAgICAgICAgJywgJ1xuICAgICAgICAgICAgICAgICl9IGluIHRoZSBcXGBocmVmXFxgJ3MgXFxgcXVlcnlcXGBgXG4gICAgICAgICAgICApXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgKHNob3VsZEludGVycG9sYXRlXG4gICAgICAgICAgICAgID8gYFRoZSBwcm92aWRlZCBcXGBocmVmXFxgICgke3VybH0pIHZhbHVlIGlzIG1pc3NpbmcgcXVlcnkgdmFsdWVzICgke21pc3NpbmdQYXJhbXMuam9pbihcbiAgICAgICAgICAgICAgICAgICcsICdcbiAgICAgICAgICAgICAgICApfSkgdG8gYmUgaW50ZXJwb2xhdGVkIHByb3Blcmx5LiBgXG4gICAgICAgICAgICAgIDogYFRoZSBwcm92aWRlZCBcXGBhc1xcYCB2YWx1ZSAoJHthc1BhdGhuYW1lfSkgaXMgaW5jb21wYXRpYmxlIHdpdGggdGhlIFxcYGhyZWZcXGAgdmFsdWUgKCR7cm91dGV9KS4gYCkgK1xuICAgICAgICAgICAgICBgUmVhZCBtb3JlOiBodHRwczovL25leHRqcy5vcmcvZG9jcy9tZXNzYWdlcy8ke1xuICAgICAgICAgICAgICAgIHNob3VsZEludGVycG9sYXRlXG4gICAgICAgICAgICAgICAgICA/ICdocmVmLWludGVycG9sYXRpb24tZmFpbGVkJ1xuICAgICAgICAgICAgICAgICAgOiAnaW5jb21wYXRpYmxlLWhyZWYtYXMnXG4gICAgICAgICAgICAgIH1gXG4gICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHNob3VsZEludGVycG9sYXRlKSB7XG4gICAgICAgIGFzID0gZm9ybWF0V2l0aFZhbGlkYXRpb24oXG4gICAgICAgICAgT2JqZWN0LmFzc2lnbih7fSwgcGFyc2VkQXMsIHtcbiAgICAgICAgICAgIHBhdGhuYW1lOiBpbnRlcnBvbGF0ZWRBcy5yZXN1bHQsXG4gICAgICAgICAgICBxdWVyeTogb21pdFBhcm1zRnJvbVF1ZXJ5KHF1ZXJ5LCBpbnRlcnBvbGF0ZWRBcy5wYXJhbXMhKSxcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBNZXJnZSBwYXJhbXMgaW50byBgcXVlcnlgLCBvdmVyd3JpdGluZyBhbnkgc3BlY2lmaWVkIGluIHNlYXJjaFxuICAgICAgICBPYmplY3QuYXNzaWduKHF1ZXJ5LCByb3V0ZU1hdGNoKVxuICAgICAgfVxuICAgIH1cblxuICAgIFJvdXRlci5ldmVudHMuZW1pdCgncm91dGVDaGFuZ2VTdGFydCcsIGFzLCByb3V0ZVByb3BzKVxuXG4gICAgdHJ5IHtcbiAgICAgIGxldCByb3V0ZUluZm8gPSBhd2FpdCB0aGlzLmdldFJvdXRlSW5mbyhcbiAgICAgICAgcm91dGUsXG4gICAgICAgIHBhdGhuYW1lLFxuICAgICAgICBxdWVyeSxcbiAgICAgICAgYXMsXG4gICAgICAgIHJlc29sdmVkQXMsXG4gICAgICAgIHJvdXRlUHJvcHNcbiAgICAgIClcbiAgICAgIGxldCB7IGVycm9yLCBwcm9wcywgX19OX1NTRywgX19OX1NTUCB9ID0gcm91dGVJbmZvXG5cbiAgICAgIC8vIGhhbmRsZSByZWRpcmVjdCBvbiBjbGllbnQtdHJhbnNpdGlvblxuICAgICAgaWYgKChfX05fU1NHIHx8IF9fTl9TU1ApICYmIHByb3BzKSB7XG4gICAgICAgIGlmICgocHJvcHMgYXMgYW55KS5wYWdlUHJvcHMgJiYgKHByb3BzIGFzIGFueSkucGFnZVByb3BzLl9fTl9SRURJUkVDVCkge1xuICAgICAgICAgIGNvbnN0IGRlc3RpbmF0aW9uID0gKHByb3BzIGFzIGFueSkucGFnZVByb3BzLl9fTl9SRURJUkVDVFxuXG4gICAgICAgICAgLy8gY2hlY2sgaWYgZGVzdGluYXRpb24gaXMgaW50ZXJuYWwgKHJlc29sdmVzIHRvIGEgcGFnZSkgYW5kIGF0dGVtcHRcbiAgICAgICAgICAvLyBjbGllbnQtbmF2aWdhdGlvbiBpZiBpdCBpcyBmYWxsaW5nIGJhY2sgdG8gaGFyZCBuYXZpZ2F0aW9uIGlmXG4gICAgICAgICAgLy8gaXQncyBub3RcbiAgICAgICAgICBpZiAoZGVzdGluYXRpb24uc3RhcnRzV2l0aCgnLycpKSB7XG4gICAgICAgICAgICBjb25zdCBwYXJzZWRIcmVmID0gcGFyc2VSZWxhdGl2ZVVybChkZXN0aW5hdGlvbilcbiAgICAgICAgICAgIHBhcnNlZEhyZWYucGF0aG5hbWUgPSByZXNvbHZlRHluYW1pY1JvdXRlKFxuICAgICAgICAgICAgICBwYXJzZWRIcmVmLnBhdGhuYW1lLFxuICAgICAgICAgICAgICBwYWdlc1xuICAgICAgICAgICAgKVxuXG4gICAgICAgICAgICBpZiAocGFnZXMuaW5jbHVkZXMocGFyc2VkSHJlZi5wYXRobmFtZSkpIHtcbiAgICAgICAgICAgICAgY29uc3QgeyB1cmw6IG5ld1VybCwgYXM6IG5ld0FzIH0gPSBwcmVwYXJlVXJsQXMoXG4gICAgICAgICAgICAgICAgdGhpcyxcbiAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbixcbiAgICAgICAgICAgICAgICBkZXN0aW5hdGlvblxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLmNoYW5nZShtZXRob2QsIG5ld1VybCwgbmV3QXMsIG9wdGlvbnMpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBkZXN0aW5hdGlvblxuICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgoKSA9PiB7fSlcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaXNQcmV2aWV3ID0gISFwcm9wcy5fX05fUFJFVklFV1xuXG4gICAgICAgIC8vIGhhbmRsZSBTU0cgZGF0YSA0MDRcbiAgICAgICAgaWYgKHByb3BzLm5vdEZvdW5kID09PSBTU0dfREFUQV9OT1RfRk9VTkQpIHtcbiAgICAgICAgICBsZXQgbm90Rm91bmRSb3V0ZVxuXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuZmV0Y2hDb21wb25lbnQoJy80MDQnKVxuICAgICAgICAgICAgbm90Rm91bmRSb3V0ZSA9ICcvNDA0J1xuICAgICAgICAgIH0gY2F0Y2ggKF8pIHtcbiAgICAgICAgICAgIG5vdEZvdW5kUm91dGUgPSAnL19lcnJvcidcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByb3V0ZUluZm8gPSBhd2FpdCB0aGlzLmdldFJvdXRlSW5mbyhcbiAgICAgICAgICAgIG5vdEZvdW5kUm91dGUsXG4gICAgICAgICAgICBub3RGb3VuZFJvdXRlLFxuICAgICAgICAgICAgcXVlcnksXG4gICAgICAgICAgICBhcyxcbiAgICAgICAgICAgIHJlc29sdmVkQXMsXG4gICAgICAgICAgICB7IHNoYWxsb3c6IGZhbHNlIH1cbiAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgUm91dGVyLmV2ZW50cy5lbWl0KCdiZWZvcmVIaXN0b3J5Q2hhbmdlJywgYXMsIHJvdXRlUHJvcHMpXG4gICAgICB0aGlzLmNoYW5nZVN0YXRlKG1ldGhvZCwgdXJsLCBhcywgb3B0aW9ucylcblxuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgY29uc3QgYXBwQ29tcDogYW55ID0gdGhpcy5jb21wb25lbnRzWycvX2FwcCddLkNvbXBvbmVudFxuICAgICAgICA7KHdpbmRvdyBhcyBhbnkpLm5leHQuaXNQcmVyZW5kZXJlZCA9XG4gICAgICAgICAgYXBwQ29tcC5nZXRJbml0aWFsUHJvcHMgPT09IGFwcENvbXAub3JpZ0dldEluaXRpYWxQcm9wcyAmJlxuICAgICAgICAgICEocm91dGVJbmZvLkNvbXBvbmVudCBhcyBhbnkpLmdldEluaXRpYWxQcm9wc1xuICAgICAgfVxuXG4gICAgICAvLyBzaGFsbG93IHJvdXRpbmcgaXMgb25seSBhbGxvd2VkIGZvciBzYW1lIHBhZ2UgVVJMIGNoYW5nZXMuXG4gICAgICBjb25zdCBpc1ZhbGlkU2hhbGxvd1JvdXRlID0gb3B0aW9ucy5zaGFsbG93ICYmIHRoaXMucm91dGUgPT09IHJvdXRlXG5cbiAgICAgIGlmIChcbiAgICAgICAgKG9wdGlvbnMgYXMgYW55KS5faCAmJlxuICAgICAgICBwYXRobmFtZSA9PT0gJy9fZXJyb3InICYmXG4gICAgICAgIHNlbGYuX19ORVhUX0RBVEFfXy5wcm9wcz8ucGFnZVByb3BzPy5zdGF0dXNDb2RlID09PSA1MDAgJiZcbiAgICAgICAgcHJvcHM/LnBhZ2VQcm9wc1xuICAgICAgKSB7XG4gICAgICAgIC8vIGVuc3VyZSBzdGF0dXNDb2RlIGlzIHN0aWxsIGNvcnJlY3QgZm9yIHN0YXRpYyA1MDAgcGFnZVxuICAgICAgICAvLyB3aGVuIHVwZGF0aW5nIHF1ZXJ5IGluZm9ybWF0aW9uXG4gICAgICAgIHByb3BzLnBhZ2VQcm9wcy5zdGF0dXNDb2RlID0gNTAwXG4gICAgICB9XG5cbiAgICAgIGF3YWl0IHRoaXMuc2V0KFxuICAgICAgICByb3V0ZSxcbiAgICAgICAgcGF0aG5hbWUhLFxuICAgICAgICBxdWVyeSxcbiAgICAgICAgY2xlYW5lZEFzLFxuICAgICAgICByb3V0ZUluZm8sXG4gICAgICAgIGZvcmNlZFNjcm9sbCB8fFxuICAgICAgICAgIChpc1ZhbGlkU2hhbGxvd1JvdXRlIHx8ICFvcHRpb25zLnNjcm9sbCA/IG51bGwgOiB7IHg6IDAsIHk6IDAgfSlcbiAgICAgICkuY2F0Y2goKGUpID0+IHtcbiAgICAgICAgaWYgKGUuY2FuY2VsbGVkKSBlcnJvciA9IGVycm9yIHx8IGVcbiAgICAgICAgZWxzZSB0aHJvdyBlXG4gICAgICB9KVxuXG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgUm91dGVyLmV2ZW50cy5lbWl0KCdyb3V0ZUNoYW5nZUVycm9yJywgZXJyb3IsIGNsZWFuZWRBcywgcm91dGVQcm9wcylcbiAgICAgICAgdGhyb3cgZXJyb3JcbiAgICAgIH1cblxuICAgICAgaWYgKHByb2Nlc3MuZW52Ll9fTkVYVF9JMThOX1NVUFBPUlQpIHtcbiAgICAgICAgaWYgKHRoaXMubG9jYWxlKSB7XG4gICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmxhbmcgPSB0aGlzLmxvY2FsZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBSb3V0ZXIuZXZlbnRzLmVtaXQoJ3JvdXRlQ2hhbmdlQ29tcGxldGUnLCBhcywgcm91dGVQcm9wcylcblxuICAgICAgcmV0dXJuIHRydWVcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGlmIChlcnIuY2FuY2VsbGVkKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgICAgdGhyb3cgZXJyXG4gICAgfVxuICB9XG5cbiAgY2hhbmdlU3RhdGUoXG4gICAgbWV0aG9kOiBIaXN0b3J5TWV0aG9kLFxuICAgIHVybDogc3RyaW5nLFxuICAgIGFzOiBzdHJpbmcsXG4gICAgb3B0aW9uczogVHJhbnNpdGlvbk9wdGlvbnMgPSB7fVxuICApOiB2b2lkIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgaWYgKHR5cGVvZiB3aW5kb3cuaGlzdG9yeSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihgV2FybmluZzogd2luZG93Lmhpc3RvcnkgaXMgbm90IGF2YWlsYWJsZS5gKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiB3aW5kb3cuaGlzdG9yeVttZXRob2RdID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICBjb25zb2xlLmVycm9yKGBXYXJuaW5nOiB3aW5kb3cuaGlzdG9yeS4ke21ldGhvZH0gaXMgbm90IGF2YWlsYWJsZWApXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChtZXRob2QgIT09ICdwdXNoU3RhdGUnIHx8IGdldFVSTCgpICE9PSBhcykge1xuICAgICAgdGhpcy5fc2hhbGxvdyA9IG9wdGlvbnMuc2hhbGxvd1xuICAgICAgd2luZG93Lmhpc3RvcnlbbWV0aG9kXShcbiAgICAgICAge1xuICAgICAgICAgIHVybCxcbiAgICAgICAgICBhcyxcbiAgICAgICAgICBvcHRpb25zLFxuICAgICAgICAgIF9fTjogdHJ1ZSxcbiAgICAgICAgICBpZHg6IHRoaXMuX2lkeCA9IG1ldGhvZCAhPT0gJ3B1c2hTdGF0ZScgPyB0aGlzLl9pZHggOiB0aGlzLl9pZHggKyAxLFxuICAgICAgICB9IGFzIEhpc3RvcnlTdGF0ZSxcbiAgICAgICAgLy8gTW9zdCBicm93c2VycyBjdXJyZW50bHkgaWdub3JlcyB0aGlzIHBhcmFtZXRlciwgYWx0aG91Z2ggdGhleSBtYXkgdXNlIGl0IGluIHRoZSBmdXR1cmUuXG4gICAgICAgIC8vIFBhc3NpbmcgdGhlIGVtcHR5IHN0cmluZyBoZXJlIHNob3VsZCBiZSBzYWZlIGFnYWluc3QgZnV0dXJlIGNoYW5nZXMgdG8gdGhlIG1ldGhvZC5cbiAgICAgICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0hpc3RvcnkvcmVwbGFjZVN0YXRlXG4gICAgICAgICcnLFxuICAgICAgICBhc1xuICAgICAgKVxuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGhhbmRsZVJvdXRlSW5mb0Vycm9yKFxuICAgIGVycjogRXJyb3IgJiB7IGNvZGU6IGFueTsgY2FuY2VsbGVkOiBib29sZWFuIH0sXG4gICAgcGF0aG5hbWU6IHN0cmluZyxcbiAgICBxdWVyeTogUGFyc2VkVXJsUXVlcnksXG4gICAgYXM6IHN0cmluZyxcbiAgICByb3V0ZVByb3BzOiBSb3V0ZVByb3BlcnRpZXMsXG4gICAgbG9hZEVycm9yRmFpbD86IGJvb2xlYW5cbiAgKTogUHJvbWlzZTxDb21wbGV0ZVByaXZhdGVSb3V0ZUluZm8+IHtcbiAgICBpZiAoZXJyLmNhbmNlbGxlZCkge1xuICAgICAgLy8gYnViYmxlIHVwIGNhbmNlbGxhdGlvbiBlcnJvcnNcbiAgICAgIHRocm93IGVyclxuICAgIH1cblxuICAgIGlmIChpc0Fzc2V0RXJyb3IoZXJyKSB8fCBsb2FkRXJyb3JGYWlsKSB7XG4gICAgICBSb3V0ZXIuZXZlbnRzLmVtaXQoJ3JvdXRlQ2hhbmdlRXJyb3InLCBlcnIsIGFzLCByb3V0ZVByb3BzKVxuXG4gICAgICAvLyBJZiB3ZSBjYW4ndCBsb2FkIHRoZSBwYWdlIGl0IGNvdWxkIGJlIG9uZSBvZiBmb2xsb3dpbmcgcmVhc29uc1xuICAgICAgLy8gIDEuIFBhZ2UgZG9lc24ndCBleGlzdHNcbiAgICAgIC8vICAyLiBQYWdlIGRvZXMgZXhpc3QgaW4gYSBkaWZmZXJlbnQgem9uZVxuICAgICAgLy8gIDMuIEludGVybmFsIGVycm9yIHdoaWxlIGxvYWRpbmcgdGhlIHBhZ2VcblxuICAgICAgLy8gU28sIGRvaW5nIGEgaGFyZCByZWxvYWQgaXMgdGhlIHByb3BlciB3YXkgdG8gZGVhbCB3aXRoIHRoaXMuXG4gICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGFzXG5cbiAgICAgIC8vIENoYW5naW5nIHRoZSBVUkwgZG9lc24ndCBibG9jayBleGVjdXRpbmcgdGhlIGN1cnJlbnQgY29kZSBwYXRoLlxuICAgICAgLy8gU28gbGV0J3MgdGhyb3cgYSBjYW5jZWxsYXRpb24gZXJyb3Igc3RvcCB0aGUgcm91dGluZyBsb2dpYy5cbiAgICAgIHRocm93IGJ1aWxkQ2FuY2VsbGF0aW9uRXJyb3IoKVxuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBsZXQgQ29tcG9uZW50OiBDb21wb25lbnRUeXBlXG4gICAgICBsZXQgc3R5bGVTaGVldHM6IFN0eWxlU2hlZXRUdXBsZVtdXG4gICAgICBsZXQgcHJvcHM6IFJlY29yZDxzdHJpbmcsIGFueT4gfCB1bmRlZmluZWRcblxuICAgICAgaWYgKFxuICAgICAgICB0eXBlb2YgQ29tcG9uZW50ISA9PT0gJ3VuZGVmaW5lZCcgfHxcbiAgICAgICAgdHlwZW9mIHN0eWxlU2hlZXRzISA9PT0gJ3VuZGVmaW5lZCdcbiAgICAgICkge1xuICAgICAgICA7KHsgcGFnZTogQ29tcG9uZW50LCBzdHlsZVNoZWV0cyB9ID0gYXdhaXQgdGhpcy5mZXRjaENvbXBvbmVudChcbiAgICAgICAgICAnL19lcnJvcidcbiAgICAgICAgKSlcbiAgICAgIH1cblxuICAgICAgY29uc3Qgcm91dGVJbmZvOiBDb21wbGV0ZVByaXZhdGVSb3V0ZUluZm8gPSB7XG4gICAgICAgIHByb3BzLFxuICAgICAgICBDb21wb25lbnQsXG4gICAgICAgIHN0eWxlU2hlZXRzLFxuICAgICAgICBlcnIsXG4gICAgICAgIGVycm9yOiBlcnIsXG4gICAgICB9XG5cbiAgICAgIGlmICghcm91dGVJbmZvLnByb3BzKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcm91dGVJbmZvLnByb3BzID0gYXdhaXQgdGhpcy5nZXRJbml0aWFsUHJvcHMoQ29tcG9uZW50LCB7XG4gICAgICAgICAgICBlcnIsXG4gICAgICAgICAgICBwYXRobmFtZSxcbiAgICAgICAgICAgIHF1ZXJ5LFxuICAgICAgICAgIH0gYXMgYW55KVxuICAgICAgICB9IGNhdGNoIChnaXBFcnIpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBpbiBlcnJvciBwYWdlIGBnZXRJbml0aWFsUHJvcHNgOiAnLCBnaXBFcnIpXG4gICAgICAgICAgcm91dGVJbmZvLnByb3BzID0ge31cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gcm91dGVJbmZvXG4gICAgfSBjYXRjaCAocm91dGVJbmZvRXJyKSB7XG4gICAgICByZXR1cm4gdGhpcy5oYW5kbGVSb3V0ZUluZm9FcnJvcihcbiAgICAgICAgcm91dGVJbmZvRXJyLFxuICAgICAgICBwYXRobmFtZSxcbiAgICAgICAgcXVlcnksXG4gICAgICAgIGFzLFxuICAgICAgICByb3V0ZVByb3BzLFxuICAgICAgICB0cnVlXG4gICAgICApXG4gICAgfVxuICB9XG5cbiAgYXN5bmMgZ2V0Um91dGVJbmZvKFxuICAgIHJvdXRlOiBzdHJpbmcsXG4gICAgcGF0aG5hbWU6IHN0cmluZyxcbiAgICBxdWVyeTogYW55LFxuICAgIGFzOiBzdHJpbmcsXG4gICAgcmVzb2x2ZWRBczogc3RyaW5nLFxuICAgIHJvdXRlUHJvcHM6IFJvdXRlUHJvcGVydGllc1xuICApOiBQcm9taXNlPFByaXZhdGVSb3V0ZUluZm8+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgZXhpc3RpbmdSb3V0ZUluZm86IFByaXZhdGVSb3V0ZUluZm8gfCB1bmRlZmluZWQgPSB0aGlzLmNvbXBvbmVudHNbXG4gICAgICAgIHJvdXRlXG4gICAgICBdXG4gICAgICBpZiAocm91dGVQcm9wcy5zaGFsbG93ICYmIGV4aXN0aW5nUm91dGVJbmZvICYmIHRoaXMucm91dGUgPT09IHJvdXRlKSB7XG4gICAgICAgIHJldHVybiBleGlzdGluZ1JvdXRlSW5mb1xuICAgICAgfVxuXG4gICAgICBjb25zdCBjYWNoZWRSb3V0ZUluZm86IENvbXBsZXRlUHJpdmF0ZVJvdXRlSW5mbyB8IHVuZGVmaW5lZCA9XG4gICAgICAgIGV4aXN0aW5nUm91dGVJbmZvICYmICdpbml0aWFsJyBpbiBleGlzdGluZ1JvdXRlSW5mb1xuICAgICAgICAgID8gdW5kZWZpbmVkXG4gICAgICAgICAgOiBleGlzdGluZ1JvdXRlSW5mb1xuICAgICAgY29uc3Qgcm91dGVJbmZvOiBDb21wbGV0ZVByaXZhdGVSb3V0ZUluZm8gPSBjYWNoZWRSb3V0ZUluZm9cbiAgICAgICAgPyBjYWNoZWRSb3V0ZUluZm9cbiAgICAgICAgOiBhd2FpdCB0aGlzLmZldGNoQ29tcG9uZW50KHJvdXRlKS50aGVuKChyZXMpID0+ICh7XG4gICAgICAgICAgICBDb21wb25lbnQ6IHJlcy5wYWdlLFxuICAgICAgICAgICAgc3R5bGVTaGVldHM6IHJlcy5zdHlsZVNoZWV0cyxcbiAgICAgICAgICAgIF9fTl9TU0c6IHJlcy5tb2QuX19OX1NTRyxcbiAgICAgICAgICAgIF9fTl9TU1A6IHJlcy5tb2QuX19OX1NTUCxcbiAgICAgICAgICB9KSlcblxuICAgICAgY29uc3QgeyBDb21wb25lbnQsIF9fTl9TU0csIF9fTl9TU1AgfSA9IHJvdXRlSW5mb1xuXG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICBjb25zdCB7IGlzVmFsaWRFbGVtZW50VHlwZSB9ID0gcmVxdWlyZSgncmVhY3QtaXMnKVxuICAgICAgICBpZiAoIWlzVmFsaWRFbGVtZW50VHlwZShDb21wb25lbnQpKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgYFRoZSBkZWZhdWx0IGV4cG9ydCBpcyBub3QgYSBSZWFjdCBDb21wb25lbnQgaW4gcGFnZTogXCIke3BhdGhuYW1lfVwiYFxuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsZXQgZGF0YUhyZWY6IHN0cmluZyB8IHVuZGVmaW5lZFxuXG4gICAgICBpZiAoX19OX1NTRyB8fCBfX05fU1NQKSB7XG4gICAgICAgIGRhdGFIcmVmID0gdGhpcy5wYWdlTG9hZGVyLmdldERhdGFIcmVmKFxuICAgICAgICAgIGZvcm1hdFdpdGhWYWxpZGF0aW9uKHsgcGF0aG5hbWUsIHF1ZXJ5IH0pLFxuICAgICAgICAgIHJlc29sdmVkQXMsXG4gICAgICAgICAgX19OX1NTRyxcbiAgICAgICAgICB0aGlzLmxvY2FsZVxuICAgICAgICApXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHByb3BzID0gYXdhaXQgdGhpcy5fZ2V0RGF0YTxDb21wbGV0ZVByaXZhdGVSb3V0ZUluZm8+KCgpID0+XG4gICAgICAgIF9fTl9TU0dcbiAgICAgICAgICA/IHRoaXMuX2dldFN0YXRpY0RhdGEoZGF0YUhyZWYhKVxuICAgICAgICAgIDogX19OX1NTUFxuICAgICAgICAgID8gdGhpcy5fZ2V0U2VydmVyRGF0YShkYXRhSHJlZiEpXG4gICAgICAgICAgOiB0aGlzLmdldEluaXRpYWxQcm9wcyhcbiAgICAgICAgICAgICAgQ29tcG9uZW50LFxuICAgICAgICAgICAgICAvLyB3ZSBwcm92aWRlIEFwcFRyZWUgbGF0ZXIgc28gdGhpcyBuZWVkcyB0byBiZSBgYW55YFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcGF0aG5hbWUsXG4gICAgICAgICAgICAgICAgcXVlcnksXG4gICAgICAgICAgICAgICAgYXNQYXRoOiBhcyxcbiAgICAgICAgICAgICAgICBsb2NhbGU6IHRoaXMubG9jYWxlLFxuICAgICAgICAgICAgICAgIGxvY2FsZXM6IHRoaXMubG9jYWxlcyxcbiAgICAgICAgICAgICAgICBkZWZhdWx0TG9jYWxlOiB0aGlzLmRlZmF1bHRMb2NhbGUsXG4gICAgICAgICAgICAgIH0gYXMgYW55XG4gICAgICAgICAgICApXG4gICAgICApXG5cbiAgICAgIHJvdXRlSW5mby5wcm9wcyA9IHByb3BzXG4gICAgICB0aGlzLmNvbXBvbmVudHNbcm91dGVdID0gcm91dGVJbmZvXG4gICAgICByZXR1cm4gcm91dGVJbmZvXG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4gdGhpcy5oYW5kbGVSb3V0ZUluZm9FcnJvcihlcnIsIHBhdGhuYW1lLCBxdWVyeSwgYXMsIHJvdXRlUHJvcHMpXG4gICAgfVxuICB9XG5cbiAgc2V0KFxuICAgIHJvdXRlOiBzdHJpbmcsXG4gICAgcGF0aG5hbWU6IHN0cmluZyxcbiAgICBxdWVyeTogUGFyc2VkVXJsUXVlcnksXG4gICAgYXM6IHN0cmluZyxcbiAgICBkYXRhOiBQcml2YXRlUm91dGVJbmZvLFxuICAgIHJlc2V0U2Nyb2xsOiB7IHg6IG51bWJlcjsgeTogbnVtYmVyIH0gfCBudWxsXG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRoaXMuaXNGYWxsYmFjayA9IGZhbHNlXG5cbiAgICB0aGlzLnJvdXRlID0gcm91dGVcbiAgICB0aGlzLnBhdGhuYW1lID0gcGF0aG5hbWVcbiAgICB0aGlzLnF1ZXJ5ID0gcXVlcnlcbiAgICB0aGlzLmFzUGF0aCA9IGFzXG4gICAgcmV0dXJuIHRoaXMubm90aWZ5KGRhdGEsIHJlc2V0U2Nyb2xsKVxuICB9XG5cbiAgLyoqXG4gICAqIENhbGxiYWNrIHRvIGV4ZWN1dGUgYmVmb3JlIHJlcGxhY2luZyByb3V0ZXIgc3RhdGVcbiAgICogQHBhcmFtIGNiIGNhbGxiYWNrIHRvIGJlIGV4ZWN1dGVkXG4gICAqL1xuICBiZWZvcmVQb3BTdGF0ZShjYjogQmVmb3JlUG9wU3RhdGVDYWxsYmFjaykge1xuICAgIHRoaXMuX2JwcyA9IGNiXG4gIH1cblxuICBvbmx5QUhhc2hDaGFuZ2UoYXM6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGlmICghdGhpcy5hc1BhdGgpIHJldHVybiBmYWxzZVxuICAgIGNvbnN0IFtvbGRVcmxOb0hhc2gsIG9sZEhhc2hdID0gdGhpcy5hc1BhdGguc3BsaXQoJyMnKVxuICAgIGNvbnN0IFtuZXdVcmxOb0hhc2gsIG5ld0hhc2hdID0gYXMuc3BsaXQoJyMnKVxuXG4gICAgLy8gTWFrZXMgc3VyZSB3ZSBzY3JvbGwgdG8gdGhlIHByb3ZpZGVkIGhhc2ggaWYgdGhlIHVybC9oYXNoIGFyZSB0aGUgc2FtZVxuICAgIGlmIChuZXdIYXNoICYmIG9sZFVybE5vSGFzaCA9PT0gbmV3VXJsTm9IYXNoICYmIG9sZEhhc2ggPT09IG5ld0hhc2gpIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuXG4gICAgLy8gSWYgdGhlIHVybHMgYXJlIGNoYW5nZSwgdGhlcmUncyBtb3JlIHRoYW4gYSBoYXNoIGNoYW5nZVxuICAgIGlmIChvbGRVcmxOb0hhc2ggIT09IG5ld1VybE5vSGFzaCkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgLy8gSWYgdGhlIGhhc2ggaGFzIGNoYW5nZWQsIHRoZW4gaXQncyBhIGhhc2ggb25seSBjaGFuZ2UuXG4gICAgLy8gVGhpcyBjaGVjayBpcyBuZWNlc3NhcnkgdG8gaGFuZGxlIGJvdGggdGhlIGVudGVyIGFuZFxuICAgIC8vIGxlYXZlIGhhc2ggPT09ICcnIGNhc2VzLiBUaGUgaWRlbnRpdHkgY2FzZSBmYWxscyB0aHJvdWdoXG4gICAgLy8gYW5kIGlzIHRyZWF0ZWQgYXMgYSBuZXh0IHJlbG9hZC5cbiAgICByZXR1cm4gb2xkSGFzaCAhPT0gbmV3SGFzaFxuICB9XG5cbiAgc2Nyb2xsVG9IYXNoKGFzOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBbLCBoYXNoXSA9IGFzLnNwbGl0KCcjJylcbiAgICAvLyBTY3JvbGwgdG8gdG9wIGlmIHRoZSBoYXNoIGlzIGp1c3QgYCNgIHdpdGggbm8gdmFsdWUgb3IgYCN0b3BgXG4gICAgLy8gVG8gbWlycm9yIGJyb3dzZXJzXG4gICAgaWYgKGhhc2ggPT09ICcnIHx8IGhhc2ggPT09ICd0b3AnKSB7XG4gICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgMClcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIC8vIEZpcnN0IHdlIGNoZWNrIGlmIHRoZSBlbGVtZW50IGJ5IGlkIGlzIGZvdW5kXG4gICAgY29uc3QgaWRFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGhhc2gpXG4gICAgaWYgKGlkRWwpIHtcbiAgICAgIGlkRWwuc2Nyb2xsSW50b1ZpZXcoKVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIC8vIElmIHRoZXJlJ3Mgbm8gZWxlbWVudCB3aXRoIHRoZSBpZCwgd2UgY2hlY2sgdGhlIGBuYW1lYCBwcm9wZXJ0eVxuICAgIC8vIFRvIG1pcnJvciBicm93c2Vyc1xuICAgIGNvbnN0IG5hbWVFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlOYW1lKGhhc2gpWzBdXG4gICAgaWYgKG5hbWVFbCkge1xuICAgICAgbmFtZUVsLnNjcm9sbEludG9WaWV3KClcbiAgICB9XG4gIH1cblxuICB1cmxJc05ldyhhc1BhdGg6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmFzUGF0aCAhPT0gYXNQYXRoXG4gIH1cblxuICAvKipcbiAgICogUHJlZmV0Y2ggcGFnZSBjb2RlLCB5b3UgbWF5IHdhaXQgZm9yIHRoZSBkYXRhIGR1cmluZyBwYWdlIHJlbmRlcmluZy5cbiAgICogVGhpcyBmZWF0dXJlIG9ubHkgd29ya3MgaW4gcHJvZHVjdGlvbiFcbiAgICogQHBhcmFtIHVybCB0aGUgaHJlZiBvZiBwcmVmZXRjaGVkIHBhZ2VcbiAgICogQHBhcmFtIGFzUGF0aCB0aGUgYXMgcGF0aCBvZiB0aGUgcHJlZmV0Y2hlZCBwYWdlXG4gICAqL1xuICBhc3luYyBwcmVmZXRjaChcbiAgICB1cmw6IHN0cmluZyxcbiAgICBhc1BhdGg6IHN0cmluZyA9IHVybCxcbiAgICBvcHRpb25zOiBQcmVmZXRjaE9wdGlvbnMgPSB7fVxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBsZXQgcGFyc2VkID0gcGFyc2VSZWxhdGl2ZVVybCh1cmwpXG5cbiAgICBsZXQgeyBwYXRobmFtZSB9ID0gcGFyc2VkXG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuX19ORVhUX0kxOE5fU1VQUE9SVCkge1xuICAgICAgaWYgKG9wdGlvbnMubG9jYWxlID09PSBmYWxzZSkge1xuICAgICAgICBwYXRobmFtZSA9IG5vcm1hbGl6ZUxvY2FsZVBhdGghKHBhdGhuYW1lLCB0aGlzLmxvY2FsZXMpLnBhdGhuYW1lXG4gICAgICAgIHBhcnNlZC5wYXRobmFtZSA9IHBhdGhuYW1lXG4gICAgICAgIHVybCA9IGZvcm1hdFdpdGhWYWxpZGF0aW9uKHBhcnNlZClcblxuICAgICAgICBsZXQgcGFyc2VkQXMgPSBwYXJzZVJlbGF0aXZlVXJsKGFzUGF0aClcbiAgICAgICAgY29uc3QgbG9jYWxlUGF0aFJlc3VsdCA9IG5vcm1hbGl6ZUxvY2FsZVBhdGghKFxuICAgICAgICAgIHBhcnNlZEFzLnBhdGhuYW1lLFxuICAgICAgICAgIHRoaXMubG9jYWxlc1xuICAgICAgICApXG4gICAgICAgIHBhcnNlZEFzLnBhdGhuYW1lID0gbG9jYWxlUGF0aFJlc3VsdC5wYXRobmFtZVxuICAgICAgICBvcHRpb25zLmxvY2FsZSA9IGxvY2FsZVBhdGhSZXN1bHQuZGV0ZWN0ZWRMb2NhbGUgfHwgdGhpcy5kZWZhdWx0TG9jYWxlXG4gICAgICAgIGFzUGF0aCA9IGZvcm1hdFdpdGhWYWxpZGF0aW9uKHBhcnNlZEFzKVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHBhZ2VzID0gYXdhaXQgdGhpcy5wYWdlTG9hZGVyLmdldFBhZ2VMaXN0KClcbiAgICBsZXQgcmVzb2x2ZWRBcyA9IGFzUGF0aFxuXG4gICAgaWYgKHByb2Nlc3MuZW52Ll9fTkVYVF9IQVNfUkVXUklURVMgJiYgYXNQYXRoLnN0YXJ0c1dpdGgoJy8nKSkge1xuICAgICAgbGV0IHJld3JpdGVzOiBhbnlcbiAgICAgIDsoeyBfX3Jld3JpdGVzOiByZXdyaXRlcyB9ID0gYXdhaXQgZ2V0Q2xpZW50QnVpbGRNYW5pZmVzdCgpKVxuXG4gICAgICBjb25zdCByZXdyaXRlc1Jlc3VsdCA9IHJlc29sdmVSZXdyaXRlcyhcbiAgICAgICAgYWRkQmFzZVBhdGgoYWRkTG9jYWxlKGFzUGF0aCwgdGhpcy5sb2NhbGUpKSxcbiAgICAgICAgcGFnZXMsXG4gICAgICAgIHJld3JpdGVzLFxuICAgICAgICBwYXJzZWQucXVlcnksXG4gICAgICAgIChwOiBzdHJpbmcpID0+IHJlc29sdmVEeW5hbWljUm91dGUocCwgcGFnZXMpLFxuICAgICAgICB0aGlzLmxvY2FsZXNcbiAgICAgIClcbiAgICAgIHJlc29sdmVkQXMgPSBkZWxMb2NhbGUoZGVsQmFzZVBhdGgocmV3cml0ZXNSZXN1bHQuYXNQYXRoKSwgdGhpcy5sb2NhbGUpXG5cbiAgICAgIGlmIChyZXdyaXRlc1Jlc3VsdC5tYXRjaGVkUGFnZSAmJiByZXdyaXRlc1Jlc3VsdC5yZXNvbHZlZEhyZWYpIHtcbiAgICAgICAgLy8gaWYgdGhpcyBkaXJlY3RseSBtYXRjaGVzIGEgcGFnZSB3ZSBuZWVkIHRvIHVwZGF0ZSB0aGUgaHJlZiB0b1xuICAgICAgICAvLyBhbGxvdyB0aGUgY29ycmVjdCBwYWdlIGNodW5rIHRvIGJlIGxvYWRlZFxuICAgICAgICBwYXRobmFtZSA9IHJld3JpdGVzUmVzdWx0LnJlc29sdmVkSHJlZlxuICAgICAgICBwYXJzZWQucGF0aG5hbWUgPSBwYXRobmFtZVxuICAgICAgICB1cmwgPSBmb3JtYXRXaXRoVmFsaWRhdGlvbihwYXJzZWQpXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhcnNlZC5wYXRobmFtZSA9IHJlc29sdmVEeW5hbWljUm91dGUocGFyc2VkLnBhdGhuYW1lLCBwYWdlcylcblxuICAgICAgaWYgKHBhcnNlZC5wYXRobmFtZSAhPT0gcGF0aG5hbWUpIHtcbiAgICAgICAgcGF0aG5hbWUgPSBwYXJzZWQucGF0aG5hbWVcbiAgICAgICAgdXJsID0gZm9ybWF0V2l0aFZhbGlkYXRpb24ocGFyc2VkKVxuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCByb3V0ZSA9IHJlbW92ZVBhdGhUcmFpbGluZ1NsYXNoKHBhdGhuYW1lKVxuXG4gICAgLy8gUHJlZmV0Y2ggaXMgbm90IHN1cHBvcnRlZCBpbiBkZXZlbG9wbWVudCBtb2RlIGJlY2F1c2UgaXQgd291bGQgdHJpZ2dlciBvbi1kZW1hbmQtZW50cmllc1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICB0aGlzLnBhZ2VMb2FkZXIuX2lzU3NnKHJvdXRlKS50aGVuKChpc1NzZzogYm9vbGVhbikgPT4ge1xuICAgICAgICByZXR1cm4gaXNTc2dcbiAgICAgICAgICA/IHRoaXMuX2dldFN0YXRpY0RhdGEoXG4gICAgICAgICAgICAgIHRoaXMucGFnZUxvYWRlci5nZXREYXRhSHJlZihcbiAgICAgICAgICAgICAgICB1cmwsXG4gICAgICAgICAgICAgICAgcmVzb2x2ZWRBcyxcbiAgICAgICAgICAgICAgICB0cnVlLFxuICAgICAgICAgICAgICAgIHR5cGVvZiBvcHRpb25zLmxvY2FsZSAhPT0gJ3VuZGVmaW5lZCdcbiAgICAgICAgICAgICAgICAgID8gb3B0aW9ucy5sb2NhbGVcbiAgICAgICAgICAgICAgICAgIDogdGhpcy5sb2NhbGVcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKVxuICAgICAgICAgIDogZmFsc2VcbiAgICAgIH0pLFxuICAgICAgdGhpcy5wYWdlTG9hZGVyW29wdGlvbnMucHJpb3JpdHkgPyAnbG9hZFBhZ2UnIDogJ3ByZWZldGNoJ10ocm91dGUpLFxuICAgIF0pXG4gIH1cblxuICBhc3luYyBmZXRjaENvbXBvbmVudChyb3V0ZTogc3RyaW5nKTogUHJvbWlzZTxHb29kUGFnZUNhY2hlPiB7XG4gICAgbGV0IGNhbmNlbGxlZCA9IGZhbHNlXG4gICAgY29uc3QgY2FuY2VsID0gKHRoaXMuY2xjID0gKCkgPT4ge1xuICAgICAgY2FuY2VsbGVkID0gdHJ1ZVxuICAgIH0pXG5cbiAgICBjb25zdCBjb21wb25lbnRSZXN1bHQgPSBhd2FpdCB0aGlzLnBhZ2VMb2FkZXIubG9hZFBhZ2Uocm91dGUpXG5cbiAgICBpZiAoY2FuY2VsbGVkKSB7XG4gICAgICBjb25zdCBlcnJvcjogYW55ID0gbmV3IEVycm9yKFxuICAgICAgICBgQWJvcnQgZmV0Y2hpbmcgY29tcG9uZW50IGZvciByb3V0ZTogXCIke3JvdXRlfVwiYFxuICAgICAgKVxuICAgICAgZXJyb3IuY2FuY2VsbGVkID0gdHJ1ZVxuICAgICAgdGhyb3cgZXJyb3JcbiAgICB9XG5cbiAgICBpZiAoY2FuY2VsID09PSB0aGlzLmNsYykge1xuICAgICAgdGhpcy5jbGMgPSBudWxsXG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbXBvbmVudFJlc3VsdFxuICB9XG5cbiAgX2dldERhdGE8VD4oZm46ICgpID0+IFByb21pc2U8VD4pOiBQcm9taXNlPFQ+IHtcbiAgICBsZXQgY2FuY2VsbGVkID0gZmFsc2VcbiAgICBjb25zdCBjYW5jZWwgPSAoKSA9PiB7XG4gICAgICBjYW5jZWxsZWQgPSB0cnVlXG4gICAgfVxuICAgIHRoaXMuY2xjID0gY2FuY2VsXG4gICAgcmV0dXJuIGZuKCkudGhlbigoZGF0YSkgPT4ge1xuICAgICAgaWYgKGNhbmNlbCA9PT0gdGhpcy5jbGMpIHtcbiAgICAgICAgdGhpcy5jbGMgPSBudWxsXG4gICAgICB9XG5cbiAgICAgIGlmIChjYW5jZWxsZWQpIHtcbiAgICAgICAgY29uc3QgZXJyOiBhbnkgPSBuZXcgRXJyb3IoJ0xvYWRpbmcgaW5pdGlhbCBwcm9wcyBjYW5jZWxsZWQnKVxuICAgICAgICBlcnIuY2FuY2VsbGVkID0gdHJ1ZVxuICAgICAgICB0aHJvdyBlcnJcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGRhdGFcbiAgICB9KVxuICB9XG5cbiAgX2dldFN0YXRpY0RhdGEoZGF0YUhyZWY6IHN0cmluZyk6IFByb21pc2U8b2JqZWN0PiB7XG4gICAgY29uc3QgeyBocmVmOiBjYWNoZUtleSB9ID0gbmV3IFVSTChkYXRhSHJlZiwgd2luZG93LmxvY2F0aW9uLmhyZWYpXG4gICAgaWYgKFxuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJyAmJlxuICAgICAgIXRoaXMuaXNQcmV2aWV3ICYmXG4gICAgICB0aGlzLnNkY1tjYWNoZUtleV1cbiAgICApIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5zZGNbY2FjaGVLZXldKVxuICAgIH1cbiAgICByZXR1cm4gZmV0Y2hOZXh0RGF0YShkYXRhSHJlZiwgdGhpcy5pc1NzcikudGhlbigoZGF0YSkgPT4ge1xuICAgICAgdGhpcy5zZGNbY2FjaGVLZXldID0gZGF0YVxuICAgICAgcmV0dXJuIGRhdGFcbiAgICB9KVxuICB9XG5cbiAgX2dldFNlcnZlckRhdGEoZGF0YUhyZWY6IHN0cmluZyk6IFByb21pc2U8b2JqZWN0PiB7XG4gICAgY29uc3QgeyBocmVmOiByZXNvdXJjZUtleSB9ID0gbmV3IFVSTChkYXRhSHJlZiwgd2luZG93LmxvY2F0aW9uLmhyZWYpXG4gICAgaWYgKHRoaXMuc2RyW3Jlc291cmNlS2V5XSkge1xuICAgICAgcmV0dXJuIHRoaXMuc2RyW3Jlc291cmNlS2V5XVxuICAgIH1cbiAgICByZXR1cm4gKHRoaXMuc2RyW3Jlc291cmNlS2V5XSA9IGZldGNoTmV4dERhdGEoZGF0YUhyZWYsIHRoaXMuaXNTc3IpXG4gICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICBkZWxldGUgdGhpcy5zZHJbcmVzb3VyY2VLZXldXG4gICAgICAgIHJldHVybiBkYXRhXG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgZGVsZXRlIHRoaXMuc2RyW3Jlc291cmNlS2V5XVxuICAgICAgICB0aHJvdyBlcnJcbiAgICAgIH0pKVxuICB9XG5cbiAgZ2V0SW5pdGlhbFByb3BzKFxuICAgIENvbXBvbmVudDogQ29tcG9uZW50VHlwZSxcbiAgICBjdHg6IE5leHRQYWdlQ29udGV4dFxuICApOiBQcm9taXNlPGFueT4ge1xuICAgIGNvbnN0IHsgQ29tcG9uZW50OiBBcHAgfSA9IHRoaXMuY29tcG9uZW50c1snL19hcHAnXVxuICAgIGNvbnN0IEFwcFRyZWUgPSB0aGlzLl93cmFwQXBwKEFwcCBhcyBBcHBDb21wb25lbnQpXG4gICAgY3R4LkFwcFRyZWUgPSBBcHBUcmVlXG4gICAgcmV0dXJuIGxvYWRHZXRJbml0aWFsUHJvcHM8QXBwQ29udGV4dFR5cGU8Um91dGVyPj4oQXBwLCB7XG4gICAgICBBcHBUcmVlLFxuICAgICAgQ29tcG9uZW50LFxuICAgICAgcm91dGVyOiB0aGlzLFxuICAgICAgY3R4LFxuICAgIH0pXG4gIH1cblxuICBhYm9ydENvbXBvbmVudExvYWQoYXM6IHN0cmluZywgcm91dGVQcm9wczogUm91dGVQcm9wZXJ0aWVzKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY2xjKSB7XG4gICAgICBSb3V0ZXIuZXZlbnRzLmVtaXQoXG4gICAgICAgICdyb3V0ZUNoYW5nZUVycm9yJyxcbiAgICAgICAgYnVpbGRDYW5jZWxsYXRpb25FcnJvcigpLFxuICAgICAgICBhcyxcbiAgICAgICAgcm91dGVQcm9wc1xuICAgICAgKVxuICAgICAgdGhpcy5jbGMoKVxuICAgICAgdGhpcy5jbGMgPSBudWxsXG4gICAgfVxuICB9XG5cbiAgbm90aWZ5KFxuICAgIGRhdGE6IFByaXZhdGVSb3V0ZUluZm8sXG4gICAgcmVzZXRTY3JvbGw6IHsgeDogbnVtYmVyOyB5OiBudW1iZXIgfSB8IG51bGxcbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuc3ViKFxuICAgICAgZGF0YSxcbiAgICAgIHRoaXMuY29tcG9uZW50c1snL19hcHAnXS5Db21wb25lbnQgYXMgQXBwQ29tcG9uZW50LFxuICAgICAgcmVzZXRTY3JvbGxcbiAgICApXG4gIH1cbn1cbiIsIi8vIEZvcm1hdCBmdW5jdGlvbiBtb2RpZmllZCBmcm9tIG5vZGVqc1xuLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCB7IFVybE9iamVjdCB9IGZyb20gJ3VybCdcbmltcG9ydCB7IFBhcnNlZFVybFF1ZXJ5IH0gZnJvbSAncXVlcnlzdHJpbmcnXG5pbXBvcnQgKiBhcyBxdWVyeXN0cmluZyBmcm9tICcuL3F1ZXJ5c3RyaW5nJ1xuXG5jb25zdCBzbGFzaGVkUHJvdG9jb2xzID0gL2h0dHBzP3xmdHB8Z29waGVyfGZpbGUvXG5cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXRVcmwodXJsT2JqOiBVcmxPYmplY3QpIHtcbiAgbGV0IHsgYXV0aCwgaG9zdG5hbWUgfSA9IHVybE9ialxuICBsZXQgcHJvdG9jb2wgPSB1cmxPYmoucHJvdG9jb2wgfHwgJydcbiAgbGV0IHBhdGhuYW1lID0gdXJsT2JqLnBhdGhuYW1lIHx8ICcnXG4gIGxldCBoYXNoID0gdXJsT2JqLmhhc2ggfHwgJydcbiAgbGV0IHF1ZXJ5ID0gdXJsT2JqLnF1ZXJ5IHx8ICcnXG4gIGxldCBob3N0OiBzdHJpbmcgfCBmYWxzZSA9IGZhbHNlXG5cbiAgYXV0aCA9IGF1dGggPyBlbmNvZGVVUklDb21wb25lbnQoYXV0aCkucmVwbGFjZSgvJTNBL2ksICc6JykgKyAnQCcgOiAnJ1xuXG4gIGlmICh1cmxPYmouaG9zdCkge1xuICAgIGhvc3QgPSBhdXRoICsgdXJsT2JqLmhvc3RcbiAgfSBlbHNlIGlmIChob3N0bmFtZSkge1xuICAgIGhvc3QgPSBhdXRoICsgKH5ob3N0bmFtZS5pbmRleE9mKCc6JykgPyBgWyR7aG9zdG5hbWV9XWAgOiBob3N0bmFtZSlcbiAgICBpZiAodXJsT2JqLnBvcnQpIHtcbiAgICAgIGhvc3QgKz0gJzonICsgdXJsT2JqLnBvcnRcbiAgICB9XG4gIH1cblxuICBpZiAocXVlcnkgJiYgdHlwZW9mIHF1ZXJ5ID09PSAnb2JqZWN0Jykge1xuICAgIHF1ZXJ5ID0gU3RyaW5nKHF1ZXJ5c3RyaW5nLnVybFF1ZXJ5VG9TZWFyY2hQYXJhbXMocXVlcnkgYXMgUGFyc2VkVXJsUXVlcnkpKVxuICB9XG5cbiAgbGV0IHNlYXJjaCA9IHVybE9iai5zZWFyY2ggfHwgKHF1ZXJ5ICYmIGA/JHtxdWVyeX1gKSB8fCAnJ1xuXG4gIGlmIChwcm90b2NvbCAmJiBwcm90b2NvbC5zdWJzdHIoLTEpICE9PSAnOicpIHByb3RvY29sICs9ICc6J1xuXG4gIGlmIChcbiAgICB1cmxPYmouc2xhc2hlcyB8fFxuICAgICgoIXByb3RvY29sIHx8IHNsYXNoZWRQcm90b2NvbHMudGVzdChwcm90b2NvbCkpICYmIGhvc3QgIT09IGZhbHNlKVxuICApIHtcbiAgICBob3N0ID0gJy8vJyArIChob3N0IHx8ICcnKVxuICAgIGlmIChwYXRobmFtZSAmJiBwYXRobmFtZVswXSAhPT0gJy8nKSBwYXRobmFtZSA9ICcvJyArIHBhdGhuYW1lXG4gIH0gZWxzZSBpZiAoIWhvc3QpIHtcbiAgICBob3N0ID0gJydcbiAgfVxuXG4gIGlmIChoYXNoICYmIGhhc2hbMF0gIT09ICcjJykgaGFzaCA9ICcjJyArIGhhc2hcbiAgaWYgKHNlYXJjaCAmJiBzZWFyY2hbMF0gIT09ICc/Jykgc2VhcmNoID0gJz8nICsgc2VhcmNoXG5cbiAgcGF0aG5hbWUgPSBwYXRobmFtZS5yZXBsYWNlKC9bPyNdL2csIGVuY29kZVVSSUNvbXBvbmVudClcbiAgc2VhcmNoID0gc2VhcmNoLnJlcGxhY2UoJyMnLCAnJTIzJylcblxuICByZXR1cm4gYCR7cHJvdG9jb2x9JHtob3N0fSR7cGF0aG5hbWV9JHtzZWFyY2h9JHtoYXNofWBcbn1cbiIsIi8vIElkZW50aWZ5IC9bcGFyYW1dLyBpbiByb3V0ZSBzdHJpbmdcbmNvbnN0IFRFU1RfUk9VVEUgPSAvXFwvXFxbW14vXSs/XFxdKD89XFwvfCQpL1xuXG5leHBvcnQgZnVuY3Rpb24gaXNEeW5hbWljUm91dGUocm91dGU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICByZXR1cm4gVEVTVF9ST1VURS50ZXN0KHJvdXRlKVxufVxuIiwiaW1wb3J0IHsgZ2V0TG9jYXRpb25PcmlnaW4gfSBmcm9tICcuLi8uLi91dGlscydcbmltcG9ydCB7IHNlYXJjaFBhcmFtc1RvVXJsUXVlcnkgfSBmcm9tICcuL3F1ZXJ5c3RyaW5nJ1xuXG4vKipcbiAqIFBhcnNlcyBwYXRoLXJlbGF0aXZlIHVybHMgKGUuZy4gYC9oZWxsby93b3JsZD9mb289YmFyYCkuIElmIHVybCBpc24ndCBwYXRoLXJlbGF0aXZlXG4gKiAoZS5nLiBgLi9oZWxsb2ApIHRoZW4gYXQgbGVhc3QgYmFzZSBtdXN0IGJlLlxuICogQWJzb2x1dGUgdXJscyBhcmUgcmVqZWN0ZWQgd2l0aCBvbmUgZXhjZXB0aW9uLCBpbiB0aGUgYnJvd3NlciwgYWJzb2x1dGUgdXJscyB0aGF0IGFyZSBvblxuICogdGhlIGN1cnJlbnQgb3JpZ2luIHdpbGwgYmUgcGFyc2VkIGFzIHJlbGF0aXZlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVJlbGF0aXZlVXJsKHVybDogc3RyaW5nLCBiYXNlPzogc3RyaW5nKSB7XG4gIGNvbnN0IGdsb2JhbEJhc2UgPSBuZXcgVVJMKFxuICAgIHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnID8gJ2h0dHA6Ly9uJyA6IGdldExvY2F0aW9uT3JpZ2luKClcbiAgKVxuICBjb25zdCByZXNvbHZlZEJhc2UgPSBiYXNlID8gbmV3IFVSTChiYXNlLCBnbG9iYWxCYXNlKSA6IGdsb2JhbEJhc2VcbiAgY29uc3QgeyBwYXRobmFtZSwgc2VhcmNoUGFyYW1zLCBzZWFyY2gsIGhhc2gsIGhyZWYsIG9yaWdpbiB9ID0gbmV3IFVSTChcbiAgICB1cmwsXG4gICAgcmVzb2x2ZWRCYXNlXG4gIClcbiAgaWYgKG9yaWdpbiAhPT0gZ2xvYmFsQmFzZS5vcmlnaW4pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYGludmFyaWFudDogaW52YWxpZCByZWxhdGl2ZSBVUkwsIHJvdXRlciByZWNlaXZlZCAke3VybH1gKVxuICB9XG4gIHJldHVybiB7XG4gICAgcGF0aG5hbWUsXG4gICAgcXVlcnk6IHNlYXJjaFBhcmFtc1RvVXJsUXVlcnkoc2VhcmNoUGFyYW1zKSxcbiAgICBzZWFyY2gsXG4gICAgaGFzaCxcbiAgICBocmVmOiBocmVmLnNsaWNlKGdsb2JhbEJhc2Uub3JpZ2luLmxlbmd0aCksXG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIHBhdGhUb1JlZ2V4cCBmcm9tICduZXh0L2Rpc3QvY29tcGlsZWQvcGF0aC10by1yZWdleHAnXG5cbmV4cG9ydCB7IHBhdGhUb1JlZ2V4cCB9XG5cbmV4cG9ydCBjb25zdCBtYXRjaGVyT3B0aW9uczogcGF0aFRvUmVnZXhwLlRva2Vuc1RvUmVnZXhwT3B0aW9ucyAmXG4gIHBhdGhUb1JlZ2V4cC5QYXJzZU9wdGlvbnMgPSB7XG4gIHNlbnNpdGl2ZTogZmFsc2UsXG4gIGRlbGltaXRlcjogJy8nLFxufVxuXG5leHBvcnQgY29uc3QgY3VzdG9tUm91dGVNYXRjaGVyT3B0aW9uczogcGF0aFRvUmVnZXhwLlRva2Vuc1RvUmVnZXhwT3B0aW9ucyAmXG4gIHBhdGhUb1JlZ2V4cC5QYXJzZU9wdGlvbnMgPSB7XG4gIC4uLm1hdGNoZXJPcHRpb25zLFxuICBzdHJpY3Q6IHRydWUsXG59XG5cbmV4cG9ydCBkZWZhdWx0IChjdXN0b21Sb3V0ZSA9IGZhbHNlKSA9PiB7XG4gIHJldHVybiAocGF0aDogc3RyaW5nKSA9PiB7XG4gICAgY29uc3Qga2V5czogcGF0aFRvUmVnZXhwLktleVtdID0gW11cbiAgICBjb25zdCBtYXRjaGVyUmVnZXggPSBwYXRoVG9SZWdleHAucGF0aFRvUmVnZXhwKFxuICAgICAgcGF0aCxcbiAgICAgIGtleXMsXG4gICAgICBjdXN0b21Sb3V0ZSA/IGN1c3RvbVJvdXRlTWF0Y2hlck9wdGlvbnMgOiBtYXRjaGVyT3B0aW9uc1xuICAgIClcbiAgICBjb25zdCBtYXRjaGVyID0gcGF0aFRvUmVnZXhwLnJlZ2V4cFRvRnVuY3Rpb24obWF0Y2hlclJlZ2V4LCBrZXlzKVxuXG4gICAgcmV0dXJuIChwYXRobmFtZTogc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZCwgcGFyYW1zPzogYW55KSA9PiB7XG4gICAgICBjb25zdCByZXMgPSBwYXRobmFtZSA9PSBudWxsID8gZmFsc2UgOiBtYXRjaGVyKHBhdGhuYW1lKVxuICAgICAgaWYgKCFyZXMpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG5cbiAgICAgIGlmIChjdXN0b21Sb3V0ZSkge1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBrZXlzKSB7XG4gICAgICAgICAgLy8gdW5uYW1lZCBwYXJhbXMgc2hvdWxkIGJlIHJlbW92ZWQgYXMgdGhleVxuICAgICAgICAgIC8vIGFyZSBub3QgYWxsb3dlZCB0byBiZSB1c2VkIGluIHRoZSBkZXN0aW5hdGlvblxuICAgICAgICAgIGlmICh0eXBlb2Yga2V5Lm5hbWUgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICBkZWxldGUgKHJlcy5wYXJhbXMgYXMgYW55KVtrZXkubmFtZV1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHsgLi4ucGFyYW1zLCAuLi5yZXMucGFyYW1zIH1cbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IEluY29taW5nTWVzc2FnZSB9IGZyb20gJ2h0dHAnXG5pbXBvcnQgeyBQYXJzZWRVcmxRdWVyeSB9IGZyb20gJ3F1ZXJ5c3RyaW5nJ1xuaW1wb3J0IHsgc2VhcmNoUGFyYW1zVG9VcmxRdWVyeSB9IGZyb20gJy4vcXVlcnlzdHJpbmcnXG5pbXBvcnQgeyBwYXJzZVJlbGF0aXZlVXJsIH0gZnJvbSAnLi9wYXJzZS1yZWxhdGl2ZS11cmwnXG5pbXBvcnQgKiBhcyBwYXRoVG9SZWdleHAgZnJvbSAnbmV4dC9kaXN0L2NvbXBpbGVkL3BhdGgtdG8tcmVnZXhwJ1xuaW1wb3J0IHsgUm91dGVIYXMgfSBmcm9tICcuLi8uLi8uLi8uLi9saWIvbG9hZC1jdXN0b20tcm91dGVzJ1xuXG50eXBlIFBhcmFtcyA9IHsgW3BhcmFtOiBzdHJpbmddOiBhbnkgfVxuXG4vLyBlbnN1cmUgb25seSBhLXpBLVogYXJlIHVzZWQgZm9yIHBhcmFtIG5hbWVzIGZvciBwcm9wZXIgaW50ZXJwb2xhdGluZ1xuLy8gd2l0aCBwYXRoLXRvLXJlZ2V4cFxuZXhwb3J0IGNvbnN0IGdldFNhZmVQYXJhbU5hbWUgPSAocGFyYW1OYW1lOiBzdHJpbmcpID0+IHtcbiAgbGV0IG5ld1BhcmFtTmFtZSA9ICcnXG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXJhbU5hbWUubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBjaGFyQ29kZSA9IHBhcmFtTmFtZS5jaGFyQ29kZUF0KGkpXG5cbiAgICBpZiAoXG4gICAgICAoY2hhckNvZGUgPiA2NCAmJiBjaGFyQ29kZSA8IDkxKSB8fCAvLyBBLVpcbiAgICAgIChjaGFyQ29kZSA+IDk2ICYmIGNoYXJDb2RlIDwgMTIzKSAvLyBhLXpcbiAgICApIHtcbiAgICAgIG5ld1BhcmFtTmFtZSArPSBwYXJhbU5hbWVbaV1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIG5ld1BhcmFtTmFtZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbWF0Y2hIYXMoXG4gIHJlcTogSW5jb21pbmdNZXNzYWdlLFxuICBoYXM6IFJvdXRlSGFzW10sXG4gIHF1ZXJ5OiBQYXJhbXNcbik6IGZhbHNlIHwgUGFyYW1zIHtcbiAgY29uc3QgcGFyYW1zOiBQYXJhbXMgPSB7fVxuICBjb25zdCBhbGxNYXRjaCA9IGhhcy5ldmVyeSgoaGFzSXRlbSkgPT4ge1xuICAgIGxldCB2YWx1ZTogdW5kZWZpbmVkIHwgc3RyaW5nXG4gICAgbGV0IGtleSA9IGhhc0l0ZW0ua2V5XG5cbiAgICBzd2l0Y2ggKGhhc0l0ZW0udHlwZSkge1xuICAgICAgY2FzZSAnaGVhZGVyJzoge1xuICAgICAgICBrZXkgPSBrZXkhLnRvTG93ZXJDYXNlKClcbiAgICAgICAgdmFsdWUgPSByZXEuaGVhZGVyc1trZXldIGFzIHN0cmluZ1xuICAgICAgICBicmVha1xuICAgICAgfVxuICAgICAgY2FzZSAnY29va2llJzoge1xuICAgICAgICB2YWx1ZSA9IChyZXEgYXMgYW55KS5jb29raWVzW2hhc0l0ZW0ua2V5XVxuICAgICAgICBicmVha1xuICAgICAgfVxuICAgICAgY2FzZSAncXVlcnknOiB7XG4gICAgICAgIHZhbHVlID0gcXVlcnlba2V5IV1cbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICAgIGNhc2UgJ2hvc3QnOiB7XG4gICAgICAgIGNvbnN0IHsgaG9zdCB9ID0gcmVxPy5oZWFkZXJzIHx8IHt9XG4gICAgICAgIC8vIHJlbW92ZSBwb3J0IGZyb20gaG9zdCBpZiBwcmVzZW50XG4gICAgICAgIGNvbnN0IGhvc3RuYW1lID0gaG9zdD8uc3BsaXQoJzonKVswXS50b0xvd2VyQ2FzZSgpXG4gICAgICAgIHZhbHVlID0gaG9zdG5hbWVcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIWhhc0l0ZW0udmFsdWUgJiYgdmFsdWUpIHtcbiAgICAgIHBhcmFtc1tnZXRTYWZlUGFyYW1OYW1lKGtleSEpXSA9IHZhbHVlXG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH0gZWxzZSBpZiAodmFsdWUpIHtcbiAgICAgIGNvbnN0IG1hdGNoZXIgPSBuZXcgUmVnRXhwKGBeJHtoYXNJdGVtLnZhbHVlfSRgKVxuICAgICAgY29uc3QgbWF0Y2hlcyA9IHZhbHVlLm1hdGNoKG1hdGNoZXIpXG5cbiAgICAgIGlmIChtYXRjaGVzKSB7XG4gICAgICAgIGlmIChtYXRjaGVzLmdyb3Vwcykge1xuICAgICAgICAgIE9iamVjdC5rZXlzKG1hdGNoZXMuZ3JvdXBzKS5mb3JFYWNoKChncm91cEtleSkgPT4ge1xuICAgICAgICAgICAgcGFyYW1zW2dyb3VwS2V5XSA9IG1hdGNoZXMuZ3JvdXBzIVtncm91cEtleV1cbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2UgaWYgKGhhc0l0ZW0udHlwZSA9PT0gJ2hvc3QnICYmIG1hdGNoZXNbMF0pIHtcbiAgICAgICAgICBwYXJhbXMuaG9zdCA9IG1hdGNoZXNbMF1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2VcbiAgfSlcblxuICBpZiAoYWxsTWF0Y2gpIHtcbiAgICByZXR1cm4gcGFyYW1zXG4gIH1cbiAgcmV0dXJuIGZhbHNlXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb21waWxlTm9uUGF0aCh2YWx1ZTogc3RyaW5nLCBwYXJhbXM6IFBhcmFtcyk6IHN0cmluZyB7XG4gIGlmICghdmFsdWUuaW5jbHVkZXMoJzonKSkge1xuICAgIHJldHVybiB2YWx1ZVxuICB9XG5cbiAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMocGFyYW1zKSkge1xuICAgIGlmICh2YWx1ZS5pbmNsdWRlcyhgOiR7a2V5fWApKSB7XG4gICAgICB2YWx1ZSA9IHZhbHVlXG4gICAgICAgIC5yZXBsYWNlKFxuICAgICAgICAgIG5ldyBSZWdFeHAoYDoke2tleX1cXFxcKmAsICdnJyksXG4gICAgICAgICAgYDoke2tleX0tLUVTQ0FQRURfUEFSQU1fQVNURVJJU0tTYFxuICAgICAgICApXG4gICAgICAgIC5yZXBsYWNlKFxuICAgICAgICAgIG5ldyBSZWdFeHAoYDoke2tleX1cXFxcP2AsICdnJyksXG4gICAgICAgICAgYDoke2tleX0tLUVTQ0FQRURfUEFSQU1fUVVFU1RJT05gXG4gICAgICAgIClcbiAgICAgICAgLnJlcGxhY2UobmV3IFJlZ0V4cChgOiR7a2V5fVxcXFwrYCwgJ2cnKSwgYDoke2tleX0tLUVTQ0FQRURfUEFSQU1fUExVU2ApXG4gICAgICAgIC5yZXBsYWNlKFxuICAgICAgICAgIG5ldyBSZWdFeHAoYDoke2tleX0oPyFcXFxcdylgLCAnZycpLFxuICAgICAgICAgIGAtLUVTQ0FQRURfUEFSQU1fQ09MT04ke2tleX1gXG4gICAgICAgIClcbiAgICB9XG4gIH1cbiAgdmFsdWUgPSB2YWx1ZVxuICAgIC5yZXBsYWNlKC8oOnxcXCp8XFw/fFxcK3xcXCh8XFwpfFxce3xcXH0pL2csICdcXFxcJDEnKVxuICAgIC5yZXBsYWNlKC8tLUVTQ0FQRURfUEFSQU1fUExVUy9nLCAnKycpXG4gICAgLnJlcGxhY2UoLy0tRVNDQVBFRF9QQVJBTV9DT0xPTi9nLCAnOicpXG4gICAgLnJlcGxhY2UoLy0tRVNDQVBFRF9QQVJBTV9RVUVTVElPTi9nLCAnPycpXG4gICAgLnJlcGxhY2UoLy0tRVNDQVBFRF9QQVJBTV9BU1RFUklTS1MvZywgJyonKVxuXG4gIC8vIHRoZSB2YWx1ZSBuZWVkcyB0byBzdGFydCB3aXRoIGEgZm9yd2FyZC1zbGFzaCB0byBiZSBjb21waWxlZFxuICAvLyBjb3JyZWN0bHlcbiAgcmV0dXJuIHBhdGhUb1JlZ2V4cFxuICAgIC5jb21waWxlKGAvJHt2YWx1ZX1gLCB7IHZhbGlkYXRlOiBmYWxzZSB9KShwYXJhbXMpXG4gICAgLnN1YnN0cigxKVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwcmVwYXJlRGVzdGluYXRpb24oXG4gIGRlc3RpbmF0aW9uOiBzdHJpbmcsXG4gIHBhcmFtczogUGFyYW1zLFxuICBxdWVyeTogUGFyc2VkVXJsUXVlcnksXG4gIGFwcGVuZFBhcmFtc1RvUXVlcnk6IGJvb2xlYW5cbikge1xuICBsZXQgcGFyc2VkRGVzdGluYXRpb246IHtcbiAgICBxdWVyeT86IFBhcnNlZFVybFF1ZXJ5XG4gICAgcHJvdG9jb2w/OiBzdHJpbmdcbiAgICBob3N0bmFtZT86IHN0cmluZ1xuICAgIHBvcnQ/OiBzdHJpbmdcbiAgfSAmIFJldHVyblR5cGU8dHlwZW9mIHBhcnNlUmVsYXRpdmVVcmw+ID0ge30gYXMgYW55XG5cbiAgLy8gY2xvbmUgcXVlcnkgc28gd2UgZG9uJ3QgbW9kaWZ5IHRoZSBvcmlnaW5hbFxuICBxdWVyeSA9IE9iamVjdC5hc3NpZ24oe30sIHF1ZXJ5KVxuICBjb25zdCBoYWRMb2NhbGUgPSBxdWVyeS5fX25leHRMb2NhbGVcbiAgZGVsZXRlIHF1ZXJ5Ll9fbmV4dExvY2FsZVxuICBkZWxldGUgcXVlcnkuX19uZXh0RGVmYXVsdExvY2FsZVxuXG4gIGlmIChkZXN0aW5hdGlvbi5zdGFydHNXaXRoKCcvJykpIHtcbiAgICBwYXJzZWREZXN0aW5hdGlvbiA9IHBhcnNlUmVsYXRpdmVVcmwoZGVzdGluYXRpb24pXG4gIH0gZWxzZSB7XG4gICAgY29uc3Qge1xuICAgICAgcGF0aG5hbWUsXG4gICAgICBzZWFyY2hQYXJhbXMsXG4gICAgICBoYXNoLFxuICAgICAgaG9zdG5hbWUsXG4gICAgICBwb3J0LFxuICAgICAgcHJvdG9jb2wsXG4gICAgICBzZWFyY2gsXG4gICAgICBocmVmLFxuICAgIH0gPSBuZXcgVVJMKGRlc3RpbmF0aW9uKVxuXG4gICAgcGFyc2VkRGVzdGluYXRpb24gPSB7XG4gICAgICBwYXRobmFtZSxcbiAgICAgIHF1ZXJ5OiBzZWFyY2hQYXJhbXNUb1VybFF1ZXJ5KHNlYXJjaFBhcmFtcyksXG4gICAgICBoYXNoLFxuICAgICAgcHJvdG9jb2wsXG4gICAgICBob3N0bmFtZSxcbiAgICAgIHBvcnQsXG4gICAgICBzZWFyY2gsXG4gICAgICBocmVmLFxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGRlc3RRdWVyeSA9IHBhcnNlZERlc3RpbmF0aW9uLnF1ZXJ5XG4gIGNvbnN0IGRlc3RQYXRoID0gYCR7cGFyc2VkRGVzdGluYXRpb24ucGF0aG5hbWUhfSR7XG4gICAgcGFyc2VkRGVzdGluYXRpb24uaGFzaCB8fCAnJ1xuICB9YFxuICBjb25zdCBkZXN0UGF0aFBhcmFtS2V5czogcGF0aFRvUmVnZXhwLktleVtdID0gW11cbiAgcGF0aFRvUmVnZXhwLnBhdGhUb1JlZ2V4cChkZXN0UGF0aCwgZGVzdFBhdGhQYXJhbUtleXMpXG5cbiAgY29uc3QgZGVzdFBhdGhQYXJhbXMgPSBkZXN0UGF0aFBhcmFtS2V5cy5tYXAoKGtleSkgPT4ga2V5Lm5hbWUpXG5cbiAgbGV0IGRlc3RpbmF0aW9uQ29tcGlsZXIgPSBwYXRoVG9SZWdleHAuY29tcGlsZShcbiAgICBkZXN0UGF0aCxcbiAgICAvLyB3ZSBkb24ndCB2YWxpZGF0ZSB3aGlsZSBjb21waWxpbmcgdGhlIGRlc3RpbmF0aW9uIHNpbmNlIHdlIHNob3VsZFxuICAgIC8vIGhhdmUgYWxyZWFkeSB2YWxpZGF0ZWQgYmVmb3JlIHdlIGdvdCB0byB0aGlzIHBvaW50IGFuZCB2YWxpZGF0aW5nXG4gICAgLy8gYnJlYWtzIGNvbXBpbGluZyBkZXN0aW5hdGlvbnMgd2l0aCBuYW1lZCBwYXR0ZXJuIHBhcmFtcyBmcm9tIHRoZSBzb3VyY2VcbiAgICAvLyBlLmcuIC9zb21ldGhpbmc6aGVsbG8oLiopIC0+IC9hbm90aGVyLzpoZWxsbyBpcyBicm9rZW4gd2l0aCB2YWxpZGF0aW9uXG4gICAgLy8gc2luY2UgY29tcGlsZSB2YWxpZGF0aW9uIGlzIG1lYW50IGZvciByZXZlcnNpbmcgYW5kIG5vdCBmb3IgaW5zZXJ0aW5nXG4gICAgLy8gcGFyYW1zIGZyb20gYSBzZXBhcmF0ZSBwYXRoLXJlZ2V4IGludG8gYW5vdGhlclxuICAgIHsgdmFsaWRhdGU6IGZhbHNlIH1cbiAgKVxuICBsZXQgbmV3VXJsXG5cbiAgLy8gdXBkYXRlIGFueSBwYXJhbXMgaW4gcXVlcnkgdmFsdWVzXG4gIGZvciAoY29uc3QgW2tleSwgc3RyT3JBcnJheV0gb2YgT2JqZWN0LmVudHJpZXMoZGVzdFF1ZXJ5KSkge1xuICAgIGxldCB2YWx1ZSA9IEFycmF5LmlzQXJyYXkoc3RyT3JBcnJheSkgPyBzdHJPckFycmF5WzBdIDogc3RyT3JBcnJheVxuICAgIGlmICh2YWx1ZSkge1xuICAgICAgLy8gdGhlIHZhbHVlIG5lZWRzIHRvIHN0YXJ0IHdpdGggYSBmb3J3YXJkLXNsYXNoIHRvIGJlIGNvbXBpbGVkXG4gICAgICAvLyBjb3JyZWN0bHlcbiAgICAgIHZhbHVlID0gY29tcGlsZU5vblBhdGgodmFsdWUsIHBhcmFtcylcbiAgICB9XG4gICAgZGVzdFF1ZXJ5W2tleV0gPSB2YWx1ZVxuICB9XG5cbiAgLy8gYWRkIHBhdGggcGFyYW1zIHRvIHF1ZXJ5IGlmIGl0J3Mgbm90IGEgcmVkaXJlY3QgYW5kIG5vdFxuICAvLyBhbHJlYWR5IGRlZmluZWQgaW4gZGVzdGluYXRpb24gcXVlcnkgb3IgcGF0aFxuICBsZXQgcGFyYW1LZXlzID0gT2JqZWN0LmtleXMocGFyYW1zKVxuXG4gIC8vIHJlbW92ZSBpbnRlcm5hbCBwYXJhbSBmb3IgaTE4blxuICBpZiAoaGFkTG9jYWxlKSB7XG4gICAgcGFyYW1LZXlzID0gcGFyYW1LZXlzLmZpbHRlcigobmFtZSkgPT4gbmFtZSAhPT0gJ25leHRJbnRlcm5hbExvY2FsZScpXG4gIH1cblxuICBpZiAoXG4gICAgYXBwZW5kUGFyYW1zVG9RdWVyeSAmJlxuICAgICFwYXJhbUtleXMuc29tZSgoa2V5KSA9PiBkZXN0UGF0aFBhcmFtcy5pbmNsdWRlcyhrZXkpKVxuICApIHtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBwYXJhbUtleXMpIHtcbiAgICAgIGlmICghKGtleSBpbiBkZXN0UXVlcnkpKSB7XG4gICAgICAgIGRlc3RRdWVyeVtrZXldID0gcGFyYW1zW2tleV1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB0cnkge1xuICAgIG5ld1VybCA9IGRlc3RpbmF0aW9uQ29tcGlsZXIocGFyYW1zKVxuXG4gICAgY29uc3QgW3BhdGhuYW1lLCBoYXNoXSA9IG5ld1VybC5zcGxpdCgnIycpXG4gICAgcGFyc2VkRGVzdGluYXRpb24ucGF0aG5hbWUgPSBwYXRobmFtZVxuICAgIHBhcnNlZERlc3RpbmF0aW9uLmhhc2ggPSBgJHtoYXNoID8gJyMnIDogJyd9JHtoYXNoIHx8ICcnfWBcbiAgICBkZWxldGUgKHBhcnNlZERlc3RpbmF0aW9uIGFzIGFueSkuc2VhcmNoXG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGlmIChlcnIubWVzc2FnZS5tYXRjaCgvRXhwZWN0ZWQgLio/IHRvIG5vdCByZXBlYXQsIGJ1dCBnb3QgYW4gYXJyYXkvKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgVG8gdXNlIGEgbXVsdGktbWF0Y2ggaW4gdGhlIGRlc3RpbmF0aW9uIHlvdSBtdXN0IGFkZCBcXGAqXFxgIGF0IHRoZSBlbmQgb2YgdGhlIHBhcmFtIG5hbWUgdG8gc2lnbmlmeSBpdCBzaG91bGQgcmVwZWF0LiBodHRwczovL25leHRqcy5vcmcvZG9jcy9tZXNzYWdlcy9pbnZhbGlkLW11bHRpLW1hdGNoYFxuICAgICAgKVxuICAgIH1cbiAgICB0aHJvdyBlcnJcbiAgfVxuXG4gIC8vIFF1ZXJ5IG1lcmdlIG9yZGVyIGxvd2VzdCBwcmlvcml0eSB0byBoaWdoZXN0XG4gIC8vIDEuIGluaXRpYWwgVVJMIHF1ZXJ5IHZhbHVlc1xuICAvLyAyLiBwYXRoIHNlZ21lbnQgdmFsdWVzXG4gIC8vIDMuIGRlc3RpbmF0aW9uIHNwZWNpZmllZCBxdWVyeSB2YWx1ZXNcbiAgcGFyc2VkRGVzdGluYXRpb24ucXVlcnkgPSB7XG4gICAgLi4ucXVlcnksXG4gICAgLi4ucGFyc2VkRGVzdGluYXRpb24ucXVlcnksXG4gIH1cblxuICByZXR1cm4ge1xuICAgIG5ld1VybCxcbiAgICBwYXJzZWREZXN0aW5hdGlvbixcbiAgfVxufVxuIiwiaW1wb3J0IHsgUGFyc2VkVXJsUXVlcnkgfSBmcm9tICdxdWVyeXN0cmluZydcblxuZXhwb3J0IGZ1bmN0aW9uIHNlYXJjaFBhcmFtc1RvVXJsUXVlcnkoXG4gIHNlYXJjaFBhcmFtczogVVJMU2VhcmNoUGFyYW1zXG4pOiBQYXJzZWRVcmxRdWVyeSB7XG4gIGNvbnN0IHF1ZXJ5OiBQYXJzZWRVcmxRdWVyeSA9IHt9XG4gIHNlYXJjaFBhcmFtcy5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgaWYgKHR5cGVvZiBxdWVyeVtrZXldID09PSAndW5kZWZpbmVkJykge1xuICAgICAgcXVlcnlba2V5XSA9IHZhbHVlXG4gICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHF1ZXJ5W2tleV0pKSB7XG4gICAgICA7KHF1ZXJ5W2tleV0gYXMgc3RyaW5nW10pLnB1c2godmFsdWUpXG4gICAgfSBlbHNlIHtcbiAgICAgIHF1ZXJ5W2tleV0gPSBbcXVlcnlba2V5XSBhcyBzdHJpbmcsIHZhbHVlXVxuICAgIH1cbiAgfSlcbiAgcmV0dXJuIHF1ZXJ5XG59XG5cbmZ1bmN0aW9uIHN0cmluZ2lmeVVybFF1ZXJ5UGFyYW0ocGFyYW06IHN0cmluZyk6IHN0cmluZyB7XG4gIGlmIChcbiAgICB0eXBlb2YgcGFyYW0gPT09ICdzdHJpbmcnIHx8XG4gICAgKHR5cGVvZiBwYXJhbSA9PT0gJ251bWJlcicgJiYgIWlzTmFOKHBhcmFtKSkgfHxcbiAgICB0eXBlb2YgcGFyYW0gPT09ICdib29sZWFuJ1xuICApIHtcbiAgICByZXR1cm4gU3RyaW5nKHBhcmFtKVxuICB9IGVsc2Uge1xuICAgIHJldHVybiAnJ1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1cmxRdWVyeVRvU2VhcmNoUGFyYW1zKFxuICB1cmxRdWVyeTogUGFyc2VkVXJsUXVlcnlcbik6IFVSTFNlYXJjaFBhcmFtcyB7XG4gIGNvbnN0IHJlc3VsdCA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoKVxuICBPYmplY3QuZW50cmllcyh1cmxRdWVyeSkuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICB2YWx1ZS5mb3JFYWNoKChpdGVtKSA9PiByZXN1bHQuYXBwZW5kKGtleSwgc3RyaW5naWZ5VXJsUXVlcnlQYXJhbShpdGVtKSkpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdC5zZXQoa2V5LCBzdHJpbmdpZnlVcmxRdWVyeVBhcmFtKHZhbHVlKSlcbiAgICB9XG4gIH0pXG4gIHJldHVybiByZXN1bHRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFzc2lnbihcbiAgdGFyZ2V0OiBVUkxTZWFyY2hQYXJhbXMsXG4gIC4uLnNlYXJjaFBhcmFtc0xpc3Q6IFVSTFNlYXJjaFBhcmFtc1tdXG4pOiBVUkxTZWFyY2hQYXJhbXMge1xuICBzZWFyY2hQYXJhbXNMaXN0LmZvckVhY2goKHNlYXJjaFBhcmFtcykgPT4ge1xuICAgIEFycmF5LmZyb20oc2VhcmNoUGFyYW1zLmtleXMoKSkuZm9yRWFjaCgoa2V5KSA9PiB0YXJnZXQuZGVsZXRlKGtleSkpXG4gICAgc2VhcmNoUGFyYW1zLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHRhcmdldC5hcHBlbmQoa2V5LCB2YWx1ZSkpXG4gIH0pXG4gIHJldHVybiB0YXJnZXRcbn1cbiIsImltcG9ydCB7IFBhcnNlZFVybFF1ZXJ5IH0gZnJvbSAncXVlcnlzdHJpbmcnXG5pbXBvcnQgcGF0aE1hdGNoIGZyb20gJy4vcGF0aC1tYXRjaCdcbmltcG9ydCBwcmVwYXJlRGVzdGluYXRpb24sIHsgbWF0Y2hIYXMgfSBmcm9tICcuL3ByZXBhcmUtZGVzdGluYXRpb24nXG5pbXBvcnQgeyBSZXdyaXRlIH0gZnJvbSAnLi4vLi4vLi4vLi4vbGliL2xvYWQtY3VzdG9tLXJvdXRlcydcbmltcG9ydCB7IHJlbW92ZVBhdGhUcmFpbGluZ1NsYXNoIH0gZnJvbSAnLi4vLi4vLi4vLi4vY2xpZW50L25vcm1hbGl6ZS10cmFpbGluZy1zbGFzaCdcbmltcG9ydCB7IG5vcm1hbGl6ZUxvY2FsZVBhdGggfSBmcm9tICcuLi8uLi9pMThuL25vcm1hbGl6ZS1sb2NhbGUtcGF0aCdcbmltcG9ydCB7IHBhcnNlUmVsYXRpdmVVcmwgfSBmcm9tICcuL3BhcnNlLXJlbGF0aXZlLXVybCdcbmltcG9ydCB7IGRlbEJhc2VQYXRoIH0gZnJvbSAnLi4vcm91dGVyJ1xuXG5jb25zdCBjdXN0b21Sb3V0ZU1hdGNoZXIgPSBwYXRoTWF0Y2godHJ1ZSlcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVzb2x2ZVJld3JpdGVzKFxuICBhc1BhdGg6IHN0cmluZyxcbiAgcGFnZXM6IHN0cmluZ1tdLFxuICByZXdyaXRlczoge1xuICAgIGJlZm9yZUZpbGVzOiBSZXdyaXRlW11cbiAgICBhZnRlckZpbGVzOiBSZXdyaXRlW11cbiAgICBmYWxsYmFjazogUmV3cml0ZVtdXG4gIH0sXG4gIHF1ZXJ5OiBQYXJzZWRVcmxRdWVyeSxcbiAgcmVzb2x2ZUhyZWY6IChwYXRoOiBzdHJpbmcpID0+IHN0cmluZyxcbiAgbG9jYWxlcz86IHN0cmluZ1tdXG4pOiB7XG4gIG1hdGNoZWRQYWdlOiBib29sZWFuXG4gIHBhcnNlZEFzOiBSZXR1cm5UeXBlPHR5cGVvZiBwYXJzZVJlbGF0aXZlVXJsPlxuICBhc1BhdGg6IHN0cmluZ1xuICByZXNvbHZlZEhyZWY/OiBzdHJpbmdcbn0ge1xuICBsZXQgbWF0Y2hlZFBhZ2UgPSBmYWxzZVxuICBsZXQgcGFyc2VkQXMgPSBwYXJzZVJlbGF0aXZlVXJsKGFzUGF0aClcbiAgbGV0IGZzUGF0aG5hbWUgPSByZW1vdmVQYXRoVHJhaWxpbmdTbGFzaChcbiAgICBub3JtYWxpemVMb2NhbGVQYXRoKGRlbEJhc2VQYXRoKHBhcnNlZEFzLnBhdGhuYW1lKSwgbG9jYWxlcykucGF0aG5hbWVcbiAgKVxuICBsZXQgcmVzb2x2ZWRIcmVmXG5cbiAgY29uc3QgaGFuZGxlUmV3cml0ZSA9IChyZXdyaXRlOiBSZXdyaXRlKSA9PiB7XG4gICAgY29uc3QgbWF0Y2hlciA9IGN1c3RvbVJvdXRlTWF0Y2hlcihyZXdyaXRlLnNvdXJjZSlcbiAgICBsZXQgcGFyYW1zID0gbWF0Y2hlcihwYXJzZWRBcy5wYXRobmFtZSlcblxuICAgIGlmIChyZXdyaXRlLmhhcyAmJiBwYXJhbXMpIHtcbiAgICAgIGNvbnN0IGhhc1BhcmFtcyA9IG1hdGNoSGFzKFxuICAgICAgICB7XG4gICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgaG9zdDogZG9jdW1lbnQubG9jYXRpb24uaG9zdG5hbWUsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBjb29raWVzOiBkb2N1bWVudC5jb29raWVcbiAgICAgICAgICAgIC5zcGxpdCgnOyAnKVxuICAgICAgICAgICAgLnJlZHVjZTxSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+PigoYWNjLCBpdGVtKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IFtrZXksIC4uLnZhbHVlXSA9IGl0ZW0uc3BsaXQoJz0nKVxuICAgICAgICAgICAgICBhY2Nba2V5XSA9IHZhbHVlLmpvaW4oJz0nKVxuICAgICAgICAgICAgICByZXR1cm4gYWNjXG4gICAgICAgICAgICB9LCB7fSksXG4gICAgICAgIH0gYXMgYW55LFxuICAgICAgICByZXdyaXRlLmhhcyxcbiAgICAgICAgcGFyc2VkQXMucXVlcnlcbiAgICAgIClcblxuICAgICAgaWYgKGhhc1BhcmFtcykge1xuICAgICAgICBPYmplY3QuYXNzaWduKHBhcmFtcywgaGFzUGFyYW1zKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFyYW1zID0gZmFsc2VcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocGFyYW1zKSB7XG4gICAgICBpZiAoIXJld3JpdGUuZGVzdGluYXRpb24pIHtcbiAgICAgICAgLy8gdGhpcyBpcyBhIHByb3hpZWQgcmV3cml0ZSB3aGljaCBpc24ndCBoYW5kbGVkIG9uIHRoZSBjbGllbnRcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH1cbiAgICAgIGNvbnN0IGRlc3RSZXMgPSBwcmVwYXJlRGVzdGluYXRpb24oXG4gICAgICAgIHJld3JpdGUuZGVzdGluYXRpb24sXG4gICAgICAgIHBhcmFtcyxcbiAgICAgICAgcXVlcnksXG4gICAgICAgIHRydWVcbiAgICAgIClcbiAgICAgIHBhcnNlZEFzID0gZGVzdFJlcy5wYXJzZWREZXN0aW5hdGlvblxuICAgICAgYXNQYXRoID0gZGVzdFJlcy5uZXdVcmxcbiAgICAgIE9iamVjdC5hc3NpZ24ocXVlcnksIGRlc3RSZXMucGFyc2VkRGVzdGluYXRpb24ucXVlcnkpXG5cbiAgICAgIGZzUGF0aG5hbWUgPSByZW1vdmVQYXRoVHJhaWxpbmdTbGFzaChcbiAgICAgICAgbm9ybWFsaXplTG9jYWxlUGF0aChkZWxCYXNlUGF0aChhc1BhdGgpLCBsb2NhbGVzKS5wYXRobmFtZVxuICAgICAgKVxuXG4gICAgICBpZiAocGFnZXMuaW5jbHVkZXMoZnNQYXRobmFtZSkpIHtcbiAgICAgICAgLy8gY2hlY2sgaWYgd2Ugbm93IG1hdGNoIGEgcGFnZSBhcyB0aGlzIG1lYW5zIHdlIGFyZSBkb25lXG4gICAgICAgIC8vIHJlc29sdmluZyB0aGUgcmV3cml0ZXNcbiAgICAgICAgbWF0Y2hlZFBhZ2UgPSB0cnVlXG4gICAgICAgIHJlc29sdmVkSHJlZiA9IGZzUGF0aG5hbWVcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH1cblxuICAgICAgLy8gY2hlY2sgaWYgd2UgbWF0Y2ggYSBkeW5hbWljLXJvdXRlLCBpZiBzbyB3ZSBicmVhayB0aGUgcmV3cml0ZXMgY2hhaW5cbiAgICAgIHJlc29sdmVkSHJlZiA9IHJlc29sdmVIcmVmKGZzUGF0aG5hbWUpXG5cbiAgICAgIGlmIChyZXNvbHZlZEhyZWYgIT09IGFzUGF0aCAmJiBwYWdlcy5pbmNsdWRlcyhyZXNvbHZlZEhyZWYpKSB7XG4gICAgICAgIG1hdGNoZWRQYWdlID0gdHJ1ZVxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBsZXQgZmluaXNoZWQgPSBmYWxzZVxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcmV3cml0ZXMuYmVmb3JlRmlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAvLyB3ZSBkb24ndCBlbmQgYWZ0ZXIgbWF0Y2ggaW4gYmVmb3JlRmlsZXMgdG8gYWxsb3dcbiAgICAvLyBjb250aW51aW5nIHRocm91Z2ggYWxsIGJlZm9yZUZpbGVzIHJld3JpdGVzXG4gICAgaGFuZGxlUmV3cml0ZShyZXdyaXRlcy5iZWZvcmVGaWxlc1tpXSlcbiAgfVxuICBtYXRjaGVkUGFnZSA9IHBhZ2VzLmluY2x1ZGVzKGZzUGF0aG5hbWUpXG5cbiAgaWYgKCFtYXRjaGVkUGFnZSkge1xuICAgIGlmICghZmluaXNoZWQpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmV3cml0ZXMuYWZ0ZXJGaWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoaGFuZGxlUmV3cml0ZShyZXdyaXRlcy5hZnRlckZpbGVzW2ldKSkge1xuICAgICAgICAgIGZpbmlzaGVkID0gdHJ1ZVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBjaGVjayBkeW5hbWljIHJvdXRlIGJlZm9yZSBwcm9jZXNzaW5nIGZhbGxiYWNrIHJld3JpdGVzXG4gICAgaWYgKCFmaW5pc2hlZCkge1xuICAgICAgcmVzb2x2ZWRIcmVmID0gcmVzb2x2ZUhyZWYoZnNQYXRobmFtZSlcbiAgICAgIG1hdGNoZWRQYWdlID0gcGFnZXMuaW5jbHVkZXMocmVzb2x2ZWRIcmVmKVxuICAgICAgZmluaXNoZWQgPSBtYXRjaGVkUGFnZVxuICAgIH1cblxuICAgIGlmICghZmluaXNoZWQpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmV3cml0ZXMuZmFsbGJhY2subGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGhhbmRsZVJld3JpdGUocmV3cml0ZXMuZmFsbGJhY2tbaV0pKSB7XG4gICAgICAgICAgZmluaXNoZWQgPSB0cnVlXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgYXNQYXRoLFxuICAgIHBhcnNlZEFzLFxuICAgIG1hdGNoZWRQYWdlLFxuICAgIHJlc29sdmVkSHJlZixcbiAgfVxufVxuIiwiaW1wb3J0IHsgZ2V0Um91dGVSZWdleCB9IGZyb20gJy4vcm91dGUtcmVnZXgnXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRSb3V0ZU1hdGNoZXIocm91dGVSZWdleDogUmV0dXJuVHlwZTx0eXBlb2YgZ2V0Um91dGVSZWdleD4pIHtcbiAgY29uc3QgeyByZSwgZ3JvdXBzIH0gPSByb3V0ZVJlZ2V4XG4gIHJldHVybiAocGF0aG5hbWU6IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQpID0+IHtcbiAgICBjb25zdCByb3V0ZU1hdGNoID0gcmUuZXhlYyhwYXRobmFtZSEpXG4gICAgaWYgKCFyb3V0ZU1hdGNoKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICBjb25zdCBkZWNvZGUgPSAocGFyYW06IHN0cmluZykgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChwYXJhbSlcbiAgICAgIH0gY2F0Y2ggKF8pIHtcbiAgICAgICAgY29uc3QgZXJyOiBFcnJvciAmIHsgY29kZT86IHN0cmluZyB9ID0gbmV3IEVycm9yKFxuICAgICAgICAgICdmYWlsZWQgdG8gZGVjb2RlIHBhcmFtJ1xuICAgICAgICApXG4gICAgICAgIGVyci5jb2RlID0gJ0RFQ09ERV9GQUlMRUQnXG4gICAgICAgIHRocm93IGVyclxuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBwYXJhbXM6IHsgW3BhcmFtTmFtZTogc3RyaW5nXTogc3RyaW5nIHwgc3RyaW5nW10gfSA9IHt9XG5cbiAgICBPYmplY3Qua2V5cyhncm91cHMpLmZvckVhY2goKHNsdWdOYW1lOiBzdHJpbmcpID0+IHtcbiAgICAgIGNvbnN0IGcgPSBncm91cHNbc2x1Z05hbWVdXG4gICAgICBjb25zdCBtID0gcm91dGVNYXRjaFtnLnBvc11cbiAgICAgIGlmIChtICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcGFyYW1zW3NsdWdOYW1lXSA9IH5tLmluZGV4T2YoJy8nKVxuICAgICAgICAgID8gbS5zcGxpdCgnLycpLm1hcCgoZW50cnkpID0+IGRlY29kZShlbnRyeSkpXG4gICAgICAgICAgOiBnLnJlcGVhdFxuICAgICAgICAgID8gW2RlY29kZShtKV1cbiAgICAgICAgICA6IGRlY29kZShtKVxuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIHBhcmFtc1xuICB9XG59XG4iLCJleHBvcnQgaW50ZXJmYWNlIEdyb3VwIHtcbiAgcG9zOiBudW1iZXJcbiAgcmVwZWF0OiBib29sZWFuXG4gIG9wdGlvbmFsOiBib29sZWFuXG59XG5cbi8vIHRoaXMgaXNuJ3QgaW1wb3J0aW5nIHRoZSBlc2NhcGUtc3RyaW5nLXJlZ2V4IG1vZHVsZVxuLy8gdG8gcmVkdWNlIGJ5dGVzXG5mdW5jdGlvbiBlc2NhcGVSZWdleChzdHI6IHN0cmluZykge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoL1t8XFxcXHt9KClbXFxdXiQrKj8uLV0vZywgJ1xcXFwkJicpXG59XG5cbmZ1bmN0aW9uIHBhcnNlUGFyYW1ldGVyKHBhcmFtOiBzdHJpbmcpIHtcbiAgY29uc3Qgb3B0aW9uYWwgPSBwYXJhbS5zdGFydHNXaXRoKCdbJykgJiYgcGFyYW0uZW5kc1dpdGgoJ10nKVxuICBpZiAob3B0aW9uYWwpIHtcbiAgICBwYXJhbSA9IHBhcmFtLnNsaWNlKDEsIC0xKVxuICB9XG4gIGNvbnN0IHJlcGVhdCA9IHBhcmFtLnN0YXJ0c1dpdGgoJy4uLicpXG4gIGlmIChyZXBlYXQpIHtcbiAgICBwYXJhbSA9IHBhcmFtLnNsaWNlKDMpXG4gIH1cbiAgcmV0dXJuIHsga2V5OiBwYXJhbSwgcmVwZWF0LCBvcHRpb25hbCB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRSb3V0ZVJlZ2V4KFxuICBub3JtYWxpemVkUm91dGU6IHN0cmluZ1xuKToge1xuICByZTogUmVnRXhwXG4gIG5hbWVkUmVnZXg/OiBzdHJpbmdcbiAgcm91dGVLZXlzPzogeyBbbmFtZWQ6IHN0cmluZ106IHN0cmluZyB9XG4gIGdyb3VwczogeyBbZ3JvdXBOYW1lOiBzdHJpbmddOiBHcm91cCB9XG59IHtcbiAgY29uc3Qgc2VnbWVudHMgPSAobm9ybWFsaXplZFJvdXRlLnJlcGxhY2UoL1xcLyQvLCAnJykgfHwgJy8nKVxuICAgIC5zbGljZSgxKVxuICAgIC5zcGxpdCgnLycpXG5cbiAgY29uc3QgZ3JvdXBzOiB7IFtncm91cE5hbWU6IHN0cmluZ106IEdyb3VwIH0gPSB7fVxuICBsZXQgZ3JvdXBJbmRleCA9IDFcbiAgY29uc3QgcGFyYW1ldGVyaXplZFJvdXRlID0gc2VnbWVudHNcbiAgICAubWFwKChzZWdtZW50KSA9PiB7XG4gICAgICBpZiAoc2VnbWVudC5zdGFydHNXaXRoKCdbJykgJiYgc2VnbWVudC5lbmRzV2l0aCgnXScpKSB7XG4gICAgICAgIGNvbnN0IHsga2V5LCBvcHRpb25hbCwgcmVwZWF0IH0gPSBwYXJzZVBhcmFtZXRlcihzZWdtZW50LnNsaWNlKDEsIC0xKSlcbiAgICAgICAgZ3JvdXBzW2tleV0gPSB7IHBvczogZ3JvdXBJbmRleCsrLCByZXBlYXQsIG9wdGlvbmFsIH1cbiAgICAgICAgcmV0dXJuIHJlcGVhdCA/IChvcHRpb25hbCA/ICcoPzovKC4rPykpPycgOiAnLyguKz8pJykgOiAnLyhbXi9dKz8pJ1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGAvJHtlc2NhcGVSZWdleChzZWdtZW50KX1gXG4gICAgICB9XG4gICAgfSlcbiAgICAuam9pbignJylcblxuICAvLyBkZWFkIGNvZGUgZWxpbWluYXRlIGZvciBicm93c2VyIHNpbmNlIGl0J3Mgb25seSBuZWVkZWRcbiAgLy8gd2hpbGUgZ2VuZXJhdGluZyByb3V0ZXMtbWFuaWZlc3RcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgbGV0IHJvdXRlS2V5Q2hhckNvZGUgPSA5N1xuICAgIGxldCByb3V0ZUtleUNoYXJMZW5ndGggPSAxXG5cbiAgICAvLyBidWlsZHMgYSBtaW5pbWFsIHJvdXRlS2V5IHVzaW5nIG9ubHkgYS16IGFuZCBtaW5pbWFsIG51bWJlciBvZiBjaGFyYWN0ZXJzXG4gICAgY29uc3QgZ2V0U2FmZVJvdXRlS2V5ID0gKCkgPT4ge1xuICAgICAgbGV0IHJvdXRlS2V5ID0gJydcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByb3V0ZUtleUNoYXJMZW5ndGg7IGkrKykge1xuICAgICAgICByb3V0ZUtleSArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKHJvdXRlS2V5Q2hhckNvZGUpXG4gICAgICAgIHJvdXRlS2V5Q2hhckNvZGUrK1xuXG4gICAgICAgIGlmIChyb3V0ZUtleUNoYXJDb2RlID4gMTIyKSB7XG4gICAgICAgICAgcm91dGVLZXlDaGFyTGVuZ3RoKytcbiAgICAgICAgICByb3V0ZUtleUNoYXJDb2RlID0gOTdcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJvdXRlS2V5XG4gICAgfVxuXG4gICAgY29uc3Qgcm91dGVLZXlzOiB7IFtuYW1lZDogc3RyaW5nXTogc3RyaW5nIH0gPSB7fVxuXG4gICAgbGV0IG5hbWVkUGFyYW1ldGVyaXplZFJvdXRlID0gc2VnbWVudHNcbiAgICAgIC5tYXAoKHNlZ21lbnQpID0+IHtcbiAgICAgICAgaWYgKHNlZ21lbnQuc3RhcnRzV2l0aCgnWycpICYmIHNlZ21lbnQuZW5kc1dpdGgoJ10nKSkge1xuICAgICAgICAgIGNvbnN0IHsga2V5LCBvcHRpb25hbCwgcmVwZWF0IH0gPSBwYXJzZVBhcmFtZXRlcihzZWdtZW50LnNsaWNlKDEsIC0xKSlcbiAgICAgICAgICAvLyByZXBsYWNlIGFueSBub24td29yZCBjaGFyYWN0ZXJzIHNpbmNlIHRoZXkgY2FuIGJyZWFrXG4gICAgICAgICAgLy8gdGhlIG5hbWVkIHJlZ2V4XG4gICAgICAgICAgbGV0IGNsZWFuZWRLZXkgPSBrZXkucmVwbGFjZSgvXFxXL2csICcnKVxuICAgICAgICAgIGxldCBpbnZhbGlkS2V5ID0gZmFsc2VcblxuICAgICAgICAgIC8vIGNoZWNrIGlmIHRoZSBrZXkgaXMgc3RpbGwgaW52YWxpZCBhbmQgZmFsbGJhY2sgdG8gdXNpbmcgYSBrbm93blxuICAgICAgICAgIC8vIHNhZmUga2V5XG4gICAgICAgICAgaWYgKGNsZWFuZWRLZXkubGVuZ3RoID09PSAwIHx8IGNsZWFuZWRLZXkubGVuZ3RoID4gMzApIHtcbiAgICAgICAgICAgIGludmFsaWRLZXkgPSB0cnVlXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghaXNOYU4ocGFyc2VJbnQoY2xlYW5lZEtleS5zdWJzdHIoMCwgMSkpKSkge1xuICAgICAgICAgICAgaW52YWxpZEtleSA9IHRydWVcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoaW52YWxpZEtleSkge1xuICAgICAgICAgICAgY2xlYW5lZEtleSA9IGdldFNhZmVSb3V0ZUtleSgpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcm91dGVLZXlzW2NsZWFuZWRLZXldID0ga2V5XG4gICAgICAgICAgcmV0dXJuIHJlcGVhdFxuICAgICAgICAgICAgPyBvcHRpb25hbFxuICAgICAgICAgICAgICA/IGAoPzovKD88JHtjbGVhbmVkS2V5fT4uKz8pKT9gXG4gICAgICAgICAgICAgIDogYC8oPzwke2NsZWFuZWRLZXl9Pi4rPylgXG4gICAgICAgICAgICA6IGAvKD88JHtjbGVhbmVkS2V5fT5bXi9dKz8pYFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBgLyR7ZXNjYXBlUmVnZXgoc2VnbWVudCl9YFxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLmpvaW4oJycpXG5cbiAgICByZXR1cm4ge1xuICAgICAgcmU6IG5ldyBSZWdFeHAoYF4ke3BhcmFtZXRlcml6ZWRSb3V0ZX0oPzovKT8kYCksXG4gICAgICBncm91cHMsXG4gICAgICByb3V0ZUtleXMsXG4gICAgICBuYW1lZFJlZ2V4OiBgXiR7bmFtZWRQYXJhbWV0ZXJpemVkUm91dGV9KD86Lyk/JGAsXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICByZTogbmV3IFJlZ0V4cChgXiR7cGFyYW1ldGVyaXplZFJvdXRlfSg/Oi8pPyRgKSxcbiAgICBncm91cHMsXG4gIH1cbn1cbiIsImltcG9ydCB7IEluY29taW5nTWVzc2FnZSwgU2VydmVyUmVzcG9uc2UgfSBmcm9tICdodHRwJ1xuaW1wb3J0IHsgUGFyc2VkVXJsUXVlcnkgfSBmcm9tICdxdWVyeXN0cmluZydcbmltcG9ydCB7IENvbXBvbmVudFR5cGUgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IFVybE9iamVjdCB9IGZyb20gJ3VybCdcbmltcG9ydCB7IGZvcm1hdFVybCB9IGZyb20gJy4vcm91dGVyL3V0aWxzL2Zvcm1hdC11cmwnXG5pbXBvcnQgeyBOZXh0Um91dGVyIH0gZnJvbSAnLi9yb3V0ZXIvcm91dGVyJ1xuaW1wb3J0IHsgRW52IH0gZnJvbSAnQG5leHQvZW52J1xuaW1wb3J0IHsgQnVpbGRNYW5pZmVzdCB9IGZyb20gJy4uL3NlcnZlci9nZXQtcGFnZS1maWxlcydcbmltcG9ydCB7IERvbWFpbkxvY2FsZXMgfSBmcm9tICcuLi9zZXJ2ZXIvY29uZmlnJ1xuaW1wb3J0IHsgUHJldmlld0RhdGEgfSBmcm9tICduZXh0L3R5cGVzJ1xuXG4vKipcbiAqIFR5cGVzIHVzZWQgYnkgYm90aCBuZXh0IGFuZCBuZXh0LXNlcnZlclxuICovXG5cbmV4cG9ydCB0eXBlIE5leHRDb21wb25lbnRUeXBlPFxuICBDIGV4dGVuZHMgQmFzZUNvbnRleHQgPSBOZXh0UGFnZUNvbnRleHQsXG4gIElQID0ge30sXG4gIFAgPSB7fVxuPiA9IENvbXBvbmVudFR5cGU8UD4gJiB7XG4gIC8qKlxuICAgKiBVc2VkIGZvciBpbml0aWFsIHBhZ2UgbG9hZCBkYXRhIHBvcHVsYXRpb24uIERhdGEgcmV0dXJuZWQgZnJvbSBgZ2V0SW5pdGlhbFByb3BzYCBpcyBzZXJpYWxpemVkIHdoZW4gc2VydmVyIHJlbmRlcmVkLlxuICAgKiBNYWtlIHN1cmUgdG8gcmV0dXJuIHBsYWluIGBPYmplY3RgIHdpdGhvdXQgdXNpbmcgYERhdGVgLCBgTWFwYCwgYFNldGAuXG4gICAqIEBwYXJhbSBjdHggQ29udGV4dCBvZiBgcGFnZWBcbiAgICovXG4gIGdldEluaXRpYWxQcm9wcz8oY29udGV4dDogQyk6IElQIHwgUHJvbWlzZTxJUD5cbn1cblxuZXhwb3J0IHR5cGUgRG9jdW1lbnRUeXBlID0gTmV4dENvbXBvbmVudFR5cGU8XG4gIERvY3VtZW50Q29udGV4dCxcbiAgRG9jdW1lbnRJbml0aWFsUHJvcHMsXG4gIERvY3VtZW50UHJvcHNcbj4gJiB7XG4gIHJlbmRlckRvY3VtZW50KFxuICAgIERvY3VtZW50OiBEb2N1bWVudFR5cGUsXG4gICAgcHJvcHM6IERvY3VtZW50UHJvcHNcbiAgKTogUmVhY3QuUmVhY3RFbGVtZW50XG59XG5cbmV4cG9ydCB0eXBlIEFwcFR5cGUgPSBOZXh0Q29tcG9uZW50VHlwZTxcbiAgQXBwQ29udGV4dFR5cGUsXG4gIEFwcEluaXRpYWxQcm9wcyxcbiAgQXBwUHJvcHNUeXBlXG4+XG5cbmV4cG9ydCB0eXBlIEFwcFRyZWVUeXBlID0gQ29tcG9uZW50VHlwZTxcbiAgQXBwSW5pdGlhbFByb3BzICYgeyBbbmFtZTogc3RyaW5nXTogYW55IH1cbj5cblxuLyoqXG4gKiBXZWIgdml0YWxzIHByb3ZpZGVkIHRvIF9hcHAucmVwb3J0V2ViVml0YWxzIGJ5IENvcmUgV2ViIFZpdGFscyBwbHVnaW4gZGV2ZWxvcGVkIGJ5IEdvb2dsZSBDaHJvbWUgdGVhbS5cbiAqIGh0dHBzOi8vbmV4dGpzLm9yZy9ibG9nL25leHQtOS00I2ludGVncmF0ZWQtd2ViLXZpdGFscy1yZXBvcnRpbmdcbiAqL1xuZXhwb3J0IHR5cGUgTmV4dFdlYlZpdGFsc01ldHJpYyA9IHtcbiAgaWQ6IHN0cmluZ1xuICBsYWJlbDogc3RyaW5nXG4gIG5hbWU6IHN0cmluZ1xuICBzdGFydFRpbWU6IG51bWJlclxuICB2YWx1ZTogbnVtYmVyXG59XG5cbmV4cG9ydCB0eXBlIEVuaGFuY2VyPEM+ID0gKENvbXBvbmVudDogQykgPT4gQ1xuXG5leHBvcnQgdHlwZSBDb21wb25lbnRzRW5oYW5jZXIgPVxuICB8IHtcbiAgICAgIGVuaGFuY2VBcHA/OiBFbmhhbmNlcjxBcHBUeXBlPlxuICAgICAgZW5oYW5jZUNvbXBvbmVudD86IEVuaGFuY2VyPE5leHRDb21wb25lbnRUeXBlPlxuICAgIH1cbiAgfCBFbmhhbmNlcjxOZXh0Q29tcG9uZW50VHlwZT5cblxuZXhwb3J0IHR5cGUgUmVuZGVyUGFnZVJlc3VsdCA9IHtcbiAgaHRtbDogc3RyaW5nXG4gIGhlYWQ/OiBBcnJheTxKU1guRWxlbWVudCB8IG51bGw+XG59XG5cbmV4cG9ydCB0eXBlIFJlbmRlclBhZ2UgPSAoXG4gIG9wdGlvbnM/OiBDb21wb25lbnRzRW5oYW5jZXJcbikgPT4gUmVuZGVyUGFnZVJlc3VsdCB8IFByb21pc2U8UmVuZGVyUGFnZVJlc3VsdD5cblxuZXhwb3J0IHR5cGUgQmFzZUNvbnRleHQgPSB7XG4gIHJlcz86IFNlcnZlclJlc3BvbnNlXG4gIFtrOiBzdHJpbmddOiBhbnlcbn1cblxuZXhwb3J0IHR5cGUgTkVYVF9EQVRBID0ge1xuICBwcm9wczogUmVjb3JkPHN0cmluZywgYW55PlxuICBwYWdlOiBzdHJpbmdcbiAgcXVlcnk6IFBhcnNlZFVybFF1ZXJ5XG4gIGJ1aWxkSWQ6IHN0cmluZ1xuICBhc3NldFByZWZpeD86IHN0cmluZ1xuICBydW50aW1lQ29uZmlnPzogeyBba2V5OiBzdHJpbmddOiBhbnkgfVxuICBuZXh0RXhwb3J0PzogYm9vbGVhblxuICBhdXRvRXhwb3J0PzogYm9vbGVhblxuICBpc0ZhbGxiYWNrPzogYm9vbGVhblxuICBkeW5hbWljSWRzPzogKHN0cmluZyB8IG51bWJlcilbXVxuICBlcnI/OiBFcnJvciAmIHsgc3RhdHVzQ29kZT86IG51bWJlciB9XG4gIGdzcD86IGJvb2xlYW5cbiAgZ3NzcD86IGJvb2xlYW5cbiAgY3VzdG9tU2VydmVyPzogYm9vbGVhblxuICBnaXA/OiBib29sZWFuXG4gIGFwcEdpcD86IGJvb2xlYW5cbiAgbG9jYWxlPzogc3RyaW5nXG4gIGxvY2FsZXM/OiBzdHJpbmdbXVxuICBkZWZhdWx0TG9jYWxlPzogc3RyaW5nXG4gIGRvbWFpbkxvY2FsZXM/OiBEb21haW5Mb2NhbGVzXG4gIHNjcmlwdExvYWRlcj86IGFueVtdXG4gIGlzUHJldmlldz86IGJvb2xlYW5cbn1cblxuLyoqXG4gKiBgTmV4dGAgY29udGV4dFxuICovXG5leHBvcnQgaW50ZXJmYWNlIE5leHRQYWdlQ29udGV4dCB7XG4gIC8qKlxuICAgKiBFcnJvciBvYmplY3QgaWYgZW5jb3VudGVyZWQgZHVyaW5nIHJlbmRlcmluZ1xuICAgKi9cbiAgZXJyPzogKEVycm9yICYgeyBzdGF0dXNDb2RlPzogbnVtYmVyIH0pIHwgbnVsbFxuICAvKipcbiAgICogYEhUVFBgIHJlcXVlc3Qgb2JqZWN0LlxuICAgKi9cbiAgcmVxPzogSW5jb21pbmdNZXNzYWdlXG4gIC8qKlxuICAgKiBgSFRUUGAgcmVzcG9uc2Ugb2JqZWN0LlxuICAgKi9cbiAgcmVzPzogU2VydmVyUmVzcG9uc2VcbiAgLyoqXG4gICAqIFBhdGggc2VjdGlvbiBvZiBgVVJMYC5cbiAgICovXG4gIHBhdGhuYW1lOiBzdHJpbmdcbiAgLyoqXG4gICAqIFF1ZXJ5IHN0cmluZyBzZWN0aW9uIG9mIGBVUkxgIHBhcnNlZCBhcyBhbiBvYmplY3QuXG4gICAqL1xuICBxdWVyeTogUGFyc2VkVXJsUXVlcnlcbiAgLyoqXG4gICAqIGBTdHJpbmdgIG9mIHRoZSBhY3R1YWwgcGF0aCBpbmNsdWRpbmcgcXVlcnkuXG4gICAqL1xuICBhc1BhdGg/OiBzdHJpbmdcbiAgLyoqXG4gICAqIFRoZSBjdXJyZW50bHkgYWN0aXZlIGxvY2FsZVxuICAgKi9cbiAgbG9jYWxlPzogc3RyaW5nXG4gIC8qKlxuICAgKiBBbGwgY29uZmlndXJlZCBsb2NhbGVzXG4gICAqL1xuICBsb2NhbGVzPzogc3RyaW5nW11cbiAgLyoqXG4gICAqIFRoZSBjb25maWd1cmVkIGRlZmF1bHQgbG9jYWxlXG4gICAqL1xuICBkZWZhdWx0TG9jYWxlPzogc3RyaW5nXG4gIC8qKlxuICAgKiBgQ29tcG9uZW50YCB0aGUgdHJlZSBvZiB0aGUgQXBwIHRvIHVzZSBpZiBuZWVkaW5nIHRvIHJlbmRlciBzZXBhcmF0ZWx5XG4gICAqL1xuICBBcHBUcmVlOiBBcHBUcmVlVHlwZVxufVxuXG5leHBvcnQgdHlwZSBBcHBDb250ZXh0VHlwZTxSIGV4dGVuZHMgTmV4dFJvdXRlciA9IE5leHRSb3V0ZXI+ID0ge1xuICBDb21wb25lbnQ6IE5leHRDb21wb25lbnRUeXBlPE5leHRQYWdlQ29udGV4dD5cbiAgQXBwVHJlZTogQXBwVHJlZVR5cGVcbiAgY3R4OiBOZXh0UGFnZUNvbnRleHRcbiAgcm91dGVyOiBSXG59XG5cbmV4cG9ydCB0eXBlIEFwcEluaXRpYWxQcm9wcyA9IHtcbiAgcGFnZVByb3BzOiBhbnlcbn1cblxuZXhwb3J0IHR5cGUgQXBwUHJvcHNUeXBlPFxuICBSIGV4dGVuZHMgTmV4dFJvdXRlciA9IE5leHRSb3V0ZXIsXG4gIFAgPSB7fVxuPiA9IEFwcEluaXRpYWxQcm9wcyAmIHtcbiAgQ29tcG9uZW50OiBOZXh0Q29tcG9uZW50VHlwZTxOZXh0UGFnZUNvbnRleHQsIGFueSwgUD5cbiAgcm91dGVyOiBSXG4gIF9fTl9TU0c/OiBib29sZWFuXG4gIF9fTl9TU1A/OiBib29sZWFuXG59XG5cbmV4cG9ydCB0eXBlIERvY3VtZW50Q29udGV4dCA9IE5leHRQYWdlQ29udGV4dCAmIHtcbiAgcmVuZGVyUGFnZTogUmVuZGVyUGFnZVxufVxuXG5leHBvcnQgdHlwZSBEb2N1bWVudEluaXRpYWxQcm9wcyA9IFJlbmRlclBhZ2VSZXN1bHQgJiB7XG4gIHN0eWxlcz86IFJlYWN0LlJlYWN0RWxlbWVudFtdIHwgUmVhY3QuUmVhY3RGcmFnbWVudFxufVxuXG5leHBvcnQgdHlwZSBEb2N1bWVudFByb3BzID0gRG9jdW1lbnRJbml0aWFsUHJvcHMgJiB7XG4gIF9fTkVYVF9EQVRBX186IE5FWFRfREFUQVxuICBkYW5nZXJvdXNBc1BhdGg6IHN0cmluZ1xuICBkb2NDb21wb25lbnRzUmVuZGVyZWQ6IHtcbiAgICBIdG1sPzogYm9vbGVhblxuICAgIE1haW4/OiBib29sZWFuXG4gICAgSGVhZD86IGJvb2xlYW5cbiAgICBOZXh0U2NyaXB0PzogYm9vbGVhblxuICB9XG4gIGJ1aWxkTWFuaWZlc3Q6IEJ1aWxkTWFuaWZlc3RcbiAgYW1wUGF0aDogc3RyaW5nXG4gIGluQW1wTW9kZTogYm9vbGVhblxuICBoeWJyaWRBbXA6IGJvb2xlYW5cbiAgaXNEZXZlbG9wbWVudDogYm9vbGVhblxuICBkeW5hbWljSW1wb3J0czogc3RyaW5nW11cbiAgYXNzZXRQcmVmaXg/OiBzdHJpbmdcbiAgY2Fub25pY2FsQmFzZTogc3RyaW5nXG4gIGhlYWRUYWdzOiBhbnlbXVxuICB1bnN0YWJsZV9ydW50aW1lSlM/OiBmYWxzZVxuICB1bnN0YWJsZV9Kc1ByZWxvYWQ/OiBmYWxzZVxuICBkZXZPbmx5Q2FjaGVCdXN0ZXJRdWVyeVN0cmluZzogc3RyaW5nXG4gIHNjcmlwdExvYWRlcjogeyBhZnRlckludGVyYWN0aXZlPzogc3RyaW5nW107IGJlZm9yZUludGVyYWN0aXZlPzogYW55W10gfVxuICBsb2NhbGU/OiBzdHJpbmdcbiAgZGlzYWJsZU9wdGltaXplZExvYWRpbmc/OiBib29sZWFuXG59XG5cbi8qKlxuICogTmV4dCBgQVBJYCByb3V0ZSByZXF1ZXN0XG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTmV4dEFwaVJlcXVlc3QgZXh0ZW5kcyBJbmNvbWluZ01lc3NhZ2Uge1xuICAvKipcbiAgICogT2JqZWN0IG9mIGBxdWVyeWAgdmFsdWVzIGZyb20gdXJsXG4gICAqL1xuICBxdWVyeToge1xuICAgIFtrZXk6IHN0cmluZ106IHN0cmluZyB8IHN0cmluZ1tdXG4gIH1cbiAgLyoqXG4gICAqIE9iamVjdCBvZiBgY29va2llc2AgZnJvbSBoZWFkZXJcbiAgICovXG4gIGNvb2tpZXM6IHtcbiAgICBba2V5OiBzdHJpbmddOiBzdHJpbmdcbiAgfVxuXG4gIGJvZHk6IGFueVxuXG4gIGVudjogRW52XG5cbiAgcHJldmlldz86IGJvb2xlYW5cbiAgLyoqXG4gICAqIFByZXZpZXcgZGF0YSBzZXQgb24gdGhlIHJlcXVlc3QsIGlmIGFueVxuICAgKiAqL1xuICBwcmV2aWV3RGF0YT86IFByZXZpZXdEYXRhXG59XG5cbi8qKlxuICogU2VuZCBib2R5IG9mIHJlc3BvbnNlXG4gKi9cbnR5cGUgU2VuZDxUPiA9IChib2R5OiBUKSA9PiB2b2lkXG5cbi8qKlxuICogTmV4dCBgQVBJYCByb3V0ZSByZXNwb25zZVxuICovXG5leHBvcnQgdHlwZSBOZXh0QXBpUmVzcG9uc2U8VCA9IGFueT4gPSBTZXJ2ZXJSZXNwb25zZSAmIHtcbiAgLyoqXG4gICAqIFNlbmQgZGF0YSBgYW55YCBkYXRhIGluIHJlc3BvbnNlXG4gICAqL1xuICBzZW5kOiBTZW5kPFQ+XG4gIC8qKlxuICAgKiBTZW5kIGRhdGEgYGpzb25gIGRhdGEgaW4gcmVzcG9uc2VcbiAgICovXG4gIGpzb246IFNlbmQ8VD5cbiAgc3RhdHVzOiAoc3RhdHVzQ29kZTogbnVtYmVyKSA9PiBOZXh0QXBpUmVzcG9uc2U8VD5cbiAgcmVkaXJlY3QodXJsOiBzdHJpbmcpOiBOZXh0QXBpUmVzcG9uc2U8VD5cbiAgcmVkaXJlY3Qoc3RhdHVzOiBudW1iZXIsIHVybDogc3RyaW5nKTogTmV4dEFwaVJlc3BvbnNlPFQ+XG5cbiAgLyoqXG4gICAqIFNldCBwcmV2aWV3IGRhdGEgZm9yIE5leHQuanMnIHByZXJlbmRlciBtb2RlXG4gICAqL1xuICBzZXRQcmV2aWV3RGF0YTogKFxuICAgIGRhdGE6IG9iamVjdCB8IHN0cmluZyxcbiAgICBvcHRpb25zPzoge1xuICAgICAgLyoqXG4gICAgICAgKiBTcGVjaWZpZXMgdGhlIG51bWJlciAoaW4gc2Vjb25kcykgZm9yIHRoZSBwcmV2aWV3IHNlc3Npb24gdG8gbGFzdCBmb3IuXG4gICAgICAgKiBUaGUgZ2l2ZW4gbnVtYmVyIHdpbGwgYmUgY29udmVydGVkIHRvIGFuIGludGVnZXIgYnkgcm91bmRpbmcgZG93bi5cbiAgICAgICAqIEJ5IGRlZmF1bHQsIG5vIG1heGltdW0gYWdlIGlzIHNldCBhbmQgdGhlIHByZXZpZXcgc2Vzc2lvbiBmaW5pc2hlc1xuICAgICAgICogd2hlbiB0aGUgY2xpZW50IHNodXRzIGRvd24gKGJyb3dzZXIgaXMgY2xvc2VkKS5cbiAgICAgICAqL1xuICAgICAgbWF4QWdlPzogbnVtYmVyXG4gICAgfVxuICApID0+IE5leHRBcGlSZXNwb25zZTxUPlxuICBjbGVhclByZXZpZXdEYXRhOiAoKSA9PiBOZXh0QXBpUmVzcG9uc2U8VD5cbn1cblxuLyoqXG4gKiBOZXh0IGBBUElgIHJvdXRlIGhhbmRsZXJcbiAqL1xuZXhwb3J0IHR5cGUgTmV4dEFwaUhhbmRsZXI8VCA9IGFueT4gPSAoXG4gIHJlcTogTmV4dEFwaVJlcXVlc3QsXG4gIHJlczogTmV4dEFwaVJlc3BvbnNlPFQ+XG4pID0+IHZvaWQgfCBQcm9taXNlPHZvaWQ+XG5cbi8qKlxuICogVXRpbHNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGV4ZWNPbmNlPFQgZXh0ZW5kcyAoLi4uYXJnczogYW55W10pID0+IFJldHVyblR5cGU8VD4+KFxuICBmbjogVFxuKTogVCB7XG4gIGxldCB1c2VkID0gZmFsc2VcbiAgbGV0IHJlc3VsdDogUmV0dXJuVHlwZTxUPlxuXG4gIHJldHVybiAoKC4uLmFyZ3M6IGFueVtdKSA9PiB7XG4gICAgaWYgKCF1c2VkKSB7XG4gICAgICB1c2VkID0gdHJ1ZVxuICAgICAgcmVzdWx0ID0gZm4oLi4uYXJncylcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdFxuICB9KSBhcyBUXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRMb2NhdGlvbk9yaWdpbigpIHtcbiAgY29uc3QgeyBwcm90b2NvbCwgaG9zdG5hbWUsIHBvcnQgfSA9IHdpbmRvdy5sb2NhdGlvblxuICByZXR1cm4gYCR7cHJvdG9jb2x9Ly8ke2hvc3RuYW1lfSR7cG9ydCA/ICc6JyArIHBvcnQgOiAnJ31gXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRVUkwoKSB7XG4gIGNvbnN0IHsgaHJlZiB9ID0gd2luZG93LmxvY2F0aW9uXG4gIGNvbnN0IG9yaWdpbiA9IGdldExvY2F0aW9uT3JpZ2luKClcbiAgcmV0dXJuIGhyZWYuc3Vic3RyaW5nKG9yaWdpbi5sZW5ndGgpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXREaXNwbGF5TmFtZTxQPihDb21wb25lbnQ6IENvbXBvbmVudFR5cGU8UD4pIHtcbiAgcmV0dXJuIHR5cGVvZiBDb21wb25lbnQgPT09ICdzdHJpbmcnXG4gICAgPyBDb21wb25lbnRcbiAgICA6IENvbXBvbmVudC5kaXNwbGF5TmFtZSB8fCBDb21wb25lbnQubmFtZSB8fCAnVW5rbm93bidcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzUmVzU2VudChyZXM6IFNlcnZlclJlc3BvbnNlKSB7XG4gIHJldHVybiByZXMuZmluaXNoZWQgfHwgcmVzLmhlYWRlcnNTZW50XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2FkR2V0SW5pdGlhbFByb3BzPFxuICBDIGV4dGVuZHMgQmFzZUNvbnRleHQsXG4gIElQID0ge30sXG4gIFAgPSB7fVxuPihBcHA6IE5leHRDb21wb25lbnRUeXBlPEMsIElQLCBQPiwgY3R4OiBDKTogUHJvbWlzZTxJUD4ge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGlmIChBcHAucHJvdG90eXBlPy5nZXRJbml0aWFsUHJvcHMpIHtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBgXCIke2dldERpc3BsYXlOYW1lKFxuICAgICAgICBBcHBcbiAgICAgICl9LmdldEluaXRpYWxQcm9wcygpXCIgaXMgZGVmaW5lZCBhcyBhbiBpbnN0YW5jZSBtZXRob2QgLSB2aXNpdCBodHRwczovL25leHRqcy5vcmcvZG9jcy9tZXNzYWdlcy9nZXQtaW5pdGlhbC1wcm9wcy1hcy1hbi1pbnN0YW5jZS1tZXRob2QgZm9yIG1vcmUgaW5mb3JtYXRpb24uYFxuICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpXG4gICAgfVxuICB9XG4gIC8vIHdoZW4gY2FsbGVkIGZyb20gX2FwcCBgY3R4YCBpcyBuZXN0ZWQgaW4gYGN0eGBcbiAgY29uc3QgcmVzID0gY3R4LnJlcyB8fCAoY3R4LmN0eCAmJiBjdHguY3R4LnJlcylcblxuICBpZiAoIUFwcC5nZXRJbml0aWFsUHJvcHMpIHtcbiAgICBpZiAoY3R4LmN0eCAmJiBjdHguQ29tcG9uZW50KSB7XG4gICAgICAvLyBAdHMtaWdub3JlIHBhZ2VQcm9wcyBkZWZhdWx0XG4gICAgICByZXR1cm4ge1xuICAgICAgICBwYWdlUHJvcHM6IGF3YWl0IGxvYWRHZXRJbml0aWFsUHJvcHMoY3R4LkNvbXBvbmVudCwgY3R4LmN0eCksXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7fSBhcyBJUFxuICB9XG5cbiAgY29uc3QgcHJvcHMgPSBhd2FpdCBBcHAuZ2V0SW5pdGlhbFByb3BzKGN0eClcblxuICBpZiAocmVzICYmIGlzUmVzU2VudChyZXMpKSB7XG4gICAgcmV0dXJuIHByb3BzXG4gIH1cblxuICBpZiAoIXByb3BzKSB7XG4gICAgY29uc3QgbWVzc2FnZSA9IGBcIiR7Z2V0RGlzcGxheU5hbWUoXG4gICAgICBBcHBcbiAgICApfS5nZXRJbml0aWFsUHJvcHMoKVwiIHNob3VsZCByZXNvbHZlIHRvIGFuIG9iamVjdC4gQnV0IGZvdW5kIFwiJHtwcm9wc31cIiBpbnN0ZWFkLmBcbiAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSlcbiAgfVxuXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgaWYgKE9iamVjdC5rZXlzKHByb3BzKS5sZW5ndGggPT09IDAgJiYgIWN0eC5jdHgpIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgYCR7Z2V0RGlzcGxheU5hbWUoXG4gICAgICAgICAgQXBwXG4gICAgICAgICl9IHJldHVybmVkIGFuIGVtcHR5IG9iamVjdCBmcm9tIFxcYGdldEluaXRpYWxQcm9wc1xcYC4gVGhpcyBkZS1vcHRpbWl6ZXMgYW5kIHByZXZlbnRzIGF1dG9tYXRpYyBzdGF0aWMgb3B0aW1pemF0aW9uLiBodHRwczovL25leHRqcy5vcmcvZG9jcy9tZXNzYWdlcy9lbXB0eS1vYmplY3QtZ2V0SW5pdGlhbFByb3BzYFxuICAgICAgKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBwcm9wc1xufVxuXG5leHBvcnQgY29uc3QgdXJsT2JqZWN0S2V5cyA9IFtcbiAgJ2F1dGgnLFxuICAnaGFzaCcsXG4gICdob3N0JyxcbiAgJ2hvc3RuYW1lJyxcbiAgJ2hyZWYnLFxuICAncGF0aCcsXG4gICdwYXRobmFtZScsXG4gICdwb3J0JyxcbiAgJ3Byb3RvY29sJyxcbiAgJ3F1ZXJ5JyxcbiAgJ3NlYXJjaCcsXG4gICdzbGFzaGVzJyxcbl1cblxuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdFdpdGhWYWxpZGF0aW9uKHVybDogVXJsT2JqZWN0KTogc3RyaW5nIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XG4gICAgaWYgKHVybCAhPT0gbnVsbCAmJiB0eXBlb2YgdXJsID09PSAnb2JqZWN0Jykge1xuICAgICAgT2JqZWN0LmtleXModXJsKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgaWYgKHVybE9iamVjdEtleXMuaW5kZXhPZihrZXkpID09PSAtMSkge1xuICAgICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICAgIGBVbmtub3duIGtleSBwYXNzZWQgdmlhIHVybE9iamVjdCBpbnRvIHVybC5mb3JtYXQ6ICR7a2V5fWBcbiAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZvcm1hdFVybCh1cmwpXG59XG5cbmV4cG9ydCBjb25zdCBTUCA9IHR5cGVvZiBwZXJmb3JtYW5jZSAhPT0gJ3VuZGVmaW5lZCdcbmV4cG9ydCBjb25zdCBTVCA9XG4gIFNQICYmXG4gIHR5cGVvZiBwZXJmb3JtYW5jZS5tYXJrID09PSAnZnVuY3Rpb24nICYmXG4gIHR5cGVvZiBwZXJmb3JtYW5jZS5tZWFzdXJlID09PSAnZnVuY3Rpb24nXG4iLCJcInVzZSBzdHJpY3RcIjtleHBvcnRzLl9fZXNNb2R1bGU9dHJ1ZTtleHBvcnRzLm5vcm1hbGl6ZVBhdGhTZXA9bm9ybWFsaXplUGF0aFNlcDtleHBvcnRzLmRlbm9ybWFsaXplUGFnZVBhdGg9ZGVub3JtYWxpemVQYWdlUGF0aDtmdW5jdGlvbiBub3JtYWxpemVQYXRoU2VwKHBhdGgpe3JldHVybiBwYXRoLnJlcGxhY2UoL1xcXFwvZywnLycpO31mdW5jdGlvbiBkZW5vcm1hbGl6ZVBhZ2VQYXRoKHBhZ2Upe3BhZ2U9bm9ybWFsaXplUGF0aFNlcChwYWdlKTtpZihwYWdlLnN0YXJ0c1dpdGgoJy9pbmRleC8nKSl7cGFnZT1wYWdlLnNsaWNlKDYpO31lbHNlIGlmKHBhZ2U9PT0nL2luZGV4Jyl7cGFnZT0nLyc7fXJldHVybiBwYWdlO31cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRlbm9ybWFsaXplLXBhZ2UtcGF0aC5qcy5tYXAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZGlzdC9jbGllbnQvbGluaycpXG4iLCJmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikge1xuICByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDoge1xuICAgIFwiZGVmYXVsdFwiOiBvYmpcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0OyIsInZhciBfdHlwZW9mID0gcmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvdHlwZW9mXCIpO1xuXG5mdW5jdGlvbiBfZ2V0UmVxdWlyZVdpbGRjYXJkQ2FjaGUoKSB7XG4gIGlmICh0eXBlb2YgV2Vha01hcCAhPT0gXCJmdW5jdGlvblwiKSByZXR1cm4gbnVsbDtcbiAgdmFyIGNhY2hlID0gbmV3IFdlYWtNYXAoKTtcblxuICBfZ2V0UmVxdWlyZVdpbGRjYXJkQ2FjaGUgPSBmdW5jdGlvbiBfZ2V0UmVxdWlyZVdpbGRjYXJkQ2FjaGUoKSB7XG4gICAgcmV0dXJuIGNhY2hlO1xuICB9O1xuXG4gIHJldHVybiBjYWNoZTtcbn1cblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQob2JqKSB7XG4gIGlmIChvYmogJiYgb2JqLl9fZXNNb2R1bGUpIHtcbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgaWYgKG9iaiA9PT0gbnVsbCB8fCBfdHlwZW9mKG9iaikgIT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIG9iaiAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIFwiZGVmYXVsdFwiOiBvYmpcbiAgICB9O1xuICB9XG5cbiAgdmFyIGNhY2hlID0gX2dldFJlcXVpcmVXaWxkY2FyZENhY2hlKCk7XG5cbiAgaWYgKGNhY2hlICYmIGNhY2hlLmhhcyhvYmopKSB7XG4gICAgcmV0dXJuIGNhY2hlLmdldChvYmopO1xuICB9XG5cbiAgdmFyIG5ld09iaiA9IHt9O1xuICB2YXIgaGFzUHJvcGVydHlEZXNjcmlwdG9yID0gT2JqZWN0LmRlZmluZVByb3BlcnR5ICYmIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG5cbiAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSB7XG4gICAgICB2YXIgZGVzYyA9IGhhc1Byb3BlcnR5RGVzY3JpcHRvciA/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBrZXkpIDogbnVsbDtcblxuICAgICAgaWYgKGRlc2MgJiYgKGRlc2MuZ2V0IHx8IGRlc2Muc2V0KSkge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobmV3T2JqLCBrZXksIGRlc2MpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV3T2JqW2tleV0gPSBvYmpba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZXdPYmpbXCJkZWZhdWx0XCJdID0gb2JqO1xuXG4gIGlmIChjYWNoZSkge1xuICAgIGNhY2hlLnNldChvYmosIG5ld09iaik7XG4gIH1cblxuICByZXR1cm4gbmV3T2JqO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkOyIsImZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gIFwiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjtcblxuICBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICAgICAgcmV0dXJuIHR5cGVvZiBvYmo7XG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBfdHlwZW9mKG9iaik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3R5cGVvZjsiLCJpbXBvcnQgeyB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gXCJuZXh0L3JvdXRlclwiO1xuaW1wb3J0IHsgdXNlQXV0aCB9IGZyb20gXCIuLi9jb250ZXh0L0F1dGhVc2VyQ29udGV4dFwiO1xuaW1wb3J0IHsgQ29udGFpbmVyIH0gZnJvbSBcInJlYWN0LWJvb3RzdHJhcFwiO1xuXG5jb25zdCBMb2dnZWRJbiA9ICh7IGNoaWxkcmVuIH0pID0+IHtcbiAgY29uc3QgeyBhdXRoVXNlciwgbG9hZGluZyB9ID0gdXNlQXV0aCgpO1xuICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcblxuICAvLyBSZWRpcmVjdCBvbmx5IGFmdGVyIGEgc2hvcnQgZGVsYXkgaWYgYXV0aFVzZXIgcmVtYWlucyBudWxsLlxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKFwiPT09IExPR0dFRElOIEFVVEggQ0hFQ0sgPT09XCIpO1xuICAgIGNvbnNvbGUubG9nKFwibG9hZGluZzpcIiwgbG9hZGluZyk7XG4gICAgY29uc29sZS5sb2coXCJhdXRoVXNlcjpcIiwgYXV0aFVzZXIpO1xuICAgIGNvbnNvbGUubG9nKFwicm91dGVyLmFzUGF0aDpcIiwgcm91dGVyLmFzUGF0aCk7XG5cbiAgICBpZiAoIWxvYWRpbmcgJiYgYXV0aFVzZXIgPT09IG51bGwpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiTm8gYXV0aCB1c2VyLCB3aWxsIHJlZGlyZWN0IHRvIGxvZ2luIGluIDgwMG1zXCIpO1xuICAgICAgLy8gU2V0IGEgZGVsYXkgKGUuZy4gNTAwbXMpIHRvIGdpdmUgRmlyZWJhc2UgQXV0aCBhIGNoYW5jZSB0byByZWh5ZHJhdGUuXG4gICAgICBjb25zdCB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlJlZGlyZWN0aW5nIHRvIGxvZ2luIG5vd1wiKTtcbiAgICAgICAgcm91dGVyLnB1c2goYC8/cmVkaXJlY3Q9JHtlbmNvZGVVUklDb21wb25lbnQocm91dGVyLmFzUGF0aCl9YCk7XG4gICAgICB9LCA4MDApO1xuICAgICAgcmV0dXJuICgpID0+IGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgfVxuICB9LCBbYXV0aFVzZXIsIGxvYWRpbmcsIHJvdXRlcl0pO1xuXG4gIGlmIChsb2FkaW5nKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxDb250YWluZXJcbiAgICAgICAgY2xhc3NOYW1lPVwiZC1mbGV4IGFsaWduLWl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyXCJcbiAgICAgICAgc3R5bGU9e3sgbWluSGVpZ2h0OiBcIjEwMHZoXCIgfX1cbiAgICAgID5cbiAgICAgICAgPGgzPkxvYWRpbmcuLi48L2gzPlxuICAgICAgPC9Db250YWluZXI+XG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiA8PnthdXRoVXNlciAmJiBjaGlsZHJlbn08Lz47XG59O1xuXG5leHBvcnQgZGVmYXVsdCBMb2dnZWRJbjtcbiIsImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlLCB1c2VSZWYsIHVzZUNhbGxiYWNrIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQge1xuICBJbnB1dEdyb3VwLFxuICBEcm9wZG93bixcbiAgRm9ybUNvbnRyb2wsXG4gIEJ1dHRvbixcbiAgTmF2RHJvcGRvd24sXG4gIEZvcm0sXG4gIE1vZGFsLFxuICBQYWdpbmF0aW9uLFxuICBPZmZjYW52YXMsXG59IGZyb20gXCJyZWFjdC1ib290c3RyYXBcIjtcbmltcG9ydCBMaW5rIGZyb20gXCJuZXh0L2xpbmtcIjtcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gXCJuZXh0L3JvdXRlclwiO1xuaW1wb3J0IHtcbiAgZmV0Y2hQYXJ0c1dpdGhNYWNoaW5lRGF0YVBhZ2UsXG4gIGZldGNoQ2xpZW50cyxcbiAgZmV0Y2hNb2RlbHMsXG59IGZyb20gXCIuLi8uLi91dGlscy9mZXRjaEFzc29jaWF0aW9uc1wiO1xuaW1wb3J0IHsgdXNlQXV0aCB9IGZyb20gXCIuLi8uLi9jb250ZXh0L0F1dGhVc2VyQ29udGV4dFwiO1xyXG5pbXBvcnQgTG9nZ2VkSW4gZnJvbSBcIi4uL0xvZ2dlZEluXCI7XHJcbmltcG9ydCBDbGllbnRUYWJsZSBmcm9tIFwiLi4vLi4vdXRpbHMvQ2xpZW50VGFibGVcIjtcbmltcG9ydCBNb2RlbFRhYmxlIGZyb20gXCIuLi8uLi91dGlscy9Nb2RlbFRhYmxlXCI7XG5pbXBvcnQgUGFydFRhYmxlIGZyb20gXCIuLi8uLi91dGlscy9QYXJ0VGFibGVcIjtcbmltcG9ydCBzdHlsZXMgZnJvbSBcIi4uLy4uL3N0eWxlcy9NYWluU2VhcmNoLm1vZHVsZS5jc3NcIjtcbmltcG9ydCBmaXJlYmFzZSBmcm9tIFwiLi4vLi4vY29udGV4dC9GaXJlYmFzZVwiO1xuaW1wb3J0IHsgYnVpbGROYW1lVG9rZW5zIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2l0ZW1Gb3JtU2hhcmVkXCI7XG5pbXBvcnQgV2FyZWhvdXNlTWFwTW9kYWwgZnJvbSBcIi4uLy4uL2NvbXBvbmVudHMvV2FyZWhvdXNlTWFwTW9kYWxcIjtcblxyXG4vLyBQcmVkZWZpbmVkIHdhcmVob3VzZSBjbGllbnQgSURzIGFuZCBkaXNwbGF5IG5hbWVzXHJcbmNvbnN0IFNPQ0FMX0NMSUVOVF9JRCA9IFwiQUlTMTcxODJcIjtcclxuY29uc3QgTk9SQ0FMX0NMSUVOVF9JRCA9IFwiQUlTMjUwOTdcIjtcbmNvbnN0IFVOQVNTSUdORURfQ0xJRU5UX0lEID0gXCJBSVMwMDQwNFwiO1xuY29uc3QgREVGQVVMVF9QQUdFX1NJWkUgPSAyNTtcblxyXG5cclxuLy8gU2ltdWxhdGVzIGEgbmV0d29yayByZXF1ZXN0IGRlbGF5XHJcbmZ1bmN0aW9uIHNpbXVsYXRlTmV0d29ya1JlcXVlc3QoKSB7XHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIDIwMDApKTtcclxufVxyXG5cclxuLy8gQ3VzdG9tIExvYWRpbmdCdXR0b24gY29tcG9uZW50XHJcbmZ1bmN0aW9uIExvYWRpbmdCdXR0b24oeyB0eXBlLCBuYW1lLCByb3V0ZSwgY2xhc3NOYW1lIH0pIHtcbiAgY29uc3QgW2lzTG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoaXNMb2FkaW5nKSB7XG4gICAgICBsZXQgY2FuY2VsbGVkID0gZmFsc2U7XG4gICAgICBzaW11bGF0ZU5ldHdvcmtSZXF1ZXN0KCkudGhlbigoKSA9PiB7XG4gICAgICAgIGlmICghY2FuY2VsbGVkKSBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgY2FuY2VsbGVkID0gdHJ1ZTtcbiAgICAgIH07XG4gICAgfVxuICB9LCBbaXNMb2FkaW5nXSk7XG5cclxuICByZXR1cm4gKFxuICAgIDxMaW5rIGhyZWY9e2AvJHtyb3V0ZX1gfT5cbiAgICAgIDxhXG4gICAgICAgIGNsYXNzTmFtZT17YGJ0biBidG4tJHt0eXBlfSAke2NsYXNzTmFtZSB8fCBcIlwifWB9XG4gICAgICAgIGRpc2FibGVkPXtpc0xvYWRpbmd9XG4gICAgICAgIG9uQ2xpY2s9eygpID0+ICFpc0xvYWRpbmcgJiYgc2V0TG9hZGluZyh0cnVlKX1cbiAgICAgID5cbiAgICAgICAge2lzTG9hZGluZyA/IFwiTG9hZGluZy4uLlwiIDogbmFtZX1cbiAgICAgIDwvYT5cclxuICAgIDwvTGluaz5cclxuICApO1xyXG59XHJcblxyXG4vLyAtLS0tIERBVEUgSEVMUEVSUyAodG9wLWxldmVsIHNjb3BlKSAtLS0tXHJcblxyXG4vLyBDb252ZXJ0IGFueXRoaW5nIGRhdGUtaXNoIGludG8gYSB0aW1lc3RhbXAgKG1zIHNpbmNlIGVwb2NoKS5cclxuZnVuY3Rpb24gdG9UaW1lKHZhbHVlKSB7XHJcbiAgaWYgKCF2YWx1ZSkgcmV0dXJuIG51bGw7XHJcblxyXG4gIC8vIEZpcmVzdG9yZSBUaW1lc3RhbXAgeyBzZWNvbmRzLCBuYW5vc2Vjb25kcyB9XHJcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZS5zZWNvbmRzICE9IG51bGwpIHtcclxuICAgIHRyeSB7IHJldHVybiB2YWx1ZS5zZWNvbmRzICogMTAwMDsgfSBjYXRjaCB7IC8qIGlnbm9yZSAqLyB9XHJcbiAgfVxyXG5cclxuICAvLyBOYXRpdmUgRGF0ZVxyXG4gIGlmICh2YWx1ZSBpbnN0YW5jZW9mIERhdGUpIHtcclxuICAgIGNvbnN0IHQgPSB2YWx1ZS5nZXRUaW1lKCk7XHJcbiAgICByZXR1cm4gaXNOYU4odCkgPyBudWxsIDogdDtcclxuICB9XHJcblxyXG4gIC8vIFN0cmluZ3NcclxuICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAvLyBJU08gLyB5eXl5LW1tLWRkXHJcbiAgICBjb25zdCBpc28gPSBEYXRlLnBhcnNlKHZhbHVlKTtcclxuICAgIGlmICghaXNOYU4oaXNvKSkgcmV0dXJuIGlzbztcclxuXHJcbiAgICAvLyBtbS9kZC95eXl5XHJcbiAgICBjb25zdCBwYXJ0cyA9IHZhbHVlLnNwbGl0KFwiL1wiKTtcclxuICAgIGlmIChwYXJ0cy5sZW5ndGggPT09IDMpIHtcclxuICAgICAgY29uc3QgW21tLCBkZCwgeXl5eV0gPSBwYXJ0cztcclxuICAgICAgY29uc3QgYWx0ID0gRGF0ZS5wYXJzZShgJHt5eXl5fS0ke21tfS0ke2RkfWApO1xyXG4gICAgICBpZiAoIWlzTmFOKGFsdCkpIHJldHVybiBhbHQ7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBMYXN0IHJlc29ydFxyXG4gIGNvbnN0IHQgPSBEYXRlLnBhcnNlKHZhbHVlKTtcclxuICByZXR1cm4gaXNOYU4odCkgPyBudWxsIDogdDtcclxufVxyXG5cclxuLy8gQ2Fub25pY2FsaXplIHRvICd5eXl5LW1tLWRkJyAobWF0Y2hlcyA8aW5wdXQgdHlwZT1cImRhdGVcIj4pXHJcbmZ1bmN0aW9uIHRvWU1EKHZhbHVlKSB7XG4gIGNvbnN0IHQgPSB0b1RpbWUodmFsdWUpO1xuICBpZiAodCA9PSBudWxsKSByZXR1cm4gbnVsbDtcbiAgY29uc3QgZCA9IG5ldyBEYXRlKHQpO1xuICBjb25zdCB5eXl5ID0gZC5nZXRGdWxsWWVhcigpO1xuICBjb25zdCBtbSA9IFN0cmluZyhkLmdldE1vbnRoKCkgKyAxKS5wYWRTdGFydCgyLCBcIjBcIik7XG4gIGNvbnN0IGRkID0gU3RyaW5nKGQuZ2V0RGF0ZSgpKS5wYWRTdGFydCgyLCBcIjBcIik7XG4gIHJldHVybiBgJHt5eXl5fS0ke21tfS0ke2RkfWA7XG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZVRleHQodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09IG51bGwpIHJldHVybiBcIlwiO1xuICByZXR1cm4gU3RyaW5nKHZhbHVlKS50b0xvd2VyQ2FzZSgpLnRyaW0oKTtcbn1cblxuZnVuY3Rpb24gZmllbGRNYXRjaGVzU2VsZWN0aW9uKHZhbHVlLCBzZWxlY3RlZCkge1xuICBpZiAoIXNlbGVjdGVkKSByZXR1cm4gdHJ1ZTtcbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgcmV0dXJuIHZhbHVlLnNvbWUoKGVudHJ5KSA9PiBmaWVsZE1hdGNoZXNTZWxlY3Rpb24oZW50cnksIHNlbGVjdGVkKSk7XG4gIH1cbiAgcmV0dXJuIG5vcm1hbGl6ZVRleHQodmFsdWUpID09PSBub3JtYWxpemVUZXh0KHNlbGVjdGVkKTtcbn1cblxuZnVuY3Rpb24gZ2V0TWFjaGluZUZpZWxkKGl0ZW0sIGtleSkge1xuICBpZiAoIWl0ZW0pIHJldHVybiBudWxsO1xuICBjb25zdCBsb3dlciA9IGtleS50b0xvd2VyQ2FzZSgpO1xuICByZXR1cm4gKFxuICAgIGl0ZW0/Lm1hY2hpbmVEYXRhPy5ba2V5XSA/P1xuICAgIGl0ZW0/Lm1hY2hpbmVEYXRhPy5bbG93ZXJdID8/XG4gICAgaXRlbT8uY3VycmVudE1hY2hpbmVEYXRhPy5ba2V5XSA/P1xuICAgIGl0ZW0/LmN1cnJlbnRNYWNoaW5lRGF0YT8uW2xvd2VyXSA/P1xuICAgIGl0ZW0/LnRoZU1hY2hpbmVEYXRhPy5ba2V5XSA/P1xuICAgIGl0ZW0/LnRoZU1hY2hpbmVEYXRhPy5bbG93ZXJdID8/XG4gICAgaXRlbT8uVGhlTWFjaGluZT8uW2tleV0gPz9cbiAgICBpdGVtPy5UaGVNYWNoaW5lPy5bbG93ZXJdID8/XG4gICAgbnVsbFxuICApO1xufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIE1haW5TZWFyY2goKSB7XG4gIGNvbnN0IHsgc2lnbk91dCB9ID0gdXNlQXV0aCgpO1xyXG4gIGNvbnN0IFtpbmZvLCBzZXRJbmZvXSA9IHVzZVN0YXRlKFtdKTtcclxuICBjb25zdCBbYmFja3VwSW5mbywgc2V0QmFja3VwSW5mb10gPSB1c2VTdGF0ZShbXSk7XHJcbiAgY29uc3QgW2F1Z21lbnRlZEluZm8sIHNldEF1Z21lbnRlZEluZm9dID0gdXNlU3RhdGUoW10pOyAvLyBpdGVtcyB3aXRoIGNsaWVudEZyb21JZC9jdXJyZW50SWQgYWRkZWRcclxuICBjb25zdCBbaXNMb2FkaW5nLCBzZXRJc0xvYWRpbmddID0gdXNlU3RhdGUodHJ1ZSk7XHJcbiAgY29uc3QgW2lkcywgc2V0SURdID0gdXNlU3RhdGUoW10pO1xuICBjb25zdCBbc2hvdywgc2V0U2hvd10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtzaG93RmlsdGVycywgc2V0U2hvd0ZpbHRlcnNdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbcGFnZVNpemUsIHNldFBhZ2VTaXplXSA9IHVzZVN0YXRlKERFRkFVTFRfUEFHRV9TSVpFKTtcbiAgY29uc3QgW2lzTmF2aWdhdGluZywgc2V0SXNOYXZpZ2F0aW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2RJdGVtLCBzZXRESXRlbV0gPSB1c2VTdGF0ZSgpO1xyXG4gIGNvbnN0IFtzZWxlY3QsIHNldFNlbGVjdF0gPSB1c2VTdGF0ZShcIk5hbWVcIik7XHJcbiAgY29uc3QgW3Nob3dMaXN0LCBzZXRTaG93TGlzdF0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW3Nob3dMaXN0U2VhcmNoLCBzZXRTaG93TGlzdFNlYXJjaF0gPSB1c2VTdGF0ZShcInRleHRcIik7XHJcbiAgY29uc3QgW3NlYXJjaCwgc2V0U2VhcmNoXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtzZWxlY3RlZE9FTSwgc2V0U2VsZWN0ZWRPRU1dID0gdXNlU3RhdGUobnVsbCk7XHJcbiAgY29uc3QgW3NlbGVjdGVkTW9kYWxpdHksIHNldFNlbGVjdGVkTW9kYWxpdHldID0gdXNlU3RhdGUobnVsbCk7XHJcbiAgLy8gUmVwbGFjZSB0aGUgb2xkIHNpbmdsZSBjbGllbnQgc3RhdGUgd2l0aCB0d28gc2V0czpcclxuICBjb25zdCBbc2VsZWN0ZWRDbGllbnRGcm9tLCBzZXRTZWxlY3RlZENsaWVudEZyb21dID0gdXNlU3RhdGUobnVsbCk7XHJcbiAgY29uc3QgW2NsaWVudEZyb21CdXR0b25UZXh0LCBzZXRDbGllbnRGcm9tQnV0dG9uVGV4dF0gPSB1c2VTdGF0ZShcIlNlbGVjdCBPcHRpb25cIik7XHJcbiAgY29uc3QgW3NlbGVjdGVkQ2xpZW50Q3VycmVudCwgc2V0U2VsZWN0ZWRDbGllbnRDdXJyZW50XSA9IHVzZVN0YXRlKG51bGwpO1xyXG4gIGNvbnN0IFtjbGllbnRDdXJyZW50QnV0dG9uVGV4dCwgc2V0Q2xpZW50Q3VycmVudEJ1dHRvblRleHRdID0gdXNlU3RhdGUoXCJTZWxlY3QgT3B0aW9uXCIpO1xyXG5cclxuICBjb25zdCBbY2xpZW50cywgc2V0Q2xpZW50c10gPSB1c2VTdGF0ZShbXSk7XG4gIGNvbnN0IFtzaG93Q2xpZW50TW9kYWwsIHNldFNob3dDbGllbnRNb2RhbF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIC8vIFRoaXMgc3RhdGUgdGVsbHMgdGhlIG1vZGFsIHdoaWNoIGNsaWVudCBib3ggaXMgYmVpbmcgdXBkYXRlZDogXCJmcm9tXCIgb3IgXCJjdXJyZW50XCJcbiAgY29uc3QgW2NsaWVudFNlbGVjdGlvblR5cGUsIHNldENsaWVudFNlbGVjdGlvblR5cGVdID0gdXNlU3RhdGUobnVsbCk7XG4gIGNvbnN0IFtzaG93TWFwLCBzZXRTaG93TWFwXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxyXG4gIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpO1xyXG4gIGNvbnN0IGxhYmVsQmFzZSA9IFtcIm5hbWVcIiwgXCJkYXRlXCIsIFwidy9vXCIsIFwicC9uXCIsIFwicy9uXCJdO1xyXG4gIGNvbnN0IGxhYmVsQmFzZU5hbWVzID0gW1wibmFtZVwiLCBcImRhdGVcIiwgXCJ3b1wiLCBcInBuXCIsIFwic25cIl07XHJcbiAgY29uc3Qgc29ydENoZWNrQmFzZSA9IFtmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlXTtcclxuXHJcbiAgZnVuY3Rpb24gd2l0aFNvcnRJY29uKGJhc2VMYWJlbHMsIGFjdGl2ZUluZGV4LCBpc0Rlc2MpIHtcclxuICAgIHJldHVybiBiYXNlTGFiZWxzLm1hcCgodGV4dCwgaSkgPT4ge1xyXG4gICAgICBpZiAoaSAhPT0gYWN0aXZlSW5kZXgpIHJldHVybiB0ZXh0OyAvLyB1bnRvdWNoZWRcclxuICAgICAgY29uc3QgYXJyb3cgPSBpc0Rlc2MgPyBcIiDilrxcIiA6IFwiIOKWslwiO1xyXG4gICAgICByZXR1cm4gYCR7dGV4dH0ke2Fycm93fWA7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG5cclxuICBjb25zdCBbbGFiZWxzLCBzZXRMYWJlbHNdID0gdXNlU3RhdGUobGFiZWxCYXNlKTtcclxuICBjb25zdCBbc29ydENoZWNrLCBzZXRTb3J0Q2hlY2tdID0gdXNlU3RhdGUoc29ydENoZWNrQmFzZSk7XHJcbiAgY29uc3QgW2hvdmVySW5kZXgsIHNldEhvdmVySW5kZXhdID0gdXNlU3RhdGUobnVsbCk7XHJcbiAgY29uc3QgW3NlbGVjdGVkTW9kZWwsIHNldFNlbGVjdGVkTW9kZWxdID0gdXNlU3RhdGUobnVsbCk7XHJcbiAgY29uc3QgW2dQb3MsIHNldEdQb3NdID0gdXNlU3RhdGUobnVsbCk7XG4gIGNvbnN0IFtnSWRlLCBzZXRHSWRlXSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbaXNEZWxldGluZywgc2V0SXNEZWxldGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtwYWdlLCBzZXRQYWdlXSA9IHVzZVN0YXRlKDEpO1xuICBjb25zdCBbcGFnZUN1cnNvcnMsIHNldFBhZ2VDdXJzb3JzXSA9IHVzZVN0YXRlKFtdKTtcbiAgY29uc3QgW2hhc05leHRQYWdlLCBzZXRIYXNOZXh0UGFnZV0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IGZldGNoU2VxID0gdXNlUmVmKDApO1xuICBjb25zdCBiYWNrZmlsbEluRmxpZ2h0ID0gdXNlUmVmKGZhbHNlKTtcbiAgY29uc3QgW3F1ZXJ5RXBvY2gsIHNldFF1ZXJ5RXBvY2hdID0gdXNlU3RhdGUoMCk7XG4gIGNvbnN0IFtsb2FkRXJyb3IsIHNldExvYWRFcnJvcl0gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgdGFibGVCb2R5UmVmID0gdXNlUmVmKG51bGwpO1xuICBjb25zdCByb3dIZWlnaHRSZWYgPSB1c2VSZWYoNDYpO1xuICBjb25zdCBoZWFkZXJIZWlnaHRSZWYgPSB1c2VSZWYoMzgpO1xuXG4gIGNvbnN0IExPQURfVElNRU9VVF9NUyA9IDMwMDAwO1xuICBjb25zdCBvcGVuTWFwID0gKCkgPT4gc2V0U2hvd01hcCh0cnVlKTtcblxuICBjb25zdCBoYW5kbGVNYXBWaWV3ID0gdXNlQ2FsbGJhY2soXG4gICAgKHNlbGVjdGlvbiA9IHt9KSA9PiB7XG4gICAgICBjb25zdCBwYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKCk7XG4gICAgICBjb25zdCB7XG4gICAgICAgIHJlZ2lvbixcbiAgICAgICAgc2VjdGlvbkxldHRlcixcbiAgICAgICAgc2VjdGlvbk51bWJlcixcbiAgICAgICAgcGFsbGV0LFxuICAgICAgICBiaW4sXG4gICAgICB9ID0gc2VsZWN0aW9uO1xuXG4gICAgICBpZiAocmVnaW9uKSBwYXJhbXMuc2V0KFwicmVnaW9uXCIsIHJlZ2lvbik7XG4gICAgICBpZiAoc2VjdGlvbkxldHRlcikgcGFyYW1zLnNldChcInNlY3Rpb25MZXR0ZXJcIiwgc2VjdGlvbkxldHRlcik7XG4gICAgICBpZiAoc2VjdGlvbk51bWJlcikgcGFyYW1zLnNldChcInNlY3Rpb25OdW1iZXJcIiwgc2VjdGlvbk51bWJlcik7XG4gICAgICBpZiAocGFsbGV0KSBwYXJhbXMuc2V0KFwicGFsbGV0XCIsIHBhbGxldCk7XG4gICAgICBpZiAoYmluKSBwYXJhbXMuc2V0KFwiYmluXCIsIGJpbik7XG5cbiAgICAgIGNvbnN0IHF1ZXJ5ID0gcGFyYW1zLnRvU3RyaW5nKCk7XG4gICAgICByb3V0ZXIucHVzaChcbiAgICAgICAgYC9OZXdTZWFyY2gvaW52ZW50b3J5L2ludmVudG9yeU1hbmFnZSR7cXVlcnkgPyBgPyR7cXVlcnl9YCA6IFwiXCJ9YFxuICAgICAgKTtcbiAgICAgIHNldFNob3dNYXAoZmFsc2UpO1xuICAgIH0sXG4gICAgW3JvdXRlcl1cbiAgKTtcblxuICBjb25zdCBzdGFydE5hbWVUb2tlbkJhY2tmaWxsID0gdXNlQ2FsbGJhY2soYXN5bmMgKHJlYXNvbiA9IFwiXCIpID0+IHtcbiAgICBpZiAoYmFja2ZpbGxJbkZsaWdodC5jdXJyZW50KSByZXR1cm47XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIGNvbnN0IGxhc3RSdW4gPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJuYW1lVG9rZW5zQmFja2ZpbGxBdFwiKTtcbiAgICAgIGlmIChsYXN0UnVuICYmIERhdGUubm93KCkgLSBOdW1iZXIobGFzdFJ1bikgPCAyNCAqIDYwICogNjAgKiAxMDAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBiYWNrZmlsbEluRmxpZ2h0LmN1cnJlbnQgPSB0cnVlO1xuICAgIGNvbnN0IGRiID0gZmlyZWJhc2UuZmlyZXN0b3JlKCk7XG4gICAgbGV0IGxhc3REb2MgPSBudWxsO1xuXG4gICAgY29uc3QgdG9rZW5zRXF1YWwgPSAoYSwgYikgPT4ge1xuICAgICAgaWYgKGEubGVuZ3RoICE9PSBiLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuICAgICAgY29uc3Qgc2V0QSA9IG5ldyBTZXQoYSk7XG4gICAgICBjb25zdCBzZXRCID0gbmV3IFNldChiKTtcbiAgICAgIGlmIChzZXRBLnNpemUgIT09IHNldEIuc2l6ZSkgcmV0dXJuIGZhbHNlO1xuICAgICAgZm9yIChjb25zdCB2IG9mIHNldEEpIGlmICghc2V0Qi5oYXModikpIHJldHVybiBmYWxzZTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG5cbiAgICB0cnkge1xuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgbGV0IHF1ZXJ5ID0gZGJcbiAgICAgICAgICAuY29sbGVjdGlvbihcIlRlc3RcIilcbiAgICAgICAgICAub3JkZXJCeShmaXJlYmFzZS5maXJlc3RvcmUuRmllbGRQYXRoLmRvY3VtZW50SWQoKSlcbiAgICAgICAgICAubGltaXQoMjAwKTtcbiAgICAgICAgaWYgKGxhc3REb2MpIHF1ZXJ5ID0gcXVlcnkuc3RhcnRBZnRlcihsYXN0RG9jKTtcblxuICAgICAgICBjb25zdCBzbmFwID0gYXdhaXQgcXVlcnkuZ2V0KCk7XG4gICAgICAgIGlmIChzbmFwLmVtcHR5KSBicmVhaztcblxuICAgICAgICBjb25zdCBiYXRjaCA9IGRiLmJhdGNoKCk7XG4gICAgICAgIGxldCB3cml0ZXMgPSAwO1xuXG4gICAgICAgIHNuYXAuZG9jcy5mb3JFYWNoKChkb2MpID0+IHtcbiAgICAgICAgICBjb25zdCBkYXRhID0gZG9jLmRhdGEoKSB8fCB7fTtcbiAgICAgICAgICBjb25zdCBuYW1lID0gdHlwZW9mIGRhdGEubmFtZSA9PT0gXCJzdHJpbmdcIiA/IGRhdGEubmFtZSA6IFwiXCI7XG4gICAgICAgICAgY29uc3QgbmFtZUxvd2VyID0gbmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgIGNvbnN0IG5hbWVUb2tlbnMgPSBidWlsZE5hbWVUb2tlbnMobmFtZSk7XG4gICAgICAgICAgY29uc3QgZXhpc3RpbmdUb2tlbnMgPSBBcnJheS5pc0FycmF5KGRhdGEubmFtZVRva2VucylcbiAgICAgICAgICAgID8gQXJyYXkuZnJvbShuZXcgU2V0KGRhdGEubmFtZVRva2Vucy5tYXAoKHYpID0+IFN0cmluZyh2KSkpKVxuICAgICAgICAgICAgOiBbXTtcblxuICAgICAgICAgIGNvbnN0IG5lZWRzVXBkYXRlID1cbiAgICAgICAgICAgIGRhdGEubmFtZUxvd2VyICE9PSBuYW1lTG93ZXIgfHxcbiAgICAgICAgICAgICF0b2tlbnNFcXVhbChleGlzdGluZ1Rva2VucywgbmFtZVRva2Vucyk7XG5cbiAgICAgICAgICBpZiAobmVlZHNVcGRhdGUpIHtcbiAgICAgICAgICAgIGJhdGNoLnVwZGF0ZShkb2MucmVmLCB7IG5hbWVMb3dlciwgbmFtZVRva2VucyB9KTtcbiAgICAgICAgICAgIHdyaXRlcyArPSAxO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHdyaXRlcyA+IDApIHtcbiAgICAgICAgICBhd2FpdCBiYXRjaC5jb21taXQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxhc3REb2MgPSBzbmFwLmRvY3Nbc25hcC5kb2NzLmxlbmd0aCAtIDFdO1xuICAgICAgICBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gc2V0VGltZW91dChyZXNvbHZlLCAyNSkpO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oXG4gICAgICAgICAgXCJuYW1lVG9rZW5zQmFja2ZpbGxBdFwiLFxuICAgICAgICAgIFN0cmluZyhEYXRlLm5vdygpKVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiTmFtZSB0b2tlbiBiYWNrZmlsbCBmYWlsZWQ6XCIsIHJlYXNvbiwgZXJyb3IpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBiYWNrZmlsbEluRmxpZ2h0LmN1cnJlbnQgPSBmYWxzZTtcbiAgICB9XG4gIH0sIFtdKTtcblxuICBjb25zdCBzZWFyY2hMb3dlciA9IChzZWFyY2ggfHwgXCJcIikudG9Mb3dlckNhc2UoKS50cmltKCk7XG4gIGNvbnN0IGhhc0FjdGl2ZUZpbHRlcnMgPVxuICAgIEJvb2xlYW4oc2VsZWN0ZWRPRU0pIHx8XG4gICAgQm9vbGVhbihzZWxlY3RlZE1vZGFsaXR5KSB8fFxuICAgIEJvb2xlYW4oc2VsZWN0ZWRNb2RlbCkgfHxcbiAgICBCb29sZWFuKHNlbGVjdGVkQ2xpZW50RnJvbSkgfHxcbiAgICBCb29sZWFuKHNlbGVjdGVkQ2xpZW50Q3VycmVudCkgfHxcbiAgICBCb29sZWFuKHNlYXJjaExvd2VyKTtcblxuICBjb25zdCB2YWx1ZU1hdGNoZXMgPSAodmFsdWUsIHMpID0+IHtcbiAgICBpZiAoIXZhbHVlKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICByZXR1cm4gdmFsdWUuc29tZSgodikgPT4gdmFsdWVNYXRjaGVzKHYsIHMpKTtcbiAgICB9XG4gICAgcmV0dXJuIFN0cmluZyh2YWx1ZSkudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhzKTtcbiAgfTtcblxuICBjb25zdCBtYXRjaGVzRmlsdGVycyA9IHVzZUNhbGxiYWNrKFxuICAgIChpdGVtKSA9PiB7XG4gICAgICAvLyBoaWRlIGV4cGxpY2l0bHkgaGlkZGVuIGl0ZW1zXG4gICAgICBpZiAoaXRlbT8udmlzaWJsZSA9PT0gZmFsc2UpIHJldHVybiBmYWxzZTtcblxuICAgICAgLy8gT0VNIC8gTW9kYWxpdHkgLyBNb2RlbCBmaWx0ZXJpbmdcbiAgICAgIGNvbnN0IE9FTSA9IGdldE1hY2hpbmVGaWVsZChpdGVtLCBcIk9FTVwiKTtcbiAgICAgIGNvbnN0IE1vZGFsaXR5ID0gZ2V0TWFjaGluZUZpZWxkKGl0ZW0sIFwiTW9kYWxpdHlcIik7XG4gICAgICBjb25zdCBNb2RlbCA9IGdldE1hY2hpbmVGaWVsZChpdGVtLCBcIk1vZGVsXCIpO1xuXG4gICAgICBpZiAoIWZpZWxkTWF0Y2hlc1NlbGVjdGlvbihPRU0sIHNlbGVjdGVkT0VNKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoXG4gICAgICAgICFmaWVsZE1hdGNoZXNTZWxlY3Rpb24oTW9kYWxpdHksIHNlbGVjdGVkTW9kYWxpdHkpXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKCFmaWVsZE1hdGNoZXNTZWxlY3Rpb24oTW9kZWwsIHNlbGVjdGVkTW9kZWwpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgLy8gQ2xpZW50IGZpbHRlcnNcbiAgICAgIGlmIChzZWxlY3RlZENsaWVudEZyb20gJiYgaXRlbT8uY2xpZW50RnJvbUlkICE9PSBzZWxlY3RlZENsaWVudEZyb20pIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKFxuICAgICAgICBzZWxlY3RlZENsaWVudEN1cnJlbnQgJiZcbiAgICAgICAgaXRlbT8uY2xpZW50Q3VycmVudElkICE9PSBzZWxlY3RlZENsaWVudEN1cnJlbnRcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIC8vIFNlYXJjaFxuICAgICAgaWYgKHNlYXJjaExvd2VyKSB7XG4gICAgICAgIGlmIChzZWxlY3QgPT09IFwiTmFtZVwiKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlTWF0Y2hlcyhpdGVtPy5uYW1lLCBzZWFyY2hMb3dlcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNlbGVjdCA9PT0gXCJEYXRlXCIpIHtcbiAgICAgICAgICBjb25zdCB3YW50ZWREYXkgPSBzZWFyY2hMb3dlcjsgLy8geXl5eS1tbS1kZCBmcm9tIGlucHV0XG4gICAgICAgICAgY29uc3QgaXRlbVlNRCA9IHRvWU1EKGl0ZW0/LmRhdGUpO1xuICAgICAgICAgIGlmIChpdGVtWU1EICYmIGl0ZW1ZTUQgPT09IHdhbnRlZERheSkgcmV0dXJuIHRydWU7XG4gICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoaXRlbT8uZGVzY3JpcHRpb25zKSkge1xuICAgICAgICAgICAgaWYgKGl0ZW0uZGVzY3JpcHRpb25zLnNvbWUoKGQpID0+IHRvWU1EKGQ/LmRhdGUpID09PSB3YW50ZWREYXkpKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShpdGVtPy53b3JrT3JkZXJzKSkge1xuICAgICAgICAgICAgaWYgKGl0ZW0ud29ya09yZGVycy5zb21lKCh3KSA9PiB0b1lNRCh3Py5kYXRlKSA9PT0gd2FudGVkRGF5KSkge1xuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzZWxlY3QgPT09IFwiV29yayBPcmRlclwiKSB7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIEFycmF5LmlzQXJyYXkoaXRlbT8ud29ya09yZGVycykgJiZcbiAgICAgICAgICAgIGl0ZW0ud29ya09yZGVycy5zb21lKCh3bykgPT5cbiAgICAgICAgICAgICAgdmFsdWVNYXRjaGVzKHdvPy53b3JrT3JkZXIsIHNlYXJjaExvd2VyKVxuICAgICAgICAgICAgKVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNlbGVjdCA9PT0gXCJQcm9kdWN0IE51bWJlclwiKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlTWF0Y2hlcyhpdGVtPy5wbiwgc2VhcmNoTG93ZXIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzZWxlY3QgPT09IFwiU2VyaWFsIE51bWJlclwiKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlTWF0Y2hlcyhpdGVtPy5zbiwgc2VhcmNoTG93ZXIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzZWxlY3QgPT09IFwiRGVzY3JpcHRpb25cIikge1xuICAgICAgICAgIGlmICh2YWx1ZU1hdGNoZXMoaXRlbT8uZGVzYywgc2VhcmNoTG93ZXIpKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICBpZiAodmFsdWVNYXRjaGVzKGl0ZW0/LmRlc2NyaXB0aW9uLCBzZWFyY2hMb3dlcikpIHJldHVybiB0cnVlO1xuICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGl0ZW0/LmRlc2NyaXB0aW9ucykpIHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtLmRlc2NyaXB0aW9ucy5zb21lKChkKSA9PlxuICAgICAgICAgICAgICB2YWx1ZU1hdGNoZXMoZD8uZGVzY3JpcHRpb24sIHNlYXJjaExvd2VyKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzZWxlY3QgPT09IFwiU0tVXCIpIHtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgdmFsdWVNYXRjaGVzKGl0ZW0/LmlkLCBzZWFyY2hMb3dlcikgfHxcbiAgICAgICAgICAgIHZhbHVlTWF0Y2hlcyhpdGVtPy5sb2NhbFNOLCBzZWFyY2hMb3dlcikgfHxcbiAgICAgICAgICAgIHZhbHVlTWF0Y2hlcyhpdGVtPy5sb2NhbF9zbiwgc2VhcmNoTG93ZXIpXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuICAgIFtcbiAgICAgIHNlbGVjdGVkT0VNLFxuICAgICAgc2VsZWN0ZWRNb2RhbGl0eSxcbiAgICAgIHNlbGVjdGVkTW9kZWwsXG4gICAgICBzZWxlY3RlZENsaWVudEZyb20sXG4gICAgICBzZWxlY3RlZENsaWVudEN1cnJlbnQsXG4gICAgICBzZWFyY2hMb3dlcixcbiAgICAgIHNlbGVjdCxcbiAgICBdXG4gICk7XG5cbiAgY29uc3QgcmVzZXRQYWdpbmF0aW9uID0gKCkgPT4ge1xuICAgIHNldFBhZ2UoMSk7XG4gICAgc2V0UGFnZUN1cnNvcnMoW10pO1xuICAgIHNldEhhc05leHRQYWdlKGZhbHNlKTtcbiAgfTtcblxuICAvLyBSZXNldCBwYWdpbmF0aW9uIG9uIHJvdXRlL3F1ZXJ5IGNoYW5nZSAocHJldmVudHMgc3RhbGUgcGFnZXMgbGlrZSDigJxzdGFydGluZyBhdCA24oCdKVxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHJlc2V0UGFnaW5hdGlvbigpO1xuICAgIHNldFF1ZXJ5RXBvY2goKHYpID0+IHYgKyAxKTtcbiAgfSwgW3JvdXRlci5hc1BhdGhdKTtcblxuICAvLyBSZXNldCBhbmQgcmVmZXRjaCB3aGVuIGZpbHRlcnMvc2VhcmNoIGNoYW5nZVxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHJlc2V0UGFnaW5hdGlvbigpO1xuICAgIHNldFF1ZXJ5RXBvY2goKHYpID0+IHYgKyAxKTtcbiAgfSwgW1xuICAgIHNlbGVjdGVkT0VNLFxuICAgIHNlbGVjdGVkTW9kYWxpdHksXG4gICAgc2VsZWN0ZWRNb2RlbCxcbiAgICBzZWxlY3RlZENsaWVudEZyb20sXG4gICAgc2VsZWN0ZWRDbGllbnRDdXJyZW50LFxuICAgIHNlYXJjaCxcbiAgICBzZWxlY3QsXG4gIF0pO1xuXG5cbiAgLy8gRmV0Y2ggZGF0YSBvbiBjb21wb25lbnQgbW91bnQgYW5kIHJvdXRlIGNoYW5nZVxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGZldGNoRGF0YShwYWdlKTtcbiAgfSwgW3BhZ2UsIHF1ZXJ5RXBvY2hdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghcm91dGVyPy5ldmVudHMpIHJldHVybjtcbiAgICBjb25zdCBoYW5kbGVEb25lID0gKCkgPT4gc2V0SXNOYXZpZ2F0aW5nKGZhbHNlKTtcbiAgICByb3V0ZXIuZXZlbnRzLm9uKFwicm91dGVDaGFuZ2VDb21wbGV0ZVwiLCBoYW5kbGVEb25lKTtcbiAgICByb3V0ZXIuZXZlbnRzLm9uKFwicm91dGVDaGFuZ2VFcnJvclwiLCBoYW5kbGVEb25lKTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgcm91dGVyLmV2ZW50cy5vZmYoXCJyb3V0ZUNoYW5nZUNvbXBsZXRlXCIsIGhhbmRsZURvbmUpO1xuICAgICAgcm91dGVyLmV2ZW50cy5vZmYoXCJyb3V0ZUNoYW5nZUVycm9yXCIsIGhhbmRsZURvbmUpO1xuICAgIH07XG4gIH0sIFtyb3V0ZXJdKTtcblxuICBhc3luYyBmdW5jdGlvbiBmZXRjaERhdGEocmVxdWVzdGVkUGFnZSA9IDEpIHtcbiAgICBjb25zdCBzZXEgPSArK2ZldGNoU2VxLmN1cnJlbnQ7XG4gICAgbGV0IHRpbWVkT3V0ID0gZmFsc2U7XG4gICAgc2V0SXNMb2FkaW5nKHRydWUpO1xuICAgIHNldExvYWRFcnJvcihudWxsKTtcbiAgICBjb25zdCB0aW1lb3V0SWQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRpbWVkT3V0ID0gdHJ1ZTtcbiAgICAgIGlmIChzZXEgPT09IGZldGNoU2VxLmN1cnJlbnQpIHtcbiAgICAgICAgc2V0TG9hZEVycm9yKHtcbiAgICAgICAgICBjb2RlOiBcInRpbWVvdXRcIixcbiAgICAgICAgICBtZXNzYWdlOiBgTG9hZGluZyBpcyB0YWtpbmcgbG9uZ2VyIHRoYW4gJHtNYXRoLnJvdW5kKFxuICAgICAgICAgICAgTE9BRF9USU1FT1VUX01TIC8gMTAwMFxuICAgICAgICAgICl9cy4gVGhpcyBpcyBsaWtlbHkgZHVlIHRvIHZlcnkgc2VsZWN0aXZlIGZpbHRlcnMuYCxcbiAgICAgICAgfSk7XG4gICAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XG4gICAgICB9XG4gICAgfSwgTE9BRF9USU1FT1VUX01TKTtcbiAgICB0cnkge1xuICAgICAgaWYgKHJvdXRlci5xdWVyeS5pbnB1dFRleHQgJiYgcm91dGVyLnF1ZXJ5LnNlbGVjdGVkVHlwZSkge1xuICAgICAgICBzZXRTZWxlY3Qocm91dGVyLnF1ZXJ5LnNlbGVjdGVkVHlwZSk7XG4gICAgICAgIHNldFNlYXJjaChyb3V0ZXIucXVlcnkuaW5wdXRUZXh0KTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHN0YXJ0QWZ0ZXJEb2MgPVxuICAgICAgICByZXF1ZXN0ZWRQYWdlID4gMSA/IHBhZ2VDdXJzb3JzW3JlcXVlc3RlZFBhZ2UgLSAyXSA6IG51bGw7XG4gICAgICBpZiAocmVxdWVzdGVkUGFnZSA+IDEgJiYgIXN0YXJ0QWZ0ZXJEb2MpIHtcbiAgICAgICAgc2V0UGFnZSgxKTtcbiAgICAgICAgaWYgKHNlcSA9PT0gZmV0Y2hTZXEuY3VycmVudCkge1xuICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0SWQpO1xuICAgICAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3QgZWZmZWN0aXZlU2VsZWN0ID0gcm91dGVyLnF1ZXJ5LnNlbGVjdGVkVHlwZSB8fCBzZWxlY3Q7XG4gICAgICBjb25zdCBlZmZlY3RpdmVTZWFyY2ggPSByb3V0ZXIucXVlcnkuaW5wdXRUZXh0IHx8IHNlYXJjaDtcbiAgICAgIGNvbnN0IGVmZmVjdGl2ZVNlYXJjaExvd2VyID0gKGVmZmVjdGl2ZVNlYXJjaCB8fCBcIlwiKVxuICAgICAgICAudG9Mb3dlckNhc2UoKVxuICAgICAgICAudHJpbSgpO1xuXG4gICAgICAvLyBsaWdodCByZXRyeSBmb3IgdHJhbnNpZW50IEZpcmVzdG9yZSBoaWNjdXBzXG4gICAgICBjb25zdCBsb2FkID0gYXN5bmMgKGF0dGVtcHQgPSAxKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmV0dXJuIGF3YWl0IGZldGNoUGFydHNXaXRoTWFjaGluZURhdGFQYWdlKHtcbiAgICAgICAgICAgIHBhZ2VTaXplLFxuICAgICAgICAgICAgc3RhcnRBZnRlckRvYyxcbiAgICAgICAgICAgIHZpc2libGVPbmx5OiB0cnVlLFxuICAgICAgICAgICAgZmlsdGVyRm46IGhhc0FjdGl2ZUZpbHRlcnMgPyBtYXRjaGVzRmlsdGVycyA6IG51bGwsXG4gICAgICAgICAgICBzZWFyY2g6IGVmZmVjdGl2ZVNlYXJjaExvd2VyXG4gICAgICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAgICAgdHlwZTogZWZmZWN0aXZlU2VsZWN0LFxuICAgICAgICAgICAgICAgICAgcmF3OiBlZmZlY3RpdmVTZWFyY2gsXG4gICAgICAgICAgICAgICAgICBsb3dlcjogZWZmZWN0aXZlU2VhcmNoTG93ZXIsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICA6IG51bGwsXG4gICAgICAgICAgICBuZWVkc01hY2hpbmVEYXRhOlxuICAgICAgICAgICAgICBCb29sZWFuKHNlbGVjdGVkT0VNKSB8fFxuICAgICAgICAgICAgICBCb29sZWFuKHNlbGVjdGVkTW9kYWxpdHkpIHx8XG4gICAgICAgICAgICAgIEJvb2xlYW4oc2VsZWN0ZWRNb2RlbCkgfHxcbiAgICAgICAgICAgICAgQm9vbGVhbihzZWxlY3RlZENsaWVudEZyb20pIHx8XG4gICAgICAgICAgICAgIEJvb2xlYW4oc2VsZWN0ZWRDbGllbnRDdXJyZW50KSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIGlmIChhdHRlbXB0ID49IDMpIHRocm93IGU7XG4gICAgICAgICAgYXdhaXQgbmV3IFByb21pc2UociA9PiBzZXRUaW1lb3V0KHIsIDI1MCAqIE1hdGgucG93KDIsIGF0dGVtcHQgLSAxKSkpO1xuICAgICAgICAgIHJldHVybiBsb2FkKGF0dGVtcHQgKyAxKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIGNvbnN0IHsgcGFydHM6IGRhdGEsIGxhc3REb2MsIGhhc05leHRQYWdlOiBuZXh0UGFnZSB9ID0gYXdhaXQgbG9hZCgpO1xuICAgICAgaWYgKHRpbWVkT3V0IHx8IHNlcSAhPT0gZmV0Y2hTZXEuY3VycmVudCkgcmV0dXJuO1xuICAgICAgY29uc3QgaGFzTmFtZVNlYXJjaCA9XG4gICAgICAgIEJvb2xlYW4oZWZmZWN0aXZlU2VhcmNoTG93ZXIpICYmIGVmZmVjdGl2ZVNlbGVjdCA9PT0gXCJOYW1lXCI7XG4gICAgICBpZiAoXG4gICAgICAgIGhhc05hbWVTZWFyY2ggJiZcbiAgICAgICAgKGRhdGEubGVuZ3RoID09PSAwIHx8XG4gICAgICAgICAgZGF0YS5zb21lKFxuICAgICAgICAgICAgKGl0ZW0pID0+XG4gICAgICAgICAgICAgICFBcnJheS5pc0FycmF5KGl0ZW0/Lm5hbWVUb2tlbnMpIHx8IGl0ZW0ubmFtZVRva2Vucy5sZW5ndGggPT09IDBcbiAgICAgICAgICApKVxuICAgICAgKSB7XG4gICAgICAgIHN0YXJ0TmFtZVRva2VuQmFja2ZpbGwoXCJuYW1lLXNlYXJjaFwiKTtcbiAgICAgIH1cbiAgICAgIGlmIChyZXF1ZXN0ZWRQYWdlID09PSAxICYmIGRhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHNldFBhZ2VDdXJzb3JzKFtdKTtcbiAgICAgICAgc2V0SGFzTmV4dFBhZ2UoZmFsc2UpO1xuICAgICAgfVxuICAgICAgc2V0QmFja3VwSW5mbyhkYXRhKTtcbiAgICAgIHNldExhYmVscyhsYWJlbEJhc2UpOyAvLyA8LS0gYWRkIHRoaXMgbGluZSBhZnRlciBzZXRCYWNrdXBJbmZvKGRhdGEpXG4gICAgICBzZXRJRChkYXRhLm1hcCgoaXRlbSkgPT4gaXRlbS5pZCkpO1xuICAgICAgaWYgKHJlcXVlc3RlZFBhZ2UgPiAxICYmIGRhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHNldEhhc05leHRQYWdlKGZhbHNlKTtcbiAgICAgICAgc2V0UGFnZSgxKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgc2V0SGFzTmV4dFBhZ2UobmV4dFBhZ2UpO1xuICAgICAgc2V0UGFnZUN1cnNvcnMoKHByZXYpID0+IHtcbiAgICAgICAgY29uc3QgbmV4dCA9IHJlcXVlc3RlZFBhZ2UgPT09IDEgPyBbXSA6IFsuLi5wcmV2XTtcbiAgICAgICAgaWYgKGxhc3REb2MpIHtcbiAgICAgICAgICBuZXh0W3JlcXVlc3RlZFBhZ2UgLSAxXSA9IGxhc3REb2M7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICB9KTtcbiAgICAgIHNldFNlbGVjdGVkSXRlbXMoW10pO1xuXG4gICAgICAvLyBOb3JtYWxpemUgY2xpZW50IGlkcyBmb3IgZmlsdGVyaW5nXG4gICAgICBjb25zdCBhdWdtZW50ZWQgPSBkYXRhLm1hcCgoaXRlbSkgPT4gKHtcbiAgICAgICAgLi4uaXRlbSxcbiAgICAgICAgY2xpZW50RnJvbUlkOlxuICAgICAgICAgIGl0ZW0/LmNsaWVudEZyb21JZCA/P1xuICAgICAgICAgICh0eXBlb2YgaXRlbT8uQ2xpZW50RnJvbSA9PT0gXCJzdHJpbmdcIiA/IGl0ZW0uQ2xpZW50RnJvbSA6IG51bGwpID8/XG4gICAgICAgICAgaXRlbT8uQ2xpZW50RnJvbT8uaWQgPz9cbiAgICAgICAgICBudWxsLFxuICAgICAgICBjbGllbnRDdXJyZW50SWQ6XG4gICAgICAgICAgaXRlbT8uY2xpZW50Q3VycmVudElkID8/XG4gICAgICAgICAgKHR5cGVvZiBpdGVtPy5DbGllbnRDdXJyZW50ID09PSBcInN0cmluZ1wiID8gaXRlbS5DbGllbnRDdXJyZW50IDogbnVsbCkgPz9cbiAgICAgICAgICBpdGVtPy5DbGllbnRDdXJyZW50Py5pZCA/P1xuICAgICAgICAgIG51bGwsXG4gICAgICB9KSk7XG5cclxuICAgICAgc2V0QXVnbWVudGVkSW5mbyhhdWdtZW50ZWQpO1xuICAgICAgLy8gZGVmYXVsdCB2aWV3ID0gZmlsdGVyZWQgKGtlZXBzIHBhZ2luYXRpb24gYW5kIGZpbHRlcnMgY29uc2lzdGVudClcbiAgICAgIHNldEluZm8oYXVnbWVudGVkLmZpbHRlcihtYXRjaGVzRmlsdGVycykpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgaWYgKHNlcSAhPT0gZmV0Y2hTZXEuY3VycmVudCkgcmV0dXJuO1xuICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGZldGNoaW5nIGRhdGE6XCIsIGVycik7XG4gICAgICBjb25zdCBjb2RlID0gZXJyPy5jb2RlIHx8IFwidW5rbm93blwiO1xuICAgICAgc2V0TG9hZEVycm9yKHtcbiAgICAgICAgY29kZSxcbiAgICAgICAgbWVzc2FnZTogZXJyPy5tZXNzYWdlIHx8IFwiRmFpbGVkIHRvIGxvYWQgaXRlbXMuXCIsXG4gICAgICB9KTtcbiAgICAgIHNldEluZm8oW10pO1xuICAgICAgc2V0QXVnbWVudGVkSW5mbyhbXSk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0SWQpO1xuICAgICAgaWYgKHNlcSA9PT0gZmV0Y2hTZXEuY3VycmVudCAmJiAhdGltZWRPdXQpIHNldElzTG9hZGluZyhmYWxzZSk7XG4gICAgfVxuICB9XG5cclxuICBjb25zdCBzZWFyY2hDaGFuZ2VIYW5kbGVyID0gKGV2ZW50KSA9PiBzZXRTZWFyY2goZXZlbnQudGFyZ2V0LnZhbHVlKTtcclxuXHJcbiAgLy8gRmlsdGVyIHRoZSBjdXJyZW50bHkgbG9hZGVkIGl0ZW1zIChub3cgY29uc2lzdGVudCB3aXRoIHBhZ2VkIGZpbHRlcmluZylcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBiYXNlID0gYXVnbWVudGVkSW5mbyB8fCBbXTtcbiAgICBzZXRJbmZvKGJhc2UuZmlsdGVyKG1hdGNoZXNGaWx0ZXJzKSk7XG4gIH0sIFthdWdtZW50ZWRJbmZvLCBtYXRjaGVzRmlsdGVyc10pO1xuXHJcbiAgZnVuY3Rpb24gc29ydENoZWNrQWxsKHBvcykge1xyXG4gICAgLy8gRGV0ZXJtaW5lIG5leHQgZGlyZWN0aW9uOiB0b2dnbGUgdGhlIGNsaWNrZWQgY29sdW1uIG9ubHlcclxuICAgIGNvbnN0IG5leHRTb3J0Q2hlY2sgPSBzb3J0Q2hlY2subWFwKCh2LCBpKSA9PiAoaSA9PT0gcG9zID8gIXYgOiB2KSk7XHJcbiAgICBjb25zdCBpc0Rlc2MgPSBuZXh0U29ydENoZWNrW3Bvc107IC8vIHRydWUgbWVhbnMgZGVzY2VuZGluZ1xyXG5cclxuICAgIGNvbnN0IHNvcnRlZEluZm8gPSBbLi4uaW5mb10uc29ydCgoYSwgYikgPT4ge1xyXG4gICAgICBjb25zdCBrZXkgPSBsYWJlbEJhc2VOYW1lc1twb3NdO1xyXG5cclxuICAgICAgaWYgKHBvcyA9PT0gMSkge1xyXG4gICAgICAgIC8vIERBVEUgY29sdW1uXHJcbiAgICAgICAgY29uc3QgdGEgPSB0b1RpbWUoYVtrZXldKTtcclxuICAgICAgICBjb25zdCB0YiA9IHRvVGltZShiW2tleV0pO1xyXG5cclxuICAgICAgICAvLyBQdXQgbWlzc2luZyBkYXRlcyBhdCB0aGUgZW5kIGZvciBhc2NlbmRpbmcsIGF0IHRoZSBzdGFydCBmb3IgZGVzY2VuZGluZ1xyXG4gICAgICAgIGlmICh0YSA9PT0gbnVsbCAmJiB0YiA9PT0gbnVsbCkgcmV0dXJuIDA7XHJcbiAgICAgICAgaWYgKHRhID09PSBudWxsKSByZXR1cm4gaXNEZXNjID8gLTEgOiAxO1xyXG4gICAgICAgIGlmICh0YiA9PT0gbnVsbCkgcmV0dXJuIGlzRGVzYyA/IDEgOiAtMTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGlzRGVzYyA/ICh0YiAtIHRhKSA6ICh0YSAtIHRiKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gTkFNRSBvciBTS1UgKHN0cmluZy15IGNvbHVtbnMpOiBpbmRleGVzIDAgb3IgNSBpbiB5b3VyIG9yaWdpbmFsIGxvZ2ljXHJcbiAgICAgIGlmIChwb3MgPT09IDAgfHwgcG9zID09PSA1KSB7XHJcbiAgICAgICAgY29uc3QgYXYgPSAoYVtrZXldID8/IFwiXCIpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgY29uc3QgYnYgPSAoYltrZXldID8/IFwiXCIpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgcmV0dXJuIGlzRGVzYyA/IGJ2LmxvY2FsZUNvbXBhcmUoYXYpIDogYXYubG9jYWxlQ29tcGFyZShidik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIE51bWVyaWMtaXNoIGNvbHVtbnMgKHdvLCBwbiwgc24pIOKAlCBmYWxsIGJhY2sgdG8gc3RyaW5nIGNvbXBhcmUgaWYgTmFOXHJcbiAgICAgIGNvbnN0IGFuID0gTnVtYmVyKGFba2V5XSk7XHJcbiAgICAgIGNvbnN0IGJuID0gTnVtYmVyKGJba2V5XSk7XHJcblxyXG4gICAgICBpZiAoIWlzTmFOKGFuKSAmJiAhaXNOYU4oYm4pKSB7XHJcbiAgICAgICAgcmV0dXJuIGlzRGVzYyA/IChibiAtIGFuKSA6IChhbiAtIGJuKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zdCBhdiA9IChhW2tleV0gPz8gXCJcIikudG9TdHJpbmcoKTtcclxuICAgICAgICBjb25zdCBidiA9IChiW2tleV0gPz8gXCJcIikudG9TdHJpbmcoKTtcclxuICAgICAgICByZXR1cm4gaXNEZXNjID8gYnYubG9jYWxlQ29tcGFyZShhdikgOiBhdi5sb2NhbGVDb21wYXJlKGJ2KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgc2V0SW5mbyhzb3J0ZWRJbmZvKTtcclxuICAgIHNldFNvcnRDaGVjayhuZXh0U29ydENoZWNrKTtcclxuXHJcbiAgICAvLyBVcGRhdGUgaGVhZGVyIGxhYmVscyB0byBzaG93IHRoZSBsaXR0bGUgYXJyb3cgb24gdGhlIGFjdGl2ZSBjb2x1bW5cclxuICAgIHNldExhYmVscyh3aXRoU29ydEljb24obGFiZWxCYXNlLCBwb3MsIGlzRGVzYykpO1xyXG4gIH1cclxuXHJcblxyXG4gIGNvbnN0IHJvd1NlbGVjdCA9IChpdGVtKSA9PiB7XHJcbiAgICBpZiAoaXRlbSAmJiBpdGVtLmlkKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiU2VsZWN0ZWQgaXRlbTpcIiwgaXRlbSk7XG4gICAgICBzZXRJc05hdmlnYXRpbmcodHJ1ZSk7XG4gICAgICByb3V0ZXIucHVzaChcIi4vaXRlbS9cIiArIGl0ZW0uaWQpO1xuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJVbmFibGUgdG8gZGV0ZXJtaW5lIHRoZSBzZWxlY3RlZCBpdGVt4oCZcyBJRDogXCIsIGl0ZW0pO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGNvbnN0IFtzZWxlY3RlZEl0ZW1zLCBzZXRTZWxlY3RlZEl0ZW1zXSA9IHVzZVN0YXRlKFtdKTtcclxuICBjb25zdCBbc2hvd0RlbGV0ZU1vZGFsLCBzZXRTaG93RGVsZXRlTW9kYWxdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG5cclxuICBjb25zdCBoYW5kbGVTZWxlY3RJdGVtID0gKGlkKSA9PiB7XHJcbiAgICBzZXRTZWxlY3RlZEl0ZW1zKHByZXYgPT5cclxuICAgICAgcHJldi5pbmNsdWRlcyhpZCkgPyBwcmV2LmZpbHRlcih4ID0+IHggIT09IGlkKSA6IFsuLi5wcmV2LCBpZF1cclxuICAgICk7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8vIHNldFNlbGVjdGVkSXRlbXMoKHByZXYpID0+IHtcclxuICAvLyAgIGNvbnN0IG5ld1NlbGVjdGlvbiA9IHByZXYuaW5jbHVkZXMoaWQpXHJcbiAgLy8gICAgID8gcHJldi5maWx0ZXIoKGl0ZW1JZCkgPT4gaXRlbUlkICE9PSBpZClcclxuICAvLyAgICAgOiBbLi4ucHJldiwgaWRdO1xyXG4gIC8vICAgY29uc29sZS5sb2coXCJTZWxlY3RlZCBpdGVtczpcIiwgbmV3U2VsZWN0aW9uKTtcclxuICAvLyAgIHJldHVybiBuZXdTZWxlY3Rpb247IC8vIDwtIGltcG9ydGFudFxyXG4gIC8vIH0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVTaG93RGVsZXRlTW9kYWwgPSAoKSA9PiBzZXRTaG93RGVsZXRlTW9kYWwodHJ1ZSk7XHJcbiAgY29uc3QgaGFuZGxlQ2xvc2VEZWxldGVNb2RhbCA9ICgpID0+IHNldFNob3dEZWxldGVNb2RhbChmYWxzZSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZURlbGV0ZVNlbGVjdGVkID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgc2V0SXNEZWxldGluZyh0cnVlKTtcclxuICAgIGNvbnN0IGRiID0gZmlyZWJhc2UuZmlyZXN0b3JlKCk7XHJcbiAgICB0cnkge1xyXG4gICAgICAvLyBMb29wIG92ZXIgZWFjaCBzZWxlY3RlZCBpdGVtIG9uZSBhdCBhIHRpbWVcclxuICAgICAgZm9yIChjb25zdCBpdGVtSWQgb2Ygc2VsZWN0ZWRJdGVtcykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGl0ZW1JZClcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgLy8gRGVsZXRlIGZyb20gXCJUZXN0XCIgY29sbGVjdGlvblxyXG4gICAgICAgICAgYXdhaXQgZGIuY29sbGVjdGlvbihcIlRlc3RcIikuZG9jKGl0ZW1JZCkuZGVsZXRlKCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGBFcnJvciBkZWxldGluZyBkb2N1bWVudCAke2l0ZW1JZH0gZnJvbSBUZXN0OmAsIGVycik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAvLyBEZWxldGUgZnJvbSBcIlBhcnRzXCIgY29sbGVjdGlvblxyXG4gICAgICAgICAgYXdhaXQgZGIuY29sbGVjdGlvbihcIlBhcnRzXCIpLmRvYyhpdGVtSWQpLmRlbGV0ZSgpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgY29uc29sZS5lcnJvcihgRXJyb3IgZGVsZXRpbmcgZG9jdW1lbnQgJHtpdGVtSWR9IGZyb20gUGFydHM6YCwgZXJyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIC8vIERlbGV0ZSBhc3NvY2lhdGVkIHBob3RvcyBmcm9tIHN0b3JhZ2VcclxuICAgICAgICAgIGF3YWl0IGRlbGV0ZUZyb21TdG9yYWdlKGl0ZW1JZCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGBFcnJvciBkZWxldGluZyBzdG9yYWdlIGZvciAke2l0ZW1JZH06YCwgZXJyKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgLy8gVXBkYXRlIGxvY2FsIHN0YXRlIGJ5IGZpbHRlcmluZyBvdXQgdGhlIGRlbGV0ZWQgaXRlbXNcclxuICAgICAgc2V0SW5mbyhpbmZvLmZpbHRlcigoaXRlbSkgPT4gIXNlbGVjdGVkSXRlbXMuaW5jbHVkZXMoaXRlbS5pZCkpKTtcclxuICAgICAgc2V0U2VsZWN0ZWRJdGVtcyhbXSk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZGVsZXRpbmcgaXRlbXM6XCIsIGVycm9yKTtcclxuICAgIH0gZmluYWxseSB7XHJcbiAgICAgIHNldElzRGVsZXRpbmcoZmFsc2UpO1xyXG4gICAgICBoYW5kbGVDbG9zZURlbGV0ZU1vZGFsKCk7XHJcbiAgICAgIC8vIE9wdGlvbmFsbHksIHJlbG9hZCB0aGUgcGFnZVxyXG4gICAgICAvLyByb3V0ZXIucmVsb2FkKCk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcblxyXG4gIGNvbnN0IGhhbmRsZUNsb3NlID0gKCkgPT4gc2V0U2hvdyhmYWxzZSk7XHJcbiAgY29uc3QgaGFuZGxlU2hvdyA9ICgpID0+IHNldFNob3codHJ1ZSk7XHJcblxyXG4gIGNvbnN0IGNoZWNrRGVsZXRlID0gKGV2ZW50LCBwb3MsIGlkc1RvRGVsZXRlLCBuYW1lKSA9PiB7XHJcbiAgICBpZiAoZXZlbnQpIHtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICB9XHJcbiAgICBjb25zb2xlLmxvZyhcIlNlbGVjdGVkIElEcyB0byBkZWxldGU6XCIsIGlkc1RvRGVsZXRlKTtcclxuICAgIHNldFNlbGVjdGVkSXRlbXMoaWRzVG9EZWxldGUpO1xyXG4gICAgc2V0REl0ZW0obmFtZSk7XHJcbiAgICBzZXRTaG93RGVsZXRlTW9kYWwodHJ1ZSk7XHJcbiAgfTtcclxuXHJcbiAgLy8gY29uc3QgaGFuZGxlRGVsZXRlID0gYXN5bmMgKCkgPT4ge1xyXG4gIC8vICAgbGV0IGl0ZW1JZCA9IGdJZGU7XHJcbiAgLy8gICB0cnkge1xyXG4gIC8vICAgICBzZXRJc0RlbGV0aW5nKHRydWUpO1xyXG4gIC8vICAgICBjb25zdCBkYiA9IGZpcmViYXNlLmZpcmVzdG9yZSgpO1xyXG4gIC8vICAgICBhd2FpdCBkYi5jb2xsZWN0aW9uKFwiVGVzdFwiKS5kb2MoaXRlbUlkKS5kZWxldGUoKTtcclxuICAvLyAgICAgYXdhaXQgZGVsZXRlRnJvbVBhcnRzQ29sbGVjdGlvbihpdGVtSWQpO1xyXG4gIC8vICAgICBhd2FpdCBkZWxldGVGcm9tU3RvcmFnZShpdGVtSWQpO1xyXG4gIC8vICAgICBzZXRJbmZvKGluZm8uZmlsdGVyKChfLCBpKSA9PiBnUG9zICE9PSBpKSk7XHJcbiAgLy8gICAgIGNvbnNvbGUubG9nKGBEZWxldGVkIGl0ZW06ICR7aXRlbUlkfWApO1xyXG4gIC8vICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAvLyAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGRlbGV0aW5nIGl0ZW06XCIsIGVycm9yKTtcclxuICAvLyAgIH0gZmluYWxseSB7XHJcbiAgLy8gICAgIHNldElzRGVsZXRpbmcoZmFsc2UpO1xyXG4gIC8vICAgfVxyXG4gIC8vICAgaGFuZGxlQ2xvc2UoKTtcclxuICAvLyB9O1xyXG5cclxuICBjb25zdCBob3ZlclN0eWxlID0gKGluZGV4KSA9PiAoe1xyXG4gICAgYmFja2dyb3VuZENvbG9yOiBob3ZlckluZGV4ID09PSBpbmRleCA/IFwiI2RkZFwiIDogXCJ0cmFuc3BhcmVudFwiLFxyXG4gICAgdGV4dEFsaWduOiBcImNlbnRlclwiLFxyXG4gICAgY3Vyc29yOiBcImRlZmF1bHRcIixcclxuICB9KTtcclxuXHJcbiAgY29uc3QgW2Ryb3Bkb3duMVRleHQsIHNldERyb3Bkb3duMVRleHRdID0gdXNlU3RhdGUoXCJTZWxlY3QgT3B0aW9uXCIpO1xyXG4gIGNvbnN0IFtkcm9wZG93bjJUZXh0LCBzZXREcm9wZG93bjJUZXh0XSA9IHVzZVN0YXRlKFwiU2VsZWN0IE9wdGlvblwiKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlU2VsZWN0MSA9IChldmVudEtleSwgZXZlbnQpID0+IHtcclxuICAgIGlmIChldmVudEtleSA9PT0gXCJ1bmFzc2lnbmVkXCIpIHtcclxuICAgICAgc2V0RHJvcGRvd24xVGV4dChcIlNlbGVjdCBPcHRpb25cIik7XHJcbiAgICAgIHNldFNlbGVjdGVkT0VNKG51bGwpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc2V0RHJvcGRvd24xVGV4dChldmVudC50YXJnZXQudGV4dENvbnRlbnQpO1xyXG4gICAgICBzZXRTZWxlY3RlZE9FTShldmVudC50YXJnZXQudGV4dENvbnRlbnQpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGNvbnN0IGhhbmRsZVNlbGVjdDIgPSAoZXZlbnRLZXksIGV2ZW50KSA9PiB7XHJcbiAgICBpZiAoZXZlbnRLZXkgPT09IFwidW5hc3NpZ25lZFwiKSB7XHJcbiAgICAgIHNldERyb3Bkb3duMlRleHQoXCJTZWxlY3QgT3B0aW9uXCIpO1xyXG4gICAgICBzZXRTZWxlY3RlZE1vZGFsaXR5KG51bGwpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc2V0RHJvcGRvd24yVGV4dChldmVudC50YXJnZXQudGV4dENvbnRlbnQpO1xyXG4gICAgICBzZXRTZWxlY3RlZE1vZGFsaXR5KGV2ZW50LnRhcmdldC50ZXh0Q29udGVudCk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgLy8gQnVpbGQgYSB1bmlxdWUgbGlzdCBvZiBjbGllbnRzIGZyb20gdGhlIGl0ZW1zIGN1cnJlbnRseSBsb2FkZWQsIGZpbHRlcmVkIGJ5IE9FTS9Nb2RhbGl0eS5cclxuICAvLyBgdHlwZWAgaXMgXCJmcm9tXCIgb3IgXCJjdXJyZW50XCIgdG8gZGVjaWRlIHdoaWNoIGNsaWVudCByZWYgdG8gcmVhZC5cclxuICBhc3luYyBmdW5jdGlvbiBidWlsZENsaWVudHNGcm9tSXRlbXModHlwZSkge1xuICAgIGNvbnN0IGRiID0gZmlyZWJhc2UuZmlyZXN0b3JlKCk7XG4gICAgY29uc3QgaWRzID0gbmV3IFNldCgpO1xuXG4gICAgLy8gUmVzcGVjdCBjdXJyZW50IE9FTSAvIE1vZGFsaXR5IGZpbHRlcnMgd2hlbiBkZXJpdmluZyBjbGllbnQgb3B0aW9uc1xuICAgIGNvbnN0IGZpbHRlcmVkID0gYXVnbWVudGVkSW5mby5maWx0ZXIoKGl0ZW0pID0+IHtcbiAgICAgIGNvbnN0IE9FTSA9IGdldE1hY2hpbmVGaWVsZChpdGVtLCBcIk9FTVwiKTtcbiAgICAgIGNvbnN0IE1vZGFsaXR5ID0gZ2V0TWFjaGluZUZpZWxkKGl0ZW0sIFwiTW9kYWxpdHlcIik7XG4gICAgICBpZiAoIWZpZWxkTWF0Y2hlc1NlbGVjdGlvbihPRU0sIHNlbGVjdGVkT0VNKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoXG4gICAgICAgICFmaWVsZE1hdGNoZXNTZWxlY3Rpb24oTW9kYWxpdHksIHNlbGVjdGVkTW9kYWxpdHkpXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSk7XG5cclxuICAgIGZvciAoY29uc3QgaXQgb2YgZmlsdGVyZWQpIHtcclxuICAgICAgY29uc3QgaWQgPSB0eXBlID09PSBcImZyb21cIiA/IGl0LmNsaWVudEZyb21JZCA6IGl0LmNsaWVudEN1cnJlbnRJZDtcclxuICAgICAgaWYgKGlkKSBpZHMuYWRkKGlkKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBvdXQgPSBbXTtcclxuICAgIGNvbnN0IGlkQXJyYXkgPSBbLi4uaWRzXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaWRBcnJheS5sZW5ndGg7IGkgKz0gMTApIHtcclxuICAgICAgY29uc3QgY2h1bmsgPSBpZEFycmF5LnNsaWNlKGksIGkgKyAxMCk7XHJcbiAgICAgIGNvbnN0IHNuYXAgPSBhd2FpdCBkYlxyXG4gICAgICAgIC5jb2xsZWN0aW9uKFwiQ2xpZW50XCIpXHJcbiAgICAgICAgLndoZXJlKGZpcmViYXNlLmZpcmVzdG9yZS5GaWVsZFBhdGguZG9jdW1lbnRJZCgpLCBcImluXCIsIGNodW5rKVxyXG4gICAgICAgIC5nZXQoKTtcclxuICAgICAgc25hcC5mb3JFYWNoKChkb2MpID0+IHtcclxuICAgICAgICBjb25zdCBkID0gZG9jLmRhdGEoKSB8fCB7fTtcclxuICAgICAgICBvdXQucHVzaCh7IGlkOiBkb2MuaWQsIG5hbWU6IGQubmFtZSB8fCBkb2MuaWQgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHNvcnQgYnkgbmFtZSBmb3IgbmljZXIgVVhcclxuICAgIG91dC5zb3J0KChhLCBiKSA9PiAoYS5uYW1lIHx8IFwiXCIpLmxvY2FsZUNvbXBhcmUoYi5uYW1lIHx8IFwiXCIpKTtcclxuICAgIHJldHVybiBvdXQ7XHJcbiAgfVxyXG5cclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBDTElFTlQgU0VMRUNUSU9OIEhBTkRMSU5HXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBUaGlzIGZ1bmN0aW9uIGZldGNoZXMgY2xpZW50cyBhbmQgb3BlbnMgdGhlIGNsaWVudCBtb2RhbC5cclxuICBjb25zdCBoYW5kbGVDbGllbnRDbGljayA9IGFzeW5jICgpID0+IHtcclxuICAgIGxldCBzYWZlQ2xpZW50cyA9IFtdO1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgY2xpZW50c0RhdGEgPSBhd2FpdCBmZXRjaENsaWVudHMoc2VsZWN0ZWRPRU0sIHNlbGVjdGVkTW9kYWxpdHkpO1xyXG4gICAgICBzYWZlQ2xpZW50cyA9IEFycmF5LmlzQXJyYXkoY2xpZW50c0RhdGEpID8gY2xpZW50c0RhdGEgOiBbXTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgY29uc29sZS5lcnJvcihcImZldGNoQ2xpZW50cyBmYWlsZWQ6XCIsIGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEZhbGxiYWNrIHRvIGJ1aWxkaW5nIGZyb20gbG9hZGVkIGl0ZW1zIGlmIEFQSSBnYXZlIHVzIG5vdGhpbmdcclxuICAgIGlmIChzYWZlQ2xpZW50cy5sZW5ndGggPT09IDApIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBpZiAoIWNsaWVudFNlbGVjdGlvblR5cGUpIHtcclxuICAgICAgICAgIC8vIGlmIHNvbWVob3cgbm90IHNldCB5ZXQsIGRlZmF1bHQgdG8gXCJmcm9tXCJcclxuICAgICAgICAgIHNldENsaWVudFNlbGVjdGlvblR5cGUoXCJmcm9tXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBkZXJpdmVkID0gYXdhaXQgYnVpbGRDbGllbnRzRnJvbUl0ZW1zKGNsaWVudFNlbGVjdGlvblR5cGUgfHwgXCJmcm9tXCIpO1xyXG4gICAgICAgIHNhZmVDbGllbnRzID0gZGVyaXZlZDtcclxuICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYWxsYmFjayBidWlsZENsaWVudHNGcm9tSXRlbXMgZmFpbGVkOlwiLCBlKTtcclxuICAgICAgICBzYWZlQ2xpZW50cyA9IFtdO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0Q2xpZW50cyhzYWZlQ2xpZW50cyk7XHJcbiAgICBzZXRDbGllbnRTZWFyY2hUZXJtKFwiXCIpO1xyXG4gICAgc2V0U2hvd0NsaWVudE1vZGFsKHRydWUpO1xyXG4gIH07XHJcblxyXG5cclxuXHJcbiAgLy8gV2hlbiBhIGNsaWVudCBpcyBzZWxlY3RlZCBpbiB0aGUgbW9kYWwsIHdlIG5vdyBhc3N1bWUgdGhlIHBhcmFtZXRlciBpcyBhIGNsaWVudCBJRC5cclxuICAvLyBJZiB0aGUgcGFzc2VkIHZhbHVlIGlzIG51bGwsIHdlIGNsZWFyIHRoZSBzZWxlY3Rpb24uXHJcbiAgY29uc3QgaGFuZGxlQ2xpZW50U2VsZWN0ID0gYXN5bmMgKGNsaWVudElkKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhcIlVzZXIgc2VsZWN0ZWQgY2xpZW50IGlkOlwiLCBjbGllbnRJZCk7XHJcbiAgICBpZiAoIWNsaWVudElkKSB7XHJcbiAgICAgIGlmIChjbGllbnRTZWxlY3Rpb25UeXBlID09PSBcImZyb21cIikge1xyXG4gICAgICAgIHNldENsaWVudEZyb21CdXR0b25UZXh0KFwiU2VsZWN0IE9wdGlvblwiKTtcclxuICAgICAgICBzZXRTZWxlY3RlZENsaWVudEZyb20obnVsbCk7XHJcbiAgICAgIH0gZWxzZSBpZiAoY2xpZW50U2VsZWN0aW9uVHlwZSA9PT0gXCJjdXJyZW50XCIpIHtcclxuICAgICAgICBzZXRDbGllbnRDdXJyZW50QnV0dG9uVGV4dChcIlNlbGVjdCBPcHRpb25cIik7XHJcbiAgICAgICAgc2V0U2VsZWN0ZWRDbGllbnRDdXJyZW50KG51bGwpO1xyXG4gICAgICB9XHJcbiAgICAgIHNldFNob3dDbGllbnRNb2RhbChmYWxzZSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IGNsaWVudFNuYXAgPSBhd2FpdCBmaXJlYmFzZS5maXJlc3RvcmUoKS5jb2xsZWN0aW9uKFwiQ2xpZW50XCIpLmRvYyhjbGllbnRJZCkuZ2V0KCk7XHJcbiAgICAgIGlmIChjbGllbnRTbmFwLmV4aXN0cykge1xyXG4gICAgICAgIGNvbnN0IGNsaWVudERhdGEgPSBjbGllbnRTbmFwLmRhdGEoKTtcclxuICAgICAgICBpZiAoY2xpZW50U2VsZWN0aW9uVHlwZSA9PT0gXCJmcm9tXCIpIHtcclxuICAgICAgICAgIHNldENsaWVudEZyb21CdXR0b25UZXh0KGNsaWVudERhdGEubmFtZSk7XHJcbiAgICAgICAgICBzZXRTZWxlY3RlZENsaWVudEZyb20oY2xpZW50SWQpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoY2xpZW50U2VsZWN0aW9uVHlwZSA9PT0gXCJjdXJyZW50XCIpIHtcclxuICAgICAgICAgIHNldENsaWVudEN1cnJlbnRCdXR0b25UZXh0KGNsaWVudERhdGEubmFtZSk7XHJcbiAgICAgICAgICBzZXRTZWxlY3RlZENsaWVudEN1cnJlbnQoY2xpZW50SWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiTm8gY2xpZW50IGRvY3VtZW50IGZvdW5kIGZvciBpZDpcIiwgY2xpZW50SWQpO1xyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZmV0Y2hpbmcgY2xpZW50IGRhdGE6XCIsIGVycm9yKTtcclxuICAgIH1cclxuICAgIHNldFNob3dDbGllbnRNb2RhbChmYWxzZSk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQ2xpZW50SW5mbyA9IChjbGllbnRJZCwgY2xpZW50TmFtZSkgPT4ge1xyXG4gICAgY29uc29sZS5sb2coYENsaWVudCBJRDogJHtjbGllbnRJZH0sIENsaWVudCBOYW1lOiAke2NsaWVudE5hbWV9YCk7XHJcbiAgICByb3V0ZXIucHVzaChcImNsaWVudC9cIiArIGNsaWVudElkKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBoYW5kbGVDbGVhckNsaWVudFNlbGVjdGlvbiA9ICgpID0+IHtcclxuICAgIGlmIChjbGllbnRTZWxlY3Rpb25UeXBlID09PSBcImZyb21cIikge1xyXG4gICAgICBzZXRDbGllbnRGcm9tQnV0dG9uVGV4dChcIlNlbGVjdCBPcHRpb25cIik7XHJcbiAgICAgIHNldFNlbGVjdGVkQ2xpZW50RnJvbShudWxsKTtcclxuICAgIH0gZWxzZSBpZiAoY2xpZW50U2VsZWN0aW9uVHlwZSA9PT0gXCJjdXJyZW50XCIpIHtcclxuICAgICAgc2V0Q2xpZW50Q3VycmVudEJ1dHRvblRleHQoXCJTZWxlY3QgT3B0aW9uXCIpO1xyXG4gICAgICBzZXRTZWxlY3RlZENsaWVudEN1cnJlbnQobnVsbCk7XHJcbiAgICB9XHJcbiAgICBzZXRTaG93Q2xpZW50TW9kYWwoZmFsc2UpO1xyXG4gIH07XHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gTU9ERUwgU0VMRUNUSU9OIEhBTkRMSU5HXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICBjb25zdCBbbW9kZWxzLCBzZXRNb2RlbHNdID0gdXNlU3RhdGUoW10pO1xyXG4gIGNvbnN0IFtzaG93TW9kZWxNb2RhbCwgc2V0U2hvd01vZGVsTW9kYWxdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFttb2RlbEJ1dHRvblRleHQsIHNldE1vZGVsQnV0dG9uVGV4dF0gPSB1c2VTdGF0ZShcIlNlbGVjdCBPcHRpb25cIik7XHJcblxyXG4gIGNvbnN0IGhhbmRsZU1vZGVsQ2xpY2sgPSBhc3luYyAoKSA9PiB7XHJcbiAgICBjb25zdCBtb2RlbHNEYXRhID0gYXdhaXQgZmV0Y2hNb2RlbHMoXHJcbiAgICAgIHNlbGVjdGVkT0VNLFxyXG4gICAgICBzZWxlY3RlZE1vZGFsaXR5LFxyXG4gICAgICBzZWxlY3RlZENsaWVudEZyb21cclxuICAgICk7XHJcbiAgICBzZXRNb2RlbHMobW9kZWxzRGF0YSk7XHJcbiAgICBzZXRNb2RlbFNlYXJjaFRlcm0oXCJcIik7XHJcbiAgICBzZXRTaG93TW9kZWxNb2RhbCh0cnVlKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBoYW5kbGVNb2RlbFNlbGVjdCA9IChtb2RlbE5hbWUpID0+IHtcclxuICAgIHNldE1vZGVsQnV0dG9uVGV4dChtb2RlbE5hbWUgfHwgXCJTZWxlY3QgT3B0aW9uXCIpO1xyXG4gICAgc2V0U2VsZWN0ZWRNb2RlbChtb2RlbE5hbWUgfHwgbnVsbCk7XHJcbiAgICBzZXRTaG93TW9kZWxNb2RhbChmYWxzZSk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQ2xlYXJNb2RlbFNlbGVjdGlvbiA9ICgpID0+IHtcclxuICAgIHNldE1vZGVsQnV0dG9uVGV4dChcIlNlbGVjdCBPcHRpb25cIik7XHJcbiAgICBzZXRTZWxlY3RlZE1vZGVsKG51bGwpO1xyXG4gICAgc2V0U2hvd01vZGVsTW9kYWwoZmFsc2UpO1xyXG4gIH07XHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gV0FSRUhPVVNFIEJVVFRPTlMgKGZvciBDbGllbnQgQ3VycmVudClcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIGNvbnN0IGhhbmRsZVNvQ2FsV2FyZWhvdXNlQ2xpY2sgPSAoKSA9PiB7XHJcbiAgICBzZXRDbGllbnRDdXJyZW50QnV0dG9uVGV4dChcIlNvQ2FsIFdhcmVob3VzZVwiKTtcclxuICAgIHNldFNlbGVjdGVkQ2xpZW50Q3VycmVudChTT0NBTF9DTElFTlRfSUQpO1xyXG4gICAgY29uc29sZS5sb2coXCJXYXJlaG91c2UgYnV0dG9uIGNsaWNrZWQ6IHNldHRpbmcgQ2xpZW50IEN1cnJlbnQgdG9cIiwgU09DQUxfQ0xJRU5UX0lEKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBoYW5kbGVOb3JDYWxXYXJlaG91c2VDbGljayA9ICgpID0+IHtcclxuICAgIHNldENsaWVudEN1cnJlbnRCdXR0b25UZXh0KFwiTm9yQ2FsIFdhcmVob3VzZVwiKTtcclxuICAgIHNldFNlbGVjdGVkQ2xpZW50Q3VycmVudChOT1JDQUxfQ0xJRU5UX0lEKTtcclxuICAgIGNvbnNvbGUubG9nKFwiV2FyZWhvdXNlIGJ1dHRvbiBjbGlja2VkOiBzZXR0aW5nIENsaWVudCBDdXJyZW50IHRvXCIsIE5PUkNBTF9DTElFTlRfSUQpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGhhbmRsZVdhcmVob3VzZVVuYXNzaWduZWRDbGljayA9ICgpID0+IHtcclxuICAgIHNldENsaWVudEN1cnJlbnRCdXR0b25UZXh0KFwiVW5hc3NpZ25lZFwiKTtcclxuICAgIHNldFNlbGVjdGVkQ2xpZW50Q3VycmVudChVTkFTU0lHTkVEX0NMSUVOVF9JRCk7XHJcbiAgICBjb25zb2xlLmxvZyhcIldhcmVob3VzZSBidXR0b24gY2xpY2tlZDogc2V0dGluZyBDbGllbnQgQ3VycmVudCB0b1wiLCBVTkFTU0lHTkVEX0NMSUVOVF9JRCk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgW2NsaWVudFNlYXJjaFRlcm0sIHNldENsaWVudFNlYXJjaFRlcm1dID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW21vZGVsU2VhcmNoVGVybSwgc2V0TW9kZWxTZWFyY2hUZXJtXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG5cclxuICBjb25zdCBkZWxldGVGcm9tU3RvcmFnZSA9IGFzeW5jIChpdGVtSWQpID0+IHtcclxuICAgIGNvbnN0IHN0b3JhZ2VSZWYgPSBmaXJlYmFzZS5zdG9yYWdlKCkucmVmKCk7XHJcbiAgICBjb25zdCBmb2xkZXJSZWYgPSBzdG9yYWdlUmVmLmNoaWxkKGBQYXJ0cy8ke2l0ZW1JZH0vYCk7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBsaXN0UmVzdWx0ID0gYXdhaXQgZm9sZGVyUmVmLmxpc3RBbGwoKTtcclxuICAgICAgY29uc3QgZGVsZXRlUHJvbWlzZXMgPSBsaXN0UmVzdWx0Lml0ZW1zLm1hcCgoaXRlbSkgPT4gaXRlbS5kZWxldGUoKSk7XHJcbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKGRlbGV0ZVByb21pc2VzKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBkZWxldGluZyBmcm9tIHN0b3JhZ2U6XCIsIGVycm9yKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBjb25zdCBkZWxldGVGcm9tUGFydHNDb2xsZWN0aW9uID0gYXN5bmMgKGl0ZW1JZCkgPT4ge1xyXG4gICAgY29uc3QgZGIgPSBmaXJlYmFzZS5maXJlc3RvcmUoKTtcclxuICAgIHRyeSB7XHJcbiAgICAgIGF3YWl0IGRiLmNvbGxlY3Rpb24oXCJQYXJ0c1wiKS5kb2MoaXRlbUlkKS5kZWxldGUoKTtcclxuICAgICAgY29uc29sZS5sb2coYERlbGV0ZWQgaXRlbSBmcm9tIFBhcnRzIGNvbGxlY3Rpb246ICR7aXRlbUlkfWApO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGRlbGV0aW5nIGZyb20gUGFydHMgY29sbGVjdGlvbjpcIiwgZXJyb3IpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIC8vICAgLy8gU2FmZWx5IGNvbnZlcnQgYW55IGRhdGUtaXNoIHZhbHVlIGludG8gYSBjb21wYXJhYmxlIHRpbWVzdGFtcCAobXMgc2luY2UgZXBvY2gpLlxyXG4gIC8vIGZ1bmN0aW9uIHRvVGltZSh2YWx1ZSkge1xyXG4gIC8vICAgaWYgKCF2YWx1ZSkgcmV0dXJuIG51bGw7XHJcblxyXG4gIC8vICAgLy8gRmlyZXN0b3JlIFRpbWVzdGFtcDogeyBzZWNvbmRzLCBuYW5vc2Vjb25kcyB9XHJcbiAgLy8gICBpZiAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmIHZhbHVlLnNlY29uZHMpIHtcclxuICAvLyAgICAgdHJ5IHtcclxuICAvLyAgICAgICByZXR1cm4gdmFsdWUuc2Vjb25kcyAqIDEwMDA7XHJcbiAgLy8gICAgIH0gY2F0Y2ggeyAvKiBmYWxsdGhyb3VnaCAqLyB9XHJcbiAgLy8gICB9XHJcblxyXG4gIC8vICAgLy8gSWYgYWxyZWFkeSBhIERhdGVcclxuICAvLyAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIERhdGUpIHJldHVybiBpc05hTih2YWx1ZS5nZXRUaW1lKCkpID8gbnVsbCA6IHZhbHVlLmdldFRpbWUoKTtcclxuXHJcbiAgLy8gICAvLyBJZiBzdHJpbmc6IHRyeSBJU08gZmlyc3RcclxuICAvLyAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpIHtcclxuICAvLyAgICAgLy8geXl5eS1tbS1kZCAoZnJvbSB5b3VyIGZvcm0gaW5wdXRzKVxyXG4gIC8vICAgICBjb25zdCBpc28gPSBEYXRlLnBhcnNlKHZhbHVlKTtcclxuICAvLyAgICAgaWYgKCFpc05hTihpc28pKSByZXR1cm4gaXNvO1xyXG5cclxuICAvLyAgICAgLy8gbW0vZGQveXl5eSBmYWxsYmFjayAob2xkZXIgaXRlbXMpXHJcbiAgLy8gICAgIGNvbnN0IHBhcnRzID0gdmFsdWUuc3BsaXQoXCIvXCIpO1xyXG4gIC8vICAgICBpZiAocGFydHMubGVuZ3RoID09PSAzKSB7XHJcbiAgLy8gICAgICAgY29uc3QgW21tLCBkZCwgeXl5eV0gPSBwYXJ0cztcclxuICAvLyAgICAgICBjb25zdCBhbHQgPSBEYXRlLnBhcnNlKGAke3l5eXl9LSR7bW19LSR7ZGR9YCk7XHJcbiAgLy8gICAgICAgaWYgKCFpc05hTihhbHQpKSByZXR1cm4gYWx0O1xyXG4gIC8vICAgICB9XHJcbiAgLy8gICB9XHJcblxyXG4gIC8vICAgLy8gQ2Fub25pY2FsaXplIGFueSBkYXRlLWlzaCB2YWx1ZSB0byAneXl5eS1tbS1kZCcgc28gaXQgbWF0Y2hlcyA8aW5wdXQgdHlwZT1cImRhdGVcIj4gdmFsdWVzXHJcbiAgLy8gICBmdW5jdGlvbiB0b1lNRCh2YWx1ZSkge1xyXG4gIC8vICAgICBjb25zdCB0ID0gdG9UaW1lKHZhbHVlKTtcclxuICAvLyAgICAgaWYgKHQgPT0gbnVsbCkgcmV0dXJuIG51bGw7XHJcbiAgLy8gICAgIGNvbnN0IGQgPSBuZXcgRGF0ZSh0KTtcclxuICAvLyAgICAgY29uc3QgeXl5eSA9IGQuZ2V0RnVsbFllYXIoKTtcclxuICAvLyAgICAgY29uc3QgbW0gPSBTdHJpbmcoZC5nZXRNb250aCgpICsgMSkucGFkU3RhcnQoMiwgXCIwXCIpO1xyXG4gIC8vICAgICBjb25zdCBkZCA9IFN0cmluZyhkLmdldERhdGUoKSkucGFkU3RhcnQoMiwgXCIwXCIpO1xyXG4gIC8vICAgICByZXR1cm4gYCR7eXl5eX0tJHttbX0tJHtkZH1gO1xyXG4gIC8vICAgfVxyXG5cclxuXHJcbiAgLy8gICAvLyBMYXN0IHJlc29ydFxuICAvLyAgIGNvbnN0IHQgPSBEYXRlLnBhcnNlKHZhbHVlKTtcbiAgLy8gICByZXR1cm4gaXNOYU4odCkgPyBudWxsIDogdDtcbiAgLy8gfVxuXG4gIGNvbnN0IHRvdGFsS25vd25QYWdlcyA9IE1hdGgubWF4KFxuICAgIDEsXG4gICAgcGFnZUN1cnNvcnMuZmlsdGVyKEJvb2xlYW4pLmxlbmd0aCArIChoYXNOZXh0UGFnZSA/IDEgOiAwKVxuICApO1xuICBjb25zdCBwYWdlQnV0dG9ucyA9ICgoKSA9PiB7XG4gICAgY29uc3QgYnV0dG9ucyA9IFtdO1xuICAgIGNvbnN0IG1heFZpc2libGUgPSA3O1xuXG4gICAgY29uc3QgcHVzaFBhZ2UgPSAocCkgPT5cbiAgICAgIGJ1dHRvbnMucHVzaChcbiAgICAgICAgPFBhZ2luYXRpb24uSXRlbVxuICAgICAgICAgIGtleT17YHBhZ2UtJHtwfWB9XG4gICAgICAgICAgYWN0aXZlPXtwID09PSBwYWdlfVxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFBhZ2UocCl9XG4gICAgICAgID5cbiAgICAgICAgICB7cH1cbiAgICAgICAgPC9QYWdpbmF0aW9uLkl0ZW0+XG4gICAgICApO1xuXG4gICAgY29uc3QgcHVzaEVsbGlwc2lzID0gKGtleSkgPT5cbiAgICAgIGJ1dHRvbnMucHVzaCg8UGFnaW5hdGlvbi5FbGxpcHNpcyBrZXk9e2tleX0gZGlzYWJsZWQgLz4pO1xuXG4gICAgaWYgKHRvdGFsS25vd25QYWdlcyA8PSBtYXhWaXNpYmxlKSB7XG4gICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSB0b3RhbEtub3duUGFnZXM7IGkgKz0gMSkgcHVzaFBhZ2UoaSk7XG4gICAgICByZXR1cm4gYnV0dG9ucztcbiAgICB9XG5cbiAgICBsZXQgc3RhcnQgPSBNYXRoLm1heCgyLCBwYWdlIC0gMSk7XG4gICAgbGV0IGVuZCA9IE1hdGgubWluKHRvdGFsS25vd25QYWdlcyAtIDEsIHBhZ2UgKyAxKTtcblxuICAgIGNvbnN0IGRlc2lyZWRXaW5kb3cgPSBtYXhWaXNpYmxlIC0gMjtcbiAgICBsZXQgY3VycmVudFdpbmRvdyA9IGVuZCAtIHN0YXJ0ICsgMTtcbiAgICBsZXQgcmVtYWluaW5nID0gZGVzaXJlZFdpbmRvdyAtIGN1cnJlbnRXaW5kb3c7XG5cbiAgICB3aGlsZSAocmVtYWluaW5nID4gMCkge1xuICAgICAgaWYgKHN0YXJ0ID4gMikge1xuICAgICAgICBzdGFydCAtPSAxO1xuICAgICAgICByZW1haW5pbmcgLT0gMTtcbiAgICAgIH1cbiAgICAgIGlmIChyZW1haW5pbmcgPiAwICYmIGVuZCA8IHRvdGFsS25vd25QYWdlcyAtIDEpIHtcbiAgICAgICAgZW5kICs9IDE7XG4gICAgICAgIHJlbWFpbmluZyAtPSAxO1xuICAgICAgfVxuICAgICAgaWYgKHN0YXJ0ID09PSAyICYmIGVuZCA9PT0gdG90YWxLbm93blBhZ2VzIC0gMSkgYnJlYWs7XG4gICAgfVxuXG4gICAgcHVzaFBhZ2UoMSk7XG4gICAgaWYgKHN0YXJ0ID4gMikgcHVzaEVsbGlwc2lzKFwic3RhcnQtZWxsaXBzaXNcIik7XG4gICAgZm9yIChsZXQgaSA9IHN0YXJ0OyBpIDw9IGVuZDsgaSArPSAxKSBwdXNoUGFnZShpKTtcbiAgICBpZiAoZW5kIDwgdG90YWxLbm93blBhZ2VzIC0gMSkgcHVzaEVsbGlwc2lzKFwiZW5kLWVsbGlwc2lzXCIpO1xuICAgIHB1c2hQYWdlKHRvdGFsS25vd25QYWdlcyk7XG4gICAgaWYgKGhhc05leHRQYWdlKSBwdXNoRWxsaXBzaXMoXCJtb3JlLWVsbGlwc2lzXCIpO1xuXG4gICAgcmV0dXJuIGJ1dHRvbnM7XG4gIH0pKCk7XG5cbiAgY29uc3QgcmVjYWxjUGFnZVNpemUgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybjtcbiAgICBpZiAocGFnZSAhPT0gMSkgcmV0dXJuO1xuICAgIGlmICghdGFibGVCb2R5UmVmLmN1cnJlbnQpIHJldHVybjtcbiAgICBjb25zdCBjb250YWluZXJIZWlnaHQgPVxuICAgICAgdGFibGVCb2R5UmVmLmN1cnJlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0IHx8IDA7XG4gICAgaWYgKCFjb250YWluZXJIZWlnaHQpIHJldHVybjtcblxuICAgIGNvbnN0IGhlYWRlclJvdyA9XG4gICAgICB0YWJsZUJvZHlSZWYuY3VycmVudC5xdWVyeVNlbGVjdG9yKFwidGFibGUgdGhlYWQgdHJcIikgfHxcbiAgICAgIHRhYmxlQm9keVJlZi5jdXJyZW50LnF1ZXJ5U2VsZWN0b3IoXCJ0aGVhZCB0clwiKTtcbiAgICBjb25zdCBib2R5Um93ID1cbiAgICAgIHRhYmxlQm9keVJlZi5jdXJyZW50LnF1ZXJ5U2VsZWN0b3IoXCJ0YWJsZSB0Ym9keSB0clwiKSB8fFxuICAgICAgdGFibGVCb2R5UmVmLmN1cnJlbnQucXVlcnlTZWxlY3RvcihcInRib2R5IHRyXCIpO1xuXG4gICAgaWYgKGhlYWRlclJvdykge1xuICAgICAgY29uc3QgaCA9IGhlYWRlclJvdy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7XG4gICAgICBpZiAoaCkgaGVhZGVySGVpZ2h0UmVmLmN1cnJlbnQgPSBoO1xuICAgIH1cbiAgICBpZiAoYm9keVJvdykge1xuICAgICAgY29uc3QgciA9IGJvZHlSb3cuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xuICAgICAgaWYgKHIpIHJvd0hlaWdodFJlZi5jdXJyZW50ID0gcjtcbiAgICB9XG5cbiAgICBjb25zdCB2ZXJ0aWNhbFBhZGRpbmcgPSAyNDtcbiAgICBjb25zdCBhdmFpbGFibGUgPVxuICAgICAgY29udGFpbmVySGVpZ2h0IC0gaGVhZGVySGVpZ2h0UmVmLmN1cnJlbnQgLSB2ZXJ0aWNhbFBhZGRpbmc7XG4gICAgY29uc3QgZXN0aW1hdGVkID0gTWF0aC5mbG9vcihhdmFpbGFibGUgLyByb3dIZWlnaHRSZWYuY3VycmVudCk7XG4gICAgY29uc3QgY2xhbXBlZCA9IE1hdGgubWF4KDUsIE1hdGgubWluKDUwLCBlc3RpbWF0ZWQpKTtcbiAgICBpZiAoY2xhbXBlZCA+IDAgJiYgY2xhbXBlZCAhPT0gcGFnZVNpemUpIHtcbiAgICAgIHNldFBhZ2VTaXplKGNsYW1wZWQpO1xuICAgICAgcmVzZXRQYWdpbmF0aW9uKCk7XG4gICAgICBzZXRRdWVyeUVwb2NoKCh2KSA9PiB2ICsgMSk7XG4gICAgfVxuICB9LCBbcGFnZSwgcGFnZVNpemVdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm47XG4gICAgcmVjYWxjUGFnZVNpemUoKTtcbiAgICBjb25zdCBvblJlc2l6ZSA9ICgpID0+IHJlY2FsY1BhZ2VTaXplKCk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgb25SZXNpemUpO1xuICAgIHJldHVybiAoKSA9PiB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBvblJlc2l6ZSk7XG4gIH0sIFtyZWNhbGNQYWdlU2l6ZV0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKGlzTG9hZGluZyB8fCBwYWdlICE9PSAxKSByZXR1cm47XG4gICAgcmVjYWxjUGFnZVNpemUoKTtcbiAgfSwgW3BhZ2UsIGlzTG9hZGluZywgcmVjYWxjUGFnZVNpemVdKTtcblxuICBjb25zdCByZW5kZXJGaWx0ZXJzID0gKGlkUHJlZml4KSA9PiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5maWx0ZXJzUGFuZWx9PlxuICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5maWx0ZXJzSGVhZGVyfT5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmZpbHRlcnNUaXRsZX0+RmlsdGVyczwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuZmlsdGVyc1N1YnRpdGxlfT5cbiAgICAgICAgICAgIE5hcnJvdyByZXN1bHRzIGJ5IG1hY2hpbmUsIGNsaWVudCwgb3Igd2FyZWhvdXNlLlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAge2hhc0FjdGl2ZUZpbHRlcnMgPyAoXG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtzdHlsZXMuZmlsdGVyc0JhZGdlfT5BY3RpdmU8L3NwYW4+XG4gICAgICAgICkgOiBudWxsfVxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuZmlsdGVyU2VjdGlvbn0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuZmlsdGVyU2VjdGlvblRpdGxlfT5NYWNoaW5lPC9kaXY+XG4gICAgICAgIDxJbnB1dEdyb3VwIGNsYXNzTmFtZT17c3R5bGVzLmlucHV0R3JvdXB9PlxuICAgICAgICAgIDxJbnB1dEdyb3VwLlRleHQ+T0VNPC9JbnB1dEdyb3VwLlRleHQ+XG4gICAgICAgICAgPERyb3Bkb3duIG9uU2VsZWN0PXtoYW5kbGVTZWxlY3QxfSBjbGFzc05hbWU9XCJ3LTEwMFwiPlxuICAgICAgICAgICAgPERyb3Bkb3duLlRvZ2dsZVxuICAgICAgICAgICAgICB2YXJpYW50PVwib3V0bGluZS1zZWNvbmRhcnlcIlxuICAgICAgICAgICAgICBpZD17YCR7aWRQcmVmaXh9LW9lbWB9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YHctMTAwICR7c3R5bGVzLmlucHV0QnV0dG9ufWB9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHtkcm9wZG93bjFUZXh0fVxuICAgICAgICAgICAgPC9Ecm9wZG93bi5Ub2dnbGU+XG4gICAgICAgICAgICA8RHJvcGRvd24uTWVudSBjbGFzc05hbWU9XCJ3LTEwMFwiPlxuICAgICAgICAgICAgICA8RHJvcGRvd24uSXRlbSBldmVudEtleT1cInVuYXNzaWduZWRcIj5TZWxlY3QgT3B0aW9uPC9Ecm9wZG93bi5JdGVtPlxuICAgICAgICAgICAgICA8RHJvcGRvd24uSXRlbSBldmVudEtleT1cIkdFXCI+R0U8L0Ryb3Bkb3duLkl0ZW0+XG4gICAgICAgICAgICAgIDxEcm9wZG93bi5JdGVtIGV2ZW50S2V5PVwiVG9zaGliYVwiPlRvc2hpYmE8L0Ryb3Bkb3duLkl0ZW0+XG4gICAgICAgICAgICAgIDxEcm9wZG93bi5JdGVtIGV2ZW50S2V5PVwiU2llbWVuc1wiPlNpZW1lbnM8L0Ryb3Bkb3duLkl0ZW0+XG4gICAgICAgICAgICAgIDxEcm9wZG93bi5JdGVtIGV2ZW50S2V5PVwiUGhpbGlwc1wiPlBoaWxpcHM8L0Ryb3Bkb3duLkl0ZW0+XG4gICAgICAgICAgICA8L0Ryb3Bkb3duLk1lbnU+XG4gICAgICAgICAgPC9Ecm9wZG93bj5cbiAgICAgICAgPC9JbnB1dEdyb3VwPlxuXG4gICAgICAgIDxJbnB1dEdyb3VwIGNsYXNzTmFtZT17c3R5bGVzLmlucHV0R3JvdXB9PlxuICAgICAgICAgIDxJbnB1dEdyb3VwLlRleHQ+TW9kYWxpdHk8L0lucHV0R3JvdXAuVGV4dD5cbiAgICAgICAgICA8RHJvcGRvd24gb25TZWxlY3Q9e2hhbmRsZVNlbGVjdDJ9IGNsYXNzTmFtZT1cInctMTAwXCI+XG4gICAgICAgICAgICA8RHJvcGRvd24uVG9nZ2xlXG4gICAgICAgICAgICAgIHZhcmlhbnQ9XCJvdXRsaW5lLXNlY29uZGFyeVwiXG4gICAgICAgICAgICAgIGlkPXtgJHtpZFByZWZpeH0tbW9kYWxpdHlgfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2B3LTEwMCAke3N0eWxlcy5pbnB1dEJ1dHRvbn1gfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7ZHJvcGRvd24yVGV4dH1cbiAgICAgICAgICAgIDwvRHJvcGRvd24uVG9nZ2xlPlxuICAgICAgICAgICAgPERyb3Bkb3duLk1lbnUgY2xhc3NOYW1lPVwidy0xMDBcIj5cbiAgICAgICAgICAgICAgPERyb3Bkb3duLkl0ZW0gZXZlbnRLZXk9XCJ1bmFzc2lnbmVkXCI+U2VsZWN0IE9wdGlvbjwvRHJvcGRvd24uSXRlbT5cbiAgICAgICAgICAgICAgPERyb3Bkb3duLkl0ZW0gZXZlbnRLZXk9XCJDVFwiPkNUPC9Ecm9wZG93bi5JdGVtPlxuICAgICAgICAgICAgICA8RHJvcGRvd24uSXRlbSBldmVudEtleT1cIk1SSVwiPk1SSTwvRHJvcGRvd24uSXRlbT5cbiAgICAgICAgICAgIDwvRHJvcGRvd24uTWVudT5cbiAgICAgICAgICA8L0Ryb3Bkb3duPlxuICAgICAgICA8L0lucHV0R3JvdXA+XG5cbiAgICAgICAgPElucHV0R3JvdXAgY2xhc3NOYW1lPXtzdHlsZXMuaW5wdXRHcm91cH0+XG4gICAgICAgICAgPElucHV0R3JvdXAuVGV4dD5Nb2RlbDwvSW5wdXRHcm91cC5UZXh0PlxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIHZhcmlhbnQ9XCJvdXRsaW5lLXNlY29uZGFyeVwiXG4gICAgICAgICAgICBjbGFzc05hbWU9e2B3LTEwMCAke3N0eWxlcy5pbnB1dEJ1dHRvbn1gfVxuICAgICAgICAgICAgb25DbGljaz17aGFuZGxlTW9kZWxDbGlja31cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7bW9kZWxCdXR0b25UZXh0fVxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICA8L0lucHV0R3JvdXA+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5maWx0ZXJTZWN0aW9ufT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5maWx0ZXJTZWN0aW9uVGl0bGV9PkNsaWVudDwvZGl2PlxuICAgICAgICA8SW5wdXRHcm91cCBjbGFzc05hbWU9e3N0eWxlcy5pbnB1dEdyb3VwfT5cbiAgICAgICAgICA8SW5wdXRHcm91cC5UZXh0PkNsaWVudCBGcm9tPC9JbnB1dEdyb3VwLlRleHQ+XG4gICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgdmFyaWFudD1cIm91dGxpbmUtc2Vjb25kYXJ5XCJcbiAgICAgICAgICAgIGNsYXNzTmFtZT17YHctMTAwICR7c3R5bGVzLmlucHV0QnV0dG9ufWB9XG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVDbGllbnRDbGljayhcImZyb21cIil9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge2NsaWVudEZyb21CdXR0b25UZXh0fVxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICA8L0lucHV0R3JvdXA+XG5cbiAgICAgICAgPElucHV0R3JvdXAgY2xhc3NOYW1lPXtzdHlsZXMuaW5wdXRHcm91cH0+XG4gICAgICAgICAgPElucHV0R3JvdXAuVGV4dD5DbGllbnQgQ3VycmVudDwvSW5wdXRHcm91cC5UZXh0PlxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIHZhcmlhbnQ9XCJvdXRsaW5lLXNlY29uZGFyeVwiXG4gICAgICAgICAgICBjbGFzc05hbWU9e2B3LTEwMCAke3N0eWxlcy5pbnB1dEJ1dHRvbn1gfVxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlQ2xpZW50Q2xpY2soXCJjdXJyZW50XCIpfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtjbGllbnRDdXJyZW50QnV0dG9uVGV4dH1cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgPC9JbnB1dEdyb3VwPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuZmlsdGVyU2VjdGlvbn0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuZmlsdGVyU2VjdGlvblRpdGxlfT5XYXJlaG91c2U8L2Rpdj5cbiAgICAgICAgPElucHV0R3JvdXAgY2xhc3NOYW1lPXtzdHlsZXMuaW5wdXRHcm91cH0+XG4gICAgICAgICAgPElucHV0R3JvdXAuVGV4dD5RdWljazwvSW5wdXRHcm91cC5UZXh0PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuYnV0dG9uR3JvdXB9PlxuICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICB2YXJpYW50PVwib3V0bGluZS1zZWNvbmRhcnlcIlxuICAgICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5mbGV4QnV0dG9ufVxuICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVTb0NhbFdhcmVob3VzZUNsaWNrfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICBTb0NhbCBXYXJlaG91c2VcbiAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICB2YXJpYW50PVwib3V0bGluZS1zZWNvbmRhcnlcIlxuICAgICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5mbGV4QnV0dG9ufVxuICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVOb3JDYWxXYXJlaG91c2VDbGlja31cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgTm9yQ2FsIFdhcmVob3VzZVxuICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgIHZhcmlhbnQ9XCJvdXRsaW5lLXNlY29uZGFyeVwiXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17c3R5bGVzLmZsZXhCdXR0b259XG4gICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZVdhcmVob3VzZVVuYXNzaWduZWRDbGlja31cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgVW5hc3NpZ25lZFxuICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvSW5wdXRHcm91cD5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xuXG5cbiAgcmV0dXJuIChcbiAgICA8TG9nZ2VkSW4+XG4gICAgICB7KGlzRGVsZXRpbmcgfHwgaXNOYXZpZ2F0aW5nKSAmJiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubG9hZGluZ092ZXJsYXl9PlxuICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgIHNyYz1cIi9tYWdtby1sb2dvLnBuZ1wiXG4gICAgICAgICAgICBhbHQ9XCJMb2FkaW5nIE1hZ21vXCJcbiAgICAgICAgICAgIGNsYXNzTmFtZT17c3R5bGVzLmxvYWRpbmdMb2dvfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cbiAgICAgIDxNb2RhbCBzaG93PXtzaG93RGVsZXRlTW9kYWx9IG9uSGlkZT17aGFuZGxlQ2xvc2VEZWxldGVNb2RhbH0+XHJcbiAgICAgICAgPE1vZGFsLkhlYWRlciBjbG9zZUJ1dHRvbj5cclxuICAgICAgICAgIDxNb2RhbC5UaXRsZT5Db25maXJtIERlbGV0aW9uPC9Nb2RhbC5UaXRsZT5cclxuICAgICAgICA8L01vZGFsLkhlYWRlcj5cclxuICAgICAgICA8TW9kYWwuQm9keT5cclxuICAgICAgICAgIEFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUge3NlbGVjdGVkSXRlbXMubGVuZ3RofSBpdGVtXHJcbiAgICAgICAgICB7c2VsZWN0ZWRJdGVtcy5sZW5ndGggPiAxID8gXCJzXCIgOiBcIlwifT9cclxuICAgICAgICA8L01vZGFsLkJvZHk+XHJcbiAgICAgICAgPE1vZGFsLkZvb3Rlcj5cclxuICAgICAgICAgIDxCdXR0b24gdmFyaWFudD1cImRhbmdlclwiIG9uQ2xpY2s9e2hhbmRsZURlbGV0ZVNlbGVjdGVkfT5cclxuICAgICAgICAgICAgWWVzLCBkZWxldGVcclxuICAgICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICAgICAgPEJ1dHRvbiB2YXJpYW50PVwic2Vjb25kYXJ5XCIgb25DbGljaz17aGFuZGxlQ2xvc2VEZWxldGVNb2RhbH0+XHJcbiAgICAgICAgICAgIENhbmNlbFxyXG4gICAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgICAgPC9Nb2RhbC5Gb290ZXI+XHJcbiAgICAgIDwvTW9kYWw+XHJcblxyXG4gICAgICA8TW9kYWwgc2hvdz17c2hvd0NsaWVudE1vZGFsfSBvbkhpZGU9eygpID0+IHNldFNob3dDbGllbnRNb2RhbChmYWxzZSl9PlxyXG4gICAgICAgIDxNb2RhbC5IZWFkZXIgY2xvc2VCdXR0b24+XHJcbiAgICAgICAgICA8TW9kYWwuVGl0bGU+XHJcbiAgICAgICAgICAgIFNlbGVjdCB7Y2xpZW50U2VsZWN0aW9uVHlwZSA9PT0gXCJmcm9tXCIgPyBcIkNsaWVudCBGcm9tXCIgOiBcIkNsaWVudCBDdXJyZW50XCJ9XHJcbiAgICAgICAgICA8L01vZGFsLlRpdGxlPlxyXG4gICAgICAgIDwvTW9kYWwuSGVhZGVyPlxyXG4gICAgICAgIDxNb2RhbC5Cb2R5PlxyXG4gICAgICAgICAgPEZvcm1Db250cm9sXHJcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJTZWFyY2ggYnkgbmFtZVwiXHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1iLTNcIlxyXG4gICAgICAgICAgICB2YWx1ZT17Y2xpZW50U2VhcmNoVGVybX1cclxuICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRDbGllbnRTZWFyY2hUZXJtKGUudGFyZ2V0LnZhbHVlKX1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8Q2xpZW50VGFibGVcclxuICAgICAgICAgICAgY2xpZW50cz17KEFycmF5LmlzQXJyYXkoY2xpZW50cykgPyBjbGllbnRzIDogW10pLmZpbHRlcihcclxuICAgICAgICAgICAgICAoY2xpZW50KSA9PiAoY2xpZW50Py5uYW1lID8/IFwiXCIpLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoY2xpZW50U2VhcmNoVGVybS50b0xvd2VyQ2FzZSgpKVxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgICAgICBvblNlbGVjdENsaWVudD17aGFuZGxlQ2xpZW50U2VsZWN0fVxyXG4gICAgICAgICAgICBvbkluZm9DbGljaz17aGFuZGxlQ2xpZW50SW5mb31cclxuICAgICAgICAgICAgaXNDbGllbnRTZWFyY2g9e2ZhbHNlfVxyXG4gICAgICAgICAgICBjbGVhclNlbGVjdGlvbj17KCkgPT4gaGFuZGxlQ2xpZW50U2VsZWN0KG51bGwpfVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICA8L01vZGFsLkJvZHk+XHJcbiAgICAgIDwvTW9kYWw+XHJcblxyXG4gICAgICA8TW9kYWwgc2hvdz17c2hvd01vZGVsTW9kYWx9IG9uSGlkZT17KCkgPT4gc2V0U2hvd01vZGVsTW9kYWwoZmFsc2UpfT5cclxuICAgICAgICA8TW9kYWwuSGVhZGVyIGNsb3NlQnV0dG9uPlxyXG4gICAgICAgICAgPE1vZGFsLlRpdGxlPlNlbGVjdCBNb2RlbDwvTW9kYWwuVGl0bGU+XHJcbiAgICAgICAgPC9Nb2RhbC5IZWFkZXI+XHJcbiAgICAgICAgPE1vZGFsLkJvZHk+XHJcbiAgICAgICAgICA8Rm9ybUNvbnRyb2xcclxuICAgICAgICAgICAgdHlwZT1cInRleHRcIlxyXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlNlYXJjaCBieSBuYW1lXCJcclxuICAgICAgICAgICAgY2xhc3NOYW1lPVwibWItM1wiXHJcbiAgICAgICAgICAgIHZhbHVlPXttb2RlbFNlYXJjaFRlcm19XHJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0TW9kZWxTZWFyY2hUZXJtKGUudGFyZ2V0LnZhbHVlKX1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8TW9kZWxUYWJsZVxyXG4gICAgICAgICAgICBtb2RlbHM9e21vZGVscy5maWx0ZXIoKG1vZGVsKSA9PlxyXG4gICAgICAgICAgICAgIHR5cGVvZiBtb2RlbCA9PT0gXCJzdHJpbmdcIlxyXG4gICAgICAgICAgICAgICAgPyBtb2RlbC50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKG1vZGVsU2VhcmNoVGVybS50b0xvd2VyQ2FzZSgpKVxyXG4gICAgICAgICAgICAgICAgOiBmYWxzZVxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgICAgICBvblNlbGVjdE1vZGVsPXtoYW5kbGVNb2RlbFNlbGVjdH1cclxuICAgICAgICAgICAgY2xlYXJTZWxlY3Rpb249eygpID0+IGhhbmRsZU1vZGVsU2VsZWN0KG51bGwpfVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICA8L01vZGFsLkJvZHk+XHJcbiAgICAgIDwvTW9kYWw+XHJcblxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnBhZ2V9PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnBhZ2VJbm5lcn0+XG4gICAgICAgICAgPGhlYWRlciBjbGFzc05hbWU9e3N0eWxlcy5oZWFkZXJ9PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5oZWFkZXJMZWZ0fT5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17c3R5bGVzLmJ1cmdlcn1cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTaG93RmlsdGVycyh0cnVlKX1cbiAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPVwiT3BlbiBmaWx0ZXJzXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxzcGFuPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3Bhbj48L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4+PC9zcGFuPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5icmFuZH0+XG4gICAgICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICAgICAgc3JjPVwiL21hZ21vLWxvZ28ucG5nXCJcbiAgICAgICAgICAgICAgICAgIGFsdD1cIk1hZ21vXCJcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17c3R5bGVzLmJyYW5kTG9nb31cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmJyYW5kTmFtZX0+TWFnbW88L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuYnJhbmRTdWJ9PkludmVudG9yeSBTZWFyY2g8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuaGVhZGVyUmlnaHR9PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmhlYWRlclN0YXR1c30+XG4gICAgICAgICAgICAgICAge2hhc0FjdGl2ZUZpbHRlcnMgPyBcIkZpbHRlcnMgYWN0aXZlXCIgOiBcIkFsbCBpdGVtc1wifVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvaGVhZGVyPlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5jb250ZW50fT5cbiAgICAgICAgICAgIDxhc2lkZSBjbGFzc05hbWU9e3N0eWxlcy5zaWRlYmFyfT57cmVuZGVyRmlsdGVycyhcInNpZGViYXJcIil9PC9hc2lkZT5cbiAgICAgICAgICAgIDxtYWluIGNsYXNzTmFtZT17c3R5bGVzLm1haW59PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnRhYmxlQ2FyZH0+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy50YWJsZUhlYWRlcn0+XG4gICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnRhYmxlVGl0bGV9Pkl0ZW1zPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMudGFibGVTdWJ0aXRsZX0+XG4gICAgICAgICAgICAgICAgICAgICAge2lzTG9hZGluZyA/IFwiTG9hZGluZyBpdGVtc1wiIDogYCR7aW5mby5sZW5ndGh9IGl0ZW1zIG9uIHRoaXMgcGFnZWB9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnRhYmxlTWV0YX0+XG4gICAgICAgICAgICAgICAgICAgIFBhZ2Uge3BhZ2V9IHtoYXNOZXh0UGFnZSA/IGBvZiAke3RvdGFsS25vd25QYWdlc30rYCA6IGBvZiAke3RvdGFsS25vd25QYWdlc31gfVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnRhYmxlQm9keX0gcmVmPXt0YWJsZUJvZHlSZWZ9PlxuICAgICAgICAgICAgICAgICAge2lzTG9hZGluZyA/IChcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5sb2FkaW5nU3RhdGV9PlxuICAgICAgICAgICAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgICAgICAgICAgIHNyYz1cIi9tYWdtby1sb2dvLnBuZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICBhbHQ9XCJMb2FkaW5nIE1hZ21vXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17c3R5bGVzLmxvYWRpbmdMb2dvfVxuICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5sb2FkaW5nVGV4dH0+TG9hZGluZzwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICkgOiBsb2FkRXJyb3IgPyAoXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuZXJyb3JTdGF0ZX0+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5lcnJvclRpdGxlfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIExvYWQgZmFpbGVkICh7bG9hZEVycm9yLmNvZGV9KVxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuZXJyb3JNZXNzYWdlfT57bG9hZEVycm9yLm1lc3NhZ2V9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFudD1cIm91dGxpbmUtc2Vjb25kYXJ5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpemU9XCJzbVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJlc2V0UGFnaW5hdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRRdWVyeUVwb2NoKCh2KSA9PiB2ICsgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIFJldHJ5XG4gICAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICAgPFBhcnRUYWJsZVxuICAgICAgICAgICAgICAgICAgICAgIGluZm89e2luZm99XG4gICAgICAgICAgICAgICAgICAgICAgbGFiZWxzPXtsYWJlbHN9XG4gICAgICAgICAgICAgICAgICAgICAgaWRzPXtpZHN9XG4gICAgICAgICAgICAgICAgICAgICAgaG92ZXJTdHlsZT17aG92ZXJTdHlsZX1cbiAgICAgICAgICAgICAgICAgICAgICBzb3J0Q2hlY2tBbGw9e3NvcnRDaGVja0FsbH1cbiAgICAgICAgICAgICAgICAgICAgICBjaGVja0RlbGV0ZT17Y2hlY2tEZWxldGV9XG4gICAgICAgICAgICAgICAgICAgICAgaXNEZWxldGluZz17aXNEZWxldGluZ31cbiAgICAgICAgICAgICAgICAgICAgICByb3dTZWxlY3Q9e3Jvd1NlbGVjdH1cbiAgICAgICAgICAgICAgICAgICAgICBzZXRIb3ZlckluZGV4PXtzZXRIb3ZlckluZGV4fVxuICAgICAgICAgICAgICAgICAgICAgIGhvdmVySW5kZXg9e2hvdmVySW5kZXh9XG4gICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRJdGVtcz17c2VsZWN0ZWRJdGVtc31cbiAgICAgICAgICAgICAgICAgICAgICBzZXRTZWxlY3RlZEl0ZW1zPXtzZXRTZWxlY3RlZEl0ZW1zfVxuICAgICAgICAgICAgICAgICAgICAgIG1pblJvd3M9e3BhZ2VTaXplfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMudGFibGVGb290ZXJ9PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5wYWdpbmF0aW9uUm93fT5cbiAgICAgICAgICAgICAgICAgICAgPFBhZ2luYXRpb24gc2l6ZT1cInNtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPFBhZ2luYXRpb24uUHJldlxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0UGFnZSgocCkgPT4gTWF0aC5tYXgoMSwgcCAtIDEpKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtwYWdlIDw9IDF9XG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgUHJldmlvdXNcbiAgICAgICAgICAgICAgICAgICAgICA8L1BhZ2luYXRpb24uUHJldj5cbiAgICAgICAgICAgICAgICAgICAgICB7cGFnZUJ1dHRvbnN9XG4gICAgICAgICAgICAgICAgICAgICAgPFBhZ2luYXRpb24uTmV4dFxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0UGFnZSgocCkgPT4gcCArIDEpfVxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFoYXNOZXh0UGFnZX1cbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICBOZXh0XG4gICAgICAgICAgICAgICAgICAgICAgPC9QYWdpbmF0aW9uLk5leHQ+XG4gICAgICAgICAgICAgICAgICAgIDwvUGFnaW5hdGlvbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPEZvcm0gY2xhc3NOYW1lPXtzdHlsZXMuc2VhcmNoUm93fT5cbiAgICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sXG4gICAgICAgICAgICAgICAgICAgICAgdHlwZT17c2hvd0xpc3RTZWFyY2h9XG4gICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJTZWFyY2hcIlxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17c3R5bGVzLnNlYXJjaElucHV0fVxuICAgICAgICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJTZWFyY2hcIlxuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtzZWFyY2h9XG4gICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3NlYXJjaENoYW5nZUhhbmRsZXJ9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDxOYXZEcm9wZG93blxuICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPXtzZWxlY3R9XG4gICAgICAgICAgICAgICAgICAgICAgaWQ9XCJjb2xsYXNpYmxlLW5hdi1kcm9wZG93blwiXG4gICAgICAgICAgICAgICAgICAgICAgc2hvdz17c2hvd0xpc3R9XG4gICAgICAgICAgICAgICAgICAgICAgb25Nb3VzZUVudGVyPXsoKSA9PiBzZXRTaG93TGlzdCh0cnVlKX1cbiAgICAgICAgICAgICAgICAgICAgICBvbk1vdXNlTGVhdmU9eygpID0+IHNldFNob3dMaXN0KGZhbHNlKX1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5zZWFyY2hTZWxlY3R9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICA8TmF2RHJvcGRvd24uSXRlbVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTZWxlY3QoXCJOYW1lXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTaG93TGlzdFNlYXJjaChcInRleHRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIE5hbWVcbiAgICAgICAgICAgICAgICAgICAgICA8L05hdkRyb3Bkb3duLkl0ZW0+XG4gICAgICAgICAgICAgICAgICAgICAgPE5hdkRyb3Bkb3duLkl0ZW1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2VsZWN0KFwiRGF0ZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2hvd0xpc3RTZWFyY2goXCJkYXRlXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICBEYXRlXG4gICAgICAgICAgICAgICAgICAgICAgPC9OYXZEcm9wZG93bi5JdGVtPlxuICAgICAgICAgICAgICAgICAgICAgIDxOYXZEcm9wZG93bi5JdGVtXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNlbGVjdChcIldvcmsgT3JkZXJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNob3dMaXN0U2VhcmNoKFwidGV4dFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgV29yayBPcmRlclxuICAgICAgICAgICAgICAgICAgICAgIDwvTmF2RHJvcGRvd24uSXRlbT5cbiAgICAgICAgICAgICAgICAgICAgICA8TmF2RHJvcGRvd24uSXRlbVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTZWxlY3QoXCJQcm9kdWN0IE51bWJlclwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2hvd0xpc3RTZWFyY2goXCJ0ZXh0XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICBQcm9kdWN0IE51bWJlclxuICAgICAgICAgICAgICAgICAgICAgIDwvTmF2RHJvcGRvd24uSXRlbT5cbiAgICAgICAgICAgICAgICAgICAgICA8TmF2RHJvcGRvd24uSXRlbVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTZWxlY3QoXCJTZXJpYWwgTnVtYmVyXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTaG93TGlzdFNlYXJjaChcInRleHRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIFNlcmlhbCBOdW1iZXJcbiAgICAgICAgICAgICAgICAgICAgICA8L05hdkRyb3Bkb3duLkl0ZW0+XG4gICAgICAgICAgICAgICAgICAgICAgPE5hdkRyb3Bkb3duLkl0ZW1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2VsZWN0KFwiRGVzY3JpcHRpb25cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNob3dMaXN0U2VhcmNoKFwidGV4dFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgRGVzY3JpcHRpb25cbiAgICAgICAgICAgICAgICAgICAgICA8L05hdkRyb3Bkb3duLkl0ZW0+XG4gICAgICAgICAgICAgICAgICAgICAgPE5hdkRyb3Bkb3duLkl0ZW1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2VsZWN0KFwiU0tVXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTaG93TGlzdFNlYXJjaChcInRleHRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIFNLVVxuICAgICAgICAgICAgICAgICAgICAgIDwvTmF2RHJvcGRvd24uSXRlbT5cbiAgICAgICAgICAgICAgICAgICAgPC9OYXZEcm9wZG93bj5cbiAgICAgICAgICAgICAgICAgIDwvRm9ybT5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuZm9vdGVyQWN0aW9uc30+XG4gICAgICAgICAgICAgICAgICAgIDxMb2FkaW5nQnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInNlY29uZGFyeVwiXG4gICAgICAgICAgICAgICAgICAgICAgbmFtZT1cIkFkZCBOZXcgSXRlbVwiXG4gICAgICAgICAgICAgICAgICAgICAgcm91dGU9XCJOZXdTZWFyY2gvQWRkSXRlbS9OZXdJdGVtXCJcbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5hY3Rpb25CdXR0b259XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgICB2YXJpYW50PVwiaW5mb1wiXG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgJHtzdHlsZXMuYWN0aW9uQnV0dG9ufSAke3N0eWxlcy5tYXBBY3Rpb25CdXR0b259YH1cbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtvcGVuTWFwfVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgTWFwXG4gICAgICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8TG9hZGluZ0J1dHRvblxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJwcmltYXJ5XCJcbiAgICAgICAgICAgICAgICAgICAgICBuYW1lPVwiQmFja1wiXG4gICAgICAgICAgICAgICAgICAgICAgcm91dGU9XCJXYXJlaG91c2VkYi9XYXJlaG91c2VTZWxlY3RcIlxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17c3R5bGVzLmFjdGlvbkJ1dHRvbn1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvbWFpbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPE9mZmNhbnZhc1xuICAgICAgICAgIHNob3c9e3Nob3dGaWx0ZXJzfVxuICAgICAgICAgIG9uSGlkZT17KCkgPT4gc2V0U2hvd0ZpbHRlcnMoZmFsc2UpfVxuICAgICAgICAgIHBsYWNlbWVudD1cInN0YXJ0XCJcbiAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5maWx0ZXJzRHJhd2VyfVxuICAgICAgICAgIHNjcm9sbFxuICAgICAgICAgIGJhY2tkcm9wXG4gICAgICAgID5cbiAgICAgICAgICA8T2ZmY2FudmFzLkhlYWRlciBjbG9zZUJ1dHRvbj5cbiAgICAgICAgICAgIDxPZmZjYW52YXMuVGl0bGU+RmlsdGVyczwvT2ZmY2FudmFzLlRpdGxlPlxuICAgICAgICAgIDwvT2ZmY2FudmFzLkhlYWRlcj5cbiAgICAgICAgICA8T2ZmY2FudmFzLkJvZHk+e3JlbmRlckZpbHRlcnMoXCJkcmF3ZXJcIil9PC9PZmZjYW52YXMuQm9keT5cbiAgICAgICAgPC9PZmZjYW52YXM+XG5cbiAgICAgICAgPFdhcmVob3VzZU1hcE1vZGFsXG4gICAgICAgICAgc2hvdz17c2hvd01hcH1cbiAgICAgICAgICBvbkhpZGU9eygpID0+IHNldFNob3dNYXAoZmFsc2UpfVxuICAgICAgICAgIG9uVmlldz17aGFuZGxlTWFwVmlld31cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgIDwvTG9nZ2VkSW4+XG4gICk7XG5cclxuXHJcbn1cclxuXHJcbiIsIi8vIEV4cG9ydHNcbm1vZHVsZS5leHBvcnRzID0ge1xuXHRcImNsaWVudFRhYmxlQ29udGFpbmVyXCI6IFwiQ2xpZW50VGFibGVfY2xpZW50VGFibGVDb250YWluZXJfXzFlOXVuXCIsXG5cdFwiY2xpZW50VGFibGVcIjogXCJDbGllbnRUYWJsZV9jbGllbnRUYWJsZV9fMTk0djdcIixcblx0XCJhY3Rpb25Sb3dcIjogXCJDbGllbnRUYWJsZV9hY3Rpb25Sb3dfXzlFZktLXCIsXG5cdFwiYWN0aW9uQnV0dG9uc1wiOiBcIkNsaWVudFRhYmxlX2FjdGlvbkJ1dHRvbnNfXzFWdGdnXCIsXG5cdFwiYnV0dG9uR3JvdXBcIjogXCJDbGllbnRUYWJsZV9idXR0b25Hcm91cF9fcFNaN3lcIixcblx0XCJmbGV4QnV0dG9uXCI6IFwiQ2xpZW50VGFibGVfZmxleEJ1dHRvbl9fTG9OaVNcIlxufTtcbiIsIi8vIEV4cG9ydHNcbm1vZHVsZS5leHBvcnRzID0ge1xuXHRcInBhZ2VcIjogXCJNYWluU2VhcmNoX3BhZ2VfXzNLV3JlXCIsXG5cdFwicGFnZUlubmVyXCI6IFwiTWFpblNlYXJjaF9wYWdlSW5uZXJfXzJGLURvXCIsXG5cdFwiaGVhZGVyXCI6IFwiTWFpblNlYXJjaF9oZWFkZXJfXzJYTC0wXCIsXG5cdFwiaGVhZGVyTGVmdFwiOiBcIk1haW5TZWFyY2hfaGVhZGVyTGVmdF9fMk5IbllcIixcblx0XCJidXJnZXJcIjogXCJNYWluU2VhcmNoX2J1cmdlcl9fMTZFOUdcIixcblx0XCJicmFuZFwiOiBcIk1haW5TZWFyY2hfYnJhbmRfXzFIbFQ4XCIsXG5cdFwiYnJhbmRMb2dvXCI6IFwiTWFpblNlYXJjaF9icmFuZExvZ29fXzFqemxWXCIsXG5cdFwiYnJhbmROYW1lXCI6IFwiTWFpblNlYXJjaF9icmFuZE5hbWVfXzNzcjZ6XCIsXG5cdFwiYnJhbmRTdWJcIjogXCJNYWluU2VhcmNoX2JyYW5kU3ViX18yV3g2SlwiLFxuXHRcImhlYWRlclJpZ2h0XCI6IFwiTWFpblNlYXJjaF9oZWFkZXJSaWdodF9fMWM3WGdcIixcblx0XCJoZWFkZXJTdGF0dXNcIjogXCJNYWluU2VhcmNoX2hlYWRlclN0YXR1c19fMzlEU0VcIixcblx0XCJjb250ZW50XCI6IFwiTWFpblNlYXJjaF9jb250ZW50X18zX2RQQ1wiLFxuXHRcInNpZGViYXJcIjogXCJNYWluU2VhcmNoX3NpZGViYXJfXzJRZThRXCIsXG5cdFwiZmlsdGVyc1BhbmVsXCI6IFwiTWFpblNlYXJjaF9maWx0ZXJzUGFuZWxfX19tVlNxXCIsXG5cdFwiZmlsdGVyc0hlYWRlclwiOiBcIk1haW5TZWFyY2hfZmlsdGVyc0hlYWRlcl9fMjd5dFhcIixcblx0XCJmaWx0ZXJzVGl0bGVcIjogXCJNYWluU2VhcmNoX2ZpbHRlcnNUaXRsZV9fMk9QY3JcIixcblx0XCJmaWx0ZXJzU3VidGl0bGVcIjogXCJNYWluU2VhcmNoX2ZpbHRlcnNTdWJ0aXRsZV9fMjEwR3lcIixcblx0XCJmaWx0ZXJzQmFkZ2VcIjogXCJNYWluU2VhcmNoX2ZpbHRlcnNCYWRnZV9fMlQ2WkNcIixcblx0XCJmaWx0ZXJTZWN0aW9uXCI6IFwiTWFpblNlYXJjaF9maWx0ZXJTZWN0aW9uX19uUW03bFwiLFxuXHRcImZpbHRlclNlY3Rpb25UaXRsZVwiOiBcIk1haW5TZWFyY2hfZmlsdGVyU2VjdGlvblRpdGxlX18zWW1SWFwiLFxuXHRcImlucHV0R3JvdXBcIjogXCJNYWluU2VhcmNoX2lucHV0R3JvdXBfXzI0eldiXCIsXG5cdFwiaW5wdXRCdXR0b25cIjogXCJNYWluU2VhcmNoX2lucHV0QnV0dG9uX18zQVEwa1wiLFxuXHRcImJ1dHRvbkdyb3VwXCI6IFwiTWFpblNlYXJjaF9idXR0b25Hcm91cF9fMUdXSTZcIixcblx0XCJmbGV4QnV0dG9uXCI6IFwiTWFpblNlYXJjaF9mbGV4QnV0dG9uX18zem5xRFwiLFxuXHRcIm1haW5cIjogXCJNYWluU2VhcmNoX21haW5fXzlxV21iXCIsXG5cdFwidGFibGVDYXJkXCI6IFwiTWFpblNlYXJjaF90YWJsZUNhcmRfX0hXUDAwXCIsXG5cdFwidGFibGVIZWFkZXJcIjogXCJNYWluU2VhcmNoX3RhYmxlSGVhZGVyX19IS1Vid1wiLFxuXHRcInRhYmxlVGl0bGVcIjogXCJNYWluU2VhcmNoX3RhYmxlVGl0bGVfXzJnRWVvXCIsXG5cdFwidGFibGVTdWJ0aXRsZVwiOiBcIk1haW5TZWFyY2hfdGFibGVTdWJ0aXRsZV9fMmNCNjRcIixcblx0XCJ0YWJsZU1ldGFcIjogXCJNYWluU2VhcmNoX3RhYmxlTWV0YV9fMzJHT3FcIixcblx0XCJ0YWJsZUJvZHlcIjogXCJNYWluU2VhcmNoX3RhYmxlQm9keV9fM29XY19cIixcblx0XCJ0YWJsZUZvb3RlclwiOiBcIk1haW5TZWFyY2hfdGFibGVGb290ZXJfX0Z2M3p3XCIsXG5cdFwicGFnaW5hdGlvblJvd1wiOiBcIk1haW5TZWFyY2hfcGFnaW5hdGlvblJvd19fM3BwZEVcIixcblx0XCJzZWFyY2hSb3dcIjogXCJNYWluU2VhcmNoX3NlYXJjaFJvd19fMy02ZmRcIixcblx0XCJzZWFyY2hJbnB1dFwiOiBcIk1haW5TZWFyY2hfc2VhcmNoSW5wdXRfXzI1QTVVXCIsXG5cdFwic2VhcmNoU2VsZWN0XCI6IFwiTWFpblNlYXJjaF9zZWFyY2hTZWxlY3RfXzMwclBnXCIsXG5cdFwiZm9vdGVyQWN0aW9uc1wiOiBcIk1haW5TZWFyY2hfZm9vdGVyQWN0aW9uc19fMlhQUENcIixcblx0XCJhY3Rpb25CdXR0b25cIjogXCJNYWluU2VhcmNoX2FjdGlvbkJ1dHRvbl9fM20xTEpcIixcblx0XCJtYXBBY3Rpb25CdXR0b25cIjogXCJNYWluU2VhcmNoX21hcEFjdGlvbkJ1dHRvbl9fM3JIYjJcIixcblx0XCJsb2FkaW5nT3ZlcmxheVwiOiBcIk1haW5TZWFyY2hfbG9hZGluZ092ZXJsYXlfXzF3OVdXXCIsXG5cdFwic3Bpbm5lckNlbnRlclwiOiBcIk1haW5TZWFyY2hfc3Bpbm5lckNlbnRlcl9fMVJIbmpcIixcblx0XCJsb2FkaW5nU3RhdGVcIjogXCJNYWluU2VhcmNoX2xvYWRpbmdTdGF0ZV9faXNWLTRcIixcblx0XCJsb2FkaW5nTG9nb1wiOiBcIk1haW5TZWFyY2hfbG9hZGluZ0xvZ29fXzNTaDRpXCIsXG5cdFwibWFnbW8tc3BpblwiOiBcIk1haW5TZWFyY2hfbWFnbW8tc3Bpbl9fM2RGR1FcIixcblx0XCJsb2FkaW5nVGV4dFwiOiBcIk1haW5TZWFyY2hfbG9hZGluZ1RleHRfXzFDQ1FYXCIsXG5cdFwiZXJyb3JTdGF0ZVwiOiBcIk1haW5TZWFyY2hfZXJyb3JTdGF0ZV9fMUdsQjZcIixcblx0XCJlcnJvclRpdGxlXCI6IFwiTWFpblNlYXJjaF9lcnJvclRpdGxlX18xNTB1M1wiLFxuXHRcImVycm9yTWVzc2FnZVwiOiBcIk1haW5TZWFyY2hfZXJyb3JNZXNzYWdlX18xTGJiZ1wiLFxuXHRcImZpbHRlcnNEcmF3ZXJcIjogXCJNYWluU2VhcmNoX2ZpbHRlcnNEcmF3ZXJfX1E2Ti1tXCIsXG5cdFwibWFwTG9hZGluZ1wiOiBcIk1haW5TZWFyY2hfbWFwTG9hZGluZ19fMTcxZmdcIixcblx0XCJtYXBFcnJvclwiOiBcIk1haW5TZWFyY2hfbWFwRXJyb3JfXzJUUVVYXCIsXG5cdFwibWFwU3RhZ2VcIjogXCJNYWluU2VhcmNoX21hcFN0YWdlX18yNDVZYlwiLFxuXHRcIm1hcEhpbnRcIjogXCJNYWluU2VhcmNoX21hcEhpbnRfX3cxckxQXCIsXG5cdFwibWFwQ2FudmFzXCI6IFwiTWFpblNlYXJjaF9tYXBDYW52YXNfXzMzMWJIXCIsXG5cdFwicmVnaW9uQmxvY2tcIjogXCJNYWluU2VhcmNoX3JlZ2lvbkJsb2NrX19uNW5ucVwiLFxuXHRcInJlZ2lvbkVcIjogXCJNYWluU2VhcmNoX3JlZ2lvbkVfXzFSNGhUXCIsXG5cdFwicmVnaW9uRlwiOiBcIk1haW5TZWFyY2hfcmVnaW9uRl9fMVVsSTBcIixcblx0XCJyZWdpb25HXCI6IFwiTWFpblNlYXJjaF9yZWdpb25HX18ydzRPU1wiLFxuXHRcInJlZ2lvbkFcIjogXCJNYWluU2VhcmNoX3JlZ2lvbkFfXzNpakxhXCIsXG5cdFwicmVnaW9uRFwiOiBcIk1haW5TZWFyY2hfcmVnaW9uRF9fMy1OanhcIixcblx0XCJyZWdpb25DXCI6IFwiTWFpblNlYXJjaF9yZWdpb25DX19CVVNPWFwiLFxuXHRcInJlZ2lvbkJcIjogXCJNYWluU2VhcmNoX3JlZ2lvbkJfXzM1THc4XCIsXG5cdFwiZ3JpZFdyYXBwZXJcIjogXCJNYWluU2VhcmNoX2dyaWRXcmFwcGVyX19xSlkzbFwiLFxuXHRcImdyaWRcIjogXCJNYWluU2VhcmNoX2dyaWRfXzFMTFJlXCIsXG5cdFwiZ3JpZENlbGxcIjogXCJNYWluU2VhcmNoX2dyaWRDZWxsX19ab0Znc1wiLFxuXHRcImdyaWRDZWxsRGlzYWJsZWRcIjogXCJNYWluU2VhcmNoX2dyaWRDZWxsRGlzYWJsZWRfX2tTYXUwXCIsXG5cdFwicGFsbGV0R3JpZFwiOiBcIk1haW5TZWFyY2hfcGFsbGV0R3JpZF9fcUV0SzBcIixcblx0XCJwYWxsZXRCdXR0b25cIjogXCJNYWluU2VhcmNoX3BhbGxldEJ1dHRvbl9fMl84NllcIixcblx0XCJiaW5CdXR0b25cIjogXCJNYWluU2VhcmNoX2JpbkJ1dHRvbl9fMm90cXdcIixcblx0XCJtYXBFbXB0eVwiOiBcIk1haW5TZWFyY2hfbWFwRW1wdHlfXzJXejZoXCIsXG5cdFwibWFwRm9vdGVyXCI6IFwiTWFpblNlYXJjaF9tYXBGb290ZXJfXzFCb25yXCJcbn07XG4iLCIvLyBFeHBvcnRzXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0XCJ0YWJsZUNvbnRhaW5lclwiOiBcIlBhcnRUYWJsZV90YWJsZUNvbnRhaW5lcl9fMThUQ2dcIixcblx0XCJzY3JvbGxhYmxlVGFibGVcIjogXCJQYXJ0VGFibGVfc2Nyb2xsYWJsZVRhYmxlX18yVHliV1wiLFxuXHRcInN0aWNreUhlYWRlclwiOiBcIlBhcnRUYWJsZV9zdGlja3lIZWFkZXJfXzFISksxXCIsXG5cdFwic2VhcmNoQ29udGFpbmVyXCI6IFwiUGFydFRhYmxlX3NlYXJjaENvbnRhaW5lcl9fMnI3YWtcIixcblx0XCJkaXZpZGVyXCI6IFwiUGFydFRhYmxlX2RpdmlkZXJfXzFReENxXCIsXG5cdFwiYnV0dG9uR3JvdXBcIjogXCJQYXJ0VGFibGVfYnV0dG9uR3JvdXBfXzNaZk9PXCIsXG5cdFwiZmxleEJ1dHRvblwiOiBcIlBhcnRUYWJsZV9mbGV4QnV0dG9uX18ycG8yZVwiLFxuXHRcImZpeGVkVGFibGVcIjogXCJQYXJ0VGFibGVfZml4ZWRUYWJsZV9fM2hKQ2NcIixcblx0XCJjZWxsQ2xhbXBcIjogXCJQYXJ0VGFibGVfY2VsbENsYW1wX18zaXRYTVwiLFxuXHRcImFjdGlvbkNvbFwiOiBcIlBhcnRUYWJsZV9hY3Rpb25Db2xfXzJ4ZlBiXCIsXG5cdFwibG9uZ1ByZXNzT3ZlcmxheVwiOiBcIlBhcnRUYWJsZV9sb25nUHJlc3NPdmVybGF5X18xOUk1UFwiLFxuXHRcImxvbmdQcmVzc0NhcmRcIjogXCJQYXJ0VGFibGVfbG9uZ1ByZXNzQ2FyZF9fMU51SHdcIlxufTtcbiIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IFRhYmxlLCBCdXR0b24gfSBmcm9tIFwicmVhY3QtYm9vdHN0cmFwXCI7XG5pbXBvcnQgc3R5bGVzIGZyb20gXCIuLi9zdHlsZXMvQ2xpZW50VGFibGUubW9kdWxlLmNzc1wiO1xuXG5jb25zdCBDbGllbnRUYWJsZSA9ICh7XG4gIGNsaWVudHMsXG4gIG9uU2VsZWN0Q2xpZW50LFxuICBvbkluZm9DbGljayxcbiAgY2xlYXJTZWxlY3Rpb24sXG4gIG9uQWRkQ2xpZW50LCAvLyBuZXcgcHJvcCBmb3IgYWRkLW5ldy1jbGllbnQgYWN0aW9uXG4gIGRpc2FibGVTZWxlY3QsXG4gIGRpc2FibGVJbmZvLFxuICBpc0NsaWVudFNlYXJjaCxcbn0pID0+IHtcbiAgY29uc3QgY29sdW1uQ291bnQgPVxuICAgIDEgKyAoZGlzYWJsZUluZm8gPyAwIDogMSkgKyAoZGlzYWJsZVNlbGVjdCA/IDAgOiAxKTtcbiAgY29uc3Qgc2hvd0FjdGlvbnMgPSBCb29sZWFuKGNsZWFyU2VsZWN0aW9uIHx8IG9uQWRkQ2xpZW50KTtcblxuICByZXR1cm4gKFxuICAgIDxUYWJsZSBzdHJpcGVkIGJvcmRlcmVkIGhvdmVyIHNpemU9XCJzbVwiIGNsYXNzTmFtZT17c3R5bGVzLmNsaWVudFRhYmxlfT5cbiAgICAgIDx0aGVhZD5cbiAgICAgICAgPHRyPlxuICAgICAgICAgIDx0aD5DbGllbnQgTmFtZTwvdGg+XG4gICAgICAgICAgeyFkaXNhYmxlSW5mbyAmJiA8dGg+SW5mbzwvdGg+fVxuICAgICAgICAgIHshZGlzYWJsZVNlbGVjdCAmJiA8dGg+U2VsZWN0PC90aD59XG4gICAgICAgIDwvdHI+XG4gICAgICA8L3RoZWFkPlxuICAgICAgPHRib2R5PlxuICAgICAgICB7c2hvd0FjdGlvbnMgJiYgKFxuICAgICAgICAgIDx0ciBjbGFzc05hbWU9e3N0eWxlcy5hY3Rpb25Sb3d9PlxuICAgICAgICAgICAgPHRkIGNvbFNwYW49e2NvbHVtbkNvdW50fT5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5hY3Rpb25CdXR0b25zfT5cbiAgICAgICAgICAgICAgICB7Y2xlYXJTZWxlY3Rpb24gJiYgKFxuICAgICAgICAgICAgICAgICAgPEJ1dHRvbiB2YXJpYW50PVwic2Vjb25kYXJ5XCIgb25DbGljaz17Y2xlYXJTZWxlY3Rpb259PlxuICAgICAgICAgICAgICAgICAgICBDbGVhciBTZWxlY3Rpb25cbiAgICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAge29uQWRkQ2xpZW50ICYmIChcbiAgICAgICAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgdmFyaWFudD1cInByaW1hcnlcIlxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtvbkFkZENsaWVudH1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibXMtMlwiXG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIEFkZCBOZXcgQ2xpZW50XG4gICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgPC90cj5cbiAgICAgICAgKX1cbiAgICAgICAge2NsaWVudHMubWFwKChjbGllbnQpID0+IChcbiAgICAgICAgICA8dHIga2V5PXtjbGllbnQuaWR9PlxuICAgICAgICAgICAgPHRkPntjbGllbnQubmFtZX08L3RkPlxuICAgICAgICAgICAgeyFkaXNhYmxlSW5mbyAmJiAoXG4gICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgICAgICB2YXJpYW50PVwiaW5mb1wiXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBvbkluZm9DbGljayhjbGllbnQuaWQsIGNsaWVudC5uYW1lKX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICB7aXNDbGllbnRTZWFyY2ggPyBcIkVkaXRcIiA6IFwiSW5mb1wifVxuICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIHshZGlzYWJsZVNlbGVjdCAmJiAoXG4gICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgICAgICB2YXJpYW50PVwicHJpbWFyeVwiXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBvblNlbGVjdENsaWVudChjbGllbnQuaWQpfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIFNlbGVjdFxuICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L3RyPlxuICAgICAgICApKX1cbiAgICAgIDwvdGJvZHk+XG4gICAgPC9UYWJsZT5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENsaWVudFRhYmxlO1xuIiwiLy8gY29tcG9uZW50cy9Nb2RlbFRhYmxlLmpzXG5pbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBUYWJsZSwgQnV0dG9uLCBGb3JtQ29udHJvbCB9IGZyb20gXCJyZWFjdC1ib290c3RyYXBcIjtcbmltcG9ydCBzdHlsZXMgZnJvbSBcIi4uL3N0eWxlcy9DbGllbnRUYWJsZS5tb2R1bGUuY3NzXCI7XG5cbmNvbnN0IE1vZGVsVGFibGUgPSAoeyBtb2RlbHMsIG9uU2VsZWN0TW9kZWwsIGNsZWFyU2VsZWN0aW9uIH0pID0+IHtcbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPFRhYmxlIHN0cmlwZWQgYm9yZGVyZWQgaG92ZXIgc2l6ZT1cInNtXCIgY2xhc3NOYW1lPXtzdHlsZXMubW9kZWxUYWJsZX0+XG4gICAgICAgIDx0aGVhZD5cbiAgICAgICAgICA8dHI+XG4gICAgICAgICAgICA8dGg+TW9kZWwgTmFtZTwvdGg+XG4gICAgICAgICAgICA8dGg+U2VsZWN0PC90aD5cbiAgICAgICAgICA8L3RyPlxuICAgICAgICA8L3RoZWFkPlxuICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgPHRyPlxuICAgICAgICAgICAgPHRkIGNvbFNwYW49XCIyXCIgc3R5bGU9e3sgdGV4dEFsaWduOiBcImNlbnRlclwiIH19PlxuICAgICAgICAgICAgICA8QnV0dG9uIHZhcmlhbnQ9XCJzZWNvbmRhcnlcIiBvbkNsaWNrPXtjbGVhclNlbGVjdGlvbn0+XG4gICAgICAgICAgICAgICAgQ2xlYXIgU2VsZWN0aW9uXG4gICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICA8L3RyPlxuICAgICAgICAgIHttb2RlbHMubWFwKChtb2RlbCwgaW5kZXgpID0+IChcbiAgICAgICAgICAgIDx0ciBrZXk9e2luZGV4fT5cbiAgICAgICAgICAgICAgPHRkPnttb2RlbH08L3RkPlxuICAgICAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICAgICAgPEJ1dHRvbiB2YXJpYW50PVwicHJpbWFyeVwiIG9uQ2xpY2s9eygpID0+IG9uU2VsZWN0TW9kZWwobW9kZWwpfT5cbiAgICAgICAgICAgICAgICAgIFNlbGVjdFxuICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC90Ym9keT5cbiAgICAgIDwvVGFibGU+XG4gICAgPC8+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBNb2RlbFRhYmxlO1xuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QsIHVzZVJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgVGFibGUsIEJ1dHRvbiwgRm9ybSB9IGZyb20gXCJyZWFjdC1ib290c3RyYXBcIjtcbmltcG9ydCB7IGZvcm1hdERhdGUgfSBmcm9tIFwiLi9mZXRjaEFzc29jaWF0aW9uc1wiO1xuaW1wb3J0IHN0eWxlcyBmcm9tIFwiLi4vc3R5bGVzL1BhcnRUYWJsZS5tb2R1bGUuY3NzXCI7XG5cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUGFydFRhYmxlKHtcbiAgaW5mbyxcbiAgbGFiZWxzLFxuICBpZHMsXG4gIGhvdmVyU3R5bGUsXG4gIHNvcnRDaGVja0FsbCxcbiAgY2hlY2tEZWxldGUsXG4gIGlzRGVsZXRpbmcsXG4gIHJvd1NlbGVjdCxcbiAgc2V0SG92ZXJJbmRleCxcbiAgaG92ZXJJbmRleCxcbiAgc2VsZWN0ZWRJdGVtcyxcbiAgc2V0U2VsZWN0ZWRJdGVtcyxcbiAgbWluUm93cyA9IDEwLFxufSkge1xuICAvLyBjb25zdCBbc2VsZWN0ZWRJdGVtcywgc2V0U2VsZWN0ZWRJdGVtc10gPSB1c2VTdGF0ZShbXSk7XG4gIGNvbnN0IFtsb25nUHJlc3NOYW1lLCBzZXRMb25nUHJlc3NOYW1lXSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbaXNNb2JpbGUsIHNldElzTW9iaWxlXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgcHJlc3NUaW1lclJlZiA9IHVzZVJlZihudWxsKTtcbiAgY29uc3QgbG9uZ1ByZXNzVHJpZ2dlcmVkUmVmID0gdXNlUmVmKGZhbHNlKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgIGNvbnN0IG1lZGlhID0gd2luZG93Lm1hdGNoTWVkaWEoXCIobWF4LXdpZHRoOiA2NDBweClcIik7XG4gICAgY29uc3QgdXBkYXRlID0gKCkgPT4gc2V0SXNNb2JpbGUobWVkaWEubWF0Y2hlcyk7XG4gICAgdXBkYXRlKCk7XG4gICAgaWYgKG1lZGlhLmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgIG1lZGlhLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgdXBkYXRlKTtcbiAgICAgIHJldHVybiAoKSA9PiBtZWRpYS5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIHVwZGF0ZSk7XG4gICAgfVxuICAgIG1lZGlhLmFkZExpc3RlbmVyKHVwZGF0ZSk7XG4gICAgcmV0dXJuICgpID0+IG1lZGlhLnJlbW92ZUxpc3RlbmVyKHVwZGF0ZSk7XG4gIH0sIFtdKTtcblxuICAvLyBUb2dnbGUgc2VsZWN0aW9uIG9mIGl0ZW1zXG4gIGNvbnN0IGhhbmRsZVNlbGVjdEl0ZW0gPSAoaWQpID0+IHtcbiAgICBzZXRTZWxlY3RlZEl0ZW1zKChwcmV2U2VsZWN0ZWRJdGVtcykgPT5cbiAgICAgIHByZXZTZWxlY3RlZEl0ZW1zLmluY2x1ZGVzKGlkKVxuICAgICAgICA/IHByZXZTZWxlY3RlZEl0ZW1zLmZpbHRlcigoaXRlbUlkKSA9PiBpdGVtSWQgIT09IGlkKVxuICAgICAgICA6IFsuLi5wcmV2U2VsZWN0ZWRJdGVtcywgaWRdXG4gICAgKTtcbiAgfTtcblxuICAvLyBIYW5kbGUgZGVsZXRlIGJ1dHRvbiBjbGljayBmb3Igc2VsZWN0ZWQgaXRlbXNcbiAgY29uc3QgaGFuZGxlRGVsZXRlU2VsZWN0ZWQgPSAoKSA9PiB7XG4gICAgaWYgKHNlbGVjdGVkSXRlbXMubGVuZ3RoID4gMCkge1xuICAgICAgY2hlY2tEZWxldGUobnVsbCwgbnVsbCwgc2VsZWN0ZWRJdGVtcywgXCJzZWxlY3RlZCBpdGVtc1wiKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3Qgc3RhcnRMb25nUHJlc3MgPSAobmFtZSkgPT4gKCkgPT4ge1xuICAgIGlmICghaXNNb2JpbGUpIHJldHVybjtcbiAgICBpZiAocHJlc3NUaW1lclJlZi5jdXJyZW50KSB7XG4gICAgICBjbGVhclRpbWVvdXQocHJlc3NUaW1lclJlZi5jdXJyZW50KTtcbiAgICB9XG4gICAgcHJlc3NUaW1lclJlZi5jdXJyZW50ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBsb25nUHJlc3NUcmlnZ2VyZWRSZWYuY3VycmVudCA9IHRydWU7XG4gICAgICBzZXRMb25nUHJlc3NOYW1lKG5hbWUpO1xuICAgIH0sIDQ1MCk7XG4gIH07XG5cbiAgY29uc3QgY2FuY2VsTG9uZ1ByZXNzID0gKCkgPT4ge1xuICAgIGlmIChwcmVzc1RpbWVyUmVmLmN1cnJlbnQpIHtcbiAgICAgIGNsZWFyVGltZW91dChwcmVzc1RpbWVyUmVmLmN1cnJlbnQpO1xuICAgICAgcHJlc3NUaW1lclJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZGlzbWlzc0xvbmdQcmVzcyA9ICgpID0+IHtcbiAgICBsb25nUHJlc3NUcmlnZ2VyZWRSZWYuY3VycmVudCA9IGZhbHNlO1xuICAgIHNldExvbmdQcmVzc05hbWUobnVsbCk7XG4gIH07XG5cbiAgY29uc3QgcGFkZGluZ0NvdW50ID0gTWF0aC5tYXgoMCwgbWluUm93cyAtIGluZm8ubGVuZ3RoKTtcblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnNjcm9sbGFibGVUYWJsZX0+XG4gICAgICAgIDxUYWJsZVxuICAgICAgICAgIHN0cmlwZWRcbiAgICAgICAgICBib3JkZXJlZFxuICAgICAgICAgIGhvdmVyXG4gICAgICAgICAgc2l6ZT1cInNtXCJcbiAgICAgICAgICBjbGFzc05hbWU9e2BtYi0wICR7c3R5bGVzLmZpeGVkVGFibGV9YH1cbiAgICAgICAgPlxuICAgICAgICAgIDx0aGVhZCBjbGFzc05hbWU9e3N0eWxlcy5zdGlja3lIZWFkZXJ9PlxuICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICB7bGFiZWxzLm1hcCgoaXRlbSwgaW5kZXgpID0+IChcbiAgICAgICAgICAgICAgICA8dGhcbiAgICAgICAgICAgICAgICAgIHN0eWxlPXtob3ZlclN0eWxlKGluZGV4KX1cbiAgICAgICAgICAgICAgICAgIG9uTW91c2VPdmVyPXsoKSA9PiBzZXRIb3ZlckluZGV4KGluZGV4KX1cbiAgICAgICAgICAgICAgICAgIG9uTW91c2VPdXQ9eygpID0+IHNldEhvdmVySW5kZXgobnVsbCl9XG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzb3J0Q2hlY2tBbGwoaW5kZXgpfVxuICAgICAgICAgICAgICAgICAga2V5PXtpbmRleH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICB7aXRlbX1cbiAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT17c3R5bGVzLmFjdGlvbkNvbH0gc3R5bGU9e3sgdGV4dEFsaWduOiBcImNlbnRlclwiIH19PlxuICAgICAgICAgICAgICAgIHtzZWxlY3RlZEl0ZW1zLmxlbmd0aCA+IDAgPyAoXG4gICAgICAgICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIHZhcmlhbnQ9XCJkYW5nZXJcIlxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVEZWxldGVTZWxlY3RlZH1cbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2lzRGVsZXRpbmd9XG4gICAgICAgICAgICAgICAgICAgIHNpemU9XCJzbVwiXG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIERlbGV0ZSBTZWxlY3RlZCAoe3NlbGVjdGVkSXRlbXMubGVuZ3RofSlcbiAgICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICBcInNlbGVjdFwiXG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICB7aW5mby5tYXAoKGl0ZW0sIGluZGV4KSA9PiAoXG4gICAgICAgICAgICAgIDx0clxuICAgICAgICAgICAgICAgIGtleT17aW5kZXh9XG4gICAgICAgICAgICAgICAgb25DbGljaz17KGUpID0+IHtcbiAgICAgICAgICAgICAgICAgIGlmIChsb25nUHJlc3NUcmlnZ2VyZWRSZWYuY3VycmVudCkge1xuICAgICAgICAgICAgICAgICAgICBsb25nUHJlc3NUcmlnZ2VyZWRSZWYuY3VycmVudCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAvLyBPbmx5IHRyaWdnZXIgcm93U2VsZWN0IGlmIHRoZSB0YXJnZXQgaXMgbm90IGEgY2hlY2tib3hcbiAgICAgICAgICAgICAgICAgIGlmIChlLnRhcmdldC50eXBlICE9PSBcImNoZWNrYm94XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgcm93U2VsZWN0KGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgb25Ub3VjaFN0YXJ0PXtzdGFydExvbmdQcmVzcyhpdGVtLm5hbWUpfVxuICAgICAgICAgICAgICAgIG9uVG91Y2hFbmQ9e2NhbmNlbExvbmdQcmVzc31cbiAgICAgICAgICAgICAgICBvblRvdWNoQ2FuY2VsPXtjYW5jZWxMb25nUHJlc3N9XG4gICAgICAgICAgICAgICAgb25Ub3VjaE1vdmU9e2NhbmNlbExvbmdQcmVzc31cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJjbGlja2FibGUtcm93XCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyB0ZXh0QWxpZ246IFwiY2VudGVyXCIsIGN1cnNvcjogXCJkZWZhdWx0XCIgfX0+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmNlbGxDbGFtcH0gdGl0bGU9e2l0ZW0ubmFtZX0+XG4gICAgICAgICAgICAgICAgICAgIHtpdGVtLm5hbWV9XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyB0ZXh0QWxpZ246IFwiY2VudGVyXCIsIGN1cnNvcjogXCJkZWZhdWx0XCIgfX0+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmNlbGxDbGFtcH0gdGl0bGU9e2Zvcm1hdERhdGUoaXRlbS5kYXRlKX0+XG4gICAgICAgICAgICAgICAgICAgIHtmb3JtYXREYXRlKGl0ZW0uZGF0ZSl9XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyB0ZXh0QWxpZ246IFwiY2VudGVyXCIsIGN1cnNvcjogXCJkZWZhdWx0XCIgfX0+XG4gICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17c3R5bGVzLmNlbGxDbGFtcH1cbiAgICAgICAgICAgICAgICAgICAgdGl0bGU9e1xuICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ud29ya09yZGVycyAmJiBpdGVtLndvcmtPcmRlcnMubGVuZ3RoID4gMFxuICAgICAgICAgICAgICAgICAgICAgICAgPyBpdGVtLndvcmtPcmRlcnNbaXRlbS53b3JrT3JkZXJzLmxlbmd0aCAtIDFdLndvcmtPcmRlclxuICAgICAgICAgICAgICAgICAgICAgICAgOiBcIk4vQVwiXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAge2l0ZW0ud29ya09yZGVycyAmJiBpdGVtLndvcmtPcmRlcnMubGVuZ3RoID4gMFxuICAgICAgICAgICAgICAgICAgICAgID8gaXRlbS53b3JrT3JkZXJzW2l0ZW0ud29ya09yZGVycy5sZW5ndGggLSAxXS53b3JrT3JkZXJcbiAgICAgICAgICAgICAgICAgICAgICA6IFwiTi9BXCJ9XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyB0ZXh0QWxpZ246IFwiY2VudGVyXCIsIGN1cnNvcjogXCJkZWZhdWx0XCIgfX0+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmNlbGxDbGFtcH0gdGl0bGU9e2l0ZW0ucG59PlxuICAgICAgICAgICAgICAgICAgICB7aXRlbS5wbn1cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHRleHRBbGlnbjogXCJjZW50ZXJcIiwgY3Vyc29yOiBcImRlZmF1bHRcIiB9fT5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuY2VsbENsYW1wfSB0aXRsZT17aXRlbS5zbn0+XG4gICAgICAgICAgICAgICAgICAgIHtpdGVtLnNufVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPXtzdHlsZXMuYWN0aW9uQ29sfSBzdHlsZT17eyB0ZXh0QWxpZ246IFwiY2VudGVyXCIgfX0+XG4gICAgICAgICAgICAgICAgICA8Rm9ybS5DaGVja1xuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgICAgICAgICAgICBjaGVja2VkPXtzZWxlY3RlZEl0ZW1zLmluY2x1ZGVzKGl0ZW0uaWQpfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpOyAvLyBQcmV2ZW50IHJvdyBjbGljayB3aGVuIGNoZWNrYm94IGlzIGNsaWNrZWRcbiAgICAgICAgICAgICAgICAgICAgICAvLyBUb2dnbGUgc2VsZWN0aW9uIHVzaW5nIGl0ZW0uaWQgZGlyZWN0bHlcbiAgICAgICAgICAgICAgICAgICAgICBzZXRTZWxlY3RlZEl0ZW1zKChwcmV2U2VsZWN0ZWRJdGVtcykgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZTZWxlY3RlZEl0ZW1zLmluY2x1ZGVzKGl0ZW0uaWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgID8gcHJldlNlbGVjdGVkSXRlbXMuZmlsdGVyKChpZCkgPT4gaWQgIT09IGl0ZW0uaWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDogWy4uLnByZXZTZWxlY3RlZEl0ZW1zLCBpdGVtLmlkXVxuICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2BTZWxlY3QgJHtpdGVtLm5hbWV9YH1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICkpfVxuICAgICAgICAgICAge3BhZGRpbmdDb3VudCA+IDAgJiZcbiAgICAgICAgICAgICAgQXJyYXkuZnJvbSh7IGxlbmd0aDogcGFkZGluZ0NvdW50IH0pLm1hcCgoXywgaW5kZXgpID0+IChcbiAgICAgICAgICAgICAgICA8dHIga2V5PXtgZW1wdHktJHtpbmRleH1gfT5cbiAgICAgICAgICAgICAgICAgIDx0ZCBjb2xTcGFuPXtsYWJlbHMubGVuZ3RoICsgMX0gc3R5bGU9e3sgdGV4dEFsaWduOiBcImNlbnRlclwiIH19PlxuICAgICAgICAgICAgICAgICAgICAmbmJzcDtcbiAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgPC9UYWJsZT5cbiAgICAgIDwvZGl2PlxuICAgICAge2lzTW9iaWxlICYmIGxvbmdQcmVzc05hbWUgJiYgKFxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMubG9uZ1ByZXNzT3ZlcmxheX1cbiAgICAgICAgICBvbkNsaWNrPXtkaXNtaXNzTG9uZ1ByZXNzfVxuICAgICAgICAgIHJvbGU9XCJidXR0b25cIlxuICAgICAgICAgIHRhYkluZGV4PXswfVxuICAgICAgICA+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5sb25nUHJlc3NDYXJkfT57bG9uZ1ByZXNzTmFtZX08L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuICAgIDwvPlxuICApO1xufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IGZpcmViYXNlIGZyb20gXCIuLi9jb250ZXh0L0ZpcmViYXNlXCI7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmZXRjaFBhcnRzV2l0aE1hY2hpbmVEYXRhKCkge1xuICBjb25zdCBkYiA9IGZpcmViYXNlLmZpcmVzdG9yZSgpO1xuICBjb25zdCBwYXJ0c1NuYXBzaG90ID0gYXdhaXQgZGIuY29sbGVjdGlvbihcIlRlc3RcIikuZ2V0KCk7XG4gIGNvbnN0IHBhcnRzID0gYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgcGFydHNTbmFwc2hvdC5kb2NzLm1hcChhc3luYyAocGFydERvYykgPT4ge1xuICAgICAgY29uc3QgcGFydERhdGEgPSBwYXJ0RG9jLmRhdGEoKTtcbiAgICAgIHBhcnREYXRhLmlkID0gcGFydERvYy5pZDsgLy8gQWRkIGRvY3VtZW50IElEIGhlcmVcbiAgICAgIGNvbnN0IGdldFJlZklkID0gKHJlZikgPT4ge1xuICAgICAgICBpZiAoIXJlZikgcmV0dXJuIG51bGw7XG4gICAgICAgIGlmICh0eXBlb2YgcmVmID09PSBcInN0cmluZ1wiKSByZXR1cm4gcmVmO1xuICAgICAgICBpZiAocmVmIGluc3RhbmNlb2YgZmlyZWJhc2UuZmlyZXN0b3JlLkRvY3VtZW50UmVmZXJlbmNlKSByZXR1cm4gcmVmLmlkO1xuICAgICAgICBpZiAocmVmLmlkKSByZXR1cm4gcmVmLmlkO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH07XG4gICAgICBwYXJ0RGF0YS5jbGllbnRGcm9tSWQgPVxuICAgICAgICBnZXRSZWZJZChwYXJ0RGF0YT8uQ2xpZW50RnJvbSkgPz8gcGFydERhdGE/LmNsaWVudEZyb21JZCA/PyBudWxsO1xuICAgICAgcGFydERhdGEuY2xpZW50Q3VycmVudElkID1cbiAgICAgICAgZ2V0UmVmSWQocGFydERhdGE/LkNsaWVudEN1cnJlbnQpID8/IHBhcnREYXRhPy5jbGllbnRDdXJyZW50SWQgPz8gbnVsbDtcbiAgICAgIC8vIGNvbnNvbGUubG9nKHBhcnREYXRhKTtcbiAgICAgIGNvbnN0IGZldGNoTWFjaGluZURhdGEgPSBhc3luYyAocmVmKSA9PiB7XG4gICAgICAgIGlmICghcmVmKSByZXR1cm4gbnVsbDtcbiAgICAgICAgaWYgKHR5cGVvZiByZWYuZ2V0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICBjb25zdCBkb2MgPSBhd2FpdCByZWYuZ2V0KCk7XG4gICAgICAgICAgcmV0dXJuIGRvYy5leGlzdHMgPyBkb2MuZGF0YSgpIDogbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHJlZiA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgIGNvbnN0IGRvYyA9IGF3YWl0IGRiLmNvbGxlY3Rpb24oXCJNYWNoaW5lXCIpLmRvYyhyZWYpLmdldCgpO1xuICAgICAgICAgIHJldHVybiBkb2MuZXhpc3RzID8gZG9jLmRhdGEoKSA6IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlZj8uaWQpIHtcbiAgICAgICAgICBjb25zdCBkb2MgPSBhd2FpdCBkYi5jb2xsZWN0aW9uKFwiTWFjaGluZVwiKS5kb2MocmVmLmlkKS5nZXQoKTtcbiAgICAgICAgICByZXR1cm4gZG9jLmV4aXN0cyA/IGRvYy5kYXRhKCkgOiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfTtcblxuICAgICAgY29uc3QgbWFjaGluZVJlZiA9IHBhcnREYXRhLk1hY2hpbmUgfHwgcGFydERhdGEuTWFjaGluZUZyb207XG4gICAgICBjb25zdCBjdXJyZW50TWFjaGluZVJlZiA9XG4gICAgICAgIHBhcnREYXRhLkN1cnJlbnRNYWNoaW5lIHx8IHBhcnREYXRhLk1hY2hpbmVDdXJyZW50O1xuXG4gICAgICBjb25zdCBtYWNoaW5lRGF0YSA9IGF3YWl0IGZldGNoTWFjaGluZURhdGEobWFjaGluZVJlZik7XG4gICAgICBwYXJ0RGF0YS5tYWNoaW5lRGF0YSA9IG1hY2hpbmVEYXRhIHx8IHt9O1xuICAgICAgaWYgKG1hY2hpbmVEYXRhPy5jbGllbnQpIHtcbiAgICAgICAgY29uc3QgY2xpZW50UmVmID0gbWFjaGluZURhdGEuY2xpZW50O1xuICAgICAgICBjb25zdCBjbGllbnRJZCA9IGdldFJlZklkKGNsaWVudFJlZik7XG4gICAgICAgIGlmIChjbGllbnRJZCAmJiAhcGFydERhdGEuY2xpZW50RnJvbUlkKSB7XG4gICAgICAgICAgcGFydERhdGEuY2xpZW50RnJvbUlkID0gY2xpZW50SWQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBjbGllbnRSZWY/LmdldCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgY29uc3QgY2xpZW50RG9jID0gYXdhaXQgY2xpZW50UmVmLmdldCgpO1xuICAgICAgICAgIHBhcnREYXRhLm1hY2hpbmVEYXRhLkNsaWVudCA9IGNsaWVudERvYy5leGlzdHNcbiAgICAgICAgICAgID8gY2xpZW50RG9jLmRhdGEoKS5uYW1lXG4gICAgICAgICAgICA6IFwiXCI7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3QgY3VycmVudE1hY2hpbmVEYXRhID0gYXdhaXQgZmV0Y2hNYWNoaW5lRGF0YShjdXJyZW50TWFjaGluZVJlZik7XG4gICAgICBwYXJ0RGF0YS5jdXJyZW50TWFjaGluZURhdGEgPSBjdXJyZW50TWFjaGluZURhdGEgfHwge307XG4gICAgICBpZiAoY3VycmVudE1hY2hpbmVEYXRhPy5jbGllbnQpIHtcbiAgICAgICAgY29uc3QgY2xpZW50UmVmID0gY3VycmVudE1hY2hpbmVEYXRhLmNsaWVudDtcbiAgICAgICAgY29uc3QgY2xpZW50SWQgPSBnZXRSZWZJZChjbGllbnRSZWYpO1xuICAgICAgICBpZiAoY2xpZW50SWQgJiYgIXBhcnREYXRhLmNsaWVudEN1cnJlbnRJZCkge1xuICAgICAgICAgIHBhcnREYXRhLmNsaWVudEN1cnJlbnRJZCA9IGNsaWVudElkO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgY2xpZW50UmVmPy5nZXQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIGNvbnN0IGNsaWVudERvYyA9IGF3YWl0IGNsaWVudFJlZi5nZXQoKTtcbiAgICAgICAgICBwYXJ0RGF0YS5jdXJyZW50TWFjaGluZURhdGEuQ2xpZW50ID0gY2xpZW50RG9jLmV4aXN0c1xuICAgICAgICAgICAgPyBjbGllbnREb2MuZGF0YSgpLm5hbWVcbiAgICAgICAgICAgIDogXCJcIjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHBhcnREYXRhO1xuICAgIH0pXG4gICk7XG4gIHJldHVybiBwYXJ0cztcbn1cblxuLy8gUGFnaW5hdGVkIHZlcnNpb24gZm9yIGZhc3RlciBsaXN0IHZpZXdzIChlLmcuLCBtYWluU2VhcmNoKS5cbi8vIFVzZXMgZG9jdW1lbnRJZCBvcmRlciBmb3Igc3RhYmxlIHBhZ2luYXRpb24uXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZmV0Y2hQYXJ0c1dpdGhNYWNoaW5lRGF0YVBhZ2Uoe1xuICBwYWdlU2l6ZSA9IDI1LFxuICBzdGFydEFmdGVyRG9jID0gbnVsbCxcbiAgdmlzaWJsZU9ubHkgPSBmYWxzZSxcbiAgZmlsdGVyRm4gPSBudWxsLFxuICBuZWVkc01hY2hpbmVEYXRhID0gdHJ1ZSxcbiAgc2VhcmNoID0gbnVsbCxcbn0gPSB7fSkge1xuICBjb25zdCBkYiA9IGZpcmViYXNlLmZpcmVzdG9yZSgpO1xuICBjb25zdCBsaW1pdCA9IHBhZ2VTaXplICsgMTtcblxuICBjb25zdCBnZXRSZWZJZCA9IChyZWYpID0+IHtcbiAgICBpZiAoIXJlZikgcmV0dXJuIG51bGw7XG4gICAgaWYgKHR5cGVvZiByZWYgPT09IFwic3RyaW5nXCIpIHJldHVybiByZWY7XG4gICAgaWYgKHJlZiBpbnN0YW5jZW9mIGZpcmViYXNlLmZpcmVzdG9yZS5Eb2N1bWVudFJlZmVyZW5jZSkgcmV0dXJuIHJlZi5pZDtcbiAgICBpZiAocmVmLmlkKSByZXR1cm4gcmVmLmlkO1xuICAgIHJldHVybiBudWxsO1xuICB9O1xuXG4gIGNvbnN0IE1BQ0hJTkVfU0VMRUNUX0ZJRUxEUyA9IFtcIk9FTVwiLCBcIk1vZGFsaXR5XCIsIFwiTW9kZWxcIiwgXCJjbGllbnRcIiwgXCJuYW1lXCJdO1xuICBjb25zdCB3aXRoTWFjaGluZVNlbGVjdCA9IChxdWVyeSkgPT5cbiAgICB0eXBlb2YgcXVlcnkuc2VsZWN0ID09PSBcImZ1bmN0aW9uXCJcbiAgICAgID8gcXVlcnkuc2VsZWN0KC4uLk1BQ0hJTkVfU0VMRUNUX0ZJRUxEUylcbiAgICAgIDogcXVlcnk7XG5cbiAgY29uc3QgYnVpbGRQYXJ0ID0gKHBhcnREb2MsIG1hY2hpbmVNYXAsIGN1cnJlbnRNYWNoaW5lTWFwKSA9PiB7XG4gICAgY29uc3QgcGFydERhdGEgPSBwYXJ0RG9jLmRhdGEoKTtcbiAgICBwYXJ0RGF0YS5pZCA9IHBhcnREb2MuaWQ7IC8vIEFkZCBkb2N1bWVudCBJRCBoZXJlXG4gICAgcGFydERhdGEuY2xpZW50RnJvbUlkID1cbiAgICAgIGdldFJlZklkKHBhcnREYXRhPy5DbGllbnRGcm9tKSA/PyBwYXJ0RGF0YT8uY2xpZW50RnJvbUlkID8/IG51bGw7XG4gICAgcGFydERhdGEuY2xpZW50Q3VycmVudElkID1cbiAgICAgIGdldFJlZklkKHBhcnREYXRhPy5DbGllbnRDdXJyZW50KSA/PyBwYXJ0RGF0YT8uY2xpZW50Q3VycmVudElkID8/IG51bGw7XG5cbiAgICBjb25zdCBtYWNoaW5lUmVmID0gcGFydERhdGEuTWFjaGluZSB8fCBwYXJ0RGF0YS5NYWNoaW5lRnJvbTtcbiAgICBjb25zdCBjdXJyZW50TWFjaGluZVJlZiA9XG4gICAgICBwYXJ0RGF0YS5DdXJyZW50TWFjaGluZSB8fCBwYXJ0RGF0YS5NYWNoaW5lQ3VycmVudDtcblxuICAgIGNvbnN0IG1hY2hpbmVJZCA9IGdldFJlZklkKG1hY2hpbmVSZWYpO1xuICAgIGNvbnN0IGN1cnJlbnRNYWNoaW5lSWQgPSBnZXRSZWZJZChjdXJyZW50TWFjaGluZVJlZik7XG5cbiAgICBjb25zdCBtYWNoaW5lRGF0YSA9IG1hY2hpbmVJZCA/IG1hY2hpbmVNYXBbbWFjaGluZUlkXSA6IG51bGw7XG4gICAgY29uc3QgY3VycmVudE1hY2hpbmVEYXRhID0gY3VycmVudE1hY2hpbmVJZFxuICAgICAgPyBjdXJyZW50TWFjaGluZU1hcFtjdXJyZW50TWFjaGluZUlkXVxuICAgICAgOiBudWxsO1xuXG4gICAgcGFydERhdGEubWFjaGluZURhdGEgPSBtYWNoaW5lRGF0YSB8fCB7fTtcbiAgICBwYXJ0RGF0YS5jdXJyZW50TWFjaGluZURhdGEgPSBjdXJyZW50TWFjaGluZURhdGEgfHwge307XG5cbiAgICBpZiAoIXBhcnREYXRhLmNsaWVudEZyb21JZCAmJiBtYWNoaW5lRGF0YT8uY2xpZW50KSB7XG4gICAgICBwYXJ0RGF0YS5jbGllbnRGcm9tSWQgPSBnZXRSZWZJZChtYWNoaW5lRGF0YS5jbGllbnQpO1xuICAgIH1cbiAgICBpZiAoIXBhcnREYXRhLmNsaWVudEN1cnJlbnRJZCAmJiBjdXJyZW50TWFjaGluZURhdGE/LmNsaWVudCkge1xuICAgICAgcGFydERhdGEuY2xpZW50Q3VycmVudElkID0gZ2V0UmVmSWQoY3VycmVudE1hY2hpbmVEYXRhLmNsaWVudCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhcnREYXRhO1xuICB9O1xuXG4gIGNvbnN0IHNlYXJjaFJhdyA9IChzZWFyY2g/LnJhdyB8fCBcIlwiKS50b1N0cmluZygpLnRyaW0oKTtcbiAgY29uc3Qgc2VhcmNoTG93ZXIgPSAoc2VhcmNoPy5sb3dlciB8fCBcIlwiKS50b1N0cmluZygpLnRyaW0oKTtcbiAgY29uc3Qgc2VhcmNoVHlwZSA9IHNlYXJjaD8udHlwZSB8fCBudWxsO1xuICBjb25zdCBoYXNTZWFyY2ggPSBCb29sZWFuKHNlYXJjaFJhdyk7XG5cbiAgY29uc3QgdG9UaXRsZUNhc2UgPSAodGV4dCkgPT5cbiAgICB0ZXh0XG4gICAgICAuc3BsaXQoXCIgXCIpXG4gICAgICAuZmlsdGVyKEJvb2xlYW4pXG4gICAgICAubWFwKCh3b3JkKSA9PiB3b3JkLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgd29yZC5zbGljZSgxKSlcbiAgICAgIC5qb2luKFwiIFwiKTtcblxuICBjb25zdCBidWlsZFNlYXJjaFF1ZXJ5ID0gKCkgPT4ge1xuICAgIGlmICghaGFzU2VhcmNoIHx8ICFzZWFyY2hUeXBlKSByZXR1cm4geyBtb2RlOiBcInNjYW5cIiwgcXVlcnk6IG51bGwgfTtcbiAgICBjb25zdCBjb2wgPSBkYi5jb2xsZWN0aW9uKFwiVGVzdFwiKTtcblxuICAgIHN3aXRjaCAoc2VhcmNoVHlwZSkge1xuICAgICAgY2FzZSBcIlNLVVwiOlxuICAgICAgICByZXR1cm4geyBtb2RlOiBcInNrdVwiLCBxdWVyeTogbnVsbCB9O1xuICAgICAgY2FzZSBcIk5hbWVcIjoge1xuICAgICAgICBjb25zdCB0aXRsZUZhbGxiYWNrID1cbiAgICAgICAgICBzZWFyY2hSYXcgJiYgc2VhcmNoUmF3ID09PSBzZWFyY2hSYXcudG9Mb3dlckNhc2UoKVxuICAgICAgICAgICAgPyB0b1RpdGxlQ2FzZShzZWFyY2hSYXcpXG4gICAgICAgICAgICA6IG51bGw7XG4gICAgICAgIGNvbnN0IHRlcm1zID0gc2VhcmNoTG93ZXIgPyBzZWFyY2hMb3dlci5zcGxpdCgvXFxzKy8pLmZpbHRlcihCb29sZWFuKSA6IFtdO1xuICAgICAgICBjb25zdCB0b2tlbnMgPSBbLi4udGVybXNdO1xuICAgICAgICBpZiAoc2VhcmNoTG93ZXIgJiYgIXRva2Vucy5pbmNsdWRlcyhzZWFyY2hMb3dlcikpIHRva2Vucy5wdXNoKHNlYXJjaExvd2VyKTtcbiAgICAgICAgaWYgKCF0b2tlbnMubGVuZ3RoKSByZXR1cm4geyBtb2RlOiBcInNjYW5cIiwgcXVlcnk6IG51bGwgfTtcblxuICAgICAgICBjb25zdCBwcmVmaXhRdWVyeSA9ICh2YWx1ZSkgPT5cbiAgICAgICAgICBjb2wub3JkZXJCeShcIm5hbWVcIikuc3RhcnRBdCh2YWx1ZSkuZW5kQXQoYCR7dmFsdWV9XFx1ZjhmZmApO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgbW9kZTogXCJxdWVyeVwiLFxuICAgICAgICAgIHF1ZXJ5OlxuICAgICAgICAgICAgdG9rZW5zLmxlbmd0aCA9PT0gMVxuICAgICAgICAgICAgICA/IGNvbC53aGVyZShcIm5hbWVUb2tlbnNcIiwgXCJhcnJheS1jb250YWluc1wiLCB0b2tlbnNbMF0pXG4gICAgICAgICAgICAgIDogY29sLndoZXJlKFxuICAgICAgICAgICAgICAgICAgXCJuYW1lVG9rZW5zXCIsXG4gICAgICAgICAgICAgICAgICBcImFycmF5LWNvbnRhaW5zLWFueVwiLFxuICAgICAgICAgICAgICAgICAgdG9rZW5zLnNsaWNlKDAsIDEwKVxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgZmFsbGJhY2s6IHRpdGxlRmFsbGJhY2tcbiAgICAgICAgICAgID8gKCkgPT4gcHJlZml4UXVlcnkodGl0bGVGYWxsYmFjaylcbiAgICAgICAgICAgIDogKCkgPT4gcHJlZml4UXVlcnkoc2VhcmNoUmF3KSxcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIGNhc2UgXCJQcm9kdWN0IE51bWJlclwiOlxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIG1vZGU6IFwicXVlcnlcIixcbiAgICAgICAgICBxdWVyeTogY29sLndoZXJlKFwicG5cIiwgXCJhcnJheS1jb250YWluc1wiLCBzZWFyY2hSYXcpLFxuICAgICAgICAgIGZhbGxiYWNrOiAoKSA9PiBjb2wud2hlcmUoXCJwblwiLCBcIj09XCIsIHNlYXJjaFJhdyksXG4gICAgICAgIH07XG4gICAgICBjYXNlIFwiU2VyaWFsIE51bWJlclwiOlxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIG1vZGU6IFwicXVlcnlcIixcbiAgICAgICAgICBxdWVyeTogY29sLndoZXJlKFwic25cIiwgXCJhcnJheS1jb250YWluc1wiLCBzZWFyY2hSYXcpLFxuICAgICAgICAgIGZhbGxiYWNrOiAoKSA9PiBjb2wud2hlcmUoXCJzblwiLCBcIj09XCIsIHNlYXJjaFJhdyksXG4gICAgICAgIH07XG4gICAgICBjYXNlIFwiRGF0ZVwiOiB7XG4gICAgICAgIGNvbnN0IGFzRGF0ZSA9ICgoKSA9PiB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IGQgPSBuZXcgRGF0ZShzZWFyY2hSYXcpO1xuICAgICAgICAgICAgcmV0dXJuIGlzTmFOKGQuZ2V0VGltZSgpKSA/IG51bGwgOiBkO1xuICAgICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICB9KSgpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIG1vZGU6IFwicXVlcnlcIixcbiAgICAgICAgICBxdWVyeTogY29sLndoZXJlKFwiZGF0ZVwiLCBcIj09XCIsIHNlYXJjaFJhdyksXG4gICAgICAgICAgZmFsbGJhY2s6IGFzRGF0ZSA/ICgpID0+IGNvbC53aGVyZShcImRhdGVcIiwgXCI9PVwiLCBhc0RhdGUpIDogbnVsbCxcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiB7IG1vZGU6IFwic2NhblwiLCBxdWVyeTogbnVsbCB9O1xuICAgIH1cbiAgfTtcblxuICBjb25zdCB7IG1vZGU6IHNlYXJjaE1vZGUsIHF1ZXJ5OiBzZWFyY2hRdWVyeSwgZmFsbGJhY2s6IHNlYXJjaEZhbGxiYWNrIH0gPVxuICAgIGJ1aWxkU2VhcmNoUXVlcnkoKTtcblxuICBpZiAoc2VhcmNoTW9kZSA9PT0gXCJza3VcIiAmJiBoYXNTZWFyY2gpIHtcbiAgICBjb25zdCBkb2NzID0gW107XG4gICAgY29uc3QgcmF3VXBwZXIgPSBzZWFyY2hSYXcudG9VcHBlckNhc2UoKTtcbiAgICBsZXQgZG9jID0gYXdhaXQgZGIuY29sbGVjdGlvbihcIlRlc3RcIikuZG9jKHNlYXJjaFJhdykuZ2V0KCk7XG4gICAgaWYgKCFkb2MuZXhpc3RzICYmIHJhd1VwcGVyICE9PSBzZWFyY2hSYXcpIHtcbiAgICAgIGRvYyA9IGF3YWl0IGRiLmNvbGxlY3Rpb24oXCJUZXN0XCIpLmRvYyhyYXdVcHBlcikuZ2V0KCk7XG4gICAgfVxuICAgIGlmIChkb2MuZXhpc3RzKSBkb2NzLnB1c2goZG9jKTtcblxuICAgIGNvbnN0IGxvY2FsVmFsdWVzID1cbiAgICAgIHJhd1VwcGVyICE9PSBzZWFyY2hSYXcgPyBbc2VhcmNoUmF3LCByYXdVcHBlcl0gOiBbc2VhcmNoUmF3XTtcbiAgICBjb25zdCBsb2NhbFNuYXAgPSBhd2FpdCBkYlxuICAgICAgLmNvbGxlY3Rpb24oXCJUZXN0XCIpXG4gICAgICAud2hlcmUoXCJsb2NhbFNOXCIsIFwiaW5cIiwgbG9jYWxWYWx1ZXMpXG4gICAgICAubGltaXQobGltaXQpXG4gICAgICAuZ2V0KCk7XG4gICAgbG9jYWxTbmFwLmZvckVhY2goKGQpID0+IHtcbiAgICAgIGlmICghZG9jcy5maW5kKChleGlzdGluZykgPT4gZXhpc3RpbmcuaWQgPT09IGQuaWQpKSB7XG4gICAgICAgIGRvY3MucHVzaChkKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGxldCBtYWNoaW5lTWFwID0ge307XG4gICAgbGV0IGN1cnJlbnRNYWNoaW5lTWFwID0ge307XG4gICAgaWYgKG5lZWRzTWFjaGluZURhdGEgJiYgZG9jcy5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IG1hY2hpbmVJZHMgPSBuZXcgU2V0KCk7XG4gICAgICBjb25zdCBjdXJyZW50TWFjaGluZUlkcyA9IG5ldyBTZXQoKTtcbiAgICAgIGZvciAoY29uc3QgZG9jU25hcCBvZiBkb2NzKSB7XG4gICAgICAgIGNvbnN0IHJhdyA9IGRvY1NuYXAuZGF0YSgpO1xuICAgICAgICBjb25zdCBtYWNoaW5lSWQgPSBnZXRSZWZJZChyYXcuTWFjaGluZSB8fCByYXcuTWFjaGluZUZyb20pO1xuICAgICAgICBjb25zdCBjdXJyZW50TWFjaGluZUlkID0gZ2V0UmVmSWQoXG4gICAgICAgICAgcmF3LkN1cnJlbnRNYWNoaW5lIHx8IHJhdy5NYWNoaW5lQ3VycmVudFxuICAgICAgICApO1xuICAgICAgICBpZiAobWFjaGluZUlkKSBtYWNoaW5lSWRzLmFkZChtYWNoaW5lSWQpO1xuICAgICAgICBpZiAoY3VycmVudE1hY2hpbmVJZCkgY3VycmVudE1hY2hpbmVJZHMuYWRkKGN1cnJlbnRNYWNoaW5lSWQpO1xuICAgICAgfVxuICAgICAgY29uc3QgZmV0Y2hNYWNoaW5lTWFwID0gYXN5bmMgKGlkcykgPT4ge1xuICAgICAgICBpZiAoIWlkcy5sZW5ndGgpIHJldHVybiB7fTtcbiAgICAgICAgY29uc3Qgb3V0ID0ge307XG4gICAgICAgIGNvbnN0IGNodW5rcyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGlkcy5sZW5ndGg7IGkgKz0gMTApIHtcbiAgICAgICAgICBjaHVua3MucHVzaChpZHMuc2xpY2UoaSwgaSArIDEwKSk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBjaHVuayBvZiBjaHVua3MpIHtcbiAgICAgICAgICBjb25zdCBzbmFwID0gYXdhaXQgd2l0aE1hY2hpbmVTZWxlY3QoXG4gICAgICAgICAgICBkYlxuICAgICAgICAgICAgICAuY29sbGVjdGlvbihcIk1hY2hpbmVcIilcbiAgICAgICAgICAgICAgLndoZXJlKGZpcmViYXNlLmZpcmVzdG9yZS5GaWVsZFBhdGguZG9jdW1lbnRJZCgpLCBcImluXCIsIGNodW5rKVxuICAgICAgICAgICkuZ2V0KCk7XG4gICAgICAgICAgc25hcC5mb3JFYWNoKChkb2NTbmFwKSA9PiB7XG4gICAgICAgICAgICBvdXRbZG9jU25hcC5pZF0gPSBkb2NTbmFwLmRhdGEoKSB8fCB7fTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3V0O1xuICAgICAgfTtcbiAgICAgIFttYWNoaW5lTWFwLCBjdXJyZW50TWFjaGluZU1hcF0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgIGZldGNoTWFjaGluZU1hcChbLi4ubWFjaGluZUlkc10pLFxuICAgICAgICBmZXRjaE1hY2hpbmVNYXAoWy4uLmN1cnJlbnRNYWNoaW5lSWRzXSksXG4gICAgICBdKTtcbiAgICB9XG5cbiAgICBjb25zdCBidWlsdCA9IGRvY3NcbiAgICAgIC5tYXAoKGRvY1NuYXApID0+IGJ1aWxkUGFydChkb2NTbmFwLCBtYWNoaW5lTWFwLCBjdXJyZW50TWFjaGluZU1hcCkpXG4gICAgICAuZmlsdGVyKChpdGVtKSA9PiAoIXZpc2libGVPbmx5IHx8IGl0ZW0/LnZpc2libGUgIT09IGZhbHNlKSlcbiAgICAgIC5maWx0ZXIoKGl0ZW0pID0+IChmaWx0ZXJGbiA/IGZpbHRlckZuKGl0ZW0pIDogdHJ1ZSkpXG4gICAgICAuc2xpY2UoMCwgcGFnZVNpemUpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHBhcnRzOiBidWlsdCxcbiAgICAgIGxhc3REb2M6IGJ1aWx0Lmxlbmd0aCA/IGRvY3NbYnVpbHQubGVuZ3RoIC0gMV0gOiBudWxsLFxuICAgICAgaGFzTmV4dFBhZ2U6IGZhbHNlLFxuICAgIH07XG4gIH1cblxuICBsZXQgcGFydHMgPSBbXTtcbiAgbGV0IGN1cnNvciA9IHN0YXJ0QWZ0ZXJEb2MgfHwgbnVsbDtcbiAgbGV0IGxhc3REb2MgPSBudWxsO1xuICBsZXQgcGFnZUxhc3REb2MgPSBudWxsO1xuICBsZXQgaGFzTmV4dFBhZ2UgPSBmYWxzZTtcbiAgbGV0IGZpbGxlZCA9IGZhbHNlO1xuICBsZXQgdXNlZEZhbGxiYWNrID0gZmFsc2U7XG4gIGNvbnN0IHNjYW5CYXNlUXVlcnkgPSBkYlxuICAgIC5jb2xsZWN0aW9uKFwiVGVzdFwiKVxuICAgIC5vcmRlckJ5KGZpcmViYXNlLmZpcmVzdG9yZS5GaWVsZFBhdGguZG9jdW1lbnRJZCgpKTtcblxuICB3aGlsZSAodHJ1ZSkge1xuICAgIGxldCBxdWVyeSA9IHNlYXJjaFF1ZXJ5IHx8IHNjYW5CYXNlUXVlcnk7XG4gICAgaWYgKHNlYXJjaE1vZGUgPT09IFwicXVlcnlcIiAmJiB1c2VkRmFsbGJhY2sgJiYgc2VhcmNoRmFsbGJhY2spIHtcbiAgICAgIHF1ZXJ5ID0gc2VhcmNoRmFsbGJhY2soKTtcbiAgICB9XG4gICAgaWYgKGN1cnNvcikgcXVlcnkgPSBxdWVyeS5zdGFydEFmdGVyKGN1cnNvcik7XG4gICAgcXVlcnkgPSBxdWVyeS5saW1pdChsaW1pdCk7XG5cbiAgICBjb25zdCBzbmFwID0gYXdhaXQgcXVlcnkuZ2V0KCk7XG4gICAgaWYgKHNuYXAuZW1wdHkpIHtcbiAgICAgIGlmIChzZWFyY2hNb2RlID09PSBcInF1ZXJ5XCIgJiYgc2VhcmNoRmFsbGJhY2sgJiYgIWN1cnNvciAmJiAhdXNlZEZhbGxiYWNrKSB7XG4gICAgICAgIHVzZWRGYWxsYmFjayA9IHRydWU7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaGFzTmV4dFBhZ2UgPSBmYWxzZTtcbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGNvbnN0IGJhdGNoRG9jcyA9IHNuYXAuZG9jcztcbiAgICBsZXQgbWFjaGluZU1hcCA9IHt9O1xuICAgIGxldCBjdXJyZW50TWFjaGluZU1hcCA9IHt9O1xuXG4gICAgaWYgKG5lZWRzTWFjaGluZURhdGEpIHtcbiAgICAgIGNvbnN0IG1hY2hpbmVJZHMgPSBuZXcgU2V0KCk7XG4gICAgICBjb25zdCBjdXJyZW50TWFjaGluZUlkcyA9IG5ldyBTZXQoKTtcbiAgICAgIGZvciAoY29uc3QgZG9jIG9mIGJhdGNoRG9jcykge1xuICAgICAgICBjb25zdCByYXcgPSBkb2MuZGF0YSgpO1xuICAgICAgICBpZiAodmlzaWJsZU9ubHkgJiYgcmF3LnZpc2libGUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbWFjaGluZUlkID0gZ2V0UmVmSWQocmF3Lk1hY2hpbmUgfHwgcmF3Lk1hY2hpbmVGcm9tKTtcbiAgICAgICAgY29uc3QgY3VycmVudE1hY2hpbmVJZCA9IGdldFJlZklkKFxuICAgICAgICAgIHJhdy5DdXJyZW50TWFjaGluZSB8fCByYXcuTWFjaGluZUN1cnJlbnRcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKG1hY2hpbmVJZCkgbWFjaGluZUlkcy5hZGQobWFjaGluZUlkKTtcbiAgICAgICAgaWYgKGN1cnJlbnRNYWNoaW5lSWQpIGN1cnJlbnRNYWNoaW5lSWRzLmFkZChjdXJyZW50TWFjaGluZUlkKTtcbiAgICAgIH1cblxuICAgICAgICBjb25zdCBmZXRjaE1hY2hpbmVNYXAgPSBhc3luYyAoaWRzKSA9PiB7XG4gICAgICAgICAgaWYgKCFpZHMubGVuZ3RoKSByZXR1cm4ge307XG4gICAgICAgICAgY29uc3Qgb3V0ID0ge307XG4gICAgICAgICAgY29uc3QgY2h1bmtzID0gW107XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpZHMubGVuZ3RoOyBpICs9IDEwKSB7XG4gICAgICAgICAgICBjaHVua3MucHVzaChpZHMuc2xpY2UoaSwgaSArIDEwKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGZvciAoY29uc3QgY2h1bmsgb2YgY2h1bmtzKSB7XG4gICAgICAgICAgICBjb25zdCBzbmFwID0gYXdhaXQgd2l0aE1hY2hpbmVTZWxlY3QoXG4gICAgICAgICAgICAgIGRiXG4gICAgICAgICAgICAgICAgLmNvbGxlY3Rpb24oXCJNYWNoaW5lXCIpXG4gICAgICAgICAgICAgICAgLndoZXJlKGZpcmViYXNlLmZpcmVzdG9yZS5GaWVsZFBhdGguZG9jdW1lbnRJZCgpLCBcImluXCIsIGNodW5rKVxuICAgICAgICAgICAgKS5nZXQoKTtcbiAgICAgICAgICAgIHNuYXAuZm9yRWFjaCgoZG9jKSA9PiB7XG4gICAgICAgICAgICAgIG91dFtkb2MuaWRdID0gZG9jLmRhdGEoKSB8fCB7fTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICAgIH07XG5cbiAgICAgIFttYWNoaW5lTWFwLCBjdXJyZW50TWFjaGluZU1hcF0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgIGZldGNoTWFjaGluZU1hcChbLi4ubWFjaGluZUlkc10pLFxuICAgICAgICBmZXRjaE1hY2hpbmVNYXAoWy4uLmN1cnJlbnRNYWNoaW5lSWRzXSksXG4gICAgICBdKTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNuYXAuZG9jcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgZG9jID0gYmF0Y2hEb2NzW2ldO1xuICAgICAgY3Vyc29yID0gZG9jO1xuXG4gICAgICBjb25zdCByYXcgPSBkb2MuZGF0YSgpO1xuICAgICAgaWYgKHZpc2libGVPbmx5ICYmIHJhdy52aXNpYmxlID09PSBmYWxzZSkge1xuICAgICAgICBjb250aW51ZTsgLy8gc2tpcCBoaWRkZW4gaXRlbXMgYnV0IGtlZXAgYWR2YW5jaW5nIHRoZSBjdXJzb3JcbiAgICAgIH1cblxuICAgICAgY29uc3QgYnVpbHQgPSBidWlsZFBhcnQoZG9jLCBtYWNoaW5lTWFwLCBjdXJyZW50TWFjaGluZU1hcCk7XG4gICAgICBpZiAoZmlsdGVyRm4gJiYgIWZpbHRlckZuKGJ1aWx0KSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFmaWxsZWQpIHtcbiAgICAgICAgcGFydHMucHVzaChidWlsdCk7XG4gICAgICAgIGlmIChwYXJ0cy5sZW5ndGggPT09IHBhZ2VTaXplKSB7XG4gICAgICAgICAgZmlsbGVkID0gdHJ1ZTtcbiAgICAgICAgICBwYWdlTGFzdERvYyA9IGRvYztcbiAgICAgICAgfVxuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgLy8gV2UgYWxyZWFkeSBmaWxsZWQgdGhlIHBhZ2UgYW5kIGZvdW5kIGFuIGV4dHJhIG1hdGNoaW5nIGl0ZW0uXG4gICAgICBoYXNOZXh0UGFnZSA9IHRydWU7XG4gICAgICByZXR1cm4geyBwYXJ0cywgbGFzdERvYzogcGFnZUxhc3REb2MsIGhhc05leHRQYWdlIH07XG4gICAgfVxuXG4gICAgLy8gV2UgZXhoYXVzdGVkIHRoaXMgYmF0Y2ggd2l0aG91dCBmaWxsaW5nIHRoZSBwYWdlLlxuICAgIGlmIChzbmFwLnNpemUgPCBsaW1pdCkge1xuICAgICAgaGFzTmV4dFBhZ2UgPSBmYWxzZTtcbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIC8vIFRoZXJlIG1pZ2h0IGJlIG1vcmUgZG9jczsgY29udGludWUgc2Nhbm5pbmcgZm9yIHZpc2libGUgaXRlbXMuXG4gICAgaGFzTmV4dFBhZ2UgPSB0cnVlO1xuICB9XG5cbiAgbGFzdERvYyA9IHBhZ2VMYXN0RG9jIHx8IChwYXJ0cy5sZW5ndGggPyBjdXJzb3IgOiBudWxsKTtcbiAgcmV0dXJuIHsgcGFydHMsIGxhc3REb2MsIGhhc05leHRQYWdlOiBmaWxsZWQgPyBoYXNOZXh0UGFnZSA6IGZhbHNlIH07XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmZXRjaENsaWVudHMoc2VsZWN0ZWRPRU0sIHNlbGVjdGVkTW9kYWxpdHkpIHtcbiAgY29uc3Qgbm9ybWFsaXplVGV4dCA9ICh2YWx1ZSkgPT4ge1xuICAgIGlmICh2YWx1ZSA9PSBudWxsKSByZXR1cm4gXCJcIjtcbiAgICByZXR1cm4gU3RyaW5nKHZhbHVlKS50b0xvd2VyQ2FzZSgpLnRyaW0oKTtcbiAgfTtcblxuICBjb25zdCBmaWVsZE1hdGNoZXNTZWxlY3Rpb24gPSAodmFsdWUsIHNlbGVjdGVkKSA9PiB7XG4gICAgaWYgKCFzZWxlY3RlZCkgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHZhbHVlLnNvbWUoKGVudHJ5KSA9PiBmaWVsZE1hdGNoZXNTZWxlY3Rpb24oZW50cnksIHNlbGVjdGVkKSk7XG4gICAgfVxuICAgIHJldHVybiBub3JtYWxpemVUZXh0KHZhbHVlKSA9PT0gbm9ybWFsaXplVGV4dChzZWxlY3RlZCk7XG4gIH07XG5cbiAgY29uc3QgZGIgPSBmaXJlYmFzZS5maXJlc3RvcmUoKTtcbiAgY29uc3QgY2xpZW50c1NuYXBzaG90ID0gYXdhaXQgZGIuY29sbGVjdGlvbihcIkNsaWVudFwiKS5nZXQoKTtcbiAgY29uc3QgY2xpZW50cyA9IGNsaWVudHNTbmFwc2hvdC5kb2NzLm1hcCgoZG9jKSA9PiAoe1xuICAgIGlkOiBkb2MuaWQsXG4gICAgLi4uZG9jLmRhdGEoKSxcbiAgfSkpO1xuXG4gIC8vIEZpbHRlciBjbGllbnRzIGJhc2VkIG9uIE9FTSBhbmQgTW9kYWxpdHkgaWYgc2VsZWN0ZWRcbiAgaWYgKHNlbGVjdGVkT0VNIHx8IHNlbGVjdGVkTW9kYWxpdHkpIHtcbiAgICBjb25zdCBmaWx0ZXJlZENsaWVudHMgPSBbXTtcbiAgICBmb3IgKGNvbnN0IGNsaWVudCBvZiBjbGllbnRzKSB7XG4gICAgICBsZXQgbWF0Y2ggPSB0cnVlO1xuICAgICAgaWYgKHNlbGVjdGVkT0VNIHx8IHNlbGVjdGVkTW9kYWxpdHkpIHtcbiAgICAgICAgZm9yIChjb25zdCBtYWNoaW5lUmVmIG9mIGNsaWVudC5tYWNoaW5lcykge1xuICAgICAgICAgIGNvbnN0IG1hY2hpbmVEb2MgPSBhd2FpdCBtYWNoaW5lUmVmLmdldCgpO1xuICAgICAgICAgIGNvbnN0IG1hY2hpbmVEYXRhID0gbWFjaGluZURvYy5kYXRhKCk7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgKHNlbGVjdGVkT0VNICYmXG4gICAgICAgICAgICAgIGZpZWxkTWF0Y2hlc1NlbGVjdGlvbihcbiAgICAgICAgICAgICAgICBtYWNoaW5lRGF0YS5PRU0gPz8gbWFjaGluZURhdGEub2VtLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkT0VNXG4gICAgICAgICAgICAgICkpIHx8XG4gICAgICAgICAgICAoc2VsZWN0ZWRNb2RhbGl0eSAmJlxuICAgICAgICAgICAgICBmaWVsZE1hdGNoZXNTZWxlY3Rpb24oXG4gICAgICAgICAgICAgICAgbWFjaGluZURhdGEuTW9kYWxpdHkgPz8gbWFjaGluZURhdGEubW9kYWxpdHksXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRNb2RhbGl0eVxuICAgICAgICAgICAgICApKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgbWF0Y2ggPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1hdGNoID0gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgZmlsdGVyZWRDbGllbnRzLnB1c2goY2xpZW50KTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZpbHRlcmVkQ2xpZW50cztcbiAgfVxuXG4gIHJldHVybiBjbGllbnRzO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZmV0Y2hNb2RlbHMoXG4gIHNlbGVjdGVkT0VNLFxuICBzZWxlY3RlZE1vZGFsaXR5LFxuICBzZWxlY3RlZENsaWVudFxuKSB7XG4gIGNvbnN0IG5vcm1hbGl6ZVRleHQgPSAodmFsdWUpID0+IHtcbiAgICBpZiAodmFsdWUgPT0gbnVsbCkgcmV0dXJuIFwiXCI7XG4gICAgcmV0dXJuIFN0cmluZyh2YWx1ZSkudG9Mb3dlckNhc2UoKS50cmltKCk7XG4gIH07XG5cbiAgY29uc3QgZmllbGRNYXRjaGVzU2VsZWN0aW9uID0gKHZhbHVlLCBzZWxlY3RlZCkgPT4ge1xuICAgIGlmICghc2VsZWN0ZWQpIHJldHVybiB0cnVlO1xuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHZhbHVlLnNvbWUoKGVudHJ5KSA9PiBmaWVsZE1hdGNoZXNTZWxlY3Rpb24oZW50cnksIHNlbGVjdGVkKSk7XG4gICAgfVxuICAgIHJldHVybiBub3JtYWxpemVUZXh0KHZhbHVlKSA9PT0gbm9ybWFsaXplVGV4dChzZWxlY3RlZCk7XG4gIH07XG5cbiAgY29uc3QgZGIgPSBmaXJlYmFzZS5maXJlc3RvcmUoKTtcbiAgY29uc3QgbWFjaGluZXNTbmFwc2hvdCA9IGF3YWl0IGRiLmNvbGxlY3Rpb24oXCJNYWNoaW5lXCIpLmdldCgpO1xuICBjb25zdCBtb2RlbHMgPSBuZXcgU2V0KCk7XG5cbiAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgbWFjaGluZXNTbmFwc2hvdC5kb2NzLm1hcChhc3luYyAobWFjaGluZURvYykgPT4ge1xuICAgICAgY29uc3QgbWFjaGluZURhdGEgPSBtYWNoaW5lRG9jLmRhdGEoKTtcbiAgICAgIGxldCBpc1ZhbGlkID0gdHJ1ZTtcblxuICAgICAgaWYgKCFmaWVsZE1hdGNoZXNTZWxlY3Rpb24obWFjaGluZURhdGEuT0VNID8/IG1hY2hpbmVEYXRhLm9lbSwgc2VsZWN0ZWRPRU0pKVxuICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XG4gICAgICBpZiAoXG4gICAgICAgICFmaWVsZE1hdGNoZXNTZWxlY3Rpb24oXG4gICAgICAgICAgbWFjaGluZURhdGEuTW9kYWxpdHkgPz8gbWFjaGluZURhdGEubW9kYWxpdHksXG4gICAgICAgICAgc2VsZWN0ZWRNb2RhbGl0eVxuICAgICAgICApXG4gICAgICApXG4gICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcbiAgICAgIGlmIChzZWxlY3RlZENsaWVudCAmJiBtYWNoaW5lRGF0YS5jbGllbnQpIHtcbiAgICAgICAgbGV0IGNsaWVudERvYyA9IG51bGw7XG4gICAgICAgIGlmICh0eXBlb2YgbWFjaGluZURhdGEuY2xpZW50Py5nZXQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIGNsaWVudERvYyA9IGF3YWl0IG1hY2hpbmVEYXRhLmNsaWVudC5nZXQoKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgbWFjaGluZURhdGEuY2xpZW50ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgY2xpZW50RG9jID0gYXdhaXQgZGIuY29sbGVjdGlvbihcIkNsaWVudFwiKS5kb2MobWFjaGluZURhdGEuY2xpZW50KS5nZXQoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWNsaWVudERvYyB8fCAhY2xpZW50RG9jLmV4aXN0cykge1xuICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCBjbGllbnROYW1lID0gY2xpZW50RG9jLmRhdGEoKS5uYW1lO1xuICAgICAgICAgIGNvbnN0IGNsaWVudElkID0gY2xpZW50RG9jLmlkO1xuICAgICAgICAgIGlmIChzZWxlY3RlZENsaWVudCAhPT0gY2xpZW50TmFtZSAmJiBzZWxlY3RlZENsaWVudCAhPT0gY2xpZW50SWQpIHtcbiAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGlzVmFsaWQpIHtcbiAgICAgICAgY29uc3QgbW9kZWxWYWx1ZSA9IG1hY2hpbmVEYXRhLk1vZGVsID8/IG1hY2hpbmVEYXRhLm1vZGVsO1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShtb2RlbFZhbHVlKSkge1xuICAgICAgICAgIG1vZGVsVmFsdWUuZm9yRWFjaCgoZW50cnkpID0+IGVudHJ5ICYmIG1vZGVscy5hZGQoZW50cnkpKTtcbiAgICAgICAgfSBlbHNlIGlmIChtb2RlbFZhbHVlKSB7XG4gICAgICAgICAgbW9kZWxzLmFkZChtb2RlbFZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gICk7XG5cbiAgcmV0dXJuIEFycmF5LmZyb20obW9kZWxzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdERhdGUodGltZXN0YW1wKSB7XG4gIGlmICghdGltZXN0YW1wKSByZXR1cm4gXCJcIjtcbiAgbGV0IGRhdGU7XG4gIGlmICh0aW1lc3RhbXAudG9EYXRlKSB7XG4gICAgZGF0ZSA9IHRpbWVzdGFtcC50b0RhdGUoKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgdGltZXN0YW1wID09PSBcInN0cmluZ1wiIHx8IHR5cGVvZiB0aW1lc3RhbXAgPT09IFwibnVtYmVyXCIpIHtcbiAgICBkYXRlID0gbmV3IERhdGUodGltZXN0YW1wKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gXCJcIjsgLy8gaGFuZGxlIHVuZXhwZWN0ZWQgZm9ybWF0c1xuICB9XG4gIGNvbnN0IGRheSA9IFN0cmluZyhkYXRlLmdldERhdGUoKSkucGFkU3RhcnQoMiwgXCIwXCIpO1xuICBjb25zdCBtb250aCA9IFN0cmluZyhkYXRlLmdldE1vbnRoKCkgKyAxKS5wYWRTdGFydCgyLCBcIjBcIik7XG4gIGNvbnN0IHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XG4gIHJldHVybiBgJHttb250aH0vJHtkYXl9LyR7eWVhcn1gO1xufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkTG9jYWxMb2NPYmplY3QobG9jKSB7XG4gIGNvbnN0IG8gPSB7fTtcbiAgaWYgKGxvYz8ucmVnaW9uKSBvLnJlZ2lvbiA9IGxvYy5yZWdpb247XG4gIGlmIChsb2M/LnNlY3Rpb24/LmxldHRlciAmJiBsb2M/LnNlY3Rpb24/Lm51bWJlcikgby5zZWN0aW9uID0gbG9jLnNlY3Rpb247XG4gIGlmIChsb2M/LmJpbiAhPT0gdW5kZWZpbmVkICYmIGxvYz8uYmluICE9PSBcIlwiKSBvLmJpbiA9IGxvYy5iaW47XG4gIGlmIChsb2M/LnBhbGxldCAhPT0gdW5kZWZpbmVkICYmIGxvYz8ucGFsbGV0ICE9PSBcIlwiKSBvLnBhbGxldCA9IGxvYy5wYWxsZXQ7XG4gIHJldHVybiBvO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0TG9jKGxvYykge1xuICBpZiAoIWxvYykgcmV0dXJuIFwiXCI7XG4gIGNvbnN0IHBhcnRzID0gW107XG4gIGlmIChsb2MucmVnaW9uKSBwYXJ0cy5wdXNoKGxvYy5yZWdpb24pO1xuICBpZiAobG9jLnNlY3Rpb24/LmxldHRlciAmJiBsb2Muc2VjdGlvbj8ubnVtYmVyKSB7XG4gICAgcGFydHMucHVzaChgJHtsb2Muc2VjdGlvbi5sZXR0ZXJ9JHtsb2Muc2VjdGlvbi5udW1iZXJ9YCk7XG4gIH1cbiAgaWYgKGxvYy5iaW4pIHBhcnRzLnB1c2goYEIke2xvYy5iaW59YCk7XG4gIGlmIChsb2MucGFsbGV0KSBwYXJ0cy5wdXNoKGBQJHtsb2MucGFsbGV0fWApO1xuICByZXR1cm4gcGFydHMuam9pbihcIuKAk1wiKTtcbn1cblxuZnVuY3Rpb24gaXNWYWxpZEZpZWxkKHZhbHVlKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgIHJldHVybiB2YWx1ZS5zb21lKChlbnRyeSkgPT4ge1xuICAgICAgY29uc3QgdHJpbW1lZCA9IFN0cmluZyhlbnRyeSB8fCBcIlwiKS50cmltKCk7XG4gICAgICByZXR1cm4gdHJpbW1lZCAhPT0gXCJcIiAmJiB0cmltbWVkLnRvTG93ZXJDYXNlKCkgIT09IFwibi9hXCI7XG4gICAgfSk7XG4gIH1cbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJzdHJpbmdcIikgcmV0dXJuIEJvb2xlYW4odmFsdWUpO1xuICBjb25zdCB0cmltbWVkID0gdmFsdWUudHJpbSgpO1xuICByZXR1cm4gdHJpbW1lZCAhPT0gXCJcIiAmJiB0cmltbWVkLnRvTG93ZXJDYXNlKCkgIT09IFwibi9hXCI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRQcmlvcml0eU1hY2hpbmVGaWVsZChcbiAgZmllbGQsXG4gIHRoZU1hY2hpbmUsXG4gIGN1cnJlbnRNYWNoaW5lLFxuICBmcm9tTWFjaGluZVxuKSB7XG4gIGlmICh0aGVNYWNoaW5lICYmIGlzVmFsaWRGaWVsZCh0aGVNYWNoaW5lW2ZpZWxkXSkpIHJldHVybiB0aGVNYWNoaW5lW2ZpZWxkXTtcbiAgaWYgKGN1cnJlbnRNYWNoaW5lICYmIGlzVmFsaWRGaWVsZChjdXJyZW50TWFjaGluZVtmaWVsZF0pKVxuICAgIHJldHVybiBjdXJyZW50TWFjaGluZVtmaWVsZF07XG4gIGlmIChmcm9tTWFjaGluZSAmJiBpc1ZhbGlkRmllbGQoZnJvbU1hY2hpbmVbZmllbGRdKSkgcmV0dXJuIGZyb21NYWNoaW5lW2ZpZWxkXTtcbiAgcmV0dXJuIFwiXCI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVNYWNoaW5lRmllbGRzKHRoZU1hY2hpbmUsIGN1cnJlbnRNYWNoaW5lLCBmcm9tTWFjaGluZSkge1xuICBjb25zdCBwaWNrID0gKHByaW1hcnksIGZhbGxiYWNrKSA9PlxuICAgIGdldFByaW9yaXR5TWFjaGluZUZpZWxkKHByaW1hcnksIHRoZU1hY2hpbmUsIGN1cnJlbnRNYWNoaW5lLCBmcm9tTWFjaGluZSkgfHxcbiAgICBnZXRQcmlvcml0eU1hY2hpbmVGaWVsZChmYWxsYmFjaywgdGhlTWFjaGluZSwgY3VycmVudE1hY2hpbmUsIGZyb21NYWNoaW5lKTtcblxuICByZXR1cm4ge1xuICAgIG9lbTogcGljayhcIk9FTVwiLCBcIm9lbVwiKSxcbiAgICBtb2RhbGl0eTogcGljayhcIk1vZGFsaXR5XCIsIFwibW9kYWxpdHlcIiksXG4gICAgbW9kZWw6IHBpY2soXCJNb2RlbFwiLCBcIm1vZGVsXCIpLFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYnVpbGROYW1lVG9rZW5zKG5hbWUpIHtcbiAgaWYgKCFuYW1lIHx8IHR5cGVvZiBuYW1lICE9PSBcInN0cmluZ1wiKSByZXR1cm4gW107XG4gIGNvbnN0IGxvd2VyID0gbmFtZS50b0xvd2VyQ2FzZSgpLnRyaW0oKTtcbiAgaWYgKCFsb3dlcikgcmV0dXJuIFtdO1xuICBjb25zdCB0b2tlbnMgPSBsb3dlci5zcGxpdCgvW15hLXowLTldKy8pLmZpbHRlcihCb29sZWFuKTtcbiAgLy8gaW5jbHVkZSB0aGUgZnVsbCBwaHJhc2Ugc28gZXhhY3QgbXVsdGktd29yZCBzZWFyY2hlcyBjYW4gbWF0Y2hcbiAgdG9rZW5zLnB1c2gobG93ZXIpO1xuICByZXR1cm4gQXJyYXkuZnJvbShuZXcgU2V0KHRva2VucykpO1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZmlyZWJhc2UvY29tcGF0L2FwcFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmaXJlYmFzZS9jb21wYXQvYXV0aFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmaXJlYmFzZS9jb21wYXQvZmlyZXN0b3JlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZpcmViYXNlL2NvbXBhdC9zdG9yYWdlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5leHQvcm91dGVyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LWJvb3RzdHJhcFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1pc1wiKTsiXSwic291cmNlUm9vdCI6IiJ9