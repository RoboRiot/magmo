_N_E =
(window["webpackJsonp_N_E"] = window["webpackJsonp_N_E"] || []).push([[49],{

/***/ "0iv+":
/***/ (function(module, exports, __webpack_require__) {


    (window.__NEXT_P = window.__NEXT_P || []).push([
      "/NewSearch/searchTest",
      function () {
        return __webpack_require__("6QUu");
      }
    ]);
  

/***/ }),

/***/ "20a2":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("nOHt")


/***/ }),

/***/ "3Z9Z":
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





const Row = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["forwardRef"](({
  bsPrefix,
  className,
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component = 'div',
  ...props
}, ref) => {
  const decoratedBsPrefix = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_2__[/* useBootstrapPrefix */ "e"])(bsPrefix, 'row');
  const breakpoints = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_2__[/* useBootstrapBreakpoints */ "c"])();
  const minBreakpoint = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_2__[/* useBootstrapMinBreakpoint */ "d"])();
  const sizePrefix = `${decoratedBsPrefix}-cols`;
  const classes = [];
  breakpoints.forEach(brkPoint => {
    const propValue = props[brkPoint];
    delete props[brkPoint];
    let cols;
    if (propValue != null && typeof propValue === 'object') {
      ({
        cols
      } = propValue);
    } else {
      cols = propValue;
    }
    const infix = brkPoint !== minBreakpoint ? `-${brkPoint}` : '';
    if (cols != null) classes.push(`${sizePrefix}${infix}-${cols}`);
  });
  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__["jsx"])(Component, {
    ref: ref,
    ...props,
    className: classnames__WEBPACK_IMPORTED_MODULE_0___default()(className, decoratedBsPrefix, ...classes)
  });
});
Row.displayName = 'Row';
/* harmony default export */ __webpack_exports__["a"] = (Row);

/***/ }),

/***/ "6QUu":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "default", function() { return /* binding */ searchTest; });

// EXTERNAL MODULE: ./node_modules/next/node_modules/@babel/runtime/helpers/esm/toConsumableArray.js + 3 modules
var toConsumableArray = __webpack_require__("z7pX");

// EXTERNAL MODULE: ./node_modules/next/node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__("vJKn");
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);

// EXTERNAL MODULE: ./node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray.js + 3 modules
var slicedToArray = __webpack_require__("xvhg");

// EXTERNAL MODULE: ./node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("rg98");

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__("q1tI");
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/Spinner.js
var Spinner = __webpack_require__("T/rR");

// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/Modal.js + 6 modules
var Modal = __webpack_require__("zM5D");

// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/Button.js
var Button = __webpack_require__("cWnB");

// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/FormControl.js
var FormControl = __webpack_require__("jDKy");

// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/Container.js
var Container = __webpack_require__("7vrA");

// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/Card.js + 10 modules
var Card = __webpack_require__("6xyR");

// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/Row.js
var Row = __webpack_require__("3Z9Z");

// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/Col.js
var Col = __webpack_require__("JI6e");

// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/InputGroup.js + 1 modules
var InputGroup = __webpack_require__("zUrK");

// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/Dropdown.js + 70 modules
var Dropdown = __webpack_require__("97+O");

// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/Form.js + 11 modules
var Form = __webpack_require__("QojX");

// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/NavDropdown.js + 1 modules
var NavDropdown = __webpack_require__("GWEY");

// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__("YFqc");
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);

// EXTERNAL MODULE: ./node_modules/next/router.js
var next_router = __webpack_require__("20a2");

// EXTERNAL MODULE: ./node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__("cpVT");

// EXTERNAL MODULE: ./context/Firebase.js + 6 modules
var Firebase = __webpack_require__("NY6m");

// CONCATENATED MODULE: ./utils/testFetch.js




function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { Object(defineProperty["a" /* default */])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }


/**
 * Fetches all documents from the "TestItem" collection, enriches each with its machine data
 * and client name, and returns an array of items.
 */

function fetchTestItemsWithMachineData() {
  return _fetchTestItemsWithMachineData.apply(this, arguments);
}
/**
 * Fetches all clients, optionally filtering by OEM or modality.
 */

function _fetchTestItemsWithMachineData() {
  _fetchTestItemsWithMachineData = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee2() {
    var db, partsSnapshot, parts;
    return regenerator_default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            db = Firebase["b" /* default */].firestore();
            _context2.next = 3;
            return db.collection("TestItem").get();

          case 3:
            partsSnapshot = _context2.sent;
            _context2.next = 6;
            return Promise.all(partsSnapshot.docs.map( /*#__PURE__*/function () {
              var _ref = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee(partDoc) {
                var partData, machineDoc, clientDoc;
                return regenerator_default.a.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        partData = partDoc.data();
                        partData.id = partDoc.id; // If there's a Machine reference, fetch its data and client name

                        if (!(partData.Machine && partData.Machine instanceof Firebase["b" /* default */].firestore.DocumentReference)) {
                          _context.next = 14;
                          break;
                        }

                        _context.next = 5;
                        return partData.Machine.get();

                      case 5:
                        machineDoc = _context.sent;
                        partData.machineData = machineDoc.exists ? machineDoc.data() : {};

                        if (!partData.machineData.client) {
                          _context.next = 12;
                          break;
                        }

                        _context.next = 10;
                        return partData.machineData.client.get();

                      case 10:
                        clientDoc = _context.sent;
                        partData.machineData.Client = clientDoc.exists ? clientDoc.data().name : "";

                      case 12:
                        _context.next = 15;
                        break;

                      case 14:
                        partData.machineData = {};

                      case 15:
                        return _context.abrupt("return", partData);

                      case 16:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function (_x6) {
                return _ref.apply(this, arguments);
              };
            }()));

          case 6:
            parts = _context2.sent;
            return _context2.abrupt("return", parts);

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _fetchTestItemsWithMachineData.apply(this, arguments);
}

function fetchClients(_x, _x2) {
  return _fetchClients.apply(this, arguments);
}
/**
 * Fetches all machine models, optionally filtering by OEM, modality, or client.
 */

function _fetchClients() {
  _fetchClients = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee3(selectedOEM, selectedModality) {
    var db, clientsSnapshot, clients, filteredClients, _iterator, _step, client, match, _iterator2, _step2, machineRef, machineDoc, machineData;

    return regenerator_default.a.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            db = Firebase["b" /* default */].firestore();
            _context3.next = 3;
            return db.collection("Client").get();

          case 3:
            clientsSnapshot = _context3.sent;
            clients = clientsSnapshot.docs.map(function (doc) {
              return _objectSpread({
                id: doc.id
              }, doc.data());
            });

            if (!(selectedOEM || selectedModality)) {
              _context3.next = 50;
              break;
            }

            filteredClients = [];
            _iterator = _createForOfIteratorHelper(clients);
            _context3.prev = 8;

            _iterator.s();

          case 10:
            if ((_step = _iterator.n()).done) {
              _context3.next = 41;
              break;
            }

            client = _step.value;
            match = true;
            _iterator2 = _createForOfIteratorHelper(client.machines);
            _context3.prev = 14;

            _iterator2.s();

          case 16:
            if ((_step2 = _iterator2.n()).done) {
              _context3.next = 30;
              break;
            }

            machineRef = _step2.value;
            _context3.next = 20;
            return machineRef.get();

          case 20:
            machineDoc = _context3.sent;
            machineData = machineDoc.data();

            if (!(selectedOEM && machineData.OEM === selectedOEM || selectedModality && machineData.Modality === selectedModality)) {
              _context3.next = 27;
              break;
            }

            match = true;
            return _context3.abrupt("break", 30);

          case 27:
            match = false;

          case 28:
            _context3.next = 16;
            break;

          case 30:
            _context3.next = 35;
            break;

          case 32:
            _context3.prev = 32;
            _context3.t0 = _context3["catch"](14);

            _iterator2.e(_context3.t0);

          case 35:
            _context3.prev = 35;

            _iterator2.f();

            return _context3.finish(35);

          case 38:
            if (match) filteredClients.push(client);

          case 39:
            _context3.next = 10;
            break;

          case 41:
            _context3.next = 46;
            break;

          case 43:
            _context3.prev = 43;
            _context3.t1 = _context3["catch"](8);

            _iterator.e(_context3.t1);

          case 46:
            _context3.prev = 46;

            _iterator.f();

            return _context3.finish(46);

          case 49:
            return _context3.abrupt("return", filteredClients);

          case 50:
            return _context3.abrupt("return", clients);

          case 51:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[8, 43, 46, 49], [14, 32, 35, 38]]);
  }));
  return _fetchClients.apply(this, arguments);
}

