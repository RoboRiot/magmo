(window["webpackJsonp_N_E"] = window["webpackJsonp_N_E"] || []).push([[15],{

/***/ "MX0m":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("cWQ+").style


/***/ }),

/***/ "cWQ+":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {__webpack_require__("hR7R");
var React = __webpack_require__("q1tI");

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

/*
Based on Glamor's sheet
https://github.com/threepointone/glamor/blob/667b480d31b3721a905021b26e1290ce92ca2879/src/sheet.js
*/ function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
var isProd = typeof process !== "undefined" && process.env && "production" === "production";
var isString = function(o) {
    return Object.prototype.toString.call(o) === "[object String]";
};
var StyleSheet = /*#__PURE__*/ function() {
    function StyleSheet(param) {
        var ref = param === void 0 ? {} : param, _name = ref.name, name = _name === void 0 ? "stylesheet" : _name, _optimizeForSpeed = ref.optimizeForSpeed, optimizeForSpeed = _optimizeForSpeed === void 0 ? isProd : _optimizeForSpeed;
        invariant$1(isString(name), "`name` must be a string");
        this._name = name;
        this._deletedRulePlaceholder = "#" + name + "-deleted-rule____{}";
        invariant$1(typeof optimizeForSpeed === "boolean", "`optimizeForSpeed` must be a boolean");
        this._optimizeForSpeed = optimizeForSpeed;
        this._serverSheet = undefined;
        this._tags = [];
        this._injected = false;
        this._rulesCount = 0;
        var node = typeof window !== "undefined" && document.querySelector('meta[property="csp-nonce"]');
        this._nonce = node ? node.getAttribute("content") : null;
    }
    var _proto = StyleSheet.prototype;
    _proto.setOptimizeForSpeed = function setOptimizeForSpeed(bool) {
        invariant$1(typeof bool === "boolean", "`setOptimizeForSpeed` accepts a boolean");
        invariant$1(this._rulesCount === 0, "optimizeForSpeed cannot be when rules have already been inserted");
        this.flush();
        this._optimizeForSpeed = bool;
        this.inject();
    };
    _proto.isOptimizeForSpeed = function isOptimizeForSpeed() {
        return this._optimizeForSpeed;
    };
    _proto.inject = function inject() {
        var _this = this;
        invariant$1(!this._injected, "sheet already injected");
        this._injected = true;
        if (typeof window !== "undefined" && this._optimizeForSpeed) {
            this._tags[0] = this.makeStyleTag(this._name);
            this._optimizeForSpeed = "insertRule" in this.getSheet();
            if (!this._optimizeForSpeed) {
                if (!isProd) {
                    console.warn("StyleSheet: optimizeForSpeed mode not supported falling back to standard mode.");
                }
                this.flush();
                this._injected = true;
            }
            return;
        }
        this._serverSheet = {
            cssRules: [],
            insertRule: function(rule, index) {
                if (typeof index === "number") {
                    _this._serverSheet.cssRules[index] = {
                        cssText: rule
                    };
                } else {
                    _this._serverSheet.cssRules.push({
                        cssText: rule
                    });
                }
                return index;
            },
            deleteRule: function(index) {
                _this._serverSheet.cssRules[index] = null;
            }
        };
    };
    _proto.getSheetForTag = function getSheetForTag(tag) {
        if (tag.sheet) {
            return tag.sheet;
        }
        // this weirdness brought to you by firefox
        for(var i = 0; i < document.styleSheets.length; i++){
            if (document.styleSheets[i].ownerNode === tag) {
                return document.styleSheets[i];
            }
        }
    };
    _proto.getSheet = function getSheet() {
        return this.getSheetForTag(this._tags[this._tags.length - 1]);
    };
    _proto.insertRule = function insertRule(rule, index) {
        invariant$1(isString(rule), "`insertRule` accepts only strings");
        if (typeof window === "undefined") {
            if (typeof index !== "number") {
                index = this._serverSheet.cssRules.length;
            }
            this._serverSheet.insertRule(rule, index);
            return this._rulesCount++;
        }
        if (this._optimizeForSpeed) {
            var sheet = this.getSheet();
            if (typeof index !== "number") {
                index = sheet.cssRules.length;
            }
            // this weirdness for perf, and chrome's weird bug
            // https://stackoverflow.com/questions/20007992/chrome-suddenly-stopped-accepting-insertrule
            try {
                sheet.insertRule(rule, index);
            } catch (error) {
                if (!isProd) {
                    console.warn("StyleSheet: illegal rule: \n\n" + rule + "\n\nSee https://stackoverflow.com/q/20007992 for more info");
                }
                return -1;
            }
        } else {
            var insertionPoint = this._tags[index];
            this._tags.push(this.makeStyleTag(this._name, rule, insertionPoint));
        }
        return this._rulesCount++;
    };
    _proto.replaceRule = function replaceRule(index, rule) {
        if (this._optimizeForSpeed || typeof window === "undefined") {
            var sheet = typeof window !== "undefined" ? this.getSheet() : this._serverSheet;
            if (!rule.trim()) {
                rule = this._deletedRulePlaceholder;
            }
            if (!sheet.cssRules[index]) {
                // @TBD Should we throw an error?
                return index;
            }
            sheet.deleteRule(index);
            try {
                sheet.insertRule(rule, index);
            } catch (error) {
                if (!isProd) {
                    console.warn("StyleSheet: illegal rule: \n\n" + rule + "\n\nSee https://stackoverflow.com/q/20007992 for more info");
                }
                // In order to preserve the indices we insert a deleteRulePlaceholder
                sheet.insertRule(this._deletedRulePlaceholder, index);
            }
        } else {
            var tag = this._tags[index];
            invariant$1(tag, "old rule at index `" + index + "` not found");
            tag.textContent = rule;
        }
        return index;
    };
    _proto.deleteRule = function deleteRule(index) {
        if (typeof window === "undefined") {
            this._serverSheet.deleteRule(index);
            return;
        }
        if (this._optimizeForSpeed) {
            this.replaceRule(index, "");
        } else {
            var tag = this._tags[index];
            invariant$1(tag, "rule at index `" + index + "` not found");
            tag.parentNode.removeChild(tag);
            this._tags[index] = null;
        }
    };
    _proto.flush = function flush() {
        this._injected = false;
        this._rulesCount = 0;
        if (typeof window !== "undefined") {
            this._tags.forEach(function(tag) {
                return tag && tag.parentNode.removeChild(tag);
            });
            this._tags = [];
        } else {
            // simpler on server
            this._serverSheet.cssRules = [];
        }
    };
    _proto.cssRules = function cssRules() {
        var _this = this;
        if (typeof window === "undefined") {
            return this._serverSheet.cssRules;
        }
        return this._tags.reduce(function(rules, tag) {
            if (tag) {
                rules = rules.concat(Array.prototype.map.call(_this.getSheetForTag(tag).cssRules, function(rule) {
                    return rule.cssText === _this._deletedRulePlaceholder ? null : rule;
                }));
            } else {
                rules.push(null);
            }
            return rules;
        }, []);
    };
    _proto.makeStyleTag = function makeStyleTag(name, cssString, relativeToTag) {
        if (cssString) {
            invariant$1(isString(cssString), "makeStyleTag accepts only strings as second parameter");
        }
        var tag = document.createElement("style");
        if (this._nonce) tag.setAttribute("nonce", this._nonce);
        tag.type = "text/css";
        tag.setAttribute("data-" + name, "");
        if (cssString) {
            tag.appendChild(document.createTextNode(cssString));
        }
        var head = document.head || document.getElementsByTagName("head")[0];
        if (relativeToTag) {
            head.insertBefore(tag, relativeToTag);
        } else {
            head.appendChild(tag);
        }
        return tag;
    };
    _createClass(StyleSheet, [
        {
            key: "length",
            get: function get() {
                return this._rulesCount;
            }
        }
    ]);
    return StyleSheet;
}();
function invariant$1(condition, message) {
    if (!condition) {
        throw new Error("StyleSheet: " + message + ".");
    }
}

function hash(str) {
    var _$hash = 5381, i = str.length;
    while(i){
        _$hash = _$hash * 33 ^ str.charCodeAt(--i);
    }
    /* JavaScript does bitwise operations (like XOR, above) on 32-bit signed
   * integers. Since we want the results to be always positive, convert the
   * signed int to an unsigned by doing an unsigned bitshift. */ return _$hash >>> 0;
}
var stringHash = hash;

var sanitize = function(rule) {
    return rule.replace(/\/style/gi, "\\/style");
};
var cache = {};
/**
 * computeId
 *
 * Compute and memoize a jsx id from a basedId and optionally props.
 */ function computeId(baseId, props) {
    if (!props) {
        return "jsx-" + baseId;
    }
    var propsToString = String(props);
    var key = baseId + propsToString;
    if (!cache[key]) {
        cache[key] = "jsx-" + stringHash(baseId + "-" + propsToString);
    }
    return cache[key];
}
/**
 * computeSelector
 *
 * Compute and memoize dynamic selectors.
 */ function computeSelector(id, css) {
    var selectoPlaceholderRegexp = /__jsx-style-dynamic-selector/g;
    // Sanitize SSR-ed CSS.
    // Client side code doesn't need to be sanitized since we use
    // document.createTextNode (dev) and the CSSOM api sheet.insertRule (prod).
    if (typeof window === "undefined") {
        css = sanitize(css);
    }
    var idcss = id + css;
    if (!cache[idcss]) {
        cache[idcss] = css.replace(selectoPlaceholderRegexp, id);
    }
    return cache[idcss];
}

function mapRulesToStyle(cssRules, options) {
    if (options === void 0) options = {};
    return cssRules.map(function(args) {
        var id = args[0];
        var css = args[1];
        return /*#__PURE__*/ React__default["default"].createElement("style", {
            id: "__" + id,
            // Avoid warnings upon render with a key
            key: "__" + id,
            nonce: options.nonce ? options.nonce : undefined,
            dangerouslySetInnerHTML: {
                __html: css
            }
        });
    });
}
var StyleSheetRegistry = /*#__PURE__*/ function() {
    function StyleSheetRegistry(param) {
        var ref = param === void 0 ? {} : param, _styleSheet = ref.styleSheet, styleSheet = _styleSheet === void 0 ? null : _styleSheet, _optimizeForSpeed = ref.optimizeForSpeed, optimizeForSpeed = _optimizeForSpeed === void 0 ? false : _optimizeForSpeed;
        this._sheet = styleSheet || new StyleSheet({
            name: "styled-jsx",
            optimizeForSpeed: optimizeForSpeed
        });
        this._sheet.inject();
        if (styleSheet && typeof optimizeForSpeed === "boolean") {
            this._sheet.setOptimizeForSpeed(optimizeForSpeed);
            this._optimizeForSpeed = this._sheet.isOptimizeForSpeed();
        }
        this._fromServer = undefined;
        this._indices = {};
        this._instancesCounts = {};
    }
    var _proto = StyleSheetRegistry.prototype;
    _proto.add = function add(props) {
        var _this = this;
        if (undefined === this._optimizeForSpeed) {
            this._optimizeForSpeed = Array.isArray(props.children);
            this._sheet.setOptimizeForSpeed(this._optimizeForSpeed);
            this._optimizeForSpeed = this._sheet.isOptimizeForSpeed();
        }
        if (typeof window !== "undefined" && !this._fromServer) {
            this._fromServer = this.selectFromServer();
            this._instancesCounts = Object.keys(this._fromServer).reduce(function(acc, tagName) {
                acc[tagName] = 0;
                return acc;
            }, {});
        }
        var ref = this.getIdAndRules(props), styleId = ref.styleId, rules = ref.rules;
        // Deduping: just increase the instances count.
        if (styleId in this._instancesCounts) {
            this._instancesCounts[styleId] += 1;
            return;
        }
        var indices = rules.map(function(rule) {
            return _this._sheet.insertRule(rule);
        })// Filter out invalid rules
        .filter(function(index) {
            return index !== -1;
        });
        this._indices[styleId] = indices;
        this._instancesCounts[styleId] = 1;
    };
    _proto.remove = function remove(props) {
        var _this = this;
        var styleId = this.getIdAndRules(props).styleId;
        invariant(styleId in this._instancesCounts, "styleId: `" + styleId + "` not found");
        this._instancesCounts[styleId] -= 1;
        if (this._instancesCounts[styleId] < 1) {
            var tagFromServer = this._fromServer && this._fromServer[styleId];
            if (tagFromServer) {
                tagFromServer.parentNode.removeChild(tagFromServer);
                delete this._fromServer[styleId];
            } else {
                this._indices[styleId].forEach(function(index) {
                    return _this._sheet.deleteRule(index);
                });
                delete this._indices[styleId];
            }
            delete this._instancesCounts[styleId];
        }
    };
    _proto.update = function update(props, nextProps) {
        this.add(nextProps);
        this.remove(props);
    };
    _proto.flush = function flush() {
        this._sheet.flush();
        this._sheet.inject();
        this._fromServer = undefined;
        this._indices = {};
        this._instancesCounts = {};
    };
    _proto.cssRules = function cssRules() {
        var _this = this;
        var fromServer = this._fromServer ? Object.keys(this._fromServer).map(function(styleId) {
            return [
                styleId,
                _this._fromServer[styleId]
            ];
        }) : [];
        var cssRules = this._sheet.cssRules();
        return fromServer.concat(Object.keys(this._indices).map(function(styleId) {
            return [
                styleId,
                _this._indices[styleId].map(function(index) {
                    return cssRules[index].cssText;
                }).join(_this._optimizeForSpeed ? "" : "\n")
            ];
        })// filter out empty rules
        .filter(function(rule) {
            return Boolean(rule[1]);
        }));
    };
    _proto.styles = function styles(options) {
        return mapRulesToStyle(this.cssRules(), options);
    };
    _proto.getIdAndRules = function getIdAndRules(props) {
        var css = props.children, dynamic = props.dynamic, id = props.id;
        if (dynamic) {
            var styleId = computeId(id, dynamic);
            return {
                styleId: styleId,
                rules: Array.isArray(css) ? css.map(function(rule) {
                    return computeSelector(styleId, rule);
                }) : [
                    computeSelector(styleId, css)
                ]
            };
        }
        return {
            styleId: computeId(id),
            rules: Array.isArray(css) ? css : [
                css
            ]
        };
    };
    /**
   * selectFromServer
   *
   * Collects style tags from the document with id __jsx-XXX
   */ _proto.selectFromServer = function selectFromServer() {
        var elements = Array.prototype.slice.call(document.querySelectorAll('[id^="__jsx-"]'));
        return elements.reduce(function(acc, element) {
            var id = element.id.slice(2);
            acc[id] = element;
            return acc;
        }, {});
    };
    return StyleSheetRegistry;
}();
function invariant(condition, message) {
    if (!condition) {
        throw new Error("StyleSheetRegistry: " + message + ".");
    }
}
var StyleSheetContext = /*#__PURE__*/ React.createContext(null);
StyleSheetContext.displayName = "StyleSheetContext";
function createStyleRegistry() {
    return new StyleSheetRegistry();
}
function StyleRegistry(param) {
    var configuredRegistry = param.registry, children = param.children;
    var rootRegistry = React.useContext(StyleSheetContext);
    var ref = React.useState(function() {
        return rootRegistry || configuredRegistry || createStyleRegistry();
    }), registry = ref[0];
    return /*#__PURE__*/ React__default["default"].createElement(StyleSheetContext.Provider, {
        value: registry
    }, children);
}
function useStyleRegistry() {
    return React.useContext(StyleSheetContext);
}

// Opt-into the new `useInsertionEffect` API in React 18, fallback to `useLayoutEffect`.
// https://github.com/reactwg/react-18/discussions/110
var useInsertionEffect = React__default["default"].useInsertionEffect || React.useLayoutEffect;
var defaultRegistry = typeof window !== "undefined" ? createStyleRegistry() : undefined;
function JSXStyle(props) {
    var registry = defaultRegistry ? defaultRegistry : useStyleRegistry();
    var insertionEffectCalled = React.useRef(false);
    // `registry` might not exist while server-side rendering
    if (!registry) {
        return null;
    }
    if (typeof window === "undefined") {
        registry.add(props);
        return null;
    }
    useInsertionEffect(function() {
        // ReactDOM removes all DOM during hydration in certain cases
        if (!document.head) {
            return;
        }
        registry.add(props);
        insertionEffectCalled.current = true;
        return function() {
            insertionEffectCalled.current = false;
            registry.remove(props);
        };
    }, [
        props.id,
        String(props.dynamic)
    ]);
    React.useLayoutEffect(function() {
        if (!document.head || insertionEffectCalled.current) {
            return;
        }
        registry.add(props);
        return function() {
            registry.remove(props);
        };
    // props.children can be string[], will be striped since id is identical
    }, [
        props.id,
        String(props.dynamic)
    ]);
    return null;
}
JSXStyle.dynamic = function(info) {
    return info.map(function(tagInfo) {
        var baseId = tagInfo[0];
        var props = tagInfo[1];
        return computeId(baseId, props);
    }).join(" ");
};

exports.StyleRegistry = StyleRegistry;
exports.createStyleRegistry = createStyleRegistry;
exports.style = JSXStyle;
exports.useStyleRegistry = useStyleRegistry;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("8oxB")))

