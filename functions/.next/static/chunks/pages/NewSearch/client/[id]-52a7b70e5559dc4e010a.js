_N_E =
(window["webpackJsonp_N_E"] = window["webpackJsonp_N_E"] || []).push([[30],{

/***/ "20a2":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("nOHt")


/***/ }),

/***/ "2JcH":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__N_SSP", function() { return __N_SSP; });
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("z7pX");
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("vJKn");
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("cpVT");
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("rg98");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("20a2");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("7vrA");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("3Z9Z");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("JI6e");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("6xyR");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("TUci");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("cWnB");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("MBJH");
/* harmony import */ var _context_Firebase__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("NY6m");
/* harmony import */ var _ClientInfoModal__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("MbKa");
/* harmony import */ var _MachineCreationModal__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("cdLA");




var __jsx = react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }






 // Import for SSR

var Client = function Client() {
  var router = Object(next_router__WEBPACK_IMPORTED_MODULE_5__["useRouter"])();

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(null),
      selectedClient = _useState[0],
      setSelectedClient = _useState[1];

  var _useState2 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])([]),
      machineOptions = _useState2[0],
      setMachineOptions = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(null),
      error = _useState3[0],
      setError = _useState3[1]; // State for machine addition modals


  var _useState4 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(false),
      showAddMachineModal = _useState4[0],
      setShowAddMachineModal = _useState4[1];

  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(false),
      showCreateMachineModal = _useState5[0],
      setShowCreateMachineModal = _useState5[1];

  var _useState6 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])([]),
      availableMachines = _useState6[0],
      setAvailableMachines = _useState6[1];

  Object(react__WEBPACK_IMPORTED_MODULE_4__["useEffect"])(function () {
    if (router.isReady) {
      var clientId = router.query.clientId; // Extract clientId from query or URL path

      var id = clientId || router.asPath.split("/").pop();
      fetchClientData(id);
    }
  }, [router.isReady]);

  var fetchClientData = /*#__PURE__*/function () {
    var _ref = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee(clientId) {
      var db, clientDoc, clientData, machinePromises, machineDocs, machines;
      return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              db = _context_Firebase__WEBPACK_IMPORTED_MODULE_13__[/* default */ "b"].firestore();
              _context.next = 4;
              return db.collection("Client").doc(clientId).get();

            case 4:
              clientDoc = _context.sent;

              if (!clientDoc.exists) {
                _context.next = 16;
                break;
              }

              clientData = clientDoc.data();
              setSelectedClient(clientData); // Fetch machine documents referenced in the client's machines array

              machinePromises = clientData.machines.map(function (machineRef) {
                return machineRef.get();
              });
              _context.next = 11;
              return Promise.all(machinePromises);

            case 11:
              machineDocs = _context.sent;
              machines = machineDocs.map(function (machineDoc) {
                return _objectSpread({
                  id: machineDoc.id
                }, machineDoc.data());
              });
              setMachineOptions(machines);
              _context.next = 17;
              break;

            case 16:
              setError("Client not found");

            case 17:
              _context.next = 23;
              break;

            case 19:
              _context.prev = 19;
              _context.t0 = _context["catch"](0);
              console.error("Error fetching client data:", _context.t0);
              setError("Error fetching client data");

            case 23:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 19]]);
    }));

    return function fetchClientData(_x) {
      return _ref.apply(this, arguments);
    };
  }(); // Fetch available machines (those not yet assigned to a client)


  var fetchAvailableMachines = /*#__PURE__*/function () {
    var _ref2 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee2() {
      var db, snapshot, machines;
      return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              db = _context_Firebase__WEBPACK_IMPORTED_MODULE_13__[/* default */ "b"].firestore();
              _context2.next = 4;
              return db.collection("Machine").where("client", "==", null).get();

            case 4:
              snapshot = _context2.sent;
              machines = snapshot.docs.map(function (doc) {
                return _objectSpread({
                  id: doc.id
                }, doc.data());
              });
              setAvailableMachines(machines);
              _context2.next = 13;
              break;

            case 9:
              _context2.prev = 9;
              _context2.t0 = _context2["catch"](0);
              console.error("Error fetching available machines:", _context2.t0);
              setError("Failed to fetch available machines.");

            case 13:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 9]]);
    }));

    return function fetchAvailableMachines() {
      return _ref2.apply(this, arguments);
    };
  }();

  var handleSelectMachine = function handleSelectMachine(id, name) {
    // Navigate to the machine details page if needed
    router.push("../machine/" + id);
  }; // When adding an existing machine


  var handleAddMachine = /*#__PURE__*/function () {
    var _ref3 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee3(machine) {
      var db, clientId;
      return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              db = _context_Firebase__WEBPACK_IMPORTED_MODULE_13__[/* default */ "b"].firestore();
              clientId = router.query.clientId || router.asPath.split("/").pop(); // Update client's "machines" array with the machine reference

              _context3.next = 5;
              return db.collection("Client").doc(clientId).update({
                machines: _context_Firebase__WEBPACK_IMPORTED_MODULE_13__[/* default */ "b"].firestore.FieldValue.arrayUnion(db.collection("Machine").doc(machine.id))
              });

            case 5:
              // Update local state to include the newly added machine
              setMachineOptions(function (prev) {
                return [].concat(Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(prev), [machine]);
              });
              setShowAddMachineModal(false);
              _context3.next = 13;
              break;

            case 9:
              _context3.prev = 9;
              _context3.t0 = _context3["catch"](0);
              console.error("Error adding machine to client:", _context3.t0);
              setError("Failed to add machine to client.");

            case 13:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 9]]);
    }));

    return function handleAddMachine(_x2) {
      return _ref3.apply(this, arguments);
    };
  }(); // When creating a new machine for the client


  var handleCreateMachine = /*#__PURE__*/function () {
    var _ref4 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee4(newMachine) {
      var db, clientId, machineId, machineWithId;
      return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              db = _context_Firebase__WEBPACK_IMPORTED_MODULE_13__[/* default */ "b"].firestore();
              clientId = router.query.clientId || router.asPath.split("/").pop();
              machineId = "AIS".concat(Math.floor(10000 + Math.random() * 90000));
              machineWithId = _objectSpread(_objectSpread({}, newMachine), {}, {
                id: machineId,
                client: db.collection("Client").doc(clientId)
              }); // Create the machine document

              _context4.next = 7;
              return db.collection("Machine").doc(machineId).set(machineWithId);

            case 7:
              _context4.next = 9;
              return db.collection("Client").doc(clientId).update({
                machines: _context_Firebase__WEBPACK_IMPORTED_MODULE_13__[/* default */ "b"].firestore.FieldValue.arrayUnion(db.collection("Machine").doc(machineId))
              });

            case 9:
              // Update local state
              setMachineOptions(function (prev) {
                return [].concat(Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(prev), [_objectSpread({
                  id: machineId
                }, newMachine)]);
              });
              setShowCreateMachineModal(false);
              _context4.next = 17;
              break;

            case 13:
              _context4.prev = 13;
              _context4.t0 = _context4["catch"](0);
              console.error("Error creating and adding machine:", _context4.t0);
              setError("Failed to create and add machine.");

            case 17:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 13]]);
    }));

    return function handleCreateMachine(_x3) {
      return _ref4.apply(this, arguments);
    };
  }(); // Open the modal to add an existing machine; fetch available machines first


  var openAddMachineModal = /*#__PURE__*/function () {
    var _ref5 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee5() {
      return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return fetchAvailableMachines();

            case 2:
              setShowAddMachineModal(true);

            case 3:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    return function openAddMachineModal() {
      return _ref5.apply(this, arguments);
    };
  }();

  return __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"], {
    className: "mt-5"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], {
    className: "justify-content-md-center"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], {
    md: "8"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"], null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"].Header, null, __jsx("h4", null, "Client Machines")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"].Body, null, error && __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"], {
    variant: "danger"
  }, error), selectedClient ? __jsx(react__WEBPACK_IMPORTED_MODULE_4___default.a.Fragment, null, __jsx("h5", null, "Client: ", selectedClient.name), __jsx("p", null, "Location: ", selectedClient.local), __jsx("div", {
    className: "mb-3"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"], {
    variant: "primary",
    onClick: openAddMachineModal
  }, "Add Existing Machine"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"], {
    variant: "secondary",
    className: "ms-2",
    onClick: function onClick() {
      return setShowCreateMachineModal(true);
    }
  }, "Create New Machine")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"], {
    striped: true,
    bordered: true,
    hover: true,
    size: "sm"
  }, __jsx("thead", null, __jsx("tr", null, __jsx("th", null, "Name"), __jsx("th", null, "Location"), __jsx("th", null, "OEM"), __jsx("th", null, "Modality"), __jsx("th", null, "Select"))), __jsx("tbody", null, machineOptions.map(function (machine) {
    return __jsx("tr", {
      key: machine.id
    }, __jsx("td", null, machine.name), __jsx("td", null, machine.local), __jsx("td", null, machine.OEM), __jsx("td", null, machine.Modality), __jsx("td", null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"], {
      variant: "primary",
      onClick: function onClick() {
        return handleSelectMachine(machine.id, machine.name);
      }
    }, "Select")));
  }))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"], {
    variant: "primary",
    style: {
      marginTop: "20px"
    },
    onClick: function onClick() {
      return router.back();
    }
  }, "Back")) : !error && __jsx("p", null, "Loading client data..."))))), __jsx(_ClientInfoModal__WEBPACK_IMPORTED_MODULE_14__["default"], {
    show: showAddMachineModal,
    handleClose: function handleClose() {
      return setShowAddMachineModal(false);
    },
    machineOptions: availableMachines,
    setSelectedMachine: handleAddMachine
  }), __jsx(_MachineCreationModal__WEBPACK_IMPORTED_MODULE_15__["default"], {
    show: showCreateMachineModal,
    handleClose: function handleClose() {
      return setShowCreateMachineModal(false);
    },
    onCreateMachine: handleCreateMachine
  }));
};

