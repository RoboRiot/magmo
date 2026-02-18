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
          lineNumber: 1220,
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
          lineNumber: 1230,
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
        lineNumber: 1316,
        columnNumber: 5
      }
    }, __jsx("div", {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.filtersHeader,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1317,
        columnNumber: 7
      }
    }, __jsx("div", {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1318,
        columnNumber: 9
      }
    }, __jsx("div", {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.filtersTitle,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1319,
        columnNumber: 11
      }
    }, "Filters"), __jsx("div", {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.filtersSubtitle,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1320,
        columnNumber: 11
      }
    }, "Narrow results by machine, client, or warehouse.")), hasActiveFilters ? __jsx("span", {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.filtersBadge,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1325,
        columnNumber: 11
      }
    }, "Active") : null), __jsx("div", {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.filterSection,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1329,
        columnNumber: 7
      }
    }, __jsx("div", {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.filterSectionTitle,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1330,
        columnNumber: 9
      }
    }, "Machine"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["InputGroup"], {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.inputGroup,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1331,
        columnNumber: 9
      }
    }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["InputGroup"].Text, {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1332,
        columnNumber: 11
      }
    }, "OEM"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Dropdown"], {
      onSelect: handleSelect1,
      className: "w-100",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1333,
        columnNumber: 11
      }
    }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Dropdown"].Toggle, {
      variant: "outline-secondary",
      id: "".concat(idPrefix, "-oem"),
      className: "w-100 ".concat(_styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.inputButton),
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1334,
        columnNumber: 13
      }
    }, dropdown1Text), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Dropdown"].Menu, {
      className: "w-100",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1341,
        columnNumber: 13
      }
    }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Dropdown"].Item, {
      eventKey: "unassigned",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1342,
        columnNumber: 15
      }
    }, "Select Option"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Dropdown"].Item, {
      eventKey: "GE",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1343,
        columnNumber: 15
      }
    }, "GE"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Dropdown"].Item, {
      eventKey: "Toshiba",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1344,
        columnNumber: 15
      }
    }, "Toshiba"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Dropdown"].Item, {
      eventKey: "Siemens",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1345,
        columnNumber: 15
      }
    }, "Siemens"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Dropdown"].Item, {
      eventKey: "Philips",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1346,
        columnNumber: 15
      }
    }, "Philips")))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["InputGroup"], {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.inputGroup,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1351,
        columnNumber: 9
      }
    }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["InputGroup"].Text, {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1352,
        columnNumber: 11
      }
    }, "Modality"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Dropdown"], {
      onSelect: handleSelect2,
      className: "w-100",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1353,
        columnNumber: 11
      }
    }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Dropdown"].Toggle, {
      variant: "outline-secondary",
      id: "".concat(idPrefix, "-modality"),
      className: "w-100 ".concat(_styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.inputButton),
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1354,
        columnNumber: 13
      }
    }, dropdown2Text), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Dropdown"].Menu, {
      className: "w-100",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1361,
        columnNumber: 13
      }
    }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Dropdown"].Item, {
      eventKey: "unassigned",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1362,
        columnNumber: 15
      }
    }, "Select Option"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Dropdown"].Item, {
      eventKey: "CT",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1363,
        columnNumber: 15
      }
    }, "CT"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Dropdown"].Item, {
      eventKey: "MRI",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1364,
        columnNumber: 15
      }
    }, "MRI")))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["InputGroup"], {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.inputGroup,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1369,
        columnNumber: 9
      }
    }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["InputGroup"].Text, {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1370,
        columnNumber: 11
      }
    }, "Model"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Button"], {
      variant: "outline-secondary",
      className: "w-100 ".concat(_styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.inputButton),
      onClick: handleModelClick,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1371,
        columnNumber: 11
      }
    }, modelButtonText))), __jsx("div", {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.filterSection,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1381,
        columnNumber: 7
      }
    }, __jsx("div", {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.filterSectionTitle,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1382,
        columnNumber: 9
      }
    }, "Client"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["InputGroup"], {
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
    }, "Client From"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Button"], {
      variant: "outline-secondary",
      className: "w-100 ".concat(_styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.inputButton),
      onClick: function onClick() {
        return handleClientClick("from");
      },
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1385,
        columnNumber: 11
      }
    }, clientFromButtonText)), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["InputGroup"], {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.inputGroup,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1394,
        columnNumber: 9
      }
    }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["InputGroup"].Text, {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1395,
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
        lineNumber: 1396,
        columnNumber: 11
      }
    }, clientCurrentButtonText))), __jsx("div", {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.filterSection,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1406,
        columnNumber: 7
      }
    }, __jsx("div", {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.filterSectionTitle,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1407,
        columnNumber: 9
      }
    }, "Warehouse"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["InputGroup"], {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.inputGroup,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1408,
        columnNumber: 9
      }
    }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["InputGroup"].Text, {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1409,
        columnNumber: 11
      }
    }, "Quick"), __jsx("div", {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.buttonGroup,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1410,
        columnNumber: 11
      }
    }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Button"], {
      variant: "outline-secondary",
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.flexButton,
      onClick: handleSoCalWarehouseClick,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1411,
        columnNumber: 13
      }
    }, "SoCal Warehouse"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Button"], {
      variant: "outline-secondary",
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.flexButton,
      onClick: handleNorCalWarehouseClick,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1418,
        columnNumber: 13
      }
    }, "NorCal Warehouse"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Button"], {
      variant: "outline-secondary",
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.flexButton,
      onClick: handleWarehouseUnassignedClick,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1425,
        columnNumber: 13
      }
    }, "Unassigned")))));
  };

  return __jsx(_LoggedIn__WEBPACK_IMPORTED_MODULE_11__["default"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1440,
      columnNumber: 5
    }
  }, (isDeleting || isNavigating) && __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.loadingOverlay,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1442,
      columnNumber: 9
    }
  }, __jsx("img", {
    src: "/magmo-logo.png",
    alt: "Loading Magmo",
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.loadingLogo,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1443,
      columnNumber: 11
    }
  })), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"], {
    show: showDeleteModal,
    onHide: handleCloseDeleteModal,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1450,
      columnNumber: 7
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Header, {
    closeButton: true,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1451,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Title, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1452,
      columnNumber: 11
    }
  }, "Confirm Deletion")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Body, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1454,
      columnNumber: 9
    }
  }, "Are you sure you want to delete ", selectedItems.length, " item", selectedItems.length > 1 ? "s" : "", "?"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Footer, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1458,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Button"], {
    variant: "danger",
    onClick: handleDeleteSelected,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1459,
      columnNumber: 11
    }
  }, "Yes, delete"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Button"], {
    variant: "secondary",
    onClick: handleCloseDeleteModal,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1462,
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
      lineNumber: 1468,
      columnNumber: 7
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Header, {
    closeButton: true,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1469,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Title, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1470,
      columnNumber: 11
    }
  }, "Select ", clientSelectionType === "from" ? "Client From" : "Client Current")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Body, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1474,
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
      lineNumber: 1475,
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
      lineNumber: 1482,
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
      lineNumber: 1494,
      columnNumber: 7
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Header, {
    closeButton: true,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1495,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Title, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1496,
      columnNumber: 11
    }
  }, "Select Model")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Body, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1498,
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
      lineNumber: 1499,
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
      lineNumber: 1506,
      columnNumber: 11
    }
  }))), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.page,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1518,
      columnNumber: 7
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.pageInner,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1519,
      columnNumber: 9
    }
  }, __jsx("header", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.header,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1520,
      columnNumber: 11
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.headerLeft,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1521,
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
      lineNumber: 1522,
      columnNumber: 15
    }
  }, __jsx("span", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1528,
      columnNumber: 17
    }
  }), __jsx("span", {
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
  })), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.brand,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1532,
      columnNumber: 15
    }
  }, __jsx("img", {
    src: "/magmo-logo.png",
    alt: "Magmo",
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.brandLogo,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1533,
      columnNumber: 17
    }
  }), __jsx("div", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1538,
      columnNumber: 17
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.brandName,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1539,
      columnNumber: 19
    }
  }, "Magmo"), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.brandSub,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1540,
      columnNumber: 19
    }
  }, "Inventory Search")))), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.headerRight,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1544,
      columnNumber: 13
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.headerStatus,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1545,
      columnNumber: 15
    }
  }, hasActiveFilters ? "Filters active" : "All items"))), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.content,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1551,
      columnNumber: 11
    }
  }, __jsx("aside", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.sidebar,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1552,
      columnNumber: 13
    }
  }, renderFilters("sidebar")), __jsx("main", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.main,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1553,
      columnNumber: 13
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.tableCard,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1554,
      columnNumber: 15
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.tableHeader,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1555,
      columnNumber: 17
    }
  }, __jsx("div", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1556,
      columnNumber: 19
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.tableTitle,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1557,
      columnNumber: 21
    }
  }, "Items"), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.tableSubtitle,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1558,
      columnNumber: 21
    }
  }, isLoading ? "Loading items" : "".concat(info.length, " items on this page"))), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.tableMeta,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1562,
      columnNumber: 19
    }
  }, "Page ", page, " ", hasNextPage ? "of ".concat(totalKnownPages, "+") : "of ".concat(totalKnownPages))), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.tableBody,
    ref: tableBodyRef,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1567,
      columnNumber: 17
    }
  }, isLoading ? __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.loadingState,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1569,
      columnNumber: 21
    }
  }, __jsx("img", {
    src: "/magmo-logo.png",
    alt: "Loading Magmo",
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.loadingLogo,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1570,
      columnNumber: 23
    }
  }), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.loadingText,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1575,
      columnNumber: 23
    }
  }, "Loading")) : loadError ? __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.errorState,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1578,
      columnNumber: 21
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.errorTitle,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1579,
      columnNumber: 23
    }
  }, "Load failed (", loadError.code, ")"), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.errorMessage,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1582,
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
      lineNumber: 1583,
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
      lineNumber: 1595,
      columnNumber: 21
    }
  })), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.tableFooter,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1613,
      columnNumber: 17
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.paginationRow,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1614,
      columnNumber: 19
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Pagination"], {
    size: "sm",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1615,
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
      lineNumber: 1616,
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
      lineNumber: 1623,
      columnNumber: 23
    }
  }, "Next"))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Form"], {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.searchRow,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1631,
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
      lineNumber: 1632,
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
      lineNumber: 1640,
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
      lineNumber: 1648,
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
      lineNumber: 1656,
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
      lineNumber: 1664,
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
      lineNumber: 1672,
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
      lineNumber: 1680,
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
      lineNumber: 1688,
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
      lineNumber: 1696,
      columnNumber: 23
    }
  }, "SKU"))), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.footerActions,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1706,
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
      lineNumber: 1707,
      columnNumber: 21
    }
  }), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Button"], {
    variant: "info",
    className: "".concat(_styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.actionButton, " ").concat(_styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.mapActionButton),
    onClick: openMap,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1713,
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
      lineNumber: 1720,
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
      lineNumber: 1733,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Offcanvas"].Header, {
    closeButton: true,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1741,
      columnNumber: 11
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Offcanvas"].Title, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1742,
      columnNumber: 13
    }
  }, "Filters")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Offcanvas"].Body, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1744,
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
      lineNumber: 1747,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Header, {
    closeButton: true,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1753,
      columnNumber: 11
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Title, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1754,
      columnNumber: 13
    }
  }, "Warehouse Map")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Body, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1756,
      columnNumber: 11
    }
  }, mapLoading && __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.mapLoading,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1758,
      columnNumber: 15
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Spinner"], {
    animation: "border",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1759,
      columnNumber: 17
    }
  }), __jsx("span", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1760,
      columnNumber: 17
    }
  }, "Loading map data...")), mapError && __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.mapError,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1763,
      columnNumber: 26
    }
  }, mapError), !mapLoading && mapStep === "regions" && __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.mapStage,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1766,
      columnNumber: 15
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.mapHint,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1767,
      columnNumber: 17
    }
  }, "Select a region"), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.mapCanvas,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1768,
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
        lineNumber: 1770,
        columnNumber: 21
      }
    }, regionId);
  }))), !mapLoading && mapStep === "grid" && __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.mapStage,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1789,
      columnNumber: 15
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.mapHint,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1790,
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
          lineNumber: 1799,
          columnNumber: 23
        }
      }, "No grid data for this region.");
    }

    return __jsx("div", {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.gridWrapper,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1805,
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
        lineNumber: 1806,
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
            lineNumber: 1817,
            columnNumber: 31
          }
        }, __jsx("span", {
          __self: _this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 1828,
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
      lineNumber: 1844,
      columnNumber: 15
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.mapHint,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1845,
      columnNumber: 17
    }
  }, "Region ", mapRegion, " - Section ", mapRow, mapCol, ": select a pallet"), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.palletGrid,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1849,
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
        lineNumber: 1855,
        columnNumber: 25
      }
    }, "Pallet ", pallet);
  }), !(mapCellPallets["".concat(mapRow, "-").concat(mapCol)] || []).length && __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.mapEmpty,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1880,
      columnNumber: 21
    }
  }, "No pallets available here."))), !mapLoading && mapStep === "bins" && __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.mapStage,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1889,
      columnNumber: 15
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.mapHint,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1890,
      columnNumber: 17
    }
  }, "Region ", mapRegion, " - Section ", mapRow, mapCol, " - Pallet ", mapPallet), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.palletGrid,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1894,
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
        lineNumber: 1897,
        columnNumber: 23
      }
    }, "Bin ", bin);
  }), !(mapPalletBins["".concat(mapRow, "-").concat(mapCol, "-P").concat(mapPallet)] || []).length && __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.mapEmpty,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1909,
      columnNumber: 21
    }
  }, "No bins available on this pallet.")))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Footer, {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.mapFooter,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1917,
      columnNumber: 11
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Button"], {
    variant: "outline-secondary",
    onClick: handleMapBack,
    disabled: mapStep === "regions",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1918,
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
      lineNumber: 1925,
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
      lineNumber: 1931,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vcGFnZXMvTmV3U2VhcmNoL21haW5TZWFyY2guanMiXSwibmFtZXMiOlsiU09DQUxfQ0xJRU5UX0lEIiwiTk9SQ0FMX0NMSUVOVF9JRCIsIlVOQVNTSUdORURfQ0xJRU5UX0lEIiwiREVGQVVMVF9QQUdFX1NJWkUiLCJzaW11bGF0ZU5ldHdvcmtSZXF1ZXN0IiwiUHJvbWlzZSIsInJlc29sdmUiLCJzZXRUaW1lb3V0IiwiTG9hZGluZ0J1dHRvbiIsInR5cGUiLCJuYW1lIiwicm91dGUiLCJjbGFzc05hbWUiLCJ1c2VTdGF0ZSIsImlzTG9hZGluZyIsInNldExvYWRpbmciLCJ1c2VFZmZlY3QiLCJjYW5jZWxsZWQiLCJ0aGVuIiwidG9UaW1lIiwidmFsdWUiLCJzZWNvbmRzIiwiRGF0ZSIsInQiLCJnZXRUaW1lIiwiaXNOYU4iLCJpc28iLCJwYXJzZSIsInBhcnRzIiwic3BsaXQiLCJsZW5ndGgiLCJtbSIsImRkIiwieXl5eSIsImFsdCIsInRvWU1EIiwiZCIsImdldEZ1bGxZZWFyIiwiU3RyaW5nIiwiZ2V0TW9udGgiLCJwYWRTdGFydCIsImdldERhdGUiLCJub3JtYWxpemVUZXh0IiwidG9Mb3dlckNhc2UiLCJ0cmltIiwiZ2V0TWFjaGluZUZpZWxkIiwiaXRlbSIsImtleSIsImxvd2VyIiwibWFjaGluZURhdGEiLCJjdXJyZW50TWFjaGluZURhdGEiLCJ0aGVNYWNoaW5lRGF0YSIsIlRoZU1hY2hpbmUiLCJNYWluU2VhcmNoIiwidXNlQXV0aCIsInNpZ25PdXQiLCJpbmZvIiwic2V0SW5mbyIsImJhY2t1cEluZm8iLCJzZXRCYWNrdXBJbmZvIiwiYXVnbWVudGVkSW5mbyIsInNldEF1Z21lbnRlZEluZm8iLCJzZXRJc0xvYWRpbmciLCJpZHMiLCJzZXRJRCIsInNob3ciLCJzZXRTaG93Iiwic2hvd0ZpbHRlcnMiLCJzZXRTaG93RmlsdGVycyIsInBhZ2VTaXplIiwic2V0UGFnZVNpemUiLCJpc05hdmlnYXRpbmciLCJzZXRJc05hdmlnYXRpbmciLCJkSXRlbSIsInNldERJdGVtIiwic2VsZWN0Iiwic2V0U2VsZWN0Iiwic2hvd0xpc3QiLCJzZXRTaG93TGlzdCIsInNob3dMaXN0U2VhcmNoIiwic2V0U2hvd0xpc3RTZWFyY2giLCJzZWFyY2giLCJzZXRTZWFyY2giLCJzZWxlY3RlZE9FTSIsInNldFNlbGVjdGVkT0VNIiwic2VsZWN0ZWRNb2RhbGl0eSIsInNldFNlbGVjdGVkTW9kYWxpdHkiLCJzZWxlY3RlZENsaWVudEZyb20iLCJzZXRTZWxlY3RlZENsaWVudEZyb20iLCJjbGllbnRGcm9tQnV0dG9uVGV4dCIsInNldENsaWVudEZyb21CdXR0b25UZXh0Iiwic2VsZWN0ZWRDbGllbnRDdXJyZW50Iiwic2V0U2VsZWN0ZWRDbGllbnRDdXJyZW50IiwiY2xpZW50Q3VycmVudEJ1dHRvblRleHQiLCJzZXRDbGllbnRDdXJyZW50QnV0dG9uVGV4dCIsImNsaWVudHMiLCJzZXRDbGllbnRzIiwic2hvd0NsaWVudE1vZGFsIiwic2V0U2hvd0NsaWVudE1vZGFsIiwiY2xpZW50U2VsZWN0aW9uVHlwZSIsInNldENsaWVudFNlbGVjdGlvblR5cGUiLCJzaG93TWFwIiwic2V0U2hvd01hcCIsIm1hcFJlZ2lvbk9wdGlvbnMiLCJzZXRNYXBSZWdpb25PcHRpb25zIiwibWFwU2VjdGlvbk1hcCIsInNldE1hcFNlY3Rpb25NYXAiLCJtYXBTdGVwIiwic2V0TWFwU3RlcCIsIm1hcFJlZ2lvbiIsInNldE1hcFJlZ2lvbiIsIm1hcFJvdyIsInNldE1hcFJvdyIsIm1hcENvbCIsInNldE1hcENvbCIsIm1hcFBhbGxldCIsInNldE1hcFBhbGxldCIsIm1hcEJpbiIsInNldE1hcEJpbiIsIm1hcENlbGxQYWxsZXRzIiwic2V0TWFwQ2VsbFBhbGxldHMiLCJtYXBQYWxsZXRCaW5zIiwic2V0TWFwUGFsbGV0QmlucyIsIm1hcExvYWRpbmciLCJzZXRNYXBMb2FkaW5nIiwibWFwRXJyb3IiLCJzZXRNYXBFcnJvciIsIm1hcERpcmVjdG9yeUxvYWRlZCIsInNldE1hcERpcmVjdG9yeUxvYWRlZCIsInJvdXRlciIsInVzZVJvdXRlciIsImxhYmVsQmFzZSIsImxhYmVsQmFzZU5hbWVzIiwic29ydENoZWNrQmFzZSIsIndpdGhTb3J0SWNvbiIsImJhc2VMYWJlbHMiLCJhY3RpdmVJbmRleCIsImlzRGVzYyIsIm1hcCIsInRleHQiLCJpIiwiYXJyb3ciLCJsYWJlbHMiLCJzZXRMYWJlbHMiLCJzb3J0Q2hlY2siLCJzZXRTb3J0Q2hlY2siLCJob3ZlckluZGV4Iiwic2V0SG92ZXJJbmRleCIsInNlbGVjdGVkTW9kZWwiLCJzZXRTZWxlY3RlZE1vZGVsIiwiZ1BvcyIsInNldEdQb3MiLCJnSWRlIiwic2V0R0lkZSIsImlzRGVsZXRpbmciLCJzZXRJc0RlbGV0aW5nIiwicGFnZSIsInNldFBhZ2UiLCJwYWdlQ3Vyc29ycyIsInNldFBhZ2VDdXJzb3JzIiwiaGFzTmV4dFBhZ2UiLCJzZXRIYXNOZXh0UGFnZSIsImZldGNoU2VxIiwidXNlUmVmIiwiYmFja2ZpbGxJbkZsaWdodCIsInF1ZXJ5RXBvY2giLCJzZXRRdWVyeUVwb2NoIiwibG9hZEVycm9yIiwic2V0TG9hZEVycm9yIiwidGFibGVCb2R5UmVmIiwicm93SGVpZ2h0UmVmIiwiaGVhZGVySGVpZ2h0UmVmIiwiTE9BRF9USU1FT1VUX01TIiwibWFwTGV0dGVycyIsInVzZU1lbW8iLCJBcnJheSIsImZyb20iLCJfIiwiZnJvbUNoYXJDb2RlIiwibWFwTnVtYmVycyIsImxvYWRNYXBEaXJlY3RvcnkiLCJ1c2VDYWxsYmFjayIsImZpcmViYXNlIiwiZmlyZXN0b3JlIiwiY29sbGVjdGlvbiIsImRvYyIsImdldCIsImRhdGEiLCJSZWdpb24iLCJTZWN0aW9uIiwiY29uc29sZSIsImVycm9yIiwiZ2V0TWFwUmVnaW9uRGltZW5zaW9ucyIsInJlZ2lvbklkIiwiZW50cnkiLCJpc0FycmF5IiwiY29scyIsInBhcnNlSW50Iiwicm93cyIsIk51bWJlciIsImlzRmluaXRlIiwibG9hZE1hcEludmVudG9yeSIsIndoZXJlIiwic25hcCIsImNlbGxQYWxsZXRzIiwicGFsbGV0QmlucyIsImZvckVhY2giLCJsb2MiLCJuZXdMb2NhbEN1cnJlbnQiLCJyb3ciLCJzZWN0aW9uIiwibGV0dGVyIiwiY29sIiwibnVtYmVyIiwidHJpbW1lZCIsInNsaWNlIiwidW5kZWZpbmVkIiwicGFsbGV0IiwiYmluIiwiY2VsbEtleSIsIlNldCIsImFkZCIsInBhbGxldEtleSIsImNlbGxPYmoiLCJPYmplY3QiLCJrZXlzIiwic29ydCIsImEiLCJiIiwicGFsbGV0T2JqIiwib3Blbk1hcCIsImhhbmRsZU1hcFNlbGVjdFJlZ2lvbiIsImhhbmRsZU1hcFNlbGVjdENlbGwiLCJyb3dMZXR0ZXIiLCJjb2xOdW1iZXIiLCJoYW5kbGVNYXBTZWxlY3RQYWxsZXQiLCJwYWxsZXRJZCIsImhhbmRsZU1hcFNlbGVjdEJpbiIsImJpbklkIiwiaGFuZGxlTWFwQmFjayIsImhhbmRsZU1hcFZpZXciLCJvdmVycmlkZXMiLCJwYXJhbXMiLCJVUkxTZWFyY2hQYXJhbXMiLCJyZWdpb25WYWx1ZSIsInJlZ2lvbiIsImxldHRlclZhbHVlIiwic2VjdGlvbkxldHRlciIsIm51bWJlclZhbHVlIiwic2VjdGlvbk51bWJlciIsInBhbGxldFZhbHVlIiwiYmluVmFsdWUiLCJzZXQiLCJxdWVyeSIsInRvU3RyaW5nIiwicHVzaCIsInN0YXJ0TmFtZVRva2VuQmFja2ZpbGwiLCJyZWFzb24iLCJjdXJyZW50IiwibGFzdFJ1biIsIndpbmRvdyIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJub3ciLCJkYiIsImxhc3REb2MiLCJ0b2tlbnNFcXVhbCIsInNldEEiLCJzZXRCIiwic2l6ZSIsInYiLCJoYXMiLCJvcmRlckJ5IiwiRmllbGRQYXRoIiwiZG9jdW1lbnRJZCIsImxpbWl0Iiwic3RhcnRBZnRlciIsImVtcHR5IiwiYmF0Y2giLCJ3cml0ZXMiLCJkb2NzIiwibmFtZUxvd2VyIiwibmFtZVRva2VucyIsImJ1aWxkTmFtZVRva2VucyIsImV4aXN0aW5nVG9rZW5zIiwibmVlZHNVcGRhdGUiLCJ1cGRhdGUiLCJyZWYiLCJjb21taXQiLCJzZXRJdGVtIiwic2VhcmNoTG93ZXIiLCJoYXNBY3RpdmVGaWx0ZXJzIiwiQm9vbGVhbiIsInZhbHVlTWF0Y2hlcyIsInMiLCJzb21lIiwiaW5jbHVkZXMiLCJtYXRjaGVzRmlsdGVycyIsInZpc2libGUiLCJPRU0iLCJNb2RhbGl0eSIsIk1vZGVsIiwiY2xpZW50RnJvbUlkIiwiY2xpZW50Q3VycmVudElkIiwid2FudGVkRGF5IiwiaXRlbVlNRCIsImRhdGUiLCJkZXNjcmlwdGlvbnMiLCJ3b3JrT3JkZXJzIiwidyIsIndvIiwid29ya09yZGVyIiwicG4iLCJzbiIsImRlc2MiLCJkZXNjcmlwdGlvbiIsImlkIiwibG9jYWxTTiIsImxvY2FsX3NuIiwicmVzZXRQYWdpbmF0aW9uIiwiYXNQYXRoIiwiZmV0Y2hEYXRhIiwiZXZlbnRzIiwiaGFuZGxlRG9uZSIsIm9uIiwib2ZmIiwicmVxdWVzdGVkUGFnZSIsInNlcSIsInRpbWVkT3V0IiwidGltZW91dElkIiwiY29kZSIsIm1lc3NhZ2UiLCJNYXRoIiwicm91bmQiLCJpbnB1dFRleHQiLCJzZWxlY3RlZFR5cGUiLCJzdGFydEFmdGVyRG9jIiwiY2xlYXJUaW1lb3V0IiwiZWZmZWN0aXZlU2VsZWN0IiwiZWZmZWN0aXZlU2VhcmNoIiwiZWZmZWN0aXZlU2VhcmNoTG93ZXIiLCJsb2FkIiwiYXR0ZW1wdCIsImZldGNoUGFydHNXaXRoTWFjaGluZURhdGFQYWdlIiwidmlzaWJsZU9ubHkiLCJmaWx0ZXJGbiIsInJhdyIsIm5lZWRzTWFjaGluZURhdGEiLCJyIiwicG93IiwibmV4dFBhZ2UiLCJoYXNOYW1lU2VhcmNoIiwicHJldiIsIm5leHQiLCJzZXRTZWxlY3RlZEl0ZW1zIiwiYXVnbWVudGVkIiwiQ2xpZW50RnJvbSIsIkNsaWVudEN1cnJlbnQiLCJmaWx0ZXIiLCJzZWFyY2hDaGFuZ2VIYW5kbGVyIiwiZXZlbnQiLCJ0YXJnZXQiLCJiYXNlIiwic29ydENoZWNrQWxsIiwicG9zIiwibmV4dFNvcnRDaGVjayIsInNvcnRlZEluZm8iLCJ0YSIsInRiIiwiYXYiLCJidiIsImxvY2FsZUNvbXBhcmUiLCJhbiIsImJuIiwicm93U2VsZWN0IiwibG9nIiwic2VsZWN0ZWRJdGVtcyIsInNob3dEZWxldGVNb2RhbCIsInNldFNob3dEZWxldGVNb2RhbCIsImhhbmRsZVNlbGVjdEl0ZW0iLCJ4IiwiaGFuZGxlU2hvd0RlbGV0ZU1vZGFsIiwiaGFuZGxlQ2xvc2VEZWxldGVNb2RhbCIsImhhbmRsZURlbGV0ZVNlbGVjdGVkIiwiaXRlbUlkIiwiZGVsZXRlRnJvbVN0b3JhZ2UiLCJoYW5kbGVDbG9zZSIsImhhbmRsZVNob3ciLCJjaGVja0RlbGV0ZSIsImlkc1RvRGVsZXRlIiwicHJldmVudERlZmF1bHQiLCJzdG9wUHJvcGFnYXRpb24iLCJob3ZlclN0eWxlIiwiaW5kZXgiLCJiYWNrZ3JvdW5kQ29sb3IiLCJ0ZXh0QWxpZ24iLCJjdXJzb3IiLCJkcm9wZG93bjFUZXh0Iiwic2V0RHJvcGRvd24xVGV4dCIsImRyb3Bkb3duMlRleHQiLCJzZXREcm9wZG93bjJUZXh0IiwiaGFuZGxlU2VsZWN0MSIsImV2ZW50S2V5IiwidGV4dENvbnRlbnQiLCJoYW5kbGVTZWxlY3QyIiwiYnVpbGRDbGllbnRzRnJvbUl0ZW1zIiwiZmlsdGVyZWQiLCJpdCIsIm91dCIsImlkQXJyYXkiLCJjaHVuayIsImhhbmRsZUNsaWVudENsaWNrIiwic2FmZUNsaWVudHMiLCJmZXRjaENsaWVudHMiLCJjbGllbnRzRGF0YSIsImRlcml2ZWQiLCJzZXRDbGllbnRTZWFyY2hUZXJtIiwiaGFuZGxlQ2xpZW50U2VsZWN0IiwiY2xpZW50SWQiLCJjbGllbnRTbmFwIiwiZXhpc3RzIiwiY2xpZW50RGF0YSIsImhhbmRsZUNsaWVudEluZm8iLCJjbGllbnROYW1lIiwiaGFuZGxlQ2xlYXJDbGllbnRTZWxlY3Rpb24iLCJtb2RlbHMiLCJzZXRNb2RlbHMiLCJzaG93TW9kZWxNb2RhbCIsInNldFNob3dNb2RlbE1vZGFsIiwibW9kZWxCdXR0b25UZXh0Iiwic2V0TW9kZWxCdXR0b25UZXh0IiwiaGFuZGxlTW9kZWxDbGljayIsImZldGNoTW9kZWxzIiwibW9kZWxzRGF0YSIsInNldE1vZGVsU2VhcmNoVGVybSIsImhhbmRsZU1vZGVsU2VsZWN0IiwibW9kZWxOYW1lIiwiaGFuZGxlQ2xlYXJNb2RlbFNlbGVjdGlvbiIsImhhbmRsZVNvQ2FsV2FyZWhvdXNlQ2xpY2siLCJoYW5kbGVOb3JDYWxXYXJlaG91c2VDbGljayIsImhhbmRsZVdhcmVob3VzZVVuYXNzaWduZWRDbGljayIsImNsaWVudFNlYXJjaFRlcm0iLCJtb2RlbFNlYXJjaFRlcm0iLCJzdG9yYWdlUmVmIiwic3RvcmFnZSIsImZvbGRlclJlZiIsImNoaWxkIiwibGlzdEFsbCIsImxpc3RSZXN1bHQiLCJkZWxldGVQcm9taXNlcyIsIml0ZW1zIiwiYWxsIiwiZGVsZXRlRnJvbVBhcnRzQ29sbGVjdGlvbiIsInRvdGFsS25vd25QYWdlcyIsIm1heCIsInBhZ2VCdXR0b25zIiwiYnV0dG9ucyIsIm1heFZpc2libGUiLCJwdXNoUGFnZSIsInAiLCJwdXNoRWxsaXBzaXMiLCJzdGFydCIsImVuZCIsIm1pbiIsImRlc2lyZWRXaW5kb3ciLCJjdXJyZW50V2luZG93IiwicmVtYWluaW5nIiwicmVjYWxjUGFnZVNpemUiLCJjb250YWluZXJIZWlnaHQiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJoZWlnaHQiLCJoZWFkZXJSb3ciLCJxdWVyeVNlbGVjdG9yIiwiYm9keVJvdyIsImgiLCJ2ZXJ0aWNhbFBhZGRpbmciLCJhdmFpbGFibGUiLCJlc3RpbWF0ZWQiLCJmbG9vciIsImNsYW1wZWQiLCJvblJlc2l6ZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwicmVuZGVyRmlsdGVycyIsImlkUHJlZml4Iiwic3R5bGVzIiwiZmlsdGVyc1BhbmVsIiwiZmlsdGVyc0hlYWRlciIsImZpbHRlcnNUaXRsZSIsImZpbHRlcnNTdWJ0aXRsZSIsImZpbHRlcnNCYWRnZSIsImZpbHRlclNlY3Rpb24iLCJmaWx0ZXJTZWN0aW9uVGl0bGUiLCJpbnB1dEdyb3VwIiwiaW5wdXRCdXR0b24iLCJidXR0b25Hcm91cCIsImZsZXhCdXR0b24iLCJsb2FkaW5nT3ZlcmxheSIsImxvYWRpbmdMb2dvIiwiZSIsImNsaWVudCIsIm1vZGVsIiwicGFnZUlubmVyIiwiaGVhZGVyIiwiaGVhZGVyTGVmdCIsImJ1cmdlciIsImJyYW5kIiwiYnJhbmRMb2dvIiwiYnJhbmROYW1lIiwiYnJhbmRTdWIiLCJoZWFkZXJSaWdodCIsImhlYWRlclN0YXR1cyIsImNvbnRlbnQiLCJzaWRlYmFyIiwibWFpbiIsInRhYmxlQ2FyZCIsInRhYmxlSGVhZGVyIiwidGFibGVUaXRsZSIsInRhYmxlU3VidGl0bGUiLCJ0YWJsZU1ldGEiLCJ0YWJsZUJvZHkiLCJsb2FkaW5nU3RhdGUiLCJsb2FkaW5nVGV4dCIsImVycm9yU3RhdGUiLCJlcnJvclRpdGxlIiwiZXJyb3JNZXNzYWdlIiwidGFibGVGb290ZXIiLCJwYWdpbmF0aW9uUm93Iiwic2VhcmNoUm93Iiwic2VhcmNoSW5wdXQiLCJzZWFyY2hTZWxlY3QiLCJmb290ZXJBY3Rpb25zIiwiYWN0aW9uQnV0dG9uIiwibWFwQWN0aW9uQnV0dG9uIiwiZmlsdGVyc0RyYXdlciIsIm1hcFN0YWdlIiwibWFwSGludCIsIm1hcENhbnZhcyIsIk1BUF9SRUdJT05fT1JERVIiLCJyZWdpb25CbG9jayIsImRpbXMiLCJtYXBFbXB0eSIsImdyaWRXcmFwcGVyIiwiZ3JpZCIsImhhc1BhbGxldHMiLCJncmlkQ2VsbCIsImdyaWRDZWxsRGlzYWJsZWQiLCJwYWxsZXRHcmlkIiwiYmlucyIsInBhbGxldEJ1dHRvbiIsImJpbkJ1dHRvbiIsIm1hcEZvb3RlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQVlBO0FBQ0E7QUFDQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FB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QUNrRSxTQUFoQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0UsTUFBQyxzREFBRDtBQUNFLFdBQU8sRUFBQyxtQkFEVjtBQUVFLFdBQU8sRUFBRXhULGFBRlg7QUFHRSxZQUFRLEVBQUVwSSxPQUFPLEtBQUssU0FIeEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQURGLEVBUUUsTUFBQyxzREFBRDtBQUNFLFdBQU8sRUFBQyxpQkFEVjtBQUVFLFdBQU8sRUFBRTtBQUFBLGFBQU1xSSxhQUFhLEVBQW5CO0FBQUEsS0FGWDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFlBUkYsRUFjRSxNQUFDLHNEQUFEO0FBQVEsV0FBTyxFQUFDLFdBQWhCO0FBQTRCLFdBQU8sRUFBRTtBQUFBLGFBQU0xSSxVQUFVLENBQUMsS0FBRCxDQUFoQjtBQUFBLEtBQXJDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFkRixDQTFLRixDQXJPRixDQTlFRixDQURGO0FBc2ZEOztJQXh3RHVCakQsVTtVQUNGQyxpRSxFQTBDTDRFLHFEOzs7TUEzQ083RSxVIiwiZmlsZSI6InN0YXRpYy93ZWJwYWNrL3BhZ2VzL05ld1NlYXJjaC9tYWluU2VhcmNoLjY4NWE5ZGZmYTAyNGYwZWZlZGQ2LmhvdC11cGRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSwgdXNlUmVmLCB1c2VDYWxsYmFjaywgdXNlTWVtbyB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHtcbiAgSW5wdXRHcm91cCxcbiAgRHJvcGRvd24sXG4gIEZvcm1Db250cm9sLFxuICBCdXR0b24sXG4gIE5hdkRyb3Bkb3duLFxuICBGb3JtLFxuICBNb2RhbCxcbiAgUGFnaW5hdGlvbixcbiAgU3Bpbm5lcixcbiAgT2ZmY2FudmFzLFxufSBmcm9tIFwicmVhY3QtYm9vdHN0cmFwXCI7XG5pbXBvcnQgTGluayBmcm9tIFwibmV4dC9saW5rXCI7XG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tIFwibmV4dC9yb3V0ZXJcIjtcbmltcG9ydCB7XG4gIGZldGNoUGFydHNXaXRoTWFjaGluZURhdGFQYWdlLFxuICBmZXRjaENsaWVudHMsXG4gIGZldGNoTW9kZWxzLFxufSBmcm9tIFwiLi4vLi4vdXRpbHMvZmV0Y2hBc3NvY2lhdGlvbnNcIjtcbmltcG9ydCB7IHVzZUF1dGggfSBmcm9tIFwiLi4vLi4vY29udGV4dC9BdXRoVXNlckNvbnRleHRcIjtcclxuaW1wb3J0IExvZ2dlZEluIGZyb20gXCIuLi9Mb2dnZWRJblwiO1xyXG5pbXBvcnQgQ2xpZW50VGFibGUgZnJvbSBcIi4uLy4uL3V0aWxzL0NsaWVudFRhYmxlXCI7XHJcbmltcG9ydCBNb2RlbFRhYmxlIGZyb20gXCIuLi8uLi91dGlscy9Nb2RlbFRhYmxlXCI7XHJcbmltcG9ydCBQYXJ0VGFibGUgZnJvbSBcIi4uLy4uL3V0aWxzL1BhcnRUYWJsZVwiO1xuaW1wb3J0IHN0eWxlcyBmcm9tIFwiLi4vLi4vc3R5bGVzL01haW5TZWFyY2gubW9kdWxlLmNzc1wiO1xuaW1wb3J0IGZpcmViYXNlIGZyb20gXCIuLi8uLi9jb250ZXh0L0ZpcmViYXNlXCI7XG5pbXBvcnQgeyBidWlsZE5hbWVUb2tlbnMgfSBmcm9tIFwiLi4vLi4vdXRpbHMvaXRlbUZvcm1TaGFyZWRcIjtcblxyXG4vLyBQcmVkZWZpbmVkIHdhcmVob3VzZSBjbGllbnQgSURzIGFuZCBkaXNwbGF5IG5hbWVzXHJcbmNvbnN0IFNPQ0FMX0NMSUVOVF9JRCA9IFwiQUlTMTcxODJcIjtcclxuY29uc3QgTk9SQ0FMX0NMSUVOVF9JRCA9IFwiQUlTMjUwOTdcIjtcbmNvbnN0IFVOQVNTSUdORURfQ0xJRU5UX0lEID0gXCJBSVMwMDQwNFwiO1xuY29uc3QgREVGQVVMVF9QQUdFX1NJWkUgPSAyNTtcblxyXG5cclxuLy8gU2ltdWxhdGVzIGEgbmV0d29yayByZXF1ZXN0IGRlbGF5XHJcbmZ1bmN0aW9uIHNpbXVsYXRlTmV0d29ya1JlcXVlc3QoKSB7XHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIDIwMDApKTtcclxufVxyXG5cclxuLy8gQ3VzdG9tIExvYWRpbmdCdXR0b24gY29tcG9uZW50XHJcbmZ1bmN0aW9uIExvYWRpbmdCdXR0b24oeyB0eXBlLCBuYW1lLCByb3V0ZSwgY2xhc3NOYW1lIH0pIHtcbiAgY29uc3QgW2lzTG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoaXNMb2FkaW5nKSB7XG4gICAgICBsZXQgY2FuY2VsbGVkID0gZmFsc2U7XG4gICAgICBzaW11bGF0ZU5ldHdvcmtSZXF1ZXN0KCkudGhlbigoKSA9PiB7XG4gICAgICAgIGlmICghY2FuY2VsbGVkKSBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgY2FuY2VsbGVkID0gdHJ1ZTtcbiAgICAgIH07XG4gICAgfVxuICB9LCBbaXNMb2FkaW5nXSk7XG5cclxuICByZXR1cm4gKFxuICAgIDxMaW5rIGhyZWY9e2AvJHtyb3V0ZX1gfT5cbiAgICAgIDxhXG4gICAgICAgIGNsYXNzTmFtZT17YGJ0biBidG4tJHt0eXBlfSAke2NsYXNzTmFtZSB8fCBcIlwifWB9XG4gICAgICAgIGRpc2FibGVkPXtpc0xvYWRpbmd9XG4gICAgICAgIG9uQ2xpY2s9eygpID0+ICFpc0xvYWRpbmcgJiYgc2V0TG9hZGluZyh0cnVlKX1cbiAgICAgID5cbiAgICAgICAge2lzTG9hZGluZyA/IFwiTG9hZGluZ+KAplwiIDogbmFtZX1cclxuICAgICAgPC9hPlxyXG4gICAgPC9MaW5rPlxyXG4gICk7XHJcbn1cclxuXHJcbi8vIC0tLS0gREFURSBIRUxQRVJTICh0b3AtbGV2ZWwgc2NvcGUpIC0tLS1cclxuXHJcbi8vIENvbnZlcnQgYW55dGhpbmcgZGF0ZS1pc2ggaW50byBhIHRpbWVzdGFtcCAobXMgc2luY2UgZXBvY2gpLlxyXG5mdW5jdGlvbiB0b1RpbWUodmFsdWUpIHtcclxuICBpZiAoIXZhbHVlKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgLy8gRmlyZXN0b3JlIFRpbWVzdGFtcCB7IHNlY29uZHMsIG5hbm9zZWNvbmRzIH1cclxuICBpZiAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmIHZhbHVlICE9PSBudWxsICYmIHZhbHVlLnNlY29uZHMgIT0gbnVsbCkge1xyXG4gICAgdHJ5IHsgcmV0dXJuIHZhbHVlLnNlY29uZHMgKiAxMDAwOyB9IGNhdGNoIHsgLyogaWdub3JlICovIH1cclxuICB9XHJcblxyXG4gIC8vIE5hdGl2ZSBEYXRlXHJcbiAgaWYgKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkge1xyXG4gICAgY29uc3QgdCA9IHZhbHVlLmdldFRpbWUoKTtcclxuICAgIHJldHVybiBpc05hTih0KSA/IG51bGwgOiB0O1xyXG4gIH1cclxuXHJcbiAgLy8gU3RyaW5nc1xyXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpIHtcclxuICAgIC8vIElTTyAvIHl5eXktbW0tZGRcclxuICAgIGNvbnN0IGlzbyA9IERhdGUucGFyc2UodmFsdWUpO1xyXG4gICAgaWYgKCFpc05hTihpc28pKSByZXR1cm4gaXNvO1xyXG5cclxuICAgIC8vIG1tL2RkL3l5eXlcclxuICAgIGNvbnN0IHBhcnRzID0gdmFsdWUuc3BsaXQoXCIvXCIpO1xyXG4gICAgaWYgKHBhcnRzLmxlbmd0aCA9PT0gMykge1xyXG4gICAgICBjb25zdCBbbW0sIGRkLCB5eXl5XSA9IHBhcnRzO1xyXG4gICAgICBjb25zdCBhbHQgPSBEYXRlLnBhcnNlKGAke3l5eXl9LSR7bW19LSR7ZGR9YCk7XHJcbiAgICAgIGlmICghaXNOYU4oYWx0KSkgcmV0dXJuIGFsdDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIExhc3QgcmVzb3J0XHJcbiAgY29uc3QgdCA9IERhdGUucGFyc2UodmFsdWUpO1xyXG4gIHJldHVybiBpc05hTih0KSA/IG51bGwgOiB0O1xyXG59XHJcblxyXG4vLyBDYW5vbmljYWxpemUgdG8gJ3l5eXktbW0tZGQnIChtYXRjaGVzIDxpbnB1dCB0eXBlPVwiZGF0ZVwiPilcclxuZnVuY3Rpb24gdG9ZTUQodmFsdWUpIHtcbiAgY29uc3QgdCA9IHRvVGltZSh2YWx1ZSk7XG4gIGlmICh0ID09IG51bGwpIHJldHVybiBudWxsO1xuICBjb25zdCBkID0gbmV3IERhdGUodCk7XG4gIGNvbnN0IHl5eXkgPSBkLmdldEZ1bGxZZWFyKCk7XG4gIGNvbnN0IG1tID0gU3RyaW5nKGQuZ2V0TW9udGgoKSArIDEpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcbiAgY29uc3QgZGQgPSBTdHJpbmcoZC5nZXREYXRlKCkpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcbiAgcmV0dXJuIGAke3l5eXl9LSR7bW19LSR7ZGR9YDtcbn1cblxuZnVuY3Rpb24gbm9ybWFsaXplVGV4dCh2YWx1ZSkge1xuICBpZiAodmFsdWUgPT0gbnVsbCkgcmV0dXJuIFwiXCI7XG4gIHJldHVybiBTdHJpbmcodmFsdWUpLnRvTG93ZXJDYXNlKCkudHJpbSgpO1xufVxuXG5mdW5jdGlvbiBnZXRNYWNoaW5lRmllbGQoaXRlbSwga2V5KSB7XG4gIGlmICghaXRlbSkgcmV0dXJuIG51bGw7XG4gIGNvbnN0IGxvd2VyID0ga2V5LnRvTG93ZXJDYXNlKCk7XG4gIHJldHVybiAoXG4gICAgaXRlbT8ubWFjaGluZURhdGE/LltrZXldID8/XG4gICAgaXRlbT8ubWFjaGluZURhdGE/Lltsb3dlcl0gPz9cbiAgICBpdGVtPy5jdXJyZW50TWFjaGluZURhdGE/LltrZXldID8/XG4gICAgaXRlbT8uY3VycmVudE1hY2hpbmVEYXRhPy5bbG93ZXJdID8/XG4gICAgaXRlbT8udGhlTWFjaGluZURhdGE/LltrZXldID8/XG4gICAgaXRlbT8udGhlTWFjaGluZURhdGE/Lltsb3dlcl0gPz9cbiAgICBpdGVtPy5UaGVNYWNoaW5lPy5ba2V5XSA/P1xuICAgIGl0ZW0/LlRoZU1hY2hpbmU/Lltsb3dlcl0gPz9cbiAgICBudWxsXG4gICk7XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTWFpblNlYXJjaCgpIHtcbiAgY29uc3QgeyBzaWduT3V0IH0gPSB1c2VBdXRoKCk7XHJcbiAgY29uc3QgW2luZm8sIHNldEluZm9dID0gdXNlU3RhdGUoW10pO1xyXG4gIGNvbnN0IFtiYWNrdXBJbmZvLCBzZXRCYWNrdXBJbmZvXSA9IHVzZVN0YXRlKFtdKTtcclxuICBjb25zdCBbYXVnbWVudGVkSW5mbywgc2V0QXVnbWVudGVkSW5mb10gPSB1c2VTdGF0ZShbXSk7IC8vIGl0ZW1zIHdpdGggY2xpZW50RnJvbUlkL2N1cnJlbnRJZCBhZGRlZFxyXG4gIGNvbnN0IFtpc0xvYWRpbmcsIHNldElzTG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcclxuICBjb25zdCBbaWRzLCBzZXRJRF0gPSB1c2VTdGF0ZShbXSk7XG4gIGNvbnN0IFtzaG93LCBzZXRTaG93XSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3Nob3dGaWx0ZXJzLCBzZXRTaG93RmlsdGVyc10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtwYWdlU2l6ZSwgc2V0UGFnZVNpemVdID0gdXNlU3RhdGUoREVGQVVMVF9QQUdFX1NJWkUpO1xuICBjb25zdCBbaXNOYXZpZ2F0aW5nLCBzZXRJc05hdmlnYXRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbZEl0ZW0sIHNldERJdGVtXSA9IHVzZVN0YXRlKCk7XHJcbiAgY29uc3QgW3NlbGVjdCwgc2V0U2VsZWN0XSA9IHVzZVN0YXRlKFwiTmFtZVwiKTtcclxuICBjb25zdCBbc2hvd0xpc3QsIHNldFNob3dMaXN0XSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbc2hvd0xpc3RTZWFyY2gsIHNldFNob3dMaXN0U2VhcmNoXSA9IHVzZVN0YXRlKFwidGV4dFwiKTtcclxuICBjb25zdCBbc2VhcmNoLCBzZXRTZWFyY2hdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW3NlbGVjdGVkT0VNLCBzZXRTZWxlY3RlZE9FTV0gPSB1c2VTdGF0ZShudWxsKTtcclxuICBjb25zdCBbc2VsZWN0ZWRNb2RhbGl0eSwgc2V0U2VsZWN0ZWRNb2RhbGl0eV0gPSB1c2VTdGF0ZShudWxsKTtcclxuICAvLyBSZXBsYWNlIHRoZSBvbGQgc2luZ2xlIGNsaWVudCBzdGF0ZSB3aXRoIHR3byBzZXRzOlxyXG4gIGNvbnN0IFtzZWxlY3RlZENsaWVudEZyb20sIHNldFNlbGVjdGVkQ2xpZW50RnJvbV0gPSB1c2VTdGF0ZShudWxsKTtcclxuICBjb25zdCBbY2xpZW50RnJvbUJ1dHRvblRleHQsIHNldENsaWVudEZyb21CdXR0b25UZXh0XSA9IHVzZVN0YXRlKFwiU2VsZWN0IE9wdGlvblwiKTtcclxuICBjb25zdCBbc2VsZWN0ZWRDbGllbnRDdXJyZW50LCBzZXRTZWxlY3RlZENsaWVudEN1cnJlbnRdID0gdXNlU3RhdGUobnVsbCk7XHJcbiAgY29uc3QgW2NsaWVudEN1cnJlbnRCdXR0b25UZXh0LCBzZXRDbGllbnRDdXJyZW50QnV0dG9uVGV4dF0gPSB1c2VTdGF0ZShcIlNlbGVjdCBPcHRpb25cIik7XHJcblxyXG4gIGNvbnN0IFtjbGllbnRzLCBzZXRDbGllbnRzXSA9IHVzZVN0YXRlKFtdKTtcbiAgY29uc3QgW3Nob3dDbGllbnRNb2RhbCwgc2V0U2hvd0NsaWVudE1vZGFsXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgLy8gVGhpcyBzdGF0ZSB0ZWxscyB0aGUgbW9kYWwgd2hpY2ggY2xpZW50IGJveCBpcyBiZWluZyB1cGRhdGVkOiBcImZyb21cIiBvciBcImN1cnJlbnRcIlxuICBjb25zdCBbY2xpZW50U2VsZWN0aW9uVHlwZSwgc2V0Q2xpZW50U2VsZWN0aW9uVHlwZV0gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW3Nob3dNYXAsIHNldFNob3dNYXBdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbbWFwUmVnaW9uT3B0aW9ucywgc2V0TWFwUmVnaW9uT3B0aW9uc10gPSB1c2VTdGF0ZShbXSk7XG4gIGNvbnN0IFttYXBTZWN0aW9uTWFwLCBzZXRNYXBTZWN0aW9uTWFwXSA9IHVzZVN0YXRlKHt9KTtcbiAgY29uc3QgW21hcFN0ZXAsIHNldE1hcFN0ZXBdID0gdXNlU3RhdGUoXCJyZWdpb25zXCIpO1xuICBjb25zdCBbbWFwUmVnaW9uLCBzZXRNYXBSZWdpb25dID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFttYXBSb3csIHNldE1hcFJvd10gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW21hcENvbCwgc2V0TWFwQ29sXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbbWFwUGFsbGV0LCBzZXRNYXBQYWxsZXRdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFttYXBCaW4sIHNldE1hcEJpbl0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW21hcENlbGxQYWxsZXRzLCBzZXRNYXBDZWxsUGFsbGV0c10gPSB1c2VTdGF0ZSh7fSk7XG4gIGNvbnN0IFttYXBQYWxsZXRCaW5zLCBzZXRNYXBQYWxsZXRCaW5zXSA9IHVzZVN0YXRlKHt9KTtcbiAgY29uc3QgW21hcExvYWRpbmcsIHNldE1hcExvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbbWFwRXJyb3IsIHNldE1hcEVycm9yXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbbWFwRGlyZWN0b3J5TG9hZGVkLCBzZXRNYXBEaXJlY3RvcnlMb2FkZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xuXHJcbiAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XHJcbiAgY29uc3QgbGFiZWxCYXNlID0gW1wibmFtZVwiLCBcImRhdGVcIiwgXCJ3L29cIiwgXCJwL25cIiwgXCJzL25cIl07XHJcbiAgY29uc3QgbGFiZWxCYXNlTmFtZXMgPSBbXCJuYW1lXCIsIFwiZGF0ZVwiLCBcIndvXCIsIFwicG5cIiwgXCJzblwiXTtcclxuICBjb25zdCBzb3J0Q2hlY2tCYXNlID0gW2ZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2VdO1xyXG5cclxuICBmdW5jdGlvbiB3aXRoU29ydEljb24oYmFzZUxhYmVscywgYWN0aXZlSW5kZXgsIGlzRGVzYykge1xyXG4gICAgcmV0dXJuIGJhc2VMYWJlbHMubWFwKCh0ZXh0LCBpKSA9PiB7XHJcbiAgICAgIGlmIChpICE9PSBhY3RpdmVJbmRleCkgcmV0dXJuIHRleHQ7IC8vIHVudG91Y2hlZFxyXG4gICAgICBjb25zdCBhcnJvdyA9IGlzRGVzYyA/IFwiIOKWvFwiIDogXCIg4payXCI7XHJcbiAgICAgIHJldHVybiBgJHt0ZXh0fSR7YXJyb3d9YDtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcblxyXG4gIGNvbnN0IFtsYWJlbHMsIHNldExhYmVsc10gPSB1c2VTdGF0ZShsYWJlbEJhc2UpO1xyXG4gIGNvbnN0IFtzb3J0Q2hlY2ssIHNldFNvcnRDaGVja10gPSB1c2VTdGF0ZShzb3J0Q2hlY2tCYXNlKTtcclxuICBjb25zdCBbaG92ZXJJbmRleCwgc2V0SG92ZXJJbmRleF0gPSB1c2VTdGF0ZShudWxsKTtcclxuICBjb25zdCBbc2VsZWN0ZWRNb2RlbCwgc2V0U2VsZWN0ZWRNb2RlbF0gPSB1c2VTdGF0ZShudWxsKTtcclxuICBjb25zdCBbZ1Bvcywgc2V0R1Bvc10gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW2dJZGUsIHNldEdJZGVdID0gdXNlU3RhdGUobnVsbCk7XG4gIGNvbnN0IFtpc0RlbGV0aW5nLCBzZXRJc0RlbGV0aW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3BhZ2UsIHNldFBhZ2VdID0gdXNlU3RhdGUoMSk7XG4gIGNvbnN0IFtwYWdlQ3Vyc29ycywgc2V0UGFnZUN1cnNvcnNdID0gdXNlU3RhdGUoW10pO1xuICBjb25zdCBbaGFzTmV4dFBhZ2UsIHNldEhhc05leHRQYWdlXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgZmV0Y2hTZXEgPSB1c2VSZWYoMCk7XG4gIGNvbnN0IGJhY2tmaWxsSW5GbGlnaHQgPSB1c2VSZWYoZmFsc2UpO1xuICBjb25zdCBbcXVlcnlFcG9jaCwgc2V0UXVlcnlFcG9jaF0gPSB1c2VTdGF0ZSgwKTtcbiAgY29uc3QgW2xvYWRFcnJvciwgc2V0TG9hZEVycm9yXSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCB0YWJsZUJvZHlSZWYgPSB1c2VSZWYobnVsbCk7XG4gIGNvbnN0IHJvd0hlaWdodFJlZiA9IHVzZVJlZig0Nik7XG4gIGNvbnN0IGhlYWRlckhlaWdodFJlZiA9IHVzZVJlZigzOCk7XG5cbiAgY29uc3QgTE9BRF9USU1FT1VUX01TID0gMzAwMDA7XG4gIGNvbnN0IG1hcExldHRlcnMgPSB1c2VNZW1vKFxuICAgICgpID0+IEFycmF5LmZyb20oeyBsZW5ndGg6IDI2IH0sIChfLCBpKSA9PiBTdHJpbmcuZnJvbUNoYXJDb2RlKDY1ICsgaSkpLFxuICAgIFtdXG4gICk7XG4gIGNvbnN0IG1hcE51bWJlcnMgPSB1c2VNZW1vKFxuICAgICgpID0+IEFycmF5LmZyb20oeyBsZW5ndGg6IDUwIH0sIChfLCBpKSA9PiBpICsgMSksXG4gICAgW11cbiAgKTtcblxuICBjb25zdCBsb2FkTWFwRGlyZWN0b3J5ID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xuICAgIGlmIChtYXBEaXJlY3RvcnlMb2FkZWQpIHJldHVybjtcbiAgICB0cnkge1xuICAgICAgY29uc3QgZG9jID0gYXdhaXQgZmlyZWJhc2VcbiAgICAgICAgLmZpcmVzdG9yZSgpXG4gICAgICAgIC5jb2xsZWN0aW9uKFwiV2FyZWhvdXNlXCIpXG4gICAgICAgIC5kb2MoXCJkaXJlY3RvcnlcIilcbiAgICAgICAgLmdldCgpO1xuICAgICAgY29uc3QgZGF0YSA9IGRvYy5kYXRhKCkgfHwge307XG4gICAgICBzZXRNYXBSZWdpb25PcHRpb25zKGRhdGEuUmVnaW9uIHx8IFtdKTtcbiAgICAgIHNldE1hcFNlY3Rpb25NYXAoZGF0YS5TZWN0aW9uIHx8IHt9KTtcbiAgICAgIHNldE1hcERpcmVjdG9yeUxvYWRlZCh0cnVlKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byBsb2FkIG1hcCBkaXJlY3RvcnlcIiwgZXJyb3IpO1xuICAgICAgc2V0TWFwRXJyb3IoXCJGYWlsZWQgdG8gbG9hZCB3YXJlaG91c2UgZGlyZWN0b3J5LlwiKTtcbiAgICB9XG4gIH0sIFttYXBEaXJlY3RvcnlMb2FkZWRdKTtcblxuICBjb25zdCBnZXRNYXBSZWdpb25EaW1lbnNpb25zID0gdXNlQ2FsbGJhY2soXG4gICAgKHJlZ2lvbklkKSA9PiB7XG4gICAgICBjb25zdCBlbnRyeSA9IG1hcFNlY3Rpb25NYXA/LltyZWdpb25JZF07XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShlbnRyeSkgJiYgZW50cnkubGVuZ3RoID49IDIpIHtcbiAgICAgICAgY29uc3QgY29scyA9IHBhcnNlSW50KGVudHJ5WzBdLCAxMCk7XG4gICAgICAgIGNvbnN0IHJvd3MgPSBwYXJzZUludChlbnRyeVsxXSwgMTApO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGNvbHM6IE51bWJlci5pc0Zpbml0ZShjb2xzKSA/IGNvbHMgOiAwLFxuICAgICAgICAgIHJvd3M6IE51bWJlci5pc0Zpbml0ZShyb3dzKSA/IHJvd3MgOiAwLFxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHsgY29sczogMCwgcm93czogMCB9O1xuICAgIH0sXG4gICAgW21hcFNlY3Rpb25NYXBdXG4gICk7XG5cbiAgY29uc3QgbG9hZE1hcEludmVudG9yeSA9IHVzZUNhbGxiYWNrKGFzeW5jIChyZWdpb25JZCkgPT4ge1xuICAgIGlmICghcmVnaW9uSWQpIHJldHVybjtcbiAgICBzZXRNYXBMb2FkaW5nKHRydWUpO1xuICAgIHNldE1hcEVycm9yKFwiXCIpO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBzbmFwID0gYXdhaXQgZmlyZWJhc2VcbiAgICAgICAgLmZpcmVzdG9yZSgpXG4gICAgICAgIC5jb2xsZWN0aW9uKFwiVGVzdFwiKVxuICAgICAgICAud2hlcmUoXCJuZXdMb2NhbEN1cnJlbnQucmVnaW9uXCIsIFwiPT1cIiwgcmVnaW9uSWQpXG4gICAgICAgIC5nZXQoKTtcblxuICAgICAgY29uc3QgY2VsbFBhbGxldHMgPSB7fTtcbiAgICAgIGNvbnN0IHBhbGxldEJpbnMgPSB7fTtcbiAgICAgIHNuYXAuZm9yRWFjaCgoZG9jKSA9PiB7XG4gICAgICAgIGNvbnN0IGxvYyA9IGRvYy5kYXRhKCk/Lm5ld0xvY2FsQ3VycmVudCB8fCB7fTtcbiAgICAgICAgbGV0IHJvdyA9IGxvYy5zZWN0aW9uPy5sZXR0ZXI7XG4gICAgICAgIGxldCBjb2wgPSBsb2Muc2VjdGlvbj8ubnVtYmVyO1xuICAgICAgICBpZiAoKCFyb3cgfHwgIWNvbCkgJiYgdHlwZW9mIGxvYy5zZWN0aW9uID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgY29uc3QgdHJpbW1lZCA9IGxvYy5zZWN0aW9uLnRyaW0oKTtcbiAgICAgICAgICByb3cgPSB0cmltbWVkLnNsaWNlKDAsIDEpO1xuICAgICAgICAgIGNvbCA9IHRyaW1tZWQuc2xpY2UoMSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbCAhPT0gdW5kZWZpbmVkICYmIGNvbCAhPT0gbnVsbCkge1xuICAgICAgICAgIGNvbCA9IFN0cmluZyhjb2wpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBhbGxldCA9IGxvYy5wYWxsZXQ7XG4gICAgICAgIGNvbnN0IGJpbiA9IGxvYy5iaW47XG4gICAgICAgIGlmICghcm93IHx8ICFjb2wpIHJldHVybjtcbiAgICAgICAgY29uc3QgY2VsbEtleSA9IGAke3Jvd30tJHtjb2x9YDtcbiAgICAgICAgaWYgKHBhbGxldCAhPT0gdW5kZWZpbmVkICYmIHBhbGxldCAhPT0gbnVsbCAmJiBgJHtwYWxsZXR9YCAhPT0gXCJcIikge1xuICAgICAgICAgIGlmICghY2VsbFBhbGxldHNbY2VsbEtleV0pIGNlbGxQYWxsZXRzW2NlbGxLZXldID0gbmV3IFNldCgpO1xuICAgICAgICAgIGNlbGxQYWxsZXRzW2NlbGxLZXldLmFkZChTdHJpbmcocGFsbGV0KSk7XG4gICAgICAgICAgaWYgKGJpbiAhPT0gdW5kZWZpbmVkICYmIGJpbiAhPT0gbnVsbCAmJiBgJHtiaW59YCAhPT0gXCJcIikge1xuICAgICAgICAgICAgY29uc3QgcGFsbGV0S2V5ID0gYCR7Y2VsbEtleX0tUCR7cGFsbGV0fWA7XG4gICAgICAgICAgICBpZiAoIXBhbGxldEJpbnNbcGFsbGV0S2V5XSkgcGFsbGV0Qmluc1twYWxsZXRLZXldID0gbmV3IFNldCgpO1xuICAgICAgICAgICAgcGFsbGV0Qmluc1twYWxsZXRLZXldLmFkZChTdHJpbmcoYmluKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgY29uc3QgY2VsbE9iaiA9IHt9O1xuICAgICAgT2JqZWN0LmtleXMoY2VsbFBhbGxldHMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICBjZWxsT2JqW2tleV0gPSBBcnJheS5mcm9tKGNlbGxQYWxsZXRzW2tleV0pLnNvcnQoXG4gICAgICAgICAgKGEsIGIpID0+IE51bWJlcihhKSAtIE51bWJlcihiKVxuICAgICAgICApO1xuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IHBhbGxldE9iaiA9IHt9O1xuICAgICAgT2JqZWN0LmtleXMocGFsbGV0QmlucykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgIHBhbGxldE9ialtrZXldID0gQXJyYXkuZnJvbShwYWxsZXRCaW5zW2tleV0pLnNvcnQoXG4gICAgICAgICAgKGEsIGIpID0+IE51bWJlcihhKSAtIE51bWJlcihiKVxuICAgICAgICApO1xuICAgICAgfSk7XG5cbiAgICAgIHNldE1hcENlbGxQYWxsZXRzKGNlbGxPYmopO1xuICAgICAgc2V0TWFwUGFsbGV0QmlucyhwYWxsZXRPYmopO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGxvYWQgbWFwIGludmVudG9yeVwiLCBlcnJvcik7XG4gICAgICBzZXRNYXBFcnJvcihcIkZhaWxlZCB0byBsb2FkIG1hcCBpbnZlbnRvcnkuXCIpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRNYXBMb2FkaW5nKGZhbHNlKTtcbiAgICB9XG4gIH0sIFtdKTtcblxuICBjb25zdCBvcGVuTWFwID0gYXN5bmMgKCkgPT4ge1xuICAgIHNldE1hcEVycm9yKFwiXCIpO1xuICAgIGF3YWl0IGxvYWRNYXBEaXJlY3RvcnkoKTtcbiAgICBpZiAobWFwUmVnaW9uKSB7XG4gICAgICBzZXRNYXBTdGVwKFwiZ3JpZFwiKTtcbiAgICAgIGxvYWRNYXBJbnZlbnRvcnkobWFwUmVnaW9uKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2V0TWFwU3RlcChcInJlZ2lvbnNcIik7XG4gICAgfVxuICAgIHNldFNob3dNYXAodHJ1ZSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlTWFwU2VsZWN0UmVnaW9uID0gKHJlZ2lvbklkKSA9PiB7XG4gICAgc2V0TWFwUmVnaW9uKHJlZ2lvbklkKTtcbiAgICBzZXRNYXBSb3coXCJcIik7XG4gICAgc2V0TWFwQ29sKFwiXCIpO1xuICAgIHNldE1hcFBhbGxldChcIlwiKTtcbiAgICBzZXRNYXBCaW4oXCJcIik7XG4gICAgc2V0TWFwU3RlcChcImdyaWRcIik7XG4gICAgbG9hZE1hcEludmVudG9yeShyZWdpb25JZCk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlTWFwU2VsZWN0Q2VsbCA9IChyb3dMZXR0ZXIsIGNvbE51bWJlcikgPT4ge1xuICAgIHNldE1hcFJvdyhyb3dMZXR0ZXIpO1xuICAgIHNldE1hcENvbChjb2xOdW1iZXIpO1xuICAgIHNldE1hcFBhbGxldChcIlwiKTtcbiAgICBzZXRNYXBCaW4oXCJcIik7XG4gICAgc2V0TWFwU3RlcChcInBhbGxldHNcIik7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlTWFwU2VsZWN0UGFsbGV0ID0gKHBhbGxldElkKSA9PiB7XG4gICAgc2V0TWFwUGFsbGV0KHBhbGxldElkKTtcbiAgICBzZXRNYXBCaW4oXCJcIik7XG4gICAgc2V0TWFwU3RlcChcImJpbnNcIik7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlTWFwU2VsZWN0QmluID0gKGJpbklkKSA9PiB7XG4gICAgc2V0TWFwQmluKGJpbklkKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVNYXBCYWNrID0gKCkgPT4ge1xuICAgIGlmIChtYXBTdGVwID09PSBcImJpbnNcIikge1xuICAgICAgc2V0TWFwQmluKFwiXCIpO1xuICAgICAgc2V0TWFwU3RlcChcInBhbGxldHNcIik7XG4gICAgfVxuICAgIGVsc2UgaWYgKG1hcFN0ZXAgPT09IFwicGFsbGV0c1wiKSBzZXRNYXBTdGVwKFwiZ3JpZFwiKTtcbiAgICBlbHNlIGlmIChtYXBTdGVwID09PSBcImdyaWRcIikgc2V0TWFwU3RlcChcInJlZ2lvbnNcIik7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlTWFwVmlldyA9IChvdmVycmlkZXMgPSB7fSkgPT4ge1xuICAgIGNvbnN0IHBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoKTtcbiAgICBjb25zdCByZWdpb25WYWx1ZSA9IG92ZXJyaWRlcy5yZWdpb24gPz8gbWFwUmVnaW9uO1xuICAgIGNvbnN0IGxldHRlclZhbHVlID0gb3ZlcnJpZGVzLnNlY3Rpb25MZXR0ZXIgPz8gbWFwUm93O1xuICAgIGNvbnN0IG51bWJlclZhbHVlID0gb3ZlcnJpZGVzLnNlY3Rpb25OdW1iZXIgPz8gbWFwQ29sO1xuICAgIGNvbnN0IHBhbGxldFZhbHVlID0gb3ZlcnJpZGVzLnBhbGxldCA/PyBtYXBQYWxsZXQ7XG4gICAgY29uc3QgYmluVmFsdWUgPSBvdmVycmlkZXMuYmluID8/IG1hcEJpbiA/PyBcIlwiO1xuXG4gICAgaWYgKHJlZ2lvblZhbHVlKSBwYXJhbXMuc2V0KFwicmVnaW9uXCIsIHJlZ2lvblZhbHVlKTtcbiAgICBpZiAobGV0dGVyVmFsdWUpIHBhcmFtcy5zZXQoXCJzZWN0aW9uTGV0dGVyXCIsIGxldHRlclZhbHVlKTtcbiAgICBpZiAobnVtYmVyVmFsdWUpIHBhcmFtcy5zZXQoXCJzZWN0aW9uTnVtYmVyXCIsIG51bWJlclZhbHVlKTtcbiAgICBpZiAocGFsbGV0VmFsdWUpIHBhcmFtcy5zZXQoXCJwYWxsZXRcIiwgcGFsbGV0VmFsdWUpO1xuICAgIGlmIChiaW5WYWx1ZSkgcGFyYW1zLnNldChcImJpblwiLCBiaW5WYWx1ZSk7XG5cbiAgICBjb25zdCBxdWVyeSA9IHBhcmFtcy50b1N0cmluZygpO1xuICAgIHJvdXRlci5wdXNoKFxuICAgICAgYC9OZXdTZWFyY2gvaW52ZW50b3J5L2ludmVudG9yeU1hbmFnZSR7cXVlcnkgPyBgPyR7cXVlcnl9YCA6IFwiXCJ9YFxuICAgICk7XG4gIH07XG5cbiAgY29uc3Qgc3RhcnROYW1lVG9rZW5CYWNrZmlsbCA9IHVzZUNhbGxiYWNrKGFzeW5jIChyZWFzb24gPSBcIlwiKSA9PiB7XG4gICAgaWYgKGJhY2tmaWxsSW5GbGlnaHQuY3VycmVudCkgcmV0dXJuO1xuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICBjb25zdCBsYXN0UnVuID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwibmFtZVRva2Vuc0JhY2tmaWxsQXRcIik7XG4gICAgICBpZiAobGFzdFJ1biAmJiBEYXRlLm5vdygpIC0gTnVtYmVyKGxhc3RSdW4pIDwgMjQgKiA2MCAqIDYwICogMTAwMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgYmFja2ZpbGxJbkZsaWdodC5jdXJyZW50ID0gdHJ1ZTtcbiAgICBjb25zdCBkYiA9IGZpcmViYXNlLmZpcmVzdG9yZSgpO1xuICAgIGxldCBsYXN0RG9jID0gbnVsbDtcblxuICAgIGNvbnN0IHRva2Vuc0VxdWFsID0gKGEsIGIpID0+IHtcbiAgICAgIGlmIChhLmxlbmd0aCAhPT0gYi5sZW5ndGgpIHJldHVybiBmYWxzZTtcbiAgICAgIGNvbnN0IHNldEEgPSBuZXcgU2V0KGEpO1xuICAgICAgY29uc3Qgc2V0QiA9IG5ldyBTZXQoYik7XG4gICAgICBpZiAoc2V0QS5zaXplICE9PSBzZXRCLnNpemUpIHJldHVybiBmYWxzZTtcbiAgICAgIGZvciAoY29uc3QgdiBvZiBzZXRBKSBpZiAoIXNldEIuaGFzKHYpKSByZXR1cm4gZmFsc2U7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgdHJ5IHtcbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIGxldCBxdWVyeSA9IGRiXG4gICAgICAgICAgLmNvbGxlY3Rpb24oXCJUZXN0XCIpXG4gICAgICAgICAgLm9yZGVyQnkoZmlyZWJhc2UuZmlyZXN0b3JlLkZpZWxkUGF0aC5kb2N1bWVudElkKCkpXG4gICAgICAgICAgLmxpbWl0KDIwMCk7XG4gICAgICAgIGlmIChsYXN0RG9jKSBxdWVyeSA9IHF1ZXJ5LnN0YXJ0QWZ0ZXIobGFzdERvYyk7XG5cbiAgICAgICAgY29uc3Qgc25hcCA9IGF3YWl0IHF1ZXJ5LmdldCgpO1xuICAgICAgICBpZiAoc25hcC5lbXB0eSkgYnJlYWs7XG5cbiAgICAgICAgY29uc3QgYmF0Y2ggPSBkYi5iYXRjaCgpO1xuICAgICAgICBsZXQgd3JpdGVzID0gMDtcblxuICAgICAgICBzbmFwLmRvY3MuZm9yRWFjaCgoZG9jKSA9PiB7XG4gICAgICAgICAgY29uc3QgZGF0YSA9IGRvYy5kYXRhKCkgfHwge307XG4gICAgICAgICAgY29uc3QgbmFtZSA9IHR5cGVvZiBkYXRhLm5hbWUgPT09IFwic3RyaW5nXCIgPyBkYXRhLm5hbWUgOiBcIlwiO1xuICAgICAgICAgIGNvbnN0IG5hbWVMb3dlciA9IG5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICBjb25zdCBuYW1lVG9rZW5zID0gYnVpbGROYW1lVG9rZW5zKG5hbWUpO1xuICAgICAgICAgIGNvbnN0IGV4aXN0aW5nVG9rZW5zID0gQXJyYXkuaXNBcnJheShkYXRhLm5hbWVUb2tlbnMpXG4gICAgICAgICAgICA/IEFycmF5LmZyb20obmV3IFNldChkYXRhLm5hbWVUb2tlbnMubWFwKCh2KSA9PiBTdHJpbmcodikpKSlcbiAgICAgICAgICAgIDogW107XG5cbiAgICAgICAgICBjb25zdCBuZWVkc1VwZGF0ZSA9XG4gICAgICAgICAgICBkYXRhLm5hbWVMb3dlciAhPT0gbmFtZUxvd2VyIHx8XG4gICAgICAgICAgICAhdG9rZW5zRXF1YWwoZXhpc3RpbmdUb2tlbnMsIG5hbWVUb2tlbnMpO1xuXG4gICAgICAgICAgaWYgKG5lZWRzVXBkYXRlKSB7XG4gICAgICAgICAgICBiYXRjaC51cGRhdGUoZG9jLnJlZiwgeyBuYW1lTG93ZXIsIG5hbWVUb2tlbnMgfSk7XG4gICAgICAgICAgICB3cml0ZXMgKz0gMTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh3cml0ZXMgPiAwKSB7XG4gICAgICAgICAgYXdhaXQgYmF0Y2guY29tbWl0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBsYXN0RG9jID0gc25hcC5kb2NzW3NuYXAuZG9jcy5sZW5ndGggLSAxXTtcbiAgICAgICAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgMjUpKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKFxuICAgICAgICAgIFwibmFtZVRva2Vuc0JhY2tmaWxsQXRcIixcbiAgICAgICAgICBTdHJpbmcoRGF0ZS5ub3coKSlcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihcIk5hbWUgdG9rZW4gYmFja2ZpbGwgZmFpbGVkOlwiLCByZWFzb24sIGVycm9yKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgYmFja2ZpbGxJbkZsaWdodC5jdXJyZW50ID0gZmFsc2U7XG4gICAgfVxuICB9LCBbXSk7XG5cbiAgY29uc3Qgc2VhcmNoTG93ZXIgPSAoc2VhcmNoIHx8IFwiXCIpLnRvTG93ZXJDYXNlKCkudHJpbSgpO1xuICBjb25zdCBoYXNBY3RpdmVGaWx0ZXJzID1cbiAgICBCb29sZWFuKHNlbGVjdGVkT0VNKSB8fFxuICAgIEJvb2xlYW4oc2VsZWN0ZWRNb2RhbGl0eSkgfHxcbiAgICBCb29sZWFuKHNlbGVjdGVkTW9kZWwpIHx8XG4gICAgQm9vbGVhbihzZWxlY3RlZENsaWVudEZyb20pIHx8XG4gICAgQm9vbGVhbihzZWxlY3RlZENsaWVudEN1cnJlbnQpIHx8XG4gICAgQm9vbGVhbihzZWFyY2hMb3dlcik7XG5cbiAgY29uc3QgdmFsdWVNYXRjaGVzID0gKHZhbHVlLCBzKSA9PiB7XG4gICAgaWYgKCF2YWx1ZSkgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHZhbHVlLnNvbWUoKHYpID0+IHZhbHVlTWF0Y2hlcyh2LCBzKSk7XG4gICAgfVxuICAgIHJldHVybiBTdHJpbmcodmFsdWUpLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMocyk7XG4gIH07XG5cbiAgY29uc3QgbWF0Y2hlc0ZpbHRlcnMgPSB1c2VDYWxsYmFjayhcbiAgICAoaXRlbSkgPT4ge1xuICAgICAgLy8gaGlkZSBleHBsaWNpdGx5IGhpZGRlbiBpdGVtc1xuICAgICAgaWYgKGl0ZW0/LnZpc2libGUgPT09IGZhbHNlKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgIC8vIE9FTSAvIE1vZGFsaXR5IC8gTW9kZWwgZmlsdGVyaW5nXG4gICAgICBjb25zdCBPRU0gPSBnZXRNYWNoaW5lRmllbGQoaXRlbSwgXCJPRU1cIik7XG4gICAgICBjb25zdCBNb2RhbGl0eSA9IGdldE1hY2hpbmVGaWVsZChpdGVtLCBcIk1vZGFsaXR5XCIpO1xuICAgICAgY29uc3QgTW9kZWwgPSBnZXRNYWNoaW5lRmllbGQoaXRlbSwgXCJNb2RlbFwiKTtcblxuICAgICAgaWYgKHNlbGVjdGVkT0VNICYmIG5vcm1hbGl6ZVRleHQoT0VNKSAhPT0gbm9ybWFsaXplVGV4dChzZWxlY3RlZE9FTSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKFxuICAgICAgICBzZWxlY3RlZE1vZGFsaXR5ICYmXG4gICAgICAgIG5vcm1hbGl6ZVRleHQoTW9kYWxpdHkpICE9PSBub3JtYWxpemVUZXh0KHNlbGVjdGVkTW9kYWxpdHkpXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKHNlbGVjdGVkTW9kZWwgJiYgbm9ybWFsaXplVGV4dChNb2RlbCkgIT09IG5vcm1hbGl6ZVRleHQoc2VsZWN0ZWRNb2RlbCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICAvLyBDbGllbnQgZmlsdGVyc1xuICAgICAgaWYgKHNlbGVjdGVkQ2xpZW50RnJvbSAmJiBpdGVtPy5jbGllbnRGcm9tSWQgIT09IHNlbGVjdGVkQ2xpZW50RnJvbSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoXG4gICAgICAgIHNlbGVjdGVkQ2xpZW50Q3VycmVudCAmJlxuICAgICAgICBpdGVtPy5jbGllbnRDdXJyZW50SWQgIT09IHNlbGVjdGVkQ2xpZW50Q3VycmVudFxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgLy8gU2VhcmNoXG4gICAgICBpZiAoc2VhcmNoTG93ZXIpIHtcbiAgICAgICAgaWYgKHNlbGVjdCA9PT0gXCJOYW1lXCIpIHtcbiAgICAgICAgICByZXR1cm4gdmFsdWVNYXRjaGVzKGl0ZW0/Lm5hbWUsIHNlYXJjaExvd2VyKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2VsZWN0ID09PSBcIkRhdGVcIikge1xuICAgICAgICAgIGNvbnN0IHdhbnRlZERheSA9IHNlYXJjaExvd2VyOyAvLyB5eXl5LW1tLWRkIGZyb20gaW5wdXRcbiAgICAgICAgICBjb25zdCBpdGVtWU1EID0gdG9ZTUQoaXRlbT8uZGF0ZSk7XG4gICAgICAgICAgaWYgKGl0ZW1ZTUQgJiYgaXRlbVlNRCA9PT0gd2FudGVkRGF5KSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShpdGVtPy5kZXNjcmlwdGlvbnMpKSB7XG4gICAgICAgICAgICBpZiAoaXRlbS5kZXNjcmlwdGlvbnMuc29tZSgoZCkgPT4gdG9ZTUQoZD8uZGF0ZSkgPT09IHdhbnRlZERheSkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGl0ZW0/LndvcmtPcmRlcnMpKSB7XG4gICAgICAgICAgICBpZiAoaXRlbS53b3JrT3JkZXJzLnNvbWUoKHcpID0+IHRvWU1EKHc/LmRhdGUpID09PSB3YW50ZWREYXkpKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNlbGVjdCA9PT0gXCJXb3JrIE9yZGVyXCIpIHtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgQXJyYXkuaXNBcnJheShpdGVtPy53b3JrT3JkZXJzKSAmJlxuICAgICAgICAgICAgaXRlbS53b3JrT3JkZXJzLnNvbWUoKHdvKSA9PlxuICAgICAgICAgICAgICB2YWx1ZU1hdGNoZXMod28/LndvcmtPcmRlciwgc2VhcmNoTG93ZXIpXG4gICAgICAgICAgICApXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2VsZWN0ID09PSBcIlByb2R1Y3QgTnVtYmVyXCIpIHtcbiAgICAgICAgICByZXR1cm4gdmFsdWVNYXRjaGVzKGl0ZW0/LnBuLCBzZWFyY2hMb3dlcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNlbGVjdCA9PT0gXCJTZXJpYWwgTnVtYmVyXCIpIHtcbiAgICAgICAgICByZXR1cm4gdmFsdWVNYXRjaGVzKGl0ZW0/LnNuLCBzZWFyY2hMb3dlcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNlbGVjdCA9PT0gXCJEZXNjcmlwdGlvblwiKSB7XG4gICAgICAgICAgaWYgKHZhbHVlTWF0Y2hlcyhpdGVtPy5kZXNjLCBzZWFyY2hMb3dlcikpIHJldHVybiB0cnVlO1xuICAgICAgICAgIGlmICh2YWx1ZU1hdGNoZXMoaXRlbT8uZGVzY3JpcHRpb24sIHNlYXJjaExvd2VyKSkgcmV0dXJuIHRydWU7XG4gICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoaXRlbT8uZGVzY3JpcHRpb25zKSkge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW0uZGVzY3JpcHRpb25zLnNvbWUoKGQpID0+XG4gICAgICAgICAgICAgIHZhbHVlTWF0Y2hlcyhkPy5kZXNjcmlwdGlvbiwgc2VhcmNoTG93ZXIpXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNlbGVjdCA9PT0gXCJTS1VcIikge1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICB2YWx1ZU1hdGNoZXMoaXRlbT8uaWQsIHNlYXJjaExvd2VyKSB8fFxuICAgICAgICAgICAgdmFsdWVNYXRjaGVzKGl0ZW0/LmxvY2FsU04sIHNlYXJjaExvd2VyKSB8fFxuICAgICAgICAgICAgdmFsdWVNYXRjaGVzKGl0ZW0/LmxvY2FsX3NuLCBzZWFyY2hMb3dlcilcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG4gICAgW1xuICAgICAgc2VsZWN0ZWRPRU0sXG4gICAgICBzZWxlY3RlZE1vZGFsaXR5LFxuICAgICAgc2VsZWN0ZWRNb2RlbCxcbiAgICAgIHNlbGVjdGVkQ2xpZW50RnJvbSxcbiAgICAgIHNlbGVjdGVkQ2xpZW50Q3VycmVudCxcbiAgICAgIHNlYXJjaExvd2VyLFxuICAgICAgc2VsZWN0LFxuICAgIF1cbiAgKTtcblxuICBjb25zdCByZXNldFBhZ2luYXRpb24gPSAoKSA9PiB7XG4gICAgc2V0UGFnZSgxKTtcbiAgICBzZXRQYWdlQ3Vyc29ycyhbXSk7XG4gICAgc2V0SGFzTmV4dFBhZ2UoZmFsc2UpO1xuICB9O1xuXG4gIC8vIFJlc2V0IHBhZ2luYXRpb24gb24gcm91dGUvcXVlcnkgY2hhbmdlIChwcmV2ZW50cyBzdGFsZSBwYWdlcyBsaWtlIOKAnHN0YXJ0aW5nIGF0IDbigJ0pXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgcmVzZXRQYWdpbmF0aW9uKCk7XG4gICAgc2V0UXVlcnlFcG9jaCgodikgPT4gdiArIDEpO1xuICB9LCBbcm91dGVyLmFzUGF0aF0pO1xuXG4gIC8vIFJlc2V0IGFuZCByZWZldGNoIHdoZW4gZmlsdGVycy9zZWFyY2ggY2hhbmdlXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgcmVzZXRQYWdpbmF0aW9uKCk7XG4gICAgc2V0UXVlcnlFcG9jaCgodikgPT4gdiArIDEpO1xuICB9LCBbXG4gICAgc2VsZWN0ZWRPRU0sXG4gICAgc2VsZWN0ZWRNb2RhbGl0eSxcbiAgICBzZWxlY3RlZE1vZGVsLFxuICAgIHNlbGVjdGVkQ2xpZW50RnJvbSxcbiAgICBzZWxlY3RlZENsaWVudEN1cnJlbnQsXG4gICAgc2VhcmNoLFxuICAgIHNlbGVjdCxcbiAgXSk7XG5cblxuICAvLyBGZXRjaCBkYXRhIG9uIGNvbXBvbmVudCBtb3VudCBhbmQgcm91dGUgY2hhbmdlXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgZmV0Y2hEYXRhKHBhZ2UpO1xuICB9LCBbcGFnZSwgcXVlcnlFcG9jaF0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFyb3V0ZXI/LmV2ZW50cykgcmV0dXJuO1xuICAgIGNvbnN0IGhhbmRsZURvbmUgPSAoKSA9PiBzZXRJc05hdmlnYXRpbmcoZmFsc2UpO1xuICAgIHJvdXRlci5ldmVudHMub24oXCJyb3V0ZUNoYW5nZUNvbXBsZXRlXCIsIGhhbmRsZURvbmUpO1xuICAgIHJvdXRlci5ldmVudHMub24oXCJyb3V0ZUNoYW5nZUVycm9yXCIsIGhhbmRsZURvbmUpO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICByb3V0ZXIuZXZlbnRzLm9mZihcInJvdXRlQ2hhbmdlQ29tcGxldGVcIiwgaGFuZGxlRG9uZSk7XG4gICAgICByb3V0ZXIuZXZlbnRzLm9mZihcInJvdXRlQ2hhbmdlRXJyb3JcIiwgaGFuZGxlRG9uZSk7XG4gICAgfTtcbiAgfSwgW3JvdXRlcl0pO1xuXG4gIGFzeW5jIGZ1bmN0aW9uIGZldGNoRGF0YShyZXF1ZXN0ZWRQYWdlID0gMSkge1xuICAgIGNvbnN0IHNlcSA9ICsrZmV0Y2hTZXEuY3VycmVudDtcbiAgICBsZXQgdGltZWRPdXQgPSBmYWxzZTtcbiAgICBzZXRJc0xvYWRpbmcodHJ1ZSk7XG4gICAgc2V0TG9hZEVycm9yKG51bGwpO1xuICAgIGNvbnN0IHRpbWVvdXRJZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGltZWRPdXQgPSB0cnVlO1xuICAgICAgaWYgKHNlcSA9PT0gZmV0Y2hTZXEuY3VycmVudCkge1xuICAgICAgICBzZXRMb2FkRXJyb3Ioe1xuICAgICAgICAgIGNvZGU6IFwidGltZW91dFwiLFxuICAgICAgICAgIG1lc3NhZ2U6IGBMb2FkaW5nIGlzIHRha2luZyBsb25nZXIgdGhhbiAke01hdGgucm91bmQoXG4gICAgICAgICAgICBMT0FEX1RJTUVPVVRfTVMgLyAxMDAwXG4gICAgICAgICAgKX1zLiBUaGlzIGlzIGxpa2VseSBkdWUgdG8gdmVyeSBzZWxlY3RpdmUgZmlsdGVycy5gLFxuICAgICAgICB9KTtcbiAgICAgICAgc2V0SXNMb2FkaW5nKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9LCBMT0FEX1RJTUVPVVRfTVMpO1xuICAgIHRyeSB7XG4gICAgICBpZiAocm91dGVyLnF1ZXJ5LmlucHV0VGV4dCAmJiByb3V0ZXIucXVlcnkuc2VsZWN0ZWRUeXBlKSB7XG4gICAgICAgIHNldFNlbGVjdChyb3V0ZXIucXVlcnkuc2VsZWN0ZWRUeXBlKTtcbiAgICAgICAgc2V0U2VhcmNoKHJvdXRlci5xdWVyeS5pbnB1dFRleHQpO1xuICAgICAgfVxuICAgICAgY29uc3Qgc3RhcnRBZnRlckRvYyA9XG4gICAgICAgIHJlcXVlc3RlZFBhZ2UgPiAxID8gcGFnZUN1cnNvcnNbcmVxdWVzdGVkUGFnZSAtIDJdIDogbnVsbDtcbiAgICAgIGlmIChyZXF1ZXN0ZWRQYWdlID4gMSAmJiAhc3RhcnRBZnRlckRvYykge1xuICAgICAgICBzZXRQYWdlKDEpO1xuICAgICAgICBpZiAoc2VxID09PSBmZXRjaFNlcS5jdXJyZW50KSB7XG4gICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXRJZCk7XG4gICAgICAgICAgc2V0SXNMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBlZmZlY3RpdmVTZWxlY3QgPSByb3V0ZXIucXVlcnkuc2VsZWN0ZWRUeXBlIHx8IHNlbGVjdDtcbiAgICAgIGNvbnN0IGVmZmVjdGl2ZVNlYXJjaCA9IHJvdXRlci5xdWVyeS5pbnB1dFRleHQgfHwgc2VhcmNoO1xuICAgICAgY29uc3QgZWZmZWN0aXZlU2VhcmNoTG93ZXIgPSAoZWZmZWN0aXZlU2VhcmNoIHx8IFwiXCIpXG4gICAgICAgIC50b0xvd2VyQ2FzZSgpXG4gICAgICAgIC50cmltKCk7XG5cbiAgICAgIC8vIGxpZ2h0IHJldHJ5IGZvciB0cmFuc2llbnQgRmlyZXN0b3JlIGhpY2N1cHNcbiAgICAgIGNvbnN0IGxvYWQgPSBhc3luYyAoYXR0ZW1wdCA9IDEpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXR1cm4gYXdhaXQgZmV0Y2hQYXJ0c1dpdGhNYWNoaW5lRGF0YVBhZ2Uoe1xuICAgICAgICAgICAgcGFnZVNpemUsXG4gICAgICAgICAgICBzdGFydEFmdGVyRG9jLFxuICAgICAgICAgICAgdmlzaWJsZU9ubHk6IHRydWUsXG4gICAgICAgICAgICBmaWx0ZXJGbjogaGFzQWN0aXZlRmlsdGVycyA/IG1hdGNoZXNGaWx0ZXJzIDogbnVsbCxcbiAgICAgICAgICAgIHNlYXJjaDogZWZmZWN0aXZlU2VhcmNoTG93ZXJcbiAgICAgICAgICAgICAgPyB7XG4gICAgICAgICAgICAgICAgICB0eXBlOiBlZmZlY3RpdmVTZWxlY3QsXG4gICAgICAgICAgICAgICAgICByYXc6IGVmZmVjdGl2ZVNlYXJjaCxcbiAgICAgICAgICAgICAgICAgIGxvd2VyOiBlZmZlY3RpdmVTZWFyY2hMb3dlcixcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIDogbnVsbCxcbiAgICAgICAgICAgIG5lZWRzTWFjaGluZURhdGE6XG4gICAgICAgICAgICAgIEJvb2xlYW4oc2VsZWN0ZWRPRU0pIHx8XG4gICAgICAgICAgICAgIEJvb2xlYW4oc2VsZWN0ZWRNb2RhbGl0eSkgfHxcbiAgICAgICAgICAgICAgQm9vbGVhbihzZWxlY3RlZE1vZGVsKSB8fFxuICAgICAgICAgICAgICBCb29sZWFuKHNlbGVjdGVkQ2xpZW50RnJvbSkgfHxcbiAgICAgICAgICAgICAgQm9vbGVhbihzZWxlY3RlZENsaWVudEN1cnJlbnQpLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgaWYgKGF0dGVtcHQgPj0gMykgdGhyb3cgZTtcbiAgICAgICAgICBhd2FpdCBuZXcgUHJvbWlzZShyID0+IHNldFRpbWVvdXQociwgMjUwICogTWF0aC5wb3coMiwgYXR0ZW1wdCAtIDEpKSk7XG4gICAgICAgICAgcmV0dXJuIGxvYWQoYXR0ZW1wdCArIDEpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgY29uc3QgeyBwYXJ0czogZGF0YSwgbGFzdERvYywgaGFzTmV4dFBhZ2U6IG5leHRQYWdlIH0gPSBhd2FpdCBsb2FkKCk7XG4gICAgICBpZiAodGltZWRPdXQgfHwgc2VxICE9PSBmZXRjaFNlcS5jdXJyZW50KSByZXR1cm47XG4gICAgICBjb25zdCBoYXNOYW1lU2VhcmNoID1cbiAgICAgICAgQm9vbGVhbihlZmZlY3RpdmVTZWFyY2hMb3dlcikgJiYgZWZmZWN0aXZlU2VsZWN0ID09PSBcIk5hbWVcIjtcbiAgICAgIGlmIChcbiAgICAgICAgaGFzTmFtZVNlYXJjaCAmJlxuICAgICAgICAoZGF0YS5sZW5ndGggPT09IDAgfHxcbiAgICAgICAgICBkYXRhLnNvbWUoXG4gICAgICAgICAgICAoaXRlbSkgPT5cbiAgICAgICAgICAgICAgIUFycmF5LmlzQXJyYXkoaXRlbT8ubmFtZVRva2VucykgfHwgaXRlbS5uYW1lVG9rZW5zLmxlbmd0aCA9PT0gMFxuICAgICAgICAgICkpXG4gICAgICApIHtcbiAgICAgICAgc3RhcnROYW1lVG9rZW5CYWNrZmlsbChcIm5hbWUtc2VhcmNoXCIpO1xuICAgICAgfVxuICAgICAgaWYgKHJlcXVlc3RlZFBhZ2UgPT09IDEgJiYgZGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgc2V0UGFnZUN1cnNvcnMoW10pO1xuICAgICAgICBzZXRIYXNOZXh0UGFnZShmYWxzZSk7XG4gICAgICB9XG4gICAgICBzZXRCYWNrdXBJbmZvKGRhdGEpO1xuICAgICAgc2V0TGFiZWxzKGxhYmVsQmFzZSk7IC8vIDwtLSBhZGQgdGhpcyBsaW5lIGFmdGVyIHNldEJhY2t1cEluZm8oZGF0YSlcbiAgICAgIHNldElEKGRhdGEubWFwKChpdGVtKSA9PiBpdGVtLmlkKSk7XG4gICAgICBpZiAocmVxdWVzdGVkUGFnZSA+IDEgJiYgZGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgc2V0SGFzTmV4dFBhZ2UoZmFsc2UpO1xuICAgICAgICBzZXRQYWdlKDEpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBzZXRIYXNOZXh0UGFnZShuZXh0UGFnZSk7XG4gICAgICBzZXRQYWdlQ3Vyc29ycygocHJldikgPT4ge1xuICAgICAgICBjb25zdCBuZXh0ID0gcmVxdWVzdGVkUGFnZSA9PT0gMSA/IFtdIDogWy4uLnByZXZdO1xuICAgICAgICBpZiAobGFzdERvYykge1xuICAgICAgICAgIG5leHRbcmVxdWVzdGVkUGFnZSAtIDFdID0gbGFzdERvYztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgIH0pO1xuICAgICAgc2V0U2VsZWN0ZWRJdGVtcyhbXSk7XG5cbiAgICAgIC8vIE5vcm1hbGl6ZSBjbGllbnQgaWRzIGZvciBmaWx0ZXJpbmdcbiAgICAgIGNvbnN0IGF1Z21lbnRlZCA9IGRhdGEubWFwKChpdGVtKSA9PiAoe1xuICAgICAgICAuLi5pdGVtLFxuICAgICAgICBjbGllbnRGcm9tSWQ6XG4gICAgICAgICAgaXRlbT8uY2xpZW50RnJvbUlkID8/XG4gICAgICAgICAgKHR5cGVvZiBpdGVtPy5DbGllbnRGcm9tID09PSBcInN0cmluZ1wiID8gaXRlbS5DbGllbnRGcm9tIDogbnVsbCkgPz9cbiAgICAgICAgICBpdGVtPy5DbGllbnRGcm9tPy5pZCA/P1xuICAgICAgICAgIG51bGwsXG4gICAgICAgIGNsaWVudEN1cnJlbnRJZDpcbiAgICAgICAgICBpdGVtPy5jbGllbnRDdXJyZW50SWQgPz9cbiAgICAgICAgICAodHlwZW9mIGl0ZW0/LkNsaWVudEN1cnJlbnQgPT09IFwic3RyaW5nXCIgPyBpdGVtLkNsaWVudEN1cnJlbnQgOiBudWxsKSA/P1xuICAgICAgICAgIGl0ZW0/LkNsaWVudEN1cnJlbnQ/LmlkID8/XG4gICAgICAgICAgbnVsbCxcbiAgICAgIH0pKTtcblxyXG4gICAgICBzZXRBdWdtZW50ZWRJbmZvKGF1Z21lbnRlZCk7XG4gICAgICAvLyBkZWZhdWx0IHZpZXcgPSBmaWx0ZXJlZCAoa2VlcHMgcGFnaW5hdGlvbiBhbmQgZmlsdGVycyBjb25zaXN0ZW50KVxuICAgICAgc2V0SW5mbyhhdWdtZW50ZWQuZmlsdGVyKG1hdGNoZXNGaWx0ZXJzKSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBpZiAoc2VxICE9PSBmZXRjaFNlcS5jdXJyZW50KSByZXR1cm47XG4gICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZmV0Y2hpbmcgZGF0YTpcIiwgZXJyKTtcbiAgICAgIGNvbnN0IGNvZGUgPSBlcnI/LmNvZGUgfHwgXCJ1bmtub3duXCI7XG4gICAgICBzZXRMb2FkRXJyb3Ioe1xuICAgICAgICBjb2RlLFxuICAgICAgICBtZXNzYWdlOiBlcnI/Lm1lc3NhZ2UgfHwgXCJGYWlsZWQgdG8gbG9hZCBpdGVtcy5cIixcbiAgICAgIH0pO1xuICAgICAgc2V0SW5mbyhbXSk7XG4gICAgICBzZXRBdWdtZW50ZWRJbmZvKFtdKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXRJZCk7XG4gICAgICBpZiAoc2VxID09PSBmZXRjaFNlcS5jdXJyZW50ICYmICF0aW1lZE91dCkgc2V0SXNMb2FkaW5nKGZhbHNlKTtcbiAgICB9XG4gIH1cblxyXG4gIGNvbnN0IHNlYXJjaENoYW5nZUhhbmRsZXIgPSAoZXZlbnQpID0+IHNldFNlYXJjaChldmVudC50YXJnZXQudmFsdWUpO1xyXG5cclxuICAvLyBGaWx0ZXIgdGhlIGN1cnJlbnRseSBsb2FkZWQgaXRlbXMgKG5vdyBjb25zaXN0ZW50IHdpdGggcGFnZWQgZmlsdGVyaW5nKVxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGJhc2UgPSBhdWdtZW50ZWRJbmZvIHx8IFtdO1xuICAgIHNldEluZm8oYmFzZS5maWx0ZXIobWF0Y2hlc0ZpbHRlcnMpKTtcbiAgfSwgW2F1Z21lbnRlZEluZm8sIG1hdGNoZXNGaWx0ZXJzXSk7XG5cclxuICBmdW5jdGlvbiBzb3J0Q2hlY2tBbGwocG9zKSB7XHJcbiAgICAvLyBEZXRlcm1pbmUgbmV4dCBkaXJlY3Rpb246IHRvZ2dsZSB0aGUgY2xpY2tlZCBjb2x1bW4gb25seVxyXG4gICAgY29uc3QgbmV4dFNvcnRDaGVjayA9IHNvcnRDaGVjay5tYXAoKHYsIGkpID0+IChpID09PSBwb3MgPyAhdiA6IHYpKTtcclxuICAgIGNvbnN0IGlzRGVzYyA9IG5leHRTb3J0Q2hlY2tbcG9zXTsgLy8gdHJ1ZSBtZWFucyBkZXNjZW5kaW5nXHJcblxyXG4gICAgY29uc3Qgc29ydGVkSW5mbyA9IFsuLi5pbmZvXS5zb3J0KChhLCBiKSA9PiB7XHJcbiAgICAgIGNvbnN0IGtleSA9IGxhYmVsQmFzZU5hbWVzW3Bvc107XHJcblxyXG4gICAgICBpZiAocG9zID09PSAxKSB7XHJcbiAgICAgICAgLy8gREFURSBjb2x1bW5cclxuICAgICAgICBjb25zdCB0YSA9IHRvVGltZShhW2tleV0pO1xyXG4gICAgICAgIGNvbnN0IHRiID0gdG9UaW1lKGJba2V5XSk7XHJcblxyXG4gICAgICAgIC8vIFB1dCBtaXNzaW5nIGRhdGVzIGF0IHRoZSBlbmQgZm9yIGFzY2VuZGluZywgYXQgdGhlIHN0YXJ0IGZvciBkZXNjZW5kaW5nXHJcbiAgICAgICAgaWYgKHRhID09PSBudWxsICYmIHRiID09PSBudWxsKSByZXR1cm4gMDtcclxuICAgICAgICBpZiAodGEgPT09IG51bGwpIHJldHVybiBpc0Rlc2MgPyAtMSA6IDE7XHJcbiAgICAgICAgaWYgKHRiID09PSBudWxsKSByZXR1cm4gaXNEZXNjID8gMSA6IC0xO1xyXG5cclxuICAgICAgICByZXR1cm4gaXNEZXNjID8gKHRiIC0gdGEpIDogKHRhIC0gdGIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBOQU1FIG9yIFNLVSAoc3RyaW5nLXkgY29sdW1ucyk6IGluZGV4ZXMgMCBvciA1IGluIHlvdXIgb3JpZ2luYWwgbG9naWNcclxuICAgICAgaWYgKHBvcyA9PT0gMCB8fCBwb3MgPT09IDUpIHtcclxuICAgICAgICBjb25zdCBhdiA9IChhW2tleV0gPz8gXCJcIikudG9TdHJpbmcoKTtcclxuICAgICAgICBjb25zdCBidiA9IChiW2tleV0gPz8gXCJcIikudG9TdHJpbmcoKTtcclxuICAgICAgICByZXR1cm4gaXNEZXNjID8gYnYubG9jYWxlQ29tcGFyZShhdikgOiBhdi5sb2NhbGVDb21wYXJlKGJ2KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gTnVtZXJpYy1pc2ggY29sdW1ucyAod28sIHBuLCBzbikg4oCUIGZhbGwgYmFjayB0byBzdHJpbmcgY29tcGFyZSBpZiBOYU5cclxuICAgICAgY29uc3QgYW4gPSBOdW1iZXIoYVtrZXldKTtcclxuICAgICAgY29uc3QgYm4gPSBOdW1iZXIoYltrZXldKTtcclxuXHJcbiAgICAgIGlmICghaXNOYU4oYW4pICYmICFpc05hTihibikpIHtcclxuICAgICAgICByZXR1cm4gaXNEZXNjID8gKGJuIC0gYW4pIDogKGFuIC0gYm4pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IGF2ID0gKGFba2V5XSA/PyBcIlwiKS50b1N0cmluZygpO1xyXG4gICAgICAgIGNvbnN0IGJ2ID0gKGJba2V5XSA/PyBcIlwiKS50b1N0cmluZygpO1xyXG4gICAgICAgIHJldHVybiBpc0Rlc2MgPyBidi5sb2NhbGVDb21wYXJlKGF2KSA6IGF2LmxvY2FsZUNvbXBhcmUoYnYpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBzZXRJbmZvKHNvcnRlZEluZm8pO1xyXG4gICAgc2V0U29ydENoZWNrKG5leHRTb3J0Q2hlY2spO1xyXG5cclxuICAgIC8vIFVwZGF0ZSBoZWFkZXIgbGFiZWxzIHRvIHNob3cgdGhlIGxpdHRsZSBhcnJvdyBvbiB0aGUgYWN0aXZlIGNvbHVtblxyXG4gICAgc2V0TGFiZWxzKHdpdGhTb3J0SWNvbihsYWJlbEJhc2UsIHBvcywgaXNEZXNjKSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgY29uc3Qgcm93U2VsZWN0ID0gKGl0ZW0pID0+IHtcclxuICAgIGlmIChpdGVtICYmIGl0ZW0uaWQpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJTZWxlY3RlZCBpdGVtOlwiLCBpdGVtKTtcbiAgICAgIHNldElzTmF2aWdhdGluZyh0cnVlKTtcbiAgICAgIHJvdXRlci5wdXNoKFwiLi9pdGVtL1wiICsgaXRlbS5pZCk7XG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5lcnJvcihcIlVuYWJsZSB0byBkZXRlcm1pbmUgdGhlIHNlbGVjdGVkIGl0ZW3igJlzIElEOiBcIiwgaXRlbSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgW3NlbGVjdGVkSXRlbXMsIHNldFNlbGVjdGVkSXRlbXNdID0gdXNlU3RhdGUoW10pO1xyXG4gIGNvbnN0IFtzaG93RGVsZXRlTW9kYWwsIHNldFNob3dEZWxldGVNb2RhbF0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZVNlbGVjdEl0ZW0gPSAoaWQpID0+IHtcclxuICAgIHNldFNlbGVjdGVkSXRlbXMocHJldiA9PlxyXG4gICAgICBwcmV2LmluY2x1ZGVzKGlkKSA/IHByZXYuZmlsdGVyKHggPT4geCAhPT0gaWQpIDogWy4uLnByZXYsIGlkXVxyXG4gICAgKTtcclxuICB9O1xyXG5cclxuXHJcbiAgLy8gc2V0U2VsZWN0ZWRJdGVtcygocHJldikgPT4ge1xyXG4gIC8vICAgY29uc3QgbmV3U2VsZWN0aW9uID0gcHJldi5pbmNsdWRlcyhpZClcclxuICAvLyAgICAgPyBwcmV2LmZpbHRlcigoaXRlbUlkKSA9PiBpdGVtSWQgIT09IGlkKVxyXG4gIC8vICAgICA6IFsuLi5wcmV2LCBpZF07XHJcbiAgLy8gICBjb25zb2xlLmxvZyhcIlNlbGVjdGVkIGl0ZW1zOlwiLCBuZXdTZWxlY3Rpb24pO1xyXG4gIC8vICAgcmV0dXJuIG5ld1NlbGVjdGlvbjsgLy8gPC0gaW1wb3J0YW50XHJcbiAgLy8gfSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZVNob3dEZWxldGVNb2RhbCA9ICgpID0+IHNldFNob3dEZWxldGVNb2RhbCh0cnVlKTtcclxuICBjb25zdCBoYW5kbGVDbG9zZURlbGV0ZU1vZGFsID0gKCkgPT4gc2V0U2hvd0RlbGV0ZU1vZGFsKGZhbHNlKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlRGVsZXRlU2VsZWN0ZWQgPSBhc3luYyAoKSA9PiB7XHJcbiAgICBzZXRJc0RlbGV0aW5nKHRydWUpO1xyXG4gICAgY29uc3QgZGIgPSBmaXJlYmFzZS5maXJlc3RvcmUoKTtcclxuICAgIHRyeSB7XHJcbiAgICAgIC8vIExvb3Agb3ZlciBlYWNoIHNlbGVjdGVkIGl0ZW0gb25lIGF0IGEgdGltZVxyXG4gICAgICBmb3IgKGNvbnN0IGl0ZW1JZCBvZiBzZWxlY3RlZEl0ZW1zKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coaXRlbUlkKVxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAvLyBEZWxldGUgZnJvbSBcIlRlc3RcIiBjb2xsZWN0aW9uXHJcbiAgICAgICAgICBhd2FpdCBkYi5jb2xsZWN0aW9uKFwiVGVzdFwiKS5kb2MoaXRlbUlkKS5kZWxldGUoKTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEVycm9yIGRlbGV0aW5nIGRvY3VtZW50ICR7aXRlbUlkfSBmcm9tIFRlc3Q6YCwgZXJyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIC8vIERlbGV0ZSBmcm9tIFwiUGFydHNcIiBjb2xsZWN0aW9uXHJcbiAgICAgICAgICBhd2FpdCBkYi5jb2xsZWN0aW9uKFwiUGFydHNcIikuZG9jKGl0ZW1JZCkuZGVsZXRlKCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGBFcnJvciBkZWxldGluZyBkb2N1bWVudCAke2l0ZW1JZH0gZnJvbSBQYXJ0czpgLCBlcnIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgLy8gRGVsZXRlIGFzc29jaWF0ZWQgcGhvdG9zIGZyb20gc3RvcmFnZVxyXG4gICAgICAgICAgYXdhaXQgZGVsZXRlRnJvbVN0b3JhZ2UoaXRlbUlkKTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEVycm9yIGRlbGV0aW5nIHN0b3JhZ2UgZm9yICR7aXRlbUlkfTpgLCBlcnIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICAvLyBVcGRhdGUgbG9jYWwgc3RhdGUgYnkgZmlsdGVyaW5nIG91dCB0aGUgZGVsZXRlZCBpdGVtc1xyXG4gICAgICBzZXRJbmZvKGluZm8uZmlsdGVyKChpdGVtKSA9PiAhc2VsZWN0ZWRJdGVtcy5pbmNsdWRlcyhpdGVtLmlkKSkpO1xyXG4gICAgICBzZXRTZWxlY3RlZEl0ZW1zKFtdKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBkZWxldGluZyBpdGVtczpcIiwgZXJyb3IpO1xyXG4gICAgfSBmaW5hbGx5IHtcclxuICAgICAgc2V0SXNEZWxldGluZyhmYWxzZSk7XHJcbiAgICAgIGhhbmRsZUNsb3NlRGVsZXRlTW9kYWwoKTtcclxuICAgICAgLy8gT3B0aW9uYWxseSwgcmVsb2FkIHRoZSBwYWdlXHJcbiAgICAgIC8vIHJvdXRlci5yZWxvYWQoKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuXHJcbiAgY29uc3QgaGFuZGxlQ2xvc2UgPSAoKSA9PiBzZXRTaG93KGZhbHNlKTtcclxuICBjb25zdCBoYW5kbGVTaG93ID0gKCkgPT4gc2V0U2hvdyh0cnVlKTtcclxuXHJcbiAgY29uc3QgY2hlY2tEZWxldGUgPSAoZXZlbnQsIHBvcywgaWRzVG9EZWxldGUsIG5hbWUpID0+IHtcclxuICAgIGlmIChldmVudCkge1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH1cclxuICAgIGNvbnNvbGUubG9nKFwiU2VsZWN0ZWQgSURzIHRvIGRlbGV0ZTpcIiwgaWRzVG9EZWxldGUpO1xyXG4gICAgc2V0U2VsZWN0ZWRJdGVtcyhpZHNUb0RlbGV0ZSk7XHJcbiAgICBzZXRESXRlbShuYW1lKTtcclxuICAgIHNldFNob3dEZWxldGVNb2RhbCh0cnVlKTtcclxuICB9O1xyXG5cclxuICAvLyBjb25zdCBoYW5kbGVEZWxldGUgPSBhc3luYyAoKSA9PiB7XHJcbiAgLy8gICBsZXQgaXRlbUlkID0gZ0lkZTtcclxuICAvLyAgIHRyeSB7XHJcbiAgLy8gICAgIHNldElzRGVsZXRpbmcodHJ1ZSk7XHJcbiAgLy8gICAgIGNvbnN0IGRiID0gZmlyZWJhc2UuZmlyZXN0b3JlKCk7XHJcbiAgLy8gICAgIGF3YWl0IGRiLmNvbGxlY3Rpb24oXCJUZXN0XCIpLmRvYyhpdGVtSWQpLmRlbGV0ZSgpO1xyXG4gIC8vICAgICBhd2FpdCBkZWxldGVGcm9tUGFydHNDb2xsZWN0aW9uKGl0ZW1JZCk7XHJcbiAgLy8gICAgIGF3YWl0IGRlbGV0ZUZyb21TdG9yYWdlKGl0ZW1JZCk7XHJcbiAgLy8gICAgIHNldEluZm8oaW5mby5maWx0ZXIoKF8sIGkpID0+IGdQb3MgIT09IGkpKTtcclxuICAvLyAgICAgY29uc29sZS5sb2coYERlbGV0ZWQgaXRlbTogJHtpdGVtSWR9YCk7XHJcbiAgLy8gICB9IGNhdGNoIChlcnJvcikge1xyXG4gIC8vICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZGVsZXRpbmcgaXRlbTpcIiwgZXJyb3IpO1xyXG4gIC8vICAgfSBmaW5hbGx5IHtcclxuICAvLyAgICAgc2V0SXNEZWxldGluZyhmYWxzZSk7XHJcbiAgLy8gICB9XHJcbiAgLy8gICBoYW5kbGVDbG9zZSgpO1xyXG4gIC8vIH07XHJcblxyXG4gIGNvbnN0IGhvdmVyU3R5bGUgPSAoaW5kZXgpID0+ICh7XHJcbiAgICBiYWNrZ3JvdW5kQ29sb3I6IGhvdmVySW5kZXggPT09IGluZGV4ID8gXCIjZGRkXCIgOiBcInRyYW5zcGFyZW50XCIsXHJcbiAgICB0ZXh0QWxpZ246IFwiY2VudGVyXCIsXHJcbiAgICBjdXJzb3I6IFwiZGVmYXVsdFwiLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBbZHJvcGRvd24xVGV4dCwgc2V0RHJvcGRvd24xVGV4dF0gPSB1c2VTdGF0ZShcIlNlbGVjdCBPcHRpb25cIik7XHJcbiAgY29uc3QgW2Ryb3Bkb3duMlRleHQsIHNldERyb3Bkb3duMlRleHRdID0gdXNlU3RhdGUoXCJTZWxlY3QgT3B0aW9uXCIpO1xyXG5cclxuICBjb25zdCBoYW5kbGVTZWxlY3QxID0gKGV2ZW50S2V5LCBldmVudCkgPT4ge1xyXG4gICAgaWYgKGV2ZW50S2V5ID09PSBcInVuYXNzaWduZWRcIikge1xyXG4gICAgICBzZXREcm9wZG93bjFUZXh0KFwiU2VsZWN0IE9wdGlvblwiKTtcclxuICAgICAgc2V0U2VsZWN0ZWRPRU0obnVsbCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzZXREcm9wZG93bjFUZXh0KGV2ZW50LnRhcmdldC50ZXh0Q29udGVudCk7XHJcbiAgICAgIHNldFNlbGVjdGVkT0VNKGV2ZW50LnRhcmdldC50ZXh0Q29udGVudCk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaGFuZGxlU2VsZWN0MiA9IChldmVudEtleSwgZXZlbnQpID0+IHtcclxuICAgIGlmIChldmVudEtleSA9PT0gXCJ1bmFzc2lnbmVkXCIpIHtcclxuICAgICAgc2V0RHJvcGRvd24yVGV4dChcIlNlbGVjdCBPcHRpb25cIik7XHJcbiAgICAgIHNldFNlbGVjdGVkTW9kYWxpdHkobnVsbCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzZXREcm9wZG93bjJUZXh0KGV2ZW50LnRhcmdldC50ZXh0Q29udGVudCk7XHJcbiAgICAgIHNldFNlbGVjdGVkTW9kYWxpdHkoZXZlbnQudGFyZ2V0LnRleHRDb250ZW50KTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICAvLyBCdWlsZCBhIHVuaXF1ZSBsaXN0IG9mIGNsaWVudHMgZnJvbSB0aGUgaXRlbXMgY3VycmVudGx5IGxvYWRlZCwgZmlsdGVyZWQgYnkgT0VNL01vZGFsaXR5LlxyXG4gIC8vIGB0eXBlYCBpcyBcImZyb21cIiBvciBcImN1cnJlbnRcIiB0byBkZWNpZGUgd2hpY2ggY2xpZW50IHJlZiB0byByZWFkLlxyXG4gIGFzeW5jIGZ1bmN0aW9uIGJ1aWxkQ2xpZW50c0Zyb21JdGVtcyh0eXBlKSB7XG4gICAgY29uc3QgZGIgPSBmaXJlYmFzZS5maXJlc3RvcmUoKTtcbiAgICBjb25zdCBpZHMgPSBuZXcgU2V0KCk7XG5cbiAgICAvLyBSZXNwZWN0IGN1cnJlbnQgT0VNIC8gTW9kYWxpdHkgZmlsdGVycyB3aGVuIGRlcml2aW5nIGNsaWVudCBvcHRpb25zXG4gICAgY29uc3QgZmlsdGVyZWQgPSBhdWdtZW50ZWRJbmZvLmZpbHRlcigoaXRlbSkgPT4ge1xuICAgICAgY29uc3QgT0VNID0gZ2V0TWFjaGluZUZpZWxkKGl0ZW0sIFwiT0VNXCIpO1xuICAgICAgY29uc3QgTW9kYWxpdHkgPSBnZXRNYWNoaW5lRmllbGQoaXRlbSwgXCJNb2RhbGl0eVwiKTtcbiAgICAgIGlmIChzZWxlY3RlZE9FTSAmJiBub3JtYWxpemVUZXh0KE9FTSkgIT09IG5vcm1hbGl6ZVRleHQoc2VsZWN0ZWRPRU0pKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmIChcbiAgICAgICAgc2VsZWN0ZWRNb2RhbGl0eSAmJlxuICAgICAgICBub3JtYWxpemVUZXh0KE1vZGFsaXR5KSAhPT0gbm9ybWFsaXplVGV4dChzZWxlY3RlZE1vZGFsaXR5KVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0pO1xuXHJcbiAgICBmb3IgKGNvbnN0IGl0IG9mIGZpbHRlcmVkKSB7XHJcbiAgICAgIGNvbnN0IGlkID0gdHlwZSA9PT0gXCJmcm9tXCIgPyBpdC5jbGllbnRGcm9tSWQgOiBpdC5jbGllbnRDdXJyZW50SWQ7XHJcbiAgICAgIGlmIChpZCkgaWRzLmFkZChpZCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgb3V0ID0gW107XHJcbiAgICBjb25zdCBpZEFycmF5ID0gWy4uLmlkc107XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGlkQXJyYXkubGVuZ3RoOyBpICs9IDEwKSB7XHJcbiAgICAgIGNvbnN0IGNodW5rID0gaWRBcnJheS5zbGljZShpLCBpICsgMTApO1xyXG4gICAgICBjb25zdCBzbmFwID0gYXdhaXQgZGJcclxuICAgICAgICAuY29sbGVjdGlvbihcIkNsaWVudFwiKVxyXG4gICAgICAgIC53aGVyZShmaXJlYmFzZS5maXJlc3RvcmUuRmllbGRQYXRoLmRvY3VtZW50SWQoKSwgXCJpblwiLCBjaHVuaylcclxuICAgICAgICAuZ2V0KCk7XHJcbiAgICAgIHNuYXAuZm9yRWFjaCgoZG9jKSA9PiB7XHJcbiAgICAgICAgY29uc3QgZCA9IGRvYy5kYXRhKCkgfHwge307XHJcbiAgICAgICAgb3V0LnB1c2goeyBpZDogZG9jLmlkLCBuYW1lOiBkLm5hbWUgfHwgZG9jLmlkIH0pO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBzb3J0IGJ5IG5hbWUgZm9yIG5pY2VyIFVYXHJcbiAgICBvdXQuc29ydCgoYSwgYikgPT4gKGEubmFtZSB8fCBcIlwiKS5sb2NhbGVDb21wYXJlKGIubmFtZSB8fCBcIlwiKSk7XHJcbiAgICByZXR1cm4gb3V0O1xyXG4gIH1cclxuXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQ0xJRU5UIFNFTEVDVElPTiBIQU5ETElOR1xyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gVGhpcyBmdW5jdGlvbiBmZXRjaGVzIGNsaWVudHMgYW5kIG9wZW5zIHRoZSBjbGllbnQgbW9kYWwuXHJcbiAgY29uc3QgaGFuZGxlQ2xpZW50Q2xpY2sgPSBhc3luYyAoKSA9PiB7XHJcbiAgICBsZXQgc2FmZUNsaWVudHMgPSBbXTtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IGNsaWVudHNEYXRhID0gYXdhaXQgZmV0Y2hDbGllbnRzKHNlbGVjdGVkT0VNLCBzZWxlY3RlZE1vZGFsaXR5KTtcclxuICAgICAgc2FmZUNsaWVudHMgPSBBcnJheS5pc0FycmF5KGNsaWVudHNEYXRhKSA/IGNsaWVudHNEYXRhIDogW107XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJmZXRjaENsaWVudHMgZmFpbGVkOlwiLCBlKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBGYWxsYmFjayB0byBidWlsZGluZyBmcm9tIGxvYWRlZCBpdGVtcyBpZiBBUEkgZ2F2ZSB1cyBub3RoaW5nXHJcbiAgICBpZiAoc2FmZUNsaWVudHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgaWYgKCFjbGllbnRTZWxlY3Rpb25UeXBlKSB7XHJcbiAgICAgICAgICAvLyBpZiBzb21laG93IG5vdCBzZXQgeWV0LCBkZWZhdWx0IHRvIFwiZnJvbVwiXHJcbiAgICAgICAgICBzZXRDbGllbnRTZWxlY3Rpb25UeXBlKFwiZnJvbVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgZGVyaXZlZCA9IGF3YWl0IGJ1aWxkQ2xpZW50c0Zyb21JdGVtcyhjbGllbnRTZWxlY3Rpb25UeXBlIHx8IFwiZnJvbVwiKTtcclxuICAgICAgICBzYWZlQ2xpZW50cyA9IGRlcml2ZWQ7XHJcbiAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFsbGJhY2sgYnVpbGRDbGllbnRzRnJvbUl0ZW1zIGZhaWxlZDpcIiwgZSk7XHJcbiAgICAgICAgc2FmZUNsaWVudHMgPSBbXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNldENsaWVudHMoc2FmZUNsaWVudHMpO1xyXG4gICAgc2V0Q2xpZW50U2VhcmNoVGVybShcIlwiKTtcclxuICAgIHNldFNob3dDbGllbnRNb2RhbCh0cnVlKTtcclxuICB9O1xyXG5cclxuXHJcblxyXG4gIC8vIFdoZW4gYSBjbGllbnQgaXMgc2VsZWN0ZWQgaW4gdGhlIG1vZGFsLCB3ZSBub3cgYXNzdW1lIHRoZSBwYXJhbWV0ZXIgaXMgYSBjbGllbnQgSUQuXHJcbiAgLy8gSWYgdGhlIHBhc3NlZCB2YWx1ZSBpcyBudWxsLCB3ZSBjbGVhciB0aGUgc2VsZWN0aW9uLlxyXG4gIGNvbnN0IGhhbmRsZUNsaWVudFNlbGVjdCA9IGFzeW5jIChjbGllbnRJZCkgPT4ge1xyXG4gICAgY29uc29sZS5sb2coXCJVc2VyIHNlbGVjdGVkIGNsaWVudCBpZDpcIiwgY2xpZW50SWQpO1xyXG4gICAgaWYgKCFjbGllbnRJZCkge1xyXG4gICAgICBpZiAoY2xpZW50U2VsZWN0aW9uVHlwZSA9PT0gXCJmcm9tXCIpIHtcclxuICAgICAgICBzZXRDbGllbnRGcm9tQnV0dG9uVGV4dChcIlNlbGVjdCBPcHRpb25cIik7XHJcbiAgICAgICAgc2V0U2VsZWN0ZWRDbGllbnRGcm9tKG51bGwpO1xyXG4gICAgICB9IGVsc2UgaWYgKGNsaWVudFNlbGVjdGlvblR5cGUgPT09IFwiY3VycmVudFwiKSB7XHJcbiAgICAgICAgc2V0Q2xpZW50Q3VycmVudEJ1dHRvblRleHQoXCJTZWxlY3QgT3B0aW9uXCIpO1xyXG4gICAgICAgIHNldFNlbGVjdGVkQ2xpZW50Q3VycmVudChudWxsKTtcclxuICAgICAgfVxyXG4gICAgICBzZXRTaG93Q2xpZW50TW9kYWwoZmFsc2UpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBjbGllbnRTbmFwID0gYXdhaXQgZmlyZWJhc2UuZmlyZXN0b3JlKCkuY29sbGVjdGlvbihcIkNsaWVudFwiKS5kb2MoY2xpZW50SWQpLmdldCgpO1xyXG4gICAgICBpZiAoY2xpZW50U25hcC5leGlzdHMpIHtcclxuICAgICAgICBjb25zdCBjbGllbnREYXRhID0gY2xpZW50U25hcC5kYXRhKCk7XHJcbiAgICAgICAgaWYgKGNsaWVudFNlbGVjdGlvblR5cGUgPT09IFwiZnJvbVwiKSB7XHJcbiAgICAgICAgICBzZXRDbGllbnRGcm9tQnV0dG9uVGV4dChjbGllbnREYXRhLm5hbWUpO1xyXG4gICAgICAgICAgc2V0U2VsZWN0ZWRDbGllbnRGcm9tKGNsaWVudElkKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGNsaWVudFNlbGVjdGlvblR5cGUgPT09IFwiY3VycmVudFwiKSB7XHJcbiAgICAgICAgICBzZXRDbGllbnRDdXJyZW50QnV0dG9uVGV4dChjbGllbnREYXRhLm5hbWUpO1xyXG4gICAgICAgICAgc2V0U2VsZWN0ZWRDbGllbnRDdXJyZW50KGNsaWVudElkKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIk5vIGNsaWVudCBkb2N1bWVudCBmb3VuZCBmb3IgaWQ6XCIsIGNsaWVudElkKTtcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGZldGNoaW5nIGNsaWVudCBkYXRhOlwiLCBlcnJvcik7XHJcbiAgICB9XHJcbiAgICBzZXRTaG93Q2xpZW50TW9kYWwoZmFsc2UpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGhhbmRsZUNsaWVudEluZm8gPSAoY2xpZW50SWQsIGNsaWVudE5hbWUpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKGBDbGllbnQgSUQ6ICR7Y2xpZW50SWR9LCBDbGllbnQgTmFtZTogJHtjbGllbnROYW1lfWApO1xyXG4gICAgcm91dGVyLnB1c2goXCJjbGllbnQvXCIgKyBjbGllbnRJZCk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQ2xlYXJDbGllbnRTZWxlY3Rpb24gPSAoKSA9PiB7XHJcbiAgICBpZiAoY2xpZW50U2VsZWN0aW9uVHlwZSA9PT0gXCJmcm9tXCIpIHtcclxuICAgICAgc2V0Q2xpZW50RnJvbUJ1dHRvblRleHQoXCJTZWxlY3QgT3B0aW9uXCIpO1xyXG4gICAgICBzZXRTZWxlY3RlZENsaWVudEZyb20obnVsbCk7XHJcbiAgICB9IGVsc2UgaWYgKGNsaWVudFNlbGVjdGlvblR5cGUgPT09IFwiY3VycmVudFwiKSB7XHJcbiAgICAgIHNldENsaWVudEN1cnJlbnRCdXR0b25UZXh0KFwiU2VsZWN0IE9wdGlvblwiKTtcclxuICAgICAgc2V0U2VsZWN0ZWRDbGllbnRDdXJyZW50KG51bGwpO1xyXG4gICAgfVxyXG4gICAgc2V0U2hvd0NsaWVudE1vZGFsKGZhbHNlKTtcclxuICB9O1xyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIE1PREVMIFNFTEVDVElPTiBIQU5ETElOR1xyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgY29uc3QgW21vZGVscywgc2V0TW9kZWxzXSA9IHVzZVN0YXRlKFtdKTtcclxuICBjb25zdCBbc2hvd01vZGVsTW9kYWwsIHNldFNob3dNb2RlbE1vZGFsXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbbW9kZWxCdXR0b25UZXh0LCBzZXRNb2RlbEJ1dHRvblRleHRdID0gdXNlU3RhdGUoXCJTZWxlY3QgT3B0aW9uXCIpO1xyXG5cclxuICBjb25zdCBoYW5kbGVNb2RlbENsaWNrID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgY29uc3QgbW9kZWxzRGF0YSA9IGF3YWl0IGZldGNoTW9kZWxzKFxyXG4gICAgICBzZWxlY3RlZE9FTSxcclxuICAgICAgc2VsZWN0ZWRNb2RhbGl0eSxcclxuICAgICAgc2VsZWN0ZWRDbGllbnRGcm9tXHJcbiAgICApO1xyXG4gICAgc2V0TW9kZWxzKG1vZGVsc0RhdGEpO1xyXG4gICAgc2V0TW9kZWxTZWFyY2hUZXJtKFwiXCIpO1xyXG4gICAgc2V0U2hvd01vZGVsTW9kYWwodHJ1ZSk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaGFuZGxlTW9kZWxTZWxlY3QgPSAobW9kZWxOYW1lKSA9PiB7XHJcbiAgICBzZXRNb2RlbEJ1dHRvblRleHQobW9kZWxOYW1lIHx8IFwiU2VsZWN0IE9wdGlvblwiKTtcclxuICAgIHNldFNlbGVjdGVkTW9kZWwobW9kZWxOYW1lIHx8IG51bGwpO1xyXG4gICAgc2V0U2hvd01vZGVsTW9kYWwoZmFsc2UpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGhhbmRsZUNsZWFyTW9kZWxTZWxlY3Rpb24gPSAoKSA9PiB7XHJcbiAgICBzZXRNb2RlbEJ1dHRvblRleHQoXCJTZWxlY3QgT3B0aW9uXCIpO1xyXG4gICAgc2V0U2VsZWN0ZWRNb2RlbChudWxsKTtcclxuICAgIHNldFNob3dNb2RlbE1vZGFsKGZhbHNlKTtcclxuICB9O1xyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIFdBUkVIT1VTRSBCVVRUT05TIChmb3IgQ2xpZW50IEN1cnJlbnQpXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICBjb25zdCBoYW5kbGVTb0NhbFdhcmVob3VzZUNsaWNrID0gKCkgPT4ge1xyXG4gICAgc2V0Q2xpZW50Q3VycmVudEJ1dHRvblRleHQoXCJTb0NhbCBXYXJlaG91c2VcIik7XHJcbiAgICBzZXRTZWxlY3RlZENsaWVudEN1cnJlbnQoU09DQUxfQ0xJRU5UX0lEKTtcclxuICAgIGNvbnNvbGUubG9nKFwiV2FyZWhvdXNlIGJ1dHRvbiBjbGlja2VkOiBzZXR0aW5nIENsaWVudCBDdXJyZW50IHRvXCIsIFNPQ0FMX0NMSUVOVF9JRCk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaGFuZGxlTm9yQ2FsV2FyZWhvdXNlQ2xpY2sgPSAoKSA9PiB7XHJcbiAgICBzZXRDbGllbnRDdXJyZW50QnV0dG9uVGV4dChcIk5vckNhbCBXYXJlaG91c2VcIik7XHJcbiAgICBzZXRTZWxlY3RlZENsaWVudEN1cnJlbnQoTk9SQ0FMX0NMSUVOVF9JRCk7XHJcbiAgICBjb25zb2xlLmxvZyhcIldhcmVob3VzZSBidXR0b24gY2xpY2tlZDogc2V0dGluZyBDbGllbnQgQ3VycmVudCB0b1wiLCBOT1JDQUxfQ0xJRU5UX0lEKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBoYW5kbGVXYXJlaG91c2VVbmFzc2lnbmVkQ2xpY2sgPSAoKSA9PiB7XHJcbiAgICBzZXRDbGllbnRDdXJyZW50QnV0dG9uVGV4dChcIlVuYXNzaWduZWRcIik7XHJcbiAgICBzZXRTZWxlY3RlZENsaWVudEN1cnJlbnQoVU5BU1NJR05FRF9DTElFTlRfSUQpO1xyXG4gICAgY29uc29sZS5sb2coXCJXYXJlaG91c2UgYnV0dG9uIGNsaWNrZWQ6IHNldHRpbmcgQ2xpZW50IEN1cnJlbnQgdG9cIiwgVU5BU1NJR05FRF9DTElFTlRfSUQpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IFtjbGllbnRTZWFyY2hUZXJtLCBzZXRDbGllbnRTZWFyY2hUZXJtXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFttb2RlbFNlYXJjaFRlcm0sIHNldE1vZGVsU2VhcmNoVGVybV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuXHJcbiAgY29uc3QgZGVsZXRlRnJvbVN0b3JhZ2UgPSBhc3luYyAoaXRlbUlkKSA9PiB7XHJcbiAgICBjb25zdCBzdG9yYWdlUmVmID0gZmlyZWJhc2Uuc3RvcmFnZSgpLnJlZigpO1xyXG4gICAgY29uc3QgZm9sZGVyUmVmID0gc3RvcmFnZVJlZi5jaGlsZChgUGFydHMvJHtpdGVtSWR9L2ApO1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgbGlzdFJlc3VsdCA9IGF3YWl0IGZvbGRlclJlZi5saXN0QWxsKCk7XHJcbiAgICAgIGNvbnN0IGRlbGV0ZVByb21pc2VzID0gbGlzdFJlc3VsdC5pdGVtcy5tYXAoKGl0ZW0pID0+IGl0ZW0uZGVsZXRlKCkpO1xyXG4gICAgICBhd2FpdCBQcm9taXNlLmFsbChkZWxldGVQcm9taXNlcyk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZGVsZXRpbmcgZnJvbSBzdG9yYWdlOlwiLCBlcnJvcik7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgZGVsZXRlRnJvbVBhcnRzQ29sbGVjdGlvbiA9IGFzeW5jIChpdGVtSWQpID0+IHtcclxuICAgIGNvbnN0IGRiID0gZmlyZWJhc2UuZmlyZXN0b3JlKCk7XHJcbiAgICB0cnkge1xyXG4gICAgICBhd2FpdCBkYi5jb2xsZWN0aW9uKFwiUGFydHNcIikuZG9jKGl0ZW1JZCkuZGVsZXRlKCk7XHJcbiAgICAgIGNvbnNvbGUubG9nKGBEZWxldGVkIGl0ZW0gZnJvbSBQYXJ0cyBjb2xsZWN0aW9uOiAke2l0ZW1JZH1gKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBkZWxldGluZyBmcm9tIFBhcnRzIGNvbGxlY3Rpb246XCIsIGVycm9yKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICAvLyAgIC8vIFNhZmVseSBjb252ZXJ0IGFueSBkYXRlLWlzaCB2YWx1ZSBpbnRvIGEgY29tcGFyYWJsZSB0aW1lc3RhbXAgKG1zIHNpbmNlIGVwb2NoKS5cclxuICAvLyBmdW5jdGlvbiB0b1RpbWUodmFsdWUpIHtcclxuICAvLyAgIGlmICghdmFsdWUpIHJldHVybiBudWxsO1xyXG5cclxuICAvLyAgIC8vIEZpcmVzdG9yZSBUaW1lc3RhbXA6IHsgc2Vjb25kcywgbmFub3NlY29uZHMgfVxyXG4gIC8vICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJiB2YWx1ZS5zZWNvbmRzKSB7XHJcbiAgLy8gICAgIHRyeSB7XHJcbiAgLy8gICAgICAgcmV0dXJuIHZhbHVlLnNlY29uZHMgKiAxMDAwO1xyXG4gIC8vICAgICB9IGNhdGNoIHsgLyogZmFsbHRocm91Z2ggKi8gfVxyXG4gIC8vICAgfVxyXG5cclxuICAvLyAgIC8vIElmIGFscmVhZHkgYSBEYXRlXHJcbiAgLy8gICBpZiAodmFsdWUgaW5zdGFuY2VvZiBEYXRlKSByZXR1cm4gaXNOYU4odmFsdWUuZ2V0VGltZSgpKSA/IG51bGwgOiB2YWx1ZS5nZXRUaW1lKCk7XHJcblxyXG4gIC8vICAgLy8gSWYgc3RyaW5nOiB0cnkgSVNPIGZpcnN0XHJcbiAgLy8gICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB7XHJcbiAgLy8gICAgIC8vIHl5eXktbW0tZGQgKGZyb20geW91ciBmb3JtIGlucHV0cylcclxuICAvLyAgICAgY29uc3QgaXNvID0gRGF0ZS5wYXJzZSh2YWx1ZSk7XHJcbiAgLy8gICAgIGlmICghaXNOYU4oaXNvKSkgcmV0dXJuIGlzbztcclxuXHJcbiAgLy8gICAgIC8vIG1tL2RkL3l5eXkgZmFsbGJhY2sgKG9sZGVyIGl0ZW1zKVxyXG4gIC8vICAgICBjb25zdCBwYXJ0cyA9IHZhbHVlLnNwbGl0KFwiL1wiKTtcclxuICAvLyAgICAgaWYgKHBhcnRzLmxlbmd0aCA9PT0gMykge1xyXG4gIC8vICAgICAgIGNvbnN0IFttbSwgZGQsIHl5eXldID0gcGFydHM7XHJcbiAgLy8gICAgICAgY29uc3QgYWx0ID0gRGF0ZS5wYXJzZShgJHt5eXl5fS0ke21tfS0ke2RkfWApO1xyXG4gIC8vICAgICAgIGlmICghaXNOYU4oYWx0KSkgcmV0dXJuIGFsdDtcclxuICAvLyAgICAgfVxyXG4gIC8vICAgfVxyXG5cclxuICAvLyAgIC8vIENhbm9uaWNhbGl6ZSBhbnkgZGF0ZS1pc2ggdmFsdWUgdG8gJ3l5eXktbW0tZGQnIHNvIGl0IG1hdGNoZXMgPGlucHV0IHR5cGU9XCJkYXRlXCI+IHZhbHVlc1xyXG4gIC8vICAgZnVuY3Rpb24gdG9ZTUQodmFsdWUpIHtcclxuICAvLyAgICAgY29uc3QgdCA9IHRvVGltZSh2YWx1ZSk7XHJcbiAgLy8gICAgIGlmICh0ID09IG51bGwpIHJldHVybiBudWxsO1xyXG4gIC8vICAgICBjb25zdCBkID0gbmV3IERhdGUodCk7XHJcbiAgLy8gICAgIGNvbnN0IHl5eXkgPSBkLmdldEZ1bGxZZWFyKCk7XHJcbiAgLy8gICAgIGNvbnN0IG1tID0gU3RyaW5nKGQuZ2V0TW9udGgoKSArIDEpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcclxuICAvLyAgICAgY29uc3QgZGQgPSBTdHJpbmcoZC5nZXREYXRlKCkpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcclxuICAvLyAgICAgcmV0dXJuIGAke3l5eXl9LSR7bW19LSR7ZGR9YDtcclxuICAvLyAgIH1cclxuXHJcblxyXG4gIC8vICAgLy8gTGFzdCByZXNvcnRcbiAgLy8gICBjb25zdCB0ID0gRGF0ZS5wYXJzZSh2YWx1ZSk7XG4gIC8vICAgcmV0dXJuIGlzTmFOKHQpID8gbnVsbCA6IHQ7XG4gIC8vIH1cblxuICBjb25zdCB0b3RhbEtub3duUGFnZXMgPSBNYXRoLm1heChcbiAgICAxLFxuICAgIHBhZ2VDdXJzb3JzLmZpbHRlcihCb29sZWFuKS5sZW5ndGggKyAoaGFzTmV4dFBhZ2UgPyAxIDogMClcbiAgKTtcbiAgY29uc3QgcGFnZUJ1dHRvbnMgPSAoKCkgPT4ge1xuICAgIGNvbnN0IGJ1dHRvbnMgPSBbXTtcbiAgICBjb25zdCBtYXhWaXNpYmxlID0gNztcblxuICAgIGNvbnN0IHB1c2hQYWdlID0gKHApID0+XG4gICAgICBidXR0b25zLnB1c2goXG4gICAgICAgIDxQYWdpbmF0aW9uLkl0ZW1cbiAgICAgICAgICBrZXk9e2BwYWdlLSR7cH1gfVxuICAgICAgICAgIGFjdGl2ZT17cCA9PT0gcGFnZX1cbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRQYWdlKHApfVxuICAgICAgICA+XG4gICAgICAgICAge3B9XG4gICAgICAgIDwvUGFnaW5hdGlvbi5JdGVtPlxuICAgICAgKTtcblxuICAgIGNvbnN0IHB1c2hFbGxpcHNpcyA9IChrZXkpID0+XG4gICAgICBidXR0b25zLnB1c2goPFBhZ2luYXRpb24uRWxsaXBzaXMga2V5PXtrZXl9IGRpc2FibGVkIC8+KTtcblxuICAgIGlmICh0b3RhbEtub3duUGFnZXMgPD0gbWF4VmlzaWJsZSkge1xuICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gdG90YWxLbm93blBhZ2VzOyBpICs9IDEpIHB1c2hQYWdlKGkpO1xuICAgICAgcmV0dXJuIGJ1dHRvbnM7XG4gICAgfVxuXG4gICAgbGV0IHN0YXJ0ID0gTWF0aC5tYXgoMiwgcGFnZSAtIDEpO1xuICAgIGxldCBlbmQgPSBNYXRoLm1pbih0b3RhbEtub3duUGFnZXMgLSAxLCBwYWdlICsgMSk7XG5cbiAgICBjb25zdCBkZXNpcmVkV2luZG93ID0gbWF4VmlzaWJsZSAtIDI7XG4gICAgbGV0IGN1cnJlbnRXaW5kb3cgPSBlbmQgLSBzdGFydCArIDE7XG4gICAgbGV0IHJlbWFpbmluZyA9IGRlc2lyZWRXaW5kb3cgLSBjdXJyZW50V2luZG93O1xuXG4gICAgd2hpbGUgKHJlbWFpbmluZyA+IDApIHtcbiAgICAgIGlmIChzdGFydCA+IDIpIHtcbiAgICAgICAgc3RhcnQgLT0gMTtcbiAgICAgICAgcmVtYWluaW5nIC09IDE7XG4gICAgICB9XG4gICAgICBpZiAocmVtYWluaW5nID4gMCAmJiBlbmQgPCB0b3RhbEtub3duUGFnZXMgLSAxKSB7XG4gICAgICAgIGVuZCArPSAxO1xuICAgICAgICByZW1haW5pbmcgLT0gMTtcbiAgICAgIH1cbiAgICAgIGlmIChzdGFydCA9PT0gMiAmJiBlbmQgPT09IHRvdGFsS25vd25QYWdlcyAtIDEpIGJyZWFrO1xuICAgIH1cblxuICAgIHB1c2hQYWdlKDEpO1xuICAgIGlmIChzdGFydCA+IDIpIHB1c2hFbGxpcHNpcyhcInN0YXJ0LWVsbGlwc2lzXCIpO1xuICAgIGZvciAobGV0IGkgPSBzdGFydDsgaSA8PSBlbmQ7IGkgKz0gMSkgcHVzaFBhZ2UoaSk7XG4gICAgaWYgKGVuZCA8IHRvdGFsS25vd25QYWdlcyAtIDEpIHB1c2hFbGxpcHNpcyhcImVuZC1lbGxpcHNpc1wiKTtcbiAgICBwdXNoUGFnZSh0b3RhbEtub3duUGFnZXMpO1xuICAgIGlmIChoYXNOZXh0UGFnZSkgcHVzaEVsbGlwc2lzKFwibW9yZS1lbGxpcHNpc1wiKTtcblxuICAgIHJldHVybiBidXR0b25zO1xuICB9KSgpO1xuXG4gIGNvbnN0IHJlY2FsY1BhZ2VTaXplID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm47XG4gICAgaWYgKHBhZ2UgIT09IDEpIHJldHVybjtcbiAgICBpZiAoIXRhYmxlQm9keVJlZi5jdXJyZW50KSByZXR1cm47XG4gICAgY29uc3QgY29udGFpbmVySGVpZ2h0ID1cbiAgICAgIHRhYmxlQm9keVJlZi5jdXJyZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodCB8fCAwO1xuICAgIGlmICghY29udGFpbmVySGVpZ2h0KSByZXR1cm47XG5cbiAgICBjb25zdCBoZWFkZXJSb3cgPVxuICAgICAgdGFibGVCb2R5UmVmLmN1cnJlbnQucXVlcnlTZWxlY3RvcihcInRhYmxlIHRoZWFkIHRyXCIpIHx8XG4gICAgICB0YWJsZUJvZHlSZWYuY3VycmVudC5xdWVyeVNlbGVjdG9yKFwidGhlYWQgdHJcIik7XG4gICAgY29uc3QgYm9keVJvdyA9XG4gICAgICB0YWJsZUJvZHlSZWYuY3VycmVudC5xdWVyeVNlbGVjdG9yKFwidGFibGUgdGJvZHkgdHJcIikgfHxcbiAgICAgIHRhYmxlQm9keVJlZi5jdXJyZW50LnF1ZXJ5U2VsZWN0b3IoXCJ0Ym9keSB0clwiKTtcblxuICAgIGlmIChoZWFkZXJSb3cpIHtcbiAgICAgIGNvbnN0IGggPSBoZWFkZXJSb3cuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xuICAgICAgaWYgKGgpIGhlYWRlckhlaWdodFJlZi5jdXJyZW50ID0gaDtcbiAgICB9XG4gICAgaWYgKGJvZHlSb3cpIHtcbiAgICAgIGNvbnN0IHIgPSBib2R5Um93LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcbiAgICAgIGlmIChyKSByb3dIZWlnaHRSZWYuY3VycmVudCA9IHI7XG4gICAgfVxuXG4gICAgY29uc3QgdmVydGljYWxQYWRkaW5nID0gMjQ7XG4gICAgY29uc3QgYXZhaWxhYmxlID1cbiAgICAgIGNvbnRhaW5lckhlaWdodCAtIGhlYWRlckhlaWdodFJlZi5jdXJyZW50IC0gdmVydGljYWxQYWRkaW5nO1xuICAgIGNvbnN0IGVzdGltYXRlZCA9IE1hdGguZmxvb3IoYXZhaWxhYmxlIC8gcm93SGVpZ2h0UmVmLmN1cnJlbnQpO1xuICAgIGNvbnN0IGNsYW1wZWQgPSBNYXRoLm1heCg1LCBNYXRoLm1pbig1MCwgZXN0aW1hdGVkKSk7XG4gICAgaWYgKGNsYW1wZWQgPiAwICYmIGNsYW1wZWQgIT09IHBhZ2VTaXplKSB7XG4gICAgICBzZXRQYWdlU2l6ZShjbGFtcGVkKTtcbiAgICAgIHJlc2V0UGFnaW5hdGlvbigpO1xuICAgICAgc2V0UXVlcnlFcG9jaCgodikgPT4gdiArIDEpO1xuICAgIH1cbiAgfSwgW3BhZ2UsIHBhZ2VTaXplXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuO1xuICAgIHJlY2FsY1BhZ2VTaXplKCk7XG4gICAgY29uc3Qgb25SZXNpemUgPSAoKSA9PiByZWNhbGNQYWdlU2l6ZSgpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIG9uUmVzaXplKTtcbiAgICByZXR1cm4gKCkgPT4gd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgb25SZXNpemUpO1xuICB9LCBbcmVjYWxjUGFnZVNpemVdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChpc0xvYWRpbmcgfHwgcGFnZSAhPT0gMSkgcmV0dXJuO1xuICAgIHJlY2FsY1BhZ2VTaXplKCk7XG4gIH0sIFtwYWdlLCBpc0xvYWRpbmcsIHJlY2FsY1BhZ2VTaXplXSk7XG5cbiAgY29uc3QgcmVuZGVyRmlsdGVycyA9IChpZFByZWZpeCkgPT4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuZmlsdGVyc1BhbmVsfT5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuZmlsdGVyc0hlYWRlcn0+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5maWx0ZXJzVGl0bGV9PkZpbHRlcnM8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmZpbHRlcnNTdWJ0aXRsZX0+XG4gICAgICAgICAgICBOYXJyb3cgcmVzdWx0cyBieSBtYWNoaW5lLCBjbGllbnQsIG9yIHdhcmVob3VzZS5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHtoYXNBY3RpdmVGaWx0ZXJzID8gKFxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17c3R5bGVzLmZpbHRlcnNCYWRnZX0+QWN0aXZlPC9zcGFuPlxuICAgICAgICApIDogbnVsbH1cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmZpbHRlclNlY3Rpb259PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmZpbHRlclNlY3Rpb25UaXRsZX0+TWFjaGluZTwvZGl2PlxuICAgICAgICA8SW5wdXRHcm91cCBjbGFzc05hbWU9e3N0eWxlcy5pbnB1dEdyb3VwfT5cbiAgICAgICAgICA8SW5wdXRHcm91cC5UZXh0Pk9FTTwvSW5wdXRHcm91cC5UZXh0PlxuICAgICAgICAgIDxEcm9wZG93biBvblNlbGVjdD17aGFuZGxlU2VsZWN0MX0gY2xhc3NOYW1lPVwidy0xMDBcIj5cbiAgICAgICAgICAgIDxEcm9wZG93bi5Ub2dnbGVcbiAgICAgICAgICAgICAgdmFyaWFudD1cIm91dGxpbmUtc2Vjb25kYXJ5XCJcbiAgICAgICAgICAgICAgaWQ9e2Ake2lkUHJlZml4fS1vZW1gfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2B3LTEwMCAke3N0eWxlcy5pbnB1dEJ1dHRvbn1gfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7ZHJvcGRvd24xVGV4dH1cbiAgICAgICAgICAgIDwvRHJvcGRvd24uVG9nZ2xlPlxuICAgICAgICAgICAgPERyb3Bkb3duLk1lbnUgY2xhc3NOYW1lPVwidy0xMDBcIj5cbiAgICAgICAgICAgICAgPERyb3Bkb3duLkl0ZW0gZXZlbnRLZXk9XCJ1bmFzc2lnbmVkXCI+U2VsZWN0IE9wdGlvbjwvRHJvcGRvd24uSXRlbT5cbiAgICAgICAgICAgICAgPERyb3Bkb3duLkl0ZW0gZXZlbnRLZXk9XCJHRVwiPkdFPC9Ecm9wZG93bi5JdGVtPlxuICAgICAgICAgICAgICA8RHJvcGRvd24uSXRlbSBldmVudEtleT1cIlRvc2hpYmFcIj5Ub3NoaWJhPC9Ecm9wZG93bi5JdGVtPlxuICAgICAgICAgICAgICA8RHJvcGRvd24uSXRlbSBldmVudEtleT1cIlNpZW1lbnNcIj5TaWVtZW5zPC9Ecm9wZG93bi5JdGVtPlxuICAgICAgICAgICAgICA8RHJvcGRvd24uSXRlbSBldmVudEtleT1cIlBoaWxpcHNcIj5QaGlsaXBzPC9Ecm9wZG93bi5JdGVtPlxuICAgICAgICAgICAgPC9Ecm9wZG93bi5NZW51PlxuICAgICAgICAgIDwvRHJvcGRvd24+XG4gICAgICAgIDwvSW5wdXRHcm91cD5cblxuICAgICAgICA8SW5wdXRHcm91cCBjbGFzc05hbWU9e3N0eWxlcy5pbnB1dEdyb3VwfT5cbiAgICAgICAgICA8SW5wdXRHcm91cC5UZXh0Pk1vZGFsaXR5PC9JbnB1dEdyb3VwLlRleHQ+XG4gICAgICAgICAgPERyb3Bkb3duIG9uU2VsZWN0PXtoYW5kbGVTZWxlY3QyfSBjbGFzc05hbWU9XCJ3LTEwMFwiPlxuICAgICAgICAgICAgPERyb3Bkb3duLlRvZ2dsZVxuICAgICAgICAgICAgICB2YXJpYW50PVwib3V0bGluZS1zZWNvbmRhcnlcIlxuICAgICAgICAgICAgICBpZD17YCR7aWRQcmVmaXh9LW1vZGFsaXR5YH1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdy0xMDAgJHtzdHlsZXMuaW5wdXRCdXR0b259YH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge2Ryb3Bkb3duMlRleHR9XG4gICAgICAgICAgICA8L0Ryb3Bkb3duLlRvZ2dsZT5cbiAgICAgICAgICAgIDxEcm9wZG93bi5NZW51IGNsYXNzTmFtZT1cInctMTAwXCI+XG4gICAgICAgICAgICAgIDxEcm9wZG93bi5JdGVtIGV2ZW50S2V5PVwidW5hc3NpZ25lZFwiPlNlbGVjdCBPcHRpb248L0Ryb3Bkb3duLkl0ZW0+XG4gICAgICAgICAgICAgIDxEcm9wZG93bi5JdGVtIGV2ZW50S2V5PVwiQ1RcIj5DVDwvRHJvcGRvd24uSXRlbT5cbiAgICAgICAgICAgICAgPERyb3Bkb3duLkl0ZW0gZXZlbnRLZXk9XCJNUklcIj5NUkk8L0Ryb3Bkb3duLkl0ZW0+XG4gICAgICAgICAgICA8L0Ryb3Bkb3duLk1lbnU+XG4gICAgICAgICAgPC9Ecm9wZG93bj5cbiAgICAgICAgPC9JbnB1dEdyb3VwPlxuXG4gICAgICAgIDxJbnB1dEdyb3VwIGNsYXNzTmFtZT17c3R5bGVzLmlucHV0R3JvdXB9PlxuICAgICAgICAgIDxJbnB1dEdyb3VwLlRleHQ+TW9kZWw8L0lucHV0R3JvdXAuVGV4dD5cbiAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICB2YXJpYW50PVwib3V0bGluZS1zZWNvbmRhcnlcIlxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgdy0xMDAgJHtzdHlsZXMuaW5wdXRCdXR0b259YH1cbiAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZU1vZGVsQ2xpY2t9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge21vZGVsQnV0dG9uVGV4dH1cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgPC9JbnB1dEdyb3VwPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuZmlsdGVyU2VjdGlvbn0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuZmlsdGVyU2VjdGlvblRpdGxlfT5DbGllbnQ8L2Rpdj5cbiAgICAgICAgPElucHV0R3JvdXAgY2xhc3NOYW1lPXtzdHlsZXMuaW5wdXRHcm91cH0+XG4gICAgICAgICAgPElucHV0R3JvdXAuVGV4dD5DbGllbnQgRnJvbTwvSW5wdXRHcm91cC5UZXh0PlxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIHZhcmlhbnQ9XCJvdXRsaW5lLXNlY29uZGFyeVwiXG4gICAgICAgICAgICBjbGFzc05hbWU9e2B3LTEwMCAke3N0eWxlcy5pbnB1dEJ1dHRvbn1gfVxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlQ2xpZW50Q2xpY2soXCJmcm9tXCIpfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtjbGllbnRGcm9tQnV0dG9uVGV4dH1cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgPC9JbnB1dEdyb3VwPlxuXG4gICAgICAgIDxJbnB1dEdyb3VwIGNsYXNzTmFtZT17c3R5bGVzLmlucHV0R3JvdXB9PlxuICAgICAgICAgIDxJbnB1dEdyb3VwLlRleHQ+Q2xpZW50IEN1cnJlbnQ8L0lucHV0R3JvdXAuVGV4dD5cbiAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICB2YXJpYW50PVwib3V0bGluZS1zZWNvbmRhcnlcIlxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgdy0xMDAgJHtzdHlsZXMuaW5wdXRCdXR0b259YH1cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZUNsaWVudENsaWNrKFwiY3VycmVudFwiKX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7Y2xpZW50Q3VycmVudEJ1dHRvblRleHR9XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgIDwvSW5wdXRHcm91cD5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmZpbHRlclNlY3Rpb259PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmZpbHRlclNlY3Rpb25UaXRsZX0+V2FyZWhvdXNlPC9kaXY+XG4gICAgICAgIDxJbnB1dEdyb3VwIGNsYXNzTmFtZT17c3R5bGVzLmlucHV0R3JvdXB9PlxuICAgICAgICAgIDxJbnB1dEdyb3VwLlRleHQ+UXVpY2s8L0lucHV0R3JvdXAuVGV4dD5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmJ1dHRvbkdyb3VwfT5cbiAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgdmFyaWFudD1cIm91dGxpbmUtc2Vjb25kYXJ5XCJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMuZmxleEJ1dHRvbn1cbiAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlU29DYWxXYXJlaG91c2VDbGlja31cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgU29DYWwgV2FyZWhvdXNlXG4gICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgdmFyaWFudD1cIm91dGxpbmUtc2Vjb25kYXJ5XCJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMuZmxleEJ1dHRvbn1cbiAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlTm9yQ2FsV2FyZWhvdXNlQ2xpY2t9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIE5vckNhbCBXYXJlaG91c2VcbiAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICB2YXJpYW50PVwib3V0bGluZS1zZWNvbmRhcnlcIlxuICAgICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5mbGV4QnV0dG9ufVxuICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVXYXJlaG91c2VVbmFzc2lnbmVkQ2xpY2t9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIFVuYXNzaWduZWRcbiAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L0lucHV0R3JvdXA+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcblxuXG4gIHJldHVybiAoXG4gICAgPExvZ2dlZEluPlxuICAgICAgeyhpc0RlbGV0aW5nIHx8IGlzTmF2aWdhdGluZykgJiYgKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmxvYWRpbmdPdmVybGF5fT5cbiAgICAgICAgICA8aW1nXG4gICAgICAgICAgICBzcmM9XCIvbWFnbW8tbG9nby5wbmdcIlxuICAgICAgICAgICAgYWx0PVwiTG9hZGluZyBNYWdtb1wiXG4gICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5sb2FkaW5nTG9nb31cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG4gICAgICA8TW9kYWwgc2hvdz17c2hvd0RlbGV0ZU1vZGFsfSBvbkhpZGU9e2hhbmRsZUNsb3NlRGVsZXRlTW9kYWx9PlxyXG4gICAgICAgIDxNb2RhbC5IZWFkZXIgY2xvc2VCdXR0b24+XHJcbiAgICAgICAgICA8TW9kYWwuVGl0bGU+Q29uZmlybSBEZWxldGlvbjwvTW9kYWwuVGl0bGU+XHJcbiAgICAgICAgPC9Nb2RhbC5IZWFkZXI+XHJcbiAgICAgICAgPE1vZGFsLkJvZHk+XHJcbiAgICAgICAgICBBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIHtzZWxlY3RlZEl0ZW1zLmxlbmd0aH0gaXRlbVxyXG4gICAgICAgICAge3NlbGVjdGVkSXRlbXMubGVuZ3RoID4gMSA/IFwic1wiIDogXCJcIn0/XHJcbiAgICAgICAgPC9Nb2RhbC5Cb2R5PlxyXG4gICAgICAgIDxNb2RhbC5Gb290ZXI+XHJcbiAgICAgICAgICA8QnV0dG9uIHZhcmlhbnQ9XCJkYW5nZXJcIiBvbkNsaWNrPXtoYW5kbGVEZWxldGVTZWxlY3RlZH0+XHJcbiAgICAgICAgICAgIFllcywgZGVsZXRlXHJcbiAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICAgIDxCdXR0b24gdmFyaWFudD1cInNlY29uZGFyeVwiIG9uQ2xpY2s9e2hhbmRsZUNsb3NlRGVsZXRlTW9kYWx9PlxyXG4gICAgICAgICAgICBDYW5jZWxcclxuICAgICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICAgIDwvTW9kYWwuRm9vdGVyPlxyXG4gICAgICA8L01vZGFsPlxyXG5cclxuICAgICAgPE1vZGFsIHNob3c9e3Nob3dDbGllbnRNb2RhbH0gb25IaWRlPXsoKSA9PiBzZXRTaG93Q2xpZW50TW9kYWwoZmFsc2UpfT5cclxuICAgICAgICA8TW9kYWwuSGVhZGVyIGNsb3NlQnV0dG9uPlxyXG4gICAgICAgICAgPE1vZGFsLlRpdGxlPlxyXG4gICAgICAgICAgICBTZWxlY3Qge2NsaWVudFNlbGVjdGlvblR5cGUgPT09IFwiZnJvbVwiID8gXCJDbGllbnQgRnJvbVwiIDogXCJDbGllbnQgQ3VycmVudFwifVxyXG4gICAgICAgICAgPC9Nb2RhbC5UaXRsZT5cclxuICAgICAgICA8L01vZGFsLkhlYWRlcj5cclxuICAgICAgICA8TW9kYWwuQm9keT5cclxuICAgICAgICAgIDxGb3JtQ29udHJvbFxyXG4gICAgICAgICAgICB0eXBlPVwidGV4dFwiXHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoIGJ5IG5hbWVcIlxyXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJtYi0zXCJcclxuICAgICAgICAgICAgdmFsdWU9e2NsaWVudFNlYXJjaFRlcm19XHJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0Q2xpZW50U2VhcmNoVGVybShlLnRhcmdldC52YWx1ZSl9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICAgPENsaWVudFRhYmxlXHJcbiAgICAgICAgICAgIGNsaWVudHM9eyhBcnJheS5pc0FycmF5KGNsaWVudHMpID8gY2xpZW50cyA6IFtdKS5maWx0ZXIoXHJcbiAgICAgICAgICAgICAgKGNsaWVudCkgPT4gKGNsaWVudD8ubmFtZSA/PyBcIlwiKS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKGNsaWVudFNlYXJjaFRlcm0udG9Mb3dlckNhc2UoKSlcclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgb25TZWxlY3RDbGllbnQ9e2hhbmRsZUNsaWVudFNlbGVjdH1cclxuICAgICAgICAgICAgb25JbmZvQ2xpY2s9e2hhbmRsZUNsaWVudEluZm99XHJcbiAgICAgICAgICAgIGlzQ2xpZW50U2VhcmNoPXtmYWxzZX1cclxuICAgICAgICAgICAgY2xlYXJTZWxlY3Rpb249eygpID0+IGhhbmRsZUNsaWVudFNlbGVjdChudWxsKX1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgPC9Nb2RhbC5Cb2R5PlxyXG4gICAgICA8L01vZGFsPlxyXG5cclxuICAgICAgPE1vZGFsIHNob3c9e3Nob3dNb2RlbE1vZGFsfSBvbkhpZGU9eygpID0+IHNldFNob3dNb2RlbE1vZGFsKGZhbHNlKX0+XHJcbiAgICAgICAgPE1vZGFsLkhlYWRlciBjbG9zZUJ1dHRvbj5cclxuICAgICAgICAgIDxNb2RhbC5UaXRsZT5TZWxlY3QgTW9kZWw8L01vZGFsLlRpdGxlPlxyXG4gICAgICAgIDwvTW9kYWwuSGVhZGVyPlxyXG4gICAgICAgIDxNb2RhbC5Cb2R5PlxyXG4gICAgICAgICAgPEZvcm1Db250cm9sXHJcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJTZWFyY2ggYnkgbmFtZVwiXHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1iLTNcIlxyXG4gICAgICAgICAgICB2YWx1ZT17bW9kZWxTZWFyY2hUZXJtfVxyXG4gICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldE1vZGVsU2VhcmNoVGVybShlLnRhcmdldC52YWx1ZSl9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICAgPE1vZGVsVGFibGVcclxuICAgICAgICAgICAgbW9kZWxzPXttb2RlbHMuZmlsdGVyKChtb2RlbCkgPT5cclxuICAgICAgICAgICAgICB0eXBlb2YgbW9kZWwgPT09IFwic3RyaW5nXCJcclxuICAgICAgICAgICAgICAgID8gbW9kZWwudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhtb2RlbFNlYXJjaFRlcm0udG9Mb3dlckNhc2UoKSlcclxuICAgICAgICAgICAgICAgIDogZmFsc2VcclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgb25TZWxlY3RNb2RlbD17aGFuZGxlTW9kZWxTZWxlY3R9XHJcbiAgICAgICAgICAgIGNsZWFyU2VsZWN0aW9uPXsoKSA9PiBoYW5kbGVNb2RlbFNlbGVjdChudWxsKX1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgPC9Nb2RhbC5Cb2R5PlxyXG4gICAgICA8L01vZGFsPlxyXG5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5wYWdlfT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5wYWdlSW5uZXJ9PlxuICAgICAgICAgIDxoZWFkZXIgY2xhc3NOYW1lPXtzdHlsZXMuaGVhZGVyfT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuaGVhZGVyTGVmdH0+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5idXJnZXJ9XG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0U2hvd0ZpbHRlcnModHJ1ZSl9XG4gICAgICAgICAgICAgICAgYXJpYS1sYWJlbD1cIk9wZW4gZmlsdGVyc1wiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8c3Bhbj48L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4+PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuPjwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuYnJhbmR9PlxuICAgICAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgICAgIHNyYz1cIi9tYWdtby1sb2dvLnBuZ1wiXG4gICAgICAgICAgICAgICAgICBhbHQ9XCJNYWdtb1wiXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5icmFuZExvZ299XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5icmFuZE5hbWV9Pk1hZ21vPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmJyYW5kU3VifT5JbnZlbnRvcnkgU2VhcmNoPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmhlYWRlclJpZ2h0fT5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5oZWFkZXJTdGF0dXN9PlxuICAgICAgICAgICAgICAgIHtoYXNBY3RpdmVGaWx0ZXJzID8gXCJGaWx0ZXJzIGFjdGl2ZVwiIDogXCJBbGwgaXRlbXNcIn1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2hlYWRlcj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuY29udGVudH0+XG4gICAgICAgICAgICA8YXNpZGUgY2xhc3NOYW1lPXtzdHlsZXMuc2lkZWJhcn0+e3JlbmRlckZpbHRlcnMoXCJzaWRlYmFyXCIpfTwvYXNpZGU+XG4gICAgICAgICAgICA8bWFpbiBjbGFzc05hbWU9e3N0eWxlcy5tYWlufT5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy50YWJsZUNhcmR9PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMudGFibGVIZWFkZXJ9PlxuICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy50YWJsZVRpdGxlfT5JdGVtczwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnRhYmxlU3VidGl0bGV9PlxuICAgICAgICAgICAgICAgICAgICAgIHtpc0xvYWRpbmcgPyBcIkxvYWRpbmcgaXRlbXNcIiA6IGAke2luZm8ubGVuZ3RofSBpdGVtcyBvbiB0aGlzIHBhZ2VgfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy50YWJsZU1ldGF9PlxuICAgICAgICAgICAgICAgICAgICBQYWdlIHtwYWdlfSB7aGFzTmV4dFBhZ2UgPyBgb2YgJHt0b3RhbEtub3duUGFnZXN9K2AgOiBgb2YgJHt0b3RhbEtub3duUGFnZXN9YH1cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy50YWJsZUJvZHl9IHJlZj17dGFibGVCb2R5UmVmfT5cbiAgICAgICAgICAgICAgICAgIHtpc0xvYWRpbmcgPyAoXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubG9hZGluZ1N0YXRlfT5cbiAgICAgICAgICAgICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgICAgICAgICAgICBzcmM9XCIvbWFnbW8tbG9nby5wbmdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgYWx0PVwiTG9hZGluZyBNYWdtb1wiXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5sb2FkaW5nTG9nb31cbiAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubG9hZGluZ1RleHR9PkxvYWRpbmc8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICApIDogbG9hZEVycm9yID8gKFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmVycm9yU3RhdGV9PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuZXJyb3JUaXRsZX0+XG4gICAgICAgICAgICAgICAgICAgICAgICBMb2FkIGZhaWxlZCAoe2xvYWRFcnJvci5jb2RlfSlcbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmVycm9yTWVzc2FnZX0+e2xvYWRFcnJvci5tZXNzYWdlfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhbnQ9XCJvdXRsaW5lLXNlY29uZGFyeVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBzaXplPVwic21cIlxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICByZXNldFBhZ2luYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0UXVlcnlFcG9jaCgodikgPT4gdiArIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICBSZXRyeVxuICAgICAgICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICAgIDxQYXJ0VGFibGVcbiAgICAgICAgICAgICAgICAgICAgICBpbmZvPXtpbmZvfVxuICAgICAgICAgICAgICAgICAgICAgIGxhYmVscz17bGFiZWxzfVxuICAgICAgICAgICAgICAgICAgICAgIGlkcz17aWRzfVxuICAgICAgICAgICAgICAgICAgICAgIGhvdmVyU3R5bGU9e2hvdmVyU3R5bGV9XG4gICAgICAgICAgICAgICAgICAgICAgc29ydENoZWNrQWxsPXtzb3J0Q2hlY2tBbGx9XG4gICAgICAgICAgICAgICAgICAgICAgY2hlY2tEZWxldGU9e2NoZWNrRGVsZXRlfVxuICAgICAgICAgICAgICAgICAgICAgIGlzRGVsZXRpbmc9e2lzRGVsZXRpbmd9XG4gICAgICAgICAgICAgICAgICAgICAgcm93U2VsZWN0PXtyb3dTZWxlY3R9XG4gICAgICAgICAgICAgICAgICAgICAgc2V0SG92ZXJJbmRleD17c2V0SG92ZXJJbmRleH1cbiAgICAgICAgICAgICAgICAgICAgICBob3ZlckluZGV4PXtob3ZlckluZGV4fVxuICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkSXRlbXM9e3NlbGVjdGVkSXRlbXN9XG4gICAgICAgICAgICAgICAgICAgICAgc2V0U2VsZWN0ZWRJdGVtcz17c2V0U2VsZWN0ZWRJdGVtc31cbiAgICAgICAgICAgICAgICAgICAgICBtaW5Sb3dzPXtwYWdlU2l6ZX1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnRhYmxlRm9vdGVyfT5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMucGFnaW5hdGlvblJvd30+XG4gICAgICAgICAgICAgICAgICAgIDxQYWdpbmF0aW9uIHNpemU9XCJzbVwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxQYWdpbmF0aW9uLlByZXZcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFBhZ2UoKHApID0+IE1hdGgubWF4KDEsIHAgLSAxKSl9XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17cGFnZSA8PSAxfVxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIFByZXZpb3VzXG4gICAgICAgICAgICAgICAgICAgICAgPC9QYWdpbmF0aW9uLlByZXY+XG4gICAgICAgICAgICAgICAgICAgICAge3BhZ2VCdXR0b25zfVxuICAgICAgICAgICAgICAgICAgICAgIDxQYWdpbmF0aW9uLk5leHRcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFBhZ2UoKHApID0+IHAgKyAxKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXshaGFzTmV4dFBhZ2V9XG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgTmV4dFxuICAgICAgICAgICAgICAgICAgICAgIDwvUGFnaW5hdGlvbi5OZXh0PlxuICAgICAgICAgICAgICAgICAgICA8L1BhZ2luYXRpb24+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxGb3JtIGNsYXNzTmFtZT17c3R5bGVzLnNlYXJjaFJvd30+XG4gICAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbFxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU9e3Nob3dMaXN0U2VhcmNofVxuICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoXCJcbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5zZWFyY2hJbnB1dH1cbiAgICAgICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPVwiU2VhcmNoXCJcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17c2VhcmNofVxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtzZWFyY2hDaGFuZ2VIYW5kbGVyfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8TmF2RHJvcGRvd25cbiAgICAgICAgICAgICAgICAgICAgICB0aXRsZT17c2VsZWN0fVxuICAgICAgICAgICAgICAgICAgICAgIGlkPVwiY29sbGFzaWJsZS1uYXYtZHJvcGRvd25cIlxuICAgICAgICAgICAgICAgICAgICAgIHNob3c9e3Nob3dMaXN0fVxuICAgICAgICAgICAgICAgICAgICAgIG9uTW91c2VFbnRlcj17KCkgPT4gc2V0U2hvd0xpc3QodHJ1ZSl9XG4gICAgICAgICAgICAgICAgICAgICAgb25Nb3VzZUxlYXZlPXsoKSA9PiBzZXRTaG93TGlzdChmYWxzZSl9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMuc2VhcmNoU2VsZWN0fVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgPE5hdkRyb3Bkb3duLkl0ZW1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2VsZWN0KFwiTmFtZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2hvd0xpc3RTZWFyY2goXCJ0ZXh0XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICBOYW1lXG4gICAgICAgICAgICAgICAgICAgICAgPC9OYXZEcm9wZG93bi5JdGVtPlxuICAgICAgICAgICAgICAgICAgICAgIDxOYXZEcm9wZG93bi5JdGVtXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNlbGVjdChcIkRhdGVcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNob3dMaXN0U2VhcmNoKFwiZGF0ZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgRGF0ZVxuICAgICAgICAgICAgICAgICAgICAgIDwvTmF2RHJvcGRvd24uSXRlbT5cbiAgICAgICAgICAgICAgICAgICAgICA8TmF2RHJvcGRvd24uSXRlbVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTZWxlY3QoXCJXb3JrIE9yZGVyXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTaG93TGlzdFNlYXJjaChcInRleHRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIFdvcmsgT3JkZXJcbiAgICAgICAgICAgICAgICAgICAgICA8L05hdkRyb3Bkb3duLkl0ZW0+XG4gICAgICAgICAgICAgICAgICAgICAgPE5hdkRyb3Bkb3duLkl0ZW1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2VsZWN0KFwiUHJvZHVjdCBOdW1iZXJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNob3dMaXN0U2VhcmNoKFwidGV4dFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgUHJvZHVjdCBOdW1iZXJcbiAgICAgICAgICAgICAgICAgICAgICA8L05hdkRyb3Bkb3duLkl0ZW0+XG4gICAgICAgICAgICAgICAgICAgICAgPE5hdkRyb3Bkb3duLkl0ZW1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2VsZWN0KFwiU2VyaWFsIE51bWJlclwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2hvd0xpc3RTZWFyY2goXCJ0ZXh0XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICBTZXJpYWwgTnVtYmVyXG4gICAgICAgICAgICAgICAgICAgICAgPC9OYXZEcm9wZG93bi5JdGVtPlxuICAgICAgICAgICAgICAgICAgICAgIDxOYXZEcm9wZG93bi5JdGVtXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNlbGVjdChcIkRlc2NyaXB0aW9uXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTaG93TGlzdFNlYXJjaChcInRleHRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIERlc2NyaXB0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgPC9OYXZEcm9wZG93bi5JdGVtPlxuICAgICAgICAgICAgICAgICAgICAgIDxOYXZEcm9wZG93bi5JdGVtXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNlbGVjdChcIlNLVVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2hvd0xpc3RTZWFyY2goXCJ0ZXh0XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICBTS1VcbiAgICAgICAgICAgICAgICAgICAgICA8L05hdkRyb3Bkb3duLkl0ZW0+XG4gICAgICAgICAgICAgICAgICAgIDwvTmF2RHJvcGRvd24+XG4gICAgICAgICAgICAgICAgICA8L0Zvcm0+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmZvb3RlckFjdGlvbnN9PlxuICAgICAgICAgICAgICAgICAgICA8TG9hZGluZ0J1dHRvblxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJzZWNvbmRhcnlcIlxuICAgICAgICAgICAgICAgICAgICAgIG5hbWU9XCJBZGQgTmV3IEl0ZW1cIlxuICAgICAgICAgICAgICAgICAgICAgIHJvdXRlPVwiTmV3U2VhcmNoL0FkZEl0ZW0vTmV3SXRlbVwiXG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMuYWN0aW9uQnV0dG9ufVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgdmFyaWFudD1cImluZm9cIlxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YCR7c3R5bGVzLmFjdGlvbkJ1dHRvbn0gJHtzdHlsZXMubWFwQWN0aW9uQnV0dG9ufWB9XG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17b3Blbk1hcH1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIE1hcFxuICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPExvYWRpbmdCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwicHJpbWFyeVwiXG4gICAgICAgICAgICAgICAgICAgICAgbmFtZT1cIkJhY2tcIlxuICAgICAgICAgICAgICAgICAgICAgIHJvdXRlPVwiV2FyZWhvdXNlZGIvV2FyZWhvdXNlU2VsZWN0XCJcbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5hY3Rpb25CdXR0b259XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L21haW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxPZmZjYW52YXNcbiAgICAgICAgICBzaG93PXtzaG93RmlsdGVyc31cbiAgICAgICAgICBvbkhpZGU9eygpID0+IHNldFNob3dGaWx0ZXJzKGZhbHNlKX1cbiAgICAgICAgICBwbGFjZW1lbnQ9XCJzdGFydFwiXG4gICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMuZmlsdGVyc0RyYXdlcn1cbiAgICAgICAgICBzY3JvbGxcbiAgICAgICAgICBiYWNrZHJvcFxuICAgICAgICA+XG4gICAgICAgICAgPE9mZmNhbnZhcy5IZWFkZXIgY2xvc2VCdXR0b24+XG4gICAgICAgICAgICA8T2ZmY2FudmFzLlRpdGxlPkZpbHRlcnM8L09mZmNhbnZhcy5UaXRsZT5cbiAgICAgICAgICA8L09mZmNhbnZhcy5IZWFkZXI+XG4gICAgICAgICAgPE9mZmNhbnZhcy5Cb2R5PntyZW5kZXJGaWx0ZXJzKFwiZHJhd2VyXCIpfTwvT2ZmY2FudmFzLkJvZHk+XG4gICAgICAgIDwvT2ZmY2FudmFzPlxuXG4gICAgICAgIDxNb2RhbFxuICAgICAgICAgIHNob3c9e3Nob3dNYXB9XG4gICAgICAgICAgb25IaWRlPXsoKSA9PiBzZXRTaG93TWFwKGZhbHNlKX1cbiAgICAgICAgICBjZW50ZXJlZFxuICAgICAgICAgIHNpemU9XCJsZ1wiXG4gICAgICAgID5cbiAgICAgICAgICA8TW9kYWwuSGVhZGVyIGNsb3NlQnV0dG9uPlxuICAgICAgICAgICAgPE1vZGFsLlRpdGxlPldhcmVob3VzZSBNYXA8L01vZGFsLlRpdGxlPlxuICAgICAgICAgIDwvTW9kYWwuSGVhZGVyPlxuICAgICAgICAgIDxNb2RhbC5Cb2R5PlxuICAgICAgICAgICAge21hcExvYWRpbmcgJiYgKFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLm1hcExvYWRpbmd9PlxuICAgICAgICAgICAgICAgIDxTcGlubmVyIGFuaW1hdGlvbj1cImJvcmRlclwiIC8+XG4gICAgICAgICAgICAgICAgPHNwYW4+TG9hZGluZyBtYXAgZGF0YS4uLjwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAge21hcEVycm9yICYmIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubWFwRXJyb3J9PnttYXBFcnJvcn08L2Rpdj59XG5cbiAgICAgICAgICAgIHshbWFwTG9hZGluZyAmJiBtYXBTdGVwID09PSBcInJlZ2lvbnNcIiAmJiAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubWFwU3RhZ2V9PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubWFwSGludH0+U2VsZWN0IGEgcmVnaW9uPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5tYXBDYW52YXN9PlxuICAgICAgICAgICAgICAgICAge01BUF9SRUdJT05fT1JERVIubWFwKChyZWdpb25JZCkgPT4gKFxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAga2V5PXtyZWdpb25JZH1cbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2Ake3N0eWxlcy5yZWdpb25CbG9ja30gJHtzdHlsZXNbYHJlZ2lvbiR7cmVnaW9uSWR9YF19YH1cbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVNYXBTZWxlY3RSZWdpb24ocmVnaW9uSWQpfVxuICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtcbiAgICAgICAgICAgICAgICAgICAgICAgIEFycmF5LmlzQXJyYXkobWFwUmVnaW9uT3B0aW9ucykgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcFJlZ2lvbk9wdGlvbnMubGVuZ3RoID4gMCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgIW1hcFJlZ2lvbk9wdGlvbnMuaW5jbHVkZXMocmVnaW9uSWQpXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAge3JlZ2lvbklkfVxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgIHshbWFwTG9hZGluZyAmJiBtYXBTdGVwID09PSBcImdyaWRcIiAmJiAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubWFwU3RhZ2V9PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubWFwSGludH0+XG4gICAgICAgICAgICAgICAgICBSZWdpb24ge21hcFJlZ2lvbn06IGNob29zZSBhIHJvdyBhbmQgY29sdW1uXG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgeygoKSA9PiB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBkaW1zID0gZ2V0TWFwUmVnaW9uRGltZW5zaW9ucyhtYXBSZWdpb24pO1xuICAgICAgICAgICAgICAgICAgY29uc3Qgcm93cyA9IG1hcExldHRlcnMuc2xpY2UoMCwgZGltcy5yb3dzIHx8IDApO1xuICAgICAgICAgICAgICAgICAgY29uc3QgY29scyA9IG1hcE51bWJlcnMuc2xpY2UoMCwgZGltcy5jb2xzIHx8IDApO1xuICAgICAgICAgICAgICAgICAgaWYgKCFyb3dzLmxlbmd0aCB8fCAhY29scy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLm1hcEVtcHR5fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIE5vIGdyaWQgZGF0YSBmb3IgdGhpcyByZWdpb24uXG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmdyaWRXcmFwcGVyfT5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5ncmlkfVxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgXCItLWdyaWQtY29sc1wiOiBjb2xzLmxlbmd0aCB9fVxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtyb3dzLm1hcCgocm93KSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xzLm1hcCgoY29sKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2VsbEtleSA9IGAke3Jvd30tJHtjb2x9YDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBoYXNQYWxsZXRzID0gQm9vbGVhbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcENlbGxQYWxsZXRzW2NlbGxLZXldPy5sZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17Y2VsbEtleX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YCR7c3R5bGVzLmdyaWRDZWxsfSAke1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc1BhbGxldHMgPyBcIlwiIDogc3R5bGVzLmdyaWRDZWxsRGlzYWJsZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzUGFsbGV0cyAmJiBoYW5kbGVNYXBTZWxlY3RDZWxsKHJvdywgY29sKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXshaGFzUGFsbGV0c31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3Jvd31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Y29sfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0pKCl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgeyFtYXBMb2FkaW5nICYmIG1hcFN0ZXAgPT09IFwicGFsbGV0c1wiICYmIChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5tYXBTdGFnZX0+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5tYXBIaW50fT5cbiAgICAgICAgICAgICAgICAgIFJlZ2lvbiB7bWFwUmVnaW9ufSAtIFNlY3Rpb24ge21hcFJvd31cbiAgICAgICAgICAgICAgICAgIHttYXBDb2x9OiBzZWxlY3QgYSBwYWxsZXRcbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnBhbGxldEdyaWR9PlxuICAgICAgICAgICAgICAgICAgeyhtYXBDZWxsUGFsbGV0c1tgJHttYXBSb3d9LSR7bWFwQ29sfWBdIHx8IFtdKS5tYXAoXG4gICAgICAgICAgICAgICAgICAgIChwYWxsZXQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwYWxsZXRLZXkgPSBgJHttYXBSb3d9LSR7bWFwQ29sfS1QJHtwYWxsZXR9YDtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBiaW5zID0gbWFwUGFsbGV0Qmluc1twYWxsZXRLZXldIHx8IFtdO1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17cGFsbGV0fVxuICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMucGFsbGV0QnV0dG9ufVxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJpbnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVNYXBWaWV3KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVnaW9uOiBtYXBSZWdpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlY3Rpb25MZXR0ZXI6IG1hcFJvdyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VjdGlvbk51bWJlcjogbWFwQ29sLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWxsZXQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJpbjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2hvd01hcChmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZU1hcFNlbGVjdFBhbGxldChwYWxsZXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICBQYWxsZXQge3BhbGxldH1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICB7IShtYXBDZWxsUGFsbGV0c1tgJHttYXBSb3d9LSR7bWFwQ29sfWBdIHx8IFtdKS5sZW5ndGggJiYgKFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLm1hcEVtcHR5fT5cbiAgICAgICAgICAgICAgICAgICAgICBObyBwYWxsZXRzIGF2YWlsYWJsZSBoZXJlLlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgeyFtYXBMb2FkaW5nICYmIG1hcFN0ZXAgPT09IFwiYmluc1wiICYmIChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5tYXBTdGFnZX0+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5tYXBIaW50fT5cbiAgICAgICAgICAgICAgICAgIFJlZ2lvbiB7bWFwUmVnaW9ufSAtIFNlY3Rpb24ge21hcFJvd31cbiAgICAgICAgICAgICAgICAgIHttYXBDb2x9IC0gUGFsbGV0IHttYXBQYWxsZXR9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5wYWxsZXRHcmlkfT5cbiAgICAgICAgICAgICAgICAgIHsobWFwUGFsbGV0Qmluc1tgJHttYXBSb3d9LSR7bWFwQ29sfS1QJHttYXBQYWxsZXR9YF0gfHwgW10pLm1hcChcbiAgICAgICAgICAgICAgICAgICAgKGJpbikgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgIGtleT17YmlufVxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2Ake3N0eWxlcy5wYWxsZXRCdXR0b259ICR7c3R5bGVzLmJpbkJ1dHRvbn1gfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlTWFwU2VsZWN0QmluKGJpbil9XG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgQmluIHtiaW59XG4gICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICB7IShtYXBQYWxsZXRCaW5zW2Ake21hcFJvd30tJHttYXBDb2x9LVAke21hcFBhbGxldH1gXSB8fCBbXSlcbiAgICAgICAgICAgICAgICAgICAgLmxlbmd0aCAmJiAoXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubWFwRW1wdHl9PlxuICAgICAgICAgICAgICAgICAgICAgIE5vIGJpbnMgYXZhaWxhYmxlIG9uIHRoaXMgcGFsbGV0LlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L01vZGFsLkJvZHk+XG4gICAgICAgICAgPE1vZGFsLkZvb3RlciBjbGFzc05hbWU9e3N0eWxlcy5tYXBGb290ZXJ9PlxuICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICB2YXJpYW50PVwib3V0bGluZS1zZWNvbmRhcnlcIlxuICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVNYXBCYWNrfVxuICAgICAgICAgICAgICBkaXNhYmxlZD17bWFwU3RlcCA9PT0gXCJyZWdpb25zXCJ9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIEJhY2tcbiAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICB2YXJpYW50PVwib3V0bGluZS1wcmltYXJ5XCJcbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlTWFwVmlldygpfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICBWaWV3XG4gICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgIDxCdXR0b24gdmFyaWFudD1cInNlY29uZGFyeVwiIG9uQ2xpY2s9eygpID0+IHNldFNob3dNYXAoZmFsc2UpfT5cbiAgICAgICAgICAgICAgQ2xvc2VcbiAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgIDwvTW9kYWwuRm9vdGVyPlxuICAgICAgICA8L01vZGFsPlxuICAgICAgPC9kaXY+XG4gICAgPC9Mb2dnZWRJbj5cbiAgKTtcblxyXG5cclxufVxyXG5cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==