function fetchModels(_x3, _x4, _x5) {
  return _fetchModels.apply(this, arguments);
}
/**
 * Converts a Firestore timestamp or ISO/string/number into MM/DD/YYYY format.
 */

function _fetchModels() {
  _fetchModels = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee5(selectedOEM, selectedModality, selectedClient) {
    var db, machinesSnapshot, models;
    return regenerator_default.a.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            db = Firebase["b" /* default */].firestore();
            _context5.next = 3;
            return db.collection("Machine").get();

          case 3:
            machinesSnapshot = _context5.sent;
            models = new Set();
            _context5.next = 7;
            return Promise.all(machinesSnapshot.docs.map( /*#__PURE__*/function () {
              var _ref2 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee4(machineDoc) {
                var machineData, isValid, clientDoc;
                return regenerator_default.a.wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        machineData = machineDoc.data();
                        isValid = true;
                        if (selectedOEM && machineData.OEM !== selectedOEM) isValid = false;
                        if (selectedModality && machineData.Modality !== selectedModality) isValid = false;

                        if (!(selectedClient && machineData.client)) {
                          _context4.next = 9;
                          break;
                        }

                        _context4.next = 7;
                        return machineData.client.get();

                      case 7:
                        clientDoc = _context4.sent;
                        if (!clientDoc.exists || clientDoc.data().name !== selectedClient) isValid = false;

                      case 9:
                        if (isValid) {
                          models.add(machineData.Model);
                        }

                      case 10:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4);
              }));

              return function (_x7) {
                return _ref2.apply(this, arguments);
              };
            }()));

          case 7:
            return _context5.abrupt("return", Array.from(models));

          case 8:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _fetchModels.apply(this, arguments);
}

function formatDate(timestamp) {
  if (!timestamp) return "";
  var date;

  if (timestamp.toDate) {
    date = timestamp.toDate();
  } else if (typeof timestamp === "string" || typeof timestamp === "number") {
    date = new Date(timestamp);
  } else {
    return "";
  }

  var day = String(date.getDate()).padStart(2, "0");
  var month = String(date.getMonth() + 1).padStart(2, "0");
  var year = date.getFullYear();
  return "".concat(month, "/").concat(day, "/").concat(year);
}
// EXTERNAL MODULE: ./context/AuthUserContext.js + 1 modules
var AuthUserContext = __webpack_require__("XrFm");

// EXTERNAL MODULE: ./pages/LoggedIn.js
var LoggedIn = __webpack_require__("mJJZ");

// EXTERNAL MODULE: ./utils/ClientTable.js
var ClientTable = __webpack_require__("8HvV");

// EXTERNAL MODULE: ./utils/ModelTable.js
var ModelTable = __webpack_require__("TM8N");

// EXTERNAL MODULE: ./utils/PartTable.js
var PartTable = __webpack_require__("MSWM");

// EXTERNAL MODULE: ./styles/MainSearch.module.css
var MainSearch_module = __webpack_require__("Dktn");
var MainSearch_module_default = /*#__PURE__*/__webpack_require__.n(MainSearch_module);

// CONCATENATED MODULE: ./pages/NewSearch/searchTest.js




var __jsx = react_default.a.createElement;

function searchTest_createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = searchTest_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function searchTest_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return searchTest_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return searchTest_arrayLikeToArray(o, minLen); }

function searchTest_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }












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

  var _useState = Object(react["useState"])(false),
      isLoading = _useState[0],
      setLoading = _useState[1];

  Object(react["useEffect"])(function () {
    if (isLoading) {
      simulateNetworkRequest().then(function () {
        return setLoading(false);
      });
    }
  }, [isLoading]);
  return __jsx(link_default.a, {
    href: "/".concat(route)
  }, __jsx("a", {
    className: "btn btn-".concat(type),
    disabled: isLoading,
    onClick: function onClick() {
      return !isLoading && setLoading(true);
    }
  }, isLoading ? "Loading…" : name));
}