var __N_SSP = true;
/* harmony default export */ __webpack_exports__["default"] = (Client); // Server-side rendering function

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

/***/ "6FTQ":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _arrayLikeToArray; });
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
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

/***/ "8rE2":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _unsupportedIterableToArray; });
/* harmony import */ var _babel_runtime_helpers_esm_arrayLikeToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("6FTQ");

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return Object(_babel_runtime_helpers_esm_arrayLikeToArray__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Object(_babel_runtime_helpers_esm_arrayLikeToArray__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(o, minLen);
}

/***/ }),

/***/ "MBJH":
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





const Table = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["forwardRef"](({
  bsPrefix,
  className,
  striped,
  bordered,
  borderless,
  hover,
  size,
  variant,
  responsive,
  ...props
}, ref) => {
  const decoratedBsPrefix = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_2__[/* useBootstrapPrefix */ "e"])(bsPrefix, 'table');
  const classes = classnames__WEBPACK_IMPORTED_MODULE_0___default()(className, decoratedBsPrefix, variant && `${decoratedBsPrefix}-${variant}`, size && `${decoratedBsPrefix}-${size}`, striped && `${decoratedBsPrefix}-${typeof striped === 'string' ? `striped-${striped}` : 'striped'}`, bordered && `${decoratedBsPrefix}-bordered`, borderless && `${decoratedBsPrefix}-borderless`, hover && `${decoratedBsPrefix}-hover`);
  const table = /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__["jsx"])("table", {
    ...props,
    className: classes,
    ref: ref
  });
  if (responsive) {
    let responsiveClass = `${decoratedBsPrefix}-responsive`;
    if (typeof responsive === 'string') {
      responsiveClass = `${responsiveClass}-${responsive}`;
    }
    return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__["jsx"])("div", {
      className: responsiveClass,
      children: table
    });
  }
  return table;
});
/* harmony default export */ __webpack_exports__["a"] = (Table);

