_N_E =
(window["webpackJsonp_N_E"] = window["webpackJsonp_N_E"] || []).push([[46],{

/***/ "20a2":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("nOHt")


/***/ }),

/***/ "2cz2":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__N_SSP", function() { return __N_SSP; });
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("xvhg");
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("z7pX");
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("cpVT");
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("vJKn");
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("rg98");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("20a2");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("cWnB");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("zM5D");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("TUci");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("MBJH");
/* harmony import */ var _context_Firebase__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("NY6m");
/* harmony import */ var _Machine_module_css__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("ejhT");
/* harmony import */ var _Machine_module_css__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_Machine_module_css__WEBPACK_IMPORTED_MODULE_12__);





var __jsx = react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }





 // Import for SSR

var Machine = function Machine(_ref) {
  var initialMachine = _ref.initialMachine,
      initialAssociatedParts = _ref.initialAssociatedParts,
      initialError = _ref.error;
  var router = Object(next_router__WEBPACK_IMPORTED_MODULE_6__["useRouter"])();

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(initialMachine || null),
      selectedMachine = _useState[0],
      setSelectedMachine = _useState[1];

  var _useState2 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(Array.isArray(initialAssociatedParts) ? initialAssociatedParts : []),
      associatedParts = _useState2[0],
      setAssociatedParts = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(initialError || null),
      error = _useState3[0],
      setError = _useState3[1];

  var _useState4 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(null),
      dragIndex = _useState4[0],
      setDragIndex = _useState4[1];

  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(null),
      dragOverIndex = _useState5[0],
      setDragOverIndex = _useState5[1];

  var _useState6 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(false),
      isPrinting = _useState6[0],
      setIsPrinting = _useState6[1];

  var _useState7 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(false),
      showPrintSuccess = _useState7[0],
      setShowPrintSuccess = _useState7[1];

  Object(react__WEBPACK_IMPORTED_MODULE_5__["useEffect"])(function () {
    if (router.isReady) {
      var id = router.query.id;

      if (!id) {
        var pathSegments = router.asPath.split("/");
        var machineIdFromPath = pathSegments[pathSegments.length - 1];
        console.log("Machine ID extracted from URL path: ".concat(machineIdFromPath));
        fetchMachineData(machineIdFromPath);
      } else {
        console.log("Machine ID from router query: ".concat(id)); // If SSR already hydrated, avoid re-fetching unless we truly need to.

        if (!selectedMachine) {
          fetchMachineData(id);
        }
      }
    }
  }, [router.isReady, selectedMachine]);

  var fetchMachineData = /*#__PURE__*/function () {
    var _ref2 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.mark(function _callee(machineId) {
      var db, machineDoc, machineData;
      return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              console.log("Attempting to fetch machine data for ID: ".concat(machineId));
              db = _context_Firebase__WEBPACK_IMPORTED_MODULE_11__[/* default */ "b"].firestore();
              _context.next = 5;
              return db.collection("Machine").doc(machineId).get();

            case 5:
              machineDoc = _context.sent;

              if (machineDoc.exists) {
                machineData = machineDoc.data();
                setSelectedMachine(machineData);
                setError(null);
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
      return _ref2.apply(this, arguments);
    };
  }();

  var fetchAssociatedParts = /*#__PURE__*/function () {
    var _ref3 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.mark(function _callee3(associatedPartsRefs) {
      var db, partsDocs, partsData;
      return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              db = _context_Firebase__WEBPACK_IMPORTED_MODULE_11__[/* default */ "b"].firestore();
              _context3.next = 4;
              return Promise.all(associatedPartsRefs.map(function (ref) {
                return ref.get();
              }));

            case 4:
              partsDocs = _context3.sent;
              _context3.next = 7;
              return Promise.all(partsDocs.map( /*#__PURE__*/function () {
                var _ref4 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.mark(function _callee2(doc) {
                  var _data$ClientFrom;

                  var data, clientName, clientDoc;
                  return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.wrap(function _callee2$(_context2) {
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
                  return _ref4.apply(this, arguments);
                };
              }()));

            case 7:
              partsData = _context3.sent;
              setAssociatedParts(partsData.filter(function (p) {
                return p;
              }));
              setError(null);
              console.log("Associated parts data:", partsData);
              _context3.next = 17;
              break;

            case 13:
              _context3.prev = 13;
              _context3.t0 = _context3["catch"](0);
              console.error("Error fetching associated parts:", _context3.t0);
              setError("Error fetching associated parts");

            case 17:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 13]]);
    }));

    return function fetchAssociatedParts(_x2) {
      return _ref3.apply(this, arguments);
    };
  }();

  var handlePrintMulti = /*#__PURE__*/function () {
    var _ref5 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.mark(function _callee4() {
      var payload, response, result;
      return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              setIsPrinting(true); // Create your payload with the mapped items.
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
              _context4.prev = 2;
              _context4.next = 5;
              return fetch("https://9d70-174-76-22-138.ngrok-free.app/print_multi", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
              });

            case 5:
              response = _context4.sent;
              _context4.next = 8;
              return response.json();

            case 8:
              result = _context4.sent;
              console.log("Print multi result:", result.status);

              if (!(!response.ok || (result === null || result === void 0 ? void 0 : result.status) === "error")) {
                _context4.next = 12;
                break;
              }

              throw new Error((result === null || result === void 0 ? void 0 : result.message) || "Print failed.");

            case 12:
              setShowPrintSuccess(true);
              _context4.next = 19;
              break;

            case 15:
              _context4.prev = 15;
              _context4.t0 = _context4["catch"](2);
              console.error("Error printing multiple labels:", _context4.t0);
              setError((_context4.t0 === null || _context4.t0 === void 0 ? void 0 : _context4.t0.message) || "Error printing multiple labels");

            case 19:
              _context4.prev = 19;
              setIsPrinting(false);
              return _context4.finish(19);

            case 22:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[2, 15, 19, 22]]);
    }));

    return function handlePrintMulti() {
      return _ref5.apply(this, arguments);
    };
  }();

  var handleSelectPart = function handleSelectPart(id, name) {
    console.log("Selected part ID: ".concat(id, ", Name: ").concat(name));
    router.push("../item/" + id);
  };

  var handleDragStart = function handleDragStart(index) {
    return function (event) {
      var _associatedParts$inde;

      if (event.target.closest("button")) {
        event.preventDefault();
        return;
      }

      setDragIndex(index);
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/plain", ((_associatedParts$inde = associatedParts[index]) === null || _associatedParts$inde === void 0 ? void 0 : _associatedParts$inde.id) || String(index));
    };
  };

  var handleDragOver = function handleDragOver(index) {
    return function (event) {
      event.preventDefault();
      if (dragOverIndex !== index) setDragOverIndex(index);
      event.dataTransfer.dropEffect = "move";
    };
  };

  var handleDrop = function handleDrop(index) {
    return function (event) {
      event.preventDefault();

      if (dragIndex == null || dragIndex === index) {
        setDragIndex(null);
        setDragOverIndex(null);
        return;
      }

      setAssociatedParts(function (prev) {
        var next = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(prev);

        var _next$splice = next.splice(dragIndex, 1),
            _next$splice2 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(_next$splice, 1),
            moved = _next$splice2[0];

        next.splice(index, 0, moved);
        return next;
      });
      setDragIndex(null);
      setDragOverIndex(null);
    };
  };

  var handleDragEnd = function handleDragEnd() {
    setDragIndex(null);
    setDragOverIndex(null);
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

  return __jsx("div", {
    className: _Machine_module_css__WEBPACK_IMPORTED_MODULE_12___default.a.page
  }, isPrinting && __jsx("div", {
    className: _Machine_module_css__WEBPACK_IMPORTED_MODULE_12___default.a.loadingOverlay
  }, __jsx("img", {
    src: "/magmo-logo.png",
    alt: "Printing",
    className: _Machine_module_css__WEBPACK_IMPORTED_MODULE_12___default.a.loadingLogo
  })), __jsx("div", {
    className: _Machine_module_css__WEBPACK_IMPORTED_MODULE_12___default.a.shell
  }, __jsx("header", {
    className: _Machine_module_css__WEBPACK_IMPORTED_MODULE_12___default.a.header
  }, __jsx("div", {
    className: _Machine_module_css__WEBPACK_IMPORTED_MODULE_12___default.a.brand
  }, __jsx("img", {
    src: "/magmo-logo.png",
    alt: "Magmo",
    className: _Machine_module_css__WEBPACK_IMPORTED_MODULE_12___default.a.brandLogo
  }), __jsx("div", null, __jsx("div", {
    className: _Machine_module_css__WEBPACK_IMPORTED_MODULE_12___default.a.brandName
  }, "Magmo"), __jsx("div", {
    className: _Machine_module_css__WEBPACK_IMPORTED_MODULE_12___default.a.brandSub
  }, "Machine Detail"))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], {
    variant: "outline-secondary",
    className: _Machine_module_css__WEBPACK_IMPORTED_MODULE_12___default.a.backButton,
    onClick: function onClick() {
      return router.back();
    }
  }, "Back")), __jsx("div", {
    className: _Machine_module_css__WEBPACK_IMPORTED_MODULE_12___default.a.card
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], {
    show: showPrintSuccess,
    onHide: function onHide() {
      return setShowPrintSuccess(false);
    },
    centered: true
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"].Header, {
    closeButton: true
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"].Title, null, "Print Complete")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"].Body, null, "All items were sent to the printer successfully."), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"].Footer, null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], {
    variant: "primary",
    onClick: function onClick() {
      return setShowPrintSuccess(false);
    }
  }, "Ok"))), __jsx("div", {
    className: _Machine_module_css__WEBPACK_IMPORTED_MODULE_12___default.a.cardHeader
  }, __jsx("div", null, __jsx("div", {
    className: _Machine_module_css__WEBPACK_IMPORTED_MODULE_12___default.a.cardTitle
  }, "Machine Details"), __jsx("div", {
    className: _Machine_module_css__WEBPACK_IMPORTED_MODULE_12___default.a.cardSubtitle
  }, "Drag and drop parts to reorder this list.")), __jsx("div", {
    className: _Machine_module_css__WEBPACK_IMPORTED_MODULE_12___default.a.cardMeta
  }, associatedParts.length, " parts")), __jsx("div", {
    className: _Machine_module_css__WEBPACK_IMPORTED_MODULE_12___default.a.cardBody
  }, error && !selectedMachine && __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"], {
    variant: "danger"
  }, error), selectedMachine ? __jsx(react__WEBPACK_IMPORTED_MODULE_5___default.a.Fragment, null, __jsx("div", {
    className: _Machine_module_css__WEBPACK_IMPORTED_MODULE_12___default.a.machineGrid
  }, __jsx("div", {
    className: _Machine_module_css__WEBPACK_IMPORTED_MODULE_12___default.a.machineInfo
  }, __jsx("div", {
    className: _Machine_module_css__WEBPACK_IMPORTED_MODULE_12___default.a.machineName
  }, selectedMachine.name || "Unnamed Machine"), __jsx("div", {
    className: _Machine_module_css__WEBPACK_IMPORTED_MODULE_12___default.a.machineMetaRow
  }, __jsx("span", null, "OEM: ", selectedMachine.OEM || "N/A"), __jsx("span", null, "Modality: ", selectedMachine.Modality || "N/A"), __jsx("span", null, "Model: ", selectedMachine.Model || "N/A"))), __jsx("div", {
    className: _Machine_module_css__WEBPACK_IMPORTED_MODULE_12___default.a.machineDates
  }, __jsx("div", null, __jsx("span", {
    className: _Machine_module_css__WEBPACK_IMPORTED_MODULE_12___default.a.dateLabel
  }, "Last PM"), __jsx("span", null, formatDate(selectedMachine.lastPM))), __jsx("div", null, __jsx("span", {
    className: _Machine_module_css__WEBPACK_IMPORTED_MODULE_12___default.a.dateLabel
  }, "Next PM"), __jsx("span", null, formatDate(selectedMachine.nextPM))))), __jsx("div", {
    className: _Machine_module_css__WEBPACK_IMPORTED_MODULE_12___default.a.tableCard
  }, __jsx("div", {
    className: _Machine_module_css__WEBPACK_IMPORTED_MODULE_12___default.a.tableHeader
  }, "Associated Parts", __jsx("span", {
    className: _Machine_module_css__WEBPACK_IMPORTED_MODULE_12___default.a.tableHint
  }, "Click + hold to move")), __jsx("div", {
    className: _Machine_module_css__WEBPACK_IMPORTED_MODULE_12___default.a.tableWrap
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"], {
    striped: true,
    bordered: true,
    hover: true,
    size: "sm",
    className: _Machine_module_css__WEBPACK_IMPORTED_MODULE_12___default.a.table
  }, __jsx("thead", null, __jsx("tr", null, __jsx("th", null, "Name"), __jsx("th", null, "ID"), __jsx("th", null, "Part Number"), __jsx("th", null, "Serial Number"), __jsx("th", null, "Date"), __jsx("th", null, "Select"))), __jsx("tbody", null, associatedParts.length === 0 && __jsx("tr", null, __jsx("td", {
    colSpan: 6,
    className: _Machine_module_css__WEBPACK_IMPORTED_MODULE_12___default.a.emptyState
  }, "No associated parts found.")), associatedParts.map(function (part, index) {
    return __jsx("tr", {
      key: part.id,
      draggable: true,
      onDragStart: handleDragStart(index),
      onDragOver: handleDragOver(index),
      onDrop: handleDrop(index),
      onDragEnd: handleDragEnd,
      className: "".concat(_Machine_module_css__WEBPACK_IMPORTED_MODULE_12___default.a.draggableRow, " ").concat(dragIndex === index ? _Machine_module_css__WEBPACK_IMPORTED_MODULE_12___default.a.dragging : "", " ").concat(dragOverIndex === index && dragIndex !== index ? _Machine_module_css__WEBPACK_IMPORTED_MODULE_12___default.a.dropTarget : "")
    }, __jsx("td", null, part.name), __jsx("td", null, part.id), __jsx("td", null, part.pn), __jsx("td", null, part.sn), __jsx("td", null, formatDate(part.date || part.arrival_date)), __jsx("td", null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], {
      variant: "primary",
      size: "sm",
      onClick: function onClick() {
        return handleSelectPart(part.id, part.name);
      }
    }, "Select")));
  })))), __jsx("div", {
    className: _Machine_module_css__WEBPACK_IMPORTED_MODULE_12___default.a.tableActions
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], {
    variant: "secondary",
    className: _Machine_module_css__WEBPACK_IMPORTED_MODULE_12___default.a.actionButton,
    onClick: handlePrintMulti
  }, "Print All Items")))) : !error && __jsx("p", {
    className: _Machine_module_css__WEBPACK_IMPORTED_MODULE_12___default.a.loadingText
  }, "Loading machine data...")))));
};

