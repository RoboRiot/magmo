_N_E =
(window["webpackJsonp_N_E"] = window["webpackJsonp_N_E"] || []).push([[34],{

/***/ "MN/I":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DisplayImage; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _context_Firebase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("NY6m");
/* harmony import */ var bootstrap_dist_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("q4sD");
/* harmony import */ var bootstrap_dist_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(bootstrap_dist_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_2__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

 // Adjust the path according to your project structure


function DisplayImage() {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null),
      imageUrl = _useState[0],
      setImageUrl = _useState[1];

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    var storage = _context_Firebase__WEBPACK_IMPORTED_MODULE_1__[/* default */ "b"].storage();
    var storageRef = storage.ref();
    var imageRef = storageRef.child("Parts/AIS01234/AIS01234.png");
    imageRef.getDownloadURL().then(function (url) {
      setImageUrl(url);
    })["catch"](function (error) {
      console.error("Error fetching the image URL:", error);
    });
  }, []);
  return __jsx("div", {
    className: "d-flex align-items-center justify-content-center",
    style: {
      minHeight: "100vh"
    }
  }, imageUrl ? __jsx("img", {
    src: imageUrl,
    alt: "AIS01234",
    className: "img-fluid"
  }) : __jsx("p", null, "Loading..."));
}

/***/ }),

/***/ "OCu6":
/***/ (function(module, exports, __webpack_require__) {


    (window.__NEXT_P = window.__NEXT_P || []).push([
      "/NewSearch/email/imageTest",
      function () {
        return __webpack_require__("MN/I");
      }
    ]);
  

/***/ }),

/***/ "Qetd":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var assign=Object.assign.bind(Object);module.exports=assign;module.exports.default=module.exports;
//# sourceMappingURL=object-assign.js.map

/***/ }),

/***/ "q4sD":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

},[["OCu6",1,0,5,3,8,4]]]);