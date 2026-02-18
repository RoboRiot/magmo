(window["webpackJsonp_N_E"] = window["webpackJsonp_N_E"] || []).push([[12],{

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

/***/ "qoNY":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return fetchPartsWithMachineData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return fetchPartsWithMachineDataPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return fetchClients; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return fetchModels; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return formatDate; });
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cpVT");
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("xvhg");
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("z7pX");
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("vJKn");
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("rg98");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _context_Firebase__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("NY6m");






function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }



function fetchPartsWithMachineData() {
  return _fetchPartsWithMachineData.apply(this, arguments);
} // Paginated version for faster list views (e.g., mainSearch).
// Uses documentId order for stable pagination.

function _fetchPartsWithMachineData() {
  _fetchPartsWithMachineData = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.mark(function _callee3() {
    var db, partsSnapshot, parts;
    return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            db = _context_Firebase__WEBPACK_IMPORTED_MODULE_6__[/* default */ "b"].firestore();
            _context3.next = 3;
            return db.collection("Test").get();

          case 3:
            partsSnapshot = _context3.sent;
            _context3.next = 6;
            return Promise.all(partsSnapshot.docs.map( /*#__PURE__*/function () {
              var _ref2 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.mark(function _callee2(partDoc) {
                var _ref3, _getRefId, _ref4, _getRefId2;

                var partData, getRefId, fetchMachineData, machineRef, currentMachineRef, machineData, clientRef, clientId, clientDoc, currentMachineData, _clientRef, _clientId, _clientDoc;

                return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        partData = partDoc.data();
                        partData.id = partDoc.id; // Add document ID here

                        getRefId = function getRefId(ref) {
                          if (!ref) return null;
                          if (typeof ref === "string") return ref;
                          if (ref instanceof _context_Firebase__WEBPACK_IMPORTED_MODULE_6__[/* default */ "b"].firestore.DocumentReference) return ref.id;
                          if (ref.id) return ref.id;
                          return null;
                        };

                        partData.clientFromId = (_ref3 = (_getRefId = getRefId(partData === null || partData === void 0 ? void 0 : partData.ClientFrom)) !== null && _getRefId !== void 0 ? _getRefId : partData === null || partData === void 0 ? void 0 : partData.clientFromId) !== null && _ref3 !== void 0 ? _ref3 : null;
                        partData.clientCurrentId = (_ref4 = (_getRefId2 = getRefId(partData === null || partData === void 0 ? void 0 : partData.ClientCurrent)) !== null && _getRefId2 !== void 0 ? _getRefId2 : partData === null || partData === void 0 ? void 0 : partData.clientCurrentId) !== null && _ref4 !== void 0 ? _ref4 : null; // console.log(partData);

                        fetchMachineData = /*#__PURE__*/function () {
                          var _ref5 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.mark(function _callee(ref) {
                            var doc, _doc, _doc2;

                            return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.wrap(function _callee$(_context) {
                              while (1) {
                                switch (_context.prev = _context.next) {
                                  case 0:
                                    if (ref) {
                                      _context.next = 2;
                                      break;
                                    }

                                    return _context.abrupt("return", null);

                                  case 2:
                                    if (!(typeof ref.get === "function")) {
                                      _context.next = 7;
                                      break;
                                    }

                                    _context.next = 5;
                                    return ref.get();

                                  case 5:
                                    doc = _context.sent;
                                    return _context.abrupt("return", doc.exists ? doc.data() : null);

                                  case 7:
                                    if (!(typeof ref === "string")) {
                                      _context.next = 12;
                                      break;
                                    }

                                    _context.next = 10;
                                    return db.collection("Machine").doc(ref).get();

                                  case 10:
                                    _doc = _context.sent;
                                    return _context.abrupt("return", _doc.exists ? _doc.data() : null);

                                  case 12:
                                    if (!(ref !== null && ref !== void 0 && ref.id)) {
                                      _context.next = 17;
                                      break;
                                    }

                                    _context.next = 15;
                                    return db.collection("Machine").doc(ref.id).get();

                                  case 15:
                                    _doc2 = _context.sent;
                                    return _context.abrupt("return", _doc2.exists ? _doc2.data() : null);

                                  case 17:
                                    return _context.abrupt("return", null);

                                  case 18:
                                  case "end":
                                    return _context.stop();
                                }
                              }
                            }, _callee);
                          }));

                          return function fetchMachineData(_x7) {
                            return _ref5.apply(this, arguments);
                          };
                        }();

                        machineRef = partData.Machine || partData.MachineFrom;
                        currentMachineRef = partData.CurrentMachine || partData.MachineCurrent;
                        _context2.next = 10;
                        return fetchMachineData(machineRef);

                      case 10:
                        machineData = _context2.sent;
                        partData.machineData = machineData || {};

                        if (!(machineData !== null && machineData !== void 0 && machineData.client)) {
                          _context2.next = 21;
                          break;
                        }

                        clientRef = machineData.client;
                        clientId = getRefId(clientRef);

                        if (clientId && !partData.clientFromId) {
                          partData.clientFromId = clientId;
                        }

                        if (!(typeof (clientRef === null || clientRef === void 0 ? void 0 : clientRef.get) === "function")) {
                          _context2.next = 21;
                          break;
                        }

                        _context2.next = 19;
                        return clientRef.get();

                      case 19:
                        clientDoc = _context2.sent;
                        partData.machineData.Client = clientDoc.exists ? clientDoc.data().name : "";

                      case 21:
                        _context2.next = 23;
                        return fetchMachineData(currentMachineRef);

                      case 23:
                        currentMachineData = _context2.sent;
                        partData.currentMachineData = currentMachineData || {};

                        if (!(currentMachineData !== null && currentMachineData !== void 0 && currentMachineData.client)) {
                          _context2.next = 34;
                          break;
                        }

                        _clientRef = currentMachineData.client;
                        _clientId = getRefId(_clientRef);

                        if (_clientId && !partData.clientCurrentId) {
                          partData.clientCurrentId = _clientId;
                        }

                        if (!(typeof (_clientRef === null || _clientRef === void 0 ? void 0 : _clientRef.get) === "function")) {
                          _context2.next = 34;
                          break;
                        }

                        _context2.next = 32;
                        return _clientRef.get();

                      case 32:
                        _clientDoc = _context2.sent;
                        partData.currentMachineData.Client = _clientDoc.exists ? _clientDoc.data().name : "";

                      case 34:
                        return _context2.abrupt("return", partData);

                      case 35:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function (_x6) {
                return _ref2.apply(this, arguments);
              };
            }()));

          case 6:
            parts = _context3.sent;
            return _context3.abrupt("return", parts);

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _fetchPartsWithMachineData.apply(this, arguments);
}

function fetchPartsWithMachineDataPage() {
  return _fetchPartsWithMachineDataPage.apply(this, arguments);
}

function _fetchPartsWithMachineDataPage() {
  _fetchPartsWithMachineDataPage = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.mark(function _callee6() {
    var _ref,
        _ref$pageSize,
        pageSize,
        _ref$startAfterDoc,
        startAfterDoc,
        _ref$visibleOnly,
        visibleOnly,
        _ref$filterFn,
        filterFn,
        _ref$needsMachineData,
        needsMachineData,
        _ref$search,
        search,
        db,
        limit,
        getRefId,
        MACHINE_SELECT_FIELDS,
        withMachineSelect,
        buildPart,
        searchRaw,
        searchLower,
        searchType,
        hasSearch,
        toTitleCase,
        buildSearchQuery,
        _buildSearchQuery,
        searchMode,
        searchQuery,
        searchFallback,
        docs,
        rawUpper,
        doc,
        localValues,
        localSnap,
        machineMap,
        currentMachineMap,
        machineIds,
        currentMachineIds,
        _iterator,
        _step,
        docSnap,
        raw,
        machineId,
        currentMachineId,
        fetchMachineMap,
        _yield$Promise$all,
        _yield$Promise$all2,
        built,
        parts,
        cursor,
        lastDoc,
        pageLastDoc,
        hasNextPage,
        filled,
        usedFallback,
        scanBaseQuery,
        query,
        snap,
        batchDocs,
        _machineMap,
        _currentMachineMap,
        _machineIds,
        _currentMachineIds,
        _iterator2,
        _step2,
        _doc3,
        _raw,
        _machineId,
        _currentMachineId,
        _fetchMachineMap,
        _yield$Promise$all3,
        _yield$Promise$all4,
        i,
        _doc4,
        _raw2,
        _built,
        _args6 = arguments;

    return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _ref = _args6.length > 0 && _args6[0] !== undefined ? _args6[0] : {}, _ref$pageSize = _ref.pageSize, pageSize = _ref$pageSize === void 0 ? 25 : _ref$pageSize, _ref$startAfterDoc = _ref.startAfterDoc, startAfterDoc = _ref$startAfterDoc === void 0 ? null : _ref$startAfterDoc, _ref$visibleOnly = _ref.visibleOnly, visibleOnly = _ref$visibleOnly === void 0 ? false : _ref$visibleOnly, _ref$filterFn = _ref.filterFn, filterFn = _ref$filterFn === void 0 ? null : _ref$filterFn, _ref$needsMachineData = _ref.needsMachineData, needsMachineData = _ref$needsMachineData === void 0 ? true : _ref$needsMachineData, _ref$search = _ref.search, search = _ref$search === void 0 ? null : _ref$search;
            db = _context_Firebase__WEBPACK_IMPORTED_MODULE_6__[/* default */ "b"].firestore();
            limit = pageSize + 1;

            getRefId = function getRefId(ref) {
              if (!ref) return null;
              if (typeof ref === "string") return ref;
              if (ref instanceof _context_Firebase__WEBPACK_IMPORTED_MODULE_6__[/* default */ "b"].firestore.DocumentReference) return ref.id;
              if (ref.id) return ref.id;
              return null;
            };

            MACHINE_SELECT_FIELDS = ["OEM", "Modality", "Model", "client", "name"];

            withMachineSelect = function withMachineSelect(query) {
              return typeof query.select === "function" ? query.select.apply(query, MACHINE_SELECT_FIELDS) : query;
            };

            buildPart = function buildPart(partDoc, machineMap, currentMachineMap) {
              var _ref6, _getRefId3, _ref7, _getRefId4;

              var partData = partDoc.data();
              partData.id = partDoc.id; // Add document ID here

              partData.clientFromId = (_ref6 = (_getRefId3 = getRefId(partData === null || partData === void 0 ? void 0 : partData.ClientFrom)) !== null && _getRefId3 !== void 0 ? _getRefId3 : partData === null || partData === void 0 ? void 0 : partData.clientFromId) !== null && _ref6 !== void 0 ? _ref6 : null;
              partData.clientCurrentId = (_ref7 = (_getRefId4 = getRefId(partData === null || partData === void 0 ? void 0 : partData.ClientCurrent)) !== null && _getRefId4 !== void 0 ? _getRefId4 : partData === null || partData === void 0 ? void 0 : partData.clientCurrentId) !== null && _ref7 !== void 0 ? _ref7 : null;
              var machineRef = partData.Machine || partData.MachineFrom;
              var currentMachineRef = partData.CurrentMachine || partData.MachineCurrent;
              var machineId = getRefId(machineRef);
              var currentMachineId = getRefId(currentMachineRef);
              var machineData = machineId ? machineMap[machineId] : null;
              var currentMachineData = currentMachineId ? currentMachineMap[currentMachineId] : null;
              partData.machineData = machineData || {};
              partData.currentMachineData = currentMachineData || {};

              if (!partData.clientFromId && machineData !== null && machineData !== void 0 && machineData.client) {
                partData.clientFromId = getRefId(machineData.client);
              }

              if (!partData.clientCurrentId && currentMachineData !== null && currentMachineData !== void 0 && currentMachineData.client) {
                partData.clientCurrentId = getRefId(currentMachineData.client);
              }

              return partData;
            };

            searchRaw = ((search === null || search === void 0 ? void 0 : search.raw) || "").toString().trim();
            searchLower = ((search === null || search === void 0 ? void 0 : search.lower) || "").toString().trim();
            searchType = (search === null || search === void 0 ? void 0 : search.type) || null;
            hasSearch = Boolean(searchRaw);

            toTitleCase = function toTitleCase(text) {
              return text.split(" ").filter(Boolean).map(function (word) {
                return word.charAt(0).toUpperCase() + word.slice(1);
              }).join(" ");
            };

            buildSearchQuery = function buildSearchQuery() {
              if (!hasSearch || !searchType) return {
                mode: "scan",
                query: null
              };
              var col = db.collection("Test");

              switch (searchType) {
                case "SKU":
                  return {
                    mode: "sku",
                    query: null
                  };

                case "Name":
                  {
                    var titleFallback = searchRaw && searchRaw === searchRaw.toLowerCase() ? toTitleCase(searchRaw) : null;
                    var terms = searchLower ? searchLower.split(/\s+/).filter(Boolean) : [];

                    var tokens = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(terms);

                    if (searchLower && !tokens.includes(searchLower)) tokens.push(searchLower);
                    if (!tokens.length) return {
                      mode: "scan",
                      query: null
                    };

                    var prefixQuery = function prefixQuery(value) {
                      return col.orderBy("name").startAt(value).endAt("".concat(value, "\uF8FF"));
                    };

                    return {
                      mode: "query",
                      query: tokens.length === 1 ? col.where("nameTokens", "array-contains", tokens[0]) : col.where("nameTokens", "array-contains-any", tokens.slice(0, 10)),
                      fallback: titleFallback ? function () {
                        return prefixQuery(titleFallback);
                      } : function () {
                        return prefixQuery(searchRaw);
                      }
                    };
                  }

                case "Product Number":
                  return {
                    mode: "query",
                    query: col.where("pn", "array-contains", searchRaw),
                    fallback: function fallback() {
                      return col.where("pn", "==", searchRaw);
                    }
                  };

                case "Serial Number":
                  return {
                    mode: "query",
                    query: col.where("sn", "array-contains", searchRaw),
                    fallback: function fallback() {
                      return col.where("sn", "==", searchRaw);
                    }
                  };

                case "Date":
                  {
                    var asDate = function () {
                      try {
                        var d = new Date(searchRaw);
                        return isNaN(d.getTime()) ? null : d;
                      } catch (_unused) {
                        return null;
                      }
                    }();

                    return {
                      mode: "query",
                      query: col.where("date", "==", searchRaw),
                      fallback: asDate ? function () {
                        return col.where("date", "==", asDate);
                      } : null
                    };
                  }

                default:
                  return {
                    mode: "scan",
                    query: null
                  };
              }
            };

            _buildSearchQuery = buildSearchQuery(), searchMode = _buildSearchQuery.mode, searchQuery = _buildSearchQuery.query, searchFallback = _buildSearchQuery.fallback;

            if (!(searchMode === "sku" && hasSearch)) {
              _context6.next = 46;
              break;
            }

            docs = [];
            rawUpper = searchRaw.toUpperCase();
            _context6.next = 19;
            return db.collection("Test").doc(searchRaw).get();

          case 19:
            doc = _context6.sent;

            if (!(!doc.exists && rawUpper !== searchRaw)) {
              _context6.next = 24;
              break;
            }

            _context6.next = 23;
            return db.collection("Test").doc(rawUpper).get();

          case 23:
            doc = _context6.sent;

          case 24:
            if (doc.exists) docs.push(doc);
            localValues = rawUpper !== searchRaw ? [searchRaw, rawUpper] : [searchRaw];
            _context6.next = 28;
            return db.collection("Test").where("localSN", "in", localValues).limit(limit).get();

          case 28:
            localSnap = _context6.sent;
            localSnap.forEach(function (d) {
              if (!docs.find(function (existing) {
                return existing.id === d.id;
              })) {
                docs.push(d);
              }
            });
            machineMap = {};
            currentMachineMap = {};

            if (!(needsMachineData && docs.length)) {
              _context6.next = 44;
              break;
            }

            machineIds = new Set();
            currentMachineIds = new Set();
            _iterator = _createForOfIteratorHelper(docs);

            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                docSnap = _step.value;
                raw = docSnap.data();
                machineId = getRefId(raw.Machine || raw.MachineFrom);
                currentMachineId = getRefId(raw.CurrentMachine || raw.MachineCurrent);
                if (machineId) machineIds.add(machineId);
                if (currentMachineId) currentMachineIds.add(currentMachineId);
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }

            fetchMachineMap = /*#__PURE__*/function () {
              var _ref8 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.mark(function _callee4(ids) {
                var out, chunks, i, _i, _chunks, chunk, snap;

                return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        if (ids.length) {
                          _context4.next = 2;
                          break;
                        }

                        return _context4.abrupt("return", {});

                      case 2:
                        out = {};
                        chunks = [];

                        for (i = 0; i < ids.length; i += 10) {
                          chunks.push(ids.slice(i, i + 10));
                        }

                        _i = 0, _chunks = chunks;

                      case 6:
                        if (!(_i < _chunks.length)) {
                          _context4.next = 15;
                          break;
                        }

                        chunk = _chunks[_i];
                        _context4.next = 10;
                        return withMachineSelect(db.collection("Machine").where(_context_Firebase__WEBPACK_IMPORTED_MODULE_6__[/* default */ "b"].firestore.FieldPath.documentId(), "in", chunk)).get();

                      case 10:
                        snap = _context4.sent;
                        snap.forEach(function (docSnap) {
                          out[docSnap.id] = docSnap.data() || {};
                        });

                      case 12:
                        _i++;
                        _context4.next = 6;
                        break;

                      case 15:
                        return _context4.abrupt("return", out);

                      case 16:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4);
              }));

              return function fetchMachineMap(_x8) {
                return _ref8.apply(this, arguments);
              };
            }();

            _context6.next = 40;
            return Promise.all([fetchMachineMap(Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(machineIds)), fetchMachineMap(Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(currentMachineIds))]);

          case 40:
            _yield$Promise$all = _context6.sent;
            _yield$Promise$all2 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(_yield$Promise$all, 2);
            machineMap = _yield$Promise$all2[0];
            currentMachineMap = _yield$Promise$all2[1];

          case 44:
            built = docs.map(function (docSnap) {
              return buildPart(docSnap, machineMap, currentMachineMap);
            }).filter(function (item) {
              return !visibleOnly || (item === null || item === void 0 ? void 0 : item.visible) !== false;
            }).filter(function (item) {
              return filterFn ? filterFn(item) : true;
            }).slice(0, pageSize);
            return _context6.abrupt("return", {
              parts: built,
              lastDoc: built.length ? docs[built.length - 1] : null,
              hasNextPage: false
            });

          case 46:
            parts = [];
            cursor = startAfterDoc || null;
            lastDoc = null;
            pageLastDoc = null;
            hasNextPage = false;
            filled = false;
            usedFallback = false;
            scanBaseQuery = db.collection("Test").orderBy(_context_Firebase__WEBPACK_IMPORTED_MODULE_6__[/* default */ "b"].firestore.FieldPath.documentId());

          case 54:
            if (false) {}

            query = searchQuery || scanBaseQuery;

            if (searchMode === "query" && usedFallback && searchFallback) {
              query = searchFallback();
            }

            if (cursor) query = query.startAfter(cursor);
            query = query.limit(limit);
            _context6.next = 61;
            return query.get();

          case 61:
            snap = _context6.sent;

            if (!snap.empty) {
              _context6.next = 68;
              break;
            }

            if (!(searchMode === "query" && searchFallback && !cursor && !usedFallback)) {
              _context6.next = 66;
              break;
            }

            usedFallback = true;
            return _context6.abrupt("continue", 54);

          case 66:
            hasNextPage = false;
            return _context6.abrupt("break", 128);

          case 68:
            batchDocs = snap.docs;
            _machineMap = {};
            _currentMachineMap = {};

            if (!needsMachineData) {
              _context6.next = 103;
              break;
            }

            _machineIds = new Set();
            _currentMachineIds = new Set();
            _iterator2 = _createForOfIteratorHelper(batchDocs);
            _context6.prev = 75;

            _iterator2.s();

          case 77:
            if ((_step2 = _iterator2.n()).done) {
              _context6.next = 88;
              break;
            }

            _doc3 = _step2.value;
            _raw = _doc3.data();

            if (!(visibleOnly && _raw.visible === false)) {
              _context6.next = 82;
              break;
            }

            return _context6.abrupt("continue", 86);

          case 82:
            _machineId = getRefId(_raw.Machine || _raw.MachineFrom);
            _currentMachineId = getRefId(_raw.CurrentMachine || _raw.MachineCurrent);
            if (_machineId) _machineIds.add(_machineId);
            if (_currentMachineId) _currentMachineIds.add(_currentMachineId);

          case 86:
            _context6.next = 77;
            break;

          case 88:
            _context6.next = 93;
            break;

          case 90:
            _context6.prev = 90;
            _context6.t0 = _context6["catch"](75);

            _iterator2.e(_context6.t0);

          case 93:
            _context6.prev = 93;

            _iterator2.f();

            return _context6.finish(93);

          case 96:
            _fetchMachineMap = /*#__PURE__*/function () {
              var _ref9 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.mark(function _callee5(ids) {
                var out, chunks, i, _i2, _chunks2, chunk, _snap;

                return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        if (ids.length) {
                          _context5.next = 2;
                          break;
                        }

                        return _context5.abrupt("return", {});

                      case 2:
                        out = {};
                        chunks = [];

                        for (i = 0; i < ids.length; i += 10) {
                          chunks.push(ids.slice(i, i + 10));
                        }

                        _i2 = 0, _chunks2 = chunks;

                      case 6:
                        if (!(_i2 < _chunks2.length)) {
                          _context5.next = 15;
                          break;
                        }

                        chunk = _chunks2[_i2];
                        _context5.next = 10;
                        return withMachineSelect(db.collection("Machine").where(_context_Firebase__WEBPACK_IMPORTED_MODULE_6__[/* default */ "b"].firestore.FieldPath.documentId(), "in", chunk)).get();

                      case 10:
                        _snap = _context5.sent;

                        _snap.forEach(function (doc) {
                          out[doc.id] = doc.data() || {};
                        });

                      case 12:
                        _i2++;
                        _context5.next = 6;
                        break;

                      case 15:
                        return _context5.abrupt("return", out);

                      case 16:
                      case "end":
                        return _context5.stop();
                    }
                  }
                }, _callee5);
              }));

              return function _fetchMachineMap(_x9) {
                return _ref9.apply(this, arguments);
              };
            }();

            _context6.next = 99;
            return Promise.all([_fetchMachineMap(Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(_machineIds)), _fetchMachineMap(Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(_currentMachineIds))]);

          case 99:
            _yield$Promise$all3 = _context6.sent;
            _yield$Promise$all4 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(_yield$Promise$all3, 2);
            _machineMap = _yield$Promise$all4[0];
            _currentMachineMap = _yield$Promise$all4[1];

          case 103:
            i = 0;

          case 104:
            if (!(i < snap.docs.length)) {
              _context6.next = 122;
              break;
            }

            _doc4 = batchDocs[i];
            cursor = _doc4;
            _raw2 = _doc4.data();

            if (!(visibleOnly && _raw2.visible === false)) {
              _context6.next = 110;
              break;
            }

            return _context6.abrupt("continue", 119);

          case 110:
            _built = buildPart(_doc4, _machineMap, _currentMachineMap);

            if (!(filterFn && !filterFn(_built))) {
              _context6.next = 113;
              break;
            }

            return _context6.abrupt("continue", 119);

          case 113:
            if (filled) {
              _context6.next = 117;
              break;
            }

            parts.push(_built);

            if (parts.length === pageSize) {
              filled = true;
              pageLastDoc = _doc4;
            }

            return _context6.abrupt("continue", 119);

          case 117:
            // We already filled the page and found an extra matching item.
            hasNextPage = true;
            return _context6.abrupt("return", {
              parts: parts,
              lastDoc: pageLastDoc,
              hasNextPage: hasNextPage
            });

          case 119:
            i++;
            _context6.next = 104;
            break;

          case 122:
            if (!(snap.size < limit)) {
              _context6.next = 125;
              break;
            }

            hasNextPage = false;
            return _context6.abrupt("break", 128);

          case 125:
            // There might be more docs; continue scanning for visible items.
            hasNextPage = true;
            _context6.next = 54;
            break;

          case 128:
            lastDoc = pageLastDoc || (parts.length ? cursor : null);
            return _context6.abrupt("return", {
              parts: parts,
              lastDoc: lastDoc,
              hasNextPage: filled ? hasNextPage : false
            });

          case 130:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[75, 90, 93, 96]]);
  }));
  return _fetchPartsWithMachineDataPage.apply(this, arguments);
}

