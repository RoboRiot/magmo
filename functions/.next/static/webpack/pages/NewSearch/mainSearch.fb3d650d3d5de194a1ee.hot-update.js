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

  var _useState25 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(labelBase),
      labels = _useState25[0],
      setLabels = _useState25[1];

  var _useState26 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(sortCheckBase),
      sortCheck = _useState26[0],
      setSortCheck = _useState26[1];

  var _useState27 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(null),
      hoverIndex = _useState27[0],
      setHoverIndex = _useState27[1];

  var _useState28 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(null),
      selectedModel = _useState28[0],
      setSelectedModel = _useState28[1];

  var _useState29 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(null),
      gPos = _useState29[0],
      setGPos = _useState29[1];

  var _useState30 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(null),
      gIde = _useState30[0],
      setGIde = _useState30[1];

  var _useState31 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(false),
      isDeleting = _useState31[0],
      setIsDeleting = _useState31[1];

  var _useState32 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(1),
      page = _useState32[0],
      setPage = _useState32[1];

  var _useState33 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])([]),
      pageCursors = _useState33[0],
      setPageCursors = _useState33[1];

  var _useState34 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(false),
      hasNextPage = _useState34[0],
      setHasNextPage = _useState34[1];

  var fetchSeq = Object(react__WEBPACK_IMPORTED_MODULE_5__["useRef"])(0);
  var backfillInFlight = Object(react__WEBPACK_IMPORTED_MODULE_5__["useRef"])(false);

  var _useState35 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(0),
      queryEpoch = _useState35[0],
      setQueryEpoch = _useState35[1];

  var _useState36 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(null),
      loadError = _useState36[0],
      setLoadError = _useState36[1];

  var tableBodyRef = Object(react__WEBPACK_IMPORTED_MODULE_5__["useRef"])(null);
  var rowHeightRef = Object(react__WEBPACK_IMPORTED_MODULE_5__["useRef"])(46);
  var headerHeightRef = Object(react__WEBPACK_IMPORTED_MODULE_5__["useRef"])(38);
  var LOAD_TIMEOUT_MS = 30000;
  var startNameTokenBackfill = Object(react__WEBPACK_IMPORTED_MODULE_5__["useCallback"])( /*#__PURE__*/Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__["default"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee() {
    var reason,
        lastRun,
        db,
        lastDoc,
        tokensEqual,
        _loop,
        _ret,
        _args2 = arguments;

    return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            reason = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : "";

            if (!backfillInFlight.current) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt("return");

          case 3:
            if (false) {}

            lastRun = window.localStorage.getItem("nameTokensBackfillAt");

            if (!(lastRun && Date.now() - Number(lastRun) < 24 * 60 * 60 * 1000)) {
              _context2.next = 7;
              break;
            }

            return _context2.abrupt("return");

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

            _context2.prev = 11;
            _loop = /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _loop() {
              var query, snap, batch, writes;
              return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _loop$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      query = db.collection("Test").orderBy(_context_Firebase__WEBPACK_IMPORTED_MODULE_16__["default"].firestore.FieldPath.documentId()).limit(200);
                      if (lastDoc) query = query.startAfter(lastDoc);
                      _context.next = 4;
                      return query.get();

                    case 4:
                      snap = _context.sent;

                      if (!snap.empty) {
                        _context.next = 7;
                        break;
                      }

                      return _context.abrupt("return", "break");

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
                        _context.next = 13;
                        break;
                      }

                      _context.next = 13;
                      return batch.commit();

                    case 13:
                      lastDoc = snap.docs[snap.docs.length - 1];
                      _context.next = 16;
                      return new Promise(function (resolve) {
                        return setTimeout(resolve, 25);
                      });

                    case 16:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _loop);
            });

          case 13:
            if (false) {}

            return _context2.delegateYield(_loop(), "t0", 15);

          case 15:
            _ret = _context2.t0;

            if (!(_ret === "break")) {
              _context2.next = 18;
              break;
            }

            return _context2.abrupt("break", 20);

          case 18:
            _context2.next = 13;
            break;

          case 20:
            if (true) {
              window.localStorage.setItem("nameTokensBackfillAt", String(Date.now()));
            }

            _context2.next = 26;
            break;

          case 23:
            _context2.prev = 23;
            _context2.t1 = _context2["catch"](11);
            console.error("Name token backfill failed:", reason, _context2.t1);

          case 26:
            _context2.prev = 26;
            backfillInFlight.current = false;
            return _context2.finish(26);

          case 29:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee, null, [[11, 23, 26, 29]]);
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
    _fetchData = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__["default"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee9() {
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
          _args10 = arguments;

      return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee9$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              requestedPage = _args10.length > 0 && _args10[0] !== undefined ? _args10[0] : 1;
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
              _context10.prev = 6;

              if (router.query.inputText && router.query.selectedType) {
                setSelect(router.query.selectedType);
                setSearch(router.query.inputText);
              }

              startAfterDoc = requestedPage > 1 ? pageCursors[requestedPage - 2] : null;

              if (!(requestedPage > 1 && !startAfterDoc)) {
                _context10.next = 13;
                break;
              }

              setPage(1);

              if (seq === fetchSeq.current) {
                clearTimeout(timeoutId);
                setIsLoading(false);
              }

              return _context10.abrupt("return");

            case 13:
              effectiveSelect = router.query.selectedType || select;
              effectiveSearch = router.query.inputText || search;
              effectiveSearchLower = (effectiveSearch || "").toLowerCase().trim(); // light retry for transient Firestore hiccups

              load = /*#__PURE__*/function () {
                var _ref16 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__["default"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee8() {
                  var attempt,
                      _args9 = arguments;
                  return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee8$(_context9) {
                    while (1) {
                      switch (_context9.prev = _context9.next) {
                        case 0:
                          attempt = _args9.length > 0 && _args9[0] !== undefined ? _args9[0] : 1;
                          _context9.prev = 1;
                          _context9.next = 4;
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
                          return _context9.abrupt("return", _context9.sent);

                        case 7:
                          _context9.prev = 7;
                          _context9.t0 = _context9["catch"](1);

                          if (!(attempt >= 3)) {
                            _context9.next = 11;
                            break;
                          }

                          throw _context9.t0;

                        case 11:
                          _context9.next = 13;
                          return new Promise(function (r) {
                            return setTimeout(r, 250 * Math.pow(2, attempt - 1));
                          });

                        case 13:
                          return _context9.abrupt("return", load(attempt + 1));

                        case 14:
                        case "end":
                          return _context9.stop();
                      }
                    }
                  }, _callee8, null, [[1, 7]]);
                }));

                return function load() {
                  return _ref16.apply(this, arguments);
                };
              }();

              _context10.next = 19;
              return load();

            case 19:
              _yield$load = _context10.sent;
              data = _yield$load.parts;
              lastDoc = _yield$load.lastDoc;
              nextPage = _yield$load.hasNextPage;

              if (!(timedOut || seq !== fetchSeq.current)) {
                _context10.next = 25;
                break;
              }

              return _context10.abrupt("return");

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
                _context10.next = 35;
                break;
              }

              setHasNextPage(false);
              setPage(1);
              return _context10.abrupt("return");

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
                var _ref17, _ref18, _item$clientFromId, _item$ClientFrom, _ref19, _ref20, _item$clientCurrentId, _item$ClientCurrent;

                return _objectSpread(_objectSpread({}, item), {}, {
                  clientFromId: (_ref17 = (_ref18 = (_item$clientFromId = item === null || item === void 0 ? void 0 : item.clientFromId) !== null && _item$clientFromId !== void 0 ? _item$clientFromId : typeof (item === null || item === void 0 ? void 0 : item.ClientFrom) === "string" ? item.ClientFrom : null) !== null && _ref18 !== void 0 ? _ref18 : item === null || item === void 0 ? void 0 : (_item$ClientFrom = item.ClientFrom) === null || _item$ClientFrom === void 0 ? void 0 : _item$ClientFrom.id) !== null && _ref17 !== void 0 ? _ref17 : null,
                  clientCurrentId: (_ref19 = (_ref20 = (_item$clientCurrentId = item === null || item === void 0 ? void 0 : item.clientCurrentId) !== null && _item$clientCurrentId !== void 0 ? _item$clientCurrentId : typeof (item === null || item === void 0 ? void 0 : item.ClientCurrent) === "string" ? item.ClientCurrent : null) !== null && _ref20 !== void 0 ? _ref20 : item === null || item === void 0 ? void 0 : (_item$ClientCurrent = item.ClientCurrent) === null || _item$ClientCurrent === void 0 ? void 0 : _item$ClientCurrent.id) !== null && _ref19 !== void 0 ? _ref19 : null
                });
              });
              setAugmentedInfo(augmented); // default view = filtered (keeps pagination and filters consistent)

              setInfo(augmented.filter(matchesFilters));
              _context10.next = 52;
              break;

            case 43:
              _context10.prev = 43;
              _context10.t0 = _context10["catch"](6);

              if (!(seq !== fetchSeq.current)) {
                _context10.next = 47;
                break;
              }

              return _context10.abrupt("return");

            case 47:
              console.error("Error fetching data:", _context10.t0);
              code = (_context10.t0 === null || _context10.t0 === void 0 ? void 0 : _context10.t0.code) || "unknown";
              setLoadError({
                code: code,
                message: (_context10.t0 === null || _context10.t0 === void 0 ? void 0 : _context10.t0.message) || "Failed to load items."
              });
              setInfo([]);
              setAugmentedInfo([]);

            case 52:
              _context10.prev = 52;
              clearTimeout(timeoutId);
              if (seq === fetchSeq.current && !timedOut) setIsLoading(false);
              return _context10.finish(52);

            case 56:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee9, null, [[6, 43, 52, 56]]);
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

  var _useState37 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])([]),
      selectedItems = _useState37[0],
      setSelectedItems = _useState37[1];

  var _useState38 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(false),
      showDeleteModal = _useState38[0],
      setShowDeleteModal = _useState38[1];

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
    var _ref10 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__["default"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee2() {
      var db, _iterator2, _step2, itemId;

      return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee2$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              setIsDeleting(true);
              db = _context_Firebase__WEBPACK_IMPORTED_MODULE_16__["default"].firestore();
              _context3.prev = 2;
              // Loop over each selected item one at a time
              _iterator2 = _createForOfIteratorHelper(selectedItems);
              _context3.prev = 4;

              _iterator2.s();

            case 6:
              if ((_step2 = _iterator2.n()).done) {
                _context3.next = 35;
                break;
              }

              itemId = _step2.value;
              console.log(itemId);
              _context3.prev = 9;
              _context3.next = 12;
              return db.collection("Test").doc(itemId)["delete"]();

            case 12:
              _context3.next = 17;
              break;

            case 14:
              _context3.prev = 14;
              _context3.t0 = _context3["catch"](9);
              console.error("Error deleting document ".concat(itemId, " from Test:"), _context3.t0);

            case 17:
              _context3.prev = 17;
              _context3.next = 20;
              return db.collection("Parts").doc(itemId)["delete"]();

            case 20:
              _context3.next = 25;
              break;

            case 22:
              _context3.prev = 22;
              _context3.t1 = _context3["catch"](17);
              console.error("Error deleting document ".concat(itemId, " from Parts:"), _context3.t1);

            case 25:
              _context3.prev = 25;
              _context3.next = 28;
              return deleteFromStorage(itemId);

            case 28:
              _context3.next = 33;
              break;

            case 30:
              _context3.prev = 30;
              _context3.t2 = _context3["catch"](25);
              console.error("Error deleting storage for ".concat(itemId, ":"), _context3.t2);

            case 33:
              _context3.next = 6;
              break;

            case 35:
              _context3.next = 40;
              break;

            case 37:
              _context3.prev = 37;
              _context3.t3 = _context3["catch"](4);

              _iterator2.e(_context3.t3);

            case 40:
              _context3.prev = 40;

              _iterator2.f();

              return _context3.finish(40);

            case 43:
              // Update local state by filtering out the deleted items
              setInfo(info.filter(function (item) {
                return !selectedItems.includes(item.id);
              }));
              setSelectedItems([]);
              _context3.next = 50;
              break;

            case 47:
              _context3.prev = 47;
              _context3.t4 = _context3["catch"](2);
              console.error("Error deleting items:", _context3.t4);

            case 50:
              _context3.prev = 50;
              setIsDeleting(false);
              handleCloseDeleteModal(); // Optionally, reload the page
              // router.reload();

              return _context3.finish(50);

            case 54:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee2, null, [[2, 47, 50, 54], [4, 37, 40, 43], [9, 14], [17, 22], [25, 30]]);
    }));

    return function handleDeleteSelected() {
      return _ref10.apply(this, arguments);
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

  var _useState39 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])("Select Option"),
      dropdown1Text = _useState39[0],
      setDropdown1Text = _useState39[1];

  var _useState40 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])("Select Option"),
      dropdown2Text = _useState40[0],
      setDropdown2Text = _useState40[1];

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


  function buildClientsFromItems(_x) {
    return _buildClientsFromItems.apply(this, arguments);
  } // --------------------
  // CLIENT SELECTION HANDLING
  // --------------------
  // This function fetches clients and opens the client modal.


  function _buildClientsFromItems() {
    _buildClientsFromItems = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__["default"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee10(type) {
      var db, ids, filtered, _iterator3, _step3, it, id, out, idArray, i, chunk, snap;

      return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee10$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
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
                _context11.next = 17;
                break;
              }

              chunk = idArray.slice(i, i + 10);
              _context11.next = 12;
              return db.collection("Client").where(_context_Firebase__WEBPACK_IMPORTED_MODULE_16__["default"].firestore.FieldPath.documentId(), "in", chunk).get();

            case 12:
              snap = _context11.sent;
              snap.forEach(function (doc) {
                var d = doc.data() || {};
                out.push({
                  id: doc.id,
                  name: d.name || doc.id
                });
              });

            case 14:
              i += 10;
              _context11.next = 8;
              break;

            case 17:
              // sort by name for nicer UX
              out.sort(function (a, b) {
                return (a.name || "").localeCompare(b.name || "");
              });
              return _context11.abrupt("return", out);

            case 19:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee10);
    }));
    return _buildClientsFromItems.apply(this, arguments);
  }

  var handleClientClick = /*#__PURE__*/function () {
    var _ref11 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__["default"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee3() {
      var safeClients, clientsData, derived;
      return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee3$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              safeClients = [];
              _context4.prev = 1;
              _context4.next = 4;
              return Object(_utils_fetchAssociations__WEBPACK_IMPORTED_MODULE_9__["fetchClients"])(selectedOEM, selectedModality);

            case 4:
              clientsData = _context4.sent;
              safeClients = Array.isArray(clientsData) ? clientsData : [];
              _context4.next = 11;
              break;

            case 8:
              _context4.prev = 8;
              _context4.t0 = _context4["catch"](1);
              console.error("fetchClients failed:", _context4.t0);

            case 11:
              if (!(safeClients.length === 0)) {
                _context4.next = 24;
                break;
              }

              _context4.prev = 12;

              if (!clientSelectionType) {
                // if somehow not set yet, default to "from"
                setClientSelectionType("from");
              }

              _context4.next = 16;
              return buildClientsFromItems(clientSelectionType || "from");

            case 16:
              derived = _context4.sent;
              safeClients = derived;
              _context4.next = 24;
              break;

            case 20:
              _context4.prev = 20;
              _context4.t1 = _context4["catch"](12);
              console.error("Fallback buildClientsFromItems failed:", _context4.t1);
              safeClients = [];

            case 24:
              setClients(safeClients);
              setClientSearchTerm("");
              setShowClientModal(true);

            case 27:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee3, null, [[1, 8], [12, 20]]);
    }));

    return function handleClientClick() {
      return _ref11.apply(this, arguments);
    };
  }(); // When a client is selected in the modal, we now assume the parameter is a client ID.
  // If the passed value is null, we clear the selection.


  var handleClientSelect = /*#__PURE__*/function () {
    var _ref12 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__["default"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee4(clientId) {
      var clientSnap, clientData;
      return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee4$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              console.log("User selected client id:", clientId);

              if (clientId) {
                _context5.next = 5;
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
              return _context5.abrupt("return");

            case 5:
              _context5.prev = 5;
              _context5.next = 8;
              return _context_Firebase__WEBPACK_IMPORTED_MODULE_16__["default"].firestore().collection("Client").doc(clientId).get();

            case 8:
              clientSnap = _context5.sent;

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

              _context5.next = 15;
              break;

            case 12:
              _context5.prev = 12;
              _context5.t0 = _context5["catch"](5);
              console.error("Error fetching client data:", _context5.t0);

            case 15:
              setShowClientModal(false);

            case 16:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee4, null, [[5, 12]]);
    }));

    return function handleClientSelect(_x2) {
      return _ref12.apply(this, arguments);
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


  var _useState41 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])([]),
      models = _useState41[0],
      setModels = _useState41[1];

  var _useState42 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(false),
      showModelModal = _useState42[0],
      setShowModelModal = _useState42[1];

  var _useState43 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])("Select Option"),
      modelButtonText = _useState43[0],
      setModelButtonText = _useState43[1];

  var handleModelClick = /*#__PURE__*/function () {
    var _ref13 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__["default"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee5() {
      var modelsData;
      return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee5$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return Object(_utils_fetchAssociations__WEBPACK_IMPORTED_MODULE_9__["fetchModels"])(selectedOEM, selectedModality, selectedClientFrom);

            case 2:
              modelsData = _context6.sent;
              setModels(modelsData);
              setModelSearchTerm("");
              setShowModelModal(true);

            case 6:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee5);
    }));

    return function handleModelClick() {
      return _ref13.apply(this, arguments);
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

  var _useState44 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(""),
      clientSearchTerm = _useState44[0],
      setClientSearchTerm = _useState44[1];

  var _useState45 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(""),
      modelSearchTerm = _useState45[0],
      setModelSearchTerm = _useState45[1];

  var deleteFromStorage = /*#__PURE__*/function () {
    var _ref14 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__["default"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee6(itemId) {
      var storageRef, folderRef, listResult, deletePromises;
      return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee6$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              storageRef = _context_Firebase__WEBPACK_IMPORTED_MODULE_16__["default"].storage().ref();
              folderRef = storageRef.child("Parts/".concat(itemId, "/"));
              _context7.prev = 2;
              _context7.next = 5;
              return folderRef.listAll();

            case 5:
              listResult = _context7.sent;
              deletePromises = listResult.items.map(function (item) {
                return item["delete"]();
              });
              _context7.next = 9;
              return Promise.all(deletePromises);

            case 9:
              _context7.next = 14;
              break;

            case 11:
              _context7.prev = 11;
              _context7.t0 = _context7["catch"](2);
              console.error("Error deleting from storage:", _context7.t0);

            case 14:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee6, null, [[2, 11]]);
    }));

    return function deleteFromStorage(_x3) {
      return _ref14.apply(this, arguments);
    };
  }();

  var deleteFromPartsCollection = /*#__PURE__*/function () {
    var _ref15 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__["default"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee7(itemId) {
      var db;
      return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee7$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              db = _context_Firebase__WEBPACK_IMPORTED_MODULE_16__["default"].firestore();
              _context8.prev = 1;
              _context8.next = 4;
              return db.collection("Parts").doc(itemId)["delete"]();

            case 4:
              console.log("Deleted item from Parts collection: ".concat(itemId));
              _context8.next = 10;
              break;

            case 7:
              _context8.prev = 7;
              _context8.t0 = _context8["catch"](1);
              console.error("Error deleting from Parts collection:", _context8.t0);

            case 10:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee7, null, [[1, 7]]);
    }));

    return function deleteFromPartsCollection(_x4) {
      return _ref15.apply(this, arguments);
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
          lineNumber: 1031,
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
          lineNumber: 1041,
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
        lineNumber: 1127,
        columnNumber: 5
      }
    }, __jsx("div", {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.filtersHeader,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1128,
        columnNumber: 7
      }
    }, __jsx("div", {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1129,
        columnNumber: 9
      }
    }, __jsx("div", {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.filtersTitle,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1130,
        columnNumber: 11
      }
    }, "Filters"), __jsx("div", {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.filtersSubtitle,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1131,
        columnNumber: 11
      }
    }, "Narrow results by machine, client, or warehouse.")), hasActiveFilters ? __jsx("span", {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.filtersBadge,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1136,
        columnNumber: 11
      }
    }, "Active") : null), __jsx("div", {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.filterSection,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1140,
        columnNumber: 7
      }
    }, __jsx("div", {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.filterSectionTitle,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1141,
        columnNumber: 9
      }
    }, "Machine"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["InputGroup"], {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.inputGroup,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1142,
        columnNumber: 9
      }
    }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["InputGroup"].Text, {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1143,
        columnNumber: 11
      }
    }, "OEM"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Dropdown"], {
      onSelect: handleSelect1,
      className: "w-100",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1144,
        columnNumber: 11
      }
    }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Dropdown"].Toggle, {
      variant: "outline-secondary",
      id: "".concat(idPrefix, "-oem"),
      className: "w-100 ".concat(_styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.inputButton),
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1145,
        columnNumber: 13
      }
    }, dropdown1Text), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Dropdown"].Menu, {
      className: "w-100",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1152,
        columnNumber: 13
      }
    }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Dropdown"].Item, {
      eventKey: "unassigned",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1153,
        columnNumber: 15
      }
    }, "Select Option"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Dropdown"].Item, {
      eventKey: "GE",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1154,
        columnNumber: 15
      }
    }, "GE"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Dropdown"].Item, {
      eventKey: "Toshiba",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1155,
        columnNumber: 15
      }
    }, "Toshiba"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Dropdown"].Item, {
      eventKey: "Siemens",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1156,
        columnNumber: 15
      }
    }, "Siemens"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Dropdown"].Item, {
      eventKey: "Philips",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1157,
        columnNumber: 15
      }
    }, "Philips")))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["InputGroup"], {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.inputGroup,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1162,
        columnNumber: 9
      }
    }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["InputGroup"].Text, {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1163,
        columnNumber: 11
      }
    }, "Modality"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Dropdown"], {
      onSelect: handleSelect2,
      className: "w-100",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1164,
        columnNumber: 11
      }
    }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Dropdown"].Toggle, {
      variant: "outline-secondary",
      id: "".concat(idPrefix, "-modality"),
      className: "w-100 ".concat(_styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.inputButton),
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1165,
        columnNumber: 13
      }
    }, dropdown2Text), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Dropdown"].Menu, {
      className: "w-100",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1172,
        columnNumber: 13
      }
    }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Dropdown"].Item, {
      eventKey: "unassigned",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1173,
        columnNumber: 15
      }
    }, "Select Option"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Dropdown"].Item, {
      eventKey: "CT",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1174,
        columnNumber: 15
      }
    }, "CT"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Dropdown"].Item, {
      eventKey: "MRI",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1175,
        columnNumber: 15
      }
    }, "MRI")))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["InputGroup"], {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.inputGroup,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1180,
        columnNumber: 9
      }
    }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["InputGroup"].Text, {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1181,
        columnNumber: 11
      }
    }, "Model"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Button"], {
      variant: "outline-secondary",
      className: "w-100 ".concat(_styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.inputButton),
      onClick: handleModelClick,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1182,
        columnNumber: 11
      }
    }, modelButtonText))), __jsx("div", {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.filterSection,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1192,
        columnNumber: 7
      }
    }, __jsx("div", {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.filterSectionTitle,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1193,
        columnNumber: 9
      }
    }, "Client"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["InputGroup"], {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.inputGroup,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1194,
        columnNumber: 9
      }
    }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["InputGroup"].Text, {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1195,
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
        lineNumber: 1196,
        columnNumber: 11
      }
    }, clientFromButtonText)), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["InputGroup"], {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.inputGroup,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1205,
        columnNumber: 9
      }
    }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["InputGroup"].Text, {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1206,
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
        lineNumber: 1207,
        columnNumber: 11
      }
    }, clientCurrentButtonText))), __jsx("div", {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.filterSection,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1217,
        columnNumber: 7
      }
    }, __jsx("div", {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.filterSectionTitle,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1218,
        columnNumber: 9
      }
    }, "Warehouse"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["InputGroup"], {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.inputGroup,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1219,
        columnNumber: 9
      }
    }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["InputGroup"].Text, {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1220,
        columnNumber: 11
      }
    }, "Quick"), __jsx("div", {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.buttonGroup,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1221,
        columnNumber: 11
      }
    }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Button"], {
      variant: "outline-secondary",
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.flexButton,
      onClick: handleSoCalWarehouseClick,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1222,
        columnNumber: 13
      }
    }, "SoCal Warehouse"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Button"], {
      variant: "outline-secondary",
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.flexButton,
      onClick: handleNorCalWarehouseClick,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1229,
        columnNumber: 13
      }
    }, "NorCal Warehouse"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Button"], {
      variant: "outline-secondary",
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.flexButton,
      onClick: handleWarehouseUnassignedClick,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1236,
        columnNumber: 13
      }
    }, "Unassigned")))));
  };

  return __jsx(_LoggedIn__WEBPACK_IMPORTED_MODULE_11__["default"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1251,
      columnNumber: 5
    }
  }, (isDeleting || isNavigating) && __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.loadingOverlay,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1253,
      columnNumber: 9
    }
  }, __jsx("img", {
    src: "/magmo-logo.png",
    alt: "Loading Magmo",
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.loadingLogo,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1254,
      columnNumber: 11
    }
  })), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"], {
    show: showDeleteModal,
    onHide: handleCloseDeleteModal,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1261,
      columnNumber: 7
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Header, {
    closeButton: true,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1262,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Title, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1263,
      columnNumber: 11
    }
  }, "Confirm Deletion")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Body, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1265,
      columnNumber: 9
    }
  }, "Are you sure you want to delete ", selectedItems.length, " item", selectedItems.length > 1 ? "s" : "", "?"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Footer, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1269,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Button"], {
    variant: "danger",
    onClick: handleDeleteSelected,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1270,
      columnNumber: 11
    }
  }, "Yes, delete"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Button"], {
    variant: "secondary",
    onClick: handleCloseDeleteModal,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1273,
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
      lineNumber: 1279,
      columnNumber: 7
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Header, {
    closeButton: true,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1280,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Title, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1281,
      columnNumber: 11
    }
  }, "Select ", clientSelectionType === "from" ? "Client From" : "Client Current")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Body, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1285,
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
      lineNumber: 1286,
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
      lineNumber: 1293,
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
      lineNumber: 1305,
      columnNumber: 7
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Header, {
    closeButton: true,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1306,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Title, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1307,
      columnNumber: 11
    }
  }, "Select Model")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Body, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1309,
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
      lineNumber: 1310,
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
      lineNumber: 1317,
      columnNumber: 11
    }
  }))), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.page,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1329,
      columnNumber: 7
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.pageInner,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1330,
      columnNumber: 9
    }
  }, __jsx("header", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.header,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1331,
      columnNumber: 11
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.headerLeft,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1332,
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
      lineNumber: 1333,
      columnNumber: 15
    }
  }, __jsx("span", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1339,
      columnNumber: 17
    }
  }), __jsx("span", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1340,
      columnNumber: 17
    }
  }), __jsx("span", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1341,
      columnNumber: 17
    }
  })), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.brand,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1343,
      columnNumber: 15
    }
  }, __jsx("img", {
    src: "/magmo-logo.png",
    alt: "Magmo",
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.brandLogo,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1344,
      columnNumber: 17
    }
  }), __jsx("div", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1349,
      columnNumber: 17
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.brandName,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1350,
      columnNumber: 19
    }
  }, "Magmo"), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.brandSub,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1351,
      columnNumber: 19
    }
  }, "Inventory Search")))), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.headerRight,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1355,
      columnNumber: 13
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.headerStatus,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1356,
      columnNumber: 15
    }
  }, hasActiveFilters ? "Filters active" : "All items"))), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.content,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1362,
      columnNumber: 11
    }
  }, __jsx("aside", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.sidebar,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1363,
      columnNumber: 13
    }
  }, renderFilters("sidebar")), __jsx("main", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.main,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1364,
      columnNumber: 13
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.tableCard,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1365,
      columnNumber: 15
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.tableHeader,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1366,
      columnNumber: 17
    }
  }, __jsx("div", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1367,
      columnNumber: 19
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.tableTitle,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1368,
      columnNumber: 21
    }
  }, "Items"), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.tableSubtitle,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1369,
      columnNumber: 21
    }
  }, isLoading ? "Loading items" : "".concat(info.length, " items on this page"))), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.tableMeta,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1373,
      columnNumber: 19
    }
  }, "Page ", page, " ", hasNextPage ? "of ".concat(totalKnownPages, "+") : "of ".concat(totalKnownPages))), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.tableBody,
    ref: tableBodyRef,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1378,
      columnNumber: 17
    }
  }, isLoading ? __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.loadingState,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1380,
      columnNumber: 21
    }
  }, __jsx("img", {
    src: "/magmo-logo.png",
    alt: "Loading Magmo",
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.loadingLogo,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1381,
      columnNumber: 23
    }
  }), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.loadingText,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1386,
      columnNumber: 23
    }
  }, "Loading")) : loadError ? __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.errorState,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1389,
      columnNumber: 21
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.errorTitle,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1390,
      columnNumber: 23
    }
  }, "Load failed (", loadError.code, ")"), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.errorMessage,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1393,
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
      lineNumber: 1394,
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
      lineNumber: 1406,
      columnNumber: 21
    }
  })), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.tableFooter,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1424,
      columnNumber: 17
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.paginationRow,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1425,
      columnNumber: 19
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Pagination"], {
    size: "sm",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1426,
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
      lineNumber: 1427,
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
      lineNumber: 1434,
      columnNumber: 23
    }
  }, "Next"))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Form"], {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.searchRow,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1442,
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
      lineNumber: 1443,
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
      lineNumber: 1451,
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
      lineNumber: 1459,
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
      lineNumber: 1467,
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
      lineNumber: 1475,
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
      lineNumber: 1483,
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
      lineNumber: 1491,
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
      lineNumber: 1499,
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
      lineNumber: 1507,
      columnNumber: 23
    }
  }, "SKU"))), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.footerActions,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1517,
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
      lineNumber: 1518,
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
      lineNumber: 1524,
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
      lineNumber: 1530,
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
      lineNumber: 1543,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Offcanvas"].Header, {
    closeButton: true,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1551,
      columnNumber: 11
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Offcanvas"].Title, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1552,
      columnNumber: 13
    }
  }, "Filters")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Offcanvas"].Body, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1554,
      columnNumber: 11
    }
  }, renderFilters("drawer")))));
}

