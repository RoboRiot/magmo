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
    className: "mb-0",
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vdXRpbHMvUGFydFRhYmxlLmpzIl0sIm5hbWVzIjpbIlBhcnRUYWJsZSIsImluZm8iLCJsYWJlbHMiLCJpZHMiLCJob3ZlclN0eWxlIiwic29ydENoZWNrQWxsIiwiY2hlY2tEZWxldGUiLCJpc0RlbGV0aW5nIiwicm93U2VsZWN0Iiwic2V0SG92ZXJJbmRleCIsImhvdmVySW5kZXgiLCJzZWxlY3RlZEl0ZW1zIiwic2V0U2VsZWN0ZWRJdGVtcyIsImhhbmRsZVNlbGVjdEl0ZW0iLCJpZCIsInByZXZTZWxlY3RlZEl0ZW1zIiwiaW5jbHVkZXMiLCJmaWx0ZXIiLCJpdGVtSWQiLCJoYW5kbGVEZWxldGVTZWxlY3RlZCIsImxlbmd0aCIsInN0eWxlcyIsInNjcm9sbGFibGVUYWJsZSIsInN0aWNreUhlYWRlciIsIm1hcCIsIml0ZW0iLCJpbmRleCIsInRleHRBbGlnbiIsImUiLCJ0YXJnZXQiLCJ0eXBlIiwiY3Vyc29yIiwibmFtZSIsImZvcm1hdERhdGUiLCJkYXRlIiwid29ya09yZGVycyIsIndvcmtPcmRlciIsInBuIiwic24iLCJzdG9wUHJvcGFnYXRpb24iLCJBcnJheSIsImZyb20iLCJfIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFHZSxTQUFTQSxTQUFULE9BYVo7QUFBQTs7QUFBQSxNQVpEQyxJQVlDLFFBWkRBLElBWUM7QUFBQSxNQVhEQyxNQVdDLFFBWERBLE1BV0M7QUFBQSxNQVZEQyxHQVVDLFFBVkRBLEdBVUM7QUFBQSxNQVREQyxVQVNDLFFBVERBLFVBU0M7QUFBQSxNQVJEQyxZQVFDLFFBUkRBLFlBUUM7QUFBQSxNQVBEQyxXQU9DLFFBUERBLFdBT0M7QUFBQSxNQU5EQyxVQU1DLFFBTkRBLFVBTUM7QUFBQSxNQUxEQyxTQUtDLFFBTERBLFNBS0M7QUFBQSxNQUpEQyxhQUlDLFFBSkRBLGFBSUM7QUFBQSxNQUhEQyxVQUdDLFFBSERBLFVBR0M7QUFB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QUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsY0FERixDQUQyQztBQUFBLEdBQTdDLENBaERKLENBOUJGLENBREYsQ0FERjtBQTJGRDtLQTNIdUIzQixTIiwiZmlsZSI6InN0YXRpYy93ZWJwYWNrL3BhZ2VzL05ld1NlYXJjaC9tYWluU2VhcmNoLjllNjNlMmU3NWRiYzg3ZmZhMzEzLmhvdC11cGRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IFRhYmxlLCBCdXR0b24sIEZvcm0gfSBmcm9tIFwicmVhY3QtYm9vdHN0cmFwXCI7XG5pbXBvcnQgeyBmb3JtYXREYXRlIH0gZnJvbSBcIi4vZmV0Y2hBc3NvY2lhdGlvbnNcIjtcbmltcG9ydCBzdHlsZXMgZnJvbSBcIi4uL3N0eWxlcy9QYXJ0VGFibGUubW9kdWxlLmNzc1wiO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFBhcnRUYWJsZSh7XG4gIGluZm8sXG4gIGxhYmVscyxcbiAgaWRzLFxuICBob3ZlclN0eWxlLFxuICBzb3J0Q2hlY2tBbGwsXG4gIGNoZWNrRGVsZXRlLFxuICBpc0RlbGV0aW5nLFxuICByb3dTZWxlY3QsXG4gIHNldEhvdmVySW5kZXgsXG4gIGhvdmVySW5kZXgsXG4gIHNlbGVjdGVkSXRlbXMsXG4gIHNldFNlbGVjdGVkSXRlbXMsXG59KSB7XG4gIC8vIGNvbnN0IFtzZWxlY3RlZEl0ZW1zLCBzZXRTZWxlY3RlZEl0ZW1zXSA9IHVzZVN0YXRlKFtdKTtcblxuICAvLyBUb2dnbGUgc2VsZWN0aW9uIG9mIGl0ZW1zXG4gIGNvbnN0IGhhbmRsZVNlbGVjdEl0ZW0gPSAoaWQpID0+IHtcbiAgICBzZXRTZWxlY3RlZEl0ZW1zKChwcmV2U2VsZWN0ZWRJdGVtcykgPT5cbiAgICAgIHByZXZTZWxlY3RlZEl0ZW1zLmluY2x1ZGVzKGlkKVxuICAgICAgICA/IHByZXZTZWxlY3RlZEl0ZW1zLmZpbHRlcigoaXRlbUlkKSA9PiBpdGVtSWQgIT09IGlkKVxuICAgICAgICA6IFsuLi5wcmV2U2VsZWN0ZWRJdGVtcywgaWRdXG4gICAgKTtcbiAgfTtcblxuICAvLyBIYW5kbGUgZGVsZXRlIGJ1dHRvbiBjbGljayBmb3Igc2VsZWN0ZWQgaXRlbXNcbiAgY29uc3QgaGFuZGxlRGVsZXRlU2VsZWN0ZWQgPSAoKSA9PiB7XG4gICAgaWYgKHNlbGVjdGVkSXRlbXMubGVuZ3RoID4gMCkge1xuICAgICAgY2hlY2tEZWxldGUobnVsbCwgbnVsbCwgc2VsZWN0ZWRJdGVtcywgXCJzZWxlY3RlZCBpdGVtc1wiKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnNjcm9sbGFibGVUYWJsZX0+XG4gICAgICA8VGFibGUgc3RyaXBlZCBib3JkZXJlZCBob3ZlciBzaXplPVwic21cIiBjbGFzc05hbWU9XCJtYi0wXCI+XG4gICAgICAgIDx0aGVhZCBjbGFzc05hbWU9e3N0eWxlcy5zdGlja3lIZWFkZXJ9PlxuICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgIHtsYWJlbHMubWFwKChpdGVtLCBpbmRleCkgPT4gKFxuICAgICAgICAgICAgICA8dGhcbiAgICAgICAgICAgICAgICBzdHlsZT17aG92ZXJTdHlsZShpbmRleCl9XG4gICAgICAgICAgICAgICAgb25Nb3VzZU92ZXI9eygpID0+IHNldEhvdmVySW5kZXgoaW5kZXgpfVxuICAgICAgICAgICAgICAgIG9uTW91c2VPdXQ9eygpID0+IHNldEhvdmVySW5kZXgobnVsbCl9XG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc29ydENoZWNrQWxsKGluZGV4KX1cbiAgICAgICAgICAgICAgICBrZXk9e2luZGV4fVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge2l0ZW19XG4gICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDx0aCBzdHlsZT17eyB0ZXh0QWxpZ246IFwiY2VudGVyXCIgfX0+XG4gICAgICAgICAgICAgIHtzZWxlY3RlZEl0ZW1zLmxlbmd0aCA+IDAgPyAoXG4gICAgICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICAgICAgdmFyaWFudD1cImRhbmdlclwiXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVEZWxldGVTZWxlY3RlZH1cbiAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtpc0RlbGV0aW5nfVxuICAgICAgICAgICAgICAgICAgc2l6ZT1cInNtXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICBEZWxldGUgU2VsZWN0ZWQgKHtzZWxlY3RlZEl0ZW1zLmxlbmd0aH0pXG4gICAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgXCJzZWxlY3RcIlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICA8L3RyPlxuICAgICAgICA8L3RoZWFkPlxuICAgICAgICA8dGJvZHk+XG4gICAgICAgICAge2luZm8ubWFwKChpdGVtLCBpbmRleCkgPT4gKFxuICAgICAgICAgICAgPHRyXG4gICAgICAgICAgICAgIGtleT17aW5kZXh9XG4gICAgICAgICAgICAgIG9uQ2xpY2s9eyhlKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gT25seSB0cmlnZ2VyIHJvd1NlbGVjdCBpZiB0aGUgdGFyZ2V0IGlzIG5vdCBhIGNoZWNrYm94XG4gICAgICAgICAgICAgICAgaWYgKGUudGFyZ2V0LnR5cGUgIT09IFwiY2hlY2tib3hcIikge1xuICAgICAgICAgICAgICAgICAgcm93U2VsZWN0KGl0ZW0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiY2xpY2thYmxlLXJvd1wiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyB0ZXh0QWxpZ246IFwiY2VudGVyXCIsIGN1cnNvcjogXCJkZWZhdWx0XCIgfX0+XG4gICAgICAgICAgICAgICAge2l0ZW0ubmFtZX1cbiAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHRleHRBbGlnbjogXCJjZW50ZXJcIiwgY3Vyc29yOiBcImRlZmF1bHRcIiB9fT5cbiAgICAgICAgICAgICAgICB7Zm9ybWF0RGF0ZShpdGVtLmRhdGUpfVxuICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgdGV4dEFsaWduOiBcImNlbnRlclwiLCBjdXJzb3I6IFwiZGVmYXVsdFwiIH19PlxuICAgICAgICAgICAgICAgIHtpdGVtLndvcmtPcmRlcnMgJiYgaXRlbS53b3JrT3JkZXJzLmxlbmd0aCA+IDBcbiAgICAgICAgICAgICAgICAgID8gaXRlbS53b3JrT3JkZXJzW2l0ZW0ud29ya09yZGVycy5sZW5ndGggLSAxXS53b3JrT3JkZXJcbiAgICAgICAgICAgICAgICAgIDogXCJOL0FcIn1cbiAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHRleHRBbGlnbjogXCJjZW50ZXJcIiwgY3Vyc29yOiBcImRlZmF1bHRcIiB9fT5cbiAgICAgICAgICAgICAgICB7aXRlbS5wbn1cbiAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHRleHRBbGlnbjogXCJjZW50ZXJcIiwgY3Vyc29yOiBcImRlZmF1bHRcIiB9fT5cbiAgICAgICAgICAgICAgICB7aXRlbS5zbn1cbiAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHRleHRBbGlnbjogXCJjZW50ZXJcIiB9fT5cbiAgICAgICAgICAgICAgICA8Rm9ybS5DaGVja1xuICAgICAgICAgICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e3NlbGVjdGVkSXRlbXMuaW5jbHVkZXMoaXRlbS5pZCl9XG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTsgLy8gUHJldmVudCByb3cgY2xpY2sgd2hlbiBjaGVja2JveCBpcyBjbGlja2VkXG4gICAgICAgICAgICAgICAgICAgIC8vIFRvZ2dsZSBzZWxlY3Rpb24gdXNpbmcgaXRlbS5pZCBkaXJlY3RseVxuICAgICAgICAgICAgICAgICAgICBzZXRTZWxlY3RlZEl0ZW1zKChwcmV2U2VsZWN0ZWRJdGVtcykgPT5cbiAgICAgICAgICAgICAgICAgICAgICBwcmV2U2VsZWN0ZWRJdGVtcy5pbmNsdWRlcyhpdGVtLmlkKVxuICAgICAgICAgICAgICAgICAgICAgICAgPyBwcmV2U2VsZWN0ZWRJdGVtcy5maWx0ZXIoKGlkKSA9PiBpZCAhPT0gaXRlbS5pZClcbiAgICAgICAgICAgICAgICAgICAgICAgIDogWy4uLnByZXZTZWxlY3RlZEl0ZW1zLCBpdGVtLmlkXVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2BTZWxlY3QgJHtpdGVtLm5hbWV9YH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICApKX1cbiAgICAgICAgICB7aW5mby5sZW5ndGggPCAxMCAmJlxuICAgICAgICAgICAgQXJyYXkuZnJvbSh7IGxlbmd0aDogMTAgLSBpbmZvLmxlbmd0aCB9KS5tYXAoKF8sIGluZGV4KSA9PiAoXG4gICAgICAgICAgICAgIDx0ciBrZXk9e2BlbXB0eS0ke2luZGV4fWB9PlxuICAgICAgICAgICAgICAgIDx0ZCBjb2xTcGFuPXtsYWJlbHMubGVuZ3RoICsgMX0gc3R5bGU9e3sgdGV4dEFsaWduOiBcImNlbnRlclwiIH19PlxuICAgICAgICAgICAgICAgICAgJm5ic3A7XG4gICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICkpfVxuICAgICAgICA8L3Rib2R5PlxuICAgICAgPC9UYWJsZT5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=