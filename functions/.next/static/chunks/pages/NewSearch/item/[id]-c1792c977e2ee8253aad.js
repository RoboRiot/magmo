_N_E =
(window["webpackJsonp_N_E"] = window["webpackJsonp_N_E"] || []).push([[43],{

/***/ "NySP":
/***/ (function(module, exports, __webpack_require__) {


    (window.__NEXT_P = window.__NEXT_P || []).push([
      "/NewSearch/item/[id]",
      function () {
        return __webpack_require__("oysE");
      }
    ]);
  

/***/ }),

/***/ "oysE":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "__N_SSP", function() { return /* binding */ __N_SSP; });
__webpack_require__.d(__webpack_exports__, "default", function() { return /* binding */ DisplayItemPage; });

// CONCATENATED MODULE: ./node_modules/next/node_modules/@babel/runtime/helpers/esm/extends.js
function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}
// EXTERNAL MODULE: ./node_modules/next/node_modules/@babel/runtime/helpers/esm/toConsumableArray.js + 3 modules
var toConsumableArray = __webpack_require__("z7pX");

// EXTERNAL MODULE: ./node_modules/next/node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__("vJKn");
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);

// EXTERNAL MODULE: ./node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("rg98");

// EXTERNAL MODULE: ./node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__("cpVT");

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__("q1tI");
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/bootstrap/dist/css/bootstrap.min.css
var bootstrap_min = __webpack_require__("q4sD");

// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/Modal.js + 6 modules
var Modal = __webpack_require__("zM5D");

// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/Button.js
var Button = __webpack_require__("cWnB");

// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/Row.js
var Row = __webpack_require__("3Z9Z");

// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/Col.js
var Col = __webpack_require__("JI6e");

// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/Form.js + 11 modules
var Form = __webpack_require__("QojX");

// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/FormControl.js
var FormControl = __webpack_require__("jDKy");

// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/Container.js
var Container = __webpack_require__("7vrA");

// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/Card.js + 10 modules
var Card = __webpack_require__("6xyR");

// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/InputGroup.js + 1 modules
var InputGroup = __webpack_require__("zUrK");

// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/ButtonGroup.js
var ButtonGroup = __webpack_require__("pJDg");

// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/Collapse.js + 1 modules
var Collapse = __webpack_require__("vYJ8");

// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__("YFqc");
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);

// EXTERNAL MODULE: ./context/AuthUserContext.js + 1 modules
var AuthUserContext = __webpack_require__("XrFm");

// EXTERNAL MODULE: ./context/Firebase.js + 6 modules
var Firebase = __webpack_require__("NY6m");

// EXTERNAL MODULE: ./pages/LoggedIn.js
var LoggedIn = __webpack_require__("mJJZ");

// EXTERNAL MODULE: ./node_modules/next/router.js
var next_router = __webpack_require__("20a2");

// EXTERNAL MODULE: ./utils/fetchAssociations.js
var fetchAssociations = __webpack_require__("qoNY");

// EXTERNAL MODULE: ./utils/ClientTable.js
var ClientTable = __webpack_require__("8HvV");

// EXTERNAL MODULE: ./pages/NewSearch/ClientInfoModal.js
var ClientInfoModal = __webpack_require__("MbKa");

// EXTERNAL MODULE: ./pages/NewSearch/AddItem/parentModal.js
var parentModal = __webpack_require__("oGF+");

// EXTERNAL MODULE: ./node_modules/next/dynamic.js
var dynamic = __webpack_require__("Vvt1");
var dynamic_default = /*#__PURE__*/__webpack_require__.n(dynamic);

// EXTERNAL MODULE: ./pages/NewSearch/InfoModal.js
var InfoModal = __webpack_require__("VZWn");

// EXTERNAL MODULE: ./pages/NewSearch/item/[id]/MachineSelectionModal.js
var MachineSelectionModal = __webpack_require__("cJ15");

// CONCATENATED MODULE: ./utils/BluefolderService.js