function searchTest() {
  var _useAuth = Object(AuthUserContext["b" /* useAuth */])(),
      signOut = _useAuth.signOut;

  var _useState2 = Object(react["useState"])([]),
      info = _useState2[0],
      setInfo = _useState2[1];

  var _useState3 = Object(react["useState"])([]),
      backupInfo = _useState3[0],
      setBackupInfo = _useState3[1];

  var _useState4 = Object(react["useState"])([]),
      ids = _useState4[0],
      setID = _useState4[1];

  var _useState5 = Object(react["useState"])(false),
      show = _useState5[0],
      setShow = _useState5[1];

  var _useState6 = Object(react["useState"])(),
      dItem = _useState6[0],
      setDItem = _useState6[1];

  var _useState7 = Object(react["useState"])("Name"),
      select = _useState7[0],
      setSelect = _useState7[1];

  var _useState8 = Object(react["useState"])(false),
      showList = _useState8[0],
      setShowList = _useState8[1];

  var _useState9 = Object(react["useState"])("text"),
      showListSearch = _useState9[0],
      setShowListSearch = _useState9[1];

  var _useState10 = Object(react["useState"])(""),
      search = _useState10[0],
      setSearch = _useState10[1];

  var _useState11 = Object(react["useState"])(null),
      selectedOEM = _useState11[0],
      setSelectedOEM = _useState11[1];

  var _useState12 = Object(react["useState"])(null),
      selectedModality = _useState12[0],
      setSelectedModality = _useState12[1]; // Replace the old single client state with two sets:


  var _useState13 = Object(react["useState"])(null),
      selectedClientFrom = _useState13[0],
      setSelectedClientFrom = _useState13[1];

  var _useState14 = Object(react["useState"])("Select Option"),
      clientFromButtonText = _useState14[0],
      setClientFromButtonText = _useState14[1];

  var _useState15 = Object(react["useState"])(null),
      selectedClientCurrent = _useState15[0],
      setSelectedClientCurrent = _useState15[1];

  var _useState16 = Object(react["useState"])("Select Option"),
      clientCurrentButtonText = _useState16[0],
      setClientCurrentButtonText = _useState16[1];

  var _useState17 = Object(react["useState"])([]),
      clients = _useState17[0],
      setClients = _useState17[1];

  var _useState18 = Object(react["useState"])(false),
      showClientModal = _useState18[0],
      setShowClientModal = _useState18[1]; // This state tells the modal which client box is being updated: "from" or "current"


  var _useState19 = Object(react["useState"])(null),
      clientSelectionType = _useState19[0],
      setClientSelectionType = _useState19[1];

  var router = Object(next_router["useRouter"])();
  var labelBase = ["name", "date", "w/o", "p/n", "s/n"];
  var labelBaseNames = ["name", "date", "wo", "pn", "sn"];
  var sortCheckBase = [false, false, false, false, false, false];

  var _useState20 = Object(react["useState"])(labelBase),
      labels = _useState20[0],
      setLabels = _useState20[1];

  var _useState21 = Object(react["useState"])(sortCheckBase),
      sortCheck = _useState21[0],
      setSortCheck = _useState21[1];

  var _useState22 = Object(react["useState"])(null),
      hoverIndex = _useState22[0],
      setHoverIndex = _useState22[1];

  var _useState23 = Object(react["useState"])(null),
      selectedModel = _useState23[0],
      setSelectedModel = _useState23[1];

  var _useState24 = Object(react["useState"])(null),
      gPos = _useState24[0],
      setGPos = _useState24[1];

  var _useState25 = Object(react["useState"])(null),
      gIde = _useState25[0],
      setGIde = _useState25[1];

  var _useState26 = Object(react["useState"])(false),
      isDeleting = _useState26[0],
      setIsDeleting = _useState26[1]; // Fetch data on component mount and route change


  Object(react["useEffect"])(function () {
    fetchData();
  }, [router.route]);

  function fetchData() {
    return _fetchData.apply(this, arguments);
  }

  function _fetchData() {
    _fetchData = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee9() {
      var data;
      return regenerator_default.a.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              if (router.query.inputText && router.query.selectedType) {
                setSelect(router.query.selectedType);
                setSearch(router.query.inputText);
              }

              _context9.next = 3;
              return fetchTestItemsWithMachineData();

            case 3:
              data = _context9.sent;
              setInfo(data);
              setBackupInfo(data);
              setID(data.map(function (item) {
                return item.id;
              })); // Ensure IDs are correctly set here

            case 7:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    }));
    return _fetchData.apply(this, arguments);
  }

  var searchChangeHandler = function searchChangeHandler(event) {
    return setSearch(event.target.value);
  }; // Asynchronous filter function that loops through backupInfo and,
  // for each item, fetches its Machine and CurrentMachine documents,
  // then compares the client id (from machineData.client.id) to the selected client.


  Object(react["useEffect"])(function () {
    function filterParts() {
      return _filterParts.apply(this, arguments);
    }

    function _filterParts() {
      _filterParts = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee2() {
        var filtered, filteredResults;
        return regenerator_default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                console.log("filterParts called with selectedClientFrom:", selectedClientFrom, "selectedClientCurrent:", selectedClientCurrent);
                _context2.next = 3;
                return Promise.all(backupInfo.map( /*#__PURE__*/function () {
                  var _ref2 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee(item) {
                    var passes, machineSnap, machineData, clientFromId, currentMachineSnap, currentMachineData, clientCurrentId, _item$date$split, _item$date$split2, month, day, year, reformattedDate;

                    return regenerator_default.a.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            if (item.visible) {
                              _context.next = 2;
                              break;
                            }

                            return _context.abrupt("return", null);

                          case 2:
                            passes = true; // Check OEM, Modality, and Model from machineData (if available)

                            if (item.machineData) {
                              if (selectedOEM && item.machineData.OEM !== selectedOEM) passes = false;
                              if (selectedModality && item.machineData.Modality !== selectedModality) passes = false;
                              if (selectedModel && item.machineData.Model !== selectedModel) passes = false;
                            } // For Client From: use the part’s Machine reference


                            if (!(passes && selectedClientFrom)) {
                              _context.next = 21;
                              break;
                            }

                            if (item.Machine) {
                              _context.next = 10;
                              break;
                            }

                            console.log("Item ".concat(item.id, " has no Machine reference."));
                            passes = false;
                            _context.next = 21;
                            break;

                          case 10:
                            _context.prev = 10;
                            _context.next = 13;
                            return item.Machine.get();

                          case 13:
                            machineSnap = _context.sent;

                            if (!machineSnap.exists) {
                              console.log("Item ".concat(item.id, " Machine document does not exist."));
                              passes = false;
                            } else {
                              machineData = machineSnap.data();

                              if (!machineData.client) {
                                console.log("Item ".concat(item.id, " Machine has no client reference."));
                                passes = false;
                              } else {
                                // Get the client id from the DocumentReference
                                clientFromId = machineData.client.id;
                                console.log("Item ".concat(item.id, ": fetched Client From id = ").concat(clientFromId, ", selectedClientFrom = ").concat(selectedClientFrom));
                                if (clientFromId !== selectedClientFrom) passes = false;
                              }
                            }

                            _context.next = 21;
                            break;

                          case 17:
                            _context.prev = 17;
                            _context.t0 = _context["catch"](10);
                            console.error("Error fetching Machine for item ".concat(item.id, ":"), _context.t0);
                            passes = false;

                          case 21:
                            if (!(passes && selectedClientCurrent)) {
                              _context.next = 38;
                              break;
                            }

                            if (item.CurrentMachine) {
                              _context.next = 27;
                              break;
                            }

                            console.log("Item ".concat(item.id, " has no CurrentMachine reference."));
                            passes = false;
                            _context.next = 38;
                            break;

                          case 27:
                            _context.prev = 27;
                            _context.next = 30;
                            return item.CurrentMachine.get();

                          case 30:
                            currentMachineSnap = _context.sent;

                            if (!currentMachineSnap.exists) {
                              console.log("Item ".concat(item.id, " CurrentMachine document does not exist."));
                              passes = false;
                            } else {
                              currentMachineData = currentMachineSnap.data();

                              if (!currentMachineData.client) {
                                console.log("Item ".concat(item.id, " CurrentMachine has no client reference."));
                                passes = false;
                              } else {
                                clientCurrentId = currentMachineData.client.id;
                                console.log("Item ".concat(item.id, ": fetched Client Current id = ").concat(clientCurrentId, ", selectedClientCurrent = ").concat(selectedClientCurrent));
                                if (clientCurrentId !== selectedClientCurrent) passes = false;
                              }
                            }

                            _context.next = 38;
                            break;

                          case 34:
                            _context.prev = 34;
                            _context.t1 = _context["catch"](27);
                            console.error("Error fetching CurrentMachine for item ".concat(item.id, ":"), _context.t1);
                            passes = false;

                          case 38:
                            // If search text is not empty, apply additional filtering
                            if (passes && search !== "") {
                              if (select === "Name" && !item.name.toLowerCase().includes(search.toLowerCase())) passes = false;

                              if (select === "Date") {
                                _item$date$split = item.date.split("/"), _item$date$split2 = Object(slicedToArray["a" /* default */])(_item$date$split, 3), month = _item$date$split2[0], day = _item$date$split2[1], year = _item$date$split2[2];
                                reformattedDate = "".concat(year, "-").concat(month, "-").concat(day);
                                if (reformattedDate !== search) passes = false;
                              }

                              if (select === "Work Order" && item.wo !== search) passes = false;
                              if (select === "Product Number" && item.pn !== search) passes = false;
                              if (select === "Description" && !item.desc.toLowerCase().includes(search.toLowerCase())) passes = false;
                              if (select === "SKU" && !item.id.toLowerCase().includes(search.toLowerCase())) passes = false;
                            }

                            return _context.abrupt("return", passes ? item : null);

                          case 40:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee, null, [[10, 17], [27, 34]]);
                  }));

                  return function (_x) {
                    return _ref2.apply(this, arguments);
                  };
                }()));

              case 3:
                filtered = _context2.sent;
                filteredResults = filtered.filter(function (item) {
                  return item !== null;
                });
                console.log("Filtered result count:", filteredResults.length);
                setInfo(filteredResults);

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));
      return _filterParts.apply(this, arguments);
    }

    filterParts();
  }, [selectedOEM, selectedModality, selectedClientFrom, selectedClientCurrent, selectedModel, search, backupInfo]);

  function sortCheckAll(pos) {
    var sortedInfo = Object(toConsumableArray["a" /* default */])(info).sort(function (a, b) {
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

  var _useState27 = Object(react["useState"])([]),
      selectedItems = _useState27[0],
      setSelectedItems = _useState27[1];

  var _useState28 = Object(react["useState"])(false),
      showDeleteModal = _useState28[0],
      setShowDeleteModal = _useState28[1];

  var handleSelectItem = function handleSelectItem(id) {
    setSelectedItems(function (prev) {
      var newSelection = prev.includes(id) ? prev.filter(function (itemId) {
        return itemId !== id;
      }) : [].concat(Object(toConsumableArray["a" /* default */])(prev), [id]);
      console.log("Selected items:", newSelection);
    });
  };

  var handleShowDeleteModal = function handleShowDeleteModal() {
    return setShowDeleteModal(true);
  };

  var handleCloseDeleteModal = function handleCloseDeleteModal() {
    return setShowDeleteModal(false);
  };

  var handleDeleteSelected = /*#__PURE__*/function () {
    var _ref3 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee3() {
      var db, _iterator, _step, itemId;

      return regenerator_default.a.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              setIsDeleting(true);
              db = Firebase["b" /* default */].firestore();
              _context3.prev = 2;
              // Loop over each selected item one at a time
              _iterator = searchTest_createForOfIteratorHelper(selectedItems);
              _context3.prev = 4;

              _iterator.s();

            case 6:
              if ((_step = _iterator.n()).done) {
                _context3.next = 35;
                break;
              }

              itemId = _step.value;
              console.log(itemId);
              _context3.prev = 9;
              _context3.next = 12;
              return db.collection("TestItem").doc(itemId)["delete"]();

            case 12:
              _context3.next = 17;
              break;

            case 14:
              _context3.prev = 14;
              _context3.t0 = _context3["catch"](9);
              console.error("Error deleting document ".concat(itemId, " from TestItem:"), _context3.t0);

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

              _iterator.e(_context3.t3);

            case 40:
              _context3.prev = 40;

              _iterator.f();

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
      }, _callee3, null, [[2, 47, 50, 54], [4, 37, 40, 43], [9, 14], [17, 22], [25, 30]]);
    }));

    return function handleDeleteSelected() {
      return _ref3.apply(this, arguments);
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

  var _useState29 = Object(react["useState"])("Select Option"),
      dropdown1Text = _useState29[0],
      setDropdown1Text = _useState29[1];

  var _useState30 = Object(react["useState"])("Select Option"),
      dropdown2Text = _useState30[0],
      setDropdown2Text = _useState30[1];

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
    var _ref4 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee4() {
      var clientsData;
      return regenerator_default.a.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return fetchClients(selectedOEM, selectedModality);

            case 2:
              clientsData = _context4.sent;
              setClients(clientsData);
              setClientSearchTerm("");
              setShowClientModal(true);

            case 6:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function handleClientClick() {
      return _ref4.apply(this, arguments);
    };
  }(); // When a client is selected in the modal, we now assume the parameter is a client ID.
  // If the passed value is null, we clear the selection.


  var handleClientSelect = /*#__PURE__*/function () {
    var _ref5 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee5(clientId) {
      var clientSnap, clientData;
      return regenerator_default.a.wrap(function _callee5$(_context5) {
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
              return Firebase["b" /* default */].firestore().collection("Client").doc(clientId).get();

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
      }, _callee5, null, [[5, 12]]);
    }));

    return function handleClientSelect(_x2) {
      return _ref5.apply(this, arguments);
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


  var _useState31 = Object(react["useState"])([]),
      models = _useState31[0],
      setModels = _useState31[1];

  var _useState32 = Object(react["useState"])(false),
      showModelModal = _useState32[0],
      setShowModelModal = _useState32[1];

  var _useState33 = Object(react["useState"])("Select Option"),
      modelButtonText = _useState33[0],
      setModelButtonText = _useState33[1];

  var handleModelClick = /*#__PURE__*/function () {
    var _ref6 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee6() {
      var modelsData;
      return regenerator_default.a.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return fetchModels(selectedOEM, selectedModality, selectedClientFrom);

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
      }, _callee6);
    }));

    return function handleModelClick() {
      return _ref6.apply(this, arguments);
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

  var _useState34 = Object(react["useState"])(""),
      clientSearchTerm = _useState34[0],
      setClientSearchTerm = _useState34[1];

  var _useState35 = Object(react["useState"])(""),
      modelSearchTerm = _useState35[0],
      setModelSearchTerm = _useState35[1];

  var deleteFromStorage = /*#__PURE__*/function () {
    var _ref7 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee7(itemId) {
      var storageRef, folderRef, listResult, deletePromises;
      return regenerator_default.a.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              storageRef = Firebase["b" /* default */].storage().ref();
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
      }, _callee7, null, [[2, 11]]);
    }));

    return function deleteFromStorage(_x3) {
      return _ref7.apply(this, arguments);
    };
  }();

  var deleteFromPartsCollection = /*#__PURE__*/function () {
    var _ref8 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee8(itemId) {
      var db;
      return regenerator_default.a.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              db = Firebase["b" /* default */].firestore();
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
      }, _callee8, null, [[1, 7]]);
    }));

    return function deleteFromPartsCollection(_x4) {
      return _ref8.apply(this, arguments);
    };
  }();

  return __jsx(LoggedIn["default"], null, isDeleting && __jsx("div", {
    className: "loading-overlay"
  }, __jsx(Spinner["a" /* default */], {
    animation: "border",
    role: "status",
    className: "spinner-center"
  }, __jsx("span", {
    className: "sr-only"
  }, "Loading..."))), __jsx(Modal["a" /* default */], {
    show: showDeleteModal,
    onHide: handleCloseDeleteModal
  }, __jsx(Modal["a" /* default */].Header, {
    closeButton: true
  }, __jsx(Modal["a" /* default */].Title, null, "Confirm Deletion")), __jsx(Modal["a" /* default */].Body, null, "Are you sure you want to delete ", selectedItems.length, " item", selectedItems.length > 1 ? "s" : "", "?"), __jsx(Modal["a" /* default */].Footer, null, __jsx(Button["a" /* default */], {
    variant: "danger",
    onClick: handleDeleteSelected
  }, "Yes, delete"), __jsx(Button["a" /* default */], {
    variant: "secondary",
    onClick: handleCloseDeleteModal
  }, "Cancel"))), __jsx(Modal["a" /* default */], {
    show: showClientModal,
    onHide: function onHide() {
      return setShowClientModal(false);
    }
  }, __jsx(Modal["a" /* default */].Header, {
    closeButton: true
  }, __jsx(Modal["a" /* default */].Title, null, "Select ", clientSelectionType === "from" ? "Client From" : "Client Current")), __jsx(Modal["a" /* default */].Body, null, __jsx(FormControl["a" /* default */], {
    type: "text",
    placeholder: "Search by name",
    className: "mb-3",
    value: clientSearchTerm,
    onChange: function onChange(e) {
      return setClientSearchTerm(e.target.value);
    }
  }), __jsx(ClientTable["a" /* default */], {
    clients: clients.filter(function (client) {
      return client.name.toLowerCase().includes(clientSearchTerm.toLowerCase());
    }),
    onSelectClient: handleClientSelect,
    onInfoClick: handleClientInfo,
    isClientSearch: false,
    clearSelection: function clearSelection() {
      return handleClientSelect(null);
    }
  }))), __jsx(Modal["a" /* default */], {
    show: showModelModal,
    onHide: function onHide() {
      return setShowModelModal(false);
    }
  }, __jsx(Modal["a" /* default */].Header, {
    closeButton: true
  }, __jsx(Modal["a" /* default */].Title, null, "Select Model")), __jsx(Modal["a" /* default */].Body, null, __jsx(FormControl["a" /* default */], {
    type: "text",
    placeholder: "Search by name",
    className: "mb-3",
    value: modelSearchTerm,
    onChange: function onChange(e) {
      return setModelSearchTerm(e.target.value);
    }
  }), __jsx(ModelTable["a" /* default */], {
    models: models.filter(function (model) {
      return typeof model === "string" ? model.toLowerCase().includes(modelSearchTerm.toLowerCase()) : false;
    }),
    onSelectModel: handleModelSelect,
    clearSelection: function clearSelection() {
      return handleModelSelect(null);
    }
  }))), __jsx(Container["a" /* default */], {
    className: "d-flex align-items-center justify-content-center",
    style: {
      minHeight: "100vh"
    }
  }, __jsx("div", {
    className: "w-100",
    style: {
      maxWidth: "1200px"
    }
  }, __jsx(Card["a" /* default */], null, __jsx(Card["a" /* default */].Body, null, __jsx("h2", {
    className: "text-center mb-4"
  }, "Magmo"), __jsx(Row["a" /* default */], null, __jsx(Col["a" /* default */], {
    md: 4
  }, __jsx("div", null, __jsx(InputGroup["a" /* default */], {
    className: "mb-3"
  }, __jsx(InputGroup["a" /* default */].Text, null, "OEM"), __jsx(Dropdown["a" /* default */], {
    onSelect: handleSelect1
  }, __jsx(Dropdown["a" /* default */].Toggle, {
    variant: "outline-secondary",
    id: "dropdown-button-1",
    className: "w-100"
  }, dropdown1Text), __jsx(Dropdown["a" /* default */].Menu, {
    className: "w-100"
  }, __jsx(Dropdown["a" /* default */].Item, {
    eventKey: "unassigned"
  }, "Select Option"), __jsx(Dropdown["a" /* default */].Item, {
    eventKey: "GE"
  }, "GE"), __jsx(Dropdown["a" /* default */].Item, {
    eventKey: "Toshiba"
  }, "Toshiba"), __jsx(Dropdown["a" /* default */].Item, {
    eventKey: "Siemens"
  }, "Siemens"), __jsx(Dropdown["a" /* default */].Item, {
    eventKey: "Philips"
  }, "Philips")))), __jsx(InputGroup["a" /* default */], {
    className: "mb-5"
  }, __jsx(InputGroup["a" /* default */].Text, null, "Modality"), __jsx(Dropdown["a" /* default */], {
    onSelect: handleSelect2
  }, __jsx(Dropdown["a" /* default */].Toggle, {
    variant: "outline-secondary",
    id: "dropdown-button-2",
    className: "w-100"
  }, dropdown2Text), __jsx(Dropdown["a" /* default */].Menu, {
    className: "w-100"
  }, __jsx(Dropdown["a" /* default */].Item, {
    eventKey: "unassigned"
  }, "Select Option"), __jsx(Dropdown["a" /* default */].Item, {
    eventKey: "CT"
  }, "CT"), __jsx(Dropdown["a" /* default */].Item, {
    eventKey: "MRI"
  }, "MRI"))))), __jsx("div", {
    className: MainSearch_module_default.a.divider
  }), __jsx("div", null, __jsx(InputGroup["a" /* default */], {
    className: "mb-3"
  }, __jsx(InputGroup["a" /* default */].Text, null, "Client From"), __jsx(Button["a" /* default */], {
    variant: "outline-secondary",
    className: "w-100",
    onClick: function onClick() {
      setClientSelectionType("from");
      handleClientClick();
    }
  }, clientFromButtonText)), __jsx(InputGroup["a" /* default */], {
    className: "mb-3"
  }, __jsx(InputGroup["a" /* default */].Text, null, "Client Current"), __jsx(Button["a" /* default */], {
    variant: "outline-secondary",
    className: "w-100",
    onClick: function onClick() {
      setClientSelectionType("current");
      handleClientClick();
    }
  }, clientCurrentButtonText)), __jsx(InputGroup["a" /* default */], {
    className: "mb-3"
  }, __jsx(InputGroup["a" /* default */].Text, null, "Model"), __jsx(Button["a" /* default */], {
    variant: "outline-secondary",
    className: "w-100",
    onClick: handleModelClick
  }, modelButtonText)), __jsx("div", {
    className: MainSearch_module_default.a.divider
  }), __jsx(InputGroup["a" /* default */], {
    className: "mb-3"
  }, __jsx(InputGroup["a" /* default */].Text, null, "Warehouse"), __jsx("div", {
    className: MainSearch_module_default.a.buttonGroup
  }, __jsx(Button["a" /* default */], {
    variant: "outline-secondary",
    className: MainSearch_module_default.a.flexButton,
    onClick: handleSoCalWarehouseClick
  }, "SoCal Warehouse"), __jsx(Button["a" /* default */], {
    variant: "outline-secondary",
    className: MainSearch_module_default.a.flexButton,
    onClick: handleNorCalWarehouseClick
  }, "NorCal Warehouse"), __jsx(Button["a" /* default */], {
    variant: "outline-secondary",
    className: MainSearch_module_default.a.flexButton,
    onClick: handleWarehouseUnassignedClick
  }, "Unassigned"))))), __jsx(Col["a" /* default */], {
    md: 8
  }, __jsx("div", {
    className: MainSearch_module_default.a.tableContainer
  }, __jsx(PartTable["a" /* default */], {
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
    selectedItems: selectedItems // Pass selectedItems state
    ,
    setSelectedItems: setSelectedItems // Pass its setter

  }), __jsx("div", {
    className: MainSearch_module_default.a.searchContainer
  }, __jsx(Form["a" /* default */], {
    className: "d-flex pb-2"
  }, __jsx(FormControl["a" /* default */], {
    type: showListSearch,
    placeholder: "Search",
    className: "me-2 flex-grow-1",
    "aria-label": "Search",
    value: search,
    onChange: searchChangeHandler,
    style: {
      flex: "1"
    }
  }), __jsx(NavDropdown["a" /* default */], {
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
  }, __jsx(NavDropdown["a" /* default */].Item, {
    onClick: function onClick() {
      setSelect("Name");
      setShowListSearch("text");
    }
  }, "Name"), __jsx(NavDropdown["a" /* default */].Item, {
    onClick: function onClick() {
      setSelect("Date");
      setShowListSearch("date");
    }
  }, "Date"), __jsx(NavDropdown["a" /* default */].Item, {
    onClick: function onClick() {
      setSelect("Work Order");
      setShowListSearch("number");
    }
  }, "Work Order"), __jsx(NavDropdown["a" /* default */].Item, {
    onClick: function onClick() {
      setSelect("Product Number");
      setShowListSearch("number");
    }
  }, "Product Number"), __jsx(NavDropdown["a" /* default */].Item, {
    onClick: function onClick() {
      setSelect("Description");
      setShowListSearch("text");
    }
  }, "Description"), __jsx(NavDropdown["a" /* default */].Item, {
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

/***/ "6xyR":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/react-bootstrap/node_modules/classnames/index.js
var classnames = __webpack_require__("eC2I");
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__("q1tI");

// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/ThemeProvider.js
var ThemeProvider = __webpack_require__("vUet");

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__("nKUr");

// CONCATENATED MODULE: ./node_modules/react-bootstrap/esm/CardBody.js
"use client";





const CardBody = /*#__PURE__*/react["forwardRef"](({
  className,
  bsPrefix,
  as: Component = 'div',
  ...props
}, ref) => {
  bsPrefix = Object(ThemeProvider["e" /* useBootstrapPrefix */])(bsPrefix, 'card-body');
  return /*#__PURE__*/Object(jsx_runtime["jsx"])(Component, {
    ref: ref,
    className: classnames_default()(className, bsPrefix),
    ...props
  });
});
CardBody.displayName = 'CardBody';
/* harmony default export */ var esm_CardBody = (CardBody);
// CONCATENATED MODULE: ./node_modules/react-bootstrap/esm/CardFooter.js
"use client";





const CardFooter = /*#__PURE__*/react["forwardRef"](({
  className,
  bsPrefix,
  as: Component = 'div',
  ...props
}, ref) => {
  bsPrefix = Object(ThemeProvider["e" /* useBootstrapPrefix */])(bsPrefix, 'card-footer');
  return /*#__PURE__*/Object(jsx_runtime["jsx"])(Component, {
    ref: ref,
    className: classnames_default()(className, bsPrefix),
    ...props
  });
});
CardFooter.displayName = 'CardFooter';
/* harmony default export */ var esm_CardFooter = (CardFooter);
// CONCATENATED MODULE: ./node_modules/react-bootstrap/esm/CardHeaderContext.js
"use client";


const context = /*#__PURE__*/react["createContext"](null);
context.displayName = 'CardHeaderContext';
/* harmony default export */ var CardHeaderContext = (context);
// CONCATENATED MODULE: ./node_modules/react-bootstrap/esm/CardHeader.js
"use client";







const CardHeader = /*#__PURE__*/react["forwardRef"](({
  bsPrefix,
  className,
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component = 'div',
  ...props
}, ref) => {
  const prefix = Object(ThemeProvider["e" /* useBootstrapPrefix */])(bsPrefix, 'card-header');
  const contextValue = Object(react["useMemo"])(() => ({
    cardHeaderBsPrefix: prefix
  }), [prefix]);
  return /*#__PURE__*/Object(jsx_runtime["jsx"])(CardHeaderContext.Provider, {
    value: contextValue,
    children: /*#__PURE__*/Object(jsx_runtime["jsx"])(Component, {
      ref: ref,
      ...props,
      className: classnames_default()(className, prefix)
    })
  });
});
CardHeader.displayName = 'CardHeader';
/* harmony default export */ var esm_CardHeader = (CardHeader);
// CONCATENATED MODULE: ./node_modules/react-bootstrap/esm/CardImg.js
"use client";





const CardImg = /*#__PURE__*/react["forwardRef"](
// Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
({
  bsPrefix,
  className,
  variant,
  as: Component = 'img',
  ...props
}, ref) => {
  const prefix = Object(ThemeProvider["e" /* useBootstrapPrefix */])(bsPrefix, 'card-img');
  return /*#__PURE__*/Object(jsx_runtime["jsx"])(Component, {
    ref: ref,
    className: classnames_default()(variant ? `${prefix}-${variant}` : prefix, className),
    ...props
  });
});
CardImg.displayName = 'CardImg';
/* harmony default export */ var esm_CardImg = (CardImg);
// CONCATENATED MODULE: ./node_modules/react-bootstrap/esm/CardImgOverlay.js
"use client";





const CardImgOverlay = /*#__PURE__*/react["forwardRef"](({
  className,
  bsPrefix,
  as: Component = 'div',
  ...props
}, ref) => {
  bsPrefix = Object(ThemeProvider["e" /* useBootstrapPrefix */])(bsPrefix, 'card-img-overlay');
  return /*#__PURE__*/Object(jsx_runtime["jsx"])(Component, {
    ref: ref,
    className: classnames_default()(className, bsPrefix),
    ...props
  });
});
CardImgOverlay.displayName = 'CardImgOverlay';
/* harmony default export */ var esm_CardImgOverlay = (CardImgOverlay);
// CONCATENATED MODULE: ./node_modules/react-bootstrap/esm/CardLink.js
"use client";





const CardLink = /*#__PURE__*/react["forwardRef"](({
  className,
  bsPrefix,
  as: Component = 'a',
  ...props
}, ref) => {
  bsPrefix = Object(ThemeProvider["e" /* useBootstrapPrefix */])(bsPrefix, 'card-link');
  return /*#__PURE__*/Object(jsx_runtime["jsx"])(Component, {
    ref: ref,
    className: classnames_default()(className, bsPrefix),
    ...props
  });
});
CardLink.displayName = 'CardLink';
/* harmony default export */ var esm_CardLink = (CardLink);
// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/divWithClassName.js
var divWithClassName = __webpack_require__("U1MP");

// CONCATENATED MODULE: ./node_modules/react-bootstrap/esm/CardSubtitle.js
"use client";






const DivStyledAsH6 = Object(divWithClassName["a" /* default */])('h6');
const CardSubtitle = /*#__PURE__*/react["forwardRef"](({
  className,
  bsPrefix,
  as: Component = DivStyledAsH6,
  ...props
}, ref) => {
  bsPrefix = Object(ThemeProvider["e" /* useBootstrapPrefix */])(bsPrefix, 'card-subtitle');
  return /*#__PURE__*/Object(jsx_runtime["jsx"])(Component, {
    ref: ref,
    className: classnames_default()(className, bsPrefix),
    ...props
  });
});
CardSubtitle.displayName = 'CardSubtitle';
/* harmony default export */ var esm_CardSubtitle = (CardSubtitle);
// CONCATENATED MODULE: ./node_modules/react-bootstrap/esm/CardText.js
"use client";





const CardText = /*#__PURE__*/react["forwardRef"](({
  className,
  bsPrefix,
  as: Component = 'p',
  ...props
}, ref) => {
  bsPrefix = Object(ThemeProvider["e" /* useBootstrapPrefix */])(bsPrefix, 'card-text');
  return /*#__PURE__*/Object(jsx_runtime["jsx"])(Component, {
    ref: ref,
    className: classnames_default()(className, bsPrefix),
    ...props
  });
});
CardText.displayName = 'CardText';
/* harmony default export */ var esm_CardText = (CardText);
// CONCATENATED MODULE: ./node_modules/react-bootstrap/esm/CardTitle.js
"use client";






const DivStyledAsH5 = Object(divWithClassName["a" /* default */])('h5');
const CardTitle = /*#__PURE__*/react["forwardRef"](({
  className,
  bsPrefix,
  as: Component = DivStyledAsH5,
  ...props
}, ref) => {
  bsPrefix = Object(ThemeProvider["e" /* useBootstrapPrefix */])(bsPrefix, 'card-title');
  return /*#__PURE__*/Object(jsx_runtime["jsx"])(Component, {
    ref: ref,
    className: classnames_default()(className, bsPrefix),
    ...props
  });
});
CardTitle.displayName = 'CardTitle';
/* harmony default export */ var esm_CardTitle = (CardTitle);
// CONCATENATED MODULE: ./node_modules/react-bootstrap/esm/Card.js
"use client";














const Card = /*#__PURE__*/react["forwardRef"](({
  bsPrefix,
  className,
  bg,
  text,
  border,
  body = false,
  children,
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component = 'div',
  ...props
}, ref) => {
  const prefix = Object(ThemeProvider["e" /* useBootstrapPrefix */])(bsPrefix, 'card');
  return /*#__PURE__*/Object(jsx_runtime["jsx"])(Component, {
    ref: ref,
    ...props,
    className: classnames_default()(className, prefix, bg && `bg-${bg}`, text && `text-${text}`, border && `border-${border}`),
    children: body ? /*#__PURE__*/Object(jsx_runtime["jsx"])(esm_CardBody, {
      children: children
    }) : children
  });
});
Card.displayName = 'Card';
/* harmony default export */ var esm_Card = __webpack_exports__["a"] = (Object.assign(Card, {
  Img: esm_CardImg,
  Title: esm_CardTitle,
  Subtitle: esm_CardSubtitle,
  Body: esm_CardBody,
  Link: esm_CardLink,
  Text: esm_CardText,
  Header: esm_CardHeader,
  Footer: esm_CardFooter,
  ImgOverlay: esm_CardImgOverlay
}));

/***/ }),

/***/ "7vrA":
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





const Container = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["forwardRef"](({
  bsPrefix,
  fluid = false,
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component = 'div',
  className,
  ...props
}, ref) => {
  const prefix = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_2__[/* useBootstrapPrefix */ "e"])(bsPrefix, 'container');
  const suffix = typeof fluid === 'string' ? `-${fluid}` : '-fluid';
  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__["jsx"])(Component, {
    ref: ref,
    ...props,
    className: classnames__WEBPACK_IMPORTED_MODULE_0___default()(className, fluid ? `${prefix}${suffix}` : prefix)
  });
});
Container.displayName = 'Container';
/* harmony default export */ __webpack_exports__["a"] = (Container);

/***/ }),

/***/ "JI6e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export useCol */
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("eC2I");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("vUet");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("nKUr");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);
"use client";





function useCol({
  as,
  bsPrefix,
  className,
  ...props
}) {
  bsPrefix = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_2__[/* useBootstrapPrefix */ "e"])(bsPrefix, 'col');
  const breakpoints = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_2__[/* useBootstrapBreakpoints */ "c"])();
  const minBreakpoint = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_2__[/* useBootstrapMinBreakpoint */ "d"])();
  const spans = [];
  const classes = [];
  breakpoints.forEach(brkPoint => {
    const propValue = props[brkPoint];
    delete props[brkPoint];
    let span;
    let offset;
    let order;
    if (typeof propValue === 'object' && propValue != null) {
      ({
        span,
        offset,
        order
      } = propValue);
    } else {
      span = propValue;
    }
    const infix = brkPoint !== minBreakpoint ? `-${brkPoint}` : '';
    if (span) spans.push(span === true ? `${bsPrefix}${infix}` : `${bsPrefix}${infix}-${span}`);
    if (order != null) classes.push(`order${infix}-${order}`);
    if (offset != null) classes.push(`offset${infix}-${offset}`);
  });
  return [{
    ...props,
    className: classnames__WEBPACK_IMPORTED_MODULE_0___default()(className, ...spans, ...classes)
  }, {
    as,
    bsPrefix,
    spans
  }];
}
const Col = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["forwardRef"](
// Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
(props, ref) => {
  const [{
    className,
    ...colProps
  }, {
    as: Component = 'div',
    bsPrefix,
    spans
  }] = useCol(props);
  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__["jsx"])(Component, {
    ...colProps,
    ref: ref,
    className: classnames__WEBPACK_IMPORTED_MODULE_0___default()(className, !spans.length && bsPrefix)
  });
});
Col.displayName = 'Col';
/* harmony default export */ __webpack_exports__["a"] = (Col);

/***/ }),

