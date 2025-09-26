_N_E =
(window["webpackJsonp_N_E"] = window["webpackJsonp_N_E"] || []).push([[41],{

/***/ "T/rR":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("eC2I");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("vUet");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("nKUr");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);
"use client";





const Spinner = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["forwardRef"](({
  bsPrefix,
  variant,
  animation = 'border',
  size,
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component = 'div',
  className,
  ...props
}, ref) => {
  bsPrefix = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_2__[/* useBootstrapPrefix */ "e"])(bsPrefix, 'spinner');
  const bsSpinnerPrefix = `${bsPrefix}-${animation}`;
  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__["jsx"])(Component, {
    ref: ref,
    ...props,
    className: classnames__WEBPACK_IMPORTED_MODULE_0___default()(className, bsSpinnerPrefix, size && `${bsSpinnerPrefix}-${size}`, variant && `text-${variant}`)
  });
});
Spinner.displayName = 'Spinner';
/* harmony default export */ __webpack_exports__["a"] = (Spinner);

/***/ }),

/***/ "YFqc":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("cTJO")


/***/ }),

/***/ "ZptN":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MainSearch; });
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cpVT");
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("vJKn");
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("z7pX");
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("xvhg");
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("rg98");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("T/rR");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("zM5D");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("cWnB");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("jDKy");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("7vrA");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("6xyR");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("3Z9Z");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("JI6e");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("zUrK");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("97+O");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("QojX");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__("GWEY");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__("YFqc");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__("20a2");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var _utils_fetchAssociations__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__("qoNY");
/* harmony import */ var _context_AuthUserContext__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__("XrFm");
/* harmony import */ var _LoggedIn__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__("mJJZ");
/* harmony import */ var _utils_ClientTable__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__("8HvV");
/* harmony import */ var _utils_ModelTable__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__("TM8N");
/* harmony import */ var _utils_PartTable__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__("MSWM");
/* harmony import */ var _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__("Dktn");
/* harmony import */ var _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_26___default = /*#__PURE__*/__webpack_require__.n(_styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_26__);
/* harmony import */ var _context_Firebase__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__("NY6m");





var __jsx = react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }












 // Predefined warehouse client IDs and display names

var SOCAL_CLIENT_ID = "AIS17182";
var NORCAL_CLIENT_ID = "AIS25097";
var UNASSIGNED_CLIENT_ID = "AIS00404"; // Simulates a network request delay

function simulateNetworkRequest() {
  return new Promise(function (resolve) {
    return setTimeout(resolve, 2000);
  });
} // Custom LoadingButton component


function LoadingButton(_ref) {
  var type = _ref.type,
      name = _ref.name,
      route = _ref.route;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(false),
      isLoading = _useState[0],
      setLoading = _useState[1];

  Object(react__WEBPACK_IMPORTED_MODULE_5__["useEffect"])(function () {
    if (isLoading) {
      simulateNetworkRequest().then(function () {
        return setLoading(false);
      });
    }
  }, [isLoading]);
  return __jsx(next_link__WEBPACK_IMPORTED_MODULE_18___default.a, {
    href: "/".concat(route)
  }, __jsx("a", {
    className: "btn btn-".concat(type),
    disabled: isLoading,
    onClick: function onClick() {
      return !isLoading && setLoading(true);
    }
  }, isLoading ? "Loading…" : name));
}

