_N_E =
(window["webpackJsonp_N_E"] = window["webpackJsonp_N_E"] || []).push([[23],{

/***/ "QWLO":
/***/ (function(module, exports, __webpack_require__) {


    (window.__NEXT_P = window.__NEXT_P || []).push([
      "/NewSearch/AddItem/parentModal",
      function () {
        return __webpack_require__("oGF+");
      }
    ]);
  

/***/ }),

/***/ "oGF+":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("z7pX");
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("xvhg");
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("vJKn");
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("rg98");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("zM5D");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("7vrA");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("6xyR");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("3Z9Z");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("JI6e");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("zUrK");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("97+O");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("cWnB");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("MBJH");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("QojX");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("jDKy");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("GWEY");
/* harmony import */ var _utils_fetchAssociations__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__("qoNY");
/* harmony import */ var _context_AuthUserContext__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__("XrFm");
/* harmony import */ var _LoggedIn__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__("mJJZ");
/* harmony import */ var _utils_ClientTable__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__("8HvV");
/* harmony import */ var _utils_ModelTable__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__("TM8N");
/* harmony import */ var _utils_PartTable__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__("MSWM");
/* harmony import */ var _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__("Dktn");
/* harmony import */ var _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(_styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_23__);
/* harmony import */ var _context_Firebase__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__("NY6m");




var __jsx = react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement;










var CLIENT_WAREHOUSE = "igor-house";
var CLIENT_UNASSIGNED = "unassigned";

var ParentModal = function ParentModal(_ref) {
  var show = _ref.show,
      handleClose = _ref.handleClose,
      setSelectedParent = _ref.setSelectedParent,
      parts = _ref.parts;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])([]),
      info = _useState[0],
      setInfo = _useState[1];

  var _useState2 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])([]),
      backupInfo = _useState2[0],
      setBackupInfo = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])([]),
      ids = _useState3[0],
      setID = _useState3[1];

  var _useState4 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(""),
      search = _useState4[0],
      setSearch = _useState4[1];

  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])("Name"),
      select = _useState5[0],
      setSelect = _useState5[1];

  var _useState6 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(false),
      showList = _useState6[0],
      setShowList = _useState6[1];

  var _useState7 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])("text"),
      showListSearch = _useState7[0],
      setShowListSearch = _useState7[1];

  var _useState8 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(null),
      selectedOEM = _useState8[0],
      setSelectedOEM = _useState8[1];

  var _useState9 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(null),
      selectedModality = _useState9[0],
      setSelectedModality = _useState9[1];

  var _useState10 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(null),
      selectedClient = _useState10[0],
      setSelectedClient = _useState10[1];

  var _useState11 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])([]),
      clients = _useState11[0],
      setClients = _useState11[1];

  var _useState12 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(false),
      showClientModal = _useState12[0],
      setShowClientModal = _useState12[1];

  var _useState13 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])("Select Option"),
      clientButtonText = _useState13[0],
      setClientButtonText = _useState13[1];

  var _useState14 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(null),
      hoverIndex = _useState14[0],
      setHoverIndex = _useState14[1];

  var _useState15 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(null),
      selectedModel = _useState15[0],
      setSelectedModel = _useState15[1];

  var _useState16 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])([]),
      models = _useState16[0],
      setModels = _useState16[1];

  var _useState17 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(false),
      showModelModal = _useState17[0],
      setShowModelModal = _useState17[1];

  var _useState18 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])("Select Option"),
      modelButtonText = _useState18[0],
      setModelButtonText = _useState18[1];

  var _useState19 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(""),
      clientSearchTerm = _useState19[0],
      setClientSearchTerm = _useState19[1];

  var _useState20 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(""),
      modelSearchTerm = _useState20[0],
      setModelSearchTerm = _useState20[1];

  Object(react__WEBPACK_IMPORTED_MODULE_4__["useEffect"])(function () {
    function fetchData() {
      return _fetchData.apply(this, arguments);
    }

    function _fetchData() {
      _fetchData = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee() {
        var data;
        return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return Object(_utils_fetchAssociations__WEBPACK_IMPORTED_MODULE_17__[/* fetchPartsWithMachineData */ "c"])();

              case 2:
                data = _context.sent;
                setInfo(data);
                setBackupInfo(data);
                setID(data.map(function (item) {
                  return item.id;
                })); // Ensure IDs are correctly set here

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
      return _fetchData.apply(this, arguments);
    }

    fetchData();
  }, []);

  var handleCloseClientModal = function handleCloseClientModal() {
    return setShowClientModal(false);
  };

  var handleShowClientModal = function handleShowClientModal() {
    return setShowClientModal(true);
  };

  var handleCloseModelModal = function handleCloseModelModal() {
    return setShowModelModal(false);
  };

  var handleShowModelModal = function handleShowModelModal() {
    return setShowModelModal(true);
  }; // Handle search input changes


  var searchChangeHandler = function searchChangeHandler(event) {
    return setSearch(event.target.value);
  }; // Filter items based on search criteria


  function searchFilter() {
    var temp = backupInfo.filter(function (item) {
      if (item.machineData) {
        if (selectedOEM && item.machineData.OEM !== selectedOEM) return false;
        if (selectedModality && item.machineData.Modality !== selectedModality) return false;
        if (selectedClient && item.machineData.Client !== selectedClient) return false;
        if (selectedModel && item.machineData.Model !== selectedModel) return false;
      }

      if (select === "Name" && item.name.toLowerCase().includes(search.toLowerCase())) return true;

      if (select === "Date") {
        var _item$date$split = item.date.split("/"),
            _item$date$split2 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(_item$date$split, 3),
            month = _item$date$split2[0],
            day = _item$date$split2[1],
            year = _item$date$split2[2];

        var reformattedDate = "".concat(year, "-").concat(month, "-").concat(day);
        return reformattedDate === search;
      }

      if (select === "Work Order" && Number(item.wo) === Number(search)) return true;
      if (select === "Product Number" && Number(item.pn) === Number(search)) return true;
      if (select === "Description" && item.desc.toLowerCase().includes(search.toLowerCase())) return true;
      return false;
    });
    setInfo(temp);
  } // Sort items based on column


  function sortCheckAll(pos) {
    var sortedInfo = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(info).sort(function (a, b) {
      if (pos === 0 || pos === 5) {
        return b[select].localeCompare(a[select]);
      }

      if (pos === 1) {
        return Date.parse(b[select]) - Date.parse(a[select]);
      }

      return Number(b[select]) - Number(a[select]);
    });

    setInfo(sortedInfo);
  } // Row selection handler


  var rowSelect = function rowSelect(id, name, pn) {
    setSelectedParent({
      id: id,
      name: name,
      pn: pn
    });
    handleClose();
  }; // Dropdown handlers


  var _useState21 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])("Select Option"),
      dropdown1Text = _useState21[0],
      setDropdown1Text = _useState21[1];

  var _useState22 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])("Select Option"),
      dropdown2Text = _useState22[0],
      setDropdown2Text = _useState22[1];

  var handleSelect1 = function handleSelect1(eventKey, event) {
    if (eventKey === "unassigned") {
      setDropdown1Text("Select Option");
      setSelectedOEM(null);
    } else {
      setDropdown1Text(event.target.textContent);
      setSelectedOEM(event.target.textContent);
    }
  };

  var handleSelect2 = function handleSelect2(eventKey, event) {
    if (eventKey === "unassigned") {
      setDropdown2Text("Select Option");
      setSelectedModality(null);
    } else {
      setDropdown2Text(event.target.textContent);
      setSelectedModality(event.target.textContent);
    }
  };

  Object(react__WEBPACK_IMPORTED_MODULE_4__["useEffect"])(function () {
    searchFilter();
  }, [selectedOEM, selectedModality, selectedClient, selectedModel, search]); // Fetch clients and show modal

  var handleClientClick = /*#__PURE__*/function () {
    var _ref2 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee2() {
      var clientsData;
      return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              console.log("clicked");
              _context2.next = 3;
              return Object(_utils_fetchAssociations__WEBPACK_IMPORTED_MODULE_17__[/* fetchClients */ "a"])(selectedOEM, selectedModality);

            case 3:
              clientsData = _context2.sent;
              setClients(clientsData);
              setClientSearchTerm(""); // Reset search term

              setShowClientModal(true);

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function handleClientClick() {
      return _ref2.apply(this, arguments);
    };
  }(); // Client selection handler


  var handleClientSelect = function handleClientSelect(clientName) {
    setClientButtonText(clientName || "Select Option");
    setSelectedClient(clientName || null);
    setShowClientModal(false);
  }; // Client info handler


  var handleClientInfo = function handleClientInfo(clientId, clientName) {
    console.log("Client ID: ".concat(clientId, ", Client Name: ").concat(clientName));
  }; // Clear client selection handler


  var handleClearClientSelection = function handleClearClientSelection() {
    setClientButtonText("Select Option");
    setSelectedClient(null);
    setShowClientModal(false);
    searchFilter();
  }; // Fetch models and show modal


  var handleModelClick = /*#__PURE__*/function () {
    var _ref3 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee3() {
      var modelsData;
      return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return Object(_utils_fetchAssociations__WEBPACK_IMPORTED_MODULE_17__[/* fetchModels */ "b"])(selectedOEM, selectedModality, selectedClient);

            case 2:
              modelsData = _context3.sent;
              setModels(modelsData);
              setModelSearchTerm(""); // Reset search term

              setShowModelModal(true);

            case 6:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function handleModelClick() {
      return _ref3.apply(this, arguments);
    };
  }(); // Model selection handler


  var handleModelSelect = function handleModelSelect(modelName) {
    setModelButtonText(modelName || "Select Option");
    setSelectedModel(modelName || null);
    setShowModelModal(false);
  }; // Clear model selection handler


  var handleClearModelSelection = function handleClearModelSelection() {
    setModelButtonText("Select Option");
    setSelectedModel(null);
    setShowModelModal(false);
    searchFilter();
  };

  var handleWarehouseClick = function handleWarehouseClick() {
    setClientButtonText(CLIENT_WAREHOUSE);
    setSelectedClient(CLIENT_WAREHOUSE);
    searchFilter();
  };

  var handleUnassignedClick = function handleUnassignedClick() {
    setClientButtonText(CLIENT_UNASSIGNED);
    setSelectedClient(CLIENT_UNASSIGNED);
    searchFilter();
  };

  return __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], {
    show: show,
    onHide: handleClose,
    size: "lg"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"].Header, {
    closeButton: true
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"].Title, null, "Select Parent")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"].Body, null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"], {
    className: "d-flex align-items-center justify-content-center",
    style: {
      minHeight: "80vh"
    }
  }, __jsx("div", {
    className: "w-100",
    style: {
      maxWidth: "1200px"
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].Body, null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"], {
    md: 4
  }, __jsx("div", null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"], {
    className: "mb-3"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"].Text, null, "OEM"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"], {
    onSelect: handleSelect1
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"].Toggle, {
    variant: "outline-secondary",
    id: "dropdown-button-1",
    className: "w-100"
  }, dropdown1Text), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"].Menu, {
    className: "w-100"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"].Item, {
    eventKey: "unassigned"
  }, "Select Option"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"].Item, {
    eventKey: "GE"
  }, "GE"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"].Item, {
    eventKey: "Toshiba"
  }, "Toshiba"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"].Item, {
    eventKey: "Siemens"
  }, "Siemens"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"].Item, {
    eventKey: "Philips"
  }, "Philips")))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"], {
    className: "mb-3"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"].Text, null, "Modality"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"], {
    onSelect: handleSelect2
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"].Toggle, {
    variant: "outline-secondary",
    id: "dropdown-button-2",
    className: "w-100"
  }, dropdown2Text), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"].Menu, {
    className: "w-100"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"].Item, {
    eventKey: "unassigned"
  }, "Select Option"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"].Item, {
    eventKey: "CT"
  }, "CT"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"].Item, {
    eventKey: "MRI"
  }, "MRI")))), __jsx("div", null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"], {
    className: "mb-3"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"].Text, null, "Client"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"], {
    variant: "outline-secondary",
    className: "w-100",
    onClick: handleClientClick
  }, clientButtonText)), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"], {
    className: "mb-3"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"].Text, null, "Client-2"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"], {
    variant: "outline-secondary",
    className: "w-100",
    disabled: true
  }, "Select Option")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"], {
    className: "mb-3"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"].Text, null, "Model"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"], {
    variant: "outline-secondary",
    className: "w-100",
    onClick: handleModelClick
  }, modelButtonText)), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_23___default.a.divider
  }), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"], {
    className: "mb-3"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"].Text, null, "Warehouse"), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_23___default.a.buttonGroup
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"], {
    variant: "outline-secondary",
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_23___default.a.flexButton,
    onClick: handleWarehouseClick
  }, "Warehouse"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"], {
    variant: "outline-secondary",
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_23___default.a.flexButton,
    onClick: handleUnassignedClick
  }, "Unassigned")))))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"], {
    md: 8
  }, __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_23___default.a.tableContainer
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"], {
    striped: true,
    bordered: true,
    hover: true,
    size: "sm",
    className: "mb-0"
  }, __jsx("thead", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_23___default.a.stickyHeader
  }, __jsx("tr", null, __jsx("th", {
    onClick: function onClick() {
      return sortCheckAll(0);
    }
  }, "Name"), __jsx("th", {
    onClick: function onClick() {
      return sortCheckAll(1);
    }
  }, "Date"), __jsx("th", {
    onClick: function onClick() {
      return sortCheckAll(2);
    }
  }, "Work Order"), __jsx("th", {
    onClick: function onClick() {
      return sortCheckAll(3);
    }
  }, "Product Number"), __jsx("th", {
    onClick: function onClick() {
      return sortCheckAll(4);
    }
  }, "Serial Number"), __jsx("th", null, "Select"))), __jsx("tbody", null, info.map(function (item, index) {
    return __jsx("tr", {
      className: "clickable-row",
      key: index
    }, __jsx("td", null, item.name), __jsx("td", null, Object(_utils_fetchAssociations__WEBPACK_IMPORTED_MODULE_17__[/* formatDate */ "d"])(item.date)), __jsx("td", null, item.workOrders && item.workOrders.length > 0 ? item.workOrders[item.workOrders.length - 1].workOrder : "N/A"), __jsx("td", null, item.pn), __jsx("td", null, item.sn), __jsx("td", null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"], {
      variant: "primary",
      onClick: function onClick() {
        return rowSelect(ids[index], item.name, item.pn);
      }
    }, "Select")));
  }))), __jsx("div", {
    className: _styles_MainSearch_module_css__WEBPACK_IMPORTED_MODULE_23___default.a.searchContainer
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_14__[/* default */ "a"], {
    className: "d-flex pb-2"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_15__[/* default */ "a"], {
    type: showListSearch,
    placeholder: "Search",
    className: "me-2 flex-grow-1",
    "aria-label": "Search",
    value: search,
    onChange: searchChangeHandler,
    style: {
      flex: "1"
    }
  }), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_16__[/* default */ "a"], {
    title: select,
    id: "collasible-nav-dropdown",
    show: showList,
    onMouseEnter: function onMouseEnter() {
      return setShowList(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setShowList(false);
    },
    style: {
      marginTop: "-5px"
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_16__[/* default */ "a"].Item, {
    onClick: function onClick() {
      return setSelect("Name") & setShowListSearch("text");
    }
  }, "Name"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_16__[/* default */ "a"].Item, {
    onClick: function onClick() {
      return setSelect("Date") & setShowListSearch("date");
    }
  }, "Date"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_16__[/* default */ "a"].Item, {
    onClick: function onClick() {
      return setSelect("Work Order") & setShowListSearch("number");
    }
  }, "Work Order"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_16__[/* default */ "a"].Item, {
    onClick: function onClick() {
      return setSelect("Product Number") & setShowListSearch("number");
    }
  }, "Product Number"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_16__[/* default */ "a"].Item, {
    onClick: function onClick() {
      return setSelect("Description") & setShowListSearch("text");
    }
  }, "Description")))))))))))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"].Footer, null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"], {
    variant: "secondary",
    onClick: handleClose
  }, "Close")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], {
    show: showClientModal,
    onHide: handleCloseClientModal
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"].Header, {
    closeButton: true
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"].Title, null, "Select Client")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"].Body, null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_15__[/* default */ "a"], {
    type: "text",
    placeholder: "Search by name",
    className: "mb-3",
    value: clientSearchTerm,
    onChange: function onChange(e) {
      return setClientSearchTerm(e.target.value);
    }
  }), __jsx(_utils_ClientTable__WEBPACK_IMPORTED_MODULE_20__[/* default */ "a"], {
    clients: clients.filter(function (client) {
      return client.name.toLowerCase().includes(clientSearchTerm.toLowerCase());
    }),
    disableInfo: true,
    onSelectClient: handleClientSelect,
    onInfoClick: handleClientInfo,
    clearSelection: function clearSelection() {
      return handleClientSelect(null);
    } // Clear selection handler

  }))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], {
    show: showModelModal,
    onHide: handleCloseModelModal
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"].Header, {
    closeButton: true
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"].Title, null, "Select Model")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"].Body, null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_15__[/* default */ "a"], {
    type: "text",
    placeholder: "Search by name",
    className: "mb-3",
    value: modelSearchTerm,
    onChange: function onChange(e) {
      return setModelSearchTerm(e.target.value);
    }
  }), __jsx(_utils_ModelTable__WEBPACK_IMPORTED_MODULE_21__[/* default */ "a"], {
    models: models.filter(function (model) {
      return typeof model === "string" ? model.toLowerCase().includes(modelSearchTerm.toLowerCase()) : false;
    }),
    onSelectModel: handleModelSelect,
    clearSelection: function clearSelection() {
      return handleModelSelect(null);
    } // Clear selection handler

  }))));
};

/* harmony default export */ __webpack_exports__["default"] = (ParentModal);

/***/ })

},[["QWLO",1,0,5,3,2,4,6,7,9,10,11,12,13]]]);