/***/ "QojX":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/react-bootstrap/node_modules/classnames/index.js
var classnames = __webpack_require__("eC2I");
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);

// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__("17x9");
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__("q1tI");

// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/Feedback.js
var Feedback = __webpack_require__("Mlt0");

// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/FormCheckInput.js
var FormCheckInput = __webpack_require__("tXs5");

// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/FormContext.js
var FormContext = __webpack_require__("9Iqo");

// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/ThemeProvider.js
var ThemeProvider = __webpack_require__("vUet");

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__("nKUr");

// CONCATENATED MODULE: ./node_modules/react-bootstrap/esm/FormCheckLabel.js
"use client";







const FormCheckLabel = /*#__PURE__*/react["forwardRef"](({
  bsPrefix,
  className,
  htmlFor,
  ...props
}, ref) => {
  const {
    controlId
  } = Object(react["useContext"])(FormContext["a" /* default */]);
  bsPrefix = Object(ThemeProvider["e" /* useBootstrapPrefix */])(bsPrefix, 'form-check-label');
  return /*#__PURE__*/Object(jsx_runtime["jsx"])("label", {
    ...props,
    ref: ref,
    htmlFor: htmlFor || controlId,
    className: classnames_default()(className, bsPrefix)
  });
});
FormCheckLabel.displayName = 'FormCheckLabel';
/* harmony default export */ var esm_FormCheckLabel = (FormCheckLabel);
// CONCATENATED MODULE: ./node_modules/react-bootstrap/esm/ElementChildren.js


