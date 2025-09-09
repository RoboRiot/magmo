webpackHotUpdate_N_E("pages/NewSearch/machine/[id]",{

/***/ "./pages/NewSearch/machine/[id]/index.js":
/*!***********************************************!*\
  !*** ./pages/NewSearch/machine/[id]/index.js ***!
  \***********************************************/
/*! exports provided: __N_SSP, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__N_SSP", function() { return __N_SSP; });
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty */ "./node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/next/node_modules/@babel/runtime/regenerator */ "./node_modules/next/node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator */ "./node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/router */ "./node_modules/next/router.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var _context_Firebase__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../context/Firebase */ "./context/Firebase.js");




var _jsxFileName = "C:\\Users\\mack2\\Desktop\\code\\pages\\NewSearch\\machine\\[id]\\index.js",
    _this = undefined,
    _s = $RefreshSig$();

var __jsx = react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }




 // Import for SSR

var Machine = function Machine() {
  _s();

  var router = Object(next_router__WEBPACK_IMPORTED_MODULE_4__["useRouter"])();

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(null),
      selectedMachine = _useState[0],
      setSelectedMachine = _useState[1];

  var _useState2 = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])([]),
      associatedParts = _useState2[0],
      setAssociatedParts = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(null),
      error = _useState3[0],
      setError = _useState3[1];

  Object(react__WEBPACK_IMPORTED_MODULE_3__["useEffect"])(function () {
    if (router.isReady) {
      var machineId = router.query.machineId;

      if (!machineId) {
        var pathSegments = router.asPath.split("/");
        var machineIdFromPath = pathSegments[pathSegments.length - 1];
        console.log("Machine ID extracted from URL path: ".concat(machineIdFromPath));
        fetchMachineData(machineIdFromPath);
      } else {
        console.log("Machine ID from router query: ".concat(machineId));
        fetchMachineData(machineId);
      }
    }
  }, [router.isReady]);

  var fetchMachineData = /*#__PURE__*/function () {
    var _ref = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__["default"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee(machineId) {
      var db, machineDoc, machineData;
      return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              console.log("Attempting to fetch machine data for ID: ".concat(machineId));
              db = _context_Firebase__WEBPACK_IMPORTED_MODULE_6__["default"].firestore();
              _context.next = 5;
              return db.collection("Machine").doc(machineId).get();

            case 5:
              machineDoc = _context.sent;

              if (machineDoc.exists) {
                machineData = machineDoc.data();
                setSelectedMachine(machineData);
                console.log("Machine data:", machineData); // Fetch associated parts

                if (machineData.associatedParts) {
                  fetchAssociatedParts(machineData.associatedParts);
                }
              } else {
                console.error("Machine not found");
                setError("Machine not found");
              }

              _context.next = 13;
              break;

            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](0);
              console.error("Error fetching machine data:", _context.t0);
              setError("Error fetching machine data");

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 9]]);
    }));

    return function fetchMachineData(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var fetchAssociatedParts = /*#__PURE__*/function () {
    var _ref2 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__["default"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee3(associatedPartsRefs) {
      var db, partsDocs, partsData;
      return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              db = _context_Firebase__WEBPACK_IMPORTED_MODULE_6__["default"].firestore();
              _context3.next = 4;
              return Promise.all(associatedPartsRefs.map(function (ref) {
                return ref.get();
              }));

            case 4:
              partsDocs = _context3.sent;
              _context3.next = 7;
              return Promise.all(partsDocs.map( /*#__PURE__*/function () {
                var _ref3 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__["default"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee2(doc) {
                  var _data$ClientFrom;

                  var data, clientName, clientDoc;
                  return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          if (doc.exists) {
                            _context2.next = 2;
                            break;
                          }

                          return _context2.abrupt("return", null);

                        case 2:
                          data = doc.data() || {};
                          clientName = "";

                          if (!((_data$ClientFrom = data.ClientFrom) !== null && _data$ClientFrom !== void 0 && _data$ClientFrom.get)) {
                            _context2.next = 9;
                            break;
                          }

                          _context2.next = 7;
                          return data.ClientFrom.get();

                        case 7:
                          clientDoc = _context2.sent;
                          clientName = clientDoc.exists ? clientDoc.data().name : "";

                        case 9:
                          return _context2.abrupt("return", _objectSpread(_objectSpread({
                            id: doc.id
                          }, data), {}, {
                            clientName: clientName
                          }));

                        case 10:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2);
                }));

                return function (_x3) {
                  return _ref3.apply(this, arguments);
                };
              }()));

            case 7:
              partsData = _context3.sent;
              setAssociatedParts(partsData.filter(function (p) {
                return p;
              }));
              console.log("Associated parts data:", partsData);
              _context3.next = 16;
              break;

            case 12:
              _context3.prev = 12;
              _context3.t0 = _context3["catch"](0);
              console.error("Error fetching associated parts:", _context3.t0);
              setError("Error fetching associated parts");

            case 16:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 12]]);
    }));

    return function fetchAssociatedParts(_x2) {
      return _ref2.apply(this, arguments);
    };
  }();

  var handlePrintMulti = /*#__PURE__*/function () {
    var _ref4 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__["default"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee4() {
      var payload, response, result;
      return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              // Create your payload with the mapped items.
              // Replace 'associatedParts' with your actual variable containing the list.
              payload = {
                items: associatedParts.map(function (part) {
                  return {
                    name: part.name,
                    arrival_date: part.arrival_date,
                    // Ensure your part has a 'date' field.
                    poNumber: part.poNumber || "",
                    OEM: part.TheMachine ? part.TheMachine.oem || "" : "",
                    modality: part.TheMachine ? part.TheMachine.modality || "" : "",
                    model: part.TheMachine ? part.TheMachine.model || "" : "",
                    local_sn: part.id,
                    // Using document id as the local serial number.
                    client: part.clientName || "",
                    description: part.description || (part.descriptions && part.descriptions.length > 0 ? part.descriptions[0].description : "")
                  };
                }),
                test_print: true,
                // Hard-coded here if you want to test printing one item
                index: 1 // Hard-coded index (1-based)

              };
              _context4.prev = 1;
              _context4.next = 4;
              return fetch("https://9d70-174-76-22-138.ngrok-free.app/print_multi", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
              });

            case 4:
              response = _context4.sent;
              _context4.next = 7;
              return response.json();

            case 7:
              result = _context4.sent;
              console.log("Print multi result:", result.status);
              _context4.next = 14;
              break;

            case 11:
              _context4.prev = 11;
              _context4.t0 = _context4["catch"](1);
              console.error("Error printing multiple labels:", _context4.t0);

            case 14:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[1, 11]]);
    }));

    return function handlePrintMulti() {
      return _ref4.apply(this, arguments);
    };
  }();

  var handleSelectPart = function handleSelectPart(id, name) {
    console.log("Selected part ID: ".concat(id, ", Name: ").concat(name));
    router.push("../item/" + id);
  };

  var formatDate = function formatDate(input) {
    var date;

    if (input && input.seconds) {
      // Handle timestamp object with 'seconds' property
      date = new Date(input.seconds * 1000);
    } else if (typeof input === "string") {
      // Handle date string
      date = new Date(input);
    } else {
      return "N/A";
    }

    if (isNaN(date.getTime())) {
      // Invalid date string
      return "Invalid Date";
    }

    return date.toLocaleDateString();
  };

  return __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Container"], {
    className: "mt-5",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 159,
      columnNumber: 5
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Row"], {
    className: "justify-content-md-center",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 160,
      columnNumber: 7
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Col"], {
    md: "8",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 161,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Card"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 162,
      columnNumber: 11
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Card"].Header, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 163,
      columnNumber: 13
    }
  }, __jsx("h4", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 164,
      columnNumber: 15
    }
  }, "Machine Details")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Card"].Body, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 166,
      columnNumber: 13
    }
  }, error && __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Alert"], {
    variant: "danger",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 167,
      columnNumber: 25
    }
  }, error), selectedMachine ? __jsx(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null, __jsx("h5", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 170,
      columnNumber: 19
    }
  }, "Machine: ", selectedMachine.name), __jsx("p", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 171,
      columnNumber: 19
    }
  }, "Model: ", selectedMachine.Model), __jsx("p", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 172,
      columnNumber: 19
    }
  }, "Model: ", selectedMachine.Modality), __jsx("p", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 173,
      columnNumber: 19
    }
  }, "Model: ", selectedMachine.OEM), __jsx("p", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 174,
      columnNumber: 19
    }
  }, "Last PM: ", formatDate(selectedMachine.lastPM)), __jsx("p", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 175,
      columnNumber: 19
    }
  }, "Next PM: ", formatDate(selectedMachine.nextPM)), __jsx("h5", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 176,
      columnNumber: 19
    }
  }, "Associated Parts"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Table"], {
    striped: true,
    bordered: true,
    hover: true,
    size: "sm",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 177,
      columnNumber: 19
    }
  }, __jsx("thead", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 178,
      columnNumber: 21
    }
  }, __jsx("tr", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 179,
      columnNumber: 23
    }
  }, __jsx("th", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 180,
      columnNumber: 25
    }
  }, "Name"), __jsx("th", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 181,
      columnNumber: 25
    }
  }, "ID"), __jsx("th", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 182,
      columnNumber: 25
    }
  }, "Part Number"), __jsx("th", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 183,
      columnNumber: 25
    }
  }, "Serial Number"), __jsx("th", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 184,
      columnNumber: 25
    }
  }, "Date"), __jsx("th", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 185,
      columnNumber: 25
    }
  }, "Select"))), __jsx("tbody", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 188,
      columnNumber: 21
    }
  }, associatedParts.map(function (part) {
    return __jsx("tr", {
      key: part.id,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 190,
        columnNumber: 25
      }
    }, __jsx("td", {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 191,
        columnNumber: 27
      }
    }, part.name), __jsx("td", {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 192,
        columnNumber: 27
      }
    }, part.id), __jsx("td", {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 193,
        columnNumber: 27
      }
    }, part.pn), __jsx("td", {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 194,
        columnNumber: 27
      }
    }, part.sn), __jsx("td", {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 195,
        columnNumber: 27
      }
    }, part.date), __jsx("td", {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 196,
        columnNumber: 27
      }
    }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Button"], {
      variant: "primary",
      onClick: function onClick() {
        return handleSelectPart(part.id, part.name);
      },
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 197,
        columnNumber: 29
      }
    }, "Select")));
  }), __jsx("tr", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 208,
      columnNumber: 23
    }
  }, __jsx("td", {
    colSpan: "5",
    style: {
      textAlign: "center",
      paddingTop: "20px"
    },
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 209,
      columnNumber: 25
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Button"], {
    variant: "secondary",
    onClick: handlePrintMulti,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 213,
      columnNumber: 27
    }
  }, "Print All Items"))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Button"], {
    variant: "primary",
    style: {
      marginTop: "20px"
    },
    onClick: function onClick() {
      return router.back();
    },
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 222,
      columnNumber: 23
    }
  }, "back")))) : !error && __jsx("p", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 234,
      columnNumber: 27
    }
  }, "Loading machine data..."))))));
};