function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { Object(defineProperty["a" /* default */])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// BluefolderService.js
var API_TOKEN = "9b224624-44db-49dd-9042-c3b15e9a39d4"; // your token

var ITEMS_URL = "https://app.bluefolder.com/api/2.0/items/add.aspx";
var MATERIALS_URL = "https://app.bluefolder.com/api/2.0/serviceRequests/addMaterial.aspx";
var HEADERS = {
  "Content-Type": "text/xml"
};
function addServiceItem(_x, _x2) {
  return _addServiceItem.apply(this, arguments);
}

function _addServiceItem() {
  _addServiceItem = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee(serviceRequestId, item) {
    var uniqueName, itemPayload, itemResponse, itemText, parser, itemXml, itemIdElem, itemId, nowStr, comment, materialPayload, materialResponse, materialText, materialXml;
    return regenerator_default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // Use "Service Item" for name and description
            uniqueName = "Service Item"; // Step 1: Create a new material item in BlueFolder

            itemPayload = "\n    <request>\n      <itemAdd>\n        <itemType>materials</itemType>\n        <itemName>".concat(uniqueName, "</itemName>\n        <description>Service Item</description>\n        <accountName></accountName>\n        <isFlatRate>false</isFlatRate>\n        <mfrDescription></mfrDescription>\n        <mfrItemNo></mfrItemNo>\n        <mfrName>BlueFolderTestManufacturer</mfrName>\n        <notes>Service Item</notes>\n        <taxableDefault>true</taxableDefault>\n        <unitCost>0.00</unitCost>\n        <unitPrice>0.00</unitPrice>\n        <unitListPrice>0.00</unitListPrice>\n      </itemAdd>\n    </request>\n  ");
            _context.next = 4;
            return fetch(ITEMS_URL, {
              method: "POST",
              headers: _objectSpread(_objectSpread({}, HEADERS), {}, {
                Authorization: "Basic " + btoa(API_TOKEN + ":x")
              }),
              body: itemPayload
            });

          case 4:
            itemResponse = _context.sent;
            _context.next = 7;
            return itemResponse.text();

          case 7:
            itemText = _context.sent;
            parser = new DOMParser();
            itemXml = parser.parseFromString(itemText, "application/xml");

            if (!(itemXml.documentElement.getAttribute("status") !== "ok")) {
              _context.next = 12;
              break;
            }

            throw new Error("Failed to create material item in BlueFolder");

          case 12:
            itemIdElem = itemXml.getElementsByTagName("itemId")[0];
            itemId = itemIdElem ? itemIdElem.textContent : null; // Step 2: Add the material to the specified work order

            nowStr = new Date().toLocaleString("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true
            });
            comment = "Name: ".concat(item.name, "\nPN: ").concat(item.pn, "\nSN: ").concat(item.sn, "\nStatus: ").concat(item.status, "\nDescription: ").concat(item.description);
            materialPayload = "\n    <request>\n      <serviceRequestAddMaterial>\n        <serviceRequestId>".concat(serviceRequestId, "</serviceRequestId>\n        <dateUsed>").concat(nowStr, "</dateUsed>\n        <quantity>1</quantity>\n        <billingStatus>billable</billingStatus>\n        <itemNo>").concat(uniqueName, "</itemNo>\n        <itemDescription>Service Item</itemDescription>\n        <itemUnitCost>0.00</itemUnitCost>\n        <itemUnitPrice>0.00</itemUnitPrice>\n        <comment>").concat(comment, "</comment>\n        <commentIsPublic>false</commentIsPublic>\n        <taxable>true</taxable>\n      </serviceRequestAddMaterial>\n    </request>\n  ");
            _context.next = 19;
            return fetch(MATERIALS_URL, {
              method: "POST",
              headers: _objectSpread(_objectSpread({}, HEADERS), {}, {
                Authorization: "Basic " + btoa(API_TOKEN + ":x")
              }),
              body: materialPayload
            });

          case 19:
            materialResponse = _context.sent;
            _context.next = 22;
            return materialResponse.text();

          case 22:
            materialText = _context.sent;
            materialXml = parser.parseFromString(materialText, "application/xml");

            if (!(materialXml.documentElement.getAttribute("status") !== "ok")) {
              _context.next = 26;
              break;
            }

            throw new Error("Failed to add material to work order in BlueFolder");

          case 26:
            return _context.abrupt("return", {
              itemId: itemId,
              materialResponse: materialText
            });

          case 27:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _addServiceItem.apply(this, arguments);
}
// EXTERNAL MODULE: ./pages/NewSearch/item/[id]/NewLocal.js + 2 modules
var NewLocal = __webpack_require__("7wmr");

// EXTERNAL MODULE: ./pages/NewSearch/AddItem/NewItem.module.css
var NewItem_module = __webpack_require__("bD1r");
var NewItem_module_default = /*#__PURE__*/__webpack_require__.n(NewItem_module);

// EXTERNAL MODULE: ./utils/inflowAPI.js + 2 modules
var inflowAPI = __webpack_require__("nc39");

// EXTERNAL MODULE: ./utils/itemFormShared.js
var itemFormShared = __webpack_require__("KWEF");

// CONCATENATED MODULE: ./pages/NewSearch/item/[id]/index.js





var __jsx = react_default.a.createElement;

function _id_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _id_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { _id_ownKeys(Object(source), true).forEach(function (key) { Object(defineProperty["a" /* default */])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { _id_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }


















 //inflow API


 // Import for SSR

// This will only load the component on the client-side.
var BarcodeScannerComponent = dynamic_default()(function () {
  return __webpack_require__.e(/* import() */ 20).then(__webpack_require__.t.bind(null, "ESy1", 7));
}, {
  ssr: false,
  loadableGenerated: {
    webpack: function webpack() {
      return [/*require.resolve*/("ESy1")];
    },
    modules: ["NewSearch\\item\\[id]\\index.js -> " + "react-qr-barcode-scanner"]
  }
}); // Simulates a network request delay.

function simulateNetworkRequest() {
  return new Promise(function (resolve) {
    return setTimeout(resolve, 2000);
  });
} // Custom LoadingButton component.


function LoadingButton(_ref) {
  var type = _ref.type,
      name = _ref.name,
      route = _ref.route;

  var _useState = Object(react["useState"])(false),
      isLoading = _useState[0],
      setLoading = _useState[1];

  Object(react["useEffect"])(function () {
    if (isLoading) {
      var cancelled = false;
      simulateNetworkRequest().then(function () {
        if (!cancelled) setLoading(false);
      });
      return function () {
        cancelled = true;
      };
    }
  }, [isLoading]);

  var handleClick = function handleClick() {
    return setLoading(true);
  };

  return __jsx(link_default.a, {
    href: "/".concat(route)
  }, __jsx("a", {
    className: "btn btn-".concat(type),
    disabled: isLoading,
    onClick: !isLoading ? handleClick : null
  }, isLoading ? "Loading…" : name));
}

function isValidMachineValue(value) {
  if (value == null) return false;
  if (typeof value !== "string") return Boolean(value);
  var trimmed = value.trim();
  return trimmed !== "" && trimmed.toLowerCase() !== "n/a";
}

function DisplayItemInner(_ref2) {
  var _initialItem$price, _initialItem$status, _initialItem$length, _initialItem$width, _initialItem$height, _initialItem$poNumber, _initialItem$tracking, _initialItem$visible, _descriptions$selecte3, _descriptions$selecte4, _newLocalFrom$section, _newLocalFrom$section2, _newLocalCurrent$sect, _newLocalCurrent$sect2;

  var initialItem = _ref2.initialItem,
      initialMachineData = _ref2.initialMachineData,
      error = _ref2.error;
  // Feature flag to show/hide the 3 Slack buttons
  var SHOW_SLACK_BUTTONS = "true" === "true";
  var router = Object(next_router["useRouter"])();

  var _useAuth = Object(AuthUserContext["b" /* useAuth */])(),
      signOut = _useAuth.signOut; // const { id } = router.query;


  var idFromRouter = router.query.id;
  var initialId = (initialItem === null || initialItem === void 0 ? void 0 : initialItem.id) || idFromRouter; // Use a single local var everywhere in this component

  var id = initialId;

  var _useState2 = Object(react["useState"])({
    name: (initialItem === null || initialItem === void 0 ? void 0 : initialItem.name) || "",
    pn: Array.isArray(initialItem === null || initialItem === void 0 ? void 0 : initialItem.pn) ? initialItem.pn : initialItem !== null && initialItem !== void 0 && initialItem.pn ? [initialItem.pn] : [],
    sn: Array.isArray(initialItem === null || initialItem === void 0 ? void 0 : initialItem.sn) ? initialItem.sn : initialItem !== null && initialItem !== void 0 && initialItem.sn ? [initialItem.sn] : [],
    // hydrate these from initialItem so SSR renders fully on deploy
    price: (_initialItem$price = initialItem === null || initialItem === void 0 ? void 0 : initialItem.price) !== null && _initialItem$price !== void 0 ? _initialItem$price : "",
    status: (_initialItem$status = initialItem === null || initialItem === void 0 ? void 0 : initialItem.status) !== null && _initialItem$status !== void 0 ? _initialItem$status : "",
    length: (_initialItem$length = initialItem === null || initialItem === void 0 ? void 0 : initialItem.length) !== null && _initialItem$length !== void 0 ? _initialItem$length : "",
    width: (_initialItem$width = initialItem === null || initialItem === void 0 ? void 0 : initialItem.width) !== null && _initialItem$width !== void 0 ? _initialItem$width : "",
    height: (_initialItem$height = initialItem === null || initialItem === void 0 ? void 0 : initialItem.height) !== null && _initialItem$height !== void 0 ? _initialItem$height : "",
    poNumber: (_initialItem$poNumber = initialItem === null || initialItem === void 0 ? void 0 : initialItem.poNumber) !== null && _initialItem$poNumber !== void 0 ? _initialItem$poNumber : "",
    trackingNumber: (_initialItem$tracking = initialItem === null || initialItem === void 0 ? void 0 : initialItem.trackingNumber) !== null && _initialItem$tracking !== void 0 ? _initialItem$tracking : "",
    localSN: (initialItem === null || initialItem === void 0 ? void 0 : initialItem.localSN) || "",
    arrival_date: (initialItem === null || initialItem === void 0 ? void 0 : initialItem.arrival_date) || "",
    visible: (_initialItem$visible = initialItem === null || initialItem === void 0 ? void 0 : initialItem.visible) !== null && _initialItem$visible !== void 0 ? _initialItem$visible : true
  }),
      items = _useState2[0],
      setItems = _useState2[1];

  var _useState3 = Object(react["useState"])((initialItem === null || initialItem === void 0 ? void 0 : initialItem.name) || ""),
      savedName = _useState3[0],
      setSavedName = _useState3[1]; // ⬇️ put this INSIDE DisplayItem, after the related useState hooks


  Object(react["useEffect"])(function () {
    if (!initialItem) return;
    setDescriptions(initialItem.descriptions || []);
    setWorkOrders(initialItem.workOrders || []);
    setDOM(initialItem.DOM || "");
    setItems(function (prev) {
      var _ref3, _initialItem$status2, _ref4, _initialItem$price2, _ref5, _initialItem$length2, _ref6, _initialItem$width2, _ref7, _initialItem$height2, _ref8, _initialItem$poNumber2, _ref9, _initialItem$tracking2;

      return _id_objectSpread(_id_objectSpread({}, prev), {}, {
        // only overwrite if SSR provided a value; otherwise keep what you have
        status: (_ref3 = (_initialItem$status2 = initialItem.status) !== null && _initialItem$status2 !== void 0 ? _initialItem$status2 : prev.status) !== null && _ref3 !== void 0 ? _ref3 : "",
        price: (_ref4 = (_initialItem$price2 = initialItem.price) !== null && _initialItem$price2 !== void 0 ? _initialItem$price2 : prev.price) !== null && _ref4 !== void 0 ? _ref4 : "",
        length: (_ref5 = (_initialItem$length2 = initialItem.length) !== null && _initialItem$length2 !== void 0 ? _initialItem$length2 : prev.length) !== null && _ref5 !== void 0 ? _ref5 : "",
        width: (_ref6 = (_initialItem$width2 = initialItem.width) !== null && _initialItem$width2 !== void 0 ? _initialItem$width2 : prev.width) !== null && _ref6 !== void 0 ? _ref6 : "",
        height: (_ref7 = (_initialItem$height2 = initialItem.height) !== null && _initialItem$height2 !== void 0 ? _initialItem$height2 : prev.height) !== null && _ref7 !== void 0 ? _ref7 : "",
        poNumber: (_ref8 = (_initialItem$poNumber2 = initialItem.poNumber) !== null && _initialItem$poNumber2 !== void 0 ? _initialItem$poNumber2 : prev.poNumber) !== null && _ref8 !== void 0 ? _ref8 : "",
        trackingNumber: (_ref9 = (_initialItem$tracking2 = initialItem.trackingNumber) !== null && _initialItem$tracking2 !== void 0 ? _initialItem$tracking2 : prev.trackingNumber) !== null && _ref9 !== void 0 ? _ref9 : ""
      });
    });

    if (initialItem.name) {
      setSavedName(initialItem.name);
    }
  }, [initialItem]);

  var _useState4 = Object(react["useState"])({
    region: "",
    section: {
      letter: "",
      number: ""
    },
    bin: "",
    pallet: ""
  }),
      newLocalFrom = _useState4[0],
      setNewLocalFrom = _useState4[1];

  var _useState5 = Object(react["useState"])({
    region: "",
    section: {
      letter: "",
      number: ""
    },
    bin: "",
    pallet: ""
  }),
      newLocalCurrent = _useState5[0],
      setNewLocalCurrent = _useState5[1]; // New states for separate client selections:


  var _useState6 = Object(react["useState"])(null),
      selectedClientFrom = _useState6[0],
      setSelectedClientFrom = _useState6[1];

  var _useState7 = Object(react["useState"])(null),
      selectedClientCurrent = _useState7[0],
      setSelectedClientCurrent = _useState7[1];

  var _useState8 = Object(react["useState"])(null),
      selectedMachine = _useState8[0],
      setSelectedMachine = _useState8[1];

  var _useState9 = Object(react["useState"])(null),
      selectedCurrentMachine = _useState9[0],
      setSelectedCurrentMachine = _useState9[1]; // whenever you pick a new “From” client or machine, clear the old From-loc:
  // useEffect(() => {
  //   setNewLocalFrom({ region: "", section: { letter: "", number: "" }, bin: "", pallet: "" });
  // }, [selectedClientFrom, selectedMachine]);
  // const didMountFrom = useRef(false);
  // useEffect(() => {
  //   if (!didMountFrom.current) {
  //     // first time through (the data-load phase), don’t clear
  //     didMountFrom.current = true;
  //     return;
  //   }
  //   // thereafter, when the user picks a new client or machine, clear:
  //   setNewLocalFrom({ region: "", section: { letter: "", number: "" }, bin: "", pallet: "" });
  //   setLocalLocFrom("");
  // }, [selectedClientFrom, selectedMachine]);
  // whenever you pick a new “Current” client or machine, clear the old Current-loc:
  // useEffect(() => {
  //   setNewLocalCurrent({ region: "", section: { letter: "", number: "" }, bin: "", pallet: "" });
  // }, [selectedClientCurrent, selectedCurrentMachine]);
  // const [didFetch, setDidFetch] = useState(false);
  // useEffect(() => {
  //   if (!didFetch) {
  //     // we’re in the data-load phase, skip clearing
  //     setDidFetch(true);
  //     return;
  //   }
  //   // only clear on subsequent user changes:
  //   setNewLocalCurrent({ region: "", section: {}, bin: "", pallet: "" });
  // }, [selectedClientCurrent, selectedCurrentMachine]);
  // These arrays will be populated from Firebase.


  var _useState10 = Object(react["useState"])([]),
      pnOptions = _useState10[0],
      setPnOptions = _useState10[1];

  var _useState11 = Object(react["useState"])([]),
      snOptions = _useState11[0],
      setSnOptions = _useState11[1];

  var _useState12 = Object(react["useState"])(false),
      pnSnLoaded = _useState12[0],
      setPnSnLoaded = _useState12[1];

  var _useState13 = Object(react["useState"])(false),
      pnSnLoading = _useState13[0],
      setPnSnLoading = _useState13[1];

  var _useState14 = Object(react["useState"])([{
    description: "",
    date: ""
  }]),
      descriptions = _useState14[0],
      setDescriptions = _useState14[1];

  var _useState15 = Object(react["useState"])([{
    workOrder: "",
    date: ""
  }]),
      workOrders = _useState15[0],
      setWorkOrders = _useState15[1];

  var _useState16 = Object(react["useState"])([]),
      clients = _useState16[0],
      setClients = _useState16[1];

  var _useState17 = Object(react["useState"])(false),
      clientsLoaded = _useState17[0],
      setClientsLoaded = _useState17[1];

  var _useState18 = Object(react["useState"])(false),
      clientsLoading = _useState18[0],
      setClientsLoading = _useState18[1];

  var _useState19 = Object(react["useState"])([]),
      photos = _useState19[0],
      setPhotos = _useState19[1];

  var _useState20 = Object(react["useState"])(false),
      show = _useState20[0],
      setShow = _useState20[1];

  var _useState21 = Object(react["useState"])(false),
      showErr = _useState21[0],
      setShowErr = _useState21[1];

  var _useState22 = Object(react["useState"])("N/A"),
      Err = _useState22[0],
      setErr = _useState22[1];

  var _useState23 = Object(react["useState"])(false),
      showDescModal = _useState23[0],
      setShowDescModal = _useState23[1];

  var _useState24 = Object(react["useState"])(false),
      showWoModal = _useState24[0],
      setShowWoModal = _useState24[1];

  var _useState25 = Object(react["useState"])(false),
      showClientModal = _useState25[0],
      setShowClientModal = _useState25[1];

  var _useState26 = Object(react["useState"])(false),
      showMachineModal = _useState26[0],
      setShowMachineModal = _useState26[1];

  var _useState27 = Object(react["useState"])(false),
      showParentModal = _useState27[0],
      setShowParentModal = _useState27[1];

  var _useState28 = Object(react["useState"])(false),
      showCameraModal = _useState28[0],
      setShowCameraModal = _useState28[1];

  var _useState29 = Object(react["useState"])(false),
      showSaveModal = _useState29[0],
      setShowSaveModal = _useState29[1];

  var _useState30 = Object(react["useState"])(false),
      showPrintModal = _useState30[0],
      setShowPrintModal = _useState30[1];

  var _useState31 = Object(react["useState"])(false),
      machineSelectionModal = _useState31[0],
      setMachineSelectionModal = _useState31[1];

  var _useState32 = Object(react["useState"])(0),
      selectedDesc = _useState32[0],
      setSelectedDesc = _useState32[1];

  var _useState33 = Object(react["useState"])(null),
      selectedClient = _useState33[0],
      setSelectedClient = _useState33[1];

  var _useState34 = Object(react["useState"])(null),
      selectedParent = _useState34[0],
      setSelectedParent = _useState34[1];

  var _useState35 = Object(react["useState"])(null),
      TheMachine = _useState35[0],
      setTheMachine = _useState35[1];

  var _useState36 = Object(react["useState"])([]),
      machineOptions = _useState36[0],
      setMachineOptions = _useState36[1];

  var _useState37 = Object(react["useState"])(""),
      search = _useState37[0],
      setSearch = _useState37[1];

  var _useState38 = Object(react["useState"])(null),
      capturedPhoto = _useState38[0],
      setCapturedPhoto = _useState38[1];

  var _useState39 = Object(react["useState"])("environment"),
      cameraFacing = _useState39[0],
      setCameraFacing = _useState39[1];

  var _useState40 = Object(react["useState"])(false),
      addToWebsite = _useState40[0],
      setAddToWebsite = _useState40[1];

  var _useState41 = Object(react["useState"])(false),
      machinePick = _useState41[0],
      setMachinePick = _useState41[1];

  var _useState42 = Object(react["useState"])(0),
      freqItem = _useState42[0],
      setFreqItem = _useState42[1];

  var _useState43 = Object(react["useState"])(0),
      usagePastYear = _useState43[0],
      setUsagePastYear = _useState43[1];

  var _useState44 = Object(react["useState"])(0),
      machineFrequency = _useState44[0],
      setMachineFrequency = _useState44[1]; // State for the extra (dimensions/price/DOM/PO Number) section.


  var _useState45 = Object(react["useState"])(false),
      showExtra = _useState45[0],
      setShowExtra = _useState45[1]; // State for the local warehouse location inputs.


  var _useState46 = Object(react["useState"])(""),
      localLocFrom = _useState46[0],
      setLocalLocFrom = _useState46[1];

  var _useState47 = Object(react["useState"])(""),
      localLocCurrent = _useState47[0],
      setLocalLocCurrent = _useState47[1]; // New state for DOM (Date of Manufacture)


  var _useState48 = Object(react["useState"])(""),
      DOM = _useState48[0],
      setDOM = _useState48[1]; // New state for OEM, Modality, and Model.


  var _useState49 = Object(react["useState"])(""),
      oem = _useState49[0],
      setOem = _useState49[1];

  var _useState50 = Object(react["useState"])(""),
      modality = _useState50[0],
      setModality = _useState50[1];

  var _useState51 = Object(react["useState"])(""),
      model = _useState51[0],
      setModel = _useState51[1];

  var applyMergedMachineFields = function applyMergedMachineFields(merged) {
    if (!merged) return;
    setOem(function (prev) {
      return isValidMachineValue(merged.oem) ? merged.oem : prev;
    });
    setModality(function (prev) {
      return isValidMachineValue(merged.modality) ? merged.modality : prev;
    });
    setModel(function (prev) {
      return isValidMachineValue(merged.model) ? merged.model : prev;
    });
  }; // More info modal state.


  var _useState52 = Object(react["useState"])(false),
      showInfoModal = _useState52[0],
      setShowInfoModal = _useState52[1];

  var _useState53 = Object(react["useState"])(""),
      itemName = _useState53[0],
      setItemName = _useState53[1];

  var _useState54 = Object(react["useState"])(false),
      machineFieldsInitialized = _useState54[0],
      setMachineFieldsInitialized = _useState54[1];

  var _useState55 = Object(react["useState"])(true),
      isLoading = _useState55[0],
      setIsLoading = _useState55[1]; // near the top of DisplayItem()


  var _useState56 = Object(react["useState"])(false),
      showLocalModalFrom = _useState56[0],
      setShowLocalModalFrom = _useState56[1];

  var _useState57 = Object(react["useState"])(false),
      showLocalModalCurrent = _useState57[0],
      setShowLocalModalCurrent = _useState57[1];

  var openLocalModalFrom = function openLocalModalFrom() {
    return setShowLocalModalFrom(true);
  };

  var closeLocalModalFrom = function closeLocalModalFrom() {
    return setShowLocalModalFrom(false);
  };

  var openLocalModalCurrent = function openLocalModalCurrent() {
    return setShowLocalModalCurrent(true);
  };

  var closeLocalModalCurrent = function closeLocalModalCurrent() {
    return setShowLocalModalCurrent(false);
  }; // at the top of DisplayItem()


  var _useState58 = Object(react["useState"])(false),
      showNewLocalModalFrom = _useState58[0],
      setShowNewLocalModalFrom = _useState58[1];

  var _useState59 = Object(react["useState"])(false),
      showNewLocalModalCurrent = _useState59[0],
      setShowNewLocalModalCurrent = _useState59[1]; // when the From-client changes, clear any old local-loc
  // useEffect(() => {
  //   setNewLocalFrom({ region: "", section: { letter: "", number: "" }, bin: "", pallet: "" });
  // }, [selectedClientFrom]);
  // // when the From-machine changes, clear any old local-loc
  // useEffect(() => {
  //   setNewLocalFrom({ region: "", section: { letter: "", number: "" }, bin: "", pallet: "" });
  // }, [selectedMachine]);
  // same for Current:
  // useEffect(() => {
  //   setNewLocalCurrent({ region: "", section: { letter: "", number: "" }, bin: "", pallet: "" });
  // }, [selectedClientCurrent, selectedCurrentMachine]);
  // const handleSendToInflow = async () => {
  //   try {
  //     const name = items.name;
  //     const description = descriptions[selectedDesc]?.description || "";
  //     // gather every photo URL from Firebase Storage
  //     const imageUrls = photos.map((p) => p.url);
  //     await InflowAPI.upsertProduct({ name, description, imageUrls });
  //     alert("Sent to inFlow successfully!");
  //   } catch (err) {
  //     console.error(err);
  //     alert("Error sending to inFlow: " + err.message);
  //   }
  // };


  var handleSendToInflow = /*#__PURE__*/function () {
    var _ref10 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee() {
      var _descriptions$selecte, name, description, imageUrls, sku, toCSV, arrivalISO, pnStr, snStr, mostRecentWO, customFields, created;

      return regenerator_default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              name = (items.name || '').trim();

              if (name) {
                _context.next = 5;
                break;
              }

              alert('Item needs a name before sending to inFlow.');
              return _context.abrupt("return");

            case 5:
              // Regular description (don’t also send a custom “Description” unless you truly have one)
              description = (((_descriptions$selecte = descriptions[selectedDesc]) === null || _descriptions$selecte === void 0 ? void 0 : _descriptions$selecte.description) || '').trim(); // Photos already fetched from storage

              imageUrls = photos.map(function (p) {
                return p.url;
              }).filter(Boolean); // SKU = your item id

              sku = (id !== null && id !== void 0 ? id : '').toString(); // Basic normalizers

              toCSV = function toCSV(arr) {
                return Array.isArray(arr) ? arr.filter(Boolean).join(', ') : arr || '';
              }; // YYYY-MM-DD for the date field in inFlow


              arrivalISO = items.arrival_date ? new Date(items.arrival_date).toISOString().slice(0, 10) : '';
              pnStr = Array.isArray(items.pn) ? items.pn.filter(Boolean).join(', ') : items.pn || '';
              snStr = Array.isArray(items.sn) ? items.sn.filter(Boolean).join(', ') : items.sn || ''; // Most recent WO (you already have this)

              mostRecentWO = workOrders !== null && workOrders !== void 0 && workOrders.length ? workOrders.reduce(function (latest, cur) {
                return new Date(cur.date) > new Date(latest.date) ? cur : latest;
              }, workOrders[0]) : {
                workOrder: '',
                date: ''
              }; // Build the numbered fields (match your inFlow “Field 1..10”)

              customFields = {
                custom1: (oem || '').trim(),
                // OEM   (dropdown)
                custom2: (modality || '').trim(),
                // Modality (dropdown)
                custom3: (model || '').trim(),
                // Model (dropdown)
                custom4: (description || '').trim(),
                // Description (text) - optional duplicate
                custom5: (mostRecentWO.workOrder || '').trim(),
                // Work Order (text)
                custom6: ((selectedClientFrom === null || selectedClientFrom === void 0 ? void 0 : selectedClientFrom.name) || '').trim(),
                // From (text)
                custom7: pnStr,
                // Product Number (text)
                custom8: snStr,
                // Serial Number (text)
                custom9: arrivalISO,
                // Arrival Date (date)
                custom10: ((selectedClientCurrent === null || selectedClientCurrent === void 0 ? void 0 : selectedClientCurrent.name) || '').trim() // Current (text)

              };
              console.log('[inFlow] customFields to send (numbered):', customFields);
              _context.next = 17;
              return inflowAPI["a" /* default */].upsertProduct({
                name: name,
                description: description,
                sku: sku,
                imageUrls: imageUrls,
                customFields: customFields
              });

            case 17:
              created = _context.sent;
              alert("Sent to inFlow successfully. ID: ".concat((created === null || created === void 0 ? void 0 : created.productId) || (created === null || created === void 0 ? void 0 : created.id) || '(unknown)'));
              _context.next = 25;
              break;

            case 21:
              _context.prev = 21;
              _context.t0 = _context["catch"](0);
              console.error(_context.t0);
              alert('Error sending to inFlow: ' + _context.t0.message);

            case 25:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 21]]);
    }));

    return function handleSendToInflow() {
      return _ref10.apply(this, arguments);
    };
  }(); // const [storedMachine, setStoredMachine] = useState(null);
  // useEffect(() => {
  //   // once any of these three change, re-merge:
  //   if (TheMachine || selectedCurrentMachine || selectedMachine) {
  //     const merged = updateMachineFields(
  //       TheMachine,
  //       selectedCurrentMachine,
  //       selectedMachine
  //     );
  //     setOem(merged.oem);
  //     setModality(merged.modality);
  //     setModel(merged.model);
  //   }
  // }, [TheMachine, selectedCurrentMachine, selectedMachine]);
  // whenever the “From” client changes:


  Object(react["useEffect"])(function () {
    var _selectedClientFrom$n;

    setShowLocalLocFrom((selectedClientFrom === null || selectedClientFrom === void 0 ? void 0 : (_selectedClientFrom$n = selectedClientFrom.name) === null || _selectedClientFrom$n === void 0 ? void 0 : _selectedClientFrom$n.toLowerCase()) === "socalwarehouse");
  }, [selectedClientFrom]); // whenever the “Current” client changes:

  Object(react["useEffect"])(function () {
    var _selectedClientCurren;

    setShowLocalLocCurrent((selectedClientCurrent === null || selectedClientCurrent === void 0 ? void 0 : (_selectedClientCurren = selectedClientCurrent.name) === null || _selectedClientCurren === void 0 ? void 0 : _selectedClientCurren.toLowerCase()) === "socalwarehouse");
  }, [selectedClientCurrent]);

  var loadClients = /*#__PURE__*/function () {
    var _ref11 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee2() {
      var clientsData;
      return regenerator_default.a.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(clientsLoaded || clientsLoading)) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt("return");

            case 2:
              setClientsLoading(true);
              _context2.prev = 3;
              _context2.next = 6;
              return Object(fetchAssociations["a" /* fetchClients */])();

            case 6:
              clientsData = _context2.sent;
              setClients(clientsData);
              setClientsLoaded(true);
              _context2.next = 14;
              break;

            case 11:
              _context2.prev = 11;
              _context2.t0 = _context2["catch"](3);
              console.error("Error fetching clients: ", _context2.t0);

            case 14:
              _context2.prev = 14;
              setClientsLoading(false);
              return _context2.finish(14);

            case 17:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[3, 11, 14, 17]]);
    }));

    return function loadClients() {
      return _ref11.apply(this, arguments);
    };
  }();

  var loadPnSnOptions = /*#__PURE__*/function () {
    var _ref12 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee3() {
      var db, snapshot, pnSet, snSet;
      return regenerator_default.a.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!(pnSnLoaded || pnSnLoading)) {
                _context3.next = 2;
                break;
              }

              return _context3.abrupt("return");

            case 2:
              setPnSnLoading(true);
              _context3.prev = 3;
              db = Firebase["b" /* default */].firestore();
              _context3.next = 7;
              return db.collection("Test").orderBy(Firebase["b" /* default */].firestore.FieldPath.documentId()).limit(500).get();

            case 7:
              snapshot = _context3.sent;
              pnSet = new Set();
              snSet = new Set();
              snapshot.forEach(function (doc) {
                var data = doc.data();

                if (Array.isArray(data.pn)) {
                  data.pn.forEach(function (pn) {
                    return pn && pnSet.add(pn);
                  });
                } else if (data.pn) {
                  pnSet.add(data.pn);
                }

                if (Array.isArray(data.sn)) {
                  data.sn.forEach(function (sn) {
                    return sn && snSet.add(sn);
                  });
                } else if (data.sn) {
                  snSet.add(data.sn);
                }
              });
              setPnOptions(Object(toConsumableArray["a" /* default */])(pnSet));
              setSnOptions(Object(toConsumableArray["a" /* default */])(snSet));
              setPnSnLoaded(true);
              _context3.next = 19;
              break;

            case 16:
              _context3.prev = 16;
              _context3.t0 = _context3["catch"](3);
              console.error("Error fetching PN/SN options:", _context3.t0);

            case 19:
              _context3.prev = 19;
              setPnSnLoading(false);
              return _context3.finish(19);

            case 22:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[3, 16, 19, 22]]);
    }));

    return function loadPnSnOptions() {
      return _ref12.apply(this, arguments);
    };
  }();

  Object(react["useEffect"])(function () {
    if (id) fetchData(); // always hydrate on the client
  }, [id]);

  function resolveClientFromMachine(_x, _x2, _x3) {
    return _resolveClientFromMachine.apply(this, arguments);
  }

  function _resolveClientFromMachine() {
    _resolveClientFromMachine = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee16(machineRef, setClient, setMachine) {
      var isFrom,
          machineDoc,
          _machineData$name,
          machineData,
          clientDoc,
          clientName,
          isSocalInterior,
          shouldShow,
          _clientDoc2,
          _args16 = arguments;

      return regenerator_default.a.wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              isFrom = _args16.length > 3 && _args16[3] !== undefined ? _args16[3] : true;
              _context16.next = 3;
              return machineRef.get();

            case 3:
              machineDoc = _context16.sent;

              if (!machineDoc.exists) {
                _context16.next = 24;
                break;
              }

              machineData = machineDoc.data();
              setMachine(_id_objectSpread({
                id: machineDoc.id
              }, machineData)); // Determine if the machine is "interior socal"
              // const isSocalInterior = machineData.name && machineData.name.toLowerCase() === "interior socal";
              // if (isSocalInterior) {
              //   if (isFrom) {
              //     setShowLocalLocFrom(true);
              //   } else {
              //     setShowLocalLocCurrent(true);
              //   }
              // } else {
              // Optionally clear the flag if it is not "interior socal"
              // if (isFrom) {
              //   setShowLocalLocFrom(false);
              // } else {
              //   setShowLocalLocCurrent(false);
              // }
              // }
              // new: fetch client name and combine both checks

              if (!(machineData.client && typeof machineData.client.get === "function")) {
                _context16.next = 13;
                break;
              }

              _context16.next = 10;
              return machineData.client.get();

            case 10:
              _context16.t0 = _context16.sent;
              _context16.next = 14;
              break;

            case 13:
              _context16.t0 = null;

            case 14:
              clientDoc = _context16.t0;
              clientName = clientDoc && clientDoc.exists ? clientDoc.data().name : null;
              isSocalInterior = ((_machineData$name = machineData.name) === null || _machineData$name === void 0 ? void 0 : _machineData$name.toLowerCase()) === "interior socal";
              shouldShow = isSocalInterior || clientName === "SoCalWarehouse";

              if (isFrom) {
                setShowLocalLocFrom(shouldShow);
              } else {
                setShowLocalLocCurrent(shouldShow);
              }

              if (!(machineData.client && typeof machineData.client.get === "function")) {
                _context16.next = 24;
                break;
              }

              _context16.next = 22;
              return machineData.client.get();

            case 22:
              _clientDoc2 = _context16.sent;

              if (_clientDoc2.exists) {
                setClient(_id_objectSpread({
                  id: _clientDoc2.id
                }, _clientDoc2.data()));
              }

            case 24:
            case "end":
              return _context16.stop();
          }
        }
      }, _callee16);
    }));
    return _resolveClientFromMachine.apply(this, arguments);
  }

  var fetchData = /*#__PURE__*/function () {
    var _ref13 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee4() {
      var id, db, doc, _machineFromData, _machineFromData$name, _machineCurrentData, _machineCurrentData$n, _selectedClientFrom$n2, _selectedClientCurren2, data, normalizedPN, normalizedSN, clientFromDoc, clientCurrentDoc, machineFromData, machineCurrentData, _doc, _doc2, nameFrom, nameCurrent, theMachineData, _theMachineData$oem, _theMachineData$modal, _theMachineData$model, OEM, Modality, Model, merged, parentDoc;

      return regenerator_default.a.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              id = (initialItem === null || initialItem === void 0 ? void 0 : initialItem.id) || idFromRouter; // <- make sure id exists here

              if (id) {
                _context4.next = 3;
                break;
              }

              return _context4.abrupt("return");

            case 3:
              setIsLoading(true);
              db = Firebase["b" /* default */].firestore();
              _context4.prev = 5;
              _context4.next = 8;
              return db.collection("Test").doc(id).get();

            case 8:
              doc = _context4.sent;

              if (!doc.exists) {
                _context4.next = 75;
                break;
              }

              console.log("test");
              data = doc.data();
              normalizedPN = Array.isArray(data.pn) ? data.pn : [data.pn];
              normalizedSN = Array.isArray(data.sn) ? data.sn : [data.sn];
              setItems(_id_objectSpread(_id_objectSpread({}, data), {}, {
                pn: normalizedPN,
                sn: normalizedSN
              }));
              setSavedName(data.name || "");
              setDescriptions(data.descriptions || []);
              setWorkOrders(data.workOrders || []);
              if (data.localLocFrom) setLocalLocFrom(data.localLocFrom);
              if (data.localLocCurrent) setLocalLocCurrent(data.localLocCurrent);

              if (data.DOM) {
                setDOM(data.DOM);
              } // …after you do setItems, setDescriptions, etc.
              // load the “newLocal” maps


              if (data.newLocalFrom) setNewLocalFrom(data.newLocalFrom);
              if (data.newLocalCurrent) setNewLocalCurrent(data.newLocalCurrent); // Load PO Number if it exists.

              if (data.poNumber) {
                setItems(function (prev) {
                  return _id_objectSpread(_id_objectSpread({}, prev), {}, {
                    poNumber: data.poNumber
                  });
                });
              }

              if (!data.ClientFrom) {
                _context4.next = 29;
                break;
              }

              _context4.next = 27;
              return data.ClientFrom.get();

            case 27:
              clientFromDoc = _context4.sent;

              if (clientFromDoc.exists) {
                setSelectedClientFrom(_id_objectSpread({
                  id: clientFromDoc.id
                }, clientFromDoc.data()));
              }

            case 29:
              if (!data.ClientCurrent) {
                _context4.next = 34;
                break;
              }

              _context4.next = 32;
              return data.ClientCurrent.get();

            case 32:
              clientCurrentDoc = _context4.sent;

              if (clientCurrentDoc.exists) {
                setSelectedClientCurrent(_id_objectSpread({
                  id: clientCurrentDoc.id
                }, clientCurrentDoc.data()));
              }

            case 34:
              if (!(!data.ClientFrom && data.Machine && typeof data.Machine.get === "function")) {
                _context4.next = 38;
                break;
              }

              console.log("Entered resolveClientFromMachine for Machine (old style for From)");
              _context4.next = 38;
              return resolveClientFromMachine(data.Machine, setSelectedClientFrom, setSelectedMachine, true);

            case 38:
              if (!(!data.ClientCurrent && data.CurrentMachine && typeof data.CurrentMachine.get === "function")) {
                _context4.next = 42;
                break;
              }

              console.log("Entered resolveClientFromMachine for CurrentMachine (old style for Current)");
              _context4.next = 42;
              return resolveClientFromMachine(data.CurrentMachine, setSelectedClientCurrent, setSelectedCurrentMachine, false);

            case 42:
              machineFromData = null;
              machineCurrentData = null;

              if (!data.MachineFrom) {
                _context4.next = 50;
                break;
              }

              _context4.next = 47;
              return data.MachineFrom.get();

            case 47:
              _doc = _context4.sent;
              machineFromData = _doc.exists ? _doc.data() : null;
              setSelectedMachine(_id_objectSpread({
                id: _doc.id
              }, _doc.data()));

            case 50:
              if (!data.MachineCurrent) {
                _context4.next = 56;
                break;
              }

              _context4.next = 53;
              return data.MachineCurrent.get();

            case 53:
              _doc2 = _context4.sent;
              machineCurrentData = _doc2.exists ? _doc2.data() : null;
              setSelectedCurrentMachine(_id_objectSpread({
                id: _doc2.id
              }, _doc2.data()));

            case 56:
              nameFrom = (_machineFromData = machineFromData) === null || _machineFromData === void 0 ? void 0 : (_machineFromData$name = _machineFromData.name) === null || _machineFromData$name === void 0 ? void 0 : _machineFromData$name.toLowerCase();
              nameCurrent = (_machineCurrentData = machineCurrentData) === null || _machineCurrentData === void 0 ? void 0 : (_machineCurrentData$n = _machineCurrentData.name) === null || _machineCurrentData$n === void 0 ? void 0 : _machineCurrentData$n.toLowerCase(); // If the machine’s name is “interior socal”, show that branch:
              // setShowLocalLocFrom(nameFrom === "interior socal");
              // // Or if your Firestore already has a value for localLocFrom, show it anyway:
              // if (data.localLocFrom) setShowLocalLocFrom(true);
              // setShowLocalLocCurrent(nameCurrent === "interior socal");
              // if (data.localLocCurrent) setShowLocalLocCurrent(true);
              // new: combine machine-name OR client-name check, keep existing-data

              setShowLocalLocFrom(nameFrom === "interior socal" || (selectedClientFrom === null || selectedClientFrom === void 0 ? void 0 : (_selectedClientFrom$n2 = selectedClientFrom.name) === null || _selectedClientFrom$n2 === void 0 ? void 0 : _selectedClientFrom$n2.toLowerCase()) === "socalwarehouse" || Boolean(data.localLocFrom));
              setShowLocalLocCurrent(nameCurrent === "interior socal" || (selectedClientCurrent === null || selectedClientCurrent === void 0 ? void 0 : (_selectedClientCurren2 = selectedClientCurrent.name) === null || _selectedClientCurren2 === void 0 ? void 0 : _selectedClientCurren2.toLowerCase()) === "socalwarehouse" || Boolean(data.localLocCurrent));
              theMachineData = data.TheMachine || null;
              setTheMachine(theMachineData);

              if (theMachineData) {
                // pull both variants, prefer lowercase if it exists
                OEM = (_theMachineData$oem = theMachineData.oem) !== null && _theMachineData$oem !== void 0 ? _theMachineData$oem : theMachineData.OEM;
                Modality = (_theMachineData$modal = theMachineData.modality) !== null && _theMachineData$modal !== void 0 ? _theMachineData$modal : theMachineData.Modality;
                Model = (_theMachineData$model = theMachineData.model) !== null && _theMachineData$model !== void 0 ? _theMachineData$model : theMachineData.Model;
                setTheMachine(_id_objectSpread(_id_objectSpread({}, theMachineData), {}, {
                  OEM: OEM,
                  Modality: Modality,
                  Model: Model
                }));
              } // setStoredMachine(theMachineData);
              // **right here** merge from the three sources you just fetched:


              merged = Object(itemFormShared["d" /* updateMachineFields */])(theMachineData, machineCurrentData, machineFromData);
              applyMergedMachineFields(merged);
              console.log("SelectedMachine:", selectedMachine, "SelectedCurrentMachine:", selectedCurrentMachine); // Show local loc inputs if applicable
              // if (
              //   selectedMachine &&
              //   selectedMachine.name &&
              //   selectedMachine.name.toLowerCase() === "interior socal"
              // ) {
              //   setShowLocalLocFrom(true);
              // }
              // if (
              //   selectedCurrentMachine &&
              //   selectedCurrentMachine.name &&
              //   selectedCurrentMachine.name.toLowerCase() === "interior socal"
              // ) {
              //   setShowLocalLocCurrent(true);
              // }

              if (!data.Parent) {
                _context4.next = 71;
                break;
              }

              _context4.next = 69;
              return data.Parent.get();

            case 69:
              parentDoc = _context4.sent;
              setSelectedParent(_id_objectSpread({
                id: parentDoc.id
              }, parentDoc.data()));

            case 71:
              // Priority auto‑population of machine fields.
              // const updatedFields = updateMachineFields(storedMachine, selectedCurrentMachine, selectedMachine);
              // // console.log("Updated machine fields:", updatedFields);
              // setOem(updatedFields.oem);
              // setModality(updatedFields.modality);
              // setModel(updatedFields.model);
              setIsLoading(false);
              Promise.all([fetchPhotos(id), checkIfAddedToWebsite(id), calculateItemFrequencyAndUsage(data.pn)])["catch"](function (err) {
                console.error("Background item loads failed:", err);
              });
              _context4.next = 76;
              break;

            case 75:
              router.push({
                pathname: "../AddItem/NewItem",
                query: {
                  signal: id
                }
              });

            case 76:
              _context4.next = 81;
              break;

            case 78:
              _context4.prev = 78;
              _context4.t0 = _context4["catch"](5);
              console.error("Error fetching item:", _context4.t0);

            case 81:
              _context4.prev = 81;
              setIsLoading(false);
              return _context4.finish(81);

            case 84:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[5, 78, 81, 84]]);
    }));

    return function fetchData() {
      return _ref13.apply(this, arguments);
    };
  }();

  var calculateItemFrequencyAndUsage = /*#__PURE__*/function () {
    var _ref14 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee5(pn) {
      var db, currentDate, oneYearAgo, normalizedPN, itemsSnapshot, usagePastYear;
      return regenerator_default.a.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              db = Firebase["b" /* default */].firestore();
              currentDate = new Date();
              oneYearAgo = new Date();
              oneYearAgo.setFullYear(currentDate.getFullYear() - 1);
              normalizedPN = pn !== undefined ? pn : "";
              _context5.next = 7;
              return db.collection("Test").where("pn", "==", normalizedPN).get();

            case 7:
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

            case 12:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    return function calculateItemFrequencyAndUsage(_x4) {
      return _ref14.apply(this, arguments);
    };
  }();

  var fetchMachine = /*#__PURE__*/function () {
    var _ref15 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee6(machineId) {
      var db, doc, machineData, merged, machinesSnapshot;
      return regenerator_default.a.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              db = Firebase["b" /* default */].firestore();
              _context6.next = 3;
              return db.collection("Machine").doc(machineId).get();

            case 3:
              doc = _context6.sent;

              if (!doc.exists) {
                _context6.next = 15;
                break;
              }

              machineData = doc.data();
              setTheMachine(machineData); // re-merge all three sources with correct priority:

              merged = Object(itemFormShared["d" /* updateMachineFields */])(machineData, selectedCurrentMachine, selectedMachine);
              applyMergedMachineFields(merged);
              _context6.next = 11;
              return db.collection("Machine").where("Model", "==", machineData.Model || machineData.model).get();

            case 11:
              machinesSnapshot = _context6.sent;
              setMachineFrequency(machinesSnapshot.size);
              _context6.next = 16;
              break;

            case 15:
              console.error("Machine not found");

            case 16:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    return function fetchMachine(_x5) {
      return _ref15.apply(this, arguments);
    };
  }();

  var fetchPhotos = /*#__PURE__*/function () {
    var _ref16 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee7(docID) {
      var storageRef, listRef, res, urls;
      return regenerator_default.a.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              storageRef = Firebase["b" /* default */].storage().ref();
              listRef = storageRef.child("Parts/".concat(docID));
              _context7.prev = 2;
              _context7.next = 5;
              return listRef.listAll();

            case 5:
              res = _context7.sent;
              _context7.next = 8;
              return Promise.all(res.items.map(function (item) {
                return item.getDownloadURL();
              }));

            case 8:
              urls = _context7.sent;
              setPhotos(urls.map(function (url) {
                return {
                  url: url,
                  file: null
                };
              }));
              _context7.next = 15;
              break;

            case 12:
              _context7.prev = 12;
              _context7.t0 = _context7["catch"](2);
              console.error("Error fetching photos: ", _context7.t0);

            case 15:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, null, [[2, 12]]);
    }));

    return function fetchPhotos(_x6) {
      return _ref16.apply(this, arguments);
    };
  }();

  var checkIfAddedToWebsite = /*#__PURE__*/function () {
    var _ref17 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee8(docID) {
      var db, partsDoc;
      return regenerator_default.a.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              db = Firebase["b" /* default */].firestore();
              _context8.next = 3;
              return db.collection("Parts").doc(docID).get();

            case 3:
              partsDoc = _context8.sent;

              if (partsDoc.exists) {
                setAddToWebsite(true);
              }

            case 5:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    }));

    return function checkIfAddedToWebsite(_x7) {
      return _ref17.apply(this, arguments);
    };
  }();

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

  var handleClosePrintModal = function handleClosePrintModal() {
    return setShowPrintModal(false);
  };

  var handleShowSaveModal = function handleShowSaveModal() {
    return setShowSaveModal(true);
  };

  var handleShowPrintModal = function handleShowPrintModal() {
    return setShowPrintModal(true);
  };

  var handleMachineSelectionModal = function handleMachineSelectionModal() {
    return setMachineSelectionModal(false);
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

  var handleShowClientModal = /*#__PURE__*/function () {
    var _ref18 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee9() {
      return regenerator_default.a.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return loadClients();

            case 2:
              setShowClientModal(true);

            case 3:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    }));

    return function handleShowClientModal() {
      return _ref18.apply(this, arguments);
    };
  }();

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
  }; // When a client is selected from the client table.


  var handleClientInfo = /*#__PURE__*/function () {
    var _ref19 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee10(clientId) {
      var db, clientDoc, clientData, machinePromises, machineDocs, machines;
      return regenerator_default.a.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              // Clear any previously selected machine and local loc info for this branch.
              if (machinePick) {
                setSelectedMachine(null);
                setShowLocalLocFrom(false);
              } else {
                setSelectedCurrentMachine(null);
                setShowLocalLocCurrent(false);
              }

              db = Firebase["b" /* default */].firestore();
              _context10.next = 4;
              return db.collection("Client").doc(clientId).get();

            case 4:
              clientDoc = _context10.sent;

              if (!clientDoc.exists) {
                _context10.next = 16;
                break;
              }

              clientData = _id_objectSpread({
                id: clientDoc.id
              }, clientDoc.data());

              if (machinePick) {
                setSelectedClientFrom(clientData);
              } else {
                setSelectedClientCurrent(clientData);
              } // after setting selectedClientFrom/Current:


              if (clientData.name === "SoCalWarehouse") {
                if (machinePick) setShowLocalLocFrom(true);else setShowLocalLocCurrent(true);
              } // Fetch machines for this client:


              machinePromises = clientData.machines.map(function (machineRef) {
                return machineRef.get();
              });
              _context10.next = 12;
              return Promise.all(machinePromises);

            case 12:
              machineDocs = _context10.sent;
              machines = machineDocs.map(function (machineDoc) {
                return _id_objectSpread({
                  id: machineDoc.id
                }, machineDoc.data());
              });
              setMachineOptions(machines); // Close the client modal

              handleCloseClientModal();

            case 16:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10);
    }));

    return function handleClientInfo(_x8) {
      return _ref19.apply(this, arguments);
    };
  }(); // Reordering function for dropdowns.


  var reorderArray = function reorderArray(arr, selectedValue) {
    var newArr = arr.filter(function (val) {
      return val !== selectedValue;
    });
    return [selectedValue].concat(Object(toConsumableArray["a" /* default */])(newArr));
  };

  var _useState60 = Object(react["useState"])(false),
      addingNewPn = _useState60[0],
      setAddingNewPn = _useState60[1];

  var _useState61 = Object(react["useState"])(""),
      newPn = _useState61[0],
      setNewPn = _useState61[1];

  var _useState62 = Object(react["useState"])(false),
      addingNewSn = _useState62[0],
      setAddingNewSn = _useState62[1];

  var _useState63 = Object(react["useState"])(""),
      newSn = _useState63[0],
      setNewSn = _useState63[1];

  var handlePnSelect = function handlePnSelect(e) {
    var selected = e.target.value;
    setItems(function (prev) {
      var updatedPn = Array.isArray(prev.pn) ? Object(toConsumableArray["a" /* default */])(prev.pn) : [];
      updatedPn[0] = selected;
      return _id_objectSpread(_id_objectSpread({}, prev), {}, {
        pn: updatedPn
      });
    });
  };

  var handleSnSelect = function handleSnSelect(e) {
    var selected = e.target.value;
    setItems(function (prev) {
      var updatedSn = Array.isArray(prev.sn) ? Object(toConsumableArray["a" /* default */])(prev.sn) : [];
      updatedSn[0] = selected;
      return _id_objectSpread(_id_objectSpread({}, prev), {}, {
        sn: updatedSn
      });
    });
  };

  var handleAddNewPn = function handleAddNewPn() {
    if (newPn.trim() !== "") {
      setItems(function (prev) {
        return _id_objectSpread(_id_objectSpread({}, prev), {}, {
          pn: [].concat(Object(toConsumableArray["a" /* default */])(prev.pn), [newPn.trim()])
        });
      });
    }

    setNewPn("");
    setAddingNewPn(false);
  };

  var handleAddNewSn = function handleAddNewSn() {
    if (newSn.trim() !== "") {
      setItems(function (prev) {
        return _id_objectSpread(_id_objectSpread({}, prev), {}, {
          sn: [].concat(Object(toConsumableArray["a" /* default */])(prev.sn), [newSn.trim()])
        });
      });
    }

    setNewSn("");
    setAddingNewSn(false);
  }; // Generate custom document ID if needed.


  var generateCustomID = function generateCustomID() {
    var randomNum = Math.floor(10000 + Math.random() * 90000);
    return "AIS".concat(randomNum);
  };

  function shallowClean(obj) {
    var newObj = {};

    for (var key in obj) {
      console.log(key, obj[key]);

      if (obj.hasOwnProperty(key)) {
        newObj[key] = obj[key] === undefined ? "" : obj[key];
      }
    }

    return newObj;
  }

  function toSend() {
    return _toSend.apply(this, arguments);
  } // Additional state for local warehouse location inputs.


  function _toSend() {
    _toSend = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee17() {
      var _fromDetails$section, _fromDetails$section2, _currentDetails$secti, _currentDetails$secti2;

      var db, currentUser, userEmail, machineData, formattedItems, fromDetails, currentDetails, docId, newDocId, machineRef, machineDoc, currentMachineRef, currentMachineDoc, cleanFormattedItems, _machineRef, _machineDoc, _currentMachineRef, _currentMachineDoc, _machineRef2, _machineDoc2, _currentMachineRef2, _currentMachineDoc2;

      return regenerator_default.a.wrap(function _callee17$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              db = Firebase["b" /* default */].firestore();
              currentUser = Firebase["b" /* default */].auth().currentUser;
              userEmail = currentUser ? currentUser.email : "unknown"; // Always use the current state values for OEM, modality, and model.

              machineData = _id_objectSpread(_id_objectSpread({}, TheMachine || {}), {}, {
                oem: oem,
                modality: modality,
                model: model
              });
              formattedItems = _id_objectSpread(_id_objectSpread({}, items), {}, {
                descriptions: descriptions,
                workOrders: workOrders
              }); // Remove any unused fields.

              formattedItems.status = items.status || "";
              formattedItems.nameLower = (items.name || "").toLowerCase();
              formattedItems.nameTokens = Object(itemFormShared["b" /* buildNameTokens */])(items.name);
              formattedItems.DOM = DOM; // Date of Manufacture

              formattedItems.localLocFrom = localLocFrom || "";
              formattedItems.localLocCurrent = localLocCurrent || "";
              formattedItems.date = items.date || "";
              formattedItems.arrival_date = items.arrival_date || ""; // NEW: Arrival Date

              formattedItems.poNumber = items.poNumber || "";
              formattedItems.trackingNumber = items.trackingNumber || "";
              formattedItems.TheMachine = machineData || {};
              formattedItems.addedToWebsite = addToWebsite; // NEW: Add the user's email under the field "user"

              formattedItems.lastEdited = userEmail; // Clean pn and sn arrays to replace undefined values with an empty string.

              formattedItems.pn = (items.pn || []).map(function (value) {
                return value === undefined ? "" : value;
              });
              formattedItems.sn = (items.sn || []).map(function (value) {
                return value === undefined ? "" : value;
              });
              fromDetails = Object(itemFormShared["a" /* buildLocalLocObject */])(newLocalFrom);
              currentDetails = Object(itemFormShared["a" /* buildLocalLocObject */])(newLocalCurrent);
              console.log("From Details: " + fromDetails.region + " " + ((_fromDetails$section = fromDetails.section) === null || _fromDetails$section === void 0 ? void 0 : _fromDetails$section.letter) + ((_fromDetails$section2 = fromDetails.section) === null || _fromDetails$section2 === void 0 ? void 0 : _fromDetails$section2.number) + " " + fromDetails.bin + " " + fromDetails.pallet);
              console.log("Current Details: " + currentDetails.region + " " + ((_currentDetails$secti = currentDetails.section) === null || _currentDetails$secti === void 0 ? void 0 : _currentDetails$secti.letter) + ((_currentDetails$secti2 = currentDetails.section) === null || _currentDetails$secti2 === void 0 ? void 0 : _currentDetails$secti2.number) + " " + currentDetails.bin + " " + currentDetails.pallet);

              if (Object.keys(fromDetails).length) {
                formattedItems.newLocalFrom = fromDetails;
                formattedItems.localLocFrom = Object(itemFormShared["c" /* formatLoc */])(newLocalFrom) || "";
              } else {
                // all fields empty — force an empty string and remove any stray map
                console.log("entered empty fromDetails else");
                formattedItems.localLocFrom = "";
                formattedItems.newLocalFrom = {};
              }

              if (Object.keys(currentDetails).length) {
                formattedItems.newLocalCurrent = currentDetails;
                formattedItems.localLocCurrent = Object(itemFormShared["c" /* formatLoc */])(newLocalCurrent) || "";
              } else {
                // all fields empty — force an empty string and remove any stray map
                formattedItems.localLocCurrent = "";
                formattedItems.newLocalCurrent = {};
              }

              if (selectedMachine && selectedMachine.id) {
                formattedItems.MachineFrom = db.collection("Machine").doc(selectedMachine.id);
              }

              if (selectedCurrentMachine && selectedCurrentMachine.id) {
                formattedItems.MachineCurrent = db.collection("Machine").doc(selectedCurrentMachine.id);
              }

              if (selectedParent && selectedParent.id) {
                formattedItems.Parent = db.collection("Test").doc(selectedParent.id);
              } // NEW: Set separate client references.


              if (selectedClientFrom && selectedClientFrom.id) {
                formattedItems.ClientFrom = db.collection("Client").doc(selectedClientFrom.id);
              }

              if (selectedClientCurrent && selectedClientCurrent.id) {
                formattedItems.ClientCurrent = db.collection("Client").doc(selectedClientCurrent.id);
              } // Only attach the richer “newLocal” map when the user actually filled something in


              if (Object.keys(fromDetails).length) {
                formattedItems.newLocalFrom = fromDetails;
              }

              if (Object.keys(currentDetails).length) {
                formattedItems.newLocalCurrent = currentDetails;
              }

              docId = id;
              _context17.prev = 34;

              if (!docId) {
                _context17.next = 82;
                break;
              }

              // Check if a localSN is provided and if it differs from the current docId.
              newDocId = items.localSN && items.localSN.trim() !== "" ? items.localSN.trim() : docId;

              if (!(docId !== newDocId)) {
                _context17.next = 61;
                break;
              }

              _context17.next = 40;
              return db.collection("Test").doc(newDocId).set(formattedItems);

            case 40:
              if (!(selectedMachine && selectedMachine.id)) {
                _context17.next = 48;
                break;
              }

              machineRef = db.collection("Machine").doc(selectedMachine.id);
              _context17.next = 44;
              return machineRef.get();

            case 44:
              machineDoc = _context17.sent;

              if (!machineDoc.exists) {
                _context17.next = 48;
                break;
              }

              _context17.next = 48;
              return machineRef.update({
                associatedParts: Firebase["b" /* default */].firestore.FieldValue.arrayUnion(db.collection("Test").doc(newDocId))
              });

            case 48:
              if (!(selectedCurrentMachine && selectedCurrentMachine.id)) {
                _context17.next = 56;
                break;
              }

              currentMachineRef = db.collection("Machine").doc(selectedCurrentMachine.id);
              _context17.next = 52;
              return currentMachineRef.get();

            case 52:
              currentMachineDoc = _context17.sent;

              if (!currentMachineDoc.exists) {
                _context17.next = 56;
                break;
              }

              _context17.next = 56;
              return currentMachineRef.update({
                associatedParts: Firebase["b" /* default */].firestore.FieldValue.arrayUnion(db.collection("Test").doc(newDocId))
              });

            case 56:
              _context17.next = 58;
              return db.collection("Test").doc(docId)["delete"]();

            case 58:
              // Set docId to the new document ID.
              docId = newDocId;
              _context17.next = 80;
              break;

            case 61:
              // Deep-clean the formattedItems to remove any undefined nested values.
              cleanFormattedItems = shallowClean(formattedItems);
              _context17.next = 64;
              return db.collection("Test").doc(docId).update(cleanFormattedItems);

            case 64:
              if (!(selectedMachine && selectedMachine.id)) {
                _context17.next = 72;
                break;
              }

              _machineRef = db.collection("Machine").doc(selectedMachine.id);
              _context17.next = 68;
              return _machineRef.get();

            case 68:
              _machineDoc = _context17.sent;

              if (!_machineDoc.exists) {
                _context17.next = 72;
                break;
              }

              _context17.next = 72;
              return _machineRef.update({
                associatedParts: Firebase["b" /* default */].firestore.FieldValue.arrayUnion(db.collection("Test").doc(docId))
              });

            case 72:
              if (!(selectedCurrentMachine && selectedCurrentMachine.id)) {
                _context17.next = 80;
                break;
              }

              _currentMachineRef = db.collection("Machine").doc(selectedCurrentMachine.id);
              _context17.next = 76;
              return _currentMachineRef.get();

            case 76:
              _currentMachineDoc = _context17.sent;

              if (!_currentMachineDoc.exists) {
                _context17.next = 80;
                break;
              }

              _context17.next = 80;
              return _currentMachineRef.update({
                associatedParts: Firebase["b" /* default */].firestore.FieldValue.arrayUnion(db.collection("Test").doc(docId))
              });

            case 80:
              _context17.next = 101;
              break;

            case 82:
              // For a new item, if localSN is provided, use it; otherwise, generate a custom ID.
              docId = items.localSN && items.localSN.trim() !== "" ? items.localSN.trim() : generateCustomID();
              _context17.next = 85;
              return db.collection("Test").doc(docId).set(formattedItems);

            case 85:
              if (!(selectedMachine && selectedMachine.id)) {
                _context17.next = 93;
                break;
              }

              _machineRef2 = db.collection("Machine").doc(selectedMachine.id);
              _context17.next = 89;
              return _machineRef2.get();

            case 89:
              _machineDoc2 = _context17.sent;

              if (!_machineDoc2.exists) {
                _context17.next = 93;
                break;
              }

              _context17.next = 93;
              return _machineRef2.update({
                associatedParts: Firebase["b" /* default */].firestore.FieldValue.arrayUnion(db.collection("Test").doc(docId))
              });

            case 93:
              if (!(selectedCurrentMachine && selectedCurrentMachine.id)) {
                _context17.next = 101;
                break;
              }

              _currentMachineRef2 = db.collection("Machine").doc(selectedCurrentMachine.id);
              _context17.next = 97;
              return _currentMachineRef2.get();

            case 97:
              _currentMachineDoc2 = _context17.sent;

              if (!_currentMachineDoc2.exists) {
                _context17.next = 101;
                break;
              }

              _context17.next = 101;
              return _currentMachineRef2.update({
                associatedParts: Firebase["b" /* default */].firestore.FieldValue.arrayUnion(db.collection("Test").doc(docId))
              });

            case 101:
              _context17.next = 103;
              return uploadPhotos(docId);

            case 103:
              console.log("Item saved and associatedParts updated!");
              setSavedName(items.name || ""); // Redirect to the new URL using the new document id.

              router.push("/NewSearch/item/".concat(docId)); // Optionally, you can also show a save confirmation modal:

              handleShowSaveModal();
              _context17.next = 112;
              break;

            case 109:
              _context17.prev = 109;
              _context17.t0 = _context17["catch"](34);
              console.error("Error saving data:", _context17.t0);

            case 112:
            case "end":
              return _context17.stop();
          }
        }
      }, _callee17, null, [[34, 109]]);
    }));
    return _toSend.apply(this, arguments);
  }

  var _useState64 = Object(react["useState"])(false),
      showLocalLocFrom = _useState64[0],
      setShowLocalLocFrom = _useState64[1];

  var _useState65 = Object(react["useState"])(false),
      showLocalLocCurrent = _useState65[0],
      setShowLocalLocCurrent = _useState65[1]; // When a machine is selected from the modal.


  var handleSetSelectedMachine = function handleSetSelectedMachine(machine) {
    var _machine$name;

    // const condition = (name) => name && name.toLowerCase() === "interior socal";
    var isSocalInterior = ((_machine$name = machine.name) === null || _machine$name === void 0 ? void 0 : _machine$name.toLowerCase()) === "interior socal";

    if (machinePick) {
      var _selectedClientFrom$n3;

      setSelectedMachine({
        id: machine.id,
        name: machine.name
      });
      setShowLocalLocFrom(isSocalInterior || (selectedClientFrom === null || selectedClientFrom === void 0 ? void 0 : (_selectedClientFrom$n3 = selectedClientFrom.name) === null || _selectedClientFrom$n3 === void 0 ? void 0 : _selectedClientFrom$n3.toLowerCase()) === "socalwarehouse");
    } else {
      var _selectedClientCurren3;

      setSelectedCurrentMachine({
        id: machine.id,
        name: machine.name
      });
      setShowLocalLocCurrent(isSocalInterior || (selectedClientCurrent === null || selectedClientCurrent === void 0 ? void 0 : (_selectedClientCurren3 = selectedClientCurrent.name) === null || _selectedClientCurren3 === void 0 ? void 0 : _selectedClientCurren3.toLowerCase()) === "socalwarehouse");
    }

    fetchMachine(machine.id); // Close the machine modal (assuming you're using showMachineModal to control it)

    setShowMachineModal(false);
  };

  var uploadPhotos = /*#__PURE__*/function () {
    var _ref20 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee11(docID) {
      var storageRef, i, photoRef, metadata, url;
      return regenerator_default.a.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              storageRef = Firebase["b" /* default */].storage().ref();
              i = 0;

            case 2:
              if (!(i < photos.length)) {
                _context11.next = 15;
                break;
              }

              if (!photos[i].file) {
                _context11.next = 12;
                break;
              }

              photoRef = storageRef.child("Parts/".concat(docID, "/").concat(docID).concat(i === 0 ? ".jpg" : ".".concat(i + 1, ".jpg")));
              metadata = {
                contentType: "image/png"
              };
              _context11.next = 8;
              return photoRef.put(photos[i].file, metadata);

            case 8:
              _context11.next = 10;
              return photoRef.getDownloadURL();

            case 10:
              url = _context11.sent;
              photos[i].url = url;

            case 12:
              i++;
              _context11.next = 2;
              break;

            case 15:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11);
    }));

    return function uploadPhotos(_x9) {
      return _ref20.apply(this, arguments);
    };
  }(); // Function to handle printing the label.


  var handlePrint = /*#__PURE__*/function () {
    var _ref21 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee12() {
      var clientName, machineDoc, machineData, clientDoc, _clientDoc, payload, response, result;

      return regenerator_default.a.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              if (items.name) {
                _context12.next = 3;
                break;
              }

              alert("Missing name");
              return _context12.abrupt("return");

            case 3:
              clientName = ""; // Attempt to fetch client name from the Machine document reference.

              if (!(items.Machine && typeof items.Machine.get === "function")) {
                _context12.next = 23;
                break;
              }

              _context12.prev = 5;
              _context12.next = 8;
              return items.Machine.get();

            case 8:
              machineDoc = _context12.sent;

              if (!machineDoc.exists) {
                _context12.next = 16;
                break;
              }

              machineData = machineDoc.data();

              if (!(machineData.client && typeof machineData.client.get === "function")) {
                _context12.next = 16;
                break;
              }

              _context12.next = 14;
              return machineData.client.get();

            case 14:
              clientDoc = _context12.sent;

              if (clientDoc.exists) {
                clientName = clientDoc.data().name || "";
              }

            case 16:
              _context12.next = 21;
              break;

            case 18:
              _context12.prev = 18;
              _context12.t0 = _context12["catch"](5);
              console.error("Error fetching machine or client:", _context12.t0);

            case 21:
              _context12.next = 24;
              break;

            case 23:
              console.warn("No Machine reference available in the item");

            case 24:
              console.log(clientName, ":", items.client); // Fallback: if no client name was found, check items.client.

              if (!(!clientName && items.client)) {
                _context12.next = 40;
                break;
              }

              if (!(typeof items.client.get === "function")) {
                _context12.next = 39;
                break;
              }

              _context12.prev = 27;
              _context12.next = 30;
              return items.client.get();

            case 30:
              _clientDoc = _context12.sent;

              if (_clientDoc.exists) {
                clientName = _clientDoc.data().name || "";
              }

              _context12.next = 37;
              break;

            case 34:
              _context12.prev = 34;
              _context12.t1 = _context12["catch"](27);
              console.error("Error fetching client from items.client:", _context12.t1);

            case 37:
              _context12.next = 40;
              break;

            case 39:
              clientName = items.client;

            case 40:
              console.log("descriptions:", descriptions[selectedDesc]);
              payload = {
                name: items.name,
                pn: items.pn,
                sn: items.sn,
                wo: workOrders && workOrders.length > 0 ? workOrders[0].workOrder : "",
                client: clientName,
                status: items.status,
                local_sn: id,
                descriptions: [descriptions[selectedDesc] || {
                  description: "",
                  date: ""
                }],
                date: items.dateCreated || "",
                DOM: DOM,
                oem: oem,
                modality: modality,
                model: model,
                poNumber: items.poNumber,
                arrival_date: items.arrival_date // NEW: Include arrival_date

              };
              console.log("Payload for printing:", payload);
              _context12.prev = 43;
              _context12.next = 46;
              return fetch("https://9d70-174-76-22-138.ngrok-free.app/print-label", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
              });

            case 46:
              response = _context12.sent;
              _context12.next = 49;
              return response.json();

            case 49:
              result = _context12.sent;
              console.log("Print result:", result.status);

              if (result.status.includes("successfully.")) {
                handleShowPrintModal();
              } else {
                console.error("Error printing label:", result.error);
              }

              _context12.next = 57;
              break;

            case 54:
              _context12.prev = 54;
              _context12.t2 = _context12["catch"](43);
              console.error("Error printing label:", _context12.t2);

            case 57:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12, null, [[5, 18], [27, 34], [43, 54]]);
    }));

    return function handlePrint() {
      return _ref21.apply(this, arguments);
    };
  }();

  function handleSubmit(_x10) {
    return _handleSubmit.apply(this, arguments);
  } // Handlers for input changes.


  function _handleSubmit() {
    _handleSubmit = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee18(event) {
      return regenerator_default.a.wrap(function _callee18$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              event.preventDefault(); // Only check that the Name field is filled out.

              if (!items.name) {
                handleShow(); // This shows the "missing field" modal.
              } else {
                toSend();
              }

            case 2:
            case "end":
              return _context18.stop();
          }
        }
      }, _callee18);
    }));
    return _handleSubmit.apply(this, arguments);
  }

  var handleChange = function handleChange(field) {
    return function (event) {
      var value = event.target ? event.target.value : event.value;
      setItems(function (prevItems) {
        return _id_objectSpread(_id_objectSpread({}, prevItems), {}, Object(defineProperty["a" /* default */])({}, field, value));
      });
    };
  };

  var addDescription = function addDescription() {
    setDescriptions([].concat(Object(toConsumableArray["a" /* default */])(descriptions), [{
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
      return i === index ? _id_objectSpread(_id_objectSpread({}, desc), {}, Object(defineProperty["a" /* default */])({}, field, value)) : desc;
    });
    setDescriptions(newDescriptions);
  };

  var addWorkOrder = function addWorkOrder() {
    setWorkOrders([].concat(Object(toConsumableArray["a" /* default */])(workOrders), [{
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
      return i === index ? _id_objectSpread(_id_objectSpread({}, wo), {}, Object(defineProperty["a" /* default */])({}, field, value)) : wo;
    });
    setWorkOrders(newWorkOrders);
  };

  var listDescriptions = function listDescriptions() {
    setShowDescModal(true);
  };

  var selectDescription = function selectDescription(index) {
    setSelectedDesc(index);
    setShowDescModal(false);
  };

  var handleShowCameraModal = function handleShowCameraModal() {
    setShowCameraModal(true);
  };

  var handleCloseCameraModal = function handleCloseCameraModal() {
    setShowCameraModal(false);
    setCapturedPhoto(null);
  };

  var handleCapture = function handleCapture(err, result) {
    if (result) {
      setCapturedPhoto(result);
    }
  };

  var savePhoto = function savePhoto() {
    setPhotos(function (prevPhotos) {
      return [].concat(Object(toConsumableArray["a" /* default */])(prevPhotos), [{
        file: capturedPhoto,
        url: URL.createObjectURL(capturedPhoto)
      }]);
    });
    setCapturedPhoto(null);
    handleCloseCameraModal();
  };

  var removePhoto = function removePhoto(index) {
    setPhotos(photos.filter(function (_, i) {
      return i !== index;
    }));
  };

  var mostRecentWorkOrder = workOrders && workOrders.length > 0 ? workOrders.reduce(function (latest, current) {
    var latestDate = new Date(latest.date);
    var currentDate = new Date(current.date);
    return currentDate > latestDate ? current : latest;
  }, workOrders[0]) : {};

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

  var handleShowInfoModal = /*#__PURE__*/function () {
    var _ref22 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee13() {
      var db, doc, data;
      return regenerator_default.a.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              db = Firebase["b" /* default */].firestore();
              _context13.prev = 1;
              _context13.next = 4;
              return db.collection("Test").doc(id).get();

            case 4:
              doc = _context13.sent;

              if (doc.exists) {
                data = doc.data();
                setItemName(data.name || "N/A");
                setShowInfoModal(true);
              } else {
                console.error("Item not found");
              }

              _context13.next = 11;
              break;

            case 8:
              _context13.prev = 8;
              _context13.t0 = _context13["catch"](1);
              console.error("Error fetching item info:", _context13.t0);

            case 11:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13, null, [[1, 8]]);
    }));

    return function handleShowInfoModal() {
      return _ref22.apply(this, arguments);
    };
  }();

  var handleCloseInfoModal = function handleCloseInfoModal() {
    return setShowInfoModal(false);
  };

  var handleCloneToNewItem = function handleCloneToNewItem() {
    if (!id) {
      setErr("Item ID not ready yet.");
      setShowErr(true);
      return;
    }

    router.push("/NewSearch/AddItem/NewItem?cloneFrom=".concat(encodeURIComponent(id)));
  };

  var handlePnChange = function handlePnChange(index, value) {
    setItems(function (prev) {
      var newPn = Object(toConsumableArray["a" /* default */])(prev.pn);

      newPn[index] = value;
      return _id_objectSpread(_id_objectSpread({}, prev), {}, {
        pn: newPn
      });
    });
  };

  var addPn = function addPn() {
    setItems(function (prev) {
      return _id_objectSpread(_id_objectSpread({}, prev), {}, {
        pn: [].concat(Object(toConsumableArray["a" /* default */])(prev.pn), [""])
      });
    });
  };

  var handleSnChange = function handleSnChange(index, value) {
    setItems(function (prev) {
      var newSn = Object(toConsumableArray["a" /* default */])(prev.sn);

      newSn[index] = value;
      return _id_objectSpread(_id_objectSpread({}, prev), {}, {
        sn: newSn
      });
    });
  };

  var addSn = function addSn() {
    setItems(function (prev) {
      return _id_objectSpread(_id_objectSpread({}, prev), {}, {
        sn: [].concat(Object(toConsumableArray["a" /* default */])(prev.sn), [""])
      });
    });
  };

  var browseInputRef = Object(react["useRef"])(null);

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
        return [].concat(Object(toConsumableArray["a" /* default */])(prevPhotos), newPhotos);
      });
    }

    e.target.value = "";
  };

  var _useState66 = Object(react["useState"])(0),
      currentPnIndex = _useState66[0],
      setCurrentPnIndex = _useState66[1];

  var _useState67 = Object(react["useState"])(false),
      showDropdown = _useState67[0],
      setShowDropdown = _useState67[1];

  var _useState68 = Object(react["useState"])(0),
      currentSnIndex = _useState68[0],
      setCurrentSnIndex = _useState68[1];

  var _useState69 = Object(react["useState"])(false),
      showSnDropdown = _useState69[0],
      setShowSnDropdown = _useState69[1];

  Object(react["useEffect"])(function () {
    if (showDropdown || showSnDropdown) {
      loadPnSnOptions();
    }
  }, [showDropdown, showSnDropdown]);

  var handleAddNewClient = function handleAddNewClient() {
    var randomNum = Math.floor(10000 + Math.random() * 90000);
    router.push("../client/AIS".concat(randomNum, "/addClient?from=item&itemId=").concat(id || ""));
  };

  var handleBluefolderButton = /*#__PURE__*/function () {
    var _ref23 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee14() {
      var _descriptions$selecte2;

      var currentWorkOrder, payload, response, result;
      return regenerator_default.a.wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              // Check that the work order field is filled out (using workOrders[0].workOrder as current)
              currentWorkOrder = workOrders && workOrders.length > 0 ? workOrders[0].workOrder : "";

              if (currentWorkOrder) {
                _context14.next = 4;
                break;
              }

              alert("Please fill out the work order field before adding to BlueFolder.");
              return _context14.abrupt("return");

            case 4:
              // Build the payload to send to your proxy endpoint.
              payload = {
                name: items.name,
                pn: items.pn[0] || "",
                sn: items.sn[0] || "",
                status: items.status,
                description: ((_descriptions$selecte2 = descriptions[selectedDesc]) === null || _descriptions$selecte2 === void 0 ? void 0 : _descriptions$selecte2.description) || "",
                workOrder: currentWorkOrder,
                localsn: items.localSN || ""
              };
              _context14.prev = 5;
              _context14.next = 8;
              return fetch("https://9d70-174-76-22-138.ngrok-free.app/bluefolder", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
              });

            case 8:
              response = _context14.sent;
              _context14.next = 11;
              return response.json();

            case 11:
              result = _context14.sent;
              alert("BlueFolder service item added successfully!");
              console.log("BlueFolder result:", result);
              _context14.next = 20;
              break;

            case 16:
              _context14.prev = 16;
              _context14.t0 = _context14["catch"](5);
              console.error("BlueFolder error:", _context14.t0);
              alert("Error adding data to BlueFolder.");

            case 20:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14, null, [[5, 16]]);
    }));

    return function handleBluefolderButton() {
      return _ref23.apply(this, arguments);
    };
  }(); // // Slack integration handler.
  // const handleAddToSlack = async (which) => {
  //   try {
  //     const pn0 = Array.isArray(items.pn) ? items.pn[0] : items.pn;
  //     const sn0 = Array.isArray(items.sn) ? items.sn[0] : items.sn;
  //     const linkUrl = typeof window !== "undefined" ? window.location.href : "";
  //     const safeName = (items?.name || id || "Untitled").trim();
  //     const title = `${safeName}${id ? ` (${id})` : ""}`;
  //     console.log("[SLACK][handleAddToSlack] which:", which);
  //     console.log("[SLACK] title:", title);
  //     console.log("[SLACK] PN:", items.pn, "SN:", items.sn);
  //     const resp = await fetch("/api/slack/add-to-list", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         listKey: which,      // "shipping" | "receiving" | "tasks"
  //         title,
  //         pn: items.pn,
  //         sn: items.sn,
  //         // keeping it minimal by design while we stabilize PN/SN
  //         linkUrl,
  //       }),
  //     });
  // Slack integration handler (drop-in replacement)
  // Slack integration handler (drop-in replacement)
  // Slack integration handler (client) — replace your existing handleAddToSlack with this


  var handleAddToSlack = /*#__PURE__*/function () {
    var _ref24 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee15() {
      var which,
          _sort$,
          _ref25,
          _items$trackingNumber,
          _json$debug,
          _json$debug2,
          safeName,
          title,
          pn0,
          sn0,
          pn_sn,
          mostRecentWO,
          description,
          tracking,
          local_sn,
          photoUrls,
          resp,
          json,
          _args15 = arguments;

      return regenerator_default.a.wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              which = _args15.length > 0 && _args15[0] !== undefined ? _args15[0] : "shipping";
              _context15.prev = 1;
              safeName = ((items === null || items === void 0 ? void 0 : items.name) || id || "Untitled").trim();
              title = "".concat(safeName).concat(id ? " (".concat(id, ")") : "");
              pn0 = Array.isArray(items === null || items === void 0 ? void 0 : items.pn) ? items.pn[0] : items === null || items === void 0 ? void 0 : items.pn;
              sn0 = Array.isArray(items === null || items === void 0 ? void 0 : items.sn) ? items.sn[0] : items === null || items === void 0 ? void 0 : items.sn;
              pn_sn = [pn0 && "PN: ".concat(pn0), sn0 && "SN: ".concat(sn0)].filter(Boolean).join("  ");
              mostRecentWO = workOrders && workOrders.length ? (_sort$ = Object(toConsumableArray["a" /* default */])(workOrders).sort(function (a, b) {
                return new Date((b === null || b === void 0 ? void 0 : b.date) || 0) - new Date((a === null || a === void 0 ? void 0 : a.date) || 0);
              })[0]) === null || _sort$ === void 0 ? void 0 : _sort$.workOrder : "";
              description = selectedDesc != null && descriptions !== null && descriptions !== void 0 && descriptions[selectedDesc] ? descriptions[selectedDesc].description || "" : (items === null || items === void 0 ? void 0 : items.description) || "";
              tracking = (_ref25 = (_items$trackingNumber = items === null || items === void 0 ? void 0 : items.trackingNumber) !== null && _items$trackingNumber !== void 0 ? _items$trackingNumber : items === null || items === void 0 ? void 0 : items.tracking) !== null && _ref25 !== void 0 ? _ref25 : "";
              local_sn = id || (items === null || items === void 0 ? void 0 : items.localSN) || "";
              photoUrls = Array.isArray(photos) ? photos.map(function (p) {
                return p === null || p === void 0 ? void 0 : p.url;
              }).filter(Boolean) : [];
              _context15.next = 14;
              return fetch("/api/slack/add-to-list", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  listKey: which,
                  title: title,
                  pn_sn: pn_sn,
                  // <— server expects this
                  work_order: mostRecentWO || "",
                  local_sn: local_sn,
                  tracking: tracking,
                  description: (description || "").trim(),
                  photoUrls: photoUrls // array of https URLs

                })
              });

            case 14:
              resp = _context15.sent;
              _context15.next = 17;
              return resp.json();

            case 17:
              json = _context15.sent;
              console.log("[SLACK][handleAddToSlack] response:", json);
              if (json !== null && json !== void 0 && (_json$debug = json.debug) !== null && _json$debug !== void 0 && _json$debug.steps) console.table(json.debug.steps);
              if (json !== null && json !== void 0 && (_json$debug2 = json.debug) !== null && _json$debug2 !== void 0 && _json$debug2.photos) console.table(json.debug.photos);

              if (!(!resp.ok || !(json !== null && json !== void 0 && json.ok))) {
                _context15.next = 25;
                break;
              }

              setErr("Slack add failed: ".concat((json === null || json === void 0 ? void 0 : json.error) || "unknown error"));
              setShowErr(true);
              return _context15.abrupt("return");

            case 25:
              alert("Added to Slack ".concat(which === "shipping" ? "Shipping" : which === "receiving" ? "Receiving" : "Tasks", " list."));
              _context15.next = 33;
              break;

            case 28:
              _context15.prev = 28;
              _context15.t0 = _context15["catch"](1);
              console.error(_context15.t0);
              setErr("Error adding to Slack");
              setShowErr(true);

            case 33:
            case "end":
              return _context15.stop();
          }
        }
      }, _callee15, null, [[1, 28]]);
    }));

    return function handleAddToSlack() {
      return _ref24.apply(this, arguments);
    };
  }();

  return __jsx(LoggedIn["default"], null, isLoading && __jsx("div", {
    className: NewItem_module_default.a.loadingOverlay
  }, __jsx("img", {
    src: "/magmo-logo.png",
    alt: "Loading Magmo",
    className: NewItem_module_default.a.loadingLogo
  })), __jsx("div", null, __jsx(Modal["a" /* default */], {
    show: show,
    onHide: handleClose
  }, __jsx(Modal["a" /* default */].Header, {
    closeButton: true
  }, __jsx(Modal["a" /* default */].Title, null, "Error")), __jsx(Modal["a" /* default */].Body, null, "Missing field"), __jsx(Modal["a" /* default */].Footer, null, __jsx(Button["a" /* default */], {
    variant: "primary",
    onClick: handleClose
  }, "Ok"))), __jsx(Modal["a" /* default */], {
    show: showErr,
    onHide: handleCloseErr
  }, __jsx(Modal["a" /* default */].Header, {
    closeButton: true
  }, __jsx(Modal["a" /* default */].Title, null, "Error")), __jsx(Modal["a" /* default */].Body, null, Err), __jsx(Modal["a" /* default */].Footer, null, __jsx(Button["a" /* default */], {
    variant: "primary",
    onClick: handleCloseErr
  }, "Ok"))), __jsx(Modal["a" /* default */], {
    show: showSaveModal,
    onHide: handleCloseSaveModal
  }, __jsx(Modal["a" /* default */].Header, {
    closeButton: true
  }, __jsx(Modal["a" /* default */].Title, null, "Save Confirmation")), __jsx(Modal["a" /* default */].Body, null, "Data has been saved successfully."), __jsx(Modal["a" /* default */].Footer, null, __jsx(Button["a" /* default */], {
    variant: "primary",
    onClick: handleCloseSaveModal
  }, "Ok"))), __jsx(Modal["a" /* default */], {
    show: showPrintModal,
    onHide: handleClosePrintModal
  }, __jsx(Modal["a" /* default */].Header, {
    closeButton: true
  }, __jsx(Modal["a" /* default */].Title, null, "Print Confirmation")), __jsx(Modal["a" /* default */].Body, null, "Info has been sent to print."), __jsx(Modal["a" /* default */].Footer, null, __jsx(Button["a" /* default */], {
    variant: "primary",
    onClick: handleClosePrintModal
  }, "Ok"))), __jsx(Modal["a" /* default */], {
    show: showDescModal,
    onHide: handleCloseDescModal
  }, __jsx(Modal["a" /* default */].Header, {
    closeButton: true
  }, __jsx(Modal["a" /* default */].Title, null, "Descriptions")), __jsx(Modal["a" /* default */].Body, null, __jsx(Button["a" /* default */], {
    variant: "primary",
    className: "mb-3",
    onClick: addDescription
  }, "Add Description"), descriptions.map(function (desc, index) {
    return __jsx(Row["a" /* default */], {
      key: index,
      className: "mb-3"
    }, __jsx(Button["a" /* default */], {
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
  }), __jsx(Button["a" /* default */], {
    variant: "primary",
    onClick: handleCloseDescModal
  }, "OK"))), __jsx(Modal["a" /* default */], {
    show: showWoModal,
    onHide: handleCloseWoModal
  }, __jsx(Modal["a" /* default */].Header, {
    closeButton: true
  }, __jsx(Modal["a" /* default */].Title, null, "Work Orders")), __jsx(Modal["a" /* default */].Body, null, __jsx(Button["a" /* default */], {
    variant: "primary",
    className: "mb-3",
    onClick: addWorkOrder,
    style: {
      marginBottom: "1rem"
    }
  }, "Add Work Order"), workOrders.map(function (wo, index) {
    return __jsx(Row["a" /* default */], {
      key: index,
      className: "mb-3"
    }, __jsx(Col["a" /* default */], null, __jsx(Form["a" /* default */].Control, {
      type: "text",
      placeholder: "Work Order",
      value: wo.workOrder,
      onChange: function onChange(e) {
        return handleWorkOrderChange(index, "workOrder", e.target.value);
      },
      style: {
        marginBottom: "0.5rem"
      }
    })), __jsx(Col["a" /* default */], null, __jsx(Form["a" /* default */].Control, {
      type: "date",
      placeholder: "Date",
      value: wo.date,
      onChange: function onChange(e) {
        return handleWorkOrderChange(index, "date", e.target.value);
      }
    })), __jsx(Col["a" /* default */], null, __jsx(Button["a" /* default */], {
      variant: "danger",
      onClick: function onClick() {
        return removeWorkOrder(index);
      }
    }, "Remove")));
  }), __jsx(Button["a" /* default */], {
    variant: "primary",
    onClick: handleCloseWoModal
  }, "OK"))), __jsx(ClientInfoModal["default"], {
    show: showMachineModal,
    handleClose: handleCloseMachineModal,
    selectedClient: selectedClient,
    machineOptions: machineOptions,
    setSelectedMachine: handleSetSelectedMachine
  }), __jsx(Modal["a" /* default */], {
    show: showClientModal,
    onHide: handleCloseClientModal
  }, __jsx(Modal["a" /* default */].Header, {
    closeButton: true
  }, __jsx(Modal["a" /* default */].Title, null, "Select Client")), __jsx(Modal["a" /* default */].Body, null, __jsx(FormControl["a" /* default */], {
    type: "text",
    placeholder: "Search by name",
    className: "mb-3",
    value: search,
    onChange: function onChange(e) {
      return setSearch(e.target.value);
    }
  }), __jsx(ClientTable["a" /* default */], {
    clients: clients.filter(function (client) {
      return (client.name || "").toLowerCase().includes(search.toLowerCase());
    }),
    onSelectClient: handleClientInfo,
    onInfoClick: handleClientInfo,
    clearSelection: function clearSelection() {
      return handleClientInfo(null);
    },
    onAddClient: handleAddNewClient
  }))), __jsx(parentModal["default"], {
    show: showParentModal,
    handleClose: handleCloseParentModal,
    setSelectedParent: setSelectedParent
  }), __jsx(MachineSelectionModal["default"], {
    show: machineSelectionModal,
    handleClose: function handleClose() {
      return setMachineSelectionModal(false);
    },
    setMachine: setTheMachine
  }), __jsx(Modal["a" /* default */], {
    show: showCameraModal,
    onHide: handleCloseCameraModal
  }, __jsx(Modal["a" /* default */].Header, {
    closeButton: true
  }, __jsx(Modal["a" /* default */].Title, null, "Take a Photo")), __jsx(Modal["a" /* default */].Body, null, __jsx("div", {
    className: "camera"
  }, !capturedPhoto && __jsx(BarcodeScannerComponent, {
    width: "100%",
    height: 300,
    onUpdate: handleCapture,
    facingMode: cameraFacing
  }), capturedPhoto && __jsx("div", {
    className: "photo-preview"
  }, __jsx("img", {
    src: URL.createObjectURL(capturedPhoto),
    alt: "captured",
    style: {
      width: "100%"
    }
  })))), __jsx(Modal["a" /* default */].Footer, null, !capturedPhoto ? __jsx(react_default.a.Fragment, null, __jsx(Button["a" /* default */], {
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
  }, "\uD83D\uDCF7"), __jsx(Button["a" /* default */], {
    onClick: function onClick() {
      return setCameraFacing(function (prev) {
        return prev === "environment" ? "user" : "environment";
      });
    }
  }, "Flip Camera"), __jsx(Button["a" /* default */], {
    variant: "secondary",
    onClick: handleCloseCameraModal
  }, "Cancel")) : __jsx(react_default.a.Fragment, null, __jsx(Button["a" /* default */], {
    variant: "secondary",
    onClick: function onClick() {
      return setCapturedPhoto(null);
    }
  }, "Retake"), __jsx(Button["a" /* default */], {
    variant: "primary",
    onClick: savePhoto
  }, "OK")))), __jsx(InfoModal["default"], {
    show: showInfoModal,
    handleClose: handleCloseInfoModal,
    itemName: items.name,
    dimensions: items.length + "," + items.width + "," + items.height,
    price: items.price,
    freqI: freqItem,
    freqM: machineFrequency,
    usage: usagePastYear
  }), __jsx(Container["a" /* default */], {
    fluid: true,
    className: NewItem_module_default.a.page
  }, __jsx("div", {
    className: NewItem_module_default.a.shell
  }, __jsx(Card["a" /* default */], {
    className: NewItem_module_default.a.card
  }, __jsx(Card["a" /* default */].Body, {
    className: NewItem_module_default.a.cardBody
  }, __jsx("div", {
    className: NewItem_module_default.a.header
  }, __jsx("div", {
    className: NewItem_module_default.a.kicker
  }, "Item"), __jsx("h2", {
    className: NewItem_module_default.a.title
  }, savedName || "Item Details"), __jsx("div", {
    className: NewItem_module_default.a.subtitle
  }, "Review and update fields, photos, and routing information.")), __jsx(Form["a" /* default */], {
    onSubmit: handleSubmit
  }, __jsx(Row["a" /* default */], {
    className: "mb-3"
  }, __jsx(Col["a" /* default */], null, __jsx(Form["a" /* default */].Group, {
    controlId: "name"
  }, __jsx(Form["a" /* default */].Label, null, "Name"), __jsx(Form["a" /* default */].Control, {
    type: "text",
    value: items.name,
    onChange: handleChange("name")
  }))), __jsx(Col["a" /* default */], null, __jsx(Form["a" /* default */].Group, {
    controlId: "pn"
  }, __jsx(Form["a" /* default */].Label, null, "Product Number"), __jsx("div", {
    style: {
      position: "relative"
    }
  }, __jsx(InputGroup["a" /* default */], null, __jsx(Form["a" /* default */].Control, {
    type: "text",
    value: items.pn[currentPnIndex] || "",
    onChange: function onChange(e) {
      return handlePnChange(currentPnIndex, e.target.value);
    }
  }), __jsx(Button["a" /* default */], {
    variant: "outline-secondary",
    onClick: function onClick() {
      return setShowDropdown(!showDropdown);
    }
  }, "\u25BE"), __jsx(InputGroup["a" /* default */].Text, null, __jsx(Button["a" /* default */], {
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
  }, pnOptions.map(function (pnOption, idx) {
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
  }))), addingNewPn && __jsx(Form["a" /* default */].Control, {
    type: "text",
    placeholder: "Enter new PN",
    value: newPn,
    onChange: function onChange(e) {
      return setNewPn(e.target.value);
    },
    onBlur: handleAddNewPn,
    onKeyDown: function onKeyDown(e) {
      return e.key === "Enter" && handleAddNewPn();
    }
  })))), __jsx(Row["a" /* default */], {
    className: "mb-3"
  }, __jsx(Col["a" /* default */], null, __jsx(Form["a" /* default */].Group, {
    controlId: "sn"
  }, __jsx(Form["a" /* default */].Label, null, "Serial Number"), __jsx("div", {
    style: {
      position: "relative"
    }
  }, __jsx(InputGroup["a" /* default */], null, __jsx(Form["a" /* default */].Control, {
    type: "text",
    value: items.sn[currentSnIndex] || "",
    onChange: function onChange(e) {
      return handleSnChange(currentSnIndex, e.target.value);
    }
  }), __jsx(Button["a" /* default */], {
    variant: "outline-secondary",
    onClick: function onClick() {
      return setShowSnDropdown(!showSnDropdown);
    }
  }, "\u25BE"), __jsx(InputGroup["a" /* default */].Text, null, __jsx(Button["a" /* default */], {
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
  }, snOptions.map(function (snOption, idx) {
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
  }))), addingNewSn && __jsx(Form["a" /* default */].Control, {
    type: "text",
    placeholder: "Enter new SN",
    value: newSn,
    onChange: function onChange(e) {
      return setNewSn(e.target.value);
    },
    onBlur: handleAddNewSn,
    onKeyDown: function onKeyDown(e) {
      return e.key === "Enter" && handleAddNewSn();
    }
  }))), __jsx(Col["a" /* default */], null, __jsx(Form["a" /* default */].Group, {
    controlId: "status"
  }, __jsx(Form["a" /* default */].Label, null, "Status"), __jsx(Form["a" /* default */].Select, {
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
  }, "Unknown"))))), __jsx(Row["a" /* default */], {
    className: "mb-3"
  }, __jsx(Col["a" /* default */], null, __jsx(Form["a" /* default */].Group, {
    controlId: "localSN"
  }, __jsx(Form["a" /* default */].Label, null, "Local SN"), __jsx(Form["a" /* default */].Control, {
    type: "text",
    placeholder: "Enter Local SN",
    value: items.localSN || "",
    onChange: handleChange("localSN")
  }))), __jsx(Col["a" /* default */], null, __jsx(Form["a" /* default */].Group, {
    controlId: "arrivalDate"
  }, __jsx(Form["a" /* default */].Label, null, "Arrival Date"), __jsx(Form["a" /* default */].Control, {
    placeholder: "Enter Arrival Date",
    type: "date",
    value: items.arrival_date,
    onChange: function onChange(e) {
      var value = e.target.value;
      setItems(function (prev) {
        return _id_objectSpread(_id_objectSpread({}, prev), {}, {
          arrival_date: value
        });
      });
    }
  }))), __jsx(Col["a" /* default */], null, __jsx(Form["a" /* default */].Group, {
    controlId: "trackingNumber"
  }, __jsx(Form["a" /* default */].Label, null, "Tracking Number"), __jsx(Form["a" /* default */].Control, {
    placeholder: "Tracking Number",
    type: "text",
    value: items.trackingNumber,
    onChange: handleChange("trackingNumber")
  })))), __jsx(Row["a" /* default */], {
    className: "mb-3"
  }, __jsx(Col["a" /* default */], null, __jsx(Form["a" /* default */].Label, null, "OEM"), __jsx(Form["a" /* default */].Control, {
    type: "text",
    placeholder: "OEM",
    value: oem,
    onChange: function onChange(e) {
      return setOem(e.target.value);
    }
  })), __jsx(Col["a" /* default */], null, __jsx(Form["a" /* default */].Label, null, "Modality"), __jsx(Form["a" /* default */].Control, {
    type: "text",
    placeholder: "Modality",
    value: modality,
    onChange: function onChange(e) {
      return setModality(e.target.value);
    }
  })), __jsx(Col["a" /* default */], null, __jsx(Form["a" /* default */].Label, null, "Model"), __jsx(Form["a" /* default */].Control, {
    type: "text",
    placeholder: "Model",
    value: model,
    onChange: function onChange(e) {
      return setModel(e.target.value);
    }
  }))), __jsx("div", {
    style: {
      marginBottom: "1rem",
      marginTop: "1rem"
    }
  }, __jsx("div", {
    className: "d-flex align-items-center"
  }, __jsx(Button["a" /* default */], {
    variant: "outline-secondary",
    onClick: handleShowWoModal,
    className: "me-2"
  }, "Manage Work Orders"), workOrders.length > 0 && __jsx("div", {
    className: "d-flex flex-column align-items-start"
  }, __jsx(Form["a" /* default */].Label, null, "Work Order"), __jsx(Form["a" /* default */].Control, {
    type: "text",
    placeholder: "Most Recent Work Order",
    value: mostRecentWorkOrder.workOrder,
    onChange: function onChange(e) {
      return handleWorkOrderChange(workOrders.indexOf(mostRecentWorkOrder), "workOrder", e.target.value);
    },
    style: {
      marginBottom: "0.5rem"
    }
  }), __jsx(Form["a" /* default */].Label, null, "Date"), __jsx(Form["a" /* default */].Control, {
    type: "date",
    placeholder: "Work Order Date",
    value: mostRecentWorkOrder.date,
    onChange: function onChange(e) {
      return handleWorkOrderChange(workOrders.indexOf(mostRecentWorkOrder), "date", e.target.value);
    },
    style: {
      marginBottom: "0.5rem"
    }
  }))), __jsx("div", {
    style: {
      marginBottom: "1rem"
    }
  }, __jsx(Form["a" /* default */].Group, {
    controlId: "desc"
  }, __jsx(Button["a" /* default */], {
    variant: "outline-secondary",
    onClick: listDescriptions,
    className: "mb-2 me-2"
  }, "List Descriptions"), __jsx(Form["a" /* default */].Control, {
    as: "textarea",
    rows: 3,
    placeholder: "Enter description",
    value: ((_descriptions$selecte3 = descriptions[selectedDesc]) === null || _descriptions$selecte3 === void 0 ? void 0 : _descriptions$selecte3.description) || "",
    onChange: function onChange(e) {
      return handleDescriptionChange(selectedDesc, "description", e.target.value);
    },
    style: {
      marginBottom: "0.5rem"
    }
  }), __jsx(Form["a" /* default */].Control, {
    type: "date",
    value: ((_descriptions$selecte4 = descriptions[selectedDesc]) === null || _descriptions$selecte4 === void 0 ? void 0 : _descriptions$selecte4.date) || "",
    onChange: function onChange(e) {
      return handleDescriptionChange(selectedDesc, "date", e.target.value);
    },
    style: {
      marginTop: "0.5rem",
      marginBottom: "0.5rem"
    }
  })))), __jsx("div", {
    style: {
      marginBottom: "1rem"
    }
  }, __jsx(Row["a" /* default */], {
    className: "mb-3"
  }, __jsx(Col["a" /* default */], null, __jsx(Button["a" /* default */], {
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
  }, __jsx(Button["a" /* default */], {
    variant: "outline-secondary",
    onClick: function onClick() {
      return setShowMachineModal(true);
    }
  }, "Select Machine for ", selectedClientFrom.name), selectedMachine && __jsx(react_default.a.Fragment, null, __jsx("p", {
    style: {
      marginTop: "0.5rem"
    }
  }, __jsx("strong", null, "Selected Machine (From):"), " ", selectedMachine.name), showLocalLocFrom && __jsx(react_default.a.Fragment, null, __jsx(Button["a" /* default */], {
    variant: "outline-secondary",
    onClick: function onClick() {
      return setShowNewLocalModalFrom(true);
    },
    className: "w-100 mb-2"
  }, [newLocalFrom.region, ((_newLocalFrom$section = newLocalFrom.section) === null || _newLocalFrom$section === void 0 ? void 0 : _newLocalFrom$section.letter) + ((_newLocalFrom$section2 = newLocalFrom.section) === null || _newLocalFrom$section2 === void 0 ? void 0 : _newLocalFrom$section2.number), newLocalFrom.bin && "B".concat(newLocalFrom.bin), newLocalFrom.pallet && "P".concat(newLocalFrom.pallet)].filter(Boolean).join("-")), __jsx(Modal["a" /* default */], {
    show: showNewLocalModalFrom,
    onHide: function onHide() {
      return setShowNewLocalModalFrom(false);
    },
    centered: true
  }, __jsx(Modal["a" /* default */].Header, null, __jsx(Modal["a" /* default */].Title, null, "Edit Local Loc (From)")), __jsx(Modal["a" /* default */].Body, null, __jsx(NewLocal["default"], {
    selectedClient: selectedClientFrom,
    showLocalLoc: showNewLocalModalFrom,
    value: newLocalFrom,
    onChange: setNewLocalFrom,
    onSave: function onSave(p) {
      setNewLocalFrom(p);
      setShowNewLocalModalFrom(false);
    },
    onCancel: function onCancel() {
      return setShowNewLocalModalFrom(false);
    }
  })))))))), __jsx(Col["a" /* default */], null, __jsx(Button["a" /* default */], {
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
  }, __jsx(Button["a" /* default */], {
    variant: "outline-secondary",
    onClick: function onClick() {
      return setShowMachineModal(true);
    }
  }, "Select Machine for ", selectedClientCurrent.name), selectedCurrentMachine && __jsx(react_default.a.Fragment, null, __jsx("p", {
    style: {
      marginTop: "0.5rem"
    }
  }, __jsx("strong", null, "Selected Machine (Current):"), " ", selectedCurrentMachine.name), showLocalLocCurrent && __jsx(react_default.a.Fragment, null, __jsx(Button["a" /* default */], {
    variant: "outline-secondary",
    onClick: function onClick() {
      return setShowNewLocalModalCurrent(true);
    },
    className: "w-100 mb-2"
  }, [newLocalCurrent.region, ((_newLocalCurrent$sect = newLocalCurrent.section) === null || _newLocalCurrent$sect === void 0 ? void 0 : _newLocalCurrent$sect.letter) + ((_newLocalCurrent$sect2 = newLocalCurrent.section) === null || _newLocalCurrent$sect2 === void 0 ? void 0 : _newLocalCurrent$sect2.number), newLocalCurrent.bin && "B".concat(newLocalCurrent.bin), newLocalCurrent.pallet && "P".concat(newLocalCurrent.pallet)].filter(Boolean).join("-")), __jsx(Modal["a" /* default */], {
    show: showNewLocalModalCurrent,
    onHide: function onHide() {
      return setShowNewLocalModalCurrent(false);
    },
    centered: true
  }, __jsx(Modal["a" /* default */].Header, null, __jsx(Modal["a" /* default */].Title, null, "Edit Local Loc (Current)")), __jsx(Modal["a" /* default */].Body, null, __jsx(NewLocal["default"], {
    selectedClient: selectedClientCurrent,
    showLocalLoc: showNewLocalModalCurrent,
    value: newLocalCurrent,
    onChange: setNewLocalCurrent,
    onSave: function onSave(p) {
      setNewLocalCurrent(p);
      setShowNewLocalModalCurrent(false);
    },
    onCancel: function onCancel() {
      return setShowNewLocalModalCurrent(false);
    }
  })))))))), __jsx(Col["a" /* default */], null, __jsx(Button["a" /* default */], {
    variant: "outline-secondary",
    onClick: handleShowParentModal,
    className: "me-2"
  }, "Select Parent"), selectedParent && __jsx(Form["a" /* default */].Control, {
    type: "text",
    placeholder: "Selected Parent",
    value: selectedParent.name,
    readOnly: true,
    style: {
      marginTop: "0.5rem"
    }
  })))), __jsx("div", {
    style: {
      marginBottom: "1rem"
    }
  }, __jsx(Row["a" /* default */], {
    className: "mb-3 ".concat(NewItem_module_default.a.photoActionsRow)
  }, __jsx(Col["a" /* default */], {
    xs: 12,
    md: 6
  }, __jsx(ButtonGroup["a" /* default */], null, __jsx(Button["a" /* default */], {
    variant: "outline-secondary",
    onClick: handleShowCameraModal
  }, "Take Photo"), __jsx(Button["a" /* default */], {
    variant: "outline-secondary",
    onClick: handleBrowsePhotos
  }, "Browse"))), __jsx(Col["a" /* default */], {
    xs: 12,
    md: 6,
    className: NewItem_module_default.a.photoActionsRight
  }, __jsx(Button["a" /* default */], {
    variant: "success",
    onClick: handleSendToInflow,
    style: {
      marginLeft: "auto"
    }
  }, "Send to inFlow"), __jsx(Button["a" /* default */], {
    variant: "secondary",
    onClick: handleBluefolderButton,
    style: {
      marginLeft: "0.5rem",
      marginRight: ".5rem"
    }
  }, "BlueFolder"), __jsx(Button["a" /* default */], {
    variant: addToWebsite ? "primary" : "outline-primary",
    onClick: function onClick() {
      return setAddToWebsite(function (prev) {
        return !prev;
      });
    }
  }, addToWebsite ? "✓ Add to Website" : "Add to Website"), __jsx(Form["a" /* default */].Check, {
    type: "checkbox",
    id: "hide-checkbox",
    label: "Hide" // box is checked when we want visible = false
    ,
    checked: !items.visible,
    onChange: function onChange(e) {
      // grab checked immediately
      var isHidden = e.currentTarget.checked;
      setItems(function (prev) {
        return _id_objectSpread(_id_objectSpread({}, prev), {}, {
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
  })), photos && photos.length > 0 && __jsx("div", {
    className: "photo-gallery",
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: "10px",
      marginBottom: "1rem"
    }
  }, photos.map(function (photo, index) {
    return __jsx("div", {
      key: index,
      style: {
        position: "relative",
        width: "100px",
        height: "100px"
      }
    }, __jsx("img", {
      src: photo.url,
      alt: "Photo ".concat(index + 1),
      style: {
        width: "100%",
        height: "100%",
        objectFit: "cover"
      }
    }), photo.file && __jsx(Button["a" /* default */], {
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
    }, "x"));
  })), __jsx("div", {
    className: "mt-3 d-flex flex-wrap align-items-center ".concat(NewItem_module_default.a.actionRow)
  }, __jsx(Button["a" /* default */], {
    variant: "primary",
    type: "submit",
    style: {
      marginRight: "1rem"
    }
  }, "Save"), __jsx(Button["a" /* default */], {
    variant: "secondary",
    onClick: handleCloneToNewItem,
    style: {
      marginRight: "1rem"
    }
  }, "Clone"), __jsx(LoadingButton, {
    type: "primary",
    name: "Back",
    route: "NewSearch/mainSearch"
  }), SHOW_SLACK_BUTTONS && __jsx("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      marginLeft: ".5rem"
    }
  }, __jsx("span", {
    style: {
      fontSize: 12,
      lineHeight: "12px",
      textAlign: "center"
    }
  }, "Slack"), __jsx("div", {
    style: {
      display: "flex",
      border: "1px solid #ced4da",
      borderRadius: 6,
      overflow: "hidden"
    }
  }, __jsx(Button["a" /* default */], {
    variant: "outline-primary",
    onClick: function onClick() {
      return handleAddToSlack("receiving");
    },
    style: {
      border: "none",
      borderRight: "1px solid #ced4da"
    }
  }, "Receiving"), __jsx(Button["a" /* default */], {
    variant: "outline-primary",
    onClick: function onClick() {
      return handleAddToSlack("shipping");
    },
    style: {
      border: "none"
    }
  }, "Shipping"))), __jsx(Button["a" /* default */], {
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
  }, __jsx(Button["a" /* default */], {
    variant: "link",
    style: {
      textDecoration: "none",
      color: "black",
      fontSize: "24px"
    },
    onClick: function onClick() {
      return setShowExtra(!showExtra);
    }
  }, "\u25BC")), __jsx(Collapse["a" /* default */], {
    "in": showExtra
  }, __jsx("div", {
    id: "extra-collapse",
    className: "mt-3"
  }, __jsx("div", {
    className: "d-flex justify-content-end mb-3"
  }, __jsx(Button["a" /* default */], {
    variant: "secondary",
    onClick: handleShowInfoModal
  }, "More Info")), __jsx(Row["a" /* default */], null, __jsx(Form["a" /* default */].Group, {
    as: Col["a" /* default */],
    controlId: "dimensions"
  }, __jsx(Form["a" /* default */].Label, null, "Dimensions"), __jsx("div", {
    style: {
      display: "flex",
      alignItems: "center"
    }
  }, __jsx(Form["a" /* default */].Control, {
    placeholder: "Length",
    type: "text",
    value: items.length,
    onChange: handleChange("length")
  }), __jsx("span", {
    style: {
      padding: "0 5px"
    }
  }, "x"), __jsx(Form["a" /* default */].Control, {
    placeholder: "Width",
    type: "text",
    value: items.width,
    onChange: handleChange("width")
  }), __jsx("span", {
    style: {
      padding: "0 5px"
    }
  }, "x"), __jsx(Form["a" /* default */].Control, {
    placeholder: "Height",
    type: "text",
    value: items.height,
    onChange: handleChange("height")
  })))), __jsx(Row["a" /* default */], {
    className: "mt-3"
  }, __jsx(Form["a" /* default */].Group, {
    as: Col["a" /* default */],
    controlId: "Price"
  }, __jsx(Form["a" /* default */].Label, null, "Price"), __jsx(Form["a" /* default */].Control, {
    placeholder: "Price",
    type: "text",
    value: items.price,
    onChange: handleChange("price")
  })), __jsx(Form["a" /* default */].Group, {
    as: Col["a" /* default */],
    controlId: "DOM"
  }, __jsx(Form["a" /* default */].Label, null, "DOM"), __jsx(Form["a" /* default */].Control, {
    placeholder: "Date of Manufacture",
    type: "date",
    value: DOM,
    onChange: function onChange(e) {
      return setDOM(e.target.value);
    }
  })), __jsx(Form["a" /* default */].Group, {
    as: Col["a" /* default */],
    controlId: "poNumber"
  }, __jsx(Form["a" /* default */].Label, null, "PO Number"), __jsx(Form["a" /* default */].Control, {
    type: "text",
    placeholder: "PO Number",
    value: items.poNumber || "",
    onChange: handleChange("poNumber")
  }))))))))))), __jsx(Modal["a" /* default */], {
    show: showCameraModal,
    onHide: handleCloseCameraModal
  }, __jsx(Modal["a" /* default */].Header, {
    closeButton: true
  }, __jsx(Modal["a" /* default */].Title, null, "Take a Photo")), __jsx(Modal["a" /* default */].Body, null, __jsx("div", {
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
  })))), __jsx(Modal["a" /* default */].Footer, null, !capturedPhoto ? __jsx(react_default.a.Fragment, null, __jsx(Button["a" /* default */], {
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
  }, "\uD83D\uDCF7"), __jsx(Button["a" /* default */], {
    onClick: function onClick() {
      return setCameraFacing(function (prev) {
        return prev === "environment" ? "user" : "environment";
      });
    }
  }, "Flip Camera"), __jsx(Button["a" /* default */], {
    variant: "secondary",
    onClick: handleCloseCameraModal
  }, "Cancel")) : __jsx(react_default.a.Fragment, null, __jsx(Button["a" /* default */], {
    variant: "secondary",
    onClick: function onClick() {
      return setCapturedPhoto(null);
    }
  }, "Retake"), __jsx(Button["a" /* default */], {
    variant: "primary",
    onClick: savePhoto
  }, "OK")))));
}

var __N_SSP = true;
function DisplayItemPage(props) {
  var _router$query, _props$initialItem;

  var router = Object(next_router["useRouter"])();
  var idFromRouter = (_router$query = router.query) === null || _router$query === void 0 ? void 0 : _router$query.id;
  var key = (props === null || props === void 0 ? void 0 : (_props$initialItem = props.initialItem) === null || _props$initialItem === void 0 ? void 0 : _props$initialItem.id) || idFromRouter || "new-item";
  return __jsx(DisplayItemInner, _extends({}, props, {
    key: key
  }));
} // Server-side rendering function

/***/ })

},[["NySP",1,0,5,3,8,2,4,6,7,9,10,11,12,13,14,15,16,22,23]]]);