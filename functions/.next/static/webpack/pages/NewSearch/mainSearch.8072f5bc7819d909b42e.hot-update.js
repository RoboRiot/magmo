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
      lineNumber: 58,
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
      lineNumber: 59,
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
          lineNumber: 1030,
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
          lineNumber: 1040,
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
        lineNumber: 1126,
        columnNumber: 5
      }
    }, __jsx("div", {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.filtersHeader,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1127,
        columnNumber: 7
      }
    }, __jsx("div", {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1128,
        columnNumber: 9
      }
    }, __jsx("div", {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.filtersTitle,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1129,
        columnNumber: 11
      }
    }, "Filters"), __jsx("div", {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.filtersSubtitle,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1130,
        columnNumber: 11
      }
    }, "Narrow results by machine, client, or warehouse.")), hasActiveFilters ? __jsx("span", {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.filtersBadge,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1135,
        columnNumber: 11
      }
    }, "Active") : null), __jsx("div", {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.filterSection,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1139,
        columnNumber: 7
      }
    }, __jsx("div", {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.filterSectionTitle,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1140,
        columnNumber: 9
      }
    }, "Machine"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["InputGroup"], {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.inputGroup,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1141,
        columnNumber: 9
      }
    }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["InputGroup"].Text, {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1142,
        columnNumber: 11
      }
    }, "OEM"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Dropdown"], {
      onSelect: handleSelect1,
      className: "w-100",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1143,
        columnNumber: 11
      }
    }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Dropdown"].Toggle, {
      variant: "outline-secondary",
      id: "".concat(idPrefix, "-oem"),
      className: "w-100 ".concat(_styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.inputButton),
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1144,
        columnNumber: 13
      }
    }, dropdown1Text), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Dropdown"].Menu, {
      className: "w-100",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1151,
        columnNumber: 13
      }
    }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Dropdown"].Item, {
      eventKey: "unassigned",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1152,
        columnNumber: 15
      }
    }, "Select Option"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Dropdown"].Item, {
      eventKey: "GE",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1153,
        columnNumber: 15
      }
    }, "GE"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Dropdown"].Item, {
      eventKey: "Toshiba",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1154,
        columnNumber: 15
      }
    }, "Toshiba"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Dropdown"].Item, {
      eventKey: "Siemens",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1155,
        columnNumber: 15
      }
    }, "Siemens"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Dropdown"].Item, {
      eventKey: "Philips",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1156,
        columnNumber: 15
      }
    }, "Philips")))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["InputGroup"], {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.inputGroup,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1161,
        columnNumber: 9
      }
    }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["InputGroup"].Text, {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1162,
        columnNumber: 11
      }
    }, "Modality"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Dropdown"], {
      onSelect: handleSelect2,
      className: "w-100",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1163,
        columnNumber: 11
      }
    }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Dropdown"].Toggle, {
      variant: "outline-secondary",
      id: "".concat(idPrefix, "-modality"),
      className: "w-100 ".concat(_styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.inputButton),
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1164,
        columnNumber: 13
      }
    }, dropdown2Text), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Dropdown"].Menu, {
      className: "w-100",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1171,
        columnNumber: 13
      }
    }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Dropdown"].Item, {
      eventKey: "unassigned",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1172,
        columnNumber: 15
      }
    }, "Select Option"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Dropdown"].Item, {
      eventKey: "CT",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1173,
        columnNumber: 15
      }
    }, "CT"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Dropdown"].Item, {
      eventKey: "MRI",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1174,
        columnNumber: 15
      }
    }, "MRI")))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["InputGroup"], {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.inputGroup,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1179,
        columnNumber: 9
      }
    }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["InputGroup"].Text, {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1180,
        columnNumber: 11
      }
    }, "Model"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Button"], {
      variant: "outline-secondary",
      className: "w-100 ".concat(_styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.inputButton),
      onClick: handleModelClick,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1181,
        columnNumber: 11
      }
    }, modelButtonText))), __jsx("div", {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.filterSection,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1191,
        columnNumber: 7
      }
    }, __jsx("div", {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.filterSectionTitle,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1192,
        columnNumber: 9
      }
    }, "Client"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["InputGroup"], {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.inputGroup,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1193,
        columnNumber: 9
      }
    }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["InputGroup"].Text, {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1194,
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
        lineNumber: 1195,
        columnNumber: 11
      }
    }, clientFromButtonText)), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["InputGroup"], {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.inputGroup,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1204,
        columnNumber: 9
      }
    }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["InputGroup"].Text, {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1205,
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
        lineNumber: 1206,
        columnNumber: 11
      }
    }, clientCurrentButtonText))), __jsx("div", {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.filterSection,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1216,
        columnNumber: 7
      }
    }, __jsx("div", {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.filterSectionTitle,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1217,
        columnNumber: 9
      }
    }, "Warehouse"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["InputGroup"], {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.inputGroup,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1218,
        columnNumber: 9
      }
    }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["InputGroup"].Text, {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1219,
        columnNumber: 11
      }
    }, "Quick"), __jsx("div", {
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.buttonGroup,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1220,
        columnNumber: 11
      }
    }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Button"], {
      variant: "outline-secondary",
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.flexButton,
      onClick: handleSoCalWarehouseClick,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1221,
        columnNumber: 13
      }
    }, "SoCal Warehouse"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Button"], {
      variant: "outline-secondary",
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.flexButton,
      onClick: handleNorCalWarehouseClick,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1228,
        columnNumber: 13
      }
    }, "NorCal Warehouse"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Button"], {
      variant: "outline-secondary",
      className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.flexButton,
      onClick: handleWarehouseUnassignedClick,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1235,
        columnNumber: 13
      }
    }, "Unassigned")))));
  };

  return __jsx(_LoggedIn__WEBPACK_IMPORTED_MODULE_11__["default"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1250,
      columnNumber: 5
    }
  }, (isDeleting || isNavigating) && __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.loadingOverlay,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1252,
      columnNumber: 9
    }
  }, __jsx("img", {
    src: "/magmo-logo.png",
    alt: "Loading Magmo",
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.loadingLogo,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1253,
      columnNumber: 11
    }
  })), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"], {
    show: showDeleteModal,
    onHide: handleCloseDeleteModal,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1260,
      columnNumber: 7
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Header, {
    closeButton: true,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1261,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Title, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1262,
      columnNumber: 11
    }
  }, "Confirm Deletion")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Body, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1264,
      columnNumber: 9
    }
  }, "Are you sure you want to delete ", selectedItems.length, " item", selectedItems.length > 1 ? "s" : "", "?"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Footer, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1268,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Button"], {
    variant: "danger",
    onClick: handleDeleteSelected,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1269,
      columnNumber: 11
    }
  }, "Yes, delete"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Button"], {
    variant: "secondary",
    onClick: handleCloseDeleteModal,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1272,
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
      lineNumber: 1278,
      columnNumber: 7
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Header, {
    closeButton: true,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1279,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Title, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1280,
      columnNumber: 11
    }
  }, "Select ", clientSelectionType === "from" ? "Client From" : "Client Current")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Body, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1284,
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
      lineNumber: 1285,
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
      lineNumber: 1292,
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
      lineNumber: 1304,
      columnNumber: 7
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Header, {
    closeButton: true,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1305,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Title, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1306,
      columnNumber: 11
    }
  }, "Select Model")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Body, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1308,
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
      lineNumber: 1309,
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
      lineNumber: 1316,
      columnNumber: 11
    }
  }))), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.page,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1328,
      columnNumber: 7
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.pageInner,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1329,
      columnNumber: 9
    }
  }, __jsx("header", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.header,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1330,
      columnNumber: 11
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.headerLeft,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1331,
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
      lineNumber: 1332,
      columnNumber: 15
    }
  }, __jsx("span", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1338,
      columnNumber: 17
    }
  }), __jsx("span", {
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
  })), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.brand,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1342,
      columnNumber: 15
    }
  }, __jsx("img", {
    src: "/magmo-logo.png",
    alt: "Magmo",
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.brandLogo,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1343,
      columnNumber: 17
    }
  }), __jsx("div", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1348,
      columnNumber: 17
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.brandName,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1349,
      columnNumber: 19
    }
  }, "Magmo"), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.brandSub,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1350,
      columnNumber: 19
    }
  }, "Inventory Search")))), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.headerRight,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1354,
      columnNumber: 13
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.headerStatus,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1355,
      columnNumber: 15
    }
  }, hasActiveFilters ? "Filters active" : "All items"))), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.content,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1361,
      columnNumber: 11
    }
  }, __jsx("aside", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.sidebar,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1362,
      columnNumber: 13
    }
  }, renderFilters("sidebar")), __jsx("main", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.main,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1363,
      columnNumber: 13
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.tableCard,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1364,
      columnNumber: 15
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.tableHeader,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1365,
      columnNumber: 17
    }
  }, __jsx("div", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1366,
      columnNumber: 19
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.tableTitle,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1367,
      columnNumber: 21
    }
  }, "Items"), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.tableSubtitle,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1368,
      columnNumber: 21
    }
  }, isLoading ? "Loading items" : "".concat(info.length, " items on this page"))), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.tableMeta,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1372,
      columnNumber: 19
    }
  }, "Page ", page, " ", hasNextPage ? "of ".concat(totalKnownPages, "+") : "of ".concat(totalKnownPages))), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.tableBody,
    ref: tableBodyRef,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1377,
      columnNumber: 17
    }
  }, isLoading ? __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.loadingState,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1379,
      columnNumber: 21
    }
  }, __jsx("img", {
    src: "/magmo-logo.png",
    alt: "Loading Magmo",
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.loadingLogo,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1380,
      columnNumber: 23
    }
  }), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.loadingText,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1385,
      columnNumber: 23
    }
  }, "Loading")) : loadError ? __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.errorState,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1388,
      columnNumber: 21
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.errorTitle,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1389,
      columnNumber: 23
    }
  }, "Load failed (", loadError.code, ")"), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.errorMessage,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1392,
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
      lineNumber: 1393,
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
      lineNumber: 1405,
      columnNumber: 21
    }
  })), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.tableFooter,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1423,
      columnNumber: 17
    }
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.paginationRow,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1424,
      columnNumber: 19
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Pagination"], {
    size: "sm",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1425,
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
      lineNumber: 1426,
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
      lineNumber: 1433,
      columnNumber: 23
    }
  }, "Next"))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Form"], {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.searchRow,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1441,
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
      lineNumber: 1442,
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
      lineNumber: 1450,
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
      lineNumber: 1458,
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
      lineNumber: 1466,
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
      lineNumber: 1474,
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
      lineNumber: 1482,
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
      lineNumber: 1490,
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
      lineNumber: 1498,
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
      lineNumber: 1506,
      columnNumber: 23
    }
  }, "SKU"))), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.footerActions,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1516,
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
      lineNumber: 1517,
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
      lineNumber: 1523,
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
      lineNumber: 1529,
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
      lineNumber: 1542,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Offcanvas"].Header, {
    closeButton: true,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1550,
      columnNumber: 11
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Offcanvas"].Title, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1551,
      columnNumber: 13
    }
  }, "Filters")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Offcanvas"].Body, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1553,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vcGFnZXMvTmV3U2VhcmNoL21haW5TZWFyY2guanMiXSwibmFtZXMiOlsiU09DQUxfQ0xJRU5UX0lEIiwiTk9SQ0FMX0NMSUVOVF9JRCIsIlVOQVNTSUdORURfQ0xJRU5UX0lEIiwiREVGQVVMVF9QQUdFX1NJWkUiLCJzaW11bGF0ZU5ldHdvcmtSZXF1ZXN0IiwiUHJvbWlzZSIsInJlc29sdmUiLCJzZXRUaW1lb3V0IiwiTG9hZGluZ0J1dHRvbiIsInR5cGUiLCJuYW1lIiwicm91dGUiLCJjbGFzc05hbWUiLCJ1c2VTdGF0ZSIsImlzTG9hZGluZyIsInNldExvYWRpbmciLCJ1c2VFZmZlY3QiLCJjYW5jZWxsZWQiLCJ0aGVuIiwidG9UaW1lIiwidmFsdWUiLCJzZWNvbmRzIiwiRGF0ZSIsInQiLCJnZXRUaW1lIiwiaXNOYU4iLCJpc28iLCJwYXJzZSIsInBhcnRzIiwic3BsaXQiLCJsZW5ndGgiLCJtbSIsImRkIiwieXl5eSIsImFsdCIsInRvWU1EIiwiZCIsImdldEZ1bGxZZWFyIiwiU3RyaW5nIiwiZ2V0TW9udGgiLCJwYWRTdGFydCIsImdldERhdGUiLCJub3JtYWxpemVUZXh0IiwidG9Mb3dlckNhc2UiLCJ0cmltIiwiZ2V0TWFjaGluZUZpZWxkIiwiaXRlbSIsImtleSIsImxvd2VyIiwibWFjaGluZURhdGEiLCJjdXJyZW50TWFjaGluZURhdGEiLCJ0aGVNYWNoaW5lRGF0YSIsIlRoZU1hY2hpbmUiLCJNYWluU2VhcmNoIiwidXNlQXV0aCIsInNpZ25PdXQiLCJpbmZvIiwic2V0SW5mbyIsImJhY2t1cEluZm8iLCJzZXRCYWNrdXBJbmZvIiwiYXVnbWVudGVkSW5mbyIsInNldEF1Z21lbnRlZEluZm8iLCJzZXRJc0xvYWRpbmciLCJpZHMiLCJzZXRJRCIsInNob3ciLCJzZXRTaG93Iiwic2hvd0ZpbHRlcnMiLCJzZXRTaG93RmlsdGVycyIsInBhZ2VTaXplIiwic2V0UGFnZVNpemUiLCJpc05hdmlnYXRpbmciLCJzZXRJc05hdmlnYXRpbmciLCJkSXRlbSIsInNldERJdGVtIiwic2VsZWN0Iiwic2V0U2VsZWN0Iiwic2hvd0xpc3QiLCJzZXRTaG93TGlzdCIsInNob3dMaXN0U2VhcmNoIiwic2V0U2hvd0xpc3RTZWFyY2giLCJzZWFyY2giLCJzZXRTZWFyY2giLCJzZWxlY3RlZE9FTSIsInNldFNlbGVjdGVkT0VNIiwic2VsZWN0ZWRNb2RhbGl0eSIsInNldFNlbGVjdGVkTW9kYWxpdHkiLCJzZWxlY3RlZENsaWVudEZyb20iLCJzZXRTZWxlY3RlZENsaWVudEZyb20iLCJjbGllbnRGcm9tQnV0dG9uVGV4dCIsInNldENsaWVudEZyb21CdXR0b25UZXh0Iiwic2VsZWN0ZWRDbGllbnRDdXJyZW50Iiwic2V0U2VsZWN0ZWRDbGllbnRDdXJyZW50IiwiY2xpZW50Q3VycmVudEJ1dHRvblRleHQiLCJzZXRDbGllbnRDdXJyZW50QnV0dG9uVGV4dCIsImNsaWVudHMiLCJzZXRDbGllbnRzIiwic2hvd0NsaWVudE1vZGFsIiwic2V0U2hvd0NsaWVudE1vZGFsIiwiY2xpZW50U2VsZWN0aW9uVHlwZSIsInNldENsaWVudFNlbGVjdGlvblR5cGUiLCJyb3V0ZXIiLCJ1c2VSb3V0ZXIiLCJsYWJlbEJhc2UiLCJsYWJlbEJhc2VOYW1lcyIsInNvcnRDaGVja0Jhc2UiLCJ3aXRoU29ydEljb24iLCJiYXNlTGFiZWxzIiwiYWN0aXZlSW5kZXgiLCJpc0Rlc2MiLCJtYXAiLCJ0ZXh0IiwiaSIsImFycm93IiwibGFiZWxzIiwic2V0TGFiZWxzIiwic29ydENoZWNrIiwic2V0U29ydENoZWNrIiwiaG92ZXJJbmRleCIsInNldEhvdmVySW5kZXgiLCJzZWxlY3RlZE1vZGVsIiwic2V0U2VsZWN0ZWRNb2RlbCIsImdQb3MiLCJzZXRHUG9zIiwiZ0lkZSIsInNldEdJZGUiLCJpc0RlbGV0aW5nIiwic2V0SXNEZWxldGluZyIsInBhZ2UiLCJzZXRQYWdlIiwicGFnZUN1cnNvcnMiLCJzZXRQYWdlQ3Vyc29ycyIsImhhc05leHRQYWdlIiwic2V0SGFzTmV4dFBhZ2UiLCJmZXRjaFNlcSIsInVzZVJlZiIsImJhY2tmaWxsSW5GbGlnaHQiLCJxdWVyeUVwb2NoIiwic2V0UXVlcnlFcG9jaCIsImxvYWRFcnJvciIsInNldExvYWRFcnJvciIsInRhYmxlQm9keVJlZiIsInJvd0hlaWdodFJlZiIsImhlYWRlckhlaWdodFJlZiIsIkxPQURfVElNRU9VVF9NUyIsInN0YXJ0TmFtZVRva2VuQmFja2ZpbGwiLCJ1c2VDYWxsYmFjayIsInJlYXNvbiIsImN1cnJlbnQiLCJsYXN0UnVuIiwid2luZG93IiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsIm5vdyIsIk51bWJlciIsImRiIiwiZmlyZWJhc2UiLCJmaXJlc3RvcmUiLCJsYXN0RG9jIiwidG9rZW5zRXF1YWwiLCJhIiwiYiIsInNldEEiLCJTZXQiLCJzZXRCIiwic2l6ZSIsInYiLCJoYXMiLCJxdWVyeSIsImNvbGxlY3Rpb24iLCJvcmRlckJ5IiwiRmllbGRQYXRoIiwiZG9jdW1lbnRJZCIsImxpbWl0Iiwic3RhcnRBZnRlciIsImdldCIsInNuYXAiLCJlbXB0eSIsImJhdGNoIiwid3JpdGVzIiwiZG9jcyIsImZvckVhY2giLCJkb2MiLCJkYXRhIiwibmFtZUxvd2VyIiwibmFtZVRva2VucyIsImJ1aWxkTmFtZVRva2VucyIsImV4aXN0aW5nVG9rZW5zIiwiQXJyYXkiLCJpc0FycmF5IiwiZnJvbSIsIm5lZWRzVXBkYXRlIiwidXBkYXRlIiwicmVmIiwiY29tbWl0Iiwic2V0SXRlbSIsImNvbnNvbGUiLCJlcnJvciIsInNlYXJjaExvd2VyIiwiaGFzQWN0aXZlRmlsdGVycyIsIkJvb2xlYW4iLCJ2YWx1ZU1hdGNoZXMiLCJzIiwic29tZSIsImluY2x1ZGVzIiwibWF0Y2hlc0ZpbHRlcnMiLCJ2aXNpYmxlIiwiT0VNIiwiTW9kYWxpdHkiLCJNb2RlbCIsImNsaWVudEZyb21JZCIsImNsaWVudEN1cnJlbnRJZCIsIndhbnRlZERheSIsIml0ZW1ZTUQiLCJkYXRlIiwiZGVzY3JpcHRpb25zIiwid29ya09yZGVycyIsInciLCJ3byIsIndvcmtPcmRlciIsInBuIiwic24iLCJkZXNjIiwiZGVzY3JpcHRpb24iLCJpZCIsImxvY2FsU04iLCJsb2NhbF9zbiIsInJlc2V0UGFnaW5hdGlvbiIsImFzUGF0aCIsImZldGNoRGF0YSIsImV2ZW50cyIsImhhbmRsZURvbmUiLCJvbiIsIm9mZiIsInJlcXVlc3RlZFBhZ2UiLCJzZXEiLCJ0aW1lZE91dCIsInRpbWVvdXRJZCIsImNvZGUiLCJtZXNzYWdlIiwiTWF0aCIsInJvdW5kIiwiaW5wdXRUZXh0Iiwic2VsZWN0ZWRUeXBlIiwic3RhcnRBZnRlckRvYyIsImNsZWFyVGltZW91dCIsImVmZmVjdGl2ZVNlbGVjdCIsImVmZmVjdGl2ZVNlYXJjaCIsImVmZmVjdGl2ZVNlYXJjaExvd2VyIiwibG9hZCIsImF0dGVtcHQiLCJmZXRjaFBhcnRzV2l0aE1hY2hpbmVEYXRhUGFnZSIsInZpc2libGVPbmx5IiwiZmlsdGVyRm4iLCJyYXciLCJuZWVkc01hY2hpbmVEYXRhIiwiciIsInBvdyIsIm5leHRQYWdlIiwiaGFzTmFtZVNlYXJjaCIsInByZXYiLCJuZXh0Iiwic2V0U2VsZWN0ZWRJdGVtcyIsImF1Z21lbnRlZCIsIkNsaWVudEZyb20iLCJDbGllbnRDdXJyZW50IiwiZmlsdGVyIiwic2VhcmNoQ2hhbmdlSGFuZGxlciIsImV2ZW50IiwidGFyZ2V0IiwiYmFzZSIsInNvcnRDaGVja0FsbCIsInBvcyIsIm5leHRTb3J0Q2hlY2siLCJzb3J0ZWRJbmZvIiwic29ydCIsInRhIiwidGIiLCJhdiIsInRvU3RyaW5nIiwiYnYiLCJsb2NhbGVDb21wYXJlIiwiYW4iLCJibiIsInJvd1NlbGVjdCIsImxvZyIsInB1c2giLCJzZWxlY3RlZEl0ZW1zIiwic2hvd0RlbGV0ZU1vZGFsIiwic2V0U2hvd0RlbGV0ZU1vZGFsIiwiaGFuZGxlU2VsZWN0SXRlbSIsIngiLCJoYW5kbGVTaG93RGVsZXRlTW9kYWwiLCJoYW5kbGVDbG9zZURlbGV0ZU1vZGFsIiwiaGFuZGxlRGVsZXRlU2VsZWN0ZWQiLCJpdGVtSWQiLCJkZWxldGVGcm9tU3RvcmFnZSIsImhhbmRsZUNsb3NlIiwiaGFuZGxlU2hvdyIsImNoZWNrRGVsZXRlIiwiaWRzVG9EZWxldGUiLCJwcmV2ZW50RGVmYXVsdCIsInN0b3BQcm9wYWdhdGlvbiIsImhvdmVyU3R5bGUiLCJpbmRleCIsImJhY2tncm91bmRDb2xvciIsInRleHRBbGlnbiIsImN1cnNvciIsImRyb3Bkb3duMVRleHQiLCJzZXREcm9wZG93bjFUZXh0IiwiZHJvcGRvd24yVGV4dCIsInNldERyb3Bkb3duMlRleHQiLCJoYW5kbGVTZWxlY3QxIiwiZXZlbnRLZXkiLCJ0ZXh0Q29udGVudCIsImhhbmRsZVNlbGVjdDIiLCJidWlsZENsaWVudHNGcm9tSXRlbXMiLCJmaWx0ZXJlZCIsIml0IiwiYWRkIiwib3V0IiwiaWRBcnJheSIsImNodW5rIiwic2xpY2UiLCJ3aGVyZSIsImhhbmRsZUNsaWVudENsaWNrIiwic2FmZUNsaWVudHMiLCJmZXRjaENsaWVudHMiLCJjbGllbnRzRGF0YSIsImRlcml2ZWQiLCJzZXRDbGllbnRTZWFyY2hUZXJtIiwiaGFuZGxlQ2xpZW50U2VsZWN0IiwiY2xpZW50SWQiLCJjbGllbnRTbmFwIiwiZXhpc3RzIiwiY2xpZW50RGF0YSIsImhhbmRsZUNsaWVudEluZm8iLCJjbGllbnROYW1lIiwiaGFuZGxlQ2xlYXJDbGllbnRTZWxlY3Rpb24iLCJtb2RlbHMiLCJzZXRNb2RlbHMiLCJzaG93TW9kZWxNb2RhbCIsInNldFNob3dNb2RlbE1vZGFsIiwibW9kZWxCdXR0b25UZXh0Iiwic2V0TW9kZWxCdXR0b25UZXh0IiwiaGFuZGxlTW9kZWxDbGljayIsImZldGNoTW9kZWxzIiwibW9kZWxzRGF0YSIsInNldE1vZGVsU2VhcmNoVGVybSIsImhhbmRsZU1vZGVsU2VsZWN0IiwibW9kZWxOYW1lIiwiaGFuZGxlQ2xlYXJNb2RlbFNlbGVjdGlvbiIsImhhbmRsZVNvQ2FsV2FyZWhvdXNlQ2xpY2siLCJoYW5kbGVOb3JDYWxXYXJlaG91c2VDbGljayIsImhhbmRsZVdhcmVob3VzZVVuYXNzaWduZWRDbGljayIsImNsaWVudFNlYXJjaFRlcm0iLCJtb2RlbFNlYXJjaFRlcm0iLCJzdG9yYWdlUmVmIiwic3RvcmFnZSIsImZvbGRlclJlZiIsImNoaWxkIiwibGlzdEFsbCIsImxpc3RSZXN1bHQiLCJkZWxldGVQcm9taXNlcyIsIml0ZW1zIiwiYWxsIiwiZGVsZXRlRnJvbVBhcnRzQ29sbGVjdGlvbiIsInRvdGFsS25vd25QYWdlcyIsIm1heCIsInBhZ2VCdXR0b25zIiwiYnV0dG9ucyIsIm1heFZpc2libGUiLCJwdXNoUGFnZSIsInAiLCJwdXNoRWxsaXBzaXMiLCJzdGFydCIsImVuZCIsIm1pbiIsImRlc2lyZWRXaW5kb3ciLCJjdXJyZW50V2luZG93IiwicmVtYWluaW5nIiwicmVjYWxjUGFnZVNpemUiLCJjb250YWluZXJIZWlnaHQiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJoZWlnaHQiLCJoZWFkZXJSb3ciLCJxdWVyeVNlbGVjdG9yIiwiYm9keVJvdyIsImgiLCJ2ZXJ0aWNhbFBhZGRpbmciLCJhdmFpbGFibGUiLCJlc3RpbWF0ZWQiLCJmbG9vciIsImNsYW1wZWQiLCJvblJlc2l6ZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwicmVuZGVyRmlsdGVycyIsImlkUHJlZml4Iiwic3R5bGVzIiwiZmlsdGVyc1BhbmVsIiwiZmlsdGVyc0hlYWRlciIsImZpbHRlcnNUaXRsZSIsImZpbHRlcnNTdWJ0aXRsZSIsImZpbHRlcnNCYWRnZSIsImZpbHRlclNlY3Rpb24iLCJmaWx0ZXJTZWN0aW9uVGl0bGUiLCJpbnB1dEdyb3VwIiwiaW5wdXRCdXR0b24iLCJidXR0b25Hcm91cCIsImZsZXhCdXR0b24iLCJsb2FkaW5nT3ZlcmxheSIsImxvYWRpbmdMb2dvIiwiZSIsImNsaWVudCIsIm1vZGVsIiwicGFnZUlubmVyIiwiaGVhZGVyIiwiaGVhZGVyTGVmdCIsImJ1cmdlciIsImJyYW5kIiwiYnJhbmRMb2dvIiwiYnJhbmROYW1lIiwiYnJhbmRTdWIiLCJoZWFkZXJSaWdodCIsImhlYWRlclN0YXR1cyIsImNvbnRlbnQiLCJzaWRlYmFyIiwibWFpbiIsInRhYmxlQ2FyZCIsInRhYmxlSGVhZGVyIiwidGFibGVUaXRsZSIsInRhYmxlU3VidGl0bGUiLCJ0YWJsZU1ldGEiLCJ0YWJsZUJvZHkiLCJsb2FkaW5nU3RhdGUiLCJsb2FkaW5nVGV4dCIsImVycm9yU3RhdGUiLCJlcnJvclRpdGxlIiwiZXJyb3JNZXNzYWdlIiwidGFibGVGb290ZXIiLCJwYWdpbmF0aW9uUm93Iiwic2VhcmNoUm93Iiwic2VhcmNoSW5wdXQiLCJzZWFyY2hTZWxlY3QiLCJmb290ZXJBY3Rpb25zIiwiYWN0aW9uQnV0dG9uIiwiZmlsdGVyc0RyYXdlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQVdBO0FBQ0E7QUFDQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0NBR0E7O0FBQ0EsSUFBTUEsZUFBZSxHQUFHLFVBQXhCO0FBQ0EsSUFBTUMsZ0JBQWdCLEdBQUcsVUFBekI7QUFDQSxJQUFNQyxvQkFBb0IsR0FBRyxVQUE3QjtBQUNBLElBQU1DLGlCQUFpQixHQUFHLEVBQTFCLEMsQ0FHQTs7QUFDQSxTQUFTQyxzQkFBVCxHQUFrQztBQUNoQyxTQUFPLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFEO0FBQUEsV0FBYUMsVUFBVSxDQUFDRCxPQUFELEVBQVUsSUFBVixDQUF2QjtBQUFBLEdBQVosQ0FBUDtBQUNELEMsQ0FFRDs7O0FBQ0EsU0FBU0UsYUFBVCxPQUF5RDtBQUFBOztBQUFBLE1BQWhDQyxJQUFnQyxRQUFoQ0EsSUFBZ0M7QUFBQSxNQUExQkMsSUFBMEIsUUFBMUJBLElBQTBCO0FBQUEsTUFBcEJDLEtBQW9CLFFBQXBCQSxLQUFvQjtBQUFBLE1BQWJDLFNBQWEsUUFBYkEsU0FBYTs7QUFBQSxrQkFDdkJDLHNEQUFRLENB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LE1BQUMseURBQUQ7QUFDRSxRQUFJLEVBQUUzWCxXQURSO0FBRUUsVUFBTSxFQUFFO0FBQUEsYUFBTUMsY0FBYyxDQUFDLEtBQUQsQ0FBcEI7QUFBQSxLQUZWO0FBR0UsYUFBUyxFQUFDLE9BSFo7QUFJRSxhQUFTLEVBQUUyVSxxRUFBTSxDQUFDZ0QsYUFKcEI7QUFLRSxVQUFNLE1BTFI7QUFNRSxZQUFRLE1BTlY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQVFFLE1BQUMseURBQUQsQ0FBVyxNQUFYO0FBQWtCLGVBQVcsTUFBN0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFLE1BQUMseURBQUQsQ0FBVyxLQUFYO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFERixDQVJGLEVBV0UsTUFBQyx5REFBRCxDQUFXLElBQVg7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUFpQmxELGFBQWEsQ0FBQyxRQUFELENBQTlCLENBWEYsQ0F0TkYsQ0E5RUYsQ0FERjtBQXVURDs7SUE1NEN1QnhWLFU7VUFDRkMsaUUsRUE0QkxnRCxxRDs7O01BN0JPakQsVSIsImZpbGUiOiJzdGF0aWMvd2VicGFjay9wYWdlcy9OZXdTZWFyY2gvbWFpblNlYXJjaC44MDcyZjViYzc4MTlkOTA5YjQyZS5ob3QtdXBkYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUsIHVzZVJlZiwgdXNlQ2FsbGJhY2sgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7XG4gIElucHV0R3JvdXAsXG4gIERyb3Bkb3duLFxuICBGb3JtQ29udHJvbCxcbiAgQnV0dG9uLFxuICBOYXZEcm9wZG93bixcbiAgRm9ybSxcbiAgTW9kYWwsXG4gIFBhZ2luYXRpb24sXG4gIE9mZmNhbnZhcyxcbn0gZnJvbSBcInJlYWN0LWJvb3RzdHJhcFwiO1xuaW1wb3J0IExpbmsgZnJvbSBcIm5leHQvbGlua1wiO1xuaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSBcIm5leHQvcm91dGVyXCI7XG5pbXBvcnQge1xuICBmZXRjaFBhcnRzV2l0aE1hY2hpbmVEYXRhUGFnZSxcbiAgZmV0Y2hDbGllbnRzLFxuICBmZXRjaE1vZGVscyxcbn0gZnJvbSBcIi4uLy4uL3V0aWxzL2ZldGNoQXNzb2NpYXRpb25zXCI7XG5pbXBvcnQgeyB1c2VBdXRoIH0gZnJvbSBcIi4uLy4uL2NvbnRleHQvQXV0aFVzZXJDb250ZXh0XCI7XHJcbmltcG9ydCBMb2dnZWRJbiBmcm9tIFwiLi4vTG9nZ2VkSW5cIjtcclxuaW1wb3J0IENsaWVudFRhYmxlIGZyb20gXCIuLi8uLi91dGlscy9DbGllbnRUYWJsZVwiO1xyXG5pbXBvcnQgTW9kZWxUYWJsZSBmcm9tIFwiLi4vLi4vdXRpbHMvTW9kZWxUYWJsZVwiO1xyXG5pbXBvcnQgUGFydFRhYmxlIGZyb20gXCIuLi8uLi91dGlscy9QYXJ0VGFibGVcIjtcbmltcG9ydCBzdHlsZXMgZnJvbSBcIi4uLy4uL3N0eWxlcy9NYWluU2VhcmNoLm1vZHVsZS5jc3NcIjtcbmltcG9ydCBmaXJlYmFzZSBmcm9tIFwiLi4vLi4vY29udGV4dC9GaXJlYmFzZVwiO1xuaW1wb3J0IHsgYnVpbGROYW1lVG9rZW5zIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2l0ZW1Gb3JtU2hhcmVkXCI7XG5cclxuLy8gUHJlZGVmaW5lZCB3YXJlaG91c2UgY2xpZW50IElEcyBhbmQgZGlzcGxheSBuYW1lc1xyXG5jb25zdCBTT0NBTF9DTElFTlRfSUQgPSBcIkFJUzE3MTgyXCI7XHJcbmNvbnN0IE5PUkNBTF9DTElFTlRfSUQgPSBcIkFJUzI1MDk3XCI7XG5jb25zdCBVTkFTU0lHTkVEX0NMSUVOVF9JRCA9IFwiQUlTMDA0MDRcIjtcbmNvbnN0IERFRkFVTFRfUEFHRV9TSVpFID0gMjU7XG5cclxuXHJcbi8vIFNpbXVsYXRlcyBhIG5ldHdvcmsgcmVxdWVzdCBkZWxheVxyXG5mdW5jdGlvbiBzaW11bGF0ZU5ldHdvcmtSZXF1ZXN0KCkge1xyXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gc2V0VGltZW91dChyZXNvbHZlLCAyMDAwKSk7XHJcbn1cclxuXHJcbi8vIEN1c3RvbSBMb2FkaW5nQnV0dG9uIGNvbXBvbmVudFxyXG5mdW5jdGlvbiBMb2FkaW5nQnV0dG9uKHsgdHlwZSwgbmFtZSwgcm91dGUsIGNsYXNzTmFtZSB9KSB7XG4gIGNvbnN0IFtpc0xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKGlzTG9hZGluZykge1xuICAgICAgbGV0IGNhbmNlbGxlZCA9IGZhbHNlO1xuICAgICAgc2ltdWxhdGVOZXR3b3JrUmVxdWVzdCgpLnRoZW4oKCkgPT4ge1xuICAgICAgICBpZiAoIWNhbmNlbGxlZCkgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGNhbmNlbGxlZCA9IHRydWU7XG4gICAgICB9O1xuICAgIH1cbiAgfSwgW2lzTG9hZGluZ10pO1xuXHJcbiAgcmV0dXJuIChcbiAgICA8TGluayBocmVmPXtgLyR7cm91dGV9YH0+XG4gICAgICA8YVxuICAgICAgICBjbGFzc05hbWU9e2BidG4gYnRuLSR7dHlwZX0gJHtjbGFzc05hbWUgfHwgXCJcIn1gfVxuICAgICAgICBkaXNhYmxlZD17aXNMb2FkaW5nfVxuICAgICAgICBvbkNsaWNrPXsoKSA9PiAhaXNMb2FkaW5nICYmIHNldExvYWRpbmcodHJ1ZSl9XG4gICAgICA+XG4gICAgICAgIHtpc0xvYWRpbmcgPyBcIkxvYWRpbmfigKZcIiA6IG5hbWV9XHJcbiAgICAgIDwvYT5cclxuICAgIDwvTGluaz5cclxuICApO1xyXG59XHJcblxyXG4vLyAtLS0tIERBVEUgSEVMUEVSUyAodG9wLWxldmVsIHNjb3BlKSAtLS0tXHJcblxyXG4vLyBDb252ZXJ0IGFueXRoaW5nIGRhdGUtaXNoIGludG8gYSB0aW1lc3RhbXAgKG1zIHNpbmNlIGVwb2NoKS5cclxuZnVuY3Rpb24gdG9UaW1lKHZhbHVlKSB7XHJcbiAgaWYgKCF2YWx1ZSkgcmV0dXJuIG51bGw7XHJcblxyXG4gIC8vIEZpcmVzdG9yZSBUaW1lc3RhbXAgeyBzZWNvbmRzLCBuYW5vc2Vjb25kcyB9XHJcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZS5zZWNvbmRzICE9IG51bGwpIHtcclxuICAgIHRyeSB7IHJldHVybiB2YWx1ZS5zZWNvbmRzICogMTAwMDsgfSBjYXRjaCB7IC8qIGlnbm9yZSAqLyB9XHJcbiAgfVxyXG5cclxuICAvLyBOYXRpdmUgRGF0ZVxyXG4gIGlmICh2YWx1ZSBpbnN0YW5jZW9mIERhdGUpIHtcclxuICAgIGNvbnN0IHQgPSB2YWx1ZS5nZXRUaW1lKCk7XHJcbiAgICByZXR1cm4gaXNOYU4odCkgPyBudWxsIDogdDtcclxuICB9XHJcblxyXG4gIC8vIFN0cmluZ3NcclxuICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAvLyBJU08gLyB5eXl5LW1tLWRkXHJcbiAgICBjb25zdCBpc28gPSBEYXRlLnBhcnNlKHZhbHVlKTtcclxuICAgIGlmICghaXNOYU4oaXNvKSkgcmV0dXJuIGlzbztcclxuXHJcbiAgICAvLyBtbS9kZC95eXl5XHJcbiAgICBjb25zdCBwYXJ0cyA9IHZhbHVlLnNwbGl0KFwiL1wiKTtcclxuICAgIGlmIChwYXJ0cy5sZW5ndGggPT09IDMpIHtcclxuICAgICAgY29uc3QgW21tLCBkZCwgeXl5eV0gPSBwYXJ0cztcclxuICAgICAgY29uc3QgYWx0ID0gRGF0ZS5wYXJzZShgJHt5eXl5fS0ke21tfS0ke2RkfWApO1xyXG4gICAgICBpZiAoIWlzTmFOKGFsdCkpIHJldHVybiBhbHQ7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBMYXN0IHJlc29ydFxyXG4gIGNvbnN0IHQgPSBEYXRlLnBhcnNlKHZhbHVlKTtcclxuICByZXR1cm4gaXNOYU4odCkgPyBudWxsIDogdDtcclxufVxyXG5cclxuLy8gQ2Fub25pY2FsaXplIHRvICd5eXl5LW1tLWRkJyAobWF0Y2hlcyA8aW5wdXQgdHlwZT1cImRhdGVcIj4pXHJcbmZ1bmN0aW9uIHRvWU1EKHZhbHVlKSB7XG4gIGNvbnN0IHQgPSB0b1RpbWUodmFsdWUpO1xuICBpZiAodCA9PSBudWxsKSByZXR1cm4gbnVsbDtcbiAgY29uc3QgZCA9IG5ldyBEYXRlKHQpO1xuICBjb25zdCB5eXl5ID0gZC5nZXRGdWxsWWVhcigpO1xuICBjb25zdCBtbSA9IFN0cmluZyhkLmdldE1vbnRoKCkgKyAxKS5wYWRTdGFydCgyLCBcIjBcIik7XG4gIGNvbnN0IGRkID0gU3RyaW5nKGQuZ2V0RGF0ZSgpKS5wYWRTdGFydCgyLCBcIjBcIik7XG4gIHJldHVybiBgJHt5eXl5fS0ke21tfS0ke2RkfWA7XG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZVRleHQodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09IG51bGwpIHJldHVybiBcIlwiO1xuICByZXR1cm4gU3RyaW5nKHZhbHVlKS50b0xvd2VyQ2FzZSgpLnRyaW0oKTtcbn1cblxuZnVuY3Rpb24gZ2V0TWFjaGluZUZpZWxkKGl0ZW0sIGtleSkge1xuICBpZiAoIWl0ZW0pIHJldHVybiBudWxsO1xuICBjb25zdCBsb3dlciA9IGtleS50b0xvd2VyQ2FzZSgpO1xuICByZXR1cm4gKFxuICAgIGl0ZW0/Lm1hY2hpbmVEYXRhPy5ba2V5XSA/P1xuICAgIGl0ZW0/Lm1hY2hpbmVEYXRhPy5bbG93ZXJdID8/XG4gICAgaXRlbT8uY3VycmVudE1hY2hpbmVEYXRhPy5ba2V5XSA/P1xuICAgIGl0ZW0/LmN1cnJlbnRNYWNoaW5lRGF0YT8uW2xvd2VyXSA/P1xuICAgIGl0ZW0/LnRoZU1hY2hpbmVEYXRhPy5ba2V5XSA/P1xuICAgIGl0ZW0/LnRoZU1hY2hpbmVEYXRhPy5bbG93ZXJdID8/XG4gICAgaXRlbT8uVGhlTWFjaGluZT8uW2tleV0gPz9cbiAgICBpdGVtPy5UaGVNYWNoaW5lPy5bbG93ZXJdID8/XG4gICAgbnVsbFxuICApO1xufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIE1haW5TZWFyY2goKSB7XG4gIGNvbnN0IHsgc2lnbk91dCB9ID0gdXNlQXV0aCgpO1xyXG4gIGNvbnN0IFtpbmZvLCBzZXRJbmZvXSA9IHVzZVN0YXRlKFtdKTtcclxuICBjb25zdCBbYmFja3VwSW5mbywgc2V0QmFja3VwSW5mb10gPSB1c2VTdGF0ZShbXSk7XHJcbiAgY29uc3QgW2F1Z21lbnRlZEluZm8sIHNldEF1Z21lbnRlZEluZm9dID0gdXNlU3RhdGUoW10pOyAvLyBpdGVtcyB3aXRoIGNsaWVudEZyb21JZC9jdXJyZW50SWQgYWRkZWRcclxuICBjb25zdCBbaXNMb2FkaW5nLCBzZXRJc0xvYWRpbmddID0gdXNlU3RhdGUodHJ1ZSk7XHJcbiAgY29uc3QgW2lkcywgc2V0SURdID0gdXNlU3RhdGUoW10pO1xuICBjb25zdCBbc2hvdywgc2V0U2hvd10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtzaG93RmlsdGVycywgc2V0U2hvd0ZpbHRlcnNdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbcGFnZVNpemUsIHNldFBhZ2VTaXplXSA9IHVzZVN0YXRlKERFRkFVTFRfUEFHRV9TSVpFKTtcbiAgY29uc3QgW2lzTmF2aWdhdGluZywgc2V0SXNOYXZpZ2F0aW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2RJdGVtLCBzZXRESXRlbV0gPSB1c2VTdGF0ZSgpO1xyXG4gIGNvbnN0IFtzZWxlY3QsIHNldFNlbGVjdF0gPSB1c2VTdGF0ZShcIk5hbWVcIik7XHJcbiAgY29uc3QgW3Nob3dMaXN0LCBzZXRTaG93TGlzdF0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW3Nob3dMaXN0U2VhcmNoLCBzZXRTaG93TGlzdFNlYXJjaF0gPSB1c2VTdGF0ZShcInRleHRcIik7XHJcbiAgY29uc3QgW3NlYXJjaCwgc2V0U2VhcmNoXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtzZWxlY3RlZE9FTSwgc2V0U2VsZWN0ZWRPRU1dID0gdXNlU3RhdGUobnVsbCk7XHJcbiAgY29uc3QgW3NlbGVjdGVkTW9kYWxpdHksIHNldFNlbGVjdGVkTW9kYWxpdHldID0gdXNlU3RhdGUobnVsbCk7XHJcbiAgLy8gUmVwbGFjZSB0aGUgb2xkIHNpbmdsZSBjbGllbnQgc3RhdGUgd2l0aCB0d28gc2V0czpcclxuICBjb25zdCBbc2VsZWN0ZWRDbGllbnRGcm9tLCBzZXRTZWxlY3RlZENsaWVudEZyb21dID0gdXNlU3RhdGUobnVsbCk7XHJcbiAgY29uc3QgW2NsaWVudEZyb21CdXR0b25UZXh0LCBzZXRDbGllbnRGcm9tQnV0dG9uVGV4dF0gPSB1c2VTdGF0ZShcIlNlbGVjdCBPcHRpb25cIik7XHJcbiAgY29uc3QgW3NlbGVjdGVkQ2xpZW50Q3VycmVudCwgc2V0U2VsZWN0ZWRDbGllbnRDdXJyZW50XSA9IHVzZVN0YXRlKG51bGwpO1xyXG4gIGNvbnN0IFtjbGllbnRDdXJyZW50QnV0dG9uVGV4dCwgc2V0Q2xpZW50Q3VycmVudEJ1dHRvblRleHRdID0gdXNlU3RhdGUoXCJTZWxlY3QgT3B0aW9uXCIpO1xyXG5cclxuICBjb25zdCBbY2xpZW50cywgc2V0Q2xpZW50c10gPSB1c2VTdGF0ZShbXSk7XHJcbiAgY29uc3QgW3Nob3dDbGllbnRNb2RhbCwgc2V0U2hvd0NsaWVudE1vZGFsXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICAvLyBUaGlzIHN0YXRlIHRlbGxzIHRoZSBtb2RhbCB3aGljaCBjbGllbnQgYm94IGlzIGJlaW5nIHVwZGF0ZWQ6IFwiZnJvbVwiIG9yIFwiY3VycmVudFwiXHJcbiAgY29uc3QgW2NsaWVudFNlbGVjdGlvblR5cGUsIHNldENsaWVudFNlbGVjdGlvblR5cGVdID0gdXNlU3RhdGUobnVsbCk7XHJcblxyXG4gIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpO1xyXG4gIGNvbnN0IGxhYmVsQmFzZSA9IFtcIm5hbWVcIiwgXCJkYXRlXCIsIFwidy9vXCIsIFwicC9uXCIsIFwicy9uXCJdO1xyXG4gIGNvbnN0IGxhYmVsQmFzZU5hbWVzID0gW1wibmFtZVwiLCBcImRhdGVcIiwgXCJ3b1wiLCBcInBuXCIsIFwic25cIl07XHJcbiAgY29uc3Qgc29ydENoZWNrQmFzZSA9IFtmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlXTtcclxuXHJcbiAgZnVuY3Rpb24gd2l0aFNvcnRJY29uKGJhc2VMYWJlbHMsIGFjdGl2ZUluZGV4LCBpc0Rlc2MpIHtcclxuICAgIHJldHVybiBiYXNlTGFiZWxzLm1hcCgodGV4dCwgaSkgPT4ge1xyXG4gICAgICBpZiAoaSAhPT0gYWN0aXZlSW5kZXgpIHJldHVybiB0ZXh0OyAvLyB1bnRvdWNoZWRcclxuICAgICAgY29uc3QgYXJyb3cgPSBpc0Rlc2MgPyBcIiDilrxcIiA6IFwiIOKWslwiO1xyXG4gICAgICByZXR1cm4gYCR7dGV4dH0ke2Fycm93fWA7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG5cclxuICBjb25zdCBbbGFiZWxzLCBzZXRMYWJlbHNdID0gdXNlU3RhdGUobGFiZWxCYXNlKTtcclxuICBjb25zdCBbc29ydENoZWNrLCBzZXRTb3J0Q2hlY2tdID0gdXNlU3RhdGUoc29ydENoZWNrQmFzZSk7XHJcbiAgY29uc3QgW2hvdmVySW5kZXgsIHNldEhvdmVySW5kZXhdID0gdXNlU3RhdGUobnVsbCk7XHJcbiAgY29uc3QgW3NlbGVjdGVkTW9kZWwsIHNldFNlbGVjdGVkTW9kZWxdID0gdXNlU3RhdGUobnVsbCk7XHJcbiAgY29uc3QgW2dQb3MsIHNldEdQb3NdID0gdXNlU3RhdGUobnVsbCk7XG4gIGNvbnN0IFtnSWRlLCBzZXRHSWRlXSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbaXNEZWxldGluZywgc2V0SXNEZWxldGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtwYWdlLCBzZXRQYWdlXSA9IHVzZVN0YXRlKDEpO1xuICBjb25zdCBbcGFnZUN1cnNvcnMsIHNldFBhZ2VDdXJzb3JzXSA9IHVzZVN0YXRlKFtdKTtcbiAgY29uc3QgW2hhc05leHRQYWdlLCBzZXRIYXNOZXh0UGFnZV0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IGZldGNoU2VxID0gdXNlUmVmKDApO1xuICBjb25zdCBiYWNrZmlsbEluRmxpZ2h0ID0gdXNlUmVmKGZhbHNlKTtcbiAgY29uc3QgW3F1ZXJ5RXBvY2gsIHNldFF1ZXJ5RXBvY2hdID0gdXNlU3RhdGUoMCk7XG4gIGNvbnN0IFtsb2FkRXJyb3IsIHNldExvYWRFcnJvcl0gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgdGFibGVCb2R5UmVmID0gdXNlUmVmKG51bGwpO1xuICBjb25zdCByb3dIZWlnaHRSZWYgPSB1c2VSZWYoNDYpO1xuICBjb25zdCBoZWFkZXJIZWlnaHRSZWYgPSB1c2VSZWYoMzgpO1xuXG4gIGNvbnN0IExPQURfVElNRU9VVF9NUyA9IDMwMDAwO1xuXG4gIGNvbnN0IHN0YXJ0TmFtZVRva2VuQmFja2ZpbGwgPSB1c2VDYWxsYmFjayhhc3luYyAocmVhc29uID0gXCJcIikgPT4ge1xuICAgIGlmIChiYWNrZmlsbEluRmxpZ2h0LmN1cnJlbnQpIHJldHVybjtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgY29uc3QgbGFzdFJ1biA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIm5hbWVUb2tlbnNCYWNrZmlsbEF0XCIpO1xuICAgICAgaWYgKGxhc3RSdW4gJiYgRGF0ZS5ub3coKSAtIE51bWJlcihsYXN0UnVuKSA8IDI0ICogNjAgKiA2MCAqIDEwMDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIGJhY2tmaWxsSW5GbGlnaHQuY3VycmVudCA9IHRydWU7XG4gICAgY29uc3QgZGIgPSBmaXJlYmFzZS5maXJlc3RvcmUoKTtcbiAgICBsZXQgbGFzdERvYyA9IG51bGw7XG5cbiAgICBjb25zdCB0b2tlbnNFcXVhbCA9IChhLCBiKSA9PiB7XG4gICAgICBpZiAoYS5sZW5ndGggIT09IGIubGVuZ3RoKSByZXR1cm4gZmFsc2U7XG4gICAgICBjb25zdCBzZXRBID0gbmV3IFNldChhKTtcbiAgICAgIGNvbnN0IHNldEIgPSBuZXcgU2V0KGIpO1xuICAgICAgaWYgKHNldEEuc2l6ZSAhPT0gc2V0Qi5zaXplKSByZXR1cm4gZmFsc2U7XG4gICAgICBmb3IgKGNvbnN0IHYgb2Ygc2V0QSkgaWYgKCFzZXRCLmhhcyh2KSkgcmV0dXJuIGZhbHNlO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcblxuICAgIHRyeSB7XG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICBsZXQgcXVlcnkgPSBkYlxuICAgICAgICAgIC5jb2xsZWN0aW9uKFwiVGVzdFwiKVxuICAgICAgICAgIC5vcmRlckJ5KGZpcmViYXNlLmZpcmVzdG9yZS5GaWVsZFBhdGguZG9jdW1lbnRJZCgpKVxuICAgICAgICAgIC5saW1pdCgyMDApO1xuICAgICAgICBpZiAobGFzdERvYykgcXVlcnkgPSBxdWVyeS5zdGFydEFmdGVyKGxhc3REb2MpO1xuXG4gICAgICAgIGNvbnN0IHNuYXAgPSBhd2FpdCBxdWVyeS5nZXQoKTtcbiAgICAgICAgaWYgKHNuYXAuZW1wdHkpIGJyZWFrO1xuXG4gICAgICAgIGNvbnN0IGJhdGNoID0gZGIuYmF0Y2goKTtcbiAgICAgICAgbGV0IHdyaXRlcyA9IDA7XG5cbiAgICAgICAgc25hcC5kb2NzLmZvckVhY2goKGRvYykgPT4ge1xuICAgICAgICAgIGNvbnN0IGRhdGEgPSBkb2MuZGF0YSgpIHx8IHt9O1xuICAgICAgICAgIGNvbnN0IG5hbWUgPSB0eXBlb2YgZGF0YS5uYW1lID09PSBcInN0cmluZ1wiID8gZGF0YS5uYW1lIDogXCJcIjtcbiAgICAgICAgICBjb25zdCBuYW1lTG93ZXIgPSBuYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgY29uc3QgbmFtZVRva2VucyA9IGJ1aWxkTmFtZVRva2VucyhuYW1lKTtcbiAgICAgICAgICBjb25zdCBleGlzdGluZ1Rva2VucyA9IEFycmF5LmlzQXJyYXkoZGF0YS5uYW1lVG9rZW5zKVxuICAgICAgICAgICAgPyBBcnJheS5mcm9tKG5ldyBTZXQoZGF0YS5uYW1lVG9rZW5zLm1hcCgodikgPT4gU3RyaW5nKHYpKSkpXG4gICAgICAgICAgICA6IFtdO1xuXG4gICAgICAgICAgY29uc3QgbmVlZHNVcGRhdGUgPVxuICAgICAgICAgICAgZGF0YS5uYW1lTG93ZXIgIT09IG5hbWVMb3dlciB8fFxuICAgICAgICAgICAgIXRva2Vuc0VxdWFsKGV4aXN0aW5nVG9rZW5zLCBuYW1lVG9rZW5zKTtcblxuICAgICAgICAgIGlmIChuZWVkc1VwZGF0ZSkge1xuICAgICAgICAgICAgYmF0Y2gudXBkYXRlKGRvYy5yZWYsIHsgbmFtZUxvd2VyLCBuYW1lVG9rZW5zIH0pO1xuICAgICAgICAgICAgd3JpdGVzICs9IDE7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAod3JpdGVzID4gMCkge1xuICAgICAgICAgIGF3YWl0IGJhdGNoLmNvbW1pdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGFzdERvYyA9IHNuYXAuZG9jc1tzbmFwLmRvY3MubGVuZ3RoIC0gMV07XG4gICAgICAgIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIDI1KSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcbiAgICAgICAgICBcIm5hbWVUb2tlbnNCYWNrZmlsbEF0XCIsXG4gICAgICAgICAgU3RyaW5nKERhdGUubm93KCkpXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJOYW1lIHRva2VuIGJhY2tmaWxsIGZhaWxlZDpcIiwgcmVhc29uLCBlcnJvcik7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGJhY2tmaWxsSW5GbGlnaHQuY3VycmVudCA9IGZhbHNlO1xuICAgIH1cbiAgfSwgW10pO1xuXG4gIGNvbnN0IHNlYXJjaExvd2VyID0gKHNlYXJjaCB8fCBcIlwiKS50b0xvd2VyQ2FzZSgpLnRyaW0oKTtcbiAgY29uc3QgaGFzQWN0aXZlRmlsdGVycyA9XG4gICAgQm9vbGVhbihzZWxlY3RlZE9FTSkgfHxcbiAgICBCb29sZWFuKHNlbGVjdGVkTW9kYWxpdHkpIHx8XG4gICAgQm9vbGVhbihzZWxlY3RlZE1vZGVsKSB8fFxuICAgIEJvb2xlYW4oc2VsZWN0ZWRDbGllbnRGcm9tKSB8fFxuICAgIEJvb2xlYW4oc2VsZWN0ZWRDbGllbnRDdXJyZW50KSB8fFxuICAgIEJvb2xlYW4oc2VhcmNoTG93ZXIpO1xuXG4gIGNvbnN0IHZhbHVlTWF0Y2hlcyA9ICh2YWx1ZSwgcykgPT4ge1xuICAgIGlmICghdmFsdWUpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiB2YWx1ZS5zb21lKCh2KSA9PiB2YWx1ZU1hdGNoZXModiwgcykpO1xuICAgIH1cbiAgICByZXR1cm4gU3RyaW5nKHZhbHVlKS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHMpO1xuICB9O1xuXG4gIGNvbnN0IG1hdGNoZXNGaWx0ZXJzID0gdXNlQ2FsbGJhY2soXG4gICAgKGl0ZW0pID0+IHtcbiAgICAgIC8vIGhpZGUgZXhwbGljaXRseSBoaWRkZW4gaXRlbXNcbiAgICAgIGlmIChpdGVtPy52aXNpYmxlID09PSBmYWxzZSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAvLyBPRU0gLyBNb2RhbGl0eSAvIE1vZGVsIGZpbHRlcmluZ1xuICAgICAgY29uc3QgT0VNID0gZ2V0TWFjaGluZUZpZWxkKGl0ZW0sIFwiT0VNXCIpO1xuICAgICAgY29uc3QgTW9kYWxpdHkgPSBnZXRNYWNoaW5lRmllbGQoaXRlbSwgXCJNb2RhbGl0eVwiKTtcbiAgICAgIGNvbnN0IE1vZGVsID0gZ2V0TWFjaGluZUZpZWxkKGl0ZW0sIFwiTW9kZWxcIik7XG5cbiAgICAgIGlmIChzZWxlY3RlZE9FTSAmJiBub3JtYWxpemVUZXh0KE9FTSkgIT09IG5vcm1hbGl6ZVRleHQoc2VsZWN0ZWRPRU0pKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmIChcbiAgICAgICAgc2VsZWN0ZWRNb2RhbGl0eSAmJlxuICAgICAgICBub3JtYWxpemVUZXh0KE1vZGFsaXR5KSAhPT0gbm9ybWFsaXplVGV4dChzZWxlY3RlZE1vZGFsaXR5KVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmIChzZWxlY3RlZE1vZGVsICYmIG5vcm1hbGl6ZVRleHQoTW9kZWwpICE9PSBub3JtYWxpemVUZXh0KHNlbGVjdGVkTW9kZWwpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgLy8gQ2xpZW50IGZpbHRlcnNcbiAgICAgIGlmIChzZWxlY3RlZENsaWVudEZyb20gJiYgaXRlbT8uY2xpZW50RnJvbUlkICE9PSBzZWxlY3RlZENsaWVudEZyb20pIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKFxuICAgICAgICBzZWxlY3RlZENsaWVudEN1cnJlbnQgJiZcbiAgICAgICAgaXRlbT8uY2xpZW50Q3VycmVudElkICE9PSBzZWxlY3RlZENsaWVudEN1cnJlbnRcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIC8vIFNlYXJjaFxuICAgICAgaWYgKHNlYXJjaExvd2VyKSB7XG4gICAgICAgIGlmIChzZWxlY3QgPT09IFwiTmFtZVwiKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlTWF0Y2hlcyhpdGVtPy5uYW1lLCBzZWFyY2hMb3dlcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNlbGVjdCA9PT0gXCJEYXRlXCIpIHtcbiAgICAgICAgICBjb25zdCB3YW50ZWREYXkgPSBzZWFyY2hMb3dlcjsgLy8geXl5eS1tbS1kZCBmcm9tIGlucHV0XG4gICAgICAgICAgY29uc3QgaXRlbVlNRCA9IHRvWU1EKGl0ZW0/LmRhdGUpO1xuICAgICAgICAgIGlmIChpdGVtWU1EICYmIGl0ZW1ZTUQgPT09IHdhbnRlZERheSkgcmV0dXJuIHRydWU7XG4gICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoaXRlbT8uZGVzY3JpcHRpb25zKSkge1xuICAgICAgICAgICAgaWYgKGl0ZW0uZGVzY3JpcHRpb25zLnNvbWUoKGQpID0+IHRvWU1EKGQ/LmRhdGUpID09PSB3YW50ZWREYXkpKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShpdGVtPy53b3JrT3JkZXJzKSkge1xuICAgICAgICAgICAgaWYgKGl0ZW0ud29ya09yZGVycy5zb21lKCh3KSA9PiB0b1lNRCh3Py5kYXRlKSA9PT0gd2FudGVkRGF5KSkge1xuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzZWxlY3QgPT09IFwiV29yayBPcmRlclwiKSB7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIEFycmF5LmlzQXJyYXkoaXRlbT8ud29ya09yZGVycykgJiZcbiAgICAgICAgICAgIGl0ZW0ud29ya09yZGVycy5zb21lKCh3bykgPT5cbiAgICAgICAgICAgICAgdmFsdWVNYXRjaGVzKHdvPy53b3JrT3JkZXIsIHNlYXJjaExvd2VyKVxuICAgICAgICAgICAgKVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNlbGVjdCA9PT0gXCJQcm9kdWN0IE51bWJlclwiKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlTWF0Y2hlcyhpdGVtPy5wbiwgc2VhcmNoTG93ZXIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzZWxlY3QgPT09IFwiU2VyaWFsIE51bWJlclwiKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlTWF0Y2hlcyhpdGVtPy5zbiwgc2VhcmNoTG93ZXIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzZWxlY3QgPT09IFwiRGVzY3JpcHRpb25cIikge1xuICAgICAgICAgIGlmICh2YWx1ZU1hdGNoZXMoaXRlbT8uZGVzYywgc2VhcmNoTG93ZXIpKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICBpZiAodmFsdWVNYXRjaGVzKGl0ZW0/LmRlc2NyaXB0aW9uLCBzZWFyY2hMb3dlcikpIHJldHVybiB0cnVlO1xuICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGl0ZW0/LmRlc2NyaXB0aW9ucykpIHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtLmRlc2NyaXB0aW9ucy5zb21lKChkKSA9PlxuICAgICAgICAgICAgICB2YWx1ZU1hdGNoZXMoZD8uZGVzY3JpcHRpb24sIHNlYXJjaExvd2VyKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzZWxlY3QgPT09IFwiU0tVXCIpIHtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgdmFsdWVNYXRjaGVzKGl0ZW0/LmlkLCBzZWFyY2hMb3dlcikgfHxcbiAgICAgICAgICAgIHZhbHVlTWF0Y2hlcyhpdGVtPy5sb2NhbFNOLCBzZWFyY2hMb3dlcikgfHxcbiAgICAgICAgICAgIHZhbHVlTWF0Y2hlcyhpdGVtPy5sb2NhbF9zbiwgc2VhcmNoTG93ZXIpXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuICAgIFtcbiAgICAgIHNlbGVjdGVkT0VNLFxuICAgICAgc2VsZWN0ZWRNb2RhbGl0eSxcbiAgICAgIHNlbGVjdGVkTW9kZWwsXG4gICAgICBzZWxlY3RlZENsaWVudEZyb20sXG4gICAgICBzZWxlY3RlZENsaWVudEN1cnJlbnQsXG4gICAgICBzZWFyY2hMb3dlcixcbiAgICAgIHNlbGVjdCxcbiAgICBdXG4gICk7XG5cbiAgY29uc3QgcmVzZXRQYWdpbmF0aW9uID0gKCkgPT4ge1xuICAgIHNldFBhZ2UoMSk7XG4gICAgc2V0UGFnZUN1cnNvcnMoW10pO1xuICAgIHNldEhhc05leHRQYWdlKGZhbHNlKTtcbiAgfTtcblxuICAvLyBSZXNldCBwYWdpbmF0aW9uIG9uIHJvdXRlL3F1ZXJ5IGNoYW5nZSAocHJldmVudHMgc3RhbGUgcGFnZXMgbGlrZSDigJxzdGFydGluZyBhdCA24oCdKVxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHJlc2V0UGFnaW5hdGlvbigpO1xuICAgIHNldFF1ZXJ5RXBvY2goKHYpID0+IHYgKyAxKTtcbiAgfSwgW3JvdXRlci5hc1BhdGhdKTtcblxuICAvLyBSZXNldCBhbmQgcmVmZXRjaCB3aGVuIGZpbHRlcnMvc2VhcmNoIGNoYW5nZVxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHJlc2V0UGFnaW5hdGlvbigpO1xuICAgIHNldFF1ZXJ5RXBvY2goKHYpID0+IHYgKyAxKTtcbiAgfSwgW1xuICAgIHNlbGVjdGVkT0VNLFxuICAgIHNlbGVjdGVkTW9kYWxpdHksXG4gICAgc2VsZWN0ZWRNb2RlbCxcbiAgICBzZWxlY3RlZENsaWVudEZyb20sXG4gICAgc2VsZWN0ZWRDbGllbnRDdXJyZW50LFxuICAgIHNlYXJjaCxcbiAgICBzZWxlY3QsXG4gIF0pO1xuXG5cbiAgLy8gRmV0Y2ggZGF0YSBvbiBjb21wb25lbnQgbW91bnQgYW5kIHJvdXRlIGNoYW5nZVxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGZldGNoRGF0YShwYWdlKTtcbiAgfSwgW3BhZ2UsIHF1ZXJ5RXBvY2hdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghcm91dGVyPy5ldmVudHMpIHJldHVybjtcbiAgICBjb25zdCBoYW5kbGVEb25lID0gKCkgPT4gc2V0SXNOYXZpZ2F0aW5nKGZhbHNlKTtcbiAgICByb3V0ZXIuZXZlbnRzLm9uKFwicm91dGVDaGFuZ2VDb21wbGV0ZVwiLCBoYW5kbGVEb25lKTtcbiAgICByb3V0ZXIuZXZlbnRzLm9uKFwicm91dGVDaGFuZ2VFcnJvclwiLCBoYW5kbGVEb25lKTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgcm91dGVyLmV2ZW50cy5vZmYoXCJyb3V0ZUNoYW5nZUNvbXBsZXRlXCIsIGhhbmRsZURvbmUpO1xuICAgICAgcm91dGVyLmV2ZW50cy5vZmYoXCJyb3V0ZUNoYW5nZUVycm9yXCIsIGhhbmRsZURvbmUpO1xuICAgIH07XG4gIH0sIFtyb3V0ZXJdKTtcblxuICBhc3luYyBmdW5jdGlvbiBmZXRjaERhdGEocmVxdWVzdGVkUGFnZSA9IDEpIHtcbiAgICBjb25zdCBzZXEgPSArK2ZldGNoU2VxLmN1cnJlbnQ7XG4gICAgbGV0IHRpbWVkT3V0ID0gZmFsc2U7XG4gICAgc2V0SXNMb2FkaW5nKHRydWUpO1xuICAgIHNldExvYWRFcnJvcihudWxsKTtcbiAgICBjb25zdCB0aW1lb3V0SWQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRpbWVkT3V0ID0gdHJ1ZTtcbiAgICAgIGlmIChzZXEgPT09IGZldGNoU2VxLmN1cnJlbnQpIHtcbiAgICAgICAgc2V0TG9hZEVycm9yKHtcbiAgICAgICAgICBjb2RlOiBcInRpbWVvdXRcIixcbiAgICAgICAgICBtZXNzYWdlOiBgTG9hZGluZyBpcyB0YWtpbmcgbG9uZ2VyIHRoYW4gJHtNYXRoLnJvdW5kKFxuICAgICAgICAgICAgTE9BRF9USU1FT1VUX01TIC8gMTAwMFxuICAgICAgICAgICl9cy4gVGhpcyBpcyBsaWtlbHkgZHVlIHRvIHZlcnkgc2VsZWN0aXZlIGZpbHRlcnMuYCxcbiAgICAgICAgfSk7XG4gICAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XG4gICAgICB9XG4gICAgfSwgTE9BRF9USU1FT1VUX01TKTtcbiAgICB0cnkge1xuICAgICAgaWYgKHJvdXRlci5xdWVyeS5pbnB1dFRleHQgJiYgcm91dGVyLnF1ZXJ5LnNlbGVjdGVkVHlwZSkge1xuICAgICAgICBzZXRTZWxlY3Qocm91dGVyLnF1ZXJ5LnNlbGVjdGVkVHlwZSk7XG4gICAgICAgIHNldFNlYXJjaChyb3V0ZXIucXVlcnkuaW5wdXRUZXh0KTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHN0YXJ0QWZ0ZXJEb2MgPVxuICAgICAgICByZXF1ZXN0ZWRQYWdlID4gMSA/IHBhZ2VDdXJzb3JzW3JlcXVlc3RlZFBhZ2UgLSAyXSA6IG51bGw7XG4gICAgICBpZiAocmVxdWVzdGVkUGFnZSA+IDEgJiYgIXN0YXJ0QWZ0ZXJEb2MpIHtcbiAgICAgICAgc2V0UGFnZSgxKTtcbiAgICAgICAgaWYgKHNlcSA9PT0gZmV0Y2hTZXEuY3VycmVudCkge1xuICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0SWQpO1xuICAgICAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3QgZWZmZWN0aXZlU2VsZWN0ID0gcm91dGVyLnF1ZXJ5LnNlbGVjdGVkVHlwZSB8fCBzZWxlY3Q7XG4gICAgICBjb25zdCBlZmZlY3RpdmVTZWFyY2ggPSByb3V0ZXIucXVlcnkuaW5wdXRUZXh0IHx8IHNlYXJjaDtcbiAgICAgIGNvbnN0IGVmZmVjdGl2ZVNlYXJjaExvd2VyID0gKGVmZmVjdGl2ZVNlYXJjaCB8fCBcIlwiKVxuICAgICAgICAudG9Mb3dlckNhc2UoKVxuICAgICAgICAudHJpbSgpO1xuXG4gICAgICAvLyBsaWdodCByZXRyeSBmb3IgdHJhbnNpZW50IEZpcmVzdG9yZSBoaWNjdXBzXG4gICAgICBjb25zdCBsb2FkID0gYXN5bmMgKGF0dGVtcHQgPSAxKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmV0dXJuIGF3YWl0IGZldGNoUGFydHNXaXRoTWFjaGluZURhdGFQYWdlKHtcbiAgICAgICAgICAgIHBhZ2VTaXplLFxuICAgICAgICAgICAgc3RhcnRBZnRlckRvYyxcbiAgICAgICAgICAgIHZpc2libGVPbmx5OiB0cnVlLFxuICAgICAgICAgICAgZmlsdGVyRm46IGhhc0FjdGl2ZUZpbHRlcnMgPyBtYXRjaGVzRmlsdGVycyA6IG51bGwsXG4gICAgICAgICAgICBzZWFyY2g6IGVmZmVjdGl2ZVNlYXJjaExvd2VyXG4gICAgICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAgICAgdHlwZTogZWZmZWN0aXZlU2VsZWN0LFxuICAgICAgICAgICAgICAgICAgcmF3OiBlZmZlY3RpdmVTZWFyY2gsXG4gICAgICAgICAgICAgICAgICBsb3dlcjogZWZmZWN0aXZlU2VhcmNoTG93ZXIsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICA6IG51bGwsXG4gICAgICAgICAgICBuZWVkc01hY2hpbmVEYXRhOlxuICAgICAgICAgICAgICBCb29sZWFuKHNlbGVjdGVkT0VNKSB8fFxuICAgICAgICAgICAgICBCb29sZWFuKHNlbGVjdGVkTW9kYWxpdHkpIHx8XG4gICAgICAgICAgICAgIEJvb2xlYW4oc2VsZWN0ZWRNb2RlbCkgfHxcbiAgICAgICAgICAgICAgQm9vbGVhbihzZWxlY3RlZENsaWVudEZyb20pIHx8XG4gICAgICAgICAgICAgIEJvb2xlYW4oc2VsZWN0ZWRDbGllbnRDdXJyZW50KSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIGlmIChhdHRlbXB0ID49IDMpIHRocm93IGU7XG4gICAgICAgICAgYXdhaXQgbmV3IFByb21pc2UociA9PiBzZXRUaW1lb3V0KHIsIDI1MCAqIE1hdGgucG93KDIsIGF0dGVtcHQgLSAxKSkpO1xuICAgICAgICAgIHJldHVybiBsb2FkKGF0dGVtcHQgKyAxKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIGNvbnN0IHsgcGFydHM6IGRhdGEsIGxhc3REb2MsIGhhc05leHRQYWdlOiBuZXh0UGFnZSB9ID0gYXdhaXQgbG9hZCgpO1xuICAgICAgaWYgKHRpbWVkT3V0IHx8IHNlcSAhPT0gZmV0Y2hTZXEuY3VycmVudCkgcmV0dXJuO1xuICAgICAgY29uc3QgaGFzTmFtZVNlYXJjaCA9XG4gICAgICAgIEJvb2xlYW4oZWZmZWN0aXZlU2VhcmNoTG93ZXIpICYmIGVmZmVjdGl2ZVNlbGVjdCA9PT0gXCJOYW1lXCI7XG4gICAgICBpZiAoXG4gICAgICAgIGhhc05hbWVTZWFyY2ggJiZcbiAgICAgICAgKGRhdGEubGVuZ3RoID09PSAwIHx8XG4gICAgICAgICAgZGF0YS5zb21lKFxuICAgICAgICAgICAgKGl0ZW0pID0+XG4gICAgICAgICAgICAgICFBcnJheS5pc0FycmF5KGl0ZW0/Lm5hbWVUb2tlbnMpIHx8IGl0ZW0ubmFtZVRva2Vucy5sZW5ndGggPT09IDBcbiAgICAgICAgICApKVxuICAgICAgKSB7XG4gICAgICAgIHN0YXJ0TmFtZVRva2VuQmFja2ZpbGwoXCJuYW1lLXNlYXJjaFwiKTtcbiAgICAgIH1cbiAgICAgIGlmIChyZXF1ZXN0ZWRQYWdlID09PSAxICYmIGRhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHNldFBhZ2VDdXJzb3JzKFtdKTtcbiAgICAgICAgc2V0SGFzTmV4dFBhZ2UoZmFsc2UpO1xuICAgICAgfVxuICAgICAgc2V0QmFja3VwSW5mbyhkYXRhKTtcbiAgICAgIHNldExhYmVscyhsYWJlbEJhc2UpOyAvLyA8LS0gYWRkIHRoaXMgbGluZSBhZnRlciBzZXRCYWNrdXBJbmZvKGRhdGEpXG4gICAgICBzZXRJRChkYXRhLm1hcCgoaXRlbSkgPT4gaXRlbS5pZCkpO1xuICAgICAgaWYgKHJlcXVlc3RlZFBhZ2UgPiAxICYmIGRhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHNldEhhc05leHRQYWdlKGZhbHNlKTtcbiAgICAgICAgc2V0UGFnZSgxKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgc2V0SGFzTmV4dFBhZ2UobmV4dFBhZ2UpO1xuICAgICAgc2V0UGFnZUN1cnNvcnMoKHByZXYpID0+IHtcbiAgICAgICAgY29uc3QgbmV4dCA9IHJlcXVlc3RlZFBhZ2UgPT09IDEgPyBbXSA6IFsuLi5wcmV2XTtcbiAgICAgICAgaWYgKGxhc3REb2MpIHtcbiAgICAgICAgICBuZXh0W3JlcXVlc3RlZFBhZ2UgLSAxXSA9IGxhc3REb2M7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICB9KTtcbiAgICAgIHNldFNlbGVjdGVkSXRlbXMoW10pO1xuXG4gICAgICAvLyBOb3JtYWxpemUgY2xpZW50IGlkcyBmb3IgZmlsdGVyaW5nXG4gICAgICBjb25zdCBhdWdtZW50ZWQgPSBkYXRhLm1hcCgoaXRlbSkgPT4gKHtcbiAgICAgICAgLi4uaXRlbSxcbiAgICAgICAgY2xpZW50RnJvbUlkOlxuICAgICAgICAgIGl0ZW0/LmNsaWVudEZyb21JZCA/P1xuICAgICAgICAgICh0eXBlb2YgaXRlbT8uQ2xpZW50RnJvbSA9PT0gXCJzdHJpbmdcIiA/IGl0ZW0uQ2xpZW50RnJvbSA6IG51bGwpID8/XG4gICAgICAgICAgaXRlbT8uQ2xpZW50RnJvbT8uaWQgPz9cbiAgICAgICAgICBudWxsLFxuICAgICAgICBjbGllbnRDdXJyZW50SWQ6XG4gICAgICAgICAgaXRlbT8uY2xpZW50Q3VycmVudElkID8/XG4gICAgICAgICAgKHR5cGVvZiBpdGVtPy5DbGllbnRDdXJyZW50ID09PSBcInN0cmluZ1wiID8gaXRlbS5DbGllbnRDdXJyZW50IDogbnVsbCkgPz9cbiAgICAgICAgICBpdGVtPy5DbGllbnRDdXJyZW50Py5pZCA/P1xuICAgICAgICAgIG51bGwsXG4gICAgICB9KSk7XG5cclxuICAgICAgc2V0QXVnbWVudGVkSW5mbyhhdWdtZW50ZWQpO1xuICAgICAgLy8gZGVmYXVsdCB2aWV3ID0gZmlsdGVyZWQgKGtlZXBzIHBhZ2luYXRpb24gYW5kIGZpbHRlcnMgY29uc2lzdGVudClcbiAgICAgIHNldEluZm8oYXVnbWVudGVkLmZpbHRlcihtYXRjaGVzRmlsdGVycykpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgaWYgKHNlcSAhPT0gZmV0Y2hTZXEuY3VycmVudCkgcmV0dXJuO1xuICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGZldGNoaW5nIGRhdGE6XCIsIGVycik7XG4gICAgICBjb25zdCBjb2RlID0gZXJyPy5jb2RlIHx8IFwidW5rbm93blwiO1xuICAgICAgc2V0TG9hZEVycm9yKHtcbiAgICAgICAgY29kZSxcbiAgICAgICAgbWVzc2FnZTogZXJyPy5tZXNzYWdlIHx8IFwiRmFpbGVkIHRvIGxvYWQgaXRlbXMuXCIsXG4gICAgICB9KTtcbiAgICAgIHNldEluZm8oW10pO1xuICAgICAgc2V0QXVnbWVudGVkSW5mbyhbXSk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0SWQpO1xuICAgICAgaWYgKHNlcSA9PT0gZmV0Y2hTZXEuY3VycmVudCAmJiAhdGltZWRPdXQpIHNldElzTG9hZGluZyhmYWxzZSk7XG4gICAgfVxuICB9XG5cclxuICBjb25zdCBzZWFyY2hDaGFuZ2VIYW5kbGVyID0gKGV2ZW50KSA9PiBzZXRTZWFyY2goZXZlbnQudGFyZ2V0LnZhbHVlKTtcclxuXHJcbiAgLy8gRmlsdGVyIHRoZSBjdXJyZW50bHkgbG9hZGVkIGl0ZW1zIChub3cgY29uc2lzdGVudCB3aXRoIHBhZ2VkIGZpbHRlcmluZylcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBiYXNlID0gYXVnbWVudGVkSW5mbyB8fCBbXTtcbiAgICBzZXRJbmZvKGJhc2UuZmlsdGVyKG1hdGNoZXNGaWx0ZXJzKSk7XG4gIH0sIFthdWdtZW50ZWRJbmZvLCBtYXRjaGVzRmlsdGVyc10pO1xuXHJcbiAgZnVuY3Rpb24gc29ydENoZWNrQWxsKHBvcykge1xyXG4gICAgLy8gRGV0ZXJtaW5lIG5leHQgZGlyZWN0aW9uOiB0b2dnbGUgdGhlIGNsaWNrZWQgY29sdW1uIG9ubHlcclxuICAgIGNvbnN0IG5leHRTb3J0Q2hlY2sgPSBzb3J0Q2hlY2subWFwKCh2LCBpKSA9PiAoaSA9PT0gcG9zID8gIXYgOiB2KSk7XHJcbiAgICBjb25zdCBpc0Rlc2MgPSBuZXh0U29ydENoZWNrW3Bvc107IC8vIHRydWUgbWVhbnMgZGVzY2VuZGluZ1xyXG5cclxuICAgIGNvbnN0IHNvcnRlZEluZm8gPSBbLi4uaW5mb10uc29ydCgoYSwgYikgPT4ge1xyXG4gICAgICBjb25zdCBrZXkgPSBsYWJlbEJhc2VOYW1lc1twb3NdO1xyXG5cclxuICAgICAgaWYgKHBvcyA9PT0gMSkge1xyXG4gICAgICAgIC8vIERBVEUgY29sdW1uXHJcbiAgICAgICAgY29uc3QgdGEgPSB0b1RpbWUoYVtrZXldKTtcclxuICAgICAgICBjb25zdCB0YiA9IHRvVGltZShiW2tleV0pO1xyXG5cclxuICAgICAgICAvLyBQdXQgbWlzc2luZyBkYXRlcyBhdCB0aGUgZW5kIGZvciBhc2NlbmRpbmcsIGF0IHRoZSBzdGFydCBmb3IgZGVzY2VuZGluZ1xyXG4gICAgICAgIGlmICh0YSA9PT0gbnVsbCAmJiB0YiA9PT0gbnVsbCkgcmV0dXJuIDA7XHJcbiAgICAgICAgaWYgKHRhID09PSBudWxsKSByZXR1cm4gaXNEZXNjID8gLTEgOiAxO1xyXG4gICAgICAgIGlmICh0YiA9PT0gbnVsbCkgcmV0dXJuIGlzRGVzYyA/IDEgOiAtMTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGlzRGVzYyA/ICh0YiAtIHRhKSA6ICh0YSAtIHRiKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gTkFNRSBvciBTS1UgKHN0cmluZy15IGNvbHVtbnMpOiBpbmRleGVzIDAgb3IgNSBpbiB5b3VyIG9yaWdpbmFsIGxvZ2ljXHJcbiAgICAgIGlmIChwb3MgPT09IDAgfHwgcG9zID09PSA1KSB7XHJcbiAgICAgICAgY29uc3QgYXYgPSAoYVtrZXldID8/IFwiXCIpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgY29uc3QgYnYgPSAoYltrZXldID8/IFwiXCIpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgcmV0dXJuIGlzRGVzYyA/IGJ2LmxvY2FsZUNvbXBhcmUoYXYpIDogYXYubG9jYWxlQ29tcGFyZShidik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIE51bWVyaWMtaXNoIGNvbHVtbnMgKHdvLCBwbiwgc24pIOKAlCBmYWxsIGJhY2sgdG8gc3RyaW5nIGNvbXBhcmUgaWYgTmFOXHJcbiAgICAgIGNvbnN0IGFuID0gTnVtYmVyKGFba2V5XSk7XHJcbiAgICAgIGNvbnN0IGJuID0gTnVtYmVyKGJba2V5XSk7XHJcblxyXG4gICAgICBpZiAoIWlzTmFOKGFuKSAmJiAhaXNOYU4oYm4pKSB7XHJcbiAgICAgICAgcmV0dXJuIGlzRGVzYyA/IChibiAtIGFuKSA6IChhbiAtIGJuKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zdCBhdiA9IChhW2tleV0gPz8gXCJcIikudG9TdHJpbmcoKTtcclxuICAgICAgICBjb25zdCBidiA9IChiW2tleV0gPz8gXCJcIikudG9TdHJpbmcoKTtcclxuICAgICAgICByZXR1cm4gaXNEZXNjID8gYnYubG9jYWxlQ29tcGFyZShhdikgOiBhdi5sb2NhbGVDb21wYXJlKGJ2KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgc2V0SW5mbyhzb3J0ZWRJbmZvKTtcclxuICAgIHNldFNvcnRDaGVjayhuZXh0U29ydENoZWNrKTtcclxuXHJcbiAgICAvLyBVcGRhdGUgaGVhZGVyIGxhYmVscyB0byBzaG93IHRoZSBsaXR0bGUgYXJyb3cgb24gdGhlIGFjdGl2ZSBjb2x1bW5cclxuICAgIHNldExhYmVscyh3aXRoU29ydEljb24obGFiZWxCYXNlLCBwb3MsIGlzRGVzYykpO1xyXG4gIH1cclxuXHJcblxyXG4gIGNvbnN0IHJvd1NlbGVjdCA9IChpdGVtKSA9PiB7XHJcbiAgICBpZiAoaXRlbSAmJiBpdGVtLmlkKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiU2VsZWN0ZWQgaXRlbTpcIiwgaXRlbSk7XG4gICAgICBzZXRJc05hdmlnYXRpbmcodHJ1ZSk7XG4gICAgICByb3V0ZXIucHVzaChcIi4vaXRlbS9cIiArIGl0ZW0uaWQpO1xuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJVbmFibGUgdG8gZGV0ZXJtaW5lIHRoZSBzZWxlY3RlZCBpdGVt4oCZcyBJRDogXCIsIGl0ZW0pO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGNvbnN0IFtzZWxlY3RlZEl0ZW1zLCBzZXRTZWxlY3RlZEl0ZW1zXSA9IHVzZVN0YXRlKFtdKTtcclxuICBjb25zdCBbc2hvd0RlbGV0ZU1vZGFsLCBzZXRTaG93RGVsZXRlTW9kYWxdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG5cclxuICBjb25zdCBoYW5kbGVTZWxlY3RJdGVtID0gKGlkKSA9PiB7XHJcbiAgICBzZXRTZWxlY3RlZEl0ZW1zKHByZXYgPT5cclxuICAgICAgcHJldi5pbmNsdWRlcyhpZCkgPyBwcmV2LmZpbHRlcih4ID0+IHggIT09IGlkKSA6IFsuLi5wcmV2LCBpZF1cclxuICAgICk7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8vIHNldFNlbGVjdGVkSXRlbXMoKHByZXYpID0+IHtcclxuICAvLyAgIGNvbnN0IG5ld1NlbGVjdGlvbiA9IHByZXYuaW5jbHVkZXMoaWQpXHJcbiAgLy8gICAgID8gcHJldi5maWx0ZXIoKGl0ZW1JZCkgPT4gaXRlbUlkICE9PSBpZClcclxuICAvLyAgICAgOiBbLi4ucHJldiwgaWRdO1xyXG4gIC8vICAgY29uc29sZS5sb2coXCJTZWxlY3RlZCBpdGVtczpcIiwgbmV3U2VsZWN0aW9uKTtcclxuICAvLyAgIHJldHVybiBuZXdTZWxlY3Rpb247IC8vIDwtIGltcG9ydGFudFxyXG4gIC8vIH0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVTaG93RGVsZXRlTW9kYWwgPSAoKSA9PiBzZXRTaG93RGVsZXRlTW9kYWwodHJ1ZSk7XHJcbiAgY29uc3QgaGFuZGxlQ2xvc2VEZWxldGVNb2RhbCA9ICgpID0+IHNldFNob3dEZWxldGVNb2RhbChmYWxzZSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZURlbGV0ZVNlbGVjdGVkID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgc2V0SXNEZWxldGluZyh0cnVlKTtcclxuICAgIGNvbnN0IGRiID0gZmlyZWJhc2UuZmlyZXN0b3JlKCk7XHJcbiAgICB0cnkge1xyXG4gICAgICAvLyBMb29wIG92ZXIgZWFjaCBzZWxlY3RlZCBpdGVtIG9uZSBhdCBhIHRpbWVcclxuICAgICAgZm9yIChjb25zdCBpdGVtSWQgb2Ygc2VsZWN0ZWRJdGVtcykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGl0ZW1JZClcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgLy8gRGVsZXRlIGZyb20gXCJUZXN0XCIgY29sbGVjdGlvblxyXG4gICAgICAgICAgYXdhaXQgZGIuY29sbGVjdGlvbihcIlRlc3RcIikuZG9jKGl0ZW1JZCkuZGVsZXRlKCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGBFcnJvciBkZWxldGluZyBkb2N1bWVudCAke2l0ZW1JZH0gZnJvbSBUZXN0OmAsIGVycik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAvLyBEZWxldGUgZnJvbSBcIlBhcnRzXCIgY29sbGVjdGlvblxyXG4gICAgICAgICAgYXdhaXQgZGIuY29sbGVjdGlvbihcIlBhcnRzXCIpLmRvYyhpdGVtSWQpLmRlbGV0ZSgpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgY29uc29sZS5lcnJvcihgRXJyb3IgZGVsZXRpbmcgZG9jdW1lbnQgJHtpdGVtSWR9IGZyb20gUGFydHM6YCwgZXJyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIC8vIERlbGV0ZSBhc3NvY2lhdGVkIHBob3RvcyBmcm9tIHN0b3JhZ2VcclxuICAgICAgICAgIGF3YWl0IGRlbGV0ZUZyb21TdG9yYWdlKGl0ZW1JZCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGBFcnJvciBkZWxldGluZyBzdG9yYWdlIGZvciAke2l0ZW1JZH06YCwgZXJyKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgLy8gVXBkYXRlIGxvY2FsIHN0YXRlIGJ5IGZpbHRlcmluZyBvdXQgdGhlIGRlbGV0ZWQgaXRlbXNcclxuICAgICAgc2V0SW5mbyhpbmZvLmZpbHRlcigoaXRlbSkgPT4gIXNlbGVjdGVkSXRlbXMuaW5jbHVkZXMoaXRlbS5pZCkpKTtcclxuICAgICAgc2V0U2VsZWN0ZWRJdGVtcyhbXSk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZGVsZXRpbmcgaXRlbXM6XCIsIGVycm9yKTtcclxuICAgIH0gZmluYWxseSB7XHJcbiAgICAgIHNldElzRGVsZXRpbmcoZmFsc2UpO1xyXG4gICAgICBoYW5kbGVDbG9zZURlbGV0ZU1vZGFsKCk7XHJcbiAgICAgIC8vIE9wdGlvbmFsbHksIHJlbG9hZCB0aGUgcGFnZVxyXG4gICAgICAvLyByb3V0ZXIucmVsb2FkKCk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcblxyXG4gIGNvbnN0IGhhbmRsZUNsb3NlID0gKCkgPT4gc2V0U2hvdyhmYWxzZSk7XHJcbiAgY29uc3QgaGFuZGxlU2hvdyA9ICgpID0+IHNldFNob3codHJ1ZSk7XHJcblxyXG4gIGNvbnN0IGNoZWNrRGVsZXRlID0gKGV2ZW50LCBwb3MsIGlkc1RvRGVsZXRlLCBuYW1lKSA9PiB7XHJcbiAgICBpZiAoZXZlbnQpIHtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICB9XHJcbiAgICBjb25zb2xlLmxvZyhcIlNlbGVjdGVkIElEcyB0byBkZWxldGU6XCIsIGlkc1RvRGVsZXRlKTtcclxuICAgIHNldFNlbGVjdGVkSXRlbXMoaWRzVG9EZWxldGUpO1xyXG4gICAgc2V0REl0ZW0obmFtZSk7XHJcbiAgICBzZXRTaG93RGVsZXRlTW9kYWwodHJ1ZSk7XHJcbiAgfTtcclxuXHJcbiAgLy8gY29uc3QgaGFuZGxlRGVsZXRlID0gYXN5bmMgKCkgPT4ge1xyXG4gIC8vICAgbGV0IGl0ZW1JZCA9IGdJZGU7XHJcbiAgLy8gICB0cnkge1xyXG4gIC8vICAgICBzZXRJc0RlbGV0aW5nKHRydWUpO1xyXG4gIC8vICAgICBjb25zdCBkYiA9IGZpcmViYXNlLmZpcmVzdG9yZSgpO1xyXG4gIC8vICAgICBhd2FpdCBkYi5jb2xsZWN0aW9uKFwiVGVzdFwiKS5kb2MoaXRlbUlkKS5kZWxldGUoKTtcclxuICAvLyAgICAgYXdhaXQgZGVsZXRlRnJvbVBhcnRzQ29sbGVjdGlvbihpdGVtSWQpO1xyXG4gIC8vICAgICBhd2FpdCBkZWxldGVGcm9tU3RvcmFnZShpdGVtSWQpO1xyXG4gIC8vICAgICBzZXRJbmZvKGluZm8uZmlsdGVyKChfLCBpKSA9PiBnUG9zICE9PSBpKSk7XHJcbiAgLy8gICAgIGNvbnNvbGUubG9nKGBEZWxldGVkIGl0ZW06ICR7aXRlbUlkfWApO1xyXG4gIC8vICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAvLyAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGRlbGV0aW5nIGl0ZW06XCIsIGVycm9yKTtcclxuICAvLyAgIH0gZmluYWxseSB7XHJcbiAgLy8gICAgIHNldElzRGVsZXRpbmcoZmFsc2UpO1xyXG4gIC8vICAgfVxyXG4gIC8vICAgaGFuZGxlQ2xvc2UoKTtcclxuICAvLyB9O1xyXG5cclxuICBjb25zdCBob3ZlclN0eWxlID0gKGluZGV4KSA9PiAoe1xyXG4gICAgYmFja2dyb3VuZENvbG9yOiBob3ZlckluZGV4ID09PSBpbmRleCA/IFwiI2RkZFwiIDogXCJ0cmFuc3BhcmVudFwiLFxyXG4gICAgdGV4dEFsaWduOiBcImNlbnRlclwiLFxyXG4gICAgY3Vyc29yOiBcImRlZmF1bHRcIixcclxuICB9KTtcclxuXHJcbiAgY29uc3QgW2Ryb3Bkb3duMVRleHQsIHNldERyb3Bkb3duMVRleHRdID0gdXNlU3RhdGUoXCJTZWxlY3QgT3B0aW9uXCIpO1xyXG4gIGNvbnN0IFtkcm9wZG93bjJUZXh0LCBzZXREcm9wZG93bjJUZXh0XSA9IHVzZVN0YXRlKFwiU2VsZWN0IE9wdGlvblwiKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlU2VsZWN0MSA9IChldmVudEtleSwgZXZlbnQpID0+IHtcclxuICAgIGlmIChldmVudEtleSA9PT0gXCJ1bmFzc2lnbmVkXCIpIHtcclxuICAgICAgc2V0RHJvcGRvd24xVGV4dChcIlNlbGVjdCBPcHRpb25cIik7XHJcbiAgICAgIHNldFNlbGVjdGVkT0VNKG51bGwpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc2V0RHJvcGRvd24xVGV4dChldmVudC50YXJnZXQudGV4dENvbnRlbnQpO1xyXG4gICAgICBzZXRTZWxlY3RlZE9FTShldmVudC50YXJnZXQudGV4dENvbnRlbnQpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGNvbnN0IGhhbmRsZVNlbGVjdDIgPSAoZXZlbnRLZXksIGV2ZW50KSA9PiB7XHJcbiAgICBpZiAoZXZlbnRLZXkgPT09IFwidW5hc3NpZ25lZFwiKSB7XHJcbiAgICAgIHNldERyb3Bkb3duMlRleHQoXCJTZWxlY3QgT3B0aW9uXCIpO1xyXG4gICAgICBzZXRTZWxlY3RlZE1vZGFsaXR5KG51bGwpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc2V0RHJvcGRvd24yVGV4dChldmVudC50YXJnZXQudGV4dENvbnRlbnQpO1xyXG4gICAgICBzZXRTZWxlY3RlZE1vZGFsaXR5KGV2ZW50LnRhcmdldC50ZXh0Q29udGVudCk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgLy8gQnVpbGQgYSB1bmlxdWUgbGlzdCBvZiBjbGllbnRzIGZyb20gdGhlIGl0ZW1zIGN1cnJlbnRseSBsb2FkZWQsIGZpbHRlcmVkIGJ5IE9FTS9Nb2RhbGl0eS5cclxuICAvLyBgdHlwZWAgaXMgXCJmcm9tXCIgb3IgXCJjdXJyZW50XCIgdG8gZGVjaWRlIHdoaWNoIGNsaWVudCByZWYgdG8gcmVhZC5cclxuICBhc3luYyBmdW5jdGlvbiBidWlsZENsaWVudHNGcm9tSXRlbXModHlwZSkge1xuICAgIGNvbnN0IGRiID0gZmlyZWJhc2UuZmlyZXN0b3JlKCk7XG4gICAgY29uc3QgaWRzID0gbmV3IFNldCgpO1xuXG4gICAgLy8gUmVzcGVjdCBjdXJyZW50IE9FTSAvIE1vZGFsaXR5IGZpbHRlcnMgd2hlbiBkZXJpdmluZyBjbGllbnQgb3B0aW9uc1xuICAgIGNvbnN0IGZpbHRlcmVkID0gYXVnbWVudGVkSW5mby5maWx0ZXIoKGl0ZW0pID0+IHtcbiAgICAgIGNvbnN0IE9FTSA9IGdldE1hY2hpbmVGaWVsZChpdGVtLCBcIk9FTVwiKTtcbiAgICAgIGNvbnN0IE1vZGFsaXR5ID0gZ2V0TWFjaGluZUZpZWxkKGl0ZW0sIFwiTW9kYWxpdHlcIik7XG4gICAgICBpZiAoc2VsZWN0ZWRPRU0gJiYgbm9ybWFsaXplVGV4dChPRU0pICE9PSBub3JtYWxpemVUZXh0KHNlbGVjdGVkT0VNKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoXG4gICAgICAgIHNlbGVjdGVkTW9kYWxpdHkgJiZcbiAgICAgICAgbm9ybWFsaXplVGV4dChNb2RhbGl0eSkgIT09IG5vcm1hbGl6ZVRleHQoc2VsZWN0ZWRNb2RhbGl0eSlcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9KTtcblxyXG4gICAgZm9yIChjb25zdCBpdCBvZiBmaWx0ZXJlZCkge1xyXG4gICAgICBjb25zdCBpZCA9IHR5cGUgPT09IFwiZnJvbVwiID8gaXQuY2xpZW50RnJvbUlkIDogaXQuY2xpZW50Q3VycmVudElkO1xyXG4gICAgICBpZiAoaWQpIGlkcy5hZGQoaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG91dCA9IFtdO1xyXG4gICAgY29uc3QgaWRBcnJheSA9IFsuLi5pZHNdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpZEFycmF5Lmxlbmd0aDsgaSArPSAxMCkge1xyXG4gICAgICBjb25zdCBjaHVuayA9IGlkQXJyYXkuc2xpY2UoaSwgaSArIDEwKTtcclxuICAgICAgY29uc3Qgc25hcCA9IGF3YWl0IGRiXHJcbiAgICAgICAgLmNvbGxlY3Rpb24oXCJDbGllbnRcIilcclxuICAgICAgICAud2hlcmUoZmlyZWJhc2UuZmlyZXN0b3JlLkZpZWxkUGF0aC5kb2N1bWVudElkKCksIFwiaW5cIiwgY2h1bmspXHJcbiAgICAgICAgLmdldCgpO1xyXG4gICAgICBzbmFwLmZvckVhY2goKGRvYykgPT4ge1xyXG4gICAgICAgIGNvbnN0IGQgPSBkb2MuZGF0YSgpIHx8IHt9O1xyXG4gICAgICAgIG91dC5wdXNoKHsgaWQ6IGRvYy5pZCwgbmFtZTogZC5uYW1lIHx8IGRvYy5pZCB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc29ydCBieSBuYW1lIGZvciBuaWNlciBVWFxyXG4gICAgb3V0LnNvcnQoKGEsIGIpID0+IChhLm5hbWUgfHwgXCJcIikubG9jYWxlQ29tcGFyZShiLm5hbWUgfHwgXCJcIikpO1xyXG4gICAgcmV0dXJuIG91dDtcclxuICB9XHJcblxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIENMSUVOVCBTRUxFQ1RJT04gSEFORExJTkdcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIFRoaXMgZnVuY3Rpb24gZmV0Y2hlcyBjbGllbnRzIGFuZCBvcGVucyB0aGUgY2xpZW50IG1vZGFsLlxyXG4gIGNvbnN0IGhhbmRsZUNsaWVudENsaWNrID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgbGV0IHNhZmVDbGllbnRzID0gW107XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBjbGllbnRzRGF0YSA9IGF3YWl0IGZldGNoQ2xpZW50cyhzZWxlY3RlZE9FTSwgc2VsZWN0ZWRNb2RhbGl0eSk7XHJcbiAgICAgIHNhZmVDbGllbnRzID0gQXJyYXkuaXNBcnJheShjbGllbnRzRGF0YSkgPyBjbGllbnRzRGF0YSA6IFtdO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICBjb25zb2xlLmVycm9yKFwiZmV0Y2hDbGllbnRzIGZhaWxlZDpcIiwgZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRmFsbGJhY2sgdG8gYnVpbGRpbmcgZnJvbSBsb2FkZWQgaXRlbXMgaWYgQVBJIGdhdmUgdXMgbm90aGluZ1xyXG4gICAgaWYgKHNhZmVDbGllbnRzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGlmICghY2xpZW50U2VsZWN0aW9uVHlwZSkge1xyXG4gICAgICAgICAgLy8gaWYgc29tZWhvdyBub3Qgc2V0IHlldCwgZGVmYXVsdCB0byBcImZyb21cIlxyXG4gICAgICAgICAgc2V0Q2xpZW50U2VsZWN0aW9uVHlwZShcImZyb21cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGRlcml2ZWQgPSBhd2FpdCBidWlsZENsaWVudHNGcm9tSXRlbXMoY2xpZW50U2VsZWN0aW9uVHlwZSB8fCBcImZyb21cIik7XHJcbiAgICAgICAgc2FmZUNsaWVudHMgPSBkZXJpdmVkO1xyXG4gICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkZhbGxiYWNrIGJ1aWxkQ2xpZW50c0Zyb21JdGVtcyBmYWlsZWQ6XCIsIGUpO1xyXG4gICAgICAgIHNhZmVDbGllbnRzID0gW107XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZXRDbGllbnRzKHNhZmVDbGllbnRzKTtcclxuICAgIHNldENsaWVudFNlYXJjaFRlcm0oXCJcIik7XHJcbiAgICBzZXRTaG93Q2xpZW50TW9kYWwodHJ1ZSk7XHJcbiAgfTtcclxuXHJcblxyXG5cclxuICAvLyBXaGVuIGEgY2xpZW50IGlzIHNlbGVjdGVkIGluIHRoZSBtb2RhbCwgd2Ugbm93IGFzc3VtZSB0aGUgcGFyYW1ldGVyIGlzIGEgY2xpZW50IElELlxyXG4gIC8vIElmIHRoZSBwYXNzZWQgdmFsdWUgaXMgbnVsbCwgd2UgY2xlYXIgdGhlIHNlbGVjdGlvbi5cclxuICBjb25zdCBoYW5kbGVDbGllbnRTZWxlY3QgPSBhc3luYyAoY2xpZW50SWQpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKFwiVXNlciBzZWxlY3RlZCBjbGllbnQgaWQ6XCIsIGNsaWVudElkKTtcclxuICAgIGlmICghY2xpZW50SWQpIHtcclxuICAgICAgaWYgKGNsaWVudFNlbGVjdGlvblR5cGUgPT09IFwiZnJvbVwiKSB7XHJcbiAgICAgICAgc2V0Q2xpZW50RnJvbUJ1dHRvblRleHQoXCJTZWxlY3QgT3B0aW9uXCIpO1xyXG4gICAgICAgIHNldFNlbGVjdGVkQ2xpZW50RnJvbShudWxsKTtcclxuICAgICAgfSBlbHNlIGlmIChjbGllbnRTZWxlY3Rpb25UeXBlID09PSBcImN1cnJlbnRcIikge1xyXG4gICAgICAgIHNldENsaWVudEN1cnJlbnRCdXR0b25UZXh0KFwiU2VsZWN0IE9wdGlvblwiKTtcclxuICAgICAgICBzZXRTZWxlY3RlZENsaWVudEN1cnJlbnQobnVsbCk7XHJcbiAgICAgIH1cclxuICAgICAgc2V0U2hvd0NsaWVudE1vZGFsKGZhbHNlKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgY2xpZW50U25hcCA9IGF3YWl0IGZpcmViYXNlLmZpcmVzdG9yZSgpLmNvbGxlY3Rpb24oXCJDbGllbnRcIikuZG9jKGNsaWVudElkKS5nZXQoKTtcclxuICAgICAgaWYgKGNsaWVudFNuYXAuZXhpc3RzKSB7XHJcbiAgICAgICAgY29uc3QgY2xpZW50RGF0YSA9IGNsaWVudFNuYXAuZGF0YSgpO1xyXG4gICAgICAgIGlmIChjbGllbnRTZWxlY3Rpb25UeXBlID09PSBcImZyb21cIikge1xyXG4gICAgICAgICAgc2V0Q2xpZW50RnJvbUJ1dHRvblRleHQoY2xpZW50RGF0YS5uYW1lKTtcclxuICAgICAgICAgIHNldFNlbGVjdGVkQ2xpZW50RnJvbShjbGllbnRJZCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChjbGllbnRTZWxlY3Rpb25UeXBlID09PSBcImN1cnJlbnRcIikge1xyXG4gICAgICAgICAgc2V0Q2xpZW50Q3VycmVudEJ1dHRvblRleHQoY2xpZW50RGF0YS5uYW1lKTtcclxuICAgICAgICAgIHNldFNlbGVjdGVkQ2xpZW50Q3VycmVudChjbGllbnRJZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJObyBjbGllbnQgZG9jdW1lbnQgZm91bmQgZm9yIGlkOlwiLCBjbGllbnRJZCk7XHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBmZXRjaGluZyBjbGllbnQgZGF0YTpcIiwgZXJyb3IpO1xyXG4gICAgfVxyXG4gICAgc2V0U2hvd0NsaWVudE1vZGFsKGZhbHNlKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBoYW5kbGVDbGllbnRJbmZvID0gKGNsaWVudElkLCBjbGllbnROYW1lKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhgQ2xpZW50IElEOiAke2NsaWVudElkfSwgQ2xpZW50IE5hbWU6ICR7Y2xpZW50TmFtZX1gKTtcclxuICAgIHJvdXRlci5wdXNoKFwiY2xpZW50L1wiICsgY2xpZW50SWQpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGhhbmRsZUNsZWFyQ2xpZW50U2VsZWN0aW9uID0gKCkgPT4ge1xyXG4gICAgaWYgKGNsaWVudFNlbGVjdGlvblR5cGUgPT09IFwiZnJvbVwiKSB7XHJcbiAgICAgIHNldENsaWVudEZyb21CdXR0b25UZXh0KFwiU2VsZWN0IE9wdGlvblwiKTtcclxuICAgICAgc2V0U2VsZWN0ZWRDbGllbnRGcm9tKG51bGwpO1xyXG4gICAgfSBlbHNlIGlmIChjbGllbnRTZWxlY3Rpb25UeXBlID09PSBcImN1cnJlbnRcIikge1xyXG4gICAgICBzZXRDbGllbnRDdXJyZW50QnV0dG9uVGV4dChcIlNlbGVjdCBPcHRpb25cIik7XHJcbiAgICAgIHNldFNlbGVjdGVkQ2xpZW50Q3VycmVudChudWxsKTtcclxuICAgIH1cclxuICAgIHNldFNob3dDbGllbnRNb2RhbChmYWxzZSk7XHJcbiAgfTtcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBNT0RFTCBTRUxFQ1RJT04gSEFORExJTkdcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIGNvbnN0IFttb2RlbHMsIHNldE1vZGVsc10gPSB1c2VTdGF0ZShbXSk7XHJcbiAgY29uc3QgW3Nob3dNb2RlbE1vZGFsLCBzZXRTaG93TW9kZWxNb2RhbF0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW21vZGVsQnV0dG9uVGV4dCwgc2V0TW9kZWxCdXR0b25UZXh0XSA9IHVzZVN0YXRlKFwiU2VsZWN0IE9wdGlvblwiKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlTW9kZWxDbGljayA9IGFzeW5jICgpID0+IHtcclxuICAgIGNvbnN0IG1vZGVsc0RhdGEgPSBhd2FpdCBmZXRjaE1vZGVscyhcclxuICAgICAgc2VsZWN0ZWRPRU0sXHJcbiAgICAgIHNlbGVjdGVkTW9kYWxpdHksXHJcbiAgICAgIHNlbGVjdGVkQ2xpZW50RnJvbVxyXG4gICAgKTtcclxuICAgIHNldE1vZGVscyhtb2RlbHNEYXRhKTtcclxuICAgIHNldE1vZGVsU2VhcmNoVGVybShcIlwiKTtcclxuICAgIHNldFNob3dNb2RlbE1vZGFsKHRydWUpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGhhbmRsZU1vZGVsU2VsZWN0ID0gKG1vZGVsTmFtZSkgPT4ge1xyXG4gICAgc2V0TW9kZWxCdXR0b25UZXh0KG1vZGVsTmFtZSB8fCBcIlNlbGVjdCBPcHRpb25cIik7XHJcbiAgICBzZXRTZWxlY3RlZE1vZGVsKG1vZGVsTmFtZSB8fCBudWxsKTtcclxuICAgIHNldFNob3dNb2RlbE1vZGFsKGZhbHNlKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBoYW5kbGVDbGVhck1vZGVsU2VsZWN0aW9uID0gKCkgPT4ge1xyXG4gICAgc2V0TW9kZWxCdXR0b25UZXh0KFwiU2VsZWN0IE9wdGlvblwiKTtcclxuICAgIHNldFNlbGVjdGVkTW9kZWwobnVsbCk7XHJcbiAgICBzZXRTaG93TW9kZWxNb2RhbChmYWxzZSk7XHJcbiAgfTtcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBXQVJFSE9VU0UgQlVUVE9OUyAoZm9yIENsaWVudCBDdXJyZW50KVxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgY29uc3QgaGFuZGxlU29DYWxXYXJlaG91c2VDbGljayA9ICgpID0+IHtcclxuICAgIHNldENsaWVudEN1cnJlbnRCdXR0b25UZXh0KFwiU29DYWwgV2FyZWhvdXNlXCIpO1xyXG4gICAgc2V0U2VsZWN0ZWRDbGllbnRDdXJyZW50KFNPQ0FMX0NMSUVOVF9JRCk7XHJcbiAgICBjb25zb2xlLmxvZyhcIldhcmVob3VzZSBidXR0b24gY2xpY2tlZDogc2V0dGluZyBDbGllbnQgQ3VycmVudCB0b1wiLCBTT0NBTF9DTElFTlRfSUQpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGhhbmRsZU5vckNhbFdhcmVob3VzZUNsaWNrID0gKCkgPT4ge1xyXG4gICAgc2V0Q2xpZW50Q3VycmVudEJ1dHRvblRleHQoXCJOb3JDYWwgV2FyZWhvdXNlXCIpO1xyXG4gICAgc2V0U2VsZWN0ZWRDbGllbnRDdXJyZW50KE5PUkNBTF9DTElFTlRfSUQpO1xyXG4gICAgY29uc29sZS5sb2coXCJXYXJlaG91c2UgYnV0dG9uIGNsaWNrZWQ6IHNldHRpbmcgQ2xpZW50IEN1cnJlbnQgdG9cIiwgTk9SQ0FMX0NMSUVOVF9JRCk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaGFuZGxlV2FyZWhvdXNlVW5hc3NpZ25lZENsaWNrID0gKCkgPT4ge1xyXG4gICAgc2V0Q2xpZW50Q3VycmVudEJ1dHRvblRleHQoXCJVbmFzc2lnbmVkXCIpO1xyXG4gICAgc2V0U2VsZWN0ZWRDbGllbnRDdXJyZW50KFVOQVNTSUdORURfQ0xJRU5UX0lEKTtcclxuICAgIGNvbnNvbGUubG9nKFwiV2FyZWhvdXNlIGJ1dHRvbiBjbGlja2VkOiBzZXR0aW5nIENsaWVudCBDdXJyZW50IHRvXCIsIFVOQVNTSUdORURfQ0xJRU5UX0lEKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBbY2xpZW50U2VhcmNoVGVybSwgc2V0Q2xpZW50U2VhcmNoVGVybV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbbW9kZWxTZWFyY2hUZXJtLCBzZXRNb2RlbFNlYXJjaFRlcm1dID0gdXNlU3RhdGUoXCJcIik7XHJcblxyXG4gIGNvbnN0IGRlbGV0ZUZyb21TdG9yYWdlID0gYXN5bmMgKGl0ZW1JZCkgPT4ge1xyXG4gICAgY29uc3Qgc3RvcmFnZVJlZiA9IGZpcmViYXNlLnN0b3JhZ2UoKS5yZWYoKTtcclxuICAgIGNvbnN0IGZvbGRlclJlZiA9IHN0b3JhZ2VSZWYuY2hpbGQoYFBhcnRzLyR7aXRlbUlkfS9gKTtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IGxpc3RSZXN1bHQgPSBhd2FpdCBmb2xkZXJSZWYubGlzdEFsbCgpO1xyXG4gICAgICBjb25zdCBkZWxldGVQcm9taXNlcyA9IGxpc3RSZXN1bHQuaXRlbXMubWFwKChpdGVtKSA9PiBpdGVtLmRlbGV0ZSgpKTtcclxuICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoZGVsZXRlUHJvbWlzZXMpO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGRlbGV0aW5nIGZyb20gc3RvcmFnZTpcIiwgZXJyb3IpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGNvbnN0IGRlbGV0ZUZyb21QYXJ0c0NvbGxlY3Rpb24gPSBhc3luYyAoaXRlbUlkKSA9PiB7XHJcbiAgICBjb25zdCBkYiA9IGZpcmViYXNlLmZpcmVzdG9yZSgpO1xyXG4gICAgdHJ5IHtcclxuICAgICAgYXdhaXQgZGIuY29sbGVjdGlvbihcIlBhcnRzXCIpLmRvYyhpdGVtSWQpLmRlbGV0ZSgpO1xyXG4gICAgICBjb25zb2xlLmxvZyhgRGVsZXRlZCBpdGVtIGZyb20gUGFydHMgY29sbGVjdGlvbjogJHtpdGVtSWR9YCk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZGVsZXRpbmcgZnJvbSBQYXJ0cyBjb2xsZWN0aW9uOlwiLCBlcnJvcik7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgLy8gICAvLyBTYWZlbHkgY29udmVydCBhbnkgZGF0ZS1pc2ggdmFsdWUgaW50byBhIGNvbXBhcmFibGUgdGltZXN0YW1wIChtcyBzaW5jZSBlcG9jaCkuXHJcbiAgLy8gZnVuY3Rpb24gdG9UaW1lKHZhbHVlKSB7XHJcbiAgLy8gICBpZiAoIXZhbHVlKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgLy8gICAvLyBGaXJlc3RvcmUgVGltZXN0YW1wOiB7IHNlY29uZHMsIG5hbm9zZWNvbmRzIH1cclxuICAvLyAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiYgdmFsdWUuc2Vjb25kcykge1xyXG4gIC8vICAgICB0cnkge1xyXG4gIC8vICAgICAgIHJldHVybiB2YWx1ZS5zZWNvbmRzICogMTAwMDtcclxuICAvLyAgICAgfSBjYXRjaCB7IC8qIGZhbGx0aHJvdWdoICovIH1cclxuICAvLyAgIH1cclxuXHJcbiAgLy8gICAvLyBJZiBhbHJlYWR5IGEgRGF0ZVxyXG4gIC8vICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkgcmV0dXJuIGlzTmFOKHZhbHVlLmdldFRpbWUoKSkgPyBudWxsIDogdmFsdWUuZ2V0VGltZSgpO1xyXG5cclxuICAvLyAgIC8vIElmIHN0cmluZzogdHJ5IElTTyBmaXJzdFxyXG4gIC8vICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikge1xyXG4gIC8vICAgICAvLyB5eXl5LW1tLWRkIChmcm9tIHlvdXIgZm9ybSBpbnB1dHMpXHJcbiAgLy8gICAgIGNvbnN0IGlzbyA9IERhdGUucGFyc2UodmFsdWUpO1xyXG4gIC8vICAgICBpZiAoIWlzTmFOKGlzbykpIHJldHVybiBpc287XHJcblxyXG4gIC8vICAgICAvLyBtbS9kZC95eXl5IGZhbGxiYWNrIChvbGRlciBpdGVtcylcclxuICAvLyAgICAgY29uc3QgcGFydHMgPSB2YWx1ZS5zcGxpdChcIi9cIik7XHJcbiAgLy8gICAgIGlmIChwYXJ0cy5sZW5ndGggPT09IDMpIHtcclxuICAvLyAgICAgICBjb25zdCBbbW0sIGRkLCB5eXl5XSA9IHBhcnRzO1xyXG4gIC8vICAgICAgIGNvbnN0IGFsdCA9IERhdGUucGFyc2UoYCR7eXl5eX0tJHttbX0tJHtkZH1gKTtcclxuICAvLyAgICAgICBpZiAoIWlzTmFOKGFsdCkpIHJldHVybiBhbHQ7XHJcbiAgLy8gICAgIH1cclxuICAvLyAgIH1cclxuXHJcbiAgLy8gICAvLyBDYW5vbmljYWxpemUgYW55IGRhdGUtaXNoIHZhbHVlIHRvICd5eXl5LW1tLWRkJyBzbyBpdCBtYXRjaGVzIDxpbnB1dCB0eXBlPVwiZGF0ZVwiPiB2YWx1ZXNcclxuICAvLyAgIGZ1bmN0aW9uIHRvWU1EKHZhbHVlKSB7XHJcbiAgLy8gICAgIGNvbnN0IHQgPSB0b1RpbWUodmFsdWUpO1xyXG4gIC8vICAgICBpZiAodCA9PSBudWxsKSByZXR1cm4gbnVsbDtcclxuICAvLyAgICAgY29uc3QgZCA9IG5ldyBEYXRlKHQpO1xyXG4gIC8vICAgICBjb25zdCB5eXl5ID0gZC5nZXRGdWxsWWVhcigpO1xyXG4gIC8vICAgICBjb25zdCBtbSA9IFN0cmluZyhkLmdldE1vbnRoKCkgKyAxKS5wYWRTdGFydCgyLCBcIjBcIik7XHJcbiAgLy8gICAgIGNvbnN0IGRkID0gU3RyaW5nKGQuZ2V0RGF0ZSgpKS5wYWRTdGFydCgyLCBcIjBcIik7XHJcbiAgLy8gICAgIHJldHVybiBgJHt5eXl5fS0ke21tfS0ke2RkfWA7XHJcbiAgLy8gICB9XHJcblxyXG5cclxuICAvLyAgIC8vIExhc3QgcmVzb3J0XG4gIC8vICAgY29uc3QgdCA9IERhdGUucGFyc2UodmFsdWUpO1xuICAvLyAgIHJldHVybiBpc05hTih0KSA/IG51bGwgOiB0O1xuICAvLyB9XG5cbiAgY29uc3QgdG90YWxLbm93blBhZ2VzID0gTWF0aC5tYXgoXG4gICAgMSxcbiAgICBwYWdlQ3Vyc29ycy5maWx0ZXIoQm9vbGVhbikubGVuZ3RoICsgKGhhc05leHRQYWdlID8gMSA6IDApXG4gICk7XG4gIGNvbnN0IHBhZ2VCdXR0b25zID0gKCgpID0+IHtcbiAgICBjb25zdCBidXR0b25zID0gW107XG4gICAgY29uc3QgbWF4VmlzaWJsZSA9IDc7XG5cbiAgICBjb25zdCBwdXNoUGFnZSA9IChwKSA9PlxuICAgICAgYnV0dG9ucy5wdXNoKFxuICAgICAgICA8UGFnaW5hdGlvbi5JdGVtXG4gICAgICAgICAga2V5PXtgcGFnZS0ke3B9YH1cbiAgICAgICAgICBhY3RpdmU9e3AgPT09IHBhZ2V9XG4gICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0UGFnZShwKX1cbiAgICAgICAgPlxuICAgICAgICAgIHtwfVxuICAgICAgICA8L1BhZ2luYXRpb24uSXRlbT5cbiAgICAgICk7XG5cbiAgICBjb25zdCBwdXNoRWxsaXBzaXMgPSAoa2V5KSA9PlxuICAgICAgYnV0dG9ucy5wdXNoKDxQYWdpbmF0aW9uLkVsbGlwc2lzIGtleT17a2V5fSBkaXNhYmxlZCAvPik7XG5cbiAgICBpZiAodG90YWxLbm93blBhZ2VzIDw9IG1heFZpc2libGUpIHtcbiAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IHRvdGFsS25vd25QYWdlczsgaSArPSAxKSBwdXNoUGFnZShpKTtcbiAgICAgIHJldHVybiBidXR0b25zO1xuICAgIH1cblxuICAgIGxldCBzdGFydCA9IE1hdGgubWF4KDIsIHBhZ2UgLSAxKTtcbiAgICBsZXQgZW5kID0gTWF0aC5taW4odG90YWxLbm93blBhZ2VzIC0gMSwgcGFnZSArIDEpO1xuXG4gICAgY29uc3QgZGVzaXJlZFdpbmRvdyA9IG1heFZpc2libGUgLSAyO1xuICAgIGxldCBjdXJyZW50V2luZG93ID0gZW5kIC0gc3RhcnQgKyAxO1xuICAgIGxldCByZW1haW5pbmcgPSBkZXNpcmVkV2luZG93IC0gY3VycmVudFdpbmRvdztcblxuICAgIHdoaWxlIChyZW1haW5pbmcgPiAwKSB7XG4gICAgICBpZiAoc3RhcnQgPiAyKSB7XG4gICAgICAgIHN0YXJ0IC09IDE7XG4gICAgICAgIHJlbWFpbmluZyAtPSAxO1xuICAgICAgfVxuICAgICAgaWYgKHJlbWFpbmluZyA+IDAgJiYgZW5kIDwgdG90YWxLbm93blBhZ2VzIC0gMSkge1xuICAgICAgICBlbmQgKz0gMTtcbiAgICAgICAgcmVtYWluaW5nIC09IDE7XG4gICAgICB9XG4gICAgICBpZiAoc3RhcnQgPT09IDIgJiYgZW5kID09PSB0b3RhbEtub3duUGFnZXMgLSAxKSBicmVhaztcbiAgICB9XG5cbiAgICBwdXNoUGFnZSgxKTtcbiAgICBpZiAoc3RhcnQgPiAyKSBwdXNoRWxsaXBzaXMoXCJzdGFydC1lbGxpcHNpc1wiKTtcbiAgICBmb3IgKGxldCBpID0gc3RhcnQ7IGkgPD0gZW5kOyBpICs9IDEpIHB1c2hQYWdlKGkpO1xuICAgIGlmIChlbmQgPCB0b3RhbEtub3duUGFnZXMgLSAxKSBwdXNoRWxsaXBzaXMoXCJlbmQtZWxsaXBzaXNcIik7XG4gICAgcHVzaFBhZ2UodG90YWxLbm93blBhZ2VzKTtcbiAgICBpZiAoaGFzTmV4dFBhZ2UpIHB1c2hFbGxpcHNpcyhcIm1vcmUtZWxsaXBzaXNcIik7XG5cbiAgICByZXR1cm4gYnV0dG9ucztcbiAgfSkoKTtcblxuICBjb25zdCByZWNhbGNQYWdlU2l6ZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuO1xuICAgIGlmIChwYWdlICE9PSAxKSByZXR1cm47XG4gICAgaWYgKCF0YWJsZUJvZHlSZWYuY3VycmVudCkgcmV0dXJuO1xuICAgIGNvbnN0IGNvbnRhaW5lckhlaWdodCA9XG4gICAgICB0YWJsZUJvZHlSZWYuY3VycmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQgfHwgMDtcbiAgICBpZiAoIWNvbnRhaW5lckhlaWdodCkgcmV0dXJuO1xuXG4gICAgY29uc3QgaGVhZGVyUm93ID1cbiAgICAgIHRhYmxlQm9keVJlZi5jdXJyZW50LnF1ZXJ5U2VsZWN0b3IoXCJ0YWJsZSB0aGVhZCB0clwiKSB8fFxuICAgICAgdGFibGVCb2R5UmVmLmN1cnJlbnQucXVlcnlTZWxlY3RvcihcInRoZWFkIHRyXCIpO1xuICAgIGNvbnN0IGJvZHlSb3cgPVxuICAgICAgdGFibGVCb2R5UmVmLmN1cnJlbnQucXVlcnlTZWxlY3RvcihcInRhYmxlIHRib2R5IHRyXCIpIHx8XG4gICAgICB0YWJsZUJvZHlSZWYuY3VycmVudC5xdWVyeVNlbGVjdG9yKFwidGJvZHkgdHJcIik7XG5cbiAgICBpZiAoaGVhZGVyUm93KSB7XG4gICAgICBjb25zdCBoID0gaGVhZGVyUm93LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcbiAgICAgIGlmIChoKSBoZWFkZXJIZWlnaHRSZWYuY3VycmVudCA9IGg7XG4gICAgfVxuICAgIGlmIChib2R5Um93KSB7XG4gICAgICBjb25zdCByID0gYm9keVJvdy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7XG4gICAgICBpZiAocikgcm93SGVpZ2h0UmVmLmN1cnJlbnQgPSByO1xuICAgIH1cblxuICAgIGNvbnN0IHZlcnRpY2FsUGFkZGluZyA9IDI0O1xuICAgIGNvbnN0IGF2YWlsYWJsZSA9XG4gICAgICBjb250YWluZXJIZWlnaHQgLSBoZWFkZXJIZWlnaHRSZWYuY3VycmVudCAtIHZlcnRpY2FsUGFkZGluZztcbiAgICBjb25zdCBlc3RpbWF0ZWQgPSBNYXRoLmZsb29yKGF2YWlsYWJsZSAvIHJvd0hlaWdodFJlZi5jdXJyZW50KTtcbiAgICBjb25zdCBjbGFtcGVkID0gTWF0aC5tYXgoNSwgTWF0aC5taW4oNTAsIGVzdGltYXRlZCkpO1xuICAgIGlmIChjbGFtcGVkID4gMCAmJiBjbGFtcGVkICE9PSBwYWdlU2l6ZSkge1xuICAgICAgc2V0UGFnZVNpemUoY2xhbXBlZCk7XG4gICAgICByZXNldFBhZ2luYXRpb24oKTtcbiAgICAgIHNldFF1ZXJ5RXBvY2goKHYpID0+IHYgKyAxKTtcbiAgICB9XG4gIH0sIFtwYWdlLCBwYWdlU2l6ZV0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybjtcbiAgICByZWNhbGNQYWdlU2l6ZSgpO1xuICAgIGNvbnN0IG9uUmVzaXplID0gKCkgPT4gcmVjYWxjUGFnZVNpemUoKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBvblJlc2l6ZSk7XG4gICAgcmV0dXJuICgpID0+IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIG9uUmVzaXplKTtcbiAgfSwgW3JlY2FsY1BhZ2VTaXplXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoaXNMb2FkaW5nIHx8IHBhZ2UgIT09IDEpIHJldHVybjtcbiAgICByZWNhbGNQYWdlU2l6ZSgpO1xuICB9LCBbcGFnZSwgaXNMb2FkaW5nLCByZWNhbGNQYWdlU2l6ZV0pO1xuXG4gIGNvbnN0IHJlbmRlckZpbHRlcnMgPSAoaWRQcmVmaXgpID0+IChcbiAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmZpbHRlcnNQYW5lbH0+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmZpbHRlcnNIZWFkZXJ9PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuZmlsdGVyc1RpdGxlfT5GaWx0ZXJzPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5maWx0ZXJzU3VidGl0bGV9PlxuICAgICAgICAgICAgTmFycm93IHJlc3VsdHMgYnkgbWFjaGluZSwgY2xpZW50LCBvciB3YXJlaG91c2UuXG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7aGFzQWN0aXZlRmlsdGVycyA/IChcbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e3N0eWxlcy5maWx0ZXJzQmFkZ2V9PkFjdGl2ZTwvc3Bhbj5cbiAgICAgICAgKSA6IG51bGx9XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5maWx0ZXJTZWN0aW9ufT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5maWx0ZXJTZWN0aW9uVGl0bGV9Pk1hY2hpbmU8L2Rpdj5cbiAgICAgICAgPElucHV0R3JvdXAgY2xhc3NOYW1lPXtzdHlsZXMuaW5wdXRHcm91cH0+XG4gICAgICAgICAgPElucHV0R3JvdXAuVGV4dD5PRU08L0lucHV0R3JvdXAuVGV4dD5cbiAgICAgICAgICA8RHJvcGRvd24gb25TZWxlY3Q9e2hhbmRsZVNlbGVjdDF9IGNsYXNzTmFtZT1cInctMTAwXCI+XG4gICAgICAgICAgICA8RHJvcGRvd24uVG9nZ2xlXG4gICAgICAgICAgICAgIHZhcmlhbnQ9XCJvdXRsaW5lLXNlY29uZGFyeVwiXG4gICAgICAgICAgICAgIGlkPXtgJHtpZFByZWZpeH0tb2VtYH1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdy0xMDAgJHtzdHlsZXMuaW5wdXRCdXR0b259YH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge2Ryb3Bkb3duMVRleHR9XG4gICAgICAgICAgICA8L0Ryb3Bkb3duLlRvZ2dsZT5cbiAgICAgICAgICAgIDxEcm9wZG93bi5NZW51IGNsYXNzTmFtZT1cInctMTAwXCI+XG4gICAgICAgICAgICAgIDxEcm9wZG93bi5JdGVtIGV2ZW50S2V5PVwidW5hc3NpZ25lZFwiPlNlbGVjdCBPcHRpb248L0Ryb3Bkb3duLkl0ZW0+XG4gICAgICAgICAgICAgIDxEcm9wZG93bi5JdGVtIGV2ZW50S2V5PVwiR0VcIj5HRTwvRHJvcGRvd24uSXRlbT5cbiAgICAgICAgICAgICAgPERyb3Bkb3duLkl0ZW0gZXZlbnRLZXk9XCJUb3NoaWJhXCI+VG9zaGliYTwvRHJvcGRvd24uSXRlbT5cbiAgICAgICAgICAgICAgPERyb3Bkb3duLkl0ZW0gZXZlbnRLZXk9XCJTaWVtZW5zXCI+U2llbWVuczwvRHJvcGRvd24uSXRlbT5cbiAgICAgICAgICAgICAgPERyb3Bkb3duLkl0ZW0gZXZlbnRLZXk9XCJQaGlsaXBzXCI+UGhpbGlwczwvRHJvcGRvd24uSXRlbT5cbiAgICAgICAgICAgIDwvRHJvcGRvd24uTWVudT5cbiAgICAgICAgICA8L0Ryb3Bkb3duPlxuICAgICAgICA8L0lucHV0R3JvdXA+XG5cbiAgICAgICAgPElucHV0R3JvdXAgY2xhc3NOYW1lPXtzdHlsZXMuaW5wdXRHcm91cH0+XG4gICAgICAgICAgPElucHV0R3JvdXAuVGV4dD5Nb2RhbGl0eTwvSW5wdXRHcm91cC5UZXh0PlxuICAgICAgICAgIDxEcm9wZG93biBvblNlbGVjdD17aGFuZGxlU2VsZWN0Mn0gY2xhc3NOYW1lPVwidy0xMDBcIj5cbiAgICAgICAgICAgIDxEcm9wZG93bi5Ub2dnbGVcbiAgICAgICAgICAgICAgdmFyaWFudD1cIm91dGxpbmUtc2Vjb25kYXJ5XCJcbiAgICAgICAgICAgICAgaWQ9e2Ake2lkUHJlZml4fS1tb2RhbGl0eWB9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YHctMTAwICR7c3R5bGVzLmlucHV0QnV0dG9ufWB9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHtkcm9wZG93bjJUZXh0fVxuICAgICAgICAgICAgPC9Ecm9wZG93bi5Ub2dnbGU+XG4gICAgICAgICAgICA8RHJvcGRvd24uTWVudSBjbGFzc05hbWU9XCJ3LTEwMFwiPlxuICAgICAgICAgICAgICA8RHJvcGRvd24uSXRlbSBldmVudEtleT1cInVuYXNzaWduZWRcIj5TZWxlY3QgT3B0aW9uPC9Ecm9wZG93bi5JdGVtPlxuICAgICAgICAgICAgICA8RHJvcGRvd24uSXRlbSBldmVudEtleT1cIkNUXCI+Q1Q8L0Ryb3Bkb3duLkl0ZW0+XG4gICAgICAgICAgICAgIDxEcm9wZG93bi5JdGVtIGV2ZW50S2V5PVwiTVJJXCI+TVJJPC9Ecm9wZG93bi5JdGVtPlxuICAgICAgICAgICAgPC9Ecm9wZG93bi5NZW51PlxuICAgICAgICAgIDwvRHJvcGRvd24+XG4gICAgICAgIDwvSW5wdXRHcm91cD5cblxuICAgICAgICA8SW5wdXRHcm91cCBjbGFzc05hbWU9e3N0eWxlcy5pbnB1dEdyb3VwfT5cbiAgICAgICAgICA8SW5wdXRHcm91cC5UZXh0Pk1vZGVsPC9JbnB1dEdyb3VwLlRleHQ+XG4gICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgdmFyaWFudD1cIm91dGxpbmUtc2Vjb25kYXJ5XCJcbiAgICAgICAgICAgIGNsYXNzTmFtZT17YHctMTAwICR7c3R5bGVzLmlucHV0QnV0dG9ufWB9XG4gICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVNb2RlbENsaWNrfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHttb2RlbEJ1dHRvblRleHR9XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgIDwvSW5wdXRHcm91cD5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmZpbHRlclNlY3Rpb259PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmZpbHRlclNlY3Rpb25UaXRsZX0+Q2xpZW50PC9kaXY+XG4gICAgICAgIDxJbnB1dEdyb3VwIGNsYXNzTmFtZT17c3R5bGVzLmlucHV0R3JvdXB9PlxuICAgICAgICAgIDxJbnB1dEdyb3VwLlRleHQ+Q2xpZW50IEZyb208L0lucHV0R3JvdXAuVGV4dD5cbiAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICB2YXJpYW50PVwib3V0bGluZS1zZWNvbmRhcnlcIlxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgdy0xMDAgJHtzdHlsZXMuaW5wdXRCdXR0b259YH1cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZUNsaWVudENsaWNrKFwiZnJvbVwiKX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7Y2xpZW50RnJvbUJ1dHRvblRleHR9XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgIDwvSW5wdXRHcm91cD5cblxuICAgICAgICA8SW5wdXRHcm91cCBjbGFzc05hbWU9e3N0eWxlcy5pbnB1dEdyb3VwfT5cbiAgICAgICAgICA8SW5wdXRHcm91cC5UZXh0PkNsaWVudCBDdXJyZW50PC9JbnB1dEdyb3VwLlRleHQ+XG4gICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgdmFyaWFudD1cIm91dGxpbmUtc2Vjb25kYXJ5XCJcbiAgICAgICAgICAgIGNsYXNzTmFtZT17YHctMTAwICR7c3R5bGVzLmlucHV0QnV0dG9ufWB9XG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVDbGllbnRDbGljayhcImN1cnJlbnRcIil9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge2NsaWVudEN1cnJlbnRCdXR0b25UZXh0fVxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICA8L0lucHV0R3JvdXA+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5maWx0ZXJTZWN0aW9ufT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5maWx0ZXJTZWN0aW9uVGl0bGV9PldhcmVob3VzZTwvZGl2PlxuICAgICAgICA8SW5wdXRHcm91cCBjbGFzc05hbWU9e3N0eWxlcy5pbnB1dEdyb3VwfT5cbiAgICAgICAgICA8SW5wdXRHcm91cC5UZXh0PlF1aWNrPC9JbnB1dEdyb3VwLlRleHQ+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5idXR0b25Hcm91cH0+XG4gICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgIHZhcmlhbnQ9XCJvdXRsaW5lLXNlY29uZGFyeVwiXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17c3R5bGVzLmZsZXhCdXR0b259XG4gICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZVNvQ2FsV2FyZWhvdXNlQ2xpY2t9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIFNvQ2FsIFdhcmVob3VzZVxuICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgIHZhcmlhbnQ9XCJvdXRsaW5lLXNlY29uZGFyeVwiXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17c3R5bGVzLmZsZXhCdXR0b259XG4gICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZU5vckNhbFdhcmVob3VzZUNsaWNrfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICBOb3JDYWwgV2FyZWhvdXNlXG4gICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgdmFyaWFudD1cIm91dGxpbmUtc2Vjb25kYXJ5XCJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMuZmxleEJ1dHRvbn1cbiAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlV2FyZWhvdXNlVW5hc3NpZ25lZENsaWNrfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICBVbmFzc2lnbmVkXG4gICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9JbnB1dEdyb3VwPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG5cblxuICByZXR1cm4gKFxuICAgIDxMb2dnZWRJbj5cbiAgICAgIHsoaXNEZWxldGluZyB8fCBpc05hdmlnYXRpbmcpICYmIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5sb2FkaW5nT3ZlcmxheX0+XG4gICAgICAgICAgPGltZ1xuICAgICAgICAgICAgc3JjPVwiL21hZ21vLWxvZ28ucG5nXCJcbiAgICAgICAgICAgIGFsdD1cIkxvYWRpbmcgTWFnbW9cIlxuICAgICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMubG9hZGluZ0xvZ299XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuICAgICAgPE1vZGFsIHNob3c9e3Nob3dEZWxldGVNb2RhbH0gb25IaWRlPXtoYW5kbGVDbG9zZURlbGV0ZU1vZGFsfT5cclxuICAgICAgICA8TW9kYWwuSGVhZGVyIGNsb3NlQnV0dG9uPlxyXG4gICAgICAgICAgPE1vZGFsLlRpdGxlPkNvbmZpcm0gRGVsZXRpb248L01vZGFsLlRpdGxlPlxyXG4gICAgICAgIDwvTW9kYWwuSGVhZGVyPlxyXG4gICAgICAgIDxNb2RhbC5Cb2R5PlxyXG4gICAgICAgICAgQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSB7c2VsZWN0ZWRJdGVtcy5sZW5ndGh9IGl0ZW1cclxuICAgICAgICAgIHtzZWxlY3RlZEl0ZW1zLmxlbmd0aCA+IDEgPyBcInNcIiA6IFwiXCJ9P1xyXG4gICAgICAgIDwvTW9kYWwuQm9keT5cclxuICAgICAgICA8TW9kYWwuRm9vdGVyPlxyXG4gICAgICAgICAgPEJ1dHRvbiB2YXJpYW50PVwiZGFuZ2VyXCIgb25DbGljaz17aGFuZGxlRGVsZXRlU2VsZWN0ZWR9PlxyXG4gICAgICAgICAgICBZZXMsIGRlbGV0ZVxyXG4gICAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgICAgICA8QnV0dG9uIHZhcmlhbnQ9XCJzZWNvbmRhcnlcIiBvbkNsaWNrPXtoYW5kbGVDbG9zZURlbGV0ZU1vZGFsfT5cclxuICAgICAgICAgICAgQ2FuY2VsXHJcbiAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICA8L01vZGFsLkZvb3Rlcj5cclxuICAgICAgPC9Nb2RhbD5cclxuXHJcbiAgICAgIDxNb2RhbCBzaG93PXtzaG93Q2xpZW50TW9kYWx9IG9uSGlkZT17KCkgPT4gc2V0U2hvd0NsaWVudE1vZGFsKGZhbHNlKX0+XHJcbiAgICAgICAgPE1vZGFsLkhlYWRlciBjbG9zZUJ1dHRvbj5cclxuICAgICAgICAgIDxNb2RhbC5UaXRsZT5cclxuICAgICAgICAgICAgU2VsZWN0IHtjbGllbnRTZWxlY3Rpb25UeXBlID09PSBcImZyb21cIiA/IFwiQ2xpZW50IEZyb21cIiA6IFwiQ2xpZW50IEN1cnJlbnRcIn1cclxuICAgICAgICAgIDwvTW9kYWwuVGl0bGU+XHJcbiAgICAgICAgPC9Nb2RhbC5IZWFkZXI+XHJcbiAgICAgICAgPE1vZGFsLkJvZHk+XHJcbiAgICAgICAgICA8Rm9ybUNvbnRyb2xcclxuICAgICAgICAgICAgdHlwZT1cInRleHRcIlxyXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlNlYXJjaCBieSBuYW1lXCJcclxuICAgICAgICAgICAgY2xhc3NOYW1lPVwibWItM1wiXHJcbiAgICAgICAgICAgIHZhbHVlPXtjbGllbnRTZWFyY2hUZXJtfVxyXG4gICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldENsaWVudFNlYXJjaFRlcm0oZS50YXJnZXQudmFsdWUpfVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICAgIDxDbGllbnRUYWJsZVxyXG4gICAgICAgICAgICBjbGllbnRzPXsoQXJyYXkuaXNBcnJheShjbGllbnRzKSA/IGNsaWVudHMgOiBbXSkuZmlsdGVyKFxyXG4gICAgICAgICAgICAgIChjbGllbnQpID0+IChjbGllbnQ/Lm5hbWUgPz8gXCJcIikudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhjbGllbnRTZWFyY2hUZXJtLnRvTG93ZXJDYXNlKCkpXHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgIG9uU2VsZWN0Q2xpZW50PXtoYW5kbGVDbGllbnRTZWxlY3R9XHJcbiAgICAgICAgICAgIG9uSW5mb0NsaWNrPXtoYW5kbGVDbGllbnRJbmZvfVxyXG4gICAgICAgICAgICBpc0NsaWVudFNlYXJjaD17ZmFsc2V9XHJcbiAgICAgICAgICAgIGNsZWFyU2VsZWN0aW9uPXsoKSA9PiBoYW5kbGVDbGllbnRTZWxlY3QobnVsbCl9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvTW9kYWwuQm9keT5cclxuICAgICAgPC9Nb2RhbD5cclxuXHJcbiAgICAgIDxNb2RhbCBzaG93PXtzaG93TW9kZWxNb2RhbH0gb25IaWRlPXsoKSA9PiBzZXRTaG93TW9kZWxNb2RhbChmYWxzZSl9PlxyXG4gICAgICAgIDxNb2RhbC5IZWFkZXIgY2xvc2VCdXR0b24+XHJcbiAgICAgICAgICA8TW9kYWwuVGl0bGU+U2VsZWN0IE1vZGVsPC9Nb2RhbC5UaXRsZT5cclxuICAgICAgICA8L01vZGFsLkhlYWRlcj5cclxuICAgICAgICA8TW9kYWwuQm9keT5cclxuICAgICAgICAgIDxGb3JtQ29udHJvbFxyXG4gICAgICAgICAgICB0eXBlPVwidGV4dFwiXHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoIGJ5IG5hbWVcIlxyXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJtYi0zXCJcclxuICAgICAgICAgICAgdmFsdWU9e21vZGVsU2VhcmNoVGVybX1cclxuICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRNb2RlbFNlYXJjaFRlcm0oZS50YXJnZXQudmFsdWUpfVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICAgIDxNb2RlbFRhYmxlXHJcbiAgICAgICAgICAgIG1vZGVscz17bW9kZWxzLmZpbHRlcigobW9kZWwpID0+XHJcbiAgICAgICAgICAgICAgdHlwZW9mIG1vZGVsID09PSBcInN0cmluZ1wiXHJcbiAgICAgICAgICAgICAgICA/IG1vZGVsLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMobW9kZWxTZWFyY2hUZXJtLnRvTG93ZXJDYXNlKCkpXHJcbiAgICAgICAgICAgICAgICA6IGZhbHNlXHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgIG9uU2VsZWN0TW9kZWw9e2hhbmRsZU1vZGVsU2VsZWN0fVxyXG4gICAgICAgICAgICBjbGVhclNlbGVjdGlvbj17KCkgPT4gaGFuZGxlTW9kZWxTZWxlY3QobnVsbCl9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvTW9kYWwuQm9keT5cclxuICAgICAgPC9Nb2RhbD5cclxuXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMucGFnZX0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMucGFnZUlubmVyfT5cbiAgICAgICAgICA8aGVhZGVyIGNsYXNzTmFtZT17c3R5bGVzLmhlYWRlcn0+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmhlYWRlckxlZnR9PlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMuYnVyZ2VyfVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFNob3dGaWx0ZXJzKHRydWUpfVxuICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJPcGVuIGZpbHRlcnNcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHNwYW4+PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3Bhbj48L3NwYW4+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmJyYW5kfT5cbiAgICAgICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgICAgICBzcmM9XCIvbWFnbW8tbG9nby5wbmdcIlxuICAgICAgICAgICAgICAgICAgYWx0PVwiTWFnbW9cIlxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMuYnJhbmRMb2dvfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuYnJhbmROYW1lfT5NYWdtbzwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5icmFuZFN1Yn0+SW52ZW50b3J5IFNlYXJjaDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5oZWFkZXJSaWdodH0+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuaGVhZGVyU3RhdHVzfT5cbiAgICAgICAgICAgICAgICB7aGFzQWN0aXZlRmlsdGVycyA/IFwiRmlsdGVycyBhY3RpdmVcIiA6IFwiQWxsIGl0ZW1zXCJ9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9oZWFkZXI+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmNvbnRlbnR9PlxuICAgICAgICAgICAgPGFzaWRlIGNsYXNzTmFtZT17c3R5bGVzLnNpZGViYXJ9PntyZW5kZXJGaWx0ZXJzKFwic2lkZWJhclwiKX08L2FzaWRlPlxuICAgICAgICAgICAgPG1haW4gY2xhc3NOYW1lPXtzdHlsZXMubWFpbn0+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMudGFibGVDYXJkfT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnRhYmxlSGVhZGVyfT5cbiAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMudGFibGVUaXRsZX0+SXRlbXM8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy50YWJsZVN1YnRpdGxlfT5cbiAgICAgICAgICAgICAgICAgICAgICB7aXNMb2FkaW5nID8gXCJMb2FkaW5nIGl0ZW1zXCIgOiBgJHtpbmZvLmxlbmd0aH0gaXRlbXMgb24gdGhpcyBwYWdlYH1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMudGFibGVNZXRhfT5cbiAgICAgICAgICAgICAgICAgICAgUGFnZSB7cGFnZX0ge2hhc05leHRQYWdlID8gYG9mICR7dG90YWxLbm93blBhZ2VzfStgIDogYG9mICR7dG90YWxLbm93blBhZ2VzfWB9XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMudGFibGVCb2R5fSByZWY9e3RhYmxlQm9keVJlZn0+XG4gICAgICAgICAgICAgICAgICB7aXNMb2FkaW5nID8gKFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmxvYWRpbmdTdGF0ZX0+XG4gICAgICAgICAgICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICAgICAgICAgICAgc3JjPVwiL21hZ21vLWxvZ28ucG5nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsdD1cIkxvYWRpbmcgTWFnbW9cIlxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMubG9hZGluZ0xvZ299XG4gICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmxvYWRpbmdUZXh0fT5Mb2FkaW5nPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgKSA6IGxvYWRFcnJvciA/IChcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5lcnJvclN0YXRlfT5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmVycm9yVGl0bGV9PlxuICAgICAgICAgICAgICAgICAgICAgICAgTG9hZCBmYWlsZWQgKHtsb2FkRXJyb3IuY29kZX0pXG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5lcnJvck1lc3NhZ2V9Pntsb2FkRXJyb3IubWVzc2FnZX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXJpYW50PVwib3V0bGluZS1zZWNvbmRhcnlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZT1cInNtXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzZXRQYWdpbmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldFF1ZXJ5RXBvY2goKHYpID0+IHYgKyAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgUmV0cnlcbiAgICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgICA8UGFydFRhYmxlXG4gICAgICAgICAgICAgICAgICAgICAgaW5mbz17aW5mb31cbiAgICAgICAgICAgICAgICAgICAgICBsYWJlbHM9e2xhYmVsc31cbiAgICAgICAgICAgICAgICAgICAgICBpZHM9e2lkc31cbiAgICAgICAgICAgICAgICAgICAgICBob3ZlclN0eWxlPXtob3ZlclN0eWxlfVxuICAgICAgICAgICAgICAgICAgICAgIHNvcnRDaGVja0FsbD17c29ydENoZWNrQWxsfVxuICAgICAgICAgICAgICAgICAgICAgIGNoZWNrRGVsZXRlPXtjaGVja0RlbGV0ZX1cbiAgICAgICAgICAgICAgICAgICAgICBpc0RlbGV0aW5nPXtpc0RlbGV0aW5nfVxuICAgICAgICAgICAgICAgICAgICAgIHJvd1NlbGVjdD17cm93U2VsZWN0fVxuICAgICAgICAgICAgICAgICAgICAgIHNldEhvdmVySW5kZXg9e3NldEhvdmVySW5kZXh9XG4gICAgICAgICAgICAgICAgICAgICAgaG92ZXJJbmRleD17aG92ZXJJbmRleH1cbiAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEl0ZW1zPXtzZWxlY3RlZEl0ZW1zfVxuICAgICAgICAgICAgICAgICAgICAgIHNldFNlbGVjdGVkSXRlbXM9e3NldFNlbGVjdGVkSXRlbXN9XG4gICAgICAgICAgICAgICAgICAgICAgbWluUm93cz17cGFnZVNpemV9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy50YWJsZUZvb3Rlcn0+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnBhZ2luYXRpb25Sb3d9PlxuICAgICAgICAgICAgICAgICAgICA8UGFnaW5hdGlvbiBzaXplPVwic21cIj5cbiAgICAgICAgICAgICAgICAgICAgICA8UGFnaW5hdGlvbi5QcmV2XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRQYWdlKChwKSA9PiBNYXRoLm1heCgxLCBwIC0gMSkpfVxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3BhZ2UgPD0gMX1cbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICBQcmV2aW91c1xuICAgICAgICAgICAgICAgICAgICAgIDwvUGFnaW5hdGlvbi5QcmV2PlxuICAgICAgICAgICAgICAgICAgICAgIHtwYWdlQnV0dG9uc31cbiAgICAgICAgICAgICAgICAgICAgICA8UGFnaW5hdGlvbi5OZXh0XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRQYWdlKChwKSA9PiBwICsgMSl9XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17IWhhc05leHRQYWdlfVxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIE5leHRcbiAgICAgICAgICAgICAgICAgICAgICA8L1BhZ2luYXRpb24uTmV4dD5cbiAgICAgICAgICAgICAgICAgICAgPC9QYWdpbmF0aW9uPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8Rm9ybSBjbGFzc05hbWU9e3N0eWxlcy5zZWFyY2hSb3d9PlxuICAgICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2xcbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPXtzaG93TGlzdFNlYXJjaH1cbiAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlNlYXJjaFwiXG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMuc2VhcmNoSW5wdXR9XG4gICAgICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD1cIlNlYXJjaFwiXG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3NlYXJjaH1cbiAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17c2VhcmNoQ2hhbmdlSGFuZGxlcn1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPE5hdkRyb3Bkb3duXG4gICAgICAgICAgICAgICAgICAgICAgdGl0bGU9e3NlbGVjdH1cbiAgICAgICAgICAgICAgICAgICAgICBpZD1cImNvbGxhc2libGUtbmF2LWRyb3Bkb3duXCJcbiAgICAgICAgICAgICAgICAgICAgICBzaG93PXtzaG93TGlzdH1cbiAgICAgICAgICAgICAgICAgICAgICBvbk1vdXNlRW50ZXI9eygpID0+IHNldFNob3dMaXN0KHRydWUpfVxuICAgICAgICAgICAgICAgICAgICAgIG9uTW91c2VMZWF2ZT17KCkgPT4gc2V0U2hvd0xpc3QoZmFsc2UpfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17c3R5bGVzLnNlYXJjaFNlbGVjdH1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIDxOYXZEcm9wZG93bi5JdGVtXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNlbGVjdChcIk5hbWVcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNob3dMaXN0U2VhcmNoKFwidGV4dFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgTmFtZVxuICAgICAgICAgICAgICAgICAgICAgIDwvTmF2RHJvcGRvd24uSXRlbT5cbiAgICAgICAgICAgICAgICAgICAgICA8TmF2RHJvcGRvd24uSXRlbVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTZWxlY3QoXCJEYXRlXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTaG93TGlzdFNlYXJjaChcImRhdGVcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIERhdGVcbiAgICAgICAgICAgICAgICAgICAgICA8L05hdkRyb3Bkb3duLkl0ZW0+XG4gICAgICAgICAgICAgICAgICAgICAgPE5hdkRyb3Bkb3duLkl0ZW1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2VsZWN0KFwiV29yayBPcmRlclwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2hvd0xpc3RTZWFyY2goXCJ0ZXh0XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICBXb3JrIE9yZGVyXG4gICAgICAgICAgICAgICAgICAgICAgPC9OYXZEcm9wZG93bi5JdGVtPlxuICAgICAgICAgICAgICAgICAgICAgIDxOYXZEcm9wZG93bi5JdGVtXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNlbGVjdChcIlByb2R1Y3QgTnVtYmVyXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTaG93TGlzdFNlYXJjaChcInRleHRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIFByb2R1Y3QgTnVtYmVyXG4gICAgICAgICAgICAgICAgICAgICAgPC9OYXZEcm9wZG93bi5JdGVtPlxuICAgICAgICAgICAgICAgICAgICAgIDxOYXZEcm9wZG93bi5JdGVtXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNlbGVjdChcIlNlcmlhbCBOdW1iZXJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNob3dMaXN0U2VhcmNoKFwidGV4dFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgU2VyaWFsIE51bWJlclxuICAgICAgICAgICAgICAgICAgICAgIDwvTmF2RHJvcGRvd24uSXRlbT5cbiAgICAgICAgICAgICAgICAgICAgICA8TmF2RHJvcGRvd24uSXRlbVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTZWxlY3QoXCJEZXNjcmlwdGlvblwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2hvd0xpc3RTZWFyY2goXCJ0ZXh0XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICBEZXNjcmlwdGlvblxuICAgICAgICAgICAgICAgICAgICAgIDwvTmF2RHJvcGRvd24uSXRlbT5cbiAgICAgICAgICAgICAgICAgICAgICA8TmF2RHJvcGRvd24uSXRlbVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTZWxlY3QoXCJTS1VcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNob3dMaXN0U2VhcmNoKFwidGV4dFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgU0tVXG4gICAgICAgICAgICAgICAgICAgICAgPC9OYXZEcm9wZG93bi5JdGVtPlxuICAgICAgICAgICAgICAgICAgICA8L05hdkRyb3Bkb3duPlxuICAgICAgICAgICAgICAgICAgPC9Gb3JtPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5mb290ZXJBY3Rpb25zfT5cbiAgICAgICAgICAgICAgICAgICAgPExvYWRpbmdCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwic2Vjb25kYXJ5XCJcbiAgICAgICAgICAgICAgICAgICAgICBuYW1lPVwiQWRkIE5ldyBJdGVtXCJcbiAgICAgICAgICAgICAgICAgICAgICByb3V0ZT1cIk5ld1NlYXJjaC9BZGRJdGVtL05ld0l0ZW1cIlxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17c3R5bGVzLmFjdGlvbkJ1dHRvbn1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPExvYWRpbmdCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwibGlnaHRcIlxuICAgICAgICAgICAgICAgICAgICAgIG5hbWU9XCJNYXBcIlxuICAgICAgICAgICAgICAgICAgICAgIHJvdXRlPVwiTmV3U2VhcmNoL2ludmVudG9yeS9pbnZlbnRvcnlNYW5hZ2VcIlxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17c3R5bGVzLmFjdGlvbkJ1dHRvbn1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPExvYWRpbmdCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwicHJpbWFyeVwiXG4gICAgICAgICAgICAgICAgICAgICAgbmFtZT1cIkJhY2tcIlxuICAgICAgICAgICAgICAgICAgICAgIHJvdXRlPVwiV2FyZWhvdXNlZGIvV2FyZWhvdXNlU2VsZWN0XCJcbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5hY3Rpb25CdXR0b259XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L21haW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxPZmZjYW52YXNcbiAgICAgICAgICBzaG93PXtzaG93RmlsdGVyc31cbiAgICAgICAgICBvbkhpZGU9eygpID0+IHNldFNob3dGaWx0ZXJzKGZhbHNlKX1cbiAgICAgICAgICBwbGFjZW1lbnQ9XCJzdGFydFwiXG4gICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMuZmlsdGVyc0RyYXdlcn1cbiAgICAgICAgICBzY3JvbGxcbiAgICAgICAgICBiYWNrZHJvcFxuICAgICAgICA+XG4gICAgICAgICAgPE9mZmNhbnZhcy5IZWFkZXIgY2xvc2VCdXR0b24+XG4gICAgICAgICAgICA8T2ZmY2FudmFzLlRpdGxlPkZpbHRlcnM8L09mZmNhbnZhcy5UaXRsZT5cbiAgICAgICAgICA8L09mZmNhbnZhcy5IZWFkZXI+XG4gICAgICAgICAgPE9mZmNhbnZhcy5Cb2R5PntyZW5kZXJGaWx0ZXJzKFwiZHJhd2VyXCIpfTwvT2ZmY2FudmFzLkJvZHk+XG4gICAgICAgIDwvT2ZmY2FudmFzPlxuICAgICAgPC9kaXY+XG4gICAgPC9Mb2dnZWRJbj5cbiAgKTtcblxyXG5cclxufVxyXG5cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==