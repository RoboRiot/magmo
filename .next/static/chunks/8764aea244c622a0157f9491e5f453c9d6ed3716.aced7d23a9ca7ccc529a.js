(window["webpackJsonp_N_E"] = window["webpackJsonp_N_E"] || []).push([[21],{

/***/ "2W6z":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var __DEV__ = "production" !== 'production';

var warning = function() {};

if (__DEV__) {
  var printWarning = function printWarning(format, args) {
    var len = arguments.length;
    args = new Array(len > 1 ? len - 1 : 0);
    for (var key = 1; key < len; key++) {
      args[key - 1] = arguments[key];
    }
    var argIndex = 0;
    var message = 'Warning: ' +
      format.replace(/%s/g, function() {
        return args[argIndex++];
      });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  }

  warning = function(condition, format, args) {
    var len = arguments.length;
    args = new Array(len > 2 ? len - 2 : 0);
    for (var key = 2; key < len; key++) {
      args[key - 2] = arguments[key];
    }
    if (format === undefined) {
      throw new Error(
          '`warning(condition, format, ...args)` requires a warning ' +
          'message argument'
      );
    }
    if (!condition) {
      printWarning.apply(null, [format].concat(args));
    }
  };
}

module.exports = warning;


/***/ }),

/***/ "9R94":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return invariant; });
var isProduction = "production" === 'production';
var prefix = 'Invariant failed';
function invariant(condition, message) {
    if (condition) {
        return;
    }
    if (isProduction) {
        throw new Error(prefix);
    }
    var provided = typeof message === 'function' ? message() : message;
    var value = provided ? "".concat(prefix, ": ").concat(provided) : prefix;
    throw new Error(value);
}




/***/ }),

/***/ "BHdc":
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export clsx */
function r(e){var t,f,n="";if("string"==typeof e||"number"==typeof e)n+=e;else if("object"==typeof e)if(Array.isArray(e)){var o=e.length;for(t=0;t<o;t++)e[t]&&(f=r(e[t]))&&(n&&(n+=" "),n+=f)}else for(f in e)e[f]&&(n&&(n+=" "),n+=f);return n}function clsx(){for(var e,t,f=0,n="",o=arguments.length;f<o;f++)(e=arguments[f])&&(t=r(e))&&(n&&(n+=" "),n+=t);return n}/* harmony default export */ __webpack_exports__["a"] = (clsx);

/***/ }),

/***/ "FfWa":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// As defined in https://github.com/mozilla/pdf.js/blob/d9fac3459609a807be6506fb3441b5da4b154d14/src/shared/util.js#L371-L374
const PasswordResponses = {
    NEED_PASSWORD: 1,
    INCORRECT_PASSWORD: 2,
};
/* harmony default export */ __webpack_exports__["a"] = (PasswordResponses);


/***/ }),

/***/ "GlAO":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
!(function webpackMissingModule() { var e = new Error("Cannot find module 'pdfjs-dist'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());

const pdfjs = ('default' in !(function webpackMissingModule() { var e = new Error("Cannot find module 'pdfjs-dist'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()) ? !(function webpackMissingModule() { var e = new Error("Cannot find module 'pdfjs-dist'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()) : !(function webpackMissingModule() { var e = new Error("Cannot find module 'pdfjs-dist'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
/* harmony default export */ __webpack_exports__["a"] = (pdfjs);


/***/ }),

/***/ "LiF2":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
'use client';

/* harmony default export */ __webpack_exports__["a"] = (Object(react__WEBPACK_IMPORTED_MODULE_0__["createContext"])(null));


/***/ }),

/***/ "N8sZ":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return isBrowser; });
/* unused harmony export isLocalFileSystem */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return isDefined; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return isProvided; });
/* unused harmony export isString */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return isArrayBuffer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return isBlob; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return isDataURI; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return dataURItoByteString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return getDevicePixelRatio; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return displayCORSWarning; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return displayWorkerWarning; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return cancelRunningTask; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return makePageCallback; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return isCancelException; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return loadFromFile; });
/* harmony import */ var tiny_invariant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("9R94");
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("2W6z");
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(warning__WEBPACK_IMPORTED_MODULE_1__);


/**
 * Checks if we're running in a browser environment.
 */
const isBrowser = typeof document !== 'undefined';
/**
 * Checks whether we're running from a local file system.
 */
const isLocalFileSystem = isBrowser && window.location.protocol === 'file:';
/**
 * Checks whether a variable is defined.
 *
 * @param {*} variable Variable to check
 */
function isDefined(variable) {
    return typeof variable !== 'undefined';
}
/**
 * Checks whether a variable is defined and not null.
 *
 * @param {*} variable Variable to check
 */
function isProvided(variable) {
    return isDefined(variable) && variable !== null;
}
/**
 * Checks whether a variable provided is a string.
 *
 * @param {*} variable Variable to check
 */
function isString(variable) {
    return typeof variable === 'string';
}
/**
 * Checks whether a variable provided is an ArrayBuffer.
 *
 * @param {*} variable Variable to check
 */
function isArrayBuffer(variable) {
    return variable instanceof ArrayBuffer;
}
/**
 * Checks whether a variable provided is a Blob.
 *
 * @param {*} variable Variable to check
 */
function isBlob(variable) {
    Object(tiny_invariant__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(isBrowser, 'isBlob can only be used in a browser environment');
    return variable instanceof Blob;
}
/**
 * Checks whether a variable provided is a data URI.
 *
 * @param {*} variable String to check
 */
function isDataURI(variable) {
    return isString(variable) && /^data:/.test(variable);
}
function dataURItoByteString(dataURI) {
    Object(tiny_invariant__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(isDataURI(dataURI), 'Invalid data URI.');
    const [headersString = '', dataString = ''] = dataURI.split(',');
    const headers = headersString.split(';');
    if (headers.indexOf('base64') !== -1) {
        return atob(dataString);
    }
    return unescape(dataString);
}
function getDevicePixelRatio() {
    return (isBrowser && window.devicePixelRatio) || 1;
}
const allowFileAccessFromFilesTip = 'On Chromium based browsers, you can use --allow-file-access-from-files flag for debugging purposes.';
function displayCORSWarning() {
    warning__WEBPACK_IMPORTED_MODULE_1___default()(!isLocalFileSystem, `Loading PDF as base64 strings/URLs may not work on protocols other than HTTP/HTTPS. ${allowFileAccessFromFilesTip}`);
}
function displayWorkerWarning() {
    warning__WEBPACK_IMPORTED_MODULE_1___default()(!isLocalFileSystem, `Loading PDF.js worker may not work on protocols other than HTTP/HTTPS. ${allowFileAccessFromFilesTip}`);
}
function cancelRunningTask(runningTask) {
    if (runningTask && runningTask.cancel)
        runningTask.cancel();
}
function makePageCallback(page, scale) {
    Object.defineProperty(page, 'width', {
        get() {
            return this.view[2] * scale;
        },
        configurable: true,
    });
    Object.defineProperty(page, 'height', {
        get() {
            return this.view[3] * scale;
        },
        configurable: true,
    });
    Object.defineProperty(page, 'originalWidth', {
        get() {
            return this.view[2];
        },
        configurable: true,
    });
    Object.defineProperty(page, 'originalHeight', {
        get() {
            return this.view[3];
        },
        configurable: true,
    });
    return page;
}
function isCancelException(error) {
    return error.name === 'RenderingCancelledException';
}
function loadFromFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (!reader.result) {
                return reject(new Error('Error while reading a file.'));
            }
            resolve(reader.result);
        };
        reader.onerror = (event) => {
            if (!event.target) {
                return reject(new Error('Error while reading a file.'));
            }
            const { error } = event.target;
            if (!error) {
                return reject(new Error('Error while reading a file.'));
            }
            switch (error.code) {
                case error.NOT_FOUND_ERR:
                    return reject(new Error('Error while reading a file: File not found.'));
                case error.SECURITY_ERR:
                    return reject(new Error('Error while reading a file: Security error.'));
                case error.ABORT_ERR:
                    return reject(new Error('Error while reading a file: Aborted.'));
                default:
                    return reject(new Error('Error while reading a file.'));
            }
        };
        reader.readAsArrayBuffer(file);
    });
}


/***/ }),

/***/ "UgZE":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return useDocumentContext; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _DocumentContext_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("LiF2");


function useDocumentContext() {
    return Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_DocumentContext_js__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"]);
}


/***/ }),

/***/ "VAed":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export clipboardEvents */
/* unused harmony export compositionEvents */
/* unused harmony export focusEvents */
/* unused harmony export formEvents */
/* unused harmony export imageEvents */
/* unused harmony export keyboardEvents */
/* unused harmony export mediaEvents */
/* unused harmony export mouseEvents */
/* unused harmony export dragEvents */
/* unused harmony export selectionEvents */
/* unused harmony export touchEvents */
/* unused harmony export pointerEvents */
/* unused harmony export uiEvents */
/* unused harmony export wheelEvents */
/* unused harmony export animationEvents */
/* unused harmony export transitionEvents */
/* unused harmony export otherEvents */
/* unused harmony export changeEvents */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return allEvents; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return makeEventProps; });
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// As defined on the list of supported events: https://reactjs.org/docs/events.html
var clipboardEvents = ['onCopy', 'onCut', 'onPaste'];
var compositionEvents = [
    'onCompositionEnd',
    'onCompositionStart',
    'onCompositionUpdate',
];
var focusEvents = ['onFocus', 'onBlur'];
var formEvents = ['onInput', 'onInvalid', 'onReset', 'onSubmit'];
var imageEvents = ['onLoad', 'onError'];
var keyboardEvents = ['onKeyDown', 'onKeyPress', 'onKeyUp'];
var mediaEvents = [
    'onAbort',
    'onCanPlay',
    'onCanPlayThrough',
    'onDurationChange',
    'onEmptied',
    'onEncrypted',
    'onEnded',
    'onError',
    'onLoadedData',
    'onLoadedMetadata',
    'onLoadStart',
    'onPause',
    'onPlay',
    'onPlaying',
    'onProgress',
    'onRateChange',
    'onSeeked',
    'onSeeking',
    'onStalled',
    'onSuspend',
    'onTimeUpdate',
    'onVolumeChange',
    'onWaiting',
];
var mouseEvents = [
    'onClick',
    'onContextMenu',
    'onDoubleClick',
    'onMouseDown',
    'onMouseEnter',
    'onMouseLeave',
    'onMouseMove',
    'onMouseOut',
    'onMouseOver',
    'onMouseUp',
];
var dragEvents = [
    'onDrag',
    'onDragEnd',
    'onDragEnter',
    'onDragExit',
    'onDragLeave',
    'onDragOver',
    'onDragStart',
    'onDrop',
];
var selectionEvents = ['onSelect'];
var touchEvents = ['onTouchCancel', 'onTouchEnd', 'onTouchMove', 'onTouchStart'];
var pointerEvents = [
    'onPointerDown',
    'onPointerMove',
    'onPointerUp',
    'onPointerCancel',
    'onGotPointerCapture',
    'onLostPointerCapture',
    'onPointerEnter',
    'onPointerLeave',
    'onPointerOver',
    'onPointerOut',
];
var uiEvents = ['onScroll'];
var wheelEvents = ['onWheel'];
var animationEvents = [
    'onAnimationStart',
    'onAnimationEnd',
    'onAnimationIteration',
];
var transitionEvents = ['onTransitionEnd'];
var otherEvents = ['onToggle'];
var changeEvents = ['onChange'];
var allEvents = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], clipboardEvents, true), compositionEvents, true), focusEvents, true), formEvents, true), imageEvents, true), keyboardEvents, true), mediaEvents, true), mouseEvents, true), dragEvents, true), selectionEvents, true), touchEvents, true), pointerEvents, true), uiEvents, true), wheelEvents, true), animationEvents, true), transitionEvents, true), changeEvents, true), otherEvents, true);
/**
 * Returns an object with on-event callback props curried with provided args.
 * @param {Object} props Props passed to a component.
 * @param {Function=} getArgs A function that returns argument(s) on-event callbacks
 *   shall be curried with.
 */
