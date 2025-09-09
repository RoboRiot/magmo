_N_E =
(window["webpackJsonp_N_E"] = window["webpackJsonp_N_E"] || []).push([[48],{

/***/ "6FTQ":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _arrayLikeToArray; });
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

/***/ }),

/***/ "8rE2":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _unsupportedIterableToArray; });
/* harmony import */ var _babel_runtime_helpers_esm_arrayLikeToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("6FTQ");

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return Object(_babel_runtime_helpers_esm_arrayLikeToArray__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Object(_babel_runtime_helpers_esm_arrayLikeToArray__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(o, minLen);
}

/***/ }),

/***/ "AJhd":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return WarehouseList; });
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("xvhg");
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("vJKn");
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("rg98");
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("z7pX");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("20a2");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("YFqc");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var bootstrap_dist_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("q4sD");
/* harmony import */ var bootstrap_dist_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(bootstrap_dist_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("cWnB");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("7vrA");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("6xyR");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("MBJH");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("QojX");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("jDKy");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("GWEY");
/* harmony import */ var _styles_Home_module_css__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("vRNQ");
/* harmony import */ var _styles_Home_module_css__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var react_bootstrap_Modal__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("zM5D");
/* harmony import */ var _context_AuthUserContext__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__("XrFm");
/* harmony import */ var _context_Firebase__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__("NY6m");
/* harmony import */ var _LoggedIn__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__("mJJZ");




var __jsx = react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement;

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }









 // import { useCollection } from "react-firebase-hooks/firebase";



function simulateNetworkRequest() {
  return new Promise(function (resolve) {
    return setTimeout(resolve, 2000);
  });
}

function LoadingButton(type, name, route) {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])({
    name: false
  }),
      isLoading = _useState[0],
      setLoading = _useState[1];

  Object(react__WEBPACK_IMPORTED_MODULE_4__["useEffect"])(function () {
    if (isLoading.name) {
      simulateNetworkRequest().then(function () {
        setLoading({
          name: false
        });
      });
    }
  }, [isLoading.name]);

  var handleClick = function handleClick() {
    return setLoading({
      name: true
    });
  };

  return (// <a
    //   class={"btn btn-" + type}
    //   variant={type}
    //   href={"/" + route}
    //   disabled={isLoading.name}
    //   onClick={!isLoading.name ? handleClick : null}
    // >
    //   {isLoading.name ? "Loading…" : name}
    // </a>
    __jsx(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
      href: "/".concat(route)
    }, __jsx("a", {
      className: "btn btn-".concat(type),
      disabled: isLoading.name,
      onClick: !isLoading.name ? handleClick : null
    }, isLoading.name ? "Loading…" : name))
  );
}

