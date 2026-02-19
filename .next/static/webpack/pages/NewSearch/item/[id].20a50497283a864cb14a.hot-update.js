webpackHotUpdate_N_E("pages/NewSearch/item/[id]",{

/***/ "./utils/trackerCatalog.js":
/*!*********************************!*\
  !*** ./utils/trackerCatalog.js ***!
  \*********************************/
/*! exports provided: fetchTrackerCatalog, buildAllOems, buildModelsForSelection, syncTrackerFromSelections, deleteTrackerOem, deleteTrackerModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchTrackerCatalog", function() { return fetchTrackerCatalog; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildAllOems", function() { return buildAllOems; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildModelsForSelection", function() { return buildModelsForSelection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "syncTrackerFromSelections", function() { return syncTrackerFromSelections; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteTrackerOem", function() { return deleteTrackerOem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteTrackerModel", function() { return deleteTrackerModel; });
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/next/node_modules/@babel/runtime/regenerator */ "./node_modules/next/node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty */ "./node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator */ "./node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/next/node_modules/@babel/runtime/helpers/esm/toConsumableArray */ "./node_modules/next/node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray */ "./node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _context_Firebase__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../context/Firebase */ "./context/Firebase.js");






function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }


var OEM_FIELD_CANDIDATES = ["oems", "OEMs", "oem", "OEM"];
var MODEL_FIELD_CANDIDATES = ["models", "Models", "model", "Model", "list", "items"];
var DEFAULT_OEM_FIELD = "oems";

var isPlainObject = function isPlainObject(value) {
  return value != null && typeof value === "object" && !Array.isArray(value) && !(value instanceof Date);
};

var normalizeKey = function normalizeKey(value) {
  if (value == null) return "";
  return String(value).trim().toLowerCase();
};

var hasUpper = function hasUpper(value) {
  return /[A-Z]/.test(String(value || ""));
};

var pickPreferredCase = function pickPreferredCase(current, incoming) {
  if (!current) return incoming;
  if (!incoming) return current;
  var currentUpper = hasUpper(current);
  var incomingUpper = hasUpper(incoming);
  if (incomingUpper && !currentUpper) return incoming;
  if (currentUpper && !incomingUpper) return current;
  return current;
};

var normalizeArray = function normalizeArray(value) {
  if (Array.isArray(value)) return value;
  if (value == null || value === "") return [];
  return [value];
};

var normalizeList = function normalizeList(values) {
  var out = [];
  (values || []).forEach(function (value) {
    if (value == null) return;
    var normalized = String(value).trim();
    if (!normalized) return;
    if (normalizeKey(normalized) === "nan") return;
    out.push(normalized);
  });
  return Array.from(new Set(out));
};

var normalizeListCaseInsensitive = function normalizeListCaseInsensitive(values) {
  var map = new Map();
  (values || []).forEach(function (value) {
    if (value == null) return;
    var normalized = String(value).trim();
    if (!normalized) return;
    var key = normalizeKey(normalized);
    if (!key || key === "nan") return;
    var current = map.get(key);
    map.set(key, pickPreferredCase(current, normalized));
  });
  return Array.from(map.values());
};

var pickModelField = function pickModelField(obj) {
  if (!isPlainObject(obj)) return null;

  var _iterator = _createForOfIteratorHelper(MODEL_FIELD_CANDIDATES),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var key = _step.value;
      if (Array.isArray(obj[key])) return key;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  var arrayKey = Object.keys(obj).find(function (key) {
    return Array.isArray(obj[key]);
  });
  return arrayKey || null;
};

var extractModels = function extractModels(value) {
  if (Array.isArray(value)) {
    return {
      models: normalizeList(value),
      modelField: null
    };
  }

  if (isPlainObject(value)) {
    var modelField = pickModelField(value);
    var models = modelField ? normalizeList(value[modelField]) : [];
    return {
      models: models,
      modelField: modelField
    };
  }

  if (value != null && value !== "") {
    return {
      models: normalizeList([value]),
      modelField: null
    };
  }

  return {
    models: [],
    modelField: null
  };
};

var extractOemMap = function extractOemMap(data) {
  var oemMap = {};
  var modelFieldByOem = {};
  var oemField = null;

  var _iterator2 = _createForOfIteratorHelper(OEM_FIELD_CANDIDATES),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var key = _step2.value;

      if (Array.isArray(data === null || data === void 0 ? void 0 : data[key])) {
        oemField = key;
        data[key].forEach(function (entry) {
          if (entry == null) return;

          if (isPlainObject(entry)) {
            var name = entry.name || entry.oem || entry.OEM || entry.label || entry.value;
            if (!name) return;
            var normalizedName = String(name).trim();
            if (!normalizedName) return;

            var _extractModels2 = extractModels(entry.models || entry.list || entry.items),
                models = _extractModels2.models;

            oemMap[normalizedName] = normalizeList([].concat(Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_3__["default"])(oemMap[normalizedName] || []), Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_3__["default"])(models)));
            return;
          }

          var normalized = String(entry || "").trim();
          if (!normalized) return;
          oemMap[normalized] = normalizeList(Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_3__["default"])(oemMap[normalized] || []));
        });
      } else if (isPlainObject(data === null || data === void 0 ? void 0 : data[key])) {
        oemField = key;
        Object.entries(data[key]).forEach(function (_ref3) {
          var _ref4 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_4__["default"])(_ref3, 2),
              oem = _ref4[0],
              value = _ref4[1];

          var _extractModels3 = extractModels(value),
              models = _extractModels3.models,
              modelField = _extractModels3.modelField;

          oemMap[oem] = normalizeList([].concat(Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_3__["default"])(oemMap[oem] || []), Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_3__["default"])(models)));

          if (modelField) {
            modelFieldByOem[oem] = modelField;
          }
        });
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  if (!oemField) {
    Object.entries(data || {}).forEach(function (_ref) {
      var _ref2 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_4__["default"])(_ref, 2),
          key = _ref2[0],
          value = _ref2[1];

      if (!value) return;
      if (key.startsWith("_")) return;

      if (isPlainObject(value) || Array.isArray(value)) {
        var _extractModels = extractModels(value),
            models = _extractModels.models,
            modelField = _extractModels.modelField;

        if (models.length || modelField) {
          oemMap[key] = normalizeList([].concat(Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_3__["default"])(oemMap[key] || []), Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_3__["default"])(models)));

          if (modelField) {
            modelFieldByOem[key] = modelField;
          }
        }
      }
    });
  }

  return {
    oemMap: oemMap,
    oemField: oemField,
    modelFieldByOem: modelFieldByOem
  };
};

var buildCatalogMetaFromMaps = function buildCatalogMetaFromMaps(_ref5) {
  var _ref5$modalities = _ref5.modalities,
      modalities = _ref5$modalities === void 0 ? [] : _ref5$modalities,
      _ref5$oemsByModality = _ref5.oemsByModality,
      oemsByModality = _ref5$oemsByModality === void 0 ? {} : _ref5$oemsByModality,
      _ref5$modelsByModalit = _ref5.modelsByModalityOem,
      modelsByModalityOem = _ref5$modelsByModalit === void 0 ? {} : _ref5$modelsByModalit,
      _ref5$usesSubcollecti = _ref5.usesSubcollections,
      usesSubcollections = _ref5$usesSubcollecti === void 0 ? false : _ref5$usesSubcollecti,
      _ref5$syncDisabled = _ref5.syncDisabled,
      syncDisabled = _ref5$syncDisabled === void 0 ? false : _ref5$syncDisabled,
      _ref5$source = _ref5.source,
      source = _ref5$source === void 0 ? "client" : _ref5$source;
  var meta = {
    oemFieldByModality: {},
    modelFieldByModalityOem: {},
    modalityKeyByLower: {},
    oemKeyByModalityLower: {},
    modelKeyByModalityOemLower: {},
    usesSubcollections: usesSubcollections,
    syncDisabled: syncDisabled,
    source: source
  };
  var normalizedModalities = normalizeListCaseInsensitive(modalities);
  normalizedModalities.forEach(function (modality) {
    var modalityLower = normalizeKey(modality);
    meta.modalityKeyByLower[modalityLower] = pickPreferredCase(meta.modalityKeyByLower[modalityLower], modality);
    var oems = (oemsByModality === null || oemsByModality === void 0 ? void 0 : oemsByModality[modality]) || [];
    var oemLowerMap = meta.oemKeyByModalityLower[modalityLower] || {};
    meta.oemKeyByModalityLower[modalityLower] = oemLowerMap;
    var modelLowerMap = meta.modelKeyByModalityOemLower[modalityLower] || {};
    meta.modelKeyByModalityOemLower[modalityLower] = modelLowerMap;
    oems.forEach(function (oem) {
      var _modelsByModalityOem$;

      var oemLower = normalizeKey(oem);
      oemLowerMap[oemLower] = pickPreferredCase(oemLowerMap[oemLower], oem);
      var models = (modelsByModalityOem === null || modelsByModalityOem === void 0 ? void 0 : (_modelsByModalityOem$ = modelsByModalityOem[modality]) === null || _modelsByModalityOem$ === void 0 ? void 0 : _modelsByModalityOem$[oem]) || [];
      modelLowerMap[oemLower] = modelLowerMap[oemLower] || {};
      models.forEach(function (model) {
        var modelLower = normalizeKey(model);
        if (!modelLower) return;
        modelLowerMap[oemLower][modelLower] = pickPreferredCase(modelLowerMap[oemLower][modelLower], model);
      });
    });
  });
  return {
    modalities: normalizedModalities,
    oemsByModality: oemsByModality,
    modelsByModalityOem: modelsByModalityOem,
    meta: meta
  };
};

function fetchTrackerCatalog() {
  return _fetchTrackerCatalog.apply(this, arguments);
}