function makeEventProps(props, getArgs) {
    var eventProps = {};
    allEvents.forEach(function (eventName) {
        var eventHandler = props[eventName];
        if (!eventHandler) {
            return;
        }
        if (getArgs) {
            eventProps[eventName] = (function (event) {
                return eventHandler(event, getArgs(eventName));
            });
        }
        else {
            eventProps[eventName] = eventHandler;
        }
    });
    return eventProps;
}


/***/ }),

/***/ "aFIl":
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return dequal; });
var has = Object.prototype.hasOwnProperty;

function find(iter, tar, key) {
	for (key of iter.keys()) {
		if (dequal(key, tar)) return key;
	}
}

function dequal(foo, bar) {
	var ctor, len, tmp;
	if (foo === bar) return true;

	if (foo && bar && (ctor=foo.constructor) === bar.constructor) {
		if (ctor === Date) return foo.getTime() === bar.getTime();
		if (ctor === RegExp) return foo.toString() === bar.toString();

		if (ctor === Array) {
			if ((len=foo.length) === bar.length) {
				while (len-- && dequal(foo[len], bar[len]));
			}
			return len === -1;
		}

		if (ctor === Set) {
			if (foo.size !== bar.size) {
				return false;
			}
			for (len of foo) {
				tmp = len;
				if (tmp && typeof tmp === 'object') {
					tmp = find(bar, tmp);
					if (!tmp) return false;
				}
				if (!bar.has(tmp)) return false;
			}
			return true;
		}

		if (ctor === Map) {
			if (foo.size !== bar.size) {
				return false;
			}
			for (len of foo) {
				tmp = len[0];
				if (tmp && typeof tmp === 'object') {
					tmp = find(bar, tmp);
					if (!tmp) return false;
				}
				if (!dequal(len[1], bar.get(tmp))) {
					return false;
				}
			}
			return true;
		}

		if (ctor === ArrayBuffer) {
			foo = new Uint8Array(foo);
			bar = new Uint8Array(bar);
		} else if (ctor === DataView) {
			if ((len=foo.byteLength) === bar.byteLength) {
				while (len-- && foo.getInt8(len) === bar.getInt8(len));
			}
			return len === -1;
		}

		if (ArrayBuffer.isView(foo)) {
			if ((len=foo.byteLength) === bar.byteLength) {
				while (len-- && foo[len] === bar[len]);
			}
			return len === -1;
		}

		if (!ctor || typeof foo === 'object') {
			len = 0;
			for (ctor in foo) {
				if (has.call(foo, ctor) && ++len && !has.call(bar, ctor)) return false;
				if (!(ctor in bar) || !dequal(foo[ctor], bar[ctor])) return false;
			}
			return Object.keys(bar).length === len;
		}
	}

	return foo !== foo && bar !== bar;
}


/***/ }),

/***/ "gr1s":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("17x9");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var make_event_props__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("VAed");
/* harmony import */ var make_cancellable_promise__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("rPSO");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("BHdc");
/* harmony import */ var tiny_invariant__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("9R94");
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("2W6z");
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(warning__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var dequal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("aFIl");
/* harmony import */ var _pdfjs_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("GlAO");
/* harmony import */ var _DocumentContext_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("LiF2");
/* harmony import */ var _Message_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("z29T");
/* harmony import */ var _LinkService_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("l3jl");
/* harmony import */ var _PasswordResponses_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("FfWa");
/* harmony import */ var _shared_utils_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("N8sZ");
/* harmony import */ var _shared_hooks_useResolver_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("sZF0");
/* harmony import */ var _shared_propTypes_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("iwXC");
'use client';
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
















const { PDFDataRangeTransport } = _pdfjs_js__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"];
const defaultOnPassword = (callback, reason) => {
    switch (reason) {
        case _PasswordResponses_js__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"].NEED_PASSWORD: {
            // eslint-disable-next-line no-alert
            const password = prompt('Enter the password to open this PDF file.');
            callback(password);
            break;
        }
        case _PasswordResponses_js__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"].INCORRECT_PASSWORD: {
            // eslint-disable-next-line no-alert
            const password = prompt('Invalid password. Please try again.');
            callback(password);
            break;
        }
        default:
    }
};
function isParameterObject(file) {
    return (typeof file === 'object' &&
        file !== null &&
        ('data' in file || 'range' in file || 'url' in file));
}
/**
 * Loads a document passed using `file` prop.
 */