function WarehouseList() {
  var _useAuth = Object(_context_AuthUserContext__WEBPACK_IMPORTED_MODULE_17__[/* useAuth */ "b"])([]),
      signOut = _useAuth.signOut;

  var _useState2 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])([]),
      info = _useState2[0],
      setInfo = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])([]),
      backupInfo = _useState3[0],
      setBackupInfo = _useState3[1];

  var _useState4 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])([]),
      ids = _useState4[0],
      setID = _useState4[1];

  var db = _context_Firebase__WEBPACK_IMPORTED_MODULE_18__[/* default */ "b"].firestore();

  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(false),
      show = _useState5[0],
      setShow = _useState5[1];

  var handleClose = function handleClose() {
    return setShow(false);
  };

  var handleShow = function handleShow() {
    return setShow(true);
  };

  var _useState6 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(),
      dItem = _useState6[0],
      setDItem = _useState6[1]; //search features//////


  var _useState7 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])("Name"),
      select = _useState7[0],
      setSelect = _useState7[1];

  var _useState8 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(false),
      showList = _useState8[0],
      setShowList = _useState8[1];

  var _useState9 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])("text"),
      showListSearch = _useState9[0],
      setShowListSearch = _useState9[1];

  var _useState10 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(),
      search = _useState10[0],
      setSearch = _useState10[1]; //This is getting input from warehouse select
  //needs to reload page


  var router = Object(next_router__WEBPACK_IMPORTED_MODULE_5__["useRouter"])();
  Object(react__WEBPACK_IMPORTED_MODULE_4__["useEffect"])(function () {
    if (backupInfo.length > 0 && search) {
      // Call the function here
      collectDataFromSearch();
    }
  }, [backupInfo]);

  var collectDataFromSearch = function collectDataFromSearch() {
    // useEffect(() => {
    // checking if we have the query params and do something with it
    if (router.query.inputText && router.query.selectedType) {
      // const input = router.query.inputText;
      // const type = router.query.selectedType;
      // // window.location.reload();
      // // Now you have the input and type, you can do whatever you want with it
      // console.log(input, type);
      // setSelect(type);
      // setSearch(input);
      searchFilter();
    } else {
      console.log("no input from previous page");
    } // }, [router.query]);

  }; //dropdown and search management


  var showDropdown = function showDropdown(e) {
    setShowList(!show);
  };

  var hideDropdown = function hideDropdown(e) {
    setShowList(false);
  };

  var searchChangeHandler = function searchChangeHandler(event) {
    setSearch(event.target.value);
  };

  function searchFilter() {
    var temp = [];
    console.log("entered search filter");
    console.log(backupInfo);
    backupInfo.map(function (item) {
      console.log(select);
      console.log(search);

      if (select == "Name") {
        if (item.name.toLowerCase().indexOf(search.toLowerCase()) > -1) {
          temp.push(item);
          console.log("enter Name");
        }
      }

      if (select == "Date") {
        var dateComponents = item.date.split("/");
        var paddedMonth = String(dateComponents[0]).padStart(2, "0"); // Ensure month has 2 digits

        var paddedDay = String(dateComponents[1]).padStart(2, "0"); // Ensure day has 2 digits

        var reformattedItemDate = "".concat(dateComponents[2], "-").concat(paddedMonth, "-").concat(paddedDay); // Convert to "YYYY-MM-DD"

        console.log(reformattedItemDate, search);

        if (reformattedItemDate === search) {
          temp.push(item);
          console.log("enterDate");
        }
      }

      if (select == "Work Order") {
        // WO for Work Order or whatever it stands for in your context
        if (Number(item.wo) === Number(search)) {
          temp.push(item);
          console.log("enterWO");
        }
      }

      if (select == "Product Number") {
        // WO for Work Order or whatever it stands for in your context
        if (Number(item.pn) === Number(search)) {
          temp.push(item);
          console.log("enterWO");
        }
      }

      if (select == "Description") {
        if (item.desc.toLowerCase().indexOf(search.toLowerCase()) > -1) {
          temp.push(item);
          console.log("enterDescription");
        }
      } // if (select == "Number") {
      //   const numberFromItem = item.split(",")[1].split(":")[1];
      //   if (Number(numberFromItem) === Number(search)) {
      //     temp.push(item);
      //     console.log("enter Number");
      //   }
      // }

    });
    console.log(temp);
    setLabels(labelBase);
    setSortCheck(sortCheckBase);
    setInfo(temp);
  } //////sorting items//////


  var labelBase = ["name", "date", "w/o", "p/n", "s/n"];
  var labelBaseNames = ["name", "date", "wo", "pn", "sn"];
  var sortCheckBase = [false, false, false, false, false];

  var _useState11 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(labelBase),
      labels = _useState11[0],
      setLabels = _useState11[1];

  var _useState12 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(sortCheckBase),
      sortCheck = _useState12[0],
      setSortCheck = _useState12[1];

  var hold = "↓↑";

  function sortCheckAll(pos) {
    if (!sortCheck[pos]) {
      info.sort(function (a, b) {
        if (pos === 0 || pos === 5) {
          return a[labelBaseNames[pos]].localeCompare(b[labelBaseNames[pos]]);
        } else if (pos === 1) {
          return Date.parse(a[labelBaseNames[pos]]) - Date.parse(b[labelBaseNames[pos]]);
        } else {
          return Number(a[labelBaseNames[pos]]) - Number(b[labelBaseNames[pos]]);
        }
      });
      setLabels(labelBase);
      setLabels(function (prevLabels) {
        return [].concat(Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(prevLabels.slice(0, pos)), [labelBase[pos] + "↓"], Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(prevLabels.slice(pos + 1)));
      });
      setSortCheck(function (prevSortCheck) {
        return prevSortCheck.map(function (_, index) {
          return index === pos;
        });
      });
    } else {
      info.sort(function (a, b) {
        return Number(b.wo) - Number(a.wo);
      });
      info.sort(function (a, b) {
        if (pos === 0 || pos === 5) {
          return b[labelBaseNames[pos]].localeCompare(a[labelBaseNames[pos]]);
        } else if (pos === 1) {
          return Date.parse(b[labelBaseNames[pos]]) - Date.parse(a[labelBaseNames[pos]]);
        } else {
          return Number(b[labelBaseNames[pos]]) - Number(a[labelBaseNames[pos]]);
        }
      });
      setLabels(function (prevLabels) {
        return [].concat(Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(prevLabels.slice(0, pos)), [labelBase[pos] + "↑"], Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(prevLabels.slice(pos + 1)));
      });
      setSortCheck(function (prevSortCheck) {
        return [].concat(Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(prevSortCheck.slice(0, pos)), [false], Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(prevSortCheck.slice(pos + 1)));
      });
    }
  } // Start the fetch operation as soon as
  // the page loads
  // if (typeof window !== "undefined") {


  Object(react__WEBPACK_IMPORTED_MODULE_4__["useEffect"])(function () {
    // window.addEventListener("load", () => {
    console.log("enter 1");
    fetchData(); // displayData();

    console.log("not too bad"); // });
    // }
  }, [router.route]); // runs every time `router.route` changes

  function fetchStuff() {
    return _fetchStuff.apply(this, arguments);
  }

  function _fetchStuff() {
    _fetchStuff = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee3() {
      var data, id, cityRef;
      return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              data = [];
              id = [];
              _context3.next = 4;
              return db.collection("Test").get().then(function (querySnapshot) {
                // Loop through the data and store
                // it in array to display
                querySnapshot.forEach(function (element) {
                  console.log("enter 2");
                  console.log(element.id);
                  id.push(element.id);
                  data.push(element.data());
                });
              });

            case 4:
              cityRef = _context3.sent;
              console.log(data);
              setID(id);
              console.log(ids);
              return _context3.abrupt("return", [data, id]);

            case 9:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));
    return _fetchStuff.apply(this, arguments);
  }

  function toDateTime(secs) {
    var t = new Date(1970, 0, 1); // Epoch

    t.setSeconds(secs);
    return t;
  }

  function fetchData() {
    return _fetchData.apply(this, arguments);
  }

  function _fetchData() {
    _fetchData = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee4() {
      var input, type, datas, data, itemValue, dateStorage, _iterator, _step, _step$value, index, value;

      return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (router.query.inputText && router.query.selectedType) {
                input = router.query.inputText;
                type = router.query.selectedType; // window.location.reload();
                // Now you have the input and type, you can do whatever you want with it

                console.log(input, type);
                setSelect(type);
                setSearch(input);
              }

              _context4.next = 3;
              return fetchStuff();

            case 3:
              datas = _context4.sent;
              data = datas[0];
              itemValue = [];
              dateStorage = [];
              data.map(function (elements) {
                return dateStorage.push(toDateTime(elements.date.seconds).getMonth() + 1 + "/" + toDateTime(elements.date.seconds).getDate() + "/" + toDateTime(elements.date.seconds).getFullYear());
              });
              _iterator = _createForOfIteratorHelper(data.entries());

              try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  _step$value = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(_step.value, 2), index = _step$value[0], value = _step$value[1];
                  data[index].date = dateStorage[index];
                }
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }

              console.log(data);
              setInfo(function (oldArray) {
                return [].concat(Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(oldArray), Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(data));
              });
              setBackupInfo(function (oldArray) {
                return [].concat(Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(oldArray), Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(data));
              });
              setID(function (oldArray) {
                return [].concat(Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(oldArray), Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(datas[1]));
              });
              console.log(data);
              console.log(info);
              console.log(ids); // router.reload();

            case 17:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));
    return _fetchData.apply(this, arguments);
  }

  var rowSelect = function rowSelect(id) {
    console.log(id);
    router.push("item/" + id);
  };

  var _useState13 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(),
      gPos = _useState13[0],
      setGPos = _useState13[1];

  var _useState14 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(),
      gIde = _useState14[0],
      setGIde = _useState14[1];

  var checkDelete = /*#__PURE__*/function () {
    var _ref = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee(pos, ide, name) {
      return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              setDItem(name);
              setGPos(pos);
              setGIde(ide);
              console.log(gPos + "," + gIde);
              handleShow();

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function checkDelete(_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }();

  var deleteItem = /*#__PURE__*/function () {
    var _ref2 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee2() {
      var cityRef;
      return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              console.log(gPos + "," + gIde);
              setInfo(info.filter(function (o, i) {
                return gPos !== i;
              }));
              cityRef = db.collection("Test").doc(gIde)["delete"]();
              handleClose();

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function deleteItem() {
      return _ref2.apply(this, arguments);
    };
  }(); //styling


  var _useState15 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(null),
      hoverIndex = _useState15[0],
      setHoverIndex = _useState15[1];

  var hoverStyle = function hoverStyle(index) {
    return {
      backgroundColor: hoverIndex === index ? "#ddd" : "transparent",
      // Change colors as needed
      textAlign: "center",
      cursor: "default"
    };
  };

  return __jsx(_LoggedIn__WEBPACK_IMPORTED_MODULE_19__["default"], null, __jsx(react_bootstrap_Modal__WEBPACK_IMPORTED_MODULE_16__[/* default */ "a"], {
    show: show,
    onHide: handleClose
  }, __jsx(react_bootstrap_Modal__WEBPACK_IMPORTED_MODULE_16__[/* default */ "a"].Header, {
    closeButton: true
  }, __jsx(react_bootstrap_Modal__WEBPACK_IMPORTED_MODULE_16__[/* default */ "a"].Title, null, "Delete")), __jsx(react_bootstrap_Modal__WEBPACK_IMPORTED_MODULE_16__[/* default */ "a"].Body, null, "Would you like to delete \"", dItem, "\""), __jsx(react_bootstrap_Modal__WEBPACK_IMPORTED_MODULE_16__[/* default */ "a"].Footer, null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], {
    variant: "primary",
    onClick: deleteItem
  }, "Yes"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], {
    variant: "primary",
    onClick: handleClose
  }, "No"))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"], {
    className: "".concat(_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_15___default.a.myCustomContainer, " d-flex align-items-center justify-content-center"),
    style: {
      minHeight: "100vh",
      width: "100%"
    }
  }, __jsx("div", {
    className: "w-100",
    style: {
      maxWidth: "100%",
      margin: "0 auto"
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"], {
    className: "align-items-center justify-content-center",
    style: {
      width: "100%"
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"].Body, {
    style: {
      width: "100%"
    }
  }, __jsx("h2", {
    className: "text-center mb-4"
  }, "Main Menu"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"], {
    style: {
      width: "100%"
    },
    striped: true,
    bordered: true,
    hover: true,
    size: "sm"
  }, __jsx("thead", null, __jsx("tr", null, labels.map(function (item, index) {
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
      }
    }, item);
  }))), __jsx("tbody", null, info.map(function (item, index) {
    return __jsx("tr", {
      "class": "clickable-row",
      key: index // onClick={() => rowSelect(ids[index])}

    }, __jsx("td", {
      style: {
        textAlign: "center",
        cursor: "default"
      },
      onClick: function onClick() {
        return rowSelect(ids[index]);
      }
    }, item.name), __jsx("td", {
      style: {
        textAlign: "center",
        cursor: "default"
      },
      onClick: function onClick() {
        return rowSelect(ids[index]);
      }
    }, " ", item.date, " "), __jsx("td", {
      style: {
        textAlign: "center",
        cursor: "default"
      },
      onClick: function onClick() {
        return rowSelect(ids[index]);
      }
    }, " ", item.wo, " "), __jsx("td", {
      style: {
        textAlign: "center",
        cursor: "default"
      },
      onClick: function onClick() {
        return rowSelect(ids[index]);
      }
    }, " ", item.pn, " "), __jsx("td", {
      style: {
        textAlign: "center",
        cursor: "default"
      },
      onClick: function onClick() {
        return rowSelect(ids[index]);
      }
    }, " ", item.sn, " "), __jsx("td", {
      style: {
        textAlign: "center"
      }
    }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], {
      onClick: function onClick() {
        return checkDelete(index, ids[index], item.name);
      },
      id: ids[index],
      variant: "danger"
    }, "X")));
  }))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"], {
    className: "d-flex",
    style: {
      paddingBottom: "10px"
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"], {
    type: showListSearch,
    placeholder: "Search",
    className: "me-2",
    "aria-label": "Search",
    value: search,
    onChange: searchChangeHandler
  }), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_14__[/* default */ "a"], {
    title: select,
    id: "collasible-nav-dropdown",
    show: showList,
    onMouseEnter: showDropdown,
    onMouseLeave: hideDropdown,
    style: {
      marginTop: "-5px"
    } // Adjust this value as needed

  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_14__[/* default */ "a"].Item, {
    href: "",
    onClick: function onClick() {
      return setSelect("Name") & setShowListSearch("text");
    }
  }, "Name"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_14__[/* default */ "a"].Item, {
    href: "",
    onClick: function onClick() {
      return setSelect("Date") & setShowListSearch("date");
    }
  }, "Date"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_14__[/* default */ "a"].Item, {
    href: "",
    onClick: function onClick() {
      return setSelect("Work Order") & setShowListSearch("number");
    }
  }, "Work Order"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_14__[/* default */ "a"].Item, {
    href: "",
    onClick: function onClick() {
      return setSelect("Product Number") & setShowListSearch("number");
    }
  }, "Product Number"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_14__[/* default */ "a"].Item, {
    href: "",
    onClick: function onClick() {
      return setSelect("Description") & setShowListSearch("text");
    }
  }, "Description")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], {
    variant: "info",
    onClick: searchFilter
  }, "Search")), LoadingButton("secondary", "Add New Item", "Warehousedb/ModItem"), __jsx("a", {
    style: {
      paddingLeft: "10px",
      paddingRight: "10px"
    }
  }), " ", LoadingButton("primary", "Back", "Warehousedb/WarehouseSelect"))))));
}