/***/ }),

/***/ "MbKa":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("zM5D");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("MBJH");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("cWnB");
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;
// ClientInfoModal.js



var ClientInfoModal = function ClientInfoModal(_ref) {
  var show = _ref.show,
      handleClose = _ref.handleClose,
      selectedClient = _ref.selectedClient,
      _ref$machineOptions = _ref.machineOptions,
      machineOptions = _ref$machineOptions === void 0 ? [] : _ref$machineOptions,
      setSelectedMachine = _ref.setSelectedMachine;
  // Add warehouse options here
  // const warehouseOptions = [
  //   { id: "warehouse-socal", name: "SoCalWarehouse", local: "" },
  //   { id: "warehouse-norcal", name: "NorCalWarehouse", local: "" },
  // ];
  return __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"], {
    show: show,
    onHide: handleClose
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].Header, {
    closeButton: true
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].Title, null, "Select a Machine or Warehouse")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].Body, null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], {
    striped: true,
    bordered: true,
    hover: true,
    size: "sm"
  }, __jsx("thead", null, __jsx("tr", null, __jsx("th", null, "Name"), __jsx("th", null, "Location"), __jsx("th", null, "Select"))), __jsx("tbody", null, machineOptions.map(function (machine) {
    return __jsx("tr", {
      key: machine.id
    }, __jsx("td", null, machine.name), __jsx("td", null, machine.local), __jsx("td", null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], {
      variant: "primary",
      onClick: function onClick() {
        return setSelectedMachine(machine);
      }
    }, "Select")));
  })))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].Footer, null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], {
    variant: "secondary",
    onClick: handleClose
  }, "Close")));
};