function _fetchTrackerCatalog() {
  _fetchTrackerCatalog = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__["default"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
    var response, payload, db, snap, modalities, oemsByModality, modelsByModalityOem, meta;
    return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (false) {}

            _context.prev = 1;
            _context.next = 4;
            return fetch("/api/tracker/catalog?ts=".concat(Date.now()), {
              cache: "no-store"
            });

          case 4:
            response = _context.sent;

            if (!response.ok) {
              _context.next = 11;
              break;
            }

            _context.next = 8;
            return response.json();

          case 8:
            payload = _context.sent;

            if (!(payload !== null && payload !== void 0 && payload.modalities)) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return", buildCatalogMetaFromMaps({
              modalities: payload.modalities || [],
              oemsByModality: payload.oemsByModality || {},
              modelsByModalityOem: payload.modelsByModalityOem || {},
              usesSubcollections: Boolean(payload.usesSubcollections),
              syncDisabled: false,
              source: "server"
            }));

          case 11:
            _context.next = 16;
            break;

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](1);
            console.warn("Tracker catalog API fallback:", _context.t0);

          case 16:
            db = _context_Firebase__WEBPACK_IMPORTED_MODULE_5__["default"].firestore();
            _context.prev = 17;
            _context.next = 20;
            return db.collection("Tracker").get({
              source: "server"
            });

          case 20:
            snap = _context.sent;
            _context.next = 28;
            break;

          case 23:
            _context.prev = 23;
            _context.t1 = _context["catch"](17);
            _context.next = 27;
            return db.collection("Tracker").get();

          case 27:
            snap = _context.sent;

          case 28:
            console.log("Tracker catalog client docs:", snap.docs.map(function (doc) {
              return doc.id;
            }));
            modalities = [];
            oemsByModality = {};
            modelsByModalityOem = {};
            meta = {
              oemFieldByModality: {},
              modelFieldByModalityOem: {},
              modalityKeyByLower: {},
              oemKeyByModalityLower: {},
              modelKeyByModalityOemLower: {}
            };
            snap.forEach(function (doc) {
              var modality = doc.id;
              var modalityLower = normalizeKey(modality);
              var existingModality = meta.modalityKeyByLower[modalityLower];
              var canonicalModality = pickPreferredCase(existingModality, modality);
              meta.modalityKeyByLower[modalityLower] = canonicalModality;
              var data = doc.data() || {};

              var _extractOemMap = extractOemMap(data),
                  oemMap = _extractOemMap.oemMap,
                  oemField = _extractOemMap.oemField,
                  modelFieldByOem = _extractOemMap.modelFieldByOem;

              if (existingModality && existingModality !== canonicalModality) {
                oemsByModality[canonicalModality] = normalizeListCaseInsensitive([].concat(Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_3__["default"])(oemsByModality[existingModality] || []), Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_3__["default"])(oemsByModality[canonicalModality] || [])));
                modelsByModalityOem[canonicalModality] = _objectSpread(_objectSpread({}, modelsByModalityOem[existingModality] || {}), modelsByModalityOem[canonicalModality] || {});
                meta.modelFieldByModalityOem[canonicalModality] = _objectSpread(_objectSpread({}, meta.modelFieldByModalityOem[existingModality] || {}), meta.modelFieldByModalityOem[canonicalModality] || {});

                if (!meta.oemFieldByModality[canonicalModality]) {
                  meta.oemFieldByModality[canonicalModality] = meta.oemFieldByModality[existingModality] || oemField;
                }

                delete oemsByModality[existingModality];
                delete modelsByModalityOem[existingModality];
                delete meta.oemFieldByModality[existingModality];
                delete meta.modelFieldByModalityOem[existingModality];
              }

              modalities.push(canonicalModality);

              if (!meta.oemFieldByModality[canonicalModality]) {
                meta.oemFieldByModality[canonicalModality] = oemField;
              }

              meta.modelFieldByModalityOem[canonicalModality] = _objectSpread(_objectSpread({}, meta.modelFieldByModalityOem[canonicalModality] || {}), modelFieldByOem || {});
              var oems = Object.keys(oemMap);
              var mergedOems = normalizeListCaseInsensitive([].concat(Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_3__["default"])(oemsByModality[canonicalModality] || []), Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_3__["default"])(oems)));
              oemsByModality[canonicalModality] = mergedOems;
              modelsByModalityOem[canonicalModality] = modelsByModalityOem[canonicalModality] || {};
              var oemLowerMap = meta.oemKeyByModalityLower[modalityLower] || {};
              meta.oemKeyByModalityLower[modalityLower] = oemLowerMap;
              var modelLowerMap = meta.modelKeyByModalityOemLower[modalityLower] || {};
              meta.modelKeyByModalityOemLower[modalityLower] = modelLowerMap;
              oems.forEach(function (oem) {
                var oemLower = normalizeKey(oem);
                var existingOem = oemLowerMap[oemLower];
                var canonicalOem = pickPreferredCase(existingOem, oem);
                oemLowerMap[oemLower] = canonicalOem;

                if (existingOem && existingOem !== canonicalOem) {
                  modelsByModalityOem[canonicalModality][canonicalOem] = normalizeListCaseInsensitive([].concat(Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_3__["default"])(modelsByModalityOem[canonicalModality][existingOem] || []), Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_3__["default"])(modelsByModalityOem[canonicalModality][canonicalOem] || [])));
                  delete modelsByModalityOem[canonicalModality][existingOem];
                }

                var existingModels = modelsByModalityOem[canonicalModality][canonicalOem] || [];
                var mergedModels = normalizeListCaseInsensitive([].concat(Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_3__["default"])(existingModels), Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_3__["default"])(oemMap[oem] || [])));
                modelsByModalityOem[canonicalModality][canonicalOem] = mergedModels;
                modelLowerMap[oemLower] = modelLowerMap[oemLower] || {};
                mergedModels.forEach(function (model) {
                  modelLowerMap[oemLower][normalizeKey(model)] = model;
                });
              });
            });
            return _context.abrupt("return", buildCatalogMetaFromMaps({
              modalities: modalities,
              oemsByModality: oemsByModality,
              modelsByModalityOem: modelsByModalityOem,
              usesSubcollections: true,
              syncDisabled: false,
              source: "client"
            }));

          case 35:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 13], [17, 23]]);
  }));
  return _fetchTrackerCatalog.apply(this, arguments);
}

function buildAllOems(catalog) {
  var map = new Map();
  Object.values((catalog === null || catalog === void 0 ? void 0 : catalog.oemsByModality) || {}).forEach(function (oems) {
    (oems || []).forEach(function (oem) {
      var key = normalizeKey(oem);
      if (!key) return;
      var current = map.get(key);
      map.set(key, pickPreferredCase(current, oem));
    });
  });
  return Array.from(map.values());
}
function buildModelsForSelection(catalog) {
  var modalities = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var oems = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var modelSet = new Set();
  var modals = normalizeList(modalities);
  var oemList = normalizeList(oems);
  modals.forEach(function (modality) {
    var _catalog$meta, _catalog$meta$modalit, _catalog$modelsByModa;

    var modalityLower = normalizeKey(modality);
    var canonicalModality = (catalog === null || catalog === void 0 ? void 0 : (_catalog$meta = catalog.meta) === null || _catalog$meta === void 0 ? void 0 : (_catalog$meta$modalit = _catalog$meta.modalityKeyByLower) === null || _catalog$meta$modalit === void 0 ? void 0 : _catalog$meta$modalit[modalityLower]) || modality;
    var oemMap = (catalog === null || catalog === void 0 ? void 0 : (_catalog$modelsByModa = catalog.modelsByModalityOem) === null || _catalog$modelsByModa === void 0 ? void 0 : _catalog$modelsByModa[canonicalModality]) || {};
    oemList.forEach(function (oem) {
      var _catalog$meta2, _catalog$meta2$oemKey, _catalog$meta2$oemKey2;

      var oemLower = normalizeKey(oem);
      var canonicalOem = (catalog === null || catalog === void 0 ? void 0 : (_catalog$meta2 = catalog.meta) === null || _catalog$meta2 === void 0 ? void 0 : (_catalog$meta2$oemKey = _catalog$meta2.oemKeyByModalityLower) === null || _catalog$meta2$oemKey === void 0 ? void 0 : (_catalog$meta2$oemKey2 = _catalog$meta2$oemKey[modalityLower]) === null || _catalog$meta2$oemKey2 === void 0 ? void 0 : _catalog$meta2$oemKey2[oemLower]) || oem;
      var models = (oemMap === null || oemMap === void 0 ? void 0 : oemMap[canonicalOem]) || [];
      models.forEach(function (model) {
        return modelSet.add(model);
      });
    });
  });
  return Array.from(modelSet);
}
function syncTrackerFromSelections(_x) {
  return _syncTrackerFromSelections.apply(this, arguments);
}

function _syncTrackerFromSelections() {
  _syncTrackerFromSelections = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__["default"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(_ref6) {
    var _catalog$meta3;

    var selections, catalog, db, trackerRef, selectedModalities, selectedOems, selectedModels, ops, _iterator3, _step3, _loop;

    return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            selections = _ref6.selections, catalog = _ref6.catalog;
            db = _context_Firebase__WEBPACK_IMPORTED_MODULE_5__["default"].firestore();
            trackerRef = db.collection("Tracker");
            selectedModalities = normalizeList((selections === null || selections === void 0 ? void 0 : selections.modalities) || []);
            selectedOems = normalizeList((selections === null || selections === void 0 ? void 0 : selections.oems) || []);
            selectedModels = normalizeList((selections === null || selections === void 0 ? void 0 : selections.models) || []);

            if (selectedModalities.length) {
              _context2.next = 8;
              break;
            }

            return _context2.abrupt("return", false);

          case 8:
            if (!(catalog !== null && catalog !== void 0 && (_catalog$meta3 = catalog.meta) !== null && _catalog$meta3 !== void 0 && _catalog$meta3.syncDisabled)) {
              _context2.next = 10;
              break;
            }

            return _context2.abrupt("return", false);

          case 10:
            ops = [];
            _iterator3 = _createForOfIteratorHelper(selectedModalities);

            try {
              _loop = function _loop() {
                var _catalog$meta4, _catalog$meta4$modali, _catalog$oemsByModali, _catalog$meta5, _catalog$meta5$oemFie, _catalog$modalities;

                var modality = _step3.value;
                var modalityLower = normalizeKey(modality);
                var canonicalModality = (catalog === null || catalog === void 0 ? void 0 : (_catalog$meta4 = catalog.meta) === null || _catalog$meta4 === void 0 ? void 0 : (_catalog$meta4$modali = _catalog$meta4.modalityKeyByLower) === null || _catalog$meta4$modali === void 0 ? void 0 : _catalog$meta4$modali[modalityLower]) || modalityLower;
                var docRef = trackerRef.doc(canonicalModality);
                var existingOemsRaw = (catalog === null || catalog === void 0 ? void 0 : (_catalog$oemsByModali = catalog.oemsByModality) === null || _catalog$oemsByModali === void 0 ? void 0 : _catalog$oemsByModali[canonicalModality]) || [];
                var existingOemsLower = new Set(existingOemsRaw.map(function (value) {
                  return normalizeKey(value);
                }));
                var oemField = (catalog === null || catalog === void 0 ? void 0 : (_catalog$meta5 = catalog.meta) === null || _catalog$meta5 === void 0 ? void 0 : (_catalog$meta5$oemFie = _catalog$meta5.oemFieldByModality) === null || _catalog$meta5$oemFie === void 0 ? void 0 : _catalog$meta5$oemFie[canonicalModality]) || DEFAULT_OEM_FIELD;

                if (!(catalog !== null && catalog !== void 0 && (_catalog$modalities = catalog.modalities) !== null && _catalog$modalities !== void 0 && _catalog$modalities.some(function (existing) {
                  return normalizeKey(existing) === modalityLower;
                }))) {
                  ops.push(docRef.set(Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])({}, DEFAULT_OEM_FIELD, {}), {
                    merge: true
                  }));
                }

                var _iterator4 = _createForOfIteratorHelper(selectedOems),
                    _step4;

                try {
                  for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                    var _catalog$meta6, _catalog$meta6$oemKey, _catalog$meta6$oemKey2;

                    var oem = _step4.value;
                    var oemLower = normalizeKey(oem);
                    var canonicalOem = (catalog === null || catalog === void 0 ? void 0 : (_catalog$meta6 = catalog.meta) === null || _catalog$meta6 === void 0 ? void 0 : (_catalog$meta6$oemKey = _catalog$meta6.oemKeyByModalityLower) === null || _catalog$meta6$oemKey === void 0 ? void 0 : (_catalog$meta6$oemKey2 = _catalog$meta6$oemKey[modalityLower]) === null || _catalog$meta6$oemKey2 === void 0 ? void 0 : _catalog$meta6$oemKey2[oemLower]) || oemLower;

                    if (!existingOemsLower.has(oemLower)) {
                      ops.push(docRef.set(Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])({}, oemField, Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])({}, canonicalOem, [])), {
                        merge: true
                      }));
                    }
                  }
                } catch (err) {
                  _iterator4.e(err);
                } finally {
                  _iterator4.f();
                }

                var _iterator5 = _createForOfIteratorHelper(selectedOems),
                    _step5;

                try {
                  for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
                    var _catalog$meta7, _catalog$meta7$oemKey, _catalog$meta7$oemKey2, _catalog$modelsByModa2, _catalog$modelsByModa3, _catalog$meta8, _catalog$meta8$modelK, _catalog$meta8$modelK2, _catalog$meta9, _catalog$meta9$modelF, _catalog$meta9$modelF2;

                    var _oem = _step5.value;

                    var _oemLower = normalizeKey(_oem);

                    var _canonicalOem = (catalog === null || catalog === void 0 ? void 0 : (_catalog$meta7 = catalog.meta) === null || _catalog$meta7 === void 0 ? void 0 : (_catalog$meta7$oemKey = _catalog$meta7.oemKeyByModalityLower) === null || _catalog$meta7$oemKey === void 0 ? void 0 : (_catalog$meta7$oemKey2 = _catalog$meta7$oemKey[modalityLower]) === null || _catalog$meta7$oemKey2 === void 0 ? void 0 : _catalog$meta7$oemKey2[_oemLower]) || _oemLower;

                    var knownModels = (catalog === null || catalog === void 0 ? void 0 : (_catalog$modelsByModa2 = catalog.modelsByModalityOem) === null || _catalog$modelsByModa2 === void 0 ? void 0 : (_catalog$modelsByModa3 = _catalog$modelsByModa2[canonicalModality]) === null || _catalog$modelsByModa3 === void 0 ? void 0 : _catalog$modelsByModa3[_canonicalOem]) || [];
                    var knownLower = new Set(knownModels.map(function (value) {
                      return normalizeKey(value);
                    }));
                    var modelCaseMap = (catalog === null || catalog === void 0 ? void 0 : (_catalog$meta8 = catalog.meta) === null || _catalog$meta8 === void 0 ? void 0 : (_catalog$meta8$modelK = _catalog$meta8.modelKeyByModalityOemLower) === null || _catalog$meta8$modelK === void 0 ? void 0 : (_catalog$meta8$modelK2 = _catalog$meta8$modelK[modalityLower]) === null || _catalog$meta8$modelK2 === void 0 ? void 0 : _catalog$meta8$modelK2[_oemLower]) || {};
                    var modelField = (catalog === null || catalog === void 0 ? void 0 : (_catalog$meta9 = catalog.meta) === null || _catalog$meta9 === void 0 ? void 0 : (_catalog$meta9$modelF = _catalog$meta9.modelFieldByModalityOem) === null || _catalog$meta9$modelF === void 0 ? void 0 : (_catalog$meta9$modelF2 = _catalog$meta9$modelF[canonicalModality]) === null || _catalog$meta9$modelF2 === void 0 ? void 0 : _catalog$meta9$modelF2[_canonicalOem]) || null;

                    var _iterator6 = _createForOfIteratorHelper(selectedModels),
                        _step6;

                    try {
                      for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
                        var model = _step6.value;
                        var modelLower = normalizeKey(model);
                        if (!modelLower || knownLower.has(modelLower)) continue;
                        var canonicalModel = modelCaseMap[modelLower] || model;
                        var path = modelField ? "".concat(oemField, ".").concat(_canonicalOem, ".").concat(modelField) : "".concat(oemField, ".").concat(_canonicalOem);
                        ops.push(docRef.update(Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])({}, path, _context_Firebase__WEBPACK_IMPORTED_MODULE_5__["default"].firestore.FieldValue.arrayUnion(canonicalModel))));
                      }
                    } catch (err) {
                      _iterator6.e(err);
                    } finally {
                      _iterator6.f();
                    }
                  }
                } catch (err) {
                  _iterator5.e(err);
                } finally {
                  _iterator5.f();
                }
              };

              for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                _loop();
              }
            } catch (err) {
              _iterator3.e(err);
            } finally {
              _iterator3.f();
            }

            if (!ops.length) {
              _context2.next = 17;
              break;
            }

            _context2.next = 16;
            return Promise.allSettled(ops);

          case 16:
            return _context2.abrupt("return", true);

          case 17:
            return _context2.abrupt("return", false);

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _syncTrackerFromSelections.apply(this, arguments);
}