_s2(MainSearch, "RUgcjjQ/GYbMa22rrd7l3cBs1m4=", false, function () {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vcGFnZXMvTmV3U2VhcmNoL21haW5TZWFyY2guanMiXSwibmFtZXMiOlsiU09DQUxfQ0xJRU5UX0lEIiwiTk9SQ0FMX0NMSUVOVF9JRCIsIlVOQVNTSUdORURfQ0xJRU5UX0lEIiwiREVGQVVMVF9QQUdFX1NJWkUiLCJNQVBfUkVHSU9OX09SREVSIiwic2ltdWxhdGVOZXR3b3JrUmVxdWVzdCIsIlByb21pc2UiLCJyZXNvbHZlIiwic2V0VGltZW91dCIsIkxvYWRpbmdCdXR0b24iLCJ0eXBlIiwibmFtZSIsInJvdXRlIiwiY2xhc3NOYW1lIiwidXNlU3RhdGUiLCJpc0xvYWRpbmciLCJzZXRMb2FkaW5nIiwidXNlRWZmZWN0IiwiY2FuY2VsbGVkIiwidGhlbiIsInRvVGltZSIsInZhbHVlIiwic2Vjb25kcyIsIkRhdGUiLCJ0IiwiZ2V0VGltZSIsImlzTmFOIiwiaXNvIiwicGFyc2UiLCJwYXJ0cyIsInNwbGl0IiwibGVuZ3RoIiwibW0iLCJkZCIsInl5eXkiLCJhbHQiLCJ0b1lNRCIsImQiLCJnZXRGdWxsWWVhciIsIlN0cmluZyIsImdldE1vbnRoIiwicGFkU3RhcnQiLCJnZXREYXRlIiwibm9ybWFsaXplVGV4dCIsInRvTG93ZXJDYXNlIiwidHJpbSIsImdldE1hY2hpbmVGaWVsZCIsIml0ZW0iLCJrZXkiLCJsb3dlciIsIm1hY2hpbmVEYXRhIiwiY3VycmVudE1hY2hpbmVEYXRhIiwidGhlTWFjaGluZURhdGEiLCJUaGVNYWNoaW5lIiwiTWFpblNlYXJjaCIsInVzZUF1dGgiLCJzaWduT3V0IiwiaW5mbyIsInNldEluZm8iLCJiYWNrdXBJbmZvIiwic2V0QmFja3VwSW5mbyIsImF1Z21lbnRlZEluZm8iLCJzZXRBdWdtZW50ZWRJbmZvIiwic2V0SXNMb2FkaW5nIiwiaWRzIiwic2V0SUQiLCJzaG93Iiwic2V0U2hvdyIsInNob3dGaWx0ZXJzIiwic2V0U2hvd0ZpbHRlcnMiLCJwYWdlU2l6ZSIsInNldFBhZ2VTaXplIiwiaXNOYXZpZ2F0aW5nIiwic2V0SXNOYXZpZ2F0aW5nIiwiZEl0ZW0iLCJzZXRESXRlbSIsInNlbGVjdCIsInNldFNlbGVjdCIsInNob3dMaXN0Iiwic2V0U2hvd0xpc3QiLCJzaG93TGlzdFNlYXJjaCIsInNldFNob3dMaXN0U2VhcmNoIiwic2VhcmNoIiwic2V0U2VhcmNoIiwic2VsZWN0ZWRPRU0iLCJzZXRTZWxlY3RlZE9FTSIsInNlbGVjdGVkTW9kYWxpdHkiLCJzZXRTZWxlY3RlZE1vZGFsaXR5Iiwic2VsZWN0ZWRDbGllbnRGcm9tIiwic2V0U2VsZWN0ZWRDbGllbnRGcm9tIiwiY2xpZW50RnJvbUJ1dHRvblRleHQiLCJzZXRDbGllbnRGcm9tQnV0dG9uVGV4dCIsInNlbGVjdGVkQ2xpZW50Q3VycmVudCIsInNldFNlbGVjdGVkQ2xpZW50Q3VycmVudCIsImNsaWVudEN1cnJlbnRCdXR0b25UZXh0Iiwic2V0Q2xpZW50Q3VycmVudEJ1dHRvblRleHQiLCJjbGllbnRzIiwic2V0Q2xpZW50cyIsInNob3dDbGllbnRNb2RhbCIsInNldFNob3dDbGllbnRNb2RhbCIsImNsaWVudFNlbGVjdGlvblR5cGUiLCJzZXRDbGllbnRTZWxlY3Rpb25UeXBlIiwicm91dGVyIiwidXNlUm91dGVyIiwibGFiZWxCYXNlIiwibGFiZWxCYXNlTmFtZXMiLCJzb3J0Q2hlY2tCYXNlIiwid2l0aFNvcnRJY29uIiwiYmFzZUxhYmVscyIsImFjdGl2ZUluZGV4IiwiaXNEZXNjIiwibWFwIiwidGV4dCIsImkiLCJhcnJvdyIsImxhYmVscyIsInNldExhYmVscyIsInNvcnRDaGVjayIsInNldFNvcnRDaGVjayIsImhvdmVySW5kZXgiLCJzZXRIb3ZlckluZGV4Iiwic2VsZWN0ZWRNb2RlbCIsInNldFNlbGVjdGVkTW9kZWwiLCJnUG9zIiwic2V0R1BvcyIsImdJZGUiLCJzZXRHSWRlIiwiaXNEZWxldGluZyIsInNldElzRGVsZXRpbmciLCJwYWdlIiwic2V0UGFnZSIsInBhZ2VDdXJzb3JzIiwic2V0UGFnZUN1cnNvcnMiLCJoYXNOZXh0UGFnZSIsInNldEhhc05leHRQYWdlIiwiZmV0Y2hTZXEiLCJ1c2VSZWYiLCJiYWNrZmlsbEluRmxpZ2h0IiwicXVlcnlFcG9jaCIsInNldFF1ZXJ5RXBvY2giLCJsb2FkRXJyb3IiLCJzZXRMb2FkRXJyb3IiLCJ0YWJsZUJvZHlSZWYiLCJyb3dIZWlnaHRSZWYiLCJoZWFkZXJIZWlnaHRSZWYiLCJMT0FEX1RJTUVPVVRfTVMiLCJzdGFydE5hbWVUb2tlbkJhY2tmaWxsIiwidXNlQ2FsbGJhY2siLCJyZWFzb24iLCJjdXJyZW50IiwibGFzdFJ1biIsIndpbmRvdyIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJub3ciLCJOdW1iZXIiLCJkYiIsImZpcmViYXNlIiwiZmlyZXN0b3JlIiwibGFzdERvYyIsInRva2Vuc0VxdWFsIiwiYSIsImIiLCJzZXRBIiwiU2V0Iiwic2V0QiIsInNpemUiLCJ2IiwiaGFzIiwicXVlcnkiLCJjb2xsZWN0aW9uIiwib3JkZXJCeSIsIkZpZWxkUGF0aCIsImRvY3VtZW50SWQiLCJsaW1pdCIsInN0YXJ0QWZ0ZXIiLCJnZXQiLCJzbmFwIiwiZW1wdHkiLCJiYXRjaCIsIndyaXRlcyIsImRvY3MiLCJmb3JFYWNoIiwiZG9jIiwiZGF0YSIsIm5hbWVMb3dlciIsIm5hbWVUb2tlbnMiLCJidWlsZE5hbWVUb2tlbnMiLCJleGlzdGluZ1Rva2VucyIsIkFycmF5IiwiaXNBcnJheSIsImZyb20iLCJuZWVkc1VwZGF0ZSIsInVwZGF0ZSIsInJlZiIsImNvbW1pdCIsInNldEl0ZW0iLCJjb25zb2xlIiwiZXJyb3IiLCJzZWFyY2hMb3dlciIsImhhc0FjdGl2ZUZpbHRlcnMiLCJCb29sZWFuIiwidmFsdWVNYXRjaGVzIiwicyIsInNvbWUiLCJpbmNsdWRlcyIsIm1hdGNoZXNGaWx0ZXJzIiwidmlzaWJsZSIsIk9FTSIsIk1vZGFsaXR5IiwiTW9kZWwiLCJjbGllbnRGcm9tSWQiLCJjbGllbnRDdXJyZW50SWQiLCJ3YW50ZWREYXkiLCJpdGVtWU1EIiwiZGF0ZSIsImRlc2NyaXB0aW9ucyIsIndvcmtPcmRlcnMiLCJ3Iiwid28iLCJ3b3JrT3JkZXIiLCJwbiIsInNuIiwiZGVzYyIsImRlc2NyaXB0aW9uIiwiaWQiLCJsb2NhbFNOIiwibG9jYWxfc24iLCJyZXNldFBhZ2luYXRpb24iLCJhc1BhdGgiLCJmZXRjaERhdGEiLCJldmVudHMiLCJoYW5kbGVEb25lIiwib24iLCJvZmYiLCJyZXF1ZXN0ZWRQYWdlIiwic2VxIiwidGltZWRPdXQiLCJ0aW1lb3V0SWQiLCJjb2RlIiwibWVzc2FnZSIsIk1hdGgiLCJyb3VuZCIsImlucHV0VGV4dCIsInNlbGVjdGVkVHlwZSIsInN0YXJ0QWZ0ZXJEb2MiLCJjbGVhclRpbWVvdXQiLCJlZmZlY3RpdmVTZWxlY3QiLCJlZmZlY3RpdmVTZWFyY2giLCJlZmZlY3RpdmVTZWFyY2hMb3dlciIsImxvYWQiLCJhdHRlbXB0IiwiZmV0Y2hQYXJ0c1dpdGhNYWNoaW5lRGF0YVBhZ2UiLCJ2aXNpYmxlT25seSIsImZpbHRlckZuIiwicmF3IiwibmVlZHNNYWNoaW5lRGF0YSIsInIiLCJwb3ciLCJuZXh0UGFnZSIsImhhc05hbWVTZWFyY2giLCJwcmV2IiwibmV4dCIsInNldFNlbGVjdGVkSXRlbXMiLCJhdWdtZW50ZWQiLCJDbGllbnRGcm9tIiwiQ2xpZW50Q3VycmVudCIsImZpbHRlciIsInNlYXJjaENoYW5nZUhhbmRsZXIiLCJldmVudCIsInRhcmdldCIsImJhc2UiLCJzb3J0Q2hlY2tBbGwiLCJwb3MiLCJuZXh0U29ydENoZWNrIiwic29ydGVkSW5mbyIsInNvcnQiLCJ0YSIsInRiIiwiYXYiLCJ0b1N0cmluZyIsImJ2IiwibG9jYWxlQ29tcGFyZSIsImFuIiwiYm4iLCJyb3dTZWxlY3QiLCJsb2ciLCJwdXNoIiwic2VsZWN0ZWRJdGVtcyIsInNob3dEZWxldGVNb2RhbCIsInNldFNob3dEZWxldGVNb2RhbCIsImhhbmRsZVNlbGVjdEl0ZW0iLCJ4IiwiaGFuZGxlU2hvd0RlbGV0ZU1vZGFsIiwiaGFuZGxlQ2xvc2VEZWxldGVNb2RhbCIsImhhbmRsZURlbGV0ZVNlbGVjdGVkIiwiaXRlbUlkIiwiZGVsZXRlRnJvbVN0b3JhZ2UiLCJoYW5kbGVDbG9zZSIsImhhbmRsZVNob3ciLCJjaGVja0RlbGV0ZSIsImlkc1RvRGVsZXRlIiwicHJldmVudERlZmF1bHQiLCJzdG9wUHJvcGFnYXRpb24iLCJob3ZlclN0eWxlIiwiaW5kZXgiLCJiYWNrZ3JvdW5kQ29sb3IiLCJ0ZXh0QWxpZ24iLCJjdXJzb3IiLCJkcm9wZG93bjFUZXh0Iiwic2V0RHJvcGRvd24xVGV4dCIsImRyb3Bkb3duMlRleHQiLCJzZXREcm9wZG93bjJUZXh0IiwiaGFuZGxlU2VsZWN0MSIsImV2ZW50S2V5IiwidGV4dENvbnRlbnQiLCJoYW5kbGVTZWxlY3QyIiwiYnVpbGRDbGllbnRzRnJvbUl0ZW1zIiwiZmlsdGVyZWQiLCJpdCIsImFkZCIsIm91dCIsImlkQXJyYXkiLCJjaHVuayIsInNsaWNlIiwid2hlcmUiLCJoYW5kbGVDbGllbnRDbGljayIsInNhZmVDbGllbnRzIiwiZmV0Y2hDbGllbnRzIiwiY2xpZW50c0RhdGEiLCJkZXJpdmVkIiwic2V0Q2xpZW50U2VhcmNoVGVybSIsImhhbmRsZUNsaWVudFNlbGVjdCIsImNsaWVudElkIiwiY2xpZW50U25hcCIsImV4aXN0cyIsImNsaWVudERhdGEiLCJoYW5kbGVDbGllbnRJbmZvIiwiY2xpZW50TmFtZSIsImhhbmRsZUNsZWFyQ2xpZW50U2VsZWN0aW9uIiwibW9kZWxzIiwic2V0TW9kZWxzIiwic2hvd01vZGVsTW9kYWwiLCJzZXRTaG93TW9kZWxNb2RhbCIsIm1vZGVsQnV0dG9uVGV4dCIsInNldE1vZGVsQnV0dG9uVGV4dCIsImhhbmRsZU1vZGVsQ2xpY2siLCJmZXRjaE1vZGVscyIsIm1vZGVsc0RhdGEiLCJzZXRNb2RlbFNlYXJjaFRlcm0iLCJoYW5kbGVNb2RlbFNlbGVjdCIsIm1vZGVsTmFtZSIsImhhbmRsZUNsZWFyTW9kZWxTZWxlY3Rpb24iLCJoYW5kbGVTb0NhbFdhcmVob3VzZUNsaWNrIiwiaGFuZGxlTm9yQ2FsV2FyZWhvdXNlQ2xpY2siLCJoYW5kbGVXYXJlaG91c2VVbmFzc2lnbmVkQ2xpY2siLCJjbGllbnRTZWFyY2hUZXJtIiwibW9kZWxTZWFyY2hUZXJtIiwic3RvcmFnZVJlZiIsInN0b3JhZ2UiLCJmb2xkZXJSZWYiLCJjaGlsZCIsImxpc3RBbGwiLCJsaXN0UmVzdWx0IiwiZGVsZXRlUHJvbWlzZXMiLCJpdGVtcyIsImFsbCIsImRlbGV0ZUZyb21QYXJ0c0NvbGxlY3Rpb24iLCJ0b3RhbEtub3duUGFnZXMiLCJtYXgiLCJwYWdlQnV0dG9ucyIsImJ1dHRvbnMiLCJtYXhWaXNpYmxlIiwicHVzaFBhZ2UiLCJwIiwicHVzaEVsbGlwc2lzIiwic3RhcnQiLCJlbmQiLCJtaW4iLCJkZXNpcmVkV2luZG93IiwiY3VycmVudFdpbmRvdyIsInJlbWFpbmluZyIsInJlY2FsY1BhZ2VTaXplIiwiY29udGFpbmVySGVpZ2h0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiaGVpZ2h0IiwiaGVhZGVyUm93IiwicXVlcnlTZWxlY3RvciIsImJvZHlSb3ciLCJoIiwidmVydGljYWxQYWRkaW5nIiwiYXZhaWxhYmxlIiwiZXN0aW1hdGVkIiwiZmxvb3IiLCJjbGFtcGVkIiwib25SZXNpemUiLCJhZGRFdmVudExpc3RlbmVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInJlbmRlckZpbHRlcnMiLCJpZFByZWZpeCIsInN0eWxlcyIsImZpbHRlcnNQYW5lbCIsImZpbHRlcnNIZWFkZXIiLCJmaWx0ZXJzVGl0bGUiLCJmaWx0ZXJzU3VidGl0bGUiLCJmaWx0ZXJzQmFkZ2UiLCJmaWx0ZXJTZWN0aW9uIiwiZmlsdGVyU2VjdGlvblRpdGxlIiwiaW5wdXRHcm91cCIsImlucHV0QnV0dG9uIiwiYnV0dG9uR3JvdXAiLCJmbGV4QnV0dG9uIiwibG9hZGluZ092ZXJsYXkiLCJsb2FkaW5nTG9nbyIsImUiLCJjbGllbnQiLCJtb2RlbCIsInBhZ2VJbm5lciIsImhlYWRlciIsImhlYWRlckxlZnQiLCJidXJnZXIiLCJicmFuZCIsImJyYW5kTG9nbyIsImJyYW5kTmFtZSIsImJyYW5kU3ViIiwiaGVhZGVyUmlnaHQiLCJoZWFkZXJTdGF0dXMiLCJjb250ZW50Iiwic2lkZWJhciIsIm1haW4iLCJ0YWJsZUNhcmQiLCJ0YWJsZUhlYWRlciIsInRhYmxlVGl0bGUiLCJ0YWJsZVN1YnRpdGxlIiwidGFibGVNZXRhIiwidGFibGVCb2R5IiwibG9hZGluZ1N0YXRlIiwibG9hZGluZ1RleHQiLCJlcnJvclN0YXRlIiwiZXJyb3JUaXRsZSIsImVycm9yTWVzc2FnZSIsInRhYmxlRm9vdGVyIiwicGFnaW5hdGlvblJvdyIsInNlYXJjaFJvdyIsInNlYXJjaElucHV0Iiwic2VhcmNoU2VsZWN0IiwiZm9vdGVyQWN0aW9ucyIsImFjdGlvbkJ1dHRvbiIsImZpbHRlcnNEcmF3ZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFXQTtBQUNBO0FBQ0E7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtDQUdBOztBQUNBLElBQU1BLGVBQWUsR0FBRyxVQUF4QjtBQUNBLElBQU1DLGdCQUFnQixHQUFHLFVBQXpCO0FBQ0EsSUFBTUMsb0JBQW9CLEdBQUcsVUFBN0I7QUFDQSxJQUFNQyxpQkFBaUIsR0FBRyxFQUExQjtBQUNBLElBQU1DLGdCQUFnQixHQUFHLENBQUMsR0FBRCxFQUFNLEdBQU4sRUFBVyxHQUFYLEVBQWdCLEdBQWhCLEVBQXFCLEdBQXJCLEVBQTBCLEdBQTFCLEVBQStCLEdBQS9CLENBQXpCLEMsQ0FHQTs7QUFDQSxTQUFTQyxzQkFBVCxHQUFrQztBQUNoQyxTQUFPLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFEO0FBQUEsV0FBYUMsVUFBVSxDQUFDRCxPQUFELEVBQVUsSUFBVixDQUF2QjtBQUFBLEdBQVosQ0FBUDtBQUNELEMsQ0FFRDs7O0FBQ0EsU0FBU0UsYUFBVCxPQUF5RDtBQUFBOztBQUFBLE1BQWhDQyxJQUFn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LEVBQUMsNkJBSFI7QUFJRSxhQUFTLEVBQUUvQyxxRUFBTSxDQUFDK0MsWUFKcEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQWJGLENBN0ZGLENBM0RGLENBREYsQ0FGRixDQWhDRixDQURGLEVBc05FLE1BQUMseURBQUQ7QUFDRSxRQUFJLEVBQUUzWCxXQURSO0FBRUUsVUFBTSxFQUFFO0FBQUEsYUFBTUMsY0FBYyxDQUFDLEtBQUQsQ0FBcEI7QUFBQSxLQUZWO0FBR0UsYUFBUyxFQUFDLE9BSFo7QUFJRSxhQUFTLEVBQUUyVSxxRUFBTSxDQUFDZ0QsYUFKcEI7QUFLRSxVQUFNLE1BTFI7QUFNRSxZQUFRLE1BTlY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQVFFLE1BQUMseURBQUQsQ0FBVyxNQUFYO0FBQWtCLGVBQVcsTUFBN0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFLE1BQUMseURBQUQsQ0FBVyxLQUFYO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFERixDQVJGLEVBV0UsTUFBQyx5REFBRCxDQUFXLElBQVg7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUFpQmxELGFBQWEsQ0FBQyxRQUFELENBQTlCLENBWEYsQ0F0TkYsQ0E5RUYsQ0FERjtBQXVURDs7SUE1NEN1QnhWLFU7VUFDRkMsaUUsRUE0QkxnRCxxRDs7O01BN0JPakQsVSIsImZpbGUiOiJzdGF0aWMvd2VicGFjay9wYWdlcy9OZXdTZWFyY2gvbWFpblNlYXJjaC5mYjNkNjUwZDNkNWRlMTk0YTFlZS5ob3QtdXBkYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUsIHVzZVJlZiwgdXNlQ2FsbGJhY2sgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7XG4gIElucHV0R3JvdXAsXG4gIERyb3Bkb3duLFxuICBGb3JtQ29udHJvbCxcbiAgQnV0dG9uLFxuICBOYXZEcm9wZG93bixcbiAgRm9ybSxcbiAgTW9kYWwsXG4gIFBhZ2luYXRpb24sXG4gIE9mZmNhbnZhcyxcbn0gZnJvbSBcInJlYWN0LWJvb3RzdHJhcFwiO1xuaW1wb3J0IExpbmsgZnJvbSBcIm5leHQvbGlua1wiO1xuaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSBcIm5leHQvcm91dGVyXCI7XG5pbXBvcnQge1xuICBmZXRjaFBhcnRzV2l0aE1hY2hpbmVEYXRhUGFnZSxcbiAgZmV0Y2hDbGllbnRzLFxuICBmZXRjaE1vZGVscyxcbn0gZnJvbSBcIi4uLy4uL3V0aWxzL2ZldGNoQXNzb2NpYXRpb25zXCI7XG5pbXBvcnQgeyB1c2VBdXRoIH0gZnJvbSBcIi4uLy4uL2NvbnRleHQvQXV0aFVzZXJDb250ZXh0XCI7XHJcbmltcG9ydCBMb2dnZWRJbiBmcm9tIFwiLi4vTG9nZ2VkSW5cIjtcclxuaW1wb3J0IENsaWVudFRhYmxlIGZyb20gXCIuLi8uLi91dGlscy9DbGllbnRUYWJsZVwiO1xyXG5pbXBvcnQgTW9kZWxUYWJsZSBmcm9tIFwiLi4vLi4vdXRpbHMvTW9kZWxUYWJsZVwiO1xyXG5pbXBvcnQgUGFydFRhYmxlIGZyb20gXCIuLi8uLi91dGlscy9QYXJ0VGFibGVcIjtcbmltcG9ydCBzdHlsZXMgZnJvbSBcIi4uLy4uL3N0eWxlcy9NYWluU2VhcmNoLm1vZHVsZS5jc3NcIjtcbmltcG9ydCBmaXJlYmFzZSBmcm9tIFwiLi4vLi4vY29udGV4dC9GaXJlYmFzZVwiO1xuaW1wb3J0IHsgYnVpbGROYW1lVG9rZW5zIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2l0ZW1Gb3JtU2hhcmVkXCI7XG5cclxuLy8gUHJlZGVmaW5lZCB3YXJlaG91c2UgY2xpZW50IElEcyBhbmQgZGlzcGxheSBuYW1lc1xyXG5jb25zdCBTT0NBTF9DTElFTlRfSUQgPSBcIkFJUzE3MTgyXCI7XHJcbmNvbnN0IE5PUkNBTF9DTElFTlRfSUQgPSBcIkFJUzI1MDk3XCI7XG5jb25zdCBVTkFTU0lHTkVEX0NMSUVOVF9JRCA9IFwiQUlTMDA0MDRcIjtcbmNvbnN0IERFRkFVTFRfUEFHRV9TSVpFID0gMjU7XG5jb25zdCBNQVBfUkVHSU9OX09SREVSID0gW1wiRVwiLCBcIkZcIiwgXCJHXCIsIFwiQVwiLCBcIkRcIiwgXCJDXCIsIFwiQlwiXTtcblxyXG5cclxuLy8gU2ltdWxhdGVzIGEgbmV0d29yayByZXF1ZXN0IGRlbGF5XHJcbmZ1bmN0aW9uIHNpbXVsYXRlTmV0d29ya1JlcXVlc3QoKSB7XHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIDIwMDApKTtcclxufVxyXG5cclxuLy8gQ3VzdG9tIExvYWRpbmdCdXR0b24gY29tcG9uZW50XHJcbmZ1bmN0aW9uIExvYWRpbmdCdXR0b24oeyB0eXBlLCBuYW1lLCByb3V0ZSwgY2xhc3NOYW1lIH0pIHtcbiAgY29uc3QgW2lzTG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoaXNMb2FkaW5nKSB7XG4gICAgICBsZXQgY2FuY2VsbGVkID0gZmFsc2U7XG4gICAgICBzaW11bGF0ZU5ldHdvcmtSZXF1ZXN0KCkudGhlbigoKSA9PiB7XG4gICAgICAgIGlmICghY2FuY2VsbGVkKSBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgY2FuY2VsbGVkID0gdHJ1ZTtcbiAgICAgIH07XG4gICAgfVxuICB9LCBbaXNMb2FkaW5nXSk7XG5cclxuICByZXR1cm4gKFxuICAgIDxMaW5rIGhyZWY9e2AvJHtyb3V0ZX1gfT5cbiAgICAgIDxhXG4gICAgICAgIGNsYXNzTmFtZT17YGJ0biBidG4tJHt0eXBlfSAke2NsYXNzTmFtZSB8fCBcIlwifWB9XG4gICAgICAgIGRpc2FibGVkPXtpc0xvYWRpbmd9XG4gICAgICAgIG9uQ2xpY2s9eygpID0+ICFpc0xvYWRpbmcgJiYgc2V0TG9hZGluZyh0cnVlKX1cbiAgICAgID5cbiAgICAgICAge2lzTG9hZGluZyA/IFwiTG9hZGluZ+KAplwiIDogbmFtZX1cclxuICAgICAgPC9hPlxyXG4gICAgPC9MaW5rPlxyXG4gICk7XHJcbn1cclxuXHJcbi8vIC0tLS0gREFURSBIRUxQRVJTICh0b3AtbGV2ZWwgc2NvcGUpIC0tLS1cclxuXHJcbi8vIENvbnZlcnQgYW55dGhpbmcgZGF0ZS1pc2ggaW50byBhIHRpbWVzdGFtcCAobXMgc2luY2UgZXBvY2gpLlxyXG5mdW5jdGlvbiB0b1RpbWUodmFsdWUpIHtcclxuICBpZiAoIXZhbHVlKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgLy8gRmlyZXN0b3JlIFRpbWVzdGFtcCB7IHNlY29uZHMsIG5hbm9zZWNvbmRzIH1cclxuICBpZiAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmIHZhbHVlICE9PSBudWxsICYmIHZhbHVlLnNlY29uZHMgIT0gbnVsbCkge1xyXG4gICAgdHJ5IHsgcmV0dXJuIHZhbHVlLnNlY29uZHMgKiAxMDAwOyB9IGNhdGNoIHsgLyogaWdub3JlICovIH1cclxuICB9XHJcblxyXG4gIC8vIE5hdGl2ZSBEYXRlXHJcbiAgaWYgKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkge1xyXG4gICAgY29uc3QgdCA9IHZhbHVlLmdldFRpbWUoKTtcclxuICAgIHJldHVybiBpc05hTih0KSA/IG51bGwgOiB0O1xyXG4gIH1cclxuXHJcbiAgLy8gU3RyaW5nc1xyXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpIHtcclxuICAgIC8vIElTTyAvIHl5eXktbW0tZGRcclxuICAgIGNvbnN0IGlzbyA9IERhdGUucGFyc2UodmFsdWUpO1xyXG4gICAgaWYgKCFpc05hTihpc28pKSByZXR1cm4gaXNvO1xyXG5cclxuICAgIC8vIG1tL2RkL3l5eXlcclxuICAgIGNvbnN0IHBhcnRzID0gdmFsdWUuc3BsaXQoXCIvXCIpO1xyXG4gICAgaWYgKHBhcnRzLmxlbmd0aCA9PT0gMykge1xyXG4gICAgICBjb25zdCBbbW0sIGRkLCB5eXl5XSA9IHBhcnRzO1xyXG4gICAgICBjb25zdCBhbHQgPSBEYXRlLnBhcnNlKGAke3l5eXl9LSR7bW19LSR7ZGR9YCk7XHJcbiAgICAgIGlmICghaXNOYU4oYWx0KSkgcmV0dXJuIGFsdDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIExhc3QgcmVzb3J0XHJcbiAgY29uc3QgdCA9IERhdGUucGFyc2UodmFsdWUpO1xyXG4gIHJldHVybiBpc05hTih0KSA/IG51bGwgOiB0O1xyXG59XHJcblxyXG4vLyBDYW5vbmljYWxpemUgdG8gJ3l5eXktbW0tZGQnIChtYXRjaGVzIDxpbnB1dCB0eXBlPVwiZGF0ZVwiPilcclxuZnVuY3Rpb24gdG9ZTUQodmFsdWUpIHtcbiAgY29uc3QgdCA9IHRvVGltZSh2YWx1ZSk7XG4gIGlmICh0ID09IG51bGwpIHJldHVybiBudWxsO1xuICBjb25zdCBkID0gbmV3IERhdGUodCk7XG4gIGNvbnN0IHl5eXkgPSBkLmdldEZ1bGxZZWFyKCk7XG4gIGNvbnN0IG1tID0gU3RyaW5nKGQuZ2V0TW9udGgoKSArIDEpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcbiAgY29uc3QgZGQgPSBTdHJpbmcoZC5nZXREYXRlKCkpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcbiAgcmV0dXJuIGAke3l5eXl9LSR7bW19LSR7ZGR9YDtcbn1cblxuZnVuY3Rpb24gbm9ybWFsaXplVGV4dCh2YWx1ZSkge1xuICBpZiAodmFsdWUgPT0gbnVsbCkgcmV0dXJuIFwiXCI7XG4gIHJldHVybiBTdHJpbmcodmFsdWUpLnRvTG93ZXJDYXNlKCkudHJpbSgpO1xufVxuXG5mdW5jdGlvbiBnZXRNYWNoaW5lRmllbGQoaXRlbSwga2V5KSB7XG4gIGlmICghaXRlbSkgcmV0dXJuIG51bGw7XG4gIGNvbnN0IGxvd2VyID0ga2V5LnRvTG93ZXJDYXNlKCk7XG4gIHJldHVybiAoXG4gICAgaXRlbT8ubWFjaGluZURhdGE/LltrZXldID8/XG4gICAgaXRlbT8ubWFjaGluZURhdGE/Lltsb3dlcl0gPz9cbiAgICBpdGVtPy5jdXJyZW50TWFjaGluZURhdGE/LltrZXldID8/XG4gICAgaXRlbT8uY3VycmVudE1hY2hpbmVEYXRhPy5bbG93ZXJdID8/XG4gICAgaXRlbT8udGhlTWFjaGluZURhdGE/LltrZXldID8/XG4gICAgaXRlbT8udGhlTWFjaGluZURhdGE/Lltsb3dlcl0gPz9cbiAgICBpdGVtPy5UaGVNYWNoaW5lPy5ba2V5XSA/P1xuICAgIGl0ZW0/LlRoZU1hY2hpbmU/Lltsb3dlcl0gPz9cbiAgICBudWxsXG4gICk7XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTWFpblNlYXJjaCgpIHtcbiAgY29uc3QgeyBzaWduT3V0IH0gPSB1c2VBdXRoKCk7XHJcbiAgY29uc3QgW2luZm8sIHNldEluZm9dID0gdXNlU3RhdGUoW10pO1xyXG4gIGNvbnN0IFtiYWNrdXBJbmZvLCBzZXRCYWNrdXBJbmZvXSA9IHVzZVN0YXRlKFtdKTtcclxuICBjb25zdCBbYXVnbWVudGVkSW5mbywgc2V0QXVnbWVudGVkSW5mb10gPSB1c2VTdGF0ZShbXSk7IC8vIGl0ZW1zIHdpdGggY2xpZW50RnJvbUlkL2N1cnJlbnRJZCBhZGRlZFxyXG4gIGNvbnN0IFtpc0xvYWRpbmcsIHNldElzTG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcclxuICBjb25zdCBbaWRzLCBzZXRJRF0gPSB1c2VTdGF0ZShbXSk7XG4gIGNvbnN0IFtzaG93LCBzZXRTaG93XSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3Nob3dGaWx0ZXJzLCBzZXRTaG93RmlsdGVyc10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtwYWdlU2l6ZSwgc2V0UGFnZVNpemVdID0gdXNlU3RhdGUoREVGQVVMVF9QQUdFX1NJWkUpO1xuICBjb25zdCBbaXNOYXZpZ2F0aW5nLCBzZXRJc05hdmlnYXRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbZEl0ZW0sIHNldERJdGVtXSA9IHVzZVN0YXRlKCk7XHJcbiAgY29uc3QgW3NlbGVjdCwgc2V0U2VsZWN0XSA9IHVzZVN0YXRlKFwiTmFtZVwiKTtcclxuICBjb25zdCBbc2hvd0xpc3QsIHNldFNob3dMaXN0XSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbc2hvd0xpc3RTZWFyY2gsIHNldFNob3dMaXN0U2VhcmNoXSA9IHVzZVN0YXRlKFwidGV4dFwiKTtcclxuICBjb25zdCBbc2VhcmNoLCBzZXRTZWFyY2hdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW3NlbGVjdGVkT0VNLCBzZXRTZWxlY3RlZE9FTV0gPSB1c2VTdGF0ZShudWxsKTtcclxuICBjb25zdCBbc2VsZWN0ZWRNb2RhbGl0eSwgc2V0U2VsZWN0ZWRNb2RhbGl0eV0gPSB1c2VTdGF0ZShudWxsKTtcclxuICAvLyBSZXBsYWNlIHRoZSBvbGQgc2luZ2xlIGNsaWVudCBzdGF0ZSB3aXRoIHR3byBzZXRzOlxyXG4gIGNvbnN0IFtzZWxlY3RlZENsaWVudEZyb20sIHNldFNlbGVjdGVkQ2xpZW50RnJvbV0gPSB1c2VTdGF0ZShudWxsKTtcclxuICBjb25zdCBbY2xpZW50RnJvbUJ1dHRvblRleHQsIHNldENsaWVudEZyb21CdXR0b25UZXh0XSA9IHVzZVN0YXRlKFwiU2VsZWN0IE9wdGlvblwiKTtcclxuICBjb25zdCBbc2VsZWN0ZWRDbGllbnRDdXJyZW50LCBzZXRTZWxlY3RlZENsaWVudEN1cnJlbnRdID0gdXNlU3RhdGUobnVsbCk7XHJcbiAgY29uc3QgW2NsaWVudEN1cnJlbnRCdXR0b25UZXh0LCBzZXRDbGllbnRDdXJyZW50QnV0dG9uVGV4dF0gPSB1c2VTdGF0ZShcIlNlbGVjdCBPcHRpb25cIik7XHJcblxyXG4gIGNvbnN0IFtjbGllbnRzLCBzZXRDbGllbnRzXSA9IHVzZVN0YXRlKFtdKTtcclxuICBjb25zdCBbc2hvd0NsaWVudE1vZGFsLCBzZXRTaG93Q2xpZW50TW9kYWxdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIC8vIFRoaXMgc3RhdGUgdGVsbHMgdGhlIG1vZGFsIHdoaWNoIGNsaWVudCBib3ggaXMgYmVpbmcgdXBkYXRlZDogXCJmcm9tXCIgb3IgXCJjdXJyZW50XCJcclxuICBjb25zdCBbY2xpZW50U2VsZWN0aW9uVHlwZSwgc2V0Q2xpZW50U2VsZWN0aW9uVHlwZV0gPSB1c2VTdGF0ZShudWxsKTtcclxuXHJcbiAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XHJcbiAgY29uc3QgbGFiZWxCYXNlID0gW1wibmFtZVwiLCBcImRhdGVcIiwgXCJ3L29cIiwgXCJwL25cIiwgXCJzL25cIl07XHJcbiAgY29uc3QgbGFiZWxCYXNlTmFtZXMgPSBbXCJuYW1lXCIsIFwiZGF0ZVwiLCBcIndvXCIsIFwicG5cIiwgXCJzblwiXTtcclxuICBjb25zdCBzb3J0Q2hlY2tCYXNlID0gW2ZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2VdO1xyXG5cclxuICBmdW5jdGlvbiB3aXRoU29ydEljb24oYmFzZUxhYmVscywgYWN0aXZlSW5kZXgsIGlzRGVzYykge1xyXG4gICAgcmV0dXJuIGJhc2VMYWJlbHMubWFwKCh0ZXh0LCBpKSA9PiB7XHJcbiAgICAgIGlmIChpICE9PSBhY3RpdmVJbmRleCkgcmV0dXJuIHRleHQ7IC8vIHVudG91Y2hlZFxyXG4gICAgICBjb25zdCBhcnJvdyA9IGlzRGVzYyA/IFwiIOKWvFwiIDogXCIg4payXCI7XHJcbiAgICAgIHJldHVybiBgJHt0ZXh0fSR7YXJyb3d9YDtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcblxyXG4gIGNvbnN0IFtsYWJlbHMsIHNldExhYmVsc10gPSB1c2VTdGF0ZShsYWJlbEJhc2UpO1xyXG4gIGNvbnN0IFtzb3J0Q2hlY2ssIHNldFNvcnRDaGVja10gPSB1c2VTdGF0ZShzb3J0Q2hlY2tCYXNlKTtcclxuICBjb25zdCBbaG92ZXJJbmRleCwgc2V0SG92ZXJJbmRleF0gPSB1c2VTdGF0ZShudWxsKTtcclxuICBjb25zdCBbc2VsZWN0ZWRNb2RlbCwgc2V0U2VsZWN0ZWRNb2RlbF0gPSB1c2VTdGF0ZShudWxsKTtcclxuICBjb25zdCBbZ1Bvcywgc2V0R1Bvc10gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW2dJZGUsIHNldEdJZGVdID0gdXNlU3RhdGUobnVsbCk7XG4gIGNvbnN0IFtpc0RlbGV0aW5nLCBzZXRJc0RlbGV0aW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3BhZ2UsIHNldFBhZ2VdID0gdXNlU3RhdGUoMSk7XG4gIGNvbnN0IFtwYWdlQ3Vyc29ycywgc2V0UGFnZUN1cnNvcnNdID0gdXNlU3RhdGUoW10pO1xuICBjb25zdCBbaGFzTmV4dFBhZ2UsIHNldEhhc05leHRQYWdlXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgZmV0Y2hTZXEgPSB1c2VSZWYoMCk7XG4gIGNvbnN0IGJhY2tmaWxsSW5GbGlnaHQgPSB1c2VSZWYoZmFsc2UpO1xuICBjb25zdCBbcXVlcnlFcG9jaCwgc2V0UXVlcnlFcG9jaF0gPSB1c2VTdGF0ZSgwKTtcbiAgY29uc3QgW2xvYWRFcnJvciwgc2V0TG9hZEVycm9yXSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCB0YWJsZUJvZHlSZWYgPSB1c2VSZWYobnVsbCk7XG4gIGNvbnN0IHJvd0hlaWdodFJlZiA9IHVzZVJlZig0Nik7XG4gIGNvbnN0IGhlYWRlckhlaWdodFJlZiA9IHVzZVJlZigzOCk7XG5cbiAgY29uc3QgTE9BRF9USU1FT1VUX01TID0gMzAwMDA7XG5cbiAgY29uc3Qgc3RhcnROYW1lVG9rZW5CYWNrZmlsbCA9IHVzZUNhbGxiYWNrKGFzeW5jIChyZWFzb24gPSBcIlwiKSA9PiB7XG4gICAgaWYgKGJhY2tmaWxsSW5GbGlnaHQuY3VycmVudCkgcmV0dXJuO1xuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICBjb25zdCBsYXN0UnVuID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwibmFtZVRva2Vuc0JhY2tmaWxsQXRcIik7XG4gICAgICBpZiAobGFzdFJ1biAmJiBEYXRlLm5vdygpIC0gTnVtYmVyKGxhc3RSdW4pIDwgMjQgKiA2MCAqIDYwICogMTAwMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgYmFja2ZpbGxJbkZsaWdodC5jdXJyZW50ID0gdHJ1ZTtcbiAgICBjb25zdCBkYiA9IGZpcmViYXNlLmZpcmVzdG9yZSgpO1xuICAgIGxldCBsYXN0RG9jID0gbnVsbDtcblxuICAgIGNvbnN0IHRva2Vuc0VxdWFsID0gKGEsIGIpID0+IHtcbiAgICAgIGlmIChhLmxlbmd0aCAhPT0gYi5sZW5ndGgpIHJldHVybiBmYWxzZTtcbiAgICAgIGNvbnN0IHNldEEgPSBuZXcgU2V0KGEpO1xuICAgICAgY29uc3Qgc2V0QiA9IG5ldyBTZXQoYik7XG4gICAgICBpZiAoc2V0QS5zaXplICE9PSBzZXRCLnNpemUpIHJldHVybiBmYWxzZTtcbiAgICAgIGZvciAoY29uc3QgdiBvZiBzZXRBKSBpZiAoIXNldEIuaGFzKHYpKSByZXR1cm4gZmFsc2U7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgdHJ5IHtcbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIGxldCBxdWVyeSA9IGRiXG4gICAgICAgICAgLmNvbGxlY3Rpb24oXCJUZXN0XCIpXG4gICAgICAgICAgLm9yZGVyQnkoZmlyZWJhc2UuZmlyZXN0b3JlLkZpZWxkUGF0aC5kb2N1bWVudElkKCkpXG4gICAgICAgICAgLmxpbWl0KDIwMCk7XG4gICAgICAgIGlmIChsYXN0RG9jKSBxdWVyeSA9IHF1ZXJ5LnN0YXJ0QWZ0ZXIobGFzdERvYyk7XG5cbiAgICAgICAgY29uc3Qgc25hcCA9IGF3YWl0IHF1ZXJ5LmdldCgpO1xuICAgICAgICBpZiAoc25hcC5lbXB0eSkgYnJlYWs7XG5cbiAgICAgICAgY29uc3QgYmF0Y2ggPSBkYi5iYXRjaCgpO1xuICAgICAgICBsZXQgd3JpdGVzID0gMDtcblxuICAgICAgICBzbmFwLmRvY3MuZm9yRWFjaCgoZG9jKSA9PiB7XG4gICAgICAgICAgY29uc3QgZGF0YSA9IGRvYy5kYXRhKCkgfHwge307XG4gICAgICAgICAgY29uc3QgbmFtZSA9IHR5cGVvZiBkYXRhLm5hbWUgPT09IFwic3RyaW5nXCIgPyBkYXRhLm5hbWUgOiBcIlwiO1xuICAgICAgICAgIGNvbnN0IG5hbWVMb3dlciA9IG5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICBjb25zdCBuYW1lVG9rZW5zID0gYnVpbGROYW1lVG9rZW5zKG5hbWUpO1xuICAgICAgICAgIGNvbnN0IGV4aXN0aW5nVG9rZW5zID0gQXJyYXkuaXNBcnJheShkYXRhLm5hbWVUb2tlbnMpXG4gICAgICAgICAgICA/IEFycmF5LmZyb20obmV3IFNldChkYXRhLm5hbWVUb2tlbnMubWFwKCh2KSA9PiBTdHJpbmcodikpKSlcbiAgICAgICAgICAgIDogW107XG5cbiAgICAgICAgICBjb25zdCBuZWVkc1VwZGF0ZSA9XG4gICAgICAgICAgICBkYXRhLm5hbWVMb3dlciAhPT0gbmFtZUxvd2VyIHx8XG4gICAgICAgICAgICAhdG9rZW5zRXF1YWwoZXhpc3RpbmdUb2tlbnMsIG5hbWVUb2tlbnMpO1xuXG4gICAgICAgICAgaWYgKG5lZWRzVXBkYXRlKSB7XG4gICAgICAgICAgICBiYXRjaC51cGRhdGUoZG9jLnJlZiwgeyBuYW1lTG93ZXIsIG5hbWVUb2tlbnMgfSk7XG4gICAgICAgICAgICB3cml0ZXMgKz0gMTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh3cml0ZXMgPiAwKSB7XG4gICAgICAgICAgYXdhaXQgYmF0Y2guY29tbWl0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBsYXN0RG9jID0gc25hcC5kb2NzW3NuYXAuZG9jcy5sZW5ndGggLSAxXTtcbiAgICAgICAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgMjUpKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKFxuICAgICAgICAgIFwibmFtZVRva2Vuc0JhY2tmaWxsQXRcIixcbiAgICAgICAgICBTdHJpbmcoRGF0ZS5ub3coKSlcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihcIk5hbWUgdG9rZW4gYmFja2ZpbGwgZmFpbGVkOlwiLCByZWFzb24sIGVycm9yKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgYmFja2ZpbGxJbkZsaWdodC5jdXJyZW50ID0gZmFsc2U7XG4gICAgfVxuICB9LCBbXSk7XG5cbiAgY29uc3Qgc2VhcmNoTG93ZXIgPSAoc2VhcmNoIHx8IFwiXCIpLnRvTG93ZXJDYXNlKCkudHJpbSgpO1xuICBjb25zdCBoYXNBY3RpdmVGaWx0ZXJzID1cbiAgICBCb29sZWFuKHNlbGVjdGVkT0VNKSB8fFxuICAgIEJvb2xlYW4oc2VsZWN0ZWRNb2RhbGl0eSkgfHxcbiAgICBCb29sZWFuKHNlbGVjdGVkTW9kZWwpIHx8XG4gICAgQm9vbGVhbihzZWxlY3RlZENsaWVudEZyb20pIHx8XG4gICAgQm9vbGVhbihzZWxlY3RlZENsaWVudEN1cnJlbnQpIHx8XG4gICAgQm9vbGVhbihzZWFyY2hMb3dlcik7XG5cbiAgY29uc3QgdmFsdWVNYXRjaGVzID0gKHZhbHVlLCBzKSA9PiB7XG4gICAgaWYgKCF2YWx1ZSkgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHZhbHVlLnNvbWUoKHYpID0+IHZhbHVlTWF0Y2hlcyh2LCBzKSk7XG4gICAgfVxuICAgIHJldHVybiBTdHJpbmcodmFsdWUpLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMocyk7XG4gIH07XG5cbiAgY29uc3QgbWF0Y2hlc0ZpbHRlcnMgPSB1c2VDYWxsYmFjayhcbiAgICAoaXRlbSkgPT4ge1xuICAgICAgLy8gaGlkZSBleHBsaWNpdGx5IGhpZGRlbiBpdGVtc1xuICAgICAgaWYgKGl0ZW0/LnZpc2libGUgPT09IGZhbHNlKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgIC8vIE9FTSAvIE1vZGFsaXR5IC8gTW9kZWwgZmlsdGVyaW5nXG4gICAgICBjb25zdCBPRU0gPSBnZXRNYWNoaW5lRmllbGQoaXRlbSwgXCJPRU1cIik7XG4gICAgICBjb25zdCBNb2RhbGl0eSA9IGdldE1hY2hpbmVGaWVsZChpdGVtLCBcIk1vZGFsaXR5XCIpO1xuICAgICAgY29uc3QgTW9kZWwgPSBnZXRNYWNoaW5lRmllbGQoaXRlbSwgXCJNb2RlbFwiKTtcblxuICAgICAgaWYgKHNlbGVjdGVkT0VNICYmIG5vcm1hbGl6ZVRleHQoT0VNKSAhPT0gbm9ybWFsaXplVGV4dChzZWxlY3RlZE9FTSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKFxuICAgICAgICBzZWxlY3RlZE1vZGFsaXR5ICYmXG4gICAgICAgIG5vcm1hbGl6ZVRleHQoTW9kYWxpdHkpICE9PSBub3JtYWxpemVUZXh0KHNlbGVjdGVkTW9kYWxpdHkpXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKHNlbGVjdGVkTW9kZWwgJiYgbm9ybWFsaXplVGV4dChNb2RlbCkgIT09IG5vcm1hbGl6ZVRleHQoc2VsZWN0ZWRNb2RlbCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICAvLyBDbGllbnQgZmlsdGVyc1xuICAgICAgaWYgKHNlbGVjdGVkQ2xpZW50RnJvbSAmJiBpdGVtPy5jbGllbnRGcm9tSWQgIT09IHNlbGVjdGVkQ2xpZW50RnJvbSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoXG4gICAgICAgIHNlbGVjdGVkQ2xpZW50Q3VycmVudCAmJlxuICAgICAgICBpdGVtPy5jbGllbnRDdXJyZW50SWQgIT09IHNlbGVjdGVkQ2xpZW50Q3VycmVudFxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgLy8gU2VhcmNoXG4gICAgICBpZiAoc2VhcmNoTG93ZXIpIHtcbiAgICAgICAgaWYgKHNlbGVjdCA9PT0gXCJOYW1lXCIpIHtcbiAgICAgICAgICByZXR1cm4gdmFsdWVNYXRjaGVzKGl0ZW0/Lm5hbWUsIHNlYXJjaExvd2VyKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2VsZWN0ID09PSBcIkRhdGVcIikge1xuICAgICAgICAgIGNvbnN0IHdhbnRlZERheSA9IHNlYXJjaExvd2VyOyAvLyB5eXl5LW1tLWRkIGZyb20gaW5wdXRcbiAgICAgICAgICBjb25zdCBpdGVtWU1EID0gdG9ZTUQoaXRlbT8uZGF0ZSk7XG4gICAgICAgICAgaWYgKGl0ZW1ZTUQgJiYgaXRlbVlNRCA9PT0gd2FudGVkRGF5KSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShpdGVtPy5kZXNjcmlwdGlvbnMpKSB7XG4gICAgICAgICAgICBpZiAoaXRlbS5kZXNjcmlwdGlvbnMuc29tZSgoZCkgPT4gdG9ZTUQoZD8uZGF0ZSkgPT09IHdhbnRlZERheSkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGl0ZW0/LndvcmtPcmRlcnMpKSB7XG4gICAgICAgICAgICBpZiAoaXRlbS53b3JrT3JkZXJzLnNvbWUoKHcpID0+IHRvWU1EKHc/LmRhdGUpID09PSB3YW50ZWREYXkpKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNlbGVjdCA9PT0gXCJXb3JrIE9yZGVyXCIpIHtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgQXJyYXkuaXNBcnJheShpdGVtPy53b3JrT3JkZXJzKSAmJlxuICAgICAgICAgICAgaXRlbS53b3JrT3JkZXJzLnNvbWUoKHdvKSA9PlxuICAgICAgICAgICAgICB2YWx1ZU1hdGNoZXMod28/LndvcmtPcmRlciwgc2VhcmNoTG93ZXIpXG4gICAgICAgICAgICApXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2VsZWN0ID09PSBcIlByb2R1Y3QgTnVtYmVyXCIpIHtcbiAgICAgICAgICByZXR1cm4gdmFsdWVNYXRjaGVzKGl0ZW0/LnBuLCBzZWFyY2hMb3dlcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNlbGVjdCA9PT0gXCJTZXJpYWwgTnVtYmVyXCIpIHtcbiAgICAgICAgICByZXR1cm4gdmFsdWVNYXRjaGVzKGl0ZW0/LnNuLCBzZWFyY2hMb3dlcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNlbGVjdCA9PT0gXCJEZXNjcmlwdGlvblwiKSB7XG4gICAgICAgICAgaWYgKHZhbHVlTWF0Y2hlcyhpdGVtPy5kZXNjLCBzZWFyY2hMb3dlcikpIHJldHVybiB0cnVlO1xuICAgICAgICAgIGlmICh2YWx1ZU1hdGNoZXMoaXRlbT8uZGVzY3JpcHRpb24sIHNlYXJjaExvd2VyKSkgcmV0dXJuIHRydWU7XG4gICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoaXRlbT8uZGVzY3JpcHRpb25zKSkge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW0uZGVzY3JpcHRpb25zLnNvbWUoKGQpID0+XG4gICAgICAgICAgICAgIHZhbHVlTWF0Y2hlcyhkPy5kZXNjcmlwdGlvbiwgc2VhcmNoTG93ZXIpXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNlbGVjdCA9PT0gXCJTS1VcIikge1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICB2YWx1ZU1hdGNoZXMoaXRlbT8uaWQsIHNlYXJjaExvd2VyKSB8fFxuICAgICAgICAgICAgdmFsdWVNYXRjaGVzKGl0ZW0/LmxvY2FsU04sIHNlYXJjaExvd2VyKSB8fFxuICAgICAgICAgICAgdmFsdWVNYXRjaGVzKGl0ZW0/LmxvY2FsX3NuLCBzZWFyY2hMb3dlcilcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG4gICAgW1xuICAgICAgc2VsZWN0ZWRPRU0sXG4gICAgICBzZWxlY3RlZE1vZGFsaXR5LFxuICAgICAgc2VsZWN0ZWRNb2RlbCxcbiAgICAgIHNlbGVjdGVkQ2xpZW50RnJvbSxcbiAgICAgIHNlbGVjdGVkQ2xpZW50Q3VycmVudCxcbiAgICAgIHNlYXJjaExvd2VyLFxuICAgICAgc2VsZWN0LFxuICAgIF1cbiAgKTtcblxuICBjb25zdCByZXNldFBhZ2luYXRpb24gPSAoKSA9PiB7XG4gICAgc2V0UGFnZSgxKTtcbiAgICBzZXRQYWdlQ3Vyc29ycyhbXSk7XG4gICAgc2V0SGFzTmV4dFBhZ2UoZmFsc2UpO1xuICB9O1xuXG4gIC8vIFJlc2V0IHBhZ2luYXRpb24gb24gcm91dGUvcXVlcnkgY2hhbmdlIChwcmV2ZW50cyBzdGFsZSBwYWdlcyBsaWtlIOKAnHN0YXJ0aW5nIGF0IDbigJ0pXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgcmVzZXRQYWdpbmF0aW9uKCk7XG4gICAgc2V0UXVlcnlFcG9jaCgodikgPT4gdiArIDEpO1xuICB9LCBbcm91dGVyLmFzUGF0aF0pO1xuXG4gIC8vIFJlc2V0IGFuZCByZWZldGNoIHdoZW4gZmlsdGVycy9zZWFyY2ggY2hhbmdlXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgcmVzZXRQYWdpbmF0aW9uKCk7XG4gICAgc2V0UXVlcnlFcG9jaCgodikgPT4gdiArIDEpO1xuICB9LCBbXG4gICAgc2VsZWN0ZWRPRU0sXG4gICAgc2VsZWN0ZWRNb2RhbGl0eSxcbiAgICBzZWxlY3RlZE1vZGVsLFxuICAgIHNlbGVjdGVkQ2xpZW50RnJvbSxcbiAgICBzZWxlY3RlZENsaWVudEN1cnJlbnQsXG4gICAgc2VhcmNoLFxuICAgIHNlbGVjdCxcbiAgXSk7XG5cblxuICAvLyBGZXRjaCBkYXRhIG9uIGNvbXBvbmVudCBtb3VudCBhbmQgcm91dGUgY2hhbmdlXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgZmV0Y2hEYXRhKHBhZ2UpO1xuICB9LCBbcGFnZSwgcXVlcnlFcG9jaF0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFyb3V0ZXI/LmV2ZW50cykgcmV0dXJuO1xuICAgIGNvbnN0IGhhbmRsZURvbmUgPSAoKSA9PiBzZXRJc05hdmlnYXRpbmcoZmFsc2UpO1xuICAgIHJvdXRlci5ldmVudHMub24oXCJyb3V0ZUNoYW5nZUNvbXBsZXRlXCIsIGhhbmRsZURvbmUpO1xuICAgIHJvdXRlci5ldmVudHMub24oXCJyb3V0ZUNoYW5nZUVycm9yXCIsIGhhbmRsZURvbmUpO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICByb3V0ZXIuZXZlbnRzLm9mZihcInJvdXRlQ2hhbmdlQ29tcGxldGVcIiwgaGFuZGxlRG9uZSk7XG4gICAgICByb3V0ZXIuZXZlbnRzLm9mZihcInJvdXRlQ2hhbmdlRXJyb3JcIiwgaGFuZGxlRG9uZSk7XG4gICAgfTtcbiAgfSwgW3JvdXRlcl0pO1xuXG4gIGFzeW5jIGZ1bmN0aW9uIGZldGNoRGF0YShyZXF1ZXN0ZWRQYWdlID0gMSkge1xuICAgIGNvbnN0IHNlcSA9ICsrZmV0Y2hTZXEuY3VycmVudDtcbiAgICBsZXQgdGltZWRPdXQgPSBmYWxzZTtcbiAgICBzZXRJc0xvYWRpbmcodHJ1ZSk7XG4gICAgc2V0TG9hZEVycm9yKG51bGwpO1xuICAgIGNvbnN0IHRpbWVvdXRJZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGltZWRPdXQgPSB0cnVlO1xuICAgICAgaWYgKHNlcSA9PT0gZmV0Y2hTZXEuY3VycmVudCkge1xuICAgICAgICBzZXRMb2FkRXJyb3Ioe1xuICAgICAgICAgIGNvZGU6IFwidGltZW91dFwiLFxuICAgICAgICAgIG1lc3NhZ2U6IGBMb2FkaW5nIGlzIHRha2luZyBsb25nZXIgdGhhbiAke01hdGgucm91bmQoXG4gICAgICAgICAgICBMT0FEX1RJTUVPVVRfTVMgLyAxMDAwXG4gICAgICAgICAgKX1zLiBUaGlzIGlzIGxpa2VseSBkdWUgdG8gdmVyeSBzZWxlY3RpdmUgZmlsdGVycy5gLFxuICAgICAgICB9KTtcbiAgICAgICAgc2V0SXNMb2FkaW5nKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9LCBMT0FEX1RJTUVPVVRfTVMpO1xuICAgIHRyeSB7XG4gICAgICBpZiAocm91dGVyLnF1ZXJ5LmlucHV0VGV4dCAmJiByb3V0ZXIucXVlcnkuc2VsZWN0ZWRUeXBlKSB7XG4gICAgICAgIHNldFNlbGVjdChyb3V0ZXIucXVlcnkuc2VsZWN0ZWRUeXBlKTtcbiAgICAgICAgc2V0U2VhcmNoKHJvdXRlci5xdWVyeS5pbnB1dFRleHQpO1xuICAgICAgfVxuICAgICAgY29uc3Qgc3RhcnRBZnRlckRvYyA9XG4gICAgICAgIHJlcXVlc3RlZFBhZ2UgPiAxID8gcGFnZUN1cnNvcnNbcmVxdWVzdGVkUGFnZSAtIDJdIDogbnVsbDtcbiAgICAgIGlmIChyZXF1ZXN0ZWRQYWdlID4gMSAmJiAhc3RhcnRBZnRlckRvYykge1xuICAgICAgICBzZXRQYWdlKDEpO1xuICAgICAgICBpZiAoc2VxID09PSBmZXRjaFNlcS5jdXJyZW50KSB7XG4gICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXRJZCk7XG4gICAgICAgICAgc2V0SXNMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBlZmZlY3RpdmVTZWxlY3QgPSByb3V0ZXIucXVlcnkuc2VsZWN0ZWRUeXBlIHx8IHNlbGVjdDtcbiAgICAgIGNvbnN0IGVmZmVjdGl2ZVNlYXJjaCA9IHJvdXRlci5xdWVyeS5pbnB1dFRleHQgfHwgc2VhcmNoO1xuICAgICAgY29uc3QgZWZmZWN0aXZlU2VhcmNoTG93ZXIgPSAoZWZmZWN0aXZlU2VhcmNoIHx8IFwiXCIpXG4gICAgICAgIC50b0xvd2VyQ2FzZSgpXG4gICAgICAgIC50cmltKCk7XG5cbiAgICAgIC8vIGxpZ2h0IHJldHJ5IGZvciB0cmFuc2llbnQgRmlyZXN0b3JlIGhpY2N1cHNcbiAgICAgIGNvbnN0IGxvYWQgPSBhc3luYyAoYXR0ZW1wdCA9IDEpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXR1cm4gYXdhaXQgZmV0Y2hQYXJ0c1dpdGhNYWNoaW5lRGF0YVBhZ2Uoe1xuICAgICAgICAgICAgcGFnZVNpemUsXG4gICAgICAgICAgICBzdGFydEFmdGVyRG9jLFxuICAgICAgICAgICAgdmlzaWJsZU9ubHk6IHRydWUsXG4gICAgICAgICAgICBmaWx0ZXJGbjogaGFzQWN0aXZlRmlsdGVycyA/IG1hdGNoZXNGaWx0ZXJzIDogbnVsbCxcbiAgICAgICAgICAgIHNlYXJjaDogZWZmZWN0aXZlU2VhcmNoTG93ZXJcbiAgICAgICAgICAgICAgPyB7XG4gICAgICAgICAgICAgICAgICB0eXBlOiBlZmZlY3RpdmVTZWxlY3QsXG4gICAgICAgICAgICAgICAgICByYXc6IGVmZmVjdGl2ZVNlYXJjaCxcbiAgICAgICAgICAgICAgICAgIGxvd2VyOiBlZmZlY3RpdmVTZWFyY2hMb3dlcixcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIDogbnVsbCxcbiAgICAgICAgICAgIG5lZWRzTWFjaGluZURhdGE6XG4gICAgICAgICAgICAgIEJvb2xlYW4oc2VsZWN0ZWRPRU0pIHx8XG4gICAgICAgICAgICAgIEJvb2xlYW4oc2VsZWN0ZWRNb2RhbGl0eSkgfHxcbiAgICAgICAgICAgICAgQm9vbGVhbihzZWxlY3RlZE1vZGVsKSB8fFxuICAgICAgICAgICAgICBCb29sZWFuKHNlbGVjdGVkQ2xpZW50RnJvbSkgfHxcbiAgICAgICAgICAgICAgQm9vbGVhbihzZWxlY3RlZENsaWVudEN1cnJlbnQpLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgaWYgKGF0dGVtcHQgPj0gMykgdGhyb3cgZTtcbiAgICAgICAgICBhd2FpdCBuZXcgUHJvbWlzZShyID0+IHNldFRpbWVvdXQociwgMjUwICogTWF0aC5wb3coMiwgYXR0ZW1wdCAtIDEpKSk7XG4gICAgICAgICAgcmV0dXJuIGxvYWQoYXR0ZW1wdCArIDEpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgY29uc3QgeyBwYXJ0czogZGF0YSwgbGFzdERvYywgaGFzTmV4dFBhZ2U6IG5leHRQYWdlIH0gPSBhd2FpdCBsb2FkKCk7XG4gICAgICBpZiAodGltZWRPdXQgfHwgc2VxICE9PSBmZXRjaFNlcS5jdXJyZW50KSByZXR1cm47XG4gICAgICBjb25zdCBoYXNOYW1lU2VhcmNoID1cbiAgICAgICAgQm9vbGVhbihlZmZlY3RpdmVTZWFyY2hMb3dlcikgJiYgZWZmZWN0aXZlU2VsZWN0ID09PSBcIk5hbWVcIjtcbiAgICAgIGlmIChcbiAgICAgICAgaGFzTmFtZVNlYXJjaCAmJlxuICAgICAgICAoZGF0YS5sZW5ndGggPT09IDAgfHxcbiAgICAgICAgICBkYXRhLnNvbWUoXG4gICAgICAgICAgICAoaXRlbSkgPT5cbiAgICAgICAgICAgICAgIUFycmF5LmlzQXJyYXkoaXRlbT8ubmFtZVRva2VucykgfHwgaXRlbS5uYW1lVG9rZW5zLmxlbmd0aCA9PT0gMFxuICAgICAgICAgICkpXG4gICAgICApIHtcbiAgICAgICAgc3RhcnROYW1lVG9rZW5CYWNrZmlsbChcIm5hbWUtc2VhcmNoXCIpO1xuICAgICAgfVxuICAgICAgaWYgKHJlcXVlc3RlZFBhZ2UgPT09IDEgJiYgZGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgc2V0UGFnZUN1cnNvcnMoW10pO1xuICAgICAgICBzZXRIYXNOZXh0UGFnZShmYWxzZSk7XG4gICAgICB9XG4gICAgICBzZXRCYWNrdXBJbmZvKGRhdGEpO1xuICAgICAgc2V0TGFiZWxzKGxhYmVsQmFzZSk7IC8vIDwtLSBhZGQgdGhpcyBsaW5lIGFmdGVyIHNldEJhY2t1cEluZm8oZGF0YSlcbiAgICAgIHNldElEKGRhdGEubWFwKChpdGVtKSA9PiBpdGVtLmlkKSk7XG4gICAgICBpZiAocmVxdWVzdGVkUGFnZSA+IDEgJiYgZGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgc2V0SGFzTmV4dFBhZ2UoZmFsc2UpO1xuICAgICAgICBzZXRQYWdlKDEpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBzZXRIYXNOZXh0UGFnZShuZXh0UGFnZSk7XG4gICAgICBzZXRQYWdlQ3Vyc29ycygocHJldikgPT4ge1xuICAgICAgICBjb25zdCBuZXh0ID0gcmVxdWVzdGVkUGFnZSA9PT0gMSA/IFtdIDogWy4uLnByZXZdO1xuICAgICAgICBpZiAobGFzdERvYykge1xuICAgICAgICAgIG5leHRbcmVxdWVzdGVkUGFnZSAtIDFdID0gbGFzdERvYztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgIH0pO1xuICAgICAgc2V0U2VsZWN0ZWRJdGVtcyhbXSk7XG5cbiAgICAgIC8vIE5vcm1hbGl6ZSBjbGllbnQgaWRzIGZvciBmaWx0ZXJpbmdcbiAgICAgIGNvbnN0IGF1Z21lbnRlZCA9IGRhdGEubWFwKChpdGVtKSA9PiAoe1xuICAgICAgICAuLi5pdGVtLFxuICAgICAgICBjbGllbnRGcm9tSWQ6XG4gICAgICAgICAgaXRlbT8uY2xpZW50RnJvbUlkID8/XG4gICAgICAgICAgKHR5cGVvZiBpdGVtPy5DbGllbnRGcm9tID09PSBcInN0cmluZ1wiID8gaXRlbS5DbGllbnRGcm9tIDogbnVsbCkgPz9cbiAgICAgICAgICBpdGVtPy5DbGllbnRGcm9tPy5pZCA/P1xuICAgICAgICAgIG51bGwsXG4gICAgICAgIGNsaWVudEN1cnJlbnRJZDpcbiAgICAgICAgICBpdGVtPy5jbGllbnRDdXJyZW50SWQgPz9cbiAgICAgICAgICAodHlwZW9mIGl0ZW0/LkNsaWVudEN1cnJlbnQgPT09IFwic3RyaW5nXCIgPyBpdGVtLkNsaWVudEN1cnJlbnQgOiBudWxsKSA/P1xuICAgICAgICAgIGl0ZW0/LkNsaWVudEN1cnJlbnQ/LmlkID8/XG4gICAgICAgICAgbnVsbCxcbiAgICAgIH0pKTtcblxyXG4gICAgICBzZXRBdWdtZW50ZWRJbmZvKGF1Z21lbnRlZCk7XG4gICAgICAvLyBkZWZhdWx0IHZpZXcgPSBmaWx0ZXJlZCAoa2VlcHMgcGFnaW5hdGlvbiBhbmQgZmlsdGVycyBjb25zaXN0ZW50KVxuICAgICAgc2V0SW5mbyhhdWdtZW50ZWQuZmlsdGVyKG1hdGNoZXNGaWx0ZXJzKSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBpZiAoc2VxICE9PSBmZXRjaFNlcS5jdXJyZW50KSByZXR1cm47XG4gICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZmV0Y2hpbmcgZGF0YTpcIiwgZXJyKTtcbiAgICAgIGNvbnN0IGNvZGUgPSBlcnI/LmNvZGUgfHwgXCJ1bmtub3duXCI7XG4gICAgICBzZXRMb2FkRXJyb3Ioe1xuICAgICAgICBjb2RlLFxuICAgICAgICBtZXNzYWdlOiBlcnI/Lm1lc3NhZ2UgfHwgXCJGYWlsZWQgdG8gbG9hZCBpdGVtcy5cIixcbiAgICAgIH0pO1xuICAgICAgc2V0SW5mbyhbXSk7XG4gICAgICBzZXRBdWdtZW50ZWRJbmZvKFtdKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXRJZCk7XG4gICAgICBpZiAoc2VxID09PSBmZXRjaFNlcS5jdXJyZW50ICYmICF0aW1lZE91dCkgc2V0SXNMb2FkaW5nKGZhbHNlKTtcbiAgICB9XG4gIH1cblxyXG4gIGNvbnN0IHNlYXJjaENoYW5nZUhhbmRsZXIgPSAoZXZlbnQpID0+IHNldFNlYXJjaChldmVudC50YXJnZXQudmFsdWUpO1xyXG5cclxuICAvLyBGaWx0ZXIgdGhlIGN1cnJlbnRseSBsb2FkZWQgaXRlbXMgKG5vdyBjb25zaXN0ZW50IHdpdGggcGFnZWQgZmlsdGVyaW5nKVxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGJhc2UgPSBhdWdtZW50ZWRJbmZvIHx8IFtdO1xuICAgIHNldEluZm8oYmFzZS5maWx0ZXIobWF0Y2hlc0ZpbHRlcnMpKTtcbiAgfSwgW2F1Z21lbnRlZEluZm8sIG1hdGNoZXNGaWx0ZXJzXSk7XG5cclxuICBmdW5jdGlvbiBzb3J0Q2hlY2tBbGwocG9zKSB7XHJcbiAgICAvLyBEZXRlcm1pbmUgbmV4dCBkaXJlY3Rpb246IHRvZ2dsZSB0aGUgY2xpY2tlZCBjb2x1bW4gb25seVxyXG4gICAgY29uc3QgbmV4dFNvcnRDaGVjayA9IHNvcnRDaGVjay5tYXAoKHYsIGkpID0+IChpID09PSBwb3MgPyAhdiA6IHYpKTtcclxuICAgIGNvbnN0IGlzRGVzYyA9IG5leHRTb3J0Q2hlY2tbcG9zXTsgLy8gdHJ1ZSBtZWFucyBkZXNjZW5kaW5nXHJcblxyXG4gICAgY29uc3Qgc29ydGVkSW5mbyA9IFsuLi5pbmZvXS5zb3J0KChhLCBiKSA9PiB7XHJcbiAgICAgIGNvbnN0IGtleSA9IGxhYmVsQmFzZU5hbWVzW3Bvc107XHJcblxyXG4gICAgICBpZiAocG9zID09PSAxKSB7XHJcbiAgICAgICAgLy8gREFURSBjb2x1bW5cclxuICAgICAgICBjb25zdCB0YSA9IHRvVGltZShhW2tleV0pO1xyXG4gICAgICAgIGNvbnN0IHRiID0gdG9UaW1lKGJba2V5XSk7XHJcblxyXG4gICAgICAgIC8vIFB1dCBtaXNzaW5nIGRhdGVzIGF0IHRoZSBlbmQgZm9yIGFzY2VuZGluZywgYXQgdGhlIHN0YXJ0IGZvciBkZXNjZW5kaW5nXHJcbiAgICAgICAgaWYgKHRhID09PSBudWxsICYmIHRiID09PSBudWxsKSByZXR1cm4gMDtcclxuICAgICAgICBpZiAodGEgPT09IG51bGwpIHJldHVybiBpc0Rlc2MgPyAtMSA6IDE7XHJcbiAgICAgICAgaWYgKHRiID09PSBudWxsKSByZXR1cm4gaXNEZXNjID8gMSA6IC0xO1xyXG5cclxuICAgICAgICByZXR1cm4gaXNEZXNjID8gKHRiIC0gdGEpIDogKHRhIC0gdGIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBOQU1FIG9yIFNLVSAoc3RyaW5nLXkgY29sdW1ucyk6IGluZGV4ZXMgMCBvciA1IGluIHlvdXIgb3JpZ2luYWwgbG9naWNcclxuICAgICAgaWYgKHBvcyA9PT0gMCB8fCBwb3MgPT09IDUpIHtcclxuICAgICAgICBjb25zdCBhdiA9IChhW2tleV0gPz8gXCJcIikudG9TdHJpbmcoKTtcclxuICAgICAgICBjb25zdCBidiA9IChiW2tleV0gPz8gXCJcIikudG9TdHJpbmcoKTtcclxuICAgICAgICByZXR1cm4gaXNEZXNjID8gYnYubG9jYWxlQ29tcGFyZShhdikgOiBhdi5sb2NhbGVDb21wYXJlKGJ2KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gTnVtZXJpYy1pc2ggY29sdW1ucyAod28sIHBuLCBzbikg4oCUIGZhbGwgYmFjayB0byBzdHJpbmcgY29tcGFyZSBpZiBOYU5cclxuICAgICAgY29uc3QgYW4gPSBOdW1iZXIoYVtrZXldKTtcclxuICAgICAgY29uc3QgYm4gPSBOdW1iZXIoYltrZXldKTtcclxuXHJcbiAgICAgIGlmICghaXNOYU4oYW4pICYmICFpc05hTihibikpIHtcclxuICAgICAgICByZXR1cm4gaXNEZXNjID8gKGJuIC0gYW4pIDogKGFuIC0gYm4pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IGF2ID0gKGFba2V5XSA/PyBcIlwiKS50b1N0cmluZygpO1xyXG4gICAgICAgIGNvbnN0IGJ2ID0gKGJba2V5XSA/PyBcIlwiKS50b1N0cmluZygpO1xyXG4gICAgICAgIHJldHVybiBpc0Rlc2MgPyBidi5sb2NhbGVDb21wYXJlKGF2KSA6IGF2LmxvY2FsZUNvbXBhcmUoYnYpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBzZXRJbmZvKHNvcnRlZEluZm8pO1xyXG4gICAgc2V0U29ydENoZWNrKG5leHRTb3J0Q2hlY2spO1xyXG5cclxuICAgIC8vIFVwZGF0ZSBoZWFkZXIgbGFiZWxzIHRvIHNob3cgdGhlIGxpdHRsZSBhcnJvdyBvbiB0aGUgYWN0aXZlIGNvbHVtblxyXG4gICAgc2V0TGFiZWxzKHdpdGhTb3J0SWNvbihsYWJlbEJhc2UsIHBvcywgaXNEZXNjKSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgY29uc3Qgcm93U2VsZWN0ID0gKGl0ZW0pID0+IHtcclxuICAgIGlmIChpdGVtICYmIGl0ZW0uaWQpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJTZWxlY3RlZCBpdGVtOlwiLCBpdGVtKTtcbiAgICAgIHNldElzTmF2aWdhdGluZyh0cnVlKTtcbiAgICAgIHJvdXRlci5wdXNoKFwiLi9pdGVtL1wiICsgaXRlbS5pZCk7XG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5lcnJvcihcIlVuYWJsZSB0byBkZXRlcm1pbmUgdGhlIHNlbGVjdGVkIGl0ZW3igJlzIElEOiBcIiwgaXRlbSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgW3NlbGVjdGVkSXRlbXMsIHNldFNlbGVjdGVkSXRlbXNdID0gdXNlU3RhdGUoW10pO1xyXG4gIGNvbnN0IFtzaG93RGVsZXRlTW9kYWwsIHNldFNob3dEZWxldGVNb2RhbF0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZVNlbGVjdEl0ZW0gPSAoaWQpID0+IHtcclxuICAgIHNldFNlbGVjdGVkSXRlbXMocHJldiA9PlxyXG4gICAgICBwcmV2LmluY2x1ZGVzKGlkKSA/IHByZXYuZmlsdGVyKHggPT4geCAhPT0gaWQpIDogWy4uLnByZXYsIGlkXVxyXG4gICAgKTtcclxuICB9O1xyXG5cclxuXHJcbiAgLy8gc2V0U2VsZWN0ZWRJdGVtcygocHJldikgPT4ge1xyXG4gIC8vICAgY29uc3QgbmV3U2VsZWN0aW9uID0gcHJldi5pbmNsdWRlcyhpZClcclxuICAvLyAgICAgPyBwcmV2LmZpbHRlcigoaXRlbUlkKSA9PiBpdGVtSWQgIT09IGlkKVxyXG4gIC8vICAgICA6IFsuLi5wcmV2LCBpZF07XHJcbiAgLy8gICBjb25zb2xlLmxvZyhcIlNlbGVjdGVkIGl0ZW1zOlwiLCBuZXdTZWxlY3Rpb24pO1xyXG4gIC8vICAgcmV0dXJuIG5ld1NlbGVjdGlvbjsgLy8gPC0gaW1wb3J0YW50XHJcbiAgLy8gfSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZVNob3dEZWxldGVNb2RhbCA9ICgpID0+IHNldFNob3dEZWxldGVNb2RhbCh0cnVlKTtcclxuICBjb25zdCBoYW5kbGVDbG9zZURlbGV0ZU1vZGFsID0gKCkgPT4gc2V0U2hvd0RlbGV0ZU1vZGFsKGZhbHNlKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlRGVsZXRlU2VsZWN0ZWQgPSBhc3luYyAoKSA9PiB7XHJcbiAgICBzZXRJc0RlbGV0aW5nKHRydWUpO1xyXG4gICAgY29uc3QgZGIgPSBmaXJlYmFzZS5maXJlc3RvcmUoKTtcclxuICAgIHRyeSB7XHJcbiAgICAgIC8vIExvb3Agb3ZlciBlYWNoIHNlbGVjdGVkIGl0ZW0gb25lIGF0IGEgdGltZVxyXG4gICAgICBmb3IgKGNvbnN0IGl0ZW1JZCBvZiBzZWxlY3RlZEl0ZW1zKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coaXRlbUlkKVxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAvLyBEZWxldGUgZnJvbSBcIlRlc3RcIiBjb2xsZWN0aW9uXHJcbiAgICAgICAgICBhd2FpdCBkYi5jb2xsZWN0aW9uKFwiVGVzdFwiKS5kb2MoaXRlbUlkKS5kZWxldGUoKTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEVycm9yIGRlbGV0aW5nIGRvY3VtZW50ICR7aXRlbUlkfSBmcm9tIFRlc3Q6YCwgZXJyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIC8vIERlbGV0ZSBmcm9tIFwiUGFydHNcIiBjb2xsZWN0aW9uXHJcbiAgICAgICAgICBhd2FpdCBkYi5jb2xsZWN0aW9uKFwiUGFydHNcIikuZG9jKGl0ZW1JZCkuZGVsZXRlKCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGBFcnJvciBkZWxldGluZyBkb2N1bWVudCAke2l0ZW1JZH0gZnJvbSBQYXJ0czpgLCBlcnIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgLy8gRGVsZXRlIGFzc29jaWF0ZWQgcGhvdG9zIGZyb20gc3RvcmFnZVxyXG4gICAgICAgICAgYXdhaXQgZGVsZXRlRnJvbVN0b3JhZ2UoaXRlbUlkKTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEVycm9yIGRlbGV0aW5nIHN0b3JhZ2UgZm9yICR7aXRlbUlkfTpgLCBlcnIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICAvLyBVcGRhdGUgbG9jYWwgc3RhdGUgYnkgZmlsdGVyaW5nIG91dCB0aGUgZGVsZXRlZCBpdGVtc1xyXG4gICAgICBzZXRJbmZvKGluZm8uZmlsdGVyKChpdGVtKSA9PiAhc2VsZWN0ZWRJdGVtcy5pbmNsdWRlcyhpdGVtLmlkKSkpO1xyXG4gICAgICBzZXRTZWxlY3RlZEl0ZW1zKFtdKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBkZWxldGluZyBpdGVtczpcIiwgZXJyb3IpO1xyXG4gICAgfSBmaW5hbGx5IHtcclxuICAgICAgc2V0SXNEZWxldGluZyhmYWxzZSk7XHJcbiAgICAgIGhhbmRsZUNsb3NlRGVsZXRlTW9kYWwoKTtcclxuICAgICAgLy8gT3B0aW9uYWxseSwgcmVsb2FkIHRoZSBwYWdlXHJcbiAgICAgIC8vIHJvdXRlci5yZWxvYWQoKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuXHJcbiAgY29uc3QgaGFuZGxlQ2xvc2UgPSAoKSA9PiBzZXRTaG93KGZhbHNlKTtcclxuICBjb25zdCBoYW5kbGVTaG93ID0gKCkgPT4gc2V0U2hvdyh0cnVlKTtcclxuXHJcbiAgY29uc3QgY2hlY2tEZWxldGUgPSAoZXZlbnQsIHBvcywgaWRzVG9EZWxldGUsIG5hbWUpID0+IHtcclxuICAgIGlmIChldmVudCkge1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH1cclxuICAgIGNvbnNvbGUubG9nKFwiU2VsZWN0ZWQgSURzIHRvIGRlbGV0ZTpcIiwgaWRzVG9EZWxldGUpO1xyXG4gICAgc2V0U2VsZWN0ZWRJdGVtcyhpZHNUb0RlbGV0ZSk7XHJcbiAgICBzZXRESXRlbShuYW1lKTtcclxuICAgIHNldFNob3dEZWxldGVNb2RhbCh0cnVlKTtcclxuICB9O1xyXG5cclxuICAvLyBjb25zdCBoYW5kbGVEZWxldGUgPSBhc3luYyAoKSA9PiB7XHJcbiAgLy8gICBsZXQgaXRlbUlkID0gZ0lkZTtcclxuICAvLyAgIHRyeSB7XHJcbiAgLy8gICAgIHNldElzRGVsZXRpbmcodHJ1ZSk7XHJcbiAgLy8gICAgIGNvbnN0IGRiID0gZmlyZWJhc2UuZmlyZXN0b3JlKCk7XHJcbiAgLy8gICAgIGF3YWl0IGRiLmNvbGxlY3Rpb24oXCJUZXN0XCIpLmRvYyhpdGVtSWQpLmRlbGV0ZSgpO1xyXG4gIC8vICAgICBhd2FpdCBkZWxldGVGcm9tUGFydHNDb2xsZWN0aW9uKGl0ZW1JZCk7XHJcbiAgLy8gICAgIGF3YWl0IGRlbGV0ZUZyb21TdG9yYWdlKGl0ZW1JZCk7XHJcbiAgLy8gICAgIHNldEluZm8oaW5mby5maWx0ZXIoKF8sIGkpID0+IGdQb3MgIT09IGkpKTtcclxuICAvLyAgICAgY29uc29sZS5sb2coYERlbGV0ZWQgaXRlbTogJHtpdGVtSWR9YCk7XHJcbiAgLy8gICB9IGNhdGNoIChlcnJvcikge1xyXG4gIC8vICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZGVsZXRpbmcgaXRlbTpcIiwgZXJyb3IpO1xyXG4gIC8vICAgfSBmaW5hbGx5IHtcclxuICAvLyAgICAgc2V0SXNEZWxldGluZyhmYWxzZSk7XHJcbiAgLy8gICB9XHJcbiAgLy8gICBoYW5kbGVDbG9zZSgpO1xyXG4gIC8vIH07XHJcblxyXG4gIGNvbnN0IGhvdmVyU3R5bGUgPSAoaW5kZXgpID0+ICh7XHJcbiAgICBiYWNrZ3JvdW5kQ29sb3I6IGhvdmVySW5kZXggPT09IGluZGV4ID8gXCIjZGRkXCIgOiBcInRyYW5zcGFyZW50XCIsXHJcbiAgICB0ZXh0QWxpZ246IFwiY2VudGVyXCIsXHJcbiAgICBjdXJzb3I6IFwiZGVmYXVsdFwiLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBbZHJvcGRvd24xVGV4dCwgc2V0RHJvcGRvd24xVGV4dF0gPSB1c2VTdGF0ZShcIlNlbGVjdCBPcHRpb25cIik7XHJcbiAgY29uc3QgW2Ryb3Bkb3duMlRleHQsIHNldERyb3Bkb3duMlRleHRdID0gdXNlU3RhdGUoXCJTZWxlY3QgT3B0aW9uXCIpO1xyXG5cclxuICBjb25zdCBoYW5kbGVTZWxlY3QxID0gKGV2ZW50S2V5LCBldmVudCkgPT4ge1xyXG4gICAgaWYgKGV2ZW50S2V5ID09PSBcInVuYXNzaWduZWRcIikge1xyXG4gICAgICBzZXREcm9wZG93bjFUZXh0KFwiU2VsZWN0IE9wdGlvblwiKTtcclxuICAgICAgc2V0U2VsZWN0ZWRPRU0obnVsbCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzZXREcm9wZG93bjFUZXh0KGV2ZW50LnRhcmdldC50ZXh0Q29udGVudCk7XHJcbiAgICAgIHNldFNlbGVjdGVkT0VNKGV2ZW50LnRhcmdldC50ZXh0Q29udGVudCk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaGFuZGxlU2VsZWN0MiA9IChldmVudEtleSwgZXZlbnQpID0+IHtcclxuICAgIGlmIChldmVudEtleSA9PT0gXCJ1bmFzc2lnbmVkXCIpIHtcclxuICAgICAgc2V0RHJvcGRvd24yVGV4dChcIlNlbGVjdCBPcHRpb25cIik7XHJcbiAgICAgIHNldFNlbGVjdGVkTW9kYWxpdHkobnVsbCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzZXREcm9wZG93bjJUZXh0KGV2ZW50LnRhcmdldC50ZXh0Q29udGVudCk7XHJcbiAgICAgIHNldFNlbGVjdGVkTW9kYWxpdHkoZXZlbnQudGFyZ2V0LnRleHRDb250ZW50KTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICAvLyBCdWlsZCBhIHVuaXF1ZSBsaXN0IG9mIGNsaWVudHMgZnJvbSB0aGUgaXRlbXMgY3VycmVudGx5IGxvYWRlZCwgZmlsdGVyZWQgYnkgT0VNL01vZGFsaXR5LlxyXG4gIC8vIGB0eXBlYCBpcyBcImZyb21cIiBvciBcImN1cnJlbnRcIiB0byBkZWNpZGUgd2hpY2ggY2xpZW50IHJlZiB0byByZWFkLlxyXG4gIGFzeW5jIGZ1bmN0aW9uIGJ1aWxkQ2xpZW50c0Zyb21JdGVtcyh0eXBlKSB7XG4gICAgY29uc3QgZGIgPSBmaXJlYmFzZS5maXJlc3RvcmUoKTtcbiAgICBjb25zdCBpZHMgPSBuZXcgU2V0KCk7XG5cbiAgICAvLyBSZXNwZWN0IGN1cnJlbnQgT0VNIC8gTW9kYWxpdHkgZmlsdGVycyB3aGVuIGRlcml2aW5nIGNsaWVudCBvcHRpb25zXG4gICAgY29uc3QgZmlsdGVyZWQgPSBhdWdtZW50ZWRJbmZvLmZpbHRlcigoaXRlbSkgPT4ge1xuICAgICAgY29uc3QgT0VNID0gZ2V0TWFjaGluZUZpZWxkKGl0ZW0sIFwiT0VNXCIpO1xuICAgICAgY29uc3QgTW9kYWxpdHkgPSBnZXRNYWNoaW5lRmllbGQoaXRlbSwgXCJNb2RhbGl0eVwiKTtcbiAgICAgIGlmIChzZWxlY3RlZE9FTSAmJiBub3JtYWxpemVUZXh0KE9FTSkgIT09IG5vcm1hbGl6ZVRleHQoc2VsZWN0ZWRPRU0pKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmIChcbiAgICAgICAgc2VsZWN0ZWRNb2RhbGl0eSAmJlxuICAgICAgICBub3JtYWxpemVUZXh0KE1vZGFsaXR5KSAhPT0gbm9ybWFsaXplVGV4dChzZWxlY3RlZE1vZGFsaXR5KVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0pO1xuXHJcbiAgICBmb3IgKGNvbnN0IGl0IG9mIGZpbHRlcmVkKSB7XHJcbiAgICAgIGNvbnN0IGlkID0gdHlwZSA9PT0gXCJmcm9tXCIgPyBpdC5jbGllbnRGcm9tSWQgOiBpdC5jbGllbnRDdXJyZW50SWQ7XHJcbiAgICAgIGlmIChpZCkgaWRzLmFkZChpZCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgb3V0ID0gW107XHJcbiAgICBjb25zdCBpZEFycmF5ID0gWy4uLmlkc107XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGlkQXJyYXkubGVuZ3RoOyBpICs9IDEwKSB7XHJcbiAgICAgIGNvbnN0IGNodW5rID0gaWRBcnJheS5zbGljZShpLCBpICsgMTApO1xyXG4gICAgICBjb25zdCBzbmFwID0gYXdhaXQgZGJcclxuICAgICAgICAuY29sbGVjdGlvbihcIkNsaWVudFwiKVxyXG4gICAgICAgIC53aGVyZShmaXJlYmFzZS5maXJlc3RvcmUuRmllbGRQYXRoLmRvY3VtZW50SWQoKSwgXCJpblwiLCBjaHVuaylcclxuICAgICAgICAuZ2V0KCk7XHJcbiAgICAgIHNuYXAuZm9yRWFjaCgoZG9jKSA9PiB7XHJcbiAgICAgICAgY29uc3QgZCA9IGRvYy5kYXRhKCkgfHwge307XHJcbiAgICAgICAgb3V0LnB1c2goeyBpZDogZG9jLmlkLCBuYW1lOiBkLm5hbWUgfHwgZG9jLmlkIH0pO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBzb3J0IGJ5IG5hbWUgZm9yIG5pY2VyIFVYXHJcbiAgICBvdXQuc29ydCgoYSwgYikgPT4gKGEubmFtZSB8fCBcIlwiKS5sb2NhbGVDb21wYXJlKGIubmFtZSB8fCBcIlwiKSk7XHJcbiAgICByZXR1cm4gb3V0O1xyXG4gIH1cclxuXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQ0xJRU5UIFNFTEVDVElPTiBIQU5ETElOR1xyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gVGhpcyBmdW5jdGlvbiBmZXRjaGVzIGNsaWVudHMgYW5kIG9wZW5zIHRoZSBjbGllbnQgbW9kYWwuXHJcbiAgY29uc3QgaGFuZGxlQ2xpZW50Q2xpY2sgPSBhc3luYyAoKSA9PiB7XHJcbiAgICBsZXQgc2FmZUNsaWVudHMgPSBbXTtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IGNsaWVudHNEYXRhID0gYXdhaXQgZmV0Y2hDbGllbnRzKHNlbGVjdGVkT0VNLCBzZWxlY3RlZE1vZGFsaXR5KTtcclxuICAgICAgc2FmZUNsaWVudHMgPSBBcnJheS5pc0FycmF5KGNsaWVudHNEYXRhKSA/IGNsaWVudHNEYXRhIDogW107XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJmZXRjaENsaWVudHMgZmFpbGVkOlwiLCBlKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBGYWxsYmFjayB0byBidWlsZGluZyBmcm9tIGxvYWRlZCBpdGVtcyBpZiBBUEkgZ2F2ZSB1cyBub3RoaW5nXHJcbiAgICBpZiAoc2FmZUNsaWVudHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgaWYgKCFjbGllbnRTZWxlY3Rpb25UeXBlKSB7XHJcbiAgICAgICAgICAvLyBpZiBzb21laG93IG5vdCBzZXQgeWV0LCBkZWZhdWx0IHRvIFwiZnJvbVwiXHJcbiAgICAgICAgICBzZXRDbGllbnRTZWxlY3Rpb25UeXBlKFwiZnJvbVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgZGVyaXZlZCA9IGF3YWl0IGJ1aWxkQ2xpZW50c0Zyb21JdGVtcyhjbGllbnRTZWxlY3Rpb25UeXBlIHx8IFwiZnJvbVwiKTtcclxuICAgICAgICBzYWZlQ2xpZW50cyA9IGRlcml2ZWQ7XHJcbiAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFsbGJhY2sgYnVpbGRDbGllbnRzRnJvbUl0ZW1zIGZhaWxlZDpcIiwgZSk7XHJcbiAgICAgICAgc2FmZUNsaWVudHMgPSBbXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNldENsaWVudHMoc2FmZUNsaWVudHMpO1xyXG4gICAgc2V0Q2xpZW50U2VhcmNoVGVybShcIlwiKTtcclxuICAgIHNldFNob3dDbGllbnRNb2RhbCh0cnVlKTtcclxuICB9O1xyXG5cclxuXHJcblxyXG4gIC8vIFdoZW4gYSBjbGllbnQgaXMgc2VsZWN0ZWQgaW4gdGhlIG1vZGFsLCB3ZSBub3cgYXNzdW1lIHRoZSBwYXJhbWV0ZXIgaXMgYSBjbGllbnQgSUQuXHJcbiAgLy8gSWYgdGhlIHBhc3NlZCB2YWx1ZSBpcyBudWxsLCB3ZSBjbGVhciB0aGUgc2VsZWN0aW9uLlxyXG4gIGNvbnN0IGhhbmRsZUNsaWVudFNlbGVjdCA9IGFzeW5jIChjbGllbnRJZCkgPT4ge1xyXG4gICAgY29uc29sZS5sb2coXCJVc2VyIHNlbGVjdGVkIGNsaWVudCBpZDpcIiwgY2xpZW50SWQpO1xyXG4gICAgaWYgKCFjbGllbnRJZCkge1xyXG4gICAgICBpZiAoY2xpZW50U2VsZWN0aW9uVHlwZSA9PT0gXCJmcm9tXCIpIHtcclxuICAgICAgICBzZXRDbGllbnRGcm9tQnV0dG9uVGV4dChcIlNlbGVjdCBPcHRpb25cIik7XHJcbiAgICAgICAgc2V0U2VsZWN0ZWRDbGllbnRGcm9tKG51bGwpO1xyXG4gICAgICB9IGVsc2UgaWYgKGNsaWVudFNlbGVjdGlvblR5cGUgPT09IFwiY3VycmVudFwiKSB7XHJcbiAgICAgICAgc2V0Q2xpZW50Q3VycmVudEJ1dHRvblRleHQoXCJTZWxlY3QgT3B0aW9uXCIpO1xyXG4gICAgICAgIHNldFNlbGVjdGVkQ2xpZW50Q3VycmVudChudWxsKTtcclxuICAgICAgfVxyXG4gICAgICBzZXRTaG93Q2xpZW50TW9kYWwoZmFsc2UpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBjbGllbnRTbmFwID0gYXdhaXQgZmlyZWJhc2UuZmlyZXN0b3JlKCkuY29sbGVjdGlvbihcIkNsaWVudFwiKS5kb2MoY2xpZW50SWQpLmdldCgpO1xyXG4gICAgICBpZiAoY2xpZW50U25hcC5leGlzdHMpIHtcclxuICAgICAgICBjb25zdCBjbGllbnREYXRhID0gY2xpZW50U25hcC5kYXRhKCk7XHJcbiAgICAgICAgaWYgKGNsaWVudFNlbGVjdGlvblR5cGUgPT09IFwiZnJvbVwiKSB7XHJcbiAgICAgICAgICBzZXRDbGllbnRGcm9tQnV0dG9uVGV4dChjbGllbnREYXRhLm5hbWUpO1xyXG4gICAgICAgICAgc2V0U2VsZWN0ZWRDbGllbnRGcm9tKGNsaWVudElkKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGNsaWVudFNlbGVjdGlvblR5cGUgPT09IFwiY3VycmVudFwiKSB7XHJcbiAgICAgICAgICBzZXRDbGllbnRDdXJyZW50QnV0dG9uVGV4dChjbGllbnREYXRhLm5hbWUpO1xyXG4gICAgICAgICAgc2V0U2VsZWN0ZWRDbGllbnRDdXJyZW50KGNsaWVudElkKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIk5vIGNsaWVudCBkb2N1bWVudCBmb3VuZCBmb3IgaWQ6XCIsIGNsaWVudElkKTtcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGZldGNoaW5nIGNsaWVudCBkYXRhOlwiLCBlcnJvcik7XHJcbiAgICB9XHJcbiAgICBzZXRTaG93Q2xpZW50TW9kYWwoZmFsc2UpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGhhbmRsZUNsaWVudEluZm8gPSAoY2xpZW50SWQsIGNsaWVudE5hbWUpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKGBDbGllbnQgSUQ6ICR7Y2xpZW50SWR9LCBDbGllbnQgTmFtZTogJHtjbGllbnROYW1lfWApO1xyXG4gICAgcm91dGVyLnB1c2goXCJjbGllbnQvXCIgKyBjbGllbnRJZCk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQ2xlYXJDbGllbnRTZWxlY3Rpb24gPSAoKSA9PiB7XHJcbiAgICBpZiAoY2xpZW50U2VsZWN0aW9uVHlwZSA9PT0gXCJmcm9tXCIpIHtcclxuICAgICAgc2V0Q2xpZW50RnJvbUJ1dHRvblRleHQoXCJTZWxlY3QgT3B0aW9uXCIpO1xyXG4gICAgICBzZXRTZWxlY3RlZENsaWVudEZyb20obnVsbCk7XHJcbiAgICB9IGVsc2UgaWYgKGNsaWVudFNlbGVjdGlvblR5cGUgPT09IFwiY3VycmVudFwiKSB7XHJcbiAgICAgIHNldENsaWVudEN1cnJlbnRCdXR0b25UZXh0KFwiU2VsZWN0IE9wdGlvblwiKTtcclxuICAgICAgc2V0U2VsZWN0ZWRDbGllbnRDdXJyZW50KG51bGwpO1xyXG4gICAgfVxyXG4gICAgc2V0U2hvd0NsaWVudE1vZGFsKGZhbHNlKTtcclxuICB9O1xyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIE1PREVMIFNFTEVDVElPTiBIQU5ETElOR1xyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgY29uc3QgW21vZGVscywgc2V0TW9kZWxzXSA9IHVzZVN0YXRlKFtdKTtcclxuICBjb25zdCBbc2hvd01vZGVsTW9kYWwsIHNldFNob3dNb2RlbE1vZGFsXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbbW9kZWxCdXR0b25UZXh0LCBzZXRNb2RlbEJ1dHRvblRleHRdID0gdXNlU3RhdGUoXCJTZWxlY3QgT3B0aW9uXCIpO1xyXG5cclxuICBjb25zdCBoYW5kbGVNb2RlbENsaWNrID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgY29uc3QgbW9kZWxzRGF0YSA9IGF3YWl0IGZldGNoTW9kZWxzKFxyXG4gICAgICBzZWxlY3RlZE9FTSxcclxuICAgICAgc2VsZWN0ZWRNb2RhbGl0eSxcclxuICAgICAgc2VsZWN0ZWRDbGllbnRGcm9tXHJcbiAgICApO1xyXG4gICAgc2V0TW9kZWxzKG1vZGVsc0RhdGEpO1xyXG4gICAgc2V0TW9kZWxTZWFyY2hUZXJtKFwiXCIpO1xyXG4gICAgc2V0U2hvd01vZGVsTW9kYWwodHJ1ZSk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaGFuZGxlTW9kZWxTZWxlY3QgPSAobW9kZWxOYW1lKSA9PiB7XHJcbiAgICBzZXRNb2RlbEJ1dHRvblRleHQobW9kZWxOYW1lIHx8IFwiU2VsZWN0IE9wdGlvblwiKTtcclxuICAgIHNldFNlbGVjdGVkTW9kZWwobW9kZWxOYW1lIHx8IG51bGwpO1xyXG4gICAgc2V0U2hvd01vZGVsTW9kYWwoZmFsc2UpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGhhbmRsZUNsZWFyTW9kZWxTZWxlY3Rpb24gPSAoKSA9PiB7XHJcbiAgICBzZXRNb2RlbEJ1dHRvblRleHQoXCJTZWxlY3QgT3B0aW9uXCIpO1xyXG4gICAgc2V0U2VsZWN0ZWRNb2RlbChudWxsKTtcclxuICAgIHNldFNob3dNb2RlbE1vZGFsKGZhbHNlKTtcclxuICB9O1xyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIFdBUkVIT1VTRSBCVVRUT05TIChmb3IgQ2xpZW50IEN1cnJlbnQpXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICBjb25zdCBoYW5kbGVTb0NhbFdhcmVob3VzZUNsaWNrID0gKCkgPT4ge1xyXG4gICAgc2V0Q2xpZW50Q3VycmVudEJ1dHRvblRleHQoXCJTb0NhbCBXYXJlaG91c2VcIik7XHJcbiAgICBzZXRTZWxlY3RlZENsaWVudEN1cnJlbnQoU09DQUxfQ0xJRU5UX0lEKTtcclxuICAgIGNvbnNvbGUubG9nKFwiV2FyZWhvdXNlIGJ1dHRvbiBjbGlja2VkOiBzZXR0aW5nIENsaWVudCBDdXJyZW50IHRvXCIsIFNPQ0FMX0NMSUVOVF9JRCk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaGFuZGxlTm9yQ2FsV2FyZWhvdXNlQ2xpY2sgPSAoKSA9PiB7XHJcbiAgICBzZXRDbGllbnRDdXJyZW50QnV0dG9uVGV4dChcIk5vckNhbCBXYXJlaG91c2VcIik7XHJcbiAgICBzZXRTZWxlY3RlZENsaWVudEN1cnJlbnQoTk9SQ0FMX0NMSUVOVF9JRCk7XHJcbiAgICBjb25zb2xlLmxvZyhcIldhcmVob3VzZSBidXR0b24gY2xpY2tlZDogc2V0dGluZyBDbGllbnQgQ3VycmVudCB0b1wiLCBOT1JDQUxfQ0xJRU5UX0lEKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBoYW5kbGVXYXJlaG91c2VVbmFzc2lnbmVkQ2xpY2sgPSAoKSA9PiB7XHJcbiAgICBzZXRDbGllbnRDdXJyZW50QnV0dG9uVGV4dChcIlVuYXNzaWduZWRcIik7XHJcbiAgICBzZXRTZWxlY3RlZENsaWVudEN1cnJlbnQoVU5BU1NJR05FRF9DTElFTlRfSUQpO1xyXG4gICAgY29uc29sZS5sb2coXCJXYXJlaG91c2UgYnV0dG9uIGNsaWNrZWQ6IHNldHRpbmcgQ2xpZW50IEN1cnJlbnQgdG9cIiwgVU5BU1NJR05FRF9DTElFTlRfSUQpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IFtjbGllbnRTZWFyY2hUZXJtLCBzZXRDbGllbnRTZWFyY2hUZXJtXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFttb2RlbFNlYXJjaFRlcm0sIHNldE1vZGVsU2VhcmNoVGVybV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuXHJcbiAgY29uc3QgZGVsZXRlRnJvbVN0b3JhZ2UgPSBhc3luYyAoaXRlbUlkKSA9PiB7XHJcbiAgICBjb25zdCBzdG9yYWdlUmVmID0gZmlyZWJhc2Uuc3RvcmFnZSgpLnJlZigpO1xyXG4gICAgY29uc3QgZm9sZGVyUmVmID0gc3RvcmFnZVJlZi5jaGlsZChgUGFydHMvJHtpdGVtSWR9L2ApO1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgbGlzdFJlc3VsdCA9IGF3YWl0IGZvbGRlclJlZi5saXN0QWxsKCk7XHJcbiAgICAgIGNvbnN0IGRlbGV0ZVByb21pc2VzID0gbGlzdFJlc3VsdC5pdGVtcy5tYXAoKGl0ZW0pID0+IGl0ZW0uZGVsZXRlKCkpO1xyXG4gICAgICBhd2FpdCBQcm9taXNlLmFsbChkZWxldGVQcm9taXNlcyk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZGVsZXRpbmcgZnJvbSBzdG9yYWdlOlwiLCBlcnJvcik7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgZGVsZXRlRnJvbVBhcnRzQ29sbGVjdGlvbiA9IGFzeW5jIChpdGVtSWQpID0+IHtcclxuICAgIGNvbnN0IGRiID0gZmlyZWJhc2UuZmlyZXN0b3JlKCk7XHJcbiAgICB0cnkge1xyXG4gICAgICBhd2FpdCBkYi5jb2xsZWN0aW9uKFwiUGFydHNcIikuZG9jKGl0ZW1JZCkuZGVsZXRlKCk7XHJcbiAgICAgIGNvbnNvbGUubG9nKGBEZWxldGVkIGl0ZW0gZnJvbSBQYXJ0cyBjb2xsZWN0aW9uOiAke2l0ZW1JZH1gKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBkZWxldGluZyBmcm9tIFBhcnRzIGNvbGxlY3Rpb246XCIsIGVycm9yKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICAvLyAgIC8vIFNhZmVseSBjb252ZXJ0IGFueSBkYXRlLWlzaCB2YWx1ZSBpbnRvIGEgY29tcGFyYWJsZSB0aW1lc3RhbXAgKG1zIHNpbmNlIGVwb2NoKS5cclxuICAvLyBmdW5jdGlvbiB0b1RpbWUodmFsdWUpIHtcclxuICAvLyAgIGlmICghdmFsdWUpIHJldHVybiBudWxsO1xyXG5cclxuICAvLyAgIC8vIEZpcmVzdG9yZSBUaW1lc3RhbXA6IHsgc2Vjb25kcywgbmFub3NlY29uZHMgfVxyXG4gIC8vICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJiB2YWx1ZS5zZWNvbmRzKSB7XHJcbiAgLy8gICAgIHRyeSB7XHJcbiAgLy8gICAgICAgcmV0dXJuIHZhbHVlLnNlY29uZHMgKiAxMDAwO1xyXG4gIC8vICAgICB9IGNhdGNoIHsgLyogZmFsbHRocm91Z2ggKi8gfVxyXG4gIC8vICAgfVxyXG5cclxuICAvLyAgIC8vIElmIGFscmVhZHkgYSBEYXRlXHJcbiAgLy8gICBpZiAodmFsdWUgaW5zdGFuY2VvZiBEYXRlKSByZXR1cm4gaXNOYU4odmFsdWUuZ2V0VGltZSgpKSA/IG51bGwgOiB2YWx1ZS5nZXRUaW1lKCk7XHJcblxyXG4gIC8vICAgLy8gSWYgc3RyaW5nOiB0cnkgSVNPIGZpcnN0XHJcbiAgLy8gICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB7XHJcbiAgLy8gICAgIC8vIHl5eXktbW0tZGQgKGZyb20geW91ciBmb3JtIGlucHV0cylcclxuICAvLyAgICAgY29uc3QgaXNvID0gRGF0ZS5wYXJzZSh2YWx1ZSk7XHJcbiAgLy8gICAgIGlmICghaXNOYU4oaXNvKSkgcmV0dXJuIGlzbztcclxuXHJcbiAgLy8gICAgIC8vIG1tL2RkL3l5eXkgZmFsbGJhY2sgKG9sZGVyIGl0ZW1zKVxyXG4gIC8vICAgICBjb25zdCBwYXJ0cyA9IHZhbHVlLnNwbGl0KFwiL1wiKTtcclxuICAvLyAgICAgaWYgKHBhcnRzLmxlbmd0aCA9PT0gMykge1xyXG4gIC8vICAgICAgIGNvbnN0IFttbSwgZGQsIHl5eXldID0gcGFydHM7XHJcbiAgLy8gICAgICAgY29uc3QgYWx0ID0gRGF0ZS5wYXJzZShgJHt5eXl5fS0ke21tfS0ke2RkfWApO1xyXG4gIC8vICAgICAgIGlmICghaXNOYU4oYWx0KSkgcmV0dXJuIGFsdDtcclxuICAvLyAgICAgfVxyXG4gIC8vICAgfVxyXG5cclxuICAvLyAgIC8vIENhbm9uaWNhbGl6ZSBhbnkgZGF0ZS1pc2ggdmFsdWUgdG8gJ3l5eXktbW0tZGQnIHNvIGl0IG1hdGNoZXMgPGlucHV0IHR5cGU9XCJkYXRlXCI+IHZhbHVlc1xyXG4gIC8vICAgZnVuY3Rpb24gdG9ZTUQodmFsdWUpIHtcclxuICAvLyAgICAgY29uc3QgdCA9IHRvVGltZSh2YWx1ZSk7XHJcbiAgLy8gICAgIGlmICh0ID09IG51bGwpIHJldHVybiBudWxsO1xyXG4gIC8vICAgICBjb25zdCBkID0gbmV3IERhdGUodCk7XHJcbiAgLy8gICAgIGNvbnN0IHl5eXkgPSBkLmdldEZ1bGxZZWFyKCk7XHJcbiAgLy8gICAgIGNvbnN0IG1tID0gU3RyaW5nKGQuZ2V0TW9udGgoKSArIDEpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcclxuICAvLyAgICAgY29uc3QgZGQgPSBTdHJpbmcoZC5nZXREYXRlKCkpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcclxuICAvLyAgICAgcmV0dXJuIGAke3l5eXl9LSR7bW19LSR7ZGR9YDtcclxuICAvLyAgIH1cclxuXHJcblxyXG4gIC8vICAgLy8gTGFzdCByZXNvcnRcbiAgLy8gICBjb25zdCB0ID0gRGF0ZS5wYXJzZSh2YWx1ZSk7XG4gIC8vICAgcmV0dXJuIGlzTmFOKHQpID8gbnVsbCA6IHQ7XG4gIC8vIH1cblxuICBjb25zdCB0b3RhbEtub3duUGFnZXMgPSBNYXRoLm1heChcbiAgICAxLFxuICAgIHBhZ2VDdXJzb3JzLmZpbHRlcihCb29sZWFuKS5sZW5ndGggKyAoaGFzTmV4dFBhZ2UgPyAxIDogMClcbiAgKTtcbiAgY29uc3QgcGFnZUJ1dHRvbnMgPSAoKCkgPT4ge1xuICAgIGNvbnN0IGJ1dHRvbnMgPSBbXTtcbiAgICBjb25zdCBtYXhWaXNpYmxlID0gNztcblxuICAgIGNvbnN0IHB1c2hQYWdlID0gKHApID0+XG4gICAgICBidXR0b25zLnB1c2goXG4gICAgICAgIDxQYWdpbmF0aW9uLkl0ZW1cbiAgICAgICAgICBrZXk9e2BwYWdlLSR7cH1gfVxuICAgICAgICAgIGFjdGl2ZT17cCA9PT0gcGFnZX1cbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRQYWdlKHApfVxuICAgICAgICA+XG4gICAgICAgICAge3B9XG4gICAgICAgIDwvUGFnaW5hdGlvbi5JdGVtPlxuICAgICAgKTtcblxuICAgIGNvbnN0IHB1c2hFbGxpcHNpcyA9IChrZXkpID0+XG4gICAgICBidXR0b25zLnB1c2goPFBhZ2luYXRpb24uRWxsaXBzaXMga2V5PXtrZXl9IGRpc2FibGVkIC8+KTtcblxuICAgIGlmICh0b3RhbEtub3duUGFnZXMgPD0gbWF4VmlzaWJsZSkge1xuICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gdG90YWxLbm93blBhZ2VzOyBpICs9IDEpIHB1c2hQYWdlKGkpO1xuICAgICAgcmV0dXJuIGJ1dHRvbnM7XG4gICAgfVxuXG4gICAgbGV0IHN0YXJ0ID0gTWF0aC5tYXgoMiwgcGFnZSAtIDEpO1xuICAgIGxldCBlbmQgPSBNYXRoLm1pbih0b3RhbEtub3duUGFnZXMgLSAxLCBwYWdlICsgMSk7XG5cbiAgICBjb25zdCBkZXNpcmVkV2luZG93ID0gbWF4VmlzaWJsZSAtIDI7XG4gICAgbGV0IGN1cnJlbnRXaW5kb3cgPSBlbmQgLSBzdGFydCArIDE7XG4gICAgbGV0IHJlbWFpbmluZyA9IGRlc2lyZWRXaW5kb3cgLSBjdXJyZW50V2luZG93O1xuXG4gICAgd2hpbGUgKHJlbWFpbmluZyA+IDApIHtcbiAgICAgIGlmIChzdGFydCA+IDIpIHtcbiAgICAgICAgc3RhcnQgLT0gMTtcbiAgICAgICAgcmVtYWluaW5nIC09IDE7XG4gICAgICB9XG4gICAgICBpZiAocmVtYWluaW5nID4gMCAmJiBlbmQgPCB0b3RhbEtub3duUGFnZXMgLSAxKSB7XG4gICAgICAgIGVuZCArPSAxO1xuICAgICAgICByZW1haW5pbmcgLT0gMTtcbiAgICAgIH1cbiAgICAgIGlmIChzdGFydCA9PT0gMiAmJiBlbmQgPT09IHRvdGFsS25vd25QYWdlcyAtIDEpIGJyZWFrO1xuICAgIH1cblxuICAgIHB1c2hQYWdlKDEpO1xuICAgIGlmIChzdGFydCA+IDIpIHB1c2hFbGxpcHNpcyhcInN0YXJ0LWVsbGlwc2lzXCIpO1xuICAgIGZvciAobGV0IGkgPSBzdGFydDsgaSA8PSBlbmQ7IGkgKz0gMSkgcHVzaFBhZ2UoaSk7XG4gICAgaWYgKGVuZCA8IHRvdGFsS25vd25QYWdlcyAtIDEpIHB1c2hFbGxpcHNpcyhcImVuZC1lbGxpcHNpc1wiKTtcbiAgICBwdXNoUGFnZSh0b3RhbEtub3duUGFnZXMpO1xuICAgIGlmIChoYXNOZXh0UGFnZSkgcHVzaEVsbGlwc2lzKFwibW9yZS1lbGxpcHNpc1wiKTtcblxuICAgIHJldHVybiBidXR0b25zO1xuICB9KSgpO1xuXG4gIGNvbnN0IHJlY2FsY1BhZ2VTaXplID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm47XG4gICAgaWYgKHBhZ2UgIT09IDEpIHJldHVybjtcbiAgICBpZiAoIXRhYmxlQm9keVJlZi5jdXJyZW50KSByZXR1cm47XG4gICAgY29uc3QgY29udGFpbmVySGVpZ2h0ID1cbiAgICAgIHRhYmxlQm9keVJlZi5jdXJyZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodCB8fCAwO1xuICAgIGlmICghY29udGFpbmVySGVpZ2h0KSByZXR1cm47XG5cbiAgICBjb25zdCBoZWFkZXJSb3cgPVxuICAgICAgdGFibGVCb2R5UmVmLmN1cnJlbnQucXVlcnlTZWxlY3RvcihcInRhYmxlIHRoZWFkIHRyXCIpIHx8XG4gICAgICB0YWJsZUJvZHlSZWYuY3VycmVudC5xdWVyeVNlbGVjdG9yKFwidGhlYWQgdHJcIik7XG4gICAgY29uc3QgYm9keVJvdyA9XG4gICAgICB0YWJsZUJvZHlSZWYuY3VycmVudC5xdWVyeVNlbGVjdG9yKFwidGFibGUgdGJvZHkgdHJcIikgfHxcbiAgICAgIHRhYmxlQm9keVJlZi5jdXJyZW50LnF1ZXJ5U2VsZWN0b3IoXCJ0Ym9keSB0clwiKTtcblxuICAgIGlmIChoZWFkZXJSb3cpIHtcbiAgICAgIGNvbnN0IGggPSBoZWFkZXJSb3cuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xuICAgICAgaWYgKGgpIGhlYWRlckhlaWdodFJlZi5jdXJyZW50ID0gaDtcbiAgICB9XG4gICAgaWYgKGJvZHlSb3cpIHtcbiAgICAgIGNvbnN0IHIgPSBib2R5Um93LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcbiAgICAgIGlmIChyKSByb3dIZWlnaHRSZWYuY3VycmVudCA9IHI7XG4gICAgfVxuXG4gICAgY29uc3QgdmVydGljYWxQYWRkaW5nID0gMjQ7XG4gICAgY29uc3QgYXZhaWxhYmxlID1cbiAgICAgIGNvbnRhaW5lckhlaWdodCAtIGhlYWRlckhlaWdodFJlZi5jdXJyZW50IC0gdmVydGljYWxQYWRkaW5nO1xuICAgIGNvbnN0IGVzdGltYXRlZCA9IE1hdGguZmxvb3IoYXZhaWxhYmxlIC8gcm93SGVpZ2h0UmVmLmN1cnJlbnQpO1xuICAgIGNvbnN0IGNsYW1wZWQgPSBNYXRoLm1heCg1LCBNYXRoLm1pbig1MCwgZXN0aW1hdGVkKSk7XG4gICAgaWYgKGNsYW1wZWQgPiAwICYmIGNsYW1wZWQgIT09IHBhZ2VTaXplKSB7XG4gICAgICBzZXRQYWdlU2l6ZShjbGFtcGVkKTtcbiAgICAgIHJlc2V0UGFnaW5hdGlvbigpO1xuICAgICAgc2V0UXVlcnlFcG9jaCgodikgPT4gdiArIDEpO1xuICAgIH1cbiAgfSwgW3BhZ2UsIHBhZ2VTaXplXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuO1xuICAgIHJlY2FsY1BhZ2VTaXplKCk7XG4gICAgY29uc3Qgb25SZXNpemUgPSAoKSA9PiByZWNhbGNQYWdlU2l6ZSgpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIG9uUmVzaXplKTtcbiAgICByZXR1cm4gKCkgPT4gd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgb25SZXNpemUpO1xuICB9LCBbcmVjYWxjUGFnZVNpemVdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChpc0xvYWRpbmcgfHwgcGFnZSAhPT0gMSkgcmV0dXJuO1xuICAgIHJlY2FsY1BhZ2VTaXplKCk7XG4gIH0sIFtwYWdlLCBpc0xvYWRpbmcsIHJlY2FsY1BhZ2VTaXplXSk7XG5cbiAgY29uc3QgcmVuZGVyRmlsdGVycyA9IChpZFByZWZpeCkgPT4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuZmlsdGVyc1BhbmVsfT5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuZmlsdGVyc0hlYWRlcn0+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5maWx0ZXJzVGl0bGV9PkZpbHRlcnM8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmZpbHRlcnNTdWJ0aXRsZX0+XG4gICAgICAgICAgICBOYXJyb3cgcmVzdWx0cyBieSBtYWNoaW5lLCBjbGllbnQsIG9yIHdhcmVob3VzZS5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHtoYXNBY3RpdmVGaWx0ZXJzID8gKFxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17c3R5bGVzLmZpbHRlcnNCYWRnZX0+QWN0aXZlPC9zcGFuPlxuICAgICAgICApIDogbnVsbH1cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmZpbHRlclNlY3Rpb259PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmZpbHRlclNlY3Rpb25UaXRsZX0+TWFjaGluZTwvZGl2PlxuICAgICAgICA8SW5wdXRHcm91cCBjbGFzc05hbWU9e3N0eWxlcy5pbnB1dEdyb3VwfT5cbiAgICAgICAgICA8SW5wdXRHcm91cC5UZXh0Pk9FTTwvSW5wdXRHcm91cC5UZXh0PlxuICAgICAgICAgIDxEcm9wZG93biBvblNlbGVjdD17aGFuZGxlU2VsZWN0MX0gY2xhc3NOYW1lPVwidy0xMDBcIj5cbiAgICAgICAgICAgIDxEcm9wZG93bi5Ub2dnbGVcbiAgICAgICAgICAgICAgdmFyaWFudD1cIm91dGxpbmUtc2Vjb25kYXJ5XCJcbiAgICAgICAgICAgICAgaWQ9e2Ake2lkUHJlZml4fS1vZW1gfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2B3LTEwMCAke3N0eWxlcy5pbnB1dEJ1dHRvbn1gfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7ZHJvcGRvd24xVGV4dH1cbiAgICAgICAgICAgIDwvRHJvcGRvd24uVG9nZ2xlPlxuICAgICAgICAgICAgPERyb3Bkb3duLk1lbnUgY2xhc3NOYW1lPVwidy0xMDBcIj5cbiAgICAgICAgICAgICAgPERyb3Bkb3duLkl0ZW0gZXZlbnRLZXk9XCJ1bmFzc2lnbmVkXCI+U2VsZWN0IE9wdGlvbjwvRHJvcGRvd24uSXRlbT5cbiAgICAgICAgICAgICAgPERyb3Bkb3duLkl0ZW0gZXZlbnRLZXk9XCJHRVwiPkdFPC9Ecm9wZG93bi5JdGVtPlxuICAgICAgICAgICAgICA8RHJvcGRvd24uSXRlbSBldmVudEtleT1cIlRvc2hpYmFcIj5Ub3NoaWJhPC9Ecm9wZG93bi5JdGVtPlxuICAgICAgICAgICAgICA8RHJvcGRvd24uSXRlbSBldmVudEtleT1cIlNpZW1lbnNcIj5TaWVtZW5zPC9Ecm9wZG93bi5JdGVtPlxuICAgICAgICAgICAgICA8RHJvcGRvd24uSXRlbSBldmVudEtleT1cIlBoaWxpcHNcIj5QaGlsaXBzPC9Ecm9wZG93bi5JdGVtPlxuICAgICAgICAgICAgPC9Ecm9wZG93bi5NZW51PlxuICAgICAgICAgIDwvRHJvcGRvd24+XG4gICAgICAgIDwvSW5wdXRHcm91cD5cblxuICAgICAgICA8SW5wdXRHcm91cCBjbGFzc05hbWU9e3N0eWxlcy5pbnB1dEdyb3VwfT5cbiAgICAgICAgICA8SW5wdXRHcm91cC5UZXh0Pk1vZGFsaXR5PC9JbnB1dEdyb3VwLlRleHQ+XG4gICAgICAgICAgPERyb3Bkb3duIG9uU2VsZWN0PXtoYW5kbGVTZWxlY3QyfSBjbGFzc05hbWU9XCJ3LTEwMFwiPlxuICAgICAgICAgICAgPERyb3Bkb3duLlRvZ2dsZVxuICAgICAgICAgICAgICB2YXJpYW50PVwib3V0bGluZS1zZWNvbmRhcnlcIlxuICAgICAgICAgICAgICBpZD17YCR7aWRQcmVmaXh9LW1vZGFsaXR5YH1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdy0xMDAgJHtzdHlsZXMuaW5wdXRCdXR0b259YH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge2Ryb3Bkb3duMlRleHR9XG4gICAgICAgICAgICA8L0Ryb3Bkb3duLlRvZ2dsZT5cbiAgICAgICAgICAgIDxEcm9wZG93bi5NZW51IGNsYXNzTmFtZT1cInctMTAwXCI+XG4gICAgICAgICAgICAgIDxEcm9wZG93bi5JdGVtIGV2ZW50S2V5PVwidW5hc3NpZ25lZFwiPlNlbGVjdCBPcHRpb248L0Ryb3Bkb3duLkl0ZW0+XG4gICAgICAgICAgICAgIDxEcm9wZG93bi5JdGVtIGV2ZW50S2V5PVwiQ1RcIj5DVDwvRHJvcGRvd24uSXRlbT5cbiAgICAgICAgICAgICAgPERyb3Bkb3duLkl0ZW0gZXZlbnRLZXk9XCJNUklcIj5NUkk8L0Ryb3Bkb3duLkl0ZW0+XG4gICAgICAgICAgICA8L0Ryb3Bkb3duLk1lbnU+XG4gICAgICAgICAgPC9Ecm9wZG93bj5cbiAgICAgICAgPC9JbnB1dEdyb3VwPlxuXG4gICAgICAgIDxJbnB1dEdyb3VwIGNsYXNzTmFtZT17c3R5bGVzLmlucHV0R3JvdXB9PlxuICAgICAgICAgIDxJbnB1dEdyb3VwLlRleHQ+TW9kZWw8L0lucHV0R3JvdXAuVGV4dD5cbiAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICB2YXJpYW50PVwib3V0bGluZS1zZWNvbmRhcnlcIlxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgdy0xMDAgJHtzdHlsZXMuaW5wdXRCdXR0b259YH1cbiAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZU1vZGVsQ2xpY2t9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge21vZGVsQnV0dG9uVGV4dH1cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgPC9JbnB1dEdyb3VwPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuZmlsdGVyU2VjdGlvbn0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuZmlsdGVyU2VjdGlvblRpdGxlfT5DbGllbnQ8L2Rpdj5cbiAgICAgICAgPElucHV0R3JvdXAgY2xhc3NOYW1lPXtzdHlsZXMuaW5wdXRHcm91cH0+XG4gICAgICAgICAgPElucHV0R3JvdXAuVGV4dD5DbGllbnQgRnJvbTwvSW5wdXRHcm91cC5UZXh0PlxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIHZhcmlhbnQ9XCJvdXRsaW5lLXNlY29uZGFyeVwiXG4gICAgICAgICAgICBjbGFzc05hbWU9e2B3LTEwMCAke3N0eWxlcy5pbnB1dEJ1dHRvbn1gfVxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlQ2xpZW50Q2xpY2soXCJmcm9tXCIpfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtjbGllbnRGcm9tQnV0dG9uVGV4dH1cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgPC9JbnB1dEdyb3VwPlxuXG4gICAgICAgIDxJbnB1dEdyb3VwIGNsYXNzTmFtZT17c3R5bGVzLmlucHV0R3JvdXB9PlxuICAgICAgICAgIDxJbnB1dEdyb3VwLlRleHQ+Q2xpZW50IEN1cnJlbnQ8L0lucHV0R3JvdXAuVGV4dD5cbiAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICB2YXJpYW50PVwib3V0bGluZS1zZWNvbmRhcnlcIlxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgdy0xMDAgJHtzdHlsZXMuaW5wdXRCdXR0b259YH1cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZUNsaWVudENsaWNrKFwiY3VycmVudFwiKX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7Y2xpZW50Q3VycmVudEJ1dHRvblRleHR9XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgIDwvSW5wdXRHcm91cD5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmZpbHRlclNlY3Rpb259PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmZpbHRlclNlY3Rpb25UaXRsZX0+V2FyZWhvdXNlPC9kaXY+XG4gICAgICAgIDxJbnB1dEdyb3VwIGNsYXNzTmFtZT17c3R5bGVzLmlucHV0R3JvdXB9PlxuICAgICAgICAgIDxJbnB1dEdyb3VwLlRleHQ+UXVpY2s8L0lucHV0R3JvdXAuVGV4dD5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmJ1dHRvbkdyb3VwfT5cbiAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgdmFyaWFudD1cIm91dGxpbmUtc2Vjb25kYXJ5XCJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMuZmxleEJ1dHRvbn1cbiAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlU29DYWxXYXJlaG91c2VDbGlja31cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgU29DYWwgV2FyZWhvdXNlXG4gICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgdmFyaWFudD1cIm91dGxpbmUtc2Vjb25kYXJ5XCJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMuZmxleEJ1dHRvbn1cbiAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlTm9yQ2FsV2FyZWhvdXNlQ2xpY2t9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIE5vckNhbCBXYXJlaG91c2VcbiAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICB2YXJpYW50PVwib3V0bGluZS1zZWNvbmRhcnlcIlxuICAgICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5mbGV4QnV0dG9ufVxuICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVXYXJlaG91c2VVbmFzc2lnbmVkQ2xpY2t9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIFVuYXNzaWduZWRcbiAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L0lucHV0R3JvdXA+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcblxuXG4gIHJldHVybiAoXG4gICAgPExvZ2dlZEluPlxuICAgICAgeyhpc0RlbGV0aW5nIHx8IGlzTmF2aWdhdGluZykgJiYgKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmxvYWRpbmdPdmVybGF5fT5cbiAgICAgICAgICA8aW1nXG4gICAgICAgICAgICBzcmM9XCIvbWFnbW8tbG9nby5wbmdcIlxuICAgICAgICAgICAgYWx0PVwiTG9hZGluZyBNYWdtb1wiXG4gICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5sb2FkaW5nTG9nb31cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG4gICAgICA8TW9kYWwgc2hvdz17c2hvd0RlbGV0ZU1vZGFsfSBvbkhpZGU9e2hhbmRsZUNsb3NlRGVsZXRlTW9kYWx9PlxyXG4gICAgICAgIDxNb2RhbC5IZWFkZXIgY2xvc2VCdXR0b24+XHJcbiAgICAgICAgICA8TW9kYWwuVGl0bGU+Q29uZmlybSBEZWxldGlvbjwvTW9kYWwuVGl0bGU+XHJcbiAgICAgICAgPC9Nb2RhbC5IZWFkZXI+XHJcbiAgICAgICAgPE1vZGFsLkJvZHk+XHJcbiAgICAgICAgICBBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIHtzZWxlY3RlZEl0ZW1zLmxlbmd0aH0gaXRlbVxyXG4gICAgICAgICAge3NlbGVjdGVkSXRlbXMubGVuZ3RoID4gMSA/IFwic1wiIDogXCJcIn0/XHJcbiAgICAgICAgPC9Nb2RhbC5Cb2R5PlxyXG4gICAgICAgIDxNb2RhbC5Gb290ZXI+XHJcbiAgICAgICAgICA8QnV0dG9uIHZhcmlhbnQ9XCJkYW5nZXJcIiBvbkNsaWNrPXtoYW5kbGVEZWxldGVTZWxlY3RlZH0+XHJcbiAgICAgICAgICAgIFllcywgZGVsZXRlXHJcbiAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICAgIDxCdXR0b24gdmFyaWFudD1cInNlY29uZGFyeVwiIG9uQ2xpY2s9e2hhbmRsZUNsb3NlRGVsZXRlTW9kYWx9PlxyXG4gICAgICAgICAgICBDYW5jZWxcclxuICAgICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICAgIDwvTW9kYWwuRm9vdGVyPlxyXG4gICAgICA8L01vZGFsPlxyXG5cclxuICAgICAgPE1vZGFsIHNob3c9e3Nob3dDbGllbnRNb2RhbH0gb25IaWRlPXsoKSA9PiBzZXRTaG93Q2xpZW50TW9kYWwoZmFsc2UpfT5cclxuICAgICAgICA8TW9kYWwuSGVhZGVyIGNsb3NlQnV0dG9uPlxyXG4gICAgICAgICAgPE1vZGFsLlRpdGxlPlxyXG4gICAgICAgICAgICBTZWxlY3Qge2NsaWVudFNlbGVjdGlvblR5cGUgPT09IFwiZnJvbVwiID8gXCJDbGllbnQgRnJvbVwiIDogXCJDbGllbnQgQ3VycmVudFwifVxyXG4gICAgICAgICAgPC9Nb2RhbC5UaXRsZT5cclxuICAgICAgICA8L01vZGFsLkhlYWRlcj5cclxuICAgICAgICA8TW9kYWwuQm9keT5cclxuICAgICAgICAgIDxGb3JtQ29udHJvbFxyXG4gICAgICAgICAgICB0eXBlPVwidGV4dFwiXHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoIGJ5IG5hbWVcIlxyXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJtYi0zXCJcclxuICAgICAgICAgICAgdmFsdWU9e2NsaWVudFNlYXJjaFRlcm19XHJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0Q2xpZW50U2VhcmNoVGVybShlLnRhcmdldC52YWx1ZSl9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICAgPENsaWVudFRhYmxlXHJcbiAgICAgICAgICAgIGNsaWVudHM9eyhBcnJheS5pc0FycmF5KGNsaWVudHMpID8gY2xpZW50cyA6IFtdKS5maWx0ZXIoXHJcbiAgICAgICAgICAgICAgKGNsaWVudCkgPT4gKGNsaWVudD8ubmFtZSA/PyBcIlwiKS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKGNsaWVudFNlYXJjaFRlcm0udG9Mb3dlckNhc2UoKSlcclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgb25TZWxlY3RDbGllbnQ9e2hhbmRsZUNsaWVudFNlbGVjdH1cclxuICAgICAgICAgICAgb25JbmZvQ2xpY2s9e2hhbmRsZUNsaWVudEluZm99XHJcbiAgICAgICAgICAgIGlzQ2xpZW50U2VhcmNoPXtmYWxzZX1cclxuICAgICAgICAgICAgY2xlYXJTZWxlY3Rpb249eygpID0+IGhhbmRsZUNsaWVudFNlbGVjdChudWxsKX1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgPC9Nb2RhbC5Cb2R5PlxyXG4gICAgICA8L01vZGFsPlxyXG5cclxuICAgICAgPE1vZGFsIHNob3c9e3Nob3dNb2RlbE1vZGFsfSBvbkhpZGU9eygpID0+IHNldFNob3dNb2RlbE1vZGFsKGZhbHNlKX0+XHJcbiAgICAgICAgPE1vZGFsLkhlYWRlciBjbG9zZUJ1dHRvbj5cclxuICAgICAgICAgIDxNb2RhbC5UaXRsZT5TZWxlY3QgTW9kZWw8L01vZGFsLlRpdGxlPlxyXG4gICAgICAgIDwvTW9kYWwuSGVhZGVyPlxyXG4gICAgICAgIDxNb2RhbC5Cb2R5PlxyXG4gICAgICAgICAgPEZvcm1Db250cm9sXHJcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJTZWFyY2ggYnkgbmFtZVwiXHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1iLTNcIlxyXG4gICAgICAgICAgICB2YWx1ZT17bW9kZWxTZWFyY2hUZXJtfVxyXG4gICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldE1vZGVsU2VhcmNoVGVybShlLnRhcmdldC52YWx1ZSl9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICAgPE1vZGVsVGFibGVcclxuICAgICAgICAgICAgbW9kZWxzPXttb2RlbHMuZmlsdGVyKChtb2RlbCkgPT5cclxuICAgICAgICAgICAgICB0eXBlb2YgbW9kZWwgPT09IFwic3RyaW5nXCJcclxuICAgICAgICAgICAgICAgID8gbW9kZWwudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhtb2RlbFNlYXJjaFRlcm0udG9Mb3dlckNhc2UoKSlcclxuICAgICAgICAgICAgICAgIDogZmFsc2VcclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgb25TZWxlY3RNb2RlbD17aGFuZGxlTW9kZWxTZWxlY3R9XHJcbiAgICAgICAgICAgIGNsZWFyU2VsZWN0aW9uPXsoKSA9PiBoYW5kbGVNb2RlbFNlbGVjdChudWxsKX1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgPC9Nb2RhbC5Cb2R5PlxyXG4gICAgICA8L01vZGFsPlxyXG5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5wYWdlfT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5wYWdlSW5uZXJ9PlxuICAgICAgICAgIDxoZWFkZXIgY2xhc3NOYW1lPXtzdHlsZXMuaGVhZGVyfT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuaGVhZGVyTGVmdH0+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5idXJnZXJ9XG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0U2hvd0ZpbHRlcnModHJ1ZSl9XG4gICAgICAgICAgICAgICAgYXJpYS1sYWJlbD1cIk9wZW4gZmlsdGVyc1wiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8c3Bhbj48L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4+PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuPjwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuYnJhbmR9PlxuICAgICAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgICAgIHNyYz1cIi9tYWdtby1sb2dvLnBuZ1wiXG4gICAgICAgICAgICAgICAgICBhbHQ9XCJNYWdtb1wiXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5icmFuZExvZ299XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5icmFuZE5hbWV9Pk1hZ21vPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmJyYW5kU3VifT5JbnZlbnRvcnkgU2VhcmNoPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmhlYWRlclJpZ2h0fT5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5oZWFkZXJTdGF0dXN9PlxuICAgICAgICAgICAgICAgIHtoYXNBY3RpdmVGaWx0ZXJzID8gXCJGaWx0ZXJzIGFjdGl2ZVwiIDogXCJBbGwgaXRlbXNcIn1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2hlYWRlcj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuY29udGVudH0+XG4gICAgICAgICAgICA8YXNpZGUgY2xhc3NOYW1lPXtzdHlsZXMuc2lkZWJhcn0+e3JlbmRlckZpbHRlcnMoXCJzaWRlYmFyXCIpfTwvYXNpZGU+XG4gICAgICAgICAgICA8bWFpbiBjbGFzc05hbWU9e3N0eWxlcy5tYWlufT5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy50YWJsZUNhcmR9PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMudGFibGVIZWFkZXJ9PlxuICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy50YWJsZVRpdGxlfT5JdGVtczwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnRhYmxlU3VidGl0bGV9PlxuICAgICAgICAgICAgICAgICAgICAgIHtpc0xvYWRpbmcgPyBcIkxvYWRpbmcgaXRlbXNcIiA6IGAke2luZm8ubGVuZ3RofSBpdGVtcyBvbiB0aGlzIHBhZ2VgfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy50YWJsZU1ldGF9PlxuICAgICAgICAgICAgICAgICAgICBQYWdlIHtwYWdlfSB7aGFzTmV4dFBhZ2UgPyBgb2YgJHt0b3RhbEtub3duUGFnZXN9K2AgOiBgb2YgJHt0b3RhbEtub3duUGFnZXN9YH1cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy50YWJsZUJvZHl9IHJlZj17dGFibGVCb2R5UmVmfT5cbiAgICAgICAgICAgICAgICAgIHtpc0xvYWRpbmcgPyAoXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubG9hZGluZ1N0YXRlfT5cbiAgICAgICAgICAgICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgICAgICAgICAgICBzcmM9XCIvbWFnbW8tbG9nby5wbmdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgYWx0PVwiTG9hZGluZyBNYWdtb1wiXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5sb2FkaW5nTG9nb31cbiAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubG9hZGluZ1RleHR9PkxvYWRpbmc8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICApIDogbG9hZEVycm9yID8gKFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmVycm9yU3RhdGV9PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuZXJyb3JUaXRsZX0+XG4gICAgICAgICAgICAgICAgICAgICAgICBMb2FkIGZhaWxlZCAoe2xvYWRFcnJvci5jb2RlfSlcbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmVycm9yTWVzc2FnZX0+e2xvYWRFcnJvci5tZXNzYWdlfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhbnQ9XCJvdXRsaW5lLXNlY29uZGFyeVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBzaXplPVwic21cIlxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICByZXNldFBhZ2luYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0UXVlcnlFcG9jaCgodikgPT4gdiArIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICBSZXRyeVxuICAgICAgICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICAgIDxQYXJ0VGFibGVcbiAgICAgICAgICAgICAgICAgICAgICBpbmZvPXtpbmZvfVxuICAgICAgICAgICAgICAgICAgICAgIGxhYmVscz17bGFiZWxzfVxuICAgICAgICAgICAgICAgICAgICAgIGlkcz17aWRzfVxuICAgICAgICAgICAgICAgICAgICAgIGhvdmVyU3R5bGU9e2hvdmVyU3R5bGV9XG4gICAgICAgICAgICAgICAgICAgICAgc29ydENoZWNrQWxsPXtzb3J0Q2hlY2tBbGx9XG4gICAgICAgICAgICAgICAgICAgICAgY2hlY2tEZWxldGU9e2NoZWNrRGVsZXRlfVxuICAgICAgICAgICAgICAgICAgICAgIGlzRGVsZXRpbmc9e2lzRGVsZXRpbmd9XG4gICAgICAgICAgICAgICAgICAgICAgcm93U2VsZWN0PXtyb3dTZWxlY3R9XG4gICAgICAgICAgICAgICAgICAgICAgc2V0SG92ZXJJbmRleD17c2V0SG92ZXJJbmRleH1cbiAgICAgICAgICAgICAgICAgICAgICBob3ZlckluZGV4PXtob3ZlckluZGV4fVxuICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkSXRlbXM9e3NlbGVjdGVkSXRlbXN9XG4gICAgICAgICAgICAgICAgICAgICAgc2V0U2VsZWN0ZWRJdGVtcz17c2V0U2VsZWN0ZWRJdGVtc31cbiAgICAgICAgICAgICAgICAgICAgICBtaW5Sb3dzPXtwYWdlU2l6ZX1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnRhYmxlRm9vdGVyfT5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMucGFnaW5hdGlvblJvd30+XG4gICAgICAgICAgICAgICAgICAgIDxQYWdpbmF0aW9uIHNpemU9XCJzbVwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxQYWdpbmF0aW9uLlByZXZcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFBhZ2UoKHApID0+IE1hdGgubWF4KDEsIHAgLSAxKSl9XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17cGFnZSA8PSAxfVxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIFByZXZpb3VzXG4gICAgICAgICAgICAgICAgICAgICAgPC9QYWdpbmF0aW9uLlByZXY+XG4gICAgICAgICAgICAgICAgICAgICAge3BhZ2VCdXR0b25zfVxuICAgICAgICAgICAgICAgICAgICAgIDxQYWdpbmF0aW9uLk5leHRcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFBhZ2UoKHApID0+IHAgKyAxKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXshaGFzTmV4dFBhZ2V9XG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgTmV4dFxuICAgICAgICAgICAgICAgICAgICAgIDwvUGFnaW5hdGlvbi5OZXh0PlxuICAgICAgICAgICAgICAgICAgICA8L1BhZ2luYXRpb24+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxGb3JtIGNsYXNzTmFtZT17c3R5bGVzLnNlYXJjaFJvd30+XG4gICAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbFxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU9e3Nob3dMaXN0U2VhcmNofVxuICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoXCJcbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5zZWFyY2hJbnB1dH1cbiAgICAgICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPVwiU2VhcmNoXCJcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17c2VhcmNofVxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtzZWFyY2hDaGFuZ2VIYW5kbGVyfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8TmF2RHJvcGRvd25cbiAgICAgICAgICAgICAgICAgICAgICB0aXRsZT17c2VsZWN0fVxuICAgICAgICAgICAgICAgICAgICAgIGlkPVwiY29sbGFzaWJsZS1uYXYtZHJvcGRvd25cIlxuICAgICAgICAgICAgICAgICAgICAgIHNob3c9e3Nob3dMaXN0fVxuICAgICAgICAgICAgICAgICAgICAgIG9uTW91c2VFbnRlcj17KCkgPT4gc2V0U2hvd0xpc3QodHJ1ZSl9XG4gICAgICAgICAgICAgICAgICAgICAgb25Nb3VzZUxlYXZlPXsoKSA9PiBzZXRTaG93TGlzdChmYWxzZSl9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMuc2VhcmNoU2VsZWN0fVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgPE5hdkRyb3Bkb3duLkl0ZW1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2VsZWN0KFwiTmFtZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2hvd0xpc3RTZWFyY2goXCJ0ZXh0XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICBOYW1lXG4gICAgICAgICAgICAgICAgICAgICAgPC9OYXZEcm9wZG93bi5JdGVtPlxuICAgICAgICAgICAgICAgICAgICAgIDxOYXZEcm9wZG93bi5JdGVtXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNlbGVjdChcIkRhdGVcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNob3dMaXN0U2VhcmNoKFwiZGF0ZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgRGF0ZVxuICAgICAgICAgICAgICAgICAgICAgIDwvTmF2RHJvcGRvd24uSXRlbT5cbiAgICAgICAgICAgICAgICAgICAgICA8TmF2RHJvcGRvd24uSXRlbVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTZWxlY3QoXCJXb3JrIE9yZGVyXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTaG93TGlzdFNlYXJjaChcInRleHRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIFdvcmsgT3JkZXJcbiAgICAgICAgICAgICAgICAgICAgICA8L05hdkRyb3Bkb3duLkl0ZW0+XG4gICAgICAgICAgICAgICAgICAgICAgPE5hdkRyb3Bkb3duLkl0ZW1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2VsZWN0KFwiUHJvZHVjdCBOdW1iZXJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNob3dMaXN0U2VhcmNoKFwidGV4dFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgUHJvZHVjdCBOdW1iZXJcbiAgICAgICAgICAgICAgICAgICAgICA8L05hdkRyb3Bkb3duLkl0ZW0+XG4gICAgICAgICAgICAgICAgICAgICAgPE5hdkRyb3Bkb3duLkl0ZW1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2VsZWN0KFwiU2VyaWFsIE51bWJlclwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2hvd0xpc3RTZWFyY2goXCJ0ZXh0XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICBTZXJpYWwgTnVtYmVyXG4gICAgICAgICAgICAgICAgICAgICAgPC9OYXZEcm9wZG93bi5JdGVtPlxuICAgICAgICAgICAgICAgICAgICAgIDxOYXZEcm9wZG93bi5JdGVtXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNlbGVjdChcIkRlc2NyaXB0aW9uXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTaG93TGlzdFNlYXJjaChcInRleHRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIERlc2NyaXB0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgPC9OYXZEcm9wZG93bi5JdGVtPlxuICAgICAgICAgICAgICAgICAgICAgIDxOYXZEcm9wZG93bi5JdGVtXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNlbGVjdChcIlNLVVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2hvd0xpc3RTZWFyY2goXCJ0ZXh0XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICBTS1VcbiAgICAgICAgICAgICAgICAgICAgICA8L05hdkRyb3Bkb3duLkl0ZW0+XG4gICAgICAgICAgICAgICAgICAgIDwvTmF2RHJvcGRvd24+XG4gICAgICAgICAgICAgICAgICA8L0Zvcm0+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmZvb3RlckFjdGlvbnN9PlxuICAgICAgICAgICAgICAgICAgICA8TG9hZGluZ0J1dHRvblxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJzZWNvbmRhcnlcIlxuICAgICAgICAgICAgICAgICAgICAgIG5hbWU9XCJBZGQgTmV3IEl0ZW1cIlxuICAgICAgICAgICAgICAgICAgICAgIHJvdXRlPVwiTmV3U2VhcmNoL0FkZEl0ZW0vTmV3SXRlbVwiXG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMuYWN0aW9uQnV0dG9ufVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8TG9hZGluZ0J1dHRvblxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJsaWdodFwiXG4gICAgICAgICAgICAgICAgICAgICAgbmFtZT1cIk1hcFwiXG4gICAgICAgICAgICAgICAgICAgICAgcm91dGU9XCJOZXdTZWFyY2gvaW52ZW50b3J5L2ludmVudG9yeU1hbmFnZVwiXG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMuYWN0aW9uQnV0dG9ufVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8TG9hZGluZ0J1dHRvblxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJwcmltYXJ5XCJcbiAgICAgICAgICAgICAgICAgICAgICBuYW1lPVwiQmFja1wiXG4gICAgICAgICAgICAgICAgICAgICAgcm91dGU9XCJXYXJlaG91c2VkYi9XYXJlaG91c2VTZWxlY3RcIlxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17c3R5bGVzLmFjdGlvbkJ1dHRvbn1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvbWFpbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPE9mZmNhbnZhc1xuICAgICAgICAgIHNob3c9e3Nob3dGaWx0ZXJzfVxuICAgICAgICAgIG9uSGlkZT17KCkgPT4gc2V0U2hvd0ZpbHRlcnMoZmFsc2UpfVxuICAgICAgICAgIHBsYWNlbWVudD1cInN0YXJ0XCJcbiAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5maWx0ZXJzRHJhd2VyfVxuICAgICAgICAgIHNjcm9sbFxuICAgICAgICAgIGJhY2tkcm9wXG4gICAgICAgID5cbiAgICAgICAgICA8T2ZmY2FudmFzLkhlYWRlciBjbG9zZUJ1dHRvbj5cbiAgICAgICAgICAgIDxPZmZjYW52YXMuVGl0bGU+RmlsdGVyczwvT2ZmY2FudmFzLlRpdGxlPlxuICAgICAgICAgIDwvT2ZmY2FudmFzLkhlYWRlcj5cbiAgICAgICAgICA8T2ZmY2FudmFzLkJvZHk+e3JlbmRlckZpbHRlcnMoXCJkcmF3ZXJcIil9PC9PZmZjYW52YXMuQm9keT5cbiAgICAgICAgPC9PZmZjYW52YXM+XG4gICAgICA8L2Rpdj5cbiAgICA8L0xvZ2dlZEluPlxuICApO1xuXHJcblxyXG59XHJcblxyXG4iXSwic291cmNlUm9vdCI6IiJ9