/* harmony default export */ __webpack_exports__["default"] = (ClientInfoModal);

/***/ }),

/***/ "TUci":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/react-bootstrap/node_modules/classnames/index.js
var classnames = __webpack_require__("eC2I");
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__("q1tI");

// EXTERNAL MODULE: ./node_modules/uncontrollable/lib/esm/index.js + 5 modules
var esm = __webpack_require__("y8DL");

// EXTERNAL MODULE: ./node_modules/@restart/hooks/esm/useEventCallback.js
var useEventCallback = __webpack_require__("ZCiN");

// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/ThemeProvider.js
var ThemeProvider = __webpack_require__("vUet");

// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/divWithClassName.js
var divWithClassName = __webpack_require__("U1MP");

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__("nKUr");

// CONCATENATED MODULE: ./node_modules/react-bootstrap/esm/AlertHeading.js
"use client";






const DivStyledAsH4 = Object(divWithClassName["a" /* default */])('h4');
DivStyledAsH4.displayName = 'DivStyledAsH4';
const AlertHeading = /*#__PURE__*/react["forwardRef"](({
  className,
  bsPrefix,
  as: Component = DivStyledAsH4,
  ...props
}, ref) => {
  bsPrefix = Object(ThemeProvider["e" /* useBootstrapPrefix */])(bsPrefix, 'alert-heading');
  return /*#__PURE__*/Object(jsx_runtime["jsx"])(Component, {
    ref: ref,
    className: classnames_default()(className, bsPrefix),
    ...props
  });
});
AlertHeading.displayName = 'AlertHeading';
/* harmony default export */ var esm_AlertHeading = (AlertHeading);
// EXTERNAL MODULE: ./node_modules/@restart/ui/esm/Anchor.js + 8 modules
var Anchor = __webpack_require__("8lGn");

// CONCATENATED MODULE: ./node_modules/react-bootstrap/esm/AlertLink.js
"use client";