/***/ }),

/***/ "MBJH":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("eC2I");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("vUet");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("nKUr");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);
"use client";





const Table = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["forwardRef"](({
  bsPrefix,
  className,
  striped,
  bordered,
  borderless,
  hover,
  size,
  variant,
  responsive,
  ...props
}, ref) => {
  const decoratedBsPrefix = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_2__[/* useBootstrapPrefix */ "e"])(bsPrefix, 'table');
  const classes = classnames__WEBPACK_IMPORTED_MODULE_0___default()(className, decoratedBsPrefix, variant && `${decoratedBsPrefix}-${variant}`, size && `${decoratedBsPrefix}-${size}`, striped && `${decoratedBsPrefix}-${typeof striped === 'string' ? `striped-${striped}` : 'striped'}`, bordered && `${decoratedBsPrefix}-bordered`, borderless && `${decoratedBsPrefix}-borderless`, hover && `${decoratedBsPrefix}-hover`);
  const table = /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__["jsx"])("table", {
    ...props,
    className: classes,
    ref: ref
  });
  if (responsive) {
    let responsiveClass = `${decoratedBsPrefix}-responsive`;
    if (typeof responsive === 'string') {
      responsiveClass = `${responsiveClass}-${responsive}`;
    }
    return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__["jsx"])("div", {
      className: responsiveClass,
      children: table
    });
  }
  return table;
});
/* harmony default export */ __webpack_exports__["a"] = (Table);