function deleteTrackerOem(_x2) {
  return _deleteTrackerOem.apply(this, arguments);
}

function _deleteTrackerOem() {
  _deleteTrackerOem = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__["default"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3(_ref7) {
    var _catalog$meta10;

    var oem, catalog, db, trackerRef, modalities, usesSubcollections, ops;
    return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            oem = _ref7.oem, catalog = _ref7.catalog;

            if (oem) {
              _context3.next = 3;
              break;
            }

            return _context3.abrupt("return");

          case 3:
            db = _context_Firebase__WEBPACK_IMPORTED_MODULE_5__["default"].firestore();
            trackerRef = db.collection("Tracker");
            modalities = (catalog === null || catalog === void 0 ? void 0 : catalog.modalities) || [];
            usesSubcollections = Boolean(catalog === null || catalog === void 0 ? void 0 : (_catalog$meta10 = catalog.meta) === null || _catalog$meta10 === void 0 ? void 0 : _catalog$meta10.usesSubcollections);
            ops = modalities.map(function (modality) {
              var _catalog$meta11, _catalog$meta11$modal, _catalog$meta12, _catalog$meta12$oemKe, _catalog$meta12$oemKe2, _catalog$meta13, _catalog$meta13$oemFi, _catalog$meta14, _catalog$meta14$oemFi;

              var modalityLower = normalizeKey(modality);
              var canonicalModality = (catalog === null || catalog === void 0 ? void 0 : (_catalog$meta11 = catalog.meta) === null || _catalog$meta11 === void 0 ? void 0 : (_catalog$meta11$modal = _catalog$meta11.modalityKeyByLower) === null || _catalog$meta11$modal === void 0 ? void 0 : _catalog$meta11$modal[modalityLower]) || modality;
              var docRef = trackerRef.doc(canonicalModality);
              var canonicalOem = (catalog === null || catalog === void 0 ? void 0 : (_catalog$meta12 = catalog.meta) === null || _catalog$meta12 === void 0 ? void 0 : (_catalog$meta12$oemKe = _catalog$meta12.oemKeyByModalityLower) === null || _catalog$meta12$oemKe === void 0 ? void 0 : (_catalog$meta12$oemKe2 = _catalog$meta12$oemKe[modalityLower]) === null || _catalog$meta12$oemKe2 === void 0 ? void 0 : _catalog$meta12$oemKe2[normalizeKey(oem)]) || oem;

              if (usesSubcollections) {
                return docRef.collection(canonicalOem).get().then(function (snap) {
                  var deletions = [];
                  snap.forEach(function (doc) {
                    deletions.push(doc.ref["delete"]());
                  });
                  return Promise.allSettled(deletions);
                })["catch"](function () {
                  return null;
                });
              }

              var oemField = (catalog === null || catalog === void 0 ? void 0 : (_catalog$meta13 = catalog.meta) === null || _catalog$meta13 === void 0 ? void 0 : (_catalog$meta13$oemFi = _catalog$meta13.oemFieldByModality) === null || _catalog$meta13$oemFi === void 0 ? void 0 : _catalog$meta13$oemFi[canonicalModality]) || DEFAULT_OEM_FIELD;

              var update = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])({}, "".concat(oemField, ".").concat(canonicalOem), _context_Firebase__WEBPACK_IMPORTED_MODULE_5__["default"].firestore.FieldValue["delete"]());

              if (!(catalog !== null && catalog !== void 0 && (_catalog$meta14 = catalog.meta) !== null && _catalog$meta14 !== void 0 && (_catalog$meta14$oemFi = _catalog$meta14.oemFieldByModality) !== null && _catalog$meta14$oemFi !== void 0 && _catalog$meta14$oemFi[canonicalModality])) {
                update[canonicalOem] = _context_Firebase__WEBPACK_IMPORTED_MODULE_5__["default"].firestore.FieldValue["delete"]();
              }

              return docRef.update(update)["catch"](function () {
                return null;
              });
            });
            _context3.next = 10;
            return Promise.allSettled(ops);

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _deleteTrackerOem.apply(this, arguments);
}

function deleteTrackerModel(_x3) {
  return _deleteTrackerModel.apply(this, arguments);
}

function _deleteTrackerModel() {
  _deleteTrackerModel = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__["default"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee4(_ref8) {
    var _catalog$meta15, _catalog$meta15$modal, _catalog$meta16, _catalog$meta16$oemKe, _catalog$meta16$oemKe2, _catalog$meta17, _catalog$meta18, _catalog$meta18$oemFi, _catalog$meta19, _catalog$meta19$model, _catalog$meta19$model2;

    var modality, oem, model, catalog, db, modalityLower, canonicalModality, docRef, canonicalOem, modelKey, oemField, modelField, path;
    return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            modality = _ref8.modality, oem = _ref8.oem, model = _ref8.model, catalog = _ref8.catalog;

            if (!(!modality || !oem || !model)) {
              _context4.next = 3;
              break;
            }

            return _context4.abrupt("return");

          case 3:
            db = _context_Firebase__WEBPACK_IMPORTED_MODULE_5__["default"].firestore();
            modalityLower = normalizeKey(modality);
            canonicalModality = (catalog === null || catalog === void 0 ? void 0 : (_catalog$meta15 = catalog.meta) === null || _catalog$meta15 === void 0 ? void 0 : (_catalog$meta15$modal = _catalog$meta15.modalityKeyByLower) === null || _catalog$meta15$modal === void 0 ? void 0 : _catalog$meta15$modal[modalityLower]) || modality;
            docRef = db.collection("Tracker").doc(canonicalModality);
            canonicalOem = (catalog === null || catalog === void 0 ? void 0 : (_catalog$meta16 = catalog.meta) === null || _catalog$meta16 === void 0 ? void 0 : (_catalog$meta16$oemKe = _catalog$meta16.oemKeyByModalityLower) === null || _catalog$meta16$oemKe === void 0 ? void 0 : (_catalog$meta16$oemKe2 = _catalog$meta16$oemKe[modalityLower]) === null || _catalog$meta16$oemKe2 === void 0 ? void 0 : _catalog$meta16$oemKe2[normalizeKey(oem)]) || oem;

            if (!(catalog !== null && catalog !== void 0 && (_catalog$meta17 = catalog.meta) !== null && _catalog$meta17 !== void 0 && _catalog$meta17.usesSubcollections)) {
              _context4.next = 13;
              break;
            }

            modelKey = normalizeKey(model);
            _context4.next = 12;
            return docRef.collection(canonicalOem).doc(modelKey)["delete"]()["catch"](function () {
              return null;
            });

          case 12:
            return _context4.abrupt("return");

          case 13:
            oemField = (catalog === null || catalog === void 0 ? void 0 : (_catalog$meta18 = catalog.meta) === null || _catalog$meta18 === void 0 ? void 0 : (_catalog$meta18$oemFi = _catalog$meta18.oemFieldByModality) === null || _catalog$meta18$oemFi === void 0 ? void 0 : _catalog$meta18$oemFi[canonicalModality]) || DEFAULT_OEM_FIELD;
            modelField = (catalog === null || catalog === void 0 ? void 0 : (_catalog$meta19 = catalog.meta) === null || _catalog$meta19 === void 0 ? void 0 : (_catalog$meta19$model = _catalog$meta19.modelFieldByModalityOem) === null || _catalog$meta19$model === void 0 ? void 0 : (_catalog$meta19$model2 = _catalog$meta19$model[canonicalModality]) === null || _catalog$meta19$model2 === void 0 ? void 0 : _catalog$meta19$model2[canonicalOem]) || null;
            path = modelField ? "".concat(oemField, ".").concat(canonicalOem, ".").concat(modelField) : "".concat(oemField, ".").concat(canonicalOem);
            _context4.next = 18;
            return docRef.update(Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])({}, path, _context_Firebase__WEBPACK_IMPORTED_MODULE_5__["default"].firestore.FieldValue.arrayRemove(model)));

          case 18:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _deleteTrackerModel.apply(this, arguments);
}

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

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/next/dist/compiled/webpack/harmony-module.js */ "./node_modules/next/dist/compiled/webpack/harmony-module.js")(module)))

