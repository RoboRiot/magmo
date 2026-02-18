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
  }), __jsx(LoadingButton, {
    type: "light",
    name: "Map",
    route: "NewSearch/inventory/inventoryManage",
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.actionButton,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1702,
      columnNumber: 21
    }
  }), __jsx(LoadingButton, {
    type: "primary",
    name: "Back",
    route: "Warehousedb/WarehouseSelect",
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.actionButton,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1708,
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
      lineNumber: 1721,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Offcanvas"].Header, {
    closeButton: true,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1729,
      columnNumber: 11
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Offcanvas"].Title, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1730,
      columnNumber: 13
    }
  }, "Filters")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Offcanvas"].Body, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1732,
      columnNumber: 11
    }
  }, renderFilters("drawer")))));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vcGFnZXMvTmV3U2VhcmNoL21haW5TZWFyY2guanMiXSwibmFtZXMiOlsiU09DQUxfQ0xJRU5UX0lEIiwiTk9SQ0FMX0NMSUVOVF9JRCIsIlVOQVNTSUdORURfQ0xJRU5UX0lEIiwiREVGQVVMVF9QQUdFX1NJWkUiLCJNQVBfUkVHSU9OX09SREVSIiwic2ltdWxhdGVOZXR3b3JrUmVxdWVzdCIsIlByb21pc2UiLCJyZXNvbHZlIiwic2V0VGltZW91dCIsIkxvYWRpbmdCdXR0b24iLCJ0eXBlIiwibmFtZSIsInJvdXRlIiwiY2xhc3NOYW1lIiwidXNlU3RhdGUiLCJpc0xvYWRpbmciLCJzZXRMb2FkaW5nIiwidXNlRWZmZWN0IiwiY2FuY2VsbGVkIiwidGhlbiIsInRvVGltZSIsInZhbHVlIiwic2Vjb25kcyIsIkRhdGUiLCJ0IiwiZ2V0VGltZSIsImlzTmFOIiwiaXNvIiwicGFyc2UiLCJwYXJ0cyIsInNwbGl0IiwibGVuZ3RoIiwibW0iLCJkZCIsInl5eXkiLCJhbHQiLCJ0b1lNRCIsImQiLCJnZXRGdWxsWWVhciIsIlN0cmluZyIsImdldE1vbnRoIiwicGFkU3RhcnQiLCJnZXREYXRlIiwibm9ybWFsaXplVGV4dCIsInRvTG93ZXJDYXNlIiwidHJpbSIsImdldE1hY2hpbmVGaWVsZCIsIml0ZW0iLCJrZXkiLCJsb3dlciIsIm1hY2hpbmVEYXRhIiwiY3VycmVudE1hY2hpbmVEYXRhIiwidGhlTWFjaGluZURhdGEiLCJUaGVNYWNoaW5lIiwiTWFpblNlYXJjaCIsInVzZUF1dGgiLCJzaWduT3V0IiwiaW5mbyIsInNldEluZm8iLCJiYWNrdXBJbmZvIiwic2V0QmFja3VwSW5mbyIsImF1Z21lbnRlZEluZm8iLCJzZXRBdWdtZW50ZWRJbmZvIiwic2V0SXNMb2FkaW5nIiwiaWRzIiwic2V0SUQiLCJzaG93Iiwic2V0U2hvdyIsInNob3dGaWx0ZXJzIiwic2V0U2hvd0ZpbHRlcnMiLCJwYWdlU2l6ZSIsInNldFBhZ2VTaXplIiwiaXNOYXZpZ2F0aW5nIiwic2V0SXNOYXZpZ2F0aW5nIiwiZEl0ZW0iLCJzZXRESXRlbSIsInNlbGVjdCIsInNldFNlbGVjdCIsInNob3dMaXN0Iiwic2V0U2hvd0xpc3QiLCJzaG93TGlzdFNlYXJjaCIsInNldFNob3dMaXN0U2VhcmNoIiwic2VhcmNoIiwic2V0U2VhcmNoIiwic2VsZWN0ZWRPRU0iLCJzZXRTZWxlY3RlZE9FTSIsInNlbGVjdGVkTW9kYWxpdHkiLCJzZXRTZWxlY3RlZE1vZGFsaXR5Iiwic2VsZWN0ZWRDbGllbnRGcm9tIiwic2V0U2VsZWN0ZWRDbGllbnRGcm9tIiwiY2xpZW50RnJvbUJ1dHRvblRleHQiLCJzZXRDbGllbnRGcm9tQnV0dG9uVGV4dCIsInNlbGVjdGVkQ2xpZW50Q3VycmVudCIsInNldFNlbGVjdGVkQ2xpZW50Q3VycmVudCIsImNsaWVudEN1cnJlbnRCdXR0b25UZXh0Iiwic2V0Q2xpZW50Q3VycmVudEJ1dHRvblRleHQiLCJjbGllbnRzIiwic2V0Q2xpZW50cyIsInNob3dDbGllbnRNb2RhbCIsInNldFNob3dDbGllbnRNb2RhbCIsImNsaWVudFNlbGVjdGlvblR5cGUiLCJzZXRDbGllbnRTZWxlY3Rpb25UeXBlIiwic2hvd01hcCIsInNldFNob3dNYXAiLCJtYXBSZWdpb25PcHRpb25zIiwic2V0TWFwUmVnaW9uT3B0aW9ucyIsIm1hcFNlY3Rpb25NYXAiLCJzZXRNYXBTZWN0aW9uTWFwIiwibWFwU3RlcCIsInNldE1hcFN0ZXAiLCJtYXBSZWdpb24iLCJzZXRNYXBSZWdpb24iLCJtYXBSb3ciLCJzZXRNYXBSb3ciLCJtYXBDb2wiLCJzZXRNYXBDb2wiLCJtYXBQYWxsZXQiLCJzZXRNYXBQYWxsZXQiLCJtYXBDZWxsUGFsbGV0cyIsInNldE1hcENlbGxQYWxsZXRzIiwibWFwUGFsbGV0QmlucyIsInNldE1hcFBhbGxldEJpbnMiLCJtYXBMb2FkaW5nIiwic2V0TWFwTG9hZGluZyIsIm1hcEVycm9yIiwic2V0TWFwRXJyb3IiLCJtYXBEaXJlY3RvcnlMb2FkZWQiLCJzZXRNYXBEaXJlY3RvcnlMb2FkZWQiLCJyb3V0ZXIiLCJ1c2VSb3V0ZXIiLCJsYWJlbEJhc2UiLCJsYWJlbEJhc2VOYW1lcyIsInNvcnRDaGVja0Jhc2UiLCJ3aXRoU29ydEljb24iLCJiYXNlTGFiZWxzIiwiYWN0aXZlSW5kZXgiLCJpc0Rlc2MiLCJtYXAiLCJ0ZXh0IiwiaSIsImFycm93IiwibGFiZWxzIiwic2V0TGFiZWxzIiwic29ydENoZWNrIiwic2V0U29ydENoZWNrIiwiaG92ZXJJbmRleCIsInNldEhvdmVySW5kZXgiLCJzZWxlY3RlZE1vZGVsIiwic2V0U2VsZWN0ZWRNb2RlbCIsImdQb3MiLCJzZXRHUG9zIiwiZ0lkZSIsInNldEdJZGUiLCJpc0RlbGV0aW5nIiwic2V0SXNEZWxldGluZyIsInBhZ2UiLCJzZXRQYWdlIiwicGFnZUN1cnNvcnMiLCJzZXRQYWdlQ3Vyc29ycyIsImhhc05leHRQYWdlIiwic2V0SGFzTmV4dFBhZ2UiLCJmZXRjaFNlcSIsInVzZVJlZiIsImJhY2tmaWxsSW5GbGlnaHQiLCJxdWVyeUVwb2NoIiwic2V0UXVlcnlFcG9jaCIsImxvYWRFcnJvciIsInNldExvYWRFcnJvciIsInRhYmxlQm9keVJlZiIsInJvd0hlaWdodFJlZiIsImhlYWRlckhlaWdodFJlZiIsIkxPQURfVElNRU9VVF9NUyIsIm1hcExldHRlcnMiLCJ1c2VNZW1vIiwiQXJyYXkiLCJmcm9tIiwiXyIsImZyb21DaGFyQ29kZSIsIm1hcE51bWJlcnMiLCJsb2FkTWFwRGlyZWN0b3J5IiwidXNlQ2FsbGJhY2siLCJmaXJlYmFzZSIsImZpcmVzdG9yZSIsImNvbGxlY3Rpb24iLCJkb2MiLCJnZXQiLCJkYXRhIiwiUmVnaW9uIiwiU2VjdGlvbiIsImNvbnNvbGUiLCJlcnJvciIsImdldE1hcFJlZ2lvbkRpbWVuc2lvbnMiLCJyZWdpb25JZCIsImVudHJ5IiwiaXNBcnJheSIsImNvbHMiLCJwYXJzZUludCIsInJvd3MiLCJOdW1iZXIiLCJpc0Zpbml0ZSIsImxvYWRNYXBJbnZlbnRvcnkiLCJ3aGVyZSIsInNuYXAiLCJjZWxsUGFsbGV0cyIsInBhbGxldEJpbnMiLCJmb3JFYWNoIiwibG9jIiwibmV3TG9jYWxDdXJyZW50Iiwicm93Iiwic2VjdGlvbiIsImxldHRlciIsImNvbCIsIm51bWJlciIsInRyaW1tZWQiLCJzbGljZSIsInVuZGVmaW5lZCIsInBhbGxldCIsImJpbiIsImNlbGxLZXkiLCJTZXQiLCJhZGQiLCJwYWxsZXRLZXkiLCJjZWxsT2JqIiwiT2JqZWN0Iiwia2V5cyIsInNvcnQiLCJhIiwiYiIsInBhbGxldE9iaiIsIm9wZW5NYXAiLCJoYW5kbGVNYXBTZWxlY3RSZWdpb24iLCJoYW5kbGVNYXBTZWxlY3RDZWxsIiwicm93TGV0dGVyIiwiY29sTnVtYmVyIiwiaGFuZGxlTWFwU2VsZWN0UGFsbGV0IiwicGFsbGV0SWQiLCJoYW5kbGVNYXBCYWNrIiwiaGFuZGxlTWFwVmlldyIsIm92ZXJyaWRlcyIsInBhcmFtcyIsIlVSTFNlYXJjaFBhcmFtcyIsInJlZ2lvblZhbHVlIiwicmVnaW9uIiwibGV0dGVyVmFsdWUiLCJzZWN0aW9uTGV0dGVyIiwibnVtYmVyVmFsdWUiLCJzZWN0aW9uTnVtYmVyIiwicGFsbGV0VmFsdWUiLCJiaW5WYWx1ZSIsInNldCIsInF1ZXJ5IiwidG9TdHJpbmciLCJwdXNoIiwic3RhcnROYW1lVG9rZW5CYWNrZmlsbCIsInJlYXNvbiIsImN1cnJlbnQiLCJsYXN0UnVuIiwid2luZG93IiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsIm5vdyIsImRiIiwibGFzdERvYyIsInRva2Vuc0VxdWFsIiwic2V0QSIsInNldEIiLCJzaXplIiwidiIsImhhcyIsIm9yZGVyQnkiLCJGaWVsZFBhdGgiLCJkb2N1bWVudElkIiwibGltaXQiLCJzdGFydEFmdGVyIiwiZW1wdHkiLCJiYXRjaCIsIndyaXRlcyIsImRvY3MiLCJuYW1lTG93ZXIiLCJuYW1lVG9rZW5zIiwiYnVpbGROYW1lVG9rZW5zIiwiZXhpc3RpbmdUb2tlbnMiLCJuZWVkc1VwZGF0ZSIsInVwZGF0ZSIsInJlZiIsImNvbW1pdCIsInNldEl0ZW0iLCJzZWFyY2hMb3dlciIsImhhc0FjdGl2ZUZpbHRlcnMiLCJCb29sZWFuIiwidmFsdWVNYXRjaGVzIiwicyIsInNvbWUiLCJpbmNsdWRlcyIsIm1hdGNoZXNGaWx0ZXJzIiwidmlzaWJsZSIsIk9FTSIsIk1vZGFsaXR5IiwiTW9kZWwiLCJjbGllbnRGcm9tSWQiLCJjbGllbnRDdXJyZW50SWQiLCJ3YW50ZWREYXkiLCJpdGVtWU1EIiwiZGF0ZSIsImRlc2NyaXB0aW9ucyIsIndvcmtPcmRlcnMiLCJ3Iiwid28iLCJ3b3JrT3JkZXIiLCJwbiIsInNuIiwiZGVzYyIsImRlc2NyaXB0aW9uIiwiaWQiLCJsb2NhbFNOIiwibG9jYWxfc24iLCJyZXNldFBhZ2luYXRpb24iLCJhc1BhdGgiLCJmZXRjaERhdGEiLCJldmVudHMiLCJoYW5kbGVEb25lIiwib24iLCJvZmYiLCJyZXF1ZXN0ZWRQYWdlIiwic2VxIiwidGltZWRPdXQiLCJ0aW1lb3V0SWQiLCJjb2RlIiwibWVzc2FnZSIsIk1hdGgiLCJyb3VuZCIsImlucHV0VGV4dCIsInNlbGVjdGVkVHlwZSIsInN0YXJ0QWZ0ZXJEb2MiLCJjbGVhclRpbWVvdXQiLCJlZmZlY3RpdmVTZWxlY3QiLCJlZmZlY3RpdmVTZWFyY2giLCJlZmZlY3RpdmVTZWFyY2hMb3dlciIsImxvYWQiLCJhdHRlbXB0IiwiZmV0Y2hQYXJ0c1dpdGhNYWNoaW5lRGF0YVBhZ2UiLCJ2aXNpYmxlT25seSIsImZpbHRlckZuIiwicmF3IiwibmVlZHNNYWNoaW5lRGF0YSIsInIiLCJwb3ciLCJuZXh0UGFnZSIsImhhc05hbWVTZWFyY2giLCJwcmV2IiwibmV4dCIsInNldFNlbGVjdGVkSXRlbXMiLCJhdWdtZW50ZWQiLCJDbGllbnRGcm9tIiwiQ2xpZW50Q3VycmVudCIsImZpbHRlciIsInNlYXJjaENoYW5nZUhhbmRsZXIiLCJldmVudCIsInRhcmdldCIsImJhc2UiLCJzb3J0Q2hlY2tBbGwiLCJwb3MiLCJuZXh0U29ydENoZWNrIiwic29ydGVkSW5mbyIsInRhIiwidGIiLCJhdiIsImJ2IiwibG9jYWxlQ29tcGFyZSIsImFuIiwiYm4iLCJyb3dTZWxlY3QiLCJsb2ciLCJzZWxlY3RlZEl0ZW1zIiwic2hvd0RlbGV0ZU1vZGFsIiwic2V0U2hvd0RlbGV0ZU1vZGFsIiwiaGFuZGxlU2VsZWN0SXRlbSIsIngiLCJoYW5kbGVTaG93RGVsZXRlTW9kYWwiLCJoYW5kbGVDbG9zZURlbGV0ZU1vZGFsIiwiaGFuZGxlRGVsZXRlU2VsZWN0ZWQiLCJpdGVtSWQiLCJkZWxldGVGcm9tU3RvcmFnZSIsImhhbmRsZUNsb3NlIiwiaGFuZGxlU2hvdyIsImNoZWNrRGVsZXRlIiwiaWRzVG9EZWxldGUiLCJwcmV2ZW50RGVmYXVsdCIsInN0b3BQcm9wYWdhdGlvbiIsImhvdmVyU3R5bGUiLCJpbmRleCIsImJhY2tncm91bmRDb2xvciIsInRleHRBbGlnbiIsImN1cnNvciIsImRyb3Bkb3duMVRleHQiLCJzZXREcm9wZG93bjFUZXh0IiwiZHJvcGRvd24yVGV4dCIsInNldERyb3Bkb3duMlRleHQiLCJoYW5kbGVTZWxlY3QxIiwiZXZlbnRLZXkiLCJ0ZXh0Q29udGVudCIsImhhbmRsZVNlbGVjdDIiLCJidWlsZENsaWVudHNGcm9tSXRlbXMiLCJmaWx0ZXJlZCIsIml0Iiwib3V0IiwiaWRBcnJheSIsImNodW5rIiwiaGFuZGxlQ2xpZW50Q2xpY2siLCJzYWZlQ2xpZW50cyIsImZldGNoQ2xpZW50cyIsImNsaWVudHNEYXRhIiwiZGVyaXZlZCIsInNldENsaWVudFNlYXJjaFRlcm0iLCJoYW5kbGVDbGllbnRTZWxlY3QiLCJjbGllbnRJZCIsImNsaWVudFNuYXAiLCJleGlzdHMiLCJjbGllbnREYXRhIiwiaGFuZGxlQ2xpZW50SW5mbyIsImNsaWVudE5hbWUiLCJoYW5kbGVDbGVhckNsaWVudFNlbGVjdGlvbiIsIm1vZGVscyIsInNldE1vZGVscyIsInNob3dNb2RlbE1vZGFsIiwic2V0U2hvd01vZGVsTW9kYWwiLCJtb2RlbEJ1dHRvblRleHQiLCJzZXRNb2RlbEJ1dHRvblRleHQiLCJoYW5kbGVNb2RlbENsaWNrIiwiZmV0Y2hNb2RlbHMiLCJtb2RlbHNEYXRhIiwic2V0TW9kZWxTZWFyY2hUZXJtIiwiaGFuZGxlTW9kZWxTZWxlY3QiLCJtb2RlbE5hbWUiLCJoYW5kbGVDbGVhck1vZGVsU2VsZWN0aW9uIiwiaGFuZGxlU29DYWxXYXJlaG91c2VDbGljayIsImhhbmRsZU5vckNhbFdhcmVob3VzZUNsaWNrIiwiaGFuZGxlV2FyZWhvdXNlVW5hc3NpZ25lZENsaWNrIiwiY2xpZW50U2VhcmNoVGVybSIsIm1vZGVsU2VhcmNoVGVybSIsInN0b3JhZ2VSZWYiLCJzdG9yYWdlIiwiZm9sZGVyUmVmIiwiY2hpbGQiLCJsaXN0QWxsIiwibGlzdFJlc3VsdCIsImRlbGV0ZVByb21pc2VzIiwiaXRlbXMiLCJhbGwiLCJkZWxldGVGcm9tUGFydHNDb2xsZWN0aW9uIiwidG90YWxLbm93blBhZ2VzIiwibWF4IiwicGFnZUJ1dHRvbnMiLCJidXR0b25zIiwibWF4VmlzaWJsZSIsInB1c2hQYWdlIiwicCIsInB1c2hFbGxpcHNpcyIsInN0YXJ0IiwiZW5kIiwibWluIiwiZGVzaXJlZFdpbmRvdyIsImN1cnJlbnRXaW5kb3ciLCJyZW1haW5pbmciLCJyZWNhbGNQYWdlU2l6ZSIsImNvbnRhaW5lckhlaWdodCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImhlaWdodCIsImhlYWRlclJvdyIsInF1ZXJ5U2VsZWN0b3IiLCJib2R5Um93IiwiaCIsInZlcnRpY2FsUGFkZGluZyIsImF2YWlsYWJsZSIsImVzdGltYXRlZCIsImZsb29yIiwiY2xhbXBlZCIsIm9uUmVzaXplIiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJyZW5kZXJGaWx0ZXJzIiwiaWRQcmVmaXgiLCJzdHlsZXMiLCJmaWx0ZXJzUGFuZWwiLCJmaWx0ZXJzSGVhZGVyIiwiZmlsdGVyc1RpdGxlIiwiZmlsdGVyc1N1YnRpdGxlIiwiZmlsdGVyc0JhZGdlIiwiZmlsdGVyU2VjdGlvbiIsImZpbHRlclNlY3Rpb25UaXRsZSIsImlucHV0R3JvdXAiLCJpbnB1dEJ1dHRvbiIsImJ1dHRvbkdyb3VwIiwiZmxleEJ1dHRvbiIsImxvYWRpbmdPdmVybGF5IiwibG9hZGluZ0xvZ28iLCJlIiwiY2xpZW50IiwibW9kZWwiLCJwYWdlSW5uZXIiLCJoZWFkZXIiLCJoZWFkZXJMZWZ0IiwiYnVyZ2VyIiwiYnJhbmQiLCJicmFuZExvZ28iLCJicmFuZE5hbWUiLCJicmFuZFN1YiIsImhlYWRlclJpZ2h0IiwiaGVhZGVyU3RhdHVzIiwiY29udGVudCIsInNpZGViYXIiLCJtYWluIiwidGFibGVDYXJkIiwidGFibGVIZWFkZXIiLCJ0YWJsZVRpdGxlIiwidGFibGVTdWJ0aXRsZSIsInRhYmxlTWV0YSIsInRhYmxlQm9keSIsImxvYWRpbmdTdGF0ZSIsImxvYWRpbmdUZXh0IiwiZXJyb3JTdGF0ZSIsImVycm9yVGl0bGUiLCJlcnJvck1lc3NhZ2UiLCJ0YWJsZUZvb3RlciIsInBhZ2luYXRpb25Sb3ciLCJzZWFyY2hSb3ciLCJzZWFyY2hJbnB1dCIsInNlYXJjaFNlbGVjdCIsImZvb3RlckFjdGlvbnMiLCJhY3Rpb25CdXR0b24iLCJmaWx0ZXJzRHJhd2VyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBV0E7QUFDQTtBQUNBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Q0FHQTs7QUFDQSxJQUFNQSxlQUFlLEdBQUcsVUFBeEI7QUFDQSxJQUFNQyxnQkFBZ0IsR0FBRyxVQUF6QjtBQUNBLElBQU1DLG9CQUFvQixHQUFHLFVBQTdCO0FBQ0EsSUFBTUMsaUJBQWlCLEdBQUcsRUFBMUI7QUFDQSxJQUFNQyxnQkFBZ0IsR0FBRyxDQUFDLEdBQUQsRUFBTSxHQUFOLEVBQVcsR0FBWCxFQUFnQixHQUFoQixFQUFxQixHQUFyQixFQUEwQixHQUExQixFQUErQixHQUEvQixDQUF6QixDLENBR0E7O0FBQ0EsU0FB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YSxVO1VBQ0ZDLGlFLEVBeUNMMEUscUQ7OztNQTFDTzNFLFUiLCJmaWxlIjoic3RhdGljL3dlYnBhY2svcGFnZXMvTmV3U2VhcmNoL21haW5TZWFyY2guNDU5ZTM4MDg3OTBiYzYwMTM5YzMuaG90LXVwZGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlLCB1c2VSZWYsIHVzZUNhbGxiYWNrIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQge1xuICBJbnB1dEdyb3VwLFxuICBEcm9wZG93bixcbiAgRm9ybUNvbnRyb2wsXG4gIEJ1dHRvbixcbiAgTmF2RHJvcGRvd24sXG4gIEZvcm0sXG4gIE1vZGFsLFxuICBQYWdpbmF0aW9uLFxuICBPZmZjYW52YXMsXG59IGZyb20gXCJyZWFjdC1ib290c3RyYXBcIjtcbmltcG9ydCBMaW5rIGZyb20gXCJuZXh0L2xpbmtcIjtcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gXCJuZXh0L3JvdXRlclwiO1xuaW1wb3J0IHtcbiAgZmV0Y2hQYXJ0c1dpdGhNYWNoaW5lRGF0YVBhZ2UsXG4gIGZldGNoQ2xpZW50cyxcbiAgZmV0Y2hNb2RlbHMsXG59IGZyb20gXCIuLi8uLi91dGlscy9mZXRjaEFzc29jaWF0aW9uc1wiO1xuaW1wb3J0IHsgdXNlQXV0aCB9IGZyb20gXCIuLi8uLi9jb250ZXh0L0F1dGhVc2VyQ29udGV4dFwiO1xyXG5pbXBvcnQgTG9nZ2VkSW4gZnJvbSBcIi4uL0xvZ2dlZEluXCI7XHJcbmltcG9ydCBDbGllbnRUYWJsZSBmcm9tIFwiLi4vLi4vdXRpbHMvQ2xpZW50VGFibGVcIjtcclxuaW1wb3J0IE1vZGVsVGFibGUgZnJvbSBcIi4uLy4uL3V0aWxzL01vZGVsVGFibGVcIjtcclxuaW1wb3J0IFBhcnRUYWJsZSBmcm9tIFwiLi4vLi4vdXRpbHMvUGFydFRhYmxlXCI7XG5pbXBvcnQgc3R5bGVzIGZyb20gXCIuLi8uLi9zdHlsZXMvTWFpblNlYXJjaC5tb2R1bGUuY3NzXCI7XG5pbXBvcnQgZmlyZWJhc2UgZnJvbSBcIi4uLy4uL2NvbnRleHQvRmlyZWJhc2VcIjtcbmltcG9ydCB7IGJ1aWxkTmFtZVRva2VucyB9IGZyb20gXCIuLi8uLi91dGlscy9pdGVtRm9ybVNoYXJlZFwiO1xuXHJcbi8vIFByZWRlZmluZWQgd2FyZWhvdXNlIGNsaWVudCBJRHMgYW5kIGRpc3BsYXkgbmFtZXNcclxuY29uc3QgU09DQUxfQ0xJRU5UX0lEID0gXCJBSVMxNzE4MlwiO1xyXG5jb25zdCBOT1JDQUxfQ0xJRU5UX0lEID0gXCJBSVMyNTA5N1wiO1xuY29uc3QgVU5BU1NJR05FRF9DTElFTlRfSUQgPSBcIkFJUzAwNDA0XCI7XG5jb25zdCBERUZBVUxUX1BBR0VfU0laRSA9IDI1O1xuY29uc3QgTUFQX1JFR0lPTl9PUkRFUiA9IFtcIkVcIiwgXCJGXCIsIFwiR1wiLCBcIkFcIiwgXCJEXCIsIFwiQ1wiLCBcIkJcIl07XG5cclxuXHJcbi8vIFNpbXVsYXRlcyBhIG5ldHdvcmsgcmVxdWVzdCBkZWxheVxyXG5mdW5jdGlvbiBzaW11bGF0ZU5ldHdvcmtSZXF1ZXN0KCkge1xyXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gc2V0VGltZW91dChyZXNvbHZlLCAyMDAwKSk7XHJcbn1cclxuXHJcbi8vIEN1c3RvbSBMb2FkaW5nQnV0dG9uIGNvbXBvbmVudFxyXG5mdW5jdGlvbiBMb2FkaW5nQnV0dG9uKHsgdHlwZSwgbmFtZSwgcm91dGUsIGNsYXNzTmFtZSB9KSB7XG4gIGNvbnN0IFtpc0xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKGlzTG9hZGluZykge1xuICAgICAgbGV0IGNhbmNlbGxlZCA9IGZhbHNlO1xuICAgICAgc2ltdWxhdGVOZXR3b3JrUmVxdWVzdCgpLnRoZW4oKCkgPT4ge1xuICAgICAgICBpZiAoIWNhbmNlbGxlZCkgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGNhbmNlbGxlZCA9IHRydWU7XG4gICAgICB9O1xuICAgIH1cbiAgfSwgW2lzTG9hZGluZ10pO1xuXHJcbiAgcmV0dXJuIChcbiAgICA8TGluayBocmVmPXtgLyR7cm91dGV9YH0+XG4gICAgICA8YVxuICAgICAgICBjbGFzc05hbWU9e2BidG4gYnRuLSR7dHlwZX0gJHtjbGFzc05hbWUgfHwgXCJcIn1gfVxuICAgICAgICBkaXNhYmxlZD17aXNMb2FkaW5nfVxuICAgICAgICBvbkNsaWNrPXsoKSA9PiAhaXNMb2FkaW5nICYmIHNldExvYWRpbmcodHJ1ZSl9XG4gICAgICA+XG4gICAgICAgIHtpc0xvYWRpbmcgPyBcIkxvYWRpbmfigKZcIiA6IG5hbWV9XHJcbiAgICAgIDwvYT5cclxuICAgIDwvTGluaz5cclxuICApO1xyXG59XHJcblxyXG4vLyAtLS0tIERBVEUgSEVMUEVSUyAodG9wLWxldmVsIHNjb3BlKSAtLS0tXHJcblxyXG4vLyBDb252ZXJ0IGFueXRoaW5nIGRhdGUtaXNoIGludG8gYSB0aW1lc3RhbXAgKG1zIHNpbmNlIGVwb2NoKS5cclxuZnVuY3Rpb24gdG9UaW1lKHZhbHVlKSB7XHJcbiAgaWYgKCF2YWx1ZSkgcmV0dXJuIG51bGw7XHJcblxyXG4gIC8vIEZpcmVzdG9yZSBUaW1lc3RhbXAgeyBzZWNvbmRzLCBuYW5vc2Vjb25kcyB9XHJcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZS5zZWNvbmRzICE9IG51bGwpIHtcclxuICAgIHRyeSB7IHJldHVybiB2YWx1ZS5zZWNvbmRzICogMTAwMDsgfSBjYXRjaCB7IC8qIGlnbm9yZSAqLyB9XHJcbiAgfVxyXG5cclxuICAvLyBOYXRpdmUgRGF0ZVxyXG4gIGlmICh2YWx1ZSBpbnN0YW5jZW9mIERhdGUpIHtcclxuICAgIGNvbnN0IHQgPSB2YWx1ZS5nZXRUaW1lKCk7XHJcbiAgICByZXR1cm4gaXNOYU4odCkgPyBudWxsIDogdDtcclxuICB9XHJcblxyXG4gIC8vIFN0cmluZ3NcclxuICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAvLyBJU08gLyB5eXl5LW1tLWRkXHJcbiAgICBjb25zdCBpc28gPSBEYXRlLnBhcnNlKHZhbHVlKTtcclxuICAgIGlmICghaXNOYU4oaXNvKSkgcmV0dXJuIGlzbztcclxuXHJcbiAgICAvLyBtbS9kZC95eXl5XHJcbiAgICBjb25zdCBwYXJ0cyA9IHZhbHVlLnNwbGl0KFwiL1wiKTtcclxuICAgIGlmIChwYXJ0cy5sZW5ndGggPT09IDMpIHtcclxuICAgICAgY29uc3QgW21tLCBkZCwgeXl5eV0gPSBwYXJ0cztcclxuICAgICAgY29uc3QgYWx0ID0gRGF0ZS5wYXJzZShgJHt5eXl5fS0ke21tfS0ke2RkfWApO1xyXG4gICAgICBpZiAoIWlzTmFOKGFsdCkpIHJldHVybiBhbHQ7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBMYXN0IHJlc29ydFxyXG4gIGNvbnN0IHQgPSBEYXRlLnBhcnNlKHZhbHVlKTtcclxuICByZXR1cm4gaXNOYU4odCkgPyBudWxsIDogdDtcclxufVxyXG5cclxuLy8gQ2Fub25pY2FsaXplIHRvICd5eXl5LW1tLWRkJyAobWF0Y2hlcyA8aW5wdXQgdHlwZT1cImRhdGVcIj4pXHJcbmZ1bmN0aW9uIHRvWU1EKHZhbHVlKSB7XG4gIGNvbnN0IHQgPSB0b1RpbWUodmFsdWUpO1xuICBpZiAodCA9PSBudWxsKSByZXR1cm4gbnVsbDtcbiAgY29uc3QgZCA9IG5ldyBEYXRlKHQpO1xuICBjb25zdCB5eXl5ID0gZC5nZXRGdWxsWWVhcigpO1xuICBjb25zdCBtbSA9IFN0cmluZyhkLmdldE1vbnRoKCkgKyAxKS5wYWRTdGFydCgyLCBcIjBcIik7XG4gIGNvbnN0IGRkID0gU3RyaW5nKGQuZ2V0RGF0ZSgpKS5wYWRTdGFydCgyLCBcIjBcIik7XG4gIHJldHVybiBgJHt5eXl5fS0ke21tfS0ke2RkfWA7XG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZVRleHQodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09IG51bGwpIHJldHVybiBcIlwiO1xuICByZXR1cm4gU3RyaW5nKHZhbHVlKS50b0xvd2VyQ2FzZSgpLnRyaW0oKTtcbn1cblxuZnVuY3Rpb24gZ2V0TWFjaGluZUZpZWxkKGl0ZW0sIGtleSkge1xuICBpZiAoIWl0ZW0pIHJldHVybiBudWxsO1xuICBjb25zdCBsb3dlciA9IGtleS50b0xvd2VyQ2FzZSgpO1xuICByZXR1cm4gKFxuICAgIGl0ZW0/Lm1hY2hpbmVEYXRhPy5ba2V5XSA/P1xuICAgIGl0ZW0/Lm1hY2hpbmVEYXRhPy5bbG93ZXJdID8/XG4gICAgaXRlbT8uY3VycmVudE1hY2hpbmVEYXRhPy5ba2V5XSA/P1xuICAgIGl0ZW0/LmN1cnJlbnRNYWNoaW5lRGF0YT8uW2xvd2VyXSA/P1xuICAgIGl0ZW0/LnRoZU1hY2hpbmVEYXRhPy5ba2V5XSA/P1xuICAgIGl0ZW0/LnRoZU1hY2hpbmVEYXRhPy5bbG93ZXJdID8/XG4gICAgaXRlbT8uVGhlTWFjaGluZT8uW2tleV0gPz9cbiAgICBpdGVtPy5UaGVNYWNoaW5lPy5bbG93ZXJdID8/XG4gICAgbnVsbFxuICApO1xufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIE1haW5TZWFyY2goKSB7XG4gIGNvbnN0IHsgc2lnbk91dCB9ID0gdXNlQXV0aCgpO1xyXG4gIGNvbnN0IFtpbmZvLCBzZXRJbmZvXSA9IHVzZVN0YXRlKFtdKTtcclxuICBjb25zdCBbYmFja3VwSW5mbywgc2V0QmFja3VwSW5mb10gPSB1c2VTdGF0ZShbXSk7XHJcbiAgY29uc3QgW2F1Z21lbnRlZEluZm8sIHNldEF1Z21lbnRlZEluZm9dID0gdXNlU3RhdGUoW10pOyAvLyBpdGVtcyB3aXRoIGNsaWVudEZyb21JZC9jdXJyZW50SWQgYWRkZWRcclxuICBjb25zdCBbaXNMb2FkaW5nLCBzZXRJc0xvYWRpbmddID0gdXNlU3RhdGUodHJ1ZSk7XHJcbiAgY29uc3QgW2lkcywgc2V0SURdID0gdXNlU3RhdGUoW10pO1xuICBjb25zdCBbc2hvdywgc2V0U2hvd10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtzaG93RmlsdGVycywgc2V0U2hvd0ZpbHRlcnNdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbcGFnZVNpemUsIHNldFBhZ2VTaXplXSA9IHVzZVN0YXRlKERFRkFVTFRfUEFHRV9TSVpFKTtcbiAgY29uc3QgW2lzTmF2aWdhdGluZywgc2V0SXNOYXZpZ2F0aW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2RJdGVtLCBzZXRESXRlbV0gPSB1c2VTdGF0ZSgpO1xyXG4gIGNvbnN0IFtzZWxlY3QsIHNldFNlbGVjdF0gPSB1c2VTdGF0ZShcIk5hbWVcIik7XHJcbiAgY29uc3QgW3Nob3dMaXN0LCBzZXRTaG93TGlzdF0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW3Nob3dMaXN0U2VhcmNoLCBzZXRTaG93TGlzdFNlYXJjaF0gPSB1c2VTdGF0ZShcInRleHRcIik7XHJcbiAgY29uc3QgW3NlYXJjaCwgc2V0U2VhcmNoXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtzZWxlY3RlZE9FTSwgc2V0U2VsZWN0ZWRPRU1dID0gdXNlU3RhdGUobnVsbCk7XHJcbiAgY29uc3QgW3NlbGVjdGVkTW9kYWxpdHksIHNldFNlbGVjdGVkTW9kYWxpdHldID0gdXNlU3RhdGUobnVsbCk7XHJcbiAgLy8gUmVwbGFjZSB0aGUgb2xkIHNpbmdsZSBjbGllbnQgc3RhdGUgd2l0aCB0d28gc2V0czpcclxuICBjb25zdCBbc2VsZWN0ZWRDbGllbnRGcm9tLCBzZXRTZWxlY3RlZENsaWVudEZyb21dID0gdXNlU3RhdGUobnVsbCk7XHJcbiAgY29uc3QgW2NsaWVudEZyb21CdXR0b25UZXh0LCBzZXRDbGllbnRGcm9tQnV0dG9uVGV4dF0gPSB1c2VTdGF0ZShcIlNlbGVjdCBPcHRpb25cIik7XHJcbiAgY29uc3QgW3NlbGVjdGVkQ2xpZW50Q3VycmVudCwgc2V0U2VsZWN0ZWRDbGllbnRDdXJyZW50XSA9IHVzZVN0YXRlKG51bGwpO1xyXG4gIGNvbnN0IFtjbGllbnRDdXJyZW50QnV0dG9uVGV4dCwgc2V0Q2xpZW50Q3VycmVudEJ1dHRvblRleHRdID0gdXNlU3RhdGUoXCJTZWxlY3QgT3B0aW9uXCIpO1xyXG5cclxuICBjb25zdCBbY2xpZW50cywgc2V0Q2xpZW50c10gPSB1c2VTdGF0ZShbXSk7XG4gIGNvbnN0IFtzaG93Q2xpZW50TW9kYWwsIHNldFNob3dDbGllbnRNb2RhbF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIC8vIFRoaXMgc3RhdGUgdGVsbHMgdGhlIG1vZGFsIHdoaWNoIGNsaWVudCBib3ggaXMgYmVpbmcgdXBkYXRlZDogXCJmcm9tXCIgb3IgXCJjdXJyZW50XCJcbiAgY29uc3QgW2NsaWVudFNlbGVjdGlvblR5cGUsIHNldENsaWVudFNlbGVjdGlvblR5cGVdID0gdXNlU3RhdGUobnVsbCk7XG4gIGNvbnN0IFtzaG93TWFwLCBzZXRTaG93TWFwXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW21hcFJlZ2lvbk9wdGlvbnMsIHNldE1hcFJlZ2lvbk9wdGlvbnNdID0gdXNlU3RhdGUoW10pO1xuICBjb25zdCBbbWFwU2VjdGlvbk1hcCwgc2V0TWFwU2VjdGlvbk1hcF0gPSB1c2VTdGF0ZSh7fSk7XG4gIGNvbnN0IFttYXBTdGVwLCBzZXRNYXBTdGVwXSA9IHVzZVN0YXRlKFwicmVnaW9uc1wiKTtcbiAgY29uc3QgW21hcFJlZ2lvbiwgc2V0TWFwUmVnaW9uXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbbWFwUm93LCBzZXRNYXBSb3ddID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFttYXBDb2wsIHNldE1hcENvbF0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW21hcFBhbGxldCwgc2V0TWFwUGFsbGV0XSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbbWFwQ2VsbFBhbGxldHMsIHNldE1hcENlbGxQYWxsZXRzXSA9IHVzZVN0YXRlKHt9KTtcbiAgY29uc3QgW21hcFBhbGxldEJpbnMsIHNldE1hcFBhbGxldEJpbnNdID0gdXNlU3RhdGUoe30pO1xuICBjb25zdCBbbWFwTG9hZGluZywgc2V0TWFwTG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFttYXBFcnJvciwgc2V0TWFwRXJyb3JdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFttYXBEaXJlY3RvcnlMb2FkZWQsIHNldE1hcERpcmVjdG9yeUxvYWRlZF0gPSB1c2VTdGF0ZShmYWxzZSk7XG5cclxuICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcclxuICBjb25zdCBsYWJlbEJhc2UgPSBbXCJuYW1lXCIsIFwiZGF0ZVwiLCBcIncvb1wiLCBcInAvblwiLCBcInMvblwiXTtcclxuICBjb25zdCBsYWJlbEJhc2VOYW1lcyA9IFtcIm5hbWVcIiwgXCJkYXRlXCIsIFwid29cIiwgXCJwblwiLCBcInNuXCJdO1xyXG4gIGNvbnN0IHNvcnRDaGVja0Jhc2UgPSBbZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZV07XHJcblxyXG4gIGZ1bmN0aW9uIHdpdGhTb3J0SWNvbihiYXNlTGFiZWxzLCBhY3RpdmVJbmRleCwgaXNEZXNjKSB7XHJcbiAgICByZXR1cm4gYmFzZUxhYmVscy5tYXAoKHRleHQsIGkpID0+IHtcclxuICAgICAgaWYgKGkgIT09IGFjdGl2ZUluZGV4KSByZXR1cm4gdGV4dDsgLy8gdW50b3VjaGVkXHJcbiAgICAgIGNvbnN0IGFycm93ID0gaXNEZXNjID8gXCIg4pa8XCIgOiBcIiDilrJcIjtcclxuICAgICAgcmV0dXJuIGAke3RleHR9JHthcnJvd31gO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgY29uc3QgW2xhYmVscywgc2V0TGFiZWxzXSA9IHVzZVN0YXRlKGxhYmVsQmFzZSk7XHJcbiAgY29uc3QgW3NvcnRDaGVjaywgc2V0U29ydENoZWNrXSA9IHVzZVN0YXRlKHNvcnRDaGVja0Jhc2UpO1xyXG4gIGNvbnN0IFtob3ZlckluZGV4LCBzZXRIb3ZlckluZGV4XSA9IHVzZVN0YXRlKG51bGwpO1xyXG4gIGNvbnN0IFtzZWxlY3RlZE1vZGVsLCBzZXRTZWxlY3RlZE1vZGVsXSA9IHVzZVN0YXRlKG51bGwpO1xyXG4gIGNvbnN0IFtnUG9zLCBzZXRHUG9zXSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbZ0lkZSwgc2V0R0lkZV0gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW2lzRGVsZXRpbmcsIHNldElzRGVsZXRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbcGFnZSwgc2V0UGFnZV0gPSB1c2VTdGF0ZSgxKTtcbiAgY29uc3QgW3BhZ2VDdXJzb3JzLCBzZXRQYWdlQ3Vyc29yc10gPSB1c2VTdGF0ZShbXSk7XG4gIGNvbnN0IFtoYXNOZXh0UGFnZSwgc2V0SGFzTmV4dFBhZ2VdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBmZXRjaFNlcSA9IHVzZVJlZigwKTtcbiAgY29uc3QgYmFja2ZpbGxJbkZsaWdodCA9IHVzZVJlZihmYWxzZSk7XG4gIGNvbnN0IFtxdWVyeUVwb2NoLCBzZXRRdWVyeUVwb2NoXSA9IHVzZVN0YXRlKDApO1xuICBjb25zdCBbbG9hZEVycm9yLCBzZXRMb2FkRXJyb3JdID0gdXNlU3RhdGUobnVsbCk7XG4gIGNvbnN0IHRhYmxlQm9keVJlZiA9IHVzZVJlZihudWxsKTtcbiAgY29uc3Qgcm93SGVpZ2h0UmVmID0gdXNlUmVmKDQ2KTtcbiAgY29uc3QgaGVhZGVySGVpZ2h0UmVmID0gdXNlUmVmKDM4KTtcblxuICBjb25zdCBMT0FEX1RJTUVPVVRfTVMgPSAzMDAwMDtcbiAgY29uc3QgbWFwTGV0dGVycyA9IHVzZU1lbW8oXG4gICAgKCkgPT4gQXJyYXkuZnJvbSh7IGxlbmd0aDogMjYgfSwgKF8sIGkpID0+IFN0cmluZy5mcm9tQ2hhckNvZGUoNjUgKyBpKSksXG4gICAgW11cbiAgKTtcbiAgY29uc3QgbWFwTnVtYmVycyA9IHVzZU1lbW8oXG4gICAgKCkgPT4gQXJyYXkuZnJvbSh7IGxlbmd0aDogNTAgfSwgKF8sIGkpID0+IGkgKyAxKSxcbiAgICBbXVxuICApO1xuXG4gIGNvbnN0IGxvYWRNYXBEaXJlY3RvcnkgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XG4gICAgaWYgKG1hcERpcmVjdG9yeUxvYWRlZCkgcmV0dXJuO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBkb2MgPSBhd2FpdCBmaXJlYmFzZVxuICAgICAgICAuZmlyZXN0b3JlKClcbiAgICAgICAgLmNvbGxlY3Rpb24oXCJXYXJlaG91c2VcIilcbiAgICAgICAgLmRvYyhcImRpcmVjdG9yeVwiKVxuICAgICAgICAuZ2V0KCk7XG4gICAgICBjb25zdCBkYXRhID0gZG9jLmRhdGEoKSB8fCB7fTtcbiAgICAgIHNldE1hcFJlZ2lvbk9wdGlvbnMoZGF0YS5SZWdpb24gfHwgW10pO1xuICAgICAgc2V0TWFwU2VjdGlvbk1hcChkYXRhLlNlY3Rpb24gfHwge30pO1xuICAgICAgc2V0TWFwRGlyZWN0b3J5TG9hZGVkKHRydWUpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGxvYWQgbWFwIGRpcmVjdG9yeVwiLCBlcnJvcik7XG4gICAgICBzZXRNYXBFcnJvcihcIkZhaWxlZCB0byBsb2FkIHdhcmVob3VzZSBkaXJlY3RvcnkuXCIpO1xuICAgIH1cbiAgfSwgW21hcERpcmVjdG9yeUxvYWRlZF0pO1xuXG4gIGNvbnN0IGdldE1hcFJlZ2lvbkRpbWVuc2lvbnMgPSB1c2VDYWxsYmFjayhcbiAgICAocmVnaW9uSWQpID0+IHtcbiAgICAgIGNvbnN0IGVudHJ5ID0gbWFwU2VjdGlvbk1hcD8uW3JlZ2lvbklkXTtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGVudHJ5KSAmJiBlbnRyeS5sZW5ndGggPj0gMikge1xuICAgICAgICBjb25zdCBjb2xzID0gcGFyc2VJbnQoZW50cnlbMF0sIDEwKTtcbiAgICAgICAgY29uc3Qgcm93cyA9IHBhcnNlSW50KGVudHJ5WzFdLCAxMCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgY29sczogTnVtYmVyLmlzRmluaXRlKGNvbHMpID8gY29scyA6IDAsXG4gICAgICAgICAgcm93czogTnVtYmVyLmlzRmluaXRlKHJvd3MpID8gcm93cyA6IDAsXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICByZXR1cm4geyBjb2xzOiAwLCByb3dzOiAwIH07XG4gICAgfSxcbiAgICBbbWFwU2VjdGlvbk1hcF1cbiAgKTtcblxuICBjb25zdCBsb2FkTWFwSW52ZW50b3J5ID0gdXNlQ2FsbGJhY2soYXN5bmMgKHJlZ2lvbklkKSA9PiB7XG4gICAgaWYgKCFyZWdpb25JZCkgcmV0dXJuO1xuICAgIHNldE1hcExvYWRpbmcodHJ1ZSk7XG4gICAgc2V0TWFwRXJyb3IoXCJcIik7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHNuYXAgPSBhd2FpdCBmaXJlYmFzZVxuICAgICAgICAuZmlyZXN0b3JlKClcbiAgICAgICAgLmNvbGxlY3Rpb24oXCJUZXN0XCIpXG4gICAgICAgIC53aGVyZShcIm5ld0xvY2FsQ3VycmVudC5yZWdpb25cIiwgXCI9PVwiLCByZWdpb25JZClcbiAgICAgICAgLmdldCgpO1xuXG4gICAgICBjb25zdCBjZWxsUGFsbGV0cyA9IHt9O1xuICAgICAgY29uc3QgcGFsbGV0QmlucyA9IHt9O1xuICAgICAgc25hcC5mb3JFYWNoKChkb2MpID0+IHtcbiAgICAgICAgY29uc3QgbG9jID0gZG9jLmRhdGEoKT8ubmV3TG9jYWxDdXJyZW50IHx8IHt9O1xuICAgICAgICBsZXQgcm93ID0gbG9jLnNlY3Rpb24/LmxldHRlcjtcbiAgICAgICAgbGV0IGNvbCA9IGxvYy5zZWN0aW9uPy5udW1iZXI7XG4gICAgICAgIGlmICgoIXJvdyB8fCAhY29sKSAmJiB0eXBlb2YgbG9jLnNlY3Rpb24gPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICBjb25zdCB0cmltbWVkID0gbG9jLnNlY3Rpb24udHJpbSgpO1xuICAgICAgICAgIHJvdyA9IHRyaW1tZWQuc2xpY2UoMCwgMSk7XG4gICAgICAgICAgY29sID0gdHJpbW1lZC5zbGljZSgxKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29sICE9PSB1bmRlZmluZWQgJiYgY29sICE9PSBudWxsKSB7XG4gICAgICAgICAgY29sID0gU3RyaW5nKGNvbCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcGFsbGV0ID0gbG9jLnBhbGxldDtcbiAgICAgICAgY29uc3QgYmluID0gbG9jLmJpbjtcbiAgICAgICAgaWYgKCFyb3cgfHwgIWNvbCkgcmV0dXJuO1xuICAgICAgICBjb25zdCBjZWxsS2V5ID0gYCR7cm93fS0ke2NvbH1gO1xuICAgICAgICBpZiAocGFsbGV0ICE9PSB1bmRlZmluZWQgJiYgcGFsbGV0ICE9PSBudWxsICYmIGAke3BhbGxldH1gICE9PSBcIlwiKSB7XG4gICAgICAgICAgaWYgKCFjZWxsUGFsbGV0c1tjZWxsS2V5XSkgY2VsbFBhbGxldHNbY2VsbEtleV0gPSBuZXcgU2V0KCk7XG4gICAgICAgICAgY2VsbFBhbGxldHNbY2VsbEtleV0uYWRkKFN0cmluZyhwYWxsZXQpKTtcbiAgICAgICAgICBpZiAoYmluICE9PSB1bmRlZmluZWQgJiYgYmluICE9PSBudWxsICYmIGAke2Jpbn1gICE9PSBcIlwiKSB7XG4gICAgICAgICAgICBjb25zdCBwYWxsZXRLZXkgPSBgJHtjZWxsS2V5fS1QJHtwYWxsZXR9YDtcbiAgICAgICAgICAgIGlmICghcGFsbGV0Qmluc1twYWxsZXRLZXldKSBwYWxsZXRCaW5zW3BhbGxldEtleV0gPSBuZXcgU2V0KCk7XG4gICAgICAgICAgICBwYWxsZXRCaW5zW3BhbGxldEtleV0uYWRkKFN0cmluZyhiaW4pKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBjZWxsT2JqID0ge307XG4gICAgICBPYmplY3Qua2V5cyhjZWxsUGFsbGV0cykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgIGNlbGxPYmpba2V5XSA9IEFycmF5LmZyb20oY2VsbFBhbGxldHNba2V5XSkuc29ydChcbiAgICAgICAgICAoYSwgYikgPT4gTnVtYmVyKGEpIC0gTnVtYmVyKGIpXG4gICAgICAgICk7XG4gICAgICB9KTtcblxuICAgICAgY29uc3QgcGFsbGV0T2JqID0ge307XG4gICAgICBPYmplY3Qua2V5cyhwYWxsZXRCaW5zKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgcGFsbGV0T2JqW2tleV0gPSBBcnJheS5mcm9tKHBhbGxldEJpbnNba2V5XSkuc29ydChcbiAgICAgICAgICAoYSwgYikgPT4gTnVtYmVyKGEpIC0gTnVtYmVyKGIpXG4gICAgICAgICk7XG4gICAgICB9KTtcblxuICAgICAgc2V0TWFwQ2VsbFBhbGxldHMoY2VsbE9iaik7XG4gICAgICBzZXRNYXBQYWxsZXRCaW5zKHBhbGxldE9iaik7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gbG9hZCBtYXAgaW52ZW50b3J5XCIsIGVycm9yKTtcbiAgICAgIHNldE1hcEVycm9yKFwiRmFpbGVkIHRvIGxvYWQgbWFwIGludmVudG9yeS5cIik7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldE1hcExvYWRpbmcoZmFsc2UpO1xuICAgIH1cbiAgfSwgW10pO1xuXG4gIGNvbnN0IG9wZW5NYXAgPSBhc3luYyAoKSA9PiB7XG4gICAgc2V0TWFwRXJyb3IoXCJcIik7XG4gICAgYXdhaXQgbG9hZE1hcERpcmVjdG9yeSgpO1xuICAgIGlmIChtYXBSZWdpb24pIHtcbiAgICAgIHNldE1hcFN0ZXAoXCJncmlkXCIpO1xuICAgICAgbG9hZE1hcEludmVudG9yeShtYXBSZWdpb24pO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZXRNYXBTdGVwKFwicmVnaW9uc1wiKTtcbiAgICB9XG4gICAgc2V0U2hvd01hcCh0cnVlKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVNYXBTZWxlY3RSZWdpb24gPSAocmVnaW9uSWQpID0+IHtcbiAgICBzZXRNYXBSZWdpb24ocmVnaW9uSWQpO1xuICAgIHNldE1hcFJvdyhcIlwiKTtcbiAgICBzZXRNYXBDb2woXCJcIik7XG4gICAgc2V0TWFwUGFsbGV0KFwiXCIpO1xuICAgIHNldE1hcFN0ZXAoXCJncmlkXCIpO1xuICAgIGxvYWRNYXBJbnZlbnRvcnkocmVnaW9uSWQpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZU1hcFNlbGVjdENlbGwgPSAocm93TGV0dGVyLCBjb2xOdW1iZXIpID0+IHtcbiAgICBzZXRNYXBSb3cocm93TGV0dGVyKTtcbiAgICBzZXRNYXBDb2woY29sTnVtYmVyKTtcbiAgICBzZXRNYXBQYWxsZXQoXCJcIik7XG4gICAgc2V0TWFwU3RlcChcInBhbGxldHNcIik7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlTWFwU2VsZWN0UGFsbGV0ID0gKHBhbGxldElkKSA9PiB7XG4gICAgc2V0TWFwUGFsbGV0KHBhbGxldElkKTtcbiAgICBzZXRNYXBTdGVwKFwiYmluc1wiKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVNYXBCYWNrID0gKCkgPT4ge1xuICAgIGlmIChtYXBTdGVwID09PSBcImJpbnNcIikgc2V0TWFwU3RlcChcInBhbGxldHNcIik7XG4gICAgZWxzZSBpZiAobWFwU3RlcCA9PT0gXCJwYWxsZXRzXCIpIHNldE1hcFN0ZXAoXCJncmlkXCIpO1xuICAgIGVsc2UgaWYgKG1hcFN0ZXAgPT09IFwiZ3JpZFwiKSBzZXRNYXBTdGVwKFwicmVnaW9uc1wiKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVNYXBWaWV3ID0gKG92ZXJyaWRlcyA9IHt9KSA9PiB7XG4gICAgY29uc3QgcGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcygpO1xuICAgIGNvbnN0IHJlZ2lvblZhbHVlID0gb3ZlcnJpZGVzLnJlZ2lvbiA/PyBtYXBSZWdpb247XG4gICAgY29uc3QgbGV0dGVyVmFsdWUgPSBvdmVycmlkZXMuc2VjdGlvbkxldHRlciA/PyBtYXBSb3c7XG4gICAgY29uc3QgbnVtYmVyVmFsdWUgPSBvdmVycmlkZXMuc2VjdGlvbk51bWJlciA/PyBtYXBDb2w7XG4gICAgY29uc3QgcGFsbGV0VmFsdWUgPSBvdmVycmlkZXMucGFsbGV0ID8/IG1hcFBhbGxldDtcbiAgICBjb25zdCBiaW5WYWx1ZSA9IG92ZXJyaWRlcy5iaW4gPz8gXCJcIjtcblxuICAgIGlmIChyZWdpb25WYWx1ZSkgcGFyYW1zLnNldChcInJlZ2lvblwiLCByZWdpb25WYWx1ZSk7XG4gICAgaWYgKGxldHRlclZhbHVlKSBwYXJhbXMuc2V0KFwic2VjdGlvbkxldHRlclwiLCBsZXR0ZXJWYWx1ZSk7XG4gICAgaWYgKG51bWJlclZhbHVlKSBwYXJhbXMuc2V0KFwic2VjdGlvbk51bWJlclwiLCBudW1iZXJWYWx1ZSk7XG4gICAgaWYgKHBhbGxldFZhbHVlKSBwYXJhbXMuc2V0KFwicGFsbGV0XCIsIHBhbGxldFZhbHVlKTtcbiAgICBpZiAoYmluVmFsdWUpIHBhcmFtcy5zZXQoXCJiaW5cIiwgYmluVmFsdWUpO1xuXG4gICAgY29uc3QgcXVlcnkgPSBwYXJhbXMudG9TdHJpbmcoKTtcbiAgICByb3V0ZXIucHVzaChcbiAgICAgIGAvTmV3U2VhcmNoL2ludmVudG9yeS9pbnZlbnRvcnlNYW5hZ2Uke3F1ZXJ5ID8gYD8ke3F1ZXJ5fWAgOiBcIlwifWBcbiAgICApO1xuICB9O1xuXG4gIGNvbnN0IHN0YXJ0TmFtZVRva2VuQmFja2ZpbGwgPSB1c2VDYWxsYmFjayhhc3luYyAocmVhc29uID0gXCJcIikgPT4ge1xuICAgIGlmIChiYWNrZmlsbEluRmxpZ2h0LmN1cnJlbnQpIHJldHVybjtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgY29uc3QgbGFzdFJ1biA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIm5hbWVUb2tlbnNCYWNrZmlsbEF0XCIpO1xuICAgICAgaWYgKGxhc3RSdW4gJiYgRGF0ZS5ub3coKSAtIE51bWJlcihsYXN0UnVuKSA8IDI0ICogNjAgKiA2MCAqIDEwMDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIGJhY2tmaWxsSW5GbGlnaHQuY3VycmVudCA9IHRydWU7XG4gICAgY29uc3QgZGIgPSBmaXJlYmFzZS5maXJlc3RvcmUoKTtcbiAgICBsZXQgbGFzdERvYyA9IG51bGw7XG5cbiAgICBjb25zdCB0b2tlbnNFcXVhbCA9IChhLCBiKSA9PiB7XG4gICAgICBpZiAoYS5sZW5ndGggIT09IGIubGVuZ3RoKSByZXR1cm4gZmFsc2U7XG4gICAgICBjb25zdCBzZXRBID0gbmV3IFNldChhKTtcbiAgICAgIGNvbnN0IHNldEIgPSBuZXcgU2V0KGIpO1xuICAgICAgaWYgKHNldEEuc2l6ZSAhPT0gc2V0Qi5zaXplKSByZXR1cm4gZmFsc2U7XG4gICAgICBmb3IgKGNvbnN0IHYgb2Ygc2V0QSkgaWYgKCFzZXRCLmhhcyh2KSkgcmV0dXJuIGZhbHNlO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcblxuICAgIHRyeSB7XG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICBsZXQgcXVlcnkgPSBkYlxuICAgICAgICAgIC5jb2xsZWN0aW9uKFwiVGVzdFwiKVxuICAgICAgICAgIC5vcmRlckJ5KGZpcmViYXNlLmZpcmVzdG9yZS5GaWVsZFBhdGguZG9jdW1lbnRJZCgpKVxuICAgICAgICAgIC5saW1pdCgyMDApO1xuICAgICAgICBpZiAobGFzdERvYykgcXVlcnkgPSBxdWVyeS5zdGFydEFmdGVyKGxhc3REb2MpO1xuXG4gICAgICAgIGNvbnN0IHNuYXAgPSBhd2FpdCBxdWVyeS5nZXQoKTtcbiAgICAgICAgaWYgKHNuYXAuZW1wdHkpIGJyZWFrO1xuXG4gICAgICAgIGNvbnN0IGJhdGNoID0gZGIuYmF0Y2goKTtcbiAgICAgICAgbGV0IHdyaXRlcyA9IDA7XG5cbiAgICAgICAgc25hcC5kb2NzLmZvckVhY2goKGRvYykgPT4ge1xuICAgICAgICAgIGNvbnN0IGRhdGEgPSBkb2MuZGF0YSgpIHx8IHt9O1xuICAgICAgICAgIGNvbnN0IG5hbWUgPSB0eXBlb2YgZGF0YS5uYW1lID09PSBcInN0cmluZ1wiID8gZGF0YS5uYW1lIDogXCJcIjtcbiAgICAgICAgICBjb25zdCBuYW1lTG93ZXIgPSBuYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgY29uc3QgbmFtZVRva2VucyA9IGJ1aWxkTmFtZVRva2VucyhuYW1lKTtcbiAgICAgICAgICBjb25zdCBleGlzdGluZ1Rva2VucyA9IEFycmF5LmlzQXJyYXkoZGF0YS5uYW1lVG9rZW5zKVxuICAgICAgICAgICAgPyBBcnJheS5mcm9tKG5ldyBTZXQoZGF0YS5uYW1lVG9rZW5zLm1hcCgodikgPT4gU3RyaW5nKHYpKSkpXG4gICAgICAgICAgICA6IFtdO1xuXG4gICAgICAgICAgY29uc3QgbmVlZHNVcGRhdGUgPVxuICAgICAgICAgICAgZGF0YS5uYW1lTG93ZXIgIT09IG5hbWVMb3dlciB8fFxuICAgICAgICAgICAgIXRva2Vuc0VxdWFsKGV4aXN0aW5nVG9rZW5zLCBuYW1lVG9rZW5zKTtcblxuICAgICAgICAgIGlmIChuZWVkc1VwZGF0ZSkge1xuICAgICAgICAgICAgYmF0Y2gudXBkYXRlKGRvYy5yZWYsIHsgbmFtZUxvd2VyLCBuYW1lVG9rZW5zIH0pO1xuICAgICAgICAgICAgd3JpdGVzICs9IDE7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAod3JpdGVzID4gMCkge1xuICAgICAgICAgIGF3YWl0IGJhdGNoLmNvbW1pdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGFzdERvYyA9IHNuYXAuZG9jc1tzbmFwLmRvY3MubGVuZ3RoIC0gMV07XG4gICAgICAgIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIDI1KSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcbiAgICAgICAgICBcIm5hbWVUb2tlbnNCYWNrZmlsbEF0XCIsXG4gICAgICAgICAgU3RyaW5nKERhdGUubm93KCkpXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJOYW1lIHRva2VuIGJhY2tmaWxsIGZhaWxlZDpcIiwgcmVhc29uLCBlcnJvcik7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGJhY2tmaWxsSW5GbGlnaHQuY3VycmVudCA9IGZhbHNlO1xuICAgIH1cbiAgfSwgW10pO1xuXG4gIGNvbnN0IHNlYXJjaExvd2VyID0gKHNlYXJjaCB8fCBcIlwiKS50b0xvd2VyQ2FzZSgpLnRyaW0oKTtcbiAgY29uc3QgaGFzQWN0aXZlRmlsdGVycyA9XG4gICAgQm9vbGVhbihzZWxlY3RlZE9FTSkgfHxcbiAgICBCb29sZWFuKHNlbGVjdGVkTW9kYWxpdHkpIHx8XG4gICAgQm9vbGVhbihzZWxlY3RlZE1vZGVsKSB8fFxuICAgIEJvb2xlYW4oc2VsZWN0ZWRDbGllbnRGcm9tKSB8fFxuICAgIEJvb2xlYW4oc2VsZWN0ZWRDbGllbnRDdXJyZW50KSB8fFxuICAgIEJvb2xlYW4oc2VhcmNoTG93ZXIpO1xuXG4gIGNvbnN0IHZhbHVlTWF0Y2hlcyA9ICh2YWx1ZSwgcykgPT4ge1xuICAgIGlmICghdmFsdWUpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiB2YWx1ZS5zb21lKCh2KSA9PiB2YWx1ZU1hdGNoZXModiwgcykpO1xuICAgIH1cbiAgICByZXR1cm4gU3RyaW5nKHZhbHVlKS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHMpO1xuICB9O1xuXG4gIGNvbnN0IG1hdGNoZXNGaWx0ZXJzID0gdXNlQ2FsbGJhY2soXG4gICAgKGl0ZW0pID0+IHtcbiAgICAgIC8vIGhpZGUgZXhwbGljaXRseSBoaWRkZW4gaXRlbXNcbiAgICAgIGlmIChpdGVtPy52aXNpYmxlID09PSBmYWxzZSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAvLyBPRU0gLyBNb2RhbGl0eSAvIE1vZGVsIGZpbHRlcmluZ1xuICAgICAgY29uc3QgT0VNID0gZ2V0TWFjaGluZUZpZWxkKGl0ZW0sIFwiT0VNXCIpO1xuICAgICAgY29uc3QgTW9kYWxpdHkgPSBnZXRNYWNoaW5lRmllbGQoaXRlbSwgXCJNb2RhbGl0eVwiKTtcbiAgICAgIGNvbnN0IE1vZGVsID0gZ2V0TWFjaGluZUZpZWxkKGl0ZW0sIFwiTW9kZWxcIik7XG5cbiAgICAgIGlmIChzZWxlY3RlZE9FTSAmJiBub3JtYWxpemVUZXh0KE9FTSkgIT09IG5vcm1hbGl6ZVRleHQoc2VsZWN0ZWRPRU0pKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmIChcbiAgICAgICAgc2VsZWN0ZWRNb2RhbGl0eSAmJlxuICAgICAgICBub3JtYWxpemVUZXh0KE1vZGFsaXR5KSAhPT0gbm9ybWFsaXplVGV4dChzZWxlY3RlZE1vZGFsaXR5KVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmIChzZWxlY3RlZE1vZGVsICYmIG5vcm1hbGl6ZVRleHQoTW9kZWwpICE9PSBub3JtYWxpemVUZXh0KHNlbGVjdGVkTW9kZWwpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgLy8gQ2xpZW50IGZpbHRlcnNcbiAgICAgIGlmIChzZWxlY3RlZENsaWVudEZyb20gJiYgaXRlbT8uY2xpZW50RnJvbUlkICE9PSBzZWxlY3RlZENsaWVudEZyb20pIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKFxuICAgICAgICBzZWxlY3RlZENsaWVudEN1cnJlbnQgJiZcbiAgICAgICAgaXRlbT8uY2xpZW50Q3VycmVudElkICE9PSBzZWxlY3RlZENsaWVudEN1cnJlbnRcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIC8vIFNlYXJjaFxuICAgICAgaWYgKHNlYXJjaExvd2VyKSB7XG4gICAgICAgIGlmIChzZWxlY3QgPT09IFwiTmFtZVwiKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlTWF0Y2hlcyhpdGVtPy5uYW1lLCBzZWFyY2hMb3dlcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNlbGVjdCA9PT0gXCJEYXRlXCIpIHtcbiAgICAgICAgICBjb25zdCB3YW50ZWREYXkgPSBzZWFyY2hMb3dlcjsgLy8geXl5eS1tbS1kZCBmcm9tIGlucHV0XG4gICAgICAgICAgY29uc3QgaXRlbVlNRCA9IHRvWU1EKGl0ZW0/LmRhdGUpO1xuICAgICAgICAgIGlmIChpdGVtWU1EICYmIGl0ZW1ZTUQgPT09IHdhbnRlZERheSkgcmV0dXJuIHRydWU7XG4gICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoaXRlbT8uZGVzY3JpcHRpb25zKSkge1xuICAgICAgICAgICAgaWYgKGl0ZW0uZGVzY3JpcHRpb25zLnNvbWUoKGQpID0+IHRvWU1EKGQ/LmRhdGUpID09PSB3YW50ZWREYXkpKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShpdGVtPy53b3JrT3JkZXJzKSkge1xuICAgICAgICAgICAgaWYgKGl0ZW0ud29ya09yZGVycy5zb21lKCh3KSA9PiB0b1lNRCh3Py5kYXRlKSA9PT0gd2FudGVkRGF5KSkge1xuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzZWxlY3QgPT09IFwiV29yayBPcmRlclwiKSB7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIEFycmF5LmlzQXJyYXkoaXRlbT8ud29ya09yZGVycykgJiZcbiAgICAgICAgICAgIGl0ZW0ud29ya09yZGVycy5zb21lKCh3bykgPT5cbiAgICAgICAgICAgICAgdmFsdWVNYXRjaGVzKHdvPy53b3JrT3JkZXIsIHNlYXJjaExvd2VyKVxuICAgICAgICAgICAgKVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNlbGVjdCA9PT0gXCJQcm9kdWN0IE51bWJlclwiKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlTWF0Y2hlcyhpdGVtPy5wbiwgc2VhcmNoTG93ZXIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzZWxlY3QgPT09IFwiU2VyaWFsIE51bWJlclwiKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlTWF0Y2hlcyhpdGVtPy5zbiwgc2VhcmNoTG93ZXIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzZWxlY3QgPT09IFwiRGVzY3JpcHRpb25cIikge1xuICAgICAgICAgIGlmICh2YWx1ZU1hdGNoZXMoaXRlbT8uZGVzYywgc2VhcmNoTG93ZXIpKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICBpZiAodmFsdWVNYXRjaGVzKGl0ZW0/LmRlc2NyaXB0aW9uLCBzZWFyY2hMb3dlcikpIHJldHVybiB0cnVlO1xuICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGl0ZW0/LmRlc2NyaXB0aW9ucykpIHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtLmRlc2NyaXB0aW9ucy5zb21lKChkKSA9PlxuICAgICAgICAgICAgICB2YWx1ZU1hdGNoZXMoZD8uZGVzY3JpcHRpb24sIHNlYXJjaExvd2VyKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzZWxlY3QgPT09IFwiU0tVXCIpIHtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgdmFsdWVNYXRjaGVzKGl0ZW0/LmlkLCBzZWFyY2hMb3dlcikgfHxcbiAgICAgICAgICAgIHZhbHVlTWF0Y2hlcyhpdGVtPy5sb2NhbFNOLCBzZWFyY2hMb3dlcikgfHxcbiAgICAgICAgICAgIHZhbHVlTWF0Y2hlcyhpdGVtPy5sb2NhbF9zbiwgc2VhcmNoTG93ZXIpXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuICAgIFtcbiAgICAgIHNlbGVjdGVkT0VNLFxuICAgICAgc2VsZWN0ZWRNb2RhbGl0eSxcbiAgICAgIHNlbGVjdGVkTW9kZWwsXG4gICAgICBzZWxlY3RlZENsaWVudEZyb20sXG4gICAgICBzZWxlY3RlZENsaWVudEN1cnJlbnQsXG4gICAgICBzZWFyY2hMb3dlcixcbiAgICAgIHNlbGVjdCxcbiAgICBdXG4gICk7XG5cbiAgY29uc3QgcmVzZXRQYWdpbmF0aW9uID0gKCkgPT4ge1xuICAgIHNldFBhZ2UoMSk7XG4gICAgc2V0UGFnZUN1cnNvcnMoW10pO1xuICAgIHNldEhhc05leHRQYWdlKGZhbHNlKTtcbiAgfTtcblxuICAvLyBSZXNldCBwYWdpbmF0aW9uIG9uIHJvdXRlL3F1ZXJ5IGNoYW5nZSAocHJldmVudHMgc3RhbGUgcGFnZXMgbGlrZSDigJxzdGFydGluZyBhdCA24oCdKVxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHJlc2V0UGFnaW5hdGlvbigpO1xuICAgIHNldFF1ZXJ5RXBvY2goKHYpID0+IHYgKyAxKTtcbiAgfSwgW3JvdXRlci5hc1BhdGhdKTtcblxuICAvLyBSZXNldCBhbmQgcmVmZXRjaCB3aGVuIGZpbHRlcnMvc2VhcmNoIGNoYW5nZVxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHJlc2V0UGFnaW5hdGlvbigpO1xuICAgIHNldFF1ZXJ5RXBvY2goKHYpID0+IHYgKyAxKTtcbiAgfSwgW1xuICAgIHNlbGVjdGVkT0VNLFxuICAgIHNlbGVjdGVkTW9kYWxpdHksXG4gICAgc2VsZWN0ZWRNb2RlbCxcbiAgICBzZWxlY3RlZENsaWVudEZyb20sXG4gICAgc2VsZWN0ZWRDbGllbnRDdXJyZW50LFxuICAgIHNlYXJjaCxcbiAgICBzZWxlY3QsXG4gIF0pO1xuXG5cbiAgLy8gRmV0Y2ggZGF0YSBvbiBjb21wb25lbnQgbW91bnQgYW5kIHJvdXRlIGNoYW5nZVxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGZldGNoRGF0YShwYWdlKTtcbiAgfSwgW3BhZ2UsIHF1ZXJ5RXBvY2hdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghcm91dGVyPy5ldmVudHMpIHJldHVybjtcbiAgICBjb25zdCBoYW5kbGVEb25lID0gKCkgPT4gc2V0SXNOYXZpZ2F0aW5nKGZhbHNlKTtcbiAgICByb3V0ZXIuZXZlbnRzLm9uKFwicm91dGVDaGFuZ2VDb21wbGV0ZVwiLCBoYW5kbGVEb25lKTtcbiAgICByb3V0ZXIuZXZlbnRzLm9uKFwicm91dGVDaGFuZ2VFcnJvclwiLCBoYW5kbGVEb25lKTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgcm91dGVyLmV2ZW50cy5vZmYoXCJyb3V0ZUNoYW5nZUNvbXBsZXRlXCIsIGhhbmRsZURvbmUpO1xuICAgICAgcm91dGVyLmV2ZW50cy5vZmYoXCJyb3V0ZUNoYW5nZUVycm9yXCIsIGhhbmRsZURvbmUpO1xuICAgIH07XG4gIH0sIFtyb3V0ZXJdKTtcblxuICBhc3luYyBmdW5jdGlvbiBmZXRjaERhdGEocmVxdWVzdGVkUGFnZSA9IDEpIHtcbiAgICBjb25zdCBzZXEgPSArK2ZldGNoU2VxLmN1cnJlbnQ7XG4gICAgbGV0IHRpbWVkT3V0ID0gZmFsc2U7XG4gICAgc2V0SXNMb2FkaW5nKHRydWUpO1xuICAgIHNldExvYWRFcnJvcihudWxsKTtcbiAgICBjb25zdCB0aW1lb3V0SWQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRpbWVkT3V0ID0gdHJ1ZTtcbiAgICAgIGlmIChzZXEgPT09IGZldGNoU2VxLmN1cnJlbnQpIHtcbiAgICAgICAgc2V0TG9hZEVycm9yKHtcbiAgICAgICAgICBjb2RlOiBcInRpbWVvdXRcIixcbiAgICAgICAgICBtZXNzYWdlOiBgTG9hZGluZyBpcyB0YWtpbmcgbG9uZ2VyIHRoYW4gJHtNYXRoLnJvdW5kKFxuICAgICAgICAgICAgTE9BRF9USU1FT1VUX01TIC8gMTAwMFxuICAgICAgICAgICl9cy4gVGhpcyBpcyBsaWtlbHkgZHVlIHRvIHZlcnkgc2VsZWN0aXZlIGZpbHRlcnMuYCxcbiAgICAgICAgfSk7XG4gICAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XG4gICAgICB9XG4gICAgfSwgTE9BRF9USU1FT1VUX01TKTtcbiAgICB0cnkge1xuICAgICAgaWYgKHJvdXRlci5xdWVyeS5pbnB1dFRleHQgJiYgcm91dGVyLnF1ZXJ5LnNlbGVjdGVkVHlwZSkge1xuICAgICAgICBzZXRTZWxlY3Qocm91dGVyLnF1ZXJ5LnNlbGVjdGVkVHlwZSk7XG4gICAgICAgIHNldFNlYXJjaChyb3V0ZXIucXVlcnkuaW5wdXRUZXh0KTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHN0YXJ0QWZ0ZXJEb2MgPVxuICAgICAgICByZXF1ZXN0ZWRQYWdlID4gMSA/IHBhZ2VDdXJzb3JzW3JlcXVlc3RlZFBhZ2UgLSAyXSA6IG51bGw7XG4gICAgICBpZiAocmVxdWVzdGVkUGFnZSA+IDEgJiYgIXN0YXJ0QWZ0ZXJEb2MpIHtcbiAgICAgICAgc2V0UGFnZSgxKTtcbiAgICAgICAgaWYgKHNlcSA9PT0gZmV0Y2hTZXEuY3VycmVudCkge1xuICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0SWQpO1xuICAgICAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3QgZWZmZWN0aXZlU2VsZWN0ID0gcm91dGVyLnF1ZXJ5LnNlbGVjdGVkVHlwZSB8fCBzZWxlY3Q7XG4gICAgICBjb25zdCBlZmZlY3RpdmVTZWFyY2ggPSByb3V0ZXIucXVlcnkuaW5wdXRUZXh0IHx8IHNlYXJjaDtcbiAgICAgIGNvbnN0IGVmZmVjdGl2ZVNlYXJjaExvd2VyID0gKGVmZmVjdGl2ZVNlYXJjaCB8fCBcIlwiKVxuICAgICAgICAudG9Mb3dlckNhc2UoKVxuICAgICAgICAudHJpbSgpO1xuXG4gICAgICAvLyBsaWdodCByZXRyeSBmb3IgdHJhbnNpZW50IEZpcmVzdG9yZSBoaWNjdXBzXG4gICAgICBjb25zdCBsb2FkID0gYXN5bmMgKGF0dGVtcHQgPSAxKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmV0dXJuIGF3YWl0IGZldGNoUGFydHNXaXRoTWFjaGluZURhdGFQYWdlKHtcbiAgICAgICAgICAgIHBhZ2VTaXplLFxuICAgICAgICAgICAgc3RhcnRBZnRlckRvYyxcbiAgICAgICAgICAgIHZpc2libGVPbmx5OiB0cnVlLFxuICAgICAgICAgICAgZmlsdGVyRm46IGhhc0FjdGl2ZUZpbHRlcnMgPyBtYXRjaGVzRmlsdGVycyA6IG51bGwsXG4gICAgICAgICAgICBzZWFyY2g6IGVmZmVjdGl2ZVNlYXJjaExvd2VyXG4gICAgICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAgICAgdHlwZTogZWZmZWN0aXZlU2VsZWN0LFxuICAgICAgICAgICAgICAgICAgcmF3OiBlZmZlY3RpdmVTZWFyY2gsXG4gICAgICAgICAgICAgICAgICBsb3dlcjogZWZmZWN0aXZlU2VhcmNoTG93ZXIsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICA6IG51bGwsXG4gICAgICAgICAgICBuZWVkc01hY2hpbmVEYXRhOlxuICAgICAgICAgICAgICBCb29sZWFuKHNlbGVjdGVkT0VNKSB8fFxuICAgICAgICAgICAgICBCb29sZWFuKHNlbGVjdGVkTW9kYWxpdHkpIHx8XG4gICAgICAgICAgICAgIEJvb2xlYW4oc2VsZWN0ZWRNb2RlbCkgfHxcbiAgICAgICAgICAgICAgQm9vbGVhbihzZWxlY3RlZENsaWVudEZyb20pIHx8XG4gICAgICAgICAgICAgIEJvb2xlYW4oc2VsZWN0ZWRDbGllbnRDdXJyZW50KSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIGlmIChhdHRlbXB0ID49IDMpIHRocm93IGU7XG4gICAgICAgICAgYXdhaXQgbmV3IFByb21pc2UociA9PiBzZXRUaW1lb3V0KHIsIDI1MCAqIE1hdGgucG93KDIsIGF0dGVtcHQgLSAxKSkpO1xuICAgICAgICAgIHJldHVybiBsb2FkKGF0dGVtcHQgKyAxKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIGNvbnN0IHsgcGFydHM6IGRhdGEsIGxhc3REb2MsIGhhc05leHRQYWdlOiBuZXh0UGFnZSB9ID0gYXdhaXQgbG9hZCgpO1xuICAgICAgaWYgKHRpbWVkT3V0IHx8IHNlcSAhPT0gZmV0Y2hTZXEuY3VycmVudCkgcmV0dXJuO1xuICAgICAgY29uc3QgaGFzTmFtZVNlYXJjaCA9XG4gICAgICAgIEJvb2xlYW4oZWZmZWN0aXZlU2VhcmNoTG93ZXIpICYmIGVmZmVjdGl2ZVNlbGVjdCA9PT0gXCJOYW1lXCI7XG4gICAgICBpZiAoXG4gICAgICAgIGhhc05hbWVTZWFyY2ggJiZcbiAgICAgICAgKGRhdGEubGVuZ3RoID09PSAwIHx8XG4gICAgICAgICAgZGF0YS5zb21lKFxuICAgICAgICAgICAgKGl0ZW0pID0+XG4gICAgICAgICAgICAgICFBcnJheS5pc0FycmF5KGl0ZW0/Lm5hbWVUb2tlbnMpIHx8IGl0ZW0ubmFtZVRva2Vucy5sZW5ndGggPT09IDBcbiAgICAgICAgICApKVxuICAgICAgKSB7XG4gICAgICAgIHN0YXJ0TmFtZVRva2VuQmFja2ZpbGwoXCJuYW1lLXNlYXJjaFwiKTtcbiAgICAgIH1cbiAgICAgIGlmIChyZXF1ZXN0ZWRQYWdlID09PSAxICYmIGRhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHNldFBhZ2VDdXJzb3JzKFtdKTtcbiAgICAgICAgc2V0SGFzTmV4dFBhZ2UoZmFsc2UpO1xuICAgICAgfVxuICAgICAgc2V0QmFja3VwSW5mbyhkYXRhKTtcbiAgICAgIHNldExhYmVscyhsYWJlbEJhc2UpOyAvLyA8LS0gYWRkIHRoaXMgbGluZSBhZnRlciBzZXRCYWNrdXBJbmZvKGRhdGEpXG4gICAgICBzZXRJRChkYXRhLm1hcCgoaXRlbSkgPT4gaXRlbS5pZCkpO1xuICAgICAgaWYgKHJlcXVlc3RlZFBhZ2UgPiAxICYmIGRhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHNldEhhc05leHRQYWdlKGZhbHNlKTtcbiAgICAgICAgc2V0UGFnZSgxKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgc2V0SGFzTmV4dFBhZ2UobmV4dFBhZ2UpO1xuICAgICAgc2V0UGFnZUN1cnNvcnMoKHByZXYpID0+IHtcbiAgICAgICAgY29uc3QgbmV4dCA9IHJlcXVlc3RlZFBhZ2UgPT09IDEgPyBbXSA6IFsuLi5wcmV2XTtcbiAgICAgICAgaWYgKGxhc3REb2MpIHtcbiAgICAgICAgICBuZXh0W3JlcXVlc3RlZFBhZ2UgLSAxXSA9IGxhc3REb2M7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICB9KTtcbiAgICAgIHNldFNlbGVjdGVkSXRlbXMoW10pO1xuXG4gICAgICAvLyBOb3JtYWxpemUgY2xpZW50IGlkcyBmb3IgZmlsdGVyaW5nXG4gICAgICBjb25zdCBhdWdtZW50ZWQgPSBkYXRhLm1hcCgoaXRlbSkgPT4gKHtcbiAgICAgICAgLi4uaXRlbSxcbiAgICAgICAgY2xpZW50RnJvbUlkOlxuICAgICAgICAgIGl0ZW0/LmNsaWVudEZyb21JZCA/P1xuICAgICAgICAgICh0eXBlb2YgaXRlbT8uQ2xpZW50RnJvbSA9PT0gXCJzdHJpbmdcIiA/IGl0ZW0uQ2xpZW50RnJvbSA6IG51bGwpID8/XG4gICAgICAgICAgaXRlbT8uQ2xpZW50RnJvbT8uaWQgPz9cbiAgICAgICAgICBudWxsLFxuICAgICAgICBjbGllbnRDdXJyZW50SWQ6XG4gICAgICAgICAgaXRlbT8uY2xpZW50Q3VycmVudElkID8/XG4gICAgICAgICAgKHR5cGVvZiBpdGVtPy5DbGllbnRDdXJyZW50ID09PSBcInN0cmluZ1wiID8gaXRlbS5DbGllbnRDdXJyZW50IDogbnVsbCkgPz9cbiAgICAgICAgICBpdGVtPy5DbGllbnRDdXJyZW50Py5pZCA/P1xuICAgICAgICAgIG51bGwsXG4gICAgICB9KSk7XG5cclxuICAgICAgc2V0QXVnbWVudGVkSW5mbyhhdWdtZW50ZWQpO1xuICAgICAgLy8gZGVmYXVsdCB2aWV3ID0gZmlsdGVyZWQgKGtlZXBzIHBhZ2luYXRpb24gYW5kIGZpbHRlcnMgY29uc2lzdGVudClcbiAgICAgIHNldEluZm8oYXVnbWVudGVkLmZpbHRlcihtYXRjaGVzRmlsdGVycykpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgaWYgKHNlcSAhPT0gZmV0Y2hTZXEuY3VycmVudCkgcmV0dXJuO1xuICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGZldGNoaW5nIGRhdGE6XCIsIGVycik7XG4gICAgICBjb25zdCBjb2RlID0gZXJyPy5jb2RlIHx8IFwidW5rbm93blwiO1xuICAgICAgc2V0TG9hZEVycm9yKHtcbiAgICAgICAgY29kZSxcbiAgICAgICAgbWVzc2FnZTogZXJyPy5tZXNzYWdlIHx8IFwiRmFpbGVkIHRvIGxvYWQgaXRlbXMuXCIsXG4gICAgICB9KTtcbiAgICAgIHNldEluZm8oW10pO1xuICAgICAgc2V0QXVnbWVudGVkSW5mbyhbXSk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0SWQpO1xuICAgICAgaWYgKHNlcSA9PT0gZmV0Y2hTZXEuY3VycmVudCAmJiAhdGltZWRPdXQpIHNldElzTG9hZGluZyhmYWxzZSk7XG4gICAgfVxuICB9XG5cclxuICBjb25zdCBzZWFyY2hDaGFuZ2VIYW5kbGVyID0gKGV2ZW50KSA9PiBzZXRTZWFyY2goZXZlbnQudGFyZ2V0LnZhbHVlKTtcclxuXHJcbiAgLy8gRmlsdGVyIHRoZSBjdXJyZW50bHkgbG9hZGVkIGl0ZW1zIChub3cgY29uc2lzdGVudCB3aXRoIHBhZ2VkIGZpbHRlcmluZylcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBiYXNlID0gYXVnbWVudGVkSW5mbyB8fCBbXTtcbiAgICBzZXRJbmZvKGJhc2UuZmlsdGVyKG1hdGNoZXNGaWx0ZXJzKSk7XG4gIH0sIFthdWdtZW50ZWRJbmZvLCBtYXRjaGVzRmlsdGVyc10pO1xuXHJcbiAgZnVuY3Rpb24gc29ydENoZWNrQWxsKHBvcykge1xyXG4gICAgLy8gRGV0ZXJtaW5lIG5leHQgZGlyZWN0aW9uOiB0b2dnbGUgdGhlIGNsaWNrZWQgY29sdW1uIG9ubHlcclxuICAgIGNvbnN0IG5leHRTb3J0Q2hlY2sgPSBzb3J0Q2hlY2subWFwKCh2LCBpKSA9PiAoaSA9PT0gcG9zID8gIXYgOiB2KSk7XHJcbiAgICBjb25zdCBpc0Rlc2MgPSBuZXh0U29ydENoZWNrW3Bvc107IC8vIHRydWUgbWVhbnMgZGVzY2VuZGluZ1xyXG5cclxuICAgIGNvbnN0IHNvcnRlZEluZm8gPSBbLi4uaW5mb10uc29ydCgoYSwgYikgPT4ge1xyXG4gICAgICBjb25zdCBrZXkgPSBsYWJlbEJhc2VOYW1lc1twb3NdO1xyXG5cclxuICAgICAgaWYgKHBvcyA9PT0gMSkge1xyXG4gICAgICAgIC8vIERBVEUgY29sdW1uXHJcbiAgICAgICAgY29uc3QgdGEgPSB0b1RpbWUoYVtrZXldKTtcclxuICAgICAgICBjb25zdCB0YiA9IHRvVGltZShiW2tleV0pO1xyXG5cclxuICAgICAgICAvLyBQdXQgbWlzc2luZyBkYXRlcyBhdCB0aGUgZW5kIGZvciBhc2NlbmRpbmcsIGF0IHRoZSBzdGFydCBmb3IgZGVzY2VuZGluZ1xyXG4gICAgICAgIGlmICh0YSA9PT0gbnVsbCAmJiB0YiA9PT0gbnVsbCkgcmV0dXJuIDA7XHJcbiAgICAgICAgaWYgKHRhID09PSBudWxsKSByZXR1cm4gaXNEZXNjID8gLTEgOiAxO1xyXG4gICAgICAgIGlmICh0YiA9PT0gbnVsbCkgcmV0dXJuIGlzRGVzYyA/IDEgOiAtMTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGlzRGVzYyA/ICh0YiAtIHRhKSA6ICh0YSAtIHRiKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gTkFNRSBvciBTS1UgKHN0cmluZy15IGNvbHVtbnMpOiBpbmRleGVzIDAgb3IgNSBpbiB5b3VyIG9yaWdpbmFsIGxvZ2ljXHJcbiAgICAgIGlmIChwb3MgPT09IDAgfHwgcG9zID09PSA1KSB7XHJcbiAgICAgICAgY29uc3QgYXYgPSAoYVtrZXldID8/IFwiXCIpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgY29uc3QgYnYgPSAoYltrZXldID8/IFwiXCIpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgcmV0dXJuIGlzRGVzYyA/IGJ2LmxvY2FsZUNvbXBhcmUoYXYpIDogYXYubG9jYWxlQ29tcGFyZShidik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIE51bWVyaWMtaXNoIGNvbHVtbnMgKHdvLCBwbiwgc24pIOKAlCBmYWxsIGJhY2sgdG8gc3RyaW5nIGNvbXBhcmUgaWYgTmFOXHJcbiAgICAgIGNvbnN0IGFuID0gTnVtYmVyKGFba2V5XSk7XHJcbiAgICAgIGNvbnN0IGJuID0gTnVtYmVyKGJba2V5XSk7XHJcblxyXG4gICAgICBpZiAoIWlzTmFOKGFuKSAmJiAhaXNOYU4oYm4pKSB7XHJcbiAgICAgICAgcmV0dXJuIGlzRGVzYyA/IChibiAtIGFuKSA6IChhbiAtIGJuKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zdCBhdiA9IChhW2tleV0gPz8gXCJcIikudG9TdHJpbmcoKTtcclxuICAgICAgICBjb25zdCBidiA9IChiW2tleV0gPz8gXCJcIikudG9TdHJpbmcoKTtcclxuICAgICAgICByZXR1cm4gaXNEZXNjID8gYnYubG9jYWxlQ29tcGFyZShhdikgOiBhdi5sb2NhbGVDb21wYXJlKGJ2KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgc2V0SW5mbyhzb3J0ZWRJbmZvKTtcclxuICAgIHNldFNvcnRDaGVjayhuZXh0U29ydENoZWNrKTtcclxuXHJcbiAgICAvLyBVcGRhdGUgaGVhZGVyIGxhYmVscyB0byBzaG93IHRoZSBsaXR0bGUgYXJyb3cgb24gdGhlIGFjdGl2ZSBjb2x1bW5cclxuICAgIHNldExhYmVscyh3aXRoU29ydEljb24obGFiZWxCYXNlLCBwb3MsIGlzRGVzYykpO1xyXG4gIH1cclxuXHJcblxyXG4gIGNvbnN0IHJvd1NlbGVjdCA9IChpdGVtKSA9PiB7XHJcbiAgICBpZiAoaXRlbSAmJiBpdGVtLmlkKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiU2VsZWN0ZWQgaXRlbTpcIiwgaXRlbSk7XG4gICAgICBzZXRJc05hdmlnYXRpbmcodHJ1ZSk7XG4gICAgICByb3V0ZXIucHVzaChcIi4vaXRlbS9cIiArIGl0ZW0uaWQpO1xuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJVbmFibGUgdG8gZGV0ZXJtaW5lIHRoZSBzZWxlY3RlZCBpdGVt4oCZcyBJRDogXCIsIGl0ZW0pO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGNvbnN0IFtzZWxlY3RlZEl0ZW1zLCBzZXRTZWxlY3RlZEl0ZW1zXSA9IHVzZVN0YXRlKFtdKTtcclxuICBjb25zdCBbc2hvd0RlbGV0ZU1vZGFsLCBzZXRTaG93RGVsZXRlTW9kYWxdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG5cclxuICBjb25zdCBoYW5kbGVTZWxlY3RJdGVtID0gKGlkKSA9PiB7XHJcbiAgICBzZXRTZWxlY3RlZEl0ZW1zKHByZXYgPT5cclxuICAgICAgcHJldi5pbmNsdWRlcyhpZCkgPyBwcmV2LmZpbHRlcih4ID0+IHggIT09IGlkKSA6IFsuLi5wcmV2LCBpZF1cclxuICAgICk7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8vIHNldFNlbGVjdGVkSXRlbXMoKHByZXYpID0+IHtcclxuICAvLyAgIGNvbnN0IG5ld1NlbGVjdGlvbiA9IHByZXYuaW5jbHVkZXMoaWQpXHJcbiAgLy8gICAgID8gcHJldi5maWx0ZXIoKGl0ZW1JZCkgPT4gaXRlbUlkICE9PSBpZClcclxuICAvLyAgICAgOiBbLi4ucHJldiwgaWRdO1xyXG4gIC8vICAgY29uc29sZS5sb2coXCJTZWxlY3RlZCBpdGVtczpcIiwgbmV3U2VsZWN0aW9uKTtcclxuICAvLyAgIHJldHVybiBuZXdTZWxlY3Rpb247IC8vIDwtIGltcG9ydGFudFxyXG4gIC8vIH0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVTaG93RGVsZXRlTW9kYWwgPSAoKSA9PiBzZXRTaG93RGVsZXRlTW9kYWwodHJ1ZSk7XHJcbiAgY29uc3QgaGFuZGxlQ2xvc2VEZWxldGVNb2RhbCA9ICgpID0+IHNldFNob3dEZWxldGVNb2RhbChmYWxzZSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZURlbGV0ZVNlbGVjdGVkID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgc2V0SXNEZWxldGluZyh0cnVlKTtcclxuICAgIGNvbnN0IGRiID0gZmlyZWJhc2UuZmlyZXN0b3JlKCk7XHJcbiAgICB0cnkge1xyXG4gICAgICAvLyBMb29wIG92ZXIgZWFjaCBzZWxlY3RlZCBpdGVtIG9uZSBhdCBhIHRpbWVcclxuICAgICAgZm9yIChjb25zdCBpdGVtSWQgb2Ygc2VsZWN0ZWRJdGVtcykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGl0ZW1JZClcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgLy8gRGVsZXRlIGZyb20gXCJUZXN0XCIgY29sbGVjdGlvblxyXG4gICAgICAgICAgYXdhaXQgZGIuY29sbGVjdGlvbihcIlRlc3RcIikuZG9jKGl0ZW1JZCkuZGVsZXRlKCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGBFcnJvciBkZWxldGluZyBkb2N1bWVudCAke2l0ZW1JZH0gZnJvbSBUZXN0OmAsIGVycik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAvLyBEZWxldGUgZnJvbSBcIlBhcnRzXCIgY29sbGVjdGlvblxyXG4gICAgICAgICAgYXdhaXQgZGIuY29sbGVjdGlvbihcIlBhcnRzXCIpLmRvYyhpdGVtSWQpLmRlbGV0ZSgpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgY29uc29sZS5lcnJvcihgRXJyb3IgZGVsZXRpbmcgZG9jdW1lbnQgJHtpdGVtSWR9IGZyb20gUGFydHM6YCwgZXJyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIC8vIERlbGV0ZSBhc3NvY2lhdGVkIHBob3RvcyBmcm9tIHN0b3JhZ2VcclxuICAgICAgICAgIGF3YWl0IGRlbGV0ZUZyb21TdG9yYWdlKGl0ZW1JZCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGBFcnJvciBkZWxldGluZyBzdG9yYWdlIGZvciAke2l0ZW1JZH06YCwgZXJyKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgLy8gVXBkYXRlIGxvY2FsIHN0YXRlIGJ5IGZpbHRlcmluZyBvdXQgdGhlIGRlbGV0ZWQgaXRlbXNcclxuICAgICAgc2V0SW5mbyhpbmZvLmZpbHRlcigoaXRlbSkgPT4gIXNlbGVjdGVkSXRlbXMuaW5jbHVkZXMoaXRlbS5pZCkpKTtcclxuICAgICAgc2V0U2VsZWN0ZWRJdGVtcyhbXSk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZGVsZXRpbmcgaXRlbXM6XCIsIGVycm9yKTtcclxuICAgIH0gZmluYWxseSB7XHJcbiAgICAgIHNldElzRGVsZXRpbmcoZmFsc2UpO1xyXG4gICAgICBoYW5kbGVDbG9zZURlbGV0ZU1vZGFsKCk7XHJcbiAgICAgIC8vIE9wdGlvbmFsbHksIHJlbG9hZCB0aGUgcGFnZVxyXG4gICAgICAvLyByb3V0ZXIucmVsb2FkKCk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcblxyXG4gIGNvbnN0IGhhbmRsZUNsb3NlID0gKCkgPT4gc2V0U2hvdyhmYWxzZSk7XHJcbiAgY29uc3QgaGFuZGxlU2hvdyA9ICgpID0+IHNldFNob3codHJ1ZSk7XHJcblxyXG4gIGNvbnN0IGNoZWNrRGVsZXRlID0gKGV2ZW50LCBwb3MsIGlkc1RvRGVsZXRlLCBuYW1lKSA9PiB7XHJcbiAgICBpZiAoZXZlbnQpIHtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICB9XHJcbiAgICBjb25zb2xlLmxvZyhcIlNlbGVjdGVkIElEcyB0byBkZWxldGU6XCIsIGlkc1RvRGVsZXRlKTtcclxuICAgIHNldFNlbGVjdGVkSXRlbXMoaWRzVG9EZWxldGUpO1xyXG4gICAgc2V0REl0ZW0obmFtZSk7XHJcbiAgICBzZXRTaG93RGVsZXRlTW9kYWwodHJ1ZSk7XHJcbiAgfTtcclxuXHJcbiAgLy8gY29uc3QgaGFuZGxlRGVsZXRlID0gYXN5bmMgKCkgPT4ge1xyXG4gIC8vICAgbGV0IGl0ZW1JZCA9IGdJZGU7XHJcbiAgLy8gICB0cnkge1xyXG4gIC8vICAgICBzZXRJc0RlbGV0aW5nKHRydWUpO1xyXG4gIC8vICAgICBjb25zdCBkYiA9IGZpcmViYXNlLmZpcmVzdG9yZSgpO1xyXG4gIC8vICAgICBhd2FpdCBkYi5jb2xsZWN0aW9uKFwiVGVzdFwiKS5kb2MoaXRlbUlkKS5kZWxldGUoKTtcclxuICAvLyAgICAgYXdhaXQgZGVsZXRlRnJvbVBhcnRzQ29sbGVjdGlvbihpdGVtSWQpO1xyXG4gIC8vICAgICBhd2FpdCBkZWxldGVGcm9tU3RvcmFnZShpdGVtSWQpO1xyXG4gIC8vICAgICBzZXRJbmZvKGluZm8uZmlsdGVyKChfLCBpKSA9PiBnUG9zICE9PSBpKSk7XHJcbiAgLy8gICAgIGNvbnNvbGUubG9nKGBEZWxldGVkIGl0ZW06ICR7aXRlbUlkfWApO1xyXG4gIC8vICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAvLyAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGRlbGV0aW5nIGl0ZW06XCIsIGVycm9yKTtcclxuICAvLyAgIH0gZmluYWxseSB7XHJcbiAgLy8gICAgIHNldElzRGVsZXRpbmcoZmFsc2UpO1xyXG4gIC8vICAgfVxyXG4gIC8vICAgaGFuZGxlQ2xvc2UoKTtcclxuICAvLyB9O1xyXG5cclxuICBjb25zdCBob3ZlclN0eWxlID0gKGluZGV4KSA9PiAoe1xyXG4gICAgYmFja2dyb3VuZENvbG9yOiBob3ZlckluZGV4ID09PSBpbmRleCA/IFwiI2RkZFwiIDogXCJ0cmFuc3BhcmVudFwiLFxyXG4gICAgdGV4dEFsaWduOiBcImNlbnRlclwiLFxyXG4gICAgY3Vyc29yOiBcImRlZmF1bHRcIixcclxuICB9KTtcclxuXHJcbiAgY29uc3QgW2Ryb3Bkb3duMVRleHQsIHNldERyb3Bkb3duMVRleHRdID0gdXNlU3RhdGUoXCJTZWxlY3QgT3B0aW9uXCIpO1xyXG4gIGNvbnN0IFtkcm9wZG93bjJUZXh0LCBzZXREcm9wZG93bjJUZXh0XSA9IHVzZVN0YXRlKFwiU2VsZWN0IE9wdGlvblwiKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlU2VsZWN0MSA9IChldmVudEtleSwgZXZlbnQpID0+IHtcclxuICAgIGlmIChldmVudEtleSA9PT0gXCJ1bmFzc2lnbmVkXCIpIHtcclxuICAgICAgc2V0RHJvcGRvd24xVGV4dChcIlNlbGVjdCBPcHRpb25cIik7XHJcbiAgICAgIHNldFNlbGVjdGVkT0VNKG51bGwpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc2V0RHJvcGRvd24xVGV4dChldmVudC50YXJnZXQudGV4dENvbnRlbnQpO1xyXG4gICAgICBzZXRTZWxlY3RlZE9FTShldmVudC50YXJnZXQudGV4dENvbnRlbnQpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGNvbnN0IGhhbmRsZVNlbGVjdDIgPSAoZXZlbnRLZXksIGV2ZW50KSA9PiB7XHJcbiAgICBpZiAoZXZlbnRLZXkgPT09IFwidW5hc3NpZ25lZFwiKSB7XHJcbiAgICAgIHNldERyb3Bkb3duMlRleHQoXCJTZWxlY3QgT3B0aW9uXCIpO1xyXG4gICAgICBzZXRTZWxlY3RlZE1vZGFsaXR5KG51bGwpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc2V0RHJvcGRvd24yVGV4dChldmVudC50YXJnZXQudGV4dENvbnRlbnQpO1xyXG4gICAgICBzZXRTZWxlY3RlZE1vZGFsaXR5KGV2ZW50LnRhcmdldC50ZXh0Q29udGVudCk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgLy8gQnVpbGQgYSB1bmlxdWUgbGlzdCBvZiBjbGllbnRzIGZyb20gdGhlIGl0ZW1zIGN1cnJlbnRseSBsb2FkZWQsIGZpbHRlcmVkIGJ5IE9FTS9Nb2RhbGl0eS5cclxuICAvLyBgdHlwZWAgaXMgXCJmcm9tXCIgb3IgXCJjdXJyZW50XCIgdG8gZGVjaWRlIHdoaWNoIGNsaWVudCByZWYgdG8gcmVhZC5cclxuICBhc3luYyBmdW5jdGlvbiBidWlsZENsaWVudHNGcm9tSXRlbXModHlwZSkge1xuICAgIGNvbnN0IGRiID0gZmlyZWJhc2UuZmlyZXN0b3JlKCk7XG4gICAgY29uc3QgaWRzID0gbmV3IFNldCgpO1xuXG4gICAgLy8gUmVzcGVjdCBjdXJyZW50IE9FTSAvIE1vZGFsaXR5IGZpbHRlcnMgd2hlbiBkZXJpdmluZyBjbGllbnQgb3B0aW9uc1xuICAgIGNvbnN0IGZpbHRlcmVkID0gYXVnbWVudGVkSW5mby5maWx0ZXIoKGl0ZW0pID0+IHtcbiAgICAgIGNvbnN0IE9FTSA9IGdldE1hY2hpbmVGaWVsZChpdGVtLCBcIk9FTVwiKTtcbiAgICAgIGNvbnN0IE1vZGFsaXR5ID0gZ2V0TWFjaGluZUZpZWxkKGl0ZW0sIFwiTW9kYWxpdHlcIik7XG4gICAgICBpZiAoc2VsZWN0ZWRPRU0gJiYgbm9ybWFsaXplVGV4dChPRU0pICE9PSBub3JtYWxpemVUZXh0KHNlbGVjdGVkT0VNKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoXG4gICAgICAgIHNlbGVjdGVkTW9kYWxpdHkgJiZcbiAgICAgICAgbm9ybWFsaXplVGV4dChNb2RhbGl0eSkgIT09IG5vcm1hbGl6ZVRleHQoc2VsZWN0ZWRNb2RhbGl0eSlcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9KTtcblxyXG4gICAgZm9yIChjb25zdCBpdCBvZiBmaWx0ZXJlZCkge1xyXG4gICAgICBjb25zdCBpZCA9IHR5cGUgPT09IFwiZnJvbVwiID8gaXQuY2xpZW50RnJvbUlkIDogaXQuY2xpZW50Q3VycmVudElkO1xyXG4gICAgICBpZiAoaWQpIGlkcy5hZGQoaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG91dCA9IFtdO1xyXG4gICAgY29uc3QgaWRBcnJheSA9IFsuLi5pZHNdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpZEFycmF5Lmxlbmd0aDsgaSArPSAxMCkge1xyXG4gICAgICBjb25zdCBjaHVuayA9IGlkQXJyYXkuc2xpY2UoaSwgaSArIDEwKTtcclxuICAgICAgY29uc3Qgc25hcCA9IGF3YWl0IGRiXHJcbiAgICAgICAgLmNvbGxlY3Rpb24oXCJDbGllbnRcIilcclxuICAgICAgICAud2hlcmUoZmlyZWJhc2UuZmlyZXN0b3JlLkZpZWxkUGF0aC5kb2N1bWVudElkKCksIFwiaW5cIiwgY2h1bmspXHJcbiAgICAgICAgLmdldCgpO1xyXG4gICAgICBzbmFwLmZvckVhY2goKGRvYykgPT4ge1xyXG4gICAgICAgIGNvbnN0IGQgPSBkb2MuZGF0YSgpIHx8IHt9O1xyXG4gICAgICAgIG91dC5wdXNoKHsgaWQ6IGRvYy5pZCwgbmFtZTogZC5uYW1lIHx8IGRvYy5pZCB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc29ydCBieSBuYW1lIGZvciBuaWNlciBVWFxyXG4gICAgb3V0LnNvcnQoKGEsIGIpID0+IChhLm5hbWUgfHwgXCJcIikubG9jYWxlQ29tcGFyZShiLm5hbWUgfHwgXCJcIikpO1xyXG4gICAgcmV0dXJuIG91dDtcclxuICB9XHJcblxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIENMSUVOVCBTRUxFQ1RJT04gSEFORExJTkdcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIFRoaXMgZnVuY3Rpb24gZmV0Y2hlcyBjbGllbnRzIGFuZCBvcGVucyB0aGUgY2xpZW50IG1vZGFsLlxyXG4gIGNvbnN0IGhhbmRsZUNsaWVudENsaWNrID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgbGV0IHNhZmVDbGllbnRzID0gW107XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBjbGllbnRzRGF0YSA9IGF3YWl0IGZldGNoQ2xpZW50cyhzZWxlY3RlZE9FTSwgc2VsZWN0ZWRNb2RhbGl0eSk7XHJcbiAgICAgIHNhZmVDbGllbnRzID0gQXJyYXkuaXNBcnJheShjbGllbnRzRGF0YSkgPyBjbGllbnRzRGF0YSA6IFtdO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICBjb25zb2xlLmVycm9yKFwiZmV0Y2hDbGllbnRzIGZhaWxlZDpcIiwgZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRmFsbGJhY2sgdG8gYnVpbGRpbmcgZnJvbSBsb2FkZWQgaXRlbXMgaWYgQVBJIGdhdmUgdXMgbm90aGluZ1xyXG4gICAgaWYgKHNhZmVDbGllbnRzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGlmICghY2xpZW50U2VsZWN0aW9uVHlwZSkge1xyXG4gICAgICAgICAgLy8gaWYgc29tZWhvdyBub3Qgc2V0IHlldCwgZGVmYXVsdCB0byBcImZyb21cIlxyXG4gICAgICAgICAgc2V0Q2xpZW50U2VsZWN0aW9uVHlwZShcImZyb21cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGRlcml2ZWQgPSBhd2FpdCBidWlsZENsaWVudHNGcm9tSXRlbXMoY2xpZW50U2VsZWN0aW9uVHlwZSB8fCBcImZyb21cIik7XHJcbiAgICAgICAgc2FmZUNsaWVudHMgPSBkZXJpdmVkO1xyXG4gICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkZhbGxiYWNrIGJ1aWxkQ2xpZW50c0Zyb21JdGVtcyBmYWlsZWQ6XCIsIGUpO1xyXG4gICAgICAgIHNhZmVDbGllbnRzID0gW107XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZXRDbGllbnRzKHNhZmVDbGllbnRzKTtcclxuICAgIHNldENsaWVudFNlYXJjaFRlcm0oXCJcIik7XHJcbiAgICBzZXRTaG93Q2xpZW50TW9kYWwodHJ1ZSk7XHJcbiAgfTtcclxuXHJcblxyXG5cclxuICAvLyBXaGVuIGEgY2xpZW50IGlzIHNlbGVjdGVkIGluIHRoZSBtb2RhbCwgd2Ugbm93IGFzc3VtZSB0aGUgcGFyYW1ldGVyIGlzIGEgY2xpZW50IElELlxyXG4gIC8vIElmIHRoZSBwYXNzZWQgdmFsdWUgaXMgbnVsbCwgd2UgY2xlYXIgdGhlIHNlbGVjdGlvbi5cclxuICBjb25zdCBoYW5kbGVDbGllbnRTZWxlY3QgPSBhc3luYyAoY2xpZW50SWQpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKFwiVXNlciBzZWxlY3RlZCBjbGllbnQgaWQ6XCIsIGNsaWVudElkKTtcclxuICAgIGlmICghY2xpZW50SWQpIHtcclxuICAgICAgaWYgKGNsaWVudFNlbGVjdGlvblR5cGUgPT09IFwiZnJvbVwiKSB7XHJcbiAgICAgICAgc2V0Q2xpZW50RnJvbUJ1dHRvblRleHQoXCJTZWxlY3QgT3B0aW9uXCIpO1xyXG4gICAgICAgIHNldFNlbGVjdGVkQ2xpZW50RnJvbShudWxsKTtcclxuICAgICAgfSBlbHNlIGlmIChjbGllbnRTZWxlY3Rpb25UeXBlID09PSBcImN1cnJlbnRcIikge1xyXG4gICAgICAgIHNldENsaWVudEN1cnJlbnRCdXR0b25UZXh0KFwiU2VsZWN0IE9wdGlvblwiKTtcclxuICAgICAgICBzZXRTZWxlY3RlZENsaWVudEN1cnJlbnQobnVsbCk7XHJcbiAgICAgIH1cclxuICAgICAgc2V0U2hvd0NsaWVudE1vZGFsKGZhbHNlKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgY2xpZW50U25hcCA9IGF3YWl0IGZpcmViYXNlLmZpcmVzdG9yZSgpLmNvbGxlY3Rpb24oXCJDbGllbnRcIikuZG9jKGNsaWVudElkKS5nZXQoKTtcclxuICAgICAgaWYgKGNsaWVudFNuYXAuZXhpc3RzKSB7XHJcbiAgICAgICAgY29uc3QgY2xpZW50RGF0YSA9IGNsaWVudFNuYXAuZGF0YSgpO1xyXG4gICAgICAgIGlmIChjbGllbnRTZWxlY3Rpb25UeXBlID09PSBcImZyb21cIikge1xyXG4gICAgICAgICAgc2V0Q2xpZW50RnJvbUJ1dHRvblRleHQoY2xpZW50RGF0YS5uYW1lKTtcclxuICAgICAgICAgIHNldFNlbGVjdGVkQ2xpZW50RnJvbShjbGllbnRJZCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChjbGllbnRTZWxlY3Rpb25UeXBlID09PSBcImN1cnJlbnRcIikge1xyXG4gICAgICAgICAgc2V0Q2xpZW50Q3VycmVudEJ1dHRvblRleHQoY2xpZW50RGF0YS5uYW1lKTtcclxuICAgICAgICAgIHNldFNlbGVjdGVkQ2xpZW50Q3VycmVudChjbGllbnRJZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJObyBjbGllbnQgZG9jdW1lbnQgZm91bmQgZm9yIGlkOlwiLCBjbGllbnRJZCk7XHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBmZXRjaGluZyBjbGllbnQgZGF0YTpcIiwgZXJyb3IpO1xyXG4gICAgfVxyXG4gICAgc2V0U2hvd0NsaWVudE1vZGFsKGZhbHNlKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBoYW5kbGVDbGllbnRJbmZvID0gKGNsaWVudElkLCBjbGllbnROYW1lKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhgQ2xpZW50IElEOiAke2NsaWVudElkfSwgQ2xpZW50IE5hbWU6ICR7Y2xpZW50TmFtZX1gKTtcclxuICAgIHJvdXRlci5wdXNoKFwiY2xpZW50L1wiICsgY2xpZW50SWQpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGhhbmRsZUNsZWFyQ2xpZW50U2VsZWN0aW9uID0gKCkgPT4ge1xyXG4gICAgaWYgKGNsaWVudFNlbGVjdGlvblR5cGUgPT09IFwiZnJvbVwiKSB7XHJcbiAgICAgIHNldENsaWVudEZyb21CdXR0b25UZXh0KFwiU2VsZWN0IE9wdGlvblwiKTtcclxuICAgICAgc2V0U2VsZWN0ZWRDbGllbnRGcm9tKG51bGwpO1xyXG4gICAgfSBlbHNlIGlmIChjbGllbnRTZWxlY3Rpb25UeXBlID09PSBcImN1cnJlbnRcIikge1xyXG4gICAgICBzZXRDbGllbnRDdXJyZW50QnV0dG9uVGV4dChcIlNlbGVjdCBPcHRpb25cIik7XHJcbiAgICAgIHNldFNlbGVjdGVkQ2xpZW50Q3VycmVudChudWxsKTtcclxuICAgIH1cclxuICAgIHNldFNob3dDbGllbnRNb2RhbChmYWxzZSk7XHJcbiAgfTtcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBNT0RFTCBTRUxFQ1RJT04gSEFORExJTkdcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIGNvbnN0IFttb2RlbHMsIHNldE1vZGVsc10gPSB1c2VTdGF0ZShbXSk7XHJcbiAgY29uc3QgW3Nob3dNb2RlbE1vZGFsLCBzZXRTaG93TW9kZWxNb2RhbF0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW21vZGVsQnV0dG9uVGV4dCwgc2V0TW9kZWxCdXR0b25UZXh0XSA9IHVzZVN0YXRlKFwiU2VsZWN0IE9wdGlvblwiKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlTW9kZWxDbGljayA9IGFzeW5jICgpID0+IHtcclxuICAgIGNvbnN0IG1vZGVsc0RhdGEgPSBhd2FpdCBmZXRjaE1vZGVscyhcclxuICAgICAgc2VsZWN0ZWRPRU0sXHJcbiAgICAgIHNlbGVjdGVkTW9kYWxpdHksXHJcbiAgICAgIHNlbGVjdGVkQ2xpZW50RnJvbVxyXG4gICAgKTtcclxuICAgIHNldE1vZGVscyhtb2RlbHNEYXRhKTtcclxuICAgIHNldE1vZGVsU2VhcmNoVGVybShcIlwiKTtcclxuICAgIHNldFNob3dNb2RlbE1vZGFsKHRydWUpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGhhbmRsZU1vZGVsU2VsZWN0ID0gKG1vZGVsTmFtZSkgPT4ge1xyXG4gICAgc2V0TW9kZWxCdXR0b25UZXh0KG1vZGVsTmFtZSB8fCBcIlNlbGVjdCBPcHRpb25cIik7XHJcbiAgICBzZXRTZWxlY3RlZE1vZGVsKG1vZGVsTmFtZSB8fCBudWxsKTtcclxuICAgIHNldFNob3dNb2RlbE1vZGFsKGZhbHNlKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBoYW5kbGVDbGVhck1vZGVsU2VsZWN0aW9uID0gKCkgPT4ge1xyXG4gICAgc2V0TW9kZWxCdXR0b25UZXh0KFwiU2VsZWN0IE9wdGlvblwiKTtcclxuICAgIHNldFNlbGVjdGVkTW9kZWwobnVsbCk7XHJcbiAgICBzZXRTaG93TW9kZWxNb2RhbChmYWxzZSk7XHJcbiAgfTtcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBXQVJFSE9VU0UgQlVUVE9OUyAoZm9yIENsaWVudCBDdXJyZW50KVxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgY29uc3QgaGFuZGxlU29DYWxXYXJlaG91c2VDbGljayA9ICgpID0+IHtcclxuICAgIHNldENsaWVudEN1cnJlbnRCdXR0b25UZXh0KFwiU29DYWwgV2FyZWhvdXNlXCIpO1xyXG4gICAgc2V0U2VsZWN0ZWRDbGllbnRDdXJyZW50KFNPQ0FMX0NMSUVOVF9JRCk7XHJcbiAgICBjb25zb2xlLmxvZyhcIldhcmVob3VzZSBidXR0b24gY2xpY2tlZDogc2V0dGluZyBDbGllbnQgQ3VycmVudCB0b1wiLCBTT0NBTF9DTElFTlRfSUQpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGhhbmRsZU5vckNhbFdhcmVob3VzZUNsaWNrID0gKCkgPT4ge1xyXG4gICAgc2V0Q2xpZW50Q3VycmVudEJ1dHRvblRleHQoXCJOb3JDYWwgV2FyZWhvdXNlXCIpO1xyXG4gICAgc2V0U2VsZWN0ZWRDbGllbnRDdXJyZW50KE5PUkNBTF9DTElFTlRfSUQpO1xyXG4gICAgY29uc29sZS5sb2coXCJXYXJlaG91c2UgYnV0dG9uIGNsaWNrZWQ6IHNldHRpbmcgQ2xpZW50IEN1cnJlbnQgdG9cIiwgTk9SQ0FMX0NMSUVOVF9JRCk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaGFuZGxlV2FyZWhvdXNlVW5hc3NpZ25lZENsaWNrID0gKCkgPT4ge1xyXG4gICAgc2V0Q2xpZW50Q3VycmVudEJ1dHRvblRleHQoXCJVbmFzc2lnbmVkXCIpO1xyXG4gICAgc2V0U2VsZWN0ZWRDbGllbnRDdXJyZW50KFVOQVNTSUdORURfQ0xJRU5UX0lEKTtcclxuICAgIGNvbnNvbGUubG9nKFwiV2FyZWhvdXNlIGJ1dHRvbiBjbGlja2VkOiBzZXR0aW5nIENsaWVudCBDdXJyZW50IHRvXCIsIFVOQVNTSUdORURfQ0xJRU5UX0lEKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBbY2xpZW50U2VhcmNoVGVybSwgc2V0Q2xpZW50U2VhcmNoVGVybV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbbW9kZWxTZWFyY2hUZXJtLCBzZXRNb2RlbFNlYXJjaFRlcm1dID0gdXNlU3RhdGUoXCJcIik7XHJcblxyXG4gIGNvbnN0IGRlbGV0ZUZyb21TdG9yYWdlID0gYXN5bmMgKGl0ZW1JZCkgPT4ge1xyXG4gICAgY29uc3Qgc3RvcmFnZVJlZiA9IGZpcmViYXNlLnN0b3JhZ2UoKS5yZWYoKTtcclxuICAgIGNvbnN0IGZvbGRlclJlZiA9IHN0b3JhZ2VSZWYuY2hpbGQoYFBhcnRzLyR7aXRlbUlkfS9gKTtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IGxpc3RSZXN1bHQgPSBhd2FpdCBmb2xkZXJSZWYubGlzdEFsbCgpO1xyXG4gICAgICBjb25zdCBkZWxldGVQcm9taXNlcyA9IGxpc3RSZXN1bHQuaXRlbXMubWFwKChpdGVtKSA9PiBpdGVtLmRlbGV0ZSgpKTtcclxuICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoZGVsZXRlUHJvbWlzZXMpO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGRlbGV0aW5nIGZyb20gc3RvcmFnZTpcIiwgZXJyb3IpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGNvbnN0IGRlbGV0ZUZyb21QYXJ0c0NvbGxlY3Rpb24gPSBhc3luYyAoaXRlbUlkKSA9PiB7XHJcbiAgICBjb25zdCBkYiA9IGZpcmViYXNlLmZpcmVzdG9yZSgpO1xyXG4gICAgdHJ5IHtcclxuICAgICAgYXdhaXQgZGIuY29sbGVjdGlvbihcIlBhcnRzXCIpLmRvYyhpdGVtSWQpLmRlbGV0ZSgpO1xyXG4gICAgICBjb25zb2xlLmxvZyhgRGVsZXRlZCBpdGVtIGZyb20gUGFydHMgY29sbGVjdGlvbjogJHtpdGVtSWR9YCk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZGVsZXRpbmcgZnJvbSBQYXJ0cyBjb2xsZWN0aW9uOlwiLCBlcnJvcik7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgLy8gICAvLyBTYWZlbHkgY29udmVydCBhbnkgZGF0ZS1pc2ggdmFsdWUgaW50byBhIGNvbXBhcmFibGUgdGltZXN0YW1wIChtcyBzaW5jZSBlcG9jaCkuXHJcbiAgLy8gZnVuY3Rpb24gdG9UaW1lKHZhbHVlKSB7XHJcbiAgLy8gICBpZiAoIXZhbHVlKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgLy8gICAvLyBGaXJlc3RvcmUgVGltZXN0YW1wOiB7IHNlY29uZHMsIG5hbm9zZWNvbmRzIH1cclxuICAvLyAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiYgdmFsdWUuc2Vjb25kcykge1xyXG4gIC8vICAgICB0cnkge1xyXG4gIC8vICAgICAgIHJldHVybiB2YWx1ZS5zZWNvbmRzICogMTAwMDtcclxuICAvLyAgICAgfSBjYXRjaCB7IC8qIGZhbGx0aHJvdWdoICovIH1cclxuICAvLyAgIH1cclxuXHJcbiAgLy8gICAvLyBJZiBhbHJlYWR5IGEgRGF0ZVxyXG4gIC8vICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkgcmV0dXJuIGlzTmFOKHZhbHVlLmdldFRpbWUoKSkgPyBudWxsIDogdmFsdWUuZ2V0VGltZSgpO1xyXG5cclxuICAvLyAgIC8vIElmIHN0cmluZzogdHJ5IElTTyBmaXJzdFxyXG4gIC8vICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikge1xyXG4gIC8vICAgICAvLyB5eXl5LW1tLWRkIChmcm9tIHlvdXIgZm9ybSBpbnB1dHMpXHJcbiAgLy8gICAgIGNvbnN0IGlzbyA9IERhdGUucGFyc2UodmFsdWUpO1xyXG4gIC8vICAgICBpZiAoIWlzTmFOKGlzbykpIHJldHVybiBpc287XHJcblxyXG4gIC8vICAgICAvLyBtbS9kZC95eXl5IGZhbGxiYWNrIChvbGRlciBpdGVtcylcclxuICAvLyAgICAgY29uc3QgcGFydHMgPSB2YWx1ZS5zcGxpdChcIi9cIik7XHJcbiAgLy8gICAgIGlmIChwYXJ0cy5sZW5ndGggPT09IDMpIHtcclxuICAvLyAgICAgICBjb25zdCBbbW0sIGRkLCB5eXl5XSA9IHBhcnRzO1xyXG4gIC8vICAgICAgIGNvbnN0IGFsdCA9IERhdGUucGFyc2UoYCR7eXl5eX0tJHttbX0tJHtkZH1gKTtcclxuICAvLyAgICAgICBpZiAoIWlzTmFOKGFsdCkpIHJldHVybiBhbHQ7XHJcbiAgLy8gICAgIH1cclxuICAvLyAgIH1cclxuXHJcbiAgLy8gICAvLyBDYW5vbmljYWxpemUgYW55IGRhdGUtaXNoIHZhbHVlIHRvICd5eXl5LW1tLWRkJyBzbyBpdCBtYXRjaGVzIDxpbnB1dCB0eXBlPVwiZGF0ZVwiPiB2YWx1ZXNcclxuICAvLyAgIGZ1bmN0aW9uIHRvWU1EKHZhbHVlKSB7XHJcbiAgLy8gICAgIGNvbnN0IHQgPSB0b1RpbWUodmFsdWUpO1xyXG4gIC8vICAgICBpZiAodCA9PSBudWxsKSByZXR1cm4gbnVsbDtcclxuICAvLyAgICAgY29uc3QgZCA9IG5ldyBEYXRlKHQpO1xyXG4gIC8vICAgICBjb25zdCB5eXl5ID0gZC5nZXRGdWxsWWVhcigpO1xyXG4gIC8vICAgICBjb25zdCBtbSA9IFN0cmluZyhkLmdldE1vbnRoKCkgKyAxKS5wYWRTdGFydCgyLCBcIjBcIik7XHJcbiAgLy8gICAgIGNvbnN0IGRkID0gU3RyaW5nKGQuZ2V0RGF0ZSgpKS5wYWRTdGFydCgyLCBcIjBcIik7XHJcbiAgLy8gICAgIHJldHVybiBgJHt5eXl5fS0ke21tfS0ke2RkfWA7XHJcbiAgLy8gICB9XHJcblxyXG5cclxuICAvLyAgIC8vIExhc3QgcmVzb3J0XG4gIC8vICAgY29uc3QgdCA9IERhdGUucGFyc2UodmFsdWUpO1xuICAvLyAgIHJldHVybiBpc05hTih0KSA/IG51bGwgOiB0O1xuICAvLyB9XG5cbiAgY29uc3QgdG90YWxLbm93blBhZ2VzID0gTWF0aC5tYXgoXG4gICAgMSxcbiAgICBwYWdlQ3Vyc29ycy5maWx0ZXIoQm9vbGVhbikubGVuZ3RoICsgKGhhc05leHRQYWdlID8gMSA6IDApXG4gICk7XG4gIGNvbnN0IHBhZ2VCdXR0b25zID0gKCgpID0+IHtcbiAgICBjb25zdCBidXR0b25zID0gW107XG4gICAgY29uc3QgbWF4VmlzaWJsZSA9IDc7XG5cbiAgICBjb25zdCBwdXNoUGFnZSA9IChwKSA9PlxuICAgICAgYnV0dG9ucy5wdXNoKFxuICAgICAgICA8UGFnaW5hdGlvbi5JdGVtXG4gICAgICAgICAga2V5PXtgcGFnZS0ke3B9YH1cbiAgICAgICAgICBhY3RpdmU9e3AgPT09IHBhZ2V9XG4gICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0UGFnZShwKX1cbiAgICAgICAgPlxuICAgICAgICAgIHtwfVxuICAgICAgICA8L1BhZ2luYXRpb24uSXRlbT5cbiAgICAgICk7XG5cbiAgICBjb25zdCBwdXNoRWxsaXBzaXMgPSAoa2V5KSA9PlxuICAgICAgYnV0dG9ucy5wdXNoKDxQYWdpbmF0aW9uLkVsbGlwc2lzIGtleT17a2V5fSBkaXNhYmxlZCAvPik7XG5cbiAgICBpZiAodG90YWxLbm93blBhZ2VzIDw9IG1heFZpc2libGUpIHtcbiAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IHRvdGFsS25vd25QYWdlczsgaSArPSAxKSBwdXNoUGFnZShpKTtcbiAgICAgIHJldHVybiBidXR0b25zO1xuICAgIH1cblxuICAgIGxldCBzdGFydCA9IE1hdGgubWF4KDIsIHBhZ2UgLSAxKTtcbiAgICBsZXQgZW5kID0gTWF0aC5taW4odG90YWxLbm93blBhZ2VzIC0gMSwgcGFnZSArIDEpO1xuXG4gICAgY29uc3QgZGVzaXJlZFdpbmRvdyA9IG1heFZpc2libGUgLSAyO1xuICAgIGxldCBjdXJyZW50V2luZG93ID0gZW5kIC0gc3RhcnQgKyAxO1xuICAgIGxldCByZW1haW5pbmcgPSBkZXNpcmVkV2luZG93IC0gY3VycmVudFdpbmRvdztcblxuICAgIHdoaWxlIChyZW1haW5pbmcgPiAwKSB7XG4gICAgICBpZiAoc3RhcnQgPiAyKSB7XG4gICAgICAgIHN0YXJ0IC09IDE7XG4gICAgICAgIHJlbWFpbmluZyAtPSAxO1xuICAgICAgfVxuICAgICAgaWYgKHJlbWFpbmluZyA+IDAgJiYgZW5kIDwgdG90YWxLbm93blBhZ2VzIC0gMSkge1xuICAgICAgICBlbmQgKz0gMTtcbiAgICAgICAgcmVtYWluaW5nIC09IDE7XG4gICAgICB9XG4gICAgICBpZiAoc3RhcnQgPT09IDIgJiYgZW5kID09PSB0b3RhbEtub3duUGFnZXMgLSAxKSBicmVhaztcbiAgICB9XG5cbiAgICBwdXNoUGFnZSgxKTtcbiAgICBpZiAoc3RhcnQgPiAyKSBwdXNoRWxsaXBzaXMoXCJzdGFydC1lbGxpcHNpc1wiKTtcbiAgICBmb3IgKGxldCBpID0gc3RhcnQ7IGkgPD0gZW5kOyBpICs9IDEpIHB1c2hQYWdlKGkpO1xuICAgIGlmIChlbmQgPCB0b3RhbEtub3duUGFnZXMgLSAxKSBwdXNoRWxsaXBzaXMoXCJlbmQtZWxsaXBzaXNcIik7XG4gICAgcHVzaFBhZ2UodG90YWxLbm93blBhZ2VzKTtcbiAgICBpZiAoaGFzTmV4dFBhZ2UpIHB1c2hFbGxpcHNpcyhcIm1vcmUtZWxsaXBzaXNcIik7XG5cbiAgICByZXR1cm4gYnV0dG9ucztcbiAgfSkoKTtcblxuICBjb25zdCByZWNhbGNQYWdlU2l6ZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuO1xuICAgIGlmIChwYWdlICE9PSAxKSByZXR1cm47XG4gICAgaWYgKCF0YWJsZUJvZHlSZWYuY3VycmVudCkgcmV0dXJuO1xuICAgIGNvbnN0IGNvbnRhaW5lckhlaWdodCA9XG4gICAgICB0YWJsZUJvZHlSZWYuY3VycmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQgfHwgMDtcbiAgICBpZiAoIWNvbnRhaW5lckhlaWdodCkgcmV0dXJuO1xuXG4gICAgY29uc3QgaGVhZGVyUm93ID1cbiAgICAgIHRhYmxlQm9keVJlZi5jdXJyZW50LnF1ZXJ5U2VsZWN0b3IoXCJ0YWJsZSB0aGVhZCB0clwiKSB8fFxuICAgICAgdGFibGVCb2R5UmVmLmN1cnJlbnQucXVlcnlTZWxlY3RvcihcInRoZWFkIHRyXCIpO1xuICAgIGNvbnN0IGJvZHlSb3cgPVxuICAgICAgdGFibGVCb2R5UmVmLmN1cnJlbnQucXVlcnlTZWxlY3RvcihcInRhYmxlIHRib2R5IHRyXCIpIHx8XG4gICAgICB0YWJsZUJvZHlSZWYuY3VycmVudC5xdWVyeVNlbGVjdG9yKFwidGJvZHkgdHJcIik7XG5cbiAgICBpZiAoaGVhZGVyUm93KSB7XG4gICAgICBjb25zdCBoID0gaGVhZGVyUm93LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcbiAgICAgIGlmIChoKSBoZWFkZXJIZWlnaHRSZWYuY3VycmVudCA9IGg7XG4gICAgfVxuICAgIGlmIChib2R5Um93KSB7XG4gICAgICBjb25zdCByID0gYm9keVJvdy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7XG4gICAgICBpZiAocikgcm93SGVpZ2h0UmVmLmN1cnJlbnQgPSByO1xuICAgIH1cblxuICAgIGNvbnN0IHZlcnRpY2FsUGFkZGluZyA9IDI0O1xuICAgIGNvbnN0IGF2YWlsYWJsZSA9XG4gICAgICBjb250YWluZXJIZWlnaHQgLSBoZWFkZXJIZWlnaHRSZWYuY3VycmVudCAtIHZlcnRpY2FsUGFkZGluZztcbiAgICBjb25zdCBlc3RpbWF0ZWQgPSBNYXRoLmZsb29yKGF2YWlsYWJsZSAvIHJvd0hlaWdodFJlZi5jdXJyZW50KTtcbiAgICBjb25zdCBjbGFtcGVkID0gTWF0aC5tYXgoNSwgTWF0aC5taW4oNTAsIGVzdGltYXRlZCkpO1xuICAgIGlmIChjbGFtcGVkID4gMCAmJiBjbGFtcGVkICE9PSBwYWdlU2l6ZSkge1xuICAgICAgc2V0UGFnZVNpemUoY2xhbXBlZCk7XG4gICAgICByZXNldFBhZ2luYXRpb24oKTtcbiAgICAgIHNldFF1ZXJ5RXBvY2goKHYpID0+IHYgKyAxKTtcbiAgICB9XG4gIH0sIFtwYWdlLCBwYWdlU2l6ZV0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybjtcbiAgICByZWNhbGNQYWdlU2l6ZSgpO1xuICAgIGNvbnN0IG9uUmVzaXplID0gKCkgPT4gcmVjYWxjUGFnZVNpemUoKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBvblJlc2l6ZSk7XG4gICAgcmV0dXJuICgpID0+IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIG9uUmVzaXplKTtcbiAgfSwgW3JlY2FsY1BhZ2VTaXplXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoaXNMb2FkaW5nIHx8IHBhZ2UgIT09IDEpIHJldHVybjtcbiAgICByZWNhbGNQYWdlU2l6ZSgpO1xuICB9LCBbcGFnZSwgaXNMb2FkaW5nLCByZWNhbGNQYWdlU2l6ZV0pO1xuXG4gIGNvbnN0IHJlbmRlckZpbHRlcnMgPSAoaWRQcmVmaXgpID0+IChcbiAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmZpbHRlcnNQYW5lbH0+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmZpbHRlcnNIZWFkZXJ9PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuZmlsdGVyc1RpdGxlfT5GaWx0ZXJzPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5maWx0ZXJzU3VidGl0bGV9PlxuICAgICAgICAgICAgTmFycm93IHJlc3VsdHMgYnkgbWFjaGluZSwgY2xpZW50LCBvciB3YXJlaG91c2UuXG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7aGFzQWN0aXZlRmlsdGVycyA/IChcbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e3N0eWxlcy5maWx0ZXJzQmFkZ2V9PkFjdGl2ZTwvc3Bhbj5cbiAgICAgICAgKSA6IG51bGx9XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5maWx0ZXJTZWN0aW9ufT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5maWx0ZXJTZWN0aW9uVGl0bGV9Pk1hY2hpbmU8L2Rpdj5cbiAgICAgICAgPElucHV0R3JvdXAgY2xhc3NOYW1lPXtzdHlsZXMuaW5wdXRHcm91cH0+XG4gICAgICAgICAgPElucHV0R3JvdXAuVGV4dD5PRU08L0lucHV0R3JvdXAuVGV4dD5cbiAgICAgICAgICA8RHJvcGRvd24gb25TZWxlY3Q9e2hhbmRsZVNlbGVjdDF9IGNsYXNzTmFtZT1cInctMTAwXCI+XG4gICAgICAgICAgICA8RHJvcGRvd24uVG9nZ2xlXG4gICAgICAgICAgICAgIHZhcmlhbnQ9XCJvdXRsaW5lLXNlY29uZGFyeVwiXG4gICAgICAgICAgICAgIGlkPXtgJHtpZFByZWZpeH0tb2VtYH1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdy0xMDAgJHtzdHlsZXMuaW5wdXRCdXR0b259YH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge2Ryb3Bkb3duMVRleHR9XG4gICAgICAgICAgICA8L0Ryb3Bkb3duLlRvZ2dsZT5cbiAgICAgICAgICAgIDxEcm9wZG93bi5NZW51IGNsYXNzTmFtZT1cInctMTAwXCI+XG4gICAgICAgICAgICAgIDxEcm9wZG93bi5JdGVtIGV2ZW50S2V5PVwidW5hc3NpZ25lZFwiPlNlbGVjdCBPcHRpb248L0Ryb3Bkb3duLkl0ZW0+XG4gICAgICAgICAgICAgIDxEcm9wZG93bi5JdGVtIGV2ZW50S2V5PVwiR0VcIj5HRTwvRHJvcGRvd24uSXRlbT5cbiAgICAgICAgICAgICAgPERyb3Bkb3duLkl0ZW0gZXZlbnRLZXk9XCJUb3NoaWJhXCI+VG9zaGliYTwvRHJvcGRvd24uSXRlbT5cbiAgICAgICAgICAgICAgPERyb3Bkb3duLkl0ZW0gZXZlbnRLZXk9XCJTaWVtZW5zXCI+U2llbWVuczwvRHJvcGRvd24uSXRlbT5cbiAgICAgICAgICAgICAgPERyb3Bkb3duLkl0ZW0gZXZlbnRLZXk9XCJQaGlsaXBzXCI+UGhpbGlwczwvRHJvcGRvd24uSXRlbT5cbiAgICAgICAgICAgIDwvRHJvcGRvd24uTWVudT5cbiAgICAgICAgICA8L0Ryb3Bkb3duPlxuICAgICAgICA8L0lucHV0R3JvdXA+XG5cbiAgICAgICAgPElucHV0R3JvdXAgY2xhc3NOYW1lPXtzdHlsZXMuaW5wdXRHcm91cH0+XG4gICAgICAgICAgPElucHV0R3JvdXAuVGV4dD5Nb2RhbGl0eTwvSW5wdXRHcm91cC5UZXh0PlxuICAgICAgICAgIDxEcm9wZG93biBvblNlbGVjdD17aGFuZGxlU2VsZWN0Mn0gY2xhc3NOYW1lPVwidy0xMDBcIj5cbiAgICAgICAgICAgIDxEcm9wZG93bi5Ub2dnbGVcbiAgICAgICAgICAgICAgdmFyaWFudD1cIm91dGxpbmUtc2Vjb25kYXJ5XCJcbiAgICAgICAgICAgICAgaWQ9e2Ake2lkUHJlZml4fS1tb2RhbGl0eWB9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YHctMTAwICR7c3R5bGVzLmlucHV0QnV0dG9ufWB9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHtkcm9wZG93bjJUZXh0fVxuICAgICAgICAgICAgPC9Ecm9wZG93bi5Ub2dnbGU+XG4gICAgICAgICAgICA8RHJvcGRvd24uTWVudSBjbGFzc05hbWU9XCJ3LTEwMFwiPlxuICAgICAgICAgICAgICA8RHJvcGRvd24uSXRlbSBldmVudEtleT1cInVuYXNzaWduZWRcIj5TZWxlY3QgT3B0aW9uPC9Ecm9wZG93bi5JdGVtPlxuICAgICAgICAgICAgICA8RHJvcGRvd24uSXRlbSBldmVudEtleT1cIkNUXCI+Q1Q8L0Ryb3Bkb3duLkl0ZW0+XG4gICAgICAgICAgICAgIDxEcm9wZG93bi5JdGVtIGV2ZW50S2V5PVwiTVJJXCI+TVJJPC9Ecm9wZG93bi5JdGVtPlxuICAgICAgICAgICAgPC9Ecm9wZG93bi5NZW51PlxuICAgICAgICAgIDwvRHJvcGRvd24+XG4gICAgICAgIDwvSW5wdXRHcm91cD5cblxuICAgICAgICA8SW5wdXRHcm91cCBjbGFzc05hbWU9e3N0eWxlcy5pbnB1dEdyb3VwfT5cbiAgICAgICAgICA8SW5wdXRHcm91cC5UZXh0Pk1vZGVsPC9JbnB1dEdyb3VwLlRleHQ+XG4gICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgdmFyaWFudD1cIm91dGxpbmUtc2Vjb25kYXJ5XCJcbiAgICAgICAgICAgIGNsYXNzTmFtZT17YHctMTAwICR7c3R5bGVzLmlucHV0QnV0dG9ufWB9XG4gICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVNb2RlbENsaWNrfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHttb2RlbEJ1dHRvblRleHR9XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgIDwvSW5wdXRHcm91cD5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmZpbHRlclNlY3Rpb259PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmZpbHRlclNlY3Rpb25UaXRsZX0+Q2xpZW50PC9kaXY+XG4gICAgICAgIDxJbnB1dEdyb3VwIGNsYXNzTmFtZT17c3R5bGVzLmlucHV0R3JvdXB9PlxuICAgICAgICAgIDxJbnB1dEdyb3VwLlRleHQ+Q2xpZW50IEZyb208L0lucHV0R3JvdXAuVGV4dD5cbiAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICB2YXJpYW50PVwib3V0bGluZS1zZWNvbmRhcnlcIlxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgdy0xMDAgJHtzdHlsZXMuaW5wdXRCdXR0b259YH1cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZUNsaWVudENsaWNrKFwiZnJvbVwiKX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7Y2xpZW50RnJvbUJ1dHRvblRleHR9XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgIDwvSW5wdXRHcm91cD5cblxuICAgICAgICA8SW5wdXRHcm91cCBjbGFzc05hbWU9e3N0eWxlcy5pbnB1dEdyb3VwfT5cbiAgICAgICAgICA8SW5wdXRHcm91cC5UZXh0PkNsaWVudCBDdXJyZW50PC9JbnB1dEdyb3VwLlRleHQ+XG4gICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgdmFyaWFudD1cIm91dGxpbmUtc2Vjb25kYXJ5XCJcbiAgICAgICAgICAgIGNsYXNzTmFtZT17YHctMTAwICR7c3R5bGVzLmlucHV0QnV0dG9ufWB9XG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVDbGllbnRDbGljayhcImN1cnJlbnRcIil9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge2NsaWVudEN1cnJlbnRCdXR0b25UZXh0fVxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICA8L0lucHV0R3JvdXA+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5maWx0ZXJTZWN0aW9ufT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5maWx0ZXJTZWN0aW9uVGl0bGV9PldhcmVob3VzZTwvZGl2PlxuICAgICAgICA8SW5wdXRHcm91cCBjbGFzc05hbWU9e3N0eWxlcy5pbnB1dEdyb3VwfT5cbiAgICAgICAgICA8SW5wdXRHcm91cC5UZXh0PlF1aWNrPC9JbnB1dEdyb3VwLlRleHQ+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5idXR0b25Hcm91cH0+XG4gICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgIHZhcmlhbnQ9XCJvdXRsaW5lLXNlY29uZGFyeVwiXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17c3R5bGVzLmZsZXhCdXR0b259XG4gICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZVNvQ2FsV2FyZWhvdXNlQ2xpY2t9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIFNvQ2FsIFdhcmVob3VzZVxuICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgIHZhcmlhbnQ9XCJvdXRsaW5lLXNlY29uZGFyeVwiXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17c3R5bGVzLmZsZXhCdXR0b259XG4gICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZU5vckNhbFdhcmVob3VzZUNsaWNrfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICBOb3JDYWwgV2FyZWhvdXNlXG4gICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgdmFyaWFudD1cIm91dGxpbmUtc2Vjb25kYXJ5XCJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMuZmxleEJ1dHRvbn1cbiAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlV2FyZWhvdXNlVW5hc3NpZ25lZENsaWNrfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICBVbmFzc2lnbmVkXG4gICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9JbnB1dEdyb3VwPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG5cblxuICByZXR1cm4gKFxuICAgIDxMb2dnZWRJbj5cbiAgICAgIHsoaXNEZWxldGluZyB8fCBpc05hdmlnYXRpbmcpICYmIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5sb2FkaW5nT3ZlcmxheX0+XG4gICAgICAgICAgPGltZ1xuICAgICAgICAgICAgc3JjPVwiL21hZ21vLWxvZ28ucG5nXCJcbiAgICAgICAgICAgIGFsdD1cIkxvYWRpbmcgTWFnbW9cIlxuICAgICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMubG9hZGluZ0xvZ299XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuICAgICAgPE1vZGFsIHNob3c9e3Nob3dEZWxldGVNb2RhbH0gb25IaWRlPXtoYW5kbGVDbG9zZURlbGV0ZU1vZGFsfT5cclxuICAgICAgICA8TW9kYWwuSGVhZGVyIGNsb3NlQnV0dG9uPlxyXG4gICAgICAgICAgPE1vZGFsLlRpdGxlPkNvbmZpcm0gRGVsZXRpb248L01vZGFsLlRpdGxlPlxyXG4gICAgICAgIDwvTW9kYWwuSGVhZGVyPlxyXG4gICAgICAgIDxNb2RhbC5Cb2R5PlxyXG4gICAgICAgICAgQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSB7c2VsZWN0ZWRJdGVtcy5sZW5ndGh9IGl0ZW1cclxuICAgICAgICAgIHtzZWxlY3RlZEl0ZW1zLmxlbmd0aCA+IDEgPyBcInNcIiA6IFwiXCJ9P1xyXG4gICAgICAgIDwvTW9kYWwuQm9keT5cclxuICAgICAgICA8TW9kYWwuRm9vdGVyPlxyXG4gICAgICAgICAgPEJ1dHRvbiB2YXJpYW50PVwiZGFuZ2VyXCIgb25DbGljaz17aGFuZGxlRGVsZXRlU2VsZWN0ZWR9PlxyXG4gICAgICAgICAgICBZZXMsIGRlbGV0ZVxyXG4gICAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgICAgICA8QnV0dG9uIHZhcmlhbnQ9XCJzZWNvbmRhcnlcIiBvbkNsaWNrPXtoYW5kbGVDbG9zZURlbGV0ZU1vZGFsfT5cclxuICAgICAgICAgICAgQ2FuY2VsXHJcbiAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICA8L01vZGFsLkZvb3Rlcj5cclxuICAgICAgPC9Nb2RhbD5cclxuXHJcbiAgICAgIDxNb2RhbCBzaG93PXtzaG93Q2xpZW50TW9kYWx9IG9uSGlkZT17KCkgPT4gc2V0U2hvd0NsaWVudE1vZGFsKGZhbHNlKX0+XHJcbiAgICAgICAgPE1vZGFsLkhlYWRlciBjbG9zZUJ1dHRvbj5cclxuICAgICAgICAgIDxNb2RhbC5UaXRsZT5cclxuICAgICAgICAgICAgU2VsZWN0IHtjbGllbnRTZWxlY3Rpb25UeXBlID09PSBcImZyb21cIiA/IFwiQ2xpZW50IEZyb21cIiA6IFwiQ2xpZW50IEN1cnJlbnRcIn1cclxuICAgICAgICAgIDwvTW9kYWwuVGl0bGU+XHJcbiAgICAgICAgPC9Nb2RhbC5IZWFkZXI+XHJcbiAgICAgICAgPE1vZGFsLkJvZHk+XHJcbiAgICAgICAgICA8Rm9ybUNvbnRyb2xcclxuICAgICAgICAgICAgdHlwZT1cInRleHRcIlxyXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlNlYXJjaCBieSBuYW1lXCJcclxuICAgICAgICAgICAgY2xhc3NOYW1lPVwibWItM1wiXHJcbiAgICAgICAgICAgIHZhbHVlPXtjbGllbnRTZWFyY2hUZXJtfVxyXG4gICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldENsaWVudFNlYXJjaFRlcm0oZS50YXJnZXQudmFsdWUpfVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICAgIDxDbGllbnRUYWJsZVxyXG4gICAgICAgICAgICBjbGllbnRzPXsoQXJyYXkuaXNBcnJheShjbGllbnRzKSA/IGNsaWVudHMgOiBbXSkuZmlsdGVyKFxyXG4gICAgICAgICAgICAgIChjbGllbnQpID0+IChjbGllbnQ/Lm5hbWUgPz8gXCJcIikudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhjbGllbnRTZWFyY2hUZXJtLnRvTG93ZXJDYXNlKCkpXHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgIG9uU2VsZWN0Q2xpZW50PXtoYW5kbGVDbGllbnRTZWxlY3R9XHJcbiAgICAgICAgICAgIG9uSW5mb0NsaWNrPXtoYW5kbGVDbGllbnRJbmZvfVxyXG4gICAgICAgICAgICBpc0NsaWVudFNlYXJjaD17ZmFsc2V9XHJcbiAgICAgICAgICAgIGNsZWFyU2VsZWN0aW9uPXsoKSA9PiBoYW5kbGVDbGllbnRTZWxlY3QobnVsbCl9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvTW9kYWwuQm9keT5cclxuICAgICAgPC9Nb2RhbD5cclxuXHJcbiAgICAgIDxNb2RhbCBzaG93PXtzaG93TW9kZWxNb2RhbH0gb25IaWRlPXsoKSA9PiBzZXRTaG93TW9kZWxNb2RhbChmYWxzZSl9PlxyXG4gICAgICAgIDxNb2RhbC5IZWFkZXIgY2xvc2VCdXR0b24+XHJcbiAgICAgICAgICA8TW9kYWwuVGl0bGU+U2VsZWN0IE1vZGVsPC9Nb2RhbC5UaXRsZT5cclxuICAgICAgICA8L01vZGFsLkhlYWRlcj5cclxuICAgICAgICA8TW9kYWwuQm9keT5cclxuICAgICAgICAgIDxGb3JtQ29udHJvbFxyXG4gICAgICAgICAgICB0eXBlPVwidGV4dFwiXHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoIGJ5IG5hbWVcIlxyXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJtYi0zXCJcclxuICAgICAgICAgICAgdmFsdWU9e21vZGVsU2VhcmNoVGVybX1cclxuICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRNb2RlbFNlYXJjaFRlcm0oZS50YXJnZXQudmFsdWUpfVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICAgIDxNb2RlbFRhYmxlXHJcbiAgICAgICAgICAgIG1vZGVscz17bW9kZWxzLmZpbHRlcigobW9kZWwpID0+XHJcbiAgICAgICAgICAgICAgdHlwZW9mIG1vZGVsID09PSBcInN0cmluZ1wiXHJcbiAgICAgICAgICAgICAgICA/IG1vZGVsLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMobW9kZWxTZWFyY2hUZXJtLnRvTG93ZXJDYXNlKCkpXHJcbiAgICAgICAgICAgICAgICA6IGZhbHNlXHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgIG9uU2VsZWN0TW9kZWw9e2hhbmRsZU1vZGVsU2VsZWN0fVxyXG4gICAgICAgICAgICBjbGVhclNlbGVjdGlvbj17KCkgPT4gaGFuZGxlTW9kZWxTZWxlY3QobnVsbCl9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvTW9kYWwuQm9keT5cclxuICAgICAgPC9Nb2RhbD5cclxuXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMucGFnZX0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMucGFnZUlubmVyfT5cbiAgICAgICAgICA8aGVhZGVyIGNsYXNzTmFtZT17c3R5bGVzLmhlYWRlcn0+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmhlYWRlckxlZnR9PlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMuYnVyZ2VyfVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFNob3dGaWx0ZXJzKHRydWUpfVxuICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJPcGVuIGZpbHRlcnNcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHNwYW4+PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3Bhbj48L3NwYW4+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmJyYW5kfT5cbiAgICAgICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgICAgICBzcmM9XCIvbWFnbW8tbG9nby5wbmdcIlxuICAgICAgICAgICAgICAgICAgYWx0PVwiTWFnbW9cIlxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMuYnJhbmRMb2dvfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuYnJhbmROYW1lfT5NYWdtbzwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5icmFuZFN1Yn0+SW52ZW50b3J5IFNlYXJjaDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5oZWFkZXJSaWdodH0+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuaGVhZGVyU3RhdHVzfT5cbiAgICAgICAgICAgICAgICB7aGFzQWN0aXZlRmlsdGVycyA/IFwiRmlsdGVycyBhY3RpdmVcIiA6IFwiQWxsIGl0ZW1zXCJ9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9oZWFkZXI+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmNvbnRlbnR9PlxuICAgICAgICAgICAgPGFzaWRlIGNsYXNzTmFtZT17c3R5bGVzLnNpZGViYXJ9PntyZW5kZXJGaWx0ZXJzKFwic2lkZWJhclwiKX08L2FzaWRlPlxuICAgICAgICAgICAgPG1haW4gY2xhc3NOYW1lPXtzdHlsZXMubWFpbn0+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMudGFibGVDYXJkfT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnRhYmxlSGVhZGVyfT5cbiAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMudGFibGVUaXRsZX0+SXRlbXM8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy50YWJsZVN1YnRpdGxlfT5cbiAgICAgICAgICAgICAgICAgICAgICB7aXNMb2FkaW5nID8gXCJMb2FkaW5nIGl0ZW1zXCIgOiBgJHtpbmZvLmxlbmd0aH0gaXRlbXMgb24gdGhpcyBwYWdlYH1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMudGFibGVNZXRhfT5cbiAgICAgICAgICAgICAgICAgICAgUGFnZSB7cGFnZX0ge2hhc05leHRQYWdlID8gYG9mICR7dG90YWxLbm93blBhZ2VzfStgIDogYG9mICR7dG90YWxLbm93blBhZ2VzfWB9XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMudGFibGVCb2R5fSByZWY9e3RhYmxlQm9keVJlZn0+XG4gICAgICAgICAgICAgICAgICB7aXNMb2FkaW5nID8gKFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmxvYWRpbmdTdGF0ZX0+XG4gICAgICAgICAgICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICAgICAgICAgICAgc3JjPVwiL21hZ21vLWxvZ28ucG5nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsdD1cIkxvYWRpbmcgTWFnbW9cIlxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMubG9hZGluZ0xvZ299XG4gICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmxvYWRpbmdUZXh0fT5Mb2FkaW5nPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgKSA6IGxvYWRFcnJvciA/IChcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5lcnJvclN0YXRlfT5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmVycm9yVGl0bGV9PlxuICAgICAgICAgICAgICAgICAgICAgICAgTG9hZCBmYWlsZWQgKHtsb2FkRXJyb3IuY29kZX0pXG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5lcnJvck1lc3NhZ2V9Pntsb2FkRXJyb3IubWVzc2FnZX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXJpYW50PVwib3V0bGluZS1zZWNvbmRhcnlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZT1cInNtXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzZXRQYWdpbmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldFF1ZXJ5RXBvY2goKHYpID0+IHYgKyAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgUmV0cnlcbiAgICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgICA8UGFydFRhYmxlXG4gICAgICAgICAgICAgICAgICAgICAgaW5mbz17aW5mb31cbiAgICAgICAgICAgICAgICAgICAgICBsYWJlbHM9e2xhYmVsc31cbiAgICAgICAgICAgICAgICAgICAgICBpZHM9e2lkc31cbiAgICAgICAgICAgICAgICAgICAgICBob3ZlclN0eWxlPXtob3ZlclN0eWxlfVxuICAgICAgICAgICAgICAgICAgICAgIHNvcnRDaGVja0FsbD17c29ydENoZWNrQWxsfVxuICAgICAgICAgICAgICAgICAgICAgIGNoZWNrRGVsZXRlPXtjaGVja0RlbGV0ZX1cbiAgICAgICAgICAgICAgICAgICAgICBpc0RlbGV0aW5nPXtpc0RlbGV0aW5nfVxuICAgICAgICAgICAgICAgICAgICAgIHJvd1NlbGVjdD17cm93U2VsZWN0fVxuICAgICAgICAgICAgICAgICAgICAgIHNldEhvdmVySW5kZXg9e3NldEhvdmVySW5kZXh9XG4gICAgICAgICAgICAgICAgICAgICAgaG92ZXJJbmRleD17aG92ZXJJbmRleH1cbiAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEl0ZW1zPXtzZWxlY3RlZEl0ZW1zfVxuICAgICAgICAgICAgICAgICAgICAgIHNldFNlbGVjdGVkSXRlbXM9e3NldFNlbGVjdGVkSXRlbXN9XG4gICAgICAgICAgICAgICAgICAgICAgbWluUm93cz17cGFnZVNpemV9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy50YWJsZUZvb3Rlcn0+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnBhZ2luYXRpb25Sb3d9PlxuICAgICAgICAgICAgICAgICAgICA8UGFnaW5hdGlvbiBzaXplPVwic21cIj5cbiAgICAgICAgICAgICAgICAgICAgICA8UGFnaW5hdGlvbi5QcmV2XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRQYWdlKChwKSA9PiBNYXRoLm1heCgxLCBwIC0gMSkpfVxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3BhZ2UgPD0gMX1cbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICBQcmV2aW91c1xuICAgICAgICAgICAgICAgICAgICAgIDwvUGFnaW5hdGlvbi5QcmV2PlxuICAgICAgICAgICAgICAgICAgICAgIHtwYWdlQnV0dG9uc31cbiAgICAgICAgICAgICAgICAgICAgICA8UGFnaW5hdGlvbi5OZXh0XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRQYWdlKChwKSA9PiBwICsgMSl9XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17IWhhc05leHRQYWdlfVxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIE5leHRcbiAgICAgICAgICAgICAgICAgICAgICA8L1BhZ2luYXRpb24uTmV4dD5cbiAgICAgICAgICAgICAgICAgICAgPC9QYWdpbmF0aW9uPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8Rm9ybSBjbGFzc05hbWU9e3N0eWxlcy5zZWFyY2hSb3d9PlxuICAgICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2xcbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPXtzaG93TGlzdFNlYXJjaH1cbiAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlNlYXJjaFwiXG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMuc2VhcmNoSW5wdXR9XG4gICAgICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD1cIlNlYXJjaFwiXG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3NlYXJjaH1cbiAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17c2VhcmNoQ2hhbmdlSGFuZGxlcn1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPE5hdkRyb3Bkb3duXG4gICAgICAgICAgICAgICAgICAgICAgdGl0bGU9e3NlbGVjdH1cbiAgICAgICAgICAgICAgICAgICAgICBpZD1cImNvbGxhc2libGUtbmF2LWRyb3Bkb3duXCJcbiAgICAgICAgICAgICAgICAgICAgICBzaG93PXtzaG93TGlzdH1cbiAgICAgICAgICAgICAgICAgICAgICBvbk1vdXNlRW50ZXI9eygpID0+IHNldFNob3dMaXN0KHRydWUpfVxuICAgICAgICAgICAgICAgICAgICAgIG9uTW91c2VMZWF2ZT17KCkgPT4gc2V0U2hvd0xpc3QoZmFsc2UpfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17c3R5bGVzLnNlYXJjaFNlbGVjdH1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIDxOYXZEcm9wZG93bi5JdGVtXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNlbGVjdChcIk5hbWVcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNob3dMaXN0U2VhcmNoKFwidGV4dFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgTmFtZVxuICAgICAgICAgICAgICAgICAgICAgIDwvTmF2RHJvcGRvd24uSXRlbT5cbiAgICAgICAgICAgICAgICAgICAgICA8TmF2RHJvcGRvd24uSXRlbVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTZWxlY3QoXCJEYXRlXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTaG93TGlzdFNlYXJjaChcImRhdGVcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIERhdGVcbiAgICAgICAgICAgICAgICAgICAgICA8L05hdkRyb3Bkb3duLkl0ZW0+XG4gICAgICAgICAgICAgICAgICAgICAgPE5hdkRyb3Bkb3duLkl0ZW1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2VsZWN0KFwiV29yayBPcmRlclwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2hvd0xpc3RTZWFyY2goXCJ0ZXh0XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICBXb3JrIE9yZGVyXG4gICAgICAgICAgICAgICAgICAgICAgPC9OYXZEcm9wZG93bi5JdGVtPlxuICAgICAgICAgICAgICAgICAgICAgIDxOYXZEcm9wZG93bi5JdGVtXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNlbGVjdChcIlByb2R1Y3QgTnVtYmVyXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTaG93TGlzdFNlYXJjaChcInRleHRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIFByb2R1Y3QgTnVtYmVyXG4gICAgICAgICAgICAgICAgICAgICAgPC9OYXZEcm9wZG93bi5JdGVtPlxuICAgICAgICAgICAgICAgICAgICAgIDxOYXZEcm9wZG93bi5JdGVtXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNlbGVjdChcIlNlcmlhbCBOdW1iZXJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNob3dMaXN0U2VhcmNoKFwidGV4dFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgU2VyaWFsIE51bWJlclxuICAgICAgICAgICAgICAgICAgICAgIDwvTmF2RHJvcGRvd24uSXRlbT5cbiAgICAgICAgICAgICAgICAgICAgICA8TmF2RHJvcGRvd24uSXRlbVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTZWxlY3QoXCJEZXNjcmlwdGlvblwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2hvd0xpc3RTZWFyY2goXCJ0ZXh0XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICBEZXNjcmlwdGlvblxuICAgICAgICAgICAgICAgICAgICAgIDwvTmF2RHJvcGRvd24uSXRlbT5cbiAgICAgICAgICAgICAgICAgICAgICA8TmF2RHJvcGRvd24uSXRlbVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTZWxlY3QoXCJTS1VcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNob3dMaXN0U2VhcmNoKFwidGV4dFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgU0tVXG4gICAgICAgICAgICAgICAgICAgICAgPC9OYXZEcm9wZG93bi5JdGVtPlxuICAgICAgICAgICAgICAgICAgICA8L05hdkRyb3Bkb3duPlxuICAgICAgICAgICAgICAgICAgPC9Gb3JtPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5mb290ZXJBY3Rpb25zfT5cbiAgICAgICAgICAgICAgICAgICAgPExvYWRpbmdCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwic2Vjb25kYXJ5XCJcbiAgICAgICAgICAgICAgICAgICAgICBuYW1lPVwiQWRkIE5ldyBJdGVtXCJcbiAgICAgICAgICAgICAgICAgICAgICByb3V0ZT1cIk5ld1NlYXJjaC9BZGRJdGVtL05ld0l0ZW1cIlxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17c3R5bGVzLmFjdGlvbkJ1dHRvbn1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPExvYWRpbmdCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwibGlnaHRcIlxuICAgICAgICAgICAgICAgICAgICAgIG5hbWU9XCJNYXBcIlxuICAgICAgICAgICAgICAgICAgICAgIHJvdXRlPVwiTmV3U2VhcmNoL2ludmVudG9yeS9pbnZlbnRvcnlNYW5hZ2VcIlxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17c3R5bGVzLmFjdGlvbkJ1dHRvbn1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPExvYWRpbmdCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwicHJpbWFyeVwiXG4gICAgICAgICAgICAgICAgICAgICAgbmFtZT1cIkJhY2tcIlxuICAgICAgICAgICAgICAgICAgICAgIHJvdXRlPVwiV2FyZWhvdXNlZGIvV2FyZWhvdXNlU2VsZWN0XCJcbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5hY3Rpb25CdXR0b259XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L21haW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxPZmZjYW52YXNcbiAgICAgICAgICBzaG93PXtzaG93RmlsdGVyc31cbiAgICAgICAgICBvbkhpZGU9eygpID0+IHNldFNob3dGaWx0ZXJzKGZhbHNlKX1cbiAgICAgICAgICBwbGFjZW1lbnQ9XCJzdGFydFwiXG4gICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMuZmlsdGVyc0RyYXdlcn1cbiAgICAgICAgICBzY3JvbGxcbiAgICAgICAgICBiYWNrZHJvcFxuICAgICAgICA+XG4gICAgICAgICAgPE9mZmNhbnZhcy5IZWFkZXIgY2xvc2VCdXR0b24+XG4gICAgICAgICAgICA8T2ZmY2FudmFzLlRpdGxlPkZpbHRlcnM8L09mZmNhbnZhcy5UaXRsZT5cbiAgICAgICAgICA8L09mZmNhbnZhcy5IZWFkZXI+XG4gICAgICAgICAgPE9mZmNhbnZhcy5Cb2R5PntyZW5kZXJGaWx0ZXJzKFwiZHJhd2VyXCIpfTwvT2ZmY2FudmFzLkJvZHk+XG4gICAgICAgIDwvT2ZmY2FudmFzPlxuICAgICAgPC9kaXY+XG4gICAgPC9Mb2dnZWRJbj5cbiAgKTtcblxyXG5cclxufVxyXG5cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==