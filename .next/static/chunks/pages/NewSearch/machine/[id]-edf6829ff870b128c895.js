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
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("vJKn");
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("cpVT");
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

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }





 // Import for SSR

var getRefId = function getRefId(ref) {
  if (!ref) return null;
  if (typeof ref === "string") return ref;
  if (ref.id) return ref.id;
  return null;
};

var resolveDocData = /*#__PURE__*/function () {
  var _ref = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee(db, collection, refOrId) {
    var _doc, id, doc;

    return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (refOrId) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", null);

          case 2:
            _context.prev = 2;

            if (!(typeof refOrId.get === "function")) {
              _context.next = 8;
              break;
            }

            _context.next = 6;
            return refOrId.get();

          case 6:
            _doc = _context.sent;
            return _context.abrupt("return", _doc.exists ? _objectSpread({
              id: _doc.id
            }, _doc.data()) : null);

          case 8:
            id = getRefId(refOrId);

            if (id) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return", null);

          case 11:
            _context.next = 13;
            return db.collection(collection).doc(id).get();

          case 13:
            doc = _context.sent;
            return _context.abrupt("return", doc.exists ? _objectSpread({
              id: doc.id
            }, doc.data()) : null);

          case 17:
            _context.prev = 17;
            _context.t0 = _context["catch"](2);
            console.error("Error fetching ".concat(collection, " doc:"), _context.t0);
            return _context.abrupt("return", null);

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 17]]);
  }));

  return function resolveDocData(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var formatDateForPrint = function formatDateForPrint(input) {
  if (!input) return "";

  if (input.seconds) {
    var date = new Date(input.seconds * 1000);
    return isNaN(date.getTime()) ? "" : date.toLocaleDateString();
  }

  if (typeof input.toDate === "function") {
    var _date = input.toDate();

    return _date instanceof Date && !isNaN(_date.getTime()) ? _date.toLocaleDateString() : "";
  }

  if (input instanceof Date) {
    return isNaN(input.getTime()) ? "" : input.toLocaleDateString();
  }

  if (typeof input === "number") {
    var _date2 = new Date(input);

    return isNaN(_date2.getTime()) ? "" : _date2.toLocaleDateString();
  }

  if (typeof input === "string") {
    var trimmed = input.trim();
    if (!trimmed) return "";

    var _date3 = new Date(trimmed);

    return isNaN(_date3.getTime()) ? trimmed : _date3.toLocaleDateString();
  }

  return "";
};

var pickLatestDescription = function pickLatestDescription(data) {
  var _latest;

  var descs = Array.isArray(data === null || data === void 0 ? void 0 : data.descriptions) ? data.descriptions : [];
  if (!descs.length) return (data === null || data === void 0 ? void 0 : data.description) || "";
  var latest = descs[0];

  var _iterator = _createForOfIteratorHelper(descs),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var entry = _step.value;
      if (!entry) continue;

      if (!latest) {
        latest = entry;
        continue;
      }

      var entryDate = new Date(entry.date || 0);
      var latestDate = new Date(latest.date || 0);

      if (!isNaN(entryDate.getTime()) && entryDate > latestDate) {
        latest = entry;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return ((_latest = latest) === null || _latest === void 0 ? void 0 : _latest.description) || (data === null || data === void 0 ? void 0 : data.description) || "";
};

var getMachineField = function getMachineField(data, key) {
  var _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9, _ref10, _data$machineData$key, _data$machineData, _data$machineData2, _data$currentMachineD, _data$currentMachineD2, _data$TheMachine, _data$TheMachine2, _data$theMachineData, _data$theMachineData2;

  var lower = key.toLowerCase();
  return (_ref2 = (_ref3 = (_ref4 = (_ref5 = (_ref6 = (_ref7 = (_ref8 = (_ref9 = (_ref10 = (_data$machineData$key = data === null || data === void 0 ? void 0 : (_data$machineData = data.machineData) === null || _data$machineData === void 0 ? void 0 : _data$machineData[key]) !== null && _data$machineData$key !== void 0 ? _data$machineData$key : data === null || data === void 0 ? void 0 : (_data$machineData2 = data.machineData) === null || _data$machineData2 === void 0 ? void 0 : _data$machineData2[lower]) !== null && _ref10 !== void 0 ? _ref10 : data === null || data === void 0 ? void 0 : (_data$currentMachineD = data.currentMachineData) === null || _data$currentMachineD === void 0 ? void 0 : _data$currentMachineD[key]) !== null && _ref9 !== void 0 ? _ref9 : data === null || data === void 0 ? void 0 : (_data$currentMachineD2 = data.currentMachineData) === null || _data$currentMachineD2 === void 0 ? void 0 : _data$currentMachineD2[lower]) !== null && _ref8 !== void 0 ? _ref8 : data === null || data === void 0 ? void 0 : (_data$TheMachine = data.TheMachine) === null || _data$TheMachine === void 0 ? void 0 : _data$TheMachine[key]) !== null && _ref7 !== void 0 ? _ref7 : data === null || data === void 0 ? void 0 : (_data$TheMachine2 = data.TheMachine) === null || _data$TheMachine2 === void 0 ? void 0 : _data$TheMachine2[lower]) !== null && _ref6 !== void 0 ? _ref6 : data === null || data === void 0 ? void 0 : (_data$theMachineData = data.theMachineData) === null || _data$theMachineData === void 0 ? void 0 : _data$theMachineData[key]) !== null && _ref5 !== void 0 ? _ref5 : data === null || data === void 0 ? void 0 : (_data$theMachineData2 = data.theMachineData) === null || _data$theMachineData2 === void 0 ? void 0 : _data$theMachineData2[lower]) !== null && _ref4 !== void 0 ? _ref4 : data === null || data === void 0 ? void 0 : data[key]) !== null && _ref3 !== void 0 ? _ref3 : data === null || data === void 0 ? void 0 : data[lower]) !== null && _ref2 !== void 0 ? _ref2 : "";
};

var resolveClientName = /*#__PURE__*/function () {
  var _ref11 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee2(db, data, machineData) {
    var _data$machineData3, _data$currentMachineD3, _data$machineData4;

    var directClient, machineClientName, machineClient;
    return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(data !== null && data !== void 0 && data.clientName)) {
              _context2.next = 2;
              break;
            }

            return _context2.abrupt("return", data.clientName);

          case 2:
            if (!(typeof (data === null || data === void 0 ? void 0 : data.client) === "string")) {
              _context2.next = 4;
              break;
            }

            return _context2.abrupt("return", data.client);

          case 4:
            _context2.next = 6;
            return resolveDocData(db, "Client", data === null || data === void 0 ? void 0 : data.client);

          case 6:
            _context2.t3 = _context2.sent;

            if (_context2.t3) {
              _context2.next = 11;
              break;
            }

            _context2.next = 10;
            return resolveDocData(db, "Client", data === null || data === void 0 ? void 0 : data.ClientFrom);

          case 10:
            _context2.t3 = _context2.sent;

          case 11:
            _context2.t2 = _context2.t3;

            if (_context2.t2) {
              _context2.next = 16;
              break;
            }

            _context2.next = 15;
            return resolveDocData(db, "Client", data === null || data === void 0 ? void 0 : data.clientFromId);

          case 15:
            _context2.t2 = _context2.sent;

          case 16:
            _context2.t1 = _context2.t2;

            if (_context2.t1) {
              _context2.next = 21;
              break;
            }

            _context2.next = 20;
            return resolveDocData(db, "Client", data === null || data === void 0 ? void 0 : data.ClientCurrent);

          case 20:
            _context2.t1 = _context2.sent;

          case 21:
            _context2.t0 = _context2.t1;

            if (_context2.t0) {
              _context2.next = 26;
              break;
            }

            _context2.next = 25;
            return resolveDocData(db, "Client", data === null || data === void 0 ? void 0 : data.clientCurrentId);

          case 25:
            _context2.t0 = _context2.sent;

          case 26:
            directClient = _context2.t0;

            if (!(directClient !== null && directClient !== void 0 && directClient.name)) {
              _context2.next = 29;
              break;
            }

            return _context2.abrupt("return", directClient.name);

          case 29:
            machineClientName = (data === null || data === void 0 ? void 0 : (_data$machineData3 = data.machineData) === null || _data$machineData3 === void 0 ? void 0 : _data$machineData3.Client) || (data === null || data === void 0 ? void 0 : (_data$currentMachineD3 = data.currentMachineData) === null || _data$currentMachineD3 === void 0 ? void 0 : _data$currentMachineD3.Client) || (machineData === null || machineData === void 0 ? void 0 : machineData.Client) || "";

            if (!machineClientName) {
              _context2.next = 32;
              break;
            }

            return _context2.abrupt("return", machineClientName);

          case 32:
            _context2.next = 34;
            return resolveDocData(db, "Client", machineData === null || machineData === void 0 ? void 0 : machineData.client);

          case 34:
            _context2.t4 = _context2.sent;

            if (_context2.t4) {
              _context2.next = 39;
              break;
            }

            _context2.next = 38;
            return resolveDocData(db, "Client", data === null || data === void 0 ? void 0 : (_data$machineData4 = data.machineData) === null || _data$machineData4 === void 0 ? void 0 : _data$machineData4.client);

          case 38:
            _context2.t4 = _context2.sent;

          case 39:
            machineClient = _context2.t4;

            if (!(machineClient !== null && machineClient !== void 0 && machineClient.name)) {
              _context2.next = 42;
              break;
            }

            return _context2.abrupt("return", machineClient.name);

          case 42:
            return _context2.abrupt("return", "");

          case 43:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function resolveClientName(_x4, _x5, _x6) {
    return _ref11.apply(this, arguments);
  };
}();

var resolvePartForPrint = /*#__PURE__*/function () {
  var _ref12 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee3(db, part) {
    var data, _data, _data2, _data3, _data4, _data5, _data6, _data7, _data8, _data9, _data10, _data11, _data12, _data13, _data14, _data15, _data16, _data17, _data18, _data19, _data20, _data21, _data22, _data23, _data24, _data25, _data26, _data27, _data28, _data29, _data30, _data31, _data32, _data33, _data34, _data35, _data36, _data37, _data38, hasArrival, hasPo, hasDescriptions, hasMachineSource, hasClientSource, needsPartDoc, partDoc, machineRef, machineData, needsMachineData, machineDoc, arrivalRaw, arrivalDate, description, poNumber, localSn, OEM, modality, model, client, _data39, _data40, _data41, _data42, _data43, _data44, _data45, _data46, _data47, _data48;

    return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (part) {
              _context3.next = 2;
              break;
            }

            return _context3.abrupt("return", null);

          case 2:
            data = part;
            _context3.prev = 3;
            hasArrival = Boolean(((_data = data) === null || _data === void 0 ? void 0 : _data.arrival_date) || ((_data2 = data) === null || _data2 === void 0 ? void 0 : _data2.arrivalDate) || ((_data3 = data) === null || _data3 === void 0 ? void 0 : _data3.date));
            hasPo = Boolean(((_data4 = data) === null || _data4 === void 0 ? void 0 : _data4.poNumber) || ((_data5 = data) === null || _data5 === void 0 ? void 0 : _data5.po_number) || ((_data6 = data) === null || _data6 === void 0 ? void 0 : _data6.po));
            hasDescriptions = Boolean(((_data7 = data) === null || _data7 === void 0 ? void 0 : _data7.description) || Array.isArray((_data8 = data) === null || _data8 === void 0 ? void 0 : _data8.descriptions) && data.descriptions.length);
            hasMachineSource = Boolean(((_data9 = data) === null || _data9 === void 0 ? void 0 : _data9.TheMachine) || ((_data10 = data) === null || _data10 === void 0 ? void 0 : _data10.machineData) || ((_data11 = data) === null || _data11 === void 0 ? void 0 : _data11.Machine) || ((_data12 = data) === null || _data12 === void 0 ? void 0 : _data12.MachineFrom) || ((_data13 = data) === null || _data13 === void 0 ? void 0 : _data13.CurrentMachine) || ((_data14 = data) === null || _data14 === void 0 ? void 0 : _data14.MachineCurrent));
            hasClientSource = Boolean(((_data15 = data) === null || _data15 === void 0 ? void 0 : _data15.clientName) || ((_data16 = data) === null || _data16 === void 0 ? void 0 : _data16.client) || ((_data17 = data) === null || _data17 === void 0 ? void 0 : _data17.ClientFrom) || ((_data18 = data) === null || _data18 === void 0 ? void 0 : _data18.clientFromId));
            needsPartDoc = ((_data19 = data) === null || _data19 === void 0 ? void 0 : _data19.id) && (!hasArrival || !hasPo || !hasDescriptions || !hasMachineSource || !hasClientSource);

            if (!needsPartDoc) {
              _context3.next = 15;
              break;
            }

            _context3.next = 13;
            return resolveDocData(db, "Test", data.id);

          case 13:
            partDoc = _context3.sent;

            if (partDoc) {
              data = _objectSpread(_objectSpread({}, data), partDoc);
            }

          case 15:
            machineRef = ((_data20 = data) === null || _data20 === void 0 ? void 0 : _data20.MachineFrom) || ((_data21 = data) === null || _data21 === void 0 ? void 0 : _data21.Machine) || ((_data22 = data) === null || _data22 === void 0 ? void 0 : _data22.CurrentMachine) || ((_data23 = data) === null || _data23 === void 0 ? void 0 : _data23.MachineCurrent);
            machineData = ((_data24 = data) === null || _data24 === void 0 ? void 0 : _data24.TheMachine) || ((_data25 = data) === null || _data25 === void 0 ? void 0 : _data25.machineData) || null;
            needsMachineData = !(getMachineField(_objectSpread(_objectSpread({}, data), {}, {
              machineData: machineData
            }), "OEM") || getMachineField(_objectSpread(_objectSpread({}, data), {}, {
              machineData: machineData
            }), "Modality") || getMachineField(_objectSpread(_objectSpread({}, data), {}, {
              machineData: machineData
            }), "Model"));

            if (!(needsMachineData && machineRef)) {
              _context3.next = 23;
              break;
            }

            _context3.next = 21;
            return resolveDocData(db, "Machine", machineRef);

          case 21:
            machineDoc = _context3.sent;

            if (machineDoc) {
              machineData = machineDoc;
              data = _objectSpread(_objectSpread({}, data), {}, {
                machineData: machineDoc
              });
            }

          case 23:
            arrivalRaw = ((_data26 = data) === null || _data26 === void 0 ? void 0 : _data26.arrival_date) || ((_data27 = data) === null || _data27 === void 0 ? void 0 : _data27.arrivalDate) || ((_data28 = data) === null || _data28 === void 0 ? void 0 : _data28.date) || ((_data29 = data) === null || _data29 === void 0 ? void 0 : _data29.arrival) || "";
            arrivalDate = formatDateForPrint(arrivalRaw);
            description = pickLatestDescription(data);
            poNumber = ((_data30 = data) === null || _data30 === void 0 ? void 0 : _data30.poNumber) || ((_data31 = data) === null || _data31 === void 0 ? void 0 : _data31.po_number) || ((_data32 = data) === null || _data32 === void 0 ? void 0 : _data32.po) || "";
            localSn = ((_data33 = data) === null || _data33 === void 0 ? void 0 : _data33.local_sn) || ((_data34 = data) === null || _data34 === void 0 ? void 0 : _data34.localSN) || ((_data35 = data) === null || _data35 === void 0 ? void 0 : _data35.localsn) || ((_data36 = data) === null || _data36 === void 0 ? void 0 : _data36.id) || "";
            OEM = getMachineField(data, "OEM");
            modality = getMachineField(data, "Modality");
            model = getMachineField(data, "Model");
            _context3.next = 33;
            return resolveClientName(db, data, machineData);

          case 33:
            client = _context3.sent;
            return _context3.abrupt("return", {
              name: ((_data37 = data) === null || _data37 === void 0 ? void 0 : _data37.name) || ((_data38 = data) === null || _data38 === void 0 ? void 0 : _data38.itemName) || "",
              arrival_date: arrivalDate,
              poNumber: poNumber || "",
              OEM: OEM || "",
              modality: modality || "",
              model: model || "",
              local_sn: localSn || "",
              client: client || "",
              description: description || ""
            });

          case 37:
            _context3.prev = 37;
            _context3.t0 = _context3["catch"](3);
            console.error("Error preparing item for print:", _context3.t0);
            return _context3.abrupt("return", {
              name: ((_data39 = data) === null || _data39 === void 0 ? void 0 : _data39.name) || ((_data40 = data) === null || _data40 === void 0 ? void 0 : _data40.itemName) || "",
              arrival_date: formatDateForPrint(((_data41 = data) === null || _data41 === void 0 ? void 0 : _data41.arrival_date) || ((_data42 = data) === null || _data42 === void 0 ? void 0 : _data42.date) || ""),
              poNumber: ((_data43 = data) === null || _data43 === void 0 ? void 0 : _data43.poNumber) || "",
              OEM: "",
              modality: "",
              model: "",
              local_sn: ((_data44 = data) === null || _data44 === void 0 ? void 0 : _data44.local_sn) || ((_data45 = data) === null || _data45 === void 0 ? void 0 : _data45.localSN) || ((_data46 = data) === null || _data46 === void 0 ? void 0 : _data46.id) || "",
              client: ((_data47 = data) === null || _data47 === void 0 ? void 0 : _data47.clientName) || "",
              description: ((_data48 = data) === null || _data48 === void 0 ? void 0 : _data48.description) || ""
            });

          case 41:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[3, 37]]);
  }));

  return function resolvePartForPrint(_x7, _x8) {
    return _ref12.apply(this, arguments);
  };
}();