function fetchClients(_x, _x2) {
  return _fetchClients.apply(this, arguments);
}

function _fetchClients() {
  _fetchClients = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.mark(function _callee7(selectedOEM, selectedModality) {
    var db, clientsSnapshot, clients, filteredClients, _iterator3, _step3, client, match, _iterator4, _step4, machineRef, machineDoc, machineData;

    return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            db = _context_Firebase__WEBPACK_IMPORTED_MODULE_6__[/* default */ "b"].firestore();
            _context7.next = 3;
            return db.collection("Client").get();

          case 3:
            clientsSnapshot = _context7.sent;
            clients = clientsSnapshot.docs.map(function (doc) {
              return _objectSpread({
                id: doc.id
              }, doc.data());
            }); // Filter clients based on OEM and Modality if selected

            if (!(selectedOEM || selectedModality)) {
              _context7.next = 51;
              break;
            }

            filteredClients = [];
            _iterator3 = _createForOfIteratorHelper(clients);
            _context7.prev = 8;

            _iterator3.s();

          case 10:
            if ((_step3 = _iterator3.n()).done) {
              _context7.next = 42;
              break;
            }

            client = _step3.value;
            match = true;

            if (!(selectedOEM || selectedModality)) {
              _context7.next = 39;
              break;
            }

            _iterator4 = _createForOfIteratorHelper(client.machines);
            _context7.prev = 15;

            _iterator4.s();

          case 17:
            if ((_step4 = _iterator4.n()).done) {
              _context7.next = 31;
              break;
            }

            machineRef = _step4.value;
            _context7.next = 21;
            return machineRef.get();

          case 21:
            machineDoc = _context7.sent;
            machineData = machineDoc.data();

            if (!(selectedOEM && machineData.OEM === selectedOEM || selectedModality && machineData.Modality === selectedModality)) {
              _context7.next = 28;
              break;
            }

            match = true;
            return _context7.abrupt("break", 31);

          case 28:
            match = false;

          case 29:
            _context7.next = 17;
            break;

          case 31:
            _context7.next = 36;
            break;

          case 33:
            _context7.prev = 33;
            _context7.t0 = _context7["catch"](15);

            _iterator4.e(_context7.t0);

          case 36:
            _context7.prev = 36;

            _iterator4.f();

            return _context7.finish(36);

          case 39:
            if (match) {
              filteredClients.push(client);
            }

          case 40:
            _context7.next = 10;
            break;

          case 42:
            _context7.next = 47;
            break;

          case 44:
            _context7.prev = 44;
            _context7.t1 = _context7["catch"](8);

            _iterator3.e(_context7.t1);

          case 47:
            _context7.prev = 47;

            _iterator3.f();

            return _context7.finish(47);

          case 50:
            return _context7.abrupt("return", filteredClients);

          case 51:
            return _context7.abrupt("return", clients);

          case 52:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[8, 44, 47, 50], [15, 33, 36, 39]]);
  }));
  return _fetchClients.apply(this, arguments);
}

