_N_E =
(window["webpackJsonp_N_E"] = window["webpackJsonp_N_E"] || []).push([[22],{

/***/ "FCC6":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NewItem; });
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cpVT");
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("z7pX");
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("vJKn");
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("rg98");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var bootstrap_dist_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("q4sD");
/* harmony import */ var bootstrap_dist_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(bootstrap_dist_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("zM5D");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("cWnB");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("3Z9Z");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("JI6e");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("QojX");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("jDKy");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("T/rR");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("7vrA");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("6xyR");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("zUrK");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("pJDg");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__("vYJ8");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__("YFqc");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var next_dynamic__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__("Vvt1");
/* harmony import */ var next_dynamic__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(next_dynamic__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var _context_AuthUserContext__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__("XrFm");
/* harmony import */ var _context_Firebase__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__("NY6m");
/* harmony import */ var _LoggedIn__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__("mJJZ");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__("20a2");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_23__);
/* harmony import */ var _utils_fetchAssociations__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__("qoNY");
/* harmony import */ var _utils_ClientTable__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__("8HvV");
/* harmony import */ var _ClientInfoModal__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__("MbKa");
/* harmony import */ var _parentModal__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__("oGF+");
/* harmony import */ var _item_id_MachineSelectionModal__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__("cJ15");
/* harmony import */ var _InfoModal__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__("VZWn");




var __jsx = react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }















 // Load BarcodeScannerComponent only on the client-side.

var BarcodeScannerComponent = next_dynamic__WEBPACK_IMPORTED_MODULE_19___default()(function () {
  return __webpack_require__.e(/* import() */ 16).then(__webpack_require__.t.bind(null, "ESy1", 7));
}, {
  ssr: false,
  loadableGenerated: {
    webpack: function webpack() {
      return [/*require.resolve*/("ESy1")];
    },
    modules: ["NewSearch\\AddItem\\NewItem.js -> " + "react-qr-barcode-scanner"]
  }
}); // Simulate network delay.

function simulateNetworkRequest() {
  return new Promise(function (resolve) {
    return setTimeout(resolve, 2000);
  });
} // Custom LoadingButton component.


function LoadingButton(_ref) {
  var type = _ref.type,
      name = _ref.name,
      route = _ref.route;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(false),
      isLoading = _useState[0],
      setLoading = _useState[1];

  Object(react__WEBPACK_IMPORTED_MODULE_4__["useEffect"])(function () {
    if (isLoading) {
      simulateNetworkRequest().then(function () {
        return setLoading(false);
      });
    }
  }, [isLoading]);

  var handleClick = function handleClick() {
    return setLoading(true);
  };

  return __jsx(next_link__WEBPACK_IMPORTED_MODULE_18___default.a, {
    href: "/".concat(route)
  }, __jsx("a", {
    className: "btn btn-".concat(type),
    disabled: isLoading,
    onClick: !isLoading ? handleClick : null
  }, isLoading ? "Loading…" : name));
}

function NewItem() {
  var _descriptions$selecte, _descriptions$selecte2;

  var router = Object(next_router__WEBPACK_IMPORTED_MODULE_23__["useRouter"])();

  var _useAuth = Object(_context_AuthUserContext__WEBPACK_IMPORTED_MODULE_20__[/* useAuth */ "b"])(),
      signOut = _useAuth.signOut; // Initialize item state – for a new item, these start empty.
  // We store PN and SN as arrays.


  var _useState2 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])({
    name: "",
    pn: [""],
    sn: [""],
    // This will be overridden on submit.
    localSN: "",
    // NEW FIELD: holds user input for a local serial number.
    price: "",
    status: "",
    poNumber: "",
    length: "",
    width: "",
    height: "",
    arrival_date: "",
    // NEW FIELD: Arrival Date
    visible: true
  }),
      items = _useState2[0],
      setItems = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(true),
      editingPn = _useState3[0],
      setEditingPn = _useState3[1]; // const [newPn, setNewPn] = useState(""); // for the input value when editing


  var _useState4 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(true),
      editingSn = _useState4[0],
      setEditingSn = _useState4[1]; // const [newSn, setNewSn] = useState("");
  // DOM is the Date of Manufacture input (user provided).


  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(""),
      DOM = _useState5[0],
      setDOM = _useState5[1]; // OEM, Modality, Model fields.


  var _useState6 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(""),
      oem = _useState6[0],
      setOem = _useState6[1];

  var _useState7 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(""),
      modality = _useState7[0],
      setModality = _useState7[1];

  var _useState8 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(""),
      model = _useState8[0],
      setModel = _useState8[1]; // Local location states.


  var _useState9 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(""),
      localLocFrom = _useState9[0],
      setLocalLocFrom = _useState9[1];

  var _useState10 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(""),
      localLocCurrent = _useState10[0],
      setLocalLocCurrent = _useState10[1]; // Other states.


  var _useState11 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])([]),
      pnOptions = _useState11[0],
      setPnOptions = _useState11[1];

  var _useState12 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])([]),
      snOptions = _useState12[0],
      setSnOptions = _useState12[1];

  var _useState13 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])([{
    description: "",
    date: ""
  }]),
      descriptions = _useState13[0],
      setDescriptions = _useState13[1];

  var _useState14 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])([{
    workOrder: "",
    date: ""
  }]),
      workOrders = _useState14[0],
      setWorkOrders = _useState14[1];

  var _useState15 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])([]),
      clients = _useState15[0],
      setClients = _useState15[1];

  var _useState16 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])([]),
      photos = _useState16[0],
      setPhotos = _useState16[1];

  var _useState17 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(false),
      show = _useState17[0],
      setShow = _useState17[1]; // error modal for missing required fields


  var _useState18 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(false),
      showErr = _useState18[0],
      setShowErr = _useState18[1];

  var _useState19 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])("Missing required field: Name and Description"),
      Err = _useState19[0],
      setErr = _useState19[1];

  var _useState20 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(false),
      showDescModal = _useState20[0],
      setShowDescModal = _useState20[1];

  var _useState21 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(false),
      showWoModal = _useState21[0],
      setShowWoModal = _useState21[1];

  var _useState22 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(false),
      showClientModal = _useState22[0],
      setShowClientModal = _useState22[1];

  var _useState23 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(false),
      showMachineModal = _useState23[0],
      setShowMachineModal = _useState23[1];

  var _useState24 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(false),
      showParentModal = _useState24[0],
      setShowParentModal = _useState24[1];

  var _useState25 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(false),
      showCameraModal = _useState25[0],
      setShowCameraModal = _useState25[1];

  var _useState26 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(false),
      showSaveModal = _useState26[0],
      setShowSaveModal = _useState26[1];

  var _useState27 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(false),
      machineSelectionModal = _useState27[0],
      setMachineSelectionModal = _useState27[1];

  var _useState28 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(0),
      selectedDesc = _useState28[0],
      setSelectedDesc = _useState28[1];

  var _useState29 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(null),
      selectedClient = _useState29[0],
      setSelectedClient = _useState29[1];

  var _useState30 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(null),
      selectedMachine = _useState30[0],
      setSelectedMachine = _useState30[1];

  var _useState31 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(null),
      selectedCurrentMachine = _useState31[0],
      setSelectedCurrentMachine = _useState31[1];

  var _useState32 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(null),
      selectedParent = _useState32[0],
      setSelectedParent = _useState32[1];

  var _useState33 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(null),
      TheMachine = _useState33[0],
      setTheMachine = _useState33[1];

  var _useState34 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])([]),
      machineOptions = _useState34[0],
      setMachineOptions = _useState34[1];

  var _useState35 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(""),
      search = _useState35[0],
      setSearch = _useState35[1];

  var _useState36 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(null),
      capturedPhoto = _useState36[0],
      setCapturedPhoto = _useState36[1];

  var _useState37 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])("environment"),
      cameraFacing = _useState37[0],
      setCameraFacing = _useState37[1];

  var _useState38 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(false),
      addToWebsite = _useState38[0],
      setAddToWebsite = _useState38[1];

  var _useState39 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(false),
      machinePick = _useState39[0],
      setMachinePick = _useState39[1];

  var _useState40 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(0),
      freqItem = _useState40[0],
      setFreqItem = _useState40[1];

  var _useState41 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(0),
      usagePastYear = _useState41[0],
      setUsagePastYear = _useState41[1];

  var _useState42 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(0),
      machineFrequency = _useState42[0],
      setMachineFrequency = _useState42[1]; // For extra (dimensions/price/DOM) section collapse.


  var _useState43 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(false),
      showExtra = _useState43[0],
      setShowExtra = _useState43[1]; // For PN/SN "add new" functionality.


  var _useState44 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(false),
      addingNewPn = _useState44[0],
      setAddingNewPn = _useState44[1];

  var _useState45 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(""),
      newPn = _useState45[0],
      setNewPn = _useState45[1];

  var _useState46 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(false),
      addingNewSn = _useState46[0],
      setAddingNewSn = _useState46[1];

  var _useState47 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(""),
      newSn = _useState47[0],
      setNewSn = _useState47[1]; // For browsing photos.


  var browseInputRef = Object(react__WEBPACK_IMPORTED_MODULE_4__["useRef"])(null); // Inside your NewItem component:

  var _useState48 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(false),
      loading = _useState48[0],
      setLoading = _useState48[1];

  if (!router.isReady) {
    return null; // or a loading indicator
  } // -------------------- Since this is "add" mode, we do not fetch an existing document.
  // However, we still fetch global PN and SN options and clients for selection.


  Object(react__WEBPACK_IMPORTED_MODULE_4__["useEffect"])(function () {
    function fetchClientsData() {
      return _fetchClientsData.apply(this, arguments);
    }

    function _fetchClientsData() {
      _fetchClientsData = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee() {
        var clientsData;
        return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return Object(_utils_fetchAssociations__WEBPACK_IMPORTED_MODULE_24__[/* fetchClients */ "a"])();

              case 3:
                clientsData = _context.sent;
                console.log("Clients:", clientsData);
                setClients(clientsData);
                _context.next = 11;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](0);
                console.error("Error fetching clients: ", _context.t0);

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 8]]);
      }));
      return _fetchClientsData.apply(this, arguments);
    }

    fetchClientsData();
  }, []);
  Object(react__WEBPACK_IMPORTED_MODULE_4__["useEffect"])(function () {
    function fetchPnSn() {
      return _fetchPnSn.apply(this, arguments);
    }

    function _fetchPnSn() {
      _fetchPnSn = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee2() {
        var db, snapshot, pnSet, snSet;
        return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                db = _context_Firebase__WEBPACK_IMPORTED_MODULE_21__[/* default */ "b"].firestore();
                _context2.next = 3;
                return db.collection("Test").get();

              case 3:
                snapshot = _context2.sent;
                pnSet = new Set();
                snSet = new Set();
                snapshot.forEach(function (doc) {
                  var data = doc.data();
                  if (data.pn) pnSet.add(data.pn);
                  if (data.sn) snSet.add(data.sn);
                });
                setPnOptions(Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(pnSet));
                setSnOptions(Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(snSet));

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));
      return _fetchPnSn.apply(this, arguments);
    }

    fetchPnSn();
  }, []);

  var _useState49 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(false),
      machineFieldsInitialized = _useState49[0],
      setMachineFieldsInitialized = _useState49[1];

  Object(react__WEBPACK_IMPORTED_MODULE_4__["useEffect"])(function () {
    if (!machineFieldsInitialized && (TheMachine || selectedCurrentMachine || selectedMachine)) {
      var updatedFields = updateMachineFields(TheMachine, selectedCurrentMachine, selectedMachine); // Only set fields if they are empty or "N/A"

      if (!oem || oem === "N/A") setOem(updatedFields.oem);
      if (!modality || modality === "N/A") setModality(updatedFields.modality);
      if (!model || model === "N/A") setModel(updatedFields.model);
      setMachineFieldsInitialized(true);
    }
  }, [TheMachine, selectedCurrentMachine, selectedMachine, machineFieldsInitialized]);

  var _useState50 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(null),
      signal = _useState50[0],
      setSignal = _useState50[1];

  Object(react__WEBPACK_IMPORTED_MODULE_4__["useEffect"])(function () {
    if (router.isReady) {
      setSignal(router.query.signal || null);
    }
  }, [router.isReady, router.query.signal]); // -------------------- Handlers for PN and SN dropdowns
  // PN: when a user selects an existing PN value.

  var handlePnSelect = function handlePnSelect(e) {
    var selected = e.target.value;
    setItems(function (prev) {
      var updatedPn = Array.isArray(prev.pn) ? Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(prev.pn) : [];
      updatedPn[0] = selected;
      return _objectSpread(_objectSpread({}, prev), {}, {
        pn: updatedPn
      });
    });
  };

  var handlePnChange = function handlePnChange(index, value) {
    setItems(function (prev) {
      var newPn = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(prev.pn);

      newPn[index] = value;
      return _objectSpread(_objectSpread({}, prev), {}, {
        pn: newPn
      });
    });
  };

  var addPn = function addPn() {
    if (newPn.trim() !== "") {
      setItems(function (prev) {
        return _objectSpread(_objectSpread({}, prev), {}, {
          pn: [].concat(Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(prev.pn), [newPn.trim()])
        });
      });
    }

    setNewPn("");
    setAddingNewPn(false);
  }; // SN: when a user selects an existing SN value.


  var handleSnSelect = function handleSnSelect(e) {
    var selected = e.target.value;
    setItems(function (prev) {
      var updatedSn = Array.isArray(prev.sn) ? Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(prev.sn) : [];
      updatedSn[0] = selected;
      return _objectSpread(_objectSpread({}, prev), {}, {
        sn: updatedSn
      });
    });
  };

  var handleSnChange = function handleSnChange(index, value) {
    setItems(function (prev) {
      var newSn = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(prev.sn);

      newSn[index] = value;
      return _objectSpread(_objectSpread({}, prev), {}, {
        sn: newSn
      });
    });
  };

  var addSn = function addSn() {
    if (newSn.trim() !== "") {
      setItems(function (prev) {
        return _objectSpread(_objectSpread({}, prev), {}, {
          sn: [].concat(Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(prev.sn), [newSn.trim()])
        });
      });
    }

    setNewSn("");
    setAddingNewSn(false);
  }; // -------------------- Photo Browse Handlers


  var handleBrowsePhotos = function handleBrowsePhotos() {
    if (browseInputRef.current) {
      browseInputRef.current.click();
    }
  };

  var handleFilesSelected = function handleFilesSelected(e) {
    var files = e.target.files;

    if (files.length) {
      var newPhotos = [];

      for (var i = 0; i < files.length; i++) {
        newPhotos.push({
          file: files[i],
          url: URL.createObjectURL(files[i])
        });
      }

      setPhotos(function (prevPhotos) {
        return [].concat(Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(prevPhotos), newPhotos);
      });
    }

    e.target.value = "";
  }; // -------------------- Photo Capture Handlers remain as in your index.js


  var handleCapture = function handleCapture(err, result) {
    if (result) {
      setCapturedPhoto(result);
    }
  };

  var capturePhoto = function capturePhoto() {
    var video = document.querySelector("video");
    var canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    var context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob(function (blob) {
      setCapturedPhoto(blob);
    }, "image/png");
  };

  var savePhoto = function savePhoto() {
    setPhotos(function (prevPhotos) {
      return [].concat(Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(prevPhotos), [{
        file: capturedPhoto,
        url: URL.createObjectURL(capturedPhoto)
      }]);
    });
    setCapturedPhoto(null);
    setShowCameraModal(false);
  };

  var removePhoto = function removePhoto(index) {
    setPhotos(photos.filter(function (_, i) {
      return i !== index;
    }));
  }; // -------------------- Modal Handlers


  var handleClose = function handleClose() {
    return setShow(false);
  };

  var handleShow = function handleShow() {
    return setShow(true);
  };

  var handleCloseErr = function handleCloseErr() {
    return setShowErr(false);
  };

  var handleShowErr = function handleShowErr() {
    return setShowErr(true);
  };

  var handleCloseSaveModal = function handleCloseSaveModal() {
    return setShowSaveModal(false);
  };

  var handleShowSaveModal = function handleShowSaveModal() {
    return setShowSaveModal(true);
  };

  var handleCloseDescModal = function handleCloseDescModal() {
    return setShowDescModal(false);
  };

  var handleShowDescModal = function handleShowDescModal() {
    return setShowDescModal(true);
  };

  var handleCloseWoModal = function handleCloseWoModal() {
    return setShowWoModal(false);
  };

  var handleShowWoModal = function handleShowWoModal() {
    return setShowWoModal(true);
  };

  var handleCloseClientModal = function handleCloseClientModal() {
    return setShowClientModal(false);
  };

  var handleShowClientModal = function handleShowClientModal() {
    return setShowClientModal(true);
  };

  var handleCloseMachineModal = function handleCloseMachineModal() {
    return setShowMachineModal(false);
  };

  var handleShowMachineModal = function handleShowMachineModal() {
    setShowMachineModal(true);
    setShowClientModal(false);
  };

  var handleCloseParentModal = function handleCloseParentModal() {
    return setShowParentModal(false);
  };

  var handleShowParentModal = function handleShowParentModal() {
    return setShowParentModal(true);
  }; // -------------------- Work Orders / Descriptions Handlers (unchanged)


  var addDescription = function addDescription() {
    setDescriptions([].concat(Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(descriptions), [{
      description: "",
      date: ""
    }]));
  };

  var removeDescription = function removeDescription(index) {
    setDescriptions(descriptions.filter(function (_, i) {
      return i !== index;
    }));
  };

  var handleDescriptionChange = function handleDescriptionChange(index, field, value) {
    var newDescriptions = descriptions.map(function (desc, i) {
      return i === index ? _objectSpread(_objectSpread({}, desc), {}, Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({}, field, value)) : desc;
    });
    setDescriptions(newDescriptions);
  };

  var addWorkOrder = function addWorkOrder() {
    setWorkOrders([].concat(Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(workOrders), [{
      workOrder: "",
      date: ""
    }]));
  };

  var removeWorkOrder = function removeWorkOrder(index) {
    setWorkOrders(workOrders.filter(function (_, i) {
      return i !== index;
    }));
  };

  var handleWorkOrderChange = function handleWorkOrderChange(index, field, value) {
    var newWorkOrders = workOrders.map(function (wo, i) {
      return i === index ? _objectSpread(_objectSpread({}, wo), {}, Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({}, field, value)) : wo;
    });
    setWorkOrders(newWorkOrders);
  };

  var listDescriptions = function listDescriptions() {
    setShowDescModal(true);
  };

  var selectDescription = function selectDescription(index) {
    setSelectedDesc(index);
    setShowDescModal(false);
  }; // -------------------- Machine Selection (unchanged)


  var handleClientInfo = /*#__PURE__*/function () {
    var _ref2 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee3(clientId) {
      var db, clientDoc, clientData, machinePromises, machineDocs, machines;
      return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              // Clear any previously selected machine/local loc for the branch
              if (machinePick) {
                setSelectedMachine(null);
                setShowLocalLocFrom(false);
              } else {
                setSelectedCurrentMachine(null);
                setShowLocalLocCurrent(false);
              }

              db = _context_Firebase__WEBPACK_IMPORTED_MODULE_21__[/* default */ "b"].firestore();
              _context3.next = 4;
              return db.collection("Client").doc(clientId).get();

            case 4:
              clientDoc = _context3.sent;

              if (!clientDoc.exists) {
                _context3.next = 15;
                break;
              }

              clientData = clientDoc.data();

              if (machinePick) {
                setSelectedClientFrom(_objectSpread({
                  id: clientDoc.id
                }, clientData));
              } else {
                setSelectedClientCurrent(_objectSpread({
                  id: clientDoc.id
                }, clientData));
              } // Fetch machines for this client:


              machinePromises = clientData.machines.map(function (machineRef) {
                return machineRef.get();
              });
              _context3.next = 11;
              return Promise.all(machinePromises);

            case 11:
              machineDocs = _context3.sent;
              machines = machineDocs.map(function (machineDoc) {
                return _objectSpread({
                  id: machineDoc.id
                }, machineDoc.data());
              });
              setMachineOptions(machines);
              handleCloseClientModal();

            case 15:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function handleClientInfo(_x) {
      return _ref2.apply(this, arguments);
    };
  }();

  var fetchMachine = /*#__PURE__*/function () {
    var _ref3 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee4(machineId) {
      var db, doc, machineData, machinesSnapshot;
      return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              db = _context_Firebase__WEBPACK_IMPORTED_MODULE_21__[/* default */ "b"].firestore();
              _context4.next = 3;
              return db.collection("Machine").doc(machineId).get();

            case 3:
              doc = _context4.sent;

              if (!doc.exists) {
                _context4.next = 16;
                break;
              }

              machineData = doc.data();
              setTheMachine(machineData); // Ensure OEM, Modality, and Model update properly only if necessary

              if (!oem || oem === "N/A") setOem(machineData.oem || machineData.OEM || "");
              if (!modality || modality === "N/A") setModality(machineData.modality || machineData.Modality || "");
              if (!model || model === "N/A") setModel(machineData.model || machineData.Model || ""); // Set machine frequency count

              _context4.next = 12;
              return db.collection("Machine").where("Model", "==", machineData.Model || machineData.model).get();

            case 12:
              machinesSnapshot = _context4.sent;
              setMachineFrequency(machinesSnapshot.size);
              _context4.next = 17;
              break;

            case 16:
              console.error("Machine not found");

            case 17:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function fetchMachine(_x2) {
      return _ref3.apply(this, arguments);
    };
  }(); // -------------------- Frequency/Usage (unchanged)


  var calculateItemFrequencyAndUsage = /*#__PURE__*/function () {
    var _ref4 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee5(pn) {
      var db, currentDate, oneYearAgo, itemsSnapshot, usagePastYear;
      return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              db = _context_Firebase__WEBPACK_IMPORTED_MODULE_21__[/* default */ "b"].firestore();
              currentDate = new Date();
              oneYearAgo = new Date();
              oneYearAgo.setFullYear(currentDate.getFullYear() - 1);
              _context5.next = 6;
              return db.collection("Test").where("pn", "==", pn).get();

            case 6:
              itemsSnapshot = _context5.sent;
              setFreqItem(itemsSnapshot.size);
              usagePastYear = 0;
              itemsSnapshot.forEach(function (doc) {
                var itemData = doc.data();
                itemData.workOrders.forEach(function (workOrder) {
                  var workOrderDate = new Date(workOrder.date);

                  if (workOrderDate >= oneYearAgo && workOrderDate <= currentDate) {
                    usagePastYear++;
                  }
                });
              });
              setUsagePastYear(usagePastYear);

            case 11:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    return function calculateItemFrequencyAndUsage(_x3) {
      return _ref4.apply(this, arguments);
    };
  }(); // -------------------- Photo Upload (unchanged)


  var uploadPhotos = /*#__PURE__*/function () {
    var _ref5 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee6(docID) {
      var storageRef, i, photoRef, metadata, url;
      return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              storageRef = _context_Firebase__WEBPACK_IMPORTED_MODULE_21__[/* default */ "b"].storage().ref();
              i = 0;

            case 2:
              if (!(i < photos.length)) {
                _context6.next = 15;
                break;
              }

              if (!photos[i].file) {
                _context6.next = 12;
                break;
              }

              photoRef = storageRef.child("Parts/".concat(docID, "/").concat(docID).concat(i === 0 ? ".jpg" : ".".concat(i + 1, ".jpg")));
              metadata = {
                contentType: "image/png"
              };
              _context6.next = 8;
              return photoRef.put(photos[i].file, metadata);

            case 8:
              _context6.next = 10;
              return photoRef.getDownloadURL();

            case 10:
              url = _context6.sent;
              photos[i].url = url;

            case 12:
              i++;
              _context6.next = 2;
              break;

            case 15:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    return function uploadPhotos(_x4) {
      return _ref5.apply(this, arguments);
    };
  }(); // -------------------- Submission Handler
  // For NewItem, only require Name and Description.


  function handleSubmit(_x5) {
    return _handleSubmit.apply(this, arguments);
  }

  function _handleSubmit() {
    _handleSubmit = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee9(event) {
      var _descriptions$;

      return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              event.preventDefault();

              if (!(!items.name || !((_descriptions$ = descriptions[0]) !== null && _descriptions$ !== void 0 && _descriptions$.description))) {
                _context9.next = 5;
                break;
              }

              handleShow();
              _context9.next = 17;
              break;

            case 5:
              setLoading(true); // start loading before async work

              _context9.prev = 6;
              _context9.next = 9;
              return toSend();

            case 9:
              _context9.next = 14;
              break;

            case 11:
              _context9.prev = 11;
              _context9.t0 = _context9["catch"](6);
              console.error(_context9.t0);

            case 14:
              _context9.prev = 14;
              setLoading(false); // end loading after async work completes

              return _context9.finish(14);

            case 17:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, null, [[6, 11, 14, 17]]);
    }));
    return _handleSubmit.apply(this, arguments);
  }

  function toSend() {
    return _toSend.apply(this, arguments);
  } // -------------------- Info Modal Handlers (unchanged)


  function _toSend() {
    _toSend = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee10() {
      var redirect,
          id,
          db,
          currentUser,
          userEmail,
          machineData,
          formattedItems,
          docId,
          newDocId,
          machineRef,
          machineDoc,
          currentMachineRef,
          currentMachineDoc,
          cleanFormattedItems,
          _machineRef,
          _machineDoc,
          _currentMachineRef,
          _currentMachineDoc,
          _machineRef2,
          _machineDoc2,
          _currentMachineRef2,
          _currentMachineDoc2,
          _args10 = arguments;

      return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              redirect = _args10.length > 0 && _args10[0] !== undefined ? _args10[0] : true;
              id = router.query.id; // Ensure id is defined (it may be undefined for a new item)

              db = _context_Firebase__WEBPACK_IMPORTED_MODULE_21__[/* default */ "b"].firestore(); // Get the current authenticated user

              currentUser = _context_Firebase__WEBPACK_IMPORTED_MODULE_21__[/* default */ "b"].auth().currentUser;
              userEmail = currentUser ? currentUser.email : "unknown"; // Always use the current state values for OEM, modality, and model.

              machineData = _objectSpread(_objectSpread({}, TheMachine || {}), {}, {
                oem: oem,
                modality: modality,
                model: model
              });
              formattedItems = _objectSpread(_objectSpread({}, items), {}, {
                descriptions: descriptions,
                workOrders: workOrders
              }); // Remove any unused fields.

              formattedItems.status = items.status || "";
              formattedItems.DOM = DOM; // Date of Manufacture

              formattedItems.localLocFrom = localLocFrom || "";
              formattedItems.localLocCurrent = localLocCurrent || "";
              formattedItems.date = items.date || "";
              formattedItems.arrival_date = items.arrival_date || ""; // NEW: Arrival Date

              formattedItems.poNumber = items.poNumber || "";
              formattedItems.trackingNumber = items.trackingNumber || "";
              formattedItems.TheMachine = machineData || {};
              formattedItems.addedToWebsite = addToWebsite;
              formattedItems.visible = items.visible; // Add the current user's email under the "user" field

              formattedItems.user = userEmail; // Clean pn and sn arrays to replace undefined values with an empty string.

              formattedItems.pn = (items.pn || []).map(function (value) {
                return value === undefined ? "" : value;
              });
              formattedItems.sn = (items.sn || []).map(function (value) {
                return value === undefined ? "" : value;
              }); // Set machine references for each branch.

              if (selectedMachine && selectedMachine.id) {
                formattedItems.MachineFrom = db.collection("Machine").doc(selectedMachine.id);
              }

              if (selectedCurrentMachine && selectedCurrentMachine.id) {
                formattedItems.MachineCurrent = db.collection("Machine").doc(selectedCurrentMachine.id);
              } // ***** NEW: Set client references for each branch *****


              if (selectedClientFrom && selectedClientFrom.id) {
                formattedItems.ClientFrom = db.collection("Client").doc(selectedClientFrom.id);
              }

              if (selectedClientCurrent && selectedClientCurrent.id) {
                formattedItems.ClientCurrent = db.collection("Client").doc(selectedClientCurrent.id);
              } // ******************************************************


              if (selectedParent && selectedParent.id) {
                formattedItems.Parent = db.collection("Test").doc(selectedParent.id);
              } // Only add dateCreated if this is a new document


              if (!id) {
                formattedItems.dateCreated = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"
              } // --- LOCAL SN LOGIC ---


              docId = id || null;
              _context10.prev = 28;

              if (!docId) {
                _context10.next = 76;
                break;
              }

              // Check if a localSN is provided and if it differs from the current docId.
              newDocId = items.localSN && items.localSN.trim() !== "" ? items.localSN.trim() : docId;

              if (!(docId !== newDocId)) {
                _context10.next = 55;
                break;
              }

              _context10.next = 34;
              return db.collection("Test").doc(newDocId).set(formattedItems);

            case 34:
              if (!(selectedMachine && selectedMachine.id)) {
                _context10.next = 42;
                break;
              }

              machineRef = db.collection("Machine").doc(selectedMachine.id);
              _context10.next = 38;
              return machineRef.get();

            case 38:
              machineDoc = _context10.sent;

              if (!machineDoc.exists) {
                _context10.next = 42;
                break;
              }

              _context10.next = 42;
              return machineRef.update({
                associatedParts: _context_Firebase__WEBPACK_IMPORTED_MODULE_21__[/* default */ "b"].firestore.FieldValue.arrayUnion(db.collection("Test").doc(newDocId))
              });

            case 42:
              if (!(selectedCurrentMachine && selectedCurrentMachine.id)) {
                _context10.next = 50;
                break;
              }

              currentMachineRef = db.collection("Machine").doc(selectedCurrentMachine.id);
              _context10.next = 46;
              return currentMachineRef.get();

            case 46:
              currentMachineDoc = _context10.sent;

              if (!currentMachineDoc.exists) {
                _context10.next = 50;
                break;
              }

              _context10.next = 50;
              return currentMachineRef.update({
                associatedParts: _context_Firebase__WEBPACK_IMPORTED_MODULE_21__[/* default */ "b"].firestore.FieldValue.arrayUnion(db.collection("Test").doc(newDocId))
              });

            case 50:
              _context10.next = 52;
              return db.collection("Test").doc(docId)["delete"]();

            case 52:
              // Set docId to the new document ID.
              docId = newDocId;
              _context10.next = 74;
              break;

            case 55:
              // Deep-clean the formattedItems to remove any undefined nested values.
              cleanFormattedItems = shallowClean(formattedItems);
              _context10.next = 58;
              return db.collection("Test").doc(docId).update(cleanFormattedItems);

            case 58:
              if (!(selectedMachine && selectedMachine.id)) {
                _context10.next = 66;
                break;
              }

              _machineRef = db.collection("Machine").doc(selectedMachine.id);
              _context10.next = 62;
              return _machineRef.get();

            case 62:
              _machineDoc = _context10.sent;

              if (!_machineDoc.exists) {
                _context10.next = 66;
                break;
              }

              _context10.next = 66;
              return _machineRef.update({
                associatedParts: _context_Firebase__WEBPACK_IMPORTED_MODULE_21__[/* default */ "b"].firestore.FieldValue.arrayUnion(db.collection("Test").doc(docId))
              });

            case 66:
              if (!(selectedCurrentMachine && selectedCurrentMachine.id)) {
                _context10.next = 74;
                break;
              }

              _currentMachineRef = db.collection("Machine").doc(selectedCurrentMachine.id);
              _context10.next = 70;
              return _currentMachineRef.get();

            case 70:
              _currentMachineDoc = _context10.sent;

              if (!_currentMachineDoc.exists) {
                _context10.next = 74;
                break;
              }

              _context10.next = 74;
              return _currentMachineRef.update({
                associatedParts: _context_Firebase__WEBPACK_IMPORTED_MODULE_21__[/* default */ "b"].firestore.FieldValue.arrayUnion(db.collection("Test").doc(docId))
              });

            case 74:
              _context10.next = 95;
              break;

            case 76:
              // For a new item, if localSN is provided, use it; otherwise, generate a custom ID.
              docId = items.localSN && items.localSN.trim() !== "" ? items.localSN.trim() : generateCustomID();
              _context10.next = 79;
              return db.collection("Test").doc(docId).set(formattedItems);

            case 79:
              if (!(selectedMachine && selectedMachine.id)) {
                _context10.next = 87;
                break;
              }

              _machineRef2 = db.collection("Machine").doc(selectedMachine.id);
              _context10.next = 83;
              return _machineRef2.get();

            case 83:
              _machineDoc2 = _context10.sent;

              if (!_machineDoc2.exists) {
                _context10.next = 87;
                break;
              }

              _context10.next = 87;
              return _machineRef2.update({
                associatedParts: _context_Firebase__WEBPACK_IMPORTED_MODULE_21__[/* default */ "b"].firestore.FieldValue.arrayUnion(db.collection("Test").doc(docId))
              });

            case 87:
              if (!(selectedCurrentMachine && selectedCurrentMachine.id)) {
                _context10.next = 95;
                break;
              }

              _currentMachineRef2 = db.collection("Machine").doc(selectedCurrentMachine.id);
              _context10.next = 91;
              return _currentMachineRef2.get();

            case 91:
              _currentMachineDoc2 = _context10.sent;

              if (!_currentMachineDoc2.exists) {
                _context10.next = 95;
                break;
              }

              _context10.next = 95;
              return _currentMachineRef2.update({
                associatedParts: _context_Firebase__WEBPACK_IMPORTED_MODULE_21__[/* default */ "b"].firestore.FieldValue.arrayUnion(db.collection("Test").doc(docId))
              });

            case 95:
              _context10.next = 97;
              return uploadPhotos(docId);

            case 97:
              console.log("Item saved and associatedParts updated!"); // Redirect to the new URL using the new document id.

              if (redirect) {
                router.push("/NewSearch/item/".concat(docId));
              } else {
                setRedirect(true);
              } // Optionally, show a save confirmation modal.


              handleShowSaveModal();
              _context10.next = 105;
              break;

            case 102:
              _context10.prev = 102;
              _context10.t0 = _context10["catch"](28);
              console.error("Error saving data:", _context10.t0);

            case 105:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, null, [[28, 102]]);
    }));
    return _toSend.apply(this, arguments);
  }

  var _useState51 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(false),
      showInfoModal = _useState51[0],
      setShowInfoModal = _useState51[1];

  var _useState52 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(""),
      itemName = _useState52[0],
      setItemName = _useState52[1];

  var handleShowInfoModal = /*#__PURE__*/function () {
    var _ref6 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee7() {
      var db, doc, data;
      return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              db = _context_Firebase__WEBPACK_IMPORTED_MODULE_21__[/* default */ "b"].firestore();
              _context7.prev = 1;
              _context7.next = 4;
              return db.collection("Test").doc(id).get();

            case 4:
              doc = _context7.sent;

              if (doc.exists) {
                data = doc.data();
                setItemName(data.name || "N/A");
                setShowInfoModal(true);
              } else {
                console.error("Item not found");
              }

              _context7.next = 11;
              break;

            case 8:
              _context7.prev = 8;
              _context7.t0 = _context7["catch"](1);
              console.error("Error fetching item info:", _context7.t0);

            case 11:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, null, [[1, 8]]);
    }));

    return function handleShowInfoModal() {
      return _ref6.apply(this, arguments);
    };
  }();

  var handleCloseInfoModal = function handleCloseInfoModal() {
    return setShowInfoModal(false);
  };

  var handleCloseCameraModal = function handleCloseCameraModal() {
    setShowCameraModal(false);
    setCapturedPhoto(null);
  };

  var handleChange = function handleChange(field) {
    return function (event) {
      var value = event.target ? event.target.value : event.value;
      setItems(function (prevItems) {
        return _objectSpread(_objectSpread({}, prevItems), {}, Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({}, field, value));
      });
    };
  };

  var mostRecentWorkOrder = workOrders && workOrders.length > 0 ? workOrders.reduce(function (latest, current) {
    var latestDate = new Date(latest.date);
    var currentDate = new Date(current.date);
    return currentDate > latestDate ? current : latest;
  }, workOrders[0]) : {};

  var handleShowCameraModal = function handleShowCameraModal() {
    setShowCameraModal(true);
  };

  var generateCustomID = function generateCustomID() {
    var randomNum = Math.floor(10000 + Math.random() * 90000);
    return "AIS".concat(randomNum);
  };

  var handlePrint = /*#__PURE__*/function () {
    var _ref7 = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee8() {
      var printId, payload, response, result;
      return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              if (items.name) {
                _context8.next = 3;
                break;
              }

              alert("Missing name");
              return _context8.abrupt("return");

            case 3:
              // In addItem mode, there is no existing id so generate one
              printId = generateCustomID();
              payload = {
                name: items.name,
                pn: items.pn,
                sn: items.sn,
                wo: workOrders && workOrders.length > 0 ? workOrders[0].workOrder : "",
                status: items.status,
                local_sn: printId,
                // Use the generated custom ID
                descriptions: descriptions,
                date: items.date || new Date().toISOString().split("T")[0],
                DOM: DOM,
                oem: oem,
                modality: modality,
                model: model
              };
              console.log("Payload for printing:", payload);
              _context8.prev = 6;
              _context8.next = 9;
              return fetch("https://cc7e-174-76-22-138.ngrok-free.app/print-label", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
              });

            case 9:
              response = _context8.sent;
              _context8.next = 12;
              return response.json();

            case 12:
              result = _context8.sent;
              console.log("Print result:", result);
              _context8.next = 19;
              break;

            case 16:
              _context8.prev = 16;
              _context8.t0 = _context8["catch"](6);
              console.error("Error printing label:", _context8.t0);

            case 19:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, null, [[6, 16]]);
    }));

    return function handlePrint() {
      return _ref7.apply(this, arguments);
    };
  }();

  var handleAddNewPn = function handleAddNewPn() {
    if (newPn.trim() !== "") {
      setItems(function (prev) {
        return _objectSpread(_objectSpread({}, prev), {}, {
          pn: [].concat(Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(prev.pn), [newPn.trim()])
        });
      });
    }

    setNewPn("");
    setAddingNewPn(false);
  };

  var handleAddNewSn = function handleAddNewSn() {
    if (newSn.trim() !== "") {
      setItems(function (prev) {
        return _objectSpread(_objectSpread({}, prev), {}, {
          sn: [].concat(Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(prev.sn), [newSn.trim()])
        });
      });
    }

    setNewSn("");
    setAddingNewSn(false);
  };

  function getPriorityMachineField(field, currentValue, theMachine, currentMachine, fromMachine) {
    // If the field is already filled in by the user, return it unchanged.
    if (currentValue && currentValue.trim() !== "" && currentValue.trim() !== "N/A") {
      return currentValue;
    } // Otherwise, prioritize the best available value.


    if (theMachine && theMachine[field] && theMachine[field].trim() !== "" && theMachine[field] !== "N/A") {
      return theMachine[field];
    }

    if (currentMachine && currentMachine[field] && currentMachine[field].trim() !== "" && currentMachine[field] !== "N/A") {
      return currentMachine[field];
    }

    if (fromMachine && fromMachine[field] && fromMachine[field].trim() !== "" && fromMachine[field] !== "N/A") {
      return fromMachine[field];
    }

    return currentValue; // Default to keeping the current value
  }

  function updateMachineFields(theMachine, currentMachine, fromMachine) {
    return {
      oem: getValidMachineField("oem", theMachine, currentMachine, fromMachine),
      modality: getValidMachineField("modality", theMachine, currentMachine, fromMachine),
      model: getValidMachineField("model", theMachine, currentMachine, fromMachine)
    };
  }

  function getValidMachineField(field, theMachine, currentMachine, fromMachine) {
    if (theMachine && theMachine[field] && theMachine[field].trim() !== "" && theMachine[field] !== "N/A") {
      return theMachine[field];
    }

    if (currentMachine && currentMachine[field] && currentMachine[field].trim() !== "" && currentMachine[field] !== "N/A") {
      return currentMachine[field];
    }

    if (fromMachine && fromMachine[field] && fromMachine[field].trim() !== "" && fromMachine[field] !== "N/A") {
      return fromMachine[field];
    }

    return ""; // Keep it empty if no valid data exists
  }

  var _useState53 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(false),
      showLocalLocFrom = _useState53[0],
      setShowLocalLocFrom = _useState53[1];

  var _useState54 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(false),
      showLocalLocCurrent = _useState54[0],
      setShowLocalLocCurrent = _useState54[1];

  function handleClone() {
    return _handleClone.apply(this, arguments);
  }

  function _handleClone() {
    _handleClone = Object(C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])( /*#__PURE__*/C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee11() {
      var _descriptions$2;

      return C_Users_mack2_Desktop_code_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              event.preventDefault();

              if (!(!items.name || !((_descriptions$2 = descriptions[0]) !== null && _descriptions$2 !== void 0 && _descriptions$2.description))) {
                _context11.next = 4;
                break;
              }

              handleShow(); // your existing error modal

              return _context11.abrupt("return");

            case 4:
              setLoading(true);
              _context11.prev = 5;
              _context11.next = 8;
              return toSend(false);

            case 8:
              _context11.next = 13;
              break;

            case 10:
              _context11.prev = 10;
              _context11.t0 = _context11["catch"](5);
              console.error(_context11.t0);

            case 13:
              _context11.prev = 13;
              setLoading(false);
              return _context11.finish(13);

            case 16:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11, null, [[5, 10, 13, 16]]);
    }));
    return _handleClone.apply(this, arguments);
  }

  var condition = function condition(name) {
    return name && name.toLowerCase() === "interior socal";
  };

  var handleSetSelectedMachine = function handleSetSelectedMachine(machine) {
    var condition = function condition(name) {
      return name && name.toLowerCase() === "interior socal";
    };

    if (machinePick) {
      setSelectedMachine({
        id: machine.id,
        name: machine.name
      }); // For "from", show the local loc input if condition met.

      setShowLocalLocFrom(condition(machine.name));
    } else {
      setSelectedCurrentMachine({
        id: machine.id,
        name: machine.name
      }); // For "current", you might also want a local loc input:

      setShowLocalLocCurrent(condition(machine.name));
    }

    fetchMachine(machine.id);
    setShowMachineModal(false);
  };

  var _useState55 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(0),
      currentPnIndex = _useState55[0],
      setCurrentPnIndex = _useState55[1];

  var _useState56 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(false),
      showDropdown = _useState56[0],
      setShowDropdown = _useState56[1];

  var _useState57 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(0),
      currentSnIndex = _useState57[0],
      setCurrentSnIndex = _useState57[1];

  var _useState58 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(false),
      showSnDropdown = _useState58[0],
      setShowSnDropdown = _useState58[1];

  var handleAddNewClient = function handleAddNewClient() {
    // Generate a random client number as part of the URL.
    var randomNum = Math.floor(10000 + Math.random() * 90000); // When pushing, include a query parameter (from=item) and the current item id if available.

    router.push("/NewSearch/client/AIS".concat(randomNum, "/addClient?from=addItem"));
  };

  var _useState59 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(false),
      showMachineSelect = _useState59[0],
      setShowMachineSelect = _useState59[1];

  var _useState60 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(null),
      selectedClientFrom = _useState60[0],
      setSelectedClientFrom = _useState60[1];

  var _useState61 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(null),
      selectedClientCurrent = _useState61[0],
      setSelectedClientCurrent = _useState61[1];

  return __jsx(_LoggedIn__WEBPACK_IMPORTED_MODULE_22__["default"], null, __jsx(_item_id_MachineSelectionModal__WEBPACK_IMPORTED_MODULE_28__["default"], {
    show: machineSelectionModal,
    handleClose: function handleClose() {
      return setMachineSelectionModal(false);
    },
    setMachine: handleSetSelectedMachine,
    machineOptions: machineOptions // if your modal needs the list of machines

  }), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"], {
    show: show,
    onHide: handleClose
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"].Header, {
    closeButton: true
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"].Title, null, "Error")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"].Body, null, "Missing required field: Name and Description"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"].Footer, null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], {
    variant: "primary",
    onClick: handleClose
  }, "Ok"))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"], {
    show: showErr,
    onHide: handleCloseErr
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"].Header, {
    closeButton: true
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"].Title, null, "Error")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"].Body, null, Err), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"].Footer, null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], {
    variant: "primary",
    onClick: handleCloseErr
  }, "Ok"))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"], {
    show: showSaveModal,
    onHide: handleCloseSaveModal
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"].Header, {
    closeButton: true
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"].Title, null, "Save Confirmation")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"].Body, null, "Data has been saved successfully."), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"].Footer, null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], {
    variant: "primary",
    onClick: handleCloseSaveModal
  }, "Ok"))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"], {
    show: showDescModal,
    onHide: handleCloseDescModal
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"].Header, {
    closeButton: true
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"].Title, null, "Descriptions")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"].Body, null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], {
    variant: "primary",
    className: "mb-3",
    onClick: addDescription
  }, "Add Description"), descriptions.map(function (desc, index) {
    return __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], {
      key: index,
      className: "mb-3"
    }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], {
      variant: "outline-secondary",
      className: "w-100",
      onClick: function onClick() {
        return selectDescription(index);
      },
      style: {
        cursor: "pointer"
      }
    }, __jsx("div", {
      className: "d-flex justify-content-between"
    }, __jsx("span", null, desc.description || "Description"), __jsx("span", {
      style: {
        borderLeft: "1px solid #ccc",
        paddingLeft: "10px"
      }
    }, desc.date || "Date"))));
  }), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], {
    variant: "primary",
    onClick: handleCloseDescModal
  }, "OK"))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"], {
    show: showWoModal,
    onHide: handleCloseWoModal
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"].Header, {
    closeButton: true
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"].Title, null, "Work Orders")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"].Body, null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], {
    variant: "primary",
    className: "mb-3",
    onClick: addWorkOrder,
    style: {
      marginBottom: "1rem"
    }
  }, "Add Work Order"), workOrders.map(function (wo, index) {
    return __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], {
      key: index,
      className: "mb-3"
    }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"], null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"].Control, {
      type: "text",
      placeholder: "Work Order",
      value: wo.workOrder,
      onChange: function onChange(e) {
        return handleWorkOrderChange(index, "workOrder", e.target.value);
      },
      style: {
        marginBottom: "0.5rem"
      }
    })), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"], null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"].Control, {
      type: "date",
      placeholder: "Date",
      value: wo.date,
      onChange: function onChange(e) {
        return handleWorkOrderChange(index, "date", e.target.value);
      }
    })), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"], null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], {
      variant: "danger",
      onClick: function onClick() {
        return removeWorkOrder(index);
      }
    }, "Remove")));
  }), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], {
    variant: "primary",
    onClick: handleCloseWoModal
  }, "OK"))), __jsx(_ClientInfoModal__WEBPACK_IMPORTED_MODULE_26__["default"], {
    show: showMachineModal,
    handleClose: handleCloseMachineModal,
    selectedClient: selectedClient,
    machineOptions: machineOptions,
    setSelectedMachine: handleSetSelectedMachine
  }), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"], {
    show: showClientModal,
    onHide: handleCloseClientModal
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"].Header, {
    closeButton: true
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"].Title, null, "Select Client")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"].Body, null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"], {
    type: "text",
    placeholder: "Search by name",
    className: "mb-3",
    value: search,
    onChange: function onChange(e) {
      return setSearch(e.target.value);
    }
  }), __jsx(_utils_ClientTable__WEBPACK_IMPORTED_MODULE_25__[/* default */ "a"], {
    clients: clients.filter(function (client) {
      return client.name.toLowerCase().includes(search.toLowerCase());
    }),
    onSelectClient: handleClientInfo,
    onInfoClick: handleClientInfo,
    clearSelection: function clearSelection() {
      return handleClientInfo(null);
    },
    onAddClient: handleAddNewClient // new prop

  }))), __jsx(_parentModal__WEBPACK_IMPORTED_MODULE_27__["default"], {
    show: showParentModal,
    handleClose: handleCloseParentModal,
    setSelectedParent: setSelectedParent
  }), __jsx(_item_id_MachineSelectionModal__WEBPACK_IMPORTED_MODULE_28__["default"], {
    show: machineSelectionModal,
    handleClose: function handleClose() {
      return setMachineSelectionModal(false);
    },
    setMachine: setTheMachine
  }), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"], {
    show: showCameraModal,
    onHide: handleCloseCameraModal
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"].Header, {
    closeButton: true
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"].Title, null, "Take a Photo")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"].Body, null, __jsx("div", {
    className: "camera"
  }, !capturedPhoto ? __jsx(BarcodeScannerComponent, {
    width: "100%",
    height: 300,
    onUpdate: handleCapture,
    facingMode: cameraFacing
  }) : __jsx("div", {
    className: "photo-preview"
  }, __jsx("img", {
    src: URL.createObjectURL(capturedPhoto),
    alt: "captured",
    style: {
      width: "100%"
    }
  })))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"].Footer, null, !capturedPhoto ? __jsx(react__WEBPACK_IMPORTED_MODULE_4___default.a.Fragment, null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], {
    onClick: capturePhoto,
    style: {
      borderRadius: "50%",
      width: "60px",
      height: "60px",
      position: "absolute",
      left: "50%",
      transform: "translateX(-50%)",
      bottom: "10px"
    }
  }, "\uD83D\uDCF7"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], {
    onClick: function onClick() {
      return setCameraFacing(function (prev) {
        return prev === "environment" ? "user" : "environment";
      });
    }
  }, "Flip Camera"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], {
    variant: "secondary",
    onClick: handleCloseCameraModal
  }, "Cancel")) : __jsx(react__WEBPACK_IMPORTED_MODULE_4___default.a.Fragment, null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], {
    variant: "secondary",
    onClick: function onClick() {
      return setCapturedPhoto(null);
    }
  }, "Retake"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], {
    variant: "primary",
    onClick: savePhoto
  }, "OK")))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"], {
    show: showDescModal,
    onHide: handleCloseDescModal
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"].Header, {
    closeButton: true
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"].Title, null, "Descriptions")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"].Body, null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], {
    variant: "primary",
    className: "mb-3",
    onClick: addDescription
  }, "Add Description"), descriptions.map(function (desc, index) {
    return __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], {
      key: index,
      className: "mb-3"
    }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], {
      variant: "outline-secondary",
      className: "w-100",
      onClick: function onClick() {
        return selectDescription(index);
      },
      style: {
        cursor: "pointer"
      }
    }, __jsx("div", {
      className: "d-flex justify-content-between"
    }, __jsx("span", null, desc.description || "Description"), __jsx("span", {
      style: {
        borderLeft: "1px solid #ccc",
        paddingLeft: "10px"
      }
    }, desc.date || "Date"))));
  }), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], {
    variant: "primary",
    onClick: handleCloseDescModal
  }, "OK"))), __jsx(_InfoModal__WEBPACK_IMPORTED_MODULE_29__["default"], {
    show: showInfoModal,
    handleClose: handleCloseInfoModal,
    itemName: items.name,
    dimensions: "".concat(items.length, ",").concat(items.width, ",").concat(items.height),
    price: items.price,
    freqI: freqItem,
    freqM: machineFrequency,
    usage: usagePastYear
  }), loading && __jsx("div", {
    style: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(255, 255, 255, 0.7)",
      backdropFilter: "blur(5px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999 // Make sure it's above everything else

    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"], {
    animation: "border",
    variant: "primary",
    role: "status"
  }, __jsx("span", {
    className: "visually-hidden"
  }, "Loading..."))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"], {
    className: "d-flex align-items-center justify-content-center",
    style: {
      minHeight: "100vh"
    }
  }, __jsx("div", {
    className: "w-100",
    style: {
      maxWidth: "600px"
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_14__[/* default */ "a"], {
    className: "align-items-center justify-content-center"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_14__[/* default */ "a"].Body, null, __jsx("h2", {
    className: "text-center mb-4"
  }, "Add New Item"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"], {
    onSubmit: handleSubmit
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], {
    className: "mb-3"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"], null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"].Group, {
    controlId: "name"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"].Label, null, "Name"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"].Control, {
    type: "text",
    value: items.name,
    onChange: handleChange("name")
  }))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"], null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"].Group, {
    controlId: "pn"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"].Label, null, "Product Number"), __jsx("div", {
    style: {
      position: "relative"
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_15__[/* default */ "a"], null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"].Control, {
    type: "text",
    value: items.pn[currentPnIndex] || "",
    onChange: function onChange(e) {
      return handlePnChange(currentPnIndex, e.target.value);
    }
  }), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], {
    variant: "outline-secondary",
    onClick: function onClick() {
      return setShowDropdown(!showDropdown);
    }
  }, "\u25BE"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_15__[/* default */ "a"].Text, null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], {
    variant: "outline-secondary",
    onClick: function onClick() {
      return setAddingNewPn(true);
    }
  }, "+"))), showDropdown && __jsx("div", {
    style: {
      position: "absolute",
      top: "100%",
      left: 0,
      right: 0,
      backgroundColor: "white",
      border: "1px solid #ccc",
      zIndex: 1000,
      maxHeight: "150px",
      overflowY: "auto"
    }
  }, items.pn.map(function (pnOption, idx) {
    return __jsx("div", {
      key: idx,
      style: {
        padding: "8px",
        cursor: "pointer"
      },
      onClick: function onClick() {
        setCurrentPnIndex(idx);
        setShowDropdown(false);
      }
    }, pnOption);
  }))), addingNewPn && __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"].Control, {
    type: "text",
    placeholder: "Enter new PN",
    value: newPn,
    onChange: function onChange(e) {
      return setNewPn(e.target.value);
    },
    onBlur: handleAddNewPn,
    onKeyDown: function onKeyDown(e) {
      if (e.key === "Enter") {
        handleAddNewPn();
      }
    }
  })))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], {
    className: "mb-3"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"], null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"].Group, {
    controlId: "sn"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"].Label, null, "Serial Number"), __jsx("div", {
    style: {
      position: "relative"
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_15__[/* default */ "a"], null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"].Control, {
    type: "text",
    value: items.sn[currentSnIndex] || "",
    onChange: function onChange(e) {
      return handleSnChange(currentSnIndex, e.target.value);
    }
  }), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], {
    variant: "outline-secondary",
    onClick: function onClick() {
      return setShowSnDropdown(!showSnDropdown);
    }
  }, "\u25BE"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_15__[/* default */ "a"].Text, null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], {
    variant: "outline-secondary",
    onClick: function onClick() {
      return setAddingNewSn(true);
    }
  }, "+"))), showSnDropdown && __jsx("div", {
    style: {
      position: "absolute",
      top: "100%",
      left: 0,
      right: 0,
      backgroundColor: "white",
      border: "1px solid #ccc",
      zIndex: 1000,
      maxHeight: "150px",
      overflowY: "auto"
    }
  }, items.sn.map(function (snOption, idx) {
    return __jsx("div", {
      key: idx,
      style: {
        padding: "8px",
        cursor: "pointer"
      },
      onClick: function onClick() {
        setCurrentSnIndex(idx);
        setShowSnDropdown(false);
      }
    }, snOption);
  }))), addingNewSn && __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"].Control, {
    type: "text",
    placeholder: "Enter new SN",
    value: newSn,
    onChange: function onChange(e) {
      return setNewSn(e.target.value);
    },
    onBlur: handleAddNewSn,
    onKeyDown: function onKeyDown(e) {
      if (e.key === "Enter") {
        handleAddNewSn();
      }
    }
  }))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"], null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"].Group, {
    controlId: "status"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"].Label, null, "Status"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"].Select, {
    value: items.status || "",
    onChange: handleChange("status")
  }, __jsx("option", {
    value: ""
  }, "Select status"), __jsx("option", {
    value: "Good"
  }, "Good"), __jsx("option", {
    value: "Bad"
  }, "Bad"), __jsx("option", {
    value: "Unknown"
  }, "Unknown"))))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], {
    className: "mb-3"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"], null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"].Group, {
    controlId: "oem"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"].Label, null, "OEM"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"].Control, {
    type: "text",
    placeholder: "OEM",
    value: oem,
    onChange: function onChange(e) {
      return setOem(e.target.value);
    }
  }))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"], null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"].Group, {
    controlId: "modality"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"].Label, null, "Modality"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"].Control, {
    type: "text",
    placeholder: "Modality",
    value: modality,
    onChange: function onChange(e) {
      return setModality(e.target.value);
    }
  }))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"], null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"].Group, {
    controlId: "model"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"].Label, null, "Model"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"].Control, {
    type: "text",
    placeholder: "Model",
    value: model,
    onChange: function onChange(e) {
      return setModel(e.target.value);
    }
  })))), __jsx("div", {
    style: {
      marginBottom: "1rem",
      marginTop: "1rem"
    }
  }, __jsx("div", {
    className: "d-flex align-items-center"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], {
    variant: "outline-secondary",
    onClick: handleShowWoModal,
    className: "me-2"
  }, "Manage Work Orders"), workOrders.length > 0 && __jsx("div", {
    className: "d-flex flex-column align-items-start"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"].Label, null, "Work Order"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"].Control, {
    type: "text",
    placeholder: "Most Recent Work Order",
    value: (mostRecentWorkOrder === null || mostRecentWorkOrder === void 0 ? void 0 : mostRecentWorkOrder.workOrder) || "",
    onChange: function onChange(e) {
      return handleWorkOrderChange(workOrders.indexOf(mostRecentWorkOrder), "workOrder", e.target.value);
    },
    style: {
      marginBottom: "0.5rem"
    }
  }), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"].Label, null, "Date"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"].Control, {
    type: "date",
    placeholder: "Work Order Date",
    value: (mostRecentWorkOrder === null || mostRecentWorkOrder === void 0 ? void 0 : mostRecentWorkOrder.date) || "",
    onChange: function onChange(e) {
      return handleWorkOrderChange(workOrders.indexOf(mostRecentWorkOrder), "date", e.target.value);
    },
    style: {
      marginBottom: "0.5rem"
    }
  })))), __jsx("div", {
    style: {
      marginBottom: "1rem"
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"].Group, {
    controlId: "desc"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], {
    variant: "outline-secondary",
    onClick: listDescriptions,
    className: "mb-2 me-2"
  }, "List Descriptions"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"].Control, {
    as: "textarea",
    rows: 3,
    placeholder: "Enter description",
    value: ((_descriptions$selecte = descriptions[selectedDesc]) === null || _descriptions$selecte === void 0 ? void 0 : _descriptions$selecte.description) || "",
    onChange: function onChange(e) {
      return handleDescriptionChange(selectedDesc, "description", e.target.value);
    },
    style: {
      marginBottom: "0.5rem"
    }
  }), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"].Control, {
    type: "date",
    value: ((_descriptions$selecte2 = descriptions[selectedDesc]) === null || _descriptions$selecte2 === void 0 ? void 0 : _descriptions$selecte2.date) || "",
    onChange: function onChange(e) {
      return handleDescriptionChange(selectedDesc, "date", e.target.value);
    },
    style: {
      marginTop: "0.5rem",
      marginBottom: "0.5rem"
    }
  }))), __jsx("div", {
    style: {
      marginBottom: "1rem"
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], {
    className: "mb-3"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"], null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], {
    variant: "outline-secondary",
    onClick: function onClick() {
      setMachinePick(true);
      handleShowClientModal();
    },
    className: "me-2"
  }, "Select From"), selectedClientFrom && __jsx("div", {
    style: {
      border: "1px solid #ccc",
      padding: "0.75rem",
      borderRadius: "4px",
      marginBottom: "1rem"
    }
  }, __jsx("p", null, __jsx("strong", null, "Selected Client (From):"), " ", selectedClientFrom.name), __jsx("div", {
    style: {
      marginTop: "0.5rem"
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], {
    variant: "outline-secondary",
    onClick: function onClick() {
      return setShowMachineModal(true);
    }
  }, "Select Machine for ", selectedClientFrom.name), selectedMachine && __jsx(react__WEBPACK_IMPORTED_MODULE_4___default.a.Fragment, null, __jsx("p", {
    style: {
      marginTop: "0.5rem"
    }
  }, __jsx("strong", null, "Selected Machine (From):"), " ", selectedMachine.name), showLocalLocFrom && __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"].Group, {
    controlId: "localLocFrom",
    className: "mt-2"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"].Label, null, "Local Loc (From)"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"].Control, {
    type: "text",
    value: localLocFrom,
    onChange: function onChange(e) {
      return setLocalLocFrom(e.target.value);
    }
  })))))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"], null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], {
    variant: "outline-secondary",
    onClick: function onClick() {
      setMachinePick(false);
      handleShowClientModal();
    },
    className: "me-2"
  }, "Select Current"), selectedClientCurrent && __jsx("div", {
    style: {
      border: "1px solid #ccc",
      padding: "0.75rem",
      borderRadius: "4px",
      marginBottom: "1rem"
    }
  }, __jsx("p", null, __jsx("strong", null, "Selected Client (Current):"), " ", selectedClientCurrent.name), __jsx("div", {
    style: {
      marginTop: "0.5rem"
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], {
    variant: "outline-secondary",
    onClick: function onClick() {
      return setShowMachineModal(true);
    }
  }, "Select Machine for ", selectedClientCurrent.name), selectedCurrentMachine && __jsx(react__WEBPACK_IMPORTED_MODULE_4___default.a.Fragment, null, __jsx("p", {
    style: {
      marginTop: "0.5rem"
    }
  }, __jsx("strong", null, "Selected Machine (Current):"), " ", selectedCurrentMachine.name), showLocalLocCurrent && __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"].Group, {
    controlId: "localLocCurrent",
    className: "mt-2"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"].Label, null, "Local Loc (Current)"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"].Control, {
    type: "text",
    value: localLocCurrent,
    onChange: function onChange(e) {
      return setLocalLocCurrent(e.target.value);
    }
  })))))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"], null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], {
    variant: "outline-secondary",
    onClick: handleShowParentModal,
    className: "me-2"
  }, "Select Parent"), selectedParent && __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"].Control, {
    type: "text",
    placeholder: "Selected Parent",
    value: selectedParent.name,
    readOnly: true,
    style: {
      cursor: "default",
      marginTop: "0.5rem"
    }
  })))), __jsx("div", {
    style: {
      marginBottom: "1rem"
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], {
    className: "mb-3"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"], {
    xs: 6
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_16__[/* default */ "a"], null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], {
    variant: "outline-secondary",
    onClick: handleShowCameraModal
  }, "Take Photo"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], {
    variant: "outline-secondary",
    onClick: handleBrowsePhotos
  }, "Browse"))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"], {
    xs: 6,
    className: "d-flex align-items-center"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], {
    variant: addToWebsite ? "primary" : "outline-primary",
    onClick: function onClick() {
      return setAddToWebsite(function (prev) {
        return !prev;
      });
    }
  }, addToWebsite ? "✓ Add to Website" : "Add to Website"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"].Check, {
    type: "checkbox",
    id: "hide-checkbox",
    label: "Hide" // box is checked when we want visible = false
    ,
    checked: !items.visible,
    onChange: function onChange(e) {
      // grab checked immediately
      var isHidden = e.currentTarget.checked;
      setItems(function (prev) {
        return _objectSpread(_objectSpread({}, prev), {}, {
          visible: !isHidden
        });
      });
    },
    className: "ms-3"
  }))), __jsx("input", {
    type: "file",
    accept: "image/*",
    multiple: true,
    ref: browseInputRef,
    style: {
      display: "none"
    },
    onChange: handleFilesSelected
  })), __jsx("div", {
    className: "mt-3 d-flex flex-wrap"
  }, photos.map(function (photo, index) {
    return __jsx("div", {
      key: index,
      className: "d-flex flex-column align-items-center mb-2 me-2",
      style: {
        width: "100px",
        height: "100px",
        position: "relative"
      }
    }, __jsx("img", {
      src: photo.url,
      alt: "Photo ".concat(index + 1),
      style: {
        width: "100%",
        height: "100%",
        objectFit: "cover"
      }
    }), photo.file && __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], {
      variant: "danger",
      size: "sm",
      style: {
        position: "absolute",
        top: 0,
        right: 0,
        padding: "0 5px"
      },
      onClick: function onClick() {
        return removePhoto(index);
      }
    }, "X"));
  })), __jsx("div", {
    className: "mt-3 d-flex flex-wrap align-items-center"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], {
    variant: "primary",
    type: "submit",
    style: {
      marginRight: "1rem"
    }
  }, "Save"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], {
    variant: "info",
    onClick: handleClone,
    style: {
      marginRight: "1rem"
    }
  }, "Clone"), __jsx(LoadingButton, {
    type: "secondary",
    name: "Back",
    route: "NewSearch/mainSearch"
  }), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], {
    variant: "info",
    onClick: handlePrint,
    style: {
      marginLeft: "auto"
    }
  }, "Print Label")), __jsx("div", {
    style: {
      textAlign: "center",
      margin: "1rem 0"
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], {
    variant: "link",
    style: {
      textDecoration: "none",
      color: "black",
      fontSize: "24px"
    },
    onClick: function onClick() {
      return setShowExtra(!showExtra);
    }
  }, "\u25BC")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_17__[/* default */ "a"], {
    "in": showExtra
  }, __jsx("div", {
    id: "extra-collapse",
    className: "mt-3"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"].Group, {
    as: react_bootstrap__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"],
    controlId: "dimensions"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"].Label, null, "Dimensions (L x W x H)"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"], null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"].Control, {
    placeholder: "Length",
    type: "text",
    value: items.length,
    onChange: handleChange("length")
  })), "x", __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"], null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"].Control, {
    placeholder: "Width",
    type: "text",
    value: items.width,
    onChange: handleChange("width")
  })), "x", __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"], null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"].Control, {
    placeholder: "Height",
    type: "text",
    value: items.height,
    onChange: handleChange("height")
  })))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"].Group, {
    as: react_bootstrap__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"],
    controlId: "price"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"].Label, null, "Price"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"].Control, {
    placeholder: "Price",
    type: "text",
    value: items.price,
    onChange: handleChange("price")
  }))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], {
    className: "mt-3"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"].Group, {
    as: react_bootstrap__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"],
    controlId: "DOM"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"].Label, null, "DOM (Date of Manufacture)"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"].Control, {
    placeholder: "Enter DOM",
    type: "date",
    value: DOM,
    onChange: function onChange(e) {
      return setDOM(e.target.value);
    }
  })), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"].Group, {
    as: react_bootstrap__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"],
    controlId: "localSN"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"].Label, null, "Local SN"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"].Control, {
    type: "text",
    placeholder: "Enter Local SN",
    value: items.localSN || "",
    onChange: handleChange("localSN")
  }))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"].Group, {
    as: react_bootstrap__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"],
    controlId: "poNumber"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"].Label, null, "PO Number"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"].Control, {
    type: "text",
    placeholder: "PO Number",
    value: items.poNumber || "",
    onChange: handleChange("poNumber")
  })), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"].Group, {
    as: react_bootstrap__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"],
    controlId: "arrivalDate"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"].Label, null, "Arrival Date"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"].Control, {
    placeholder: "Enter Arrival Date",
    type: "date",
    value: items.arrival_date,
    onChange: function onChange(e) {
      var value = e.target.value;
      setItems(function (prev) {
        return _objectSpread(_objectSpread({}, prev), {}, {
          arrival_date: value
        });
      });
    }
  })))))))))));
}

/***/ }),

/***/ "Rh9Y":
/***/ (function(module, exports, __webpack_require__) {


    (window.__NEXT_P = window.__NEXT_P || []).push([
      "/NewSearch/AddItem/NewItem",
      function () {
        return __webpack_require__("FCC6");
      }
    ]);
  

/***/ })

},[["Rh9Y",1,0,5,3,8,2,4,6,7,9,10,11,12,13,14,18]]]);