const Document = Object(react__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(function Document(_a, ref) {
    var { children, className, error = 'Failed to load PDF file.', externalLinkRel, externalLinkTarget, file, inputRef, imageResourcesPath, loading = 'Loading PDF…', noData = 'No PDF file specified.', onItemClick, onLoadError: onLoadErrorProps, onLoadProgress, onLoadSuccess: onLoadSuccessProps, onPassword = defaultOnPassword, onSourceError: onSourceErrorProps, onSourceSuccess: onSourceSuccessProps, options, renderMode, rotate } = _a, otherProps = __rest(_a, ["children", "className", "error", "externalLinkRel", "externalLinkTarget", "file", "inputRef", "imageResourcesPath", "loading", "noData", "onItemClick", "onLoadError", "onLoadProgress", "onLoadSuccess", "onPassword", "onSourceError", "onSourceSuccess", "options", "renderMode", "rotate"]);
    const [sourceState, sourceDispatch] = Object(_shared_hooks_useResolver_js__WEBPACK_IMPORTED_MODULE_14__[/* default */ "a"])();
    const { value: source, error: sourceError } = sourceState;
    const [pdfState, pdfDispatch] = Object(_shared_hooks_useResolver_js__WEBPACK_IMPORTED_MODULE_14__[/* default */ "a"])();
    const { value: pdf, error: pdfError } = pdfState;
    const linkService = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(new _LinkService_js__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"]());
    const pages = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])([]);
    const prevFile = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])();
    const prevOptions = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])();
    Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
        if (file && file !== prevFile.current && isParameterObject(file)) {
            warning__WEBPACK_IMPORTED_MODULE_6___default()(!Object(dequal__WEBPACK_IMPORTED_MODULE_7__[/* dequal */ "a"])(file, prevFile.current), `File prop passed to <Document /> changed, but it's equal to previous one. This might result in unnecessary reloads. Consider memoizing the value passed to "file" prop.`);
            prevFile.current = file;
        }
    }, [file]);
    // Detect non-memoized changes in options prop
    Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
        if (options && options !== prevOptions.current) {
            warning__WEBPACK_IMPORTED_MODULE_6___default()(!Object(dequal__WEBPACK_IMPORTED_MODULE_7__[/* dequal */ "a"])(options, prevOptions.current), `Options prop passed to <Document /> changed, but it's equal to previous one. This might result in unnecessary reloads. Consider memoizing the value passed to "options" prop.`);
            prevOptions.current = options;
        }
    }, [options]);
    const viewer = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])({
        // Handling jumping to internal links target
        scrollPageIntoView: (args) => {
            const { dest, pageNumber, pageIndex = pageNumber - 1 } = args;
            // First, check if custom handling of onItemClick was provided
            if (onItemClick) {
                onItemClick({ dest, pageIndex, pageNumber });
                return;
            }
            // If not, try to look for target page within the <Document>.
            const page = pages.current[pageIndex];
            if (page) {
                // Scroll to the page automatically
                page.scrollIntoView();
                return;
            }
            warning__WEBPACK_IMPORTED_MODULE_6___default()(false, `An internal link leading to page ${pageNumber} was clicked, but neither <Document> was provided with onItemClick nor it was able to find the page within itself. Either provide onItemClick to <Document> and handle navigating by yourself or ensure that all pages are rendered within <Document>.`);
        },
    });
    Object(react__WEBPACK_IMPORTED_MODULE_0__["useImperativeHandle"])(ref, () => ({
        linkService,
        pages,
        viewer,
    }), []);
    /**
     * Called when a document source is resolved correctly
     */
    function onSourceSuccess() {
        if (onSourceSuccessProps) {
            onSourceSuccessProps();
        }
    }
    /**
     * Called when a document source failed to be resolved correctly
     */
    function onSourceError() {
        if (!sourceError) {
            // Impossible, but TypeScript doesn't know that
            return;
        }
        warning__WEBPACK_IMPORTED_MODULE_6___default()(false, sourceError.toString());
        if (onSourceErrorProps) {
            onSourceErrorProps(sourceError);
        }
    }
    function resetSource() {
        sourceDispatch({ type: 'RESET' });
    }
    Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(resetSource, [file, sourceDispatch]);
    const findDocumentSource = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(() => __awaiter(this, void 0, void 0, function* () {
        if (!file) {
            return null;
        }
        // File is a string
        if (typeof file === 'string') {
            if (Object(_shared_utils_js__WEBPACK_IMPORTED_MODULE_13__[/* isDataURI */ "j"])(file)) {
                const fileByteString = Object(_shared_utils_js__WEBPACK_IMPORTED_MODULE_13__[/* dataURItoByteString */ "b"])(file);
                return { data: fileByteString };
            }
            Object(_shared_utils_js__WEBPACK_IMPORTED_MODULE_13__[/* displayCORSWarning */ "c"])();
            return { url: file };
        }
        // File is PDFDataRangeTransport
        if (file instanceof PDFDataRangeTransport) {
            return { range: file };
        }
        // File is an ArrayBuffer
        if (Object(_shared_utils_js__WEBPACK_IMPORTED_MODULE_13__[/* isArrayBuffer */ "f"])(file)) {
            return { data: file };
        }
        /**
         * The cases below are browser-only.
         * If you're running on a non-browser environment, these cases will be of no use.
         */
        if (_shared_utils_js__WEBPACK_IMPORTED_MODULE_13__[/* isBrowser */ "h"]) {
            // File is a Blob
            if (Object(_shared_utils_js__WEBPACK_IMPORTED_MODULE_13__[/* isBlob */ "g"])(file)) {
                const data = yield Object(_shared_utils_js__WEBPACK_IMPORTED_MODULE_13__[/* loadFromFile */ "m"])(file);
                return { data };
            }
        }
        // At this point, file must be an object
        Object(tiny_invariant__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"])(typeof file === 'object', 'Invalid parameter in file, need either Uint8Array, string or a parameter object');
        Object(tiny_invariant__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"])(isParameterObject(file), 'Invalid parameter object: need either .data, .range or .url');
        // File .url is a string
        if ('url' in file && typeof file.url === 'string') {
            if (Object(_shared_utils_js__WEBPACK_IMPORTED_MODULE_13__[/* isDataURI */ "j"])(file.url)) {
                const { url } = file, otherParams = __rest(file, ["url"]);
                const fileByteString = Object(_shared_utils_js__WEBPACK_IMPORTED_MODULE_13__[/* dataURItoByteString */ "b"])(url);
                return Object.assign({ data: fileByteString }, otherParams);
            }
            Object(_shared_utils_js__WEBPACK_IMPORTED_MODULE_13__[/* displayCORSWarning */ "c"])();
        }
        return file;
    }), [file]);
    Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
        const cancellable = Object(make_cancellable_promise__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(findDocumentSource());
        cancellable.promise
            .then((nextSource) => {
            sourceDispatch({ type: 'RESOLVE', value: nextSource });
        })
            .catch((error) => {
            sourceDispatch({ type: 'REJECT', error });
        });
        return () => {
            Object(_shared_utils_js__WEBPACK_IMPORTED_MODULE_13__[/* cancelRunningTask */ "a"])(cancellable);
        };
    }, [findDocumentSource, sourceDispatch]);
    Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
        if (typeof source === 'undefined') {
            return;
        }
        if (source === false) {
            onSourceError();
            return;
        }
        onSourceSuccess();
    }, 
    // Ommitted callbacks so they are not called every time they change
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [source]);
    /**
     * Called when a document is read successfully
     */
    function onLoadSuccess() {
        if (!pdf) {
            // Impossible, but TypeScript doesn't know that
            return;
        }
        if (onLoadSuccessProps) {
            onLoadSuccessProps(pdf);
        }
        pages.current = new Array(pdf.numPages);
        linkService.current.setDocument(pdf);
    }
    /**
     * Called when a document failed to read successfully
     */
    function onLoadError() {
        if (!pdfError) {
            // Impossible, but TypeScript doesn't know that
            return;
        }
        warning__WEBPACK_IMPORTED_MODULE_6___default()(false, pdfError.toString());
        if (onLoadErrorProps) {
            onLoadErrorProps(pdfError);
        }
    }
    function resetDocument() {
        pdfDispatch({ type: 'RESET' });
    }
    Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(resetDocument, [pdfDispatch, source]);
    function loadDocument() {
        if (!source) {
            return;
        }
        const documentInitParams = options
            ? Object.assign(Object.assign({}, source), options) : source;
        const destroyable = _pdfjs_js__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"].getDocument(documentInitParams);
        if (onLoadProgress) {
            destroyable.onProgress = onLoadProgress;
        }
        if (onPassword) {
            destroyable.onPassword = onPassword;
        }
        const loadingTask = destroyable;
        loadingTask.promise
            .then((nextPdf) => {
            pdfDispatch({ type: 'RESOLVE', value: nextPdf });
        })
            .catch((error) => {
            if (loadingTask.destroyed) {
                return;
            }
            pdfDispatch({ type: 'REJECT', error });
        });
        return () => {
            loadingTask.destroy();
        };
    }
    Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(loadDocument, 
    // Ommitted callbacks so they are not called every time they change
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [options, pdfDispatch, source]);
    Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
        if (typeof pdf === 'undefined') {
            return;
        }
        if (pdf === false) {
            onLoadError();
            return;
        }
        onLoadSuccess();
    }, 
    // Ommitted callbacks so they are not called every time they change
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pdf]);
    function setupLinkService() {
        linkService.current.setViewer(viewer.current);
        linkService.current.setExternalLinkRel(externalLinkRel);
        linkService.current.setExternalLinkTarget(externalLinkTarget);
    }
    Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(setupLinkService, [externalLinkRel, externalLinkTarget]);
    function registerPage(pageIndex, ref) {
        pages.current[pageIndex] = ref;
    }
    function unregisterPage(pageIndex) {
        delete pages.current[pageIndex];
    }
    const childContext = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => ({
        imageResourcesPath,
        linkService: linkService.current,
        onItemClick,
        pdf,
        registerPage,
        renderMode,
        rotate,
        unregisterPage,
    }), [imageResourcesPath, onItemClick, pdf, renderMode, rotate]);
    const eventProps = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => Object(make_event_props__WEBPACK_IMPORTED_MODULE_2__[/* default */ "b"])(otherProps, () => pdf), [otherProps, pdf]);
    function renderChildren() {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DocumentContext_js__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"].Provider, { value: childContext }, children);
    }
    function renderContent() {
        if (!file) {
            return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Message_js__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"], { type: "no-data" }, typeof noData === 'function' ? noData() : noData);
        }
        if (pdf === undefined || pdf === null) {
            return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Message_js__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"], { type: "loading" }, typeof loading === 'function' ? loading() : loading));
        }
        if (pdf === false) {
            return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Message_js__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"], { type: "error" }, typeof error === 'function' ? error() : error);
        }
        return renderChildren();
    }
    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", Object.assign({ className: Object(clsx__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])('react-pdf__Document', className), ref: inputRef, style: {
            ['--scale-factor']: '1',
        } }, eventProps), renderContent()));
});
const isFunctionOrNode = prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.node]);
Document.propTypes = Object.assign(Object.assign({}, _shared_propTypes_js__WEBPACK_IMPORTED_MODULE_15__[/* eventProps */ "a"]), { children: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.node, className: _shared_propTypes_js__WEBPACK_IMPORTED_MODULE_15__[/* isClassName */ "b"], error: isFunctionOrNode, externalLinkRel: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string, externalLinkTarget: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOf(['_self', '_blank', '_parent', '_top']), file: _shared_propTypes_js__WEBPACK_IMPORTED_MODULE_15__[/* isFile */ "c"], imageResourcesPath: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string, inputRef: _shared_propTypes_js__WEBPACK_IMPORTED_MODULE_15__[/* isRef */ "g"], loading: isFunctionOrNode, noData: isFunctionOrNode, onItemClick: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func, onLoadError: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func, onLoadProgress: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func, onLoadSuccess: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func, onPassword: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func, onSourceError: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func, onSourceSuccess: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func, options: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
        canvasFactory: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.any,
        canvasMaxAreaInBytes: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
        cMapPacked: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
        CMapReaderFactory: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.any,
        cMapUrl: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
        disableAutoFetch: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
        disableFontFace: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
        disableRange: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
        disableStream: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
        docBaseUrl: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
        enableXfa: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
        filterFactory: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.any,
        fontExtraProperties: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
        httpHeaders: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
        isEvalSupported: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
        isOffscreenCanvasSupported: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
        length: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
        maxImageSize: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
        ownerDocument: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.any,
        password: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
        pdfBug: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
        rangeChunkSize: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
        StandardFontDataFactory: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.any,
        standardFontDataUrl: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
        stopAtErrors: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
        useSystemFonts: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
        useWorkerFetch: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
        verbosity: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
        withCredentials: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
        worker: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.any,
    }), rotate: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number });
/* harmony default export */ __webpack_exports__["a"] = (Document);


/***/ }),

/***/ "hats":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__("q1tI");
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__("17x9");
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);

// EXTERNAL MODULE: ./node_modules/make-cancellable-promise/dist/esm/index.js
var esm = __webpack_require__("rPSO");

// EXTERNAL MODULE: ./node_modules/make-event-props/dist/esm/index.js
var dist_esm = __webpack_require__("VAed");

// EXTERNAL MODULE: ./node_modules/clsx/dist/clsx.mjs
var clsx = __webpack_require__("BHdc");

// CONCATENATED MODULE: ./node_modules/merge-refs/dist/esm/index.js
/**
 * A function that merges React refs into one.
 * Supports both functions and ref objects created using createRef() and useRef().
 *
 * Usage:
 * ```tsx
 * <div ref={mergeRefs(ref1, ref2, ref3)} />
 * ```
 *
 * @param {(React.Ref<T> | undefined)[]} inputRefs Array of refs
 * @returns {React.Ref<T> | React.RefCallback<T>} Merged refs
 */
function mergeRefs() {
    var inputRefs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        inputRefs[_i] = arguments[_i];
    }
    var filteredInputRefs = inputRefs.filter(Boolean);
    if (filteredInputRefs.length <= 1) {
        var firstRef = filteredInputRefs[0];
        return firstRef || null;
    }
    return function mergedRefs(ref) {
        filteredInputRefs.forEach(function (inputRef) {
            if (typeof inputRef === 'function') {
                inputRef(ref);
            }
            else if (inputRef) {
                inputRef.current = ref;
            }
        });
    };
}

