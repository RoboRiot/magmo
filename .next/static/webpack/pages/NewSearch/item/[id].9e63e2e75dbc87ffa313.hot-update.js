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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vdXRpbHMvUGFydFRhYmxlLmpzIl0sIm5hbWVzIjpbIlBhcnRUYWJsZSIsImluZm8iLCJsYWJlbHMiLCJpZHMiLCJob3ZlclN0eWxlIiwic29ydENoZWNrQWxsIiwiY2hlY2tEZWxldGUiLCJpc0RlbGV0aW5nIiwicm93U2VsZWN0Iiwic2V0SG92ZXJJbmRleCIsImhvdmVySW5kZXgiLCJzZWxlY3RlZEl0ZW1zIiwic2V0U2VsZWN0ZWRJdGVtcyIsImhhbmRsZVNlbGVjdEl0ZW0iLCJpZCIsInByZXZTZWxlY3RlZEl0ZW1zIiwiaW5jbHVkZXMiLCJmaWx0ZXIiLCJpdGVtSWQiLCJoYW5kbGVEZWxldGVTZWxlY3RlZCIsImxlbmd0aCIsInN0eWxlcyIsInNjcm9sbGFibGVUYWJsZSIsInN0aWNreUhlYWRlciIsIm1hcCIsIml0ZW0iLCJpbmRleCIsInRleHRBbGlnbiIsImUiLCJ0YXJnZXQiLCJ0eXBlIiwiY3Vyc29yIiwibmFtZSIsImZvcm1hdERhdGUiLCJkYXRlIiwid29ya09yZGVycyIsIndvcmtPcmRlciIsInBuIiwic24iLCJzdG9wUHJvcGFnYXRpb24iLCJBcnJheSIsImZyb20iLCJfIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFHZSxTQUFTQSxTQUFULE9BYVo7QUFBQTs7QUFBQSxNQVpEQyxJQVlDLFFBWkRBLElBWUM7QUFBQSxNQVhEQyxNQVdDLFFBWERBLE1BV0M7QUFBQSxNQVZEQyxHQVVDLFFBVkRBLEdBVUM7QUFBQSxNQVREQyxVQVNDLFFBVERBLFVBU0M7QUFBQSxNQVJEQyxZQVFDLFFBUkRBLFlBUUM7QUFBQSxNQVBEQyxXQU9DLFFBUERBLFdBT0M7QUFBQSxNQU5EQyxVQU1DLFFBTkRBLFVBTUM7QUFBQSxNQUxEQyxTQUtDLFFBTERBLFNBS0M7QUFBQSxNQUpEQyxhQUlDLFFBSkRBLGFBSUM7QUFBQSxNQUhEQyxVQUdDLFFBSERBLFVBR0M7QUFB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QUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsY0FERixDQUQyQztBQUFBLEdBQTdDLENBaERKLENBOUJGLENBREYsQ0FERjtBQTJGRDtLQTNIdUIzQixTIiwiZmlsZSI6InN0YXRpYy93ZWJwYWNrL3BhZ2VzL05ld1NlYXJjaC9pdGVtL1tpZF0uOWU2M2UyZTc1ZGJjODdmZmEzMTMuaG90LXVwZGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgVGFibGUsIEJ1dHRvbiwgRm9ybSB9IGZyb20gXCJyZWFjdC1ib290c3RyYXBcIjtcbmltcG9ydCB7IGZvcm1hdERhdGUgfSBmcm9tIFwiLi9mZXRjaEFzc29jaWF0aW9uc1wiO1xuaW1wb3J0IHN0eWxlcyBmcm9tIFwiLi4vc3R5bGVzL1BhcnRUYWJsZS5tb2R1bGUuY3NzXCI7XG5cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUGFydFRhYmxlKHtcbiAgaW5mbyxcbiAgbGFiZWxzLFxuICBpZHMsXG4gIGhvdmVyU3R5bGUsXG4gIHNvcnRDaGVja0FsbCxcbiAgY2hlY2tEZWxldGUsXG4gIGlzRGVsZXRpbmcsXG4gIHJvd1NlbGVjdCxcbiAgc2V0SG92ZXJJbmRleCxcbiAgaG92ZXJJbmRleCxcbiAgc2VsZWN0ZWRJdGVtcyxcbiAgc2V0U2VsZWN0ZWRJdGVtcyxcbn0pIHtcbiAgLy8gY29uc3QgW3NlbGVjdGVkSXRlbXMsIHNldFNlbGVjdGVkSXRlbXNdID0gdXNlU3RhdGUoW10pO1xuXG4gIC8vIFRvZ2dsZSBzZWxlY3Rpb24gb2YgaXRlbXNcbiAgY29uc3QgaGFuZGxlU2VsZWN0SXRlbSA9IChpZCkgPT4ge1xuICAgIHNldFNlbGVjdGVkSXRlbXMoKHByZXZTZWxlY3RlZEl0ZW1zKSA9PlxuICAgICAgcHJldlNlbGVjdGVkSXRlbXMuaW5jbHVkZXMoaWQpXG4gICAgICAgID8gcHJldlNlbGVjdGVkSXRlbXMuZmlsdGVyKChpdGVtSWQpID0+IGl0ZW1JZCAhPT0gaWQpXG4gICAgICAgIDogWy4uLnByZXZTZWxlY3RlZEl0ZW1zLCBpZF1cbiAgICApO1xuICB9O1xuXG4gIC8vIEhhbmRsZSBkZWxldGUgYnV0dG9uIGNsaWNrIGZvciBzZWxlY3RlZCBpdGVtc1xuICBjb25zdCBoYW5kbGVEZWxldGVTZWxlY3RlZCA9ICgpID0+IHtcbiAgICBpZiAoc2VsZWN0ZWRJdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgICBjaGVja0RlbGV0ZShudWxsLCBudWxsLCBzZWxlY3RlZEl0ZW1zLCBcInNlbGVjdGVkIGl0ZW1zXCIpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuc2Nyb2xsYWJsZVRhYmxlfT5cbiAgICAgIDxUYWJsZSBzdHJpcGVkIGJvcmRlcmVkIGhvdmVyIHNpemU9XCJzbVwiIGNsYXNzTmFtZT1cIm1iLTBcIj5cbiAgICAgICAgPHRoZWFkIGNsYXNzTmFtZT17c3R5bGVzLnN0aWNreUhlYWRlcn0+XG4gICAgICAgICAgPHRyPlxuICAgICAgICAgICAge2xhYmVscy5tYXAoKGl0ZW0sIGluZGV4KSA9PiAoXG4gICAgICAgICAgICAgIDx0aFxuICAgICAgICAgICAgICAgIHN0eWxlPXtob3ZlclN0eWxlKGluZGV4KX1cbiAgICAgICAgICAgICAgICBvbk1vdXNlT3Zlcj17KCkgPT4gc2V0SG92ZXJJbmRleChpbmRleCl9XG4gICAgICAgICAgICAgICAgb25Nb3VzZU91dD17KCkgPT4gc2V0SG92ZXJJbmRleChudWxsKX1cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzb3J0Q2hlY2tBbGwoaW5kZXgpfVxuICAgICAgICAgICAgICAgIGtleT17aW5kZXh9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7aXRlbX1cbiAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPHRoIHN0eWxlPXt7IHRleHRBbGlnbjogXCJjZW50ZXJcIiB9fT5cbiAgICAgICAgICAgICAge3NlbGVjdGVkSXRlbXMubGVuZ3RoID4gMCA/IChcbiAgICAgICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgICAgICB2YXJpYW50PVwiZGFuZ2VyXCJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZURlbGV0ZVNlbGVjdGVkfVxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2lzRGVsZXRpbmd9XG4gICAgICAgICAgICAgICAgICBzaXplPVwic21cIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIERlbGV0ZSBTZWxlY3RlZCAoe3NlbGVjdGVkSXRlbXMubGVuZ3RofSlcbiAgICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICBcInNlbGVjdFwiXG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L3RoPlxuICAgICAgICAgIDwvdHI+XG4gICAgICAgIDwvdGhlYWQ+XG4gICAgICAgIDx0Ym9keT5cbiAgICAgICAgICB7aW5mby5tYXAoKGl0ZW0sIGluZGV4KSA9PiAoXG4gICAgICAgICAgICA8dHJcbiAgICAgICAgICAgICAga2V5PXtpbmRleH1cbiAgICAgICAgICAgICAgb25DbGljaz17KGUpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBPbmx5IHRyaWdnZXIgcm93U2VsZWN0IGlmIHRoZSB0YXJnZXQgaXMgbm90IGEgY2hlY2tib3hcbiAgICAgICAgICAgICAgICBpZiAoZS50YXJnZXQudHlwZSAhPT0gXCJjaGVja2JveFwiKSB7XG4gICAgICAgICAgICAgICAgICByb3dTZWxlY3QoaXRlbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJjbGlja2FibGUtcm93XCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHRleHRBbGlnbjogXCJjZW50ZXJcIiwgY3Vyc29yOiBcImRlZmF1bHRcIiB9fT5cbiAgICAgICAgICAgICAgICB7aXRlbS5uYW1lfVxuICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgdGV4dEFsaWduOiBcImNlbnRlclwiLCBjdXJzb3I6IFwiZGVmYXVsdFwiIH19PlxuICAgICAgICAgICAgICAgIHtmb3JtYXREYXRlKGl0ZW0uZGF0ZSl9XG4gICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyB0ZXh0QWxpZ246IFwiY2VudGVyXCIsIGN1cnNvcjogXCJkZWZhdWx0XCIgfX0+XG4gICAgICAgICAgICAgICAge2l0ZW0ud29ya09yZGVycyAmJiBpdGVtLndvcmtPcmRlcnMubGVuZ3RoID4gMFxuICAgICAgICAgICAgICAgICAgPyBpdGVtLndvcmtPcmRlcnNbaXRlbS53b3JrT3JkZXJzLmxlbmd0aCAtIDFdLndvcmtPcmRlclxuICAgICAgICAgICAgICAgICAgOiBcIk4vQVwifVxuICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgdGV4dEFsaWduOiBcImNlbnRlclwiLCBjdXJzb3I6IFwiZGVmYXVsdFwiIH19PlxuICAgICAgICAgICAgICAgIHtpdGVtLnBufVxuICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgdGV4dEFsaWduOiBcImNlbnRlclwiLCBjdXJzb3I6IFwiZGVmYXVsdFwiIH19PlxuICAgICAgICAgICAgICAgIHtpdGVtLnNufVxuICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgdGV4dEFsaWduOiBcImNlbnRlclwiIH19PlxuICAgICAgICAgICAgICAgIDxGb3JtLkNoZWNrXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgICAgICAgICAgY2hlY2tlZD17c2VsZWN0ZWRJdGVtcy5pbmNsdWRlcyhpdGVtLmlkKX1cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpOyAvLyBQcmV2ZW50IHJvdyBjbGljayB3aGVuIGNoZWNrYm94IGlzIGNsaWNrZWRcbiAgICAgICAgICAgICAgICAgICAgLy8gVG9nZ2xlIHNlbGVjdGlvbiB1c2luZyBpdGVtLmlkIGRpcmVjdGx5XG4gICAgICAgICAgICAgICAgICAgIHNldFNlbGVjdGVkSXRlbXMoKHByZXZTZWxlY3RlZEl0ZW1zKSA9PlxuICAgICAgICAgICAgICAgICAgICAgIHByZXZTZWxlY3RlZEl0ZW1zLmluY2x1ZGVzKGl0ZW0uaWQpXG4gICAgICAgICAgICAgICAgICAgICAgICA/IHByZXZTZWxlY3RlZEl0ZW1zLmZpbHRlcigoaWQpID0+IGlkICE9PSBpdGVtLmlkKVxuICAgICAgICAgICAgICAgICAgICAgICAgOiBbLi4ucHJldlNlbGVjdGVkSXRlbXMsIGl0ZW0uaWRdXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17YFNlbGVjdCAke2l0ZW0ubmFtZX1gfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICkpfVxuICAgICAgICAgIHtpbmZvLmxlbmd0aCA8IDEwICYmXG4gICAgICAgICAgICBBcnJheS5mcm9tKHsgbGVuZ3RoOiAxMCAtIGluZm8ubGVuZ3RoIH0pLm1hcCgoXywgaW5kZXgpID0+IChcbiAgICAgICAgICAgICAgPHRyIGtleT17YGVtcHR5LSR7aW5kZXh9YH0+XG4gICAgICAgICAgICAgICAgPHRkIGNvbFNwYW49e2xhYmVscy5sZW5ndGggKyAxfSBzdHlsZT17eyB0ZXh0QWxpZ246IFwiY2VudGVyXCIgfX0+XG4gICAgICAgICAgICAgICAgICAmbmJzcDtcbiAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgKSl9XG4gICAgICAgIDwvdGJvZHk+XG4gICAgICA8L1RhYmxlPlxuICAgIDwvZGl2PlxuICApO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==