function MainSearch() {
  var _useAuth = Object(_context_AuthUserContext__WEBPACK_IMPORTED_MODULE_21__[/* useAuth */ "b"])(),
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

  var _useState8 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(),
      dItem = _useState8[0],
      setDItem = _useState8[1];

  var _useState9 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])("Name"),
      select = _useState9[0],
      setSelect = _useState9[1];

  var _useState10 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(false),
      showList = _useState10[0],
      setShowList = _useState10[1];

  var _useState11 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])("text"),
      showListSearch = _useState11[0],
      setShowListSearch = _useState11[1];

  var _useState12 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(""),
      search = _useState12[0],
      setSearch = _useState12[1];

  var _useState13 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(null),
      selectedOEM = _useState13[0],
      setSelectedOEM = _useState13[1];

  var _useState14 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(null),
      selectedModality = _useState14[0],
      setSelectedModality = _useState14[1]; // Replace the old single client state with two sets:


  var _useState15 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(null),
      selectedClientFrom = _useState15[0],
      setSelectedClientFrom = _useState15[1];

  var _useState16 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])("Select Option"),
      clientFromButtonText = _useState16[0],
      setClientFromButtonText = _useState16[1];

  var _useState17 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(null),
      selectedClientCurrent = _useState17[0],
      setSelectedClientCurrent = _useState17[1];

  var _useState18 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])("Select Option"),
      clientCurrentButtonText = _useState18[0],
      setClientCurrentButtonText = _useState18[1];

  var _useState19 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])([]),
      clients = _useState19[0],
      setClients = _useState19[1];

  var _useState20 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(false),
      showClientModal = _useState20[0],
      setShowClientModal = _useState20[1]; // This state tells the modal which client box is being updated: "from" or "current"


  var _useState21 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(null),
      clientSelectionType = _useState21[0],
      setClientSelectionType = _useState21[1];

  var router = Object(next_router__WEBPACK_IMPORTED_MODULE_19__["useRouter"])();
  var labelBase = ["name", "date", "w/o", "p/n", "s/n"];
  var labelBaseNames = ["name", "date", "wo", "pn", "sn"];
  var sortCheckBase = [false, false, false, false, false, false];

  var _useState22 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(labelBase),
      labels = _useState22[0],
      setLabels = _useState22[1];

  var _useState23 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(sortCheckBase),
      sortCheck = _useState23[0],
      setSortCheck = _useState23[1];

  var _useState24 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(null),
      hoverIndex = _useState24[0],
      setHoverIndex = _useState24[1];

  var _useState25 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(null),
      selectedModel = _useState25[0],
      setSelectedModel = _useState25[1];

  var _useState26 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(null),
      gPos = _useState26[0],
      setGPos = _useState26[1];

  var _useState27 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(null),
      gIde = _useState27[0],
      setGIde = _useState27[1];

  var _useState28 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(false),
      isDeleting = _useState28[0],
      setIsDeleting = _useState28[1]; // Fetch data on component mount and route change


  Object(react__WEBPACK_IMPORTED_MODULE_5__["useEffect"])(function () {
    fetchData();
  }, [router.route]);

  function fetchData() {
    return _fetchData.apply(this, arguments);
  }

  function _fetchData() {
    _fetchData = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee9() {
      var load, data, db, machineIds, curMachineIds, _iterator2, _step2, _item$Machine2, _item$CurrentMachine2, item, uniq, mIds, cIds, fetchMachineClients, _yield$Promise$all, _yield$Promise$all2, fromMap, curMap, augmented;

      return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              setIsLoading(true);
              _context9.prev = 1;

              if (router.query.inputText && router.query.selectedType) {
                setSelect(router.query.selectedType);
                setSearch(router.query.inputText);
              } // light retry for transient Firestore hiccups


              load = /*#__PURE__*/function () {
                var _ref8 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee7() {
                  var attempt,
                      _args7 = arguments;
                  return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee7$(_context7) {
                    while (1) {
                      switch (_context7.prev = _context7.next) {
                        case 0:
                          attempt = _args7.length > 0 && _args7[0] !== undefined ? _args7[0] : 1;
                          _context7.prev = 1;
                          _context7.next = 4;
                          return Object(_utils_fetchAssociations__WEBPACK_IMPORTED_MODULE_20__[/* fetchPartsWithMachineData */ "c"])();

                        case 4:
                          return _context7.abrupt("return", _context7.sent);

                        case 7:
                          _context7.prev = 7;
                          _context7.t0 = _context7["catch"](1);

                          if (!(attempt >= 3)) {
                            _context7.next = 11;
                            break;
                          }

                          throw _context7.t0;

                        case 11:
                          _context7.next = 13;
                          return new Promise(function (r) {
                            return setTimeout(r, 250 * Math.pow(2, attempt - 1));
                          });

                        case 13:
                          return _context7.abrupt("return", load(attempt + 1));

                        case 14:
                        case "end":
                          return _context7.stop();
                      }
                    }
                  }, _callee7, null, [[1, 7]]);
                }));

                return function load() {
                  return _ref8.apply(this, arguments);
                };
              }();

              _context9.next = 6;
              return load();

            case 6:
              data = _context9.sent;
              setBackupInfo(data);
              setID(data.map(function (item) {
                return item.id;
              })); // --- Pre-augment: resolve client ids of Machine / CurrentMachine once ---

              db = _context_Firebase__WEBPACK_IMPORTED_MODULE_27__[/* default */ "b"].firestore();
              machineIds = [];
              curMachineIds = [];
              _iterator2 = _createForOfIteratorHelper(data);

              try {
                for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                  item = _step2.value;
                  if (item !== null && item !== void 0 && (_item$Machine2 = item.Machine) !== null && _item$Machine2 !== void 0 && _item$Machine2.id) machineIds.push(item.Machine.id);
                  if (item !== null && item !== void 0 && (_item$CurrentMachine2 = item.CurrentMachine) !== null && _item$CurrentMachine2 !== void 0 && _item$CurrentMachine2.id) curMachineIds.push(item.CurrentMachine.id);
                }
              } catch (err) {
                _iterator2.e(err);
              } finally {
                _iterator2.f();
              }

              uniq = function uniq(arr) {
                return Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(new Set(arr));
              };

              mIds = uniq(machineIds);
              cIds = uniq(curMachineIds);

              fetchMachineClients = /*#__PURE__*/function () {
                var _ref9 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee8(ids) {
                  var out, chunks, i, _i, _chunks, chunk, snap;

                  return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee8$(_context8) {
                    while (1) {
                      switch (_context8.prev = _context8.next) {
                        case 0:
                          if (ids.length) {
                            _context8.next = 2;
                            break;
                          }

                          return _context8.abrupt("return", {});

                        case 2:
                          out = {}; // Firestore "in" supports up to 10 document IDs per query

                          chunks = [];

                          for (i = 0; i < ids.length; i += 10) {
                            chunks.push(ids.slice(i, i + 10));
                          }

                          _i = 0, _chunks = chunks;

                        case 6:
                          if (!(_i < _chunks.length)) {
                            _context8.next = 15;
                            break;
                          }

                          chunk = _chunks[_i];
                          _context8.next = 10;
                          return db.collection("Machine").where(_context_Firebase__WEBPACK_IMPORTED_MODULE_27__[/* default */ "b"].firestore.FieldPath.documentId(), "in", chunk).get();

                        case 10:
                          snap = _context8.sent;
                          snap.forEach(function (doc) {
                            var _md$client;

                            var md = doc.data() || {};
                            out[doc.id] = ((_md$client = md.client) === null || _md$client === void 0 ? void 0 : _md$client.id) || null;
                          });

                        case 12:
                          _i++;
                          _context8.next = 6;
                          break;

                        case 15:
                          return _context8.abrupt("return", out);

                        case 16:
                        case "end":
                          return _context8.stop();
                      }
                    }
                  }, _callee8);
                }));

                return function fetchMachineClients(_x4) {
                  return _ref9.apply(this, arguments);
                };
              }();

              _context9.next = 20;
              return Promise.all([fetchMachineClients(mIds), fetchMachineClients(cIds)]);

            case 20:
              _yield$Promise$all = _context9.sent;
              _yield$Promise$all2 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(_yield$Promise$all, 2);
              fromMap = _yield$Promise$all2[0];
              curMap = _yield$Promise$all2[1];
              augmented = data.map(function (item) {
                var _item$Machine, _fromMap$item$Machine, _item$CurrentMachine, _curMap$item$CurrentM;

                return _objectSpread(_objectSpread({}, item), {}, {
                  // keep existing fields; add fast client id fields for sync filtering
                  clientFromId: item !== null && item !== void 0 && (_item$Machine = item.Machine) !== null && _item$Machine !== void 0 && _item$Machine.id ? (_fromMap$item$Machine = fromMap[item.Machine.id]) !== null && _fromMap$item$Machine !== void 0 ? _fromMap$item$Machine : null : null,
                  clientCurrentId: item !== null && item !== void 0 && (_item$CurrentMachine = item.CurrentMachine) !== null && _item$CurrentMachine !== void 0 && _item$CurrentMachine.id ? (_curMap$item$CurrentM = curMap[item.CurrentMachine.id]) !== null && _curMap$item$CurrentM !== void 0 ? _curMap$item$CurrentM : null : null
                });
              });
              setAugmentedInfo(augmented); // default view = everything not explicitly hidden

              setInfo(augmented.filter(function (it) {
                return it.visible !== false;
              }));
              _context9.next = 34;
              break;

            case 29:
              _context9.prev = 29;
              _context9.t0 = _context9["catch"](1);
              console.error("Error fetching data:", _context9.t0);
              setInfo([]);
              setAugmentedInfo([]);

            case 34:
              _context9.prev = 34;
              setIsLoading(false);
              return _context9.finish(34);

            case 37:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, null, [[1, 29, 34, 37]]);
    }));
    return _fetchData.apply(this, arguments);
  }

  var searchChangeHandler = function searchChangeHandler(event) {
    return setSearch(event.target.value);
  }; // Asynchronous filter function that loops through backupInfo and,
  // for each item, fetches its Machine and CurrentMachine documents,
  // then compares the client id (from machineData.client.id) to the selected client.


  Object(react__WEBPACK_IMPORTED_MODULE_5__["useEffect"])(function () {
    function filterParts() {
      var base = augmentedInfo; // already has clientFromId/clientCurrentId

      var noFilters = !selectedOEM && !selectedModality && !selectedModel && !selectedClientFrom && !selectedClientCurrent && !search;

      if (noFilters) {
        setInfo(base.filter(function (it) {
          return it.visible !== false;
        }));
        return;
      }

      var filtered = base.filter(function (item) {
        // only hide when explicitly false
        if (item.visible === false) return false; // OEM/modality/model via machineData (you already put this in items)

        if (item.machineData) {
          if (selectedOEM && item.machineData.OEM !== selectedOEM) return false;
          if (selectedModality && item.machineData.Modality !== selectedModality) return false;
          if (selectedModel && item.machineData.Model !== selectedModel) return false;
        } // Client filters (now instant)


        if (selectedClientFrom && item.clientFromId !== selectedClientFrom) return false;
        if (selectedClientCurrent && item.clientCurrentId !== selectedClientCurrent) return false; // Search

        if (search) {
          var s = String(search).toLowerCase();

          if (select === "Name") {
            return (item.name || "").toLowerCase().includes(s);
          }

          if (select === "Date") {
            // your items look like mm/dd/yyyy
            var parts = (item.date || "").split("/");

            if (parts.length === 3) {
              var _parts = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(parts, 3),
                  mm = _parts[0],
                  dd = _parts[1],
                  yyyy = _parts[2];

              var reformatted = "".concat(yyyy, "-").concat(mm, "-").concat(dd);
              return reformatted === search;
            }

            return false;
          }

          if (select === "Work Order") {
            return Array.isArray(item.workOrders) && item.workOrders.some(function (wo) {
              return String(wo.workOrder || "").toLowerCase().includes(s);
            });
          }

          if (select === "Product Number") {
            return String(item.pn || "").toLowerCase().includes(s);
          }

          if (select === "Description") {
            return String(item.desc || "").toLowerCase().includes(s);
          }

          if (select === "SKU") {
            return String(item.id || "").toLowerCase().includes(s);
          }
        }

        return true;
      });
      setInfo(filtered);
    }

    filterParts();
  }, [selectedOEM, selectedModality, selectedClientFrom, selectedClientCurrent, selectedModel, search, select, augmentedInfo]);

  function sortCheckAll(pos) {
    var sortedInfo = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(info).sort(function (a, b) {
      if (pos === 0 || pos === 5) {
        return sortCheck[pos] ? b[labelBaseNames[pos]].localeCompare(a[labelBaseNames[pos]]) : a[labelBaseNames[pos]].localeCompare(b[labelBaseNames[pos]]);
      }

      if (pos === 1) {
        return sortCheck[pos] ? Date.parse(b[labelBaseNames[pos]]) - Date.parse(a[labelBaseNames[pos]]) : Date.parse(a[labelBaseNames[pos]]) - Date.parse(b[labelBaseNames[pos]]);
      }

      return sortCheck[pos] ? Number(b[labelBaseNames[pos]]) - Number(a[labelBaseNames[pos]]) : Number(a[labelBaseNames[pos]]) - Number(b[labelBaseNames[pos]]);
    });

    setInfo(sortedInfo);
    setSortCheck(function (prevSortCheck) {
      return prevSortCheck.map(function (_, index) {
        return index === pos ? !prevSortCheck[pos] : prevSortCheck[index];
      });
    });
  }

  var rowSelect = function rowSelect(item) {
    if (item && item.id) {
      console.log("Selected item:", item);
      router.push("./item/" + item.id);
    } else {
      console.error("Unable to determine the selected item’s ID: ", item);
    }
  };

  var _useState29 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])([]),
      selectedItems = _useState29[0],
      setSelectedItems = _useState29[1];

  var _useState30 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(false),
      showDeleteModal = _useState30[0],
      setShowDeleteModal = _useState30[1];

  var handleSelectItem = function handleSelectItem(id) {
    setSelectedItems(function (prev) {
      return prev.includes(id) ? prev.filter(function (x) {
        return x !== id;
      }) : [].concat(Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(prev), [id]);
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
    var _ref2 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee() {
      var db, _iterator, _step, itemId;

      return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              setIsDeleting(true);
              db = _context_Firebase__WEBPACK_IMPORTED_MODULE_27__[/* default */ "b"].firestore();
              _context.prev = 2;
              // Loop over each selected item one at a time
              _iterator = _createForOfIteratorHelper(selectedItems);
              _context.prev = 4;

              _iterator.s();

            case 6:
              if ((_step = _iterator.n()).done) {
                _context.next = 35;
                break;
              }

              itemId = _step.value;
              console.log(itemId);
              _context.prev = 9;
              _context.next = 12;
              return db.collection("Test").doc(itemId)["delete"]();

            case 12:
              _context.next = 17;
              break;

            case 14:
              _context.prev = 14;
              _context.t0 = _context["catch"](9);
              console.error("Error deleting document ".concat(itemId, " from Test:"), _context.t0);

            case 17:
              _context.prev = 17;
              _context.next = 20;
              return db.collection("Parts").doc(itemId)["delete"]();

            case 20:
              _context.next = 25;
              break;

            case 22:
              _context.prev = 22;
              _context.t1 = _context["catch"](17);
              console.error("Error deleting document ".concat(itemId, " from Parts:"), _context.t1);

            case 25:
              _context.prev = 25;
              _context.next = 28;
              return deleteFromStorage(itemId);

            case 28:
              _context.next = 33;
              break;

            case 30:
              _context.prev = 30;
              _context.t2 = _context["catch"](25);
              console.error("Error deleting storage for ".concat(itemId, ":"), _context.t2);

            case 33:
              _context.next = 6;
              break;

            case 35:
              _context.next = 40;
              break;

            case 37:
              _context.prev = 37;
              _context.t3 = _context["catch"](4);

              _iterator.e(_context.t3);

            case 40:
              _context.prev = 40;

              _iterator.f();

              return _context.finish(40);

            case 43:
              // Update local state by filtering out the deleted items
              setInfo(info.filter(function (item) {
                return !selectedItems.includes(item.id);
              }));
              setSelectedItems([]);
              _context.next = 50;
              break;

            case 47:
              _context.prev = 47;
              _context.t4 = _context["catch"](2);
              console.error("Error deleting items:", _context.t4);

            case 50:
              _context.prev = 50;
              setIsDeleting(false);
              handleCloseDeleteModal(); // Optionally, reload the page
              // router.reload();

              return _context.finish(50);

            case 54:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[2, 47, 50, 54], [4, 37, 40, 43], [9, 14], [17, 22], [25, 30]]);
    }));

    return function handleDeleteSelected() {
      return _ref2.apply(this, arguments);
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

  var _useState31 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])("Select Option"),
      dropdown1Text = _useState31[0],
      setDropdown1Text = _useState31[1];

  var _useState32 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])("Select Option"),
      dropdown2Text = _useState32[0],
      setDropdown2Text = _useState32[1];

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
  }; // --------------------
  // CLIENT SELECTION HANDLING
  // --------------------
  // This function fetches clients and opens the client modal.


  var handleClientClick = /*#__PURE__*/function () {
    var _ref3 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee2() {
      var clientsData;
      return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return Object(_utils_fetchAssociations__WEBPACK_IMPORTED_MODULE_20__[/* fetchClients */ "a"])(selectedOEM, selectedModality);

            case 2:
              clientsData = _context2.sent;
              setClients(clientsData);
              setClientSearchTerm("");
              setShowClientModal(true);

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function handleClientClick() {
      return _ref3.apply(this, arguments);
    };
  }(); // When a client is selected in the modal, we now assume the parameter is a client ID.
  // If the passed value is null, we clear the selection.


  var handleClientSelect = /*#__PURE__*/function () {
    var _ref4 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee3(clientId) {
      var clientSnap, clientData;
      return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              console.log("User selected client id:", clientId);

              if (clientId) {
                _context3.next = 5;
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
              return _context3.abrupt("return");

            case 5:
              _context3.prev = 5;
              _context3.next = 8;
              return _context_Firebase__WEBPACK_IMPORTED_MODULE_27__[/* default */ "b"].firestore().collection("Client").doc(clientId).get();

            case 8:
              clientSnap = _context3.sent;

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

              _context3.next = 15;
              break;

            case 12:
              _context3.prev = 12;
              _context3.t0 = _context3["catch"](5);
              console.error("Error fetching client data:", _context3.t0);

            case 15:
              setShowClientModal(false);

            case 16:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[5, 12]]);
    }));

    return function handleClientSelect(_x) {
      return _ref4.apply(this, arguments);
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


  var _useState33 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])([]),
      models = _useState33[0],
      setModels = _useState33[1];

  var _useState34 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(false),
      showModelModal = _useState34[0],
      setShowModelModal = _useState34[1];

  var _useState35 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])("Select Option"),
      modelButtonText = _useState35[0],
      setModelButtonText = _useState35[1];

  var handleModelClick = /*#__PURE__*/function () {
    var _ref5 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee4() {
      var modelsData;
      return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return Object(_utils_fetchAssociations__WEBPACK_IMPORTED_MODULE_20__[/* fetchModels */ "b"])(selectedOEM, selectedModality, selectedClientFrom);

            case 2:
              modelsData = _context4.sent;
              setModels(modelsData);
              setModelSearchTerm("");
              setShowModelModal(true);

            case 6:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function handleModelClick() {
      return _ref5.apply(this, arguments);
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

  var _useState36 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(""),
      clientSearchTerm = _useState36[0],
      setClientSearchTerm = _useState36[1];

  var _useState37 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(""),
      modelSearchTerm = _useState37[0],
      setModelSearchTerm = _useState37[1];

  var deleteFromStorage = /*#__PURE__*/function () {
    var _ref6 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee5(itemId) {
      var storageRef, folderRef, listResult, deletePromises;
      return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              storageRef = _context_Firebase__WEBPACK_IMPORTED_MODULE_27__[/* default */ "b"].storage().ref();
              folderRef = storageRef.child("Parts/".concat(itemId, "/"));
              _context5.prev = 2;
              _context5.next = 5;
              return folderRef.listAll();

            case 5:
              listResult = _context5.sent;
              deletePromises = listResult.items.map(function (item) {
                return item["delete"]();
              });
              _context5.next = 9;
              return Promise.all(deletePromises);

            case 9:
              _context5.next = 14;
              break;

            case 11:
              _context5.prev = 11;
              _context5.t0 = _context5["catch"](2);
              console.error("Error deleting from storage:", _context5.t0);

            case 14:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[2, 11]]);
    }));

    return function deleteFromStorage(_x2) {
      return _ref6.apply(this, arguments);
    };
  }();

  var deleteFromPartsCollection = /*#__PURE__*/function () {
    var _ref7 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee6(itemId) {
      var db;
      return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              db = _context_Firebase__WEBPACK_IMPORTED_MODULE_27__[/* default */ "b"].firestore();
              _context6.prev = 1;
              _context6.next = 4;
              return db.collection("Parts").doc(itemId)["delete"]();

            case 4:
              console.log("Deleted item from Parts collection: ".concat(itemId));
              _context6.next = 10;
              break;

            case 7:
              _context6.prev = 7;
              _context6.t0 = _context6["catch"](1);
              console.error("Error deleting from Parts collection:", _context6.t0);

            case 10:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[1, 7]]);
    }));

    return function deleteFromPartsCollection(_x3) {
      return _ref7.apply(this, arguments);
    };
  }();

  return __jsx(_LoggedIn__WEBPACK_IMPORTED_MODULE_22__["default"], null, isDeleting && __jsx("div", {
    className: "loading-overlay"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"], {
    animation: "border",
    role: "status",
    className: "spinner-center"
  }, __jsx("span", {
    className: "sr-only"
  }, "Loading..."))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], {
    show: showDeleteModal,
    onHide: handleCloseDeleteModal
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].Header, {
    closeButton: true
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].Title, null, "Confirm Deletion")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].Body, null, "Are you sure you want to delete ", selectedItems.length, " item", selectedItems.length > 1 ? "s" : "", "?"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].Footer, null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], {
    variant: "danger",
    onClick: handleDeleteSelected
  }, "Yes, delete"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], {
    variant: "secondary",
    onClick: handleCloseDeleteModal
  }, "Cancel"))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], {
    show: showClientModal,
    onHide: function onHide() {
      return setShowClientModal(false);
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].Header, {
    closeButton: true
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].Title, null, "Select ", clientSelectionType === "from" ? "Client From" : "Client Current")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].Body, null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"], {
    type: "text",
    placeholder: "Search by name",
    className: "mb-3",
    value: clientSearchTerm,
    onChange: function onChange(e) {
      return setClientSearchTerm(e.target.value);
    }
  }), __jsx(_utils_ClientTable__WEBPACK_IMPORTED_MODULE_23__[/* default */ "a"], {
    clients: clients.filter(function (client) {
      return client.name.toLowerCase().includes(clientSearchTerm.toLowerCase());
    }),
    onSelectClient: handleClientSelect,
    onInfoClick: handleClientInfo,
    isClientSearch: false,
    clearSelection: function clearSelection() {
      return handleClientSelect(null);
    }
  }))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], {
    show: showModelModal,
    onHide: function onHide() {
      return setShowModelModal(false);
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].Header, {
    closeButton: true
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].Title, null, "Select Model")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].Body, null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"], {
    type: "text",
    placeholder: "Search by name",
    className: "mb-3",
    value: modelSearchTerm,
    onChange: function onChange(e) {
      return setModelSearchTerm(e.target.value);
    }
  }), __jsx(_utils_ModelTable__WEBPACK_IMPORTED_MODULE_24__[/* default */ "a"], {
    models: models.filter(function (model) {
      return typeof model === "string" ? model.toLowerCase().includes(modelSearchTerm.toLowerCase()) : false;
    }),
    onSelectModel: handleModelSelect,
    clearSelection: function clearSelection() {
      return handleModelSelect(null);
    }
  }))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"], {
    className: "d-flex align-items-center justify-content-center",
    style: {
      minHeight: "100vh"
    }
  }, __jsx("div", {
    className: "w-100",
    style: {
      maxWidth: "1200px"
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"], null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"].Body, null, __jsx("h2", {
    className: "text-center mb-4"
  }, "Magmo"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"], null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"], {
    md: 4
  }, __jsx("div", null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_14__[/* default */ "a"], {
    className: "mb-3"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_14__[/* default */ "a"].Text, null, "OEM"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_15__[/* default */ "a"], {
    onSelect: handleSelect1
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_15__[/* default */ "a"].Toggle, {
    variant: "outline-secondary",
    id: "dropdown-button-1",
    className: "w-100"
  }, dropdown1Text), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_15__[/* default */ "a"].Menu, {
    className: "w-100"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_15__[/* default */ "a"].Item, {
    eventKey: "unassigned"
  }, "Select Option"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_15__[/* default */ "a"].Item, {
    eventKey: "GE"
  }, "GE"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_15__[/* default */ "a"].Item, {
    eventKey: "Toshiba"
  }, "Toshiba"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_15__[/* default */ "a"].Item, {
    eventKey: "Siemens"
  }, "Siemens"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_15__[/* default */ "a"].Item, {
    eventKey: "Philips"
  }, "Philips")))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_14__[/* default */ "a"], {
    className: "mb-5"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_14__[/* default */ "a"].Text, null, "Modality"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_15__[/* default */ "a"], {
    onSelect: handleSelect2
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_15__[/* default */ "a"].Toggle, {
    variant: "outline-secondary",
    id: "dropdown-button-2",
    className: "w-100"
  }, dropdown2Text), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_15__[/* default */ "a"].Menu, {
    className: "w-100"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_15__[/* default */ "a"].Item, {
    eventKey: "unassigned"
  }, "Select Option"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_15__[/* default */ "a"].Item, {
    eventKey: "CT"
  }, "CT"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_15__[/* default */ "a"].Item, {
    eventKey: "MRI"
  }, "MRI"))))), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_26___default.a.divider
  }), __jsx("div", null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_14__[/* default */ "a"], {
    className: "mb-3"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_14__[/* default */ "a"].Text, null, "Client From"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], {
    variant: "outline-secondary",
    className: "w-100",
    onClick: function onClick() {
      setClientSelectionType("from");
      handleClientClick();
    }
  }, clientFromButtonText)), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_14__[/* default */ "a"], {
    className: "mb-3"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_14__[/* default */ "a"].Text, null, "Client Current"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], {
    variant: "outline-secondary",
    className: "w-100",
    onClick: function onClick() {
      setClientSelectionType("current");
      handleClientClick();
    }
  }, clientCurrentButtonText)), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_14__[/* default */ "a"], {
    className: "mb-3"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_14__[/* default */ "a"].Text, null, "Model"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], {
    variant: "outline-secondary",
    className: "w-100",
    onClick: handleModelClick
  }, modelButtonText)), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_26___default.a.divider
  }), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_14__[/* default */ "a"], {
    className: "mb-3"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_14__[/* default */ "a"].Text, null, "Warehouse"), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_26___default.a.buttonGroup
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], {
    variant: "outline-secondary",
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_26___default.a.flexButton,
    onClick: handleSoCalWarehouseClick
  }, "SoCal Warehouse"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], {
    variant: "outline-secondary",
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_26___default.a.flexButton,
    onClick: handleNorCalWarehouseClick
  }, "NorCal Warehouse"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], {
    variant: "outline-secondary",
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_26___default.a.flexButton,
    onClick: handleWarehouseUnassignedClick
  }, "Unassigned"))))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"], {
    md: 8
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_26___default.a.tableContainer
  }, isLoading ? __jsx("div", {
    className: "d-flex justify-content-center align-items-center p-5"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"], {
    animation: "border",
    role: "status"
  }, __jsx("span", {
    className: "sr-only"
  }, "M"))) : __jsx(_utils_PartTable__WEBPACK_IMPORTED_MODULE_25__[/* default */ "a"], {
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
    setSelectedItems: setSelectedItems
  }), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_26___default.a.searchContainer
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_16__[/* default */ "a"], {
    className: "d-flex pb-2"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"], {
    type: showListSearch,
    placeholder: "Search",
    className: "me-2 flex-grow-1",
    "aria-label": "Search",
    value: search,
    onChange: searchChangeHandler,
    style: {
      flex: "1"
    }
  }), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_17__[/* default */ "a"], {
    title: select,
    id: "collasible-nav-dropdown",
    show: showList,
    onMouseEnter: function onMouseEnter() {
      return setShowList(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setShowList(false);
    },
    style: {
      marginTop: "-5px"
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_17__[/* default */ "a"].Item, {
    onClick: function onClick() {
      setSelect("Name");
      setShowListSearch("text");
    }
  }, "Name"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_17__[/* default */ "a"].Item, {
    onClick: function onClick() {
      setSelect("Date");
      setShowListSearch("date");
    }
  }, "Date"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_17__[/* default */ "a"].Item, {
    onClick: function onClick() {
      setSelect("Work Order");
      setShowListSearch("number");
    }
  }, "Work Order"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_17__[/* default */ "a"].Item, {
    onClick: function onClick() {
      setSelect("Product Number");
      setShowListSearch("number");
    }
  }, "Product Number"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_17__[/* default */ "a"].Item, {
    onClick: function onClick() {
      setSelect("Description");
      setShowListSearch("text");
    }
  }, "Description"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_17__[/* default */ "a"].Item, {
    onClick: function onClick() {
      setSelect("SKU");
      setShowListSearch("text");
    }
  }, "SKU"))), __jsx("div", {
    className: "d-flex justify-content-between"
  }, __jsx(LoadingButton, {
    type: "secondary",
    name: "Add New Item",
    route: "NewSearch/AddItem/NewItem"
  }), __jsx(LoadingButton, {
    type: "primary",
    name: "Back",
    route: "Warehousedb/WarehouseSelect"
  })))))))))));
}