_s(Machine, "Jrgj0t6JGVLZrjyifcZbKOFoxno=", false, function () {
  return [next_router__WEBPACK_IMPORTED_MODULE_4__["useRouter"]];
});

_c = Machine;
var __N_SSP = true;
/* harmony default export */ __webpack_exports__["default"] = (Machine); // Server-side rendering function

var _c;

$RefreshReg$(_c, "Machine");

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

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/next/dist/compiled/webpack/harmony-module.js */ "./node_modules/next/dist/compiled/webpack/harmony-module.js")(module)))

/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vcGFnZXMvTmV3U2VhcmNoL21hY2hpbmUvL2luZGV4LmpzIl0sIm5hbWVzIjpbIk1hY2hpbmUiLCJyb3V0ZXIiLCJ1c2VSb3V0ZXIiLCJ1c2VTdGF0ZSIsInNlbGVjdGVkTWFjaGluZSIsInNldFNlbGVjdGVkTWFjaGluZSIsImFzc29jaWF0ZWRQYXJ0cyIsInNldEFzc29jaWF0ZWRQYXJ0cyIsImVycm9yIiwic2V0RXJyb3IiLCJ1c2VFZmZlY3QiLCJpc1JlYWR5IiwibWFjaGluZUlkIiwicXVlcnkiLCJwYXRoU2VnbWVudHMiLCJhc1BhdGgiLCJzcGxpdCIsIm1hY2hpbmVJZEZyb21QYXRoIiwibGVuZ3RoIiwiY29uc29sZSIsImxvZyIsImZldGNoTWFjaGluZURhdGEiLCJkYiIsImZpcmViYXNlIiwiZmlyZXN0b3JlIiwiY29sbGVjdGlvbiIsImRvYyIsImdldCIsIm1hY2hpbmVEb2MiLCJleGlzdHMiLCJtYWNoaW5lRGF0YSIsImRhdGEiLCJmZXRjaEFzc29jaWF0ZWRQYXJ0cyIsImFzc29jaWF0ZWRQYXJ0c1JlZnMiLCJQcm9taXNlIiwiYWxsIiwibWFwIiwicmVmIiwicGFydHNEb2NzIiwiY2xpZW50TmFtZSIsIkNsaWVudEZyb20iLCJjbGllbnREb2MiLCJuYW1lIiwiaWQiLCJwYXJ0c0RhdGEiLCJmaWx0ZXIiLCJwIiwiaGFuZGxlUHJpbnRNdWx0aSIsInBheWxvYWQiLCJpdGVtcyIsInBhcnQiLCJhcnJpdmFsX2RhdGUiLCJwb051bWJlciIsIk9FTSIsIlRoZU1hY2hpbmUiLCJvZW0iLCJtb2RhbGl0eSIsIm1vZGVsIiwibG9jYWxfc24iLCJjbGllbnQiLCJkZXNjcmlwdGlvbiIsImRlc2NyaXB0aW9ucyIsInRlc3RfcHJpbnQiLCJpbmRleCIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwicmVzcG9uc2UiLCJqc29uIiwicmVzdWx0Iiwic3RhdHVzIiwiaGFuZGxlU2VsZWN0UGFydCIsInB1c2giLCJmb3JtYXREYXRlIiwiaW5wdXQiLCJkYXRlIiwic2Vjb25kcyIsIkRhdGUiLCJpc05hTiIsImdldFRpbWUiLCJ0b0xvY2FsZURhdGVTdHJpbmciLCJNb2RlbCIsIk1vZGFsaXR5IiwibGFzdFBNIiwibmV4dFBNIiwicG4iLCJzbiIsInRleHRBbGlnbiIsInBhZGRpbmdUb3AiLCJtYXJnaW5Ub3AiLCJiYWNrIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7Q0FXQTs7QUFHQSxJQUFNQSxPQUFPLEdBQUcsU0FBVkEsT0FBVSxHQUFNO0FBQUE7O0FBQ3BCLE1BQU1DLE1BQU0sR0FBR0MsNkRBQVMsRUFBeEI7O0FBRG9CLGtCQUUwQkMsc0RBQVEsQ0FBQyxJQUFELENBRmxDO0FBQUEsTUFFYkMsZUFGYTtBQUFBLE1BRUlDLGtCQUZKOztBQUFBLG1CQUcwQkYsc0RBQVEsQ0FBQyxFQUFELENBSGxDO0FBQUEsTUFHYkcsZUFIYTtBQUFBLE1BR0lDLGtCQUhKOztBQUFBLG1CQUlNSixzREFBUSxDQUFDLElBQUQsQ0FKZDtBQUFBLE1BSWJLLEtBSmE7QUFBQSxNQUlOQyxRQUpNOztBQU1wQkMseURBQVMsQ0FBQyxZQUFNO0FBQ2QsUUFBSVQsTUFBTSxDQUFDVSxPQUFYLEVBQW9CO0FBQUEsVUFDVkMsU0FEVSxHQUNJWCxNQUFNLENBQUNZLEtBRFgsQ0FDVkQsU0FEVTs7QUFFbEIsVUFBSSxDQUFDQSxTQUFMLEVBQWdCO0FBQ2QsWUFBTUUsWUFBWSxHQUFHYixNQUFNLENBQUNjLE1BQVAsQ0FBY0MsS0FBZCxDQUFvQixHQUFwQixDQUFyQjtBQUNBLFlBQU1DLGlCQUFpQixHQUFHSCxZQUFZLENBQUNBLFlBQVksQ0FBQ0ksTUFBYixHQUFzQixDQUF2QixDQUF0QztBQUNBQyxlQUFPLENBQUNDLEdBQVIsK0NBQW1ESCxpQkFBbkQ7QUFDQUksd0JBQWdCLENBQUNKLGlCQUFELENBQWhCO0FBQ0QsT0FMRCxNQUtP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QVVPLElBQUksQ0FBQ1IsSUFBZixDQURUO0FBQUEsT0FGWDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGdCQURGLENBTkYsQ0FEbUI7QUFBQSxHQUFwQixDQURILEVBb0JFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDRTtBQUNFLFdBQU8sRUFBQyxHQURWO0FBRUUsU0FBSyxFQUFFO0FBQUVnRCxlQUFTLEVBQUUsUUFBYjtBQUF1QkMsZ0JBQVUsRUFBRTtBQUFuQyxLQUZUO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FJRSxNQUFDLHNEQUFEO0FBQ0UsV0FBTyxFQUFDLFdBRFY7QUFFRSxXQUFPLEVBQUU1QyxnQkFGWDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUpGLENBREYsQ0FwQkYsRUFrQ0UsTUFBQyxzREFBRDtBQUNFLFdBQU8sRUFBQyxTQURWO0FBRUUsU0FBSyxFQUFFO0FBQUU2QyxlQUFTLEVBQUU7QUFBYixLQUZUO0FBR0UsV0FBTyxFQUFFO0FBQUEsYUFBTTNGLE1BQU0sQ0FBQzRGLElBQVAsRUFBTjtBQUFBLEtBSFg7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQWxDRixDQVhGLENBUkYsQ0FEYyxHQWtFZCxDQUFDckYsS0FBRCxJQUFVO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsK0JBcEVkLENBSkYsQ0FERixDQURGLENBREYsQ0FERjtBQW9GRCxDQWpPRDs7R0FBTVIsTztVQUNXRSxxRDs7O0tBRFhGLE87O0FBbU9TQSxzRUFBZixFLENBRUEiLCJmaWxlIjoic3RhdGljL3dlYnBhY2svcGFnZXMvTmV3U2VhcmNoL21hY2hpbmUvW2lkXS41ZDFkNzA0N2I3OGZjMWE0ZjFiNi5ob3QtdXBkYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gXCJuZXh0L3JvdXRlclwiO1xuaW1wb3J0IHtcbiAgVGFibGUsXG4gIEJ1dHRvbixcbiAgQ29udGFpbmVyLFxuICBDYXJkLFxuICBSb3csXG4gIENvbCxcbiAgQWxlcnQsXG59IGZyb20gXCJyZWFjdC1ib290c3RyYXBcIjtcbmltcG9ydCBmaXJlYmFzZSBmcm9tIFwiLi4vLi4vLi4vLi4vY29udGV4dC9GaXJlYmFzZVwiO1xuXG4vLyBJbXBvcnQgZm9yIFNTUlxuaW1wb3J0IHsgYWRtaW5EYiB9IGZyb20gXCIuLi8uLi8uLi8uLi9jb250ZXh0L0ZpcmViYXNlQWRtaW5cIjtcblxuY29uc3QgTWFjaGluZSA9ICgpID0+IHtcbiAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XG4gIGNvbnN0IFtzZWxlY3RlZE1hY2hpbmUsIHNldFNlbGVjdGVkTWFjaGluZV0gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW2Fzc29jaWF0ZWRQYXJ0cywgc2V0QXNzb2NpYXRlZFBhcnRzXSA9IHVzZVN0YXRlKFtdKTtcbiAgY29uc3QgW2Vycm9yLCBzZXRFcnJvcl0gPSB1c2VTdGF0ZShudWxsKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChyb3V0ZXIuaXNSZWFkeSkge1xuICAgICAgY29uc3QgeyBtYWNoaW5lSWQgfSA9IHJvdXRlci5xdWVyeTtcbiAgICAgIGlmICghbWFjaGluZUlkKSB7XG4gICAgICAgIGNvbnN0IHBhdGhTZWdtZW50cyA9IHJvdXRlci5hc1BhdGguc3BsaXQoXCIvXCIpO1xuICAgICAgICBjb25zdCBtYWNoaW5lSWRGcm9tUGF0aCA9IHBhdGhTZWdtZW50c1twYXRoU2VnbWVudHMubGVuZ3RoIC0gMV07XG4gICAgICAgIGNvbnNvbGUubG9nKGBNYWNoaW5lIElEIGV4dHJhY3RlZCBmcm9tIFVSTCBwYXRoOiAke21hY2hpbmVJZEZyb21QYXRofWApO1xuICAgICAgICBmZXRjaE1hY2hpbmVEYXRhKG1hY2hpbmVJZEZyb21QYXRoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGBNYWNoaW5lIElEIGZyb20gcm91dGVyIHF1ZXJ5OiAke21hY2hpbmVJZH1gKTtcbiAgICAgICAgZmV0Y2hNYWNoaW5lRGF0YShtYWNoaW5lSWQpO1xuICAgICAgfVxuICAgIH1cbiAgfSwgW3JvdXRlci5pc1JlYWR5XSk7XG5cbiAgY29uc3QgZmV0Y2hNYWNoaW5lRGF0YSA9IGFzeW5jIChtYWNoaW5lSWQpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc29sZS5sb2coYEF0dGVtcHRpbmcgdG8gZmV0Y2ggbWFjaGluZSBkYXRhIGZvciBJRDogJHttYWNoaW5lSWR9YCk7XG4gICAgICBjb25zdCBkYiA9IGZpcmViYXNlLmZpcmVzdG9yZSgpO1xuICAgICAgY29uc3QgbWFjaGluZURvYyA9IGF3YWl0IGRiLmNvbGxlY3Rpb24oXCJNYWNoaW5lXCIpLmRvYyhtYWNoaW5lSWQpLmdldCgpO1xuICAgICAgaWYgKG1hY2hpbmVEb2MuZXhpc3RzKSB7XG4gICAgICAgIGNvbnN0IG1hY2hpbmVEYXRhID0gbWFjaGluZURvYy5kYXRhKCk7XG4gICAgICAgIHNldFNlbGVjdGVkTWFjaGluZShtYWNoaW5lRGF0YSk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiTWFjaGluZSBkYXRhOlwiLCBtYWNoaW5lRGF0YSk7XG5cbiAgICAgICAgLy8gRmV0Y2ggYXNzb2NpYXRlZCBwYXJ0c1xuICAgICAgICBpZiAobWFjaGluZURhdGEuYXNzb2NpYXRlZFBhcnRzKSB7XG4gICAgICAgICAgZmV0Y2hBc3NvY2lhdGVkUGFydHMobWFjaGluZURhdGEuYXNzb2NpYXRlZFBhcnRzKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIk1hY2hpbmUgbm90IGZvdW5kXCIpO1xuICAgICAgICBzZXRFcnJvcihcIk1hY2hpbmUgbm90IGZvdW5kXCIpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZmV0Y2hpbmcgbWFjaGluZSBkYXRhOlwiLCBlcnJvcik7XG4gICAgICBzZXRFcnJvcihcIkVycm9yIGZldGNoaW5nIG1hY2hpbmUgZGF0YVwiKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZmV0Y2hBc3NvY2lhdGVkUGFydHMgPSBhc3luYyAoYXNzb2NpYXRlZFBhcnRzUmVmcykgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBkYiA9IGZpcmViYXNlLmZpcmVzdG9yZSgpO1xuICAgICAgY29uc3QgcGFydHNEb2NzID0gYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICAgIGFzc29jaWF0ZWRQYXJ0c1JlZnMubWFwKChyZWYpID0+IHJlZi5nZXQoKSlcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IHBhcnRzRGF0YSA9IGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgICBwYXJ0c0RvY3MubWFwKGFzeW5jIChkb2MpID0+IHtcbiAgICAgICAgICBpZiAoIWRvYy5leGlzdHMpIHtcbiAgICAgICAgICAgIC8vIHNraXAgb3IgcmV0dXJuIGFuIGVtcHR5IG9iamVjdFxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IGRhdGEgPSBkb2MuZGF0YSgpIHx8IHt9O1xuICAgICAgICAgIGxldCBjbGllbnROYW1lID0gXCJcIjtcbiAgICAgICAgICBpZiAoZGF0YS5DbGllbnRGcm9tPy5nZXQpIHtcbiAgICAgICAgICAgIGNvbnN0IGNsaWVudERvYyA9IGF3YWl0IGRhdGEuQ2xpZW50RnJvbS5nZXQoKTtcbiAgICAgICAgICAgIGNsaWVudE5hbWUgPSBjbGllbnREb2MuZXhpc3RzID8gY2xpZW50RG9jLmRhdGEoKS5uYW1lIDogXCJcIjtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHsgaWQ6IGRvYy5pZCwgLi4uZGF0YSwgY2xpZW50TmFtZSB9O1xuICAgICAgICB9KVxuICAgICAgKTtcblxuICAgICAgc2V0QXNzb2NpYXRlZFBhcnRzKHBhcnRzRGF0YS5maWx0ZXIoKHApID0+IHApKTtcbiAgICAgIGNvbnNvbGUubG9nKFwiQXNzb2NpYXRlZCBwYXJ0cyBkYXRhOlwiLCBwYXJ0c0RhdGEpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZmV0Y2hpbmcgYXNzb2NpYXRlZCBwYXJ0czpcIiwgZXJyb3IpO1xuICAgICAgc2V0RXJyb3IoXCJFcnJvciBmZXRjaGluZyBhc3NvY2lhdGVkIHBhcnRzXCIpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVQcmludE11bHRpID0gYXN5bmMgKCkgPT4ge1xuICAgIC8vIENyZWF0ZSB5b3VyIHBheWxvYWQgd2l0aCB0aGUgbWFwcGVkIGl0ZW1zLlxuICAgIC8vIFJlcGxhY2UgJ2Fzc29jaWF0ZWRQYXJ0cycgd2l0aCB5b3VyIGFjdHVhbCB2YXJpYWJsZSBjb250YWluaW5nIHRoZSBsaXN0LlxuICAgIGNvbnN0IHBheWxvYWQgPSB7XG4gICAgICBpdGVtczogYXNzb2NpYXRlZFBhcnRzLm1hcCgocGFydCkgPT4gKHtcbiAgICAgICAgbmFtZTogcGFydC5uYW1lLFxuICAgICAgICBhcnJpdmFsX2RhdGU6IHBhcnQuYXJyaXZhbF9kYXRlLCAvLyBFbnN1cmUgeW91ciBwYXJ0IGhhcyBhICdkYXRlJyBmaWVsZC5cbiAgICAgICAgcG9OdW1iZXI6IHBhcnQucG9OdW1iZXIgfHwgXCJcIixcbiAgICAgICAgT0VNOiBwYXJ0LlRoZU1hY2hpbmUgPyBwYXJ0LlRoZU1hY2hpbmUub2VtIHx8IFwiXCIgOiBcIlwiLFxuICAgICAgICBtb2RhbGl0eTogcGFydC5UaGVNYWNoaW5lID8gcGFydC5UaGVNYWNoaW5lLm1vZGFsaXR5IHx8IFwiXCIgOiBcIlwiLFxuICAgICAgICBtb2RlbDogcGFydC5UaGVNYWNoaW5lID8gcGFydC5UaGVNYWNoaW5lLm1vZGVsIHx8IFwiXCIgOiBcIlwiLFxuICAgICAgICBsb2NhbF9zbjogcGFydC5pZCwgLy8gVXNpbmcgZG9jdW1lbnQgaWQgYXMgdGhlIGxvY2FsIHNlcmlhbCBudW1iZXIuXG4gICAgICAgIGNsaWVudDogcGFydC5jbGllbnROYW1lIHx8IFwiXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOlxuICAgICAgICAgIHBhcnQuZGVzY3JpcHRpb24gfHxcbiAgICAgICAgICAocGFydC5kZXNjcmlwdGlvbnMgJiYgcGFydC5kZXNjcmlwdGlvbnMubGVuZ3RoID4gMFxuICAgICAgICAgICAgPyBwYXJ0LmRlc2NyaXB0aW9uc1swXS5kZXNjcmlwdGlvblxuICAgICAgICAgICAgOiBcIlwiKSxcbiAgICAgIH0pKSxcbiAgICAgIHRlc3RfcHJpbnQ6IHRydWUsIC8vIEhhcmQtY29kZWQgaGVyZSBpZiB5b3Ugd2FudCB0byB0ZXN0IHByaW50aW5nIG9uZSBpdGVtXG4gICAgICBpbmRleDogMSwgLy8gSGFyZC1jb2RlZCBpbmRleCAoMS1iYXNlZClcbiAgICB9O1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gICAgICAgIFwiaHR0cHM6Ly85ZDcwLTE3NC03Ni0yMi0xMzgubmdyb2stZnJlZS5hcHAvcHJpbnRfbXVsdGlcIixcbiAgICAgICAge1xuICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxuICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHBheWxvYWQpLFxuICAgICAgICB9XG4gICAgICApO1xuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgY29uc29sZS5sb2coXCJQcmludCBtdWx0aSByZXN1bHQ6XCIsIHJlc3VsdC5zdGF0dXMpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgcHJpbnRpbmcgbXVsdGlwbGUgbGFiZWxzOlwiLCBlcnJvcik7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVNlbGVjdFBhcnQgPSAoaWQsIG5hbWUpID0+IHtcbiAgICBjb25zb2xlLmxvZyhgU2VsZWN0ZWQgcGFydCBJRDogJHtpZH0sIE5hbWU6ICR7bmFtZX1gKTtcbiAgICByb3V0ZXIucHVzaChcIi4uL2l0ZW0vXCIgKyBpZCk7XG4gIH07XG5cbiAgY29uc3QgZm9ybWF0RGF0ZSA9IChpbnB1dCkgPT4ge1xuICAgIGxldCBkYXRlO1xuXG4gICAgaWYgKGlucHV0ICYmIGlucHV0LnNlY29uZHMpIHtcbiAgICAgIC8vIEhhbmRsZSB0aW1lc3RhbXAgb2JqZWN0IHdpdGggJ3NlY29uZHMnIHByb3BlcnR5XG4gICAgICBkYXRlID0gbmV3IERhdGUoaW5wdXQuc2Vjb25kcyAqIDEwMDApO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGlucHV0ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAvLyBIYW5kbGUgZGF0ZSBzdHJpbmdcbiAgICAgIGRhdGUgPSBuZXcgRGF0ZShpbnB1dCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBcIk4vQVwiO1xuICAgIH1cblxuICAgIGlmIChpc05hTihkYXRlLmdldFRpbWUoKSkpIHtcbiAgICAgIC8vIEludmFsaWQgZGF0ZSBzdHJpbmdcbiAgICAgIHJldHVybiBcIkludmFsaWQgRGF0ZVwiO1xuICAgIH1cblxuICAgIHJldHVybiBkYXRlLnRvTG9jYWxlRGF0ZVN0cmluZygpO1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPENvbnRhaW5lciBjbGFzc05hbWU9XCJtdC01XCI+XG4gICAgICA8Um93IGNsYXNzTmFtZT1cImp1c3RpZnktY29udGVudC1tZC1jZW50ZXJcIj5cbiAgICAgICAgPENvbCBtZD1cIjhcIj5cbiAgICAgICAgICA8Q2FyZD5cbiAgICAgICAgICAgIDxDYXJkLkhlYWRlcj5cbiAgICAgICAgICAgICAgPGg0Pk1hY2hpbmUgRGV0YWlsczwvaDQ+XG4gICAgICAgICAgICA8L0NhcmQuSGVhZGVyPlxuICAgICAgICAgICAgPENhcmQuQm9keT5cbiAgICAgICAgICAgICAge2Vycm9yICYmIDxBbGVydCB2YXJpYW50PVwiZGFuZ2VyXCI+e2Vycm9yfTwvQWxlcnQ+fVxuICAgICAgICAgICAgICB7c2VsZWN0ZWRNYWNoaW5lID8gKFxuICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICA8aDU+TWFjaGluZToge3NlbGVjdGVkTWFjaGluZS5uYW1lfTwvaDU+XG4gICAgICAgICAgICAgICAgICA8cD5Nb2RlbDoge3NlbGVjdGVkTWFjaGluZS5Nb2RlbH08L3A+XG4gICAgICAgICAgICAgICAgICA8cD5Nb2RlbDoge3NlbGVjdGVkTWFjaGluZS5Nb2RhbGl0eX08L3A+XG4gICAgICAgICAgICAgICAgICA8cD5Nb2RlbDoge3NlbGVjdGVkTWFjaGluZS5PRU19PC9wPlxuICAgICAgICAgICAgICAgICAgPHA+TGFzdCBQTToge2Zvcm1hdERhdGUoc2VsZWN0ZWRNYWNoaW5lLmxhc3RQTSl9PC9wPlxuICAgICAgICAgICAgICAgICAgPHA+TmV4dCBQTToge2Zvcm1hdERhdGUoc2VsZWN0ZWRNYWNoaW5lLm5leHRQTSl9PC9wPlxuICAgICAgICAgICAgICAgICAgPGg1PkFzc29jaWF0ZWQgUGFydHM8L2g1PlxuICAgICAgICAgICAgICAgICAgPFRhYmxlIHN0cmlwZWQgYm9yZGVyZWQgaG92ZXIgc2l6ZT1cInNtXCI+XG4gICAgICAgICAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGg+TmFtZTwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGg+SUQ8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoPlBhcnQgTnVtYmVyPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5TZXJpYWwgTnVtYmVyPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5EYXRlPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5TZWxlY3Q8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgICB7YXNzb2NpYXRlZFBhcnRzLm1hcCgocGFydCkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPHRyIGtleT17cGFydC5pZH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD57cGFydC5uYW1lfTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD57cGFydC5pZH08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+e3BhcnQucG59PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPntwYXJ0LnNufTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD57cGFydC5kYXRlfTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXJpYW50PVwicHJpbWFyeVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVTZWxlY3RQYXJ0KHBhcnQuaWQsIHBhcnQubmFtZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBTZWxlY3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbFNwYW49XCI1XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgdGV4dEFsaWduOiBcImNlbnRlclwiLCBwYWRkaW5nVG9wOiBcIjIwcHhcIiB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFudD1cInNlY29uZGFyeVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlUHJpbnRNdWx0aX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFByaW50IEFsbCBJdGVtc1xuICAgICAgICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgICB7LyogPENvbCBtZD17NH0+ICovfVxuICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhbnQ9XCJwcmltYXJ5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IG1hcmdpblRvcDogXCIyMHB4XCIgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHJvdXRlci5iYWNrKCl9XG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgYmFja1xuICAgICAgICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgIHsvKiA8L0NvbD4gKi99XG4gICAgICAgICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICAgICAgICA8L1RhYmxlPlxuICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICFlcnJvciAmJiA8cD5Mb2FkaW5nIG1hY2hpbmUgZGF0YS4uLjwvcD5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvQ2FyZC5Cb2R5PlxuICAgICAgICAgIDwvQ2FyZD5cbiAgICAgICAgPC9Db2w+XG4gICAgICA8L1Jvdz5cbiAgICA8L0NvbnRhaW5lcj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IE1hY2hpbmU7XG5cbi8vIFNlcnZlci1zaWRlIHJlbmRlcmluZyBmdW5jdGlvblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFNlcnZlclNpZGVQcm9wcyhjb250ZXh0KSB7XG4gIGNvbnN0IHsgaWQgfSA9IGNvbnRleHQucGFyYW1zO1xuXG4gIHRyeSB7XG4gICAgLy8gRmV0Y2ggbWFjaGluZSBkYXRhIGZyb20gRmlyZXN0b3JlIHVzaW5nIEFkbWluIFNES1xuICAgIGNvbnN0IG1hY2hpbmVEb2MgPSBhd2FpdCBhZG1pbkRiLmNvbGxlY3Rpb24oXCJNYWNoaW5lXCIpLmRvYyhpZCkuZ2V0KCk7XG5cbiAgICBpZiAoIW1hY2hpbmVEb2MuZXhpc3RzKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBub3RGb3VuZDogdHJ1ZSwgLy8gVGhpcyB3aWxsIHNob3cgYSA0MDQgcGFnZVxuICAgICAgfTtcbiAgICB9XG5cbiAgICBjb25zdCBtYWNoaW5lRGF0YSA9IG1hY2hpbmVEb2MuZGF0YSgpO1xuXG4gICAgLy8gRmV0Y2ggYXNzb2NpYXRlZCBwYXJ0cyBpZiB0aGV5IGV4aXN0XG4gICAgbGV0IGFzc29jaWF0ZWRQYXJ0cyA9IFtdO1xuICAgIGlmIChcbiAgICAgIG1hY2hpbmVEYXRhLmFzc29jaWF0ZWRQYXJ0cyAmJlxuICAgICAgQXJyYXkuaXNBcnJheShtYWNoaW5lRGF0YS5hc3NvY2lhdGVkUGFydHMpXG4gICAgKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBwYXJ0c1Byb21pc2VzID0gbWFjaGluZURhdGEuYXNzb2NpYXRlZFBhcnRzXG4gICAgICAgICAgLm1hcCgocGFydFJlZikgPT4ge1xuICAgICAgICAgICAgaWYgKHBhcnRSZWYucGF0aCkge1xuICAgICAgICAgICAgICByZXR1cm4gYWRtaW5EYi5kb2MocGFydFJlZi5wYXRoKS5nZXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmZpbHRlcihCb29sZWFuKTtcblxuICAgICAgICBjb25zdCBwYXJ0c0RvY3MgPSBhd2FpdCBQcm9taXNlLmFsbChwYXJ0c1Byb21pc2VzKTtcbiAgICAgICAgYXNzb2NpYXRlZFBhcnRzID0gYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICAgICAgcGFydHNEb2NzLm1hcChhc3luYyAoZG9jKSA9PiB7XG4gICAgICAgICAgICBpZiAoIWRvYy5leGlzdHMpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBkYXRhID0gZG9jLmRhdGEoKSB8fCB7fTtcbiAgICAgICAgICAgIGxldCBjbGllbnROYW1lID0gXCJcIjtcblxuICAgICAgICAgICAgLy8gRmV0Y2ggY2xpZW50IG5hbWUgaWYgQ2xpZW50RnJvbSByZWZlcmVuY2UgZXhpc3RzXG4gICAgICAgICAgICBpZiAoZGF0YS5DbGllbnRGcm9tICYmIGRhdGEuQ2xpZW50RnJvbS5wYXRoKSB7XG4gICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2xpZW50RG9jID0gYXdhaXQgYWRtaW5EYi5kb2MoZGF0YS5DbGllbnRGcm9tLnBhdGgpLmdldCgpO1xuICAgICAgICAgICAgICAgIGNsaWVudE5hbWUgPSBjbGllbnREb2MuZXhpc3RzID8gY2xpZW50RG9jLmRhdGEoKS5uYW1lIDogXCJcIjtcbiAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZmV0Y2hpbmcgY2xpZW50IGRhdGE6XCIsIGVycm9yKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBpZDogZG9jLmlkLFxuICAgICAgICAgICAgICAuLi5kYXRhLFxuICAgICAgICAgICAgICBjbGllbnROYW1lLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuXG4gICAgICAgIC8vIEZpbHRlciBvdXQgbnVsbCB2YWx1ZXNcbiAgICAgICAgYXNzb2NpYXRlZFBhcnRzID0gYXNzb2NpYXRlZFBhcnRzLmZpbHRlcigocGFydCkgPT4gcGFydCAhPT0gbnVsbCk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZmV0Y2hpbmcgYXNzb2NpYXRlZCBwYXJ0czpcIiwgZXJyb3IpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFNlcmlhbGl6ZSB0aGUgbWFjaGluZSBkYXRhLCByZW1vdmluZyBhbnkgbm9uLXNlcmlhbGl6YWJsZSBmaWVsZHNcbiAgICBjb25zdCBzZXJpYWxpemVkTWFjaGluZSA9IHtcbiAgICAgIGlkLFxuICAgICAgbmFtZTogbWFjaGluZURhdGEubmFtZSB8fCBcIlwiLFxuICAgICAgTW9kZWw6IG1hY2hpbmVEYXRhLk1vZGVsIHx8IFwiXCIsXG4gICAgICBPRU06IG1hY2hpbmVEYXRhLk9FTSB8fCBcIlwiLFxuICAgICAgTW9kYWxpdHk6IG1hY2hpbmVEYXRhLk1vZGFsaXR5IHx8IFwiXCIsXG4gICAgICBsYXN0UE06IG1hY2hpbmVEYXRhLmxhc3RQTSB8fCBudWxsLFxuICAgICAgbmV4dFBNOiBtYWNoaW5lRGF0YS5uZXh0UE0gfHwgbnVsbCxcbiAgICAgIC8vIEFkZCBvdGhlciBtYWNoaW5lIGZpZWxkcyBhcyBuZWVkZWQsIGJ1dCBlbnN1cmUgdGhleSdyZSBzZXJpYWxpemFibGVcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHByb3BzOiB7XG4gICAgICAgIGluaXRpYWxNYWNoaW5lOiBzZXJpYWxpemVkTWFjaGluZSxcbiAgICAgICAgaW5pdGlhbEFzc29jaWF0ZWRQYXJ0czogYXNzb2NpYXRlZFBhcnRzLFxuICAgICAgfSxcbiAgICB9O1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBpbiBnZXRTZXJ2ZXJTaWRlUHJvcHM6XCIsIGVycm9yKTtcbiAgICByZXR1cm4ge1xuICAgICAgcHJvcHM6IHtcbiAgICAgICAgZXJyb3I6IFwiRmFpbGVkIHRvIGxvYWQgbWFjaGluZSBkYXRhXCIsXG4gICAgICB9LFxuICAgIH07XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=