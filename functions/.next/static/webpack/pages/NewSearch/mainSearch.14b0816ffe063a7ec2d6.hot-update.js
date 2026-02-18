webpackHotUpdate_N_E("pages/NewSearch/mainSearch",{

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
var DEFAULT_PAGE_SIZE = 25;
var MAP_REGION_ORDER = ["E", "F", "G", "A", "D", "C", "B"]; // Simulates a network request delay

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

  var _useState26 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])([]),
      mapRegionOptions = _useState26[0],
      setMapRegionOptions = _useState26[1];

  var _useState27 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])({}),
      mapSectionMap = _useState27[0],
      setMapSectionMap = _useState27[1];

  var _useState28 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])("regions"),
      mapStep = _useState28[0],
      setMapStep = _useState28[1];

  var _useState29 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(""),
      mapRegion = _useState29[0],
      setMapRegion = _useState29[1];

  var _useState30 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(""),
      mapRow = _useState30[0],
      setMapRow = _useState30[1];

  var _useState31 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(""),
      mapCol = _useState31[0],
      setMapCol = _useState31[1];

  var _useState32 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(""),
      mapPallet = _useState32[0],
      setMapPallet = _useState32[1];

  var _useState33 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])({}),
      mapCellPallets = _useState33[0],
      setMapCellPallets = _useState33[1];

  var _useState34 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])({}),
      mapPalletBins = _useState34[0],
      setMapPalletBins = _useState34[1];

  var _useState35 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(false),
      mapLoading = _useState35[0],
      setMapLoading = _useState35[1];

  var _useState36 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(""),
      mapError = _useState36[0],
      setMapError = _useState36[1];

  var _useState37 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(false),
      mapDirectoryLoaded = _useState37[0],
      setMapDirectoryLoaded = _useState37[1];

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

  var _useState38 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(labelBase),
      labels = _useState38[0],
      setLabels = _useState38[1];

  var _useState39 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(sortCheckBase),
      sortCheck = _useState39[0],
      setSortCheck = _useState39[1];

  var _useState40 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(null),
      hoverIndex = _useState40[0],
      setHoverIndex = _useState40[1];

  var _useState41 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(null),
      selectedModel = _useState41[0],
      setSelectedModel = _useState41[1];

  var _useState42 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(null),
      gPos = _useState42[0],
      setGPos = _useState42[1];

  var _useState43 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(null),
      gIde = _useState43[0],
      setGIde = _useState43[1];

  var _useState44 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(false),
      isDeleting = _useState44[0],
      setIsDeleting = _useState44[1];

  var _useState45 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(1),
      page = _useState45[0],
      setPage = _useState45[1];

  var _useState46 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])([]),
      pageCursors = _useState46[0],
      setPageCursors = _useState46[1];

  var _useState47 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(false),
      hasNextPage = _useState47[0],
      setHasNextPage = _useState47[1];

  var fetchSeq = Object(react__WEBPACK_IMPORTED_MODULE_5__["useRef"])(0);
  var backfillInFlight = Object(react__WEBPACK_IMPORTED_MODULE_5__["useRef"])(false);

  var _useState48 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(0),
      queryEpoch = _useState48[0],
      setQueryEpoch = _useState48[1];

  var _useState49 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(null),
      loadError = _useState49[0],
      setLoadError = _useState49[1];

  var tableBodyRef = Object(react__WEBPACK_IMPORTED_MODULE_5__["useRef"])(null);
  var rowHeightRef = Object(react__WEBPACK_IMPORTED_MODULE_5__["useRef"])(46);
  var headerHeightRef = Object(react__WEBPACK_IMPORTED_MODULE_5__["useRef"])(38);
  var LOAD_TIMEOUT_MS = 30000;
  var mapLetters = useMemo(function () {
    return Array.from({
      length: 26
    }, function (_, i) {
      return String.fromCharCode(65 + i);
    });
  }, []);
  var mapNumbers = useMemo(function () {
    return Array.from({
      length: 50
    }, function (_, i) {
      return i + 1;
    });
  }, []);
  var loadMapDirectory = Object(react__WEBPACK_IMPORTED_MODULE_5__["useCallback"])( /*#__PURE__*/Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__["default"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee() {
    var doc, data;
    return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!mapDirectoryLoaded) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return");

          case 2:
            _context.prev = 2;
            _context.next = 5;
            return _context_Firebase__WEBPACK_IMPORTED_MODULE_16__["default"].firestore().collection("Warehouse").doc("directory").get();

          case 5:
            doc = _context.sent;
            data = doc.data() || {};
            setMapRegionOptions(data.Region || []);
            setMapSectionMap(data.Section || {});
            setMapDirectoryLoaded(true);
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
  })), [mapDirectoryLoaded]);
  var getMapRegionDimensions = Object(react__WEBPACK_IMPORTED_MODULE_5__["useCallback"])(function (regionId) {
    var entry = mapSectionMap === null || mapSectionMap === void 0 ? void 0 : mapSectionMap[regionId];

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
  }, [mapSectionMap]);
  var loadMapInventory = Object(react__WEBPACK_IMPORTED_MODULE_5__["useCallback"])( /*#__PURE__*/function () {
    var _ref10 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__["default"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee2(regionId) {
      var snap, cellPallets, palletBins, cellObj, palletObj;
      return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee2$(_context2) {
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
              return _context_Firebase__WEBPACK_IMPORTED_MODULE_16__["default"].firestore().collection("Test").where("newLocalCurrent.region", "==", regionId).get();

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
      return _ref10.apply(this, arguments);
    };
  }(), []);

  var openMap = /*#__PURE__*/function () {
    var _ref11 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__["default"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee3() {
      return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              setMapError("");
              _context3.next = 3;
              return loadMapDirectory();

            case 3:
              if (mapRegion) {
                setMapStep("grid");
                loadMapInventory(mapRegion);
              } else {
                setMapStep("regions");
              }

              setShowMap(true);

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function openMap() {
      return _ref11.apply(this, arguments);
    };
  }();

  var handleMapSelectRegion = function handleMapSelectRegion(regionId) {
    setMapRegion(regionId);
    setMapRow("");
    setMapCol("");
    setMapPallet("");
    setMapStep("grid");
    loadMapInventory(regionId);
  };

  var handleMapSelectCell = function handleMapSelectCell(rowLetter, colNumber) {
    setMapRow(rowLetter);
    setMapCol(colNumber);
    setMapPallet("");
    setMapStep("pallets");
  };

  var handleMapSelectPallet = function handleMapSelectPallet(palletId) {
    setMapPallet(palletId);
    setMapStep("bins");
  };

  var handleMapBack = function handleMapBack() {
    if (mapStep === "bins") setMapStep("pallets");else if (mapStep === "pallets") setMapStep("grid");else if (mapStep === "grid") setMapStep("regions");
  };

  var handleMapView = function handleMapView() {
    var _overrides$region, _overrides$sectionLet, _overrides$sectionNum, _overrides$pallet, _overrides$bin;

    var overrides = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var params = new URLSearchParams();
    var regionValue = (_overrides$region = overrides.region) !== null && _overrides$region !== void 0 ? _overrides$region : mapRegion;
    var letterValue = (_overrides$sectionLet = overrides.sectionLetter) !== null && _overrides$sectionLet !== void 0 ? _overrides$sectionLet : mapRow;
    var numberValue = (_overrides$sectionNum = overrides.sectionNumber) !== null && _overrides$sectionNum !== void 0 ? _overrides$sectionNum : mapCol;
    var palletValue = (_overrides$pallet = overrides.pallet) !== null && _overrides$pallet !== void 0 ? _overrides$pallet : mapPallet;
    var binValue = (_overrides$bin = overrides.bin) !== null && _overrides$bin !== void 0 ? _overrides$bin : "";
    if (regionValue) params.set("region", regionValue);
    if (letterValue) params.set("sectionLetter", letterValue);
    if (numberValue) params.set("sectionNumber", numberValue);
    if (palletValue) params.set("pallet", palletValue);
    if (binValue) params.set("bin", binValue);
    var query = params.toString();
    router.push("/NewSearch/inventory/inventoryManage".concat(query ? "?".concat(query) : ""));
  };

  var startNameTokenBackfill = Object(react__WEBPACK_IMPORTED_MODULE_5__["useCallback"])( /*#__PURE__*/Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__["default"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee4() {
    var reason,
        lastRun,
        db,
        lastDoc,
        tokensEqual,
        _loop,
        _ret,
        _args5 = arguments;

    return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee4$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            reason = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : "";

            if (!backfillInFlight.current) {
              _context5.next = 3;
              break;
            }

            return _context5.abrupt("return");

          case 3:
            if (false) {}

            lastRun = window.localStorage.getItem("nameTokensBackfillAt");

            if (!(lastRun && Date.now() - Number(lastRun) < 24 * 60 * 60 * 1000)) {
              _context5.next = 7;
              break;
            }

            return _context5.abrupt("return");

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

            _context5.prev = 11;
            _loop = /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _loop() {
              var query, snap, batch, writes;
              return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _loop$(_context4) {
                while (1) {
                  switch (_context4.prev = _context4.next) {
                    case 0:
                      query = db.collection("Test").orderBy(_context_Firebase__WEBPACK_IMPORTED_MODULE_16__["default"].firestore.FieldPath.documentId()).limit(200);
                      if (lastDoc) query = query.startAfter(lastDoc);
                      _context4.next = 4;
                      return query.get();

                    case 4:
                      snap = _context4.sent;

                      if (!snap.empty) {
                        _context4.next = 7;
                        break;
                      }

                      return _context4.abrupt("return", "break");

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
                        _context4.next = 13;
                        break;
                      }

                      _context4.next = 13;
                      return batch.commit();

                    case 13:
                      lastDoc = snap.docs[snap.docs.length - 1];
                      _context4.next = 16;
                      return new Promise(function (resolve) {
                        return setTimeout(resolve, 25);
                      });

                    case 16:
                    case "end":
                      return _context4.stop();
                  }
                }
              }, _loop);
            });

          case 13:
            if (false) {}

            return _context5.delegateYield(_loop(), "t0", 15);

          case 15:
            _ret = _context5.t0;

            if (!(_ret === "break")) {
              _context5.next = 18;
              break;
            }

            return _context5.abrupt("break", 20);

          case 18:
            _context5.next = 13;
            break;

          case 20:
            if (true) {
              window.localStorage.setItem("nameTokensBackfillAt", String(Date.now()));
            }

            _context5.next = 26;
            break;

          case 23:
            _context5.prev = 23;
            _context5.t1 = _context5["catch"](11);
            console.error("Name token backfill failed:", reason, _context5.t1);

          case 26:
            _context5.prev = 26;
            backfillInFlight.current = false;
            return _context5.finish(26);

          case 29:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee4, null, [[11, 23, 26, 29]]);
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
    _fetchData = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__["default"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee12() {
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
          _args13 = arguments;

      return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee12$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              requestedPage = _args13.length > 0 && _args13[0] !== undefined ? _args13[0] : 1;
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
              _context13.prev = 6;

              if (router.query.inputText && router.query.selectedType) {
                setSelect(router.query.selectedType);
                setSearch(router.query.inputText);
              }

              startAfterDoc = requestedPage > 1 ? pageCursors[requestedPage - 2] : null;

              if (!(requestedPage > 1 && !startAfterDoc)) {
                _context13.next = 13;
                break;
              }

              setPage(1);

              if (seq === fetchSeq.current) {
                clearTimeout(timeoutId);
                setIsLoading(false);
              }

              return _context13.abrupt("return");

            case 13:
              effectiveSelect = router.query.selectedType || select;
              effectiveSearch = router.query.inputText || search;
              effectiveSearchLower = (effectiveSearch || "").toLowerCase().trim(); // light retry for transient Firestore hiccups

              load = /*#__PURE__*/function () {
                var _ref19 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__["default"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee11() {
                  var attempt,
                      _args12 = arguments;
                  return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee11$(_context12) {
                    while (1) {
                      switch (_context12.prev = _context12.next) {
                        case 0:
                          attempt = _args12.length > 0 && _args12[0] !== undefined ? _args12[0] : 1;
                          _context12.prev = 1;
                          _context12.next = 4;
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
                          return _context12.abrupt("return", _context12.sent);

                        case 7:
                          _context12.prev = 7;
                          _context12.t0 = _context12["catch"](1);

                          if (!(attempt >= 3)) {
                            _context12.next = 11;
                            break;
                          }

                          throw _context12.t0;

                        case 11:
                          _context12.next = 13;
                          return new Promise(function (r) {
                            return setTimeout(r, 250 * Math.pow(2, attempt - 1));
                          });

                        case 13:
                          return _context12.abrupt("return", load(attempt + 1));

                        case 14:
                        case "end":
                          return _context12.stop();
                      }
                    }
                  }, _callee11, null, [[1, 7]]);
                }));

                return function load() {
                  return _ref19.apply(this, arguments);
                };
              }();

              _context13.next = 19;
              return load();

            case 19:
              _yield$load = _context13.sent;
              data = _yield$load.parts;
              lastDoc = _yield$load.lastDoc;
              nextPage = _yield$load.hasNextPage;

              if (!(timedOut || seq !== fetchSeq.current)) {
                _context13.next = 25;
                break;
              }

              return _context13.abrupt("return");

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
                _context13.next = 35;
                break;
              }

              setHasNextPage(false);
              setPage(1);
              return _context13.abrupt("return");

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
                var _ref20, _ref21, _item$clientFromId, _item$ClientFrom, _ref22, _ref23, _item$clientCurrentId, _item$ClientCurrent;

                return _objectSpread(_objectSpread({}, item), {}, {
                  clientFromId: (_ref20 = (_ref21 = (_item$clientFromId = item === null || item === void 0 ? void 0 : item.clientFromId) !== null && _item$clientFromId !== void 0 ? _item$clientFromId : typeof (item === null || item === void 0 ? void 0 : item.ClientFrom) === "string" ? item.ClientFrom : null) !== null && _ref21 !== void 0 ? _ref21 : item === null || item === void 0 ? void 0 : (_item$ClientFrom = item.ClientFrom) === null || _item$ClientFrom === void 0 ? void 0 : _item$ClientFrom.id) !== null && _ref20 !== void 0 ? _ref20 : null,
                  clientCurrentId: (_ref22 = (_ref23 = (_item$clientCurrentId = item === null || item === void 0 ? void 0 : item.clientCurrentId) !== null && _item$clientCurrentId !== void 0 ? _item$clientCurrentId : typeof (item === null || item === void 0 ? void 0 : item.ClientCurrent) === "string" ? item.ClientCurrent : null) !== null && _ref23 !== void 0 ? _ref23 : item === null || item === void 0 ? void 0 : (_item$ClientCurrent = item.ClientCurrent) === null || _item$ClientCurrent === void 0 ? void 0 : _item$ClientCurrent.id) !== null && _ref22 !== void 0 ? _ref22 : null
                });
              });
              setAugmentedInfo(augmented); // default view = filtered (keeps pagination and filters consistent)

              setInfo(augmented.filter(matchesFilters));
              _context13.next = 52;
              break;

            case 43:
              _context13.prev = 43;
              _context13.t0 = _context13["catch"](6);

              if (!(seq !== fetchSeq.current)) {
                _context13.next = 47;
                break;
              }

              return _context13.abrupt("return");

            case 47:
              console.error("Error fetching data:", _context13.t0);
              code = (_context13.t0 === null || _context13.t0 === void 0 ? void 0 : _context13.t0.code) || "unknown";
              setLoadError({
                code: code,
                message: (_context13.t0 === null || _context13.t0 === void 0 ? void 0 : _context13.t0.message) || "Failed to load items."
              });
              setInfo([]);
              setAugmentedInfo([]);

            case 52:
              _context13.prev = 52;
              clearTimeout(timeoutId);
              if (seq === fetchSeq.current && !timedOut) setIsLoading(false);
              return _context13.finish(52);

            case 56:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee12, null, [[6, 43, 52, 56]]);
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

  var _useState50 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])([]),
      selectedItems = _useState50[0],
      setSelectedItems = _useState50[1];

  var _useState51 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(false),
      showDeleteModal = _useState51[0],
      setShowDeleteModal = _useState51[1];

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
    var _ref13 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__["default"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee5() {
      var db, _iterator2, _step2, itemId;

      return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee5$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              setIsDeleting(true);
              db = _context_Firebase__WEBPACK_IMPORTED_MODULE_16__["default"].firestore();
              _context6.prev = 2;
              // Loop over each selected item one at a time
              _iterator2 = _createForOfIteratorHelper(selectedItems);
              _context6.prev = 4;

              _iterator2.s();

            case 6:
              if ((_step2 = _iterator2.n()).done) {
                _context6.next = 35;
                break;
              }

              itemId = _step2.value;
              console.log(itemId);
              _context6.prev = 9;
              _context6.next = 12;
              return db.collection("Test").doc(itemId)["delete"]();

            case 12:
              _context6.next = 17;
              break;

            case 14:
              _context6.prev = 14;
              _context6.t0 = _context6["catch"](9);
              console.error("Error deleting document ".concat(itemId, " from Test:"), _context6.t0);

            case 17:
              _context6.prev = 17;
              _context6.next = 20;
              return db.collection("Parts").doc(itemId)["delete"]();

            case 20:
              _context6.next = 25;
              break;

            case 22:
              _context6.prev = 22;
              _context6.t1 = _context6["catch"](17);
              console.error("Error deleting document ".concat(itemId, " from Parts:"), _context6.t1);

            case 25:
              _context6.prev = 25;
              _context6.next = 28;
              return deleteFromStorage(itemId);

            case 28:
              _context6.next = 33;
              break;

            case 30:
              _context6.prev = 30;
              _context6.t2 = _context6["catch"](25);
              console.error("Error deleting storage for ".concat(itemId, ":"), _context6.t2);

            case 33:
              _context6.next = 6;
              break;

            case 35:
              _context6.next = 40;
              break;

            case 37:
              _context6.prev = 37;
              _context6.t3 = _context6["catch"](4);

              _iterator2.e(_context6.t3);

            case 40:
              _context6.prev = 40;

              _iterator2.f();

              return _context6.finish(40);

            case 43:
              // Update local state by filtering out the deleted items
              setInfo(info.filter(function (item) {
                return !selectedItems.includes(item.id);
              }));
              setSelectedItems([]);
              _context6.next = 50;
              break;

            case 47:
              _context6.prev = 47;
              _context6.t4 = _context6["catch"](2);
              console.error("Error deleting items:", _context6.t4);

            case 50:
              _context6.prev = 50;
              setIsDeleting(false);
              handleCloseDeleteModal(); // Optionally, reload the page
              // router.reload();

              return _context6.finish(50);

            case 54:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee5, null, [[2, 47, 50, 54], [4, 37, 40, 43], [9, 14], [17, 22], [25, 30]]);
    }));

    return function handleDeleteSelected() {
      return _ref13.apply(this, arguments);
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

  var _useState52 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])("Select Option"),
      dropdown1Text = _useState52[0],
      setDropdown1Text = _useState52[1];

  var _useState53 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])("Select Option"),
      dropdown2Text = _useState53[0],
      setDropdown2Text = _useState53[1];

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


  function buildClientsFromItems(_x2) {
    return _buildClientsFromItems.apply(this, arguments);
  } // --------------------
  // CLIENT SELECTION HANDLING
  // --------------------
  // This function fetches clients and opens the client modal.


  function _buildClientsFromItems() {
    _buildClientsFromItems = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__["default"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee13(type) {
      var db, ids, filtered, _iterator3, _step3, it, id, out, idArray, i, chunk, snap;

      return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee13$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
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
                _context14.next = 17;
                break;
              }

              chunk = idArray.slice(i, i + 10);
              _context14.next = 12;
              return db.collection("Client").where(_context_Firebase__WEBPACK_IMPORTED_MODULE_16__["default"].firestore.FieldPath.documentId(), "in", chunk).get();

            case 12:
              snap = _context14.sent;
              snap.forEach(function (doc) {
                var d = doc.data() || {};
                out.push({
                  id: doc.id,
                  name: d.name || doc.id
                });
              });

            case 14:
              i += 10;
              _context14.next = 8;
              break;

            case 17:
              // sort by name for nicer UX
              out.sort(function (a, b) {
                return (a.name || "").localeCompare(b.name || "");
              });
              return _context14.abrupt("return", out);

            case 19:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee13);
    }));
    return _buildClientsFromItems.apply(this, arguments);
  }

  var handleClientClick = /*#__PURE__*/function () {
    var _ref14 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__["default"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee6() {
      var safeClients, clientsData, derived;
      return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee6$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              safeClients = [];
              _context7.prev = 1;
              _context7.next = 4;
              return Object(_utils_fetchAssociations__WEBPACK_IMPORTED_MODULE_9__["fetchClients"])(selectedOEM, selectedModality);

            case 4:
              clientsData = _context7.sent;
              safeClients = Array.isArray(clientsData) ? clientsData : [];
              _context7.next = 11;
              break;

            case 8:
              _context7.prev = 8;
              _context7.t0 = _context7["catch"](1);
              console.error("fetchClients failed:", _context7.t0);

            case 11:
              if (!(safeClients.length === 0)) {
                _context7.next = 24;
                break;
              }

              _context7.prev = 12;

              if (!clientSelectionType) {
                // if somehow not set yet, default to "from"
                setClientSelectionType("from");
              }

              _context7.next = 16;
              return buildClientsFromItems(clientSelectionType || "from");

            case 16:
              derived = _context7.sent;
              safeClients = derived;
              _context7.next = 24;
              break;

            case 20:
              _context7.prev = 20;
              _context7.t1 = _context7["catch"](12);
              console.error("Fallback buildClientsFromItems failed:", _context7.t1);
              safeClients = [];

            case 24:
              setClients(safeClients);
              setClientSearchTerm("");
              setShowClientModal(true);

            case 27:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee6, null, [[1, 8], [12, 20]]);
    }));

    return function handleClientClick() {
      return _ref14.apply(this, arguments);
    };
  }(); // When a client is selected in the modal, we now assume the parameter is a client ID.
  // If the passed value is null, we clear the selection.


  var handleClientSelect = /*#__PURE__*/function () {
    var _ref15 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__["default"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee7(clientId) {
      var clientSnap, clientData;
      return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee7$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              console.log("User selected client id:", clientId);

              if (clientId) {
                _context8.next = 5;
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
              return _context8.abrupt("return");

            case 5:
              _context8.prev = 5;
              _context8.next = 8;
              return _context_Firebase__WEBPACK_IMPORTED_MODULE_16__["default"].firestore().collection("Client").doc(clientId).get();

            case 8:
              clientSnap = _context8.sent;

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

              _context8.next = 15;
              break;

            case 12:
              _context8.prev = 12;
              _context8.t0 = _context8["catch"](5);
              console.error("Error fetching client data:", _context8.t0);

            case 15:
              setShowClientModal(false);

            case 16:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee7, null, [[5, 12]]);
    }));

    return function handleClientSelect(_x3) {
      return _ref15.apply(this, arguments);
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


  var _useState54 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])([]),
      models = _useState54[0],
      setModels = _useState54[1];

  var _useState55 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(false),
      showModelModal = _useState55[0],
      setShowModelModal = _useState55[1];

  var _useState56 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])("Select Option"),
      modelButtonText = _useState56[0],
      setModelButtonText = _useState56[1];

  var handleModelClick = /*#__PURE__*/function () {
    var _ref16 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__["default"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee8() {
      var modelsData;
      return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee8$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return Object(_utils_fetchAssociations__WEBPACK_IMPORTED_MODULE_9__["fetchModels"])(selectedOEM, selectedModality, selectedClientFrom);

            case 2:
              modelsData = _context9.sent;
              setModels(modelsData);
              setModelSearchTerm("");
              setShowModelModal(true);

            case 6:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee8);
    }));

    return function handleModelClick() {
      return _ref16.apply(this, arguments);
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

  var _useState57 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(""),
      clientSearchTerm = _useState57[0],
      setClientSearchTerm = _useState57[1];

  var _useState58 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(""),
      modelSearchTerm = _useState58[0],
      setModelSearchTerm = _useState58[1];

  var deleteFromStorage = /*#__PURE__*/function () {
    var _ref17 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__["default"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee9(itemId) {
      var storageRef, folderRef, listResult, deletePromises;
      return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee9$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              storageRef = _context_Firebase__WEBPACK_IMPORTED_MODULE_16__["default"].storage().ref();
              folderRef = storageRef.child("Parts/".concat(itemId, "/"));
              _context10.prev = 2;
              _context10.next = 5;
              return folderRef.listAll();

            case 5:
              listResult = _context10.sent;
              deletePromises = listResult.items.map(function (item) {
                return item["delete"]();
              });
              _context10.next = 9;
              return Promise.all(deletePromises);

            case 9:
              _context10.next = 14;
              break;

            case 11:
              _context10.prev = 11;
              _context10.t0 = _context10["catch"](2);
              console.error("Error deleting from storage:", _context10.t0);

            case 14:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee9, null, [[2, 11]]);
    }));

    return function deleteFromStorage(_x4) {
      return _ref17.apply(this, arguments);
    };
  }();

  var deleteFromPartsCollection = /*#__PURE__*/function () {
    var _ref18 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__["default"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee10(itemId) {
      var db;
      return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee10$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              db = _context_Firebase__WEBPACK_IMPORTED_MODULE_16__["default"].firestore();
              _context11.prev = 1;
              _context11.next = 4;
              return db.collection("Parts").doc(itemId)["delete"]();

            case 4:
              console.log("Deleted item from Parts collection: ".concat(itemId));
              _context11.next = 10;
              break;

            case 7:
              _context11.prev = 7;
              _context11.t0 = _context11["catch"](1);
              console.error("Error deleting from Parts collection:", _context11.t0);

            case 10:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee10, null, [[1, 7]]);
    }));

    return function deleteFromPartsCollection(_x5) {
      return _ref18.apply(this, arguments);
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
          lineNumber: 1209,
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
          lineNumber: 1219,
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
        lineNumber: 1305,
        columnNumber: 5
      }
    }, __jsx("div", {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.filtersHeader,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1306,
        columnNumber: 7
      }
    }, __jsx("div", {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1307,
        columnNumber: 9
      }
    }, __jsx("div", {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.filtersTitle,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1308,
        columnNumber: 11
      }
    }, "Filters"), __jsx("div", {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.filtersSubtitle,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1309,
        columnNumber: 11
      }
    }, "Narrow results by machine, client, or warehouse.")), hasActiveFilters ? __jsx("span", {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.filtersBadge,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1314,
        columnNumber: 11
      }
    }, "Active") : null), __jsx("div", {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.filterSection,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1318,
        columnNumber: 7
      }
    }, __jsx("div", {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.filterSectionTitle,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1319,
        columnNumber: 9
      }
    }, "Machine"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["InputGroup"], {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.inputGroup,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1320,
        columnNumber: 9
      }
    }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["InputGroup"].Text, {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1321,
        columnNumber: 11
      }
    }, "OEM"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Dropdown"], {
      onSelect: handleSelect1,
      className: "w-100",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1322,
        columnNumber: 11
      }
    }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Dropdown"].Toggle, {
      variant: "outline-secondary",
      id: "".concat(idPrefix, "-oem"),
      className: "w-100 ".concat(_styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.inputButton),
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1323,
        columnNumber: 13
      }
    }, dropdown1Text), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Dropdown"].Menu, {
      className: "w-100",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1330,
        columnNumber: 13
      }
    }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Dropdown"].Item, {
      eventKey: "unassigned",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1331,
        columnNumber: 15
      }
    }, "Select Option"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Dropdown"].Item, {
      eventKey: "GE",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1332,
        columnNumber: 15
      }
    }, "GE"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Dropdown"].Item, {
      eventKey: "Toshiba",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1333,
        columnNumber: 15
      }
    }, "Toshiba"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Dropdown"].Item, {
      eventKey: "Siemens",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1334,
        columnNumber: 15
      }
    }, "Siemens"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Dropdown"].Item, {
      eventKey: "Philips",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1335,
        columnNumber: 15
      }
    }, "Philips")))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["InputGroup"], {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.inputGroup,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1340,
        columnNumber: 9
      }
    }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["InputGroup"].Text, {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1341,
        columnNumber: 11
      }
    }, "Modality"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Dropdown"], {
      onSelect: handleSelect2,
      className: "w-100",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1342,
        columnNumber: 11
      }
    }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Dropdown"].Toggle, {
      variant: "outline-secondary",
      id: "".concat(idPrefix, "-modality"),
      className: "w-100 ".concat(_styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.inputButton),
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1343,
        columnNumber: 13
      }
    }, dropdown2Text), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Dropdown"].Menu, {
      className: "w-100",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1350,
        columnNumber: 13
      }
    }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Dropdown"].Item, {
      eventKey: "unassigned",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1351,
        columnNumber: 15
      }
    }, "Select Option"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Dropdown"].Item, {
      eventKey: "CT",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1352,
        columnNumber: 15
      }
    }, "CT"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Dropdown"].Item, {
      eventKey: "MRI",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1353,
        columnNumber: 15
      }
    }, "MRI")))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["InputGroup"], {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.inputGroup,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1358,
        columnNumber: 9
      }
    }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["InputGroup"].Text, {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1359,
        columnNumber: 11
      }
    }, "Model"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Button"], {
      variant: "outline-secondary",
      className: "w-100 ".concat(_styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.inputButton),
      onClick: handleModelClick,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1360,
        columnNumber: 11
      }
    }, modelButtonText))), __jsx("div", {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.filterSection,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1370,
        columnNumber: 7
      }
    }, __jsx("div", {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.filterSectionTitle,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1371,
        columnNumber: 9
      }
    }, "Client"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["InputGroup"], {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.inputGroup,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1372,
        columnNumber: 9
      }
    }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["InputGroup"].Text, {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1373,
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
        lineNumber: 1374,
        columnNumber: 11
      }
    }, clientFromButtonText)), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["InputGroup"], {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.inputGroup,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1383,
        columnNumber: 9
      }
    }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["InputGroup"].Text, {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1384,
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
        lineNumber: 1385,
        columnNumber: 11
      }
    }, clientCurrentButtonText))), __jsx("div", {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.filterSection,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1395,
        columnNumber: 7
      }
    }, __jsx("div", {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.filterSectionTitle,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1396,
        columnNumber: 9
      }
    }, "Warehouse"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["InputGroup"], {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.inputGroup,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1397,
        columnNumber: 9
      }
    }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["InputGroup"].Text, {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1398,
        columnNumber: 11
      }
    }, "Quick"), __jsx("div", {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.buttonGroup,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1399,
        columnNumber: 11
      }
    }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Button"], {
      variant: "outline-secondary",
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.flexButton,
      onClick: handleSoCalWarehouseClick,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1400,
        columnNumber: 13
      }
    }, "SoCal Warehouse"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Button"], {
      variant: "outline-secondary",
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.flexButton,
      onClick: handleNorCalWarehouseClick,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1407,
        columnNumber: 13
      }
    }, "NorCal Warehouse"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Button"], {
      variant: "outline-secondary",
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.flexButton,
      onClick: handleWarehouseUnassignedClick,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1414,
        columnNumber: 13
      }
    }, "Unassigned")))));
  };

  return __jsx(_LoggedIn__WEBPACK_IMPORTED_MODULE_11__["default"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1429,
      columnNumber: 5
    }
  }, (isDeleting || isNavigating) && __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.loadingOverlay,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1431,
      columnNumber: 9
    }
  }, __jsx("img", {
    src: "/magmo-logo.png",
    alt: "Loading Magmo",
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.loadingLogo,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1432,
      columnNumber: 11
    }
  })), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"], {
    show: showDeleteModal,
    onHide: handleCloseDeleteModal,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1439,
      columnNumber: 7
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Header, {
    closeButton: true,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1440,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Title, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1441,
      columnNumber: 11
    }
  }, "Confirm Deletion")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Body, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1443,
      columnNumber: 9
    }
  }, "Are you sure you want to delete ", selectedItems.length, " item", selectedItems.length > 1 ? "s" : "", "?"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Footer, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1447,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Button"], {
    variant: "danger",
    onClick: handleDeleteSelected,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1448,
      columnNumber: 11
    }
  }, "Yes, delete"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Button"], {
    variant: "secondary",
    onClick: handleCloseDeleteModal,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1451,
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
      lineNumber: 1457,
      columnNumber: 7
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Header, {
    closeButton: true,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1458,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Title, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1459,
      columnNumber: 11
    }
  }, "Select ", clientSelectionType === "from" ? "Client From" : "Client Current")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Body, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1463,
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
      lineNumber: 1464,
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
      lineNumber: 1471,
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
      lineNumber: 1483,
      columnNumber: 7
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Header, {
    closeButton: true,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1484,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Title, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1485,
      columnNumber: 11
    }
  }, "Select Model")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Body, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1487,
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
      lineNumber: 1488,
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
      lineNumber: 1495,
      columnNumber: 11
    }
  }))), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.page,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1507,
      columnNumber: 7
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.pageInner,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1508,
      columnNumber: 9
    }
  }, __jsx("header", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.header,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1509,
      columnNumber: 11
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.headerLeft,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1510,
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
      lineNumber: 1511,
      columnNumber: 15
    }
  }, __jsx("span", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1517,
      columnNumber: 17
    }
  }), __jsx("span", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1518,
      columnNumber: 17
    }
  }), __jsx("span", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1519,
      columnNumber: 17
    }
  })), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.brand,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1521,
      columnNumber: 15
    }
  }, __jsx("img", {
    src: "/magmo-logo.png",
    alt: "Magmo",
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.brandLogo,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1522,
      columnNumber: 17
    }
  }), __jsx("div", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1527,
      columnNumber: 17
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.brandName,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1528,
      columnNumber: 19
    }
  }, "Magmo"), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.brandSub,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1529,
      columnNumber: 19
    }
  }, "Inventory Search")))), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.headerRight,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1533,
      columnNumber: 13
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.headerStatus,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1534,
      columnNumber: 15
    }
  }, hasActiveFilters ? "Filters active" : "All items"))), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.content,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1540,
      columnNumber: 11
    }
  }, __jsx("aside", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.sidebar,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1541,
      columnNumber: 13
    }
  }, renderFilters("sidebar")), __jsx("main", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.main,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1542,
      columnNumber: 13
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.tableCard,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1543,
      columnNumber: 15
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.tableHeader,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1544,
      columnNumber: 17
    }
  }, __jsx("div", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1545,
      columnNumber: 19
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.tableTitle,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1546,
      columnNumber: 21
    }
  }, "Items"), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.tableSubtitle,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1547,
      columnNumber: 21
    }
  }, isLoading ? "Loading items" : "".concat(info.length, " items on this page"))), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.tableMeta,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1551,
      columnNumber: 19
    }
  }, "Page ", page, " ", hasNextPage ? "of ".concat(totalKnownPages, "+") : "of ".concat(totalKnownPages))), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.tableBody,
    ref: tableBodyRef,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1556,
      columnNumber: 17
    }
  }, isLoading ? __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.loadingState,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1558,
      columnNumber: 21
    }
  }, __jsx("img", {
    src: "/magmo-logo.png",
    alt: "Loading Magmo",
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.loadingLogo,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1559,
      columnNumber: 23
    }
  }), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.loadingText,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1564,
      columnNumber: 23
    }
  }, "Loading")) : loadError ? __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.errorState,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1567,
      columnNumber: 21
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.errorTitle,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1568,
      columnNumber: 23
    }
  }, "Load failed (", loadError.code, ")"), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.errorMessage,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1571,
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
      lineNumber: 1572,
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
      lineNumber: 1584,
      columnNumber: 21
    }
  })), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.tableFooter,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1602,
      columnNumber: 17
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.paginationRow,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1603,
      columnNumber: 19
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Pagination"], {
    size: "sm",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1604,
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
      lineNumber: 1605,
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
      lineNumber: 1612,
      columnNumber: 23
    }
  }, "Next"))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Form"], {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.searchRow,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1620,
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
      lineNumber: 1621,
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
      lineNumber: 1629,
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
      lineNumber: 1637,
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
      lineNumber: 1645,
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
      lineNumber: 1653,
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
      lineNumber: 1661,
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
      lineNumber: 1669,
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
      lineNumber: 1677,
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
      lineNumber: 1685,
      columnNumber: 23
    }
  }, "SKU"))), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.footerActions,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1695,
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
      lineNumber: 1696,
      columnNumber: 21
    }
  }), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Button"], {
    variant: "info",
    className: "".concat(_styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.actionButton, " ").concat(_styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.mapActionButton),
    onClick: openMap,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1702,
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
      lineNumber: 1709,
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
      lineNumber: 1722,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Offcanvas"].Header, {
    closeButton: true,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1730,
      columnNumber: 11
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Offcanvas"].Title, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1731,
      columnNumber: 13
    }
  }, "Filters")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Offcanvas"].Body, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1733,
      columnNumber: 11
    }
  }, renderFilters("drawer"))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"], {
    show: showMap,
    onHide: function onHide() {
      return setShowMap(false);
    },
    centered: true,
    size: "lg",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1736,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Header, {
    closeButton: true,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1742,
      columnNumber: 11
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Title, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1743,
      columnNumber: 13
    }
  }, "Warehouse Map")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Body, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1745,
      columnNumber: 11
    }
  }, mapLoading && __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.mapLoading,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1747,
      columnNumber: 15
    }
  }, __jsx(Spinner, {
    animation: "border",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1748,
      columnNumber: 17
    }
  }), __jsx("span", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1749,
      columnNumber: 17
    }
  }, "Loading map data\u2026")), mapError && __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.mapError,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1752,
      columnNumber: 26
    }
  }, mapError), !mapLoading && mapStep === "regions" && __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.mapStage,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1755,
      columnNumber: 15
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.mapHint,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1756,
      columnNumber: 17
    }
  }, "Select a region"), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.mapCanvas,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1757,
      columnNumber: 17
    }
  }, MAP_REGION_ORDER.map(function (regionId) {
    return __jsx("button", {
      key: regionId,
      type: "button",
      className: "".concat(_styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.regionBlock, " ").concat(_styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a["region".concat(regionId)]),
      onClick: function onClick() {
        return handleMapSelectRegion(regionId);
      },
      disabled: Array.isArray(mapRegionOptions) && mapRegionOptions.length > 0 && !mapRegionOptions.includes(regionId),
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1759,
        columnNumber: 21
      }
    }, regionId);
  }))), !mapLoading && mapStep === "grid" && __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.mapStage,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1778,
      columnNumber: 15
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.mapHint,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1779,
      columnNumber: 17
    }
  }, "Region ", mapRegion, ": choose a row and column"), function () {
    var dims = getMapRegionDimensions(mapRegion);
    var rows = mapLetters.slice(0, dims.rows || 0);
    var cols = mapNumbers.slice(0, dims.cols || 0);

    if (!rows.length || !cols.length) {
      return __jsx("div", {
        className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.mapEmpty,
        __self: _this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1788,
          columnNumber: 23
        }
      }, "No grid data for this region.");
    }

    return __jsx("div", {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.gridWrapper,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1794,
        columnNumber: 21
      }
    }, __jsx("div", {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.grid,
      style: {
        "--grid-cols": cols.length
      },
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1795,
        columnNumber: 23
      }
    }, rows.map(function (row) {
      return cols.map(function (col) {
        var _mapCellPallets$cellK;

        var cellKey = "".concat(row, "-").concat(col);
        var hasPallets = Boolean((_mapCellPallets$cellK = mapCellPallets[cellKey]) === null || _mapCellPallets$cellK === void 0 ? void 0 : _mapCellPallets$cellK.length);
        return __jsx("button", {
          key: cellKey,
          type: "button",
          className: "".concat(_styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.gridCell, " ").concat(hasPallets ? "" : _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.gridCellDisabled),
          onClick: function onClick() {
            return hasPallets && handleMapSelectCell(row, col);
          },
          disabled: !hasPallets,
          __self: _this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 1806,
            columnNumber: 31
          }
        }, __jsx("span", {
          __self: _this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 1817,
            columnNumber: 33
          }
        }, row, col));
      });
    })));
  }()), !mapLoading && mapStep === "pallets" && __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.mapStage,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1833,
      columnNumber: 15
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.mapHint,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1834,
      columnNumber: 17
    }
  }, "Region ", mapRegion, " \xB7 Section ", mapRow, mapCol, ": select a pallet"), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.palletGrid,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1838,
      columnNumber: 17
    }
  }, (mapCellPallets["".concat(mapRow, "-").concat(mapCol)] || []).map(function (pallet) {
    var palletKey = "".concat(mapRow, "-").concat(mapCol, "-P").concat(pallet);
    var bins = mapPalletBins[palletKey] || [];
    return __jsx("button", {
      key: pallet,
      type: "button",
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.palletButton,
      onClick: function onClick() {
        if (bins.length === 0) {
          handleMapView({
            region: mapRegion,
            sectionLetter: mapRow,
            sectionNumber: mapCol,
            pallet: pallet,
            bin: ""
          });
          setShowMap(false);
          return;
        }

        handleMapSelectPallet(pallet);
      },
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1844,
        columnNumber: 25
      }
    }, "Pallet ", pallet);
  }), !(mapCellPallets["".concat(mapRow, "-").concat(mapCol)] || []).length && __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.mapEmpty,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1869,
      columnNumber: 21
    }
  }, "No pallets available here."))), !mapLoading && mapStep === "bins" && __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.mapStage,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1878,
      columnNumber: 15
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.mapHint,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1879,
      columnNumber: 17
    }
  }, "Region ", mapRegion, " \xB7 Section ", mapRow, mapCol, " \xB7 Pallet ", mapPallet), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.palletGrid,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1883,
      columnNumber: 17
    }
  }, (mapPalletBins["".concat(mapRow, "-").concat(mapCol, "-P").concat(mapPallet)] || []).map(function (bin) {
    return __jsx("button", {
      key: bin,
      type: "button",
      className: "".concat(_styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.palletButton, " ").concat(_styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.binButton),
      onClick: function onClick() {
        return handleMapView({
          bin: bin
        });
      },
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1886,
        columnNumber: 23
      }
    }, "Bin ", bin);
  }), !(mapPalletBins["".concat(mapRow, "-").concat(mapCol, "-P").concat(mapPallet)] || []).length && __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.mapEmpty,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1898,
      columnNumber: 21
    }
  }, "No bins available on this pallet.")))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Footer, {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.mapFooter,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1906,
      columnNumber: 11
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Button"], {
    variant: "outline-secondary",
    onClick: handleMapBack,
    disabled: mapStep === "regions",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1907,
      columnNumber: 13
    }
  }, "Back"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Button"], {
    variant: "outline-primary",
    onClick: function onClick() {
      return handleMapView();
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1914,
      columnNumber: 13
    }
  }, "View"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Button"], {
    variant: "secondary",
    onClick: function onClick() {
      return setShowMap(false);
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1920,
      columnNumber: 13
    }
  }, "Close")))));
}