// EXTERNAL MODULE: ./node_modules/tiny-invariant/dist/tiny-invariant.esm.js
var tiny_invariant_esm = __webpack_require__("9R94");

// EXTERNAL MODULE: ./node_modules/warning/warning.js
var warning = __webpack_require__("2W6z");
var warning_default = /*#__PURE__*/__webpack_require__.n(warning);

// EXTERNAL MODULE: ./node_modules/react-pdf/dist/esm/PageContext.js
var PageContext = __webpack_require__("iH46");

// EXTERNAL MODULE: ./node_modules/react-pdf/dist/esm/Message.js
var Message = __webpack_require__("z29T");

// EXTERNAL MODULE: ./node_modules/react-pdf/dist/esm/pdfjs.js
var pdfjs = __webpack_require__("GlAO");

// CONCATENATED MODULE: ./node_modules/react-pdf/dist/esm/shared/constants.js
// From pdfjs-dist/lib/web/struct_tree_layer_builder.js
const PDF_ROLE_TO_HTML_ROLE = {
    // Document level structure types
    Document: null, // There's a "document" role, but it doesn't make sense here.
    DocumentFragment: null,
    // Grouping level structure types
    Part: 'group',
    Sect: 'group', // XXX: There's a "section" role, but it's abstract.
    Div: 'group',
    Aside: 'note',
    NonStruct: 'none',
    // Block level structure types
    P: null,
    // H<n>,
    H: 'heading',
    Title: null,
    FENote: 'note',
    // Sub-block level structure type
    Sub: 'group',
    // General inline level structure types
    Lbl: null,
    Span: null,
    Em: null,
    Strong: null,
    Link: 'link',
    Annot: 'note',
    Form: 'form',
    // Ruby and Warichu structure types
    Ruby: null,
    RB: null,
    RT: null,
    RP: null,
    Warichu: null,
    WT: null,
    WP: null,
    // List standard structure types
    L: 'list',
    LI: 'listitem',
    LBody: null,
    // Table standard structure types
    Table: 'table',
    TR: 'row',
    TH: 'columnheader',
    TD: 'cell',
    THead: 'columnheader',
    TBody: null,
    TFoot: null,
    // Standard structure type Caption
    Caption: null,
    // Standard structure type Figure
    Figure: 'figure',
    // Standard structure type Formula
    Formula: null,
    // standard structure type Artifact
    Artifact: null,
};
const HEADING_PATTERN = /^H(\d+)$/;

// CONCATENATED MODULE: ./node_modules/react-pdf/dist/esm/shared/structTreeUtils.js

function isPdfRole(role) {
    return role in PDF_ROLE_TO_HTML_ROLE;
}
function isStructTreeNode(node) {
    return 'children' in node;
}
function isStructTreeNodeWithOnlyContentChild(node) {
    if (!isStructTreeNode(node)) {
        return false;
    }
    return node.children.length === 1 && 0 in node.children && 'id' in node.children[0];
}
function getRoleAttributes(node) {
    const attributes = {};
    if (isStructTreeNode(node)) {
        const { role } = node;
        const matches = role.match(HEADING_PATTERN);
        if (matches) {
            attributes.role = 'heading';
            attributes['aria-level'] = Number(matches[1]);
        }
        else if (isPdfRole(role)) {
            const htmlRole = PDF_ROLE_TO_HTML_ROLE[role];
            if (htmlRole) {
                attributes.role = htmlRole;
            }
        }
    }
    return attributes;
}
function getBaseAttributes(node) {
    const attributes = {};
    if (isStructTreeNode(node)) {
        if (node.alt !== undefined) {
            attributes['aria-label'] = node.alt;
        }
        if (node.lang !== undefined) {
            attributes.lang = node.lang;
        }
        if (isStructTreeNodeWithOnlyContentChild(node)) {
            const [child] = node.children;
            if (child) {
                const childAttributes = getBaseAttributes(child);
                return Object.assign(Object.assign({}, attributes), childAttributes);
            }
        }
    }
    else {
        if ('id' in node) {
            attributes['aria-owns'] = node.id;
        }
    }
    return attributes;
}
function getAttributes(node) {
    if (!node) {
        return null;
    }
    return Object.assign(Object.assign({}, getRoleAttributes(node)), getBaseAttributes(node));
}

// CONCATENATED MODULE: ./node_modules/react-pdf/dist/esm/StructTreeItem.js


function StructTreeItem({ className, node }) {
    const attributes = Object(react["useMemo"])(() => getAttributes(node), [node]);
    const children = Object(react["useMemo"])(() => {
        if (!isStructTreeNode(node)) {
            return null;
        }
        if (isStructTreeNodeWithOnlyContentChild(node)) {
            return null;
        }
        return node.children.map((child, index) => {
            return (
            // eslint-disable-next-line react/no-array-index-key
            react_default.a.createElement(StructTreeItem, { key: index, node: child }));
        });
    }, [node]);
    return (react_default.a.createElement("span", Object.assign({ className: className }, attributes), children));
}

// EXTERNAL MODULE: ./node_modules/react-pdf/dist/esm/shared/hooks/usePageContext.js
var usePageContext = __webpack_require__("qWXA");

// EXTERNAL MODULE: ./node_modules/react-pdf/dist/esm/shared/hooks/useResolver.js
var useResolver = __webpack_require__("sZF0");

// EXTERNAL MODULE: ./node_modules/react-pdf/dist/esm/shared/utils.js
var utils = __webpack_require__("N8sZ");

// CONCATENATED MODULE: ./node_modules/react-pdf/dist/esm/StructTree.js








function StructTree() {
    const pageContext = Object(usePageContext["a" /* default */])();
    Object(tiny_invariant_esm["a" /* default */])(pageContext, 'Unable to find Page context.');
    const { onGetStructTreeError: onGetStructTreeErrorProps, onGetStructTreeSuccess: onGetStructTreeSuccessProps, } = pageContext;
    const [structTreeState, structTreeDispatch] = Object(useResolver["a" /* default */])();
    const { value: structTree, error: structTreeError } = structTreeState;
    const { customTextRenderer, page } = pageContext;
    function onLoadSuccess() {
        if (!structTree) {
            // Impossible, but TypeScript doesn't know that
            return;
        }
        if (onGetStructTreeSuccessProps) {
            onGetStructTreeSuccessProps(structTree);
        }
    }
    function onLoadError() {
        if (!structTreeError) {
            // Impossible, but TypeScript doesn't know that
            return;
        }
        warning_default()(false, structTreeError.toString());
        if (onGetStructTreeErrorProps) {
            onGetStructTreeErrorProps(structTreeError);
        }
    }
    function resetAnnotations() {
        structTreeDispatch({ type: 'RESET' });
    }
    Object(react["useEffect"])(resetAnnotations, [structTreeDispatch, page]);
    function loadStructTree() {
        if (customTextRenderer) {
            // TODO: Document why this is necessary
            return;
        }
        if (!page) {
            return;
        }
        const cancellable = Object(esm["a" /* default */])(page.getStructTree());
        const runningTask = cancellable;
        cancellable.promise
            .then((nextStructTree) => {
            structTreeDispatch({ type: 'RESOLVE', value: nextStructTree });
        })
            .catch((error) => {
            structTreeDispatch({ type: 'REJECT', error });
        });
        return () => Object(utils["a" /* cancelRunningTask */])(runningTask);
    }
    Object(react["useEffect"])(loadStructTree, [customTextRenderer, page, structTreeDispatch]);
    Object(react["useEffect"])(() => {
        if (structTree === undefined) {
            return;
        }
        if (structTree === false) {
            onLoadError();
            return;
        }
        onLoadSuccess();
    }, 
    // Ommitted callbacks so they are not called every time they change
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [structTree]);
    if (!structTree) {
        return null;
    }
    return react_default.a.createElement(StructTreeItem, { className: "react-pdf__Page__structTree structTree", node: structTree });
}

// CONCATENATED MODULE: ./node_modules/react-pdf/dist/esm/Page/PageCanvas.js
'use client';








const ANNOTATION_MODE = pdfjs["a" /* default */].AnnotationMode;
function PageCanvas(props) {
    const pageContext = Object(usePageContext["a" /* default */])();
    Object(tiny_invariant_esm["a" /* default */])(pageContext, 'Unable to find Page context.');
    const mergedProps = Object.assign(Object.assign({}, pageContext), props);
    const { _className, canvasBackground, devicePixelRatio = Object(utils["e" /* getDevicePixelRatio */])(), onRenderError: onRenderErrorProps, onRenderSuccess: onRenderSuccessProps, page, renderForms, renderTextLayer, rotate, scale, } = mergedProps;
    const { canvasRef } = props;
    Object(tiny_invariant_esm["a" /* default */])(page, 'Attempted to render page canvas, but no page was specified.');
    const canvasElement = Object(react["useRef"])(null);
    /**
     * Called when a page is rendered successfully.
     */
    function onRenderSuccess() {
        if (!page) {
            // Impossible, but TypeScript doesn't know that
            return;
        }
        if (onRenderSuccessProps) {
            onRenderSuccessProps(Object(utils["n" /* makePageCallback */])(page, scale));
        }
    }
    /**
     * Called when a page fails to render.
     */
    function onRenderError(error) {
        if (Object(utils["i" /* isCancelException */])(error)) {
            return;
        }
        warning_default()(false, error.toString());
        if (onRenderErrorProps) {
            onRenderErrorProps(error);
        }
    }
    const renderViewport = Object(react["useMemo"])(() => page.getViewport({ scale: scale * devicePixelRatio, rotation: rotate }), [devicePixelRatio, page, rotate, scale]);
    const viewport = Object(react["useMemo"])(() => page.getViewport({ scale, rotation: rotate }), [page, rotate, scale]);
    function drawPageOnCanvas() {
        if (!page) {
            return;
        }
        // Ensures the canvas will be re-rendered from scratch. Otherwise all form data will stay.
        page.cleanup();
        const { current: canvas } = canvasElement;
        if (!canvas) {
            return;
        }
        canvas.width = renderViewport.width;
        canvas.height = renderViewport.height;
        canvas.style.width = `${Math.floor(viewport.width)}px`;
        canvas.style.height = `${Math.floor(viewport.height)}px`;
        canvas.style.visibility = 'hidden';
        const renderContext = {
            annotationMode: renderForms ? ANNOTATION_MODE.ENABLE_FORMS : ANNOTATION_MODE.ENABLE,
            canvasContext: canvas.getContext('2d', { alpha: false }),
            viewport: renderViewport,
        };
        if (canvasBackground) {
            renderContext.background = canvasBackground;
        }
        const cancellable = page.render(renderContext);
        const runningTask = cancellable;
        cancellable.promise
            .then(() => {
            canvas.style.visibility = '';
            onRenderSuccess();
        })
            .catch(onRenderError);
        return () => Object(utils["a" /* cancelRunningTask */])(runningTask);
    }
    Object(react["useEffect"])(drawPageOnCanvas, 
    // Ommitted callbacks so they are not called every time they change
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
        canvasBackground,
        canvasElement,
        devicePixelRatio,
        page,
        renderForms,
        renderViewport,
        viewport,
    ]);
    const cleanup = Object(react["useCallback"])(() => {
        const { current: canvas } = canvasElement;
        /**
         * Zeroing the width and height cause most browsers to release graphics
         * resources immediately, which can greatly reduce memory consumption.
         */
        if (canvas) {
            canvas.width = 0;
            canvas.height = 0;
        }
    }, [canvasElement]);
    Object(react["useEffect"])(() => cleanup, [cleanup]);
    return (react_default.a.createElement("canvas", { className: `${_className}__canvas`, dir: "ltr", ref: mergeRefs(canvasRef, canvasElement), style: {
            display: 'block',
            userSelect: 'none',
        } }, renderTextLayer ? react_default.a.createElement(StructTree, null) : null));
}