var Machine = function Machine(_ref13) {
  var initialMachine = _ref13.initialMachine,
      initialAssociatedParts = _ref13.initialAssociatedParts,
      initialError = _ref13.error;
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
    var _ref14 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee4(machineId) {
      var db, machineDoc, machineData;
      return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              console.log("Attempting to fetch machine data for ID: ".concat(machineId));
              db = _context_Firebase__WEBPACK_IMPORTED_MODULE_11__[/* default */ "b"].firestore();
              _context4.next = 5;
              return db.collection("Machine").doc(machineId).get();

            case 5:
              machineDoc = _context4.sent;

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

              _context4.next = 13;
              break;

            case 9:
              _context4.prev = 9;
              _context4.t0 = _context4["catch"](0);
              console.error("Error fetching machine data:", _context4.t0);
              setError("Error fetching machine data");

            case 13:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 9]]);
    }));

    return function fetchMachineData(_x9) {
      return _ref14.apply(this, arguments);
    };
  }();

  var fetchAssociatedParts = /*#__PURE__*/function () {
    var _ref15 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee6(associatedPartsRefs) {
      var db, partsDocs, partsData;
      return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              db = _context_Firebase__WEBPACK_IMPORTED_MODULE_11__[/* default */ "b"].firestore();
              _context6.next = 4;
              return Promise.all(associatedPartsRefs.map(function (ref) {
                return ref.get();
              }));

            case 4:
              partsDocs = _context6.sent;
              _context6.next = 7;
              return Promise.all(partsDocs.map( /*#__PURE__*/function () {
                var _ref16 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee5(doc) {
                  var _data$ClientFrom, _data$client;

                  var data, clientName, clientDoc, _clientDoc, _clientDoc2;

                  return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee5$(_context5) {
                    while (1) {
                      switch (_context5.prev = _context5.next) {
                        case 0:
                          if (doc.exists) {
                            _context5.next = 2;
                            break;
                          }

                          return _context5.abrupt("return", null);

                        case 2:
                          data = doc.data() || {};
                          clientName = "";

                          if (!data.clientName) {
                            _context5.next = 8;
                            break;
                          }

                          clientName = data.clientName;
                          _context5.next = 31;
                          break;

                        case 8:
                          if (!((_data$ClientFrom = data.ClientFrom) !== null && _data$ClientFrom !== void 0 && _data$ClientFrom.get)) {
                            _context5.next = 15;
                            break;
                          }

                          _context5.next = 11;
                          return data.ClientFrom.get();

                        case 11:
                          clientDoc = _context5.sent;
                          clientName = clientDoc.exists ? clientDoc.data().name : "";
                          _context5.next = 31;
                          break;

                        case 15:
                          if (!(typeof data.clientFromId === "string")) {
                            _context5.next = 22;
                            break;
                          }

                          _context5.next = 18;
                          return db.collection("Client").doc(data.clientFromId).get();

                        case 18:
                          _clientDoc = _context5.sent;
                          clientName = _clientDoc.exists ? _clientDoc.data().name : "";
                          _context5.next = 31;
                          break;

                        case 22:
                          if (!(typeof data.client === "string")) {
                            _context5.next = 26;
                            break;
                          }

                          clientName = data.client;
                          _context5.next = 31;
                          break;

                        case 26:
                          if (!((_data$client = data.client) !== null && _data$client !== void 0 && _data$client.get)) {
                            _context5.next = 31;
                            break;
                          }

                          _context5.next = 29;
                          return data.client.get();

                        case 29:
                          _clientDoc2 = _context5.sent;
                          clientName = _clientDoc2.exists ? _clientDoc2.data().name : "";

                        case 31:
                          return _context5.abrupt("return", _objectSpread(_objectSpread({
                            id: doc.id
                          }, data), {}, {
                            clientName: clientName
                          }));

                        case 32:
                        case "end":
                          return _context5.stop();
                      }
                    }
                  }, _callee5);
                }));

                return function (_x11) {
                  return _ref16.apply(this, arguments);
                };
              }()));

            case 7:
              partsData = _context6.sent;
              setAssociatedParts(partsData.filter(function (p) {
                return p;
              }));
              setError(null);
              console.log("Associated parts data:", partsData);
              _context6.next = 17;
              break;

            case 13:
              _context6.prev = 13;
              _context6.t0 = _context6["catch"](0);
              console.error("Error fetching associated parts:", _context6.t0);
              setError("Error fetching associated parts");

            case 17:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[0, 13]]);
    }));

    return function fetchAssociatedParts(_x10) {
      return _ref15.apply(this, arguments);
    };
  }();

  var handlePrintMulti = /*#__PURE__*/function () {
    var _ref17 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee7() {
      var db, resolvedItems, payload, response, result;
      return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              setIsPrinting(true);
              db = _context_Firebase__WEBPACK_IMPORTED_MODULE_11__[/* default */ "b"].firestore();
              _context7.next = 4;
              return Promise.all(associatedParts.map(function (part) {
                return resolvePartForPrint(db, part);
              }));

            case 4:
              resolvedItems = _context7.sent;
              payload = {
                items: resolvedItems.filter(Boolean),
                test_print: true,
                // Hard-coded here if you want to test printing one item
                index: 1 // Hard-coded index (1-based)

              };
              _context7.prev = 6;

              if (payload.items.length) {
                _context7.next = 9;
                break;
              }

              throw new Error("No items available to print.");

            case 9:
              _context7.next = 11;
              return fetch("https://9d70-174-76-22-138.ngrok-free.app/print_multi", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
              });

            case 11:
              response = _context7.sent;
              _context7.next = 14;
              return response.json();

            case 14:
              result = _context7.sent;
              console.log("Print multi result:", result.status);

              if (!(!response.ok || (result === null || result === void 0 ? void 0 : result.status) === "error")) {
                _context7.next = 18;
                break;
              }

              throw new Error((result === null || result === void 0 ? void 0 : result.message) || "Print failed.");

            case 18:
              setShowPrintSuccess(true);
              _context7.next = 25;
              break;

            case 21:
              _context7.prev = 21;
              _context7.t0 = _context7["catch"](6);
              console.error("Error printing multiple labels:", _context7.t0);
              setError((_context7.t0 === null || _context7.t0 === void 0 ? void 0 : _context7.t0.message) || "Error printing multiple labels");

            case 25:
              _context7.prev = 25;
              setIsPrinting(false);
              return _context7.finish(25);

            case 28:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, null, [[6, 21, 25, 28]]);
    }));

    return function handlePrintMulti() {
      return _ref17.apply(this, arguments);
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