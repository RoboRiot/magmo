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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vdXRpbHMvdHJhY2tlckNhdGFsb2cuanMiXSwibmFtZXMiOlsiT0VNX0ZJRUxEX0NBTkRJREFURVMiLCJNT0RFTF9GSUVMRF9DQU5ESURBVEVTIiwiREVGQVVMVF9PRU1fRklFTEQiLCJpc1BsYWluT2JqZWN0IiwidmFsdWUiLCJBcnJheSIsImlzQXJyYXkiLCJEYXRlIiwibm9ybWFsaXplS2V5IiwiU3RyaW5nIiwidHJpbSIsInRvTG93ZXJDYXNlIiwiaGFzVXBwZXIiLCJ0ZXN0IiwicGlja1ByZWZlcnJlZENhc2UiLCJjdXJyZW50IiwiaW5jb21pbmciLCJjdXJyZW50VXBwZXIiLCJpbmNvbWluZ1VwcGVyIiwibm9ybWFsaXplQXJyYXkiLCJub3JtYWxpemVMaXN0IiwidmFsdWVzIiwib3V0IiwiZm9yRWFjaCIsIm5vcm1hbGl6ZWQiLCJwdXNoIiwiZnJvbSIsIlNldCIsIm5vcm1hbGl6ZUxpc3RDYXNlSW5zZW5zaXRpdmUiLCJtYXAiLCJNYXAiLCJrZXkiLCJnZXQiLCJzZXQiLCJwaWNrTW9kZWxGaWVsZCIsIm9iaiIsImFycmF5S2V5IiwiT2JqZWN0Iiwia2V5cyIsImZpbmQiLCJleHRyYWN0TW9kZWxzIiwibW9kZWxzIiwibW9kZWxGaWVsZCIsImV4dHJhY3RPZW1NYXAiLCJkYXRhIiwib2VtTWFwIiwibW9kZWxGaWVsZEJ5T2VtIiwib2VtRmllbGQiLCJlbnRyeSIsIm5hbWUiLCJvZW0iLCJPRU0iLCJsYWJlbCIsIm5vcm1hbGl6ZWROYW1lIiwibGlzdCIsIml0ZW1zIiwiZW50cmllcyIsInN0YXJ0c1dpdGgiLCJsZW5ndGgiLCJidWlsZENhdGFsb2dNZXRhRnJvbU1hcHMiLCJtb2RhbGl0aWVzIiwib2Vtc0J5TW9kYWxpdHkiLCJtb2RlbHNCeU1vZGFsaXR5T2VtIiwidXNlc1N1YmNvbGxlY3Rpb25zIiwic3luY0Rpc2FibGVkIiwic291cmNlIiwibWV0YSIsIm9lbUZpZWxkQnlNb2RhbGl0eSIsIm1vZGVsRmllbGRCeU1vZGFsaXR5T2VtIiwibW9kYWxpdHlLZXlCeUxvd2VyIiwib2VtS2V5QnlNb2RhbGl0eUxvd2VyIiwibW9kZWxLZXlCeU1vZGFsaXR5T2VtTG93ZXIiLCJub3JtYWxpemVkTW9kYWxpdGllcyIsIm1vZGFsaXR5IiwibW9kYWxpdHlMb3dlciIsIm9lbXMiLCJvZW1Mb3dlck1hcCIsIm1vZGVsTG93ZXJNYXAiLCJvZW1Mb3dlciIsIm1vZGVsIiwibW9kZWxMb3dlciIsImZldGNoVHJhY2tlckNhdGFsb2ciLCJmZXRjaCIsIm5vdyIsImNhY2hlIiwicmVzcG9uc2UiLCJvayIsImpzb24iLCJwYXlsb2FkIiwiQm9vbGVhbiIsImNvbnNvbGUiLCJ3YXJuIiwiZGIiLCJmaXJlYmFzZSIsImZpcmVzdG9yZSIsImNvbGxlY3Rpb24iLCJzbmFwIiwibG9nIiwiZG9jcyIsImRvYyIsImlkIiwiZXhpc3RpbmdNb2RhbGl0eSIsImNhbm9uaWNhbE1vZGFsaXR5IiwibWVyZ2VkT2VtcyIsImV4aXN0aW5nT2VtIiwiY2Fub25pY2FsT2VtIiwiZXhpc3RpbmdNb2RlbHMiLCJtZXJnZWRNb2RlbHMiLCJidWlsZEFsbE9lbXMiLCJjYXRhbG9nIiwiYnVpbGRNb2RlbHNGb3JTZWxlY3Rpb24iLCJtb2RlbFNldCIsIm1vZGFscyIsIm9lbUxpc3QiLCJhZGQiLCJzeW5jVHJhY2tlckZyb21TZWxlY3Rpb25zIiwic2VsZWN0aW9ucyIsInRyYWNrZXJSZWYiLCJzZWxlY3RlZE1vZGFsaXRpZXMiLCJzZWxlY3RlZE9lbXMiLCJzZWxlY3RlZE1vZGVscyIsIm9wcyIsImRvY1JlZiIsImV4aXN0aW5nT2Vtc1JhdyIsImV4aXN0aW5nT2Vtc0xvd2VyIiwic29tZSIsImV4aXN0aW5nIiwibWVyZ2UiLCJoYXMiLCJrbm93bk1vZGVscyIsImtub3duTG93ZXIiLCJtb2RlbENhc2VNYXAiLCJjYW5vbmljYWxNb2RlbCIsInBhdGgiLCJ1cGRhdGUiLCJGaWVsZFZhbHVlIiwiYXJyYXlVbmlvbiIsIlByb21pc2UiLCJhbGxTZXR0bGVkIiwiZGVsZXRlVHJhY2tlck9lbSIsInRoZW4iLCJkZWxldGlvbnMiLCJyZWYiLCJkZWxldGVUcmFja2VyTW9kZWwiLCJtb2RlbEtleSIsImFycmF5UmVtb3ZlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFFQSxJQUFNQSxvQkFBb0IsR0FBRyxDQUFDLE1BQUQsRUFBUyxNQUFULEVBQWlCLEtBQWpCLEVBQXdCLEtBQXhCLENBQTdCO0FBQ0EsSUFBTUMsc0JBQXNCLEdBQUcsQ0FBQyxRQUFELEVBQVcsUUFBWCxFQUFxQixPQUFyQixFQUE4QixPQUE5QixFQUF1QyxNQUF2QyxFQUErQyxPQUEvQyxDQUEvQjtBQUNBLElBQU1DLGlCQUFpQixHQUFHLE1BQTFCOztBQUVBLElBQU1DLGFBQWEsR0FBRyxTQUFoQkEsYUFBZ0IsQ0FBQ0MsS0FBRDtBQUFBLFNBQ3BCQSxLQUFLLElBQUksSUFBVCxJQUNBLE9BQU9BLEtBQVAsS0FBaUIsUUFEakIsSUFFQSxDQUFDQyxLQUFLLENBQUNDLE9BQU4sQ0FBY0YsS0FBZCxDQUZELElBR0EsRUFBRUEsS0FBSyxZQUFZRyxJQUFuQixDQUpvQjtBQUFBLENBQXRCOztBQU1BLElBQU1DLFlBQVksR0FBRyxTQUFmQSxZQUFlLENBQUNKLEtBQUQsRUFBVztBQUM5QixNQUFJQSxLQUFLLElBQUksSUFBYixFQUFtQixPQUFPLEVBQVA7QUFDbkIsU0FBT0ssTUFBTSxDQUFDTCxLQUFELENBQU4sQ0FBY00sSUFBZCxHQUFxQkMsV0FBckIsRUFBUDtBQUNELENBSEQ7O0FBS0EsSUFBTUMsUUFBUSxHQUFHLFNBQVhBLFFBQVcsQ0FBQ1IsS0FBRDtBQUFBLFNBQVcsUUFBUVMsSUFBUixDQUFhSixNQUFNLENBQUNMLEtBQUssSUFBSSxFQUFWLENBQW5CLENBQVg7QUFBQSxDQUFqQjs7QUFFQSxJQUFNVSxpQkFBaUIsR0FBRyxTQUFwQkEsaUJBQW9CLENBQUNDLE9BQUQsRUFBVUMsUUFBVixFQUF1QjtBQUMvQyxNQUFJLENBQUNE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ZiwwR0FBeUNrQyxpQkFBekMsbUZBQ0VHLFlBREYsTUFFSyxJQS9CRjtBQWdDQzRCLGdCQWhDRCxHQWdDUTNGLFVBQVUsYUFDaEJLLFFBRGdCLGNBQ0owRCxZQURJLGNBQ1kvRCxVQURaLGNBRWhCSyxRQUZnQixjQUVKMEQsWUFGSSxDQWhDbEI7QUFBQTtBQUFBLG1CQW1DQ2lCLE1BQU0sQ0FBQ1ksTUFBUCx3SkFDSEQsSUFERyxFQUNJeEMseURBQVEsQ0FBQ0MsU0FBVCxDQUFtQnlDLFVBQW5CLENBQThCVSxXQUE5QixDQUEwQ2xFLEtBQTFDLENBREosRUFuQ0Q7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRyIsImZpbGUiOiJzdGF0aWMvd2VicGFjay9wYWdlcy9OZXdTZWFyY2gvaXRlbS9baWRdLmZhZjUxM2IxOTRmMzc4OTk1OTJkLmhvdC11cGRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZmlyZWJhc2UgZnJvbSBcIi4uL2NvbnRleHQvRmlyZWJhc2VcIjtcblxuY29uc3QgT0VNX0ZJRUxEX0NBTkRJREFURVMgPSBbXCJvZW1zXCIsIFwiT0VNc1wiLCBcIm9lbVwiLCBcIk9FTVwiXTtcbmNvbnN0IE1PREVMX0ZJRUxEX0NBTkRJREFURVMgPSBbXCJtb2RlbHNcIiwgXCJNb2RlbHNcIiwgXCJtb2RlbFwiLCBcIk1vZGVsXCIsIFwibGlzdFwiLCBcIml0ZW1zXCJdO1xuY29uc3QgREVGQVVMVF9PRU1fRklFTEQgPSBcIm9lbXNcIjtcblxuY29uc3QgaXNQbGFpbk9iamVjdCA9ICh2YWx1ZSkgPT5cbiAgdmFsdWUgIT0gbnVsbCAmJlxuICB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiZcbiAgIUFycmF5LmlzQXJyYXkodmFsdWUpICYmXG4gICEodmFsdWUgaW5zdGFuY2VvZiBEYXRlKTtcblxuY29uc3Qgbm9ybWFsaXplS2V5ID0gKHZhbHVlKSA9PiB7XG4gIGlmICh2YWx1ZSA9PSBudWxsKSByZXR1cm4gXCJcIjtcbiAgcmV0dXJuIFN0cmluZyh2YWx1ZSkudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG59O1xuXG5jb25zdCBoYXNVcHBlciA9ICh2YWx1ZSkgPT4gL1tBLVpdLy50ZXN0KFN0cmluZyh2YWx1ZSB8fCBcIlwiKSk7XG5cbmNvbnN0IHBpY2tQcmVmZXJyZWRDYXNlID0gKGN1cnJlbnQsIGluY29taW5nKSA9PiB7XG4gIGlmICghY3VycmVudCkgcmV0dXJuIGluY29taW5nO1xuICBpZiAoIWluY29taW5nKSByZXR1cm4gY3VycmVudDtcbiAgY29uc3QgY3VycmVudFVwcGVyID0gaGFzVXBwZXIoY3VycmVudCk7XG4gIGNvbnN0IGluY29taW5nVXBwZXIgPSBoYXNVcHBlcihpbmNvbWluZyk7XG4gIGlmIChpbmNvbWluZ1VwcGVyICYmICFjdXJyZW50VXBwZXIpIHJldHVybiBpbmNvbWluZztcbiAgaWYgKGN1cnJlbnRVcHBlciAmJiAhaW5jb21pbmdVcHBlcikgcmV0dXJuIGN1cnJlbnQ7XG4gIHJldHVybiBjdXJyZW50O1xufTtcblxuY29uc3Qgbm9ybWFsaXplQXJyYXkgPSAodmFsdWUpID0+IHtcbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSByZXR1cm4gdmFsdWU7XG4gIGlmICh2YWx1ZSA9PSBudWxsIHx8IHZhbHVlID09PSBcIlwiKSByZXR1cm4gW107XG4gIHJldHVybiBbdmFsdWVdO1xufTtcblxuY29uc3Qgbm9ybWFsaXplTGlzdCA9ICh2YWx1ZXMpID0+IHtcbiAgY29uc3Qgb3V0ID0gW107XG4gICh2YWx1ZXMgfHwgW10pLmZvckVhY2goKHZhbHVlKSA9PiB7XG4gICAgaWYgKHZhbHVlID09IG51bGwpIHJldHVybjtcbiAgICBjb25zdCBub3JtYWxpemVkID0gU3RyaW5nKHZhbHVlKS50cmltKCk7XG4gICAgaWYgKCFub3JtYWxpemVkKSByZXR1cm47XG4gICAgaWYgKG5vcm1hbGl6ZUtleShub3JtYWxpemVkKSA9PT0gXCJuYW5cIikgcmV0dXJuO1xuICAgIG91dC5wdXNoKG5vcm1hbGl6ZWQpO1xuICB9KTtcbiAgcmV0dXJuIEFycmF5LmZyb20obmV3IFNldChvdXQpKTtcbn07XG5cbmNvbnN0IG5vcm1hbGl6ZUxpc3RDYXNlSW5zZW5zaXRpdmUgPSAodmFsdWVzKSA9PiB7XG4gIGNvbnN0IG1hcCA9IG5ldyBNYXAoKTtcbiAgKHZhbHVlcyB8fCBbXSkuZm9yRWFjaCgodmFsdWUpID0+IHtcbiAgICBpZiAodmFsdWUgPT0gbnVsbCkgcmV0dXJuO1xuICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSBTdHJpbmcodmFsdWUpLnRyaW0oKTtcbiAgICBpZiAoIW5vcm1hbGl6ZWQpIHJldHVybjtcbiAgICBjb25zdCBrZXkgPSBub3JtYWxpemVLZXkobm9ybWFsaXplZCk7XG4gICAgaWYgKCFrZXkgfHwga2V5ID09PSBcIm5hblwiKSByZXR1cm47XG4gICAgY29uc3QgY3VycmVudCA9IG1hcC5nZXQoa2V5KTtcbiAgICBtYXAuc2V0KGtleSwgcGlja1ByZWZlcnJlZENhc2UoY3VycmVudCwgbm9ybWFsaXplZCkpO1xuICB9KTtcbiAgcmV0dXJuIEFycmF5LmZyb20obWFwLnZhbHVlcygpKTtcbn07XG5cblxuY29uc3QgcGlja01vZGVsRmllbGQgPSAob2JqKSA9PiB7XG4gIGlmICghaXNQbGFpbk9iamVjdChvYmopKSByZXR1cm4gbnVsbDtcbiAgZm9yIChjb25zdCBrZXkgb2YgTU9ERUxfRklFTERfQ0FORElEQVRFUykge1xuICAgIGlmIChBcnJheS5pc0FycmF5KG9ialtrZXldKSkgcmV0dXJuIGtleTtcbiAgfVxuICBjb25zdCBhcnJheUtleSA9IE9iamVjdC5rZXlzKG9iaikuZmluZCgoa2V5KSA9PiBBcnJheS5pc0FycmF5KG9ialtrZXldKSk7XG4gIHJldHVybiBhcnJheUtleSB8fCBudWxsO1xufTtcblxuY29uc3QgZXh0cmFjdE1vZGVscyA9ICh2YWx1ZSkgPT4ge1xuICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICByZXR1cm4geyBtb2RlbHM6IG5vcm1hbGl6ZUxpc3QodmFsdWUpLCBtb2RlbEZpZWxkOiBudWxsIH07XG4gIH1cbiAgaWYgKGlzUGxhaW5PYmplY3QodmFsdWUpKSB7XG4gICAgY29uc3QgbW9kZWxGaWVsZCA9IHBpY2tNb2RlbEZpZWxkKHZhbHVlKTtcbiAgICBjb25zdCBtb2RlbHMgPSBtb2RlbEZpZWxkID8gbm9ybWFsaXplTGlzdCh2YWx1ZVttb2RlbEZpZWxkXSkgOiBbXTtcbiAgICByZXR1cm4geyBtb2RlbHMsIG1vZGVsRmllbGQgfTtcbiAgfVxuICBpZiAodmFsdWUgIT0gbnVsbCAmJiB2YWx1ZSAhPT0gXCJcIikge1xuICAgIHJldHVybiB7IG1vZGVsczogbm9ybWFsaXplTGlzdChbdmFsdWVdKSwgbW9kZWxGaWVsZDogbnVsbCB9O1xuICB9XG4gIHJldHVybiB7IG1vZGVsczogW10sIG1vZGVsRmllbGQ6IG51bGwgfTtcbn07XG5cbmNvbnN0IGV4dHJhY3RPZW1NYXAgPSAoZGF0YSkgPT4ge1xuICBjb25zdCBvZW1NYXAgPSB7fTtcbiAgY29uc3QgbW9kZWxGaWVsZEJ5T2VtID0ge307XG4gIGxldCBvZW1GaWVsZCA9IG51bGw7XG5cbiAgZm9yIChjb25zdCBrZXkgb2YgT0VNX0ZJRUxEX0NBTkRJREFURVMpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRhPy5ba2V5XSkpIHtcbiAgICAgIG9lbUZpZWxkID0ga2V5O1xuICAgICAgZGF0YVtrZXldLmZvckVhY2goKGVudHJ5KSA9PiB7XG4gICAgICAgIGlmIChlbnRyeSA9PSBudWxsKSByZXR1cm47XG4gICAgICAgIGlmIChpc1BsYWluT2JqZWN0KGVudHJ5KSkge1xuICAgICAgICAgIGNvbnN0IG5hbWUgPVxuICAgICAgICAgICAgZW50cnkubmFtZSB8fFxuICAgICAgICAgICAgZW50cnkub2VtIHx8XG4gICAgICAgICAgICBlbnRyeS5PRU0gfHxcbiAgICAgICAgICAgIGVudHJ5LmxhYmVsIHx8XG4gICAgICAgICAgICBlbnRyeS52YWx1ZTtcbiAgICAgICAgICBpZiAoIW5hbWUpIHJldHVybjtcbiAgICAgICAgICBjb25zdCBub3JtYWxpemVkTmFtZSA9IFN0cmluZyhuYW1lKS50cmltKCk7XG4gICAgICAgICAgaWYgKCFub3JtYWxpemVkTmFtZSkgcmV0dXJuO1xuICAgICAgICAgIGNvbnN0IHsgbW9kZWxzIH0gPSBleHRyYWN0TW9kZWxzKGVudHJ5Lm1vZGVscyB8fCBlbnRyeS5saXN0IHx8IGVudHJ5Lml0ZW1zKTtcbiAgICAgICAgICBvZW1NYXBbbm9ybWFsaXplZE5hbWVdID0gbm9ybWFsaXplTGlzdChbXG4gICAgICAgICAgICAuLi4ob2VtTWFwW25vcm1hbGl6ZWROYW1lXSB8fCBbXSksXG4gICAgICAgICAgICAuLi5tb2RlbHMsXG4gICAgICAgICAgXSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSBTdHJpbmcoZW50cnkgfHwgXCJcIikudHJpbSgpO1xuICAgICAgICBpZiAoIW5vcm1hbGl6ZWQpIHJldHVybjtcbiAgICAgICAgb2VtTWFwW25vcm1hbGl6ZWRdID0gbm9ybWFsaXplTGlzdChbLi4uKG9lbU1hcFtub3JtYWxpemVkXSB8fCBbXSldKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoaXNQbGFpbk9iamVjdChkYXRhPy5ba2V5XSkpIHtcbiAgICAgIG9lbUZpZWxkID0ga2V5O1xuICAgICAgT2JqZWN0LmVudHJpZXMoZGF0YVtrZXldKS5mb3JFYWNoKChbb2VtLCB2YWx1ZV0pID0+IHtcbiAgICAgICAgY29uc3QgeyBtb2RlbHMsIG1vZGVsRmllbGQgfSA9IGV4dHJhY3RNb2RlbHModmFsdWUpO1xuICAgICAgICBvZW1NYXBbb2VtXSA9IG5vcm1hbGl6ZUxpc3QoWy4uLihvZW1NYXBbb2VtXSB8fCBbXSksIC4uLm1vZGVsc10pO1xuICAgICAgICBpZiAobW9kZWxGaWVsZCkge1xuICAgICAgICAgIG1vZGVsRmllbGRCeU9lbVtvZW1dID0gbW9kZWxGaWVsZDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgaWYgKCFvZW1GaWVsZCkge1xuICAgIE9iamVjdC5lbnRyaWVzKGRhdGEgfHwge30pLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xuICAgICAgaWYgKCF2YWx1ZSkgcmV0dXJuO1xuICAgICAgaWYgKGtleS5zdGFydHNXaXRoKFwiX1wiKSkgcmV0dXJuO1xuICAgICAgaWYgKGlzUGxhaW5PYmplY3QodmFsdWUpIHx8IEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgIGNvbnN0IHsgbW9kZWxzLCBtb2RlbEZpZWxkIH0gPSBleHRyYWN0TW9kZWxzKHZhbHVlKTtcbiAgICAgICAgaWYgKG1vZGVscy5sZW5ndGggfHwgbW9kZWxGaWVsZCkge1xuICAgICAgICAgIG9lbU1hcFtrZXldID0gbm9ybWFsaXplTGlzdChbLi4uKG9lbU1hcFtrZXldIHx8IFtdKSwgLi4ubW9kZWxzXSk7XG4gICAgICAgICAgaWYgKG1vZGVsRmllbGQpIHtcbiAgICAgICAgICAgIG1vZGVsRmllbGRCeU9lbVtrZXldID0gbW9kZWxGaWVsZDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiB7IG9lbU1hcCwgb2VtRmllbGQsIG1vZGVsRmllbGRCeU9lbSB9O1xufTtcblxuXG5jb25zdCBidWlsZENhdGFsb2dNZXRhRnJvbU1hcHMgPSAoe1xuICBtb2RhbGl0aWVzID0gW10sXG4gIG9lbXNCeU1vZGFsaXR5ID0ge30sXG4gIG1vZGVsc0J5TW9kYWxpdHlPZW0gPSB7fSxcbiAgdXNlc1N1YmNvbGxlY3Rpb25zID0gZmFsc2UsXG4gIHN5bmNEaXNhYmxlZCA9IGZhbHNlLFxuICBzb3VyY2UgPSBcImNsaWVudFwiLFxufSkgPT4ge1xuICBjb25zdCBtZXRhID0ge1xuICAgIG9lbUZpZWxkQnlNb2RhbGl0eToge30sXG4gICAgbW9kZWxGaWVsZEJ5TW9kYWxpdHlPZW06IHt9LFxuICAgIG1vZGFsaXR5S2V5QnlMb3dlcjoge30sXG4gICAgb2VtS2V5QnlNb2RhbGl0eUxvd2VyOiB7fSxcbiAgICBtb2RlbEtleUJ5TW9kYWxpdHlPZW1Mb3dlcjoge30sXG4gICAgdXNlc1N1YmNvbGxlY3Rpb25zLFxuICAgIHN5bmNEaXNhYmxlZCxcbiAgICBzb3VyY2UsXG4gIH07XG5cbiAgY29uc3Qgbm9ybWFsaXplZE1vZGFsaXRpZXMgPSBub3JtYWxpemVMaXN0Q2FzZUluc2Vuc2l0aXZlKG1vZGFsaXRpZXMpO1xuICBub3JtYWxpemVkTW9kYWxpdGllcy5mb3JFYWNoKChtb2RhbGl0eSkgPT4ge1xuICAgIGNvbnN0IG1vZGFsaXR5TG93ZXIgPSBub3JtYWxpemVLZXkobW9kYWxpdHkpO1xuICAgIG1ldGEubW9kYWxpdHlLZXlCeUxvd2VyW21vZGFsaXR5TG93ZXJdID0gcGlja1ByZWZlcnJlZENhc2UoXG4gICAgICBtZXRhLm1vZGFsaXR5S2V5QnlMb3dlclttb2RhbGl0eUxvd2VyXSxcbiAgICAgIG1vZGFsaXR5XG4gICAgKTtcbiAgICBjb25zdCBvZW1zID0gb2Vtc0J5TW9kYWxpdHk/Llttb2RhbGl0eV0gfHwgW107XG4gICAgY29uc3Qgb2VtTG93ZXJNYXAgPVxuICAgICAgbWV0YS5vZW1LZXlCeU1vZGFsaXR5TG93ZXJbbW9kYWxpdHlMb3dlcl0gfHwge307XG4gICAgbWV0YS5vZW1LZXlCeU1vZGFsaXR5TG93ZXJbbW9kYWxpdHlMb3dlcl0gPSBvZW1Mb3dlck1hcDtcbiAgICBjb25zdCBtb2RlbExvd2VyTWFwID1cbiAgICAgIG1ldGEubW9kZWxLZXlCeU1vZGFsaXR5T2VtTG93ZXJbbW9kYWxpdHlMb3dlcl0gfHwge307XG4gICAgbWV0YS5tb2RlbEtleUJ5TW9kYWxpdHlPZW1Mb3dlclttb2RhbGl0eUxvd2VyXSA9IG1vZGVsTG93ZXJNYXA7XG5cbiAgICBvZW1zLmZvckVhY2goKG9lbSkgPT4ge1xuICAgICAgY29uc3Qgb2VtTG93ZXIgPSBub3JtYWxpemVLZXkob2VtKTtcbiAgICAgIG9lbUxvd2VyTWFwW29lbUxvd2VyXSA9IHBpY2tQcmVmZXJyZWRDYXNlKG9lbUxvd2VyTWFwW29lbUxvd2VyXSwgb2VtKTtcbiAgICAgIGNvbnN0IG1vZGVscyA9IG1vZGVsc0J5TW9kYWxpdHlPZW0/Llttb2RhbGl0eV0/LltvZW1dIHx8IFtdO1xuICAgICAgbW9kZWxMb3dlck1hcFtvZW1Mb3dlcl0gPSBtb2RlbExvd2VyTWFwW29lbUxvd2VyXSB8fCB7fTtcbiAgICAgIG1vZGVscy5mb3JFYWNoKChtb2RlbCkgPT4ge1xuICAgICAgICBjb25zdCBtb2RlbExvd2VyID0gbm9ybWFsaXplS2V5KG1vZGVsKTtcbiAgICAgICAgaWYgKCFtb2RlbExvd2VyKSByZXR1cm47XG4gICAgICAgIG1vZGVsTG93ZXJNYXBbb2VtTG93ZXJdW21vZGVsTG93ZXJdID0gcGlja1ByZWZlcnJlZENhc2UoXG4gICAgICAgICAgbW9kZWxMb3dlck1hcFtvZW1Mb3dlcl1bbW9kZWxMb3dlcl0sXG4gICAgICAgICAgbW9kZWxcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcblxuICByZXR1cm4ge1xuICAgIG1vZGFsaXRpZXM6IG5vcm1hbGl6ZWRNb2RhbGl0aWVzLFxuICAgIG9lbXNCeU1vZGFsaXR5LFxuICAgIG1vZGVsc0J5TW9kYWxpdHlPZW0sXG4gICAgbWV0YSxcbiAgfTtcbn07XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmZXRjaFRyYWNrZXJDYXRhbG9nKCkge1xuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuICAgICAgICBgL2FwaS90cmFja2VyL2NhdGFsb2c/dHM9JHtEYXRlLm5vdygpfWAsXG4gICAgICAgIHsgY2FjaGU6IFwibm8tc3RvcmVcIiB9XG4gICAgICApO1xuICAgICAgaWYgKHJlc3BvbnNlLm9rKSB7XG4gICAgICAgIGNvbnN0IHBheWxvYWQgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgIGlmIChwYXlsb2FkPy5tb2RhbGl0aWVzKSB7XG4gICAgICAgICAgcmV0dXJuIGJ1aWxkQ2F0YWxvZ01ldGFGcm9tTWFwcyh7XG4gICAgICAgICAgICBtb2RhbGl0aWVzOiBwYXlsb2FkLm1vZGFsaXRpZXMgfHwgW10sXG4gICAgICAgICAgICBvZW1zQnlNb2RhbGl0eTogcGF5bG9hZC5vZW1zQnlNb2RhbGl0eSB8fCB7fSxcbiAgICAgICAgICAgIG1vZGVsc0J5TW9kYWxpdHlPZW06IHBheWxvYWQubW9kZWxzQnlNb2RhbGl0eU9lbSB8fCB7fSxcbiAgICAgICAgICAgIHVzZXNTdWJjb2xsZWN0aW9uczogQm9vbGVhbihwYXlsb2FkLnVzZXNTdWJjb2xsZWN0aW9ucyksXG4gICAgICAgICAgICBzeW5jRGlzYWJsZWQ6IGZhbHNlLFxuICAgICAgICAgICAgc291cmNlOiBcInNlcnZlclwiLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUud2FybihcIlRyYWNrZXIgY2F0YWxvZyBBUEkgZmFsbGJhY2s6XCIsIGVycm9yKTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBkYiA9IGZpcmViYXNlLmZpcmVzdG9yZSgpO1xuICBjb25zdCBzbmFwID0gYXdhaXQgZGIuY29sbGVjdGlvbihcIlRyYWNrZXJcIikuZ2V0KCk7XG4gIGNvbnNvbGUubG9nKFxuICAgIFwiVHJhY2tlciBjYXRhbG9nIGNsaWVudCBkb2NzOlwiLFxuICAgIHNuYXAuZG9jcy5tYXAoKGRvYykgPT4gZG9jLmlkKVxuICApO1xuXG4gIGNvbnN0IG1vZGFsaXRpZXMgPSBbXTtcbiAgY29uc3Qgb2Vtc0J5TW9kYWxpdHkgPSB7fTtcbiAgY29uc3QgbW9kZWxzQnlNb2RhbGl0eU9lbSA9IHt9O1xuICBjb25zdCBtZXRhID0ge1xuICAgIG9lbUZpZWxkQnlNb2RhbGl0eToge30sXG4gICAgbW9kZWxGaWVsZEJ5TW9kYWxpdHlPZW06IHt9LFxuICAgIG1vZGFsaXR5S2V5QnlMb3dlcjoge30sXG4gICAgb2VtS2V5QnlNb2RhbGl0eUxvd2VyOiB7fSxcbiAgICBtb2RlbEtleUJ5TW9kYWxpdHlPZW1Mb3dlcjoge30sXG4gIH07XG5cbiAgc25hcC5mb3JFYWNoKChkb2MpID0+IHtcbiAgICBjb25zdCBtb2RhbGl0eSA9IGRvYy5pZDtcbiAgICBjb25zdCBtb2RhbGl0eUxvd2VyID0gbm9ybWFsaXplS2V5KG1vZGFsaXR5KTtcbiAgICBjb25zdCBleGlzdGluZ01vZGFsaXR5ID0gbWV0YS5tb2RhbGl0eUtleUJ5TG93ZXJbbW9kYWxpdHlMb3dlcl07XG4gICAgY29uc3QgY2Fub25pY2FsTW9kYWxpdHkgPSBwaWNrUHJlZmVycmVkQ2FzZShleGlzdGluZ01vZGFsaXR5LCBtb2RhbGl0eSk7XG4gICAgbWV0YS5tb2RhbGl0eUtleUJ5TG93ZXJbbW9kYWxpdHlMb3dlcl0gPSBjYW5vbmljYWxNb2RhbGl0eTtcbiAgICBjb25zdCBkYXRhID0gZG9jLmRhdGEoKSB8fCB7fTtcbiAgICBjb25zdCB7IG9lbU1hcCwgb2VtRmllbGQsIG1vZGVsRmllbGRCeU9lbSB9ID0gZXh0cmFjdE9lbU1hcChkYXRhKTtcblxuICAgIGlmIChleGlzdGluZ01vZGFsaXR5ICYmIGV4aXN0aW5nTW9kYWxpdHkgIT09IGNhbm9uaWNhbE1vZGFsaXR5KSB7XG4gICAgICBvZW1zQnlNb2RhbGl0eVtjYW5vbmljYWxNb2RhbGl0eV0gPSBub3JtYWxpemVMaXN0Q2FzZUluc2Vuc2l0aXZlKFtcbiAgICAgICAgLi4uKG9lbXNCeU1vZGFsaXR5W2V4aXN0aW5nTW9kYWxpdHldIHx8IFtdKSxcbiAgICAgICAgLi4uKG9lbXNCeU1vZGFsaXR5W2Nhbm9uaWNhbE1vZGFsaXR5XSB8fCBbXSksXG4gICAgICBdKTtcbiAgICAgIG1vZGVsc0J5TW9kYWxpdHlPZW1bY2Fub25pY2FsTW9kYWxpdHldID0ge1xuICAgICAgICAuLi4obW9kZWxzQnlNb2RhbGl0eU9lbVtleGlzdGluZ01vZGFsaXR5XSB8fCB7fSksXG4gICAgICAgIC4uLihtb2RlbHNCeU1vZGFsaXR5T2VtW2Nhbm9uaWNhbE1vZGFsaXR5XSB8fCB7fSksXG4gICAgICB9O1xuICAgICAgbWV0YS5tb2RlbEZpZWxkQnlNb2RhbGl0eU9lbVtjYW5vbmljYWxNb2RhbGl0eV0gPSB7XG4gICAgICAgIC4uLihtZXRhLm1vZGVsRmllbGRCeU1vZGFsaXR5T2VtW2V4aXN0aW5nTW9kYWxpdHldIHx8IHt9KSxcbiAgICAgICAgLi4uKG1ldGEubW9kZWxGaWVsZEJ5TW9kYWxpdHlPZW1bY2Fub25pY2FsTW9kYWxpdHldIHx8IHt9KSxcbiAgICAgIH07XG4gICAgICBpZiAoIW1ldGEub2VtRmllbGRCeU1vZGFsaXR5W2Nhbm9uaWNhbE1vZGFsaXR5XSkge1xuICAgICAgICBtZXRhLm9lbUZpZWxkQnlNb2RhbGl0eVtjYW5vbmljYWxNb2RhbGl0eV0gPVxuICAgICAgICAgIG1ldGEub2VtRmllbGRCeU1vZGFsaXR5W2V4aXN0aW5nTW9kYWxpdHldIHx8IG9lbUZpZWxkO1xuICAgICAgfVxuICAgICAgZGVsZXRlIG9lbXNCeU1vZGFsaXR5W2V4aXN0aW5nTW9kYWxpdHldO1xuICAgICAgZGVsZXRlIG1vZGVsc0J5TW9kYWxpdHlPZW1bZXhpc3RpbmdNb2RhbGl0eV07XG4gICAgICBkZWxldGUgbWV0YS5vZW1GaWVsZEJ5TW9kYWxpdHlbZXhpc3RpbmdNb2RhbGl0eV07XG4gICAgICBkZWxldGUgbWV0YS5tb2RlbEZpZWxkQnlNb2RhbGl0eU9lbVtleGlzdGluZ01vZGFsaXR5XTtcbiAgICB9XG5cbiAgICBtb2RhbGl0aWVzLnB1c2goY2Fub25pY2FsTW9kYWxpdHkpO1xuICAgIGlmICghbWV0YS5vZW1GaWVsZEJ5TW9kYWxpdHlbY2Fub25pY2FsTW9kYWxpdHldKSB7XG4gICAgICBtZXRhLm9lbUZpZWxkQnlNb2RhbGl0eVtjYW5vbmljYWxNb2RhbGl0eV0gPSBvZW1GaWVsZDtcbiAgICB9XG4gICAgbWV0YS5tb2RlbEZpZWxkQnlNb2RhbGl0eU9lbVtjYW5vbmljYWxNb2RhbGl0eV0gPSB7XG4gICAgICAuLi4obWV0YS5tb2RlbEZpZWxkQnlNb2RhbGl0eU9lbVtjYW5vbmljYWxNb2RhbGl0eV0gfHwge30pLFxuICAgICAgLi4uKG1vZGVsRmllbGRCeU9lbSB8fCB7fSksXG4gICAgfTtcblxuICAgIGNvbnN0IG9lbXMgPSBPYmplY3Qua2V5cyhvZW1NYXApO1xuICAgIGNvbnN0IG1lcmdlZE9lbXMgPSBub3JtYWxpemVMaXN0Q2FzZUluc2Vuc2l0aXZlKFtcbiAgICAgIC4uLihvZW1zQnlNb2RhbGl0eVtjYW5vbmljYWxNb2RhbGl0eV0gfHwgW10pLFxuICAgICAgLi4ub2VtcyxcbiAgICBdKTtcbiAgICBvZW1zQnlNb2RhbGl0eVtjYW5vbmljYWxNb2RhbGl0eV0gPSBtZXJnZWRPZW1zO1xuICAgIG1vZGVsc0J5TW9kYWxpdHlPZW1bY2Fub25pY2FsTW9kYWxpdHldID1cbiAgICAgIG1vZGVsc0J5TW9kYWxpdHlPZW1bY2Fub25pY2FsTW9kYWxpdHldIHx8IHt9O1xuICAgIGNvbnN0IG9lbUxvd2VyTWFwID1cbiAgICAgIG1ldGEub2VtS2V5QnlNb2RhbGl0eUxvd2VyW21vZGFsaXR5TG93ZXJdIHx8IHt9O1xuICAgIG1ldGEub2VtS2V5QnlNb2RhbGl0eUxvd2VyW21vZGFsaXR5TG93ZXJdID0gb2VtTG93ZXJNYXA7XG4gICAgY29uc3QgbW9kZWxMb3dlck1hcCA9XG4gICAgICBtZXRhLm1vZGVsS2V5QnlNb2RhbGl0eU9lbUxvd2VyW21vZGFsaXR5TG93ZXJdIHx8IHt9O1xuICAgIG1ldGEubW9kZWxLZXlCeU1vZGFsaXR5T2VtTG93ZXJbbW9kYWxpdHlMb3dlcl0gPSBtb2RlbExvd2VyTWFwO1xuICAgIG9lbXMuZm9yRWFjaCgob2VtKSA9PiB7XG4gICAgICBjb25zdCBvZW1Mb3dlciA9IG5vcm1hbGl6ZUtleShvZW0pO1xuICAgICAgY29uc3QgZXhpc3RpbmdPZW0gPSBvZW1Mb3dlck1hcFtvZW1Mb3dlcl07XG4gICAgICBjb25zdCBjYW5vbmljYWxPZW0gPSBwaWNrUHJlZmVycmVkQ2FzZShleGlzdGluZ09lbSwgb2VtKTtcbiAgICAgIG9lbUxvd2VyTWFwW29lbUxvd2VyXSA9IGNhbm9uaWNhbE9lbTtcbiAgICAgIGlmIChleGlzdGluZ09lbSAmJiBleGlzdGluZ09lbSAhPT0gY2Fub25pY2FsT2VtKSB7XG4gICAgICAgIG1vZGVsc0J5TW9kYWxpdHlPZW1bY2Fub25pY2FsTW9kYWxpdHldW2Nhbm9uaWNhbE9lbV0gPSBub3JtYWxpemVMaXN0Q2FzZUluc2Vuc2l0aXZlKFtcbiAgICAgICAgICAuLi4obW9kZWxzQnlNb2RhbGl0eU9lbVtjYW5vbmljYWxNb2RhbGl0eV1bZXhpc3RpbmdPZW1dIHx8IFtdKSxcbiAgICAgICAgICAuLi4obW9kZWxzQnlNb2RhbGl0eU9lbVtjYW5vbmljYWxNb2RhbGl0eV1bY2Fub25pY2FsT2VtXSB8fCBbXSksXG4gICAgICAgIF0pO1xuICAgICAgICBkZWxldGUgbW9kZWxzQnlNb2RhbGl0eU9lbVtjYW5vbmljYWxNb2RhbGl0eV1bZXhpc3RpbmdPZW1dO1xuICAgICAgfVxuICAgICAgY29uc3QgZXhpc3RpbmdNb2RlbHMgPVxuICAgICAgICBtb2RlbHNCeU1vZGFsaXR5T2VtW2Nhbm9uaWNhbE1vZGFsaXR5XVtjYW5vbmljYWxPZW1dIHx8IFtdO1xuICAgICAgY29uc3QgbWVyZ2VkTW9kZWxzID0gbm9ybWFsaXplTGlzdENhc2VJbnNlbnNpdGl2ZShbXG4gICAgICAgIC4uLmV4aXN0aW5nTW9kZWxzLFxuICAgICAgICAuLi4ob2VtTWFwW29lbV0gfHwgW10pLFxuICAgICAgXSk7XG4gICAgICBtb2RlbHNCeU1vZGFsaXR5T2VtW2Nhbm9uaWNhbE1vZGFsaXR5XVtjYW5vbmljYWxPZW1dID0gbWVyZ2VkTW9kZWxzO1xuICAgICAgbW9kZWxMb3dlck1hcFtvZW1Mb3dlcl0gPSBtb2RlbExvd2VyTWFwW29lbUxvd2VyXSB8fCB7fTtcbiAgICAgIG1lcmdlZE1vZGVscy5mb3JFYWNoKChtb2RlbCkgPT4ge1xuICAgICAgICBtb2RlbExvd2VyTWFwW29lbUxvd2VyXVtub3JtYWxpemVLZXkobW9kZWwpXSA9IG1vZGVsO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIHJldHVybiBidWlsZENhdGFsb2dNZXRhRnJvbU1hcHMoe1xuICAgIG1vZGFsaXRpZXMsXG4gICAgb2Vtc0J5TW9kYWxpdHksXG4gICAgbW9kZWxzQnlNb2RhbGl0eU9lbSxcbiAgICB1c2VzU3ViY29sbGVjdGlvbnM6IHRydWUsXG4gICAgc3luY0Rpc2FibGVkOiBmYWxzZSxcbiAgICBzb3VyY2U6IFwiY2xpZW50XCIsXG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRBbGxPZW1zKGNhdGFsb2cpIHtcbiAgY29uc3QgbWFwID0gbmV3IE1hcCgpO1xuICBPYmplY3QudmFsdWVzKGNhdGFsb2c/Lm9lbXNCeU1vZGFsaXR5IHx8IHt9KS5mb3JFYWNoKChvZW1zKSA9PiB7XG4gICAgKG9lbXMgfHwgW10pLmZvckVhY2goKG9lbSkgPT4ge1xuICAgICAgY29uc3Qga2V5ID0gbm9ybWFsaXplS2V5KG9lbSk7XG4gICAgICBpZiAoIWtleSkgcmV0dXJuO1xuICAgICAgY29uc3QgY3VycmVudCA9IG1hcC5nZXQoa2V5KTtcbiAgICAgIG1hcC5zZXQoa2V5LCBwaWNrUHJlZmVycmVkQ2FzZShjdXJyZW50LCBvZW0pKTtcbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiBBcnJheS5mcm9tKG1hcC52YWx1ZXMoKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBidWlsZE1vZGVsc0ZvclNlbGVjdGlvbihjYXRhbG9nLCBtb2RhbGl0aWVzID0gW10sIG9lbXMgPSBbXSkge1xuICBjb25zdCBtb2RlbFNldCA9IG5ldyBTZXQoKTtcbiAgY29uc3QgbW9kYWxzID0gbm9ybWFsaXplTGlzdChtb2RhbGl0aWVzKTtcbiAgY29uc3Qgb2VtTGlzdCA9IG5vcm1hbGl6ZUxpc3Qob2Vtcyk7XG4gIG1vZGFscy5mb3JFYWNoKChtb2RhbGl0eSkgPT4ge1xuICAgIGNvbnN0IG1vZGFsaXR5TG93ZXIgPSBub3JtYWxpemVLZXkobW9kYWxpdHkpO1xuICAgIGNvbnN0IGNhbm9uaWNhbE1vZGFsaXR5ID1cbiAgICAgIGNhdGFsb2c/Lm1ldGE/Lm1vZGFsaXR5S2V5QnlMb3dlcj8uW21vZGFsaXR5TG93ZXJdIHx8IG1vZGFsaXR5O1xuICAgIGNvbnN0IG9lbU1hcCA9IGNhdGFsb2c/Lm1vZGVsc0J5TW9kYWxpdHlPZW0/LltjYW5vbmljYWxNb2RhbGl0eV0gfHwge307XG4gICAgb2VtTGlzdC5mb3JFYWNoKChvZW0pID0+IHtcbiAgICAgIGNvbnN0IG9lbUxvd2VyID0gbm9ybWFsaXplS2V5KG9lbSk7XG4gICAgICBjb25zdCBjYW5vbmljYWxPZW0gPVxuICAgICAgICBjYXRhbG9nPy5tZXRhPy5vZW1LZXlCeU1vZGFsaXR5TG93ZXI/Llttb2RhbGl0eUxvd2VyXT8uW29lbUxvd2VyXSB8fCBvZW07XG4gICAgICBjb25zdCBtb2RlbHMgPSBvZW1NYXA/LltjYW5vbmljYWxPZW1dIHx8IFtdO1xuICAgICAgbW9kZWxzLmZvckVhY2goKG1vZGVsKSA9PiBtb2RlbFNldC5hZGQobW9kZWwpKTtcbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiBBcnJheS5mcm9tKG1vZGVsU2V0KTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHN5bmNUcmFja2VyRnJvbVNlbGVjdGlvbnMoe1xuICBzZWxlY3Rpb25zLFxuICBjYXRhbG9nLFxufSkge1xuICBjb25zdCBkYiA9IGZpcmViYXNlLmZpcmVzdG9yZSgpO1xuICBjb25zdCB0cmFja2VyUmVmID0gZGIuY29sbGVjdGlvbihcIlRyYWNrZXJcIik7XG4gIGNvbnN0IHNlbGVjdGVkTW9kYWxpdGllcyA9IG5vcm1hbGl6ZUxpc3Qoc2VsZWN0aW9ucz8ubW9kYWxpdGllcyB8fCBbXSk7XG4gIGNvbnN0IHNlbGVjdGVkT2VtcyA9IG5vcm1hbGl6ZUxpc3Qoc2VsZWN0aW9ucz8ub2VtcyB8fCBbXSk7XG4gIGNvbnN0IHNlbGVjdGVkTW9kZWxzID0gbm9ybWFsaXplTGlzdChzZWxlY3Rpb25zPy5tb2RlbHMgfHwgW10pO1xuXG4gIGlmICghc2VsZWN0ZWRNb2RhbGl0aWVzLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuICBpZiAoY2F0YWxvZz8ubWV0YT8uc3luY0Rpc2FibGVkKSByZXR1cm4gZmFsc2U7XG5cbiAgY29uc3Qgb3BzID0gW107XG5cbiAgZm9yIChjb25zdCBtb2RhbGl0eSBvZiBzZWxlY3RlZE1vZGFsaXRpZXMpIHtcbiAgICBjb25zdCBtb2RhbGl0eUxvd2VyID0gbm9ybWFsaXplS2V5KG1vZGFsaXR5KTtcbiAgICBjb25zdCBjYW5vbmljYWxNb2RhbGl0eSA9XG4gICAgICBjYXRhbG9nPy5tZXRhPy5tb2RhbGl0eUtleUJ5TG93ZXI/Llttb2RhbGl0eUxvd2VyXSB8fCBtb2RhbGl0eUxvd2VyO1xuICAgIGNvbnN0IGRvY1JlZiA9IHRyYWNrZXJSZWYuZG9jKGNhbm9uaWNhbE1vZGFsaXR5KTtcbiAgICBjb25zdCBleGlzdGluZ09lbXNSYXcgPSBjYXRhbG9nPy5vZW1zQnlNb2RhbGl0eT8uW2Nhbm9uaWNhbE1vZGFsaXR5XSB8fCBbXTtcbiAgICBjb25zdCBleGlzdGluZ09lbXNMb3dlciA9IG5ldyBTZXQoXG4gICAgICBleGlzdGluZ09lbXNSYXcubWFwKCh2YWx1ZSkgPT4gbm9ybWFsaXplS2V5KHZhbHVlKSlcbiAgICApO1xuXG4gICAgY29uc3Qgb2VtRmllbGQgPVxuICAgICAgY2F0YWxvZz8ubWV0YT8ub2VtRmllbGRCeU1vZGFsaXR5Py5bY2Fub25pY2FsTW9kYWxpdHldIHx8XG4gICAgICBERUZBVUxUX09FTV9GSUVMRDtcblxuICAgIGlmIChcbiAgICAgICFjYXRhbG9nPy5tb2RhbGl0aWVzPy5zb21lKFxuICAgICAgICAoZXhpc3RpbmcpID0+IG5vcm1hbGl6ZUtleShleGlzdGluZykgPT09IG1vZGFsaXR5TG93ZXJcbiAgICAgIClcbiAgICApIHtcbiAgICAgIG9wcy5wdXNoKGRvY1JlZi5zZXQoeyBbREVGQVVMVF9PRU1fRklFTERdOiB7fSB9LCB7IG1lcmdlOiB0cnVlIH0pKTtcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IG9lbSBvZiBzZWxlY3RlZE9lbXMpIHtcbiAgICAgIGNvbnN0IG9lbUxvd2VyID0gbm9ybWFsaXplS2V5KG9lbSk7XG4gICAgICBjb25zdCBjYW5vbmljYWxPZW0gPVxuICAgICAgICBjYXRhbG9nPy5tZXRhPy5vZW1LZXlCeU1vZGFsaXR5TG93ZXI/Llttb2RhbGl0eUxvd2VyXT8uW29lbUxvd2VyXSB8fFxuICAgICAgICBvZW1Mb3dlcjtcbiAgICAgIGlmICghZXhpc3RpbmdPZW1zTG93ZXIuaGFzKG9lbUxvd2VyKSkge1xuICAgICAgICBvcHMucHVzaChcbiAgICAgICAgICBkb2NSZWYuc2V0KHsgW29lbUZpZWxkXTogeyBbY2Fub25pY2FsT2VtXTogW10gfSB9LCB7IG1lcmdlOiB0cnVlIH0pXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBvZW0gb2Ygc2VsZWN0ZWRPZW1zKSB7XG4gICAgICBjb25zdCBvZW1Mb3dlciA9IG5vcm1hbGl6ZUtleShvZW0pO1xuICAgICAgY29uc3QgY2Fub25pY2FsT2VtID1cbiAgICAgICAgY2F0YWxvZz8ubWV0YT8ub2VtS2V5QnlNb2RhbGl0eUxvd2VyPy5bbW9kYWxpdHlMb3dlcl0/LltvZW1Mb3dlcl0gfHxcbiAgICAgICAgb2VtTG93ZXI7XG4gICAgICBjb25zdCBrbm93bk1vZGVscyA9XG4gICAgICAgIGNhdGFsb2c/Lm1vZGVsc0J5TW9kYWxpdHlPZW0/LltjYW5vbmljYWxNb2RhbGl0eV0/LltjYW5vbmljYWxPZW1dIHx8IFtdO1xuICAgICAgY29uc3Qga25vd25Mb3dlciA9IG5ldyBTZXQoXG4gICAgICAgIGtub3duTW9kZWxzLm1hcCgodmFsdWUpID0+IG5vcm1hbGl6ZUtleSh2YWx1ZSkpXG4gICAgICApO1xuICAgICAgY29uc3QgbW9kZWxDYXNlTWFwID1cbiAgICAgICAgY2F0YWxvZz8ubWV0YT8ubW9kZWxLZXlCeU1vZGFsaXR5T2VtTG93ZXI/Llttb2RhbGl0eUxvd2VyXT8uW29lbUxvd2VyXSB8fFxuICAgICAgICB7fTtcbiAgICAgIGNvbnN0IG1vZGVsRmllbGQgPVxuICAgICAgICBjYXRhbG9nPy5tZXRhPy5tb2RlbEZpZWxkQnlNb2RhbGl0eU9lbT8uW2Nhbm9uaWNhbE1vZGFsaXR5XT8uW1xuICAgICAgICAgIGNhbm9uaWNhbE9lbVxuICAgICAgICBdIHx8IG51bGw7XG4gICAgICBmb3IgKGNvbnN0IG1vZGVsIG9mIHNlbGVjdGVkTW9kZWxzKSB7XG4gICAgICAgIGNvbnN0IG1vZGVsTG93ZXIgPSBub3JtYWxpemVLZXkobW9kZWwpO1xuICAgICAgICBpZiAoIW1vZGVsTG93ZXIgfHwga25vd25Mb3dlci5oYXMobW9kZWxMb3dlcikpIGNvbnRpbnVlO1xuICAgICAgICBjb25zdCBjYW5vbmljYWxNb2RlbCA9IG1vZGVsQ2FzZU1hcFttb2RlbExvd2VyXSB8fCBtb2RlbDtcbiAgICAgICAgY29uc3QgcGF0aCA9IG1vZGVsRmllbGRcbiAgICAgICAgICA/IGAke29lbUZpZWxkfS4ke2Nhbm9uaWNhbE9lbX0uJHttb2RlbEZpZWxkfWBcbiAgICAgICAgICA6IGAke29lbUZpZWxkfS4ke2Nhbm9uaWNhbE9lbX1gO1xuICAgICAgICBvcHMucHVzaChcbiAgICAgICAgICBkb2NSZWYudXBkYXRlKHtcbiAgICAgICAgICAgIFtwYXRoXTogZmlyZWJhc2UuZmlyZXN0b3JlLkZpZWxkVmFsdWUuYXJyYXlVbmlvbihjYW5vbmljYWxNb2RlbCksXG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAob3BzLmxlbmd0aCkge1xuICAgIGF3YWl0IFByb21pc2UuYWxsU2V0dGxlZChvcHMpO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRlbGV0ZVRyYWNrZXJPZW0oeyBvZW0sIGNhdGFsb2cgfSkge1xuICBpZiAoIW9lbSkgcmV0dXJuO1xuICBjb25zdCBkYiA9IGZpcmViYXNlLmZpcmVzdG9yZSgpO1xuICBjb25zdCB0cmFja2VyUmVmID0gZGIuY29sbGVjdGlvbihcIlRyYWNrZXJcIik7XG4gIGNvbnN0IG1vZGFsaXRpZXMgPSBjYXRhbG9nPy5tb2RhbGl0aWVzIHx8IFtdO1xuICBjb25zdCB1c2VzU3ViY29sbGVjdGlvbnMgPSBCb29sZWFuKGNhdGFsb2c/Lm1ldGE/LnVzZXNTdWJjb2xsZWN0aW9ucyk7XG4gIGNvbnN0IG9wcyA9IG1vZGFsaXRpZXMubWFwKChtb2RhbGl0eSkgPT4ge1xuICAgIGNvbnN0IG1vZGFsaXR5TG93ZXIgPSBub3JtYWxpemVLZXkobW9kYWxpdHkpO1xuICAgIGNvbnN0IGNhbm9uaWNhbE1vZGFsaXR5ID1cbiAgICAgIGNhdGFsb2c/Lm1ldGE/Lm1vZGFsaXR5S2V5QnlMb3dlcj8uW21vZGFsaXR5TG93ZXJdIHx8IG1vZGFsaXR5O1xuICAgIGNvbnN0IGRvY1JlZiA9IHRyYWNrZXJSZWYuZG9jKGNhbm9uaWNhbE1vZGFsaXR5KTtcbiAgICBjb25zdCBjYW5vbmljYWxPZW0gPVxuICAgICAgY2F0YWxvZz8ubWV0YT8ub2VtS2V5QnlNb2RhbGl0eUxvd2VyPy5bbW9kYWxpdHlMb3dlcl0/LltcbiAgICAgICAgbm9ybWFsaXplS2V5KG9lbSlcbiAgICAgIF0gfHwgb2VtO1xuICAgIGlmICh1c2VzU3ViY29sbGVjdGlvbnMpIHtcbiAgICAgIHJldHVybiBkb2NSZWZcbiAgICAgICAgLmNvbGxlY3Rpb24oY2Fub25pY2FsT2VtKVxuICAgICAgICAuZ2V0KClcbiAgICAgICAgLnRoZW4oKHNuYXApID0+IHtcbiAgICAgICAgICBjb25zdCBkZWxldGlvbnMgPSBbXTtcbiAgICAgICAgICBzbmFwLmZvckVhY2goKGRvYykgPT4ge1xuICAgICAgICAgICAgZGVsZXRpb25zLnB1c2goZG9jLnJlZi5kZWxldGUoKSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsU2V0dGxlZChkZWxldGlvbnMpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKCkgPT4gbnVsbCk7XG4gICAgfVxuICAgIGNvbnN0IG9lbUZpZWxkID1cbiAgICAgIGNhdGFsb2c/Lm1ldGE/Lm9lbUZpZWxkQnlNb2RhbGl0eT8uW2Nhbm9uaWNhbE1vZGFsaXR5XSB8fFxuICAgICAgREVGQVVMVF9PRU1fRklFTEQ7XG4gICAgY29uc3QgdXBkYXRlID0ge1xuICAgICAgW2Ake29lbUZpZWxkfS4ke2Nhbm9uaWNhbE9lbX1gXTogZmlyZWJhc2UuZmlyZXN0b3JlLkZpZWxkVmFsdWUuZGVsZXRlKCksXG4gICAgfTtcbiAgICBpZiAoIWNhdGFsb2c/Lm1ldGE/Lm9lbUZpZWxkQnlNb2RhbGl0eT8uW2Nhbm9uaWNhbE1vZGFsaXR5XSkge1xuICAgICAgdXBkYXRlW2Nhbm9uaWNhbE9lbV0gPSBmaXJlYmFzZS5maXJlc3RvcmUuRmllbGRWYWx1ZS5kZWxldGUoKTtcbiAgICB9XG4gICAgcmV0dXJuIGRvY1JlZi51cGRhdGUodXBkYXRlKS5jYXRjaCgoKSA9PiBudWxsKTtcbiAgfSk7XG4gIGF3YWl0IFByb21pc2UuYWxsU2V0dGxlZChvcHMpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGVsZXRlVHJhY2tlck1vZGVsKHtcbiAgbW9kYWxpdHksXG4gIG9lbSxcbiAgbW9kZWwsXG4gIGNhdGFsb2csXG59KSB7XG4gIGlmICghbW9kYWxpdHkgfHwgIW9lbSB8fCAhbW9kZWwpIHJldHVybjtcbiAgY29uc3QgZGIgPSBmaXJlYmFzZS5maXJlc3RvcmUoKTtcbiAgY29uc3QgbW9kYWxpdHlMb3dlciA9IG5vcm1hbGl6ZUtleShtb2RhbGl0eSk7XG4gIGNvbnN0IGNhbm9uaWNhbE1vZGFsaXR5ID1cbiAgICBjYXRhbG9nPy5tZXRhPy5tb2RhbGl0eUtleUJ5TG93ZXI/Llttb2RhbGl0eUxvd2VyXSB8fCBtb2RhbGl0eTtcbiAgY29uc3QgZG9jUmVmID0gZGIuY29sbGVjdGlvbihcIlRyYWNrZXJcIikuZG9jKGNhbm9uaWNhbE1vZGFsaXR5KTtcbiAgY29uc3QgY2Fub25pY2FsT2VtID1cbiAgICBjYXRhbG9nPy5tZXRhPy5vZW1LZXlCeU1vZGFsaXR5TG93ZXI/Llttb2RhbGl0eUxvd2VyXT8uW1xuICAgICAgbm9ybWFsaXplS2V5KG9lbSlcbiAgICBdIHx8IG9lbTtcbiAgaWYgKGNhdGFsb2c/Lm1ldGE/LnVzZXNTdWJjb2xsZWN0aW9ucykge1xuICAgIGNvbnN0IG1vZGVsS2V5ID0gbm9ybWFsaXplS2V5KG1vZGVsKTtcbiAgICBhd2FpdCBkb2NSZWZcbiAgICAgIC5jb2xsZWN0aW9uKGNhbm9uaWNhbE9lbSlcbiAgICAgIC5kb2MobW9kZWxLZXkpXG4gICAgICAuZGVsZXRlKClcbiAgICAgIC5jYXRjaCgoKSA9PiBudWxsKTtcbiAgICByZXR1cm47XG4gIH1cbiAgY29uc3Qgb2VtRmllbGQgPVxuICAgIGNhdGFsb2c/Lm1ldGE/Lm9lbUZpZWxkQnlNb2RhbGl0eT8uW2Nhbm9uaWNhbE1vZGFsaXR5XSB8fFxuICAgIERFRkFVTFRfT0VNX0ZJRUxEO1xuICBjb25zdCBtb2RlbEZpZWxkID1cbiAgICBjYXRhbG9nPy5tZXRhPy5tb2RlbEZpZWxkQnlNb2RhbGl0eU9lbT8uW2Nhbm9uaWNhbE1vZGFsaXR5XT8uW1xuICAgICAgY2Fub25pY2FsT2VtXG4gICAgXSB8fCBudWxsO1xuICBjb25zdCBwYXRoID0gbW9kZWxGaWVsZFxuICAgID8gYCR7b2VtRmllbGR9LiR7Y2Fub25pY2FsT2VtfS4ke21vZGVsRmllbGR9YFxuICAgIDogYCR7b2VtRmllbGR9LiR7Y2Fub25pY2FsT2VtfWA7XG4gIGF3YWl0IGRvY1JlZi51cGRhdGUoe1xuICAgIFtwYXRoXTogZmlyZWJhc2UuZmlyZXN0b3JlLkZpZWxkVmFsdWUuYXJyYXlSZW1vdmUobW9kZWwpLFxuICB9KTtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=