webpackHotUpdate_N_E("pages/NewSearch/mainSearch",{

/***/ "./utils/PartTable.js":
/*!****************************!*\
  !*** ./utils/PartTable.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PartTable; });
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/next/node_modules/@babel/runtime/helpers/esm/toConsumableArray */ "./node_modules/next/node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var _fetchAssociations__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./fetchAssociations */ "./utils/fetchAssociations.js");
/* harmony import */ var _styles_PartTable_module_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../styles/PartTable.module.css */ "./styles/PartTable.module.css");
/* harmony import */ var _styles_PartTable_module_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_styles_PartTable_module_css__WEBPACK_IMPORTED_MODULE_4__);

var _jsxFileName = "C:\\Users\\mack2\\Desktop\\code\\utils\\PartTable.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;




function PartTable(_ref) {
  var _this = this;

  var info = _ref.info,
      labels = _ref.labels,
      ids = _ref.ids,
      hoverStyle = _ref.hoverStyle,
      sortCheckAll = _ref.sortCheckAll,
      checkDelete = _ref.checkDelete,
      isDeleting = _ref.isDeleting,
      rowSelect = _ref.rowSelect,
      setHoverIndex = _ref.setHoverIndex,
      hoverIndex = _ref.hoverIndex,
      selectedItems = _ref.selectedItems,
      setSelectedItems = _ref.setSelectedItems;

  // const [selectedItems, setSelectedItems] = useState([]);
  // Toggle selection of items
  var handleSelectItem = function handleSelectItem(id) {
    setSelectedItems(function (prevSelectedItems) {
      return prevSelectedItems.includes(id) ? prevSelectedItems.filter(function (itemId) {
        return itemId !== id;
      }) : [].concat(Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(prevSelectedItems), [id]);
    });
  }; // Handle delete button click for selected items


  var handleDeleteSelected = function handleDeleteSelected() {
    if (selectedItems.length > 0) {
      checkDelete(null, null, selectedItems, "selected items");
    }
  };

  return __jsx("div", {
    className: _styles_PartTable_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.scrollableTable,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 40,
      columnNumber: 5
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Table"], {
    striped: true,
    bordered: true,
    hover: true,
    size: "sm",
    className: "mb-0 ".concat(_styles_PartTable_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.fixedTable),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 41,
      columnNumber: 7
    }
  }, __jsx("thead", {
    className: _styles_PartTable_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.stickyHeader,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 42,
      columnNumber: 9
    }
  }, __jsx("tr", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 43,
      columnNumber: 11
    }
  }, labels.map(function (item, index) {
    return __jsx("th", {
      style: hoverStyle(index),
      onMouseOver: function onMouseOver() {
        return setHoverIndex(index);
      },
      onMouseOut: function onMouseOut() {
        return setHoverIndex(null);
      },
      onClick: function onClick() {
        return sortCheckAll(index);
      },
      key: index,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 45,
        columnNumber: 15
      }
    }, item);
  }), __jsx("th", {
    className: _styles_PartTable_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.actionCol,
    style: {
      textAlign: "center"
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55,
      columnNumber: 13
    }
  }, selectedItems.length > 0 ? __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "danger",
    onClick: handleDeleteSelected,
    disabled: isDeleting,
    size: "sm",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 57,
      columnNumber: 17
    }
  }, "Delete Selected (", selectedItems.length, ")") : "select"))), __jsx("tbody", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 71,
      columnNumber: 9
    }
  }, info.map(function (item, index) {
    return __jsx("tr", {
      key: index,
      onClick: function onClick(e) {
        // Only trigger rowSelect if the target is not a checkbox
        if (e.target.type !== "checkbox") {
          rowSelect(item);
        }
      },
      className: "clickable-row",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 73,
        columnNumber: 13
      }
    }, __jsx("td", {
      style: {
        textAlign: "center",
        cursor: "default"
      },
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 83,
        columnNumber: 15
      }
    }, __jsx("div", {
      className: _styles_PartTable_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.cellClamp,
      title: item.name,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 84,
        columnNumber: 17
      }
    }, item.name)), __jsx("td", {
      style: {
        textAlign: "center",
        cursor: "default"
      },
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 88,
        columnNumber: 15
      }
    }, __jsx("div", {
      className: _styles_PartTable_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.cellClamp,
      title: Object(_fetchAssociations__WEBPACK_IMPORTED_MODULE_3__["formatDate"])(item.date),
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 89,
        columnNumber: 17
      }
    }, Object(_fetchAssociations__WEBPACK_IMPORTED_MODULE_3__["formatDate"])(item.date))), __jsx("td", {
      style: {
        textAlign: "center",
        cursor: "default"
      },
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 93,
        columnNumber: 15
      }
    }, __jsx("div", {
      className: _styles_PartTable_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.cellClamp,
      title: item.workOrders && item.workOrders.length > 0 ? item.workOrders[item.workOrders.length - 1].workOrder : "N/A",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 94,
        columnNumber: 17
      }
    }, item.workOrders && item.workOrders.length > 0 ? item.workOrders[item.workOrders.length - 1].workOrder : "N/A")), __jsx("td", {
      style: {
        textAlign: "center",
        cursor: "default"
      },
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 107,
        columnNumber: 15
      }
    }, __jsx("div", {
      className: _styles_PartTable_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.cellClamp,
      title: item.pn,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 108,
        columnNumber: 17
      }
    }, item.pn)), __jsx("td", {
      style: {
        textAlign: "center",
        cursor: "default"
      },
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 112,
        columnNumber: 15
      }
    }, __jsx("div", {
      className: _styles_PartTable_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.cellClamp,
      title: item.sn,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 113,
        columnNumber: 17
      }
    }, item.sn)), __jsx("td", {
      className: _styles_PartTable_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.actionCol,
      style: {
        textAlign: "center"
      },
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 117,
        columnNumber: 15
      }
    }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Check, {
      type: "checkbox",
      checked: selectedItems.includes(item.id),
      onChange: function onChange(e) {
        e.stopPropagation(); // Prevent row click when checkbox is clicked
        // Toggle selection using item.id directly

        setSelectedItems(function (prevSelectedItems) {
          return prevSelectedItems.includes(item.id) ? prevSelectedItems.filter(function (id) {
            return id !== item.id;
          }) : [].concat(Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(prevSelectedItems), [item.id]);
        });
      },
      "aria-label": "Select ".concat(item.name),
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 118,
        columnNumber: 17
      }
    })));
  }), info.length < 10 && Array.from({
    length: 10 - info.length
  }).map(function (_, index) {
    return __jsx("tr", {
      key: "empty-".concat(index),
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 137,
        columnNumber: 15
      }
    }, __jsx("td", {
      colSpan: labels.length + 1,
      style: {
        textAlign: "center"
      },
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 138,
        columnNumber: 17
      }
    }, "\xA0"));
  }))));
}
_c = PartTable;