// CONCATENATED MODULE: ./node_modules/react-pdf/dist/esm/Page/PageSVG.js








function PageSVG() {
    const pageContext = Object(usePageContext["a" /* default */])();
    Object(tiny_invariant_esm["a" /* default */])(pageContext, 'Unable to find Page context.');
    const { _className, onRenderSuccess: onRenderSuccessProps, onRenderError: onRenderErrorProps, page, rotate, scale, } = pageContext;
    Object(tiny_invariant_esm["a" /* default */])(page, 'Attempted to render page SVG, but no page was specified.');
    const [svgState, svgDispatch] = Object(useResolver["a" /* default */])();
    const { value: svg, error: svgError } = svgState;
    /**
     * Called when a page is rendered successfully
     */
    function onRenderSuccess() {
        if (!page) {
            // Impossible, but TypeScript doesn't know that
            return;
        }
        if (onRenderSuccessProps) {
            onRenderSuccessProps(Object(utils["n" /* makePageCallback */])(page, scale));
        }
    }
    /**
     * Called when a page fails to render
     */
    function onRenderError() {
        if (!svgError) {
            // Impossible, but TypeScript doesn't know that
            return;
        }
        if (Object(utils["i" /* isCancelException */])(svgError)) {
            return;
        }
        warning_default()(false, svgError.toString());
        if (onRenderErrorProps) {
            onRenderErrorProps(svgError);
        }
    }
    const viewport = Object(react["useMemo"])(() => page.getViewport({ scale, rotation: rotate }), [page, rotate, scale]);
    function resetSVG() {
        svgDispatch({ type: 'RESET' });
    }
    Object(react["useEffect"])(resetSVG, [page, svgDispatch, viewport]);
    function renderSVG() {
        if (!page) {
            return;
        }
        const cancellable = Object(esm["a" /* default */])(page.getOperatorList());
        cancellable.promise
            .then((operatorList) => {
            const svgGfx = new pdfjs["a" /* default */].SVGGraphics(page.commonObjs, page.objs);
            svgGfx
                .getSVG(operatorList, viewport)
                .then((nextSvg) => {
                // See https://github.com/mozilla/pdf.js/issues/16745
                if (!(nextSvg instanceof SVGElement)) {
                    throw new Error('getSVG returned unexpected result.');
                }
                svgDispatch({ type: 'RESOLVE', value: nextSvg });
            })
                .catch((error) => {
                svgDispatch({ type: 'REJECT', error });
            });
        })
            .catch((error) => {
            svgDispatch({ type: 'REJECT', error });
        });
        return () => Object(utils["a" /* cancelRunningTask */])(cancellable);
    }
    Object(react["useEffect"])(renderSVG, [page, svgDispatch, viewport]);
    Object(react["useEffect"])(() => {
        if (svg === undefined) {
            return;
        }
        if (svg === false) {
            onRenderError();
            return;
        }
        onRenderSuccess();
    }, 
    // Ommitted callbacks so they are not called every time they change
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [svg]);
    function drawPageOnContainer(element) {
        if (!element || !svg) {
            return;
        }
        // Append SVG element to the main container, if this hasn't been done already
        if (!element.firstElementChild) {
            element.appendChild(svg);
        }
        const { width, height } = viewport;
        svg.setAttribute('width', `${width}`);
        svg.setAttribute('height', `${height}`);
    }
    const { width, height } = viewport;
    return (react_default.a.createElement("div", { className: `${_className}__svg`, 
        // Note: This cannot be shortened, as we need this function to be called with each render.
        ref: (ref) => drawPageOnContainer(ref), style: {
            display: 'block',
            backgroundColor: 'white',
            overflow: 'hidden',
            width,
            height,
            userSelect: 'none',
        } }));
}

// CONCATENATED MODULE: ./node_modules/react-pdf/dist/esm/Page/TextLayer.js
'use client';









function isTextItem(item) {
    return 'str' in item;
}
function TextLayer() {
    const pageContext = Object(usePageContext["a" /* default */])();
    Object(tiny_invariant_esm["a" /* default */])(pageContext, 'Unable to find Page context.');
    const { customTextRenderer, onGetTextError, onGetTextSuccess, onRenderTextLayerError, onRenderTextLayerSuccess, page, pageIndex, pageNumber, rotate, scale, } = pageContext;
    Object(tiny_invariant_esm["a" /* default */])(page, 'Attempted to load page text content, but no page was specified.');
    const [textContentState, textContentDispatch] = Object(useResolver["a" /* default */])();
    const { value: textContent, error: textContentError } = textContentState;
    const layerElement = Object(react["useRef"])(null);
    const endElement = Object(react["useRef"])();
    warning_default()(parseInt(window.getComputedStyle(document.body).getPropertyValue('--react-pdf-text-layer'), 10) === 1, 'TextLayer styles not found. Read more: https://github.com/wojtekmaj/react-pdf#support-for-text-layer');
    /**
     * Called when a page text content is read successfully
     */
    function onLoadSuccess() {
        if (!textContent) {
            // Impossible, but TypeScript doesn't know that
            return;
        }
        if (onGetTextSuccess) {
            onGetTextSuccess(textContent);
        }
    }
    /**
     * Called when a page text content failed to read successfully
     */
    function onLoadError() {
        if (!textContentError) {
            // Impossible, but TypeScript doesn't know that
            return;
        }
        warning_default()(false, textContentError.toString());
        if (onGetTextError) {
            onGetTextError(textContentError);
        }
    }
    function resetTextContent() {
        textContentDispatch({ type: 'RESET' });
    }
    Object(react["useEffect"])(resetTextContent, [page, textContentDispatch]);
    function loadTextContent() {
        if (!page) {
            return;
        }
        const cancellable = Object(esm["a" /* default */])(page.getTextContent());
        const runningTask = cancellable;
        cancellable.promise
            .then((nextTextContent) => {
            textContentDispatch({ type: 'RESOLVE', value: nextTextContent });
        })
            .catch((error) => {
            textContentDispatch({ type: 'REJECT', error });
        });
        return () => Object(utils["a" /* cancelRunningTask */])(runningTask);
    }
    Object(react["useEffect"])(loadTextContent, [page, textContentDispatch]);
    Object(react["useEffect"])(() => {
        if (textContent === undefined) {
            return;
        }
        if (textContent === false) {
            onLoadError();
            return;
        }
        onLoadSuccess();
    }, 
    // Ommitted callbacks so they are not called every time they change
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [textContent]);
    /**
     * Called when a text layer is rendered successfully
     */
    const onRenderSuccess = Object(react["useCallback"])(() => {
        if (onRenderTextLayerSuccess) {
            onRenderTextLayerSuccess();
        }
    }, [onRenderTextLayerSuccess]);
    /**
     * Called when a text layer failed to render successfully
     */
    const onRenderError = Object(react["useCallback"])((error) => {
        warning_default()(false, error.toString());
        if (onRenderTextLayerError) {
            onRenderTextLayerError(error);
        }
    }, [onRenderTextLayerError]);
    function onMouseDown() {
        const end = endElement.current;
        if (!end) {
            return;
        }
        end.classList.add('active');
    }
    function onMouseUp() {
        const end = endElement.current;
        if (!end) {
            return;
        }
        end.classList.remove('active');
    }
    const viewport = Object(react["useMemo"])(() => page.getViewport({ scale, rotation: rotate }), [page, rotate, scale]);
    function renderTextLayer() {
        if (!page || !textContent) {
            return;
        }
        const { current: layer } = layerElement;
        if (!layer) {
            return;
        }
        layer.innerHTML = '';
        const textContentSource = page.streamTextContent({ includeMarkedContent: true });
        const parameters = {
            container: layer,
            textContentSource,
            viewport,
        };
        const cancellable = pdfjs["a" /* default */].renderTextLayer(parameters);
        const runningTask = cancellable;
        cancellable.promise
            .then(() => {
            const end = document.createElement('div');
            end.className = 'endOfContent';
            layer.append(end);
            endElement.current = end;
            const layerChildren = layer.querySelectorAll('[role="presentation"]');
            if (customTextRenderer) {
                let index = 0;
                textContent.items.forEach((item, itemIndex) => {
                    if (!isTextItem(item)) {
                        return;
                    }
                    const child = layerChildren[index];
                    if (!child) {
                        return;
                    }
                    const content = customTextRenderer(Object.assign({ pageIndex,
                        pageNumber,
                        itemIndex }, item));
                    child.innerHTML = content;
                    index += item.str && item.hasEOL ? 2 : 1;
                });
            }
            // Intentional immediate callback
            onRenderSuccess();
        })
            .catch(onRenderError);
        return () => Object(utils["a" /* cancelRunningTask */])(runningTask);
    }
    Object(react["useLayoutEffect"])(renderTextLayer, [
        customTextRenderer,
        onRenderError,
        onRenderSuccess,
        page,
        pageIndex,
        pageNumber,
        textContent,
        viewport,
    ]);
    return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    react_default.a.createElement("div", { className: Object(clsx["a" /* default */])('react-pdf__Page__textContent', 'textLayer'), onMouseUp: onMouseUp, onMouseDown: onMouseDown, ref: layerElement }));
}