/**
 * Iterates through children that are typically specified as `props.children`,
 * but only maps over children that are "valid elements".
 *
 * The mapFunction provided index will be normalised to the components mapped,
 * so an invalid component would not increase the index.
 *
 */
function map(children, func) {
  let index = 0;
  return react["Children"].map(children, child => /*#__PURE__*/react["isValidElement"](child) ? func(child, index++) : child);
}

/**
 * Iterates through children that are "valid elements".
 *
 * The provided forEachFunc(child, index) will be called for each
 * leaf child with the index reflecting the position relative to "valid components".
 */
function forEach(children, func) {
  let index = 0;
  react["Children"].forEach(children, child => {
    if ( /*#__PURE__*/react["isValidElement"](child)) func(child, index++);
  });
}

/**
 * Finds whether a component's `children` prop includes a React element of the
 * specified type.
 */
function hasChildOfType(children, type) {
  return react["Children"].toArray(children).some(child => /*#__PURE__*/react["isValidElement"](child) && child.type === type);
}

// CONCATENATED MODULE: ./node_modules/react-bootstrap/esm/FormCheck.js
"use client";













const FormCheck = /*#__PURE__*/react["forwardRef"](({
  id,
  bsPrefix,
  bsSwitchPrefix,
  inline = false,
  reverse = false,
  disabled = false,
  isValid = false,
  isInvalid = false,
  feedbackTooltip = false,
  feedback,
  feedbackType,
  className,
  style,
  title = '',
  type = 'checkbox',
  label,
  children,
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as = 'input',
  ...props
}, ref) => {
  bsPrefix = Object(ThemeProvider["e" /* useBootstrapPrefix */])(bsPrefix, 'form-check');
  bsSwitchPrefix = Object(ThemeProvider["e" /* useBootstrapPrefix */])(bsSwitchPrefix, 'form-switch');
  const {
    controlId
  } = Object(react["useContext"])(FormContext["a" /* default */]);
  const innerFormContext = Object(react["useMemo"])(() => ({
    controlId: id || controlId
  }), [controlId, id]);
  const hasLabel = !children && label != null && label !== false || hasChildOfType(children, esm_FormCheckLabel);
  const input = /*#__PURE__*/Object(jsx_runtime["jsx"])(FormCheckInput["a" /* default */], {
    ...props,
    type: type === 'switch' ? 'checkbox' : type,
    ref: ref,
    isValid: isValid,
    isInvalid: isInvalid,
    disabled: disabled,
    as: as
  });
  return /*#__PURE__*/Object(jsx_runtime["jsx"])(FormContext["a" /* default */].Provider, {
    value: innerFormContext,
    children: /*#__PURE__*/Object(jsx_runtime["jsx"])("div", {
      style: style,
      className: classnames_default()(className, hasLabel && bsPrefix, inline && `${bsPrefix}-inline`, reverse && `${bsPrefix}-reverse`, type === 'switch' && bsSwitchPrefix),
      children: children || /*#__PURE__*/Object(jsx_runtime["jsxs"])(jsx_runtime["Fragment"], {
        children: [input, hasLabel && /*#__PURE__*/Object(jsx_runtime["jsx"])(esm_FormCheckLabel, {
          title: title,
          children: label
        }), feedback && /*#__PURE__*/Object(jsx_runtime["jsx"])(Feedback["a" /* default */], {
          type: feedbackType,
          tooltip: feedbackTooltip,
          children: feedback
        })]
      })
    })
  });
});
FormCheck.displayName = 'FormCheck';
/* harmony default export */ var esm_FormCheck = (Object.assign(FormCheck, {
  Input: FormCheckInput["a" /* default */],
  Label: esm_FormCheckLabel
}));
// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/FormControl.js
var FormControl = __webpack_require__("jDKy");