var _c;

$RefreshReg$(_c, "PartTable");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vdXRpbHMvUGFydFRhYmxlLmpzIl0sIm5hbWVzIjpbIlBhcnRUYWJsZSIsImluZm8iLCJsYWJlbHMiLCJpZHMiLCJob3ZlclN0eWxlIiwic29ydENoZWNrQWxsIiwiY2hlY2tEZWxldGUiLCJpc0RlbGV0aW5nIiwicm93U2VsZWN0Iiwic2V0SG92ZXJJbmRleCIsImhvdmVySW5kZXgiLCJzZWxlY3RlZEl0ZW1zIiwic2V0U2VsZWN0ZWRJdGVtcyIsImhhbmRsZVNlbGVjdEl0ZW0iLCJpZCIsInByZXZTZWxlY3RlZEl0ZW1zIiwiaW5jbHVkZXMiLCJmaWx0ZXIiLCJpdGVtSWQiLCJoYW5kbGVEZWxldGVTZWxlY3RlZCIsImxlbmd0aCIsInN0eWxlcyIsInNjcm9sbGFibGVUYWJsZSIsImZpeGVkVGFibGUiLCJzdGlja3lIZWFkZXIiLCJtYXAiLCJpdGVtIiwiaW5kZXgiLCJhY3Rpb25Db2wiLCJ0ZXh0QWxpZ24iLCJlIiwidGFyZ2V0IiwidHlwZSIsImN1cnNvciIsImNlbGxDbGFtcCIsIm5hbWUiLCJmb3JtYXREYXRlIiwiZGF0ZSIsIndvcmtPcmRlcnMiLCJ3b3JrT3JkZXIiLCJwbiIsInNuIiwic3RvcFByb3BhZ2F0aW9uIiwiQXJyYXkiLCJmcm9tIiwiXyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBR2UsU0FBU0EsU0FBVCxPQWFaO0FBQUE7O0FBQUEsTUFaREMsSUFZQyxRQVpEQSxJQVlDO0FBQUEsTUFYREMsTUFXQyxRQVhEQSxNQVdDO0FBQUEsTUFWREMsR0FVQyxRQVZEQSxHQVVDO0FBQUEsTUFUREMsVUFTQyxRQVREQSxVQVNDO0FBQUEsTUFSREMsWUFRQyxRQVJEQSxZQVFDO0FBQUEsTUFQREMsV0FPQyxRQVBEQSxXQU9DO0FBQUEsTUFOREMsVUFNQyxRQU5EQSxVQU1DO0FBQUEsTUFMREMsU0FLQyxRQUxEQSxTQUtDO0FBQUEsTUFKREMsYUFJQyxRQUpEQSxhQUlDO0FBQUEsTUFIREMsVUFHQyxRQUhEQSxVQUdDO0FBQUEsTUFGREMsYUFFQyxRQUZEQSxhQUVDO0FBQUEsTUFEREMsZ0JBQ0MsUUFEREEsZ0JBQ0M7O0FBQ0Q7QUFFQTtBQUNBLE1BQU1DLGdCQUFnQixHQUFHLFNBQW5CQSxnQkFBbUIsQ0FBQ0MsRUFBRCxFQUFRO0FBQy9CRixvQkFBZ0IsQ0FBQyxVQUFDRyxpQkFBRDtBQUFBLGFBQ2ZBLGlCQUFpQixDQUFDQyxRQUFsQixDQUEyQkYsRUFBM0IsSUFDSUMsaUJBQWlCLENBQUNFLE1BQWxCLENBQXlCLFVBQUNDLE1BQUQ7QUFBQSxlQUFZQSxNQUFNLEtBQUtKLEVBQXZCO0FBQUEsT0FBekIsQ0FESixtS0FFUUMsaUJBRlIsSUFFMkJELEVBRjNCLEVBRGU7QUFBQSxLQUFELENBQWhCO0FBS0QsR0FORCxDQUpDLENBWUQ7OztBQUNBLE1BQU1LLG9CQUFvQixHQUFHLFNBQXZCQSxvQkFBdUIsR0FBTTtBQUNqQyxRQUFJUixhQUFhLENBQUNTLE1BQWQsR0FBdUIsQ0FBM0IsRUFBOEI7QUFDNUJkLGlCQUFXLENBQUMsSUFBRCxFQUFPLElBQVAsRUFBYUssYUFBYixFQUE0QixnQkFBNUIsQ0FBWDtBQUNEO0FBQ0YsR0FKRDs7QUFNQSxTQUNFO0FBQUssYUFBUyxFQUFFVSxtRUFBTSxDQUFDQyxlQUF2QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0UsTUFBQyxxREFBRDtBQUFPLFdBQU8sTUFBZDtBQUFlLFlBQVEsTUFBdkI7QUFBd0IsU0FBSyxNQUE3QjtBQUE4QixRQUFJLEVBQUMsSUFBbkM7QUFBd0MsYUFBUyxpQkFBVUQsbUVBQU0sQ0FBQ0UsVUFBakIsQ0FBakQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFO0FBQU8sYUFBUyxFQUFFRixtRUFBTSxDQUFDRyxZQUF6QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNHdEIsTUFBTSxDQUFDdUIsR0FBUCxDQUFXLFVBQUNDLElBQUQsRUFBT0MsS0FBUDtBQUFBLFdBQ1Y7QUFDRSxXQUFLLEVBQUV2QixVQUFVLENBQUN1QixLQUFELENBRG5CO0FBRUUsaUJBQVcsRUFBRTtBQUFBLGVBQU1sQixhQUFhLENBQUNrQixLQUFELENBQW5CO0FBQUEsT0FGZjtBQUdFLGdCQUFVLEVBQUU7QUFBQSxlQUFNbEIsYUFBYSxDQUFDLElBQUQsQ0FBbkI7QUFBQSxPQUhkO0FBSUUsYUFBTyxFQUFFO0FBQUEsZUFBTUosWUFBWSxDQUFDc0IsS0FBRCxDQUFsQjtBQUFBLE9BSlg7QUFLRSxTQUFHLEVBQUVBLEtBTFA7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQU9HRCxJQVBILENBRFU7QUFBQSxHQUFYLENBREgsRUFZRTtBQUFJLGFBQVMsRUFBRUwsbUVBQU0sQ0FBQ08sU0FBdEI7QUFBaUMsU0FBSyxFQUFFO0FBQUVDLGVBQVMsRUFBRTtBQUFiLEtBQXhDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDR2xCLGFBQWEsQ0FBQ1MsTUFBZCxHQUF1QixDQUF2QixHQUNDLE1BQUMsc0RBQUQ7QUFDRSxXQUFPLEVBQUMsUUFEVjtBQUVFLFdBQU8sRUFBRUQsb0JBRlg7QUFHRSxZQUFRLEVBQUVaLFVBSFo7QUFJRSxRQUFJLEVBQUMsSUFKUDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDBCQU1vQkksYUFBYSxDQUFDUyxNQU5sQyxNQURELEdBVUMsUUFYSixDQVpGLENBREYsQ0FERixFQThCRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0duQixJQUFJLENBQUN3QixHQUFMLENBQVMsVUFBQ0MsSUFBRCxFQUFPQyxLQUFQO0FBQUEsV0FDUjtBQUNFLFNBQUcsRUFBRUEsS0FEUDtBQUVFLGFBQU8sRUFBRSxpQkFBQ0csQ0FBRCxFQUFPO0FBQ2Q7QUFDQSxZQUFJQSxDQUFDLENBQUNDLE1BQUYsQ0FBU0MsSUFBVCxLQUFrQixVQUF0QixFQUFrQztBQUNoQ3hCLG1CQUFTLENBQUNrQixJQUFELENBQVQ7QUFDRDtBQUNGLE9BUEg7QUFRRSxlQUFTLEVBQUMsZUFSWjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BVUU7QUFBSSxXQUFLLEVBQUU7QUFBRUcsaUJBQVMsRUFBRSxRQUFiO0FBQXVCSSxjQUFNLEVBQUU7QUFBL0IsT0FBWDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BQ0U7QUFBSyxlQUFTLEVBQUVaLG1FQUFNLENBQUNhLFNBQXZCO0FBQWtDLFdBQUssRUFBRVIsSUFBSSxDQUFDUyxJQUE5QztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BQ0dULElBQUksQ0FBQ1MsSUFEUixDQURGLENBVkYsRUFlRTtBQUFJLFdBQUssRUFBRTtBQUFFTixpQkFBUyxFQUFFLFFBQWI7QUFBdUJJLGNBQU0sRUFBRTtBQUEvQixPQUFYO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FDRTtBQUFLLGVBQVMsRUFBRVosbUVBQU0sQ0FBQ2EsU0FBdkI7QUFBa0MsV0FBSyxFQUFFRSxxRUFBVSxDQUFDVixJQUFJLENBQUNXLElBQU4sQ0FBbkQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQUNHRCxxRUFBVSxDQUFDVixJQUFJLENBQUNXLElBQU4sQ0FEYixDQURGLENBZkYsRUFvQkU7QUFBSSxXQUFLLEVBQUU7QUFBRVIsaUJBQVMsRUFBRSxRQUFiO0FBQXVCSSxjQUFNLEVBQUU7QUFBL0IsT0FBWDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BQ0U7QUFDRSxlQUFTLEVBQUVaLG1FQUFNLENBQUNhLFNBRHBCO0FBRUUsV0FBSyxFQUNIUixJQUFJLENBQUNZLFVBQUwsSUFBbUJaLElBQUksQ0FBQ1ksVUFBTCxDQUFnQmxCLE1BQWhCLEdBQXlCLENBQTVDLEdBQ0lNLElBQUksQ0FBQ1ksVUFBTCxDQUFnQlosSUFBSSxDQUFDWSxVQUFMLENBQWdCbEIsTUFBaEIsR0FBeUIsQ0FBekMsRUFBNENtQixTQURoRCxHQUVJLEtBTFI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQVFHYixJQUFJLENBQUNZLFVBQUwsSUFBbUJaLElBQUksQ0FBQ1ksVUFBTCxDQUFnQmxCLE1BQWhCLEdBQXlCLENBQTVDLEdBQ0dNLElBQUksQ0FBQ1ksVUFBTCxDQUFnQlosSUFBSSxDQUFDWSxVQUFMLENBQWdCbEIsTUFBaEIsR0FBeUIsQ0FBekMsRUFBNENtQixTQUQvQyxHQUVHLEtBVk4sQ0FERixDQXBCRixFQWtDRTtBQUFJLFdBQUssRUFBRTtBQUFFVixpQkFBUyxFQUFFLFFBQWI7QUFBdUJJLGNBQU0sRUFBRTtBQUEvQixPQUFYO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FDRTtBQUFLLGVBQVMsRUFBRVosbUVBQU0sQ0FBQ2EsU0FBdkI7QUFBa0MsV0FBSyxFQUFFUixJQUFJLENBQUNjLEVBQTlDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FDR2QsSUFBSSxDQUFDYyxFQURSLENBREYsQ0FsQ0YsRUF1Q0U7QUFBSSxXQUFLLEVBQUU7QUFBRVgsaUJBQVMsRUFBRSxRQUFiO0FBQXVCSSxjQUFNLEVBQUU7QUFBL0IsT0FBWDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BQ0U7QUFBSyxlQUFTLEVBQUVaLG1FQUFNLENBQUNhLFNBQXZCO0FBQWtDLFdBQUssRUFBRVIsSUFBSSxDQUFDZSxFQUE5QztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BQ0dmLElBQUksQ0FBQ2UsRUFEUixDQURGLENBdkNGLEVBNENFO0FBQUksZUFBUyxFQUFFcEIsbUVBQU0sQ0FBQ08sU0FBdEI7QUFBaUMsV0FBSyxFQUFFO0FBQUVDLGlCQUFTLEVBQUU7QUFBYixPQUF4QztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BQ0UsTUFBQyxvREFBRCxDQUFNLEtBQU47QUFDRSxVQUFJLEVBQUMsVUFEUDtBQUVFLGFBQU8sRUFBRWxCLGFBQWEsQ0FBQ0ssUUFBZCxDQUF1QlUsSUFBSSxDQUFDWixFQUE1QixDQUZYO0FBR0UsY0FBUSxFQUFFLGtCQUFDZ0IsQ0FBRCxFQUFPO0FBQ2ZBLFNBQUMsQ0FBQ1ksZUFBRixHQURlLENBQ007QUFDckI7O0FBQ0E5Qix3QkFBZ0IsQ0FBQyxVQUFDRyxpQkFBRDtBQUFBLGlCQUNmQSxpQkFBaUIsQ0FBQ0MsUUFBbEIsQ0FBMkJVLElBQUksQ0FBQ1osRUFBaEMsSUFDSUMsaUJBQWlCLENBQUNFLE1BQWxCLENBQXlCLFVBQUNILEVBQUQ7QUFBQSxtQkFBUUEsRUFBRSxLQUFLWSxJQUFJLENBQUNaLEVBQXBCO0FBQUEsV0FBekIsQ0FESixtS0FFUUMsaUJBRlIsSUFFMkJXLElBQUksQ0FBQ1osRUFGaEMsRUFEZTtBQUFBLFNBQUQsQ0FBaEI7QUFLRCxPQVhIO0FBWUUscUNBQXNCWSxJQUFJLENBQUNTLElBQTNCLENBWkY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQURGLENBNUNGLENBRFE7QUFBQSxHQUFULENBREgsRUFnRUdsQyxJQUFJLENBQUNtQixNQUFMLEdBQWMsRUFBZCxJQUNDdUIsS0FBSyxDQUFDQyxJQUFOLENBQVc7QUFBRXhCLFVBQU0sRUFBRSxLQUFLbkIsSUFBSSxDQUFDbUI7QUFBcEIsR0FBWCxFQUF5Q0ssR0FBekMsQ0FBNkMsVUFBQ29CLENBQUQsRUFBSWxCLEtBQUo7QUFBQSxXQUMzQztBQUFJLFNBQUcsa0JBQVdBLEtBQVgsQ0FBUDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BQ0U7QUFBSSxhQUFPLEVBQUV6QixNQUFNLENBQUNrQixNQUFQLEdBQWdCLENBQTdCO0FBQWdDLFdBQUssRUFBRTtBQUFFUyxpQkFBUyxFQUFFO0FBQWIsT0FBdkM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxjQURGLENBRDJDO0FBQUEsR0FBN0MsQ0FqRUosQ0E5QkYsQ0FERixDQURGO0FBNEdEO0tBNUl1QjdCLFMiLCJmaWxlIjoic3RhdGljL3dlYnBhY2svcGFnZXMvTmV3U2VhcmNoL21haW5TZWFyY2guNWNmMmIzOTY2NWRjNTJmNzc3MjcuaG90LXVwZGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgVGFibGUsIEJ1dHRvbiwgRm9ybSB9IGZyb20gXCJyZWFjdC1ib290c3RyYXBcIjtcbmltcG9ydCB7IGZvcm1hdERhdGUgfSBmcm9tIFwiLi9mZXRjaEFzc29jaWF0aW9uc1wiO1xuaW1wb3J0IHN0eWxlcyBmcm9tIFwiLi4vc3R5bGVzL1BhcnRUYWJsZS5tb2R1bGUuY3NzXCI7XG5cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUGFydFRhYmxlKHtcbiAgaW5mbyxcbiAgbGFiZWxzLFxuICBpZHMsXG4gIGhvdmVyU3R5bGUsXG4gIHNvcnRDaGVja0FsbCxcbiAgY2hlY2tEZWxldGUsXG4gIGlzRGVsZXRpbmcsXG4gIHJvd1NlbGVjdCxcbiAgc2V0SG92ZXJJbmRleCxcbiAgaG92ZXJJbmRleCxcbiAgc2VsZWN0ZWRJdGVtcyxcbiAgc2V0U2VsZWN0ZWRJdGVtcyxcbn0pIHtcbiAgLy8gY29uc3QgW3NlbGVjdGVkSXRlbXMsIHNldFNlbGVjdGVkSXRlbXNdID0gdXNlU3RhdGUoW10pO1xuXG4gIC8vIFRvZ2dsZSBzZWxlY3Rpb24gb2YgaXRlbXNcbiAgY29uc3QgaGFuZGxlU2VsZWN0SXRlbSA9IChpZCkgPT4ge1xuICAgIHNldFNlbGVjdGVkSXRlbXMoKHByZXZTZWxlY3RlZEl0ZW1zKSA9PlxuICAgICAgcHJldlNlbGVjdGVkSXRlbXMuaW5jbHVkZXMoaWQpXG4gICAgICAgID8gcHJldlNlbGVjdGVkSXRlbXMuZmlsdGVyKChpdGVtSWQpID0+IGl0ZW1JZCAhPT0gaWQpXG4gICAgICAgIDogWy4uLnByZXZTZWxlY3RlZEl0ZW1zLCBpZF1cbiAgICApO1xuICB9O1xuXG4gIC8vIEhhbmRsZSBkZWxldGUgYnV0dG9uIGNsaWNrIGZvciBzZWxlY3RlZCBpdGVtc1xuICBjb25zdCBoYW5kbGVEZWxldGVTZWxlY3RlZCA9ICgpID0+IHtcbiAgICBpZiAoc2VsZWN0ZWRJdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgICBjaGVja0RlbGV0ZShudWxsLCBudWxsLCBzZWxlY3RlZEl0ZW1zLCBcInNlbGVjdGVkIGl0ZW1zXCIpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuc2Nyb2xsYWJsZVRhYmxlfT5cbiAgICAgIDxUYWJsZSBzdHJpcGVkIGJvcmRlcmVkIGhvdmVyIHNpemU9XCJzbVwiIGNsYXNzTmFtZT17YG1iLTAgJHtzdHlsZXMuZml4ZWRUYWJsZX1gfT5cbiAgICAgICAgPHRoZWFkIGNsYXNzTmFtZT17c3R5bGVzLnN0aWNreUhlYWRlcn0+XG4gICAgICAgICAgPHRyPlxuICAgICAgICAgICAge2xhYmVscy5tYXAoKGl0ZW0sIGluZGV4KSA9PiAoXG4gICAgICAgICAgICAgIDx0aFxuICAgICAgICAgICAgICAgIHN0eWxlPXtob3ZlclN0eWxlKGluZGV4KX1cbiAgICAgICAgICAgICAgICBvbk1vdXNlT3Zlcj17KCkgPT4gc2V0SG92ZXJJbmRleChpbmRleCl9XG4gICAgICAgICAgICAgICAgb25Nb3VzZU91dD17KCkgPT4gc2V0SG92ZXJJbmRleChudWxsKX1cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzb3J0Q2hlY2tBbGwoaW5kZXgpfVxuICAgICAgICAgICAgICAgIGtleT17aW5kZXh9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7aXRlbX1cbiAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT17c3R5bGVzLmFjdGlvbkNvbH0gc3R5bGU9e3sgdGV4dEFsaWduOiBcImNlbnRlclwiIH19PlxuICAgICAgICAgICAgICB7c2VsZWN0ZWRJdGVtcy5sZW5ndGggPiAwID8gKFxuICAgICAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgICAgIHZhcmlhbnQ9XCJkYW5nZXJcIlxuICAgICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlRGVsZXRlU2VsZWN0ZWR9XG4gICAgICAgICAgICAgICAgICBkaXNhYmxlZD17aXNEZWxldGluZ31cbiAgICAgICAgICAgICAgICAgIHNpemU9XCJzbVwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgRGVsZXRlIFNlbGVjdGVkICh7c2VsZWN0ZWRJdGVtcy5sZW5ndGh9KVxuICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgIFwic2VsZWN0XCJcbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgPC90cj5cbiAgICAgICAgPC90aGVhZD5cbiAgICAgICAgPHRib2R5PlxuICAgICAgICAgIHtpbmZvLm1hcCgoaXRlbSwgaW5kZXgpID0+IChcbiAgICAgICAgICAgIDx0clxuICAgICAgICAgICAgICBrZXk9e2luZGV4fVxuICAgICAgICAgICAgICBvbkNsaWNrPXsoZSkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIE9ubHkgdHJpZ2dlciByb3dTZWxlY3QgaWYgdGhlIHRhcmdldCBpcyBub3QgYSBjaGVja2JveFxuICAgICAgICAgICAgICAgIGlmIChlLnRhcmdldC50eXBlICE9PSBcImNoZWNrYm94XCIpIHtcbiAgICAgICAgICAgICAgICAgIHJvd1NlbGVjdChpdGVtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImNsaWNrYWJsZS1yb3dcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgdGV4dEFsaWduOiBcImNlbnRlclwiLCBjdXJzb3I6IFwiZGVmYXVsdFwiIH19PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuY2VsbENsYW1wfSB0aXRsZT17aXRlbS5uYW1lfT5cbiAgICAgICAgICAgICAgICAgIHtpdGVtLm5hbWV9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyB0ZXh0QWxpZ246IFwiY2VudGVyXCIsIGN1cnNvcjogXCJkZWZhdWx0XCIgfX0+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5jZWxsQ2xhbXB9IHRpdGxlPXtmb3JtYXREYXRlKGl0ZW0uZGF0ZSl9PlxuICAgICAgICAgICAgICAgICAge2Zvcm1hdERhdGUoaXRlbS5kYXRlKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHRleHRBbGlnbjogXCJjZW50ZXJcIiwgY3Vyc29yOiBcImRlZmF1bHRcIiB9fT5cbiAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5jZWxsQ2xhbXB9XG4gICAgICAgICAgICAgICAgICB0aXRsZT17XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0ud29ya09yZGVycyAmJiBpdGVtLndvcmtPcmRlcnMubGVuZ3RoID4gMFxuICAgICAgICAgICAgICAgICAgICAgID8gaXRlbS53b3JrT3JkZXJzW2l0ZW0ud29ya09yZGVycy5sZW5ndGggLSAxXS53b3JrT3JkZXJcbiAgICAgICAgICAgICAgICAgICAgICA6IFwiTi9BXCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICB7aXRlbS53b3JrT3JkZXJzICYmIGl0ZW0ud29ya09yZGVycy5sZW5ndGggPiAwXG4gICAgICAgICAgICAgICAgICAgID8gaXRlbS53b3JrT3JkZXJzW2l0ZW0ud29ya09yZGVycy5sZW5ndGggLSAxXS53b3JrT3JkZXJcbiAgICAgICAgICAgICAgICAgICAgOiBcIk4vQVwifVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgdGV4dEFsaWduOiBcImNlbnRlclwiLCBjdXJzb3I6IFwiZGVmYXVsdFwiIH19PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuY2VsbENsYW1wfSB0aXRsZT17aXRlbS5wbn0+XG4gICAgICAgICAgICAgICAgICB7aXRlbS5wbn1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHRleHRBbGlnbjogXCJjZW50ZXJcIiwgY3Vyc29yOiBcImRlZmF1bHRcIiB9fT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmNlbGxDbGFtcH0gdGl0bGU9e2l0ZW0uc259PlxuICAgICAgICAgICAgICAgICAge2l0ZW0uc259XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9e3N0eWxlcy5hY3Rpb25Db2x9IHN0eWxlPXt7IHRleHRBbGlnbjogXCJjZW50ZXJcIiB9fT5cbiAgICAgICAgICAgICAgICA8Rm9ybS5DaGVja1xuICAgICAgICAgICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e3NlbGVjdGVkSXRlbXMuaW5jbHVkZXMoaXRlbS5pZCl9XG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTsgLy8gUHJldmVudCByb3cgY2xpY2sgd2hlbiBjaGVja2JveCBpcyBjbGlja2VkXG4gICAgICAgICAgICAgICAgICAgIC8vIFRvZ2dsZSBzZWxlY3Rpb24gdXNpbmcgaXRlbS5pZCBkaXJlY3RseVxuICAgICAgICAgICAgICAgICAgICBzZXRTZWxlY3RlZEl0ZW1zKChwcmV2U2VsZWN0ZWRJdGVtcykgPT5cbiAgICAgICAgICAgICAgICAgICAgICBwcmV2U2VsZWN0ZWRJdGVtcy5pbmNsdWRlcyhpdGVtLmlkKVxuICAgICAgICAgICAgICAgICAgICAgICAgPyBwcmV2U2VsZWN0ZWRJdGVtcy5maWx0ZXIoKGlkKSA9PiBpZCAhPT0gaXRlbS5pZClcbiAgICAgICAgICAgICAgICAgICAgICAgIDogWy4uLnByZXZTZWxlY3RlZEl0ZW1zLCBpdGVtLmlkXVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2BTZWxlY3QgJHtpdGVtLm5hbWV9YH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICApKX1cbiAgICAgICAgICB7aW5mby5sZW5ndGggPCAxMCAmJlxuICAgICAgICAgICAgQXJyYXkuZnJvbSh7IGxlbmd0aDogMTAgLSBpbmZvLmxlbmd0aCB9KS5tYXAoKF8sIGluZGV4KSA9PiAoXG4gICAgICAgICAgICAgIDx0ciBrZXk9e2BlbXB0eS0ke2luZGV4fWB9PlxuICAgICAgICAgICAgICAgIDx0ZCBjb2xTcGFuPXtsYWJlbHMubGVuZ3RoICsgMX0gc3R5bGU9e3sgdGV4dEFsaWduOiBcImNlbnRlclwiIH19PlxuICAgICAgICAgICAgICAgICAgJm5ic3A7XG4gICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICkpfVxuICAgICAgICA8L3Rib2R5PlxuICAgICAgPC9UYWJsZT5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=