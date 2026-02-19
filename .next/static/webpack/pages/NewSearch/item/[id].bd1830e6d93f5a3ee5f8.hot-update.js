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
            return fetch("/api/tracker/catalog");

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
            _context.next = 19;
            return db.collection("Tracker").get();

          case 19:
            snap = _context.sent;
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

          case 27:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 13]]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vdXRpbHMvdHJhY2tlckNhdGFsb2cuanMiXSwibmFtZXMiOlsiT0VNX0ZJRUxEX0NBTkRJREFURVMiLCJNT0RFTF9GSUVMRF9DQU5ESURBVEVTIiwiREVGQVVMVF9PRU1fRklFTEQiLCJpc1BsYWluT2JqZWN0IiwidmFsdWUiLCJBcnJheSIsImlzQXJyYXkiLCJEYXRlIiwibm9ybWFsaXplS2V5IiwiU3RyaW5nIiwidHJpbSIsInRvTG93ZXJDYXNlIiwiaGFzVXBwZXIiLCJ0ZXN0IiwicGlja1ByZWZlcnJlZENhc2UiLCJjdXJyZW50IiwiaW5jb21pbmciLCJjdXJyZW50VXBwZXIiLCJpbmNvbWluZ1VwcGVyIiwibm9ybWFsaXplQXJyYXkiLCJub3JtYWxpemVMaXN0IiwidmFsdWVzIiwib3V0IiwiZm9yRWFjaCIsIm5vcm1hbGl6ZWQiLCJwdXNoIiwiZnJvbSIsIlNldCIsIm5vcm1hbGl6ZUxpc3RDYXNlSW5zZW5zaXRpdmUiLCJtYXAiLCJNYXAiLCJrZXkiLCJnZXQiLCJzZXQiLCJwaWNrTW9kZWxGaWVsZCIsIm9iaiIsImFycmF5S2V5IiwiT2JqZWN0Iiwia2V5cyIsImZpbmQiLCJleHRyYWN0TW9kZWxzIiwibW9kZWxzIiwibW9kZWxGaWVsZCIsImV4dHJhY3RPZW1NYXAiLCJkYXRhIiwib2VtTWFwIiwibW9kZWxGaWVsZEJ5T2VtIiwib2VtRmllbGQiLCJlbnRyeSIsIm5hbWUiLCJvZW0iLCJPRU0iLCJsYWJlbCIsIm5vcm1hbGl6ZWROYW1lIiwibGlzdCIsIml0ZW1zIiwiZW50cmllcyIsInN0YXJ0c1dpdGgiLCJsZW5ndGgiLCJidWlsZENhdGFsb2dNZXRhRnJvbU1hcHMiLCJtb2RhbGl0aWVzIiwib2Vtc0J5TW9kYWxpdHkiLCJtb2RlbHNCeU1vZGFsaXR5T2VtIiwidXNlc1N1YmNvbGxlY3Rpb25zIiwic3luY0Rpc2FibGVkIiwic291cmNlIiwibWV0YSIsIm9lbUZpZWxkQnlNb2RhbGl0eSIsIm1vZGVsRmllbGRCeU1vZGFsaXR5T2VtIiwibW9kYWxpdHlLZXlCeUxvd2VyIiwib2VtS2V5QnlNb2RhbGl0eUxvd2VyIiwibW9kZWxLZXlCeU1vZGFsaXR5T2VtTG93ZXIiLCJub3JtYWxpemVkTW9kYWxpdGllcyIsIm1vZGFsaXR5IiwibW9kYWxpdHlMb3dlciIsIm9lbXMiLCJvZW1Mb3dlck1hcCIsIm1vZGVsTG93ZXJNYXAiLCJvZW1Mb3dlciIsIm1vZGVsIiwibW9kZWxMb3dlciIsImZldGNoVHJhY2tlckNhdGFsb2ciLCJmZXRjaCIsInJlc3BvbnNlIiwib2siLCJqc29uIiwicGF5bG9hZCIsIkJvb2xlYW4iLCJjb25zb2xlIiwid2FybiIsImRiIiwiZmlyZWJhc2UiLCJmaXJlc3RvcmUiLCJjb2xsZWN0aW9uIiwic25hcCIsImxvZyIsImRvY3MiLCJkb2MiLCJpZCIsImV4aXN0aW5nTW9kYWxpdHkiLCJjYW5vbmljYWxNb2RhbGl0eSIsIm1lcmdlZE9lbXMiLCJleGlzdGluZ09lbSIsImNhbm9uaWNhbE9lbSIsImV4aXN0aW5nTW9kZWxzIiwibWVyZ2VkTW9kZWxzIiwiYnVpbGRBbGxPZW1zIiwiY2F0YWxvZyIsImJ1aWxkTW9kZWxzRm9yU2VsZWN0aW9uIiwibW9kZWxTZXQiLCJtb2RhbHMiLCJvZW1MaXN0IiwiYWRkIiwic3luY1RyYWNrZXJGcm9tU2VsZWN0aW9ucyIsInNlbGVjdGlvbnMiLCJ0cmFja2VyUmVmIiwic2VsZWN0ZWRNb2RhbGl0aWVzIiwic2VsZWN0ZWRPZW1zIiwic2VsZWN0ZWRNb2RlbHMiLCJvcHMiLCJkb2NSZWYiLCJleGlzdGluZ09lbXNSYXciLCJleGlzdGluZ09lbXNMb3dlciIsInNvbWUiLCJleGlzdGluZyIsIm1lcmdlIiwiaGFzIiwia25vd25Nb2RlbHMiLCJrbm93bkxvd2VyIiwibW9kZWxDYXNlTWFwIiwiY2Fub25pY2FsTW9kZWwiLCJwYXRoIiwidXBkYXRlIiwiRmllbGRWYWx1ZSIsImFycmF5VW5pb24iLCJQcm9taXNlIiwiYWxsU2V0dGxlZCIsImRlbGV0ZVRyYWNrZXJPZW0iLCJ0aGVuIiwiZGVsZXRpb25zIiwicmVmIiwiZGVsZXRlVHJhY2tlck1vZGVsIiwibW9kZWxLZXkiLCJhcnJheVJlbW92ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBRUEsSUFBTUEsb0JBQW9CLEdBQUcsQ0FBQyxNQUFELEVBQVMsTUFBVCxFQUFpQixLQUFqQixFQUF3QixLQUF4QixDQUE3QjtBQUNBLElBQU1DLHNCQUFzQixHQUFHLENBQUMsUUFBRCxFQUFXLFFBQVgsRUFBcUIsT0FBckIsRUFBOEIsT0FBOUIsRUFBdUMsTUFBdkMsRUFBK0MsT0FBL0MsQ0FBL0I7QUFDQSxJQUFNQyxpQkFBaUIsR0FBRyxNQUExQjs7QUFFQSxJQUFNQyxhQUFhLEdBQUcsU0FBaEJBLGFBQWdCLENBQUNDLEtBQUQ7QUFBQSxTQUNwQkEsS0FBSyxJQUFJLElBQVQsSUFDQSxPQUFPQSxLQUFQLEtBQWlCLFFBRGpCLElBRUEsQ0FBQ0MsS0FBSyxDQUFDQyxPQUFOLENBQWNGLEtBQWQsQ0FGRCxJQUdBLEVBQUVBLEtBQUssWUFBWUcsSUFBbkIsQ0FKb0I7QUFBQSxDQUF0Qjs7QUFNQSxJQUFNQyxZQUFZLEdBQUcsU0FBZkEsWUFBZSxDQUFDSixLQUFELEVBQVc7QUFDOUIsTUFBSUEsS0FBSyxJQUFJLElBQWIsRUFBbUIsT0FBTyxFQUFQO0FBQ25CLFNBQU9LLE1BQU0sQ0FBQ0wsS0FBRCxDQUFOLENBQWNNLElBQWQsR0FBcUJDLFdBQXJCLEVBQVA7QUFDRCxDQUhEOztBQUtBLElBQU1DLFFBQVEsR0FBRyxTQUFYQSxRQUFXLENBQUNSLEtBQUQ7QUFBQSxTQUFXLFFBQVFTLElBQVIsQ0FBYUosTUFBTSxDQUFDTCxLQUFLLElBQUksRUFBVixDQUFuQixDQUFYO0FBQUEsQ0FBakI7O0FBRUEsSUFBTVUsaUJBQWlCLEdBQUcsU0FBcEJBLGlCQUFvQixDQUFDQyxPQUFELEVBQVVDLFFBQVYsRUFBdUI7QUFDL0MsTUFBSSxDQUFDRCxPQUFMLEVBQWMsT0FB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VSxhQUNoQkssUUFEZ0IsY0FDSndELFlBREksY0FDWTdELFVBRFosY0FFaEJLLFFBRmdCLGNBRUp3RCxZQUZJLENBaENsQjtBQUFBO0FBQUEsbUJBbUNDaUIsTUFBTSxDQUFDWSxNQUFQLHdKQUNIRCxJQURHLEVBQ0l4Qyx5REFBUSxDQUFDQyxTQUFULENBQW1CeUMsVUFBbkIsQ0FBOEJVLFdBQTlCLENBQTBDaEUsS0FBMUMsQ0FESixFQW5DRDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHIiwiZmlsZSI6InN0YXRpYy93ZWJwYWNrL3BhZ2VzL05ld1NlYXJjaC9pdGVtL1tpZF0uYmQxODMwZTZkOTNmNWEzZWU1ZjguaG90LXVwZGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmaXJlYmFzZSBmcm9tIFwiLi4vY29udGV4dC9GaXJlYmFzZVwiO1xuXG5jb25zdCBPRU1fRklFTERfQ0FORElEQVRFUyA9IFtcIm9lbXNcIiwgXCJPRU1zXCIsIFwib2VtXCIsIFwiT0VNXCJdO1xuY29uc3QgTU9ERUxfRklFTERfQ0FORElEQVRFUyA9IFtcIm1vZGVsc1wiLCBcIk1vZGVsc1wiLCBcIm1vZGVsXCIsIFwiTW9kZWxcIiwgXCJsaXN0XCIsIFwiaXRlbXNcIl07XG5jb25zdCBERUZBVUxUX09FTV9GSUVMRCA9IFwib2Vtc1wiO1xuXG5jb25zdCBpc1BsYWluT2JqZWN0ID0gKHZhbHVlKSA9PlxuICB2YWx1ZSAhPSBudWxsICYmXG4gIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJlxuICAhQXJyYXkuaXNBcnJheSh2YWx1ZSkgJiZcbiAgISh2YWx1ZSBpbnN0YW5jZW9mIERhdGUpO1xuXG5jb25zdCBub3JtYWxpemVLZXkgPSAodmFsdWUpID0+IHtcbiAgaWYgKHZhbHVlID09IG51bGwpIHJldHVybiBcIlwiO1xuICByZXR1cm4gU3RyaW5nKHZhbHVlKS50cmltKCkudG9Mb3dlckNhc2UoKTtcbn07XG5cbmNvbnN0IGhhc1VwcGVyID0gKHZhbHVlKSA9PiAvW0EtWl0vLnRlc3QoU3RyaW5nKHZhbHVlIHx8IFwiXCIpKTtcblxuY29uc3QgcGlja1ByZWZlcnJlZENhc2UgPSAoY3VycmVudCwgaW5jb21pbmcpID0+IHtcbiAgaWYgKCFjdXJyZW50KSByZXR1cm4gaW5jb21pbmc7XG4gIGlmICghaW5jb21pbmcpIHJldHVybiBjdXJyZW50O1xuICBjb25zdCBjdXJyZW50VXBwZXIgPSBoYXNVcHBlcihjdXJyZW50KTtcbiAgY29uc3QgaW5jb21pbmdVcHBlciA9IGhhc1VwcGVyKGluY29taW5nKTtcbiAgaWYgKGluY29taW5nVXBwZXIgJiYgIWN1cnJlbnRVcHBlcikgcmV0dXJuIGluY29taW5nO1xuICBpZiAoY3VycmVudFVwcGVyICYmICFpbmNvbWluZ1VwcGVyKSByZXR1cm4gY3VycmVudDtcbiAgcmV0dXJuIGN1cnJlbnQ7XG59O1xuXG5jb25zdCBub3JtYWxpemVBcnJheSA9ICh2YWx1ZSkgPT4ge1xuICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHJldHVybiB2YWx1ZTtcbiAgaWYgKHZhbHVlID09IG51bGwgfHwgdmFsdWUgPT09IFwiXCIpIHJldHVybiBbXTtcbiAgcmV0dXJuIFt2YWx1ZV07XG59O1xuXG5jb25zdCBub3JtYWxpemVMaXN0ID0gKHZhbHVlcykgPT4ge1xuICBjb25zdCBvdXQgPSBbXTtcbiAgKHZhbHVlcyB8fCBbXSkuZm9yRWFjaCgodmFsdWUpID0+IHtcbiAgICBpZiAodmFsdWUgPT0gbnVsbCkgcmV0dXJuO1xuICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSBTdHJpbmcodmFsdWUpLnRyaW0oKTtcbiAgICBpZiAoIW5vcm1hbGl6ZWQpIHJldHVybjtcbiAgICBpZiAobm9ybWFsaXplS2V5KG5vcm1hbGl6ZWQpID09PSBcIm5hblwiKSByZXR1cm47XG4gICAgb3V0LnB1c2gobm9ybWFsaXplZCk7XG4gIH0pO1xuICByZXR1cm4gQXJyYXkuZnJvbShuZXcgU2V0KG91dCkpO1xufTtcblxuY29uc3Qgbm9ybWFsaXplTGlzdENhc2VJbnNlbnNpdGl2ZSA9ICh2YWx1ZXMpID0+IHtcbiAgY29uc3QgbWFwID0gbmV3IE1hcCgpO1xuICAodmFsdWVzIHx8IFtdKS5mb3JFYWNoKCh2YWx1ZSkgPT4ge1xuICAgIGlmICh2YWx1ZSA9PSBudWxsKSByZXR1cm47XG4gICAgY29uc3Qgbm9ybWFsaXplZCA9IFN0cmluZyh2YWx1ZSkudHJpbSgpO1xuICAgIGlmICghbm9ybWFsaXplZCkgcmV0dXJuO1xuICAgIGNvbnN0IGtleSA9IG5vcm1hbGl6ZUtleShub3JtYWxpemVkKTtcbiAgICBpZiAoIWtleSB8fCBrZXkgPT09IFwibmFuXCIpIHJldHVybjtcbiAgICBjb25zdCBjdXJyZW50ID0gbWFwLmdldChrZXkpO1xuICAgIG1hcC5zZXQoa2V5LCBwaWNrUHJlZmVycmVkQ2FzZShjdXJyZW50LCBub3JtYWxpemVkKSk7XG4gIH0pO1xuICByZXR1cm4gQXJyYXkuZnJvbShtYXAudmFsdWVzKCkpO1xufTtcblxuXG5jb25zdCBwaWNrTW9kZWxGaWVsZCA9IChvYmopID0+IHtcbiAgaWYgKCFpc1BsYWluT2JqZWN0KG9iaikpIHJldHVybiBudWxsO1xuICBmb3IgKGNvbnN0IGtleSBvZiBNT0RFTF9GSUVMRF9DQU5ESURBVEVTKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkob2JqW2tleV0pKSByZXR1cm4ga2V5O1xuICB9XG4gIGNvbnN0IGFycmF5S2V5ID0gT2JqZWN0LmtleXMob2JqKS5maW5kKChrZXkpID0+IEFycmF5LmlzQXJyYXkob2JqW2tleV0pKTtcbiAgcmV0dXJuIGFycmF5S2V5IHx8IG51bGw7XG59O1xuXG5jb25zdCBleHRyYWN0TW9kZWxzID0gKHZhbHVlKSA9PiB7XG4gIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgIHJldHVybiB7IG1vZGVsczogbm9ybWFsaXplTGlzdCh2YWx1ZSksIG1vZGVsRmllbGQ6IG51bGwgfTtcbiAgfVxuICBpZiAoaXNQbGFpbk9iamVjdCh2YWx1ZSkpIHtcbiAgICBjb25zdCBtb2RlbEZpZWxkID0gcGlja01vZGVsRmllbGQodmFsdWUpO1xuICAgIGNvbnN0IG1vZGVscyA9IG1vZGVsRmllbGQgPyBub3JtYWxpemVMaXN0KHZhbHVlW21vZGVsRmllbGRdKSA6IFtdO1xuICAgIHJldHVybiB7IG1vZGVscywgbW9kZWxGaWVsZCB9O1xuICB9XG4gIGlmICh2YWx1ZSAhPSBudWxsICYmIHZhbHVlICE9PSBcIlwiKSB7XG4gICAgcmV0dXJuIHsgbW9kZWxzOiBub3JtYWxpemVMaXN0KFt2YWx1ZV0pLCBtb2RlbEZpZWxkOiBudWxsIH07XG4gIH1cbiAgcmV0dXJuIHsgbW9kZWxzOiBbXSwgbW9kZWxGaWVsZDogbnVsbCB9O1xufTtcblxuY29uc3QgZXh0cmFjdE9lbU1hcCA9IChkYXRhKSA9PiB7XG4gIGNvbnN0IG9lbU1hcCA9IHt9O1xuICBjb25zdCBtb2RlbEZpZWxkQnlPZW0gPSB7fTtcbiAgbGV0IG9lbUZpZWxkID0gbnVsbDtcblxuICBmb3IgKGNvbnN0IGtleSBvZiBPRU1fRklFTERfQ0FORElEQVRFUykge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGE/LltrZXldKSkge1xuICAgICAgb2VtRmllbGQgPSBrZXk7XG4gICAgICBkYXRhW2tleV0uZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICAgICAgaWYgKGVudHJ5ID09IG51bGwpIHJldHVybjtcbiAgICAgICAgaWYgKGlzUGxhaW5PYmplY3QoZW50cnkpKSB7XG4gICAgICAgICAgY29uc3QgbmFtZSA9XG4gICAgICAgICAgICBlbnRyeS5uYW1lIHx8XG4gICAgICAgICAgICBlbnRyeS5vZW0gfHxcbiAgICAgICAgICAgIGVudHJ5Lk9FTSB8fFxuICAgICAgICAgICAgZW50cnkubGFiZWwgfHxcbiAgICAgICAgICAgIGVudHJ5LnZhbHVlO1xuICAgICAgICAgIGlmICghbmFtZSkgcmV0dXJuO1xuICAgICAgICAgIGNvbnN0IG5vcm1hbGl6ZWROYW1lID0gU3RyaW5nKG5hbWUpLnRyaW0oKTtcbiAgICAgICAgICBpZiAoIW5vcm1hbGl6ZWROYW1lKSByZXR1cm47XG4gICAgICAgICAgY29uc3QgeyBtb2RlbHMgfSA9IGV4dHJhY3RNb2RlbHMoZW50cnkubW9kZWxzIHx8IGVudHJ5Lmxpc3QgfHwgZW50cnkuaXRlbXMpO1xuICAgICAgICAgIG9lbU1hcFtub3JtYWxpemVkTmFtZV0gPSBub3JtYWxpemVMaXN0KFtcbiAgICAgICAgICAgIC4uLihvZW1NYXBbbm9ybWFsaXplZE5hbWVdIHx8IFtdKSxcbiAgICAgICAgICAgIC4uLm1vZGVscyxcbiAgICAgICAgICBdKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgbm9ybWFsaXplZCA9IFN0cmluZyhlbnRyeSB8fCBcIlwiKS50cmltKCk7XG4gICAgICAgIGlmICghbm9ybWFsaXplZCkgcmV0dXJuO1xuICAgICAgICBvZW1NYXBbbm9ybWFsaXplZF0gPSBub3JtYWxpemVMaXN0KFsuLi4ob2VtTWFwW25vcm1hbGl6ZWRdIHx8IFtdKV0pO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChpc1BsYWluT2JqZWN0KGRhdGE/LltrZXldKSkge1xuICAgICAgb2VtRmllbGQgPSBrZXk7XG4gICAgICBPYmplY3QuZW50cmllcyhkYXRhW2tleV0pLmZvckVhY2goKFtvZW0sIHZhbHVlXSkgPT4ge1xuICAgICAgICBjb25zdCB7IG1vZGVscywgbW9kZWxGaWVsZCB9ID0gZXh0cmFjdE1vZGVscyh2YWx1ZSk7XG4gICAgICAgIG9lbU1hcFtvZW1dID0gbm9ybWFsaXplTGlzdChbLi4uKG9lbU1hcFtvZW1dIHx8IFtdKSwgLi4ubW9kZWxzXSk7XG4gICAgICAgIGlmIChtb2RlbEZpZWxkKSB7XG4gICAgICAgICAgbW9kZWxGaWVsZEJ5T2VtW29lbV0gPSBtb2RlbEZpZWxkO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBpZiAoIW9lbUZpZWxkKSB7XG4gICAgT2JqZWN0LmVudHJpZXMoZGF0YSB8fCB7fSkuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgICBpZiAoIXZhbHVlKSByZXR1cm47XG4gICAgICBpZiAoa2V5LnN0YXJ0c1dpdGgoXCJfXCIpKSByZXR1cm47XG4gICAgICBpZiAoaXNQbGFpbk9iamVjdCh2YWx1ZSkgfHwgQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgY29uc3QgeyBtb2RlbHMsIG1vZGVsRmllbGQgfSA9IGV4dHJhY3RNb2RlbHModmFsdWUpO1xuICAgICAgICBpZiAobW9kZWxzLmxlbmd0aCB8fCBtb2RlbEZpZWxkKSB7XG4gICAgICAgICAgb2VtTWFwW2tleV0gPSBub3JtYWxpemVMaXN0KFsuLi4ob2VtTWFwW2tleV0gfHwgW10pLCAuLi5tb2RlbHNdKTtcbiAgICAgICAgICBpZiAobW9kZWxGaWVsZCkge1xuICAgICAgICAgICAgbW9kZWxGaWVsZEJ5T2VtW2tleV0gPSBtb2RlbEZpZWxkO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHsgb2VtTWFwLCBvZW1GaWVsZCwgbW9kZWxGaWVsZEJ5T2VtIH07XG59O1xuXG5cbmNvbnN0IGJ1aWxkQ2F0YWxvZ01ldGFGcm9tTWFwcyA9ICh7XG4gIG1vZGFsaXRpZXMgPSBbXSxcbiAgb2Vtc0J5TW9kYWxpdHkgPSB7fSxcbiAgbW9kZWxzQnlNb2RhbGl0eU9lbSA9IHt9LFxuICB1c2VzU3ViY29sbGVjdGlvbnMgPSBmYWxzZSxcbiAgc3luY0Rpc2FibGVkID0gZmFsc2UsXG4gIHNvdXJjZSA9IFwiY2xpZW50XCIsXG59KSA9PiB7XG4gIGNvbnN0IG1ldGEgPSB7XG4gICAgb2VtRmllbGRCeU1vZGFsaXR5OiB7fSxcbiAgICBtb2RlbEZpZWxkQnlNb2RhbGl0eU9lbToge30sXG4gICAgbW9kYWxpdHlLZXlCeUxvd2VyOiB7fSxcbiAgICBvZW1LZXlCeU1vZGFsaXR5TG93ZXI6IHt9LFxuICAgIG1vZGVsS2V5QnlNb2RhbGl0eU9lbUxvd2VyOiB7fSxcbiAgICB1c2VzU3ViY29sbGVjdGlvbnMsXG4gICAgc3luY0Rpc2FibGVkLFxuICAgIHNvdXJjZSxcbiAgfTtcblxuICBjb25zdCBub3JtYWxpemVkTW9kYWxpdGllcyA9IG5vcm1hbGl6ZUxpc3RDYXNlSW5zZW5zaXRpdmUobW9kYWxpdGllcyk7XG4gIG5vcm1hbGl6ZWRNb2RhbGl0aWVzLmZvckVhY2goKG1vZGFsaXR5KSA9PiB7XG4gICAgY29uc3QgbW9kYWxpdHlMb3dlciA9IG5vcm1hbGl6ZUtleShtb2RhbGl0eSk7XG4gICAgbWV0YS5tb2RhbGl0eUtleUJ5TG93ZXJbbW9kYWxpdHlMb3dlcl0gPSBwaWNrUHJlZmVycmVkQ2FzZShcbiAgICAgIG1ldGEubW9kYWxpdHlLZXlCeUxvd2VyW21vZGFsaXR5TG93ZXJdLFxuICAgICAgbW9kYWxpdHlcbiAgICApO1xuICAgIGNvbnN0IG9lbXMgPSBvZW1zQnlNb2RhbGl0eT8uW21vZGFsaXR5XSB8fCBbXTtcbiAgICBjb25zdCBvZW1Mb3dlck1hcCA9XG4gICAgICBtZXRhLm9lbUtleUJ5TW9kYWxpdHlMb3dlclttb2RhbGl0eUxvd2VyXSB8fCB7fTtcbiAgICBtZXRhLm9lbUtleUJ5TW9kYWxpdHlMb3dlclttb2RhbGl0eUxvd2VyXSA9IG9lbUxvd2VyTWFwO1xuICAgIGNvbnN0IG1vZGVsTG93ZXJNYXAgPVxuICAgICAgbWV0YS5tb2RlbEtleUJ5TW9kYWxpdHlPZW1Mb3dlclttb2RhbGl0eUxvd2VyXSB8fCB7fTtcbiAgICBtZXRhLm1vZGVsS2V5QnlNb2RhbGl0eU9lbUxvd2VyW21vZGFsaXR5TG93ZXJdID0gbW9kZWxMb3dlck1hcDtcblxuICAgIG9lbXMuZm9yRWFjaCgob2VtKSA9PiB7XG4gICAgICBjb25zdCBvZW1Mb3dlciA9IG5vcm1hbGl6ZUtleShvZW0pO1xuICAgICAgb2VtTG93ZXJNYXBbb2VtTG93ZXJdID0gcGlja1ByZWZlcnJlZENhc2Uob2VtTG93ZXJNYXBbb2VtTG93ZXJdLCBvZW0pO1xuICAgICAgY29uc3QgbW9kZWxzID0gbW9kZWxzQnlNb2RhbGl0eU9lbT8uW21vZGFsaXR5XT8uW29lbV0gfHwgW107XG4gICAgICBtb2RlbExvd2VyTWFwW29lbUxvd2VyXSA9IG1vZGVsTG93ZXJNYXBbb2VtTG93ZXJdIHx8IHt9O1xuICAgICAgbW9kZWxzLmZvckVhY2goKG1vZGVsKSA9PiB7XG4gICAgICAgIGNvbnN0IG1vZGVsTG93ZXIgPSBub3JtYWxpemVLZXkobW9kZWwpO1xuICAgICAgICBpZiAoIW1vZGVsTG93ZXIpIHJldHVybjtcbiAgICAgICAgbW9kZWxMb3dlck1hcFtvZW1Mb3dlcl1bbW9kZWxMb3dlcl0gPSBwaWNrUHJlZmVycmVkQ2FzZShcbiAgICAgICAgICBtb2RlbExvd2VyTWFwW29lbUxvd2VyXVttb2RlbExvd2VyXSxcbiAgICAgICAgICBtb2RlbFxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIHJldHVybiB7XG4gICAgbW9kYWxpdGllczogbm9ybWFsaXplZE1vZGFsaXRpZXMsXG4gICAgb2Vtc0J5TW9kYWxpdHksXG4gICAgbW9kZWxzQnlNb2RhbGl0eU9lbSxcbiAgICBtZXRhLFxuICB9O1xufTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZldGNoVHJhY2tlckNhdGFsb2coKSB7XG4gIGlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXCIvYXBpL3RyYWNrZXIvY2F0YWxvZ1wiKTtcbiAgICAgIGlmIChyZXNwb25zZS5vaykge1xuICAgICAgICBjb25zdCBwYXlsb2FkID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICBpZiAocGF5bG9hZD8ubW9kYWxpdGllcykge1xuICAgICAgICAgIHJldHVybiBidWlsZENhdGFsb2dNZXRhRnJvbU1hcHMoe1xuICAgICAgICAgICAgbW9kYWxpdGllczogcGF5bG9hZC5tb2RhbGl0aWVzIHx8IFtdLFxuICAgICAgICAgICAgb2Vtc0J5TW9kYWxpdHk6IHBheWxvYWQub2Vtc0J5TW9kYWxpdHkgfHwge30sXG4gICAgICAgICAgICBtb2RlbHNCeU1vZGFsaXR5T2VtOiBwYXlsb2FkLm1vZGVsc0J5TW9kYWxpdHlPZW0gfHwge30sXG4gICAgICAgICAgICB1c2VzU3ViY29sbGVjdGlvbnM6IEJvb2xlYW4ocGF5bG9hZC51c2VzU3ViY29sbGVjdGlvbnMpLFxuICAgICAgICAgICAgc3luY0Rpc2FibGVkOiBmYWxzZSxcbiAgICAgICAgICAgIHNvdXJjZTogXCJzZXJ2ZXJcIixcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLndhcm4oXCJUcmFja2VyIGNhdGFsb2cgQVBJIGZhbGxiYWNrOlwiLCBlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgZGIgPSBmaXJlYmFzZS5maXJlc3RvcmUoKTtcbiAgY29uc3Qgc25hcCA9IGF3YWl0IGRiLmNvbGxlY3Rpb24oXCJUcmFja2VyXCIpLmdldCgpO1xuICBjb25zb2xlLmxvZyhcbiAgICBcIlRyYWNrZXIgY2F0YWxvZyBjbGllbnQgZG9jczpcIixcbiAgICBzbmFwLmRvY3MubWFwKChkb2MpID0+IGRvYy5pZClcbiAgKTtcblxuICBjb25zdCBtb2RhbGl0aWVzID0gW107XG4gIGNvbnN0IG9lbXNCeU1vZGFsaXR5ID0ge307XG4gIGNvbnN0IG1vZGVsc0J5TW9kYWxpdHlPZW0gPSB7fTtcbiAgY29uc3QgbWV0YSA9IHtcbiAgICBvZW1GaWVsZEJ5TW9kYWxpdHk6IHt9LFxuICAgIG1vZGVsRmllbGRCeU1vZGFsaXR5T2VtOiB7fSxcbiAgICBtb2RhbGl0eUtleUJ5TG93ZXI6IHt9LFxuICAgIG9lbUtleUJ5TW9kYWxpdHlMb3dlcjoge30sXG4gICAgbW9kZWxLZXlCeU1vZGFsaXR5T2VtTG93ZXI6IHt9LFxuICB9O1xuXG4gIHNuYXAuZm9yRWFjaCgoZG9jKSA9PiB7XG4gICAgY29uc3QgbW9kYWxpdHkgPSBkb2MuaWQ7XG4gICAgY29uc3QgbW9kYWxpdHlMb3dlciA9IG5vcm1hbGl6ZUtleShtb2RhbGl0eSk7XG4gICAgY29uc3QgZXhpc3RpbmdNb2RhbGl0eSA9IG1ldGEubW9kYWxpdHlLZXlCeUxvd2VyW21vZGFsaXR5TG93ZXJdO1xuICAgIGNvbnN0IGNhbm9uaWNhbE1vZGFsaXR5ID0gcGlja1ByZWZlcnJlZENhc2UoZXhpc3RpbmdNb2RhbGl0eSwgbW9kYWxpdHkpO1xuICAgIG1ldGEubW9kYWxpdHlLZXlCeUxvd2VyW21vZGFsaXR5TG93ZXJdID0gY2Fub25pY2FsTW9kYWxpdHk7XG4gICAgY29uc3QgZGF0YSA9IGRvYy5kYXRhKCkgfHwge307XG4gICAgY29uc3QgeyBvZW1NYXAsIG9lbUZpZWxkLCBtb2RlbEZpZWxkQnlPZW0gfSA9IGV4dHJhY3RPZW1NYXAoZGF0YSk7XG5cbiAgICBpZiAoZXhpc3RpbmdNb2RhbGl0eSAmJiBleGlzdGluZ01vZGFsaXR5ICE9PSBjYW5vbmljYWxNb2RhbGl0eSkge1xuICAgICAgb2Vtc0J5TW9kYWxpdHlbY2Fub25pY2FsTW9kYWxpdHldID0gbm9ybWFsaXplTGlzdENhc2VJbnNlbnNpdGl2ZShbXG4gICAgICAgIC4uLihvZW1zQnlNb2RhbGl0eVtleGlzdGluZ01vZGFsaXR5XSB8fCBbXSksXG4gICAgICAgIC4uLihvZW1zQnlNb2RhbGl0eVtjYW5vbmljYWxNb2RhbGl0eV0gfHwgW10pLFxuICAgICAgXSk7XG4gICAgICBtb2RlbHNCeU1vZGFsaXR5T2VtW2Nhbm9uaWNhbE1vZGFsaXR5XSA9IHtcbiAgICAgICAgLi4uKG1vZGVsc0J5TW9kYWxpdHlPZW1bZXhpc3RpbmdNb2RhbGl0eV0gfHwge30pLFxuICAgICAgICAuLi4obW9kZWxzQnlNb2RhbGl0eU9lbVtjYW5vbmljYWxNb2RhbGl0eV0gfHwge30pLFxuICAgICAgfTtcbiAgICAgIG1ldGEubW9kZWxGaWVsZEJ5TW9kYWxpdHlPZW1bY2Fub25pY2FsTW9kYWxpdHldID0ge1xuICAgICAgICAuLi4obWV0YS5tb2RlbEZpZWxkQnlNb2RhbGl0eU9lbVtleGlzdGluZ01vZGFsaXR5XSB8fCB7fSksXG4gICAgICAgIC4uLihtZXRhLm1vZGVsRmllbGRCeU1vZGFsaXR5T2VtW2Nhbm9uaWNhbE1vZGFsaXR5XSB8fCB7fSksXG4gICAgICB9O1xuICAgICAgaWYgKCFtZXRhLm9lbUZpZWxkQnlNb2RhbGl0eVtjYW5vbmljYWxNb2RhbGl0eV0pIHtcbiAgICAgICAgbWV0YS5vZW1GaWVsZEJ5TW9kYWxpdHlbY2Fub25pY2FsTW9kYWxpdHldID1cbiAgICAgICAgICBtZXRhLm9lbUZpZWxkQnlNb2RhbGl0eVtleGlzdGluZ01vZGFsaXR5XSB8fCBvZW1GaWVsZDtcbiAgICAgIH1cbiAgICAgIGRlbGV0ZSBvZW1zQnlNb2RhbGl0eVtleGlzdGluZ01vZGFsaXR5XTtcbiAgICAgIGRlbGV0ZSBtb2RlbHNCeU1vZGFsaXR5T2VtW2V4aXN0aW5nTW9kYWxpdHldO1xuICAgICAgZGVsZXRlIG1ldGEub2VtRmllbGRCeU1vZGFsaXR5W2V4aXN0aW5nTW9kYWxpdHldO1xuICAgICAgZGVsZXRlIG1ldGEubW9kZWxGaWVsZEJ5TW9kYWxpdHlPZW1bZXhpc3RpbmdNb2RhbGl0eV07XG4gICAgfVxuXG4gICAgbW9kYWxpdGllcy5wdXNoKGNhbm9uaWNhbE1vZGFsaXR5KTtcbiAgICBpZiAoIW1ldGEub2VtRmllbGRCeU1vZGFsaXR5W2Nhbm9uaWNhbE1vZGFsaXR5XSkge1xuICAgICAgbWV0YS5vZW1GaWVsZEJ5TW9kYWxpdHlbY2Fub25pY2FsTW9kYWxpdHldID0gb2VtRmllbGQ7XG4gICAgfVxuICAgIG1ldGEubW9kZWxGaWVsZEJ5TW9kYWxpdHlPZW1bY2Fub25pY2FsTW9kYWxpdHldID0ge1xuICAgICAgLi4uKG1ldGEubW9kZWxGaWVsZEJ5TW9kYWxpdHlPZW1bY2Fub25pY2FsTW9kYWxpdHldIHx8IHt9KSxcbiAgICAgIC4uLihtb2RlbEZpZWxkQnlPZW0gfHwge30pLFxuICAgIH07XG5cbiAgICBjb25zdCBvZW1zID0gT2JqZWN0LmtleXMob2VtTWFwKTtcbiAgICBjb25zdCBtZXJnZWRPZW1zID0gbm9ybWFsaXplTGlzdENhc2VJbnNlbnNpdGl2ZShbXG4gICAgICAuLi4ob2Vtc0J5TW9kYWxpdHlbY2Fub25pY2FsTW9kYWxpdHldIHx8IFtdKSxcbiAgICAgIC4uLm9lbXMsXG4gICAgXSk7XG4gICAgb2Vtc0J5TW9kYWxpdHlbY2Fub25pY2FsTW9kYWxpdHldID0gbWVyZ2VkT2VtcztcbiAgICBtb2RlbHNCeU1vZGFsaXR5T2VtW2Nhbm9uaWNhbE1vZGFsaXR5XSA9XG4gICAgICBtb2RlbHNCeU1vZGFsaXR5T2VtW2Nhbm9uaWNhbE1vZGFsaXR5XSB8fCB7fTtcbiAgICBjb25zdCBvZW1Mb3dlck1hcCA9XG4gICAgICBtZXRhLm9lbUtleUJ5TW9kYWxpdHlMb3dlclttb2RhbGl0eUxvd2VyXSB8fCB7fTtcbiAgICBtZXRhLm9lbUtleUJ5TW9kYWxpdHlMb3dlclttb2RhbGl0eUxvd2VyXSA9IG9lbUxvd2VyTWFwO1xuICAgIGNvbnN0IG1vZGVsTG93ZXJNYXAgPVxuICAgICAgbWV0YS5tb2RlbEtleUJ5TW9kYWxpdHlPZW1Mb3dlclttb2RhbGl0eUxvd2VyXSB8fCB7fTtcbiAgICBtZXRhLm1vZGVsS2V5QnlNb2RhbGl0eU9lbUxvd2VyW21vZGFsaXR5TG93ZXJdID0gbW9kZWxMb3dlck1hcDtcbiAgICBvZW1zLmZvckVhY2goKG9lbSkgPT4ge1xuICAgICAgY29uc3Qgb2VtTG93ZXIgPSBub3JtYWxpemVLZXkob2VtKTtcbiAgICAgIGNvbnN0IGV4aXN0aW5nT2VtID0gb2VtTG93ZXJNYXBbb2VtTG93ZXJdO1xuICAgICAgY29uc3QgY2Fub25pY2FsT2VtID0gcGlja1ByZWZlcnJlZENhc2UoZXhpc3RpbmdPZW0sIG9lbSk7XG4gICAgICBvZW1Mb3dlck1hcFtvZW1Mb3dlcl0gPSBjYW5vbmljYWxPZW07XG4gICAgICBpZiAoZXhpc3RpbmdPZW0gJiYgZXhpc3RpbmdPZW0gIT09IGNhbm9uaWNhbE9lbSkge1xuICAgICAgICBtb2RlbHNCeU1vZGFsaXR5T2VtW2Nhbm9uaWNhbE1vZGFsaXR5XVtjYW5vbmljYWxPZW1dID0gbm9ybWFsaXplTGlzdENhc2VJbnNlbnNpdGl2ZShbXG4gICAgICAgICAgLi4uKG1vZGVsc0J5TW9kYWxpdHlPZW1bY2Fub25pY2FsTW9kYWxpdHldW2V4aXN0aW5nT2VtXSB8fCBbXSksXG4gICAgICAgICAgLi4uKG1vZGVsc0J5TW9kYWxpdHlPZW1bY2Fub25pY2FsTW9kYWxpdHldW2Nhbm9uaWNhbE9lbV0gfHwgW10pLFxuICAgICAgICBdKTtcbiAgICAgICAgZGVsZXRlIG1vZGVsc0J5TW9kYWxpdHlPZW1bY2Fub25pY2FsTW9kYWxpdHldW2V4aXN0aW5nT2VtXTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGV4aXN0aW5nTW9kZWxzID1cbiAgICAgICAgbW9kZWxzQnlNb2RhbGl0eU9lbVtjYW5vbmljYWxNb2RhbGl0eV1bY2Fub25pY2FsT2VtXSB8fCBbXTtcbiAgICAgIGNvbnN0IG1lcmdlZE1vZGVscyA9IG5vcm1hbGl6ZUxpc3RDYXNlSW5zZW5zaXRpdmUoW1xuICAgICAgICAuLi5leGlzdGluZ01vZGVscyxcbiAgICAgICAgLi4uKG9lbU1hcFtvZW1dIHx8IFtdKSxcbiAgICAgIF0pO1xuICAgICAgbW9kZWxzQnlNb2RhbGl0eU9lbVtjYW5vbmljYWxNb2RhbGl0eV1bY2Fub25pY2FsT2VtXSA9IG1lcmdlZE1vZGVscztcbiAgICAgIG1vZGVsTG93ZXJNYXBbb2VtTG93ZXJdID0gbW9kZWxMb3dlck1hcFtvZW1Mb3dlcl0gfHwge307XG4gICAgICBtZXJnZWRNb2RlbHMuZm9yRWFjaCgobW9kZWwpID0+IHtcbiAgICAgICAgbW9kZWxMb3dlck1hcFtvZW1Mb3dlcl1bbm9ybWFsaXplS2V5KG1vZGVsKV0gPSBtb2RlbDtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcblxuICByZXR1cm4gYnVpbGRDYXRhbG9nTWV0YUZyb21NYXBzKHtcbiAgICBtb2RhbGl0aWVzLFxuICAgIG9lbXNCeU1vZGFsaXR5LFxuICAgIG1vZGVsc0J5TW9kYWxpdHlPZW0sXG4gICAgdXNlc1N1YmNvbGxlY3Rpb25zOiB0cnVlLFxuICAgIHN5bmNEaXNhYmxlZDogZmFsc2UsXG4gICAgc291cmNlOiBcImNsaWVudFwiLFxuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkQWxsT2VtcyhjYXRhbG9nKSB7XG4gIGNvbnN0IG1hcCA9IG5ldyBNYXAoKTtcbiAgT2JqZWN0LnZhbHVlcyhjYXRhbG9nPy5vZW1zQnlNb2RhbGl0eSB8fCB7fSkuZm9yRWFjaCgob2VtcykgPT4ge1xuICAgIChvZW1zIHx8IFtdKS5mb3JFYWNoKChvZW0pID0+IHtcbiAgICAgIGNvbnN0IGtleSA9IG5vcm1hbGl6ZUtleShvZW0pO1xuICAgICAgaWYgKCFrZXkpIHJldHVybjtcbiAgICAgIGNvbnN0IGN1cnJlbnQgPSBtYXAuZ2V0KGtleSk7XG4gICAgICBtYXAuc2V0KGtleSwgcGlja1ByZWZlcnJlZENhc2UoY3VycmVudCwgb2VtKSk7XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gQXJyYXkuZnJvbShtYXAudmFsdWVzKCkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRNb2RlbHNGb3JTZWxlY3Rpb24oY2F0YWxvZywgbW9kYWxpdGllcyA9IFtdLCBvZW1zID0gW10pIHtcbiAgY29uc3QgbW9kZWxTZXQgPSBuZXcgU2V0KCk7XG4gIGNvbnN0IG1vZGFscyA9IG5vcm1hbGl6ZUxpc3QobW9kYWxpdGllcyk7XG4gIGNvbnN0IG9lbUxpc3QgPSBub3JtYWxpemVMaXN0KG9lbXMpO1xuICBtb2RhbHMuZm9yRWFjaCgobW9kYWxpdHkpID0+IHtcbiAgICBjb25zdCBtb2RhbGl0eUxvd2VyID0gbm9ybWFsaXplS2V5KG1vZGFsaXR5KTtcbiAgICBjb25zdCBjYW5vbmljYWxNb2RhbGl0eSA9XG4gICAgICBjYXRhbG9nPy5tZXRhPy5tb2RhbGl0eUtleUJ5TG93ZXI/Llttb2RhbGl0eUxvd2VyXSB8fCBtb2RhbGl0eTtcbiAgICBjb25zdCBvZW1NYXAgPSBjYXRhbG9nPy5tb2RlbHNCeU1vZGFsaXR5T2VtPy5bY2Fub25pY2FsTW9kYWxpdHldIHx8IHt9O1xuICAgIG9lbUxpc3QuZm9yRWFjaCgob2VtKSA9PiB7XG4gICAgICBjb25zdCBvZW1Mb3dlciA9IG5vcm1hbGl6ZUtleShvZW0pO1xuICAgICAgY29uc3QgY2Fub25pY2FsT2VtID1cbiAgICAgICAgY2F0YWxvZz8ubWV0YT8ub2VtS2V5QnlNb2RhbGl0eUxvd2VyPy5bbW9kYWxpdHlMb3dlcl0/LltvZW1Mb3dlcl0gfHwgb2VtO1xuICAgICAgY29uc3QgbW9kZWxzID0gb2VtTWFwPy5bY2Fub25pY2FsT2VtXSB8fCBbXTtcbiAgICAgIG1vZGVscy5mb3JFYWNoKChtb2RlbCkgPT4gbW9kZWxTZXQuYWRkKG1vZGVsKSk7XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gQXJyYXkuZnJvbShtb2RlbFNldCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzeW5jVHJhY2tlckZyb21TZWxlY3Rpb25zKHtcbiAgc2VsZWN0aW9ucyxcbiAgY2F0YWxvZyxcbn0pIHtcbiAgY29uc3QgZGIgPSBmaXJlYmFzZS5maXJlc3RvcmUoKTtcbiAgY29uc3QgdHJhY2tlclJlZiA9IGRiLmNvbGxlY3Rpb24oXCJUcmFja2VyXCIpO1xuICBjb25zdCBzZWxlY3RlZE1vZGFsaXRpZXMgPSBub3JtYWxpemVMaXN0KHNlbGVjdGlvbnM/Lm1vZGFsaXRpZXMgfHwgW10pO1xuICBjb25zdCBzZWxlY3RlZE9lbXMgPSBub3JtYWxpemVMaXN0KHNlbGVjdGlvbnM/Lm9lbXMgfHwgW10pO1xuICBjb25zdCBzZWxlY3RlZE1vZGVscyA9IG5vcm1hbGl6ZUxpc3Qoc2VsZWN0aW9ucz8ubW9kZWxzIHx8IFtdKTtcblxuICBpZiAoIXNlbGVjdGVkTW9kYWxpdGllcy5sZW5ndGgpIHJldHVybiBmYWxzZTtcbiAgaWYgKGNhdGFsb2c/Lm1ldGE/LnN5bmNEaXNhYmxlZCkgcmV0dXJuIGZhbHNlO1xuXG4gIGNvbnN0IG9wcyA9IFtdO1xuXG4gIGZvciAoY29uc3QgbW9kYWxpdHkgb2Ygc2VsZWN0ZWRNb2RhbGl0aWVzKSB7XG4gICAgY29uc3QgbW9kYWxpdHlMb3dlciA9IG5vcm1hbGl6ZUtleShtb2RhbGl0eSk7XG4gICAgY29uc3QgY2Fub25pY2FsTW9kYWxpdHkgPVxuICAgICAgY2F0YWxvZz8ubWV0YT8ubW9kYWxpdHlLZXlCeUxvd2VyPy5bbW9kYWxpdHlMb3dlcl0gfHwgbW9kYWxpdHlMb3dlcjtcbiAgICBjb25zdCBkb2NSZWYgPSB0cmFja2VyUmVmLmRvYyhjYW5vbmljYWxNb2RhbGl0eSk7XG4gICAgY29uc3QgZXhpc3RpbmdPZW1zUmF3ID0gY2F0YWxvZz8ub2Vtc0J5TW9kYWxpdHk/LltjYW5vbmljYWxNb2RhbGl0eV0gfHwgW107XG4gICAgY29uc3QgZXhpc3RpbmdPZW1zTG93ZXIgPSBuZXcgU2V0KFxuICAgICAgZXhpc3RpbmdPZW1zUmF3Lm1hcCgodmFsdWUpID0+IG5vcm1hbGl6ZUtleSh2YWx1ZSkpXG4gICAgKTtcblxuICAgIGNvbnN0IG9lbUZpZWxkID1cbiAgICAgIGNhdGFsb2c/Lm1ldGE/Lm9lbUZpZWxkQnlNb2RhbGl0eT8uW2Nhbm9uaWNhbE1vZGFsaXR5XSB8fFxuICAgICAgREVGQVVMVF9PRU1fRklFTEQ7XG5cbiAgICBpZiAoXG4gICAgICAhY2F0YWxvZz8ubW9kYWxpdGllcz8uc29tZShcbiAgICAgICAgKGV4aXN0aW5nKSA9PiBub3JtYWxpemVLZXkoZXhpc3RpbmcpID09PSBtb2RhbGl0eUxvd2VyXG4gICAgICApXG4gICAgKSB7XG4gICAgICBvcHMucHVzaChkb2NSZWYuc2V0KHsgW0RFRkFVTFRfT0VNX0ZJRUxEXToge30gfSwgeyBtZXJnZTogdHJ1ZSB9KSk7XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBvZW0gb2Ygc2VsZWN0ZWRPZW1zKSB7XG4gICAgICBjb25zdCBvZW1Mb3dlciA9IG5vcm1hbGl6ZUtleShvZW0pO1xuICAgICAgY29uc3QgY2Fub25pY2FsT2VtID1cbiAgICAgICAgY2F0YWxvZz8ubWV0YT8ub2VtS2V5QnlNb2RhbGl0eUxvd2VyPy5bbW9kYWxpdHlMb3dlcl0/LltvZW1Mb3dlcl0gfHxcbiAgICAgICAgb2VtTG93ZXI7XG4gICAgICBpZiAoIWV4aXN0aW5nT2Vtc0xvd2VyLmhhcyhvZW1Mb3dlcikpIHtcbiAgICAgICAgb3BzLnB1c2goXG4gICAgICAgICAgZG9jUmVmLnNldCh7IFtvZW1GaWVsZF06IHsgW2Nhbm9uaWNhbE9lbV06IFtdIH0gfSwgeyBtZXJnZTogdHJ1ZSB9KVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAoY29uc3Qgb2VtIG9mIHNlbGVjdGVkT2Vtcykge1xuICAgICAgY29uc3Qgb2VtTG93ZXIgPSBub3JtYWxpemVLZXkob2VtKTtcbiAgICAgIGNvbnN0IGNhbm9uaWNhbE9lbSA9XG4gICAgICAgIGNhdGFsb2c/Lm1ldGE/Lm9lbUtleUJ5TW9kYWxpdHlMb3dlcj8uW21vZGFsaXR5TG93ZXJdPy5bb2VtTG93ZXJdIHx8XG4gICAgICAgIG9lbUxvd2VyO1xuICAgICAgY29uc3Qga25vd25Nb2RlbHMgPVxuICAgICAgICBjYXRhbG9nPy5tb2RlbHNCeU1vZGFsaXR5T2VtPy5bY2Fub25pY2FsTW9kYWxpdHldPy5bY2Fub25pY2FsT2VtXSB8fCBbXTtcbiAgICAgIGNvbnN0IGtub3duTG93ZXIgPSBuZXcgU2V0KFxuICAgICAgICBrbm93bk1vZGVscy5tYXAoKHZhbHVlKSA9PiBub3JtYWxpemVLZXkodmFsdWUpKVxuICAgICAgKTtcbiAgICAgIGNvbnN0IG1vZGVsQ2FzZU1hcCA9XG4gICAgICAgIGNhdGFsb2c/Lm1ldGE/Lm1vZGVsS2V5QnlNb2RhbGl0eU9lbUxvd2VyPy5bbW9kYWxpdHlMb3dlcl0/LltvZW1Mb3dlcl0gfHxcbiAgICAgICAge307XG4gICAgICBjb25zdCBtb2RlbEZpZWxkID1cbiAgICAgICAgY2F0YWxvZz8ubWV0YT8ubW9kZWxGaWVsZEJ5TW9kYWxpdHlPZW0/LltjYW5vbmljYWxNb2RhbGl0eV0/LltcbiAgICAgICAgICBjYW5vbmljYWxPZW1cbiAgICAgICAgXSB8fCBudWxsO1xuICAgICAgZm9yIChjb25zdCBtb2RlbCBvZiBzZWxlY3RlZE1vZGVscykge1xuICAgICAgICBjb25zdCBtb2RlbExvd2VyID0gbm9ybWFsaXplS2V5KG1vZGVsKTtcbiAgICAgICAgaWYgKCFtb2RlbExvd2VyIHx8IGtub3duTG93ZXIuaGFzKG1vZGVsTG93ZXIpKSBjb250aW51ZTtcbiAgICAgICAgY29uc3QgY2Fub25pY2FsTW9kZWwgPSBtb2RlbENhc2VNYXBbbW9kZWxMb3dlcl0gfHwgbW9kZWw7XG4gICAgICAgIGNvbnN0IHBhdGggPSBtb2RlbEZpZWxkXG4gICAgICAgICAgPyBgJHtvZW1GaWVsZH0uJHtjYW5vbmljYWxPZW19LiR7bW9kZWxGaWVsZH1gXG4gICAgICAgICAgOiBgJHtvZW1GaWVsZH0uJHtjYW5vbmljYWxPZW19YDtcbiAgICAgICAgb3BzLnB1c2goXG4gICAgICAgICAgZG9jUmVmLnVwZGF0ZSh7XG4gICAgICAgICAgICBbcGF0aF06IGZpcmViYXNlLmZpcmVzdG9yZS5GaWVsZFZhbHVlLmFycmF5VW5pb24oY2Fub25pY2FsTW9kZWwpLFxuICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKG9wcy5sZW5ndGgpIHtcbiAgICBhd2FpdCBQcm9taXNlLmFsbFNldHRsZWQob3BzKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkZWxldGVUcmFja2VyT2VtKHsgb2VtLCBjYXRhbG9nIH0pIHtcbiAgaWYgKCFvZW0pIHJldHVybjtcbiAgY29uc3QgZGIgPSBmaXJlYmFzZS5maXJlc3RvcmUoKTtcbiAgY29uc3QgdHJhY2tlclJlZiA9IGRiLmNvbGxlY3Rpb24oXCJUcmFja2VyXCIpO1xuICBjb25zdCBtb2RhbGl0aWVzID0gY2F0YWxvZz8ubW9kYWxpdGllcyB8fCBbXTtcbiAgY29uc3QgdXNlc1N1YmNvbGxlY3Rpb25zID0gQm9vbGVhbihjYXRhbG9nPy5tZXRhPy51c2VzU3ViY29sbGVjdGlvbnMpO1xuICBjb25zdCBvcHMgPSBtb2RhbGl0aWVzLm1hcCgobW9kYWxpdHkpID0+IHtcbiAgICBjb25zdCBtb2RhbGl0eUxvd2VyID0gbm9ybWFsaXplS2V5KG1vZGFsaXR5KTtcbiAgICBjb25zdCBjYW5vbmljYWxNb2RhbGl0eSA9XG4gICAgICBjYXRhbG9nPy5tZXRhPy5tb2RhbGl0eUtleUJ5TG93ZXI/Llttb2RhbGl0eUxvd2VyXSB8fCBtb2RhbGl0eTtcbiAgICBjb25zdCBkb2NSZWYgPSB0cmFja2VyUmVmLmRvYyhjYW5vbmljYWxNb2RhbGl0eSk7XG4gICAgY29uc3QgY2Fub25pY2FsT2VtID1cbiAgICAgIGNhdGFsb2c/Lm1ldGE/Lm9lbUtleUJ5TW9kYWxpdHlMb3dlcj8uW21vZGFsaXR5TG93ZXJdPy5bXG4gICAgICAgIG5vcm1hbGl6ZUtleShvZW0pXG4gICAgICBdIHx8IG9lbTtcbiAgICBpZiAodXNlc1N1YmNvbGxlY3Rpb25zKSB7XG4gICAgICByZXR1cm4gZG9jUmVmXG4gICAgICAgIC5jb2xsZWN0aW9uKGNhbm9uaWNhbE9lbSlcbiAgICAgICAgLmdldCgpXG4gICAgICAgIC50aGVuKChzbmFwKSA9PiB7XG4gICAgICAgICAgY29uc3QgZGVsZXRpb25zID0gW107XG4gICAgICAgICAgc25hcC5mb3JFYWNoKChkb2MpID0+IHtcbiAgICAgICAgICAgIGRlbGV0aW9ucy5wdXNoKGRvYy5yZWYuZGVsZXRlKCkpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbFNldHRsZWQoZGVsZXRpb25zKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKCgpID0+IG51bGwpO1xuICAgIH1cbiAgICBjb25zdCBvZW1GaWVsZCA9XG4gICAgICBjYXRhbG9nPy5tZXRhPy5vZW1GaWVsZEJ5TW9kYWxpdHk/LltjYW5vbmljYWxNb2RhbGl0eV0gfHxcbiAgICAgIERFRkFVTFRfT0VNX0ZJRUxEO1xuICAgIGNvbnN0IHVwZGF0ZSA9IHtcbiAgICAgIFtgJHtvZW1GaWVsZH0uJHtjYW5vbmljYWxPZW19YF06IGZpcmViYXNlLmZpcmVzdG9yZS5GaWVsZFZhbHVlLmRlbGV0ZSgpLFxuICAgIH07XG4gICAgaWYgKCFjYXRhbG9nPy5tZXRhPy5vZW1GaWVsZEJ5TW9kYWxpdHk/LltjYW5vbmljYWxNb2RhbGl0eV0pIHtcbiAgICAgIHVwZGF0ZVtjYW5vbmljYWxPZW1dID0gZmlyZWJhc2UuZmlyZXN0b3JlLkZpZWxkVmFsdWUuZGVsZXRlKCk7XG4gICAgfVxuICAgIHJldHVybiBkb2NSZWYudXBkYXRlKHVwZGF0ZSkuY2F0Y2goKCkgPT4gbnVsbCk7XG4gIH0pO1xuICBhd2FpdCBQcm9taXNlLmFsbFNldHRsZWQob3BzKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRlbGV0ZVRyYWNrZXJNb2RlbCh7XG4gIG1vZGFsaXR5LFxuICBvZW0sXG4gIG1vZGVsLFxuICBjYXRhbG9nLFxufSkge1xuICBpZiAoIW1vZGFsaXR5IHx8ICFvZW0gfHwgIW1vZGVsKSByZXR1cm47XG4gIGNvbnN0IGRiID0gZmlyZWJhc2UuZmlyZXN0b3JlKCk7XG4gIGNvbnN0IG1vZGFsaXR5TG93ZXIgPSBub3JtYWxpemVLZXkobW9kYWxpdHkpO1xuICBjb25zdCBjYW5vbmljYWxNb2RhbGl0eSA9XG4gICAgY2F0YWxvZz8ubWV0YT8ubW9kYWxpdHlLZXlCeUxvd2VyPy5bbW9kYWxpdHlMb3dlcl0gfHwgbW9kYWxpdHk7XG4gIGNvbnN0IGRvY1JlZiA9IGRiLmNvbGxlY3Rpb24oXCJUcmFja2VyXCIpLmRvYyhjYW5vbmljYWxNb2RhbGl0eSk7XG4gIGNvbnN0IGNhbm9uaWNhbE9lbSA9XG4gICAgY2F0YWxvZz8ubWV0YT8ub2VtS2V5QnlNb2RhbGl0eUxvd2VyPy5bbW9kYWxpdHlMb3dlcl0/LltcbiAgICAgIG5vcm1hbGl6ZUtleShvZW0pXG4gICAgXSB8fCBvZW07XG4gIGlmIChjYXRhbG9nPy5tZXRhPy51c2VzU3ViY29sbGVjdGlvbnMpIHtcbiAgICBjb25zdCBtb2RlbEtleSA9IG5vcm1hbGl6ZUtleShtb2RlbCk7XG4gICAgYXdhaXQgZG9jUmVmXG4gICAgICAuY29sbGVjdGlvbihjYW5vbmljYWxPZW0pXG4gICAgICAuZG9jKG1vZGVsS2V5KVxuICAgICAgLmRlbGV0ZSgpXG4gICAgICAuY2F0Y2goKCkgPT4gbnVsbCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnN0IG9lbUZpZWxkID1cbiAgICBjYXRhbG9nPy5tZXRhPy5vZW1GaWVsZEJ5TW9kYWxpdHk/LltjYW5vbmljYWxNb2RhbGl0eV0gfHxcbiAgICBERUZBVUxUX09FTV9GSUVMRDtcbiAgY29uc3QgbW9kZWxGaWVsZCA9XG4gICAgY2F0YWxvZz8ubWV0YT8ubW9kZWxGaWVsZEJ5TW9kYWxpdHlPZW0/LltjYW5vbmljYWxNb2RhbGl0eV0/LltcbiAgICAgIGNhbm9uaWNhbE9lbVxuICAgIF0gfHwgbnVsbDtcbiAgY29uc3QgcGF0aCA9IG1vZGVsRmllbGRcbiAgICA/IGAke29lbUZpZWxkfS4ke2Nhbm9uaWNhbE9lbX0uJHttb2RlbEZpZWxkfWBcbiAgICA6IGAke29lbUZpZWxkfS4ke2Nhbm9uaWNhbE9lbX1gO1xuICBhd2FpdCBkb2NSZWYudXBkYXRlKHtcbiAgICBbcGF0aF06IGZpcmViYXNlLmZpcmVzdG9yZS5GaWVsZFZhbHVlLmFycmF5UmVtb3ZlKG1vZGVsKSxcbiAgfSk7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9