exports.ids = [44];
exports.modules = {

/***/ "baxZ":
/***/ (function(module, exports) {



/***/ }),

/***/ "iawX":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_pdf__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("ZKom");
/* harmony import */ var react_pdf__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_pdf__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_pdf_dist_esm_Page_AnnotationLayer_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("baxZ");
/* harmony import */ var react_pdf_dist_esm_Page_AnnotationLayer_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_pdf_dist_esm_Page_AnnotationLayer_css__WEBPACK_IMPORTED_MODULE_2__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;




const PdfViewer = ({
  file
}) => {
  const {
    0: numPages,
    1: setNumPages
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null); // useEffect(() => {
  //   pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
  // }, []);

  function onDocumentLoadSuccess({
    numPages
  }) {
    setNumPages(numPages);
  }

  return __jsx("div", null, __jsx(react_pdf__WEBPACK_IMPORTED_MODULE_1__["Document"], {
    file: file,
    onLoadSuccess: onDocumentLoadSuccess
  }, Array.from(new Array(numPages), (el, index) => __jsx(react_pdf__WEBPACK_IMPORTED_MODULE_1__["Page"], {
    key: `page_${index + 1}`,
    pageNumber: index + 1
  }))));
};

/* harmony default export */ __webpack_exports__["default"] = (PdfViewer);

/***/ })

};;