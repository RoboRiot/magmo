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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vdXRpbHMvUGFydFRhYmxlLmpzIl0sIm5hbWVzIjpbIlBhcnRUYWJsZSIsImluZm8iLCJsYWJlbHMiLCJpZHMiLCJob3ZlclN0eWxlIiwic29ydENoZWNrQWxsIiwiY2hlY2tEZWxldGUiLCJpc0RlbGV0aW5nIiwicm93U2VsZWN0Iiwic2V0SG92ZXJJbmRleCIsImhvdmVySW5kZXgiLCJzZWxlY3RlZEl0ZW1zIiwic2V0U2VsZWN0ZWRJdGVtcyIsImhhbmRsZVNlbGVjdEl0ZW0iLCJpZCIsInByZXZTZWxlY3RlZEl0ZW1zIiwiaW5jbHVkZXMiLCJmaWx0ZXIiLCJpdGVtSWQiLCJoYW5kbGVEZWxldGVTZWxlY3RlZCIsImxlbmd0aCIsInN0eWxlcyIsInNjcm9sbGFibGVUYWJsZSIsImZpeGVkVGFibGUiLCJzdGlja3lIZWFkZXIiLCJtYXAiLCJpdGVtIiwiaW5kZXgiLCJhY3Rpb25Db2wiLCJ0ZXh0QWxpZ24iLCJlIiwidGFyZ2V0IiwidHlwZSIsImN1cnNvciIsIm5hbWUiLCJmb3JtYXREYXRlIiwiZGF0ZSIsIndvcmtPcmRlcnMiLCJ3b3JrT3JkZXIiLCJwbiIsInNuIiwic3RvcFByb3BhZ2F0aW9uIiwiQXJyYXkiLCJmcm9tIiwiXyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBR2UsU0FBU0EsU0FBVCxPQWFaO0FBQUE7O0FBQUEsTUFaREMsSUFZQyxRQVpEQSxJQVlDO0FBQUEsTUFYREMsTUFXQyxRQVhEQSxNQVdDO0FBQUEsTUFWREMsR0FVQyxRQVZEQSxHQVVDO0FBQUEsTUFUREMsVUFTQyxRQVREQSxVQVNDO0FBQUEsTUFSREMsWUFRQyxRQVJEQSxZQVFDO0FBQUEsTUFQREMsV0FPQyxRQVBEQSxXQU9DO0FBQUEsTUFOREMsVUFNQyxRQU5EQSxVQU1DO0FBQUEsTUFMREMsU0FLQyxRQUxEQSxTQUtDO0FBQUEsTUFKREMsYUFJQyxRQUpEQSxhQUlDO0FBQUEs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QUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FDRTtBQUFJLGFBQU8sRUFBRXpCLE1BQU0sQ0FBQ2tCLE1BQVAsR0FBZ0IsQ0FBN0I7QUFBZ0MsV0FBSyxFQUFFO0FBQUVTLGlCQUFTLEVBQUU7QUFBYixPQUF2QztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGNBREYsQ0FEMkM7QUFBQSxHQUE3QyxDQWhESixDQTlCRixDQURGLENBREY7QUEyRkQ7S0EzSHVCN0IsUyIsImZpbGUiOiJzdGF0aWMvd2VicGFjay9wYWdlcy9OZXdTZWFyY2gvbWFpblNlYXJjaC5kODNhNzE1ZTQ4ZWE5M2MzOWM0MC5ob3QtdXBkYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBUYWJsZSwgQnV0dG9uLCBGb3JtIH0gZnJvbSBcInJlYWN0LWJvb3RzdHJhcFwiO1xuaW1wb3J0IHsgZm9ybWF0RGF0ZSB9IGZyb20gXCIuL2ZldGNoQXNzb2NpYXRpb25zXCI7XG5pbXBvcnQgc3R5bGVzIGZyb20gXCIuLi9zdHlsZXMvUGFydFRhYmxlLm1vZHVsZS5jc3NcIjtcblxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBQYXJ0VGFibGUoe1xuICBpbmZvLFxuICBsYWJlbHMsXG4gIGlkcyxcbiAgaG92ZXJTdHlsZSxcbiAgc29ydENoZWNrQWxsLFxuICBjaGVja0RlbGV0ZSxcbiAgaXNEZWxldGluZyxcbiAgcm93U2VsZWN0LFxuICBzZXRIb3ZlckluZGV4LFxuICBob3ZlckluZGV4LFxuICBzZWxlY3RlZEl0ZW1zLFxuICBzZXRTZWxlY3RlZEl0ZW1zLFxufSkge1xuICAvLyBjb25zdCBbc2VsZWN0ZWRJdGVtcywgc2V0U2VsZWN0ZWRJdGVtc10gPSB1c2VTdGF0ZShbXSk7XG5cbiAgLy8gVG9nZ2xlIHNlbGVjdGlvbiBvZiBpdGVtc1xuICBjb25zdCBoYW5kbGVTZWxlY3RJdGVtID0gKGlkKSA9PiB7XG4gICAgc2V0U2VsZWN0ZWRJdGVtcygocHJldlNlbGVjdGVkSXRlbXMpID0+XG4gICAgICBwcmV2U2VsZWN0ZWRJdGVtcy5pbmNsdWRlcyhpZClcbiAgICAgICAgPyBwcmV2U2VsZWN0ZWRJdGVtcy5maWx0ZXIoKGl0ZW1JZCkgPT4gaXRlbUlkICE9PSBpZClcbiAgICAgICAgOiBbLi4ucHJldlNlbGVjdGVkSXRlbXMsIGlkXVxuICAgICk7XG4gIH07XG5cbiAgLy8gSGFuZGxlIGRlbGV0ZSBidXR0b24gY2xpY2sgZm9yIHNlbGVjdGVkIGl0ZW1zXG4gIGNvbnN0IGhhbmRsZURlbGV0ZVNlbGVjdGVkID0gKCkgPT4ge1xuICAgIGlmIChzZWxlY3RlZEl0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICAgIGNoZWNrRGVsZXRlKG51bGwsIG51bGwsIHNlbGVjdGVkSXRlbXMsIFwic2VsZWN0ZWQgaXRlbXNcIik7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5zY3JvbGxhYmxlVGFibGV9PlxuICAgICAgPFRhYmxlIHN0cmlwZWQgYm9yZGVyZWQgaG92ZXIgc2l6ZT1cInNtXCIgY2xhc3NOYW1lPXtgbWItMCAke3N0eWxlcy5maXhlZFRhYmxlfWB9PlxuICAgICAgICA8dGhlYWQgY2xhc3NOYW1lPXtzdHlsZXMuc3RpY2t5SGVhZGVyfT5cbiAgICAgICAgICA8dHI+XG4gICAgICAgICAgICB7bGFiZWxzLm1hcCgoaXRlbSwgaW5kZXgpID0+IChcbiAgICAgICAgICAgICAgPHRoXG4gICAgICAgICAgICAgICAgc3R5bGU9e2hvdmVyU3R5bGUoaW5kZXgpfVxuICAgICAgICAgICAgICAgIG9uTW91c2VPdmVyPXsoKSA9PiBzZXRIb3ZlckluZGV4KGluZGV4KX1cbiAgICAgICAgICAgICAgICBvbk1vdXNlT3V0PXsoKSA9PiBzZXRIb3ZlckluZGV4KG51bGwpfVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNvcnRDaGVja0FsbChpbmRleCl9XG4gICAgICAgICAgICAgICAga2V5PXtpbmRleH1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHtpdGVtfVxuICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8dGggY2xhc3NOYW1lPXtzdHlsZXMuYWN0aW9uQ29sfSBzdHlsZT17eyB0ZXh0QWxpZ246IFwiY2VudGVyXCIgfX0+XG4gICAgICAgICAgICAgIHtzZWxlY3RlZEl0ZW1zLmxlbmd0aCA+IDAgPyAoXG4gICAgICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICAgICAgdmFyaWFudD1cImRhbmdlclwiXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVEZWxldGVTZWxlY3RlZH1cbiAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtpc0RlbGV0aW5nfVxuICAgICAgICAgICAgICAgICAgc2l6ZT1cInNtXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICBEZWxldGUgU2VsZWN0ZWQgKHtzZWxlY3RlZEl0ZW1zLmxlbmd0aH0pXG4gICAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgXCJzZWxlY3RcIlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICA8L3RyPlxuICAgICAgICA8L3RoZWFkPlxuICAgICAgICA8dGJvZHk+XG4gICAgICAgICAge2luZm8ubWFwKChpdGVtLCBpbmRleCkgPT4gKFxuICAgICAgICAgICAgPHRyXG4gICAgICAgICAgICAgIGtleT17aW5kZXh9XG4gICAgICAgICAgICAgIG9uQ2xpY2s9eyhlKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gT25seSB0cmlnZ2VyIHJvd1NlbGVjdCBpZiB0aGUgdGFyZ2V0IGlzIG5vdCBhIGNoZWNrYm94XG4gICAgICAgICAgICAgICAgaWYgKGUudGFyZ2V0LnR5cGUgIT09IFwiY2hlY2tib3hcIikge1xuICAgICAgICAgICAgICAgICAgcm93U2VsZWN0KGl0ZW0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiY2xpY2thYmxlLXJvd1wiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyB0ZXh0QWxpZ246IFwiY2VudGVyXCIsIGN1cnNvcjogXCJkZWZhdWx0XCIgfX0+XG4gICAgICAgICAgICAgICAge2l0ZW0ubmFtZX1cbiAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHRleHRBbGlnbjogXCJjZW50ZXJcIiwgY3Vyc29yOiBcImRlZmF1bHRcIiB9fT5cbiAgICAgICAgICAgICAgICB7Zm9ybWF0RGF0ZShpdGVtLmRhdGUpfVxuICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgdGV4dEFsaWduOiBcImNlbnRlclwiLCBjdXJzb3I6IFwiZGVmYXVsdFwiIH19PlxuICAgICAgICAgICAgICAgIHtpdGVtLndvcmtPcmRlcnMgJiYgaXRlbS53b3JrT3JkZXJzLmxlbmd0aCA+IDBcbiAgICAgICAgICAgICAgICAgID8gaXRlbS53b3JrT3JkZXJzW2l0ZW0ud29ya09yZGVycy5sZW5ndGggLSAxXS53b3JrT3JkZXJcbiAgICAgICAgICAgICAgICAgIDogXCJOL0FcIn1cbiAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHRleHRBbGlnbjogXCJjZW50ZXJcIiwgY3Vyc29yOiBcImRlZmF1bHRcIiB9fT5cbiAgICAgICAgICAgICAgICB7aXRlbS5wbn1cbiAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHRleHRBbGlnbjogXCJjZW50ZXJcIiwgY3Vyc29yOiBcImRlZmF1bHRcIiB9fT5cbiAgICAgICAgICAgICAgICB7aXRlbS5zbn1cbiAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT17c3R5bGVzLmFjdGlvbkNvbH0gc3R5bGU9e3sgdGV4dEFsaWduOiBcImNlbnRlclwiIH19PlxuICAgICAgICAgICAgICAgIDxGb3JtLkNoZWNrXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgICAgICAgICAgY2hlY2tlZD17c2VsZWN0ZWRJdGVtcy5pbmNsdWRlcyhpdGVtLmlkKX1cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpOyAvLyBQcmV2ZW50IHJvdyBjbGljayB3aGVuIGNoZWNrYm94IGlzIGNsaWNrZWRcbiAgICAgICAgICAgICAgICAgICAgLy8gVG9nZ2xlIHNlbGVjdGlvbiB1c2luZyBpdGVtLmlkIGRpcmVjdGx5XG4gICAgICAgICAgICAgICAgICAgIHNldFNlbGVjdGVkSXRlbXMoKHByZXZTZWxlY3RlZEl0ZW1zKSA9PlxuICAgICAgICAgICAgICAgICAgICAgIHByZXZTZWxlY3RlZEl0ZW1zLmluY2x1ZGVzKGl0ZW0uaWQpXG4gICAgICAgICAgICAgICAgICAgICAgICA/IHByZXZTZWxlY3RlZEl0ZW1zLmZpbHRlcigoaWQpID0+IGlkICE9PSBpdGVtLmlkKVxuICAgICAgICAgICAgICAgICAgICAgICAgOiBbLi4ucHJldlNlbGVjdGVkSXRlbXMsIGl0ZW0uaWRdXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17YFNlbGVjdCAke2l0ZW0ubmFtZX1gfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICkpfVxuICAgICAgICAgIHtpbmZvLmxlbmd0aCA8IDEwICYmXG4gICAgICAgICAgICBBcnJheS5mcm9tKHsgbGVuZ3RoOiAxMCAtIGluZm8ubGVuZ3RoIH0pLm1hcCgoXywgaW5kZXgpID0+IChcbiAgICAgICAgICAgICAgPHRyIGtleT17YGVtcHR5LSR7aW5kZXh9YH0+XG4gICAgICAgICAgICAgICAgPHRkIGNvbFNwYW49e2xhYmVscy5sZW5ndGggKyAxfSBzdHlsZT17eyB0ZXh0QWxpZ246IFwiY2VudGVyXCIgfX0+XG4gICAgICAgICAgICAgICAgICAmbmJzcDtcbiAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgKSl9XG4gICAgICAgIDwvdGJvZHk+XG4gICAgICA8L1RhYmxlPlxuICAgIDwvZGl2PlxuICApO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==