const AlertLink = /*#__PURE__*/react["forwardRef"](({
  className,
  bsPrefix,
  as: Component = Anchor["a" /* default */],
  ...props
}, ref) => {
  bsPrefix = Object(ThemeProvider["e" /* useBootstrapPrefix */])(bsPrefix, 'alert-link');
  return /*#__PURE__*/Object(jsx_runtime["jsx"])(Component, {
    ref: ref,
    className: classnames_default()(className, bsPrefix),
    ...props
  });
});
AlertLink.displayName = 'AlertLink';
/* harmony default export */ var esm_AlertLink = (AlertLink);
// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/Fade.js
var Fade = __webpack_require__("7xGa");

// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/CloseButton.js
var CloseButton = __webpack_require__("XQC9");

// CONCATENATED MODULE: ./node_modules/react-bootstrap/esm/Alert.js
"use client";












const Alert = /*#__PURE__*/react["forwardRef"]((uncontrolledProps, ref) => {
  const {
    bsPrefix,
    show = true,
    closeLabel = 'Close alert',
    closeVariant,
    className,
    children,
    variant = 'primary',
    onClose,
    dismissible,
    transition = Fade["a" /* default */],
    ...props
  } = Object(esm["a" /* useUncontrolled */])(uncontrolledProps, {
    show: 'onClose'
  });
  const prefix = Object(ThemeProvider["e" /* useBootstrapPrefix */])(bsPrefix, 'alert');
  const handleClose = Object(useEventCallback["a" /* default */])(e => {
    if (onClose) {
      onClose(false, e);
    }
  });
  const Transition = transition === true ? Fade["a" /* default */] : transition;
  const alert = /*#__PURE__*/Object(jsx_runtime["jsxs"])("div", {
    role: "alert",
    ...(!Transition ? props : undefined),
    ref: ref,
    className: classnames_default()(className, prefix, variant && `${prefix}-${variant}`, dismissible && `${prefix}-dismissible`),
    children: [dismissible && /*#__PURE__*/Object(jsx_runtime["jsx"])(CloseButton["a" /* default */], {
      onClick: handleClose,
      "aria-label": closeLabel,
      variant: closeVariant
    }), children]
  });
  if (!Transition) return show ? alert : null;
  return /*#__PURE__*/Object(jsx_runtime["jsx"])(Transition, {
    unmountOnExit: true,
    ...props,
    ref: undefined,
    in: show,
    children: alert
  });
});
Alert.displayName = 'Alert';
/* harmony default export */ var esm_Alert = __webpack_exports__["a"] = (Object.assign(Alert, {
  Link: esm_AlertLink,
  Heading: esm_AlertHeading
}));

/***/ }),

/***/ "qFEu":
/***/ (function(module, exports, __webpack_require__) {


    (window.__NEXT_P = window.__NEXT_P || []).push([
      "/NewSearch/client/[id]",
      function () {
        return __webpack_require__("2JcH");
      }
    ]);
  

/***/ }),

/***/ "z7pX":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ _toConsumableArray; });

// EXTERNAL MODULE: ./node_modules/next/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js
var arrayLikeToArray = __webpack_require__("6FTQ");

// CONCATENATED MODULE: ./node_modules/next/node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return Object(arrayLikeToArray["a" /* default */])(arr);
}
// CONCATENATED MODULE: ./node_modules/next/node_modules/@babel/runtime/helpers/esm/iterableToArray.js
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}
// EXTERNAL MODULE: ./node_modules/next/node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js
var unsupportedIterableToArray = __webpack_require__("8rE2");

// CONCATENATED MODULE: ./node_modules/next/node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
// CONCATENATED MODULE: ./node_modules/next/node_modules/@babel/runtime/helpers/esm/toConsumableArray.js




function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || Object(unsupportedIterableToArray["a" /* default */])(arr) || _nonIterableSpread();
}

/***/ })

},[["qFEu",1,0,5,3,2,4,6,7,9,10,16]]]);