// EXTERNAL MODULE: ./node_modules/react-pdf/dist/esm/shared/hooks/useDocumentContext.js
var useDocumentContext = __webpack_require__("UgZE");

// CONCATENATED MODULE: ./node_modules/react-pdf/dist/esm/Page/AnnotationLayer.js
'use client';










function AnnotationLayer() {
    const documentContext = Object(useDocumentContext["a" /* default */])();
    const pageContext = Object(usePageContext["a" /* default */])();
    Object(tiny_invariant_esm["a" /* default */])(pageContext, 'Unable to find Page context.');
    const mergedProps = Object.assign(Object.assign({}, documentContext), pageContext);
    const { imageResourcesPath, linkService, onGetAnnotationsError: onGetAnnotationsErrorProps, onGetAnnotationsSuccess: onGetAnnotationsSuccessProps, onRenderAnnotationLayerError: onRenderAnnotationLayerErrorProps, onRenderAnnotationLayerSuccess: onRenderAnnotationLayerSuccessProps, page, pdf, renderForms, rotate, scale = 1, } = mergedProps;
    Object(tiny_invariant_esm["a" /* default */])(pdf, 'Attempted to load page annotations, but no document was specified. Wrap <Page /> in a <Document /> or pass explicit `pdf` prop.');
    Object(tiny_invariant_esm["a" /* default */])(page, 'Attempted to load page annotations, but no page was specified.');
    Object(tiny_invariant_esm["a" /* default */])(linkService, 'Attempted to load page annotations, but no linkService was specified.');
    const [annotationsState, annotationsDispatch] = Object(useResolver["a" /* default */])();
    const { value: annotations, error: annotationsError } = annotationsState;
    const layerElement = Object(react["useRef"])(null);
    warning_default()(parseInt(window.getComputedStyle(document.body).getPropertyValue('--react-pdf-annotation-layer'), 10) === 1, 'AnnotationLayer styles not found. Read more: https://github.com/wojtekmaj/react-pdf#support-for-annotations');
    function onLoadSuccess() {
        if (!annotations) {
            // Impossible, but TypeScript doesn't know that
            return;
        }
        if (onGetAnnotationsSuccessProps) {
            onGetAnnotationsSuccessProps(annotations);
        }
    }
    function onLoadError() {
        if (!annotationsError) {
            // Impossible, but TypeScript doesn't know that
            return;
        }
        warning_default()(false, annotationsError.toString());
        if (onGetAnnotationsErrorProps) {
            onGetAnnotationsErrorProps(annotationsError);
        }
    }
    function resetAnnotations() {
        annotationsDispatch({ type: 'RESET' });
    }
    Object(react["useEffect"])(resetAnnotations, [annotationsDispatch, page]);
    function loadAnnotations() {
        if (!page) {
            return;
        }
        const cancellable = Object(esm["a" /* default */])(page.getAnnotations());
        const runningTask = cancellable;
        cancellable.promise
            .then((nextAnnotations) => {
            annotationsDispatch({ type: 'RESOLVE', value: nextAnnotations });
        })
            .catch((error) => {
            annotationsDispatch({ type: 'REJECT', error });
        });
        return () => {
            Object(utils["a" /* cancelRunningTask */])(runningTask);
        };
    }
    Object(react["useEffect"])(loadAnnotations, [annotationsDispatch, page, renderForms]);
    Object(react["useEffect"])(() => {
        if (annotations === undefined) {
            return;
        }
        if (annotations === false) {
            onLoadError();
            return;
        }
        onLoadSuccess();
    }, 
    // Ommitted callbacks so they are not called every time they change
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [annotations]);
    function onRenderSuccess() {
        if (onRenderAnnotationLayerSuccessProps) {
            onRenderAnnotationLayerSuccessProps();
        }
    }
    function onRenderError(error) {
        warning_default()(false, `${error}`);
        if (onRenderAnnotationLayerErrorProps) {
            onRenderAnnotationLayerErrorProps(error);
        }
    }
    const viewport = Object(react["useMemo"])(() => page.getViewport({ scale, rotation: rotate }), [page, rotate, scale]);
    function renderAnnotationLayer() {
        if (!pdf || !page || !linkService || !annotations) {
            return;
        }
        const { current: layer } = layerElement;
        if (!layer) {
            return;
        }
        const clonedViewport = viewport.clone({ dontFlip: true });
        const annotationLayerParameters = {
            accessibilityManager: null, // TODO: Implement this
            annotationCanvasMap: null, // TODO: Implement this
            div: layer,
            l10n: null, // TODO: Implement this
            page,
            viewport: clonedViewport,
        };
        const renderParameters = {
            annotations,
            annotationStorage: pdf.annotationStorage,
            div: layer,
            // See https://github.com/mozilla/pdf.js/issues/17029
            downloadManager: null,
            imageResourcesPath,
            linkService,
            page,
            renderForms,
            viewport: clonedViewport,
        };
        layer.innerHTML = '';
        try {
            new pdfjs["a" /* default */].AnnotationLayer(annotationLayerParameters).render(renderParameters);
            // Intentional immediate callback
            onRenderSuccess();
        }
        catch (error) {
            onRenderError(error);
        }
        return () => {
            // TODO: Cancel running task?
        };
    }
    Object(react["useEffect"])(renderAnnotationLayer, 
    // Ommitted callbacks so they are not called every time they change
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [annotations, imageResourcesPath, linkService, page, renderForms, viewport]);
    return (react_default.a.createElement("div", { className: Object(clsx["a" /* default */])('react-pdf__Page__annotations', 'annotationLayer'), ref: layerElement }));
}

// EXTERNAL MODULE: ./node_modules/react-pdf/dist/esm/shared/propTypes.js
var propTypes = __webpack_require__("iwXC");

// CONCATENATED MODULE: ./node_modules/react-pdf/dist/esm/Page.js
'use client';
var __rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};


















const defaultScale = 1;
/**
 * Displays a page.
 *
 * Should be placed inside `<Document />`. Alternatively, it can have `pdf` prop passed, which can be obtained from `<Document />`'s `onLoadSuccess` callback function, however some advanced functions like linking between pages inside a document may not be working correctly.
 */