function fetchModels(_x3, _x4, _x5) {
  return _fetchModels.apply(this, arguments);
}

function _fetchModels() {
  _fetchModels = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.mark(function _callee9(selectedOEM, selectedModality, selectedClient) {
    var db, machinesSnapshot, models;
    return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            db = _context_Firebase__WEBPACK_IMPORTED_MODULE_6__[/* default */ "b"].firestore();
            _context9.next = 3;
            return db.collection("Machine").get();

          case 3:
            machinesSnapshot = _context9.sent;
            models = new Set();
            _context9.next = 7;
            return Promise.all(machinesSnapshot.docs.map( /*#__PURE__*/function () {
              var _ref10 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.mark(function _callee8(machineDoc) {
                var machineData, isValid, _machineData$client, clientDoc, clientName, clientId;

                return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.wrap(function _callee8$(_context8) {
                  while (1) {
                    switch (_context8.prev = _context8.next) {
                      case 0:
                        machineData = machineDoc.data();
                        isValid = true;
                        if (selectedOEM && machineData.OEM !== selectedOEM) isValid = false;
                        if (selectedModality && machineData.Modality !== selectedModality) isValid = false;

                        if (!(selectedClient && machineData.client)) {
                          _context8.next = 17;
                          break;
                        }

                        clientDoc = null;

                        if (!(typeof ((_machineData$client = machineData.client) === null || _machineData$client === void 0 ? void 0 : _machineData$client.get) === "function")) {
                          _context8.next = 12;
                          break;
                        }

                        _context8.next = 9;
                        return machineData.client.get();

                      case 9:
                        clientDoc = _context8.sent;
                        _context8.next = 16;
                        break;

                      case 12:
                        if (!(typeof machineData.client === "string")) {
                          _context8.next = 16;
                          break;
                        }

                        _context8.next = 15;
                        return db.collection("Client").doc(machineData.client).get();

                      case 15:
                        clientDoc = _context8.sent;

                      case 16:
                        if (!clientDoc || !clientDoc.exists) {
                          isValid = false;
                        } else {
                          clientName = clientDoc.data().name;
                          clientId = clientDoc.id;

                          if (selectedClient !== clientName && selectedClient !== clientId) {
                            isValid = false;
                          }
                        }

                      case 17:
                        if (isValid) {
                          models.add(machineData.Model);
                        }

                      case 18:
                      case "end":
                        return _context8.stop();
                    }
                  }
                }, _callee8);
              }));

              return function (_x10) {
                return _ref10.apply(this, arguments);
              };
            }()));

          case 7:
            return _context9.abrupt("return", Array.from(models));

          case 8:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
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
    return ""; // handle unexpected formats
  }

  var day = String(date.getDate()).padStart(2, "0");
  var month = String(date.getMonth() + 1).padStart(2, "0");
  var year = date.getFullYear();
  return "".concat(month, "/").concat(day, "/").concat(year);
}

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

}]);