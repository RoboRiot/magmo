webpackHotUpdate_N_E("pages/NewSearch/item/[id]",{

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
    }, item.name), __jsx("td", {
      style: {
        textAlign: "center",
        cursor: "default"
      },
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 86,
        columnNumber: 15
      }
    }, Object(_fetchAssociations__WEBPACK_IMPORTED_MODULE_3__["formatDate"])(item.date)), __jsx("td", {
      style: {
        textAlign: "center",
        cursor: "default"
      },
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 89,
        columnNumber: 15
      }
    }, item.workOrders && item.workOrders.length > 0 ? item.workOrders[item.workOrders.length - 1].workOrder : "N/A"), __jsx("td", {
      style: {
        textAlign: "center",
        cursor: "default"
      },
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 94,
        columnNumber: 15
      }
    }, item.pn), __jsx("td", {
      style: {
        textAlign: "center",
        cursor: "default"
      },
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 97,
        columnNumber: 15
      }
    }, item.sn), __jsx("td", {
      className: _styles_PartTable_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.actionCol,
      style: {
        textAlign: "center"
      },
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 100,
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
        lineNumber: 101,
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
        lineNumber: 120,
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
        lineNumber: 121,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vdXRpbHMvUGFydFRhYmxlLmpzIl0sIm5hbWVzIjpbIlBhcnRUYWJsZSIsImluZm8iLCJsYWJlbHMiLCJpZHMiLCJob3ZlclN0eWxlIiwic29ydENoZWNrQWxsIiwiY2hlY2tEZWxldGUiLCJpc0RlbGV0aW5nIiwicm93U2VsZWN0Iiwic2V0SG92ZXJJbmRleCIsImhvdmVySW5kZXgiLCJzZWxlY3RlZEl0ZW1zIiwic2V0U2VsZWN0ZWRJdGVtcyIsImhhbmRsZVNlbGVjdEl0ZW0iLCJpZCIsInByZXZTZWxlY3RlZEl0ZW1zIiwiaW5jbHVkZXMiLCJmaWx0ZXIiLCJpdGVtSWQiLCJoYW5kbGVEZWxldGVTZWxlY3RlZCIsImxlbmd0aCIsInN0eWxlcyIsInNjcm9sbGFibGVUYWJsZSIsImZpeGVkVGFibGUiLCJzdGlja3lIZWFkZXIiLCJtYXAiLCJpdGVtIiwiaW5kZXgiLCJhY3Rpb25Db2wiLCJ0ZXh0QWxpZ24iLCJlIiwidGFyZ2V0IiwidHlwZSIsImN1cnNvciIsIm5hbWUiLCJmb3JtYXREYXRlIiwiZGF0ZSIsIndvcmtPcmRlcnMiLCJ3b3JrT3JkZXIiLCJwbiIsInNuIiwic3RvcFByb3BhZ2F0aW9uIiwiQXJyYXkiLCJmcm9tIiwiXyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBR2UsU0FBU0EsU0FBVCxPQWFaO0FBQUE7O0FBQUEsTUFaREMsSUFZQyxRQVpEQSxJQVlDO0FBQUEsTUFYREMsTUFXQyxRQVhEQSxNQVdDO0FBQUEsTUFWREMsR0FVQyxRQVZEQSxHQVVDO0FBQUEsTUFUREMsVUFTQyxRQVREQSxVQVNDO0FBQUEsTUFSREMsWUFRQyxRQVJEQSxZQVFDO0FBQUEsTUFQREMsV0FPQyxRQVBEQSxXQU9DO0FBQUEsTUFOREMsVUFNQyxRQU5EQSxVQU1DO0FBQUEsTUFMREMsU0FLQyxRQUxEQSxTQUtDO0FBQUEsTUFKREMsYUFJQyxRQUpEQSxhQUlDO0FBQUEs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QUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FDRTtBQUFJLGFBQU8sRUFBRXpCLE1BQU0sQ0FBQ2tCLE1BQVAsR0FBZ0IsQ0FBN0I7QUFBZ0MsV0FBSyxFQUFFO0FBQUVTLGlCQUFTLEVBQUU7QUFBYixPQUF2QztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGNBREYsQ0FEMkM7QUFBQSxHQUE3QyxDQWhESixDQTlCRixDQURGLENBREY7QUEyRkQ7S0EzSHVCN0IsUyIsImZpbGUiOiJzdGF0aWMvd2VicGFjay9wYWdlcy9OZXdTZWFyY2gvaXRlbS9baWRdLmQ4M2E3MTVlNDhlYTkzYzM5YzQwLmhvdC11cGRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IFRhYmxlLCBCdXR0b24sIEZvcm0gfSBmcm9tIFwicmVhY3QtYm9vdHN0cmFwXCI7XG5pbXBvcnQgeyBmb3JtYXREYXRlIH0gZnJvbSBcIi4vZmV0Y2hBc3NvY2lhdGlvbnNcIjtcbmltcG9ydCBzdHlsZXMgZnJvbSBcIi4uL3N0eWxlcy9QYXJ0VGFibGUubW9kdWxlLmNzc1wiO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFBhcnRUYWJsZSh7XG4gIGluZm8sXG4gIGxhYmVscyxcbiAgaWRzLFxuICBob3ZlclN0eWxlLFxuICBzb3J0Q2hlY2tBbGwsXG4gIGNoZWNrRGVsZXRlLFxuICBpc0RlbGV0aW5nLFxuICByb3dTZWxlY3QsXG4gIHNldEhvdmVySW5kZXgsXG4gIGhvdmVySW5kZXgsXG4gIHNlbGVjdGVkSXRlbXMsXG4gIHNldFNlbGVjdGVkSXRlbXMsXG59KSB7XG4gIC8vIGNvbnN0IFtzZWxlY3RlZEl0ZW1zLCBzZXRTZWxlY3RlZEl0ZW1zXSA9IHVzZVN0YXRlKFtdKTtcblxuICAvLyBUb2dnbGUgc2VsZWN0aW9uIG9mIGl0ZW1zXG4gIGNvbnN0IGhhbmRsZVNlbGVjdEl0ZW0gPSAoaWQpID0+IHtcbiAgICBzZXRTZWxlY3RlZEl0ZW1zKChwcmV2U2VsZWN0ZWRJdGVtcykgPT5cbiAgICAgIHByZXZTZWxlY3RlZEl0ZW1zLmluY2x1ZGVzKGlkKVxuICAgICAgICA/IHByZXZTZWxlY3RlZEl0ZW1zLmZpbHRlcigoaXRlbUlkKSA9PiBpdGVtSWQgIT09IGlkKVxuICAgICAgICA6IFsuLi5wcmV2U2VsZWN0ZWRJdGVtcywgaWRdXG4gICAgKTtcbiAgfTtcblxuICAvLyBIYW5kbGUgZGVsZXRlIGJ1dHRvbiBjbGljayBmb3Igc2VsZWN0ZWQgaXRlbXNcbiAgY29uc3QgaGFuZGxlRGVsZXRlU2VsZWN0ZWQgPSAoKSA9PiB7XG4gICAgaWYgKHNlbGVjdGVkSXRlbXMubGVuZ3RoID4gMCkge1xuICAgICAgY2hlY2tEZWxldGUobnVsbCwgbnVsbCwgc2VsZWN0ZWRJdGVtcywgXCJzZWxlY3RlZCBpdGVtc1wiKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnNjcm9sbGFibGVUYWJsZX0+XG4gICAgICA8VGFibGUgc3RyaXBlZCBib3JkZXJlZCBob3ZlciBzaXplPVwic21cIiBjbGFzc05hbWU9e2BtYi0wICR7c3R5bGVzLmZpeGVkVGFibGV9YH0+XG4gICAgICAgIDx0aGVhZCBjbGFzc05hbWU9e3N0eWxlcy5zdGlja3lIZWFkZXJ9PlxuICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgIHtsYWJlbHMubWFwKChpdGVtLCBpbmRleCkgPT4gKFxuICAgICAgICAgICAgICA8dGhcbiAgICAgICAgICAgICAgICBzdHlsZT17aG92ZXJTdHlsZShpbmRleCl9XG4gICAgICAgICAgICAgICAgb25Nb3VzZU92ZXI9eygpID0+IHNldEhvdmVySW5kZXgoaW5kZXgpfVxuICAgICAgICAgICAgICAgIG9uTW91c2VPdXQ9eygpID0+IHNldEhvdmVySW5kZXgobnVsbCl9XG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc29ydENoZWNrQWxsKGluZGV4KX1cbiAgICAgICAgICAgICAgICBrZXk9e2luZGV4fVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge2l0ZW19XG4gICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9e3N0eWxlcy5hY3Rpb25Db2x9IHN0eWxlPXt7IHRleHRBbGlnbjogXCJjZW50ZXJcIiB9fT5cbiAgICAgICAgICAgICAge3NlbGVjdGVkSXRlbXMubGVuZ3RoID4gMCA/IChcbiAgICAgICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgICAgICB2YXJpYW50PVwiZGFuZ2VyXCJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZURlbGV0ZVNlbGVjdGVkfVxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2lzRGVsZXRpbmd9XG4gICAgICAgICAgICAgICAgICBzaXplPVwic21cIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIERlbGV0ZSBTZWxlY3RlZCAoe3NlbGVjdGVkSXRlbXMubGVuZ3RofSlcbiAgICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICBcInNlbGVjdFwiXG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L3RoPlxuICAgICAgICAgIDwvdHI+XG4gICAgICAgIDwvdGhlYWQ+XG4gICAgICAgIDx0Ym9keT5cbiAgICAgICAgICB7aW5mby5tYXAoKGl0ZW0sIGluZGV4KSA9PiAoXG4gICAgICAgICAgICA8dHJcbiAgICAgICAgICAgICAga2V5PXtpbmRleH1cbiAgICAgICAgICAgICAgb25DbGljaz17KGUpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBPbmx5IHRyaWdnZXIgcm93U2VsZWN0IGlmIHRoZSB0YXJnZXQgaXMgbm90IGEgY2hlY2tib3hcbiAgICAgICAgICAgICAgICBpZiAoZS50YXJnZXQudHlwZSAhPT0gXCJjaGVja2JveFwiKSB7XG4gICAgICAgICAgICAgICAgICByb3dTZWxlY3QoaXRlbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJjbGlja2FibGUtcm93XCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHRleHRBbGlnbjogXCJjZW50ZXJcIiwgY3Vyc29yOiBcImRlZmF1bHRcIiB9fT5cbiAgICAgICAgICAgICAgICB7aXRlbS5uYW1lfVxuICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgdGV4dEFsaWduOiBcImNlbnRlclwiLCBjdXJzb3I6IFwiZGVmYXVsdFwiIH19PlxuICAgICAgICAgICAgICAgIHtmb3JtYXREYXRlKGl0ZW0uZGF0ZSl9XG4gICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyB0ZXh0QWxpZ246IFwiY2VudGVyXCIsIGN1cnNvcjogXCJkZWZhdWx0XCIgfX0+XG4gICAgICAgICAgICAgICAge2l0ZW0ud29ya09yZGVycyAmJiBpdGVtLndvcmtPcmRlcnMubGVuZ3RoID4gMFxuICAgICAgICAgICAgICAgICAgPyBpdGVtLndvcmtPcmRlcnNbaXRlbS53b3JrT3JkZXJzLmxlbmd0aCAtIDFdLndvcmtPcmRlclxuICAgICAgICAgICAgICAgICAgOiBcIk4vQVwifVxuICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgdGV4dEFsaWduOiBcImNlbnRlclwiLCBjdXJzb3I6IFwiZGVmYXVsdFwiIH19PlxuICAgICAgICAgICAgICAgIHtpdGVtLnBufVxuICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgdGV4dEFsaWduOiBcImNlbnRlclwiLCBjdXJzb3I6IFwiZGVmYXVsdFwiIH19PlxuICAgICAgICAgICAgICAgIHtpdGVtLnNufVxuICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPXtzdHlsZXMuYWN0aW9uQ29sfSBzdHlsZT17eyB0ZXh0QWxpZ246IFwiY2VudGVyXCIgfX0+XG4gICAgICAgICAgICAgICAgPEZvcm0uQ2hlY2tcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgICAgICAgICBjaGVja2VkPXtzZWxlY3RlZEl0ZW1zLmluY2x1ZGVzKGl0ZW0uaWQpfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7IC8vIFByZXZlbnQgcm93IGNsaWNrIHdoZW4gY2hlY2tib3ggaXMgY2xpY2tlZFxuICAgICAgICAgICAgICAgICAgICAvLyBUb2dnbGUgc2VsZWN0aW9uIHVzaW5nIGl0ZW0uaWQgZGlyZWN0bHlcbiAgICAgICAgICAgICAgICAgICAgc2V0U2VsZWN0ZWRJdGVtcygocHJldlNlbGVjdGVkSXRlbXMpID0+XG4gICAgICAgICAgICAgICAgICAgICAgcHJldlNlbGVjdGVkSXRlbXMuaW5jbHVkZXMoaXRlbS5pZClcbiAgICAgICAgICAgICAgICAgICAgICAgID8gcHJldlNlbGVjdGVkSXRlbXMuZmlsdGVyKChpZCkgPT4gaWQgIT09IGl0ZW0uaWQpXG4gICAgICAgICAgICAgICAgICAgICAgICA6IFsuLi5wcmV2U2VsZWN0ZWRJdGVtcywgaXRlbS5pZF1cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtgU2VsZWN0ICR7aXRlbS5uYW1lfWB9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgKSl9XG4gICAgICAgICAge2luZm8ubGVuZ3RoIDwgMTAgJiZcbiAgICAgICAgICAgIEFycmF5LmZyb20oeyBsZW5ndGg6IDEwIC0gaW5mby5sZW5ndGggfSkubWFwKChfLCBpbmRleCkgPT4gKFxuICAgICAgICAgICAgICA8dHIga2V5PXtgZW1wdHktJHtpbmRleH1gfT5cbiAgICAgICAgICAgICAgICA8dGQgY29sU3Bhbj17bGFiZWxzLmxlbmd0aCArIDF9IHN0eWxlPXt7IHRleHRBbGlnbjogXCJjZW50ZXJcIiB9fT5cbiAgICAgICAgICAgICAgICAgICZuYnNwO1xuICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgPC90Ym9keT5cbiAgICAgIDwvVGFibGU+XG4gICAgPC9kaXY+XG4gICk7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9