/***/ }),

/***/ "YFqc":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("cTJO")


/***/ }),

/***/ "cTJO":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = __webpack_require__("zoAU");

var _interopRequireWildcard = __webpack_require__("7KCV");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(__webpack_require__("q1tI"));

var _router = __webpack_require__("elyg");

var _router2 = __webpack_require__("nOHt");

var _useIntersection = __webpack_require__("vNVm");

var prefetched = {};

function prefetch(router, href, as, options) {
  if ( false || !router) return;
  if (!(0, _router.isLocalURL)(href)) return; // Prefetch the JSON page if asked (only in the client)
  // We need to handle a prefetch error here since we may be
  // loading with priority which can reject but we don't
  // want to force navigation since this is only a prefetch

  router.prefetch(href, as, options)["catch"](function (err) {
    if (false) {}
  });
  var curLocale = options && typeof options.locale !== 'undefined' ? options.locale : router && router.locale; // Join on an invalid URI character

  prefetched[href + '%' + as + (curLocale ? '%' + curLocale : '')] = true;
}

function isModifiedEvent(event) {
  var target = event.currentTarget.target;
  return target && target !== '_self' || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || // triggers resource download
  event.nativeEvent && event.nativeEvent.which === 2;
}

function linkClicked(e, router, href, as, replace, shallow, scroll, locale) {
  var nodeName = e.currentTarget.nodeName;

  if (nodeName === 'A' && (isModifiedEvent(e) || !(0, _router.isLocalURL)(href))) {
    // ignore click for browser’s default behavior
    return;
  }

  e.preventDefault(); //  avoid scroll for urls with anchor refs

  if (scroll == null) {
    scroll = as.indexOf('#') < 0;
  } // replace state instead of push if prop is present


  router[replace ? 'replace' : 'push'](href, as, {
    shallow: shallow,
    locale: locale,
    scroll: scroll
  });
}

