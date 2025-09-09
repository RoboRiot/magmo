_N_E =
(window["webpackJsonp_N_E"] = window["webpackJsonp_N_E"] || []).push([[28],{

/***/ "Qbd6":
/***/ (function(module, exports, __webpack_require__) {


    (window.__NEXT_P = window.__NEXT_P || []).push([
      "/NewSearch/TestImage",
      function () {
        return __webpack_require__("c5Nh");
      }
    ]);
  

/***/ }),

/***/ "apLt":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _firebase_storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("4PwC");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _firebase_storage__WEBPACK_IMPORTED_MODULE_0__["m"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "b", function() { return _firebase_storage__WEBPACK_IMPORTED_MODULE_0__["o"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "c", function() { return _firebase_storage__WEBPACK_IMPORTED_MODULE_0__["q"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "d", function() { return _firebase_storage__WEBPACK_IMPORTED_MODULE_0__["r"]; });


//# sourceMappingURL=index.esm.js.map


/***/ }),

/***/ "c5Nh":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("vJKn");
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("rg98");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var firebase_storage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("apLt");
/* harmony import */ var _context_Firebase__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("NY6m");


var __jsx = react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement;
// TestImage.js


 // Adjust the path as needed

var getImageUrl = /*#__PURE__*/function () {
  var _ref = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(imagePath) {
    var storage, storageRef, url;
    return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            storage = Object(firebase_storage__WEBPACK_IMPORTED_MODULE_3__[/* getStorage */ "b"])(_context_Firebase__WEBPACK_IMPORTED_MODULE_4__[/* default */ "b"].app());
            storageRef = Object(firebase_storage__WEBPACK_IMPORTED_MODULE_3__[/* ref */ "d"])(storage, imagePath);
            _context.prev = 2;
            _context.next = 5;
            return Object(firebase_storage__WEBPACK_IMPORTED_MODULE_3__[/* getDownloadURL */ "a"])(storageRef);

          case 5:
            url = _context.sent;
            return _context.abrupt("return", url);

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](2);
            console.error("Error fetching image URL: ", _context.t0);
            return _context.abrupt("return", null);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 9]]);
  }));

  return function getImageUrl(_x) {
    return _ref.apply(this, arguments);
  };
}();

var ImageComponent = function ImageComponent(_ref2) {
  var imagePath = _ref2.imagePath;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])(null),
      imageUrl = _useState[0],
      setImageUrl = _useState[1];

  Object(react__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(function () {
    var fetchImageUrl = /*#__PURE__*/function () {
      var _ref3 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
        var url;
        return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return getImageUrl(imagePath);

              case 2:
                url = _context2.sent;
                setImageUrl(url);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function fetchImageUrl() {
        return _ref3.apply(this, arguments);
      };
    }();

    fetchImageUrl();
  }, [imagePath]);
  return __jsx("div", null, imageUrl ? __jsx("img", {
    src: imageUrl,
    alt: "Image"
  }) : __jsx("p", null, "Loading image..."));
};

var Page = function Page() {
  return __jsx("div", null, __jsx("h1", null, "Image from Firebase Storage"), __jsx(ImageComponent, {
    imagePath: "Parts/AIS12345/AIS12345.png"
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (Page);

/***/ }),

/***/ "rg98":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _asyncToGenerator; });
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

/***/ })

},[["Qbd6",1,0,5,3,2,4]]]);