/***/ }),

/***/ "cTJO":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = __webpack_require__("zoAU");

var _interopRequireWildcard = __webpack_require__("7KCV");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(__webpack_require__("q1tI"));

var _router = __webpack_require__("elyg");

var _router2 = __webpack_require__("nOHt");

var _useIntersection = __webpack_require__("vNVm");

var prefetched = {};

function prefetch(router, href, as, options) {
  if ( false || !router) return;
  if (!(0, _router.isLocalURL)(href)) return; // Prefetch the JSON page if asked (only in the client)
  // We need to handle a prefetch error here since we may be
  // loading with priority which can reject but we don't
  // want to force navigation since this is only a prefetch

  router.prefetch(href, as, options)["catch"](function (err) {
    if (false) {}
  });
  var curLocale = options && typeof options.locale !== 'undefined' ? options.locale : router && router.locale; // Join on an invalid URI character

  prefetched[href + '%' + as + (curLocale ? '%' + curLocale : '')] = true;
}

function isModifiedEvent(event) {
  var target = event.currentTarget.target;
  return target && target !== '_self' || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || // triggers resource download
  event.nativeEvent && event.nativeEvent.which === 2;
}

function linkClicked(e, router, href, as, replace, shallow, scroll, locale) {
  var nodeName = e.currentTarget.nodeName;

  if (nodeName === 'A' && (isModifiedEvent(e) || !(0, _router.isLocalURL)(href))) {
    // ignore click for browser’s default behavior
    return;
  }

  e.preventDefault(); //  avoid scroll for urls with anchor refs

  if (scroll == null) {
    scroll = as.indexOf('#') < 0;
  } // replace state instead of push if prop is present


  router[replace ? 'replace' : 'push'](href, as, {
    shallow: shallow,
    locale: locale,
    scroll: scroll
  });
}