/***/ }),

/***/ "hR7R":
/***/ (function(module, exports) {



/***/ }),

/***/ "oGF+":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("z7pX");
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("xvhg");
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("vJKn");
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("rg98");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("MX0m");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("zM5D");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("7vrA");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("6xyR");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("3Z9Z");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("JI6e");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("zUrK");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("97+O");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("cWnB");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("MBJH");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("QojX");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("jDKy");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__("GWEY");
/* harmony import */ var _utils_fetchAssociations__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__("qoNY");
/* harmony import */ var _context_AuthUserContext__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__("XrFm");
/* harmony import */ var _LoggedIn__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__("mJJZ");
/* harmony import */ var _utils_ClientTable__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__("8HvV");
/* harmony import */ var _utils_ModelTable__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__("TM8N");
/* harmony import */ var _utils_PartTable__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__("MSWM");
/* harmony import */ var _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__("Dktn");
/* harmony import */ var _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_24___default = /*#__PURE__*/__webpack_require__.n(_styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_24__);
/* harmony import */ var _context_Firebase__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__("NY6m");





var __jsx = react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement;










var CLIENT_WAREHOUSE = "igor-house";
var CLIENT_UNASSIGNED = "unassigned";

var ParentModal = function ParentModal(_ref) {
  var show = _ref.show,
      handleClose = _ref.handleClose,
      setSelectedParent = _ref.setSelectedParent,
      parts = _ref.parts;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])([]),
      info = _useState[0],
      setInfo = _useState[1];

  var _useState2 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])([]),
      backupInfo = _useState2[0],
      setBackupInfo = _useState2[1]; // const [ids, setID] = useState([]);


  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(""),
      search = _useState3[0],
      setSearch = _useState3[1];

  var _useState4 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])("Name"),
      select = _useState4[0],
      setSelect = _useState4[1];

  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(false),
      showList = _useState5[0],
      setShowList = _useState5[1];

  var _useState6 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])("text"),
      showListSearch = _useState6[0],
      setShowListSearch = _useState6[1];

  var _useState7 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(null),
      selectedOEM = _useState7[0],
      setSelectedOEM = _useState7[1];

  var _useState8 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(null),
      selectedModality = _useState8[0],
      setSelectedModality = _useState8[1];

  var _useState9 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(null),
      selectedClient = _useState9[0],
      setSelectedClient = _useState9[1];

  var _useState10 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])([]),
      clients = _useState10[0],
      setClients = _useState10[1];

  var _useState11 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(false),
      showClientModal = _useState11[0],
      setShowClientModal = _useState11[1];

  var _useState12 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])("Select Option"),
      clientButtonText = _useState12[0],
      setClientButtonText = _useState12[1];

  var _useState13 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(null),
      hoverIndex = _useState13[0],
      setHoverIndex = _useState13[1];

  var _useState14 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(null),
      selectedModel = _useState14[0],
      setSelectedModel = _useState14[1];

  var _useState15 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])([]),
      models = _useState15[0],
      setModels = _useState15[1];

  var _useState16 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(false),
      showModelModal = _useState16[0],
      setShowModelModal = _useState16[1];

  var _useState17 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])("Select Option"),
      modelButtonText = _useState17[0],
      setModelButtonText = _useState17[1];

  var _useState18 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(""),
      clientSearchTerm = _useState18[0],
      setClientSearchTerm = _useState18[1];

  var _useState19 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(""),
      modelSearchTerm = _useState19[0],
      setModelSearchTerm = _useState19[1];

  Object(react__WEBPACK_IMPORTED_MODULE_5__["useEffect"])(function () {
    function fetchData() {
      return _fetchData.apply(this, arguments);
    }

    function _fetchData() {
      _fetchData = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee() {
        var data;
        return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return Object(_utils_fetchAssociations__WEBPACK_IMPORTED_MODULE_18__[/* fetchPartsWithMachineData */ "c"])();

              case 2:
                data = _context.sent;
                setInfo(data);
                setBackupInfo(data); // setID(data.map((item) => item.id)); // Ensure IDs are correctly set here

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
      return _fetchData.apply(this, arguments);
    }

    fetchData();
  }, []);

  var handleCloseClientModal = function handleCloseClientModal() {
    return setShowClientModal(false);
  };

  var handleShowClientModal = function handleShowClientModal() {
    return setShowClientModal(true);
  };

  var handleCloseModelModal = function handleCloseModelModal() {
    return setShowModelModal(false);
  };

  var handleShowModelModal = function handleShowModelModal() {
    return setShowModelModal(true);
  }; // Handle search input changes


  var searchChangeHandler = function searchChangeHandler(event) {
    return setSearch(event.target.value);
  }; // Filter items based on search criteria


  function searchFilter() {
    var temp = backupInfo.filter(function (item) {
      if (item.machineData) {
        if (selectedOEM && item.machineData.OEM !== selectedOEM) return false;
        if (selectedModality && item.machineData.Modality !== selectedModality) return false;
        if (selectedClient && item.machineData.Client !== selectedClient) return false;
        if (selectedModel && item.machineData.Model !== selectedModel) return false;
      }

      if (select === "Name" && item.name.toLowerCase().includes(search.toLowerCase())) return true;

      if (select === "Date") {
        var _item$date$split = item.date.split("/"),
            _item$date$split2 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(_item$date$split, 3),
            month = _item$date$split2[0],
            day = _item$date$split2[1],
            year = _item$date$split2[2];

        var reformattedDate = "".concat(year, "-").concat(month, "-").concat(day);
        return reformattedDate === search;
      }

      if (select === "Work Order" && Number(item.wo) === Number(search)) return true;
      if (select === "Product Number" && Number(item.pn) === Number(search)) return true;
      if (select === "Description" && item.desc.toLowerCase().includes(search.toLowerCase())) return true;
      return false;
    });
    setInfo(temp);
  } // Sort items based on column


  function sortCheckAll(pos) {
    var sortedInfo = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(info).sort(function (a, b) {
      if (pos === 0 || pos === 5) {
        return b[select].localeCompare(a[select]);
      }

      if (pos === 1) {
        return Date.parse(b[select]) - Date.parse(a[select]);
      }

      return Number(b[select]) - Number(a[select]);
    });

    setInfo(sortedInfo);
  } // Row selection handler


  var rowSelect = function rowSelect(item) {
    // item.id must be present in fetchPartsWithMachineData() results
    setSelectedParent({
      id: item.id,
      name: item.name,
      pn: item.pn
    });
    handleClose();
  }; // Dropdown handlers


  var _useState20 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])("Select Option"),
      dropdown1Text = _useState20[0],
      setDropdown1Text = _useState20[1];

  var _useState21 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])("Select Option"),
      dropdown2Text = _useState21[0],
      setDropdown2Text = _useState21[1];

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
  };

  Object(react__WEBPACK_IMPORTED_MODULE_5__["useEffect"])(function () {
    searchFilter();
  }, [selectedOEM, selectedModality, selectedClient, selectedModel, search]); // Fetch clients and show modal

  var handleClientClick = /*#__PURE__*/function () {
    var _ref2 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee2() {
      var clientsData;
      return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              console.log("clicked");
              _context2.next = 3;
              return Object(_utils_fetchAssociations__WEBPACK_IMPORTED_MODULE_18__[/* fetchClients */ "a"])(selectedOEM, selectedModality);

            case 3:
              clientsData = _context2.sent;
              setClients(clientsData);
              setClientSearchTerm(""); // Reset search term

              setShowClientModal(true);

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function handleClientClick() {
      return _ref2.apply(this, arguments);
    };
  }(); // Client selection handler


  var handleClientSelect = function handleClientSelect(clientName) {
    setClientButtonText(clientName || "Select Option");
    setSelectedClient(clientName || null);
    setShowClientModal(false);
  }; // Client info handler


  var handleClientInfo = function handleClientInfo(clientId, clientName) {
    console.log("Client ID: ".concat(clientId, ", Client Name: ").concat(clientName));
  }; // Clear client selection handler


  var handleClearClientSelection = function handleClearClientSelection() {
    setClientButtonText("Select Option");
    setSelectedClient(null);
    setShowClientModal(false);
    searchFilter();
  }; // Fetch models and show modal


  var handleModelClick = /*#__PURE__*/function () {
    var _ref3 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee3() {
      var modelsData;
      return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return Object(_utils_fetchAssociations__WEBPACK_IMPORTED_MODULE_18__[/* fetchModels */ "b"])(selectedOEM, selectedModality, selectedClient);

            case 2:
              modelsData = _context3.sent;
              setModels(modelsData);
              setModelSearchTerm(""); // Reset search term

              setShowModelModal(true);

            case 6:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function handleModelClick() {
      return _ref3.apply(this, arguments);
    };
  }(); // Model selection handler


  var handleModelSelect = function handleModelSelect(modelName) {
    setModelButtonText(modelName || "Select Option");
    setSelectedModel(modelName || null);
    setShowModelModal(false);
  }; // Clear model selection handler


  var handleClearModelSelection = function handleClearModelSelection() {
    setModelButtonText("Select Option");
    setSelectedModel(null);
    setShowModelModal(false);
    searchFilter();
  };

  var handleWarehouseClick = function handleWarehouseClick() {
    setClientButtonText(CLIENT_WAREHOUSE);
    setSelectedClient(CLIENT_WAREHOUSE);
    searchFilter();
  };

  var handleUnassignedClick = function handleUnassignedClick() {
    setClientButtonText(CLIENT_UNASSIGNED);
    setSelectedClient(CLIENT_UNASSIGNED);
    searchFilter();
  };

  return __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"], {
    show: show,
    onHide: handleClose,
    size: "lg",
    centered: true,
    scrollable: true,
    dialogClassName: "parent-modal-dialog"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"].Header, {
    closeButton: true
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"].Title, null, "Select Parent")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"].Body, {
    style: {
      maxHeight: "75vh",
      overflowY: "auto"
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], {
    className: "d-flex align-items-center justify-content-center",
    style: {
      minHeight: "unset"
    }
  }, __jsx("div", {
    className: "w-100",
    style: {
      maxWidth: "1200px"
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"].Body, null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"], null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"], {
    md: 4
  }, __jsx("div", null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"], {
    className: "mb-3"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"].Text, null, "OEM"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"], {
    onSelect: handleSelect1
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"].Toggle, {
    variant: "outline-secondary",
    id: "dropdown-button-1",
    className: "w-100"
  }, dropdown1Text), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"].Menu, {
    className: "w-100"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"].Item, {
    eventKey: "unassigned"
  }, "Select Option"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"].Item, {
    eventKey: "GE"
  }, "GE"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"].Item, {
    eventKey: "Toshiba"
  }, "Toshiba"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"].Item, {
    eventKey: "Siemens"
  }, "Siemens"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"].Item, {
    eventKey: "Philips"
  }, "Philips")))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"], {
    className: "mb-3"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"].Text, null, "Modality"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"], {
    onSelect: handleSelect2
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"].Toggle, {
    variant: "outline-secondary",
    id: "dropdown-button-2",
    className: "w-100"
  }, dropdown2Text), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"].Menu, {
    className: "w-100"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"].Item, {
    eventKey: "unassigned"
  }, "Select Option"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"].Item, {
    eventKey: "CT"
  }, "CT"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"].Item, {
    eventKey: "MRI"
  }, "MRI")))), __jsx("div", null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"], {
    className: "mb-3"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"].Text, null, "Client"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"], {
    variant: "outline-secondary",
    className: "w-100",
    onClick: handleClientClick
  }, clientButtonText)), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"], {
    className: "mb-3"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"].Text, null, "Client-2"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"], {
    variant: "outline-secondary",
    className: "w-100",
    disabled: true
  }, "Select Option")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"], {
    className: "mb-3"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"].Text, null, "Model"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"], {
    variant: "outline-secondary",
    className: "w-100",
    onClick: handleModelClick
  }, modelButtonText)), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_24___default.a.divider
  }), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"], {
    className: "mb-3"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"].Text, null, "Warehouse"), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_24___default.a.buttonGroup
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"], {
    variant: "outline-secondary",
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_24___default.a.flexButton,
    onClick: handleWarehouseClick
  }, "Warehouse"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"], {
    variant: "outline-secondary",
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_24___default.a.flexButton,
    onClick: handleUnassignedClick
  }, "Unassigned")))))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"], {
    md: 8
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_24___default.a.tableContainer
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_14__[/* default */ "a"], {
    striped: true,
    bordered: true,
    hover: true,
    size: "sm",
    className: "mb-0"
  }, __jsx("thead", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_24___default.a.stickyHeader
  }, __jsx("tr", null, __jsx("th", {
    onClick: function onClick() {
      return sortCheckAll(0);
    }
  }, "Name"), __jsx("th", {
    onClick: function onClick() {
      return sortCheckAll(1);
    }
  }, "Date"), __jsx("th", {
    onClick: function onClick() {
      return sortCheckAll(2);
    }
  }, "Work Order"), __jsx("th", {
    onClick: function onClick() {
      return sortCheckAll(3);
    }
  }, "Product Number"), __jsx("th", {
    onClick: function onClick() {
      return sortCheckAll(4);
    }
  }, "Serial Number"), __jsx("th", null, "Select"))), __jsx("tbody", null, info.map(function (item) {
    return __jsx("tr", {
      className: "clickable-row",
      key: item.id
    }, __jsx("td", null, item.name), __jsx("td", null, Object(_utils_fetchAssociations__WEBPACK_IMPORTED_MODULE_18__[/* formatDate */ "d"])(item.date)), __jsx("td", null, item.workOrders && item.workOrders.length > 0 ? item.workOrders[item.workOrders.length - 1].workOrder : "N/A"), __jsx("td", null, item.pn), __jsx("td", null, item.sn), __jsx("td", null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"], {
      variant: "primary",
      onClick: function onClick() {
        return rowSelect(item);
      }
    }, "Select")));
  }))), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_24___default.a.searchContainer
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_15__[/* default */ "a"], {
    className: "d-flex pb-2"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_16__[/* default */ "a"], {
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
      return setSelect("Name") & setShowListSearch("text");
    }
  }, "Name"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_17__[/* default */ "a"].Item, {
    onClick: function onClick() {
      return setSelect("Date") & setShowListSearch("date");
    }
  }, "Date"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_17__[/* default */ "a"].Item, {
    onClick: function onClick() {
      return setSelect("Work Order") & setShowListSearch("number");
    }
  }, "Work Order"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_17__[/* default */ "a"].Item, {
    onClick: function onClick() {
      return setSelect("Product Number") & setShowListSearch("number");
    }
  }, "Product Number"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_17__[/* default */ "a"].Item, {
    onClick: function onClick() {
      return setSelect("Description") & setShowListSearch("text");
    }
  }, "Description")))))))))))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"].Footer, null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"], {
    variant: "secondary",
    onClick: handleClose
  }, "Cancel"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"], {
    variant: "warning",
    onClick: function onClick() {
      setSelectedParent(null);
      handleClose();
    }
  }, "Clear Selection")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"], {
    show: showClientModal,
    onHide: handleCloseClientModal
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"].Header, {
    closeButton: true
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"].Title, null, "Select Client")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"].Body, null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_16__[/* default */ "a"], {
    type: "text",
    placeholder: "Search by name",
    className: "mb-3",
    value: clientSearchTerm,
    onChange: function onChange(e) {
      return setClientSearchTerm(e.target.value);
    }
  }), __jsx(_utils_ClientTable__WEBPACK_IMPORTED_MODULE_21__[/* default */ "a"], {
    clients: clients.filter(function (client) {
      return client.name.toLowerCase().includes(clientSearchTerm.toLowerCase());
    }),
    disableInfo: true,
    onSelectClient: handleClientSelect,
    onInfoClick: handleClientInfo,
    clearSelection: function clearSelection() {
      return handleClientSelect(null);
    } // Clear selection handler

  }))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"], {
    show: showModelModal,
    onHide: handleCloseModelModal
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"].Header, {
    closeButton: true
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"].Title, null, "Select Model")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"].Body, null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_16__[/* default */ "a"], {
    type: "text",
    placeholder: "Search by name",
    className: "mb-3",
    value: modelSearchTerm,
    onChange: function onChange(e) {
      return setModelSearchTerm(e.target.value);
    }
  }), __jsx(_utils_ModelTable__WEBPACK_IMPORTED_MODULE_22__[/* default */ "a"], {
    models: models.filter(function (model) {
      return typeof model === "string" ? model.toLowerCase().includes(modelSearchTerm.toLowerCase()) : false;
    }),
    onSelectModel: handleModelSelect,
    clearSelection: function clearSelection() {
      return handleModelSelect(null);
    } // Clear selection handler

  }))));
};

__jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_4___default.a, {
  id: "2081140824",
  dynamic: [_styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_24___default.a.tableContainer]
}, [".parent-modal-dialog{max-width:95vw;margin:0 auto;}", ".parent-modal-dialog .modal-body .".concat(_styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_24___default.a.tableContainer, "{max-height:70vh;overflow:auto;}")]);

/* harmony default export */ __webpack_exports__["default"] = (ParentModal);

/***/ })

}]);