var __N_SSP = true;
/* harmony default export */ __webpack_exports__["default"] = (Machine); // Server-side rendering function

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

/***/ "cAWb":
/***/ (function(module, exports, __webpack_require__) {


    (window.__NEXT_P = window.__NEXT_P || []).push([
      "/NewSearch/machine/[id]",
      function () {
        return __webpack_require__("2cz2");
      }
    ]);
  

/***/ }),

/***/ "cpVT":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _defineProperty; });
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

/***/ }),

/***/ "ejhT":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"page":"Machine_page__Y5o9l","shell":"Machine_shell__3zfu1","header":"Machine_header__3-4wd","brand":"Machine_brand__JQapu","brandLogo":"Machine_brandLogo__3V-Dh","brandName":"Machine_brandName__1c13A","brandSub":"Machine_brandSub__JB4jf","backButton":"Machine_backButton__2uGCE","card":"Machine_card__2L-2Z","cardHeader":"Machine_cardHeader__6ni_x","cardTitle":"Machine_cardTitle__M4yT1","cardSubtitle":"Machine_cardSubtitle__1RYdY","cardMeta":"Machine_cardMeta__1qWsG","cardBody":"Machine_cardBody__2Sjqg","machineGrid":"Machine_machineGrid__4QzGf","machineInfo":"Machine_machineInfo__1y9ed","machineName":"Machine_machineName__39bAg","machineMetaRow":"Machine_machineMetaRow__xgm8_","machineDates":"Machine_machineDates__3Z6ds","dateLabel":"Machine_dateLabel__3Qj0D","tableCard":"Machine_tableCard__1oYWn","tableHeader":"Machine_tableHeader__1b2pT","tableHint":"Machine_tableHint__2Q8NL","tableWrap":"Machine_tableWrap__2p2iy","table":"Machine_table__2Fkh-","draggableRow":"Machine_draggableRow__US-WQ","dragging":"Machine_dragging__2_Jvh","dropTarget":"Machine_dropTarget__jMbqd","tableActions":"Machine_tableActions__3dLhl","actionButton":"Machine_actionButton__1pAjO","emptyState":"Machine_emptyState__2xIsK","loadingText":"Machine_loadingText__3lu-N","loadingOverlay":"Machine_loadingOverlay__33z2J","loadingLogo":"Machine_loadingLogo__2GxP1","magmo-spin":"Machine_magmo-spin__2iyBb"};

/***/ }),

/***/ "xvhg":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ _slicedToArray; });

// CONCATENATED MODULE: ./node_modules/next/node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
// CONCATENATED MODULE: ./node_modules/next/node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js
function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}
// EXTERNAL MODULE: ./node_modules/next/node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js
var unsupportedIterableToArray = __webpack_require__("8rE2");

// CONCATENATED MODULE: ./node_modules/next/node_modules/@babel/runtime/helpers/esm/nonIterableRest.js
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
// CONCATENATED MODULE: ./node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray.js




function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || Object(unsupportedIterableToArray["a" /* default */])(arr, i) || _nonIterableRest();
}

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

},[["cAWb",1,0,5,3,2,4,6,7,9,10]]]);