// CONCATENATED MODULE: ./node_modules/react-bootstrap/esm/FormFloating.js
"use client";





const FormFloating = /*#__PURE__*/react["forwardRef"](({
  className,
  bsPrefix,
  as: Component = 'div',
  ...props
}, ref) => {
  bsPrefix = Object(ThemeProvider["e" /* useBootstrapPrefix */])(bsPrefix, 'form-floating');
  return /*#__PURE__*/Object(jsx_runtime["jsx"])(Component, {
    ref: ref,
    className: classnames_default()(className, bsPrefix),
    ...props
  });
});
FormFloating.displayName = 'FormFloating';
/* harmony default export */ var esm_FormFloating = (FormFloating);
// CONCATENATED MODULE: ./node_modules/react-bootstrap/esm/FormGroup.js




const FormGroup = /*#__PURE__*/react["forwardRef"](({
  controlId,
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component = 'div',
  ...props
}, ref) => {
  const context = Object(react["useMemo"])(() => ({
    controlId
  }), [controlId]);
  return /*#__PURE__*/Object(jsx_runtime["jsx"])(FormContext["a" /* default */].Provider, {
    value: context,
    children: /*#__PURE__*/Object(jsx_runtime["jsx"])(Component, {
      ...props,
      ref: ref
    })
  });
});
FormGroup.displayName = 'FormGroup';
/* harmony default export */ var esm_FormGroup = (FormGroup);
// EXTERNAL MODULE: ./node_modules/warning/warning.js
var warning = __webpack_require__("2W6z");

// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/Col.js
var Col = __webpack_require__("JI6e");

// CONCATENATED MODULE: ./node_modules/react-bootstrap/esm/FormLabel.js
"use client";









const FormLabel = /*#__PURE__*/react["forwardRef"](({
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component = 'label',
  bsPrefix,
  column = false,
  visuallyHidden = false,
  className,
  htmlFor,
  ...props
}, ref) => {
  const {
    controlId
  } = Object(react["useContext"])(FormContext["a" /* default */]);
  bsPrefix = Object(ThemeProvider["e" /* useBootstrapPrefix */])(bsPrefix, 'form-label');
  let columnClass = 'col-form-label';
  if (typeof column === 'string') columnClass = `${columnClass} ${columnClass}-${column}`;
  const classes = classnames_default()(className, bsPrefix, visuallyHidden && 'visually-hidden', column && columnClass);
   false ? undefined : void 0;
  htmlFor = htmlFor || controlId;
  if (column) return /*#__PURE__*/Object(jsx_runtime["jsx"])(Col["a" /* default */], {
    ref: ref,
    as: "label",
    className: classes,
    htmlFor: htmlFor,
    ...props
  });
  return (
    /*#__PURE__*/
    // eslint-disable-next-line jsx-a11y/label-has-for, jsx-a11y/label-has-associated-control
    Object(jsx_runtime["jsx"])(Component, {
      ref: ref,
      className: classes,
      htmlFor: htmlFor,
      ...props
    })
  );
});
FormLabel.displayName = 'FormLabel';
/* harmony default export */ var esm_FormLabel = (FormLabel);
// CONCATENATED MODULE: ./node_modules/react-bootstrap/esm/FormRange.js
"use client";







const FormRange = /*#__PURE__*/react["forwardRef"](({
  bsPrefix,
  className,
  id,
  ...props
}, ref) => {
  const {
    controlId
  } = Object(react["useContext"])(FormContext["a" /* default */]);
  bsPrefix = Object(ThemeProvider["e" /* useBootstrapPrefix */])(bsPrefix, 'form-range');
  return /*#__PURE__*/Object(jsx_runtime["jsx"])("input", {
    ...props,
    type: "range",
    ref: ref,
    className: classnames_default()(className, bsPrefix),
    id: id || controlId
  });
});
FormRange.displayName = 'FormRange';
/* harmony default export */ var esm_FormRange = (FormRange);
// CONCATENATED MODULE: ./node_modules/react-bootstrap/esm/FormSelect.js
"use client";







const FormSelect = /*#__PURE__*/react["forwardRef"](({
  bsPrefix,
  size,
  htmlSize,
  className,
  isValid = false,
  isInvalid = false,
  id,
  ...props
}, ref) => {
  const {
    controlId
  } = Object(react["useContext"])(FormContext["a" /* default */]);
  bsPrefix = Object(ThemeProvider["e" /* useBootstrapPrefix */])(bsPrefix, 'form-select');
  return /*#__PURE__*/Object(jsx_runtime["jsx"])("select", {
    ...props,
    size: htmlSize,
    ref: ref,
    className: classnames_default()(className, bsPrefix, size && `${bsPrefix}-${size}`, isValid && `is-valid`, isInvalid && `is-invalid`),
    id: id || controlId
  });
});
FormSelect.displayName = 'FormSelect';
/* harmony default export */ var esm_FormSelect = (FormSelect);
// CONCATENATED MODULE: ./node_modules/react-bootstrap/esm/FormText.js
"use client";





const FormText = /*#__PURE__*/react["forwardRef"](
// Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
({
  bsPrefix,
  className,
  as: Component = 'small',
  muted,
  ...props
}, ref) => {
  bsPrefix = Object(ThemeProvider["e" /* useBootstrapPrefix */])(bsPrefix, 'form-text');
  return /*#__PURE__*/Object(jsx_runtime["jsx"])(Component, {
    ...props,
    ref: ref,
    className: classnames_default()(className, bsPrefix, muted && 'text-muted')
  });
});
FormText.displayName = 'FormText';
/* harmony default export */ var esm_FormText = (FormText);
// CONCATENATED MODULE: ./node_modules/react-bootstrap/esm/Switch.js



const Switch = /*#__PURE__*/react["forwardRef"]((props, ref) => /*#__PURE__*/Object(jsx_runtime["jsx"])(esm_FormCheck, {
  ...props,
  ref: ref,
  type: "switch"
}));
Switch.displayName = 'Switch';
/* harmony default export */ var esm_Switch = (Object.assign(Switch, {
  Input: esm_FormCheck.Input,
  Label: esm_FormCheck.Label
}));
// CONCATENATED MODULE: ./node_modules/react-bootstrap/esm/FloatingLabel.js
"use client";







