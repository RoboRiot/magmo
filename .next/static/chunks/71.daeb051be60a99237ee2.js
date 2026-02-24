(window["webpackJsonp_N_E"] = window["webpackJsonp_N_E"] || []).push([[71],{

/***/ "baxZ":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "iawX":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_pdf__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("gr1s");
/* harmony import */ var react_pdf__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("hats");
/* harmony import */ var react_pdf_dist_esm_Page_AnnotationLayer_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("baxZ");
/* harmony import */ var react_pdf_dist_esm_Page_AnnotationLayer_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_pdf_dist_esm_Page_AnnotationLayer_css__WEBPACK_IMPORTED_MODULE_3__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;




var PdfViewer = function PdfViewer(_ref) {
  var file = _ref.file;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null),
      numPages = _useState[0],
      setNumPages = _useState[1]; // useEffect(() => {
  //   pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
  // }, []);


  function onDocumentLoadSuccess(_ref2) {
    var numPages = _ref2.numPages;
    setNumPages(numPages);
  }

  return __jsx("div", null, __jsx(react_pdf__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"], {
    file: file,
    onLoadSuccess: onDocumentLoadSuccess
  }, Array.from(new Array(numPages), function (el, index) {
    return __jsx(react_pdf__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], {
      key: "page_".concat(index + 1),
      pageNumber: index + 1
    });
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (PdfViewer);

/***/ })

}]);