/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vdXRpbHMvdHJhY2tlckNhdGFsb2cuanMiXSwibmFtZXMiOlsiT0VNX0ZJRUxEX0NBTkRJREFURVMiLCJNT0RFTF9GSUVMRF9DQU5ESURBVEVTIiwiREVGQVVMVF9PRU1fRklFTEQiLCJpc1BsYWluT2JqZWN0IiwidmFsdWUiLCJBcnJheSIsImlzQXJyYXkiLCJEYXRlIiwibm9ybWFsaXplS2V5IiwiU3RyaW5nIiwidHJpbSIsInRvTG93ZXJDYXNlIiwiaGFzVXBwZXIiLCJ0ZXN0IiwicGlja1ByZWZlcnJlZENhc2UiLCJjdXJyZW50IiwiaW5jb21pbmciLCJjdXJyZW50VXBwZXIiLCJpbmNvbWluZ1VwcGVyIiwibm9ybWFsaXplQXJyYXkiLCJub3JtYWxpemVMaXN0IiwidmFsdWVzIiwib3V0IiwiZm9yRWFjaCIsIm5vcm1hbGl6ZWQiLCJwdXNoIiwiZnJvbSIsIlNldCIsIm5vcm1hbGl6ZUxpc3RDYXNlSW5zZW5zaXRpdmUiLCJtYXAiLCJNYXAiLCJrZXkiLCJnZXQiLCJzZXQiLCJwaWNrTW9kZWxGaWVsZCIsIm9iaiIsImFycmF5S2V5IiwiT2JqZWN0Iiwia2V5cyIsImZpbmQiLCJleHRyYWN0TW9kZWxzIiwibW9kZWxzIiwibW9kZWxGaWVsZCIsImV4dHJhY3RPZW1NYXAiLCJkYXRhIiwib2VtTWFwIiwibW9kZWxGaWVsZEJ5T2VtIiwib2VtRmllbGQiLCJlbnRyeSIsIm5hbWUiLCJvZW0iLCJPRU0iLCJsYWJlbCIsIm5vcm1hbGl6ZWROYW1lIiwibGlzdCIsIml0ZW1zIiwiZW50cmllcyIsInN0YXJ0c1dpdGgiLCJsZW5ndGgiLCJidWlsZENhdGFsb2dNZXRhRnJvbU1hcHMiLCJtb2RhbGl0aWVzIiwib2Vtc0J5TW9kYWxpdHkiLCJtb2RlbHNCeU1vZGFsaXR5T2VtIiwidXNlc1N1YmNvbGxlY3Rpb25zIiwic3luY0Rpc2FibGVkIiwic291cmNlIiwibWV0YSIsIm9lbUZpZWxkQnlNb2RhbGl0eSIsIm1vZGVsRmllbGRCeU1vZGFsaXR5T2VtIiwibW9kYWxpdHlLZXlCeUxvd2VyIiwib2VtS2V5QnlNb2RhbGl0eUxvd2VyIiwibW9kZWxLZXlCeU1vZGFsaXR5T2VtTG93ZXIiLCJub3JtYWxpemVkTW9kYWxpdGllcyIsIm1vZGFsaXR5IiwibW9kYWxpdHlMb3dlciIsIm9lbXMiLCJvZW1Mb3dlck1hcCIsIm1vZGVsTG93ZXJNYXAiLCJvZW1Mb3dlciIsIm1vZGVsIiwibW9kZWxMb3dlciIsImZldGNoVHJhY2tlckNhdGFsb2ciLCJmZXRjaCIsIm5vdyIsImNhY2hlIiwicmVzcG9uc2UiLCJvayIsImpzb24iLCJwYXlsb2FkIiwiQm9vbGVhbiIsImNvbnNvbGUiLCJ3YXJuIiwiZGIiLCJmaXJlYmFzZSIsImZpcmVzdG9yZSIsImNvbGxlY3Rpb24iLCJzbmFwIiwibG9nIiwiZG9jcyIsImRvYyIsImlkIiwiZXhpc3RpbmdNb2RhbGl0eSIsImNhbm9uaWNhbE1vZGFsaXR5IiwibWVyZ2VkT2VtcyIsImV4aXN0aW5nT2VtIiwiY2Fub25pY2FsT2VtIiwiZXhpc3RpbmdNb2RlbHMiLCJtZXJnZWRNb2RlbHMiLCJidWlsZEFsbE9lbXMiLCJjYXRhbG9nIiwiYnVpbGRNb2RlbHNGb3JTZWxlY3Rpb24iLCJtb2RlbFNldCIsIm1vZGFscyIsIm9lbUxpc3QiLCJhZGQiLCJzeW5jVHJhY2tlckZyb21TZWxlY3Rpb25zIiwic2VsZWN0aW9ucyIsInRyYWNrZXJSZWYiLCJzZWxlY3RlZE1vZGFsaXRpZXMiLCJzZWxlY3RlZE9lbXMiLCJzZWxlY3RlZE1vZGVscyIsIm9wcyIsImRvY1JlZiIsImV4aXN0aW5nT2Vtc1JhdyIsImV4aXN0aW5nT2Vtc0xvd2VyIiwic29tZSIsImV4aXN0aW5nIiwibWVyZ2UiLCJoYXMiLCJrbm93bk1vZGVscyIsImtub3duTG93ZXIiLCJtb2RlbENhc2VNYXAiLCJjYW5vbmljYWxNb2RlbCIsInBhdGgiLCJ1cGRhdGUiLCJGaWVsZFZhbHVlIiwiYXJyYXlVbmlvbiIsIlByb21pc2UiLCJhbGxTZXR0bGVkIiwiZGVsZXRlVHJhY2tlck9lbSIsInRoZW4iLCJkZWxldGlvbnMiLCJyZWYiLCJkZWxldGVUcmFja2VyTW9kZWwiLCJtb2RlbEtleSIsImFycmF5UmVtb3ZlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFFQSxJQUFNQSxvQkFBb0IsR0FBRyxDQUFDLE1BQUQsRUFBUyxNQUFULEVBQWlCLEtBQWpCLEVBQXdCLEtBQXhCLENBQTdCO0FBQ0EsSUFBTUMsc0JBQXNCLEdBQUcsQ0FBQyxRQUFELEVBQVcsUUFBWCxFQUFxQixPQUFyQixFQUE4QixPQUE5QixFQUF1QyxNQUF2QyxFQUErQyxPQUEvQyxDQUEvQjtBQUNBLElBQU1DLGlCQUFpQixHQUFHLE1BQTFCOztBQUVBLElBQU1DLGFBQWEsR0FBRyxTQUFoQkEsYUFBZ0IsQ0FBQ0MsS0FBRDtBQUFBLFNBQ3BCQSxLQUFLLElBQUksSUFBVCxJQUNBLE9BQU9BLEtBQVAsS0FBaUIsUUFEakIsSUFFQSxDQUFDQyxLQUFLLENBQUNDLE9BQU4sQ0FBY0YsS0FBZCxDQUZELElBR0EsRUFBRUEsS0FBSyxZQUFZRyxJQUFuQixDQUpvQjtBQUFBLENBQXRCOztBQU1BLElBQU1DLFlBQVksR0FBRyxTQUFmQSxZQUFlLENBQUNKLEtBQUQsRUFBVztBQUM5QixNQUFJQSxLQUFLLElBQUksSUFBYixFQUFtQixPQUFPLEVBQVA7QUFDbkIsU0FBT0ssTUFBTSxDQUFDTCxLQUFELENBQU4sQ0FBY00sSUFBZCxHQUFxQkMsV0FBckIsRUFBUDtBQUNELENBSEQ7O0FBS0EsSUFBTUMsUUFBUSxHQUFHLFNBQVhBLFFBQVcsQ0FBQ1IsS0FBRDtBQUFBLFNBQVcsUUFBUVMsSUFBUixDQUFhSixNQUFNLENBQUNMLEtBQUssSUFBSSxFQUFWLENBQW5CLENBQVg7QUFBQSxDQUFqQjs7QUFFQSxJQUFNVSxpQkFBaUIsR0FBRyxTQUFwQkEsaUJBQW9CLENBQUNDLE9BQUQsRUFBVUMsUUFBVixFQUF1QjtBQUMvQyxNQUFJLENBQUNE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LCtCQUFBQSxPQUFPLENBQUUzQyxJQUFULDZGQUFlQyxrQkFBZixnRkFBb0NtQyxpQkFBcEMsTUFDQXBHLGlCQTNCRztBQTRCQ3dDLHNCQTVCRCxHQTZCSCxDQUFBbUUsT0FBTyxTQUFQLElBQUFBLE9BQU8sV0FBUCwrQkFBQUEsT0FBTyxDQUFFM0MsSUFBVCw2RkFBZUUsdUJBQWYsMEdBQXlDa0MsaUJBQXpDLG1GQUNFRyxZQURGLE1BRUssSUEvQkY7QUFnQ0M0QixnQkFoQ0QsR0FnQ1EzRixVQUFVLGFBQ2hCSyxRQURnQixjQUNKMEQsWUFESSxjQUNZL0QsVUFEWixjQUVoQkssUUFGZ0IsY0FFSjBELFlBRkksQ0FoQ2xCO0FBQUE7QUFBQSxtQkFtQ0NpQixNQUFNLENBQUNZLE1BQVAsd0pBQ0hELElBREcsRUFDSXhDLHlEQUFRLENBQUNDLFNBQVQsQ0FBbUJ5QyxVQUFuQixDQUE4QlUsV0FBOUIsQ0FBMENsRSxLQUExQyxDQURKLEVBbkNEOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEciLCJmaWxlIjoic3RhdGljL3dlYnBhY2svcGFnZXMvTmV3U2VhcmNoL2l0ZW0vW2lkXS4yMGE1MDQ5NzI4M2E4NjRjYjE0YS5ob3QtdXBkYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZpcmViYXNlIGZyb20gXCIuLi9jb250ZXh0L0ZpcmViYXNlXCI7XG5cbmNvbnN0IE9FTV9GSUVMRF9DQU5ESURBVEVTID0gW1wib2Vtc1wiLCBcIk9FTXNcIiwgXCJvZW1cIiwgXCJPRU1cIl07XG5jb25zdCBNT0RFTF9GSUVMRF9DQU5ESURBVEVTID0gW1wibW9kZWxzXCIsIFwiTW9kZWxzXCIsIFwibW9kZWxcIiwgXCJNb2RlbFwiLCBcImxpc3RcIiwgXCJpdGVtc1wiXTtcbmNvbnN0IERFRkFVTFRfT0VNX0ZJRUxEID0gXCJvZW1zXCI7XG5cbmNvbnN0IGlzUGxhaW5PYmplY3QgPSAodmFsdWUpID0+XG4gIHZhbHVlICE9IG51bGwgJiZcbiAgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmXG4gICFBcnJheS5pc0FycmF5KHZhbHVlKSAmJlxuICAhKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSk7XG5cbmNvbnN0IG5vcm1hbGl6ZUtleSA9ICh2YWx1ZSkgPT4ge1xuICBpZiAodmFsdWUgPT0gbnVsbCkgcmV0dXJuIFwiXCI7XG4gIHJldHVybiBTdHJpbmcodmFsdWUpLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xufTtcblxuY29uc3QgaGFzVXBwZXIgPSAodmFsdWUpID0+IC9bQS1aXS8udGVzdChTdHJpbmcodmFsdWUgfHwgXCJcIikpO1xuXG5jb25zdCBwaWNrUHJlZmVycmVkQ2FzZSA9IChjdXJyZW50LCBpbmNvbWluZykgPT4ge1xuICBpZiAoIWN1cnJlbnQpIHJldHVybiBpbmNvbWluZztcbiAgaWYgKCFpbmNvbWluZykgcmV0dXJuIGN1cnJlbnQ7XG4gIGNvbnN0IGN1cnJlbnRVcHBlciA9IGhhc1VwcGVyKGN1cnJlbnQpO1xuICBjb25zdCBpbmNvbWluZ1VwcGVyID0gaGFzVXBwZXIoaW5jb21pbmcpO1xuICBpZiAoaW5jb21pbmdVcHBlciAmJiAhY3VycmVudFVwcGVyKSByZXR1cm4gaW5jb21pbmc7XG4gIGlmIChjdXJyZW50VXBwZXIgJiYgIWluY29taW5nVXBwZXIpIHJldHVybiBjdXJyZW50O1xuICByZXR1cm4gY3VycmVudDtcbn07XG5cbmNvbnN0IG5vcm1hbGl6ZUFycmF5ID0gKHZhbHVlKSA9PiB7XG4gIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkgcmV0dXJuIHZhbHVlO1xuICBpZiAodmFsdWUgPT0gbnVsbCB8fCB2YWx1ZSA9PT0gXCJcIikgcmV0dXJuIFtdO1xuICByZXR1cm4gW3ZhbHVlXTtcbn07XG5cbmNvbnN0IG5vcm1hbGl6ZUxpc3QgPSAodmFsdWVzKSA9PiB7XG4gIGNvbnN0IG91dCA9IFtdO1xuICAodmFsdWVzIHx8IFtdKS5mb3JFYWNoKCh2YWx1ZSkgPT4ge1xuICAgIGlmICh2YWx1ZSA9PSBudWxsKSByZXR1cm47XG4gICAgY29uc3Qgbm9ybWFsaXplZCA9IFN0cmluZyh2YWx1ZSkudHJpbSgpO1xuICAgIGlmICghbm9ybWFsaXplZCkgcmV0dXJuO1xuICAgIGlmIChub3JtYWxpemVLZXkobm9ybWFsaXplZCkgPT09IFwibmFuXCIpIHJldHVybjtcbiAgICBvdXQucHVzaChub3JtYWxpemVkKTtcbiAgfSk7XG4gIHJldHVybiBBcnJheS5mcm9tKG5ldyBTZXQob3V0KSk7XG59O1xuXG5jb25zdCBub3JtYWxpemVMaXN0Q2FzZUluc2Vuc2l0aXZlID0gKHZhbHVlcykgPT4ge1xuICBjb25zdCBtYXAgPSBuZXcgTWFwKCk7XG4gICh2YWx1ZXMgfHwgW10pLmZvckVhY2goKHZhbHVlKSA9PiB7XG4gICAgaWYgKHZhbHVlID09IG51bGwpIHJldHVybjtcbiAgICBjb25zdCBub3JtYWxpemVkID0gU3RyaW5nKHZhbHVlKS50cmltKCk7XG4gICAgaWYgKCFub3JtYWxpemVkKSByZXR1cm47XG4gICAgY29uc3Qga2V5ID0gbm9ybWFsaXplS2V5KG5vcm1hbGl6ZWQpO1xuICAgIGlmICgha2V5IHx8IGtleSA9PT0gXCJuYW5cIikgcmV0dXJuO1xuICAgIGNvbnN0IGN1cnJlbnQgPSBtYXAuZ2V0KGtleSk7XG4gICAgbWFwLnNldChrZXksIHBpY2tQcmVmZXJyZWRDYXNlKGN1cnJlbnQsIG5vcm1hbGl6ZWQpKTtcbiAgfSk7XG4gIHJldHVybiBBcnJheS5mcm9tKG1hcC52YWx1ZXMoKSk7XG59O1xuXG5cbmNvbnN0IHBpY2tNb2RlbEZpZWxkID0gKG9iaikgPT4ge1xuICBpZiAoIWlzUGxhaW5PYmplY3Qob2JqKSkgcmV0dXJuIG51bGw7XG4gIGZvciAoY29uc3Qga2V5IG9mIE1PREVMX0ZJRUxEX0NBTkRJREFURVMpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShvYmpba2V5XSkpIHJldHVybiBrZXk7XG4gIH1cbiAgY29uc3QgYXJyYXlLZXkgPSBPYmplY3Qua2V5cyhvYmopLmZpbmQoKGtleSkgPT4gQXJyYXkuaXNBcnJheShvYmpba2V5XSkpO1xuICByZXR1cm4gYXJyYXlLZXkgfHwgbnVsbDtcbn07XG5cbmNvbnN0IGV4dHJhY3RNb2RlbHMgPSAodmFsdWUpID0+IHtcbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgcmV0dXJuIHsgbW9kZWxzOiBub3JtYWxpemVMaXN0KHZhbHVlKSwgbW9kZWxGaWVsZDogbnVsbCB9O1xuICB9XG4gIGlmIChpc1BsYWluT2JqZWN0KHZhbHVlKSkge1xuICAgIGNvbnN0IG1vZGVsRmllbGQgPSBwaWNrTW9kZWxGaWVsZCh2YWx1ZSk7XG4gICAgY29uc3QgbW9kZWxzID0gbW9kZWxGaWVsZCA/IG5vcm1hbGl6ZUxpc3QodmFsdWVbbW9kZWxGaWVsZF0pIDogW107XG4gICAgcmV0dXJuIHsgbW9kZWxzLCBtb2RlbEZpZWxkIH07XG4gIH1cbiAgaWYgKHZhbHVlICE9IG51bGwgJiYgdmFsdWUgIT09IFwiXCIpIHtcbiAgICByZXR1cm4geyBtb2RlbHM6IG5vcm1hbGl6ZUxpc3QoW3ZhbHVlXSksIG1vZGVsRmllbGQ6IG51bGwgfTtcbiAgfVxuICByZXR1cm4geyBtb2RlbHM6IFtdLCBtb2RlbEZpZWxkOiBudWxsIH07XG59O1xuXG5jb25zdCBleHRyYWN0T2VtTWFwID0gKGRhdGEpID0+IHtcbiAgY29uc3Qgb2VtTWFwID0ge307XG4gIGNvbnN0IG1vZGVsRmllbGRCeU9lbSA9IHt9O1xuICBsZXQgb2VtRmllbGQgPSBudWxsO1xuXG4gIGZvciAoY29uc3Qga2V5IG9mIE9FTV9GSUVMRF9DQU5ESURBVEVTKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YT8uW2tleV0pKSB7XG4gICAgICBvZW1GaWVsZCA9IGtleTtcbiAgICAgIGRhdGFba2V5XS5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgICAgICBpZiAoZW50cnkgPT0gbnVsbCkgcmV0dXJuO1xuICAgICAgICBpZiAoaXNQbGFpbk9iamVjdChlbnRyeSkpIHtcbiAgICAgICAgICBjb25zdCBuYW1lID1cbiAgICAgICAgICAgIGVudHJ5Lm5hbWUgfHxcbiAgICAgICAgICAgIGVudHJ5Lm9lbSB8fFxuICAgICAgICAgICAgZW50cnkuT0VNIHx8XG4gICAgICAgICAgICBlbnRyeS5sYWJlbCB8fFxuICAgICAgICAgICAgZW50cnkudmFsdWU7XG4gICAgICAgICAgaWYgKCFuYW1lKSByZXR1cm47XG4gICAgICAgICAgY29uc3Qgbm9ybWFsaXplZE5hbWUgPSBTdHJpbmcobmFtZSkudHJpbSgpO1xuICAgICAgICAgIGlmICghbm9ybWFsaXplZE5hbWUpIHJldHVybjtcbiAgICAgICAgICBjb25zdCB7IG1vZGVscyB9ID0gZXh0cmFjdE1vZGVscyhlbnRyeS5tb2RlbHMgfHwgZW50cnkubGlzdCB8fCBlbnRyeS5pdGVtcyk7XG4gICAgICAgICAgb2VtTWFwW25vcm1hbGl6ZWROYW1lXSA9IG5vcm1hbGl6ZUxpc3QoW1xuICAgICAgICAgICAgLi4uKG9lbU1hcFtub3JtYWxpemVkTmFtZV0gfHwgW10pLFxuICAgICAgICAgICAgLi4ubW9kZWxzLFxuICAgICAgICAgIF0pO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBub3JtYWxpemVkID0gU3RyaW5nKGVudHJ5IHx8IFwiXCIpLnRyaW0oKTtcbiAgICAgICAgaWYgKCFub3JtYWxpemVkKSByZXR1cm47XG4gICAgICAgIG9lbU1hcFtub3JtYWxpemVkXSA9IG5vcm1hbGl6ZUxpc3QoWy4uLihvZW1NYXBbbm9ybWFsaXplZF0gfHwgW10pXSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKGlzUGxhaW5PYmplY3QoZGF0YT8uW2tleV0pKSB7XG4gICAgICBvZW1GaWVsZCA9IGtleTtcbiAgICAgIE9iamVjdC5lbnRyaWVzKGRhdGFba2V5XSkuZm9yRWFjaCgoW29lbSwgdmFsdWVdKSA9PiB7XG4gICAgICAgIGNvbnN0IHsgbW9kZWxzLCBtb2RlbEZpZWxkIH0gPSBleHRyYWN0TW9kZWxzKHZhbHVlKTtcbiAgICAgICAgb2VtTWFwW29lbV0gPSBub3JtYWxpemVMaXN0KFsuLi4ob2VtTWFwW29lbV0gfHwgW10pLCAuLi5tb2RlbHNdKTtcbiAgICAgICAgaWYgKG1vZGVsRmllbGQpIHtcbiAgICAgICAgICBtb2RlbEZpZWxkQnlPZW1bb2VtXSA9IG1vZGVsRmllbGQ7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGlmICghb2VtRmllbGQpIHtcbiAgICBPYmplY3QuZW50cmllcyhkYXRhIHx8IHt9KS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcbiAgICAgIGlmICghdmFsdWUpIHJldHVybjtcbiAgICAgIGlmIChrZXkuc3RhcnRzV2l0aChcIl9cIikpIHJldHVybjtcbiAgICAgIGlmIChpc1BsYWluT2JqZWN0KHZhbHVlKSB8fCBBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICBjb25zdCB7IG1vZGVscywgbW9kZWxGaWVsZCB9ID0gZXh0cmFjdE1vZGVscyh2YWx1ZSk7XG4gICAgICAgIGlmIChtb2RlbHMubGVuZ3RoIHx8IG1vZGVsRmllbGQpIHtcbiAgICAgICAgICBvZW1NYXBba2V5XSA9IG5vcm1hbGl6ZUxpc3QoWy4uLihvZW1NYXBba2V5XSB8fCBbXSksIC4uLm1vZGVsc10pO1xuICAgICAgICAgIGlmIChtb2RlbEZpZWxkKSB7XG4gICAgICAgICAgICBtb2RlbEZpZWxkQnlPZW1ba2V5XSA9IG1vZGVsRmllbGQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4geyBvZW1NYXAsIG9lbUZpZWxkLCBtb2RlbEZpZWxkQnlPZW0gfTtcbn07XG5cblxuY29uc3QgYnVpbGRDYXRhbG9nTWV0YUZyb21NYXBzID0gKHtcbiAgbW9kYWxpdGllcyA9IFtdLFxuICBvZW1zQnlNb2RhbGl0eSA9IHt9LFxuICBtb2RlbHNCeU1vZGFsaXR5T2VtID0ge30sXG4gIHVzZXNTdWJjb2xsZWN0aW9ucyA9IGZhbHNlLFxuICBzeW5jRGlzYWJsZWQgPSBmYWxzZSxcbiAgc291cmNlID0gXCJjbGllbnRcIixcbn0pID0+IHtcbiAgY29uc3QgbWV0YSA9IHtcbiAgICBvZW1GaWVsZEJ5TW9kYWxpdHk6IHt9LFxuICAgIG1vZGVsRmllbGRCeU1vZGFsaXR5T2VtOiB7fSxcbiAgICBtb2RhbGl0eUtleUJ5TG93ZXI6IHt9LFxuICAgIG9lbUtleUJ5TW9kYWxpdHlMb3dlcjoge30sXG4gICAgbW9kZWxLZXlCeU1vZGFsaXR5T2VtTG93ZXI6IHt9LFxuICAgIHVzZXNTdWJjb2xsZWN0aW9ucyxcbiAgICBzeW5jRGlzYWJsZWQsXG4gICAgc291cmNlLFxuICB9O1xuXG4gIGNvbnN0IG5vcm1hbGl6ZWRNb2RhbGl0aWVzID0gbm9ybWFsaXplTGlzdENhc2VJbnNlbnNpdGl2ZShtb2RhbGl0aWVzKTtcbiAgbm9ybWFsaXplZE1vZGFsaXRpZXMuZm9yRWFjaCgobW9kYWxpdHkpID0+IHtcbiAgICBjb25zdCBtb2RhbGl0eUxvd2VyID0gbm9ybWFsaXplS2V5KG1vZGFsaXR5KTtcbiAgICBtZXRhLm1vZGFsaXR5S2V5QnlMb3dlclttb2RhbGl0eUxvd2VyXSA9IHBpY2tQcmVmZXJyZWRDYXNlKFxuICAgICAgbWV0YS5tb2RhbGl0eUtleUJ5TG93ZXJbbW9kYWxpdHlMb3dlcl0sXG4gICAgICBtb2RhbGl0eVxuICAgICk7XG4gICAgY29uc3Qgb2VtcyA9IG9lbXNCeU1vZGFsaXR5Py5bbW9kYWxpdHldIHx8IFtdO1xuICAgIGNvbnN0IG9lbUxvd2VyTWFwID1cbiAgICAgIG1ldGEub2VtS2V5QnlNb2RhbGl0eUxvd2VyW21vZGFsaXR5TG93ZXJdIHx8IHt9O1xuICAgIG1ldGEub2VtS2V5QnlNb2RhbGl0eUxvd2VyW21vZGFsaXR5TG93ZXJdID0gb2VtTG93ZXJNYXA7XG4gICAgY29uc3QgbW9kZWxMb3dlck1hcCA9XG4gICAgICBtZXRhLm1vZGVsS2V5QnlNb2RhbGl0eU9lbUxvd2VyW21vZGFsaXR5TG93ZXJdIHx8IHt9O1xuICAgIG1ldGEubW9kZWxLZXlCeU1vZGFsaXR5T2VtTG93ZXJbbW9kYWxpdHlMb3dlcl0gPSBtb2RlbExvd2VyTWFwO1xuXG4gICAgb2Vtcy5mb3JFYWNoKChvZW0pID0+IHtcbiAgICAgIGNvbnN0IG9lbUxvd2VyID0gbm9ybWFsaXplS2V5KG9lbSk7XG4gICAgICBvZW1Mb3dlck1hcFtvZW1Mb3dlcl0gPSBwaWNrUHJlZmVycmVkQ2FzZShvZW1Mb3dlck1hcFtvZW1Mb3dlcl0sIG9lbSk7XG4gICAgICBjb25zdCBtb2RlbHMgPSBtb2RlbHNCeU1vZGFsaXR5T2VtPy5bbW9kYWxpdHldPy5bb2VtXSB8fCBbXTtcbiAgICAgIG1vZGVsTG93ZXJNYXBbb2VtTG93ZXJdID0gbW9kZWxMb3dlck1hcFtvZW1Mb3dlcl0gfHwge307XG4gICAgICBtb2RlbHMuZm9yRWFjaCgobW9kZWwpID0+IHtcbiAgICAgICAgY29uc3QgbW9kZWxMb3dlciA9IG5vcm1hbGl6ZUtleShtb2RlbCk7XG4gICAgICAgIGlmICghbW9kZWxMb3dlcikgcmV0dXJuO1xuICAgICAgICBtb2RlbExvd2VyTWFwW29lbUxvd2VyXVttb2RlbExvd2VyXSA9IHBpY2tQcmVmZXJyZWRDYXNlKFxuICAgICAgICAgIG1vZGVsTG93ZXJNYXBbb2VtTG93ZXJdW21vZGVsTG93ZXJdLFxuICAgICAgICAgIG1vZGVsXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgcmV0dXJuIHtcbiAgICBtb2RhbGl0aWVzOiBub3JtYWxpemVkTW9kYWxpdGllcyxcbiAgICBvZW1zQnlNb2RhbGl0eSxcbiAgICBtb2RlbHNCeU1vZGFsaXR5T2VtLFxuICAgIG1ldGEsXG4gIH07XG59O1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZmV0Y2hUcmFja2VyQ2F0YWxvZygpIHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcbiAgICAgICAgYC9hcGkvdHJhY2tlci9jYXRhbG9nP3RzPSR7RGF0ZS5ub3coKX1gLFxuICAgICAgICB7IGNhY2hlOiBcIm5vLXN0b3JlXCIgfVxuICAgICAgKTtcbiAgICAgIGlmIChyZXNwb25zZS5vaykge1xuICAgICAgICBjb25zdCBwYXlsb2FkID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICBpZiAocGF5bG9hZD8ubW9kYWxpdGllcykge1xuICAgICAgICAgIHJldHVybiBidWlsZENhdGFsb2dNZXRhRnJvbU1hcHMoe1xuICAgICAgICAgICAgbW9kYWxpdGllczogcGF5bG9hZC5tb2RhbGl0aWVzIHx8IFtdLFxuICAgICAgICAgICAgb2Vtc0J5TW9kYWxpdHk6IHBheWxvYWQub2Vtc0J5TW9kYWxpdHkgfHwge30sXG4gICAgICAgICAgICBtb2RlbHNCeU1vZGFsaXR5T2VtOiBwYXlsb2FkLm1vZGVsc0J5TW9kYWxpdHlPZW0gfHwge30sXG4gICAgICAgICAgICB1c2VzU3ViY29sbGVjdGlvbnM6IEJvb2xlYW4ocGF5bG9hZC51c2VzU3ViY29sbGVjdGlvbnMpLFxuICAgICAgICAgICAgc3luY0Rpc2FibGVkOiBmYWxzZSxcbiAgICAgICAgICAgIHNvdXJjZTogXCJzZXJ2ZXJcIixcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLndhcm4oXCJUcmFja2VyIGNhdGFsb2cgQVBJIGZhbGxiYWNrOlwiLCBlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgZGIgPSBmaXJlYmFzZS5maXJlc3RvcmUoKTtcbiAgbGV0IHNuYXA7XG4gIHRyeSB7XG4gICAgc25hcCA9IGF3YWl0IGRiLmNvbGxlY3Rpb24oXCJUcmFja2VyXCIpLmdldCh7IHNvdXJjZTogXCJzZXJ2ZXJcIiB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBzbmFwID0gYXdhaXQgZGIuY29sbGVjdGlvbihcIlRyYWNrZXJcIikuZ2V0KCk7XG4gIH1cbiAgY29uc29sZS5sb2coXG4gICAgXCJUcmFja2VyIGNhdGFsb2cgY2xpZW50IGRvY3M6XCIsXG4gICAgc25hcC5kb2NzLm1hcCgoZG9jKSA9PiBkb2MuaWQpXG4gICk7XG5cbiAgY29uc3QgbW9kYWxpdGllcyA9IFtdO1xuICBjb25zdCBvZW1zQnlNb2RhbGl0eSA9IHt9O1xuICBjb25zdCBtb2RlbHNCeU1vZGFsaXR5T2VtID0ge307XG4gIGNvbnN0IG1ldGEgPSB7XG4gICAgb2VtRmllbGRCeU1vZGFsaXR5OiB7fSxcbiAgICBtb2RlbEZpZWxkQnlNb2RhbGl0eU9lbToge30sXG4gICAgbW9kYWxpdHlLZXlCeUxvd2VyOiB7fSxcbiAgICBvZW1LZXlCeU1vZGFsaXR5TG93ZXI6IHt9LFxuICAgIG1vZGVsS2V5QnlNb2RhbGl0eU9lbUxvd2VyOiB7fSxcbiAgfTtcblxuICBzbmFwLmZvckVhY2goKGRvYykgPT4ge1xuICAgIGNvbnN0IG1vZGFsaXR5ID0gZG9jLmlkO1xuICAgIGNvbnN0IG1vZGFsaXR5TG93ZXIgPSBub3JtYWxpemVLZXkobW9kYWxpdHkpO1xuICAgIGNvbnN0IGV4aXN0aW5nTW9kYWxpdHkgPSBtZXRhLm1vZGFsaXR5S2V5QnlMb3dlclttb2RhbGl0eUxvd2VyXTtcbiAgICBjb25zdCBjYW5vbmljYWxNb2RhbGl0eSA9IHBpY2tQcmVmZXJyZWRDYXNlKGV4aXN0aW5nTW9kYWxpdHksIG1vZGFsaXR5KTtcbiAgICBtZXRhLm1vZGFsaXR5S2V5QnlMb3dlclttb2RhbGl0eUxvd2VyXSA9IGNhbm9uaWNhbE1vZGFsaXR5O1xuICAgIGNvbnN0IGRhdGEgPSBkb2MuZGF0YSgpIHx8IHt9O1xuICAgIGNvbnN0IHsgb2VtTWFwLCBvZW1GaWVsZCwgbW9kZWxGaWVsZEJ5T2VtIH0gPSBleHRyYWN0T2VtTWFwKGRhdGEpO1xuXG4gICAgaWYgKGV4aXN0aW5nTW9kYWxpdHkgJiYgZXhpc3RpbmdNb2RhbGl0eSAhPT0gY2Fub25pY2FsTW9kYWxpdHkpIHtcbiAgICAgIG9lbXNCeU1vZGFsaXR5W2Nhbm9uaWNhbE1vZGFsaXR5XSA9IG5vcm1hbGl6ZUxpc3RDYXNlSW5zZW5zaXRpdmUoW1xuICAgICAgICAuLi4ob2Vtc0J5TW9kYWxpdHlbZXhpc3RpbmdNb2RhbGl0eV0gfHwgW10pLFxuICAgICAgICAuLi4ob2Vtc0J5TW9kYWxpdHlbY2Fub25pY2FsTW9kYWxpdHldIHx8IFtdKSxcbiAgICAgIF0pO1xuICAgICAgbW9kZWxzQnlNb2RhbGl0eU9lbVtjYW5vbmljYWxNb2RhbGl0eV0gPSB7XG4gICAgICAgIC4uLihtb2RlbHNCeU1vZGFsaXR5T2VtW2V4aXN0aW5nTW9kYWxpdHldIHx8IHt9KSxcbiAgICAgICAgLi4uKG1vZGVsc0J5TW9kYWxpdHlPZW1bY2Fub25pY2FsTW9kYWxpdHldIHx8IHt9KSxcbiAgICAgIH07XG4gICAgICBtZXRhLm1vZGVsRmllbGRCeU1vZGFsaXR5T2VtW2Nhbm9uaWNhbE1vZGFsaXR5XSA9IHtcbiAgICAgICAgLi4uKG1ldGEubW9kZWxGaWVsZEJ5TW9kYWxpdHlPZW1bZXhpc3RpbmdNb2RhbGl0eV0gfHwge30pLFxuICAgICAgICAuLi4obWV0YS5tb2RlbEZpZWxkQnlNb2RhbGl0eU9lbVtjYW5vbmljYWxNb2RhbGl0eV0gfHwge30pLFxuICAgICAgfTtcbiAgICAgIGlmICghbWV0YS5vZW1GaWVsZEJ5TW9kYWxpdHlbY2Fub25pY2FsTW9kYWxpdHldKSB7XG4gICAgICAgIG1ldGEub2VtRmllbGRCeU1vZGFsaXR5W2Nhbm9uaWNhbE1vZGFsaXR5XSA9XG4gICAgICAgICAgbWV0YS5vZW1GaWVsZEJ5TW9kYWxpdHlbZXhpc3RpbmdNb2RhbGl0eV0gfHwgb2VtRmllbGQ7XG4gICAgICB9XG4gICAgICBkZWxldGUgb2Vtc0J5TW9kYWxpdHlbZXhpc3RpbmdNb2RhbGl0eV07XG4gICAgICBkZWxldGUgbW9kZWxzQnlNb2RhbGl0eU9lbVtleGlzdGluZ01vZGFsaXR5XTtcbiAgICAgIGRlbGV0ZSBtZXRhLm9lbUZpZWxkQnlNb2RhbGl0eVtleGlzdGluZ01vZGFsaXR5XTtcbiAgICAgIGRlbGV0ZSBtZXRhLm1vZGVsRmllbGRCeU1vZGFsaXR5T2VtW2V4aXN0aW5nTW9kYWxpdHldO1xuICAgIH1cblxuICAgIG1vZGFsaXRpZXMucHVzaChjYW5vbmljYWxNb2RhbGl0eSk7XG4gICAgaWYgKCFtZXRhLm9lbUZpZWxkQnlNb2RhbGl0eVtjYW5vbmljYWxNb2RhbGl0eV0pIHtcbiAgICAgIG1ldGEub2VtRmllbGRCeU1vZGFsaXR5W2Nhbm9uaWNhbE1vZGFsaXR5XSA9IG9lbUZpZWxkO1xuICAgIH1cbiAgICBtZXRhLm1vZGVsRmllbGRCeU1vZGFsaXR5T2VtW2Nhbm9uaWNhbE1vZGFsaXR5XSA9IHtcbiAgICAgIC4uLihtZXRhLm1vZGVsRmllbGRCeU1vZGFsaXR5T2VtW2Nhbm9uaWNhbE1vZGFsaXR5XSB8fCB7fSksXG4gICAgICAuLi4obW9kZWxGaWVsZEJ5T2VtIHx8IHt9KSxcbiAgICB9O1xuXG4gICAgY29uc3Qgb2VtcyA9IE9iamVjdC5rZXlzKG9lbU1hcCk7XG4gICAgY29uc3QgbWVyZ2VkT2VtcyA9IG5vcm1hbGl6ZUxpc3RDYXNlSW5zZW5zaXRpdmUoW1xuICAgICAgLi4uKG9lbXNCeU1vZGFsaXR5W2Nhbm9uaWNhbE1vZGFsaXR5XSB8fCBbXSksXG4gICAgICAuLi5vZW1zLFxuICAgIF0pO1xuICAgIG9lbXNCeU1vZGFsaXR5W2Nhbm9uaWNhbE1vZGFsaXR5XSA9IG1lcmdlZE9lbXM7XG4gICAgbW9kZWxzQnlNb2RhbGl0eU9lbVtjYW5vbmljYWxNb2RhbGl0eV0gPVxuICAgICAgbW9kZWxzQnlNb2RhbGl0eU9lbVtjYW5vbmljYWxNb2RhbGl0eV0gfHwge307XG4gICAgY29uc3Qgb2VtTG93ZXJNYXAgPVxuICAgICAgbWV0YS5vZW1LZXlCeU1vZGFsaXR5TG93ZXJbbW9kYWxpdHlMb3dlcl0gfHwge307XG4gICAgbWV0YS5vZW1LZXlCeU1vZGFsaXR5TG93ZXJbbW9kYWxpdHlMb3dlcl0gPSBvZW1Mb3dlck1hcDtcbiAgICBjb25zdCBtb2RlbExvd2VyTWFwID1cbiAgICAgIG1ldGEubW9kZWxLZXlCeU1vZGFsaXR5T2VtTG93ZXJbbW9kYWxpdHlMb3dlcl0gfHwge307XG4gICAgbWV0YS5tb2RlbEtleUJ5TW9kYWxpdHlPZW1Mb3dlclttb2RhbGl0eUxvd2VyXSA9IG1vZGVsTG93ZXJNYXA7XG4gICAgb2Vtcy5mb3JFYWNoKChvZW0pID0+IHtcbiAgICAgIGNvbnN0IG9lbUxvd2VyID0gbm9ybWFsaXplS2V5KG9lbSk7XG4gICAgICBjb25zdCBleGlzdGluZ09lbSA9IG9lbUxvd2VyTWFwW29lbUxvd2VyXTtcbiAgICAgIGNvbnN0IGNhbm9uaWNhbE9lbSA9IHBpY2tQcmVmZXJyZWRDYXNlKGV4aXN0aW5nT2VtLCBvZW0pO1xuICAgICAgb2VtTG93ZXJNYXBbb2VtTG93ZXJdID0gY2Fub25pY2FsT2VtO1xuICAgICAgaWYgKGV4aXN0aW5nT2VtICYmIGV4aXN0aW5nT2VtICE9PSBjYW5vbmljYWxPZW0pIHtcbiAgICAgICAgbW9kZWxzQnlNb2RhbGl0eU9lbVtjYW5vbmljYWxNb2RhbGl0eV1bY2Fub25pY2FsT2VtXSA9IG5vcm1hbGl6ZUxpc3RDYXNlSW5zZW5zaXRpdmUoW1xuICAgICAgICAgIC4uLihtb2RlbHNCeU1vZGFsaXR5T2VtW2Nhbm9uaWNhbE1vZGFsaXR5XVtleGlzdGluZ09lbV0gfHwgW10pLFxuICAgICAgICAgIC4uLihtb2RlbHNCeU1vZGFsaXR5T2VtW2Nhbm9uaWNhbE1vZGFsaXR5XVtjYW5vbmljYWxPZW1dIHx8IFtdKSxcbiAgICAgICAgXSk7XG4gICAgICAgIGRlbGV0ZSBtb2RlbHNCeU1vZGFsaXR5T2VtW2Nhbm9uaWNhbE1vZGFsaXR5XVtleGlzdGluZ09lbV07XG4gICAgICB9XG4gICAgICBjb25zdCBleGlzdGluZ01vZGVscyA9XG4gICAgICAgIG1vZGVsc0J5TW9kYWxpdHlPZW1bY2Fub25pY2FsTW9kYWxpdHldW2Nhbm9uaWNhbE9lbV0gfHwgW107XG4gICAgICBjb25zdCBtZXJnZWRNb2RlbHMgPSBub3JtYWxpemVMaXN0Q2FzZUluc2Vuc2l0aXZlKFtcbiAgICAgICAgLi4uZXhpc3RpbmdNb2RlbHMsXG4gICAgICAgIC4uLihvZW1NYXBbb2VtXSB8fCBbXSksXG4gICAgICBdKTtcbiAgICAgIG1vZGVsc0J5TW9kYWxpdHlPZW1bY2Fub25pY2FsTW9kYWxpdHldW2Nhbm9uaWNhbE9lbV0gPSBtZXJnZWRNb2RlbHM7XG4gICAgICBtb2RlbExvd2VyTWFwW29lbUxvd2VyXSA9IG1vZGVsTG93ZXJNYXBbb2VtTG93ZXJdIHx8IHt9O1xuICAgICAgbWVyZ2VkTW9kZWxzLmZvckVhY2goKG1vZGVsKSA9PiB7XG4gICAgICAgIG1vZGVsTG93ZXJNYXBbb2VtTG93ZXJdW25vcm1hbGl6ZUtleShtb2RlbCldID0gbW9kZWw7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgcmV0dXJuIGJ1aWxkQ2F0YWxvZ01ldGFGcm9tTWFwcyh7XG4gICAgbW9kYWxpdGllcyxcbiAgICBvZW1zQnlNb2RhbGl0eSxcbiAgICBtb2RlbHNCeU1vZGFsaXR5T2VtLFxuICAgIHVzZXNTdWJjb2xsZWN0aW9uczogdHJ1ZSxcbiAgICBzeW5jRGlzYWJsZWQ6IGZhbHNlLFxuICAgIHNvdXJjZTogXCJjbGllbnRcIixcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBidWlsZEFsbE9lbXMoY2F0YWxvZykge1xuICBjb25zdCBtYXAgPSBuZXcgTWFwKCk7XG4gIE9iamVjdC52YWx1ZXMoY2F0YWxvZz8ub2Vtc0J5TW9kYWxpdHkgfHwge30pLmZvckVhY2goKG9lbXMpID0+IHtcbiAgICAob2VtcyB8fCBbXSkuZm9yRWFjaCgob2VtKSA9PiB7XG4gICAgICBjb25zdCBrZXkgPSBub3JtYWxpemVLZXkob2VtKTtcbiAgICAgIGlmICgha2V5KSByZXR1cm47XG4gICAgICBjb25zdCBjdXJyZW50ID0gbWFwLmdldChrZXkpO1xuICAgICAgbWFwLnNldChrZXksIHBpY2tQcmVmZXJyZWRDYXNlKGN1cnJlbnQsIG9lbSkpO1xuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIEFycmF5LmZyb20obWFwLnZhbHVlcygpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkTW9kZWxzRm9yU2VsZWN0aW9uKGNhdGFsb2csIG1vZGFsaXRpZXMgPSBbXSwgb2VtcyA9IFtdKSB7XG4gIGNvbnN0IG1vZGVsU2V0ID0gbmV3IFNldCgpO1xuICBjb25zdCBtb2RhbHMgPSBub3JtYWxpemVMaXN0KG1vZGFsaXRpZXMpO1xuICBjb25zdCBvZW1MaXN0ID0gbm9ybWFsaXplTGlzdChvZW1zKTtcbiAgbW9kYWxzLmZvckVhY2goKG1vZGFsaXR5KSA9PiB7XG4gICAgY29uc3QgbW9kYWxpdHlMb3dlciA9IG5vcm1hbGl6ZUtleShtb2RhbGl0eSk7XG4gICAgY29uc3QgY2Fub25pY2FsTW9kYWxpdHkgPVxuICAgICAgY2F0YWxvZz8ubWV0YT8ubW9kYWxpdHlLZXlCeUxvd2VyPy5bbW9kYWxpdHlMb3dlcl0gfHwgbW9kYWxpdHk7XG4gICAgY29uc3Qgb2VtTWFwID0gY2F0YWxvZz8ubW9kZWxzQnlNb2RhbGl0eU9lbT8uW2Nhbm9uaWNhbE1vZGFsaXR5XSB8fCB7fTtcbiAgICBvZW1MaXN0LmZvckVhY2goKG9lbSkgPT4ge1xuICAgICAgY29uc3Qgb2VtTG93ZXIgPSBub3JtYWxpemVLZXkob2VtKTtcbiAgICAgIGNvbnN0IGNhbm9uaWNhbE9lbSA9XG4gICAgICAgIGNhdGFsb2c/Lm1ldGE/Lm9lbUtleUJ5TW9kYWxpdHlMb3dlcj8uW21vZGFsaXR5TG93ZXJdPy5bb2VtTG93ZXJdIHx8IG9lbTtcbiAgICAgIGNvbnN0IG1vZGVscyA9IG9lbU1hcD8uW2Nhbm9uaWNhbE9lbV0gfHwgW107XG4gICAgICBtb2RlbHMuZm9yRWFjaCgobW9kZWwpID0+IG1vZGVsU2V0LmFkZChtb2RlbCkpO1xuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIEFycmF5LmZyb20obW9kZWxTZXQpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc3luY1RyYWNrZXJGcm9tU2VsZWN0aW9ucyh7XG4gIHNlbGVjdGlvbnMsXG4gIGNhdGFsb2csXG59KSB7XG4gIGNvbnN0IGRiID0gZmlyZWJhc2UuZmlyZXN0b3JlKCk7XG4gIGNvbnN0IHRyYWNrZXJSZWYgPSBkYi5jb2xsZWN0aW9uKFwiVHJhY2tlclwiKTtcbiAgY29uc3Qgc2VsZWN0ZWRNb2RhbGl0aWVzID0gbm9ybWFsaXplTGlzdChzZWxlY3Rpb25zPy5tb2RhbGl0aWVzIHx8IFtdKTtcbiAgY29uc3Qgc2VsZWN0ZWRPZW1zID0gbm9ybWFsaXplTGlzdChzZWxlY3Rpb25zPy5vZW1zIHx8IFtdKTtcbiAgY29uc3Qgc2VsZWN0ZWRNb2RlbHMgPSBub3JtYWxpemVMaXN0KHNlbGVjdGlvbnM/Lm1vZGVscyB8fCBbXSk7XG5cbiAgaWYgKCFzZWxlY3RlZE1vZGFsaXRpZXMubGVuZ3RoKSByZXR1cm4gZmFsc2U7XG4gIGlmIChjYXRhbG9nPy5tZXRhPy5zeW5jRGlzYWJsZWQpIHJldHVybiBmYWxzZTtcblxuICBjb25zdCBvcHMgPSBbXTtcblxuICBmb3IgKGNvbnN0IG1vZGFsaXR5IG9mIHNlbGVjdGVkTW9kYWxpdGllcykge1xuICAgIGNvbnN0IG1vZGFsaXR5TG93ZXIgPSBub3JtYWxpemVLZXkobW9kYWxpdHkpO1xuICAgIGNvbnN0IGNhbm9uaWNhbE1vZGFsaXR5ID1cbiAgICAgIGNhdGFsb2c/Lm1ldGE/Lm1vZGFsaXR5S2V5QnlMb3dlcj8uW21vZGFsaXR5TG93ZXJdIHx8IG1vZGFsaXR5TG93ZXI7XG4gICAgY29uc3QgZG9jUmVmID0gdHJhY2tlclJlZi5kb2MoY2Fub25pY2FsTW9kYWxpdHkpO1xuICAgIGNvbnN0IGV4aXN0aW5nT2Vtc1JhdyA9IGNhdGFsb2c/Lm9lbXNCeU1vZGFsaXR5Py5bY2Fub25pY2FsTW9kYWxpdHldIHx8IFtdO1xuICAgIGNvbnN0IGV4aXN0aW5nT2Vtc0xvd2VyID0gbmV3IFNldChcbiAgICAgIGV4aXN0aW5nT2Vtc1Jhdy5tYXAoKHZhbHVlKSA9PiBub3JtYWxpemVLZXkodmFsdWUpKVxuICAgICk7XG5cbiAgICBjb25zdCBvZW1GaWVsZCA9XG4gICAgICBjYXRhbG9nPy5tZXRhPy5vZW1GaWVsZEJ5TW9kYWxpdHk/LltjYW5vbmljYWxNb2RhbGl0eV0gfHxcbiAgICAgIERFRkFVTFRfT0VNX0ZJRUxEO1xuXG4gICAgaWYgKFxuICAgICAgIWNhdGFsb2c/Lm1vZGFsaXRpZXM/LnNvbWUoXG4gICAgICAgIChleGlzdGluZykgPT4gbm9ybWFsaXplS2V5KGV4aXN0aW5nKSA9PT0gbW9kYWxpdHlMb3dlclxuICAgICAgKVxuICAgICkge1xuICAgICAgb3BzLnB1c2goZG9jUmVmLnNldCh7IFtERUZBVUxUX09FTV9GSUVMRF06IHt9IH0sIHsgbWVyZ2U6IHRydWUgfSkpO1xuICAgIH1cblxuICAgIGZvciAoY29uc3Qgb2VtIG9mIHNlbGVjdGVkT2Vtcykge1xuICAgICAgY29uc3Qgb2VtTG93ZXIgPSBub3JtYWxpemVLZXkob2VtKTtcbiAgICAgIGNvbnN0IGNhbm9uaWNhbE9lbSA9XG4gICAgICAgIGNhdGFsb2c/Lm1ldGE/Lm9lbUtleUJ5TW9kYWxpdHlMb3dlcj8uW21vZGFsaXR5TG93ZXJdPy5bb2VtTG93ZXJdIHx8XG4gICAgICAgIG9lbUxvd2VyO1xuICAgICAgaWYgKCFleGlzdGluZ09lbXNMb3dlci5oYXMob2VtTG93ZXIpKSB7XG4gICAgICAgIG9wcy5wdXNoKFxuICAgICAgICAgIGRvY1JlZi5zZXQoeyBbb2VtRmllbGRdOiB7IFtjYW5vbmljYWxPZW1dOiBbXSB9IH0sIHsgbWVyZ2U6IHRydWUgfSlcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IG9lbSBvZiBzZWxlY3RlZE9lbXMpIHtcbiAgICAgIGNvbnN0IG9lbUxvd2VyID0gbm9ybWFsaXplS2V5KG9lbSk7XG4gICAgICBjb25zdCBjYW5vbmljYWxPZW0gPVxuICAgICAgICBjYXRhbG9nPy5tZXRhPy5vZW1LZXlCeU1vZGFsaXR5TG93ZXI/Llttb2RhbGl0eUxvd2VyXT8uW29lbUxvd2VyXSB8fFxuICAgICAgICBvZW1Mb3dlcjtcbiAgICAgIGNvbnN0IGtub3duTW9kZWxzID1cbiAgICAgICAgY2F0YWxvZz8ubW9kZWxzQnlNb2RhbGl0eU9lbT8uW2Nhbm9uaWNhbE1vZGFsaXR5XT8uW2Nhbm9uaWNhbE9lbV0gfHwgW107XG4gICAgICBjb25zdCBrbm93bkxvd2VyID0gbmV3IFNldChcbiAgICAgICAga25vd25Nb2RlbHMubWFwKCh2YWx1ZSkgPT4gbm9ybWFsaXplS2V5KHZhbHVlKSlcbiAgICAgICk7XG4gICAgICBjb25zdCBtb2RlbENhc2VNYXAgPVxuICAgICAgICBjYXRhbG9nPy5tZXRhPy5tb2RlbEtleUJ5TW9kYWxpdHlPZW1Mb3dlcj8uW21vZGFsaXR5TG93ZXJdPy5bb2VtTG93ZXJdIHx8XG4gICAgICAgIHt9O1xuICAgICAgY29uc3QgbW9kZWxGaWVsZCA9XG4gICAgICAgIGNhdGFsb2c/Lm1ldGE/Lm1vZGVsRmllbGRCeU1vZGFsaXR5T2VtPy5bY2Fub25pY2FsTW9kYWxpdHldPy5bXG4gICAgICAgICAgY2Fub25pY2FsT2VtXG4gICAgICAgIF0gfHwgbnVsbDtcbiAgICAgIGZvciAoY29uc3QgbW9kZWwgb2Ygc2VsZWN0ZWRNb2RlbHMpIHtcbiAgICAgICAgY29uc3QgbW9kZWxMb3dlciA9IG5vcm1hbGl6ZUtleShtb2RlbCk7XG4gICAgICAgIGlmICghbW9kZWxMb3dlciB8fCBrbm93bkxvd2VyLmhhcyhtb2RlbExvd2VyKSkgY29udGludWU7XG4gICAgICAgIGNvbnN0IGNhbm9uaWNhbE1vZGVsID0gbW9kZWxDYXNlTWFwW21vZGVsTG93ZXJdIHx8IG1vZGVsO1xuICAgICAgICBjb25zdCBwYXRoID0gbW9kZWxGaWVsZFxuICAgICAgICAgID8gYCR7b2VtRmllbGR9LiR7Y2Fub25pY2FsT2VtfS4ke21vZGVsRmllbGR9YFxuICAgICAgICAgIDogYCR7b2VtRmllbGR9LiR7Y2Fub25pY2FsT2VtfWA7XG4gICAgICAgIG9wcy5wdXNoKFxuICAgICAgICAgIGRvY1JlZi51cGRhdGUoe1xuICAgICAgICAgICAgW3BhdGhdOiBmaXJlYmFzZS5maXJlc3RvcmUuRmllbGRWYWx1ZS5hcnJheVVuaW9uKGNhbm9uaWNhbE1vZGVsKSxcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmIChvcHMubGVuZ3RoKSB7XG4gICAgYXdhaXQgUHJvbWlzZS5hbGxTZXR0bGVkKG9wcyk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGVsZXRlVHJhY2tlck9lbSh7IG9lbSwgY2F0YWxvZyB9KSB7XG4gIGlmICghb2VtKSByZXR1cm47XG4gIGNvbnN0IGRiID0gZmlyZWJhc2UuZmlyZXN0b3JlKCk7XG4gIGNvbnN0IHRyYWNrZXJSZWYgPSBkYi5jb2xsZWN0aW9uKFwiVHJhY2tlclwiKTtcbiAgY29uc3QgbW9kYWxpdGllcyA9IGNhdGFsb2c/Lm1vZGFsaXRpZXMgfHwgW107XG4gIGNvbnN0IHVzZXNTdWJjb2xsZWN0aW9ucyA9IEJvb2xlYW4oY2F0YWxvZz8ubWV0YT8udXNlc1N1YmNvbGxlY3Rpb25zKTtcbiAgY29uc3Qgb3BzID0gbW9kYWxpdGllcy5tYXAoKG1vZGFsaXR5KSA9PiB7XG4gICAgY29uc3QgbW9kYWxpdHlMb3dlciA9IG5vcm1hbGl6ZUtleShtb2RhbGl0eSk7XG4gICAgY29uc3QgY2Fub25pY2FsTW9kYWxpdHkgPVxuICAgICAgY2F0YWxvZz8ubWV0YT8ubW9kYWxpdHlLZXlCeUxvd2VyPy5bbW9kYWxpdHlMb3dlcl0gfHwgbW9kYWxpdHk7XG4gICAgY29uc3QgZG9jUmVmID0gdHJhY2tlclJlZi5kb2MoY2Fub25pY2FsTW9kYWxpdHkpO1xuICAgIGNvbnN0IGNhbm9uaWNhbE9lbSA9XG4gICAgICBjYXRhbG9nPy5tZXRhPy5vZW1LZXlCeU1vZGFsaXR5TG93ZXI/Llttb2RhbGl0eUxvd2VyXT8uW1xuICAgICAgICBub3JtYWxpemVLZXkob2VtKVxuICAgICAgXSB8fCBvZW07XG4gICAgaWYgKHVzZXNTdWJjb2xsZWN0aW9ucykge1xuICAgICAgcmV0dXJuIGRvY1JlZlxuICAgICAgICAuY29sbGVjdGlvbihjYW5vbmljYWxPZW0pXG4gICAgICAgIC5nZXQoKVxuICAgICAgICAudGhlbigoc25hcCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGRlbGV0aW9ucyA9IFtdO1xuICAgICAgICAgIHNuYXAuZm9yRWFjaCgoZG9jKSA9PiB7XG4gICAgICAgICAgICBkZWxldGlvbnMucHVzaChkb2MucmVmLmRlbGV0ZSgpKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGxTZXR0bGVkKGRlbGV0aW9ucyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoKSA9PiBudWxsKTtcbiAgICB9XG4gICAgY29uc3Qgb2VtRmllbGQgPVxuICAgICAgY2F0YWxvZz8ubWV0YT8ub2VtRmllbGRCeU1vZGFsaXR5Py5bY2Fub25pY2FsTW9kYWxpdHldIHx8XG4gICAgICBERUZBVUxUX09FTV9GSUVMRDtcbiAgICBjb25zdCB1cGRhdGUgPSB7XG4gICAgICBbYCR7b2VtRmllbGR9LiR7Y2Fub25pY2FsT2VtfWBdOiBmaXJlYmFzZS5maXJlc3RvcmUuRmllbGRWYWx1ZS5kZWxldGUoKSxcbiAgICB9O1xuICAgIGlmICghY2F0YWxvZz8ubWV0YT8ub2VtRmllbGRCeU1vZGFsaXR5Py5bY2Fub25pY2FsTW9kYWxpdHldKSB7XG4gICAgICB1cGRhdGVbY2Fub25pY2FsT2VtXSA9IGZpcmViYXNlLmZpcmVzdG9yZS5GaWVsZFZhbHVlLmRlbGV0ZSgpO1xuICAgIH1cbiAgICByZXR1cm4gZG9jUmVmLnVwZGF0ZSh1cGRhdGUpLmNhdGNoKCgpID0+IG51bGwpO1xuICB9KTtcbiAgYXdhaXQgUHJvbWlzZS5hbGxTZXR0bGVkKG9wcyk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkZWxldGVUcmFja2VyTW9kZWwoe1xuICBtb2RhbGl0eSxcbiAgb2VtLFxuICBtb2RlbCxcbiAgY2F0YWxvZyxcbn0pIHtcbiAgaWYgKCFtb2RhbGl0eSB8fCAhb2VtIHx8ICFtb2RlbCkgcmV0dXJuO1xuICBjb25zdCBkYiA9IGZpcmViYXNlLmZpcmVzdG9yZSgpO1xuICBjb25zdCBtb2RhbGl0eUxvd2VyID0gbm9ybWFsaXplS2V5KG1vZGFsaXR5KTtcbiAgY29uc3QgY2Fub25pY2FsTW9kYWxpdHkgPVxuICAgIGNhdGFsb2c/Lm1ldGE/Lm1vZGFsaXR5S2V5QnlMb3dlcj8uW21vZGFsaXR5TG93ZXJdIHx8IG1vZGFsaXR5O1xuICBjb25zdCBkb2NSZWYgPSBkYi5jb2xsZWN0aW9uKFwiVHJhY2tlclwiKS5kb2MoY2Fub25pY2FsTW9kYWxpdHkpO1xuICBjb25zdCBjYW5vbmljYWxPZW0gPVxuICAgIGNhdGFsb2c/Lm1ldGE/Lm9lbUtleUJ5TW9kYWxpdHlMb3dlcj8uW21vZGFsaXR5TG93ZXJdPy5bXG4gICAgICBub3JtYWxpemVLZXkob2VtKVxuICAgIF0gfHwgb2VtO1xuICBpZiAoY2F0YWxvZz8ubWV0YT8udXNlc1N1YmNvbGxlY3Rpb25zKSB7XG4gICAgY29uc3QgbW9kZWxLZXkgPSBub3JtYWxpemVLZXkobW9kZWwpO1xuICAgIGF3YWl0IGRvY1JlZlxuICAgICAgLmNvbGxlY3Rpb24oY2Fub25pY2FsT2VtKVxuICAgICAgLmRvYyhtb2RlbEtleSlcbiAgICAgIC5kZWxldGUoKVxuICAgICAgLmNhdGNoKCgpID0+IG51bGwpO1xuICAgIHJldHVybjtcbiAgfVxuICBjb25zdCBvZW1GaWVsZCA9XG4gICAgY2F0YWxvZz8ubWV0YT8ub2VtRmllbGRCeU1vZGFsaXR5Py5bY2Fub25pY2FsTW9kYWxpdHldIHx8XG4gICAgREVGQVVMVF9PRU1fRklFTEQ7XG4gIGNvbnN0IG1vZGVsRmllbGQgPVxuICAgIGNhdGFsb2c/Lm1ldGE/Lm1vZGVsRmllbGRCeU1vZGFsaXR5T2VtPy5bY2Fub25pY2FsTW9kYWxpdHldPy5bXG4gICAgICBjYW5vbmljYWxPZW1cbiAgICBdIHx8IG51bGw7XG4gIGNvbnN0IHBhdGggPSBtb2RlbEZpZWxkXG4gICAgPyBgJHtvZW1GaWVsZH0uJHtjYW5vbmljYWxPZW19LiR7bW9kZWxGaWVsZH1gXG4gICAgOiBgJHtvZW1GaWVsZH0uJHtjYW5vbmljYWxPZW19YDtcbiAgYXdhaXQgZG9jUmVmLnVwZGF0ZSh7XG4gICAgW3BhdGhdOiBmaXJlYmFzZS5maXJlc3RvcmUuRmllbGRWYWx1ZS5hcnJheVJlbW92ZShtb2RlbCksXG4gIH0pO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==