const FloatingLabel = /*#__PURE__*/react["forwardRef"](({
  bsPrefix,
  className,
  children,
  controlId,
  label,
  ...props
}, ref) => {
  bsPrefix = Object(ThemeProvider["e" /* useBootstrapPrefix */])(bsPrefix, 'form-floating');
  return /*#__PURE__*/Object(jsx_runtime["jsxs"])(esm_FormGroup, {
    ref: ref,
    className: classnames_default()(className, bsPrefix),
    controlId: controlId,
    ...props,
    children: [children, /*#__PURE__*/Object(jsx_runtime["jsx"])("label", {
      htmlFor: controlId,
      children: label
    })]
  });
});
FloatingLabel.displayName = 'FloatingLabel';
/* harmony default export */ var esm_FloatingLabel = (FloatingLabel);
// CONCATENATED MODULE: ./node_modules/react-bootstrap/esm/Form.js














const propTypes = {
  /**
   * The Form `ref` will be forwarded to the underlying element,
   * which means, unless it's rendered `as` a composite component,
   * it will be a DOM node, when resolved.
   *
   * @type {ReactRef}
   * @alias ref
   */
  _ref: prop_types_default.a.any,
  /**
   * Mark a form as having been validated. Setting it to `true` will
   * toggle any validation styles on the forms elements.
   */
  validated: prop_types_default.a.bool,
  as: prop_types_default.a.elementType
};
const Form = /*#__PURE__*/react["forwardRef"](({
  className,
  validated,
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component = 'form',
  ...props
}, ref) => /*#__PURE__*/Object(jsx_runtime["jsx"])(Component, {
  ...props,
  ref: ref,
  className: classnames_default()(className, validated && 'was-validated')
}));
Form.displayName = 'Form';
Form.propTypes = propTypes;
/* harmony default export */ var esm_Form = __webpack_exports__["a"] = (Object.assign(Form, {
  Group: esm_FormGroup,
  Control: FormControl["a" /* default */],
  Floating: esm_FormFloating,
  Check: esm_FormCheck,
  Switch: esm_Switch,
  Label: esm_FormLabel,
  Text: esm_FormText,
  Range: esm_FormRange,
  Select: esm_FormSelect,
  FloatingLabel: esm_FloatingLabel
}));

/***/ }),

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

/***/ "XrFm":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ AuthUserProvider; });
__webpack_require__.d(__webpack_exports__, "b", function() { return /* binding */ AuthUserContext_useAuth; });

// EXTERNAL MODULE: ./node_modules/next/node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__("vJKn");
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);

// EXTERNAL MODULE: ./node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("rg98");

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__("q1tI");
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./context/Firebase.js + 6 modules
var Firebase = __webpack_require__("NY6m");

// CONCATENATED MODULE: ./context/useFirebaseAuth.js





var formatAuthUser = function formatAuthUser(user) {
  return {
    uid: user.uid,
    email: user.email
  };
};

function useFirebaseAuth() {
  var _useState = Object(react["useState"])(null),
      authUser = _useState[0],
      setAuthUser = _useState[1];

  var _useState2 = Object(react["useState"])(true),
      loading = _useState2[0],
      setLoading = _useState2[1];

  var authStateChanged = /*#__PURE__*/function () {
    var _ref = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee(authState) {
      var formattedUser;
      return regenerator_default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (authState) {
                _context.next = 4;
                break;
              }

              setAuthUser(null);
              setLoading(false);
              return _context.abrupt("return");

            case 4:
              setLoading(true);
              formattedUser = formatAuthUser(authState);
              setAuthUser(formattedUser);
              setLoading(false);

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function authStateChanged(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var clear = function clear() {
    setAuthUser(null);
    setLoading(true);
  }; //sign in with google


  var signInWithGoogle = function signInWithGoogle() {
    var provider = new Firebase["b" /* default */].auth.GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account"
    });
    return Firebase["a" /* auth */].signInWithRedirect(provider)["catch"](function (error) {
      console.error("Google Sign-In Error:", error);
      throw error;
    });
  };

  var signOut = function signOut() {
    return Firebase["a" /* auth */].signOut().then(clear);
  }; // Listen for Firebase auth state changes
  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged(authStateChanged);
  //   return () => unsubscribe();
  // }, []);


  Object(react["useEffect"])(function () {
    var unsubscribe;
    Firebase["a" /* auth */].setPersistence(Firebase["b" /* default */].auth.Auth.Persistence.LOCAL).then(function () {
      // Now set up the listener
      unsubscribe = Firebase["a" /* auth */].onAuthStateChanged(authStateChanged);
    })["catch"](function (error) {
      return console.error("Error setting persistence:", error);
    });
    return function () {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);
  return {
    authUser: authUser,
    loading: loading,
    signInWithGoogle: signInWithGoogle,
    signOut: signOut
  };
}
// CONCATENATED MODULE: ./context/AuthUserContext.js



var __jsx = react_default.a.createElement;


var authUserContext = /*#__PURE__*/Object(react["createContext"])({
  authUser: null,
  loading: true,
  signInWithGoogle: function () {
    var _signInWithGoogle = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee() {
      return regenerator_default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function signInWithGoogle() {
      return _signInWithGoogle.apply(this, arguments);
    }

    return signInWithGoogle;
  }(),
  signOut: function () {
    var _signOut = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee2() {
      return regenerator_default.a.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function signOut() {
      return _signOut.apply(this, arguments);
    }

    return signOut;
  }()
});
function AuthUserProvider(_ref) {
  var children = _ref.children;
  var auth = useFirebaseAuth();
  return __jsx(authUserContext.Provider, {
    value: auth
  }, children);
}
var AuthUserContext_useAuth = function useAuth() {
  return Object(react["useContext"])(authUserContext);
};

/***/ }),

/***/ "YFqc":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("cTJO")


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

/***/ "mJJZ":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("20a2");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _context_AuthUserContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("XrFm");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("7vrA");

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;





var LoggedIn = function LoggedIn(_ref) {
  var children = _ref.children;

  var _useAuth = Object(_context_AuthUserContext__WEBPACK_IMPORTED_MODULE_2__[/* useAuth */ "b"])(),
      authUser = _useAuth.authUser,
      loading = _useAuth.loading;

  var router = Object(next_router__WEBPACK_IMPORTED_MODULE_1__["useRouter"])(); // Redirect only after a short delay if authUser remains null.

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    console.log("=== LOGGEDIN AUTH CHECK ===");
    console.log("loading:", loading);
    console.log("authUser:", authUser);
    console.log("router.asPath:", router.asPath);

    if (!loading && authUser === null) {
      console.log("No auth user, will redirect to login in 800ms"); // Set a delay (e.g. 500ms) to give Firebase Auth a chance to rehydrate.

      var timer = setTimeout(function () {
        console.log("Redirecting to login now");
        router.push("/?redirect=".concat(encodeURIComponent(router.asPath)));
      }, 800);
      return function () {
        return clearTimeout(timer);
      };
    }
  }, [authUser, loading, router]);

  if (loading) {
    return __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], {
      className: "d-flex align-items-center justify-content-center",
      style: {
        minHeight: "100vh"
      }
    }, __jsx("h3", null, "Loading..."));
  }

  return __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, authUser && children);
};

/* harmony default export */ __webpack_exports__["default"] = (LoggedIn);

/***/ }),

/***/ "tXs5":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("eC2I");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _FormContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("9Iqo");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("vUet");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("nKUr");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);
"use client";







const FormCheckInput = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["forwardRef"](({
  id,
  bsPrefix,
  className,
  type = 'checkbox',
  isValid = false,
  isInvalid = false,
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component = 'input',
  ...props
}, ref) => {
  const {
    controlId
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useContext"])(_FormContext__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"]);
  bsPrefix = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__[/* useBootstrapPrefix */ "e"])(bsPrefix, 'form-check-input');
  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__["jsx"])(Component, {
    ...props,
    ref: ref,
    type: type,
    id: id || controlId,
    className: classnames__WEBPACK_IMPORTED_MODULE_0___default()(className, bsPrefix, isValid && 'is-valid', isInvalid && 'is-invalid')
  });
});
FormCheckInput.displayName = 'FormCheckInput';
/* harmony default export */ __webpack_exports__["a"] = (FormCheckInput);

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

},[["0iv+",1,0,5,3,2,4,6,7,9,10,11,12,17,18]]]);