function Link(props) {
  if (false) { var hasWarned, optionalProps, optionalPropsGuard, requiredProps, requiredPropsGuard, createPropError; }

  var p = props.prefetch !== false;
  var router = (0, _router2.useRouter)();
  var pathname = router && router.asPath || '/';

  var _react$default$useMem = _react["default"].useMemo(function () {
    var _ref = (0, _router.resolveHref)(pathname, props.href, true),
        _ref2 = _slicedToArray(_ref, 2),
        resolvedHref = _ref2[0],
        resolvedAs = _ref2[1];

    return {
      href: resolvedHref,
      as: props.as ? (0, _router.resolveHref)(pathname, props.as) : resolvedAs || resolvedHref
    };
  }, [pathname, props.href, props.as]),
      href = _react$default$useMem.href,
      as = _react$default$useMem.as;

  var children = props.children,
      replace = props.replace,
      shallow = props.shallow,
      scroll = props.scroll,
      locale = props.locale; // Deprecated. Warning shown by propType check. If the children provided is a string (<Link>example</Link>) we wrap it in an <a> tag

  if (typeof children === 'string') {
    children = /*#__PURE__*/_react["default"].createElement("a", null, children);
  } // This will return the first child, if multiple are provided it will throw an error


  var child = _react.Children.only(children);

  var childRef = child && typeof child === 'object' && child.ref;

  var _ref3 = (0, _useIntersection.useIntersection)({
    rootMargin: '200px'
  }),
      _ref4 = _slicedToArray(_ref3, 2),
      setIntersectionRef = _ref4[0],
      isVisible = _ref4[1];

  var setRef = _react["default"].useCallback(function (el) {
    setIntersectionRef(el);

    if (childRef) {
      if (typeof childRef === 'function') childRef(el);else if (typeof childRef === 'object') {
        childRef.current = el;
      }
    }
  }, [childRef, setIntersectionRef]);

  (0, _react.useEffect)(function () {
    var shouldPrefetch = isVisible && p && (0, _router.isLocalURL)(href);
    var curLocale = typeof locale !== 'undefined' ? locale : router && router.locale;
    var isPrefetched = prefetched[href + '%' + as + (curLocale ? '%' + curLocale : '')];

    if (shouldPrefetch && !isPrefetched) {
      prefetch(router, href, as, {
        locale: curLocale
      });
    }
  }, [as, href, isVisible, locale, p, router]);
  var childProps = {
    ref: setRef,
    onClick: function onClick(e) {
      if (child.props && typeof child.props.onClick === 'function') {
        child.props.onClick(e);
      }

      if (!e.defaultPrevented) {
        linkClicked(e, router, href, as, replace, shallow, scroll, locale);
      }
    }
  };

  childProps.onMouseEnter = function (e) {
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
    var curLocale = typeof locale !== 'undefined' ? locale : router && router.locale; // we only render domain locales if we are currently on a domain locale
    // so that locale links are still visitable in development/preview envs

    var localeDomain = router && router.isLocaleDomain && (0, _router.getDomainLocale)(as, curLocale, router && router.locales, router && router.domainLocales);
    childProps.href = localeDomain || (0, _router.addBasePath)((0, _router.addLocale)(as, curLocale, router && router.defaultLocale));
  }

  return /*#__PURE__*/_react["default"].cloneElement(child, childProps);
}