const Page_Page = function Page(props) {
    const documentContext = Object(useDocumentContext["a" /* default */])();
    const mergedProps = Object.assign(Object.assign({}, documentContext), props);
    const { _className = 'react-pdf__Page', _enableRegisterUnregisterPage = true, canvasBackground, canvasRef, children, className, customRenderer: CustomRenderer, customTextRenderer, devicePixelRatio, error = 'Failed to load the page.', height, inputRef, loading = 'Loading page…', noData = 'No page specified.', onGetAnnotationsError: onGetAnnotationsErrorProps, onGetAnnotationsSuccess: onGetAnnotationsSuccessProps, onGetStructTreeError: onGetStructTreeErrorProps, onGetStructTreeSuccess: onGetStructTreeSuccessProps, onGetTextError: onGetTextErrorProps, onGetTextSuccess: onGetTextSuccessProps, onLoadError: onLoadErrorProps, onLoadSuccess: onLoadSuccessProps, onRenderAnnotationLayerError: onRenderAnnotationLayerErrorProps, onRenderAnnotationLayerSuccess: onRenderAnnotationLayerSuccessProps, onRenderError: onRenderErrorProps, onRenderSuccess: onRenderSuccessProps, onRenderTextLayerError: onRenderTextLayerErrorProps, onRenderTextLayerSuccess: onRenderTextLayerSuccessProps, pageIndex: pageIndexProps, pageNumber: pageNumberProps, pdf, registerPage, renderAnnotationLayer: renderAnnotationLayerProps = true, renderForms = false, renderMode = 'canvas', renderTextLayer: renderTextLayerProps = true, rotate: rotateProps, scale: scaleProps = defaultScale, unregisterPage, width } = mergedProps, otherProps = __rest(mergedProps, ["_className", "_enableRegisterUnregisterPage", "canvasBackground", "canvasRef", "children", "className", "customRenderer", "customTextRenderer", "devicePixelRatio", "error", "height", "inputRef", "loading", "noData", "onGetAnnotationsError", "onGetAnnotationsSuccess", "onGetStructTreeError", "onGetStructTreeSuccess", "onGetTextError", "onGetTextSuccess", "onLoadError", "onLoadSuccess", "onRenderAnnotationLayerError", "onRenderAnnotationLayerSuccess", "onRenderError", "onRenderSuccess", "onRenderTextLayerError", "onRenderTextLayerSuccess", "pageIndex", "pageNumber", "pdf", "registerPage", "renderAnnotationLayer", "renderForms", "renderMode", "renderTextLayer", "rotate", "scale", "unregisterPage", "width"]);
    const [pageState, pageDispatch] = Object(useResolver["a" /* default */])();
    const { value: page, error: pageError } = pageState;
    const pageElement = Object(react["useRef"])(null);
    Object(tiny_invariant_esm["a" /* default */])(pdf, 'Attempted to load a page, but no document was specified. Wrap <Page /> in a <Document /> or pass explicit `pdf` prop.');
    const pageIndex = Object(utils["l" /* isProvided */])(pageNumberProps) ? pageNumberProps - 1 : pageIndexProps !== null && pageIndexProps !== void 0 ? pageIndexProps : null;
    const pageNumber = pageNumberProps !== null && pageNumberProps !== void 0 ? pageNumberProps : (Object(utils["l" /* isProvided */])(pageIndexProps) ? pageIndexProps + 1 : null);
    const rotate = rotateProps !== null && rotateProps !== void 0 ? rotateProps : (page ? page.rotate : null);
    const scale = Object(react["useMemo"])(() => {
        if (!page) {
            return null;
        }
        // Be default, we'll render page at 100% * scale width.
        let pageScale = 1;
        // Passing scale explicitly null would cause the page not to render
        const scaleWithDefault = scaleProps !== null && scaleProps !== void 0 ? scaleProps : defaultScale;
        // If width/height is defined, calculate the scale of the page so it could be of desired width.
        if (width || height) {
            const viewport = page.getViewport({ scale: 1, rotation: rotate });
            if (width) {
                pageScale = width / viewport.width;
            }
            else if (height) {
                pageScale = height / viewport.height;
            }
        }
        return scaleWithDefault * pageScale;
    }, [height, page, rotate, scaleProps, width]);
    function hook() {
        return () => {
            if (!Object(utils["l" /* isProvided */])(pageIndex)) {
                // Impossible, but TypeScript doesn't know that
                return;
            }
            if (_enableRegisterUnregisterPage && unregisterPage) {
                unregisterPage(pageIndex);
            }
        };
    }
    Object(react["useEffect"])(hook, [_enableRegisterUnregisterPage, pdf, pageIndex, unregisterPage]);
    /**
     * Called when a page is loaded successfully
     */
    function onLoadSuccess() {
        if (onLoadSuccessProps) {
            if (!page || !scale) {
                // Impossible, but TypeScript doesn't know that
                return;
            }
            onLoadSuccessProps(Object(utils["n" /* makePageCallback */])(page, scale));
        }
        if (_enableRegisterUnregisterPage && registerPage) {
            if (!Object(utils["l" /* isProvided */])(pageIndex) || !pageElement.current) {
                // Impossible, but TypeScript doesn't know that
                return;
            }
            registerPage(pageIndex, pageElement.current);
        }
    }
    /**
     * Called when a page failed to load
     */
    function onLoadError() {
        if (!pageError) {
            // Impossible, but TypeScript doesn't know that
            return;
        }
        warning_default()(false, pageError.toString());
        if (onLoadErrorProps) {
            onLoadErrorProps(pageError);
        }
    }
    function resetPage() {
        pageDispatch({ type: 'RESET' });
    }
    Object(react["useEffect"])(resetPage, [pageDispatch, pdf, pageIndex]);
    function loadPage() {
        if (!pdf || !pageNumber) {
            return;
        }
        const cancellable = Object(esm["a" /* default */])(pdf.getPage(pageNumber));
        const runningTask = cancellable;
        cancellable.promise
            .then((nextPage) => {
            pageDispatch({ type: 'RESOLVE', value: nextPage });
        })
            .catch((error) => {
            pageDispatch({ type: 'REJECT', error });
        });
        return () => Object(utils["a" /* cancelRunningTask */])(runningTask);
    }
    Object(react["useEffect"])(loadPage, [pageDispatch, pdf, pageIndex, pageNumber, registerPage]);
    Object(react["useEffect"])(() => {
        if (page === undefined) {
            return;
        }
        if (page === false) {
            onLoadError();
            return;
        }
        onLoadSuccess();
    }, 
    // Ommitted callbacks so they are not called every time they change
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page, scale]);
    const childContext = Object(react["useMemo"])(() => 
    // Technically there cannot be page without pageIndex, pageNumber, rotate and scale, but TypeScript doesn't know that
    page && Object(utils["l" /* isProvided */])(pageIndex) && pageNumber && Object(utils["l" /* isProvided */])(rotate) && Object(utils["l" /* isProvided */])(scale)
        ? {
            _className,
            canvasBackground,
            customTextRenderer,
            devicePixelRatio,
            onGetAnnotationsError: onGetAnnotationsErrorProps,
            onGetAnnotationsSuccess: onGetAnnotationsSuccessProps,
            onGetStructTreeError: onGetStructTreeErrorProps,
            onGetStructTreeSuccess: onGetStructTreeSuccessProps,
            onGetTextError: onGetTextErrorProps,
            onGetTextSuccess: onGetTextSuccessProps,
            onRenderAnnotationLayerError: onRenderAnnotationLayerErrorProps,
            onRenderAnnotationLayerSuccess: onRenderAnnotationLayerSuccessProps,
            onRenderError: onRenderErrorProps,
            onRenderSuccess: onRenderSuccessProps,
            onRenderTextLayerError: onRenderTextLayerErrorProps,
            onRenderTextLayerSuccess: onRenderTextLayerSuccessProps,
            page,
            pageIndex,
            pageNumber,
            renderForms,
            renderTextLayer: renderTextLayerProps,
            rotate,
            scale,
        }
        : null, [
        _className,
        canvasBackground,
        customTextRenderer,
        devicePixelRatio,
        onGetAnnotationsErrorProps,
        onGetAnnotationsSuccessProps,
        onGetStructTreeErrorProps,
        onGetStructTreeSuccessProps,
        onGetTextErrorProps,
        onGetTextSuccessProps,
        onRenderAnnotationLayerErrorProps,
        onRenderAnnotationLayerSuccessProps,
        onRenderErrorProps,
        onRenderSuccessProps,
        onRenderTextLayerErrorProps,
        onRenderTextLayerSuccessProps,
        page,
        pageIndex,
        pageNumber,
        renderForms,
        renderTextLayerProps,
        rotate,
        scale,
    ]);
    const eventProps = Object(react["useMemo"])(() => Object(dist_esm["b" /* default */])(otherProps, () => page ? (scale ? Object(utils["n" /* makePageCallback */])(page, scale) : undefined) : page), [otherProps, page, scale]);
    const pageKey = `${pageIndex}@${scale}/${rotate}`;
    const pageKeyNoScale = `${pageIndex}/${rotate}`;
    function renderMainLayer() {
        switch (renderMode) {
            case 'custom': {
                Object(tiny_invariant_esm["a" /* default */])(CustomRenderer, `renderMode was set to "custom", but no customRenderer was passed.`);
                return react_default.a.createElement(CustomRenderer, { key: `${pageKey}_custom` });
            }
            case 'none':
                return null;
            case 'svg':
                return react_default.a.createElement(PageSVG, { key: `${pageKeyNoScale}_svg` });
            case 'canvas':
            default:
                return react_default.a.createElement(PageCanvas, { key: `${pageKey}_canvas`, canvasRef: canvasRef });
        }
    }
    function renderTextLayer() {
        if (!renderTextLayerProps) {
            return null;
        }
        return react_default.a.createElement(TextLayer, { key: `${pageKey}_text` });
    }
    function renderAnnotationLayer() {
        if (!renderAnnotationLayerProps) {
            return null;
        }
        /**
         * As of now, PDF.js 2.0.943 returns warnings on unimplemented annotations in SVG mode.
         * Therefore, as a fallback, we render "traditional" AnnotationLayer component.
         */
        return react_default.a.createElement(AnnotationLayer, { key: `${pageKey}_annotations` });
    }
    function renderChildren() {
        return (react_default.a.createElement(PageContext["a" /* default */].Provider, { value: childContext },
            renderMainLayer(),
            renderTextLayer(),
            renderAnnotationLayer(),
            children));
    }
    function renderContent() {
        if (!pageNumber) {
            return react_default.a.createElement(Message["a" /* default */], { type: "no-data" }, typeof noData === 'function' ? noData() : noData);
        }
        if (pdf === null || page === undefined || page === null) {
            return (react_default.a.createElement(Message["a" /* default */], { type: "loading" }, typeof loading === 'function' ? loading() : loading));
        }
        if (pdf === false || page === false) {
            return react_default.a.createElement(Message["a" /* default */], { type: "error" }, typeof error === 'function' ? error() : error);
        }
        return renderChildren();
    }
    return (react_default.a.createElement("div", Object.assign({ className: Object(clsx["a" /* default */])(_className, className), "data-page-number": pageNumber, ref: mergeRefs(inputRef, pageElement), style: {
            ['--scale-factor']: `${scale}`,
            backgroundColor: canvasBackground || 'white',
            position: 'relative',
            minWidth: 'min-content',
            minHeight: 'min-content',
        } }, eventProps), renderContent()));
};
const isFunctionOrNode = prop_types_default.a.oneOfType([prop_types_default.a.func, prop_types_default.a.node]);
Page_Page.propTypes = Object.assign(Object.assign({}, propTypes["a" /* eventProps */]), { canvasBackground: prop_types_default.a.string, canvasRef: propTypes["g" /* isRef */], children: prop_types_default.a.node, className: propTypes["b" /* isClassName */], customRenderer: prop_types_default.a.func, customTextRenderer: prop_types_default.a.func, devicePixelRatio: prop_types_default.a.number, error: isFunctionOrNode, height: prop_types_default.a.number, imageResourcesPath: prop_types_default.a.string, inputRef: propTypes["g" /* isRef */], loading: isFunctionOrNode, noData: isFunctionOrNode, onGetTextError: prop_types_default.a.func, onGetTextSuccess: prop_types_default.a.func, onLoadError: prop_types_default.a.func, onLoadSuccess: prop_types_default.a.func, onRenderError: prop_types_default.a.func, onRenderSuccess: prop_types_default.a.func, onRenderTextLayerError: prop_types_default.a.func, onRenderTextLayerSuccess: prop_types_default.a.func, pageIndex: propTypes["d" /* isPageIndex */], pageNumber: propTypes["e" /* isPageNumber */], pdf: propTypes["f" /* isPdf */], renderAnnotationLayer: prop_types_default.a.bool, renderForms: prop_types_default.a.bool, renderMode: propTypes["h" /* isRenderMode */], renderTextLayer: prop_types_default.a.bool, rotate: propTypes["i" /* isRotate */], scale: prop_types_default.a.number, width: prop_types_default.a.number });
/* harmony default export */ var esm_Page = __webpack_exports__["a"] = (Page_Page);


/***/ }),

/***/ "iH46":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
'use client';

/* harmony default export */ __webpack_exports__["a"] = (Object(react__WEBPACK_IMPORTED_MODULE_0__["createContext"])(null));


/***/ }),

/***/ "iwXC":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return eventProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return isClassName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return isFile; });
/* unused harmony export isLinkService */
/* unused harmony export isLinkTarget */
/* unused harmony export isPage */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return isPageIndex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return isPageNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return isPdf; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return isRef; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return isRenderMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return isRotate; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("17x9");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var make_event_props__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("VAed");
/* harmony import */ var _pdfjs_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("GlAO");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("N8sZ");
/* harmony import */ var _LinkService_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("l3jl");