function Link(props) {
  if (false) { var hasWarned, optionalProps, optionalPropsGuard, requiredProps, requiredPropsGuard, createPropError; }

  var p = props.prefetch !== false;
  var router = (0, _router2.useRouter)();
  var pathname = router && router.asPath || '/';

  var _react$default$useMem = _react["default"].useMemo(function () {
    var _ref = (0, _router.resolveHref)(pathname, props.href, true),
        _ref2 = _slicedToArray(_ref, 2),
        resolvedHref = _ref2[0],
        resolvedAs = _ref2[1];

    return {
      href: resolvedHref,
      as: props.as ? (0, _router.resolveHref)(pathname, props.as) : resolvedAs || resolvedHref
    };
  }, [pathname, props.href, props.as]),
      href = _react$default$useMem.href,
      as = _react$default$useMem.as;

  var children = props.children,
      replace = props.replace,
      shallow = props.shallow,
      scroll = props.scroll,
      locale = props.locale; // Deprecated. Warning shown by propType check. If the children provided is a string (<Link>example</Link>) we wrap it in an <a> tag

  if (typeof children === 'string') {
    children = /*#__PURE__*/_react["default"].createElement("a", null, children);
  } // This will return the first child, if multiple are provided it will throw an error


  var child = _react.Children.only(children);

  var childRef = child && typeof child === 'object' && child.ref;

  var _ref3 = (0, _useIntersection.useIntersection)({
    rootMargin: '200px'
  }),
      _ref4 = _slicedToArray(_ref3, 2),
      setIntersectionRef = _ref4[0],
      isVisible = _ref4[1];

  var setRef = _react["default"].useCallback(function (el) {
    setIntersectionRef(el);

    if (childRef) {
      if (typeof childRef === 'function') childRef(el);else if (typeof childRef === 'object') {
        childRef.current = el;
      }
    }
  }, [childRef, setIntersectionRef]);

  (0, _react.useEffect)(function () {
    var shouldPrefetch = isVisible && p && (0, _router.isLocalURL)(href);
    var curLocale = typeof locale !== 'undefined' ? locale : router && router.locale;
    var isPrefetched = prefetched[href + '%' + as + (curLocale ? '%' + curLocale : '')];

    if (shouldPrefetch && !isPrefetched) {
      prefetch(router, href, as, {
        locale: curLocale
      });
    }
  }, [as, href, isVisible, locale, p, router]);
  var childProps = {
    ref: setRef,
    onClick: function onClick(e) {
      if (child.props && typeof child.props.onClick === 'function') {
        child.props.onClick(e);
      }

      if (!e.defaultPrevented) {
        linkClicked(e, router, href, as, replace, shallow, scroll, locale);
      }
    }
  };

  childProps.onMouseEnter = function (e) {
    if (!(0, _router.isLocalURL)(href)) return;

    if (child.props && typeof child.props.onMouseEnter === 'function') {
      child.props.onMouseEnter(e);
    }

    prefetch(router, href, as, {
      priority: true
    });
  }; // If child is an <a> tag and doesn't have a href attribute, or if the 'passHref' property is
  // defined, we specify the current 'href', so that repetition is not needed by the user


  if (props.passHref || child.type === 'a' && !('href' in child.props)) {
    var curLocale = typeof locale !== 'undefined' ? locale : router && router.locale; // we only render domain locales if we are currently on a domain locale
    // so that locale links are still visitable in development/preview envs

    var localeDomain = router && router.isLocaleDomain && (0, _router.getDomainLocale)(as, curLocale, router && router.locales, router && router.domainLocales);
    childProps.href = localeDomain || (0, _router.addBasePath)((0, _router.addLocale)(as, curLocale, router && router.defaultLocale));
  }

  return /*#__PURE__*/_react["default"].cloneElement(child, childProps);
}