var _default = Link;
exports["default"] = _default;

/***/ }),

/***/ "etfB":
/***/ (function(module, exports, __webpack_require__) {


    (window.__NEXT_P = window.__NEXT_P || []).push([
      "/NewSearch/mainSearch",
      function () {
        return __webpack_require__("ZptN");
      }
    ]);
  

/***/ }),

/***/ "vNVm":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = __webpack_require__("zoAU");

exports.__esModule = true;
exports.useIntersection = useIntersection;

var _react = __webpack_require__("q1tI");

var _requestIdleCallback = __webpack_require__("0G5g");

var hasIntersectionObserver = typeof IntersectionObserver !== 'undefined';

function useIntersection(_ref) {
  var rootMargin = _ref.rootMargin,
      disabled = _ref.disabled;
  var isDisabled = disabled || !hasIntersectionObserver;
  var unobserve = (0, _react.useRef)();

  var _ref2 = (0, _react.useState)(false),
      _ref3 = _slicedToArray(_ref2, 2),
      visible = _ref3[0],
      setVisible = _ref3[1];

  var setRef = (0, _react.useCallback)(function (el) {
    if (unobserve.current) {
      unobserve.current();
      unobserve.current = undefined;
    }

    if (isDisabled || visible) return;

    if (el && el.tagName) {
      unobserve.current = observe(el, function (isVisible) {
        return isVisible && setVisible(isVisible);
      }, {
        rootMargin: rootMargin
      });
    }
  }, [isDisabled, rootMargin, visible]);
  (0, _react.useEffect)(function () {
    if (!hasIntersectionObserver) {
      if (!visible) {
        var idleCallback = (0, _requestIdleCallback.requestIdleCallback)(function () {
          return setVisible(true);
        });
        return function () {
          return (0, _requestIdleCallback.cancelIdleCallback)(idleCallback);
        };
      }
    }
  }, [visible]);
  return [setRef, visible];
}

function observe(element, callback, options) {
  var _createObserver = createObserver(options),
      id = _createObserver.id,
      observer = _createObserver.observer,
      elements = _createObserver.elements;

  elements.set(element, callback);
  observer.observe(element);
  return function unobserve() {
    elements["delete"](element);
    observer.unobserve(element); // Destroy observer when there's nothing left to watch:

    if (elements.size === 0) {
      observer.disconnect();
      observers["delete"](id);
    }
  };
}

var observers = new Map();

function createObserver(options) {
  var id = options.rootMargin || '';
  var instance = observers.get(id);

  if (instance) {
    return instance;
  }

  var elements = new Map();
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      var callback = elements.get(entry.target);
      var isVisible = entry.isIntersecting || entry.intersectionRatio > 0;

      if (callback && isVisible) {
        callback(isVisible);
      }
    });
  }, options);
  observers.set(id, instance = {
    id: id,
    observer: observer,
    elements: elements
  });
  return instance;
}

/***/ })

},[["etfB",1,0,5,3,2,4,6,7,9,10,11,12,13]]]);