const { PDFDataRangeTransport } = _pdfjs_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"];
const eventProps = (() => {
    const result = {};
    make_event_props__WEBPACK_IMPORTED_MODULE_1__[/* allEvents */ "a"].forEach((eventName) => {
        result[eventName] = prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func;
    });
    return result;
})();
const isTypedArray = prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([
    prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.instanceOf(Int8Array),
    prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.instanceOf(Uint8Array),
    prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.instanceOf(Uint8ClampedArray),
    prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.instanceOf(Int16Array),
    prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.instanceOf(Uint16Array),
    prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.instanceOf(Int32Array),
    prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.instanceOf(Uint32Array),
    prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.instanceOf(Float32Array),
    prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.instanceOf(Float64Array),
]);
const fileTypes = [
    prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
    prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.instanceOf(ArrayBuffer),
    prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.shape({
        data: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([
            prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
            prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.instanceOf(ArrayBuffer),
            prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number.isRequired),
            isTypedArray,
        ]).isRequired,
    }),
    prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.shape({
        range: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.instanceOf(PDFDataRangeTransport).isRequired,
    }),
    prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.shape({
        url: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string.isRequired,
    }),
];
if (typeof Blob !== 'undefined') {
    fileTypes.push(prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.instanceOf(Blob));
}
const isClassName = prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([
    prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
    prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string),
]);
const isFile = prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType(fileTypes);
const isLinkService = prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.instanceOf(_LinkService_js__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"]);
const isLinkTarget = prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOf(['_self', '_blank', '_parent', '_top']);
const isPage = prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.shape({
    commonObjs: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.shape({}).isRequired,
    getAnnotations: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
    getTextContent: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
    getViewport: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
    render: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
});
const isPageIndex = function isPageIndex(props, propName, componentName) {
    const { [propName]: pageIndex, pageNumber, pdf } = props;
    if (!Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__[/* isDefined */ "k"])(pdf)) {
        return null;
    }
    if (Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__[/* isDefined */ "k"])(pageIndex)) {
        if (typeof pageIndex !== 'number') {
            return new Error(`\`${propName}\` of type \`${typeof pageIndex}\` supplied to \`${componentName}\`, expected \`number\`.`);
        }
        if (pageIndex < 0) {
            return new Error(`Expected \`${propName}\` to be greater or equal to 0.`);
        }
        const { numPages } = pdf;
        if (pageIndex + 1 > numPages) {
            return new Error(`Expected \`${propName}\` to be less or equal to ${numPages - 1}.`);
        }
    }
    else if (!Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__[/* isDefined */ "k"])(pageNumber)) {
        return new Error(`\`${propName}\` not supplied. Either pageIndex or pageNumber must be supplied to \`${componentName}\`.`);
    }
    // Everything is fine
    return null;
};
const isPageNumber = function isPageNumber(props, propName, componentName) {
    const { [propName]: pageNumber, pageIndex, pdf } = props;
    if (!Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__[/* isDefined */ "k"])(pdf)) {
        return null;
    }
    if (Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__[/* isDefined */ "k"])(pageNumber)) {
        if (typeof pageNumber !== 'number') {
            return new Error(`\`${propName}\` of type \`${typeof pageNumber}\` supplied to \`${componentName}\`, expected \`number\`.`);
        }
        if (pageNumber < 1) {
            return new Error(`Expected \`${propName}\` to be greater or equal to 1.`);
        }
        const { numPages } = pdf;
        if (pageNumber > numPages) {
            return new Error(`Expected \`${propName}\` to be less or equal to ${numPages}.`);
        }
    }
    else if (!Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__[/* isDefined */ "k"])(pageIndex)) {
        return new Error(`\`${propName}\` not supplied. Either pageIndex or pageNumber must be supplied to \`${componentName}\`.`);
    }
    // Everything is fine
    return null;
};
const isPdf = prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([
    // Ideally, this would be `PropTypes.instanceOf(PDFDocumentProxy)`, but it can't be imported.
    prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.any,
    prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOf([false]),
]);
const isRef = prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([
    prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
    prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.exact({
        current: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.any,
    }),
]);
const isRenderMode = prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOf(['canvas', 'custom', 'none', 'svg']);
const isRotate = prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOf([0, 90, 180, 270]);


/***/ }),

/***/ "l3jl":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LinkService; });
/* harmony import */ var tiny_invariant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("9R94");
/* Copyright 2015 Mozilla Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const DEFAULT_LINK_REL = 'noopener noreferrer nofollow';
class LinkService {
    constructor() {
        this.externalLinkEnabled = true;
        this.externalLinkRel = undefined;
        this.externalLinkTarget = undefined;
        this.isInPresentationMode = false;
        this.pdfDocument = undefined;
        this.pdfViewer = undefined;
    }
    setDocument(pdfDocument) {
        this.pdfDocument = pdfDocument;
    }
    setViewer(pdfViewer) {
        this.pdfViewer = pdfViewer;
    }
    setExternalLinkRel(externalLinkRel) {
        this.externalLinkRel = externalLinkRel;
    }
    setExternalLinkTarget(externalLinkTarget) {
        this.externalLinkTarget = externalLinkTarget;
    }
    setHistory() {
        // Intentionally empty
    }
    get pagesCount() {
        return this.pdfDocument ? this.pdfDocument.numPages : 0;
    }
    get page() {
        Object(tiny_invariant__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(this.pdfViewer, 'PDF viewer is not initialized.');
        return this.pdfViewer.currentPageNumber || 0;
    }
    set page(value) {
        Object(tiny_invariant__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(this.pdfViewer, 'PDF viewer is not initialized.');
        this.pdfViewer.currentPageNumber = value;
    }
    // eslint-disable-next-line @typescript-eslint/class-literal-property-style
    get rotation() {
        return 0;
    }
    set rotation(value) {
        // Intentionally empty
    }
    goToDestination(dest) {
        return new Promise((resolve) => {
            Object(tiny_invariant__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(this.pdfDocument, 'PDF document not loaded.');
            Object(tiny_invariant__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(dest, 'Destination is not specified.');
            if (typeof dest === 'string') {
                this.pdfDocument.getDestination(dest).then(resolve);
            }
            else if (Array.isArray(dest)) {
                resolve(dest);
            }
            else {
                dest.then(resolve);
            }
        }).then((explicitDest) => {
            Object(tiny_invariant__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(Array.isArray(explicitDest), `"${explicitDest}" is not a valid destination array.`);
            const destRef = explicitDest[0];
            new Promise((resolve) => {
                Object(tiny_invariant__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(this.pdfDocument, 'PDF document not loaded.');
                if (destRef instanceof Object) {
                    this.pdfDocument
                        .getPageIndex(destRef)
                        .then((pageIndex) => {
                        resolve(pageIndex);
                    })
                        .catch(() => {
                        Object(tiny_invariant__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(false, `"${destRef}" is not a valid page reference.`);
                    });
                }
                else if (typeof destRef === 'number') {
                    resolve(destRef);
                }
                else {
                    Object(tiny_invariant__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(false, `"${destRef}" is not a valid destination reference.`);
                }
            }).then((pageIndex) => {
                const pageNumber = pageIndex + 1;
                Object(tiny_invariant__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(this.pdfViewer, 'PDF viewer is not initialized.');
                Object(tiny_invariant__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(pageNumber >= 1 && pageNumber <= this.pagesCount, `"${pageNumber}" is not a valid page number.`);
                this.pdfViewer.scrollPageIntoView({
                    dest: explicitDest,
                    pageIndex,
                    pageNumber,
                });
            });
        });
    }
    navigateTo(dest) {
        this.goToDestination(dest);
    }
    goToPage(pageNumber) {
        const pageIndex = pageNumber - 1;
        Object(tiny_invariant__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(this.pdfViewer, 'PDF viewer is not initialized.');
        Object(tiny_invariant__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(pageNumber >= 1 && pageNumber <= this.pagesCount, `"${pageNumber}" is not a valid page number.`);
        this.pdfViewer.scrollPageIntoView({
            pageIndex,
            pageNumber,
        });
    }
    addLinkAttributes(link, url, newWindow) {
        link.href = url;
        link.rel = this.externalLinkRel || DEFAULT_LINK_REL;
        link.target = newWindow ? '_blank' : this.externalLinkTarget || '';
    }
    getDestinationHash() {
        return '#';
    }
    getAnchorUrl() {
        return '#';
    }
    setHash() {
        // Intentionally empty
    }
    executeNamedAction() {
        // Intentionally empty
    }
    cachePageRef() {
        // Intentionally empty
    }
    isPageVisible() {
        return true;
    }
    isPageCached() {
        return true;
    }
    executeSetOCGState() {
        // Intentionally empty
    }
}


/***/ }),

/***/ "qWXA":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return usePageContext; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _PageContext_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("iH46");


function usePageContext() {
    return Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_PageContext_js__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"]);
}


/***/ }),

/***/ "rPSO":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return makeCancellablePromise; });
function makeCancellablePromise(promise) {
    var isCancelled = false;
    var wrappedPromise = new Promise(function (resolve, reject) {
        promise
            .then(function (value) { return !isCancelled && resolve(value); })
            .catch(function (error) { return !isCancelled && reject(error); });
    });
    return {
        promise: wrappedPromise,
        cancel: function () {
            isCancelled = true;
        },
    };
}


/***/ }),

/***/ "sZF0":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return useResolver; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function reducer(state, action) {
    switch (action.type) {
        case 'RESOLVE':
            return { value: action.value, error: undefined };
        case 'REJECT':
            return { value: false, error: action.error };
        case 'RESET':
            return { value: undefined, error: undefined };
        default:
            return state;
    }
}
function useResolver() {
    return Object(react__WEBPACK_IMPORTED_MODULE_0__["useReducer"])((reducer), { value: undefined, error: undefined });
}


/***/ }),

/***/ "z29T":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Message; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function Message({ children, type }) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: `react-pdf__message react-pdf__message--${type}` }, children);
}


/***/ })

}]);