var _default = Link;
exports["default"] = _default;

/***/ }),

/***/ "iqFN":
/***/ (function(module, exports, __webpack_require__) {


    (window.__NEXT_P = window.__NEXT_P || []).push([
      "/Warehousedb/WarehouseList",
      function () {
        return __webpack_require__("AJhd");
      }
    ]);
  

/***/ }),

/***/ "q4sD":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "vNVm":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = __webpack_require__("zoAU");

exports.__esModule = true;
exports.useIntersection = useIntersection;

var _react = __webpack_require__("q1tI");

var _requestIdleCallback = __webpack_require__("0G5g");

var hasIntersectionObserver = typeof IntersectionObserver !== 'undefined';

function useIntersection(_ref) {
  var rootMargin = _ref.rootMargin,
      disabled = _ref.disabled;
  var isDisabled = disabled || !hasIntersectionObserver;
  var unobserve = (0, _react.useRef)();

  var _ref2 = (0, _react.useState)(false),
      _ref3 = _slicedToArray(_ref2, 2),
      visible = _ref3[0],
      setVisible = _ref3[1];

  var setRef = (0, _react.useCallback)(function (el) {
    if (unobserve.current) {
      unobserve.current();
      unobserve.current = undefined;
    }

    if (isDisabled || visible) return;

    if (el && el.tagName) {
      unobserve.current = observe(el, function (isVisible) {
        return isVisible && setVisible(isVisible);
      }, {
        rootMargin: rootMargin
      });
    }
  }, [isDisabled, rootMargin, visible]);
  (0, _react.useEffect)(function () {
    if (!hasIntersectionObserver) {
      if (!visible) {
        var idleCallback = (0, _requestIdleCallback.requestIdleCallback)(function () {
          return setVisible(true);
        });
        return function () {
          return (0, _requestIdleCallback.cancelIdleCallback)(idleCallback);
        };
      }
    }
  }, [visible]);
  return [setRef, visible];
}

