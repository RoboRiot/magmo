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
      lineNumber: 60,
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
      lineNumber: 61,
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

  var _useState33 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(""),
      mapBin = _useState33[0],
      setMapBin = _useState33[1];

  var _useState34 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])({}),
      mapCellPallets = _useState34[0],
      setMapCellPallets = _useState34[1];

  var _useState35 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])({}),
      mapPalletBins = _useState35[0],
      setMapPalletBins = _useState35[1];

  var _useState36 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(false),
      mapLoading = _useState36[0],
      setMapLoading = _useState36[1];

  var _useState37 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(""),
      mapError = _useState37[0],
      setMapError = _useState37[1];

  var _useState38 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(false),
      mapDirectoryLoaded = _useState38[0],
      setMapDirectoryLoaded = _useState38[1];

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

  var _useState39 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(labelBase),
      labels = _useState39[0],
      setLabels = _useState39[1];

  var _useState40 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(sortCheckBase),
      sortCheck = _useState40[0],
      setSortCheck = _useState40[1];

  var _useState41 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(null),
      hoverIndex = _useState41[0],
      setHoverIndex = _useState41[1];

  var _useState42 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(null),
      selectedModel = _useState42[0],
      setSelectedModel = _useState42[1];

  var _useState43 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(null),
      gPos = _useState43[0],
      setGPos = _useState43[1];

  var _useState44 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(null),
      gIde = _useState44[0],
      setGIde = _useState44[1];

  var _useState45 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(false),
      isDeleting = _useState45[0],
      setIsDeleting = _useState45[1];

  var _useState46 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(1),
      page = _useState46[0],
      setPage = _useState46[1];

  var _useState47 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])([]),
      pageCursors = _useState47[0],
      setPageCursors = _useState47[1];

  var _useState48 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(false),
      hasNextPage = _useState48[0],
      setHasNextPage = _useState48[1];

  var fetchSeq = Object(react__WEBPACK_IMPORTED_MODULE_5__["useRef"])(0);
  var backfillInFlight = Object(react__WEBPACK_IMPORTED_MODULE_5__["useRef"])(false);

  var _useState49 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(0),
      queryEpoch = _useState49[0],
      setQueryEpoch = _useState49[1];

  var _useState50 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(null),
      loadError = _useState50[0],
      setLoadError = _useState50[1];

  var tableBodyRef = Object(react__WEBPACK_IMPORTED_MODULE_5__["useRef"])(null);
  var rowHeightRef = Object(react__WEBPACK_IMPORTED_MODULE_5__["useRef"])(46);
  var headerHeightRef = Object(react__WEBPACK_IMPORTED_MODULE_5__["useRef"])(38);
  var LOAD_TIMEOUT_MS = 30000;
  var mapLetters = Object(react__WEBPACK_IMPORTED_MODULE_5__["useMemo"])(function () {
    return Array.from({
      length: 26
    }, function (_, i) {
      return String.fromCharCode(65 + i);
    });
  }, []);
  var mapNumbers = Object(react__WEBPACK_IMPORTED_MODULE_5__["useMemo"])(function () {
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
    setMapBin("");
    setMapStep("grid");
    loadMapInventory(regionId);
  };

  var handleMapSelectCell = function handleMapSelectCell(rowLetter, colNumber) {
    setMapRow(rowLetter);
    setMapCol(colNumber);
    setMapPallet("");
    setMapBin("");
    setMapStep("pallets");
  };

  var handleMapSelectPallet = function handleMapSelectPallet(palletId) {
    setMapPallet(palletId);
    setMapBin("");
    setMapStep("bins");
  };

  var handleMapSelectBin = function handleMapSelectBin(binId) {
    setMapBin(binId);
  };

  var handleMapBack = function handleMapBack() {
    if (mapStep === "bins") {
      setMapBin("");
      setMapStep("pallets");
    } else if (mapStep === "pallets") setMapStep("grid");else if (mapStep === "grid") setMapStep("regions");
  };

  var handleMapView = function handleMapView() {
    var _overrides$region, _overrides$sectionLet, _overrides$sectionNum, _overrides$pallet, _ref12, _overrides$bin;

    var overrides = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var params = new URLSearchParams();
    var regionValue = (_overrides$region = overrides.region) !== null && _overrides$region !== void 0 ? _overrides$region : mapRegion;
    var letterValue = (_overrides$sectionLet = overrides.sectionLetter) !== null && _overrides$sectionLet !== void 0 ? _overrides$sectionLet : mapRow;
    var numberValue = (_overrides$sectionNum = overrides.sectionNumber) !== null && _overrides$sectionNum !== void 0 ? _overrides$sectionNum : mapCol;
    var palletValue = (_overrides$pallet = overrides.pallet) !== null && _overrides$pallet !== void 0 ? _overrides$pallet : mapPallet;
    var binValue = (_ref12 = (_overrides$bin = overrides.bin) !== null && _overrides$bin !== void 0 ? _overrides$bin : mapBin) !== null && _ref12 !== void 0 ? _ref12 : "";
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
                var _ref20 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__["default"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee11() {
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
                  return _ref20.apply(this, arguments);
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
                var _ref21, _ref22, _item$clientFromId, _item$ClientFrom, _ref23, _ref24, _item$clientCurrentId, _item$ClientCurrent;

                return _objectSpread(_objectSpread({}, item), {}, {
                  clientFromId: (_ref21 = (_ref22 = (_item$clientFromId = item === null || item === void 0 ? void 0 : item.clientFromId) !== null && _item$clientFromId !== void 0 ? _item$clientFromId : typeof (item === null || item === void 0 ? void 0 : item.ClientFrom) === "string" ? item.ClientFrom : null) !== null && _ref22 !== void 0 ? _ref22 : item === null || item === void 0 ? void 0 : (_item$ClientFrom = item.ClientFrom) === null || _item$ClientFrom === void 0 ? void 0 : _item$ClientFrom.id) !== null && _ref21 !== void 0 ? _ref21 : null,
                  clientCurrentId: (_ref23 = (_ref24 = (_item$clientCurrentId = item === null || item === void 0 ? void 0 : item.clientCurrentId) !== null && _item$clientCurrentId !== void 0 ? _item$clientCurrentId : typeof (item === null || item === void 0 ? void 0 : item.ClientCurrent) === "string" ? item.ClientCurrent : null) !== null && _ref24 !== void 0 ? _ref24 : item === null || item === void 0 ? void 0 : (_item$ClientCurrent = item.ClientCurrent) === null || _item$ClientCurrent === void 0 ? void 0 : _item$ClientCurrent.id) !== null && _ref23 !== void 0 ? _ref23 : null
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

  var _useState51 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])([]),
      selectedItems = _useState51[0],
      setSelectedItems = _useState51[1];

  var _useState52 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(false),
      showDeleteModal = _useState52[0],
      setShowDeleteModal = _useState52[1];

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
    var _ref14 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__["default"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee5() {
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
      return _ref14.apply(this, arguments);
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

  var _useState53 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])("Select Option"),
      dropdown1Text = _useState53[0],
      setDropdown1Text = _useState53[1];

  var _useState54 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])("Select Option"),
      dropdown2Text = _useState54[0],
      setDropdown2Text = _useState54[1];

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
    var _ref15 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__["default"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee6() {
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
      return _ref15.apply(this, arguments);
    };
  }(); // When a client is selected in the modal, we now assume the parameter is a client ID.
  // If the passed value is null, we clear the selection.


  var handleClientSelect = /*#__PURE__*/function () {
    var _ref16 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__["default"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee7(clientId) {
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
      return _ref16.apply(this, arguments);
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


  var _useState55 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])([]),
      models = _useState55[0],
      setModels = _useState55[1];

  var _useState56 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(false),
      showModelModal = _useState56[0],
      setShowModelModal = _useState56[1];

  var _useState57 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])("Select Option"),
      modelButtonText = _useState57[0],
      setModelButtonText = _useState57[1];

  var handleModelClick = /*#__PURE__*/function () {
    var _ref17 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__["default"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee8() {
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
      return _ref17.apply(this, arguments);
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

  var _useState58 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(""),
      clientSearchTerm = _useState58[0],
      setClientSearchTerm = _useState58[1];

  var _useState59 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(""),
      modelSearchTerm = _useState59[0],
      setModelSearchTerm = _useState59[1];

  var deleteFromStorage = /*#__PURE__*/function () {
    var _ref18 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__["default"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee9(itemId) {
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
      return _ref18.apply(this, arguments);
    };
  }();

  var deleteFromPartsCollection = /*#__PURE__*/function () {
    var _ref19 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__["default"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee10(itemId) {
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
      return _ref19.apply(this, arguments);
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
          lineNumber: 1221,
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
          lineNumber: 1231,
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
        lineNumber: 1317,
        columnNumber: 5
      }
    }, __jsx("div", {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.filtersHeader,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1318,
        columnNumber: 7
      }
    }, __jsx("div", {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1319,
        columnNumber: 9
      }
    }, __jsx("div", {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.filtersTitle,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1320,
        columnNumber: 11
      }
    }, "Filters"), __jsx("div", {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.filtersSubtitle,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1321,
        columnNumber: 11
      }
    }, "Narrow results by machine, client, or warehouse.")), hasActiveFilters ? __jsx("span", {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.filtersBadge,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1326,
        columnNumber: 11
      }
    }, "Active") : null), __jsx("div", {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.filterSection,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1330,
        columnNumber: 7
      }
    }, __jsx("div", {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.filterSectionTitle,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1331,
        columnNumber: 9
      }
    }, "Machine"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["InputGroup"], {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.inputGroup,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1332,
        columnNumber: 9
      }
    }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["InputGroup"].Text, {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1333,
        columnNumber: 11
      }
    }, "OEM"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Dropdown"], {
      onSelect: handleSelect1,
      className: "w-100",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1334,
        columnNumber: 11
      }
    }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Dropdown"].Toggle, {
      variant: "outline-secondary",
      id: "".concat(idPrefix, "-oem"),
      className: "w-100 ".concat(_styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.inputButton),
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1335,
        columnNumber: 13
      }
    }, dropdown1Text), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Dropdown"].Menu, {
      className: "w-100",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1342,
        columnNumber: 13
      }
    }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Dropdown"].Item, {
      eventKey: "unassigned",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1343,
        columnNumber: 15
      }
    }, "Select Option"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Dropdown"].Item, {
      eventKey: "GE",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1344,
        columnNumber: 15
      }
    }, "GE"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Dropdown"].Item, {
      eventKey: "Toshiba",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1345,
        columnNumber: 15
      }
    }, "Toshiba"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Dropdown"].Item, {
      eventKey: "Siemens",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1346,
        columnNumber: 15
      }
    }, "Siemens"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Dropdown"].Item, {
      eventKey: "Philips",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1347,
        columnNumber: 15
      }
    }, "Philips")))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["InputGroup"], {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.inputGroup,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1352,
        columnNumber: 9
      }
    }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["InputGroup"].Text, {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1353,
        columnNumber: 11
      }
    }, "Modality"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Dropdown"], {
      onSelect: handleSelect2,
      className: "w-100",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1354,
        columnNumber: 11
      }
    }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Dropdown"].Toggle, {
      variant: "outline-secondary",
      id: "".concat(idPrefix, "-modality"),
      className: "w-100 ".concat(_styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.inputButton),
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1355,
        columnNumber: 13
      }
    }, dropdown2Text), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Dropdown"].Menu, {
      className: "w-100",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1362,
        columnNumber: 13
      }
    }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Dropdown"].Item, {
      eventKey: "unassigned",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1363,
        columnNumber: 15
      }
    }, "Select Option"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Dropdown"].Item, {
      eventKey: "CT",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1364,
        columnNumber: 15
      }
    }, "CT"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Dropdown"].Item, {
      eventKey: "MRI",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1365,
        columnNumber: 15
      }
    }, "MRI")))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["InputGroup"], {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.inputGroup,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1370,
        columnNumber: 9
      }
    }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["InputGroup"].Text, {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1371,
        columnNumber: 11
      }
    }, "Model"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Button"], {
      variant: "outline-secondary",
      className: "w-100 ".concat(_styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.inputButton),
      onClick: handleModelClick,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1372,
        columnNumber: 11
      }
    }, modelButtonText))), __jsx("div", {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.filterSection,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1382,
        columnNumber: 7
      }
    }, __jsx("div", {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.filterSectionTitle,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1383,
        columnNumber: 9
      }
    }, "Client"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["InputGroup"], {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.inputGroup,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1384,
        columnNumber: 9
      }
    }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["InputGroup"].Text, {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1385,
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
        lineNumber: 1386,
        columnNumber: 11
      }
    }, clientFromButtonText)), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["InputGroup"], {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.inputGroup,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1395,
        columnNumber: 9
      }
    }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["InputGroup"].Text, {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1396,
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
        lineNumber: 1397,
        columnNumber: 11
      }
    }, clientCurrentButtonText))), __jsx("div", {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.filterSection,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1407,
        columnNumber: 7
      }
    }, __jsx("div", {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.filterSectionTitle,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1408,
        columnNumber: 9
      }
    }, "Warehouse"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["InputGroup"], {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.inputGroup,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1409,
        columnNumber: 9
      }
    }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["InputGroup"].Text, {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1410,
        columnNumber: 11
      }
    }, "Quick"), __jsx("div", {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.buttonGroup,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1411,
        columnNumber: 11
      }
    }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Button"], {
      variant: "outline-secondary",
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.flexButton,
      onClick: handleSoCalWarehouseClick,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1412,
        columnNumber: 13
      }
    }, "SoCal Warehouse"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Button"], {
      variant: "outline-secondary",
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.flexButton,
      onClick: handleNorCalWarehouseClick,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1419,
        columnNumber: 13
      }
    }, "NorCal Warehouse"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Button"], {
      variant: "outline-secondary",
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.flexButton,
      onClick: handleWarehouseUnassignedClick,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1426,
        columnNumber: 13
      }
    }, "Unassigned")))));
  };

  return __jsx(_LoggedIn__WEBPACK_IMPORTED_MODULE_11__["default"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1441,
      columnNumber: 5
    }
  }, (isDeleting || isNavigating) && __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.loadingOverlay,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1443,
      columnNumber: 9
    }
  }, __jsx("img", {
    src: "/magmo-logo.png",
    alt: "Loading Magmo",
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.loadingLogo,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1444,
      columnNumber: 11
    }
  })), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"], {
    show: showDeleteModal,
    onHide: handleCloseDeleteModal,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1451,
      columnNumber: 7
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Header, {
    closeButton: true,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1452,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Title, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1453,
      columnNumber: 11
    }
  }, "Confirm Deletion")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Body, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1455,
      columnNumber: 9
    }
  }, "Are you sure you want to delete ", selectedItems.length, " item", selectedItems.length > 1 ? "s" : "", "?"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Footer, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1459,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Button"], {
    variant: "danger",
    onClick: handleDeleteSelected,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1460,
      columnNumber: 11
    }
  }, "Yes, delete"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Button"], {
    variant: "secondary",
    onClick: handleCloseDeleteModal,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1463,
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
      lineNumber: 1469,
      columnNumber: 7
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Header, {
    closeButton: true,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1470,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Title, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1471,
      columnNumber: 11
    }
  }, "Select ", clientSelectionType === "from" ? "Client From" : "Client Current")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Body, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1475,
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
      lineNumber: 1476,
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
      lineNumber: 1483,
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
      lineNumber: 1495,
      columnNumber: 7
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Header, {
    closeButton: true,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1496,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Title, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1497,
      columnNumber: 11
    }
  }, "Select Model")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Body, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1499,
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
      lineNumber: 1500,
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
      lineNumber: 1507,
      columnNumber: 11
    }
  }))), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.page,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1519,
      columnNumber: 7
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.pageInner,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1520,
      columnNumber: 9
    }
  }, __jsx("header", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.header,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1521,
      columnNumber: 11
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.headerLeft,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1522,
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
      lineNumber: 1523,
      columnNumber: 15
    }
  }, __jsx("span", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1529,
      columnNumber: 17
    }
  }), __jsx("span", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1530,
      columnNumber: 17
    }
  }), __jsx("span", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1531,
      columnNumber: 17
    }
  })), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.brand,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1533,
      columnNumber: 15
    }
  }, __jsx("img", {
    src: "/magmo-logo.png",
    alt: "Magmo",
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.brandLogo,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1534,
      columnNumber: 17
    }
  }), __jsx("div", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1539,
      columnNumber: 17
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.brandName,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1540,
      columnNumber: 19
    }
  }, "Magmo"), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.brandSub,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1541,
      columnNumber: 19
    }
  }, "Inventory Search")))), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.headerRight,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1545,
      columnNumber: 13
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.headerStatus,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1546,
      columnNumber: 15
    }
  }, hasActiveFilters ? "Filters active" : "All items"))), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.content,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1552,
      columnNumber: 11
    }
  }, __jsx("aside", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.sidebar,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1553,
      columnNumber: 13
    }
  }, renderFilters("sidebar")), __jsx("main", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.main,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1554,
      columnNumber: 13
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.tableCard,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1555,
      columnNumber: 15
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.tableHeader,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1556,
      columnNumber: 17
    }
  }, __jsx("div", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1557,
      columnNumber: 19
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.tableTitle,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1558,
      columnNumber: 21
    }
  }, "Items"), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.tableSubtitle,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1559,
      columnNumber: 21
    }
  }, isLoading ? "Loading items" : "".concat(info.length, " items on this page"))), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.tableMeta,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1563,
      columnNumber: 19
    }
  }, "Page ", page, " ", hasNextPage ? "of ".concat(totalKnownPages, "+") : "of ".concat(totalKnownPages))), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.tableBody,
    ref: tableBodyRef,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1568,
      columnNumber: 17
    }
  }, isLoading ? __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.loadingState,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1570,
      columnNumber: 21
    }
  }, __jsx("img", {
    src: "/magmo-logo.png",
    alt: "Loading Magmo",
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.loadingLogo,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1571,
      columnNumber: 23
    }
  }), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.loadingText,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1576,
      columnNumber: 23
    }
  }, "Loading")) : loadError ? __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.errorState,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1579,
      columnNumber: 21
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.errorTitle,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1580,
      columnNumber: 23
    }
  }, "Load failed (", loadError.code, ")"), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.errorMessage,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1583,
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
      lineNumber: 1584,
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
      lineNumber: 1596,
      columnNumber: 21
    }
  })), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.tableFooter,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1614,
      columnNumber: 17
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.paginationRow,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1615,
      columnNumber: 19
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Pagination"], {
    size: "sm",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1616,
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
      lineNumber: 1617,
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
      lineNumber: 1624,
      columnNumber: 23
    }
  }, "Next"))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Form"], {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.searchRow,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1632,
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
      lineNumber: 1633,
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
      lineNumber: 1641,
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
      lineNumber: 1649,
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
      lineNumber: 1657,
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
      lineNumber: 1665,
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
      lineNumber: 1673,
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
      lineNumber: 1681,
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
      lineNumber: 1689,
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
      lineNumber: 1697,
      columnNumber: 23
    }
  }, "SKU"))), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.footerActions,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1707,
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
      lineNumber: 1708,
      columnNumber: 21
    }
  }), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Button"], {
    variant: "info",
    className: "".concat(_styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.actionButton, " ").concat(_styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.mapActionButton),
    onClick: openMap,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1714,
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
      lineNumber: 1721,
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
      lineNumber: 1734,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Offcanvas"].Header, {
    closeButton: true,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1742,
      columnNumber: 11
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Offcanvas"].Title, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1743,
      columnNumber: 13
    }
  }, "Filters")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Offcanvas"].Body, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1745,
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
      lineNumber: 1748,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Header, {
    closeButton: true,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1754,
      columnNumber: 11
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Title, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1755,
      columnNumber: 13
    }
  }, "Warehouse Map")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Body, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1757,
      columnNumber: 11
    }
  }, mapLoading && __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.mapLoading,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1759,
      columnNumber: 15
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Spinner"], {
    animation: "border",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1760,
      columnNumber: 17
    }
  }), __jsx("span", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1761,
      columnNumber: 17
    }
  }, "Loading map data...")), mapError && __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.mapError,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1764,
      columnNumber: 26
    }
  }, mapError), !mapLoading && mapStep === "regions" && __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.mapStage,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1767,
      columnNumber: 15
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.mapHint,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1768,
      columnNumber: 17
    }
  }, "Select a region"), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.mapCanvas,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1769,
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
        lineNumber: 1771,
        columnNumber: 21
      }
    }, regionId);
  }))), !mapLoading && mapStep === "grid" && __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.mapStage,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1790,
      columnNumber: 15
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.mapHint,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1791,
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
          lineNumber: 1800,
          columnNumber: 23
        }
      }, "No grid data for this region.");
    }

    return __jsx("div", {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.gridWrapper,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1806,
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
        lineNumber: 1807,
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
            lineNumber: 1818,
            columnNumber: 31
          }
        }, __jsx("span", {
          __self: _this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 1829,
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
      lineNumber: 1845,
      columnNumber: 15
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.mapHint,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1846,
      columnNumber: 17
    }
  }, "Region ", mapRegion, " - Section ", mapRow, mapCol, ": select a pallet"), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.palletGrid,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1850,
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
        lineNumber: 1856,
        columnNumber: 25
      }
    }, "Pallet ", pallet);
  }), !(mapCellPallets["".concat(mapRow, "-").concat(mapCol)] || []).length && __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.mapEmpty,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1881,
      columnNumber: 21
    }
  }, "No pallets available here."))), !mapLoading && mapStep === "bins" && __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.mapStage,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1890,
      columnNumber: 15
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.mapHint,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1891,
      columnNumber: 17
    }
  }, "Region ", mapRegion, " - Section ", mapRow, mapCol, " - Pallet ", mapPallet), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.palletGrid,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1895,
      columnNumber: 17
    }
  }, (mapPalletBins["".concat(mapRow, "-").concat(mapCol, "-P").concat(mapPallet)] || []).map(function (bin) {
    return __jsx("button", {
      key: bin,
      type: "button",
      className: "".concat(_styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.palletButton, " ").concat(_styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.binButton),
      onClick: function onClick() {
        return handleMapSelectBin(bin);
      },
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1898,
        columnNumber: 23
      }
    }, "Bin ", bin);
  }), !(mapPalletBins["".concat(mapRow, "-").concat(mapCol, "-P").concat(mapPallet)] || []).length && __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.mapEmpty,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1910,
      columnNumber: 21
    }
  }, "No bins available on this pallet.")))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Footer, {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.mapFooter,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1918,
      columnNumber: 11
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Button"], {
    variant: "outline-secondary",
    onClick: handleMapBack,
    disabled: mapStep === "regions",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1919,
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
      lineNumber: 1926,
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
      lineNumber: 1932,
      columnNumber: 13
    }
  }, "Close")))));
}

_s2(MainSearch, "TIxz04gYiDm66clc2E0SpqG9YUc=", false, function () {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vcGFnZXMvTmV3U2VhcmNoL21haW5TZWFyY2guanMiXSwibmFtZXMiOlsiU09DQUxfQ0xJRU5UX0lEIiwiTk9SQ0FMX0NMSUVOVF9JRCIsIlVOQVNTSUdORURfQ0xJRU5UX0lEIiwiREVGQVVMVF9QQUdFX1NJWkUiLCJNQVBfUkVHSU9OX09SREVSIiwic2ltdWxhdGVOZXR3b3JrUmVxdWVzdCIsIlByb21pc2UiLCJyZXNvbHZlIiwic2V0VGltZW91dCIsIkxvYWRpbmdCdXR0b24iLCJ0eXBlIiwibmFtZSIsInJvdXRlIiwiY2xhc3NOYW1lIiwidXNlU3RhdGUiLCJpc0xvYWRpbmciLCJzZXRMb2FkaW5nIiwidXNlRWZmZWN0IiwiY2FuY2VsbGVkIiwidGhlbiIsInRvVGltZSIsInZhbHVlIiwic2Vjb25kcyIsIkRhdGUiLCJ0IiwiZ2V0VGltZSIsImlzTmFOIiwiaXNvIiwicGFyc2UiLCJwYXJ0cyIsInNwbGl0IiwibGVuZ3RoIiwibW0iLCJkZCIsInl5eXkiLCJhbHQiLCJ0b1lNRCIsImQiLCJnZXRGdWxsWWVhciIsIlN0cmluZyIsImdldE1vbnRoIiwicGFkU3RhcnQiLCJnZXREYXRlIiwibm9ybWFsaXplVGV4dCIsInRvTG93ZXJDYXNlIiwidHJpbSIsImdldE1hY2hpbmVGaWVsZCIsIml0ZW0iLCJrZXkiLCJsb3dlciIsIm1hY2hpbmVEYXRhIiwiY3VycmVudE1hY2hpbmVEYXRhIiwidGhlTWFjaGluZURhdGEiLCJUaGVNYWNoaW5lIiwiTWFpblNlYXJjaCIsInVzZUF1dGgiLCJzaWduT3V0IiwiaW5mbyIsInNldEluZm8iLCJiYWNrdXBJbmZvIiwic2V0QmFja3VwSW5mbyIsImF1Z21lbnRlZEluZm8iLCJzZXRBdWdtZW50ZWRJbmZvIiwic2V0SXNMb2FkaW5nIiwiaWRzIiwic2V0SUQiLCJzaG93Iiwic2V0U2hvdyIsInNob3dGaWx0ZXJzIiwic2V0U2hvd0ZpbHRlcnMiLCJwYWdlU2l6ZSIsInNldFBhZ2VTaXplIiwiaXNOYXZpZ2F0aW5nIiwic2V0SXNOYXZpZ2F0aW5nIiwiZEl0ZW0iLCJzZXRESXRlbSIsInNlbGVjdCIsInNldFNlbGVjdCIsInNob3dMaXN0Iiwic2V0U2hvd0xpc3QiLCJzaG93TGlzdFNlYXJjaCIsInNldFNob3dMaXN0U2VhcmNoIiwic2VhcmNoIiwic2V0U2VhcmNoIiwic2VsZWN0ZWRPRU0iLCJzZXRTZWxlY3RlZE9FTSIsInNlbGVjdGVkTW9kYWxpdHkiLCJzZXRTZWxlY3RlZE1vZGFsaXR5Iiwic2VsZWN0ZWRDbGllbnRGcm9tIiwic2V0U2VsZWN0ZWRDbGllbnRGcm9tIiwiY2xpZW50RnJvbUJ1dHRvblRleHQiLCJzZXRDbGllbnRGcm9tQnV0dG9uVGV4dCIsInNlbGVjdGVkQ2xpZW50Q3VycmVudCIsInNldFNlbGVjdGVkQ2xpZW50Q3VycmVudCIsImNsaWVudEN1cnJlbnRCdXR0b25UZXh0Iiwic2V0Q2xpZW50Q3VycmVudEJ1dHRvblRleHQiLCJjbGllbnRzIiwic2V0Q2xpZW50cyIsInNob3dDbGllbnRNb2RhbCIsInNldFNob3dDbGllbnRNb2RhbCIsImNsaWVudFNlbGVjdGlvblR5cGUiLCJzZXRDbGllbnRTZWxlY3Rpb25UeXBlIiwic2hvd01hcCIsInNldFNob3dNYXAiLCJtYXBSZWdpb25PcHRpb25zIiwic2V0TWFwUmVnaW9uT3B0aW9ucyIsIm1hcFNlY3Rpb25NYXAiLCJzZXRNYXBTZWN0aW9uTWFwIiwibWFwU3RlcCIsInNldE1hcFN0ZXAiLCJtYXBSZWdpb24iLCJzZXRNYXBSZWdpb24iLCJtYXBSb3ciLCJzZXRNYXBSb3ciLCJtYXBDb2wiLCJzZXRNYXBDb2wiLCJtYXBQYWxsZXQiLCJzZXRNYXBQYWxsZXQiLCJtYXBCaW4iLCJzZXRNYXBCaW4iLCJtYXBDZWxsUGFsbGV0cyIsInNldE1hcENlbGxQYWxsZXRzIiwibWFwUGFsbGV0QmlucyIsInNldE1hcFBhbGxldEJpbnMiLCJtYXBMb2FkaW5nIiwic2V0TWFwTG9hZGluZyIsIm1hcEVycm9yIiwic2V0TWFwRXJyb3IiLCJtYXBEaXJlY3RvcnlMb2FkZWQiLCJzZXRNYXBEaXJlY3RvcnlMb2FkZWQiLCJyb3V0ZXIiLCJ1c2VSb3V0ZXIiLCJsYWJlbEJhc2UiLCJsYWJlbEJhc2VOYW1lcyIsInNvcnRDaGVja0Jhc2UiLCJ3aXRoU29ydEljb24iLCJiYXNlTGFiZWxzIiwiYWN0aXZlSW5kZXgiLCJpc0Rlc2MiLCJtYXAiLCJ0ZXh0IiwiaSIsImFycm93IiwibGFiZWxzIiwic2V0TGFiZWxzIiwic29ydENoZWNrIiwic2V0U29ydENoZWNrIiwiaG92ZXJJbmRleCIsInNldEhvdmVySW5kZXgiLCJzZWxlY3RlZE1vZGVsIiwic2V0U2VsZWN0ZWRNb2RlbCIsImdQb3MiLCJzZXRHUG9zIiwiZ0lkZSIsInNldEdJZGUiLCJpc0RlbGV0aW5nIiwic2V0SXNEZWxldGluZyIsInBhZ2UiLCJzZXRQYWdlIiwicGFnZUN1cnNvcnMiLCJzZXRQYWdlQ3Vyc29ycyIsImhhc05leHRQYWdlIiwic2V0SGFzTmV4dFBhZ2UiLCJmZXRjaFNlcSIsInVzZVJlZiIsImJhY2tmaWxsSW5GbGlnaHQiLCJxdWVyeUVwb2NoIiwic2V0UXVlcnlFcG9jaCIsImxvYWRFcnJvciIsInNldExvYWRFcnJvciIsInRhYmxlQm9keVJlZiIsInJvd0hlaWdodFJlZiIsImhlYWRlckhlaWdodFJlZiIsIkxPQURfVElNRU9VVF9NUyIsIm1hcExldHRlcnMiLCJ1c2VNZW1vIiwiQXJyYXkiLCJmcm9tIiwiXyIsImZyb21DaGFyQ29kZSIsIm1hcE51bWJlcnMiLCJsb2FkTWFwRGlyZWN0b3J5IiwidXNlQ2FsbGJhY2siLCJmaXJlYmFzZSIsImZpcmVzdG9yZSIsImNvbGxlY3Rpb24iLCJkb2MiLCJnZXQiLCJkYXRhIiwiUmVnaW9uIiwiU2VjdGlvbiIsImNvbnNvbGUiLCJlcnJvciIsImdldE1hcFJlZ2lvbkRpbWVuc2lvbnMiLCJyZWdpb25JZCIsImVudHJ5IiwiaXNBcnJheSIsImNvbHMiLCJwYXJzZUludCIsInJvd3MiLCJOdW1iZXIiLCJpc0Zpbml0ZSIsImxvYWRNYXBJbnZlbnRvcnkiLCJ3aGVyZSIsInNuYXAiLCJjZWxsUGFsbGV0cyIsInBhbGxldEJpbnMiLCJmb3JFYWNoIiwibG9jIiwibmV3TG9jYWxDdXJyZW50Iiwicm93Iiwic2VjdGlvbiIsImxldHRlciIsImNvbCIsIm51bWJlciIsInRyaW1tZWQiLCJzbGljZSIsInVuZGVmaW5lZCIsInBhbGxldCIsImJpbiIsImNlbGxLZXkiLCJTZXQiLCJhZGQiLCJwYWxsZXRLZXkiLCJjZWxsT2JqIiwiT2JqZWN0Iiwia2V5cyIsInNvcnQiLCJhIiwiYiIsInBhbGxldE9iaiIsIm9wZW5NYXAiLCJoYW5kbGVNYXBTZWxlY3RSZWdpb24iLCJoYW5kbGVNYXBTZWxlY3RDZWxsIiwicm93TGV0dGVyIiwiY29sTnVtYmVyIiwiaGFuZGxlTWFwU2VsZWN0UGFsbGV0IiwicGFsbGV0SWQiLCJoYW5kbGVNYXBTZWxlY3RCaW4iLCJiaW5JZCIsImhhbmRsZU1hcEJhY2siLCJoYW5kbGVNYXBWaWV3Iiwib3ZlcnJpZGVzIiwicGFyYW1zIiwiVVJMU2VhcmNoUGFyYW1zIiwicmVnaW9uVmFsdWUiLCJyZWdpb24iLCJsZXR0ZXJWYWx1ZSIsInNlY3Rpb25MZXR0ZXIiLCJudW1iZXJWYWx1ZSIsInNlY3Rpb25OdW1iZXIiLCJwYWxsZXRWYWx1ZSIsImJpblZhbHVlIiwic2V0IiwicXVlcnkiLCJ0b1N0cmluZyIsInB1c2giLCJzdGFydE5hbWVUb2tlbkJhY2tmaWxsIiwicmVhc29uIiwiY3VycmVudCIsImxhc3RSdW4iLCJ3aW5kb3ciLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwibm93IiwiZGIiLCJsYXN0RG9jIiwidG9rZW5zRXF1YWwiLCJzZXRBIiwic2V0QiIsInNpemUiLCJ2IiwiaGFzIiwib3JkZXJCeSIsIkZpZWxkUGF0aCIsImRvY3VtZW50SWQiLCJsaW1pdCIsInN0YXJ0QWZ0ZXIiLCJlbXB0eSIsImJhdGNoIiwid3JpdGVzIiwiZG9jcyIsIm5hbWVMb3dlciIsIm5hbWVUb2tlbnMiLCJidWlsZE5hbWVUb2tlbnMiLCJleGlzdGluZ1Rva2VucyIsIm5lZWRzVXBkYXRlIiwidXBkYXRlIiwicmVmIiwiY29tbWl0Iiwic2V0SXRlbSIsInNlYXJjaExvd2VyIiwiaGFzQWN0aXZlRmlsdGVycyIsIkJvb2xlYW4iLCJ2YWx1ZU1hdGNoZXMiLCJzIiwic29tZSIsImluY2x1ZGVzIiwibWF0Y2hlc0ZpbHRlcnMiLCJ2aXNpYmxlIiwiT0VNIiwiTW9kYWxpdHkiLCJNb2RlbCIsImNsaWVudEZyb21JZCIsImNsaWVudEN1cnJlbnRJZCIsIndhbnRlZERheSIsIml0ZW1ZTUQiLCJkYXRlIiwiZGVzY3JpcHRpb25zIiwid29ya09yZGVycyIsInciLCJ3byIsIndvcmtPcmRlciIsInBuIiwic24iLCJkZXNjIiwiZGVzY3JpcHRpb24iLCJpZCIsImxvY2FsU04iLCJsb2NhbF9zbiIsInJlc2V0UGFnaW5hdGlvbiIsImFzUGF0aCIsImZldGNoRGF0YSIsImV2ZW50cyIsImhhbmRsZURvbmUiLCJvbiIsIm9mZiIsInJlcXVlc3RlZFBhZ2UiLCJzZXEiLCJ0aW1lZE91dCIsInRpbWVvdXRJZCIsImNvZGUiLCJtZXNzYWdlIiwiTWF0aCIsInJvdW5kIiwiaW5wdXRUZXh0Iiwic2VsZWN0ZWRUeXBlIiwic3RhcnRBZnRlckRvYyIsImNsZWFyVGltZW91dCIsImVmZmVjdGl2ZVNlbGVjdCIsImVmZmVjdGl2ZVNlYXJjaCIsImVmZmVjdGl2ZVNlYXJjaExvd2VyIiwibG9hZCIsImF0dGVtcHQiLCJmZXRjaFBhcnRzV2l0aE1hY2hpbmVEYXRhUGFnZSIsInZpc2libGVPbmx5IiwiZmlsdGVyRm4iLCJyYXciLCJuZWVkc01hY2hpbmVEYXRhIiwiciIsInBvdyIsIm5leHRQYWdlIiwiaGFzTmFtZVNlYXJjaCIsInByZXYiLCJuZXh0Iiwic2V0U2VsZWN0ZWRJdGVtcyIsImF1Z21lbnRlZCIsIkNsaWVudEZyb20iLCJDbGllbnRDdXJyZW50IiwiZmlsdGVyIiwic2VhcmNoQ2hhbmdlSGFuZGxlciIsImV2ZW50IiwidGFyZ2V0IiwiYmFzZSIsInNvcnRDaGVja0FsbCIsInBvcyIsIm5leHRTb3J0Q2hlY2siLCJzb3J0ZWRJbmZvIiwidGEiLCJ0YiIsImF2IiwiYnYiLCJsb2NhbGVDb21wYXJlIiwiYW4iLCJibiIsInJvd1NlbGVjdCIsImxvZyIsInNlbGVjdGVkSXRlbXMiLCJzaG93RGVsZXRlTW9kYWwiLCJzZXRTaG93RGVsZXRlTW9kYWwiLCJoYW5kbGVTZWxlY3RJdGVtIiwieCIsImhhbmRsZVNob3dEZWxldGVNb2RhbCIsImhhbmRsZUNsb3NlRGVsZXRlTW9kYWwiLCJoYW5kbGVEZWxldGVTZWxlY3RlZCIsIml0ZW1JZCIsImRlbGV0ZUZyb21TdG9yYWdlIiwiaGFuZGxlQ2xvc2UiLCJoYW5kbGVTaG93IiwiY2hlY2tEZWxldGUiLCJpZHNUb0RlbGV0ZSIsInByZXZlbnREZWZhdWx0Iiwic3RvcFByb3BhZ2F0aW9uIiwiaG92ZXJTdHlsZSIsImluZGV4IiwiYmFja2dyb3VuZENvbG9yIiwidGV4dEFsaWduIiwiY3Vyc29yIiwiZHJvcGRvd24xVGV4dCIsInNldERyb3Bkb3duMVRleHQiLCJkcm9wZG93bjJUZXh0Iiwic2V0RHJvcGRvd24yVGV4dCIsImhhbmRsZVNlbGVjdDEiLCJldmVudEtleSIsInRleHRDb250ZW50IiwiaGFuZGxlU2VsZWN0MiIsImJ1aWxkQ2xpZW50c0Zyb21JdGVtcyIsImZpbHRlcmVkIiwiaXQiLCJvdXQiLCJpZEFycmF5IiwiY2h1bmsiLCJoYW5kbGVDbGllbnRDbGljayIsInNhZmVDbGllbnRzIiwiZmV0Y2hDbGllbnRzIiwiY2xpZW50c0RhdGEiLCJkZXJpdmVkIiwic2V0Q2xpZW50U2VhcmNoVGVybSIsImhhbmRsZUNsaWVudFNlbGVjdCIsImNsaWVudElkIiwiY2xpZW50U25hcCIsImV4aXN0cyIsImNsaWVudERhdGEiLCJoYW5kbGVDbGllbnRJbmZvIiwiY2xpZW50TmFtZSIsImhhbmRsZUNsZWFyQ2xpZW50U2VsZWN0aW9uIiwibW9kZWxzIiwic2V0TW9kZWxzIiwic2hvd01vZGVsTW9kYWwiLCJzZXRTaG93TW9kZWxNb2RhbCIsIm1vZGVsQnV0dG9uVGV4dCIsInNldE1vZGVsQnV0dG9uVGV4dCIsImhhbmRsZU1vZGVsQ2xpY2siLCJmZXRjaE1vZGVscyIsIm1vZGVsc0RhdGEiLCJzZXRNb2RlbFNlYXJjaFRlcm0iLCJoYW5kbGVNb2RlbFNlbGVjdCIsIm1vZGVsTmFtZSIsImhhbmRsZUNsZWFyTW9kZWxTZWxlY3Rpb24iLCJoYW5kbGVTb0NhbFdhcmVob3VzZUNsaWNrIiwiaGFuZGxlTm9yQ2FsV2FyZWhvdXNlQ2xpY2siLCJoYW5kbGVXYXJlaG91c2VVbmFzc2lnbmVkQ2xpY2siLCJjbGllbnRTZWFyY2hUZXJtIiwibW9kZWxTZWFyY2hUZXJtIiwic3RvcmFnZVJlZiIsInN0b3JhZ2UiLCJmb2xkZXJSZWYiLCJjaGlsZCIsImxpc3RBbGwiLCJsaXN0UmVzdWx0IiwiZGVsZXRlUHJvbWlzZXMiLCJpdGVtcyIsImFsbCIsImRlbGV0ZUZyb21QYXJ0c0NvbGxlY3Rpb24iLCJ0b3RhbEtub3duUGFnZXMiLCJtYXgiLCJwYWdlQnV0dG9ucyIsImJ1dHRvbnMiLCJtYXhWaXNpYmxlIiwicHVzaFBhZ2UiLCJwIiwicHVzaEVsbGlwc2lzIiwic3RhcnQiLCJlbmQiLCJtaW4iLCJkZXNpcmVkV2luZG93IiwiY3VycmVudFdpbmRvdyIsInJlbWFpbmluZyIsInJlY2FsY1BhZ2VTaXplIiwiY29udGFpbmVySGVpZ2h0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiaGVpZ2h0IiwiaGVhZGVyUm93IiwicXVlcnlTZWxlY3RvciIsImJvZHlSb3ciLCJoIiwidmVydGljYWxQYWRkaW5nIiwiYXZhaWxhYmxlIiwiZXN0aW1hdGVkIiwiZmxvb3IiLCJjbGFtcGVkIiwib25SZXNpemUiLCJhZGRFdmVudExpc3RlbmVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInJlbmRlckZpbHRlcnMiLCJpZFByZWZpeCIsInN0eWxlcyIsImZpbHRlcnNQYW5lbCIsImZpbHRlcnNIZWFkZXIiLCJmaWx0ZXJzVGl0bGUiLCJmaWx0ZXJzU3VidGl0bGUiLCJmaWx0ZXJzQmFkZ2UiLCJmaWx0ZXJTZWN0aW9uIiwiZmlsdGVyU2VjdGlvblRpdGxlIiwiaW5wdXRHcm91cCIsImlucHV0QnV0dG9uIiwiYnV0dG9uR3JvdXAiLCJmbGV4QnV0dG9uIiwibG9hZGluZ092ZXJsYXkiLCJsb2FkaW5nTG9nbyIsImUiLCJjbGllbnQiLCJtb2RlbCIsInBhZ2VJbm5lciIsImhlYWRlciIsImhlYWRlckxlZnQiLCJidXJnZXIiLCJicmFuZCIsImJyYW5kTG9nbyIsImJyYW5kTmFtZSIsImJyYW5kU3ViIiwiaGVhZGVyUmlnaHQiLCJoZWFkZXJTdGF0dXMiLCJjb250ZW50Iiwic2lkZWJhciIsIm1haW4iLCJ0YWJsZUNhcmQiLCJ0YWJsZUhlYWRlciIsInRhYmxlVGl0bGUiLCJ0YWJsZVN1YnRpdGxlIiwidGFibGVNZXRhIiwidGFibGVCb2R5IiwibG9hZGluZ1N0YXRlIiwibG9hZGluZ1RleHQiLCJlcnJvclN0YXRlIiwiZXJyb3JUaXRsZSIsImVycm9yTWVzc2FnZSIsInRhYmxlRm9vdGVyIiwicGFnaW5hdGlvblJvdyIsInNlYXJjaFJvdyIsInNlYXJjaElucHV0Iiwic2VhcmNoU2VsZWN0IiwiZm9vdGVyQWN0aW9ucyIsImFjdGlvbkJ1dHRvbiIsIm1hcEFjdGlvbkJ1dHRvbiIsImZpbHRlcnNEcmF3ZXIiLCJtYXBTdGFnZSIsIm1hcEhpbnQiLCJtYXBDYW52YXMiLCJyZWdpb25CbG9jayIsImRpbXMiLCJtYXBFbXB0eSIsImdyaWRXcmFwcGVyIiwiZ3JpZCIsImhhc1BhbGxldHMiLCJncmlkQ2VsbCIsImdyaWRDZWxsRGlzYWJsZWQiLCJwYWxsZXRHcmlkIiwiYmlucyIsInBhbGxldEJ1dHRvbiIsImJpbkJ1dHRvbiIsIm1hcEZvb3RlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQVlBO0FBQ0E7QUFDQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0NBR0E7O0FBQ0EsSUFBTUEsZUFBZSxHQUFHLFVBQXhCO0FBQ0EsSUFBTUMsZ0JBQWdCLEdBQUcsVUFBekI7QUFDQSxJQUFNQyxvQkFBb0IsR0FBRyxVQUE3QjtBQUNBLElBQU1DLGlCQUFpQixHQUFHLEVBQTFCO0FBQ0EsSUFBTUMsZ0JBQWdCLEdBQUcsQ0FBQyxHQUFELEVBQU0sR0FBTixFQUFXLEdBQVgsRUFBZ0IsR0FBaEIsRUFBcUIsR0FBckIsRUFBMEIsR0FBMUIsRUFBK0IsR0FBL0IsQ0FBekIsQyxDQUdBOztBQUNBLFNBQVNDLHNCQUFULEdBQWtDO0FBQ2hDLFNBQU8sSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQ7QUFBQSxXQUFhQyxVQUFVLENBQUNELE9BQUQsRUFBVSxJQUFWLENBQXZCO0FBQUEsR0FBWixDQUFQO0FBQ0QsQyxDQUVEOzs7QUFDQSxTQUFTRSxhQUFULE9BQXlEO0FBQUE7O0FBQUEsTUFBaENDLElBQWdDLFFBQWhDQSxJQUFnQztBQUFBLE1BQTFCQyxJQUEwQixRQUExQkEsSUFBMEI7QUFBQSxNQUFwQkMsS0FBb0IsUUFBcEJBLEtBQW9CO0FBQUEsTUFBYkMsU0FBYSxRQUFiQSxTQUFhOztBQUFBLGtCQUN2QkMsc0RBQVEsQ0FBQyxLQUFELENBRGU7QUFBQSxNQUNoREMsU0FEZ0Q7QUFBQSxNQUNyQ0MsVUFEcUM7O0FBR3ZEQyx5REFBUyxDQUFDLFlBQU07QUFDZCxRQUFJRixTQUFKLEVBQWU7QUFDYixVQUFJRyxTQUFTLEdBQUcsS0FBaEI7QUFDQWIsNEJBQXNCLEdBQUdjLElBQXpCLENBQThCLFlBQU07QUFDbEMsWUFBSSxDQUFDRCxTQUFMLEVBQWdCRixVQUFVLENBQUMsS0FBRCxDQUFWO0FBQ2pCLE9BRkQ7QUFHQSxhQUFPLFlBQU07QUFDWEUsaUJBQVMsR0FBRyxJQUFaO0FBQ0QsT0FGRDtBQUdEO0FBQ0YsR0FWUSxFQVVOLENBQUNILFNBQUQsQ0FWTSxDQUFUO0FBWUEsU0FDRSxNQUFDLGdEQUFEO0FBQU0sUUFBSSxhQUFNSCxLQUFOLENBQVY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFO0FBQ0UsYUFBUyxvQkFBYUYsSUFBYixjQUFxQkcsU0FBUyxJQUFJLEVBQWxDLENBRFg7QUFFRSxZQUFRLEVBQUVFLFNBRlo7QUFHRSxXQUFPLEVBQUU7QUFBQSxhQUFNLENBQUNBLFNBQUQsSUFBY0MsVUFBVSxDQUFDLElBQUQsQ0FBOUI7QUFBQSxLQUhYO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FLR0QsU0FBUyxHQUFHLFVBQUgsR0FBZ0JKLElBTDVCLENBREYsQ0FERjtBQVdELEMsQ0FFRDtBQUVBOzs7R0E5QlNGLGE7O0tBQUFBLGE7O0FBK0JULFNBQVNXLE1BQVQsQ0FBZ0JDLEtBQWhCLEVBQXVCO0FBQ3JCLE1BQUksQ0FBQ0EsS0FBTCxFQUFZLE9BQU8sSUFBUCxDQURTLENBR3JCOztBQUNBLE1BQUksT0FBT0EsS0FBUCxLQUFpQixRQUFqQixJQUE2QkEsS0FBSyxLQUFLLElBQXZDLElBQStDQSxLQUFLLENBQUNDLE9BQU4sSUFBaUIsSUFBcEUsRUFBMEU7QUFDeEUsUUFBSTtBQUFFLGFBQU9ELEtBQUssQ0FBQ0MsT0FBTixHQUFnQixJQUF2QjtBQUE4QixLQUFwQyxDQUFxQyxnQkFBTTtBQUFFO0FBQWM7QUFDNUQsR0FOb0IsQ0FRckI7OztBQUNBLE1BQUlELEtBQUssWUFBWUUsSUFBckIsRUFBMkI7QUFDekIsUUFBTUMsRUFBQyxHQUFHSCxLQUFLLENBQUNJLE9BQU4sRUFBVjs7QUFDQSxXQUFPQyxLQUFLLENBQUNGLEVBQUQsQ0FBTCxHQUFXLElBQVgsR0FBa0JBLEVBQXpCO0FBQ0QsR0Fab0IsQ0FjckI7OztBQUNBLE1BQUksT0FBT0gsS0FBUCxLQUFpQixRQUFyQixFQUErQjtBQUM3QjtBQUNBLFFBQU1NLEdBQUcsR0FBR0osSUFBSSxDQUFDSyxLQUFMLENBQVdQLEtBQVgsQ0FBWjtBQUNBLFFBQUksQ0FBQ0ssS0FBSyxDQUFDQyxHQUFELENBQVYsRUFBaUIsT0FBT0EsR0FBUCxDQUhZLENBSzdCOztBQUNBLFFBQU1FLEtBQUssR0FBR1IsS0FBSyxDQUFDUyxLQUFOLENBQVksR0FBWixDQUFkOztBQUNBLFFBQUlELEtBQUssQ0FBQ0UsTUFBTixLQUFpQixDQUFyQixFQUF3QjtBQUFBLHFLQUNDRixLQUREO0FBQUEsVUFDZkcsRUFEZTtBQUFBLFVBQ1hDLEVBRFc7QUFBQSxVQUNQQyxJQURPOztBQUV0QixVQUFNQyxHQUFHLEdBQUdaLElBQUksQ0FBQ0ssS0FBTCxXQUFjTSxJQUFkLGNBQXNCRixFQUF0QixjQUE0QkMsRUFBNUIsRUFBWjtBQUNBLFVBQUksQ0FBQ1AsS0FBSyxDQUFDUyxHQUFELENBQVYsRUFBaUIsT0FBT0EsR0FBUDtBQUNsQjtBQUNGLEdBM0JvQixDQTZCckI7OztBQUNBLE1BQU1YLENBQUMsR0FBR0QsSUFBSSxDQUFDSyxLQUFMLENBQVdQLEtBQVgsQ0FBVjtBQUNBLFNBQU9LLEtBQUssQ0FBQ0YsQ0FBRCxDQUFMLEdBQVcsSUFBWCxHQUFrQkEsQ0FBekI7QUFDRCxDLENBRUQ7OztBQUNBLFNBQVNZLEtBQVQsQ0FBZWYsS0FBZixFQUFzQjtBQUNwQixNQUFNRyxDQUFDLEdBQUdKLE1BQU0sQ0FBQ0MsS0FBRCxDQUFoQjtBQUNBLE1BQUlHLENBQUMsSUFBSSxJQUFULEVBQWUsT0FBTyxJQUFQO0FBQ2YsTUFBTWEsQ0FBQyxHQUFHLElBQUlkLElBQUosQ0FBU0MsQ0FBVCxDQUFWO0FBQ0EsTUFBTVUsSUFBSSxHQUFHRyxDQUFDLENBQUNDLFdBQUYsRUFBYjtBQUNBLE1BQU1OLEVBQUUsR0FBR08sTUFBTSxDQUFDRixDQUFDLENBQUNHLFFBQUYsS0FBZSxDQUFoQixDQUFOLENBQXlCQyxRQUF6QixDQUFrQyxDQUFsQyxFQUFxQyxHQUFyQyxDQUFYO0FBQ0EsTUFBTVIsRUFBRSxHQUFHTSxNQUFNLENBQUNGLENBQUMsQ0FBQ0ssT0FBRixFQUFELENBQU4sQ0FBb0JELFFBQXBCLENBQTZCLENBQTdCLEVBQWdDLEdBQWhDLENBQVg7QUFDQSxtQkFBVVAsSUFBVixjQUFrQkYsRUFBbEIsY0FBd0JDLEVBQXhCO0FBQ0Q7O0FBRUQsU0FBU1UsYUFBVCxDQUF1QnRCLEtBQXZCLEVBQThCO0FBQzVCLE1BQUlBLEtBQUssSUFBSSxJQUFiLEVBQW1CLE9BQU8sRUFBUDtBQUNuQixTQUFPa0IsTUFBTSxDQUFDbEIsS0FBRCxDQUFOLENBQWN1QixXQUFkLEdBQTRCQyxJQUE1QixFQUFQO0FBQ0Q7O0FBRUQsU0FBU0MsZUFBVCxDQUF5QkMsSUFBekIsRUFBK0JDLEdBQS9CLEVBQW9DO0FBQUE7O0FBQ2xDLE1BQUksQ0FBQ0QsSUFBTCxFQUFXLE9BQU8sSUFBUDtBQUNYLE1BQU1FLEtBQUssR0FBR0QsR0FBRyxDQUFDSixXQUFKLEVBQWQ7QUFDQSxpR0FDRUcsSUFERixhQUNFQSxJQURGLDRDQUNFQSxJQUFJLENBQUVHLFdBRFIsc0RBQ0Usa0JBQW9CRixHQUFwQixDQURGLHlFQUVFRCxJQUZGLGFBRUVBLElBRkYsNkNBRUVBLElBQUksQ0FBRUcsV0FGUix1REFFRSxtQkFBb0JELEtBQXBCLENBRkYseUNBR0VGLElBSEYsYUFHRUEsSUFIRixnREFHRUEsSUFBSSxDQUFFSSxrQkFIUiwwREFHRSxzQkFBMkJILEdBQTNCLENBSEYseUNBSUVELElBSkYsYUFJRUEsSUFKRixpREFJRUEsSUFBSSxDQUFFSSxrQkFKUiwyREFJRSx1QkFBMkJGLEtBQTNCLENBSkYseUNBS0VGLElBTEYsYUFLRUEsSUFMRiwrQ0FLRUEsSUFBSSxDQUFFSyxjQUxSLHlEQUtFLHFCQUF1QkosR0FBdkIsQ0FMRix5Q0FNRUQsSUFORixhQU1FQSxJQU5GLGdEQU1FQSxJQUFJLENBQUVLLGNBTlIsMERBTUUsc0JBQXVCSCxLQUF2QixDQU5GLHlDQU9FRixJQVBGLGFBT0VBLElBUEYsMkNBT0VBLElBQUksQ0FBRU0sVUFQUixxREFPRSxpQkFBbUJMLEdBQW5CLENBUEYseUNBUUVELElBUkYsYUFRRUEsSUFSRiw0Q0FRRUEsSUFBSSxDQUFFTSxVQVJSLHNEQVFFLGtCQUFtQkosS0FBbkIsQ0FSRix5Q0FTRSxJQVRGO0FBV0Q7O0FBR2MsU0FBU0ssVUFBVCxHQUFzQjtBQUFBOztBQUFBOztBQUFBLGlCQUNmQyx5RUFBTyxFQURRO0FBQUEsTUFDM0JDLE9BRDJCLFlBQzNCQSxPQUQyQjs7QUFBQSxtQkFFWDFDLHNEQUFRLENBQUMsRUFBRCxDQUZHO0FBQUEsTUFFNUIyQyxJQUY0QjtBQUFBLE1BRXRCQyxPQUZzQjs7QUFBQSxtQkFHQzVDLHNEQUFRLENBQUMsRUFBRCxDQUhUO0FBQUEsTUFHNUI2QyxVQUg0QjtBQUFBLE1BR2hCQyxhQUhnQjs7QUFBQSxtQkFJTzlDLHNEQUFRLENBQUMsRUFBRCxDQUpmO0FBQUEsTUFJNUIrQyxhQUo0QjtBQUFBLE1BSWJDLGdCQUphLGtCQUlxQjs7O0FBSnJCLG1CQUtEaEQsc0RBQVEsQ0FBQyxJQUFELENBTFA7QUFBQSxNQUs1QkMsU0FMNEI7QUFBQSxNQUtqQmdELFlBTGlCOztBQUFBLG1CQU1kakQsc0RBQVEsQ0FBQyxFQUFELENBTk07QUFBQSxNQU01QmtELEdBTjRCO0FBQUEsTUFNdkJDLEtBTnVCOztBQUFBLG1CQU9YbkQsc0RBQVEsQ0FBQyxLQUFELENBUEc7QUFBQSxNQU81Qm9ELElBUDRCO0FBQUEsTUFPdEJDLE9BUHNCOztBQUFBLG1CQVFHckQsc0RBQVEsQ0FBQyxLQUFELENBUlg7QUFBQSxNQVE1QnNELFdBUjRCO0FBQUEsTUFRZkMsY0FSZTs7QUFBQSxtQkFTSHZELHNEQUFRLENBQUNYLGlCQUFELENBVEw7QUFBQSxNQVM1Qm1FLFFBVDRCO0FBQUEsTUFTbEJDLFdBVGtCOztBQUFBLG9CQVVLekQsc0RBQVEsQ0FBQyxLQUFELENBVmI7QUFBQSxNQVU1QjBELFlBVjRCO0FBQUEsTUFVZEMsZUFWYzs7QUFBQSxvQkFXVDNELHNEQUFRLEVBWEM7QUFBQSxNQVc1QjRELEtBWDRCO0FBQUEsTUFXckJDLFFBWHFCOztBQUFBLG9CQVlQN0Qsc0RBQVEsQ0FBQyxNQUFELENBWkQ7QUFBQSxNQVk1QjhELE1BWjRCO0FBQUEsTUFZcEJDLFNBWm9COztBQUFBLG9CQWFIL0Qsc0RBQVEsQ0FBQyxLQUFELENBYkw7QUFBQSxNQWE1QmdFLFFBYjRCO0FBQUEsTUFhbEJDLFdBYmtCOztBQUFBLG9CQWNTakUsc0RBQVEsQ0FBQyxNQUFELENBZGpCO0FBQUEsTUFjNUJrRSxjQWQ0QjtBQUFBLE1BY1pDLGlCQWRZOztBQUFBLG9CQWVQbkUsc0RBQVEsQ0FBQyxFQUFELENBZkQ7QUFBQSxNQWU1Qm9FLE1BZjRCO0FBQUEsTUFlcEJDLFNBZm9COztBQUFBLG9CQWdCR3JFLHNEQUFRLENBQUMsSUFBRCxDQWhCWDtBQUFBLE1BZ0I1QnNFLFdBaEI0QjtBQUFBLE1BZ0JmQyxjQWhCZTs7QUFBQSxvQkFpQmF2RSxzREFBUSxDQUFDLElBQUQsQ0FqQnJCO0FBQUEsTUFpQjVCd0UsZ0JBakI0QjtBQUFBLE1BaUJWQyxtQkFqQlUsbUJBa0JuQzs7O0FBbEJtQyxvQkFtQmlCekUsc0RBQVEsQ0FBQyxJQUFELENBbkJ6QjtBQUFBLE1BbUI1QjBFLGtCQW5CNEI7QUFBQSxNQW1CUkMscUJBbkJROztBQUFBLG9CQW9CcUIzRSxzREFBUSxDQUFDLGVBQUQsQ0FwQjdCO0FBQUEsTUFvQjVCNEUsb0JBcEI0QjtBQUFBLE1Bb0JOQyx1QkFwQk07O0FBQUEsb0JBcUJ1QjdFLHNEQUFRLENBQUMsSUFBRCxDQXJCL0I7QUFBQSxNQXFCNUI4RSxxQkFyQjRCO0FBQUEsTUFxQkxDLHdCQXJCSzs7QUFBQSxvQkFzQjJCL0Usc0RBQVEsQ0FBQyxlQUFELENBdEJuQztBQUFBLE1Bc0I1QmdGLHVCQXRCNEI7QUFBQSxNQXNCSEMsMEJBdEJHOztBQUFBLG9CQXdCTGpGLHNEQUFRLENBQUMsRUFBRCxDQXhCSDtBQUFBLE1Bd0I1QmtGLE9BeEI0QjtBQUFBLE1Bd0JuQkMsVUF4Qm1COztBQUFBLG9CQXlCV25GLHNEQUFRLENBQUMsS0FBRCxDQXpCbkI7QUFBQSxNQXlCNUJvRixlQXpCNEI7QUFBQSxNQXlCWEMsa0JBekJXLG1CQTBCbkM7OztBQTFCbUMsb0JBMkJtQnJGLHNEQUFRLENBQUMsSUFBRCxDQTNCM0I7QUFBQSxNQTJCNUJzRixtQkEzQjRCO0FBQUEsTUEyQlBDLHNCQTNCTzs7QUFBQSxvQkE0Qkx2RixzREFBUSxDQUFDLEtBQUQsQ0E1Qkg7QUFBQSxNQTRCNUJ3RixPQTVCNEI7QUFBQSxNQTRCbkJDLFVBNUJtQjs7QUFBQSxvQkE2QmF6RixzREFBUSxDQUFDLEVBQUQsQ0E3QnJCO0FBQUEsTUE2QjVCMEYsZ0JBN0I0QjtBQUFBLE1BNkJWQyxtQkE3QlU7O0FBQUEsb0JBOEJPM0Ysc0RBQVEsQ0FBQyxFQUFELENBOUJmO0FBQUEsTUE4QjVCNEYsYUE5QjRCO0FBQUEsTUE4QmJDLGdCQTlCYTs7QUFBQSxvQkErQkw3RixzREFBUSxDQUFDLFNBQUQsQ0EvQkg7QUFBQSxNQStCNUI4RixPQS9CNEI7QUFBQSxNQStCbkJDLFVBL0JtQjs7QUFBQSxvQkFnQ0QvRixzREFBUSxDQUFDLEVBQUQsQ0FoQ1A7QUFBQSxNQWdDNUJnRyxTQWhDNEI7QUFBQSxNQWdDakJDLFlBaENpQjs7QUFBQSxvQkFpQ1BqRyxzREFBUSxDQUFDLEVBQUQsQ0FqQ0Q7QUFBQSxNQWlDNUJrRyxNQWpDNEI7QUFBQSxNQWlDcEJDLFNBakNvQjs7QUFBQSxvQkFrQ1BuRyxzREFBUSxDQUFDLEVBQUQsQ0FsQ0Q7QUFBQSxNQWtDNUJvRyxNQWxDNEI7QUFBQSxNQWtDcEJDLFNBbENvQjs7QUFBQSxvQkFtQ0RyRyxzREFBUSxDQUFDLEVBQUQsQ0FuQ1A7QUFBQSxNQW1DNUJzRyxTQW5DNEI7QUFBQSxNQW1DakJDLFlBbkNpQjs7QUFBQSxvQkFvQ1B2RyxzREFBUSxDQUFDLEVBQUQsQ0FwQ0Q7QUFBQSxNQW9DNUJ3RyxNQXBDNEI7QUFBQSxNQW9DcEJDLFNBcENvQjs7QUFBQSxvQkFxQ1N6RyxzREFBUSxDQUFDLEVBQUQsQ0FyQ2pCO0FBQUEsTUFxQzVCMEcsY0FyQzRCO0FBQUEsTUFxQ1pDLGlCQXJDWTs7QUFBQSxvQkFzQ08zRyxzREFBUSxDQUFDLEVBQUQsQ0F0Q2Y7QUFBQSxNQXNDNUI0RyxhQXRDNEI7QUFBQSxNQXNDYkMsZ0JBdENhOztBQUFBLG9CQXVDQzdHLHNEQUFRLENBQUMsS0FBRCxDQXZDVDtBQUFBLE1BdUM1QjhHLFVBdkM0QjtBQUFBLE1BdUNoQkMsYUF2Q2dCOztBQUFBLG9CQXdDSC9HLHNEQUFRLENBQUMsRUFBRCxDQXhDTDtBQUFBLE1Bd0M1QmdILFFBeEM0QjtBQUFBLE1Bd0NsQkMsV0F4Q2tCOztBQUFBLG9CQXlDaUJqSCxzREFBUSxDQUFDLEtBQUQsQ0F6Q3pCO0FBQUEsTUF5QzVCa0gsa0JBekM0QjtBQUFBLE1BeUNSQyxxQkF6Q1E7O0FBMkNuQyxNQUFNQyxNQUFNLEdBQUdDLDZEQUFTLEVBQXhCO0FBQ0EsTUFBTUMsU0FBUyxHQUFHLENBQUMsTUFBRCxFQUFTLE1BQVQsRUFBaUIsS0FBakIsRUFBd0IsS0FBeEIsRUFBK0IsS0FBL0IsQ0FBbEI7QUFDQSxNQUFNQyxjQUFjLEdBQUcsQ0FBQyxNQUFELEVBQVMsTUFBVCxFQUFpQixJQUFqQixFQUF1QixJQUF2QixFQUE2QixJQUE3QixDQUF2QjtBQUNBLE1BQU1DLGFBQWEsR0FBRyxDQUFDLEtBQUQsRUFBUSxLQUFSLEVBQWUsS0FBZixFQUFzQixLQUF0QixFQUE2QixLQUE3QixFQUFvQyxLQUFwQyxDQUF0Qjs7QUFFQSxXQUFTQyxZQUFULENBQXNCQyxVQUF0QixFQUFrQ0MsV0FBbEMsRUFBK0NDLE1BQS9DLEVBQXVEO0FBQ3JELFdBQU9GLFVBQVUsQ0FBQ0csR0FBWCxDQUFlLFVBQUNDLElBQUQsRUFBT0MsQ0FBUCxFQUFhO0FBQ2pDLFVBQUlBLENBQUMsS0FBS0osV0FBVixFQUF1QixPQUFPRyxJQUFQLENBRFUsQ0FDRzs7QUFDcEMsVUFBTUUsS0FBSyxHQUFHSixNQUFNLEdBQUcsSUFBSCxHQUFVLElBQTlCO0FBQ0EsdUJBQVVFLElBQVYsU0FBaUJFLEtBQWpCO0FBQ0QsS0FKTSxDQUFQO0FBS0Q7O0FBdERrQyxvQkF5RFBoSSxzREFBUSxDQUFDc0gsU0FBRCxDQXpERDtBQUFBLE1BeUQ1QlcsTUF6RDRCO0FBQUEsTUF5RHBCQyxTQXpEb0I7O0FBQUEsb0JBMEREbEksc0RBQVEsQ0FBQ3dILGFBQUQsQ0ExRFA7QUFBQSxNQTBENUJXLFNBMUQ0QjtBQUFBLE1BMERqQkMsWUExRGlCOztBQUFBLG9CQTJEQ3BJLHNEQUFRLENBQUMsSUFBRCxDQTNEVDtBQUFBLE1BMkQ1QnFJLFVBM0Q0QjtBQUFBLE1BMkRoQkMsYUEzRGdCOztBQUFBLG9CQTRET3RJLHNEQUFRLENBQUMsSUFBRCxDQTVEZjtBQUFBLE1BNEQ1QnVJLGFBNUQ0QjtBQUFBLE1BNERiQyxnQkE1RGE7O0FBQUEsb0JBNkRYeEksc0RBQVEsQ0FBQyxJQUFELENBN0RHO0FBQUEsTUE2RDVCeUksSUE3RDRCO0FBQUEsTUE2RHRCQyxPQTdEc0I7O0FBQUEsb0JBOERYMUksc0RBQVEsQ0FBQyxJQUFELENBOURHO0FBQUEsTUE4RDVCMkksSUE5RDRCO0FBQUEsTUE4RHRCQyxPQTlEc0I7O0FBQUEsb0JBK0RDNUksc0RBQVEsQ0FBQyxLQUFELENBL0RUO0FBQUEsTUErRDVCNkksVUEvRDRCO0FBQUEsTUErRGhCQyxhQS9EZ0I7O0FBQUEsb0JBZ0VYOUksc0RBQVEsQ0FBQyxDQUFELENBaEVHO0FBQUEsTUFnRTVCK0ksSUFoRTRCO0FBQUEsTUFnRXRCQyxPQWhFc0I7O0FBQUEsb0JBaUVHaEosc0RBQVEsQ0FBQyxFQUFELENBakVYO0FBQUEsTUFpRTVCaUosV0FqRTRCO0FBQUEsTUFpRWZDLGNBakVlOztBQUFBLG9CQWtFR2xKLHNEQUFRLENBQUMsS0FBRCxDQWxFWDtBQUFBLE1Ba0U1Qm1KLFdBbEU0QjtBQUFBLE1Ba0VmQyxjQWxFZTs7QUFtRW5DLE1BQU1DLFFBQVEsR0FBR0Msb0RBQU0sQ0FBQyxDQUFELENBQXZCO0FBQ0EsTUFBTUMsZ0JBQWdCLEdBQUdELG9EQUFNLENBQUMsS0FBRCxDQUEvQjs7QUFwRW1DLG9CQXFFQ3RKLHNEQUFRLENBQUMsQ0FBRCxDQXJFVDtBQUFBLE1BcUU1QndKLFVBckU0QjtBQUFBLE1BcUVoQkMsYUFyRWdCOztBQUFBLG9CQXNFRHpKLHNEQUFRLENBQUMsSUFBRCxDQXRFUDtBQUFBLE1Bc0U1QjBKLFNBdEU0QjtBQUFBLE1Bc0VqQkMsWUF0RWlCOztBQXVFbkMsTUFBTUMsWUFBWSxHQUFHTixvREFBTSxDQUFDLElBQUQsQ0FBM0I7QUFDQSxNQUFNTyxZQUFZLEdBQUdQLG9EQUFNLENBQUMsRUFBRCxDQUEzQjtBQUNBLE1BQU1RLGVBQWUsR0FBR1Isb0RBQU0sQ0FBQyxFQUFELENBQTlCO0FBRUEsTUFBTVMsZUFBZSxHQUFHLEtBQXhCO0FBQ0EsTUFBTUMsVUFBVSxHQUFHQyxxREFBTyxDQUN4QjtBQUFBLFdBQU1DLEtBQUssQ0FBQ0MsSUFBTixDQUFXO0FBQUVsSixZQUFNLEVBQUU7QUFBVixLQUFYLEVBQTJCLFVBQUNtSixDQUFELEVBQUlyQyxDQUFKO0FBQUEsYUFBVXRHLE1BQU0sQ0FBQzRJLFlBQVAsQ0FBb0IsS0FBS3RDLENBQXpCLENBQVY7QUFBQSxLQUEzQixDQUFOO0FBQUEsR0FEd0IsRUFFeEIsRUFGd0IsQ0FBMUI7QUFJQSxNQUFNdUMsVUFBVSxHQUFHTCxxREFBTyxDQUN4QjtBQUFBLFdBQU1DLEtBQUssQ0FBQ0MsSUFBTixDQUFXO0FBQUVsSixZQUFNLEVBQUU7QUFBVixLQUFYLEVBQTJCLFVBQUNtSixDQUFELEVBQUlyQyxDQUFKO0FBQUEsYUFBVUEsQ0FBQyxHQUFHLENBQWQ7QUFBQSxLQUEzQixDQUFOO0FBQUEsR0FEd0IsRUFFeEIsRUFGd0IsQ0FBMUI7QUFLQSxNQUFNd0MsZ0JBQWdCLEdBQUdDLHlEQUFXLGtUQUFDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUMvQnRELGtCQUQrQjtBQUFBO0FBQUE7QUFBQTs7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFHZnVELDBEQUFRLENBQ3ZCQyxTQURlLEdBRWZDLFVBRmUsQ0FFSixXQUZJLEVBR2ZDLEdBSGUsQ0FHWCxXQUhXLEVBSWZDLEdBSmUsRUFIZTs7QUFBQTtBQUczQkQsZUFIMkI7QUFRM0JFLGdCQVIyQixHQVFwQkYsR0FBRyxDQUFDRSxJQUFKLE1BQWMsRUFSTTtBQVNqQ25GLCtCQUFtQixDQUFDbUYsSUFBSSxDQUFDQyxNQUFMLElBQWUsRUFBaEIsQ0FBbkI7QUFDQWxGLDRCQUFnQixDQUFDaUYsSUFBSSxDQUFDRSxPQUFMLElBQWdCLEVBQWpCLENBQWhCO0FBQ0E3RCxpQ0FBcUIsQ0FBQyxJQUFELENBQXJCO0FBWGlDO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBYWpDOEQsbUJBQU8sQ0FBQ0MsS0FBUixDQUFjLDhCQUFkO0FBQ0FqRSx1QkFBVyxDQUFDLHFDQUFELENBQVg7O0FBZGlDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQUQsSUFnQmpDLENBQUNDLGtCQUFELENBaEJpQyxDQUFwQztBQWtCQSxNQUFNaUUsc0JBQXNCLEdBQUdYLHlEQUFXLENBQ3hDLFVBQUNZLFFBQUQsRUFBYztBQUNaLFFBQU1DLEtBQUssR0FBR3pGLGFBQUgsYUFBR0EsYUFBSCx1QkFBR0EsYUFBYSxDQUFHd0YsUUFBSCxDQUEzQjs7QUFDQSxRQUFJbEIsS0FBSyxDQUFDb0IsT0FBTixDQUFjRCxLQUFkLEtBQXdCQSxLQUFLLENBQUNwSyxNQUFOLElBQWdCLENBQTVDLEVBQStDO0FBQzdDLFVBQU1zSyxJQUFJLEdBQUdDLFFBQVEsQ0FBQ0gsS0FBSyxDQUFDLENBQUQsQ0FBTixFQUFXLEVBQVgsQ0FBckI7QUFDQSxVQUFNSSxJQUFJLEdBQUdELFFBQVEsQ0FBQ0gsS0FBSyxDQUFDLENBQUQsQ0FBTixFQUFXLEVBQVgsQ0FBckI7QUFDQSxhQUFPO0FBQ0xFLFlBQUksRUFBRUcsTUFBTSxDQUFDQyxRQUFQLENBQWdCSixJQUFoQixJQUF3QkEsSUFBeEIsR0FBK0IsQ0FEaEM7QUFFTEUsWUFBSSxFQUFFQyxNQUFNLENBQUNDLFFBQVAsQ0FBZ0JGLElBQWhCLElBQXdCQSxJQUF4QixHQUErQjtBQUZoQyxPQUFQO0FBSUQ7O0FBQ0QsV0FBTztBQUFFRixVQUFJLEVBQUUsQ0FBUjtBQUFXRSxVQUFJLEVBQUU7QUFBakIsS0FBUDtBQUNELEdBWnVDLEVBYXhDLENBQUM3RixhQUFELENBYndDLENBQTFDO0FBZ0JBLE1BQU1nRyxnQkFBZ0IsR0FBR3BCLHlEQUFXO0FBQUEsb1RBQUMsa0JBQU9ZLFFBQVA7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsa0JBQzlCQSxRQUQ4QjtBQUFBO0FBQUE7QUFBQTs7QUFBQTs7QUFBQTtBQUVuQ3JFLDJCQUFhLENBQUMsSUFBRCxDQUFiO0FBQ0FFLHlCQUFXLENBQUMsRUFBRCxDQUFYO0FBSG1DO0FBQUE7QUFBQSxxQkFLZHdELDBEQUFRLENBQ3hCQyxTQURnQixHQUVoQkMsVUFGZ0IsQ0FFTCxNQUZLLEVBR2hCa0IsS0FIZ0IsQ0FHVix3QkFIVSxFQUdnQixJQUhoQixFQUdzQlQsUUFIdEIsRUFJaEJQLEdBSmdCLEVBTGM7O0FBQUE7QUFLM0JpQixrQkFMMkI7QUFXM0JDLHlCQVgyQixHQVdiLEVBWGE7QUFZM0JDLHdCQVoyQixHQVlkLEVBWmM7QUFhakNGLGtCQUFJLENBQUNHLE9BQUwsQ0FBYSxVQUFDckIsR0FBRCxFQUFTO0FBQUE7O0FBQ3BCLG9CQUFNc0IsR0FBRyxHQUFHLGNBQUF0QixHQUFHLENBQUNFLElBQUosMERBQVlxQixlQUFaLEtBQStCLEVBQTNDO0FBQ0Esb0JBQUlDLEdBQUcsbUJBQUdGLEdBQUcsQ0FBQ0csT0FBUCxpREFBRyxhQUFhQyxNQUF2QjtBQUNBLG9CQUFJQyxHQUFHLG9CQUFHTCxHQUFHLENBQUNHLE9BQVAsa0RBQUcsY0FBYUcsTUFBdkI7O0FBQ0Esb0JBQUksQ0FBQyxDQUFDSixHQUFELElBQVEsQ0FBQ0csR0FBVixLQUFrQixPQUFPTCxHQUFHLENBQUNHLE9BQVgsS0FBdUIsUUFBN0MsRUFBdUQ7QUFDckQsc0JBQU1JLE9BQU8sR0FBR1AsR0FBRyxDQUFDRyxPQUFKLENBQVl0SyxJQUFaLEVBQWhCO0FBQ0FxSyxxQkFBRyxHQUFHSyxPQUFPLENBQUNDLEtBQVIsQ0FBYyxDQUFkLEVBQWlCLENBQWpCLENBQU47QUFDQUgscUJBQUcsR0FBR0UsT0FBTyxDQUFDQyxLQUFSLENBQWMsQ0FBZCxDQUFOO0FBQ0Q7O0FBQ0Qsb0JBQUlILEdBQUcsS0FBS0ksU0FBUixJQUFxQkosR0FBRyxLQUFLLElBQWpDLEVBQXVDO0FBQ3JDQSxxQkFBRyxHQUFHOUssTUFBTSxDQUFDOEssR0FBRCxDQUFaO0FBQ0Q7O0FBQ0Qsb0JBQU1LLE1BQU0sR0FBR1YsR0FBRyxDQUFDVSxNQUFuQjtBQUNBLG9CQUFNQyxHQUFHLEdBQUdYLEdBQUcsQ0FBQ1csR0FBaEI7QUFDQSxvQkFBSSxDQUFDVCxHQUFELElBQVEsQ0FBQ0csR0FBYixFQUFrQjtBQUNsQixvQkFBTU8sT0FBTyxhQUFNVixHQUFOLGNBQWFHLEdBQWIsQ0FBYjs7QUFDQSxvQkFBSUssTUFBTSxLQUFLRCxTQUFYLElBQXdCQyxNQUFNLEtBQUssSUFBbkMsSUFBMkMsVUFBR0EsTUFBSCxNQUFnQixFQUEvRCxFQUFtRTtBQUNqRSxzQkFBSSxDQUFDYixXQUFXLENBQUNlLE9BQUQsQ0FBaEIsRUFBMkJmLFdBQVcsQ0FBQ2UsT0FBRCxDQUFYLEdBQXVCLElBQUlDLEdBQUosRUFBdkI7QUFDM0JoQiw2QkFBVyxDQUFDZSxPQUFELENBQVgsQ0FBcUJFLEdBQXJCLENBQXlCdkwsTUFBTSxDQUFDbUwsTUFBRCxDQUEvQjs7QUFDQSxzQkFBSUMsR0FBRyxLQUFLRixTQUFSLElBQXFCRSxHQUFHLEtBQUssSUFBN0IsSUFBcUMsVUFBR0EsR0FBSCxNQUFhLEVBQXRELEVBQTBEO0FBQ3hELHdCQUFNSSxTQUFTLGFBQU1ILE9BQU4sZUFBa0JGLE1BQWxCLENBQWY7QUFDQSx3QkFBSSxDQUFDWixVQUFVLENBQUNpQixTQUFELENBQWYsRUFBNEJqQixVQUFVLENBQUNpQixTQUFELENBQVYsR0FBd0IsSUFBSUYsR0FBSixFQUF4QjtBQUM1QmYsOEJBQVUsQ0FBQ2lCLFNBQUQsQ0FBVixDQUFzQkQsR0FBdEIsQ0FBMEJ2TCxNQUFNLENBQUNvTCxHQUFELENBQWhDO0FBQ0Q7QUFDRjtBQUNGLGVBekJEO0FBMkJNSyxxQkF4QzJCLEdBd0NqQixFQXhDaUI7QUF5Q2pDQyxvQkFBTSxDQUFDQyxJQUFQLENBQVlyQixXQUFaLEVBQXlCRSxPQUF6QixDQUFpQyxVQUFDL0osR0FBRCxFQUFTO0FBQ3hDZ0wsdUJBQU8sQ0FBQ2hMLEdBQUQsQ0FBUCxHQUFlZ0ksS0FBSyxDQUFDQyxJQUFOLENBQVc0QixXQUFXLENBQUM3SixHQUFELENBQXRCLEVBQTZCbUwsSUFBN0IsQ0FDYixVQUFDQyxDQUFELEVBQUlDLENBQUo7QUFBQSx5QkFBVTdCLE1BQU0sQ0FBQzRCLENBQUQsQ0FBTixHQUFZNUIsTUFBTSxDQUFDNkIsQ0FBRCxDQUE1QjtBQUFBLGlCQURhLENBQWY7QUFHRCxlQUpEO0FBTU1DLHVCQS9DMkIsR0ErQ2YsRUEvQ2U7QUFnRGpDTCxvQkFBTSxDQUFDQyxJQUFQLENBQVlwQixVQUFaLEVBQXdCQyxPQUF4QixDQUFnQyxVQUFDL0osR0FBRCxFQUFTO0FBQ3ZDc0wseUJBQVMsQ0FBQ3RMLEdBQUQsQ0FBVCxHQUFpQmdJLEtBQUssQ0FBQ0MsSUFBTixDQUFXNkIsVUFBVSxDQUFDOUosR0FBRCxDQUFyQixFQUE0Qm1MLElBQTVCLENBQ2YsVUFBQ0MsQ0FBRCxFQUFJQyxDQUFKO0FBQUEseUJBQVU3QixNQUFNLENBQUM0QixDQUFELENBQU4sR0FBWTVCLE1BQU0sQ0FBQzZCLENBQUQsQ0FBNUI7QUFBQSxpQkFEZSxDQUFqQjtBQUdELGVBSkQ7QUFNQTVHLCtCQUFpQixDQUFDdUcsT0FBRCxDQUFqQjtBQUNBckcsOEJBQWdCLENBQUMyRyxTQUFELENBQWhCO0FBdkRpQztBQUFBOztBQUFBO0FBQUE7QUFBQTtBQXlEakN2QyxxQkFBTyxDQUFDQyxLQUFSLENBQWMsOEJBQWQ7QUFDQWpFLHlCQUFXLENBQUMsK0JBQUQsQ0FBWDs7QUExRGlDO0FBQUE7QUE0RGpDRiwyQkFBYSxDQUFDLEtBQUQsQ0FBYjtBQTVEaUM7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FBRDs7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQThEakMsRUE5RGlDLENBQXBDOztBQWdFQSxNQUFNMEcsT0FBTztBQUFBLG9UQUFHO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDZHhHLHlCQUFXLENBQUMsRUFBRCxDQUFYO0FBRGM7QUFBQSxxQkFFUnNELGdCQUFnQixFQUZSOztBQUFBO0FBR2Qsa0JBQUl2RSxTQUFKLEVBQWU7QUFDYkQsMEJBQVUsQ0FBQyxNQUFELENBQVY7QUFDQTZGLGdDQUFnQixDQUFDNUYsU0FBRCxDQUFoQjtBQUNELGVBSEQsTUFHTztBQUNMRCwwQkFBVSxDQUFDLFNBQUQsQ0FBVjtBQUNEOztBQUNETix3QkFBVSxDQUFDLElBQUQsQ0FBVjs7QUFUYztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUFIOztBQUFBLG9CQUFQZ0ksT0FBTztBQUFBO0FBQUE7QUFBQSxLQUFiOztBQVlBLE1BQU1DLHFCQUFxQixHQUFHLFNBQXhCQSxxQkFBd0IsQ0FBQ3RDLFFBQUQsRUFBYztBQUMxQ25GLGdCQUFZLENBQUNtRixRQUFELENBQVo7QUFDQWpGLGFBQVMsQ0FBQyxFQUFELENBQVQ7QUFDQUUsYUFBUyxDQUFDLEVBQUQsQ0FBVDtBQUNBRSxnQkFBWSxDQUFDLEVBQUQsQ0FBWjtBQUNBRSxhQUFTLENBQUMsRUFBRCxDQUFUO0FBQ0FWLGNBQVUsQ0FBQyxNQUFELENBQVY7QUFDQTZGLG9CQUFnQixDQUFDUixRQUFELENBQWhCO0FBQ0QsR0FSRDs7QUFVQSxNQUFNdUMsbUJBQW1CLEdBQUcsU0FBdEJBLG1CQUFzQixDQUFDQyxTQUFELEVBQVlDLFNBQVosRUFBMEI7QUFDcEQxSCxhQUFTLENBQUN5SCxTQUFELENBQVQ7QUFDQXZILGFBQVMsQ0FBQ3dILFNBQUQsQ0FBVDtBQUNBdEgsZ0JBQVksQ0FBQyxFQUFELENBQVo7QUFDQUUsYUFBUyxDQUFDLEVBQUQsQ0FBVDtBQUNBVixjQUFVLENBQUMsU0FBRCxDQUFWO0FBQ0QsR0FORDs7QUFRQSxNQUFNK0gscUJBQXFCLEdBQUcsU0FBeEJBLHFCQUF3QixDQUFDQyxRQUFELEVBQWM7QUFDMUN4SCxnQkFBWSxDQUFDd0gsUUFBRCxDQUFaO0FBQ0F0SCxhQUFTLENBQUMsRUFBRCxDQUFUO0FBQ0FWLGNBQVUsQ0FBQyxNQUFELENBQVY7QUFDRCxHQUpEOztBQU1BLE1BQU1pSSxrQkFBa0IsR0FBRyxTQUFyQkEsa0JBQXFCLENBQUNDLEtBQUQsRUFBVztBQUNwQ3hILGFBQVMsQ0FBQ3dILEtBQUQsQ0FBVDtBQUNELEdBRkQ7O0FBSUEsTUFBTUMsYUFBYSxHQUFHLFNBQWhCQSxhQUFnQixHQUFNO0FBQzFCLFFBQUlwSSxPQUFPLEtBQUssTUFBaEIsRUFBd0I7QUFDdEJXLGVBQVMsQ0FBQyxFQUFELENBQVQ7QUFDQVYsZ0JBQVUsQ0FBQyxTQUFELENBQVY7QUFDRCxLQUhELE1BSUssSUFBSUQsT0FBTyxLQUFLLFNBQWhCLEVBQTJCQyxVQUFVLENBQUMsTUFBRCxDQUFWLENBQTNCLEtBQ0EsSUFBSUQsT0FBTyxLQUFLLE1BQWhCLEVBQXdCQyxVQUFVLENBQUMsU0FBRCxDQUFWO0FBQzlCLEdBUEQ7O0FBU0EsTUFBTW9JLGFBQWEsR0FBRyxTQUFoQkEsYUFBZ0IsR0FBb0I7QUFBQTs7QUFBQSxRQUFuQkMsU0FBbUIsdUVBQVAsRUFBTztBQUN4QyxRQUFNQyxNQUFNLEdBQUcsSUFBSUMsZUFBSixFQUFmO0FBQ0EsUUFBTUMsV0FBVyx3QkFBR0gsU0FBUyxDQUFDSSxNQUFiLGlFQUF1QnhJLFNBQXhDO0FBQ0EsUUFBTXlJLFdBQVcsNEJBQUdMLFNBQVMsQ0FBQ00sYUFBYix5RUFBOEJ4SSxNQUEvQztBQUNBLFFBQU15SSxXQUFXLDRCQUFHUCxTQUFTLENBQUNRLGFBQWIseUVBQThCeEksTUFBL0M7QUFDQSxRQUFNeUksV0FBVyx3QkFBR1QsU0FBUyxDQUFDeEIsTUFBYixpRUFBdUJ0RyxTQUF4QztBQUNBLFFBQU13SSxRQUFRLCtCQUFHVixTQUFTLENBQUN2QixHQUFiLDJEQUFvQnJHLE1BQXBCLDJDQUE4QixFQUE1QztBQUVBLFFBQUkrSCxXQUFKLEVBQWlCRixNQUFNLENBQUNVLEdBQVAsQ0FBVyxRQUFYLEVBQXFCUixXQUFyQjtBQUNqQixRQUFJRSxXQUFKLEVBQWlCSixNQUFNLENBQUNVLEdBQVAsQ0FBVyxlQUFYLEVBQTRCTixXQUE1QjtBQUNqQixRQUFJRSxXQUFKLEVBQWlCTixNQUFNLENBQUNVLEdBQVAsQ0FBVyxlQUFYLEVBQTRCSixXQUE1QjtBQUNqQixRQUFJRSxXQUFKLEVBQWlCUixNQUFNLENBQUNVLEdBQVAsQ0FBVyxRQUFYLEVBQXFCRixXQUFyQjtBQUNqQixRQUFJQyxRQUFKLEVBQWNULE1BQU0sQ0FBQ1UsR0FBUCxDQUFXLEtBQVgsRUFBa0JELFFBQWxCO0FBRWQsUUFBTUUsS0FBSyxHQUFHWCxNQUFNLENBQUNZLFFBQVAsRUFBZDtBQUNBN0gsVUFBTSxDQUFDOEgsSUFBUCwrQ0FDeUNGLEtBQUssY0FBT0EsS0FBUCxJQUFpQixFQUQvRDtBQUdELEdBbEJEOztBQW9CQSxNQUFNRyxzQkFBc0IsR0FBRzNFLHlEQUFXLGtUQUFDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFPNEUsa0JBQVAsOERBQWdCLEVBQWhCOztBQUFBLGlCQUNyQzdGLGdCQUFnQixDQUFDOEYsT0FEb0I7QUFBQTtBQUFBO0FBQUE7O0FBQUE7O0FBQUE7QUFBQTs7QUFHakNDLG1CQUhpQyxHQUd2QkMsTUFBTSxDQUFDQyxZQUFQLENBQW9CQyxPQUFwQixDQUE0QixzQkFBNUIsQ0FIdUI7O0FBQUEsa0JBSW5DSCxPQUFPLElBQUk3TyxJQUFJLENBQUNpUCxHQUFMLEtBQWFoRSxNQUFNLENBQUM0RCxPQUFELENBQW5CLEdBQStCLEtBQUssRUFBTCxHQUFVLEVBQVYsR0FBZSxJQUp0QjtBQUFBO0FBQUE7QUFBQTs7QUFBQTs7QUFBQTtBQVN6Qy9GLDRCQUFnQixDQUFDOEYsT0FBakIsR0FBMkIsSUFBM0I7QUFDTU0sY0FWbUMsR0FVOUJsRiwwREFBUSxDQUFDQyxTQUFULEVBVjhCO0FBV3JDa0YsbUJBWHFDLEdBVzNCLElBWDJCOztBQWFuQ0MsdUJBYm1DLEdBYXJCLFNBQWRBLFdBQWMsQ0FBQ3ZDLENBQUQsRUFBSUMsQ0FBSixFQUFVO0FBQzVCLGtCQUFJRCxDQUFDLENBQUNyTSxNQUFGLEtBQWFzTSxDQUFDLENBQUN0TSxNQUFuQixFQUEyQixPQUFPLEtBQVA7QUFDM0Isa0JBQU02TyxJQUFJLEdBQUcsSUFBSS9DLEdBQUosQ0FBUU8sQ0FBUixDQUFiO0FBQ0Esa0JBQU15QyxJQUFJLEdBQUcsSUFBSWhELEdBQUosQ0FBUVEsQ0FBUixDQUFiO0FBQ0Esa0JBQUl1QyxJQUFJLENBQUNFLElBQUwsS0FBY0QsSUFBSSxDQUFDQyxJQUF2QixFQUE2QixPQUFPLEtBQVA7O0FBSkQseURBS1pGLElBTFk7QUFBQTs7QUFBQTtBQUs1QjtBQUFBLHNCQUFXRyxDQUFYO0FBQXNCLHNCQUFJLENBQUNGLElBQUksQ0FBQ0csR0FBTCxDQUFTRCxDQUFULENBQUwsRUFBa0IsT0FBTyxLQUFQO0FBQXhDO0FBTDRCO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBTTVCLHFCQUFPLElBQVA7QUFDRCxhQXBCd0M7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUF3QmpDakIsMkJBeEJpQyxHQXdCekJXLEVBQUUsQ0FDWGhGLFVBRFMsQ0FDRSxNQURGLEVBRVR3RixPQUZTLENBRUQxRiwwREFBUSxDQUFDQyxTQUFULENBQW1CMEYsU0FBbkIsQ0FBNkJDLFVBQTdCLEVBRkMsRUFHVEMsS0FIUyxDQUdILEdBSEcsQ0F4QnlCO0FBNEJyQywwQkFBSVYsT0FBSixFQUFhWixLQUFLLEdBQUdBLEtBQUssQ0FBQ3VCLFVBQU4sQ0FBaUJYLE9BQWpCLENBQVI7QUE1QndCO0FBQUEsNkJBOEJsQlosS0FBSyxDQUFDbkUsR0FBTixFQTlCa0I7O0FBQUE7QUE4Qi9CaUIsMEJBOUIrQjs7QUFBQSwyQkErQmpDQSxJQUFJLENBQUMwRSxLQS9CNEI7QUFBQTtBQUFBO0FBQUE7O0FBQUE7O0FBQUE7QUFpQy9CQywyQkFqQytCLEdBaUN2QmQsRUFBRSxDQUFDYyxLQUFILEVBakN1QjtBQWtDakNDLDRCQWxDaUMsR0FrQ3hCLENBbEN3QjtBQW9DckM1RSwwQkFBSSxDQUFDNkUsSUFBTCxDQUFVMUUsT0FBVixDQUFrQixVQUFDckIsR0FBRCxFQUFTO0FBQ3pCLDRCQUFNRSxJQUFJLEdBQUdGLEdBQUcsQ0FBQ0UsSUFBSixNQUFjLEVBQTNCO0FBQ0EsNEJBQU1qTCxJQUFJLEdBQUcsT0FBT2lMLElBQUksQ0FBQ2pMLElBQVosS0FBcUIsUUFBckIsR0FBZ0NpTCxJQUFJLENBQUNqTCxJQUFyQyxHQUE0QyxFQUF6RDtBQUNBLDRCQUFNK1EsU0FBUyxHQUFHL1EsSUFBSSxDQUFDaUMsV0FBTCxFQUFsQjtBQUNBLDRCQUFNK08sVUFBVSxHQUFHQyw4RUFBZSxDQUFDalIsSUFBRCxDQUFsQztBQUNBLDRCQUFNa1IsY0FBYyxHQUFHN0csS0FBSyxDQUFDb0IsT0FBTixDQUFjUixJQUFJLENBQUMrRixVQUFuQixJQUNuQjNHLEtBQUssQ0FBQ0MsSUFBTixDQUFXLElBQUk0QyxHQUFKLENBQVFqQyxJQUFJLENBQUMrRixVQUFMLENBQWdCaEosR0FBaEIsQ0FBb0IsVUFBQ29JLENBQUQ7QUFBQSxpQ0FBT3hPLE1BQU0sQ0FBQ3dPLENBQUQsQ0FBYjtBQUFBLHlCQUFwQixDQUFSLENBQVgsQ0FEbUIsR0FFbkIsRUFGSjtBQUlBLDRCQUFNZSxXQUFXLEdBQ2ZsRyxJQUFJLENBQUM4RixTQUFMLEtBQW1CQSxTQUFuQixJQUNBLENBQUNmLFdBQVcsQ0FBQ2tCLGNBQUQsRUFBaUJGLFVBQWpCLENBRmQ7O0FBSUEsNEJBQUlHLFdBQUosRUFBaUI7QUFDZlAsK0JBQUssQ0FBQ1EsTUFBTixDQUFhckcsR0FBRyxDQUFDc0csR0FBakIsRUFBc0I7QUFBRU4scUNBQVMsRUFBVEEsU0FBRjtBQUFhQyxzQ0FBVSxFQUFWQTtBQUFiLDJCQUF0QjtBQUNBSCxnQ0FBTSxJQUFJLENBQVY7QUFDRDtBQUNGLHVCQWpCRDs7QUFwQ3FDLDRCQXVEakNBLE1BQU0sR0FBRyxDQXZEd0I7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQSw2QkF3RDdCRCxLQUFLLENBQUNVLE1BQU4sRUF4RDZCOztBQUFBO0FBMkRyQ3ZCLDZCQUFPLEdBQUc5RCxJQUFJLENBQUM2RSxJQUFMLENBQVU3RSxJQUFJLENBQUM2RSxJQUFMLENBQVUxUCxNQUFWLEdBQW1CLENBQTdCLENBQVY7QUEzRHFDO0FBQUEsNkJBNEQvQixJQUFJekIsT0FBSixDQUFZLFVBQUNDLE9BQUQ7QUFBQSwrQkFBYUMsVUFBVSxDQUFDRCxPQUFELEVBQVUsRUFBVixDQUF2QjtBQUFBLHVCQUFaLENBNUQrQjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBK0R2QyxzQkFBbUM7QUFDakM4UCxvQkFBTSxDQUFDQyxZQUFQLENBQW9CNEIsT0FBcEIsQ0FDRSxzQkFERixFQUVFM1AsTUFBTSxDQUFDaEIsSUFBSSxDQUFDaVAsR0FBTCxFQUFELENBRlI7QUFJRDs7QUFwRXNDO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBc0V2Q3pFLG1CQUFPLENBQUNDLEtBQVIsQ0FBYyw2QkFBZCxFQUE2Q2tFLE1BQTdDOztBQXRFdUM7QUFBQTtBQXdFdkM3Riw0QkFBZ0IsQ0FBQzhGLE9BQWpCLEdBQTJCLEtBQTNCO0FBeEV1Qzs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFELElBMEV2QyxFQTFFdUMsQ0FBMUM7QUE0RUEsTUFBTWdDLFdBQVcsR0FBRyxDQUFDak4sTUFBTSxJQUFJLEVBQVgsRUFBZXRDLFdBQWYsR0FBNkJDLElBQTdCLEVBQXBCO0FBQ0EsTUFBTXVQLGdCQUFnQixHQUNwQkMsT0FBTyxDQUFDak4sV0FBRCxDQUFQLElBQ0FpTixPQUFPLENBQUMvTSxnQkFBRCxDQURQLElBRUErTSxPQUFPLENBQUNoSixhQUFELENBRlAsSUFHQWdKLE9BQU8sQ0FBQzdNLGtCQUFELENBSFAsSUFJQTZNLE9BQU8sQ0FBQ3pNLHFCQUFELENBSlAsSUFLQXlNLE9BQU8sQ0FBQ0YsV0FBRCxDQU5UOztBQVFBLE1BQU1HLFlBQVksR0FBRyxTQUFmQSxZQUFlLENBQUNqUixLQUFELEVBQVFrUixDQUFSLEVBQWM7QUFDakMsUUFBSSxDQUFDbFIsS0FBTCxFQUFZLE9BQU8sS0FBUDs7QUFDWixRQUFJMkosS0FBSyxDQUFDb0IsT0FBTixDQUFjL0ssS0FBZCxDQUFKLEVBQTBCO0FBQ3hCLGFBQU9BLEtBQUssQ0FBQ21SLElBQU4sQ0FBVyxVQUFDekIsQ0FBRDtBQUFBLGVBQU91QixZQUFZLENBQUN2QixDQUFELEVBQUl3QixDQUFKLENBQW5CO0FBQUEsT0FBWCxDQUFQO0FBQ0Q7O0FBQ0QsV0FBT2hRLE1BQU0sQ0FBQ2xCLEtBQUQsQ0FBTixDQUFjdUIsV0FBZCxHQUE0QjZQLFFBQTVCLENBQXFDRixDQUFyQyxDQUFQO0FBQ0QsR0FORDs7QUFRQSxNQUFNRyxjQUFjLEdBQUdwSCx5REFBVyxDQUNoQyxVQUFDdkksSUFBRCxFQUFVO0FBQ1I7QUFDQSxRQUFJLENBQUFBLElBQUksU0FBSixJQUFBQSxJQUFJLFdBQUosWUFBQUEsSUFBSSxDQUFFNFAsT0FBTixNQUFrQixLQUF0QixFQUE2QixPQUFPLEtBQVAsQ0FGckIsQ0FJUjs7QUFDQSxRQUFNQyxHQUFHLEdBQUc5UCxlQUFlLENBQUNDLElBQUQsRUFBTyxLQUFQLENBQTNCO0FBQ0EsUUFBTThQLFFBQVEsR0FBRy9QLGVBQWUsQ0FBQ0MsSUFBRCxFQUFPLFVBQVAsQ0FBaEM7QUFDQSxRQUFNK1AsS0FBSyxHQUFHaFEsZUFBZSxDQUFDQyxJQUFELEVBQU8sT0FBUCxDQUE3Qjs7QUFFQSxRQUFJcUMsV0FBVyxJQUFJekMsYUFBYSxDQUFDaVEsR0FBRCxDQUFiLEtBQXVCalEsYUFBYSxDQUFDeUMsV0FBRCxDQUF2RCxFQUFzRTtBQUNwRSxhQUFPLEtBQVA7QUFDRDs7QUFDRCxRQUNFRSxnQkFBZ0IsSUFDaEIzQyxhQUFhLENBQUNrUSxRQUFELENBQWIsS0FBNEJsUSxhQUFhLENBQUMyQyxnQkFBRCxDQUYzQyxFQUdFO0FBQ0EsYUFBTyxLQUFQO0FBQ0Q7O0FBQ0QsUUFBSStELGFBQWEsSUFBSTFHLGFBQWEsQ0FBQ21RLEtBQUQsQ0FBYixLQUF5Qm5RLGFBQWEsQ0FBQzBHLGFBQUQsQ0FBM0QsRUFBNEU7QUFDMUUsYUFBTyxLQUFQO0FBQ0QsS0FwQk8sQ0FzQlI7OztBQUNBLFFBQUk3RCxrQkFBa0IsSUFBSSxDQUFBekMsSUFBSSxTQUFKLElBQUFBLElBQUksV0FBSixZQUFBQSxJQUFJLENBQUVnUSxZQUFOLE1BQXVCdk4sa0JBQWpELEVBQXFFO0FBQ25FLGFBQU8sS0FBUDtBQUNEOztBQUNELFFBQ0VJLHFCQUFxQixJQUNyQixDQUFBN0MsSUFBSSxTQUFKLElBQUFBLElBQUksV0FBSixZQUFBQSxJQUFJLENBQUVpUSxlQUFOLE1BQTBCcE4scUJBRjVCLEVBR0U7QUFDQSxhQUFPLEtBQVA7QUFDRCxLQS9CTyxDQWlDUjs7O0FBQ0EsUUFBSXVNLFdBQUosRUFBaUI7QUFDZixVQUFJdk4sTUFBTSxLQUFLLE1BQWYsRUFBdUI7QUFDckIsZUFBTzBOLFlBQVksQ0FBQ3ZQLElBQUQsYUFBQ0EsSUFBRCx1QkFBQ0EsSUFBSSxDQUFFcEMsSUFBUCxFQUFhd1IsV0FBYixDQUFuQjtBQUNEOztBQUNELFVBQUl2TixNQUFNLEtBQUssTUFBZixFQUF1QjtBQUNyQixZQUFNcU8sU0FBUyxHQUFHZCxXQUFsQixDQURxQixDQUNVOztBQUMvQixZQUFNZSxPQUFPLEdBQUc5USxLQUFLLENBQUNXLElBQUQsYUFBQ0EsSUFBRCx1QkFBQ0EsSUFBSSxDQUFFb1EsSUFBUCxDQUFyQjtBQUNBLFlBQUlELE9BQU8sSUFBSUEsT0FBTyxLQUFLRCxTQUEzQixFQUFzQyxPQUFPLElBQVA7O0FBQ3RDLFlBQUlqSSxLQUFLLENBQUNvQixPQUFOLENBQWNySixJQUFkLGFBQWNBLElBQWQsdUJBQWNBLElBQUksQ0FBRXFRLFlBQXBCLENBQUosRUFBdUM7QUFDckMsY0FBSXJRLElBQUksQ0FBQ3FRLFlBQUwsQ0FBa0JaLElBQWxCLENBQXVCLFVBQUNuUSxDQUFEO0FBQUEsbUJBQU9ELEtBQUssQ0FBQ0MsQ0FBRCxhQUFDQSxDQUFELHVCQUFDQSxDQUFDLENBQUU4USxJQUFKLENBQUwsS0FBbUJGLFNBQTFCO0FBQUEsV0FBdkIsQ0FBSixFQUFpRTtBQUMvRCxtQkFBTyxJQUFQO0FBQ0Q7QUFDRjs7QUFDRCxZQUFJakksS0FBSyxDQUFDb0IsT0FBTixDQUFjckosSUFBZCxhQUFjQSxJQUFkLHVCQUFjQSxJQUFJLENBQUVzUSxVQUFwQixDQUFKLEVBQXFDO0FBQ25DLGNBQUl0USxJQUFJLENBQUNzUSxVQUFMLENBQWdCYixJQUFoQixDQUFxQixVQUFDYyxDQUFEO0FBQUEsbUJBQU9sUixLQUFLLENBQUNrUixDQUFELGFBQUNBLENBQUQsdUJBQUNBLENBQUMsQ0FBRUgsSUFBSixDQUFMLEtBQW1CRixTQUExQjtBQUFBLFdBQXJCLENBQUosRUFBK0Q7QUFDN0QsbUJBQU8sSUFBUDtBQUNEO0FBQ0Y7O0FBQ0QsZUFBTyxLQUFQO0FBQ0Q7O0FBQ0QsVUFBSXJPLE1BQU0sS0FBSyxZQUFmLEVBQTZCO0FBQzNCLGVBQ0VvRyxLQUFLLENBQUNvQixPQUFOLENBQWNySixJQUFkLGFBQWNBLElBQWQsdUJBQWNBLElBQUksQ0FBRXNRLFVBQXBCLEtBQ0F0USxJQUFJLENBQUNzUSxVQUFMLENBQWdCYixJQUFoQixDQUFxQixVQUFDZSxFQUFEO0FBQUEsaUJBQ25CakIsWUFBWSxDQUFDaUIsRUFBRCxhQUFDQSxFQUFELHVCQUFDQSxFQUFFLENBQUVDLFNBQUwsRUFBZ0JyQixXQUFoQixDQURPO0FBQUEsU0FBckIsQ0FGRjtBQU1EOztBQUNELFVBQUl2TixNQUFNLEtBQUssZ0JBQWYsRUFBaUM7QUFDL0IsZUFBTzBOLFlBQVksQ0FBQ3ZQLElBQUQsYUFBQ0EsSUFBRCx1QkFBQ0EsSUFBSSxDQUFFMFEsRUFBUCxFQUFXdEIsV0FBWCxDQUFuQjtBQUNEOztBQUNELFVBQUl2TixNQUFNLEtBQUssZUFBZixFQUFnQztBQUM5QixlQUFPME4sWUFBWSxDQUFDdlAsSUFBRCxhQUFDQSxJQUFELHVCQUFDQSxJQUFJLENBQUUyUSxFQUFQLEVBQVd2QixXQUFYLENBQW5CO0FBQ0Q7O0FBQ0QsVUFBSXZOLE1BQU0sS0FBSyxhQUFmLEVBQThCO0FBQzVCLFlBQUkwTixZQUFZLENBQUN2UCxJQUFELGFBQUNBLElBQUQsdUJBQUNBLElBQUksQ0FBRTRRLElBQVAsRUFBYXhCLFdBQWIsQ0FBaEIsRUFBMkMsT0FBTyxJQUFQO0FBQzNDLFlBQUlHLFlBQVksQ0FBQ3ZQLElBQUQsYUFBQ0EsSUFBRCx1QkFBQ0EsSUFBSSxDQUFFNlEsV0FBUCxFQUFvQnpCLFdBQXBCLENBQWhCLEVBQWtELE9BQU8sSUFBUDs7QUFDbEQsWUFBSW5ILEtBQUssQ0FBQ29CLE9BQU4sQ0FBY3JKLElBQWQsYUFBY0EsSUFBZCx1QkFBY0EsSUFBSSxDQUFFcVEsWUFBcEIsQ0FBSixFQUF1QztBQUNyQyxpQkFBT3JRLElBQUksQ0FBQ3FRLFlBQUwsQ0FBa0JaLElBQWxCLENBQXVCLFVBQUNuUSxDQUFEO0FBQUEsbUJBQzVCaVEsWUFBWSxDQUFDalEsQ0FBRCxhQUFDQSxDQUFELHVCQUFDQSxDQUFDLENBQUV1UixXQUFKLEVBQWlCekIsV0FBakIsQ0FEZ0I7QUFBQSxXQUF2QixDQUFQO0FBR0Q7O0FBQ0QsZUFBTyxLQUFQO0FBQ0Q7O0FBQ0QsVUFBSXZOLE1BQU0sS0FBSyxLQUFmLEVBQXNCO0FBQ3BCLGVBQ0UwTixZQUFZLENBQUN2UCxJQUFELGFBQUNBLElBQUQsdUJBQUNBLElBQUksQ0FBRThRLEVBQVAsRUFBVzFCLFdBQVgsQ0FBWixJQUNBRyxZQUFZLENBQUN2UCxJQUFELGFBQUNBLElBQUQsdUJBQUNBLElBQUksQ0FBRStRLE9BQVAsRUFBZ0IzQixXQUFoQixDQURaLElBRUFHLFlBQVksQ0FBQ3ZQLElBQUQsYUFBQ0EsSUFBRCx1QkFBQ0EsSUFBSSxDQUFFZ1IsUUFBUCxFQUFpQjVCLFdBQWpCLENBSGQ7QUFLRDtBQUNGOztBQUVELFdBQU8sSUFBUDtBQUNELEdBekYrQixFQTBGaEMsQ0FDRS9NLFdBREYsRUFFRUUsZ0JBRkYsRUFHRStELGFBSEYsRUFJRTdELGtCQUpGLEVBS0VJLHFCQUxGLEVBTUV1TSxXQU5GLEVBT0V2TixNQVBGLENBMUZnQyxDQUFsQzs7QUFxR0EsTUFBTW9QLGVBQWUsR0FBRyxTQUFsQkEsZUFBa0IsR0FBTTtBQUM1QmxLLFdBQU8sQ0FBQyxDQUFELENBQVA7QUFDQUUsa0JBQWMsQ0FBQyxFQUFELENBQWQ7QUFDQUUsa0JBQWMsQ0FBQyxLQUFELENBQWQ7QUFDRCxHQUpELENBOWJtQyxDQW9jbkM7OztBQUNBakoseURBQVMsQ0FBQyxZQUFNO0FBQ2QrUyxtQkFBZTtBQUNmekosaUJBQWEsQ0FBQyxVQUFDd0csQ0FBRDtBQUFBLGFBQU9BLENBQUMsR0FBRyxDQUFYO0FBQUEsS0FBRCxDQUFiO0FBQ0QsR0FIUSxFQUdOLENBQUM3SSxNQUFNLENBQUMrTCxNQUFSLENBSE0sQ0FBVCxDQXJjbUMsQ0EwY25DOztBQUNBaFQseURBQVMsQ0FBQyxZQUFNO0FBQ2QrUyxtQkFBZTtBQUNmekosaUJBQWEsQ0FBQyxVQUFDd0csQ0FBRDtBQUFBLGFBQU9BLENBQUMsR0FBRyxDQUFYO0FBQUEsS0FBRCxDQUFiO0FBQ0QsR0FIUSxFQUdOLENBQ0QzTCxXQURDLEVBRURFLGdCQUZDLEVBR0QrRCxhQUhDLEVBSUQ3RCxrQkFKQyxFQUtESSxxQkFMQyxFQU1EVixNQU5DLEVBT0ROLE1BUEMsQ0FITSxDQUFULENBM2NtQyxDQXlkbkM7O0FBQ0EzRCx5REFBUyxDQUFDLFlBQU07QUFDZGlULGFBQVMsQ0FBQ3JLLElBQUQsQ0FBVDtBQUNELEdBRlEsRUFFTixDQUFDQSxJQUFELEVBQU9TLFVBQVAsQ0FGTSxDQUFUO0FBSUFySix5REFBUyxDQUFDLFlBQU07QUFDZCxRQUFJLEVBQUNpSCxNQUFELGFBQUNBLE1BQUQsZUFBQ0EsTUFBTSxDQUFFaU0sTUFBVCxDQUFKLEVBQXFCOztBQUNyQixRQUFNQyxVQUFVLEdBQUcsU0FBYkEsVUFBYTtBQUFBLGFBQU0zUCxlQUFlLENBQUMsS0FBRCxDQUFyQjtBQUFBLEtBQW5COztBQUNBeUQsVUFBTSxDQUFDaU0sTUFBUCxDQUFjRSxFQUFkLENBQWlCLHFCQUFqQixFQUF3Q0QsVUFBeEM7QUFDQWxNLFVBQU0sQ0FBQ2lNLE1BQVAsQ0FBY0UsRUFBZCxDQUFpQixrQkFBakIsRUFBcUNELFVBQXJDO0FBQ0EsV0FBTyxZQUFNO0FBQ1hsTSxZQUFNLENBQUNpTSxNQUFQLENBQWNHLEdBQWQsQ0FBa0IscUJBQWxCLEVBQXlDRixVQUF6QztBQUNBbE0sWUFBTSxDQUFDaU0sTUFBUCxDQUFjRyxHQUFkLENBQWtCLGtCQUFsQixFQUFzQ0YsVUFBdEM7QUFDRCxLQUhEO0FBSUQsR0FUUSxFQVNOLENBQUNsTSxNQUFELENBVE0sQ0FBVDs7QUE5ZG1DLFdBeWVwQmdNLFNBemVvQjtBQUFBO0FBQUE7O0FBQUE7QUFBQSxvVEF5ZW5DO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUF5QkssMkJBQXpCLGlFQUF5QyxDQUF6QztBQUNRQyxpQkFEUixHQUNjLEVBQUVySyxRQUFRLENBQUNnRyxPQUR6QjtBQUVNc0Usc0JBRk4sR0FFaUIsS0FGakI7QUFHRTFRLDBCQUFZLENBQUMsSUFBRCxDQUFaO0FBQ0EwRywwQkFBWSxDQUFDLElBQUQsQ0FBWjtBQUNNaUssdUJBTFIsR0FLb0JsVSxVQUFVLENBQUMsWUFBTTtBQUNqQ2lVLHdCQUFRLEdBQUcsSUFBWDs7QUFDQSxvQkFBSUQsR0FBRyxLQUFLckssUUFBUSxDQUFDZ0csT0FBckIsRUFBOEI7QUFDNUIxRiw4QkFBWSxDQUFDO0FBQ1hrSyx3QkFBSSxFQUFFLFNBREs7QUFFWEMsMkJBQU8sMENBQW1DQyxJQUFJLENBQUNDLEtBQUwsQ0FDeENqSyxlQUFlLEdBQUcsSUFEc0IsQ0FBbkM7QUFGSSxtQkFBRCxDQUFaO0FBTUE5Ryw4QkFBWSxDQUFDLEtBQUQsQ0FBWjtBQUNEO0FBQ0YsZUFYMkIsRUFXekI4RyxlQVh5QixDQUw5QjtBQUFBOztBQWtCSSxrQkFBSTNDLE1BQU0sQ0FBQzRILEtBQVAsQ0FBYWlGLFNBQWIsSUFBMEI3TSxNQUFNLENBQUM0SCxLQUFQLENBQWFrRixZQUEzQyxFQUF5RDtBQUN2RG5RLHlCQUFTLENBQUNxRCxNQUFNLENBQUM0SCxLQUFQLENBQWFrRixZQUFkLENBQVQ7QUFDQTdQLHlCQUFTLENBQUMrQyxNQUFNLENBQUM0SCxLQUFQLENBQWFpRixTQUFkLENBQVQ7QUFDRDs7QUFDS0UsMkJBdEJWLEdBdUJNVixhQUFhLEdBQUcsQ0FBaEIsR0FBb0J4SyxXQUFXLENBQUN3SyxhQUFhLEdBQUcsQ0FBakIsQ0FBL0IsR0FBcUQsSUF2QjNEOztBQUFBLG9CQXdCUUEsYUFBYSxHQUFHLENBQWhCLElBQXFCLENBQUNVLGFBeEI5QjtBQUFBO0FBQUE7QUFBQTs7QUF5Qk1uTCxxQkFBTyxDQUFDLENBQUQsQ0FBUDs7QUFDQSxrQkFBSTBLLEdBQUcsS0FBS3JLLFFBQVEsQ0FBQ2dHLE9BQXJCLEVBQThCO0FBQzVCK0UsNEJBQVksQ0FBQ1IsU0FBRCxDQUFaO0FBQ0EzUSw0QkFBWSxDQUFDLEtBQUQsQ0FBWjtBQUNEOztBQTdCUDs7QUFBQTtBQWdDVW9SLDZCQWhDVixHQWdDNEJqTixNQUFNLENBQUM0SCxLQUFQLENBQWFrRixZQUFiLElBQTZCcFEsTUFoQ3pEO0FBaUNVd1EsNkJBakNWLEdBaUM0QmxOLE1BQU0sQ0FBQzRILEtBQVAsQ0FBYWlGLFNBQWIsSUFBMEI3UCxNQWpDdEQ7QUFrQ1VtUSxrQ0FsQ1YsR0FrQ2lDLENBQUNELGVBQWUsSUFBSSxFQUFwQixFQUMxQnhTLFdBRDBCLEdBRTFCQyxJQUYwQixFQWxDakMsRUFzQ0k7O0FBQ015UyxrQkF2Q1Y7QUFBQSxnVUF1Q2lCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQU9DLGlDQUFQLGlFQUFpQixDQUFqQjtBQUFBO0FBQUE7QUFBQSxpQ0FFSUMsOEZBQTZCLENBQUM7QUFDekNsUixvQ0FBUSxFQUFSQSxRQUR5QztBQUV6QzJRLHlDQUFhLEVBQWJBLGFBRnlDO0FBR3pDUSx1Q0FBVyxFQUFFLElBSDRCO0FBSXpDQyxvQ0FBUSxFQUFFdEQsZ0JBQWdCLEdBQUdNLGNBQUgsR0FBb0IsSUFKTDtBQUt6Q3hOLGtDQUFNLEVBQUVtUSxvQkFBb0IsR0FDeEI7QUFDRTNVLGtDQUFJLEVBQUV5VSxlQURSO0FBRUVRLGlDQUFHLEVBQUVQLGVBRlA7QUFHRW5TLG1DQUFLLEVBQUVvUztBQUhULDZCQUR3QixHQU14QixJQVhxQztBQVl6Q08sNENBQWdCLEVBQ2R2RCxPQUFPLENBQUNqTixXQUFELENBQVAsSUFDQWlOLE9BQU8sQ0FBQy9NLGdCQUFELENBRFAsSUFFQStNLE9BQU8sQ0FBQ2hKLGFBQUQsQ0FGUCxJQUdBZ0osT0FBTyxDQUFDN00sa0JBQUQsQ0FIUCxJQUlBNk0sT0FBTyxDQUFDek0scUJBQUQ7QUFqQmdDLDJCQUFELENBRmpDOztBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBLGdDQXNCTDJQLE9BQU8sSUFBSSxDQXRCTjtBQUFBO0FBQUE7QUFBQTs7QUFBQTs7QUFBQTtBQUFBO0FBQUEsaUNBdUJILElBQUlqVixPQUFKLENBQVksVUFBQXVWLENBQUM7QUFBQSxtQ0FBSXJWLFVBQVUsQ0FBQ3FWLENBQUQsRUFBSSxNQUFNaEIsSUFBSSxDQUFDaUIsR0FBTCxDQUFTLENBQVQsRUFBWVAsT0FBTyxHQUFHLENBQXRCLENBQVYsQ0FBZDtBQUFBLDJCQUFiLENBdkJHOztBQUFBO0FBQUEsNkRBd0JGRCxJQUFJLENBQUNDLE9BQU8sR0FBRyxDQUFYLENBeEJGOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQXZDakI7O0FBQUEsZ0NBdUNVRCxJQXZDVjtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLHFCQWtFa0VBLElBQUksRUFsRXRFOztBQUFBO0FBQUE7QUFrRW1CMUosa0JBbEVuQixlQWtFWS9KLEtBbEVaO0FBa0V5QjZPLHFCQWxFekIsZUFrRXlCQSxPQWxFekI7QUFrRStDcUYsc0JBbEUvQyxlQWtFa0M5TCxXQWxFbEM7O0FBQUEsb0JBbUVRd0ssUUFBUSxJQUFJRCxHQUFHLEtBQUtySyxRQUFRLENBQUNnRyxPQW5FckM7QUFBQTtBQUFBO0FBQUE7O0FBQUE7O0FBQUE7QUFvRVU2RiwyQkFwRVYsR0FxRU0zRCxPQUFPLENBQUNnRCxvQkFBRCxDQUFQLElBQWlDRixlQUFlLEtBQUssTUFyRTNEOztBQXNFSSxrQkFDRWEsYUFBYSxLQUNacEssSUFBSSxDQUFDN0osTUFBTCxLQUFnQixDQUFoQixJQUNDNkosSUFBSSxDQUFDNEcsSUFBTCxDQUNFLFVBQUN6UCxJQUFEO0FBQUEsdUJBQ0UsQ0FBQ2lJLEtBQUssQ0FBQ29CLE9BQU4sQ0FBY3JKLElBQWQsYUFBY0EsSUFBZCx1QkFBY0EsSUFBSSxDQUFFNE8sVUFBcEIsQ0FBRCxJQUFvQzVPLElBQUksQ0FBQzRPLFVBQUwsQ0FBZ0I1UCxNQUFoQixLQUEyQixDQURqRTtBQUFBLGVBREYsQ0FGVyxDQURmLEVBT0U7QUFDQWtPLHNDQUFzQixDQUFDLGFBQUQsQ0FBdEI7QUFDRDs7QUFDRCxrQkFBSXNFLGFBQWEsS0FBSyxDQUFsQixJQUF1QjNJLElBQUksQ0FBQzdKLE1BQUwsS0FBZ0IsQ0FBM0MsRUFBOEM7QUFDNUNpSSw4QkFBYyxDQUFDLEVBQUQsQ0FBZDtBQUNBRSw4QkFBYyxDQUFDLEtBQUQsQ0FBZDtBQUNEOztBQUNEdEcsMkJBQWEsQ0FBQ2dJLElBQUQsQ0FBYjtBQUNBNUMsdUJBQVMsQ0FBQ1osU0FBRCxDQUFULENBckZKLENBcUYwQjs7QUFDdEJuRSxtQkFBSyxDQUFDMkgsSUFBSSxDQUFDakQsR0FBTCxDQUFTLFVBQUM1RixJQUFEO0FBQUEsdUJBQVVBLElBQUksQ0FBQzhRLEVBQWY7QUFBQSxlQUFULENBQUQsQ0FBTDs7QUF0Rkosb0JBdUZRVSxhQUFhLEdBQUcsQ0FBaEIsSUFBcUIzSSxJQUFJLENBQUM3SixNQUFMLEtBQWdCLENBdkY3QztBQUFBO0FBQUE7QUFBQTs7QUF3Rk1tSSw0QkFBYyxDQUFDLEtBQUQsQ0FBZDtBQUNBSixxQkFBTyxDQUFDLENBQUQsQ0FBUDtBQXpGTjs7QUFBQTtBQTRGSUksNEJBQWMsQ0FBQzZMLFFBQUQsQ0FBZDtBQUNBL0wsNEJBQWMsQ0FBQyxVQUFDaU0sSUFBRCxFQUFVO0FBQ3ZCLG9CQUFNQyxJQUFJLEdBQUczQixhQUFhLEtBQUssQ0FBbEIsR0FBc0IsRUFBdEIseUpBQStCMEIsSUFBL0IsQ0FBYjs7QUFDQSxvQkFBSXZGLE9BQUosRUFBYTtBQUNYd0Ysc0JBQUksQ0FBQzNCLGFBQWEsR0FBRyxDQUFqQixDQUFKLEdBQTBCN0QsT0FBMUI7QUFDRDs7QUFDRCx1QkFBT3dGLElBQVA7QUFDRCxlQU5hLENBQWQ7QUFPQUMsOEJBQWdCLENBQUMsRUFBRCxDQUFoQixDQXBHSixDQXNHSTs7QUFDTUMsdUJBdkdWLEdBdUdzQnhLLElBQUksQ0FBQ2pELEdBQUwsQ0FBUyxVQUFDNUYsSUFBRDtBQUFBOztBQUFBLHVEQUN0QkEsSUFEc0I7QUFFekJnUSw4QkFBWSw0Q0FDVmhRLElBRFUsYUFDVkEsSUFEVSx1QkFDVkEsSUFBSSxDQUFFZ1EsWUFESSxtRUFFVCxRQUFPaFEsSUFBUCxhQUFPQSxJQUFQLHVCQUFPQSxJQUFJLENBQUVzVCxVQUFiLE1BQTRCLFFBQTVCLEdBQXVDdFQsSUFBSSxDQUFDc1QsVUFBNUMsR0FBeUQsSUFGaEQsMkNBR1Z0VCxJQUhVLGFBR1ZBLElBSFUsMkNBR1ZBLElBQUksQ0FBRXNULFVBSEkscURBR1YsaUJBQWtCeEMsRUFIUiwyQ0FJVixJQU51QjtBQU96QmIsaUNBQWUsK0NBQ2JqUSxJQURhLGFBQ2JBLElBRGEsdUJBQ2JBLElBQUksQ0FBRWlRLGVBRE8seUVBRVosUUFBT2pRLElBQVAsYUFBT0EsSUFBUCx1QkFBT0EsSUFBSSxDQUFFdVQsYUFBYixNQUErQixRQUEvQixHQUEwQ3ZULElBQUksQ0FBQ3VULGFBQS9DLEdBQStELElBRm5ELDJDQUdidlQsSUFIYSxhQUdiQSxJQUhhLDhDQUdiQSxJQUFJLENBQUV1VCxhQUhPLHdEQUdiLG9CQUFxQnpDLEVBSFIsMkNBSWI7QUFYdUI7QUFBQSxlQUFULENBdkd0QjtBQXFISS9QLDhCQUFnQixDQUFDc1MsU0FBRCxDQUFoQixDQXJISixDQXNISTs7QUFDQTFTLHFCQUFPLENBQUMwUyxTQUFTLENBQUNHLE1BQVYsQ0FBaUI3RCxjQUFqQixDQUFELENBQVA7QUF2SEo7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUEsb0JBeUhROEIsR0FBRyxLQUFLckssUUFBUSxDQUFDZ0csT0F6SHpCO0FBQUE7QUFBQTtBQUFBOztBQUFBOztBQUFBO0FBMEhJcEUscUJBQU8sQ0FBQ0MsS0FBUixDQUFjLHNCQUFkO0FBQ00ySSxrQkEzSFYsR0EySGlCLDZFQUFLQSxJQUFMLEtBQWEsU0EzSDlCO0FBNEhJbEssMEJBQVksQ0FBQztBQUNYa0ssb0JBQUksRUFBSkEsSUFEVztBQUVYQyx1QkFBTyxFQUFFLDZFQUFLQSxPQUFMLEtBQWdCO0FBRmQsZUFBRCxDQUFaO0FBSUFsUixxQkFBTyxDQUFDLEVBQUQsQ0FBUDtBQUNBSSw4QkFBZ0IsQ0FBQyxFQUFELENBQWhCOztBQWpJSjtBQUFBO0FBbUlJb1IsMEJBQVksQ0FBQ1IsU0FBRCxDQUFaO0FBQ0Esa0JBQUlGLEdBQUcsS0FBS3JLLFFBQVEsQ0FBQ2dHLE9BQWpCLElBQTRCLENBQUNzRSxRQUFqQyxFQUEyQzFRLFlBQVksQ0FBQyxLQUFELENBQVo7QUFwSS9DOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBemVtQztBQUFBO0FBQUE7O0FBaW5CbkMsTUFBTXlTLG1CQUFtQixHQUFHLFNBQXRCQSxtQkFBc0IsQ0FBQ0MsS0FBRDtBQUFBLFdBQVd0UixTQUFTLENBQUNzUixLQUFLLENBQUNDLE1BQU4sQ0FBYXJWLEtBQWQsQ0FBcEI7QUFBQSxHQUE1QixDQWpuQm1DLENBbW5CbkM7OztBQUNBSix5REFBUyxDQUFDLFlBQU07QUFDZCxRQUFNMFYsSUFBSSxHQUFHOVMsYUFBYSxJQUFJLEVBQTlCO0FBQ0FILFdBQU8sQ0FBQ2lULElBQUksQ0FBQ0osTUFBTCxDQUFZN0QsY0FBWixDQUFELENBQVA7QUFDRCxHQUhRLEVBR04sQ0FBQzdPLGFBQUQsRUFBZ0I2TyxjQUFoQixDQUhNLENBQVQ7O0FBS0EsV0FBU2tFLFlBQVQsQ0FBc0JDLEdBQXRCLEVBQTJCO0FBQ3pCO0FBQ0EsUUFBTUMsYUFBYSxHQUFHN04sU0FBUyxDQUFDTixHQUFWLENBQWMsVUFBQ29JLENBQUQsRUFBSWxJLENBQUo7QUFBQSxhQUFXQSxDQUFDLEtBQUtnTyxHQUFOLEdBQVksQ0FBQzlGLENBQWIsR0FBaUJBLENBQTVCO0FBQUEsS0FBZCxDQUF0QjtBQUNBLFFBQU1ySSxNQUFNLEdBQUdvTyxhQUFhLENBQUNELEdBQUQsQ0FBNUIsQ0FIeUIsQ0FHVTs7QUFFbkMsUUFBTUUsVUFBVSxHQUFHLHNKQUFJdFQsSUFBSixFQUFVMEssSUFBVixDQUFlLFVBQUNDLENBQUQsRUFBSUMsQ0FBSixFQUFVO0FBQzFDLFVBQU1yTCxHQUFHLEdBQUdxRixjQUFjLENBQUN3TyxHQUFELENBQTFCOztBQUVBLFVBQUlBLEdBQUcsS0FBSyxDQUFaLEVBQWU7QUFDYjtBQUNBLFlBQU1HLEVBQUUsR0FBRzVWLE1BQU0sQ0FBQ2dOLENBQUMsQ0FBQ3BMLEdBQUQsQ0FBRixDQUFqQjtBQUNBLFlBQU1pVSxFQUFFLEdBQUc3VixNQUFNLENBQUNpTixDQUFDLENBQUNyTCxHQUFELENBQUYsQ0FBakIsQ0FIYSxDQUtiOztBQUNBLFlBQUlnVSxFQUFFLEtBQUssSUFBUCxJQUFlQyxFQUFFLEtBQUssSUFBMUIsRUFBZ0MsT0FBTyxDQUFQO0FBQ2hDLFlBQUlELEVBQUUsS0FBSyxJQUFYLEVBQWlCLE9BQU90TyxNQUFNLEdBQUcsQ0FBQyxDQUFKLEdBQVEsQ0FBckI7QUFDakIsWUFBSXVPLEVBQUUsS0FBSyxJQUFYLEVBQWlCLE9BQU92TyxNQUFNLEdBQUcsQ0FBSCxHQUFPLENBQUMsQ0FBckI7QUFFakIsZUFBT0EsTUFBTSxHQUFJdU8sRUFBRSxHQUFHRCxFQUFULEdBQWdCQSxFQUFFLEdBQUdDLEVBQWxDO0FBQ0QsT0FkeUMsQ0FnQjFDOzs7QUFDQSxVQUFJSixHQUFHLEtBQUssQ0FBUixJQUFhQSxHQUFHLEtBQUssQ0FBekIsRUFBNEI7QUFBQTs7QUFDMUIsWUFBTUssRUFBRSxHQUFHLFdBQUM5SSxDQUFDLENBQUNwTCxHQUFELENBQUYsMkNBQVcsRUFBWCxFQUFlK00sUUFBZixFQUFYO0FBQ0EsWUFBTW9ILEVBQUUsR0FBRyxXQUFDOUksQ0FBQyxDQUFDckwsR0FBRCxDQUFGLDJDQUFXLEVBQVgsRUFBZStNLFFBQWYsRUFBWDtBQUNBLGVBQU9ySCxNQUFNLEdBQUd5TyxFQUFFLENBQUNDLGFBQUgsQ0FBaUJGLEVBQWpCLENBQUgsR0FBMEJBLEVBQUUsQ0FBQ0UsYUFBSCxDQUFpQkQsRUFBakIsQ0FBdkM7QUFDRCxPQXJCeUMsQ0F1QjFDOzs7QUFDQSxVQUFNRSxFQUFFLEdBQUc3SyxNQUFNLENBQUM0QixDQUFDLENBQUNwTCxHQUFELENBQUYsQ0FBakI7QUFDQSxVQUFNc1UsRUFBRSxHQUFHOUssTUFBTSxDQUFDNkIsQ0FBQyxDQUFDckwsR0FBRCxDQUFGLENBQWpCOztBQUVBLFVBQUksQ0FBQ3RCLEtBQUssQ0FBQzJWLEVBQUQsQ0FBTixJQUFjLENBQUMzVixLQUFLLENBQUM0VixFQUFELENBQXhCLEVBQThCO0FBQzVCLGVBQU81TyxNQUFNLEdBQUk0TyxFQUFFLEdBQUdELEVBQVQsR0FBZ0JBLEVBQUUsR0FBR0MsRUFBbEM7QUFDRCxPQUZELE1BRU87QUFBQTs7QUFDTCxZQUFNSixHQUFFLEdBQUcsWUFBQzlJLENBQUMsQ0FBQ3BMLEdBQUQsQ0FBRiw2Q0FBVyxFQUFYLEVBQWUrTSxRQUFmLEVBQVg7O0FBQ0EsWUFBTW9ILEdBQUUsR0FBRyxZQUFDOUksQ0FBQyxDQUFDckwsR0FBRCxDQUFGLDZDQUFXLEVBQVgsRUFBZStNLFFBQWYsRUFBWDs7QUFDQSxlQUFPckgsTUFBTSxHQUFHeU8sR0FBRSxDQUFDQyxhQUFILENBQWlCRixHQUFqQixDQUFILEdBQTBCQSxHQUFFLENBQUNFLGFBQUgsQ0FBaUJELEdBQWpCLENBQXZDO0FBQ0Q7QUFDRixLQWxDa0IsQ0FBbkI7O0FBb0NBelQsV0FBTyxDQUFDcVQsVUFBRCxDQUFQO0FBQ0E3TixnQkFBWSxDQUFDNE4sYUFBRCxDQUFaLENBMUN5QixDQTRDekI7O0FBQ0E5TixhQUFTLENBQUNULFlBQVksQ0FBQ0gsU0FBRCxFQUFZeU8sR0FBWixFQUFpQm5PLE1BQWpCLENBQWIsQ0FBVDtBQUNEOztBQUdELE1BQU02TyxTQUFTLEdBQUcsU0FBWkEsU0FBWSxDQUFDeFUsSUFBRCxFQUFVO0FBQzFCLFFBQUlBLElBQUksSUFBSUEsSUFBSSxDQUFDOFEsRUFBakIsRUFBcUI7QUFDbkI5SCxhQUFPLENBQUN5TCxHQUFSLENBQVksZ0JBQVosRUFBOEJ6VSxJQUE5QjtBQUNBMEIscUJBQWUsQ0FBQyxJQUFELENBQWY7QUFDQXlELFlBQU0sQ0FBQzhILElBQVAsQ0FBWSxZQUFZak4sSUFBSSxDQUFDOFEsRUFBN0I7QUFDRCxLQUpELE1BSU87QUFDTDlILGFBQU8sQ0FBQ0MsS0FBUixDQUFjLDhDQUFkLEVBQThEakosSUFBOUQ7QUFDRDtBQUNGLEdBUkQ7O0FBMXFCbUMsb0JBb3JCT2pDLHNEQUFRLENBQUMsRUFBRCxDQXByQmY7QUFBQSxNQW9yQjVCMlcsYUFwckI0QjtBQUFBLE1Bb3JCYnRCLGdCQXByQmE7O0FBQUEsb0JBcXJCV3JWLHNEQUFRLENBQUMsS0FBRCxDQXJyQm5CO0FBQUEsTUFxckI1QjRXLGVBcnJCNEI7QUFBQSxNQXFyQlhDLGtCQXJyQlc7O0FBdXJCbkMsTUFBTUMsZ0JBQWdCLEdBQUcsU0FBbkJBLGdCQUFtQixDQUFDL0QsRUFBRCxFQUFRO0FBQy9Cc0Msb0JBQWdCLENBQUMsVUFBQUYsSUFBSTtBQUFBLGFBQ25CQSxJQUFJLENBQUN4RCxRQUFMLENBQWNvQixFQUFkLElBQW9Cb0MsSUFBSSxDQUFDTSxNQUFMLENBQVksVUFBQXNCLENBQUM7QUFBQSxlQUFJQSxDQUFDLEtBQUtoRSxFQUFWO0FBQUEsT0FBYixDQUFwQixtS0FBcURvQyxJQUFyRCxJQUEyRHBDLEVBQTNELEVBRG1CO0FBQUEsS0FBTCxDQUFoQjtBQUdELEdBSkQsQ0F2ckJtQyxDQThyQm5DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQSxNQUFNaUUscUJBQXFCLEdBQUcsU0FBeEJBLHFCQUF3QjtBQUFBLFdBQU1ILGtCQUFrQixDQUFDLElBQUQsQ0FBeEI7QUFBQSxHQUE5Qjs7QUFDQSxNQUFNSSxzQkFBc0IsR0FBRyxTQUF6QkEsc0JBQXlCO0FBQUEsV0FBTUosa0JBQWtCLENBQUMsS0FBRCxDQUF4QjtBQUFBLEdBQS9COztBQUVBLE1BQU1LLG9CQUFvQjtBQUFBLG9UQUFHO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDM0JwTywyQkFBYSxDQUFDLElBQUQsQ0FBYjtBQUNNNkcsZ0JBRnFCLEdBRWhCbEYsMERBQVEsQ0FBQ0MsU0FBVCxFQUZnQjtBQUFBO0FBSXpCO0FBSnlCLHNEQUtKaU0sYUFMSTtBQUFBOztBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBS2RRLG9CQUxjO0FBTXZCbE0scUJBQU8sQ0FBQ3lMLEdBQVIsQ0FBWVMsTUFBWjtBQU51QjtBQUFBO0FBQUEscUJBU2Z4SCxFQUFFLENBQUNoRixVQUFILENBQWMsTUFBZCxFQUFzQkMsR0FBdEIsQ0FBMEJ1TSxNQUExQixhQVRlOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFXckJsTSxxQkFBTyxDQUFDQyxLQUFSLG1DQUF5Q2lNLE1BQXpDOztBQVhxQjtBQUFBO0FBQUE7QUFBQSxxQkFlZnhILEVBQUUsQ0FBQ2hGLFVBQUgsQ0FBYyxPQUFkLEVBQXVCQyxHQUF2QixDQUEyQnVNLE1BQTNCLGFBZmU7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQWlCckJsTSxxQkFBTyxDQUFDQyxLQUFSLG1DQUF5Q2lNLE1BQXpDOztBQWpCcUI7QUFBQTtBQUFBO0FBQUEscUJBcUJmQyxpQkFBaUIsQ0FBQ0QsTUFBRCxDQXJCRjs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBdUJyQmxNLHFCQUFPLENBQUNDLEtBQVIsc0NBQTRDaU0sTUFBNUM7O0FBdkJxQjtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTs7QUFBQTtBQUFBOztBQUFBOztBQUFBOztBQUFBO0FBMEJ6QjtBQUNBdlUscUJBQU8sQ0FBQ0QsSUFBSSxDQUFDOFMsTUFBTCxDQUFZLFVBQUN4VCxJQUFEO0FBQUEsdUJBQVUsQ0FBQzBVLGFBQWEsQ0FBQ2hGLFFBQWQsQ0FBdUIxUCxJQUFJLENBQUM4USxFQUE1QixDQUFYO0FBQUEsZUFBWixDQUFELENBQVA7QUFDQXNDLDhCQUFnQixDQUFDLEVBQUQsQ0FBaEI7QUE1QnlCO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBOEJ6QnBLLHFCQUFPLENBQUNDLEtBQVIsQ0FBYyx1QkFBZDs7QUE5QnlCO0FBQUE7QUFnQ3pCcEMsMkJBQWEsQ0FBQyxLQUFELENBQWI7QUFDQW1PLG9DQUFzQixHQWpDRyxDQWtDekI7QUFDQTs7QUFuQ3lCOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQUg7O0FBQUEsb0JBQXBCQyxvQkFBb0I7QUFBQTtBQUFBO0FBQUEsS0FBMUI7O0FBd0NBLE1BQU1HLFdBQVcsR0FBRyxTQUFkQSxXQUFjO0FBQUEsV0FBTWhVLE9BQU8sQ0FBQyxLQUFELENBQWI7QUFBQSxHQUFwQjs7QUFDQSxNQUFNaVUsVUFBVSxHQUFHLFNBQWJBLFVBQWE7QUFBQSxXQUFNalUsT0FBTyxDQUFDLElBQUQsQ0FBYjtBQUFBLEdBQW5COztBQUVBLE1BQU1rVSxXQUFXLEdBQUcsU0FBZEEsV0FBYyxDQUFDNUIsS0FBRCxFQUFRSSxHQUFSLEVBQWF5QixXQUFiLEVBQTBCM1gsSUFBMUIsRUFBbUM7QUFDckQsUUFBSThWLEtBQUosRUFBVztBQUNUQSxXQUFLLENBQUM4QixjQUFOO0FBQ0E5QixXQUFLLENBQUMrQixlQUFOO0FBQ0Q7O0FBQ0R6TSxXQUFPLENBQUN5TCxHQUFSLENBQVkseUJBQVosRUFBdUNjLFdBQXZDO0FBQ0FuQyxvQkFBZ0IsQ0FBQ21DLFdBQUQsQ0FBaEI7QUFDQTNULFlBQVEsQ0FBQ2hFLElBQUQsQ0FBUjtBQUNBZ1gsc0JBQWtCLENBQUMsSUFBRCxDQUFsQjtBQUNELEdBVEQsQ0FwdkJtQyxDQSt2Qm5DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBLE1BQU1jLFVBQVUsR0FBRyxTQUFiQSxVQUFhLENBQUNDLEtBQUQ7QUFBQSxXQUFZO0FBQzdCQyxxQkFBZSxFQUFFeFAsVUFBVSxLQUFLdVAsS0FBZixHQUF1QixNQUF2QixHQUFnQyxhQURwQjtBQUU3QkUsZUFBUyxFQUFFLFFBRmtCO0FBRzdCQyxZQUFNLEVBQUU7QUFIcUIsS0FBWjtBQUFBLEdBQW5COztBQWp4Qm1DLG9CQXV4Qk8vWCxzREFBUSxDQUFDLGVBQUQsQ0F2eEJmO0FBQUEsTUF1eEI1QmdZLGFBdnhCNEI7QUFBQSxNQXV4QmJDLGdCQXZ4QmE7O0FBQUEsb0JBd3hCT2pZLHNEQUFRLENBQUMsZUFBRCxDQXh4QmY7QUFBQSxNQXd4QjVCa1ksYUF4eEI0QjtBQUFBLE1Bd3hCYkMsZ0JBeHhCYTs7QUEweEJuQyxNQUFNQyxhQUFhLEdBQUcsU0FBaEJBLGFBQWdCLENBQUNDLFFBQUQsRUFBVzFDLEtBQVgsRUFBcUI7QUFDekMsUUFBSTBDLFFBQVEsS0FBSyxZQUFqQixFQUErQjtBQUM3Qkosc0JBQWdCLENBQUMsZUFBRCxDQUFoQjtBQUNBMVQsb0JBQWMsQ0FBQyxJQUFELENBQWQ7QUFDRCxLQUhELE1BR087QUFDTDBULHNCQUFnQixDQUFDdEMsS0FBSyxDQUFDQyxNQUFOLENBQWEwQyxXQUFkLENBQWhCO0FBQ0EvVCxvQkFBYyxDQUFDb1IsS0FBSyxDQUFDQyxNQUFOLENBQWEwQyxXQUFkLENBQWQ7QUFDRDtBQUNGLEdBUkQ7O0FBVUEsTUFBTUMsYUFBYSxHQUFHLFNBQWhCQSxhQUFnQixDQUFDRixRQUFELEVBQVcxQyxLQUFYLEVBQXFCO0FBQ3pDLFFBQUkwQyxRQUFRLEtBQUssWUFBakIsRUFBK0I7QUFDN0JGLHNCQUFnQixDQUFDLGVBQUQsQ0FBaEI7QUFDQTFULHlCQUFtQixDQUFDLElBQUQsQ0FBbkI7QUFDRCxLQUhELE1BR087QUFDTDBULHNCQUFnQixDQUFDeEMsS0FBSyxDQUFDQyxNQUFOLENBQWEwQyxXQUFkLENBQWhCO0FBQ0E3VCx5QkFBbUIsQ0FBQ2tSLEtBQUssQ0FBQ0MsTUFBTixDQUFhMEMsV0FBZCxDQUFuQjtBQUNEO0FBQ0YsR0FSRCxDQXB5Qm1DLENBOHlCbkM7QUFDQTs7O0FBL3lCbUMsV0FnekJwQkUscUJBaHpCb0I7QUFBQTtBQUFBLElBNjFCbkM7QUFDQTtBQUNBO0FBQ0E7OztBQWgyQm1DO0FBQUEsZ1VBZ3pCbkMsbUJBQXFDNVksSUFBckM7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNRK1AsZ0JBRFIsR0FDYWxGLDBEQUFRLENBQUNDLFNBQVQsRUFEYjtBQUVReEgsaUJBRlIsR0FFYyxJQUFJNkosR0FBSixFQUZkLEVBSUU7O0FBQ00wTCxzQkFMUixHQUttQjFWLGFBQWEsQ0FBQzBTLE1BQWQsQ0FBcUIsVUFBQ3hULElBQUQsRUFBVTtBQUM5QyxvQkFBTTZQLEdBQUcsR0FBRzlQLGVBQWUsQ0FBQ0MsSUFBRCxFQUFPLEtBQVAsQ0FBM0I7QUFDQSxvQkFBTThQLFFBQVEsR0FBRy9QLGVBQWUsQ0FBQ0MsSUFBRCxFQUFPLFVBQVAsQ0FBaEM7O0FBQ0Esb0JBQUlxQyxXQUFXLElBQUl6QyxhQUFhLENBQUNpUSxHQUFELENBQWIsS0FBdUJqUSxhQUFhLENBQUN5QyxXQUFELENBQXZELEVBQXNFO0FBQ3BFLHlCQUFPLEtBQVA7QUFDRDs7QUFDRCxvQkFDRUUsZ0JBQWdCLElBQ2hCM0MsYUFBYSxDQUFDa1EsUUFBRCxDQUFiLEtBQTRCbFEsYUFBYSxDQUFDMkMsZ0JBQUQsQ0FGM0MsRUFHRTtBQUNBLHlCQUFPLEtBQVA7QUFDRDs7QUFDRCx1QkFBTyxJQUFQO0FBQ0QsZUFiZ0IsQ0FMbkI7QUFBQSxzREFvQm1CaVUsUUFwQm5COztBQUFBO0FBb0JFLHVFQUEyQjtBQUFoQkMsb0JBQWdCO0FBQ25CM0Ysb0JBRG1CLEdBQ2RuVCxJQUFJLEtBQUssTUFBVCxHQUFrQjhZLEVBQUUsQ0FBQ3pHLFlBQXJCLEdBQW9DeUcsRUFBRSxDQUFDeEcsZUFEekI7QUFFekIsc0JBQUlhLEVBQUosRUFBUTdQLEdBQUcsQ0FBQzhKLEdBQUosQ0FBUStGLEVBQVI7QUFDVDtBQXZCSDtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQXlCUTRGLGlCQXpCUixHQXlCYyxFQXpCZDtBQTBCUUMscUJBMUJSLHlKQTBCc0IxVixHQTFCdEI7QUEyQlc2RSxlQTNCWCxHQTJCZSxDQTNCZjs7QUFBQTtBQUFBLG9CQTJCa0JBLENBQUMsR0FBRzZRLE9BQU8sQ0FBQzNYLE1BM0I5QjtBQUFBO0FBQUE7QUFBQTs7QUE0QlU0WCxtQkE1QlYsR0E0QmtCRCxPQUFPLENBQUNsTSxLQUFSLENBQWMzRSxDQUFkLEVBQWlCQSxDQUFDLEdBQUcsRUFBckIsQ0E1QmxCO0FBQUE7QUFBQSxxQkE2QnVCNEgsRUFBRSxDQUNsQmhGLFVBRGdCLENBQ0wsUUFESyxFQUVoQmtCLEtBRmdCLENBRVZwQiwwREFBUSxDQUFDQyxTQUFULENBQW1CMEYsU0FBbkIsQ0FBNkJDLFVBQTdCLEVBRlUsRUFFaUMsSUFGakMsRUFFdUN3SSxLQUZ2QyxFQUdoQmhPLEdBSGdCLEVBN0J2Qjs7QUFBQTtBQTZCVWlCLGtCQTdCVjtBQWlDSUEsa0JBQUksQ0FBQ0csT0FBTCxDQUFhLFVBQUNyQixHQUFELEVBQVM7QUFDcEIsb0JBQU1ySixDQUFDLEdBQUdxSixHQUFHLENBQUNFLElBQUosTUFBYyxFQUF4QjtBQUNBNk4sbUJBQUcsQ0FBQ3pKLElBQUosQ0FBUztBQUFFNkQsb0JBQUUsRUFBRW5JLEdBQUcsQ0FBQ21JLEVBQVY7QUFBY2xULHNCQUFJLEVBQUUwQixDQUFDLENBQUMxQixJQUFGLElBQVUrSyxHQUFHLENBQUNtSTtBQUFsQyxpQkFBVDtBQUNELGVBSEQ7O0FBakNKO0FBMkJzQ2hMLGVBQUMsSUFBSSxFQTNCM0M7QUFBQTtBQUFBOztBQUFBO0FBdUNFO0FBQ0E0USxpQkFBRyxDQUFDdEwsSUFBSixDQUFTLFVBQUNDLENBQUQsRUFBSUMsQ0FBSjtBQUFBLHVCQUFVLENBQUNELENBQUMsQ0FBQ3pOLElBQUYsSUFBVSxFQUFYLEVBQWV5VyxhQUFmLENBQTZCL0ksQ0FBQyxDQUFDMU4sSUFBRixJQUFVLEVBQXZDLENBQVY7QUFBQSxlQUFUO0FBeENGLGlEQXlDUzhZLEdBekNUOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBaHpCbUM7QUFBQTtBQUFBOztBQWkyQm5DLE1BQU1HLGlCQUFpQjtBQUFBLG9UQUFHO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNwQkMseUJBRG9CLEdBQ04sRUFETTtBQUFBO0FBQUE7QUFBQSxxQkFHSUMsNkVBQVksQ0FBQzFVLFdBQUQsRUFBY0UsZ0JBQWQsQ0FIaEI7O0FBQUE7QUFHaEJ5VSx5QkFIZ0I7QUFJdEJGLHlCQUFXLEdBQUc3TyxLQUFLLENBQUNvQixPQUFOLENBQWMyTixXQUFkLElBQTZCQSxXQUE3QixHQUEyQyxFQUF6RDtBQUpzQjtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQU10QmhPLHFCQUFPLENBQUNDLEtBQVIsQ0FBYyxzQkFBZDs7QUFOc0I7QUFBQSxvQkFVcEI2TixXQUFXLENBQUM5WCxNQUFaLEtBQXVCLENBVkg7QUFBQTtBQUFBO0FBQUE7O0FBQUE7O0FBWXBCLGtCQUFJLENBQUNxRSxtQkFBTCxFQUEwQjtBQUN4QjtBQUNBQyxzQ0FBc0IsQ0FBQyxNQUFELENBQXRCO0FBQ0Q7O0FBZm1CO0FBQUEscUJBZ0JFaVQscUJBQXFCLENBQUNsVCxtQkFBbUIsSUFBSSxNQUF4QixDQWhCdkI7O0FBQUE7QUFnQmQ0VCxxQkFoQmM7QUFpQnBCSCx5QkFBVyxHQUFHRyxPQUFkO0FBakJvQjtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQW1CcEJqTyxxQkFBTyxDQUFDQyxLQUFSLENBQWMsd0NBQWQ7QUFDQTZOLHlCQUFXLEdBQUcsRUFBZDs7QUFwQm9CO0FBd0J4QjVULHdCQUFVLENBQUM0VCxXQUFELENBQVY7QUFDQUksaUNBQW1CLENBQUMsRUFBRCxDQUFuQjtBQUNBOVQsZ0NBQWtCLENBQUMsSUFBRCxDQUFsQjs7QUExQndCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQUg7O0FBQUEsb0JBQWpCeVQsaUJBQWlCO0FBQUE7QUFBQTtBQUFBLEtBQXZCLENBajJCbUMsQ0FnNEJuQztBQUNBOzs7QUFDQSxNQUFNTSxrQkFBa0I7QUFBQSxvVEFBRyxrQkFBT0MsUUFBUDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDekJwTyxxQkFBTyxDQUFDeUwsR0FBUixDQUFZLDBCQUFaLEVBQXdDMkMsUUFBeEM7O0FBRHlCLGtCQUVwQkEsUUFGb0I7QUFBQTtBQUFBO0FBQUE7O0FBR3ZCLGtCQUFJL1QsbUJBQW1CLEtBQUssTUFBNUIsRUFBb0M7QUFDbENULHVDQUF1QixDQUFDLGVBQUQsQ0FBdkI7QUFDQUYscUNBQXFCLENBQUMsSUFBRCxDQUFyQjtBQUNELGVBSEQsTUFHTyxJQUFJVyxtQkFBbUIsS0FBSyxTQUE1QixFQUF1QztBQUM1Q0wsMENBQTBCLENBQUMsZUFBRCxDQUExQjtBQUNBRix3Q0FBd0IsQ0FBQyxJQUFELENBQXhCO0FBQ0Q7O0FBQ0RNLGdDQUFrQixDQUFDLEtBQUQsQ0FBbEI7QUFWdUI7O0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBY0VvRiwwREFBUSxDQUFDQyxTQUFULEdBQXFCQyxVQUFyQixDQUFnQyxRQUFoQyxFQUEwQ0MsR0FBMUMsQ0FBOEN5TyxRQUE5QyxFQUF3RHhPLEdBQXhELEVBZEY7O0FBQUE7QUFjakJ5Tyx3QkFkaUI7O0FBZXZCLGtCQUFJQSxVQUFVLENBQUNDLE1BQWYsRUFBdUI7QUFDZkMsMEJBRGUsR0FDRkYsVUFBVSxDQUFDeE8sSUFBWCxFQURFOztBQUVyQixvQkFBSXhGLG1CQUFtQixLQUFLLE1BQTVCLEVBQW9DO0FBQ2xDVCx5Q0FBdUIsQ0FBQzJVLFVBQVUsQ0FBQzNaLElBQVosQ0FBdkI7QUFDQThFLHVDQUFxQixDQUFDMFUsUUFBRCxDQUFyQjtBQUNELGlCQUhELE1BR08sSUFBSS9ULG1CQUFtQixLQUFLLFNBQTVCLEVBQXVDO0FBQzVDTCw0Q0FBMEIsQ0FBQ3VVLFVBQVUsQ0FBQzNaLElBQVosQ0FBMUI7QUFDQWtGLDBDQUF3QixDQUFDc1UsUUFBRCxDQUF4QjtBQUNEO0FBQ0YsZUFURCxNQVNPO0FBQ0xwTyx1QkFBTyxDQUFDQyxLQUFSLENBQWMsa0NBQWQsRUFBa0RtTyxRQUFsRDtBQUNEOztBQTFCc0I7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUE0QnZCcE8scUJBQU8sQ0FBQ0MsS0FBUixDQUFjLDZCQUFkOztBQTVCdUI7QUE4QnpCN0YsZ0NBQWtCLENBQUMsS0FBRCxDQUFsQjs7QUE5QnlCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQUg7O0FBQUEsb0JBQWxCK1Qsa0JBQWtCO0FBQUE7QUFBQTtBQUFBLEtBQXhCOztBQWlDQSxNQUFNSyxnQkFBZ0IsR0FBRyxTQUFuQkEsZ0JBQW1CLENBQUNKLFFBQUQsRUFBV0ssVUFBWCxFQUEwQjtBQUNqRHpPLFdBQU8sQ0FBQ3lMLEdBQVIsc0JBQTBCMkMsUUFBMUIsNEJBQW9ESyxVQUFwRDtBQUNBdFMsVUFBTSxDQUFDOEgsSUFBUCxDQUFZLFlBQVltSyxRQUF4QjtBQUNELEdBSEQ7O0FBS0EsTUFBTU0sMEJBQTBCLEdBQUcsU0FBN0JBLDBCQUE2QixHQUFNO0FBQ3ZDLFFBQUlyVSxtQkFBbUIsS0FBSyxNQUE1QixFQUFvQztBQUNsQ1QsNkJBQXVCLENBQUMsZUFBRCxDQUF2QjtBQUNBRiwyQkFBcUIsQ0FBQyxJQUFELENBQXJCO0FBQ0QsS0FIRCxNQUdPLElBQUlXLG1CQUFtQixLQUFLLFNBQTVCLEVBQXVDO0FBQzVDTCxnQ0FBMEIsQ0FBQyxlQUFELENBQTFCO0FBQ0FGLDhCQUF3QixDQUFDLElBQUQsQ0FBeEI7QUFDRDs7QUFDRE0sc0JBQWtCLENBQUMsS0FBRCxDQUFsQjtBQUNELEdBVEQsQ0F4NkJtQyxDQW03Qm5DO0FBQ0E7QUFDQTs7O0FBcjdCbUMsb0JBczdCUHJGLHNEQUFRLENBQUMsRUFBRCxDQXQ3QkQ7QUFBQSxNQXM3QjVCNFosTUF0N0I0QjtBQUFBLE1BczdCcEJDLFNBdDdCb0I7O0FBQUEsb0JBdTdCUzdaLHNEQUFRLENBQUMsS0FBRCxDQXY3QmpCO0FBQUEsTUF1N0I1QjhaLGNBdjdCNEI7QUFBQSxNQXU3QlpDLGlCQXY3Qlk7O0FBQUEsb0JBdzdCVy9aLHNEQUFRLENBQUMsZUFBRCxDQXg3Qm5CO0FBQUEsTUF3N0I1QmdhLGVBeDdCNEI7QUFBQSxNQXc3QlhDLGtCQXg3Qlc7O0FBMDdCbkMsTUFBTUMsZ0JBQWdCO0FBQUEsb1RBQUc7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFDRUMsNEVBQVcsQ0FDbEM3VixXQURrQyxFQUVsQ0UsZ0JBRmtDLEVBR2xDRSxrQkFIa0MsQ0FEYjs7QUFBQTtBQUNqQjBWLHdCQURpQjtBQU12QlAsdUJBQVMsQ0FBQ08sVUFBRCxDQUFUO0FBQ0FDLGdDQUFrQixDQUFDLEVBQUQsQ0FBbEI7QUFDQU4sK0JBQWlCLENBQUMsSUFBRCxDQUFqQjs7QUFSdUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FBSDs7QUFBQSxvQkFBaEJHLGdCQUFnQjtBQUFBO0FBQUE7QUFBQSxLQUF0Qjs7QUFXQSxNQUFNSSxpQkFBaUIsR0FBRyxTQUFwQkEsaUJBQW9CLENBQUNDLFNBQUQsRUFBZTtBQUN2Q04sc0JBQWtCLENBQUNNLFNBQVMsSUFBSSxlQUFkLENBQWxCO0FBQ0EvUixvQkFBZ0IsQ0FBQytSLFNBQVMsSUFBSSxJQUFkLENBQWhCO0FBQ0FSLHFCQUFpQixDQUFDLEtBQUQsQ0FBakI7QUFDRCxHQUpEOztBQU1BLE1BQU1TLHlCQUF5QixHQUFHLFNBQTVCQSx5QkFBNEIsR0FBTTtBQUN0Q1Asc0JBQWtCLENBQUMsZUFBRCxDQUFsQjtBQUNBelIsb0JBQWdCLENBQUMsSUFBRCxDQUFoQjtBQUNBdVIscUJBQWlCLENBQUMsS0FBRCxDQUFqQjtBQUNELEdBSkQsQ0EzOEJtQyxDQWk5Qm5DO0FBQ0E7QUFDQTs7O0FBQ0EsTUFBTVUseUJBQXlCLEdBQUcsU0FBNUJBLHlCQUE0QixHQUFNO0FBQ3RDeFYsOEJBQTBCLENBQUMsaUJBQUQsQ0FBMUI7QUFDQUYsNEJBQXdCLENBQUM3RixlQUFELENBQXhCO0FBQ0ErTCxXQUFPLENBQUN5TCxHQUFSLENBQVkscURBQVosRUFBbUV4WCxlQUFuRTtBQUNELEdBSkQ7O0FBTUEsTUFBTXdiLDBCQUEwQixHQUFHLFNBQTdCQSwwQkFBNkIsR0FBTTtBQUN2Q3pWLDhCQUEwQixDQUFDLGtCQUFELENBQTFCO0FBQ0FGLDRCQUF3QixDQUFDNUYsZ0JBQUQsQ0FBeEI7QUFDQThMLFdBQU8sQ0FBQ3lMLEdBQVIsQ0FBWSxxREFBWixFQUFtRXZYLGdCQUFuRTtBQUNELEdBSkQ7O0FBTUEsTUFBTXdiLDhCQUE4QixHQUFHLFNBQWpDQSw4QkFBaUMsR0FBTTtBQUMzQzFWLDhCQUEwQixDQUFDLFlBQUQsQ0FBMUI7QUFDQUYsNEJBQXdCLENBQUMzRixvQkFBRCxDQUF4QjtBQUNBNkwsV0FBTyxDQUFDeUwsR0FBUixDQUFZLHFEQUFaLEVBQW1FdFgsb0JBQW5FO0FBQ0QsR0FKRDs7QUFoK0JtQyxvQkFzK0JhWSxzREFBUSxDQUFDLEVBQUQsQ0F0K0JyQjtBQUFBLE1BcytCNUI0YSxnQkF0K0I0QjtBQUFBLE1BcytCVnpCLG1CQXQrQlU7O0FBQUEsb0JBdStCV25aLHNEQUFRLENBQUMsRUFBRCxDQXYrQm5CO0FBQUEsTUF1K0I1QjZhLGVBditCNEI7QUFBQSxNQXUrQlhSLGtCQXYrQlc7O0FBeStCbkMsTUFBTWpELGlCQUFpQjtBQUFBLG9UQUFHLGtCQUFPRCxNQUFQO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNsQjJELHdCQURrQixHQUNMclEsMERBQVEsQ0FBQ3NRLE9BQVQsR0FBbUI3SixHQUFuQixFQURLO0FBRWxCOEosdUJBRmtCLEdBRU5GLFVBQVUsQ0FBQ0csS0FBWCxpQkFBMEI5RCxNQUExQixPQUZNO0FBQUE7QUFBQTtBQUFBLHFCQUlHNkQsU0FBUyxDQUFDRSxPQUFWLEVBSkg7O0FBQUE7QUFJaEJDLHdCQUpnQjtBQUtoQkMsNEJBTGdCLEdBS0NELFVBQVUsQ0FBQ0UsS0FBWCxDQUFpQnhULEdBQWpCLENBQXFCLFVBQUM1RixJQUFEO0FBQUEsdUJBQVVBLElBQUksVUFBSixFQUFWO0FBQUEsZUFBckIsQ0FMRDtBQUFBO0FBQUEscUJBTWhCekMsT0FBTyxDQUFDOGIsR0FBUixDQUFZRixjQUFaLENBTmdCOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFRdEJuUSxxQkFBTyxDQUFDQyxLQUFSLENBQWMsOEJBQWQ7O0FBUnNCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQUg7O0FBQUEsb0JBQWpCa00saUJBQWlCO0FBQUE7QUFBQTtBQUFBLEtBQXZCOztBQVlBLE1BQU1tRSx5QkFBeUI7QUFBQSxvVEFBRyxtQkFBT3BFLE1BQVA7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQzFCeEgsZ0JBRDBCLEdBQ3JCbEYsMERBQVEsQ0FBQ0MsU0FBVCxFQURxQjtBQUFBO0FBQUE7QUFBQSxxQkFHeEJpRixFQUFFLENBQUNoRixVQUFILENBQWMsT0FBZCxFQUF1QkMsR0FBdkIsQ0FBMkJ1TSxNQUEzQixhQUh3Qjs7QUFBQTtBQUk5QmxNLHFCQUFPLENBQUN5TCxHQUFSLCtDQUFtRFMsTUFBbkQ7QUFKOEI7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFNOUJsTSxxQkFBTyxDQUFDQyxLQUFSLENBQWMsdUNBQWQ7O0FBTjhCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQUg7O0FBQUEsb0JBQXpCcVEseUJBQXlCO0FBQUE7QUFBQTtBQUFBLEtBQS9CLENBci9CbUMsQ0ErL0JuQztBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQSxNQUFNQyxlQUFlLEdBQUd6SCxJQUFJLENBQUMwSCxHQUFMLENBQ3RCLENBRHNCLEVBRXRCeFMsV0FBVyxDQUFDd00sTUFBWixDQUFtQmxFLE9BQW5CLEVBQTRCdFEsTUFBNUIsSUFBc0NrSSxXQUFXLEdBQUcsQ0FBSCxHQUFPLENBQXhELENBRnNCLENBQXhCOztBQUlBLE1BQU11UyxXQUFXLEdBQUksWUFBTTtBQUN6QixRQUFNQyxPQUFPLEdBQUcsRUFBaEI7QUFDQSxRQUFNQyxVQUFVLEdBQUcsQ0FBbkI7O0FBRUEsUUFBTUMsUUFBUSxHQUFHLFNBQVhBLFFBQVcsQ0FBQ0MsQ0FBRDtBQUFBLGFBQ2ZILE9BQU8sQ0FBQ3pNLElBQVIsQ0FDRSxNQUFDLDBEQUFELENBQVksSUFBWjtBQUNFLFdBQUcsaUJBQVU0TSxDQUFWLENBREw7QUFFRSxjQUFNLEVBQUVBLENBQUMsS0FBSy9TLElBRmhCO0FBR0UsZUFBTyxFQUFFO0FBQUEsaUJBQU1DLE9BQU8sQ0FBQzhTLENBQUQsQ0FBYjtBQUFBLFNBSFg7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUtHQSxDQUxILENBREYsQ0FEZTtBQUFBLEtBQWpCOztBQVdBLFFBQU1DLFlBQVksR0FBRyxTQUFmQSxZQUFlLENBQUM3WixHQUFEO0FBQUEsYUFDbkJ5WixPQUFPLENBQUN6TSxJQUFSLENBQWEsTUFBQywwREFBRCxDQUFZLFFBQVo7QUFBcUIsV0FBRyxFQUFFaE4sR0FBMUI7QUFBK0IsZ0JBQVEsTUFBdkM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxRQUFiLENBRG1CO0FBQUEsS0FBckI7O0FBR0EsUUFBSXNaLGVBQWUsSUFBSUksVUFBdkIsRUFBbUM7QUFDakMsV0FBSyxJQUFJN1QsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsSUFBSXlULGVBQXJCLEVBQXNDelQsQ0FBQyxJQUFJLENBQTNDO0FBQThDOFQsZ0JBQVEsQ0FBQzlULENBQUQsQ0FBUjtBQUE5Qzs7QUFDQSxhQUFPNFQsT0FBUDtBQUNEOztBQUVELFFBQUlLLEtBQUssR0FBR2pJLElBQUksQ0FBQzBILEdBQUwsQ0FBUyxDQUFULEVBQVkxUyxJQUFJLEdBQUcsQ0FBbkIsQ0FBWjtBQUNBLFFBQUlrVCxHQUFHLEdBQUdsSSxJQUFJLENBQUNtSSxHQUFMLENBQVNWLGVBQWUsR0FBRyxDQUEzQixFQUE4QnpTLElBQUksR0FBRyxDQUFyQyxDQUFWO0FBRUEsUUFBTW9ULGFBQWEsR0FBR1AsVUFBVSxHQUFHLENBQW5DO0FBQ0EsUUFBSVEsYUFBYSxHQUFHSCxHQUFHLEdBQUdELEtBQU4sR0FBYyxDQUFsQztBQUNBLFFBQUlLLFNBQVMsR0FBR0YsYUFBYSxHQUFHQyxhQUFoQzs7QUFFQSxXQUFPQyxTQUFTLEdBQUcsQ0FBbkIsRUFBc0I7QUFDcEIsVUFBSUwsS0FBSyxHQUFHLENBQVosRUFBZTtBQUNiQSxhQUFLLElBQUksQ0FBVDtBQUNBSyxpQkFBUyxJQUFJLENBQWI7QUFDRDs7QUFDRCxVQUFJQSxTQUFTLEdBQUcsQ0FBWixJQUFpQkosR0FBRyxHQUFHVCxlQUFlLEdBQUcsQ0FBN0MsRUFBZ0Q7QUFDOUNTLFdBQUcsSUFBSSxDQUFQO0FBQ0FJLGlCQUFTLElBQUksQ0FBYjtBQUNEOztBQUNELFVBQUlMLEtBQUssS0FBSyxDQUFWLElBQWVDLEdBQUcsS0FBS1QsZUFBZSxHQUFHLENBQTdDLEVBQWdEO0FBQ2pEOztBQUVESyxZQUFRLENBQUMsQ0FBRCxDQUFSO0FBQ0EsUUFBSUcsS0FBSyxHQUFHLENBQVosRUFBZUQsWUFBWSxDQUFDLGdCQUFELENBQVo7O0FBQ2YsU0FBSyxJQUFJaFUsRUFBQyxHQUFHaVUsS0FBYixFQUFvQmpVLEVBQUMsSUFBSWtVLEdBQXpCLEVBQThCbFUsRUFBQyxJQUFJLENBQW5DO0FBQXNDOFQsY0FBUSxDQUFDOVQsRUFBRCxDQUFSO0FBQXRDOztBQUNBLFFBQUlrVSxHQUFHLEdBQUdULGVBQWUsR0FBRyxDQUE1QixFQUErQk8sWUFBWSxDQUFDLGNBQUQsQ0FBWjtBQUMvQkYsWUFBUSxDQUFDTCxlQUFELENBQVI7QUFDQSxRQUFJclMsV0FBSixFQUFpQjRTLFlBQVksQ0FBQyxlQUFELENBQVo7QUFFakIsV0FBT0osT0FBUDtBQUNELEdBbERtQixFQUFwQjs7QUFvREEsTUFBTVcsY0FBYyxHQUFHOVIseURBQVcsQ0FBQyxZQUFNO0FBQ3ZDLGVBQW1DLEVBQU87QUFDMUMsUUFBSXpCLElBQUksS0FBSyxDQUFiLEVBQWdCO0FBQ2hCLFFBQUksQ0FBQ2EsWUFBWSxDQUFDeUYsT0FBbEIsRUFBMkI7QUFDM0IsUUFBTWtOLGVBQWUsR0FDbkIzUyxZQUFZLENBQUN5RixPQUFiLENBQXFCbU4scUJBQXJCLEdBQTZDQyxNQUE3QyxJQUF1RCxDQUR6RDtBQUVBLFFBQUksQ0FBQ0YsZUFBTCxFQUFzQjtBQUV0QixRQUFNRyxTQUFTLEdBQ2I5UyxZQUFZLENBQUN5RixPQUFiLENBQXFCc04sYUFBckIsQ0FBbUMsZ0JBQW5DLEtBQ0EvUyxZQUFZLENBQUN5RixPQUFiLENBQXFCc04sYUFBckIsQ0FBbUMsVUFBbkMsQ0FGRjtBQUdBLFFBQU1DLE9BQU8sR0FDWGhULFlBQVksQ0FBQ3lGLE9BQWIsQ0FBcUJzTixhQUFyQixDQUFtQyxnQkFBbkMsS0FDQS9TLFlBQVksQ0FBQ3lGLE9BQWIsQ0FBcUJzTixhQUFyQixDQUFtQyxVQUFuQyxDQUZGOztBQUlBLFFBQUlELFNBQUosRUFBZTtBQUNiLFVBQU1HLENBQUMsR0FBR0gsU0FBUyxDQUFDRixxQkFBVixHQUFrQ0MsTUFBNUM7QUFDQSxVQUFJSSxDQUFKLEVBQU8vUyxlQUFlLENBQUN1RixPQUFoQixHQUEwQndOLENBQTFCO0FBQ1I7O0FBQ0QsUUFBSUQsT0FBSixFQUFhO0FBQ1gsVUFBTTdILENBQUMsR0FBRzZILE9BQU8sQ0FBQ0oscUJBQVIsR0FBZ0NDLE1BQTFDO0FBQ0EsVUFBSTFILENBQUosRUFBT2xMLFlBQVksQ0FBQ3dGLE9BQWIsR0FBdUIwRixDQUF2QjtBQUNSOztBQUVELFFBQU0rSCxlQUFlLEdBQUcsRUFBeEI7QUFDQSxRQUFNQyxTQUFTLEdBQ2JSLGVBQWUsR0FBR3pTLGVBQWUsQ0FBQ3VGLE9BQWxDLEdBQTRDeU4sZUFEOUM7QUFFQSxRQUFNRSxTQUFTLEdBQUdqSixJQUFJLENBQUNrSixLQUFMLENBQVdGLFNBQVMsR0FBR2xULFlBQVksQ0FBQ3dGLE9BQXBDLENBQWxCO0FBQ0EsUUFBTTZOLE9BQU8sR0FBR25KLElBQUksQ0FBQzBILEdBQUwsQ0FBUyxDQUFULEVBQVkxSCxJQUFJLENBQUNtSSxHQUFMLENBQVMsRUFBVCxFQUFhYyxTQUFiLENBQVosQ0FBaEI7O0FBQ0EsUUFBSUUsT0FBTyxHQUFHLENBQVYsSUFBZUEsT0FBTyxLQUFLMVosUUFBL0IsRUFBeUM7QUFDdkNDLGlCQUFXLENBQUN5WixPQUFELENBQVg7QUFDQWhLLHFCQUFlO0FBQ2Z6SixtQkFBYSxDQUFDLFVBQUN3RyxDQUFEO0FBQUEsZUFBT0EsQ0FBQyxHQUFHLENBQVg7QUFBQSxPQUFELENBQWI7QUFDRDtBQUNGLEdBbENpQyxFQWtDL0IsQ0FBQ2xILElBQUQsRUFBT3ZGLFFBQVAsQ0FsQytCLENBQWxDO0FBb0NBckQseURBQVMsQ0FBQyxZQUFNO0FBQ2QsZUFBbUMsRUFBTztBQUMxQ21jLGtCQUFjOztBQUNkLFFBQU1hLFFBQVEsR0FBRyxTQUFYQSxRQUFXO0FBQUEsYUFBTWIsY0FBYyxFQUFwQjtBQUFBLEtBQWpCOztBQUNBL00sVUFBTSxDQUFDNk4sZ0JBQVAsQ0FBd0IsUUFBeEIsRUFBa0NELFFBQWxDO0FBQ0EsV0FBTztBQUFBLGFBQU01TixNQUFNLENBQUM4TixtQkFBUCxDQUEyQixRQUEzQixFQUFxQ0YsUUFBckMsQ0FBTjtBQUFBLEtBQVA7QUFDRCxHQU5RLEVBTU4sQ0FBQ2IsY0FBRCxDQU5NLENBQVQ7QUFRQW5jLHlEQUFTLENBQUMsWUFBTTtBQUNkLFFBQUlGLFNBQVMsSUFBSThJLElBQUksS0FBSyxDQUExQixFQUE2QjtBQUM3QnVULGtCQUFjO0FBQ2YsR0FIUSxFQUdOLENBQUN2VCxJQUFELEVBQU85SSxTQUFQLEVBQWtCcWMsY0FBbEIsQ0FITSxDQUFUOztBQUtBLE1BQU1nQixhQUFhLEdBQUcsU0FBaEJBLGFBQWdCLENBQUNDLFFBQUQ7QUFBQSxXQUNwQjtBQUFLLGVBQVMsRUFBRUMscUVBQU0sQ0FBQ0MsWUFBdkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQUNFO0FBQUssZUFBUyxFQUFFRCxxRUFBTSxDQUFDRSxhQUF2QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQUNFO0FBQUssZUFBUyxFQUFFRixxRUFBTSxDQUFDRyxZQUF2QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQURGLEVBRUU7QUFBSyxlQUFTLEVBQUVILHFFQUFNLENBQUNJLGVBQXZCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsMERBRkYsQ0FERixFQU9HdE0sZ0JBQWdCLEdBQ2Y7QUFBTSxlQUFTLEVBQUVrTSxxRUFBTSxDQUFDSyxZQUF4QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGdCQURlLEdBRWIsSUFUTixDQURGLEVBYUU7QUFBSyxlQUFTLEVBQUVMLHFFQUFNLENBQUNNLGFBQXZCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FDRTtBQUFLLGVBQVMsRUFBRU4scUVBQU0sQ0FBQ08sa0JBQXZCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBREYsRUFFRSxNQUFDLDBEQUFEO0FBQVksZUFBUyxFQUFFUCxxRUFBTSxDQUFDUSxVQUE5QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BQ0UsTUFBQywwREFBRCxDQUFZLElBQVo7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQURGLEVBRUUsTUFBQyx3REFBRDtBQUFVLGNBQVEsRUFBRTVGLGFBQXBCO0FBQW1DLGVBQVMsRUFBQyxPQUE3QztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BQ0UsTUFBQyx3REFBRCxDQUFVLE1BQVY7QUFDRSxhQUFPLEVBQUMsbUJBRFY7QUFFRSxRQUFFLFlBQUttRixRQUFMLFNBRko7QUFHRSxlQUFTLGtCQUFXQyxxRUFBTSxDQUFDUyxXQUFsQixDQUhYO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FLR2pHLGFBTEgsQ0FERixFQVFFLE1BQUMsd0RBQUQsQ0FBVSxJQUFWO0FBQWUsZUFBUyxFQUFDLE9BQXpCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FDRSxNQUFDLHdEQUFELENBQVUsSUFBVjtBQUFlLGNBQVEsRUFBQyxZQUF4QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQURGLEVBRUUsTUFBQyx3REFBRCxDQUFVLElBQVY7QUFBZSxjQUFRLEVBQUMsSUFBeEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQUZGLEVBR0UsTUFBQyx3REFBRCxDQUFVLElBQVY7QUFBZSxjQUFRLEVBQUMsU0FBeEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFIRixFQUlFLE1BQUMsd0RBQUQsQ0FBVSxJQUFWO0FBQWUsY0FBUSxFQUFDLFNBQXhCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBSkYsRUFLRSxNQUFDLHdEQUFELENBQVUsSUFBVjtBQUFlLGNBQVEsRUFBQyxTQUF4QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUxGLENBUkYsQ0FGRixDQUZGLEVBc0JFLE1BQUMsMERBQUQ7QUFBWSxlQUFTLEVBQUV3RixxRUFBTSxDQUFDUSxVQUE5QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BQ0UsTUFBQywwREFBRCxDQUFZLElBQVo7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxrQkFERixFQUVFLE1BQUMsd0RBQUQ7QUFBVSxjQUFRLEVBQUV6RixhQUFwQjtBQUFtQyxlQUFTLEVBQUMsT0FBN0M7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQUNFLE1BQUMsd0RBQUQsQ0FBVSxNQUFWO0FBQ0UsYUFBTyxFQUFDLG1CQURWO0FBRUUsUUFBRSxZQUFLZ0YsUUFBTCxjQUZKO0FBR0UsZUFBUyxrQkFBV0MscUVBQU0sQ0FBQ1MsV0FBbEIsQ0FIWDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BS0cvRixhQUxILENBREYsRUFRRSxNQUFDLHdEQUFELENBQVUsSUFBVjtBQUFlLGVBQVMsRUFBQyxPQUF6QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BQ0UsTUFBQyx3REFBRCxDQUFVLElBQVY7QUFBZSxjQUFRLEVBQUMsWUFBeEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFERixFQUVFLE1BQUMsd0RBQUQsQ0FBVSxJQUFWO0FBQWUsY0FBUSxFQUFDLElBQXhCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFGRixFQUdFLE1BQUMsd0RBQUQsQ0FBVSxJQUFWO0FBQWUsY0FBUSxFQUFDLEtBQXhCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFIRixDQVJGLENBRkYsQ0F0QkYsRUF3Q0UsTUFBQywwREFBRDtBQUFZLGVBQVMsRUFBRXNGLHFFQUFNLENBQUNRLFVBQTlCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FDRSxNQUFDLDBEQUFELENBQVksSUFBWjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBREYsRUFFRSxNQUFDLHNEQUFEO0FBQ0UsYUFBTyxFQUFDLG1CQURWO0FBRUUsZUFBUyxrQkFBV1IscUVBQU0sQ0FBQ1MsV0FBbEIsQ0FGWDtBQUdFLGFBQU8sRUFBRS9ELGdCQUhYO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FLR0YsZUFMSCxDQUZGLENBeENGLENBYkYsRUFpRUU7QUFBSyxlQUFTLEVBQUV3RCxxRUFBTSxDQUFDTSxhQUF2QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BQ0U7QUFBSyxlQUFTLEVBQUVOLHFFQUFNLENBQUNPLGtCQUF2QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGdCQURGLEVBRUUsTUFBQywwREFBRDtBQUFZLGVBQVMsRUFBRVAscUVBQU0sQ0FBQ1EsVUFBOUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQUNFLE1BQUMsMERBQUQsQ0FBWSxJQUFaO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBREYsRUFFRSxNQUFDLHNEQUFEO0FBQ0UsYUFBTyxFQUFDLG1CQURWO0FBRUUsZUFBUyxrQkFBV1IscUVBQU0sQ0FBQ1MsV0FBbEIsQ0FGWDtBQUdFLGFBQU8sRUFBRTtBQUFBLGVBQU1uRixpQkFBaUIsQ0FBQyxNQUFELENBQXZCO0FBQUEsT0FIWDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BS0dsVSxvQkFMSCxDQUZGLENBRkYsRUFhRSxNQUFDLDBEQUFEO0FBQVksZUFBUyxFQUFFNFkscUVBQU0sQ0FBQ1EsVUFBOUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQUNFLE1BQUMsMERBQUQsQ0FBWSxJQUFaO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsd0JBREYsRUFFRSxNQUFDLHNEQUFEO0FBQ0UsYUFBTyxFQUFDLG1CQURWO0FBRUUsZUFBUyxrQkFBV1IscUVBQU0sQ0FBQ1MsV0FBbEIsQ0FGWDtBQUdFLGFBQU8sRUFBRTtBQUFBLGVBQU1uRixpQkFBaUIsQ0FBQyxTQUFELENBQXZCO0FBQUEsT0FIWDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BS0c5VCx1QkFMSCxDQUZGLENBYkYsQ0FqRUYsRUEwRkU7QUFBSyxlQUFTLEVBQUV3WSxxRUFBTSxDQUFDTSxhQUF2QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BQ0U7QUFBSyxlQUFTLEVBQUVOLHFFQUFNLENBQUNPLGtCQUF2QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQURGLEVBRUUsTUFBQywwREFBRDtBQUFZLGVBQVMsRUFBRVAscUVBQU0sQ0FBQ1EsVUFBOUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQUNFLE1BQUMsMERBQUQsQ0FBWSxJQUFaO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFERixFQUVFO0FBQUssZUFBUyxFQUFFUixxRUFBTSxDQUFDVSxXQUF2QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BQ0UsTUFBQyxzREFBRDtBQUNFLGFBQU8sRUFBQyxtQkFEVjtBQUVFLGVBQVMsRUFBRVYscUVBQU0sQ0FBQ1csVUFGcEI7QUFHRSxhQUFPLEVBQUUxRCx5QkFIWDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHlCQURGLEVBUUUsTUFBQyxzREFBRDtBQUNFLGFBQU8sRUFBQyxtQkFEVjtBQUVFLGVBQVMsRUFBRStDLHFFQUFNLENBQUNXLFVBRnBCO0FBR0UsYUFBTyxFQUFFekQsMEJBSFg7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSwwQkFSRixFQWVFLE1BQUMsc0RBQUQ7QUFDRSxhQUFPLEVBQUMsbUJBRFY7QUFFRSxlQUFTLEVBQUU4QyxxRUFBTSxDQUFDVyxVQUZwQjtBQUdFLGFBQU8sRUFBRXhELDhCQUhYO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsb0JBZkYsQ0FGRixDQUZGLENBMUZGLENBRG9CO0FBQUEsR0FBdEI7O0FBNEhBLFNBQ0UsTUFBQyxrREFBRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0csQ0FBQzlSLFVBQVUsSUFBSW5GLFlBQWYsS0FDQztBQUFLLGFBQVMsRUFBRThaLHFFQUFNLENBQUNZLGNBQXZCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDRTtBQUNFLE9BQUcsRUFBQyxpQkFETjtBQUVFLE9BQUcsRUFBQyxlQUZOO0FBR0UsYUFBUyxFQUFFWixxRUFBTSxDQUFDYSxXQUhwQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBREYsQ0FGSixFQVVFLE1BQUMscURBQUQ7QUFBTyxRQUFJLEVBQUV6SCxlQUFiO0FBQThCLFVBQU0sRUFBRUssc0JBQXRDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDRSxNQUFDLHFEQUFELENBQU8sTUFBUDtBQUFjLGVBQVcsTUFBekI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFLE1BQUMscURBQUQsQ0FBTyxLQUFQO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsd0JBREYsQ0FERixFQUlFLE1BQUMscURBQUQsQ0FBTyxJQUFQO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEseUNBQ21DTixhQUFhLENBQUMxVixNQURqRCxXQUVHMFYsYUFBYSxDQUFDMVYsTUFBZCxHQUF1QixDQUF2QixHQUEyQixHQUEzQixHQUFpQyxFQUZwQyxNQUpGLEVBUUUsTUFBQyxxREFBRCxDQUFPLE1BQVA7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFLE1BQUMsc0RBQUQ7QUFBUSxXQUFPLEVBQUMsUUFBaEI7QUFBeUIsV0FBTyxFQUFFaVcsb0JBQWxDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBREYsRUFJRSxNQUFDLHNEQUFEO0FBQVEsV0FBTyxFQUFDLFdBQWhCO0FBQTRCLFdBQU8sRUFBRUQsc0JBQXJDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsY0FKRixDQVJGLENBVkYsRUE0QkUsTUFBQyxxREFBRDtBQUFPLFFBQUksRUFBRTdSLGVBQWI7QUFBOEIsVUFBTSxFQUFFO0FBQUEsYUFBTUMsa0JBQWtCLENBQUMsS0FBRCxDQUF4QjtBQUFBLEtBQXRDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDRSxNQUFDLHFEQUFELENBQU8sTUFBUDtBQUFjLGVBQVcsTUFBekI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFLE1BQUMscURBQUQsQ0FBTyxLQUFQO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsZ0JBQ1VDLG1CQUFtQixLQUFLLE1BQXhCLEdBQWlDLGFBQWpDLEdBQWlELGdCQUQzRCxDQURGLENBREYsRUFNRSxNQUFDLHFEQUFELENBQU8sSUFBUDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0UsTUFBQywyREFBRDtBQUNFLFFBQUksRUFBQyxNQURQO0FBRUUsZUFBVyxFQUFDLGdCQUZkO0FBR0UsYUFBUyxFQUFDLE1BSFo7QUFJRSxTQUFLLEVBQUVzVixnQkFKVDtBQUtFLFlBQVEsRUFBRSxrQkFBQzBELENBQUQ7QUFBQSxhQUFPbkYsbUJBQW1CLENBQUNtRixDQUFDLENBQUMxSSxNQUFGLENBQVNyVixLQUFWLENBQTFCO0FBQUEsS0FMWjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBREYsRUFRRSxNQUFDLDJEQUFEO0FBQ0UsV0FBTyxFQUFFLENBQUMySixLQUFLLENBQUNvQixPQUFOLENBQWNwRyxPQUFkLElBQXlCQSxPQUF6QixHQUFtQyxFQUFwQyxFQUF3Q3VRLE1BQXhDLENBQ1AsVUFBQzhJLE1BQUQ7QUFBQTs7QUFBQSxhQUFZLGlCQUFDQSxNQUFELGFBQUNBLE1BQUQsdUJBQUNBLE1BQU0sQ0FBRTFlLElBQVQsdURBQWlCLEVBQWpCLEVBQXFCaUMsV0FBckIsR0FBbUM2UCxRQUFuQyxDQUE0Q2lKLGdCQUFnQixDQUFDOVksV0FBakIsRUFBNUMsQ0FBWjtBQUFBLEtBRE8sQ0FEWDtBQUlFLGtCQUFjLEVBQUVzWCxrQkFKbEI7QUFLRSxlQUFXLEVBQUVLLGdCQUxmO0FBTUUsa0JBQWMsRUFBRSxLQU5sQjtBQU9FLGtCQUFjLEVBQUU7QUFBQSxhQUFNTCxrQkFBa0IsQ0FBQyxJQUFELENBQXhCO0FBQUEsS0FQbEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQVJGLENBTkYsQ0E1QkYsRUFzREUsTUFBQyxxREFBRDtBQUFPLFFBQUksRUFBRVUsY0FBYjtBQUE2QixVQUFNLEVBQUU7QUFBQSxhQUFNQyxpQkFBaUIsQ0FBQyxLQUFELENBQXZCO0FBQUEsS0FBckM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFLE1BQUMscURBQUQsQ0FBTyxNQUFQO0FBQWMsZUFBVyxNQUF6QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0UsTUFBQyxxREFBRCxDQUFPLEtBQVA7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxvQkFERixDQURGLEVBSUUsTUFBQyxxREFBRCxDQUFPLElBQVA7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFLE1BQUMsMkRBQUQ7QUFDRSxRQUFJLEVBQUMsTUFEUDtBQUVFLGVBQVcsRUFBQyxnQkFGZDtBQUdFLGFBQVMsRUFBQyxNQUhaO0FBSUUsU0FBSyxFQUFFYyxlQUpUO0FBS0UsWUFBUSxFQUFFLGtCQUFDeUQsQ0FBRDtBQUFBLGFBQU9qRSxrQkFBa0IsQ0FBQ2lFLENBQUMsQ0FBQzFJLE1BQUYsQ0FBU3JWLEtBQVYsQ0FBekI7QUFBQSxLQUxaO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFERixFQVFFLE1BQUMsMERBQUQ7QUFDRSxVQUFNLEVBQUVxWixNQUFNLENBQUNuRSxNQUFQLENBQWMsVUFBQytJLEtBQUQ7QUFBQSxhQUNwQixPQUFPQSxLQUFQLEtBQWlCLFFBQWpCLEdBQ0lBLEtBQUssQ0FBQzFjLFdBQU4sR0FBb0I2UCxRQUFwQixDQUE2QmtKLGVBQWUsQ0FBQy9ZLFdBQWhCLEVBQTdCLENBREosR0FFSSxLQUhnQjtBQUFBLEtBQWQsQ0FEVjtBQU1FLGlCQUFhLEVBQUV3WSxpQkFOakI7QUFPRSxrQkFBYyxFQUFFO0FBQUEsYUFBTUEsaUJBQWlCLENBQUMsSUFBRCxDQUF2QjtBQUFBLEtBUGxCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFSRixDQUpGLENBdERGLEVBOEVFO0FBQUssYUFBUyxFQUFFa0QscUVBQU0sQ0FBQ3pVLElBQXZCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDRTtBQUFLLGFBQVMsRUFBRXlVLHFFQUFNLENBQUNpQixTQUF2QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0U7QUFBUSxhQUFTLEVBQUVqQixxRUFBTSxDQUFDa0IsTUFBMUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFO0FBQUssYUFBUyxFQUFFbEIscUVBQU0sQ0FBQ21CLFVBQXZCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDRTtBQUNFLFFBQUksRUFBQyxRQURQO0FBRUUsYUFBUyxFQUFFbkIscUVBQU0sQ0FBQ29CLE1BRnBCO0FBR0UsV0FBTyxFQUFFO0FBQUEsYUFBTXJiLGNBQWMsQ0FBQyxJQUFELENBQXBCO0FBQUEsS0FIWDtBQUlFLGtCQUFXLGNBSmI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQU1FO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFORixFQU9FO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFQRixFQVFFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFSRixDQURGLEVBV0U7QUFBSyxhQUFTLEVBQUVpYSxxRUFBTSxDQUFDcUIsS0FBdkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFO0FBQ0UsT0FBRyxFQUFDLGlCQUROO0FBRUUsT0FBRyxFQUFDLE9BRk47QUFHRSxhQUFTLEVBQUVyQixxRUFBTSxDQUFDc0IsU0FIcEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQURGLEVBTUU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFO0FBQUssYUFBUyxFQUFFdEIscUVBQU0sQ0FBQ3VCLFNBQXZCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFERixFQUVFO0FBQUssYUFBUyxFQUFFdkIscUVBQU0sQ0FBQ3dCLFFBQXZCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsd0JBRkYsQ0FORixDQVhGLENBREYsRUF3QkU7QUFBSyxhQUFTLEVBQUV4QixxRUFBTSxDQUFDeUIsV0FBdkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFO0FBQUssYUFBUyxFQUFFekIscUVBQU0sQ0FBQzBCLFlBQXZCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDRzVOLGdCQUFnQixHQUFHLGdCQUFILEdBQXNCLFdBRHpDLENBREYsQ0F4QkYsQ0FERixFQWdDRTtBQUFLLGFBQVMsRUFBRWtNLHFFQUFNLENBQUMyQixPQUF2QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0U7QUFBTyxhQUFTLEVBQUUzQixxRUFBTSxDQUFDNEIsT0FBekI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUFtQzlCLGFBQWEsQ0FBQyxTQUFELENBQWhELENBREYsRUFFRTtBQUFNLGFBQVMsRUFBRUUscUVBQU0sQ0FBQzZCLElBQXhCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDRTtBQUFLLGFBQVMsRUFBRTdCLHFFQUFNLENBQUM4QixTQUF2QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0U7QUFBSyxhQUFTLEVBQUU5QixxRUFBTSxDQUFDK0IsV0FBdkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDRTtBQUFLLGFBQVMsRUFBRS9CLHFFQUFNLENBQUNnQyxVQUF2QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBREYsRUFFRTtBQUFLLGFBQVMsRUFBRWhDLHFFQUFNLENBQUNpQyxhQUF2QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0d4ZixTQUFTLEdBQUcsZUFBSCxhQUF3QjBDLElBQUksQ0FBQzFCLE1BQTdCLHdCQURaLENBRkYsQ0FERixFQU9FO0FBQUssYUFBUyxFQUFFdWMscUVBQU0sQ0FBQ2tDLFNBQXZCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsY0FDUTNXLElBRFIsT0FDZUksV0FBVyxnQkFBU3FTLGVBQVQsc0JBQW9DQSxlQUFwQyxDQUQxQixDQVBGLENBREYsRUFhRTtBQUFLLGFBQVMsRUFBRWdDLHFFQUFNLENBQUNtQyxTQUF2QjtBQUFrQyxPQUFHLEVBQUUvVixZQUF2QztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0czSixTQUFTLEdBQ1I7QUFBSyxhQUFTLEVBQUV1ZCxxRUFBTSxDQUFDb0MsWUFBdkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFO0FBQ0UsT0FBRyxFQUFDLGlCQUROO0FBRUUsT0FBRyxFQUFDLGVBRk47QUFHRSxhQUFTLEVBQUVwQyxxRUFBTSxDQUFDYSxXQUhwQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBREYsRUFNRTtBQUFLLGFBQVMsRUFBRWIscUVBQU0sQ0FBQ3FDLFdBQXZCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFORixDQURRLEdBU05uVyxTQUFTLEdBQ1g7QUFBSyxhQUFTLEVBQUU4VCxxRUFBTSxDQUFDc0MsVUFBdkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFO0FBQUssYUFBUyxFQUFFdEMscUVBQU0sQ0FBQ3VDLFVBQXZCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsc0JBQ2dCclcsU0FBUyxDQUFDbUssSUFEMUIsTUFERixFQUlFO0FBQUssYUFBUyxFQUFFMkoscUVBQU0sQ0FBQ3dDLFlBQXZCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FBc0N0VyxTQUFTLENBQUNvSyxPQUFoRCxDQUpGLEVBS0UsTUFBQyxzREFBRDtBQUNFLFdBQU8sRUFBQyxtQkFEVjtBQUVFLFFBQUksRUFBQyxJQUZQO0FBR0UsV0FBTyxFQUFFLG1CQUFNO0FBQ2JaLHFCQUFlO0FBQ2Z6SixtQkFBYSxDQUFDLFVBQUN3RyxDQUFEO0FBQUEsZUFBT0EsQ0FBQyxHQUFHLENBQVg7QUFBQSxPQUFELENBQWI7QUFDRCxLQU5IO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFMRixDQURXLEdBa0JYLE1BQUMseURBQUQ7QUFDRSxRQUFJLEVBQUV0TixJQURSO0FBRUUsVUFBTSxFQUFFc0YsTUFGVjtBQUdFLE9BQUcsRUFBRS9FLEdBSFA7QUFJRSxjQUFVLEVBQUV5VSxVQUpkO0FBS0UsZ0JBQVksRUFBRTdCLFlBTGhCO0FBTUUsZUFBVyxFQUFFeUIsV0FOZjtBQU9FLGNBQVUsRUFBRTFPLFVBUGQ7QUFRRSxhQUFTLEVBQUU0TixTQVJiO0FBU0UsaUJBQWEsRUFBRW5PLGFBVGpCO0FBVUUsY0FBVSxFQUFFRCxVQVZkO0FBV0UsaUJBQWEsRUFBRXNPLGFBWGpCO0FBWUUsb0JBQWdCLEVBQUV0QixnQkFacEI7QUFhRSxXQUFPLEVBQUU3UixRQWJYO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUE1QkosQ0FiRixFQTJERTtBQUFLLGFBQVMsRUFBRWdhLHFFQUFNLENBQUN5QyxXQUF2QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0U7QUFBSyxhQUFTLEVBQUV6QyxxRUFBTSxDQUFDMEMsYUFBdkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFLE1BQUMsMERBQUQ7QUFBWSxRQUFJLEVBQUMsSUFBakI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFLE1BQUMsMERBQUQsQ0FBWSxJQUFaO0FBQ0UsV0FBTyxFQUFFO0FBQUEsYUFBTWxYLE9BQU8sQ0FBQyxVQUFDOFMsQ0FBRDtBQUFBLGVBQU8vSCxJQUFJLENBQUMwSCxHQUFMLENBQVMsQ0FBVCxFQUFZSyxDQUFDLEdBQUcsQ0FBaEIsQ0FBUDtBQUFBLE9BQUQsQ0FBYjtBQUFBLEtBRFg7QUFFRSxZQUFRLEVBQUUvUyxJQUFJLElBQUksQ0FGcEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxnQkFERixFQU9HMlMsV0FQSCxFQVFFLE1BQUMsMERBQUQsQ0FBWSxJQUFaO0FBQ0UsV0FBTyxFQUFFO0FBQUEsYUFBTTFTLE9BQU8sQ0FBQyxVQUFDOFMsQ0FBRDtBQUFBLGVBQU9BLENBQUMsR0FBRyxDQUFYO0FBQUEsT0FBRCxDQUFiO0FBQUEsS0FEWDtBQUVFLFlBQVEsRUFBRSxDQUFDM1MsV0FGYjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFlBUkYsQ0FERixDQURGLEVBa0JFLE1BQUMsb0RBQUQ7QUFBTSxhQUFTLEVBQUVxVSxxRUFBTSxDQUFDMkMsU0FBeEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFLE1BQUMsMkRBQUQ7QUFDRSxRQUFJLEVBQUVqYyxjQURSO0FBRUUsZUFBVyxFQUFDLFFBRmQ7QUFHRSxhQUFTLEVBQUVzWixxRUFBTSxDQUFDNEMsV0FIcEI7QUFJRSxrQkFBVyxRQUpiO0FBS0UsU0FBSyxFQUFFaGMsTUFMVDtBQU1FLFlBQVEsRUFBRXNSLG1CQU5aO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFERixFQVNFLE1BQUMsMkRBQUQ7QUFDRSxTQUFLLEVBQUU1UixNQURUO0FBRUUsTUFBRSxFQUFDLHlCQUZMO0FBR0UsUUFBSSxFQUFFRSxRQUhSO0FBSUUsZ0JBQVksRUFBRTtBQUFBLGFBQU1DLFdBQVcsQ0FBQyxJQUFELENBQWpCO0FBQUEsS0FKaEI7QUFLRSxnQkFBWSxFQUFFO0FBQUEsYUFBTUEsV0FBVyxDQUFDLEtBQUQsQ0FBakI7QUFBQSxLQUxoQjtBQU1FLGFBQVMsRUFBRXVaLHFFQUFNLENBQUM2QyxZQU5wQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBUUUsTUFBQywyREFBRCxDQUFhLElBQWI7QUFDRSxXQUFPLEVBQUUsbUJBQU07QUFDYnRjLGVBQVMsQ0FBQyxNQUFELENBQVQ7QUFDQUksdUJBQWlCLENBQUMsTUFBRCxDQUFqQjtBQUNELEtBSkg7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQVJGLEVBZ0JFLE1BQUMsMkRBQUQsQ0FBYSxJQUFiO0FBQ0UsV0FBTyxFQUFFLG1CQUFNO0FBQ2JKLGVBQVMsQ0FBQyxNQUFELENBQVQ7QUFDQUksdUJBQWlCLENBQUMsTUFBRCxDQUFqQjtBQUNELEtBSkg7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQWhCRixFQXdCRSxNQUFDLDJEQUFELENBQWEsSUFBYjtBQUNFLFdBQU8sRUFBRSxtQkFBTTtBQUNiSixlQUFTLENBQUMsWUFBRCxDQUFUO0FBQ0FJLHVCQUFpQixDQUFDLE1BQUQsQ0FBakI7QUFDRCxLQUpIO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsa0JBeEJGLEVBZ0NFLE1BQUMsMkRBQUQsQ0FBYSxJQUFiO0FBQ0UsV0FBTyxFQUFFLG1CQUFNO0FBQ2JKLGVBQVMsQ0FBQyxnQkFBRCxDQUFUO0FBQ0FJLHVCQUFpQixDQUFDLE1BQUQsQ0FBakI7QUFDRCxLQUpIO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsc0JBaENGLEVBd0NFLE1BQUMsMkRBQUQsQ0FBYSxJQUFiO0FBQ0UsV0FBTyxFQUFFLG1CQUFNO0FBQ2JKLGVBQVMsQ0FBQyxlQUFELENBQVQ7QUFDQUksdUJBQWlCLENBQUMsTUFBRCxDQUFqQjtBQUNELEtBSkg7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkF4Q0YsRUFnREUsTUFBQywyREFBRCxDQUFhLElBQWI7QUFDRSxXQUFPLEVBQUUsbUJBQU07QUFDYkosZUFBUyxDQUFDLGFBQUQsQ0FBVDtBQUNBSSx1QkFBaUIsQ0FBQyxNQUFELENBQWpCO0FBQ0QsS0FKSDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQWhERixFQXdERSxNQUFDLDJEQUFELENBQWEsSUFBYjtBQUNFLFdBQU8sRUFBRSxtQkFBTTtBQUNiSixlQUFTLENBQUMsS0FBRCxDQUFUO0FBQ0FJLHVCQUFpQixDQUFDLE1BQUQsQ0FBakI7QUFDRCxLQUpIO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0F4REYsQ0FURixDQWxCRixFQTZGRTtBQUFLLGFBQVMsRUFBRXFaLHFFQUFNLENBQUM4QyxhQUF2QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0UsTUFBQyxhQUFEO0FBQ0UsUUFBSSxFQUFDLFdBRFA7QUFFRSxRQUFJLEVBQUMsY0FGUDtBQUdFLFNBQUssRUFBQywyQkFIUjtBQUlFLGFBQVMsRUFBRTlDLHFFQUFNLENBQUMrQyxZQUpwQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBREYsRUFPRSxNQUFDLHNEQUFEO0FBQ0UsV0FBTyxFQUFDLE1BRFY7QUFFRSxhQUFTLFlBQUsvQyxxRUFBTSxDQUFDK0MsWUFBWixjQUE0Qi9DLHFFQUFNLENBQUNnRCxlQUFuQyxDQUZYO0FBR0UsV0FBTyxFQUFFL1MsT0FIWDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBUEYsRUFjRSxNQUFDLGFBQUQ7QUFDRSxRQUFJLEVBQUMsU0FEUDtBQUVFLFFBQUksRUFBQyxNQUZQO0FBR0UsU0FBSyxFQUFDLDZCQUhSO0FBSUUsYUFBUyxFQUFFK1AscUVBQU0sQ0FBQytDLFlBSnBCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFkRixDQTdGRixDQTNERixDQURGLENBRkYsQ0FoQ0YsQ0FERixFQXVORSxNQUFDLHlEQUFEO0FBQ0UsUUFBSSxFQUFFamQsV0FEUjtBQUVFLFVBQU0sRUFBRTtBQUFBLGFBQU1DLGNBQWMsQ0FBQyxLQUFELENBQXBCO0FBQUEsS0FGVjtBQUdFLGFBQVMsRUFBQyxPQUhaO0FBSUUsYUFBUyxFQUFFaWEscUVBQU0sQ0FBQ2lELGFBSnBCO0FBS0UsVUFBTSxNQUxSO0FBTUUsWUFBUSxNQU5WO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FRRSxNQUFDLHlEQUFELENBQVcsTUFBWDtBQUFrQixlQUFXLE1BQTdCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDRSxNQUFDLHlEQUFELENBQVcsS0FBWDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBREYsQ0FSRixFQVdFLE1BQUMseURBQUQsQ0FBVyxJQUFYO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FBaUJuRCxhQUFhLENBQUMsUUFBRCxDQUE5QixDQVhGLENBdk5GLEVBcU9FLE1BQUMscURBQUQ7QUFDRSxRQUFJLEVBQUU5WCxPQURSO0FBRUUsVUFBTSxFQUFFO0FBQUEsYUFBTUMsVUFBVSxDQUFDLEtBQUQsQ0FBaEI7QUFBQSxLQUZWO0FBR0UsWUFBUSxNQUhWO0FBSUUsUUFBSSxFQUFDLElBSlA7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQU1FLE1BQUMscURBQUQsQ0FBTyxNQUFQO0FBQWMsZUFBVyxNQUF6QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0UsTUFBQyxxREFBRCxDQUFPLEtBQVA7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFERixDQU5GLEVBU0UsTUFBQyxxREFBRCxDQUFPLElBQVA7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNHcUIsVUFBVSxJQUNUO0FBQUssYUFBUyxFQUFFMFcscUVBQU0sQ0FBQzFXLFVBQXZCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDRSxNQUFDLHVEQUFEO0FBQVMsYUFBUyxFQUFDLFFBQW5CO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFERixFQUVFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsMkJBRkYsQ0FGSixFQU9HRSxRQUFRLElBQUk7QUFBSyxhQUFTLEVBQUV3VyxxRUFBTSxDQUFDeFcsUUFBdkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUFrQ0EsUUFBbEMsQ0FQZixFQVNHLENBQUNGLFVBQUQsSUFBZWhCLE9BQU8sS0FBSyxTQUEzQixJQUNDO0FBQUssYUFBUyxFQUFFMFgscUVBQU0sQ0FBQ2tELFFBQXZCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDRTtBQUFLLGFBQVMsRUFBRWxELHFFQUFNLENBQUNtRCxPQUF2QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQURGLEVBRUU7QUFBSyxhQUFTLEVBQUVuRCxxRUFBTSxDQUFDb0QsU0FBdkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNHdGhCLGdCQUFnQixDQUFDdUksR0FBakIsQ0FBcUIsVUFBQ3VELFFBQUQ7QUFBQSxXQUNwQjtBQUNFLFNBQUcsRUFBRUEsUUFEUDtBQUVFLFVBQUksRUFBQyxRQUZQO0FBR0UsZUFBUyxZQUFLb1MscUVBQU0sQ0FBQ3FELFdBQVosY0FBMkJyRCxxRUFBTSxpQkFBVXBTLFFBQVYsRUFBakMsQ0FIWDtBQUlFLGFBQU8sRUFBRTtBQUFBLGVBQU1zQyxxQkFBcUIsQ0FBQ3RDLFFBQUQsQ0FBM0I7QUFBQSxPQUpYO0FBS0UsY0FBUSxFQUNObEIsS0FBSyxDQUFDb0IsT0FBTixDQUFjNUYsZ0JBQWQsS0FDQUEsZ0JBQWdCLENBQUN6RSxNQUFqQixHQUEwQixDQUQxQixJQUVBLENBQUN5RSxnQkFBZ0IsQ0FBQ2lNLFFBQWpCLENBQTBCdkcsUUFBMUIsQ0FSTDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BV0dBLFFBWEgsQ0FEb0I7QUFBQSxHQUFyQixDQURILENBRkYsQ0FWSixFQWdDRyxDQUFDdEUsVUFBRCxJQUFlaEIsT0FBTyxLQUFLLE1BQTNCLElBQ0M7QUFBSyxhQUFTLEVBQUUwWCxxRUFBTSxDQUFDa0QsUUFBdkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFO0FBQUssYUFBUyxFQUFFbEQscUVBQU0sQ0FBQ21ELE9BQXZCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsZ0JBQ1UzYSxTQURWLDhCQURGLEVBSUksWUFBTTtBQUNOLFFBQU04YSxJQUFJLEdBQUczVixzQkFBc0IsQ0FBQ25GLFNBQUQsQ0FBbkM7QUFDQSxRQUFNeUYsSUFBSSxHQUFHekIsVUFBVSxDQUFDMEMsS0FBWCxDQUFpQixDQUFqQixFQUFvQm9VLElBQUksQ0FBQ3JWLElBQUwsSUFBYSxDQUFqQyxDQUFiO0FBQ0EsUUFBTUYsSUFBSSxHQUFHakIsVUFBVSxDQUFDb0MsS0FBWCxDQUFpQixDQUFqQixFQUFvQm9VLElBQUksQ0FBQ3ZWLElBQUwsSUFBYSxDQUFqQyxDQUFiOztBQUNBLFFBQUksQ0FBQ0UsSUFBSSxDQUFDeEssTUFBTixJQUFnQixDQUFDc0ssSUFBSSxDQUFDdEssTUFBMUIsRUFBa0M7QUFDaEMsYUFDRTtBQUFLLGlCQUFTLEVBQUV1YyxxRUFBTSxDQUFDdUQsUUFBdkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx5Q0FERjtBQUtEOztBQUNELFdBQ0U7QUFBSyxlQUFTLEVBQUV2RCxxRUFBTSxDQUFDd0QsV0FBdkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQUNFO0FBQ0UsZUFBUyxFQUFFeEQscUVBQU0sQ0FBQ3lELElBRHBCO0FBRUUsV0FBSyxFQUFFO0FBQUUsdUJBQWUxVixJQUFJLENBQUN0SztBQUF0QixPQUZUO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FJR3dLLElBQUksQ0FBQzVELEdBQUwsQ0FBUyxVQUFDdUUsR0FBRDtBQUFBLGFBQ1JiLElBQUksQ0FBQzFELEdBQUwsQ0FBUyxVQUFDMEUsR0FBRCxFQUFTO0FBQUE7O0FBQ2hCLFlBQU1PLE9BQU8sYUFBTVYsR0FBTixjQUFhRyxHQUFiLENBQWI7QUFDQSxZQUFNMlUsVUFBVSxHQUFHM1AsT0FBTywwQkFDeEI3SyxjQUFjLENBQUNvRyxPQUFELENBRFUsMERBQ3hCLHNCQUF5QjdMLE1BREQsQ0FBMUI7QUFHQSxlQUNFO0FBQ0UsYUFBRyxFQUFFNkwsT0FEUDtBQUVFLGNBQUksRUFBQyxRQUZQO0FBR0UsbUJBQVMsWUFBSzBRLHFFQUFNLENBQUMyRCxRQUFaLGNBQ1BELFVBQVUsR0FBRyxFQUFILEdBQVExRCxxRUFBTSxDQUFDNEQsZ0JBRGxCLENBSFg7QUFNRSxpQkFBTyxFQUFFO0FBQUEsbUJBQ1BGLFVBQVUsSUFBSXZULG1CQUFtQixDQUFDdkIsR0FBRCxFQUFNRyxHQUFOLENBRDFCO0FBQUEsV0FOWDtBQVNFLGtCQUFRLEVBQUUsQ0FBQzJVLFVBVGI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQVdFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FDRzlVLEdBREgsRUFFR0csR0FGSCxDQVhGLENBREY7QUFrQkQsT0F2QkQsQ0FEUTtBQUFBLEtBQVQsQ0FKSCxDQURGLENBREY7QUFtQ0QsR0E5Q0EsRUFKSCxDQWpDSixFQXVGRyxDQUFDekYsVUFBRCxJQUFlaEIsT0FBTyxLQUFLLFNBQTNCLElBQ0M7QUFBSyxhQUFTLEVBQUUwWCxxRUFBTSxDQUFDa0QsUUFBdkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFO0FBQUssYUFBUyxFQUFFbEQscUVBQU0sQ0FBQ21ELE9BQXZCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsZ0JBQ1UzYSxTQURWLGlCQUNnQ0UsTUFEaEMsRUFFR0UsTUFGSCxzQkFERixFQUtFO0FBQUssYUFBUyxFQUFFb1gscUVBQU0sQ0FBQzZELFVBQXZCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDRyxDQUFDM2EsY0FBYyxXQUFJUixNQUFKLGNBQWNFLE1BQWQsRUFBZCxJQUF5QyxFQUExQyxFQUE4Q3lCLEdBQTlDLENBQ0MsVUFBQytFLE1BQUQsRUFBWTtBQUNWLFFBQU1LLFNBQVMsYUFBTS9HLE1BQU4sY0FBZ0JFLE1BQWhCLGVBQTJCd0csTUFBM0IsQ0FBZjtBQUNBLFFBQU0wVSxJQUFJLEdBQUcxYSxhQUFhLENBQUNxRyxTQUFELENBQWIsSUFBNEIsRUFBekM7QUFDQSxXQUNFO0FBQ0UsU0FBRyxFQUFFTCxNQURQO0FBRUUsVUFBSSxFQUFDLFFBRlA7QUFHRSxlQUFTLEVBQUU0USxxRUFBTSxDQUFDK0QsWUFIcEI7QUFJRSxhQUFPLEVBQUUsbUJBQU07QUFDYixZQUFJRCxJQUFJLENBQUNyZ0IsTUFBTCxLQUFnQixDQUFwQixFQUF1QjtBQUNyQmtOLHVCQUFhLENBQUM7QUFDWkssa0JBQU0sRUFBRXhJLFNBREk7QUFFWjBJLHlCQUFhLEVBQUV4SSxNQUZIO0FBR1owSSx5QkFBYSxFQUFFeEksTUFISDtBQUlad0csa0JBQU0sRUFBTkEsTUFKWTtBQUtaQyxlQUFHLEVBQUU7QUFMTyxXQUFELENBQWI7QUFPQXBILG9CQUFVLENBQUMsS0FBRCxDQUFWO0FBQ0E7QUFDRDs7QUFDRHFJLDZCQUFxQixDQUFDbEIsTUFBRCxDQUFyQjtBQUNELE9BakJIO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsa0JBbUJVQSxNQW5CVixDQURGO0FBdUJELEdBM0JGLENBREgsRUE4QkcsQ0FBQyxDQUFDbEcsY0FBYyxXQUFJUixNQUFKLGNBQWNFLE1BQWQsRUFBZCxJQUF5QyxFQUExQyxFQUE4Q25GLE1BQS9DLElBQ0M7QUFBSyxhQUFTLEVBQUV1YyxxRUFBTSxDQUFDdUQsUUFBdkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxrQ0EvQkosQ0FMRixDQXhGSixFQW9JRyxDQUFDamEsVUFBRCxJQUFlaEIsT0FBTyxLQUFLLE1BQTNCLElBQ0M7QUFBSyxhQUFTLEVBQUUwWCxxRUFBTSxDQUFDa0QsUUFBdkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFO0FBQUssYUFBUyxFQUFFbEQscUVBQU0sQ0FBQ21ELE9BQXZCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsZ0JBQ1UzYSxTQURWLGlCQUNnQ0UsTUFEaEMsRUFFR0UsTUFGSCxnQkFFcUJFLFNBRnJCLENBREYsRUFLRTtBQUFLLGFBQVMsRUFBRWtYLHFFQUFNLENBQUM2RCxVQUF2QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0csQ0FBQ3phLGFBQWEsV0FBSVYsTUFBSixjQUFjRSxNQUFkLGVBQXlCRSxTQUF6QixFQUFiLElBQXNELEVBQXZELEVBQTJEdUIsR0FBM0QsQ0FDQyxVQUFDZ0YsR0FBRDtBQUFBLFdBQ0U7QUFDRSxTQUFHLEVBQUVBLEdBRFA7QUFFRSxVQUFJLEVBQUMsUUFGUDtBQUdFLGVBQVMsWUFBSzJRLHFFQUFNLENBQUMrRCxZQUFaLGNBQTRCL0QscUVBQU0sQ0FBQ2dFLFNBQW5DLENBSFg7QUFJRSxhQUFPLEVBQUU7QUFBQSxlQUFNeFQsa0JBQWtCLENBQUNuQixHQUFELENBQXhCO0FBQUEsT0FKWDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBTU9BLEdBTlAsQ0FERjtBQUFBLEdBREQsQ0FESCxFQWFHLENBQUMsQ0FBQ2pHLGFBQWEsV0FBSVYsTUFBSixjQUFjRSxNQUFkLGVBQXlCRSxTQUF6QixFQUFiLElBQXNELEVBQXZELEVBQ0NyRixNQURGLElBRUM7QUFBSyxhQUFTLEVBQUV1YyxxRUFBTSxDQUFDdUQsUUFBdkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx5Q0FmSixDQUxGLENBcklKLENBVEYsRUEwS0UsTUFBQyxxREFBRCxDQUFPLE1BQVA7QUFBYyxhQUFTLEVBQUV2RCxxRUFBTSxDQUFDaUUsU0FBaEM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFLE1BQUMsc0RBQUQ7QUFDRSxXQUFPLEVBQUMsbUJBRFY7QUFFRSxXQUFPLEVBQUV2VCxhQUZYO0FBR0UsWUFBUSxFQUFFcEksT0FBTyxLQUFLLFNBSHhCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFERixFQVFFLE1BQUMsc0RBQUQ7QUFDRSxXQUFPLEVBQUMsaUJBRFY7QUFFRSxXQUFPLEVBQUU7QUFBQSxhQUFNcUksYUFBYSxFQUFuQjtBQUFBLEtBRlg7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQVJGLEVBY0UsTUFBQyxzREFBRDtBQUFRLFdBQU8sRUFBQyxXQUFoQjtBQUE0QixXQUFPLEVBQUU7QUFBQSxhQUFNMUksVUFBVSxDQUFDLEtBQUQsQ0FBaEI7QUFBQSxLQUFyQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBZEYsQ0ExS0YsQ0FyT0YsQ0E5RUYsQ0FERjtBQXNmRDs7SUF4d0R1QmpELFU7VUFDRkMsaUUsRUEwQ0w0RSxxRDs7O01BM0NPN0UsVSIsImZpbGUiOiJzdGF0aWMvd2VicGFjay9wYWdlcy9OZXdTZWFyY2gvbWFpblNlYXJjaC5hZWNiZjFlNjY4OWQ2ODMzMTM3OS5ob3QtdXBkYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUsIHVzZVJlZiwgdXNlQ2FsbGJhY2ssIHVzZU1lbW8gfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7XG4gIElucHV0R3JvdXAsXG4gIERyb3Bkb3duLFxuICBGb3JtQ29udHJvbCxcbiAgQnV0dG9uLFxuICBOYXZEcm9wZG93bixcbiAgRm9ybSxcbiAgTW9kYWwsXG4gIFBhZ2luYXRpb24sXG4gIFNwaW5uZXIsXG4gIE9mZmNhbnZhcyxcbn0gZnJvbSBcInJlYWN0LWJvb3RzdHJhcFwiO1xuaW1wb3J0IExpbmsgZnJvbSBcIm5leHQvbGlua1wiO1xuaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSBcIm5leHQvcm91dGVyXCI7XG5pbXBvcnQge1xuICBmZXRjaFBhcnRzV2l0aE1hY2hpbmVEYXRhUGFnZSxcbiAgZmV0Y2hDbGllbnRzLFxuICBmZXRjaE1vZGVscyxcbn0gZnJvbSBcIi4uLy4uL3V0aWxzL2ZldGNoQXNzb2NpYXRpb25zXCI7XG5pbXBvcnQgeyB1c2VBdXRoIH0gZnJvbSBcIi4uLy4uL2NvbnRleHQvQXV0aFVzZXJDb250ZXh0XCI7XHJcbmltcG9ydCBMb2dnZWRJbiBmcm9tIFwiLi4vTG9nZ2VkSW5cIjtcclxuaW1wb3J0IENsaWVudFRhYmxlIGZyb20gXCIuLi8uLi91dGlscy9DbGllbnRUYWJsZVwiO1xyXG5pbXBvcnQgTW9kZWxUYWJsZSBmcm9tIFwiLi4vLi4vdXRpbHMvTW9kZWxUYWJsZVwiO1xyXG5pbXBvcnQgUGFydFRhYmxlIGZyb20gXCIuLi8uLi91dGlscy9QYXJ0VGFibGVcIjtcbmltcG9ydCBzdHlsZXMgZnJvbSBcIi4uLy4uL3N0eWxlcy9NYWluU2VhcmNoLm1vZHVsZS5jc3NcIjtcbmltcG9ydCBmaXJlYmFzZSBmcm9tIFwiLi4vLi4vY29udGV4dC9GaXJlYmFzZVwiO1xuaW1wb3J0IHsgYnVpbGROYW1lVG9rZW5zIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2l0ZW1Gb3JtU2hhcmVkXCI7XG5cclxuLy8gUHJlZGVmaW5lZCB3YXJlaG91c2UgY2xpZW50IElEcyBhbmQgZGlzcGxheSBuYW1lc1xyXG5jb25zdCBTT0NBTF9DTElFTlRfSUQgPSBcIkFJUzE3MTgyXCI7XHJcbmNvbnN0IE5PUkNBTF9DTElFTlRfSUQgPSBcIkFJUzI1MDk3XCI7XG5jb25zdCBVTkFTU0lHTkVEX0NMSUVOVF9JRCA9IFwiQUlTMDA0MDRcIjtcbmNvbnN0IERFRkFVTFRfUEFHRV9TSVpFID0gMjU7XG5jb25zdCBNQVBfUkVHSU9OX09SREVSID0gW1wiRVwiLCBcIkZcIiwgXCJHXCIsIFwiQVwiLCBcIkRcIiwgXCJDXCIsIFwiQlwiXTtcblxyXG5cclxuLy8gU2ltdWxhdGVzIGEgbmV0d29yayByZXF1ZXN0IGRlbGF5XHJcbmZ1bmN0aW9uIHNpbXVsYXRlTmV0d29ya1JlcXVlc3QoKSB7XHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIDIwMDApKTtcclxufVxyXG5cclxuLy8gQ3VzdG9tIExvYWRpbmdCdXR0b24gY29tcG9uZW50XHJcbmZ1bmN0aW9uIExvYWRpbmdCdXR0b24oeyB0eXBlLCBuYW1lLCByb3V0ZSwgY2xhc3NOYW1lIH0pIHtcbiAgY29uc3QgW2lzTG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoaXNMb2FkaW5nKSB7XG4gICAgICBsZXQgY2FuY2VsbGVkID0gZmFsc2U7XG4gICAgICBzaW11bGF0ZU5ldHdvcmtSZXF1ZXN0KCkudGhlbigoKSA9PiB7XG4gICAgICAgIGlmICghY2FuY2VsbGVkKSBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgY2FuY2VsbGVkID0gdHJ1ZTtcbiAgICAgIH07XG4gICAgfVxuICB9LCBbaXNMb2FkaW5nXSk7XG5cclxuICByZXR1cm4gKFxuICAgIDxMaW5rIGhyZWY9e2AvJHtyb3V0ZX1gfT5cbiAgICAgIDxhXG4gICAgICAgIGNsYXNzTmFtZT17YGJ0biBidG4tJHt0eXBlfSAke2NsYXNzTmFtZSB8fCBcIlwifWB9XG4gICAgICAgIGRpc2FibGVkPXtpc0xvYWRpbmd9XG4gICAgICAgIG9uQ2xpY2s9eygpID0+ICFpc0xvYWRpbmcgJiYgc2V0TG9hZGluZyh0cnVlKX1cbiAgICAgID5cbiAgICAgICAge2lzTG9hZGluZyA/IFwiTG9hZGluZ+KAplwiIDogbmFtZX1cclxuICAgICAgPC9hPlxyXG4gICAgPC9MaW5rPlxyXG4gICk7XHJcbn1cclxuXHJcbi8vIC0tLS0gREFURSBIRUxQRVJTICh0b3AtbGV2ZWwgc2NvcGUpIC0tLS1cclxuXHJcbi8vIENvbnZlcnQgYW55dGhpbmcgZGF0ZS1pc2ggaW50byBhIHRpbWVzdGFtcCAobXMgc2luY2UgZXBvY2gpLlxyXG5mdW5jdGlvbiB0b1RpbWUodmFsdWUpIHtcclxuICBpZiAoIXZhbHVlKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgLy8gRmlyZXN0b3JlIFRpbWVzdGFtcCB7IHNlY29uZHMsIG5hbm9zZWNvbmRzIH1cclxuICBpZiAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmIHZhbHVlICE9PSBudWxsICYmIHZhbHVlLnNlY29uZHMgIT0gbnVsbCkge1xyXG4gICAgdHJ5IHsgcmV0dXJuIHZhbHVlLnNlY29uZHMgKiAxMDAwOyB9IGNhdGNoIHsgLyogaWdub3JlICovIH1cclxuICB9XHJcblxyXG4gIC8vIE5hdGl2ZSBEYXRlXHJcbiAgaWYgKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkge1xyXG4gICAgY29uc3QgdCA9IHZhbHVlLmdldFRpbWUoKTtcclxuICAgIHJldHVybiBpc05hTih0KSA/IG51bGwgOiB0O1xyXG4gIH1cclxuXHJcbiAgLy8gU3RyaW5nc1xyXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpIHtcclxuICAgIC8vIElTTyAvIHl5eXktbW0tZGRcclxuICAgIGNvbnN0IGlzbyA9IERhdGUucGFyc2UodmFsdWUpO1xyXG4gICAgaWYgKCFpc05hTihpc28pKSByZXR1cm4gaXNvO1xyXG5cclxuICAgIC8vIG1tL2RkL3l5eXlcclxuICAgIGNvbnN0IHBhcnRzID0gdmFsdWUuc3BsaXQoXCIvXCIpO1xyXG4gICAgaWYgKHBhcnRzLmxlbmd0aCA9PT0gMykge1xyXG4gICAgICBjb25zdCBbbW0sIGRkLCB5eXl5XSA9IHBhcnRzO1xyXG4gICAgICBjb25zdCBhbHQgPSBEYXRlLnBhcnNlKGAke3l5eXl9LSR7bW19LSR7ZGR9YCk7XHJcbiAgICAgIGlmICghaXNOYU4oYWx0KSkgcmV0dXJuIGFsdDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIExhc3QgcmVzb3J0XHJcbiAgY29uc3QgdCA9IERhdGUucGFyc2UodmFsdWUpO1xyXG4gIHJldHVybiBpc05hTih0KSA/IG51bGwgOiB0O1xyXG59XHJcblxyXG4vLyBDYW5vbmljYWxpemUgdG8gJ3l5eXktbW0tZGQnIChtYXRjaGVzIDxpbnB1dCB0eXBlPVwiZGF0ZVwiPilcclxuZnVuY3Rpb24gdG9ZTUQodmFsdWUpIHtcbiAgY29uc3QgdCA9IHRvVGltZSh2YWx1ZSk7XG4gIGlmICh0ID09IG51bGwpIHJldHVybiBudWxsO1xuICBjb25zdCBkID0gbmV3IERhdGUodCk7XG4gIGNvbnN0IHl5eXkgPSBkLmdldEZ1bGxZZWFyKCk7XG4gIGNvbnN0IG1tID0gU3RyaW5nKGQuZ2V0TW9udGgoKSArIDEpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcbiAgY29uc3QgZGQgPSBTdHJpbmcoZC5nZXREYXRlKCkpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcbiAgcmV0dXJuIGAke3l5eXl9LSR7bW19LSR7ZGR9YDtcbn1cblxuZnVuY3Rpb24gbm9ybWFsaXplVGV4dCh2YWx1ZSkge1xuICBpZiAodmFsdWUgPT0gbnVsbCkgcmV0dXJuIFwiXCI7XG4gIHJldHVybiBTdHJpbmcodmFsdWUpLnRvTG93ZXJDYXNlKCkudHJpbSgpO1xufVxuXG5mdW5jdGlvbiBnZXRNYWNoaW5lRmllbGQoaXRlbSwga2V5KSB7XG4gIGlmICghaXRlbSkgcmV0dXJuIG51bGw7XG4gIGNvbnN0IGxvd2VyID0ga2V5LnRvTG93ZXJDYXNlKCk7XG4gIHJldHVybiAoXG4gICAgaXRlbT8ubWFjaGluZURhdGE/LltrZXldID8/XG4gICAgaXRlbT8ubWFjaGluZURhdGE/Lltsb3dlcl0gPz9cbiAgICBpdGVtPy5jdXJyZW50TWFjaGluZURhdGE/LltrZXldID8/XG4gICAgaXRlbT8uY3VycmVudE1hY2hpbmVEYXRhPy5bbG93ZXJdID8/XG4gICAgaXRlbT8udGhlTWFjaGluZURhdGE/LltrZXldID8/XG4gICAgaXRlbT8udGhlTWFjaGluZURhdGE/Lltsb3dlcl0gPz9cbiAgICBpdGVtPy5UaGVNYWNoaW5lPy5ba2V5XSA/P1xuICAgIGl0ZW0/LlRoZU1hY2hpbmU/Lltsb3dlcl0gPz9cbiAgICBudWxsXG4gICk7XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTWFpblNlYXJjaCgpIHtcbiAgY29uc3QgeyBzaWduT3V0IH0gPSB1c2VBdXRoKCk7XHJcbiAgY29uc3QgW2luZm8sIHNldEluZm9dID0gdXNlU3RhdGUoW10pO1xyXG4gIGNvbnN0IFtiYWNrdXBJbmZvLCBzZXRCYWNrdXBJbmZvXSA9IHVzZVN0YXRlKFtdKTtcclxuICBjb25zdCBbYXVnbWVudGVkSW5mbywgc2V0QXVnbWVudGVkSW5mb10gPSB1c2VTdGF0ZShbXSk7IC8vIGl0ZW1zIHdpdGggY2xpZW50RnJvbUlkL2N1cnJlbnRJZCBhZGRlZFxyXG4gIGNvbnN0IFtpc0xvYWRpbmcsIHNldElzTG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcclxuICBjb25zdCBbaWRzLCBzZXRJRF0gPSB1c2VTdGF0ZShbXSk7XG4gIGNvbnN0IFtzaG93LCBzZXRTaG93XSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3Nob3dGaWx0ZXJzLCBzZXRTaG93RmlsdGVyc10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtwYWdlU2l6ZSwgc2V0UGFnZVNpemVdID0gdXNlU3RhdGUoREVGQVVMVF9QQUdFX1NJWkUpO1xuICBjb25zdCBbaXNOYXZpZ2F0aW5nLCBzZXRJc05hdmlnYXRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbZEl0ZW0sIHNldERJdGVtXSA9IHVzZVN0YXRlKCk7XHJcbiAgY29uc3QgW3NlbGVjdCwgc2V0U2VsZWN0XSA9IHVzZVN0YXRlKFwiTmFtZVwiKTtcclxuICBjb25zdCBbc2hvd0xpc3QsIHNldFNob3dMaXN0XSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbc2hvd0xpc3RTZWFyY2gsIHNldFNob3dMaXN0U2VhcmNoXSA9IHVzZVN0YXRlKFwidGV4dFwiKTtcclxuICBjb25zdCBbc2VhcmNoLCBzZXRTZWFyY2hdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW3NlbGVjdGVkT0VNLCBzZXRTZWxlY3RlZE9FTV0gPSB1c2VTdGF0ZShudWxsKTtcclxuICBjb25zdCBbc2VsZWN0ZWRNb2RhbGl0eSwgc2V0U2VsZWN0ZWRNb2RhbGl0eV0gPSB1c2VTdGF0ZShudWxsKTtcclxuICAvLyBSZXBsYWNlIHRoZSBvbGQgc2luZ2xlIGNsaWVudCBzdGF0ZSB3aXRoIHR3byBzZXRzOlxyXG4gIGNvbnN0IFtzZWxlY3RlZENsaWVudEZyb20sIHNldFNlbGVjdGVkQ2xpZW50RnJvbV0gPSB1c2VTdGF0ZShudWxsKTtcclxuICBjb25zdCBbY2xpZW50RnJvbUJ1dHRvblRleHQsIHNldENsaWVudEZyb21CdXR0b25UZXh0XSA9IHVzZVN0YXRlKFwiU2VsZWN0IE9wdGlvblwiKTtcclxuICBjb25zdCBbc2VsZWN0ZWRDbGllbnRDdXJyZW50LCBzZXRTZWxlY3RlZENsaWVudEN1cnJlbnRdID0gdXNlU3RhdGUobnVsbCk7XHJcbiAgY29uc3QgW2NsaWVudEN1cnJlbnRCdXR0b25UZXh0LCBzZXRDbGllbnRDdXJyZW50QnV0dG9uVGV4dF0gPSB1c2VTdGF0ZShcIlNlbGVjdCBPcHRpb25cIik7XHJcblxyXG4gIGNvbnN0IFtjbGllbnRzLCBzZXRDbGllbnRzXSA9IHVzZVN0YXRlKFtdKTtcbiAgY29uc3QgW3Nob3dDbGllbnRNb2RhbCwgc2V0U2hvd0NsaWVudE1vZGFsXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgLy8gVGhpcyBzdGF0ZSB0ZWxscyB0aGUgbW9kYWwgd2hpY2ggY2xpZW50IGJveCBpcyBiZWluZyB1cGRhdGVkOiBcImZyb21cIiBvciBcImN1cnJlbnRcIlxuICBjb25zdCBbY2xpZW50U2VsZWN0aW9uVHlwZSwgc2V0Q2xpZW50U2VsZWN0aW9uVHlwZV0gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW3Nob3dNYXAsIHNldFNob3dNYXBdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbbWFwUmVnaW9uT3B0aW9ucywgc2V0TWFwUmVnaW9uT3B0aW9uc10gPSB1c2VTdGF0ZShbXSk7XG4gIGNvbnN0IFttYXBTZWN0aW9uTWFwLCBzZXRNYXBTZWN0aW9uTWFwXSA9IHVzZVN0YXRlKHt9KTtcbiAgY29uc3QgW21hcFN0ZXAsIHNldE1hcFN0ZXBdID0gdXNlU3RhdGUoXCJyZWdpb25zXCIpO1xuICBjb25zdCBbbWFwUmVnaW9uLCBzZXRNYXBSZWdpb25dID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFttYXBSb3csIHNldE1hcFJvd10gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW21hcENvbCwgc2V0TWFwQ29sXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbbWFwUGFsbGV0LCBzZXRNYXBQYWxsZXRdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFttYXBCaW4sIHNldE1hcEJpbl0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW21hcENlbGxQYWxsZXRzLCBzZXRNYXBDZWxsUGFsbGV0c10gPSB1c2VTdGF0ZSh7fSk7XG4gIGNvbnN0IFttYXBQYWxsZXRCaW5zLCBzZXRNYXBQYWxsZXRCaW5zXSA9IHVzZVN0YXRlKHt9KTtcbiAgY29uc3QgW21hcExvYWRpbmcsIHNldE1hcExvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbbWFwRXJyb3IsIHNldE1hcEVycm9yXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbbWFwRGlyZWN0b3J5TG9hZGVkLCBzZXRNYXBEaXJlY3RvcnlMb2FkZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xuXHJcbiAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XHJcbiAgY29uc3QgbGFiZWxCYXNlID0gW1wibmFtZVwiLCBcImRhdGVcIiwgXCJ3L29cIiwgXCJwL25cIiwgXCJzL25cIl07XHJcbiAgY29uc3QgbGFiZWxCYXNlTmFtZXMgPSBbXCJuYW1lXCIsIFwiZGF0ZVwiLCBcIndvXCIsIFwicG5cIiwgXCJzblwiXTtcclxuICBjb25zdCBzb3J0Q2hlY2tCYXNlID0gW2ZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2VdO1xyXG5cclxuICBmdW5jdGlvbiB3aXRoU29ydEljb24oYmFzZUxhYmVscywgYWN0aXZlSW5kZXgsIGlzRGVzYykge1xyXG4gICAgcmV0dXJuIGJhc2VMYWJlbHMubWFwKCh0ZXh0LCBpKSA9PiB7XHJcbiAgICAgIGlmIChpICE9PSBhY3RpdmVJbmRleCkgcmV0dXJuIHRleHQ7IC8vIHVudG91Y2hlZFxyXG4gICAgICBjb25zdCBhcnJvdyA9IGlzRGVzYyA/IFwiIOKWvFwiIDogXCIg4payXCI7XHJcbiAgICAgIHJldHVybiBgJHt0ZXh0fSR7YXJyb3d9YDtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcblxyXG4gIGNvbnN0IFtsYWJlbHMsIHNldExhYmVsc10gPSB1c2VTdGF0ZShsYWJlbEJhc2UpO1xyXG4gIGNvbnN0IFtzb3J0Q2hlY2ssIHNldFNvcnRDaGVja10gPSB1c2VTdGF0ZShzb3J0Q2hlY2tCYXNlKTtcclxuICBjb25zdCBbaG92ZXJJbmRleCwgc2V0SG92ZXJJbmRleF0gPSB1c2VTdGF0ZShudWxsKTtcclxuICBjb25zdCBbc2VsZWN0ZWRNb2RlbCwgc2V0U2VsZWN0ZWRNb2RlbF0gPSB1c2VTdGF0ZShudWxsKTtcclxuICBjb25zdCBbZ1Bvcywgc2V0R1Bvc10gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW2dJZGUsIHNldEdJZGVdID0gdXNlU3RhdGUobnVsbCk7XG4gIGNvbnN0IFtpc0RlbGV0aW5nLCBzZXRJc0RlbGV0aW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3BhZ2UsIHNldFBhZ2VdID0gdXNlU3RhdGUoMSk7XG4gIGNvbnN0IFtwYWdlQ3Vyc29ycywgc2V0UGFnZUN1cnNvcnNdID0gdXNlU3RhdGUoW10pO1xuICBjb25zdCBbaGFzTmV4dFBhZ2UsIHNldEhhc05leHRQYWdlXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgZmV0Y2hTZXEgPSB1c2VSZWYoMCk7XG4gIGNvbnN0IGJhY2tmaWxsSW5GbGlnaHQgPSB1c2VSZWYoZmFsc2UpO1xuICBjb25zdCBbcXVlcnlFcG9jaCwgc2V0UXVlcnlFcG9jaF0gPSB1c2VTdGF0ZSgwKTtcbiAgY29uc3QgW2xvYWRFcnJvciwgc2V0TG9hZEVycm9yXSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCB0YWJsZUJvZHlSZWYgPSB1c2VSZWYobnVsbCk7XG4gIGNvbnN0IHJvd0hlaWdodFJlZiA9IHVzZVJlZig0Nik7XG4gIGNvbnN0IGhlYWRlckhlaWdodFJlZiA9IHVzZVJlZigzOCk7XG5cbiAgY29uc3QgTE9BRF9USU1FT1VUX01TID0gMzAwMDA7XG4gIGNvbnN0IG1hcExldHRlcnMgPSB1c2VNZW1vKFxuICAgICgpID0+IEFycmF5LmZyb20oeyBsZW5ndGg6IDI2IH0sIChfLCBpKSA9PiBTdHJpbmcuZnJvbUNoYXJDb2RlKDY1ICsgaSkpLFxuICAgIFtdXG4gICk7XG4gIGNvbnN0IG1hcE51bWJlcnMgPSB1c2VNZW1vKFxuICAgICgpID0+IEFycmF5LmZyb20oeyBsZW5ndGg6IDUwIH0sIChfLCBpKSA9PiBpICsgMSksXG4gICAgW11cbiAgKTtcblxuICBjb25zdCBsb2FkTWFwRGlyZWN0b3J5ID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xuICAgIGlmIChtYXBEaXJlY3RvcnlMb2FkZWQpIHJldHVybjtcbiAgICB0cnkge1xuICAgICAgY29uc3QgZG9jID0gYXdhaXQgZmlyZWJhc2VcbiAgICAgICAgLmZpcmVzdG9yZSgpXG4gICAgICAgIC5jb2xsZWN0aW9uKFwiV2FyZWhvdXNlXCIpXG4gICAgICAgIC5kb2MoXCJkaXJlY3RvcnlcIilcbiAgICAgICAgLmdldCgpO1xuICAgICAgY29uc3QgZGF0YSA9IGRvYy5kYXRhKCkgfHwge307XG4gICAgICBzZXRNYXBSZWdpb25PcHRpb25zKGRhdGEuUmVnaW9uIHx8IFtdKTtcbiAgICAgIHNldE1hcFNlY3Rpb25NYXAoZGF0YS5TZWN0aW9uIHx8IHt9KTtcbiAgICAgIHNldE1hcERpcmVjdG9yeUxvYWRlZCh0cnVlKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byBsb2FkIG1hcCBkaXJlY3RvcnlcIiwgZXJyb3IpO1xuICAgICAgc2V0TWFwRXJyb3IoXCJGYWlsZWQgdG8gbG9hZCB3YXJlaG91c2UgZGlyZWN0b3J5LlwiKTtcbiAgICB9XG4gIH0sIFttYXBEaXJlY3RvcnlMb2FkZWRdKTtcblxuICBjb25zdCBnZXRNYXBSZWdpb25EaW1lbnNpb25zID0gdXNlQ2FsbGJhY2soXG4gICAgKHJlZ2lvbklkKSA9PiB7XG4gICAgICBjb25zdCBlbnRyeSA9IG1hcFNlY3Rpb25NYXA/LltyZWdpb25JZF07XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShlbnRyeSkgJiYgZW50cnkubGVuZ3RoID49IDIpIHtcbiAgICAgICAgY29uc3QgY29scyA9IHBhcnNlSW50KGVudHJ5WzBdLCAxMCk7XG4gICAgICAgIGNvbnN0IHJvd3MgPSBwYXJzZUludChlbnRyeVsxXSwgMTApO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGNvbHM6IE51bWJlci5pc0Zpbml0ZShjb2xzKSA/IGNvbHMgOiAwLFxuICAgICAgICAgIHJvd3M6IE51bWJlci5pc0Zpbml0ZShyb3dzKSA/IHJvd3MgOiAwLFxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHsgY29sczogMCwgcm93czogMCB9O1xuICAgIH0sXG4gICAgW21hcFNlY3Rpb25NYXBdXG4gICk7XG5cbiAgY29uc3QgbG9hZE1hcEludmVudG9yeSA9IHVzZUNhbGxiYWNrKGFzeW5jIChyZWdpb25JZCkgPT4ge1xuICAgIGlmICghcmVnaW9uSWQpIHJldHVybjtcbiAgICBzZXRNYXBMb2FkaW5nKHRydWUpO1xuICAgIHNldE1hcEVycm9yKFwiXCIpO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBzbmFwID0gYXdhaXQgZmlyZWJhc2VcbiAgICAgICAgLmZpcmVzdG9yZSgpXG4gICAgICAgIC5jb2xsZWN0aW9uKFwiVGVzdFwiKVxuICAgICAgICAud2hlcmUoXCJuZXdMb2NhbEN1cnJlbnQucmVnaW9uXCIsIFwiPT1cIiwgcmVnaW9uSWQpXG4gICAgICAgIC5nZXQoKTtcblxuICAgICAgY29uc3QgY2VsbFBhbGxldHMgPSB7fTtcbiAgICAgIGNvbnN0IHBhbGxldEJpbnMgPSB7fTtcbiAgICAgIHNuYXAuZm9yRWFjaCgoZG9jKSA9PiB7XG4gICAgICAgIGNvbnN0IGxvYyA9IGRvYy5kYXRhKCk/Lm5ld0xvY2FsQ3VycmVudCB8fCB7fTtcbiAgICAgICAgbGV0IHJvdyA9IGxvYy5zZWN0aW9uPy5sZXR0ZXI7XG4gICAgICAgIGxldCBjb2wgPSBsb2Muc2VjdGlvbj8ubnVtYmVyO1xuICAgICAgICBpZiAoKCFyb3cgfHwgIWNvbCkgJiYgdHlwZW9mIGxvYy5zZWN0aW9uID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgY29uc3QgdHJpbW1lZCA9IGxvYy5zZWN0aW9uLnRyaW0oKTtcbiAgICAgICAgICByb3cgPSB0cmltbWVkLnNsaWNlKDAsIDEpO1xuICAgICAgICAgIGNvbCA9IHRyaW1tZWQuc2xpY2UoMSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbCAhPT0gdW5kZWZpbmVkICYmIGNvbCAhPT0gbnVsbCkge1xuICAgICAgICAgIGNvbCA9IFN0cmluZyhjb2wpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBhbGxldCA9IGxvYy5wYWxsZXQ7XG4gICAgICAgIGNvbnN0IGJpbiA9IGxvYy5iaW47XG4gICAgICAgIGlmICghcm93IHx8ICFjb2wpIHJldHVybjtcbiAgICAgICAgY29uc3QgY2VsbEtleSA9IGAke3Jvd30tJHtjb2x9YDtcbiAgICAgICAgaWYgKHBhbGxldCAhPT0gdW5kZWZpbmVkICYmIHBhbGxldCAhPT0gbnVsbCAmJiBgJHtwYWxsZXR9YCAhPT0gXCJcIikge1xuICAgICAgICAgIGlmICghY2VsbFBhbGxldHNbY2VsbEtleV0pIGNlbGxQYWxsZXRzW2NlbGxLZXldID0gbmV3IFNldCgpO1xuICAgICAgICAgIGNlbGxQYWxsZXRzW2NlbGxLZXldLmFkZChTdHJpbmcocGFsbGV0KSk7XG4gICAgICAgICAgaWYgKGJpbiAhPT0gdW5kZWZpbmVkICYmIGJpbiAhPT0gbnVsbCAmJiBgJHtiaW59YCAhPT0gXCJcIikge1xuICAgICAgICAgICAgY29uc3QgcGFsbGV0S2V5ID0gYCR7Y2VsbEtleX0tUCR7cGFsbGV0fWA7XG4gICAgICAgICAgICBpZiAoIXBhbGxldEJpbnNbcGFsbGV0S2V5XSkgcGFsbGV0Qmluc1twYWxsZXRLZXldID0gbmV3IFNldCgpO1xuICAgICAgICAgICAgcGFsbGV0Qmluc1twYWxsZXRLZXldLmFkZChTdHJpbmcoYmluKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgY29uc3QgY2VsbE9iaiA9IHt9O1xuICAgICAgT2JqZWN0LmtleXMoY2VsbFBhbGxldHMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICBjZWxsT2JqW2tleV0gPSBBcnJheS5mcm9tKGNlbGxQYWxsZXRzW2tleV0pLnNvcnQoXG4gICAgICAgICAgKGEsIGIpID0+IE51bWJlcihhKSAtIE51bWJlcihiKVxuICAgICAgICApO1xuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IHBhbGxldE9iaiA9IHt9O1xuICAgICAgT2JqZWN0LmtleXMocGFsbGV0QmlucykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgIHBhbGxldE9ialtrZXldID0gQXJyYXkuZnJvbShwYWxsZXRCaW5zW2tleV0pLnNvcnQoXG4gICAgICAgICAgKGEsIGIpID0+IE51bWJlcihhKSAtIE51bWJlcihiKVxuICAgICAgICApO1xuICAgICAgfSk7XG5cbiAgICAgIHNldE1hcENlbGxQYWxsZXRzKGNlbGxPYmopO1xuICAgICAgc2V0TWFwUGFsbGV0QmlucyhwYWxsZXRPYmopO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGxvYWQgbWFwIGludmVudG9yeVwiLCBlcnJvcik7XG4gICAgICBzZXRNYXBFcnJvcihcIkZhaWxlZCB0byBsb2FkIG1hcCBpbnZlbnRvcnkuXCIpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRNYXBMb2FkaW5nKGZhbHNlKTtcbiAgICB9XG4gIH0sIFtdKTtcblxuICBjb25zdCBvcGVuTWFwID0gYXN5bmMgKCkgPT4ge1xuICAgIHNldE1hcEVycm9yKFwiXCIpO1xuICAgIGF3YWl0IGxvYWRNYXBEaXJlY3RvcnkoKTtcbiAgICBpZiAobWFwUmVnaW9uKSB7XG4gICAgICBzZXRNYXBTdGVwKFwiZ3JpZFwiKTtcbiAgICAgIGxvYWRNYXBJbnZlbnRvcnkobWFwUmVnaW9uKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2V0TWFwU3RlcChcInJlZ2lvbnNcIik7XG4gICAgfVxuICAgIHNldFNob3dNYXAodHJ1ZSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlTWFwU2VsZWN0UmVnaW9uID0gKHJlZ2lvbklkKSA9PiB7XG4gICAgc2V0TWFwUmVnaW9uKHJlZ2lvbklkKTtcbiAgICBzZXRNYXBSb3coXCJcIik7XG4gICAgc2V0TWFwQ29sKFwiXCIpO1xuICAgIHNldE1hcFBhbGxldChcIlwiKTtcbiAgICBzZXRNYXBCaW4oXCJcIik7XG4gICAgc2V0TWFwU3RlcChcImdyaWRcIik7XG4gICAgbG9hZE1hcEludmVudG9yeShyZWdpb25JZCk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlTWFwU2VsZWN0Q2VsbCA9IChyb3dMZXR0ZXIsIGNvbE51bWJlcikgPT4ge1xuICAgIHNldE1hcFJvdyhyb3dMZXR0ZXIpO1xuICAgIHNldE1hcENvbChjb2xOdW1iZXIpO1xuICAgIHNldE1hcFBhbGxldChcIlwiKTtcbiAgICBzZXRNYXBCaW4oXCJcIik7XG4gICAgc2V0TWFwU3RlcChcInBhbGxldHNcIik7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlTWFwU2VsZWN0UGFsbGV0ID0gKHBhbGxldElkKSA9PiB7XG4gICAgc2V0TWFwUGFsbGV0KHBhbGxldElkKTtcbiAgICBzZXRNYXBCaW4oXCJcIik7XG4gICAgc2V0TWFwU3RlcChcImJpbnNcIik7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlTWFwU2VsZWN0QmluID0gKGJpbklkKSA9PiB7XG4gICAgc2V0TWFwQmluKGJpbklkKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVNYXBCYWNrID0gKCkgPT4ge1xuICAgIGlmIChtYXBTdGVwID09PSBcImJpbnNcIikge1xuICAgICAgc2V0TWFwQmluKFwiXCIpO1xuICAgICAgc2V0TWFwU3RlcChcInBhbGxldHNcIik7XG4gICAgfVxuICAgIGVsc2UgaWYgKG1hcFN0ZXAgPT09IFwicGFsbGV0c1wiKSBzZXRNYXBTdGVwKFwiZ3JpZFwiKTtcbiAgICBlbHNlIGlmIChtYXBTdGVwID09PSBcImdyaWRcIikgc2V0TWFwU3RlcChcInJlZ2lvbnNcIik7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlTWFwVmlldyA9IChvdmVycmlkZXMgPSB7fSkgPT4ge1xuICAgIGNvbnN0IHBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoKTtcbiAgICBjb25zdCByZWdpb25WYWx1ZSA9IG92ZXJyaWRlcy5yZWdpb24gPz8gbWFwUmVnaW9uO1xuICAgIGNvbnN0IGxldHRlclZhbHVlID0gb3ZlcnJpZGVzLnNlY3Rpb25MZXR0ZXIgPz8gbWFwUm93O1xuICAgIGNvbnN0IG51bWJlclZhbHVlID0gb3ZlcnJpZGVzLnNlY3Rpb25OdW1iZXIgPz8gbWFwQ29sO1xuICAgIGNvbnN0IHBhbGxldFZhbHVlID0gb3ZlcnJpZGVzLnBhbGxldCA/PyBtYXBQYWxsZXQ7XG4gICAgY29uc3QgYmluVmFsdWUgPSBvdmVycmlkZXMuYmluID8/IG1hcEJpbiA/PyBcIlwiO1xuXG4gICAgaWYgKHJlZ2lvblZhbHVlKSBwYXJhbXMuc2V0KFwicmVnaW9uXCIsIHJlZ2lvblZhbHVlKTtcbiAgICBpZiAobGV0dGVyVmFsdWUpIHBhcmFtcy5zZXQoXCJzZWN0aW9uTGV0dGVyXCIsIGxldHRlclZhbHVlKTtcbiAgICBpZiAobnVtYmVyVmFsdWUpIHBhcmFtcy5zZXQoXCJzZWN0aW9uTnVtYmVyXCIsIG51bWJlclZhbHVlKTtcbiAgICBpZiAocGFsbGV0VmFsdWUpIHBhcmFtcy5zZXQoXCJwYWxsZXRcIiwgcGFsbGV0VmFsdWUpO1xuICAgIGlmIChiaW5WYWx1ZSkgcGFyYW1zLnNldChcImJpblwiLCBiaW5WYWx1ZSk7XG5cbiAgICBjb25zdCBxdWVyeSA9IHBhcmFtcy50b1N0cmluZygpO1xuICAgIHJvdXRlci5wdXNoKFxuICAgICAgYC9OZXdTZWFyY2gvaW52ZW50b3J5L2ludmVudG9yeU1hbmFnZSR7cXVlcnkgPyBgPyR7cXVlcnl9YCA6IFwiXCJ9YFxuICAgICk7XG4gIH07XG5cbiAgY29uc3Qgc3RhcnROYW1lVG9rZW5CYWNrZmlsbCA9IHVzZUNhbGxiYWNrKGFzeW5jIChyZWFzb24gPSBcIlwiKSA9PiB7XG4gICAgaWYgKGJhY2tmaWxsSW5GbGlnaHQuY3VycmVudCkgcmV0dXJuO1xuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICBjb25zdCBsYXN0UnVuID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwibmFtZVRva2Vuc0JhY2tmaWxsQXRcIik7XG4gICAgICBpZiAobGFzdFJ1biAmJiBEYXRlLm5vdygpIC0gTnVtYmVyKGxhc3RSdW4pIDwgMjQgKiA2MCAqIDYwICogMTAwMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgYmFja2ZpbGxJbkZsaWdodC5jdXJyZW50ID0gdHJ1ZTtcbiAgICBjb25zdCBkYiA9IGZpcmViYXNlLmZpcmVzdG9yZSgpO1xuICAgIGxldCBsYXN0RG9jID0gbnVsbDtcblxuICAgIGNvbnN0IHRva2Vuc0VxdWFsID0gKGEsIGIpID0+IHtcbiAgICAgIGlmIChhLmxlbmd0aCAhPT0gYi5sZW5ndGgpIHJldHVybiBmYWxzZTtcbiAgICAgIGNvbnN0IHNldEEgPSBuZXcgU2V0KGEpO1xuICAgICAgY29uc3Qgc2V0QiA9IG5ldyBTZXQoYik7XG4gICAgICBpZiAoc2V0QS5zaXplICE9PSBzZXRCLnNpemUpIHJldHVybiBmYWxzZTtcbiAgICAgIGZvciAoY29uc3QgdiBvZiBzZXRBKSBpZiAoIXNldEIuaGFzKHYpKSByZXR1cm4gZmFsc2U7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgdHJ5IHtcbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIGxldCBxdWVyeSA9IGRiXG4gICAgICAgICAgLmNvbGxlY3Rpb24oXCJUZXN0XCIpXG4gICAgICAgICAgLm9yZGVyQnkoZmlyZWJhc2UuZmlyZXN0b3JlLkZpZWxkUGF0aC5kb2N1bWVudElkKCkpXG4gICAgICAgICAgLmxpbWl0KDIwMCk7XG4gICAgICAgIGlmIChsYXN0RG9jKSBxdWVyeSA9IHF1ZXJ5LnN0YXJ0QWZ0ZXIobGFzdERvYyk7XG5cbiAgICAgICAgY29uc3Qgc25hcCA9IGF3YWl0IHF1ZXJ5LmdldCgpO1xuICAgICAgICBpZiAoc25hcC5lbXB0eSkgYnJlYWs7XG5cbiAgICAgICAgY29uc3QgYmF0Y2ggPSBkYi5iYXRjaCgpO1xuICAgICAgICBsZXQgd3JpdGVzID0gMDtcblxuICAgICAgICBzbmFwLmRvY3MuZm9yRWFjaCgoZG9jKSA9PiB7XG4gICAgICAgICAgY29uc3QgZGF0YSA9IGRvYy5kYXRhKCkgfHwge307XG4gICAgICAgICAgY29uc3QgbmFtZSA9IHR5cGVvZiBkYXRhLm5hbWUgPT09IFwic3RyaW5nXCIgPyBkYXRhLm5hbWUgOiBcIlwiO1xuICAgICAgICAgIGNvbnN0IG5hbWVMb3dlciA9IG5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICBjb25zdCBuYW1lVG9rZW5zID0gYnVpbGROYW1lVG9rZW5zKG5hbWUpO1xuICAgICAgICAgIGNvbnN0IGV4aXN0aW5nVG9rZW5zID0gQXJyYXkuaXNBcnJheShkYXRhLm5hbWVUb2tlbnMpXG4gICAgICAgICAgICA/IEFycmF5LmZyb20obmV3IFNldChkYXRhLm5hbWVUb2tlbnMubWFwKCh2KSA9PiBTdHJpbmcodikpKSlcbiAgICAgICAgICAgIDogW107XG5cbiAgICAgICAgICBjb25zdCBuZWVkc1VwZGF0ZSA9XG4gICAgICAgICAgICBkYXRhLm5hbWVMb3dlciAhPT0gbmFtZUxvd2VyIHx8XG4gICAgICAgICAgICAhdG9rZW5zRXF1YWwoZXhpc3RpbmdUb2tlbnMsIG5hbWVUb2tlbnMpO1xuXG4gICAgICAgICAgaWYgKG5lZWRzVXBkYXRlKSB7XG4gICAgICAgICAgICBiYXRjaC51cGRhdGUoZG9jLnJlZiwgeyBuYW1lTG93ZXIsIG5hbWVUb2tlbnMgfSk7XG4gICAgICAgICAgICB3cml0ZXMgKz0gMTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh3cml0ZXMgPiAwKSB7XG4gICAgICAgICAgYXdhaXQgYmF0Y2guY29tbWl0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBsYXN0RG9jID0gc25hcC5kb2NzW3NuYXAuZG9jcy5sZW5ndGggLSAxXTtcbiAgICAgICAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgMjUpKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKFxuICAgICAgICAgIFwibmFtZVRva2Vuc0JhY2tmaWxsQXRcIixcbiAgICAgICAgICBTdHJpbmcoRGF0ZS5ub3coKSlcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihcIk5hbWUgdG9rZW4gYmFja2ZpbGwgZmFpbGVkOlwiLCByZWFzb24sIGVycm9yKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgYmFja2ZpbGxJbkZsaWdodC5jdXJyZW50ID0gZmFsc2U7XG4gICAgfVxuICB9LCBbXSk7XG5cbiAgY29uc3Qgc2VhcmNoTG93ZXIgPSAoc2VhcmNoIHx8IFwiXCIpLnRvTG93ZXJDYXNlKCkudHJpbSgpO1xuICBjb25zdCBoYXNBY3RpdmVGaWx0ZXJzID1cbiAgICBCb29sZWFuKHNlbGVjdGVkT0VNKSB8fFxuICAgIEJvb2xlYW4oc2VsZWN0ZWRNb2RhbGl0eSkgfHxcbiAgICBCb29sZWFuKHNlbGVjdGVkTW9kZWwpIHx8XG4gICAgQm9vbGVhbihzZWxlY3RlZENsaWVudEZyb20pIHx8XG4gICAgQm9vbGVhbihzZWxlY3RlZENsaWVudEN1cnJlbnQpIHx8XG4gICAgQm9vbGVhbihzZWFyY2hMb3dlcik7XG5cbiAgY29uc3QgdmFsdWVNYXRjaGVzID0gKHZhbHVlLCBzKSA9PiB7XG4gICAgaWYgKCF2YWx1ZSkgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHZhbHVlLnNvbWUoKHYpID0+IHZhbHVlTWF0Y2hlcyh2LCBzKSk7XG4gICAgfVxuICAgIHJldHVybiBTdHJpbmcodmFsdWUpLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMocyk7XG4gIH07XG5cbiAgY29uc3QgbWF0Y2hlc0ZpbHRlcnMgPSB1c2VDYWxsYmFjayhcbiAgICAoaXRlbSkgPT4ge1xuICAgICAgLy8gaGlkZSBleHBsaWNpdGx5IGhpZGRlbiBpdGVtc1xuICAgICAgaWYgKGl0ZW0/LnZpc2libGUgPT09IGZhbHNlKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgIC8vIE9FTSAvIE1vZGFsaXR5IC8gTW9kZWwgZmlsdGVyaW5nXG4gICAgICBjb25zdCBPRU0gPSBnZXRNYWNoaW5lRmllbGQoaXRlbSwgXCJPRU1cIik7XG4gICAgICBjb25zdCBNb2RhbGl0eSA9IGdldE1hY2hpbmVGaWVsZChpdGVtLCBcIk1vZGFsaXR5XCIpO1xuICAgICAgY29uc3QgTW9kZWwgPSBnZXRNYWNoaW5lRmllbGQoaXRlbSwgXCJNb2RlbFwiKTtcblxuICAgICAgaWYgKHNlbGVjdGVkT0VNICYmIG5vcm1hbGl6ZVRleHQoT0VNKSAhPT0gbm9ybWFsaXplVGV4dChzZWxlY3RlZE9FTSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKFxuICAgICAgICBzZWxlY3RlZE1vZGFsaXR5ICYmXG4gICAgICAgIG5vcm1hbGl6ZVRleHQoTW9kYWxpdHkpICE9PSBub3JtYWxpemVUZXh0KHNlbGVjdGVkTW9kYWxpdHkpXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKHNlbGVjdGVkTW9kZWwgJiYgbm9ybWFsaXplVGV4dChNb2RlbCkgIT09IG5vcm1hbGl6ZVRleHQoc2VsZWN0ZWRNb2RlbCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICAvLyBDbGllbnQgZmlsdGVyc1xuICAgICAgaWYgKHNlbGVjdGVkQ2xpZW50RnJvbSAmJiBpdGVtPy5jbGllbnRGcm9tSWQgIT09IHNlbGVjdGVkQ2xpZW50RnJvbSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoXG4gICAgICAgIHNlbGVjdGVkQ2xpZW50Q3VycmVudCAmJlxuICAgICAgICBpdGVtPy5jbGllbnRDdXJyZW50SWQgIT09IHNlbGVjdGVkQ2xpZW50Q3VycmVudFxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgLy8gU2VhcmNoXG4gICAgICBpZiAoc2VhcmNoTG93ZXIpIHtcbiAgICAgICAgaWYgKHNlbGVjdCA9PT0gXCJOYW1lXCIpIHtcbiAgICAgICAgICByZXR1cm4gdmFsdWVNYXRjaGVzKGl0ZW0/Lm5hbWUsIHNlYXJjaExvd2VyKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2VsZWN0ID09PSBcIkRhdGVcIikge1xuICAgICAgICAgIGNvbnN0IHdhbnRlZERheSA9IHNlYXJjaExvd2VyOyAvLyB5eXl5LW1tLWRkIGZyb20gaW5wdXRcbiAgICAgICAgICBjb25zdCBpdGVtWU1EID0gdG9ZTUQoaXRlbT8uZGF0ZSk7XG4gICAgICAgICAgaWYgKGl0ZW1ZTUQgJiYgaXRlbVlNRCA9PT0gd2FudGVkRGF5KSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShpdGVtPy5kZXNjcmlwdGlvbnMpKSB7XG4gICAgICAgICAgICBpZiAoaXRlbS5kZXNjcmlwdGlvbnMuc29tZSgoZCkgPT4gdG9ZTUQoZD8uZGF0ZSkgPT09IHdhbnRlZERheSkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGl0ZW0/LndvcmtPcmRlcnMpKSB7XG4gICAgICAgICAgICBpZiAoaXRlbS53b3JrT3JkZXJzLnNvbWUoKHcpID0+IHRvWU1EKHc/LmRhdGUpID09PSB3YW50ZWREYXkpKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNlbGVjdCA9PT0gXCJXb3JrIE9yZGVyXCIpIHtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgQXJyYXkuaXNBcnJheShpdGVtPy53b3JrT3JkZXJzKSAmJlxuICAgICAgICAgICAgaXRlbS53b3JrT3JkZXJzLnNvbWUoKHdvKSA9PlxuICAgICAgICAgICAgICB2YWx1ZU1hdGNoZXMod28/LndvcmtPcmRlciwgc2VhcmNoTG93ZXIpXG4gICAgICAgICAgICApXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2VsZWN0ID09PSBcIlByb2R1Y3QgTnVtYmVyXCIpIHtcbiAgICAgICAgICByZXR1cm4gdmFsdWVNYXRjaGVzKGl0ZW0/LnBuLCBzZWFyY2hMb3dlcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNlbGVjdCA9PT0gXCJTZXJpYWwgTnVtYmVyXCIpIHtcbiAgICAgICAgICByZXR1cm4gdmFsdWVNYXRjaGVzKGl0ZW0/LnNuLCBzZWFyY2hMb3dlcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNlbGVjdCA9PT0gXCJEZXNjcmlwdGlvblwiKSB7XG4gICAgICAgICAgaWYgKHZhbHVlTWF0Y2hlcyhpdGVtPy5kZXNjLCBzZWFyY2hMb3dlcikpIHJldHVybiB0cnVlO1xuICAgICAgICAgIGlmICh2YWx1ZU1hdGNoZXMoaXRlbT8uZGVzY3JpcHRpb24sIHNlYXJjaExvd2VyKSkgcmV0dXJuIHRydWU7XG4gICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoaXRlbT8uZGVzY3JpcHRpb25zKSkge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW0uZGVzY3JpcHRpb25zLnNvbWUoKGQpID0+XG4gICAgICAgICAgICAgIHZhbHVlTWF0Y2hlcyhkPy5kZXNjcmlwdGlvbiwgc2VhcmNoTG93ZXIpXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNlbGVjdCA9PT0gXCJTS1VcIikge1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICB2YWx1ZU1hdGNoZXMoaXRlbT8uaWQsIHNlYXJjaExvd2VyKSB8fFxuICAgICAgICAgICAgdmFsdWVNYXRjaGVzKGl0ZW0/LmxvY2FsU04sIHNlYXJjaExvd2VyKSB8fFxuICAgICAgICAgICAgdmFsdWVNYXRjaGVzKGl0ZW0/LmxvY2FsX3NuLCBzZWFyY2hMb3dlcilcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG4gICAgW1xuICAgICAgc2VsZWN0ZWRPRU0sXG4gICAgICBzZWxlY3RlZE1vZGFsaXR5LFxuICAgICAgc2VsZWN0ZWRNb2RlbCxcbiAgICAgIHNlbGVjdGVkQ2xpZW50RnJvbSxcbiAgICAgIHNlbGVjdGVkQ2xpZW50Q3VycmVudCxcbiAgICAgIHNlYXJjaExvd2VyLFxuICAgICAgc2VsZWN0LFxuICAgIF1cbiAgKTtcblxuICBjb25zdCByZXNldFBhZ2luYXRpb24gPSAoKSA9PiB7XG4gICAgc2V0UGFnZSgxKTtcbiAgICBzZXRQYWdlQ3Vyc29ycyhbXSk7XG4gICAgc2V0SGFzTmV4dFBhZ2UoZmFsc2UpO1xuICB9O1xuXG4gIC8vIFJlc2V0IHBhZ2luYXRpb24gb24gcm91dGUvcXVlcnkgY2hhbmdlIChwcmV2ZW50cyBzdGFsZSBwYWdlcyBsaWtlIOKAnHN0YXJ0aW5nIGF0IDbigJ0pXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgcmVzZXRQYWdpbmF0aW9uKCk7XG4gICAgc2V0UXVlcnlFcG9jaCgodikgPT4gdiArIDEpO1xuICB9LCBbcm91dGVyLmFzUGF0aF0pO1xuXG4gIC8vIFJlc2V0IGFuZCByZWZldGNoIHdoZW4gZmlsdGVycy9zZWFyY2ggY2hhbmdlXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgcmVzZXRQYWdpbmF0aW9uKCk7XG4gICAgc2V0UXVlcnlFcG9jaCgodikgPT4gdiArIDEpO1xuICB9LCBbXG4gICAgc2VsZWN0ZWRPRU0sXG4gICAgc2VsZWN0ZWRNb2RhbGl0eSxcbiAgICBzZWxlY3RlZE1vZGVsLFxuICAgIHNlbGVjdGVkQ2xpZW50RnJvbSxcbiAgICBzZWxlY3RlZENsaWVudEN1cnJlbnQsXG4gICAgc2VhcmNoLFxuICAgIHNlbGVjdCxcbiAgXSk7XG5cblxuICAvLyBGZXRjaCBkYXRhIG9uIGNvbXBvbmVudCBtb3VudCBhbmQgcm91dGUgY2hhbmdlXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgZmV0Y2hEYXRhKHBhZ2UpO1xuICB9LCBbcGFnZSwgcXVlcnlFcG9jaF0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFyb3V0ZXI/LmV2ZW50cykgcmV0dXJuO1xuICAgIGNvbnN0IGhhbmRsZURvbmUgPSAoKSA9PiBzZXRJc05hdmlnYXRpbmcoZmFsc2UpO1xuICAgIHJvdXRlci5ldmVudHMub24oXCJyb3V0ZUNoYW5nZUNvbXBsZXRlXCIsIGhhbmRsZURvbmUpO1xuICAgIHJvdXRlci5ldmVudHMub24oXCJyb3V0ZUNoYW5nZUVycm9yXCIsIGhhbmRsZURvbmUpO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICByb3V0ZXIuZXZlbnRzLm9mZihcInJvdXRlQ2hhbmdlQ29tcGxldGVcIiwgaGFuZGxlRG9uZSk7XG4gICAgICByb3V0ZXIuZXZlbnRzLm9mZihcInJvdXRlQ2hhbmdlRXJyb3JcIiwgaGFuZGxlRG9uZSk7XG4gICAgfTtcbiAgfSwgW3JvdXRlcl0pO1xuXG4gIGFzeW5jIGZ1bmN0aW9uIGZldGNoRGF0YShyZXF1ZXN0ZWRQYWdlID0gMSkge1xuICAgIGNvbnN0IHNlcSA9ICsrZmV0Y2hTZXEuY3VycmVudDtcbiAgICBsZXQgdGltZWRPdXQgPSBmYWxzZTtcbiAgICBzZXRJc0xvYWRpbmcodHJ1ZSk7XG4gICAgc2V0TG9hZEVycm9yKG51bGwpO1xuICAgIGNvbnN0IHRpbWVvdXRJZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGltZWRPdXQgPSB0cnVlO1xuICAgICAgaWYgKHNlcSA9PT0gZmV0Y2hTZXEuY3VycmVudCkge1xuICAgICAgICBzZXRMb2FkRXJyb3Ioe1xuICAgICAgICAgIGNvZGU6IFwidGltZW91dFwiLFxuICAgICAgICAgIG1lc3NhZ2U6IGBMb2FkaW5nIGlzIHRha2luZyBsb25nZXIgdGhhbiAke01hdGgucm91bmQoXG4gICAgICAgICAgICBMT0FEX1RJTUVPVVRfTVMgLyAxMDAwXG4gICAgICAgICAgKX1zLiBUaGlzIGlzIGxpa2VseSBkdWUgdG8gdmVyeSBzZWxlY3RpdmUgZmlsdGVycy5gLFxuICAgICAgICB9KTtcbiAgICAgICAgc2V0SXNMb2FkaW5nKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9LCBMT0FEX1RJTUVPVVRfTVMpO1xuICAgIHRyeSB7XG4gICAgICBpZiAocm91dGVyLnF1ZXJ5LmlucHV0VGV4dCAmJiByb3V0ZXIucXVlcnkuc2VsZWN0ZWRUeXBlKSB7XG4gICAgICAgIHNldFNlbGVjdChyb3V0ZXIucXVlcnkuc2VsZWN0ZWRUeXBlKTtcbiAgICAgICAgc2V0U2VhcmNoKHJvdXRlci5xdWVyeS5pbnB1dFRleHQpO1xuICAgICAgfVxuICAgICAgY29uc3Qgc3RhcnRBZnRlckRvYyA9XG4gICAgICAgIHJlcXVlc3RlZFBhZ2UgPiAxID8gcGFnZUN1cnNvcnNbcmVxdWVzdGVkUGFnZSAtIDJdIDogbnVsbDtcbiAgICAgIGlmIChyZXF1ZXN0ZWRQYWdlID4gMSAmJiAhc3RhcnRBZnRlckRvYykge1xuICAgICAgICBzZXRQYWdlKDEpO1xuICAgICAgICBpZiAoc2VxID09PSBmZXRjaFNlcS5jdXJyZW50KSB7XG4gICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXRJZCk7XG4gICAgICAgICAgc2V0SXNMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBlZmZlY3RpdmVTZWxlY3QgPSByb3V0ZXIucXVlcnkuc2VsZWN0ZWRUeXBlIHx8IHNlbGVjdDtcbiAgICAgIGNvbnN0IGVmZmVjdGl2ZVNlYXJjaCA9IHJvdXRlci5xdWVyeS5pbnB1dFRleHQgfHwgc2VhcmNoO1xuICAgICAgY29uc3QgZWZmZWN0aXZlU2VhcmNoTG93ZXIgPSAoZWZmZWN0aXZlU2VhcmNoIHx8IFwiXCIpXG4gICAgICAgIC50b0xvd2VyQ2FzZSgpXG4gICAgICAgIC50cmltKCk7XG5cbiAgICAgIC8vIGxpZ2h0IHJldHJ5IGZvciB0cmFuc2llbnQgRmlyZXN0b3JlIGhpY2N1cHNcbiAgICAgIGNvbnN0IGxvYWQgPSBhc3luYyAoYXR0ZW1wdCA9IDEpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXR1cm4gYXdhaXQgZmV0Y2hQYXJ0c1dpdGhNYWNoaW5lRGF0YVBhZ2Uoe1xuICAgICAgICAgICAgcGFnZVNpemUsXG4gICAgICAgICAgICBzdGFydEFmdGVyRG9jLFxuICAgICAgICAgICAgdmlzaWJsZU9ubHk6IHRydWUsXG4gICAgICAgICAgICBmaWx0ZXJGbjogaGFzQWN0aXZlRmlsdGVycyA/IG1hdGNoZXNGaWx0ZXJzIDogbnVsbCxcbiAgICAgICAgICAgIHNlYXJjaDogZWZmZWN0aXZlU2VhcmNoTG93ZXJcbiAgICAgICAgICAgICAgPyB7XG4gICAgICAgICAgICAgICAgICB0eXBlOiBlZmZlY3RpdmVTZWxlY3QsXG4gICAgICAgICAgICAgICAgICByYXc6IGVmZmVjdGl2ZVNlYXJjaCxcbiAgICAgICAgICAgICAgICAgIGxvd2VyOiBlZmZlY3RpdmVTZWFyY2hMb3dlcixcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIDogbnVsbCxcbiAgICAgICAgICAgIG5lZWRzTWFjaGluZURhdGE6XG4gICAgICAgICAgICAgIEJvb2xlYW4oc2VsZWN0ZWRPRU0pIHx8XG4gICAgICAgICAgICAgIEJvb2xlYW4oc2VsZWN0ZWRNb2RhbGl0eSkgfHxcbiAgICAgICAgICAgICAgQm9vbGVhbihzZWxlY3RlZE1vZGVsKSB8fFxuICAgICAgICAgICAgICBCb29sZWFuKHNlbGVjdGVkQ2xpZW50RnJvbSkgfHxcbiAgICAgICAgICAgICAgQm9vbGVhbihzZWxlY3RlZENsaWVudEN1cnJlbnQpLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgaWYgKGF0dGVtcHQgPj0gMykgdGhyb3cgZTtcbiAgICAgICAgICBhd2FpdCBuZXcgUHJvbWlzZShyID0+IHNldFRpbWVvdXQociwgMjUwICogTWF0aC5wb3coMiwgYXR0ZW1wdCAtIDEpKSk7XG4gICAgICAgICAgcmV0dXJuIGxvYWQoYXR0ZW1wdCArIDEpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgY29uc3QgeyBwYXJ0czogZGF0YSwgbGFzdERvYywgaGFzTmV4dFBhZ2U6IG5leHRQYWdlIH0gPSBhd2FpdCBsb2FkKCk7XG4gICAgICBpZiAodGltZWRPdXQgfHwgc2VxICE9PSBmZXRjaFNlcS5jdXJyZW50KSByZXR1cm47XG4gICAgICBjb25zdCBoYXNOYW1lU2VhcmNoID1cbiAgICAgICAgQm9vbGVhbihlZmZlY3RpdmVTZWFyY2hMb3dlcikgJiYgZWZmZWN0aXZlU2VsZWN0ID09PSBcIk5hbWVcIjtcbiAgICAgIGlmIChcbiAgICAgICAgaGFzTmFtZVNlYXJjaCAmJlxuICAgICAgICAoZGF0YS5sZW5ndGggPT09IDAgfHxcbiAgICAgICAgICBkYXRhLnNvbWUoXG4gICAgICAgICAgICAoaXRlbSkgPT5cbiAgICAgICAgICAgICAgIUFycmF5LmlzQXJyYXkoaXRlbT8ubmFtZVRva2VucykgfHwgaXRlbS5uYW1lVG9rZW5zLmxlbmd0aCA9PT0gMFxuICAgICAgICAgICkpXG4gICAgICApIHtcbiAgICAgICAgc3RhcnROYW1lVG9rZW5CYWNrZmlsbChcIm5hbWUtc2VhcmNoXCIpO1xuICAgICAgfVxuICAgICAgaWYgKHJlcXVlc3RlZFBhZ2UgPT09IDEgJiYgZGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgc2V0UGFnZUN1cnNvcnMoW10pO1xuICAgICAgICBzZXRIYXNOZXh0UGFnZShmYWxzZSk7XG4gICAgICB9XG4gICAgICBzZXRCYWNrdXBJbmZvKGRhdGEpO1xuICAgICAgc2V0TGFiZWxzKGxhYmVsQmFzZSk7IC8vIDwtLSBhZGQgdGhpcyBsaW5lIGFmdGVyIHNldEJhY2t1cEluZm8oZGF0YSlcbiAgICAgIHNldElEKGRhdGEubWFwKChpdGVtKSA9PiBpdGVtLmlkKSk7XG4gICAgICBpZiAocmVxdWVzdGVkUGFnZSA+IDEgJiYgZGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgc2V0SGFzTmV4dFBhZ2UoZmFsc2UpO1xuICAgICAgICBzZXRQYWdlKDEpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBzZXRIYXNOZXh0UGFnZShuZXh0UGFnZSk7XG4gICAgICBzZXRQYWdlQ3Vyc29ycygocHJldikgPT4ge1xuICAgICAgICBjb25zdCBuZXh0ID0gcmVxdWVzdGVkUGFnZSA9PT0gMSA/IFtdIDogWy4uLnByZXZdO1xuICAgICAgICBpZiAobGFzdERvYykge1xuICAgICAgICAgIG5leHRbcmVxdWVzdGVkUGFnZSAtIDFdID0gbGFzdERvYztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgIH0pO1xuICAgICAgc2V0U2VsZWN0ZWRJdGVtcyhbXSk7XG5cbiAgICAgIC8vIE5vcm1hbGl6ZSBjbGllbnQgaWRzIGZvciBmaWx0ZXJpbmdcbiAgICAgIGNvbnN0IGF1Z21lbnRlZCA9IGRhdGEubWFwKChpdGVtKSA9PiAoe1xuICAgICAgICAuLi5pdGVtLFxuICAgICAgICBjbGllbnRGcm9tSWQ6XG4gICAgICAgICAgaXRlbT8uY2xpZW50RnJvbUlkID8/XG4gICAgICAgICAgKHR5cGVvZiBpdGVtPy5DbGllbnRGcm9tID09PSBcInN0cmluZ1wiID8gaXRlbS5DbGllbnRGcm9tIDogbnVsbCkgPz9cbiAgICAgICAgICBpdGVtPy5DbGllbnRGcm9tPy5pZCA/P1xuICAgICAgICAgIG51bGwsXG4gICAgICAgIGNsaWVudEN1cnJlbnRJZDpcbiAgICAgICAgICBpdGVtPy5jbGllbnRDdXJyZW50SWQgPz9cbiAgICAgICAgICAodHlwZW9mIGl0ZW0/LkNsaWVudEN1cnJlbnQgPT09IFwic3RyaW5nXCIgPyBpdGVtLkNsaWVudEN1cnJlbnQgOiBudWxsKSA/P1xuICAgICAgICAgIGl0ZW0/LkNsaWVudEN1cnJlbnQ/LmlkID8/XG4gICAgICAgICAgbnVsbCxcbiAgICAgIH0pKTtcblxyXG4gICAgICBzZXRBdWdtZW50ZWRJbmZvKGF1Z21lbnRlZCk7XG4gICAgICAvLyBkZWZhdWx0IHZpZXcgPSBmaWx0ZXJlZCAoa2VlcHMgcGFnaW5hdGlvbiBhbmQgZmlsdGVycyBjb25zaXN0ZW50KVxuICAgICAgc2V0SW5mbyhhdWdtZW50ZWQuZmlsdGVyKG1hdGNoZXNGaWx0ZXJzKSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBpZiAoc2VxICE9PSBmZXRjaFNlcS5jdXJyZW50KSByZXR1cm47XG4gICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZmV0Y2hpbmcgZGF0YTpcIiwgZXJyKTtcbiAgICAgIGNvbnN0IGNvZGUgPSBlcnI/LmNvZGUgfHwgXCJ1bmtub3duXCI7XG4gICAgICBzZXRMb2FkRXJyb3Ioe1xuICAgICAgICBjb2RlLFxuICAgICAgICBtZXNzYWdlOiBlcnI/Lm1lc3NhZ2UgfHwgXCJGYWlsZWQgdG8gbG9hZCBpdGVtcy5cIixcbiAgICAgIH0pO1xuICAgICAgc2V0SW5mbyhbXSk7XG4gICAgICBzZXRBdWdtZW50ZWRJbmZvKFtdKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXRJZCk7XG4gICAgICBpZiAoc2VxID09PSBmZXRjaFNlcS5jdXJyZW50ICYmICF0aW1lZE91dCkgc2V0SXNMb2FkaW5nKGZhbHNlKTtcbiAgICB9XG4gIH1cblxyXG4gIGNvbnN0IHNlYXJjaENoYW5nZUhhbmRsZXIgPSAoZXZlbnQpID0+IHNldFNlYXJjaChldmVudC50YXJnZXQudmFsdWUpO1xyXG5cclxuICAvLyBGaWx0ZXIgdGhlIGN1cnJlbnRseSBsb2FkZWQgaXRlbXMgKG5vdyBjb25zaXN0ZW50IHdpdGggcGFnZWQgZmlsdGVyaW5nKVxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGJhc2UgPSBhdWdtZW50ZWRJbmZvIHx8IFtdO1xuICAgIHNldEluZm8oYmFzZS5maWx0ZXIobWF0Y2hlc0ZpbHRlcnMpKTtcbiAgfSwgW2F1Z21lbnRlZEluZm8sIG1hdGNoZXNGaWx0ZXJzXSk7XG5cclxuICBmdW5jdGlvbiBzb3J0Q2hlY2tBbGwocG9zKSB7XHJcbiAgICAvLyBEZXRlcm1pbmUgbmV4dCBkaXJlY3Rpb246IHRvZ2dsZSB0aGUgY2xpY2tlZCBjb2x1bW4gb25seVxyXG4gICAgY29uc3QgbmV4dFNvcnRDaGVjayA9IHNvcnRDaGVjay5tYXAoKHYsIGkpID0+IChpID09PSBwb3MgPyAhdiA6IHYpKTtcclxuICAgIGNvbnN0IGlzRGVzYyA9IG5leHRTb3J0Q2hlY2tbcG9zXTsgLy8gdHJ1ZSBtZWFucyBkZXNjZW5kaW5nXHJcblxyXG4gICAgY29uc3Qgc29ydGVkSW5mbyA9IFsuLi5pbmZvXS5zb3J0KChhLCBiKSA9PiB7XHJcbiAgICAgIGNvbnN0IGtleSA9IGxhYmVsQmFzZU5hbWVzW3Bvc107XHJcblxyXG4gICAgICBpZiAocG9zID09PSAxKSB7XHJcbiAgICAgICAgLy8gREFURSBjb2x1bW5cclxuICAgICAgICBjb25zdCB0YSA9IHRvVGltZShhW2tleV0pO1xyXG4gICAgICAgIGNvbnN0IHRiID0gdG9UaW1lKGJba2V5XSk7XHJcblxyXG4gICAgICAgIC8vIFB1dCBtaXNzaW5nIGRhdGVzIGF0IHRoZSBlbmQgZm9yIGFzY2VuZGluZywgYXQgdGhlIHN0YXJ0IGZvciBkZXNjZW5kaW5nXHJcbiAgICAgICAgaWYgKHRhID09PSBudWxsICYmIHRiID09PSBudWxsKSByZXR1cm4gMDtcclxuICAgICAgICBpZiAodGEgPT09IG51bGwpIHJldHVybiBpc0Rlc2MgPyAtMSA6IDE7XHJcbiAgICAgICAgaWYgKHRiID09PSBudWxsKSByZXR1cm4gaXNEZXNjID8gMSA6IC0xO1xyXG5cclxuICAgICAgICByZXR1cm4gaXNEZXNjID8gKHRiIC0gdGEpIDogKHRhIC0gdGIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBOQU1FIG9yIFNLVSAoc3RyaW5nLXkgY29sdW1ucyk6IGluZGV4ZXMgMCBvciA1IGluIHlvdXIgb3JpZ2luYWwgbG9naWNcclxuICAgICAgaWYgKHBvcyA9PT0gMCB8fCBwb3MgPT09IDUpIHtcclxuICAgICAgICBjb25zdCBhdiA9IChhW2tleV0gPz8gXCJcIikudG9TdHJpbmcoKTtcclxuICAgICAgICBjb25zdCBidiA9IChiW2tleV0gPz8gXCJcIikudG9TdHJpbmcoKTtcclxuICAgICAgICByZXR1cm4gaXNEZXNjID8gYnYubG9jYWxlQ29tcGFyZShhdikgOiBhdi5sb2NhbGVDb21wYXJlKGJ2KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gTnVtZXJpYy1pc2ggY29sdW1ucyAod28sIHBuLCBzbikg4oCUIGZhbGwgYmFjayB0byBzdHJpbmcgY29tcGFyZSBpZiBOYU5cclxuICAgICAgY29uc3QgYW4gPSBOdW1iZXIoYVtrZXldKTtcclxuICAgICAgY29uc3QgYm4gPSBOdW1iZXIoYltrZXldKTtcclxuXHJcbiAgICAgIGlmICghaXNOYU4oYW4pICYmICFpc05hTihibikpIHtcclxuICAgICAgICByZXR1cm4gaXNEZXNjID8gKGJuIC0gYW4pIDogKGFuIC0gYm4pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IGF2ID0gKGFba2V5XSA/PyBcIlwiKS50b1N0cmluZygpO1xyXG4gICAgICAgIGNvbnN0IGJ2ID0gKGJba2V5XSA/PyBcIlwiKS50b1N0cmluZygpO1xyXG4gICAgICAgIHJldHVybiBpc0Rlc2MgPyBidi5sb2NhbGVDb21wYXJlKGF2KSA6IGF2LmxvY2FsZUNvbXBhcmUoYnYpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBzZXRJbmZvKHNvcnRlZEluZm8pO1xyXG4gICAgc2V0U29ydENoZWNrKG5leHRTb3J0Q2hlY2spO1xyXG5cclxuICAgIC8vIFVwZGF0ZSBoZWFkZXIgbGFiZWxzIHRvIHNob3cgdGhlIGxpdHRsZSBhcnJvdyBvbiB0aGUgYWN0aXZlIGNvbHVtblxyXG4gICAgc2V0TGFiZWxzKHdpdGhTb3J0SWNvbihsYWJlbEJhc2UsIHBvcywgaXNEZXNjKSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgY29uc3Qgcm93U2VsZWN0ID0gKGl0ZW0pID0+IHtcclxuICAgIGlmIChpdGVtICYmIGl0ZW0uaWQpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJTZWxlY3RlZCBpdGVtOlwiLCBpdGVtKTtcbiAgICAgIHNldElzTmF2aWdhdGluZyh0cnVlKTtcbiAgICAgIHJvdXRlci5wdXNoKFwiLi9pdGVtL1wiICsgaXRlbS5pZCk7XG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5lcnJvcihcIlVuYWJsZSB0byBkZXRlcm1pbmUgdGhlIHNlbGVjdGVkIGl0ZW3igJlzIElEOiBcIiwgaXRlbSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgW3NlbGVjdGVkSXRlbXMsIHNldFNlbGVjdGVkSXRlbXNdID0gdXNlU3RhdGUoW10pO1xyXG4gIGNvbnN0IFtzaG93RGVsZXRlTW9kYWwsIHNldFNob3dEZWxldGVNb2RhbF0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZVNlbGVjdEl0ZW0gPSAoaWQpID0+IHtcclxuICAgIHNldFNlbGVjdGVkSXRlbXMocHJldiA9PlxyXG4gICAgICBwcmV2LmluY2x1ZGVzKGlkKSA/IHByZXYuZmlsdGVyKHggPT4geCAhPT0gaWQpIDogWy4uLnByZXYsIGlkXVxyXG4gICAgKTtcclxuICB9O1xyXG5cclxuXHJcbiAgLy8gc2V0U2VsZWN0ZWRJdGVtcygocHJldikgPT4ge1xyXG4gIC8vICAgY29uc3QgbmV3U2VsZWN0aW9uID0gcHJldi5pbmNsdWRlcyhpZClcclxuICAvLyAgICAgPyBwcmV2LmZpbHRlcigoaXRlbUlkKSA9PiBpdGVtSWQgIT09IGlkKVxyXG4gIC8vICAgICA6IFsuLi5wcmV2LCBpZF07XHJcbiAgLy8gICBjb25zb2xlLmxvZyhcIlNlbGVjdGVkIGl0ZW1zOlwiLCBuZXdTZWxlY3Rpb24pO1xyXG4gIC8vICAgcmV0dXJuIG5ld1NlbGVjdGlvbjsgLy8gPC0gaW1wb3J0YW50XHJcbiAgLy8gfSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZVNob3dEZWxldGVNb2RhbCA9ICgpID0+IHNldFNob3dEZWxldGVNb2RhbCh0cnVlKTtcclxuICBjb25zdCBoYW5kbGVDbG9zZURlbGV0ZU1vZGFsID0gKCkgPT4gc2V0U2hvd0RlbGV0ZU1vZGFsKGZhbHNlKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlRGVsZXRlU2VsZWN0ZWQgPSBhc3luYyAoKSA9PiB7XHJcbiAgICBzZXRJc0RlbGV0aW5nKHRydWUpO1xyXG4gICAgY29uc3QgZGIgPSBmaXJlYmFzZS5maXJlc3RvcmUoKTtcclxuICAgIHRyeSB7XHJcbiAgICAgIC8vIExvb3Agb3ZlciBlYWNoIHNlbGVjdGVkIGl0ZW0gb25lIGF0IGEgdGltZVxyXG4gICAgICBmb3IgKGNvbnN0IGl0ZW1JZCBvZiBzZWxlY3RlZEl0ZW1zKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coaXRlbUlkKVxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAvLyBEZWxldGUgZnJvbSBcIlRlc3RcIiBjb2xsZWN0aW9uXHJcbiAgICAgICAgICBhd2FpdCBkYi5jb2xsZWN0aW9uKFwiVGVzdFwiKS5kb2MoaXRlbUlkKS5kZWxldGUoKTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEVycm9yIGRlbGV0aW5nIGRvY3VtZW50ICR7aXRlbUlkfSBmcm9tIFRlc3Q6YCwgZXJyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIC8vIERlbGV0ZSBmcm9tIFwiUGFydHNcIiBjb2xsZWN0aW9uXHJcbiAgICAgICAgICBhd2FpdCBkYi5jb2xsZWN0aW9uKFwiUGFydHNcIikuZG9jKGl0ZW1JZCkuZGVsZXRlKCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGBFcnJvciBkZWxldGluZyBkb2N1bWVudCAke2l0ZW1JZH0gZnJvbSBQYXJ0czpgLCBlcnIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgLy8gRGVsZXRlIGFzc29jaWF0ZWQgcGhvdG9zIGZyb20gc3RvcmFnZVxyXG4gICAgICAgICAgYXdhaXQgZGVsZXRlRnJvbVN0b3JhZ2UoaXRlbUlkKTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEVycm9yIGRlbGV0aW5nIHN0b3JhZ2UgZm9yICR7aXRlbUlkfTpgLCBlcnIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICAvLyBVcGRhdGUgbG9jYWwgc3RhdGUgYnkgZmlsdGVyaW5nIG91dCB0aGUgZGVsZXRlZCBpdGVtc1xyXG4gICAgICBzZXRJbmZvKGluZm8uZmlsdGVyKChpdGVtKSA9PiAhc2VsZWN0ZWRJdGVtcy5pbmNsdWRlcyhpdGVtLmlkKSkpO1xyXG4gICAgICBzZXRTZWxlY3RlZEl0ZW1zKFtdKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBkZWxldGluZyBpdGVtczpcIiwgZXJyb3IpO1xyXG4gICAgfSBmaW5hbGx5IHtcclxuICAgICAgc2V0SXNEZWxldGluZyhmYWxzZSk7XHJcbiAgICAgIGhhbmRsZUNsb3NlRGVsZXRlTW9kYWwoKTtcclxuICAgICAgLy8gT3B0aW9uYWxseSwgcmVsb2FkIHRoZSBwYWdlXHJcbiAgICAgIC8vIHJvdXRlci5yZWxvYWQoKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuXHJcbiAgY29uc3QgaGFuZGxlQ2xvc2UgPSAoKSA9PiBzZXRTaG93KGZhbHNlKTtcclxuICBjb25zdCBoYW5kbGVTaG93ID0gKCkgPT4gc2V0U2hvdyh0cnVlKTtcclxuXHJcbiAgY29uc3QgY2hlY2tEZWxldGUgPSAoZXZlbnQsIHBvcywgaWRzVG9EZWxldGUsIG5hbWUpID0+IHtcclxuICAgIGlmIChldmVudCkge1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH1cclxuICAgIGNvbnNvbGUubG9nKFwiU2VsZWN0ZWQgSURzIHRvIGRlbGV0ZTpcIiwgaWRzVG9EZWxldGUpO1xyXG4gICAgc2V0U2VsZWN0ZWRJdGVtcyhpZHNUb0RlbGV0ZSk7XHJcbiAgICBzZXRESXRlbShuYW1lKTtcclxuICAgIHNldFNob3dEZWxldGVNb2RhbCh0cnVlKTtcclxuICB9O1xyXG5cclxuICAvLyBjb25zdCBoYW5kbGVEZWxldGUgPSBhc3luYyAoKSA9PiB7XHJcbiAgLy8gICBsZXQgaXRlbUlkID0gZ0lkZTtcclxuICAvLyAgIHRyeSB7XHJcbiAgLy8gICAgIHNldElzRGVsZXRpbmcodHJ1ZSk7XHJcbiAgLy8gICAgIGNvbnN0IGRiID0gZmlyZWJhc2UuZmlyZXN0b3JlKCk7XHJcbiAgLy8gICAgIGF3YWl0IGRiLmNvbGxlY3Rpb24oXCJUZXN0XCIpLmRvYyhpdGVtSWQpLmRlbGV0ZSgpO1xyXG4gIC8vICAgICBhd2FpdCBkZWxldGVGcm9tUGFydHNDb2xsZWN0aW9uKGl0ZW1JZCk7XHJcbiAgLy8gICAgIGF3YWl0IGRlbGV0ZUZyb21TdG9yYWdlKGl0ZW1JZCk7XHJcbiAgLy8gICAgIHNldEluZm8oaW5mby5maWx0ZXIoKF8sIGkpID0+IGdQb3MgIT09IGkpKTtcclxuICAvLyAgICAgY29uc29sZS5sb2coYERlbGV0ZWQgaXRlbTogJHtpdGVtSWR9YCk7XHJcbiAgLy8gICB9IGNhdGNoIChlcnJvcikge1xyXG4gIC8vICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZGVsZXRpbmcgaXRlbTpcIiwgZXJyb3IpO1xyXG4gIC8vICAgfSBmaW5hbGx5IHtcclxuICAvLyAgICAgc2V0SXNEZWxldGluZyhmYWxzZSk7XHJcbiAgLy8gICB9XHJcbiAgLy8gICBoYW5kbGVDbG9zZSgpO1xyXG4gIC8vIH07XHJcblxyXG4gIGNvbnN0IGhvdmVyU3R5bGUgPSAoaW5kZXgpID0+ICh7XHJcbiAgICBiYWNrZ3JvdW5kQ29sb3I6IGhvdmVySW5kZXggPT09IGluZGV4ID8gXCIjZGRkXCIgOiBcInRyYW5zcGFyZW50XCIsXHJcbiAgICB0ZXh0QWxpZ246IFwiY2VudGVyXCIsXHJcbiAgICBjdXJzb3I6IFwiZGVmYXVsdFwiLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBbZHJvcGRvd24xVGV4dCwgc2V0RHJvcGRvd24xVGV4dF0gPSB1c2VTdGF0ZShcIlNlbGVjdCBPcHRpb25cIik7XHJcbiAgY29uc3QgW2Ryb3Bkb3duMlRleHQsIHNldERyb3Bkb3duMlRleHRdID0gdXNlU3RhdGUoXCJTZWxlY3QgT3B0aW9uXCIpO1xyXG5cclxuICBjb25zdCBoYW5kbGVTZWxlY3QxID0gKGV2ZW50S2V5LCBldmVudCkgPT4ge1xyXG4gICAgaWYgKGV2ZW50S2V5ID09PSBcInVuYXNzaWduZWRcIikge1xyXG4gICAgICBzZXREcm9wZG93bjFUZXh0KFwiU2VsZWN0IE9wdGlvblwiKTtcclxuICAgICAgc2V0U2VsZWN0ZWRPRU0obnVsbCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzZXREcm9wZG93bjFUZXh0KGV2ZW50LnRhcmdldC50ZXh0Q29udGVudCk7XHJcbiAgICAgIHNldFNlbGVjdGVkT0VNKGV2ZW50LnRhcmdldC50ZXh0Q29udGVudCk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaGFuZGxlU2VsZWN0MiA9IChldmVudEtleSwgZXZlbnQpID0+IHtcclxuICAgIGlmIChldmVudEtleSA9PT0gXCJ1bmFzc2lnbmVkXCIpIHtcclxuICAgICAgc2V0RHJvcGRvd24yVGV4dChcIlNlbGVjdCBPcHRpb25cIik7XHJcbiAgICAgIHNldFNlbGVjdGVkTW9kYWxpdHkobnVsbCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzZXREcm9wZG93bjJUZXh0KGV2ZW50LnRhcmdldC50ZXh0Q29udGVudCk7XHJcbiAgICAgIHNldFNlbGVjdGVkTW9kYWxpdHkoZXZlbnQudGFyZ2V0LnRleHRDb250ZW50KTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICAvLyBCdWlsZCBhIHVuaXF1ZSBsaXN0IG9mIGNsaWVudHMgZnJvbSB0aGUgaXRlbXMgY3VycmVudGx5IGxvYWRlZCwgZmlsdGVyZWQgYnkgT0VNL01vZGFsaXR5LlxyXG4gIC8vIGB0eXBlYCBpcyBcImZyb21cIiBvciBcImN1cnJlbnRcIiB0byBkZWNpZGUgd2hpY2ggY2xpZW50IHJlZiB0byByZWFkLlxyXG4gIGFzeW5jIGZ1bmN0aW9uIGJ1aWxkQ2xpZW50c0Zyb21JdGVtcyh0eXBlKSB7XG4gICAgY29uc3QgZGIgPSBmaXJlYmFzZS5maXJlc3RvcmUoKTtcbiAgICBjb25zdCBpZHMgPSBuZXcgU2V0KCk7XG5cbiAgICAvLyBSZXNwZWN0IGN1cnJlbnQgT0VNIC8gTW9kYWxpdHkgZmlsdGVycyB3aGVuIGRlcml2aW5nIGNsaWVudCBvcHRpb25zXG4gICAgY29uc3QgZmlsdGVyZWQgPSBhdWdtZW50ZWRJbmZvLmZpbHRlcigoaXRlbSkgPT4ge1xuICAgICAgY29uc3QgT0VNID0gZ2V0TWFjaGluZUZpZWxkKGl0ZW0sIFwiT0VNXCIpO1xuICAgICAgY29uc3QgTW9kYWxpdHkgPSBnZXRNYWNoaW5lRmllbGQoaXRlbSwgXCJNb2RhbGl0eVwiKTtcbiAgICAgIGlmIChzZWxlY3RlZE9FTSAmJiBub3JtYWxpemVUZXh0KE9FTSkgIT09IG5vcm1hbGl6ZVRleHQoc2VsZWN0ZWRPRU0pKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmIChcbiAgICAgICAgc2VsZWN0ZWRNb2RhbGl0eSAmJlxuICAgICAgICBub3JtYWxpemVUZXh0KE1vZGFsaXR5KSAhPT0gbm9ybWFsaXplVGV4dChzZWxlY3RlZE1vZGFsaXR5KVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0pO1xuXHJcbiAgICBmb3IgKGNvbnN0IGl0IG9mIGZpbHRlcmVkKSB7XHJcbiAgICAgIGNvbnN0IGlkID0gdHlwZSA9PT0gXCJmcm9tXCIgPyBpdC5jbGllbnRGcm9tSWQgOiBpdC5jbGllbnRDdXJyZW50SWQ7XHJcbiAgICAgIGlmIChpZCkgaWRzLmFkZChpZCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgb3V0ID0gW107XHJcbiAgICBjb25zdCBpZEFycmF5ID0gWy4uLmlkc107XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGlkQXJyYXkubGVuZ3RoOyBpICs9IDEwKSB7XHJcbiAgICAgIGNvbnN0IGNodW5rID0gaWRBcnJheS5zbGljZShpLCBpICsgMTApO1xyXG4gICAgICBjb25zdCBzbmFwID0gYXdhaXQgZGJcclxuICAgICAgICAuY29sbGVjdGlvbihcIkNsaWVudFwiKVxyXG4gICAgICAgIC53aGVyZShmaXJlYmFzZS5maXJlc3RvcmUuRmllbGRQYXRoLmRvY3VtZW50SWQoKSwgXCJpblwiLCBjaHVuaylcclxuICAgICAgICAuZ2V0KCk7XHJcbiAgICAgIHNuYXAuZm9yRWFjaCgoZG9jKSA9PiB7XHJcbiAgICAgICAgY29uc3QgZCA9IGRvYy5kYXRhKCkgfHwge307XHJcbiAgICAgICAgb3V0LnB1c2goeyBpZDogZG9jLmlkLCBuYW1lOiBkLm5hbWUgfHwgZG9jLmlkIH0pO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBzb3J0IGJ5IG5hbWUgZm9yIG5pY2VyIFVYXHJcbiAgICBvdXQuc29ydCgoYSwgYikgPT4gKGEubmFtZSB8fCBcIlwiKS5sb2NhbGVDb21wYXJlKGIubmFtZSB8fCBcIlwiKSk7XHJcbiAgICByZXR1cm4gb3V0O1xyXG4gIH1cclxuXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQ0xJRU5UIFNFTEVDVElPTiBIQU5ETElOR1xyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gVGhpcyBmdW5jdGlvbiBmZXRjaGVzIGNsaWVudHMgYW5kIG9wZW5zIHRoZSBjbGllbnQgbW9kYWwuXHJcbiAgY29uc3QgaGFuZGxlQ2xpZW50Q2xpY2sgPSBhc3luYyAoKSA9PiB7XHJcbiAgICBsZXQgc2FmZUNsaWVudHMgPSBbXTtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IGNsaWVudHNEYXRhID0gYXdhaXQgZmV0Y2hDbGllbnRzKHNlbGVjdGVkT0VNLCBzZWxlY3RlZE1vZGFsaXR5KTtcclxuICAgICAgc2FmZUNsaWVudHMgPSBBcnJheS5pc0FycmF5KGNsaWVudHNEYXRhKSA/IGNsaWVudHNEYXRhIDogW107XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJmZXRjaENsaWVudHMgZmFpbGVkOlwiLCBlKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBGYWxsYmFjayB0byBidWlsZGluZyBmcm9tIGxvYWRlZCBpdGVtcyBpZiBBUEkgZ2F2ZSB1cyBub3RoaW5nXHJcbiAgICBpZiAoc2FmZUNsaWVudHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgaWYgKCFjbGllbnRTZWxlY3Rpb25UeXBlKSB7XHJcbiAgICAgICAgICAvLyBpZiBzb21laG93IG5vdCBzZXQgeWV0LCBkZWZhdWx0IHRvIFwiZnJvbVwiXHJcbiAgICAgICAgICBzZXRDbGllbnRTZWxlY3Rpb25UeXBlKFwiZnJvbVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgZGVyaXZlZCA9IGF3YWl0IGJ1aWxkQ2xpZW50c0Zyb21JdGVtcyhjbGllbnRTZWxlY3Rpb25UeXBlIHx8IFwiZnJvbVwiKTtcclxuICAgICAgICBzYWZlQ2xpZW50cyA9IGRlcml2ZWQ7XHJcbiAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFsbGJhY2sgYnVpbGRDbGllbnRzRnJvbUl0ZW1zIGZhaWxlZDpcIiwgZSk7XHJcbiAgICAgICAgc2FmZUNsaWVudHMgPSBbXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNldENsaWVudHMoc2FmZUNsaWVudHMpO1xyXG4gICAgc2V0Q2xpZW50U2VhcmNoVGVybShcIlwiKTtcclxuICAgIHNldFNob3dDbGllbnRNb2RhbCh0cnVlKTtcclxuICB9O1xyXG5cclxuXHJcblxyXG4gIC8vIFdoZW4gYSBjbGllbnQgaXMgc2VsZWN0ZWQgaW4gdGhlIG1vZGFsLCB3ZSBub3cgYXNzdW1lIHRoZSBwYXJhbWV0ZXIgaXMgYSBjbGllbnQgSUQuXHJcbiAgLy8gSWYgdGhlIHBhc3NlZCB2YWx1ZSBpcyBudWxsLCB3ZSBjbGVhciB0aGUgc2VsZWN0aW9uLlxyXG4gIGNvbnN0IGhhbmRsZUNsaWVudFNlbGVjdCA9IGFzeW5jIChjbGllbnRJZCkgPT4ge1xyXG4gICAgY29uc29sZS5sb2coXCJVc2VyIHNlbGVjdGVkIGNsaWVudCBpZDpcIiwgY2xpZW50SWQpO1xyXG4gICAgaWYgKCFjbGllbnRJZCkge1xyXG4gICAgICBpZiAoY2xpZW50U2VsZWN0aW9uVHlwZSA9PT0gXCJmcm9tXCIpIHtcclxuICAgICAgICBzZXRDbGllbnRGcm9tQnV0dG9uVGV4dChcIlNlbGVjdCBPcHRpb25cIik7XHJcbiAgICAgICAgc2V0U2VsZWN0ZWRDbGllbnRGcm9tKG51bGwpO1xyXG4gICAgICB9IGVsc2UgaWYgKGNsaWVudFNlbGVjdGlvblR5cGUgPT09IFwiY3VycmVudFwiKSB7XHJcbiAgICAgICAgc2V0Q2xpZW50Q3VycmVudEJ1dHRvblRleHQoXCJTZWxlY3QgT3B0aW9uXCIpO1xyXG4gICAgICAgIHNldFNlbGVjdGVkQ2xpZW50Q3VycmVudChudWxsKTtcclxuICAgICAgfVxyXG4gICAgICBzZXRTaG93Q2xpZW50TW9kYWwoZmFsc2UpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBjbGllbnRTbmFwID0gYXdhaXQgZmlyZWJhc2UuZmlyZXN0b3JlKCkuY29sbGVjdGlvbihcIkNsaWVudFwiKS5kb2MoY2xpZW50SWQpLmdldCgpO1xyXG4gICAgICBpZiAoY2xpZW50U25hcC5leGlzdHMpIHtcclxuICAgICAgICBjb25zdCBjbGllbnREYXRhID0gY2xpZW50U25hcC5kYXRhKCk7XHJcbiAgICAgICAgaWYgKGNsaWVudFNlbGVjdGlvblR5cGUgPT09IFwiZnJvbVwiKSB7XHJcbiAgICAgICAgICBzZXRDbGllbnRGcm9tQnV0dG9uVGV4dChjbGllbnREYXRhLm5hbWUpO1xyXG4gICAgICAgICAgc2V0U2VsZWN0ZWRDbGllbnRGcm9tKGNsaWVudElkKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGNsaWVudFNlbGVjdGlvblR5cGUgPT09IFwiY3VycmVudFwiKSB7XHJcbiAgICAgICAgICBzZXRDbGllbnRDdXJyZW50QnV0dG9uVGV4dChjbGllbnREYXRhLm5hbWUpO1xyXG4gICAgICAgICAgc2V0U2VsZWN0ZWRDbGllbnRDdXJyZW50KGNsaWVudElkKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIk5vIGNsaWVudCBkb2N1bWVudCBmb3VuZCBmb3IgaWQ6XCIsIGNsaWVudElkKTtcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGZldGNoaW5nIGNsaWVudCBkYXRhOlwiLCBlcnJvcik7XHJcbiAgICB9XHJcbiAgICBzZXRTaG93Q2xpZW50TW9kYWwoZmFsc2UpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGhhbmRsZUNsaWVudEluZm8gPSAoY2xpZW50SWQsIGNsaWVudE5hbWUpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKGBDbGllbnQgSUQ6ICR7Y2xpZW50SWR9LCBDbGllbnQgTmFtZTogJHtjbGllbnROYW1lfWApO1xyXG4gICAgcm91dGVyLnB1c2goXCJjbGllbnQvXCIgKyBjbGllbnRJZCk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQ2xlYXJDbGllbnRTZWxlY3Rpb24gPSAoKSA9PiB7XHJcbiAgICBpZiAoY2xpZW50U2VsZWN0aW9uVHlwZSA9PT0gXCJmcm9tXCIpIHtcclxuICAgICAgc2V0Q2xpZW50RnJvbUJ1dHRvblRleHQoXCJTZWxlY3QgT3B0aW9uXCIpO1xyXG4gICAgICBzZXRTZWxlY3RlZENsaWVudEZyb20obnVsbCk7XHJcbiAgICB9IGVsc2UgaWYgKGNsaWVudFNlbGVjdGlvblR5cGUgPT09IFwiY3VycmVudFwiKSB7XHJcbiAgICAgIHNldENsaWVudEN1cnJlbnRCdXR0b25UZXh0KFwiU2VsZWN0IE9wdGlvblwiKTtcclxuICAgICAgc2V0U2VsZWN0ZWRDbGllbnRDdXJyZW50KG51bGwpO1xyXG4gICAgfVxyXG4gICAgc2V0U2hvd0NsaWVudE1vZGFsKGZhbHNlKTtcclxuICB9O1xyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIE1PREVMIFNFTEVDVElPTiBIQU5ETElOR1xyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgY29uc3QgW21vZGVscywgc2V0TW9kZWxzXSA9IHVzZVN0YXRlKFtdKTtcclxuICBjb25zdCBbc2hvd01vZGVsTW9kYWwsIHNldFNob3dNb2RlbE1vZGFsXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbbW9kZWxCdXR0b25UZXh0LCBzZXRNb2RlbEJ1dHRvblRleHRdID0gdXNlU3RhdGUoXCJTZWxlY3QgT3B0aW9uXCIpO1xyXG5cclxuICBjb25zdCBoYW5kbGVNb2RlbENsaWNrID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgY29uc3QgbW9kZWxzRGF0YSA9IGF3YWl0IGZldGNoTW9kZWxzKFxyXG4gICAgICBzZWxlY3RlZE9FTSxcclxuICAgICAgc2VsZWN0ZWRNb2RhbGl0eSxcclxuICAgICAgc2VsZWN0ZWRDbGllbnRGcm9tXHJcbiAgICApO1xyXG4gICAgc2V0TW9kZWxzKG1vZGVsc0RhdGEpO1xyXG4gICAgc2V0TW9kZWxTZWFyY2hUZXJtKFwiXCIpO1xyXG4gICAgc2V0U2hvd01vZGVsTW9kYWwodHJ1ZSk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaGFuZGxlTW9kZWxTZWxlY3QgPSAobW9kZWxOYW1lKSA9PiB7XHJcbiAgICBzZXRNb2RlbEJ1dHRvblRleHQobW9kZWxOYW1lIHx8IFwiU2VsZWN0IE9wdGlvblwiKTtcclxuICAgIHNldFNlbGVjdGVkTW9kZWwobW9kZWxOYW1lIHx8IG51bGwpO1xyXG4gICAgc2V0U2hvd01vZGVsTW9kYWwoZmFsc2UpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGhhbmRsZUNsZWFyTW9kZWxTZWxlY3Rpb24gPSAoKSA9PiB7XHJcbiAgICBzZXRNb2RlbEJ1dHRvblRleHQoXCJTZWxlY3QgT3B0aW9uXCIpO1xyXG4gICAgc2V0U2VsZWN0ZWRNb2RlbChudWxsKTtcclxuICAgIHNldFNob3dNb2RlbE1vZGFsKGZhbHNlKTtcclxuICB9O1xyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIFdBUkVIT1VTRSBCVVRUT05TIChmb3IgQ2xpZW50IEN1cnJlbnQpXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICBjb25zdCBoYW5kbGVTb0NhbFdhcmVob3VzZUNsaWNrID0gKCkgPT4ge1xyXG4gICAgc2V0Q2xpZW50Q3VycmVudEJ1dHRvblRleHQoXCJTb0NhbCBXYXJlaG91c2VcIik7XHJcbiAgICBzZXRTZWxlY3RlZENsaWVudEN1cnJlbnQoU09DQUxfQ0xJRU5UX0lEKTtcclxuICAgIGNvbnNvbGUubG9nKFwiV2FyZWhvdXNlIGJ1dHRvbiBjbGlja2VkOiBzZXR0aW5nIENsaWVudCBDdXJyZW50IHRvXCIsIFNPQ0FMX0NMSUVOVF9JRCk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaGFuZGxlTm9yQ2FsV2FyZWhvdXNlQ2xpY2sgPSAoKSA9PiB7XHJcbiAgICBzZXRDbGllbnRDdXJyZW50QnV0dG9uVGV4dChcIk5vckNhbCBXYXJlaG91c2VcIik7XHJcbiAgICBzZXRTZWxlY3RlZENsaWVudEN1cnJlbnQoTk9SQ0FMX0NMSUVOVF9JRCk7XHJcbiAgICBjb25zb2xlLmxvZyhcIldhcmVob3VzZSBidXR0b24gY2xpY2tlZDogc2V0dGluZyBDbGllbnQgQ3VycmVudCB0b1wiLCBOT1JDQUxfQ0xJRU5UX0lEKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBoYW5kbGVXYXJlaG91c2VVbmFzc2lnbmVkQ2xpY2sgPSAoKSA9PiB7XHJcbiAgICBzZXRDbGllbnRDdXJyZW50QnV0dG9uVGV4dChcIlVuYXNzaWduZWRcIik7XHJcbiAgICBzZXRTZWxlY3RlZENsaWVudEN1cnJlbnQoVU5BU1NJR05FRF9DTElFTlRfSUQpO1xyXG4gICAgY29uc29sZS5sb2coXCJXYXJlaG91c2UgYnV0dG9uIGNsaWNrZWQ6IHNldHRpbmcgQ2xpZW50IEN1cnJlbnQgdG9cIiwgVU5BU1NJR05FRF9DTElFTlRfSUQpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IFtjbGllbnRTZWFyY2hUZXJtLCBzZXRDbGllbnRTZWFyY2hUZXJtXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFttb2RlbFNlYXJjaFRlcm0sIHNldE1vZGVsU2VhcmNoVGVybV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuXHJcbiAgY29uc3QgZGVsZXRlRnJvbVN0b3JhZ2UgPSBhc3luYyAoaXRlbUlkKSA9PiB7XHJcbiAgICBjb25zdCBzdG9yYWdlUmVmID0gZmlyZWJhc2Uuc3RvcmFnZSgpLnJlZigpO1xyXG4gICAgY29uc3QgZm9sZGVyUmVmID0gc3RvcmFnZVJlZi5jaGlsZChgUGFydHMvJHtpdGVtSWR9L2ApO1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgbGlzdFJlc3VsdCA9IGF3YWl0IGZvbGRlclJlZi5saXN0QWxsKCk7XHJcbiAgICAgIGNvbnN0IGRlbGV0ZVByb21pc2VzID0gbGlzdFJlc3VsdC5pdGVtcy5tYXAoKGl0ZW0pID0+IGl0ZW0uZGVsZXRlKCkpO1xyXG4gICAgICBhd2FpdCBQcm9taXNlLmFsbChkZWxldGVQcm9taXNlcyk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZGVsZXRpbmcgZnJvbSBzdG9yYWdlOlwiLCBlcnJvcik7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgZGVsZXRlRnJvbVBhcnRzQ29sbGVjdGlvbiA9IGFzeW5jIChpdGVtSWQpID0+IHtcclxuICAgIGNvbnN0IGRiID0gZmlyZWJhc2UuZmlyZXN0b3JlKCk7XHJcbiAgICB0cnkge1xyXG4gICAgICBhd2FpdCBkYi5jb2xsZWN0aW9uKFwiUGFydHNcIikuZG9jKGl0ZW1JZCkuZGVsZXRlKCk7XHJcbiAgICAgIGNvbnNvbGUubG9nKGBEZWxldGVkIGl0ZW0gZnJvbSBQYXJ0cyBjb2xsZWN0aW9uOiAke2l0ZW1JZH1gKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBkZWxldGluZyBmcm9tIFBhcnRzIGNvbGxlY3Rpb246XCIsIGVycm9yKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICAvLyAgIC8vIFNhZmVseSBjb252ZXJ0IGFueSBkYXRlLWlzaCB2YWx1ZSBpbnRvIGEgY29tcGFyYWJsZSB0aW1lc3RhbXAgKG1zIHNpbmNlIGVwb2NoKS5cclxuICAvLyBmdW5jdGlvbiB0b1RpbWUodmFsdWUpIHtcclxuICAvLyAgIGlmICghdmFsdWUpIHJldHVybiBudWxsO1xyXG5cclxuICAvLyAgIC8vIEZpcmVzdG9yZSBUaW1lc3RhbXA6IHsgc2Vjb25kcywgbmFub3NlY29uZHMgfVxyXG4gIC8vICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJiB2YWx1ZS5zZWNvbmRzKSB7XHJcbiAgLy8gICAgIHRyeSB7XHJcbiAgLy8gICAgICAgcmV0dXJuIHZhbHVlLnNlY29uZHMgKiAxMDAwO1xyXG4gIC8vICAgICB9IGNhdGNoIHsgLyogZmFsbHRocm91Z2ggKi8gfVxyXG4gIC8vICAgfVxyXG5cclxuICAvLyAgIC8vIElmIGFscmVhZHkgYSBEYXRlXHJcbiAgLy8gICBpZiAodmFsdWUgaW5zdGFuY2VvZiBEYXRlKSByZXR1cm4gaXNOYU4odmFsdWUuZ2V0VGltZSgpKSA/IG51bGwgOiB2YWx1ZS5nZXRUaW1lKCk7XHJcblxyXG4gIC8vICAgLy8gSWYgc3RyaW5nOiB0cnkgSVNPIGZpcnN0XHJcbiAgLy8gICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB7XHJcbiAgLy8gICAgIC8vIHl5eXktbW0tZGQgKGZyb20geW91ciBmb3JtIGlucHV0cylcclxuICAvLyAgICAgY29uc3QgaXNvID0gRGF0ZS5wYXJzZSh2YWx1ZSk7XHJcbiAgLy8gICAgIGlmICghaXNOYU4oaXNvKSkgcmV0dXJuIGlzbztcclxuXHJcbiAgLy8gICAgIC8vIG1tL2RkL3l5eXkgZmFsbGJhY2sgKG9sZGVyIGl0ZW1zKVxyXG4gIC8vICAgICBjb25zdCBwYXJ0cyA9IHZhbHVlLnNwbGl0KFwiL1wiKTtcclxuICAvLyAgICAgaWYgKHBhcnRzLmxlbmd0aCA9PT0gMykge1xyXG4gIC8vICAgICAgIGNvbnN0IFttbSwgZGQsIHl5eXldID0gcGFydHM7XHJcbiAgLy8gICAgICAgY29uc3QgYWx0ID0gRGF0ZS5wYXJzZShgJHt5eXl5fS0ke21tfS0ke2RkfWApO1xyXG4gIC8vICAgICAgIGlmICghaXNOYU4oYWx0KSkgcmV0dXJuIGFsdDtcclxuICAvLyAgICAgfVxyXG4gIC8vICAgfVxyXG5cclxuICAvLyAgIC8vIENhbm9uaWNhbGl6ZSBhbnkgZGF0ZS1pc2ggdmFsdWUgdG8gJ3l5eXktbW0tZGQnIHNvIGl0IG1hdGNoZXMgPGlucHV0IHR5cGU9XCJkYXRlXCI+IHZhbHVlc1xyXG4gIC8vICAgZnVuY3Rpb24gdG9ZTUQodmFsdWUpIHtcclxuICAvLyAgICAgY29uc3QgdCA9IHRvVGltZSh2YWx1ZSk7XHJcbiAgLy8gICAgIGlmICh0ID09IG51bGwpIHJldHVybiBudWxsO1xyXG4gIC8vICAgICBjb25zdCBkID0gbmV3IERhdGUodCk7XHJcbiAgLy8gICAgIGNvbnN0IHl5eXkgPSBkLmdldEZ1bGxZZWFyKCk7XHJcbiAgLy8gICAgIGNvbnN0IG1tID0gU3RyaW5nKGQuZ2V0TW9udGgoKSArIDEpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcclxuICAvLyAgICAgY29uc3QgZGQgPSBTdHJpbmcoZC5nZXREYXRlKCkpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcclxuICAvLyAgICAgcmV0dXJuIGAke3l5eXl9LSR7bW19LSR7ZGR9YDtcclxuICAvLyAgIH1cclxuXHJcblxyXG4gIC8vICAgLy8gTGFzdCByZXNvcnRcbiAgLy8gICBjb25zdCB0ID0gRGF0ZS5wYXJzZSh2YWx1ZSk7XG4gIC8vICAgcmV0dXJuIGlzTmFOKHQpID8gbnVsbCA6IHQ7XG4gIC8vIH1cblxuICBjb25zdCB0b3RhbEtub3duUGFnZXMgPSBNYXRoLm1heChcbiAgICAxLFxuICAgIHBhZ2VDdXJzb3JzLmZpbHRlcihCb29sZWFuKS5sZW5ndGggKyAoaGFzTmV4dFBhZ2UgPyAxIDogMClcbiAgKTtcbiAgY29uc3QgcGFnZUJ1dHRvbnMgPSAoKCkgPT4ge1xuICAgIGNvbnN0IGJ1dHRvbnMgPSBbXTtcbiAgICBjb25zdCBtYXhWaXNpYmxlID0gNztcblxuICAgIGNvbnN0IHB1c2hQYWdlID0gKHApID0+XG4gICAgICBidXR0b25zLnB1c2goXG4gICAgICAgIDxQYWdpbmF0aW9uLkl0ZW1cbiAgICAgICAgICBrZXk9e2BwYWdlLSR7cH1gfVxuICAgICAgICAgIGFjdGl2ZT17cCA9PT0gcGFnZX1cbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRQYWdlKHApfVxuICAgICAgICA+XG4gICAgICAgICAge3B9XG4gICAgICAgIDwvUGFnaW5hdGlvbi5JdGVtPlxuICAgICAgKTtcblxuICAgIGNvbnN0IHB1c2hFbGxpcHNpcyA9IChrZXkpID0+XG4gICAgICBidXR0b25zLnB1c2goPFBhZ2luYXRpb24uRWxsaXBzaXMga2V5PXtrZXl9IGRpc2FibGVkIC8+KTtcblxuICAgIGlmICh0b3RhbEtub3duUGFnZXMgPD0gbWF4VmlzaWJsZSkge1xuICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gdG90YWxLbm93blBhZ2VzOyBpICs9IDEpIHB1c2hQYWdlKGkpO1xuICAgICAgcmV0dXJuIGJ1dHRvbnM7XG4gICAgfVxuXG4gICAgbGV0IHN0YXJ0ID0gTWF0aC5tYXgoMiwgcGFnZSAtIDEpO1xuICAgIGxldCBlbmQgPSBNYXRoLm1pbih0b3RhbEtub3duUGFnZXMgLSAxLCBwYWdlICsgMSk7XG5cbiAgICBjb25zdCBkZXNpcmVkV2luZG93ID0gbWF4VmlzaWJsZSAtIDI7XG4gICAgbGV0IGN1cnJlbnRXaW5kb3cgPSBlbmQgLSBzdGFydCArIDE7XG4gICAgbGV0IHJlbWFpbmluZyA9IGRlc2lyZWRXaW5kb3cgLSBjdXJyZW50V2luZG93O1xuXG4gICAgd2hpbGUgKHJlbWFpbmluZyA+IDApIHtcbiAgICAgIGlmIChzdGFydCA+IDIpIHtcbiAgICAgICAgc3RhcnQgLT0gMTtcbiAgICAgICAgcmVtYWluaW5nIC09IDE7XG4gICAgICB9XG4gICAgICBpZiAocmVtYWluaW5nID4gMCAmJiBlbmQgPCB0b3RhbEtub3duUGFnZXMgLSAxKSB7XG4gICAgICAgIGVuZCArPSAxO1xuICAgICAgICByZW1haW5pbmcgLT0gMTtcbiAgICAgIH1cbiAgICAgIGlmIChzdGFydCA9PT0gMiAmJiBlbmQgPT09IHRvdGFsS25vd25QYWdlcyAtIDEpIGJyZWFrO1xuICAgIH1cblxuICAgIHB1c2hQYWdlKDEpO1xuICAgIGlmIChzdGFydCA+IDIpIHB1c2hFbGxpcHNpcyhcInN0YXJ0LWVsbGlwc2lzXCIpO1xuICAgIGZvciAobGV0IGkgPSBzdGFydDsgaSA8PSBlbmQ7IGkgKz0gMSkgcHVzaFBhZ2UoaSk7XG4gICAgaWYgKGVuZCA8IHRvdGFsS25vd25QYWdlcyAtIDEpIHB1c2hFbGxpcHNpcyhcImVuZC1lbGxpcHNpc1wiKTtcbiAgICBwdXNoUGFnZSh0b3RhbEtub3duUGFnZXMpO1xuICAgIGlmIChoYXNOZXh0UGFnZSkgcHVzaEVsbGlwc2lzKFwibW9yZS1lbGxpcHNpc1wiKTtcblxuICAgIHJldHVybiBidXR0b25zO1xuICB9KSgpO1xuXG4gIGNvbnN0IHJlY2FsY1BhZ2VTaXplID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm47XG4gICAgaWYgKHBhZ2UgIT09IDEpIHJldHVybjtcbiAgICBpZiAoIXRhYmxlQm9keVJlZi5jdXJyZW50KSByZXR1cm47XG4gICAgY29uc3QgY29udGFpbmVySGVpZ2h0ID1cbiAgICAgIHRhYmxlQm9keVJlZi5jdXJyZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodCB8fCAwO1xuICAgIGlmICghY29udGFpbmVySGVpZ2h0KSByZXR1cm47XG5cbiAgICBjb25zdCBoZWFkZXJSb3cgPVxuICAgICAgdGFibGVCb2R5UmVmLmN1cnJlbnQucXVlcnlTZWxlY3RvcihcInRhYmxlIHRoZWFkIHRyXCIpIHx8XG4gICAgICB0YWJsZUJvZHlSZWYuY3VycmVudC5xdWVyeVNlbGVjdG9yKFwidGhlYWQgdHJcIik7XG4gICAgY29uc3QgYm9keVJvdyA9XG4gICAgICB0YWJsZUJvZHlSZWYuY3VycmVudC5xdWVyeVNlbGVjdG9yKFwidGFibGUgdGJvZHkgdHJcIikgfHxcbiAgICAgIHRhYmxlQm9keVJlZi5jdXJyZW50LnF1ZXJ5U2VsZWN0b3IoXCJ0Ym9keSB0clwiKTtcblxuICAgIGlmIChoZWFkZXJSb3cpIHtcbiAgICAgIGNvbnN0IGggPSBoZWFkZXJSb3cuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xuICAgICAgaWYgKGgpIGhlYWRlckhlaWdodFJlZi5jdXJyZW50ID0gaDtcbiAgICB9XG4gICAgaWYgKGJvZHlSb3cpIHtcbiAgICAgIGNvbnN0IHIgPSBib2R5Um93LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcbiAgICAgIGlmIChyKSByb3dIZWlnaHRSZWYuY3VycmVudCA9IHI7XG4gICAgfVxuXG4gICAgY29uc3QgdmVydGljYWxQYWRkaW5nID0gMjQ7XG4gICAgY29uc3QgYXZhaWxhYmxlID1cbiAgICAgIGNvbnRhaW5lckhlaWdodCAtIGhlYWRlckhlaWdodFJlZi5jdXJyZW50IC0gdmVydGljYWxQYWRkaW5nO1xuICAgIGNvbnN0IGVzdGltYXRlZCA9IE1hdGguZmxvb3IoYXZhaWxhYmxlIC8gcm93SGVpZ2h0UmVmLmN1cnJlbnQpO1xuICAgIGNvbnN0IGNsYW1wZWQgPSBNYXRoLm1heCg1LCBNYXRoLm1pbig1MCwgZXN0aW1hdGVkKSk7XG4gICAgaWYgKGNsYW1wZWQgPiAwICYmIGNsYW1wZWQgIT09IHBhZ2VTaXplKSB7XG4gICAgICBzZXRQYWdlU2l6ZShjbGFtcGVkKTtcbiAgICAgIHJlc2V0UGFnaW5hdGlvbigpO1xuICAgICAgc2V0UXVlcnlFcG9jaCgodikgPT4gdiArIDEpO1xuICAgIH1cbiAgfSwgW3BhZ2UsIHBhZ2VTaXplXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuO1xuICAgIHJlY2FsY1BhZ2VTaXplKCk7XG4gICAgY29uc3Qgb25SZXNpemUgPSAoKSA9PiByZWNhbGNQYWdlU2l6ZSgpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIG9uUmVzaXplKTtcbiAgICByZXR1cm4gKCkgPT4gd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgb25SZXNpemUpO1xuICB9LCBbcmVjYWxjUGFnZVNpemVdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChpc0xvYWRpbmcgfHwgcGFnZSAhPT0gMSkgcmV0dXJuO1xuICAgIHJlY2FsY1BhZ2VTaXplKCk7XG4gIH0sIFtwYWdlLCBpc0xvYWRpbmcsIHJlY2FsY1BhZ2VTaXplXSk7XG5cbiAgY29uc3QgcmVuZGVyRmlsdGVycyA9IChpZFByZWZpeCkgPT4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuZmlsdGVyc1BhbmVsfT5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuZmlsdGVyc0hlYWRlcn0+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5maWx0ZXJzVGl0bGV9PkZpbHRlcnM8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmZpbHRlcnNTdWJ0aXRsZX0+XG4gICAgICAgICAgICBOYXJyb3cgcmVzdWx0cyBieSBtYWNoaW5lLCBjbGllbnQsIG9yIHdhcmVob3VzZS5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHtoYXNBY3RpdmVGaWx0ZXJzID8gKFxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17c3R5bGVzLmZpbHRlcnNCYWRnZX0+QWN0aXZlPC9zcGFuPlxuICAgICAgICApIDogbnVsbH1cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmZpbHRlclNlY3Rpb259PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmZpbHRlclNlY3Rpb25UaXRsZX0+TWFjaGluZTwvZGl2PlxuICAgICAgICA8SW5wdXRHcm91cCBjbGFzc05hbWU9e3N0eWxlcy5pbnB1dEdyb3VwfT5cbiAgICAgICAgICA8SW5wdXRHcm91cC5UZXh0Pk9FTTwvSW5wdXRHcm91cC5UZXh0PlxuICAgICAgICAgIDxEcm9wZG93biBvblNlbGVjdD17aGFuZGxlU2VsZWN0MX0gY2xhc3NOYW1lPVwidy0xMDBcIj5cbiAgICAgICAgICAgIDxEcm9wZG93bi5Ub2dnbGVcbiAgICAgICAgICAgICAgdmFyaWFudD1cIm91dGxpbmUtc2Vjb25kYXJ5XCJcbiAgICAgICAgICAgICAgaWQ9e2Ake2lkUHJlZml4fS1vZW1gfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2B3LTEwMCAke3N0eWxlcy5pbnB1dEJ1dHRvbn1gfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7ZHJvcGRvd24xVGV4dH1cbiAgICAgICAgICAgIDwvRHJvcGRvd24uVG9nZ2xlPlxuICAgICAgICAgICAgPERyb3Bkb3duLk1lbnUgY2xhc3NOYW1lPVwidy0xMDBcIj5cbiAgICAgICAgICAgICAgPERyb3Bkb3duLkl0ZW0gZXZlbnRLZXk9XCJ1bmFzc2lnbmVkXCI+U2VsZWN0IE9wdGlvbjwvRHJvcGRvd24uSXRlbT5cbiAgICAgICAgICAgICAgPERyb3Bkb3duLkl0ZW0gZXZlbnRLZXk9XCJHRVwiPkdFPC9Ecm9wZG93bi5JdGVtPlxuICAgICAgICAgICAgICA8RHJvcGRvd24uSXRlbSBldmVudEtleT1cIlRvc2hpYmFcIj5Ub3NoaWJhPC9Ecm9wZG93bi5JdGVtPlxuICAgICAgICAgICAgICA8RHJvcGRvd24uSXRlbSBldmVudEtleT1cIlNpZW1lbnNcIj5TaWVtZW5zPC9Ecm9wZG93bi5JdGVtPlxuICAgICAgICAgICAgICA8RHJvcGRvd24uSXRlbSBldmVudEtleT1cIlBoaWxpcHNcIj5QaGlsaXBzPC9Ecm9wZG93bi5JdGVtPlxuICAgICAgICAgICAgPC9Ecm9wZG93bi5NZW51PlxuICAgICAgICAgIDwvRHJvcGRvd24+XG4gICAgICAgIDwvSW5wdXRHcm91cD5cblxuICAgICAgICA8SW5wdXRHcm91cCBjbGFzc05hbWU9e3N0eWxlcy5pbnB1dEdyb3VwfT5cbiAgICAgICAgICA8SW5wdXRHcm91cC5UZXh0Pk1vZGFsaXR5PC9JbnB1dEdyb3VwLlRleHQ+XG4gICAgICAgICAgPERyb3Bkb3duIG9uU2VsZWN0PXtoYW5kbGVTZWxlY3QyfSBjbGFzc05hbWU9XCJ3LTEwMFwiPlxuICAgICAgICAgICAgPERyb3Bkb3duLlRvZ2dsZVxuICAgICAgICAgICAgICB2YXJpYW50PVwib3V0bGluZS1zZWNvbmRhcnlcIlxuICAgICAgICAgICAgICBpZD17YCR7aWRQcmVmaXh9LW1vZGFsaXR5YH1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdy0xMDAgJHtzdHlsZXMuaW5wdXRCdXR0b259YH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge2Ryb3Bkb3duMlRleHR9XG4gICAgICAgICAgICA8L0Ryb3Bkb3duLlRvZ2dsZT5cbiAgICAgICAgICAgIDxEcm9wZG93bi5NZW51IGNsYXNzTmFtZT1cInctMTAwXCI+XG4gICAgICAgICAgICAgIDxEcm9wZG93bi5JdGVtIGV2ZW50S2V5PVwidW5hc3NpZ25lZFwiPlNlbGVjdCBPcHRpb248L0Ryb3Bkb3duLkl0ZW0+XG4gICAgICAgICAgICAgIDxEcm9wZG93bi5JdGVtIGV2ZW50S2V5PVwiQ1RcIj5DVDwvRHJvcGRvd24uSXRlbT5cbiAgICAgICAgICAgICAgPERyb3Bkb3duLkl0ZW0gZXZlbnRLZXk9XCJNUklcIj5NUkk8L0Ryb3Bkb3duLkl0ZW0+XG4gICAgICAgICAgICA8L0Ryb3Bkb3duLk1lbnU+XG4gICAgICAgICAgPC9Ecm9wZG93bj5cbiAgICAgICAgPC9JbnB1dEdyb3VwPlxuXG4gICAgICAgIDxJbnB1dEdyb3VwIGNsYXNzTmFtZT17c3R5bGVzLmlucHV0R3JvdXB9PlxuICAgICAgICAgIDxJbnB1dEdyb3VwLlRleHQ+TW9kZWw8L0lucHV0R3JvdXAuVGV4dD5cbiAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICB2YXJpYW50PVwib3V0bGluZS1zZWNvbmRhcnlcIlxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgdy0xMDAgJHtzdHlsZXMuaW5wdXRCdXR0b259YH1cbiAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZU1vZGVsQ2xpY2t9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge21vZGVsQnV0dG9uVGV4dH1cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgPC9JbnB1dEdyb3VwPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuZmlsdGVyU2VjdGlvbn0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuZmlsdGVyU2VjdGlvblRpdGxlfT5DbGllbnQ8L2Rpdj5cbiAgICAgICAgPElucHV0R3JvdXAgY2xhc3NOYW1lPXtzdHlsZXMuaW5wdXRHcm91cH0+XG4gICAgICAgICAgPElucHV0R3JvdXAuVGV4dD5DbGllbnQgRnJvbTwvSW5wdXRHcm91cC5UZXh0PlxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIHZhcmlhbnQ9XCJvdXRsaW5lLXNlY29uZGFyeVwiXG4gICAgICAgICAgICBjbGFzc05hbWU9e2B3LTEwMCAke3N0eWxlcy5pbnB1dEJ1dHRvbn1gfVxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlQ2xpZW50Q2xpY2soXCJmcm9tXCIpfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtjbGllbnRGcm9tQnV0dG9uVGV4dH1cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgPC9JbnB1dEdyb3VwPlxuXG4gICAgICAgIDxJbnB1dEdyb3VwIGNsYXNzTmFtZT17c3R5bGVzLmlucHV0R3JvdXB9PlxuICAgICAgICAgIDxJbnB1dEdyb3VwLlRleHQ+Q2xpZW50IEN1cnJlbnQ8L0lucHV0R3JvdXAuVGV4dD5cbiAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICB2YXJpYW50PVwib3V0bGluZS1zZWNvbmRhcnlcIlxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgdy0xMDAgJHtzdHlsZXMuaW5wdXRCdXR0b259YH1cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZUNsaWVudENsaWNrKFwiY3VycmVudFwiKX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7Y2xpZW50Q3VycmVudEJ1dHRvblRleHR9XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgIDwvSW5wdXRHcm91cD5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmZpbHRlclNlY3Rpb259PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmZpbHRlclNlY3Rpb25UaXRsZX0+V2FyZWhvdXNlPC9kaXY+XG4gICAgICAgIDxJbnB1dEdyb3VwIGNsYXNzTmFtZT17c3R5bGVzLmlucHV0R3JvdXB9PlxuICAgICAgICAgIDxJbnB1dEdyb3VwLlRleHQ+UXVpY2s8L0lucHV0R3JvdXAuVGV4dD5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmJ1dHRvbkdyb3VwfT5cbiAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgdmFyaWFudD1cIm91dGxpbmUtc2Vjb25kYXJ5XCJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMuZmxleEJ1dHRvbn1cbiAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlU29DYWxXYXJlaG91c2VDbGlja31cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgU29DYWwgV2FyZWhvdXNlXG4gICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgdmFyaWFudD1cIm91dGxpbmUtc2Vjb25kYXJ5XCJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMuZmxleEJ1dHRvbn1cbiAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlTm9yQ2FsV2FyZWhvdXNlQ2xpY2t9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIE5vckNhbCBXYXJlaG91c2VcbiAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICB2YXJpYW50PVwib3V0bGluZS1zZWNvbmRhcnlcIlxuICAgICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5mbGV4QnV0dG9ufVxuICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVXYXJlaG91c2VVbmFzc2lnbmVkQ2xpY2t9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIFVuYXNzaWduZWRcbiAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L0lucHV0R3JvdXA+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcblxuXG4gIHJldHVybiAoXG4gICAgPExvZ2dlZEluPlxuICAgICAgeyhpc0RlbGV0aW5nIHx8IGlzTmF2aWdhdGluZykgJiYgKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmxvYWRpbmdPdmVybGF5fT5cbiAgICAgICAgICA8aW1nXG4gICAgICAgICAgICBzcmM9XCIvbWFnbW8tbG9nby5wbmdcIlxuICAgICAgICAgICAgYWx0PVwiTG9hZGluZyBNYWdtb1wiXG4gICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5sb2FkaW5nTG9nb31cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG4gICAgICA8TW9kYWwgc2hvdz17c2hvd0RlbGV0ZU1vZGFsfSBvbkhpZGU9e2hhbmRsZUNsb3NlRGVsZXRlTW9kYWx9PlxyXG4gICAgICAgIDxNb2RhbC5IZWFkZXIgY2xvc2VCdXR0b24+XHJcbiAgICAgICAgICA8TW9kYWwuVGl0bGU+Q29uZmlybSBEZWxldGlvbjwvTW9kYWwuVGl0bGU+XHJcbiAgICAgICAgPC9Nb2RhbC5IZWFkZXI+XHJcbiAgICAgICAgPE1vZGFsLkJvZHk+XHJcbiAgICAgICAgICBBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIHtzZWxlY3RlZEl0ZW1zLmxlbmd0aH0gaXRlbVxyXG4gICAgICAgICAge3NlbGVjdGVkSXRlbXMubGVuZ3RoID4gMSA/IFwic1wiIDogXCJcIn0/XHJcbiAgICAgICAgPC9Nb2RhbC5Cb2R5PlxyXG4gICAgICAgIDxNb2RhbC5Gb290ZXI+XHJcbiAgICAgICAgICA8QnV0dG9uIHZhcmlhbnQ9XCJkYW5nZXJcIiBvbkNsaWNrPXtoYW5kbGVEZWxldGVTZWxlY3RlZH0+XHJcbiAgICAgICAgICAgIFllcywgZGVsZXRlXHJcbiAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICAgIDxCdXR0b24gdmFyaWFudD1cInNlY29uZGFyeVwiIG9uQ2xpY2s9e2hhbmRsZUNsb3NlRGVsZXRlTW9kYWx9PlxyXG4gICAgICAgICAgICBDYW5jZWxcclxuICAgICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICAgIDwvTW9kYWwuRm9vdGVyPlxyXG4gICAgICA8L01vZGFsPlxyXG5cclxuICAgICAgPE1vZGFsIHNob3c9e3Nob3dDbGllbnRNb2RhbH0gb25IaWRlPXsoKSA9PiBzZXRTaG93Q2xpZW50TW9kYWwoZmFsc2UpfT5cclxuICAgICAgICA8TW9kYWwuSGVhZGVyIGNsb3NlQnV0dG9uPlxyXG4gICAgICAgICAgPE1vZGFsLlRpdGxlPlxyXG4gICAgICAgICAgICBTZWxlY3Qge2NsaWVudFNlbGVjdGlvblR5cGUgPT09IFwiZnJvbVwiID8gXCJDbGllbnQgRnJvbVwiIDogXCJDbGllbnQgQ3VycmVudFwifVxyXG4gICAgICAgICAgPC9Nb2RhbC5UaXRsZT5cclxuICAgICAgICA8L01vZGFsLkhlYWRlcj5cclxuICAgICAgICA8TW9kYWwuQm9keT5cclxuICAgICAgICAgIDxGb3JtQ29udHJvbFxyXG4gICAgICAgICAgICB0eXBlPVwidGV4dFwiXHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoIGJ5IG5hbWVcIlxyXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJtYi0zXCJcclxuICAgICAgICAgICAgdmFsdWU9e2NsaWVudFNlYXJjaFRlcm19XHJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0Q2xpZW50U2VhcmNoVGVybShlLnRhcmdldC52YWx1ZSl9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICAgPENsaWVudFRhYmxlXHJcbiAgICAgICAgICAgIGNsaWVudHM9eyhBcnJheS5pc0FycmF5KGNsaWVudHMpID8gY2xpZW50cyA6IFtdKS5maWx0ZXIoXHJcbiAgICAgICAgICAgICAgKGNsaWVudCkgPT4gKGNsaWVudD8ubmFtZSA/PyBcIlwiKS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKGNsaWVudFNlYXJjaFRlcm0udG9Mb3dlckNhc2UoKSlcclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgb25TZWxlY3RDbGllbnQ9e2hhbmRsZUNsaWVudFNlbGVjdH1cclxuICAgICAgICAgICAgb25JbmZvQ2xpY2s9e2hhbmRsZUNsaWVudEluZm99XHJcbiAgICAgICAgICAgIGlzQ2xpZW50U2VhcmNoPXtmYWxzZX1cclxuICAgICAgICAgICAgY2xlYXJTZWxlY3Rpb249eygpID0+IGhhbmRsZUNsaWVudFNlbGVjdChudWxsKX1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgPC9Nb2RhbC5Cb2R5PlxyXG4gICAgICA8L01vZGFsPlxyXG5cclxuICAgICAgPE1vZGFsIHNob3c9e3Nob3dNb2RlbE1vZGFsfSBvbkhpZGU9eygpID0+IHNldFNob3dNb2RlbE1vZGFsKGZhbHNlKX0+XHJcbiAgICAgICAgPE1vZGFsLkhlYWRlciBjbG9zZUJ1dHRvbj5cclxuICAgICAgICAgIDxNb2RhbC5UaXRsZT5TZWxlY3QgTW9kZWw8L01vZGFsLlRpdGxlPlxyXG4gICAgICAgIDwvTW9kYWwuSGVhZGVyPlxyXG4gICAgICAgIDxNb2RhbC5Cb2R5PlxyXG4gICAgICAgICAgPEZvcm1Db250cm9sXHJcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJTZWFyY2ggYnkgbmFtZVwiXHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1iLTNcIlxyXG4gICAgICAgICAgICB2YWx1ZT17bW9kZWxTZWFyY2hUZXJtfVxyXG4gICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldE1vZGVsU2VhcmNoVGVybShlLnRhcmdldC52YWx1ZSl9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICAgPE1vZGVsVGFibGVcclxuICAgICAgICAgICAgbW9kZWxzPXttb2RlbHMuZmlsdGVyKChtb2RlbCkgPT5cclxuICAgICAgICAgICAgICB0eXBlb2YgbW9kZWwgPT09IFwic3RyaW5nXCJcclxuICAgICAgICAgICAgICAgID8gbW9kZWwudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhtb2RlbFNlYXJjaFRlcm0udG9Mb3dlckNhc2UoKSlcclxuICAgICAgICAgICAgICAgIDogZmFsc2VcclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgb25TZWxlY3RNb2RlbD17aGFuZGxlTW9kZWxTZWxlY3R9XHJcbiAgICAgICAgICAgIGNsZWFyU2VsZWN0aW9uPXsoKSA9PiBoYW5kbGVNb2RlbFNlbGVjdChudWxsKX1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgPC9Nb2RhbC5Cb2R5PlxyXG4gICAgICA8L01vZGFsPlxyXG5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5wYWdlfT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5wYWdlSW5uZXJ9PlxuICAgICAgICAgIDxoZWFkZXIgY2xhc3NOYW1lPXtzdHlsZXMuaGVhZGVyfT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuaGVhZGVyTGVmdH0+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5idXJnZXJ9XG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0U2hvd0ZpbHRlcnModHJ1ZSl9XG4gICAgICAgICAgICAgICAgYXJpYS1sYWJlbD1cIk9wZW4gZmlsdGVyc1wiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8c3Bhbj48L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4+PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuPjwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuYnJhbmR9PlxuICAgICAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgICAgIHNyYz1cIi9tYWdtby1sb2dvLnBuZ1wiXG4gICAgICAgICAgICAgICAgICBhbHQ9XCJNYWdtb1wiXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5icmFuZExvZ299XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5icmFuZE5hbWV9Pk1hZ21vPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmJyYW5kU3VifT5JbnZlbnRvcnkgU2VhcmNoPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmhlYWRlclJpZ2h0fT5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5oZWFkZXJTdGF0dXN9PlxuICAgICAgICAgICAgICAgIHtoYXNBY3RpdmVGaWx0ZXJzID8gXCJGaWx0ZXJzIGFjdGl2ZVwiIDogXCJBbGwgaXRlbXNcIn1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2hlYWRlcj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuY29udGVudH0+XG4gICAgICAgICAgICA8YXNpZGUgY2xhc3NOYW1lPXtzdHlsZXMuc2lkZWJhcn0+e3JlbmRlckZpbHRlcnMoXCJzaWRlYmFyXCIpfTwvYXNpZGU+XG4gICAgICAgICAgICA8bWFpbiBjbGFzc05hbWU9e3N0eWxlcy5tYWlufT5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy50YWJsZUNhcmR9PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMudGFibGVIZWFkZXJ9PlxuICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy50YWJsZVRpdGxlfT5JdGVtczwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnRhYmxlU3VidGl0bGV9PlxuICAgICAgICAgICAgICAgICAgICAgIHtpc0xvYWRpbmcgPyBcIkxvYWRpbmcgaXRlbXNcIiA6IGAke2luZm8ubGVuZ3RofSBpdGVtcyBvbiB0aGlzIHBhZ2VgfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy50YWJsZU1ldGF9PlxuICAgICAgICAgICAgICAgICAgICBQYWdlIHtwYWdlfSB7aGFzTmV4dFBhZ2UgPyBgb2YgJHt0b3RhbEtub3duUGFnZXN9K2AgOiBgb2YgJHt0b3RhbEtub3duUGFnZXN9YH1cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy50YWJsZUJvZHl9IHJlZj17dGFibGVCb2R5UmVmfT5cbiAgICAgICAgICAgICAgICAgIHtpc0xvYWRpbmcgPyAoXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubG9hZGluZ1N0YXRlfT5cbiAgICAgICAgICAgICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgICAgICAgICAgICBzcmM9XCIvbWFnbW8tbG9nby5wbmdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgYWx0PVwiTG9hZGluZyBNYWdtb1wiXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5sb2FkaW5nTG9nb31cbiAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubG9hZGluZ1RleHR9PkxvYWRpbmc8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICApIDogbG9hZEVycm9yID8gKFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmVycm9yU3RhdGV9PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuZXJyb3JUaXRsZX0+XG4gICAgICAgICAgICAgICAgICAgICAgICBMb2FkIGZhaWxlZCAoe2xvYWRFcnJvci5jb2RlfSlcbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmVycm9yTWVzc2FnZX0+e2xvYWRFcnJvci5tZXNzYWdlfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhbnQ9XCJvdXRsaW5lLXNlY29uZGFyeVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBzaXplPVwic21cIlxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICByZXNldFBhZ2luYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0UXVlcnlFcG9jaCgodikgPT4gdiArIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICBSZXRyeVxuICAgICAgICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICAgIDxQYXJ0VGFibGVcbiAgICAgICAgICAgICAgICAgICAgICBpbmZvPXtpbmZvfVxuICAgICAgICAgICAgICAgICAgICAgIGxhYmVscz17bGFiZWxzfVxuICAgICAgICAgICAgICAgICAgICAgIGlkcz17aWRzfVxuICAgICAgICAgICAgICAgICAgICAgIGhvdmVyU3R5bGU9e2hvdmVyU3R5bGV9XG4gICAgICAgICAgICAgICAgICAgICAgc29ydENoZWNrQWxsPXtzb3J0Q2hlY2tBbGx9XG4gICAgICAgICAgICAgICAgICAgICAgY2hlY2tEZWxldGU9e2NoZWNrRGVsZXRlfVxuICAgICAgICAgICAgICAgICAgICAgIGlzRGVsZXRpbmc9e2lzRGVsZXRpbmd9XG4gICAgICAgICAgICAgICAgICAgICAgcm93U2VsZWN0PXtyb3dTZWxlY3R9XG4gICAgICAgICAgICAgICAgICAgICAgc2V0SG92ZXJJbmRleD17c2V0SG92ZXJJbmRleH1cbiAgICAgICAgICAgICAgICAgICAgICBob3ZlckluZGV4PXtob3ZlckluZGV4fVxuICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkSXRlbXM9e3NlbGVjdGVkSXRlbXN9XG4gICAgICAgICAgICAgICAgICAgICAgc2V0U2VsZWN0ZWRJdGVtcz17c2V0U2VsZWN0ZWRJdGVtc31cbiAgICAgICAgICAgICAgICAgICAgICBtaW5Sb3dzPXtwYWdlU2l6ZX1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnRhYmxlRm9vdGVyfT5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMucGFnaW5hdGlvblJvd30+XG4gICAgICAgICAgICAgICAgICAgIDxQYWdpbmF0aW9uIHNpemU9XCJzbVwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxQYWdpbmF0aW9uLlByZXZcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFBhZ2UoKHApID0+IE1hdGgubWF4KDEsIHAgLSAxKSl9XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17cGFnZSA8PSAxfVxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIFByZXZpb3VzXG4gICAgICAgICAgICAgICAgICAgICAgPC9QYWdpbmF0aW9uLlByZXY+XG4gICAgICAgICAgICAgICAgICAgICAge3BhZ2VCdXR0b25zfVxuICAgICAgICAgICAgICAgICAgICAgIDxQYWdpbmF0aW9uLk5leHRcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFBhZ2UoKHApID0+IHAgKyAxKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXshaGFzTmV4dFBhZ2V9XG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgTmV4dFxuICAgICAgICAgICAgICAgICAgICAgIDwvUGFnaW5hdGlvbi5OZXh0PlxuICAgICAgICAgICAgICAgICAgICA8L1BhZ2luYXRpb24+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxGb3JtIGNsYXNzTmFtZT17c3R5bGVzLnNlYXJjaFJvd30+XG4gICAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbFxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU9e3Nob3dMaXN0U2VhcmNofVxuICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoXCJcbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5zZWFyY2hJbnB1dH1cbiAgICAgICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPVwiU2VhcmNoXCJcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17c2VhcmNofVxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtzZWFyY2hDaGFuZ2VIYW5kbGVyfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8TmF2RHJvcGRvd25cbiAgICAgICAgICAgICAgICAgICAgICB0aXRsZT17c2VsZWN0fVxuICAgICAgICAgICAgICAgICAgICAgIGlkPVwiY29sbGFzaWJsZS1uYXYtZHJvcGRvd25cIlxuICAgICAgICAgICAgICAgICAgICAgIHNob3c9e3Nob3dMaXN0fVxuICAgICAgICAgICAgICAgICAgICAgIG9uTW91c2VFbnRlcj17KCkgPT4gc2V0U2hvd0xpc3QodHJ1ZSl9XG4gICAgICAgICAgICAgICAgICAgICAgb25Nb3VzZUxlYXZlPXsoKSA9PiBzZXRTaG93TGlzdChmYWxzZSl9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMuc2VhcmNoU2VsZWN0fVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgPE5hdkRyb3Bkb3duLkl0ZW1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2VsZWN0KFwiTmFtZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2hvd0xpc3RTZWFyY2goXCJ0ZXh0XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICBOYW1lXG4gICAgICAgICAgICAgICAgICAgICAgPC9OYXZEcm9wZG93bi5JdGVtPlxuICAgICAgICAgICAgICAgICAgICAgIDxOYXZEcm9wZG93bi5JdGVtXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNlbGVjdChcIkRhdGVcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNob3dMaXN0U2VhcmNoKFwiZGF0ZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgRGF0ZVxuICAgICAgICAgICAgICAgICAgICAgIDwvTmF2RHJvcGRvd24uSXRlbT5cbiAgICAgICAgICAgICAgICAgICAgICA8TmF2RHJvcGRvd24uSXRlbVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTZWxlY3QoXCJXb3JrIE9yZGVyXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTaG93TGlzdFNlYXJjaChcInRleHRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIFdvcmsgT3JkZXJcbiAgICAgICAgICAgICAgICAgICAgICA8L05hdkRyb3Bkb3duLkl0ZW0+XG4gICAgICAgICAgICAgICAgICAgICAgPE5hdkRyb3Bkb3duLkl0ZW1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2VsZWN0KFwiUHJvZHVjdCBOdW1iZXJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNob3dMaXN0U2VhcmNoKFwidGV4dFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgUHJvZHVjdCBOdW1iZXJcbiAgICAgICAgICAgICAgICAgICAgICA8L05hdkRyb3Bkb3duLkl0ZW0+XG4gICAgICAgICAgICAgICAgICAgICAgPE5hdkRyb3Bkb3duLkl0ZW1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2VsZWN0KFwiU2VyaWFsIE51bWJlclwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2hvd0xpc3RTZWFyY2goXCJ0ZXh0XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICBTZXJpYWwgTnVtYmVyXG4gICAgICAgICAgICAgICAgICAgICAgPC9OYXZEcm9wZG93bi5JdGVtPlxuICAgICAgICAgICAgICAgICAgICAgIDxOYXZEcm9wZG93bi5JdGVtXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNlbGVjdChcIkRlc2NyaXB0aW9uXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTaG93TGlzdFNlYXJjaChcInRleHRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIERlc2NyaXB0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgPC9OYXZEcm9wZG93bi5JdGVtPlxuICAgICAgICAgICAgICAgICAgICAgIDxOYXZEcm9wZG93bi5JdGVtXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNlbGVjdChcIlNLVVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2hvd0xpc3RTZWFyY2goXCJ0ZXh0XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICBTS1VcbiAgICAgICAgICAgICAgICAgICAgICA8L05hdkRyb3Bkb3duLkl0ZW0+XG4gICAgICAgICAgICAgICAgICAgIDwvTmF2RHJvcGRvd24+XG4gICAgICAgICAgICAgICAgICA8L0Zvcm0+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmZvb3RlckFjdGlvbnN9PlxuICAgICAgICAgICAgICAgICAgICA8TG9hZGluZ0J1dHRvblxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJzZWNvbmRhcnlcIlxuICAgICAgICAgICAgICAgICAgICAgIG5hbWU9XCJBZGQgTmV3IEl0ZW1cIlxuICAgICAgICAgICAgICAgICAgICAgIHJvdXRlPVwiTmV3U2VhcmNoL0FkZEl0ZW0vTmV3SXRlbVwiXG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMuYWN0aW9uQnV0dG9ufVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgdmFyaWFudD1cImluZm9cIlxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YCR7c3R5bGVzLmFjdGlvbkJ1dHRvbn0gJHtzdHlsZXMubWFwQWN0aW9uQnV0dG9ufWB9XG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17b3Blbk1hcH1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIE1hcFxuICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPExvYWRpbmdCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwicHJpbWFyeVwiXG4gICAgICAgICAgICAgICAgICAgICAgbmFtZT1cIkJhY2tcIlxuICAgICAgICAgICAgICAgICAgICAgIHJvdXRlPVwiV2FyZWhvdXNlZGIvV2FyZWhvdXNlU2VsZWN0XCJcbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5hY3Rpb25CdXR0b259XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L21haW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxPZmZjYW52YXNcbiAgICAgICAgICBzaG93PXtzaG93RmlsdGVyc31cbiAgICAgICAgICBvbkhpZGU9eygpID0+IHNldFNob3dGaWx0ZXJzKGZhbHNlKX1cbiAgICAgICAgICBwbGFjZW1lbnQ9XCJzdGFydFwiXG4gICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMuZmlsdGVyc0RyYXdlcn1cbiAgICAgICAgICBzY3JvbGxcbiAgICAgICAgICBiYWNrZHJvcFxuICAgICAgICA+XG4gICAgICAgICAgPE9mZmNhbnZhcy5IZWFkZXIgY2xvc2VCdXR0b24+XG4gICAgICAgICAgICA8T2ZmY2FudmFzLlRpdGxlPkZpbHRlcnM8L09mZmNhbnZhcy5UaXRsZT5cbiAgICAgICAgICA8L09mZmNhbnZhcy5IZWFkZXI+XG4gICAgICAgICAgPE9mZmNhbnZhcy5Cb2R5PntyZW5kZXJGaWx0ZXJzKFwiZHJhd2VyXCIpfTwvT2ZmY2FudmFzLkJvZHk+XG4gICAgICAgIDwvT2ZmY2FudmFzPlxuXG4gICAgICAgIDxNb2RhbFxuICAgICAgICAgIHNob3c9e3Nob3dNYXB9XG4gICAgICAgICAgb25IaWRlPXsoKSA9PiBzZXRTaG93TWFwKGZhbHNlKX1cbiAgICAgICAgICBjZW50ZXJlZFxuICAgICAgICAgIHNpemU9XCJsZ1wiXG4gICAgICAgID5cbiAgICAgICAgICA8TW9kYWwuSGVhZGVyIGNsb3NlQnV0dG9uPlxuICAgICAgICAgICAgPE1vZGFsLlRpdGxlPldhcmVob3VzZSBNYXA8L01vZGFsLlRpdGxlPlxuICAgICAgICAgIDwvTW9kYWwuSGVhZGVyPlxuICAgICAgICAgIDxNb2RhbC5Cb2R5PlxuICAgICAgICAgICAge21hcExvYWRpbmcgJiYgKFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLm1hcExvYWRpbmd9PlxuICAgICAgICAgICAgICAgIDxTcGlubmVyIGFuaW1hdGlvbj1cImJvcmRlclwiIC8+XG4gICAgICAgICAgICAgICAgPHNwYW4+TG9hZGluZyBtYXAgZGF0YS4uLjwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAge21hcEVycm9yICYmIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubWFwRXJyb3J9PnttYXBFcnJvcn08L2Rpdj59XG5cbiAgICAgICAgICAgIHshbWFwTG9hZGluZyAmJiBtYXBTdGVwID09PSBcInJlZ2lvbnNcIiAmJiAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubWFwU3RhZ2V9PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubWFwSGludH0+U2VsZWN0IGEgcmVnaW9uPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5tYXBDYW52YXN9PlxuICAgICAgICAgICAgICAgICAge01BUF9SRUdJT05fT1JERVIubWFwKChyZWdpb25JZCkgPT4gKFxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAga2V5PXtyZWdpb25JZH1cbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2Ake3N0eWxlcy5yZWdpb25CbG9ja30gJHtzdHlsZXNbYHJlZ2lvbiR7cmVnaW9uSWR9YF19YH1cbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVNYXBTZWxlY3RSZWdpb24ocmVnaW9uSWQpfVxuICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtcbiAgICAgICAgICAgICAgICAgICAgICAgIEFycmF5LmlzQXJyYXkobWFwUmVnaW9uT3B0aW9ucykgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcFJlZ2lvbk9wdGlvbnMubGVuZ3RoID4gMCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgIW1hcFJlZ2lvbk9wdGlvbnMuaW5jbHVkZXMocmVnaW9uSWQpXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAge3JlZ2lvbklkfVxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgIHshbWFwTG9hZGluZyAmJiBtYXBTdGVwID09PSBcImdyaWRcIiAmJiAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubWFwU3RhZ2V9PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubWFwSGludH0+XG4gICAgICAgICAgICAgICAgICBSZWdpb24ge21hcFJlZ2lvbn06IGNob29zZSBhIHJvdyBhbmQgY29sdW1uXG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgeygoKSA9PiB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBkaW1zID0gZ2V0TWFwUmVnaW9uRGltZW5zaW9ucyhtYXBSZWdpb24pO1xuICAgICAgICAgICAgICAgICAgY29uc3Qgcm93cyA9IG1hcExldHRlcnMuc2xpY2UoMCwgZGltcy5yb3dzIHx8IDApO1xuICAgICAgICAgICAgICAgICAgY29uc3QgY29scyA9IG1hcE51bWJlcnMuc2xpY2UoMCwgZGltcy5jb2xzIHx8IDApO1xuICAgICAgICAgICAgICAgICAgaWYgKCFyb3dzLmxlbmd0aCB8fCAhY29scy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLm1hcEVtcHR5fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIE5vIGdyaWQgZGF0YSBmb3IgdGhpcyByZWdpb24uXG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmdyaWRXcmFwcGVyfT5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5ncmlkfVxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgXCItLWdyaWQtY29sc1wiOiBjb2xzLmxlbmd0aCB9fVxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtyb3dzLm1hcCgocm93KSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xzLm1hcCgoY29sKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2VsbEtleSA9IGAke3Jvd30tJHtjb2x9YDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBoYXNQYWxsZXRzID0gQm9vbGVhbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcENlbGxQYWxsZXRzW2NlbGxLZXldPy5sZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17Y2VsbEtleX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YCR7c3R5bGVzLmdyaWRDZWxsfSAke1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc1BhbGxldHMgPyBcIlwiIDogc3R5bGVzLmdyaWRDZWxsRGlzYWJsZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzUGFsbGV0cyAmJiBoYW5kbGVNYXBTZWxlY3RDZWxsKHJvdywgY29sKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXshaGFzUGFsbGV0c31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3Jvd31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Y29sfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0pKCl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgeyFtYXBMb2FkaW5nICYmIG1hcFN0ZXAgPT09IFwicGFsbGV0c1wiICYmIChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5tYXBTdGFnZX0+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5tYXBIaW50fT5cbiAgICAgICAgICAgICAgICAgIFJlZ2lvbiB7bWFwUmVnaW9ufSAtIFNlY3Rpb24ge21hcFJvd31cbiAgICAgICAgICAgICAgICAgIHttYXBDb2x9OiBzZWxlY3QgYSBwYWxsZXRcbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnBhbGxldEdyaWR9PlxuICAgICAgICAgICAgICAgICAgeyhtYXBDZWxsUGFsbGV0c1tgJHttYXBSb3d9LSR7bWFwQ29sfWBdIHx8IFtdKS5tYXAoXG4gICAgICAgICAgICAgICAgICAgIChwYWxsZXQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwYWxsZXRLZXkgPSBgJHttYXBSb3d9LSR7bWFwQ29sfS1QJHtwYWxsZXR9YDtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBiaW5zID0gbWFwUGFsbGV0Qmluc1twYWxsZXRLZXldIHx8IFtdO1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17cGFsbGV0fVxuICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMucGFsbGV0QnV0dG9ufVxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJpbnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVNYXBWaWV3KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVnaW9uOiBtYXBSZWdpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlY3Rpb25MZXR0ZXI6IG1hcFJvdyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VjdGlvbk51bWJlcjogbWFwQ29sLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWxsZXQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJpbjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2hvd01hcChmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZU1hcFNlbGVjdFBhbGxldChwYWxsZXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICBQYWxsZXQge3BhbGxldH1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICB7IShtYXBDZWxsUGFsbGV0c1tgJHttYXBSb3d9LSR7bWFwQ29sfWBdIHx8IFtdKS5sZW5ndGggJiYgKFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLm1hcEVtcHR5fT5cbiAgICAgICAgICAgICAgICAgICAgICBObyBwYWxsZXRzIGF2YWlsYWJsZSBoZXJlLlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgeyFtYXBMb2FkaW5nICYmIG1hcFN0ZXAgPT09IFwiYmluc1wiICYmIChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5tYXBTdGFnZX0+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5tYXBIaW50fT5cbiAgICAgICAgICAgICAgICAgIFJlZ2lvbiB7bWFwUmVnaW9ufSAtIFNlY3Rpb24ge21hcFJvd31cbiAgICAgICAgICAgICAgICAgIHttYXBDb2x9IC0gUGFsbGV0IHttYXBQYWxsZXR9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5wYWxsZXRHcmlkfT5cbiAgICAgICAgICAgICAgICAgIHsobWFwUGFsbGV0Qmluc1tgJHttYXBSb3d9LSR7bWFwQ29sfS1QJHttYXBQYWxsZXR9YF0gfHwgW10pLm1hcChcbiAgICAgICAgICAgICAgICAgICAgKGJpbikgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgIGtleT17YmlufVxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2Ake3N0eWxlcy5wYWxsZXRCdXR0b259ICR7c3R5bGVzLmJpbkJ1dHRvbn1gfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlTWFwU2VsZWN0QmluKGJpbil9XG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgQmluIHtiaW59XG4gICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICB7IShtYXBQYWxsZXRCaW5zW2Ake21hcFJvd30tJHttYXBDb2x9LVAke21hcFBhbGxldH1gXSB8fCBbXSlcbiAgICAgICAgICAgICAgICAgICAgLmxlbmd0aCAmJiAoXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubWFwRW1wdHl9PlxuICAgICAgICAgICAgICAgICAgICAgIE5vIGJpbnMgYXZhaWxhYmxlIG9uIHRoaXMgcGFsbGV0LlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L01vZGFsLkJvZHk+XG4gICAgICAgICAgPE1vZGFsLkZvb3RlciBjbGFzc05hbWU9e3N0eWxlcy5tYXBGb290ZXJ9PlxuICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICB2YXJpYW50PVwib3V0bGluZS1zZWNvbmRhcnlcIlxuICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVNYXBCYWNrfVxuICAgICAgICAgICAgICBkaXNhYmxlZD17bWFwU3RlcCA9PT0gXCJyZWdpb25zXCJ9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIEJhY2tcbiAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICB2YXJpYW50PVwib3V0bGluZS1wcmltYXJ5XCJcbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlTWFwVmlldygpfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICBWaWV3XG4gICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgIDxCdXR0b24gdmFyaWFudD1cInNlY29uZGFyeVwiIG9uQ2xpY2s9eygpID0+IHNldFNob3dNYXAoZmFsc2UpfT5cbiAgICAgICAgICAgICAgQ2xvc2VcbiAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgIDwvTW9kYWwuRm9vdGVyPlxuICAgICAgICA8L01vZGFsPlxuICAgICAgPC9kaXY+XG4gICAgPC9Mb2dnZWRJbj5cbiAgKTtcblxyXG5cclxufVxyXG5cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==