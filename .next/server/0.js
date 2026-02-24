exports.ids = [0];
exports.modules = {

/***/ "3w+H":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "requireFirebaseAuth", function() { return requireFirebaseAuth; });
/* harmony import */ var firebase_admin_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("txAr");
/* harmony import */ var firebase_admin_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(firebase_admin_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var firebase_admin_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("HCCP");
/* harmony import */ var firebase_admin_auth__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(firebase_admin_auth__WEBPACK_IMPORTED_MODULE_1__);


const isProduction = true;
async function requireFirebaseAuth(req, res) {
  var _req$headers;

  const header = ((_req$headers = req.headers) === null || _req$headers === void 0 ? void 0 : _req$headers.authorization) || "";
  const match = header.match(/^Bearer\s+(.+)$/i);
  const token = match === null || match === void 0 ? void 0 : match[1];

  if (!token) {
    if (isProduction) {
      res.status(401).json({
        error: "Missing auth token."
      });
      return null;
    }

    return null;
  }

  try {
    if (!Object(firebase_admin_app__WEBPACK_IMPORTED_MODULE_0__["getApps"])().length) {
      if (isProduction) {
        res.status(503).json({
          error: "Firebase Admin not available."
        });
        return null;
      }

      return null;
    }

    const decoded = await Object(firebase_admin_auth__WEBPACK_IMPORTED_MODULE_1__["getAuth"])().verifyIdToken(token);
    return decoded;
  } catch (error) {
    if (isProduction) {
      res.status(401).json({
        error: "Invalid auth token."
      });
      return null;
    }

    return null;
  }
}

/***/ })

};;