function observe(element, callback, options) {
  var _createObserver = createObserver(options),
      id = _createObserver.id,
      observer = _createObserver.observer,
      elements = _createObserver.elements;

  elements.set(element, callback);
  observer.observe(element);
  return function unobserve() {
    elements["delete"](element);
    observer.unobserve(element); // Destroy observer when there's nothing left to watch:

    if (elements.size === 0) {
      observer.disconnect();
      observers["delete"](id);
    }
  };
}

var observers = new Map();

function createObserver(options) {
  var id = options.rootMargin || '';
  var instance = observers.get(id);

  if (instance) {
    return instance;
  }

  var elements = new Map();
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      var callback = elements.get(entry.target);
      var isVisible = entry.isIntersecting || entry.intersectionRatio > 0;

      if (callback && isVisible) {
        callback(isVisible);
      }
    });
  }, options);
  observers.set(id, instance = {
    id: id,
    observer: observer,
    elements: elements
  });
  return instance;
}

/***/ }),

/***/ "vRNQ":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"container":"Home_container__1EcsU","main":"Home_main__1x8gC","footer":"Home_footer__1WdhD","a":"Home_a__3eaqf","title":"Home_title__3DjR7","description":"Home_description__17Z4F","code":"Home_code__axx2Y","grid":"Home_grid__2Ei2F","card":"Home_card__2SdtB","logo":"Home_logo__1YbrH","table-container":"Home_table-container__1gxa9","table":"Home_table__1bzfV","auto-grow-textarea":"Home_auto-grow-textarea__3MKyp"};