_s2(MainSearch, "TgxWj5UZjQ52/owtshyuv05Dr1k=", false, function () {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vcGFnZXMvTmV3U2VhcmNoL21haW5TZWFyY2guanMiXSwibmFtZXMiOlsiU09DQUxfQ0xJRU5UX0lEIiwiTk9SQ0FMX0NMSUVOVF9JRCIsIlVOQVNTSUdORURfQ0xJRU5UX0lEIiwiREVGQVVMVF9QQUdFX1NJWkUiLCJNQVBfUkVHSU9OX09SREVSIiwic2ltdWxhdGVOZXR3b3JrUmVxdWVzdCIsIlByb21pc2UiLCJyZXNvbHZlIiwic2V0VGltZW91dCIsIkxvYWRpbmdCdXR0b24iLCJ0eXBlIiwibmFtZSIsInJvdXRlIiwiY2xhc3NOYW1lIiwidXNlU3RhdGUiLCJpc0xvYWRpbmciLCJzZXRMb2FkaW5nIiwidXNlRWZmZWN0IiwiY2FuY2VsbGVkIiwidGhlbiIsInRvVGltZSIsInZhbHVlIiwic2Vjb25kcyIsIkRhdGUiLCJ0IiwiZ2V0VGltZSIsImlzTmFOIiwiaXNvIiwicGFyc2UiLCJwYXJ0cyIsInNwbGl0IiwibGVuZ3RoIiwibW0iLCJkZCIsInl5eXkiLCJhbHQiLCJ0b1lNRCIsImQiLCJnZXRGdWxsWWVhciIsIlN0cmluZyIsImdldE1vbnRoIiwicGFkU3RhcnQiLCJnZXREYXRlIiwibm9ybWFsaXplVGV4dCIsInRvTG93ZXJDYXNlIiwidHJpbSIsImdldE1hY2hpbmVGaWVsZCIsIml0ZW0iLCJrZXkiLCJsb3dlciIsIm1hY2hpbmVEYXRhIiwiY3VycmVudE1hY2hpbmVEYXRhIiwidGhlTWFjaGluZURhdGEiLCJUaGVNYWNoaW5lIiwiTWFpblNlYXJjaCIsInVzZUF1dGgiLCJzaWduT3V0IiwiaW5mbyIsInNldEluZm8iLCJiYWNrdXBJbmZvIiwic2V0QmFja3VwSW5mbyIsImF1Z21lbnRlZEluZm8iLCJzZXRBdWdtZW50ZWRJbmZvIiwic2V0SXNMb2FkaW5nIiwiaWRzIiwic2V0SUQiLCJzaG93Iiwic2V0U2hvdyIsInNob3dGaWx0ZXJzIiwic2V0U2hvd0ZpbHRlcnMiLCJwYWdlU2l6ZSIsInNldFBhZ2VTaXplIiwiaXNOYXZpZ2F0aW5nIiwic2V0SXNOYXZpZ2F0aW5nIiwiZEl0ZW0iLCJzZXRESXRlbSIsInNlbGVjdCIsInNldFNlbGVjdCIsInNob3dMaXN0Iiwic2V0U2hvd0xpc3QiLCJzaG93TGlzdFNlYXJjaCIsInNldFNob3dMaXN0U2VhcmNoIiwic2VhcmNoIiwic2V0U2VhcmNoIiwic2VsZWN0ZWRPRU0iLCJzZXRTZWxlY3RlZE9FTSIsInNlbGVjdGVkTW9kYWxpdHkiLCJzZXRTZWxlY3RlZE1vZGFsaXR5Iiwic2VsZWN0ZWRDbGllbnRGcm9tIiwic2V0U2VsZWN0ZWRDbGllbnRGcm9tIiwiY2xpZW50RnJvbUJ1dHRvblRleHQiLCJzZXRDbGllbnRGcm9tQnV0dG9uVGV4dCIsInNlbGVjdGVkQ2xpZW50Q3VycmVudCIsInNldFNlbGVjdGVkQ2xpZW50Q3VycmVudCIsImNsaWVudEN1cnJlbnRCdXR0b25UZXh0Iiwic2V0Q2xpZW50Q3VycmVudEJ1dHRvblRleHQiLCJjbGllbnRzIiwic2V0Q2xpZW50cyIsInNob3dDbGllbnRNb2RhbCIsInNldFNob3dDbGllbnRNb2RhbCIsImNsaWVudFNlbGVjdGlvblR5cGUiLCJzZXRDbGllbnRTZWxlY3Rpb25UeXBlIiwic2hvd01hcCIsInNldFNob3dNYXAiLCJtYXBSZWdpb25PcHRpb25zIiwic2V0TWFwUmVnaW9uT3B0aW9ucyIsIm1hcFNlY3Rpb25NYXAiLCJzZXRNYXBTZWN0aW9uTWFwIiwibWFwU3RlcCIsInNldE1hcFN0ZXAiLCJtYXBSZWdpb24iLCJzZXRNYXBSZWdpb24iLCJtYXBSb3ciLCJzZXRNYXBSb3ciLCJtYXBDb2wiLCJzZXRNYXBDb2wiLCJtYXBQYWxsZXQiLCJzZXRNYXBQYWxsZXQiLCJtYXBDZWxsUGFsbGV0cyIsInNldE1hcENlbGxQYWxsZXRzIiwibWFwUGFsbGV0QmlucyIsInNldE1hcFBhbGxldEJpbnMiLCJtYXBMb2FkaW5nIiwic2V0TWFwTG9hZGluZyIsIm1hcEVycm9yIiwic2V0TWFwRXJyb3IiLCJtYXBEaXJlY3RvcnlMb2FkZWQiLCJzZXRNYXBEaXJlY3RvcnlMb2FkZWQiLCJyb3V0ZXIiLCJ1c2VSb3V0ZXIiLCJsYWJlbEJhc2UiLCJsYWJlbEJhc2VOYW1lcyIsInNvcnRDaGVja0Jhc2UiLCJ3aXRoU29ydEljb24iLCJiYXNlTGFiZWxzIiwiYWN0aXZlSW5kZXgiLCJpc0Rlc2MiLCJtYXAiLCJ0ZXh0IiwiaSIsImFycm93IiwibGFiZWxzIiwic2V0TGFiZWxzIiwic29ydENoZWNrIiwic2V0U29ydENoZWNrIiwiaG92ZXJJbmRleCIsInNldEhvdmVySW5kZXgiLCJzZWxlY3RlZE1vZGVsIiwic2V0U2VsZWN0ZWRNb2RlbCIsImdQb3MiLCJzZXRHUG9zIiwiZ0lkZSIsInNldEdJZGUiLCJpc0RlbGV0aW5nIiwic2V0SXNEZWxldGluZyIsInBhZ2UiLCJzZXRQYWdlIiwicGFnZUN1cnNvcnMiLCJzZXRQYWdlQ3Vyc29ycyIsImhhc05leHRQYWdlIiwic2V0SGFzTmV4dFBhZ2UiLCJmZXRjaFNlcSIsInVzZVJlZiIsImJhY2tmaWxsSW5GbGlnaHQiLCJxdWVyeUVwb2NoIiwic2V0UXVlcnlFcG9jaCIsImxvYWRFcnJvciIsInNldExvYWRFcnJvciIsInRhYmxlQm9keVJlZiIsInJvd0hlaWdodFJlZiIsImhlYWRlckhlaWdodFJlZiIsIkxPQURfVElNRU9VVF9NUyIsIm1hcExldHRlcnMiLCJ1c2VNZW1vIiwiQXJyYXkiLCJmcm9tIiwiXyIsImZyb21DaGFyQ29kZSIsIm1hcE51bWJlcnMiLCJsb2FkTWFwRGlyZWN0b3J5IiwidXNlQ2FsbGJhY2siLCJmaXJlYmFzZSIsImZpcmVzdG9yZSIsImNvbGxlY3Rpb24iLCJkb2MiLCJnZXQiLCJkYXRhIiwiUmVnaW9uIiwiU2VjdGlvbiIsImNvbnNvbGUiLCJlcnJvciIsImdldE1hcFJlZ2lvbkRpbWVuc2lvbnMiLCJyZWdpb25JZCIsImVudHJ5IiwiaXNBcnJheSIsImNvbHMiLCJwYXJzZUludCIsInJvd3MiLCJOdW1iZXIiLCJpc0Zpbml0ZSIsImxvYWRNYXBJbnZlbnRvcnkiLCJ3aGVyZSIsInNuYXAiLCJjZWxsUGFsbGV0cyIsInBhbGxldEJpbnMiLCJmb3JFYWNoIiwibG9jIiwibmV3TG9jYWxDdXJyZW50Iiwicm93Iiwic2VjdGlvbiIsImxldHRlciIsImNvbCIsIm51bWJlciIsInRyaW1tZWQiLCJzbGljZSIsInVuZGVmaW5lZCIsInBhbGxldCIsImJpbiIsImNlbGxLZXkiLCJTZXQiLCJhZGQiLCJwYWxsZXRLZXkiLCJjZWxsT2JqIiwiT2JqZWN0Iiwia2V5cyIsInNvcnQiLCJhIiwiYiIsInBhbGxldE9iaiIsIm9wZW5NYXAiLCJoYW5kbGVNYXBTZWxlY3RSZWdpb24iLCJoYW5kbGVNYXBTZWxlY3RDZWxsIiwicm93TGV0dGVyIiwiY29sTnVtYmVyIiwiaGFuZGxlTWFwU2VsZWN0UGFsbGV0IiwicGFsbGV0SWQiLCJoYW5kbGVNYXBCYWNrIiwiaGFuZGxlTWFwVmlldyIsIm92ZXJyaWRlcyIsInBhcmFtcyIsIlVSTFNlYXJjaFBhcmFtcyIsInJlZ2lvblZhbHVlIiwicmVnaW9uIiwibGV0dGVyVmFsdWUiLCJzZWN0aW9uTGV0dGVyIiwibnVtYmVyVmFsdWUiLCJzZWN0aW9uTnVtYmVyIiwicGFsbGV0VmFsdWUiLCJiaW5WYWx1ZSIsInNldCIsInF1ZXJ5IiwidG9TdHJpbmciLCJwdXNoIiwic3RhcnROYW1lVG9rZW5CYWNrZmlsbCIsInJlYXNvbiIsImN1cnJlbnQiLCJsYXN0UnVuIiwid2luZG93IiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsIm5vdyIsImRiIiwibGFzdERvYyIsInRva2Vuc0VxdWFsIiwic2V0QSIsInNldEIiLCJzaXplIiwidiIsImhhcyIsIm9yZGVyQnkiLCJGaWVsZFBhdGgiLCJkb2N1bWVudElkIiwibGltaXQiLCJzdGFydEFmdGVyIiwiZW1wdHkiLCJiYXRjaCIsIndyaXRlcyIsImRvY3MiLCJuYW1lTG93ZXIiLCJuYW1lVG9rZW5zIiwiYnVpbGROYW1lVG9rZW5zIiwiZXhpc3RpbmdUb2tlbnMiLCJuZWVkc1VwZGF0ZSIsInVwZGF0ZSIsInJlZiIsImNvbW1pdCIsInNldEl0ZW0iLCJzZWFyY2hMb3dlciIsImhhc0FjdGl2ZUZpbHRlcnMiLCJCb29sZWFuIiwidmFsdWVNYXRjaGVzIiwicyIsInNvbWUiLCJpbmNsdWRlcyIsIm1hdGNoZXNGaWx0ZXJzIiwidmlzaWJsZSIsIk9FTSIsIk1vZGFsaXR5IiwiTW9kZWwiLCJjbGllbnRGcm9tSWQiLCJjbGllbnRDdXJyZW50SWQiLCJ3YW50ZWREYXkiLCJpdGVtWU1EIiwiZGF0ZSIsImRlc2NyaXB0aW9ucyIsIndvcmtPcmRlcnMiLCJ3Iiwid28iLCJ3b3JrT3JkZXIiLCJwbiIsInNuIiwiZGVzYyIsImRlc2NyaXB0aW9uIiwiaWQiLCJsb2NhbFNOIiwibG9jYWxfc24iLCJyZXNldFBhZ2luYXRpb24iLCJhc1BhdGgiLCJmZXRjaERhdGEiLCJldmVudHMiLCJoYW5kbGVEb25lIiwib24iLCJvZmYiLCJyZXF1ZXN0ZWRQYWdlIiwic2VxIiwidGltZWRPdXQiLCJ0aW1lb3V0SWQiLCJjb2RlIiwibWVzc2FnZSIsIk1hdGgiLCJyb3VuZCIsImlucHV0VGV4dCIsInNlbGVjdGVkVHlwZSIsInN0YXJ0QWZ0ZXJEb2MiLCJjbGVhclRpbWVvdXQiLCJlZmZlY3RpdmVTZWxlY3QiLCJlZmZlY3RpdmVTZWFyY2giLCJlZmZlY3RpdmVTZWFyY2hMb3dlciIsImxvYWQiLCJhdHRlbXB0IiwiZmV0Y2hQYXJ0c1dpdGhNYWNoaW5lRGF0YVBhZ2UiLCJ2aXNpYmxlT25seSIsImZpbHRlckZuIiwicmF3IiwibmVlZHNNYWNoaW5lRGF0YSIsInIiLCJwb3ciLCJuZXh0UGFnZSIsImhhc05hbWVTZWFyY2giLCJwcmV2IiwibmV4dCIsInNldFNlbGVjdGVkSXRlbXMiLCJhdWdtZW50ZWQiLCJDbGllbnRGcm9tIiwiQ2xpZW50Q3VycmVudCIsImZpbHRlciIsInNlYXJjaENoYW5nZUhhbmRsZXIiLCJldmVudCIsInRhcmdldCIsImJhc2UiLCJzb3J0Q2hlY2tBbGwiLCJwb3MiLCJuZXh0U29ydENoZWNrIiwic29ydGVkSW5mbyIsInRhIiwidGIiLCJhdiIsImJ2IiwibG9jYWxlQ29tcGFyZSIsImFuIiwiYm4iLCJyb3dTZWxlY3QiLCJsb2ciLCJzZWxlY3RlZEl0ZW1zIiwic2hvd0RlbGV0ZU1vZGFsIiwic2V0U2hvd0RlbGV0ZU1vZGFsIiwiaGFuZGxlU2VsZWN0SXRlbSIsIngiLCJoYW5kbGVTaG93RGVsZXRlTW9kYWwiLCJoYW5kbGVDbG9zZURlbGV0ZU1vZGFsIiwiaGFuZGxlRGVsZXRlU2VsZWN0ZWQiLCJpdGVtSWQiLCJkZWxldGVGcm9tU3RvcmFnZSIsImhhbmRsZUNsb3NlIiwiaGFuZGxlU2hvdyIsImNoZWNrRGVsZXRlIiwiaWRzVG9EZWxldGUiLCJwcmV2ZW50RGVmYXVsdCIsInN0b3BQcm9wYWdhdGlvbiIsImhvdmVyU3R5bGUiLCJpbmRleCIsImJhY2tncm91bmRDb2xvciIsInRleHRBbGlnbiIsImN1cnNvciIsImRyb3Bkb3duMVRleHQiLCJzZXREcm9wZG93bjFUZXh0IiwiZHJvcGRvd24yVGV4dCIsInNldERyb3Bkb3duMlRleHQiLCJoYW5kbGVTZWxlY3QxIiwiZXZlbnRLZXkiLCJ0ZXh0Q29udGVudCIsImhhbmRsZVNlbGVjdDIiLCJidWlsZENsaWVudHNGcm9tSXRlbXMiLCJmaWx0ZXJlZCIsIml0Iiwib3V0IiwiaWRBcnJheSIsImNodW5rIiwiaGFuZGxlQ2xpZW50Q2xpY2siLCJzYWZlQ2xpZW50cyIsImZldGNoQ2xpZW50cyIsImNsaWVudHNEYXRhIiwiZGVyaXZlZCIsInNldENsaWVudFNlYXJjaFRlcm0iLCJoYW5kbGVDbGllbnRTZWxlY3QiLCJjbGllbnRJZCIsImNsaWVudFNuYXAiLCJleGlzdHMiLCJjbGllbnREYXRhIiwiaGFuZGxlQ2xpZW50SW5mbyIsImNsaWVudE5hbWUiLCJoYW5kbGVDbGVhckNsaWVudFNlbGVjdGlvbiIsIm1vZGVscyIsInNldE1vZGVscyIsInNob3dNb2RlbE1vZGFsIiwic2V0U2hvd01vZGVsTW9kYWwiLCJtb2RlbEJ1dHRvblRleHQiLCJzZXRNb2RlbEJ1dHRvblRleHQiLCJoYW5kbGVNb2RlbENsaWNrIiwiZmV0Y2hNb2RlbHMiLCJtb2RlbHNEYXRhIiwic2V0TW9kZWxTZWFyY2hUZXJtIiwiaGFuZGxlTW9kZWxTZWxlY3QiLCJtb2RlbE5hbWUiLCJoYW5kbGVDbGVhck1vZGVsU2VsZWN0aW9uIiwiaGFuZGxlU29DYWxXYXJlaG91c2VDbGljayIsImhhbmRsZU5vckNhbFdhcmVob3VzZUNsaWNrIiwiaGFuZGxlV2FyZWhvdXNlVW5hc3NpZ25lZENsaWNrIiwiY2xpZW50U2VhcmNoVGVybSIsIm1vZGVsU2VhcmNoVGVybSIsInN0b3JhZ2VSZWYiLCJzdG9yYWdlIiwiZm9sZGVyUmVmIiwiY2hpbGQiLCJsaXN0QWxsIiwibGlzdFJlc3VsdCIsImRlbGV0ZVByb21pc2VzIiwiaXRlbXMiLCJhbGwiLCJkZWxldGVGcm9tUGFydHNDb2xsZWN0aW9uIiwidG90YWxLbm93blBhZ2VzIiwibWF4IiwicGFnZUJ1dHRvbnMiLCJidXR0b25zIiwibWF4VmlzaWJsZSIsInB1c2hQYWdlIiwicCIsInB1c2hFbGxpcHNpcyIsInN0YXJ0IiwiZW5kIiwibWluIiwiZGVzaXJlZFdpbmRvdyIsImN1cnJlbnRXaW5kb3ciLCJyZW1haW5pbmciLCJyZWNhbGNQYWdlU2l6ZSIsImNvbnRhaW5lckhlaWdodCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImhlaWdodCIsImhlYWRlclJvdyIsInF1ZXJ5U2VsZWN0b3IiLCJib2R5Um93IiwiaCIsInZlcnRpY2FsUGFkZGluZyIsImF2YWlsYWJsZSIsImVzdGltYXRlZCIsImZsb29yIiwiY2xhbXBlZCIsIm9uUmVzaXplIiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJyZW5kZXJGaWx0ZXJzIiwiaWRQcmVmaXgiLCJzdHlsZXMiLCJmaWx0ZXJzUGFuZWwiLCJmaWx0ZXJzSGVhZGVyIiwiZmlsdGVyc1RpdGxlIiwiZmlsdGVyc1N1YnRpdGxlIiwiZmlsdGVyc0JhZGdlIiwiZmlsdGVyU2VjdGlvbiIsImZpbHRlclNlY3Rpb25UaXRsZSIsImlucHV0R3JvdXAiLCJpbnB1dEJ1dHRvbiIsImJ1dHRvbkdyb3VwIiwiZmxleEJ1dHRvbiIsImxvYWRpbmdPdmVybGF5IiwibG9hZGluZ0xvZ28iLCJlIiwiY2xpZW50IiwibW9kZWwiLCJwYWdlSW5uZXIiLCJoZWFkZXIiLCJoZWFkZXJMZWZ0IiwiYnVyZ2VyIiwiYnJhbmQiLCJicmFuZExvZ28iLCJicmFuZE5hbWUiLCJicmFuZFN1YiIsImhlYWRlclJpZ2h0IiwiaGVhZGVyU3RhdHVzIiwiY29udGVudCIsInNpZGViYXIiLCJtYWluIiwidGFibGVDYXJkIiwidGFibGVIZWFkZXIiLCJ0YWJsZVRpdGxlIiwidGFibGVTdWJ0aXRsZSIsInRhYmxlTWV0YSIsInRhYmxlQm9keSIsImxvYWRpbmdTdGF0ZSIsImxvYWRpbmdUZXh0IiwiZXJyb3JTdGF0ZSIsImVycm9yVGl0bGUiLCJlcnJvck1lc3NhZ2UiLCJ0YWJsZUZvb3RlciIsInBhZ2luYXRpb25Sb3ciLCJzZWFyY2hSb3ciLCJzZWFyY2hJbnB1dCIsInNlYXJjaFNlbGVjdCIsImZvb3RlckFjdGlvbnMiLCJhY3Rpb25CdXR0b24iLCJtYXBBY3Rpb25CdXR0b24iLCJmaWx0ZXJzRHJhd2VyIiwibWFwU3RhZ2UiLCJtYXBIaW50IiwibWFwQ2FudmFzIiwicmVnaW9uQmxvY2siLCJkaW1zIiwibWFwRW1wdHkiLCJncmlkV3JhcHBlciIsImdyaWQiLCJoYXNQYWxsZXRzIiwiZ3JpZENlbGwiLCJncmlkQ2VsbERpc2FibGVkIiwicGFsbGV0R3JpZCIsImJpbnMiLCJwYWxsZXRCdXR0b24iLCJiaW5CdXR0b24iLCJtYXBGb290ZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFXQTtBQUNBO0FBQ0E7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtDQUdBOztBQUNBLElBQU1BLGVBQWUsR0FBRyxVQUF4QjtBQUNB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QUFBLGFBQU1pSSxhQUFhLEVBQW5CO0FBQUEsS0FGWDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFlBUkYsRUFjRSxNQUFDLHNEQUFEO0FBQVEsV0FBTyxFQUFDLFdBQWhCO0FBQTRCLFdBQU8sRUFBRTtBQUFBLGFBQU10SSxVQUFVLENBQUMsS0FBRCxDQUFoQjtBQUFBLEtBQXJDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFkRixDQTFLRixDQXJPRixDQTlFRixDQURGO0FBc2ZEOztJQTd2RHVCakQsVTtVQUNGQyxpRSxFQXlDTDBFLHFEOzs7TUExQ08zRSxVIiwiZmlsZSI6InN0YXRpYy93ZWJwYWNrL3BhZ2VzL05ld1NlYXJjaC9tYWluU2VhcmNoLjE0YjA4MTZmZmUwNjNhN2VjMmQ2LmhvdC11cGRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSwgdXNlUmVmLCB1c2VDYWxsYmFjayB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHtcbiAgSW5wdXRHcm91cCxcbiAgRHJvcGRvd24sXG4gIEZvcm1Db250cm9sLFxuICBCdXR0b24sXG4gIE5hdkRyb3Bkb3duLFxuICBGb3JtLFxuICBNb2RhbCxcbiAgUGFnaW5hdGlvbixcbiAgT2ZmY2FudmFzLFxufSBmcm9tIFwicmVhY3QtYm9vdHN0cmFwXCI7XG5pbXBvcnQgTGluayBmcm9tIFwibmV4dC9saW5rXCI7XG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tIFwibmV4dC9yb3V0ZXJcIjtcbmltcG9ydCB7XG4gIGZldGNoUGFydHNXaXRoTWFjaGluZURhdGFQYWdlLFxuICBmZXRjaENsaWVudHMsXG4gIGZldGNoTW9kZWxzLFxufSBmcm9tIFwiLi4vLi4vdXRpbHMvZmV0Y2hBc3NvY2lhdGlvbnNcIjtcbmltcG9ydCB7IHVzZUF1dGggfSBmcm9tIFwiLi4vLi4vY29udGV4dC9BdXRoVXNlckNvbnRleHRcIjtcclxuaW1wb3J0IExvZ2dlZEluIGZyb20gXCIuLi9Mb2dnZWRJblwiO1xyXG5pbXBvcnQgQ2xpZW50VGFibGUgZnJvbSBcIi4uLy4uL3V0aWxzL0NsaWVudFRhYmxlXCI7XHJcbmltcG9ydCBNb2RlbFRhYmxlIGZyb20gXCIuLi8uLi91dGlscy9Nb2RlbFRhYmxlXCI7XHJcbmltcG9ydCBQYXJ0VGFibGUgZnJvbSBcIi4uLy4uL3V0aWxzL1BhcnRUYWJsZVwiO1xuaW1wb3J0IHN0eWxlcyBmcm9tIFwiLi4vLi4vc3R5bGVzL01haW5TZWFyY2gubW9kdWxlLmNzc1wiO1xuaW1wb3J0IGZpcmViYXNlIGZyb20gXCIuLi8uLi9jb250ZXh0L0ZpcmViYXNlXCI7XG5pbXBvcnQgeyBidWlsZE5hbWVUb2tlbnMgfSBmcm9tIFwiLi4vLi4vdXRpbHMvaXRlbUZvcm1TaGFyZWRcIjtcblxyXG4vLyBQcmVkZWZpbmVkIHdhcmVob3VzZSBjbGllbnQgSURzIGFuZCBkaXNwbGF5IG5hbWVzXHJcbmNvbnN0IFNPQ0FMX0NMSUVOVF9JRCA9IFwiQUlTMTcxODJcIjtcclxuY29uc3QgTk9SQ0FMX0NMSUVOVF9JRCA9IFwiQUlTMjUwOTdcIjtcbmNvbnN0IFVOQVNTSUdORURfQ0xJRU5UX0lEID0gXCJBSVMwMDQwNFwiO1xuY29uc3QgREVGQVVMVF9QQUdFX1NJWkUgPSAyNTtcbmNvbnN0IE1BUF9SRUdJT05fT1JERVIgPSBbXCJFXCIsIFwiRlwiLCBcIkdcIiwgXCJBXCIsIFwiRFwiLCBcIkNcIiwgXCJCXCJdO1xuXHJcblxyXG4vLyBTaW11bGF0ZXMgYSBuZXR3b3JrIHJlcXVlc3QgZGVsYXlcclxuZnVuY3Rpb24gc2ltdWxhdGVOZXR3b3JrUmVxdWVzdCgpIHtcclxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgMjAwMCkpO1xyXG59XHJcblxyXG4vLyBDdXN0b20gTG9hZGluZ0J1dHRvbiBjb21wb25lbnRcclxuZnVuY3Rpb24gTG9hZGluZ0J1dHRvbih7IHR5cGUsIG5hbWUsIHJvdXRlLCBjbGFzc05hbWUgfSkge1xuICBjb25zdCBbaXNMb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChpc0xvYWRpbmcpIHtcbiAgICAgIGxldCBjYW5jZWxsZWQgPSBmYWxzZTtcbiAgICAgIHNpbXVsYXRlTmV0d29ya1JlcXVlc3QoKS50aGVuKCgpID0+IHtcbiAgICAgICAgaWYgKCFjYW5jZWxsZWQpIHNldExvYWRpbmcoZmFsc2UpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBjYW5jZWxsZWQgPSB0cnVlO1xuICAgICAgfTtcbiAgICB9XG4gIH0sIFtpc0xvYWRpbmddKTtcblxyXG4gIHJldHVybiAoXG4gICAgPExpbmsgaHJlZj17YC8ke3JvdXRlfWB9PlxuICAgICAgPGFcbiAgICAgICAgY2xhc3NOYW1lPXtgYnRuIGJ0bi0ke3R5cGV9ICR7Y2xhc3NOYW1lIHx8IFwiXCJ9YH1cbiAgICAgICAgZGlzYWJsZWQ9e2lzTG9hZGluZ31cbiAgICAgICAgb25DbGljaz17KCkgPT4gIWlzTG9hZGluZyAmJiBzZXRMb2FkaW5nKHRydWUpfVxuICAgICAgPlxuICAgICAgICB7aXNMb2FkaW5nID8gXCJMb2FkaW5n4oCmXCIgOiBuYW1lfVxyXG4gICAgICA8L2E+XHJcbiAgICA8L0xpbms+XHJcbiAgKTtcclxufVxyXG5cclxuLy8gLS0tLSBEQVRFIEhFTFBFUlMgKHRvcC1sZXZlbCBzY29wZSkgLS0tLVxyXG5cclxuLy8gQ29udmVydCBhbnl0aGluZyBkYXRlLWlzaCBpbnRvIGEgdGltZXN0YW1wIChtcyBzaW5jZSBlcG9jaCkuXHJcbmZ1bmN0aW9uIHRvVGltZSh2YWx1ZSkge1xyXG4gIGlmICghdmFsdWUpIHJldHVybiBudWxsO1xyXG5cclxuICAvLyBGaXJlc3RvcmUgVGltZXN0YW1wIHsgc2Vjb25kcywgbmFub3NlY29uZHMgfVxyXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiYgdmFsdWUgIT09IG51bGwgJiYgdmFsdWUuc2Vjb25kcyAhPSBudWxsKSB7XHJcbiAgICB0cnkgeyByZXR1cm4gdmFsdWUuc2Vjb25kcyAqIDEwMDA7IH0gY2F0Y2ggeyAvKiBpZ25vcmUgKi8gfVxyXG4gIH1cclxuXHJcbiAgLy8gTmF0aXZlIERhdGVcclxuICBpZiAodmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XHJcbiAgICBjb25zdCB0ID0gdmFsdWUuZ2V0VGltZSgpO1xyXG4gICAgcmV0dXJuIGlzTmFOKHQpID8gbnVsbCA6IHQ7XHJcbiAgfVxyXG5cclxuICAvLyBTdHJpbmdzXHJcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgLy8gSVNPIC8geXl5eS1tbS1kZFxyXG4gICAgY29uc3QgaXNvID0gRGF0ZS5wYXJzZSh2YWx1ZSk7XHJcbiAgICBpZiAoIWlzTmFOKGlzbykpIHJldHVybiBpc287XHJcblxyXG4gICAgLy8gbW0vZGQveXl5eVxyXG4gICAgY29uc3QgcGFydHMgPSB2YWx1ZS5zcGxpdChcIi9cIik7XHJcbiAgICBpZiAocGFydHMubGVuZ3RoID09PSAzKSB7XHJcbiAgICAgIGNvbnN0IFttbSwgZGQsIHl5eXldID0gcGFydHM7XHJcbiAgICAgIGNvbnN0IGFsdCA9IERhdGUucGFyc2UoYCR7eXl5eX0tJHttbX0tJHtkZH1gKTtcclxuICAgICAgaWYgKCFpc05hTihhbHQpKSByZXR1cm4gYWx0O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gTGFzdCByZXNvcnRcclxuICBjb25zdCB0ID0gRGF0ZS5wYXJzZSh2YWx1ZSk7XHJcbiAgcmV0dXJuIGlzTmFOKHQpID8gbnVsbCA6IHQ7XHJcbn1cclxuXHJcbi8vIENhbm9uaWNhbGl6ZSB0byAneXl5eS1tbS1kZCcgKG1hdGNoZXMgPGlucHV0IHR5cGU9XCJkYXRlXCI+KVxyXG5mdW5jdGlvbiB0b1lNRCh2YWx1ZSkge1xuICBjb25zdCB0ID0gdG9UaW1lKHZhbHVlKTtcbiAgaWYgKHQgPT0gbnVsbCkgcmV0dXJuIG51bGw7XG4gIGNvbnN0IGQgPSBuZXcgRGF0ZSh0KTtcbiAgY29uc3QgeXl5eSA9IGQuZ2V0RnVsbFllYXIoKTtcbiAgY29uc3QgbW0gPSBTdHJpbmcoZC5nZXRNb250aCgpICsgMSkucGFkU3RhcnQoMiwgXCIwXCIpO1xuICBjb25zdCBkZCA9IFN0cmluZyhkLmdldERhdGUoKSkucGFkU3RhcnQoMiwgXCIwXCIpO1xuICByZXR1cm4gYCR7eXl5eX0tJHttbX0tJHtkZH1gO1xufVxuXG5mdW5jdGlvbiBub3JtYWxpemVUZXh0KHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PSBudWxsKSByZXR1cm4gXCJcIjtcbiAgcmV0dXJuIFN0cmluZyh2YWx1ZSkudG9Mb3dlckNhc2UoKS50cmltKCk7XG59XG5cbmZ1bmN0aW9uIGdldE1hY2hpbmVGaWVsZChpdGVtLCBrZXkpIHtcbiAgaWYgKCFpdGVtKSByZXR1cm4gbnVsbDtcbiAgY29uc3QgbG93ZXIgPSBrZXkudG9Mb3dlckNhc2UoKTtcbiAgcmV0dXJuIChcbiAgICBpdGVtPy5tYWNoaW5lRGF0YT8uW2tleV0gPz9cbiAgICBpdGVtPy5tYWNoaW5lRGF0YT8uW2xvd2VyXSA/P1xuICAgIGl0ZW0/LmN1cnJlbnRNYWNoaW5lRGF0YT8uW2tleV0gPz9cbiAgICBpdGVtPy5jdXJyZW50TWFjaGluZURhdGE/Lltsb3dlcl0gPz9cbiAgICBpdGVtPy50aGVNYWNoaW5lRGF0YT8uW2tleV0gPz9cbiAgICBpdGVtPy50aGVNYWNoaW5lRGF0YT8uW2xvd2VyXSA/P1xuICAgIGl0ZW0/LlRoZU1hY2hpbmU/LltrZXldID8/XG4gICAgaXRlbT8uVGhlTWFjaGluZT8uW2xvd2VyXSA/P1xuICAgIG51bGxcbiAgKTtcbn1cblxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBNYWluU2VhcmNoKCkge1xuICBjb25zdCB7IHNpZ25PdXQgfSA9IHVzZUF1dGgoKTtcclxuICBjb25zdCBbaW5mbywgc2V0SW5mb10gPSB1c2VTdGF0ZShbXSk7XHJcbiAgY29uc3QgW2JhY2t1cEluZm8sIHNldEJhY2t1cEluZm9dID0gdXNlU3RhdGUoW10pO1xyXG4gIGNvbnN0IFthdWdtZW50ZWRJbmZvLCBzZXRBdWdtZW50ZWRJbmZvXSA9IHVzZVN0YXRlKFtdKTsgLy8gaXRlbXMgd2l0aCBjbGllbnRGcm9tSWQvY3VycmVudElkIGFkZGVkXHJcbiAgY29uc3QgW2lzTG9hZGluZywgc2V0SXNMb2FkaW5nXSA9IHVzZVN0YXRlKHRydWUpO1xyXG4gIGNvbnN0IFtpZHMsIHNldElEXSA9IHVzZVN0YXRlKFtdKTtcbiAgY29uc3QgW3Nob3csIHNldFNob3ddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbc2hvd0ZpbHRlcnMsIHNldFNob3dGaWx0ZXJzXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3BhZ2VTaXplLCBzZXRQYWdlU2l6ZV0gPSB1c2VTdGF0ZShERUZBVUxUX1BBR0VfU0laRSk7XG4gIGNvbnN0IFtpc05hdmlnYXRpbmcsIHNldElzTmF2aWdhdGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtkSXRlbSwgc2V0REl0ZW1dID0gdXNlU3RhdGUoKTtcclxuICBjb25zdCBbc2VsZWN0LCBzZXRTZWxlY3RdID0gdXNlU3RhdGUoXCJOYW1lXCIpO1xyXG4gIGNvbnN0IFtzaG93TGlzdCwgc2V0U2hvd0xpc3RdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtzaG93TGlzdFNlYXJjaCwgc2V0U2hvd0xpc3RTZWFyY2hdID0gdXNlU3RhdGUoXCJ0ZXh0XCIpO1xyXG4gIGNvbnN0IFtzZWFyY2gsIHNldFNlYXJjaF0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbc2VsZWN0ZWRPRU0sIHNldFNlbGVjdGVkT0VNXSA9IHVzZVN0YXRlKG51bGwpO1xyXG4gIGNvbnN0IFtzZWxlY3RlZE1vZGFsaXR5LCBzZXRTZWxlY3RlZE1vZGFsaXR5XSA9IHVzZVN0YXRlKG51bGwpO1xyXG4gIC8vIFJlcGxhY2UgdGhlIG9sZCBzaW5nbGUgY2xpZW50IHN0YXRlIHdpdGggdHdvIHNldHM6XHJcbiAgY29uc3QgW3NlbGVjdGVkQ2xpZW50RnJvbSwgc2V0U2VsZWN0ZWRDbGllbnRGcm9tXSA9IHVzZVN0YXRlKG51bGwpO1xyXG4gIGNvbnN0IFtjbGllbnRGcm9tQnV0dG9uVGV4dCwgc2V0Q2xpZW50RnJvbUJ1dHRvblRleHRdID0gdXNlU3RhdGUoXCJTZWxlY3QgT3B0aW9uXCIpO1xyXG4gIGNvbnN0IFtzZWxlY3RlZENsaWVudEN1cnJlbnQsIHNldFNlbGVjdGVkQ2xpZW50Q3VycmVudF0gPSB1c2VTdGF0ZShudWxsKTtcclxuICBjb25zdCBbY2xpZW50Q3VycmVudEJ1dHRvblRleHQsIHNldENsaWVudEN1cnJlbnRCdXR0b25UZXh0XSA9IHVzZVN0YXRlKFwiU2VsZWN0IE9wdGlvblwiKTtcclxuXHJcbiAgY29uc3QgW2NsaWVudHMsIHNldENsaWVudHNdID0gdXNlU3RhdGUoW10pO1xuICBjb25zdCBbc2hvd0NsaWVudE1vZGFsLCBzZXRTaG93Q2xpZW50TW9kYWxdID0gdXNlU3RhdGUoZmFsc2UpO1xuICAvLyBUaGlzIHN0YXRlIHRlbGxzIHRoZSBtb2RhbCB3aGljaCBjbGllbnQgYm94IGlzIGJlaW5nIHVwZGF0ZWQ6IFwiZnJvbVwiIG9yIFwiY3VycmVudFwiXG4gIGNvbnN0IFtjbGllbnRTZWxlY3Rpb25UeXBlLCBzZXRDbGllbnRTZWxlY3Rpb25UeXBlXSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbc2hvd01hcCwgc2V0U2hvd01hcF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFttYXBSZWdpb25PcHRpb25zLCBzZXRNYXBSZWdpb25PcHRpb25zXSA9IHVzZVN0YXRlKFtdKTtcbiAgY29uc3QgW21hcFNlY3Rpb25NYXAsIHNldE1hcFNlY3Rpb25NYXBdID0gdXNlU3RhdGUoe30pO1xuICBjb25zdCBbbWFwU3RlcCwgc2V0TWFwU3RlcF0gPSB1c2VTdGF0ZShcInJlZ2lvbnNcIik7XG4gIGNvbnN0IFttYXBSZWdpb24sIHNldE1hcFJlZ2lvbl0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW21hcFJvdywgc2V0TWFwUm93XSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbbWFwQ29sLCBzZXRNYXBDb2xdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFttYXBQYWxsZXQsIHNldE1hcFBhbGxldF0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW21hcENlbGxQYWxsZXRzLCBzZXRNYXBDZWxsUGFsbGV0c10gPSB1c2VTdGF0ZSh7fSk7XG4gIGNvbnN0IFttYXBQYWxsZXRCaW5zLCBzZXRNYXBQYWxsZXRCaW5zXSA9IHVzZVN0YXRlKHt9KTtcbiAgY29uc3QgW21hcExvYWRpbmcsIHNldE1hcExvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbbWFwRXJyb3IsIHNldE1hcEVycm9yXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbbWFwRGlyZWN0b3J5TG9hZGVkLCBzZXRNYXBEaXJlY3RvcnlMb2FkZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xuXHJcbiAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XHJcbiAgY29uc3QgbGFiZWxCYXNlID0gW1wibmFtZVwiLCBcImRhdGVcIiwgXCJ3L29cIiwgXCJwL25cIiwgXCJzL25cIl07XHJcbiAgY29uc3QgbGFiZWxCYXNlTmFtZXMgPSBbXCJuYW1lXCIsIFwiZGF0ZVwiLCBcIndvXCIsIFwicG5cIiwgXCJzblwiXTtcclxuICBjb25zdCBzb3J0Q2hlY2tCYXNlID0gW2ZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2VdO1xyXG5cclxuICBmdW5jdGlvbiB3aXRoU29ydEljb24oYmFzZUxhYmVscywgYWN0aXZlSW5kZXgsIGlzRGVzYykge1xyXG4gICAgcmV0dXJuIGJhc2VMYWJlbHMubWFwKCh0ZXh0LCBpKSA9PiB7XHJcbiAgICAgIGlmIChpICE9PSBhY3RpdmVJbmRleCkgcmV0dXJuIHRleHQ7IC8vIHVudG91Y2hlZFxyXG4gICAgICBjb25zdCBhcnJvdyA9IGlzRGVzYyA/IFwiIOKWvFwiIDogXCIg4payXCI7XHJcbiAgICAgIHJldHVybiBgJHt0ZXh0fSR7YXJyb3d9YDtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcblxyXG4gIGNvbnN0IFtsYWJlbHMsIHNldExhYmVsc10gPSB1c2VTdGF0ZShsYWJlbEJhc2UpO1xyXG4gIGNvbnN0IFtzb3J0Q2hlY2ssIHNldFNvcnRDaGVja10gPSB1c2VTdGF0ZShzb3J0Q2hlY2tCYXNlKTtcclxuICBjb25zdCBbaG92ZXJJbmRleCwgc2V0SG92ZXJJbmRleF0gPSB1c2VTdGF0ZShudWxsKTtcclxuICBjb25zdCBbc2VsZWN0ZWRNb2RlbCwgc2V0U2VsZWN0ZWRNb2RlbF0gPSB1c2VTdGF0ZShudWxsKTtcclxuICBjb25zdCBbZ1Bvcywgc2V0R1Bvc10gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW2dJZGUsIHNldEdJZGVdID0gdXNlU3RhdGUobnVsbCk7XG4gIGNvbnN0IFtpc0RlbGV0aW5nLCBzZXRJc0RlbGV0aW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3BhZ2UsIHNldFBhZ2VdID0gdXNlU3RhdGUoMSk7XG4gIGNvbnN0IFtwYWdlQ3Vyc29ycywgc2V0UGFnZUN1cnNvcnNdID0gdXNlU3RhdGUoW10pO1xuICBjb25zdCBbaGFzTmV4dFBhZ2UsIHNldEhhc05leHRQYWdlXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgZmV0Y2hTZXEgPSB1c2VSZWYoMCk7XG4gIGNvbnN0IGJhY2tmaWxsSW5GbGlnaHQgPSB1c2VSZWYoZmFsc2UpO1xuICBjb25zdCBbcXVlcnlFcG9jaCwgc2V0UXVlcnlFcG9jaF0gPSB1c2VTdGF0ZSgwKTtcbiAgY29uc3QgW2xvYWRFcnJvciwgc2V0TG9hZEVycm9yXSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCB0YWJsZUJvZHlSZWYgPSB1c2VSZWYobnVsbCk7XG4gIGNvbnN0IHJvd0hlaWdodFJlZiA9IHVzZVJlZig0Nik7XG4gIGNvbnN0IGhlYWRlckhlaWdodFJlZiA9IHVzZVJlZigzOCk7XG5cbiAgY29uc3QgTE9BRF9USU1FT1VUX01TID0gMzAwMDA7XG4gIGNvbnN0IG1hcExldHRlcnMgPSB1c2VNZW1vKFxuICAgICgpID0+IEFycmF5LmZyb20oeyBsZW5ndGg6IDI2IH0sIChfLCBpKSA9PiBTdHJpbmcuZnJvbUNoYXJDb2RlKDY1ICsgaSkpLFxuICAgIFtdXG4gICk7XG4gIGNvbnN0IG1hcE51bWJlcnMgPSB1c2VNZW1vKFxuICAgICgpID0+IEFycmF5LmZyb20oeyBsZW5ndGg6IDUwIH0sIChfLCBpKSA9PiBpICsgMSksXG4gICAgW11cbiAgKTtcblxuICBjb25zdCBsb2FkTWFwRGlyZWN0b3J5ID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xuICAgIGlmIChtYXBEaXJlY3RvcnlMb2FkZWQpIHJldHVybjtcbiAgICB0cnkge1xuICAgICAgY29uc3QgZG9jID0gYXdhaXQgZmlyZWJhc2VcbiAgICAgICAgLmZpcmVzdG9yZSgpXG4gICAgICAgIC5jb2xsZWN0aW9uKFwiV2FyZWhvdXNlXCIpXG4gICAgICAgIC5kb2MoXCJkaXJlY3RvcnlcIilcbiAgICAgICAgLmdldCgpO1xuICAgICAgY29uc3QgZGF0YSA9IGRvYy5kYXRhKCkgfHwge307XG4gICAgICBzZXRNYXBSZWdpb25PcHRpb25zKGRhdGEuUmVnaW9uIHx8IFtdKTtcbiAgICAgIHNldE1hcFNlY3Rpb25NYXAoZGF0YS5TZWN0aW9uIHx8IHt9KTtcbiAgICAgIHNldE1hcERpcmVjdG9yeUxvYWRlZCh0cnVlKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byBsb2FkIG1hcCBkaXJlY3RvcnlcIiwgZXJyb3IpO1xuICAgICAgc2V0TWFwRXJyb3IoXCJGYWlsZWQgdG8gbG9hZCB3YXJlaG91c2UgZGlyZWN0b3J5LlwiKTtcbiAgICB9XG4gIH0sIFttYXBEaXJlY3RvcnlMb2FkZWRdKTtcblxuICBjb25zdCBnZXRNYXBSZWdpb25EaW1lbnNpb25zID0gdXNlQ2FsbGJhY2soXG4gICAgKHJlZ2lvbklkKSA9PiB7XG4gICAgICBjb25zdCBlbnRyeSA9IG1hcFNlY3Rpb25NYXA/LltyZWdpb25JZF07XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShlbnRyeSkgJiYgZW50cnkubGVuZ3RoID49IDIpIHtcbiAgICAgICAgY29uc3QgY29scyA9IHBhcnNlSW50KGVudHJ5WzBdLCAxMCk7XG4gICAgICAgIGNvbnN0IHJvd3MgPSBwYXJzZUludChlbnRyeVsxXSwgMTApO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGNvbHM6IE51bWJlci5pc0Zpbml0ZShjb2xzKSA/IGNvbHMgOiAwLFxuICAgICAgICAgIHJvd3M6IE51bWJlci5pc0Zpbml0ZShyb3dzKSA/IHJvd3MgOiAwLFxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHsgY29sczogMCwgcm93czogMCB9O1xuICAgIH0sXG4gICAgW21hcFNlY3Rpb25NYXBdXG4gICk7XG5cbiAgY29uc3QgbG9hZE1hcEludmVudG9yeSA9IHVzZUNhbGxiYWNrKGFzeW5jIChyZWdpb25JZCkgPT4ge1xuICAgIGlmICghcmVnaW9uSWQpIHJldHVybjtcbiAgICBzZXRNYXBMb2FkaW5nKHRydWUpO1xuICAgIHNldE1hcEVycm9yKFwiXCIpO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBzbmFwID0gYXdhaXQgZmlyZWJhc2VcbiAgICAgICAgLmZpcmVzdG9yZSgpXG4gICAgICAgIC5jb2xsZWN0aW9uKFwiVGVzdFwiKVxuICAgICAgICAud2hlcmUoXCJuZXdMb2NhbEN1cnJlbnQucmVnaW9uXCIsIFwiPT1cIiwgcmVnaW9uSWQpXG4gICAgICAgIC5nZXQoKTtcblxuICAgICAgY29uc3QgY2VsbFBhbGxldHMgPSB7fTtcbiAgICAgIGNvbnN0IHBhbGxldEJpbnMgPSB7fTtcbiAgICAgIHNuYXAuZm9yRWFjaCgoZG9jKSA9PiB7XG4gICAgICAgIGNvbnN0IGxvYyA9IGRvYy5kYXRhKCk/Lm5ld0xvY2FsQ3VycmVudCB8fCB7fTtcbiAgICAgICAgbGV0IHJvdyA9IGxvYy5zZWN0aW9uPy5sZXR0ZXI7XG4gICAgICAgIGxldCBjb2wgPSBsb2Muc2VjdGlvbj8ubnVtYmVyO1xuICAgICAgICBpZiAoKCFyb3cgfHwgIWNvbCkgJiYgdHlwZW9mIGxvYy5zZWN0aW9uID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgY29uc3QgdHJpbW1lZCA9IGxvYy5zZWN0aW9uLnRyaW0oKTtcbiAgICAgICAgICByb3cgPSB0cmltbWVkLnNsaWNlKDAsIDEpO1xuICAgICAgICAgIGNvbCA9IHRyaW1tZWQuc2xpY2UoMSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbCAhPT0gdW5kZWZpbmVkICYmIGNvbCAhPT0gbnVsbCkge1xuICAgICAgICAgIGNvbCA9IFN0cmluZyhjb2wpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBhbGxldCA9IGxvYy5wYWxsZXQ7XG4gICAgICAgIGNvbnN0IGJpbiA9IGxvYy5iaW47XG4gICAgICAgIGlmICghcm93IHx8ICFjb2wpIHJldHVybjtcbiAgICAgICAgY29uc3QgY2VsbEtleSA9IGAke3Jvd30tJHtjb2x9YDtcbiAgICAgICAgaWYgKHBhbGxldCAhPT0gdW5kZWZpbmVkICYmIHBhbGxldCAhPT0gbnVsbCAmJiBgJHtwYWxsZXR9YCAhPT0gXCJcIikge1xuICAgICAgICAgIGlmICghY2VsbFBhbGxldHNbY2VsbEtleV0pIGNlbGxQYWxsZXRzW2NlbGxLZXldID0gbmV3IFNldCgpO1xuICAgICAgICAgIGNlbGxQYWxsZXRzW2NlbGxLZXldLmFkZChTdHJpbmcocGFsbGV0KSk7XG4gICAgICAgICAgaWYgKGJpbiAhPT0gdW5kZWZpbmVkICYmIGJpbiAhPT0gbnVsbCAmJiBgJHtiaW59YCAhPT0gXCJcIikge1xuICAgICAgICAgICAgY29uc3QgcGFsbGV0S2V5ID0gYCR7Y2VsbEtleX0tUCR7cGFsbGV0fWA7XG4gICAgICAgICAgICBpZiAoIXBhbGxldEJpbnNbcGFsbGV0S2V5XSkgcGFsbGV0Qmluc1twYWxsZXRLZXldID0gbmV3IFNldCgpO1xuICAgICAgICAgICAgcGFsbGV0Qmluc1twYWxsZXRLZXldLmFkZChTdHJpbmcoYmluKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgY29uc3QgY2VsbE9iaiA9IHt9O1xuICAgICAgT2JqZWN0LmtleXMoY2VsbFBhbGxldHMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICBjZWxsT2JqW2tleV0gPSBBcnJheS5mcm9tKGNlbGxQYWxsZXRzW2tleV0pLnNvcnQoXG4gICAgICAgICAgKGEsIGIpID0+IE51bWJlcihhKSAtIE51bWJlcihiKVxuICAgICAgICApO1xuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IHBhbGxldE9iaiA9IHt9O1xuICAgICAgT2JqZWN0LmtleXMocGFsbGV0QmlucykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgIHBhbGxldE9ialtrZXldID0gQXJyYXkuZnJvbShwYWxsZXRCaW5zW2tleV0pLnNvcnQoXG4gICAgICAgICAgKGEsIGIpID0+IE51bWJlcihhKSAtIE51bWJlcihiKVxuICAgICAgICApO1xuICAgICAgfSk7XG5cbiAgICAgIHNldE1hcENlbGxQYWxsZXRzKGNlbGxPYmopO1xuICAgICAgc2V0TWFwUGFsbGV0QmlucyhwYWxsZXRPYmopO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGxvYWQgbWFwIGludmVudG9yeVwiLCBlcnJvcik7XG4gICAgICBzZXRNYXBFcnJvcihcIkZhaWxlZCB0byBsb2FkIG1hcCBpbnZlbnRvcnkuXCIpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRNYXBMb2FkaW5nKGZhbHNlKTtcbiAgICB9XG4gIH0sIFtdKTtcblxuICBjb25zdCBvcGVuTWFwID0gYXN5bmMgKCkgPT4ge1xuICAgIHNldE1hcEVycm9yKFwiXCIpO1xuICAgIGF3YWl0IGxvYWRNYXBEaXJlY3RvcnkoKTtcbiAgICBpZiAobWFwUmVnaW9uKSB7XG4gICAgICBzZXRNYXBTdGVwKFwiZ3JpZFwiKTtcbiAgICAgIGxvYWRNYXBJbnZlbnRvcnkobWFwUmVnaW9uKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2V0TWFwU3RlcChcInJlZ2lvbnNcIik7XG4gICAgfVxuICAgIHNldFNob3dNYXAodHJ1ZSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlTWFwU2VsZWN0UmVnaW9uID0gKHJlZ2lvbklkKSA9PiB7XG4gICAgc2V0TWFwUmVnaW9uKHJlZ2lvbklkKTtcbiAgICBzZXRNYXBSb3coXCJcIik7XG4gICAgc2V0TWFwQ29sKFwiXCIpO1xuICAgIHNldE1hcFBhbGxldChcIlwiKTtcbiAgICBzZXRNYXBTdGVwKFwiZ3JpZFwiKTtcbiAgICBsb2FkTWFwSW52ZW50b3J5KHJlZ2lvbklkKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVNYXBTZWxlY3RDZWxsID0gKHJvd0xldHRlciwgY29sTnVtYmVyKSA9PiB7XG4gICAgc2V0TWFwUm93KHJvd0xldHRlcik7XG4gICAgc2V0TWFwQ29sKGNvbE51bWJlcik7XG4gICAgc2V0TWFwUGFsbGV0KFwiXCIpO1xuICAgIHNldE1hcFN0ZXAoXCJwYWxsZXRzXCIpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZU1hcFNlbGVjdFBhbGxldCA9IChwYWxsZXRJZCkgPT4ge1xuICAgIHNldE1hcFBhbGxldChwYWxsZXRJZCk7XG4gICAgc2V0TWFwU3RlcChcImJpbnNcIik7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlTWFwQmFjayA9ICgpID0+IHtcbiAgICBpZiAobWFwU3RlcCA9PT0gXCJiaW5zXCIpIHNldE1hcFN0ZXAoXCJwYWxsZXRzXCIpO1xuICAgIGVsc2UgaWYgKG1hcFN0ZXAgPT09IFwicGFsbGV0c1wiKSBzZXRNYXBTdGVwKFwiZ3JpZFwiKTtcbiAgICBlbHNlIGlmIChtYXBTdGVwID09PSBcImdyaWRcIikgc2V0TWFwU3RlcChcInJlZ2lvbnNcIik7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlTWFwVmlldyA9IChvdmVycmlkZXMgPSB7fSkgPT4ge1xuICAgIGNvbnN0IHBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoKTtcbiAgICBjb25zdCByZWdpb25WYWx1ZSA9IG92ZXJyaWRlcy5yZWdpb24gPz8gbWFwUmVnaW9uO1xuICAgIGNvbnN0IGxldHRlclZhbHVlID0gb3ZlcnJpZGVzLnNlY3Rpb25MZXR0ZXIgPz8gbWFwUm93O1xuICAgIGNvbnN0IG51bWJlclZhbHVlID0gb3ZlcnJpZGVzLnNlY3Rpb25OdW1iZXIgPz8gbWFwQ29sO1xuICAgIGNvbnN0IHBhbGxldFZhbHVlID0gb3ZlcnJpZGVzLnBhbGxldCA/PyBtYXBQYWxsZXQ7XG4gICAgY29uc3QgYmluVmFsdWUgPSBvdmVycmlkZXMuYmluID8/IFwiXCI7XG5cbiAgICBpZiAocmVnaW9uVmFsdWUpIHBhcmFtcy5zZXQoXCJyZWdpb25cIiwgcmVnaW9uVmFsdWUpO1xuICAgIGlmIChsZXR0ZXJWYWx1ZSkgcGFyYW1zLnNldChcInNlY3Rpb25MZXR0ZXJcIiwgbGV0dGVyVmFsdWUpO1xuICAgIGlmIChudW1iZXJWYWx1ZSkgcGFyYW1zLnNldChcInNlY3Rpb25OdW1iZXJcIiwgbnVtYmVyVmFsdWUpO1xuICAgIGlmIChwYWxsZXRWYWx1ZSkgcGFyYW1zLnNldChcInBhbGxldFwiLCBwYWxsZXRWYWx1ZSk7XG4gICAgaWYgKGJpblZhbHVlKSBwYXJhbXMuc2V0KFwiYmluXCIsIGJpblZhbHVlKTtcblxuICAgIGNvbnN0IHF1ZXJ5ID0gcGFyYW1zLnRvU3RyaW5nKCk7XG4gICAgcm91dGVyLnB1c2goXG4gICAgICBgL05ld1NlYXJjaC9pbnZlbnRvcnkvaW52ZW50b3J5TWFuYWdlJHtxdWVyeSA/IGA/JHtxdWVyeX1gIDogXCJcIn1gXG4gICAgKTtcbiAgfTtcblxuICBjb25zdCBzdGFydE5hbWVUb2tlbkJhY2tmaWxsID0gdXNlQ2FsbGJhY2soYXN5bmMgKHJlYXNvbiA9IFwiXCIpID0+IHtcbiAgICBpZiAoYmFja2ZpbGxJbkZsaWdodC5jdXJyZW50KSByZXR1cm47XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIGNvbnN0IGxhc3RSdW4gPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJuYW1lVG9rZW5zQmFja2ZpbGxBdFwiKTtcbiAgICAgIGlmIChsYXN0UnVuICYmIERhdGUubm93KCkgLSBOdW1iZXIobGFzdFJ1bikgPCAyNCAqIDYwICogNjAgKiAxMDAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBiYWNrZmlsbEluRmxpZ2h0LmN1cnJlbnQgPSB0cnVlO1xuICAgIGNvbnN0IGRiID0gZmlyZWJhc2UuZmlyZXN0b3JlKCk7XG4gICAgbGV0IGxhc3REb2MgPSBudWxsO1xuXG4gICAgY29uc3QgdG9rZW5zRXF1YWwgPSAoYSwgYikgPT4ge1xuICAgICAgaWYgKGEubGVuZ3RoICE9PSBiLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuICAgICAgY29uc3Qgc2V0QSA9IG5ldyBTZXQoYSk7XG4gICAgICBjb25zdCBzZXRCID0gbmV3IFNldChiKTtcbiAgICAgIGlmIChzZXRBLnNpemUgIT09IHNldEIuc2l6ZSkgcmV0dXJuIGZhbHNlO1xuICAgICAgZm9yIChjb25zdCB2IG9mIHNldEEpIGlmICghc2V0Qi5oYXModikpIHJldHVybiBmYWxzZTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG5cbiAgICB0cnkge1xuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgbGV0IHF1ZXJ5ID0gZGJcbiAgICAgICAgICAuY29sbGVjdGlvbihcIlRlc3RcIilcbiAgICAgICAgICAub3JkZXJCeShmaXJlYmFzZS5maXJlc3RvcmUuRmllbGRQYXRoLmRvY3VtZW50SWQoKSlcbiAgICAgICAgICAubGltaXQoMjAwKTtcbiAgICAgICAgaWYgKGxhc3REb2MpIHF1ZXJ5ID0gcXVlcnkuc3RhcnRBZnRlcihsYXN0RG9jKTtcblxuICAgICAgICBjb25zdCBzbmFwID0gYXdhaXQgcXVlcnkuZ2V0KCk7XG4gICAgICAgIGlmIChzbmFwLmVtcHR5KSBicmVhaztcblxuICAgICAgICBjb25zdCBiYXRjaCA9IGRiLmJhdGNoKCk7XG4gICAgICAgIGxldCB3cml0ZXMgPSAwO1xuXG4gICAgICAgIHNuYXAuZG9jcy5mb3JFYWNoKChkb2MpID0+IHtcbiAgICAgICAgICBjb25zdCBkYXRhID0gZG9jLmRhdGEoKSB8fCB7fTtcbiAgICAgICAgICBjb25zdCBuYW1lID0gdHlwZW9mIGRhdGEubmFtZSA9PT0gXCJzdHJpbmdcIiA/IGRhdGEubmFtZSA6IFwiXCI7XG4gICAgICAgICAgY29uc3QgbmFtZUxvd2VyID0gbmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgIGNvbnN0IG5hbWVUb2tlbnMgPSBidWlsZE5hbWVUb2tlbnMobmFtZSk7XG4gICAgICAgICAgY29uc3QgZXhpc3RpbmdUb2tlbnMgPSBBcnJheS5pc0FycmF5KGRhdGEubmFtZVRva2VucylcbiAgICAgICAgICAgID8gQXJyYXkuZnJvbShuZXcgU2V0KGRhdGEubmFtZVRva2Vucy5tYXAoKHYpID0+IFN0cmluZyh2KSkpKVxuICAgICAgICAgICAgOiBbXTtcblxuICAgICAgICAgIGNvbnN0IG5lZWRzVXBkYXRlID1cbiAgICAgICAgICAgIGRhdGEubmFtZUxvd2VyICE9PSBuYW1lTG93ZXIgfHxcbiAgICAgICAgICAgICF0b2tlbnNFcXVhbChleGlzdGluZ1Rva2VucywgbmFtZVRva2Vucyk7XG5cbiAgICAgICAgICBpZiAobmVlZHNVcGRhdGUpIHtcbiAgICAgICAgICAgIGJhdGNoLnVwZGF0ZShkb2MucmVmLCB7IG5hbWVMb3dlciwgbmFtZVRva2VucyB9KTtcbiAgICAgICAgICAgIHdyaXRlcyArPSAxO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHdyaXRlcyA+IDApIHtcbiAgICAgICAgICBhd2FpdCBiYXRjaC5jb21taXQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxhc3REb2MgPSBzbmFwLmRvY3Nbc25hcC5kb2NzLmxlbmd0aCAtIDFdO1xuICAgICAgICBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gc2V0VGltZW91dChyZXNvbHZlLCAyNSkpO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oXG4gICAgICAgICAgXCJuYW1lVG9rZW5zQmFja2ZpbGxBdFwiLFxuICAgICAgICAgIFN0cmluZyhEYXRlLm5vdygpKVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiTmFtZSB0b2tlbiBiYWNrZmlsbCBmYWlsZWQ6XCIsIHJlYXNvbiwgZXJyb3IpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBiYWNrZmlsbEluRmxpZ2h0LmN1cnJlbnQgPSBmYWxzZTtcbiAgICB9XG4gIH0sIFtdKTtcblxuICBjb25zdCBzZWFyY2hMb3dlciA9IChzZWFyY2ggfHwgXCJcIikudG9Mb3dlckNhc2UoKS50cmltKCk7XG4gIGNvbnN0IGhhc0FjdGl2ZUZpbHRlcnMgPVxuICAgIEJvb2xlYW4oc2VsZWN0ZWRPRU0pIHx8XG4gICAgQm9vbGVhbihzZWxlY3RlZE1vZGFsaXR5KSB8fFxuICAgIEJvb2xlYW4oc2VsZWN0ZWRNb2RlbCkgfHxcbiAgICBCb29sZWFuKHNlbGVjdGVkQ2xpZW50RnJvbSkgfHxcbiAgICBCb29sZWFuKHNlbGVjdGVkQ2xpZW50Q3VycmVudCkgfHxcbiAgICBCb29sZWFuKHNlYXJjaExvd2VyKTtcblxuICBjb25zdCB2YWx1ZU1hdGNoZXMgPSAodmFsdWUsIHMpID0+IHtcbiAgICBpZiAoIXZhbHVlKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICByZXR1cm4gdmFsdWUuc29tZSgodikgPT4gdmFsdWVNYXRjaGVzKHYsIHMpKTtcbiAgICB9XG4gICAgcmV0dXJuIFN0cmluZyh2YWx1ZSkudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhzKTtcbiAgfTtcblxuICBjb25zdCBtYXRjaGVzRmlsdGVycyA9IHVzZUNhbGxiYWNrKFxuICAgIChpdGVtKSA9PiB7XG4gICAgICAvLyBoaWRlIGV4cGxpY2l0bHkgaGlkZGVuIGl0ZW1zXG4gICAgICBpZiAoaXRlbT8udmlzaWJsZSA9PT0gZmFsc2UpIHJldHVybiBmYWxzZTtcblxuICAgICAgLy8gT0VNIC8gTW9kYWxpdHkgLyBNb2RlbCBmaWx0ZXJpbmdcbiAgICAgIGNvbnN0IE9FTSA9IGdldE1hY2hpbmVGaWVsZChpdGVtLCBcIk9FTVwiKTtcbiAgICAgIGNvbnN0IE1vZGFsaXR5ID0gZ2V0TWFjaGluZUZpZWxkKGl0ZW0sIFwiTW9kYWxpdHlcIik7XG4gICAgICBjb25zdCBNb2RlbCA9IGdldE1hY2hpbmVGaWVsZChpdGVtLCBcIk1vZGVsXCIpO1xuXG4gICAgICBpZiAoc2VsZWN0ZWRPRU0gJiYgbm9ybWFsaXplVGV4dChPRU0pICE9PSBub3JtYWxpemVUZXh0KHNlbGVjdGVkT0VNKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoXG4gICAgICAgIHNlbGVjdGVkTW9kYWxpdHkgJiZcbiAgICAgICAgbm9ybWFsaXplVGV4dChNb2RhbGl0eSkgIT09IG5vcm1hbGl6ZVRleHQoc2VsZWN0ZWRNb2RhbGl0eSlcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoc2VsZWN0ZWRNb2RlbCAmJiBub3JtYWxpemVUZXh0KE1vZGVsKSAhPT0gbm9ybWFsaXplVGV4dChzZWxlY3RlZE1vZGVsKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIC8vIENsaWVudCBmaWx0ZXJzXG4gICAgICBpZiAoc2VsZWN0ZWRDbGllbnRGcm9tICYmIGl0ZW0/LmNsaWVudEZyb21JZCAhPT0gc2VsZWN0ZWRDbGllbnRGcm9tKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmIChcbiAgICAgICAgc2VsZWN0ZWRDbGllbnRDdXJyZW50ICYmXG4gICAgICAgIGl0ZW0/LmNsaWVudEN1cnJlbnRJZCAhPT0gc2VsZWN0ZWRDbGllbnRDdXJyZW50XG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICAvLyBTZWFyY2hcbiAgICAgIGlmIChzZWFyY2hMb3dlcikge1xuICAgICAgICBpZiAoc2VsZWN0ID09PSBcIk5hbWVcIikge1xuICAgICAgICAgIHJldHVybiB2YWx1ZU1hdGNoZXMoaXRlbT8ubmFtZSwgc2VhcmNoTG93ZXIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzZWxlY3QgPT09IFwiRGF0ZVwiKSB7XG4gICAgICAgICAgY29uc3Qgd2FudGVkRGF5ID0gc2VhcmNoTG93ZXI7IC8vIHl5eXktbW0tZGQgZnJvbSBpbnB1dFxuICAgICAgICAgIGNvbnN0IGl0ZW1ZTUQgPSB0b1lNRChpdGVtPy5kYXRlKTtcbiAgICAgICAgICBpZiAoaXRlbVlNRCAmJiBpdGVtWU1EID09PSB3YW50ZWREYXkpIHJldHVybiB0cnVlO1xuICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGl0ZW0/LmRlc2NyaXB0aW9ucykpIHtcbiAgICAgICAgICAgIGlmIChpdGVtLmRlc2NyaXB0aW9ucy5zb21lKChkKSA9PiB0b1lNRChkPy5kYXRlKSA9PT0gd2FudGVkRGF5KSkge1xuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoaXRlbT8ud29ya09yZGVycykpIHtcbiAgICAgICAgICAgIGlmIChpdGVtLndvcmtPcmRlcnMuc29tZSgodykgPT4gdG9ZTUQodz8uZGF0ZSkgPT09IHdhbnRlZERheSkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2VsZWN0ID09PSBcIldvcmsgT3JkZXJcIikge1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBBcnJheS5pc0FycmF5KGl0ZW0/LndvcmtPcmRlcnMpICYmXG4gICAgICAgICAgICBpdGVtLndvcmtPcmRlcnMuc29tZSgod28pID0+XG4gICAgICAgICAgICAgIHZhbHVlTWF0Y2hlcyh3bz8ud29ya09yZGVyLCBzZWFyY2hMb3dlcilcbiAgICAgICAgICAgIClcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzZWxlY3QgPT09IFwiUHJvZHVjdCBOdW1iZXJcIikge1xuICAgICAgICAgIHJldHVybiB2YWx1ZU1hdGNoZXMoaXRlbT8ucG4sIHNlYXJjaExvd2VyKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2VsZWN0ID09PSBcIlNlcmlhbCBOdW1iZXJcIikge1xuICAgICAgICAgIHJldHVybiB2YWx1ZU1hdGNoZXMoaXRlbT8uc24sIHNlYXJjaExvd2VyKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2VsZWN0ID09PSBcIkRlc2NyaXB0aW9uXCIpIHtcbiAgICAgICAgICBpZiAodmFsdWVNYXRjaGVzKGl0ZW0/LmRlc2MsIHNlYXJjaExvd2VyKSkgcmV0dXJuIHRydWU7XG4gICAgICAgICAgaWYgKHZhbHVlTWF0Y2hlcyhpdGVtPy5kZXNjcmlwdGlvbiwgc2VhcmNoTG93ZXIpKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShpdGVtPy5kZXNjcmlwdGlvbnMpKSB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbS5kZXNjcmlwdGlvbnMuc29tZSgoZCkgPT5cbiAgICAgICAgICAgICAgdmFsdWVNYXRjaGVzKGQ/LmRlc2NyaXB0aW9uLCBzZWFyY2hMb3dlcilcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2VsZWN0ID09PSBcIlNLVVwiKSB7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIHZhbHVlTWF0Y2hlcyhpdGVtPy5pZCwgc2VhcmNoTG93ZXIpIHx8XG4gICAgICAgICAgICB2YWx1ZU1hdGNoZXMoaXRlbT8ubG9jYWxTTiwgc2VhcmNoTG93ZXIpIHx8XG4gICAgICAgICAgICB2YWx1ZU1hdGNoZXMoaXRlbT8ubG9jYWxfc24sIHNlYXJjaExvd2VyKVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcbiAgICBbXG4gICAgICBzZWxlY3RlZE9FTSxcbiAgICAgIHNlbGVjdGVkTW9kYWxpdHksXG4gICAgICBzZWxlY3RlZE1vZGVsLFxuICAgICAgc2VsZWN0ZWRDbGllbnRGcm9tLFxuICAgICAgc2VsZWN0ZWRDbGllbnRDdXJyZW50LFxuICAgICAgc2VhcmNoTG93ZXIsXG4gICAgICBzZWxlY3QsXG4gICAgXVxuICApO1xuXG4gIGNvbnN0IHJlc2V0UGFnaW5hdGlvbiA9ICgpID0+IHtcbiAgICBzZXRQYWdlKDEpO1xuICAgIHNldFBhZ2VDdXJzb3JzKFtdKTtcbiAgICBzZXRIYXNOZXh0UGFnZShmYWxzZSk7XG4gIH07XG5cbiAgLy8gUmVzZXQgcGFnaW5hdGlvbiBvbiByb3V0ZS9xdWVyeSBjaGFuZ2UgKHByZXZlbnRzIHN0YWxlIHBhZ2VzIGxpa2Ug4oCcc3RhcnRpbmcgYXQgNuKAnSlcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICByZXNldFBhZ2luYXRpb24oKTtcbiAgICBzZXRRdWVyeUVwb2NoKCh2KSA9PiB2ICsgMSk7XG4gIH0sIFtyb3V0ZXIuYXNQYXRoXSk7XG5cbiAgLy8gUmVzZXQgYW5kIHJlZmV0Y2ggd2hlbiBmaWx0ZXJzL3NlYXJjaCBjaGFuZ2VcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICByZXNldFBhZ2luYXRpb24oKTtcbiAgICBzZXRRdWVyeUVwb2NoKCh2KSA9PiB2ICsgMSk7XG4gIH0sIFtcbiAgICBzZWxlY3RlZE9FTSxcbiAgICBzZWxlY3RlZE1vZGFsaXR5LFxuICAgIHNlbGVjdGVkTW9kZWwsXG4gICAgc2VsZWN0ZWRDbGllbnRGcm9tLFxuICAgIHNlbGVjdGVkQ2xpZW50Q3VycmVudCxcbiAgICBzZWFyY2gsXG4gICAgc2VsZWN0LFxuICBdKTtcblxuXG4gIC8vIEZldGNoIGRhdGEgb24gY29tcG9uZW50IG1vdW50IGFuZCByb3V0ZSBjaGFuZ2VcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBmZXRjaERhdGEocGFnZSk7XG4gIH0sIFtwYWdlLCBxdWVyeUVwb2NoXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIXJvdXRlcj8uZXZlbnRzKSByZXR1cm47XG4gICAgY29uc3QgaGFuZGxlRG9uZSA9ICgpID0+IHNldElzTmF2aWdhdGluZyhmYWxzZSk7XG4gICAgcm91dGVyLmV2ZW50cy5vbihcInJvdXRlQ2hhbmdlQ29tcGxldGVcIiwgaGFuZGxlRG9uZSk7XG4gICAgcm91dGVyLmV2ZW50cy5vbihcInJvdXRlQ2hhbmdlRXJyb3JcIiwgaGFuZGxlRG9uZSk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHJvdXRlci5ldmVudHMub2ZmKFwicm91dGVDaGFuZ2VDb21wbGV0ZVwiLCBoYW5kbGVEb25lKTtcbiAgICAgIHJvdXRlci5ldmVudHMub2ZmKFwicm91dGVDaGFuZ2VFcnJvclwiLCBoYW5kbGVEb25lKTtcbiAgICB9O1xuICB9LCBbcm91dGVyXSk7XG5cbiAgYXN5bmMgZnVuY3Rpb24gZmV0Y2hEYXRhKHJlcXVlc3RlZFBhZ2UgPSAxKSB7XG4gICAgY29uc3Qgc2VxID0gKytmZXRjaFNlcS5jdXJyZW50O1xuICAgIGxldCB0aW1lZE91dCA9IGZhbHNlO1xuICAgIHNldElzTG9hZGluZyh0cnVlKTtcbiAgICBzZXRMb2FkRXJyb3IobnVsbCk7XG4gICAgY29uc3QgdGltZW91dElkID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aW1lZE91dCA9IHRydWU7XG4gICAgICBpZiAoc2VxID09PSBmZXRjaFNlcS5jdXJyZW50KSB7XG4gICAgICAgIHNldExvYWRFcnJvcih7XG4gICAgICAgICAgY29kZTogXCJ0aW1lb3V0XCIsXG4gICAgICAgICAgbWVzc2FnZTogYExvYWRpbmcgaXMgdGFraW5nIGxvbmdlciB0aGFuICR7TWF0aC5yb3VuZChcbiAgICAgICAgICAgIExPQURfVElNRU9VVF9NUyAvIDEwMDBcbiAgICAgICAgICApfXMuIFRoaXMgaXMgbGlrZWx5IGR1ZSB0byB2ZXJ5IHNlbGVjdGl2ZSBmaWx0ZXJzLmAsXG4gICAgICAgIH0pO1xuICAgICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xuICAgICAgfVxuICAgIH0sIExPQURfVElNRU9VVF9NUyk7XG4gICAgdHJ5IHtcbiAgICAgIGlmIChyb3V0ZXIucXVlcnkuaW5wdXRUZXh0ICYmIHJvdXRlci5xdWVyeS5zZWxlY3RlZFR5cGUpIHtcbiAgICAgICAgc2V0U2VsZWN0KHJvdXRlci5xdWVyeS5zZWxlY3RlZFR5cGUpO1xuICAgICAgICBzZXRTZWFyY2gocm91dGVyLnF1ZXJ5LmlucHV0VGV4dCk7XG4gICAgICB9XG4gICAgICBjb25zdCBzdGFydEFmdGVyRG9jID1cbiAgICAgICAgcmVxdWVzdGVkUGFnZSA+IDEgPyBwYWdlQ3Vyc29yc1tyZXF1ZXN0ZWRQYWdlIC0gMl0gOiBudWxsO1xuICAgICAgaWYgKHJlcXVlc3RlZFBhZ2UgPiAxICYmICFzdGFydEFmdGVyRG9jKSB7XG4gICAgICAgIHNldFBhZ2UoMSk7XG4gICAgICAgIGlmIChzZXEgPT09IGZldGNoU2VxLmN1cnJlbnQpIHtcbiAgICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dElkKTtcbiAgICAgICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGVmZmVjdGl2ZVNlbGVjdCA9IHJvdXRlci5xdWVyeS5zZWxlY3RlZFR5cGUgfHwgc2VsZWN0O1xuICAgICAgY29uc3QgZWZmZWN0aXZlU2VhcmNoID0gcm91dGVyLnF1ZXJ5LmlucHV0VGV4dCB8fCBzZWFyY2g7XG4gICAgICBjb25zdCBlZmZlY3RpdmVTZWFyY2hMb3dlciA9IChlZmZlY3RpdmVTZWFyY2ggfHwgXCJcIilcbiAgICAgICAgLnRvTG93ZXJDYXNlKClcbiAgICAgICAgLnRyaW0oKTtcblxuICAgICAgLy8gbGlnaHQgcmV0cnkgZm9yIHRyYW5zaWVudCBGaXJlc3RvcmUgaGljY3Vwc1xuICAgICAgY29uc3QgbG9hZCA9IGFzeW5jIChhdHRlbXB0ID0gMSkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHJldHVybiBhd2FpdCBmZXRjaFBhcnRzV2l0aE1hY2hpbmVEYXRhUGFnZSh7XG4gICAgICAgICAgICBwYWdlU2l6ZSxcbiAgICAgICAgICAgIHN0YXJ0QWZ0ZXJEb2MsXG4gICAgICAgICAgICB2aXNpYmxlT25seTogdHJ1ZSxcbiAgICAgICAgICAgIGZpbHRlckZuOiBoYXNBY3RpdmVGaWx0ZXJzID8gbWF0Y2hlc0ZpbHRlcnMgOiBudWxsLFxuICAgICAgICAgICAgc2VhcmNoOiBlZmZlY3RpdmVTZWFyY2hMb3dlclxuICAgICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICAgIHR5cGU6IGVmZmVjdGl2ZVNlbGVjdCxcbiAgICAgICAgICAgICAgICAgIHJhdzogZWZmZWN0aXZlU2VhcmNoLFxuICAgICAgICAgICAgICAgICAgbG93ZXI6IGVmZmVjdGl2ZVNlYXJjaExvd2VyLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgOiBudWxsLFxuICAgICAgICAgICAgbmVlZHNNYWNoaW5lRGF0YTpcbiAgICAgICAgICAgICAgQm9vbGVhbihzZWxlY3RlZE9FTSkgfHxcbiAgICAgICAgICAgICAgQm9vbGVhbihzZWxlY3RlZE1vZGFsaXR5KSB8fFxuICAgICAgICAgICAgICBCb29sZWFuKHNlbGVjdGVkTW9kZWwpIHx8XG4gICAgICAgICAgICAgIEJvb2xlYW4oc2VsZWN0ZWRDbGllbnRGcm9tKSB8fFxuICAgICAgICAgICAgICBCb29sZWFuKHNlbGVjdGVkQ2xpZW50Q3VycmVudCksXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBpZiAoYXR0ZW1wdCA+PSAzKSB0aHJvdyBlO1xuICAgICAgICAgIGF3YWl0IG5ldyBQcm9taXNlKHIgPT4gc2V0VGltZW91dChyLCAyNTAgKiBNYXRoLnBvdygyLCBhdHRlbXB0IC0gMSkpKTtcbiAgICAgICAgICByZXR1cm4gbG9hZChhdHRlbXB0ICsgMSk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBjb25zdCB7IHBhcnRzOiBkYXRhLCBsYXN0RG9jLCBoYXNOZXh0UGFnZTogbmV4dFBhZ2UgfSA9IGF3YWl0IGxvYWQoKTtcbiAgICAgIGlmICh0aW1lZE91dCB8fCBzZXEgIT09IGZldGNoU2VxLmN1cnJlbnQpIHJldHVybjtcbiAgICAgIGNvbnN0IGhhc05hbWVTZWFyY2ggPVxuICAgICAgICBCb29sZWFuKGVmZmVjdGl2ZVNlYXJjaExvd2VyKSAmJiBlZmZlY3RpdmVTZWxlY3QgPT09IFwiTmFtZVwiO1xuICAgICAgaWYgKFxuICAgICAgICBoYXNOYW1lU2VhcmNoICYmXG4gICAgICAgIChkYXRhLmxlbmd0aCA9PT0gMCB8fFxuICAgICAgICAgIGRhdGEuc29tZShcbiAgICAgICAgICAgIChpdGVtKSA9PlxuICAgICAgICAgICAgICAhQXJyYXkuaXNBcnJheShpdGVtPy5uYW1lVG9rZW5zKSB8fCBpdGVtLm5hbWVUb2tlbnMubGVuZ3RoID09PSAwXG4gICAgICAgICAgKSlcbiAgICAgICkge1xuICAgICAgICBzdGFydE5hbWVUb2tlbkJhY2tmaWxsKFwibmFtZS1zZWFyY2hcIik7XG4gICAgICB9XG4gICAgICBpZiAocmVxdWVzdGVkUGFnZSA9PT0gMSAmJiBkYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBzZXRQYWdlQ3Vyc29ycyhbXSk7XG4gICAgICAgIHNldEhhc05leHRQYWdlKGZhbHNlKTtcbiAgICAgIH1cbiAgICAgIHNldEJhY2t1cEluZm8oZGF0YSk7XG4gICAgICBzZXRMYWJlbHMobGFiZWxCYXNlKTsgLy8gPC0tIGFkZCB0aGlzIGxpbmUgYWZ0ZXIgc2V0QmFja3VwSW5mbyhkYXRhKVxuICAgICAgc2V0SUQoZGF0YS5tYXAoKGl0ZW0pID0+IGl0ZW0uaWQpKTtcbiAgICAgIGlmIChyZXF1ZXN0ZWRQYWdlID4gMSAmJiBkYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBzZXRIYXNOZXh0UGFnZShmYWxzZSk7XG4gICAgICAgIHNldFBhZ2UoMSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHNldEhhc05leHRQYWdlKG5leHRQYWdlKTtcbiAgICAgIHNldFBhZ2VDdXJzb3JzKChwcmV2KSA9PiB7XG4gICAgICAgIGNvbnN0IG5leHQgPSByZXF1ZXN0ZWRQYWdlID09PSAxID8gW10gOiBbLi4ucHJldl07XG4gICAgICAgIGlmIChsYXN0RG9jKSB7XG4gICAgICAgICAgbmV4dFtyZXF1ZXN0ZWRQYWdlIC0gMV0gPSBsYXN0RG9jO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgfSk7XG4gICAgICBzZXRTZWxlY3RlZEl0ZW1zKFtdKTtcblxuICAgICAgLy8gTm9ybWFsaXplIGNsaWVudCBpZHMgZm9yIGZpbHRlcmluZ1xuICAgICAgY29uc3QgYXVnbWVudGVkID0gZGF0YS5tYXAoKGl0ZW0pID0+ICh7XG4gICAgICAgIC4uLml0ZW0sXG4gICAgICAgIGNsaWVudEZyb21JZDpcbiAgICAgICAgICBpdGVtPy5jbGllbnRGcm9tSWQgPz9cbiAgICAgICAgICAodHlwZW9mIGl0ZW0/LkNsaWVudEZyb20gPT09IFwic3RyaW5nXCIgPyBpdGVtLkNsaWVudEZyb20gOiBudWxsKSA/P1xuICAgICAgICAgIGl0ZW0/LkNsaWVudEZyb20/LmlkID8/XG4gICAgICAgICAgbnVsbCxcbiAgICAgICAgY2xpZW50Q3VycmVudElkOlxuICAgICAgICAgIGl0ZW0/LmNsaWVudEN1cnJlbnRJZCA/P1xuICAgICAgICAgICh0eXBlb2YgaXRlbT8uQ2xpZW50Q3VycmVudCA9PT0gXCJzdHJpbmdcIiA/IGl0ZW0uQ2xpZW50Q3VycmVudCA6IG51bGwpID8/XG4gICAgICAgICAgaXRlbT8uQ2xpZW50Q3VycmVudD8uaWQgPz9cbiAgICAgICAgICBudWxsLFxuICAgICAgfSkpO1xuXHJcbiAgICAgIHNldEF1Z21lbnRlZEluZm8oYXVnbWVudGVkKTtcbiAgICAgIC8vIGRlZmF1bHQgdmlldyA9IGZpbHRlcmVkIChrZWVwcyBwYWdpbmF0aW9uIGFuZCBmaWx0ZXJzIGNvbnNpc3RlbnQpXG4gICAgICBzZXRJbmZvKGF1Z21lbnRlZC5maWx0ZXIobWF0Y2hlc0ZpbHRlcnMpKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGlmIChzZXEgIT09IGZldGNoU2VxLmN1cnJlbnQpIHJldHVybjtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBmZXRjaGluZyBkYXRhOlwiLCBlcnIpO1xuICAgICAgY29uc3QgY29kZSA9IGVycj8uY29kZSB8fCBcInVua25vd25cIjtcbiAgICAgIHNldExvYWRFcnJvcih7XG4gICAgICAgIGNvZGUsXG4gICAgICAgIG1lc3NhZ2U6IGVycj8ubWVzc2FnZSB8fCBcIkZhaWxlZCB0byBsb2FkIGl0ZW1zLlwiLFxuICAgICAgfSk7XG4gICAgICBzZXRJbmZvKFtdKTtcbiAgICAgIHNldEF1Z21lbnRlZEluZm8oW10pO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBjbGVhclRpbWVvdXQodGltZW91dElkKTtcbiAgICAgIGlmIChzZXEgPT09IGZldGNoU2VxLmN1cnJlbnQgJiYgIXRpbWVkT3V0KSBzZXRJc0xvYWRpbmcoZmFsc2UpO1xuICAgIH1cbiAgfVxuXHJcbiAgY29uc3Qgc2VhcmNoQ2hhbmdlSGFuZGxlciA9IChldmVudCkgPT4gc2V0U2VhcmNoKGV2ZW50LnRhcmdldC52YWx1ZSk7XHJcblxyXG4gIC8vIEZpbHRlciB0aGUgY3VycmVudGx5IGxvYWRlZCBpdGVtcyAobm93IGNvbnNpc3RlbnQgd2l0aCBwYWdlZCBmaWx0ZXJpbmcpXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgYmFzZSA9IGF1Z21lbnRlZEluZm8gfHwgW107XG4gICAgc2V0SW5mbyhiYXNlLmZpbHRlcihtYXRjaGVzRmlsdGVycykpO1xuICB9LCBbYXVnbWVudGVkSW5mbywgbWF0Y2hlc0ZpbHRlcnNdKTtcblxyXG4gIGZ1bmN0aW9uIHNvcnRDaGVja0FsbChwb3MpIHtcclxuICAgIC8vIERldGVybWluZSBuZXh0IGRpcmVjdGlvbjogdG9nZ2xlIHRoZSBjbGlja2VkIGNvbHVtbiBvbmx5XHJcbiAgICBjb25zdCBuZXh0U29ydENoZWNrID0gc29ydENoZWNrLm1hcCgodiwgaSkgPT4gKGkgPT09IHBvcyA/ICF2IDogdikpO1xyXG4gICAgY29uc3QgaXNEZXNjID0gbmV4dFNvcnRDaGVja1twb3NdOyAvLyB0cnVlIG1lYW5zIGRlc2NlbmRpbmdcclxuXHJcbiAgICBjb25zdCBzb3J0ZWRJbmZvID0gWy4uLmluZm9dLnNvcnQoKGEsIGIpID0+IHtcclxuICAgICAgY29uc3Qga2V5ID0gbGFiZWxCYXNlTmFtZXNbcG9zXTtcclxuXHJcbiAgICAgIGlmIChwb3MgPT09IDEpIHtcclxuICAgICAgICAvLyBEQVRFIGNvbHVtblxyXG4gICAgICAgIGNvbnN0IHRhID0gdG9UaW1lKGFba2V5XSk7XHJcbiAgICAgICAgY29uc3QgdGIgPSB0b1RpbWUoYltrZXldKTtcclxuXHJcbiAgICAgICAgLy8gUHV0IG1pc3NpbmcgZGF0ZXMgYXQgdGhlIGVuZCBmb3IgYXNjZW5kaW5nLCBhdCB0aGUgc3RhcnQgZm9yIGRlc2NlbmRpbmdcclxuICAgICAgICBpZiAodGEgPT09IG51bGwgJiYgdGIgPT09IG51bGwpIHJldHVybiAwO1xyXG4gICAgICAgIGlmICh0YSA9PT0gbnVsbCkgcmV0dXJuIGlzRGVzYyA/IC0xIDogMTtcclxuICAgICAgICBpZiAodGIgPT09IG51bGwpIHJldHVybiBpc0Rlc2MgPyAxIDogLTE7XHJcblxyXG4gICAgICAgIHJldHVybiBpc0Rlc2MgPyAodGIgLSB0YSkgOiAodGEgLSB0Yik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIE5BTUUgb3IgU0tVIChzdHJpbmcteSBjb2x1bW5zKTogaW5kZXhlcyAwIG9yIDUgaW4geW91ciBvcmlnaW5hbCBsb2dpY1xyXG4gICAgICBpZiAocG9zID09PSAwIHx8IHBvcyA9PT0gNSkge1xyXG4gICAgICAgIGNvbnN0IGF2ID0gKGFba2V5XSA/PyBcIlwiKS50b1N0cmluZygpO1xyXG4gICAgICAgIGNvbnN0IGJ2ID0gKGJba2V5XSA/PyBcIlwiKS50b1N0cmluZygpO1xyXG4gICAgICAgIHJldHVybiBpc0Rlc2MgPyBidi5sb2NhbGVDb21wYXJlKGF2KSA6IGF2LmxvY2FsZUNvbXBhcmUoYnYpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBOdW1lcmljLWlzaCBjb2x1bW5zICh3bywgcG4sIHNuKSDigJQgZmFsbCBiYWNrIHRvIHN0cmluZyBjb21wYXJlIGlmIE5hTlxyXG4gICAgICBjb25zdCBhbiA9IE51bWJlcihhW2tleV0pO1xyXG4gICAgICBjb25zdCBibiA9IE51bWJlcihiW2tleV0pO1xyXG5cclxuICAgICAgaWYgKCFpc05hTihhbikgJiYgIWlzTmFOKGJuKSkge1xyXG4gICAgICAgIHJldHVybiBpc0Rlc2MgPyAoYm4gLSBhbikgOiAoYW4gLSBibik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc3QgYXYgPSAoYVtrZXldID8/IFwiXCIpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgY29uc3QgYnYgPSAoYltrZXldID8/IFwiXCIpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgcmV0dXJuIGlzRGVzYyA/IGJ2LmxvY2FsZUNvbXBhcmUoYXYpIDogYXYubG9jYWxlQ29tcGFyZShidik7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHNldEluZm8oc29ydGVkSW5mbyk7XHJcbiAgICBzZXRTb3J0Q2hlY2sobmV4dFNvcnRDaGVjayk7XHJcblxyXG4gICAgLy8gVXBkYXRlIGhlYWRlciBsYWJlbHMgdG8gc2hvdyB0aGUgbGl0dGxlIGFycm93IG9uIHRoZSBhY3RpdmUgY29sdW1uXHJcbiAgICBzZXRMYWJlbHMod2l0aFNvcnRJY29uKGxhYmVsQmFzZSwgcG9zLCBpc0Rlc2MpKTtcclxuICB9XHJcblxyXG5cclxuICBjb25zdCByb3dTZWxlY3QgPSAoaXRlbSkgPT4ge1xyXG4gICAgaWYgKGl0ZW0gJiYgaXRlbS5pZCkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIlNlbGVjdGVkIGl0ZW06XCIsIGl0ZW0pO1xuICAgICAgc2V0SXNOYXZpZ2F0aW5nKHRydWUpO1xuICAgICAgcm91dGVyLnB1c2goXCIuL2l0ZW0vXCIgKyBpdGVtLmlkKTtcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmVycm9yKFwiVW5hYmxlIHRvIGRldGVybWluZSB0aGUgc2VsZWN0ZWQgaXRlbeKAmXMgSUQ6IFwiLCBpdGVtKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBjb25zdCBbc2VsZWN0ZWRJdGVtcywgc2V0U2VsZWN0ZWRJdGVtc10gPSB1c2VTdGF0ZShbXSk7XHJcbiAgY29uc3QgW3Nob3dEZWxldGVNb2RhbCwgc2V0U2hvd0RlbGV0ZU1vZGFsXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlU2VsZWN0SXRlbSA9IChpZCkgPT4ge1xyXG4gICAgc2V0U2VsZWN0ZWRJdGVtcyhwcmV2ID0+XHJcbiAgICAgIHByZXYuaW5jbHVkZXMoaWQpID8gcHJldi5maWx0ZXIoeCA9PiB4ICE9PSBpZCkgOiBbLi4ucHJldiwgaWRdXHJcbiAgICApO1xyXG4gIH07XHJcblxyXG5cclxuICAvLyBzZXRTZWxlY3RlZEl0ZW1zKChwcmV2KSA9PiB7XHJcbiAgLy8gICBjb25zdCBuZXdTZWxlY3Rpb24gPSBwcmV2LmluY2x1ZGVzKGlkKVxyXG4gIC8vICAgICA/IHByZXYuZmlsdGVyKChpdGVtSWQpID0+IGl0ZW1JZCAhPT0gaWQpXHJcbiAgLy8gICAgIDogWy4uLnByZXYsIGlkXTtcclxuICAvLyAgIGNvbnNvbGUubG9nKFwiU2VsZWN0ZWQgaXRlbXM6XCIsIG5ld1NlbGVjdGlvbik7XHJcbiAgLy8gICByZXR1cm4gbmV3U2VsZWN0aW9uOyAvLyA8LSBpbXBvcnRhbnRcclxuICAvLyB9KTtcclxuXHJcbiAgY29uc3QgaGFuZGxlU2hvd0RlbGV0ZU1vZGFsID0gKCkgPT4gc2V0U2hvd0RlbGV0ZU1vZGFsKHRydWUpO1xyXG4gIGNvbnN0IGhhbmRsZUNsb3NlRGVsZXRlTW9kYWwgPSAoKSA9PiBzZXRTaG93RGVsZXRlTW9kYWwoZmFsc2UpO1xyXG5cclxuICBjb25zdCBoYW5kbGVEZWxldGVTZWxlY3RlZCA9IGFzeW5jICgpID0+IHtcclxuICAgIHNldElzRGVsZXRpbmcodHJ1ZSk7XHJcbiAgICBjb25zdCBkYiA9IGZpcmViYXNlLmZpcmVzdG9yZSgpO1xyXG4gICAgdHJ5IHtcclxuICAgICAgLy8gTG9vcCBvdmVyIGVhY2ggc2VsZWN0ZWQgaXRlbSBvbmUgYXQgYSB0aW1lXHJcbiAgICAgIGZvciAoY29uc3QgaXRlbUlkIG9mIHNlbGVjdGVkSXRlbXMpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhpdGVtSWQpXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIC8vIERlbGV0ZSBmcm9tIFwiVGVzdFwiIGNvbGxlY3Rpb25cclxuICAgICAgICAgIGF3YWl0IGRiLmNvbGxlY3Rpb24oXCJUZXN0XCIpLmRvYyhpdGVtSWQpLmRlbGV0ZSgpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgY29uc29sZS5lcnJvcihgRXJyb3IgZGVsZXRpbmcgZG9jdW1lbnQgJHtpdGVtSWR9IGZyb20gVGVzdDpgLCBlcnIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgLy8gRGVsZXRlIGZyb20gXCJQYXJ0c1wiIGNvbGxlY3Rpb25cclxuICAgICAgICAgIGF3YWl0IGRiLmNvbGxlY3Rpb24oXCJQYXJ0c1wiKS5kb2MoaXRlbUlkKS5kZWxldGUoKTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEVycm9yIGRlbGV0aW5nIGRvY3VtZW50ICR7aXRlbUlkfSBmcm9tIFBhcnRzOmAsIGVycik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAvLyBEZWxldGUgYXNzb2NpYXRlZCBwaG90b3MgZnJvbSBzdG9yYWdlXHJcbiAgICAgICAgICBhd2FpdCBkZWxldGVGcm9tU3RvcmFnZShpdGVtSWQpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgY29uc29sZS5lcnJvcihgRXJyb3IgZGVsZXRpbmcgc3RvcmFnZSBmb3IgJHtpdGVtSWR9OmAsIGVycik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIC8vIFVwZGF0ZSBsb2NhbCBzdGF0ZSBieSBmaWx0ZXJpbmcgb3V0IHRoZSBkZWxldGVkIGl0ZW1zXHJcbiAgICAgIHNldEluZm8oaW5mby5maWx0ZXIoKGl0ZW0pID0+ICFzZWxlY3RlZEl0ZW1zLmluY2x1ZGVzKGl0ZW0uaWQpKSk7XHJcbiAgICAgIHNldFNlbGVjdGVkSXRlbXMoW10pO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGRlbGV0aW5nIGl0ZW1zOlwiLCBlcnJvcik7XHJcbiAgICB9IGZpbmFsbHkge1xyXG4gICAgICBzZXRJc0RlbGV0aW5nKGZhbHNlKTtcclxuICAgICAgaGFuZGxlQ2xvc2VEZWxldGVNb2RhbCgpO1xyXG4gICAgICAvLyBPcHRpb25hbGx5LCByZWxvYWQgdGhlIHBhZ2VcclxuICAgICAgLy8gcm91dGVyLnJlbG9hZCgpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG5cclxuICBjb25zdCBoYW5kbGVDbG9zZSA9ICgpID0+IHNldFNob3coZmFsc2UpO1xyXG4gIGNvbnN0IGhhbmRsZVNob3cgPSAoKSA9PiBzZXRTaG93KHRydWUpO1xyXG5cclxuICBjb25zdCBjaGVja0RlbGV0ZSA9IChldmVudCwgcG9zLCBpZHNUb0RlbGV0ZSwgbmFtZSkgPT4ge1xyXG4gICAgaWYgKGV2ZW50KSB7XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgfVxyXG4gICAgY29uc29sZS5sb2coXCJTZWxlY3RlZCBJRHMgdG8gZGVsZXRlOlwiLCBpZHNUb0RlbGV0ZSk7XHJcbiAgICBzZXRTZWxlY3RlZEl0ZW1zKGlkc1RvRGVsZXRlKTtcclxuICAgIHNldERJdGVtKG5hbWUpO1xyXG4gICAgc2V0U2hvd0RlbGV0ZU1vZGFsKHRydWUpO1xyXG4gIH07XHJcblxyXG4gIC8vIGNvbnN0IGhhbmRsZURlbGV0ZSA9IGFzeW5jICgpID0+IHtcclxuICAvLyAgIGxldCBpdGVtSWQgPSBnSWRlO1xyXG4gIC8vICAgdHJ5IHtcclxuICAvLyAgICAgc2V0SXNEZWxldGluZyh0cnVlKTtcclxuICAvLyAgICAgY29uc3QgZGIgPSBmaXJlYmFzZS5maXJlc3RvcmUoKTtcclxuICAvLyAgICAgYXdhaXQgZGIuY29sbGVjdGlvbihcIlRlc3RcIikuZG9jKGl0ZW1JZCkuZGVsZXRlKCk7XHJcbiAgLy8gICAgIGF3YWl0IGRlbGV0ZUZyb21QYXJ0c0NvbGxlY3Rpb24oaXRlbUlkKTtcclxuICAvLyAgICAgYXdhaXQgZGVsZXRlRnJvbVN0b3JhZ2UoaXRlbUlkKTtcclxuICAvLyAgICAgc2V0SW5mbyhpbmZvLmZpbHRlcigoXywgaSkgPT4gZ1BvcyAhPT0gaSkpO1xyXG4gIC8vICAgICBjb25zb2xlLmxvZyhgRGVsZXRlZCBpdGVtOiAke2l0ZW1JZH1gKTtcclxuICAvLyAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgLy8gICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBkZWxldGluZyBpdGVtOlwiLCBlcnJvcik7XHJcbiAgLy8gICB9IGZpbmFsbHkge1xyXG4gIC8vICAgICBzZXRJc0RlbGV0aW5nKGZhbHNlKTtcclxuICAvLyAgIH1cclxuICAvLyAgIGhhbmRsZUNsb3NlKCk7XHJcbiAgLy8gfTtcclxuXHJcbiAgY29uc3QgaG92ZXJTdHlsZSA9IChpbmRleCkgPT4gKHtcclxuICAgIGJhY2tncm91bmRDb2xvcjogaG92ZXJJbmRleCA9PT0gaW5kZXggPyBcIiNkZGRcIiA6IFwidHJhbnNwYXJlbnRcIixcclxuICAgIHRleHRBbGlnbjogXCJjZW50ZXJcIixcclxuICAgIGN1cnNvcjogXCJkZWZhdWx0XCIsXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IFtkcm9wZG93bjFUZXh0LCBzZXREcm9wZG93bjFUZXh0XSA9IHVzZVN0YXRlKFwiU2VsZWN0IE9wdGlvblwiKTtcclxuICBjb25zdCBbZHJvcGRvd24yVGV4dCwgc2V0RHJvcGRvd24yVGV4dF0gPSB1c2VTdGF0ZShcIlNlbGVjdCBPcHRpb25cIik7XHJcblxyXG4gIGNvbnN0IGhhbmRsZVNlbGVjdDEgPSAoZXZlbnRLZXksIGV2ZW50KSA9PiB7XHJcbiAgICBpZiAoZXZlbnRLZXkgPT09IFwidW5hc3NpZ25lZFwiKSB7XHJcbiAgICAgIHNldERyb3Bkb3duMVRleHQoXCJTZWxlY3QgT3B0aW9uXCIpO1xyXG4gICAgICBzZXRTZWxlY3RlZE9FTShudWxsKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHNldERyb3Bkb3duMVRleHQoZXZlbnQudGFyZ2V0LnRleHRDb250ZW50KTtcclxuICAgICAgc2V0U2VsZWN0ZWRPRU0oZXZlbnQudGFyZ2V0LnRleHRDb250ZW50KTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBjb25zdCBoYW5kbGVTZWxlY3QyID0gKGV2ZW50S2V5LCBldmVudCkgPT4ge1xyXG4gICAgaWYgKGV2ZW50S2V5ID09PSBcInVuYXNzaWduZWRcIikge1xyXG4gICAgICBzZXREcm9wZG93bjJUZXh0KFwiU2VsZWN0IE9wdGlvblwiKTtcclxuICAgICAgc2V0U2VsZWN0ZWRNb2RhbGl0eShudWxsKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHNldERyb3Bkb3duMlRleHQoZXZlbnQudGFyZ2V0LnRleHRDb250ZW50KTtcclxuICAgICAgc2V0U2VsZWN0ZWRNb2RhbGl0eShldmVudC50YXJnZXQudGV4dENvbnRlbnQpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIC8vIEJ1aWxkIGEgdW5pcXVlIGxpc3Qgb2YgY2xpZW50cyBmcm9tIHRoZSBpdGVtcyBjdXJyZW50bHkgbG9hZGVkLCBmaWx0ZXJlZCBieSBPRU0vTW9kYWxpdHkuXHJcbiAgLy8gYHR5cGVgIGlzIFwiZnJvbVwiIG9yIFwiY3VycmVudFwiIHRvIGRlY2lkZSB3aGljaCBjbGllbnQgcmVmIHRvIHJlYWQuXHJcbiAgYXN5bmMgZnVuY3Rpb24gYnVpbGRDbGllbnRzRnJvbUl0ZW1zKHR5cGUpIHtcbiAgICBjb25zdCBkYiA9IGZpcmViYXNlLmZpcmVzdG9yZSgpO1xuICAgIGNvbnN0IGlkcyA9IG5ldyBTZXQoKTtcblxuICAgIC8vIFJlc3BlY3QgY3VycmVudCBPRU0gLyBNb2RhbGl0eSBmaWx0ZXJzIHdoZW4gZGVyaXZpbmcgY2xpZW50IG9wdGlvbnNcbiAgICBjb25zdCBmaWx0ZXJlZCA9IGF1Z21lbnRlZEluZm8uZmlsdGVyKChpdGVtKSA9PiB7XG4gICAgICBjb25zdCBPRU0gPSBnZXRNYWNoaW5lRmllbGQoaXRlbSwgXCJPRU1cIik7XG4gICAgICBjb25zdCBNb2RhbGl0eSA9IGdldE1hY2hpbmVGaWVsZChpdGVtLCBcIk1vZGFsaXR5XCIpO1xuICAgICAgaWYgKHNlbGVjdGVkT0VNICYmIG5vcm1hbGl6ZVRleHQoT0VNKSAhPT0gbm9ybWFsaXplVGV4dChzZWxlY3RlZE9FTSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKFxuICAgICAgICBzZWxlY3RlZE1vZGFsaXR5ICYmXG4gICAgICAgIG5vcm1hbGl6ZVRleHQoTW9kYWxpdHkpICE9PSBub3JtYWxpemVUZXh0KHNlbGVjdGVkTW9kYWxpdHkpXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSk7XG5cclxuICAgIGZvciAoY29uc3QgaXQgb2YgZmlsdGVyZWQpIHtcclxuICAgICAgY29uc3QgaWQgPSB0eXBlID09PSBcImZyb21cIiA/IGl0LmNsaWVudEZyb21JZCA6IGl0LmNsaWVudEN1cnJlbnRJZDtcclxuICAgICAgaWYgKGlkKSBpZHMuYWRkKGlkKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBvdXQgPSBbXTtcclxuICAgIGNvbnN0IGlkQXJyYXkgPSBbLi4uaWRzXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaWRBcnJheS5sZW5ndGg7IGkgKz0gMTApIHtcclxuICAgICAgY29uc3QgY2h1bmsgPSBpZEFycmF5LnNsaWNlKGksIGkgKyAxMCk7XHJcbiAgICAgIGNvbnN0IHNuYXAgPSBhd2FpdCBkYlxyXG4gICAgICAgIC5jb2xsZWN0aW9uKFwiQ2xpZW50XCIpXHJcbiAgICAgICAgLndoZXJlKGZpcmViYXNlLmZpcmVzdG9yZS5GaWVsZFBhdGguZG9jdW1lbnRJZCgpLCBcImluXCIsIGNodW5rKVxyXG4gICAgICAgIC5nZXQoKTtcclxuICAgICAgc25hcC5mb3JFYWNoKChkb2MpID0+IHtcclxuICAgICAgICBjb25zdCBkID0gZG9jLmRhdGEoKSB8fCB7fTtcclxuICAgICAgICBvdXQucHVzaCh7IGlkOiBkb2MuaWQsIG5hbWU6IGQubmFtZSB8fCBkb2MuaWQgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHNvcnQgYnkgbmFtZSBmb3IgbmljZXIgVVhcclxuICAgIG91dC5zb3J0KChhLCBiKSA9PiAoYS5uYW1lIHx8IFwiXCIpLmxvY2FsZUNvbXBhcmUoYi5uYW1lIHx8IFwiXCIpKTtcclxuICAgIHJldHVybiBvdXQ7XHJcbiAgfVxyXG5cclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBDTElFTlQgU0VMRUNUSU9OIEhBTkRMSU5HXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBUaGlzIGZ1bmN0aW9uIGZldGNoZXMgY2xpZW50cyBhbmQgb3BlbnMgdGhlIGNsaWVudCBtb2RhbC5cclxuICBjb25zdCBoYW5kbGVDbGllbnRDbGljayA9IGFzeW5jICgpID0+IHtcclxuICAgIGxldCBzYWZlQ2xpZW50cyA9IFtdO1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgY2xpZW50c0RhdGEgPSBhd2FpdCBmZXRjaENsaWVudHMoc2VsZWN0ZWRPRU0sIHNlbGVjdGVkTW9kYWxpdHkpO1xyXG4gICAgICBzYWZlQ2xpZW50cyA9IEFycmF5LmlzQXJyYXkoY2xpZW50c0RhdGEpID8gY2xpZW50c0RhdGEgOiBbXTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgY29uc29sZS5lcnJvcihcImZldGNoQ2xpZW50cyBmYWlsZWQ6XCIsIGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEZhbGxiYWNrIHRvIGJ1aWxkaW5nIGZyb20gbG9hZGVkIGl0ZW1zIGlmIEFQSSBnYXZlIHVzIG5vdGhpbmdcclxuICAgIGlmIChzYWZlQ2xpZW50cy5sZW5ndGggPT09IDApIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBpZiAoIWNsaWVudFNlbGVjdGlvblR5cGUpIHtcclxuICAgICAgICAgIC8vIGlmIHNvbWVob3cgbm90IHNldCB5ZXQsIGRlZmF1bHQgdG8gXCJmcm9tXCJcclxuICAgICAgICAgIHNldENsaWVudFNlbGVjdGlvblR5cGUoXCJmcm9tXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBkZXJpdmVkID0gYXdhaXQgYnVpbGRDbGllbnRzRnJvbUl0ZW1zKGNsaWVudFNlbGVjdGlvblR5cGUgfHwgXCJmcm9tXCIpO1xyXG4gICAgICAgIHNhZmVDbGllbnRzID0gZGVyaXZlZDtcclxuICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYWxsYmFjayBidWlsZENsaWVudHNGcm9tSXRlbXMgZmFpbGVkOlwiLCBlKTtcclxuICAgICAgICBzYWZlQ2xpZW50cyA9IFtdO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0Q2xpZW50cyhzYWZlQ2xpZW50cyk7XHJcbiAgICBzZXRDbGllbnRTZWFyY2hUZXJtKFwiXCIpO1xyXG4gICAgc2V0U2hvd0NsaWVudE1vZGFsKHRydWUpO1xyXG4gIH07XHJcblxyXG5cclxuXHJcbiAgLy8gV2hlbiBhIGNsaWVudCBpcyBzZWxlY3RlZCBpbiB0aGUgbW9kYWwsIHdlIG5vdyBhc3N1bWUgdGhlIHBhcmFtZXRlciBpcyBhIGNsaWVudCBJRC5cclxuICAvLyBJZiB0aGUgcGFzc2VkIHZhbHVlIGlzIG51bGwsIHdlIGNsZWFyIHRoZSBzZWxlY3Rpb24uXHJcbiAgY29uc3QgaGFuZGxlQ2xpZW50U2VsZWN0ID0gYXN5bmMgKGNsaWVudElkKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhcIlVzZXIgc2VsZWN0ZWQgY2xpZW50IGlkOlwiLCBjbGllbnRJZCk7XHJcbiAgICBpZiAoIWNsaWVudElkKSB7XHJcbiAgICAgIGlmIChjbGllbnRTZWxlY3Rpb25UeXBlID09PSBcImZyb21cIikge1xyXG4gICAgICAgIHNldENsaWVudEZyb21CdXR0b25UZXh0KFwiU2VsZWN0IE9wdGlvblwiKTtcclxuICAgICAgICBzZXRTZWxlY3RlZENsaWVudEZyb20obnVsbCk7XHJcbiAgICAgIH0gZWxzZSBpZiAoY2xpZW50U2VsZWN0aW9uVHlwZSA9PT0gXCJjdXJyZW50XCIpIHtcclxuICAgICAgICBzZXRDbGllbnRDdXJyZW50QnV0dG9uVGV4dChcIlNlbGVjdCBPcHRpb25cIik7XHJcbiAgICAgICAgc2V0U2VsZWN0ZWRDbGllbnRDdXJyZW50KG51bGwpO1xyXG4gICAgICB9XHJcbiAgICAgIHNldFNob3dDbGllbnRNb2RhbChmYWxzZSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IGNsaWVudFNuYXAgPSBhd2FpdCBmaXJlYmFzZS5maXJlc3RvcmUoKS5jb2xsZWN0aW9uKFwiQ2xpZW50XCIpLmRvYyhjbGllbnRJZCkuZ2V0KCk7XHJcbiAgICAgIGlmIChjbGllbnRTbmFwLmV4aXN0cykge1xyXG4gICAgICAgIGNvbnN0IGNsaWVudERhdGEgPSBjbGllbnRTbmFwLmRhdGEoKTtcclxuICAgICAgICBpZiAoY2xpZW50U2VsZWN0aW9uVHlwZSA9PT0gXCJmcm9tXCIpIHtcclxuICAgICAgICAgIHNldENsaWVudEZyb21CdXR0b25UZXh0KGNsaWVudERhdGEubmFtZSk7XHJcbiAgICAgICAgICBzZXRTZWxlY3RlZENsaWVudEZyb20oY2xpZW50SWQpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoY2xpZW50U2VsZWN0aW9uVHlwZSA9PT0gXCJjdXJyZW50XCIpIHtcclxuICAgICAgICAgIHNldENsaWVudEN1cnJlbnRCdXR0b25UZXh0KGNsaWVudERhdGEubmFtZSk7XHJcbiAgICAgICAgICBzZXRTZWxlY3RlZENsaWVudEN1cnJlbnQoY2xpZW50SWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiTm8gY2xpZW50IGRvY3VtZW50IGZvdW5kIGZvciBpZDpcIiwgY2xpZW50SWQpO1xyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZmV0Y2hpbmcgY2xpZW50IGRhdGE6XCIsIGVycm9yKTtcclxuICAgIH1cclxuICAgIHNldFNob3dDbGllbnRNb2RhbChmYWxzZSk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQ2xpZW50SW5mbyA9IChjbGllbnRJZCwgY2xpZW50TmFtZSkgPT4ge1xyXG4gICAgY29uc29sZS5sb2coYENsaWVudCBJRDogJHtjbGllbnRJZH0sIENsaWVudCBOYW1lOiAke2NsaWVudE5hbWV9YCk7XHJcbiAgICByb3V0ZXIucHVzaChcImNsaWVudC9cIiArIGNsaWVudElkKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBoYW5kbGVDbGVhckNsaWVudFNlbGVjdGlvbiA9ICgpID0+IHtcclxuICAgIGlmIChjbGllbnRTZWxlY3Rpb25UeXBlID09PSBcImZyb21cIikge1xyXG4gICAgICBzZXRDbGllbnRGcm9tQnV0dG9uVGV4dChcIlNlbGVjdCBPcHRpb25cIik7XHJcbiAgICAgIHNldFNlbGVjdGVkQ2xpZW50RnJvbShudWxsKTtcclxuICAgIH0gZWxzZSBpZiAoY2xpZW50U2VsZWN0aW9uVHlwZSA9PT0gXCJjdXJyZW50XCIpIHtcclxuICAgICAgc2V0Q2xpZW50Q3VycmVudEJ1dHRvblRleHQoXCJTZWxlY3QgT3B0aW9uXCIpO1xyXG4gICAgICBzZXRTZWxlY3RlZENsaWVudEN1cnJlbnQobnVsbCk7XHJcbiAgICB9XHJcbiAgICBzZXRTaG93Q2xpZW50TW9kYWwoZmFsc2UpO1xyXG4gIH07XHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gTU9ERUwgU0VMRUNUSU9OIEhBTkRMSU5HXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICBjb25zdCBbbW9kZWxzLCBzZXRNb2RlbHNdID0gdXNlU3RhdGUoW10pO1xyXG4gIGNvbnN0IFtzaG93TW9kZWxNb2RhbCwgc2V0U2hvd01vZGVsTW9kYWxdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFttb2RlbEJ1dHRvblRleHQsIHNldE1vZGVsQnV0dG9uVGV4dF0gPSB1c2VTdGF0ZShcIlNlbGVjdCBPcHRpb25cIik7XHJcblxyXG4gIGNvbnN0IGhhbmRsZU1vZGVsQ2xpY2sgPSBhc3luYyAoKSA9PiB7XHJcbiAgICBjb25zdCBtb2RlbHNEYXRhID0gYXdhaXQgZmV0Y2hNb2RlbHMoXHJcbiAgICAgIHNlbGVjdGVkT0VNLFxyXG4gICAgICBzZWxlY3RlZE1vZGFsaXR5LFxyXG4gICAgICBzZWxlY3RlZENsaWVudEZyb21cclxuICAgICk7XHJcbiAgICBzZXRNb2RlbHMobW9kZWxzRGF0YSk7XHJcbiAgICBzZXRNb2RlbFNlYXJjaFRlcm0oXCJcIik7XHJcbiAgICBzZXRTaG93TW9kZWxNb2RhbCh0cnVlKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBoYW5kbGVNb2RlbFNlbGVjdCA9IChtb2RlbE5hbWUpID0+IHtcclxuICAgIHNldE1vZGVsQnV0dG9uVGV4dChtb2RlbE5hbWUgfHwgXCJTZWxlY3QgT3B0aW9uXCIpO1xyXG4gICAgc2V0U2VsZWN0ZWRNb2RlbChtb2RlbE5hbWUgfHwgbnVsbCk7XHJcbiAgICBzZXRTaG93TW9kZWxNb2RhbChmYWxzZSk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQ2xlYXJNb2RlbFNlbGVjdGlvbiA9ICgpID0+IHtcclxuICAgIHNldE1vZGVsQnV0dG9uVGV4dChcIlNlbGVjdCBPcHRpb25cIik7XHJcbiAgICBzZXRTZWxlY3RlZE1vZGVsKG51bGwpO1xyXG4gICAgc2V0U2hvd01vZGVsTW9kYWwoZmFsc2UpO1xyXG4gIH07XHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gV0FSRUhPVVNFIEJVVFRPTlMgKGZvciBDbGllbnQgQ3VycmVudClcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIGNvbnN0IGhhbmRsZVNvQ2FsV2FyZWhvdXNlQ2xpY2sgPSAoKSA9PiB7XHJcbiAgICBzZXRDbGllbnRDdXJyZW50QnV0dG9uVGV4dChcIlNvQ2FsIFdhcmVob3VzZVwiKTtcclxuICAgIHNldFNlbGVjdGVkQ2xpZW50Q3VycmVudChTT0NBTF9DTElFTlRfSUQpO1xyXG4gICAgY29uc29sZS5sb2coXCJXYXJlaG91c2UgYnV0dG9uIGNsaWNrZWQ6IHNldHRpbmcgQ2xpZW50IEN1cnJlbnQgdG9cIiwgU09DQUxfQ0xJRU5UX0lEKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBoYW5kbGVOb3JDYWxXYXJlaG91c2VDbGljayA9ICgpID0+IHtcclxuICAgIHNldENsaWVudEN1cnJlbnRCdXR0b25UZXh0KFwiTm9yQ2FsIFdhcmVob3VzZVwiKTtcclxuICAgIHNldFNlbGVjdGVkQ2xpZW50Q3VycmVudChOT1JDQUxfQ0xJRU5UX0lEKTtcclxuICAgIGNvbnNvbGUubG9nKFwiV2FyZWhvdXNlIGJ1dHRvbiBjbGlja2VkOiBzZXR0aW5nIENsaWVudCBDdXJyZW50IHRvXCIsIE5PUkNBTF9DTElFTlRfSUQpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGhhbmRsZVdhcmVob3VzZVVuYXNzaWduZWRDbGljayA9ICgpID0+IHtcclxuICAgIHNldENsaWVudEN1cnJlbnRCdXR0b25UZXh0KFwiVW5hc3NpZ25lZFwiKTtcclxuICAgIHNldFNlbGVjdGVkQ2xpZW50Q3VycmVudChVTkFTU0lHTkVEX0NMSUVOVF9JRCk7XHJcbiAgICBjb25zb2xlLmxvZyhcIldhcmVob3VzZSBidXR0b24gY2xpY2tlZDogc2V0dGluZyBDbGllbnQgQ3VycmVudCB0b1wiLCBVTkFTU0lHTkVEX0NMSUVOVF9JRCk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgW2NsaWVudFNlYXJjaFRlcm0sIHNldENsaWVudFNlYXJjaFRlcm1dID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW21vZGVsU2VhcmNoVGVybSwgc2V0TW9kZWxTZWFyY2hUZXJtXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG5cclxuICBjb25zdCBkZWxldGVGcm9tU3RvcmFnZSA9IGFzeW5jIChpdGVtSWQpID0+IHtcclxuICAgIGNvbnN0IHN0b3JhZ2VSZWYgPSBmaXJlYmFzZS5zdG9yYWdlKCkucmVmKCk7XHJcbiAgICBjb25zdCBmb2xkZXJSZWYgPSBzdG9yYWdlUmVmLmNoaWxkKGBQYXJ0cy8ke2l0ZW1JZH0vYCk7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBsaXN0UmVzdWx0ID0gYXdhaXQgZm9sZGVyUmVmLmxpc3RBbGwoKTtcclxuICAgICAgY29uc3QgZGVsZXRlUHJvbWlzZXMgPSBsaXN0UmVzdWx0Lml0ZW1zLm1hcCgoaXRlbSkgPT4gaXRlbS5kZWxldGUoKSk7XHJcbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKGRlbGV0ZVByb21pc2VzKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBkZWxldGluZyBmcm9tIHN0b3JhZ2U6XCIsIGVycm9yKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBjb25zdCBkZWxldGVGcm9tUGFydHNDb2xsZWN0aW9uID0gYXN5bmMgKGl0ZW1JZCkgPT4ge1xyXG4gICAgY29uc3QgZGIgPSBmaXJlYmFzZS5maXJlc3RvcmUoKTtcclxuICAgIHRyeSB7XHJcbiAgICAgIGF3YWl0IGRiLmNvbGxlY3Rpb24oXCJQYXJ0c1wiKS5kb2MoaXRlbUlkKS5kZWxldGUoKTtcclxuICAgICAgY29uc29sZS5sb2coYERlbGV0ZWQgaXRlbSBmcm9tIFBhcnRzIGNvbGxlY3Rpb246ICR7aXRlbUlkfWApO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGRlbGV0aW5nIGZyb20gUGFydHMgY29sbGVjdGlvbjpcIiwgZXJyb3IpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIC8vICAgLy8gU2FmZWx5IGNvbnZlcnQgYW55IGRhdGUtaXNoIHZhbHVlIGludG8gYSBjb21wYXJhYmxlIHRpbWVzdGFtcCAobXMgc2luY2UgZXBvY2gpLlxyXG4gIC8vIGZ1bmN0aW9uIHRvVGltZSh2YWx1ZSkge1xyXG4gIC8vICAgaWYgKCF2YWx1ZSkgcmV0dXJuIG51bGw7XHJcblxyXG4gIC8vICAgLy8gRmlyZXN0b3JlIFRpbWVzdGFtcDogeyBzZWNvbmRzLCBuYW5vc2Vjb25kcyB9XHJcbiAgLy8gICBpZiAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmIHZhbHVlLnNlY29uZHMpIHtcclxuICAvLyAgICAgdHJ5IHtcclxuICAvLyAgICAgICByZXR1cm4gdmFsdWUuc2Vjb25kcyAqIDEwMDA7XHJcbiAgLy8gICAgIH0gY2F0Y2ggeyAvKiBmYWxsdGhyb3VnaCAqLyB9XHJcbiAgLy8gICB9XHJcblxyXG4gIC8vICAgLy8gSWYgYWxyZWFkeSBhIERhdGVcclxuICAvLyAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIERhdGUpIHJldHVybiBpc05hTih2YWx1ZS5nZXRUaW1lKCkpID8gbnVsbCA6IHZhbHVlLmdldFRpbWUoKTtcclxuXHJcbiAgLy8gICAvLyBJZiBzdHJpbmc6IHRyeSBJU08gZmlyc3RcclxuICAvLyAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpIHtcclxuICAvLyAgICAgLy8geXl5eS1tbS1kZCAoZnJvbSB5b3VyIGZvcm0gaW5wdXRzKVxyXG4gIC8vICAgICBjb25zdCBpc28gPSBEYXRlLnBhcnNlKHZhbHVlKTtcclxuICAvLyAgICAgaWYgKCFpc05hTihpc28pKSByZXR1cm4gaXNvO1xyXG5cclxuICAvLyAgICAgLy8gbW0vZGQveXl5eSBmYWxsYmFjayAob2xkZXIgaXRlbXMpXHJcbiAgLy8gICAgIGNvbnN0IHBhcnRzID0gdmFsdWUuc3BsaXQoXCIvXCIpO1xyXG4gIC8vICAgICBpZiAocGFydHMubGVuZ3RoID09PSAzKSB7XHJcbiAgLy8gICAgICAgY29uc3QgW21tLCBkZCwgeXl5eV0gPSBwYXJ0cztcclxuICAvLyAgICAgICBjb25zdCBhbHQgPSBEYXRlLnBhcnNlKGAke3l5eXl9LSR7bW19LSR7ZGR9YCk7XHJcbiAgLy8gICAgICAgaWYgKCFpc05hTihhbHQpKSByZXR1cm4gYWx0O1xyXG4gIC8vICAgICB9XHJcbiAgLy8gICB9XHJcblxyXG4gIC8vICAgLy8gQ2Fub25pY2FsaXplIGFueSBkYXRlLWlzaCB2YWx1ZSB0byAneXl5eS1tbS1kZCcgc28gaXQgbWF0Y2hlcyA8aW5wdXQgdHlwZT1cImRhdGVcIj4gdmFsdWVzXHJcbiAgLy8gICBmdW5jdGlvbiB0b1lNRCh2YWx1ZSkge1xyXG4gIC8vICAgICBjb25zdCB0ID0gdG9UaW1lKHZhbHVlKTtcclxuICAvLyAgICAgaWYgKHQgPT0gbnVsbCkgcmV0dXJuIG51bGw7XHJcbiAgLy8gICAgIGNvbnN0IGQgPSBuZXcgRGF0ZSh0KTtcclxuICAvLyAgICAgY29uc3QgeXl5eSA9IGQuZ2V0RnVsbFllYXIoKTtcclxuICAvLyAgICAgY29uc3QgbW0gPSBTdHJpbmcoZC5nZXRNb250aCgpICsgMSkucGFkU3RhcnQoMiwgXCIwXCIpO1xyXG4gIC8vICAgICBjb25zdCBkZCA9IFN0cmluZyhkLmdldERhdGUoKSkucGFkU3RhcnQoMiwgXCIwXCIpO1xyXG4gIC8vICAgICByZXR1cm4gYCR7eXl5eX0tJHttbX0tJHtkZH1gO1xyXG4gIC8vICAgfVxyXG5cclxuXHJcbiAgLy8gICAvLyBMYXN0IHJlc29ydFxuICAvLyAgIGNvbnN0IHQgPSBEYXRlLnBhcnNlKHZhbHVlKTtcbiAgLy8gICByZXR1cm4gaXNOYU4odCkgPyBudWxsIDogdDtcbiAgLy8gfVxuXG4gIGNvbnN0IHRvdGFsS25vd25QYWdlcyA9IE1hdGgubWF4KFxuICAgIDEsXG4gICAgcGFnZUN1cnNvcnMuZmlsdGVyKEJvb2xlYW4pLmxlbmd0aCArIChoYXNOZXh0UGFnZSA/IDEgOiAwKVxuICApO1xuICBjb25zdCBwYWdlQnV0dG9ucyA9ICgoKSA9PiB7XG4gICAgY29uc3QgYnV0dG9ucyA9IFtdO1xuICAgIGNvbnN0IG1heFZpc2libGUgPSA3O1xuXG4gICAgY29uc3QgcHVzaFBhZ2UgPSAocCkgPT5cbiAgICAgIGJ1dHRvbnMucHVzaChcbiAgICAgICAgPFBhZ2luYXRpb24uSXRlbVxuICAgICAgICAgIGtleT17YHBhZ2UtJHtwfWB9XG4gICAgICAgICAgYWN0aXZlPXtwID09PSBwYWdlfVxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFBhZ2UocCl9XG4gICAgICAgID5cbiAgICAgICAgICB7cH1cbiAgICAgICAgPC9QYWdpbmF0aW9uLkl0ZW0+XG4gICAgICApO1xuXG4gICAgY29uc3QgcHVzaEVsbGlwc2lzID0gKGtleSkgPT5cbiAgICAgIGJ1dHRvbnMucHVzaCg8UGFnaW5hdGlvbi5FbGxpcHNpcyBrZXk9e2tleX0gZGlzYWJsZWQgLz4pO1xuXG4gICAgaWYgKHRvdGFsS25vd25QYWdlcyA8PSBtYXhWaXNpYmxlKSB7XG4gICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSB0b3RhbEtub3duUGFnZXM7IGkgKz0gMSkgcHVzaFBhZ2UoaSk7XG4gICAgICByZXR1cm4gYnV0dG9ucztcbiAgICB9XG5cbiAgICBsZXQgc3RhcnQgPSBNYXRoLm1heCgyLCBwYWdlIC0gMSk7XG4gICAgbGV0IGVuZCA9IE1hdGgubWluKHRvdGFsS25vd25QYWdlcyAtIDEsIHBhZ2UgKyAxKTtcblxuICAgIGNvbnN0IGRlc2lyZWRXaW5kb3cgPSBtYXhWaXNpYmxlIC0gMjtcbiAgICBsZXQgY3VycmVudFdpbmRvdyA9IGVuZCAtIHN0YXJ0ICsgMTtcbiAgICBsZXQgcmVtYWluaW5nID0gZGVzaXJlZFdpbmRvdyAtIGN1cnJlbnRXaW5kb3c7XG5cbiAgICB3aGlsZSAocmVtYWluaW5nID4gMCkge1xuICAgICAgaWYgKHN0YXJ0ID4gMikge1xuICAgICAgICBzdGFydCAtPSAxO1xuICAgICAgICByZW1haW5pbmcgLT0gMTtcbiAgICAgIH1cbiAgICAgIGlmIChyZW1haW5pbmcgPiAwICYmIGVuZCA8IHRvdGFsS25vd25QYWdlcyAtIDEpIHtcbiAgICAgICAgZW5kICs9IDE7XG4gICAgICAgIHJlbWFpbmluZyAtPSAxO1xuICAgICAgfVxuICAgICAgaWYgKHN0YXJ0ID09PSAyICYmIGVuZCA9PT0gdG90YWxLbm93blBhZ2VzIC0gMSkgYnJlYWs7XG4gICAgfVxuXG4gICAgcHVzaFBhZ2UoMSk7XG4gICAgaWYgKHN0YXJ0ID4gMikgcHVzaEVsbGlwc2lzKFwic3RhcnQtZWxsaXBzaXNcIik7XG4gICAgZm9yIChsZXQgaSA9IHN0YXJ0OyBpIDw9IGVuZDsgaSArPSAxKSBwdXNoUGFnZShpKTtcbiAgICBpZiAoZW5kIDwgdG90YWxLbm93blBhZ2VzIC0gMSkgcHVzaEVsbGlwc2lzKFwiZW5kLWVsbGlwc2lzXCIpO1xuICAgIHB1c2hQYWdlKHRvdGFsS25vd25QYWdlcyk7XG4gICAgaWYgKGhhc05leHRQYWdlKSBwdXNoRWxsaXBzaXMoXCJtb3JlLWVsbGlwc2lzXCIpO1xuXG4gICAgcmV0dXJuIGJ1dHRvbnM7XG4gIH0pKCk7XG5cbiAgY29uc3QgcmVjYWxjUGFnZVNpemUgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybjtcbiAgICBpZiAocGFnZSAhPT0gMSkgcmV0dXJuO1xuICAgIGlmICghdGFibGVCb2R5UmVmLmN1cnJlbnQpIHJldHVybjtcbiAgICBjb25zdCBjb250YWluZXJIZWlnaHQgPVxuICAgICAgdGFibGVCb2R5UmVmLmN1cnJlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0IHx8IDA7XG4gICAgaWYgKCFjb250YWluZXJIZWlnaHQpIHJldHVybjtcblxuICAgIGNvbnN0IGhlYWRlclJvdyA9XG4gICAgICB0YWJsZUJvZHlSZWYuY3VycmVudC5xdWVyeVNlbGVjdG9yKFwidGFibGUgdGhlYWQgdHJcIikgfHxcbiAgICAgIHRhYmxlQm9keVJlZi5jdXJyZW50LnF1ZXJ5U2VsZWN0b3IoXCJ0aGVhZCB0clwiKTtcbiAgICBjb25zdCBib2R5Um93ID1cbiAgICAgIHRhYmxlQm9keVJlZi5jdXJyZW50LnF1ZXJ5U2VsZWN0b3IoXCJ0YWJsZSB0Ym9keSB0clwiKSB8fFxuICAgICAgdGFibGVCb2R5UmVmLmN1cnJlbnQucXVlcnlTZWxlY3RvcihcInRib2R5IHRyXCIpO1xuXG4gICAgaWYgKGhlYWRlclJvdykge1xuICAgICAgY29uc3QgaCA9IGhlYWRlclJvdy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7XG4gICAgICBpZiAoaCkgaGVhZGVySGVpZ2h0UmVmLmN1cnJlbnQgPSBoO1xuICAgIH1cbiAgICBpZiAoYm9keVJvdykge1xuICAgICAgY29uc3QgciA9IGJvZHlSb3cuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xuICAgICAgaWYgKHIpIHJvd0hlaWdodFJlZi5jdXJyZW50ID0gcjtcbiAgICB9XG5cbiAgICBjb25zdCB2ZXJ0aWNhbFBhZGRpbmcgPSAyNDtcbiAgICBjb25zdCBhdmFpbGFibGUgPVxuICAgICAgY29udGFpbmVySGVpZ2h0IC0gaGVhZGVySGVpZ2h0UmVmLmN1cnJlbnQgLSB2ZXJ0aWNhbFBhZGRpbmc7XG4gICAgY29uc3QgZXN0aW1hdGVkID0gTWF0aC5mbG9vcihhdmFpbGFibGUgLyByb3dIZWlnaHRSZWYuY3VycmVudCk7XG4gICAgY29uc3QgY2xhbXBlZCA9IE1hdGgubWF4KDUsIE1hdGgubWluKDUwLCBlc3RpbWF0ZWQpKTtcbiAgICBpZiAoY2xhbXBlZCA+IDAgJiYgY2xhbXBlZCAhPT0gcGFnZVNpemUpIHtcbiAgICAgIHNldFBhZ2VTaXplKGNsYW1wZWQpO1xuICAgICAgcmVzZXRQYWdpbmF0aW9uKCk7XG4gICAgICBzZXRRdWVyeUVwb2NoKCh2KSA9PiB2ICsgMSk7XG4gICAgfVxuICB9LCBbcGFnZSwgcGFnZVNpemVdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm47XG4gICAgcmVjYWxjUGFnZVNpemUoKTtcbiAgICBjb25zdCBvblJlc2l6ZSA9ICgpID0+IHJlY2FsY1BhZ2VTaXplKCk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgb25SZXNpemUpO1xuICAgIHJldHVybiAoKSA9PiB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBvblJlc2l6ZSk7XG4gIH0sIFtyZWNhbGNQYWdlU2l6ZV0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKGlzTG9hZGluZyB8fCBwYWdlICE9PSAxKSByZXR1cm47XG4gICAgcmVjYWxjUGFnZVNpemUoKTtcbiAgfSwgW3BhZ2UsIGlzTG9hZGluZywgcmVjYWxjUGFnZVNpemVdKTtcblxuICBjb25zdCByZW5kZXJGaWx0ZXJzID0gKGlkUHJlZml4KSA9PiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5maWx0ZXJzUGFuZWx9PlxuICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5maWx0ZXJzSGVhZGVyfT5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmZpbHRlcnNUaXRsZX0+RmlsdGVyczwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuZmlsdGVyc1N1YnRpdGxlfT5cbiAgICAgICAgICAgIE5hcnJvdyByZXN1bHRzIGJ5IG1hY2hpbmUsIGNsaWVudCwgb3Igd2FyZWhvdXNlLlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAge2hhc0FjdGl2ZUZpbHRlcnMgPyAoXG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtzdHlsZXMuZmlsdGVyc0JhZGdlfT5BY3RpdmU8L3NwYW4+XG4gICAgICAgICkgOiBudWxsfVxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuZmlsdGVyU2VjdGlvbn0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuZmlsdGVyU2VjdGlvblRpdGxlfT5NYWNoaW5lPC9kaXY+XG4gICAgICAgIDxJbnB1dEdyb3VwIGNsYXNzTmFtZT17c3R5bGVzLmlucHV0R3JvdXB9PlxuICAgICAgICAgIDxJbnB1dEdyb3VwLlRleHQ+T0VNPC9JbnB1dEdyb3VwLlRleHQ+XG4gICAgICAgICAgPERyb3Bkb3duIG9uU2VsZWN0PXtoYW5kbGVTZWxlY3QxfSBjbGFzc05hbWU9XCJ3LTEwMFwiPlxuICAgICAgICAgICAgPERyb3Bkb3duLlRvZ2dsZVxuICAgICAgICAgICAgICB2YXJpYW50PVwib3V0bGluZS1zZWNvbmRhcnlcIlxuICAgICAgICAgICAgICBpZD17YCR7aWRQcmVmaXh9LW9lbWB9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YHctMTAwICR7c3R5bGVzLmlucHV0QnV0dG9ufWB9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHtkcm9wZG93bjFUZXh0fVxuICAgICAgICAgICAgPC9Ecm9wZG93bi5Ub2dnbGU+XG4gICAgICAgICAgICA8RHJvcGRvd24uTWVudSBjbGFzc05hbWU9XCJ3LTEwMFwiPlxuICAgICAgICAgICAgICA8RHJvcGRvd24uSXRlbSBldmVudEtleT1cInVuYXNzaWduZWRcIj5TZWxlY3QgT3B0aW9uPC9Ecm9wZG93bi5JdGVtPlxuICAgICAgICAgICAgICA8RHJvcGRvd24uSXRlbSBldmVudEtleT1cIkdFXCI+R0U8L0Ryb3Bkb3duLkl0ZW0+XG4gICAgICAgICAgICAgIDxEcm9wZG93bi5JdGVtIGV2ZW50S2V5PVwiVG9zaGliYVwiPlRvc2hpYmE8L0Ryb3Bkb3duLkl0ZW0+XG4gICAgICAgICAgICAgIDxEcm9wZG93bi5JdGVtIGV2ZW50S2V5PVwiU2llbWVuc1wiPlNpZW1lbnM8L0Ryb3Bkb3duLkl0ZW0+XG4gICAgICAgICAgICAgIDxEcm9wZG93bi5JdGVtIGV2ZW50S2V5PVwiUGhpbGlwc1wiPlBoaWxpcHM8L0Ryb3Bkb3duLkl0ZW0+XG4gICAgICAgICAgICA8L0Ryb3Bkb3duLk1lbnU+XG4gICAgICAgICAgPC9Ecm9wZG93bj5cbiAgICAgICAgPC9JbnB1dEdyb3VwPlxuXG4gICAgICAgIDxJbnB1dEdyb3VwIGNsYXNzTmFtZT17c3R5bGVzLmlucHV0R3JvdXB9PlxuICAgICAgICAgIDxJbnB1dEdyb3VwLlRleHQ+TW9kYWxpdHk8L0lucHV0R3JvdXAuVGV4dD5cbiAgICAgICAgICA8RHJvcGRvd24gb25TZWxlY3Q9e2hhbmRsZVNlbGVjdDJ9IGNsYXNzTmFtZT1cInctMTAwXCI+XG4gICAgICAgICAgICA8RHJvcGRvd24uVG9nZ2xlXG4gICAgICAgICAgICAgIHZhcmlhbnQ9XCJvdXRsaW5lLXNlY29uZGFyeVwiXG4gICAgICAgICAgICAgIGlkPXtgJHtpZFByZWZpeH0tbW9kYWxpdHlgfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2B3LTEwMCAke3N0eWxlcy5pbnB1dEJ1dHRvbn1gfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7ZHJvcGRvd24yVGV4dH1cbiAgICAgICAgICAgIDwvRHJvcGRvd24uVG9nZ2xlPlxuICAgICAgICAgICAgPERyb3Bkb3duLk1lbnUgY2xhc3NOYW1lPVwidy0xMDBcIj5cbiAgICAgICAgICAgICAgPERyb3Bkb3duLkl0ZW0gZXZlbnRLZXk9XCJ1bmFzc2lnbmVkXCI+U2VsZWN0IE9wdGlvbjwvRHJvcGRvd24uSXRlbT5cbiAgICAgICAgICAgICAgPERyb3Bkb3duLkl0ZW0gZXZlbnRLZXk9XCJDVFwiPkNUPC9Ecm9wZG93bi5JdGVtPlxuICAgICAgICAgICAgICA8RHJvcGRvd24uSXRlbSBldmVudEtleT1cIk1SSVwiPk1SSTwvRHJvcGRvd24uSXRlbT5cbiAgICAgICAgICAgIDwvRHJvcGRvd24uTWVudT5cbiAgICAgICAgICA8L0Ryb3Bkb3duPlxuICAgICAgICA8L0lucHV0R3JvdXA+XG5cbiAgICAgICAgPElucHV0R3JvdXAgY2xhc3NOYW1lPXtzdHlsZXMuaW5wdXRHcm91cH0+XG4gICAgICAgICAgPElucHV0R3JvdXAuVGV4dD5Nb2RlbDwvSW5wdXRHcm91cC5UZXh0PlxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIHZhcmlhbnQ9XCJvdXRsaW5lLXNlY29uZGFyeVwiXG4gICAgICAgICAgICBjbGFzc05hbWU9e2B3LTEwMCAke3N0eWxlcy5pbnB1dEJ1dHRvbn1gfVxuICAgICAgICAgICAgb25DbGljaz17aGFuZGxlTW9kZWxDbGlja31cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7bW9kZWxCdXR0b25UZXh0fVxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICA8L0lucHV0R3JvdXA+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5maWx0ZXJTZWN0aW9ufT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5maWx0ZXJTZWN0aW9uVGl0bGV9PkNsaWVudDwvZGl2PlxuICAgICAgICA8SW5wdXRHcm91cCBjbGFzc05hbWU9e3N0eWxlcy5pbnB1dEdyb3VwfT5cbiAgICAgICAgICA8SW5wdXRHcm91cC5UZXh0PkNsaWVudCBGcm9tPC9JbnB1dEdyb3VwLlRleHQ+XG4gICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgdmFyaWFudD1cIm91dGxpbmUtc2Vjb25kYXJ5XCJcbiAgICAgICAgICAgIGNsYXNzTmFtZT17YHctMTAwICR7c3R5bGVzLmlucHV0QnV0dG9ufWB9XG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVDbGllbnRDbGljayhcImZyb21cIil9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge2NsaWVudEZyb21CdXR0b25UZXh0fVxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICA8L0lucHV0R3JvdXA+XG5cbiAgICAgICAgPElucHV0R3JvdXAgY2xhc3NOYW1lPXtzdHlsZXMuaW5wdXRHcm91cH0+XG4gICAgICAgICAgPElucHV0R3JvdXAuVGV4dD5DbGllbnQgQ3VycmVudDwvSW5wdXRHcm91cC5UZXh0PlxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIHZhcmlhbnQ9XCJvdXRsaW5lLXNlY29uZGFyeVwiXG4gICAgICAgICAgICBjbGFzc05hbWU9e2B3LTEwMCAke3N0eWxlcy5pbnB1dEJ1dHRvbn1gfVxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlQ2xpZW50Q2xpY2soXCJjdXJyZW50XCIpfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtjbGllbnRDdXJyZW50QnV0dG9uVGV4dH1cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgPC9JbnB1dEdyb3VwPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuZmlsdGVyU2VjdGlvbn0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuZmlsdGVyU2VjdGlvblRpdGxlfT5XYXJlaG91c2U8L2Rpdj5cbiAgICAgICAgPElucHV0R3JvdXAgY2xhc3NOYW1lPXtzdHlsZXMuaW5wdXRHcm91cH0+XG4gICAgICAgICAgPElucHV0R3JvdXAuVGV4dD5RdWljazwvSW5wdXRHcm91cC5UZXh0PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuYnV0dG9uR3JvdXB9PlxuICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICB2YXJpYW50PVwib3V0bGluZS1zZWNvbmRhcnlcIlxuICAgICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5mbGV4QnV0dG9ufVxuICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVTb0NhbFdhcmVob3VzZUNsaWNrfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICBTb0NhbCBXYXJlaG91c2VcbiAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICB2YXJpYW50PVwib3V0bGluZS1zZWNvbmRhcnlcIlxuICAgICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5mbGV4QnV0dG9ufVxuICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVOb3JDYWxXYXJlaG91c2VDbGlja31cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgTm9yQ2FsIFdhcmVob3VzZVxuICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgIHZhcmlhbnQ9XCJvdXRsaW5lLXNlY29uZGFyeVwiXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17c3R5bGVzLmZsZXhCdXR0b259XG4gICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZVdhcmVob3VzZVVuYXNzaWduZWRDbGlja31cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgVW5hc3NpZ25lZFxuICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvSW5wdXRHcm91cD5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xuXG5cbiAgcmV0dXJuIChcbiAgICA8TG9nZ2VkSW4+XG4gICAgICB7KGlzRGVsZXRpbmcgfHwgaXNOYXZpZ2F0aW5nKSAmJiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubG9hZGluZ092ZXJsYXl9PlxuICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgIHNyYz1cIi9tYWdtby1sb2dvLnBuZ1wiXG4gICAgICAgICAgICBhbHQ9XCJMb2FkaW5nIE1hZ21vXCJcbiAgICAgICAgICAgIGNsYXNzTmFtZT17c3R5bGVzLmxvYWRpbmdMb2dvfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cbiAgICAgIDxNb2RhbCBzaG93PXtzaG93RGVsZXRlTW9kYWx9IG9uSGlkZT17aGFuZGxlQ2xvc2VEZWxldGVNb2RhbH0+XHJcbiAgICAgICAgPE1vZGFsLkhlYWRlciBjbG9zZUJ1dHRvbj5cclxuICAgICAgICAgIDxNb2RhbC5UaXRsZT5Db25maXJtIERlbGV0aW9uPC9Nb2RhbC5UaXRsZT5cclxuICAgICAgICA8L01vZGFsLkhlYWRlcj5cclxuICAgICAgICA8TW9kYWwuQm9keT5cclxuICAgICAgICAgIEFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUge3NlbGVjdGVkSXRlbXMubGVuZ3RofSBpdGVtXHJcbiAgICAgICAgICB7c2VsZWN0ZWRJdGVtcy5sZW5ndGggPiAxID8gXCJzXCIgOiBcIlwifT9cclxuICAgICAgICA8L01vZGFsLkJvZHk+XHJcbiAgICAgICAgPE1vZGFsLkZvb3Rlcj5cclxuICAgICAgICAgIDxCdXR0b24gdmFyaWFudD1cImRhbmdlclwiIG9uQ2xpY2s9e2hhbmRsZURlbGV0ZVNlbGVjdGVkfT5cclxuICAgICAgICAgICAgWWVzLCBkZWxldGVcclxuICAgICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICAgICAgPEJ1dHRvbiB2YXJpYW50PVwic2Vjb25kYXJ5XCIgb25DbGljaz17aGFuZGxlQ2xvc2VEZWxldGVNb2RhbH0+XHJcbiAgICAgICAgICAgIENhbmNlbFxyXG4gICAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgICAgPC9Nb2RhbC5Gb290ZXI+XHJcbiAgICAgIDwvTW9kYWw+XHJcblxyXG4gICAgICA8TW9kYWwgc2hvdz17c2hvd0NsaWVudE1vZGFsfSBvbkhpZGU9eygpID0+IHNldFNob3dDbGllbnRNb2RhbChmYWxzZSl9PlxyXG4gICAgICAgIDxNb2RhbC5IZWFkZXIgY2xvc2VCdXR0b24+XHJcbiAgICAgICAgICA8TW9kYWwuVGl0bGU+XHJcbiAgICAgICAgICAgIFNlbGVjdCB7Y2xpZW50U2VsZWN0aW9uVHlwZSA9PT0gXCJmcm9tXCIgPyBcIkNsaWVudCBGcm9tXCIgOiBcIkNsaWVudCBDdXJyZW50XCJ9XHJcbiAgICAgICAgICA8L01vZGFsLlRpdGxlPlxyXG4gICAgICAgIDwvTW9kYWwuSGVhZGVyPlxyXG4gICAgICAgIDxNb2RhbC5Cb2R5PlxyXG4gICAgICAgICAgPEZvcm1Db250cm9sXHJcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJTZWFyY2ggYnkgbmFtZVwiXHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1iLTNcIlxyXG4gICAgICAgICAgICB2YWx1ZT17Y2xpZW50U2VhcmNoVGVybX1cclxuICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRDbGllbnRTZWFyY2hUZXJtKGUudGFyZ2V0LnZhbHVlKX1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8Q2xpZW50VGFibGVcclxuICAgICAgICAgICAgY2xpZW50cz17KEFycmF5LmlzQXJyYXkoY2xpZW50cykgPyBjbGllbnRzIDogW10pLmZpbHRlcihcclxuICAgICAgICAgICAgICAoY2xpZW50KSA9PiAoY2xpZW50Py5uYW1lID8/IFwiXCIpLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoY2xpZW50U2VhcmNoVGVybS50b0xvd2VyQ2FzZSgpKVxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgICAgICBvblNlbGVjdENsaWVudD17aGFuZGxlQ2xpZW50U2VsZWN0fVxyXG4gICAgICAgICAgICBvbkluZm9DbGljaz17aGFuZGxlQ2xpZW50SW5mb31cclxuICAgICAgICAgICAgaXNDbGllbnRTZWFyY2g9e2ZhbHNlfVxyXG4gICAgICAgICAgICBjbGVhclNlbGVjdGlvbj17KCkgPT4gaGFuZGxlQ2xpZW50U2VsZWN0KG51bGwpfVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICA8L01vZGFsLkJvZHk+XHJcbiAgICAgIDwvTW9kYWw+XHJcblxyXG4gICAgICA8TW9kYWwgc2hvdz17c2hvd01vZGVsTW9kYWx9IG9uSGlkZT17KCkgPT4gc2V0U2hvd01vZGVsTW9kYWwoZmFsc2UpfT5cclxuICAgICAgICA8TW9kYWwuSGVhZGVyIGNsb3NlQnV0dG9uPlxyXG4gICAgICAgICAgPE1vZGFsLlRpdGxlPlNlbGVjdCBNb2RlbDwvTW9kYWwuVGl0bGU+XHJcbiAgICAgICAgPC9Nb2RhbC5IZWFkZXI+XHJcbiAgICAgICAgPE1vZGFsLkJvZHk+XHJcbiAgICAgICAgICA8Rm9ybUNvbnRyb2xcclxuICAgICAgICAgICAgdHlwZT1cInRleHRcIlxyXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlNlYXJjaCBieSBuYW1lXCJcclxuICAgICAgICAgICAgY2xhc3NOYW1lPVwibWItM1wiXHJcbiAgICAgICAgICAgIHZhbHVlPXttb2RlbFNlYXJjaFRlcm19XHJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0TW9kZWxTZWFyY2hUZXJtKGUudGFyZ2V0LnZhbHVlKX1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8TW9kZWxUYWJsZVxyXG4gICAgICAgICAgICBtb2RlbHM9e21vZGVscy5maWx0ZXIoKG1vZGVsKSA9PlxyXG4gICAgICAgICAgICAgIHR5cGVvZiBtb2RlbCA9PT0gXCJzdHJpbmdcIlxyXG4gICAgICAgICAgICAgICAgPyBtb2RlbC50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKG1vZGVsU2VhcmNoVGVybS50b0xvd2VyQ2FzZSgpKVxyXG4gICAgICAgICAgICAgICAgOiBmYWxzZVxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgICAgICBvblNlbGVjdE1vZGVsPXtoYW5kbGVNb2RlbFNlbGVjdH1cclxuICAgICAgICAgICAgY2xlYXJTZWxlY3Rpb249eygpID0+IGhhbmRsZU1vZGVsU2VsZWN0KG51bGwpfVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICA8L01vZGFsLkJvZHk+XHJcbiAgICAgIDwvTW9kYWw+XHJcblxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnBhZ2V9PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnBhZ2VJbm5lcn0+XG4gICAgICAgICAgPGhlYWRlciBjbGFzc05hbWU9e3N0eWxlcy5oZWFkZXJ9PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5oZWFkZXJMZWZ0fT5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17c3R5bGVzLmJ1cmdlcn1cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTaG93RmlsdGVycyh0cnVlKX1cbiAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPVwiT3BlbiBmaWx0ZXJzXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxzcGFuPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3Bhbj48L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4+PC9zcGFuPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5icmFuZH0+XG4gICAgICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICAgICAgc3JjPVwiL21hZ21vLWxvZ28ucG5nXCJcbiAgICAgICAgICAgICAgICAgIGFsdD1cIk1hZ21vXCJcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17c3R5bGVzLmJyYW5kTG9nb31cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmJyYW5kTmFtZX0+TWFnbW88L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuYnJhbmRTdWJ9PkludmVudG9yeSBTZWFyY2g8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuaGVhZGVyUmlnaHR9PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmhlYWRlclN0YXR1c30+XG4gICAgICAgICAgICAgICAge2hhc0FjdGl2ZUZpbHRlcnMgPyBcIkZpbHRlcnMgYWN0aXZlXCIgOiBcIkFsbCBpdGVtc1wifVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvaGVhZGVyPlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5jb250ZW50fT5cbiAgICAgICAgICAgIDxhc2lkZSBjbGFzc05hbWU9e3N0eWxlcy5zaWRlYmFyfT57cmVuZGVyRmlsdGVycyhcInNpZGViYXJcIil9PC9hc2lkZT5cbiAgICAgICAgICAgIDxtYWluIGNsYXNzTmFtZT17c3R5bGVzLm1haW59PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnRhYmxlQ2FyZH0+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy50YWJsZUhlYWRlcn0+XG4gICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnRhYmxlVGl0bGV9Pkl0ZW1zPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMudGFibGVTdWJ0aXRsZX0+XG4gICAgICAgICAgICAgICAgICAgICAge2lzTG9hZGluZyA/IFwiTG9hZGluZyBpdGVtc1wiIDogYCR7aW5mby5sZW5ndGh9IGl0ZW1zIG9uIHRoaXMgcGFnZWB9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnRhYmxlTWV0YX0+XG4gICAgICAgICAgICAgICAgICAgIFBhZ2Uge3BhZ2V9IHtoYXNOZXh0UGFnZSA/IGBvZiAke3RvdGFsS25vd25QYWdlc30rYCA6IGBvZiAke3RvdGFsS25vd25QYWdlc31gfVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnRhYmxlQm9keX0gcmVmPXt0YWJsZUJvZHlSZWZ9PlxuICAgICAgICAgICAgICAgICAge2lzTG9hZGluZyA/IChcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5sb2FkaW5nU3RhdGV9PlxuICAgICAgICAgICAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgICAgICAgICAgIHNyYz1cIi9tYWdtby1sb2dvLnBuZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICBhbHQ9XCJMb2FkaW5nIE1hZ21vXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17c3R5bGVzLmxvYWRpbmdMb2dvfVxuICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5sb2FkaW5nVGV4dH0+TG9hZGluZzwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICkgOiBsb2FkRXJyb3IgPyAoXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuZXJyb3JTdGF0ZX0+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5lcnJvclRpdGxlfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIExvYWQgZmFpbGVkICh7bG9hZEVycm9yLmNvZGV9KVxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuZXJyb3JNZXNzYWdlfT57bG9hZEVycm9yLm1lc3NhZ2V9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFudD1cIm91dGxpbmUtc2Vjb25kYXJ5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpemU9XCJzbVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJlc2V0UGFnaW5hdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRRdWVyeUVwb2NoKCh2KSA9PiB2ICsgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIFJldHJ5XG4gICAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICAgPFBhcnRUYWJsZVxuICAgICAgICAgICAgICAgICAgICAgIGluZm89e2luZm99XG4gICAgICAgICAgICAgICAgICAgICAgbGFiZWxzPXtsYWJlbHN9XG4gICAgICAgICAgICAgICAgICAgICAgaWRzPXtpZHN9XG4gICAgICAgICAgICAgICAgICAgICAgaG92ZXJTdHlsZT17aG92ZXJTdHlsZX1cbiAgICAgICAgICAgICAgICAgICAgICBzb3J0Q2hlY2tBbGw9e3NvcnRDaGVja0FsbH1cbiAgICAgICAgICAgICAgICAgICAgICBjaGVja0RlbGV0ZT17Y2hlY2tEZWxldGV9XG4gICAgICAgICAgICAgICAgICAgICAgaXNEZWxldGluZz17aXNEZWxldGluZ31cbiAgICAgICAgICAgICAgICAgICAgICByb3dTZWxlY3Q9e3Jvd1NlbGVjdH1cbiAgICAgICAgICAgICAgICAgICAgICBzZXRIb3ZlckluZGV4PXtzZXRIb3ZlckluZGV4fVxuICAgICAgICAgICAgICAgICAgICAgIGhvdmVySW5kZXg9e2hvdmVySW5kZXh9XG4gICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRJdGVtcz17c2VsZWN0ZWRJdGVtc31cbiAgICAgICAgICAgICAgICAgICAgICBzZXRTZWxlY3RlZEl0ZW1zPXtzZXRTZWxlY3RlZEl0ZW1zfVxuICAgICAgICAgICAgICAgICAgICAgIG1pblJvd3M9e3BhZ2VTaXplfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMudGFibGVGb290ZXJ9PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5wYWdpbmF0aW9uUm93fT5cbiAgICAgICAgICAgICAgICAgICAgPFBhZ2luYXRpb24gc2l6ZT1cInNtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPFBhZ2luYXRpb24uUHJldlxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0UGFnZSgocCkgPT4gTWF0aC5tYXgoMSwgcCAtIDEpKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtwYWdlIDw9IDF9XG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgUHJldmlvdXNcbiAgICAgICAgICAgICAgICAgICAgICA8L1BhZ2luYXRpb24uUHJldj5cbiAgICAgICAgICAgICAgICAgICAgICB7cGFnZUJ1dHRvbnN9XG4gICAgICAgICAgICAgICAgICAgICAgPFBhZ2luYXRpb24uTmV4dFxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0UGFnZSgocCkgPT4gcCArIDEpfVxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFoYXNOZXh0UGFnZX1cbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICBOZXh0XG4gICAgICAgICAgICAgICAgICAgICAgPC9QYWdpbmF0aW9uLk5leHQ+XG4gICAgICAgICAgICAgICAgICAgIDwvUGFnaW5hdGlvbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPEZvcm0gY2xhc3NOYW1lPXtzdHlsZXMuc2VhcmNoUm93fT5cbiAgICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sXG4gICAgICAgICAgICAgICAgICAgICAgdHlwZT17c2hvd0xpc3RTZWFyY2h9XG4gICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJTZWFyY2hcIlxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17c3R5bGVzLnNlYXJjaElucHV0fVxuICAgICAgICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJTZWFyY2hcIlxuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtzZWFyY2h9XG4gICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3NlYXJjaENoYW5nZUhhbmRsZXJ9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDxOYXZEcm9wZG93blxuICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPXtzZWxlY3R9XG4gICAgICAgICAgICAgICAgICAgICAgaWQ9XCJjb2xsYXNpYmxlLW5hdi1kcm9wZG93blwiXG4gICAgICAgICAgICAgICAgICAgICAgc2hvdz17c2hvd0xpc3R9XG4gICAgICAgICAgICAgICAgICAgICAgb25Nb3VzZUVudGVyPXsoKSA9PiBzZXRTaG93TGlzdCh0cnVlKX1cbiAgICAgICAgICAgICAgICAgICAgICBvbk1vdXNlTGVhdmU9eygpID0+IHNldFNob3dMaXN0KGZhbHNlKX1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5zZWFyY2hTZWxlY3R9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICA8TmF2RHJvcGRvd24uSXRlbVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTZWxlY3QoXCJOYW1lXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTaG93TGlzdFNlYXJjaChcInRleHRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIE5hbWVcbiAgICAgICAgICAgICAgICAgICAgICA8L05hdkRyb3Bkb3duLkl0ZW0+XG4gICAgICAgICAgICAgICAgICAgICAgPE5hdkRyb3Bkb3duLkl0ZW1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2VsZWN0KFwiRGF0ZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2hvd0xpc3RTZWFyY2goXCJkYXRlXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICBEYXRlXG4gICAgICAgICAgICAgICAgICAgICAgPC9OYXZEcm9wZG93bi5JdGVtPlxuICAgICAgICAgICAgICAgICAgICAgIDxOYXZEcm9wZG93bi5JdGVtXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNlbGVjdChcIldvcmsgT3JkZXJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNob3dMaXN0U2VhcmNoKFwidGV4dFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgV29yayBPcmRlclxuICAgICAgICAgICAgICAgICAgICAgIDwvTmF2RHJvcGRvd24uSXRlbT5cbiAgICAgICAgICAgICAgICAgICAgICA8TmF2RHJvcGRvd24uSXRlbVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTZWxlY3QoXCJQcm9kdWN0IE51bWJlclwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2hvd0xpc3RTZWFyY2goXCJ0ZXh0XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICBQcm9kdWN0IE51bWJlclxuICAgICAgICAgICAgICAgICAgICAgIDwvTmF2RHJvcGRvd24uSXRlbT5cbiAgICAgICAgICAgICAgICAgICAgICA8TmF2RHJvcGRvd24uSXRlbVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTZWxlY3QoXCJTZXJpYWwgTnVtYmVyXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTaG93TGlzdFNlYXJjaChcInRleHRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIFNlcmlhbCBOdW1iZXJcbiAgICAgICAgICAgICAgICAgICAgICA8L05hdkRyb3Bkb3duLkl0ZW0+XG4gICAgICAgICAgICAgICAgICAgICAgPE5hdkRyb3Bkb3duLkl0ZW1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2VsZWN0KFwiRGVzY3JpcHRpb25cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNob3dMaXN0U2VhcmNoKFwidGV4dFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgRGVzY3JpcHRpb25cbiAgICAgICAgICAgICAgICAgICAgICA8L05hdkRyb3Bkb3duLkl0ZW0+XG4gICAgICAgICAgICAgICAgICAgICAgPE5hdkRyb3Bkb3duLkl0ZW1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2VsZWN0KFwiU0tVXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTaG93TGlzdFNlYXJjaChcInRleHRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIFNLVVxuICAgICAgICAgICAgICAgICAgICAgIDwvTmF2RHJvcGRvd24uSXRlbT5cbiAgICAgICAgICAgICAgICAgICAgPC9OYXZEcm9wZG93bj5cbiAgICAgICAgICAgICAgICAgIDwvRm9ybT5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuZm9vdGVyQWN0aW9uc30+XG4gICAgICAgICAgICAgICAgICAgIDxMb2FkaW5nQnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInNlY29uZGFyeVwiXG4gICAgICAgICAgICAgICAgICAgICAgbmFtZT1cIkFkZCBOZXcgSXRlbVwiXG4gICAgICAgICAgICAgICAgICAgICAgcm91dGU9XCJOZXdTZWFyY2gvQWRkSXRlbS9OZXdJdGVtXCJcbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5hY3Rpb25CdXR0b259XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgICB2YXJpYW50PVwiaW5mb1wiXG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgJHtzdHlsZXMuYWN0aW9uQnV0dG9ufSAke3N0eWxlcy5tYXBBY3Rpb25CdXR0b259YH1cbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtvcGVuTWFwfVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgTWFwXG4gICAgICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8TG9hZGluZ0J1dHRvblxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJwcmltYXJ5XCJcbiAgICAgICAgICAgICAgICAgICAgICBuYW1lPVwiQmFja1wiXG4gICAgICAgICAgICAgICAgICAgICAgcm91dGU9XCJXYXJlaG91c2VkYi9XYXJlaG91c2VTZWxlY3RcIlxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17c3R5bGVzLmFjdGlvbkJ1dHRvbn1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvbWFpbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPE9mZmNhbnZhc1xuICAgICAgICAgIHNob3c9e3Nob3dGaWx0ZXJzfVxuICAgICAgICAgIG9uSGlkZT17KCkgPT4gc2V0U2hvd0ZpbHRlcnMoZmFsc2UpfVxuICAgICAgICAgIHBsYWNlbWVudD1cInN0YXJ0XCJcbiAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5maWx0ZXJzRHJhd2VyfVxuICAgICAgICAgIHNjcm9sbFxuICAgICAgICAgIGJhY2tkcm9wXG4gICAgICAgID5cbiAgICAgICAgICA8T2ZmY2FudmFzLkhlYWRlciBjbG9zZUJ1dHRvbj5cbiAgICAgICAgICAgIDxPZmZjYW52YXMuVGl0bGU+RmlsdGVyczwvT2ZmY2FudmFzLlRpdGxlPlxuICAgICAgICAgIDwvT2ZmY2FudmFzLkhlYWRlcj5cbiAgICAgICAgICA8T2ZmY2FudmFzLkJvZHk+e3JlbmRlckZpbHRlcnMoXCJkcmF3ZXJcIil9PC9PZmZjYW52YXMuQm9keT5cbiAgICAgICAgPC9PZmZjYW52YXM+XG5cbiAgICAgICAgPE1vZGFsXG4gICAgICAgICAgc2hvdz17c2hvd01hcH1cbiAgICAgICAgICBvbkhpZGU9eygpID0+IHNldFNob3dNYXAoZmFsc2UpfVxuICAgICAgICAgIGNlbnRlcmVkXG4gICAgICAgICAgc2l6ZT1cImxnXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxNb2RhbC5IZWFkZXIgY2xvc2VCdXR0b24+XG4gICAgICAgICAgICA8TW9kYWwuVGl0bGU+V2FyZWhvdXNlIE1hcDwvTW9kYWwuVGl0bGU+XG4gICAgICAgICAgPC9Nb2RhbC5IZWFkZXI+XG4gICAgICAgICAgPE1vZGFsLkJvZHk+XG4gICAgICAgICAgICB7bWFwTG9hZGluZyAmJiAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubWFwTG9hZGluZ30+XG4gICAgICAgICAgICAgICAgPFNwaW5uZXIgYW5pbWF0aW9uPVwiYm9yZGVyXCIgLz5cbiAgICAgICAgICAgICAgICA8c3Bhbj5Mb2FkaW5nIG1hcCBkYXRh4oCmPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICB7bWFwRXJyb3IgJiYgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5tYXBFcnJvcn0+e21hcEVycm9yfTwvZGl2Pn1cblxuICAgICAgICAgICAgeyFtYXBMb2FkaW5nICYmIG1hcFN0ZXAgPT09IFwicmVnaW9uc1wiICYmIChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5tYXBTdGFnZX0+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5tYXBIaW50fT5TZWxlY3QgYSByZWdpb248L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLm1hcENhbnZhc30+XG4gICAgICAgICAgICAgICAgICB7TUFQX1JFR0lPTl9PUkRFUi5tYXAoKHJlZ2lvbklkKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICBrZXk9e3JlZ2lvbklkfVxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YCR7c3R5bGVzLnJlZ2lvbkJsb2NrfSAke3N0eWxlc1tgcmVnaW9uJHtyZWdpb25JZH1gXX1gfVxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZU1hcFNlbGVjdFJlZ2lvbihyZWdpb25JZCl9XG4gICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e1xuICAgICAgICAgICAgICAgICAgICAgICAgQXJyYXkuaXNBcnJheShtYXBSZWdpb25PcHRpb25zKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgbWFwUmVnaW9uT3B0aW9ucy5sZW5ndGggPiAwICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAhbWFwUmVnaW9uT3B0aW9ucy5pbmNsdWRlcyhyZWdpb25JZClcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICB7cmVnaW9uSWR9XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgeyFtYXBMb2FkaW5nICYmIG1hcFN0ZXAgPT09IFwiZ3JpZFwiICYmIChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5tYXBTdGFnZX0+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5tYXBIaW50fT5cbiAgICAgICAgICAgICAgICAgIFJlZ2lvbiB7bWFwUmVnaW9ufTogY2hvb3NlIGEgcm93IGFuZCBjb2x1bW5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICB7KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGRpbXMgPSBnZXRNYXBSZWdpb25EaW1lbnNpb25zKG1hcFJlZ2lvbik7XG4gICAgICAgICAgICAgICAgICBjb25zdCByb3dzID0gbWFwTGV0dGVycy5zbGljZSgwLCBkaW1zLnJvd3MgfHwgMCk7XG4gICAgICAgICAgICAgICAgICBjb25zdCBjb2xzID0gbWFwTnVtYmVycy5zbGljZSgwLCBkaW1zLmNvbHMgfHwgMCk7XG4gICAgICAgICAgICAgICAgICBpZiAoIXJvd3MubGVuZ3RoIHx8ICFjb2xzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubWFwRW1wdHl9PlxuICAgICAgICAgICAgICAgICAgICAgICAgTm8gZ3JpZCBkYXRhIGZvciB0aGlzIHJlZ2lvbi5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuZ3JpZFdyYXBwZXJ9PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17c3R5bGVzLmdyaWR9XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyBcIi0tZ3JpZC1jb2xzXCI6IGNvbHMubGVuZ3RoIH19XG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAge3Jvd3MubWFwKChyb3cpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHMubWFwKChjb2wpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjZWxsS2V5ID0gYCR7cm93fS0ke2NvbH1gO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGhhc1BhbGxldHMgPSBCb29sZWFuKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwQ2VsbFBhbGxldHNbY2VsbEtleV0/Lmxlbmd0aFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtjZWxsS2V5fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgJHtzdHlsZXMuZ3JpZENlbGx9ICR7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzUGFsbGV0cyA/IFwiXCIgOiBzdHlsZXMuZ3JpZENlbGxEaXNhYmxlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNQYWxsZXRzICYmIGhhbmRsZU1hcFNlbGVjdENlbGwocm93LCBjb2wpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFoYXNQYWxsZXRzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cm93fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtjb2x9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSkoKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApfVxuXG4gICAgICAgICAgICB7IW1hcExvYWRpbmcgJiYgbWFwU3RlcCA9PT0gXCJwYWxsZXRzXCIgJiYgKFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLm1hcFN0YWdlfT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLm1hcEhpbnR9PlxuICAgICAgICAgICAgICAgICAgUmVnaW9uIHttYXBSZWdpb259IMK3IFNlY3Rpb24ge21hcFJvd31cbiAgICAgICAgICAgICAgICAgIHttYXBDb2x9OiBzZWxlY3QgYSBwYWxsZXRcbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnBhbGxldEdyaWR9PlxuICAgICAgICAgICAgICAgICAgeyhtYXBDZWxsUGFsbGV0c1tgJHttYXBSb3d9LSR7bWFwQ29sfWBdIHx8IFtdKS5tYXAoXG4gICAgICAgICAgICAgICAgICAgIChwYWxsZXQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwYWxsZXRLZXkgPSBgJHttYXBSb3d9LSR7bWFwQ29sfS1QJHtwYWxsZXR9YDtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBiaW5zID0gbWFwUGFsbGV0Qmluc1twYWxsZXRLZXldIHx8IFtdO1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17cGFsbGV0fVxuICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMucGFsbGV0QnV0dG9ufVxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJpbnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVNYXBWaWV3KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVnaW9uOiBtYXBSZWdpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlY3Rpb25MZXR0ZXI6IG1hcFJvdyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VjdGlvbk51bWJlcjogbWFwQ29sLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWxsZXQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJpbjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2hvd01hcChmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZU1hcFNlbGVjdFBhbGxldChwYWxsZXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICBQYWxsZXQge3BhbGxldH1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICB7IShtYXBDZWxsUGFsbGV0c1tgJHttYXBSb3d9LSR7bWFwQ29sfWBdIHx8IFtdKS5sZW5ndGggJiYgKFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLm1hcEVtcHR5fT5cbiAgICAgICAgICAgICAgICAgICAgICBObyBwYWxsZXRzIGF2YWlsYWJsZSBoZXJlLlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgeyFtYXBMb2FkaW5nICYmIG1hcFN0ZXAgPT09IFwiYmluc1wiICYmIChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5tYXBTdGFnZX0+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5tYXBIaW50fT5cbiAgICAgICAgICAgICAgICAgIFJlZ2lvbiB7bWFwUmVnaW9ufSDCtyBTZWN0aW9uIHttYXBSb3d9XG4gICAgICAgICAgICAgICAgICB7bWFwQ29sfSDCtyBQYWxsZXQge21hcFBhbGxldH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnBhbGxldEdyaWR9PlxuICAgICAgICAgICAgICAgICAgeyhtYXBQYWxsZXRCaW5zW2Ake21hcFJvd30tJHttYXBDb2x9LVAke21hcFBhbGxldH1gXSB8fCBbXSkubWFwKFxuICAgICAgICAgICAgICAgICAgICAoYmluKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtiaW59XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YCR7c3R5bGVzLnBhbGxldEJ1dHRvbn0gJHtzdHlsZXMuYmluQnV0dG9ufWB9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVNYXBWaWV3KHsgYmluIH0pfVxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIEJpbiB7YmlufVxuICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgeyEobWFwUGFsbGV0Qmluc1tgJHttYXBSb3d9LSR7bWFwQ29sfS1QJHttYXBQYWxsZXR9YF0gfHwgW10pXG4gICAgICAgICAgICAgICAgICAgIC5sZW5ndGggJiYgKFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLm1hcEVtcHR5fT5cbiAgICAgICAgICAgICAgICAgICAgICBObyBiaW5zIGF2YWlsYWJsZSBvbiB0aGlzIHBhbGxldC5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9Nb2RhbC5Cb2R5PlxuICAgICAgICAgIDxNb2RhbC5Gb290ZXIgY2xhc3NOYW1lPXtzdHlsZXMubWFwRm9vdGVyfT5cbiAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgdmFyaWFudD1cIm91dGxpbmUtc2Vjb25kYXJ5XCJcbiAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlTWFwQmFja31cbiAgICAgICAgICAgICAgZGlzYWJsZWQ9e21hcFN0ZXAgPT09IFwicmVnaW9uc1wifVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICBCYWNrXG4gICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgdmFyaWFudD1cIm91dGxpbmUtcHJpbWFyeVwiXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZU1hcFZpZXcoKX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgVmlld1xuICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICA8QnV0dG9uIHZhcmlhbnQ9XCJzZWNvbmRhcnlcIiBvbkNsaWNrPXsoKSA9PiBzZXRTaG93TWFwKGZhbHNlKX0+XG4gICAgICAgICAgICAgIENsb3NlXG4gICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICA8L01vZGFsLkZvb3Rlcj5cbiAgICAgICAgPC9Nb2RhbD5cbiAgICAgIDwvZGl2PlxuICAgIDwvTG9nZ2VkSW4+XG4gICk7XG5cclxuXHJcbn1cclxuXHJcbiJdLCJzb3VyY2VSb290IjoiIn0=