/***/ }),

/***/ "xvhg":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ _slicedToArray; });

// CONCATENATED MODULE: ./node_modules/next/node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
// CONCATENATED MODULE: ./node_modules/next/node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js
function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}
// EXTERNAL MODULE: ./node_modules/next/node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js
var unsupportedIterableToArray = __webpack_require__("8rE2");

// CONCATENATED MODULE: ./node_modules/next/node_modules/@babel/runtime/helpers/esm/nonIterableRest.js
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
// CONCATENATED MODULE: ./node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray.js




function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || Object(unsupportedIterableToArray["a" /* default */])(arr, i) || _nonIterableRest();
}

/***/ }),

/***/ "z7pX":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ _toConsumableArray; });

// EXTERNAL MODULE: ./node_modules/next/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js
var arrayLikeToArray = __webpack_require__("6FTQ");

// CONCATENATED MODULE: ./node_modules/next/node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return Object(arrayLikeToArray["a" /* default */])(arr);
}
// CONCATENATED MODULE: ./node_modules/next/node_modules/@babel/runtime/helpers/esm/iterableToArray.js
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}
// EXTERNAL MODULE: ./node_modules/next/node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js
var unsupportedIterableToArray = __webpack_require__("8rE2");

// CONCATENATED MODULE: ./node_modules/next/node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
// CONCATENATED MODULE: ./node_modules/next/node_modules/@babel/runtime/helpers/esm/toConsumableArray.js




function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || Object(unsupportedIterableToArray["a" /* default */])(arr) || _nonIterableSpread();
}

/***/ })

},[["iqFN",1,0,5,3,8,2,4,6,7,9,10,11,12]]]);