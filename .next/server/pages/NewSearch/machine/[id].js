module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 21);
/******/ })
/************************************************************************/
/******/ ({

/***/ 21:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("2cz2");


/***/ }),

/***/ "2Fd9":
/***/ (function(module, exports) {

module.exports = require("firebase/compat/firestore");

/***/ }),

/***/ "2cz2":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getServerSideProps", function() { return getServerSideProps; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("4Q3z");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("IZS3");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _context_Firebase__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("NY6m");
/* harmony import */ var _Machine_module_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("ejhT");
/* harmony import */ var _Machine_module_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_Machine_module_css__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _context_FirebaseAdmin__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("Aroy");
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





 // Import for SSR



const getRefId = ref => {
  if (!ref) return null;
  if (typeof ref === "string") return ref;
  if (ref.id) return ref.id;
  return null;
};

const resolveDocData = async (db, collection, refOrId) => {
  if (!refOrId) return null;

  try {
    if (typeof refOrId.get === "function") {
      const doc = await refOrId.get();
      return doc.exists ? _objectSpread({
        id: doc.id
      }, doc.data()) : null;
    }

    const id = getRefId(refOrId);
    if (!id) return null;
    const doc = await db.collection(collection).doc(id).get();
    return doc.exists ? _objectSpread({
      id: doc.id
    }, doc.data()) : null;
  } catch (error) {
    console.error(`Error fetching ${collection} doc:`, error);
    return null;
  }
};

const formatDateForPrint = input => {
  if (!input) return "";

  if (input.seconds) {
    const date = new Date(input.seconds * 1000);
    return isNaN(date.getTime()) ? "" : date.toLocaleDateString();
  }

  if (typeof input.toDate === "function") {
    const date = input.toDate();
    return date instanceof Date && !isNaN(date.getTime()) ? date.toLocaleDateString() : "";
  }

  if (input instanceof Date) {
    return isNaN(input.getTime()) ? "" : input.toLocaleDateString();
  }

  if (typeof input === "number") {
    const date = new Date(input);
    return isNaN(date.getTime()) ? "" : date.toLocaleDateString();
  }

  if (typeof input === "string") {
    const trimmed = input.trim();
    if (!trimmed) return "";
    const date = new Date(trimmed);
    return isNaN(date.getTime()) ? trimmed : date.toLocaleDateString();
  }

  return "";
};

const pickLatestDescription = data => {
  var _latest;

  const descs = Array.isArray(data === null || data === void 0 ? void 0 : data.descriptions) ? data.descriptions : [];
  if (!descs.length) return (data === null || data === void 0 ? void 0 : data.description) || "";
  let latest = descs[0];

  for (const entry of descs) {
    if (!entry) continue;

    if (!latest) {
      latest = entry;
      continue;
    }

    const entryDate = new Date(entry.date || 0);
    const latestDate = new Date(latest.date || 0);

    if (!isNaN(entryDate.getTime()) && entryDate > latestDate) {
      latest = entry;
    }
  }

  return ((_latest = latest) === null || _latest === void 0 ? void 0 : _latest.description) || (data === null || data === void 0 ? void 0 : data.description) || "";
};

const getMachineField = (data, key) => {
  var _ref, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9, _data$machineData$key, _data$machineData, _data$machineData2, _data$currentMachineD, _data$currentMachineD2, _data$TheMachine, _data$TheMachine2, _data$theMachineData, _data$theMachineData2;

  const lower = key.toLowerCase();
  return (_ref = (_ref2 = (_ref3 = (_ref4 = (_ref5 = (_ref6 = (_ref7 = (_ref8 = (_ref9 = (_data$machineData$key = data === null || data === void 0 ? void 0 : (_data$machineData = data.machineData) === null || _data$machineData === void 0 ? void 0 : _data$machineData[key]) !== null && _data$machineData$key !== void 0 ? _data$machineData$key : data === null || data === void 0 ? void 0 : (_data$machineData2 = data.machineData) === null || _data$machineData2 === void 0 ? void 0 : _data$machineData2[lower]) !== null && _ref9 !== void 0 ? _ref9 : data === null || data === void 0 ? void 0 : (_data$currentMachineD = data.currentMachineData) === null || _data$currentMachineD === void 0 ? void 0 : _data$currentMachineD[key]) !== null && _ref8 !== void 0 ? _ref8 : data === null || data === void 0 ? void 0 : (_data$currentMachineD2 = data.currentMachineData) === null || _data$currentMachineD2 === void 0 ? void 0 : _data$currentMachineD2[lower]) !== null && _ref7 !== void 0 ? _ref7 : data === null || data === void 0 ? void 0 : (_data$TheMachine = data.TheMachine) === null || _data$TheMachine === void 0 ? void 0 : _data$TheMachine[key]) !== null && _ref6 !== void 0 ? _ref6 : data === null || data === void 0 ? void 0 : (_data$TheMachine2 = data.TheMachine) === null || _data$TheMachine2 === void 0 ? void 0 : _data$TheMachine2[lower]) !== null && _ref5 !== void 0 ? _ref5 : data === null || data === void 0 ? void 0 : (_data$theMachineData = data.theMachineData) === null || _data$theMachineData === void 0 ? void 0 : _data$theMachineData[key]) !== null && _ref4 !== void 0 ? _ref4 : data === null || data === void 0 ? void 0 : (_data$theMachineData2 = data.theMachineData) === null || _data$theMachineData2 === void 0 ? void 0 : _data$theMachineData2[lower]) !== null && _ref3 !== void 0 ? _ref3 : data === null || data === void 0 ? void 0 : data[key]) !== null && _ref2 !== void 0 ? _ref2 : data === null || data === void 0 ? void 0 : data[lower]) !== null && _ref !== void 0 ? _ref : "";
};

const resolveClientName = async (db, data, machineData) => {
  var _data$machineData3, _data$currentMachineD3, _data$machineData4;

  if (data !== null && data !== void 0 && data.clientName) return data.clientName;
  if (typeof (data === null || data === void 0 ? void 0 : data.client) === "string") return data.client;
  const directClient = (await resolveDocData(db, "Client", data === null || data === void 0 ? void 0 : data.client)) || (await resolveDocData(db, "Client", data === null || data === void 0 ? void 0 : data.ClientFrom)) || (await resolveDocData(db, "Client", data === null || data === void 0 ? void 0 : data.clientFromId)) || (await resolveDocData(db, "Client", data === null || data === void 0 ? void 0 : data.ClientCurrent)) || (await resolveDocData(db, "Client", data === null || data === void 0 ? void 0 : data.clientCurrentId));
  if (directClient !== null && directClient !== void 0 && directClient.name) return directClient.name;
  const machineClientName = (data === null || data === void 0 ? void 0 : (_data$machineData3 = data.machineData) === null || _data$machineData3 === void 0 ? void 0 : _data$machineData3.Client) || (data === null || data === void 0 ? void 0 : (_data$currentMachineD3 = data.currentMachineData) === null || _data$currentMachineD3 === void 0 ? void 0 : _data$currentMachineD3.Client) || (machineData === null || machineData === void 0 ? void 0 : machineData.Client) || "";
  if (machineClientName) return machineClientName;
  const machineClient = (await resolveDocData(db, "Client", machineData === null || machineData === void 0 ? void 0 : machineData.client)) || (await resolveDocData(db, "Client", data === null || data === void 0 ? void 0 : (_data$machineData4 = data.machineData) === null || _data$machineData4 === void 0 ? void 0 : _data$machineData4.client));
  if (machineClient !== null && machineClient !== void 0 && machineClient.name) return machineClient.name;
  return "";
};

const resolvePartForPrint = async (db, part) => {
  if (!part) return null;
  let data = part;

  try {
    var _data, _data2, _data3, _data4, _data5, _data6, _data7, _data8, _data9, _data10, _data11, _data12, _data13, _data14, _data15, _data16, _data17, _data18, _data19, _data20, _data21, _data22, _data23, _data24, _data25, _data26, _data27, _data28, _data29, _data30, _data31, _data32, _data33, _data34, _data35, _data36, _data37, _data38;

    const hasArrival = Boolean(((_data = data) === null || _data === void 0 ? void 0 : _data.arrival_date) || ((_data2 = data) === null || _data2 === void 0 ? void 0 : _data2.arrivalDate) || ((_data3 = data) === null || _data3 === void 0 ? void 0 : _data3.date));
    const hasPo = Boolean(((_data4 = data) === null || _data4 === void 0 ? void 0 : _data4.poNumber) || ((_data5 = data) === null || _data5 === void 0 ? void 0 : _data5.po_number) || ((_data6 = data) === null || _data6 === void 0 ? void 0 : _data6.po));
    const hasDescriptions = Boolean(((_data7 = data) === null || _data7 === void 0 ? void 0 : _data7.description) || Array.isArray((_data8 = data) === null || _data8 === void 0 ? void 0 : _data8.descriptions) && data.descriptions.length);
    const hasMachineSource = Boolean(((_data9 = data) === null || _data9 === void 0 ? void 0 : _data9.TheMachine) || ((_data10 = data) === null || _data10 === void 0 ? void 0 : _data10.machineData) || ((_data11 = data) === null || _data11 === void 0 ? void 0 : _data11.Machine) || ((_data12 = data) === null || _data12 === void 0 ? void 0 : _data12.MachineFrom) || ((_data13 = data) === null || _data13 === void 0 ? void 0 : _data13.CurrentMachine) || ((_data14 = data) === null || _data14 === void 0 ? void 0 : _data14.MachineCurrent));
    const hasClientSource = Boolean(((_data15 = data) === null || _data15 === void 0 ? void 0 : _data15.clientName) || ((_data16 = data) === null || _data16 === void 0 ? void 0 : _data16.client) || ((_data17 = data) === null || _data17 === void 0 ? void 0 : _data17.ClientFrom) || ((_data18 = data) === null || _data18 === void 0 ? void 0 : _data18.clientFromId));
    const needsPartDoc = ((_data19 = data) === null || _data19 === void 0 ? void 0 : _data19.id) && (!hasArrival || !hasPo || !hasDescriptions || !hasMachineSource || !hasClientSource);

    if (needsPartDoc) {
      const partDoc = await resolveDocData(db, "Test", data.id);

      if (partDoc) {
        data = _objectSpread(_objectSpread({}, data), partDoc);
      }
    }

    const machineRef = ((_data20 = data) === null || _data20 === void 0 ? void 0 : _data20.MachineFrom) || ((_data21 = data) === null || _data21 === void 0 ? void 0 : _data21.Machine) || ((_data22 = data) === null || _data22 === void 0 ? void 0 : _data22.CurrentMachine) || ((_data23 = data) === null || _data23 === void 0 ? void 0 : _data23.MachineCurrent);
    let machineData = ((_data24 = data) === null || _data24 === void 0 ? void 0 : _data24.TheMachine) || ((_data25 = data) === null || _data25 === void 0 ? void 0 : _data25.machineData) || null;
    const needsMachineData = !(getMachineField(_objectSpread(_objectSpread({}, data), {}, {
      machineData
    }), "OEM") || getMachineField(_objectSpread(_objectSpread({}, data), {}, {
      machineData
    }), "Modality") || getMachineField(_objectSpread(_objectSpread({}, data), {}, {
      machineData
    }), "Model"));

    if (needsMachineData && machineRef) {
      const machineDoc = await resolveDocData(db, "Machine", machineRef);

      if (machineDoc) {
        machineData = machineDoc;
        data = _objectSpread(_objectSpread({}, data), {}, {
          machineData: machineDoc
        });
      }
    }

    const arrivalRaw = ((_data26 = data) === null || _data26 === void 0 ? void 0 : _data26.arrival_date) || ((_data27 = data) === null || _data27 === void 0 ? void 0 : _data27.arrivalDate) || ((_data28 = data) === null || _data28 === void 0 ? void 0 : _data28.date) || ((_data29 = data) === null || _data29 === void 0 ? void 0 : _data29.arrival) || "";
    const arrivalDate = formatDateForPrint(arrivalRaw);
    const description = pickLatestDescription(data);
    const poNumber = ((_data30 = data) === null || _data30 === void 0 ? void 0 : _data30.poNumber) || ((_data31 = data) === null || _data31 === void 0 ? void 0 : _data31.po_number) || ((_data32 = data) === null || _data32 === void 0 ? void 0 : _data32.po) || "";
    const localSn = ((_data33 = data) === null || _data33 === void 0 ? void 0 : _data33.local_sn) || ((_data34 = data) === null || _data34 === void 0 ? void 0 : _data34.localSN) || ((_data35 = data) === null || _data35 === void 0 ? void 0 : _data35.localsn) || ((_data36 = data) === null || _data36 === void 0 ? void 0 : _data36.id) || "";
    const OEM = getMachineField(data, "OEM");
    const modality = getMachineField(data, "Modality");
    const model = getMachineField(data, "Model");
    const client = await resolveClientName(db, data, machineData);
    return {
      name: ((_data37 = data) === null || _data37 === void 0 ? void 0 : _data37.name) || ((_data38 = data) === null || _data38 === void 0 ? void 0 : _data38.itemName) || "",
      arrival_date: arrivalDate,
      poNumber: poNumber || "",
      OEM: OEM || "",
      modality: modality || "",
      model: model || "",
      local_sn: localSn || "",
      client: client || "",
      description: description || ""
    };
  } catch (error) {
    var _data39, _data40, _data41, _data42, _data43, _data44, _data45, _data46, _data47, _data48;

    console.error("Error preparing item for print:", error);
    return {
      name: ((_data39 = data) === null || _data39 === void 0 ? void 0 : _data39.name) || ((_data40 = data) === null || _data40 === void 0 ? void 0 : _data40.itemName) || "",
      arrival_date: formatDateForPrint(((_data41 = data) === null || _data41 === void 0 ? void 0 : _data41.arrival_date) || ((_data42 = data) === null || _data42 === void 0 ? void 0 : _data42.date) || ""),
      poNumber: ((_data43 = data) === null || _data43 === void 0 ? void 0 : _data43.poNumber) || "",
      OEM: "",
      modality: "",
      model: "",
      local_sn: ((_data44 = data) === null || _data44 === void 0 ? void 0 : _data44.local_sn) || ((_data45 = data) === null || _data45 === void 0 ? void 0 : _data45.localSN) || ((_data46 = data) === null || _data46 === void 0 ? void 0 : _data46.id) || "",
      client: ((_data47 = data) === null || _data47 === void 0 ? void 0 : _data47.clientName) || "",
      description: ((_data48 = data) === null || _data48 === void 0 ? void 0 : _data48.description) || ""
    };
  }
};

const Machine = ({
  initialMachine,
  initialAssociatedParts,
  error: initialError
}) => {
  const router = Object(next_router__WEBPACK_IMPORTED_MODULE_1__["useRouter"])();
  const {
    0: selectedMachine,
    1: setSelectedMachine
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(initialMachine || null);
  const {
    0: associatedParts,
    1: setAssociatedParts
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(Array.isArray(initialAssociatedParts) ? initialAssociatedParts : []);
  const {
    0: error,
    1: setError
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(initialError || null);
  const {
    0: dragIndex,
    1: setDragIndex
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null);
  const {
    0: dragOverIndex,
    1: setDragOverIndex
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null);
  const {
    0: isPrinting,
    1: setIsPrinting
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const {
    0: showPrintSuccess,
    1: setShowPrintSuccess
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    if (router.isReady) {
      const {
        id
      } = router.query;

      if (!id) {
        const pathSegments = router.asPath.split("/");
        const machineIdFromPath = pathSegments[pathSegments.length - 1];
        console.log(`Machine ID extracted from URL path: ${machineIdFromPath}`);
        fetchMachineData(machineIdFromPath);
      } else {
        console.log(`Machine ID from router query: ${id}`); // If SSR already hydrated, avoid re-fetching unless we truly need to.

        if (!selectedMachine) {
          fetchMachineData(id);
        }
      }
    }
  }, [router.isReady, selectedMachine]);

  const fetchMachineData = async machineId => {
    try {
      console.log(`Attempting to fetch machine data for ID: ${machineId}`);
      const db = _context_Firebase__WEBPACK_IMPORTED_MODULE_3__[/* default */ "b"].firestore();
      const machineDoc = await db.collection("Machine").doc(machineId).get();

      if (machineDoc.exists) {
        const machineData = machineDoc.data();
        setSelectedMachine(machineData);
        setError(null);
        console.log("Machine data:", machineData); // Fetch associated parts

        if (machineData.associatedParts) {
          fetchAssociatedParts(machineData.associatedParts);
        }
      } else {
        console.error("Machine not found");
        setError("Machine not found");
      }
    } catch (error) {
      console.error("Error fetching machine data:", error);
      setError("Error fetching machine data");
    }
  };

  const fetchAssociatedParts = async associatedPartsRefs => {
    try {
      const db = _context_Firebase__WEBPACK_IMPORTED_MODULE_3__[/* default */ "b"].firestore();
      const partsDocs = await Promise.all(associatedPartsRefs.map(ref => ref.get()));
      const partsData = await Promise.all(partsDocs.map(async doc => {
        var _data$ClientFrom, _data$client;

        if (!doc.exists) {
          // skip or return an empty object
          return null;
        }

        const data = doc.data() || {};
        let clientName = "";

        if (data.clientName) {
          clientName = data.clientName;
        } else if ((_data$ClientFrom = data.ClientFrom) !== null && _data$ClientFrom !== void 0 && _data$ClientFrom.get) {
          const clientDoc = await data.ClientFrom.get();
          clientName = clientDoc.exists ? clientDoc.data().name : "";
        } else if (typeof data.clientFromId === "string") {
          const clientDoc = await db.collection("Client").doc(data.clientFromId).get();
          clientName = clientDoc.exists ? clientDoc.data().name : "";
        } else if (typeof data.client === "string") {
          clientName = data.client;
        } else if ((_data$client = data.client) !== null && _data$client !== void 0 && _data$client.get) {
          const clientDoc = await data.client.get();
          clientName = clientDoc.exists ? clientDoc.data().name : "";
        }

        return _objectSpread(_objectSpread({
          id: doc.id
        }, data), {}, {
          clientName
        });
      }));
      setAssociatedParts(partsData.filter(p => p));
      setError(null);
      console.log("Associated parts data:", partsData);
    } catch (error) {
      console.error("Error fetching associated parts:", error);
      setError("Error fetching associated parts");
    }
  };

  const handlePrintMulti = async () => {
    setIsPrinting(true);
    const db = _context_Firebase__WEBPACK_IMPORTED_MODULE_3__[/* default */ "b"].firestore();
    const resolvedItems = await Promise.all(associatedParts.map(part => resolvePartForPrint(db, part)));
    const payload = {
      items: resolvedItems.filter(Boolean),
      test_print: true,
      // Hard-coded here if you want to test printing one item
      index: 1 // Hard-coded index (1-based)

    };

    try {
      if (!payload.items.length) {
        throw new Error("No items available to print.");
      }

      const response = await fetch("https://9d70-174-76-22-138.ngrok-free.app/print_multi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      console.log("Print multi result:", result.status);

      if (!response.ok || (result === null || result === void 0 ? void 0 : result.status) === "error") {
        throw new Error((result === null || result === void 0 ? void 0 : result.message) || "Print failed.");
      }

      setShowPrintSuccess(true);
    } catch (error) {
      console.error("Error printing multiple labels:", error);
      setError((error === null || error === void 0 ? void 0 : error.message) || "Error printing multiple labels");
    } finally {
      setIsPrinting(false);
    }
  };

  const handleSelectPart = (id, name) => {
    console.log(`Selected part ID: ${id}, Name: ${name}`);
    router.push("../item/" + id);
  };

  const handleDragStart = index => event => {
    var _associatedParts$inde;

    if (event.target.closest("button")) {
      event.preventDefault();
      return;
    }

    setDragIndex(index);
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", ((_associatedParts$inde = associatedParts[index]) === null || _associatedParts$inde === void 0 ? void 0 : _associatedParts$inde.id) || String(index));
  };

  const handleDragOver = index => event => {
    event.preventDefault();
    if (dragOverIndex !== index) setDragOverIndex(index);
    event.dataTransfer.dropEffect = "move";
  };

  const handleDrop = index => event => {
    event.preventDefault();

    if (dragIndex == null || dragIndex === index) {
      setDragIndex(null);
      setDragOverIndex(null);
      return;
    }

    setAssociatedParts(prev => {
      const next = [...prev];
      const [moved] = next.splice(dragIndex, 1);
      next.splice(index, 0, moved);
      return next;
    });
    setDragIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDragIndex(null);
    setDragOverIndex(null);
  };

  const formatDate = input => {
    let date;

    if (input && input.seconds) {
      // Handle timestamp object with 'seconds' property
      date = new Date(input.seconds * 1000);
    } else if (typeof input === "string") {
      // Handle date string
      date = new Date(input);
    } else {
      return "N/A";
    }

    if (isNaN(date.getTime())) {
      // Invalid date string
      return "Invalid Date";
    }

    return date.toLocaleDateString();
  };

  return __jsx("div", {
    className: _Machine_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.page
  }, isPrinting && __jsx("div", {
    className: _Machine_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.loadingOverlay
  }, __jsx("img", {
    src: "/magmo-logo.png",
    alt: "Printing",
    className: _Machine_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.loadingLogo
  })), __jsx("div", {
    className: _Machine_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.shell
  }, __jsx("header", {
    className: _Machine_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.header
  }, __jsx("div", {
    className: _Machine_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.brand
  }, __jsx("img", {
    src: "/magmo-logo.png",
    alt: "Magmo",
    className: _Machine_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.brandLogo
  }), __jsx("div", null, __jsx("div", {
    className: _Machine_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.brandName
  }, "Magmo"), __jsx("div", {
    className: _Machine_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.brandSub
  }, "Machine Detail"))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "outline-secondary",
    className: _Machine_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.backButton,
    onClick: () => router.back()
  }, "Back")), __jsx("div", {
    className: _Machine_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.card
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"], {
    show: showPrintSuccess,
    onHide: () => setShowPrintSuccess(false),
    centered: true
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Header, {
    closeButton: true
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Title, null, "Print Complete")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Body, null, "All items were sent to the printer successfully."), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Footer, null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "primary",
    onClick: () => setShowPrintSuccess(false)
  }, "Ok"))), __jsx("div", {
    className: _Machine_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.cardHeader
  }, __jsx("div", null, __jsx("div", {
    className: _Machine_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.cardTitle
  }, "Machine Details"), __jsx("div", {
    className: _Machine_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.cardSubtitle
  }, "Drag and drop parts to reorder this list.")), __jsx("div", {
    className: _Machine_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.cardMeta
  }, associatedParts.length, " parts")), __jsx("div", {
    className: _Machine_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.cardBody
  }, error && !selectedMachine && __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Alert"], {
    variant: "danger"
  }, error), selectedMachine ? __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx("div", {
    className: _Machine_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.machineGrid
  }, __jsx("div", {
    className: _Machine_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.machineInfo
  }, __jsx("div", {
    className: _Machine_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.machineName
  }, selectedMachine.name || "Unnamed Machine"), __jsx("div", {
    className: _Machine_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.machineMetaRow
  }, __jsx("span", null, "OEM: ", selectedMachine.OEM || "N/A"), __jsx("span", null, "Modality: ", selectedMachine.Modality || "N/A"), __jsx("span", null, "Model: ", selectedMachine.Model || "N/A"))), __jsx("div", {
    className: _Machine_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.machineDates
  }, __jsx("div", null, __jsx("span", {
    className: _Machine_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.dateLabel
  }, "Last PM"), __jsx("span", null, formatDate(selectedMachine.lastPM))), __jsx("div", null, __jsx("span", {
    className: _Machine_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.dateLabel
  }, "Next PM"), __jsx("span", null, formatDate(selectedMachine.nextPM))))), __jsx("div", {
    className: _Machine_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.tableCard
  }, __jsx("div", {
    className: _Machine_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.tableHeader
  }, "Associated Parts", __jsx("span", {
    className: _Machine_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.tableHint
  }, "Click + hold to move")), __jsx("div", {
    className: _Machine_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.tableWrap
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Table"], {
    striped: true,
    bordered: true,
    hover: true,
    size: "sm",
    className: _Machine_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.table
  }, __jsx("thead", null, __jsx("tr", null, __jsx("th", null, "Name"), __jsx("th", null, "ID"), __jsx("th", null, "Part Number"), __jsx("th", null, "Serial Number"), __jsx("th", null, "Date"), __jsx("th", null, "Select"))), __jsx("tbody", null, associatedParts.length === 0 && __jsx("tr", null, __jsx("td", {
    colSpan: 6,
    className: _Machine_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.emptyState
  }, "No associated parts found.")), associatedParts.map((part, index) => __jsx("tr", {
    key: part.id,
    draggable: true,
    onDragStart: handleDragStart(index),
    onDragOver: handleDragOver(index),
    onDrop: handleDrop(index),
    onDragEnd: handleDragEnd,
    className: `${_Machine_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.draggableRow} ${dragIndex === index ? _Machine_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.dragging : ""} ${dragOverIndex === index && dragIndex !== index ? _Machine_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.dropTarget : ""}`
  }, __jsx("td", null, part.name), __jsx("td", null, part.id), __jsx("td", null, part.pn), __jsx("td", null, part.sn), __jsx("td", null, formatDate(part.date || part.arrival_date)), __jsx("td", null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "primary",
    size: "sm",
    onClick: () => handleSelectPart(part.id, part.name)
  }, "Select"))))))), __jsx("div", {
    className: _Machine_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.tableActions
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "secondary",
    className: _Machine_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.actionButton,
    onClick: handlePrintMulti
  }, "Print All Items")))) : !error && __jsx("p", {
    className: _Machine_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.loadingText
  }, "Loading machine data...")))));
};

/* harmony default export */ __webpack_exports__["default"] = (Machine); // Server-side rendering function

async function getServerSideProps(context) {
  const {
    id
  } = context.params;

  try {
    if (!_context_FirebaseAdmin__WEBPACK_IMPORTED_MODULE_5__[/* adminDb */ "a"]) {
      return {
        props: {
          error: "Firebase Admin not configured for SSR."
        }
      };
    } // Fetch machine data from Firestore using Admin SDK


    const machineDoc = await _context_FirebaseAdmin__WEBPACK_IMPORTED_MODULE_5__[/* adminDb */ "a"].collection("Machine").doc(id).get();

    if (!machineDoc.exists) {
      return {
        notFound: true // This will show a 404 page

      };
    }

    const machineData = machineDoc.data(); // Fetch associated parts if they exist

    let associatedParts = [];

    if (machineData.associatedParts && Array.isArray(machineData.associatedParts)) {
      try {
        const partsPromises = machineData.associatedParts.map(partRef => {
          if (partRef.path) {
            return _context_FirebaseAdmin__WEBPACK_IMPORTED_MODULE_5__[/* adminDb */ "a"].doc(partRef.path).get();
          }

          return null;
        }).filter(Boolean);
        const partsDocs = await Promise.all(partsPromises);

        const toDisplayValue = value => {
          if (Array.isArray(value)) {
            return value.filter(v => v != null && v !== "").join(", ");
          }

          return value !== null && value !== void 0 ? value : "";
        };

        associatedParts = await Promise.all(partsDocs.map(async doc => {
          if (!doc.exists) {
            return null;
          }

          const data = doc.data() || {};
          let clientName = ""; // Fetch client name if ClientFrom reference exists

          if (data.ClientFrom && data.ClientFrom.path) {
            try {
              const clientDoc = await _context_FirebaseAdmin__WEBPACK_IMPORTED_MODULE_5__[/* adminDb */ "a"].doc(data.ClientFrom.path).get();
              clientName = clientDoc.exists ? clientDoc.data().name : "";
            } catch (error) {
              console.error("Error fetching client data:", error);
            }
          }

          return {
            id: doc.id,
            name: data.name || "",
            pn: toDisplayValue(data.pn),
            sn: toDisplayValue(data.sn),
            date: data.date || data.arrival_date || "",
            clientName
          };
        })); // Filter out null values

        associatedParts = associatedParts.filter(part => part !== null);
      } catch (error) {
        console.error("Error fetching associated parts:", error);
      }
    } // Serialize the machine data, removing any non-serializable fields


    const serializedMachine = {
      id,
      name: machineData.name || "",
      Model: machineData.Model || "",
      OEM: machineData.OEM || "",
      Modality: machineData.Modality || "",
      lastPM: machineData.lastPM || null,
      nextPM: machineData.nextPM || null // Add other machine fields as needed, but ensure they're serializable

    };
    return {
      props: {
        initialMachine: serializedMachine,
        initialAssociatedParts: associatedParts
      }
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);
    return {
      props: {
        error: "Failed to load machine data"
      }
    };
  }
}

/***/ }),

/***/ "4Q3z":
/***/ (function(module, exports) {

module.exports = require("next/router");

/***/ }),

/***/ "Aroy":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return adminDb; });
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("mw/K");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var firebase_admin_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("txAr");
/* harmony import */ var firebase_admin_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(firebase_admin_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var firebase_admin_firestore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("YFVX");
/* harmony import */ var firebase_admin_firestore__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(firebase_admin_firestore__WEBPACK_IMPORTED_MODULE_2__);


 // Import Firebase Functions for config access

let functions;

try {
  functions = __webpack_require__("O8Wp");
} catch (error) {
  // Not running in Firebase Functions environment
  functions = null;
} // Initialize Firebase Admin if it hasn't been initialized


if (!Object(firebase_admin_app__WEBPACK_IMPORTED_MODULE_1__["getApps"])().length) {
  var _serviceAccount, _functions$config$adm, _functions$config$ssr, _serviceAccount2, _functions$config$adm2, _functions$config$ssr2, _serviceAccount3;

  const serviceAccountPath = process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT_PATH || process.env.FIREBASE_SERVICE_ACCOUNT_PATH;
  let serviceAccount = null;

  if (serviceAccountPath) {
    try {
      const raw = fs__WEBPACK_IMPORTED_MODULE_0___default.a.readFileSync(serviceAccountPath, "utf8");
      serviceAccount = JSON.parse(raw);
    } catch (error) {
      console.warn("Firebase Admin service account file could not be loaded:", error.message);
    }
  }

  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL || process.env.FIREBASE_FUNCTIONS_CLIENT_EMAIL || process.env.FIREBASE_ADMIN_CLIENT_EMAIL || ((_serviceAccount = serviceAccount) === null || _serviceAccount === void 0 ? void 0 : _serviceAccount.client_email) || (functions ? ((_functions$config$adm = functions.config().admin) === null || _functions$config$adm === void 0 ? void 0 : _functions$config$adm.client_email) || ((_functions$config$ssr = functions.config().ssr) === null || _functions$config$ssr === void 0 ? void 0 : _functions$config$ssr.firebase_client_email) : undefined);
  const privateKey = process.env.FIREBASE_PRIVATE_KEY || process.env.FIREBASE_FUNCTIONS_PRIVATE_KEY || process.env.FIREBASE_ADMIN_PRIVATE_KEY || ((_serviceAccount2 = serviceAccount) === null || _serviceAccount2 === void 0 ? void 0 : _serviceAccount2.private_key) || (functions ? ((_functions$config$adm2 = functions.config().admin) === null || _functions$config$adm2 === void 0 ? void 0 : _functions$config$adm2.private_key) || ((_functions$config$ssr2 = functions.config().ssr) === null || _functions$config$ssr2 === void 0 ? void 0 : _functions$config$ssr2.firebase_private_key) : undefined);
  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID || process.env.FIREBASE_PROJECT_ID || ((_serviceAccount3 = serviceAccount) === null || _serviceAccount3 === void 0 ? void 0 : _serviceAccount3.project_id) || "magmo-ac10c";
  const hasExplicitAdminCreds = Boolean(clientEmail && privateKey);
  const isGoogleRuntime = Boolean(process.env.K_SERVICE || process.env.FUNCTION_TARGET || process.env.GAE_ENV || process.env.GOOGLE_CLOUD_PROJECT);
  const canUseAdc = isGoogleRuntime || Boolean(process.env.GOOGLE_APPLICATION_CREDENTIALS);

  try {
    if (hasExplicitAdminCreds) {
      Object(firebase_admin_app__WEBPACK_IMPORTED_MODULE_1__["initializeApp"])({
        credential: Object(firebase_admin_app__WEBPACK_IMPORTED_MODULE_1__["cert"])({
          projectId,
          clientEmail: clientEmail,
          privateKey: privateKey.replace(/\\n/g, "\n")
        }),
        databaseURL: "https://magmo-ac10c.firebaseio.com"
      });
    } else if (canUseAdc) {
      // Fall back to Application Default Credentials (e.g. Cloud Functions/Run)
      Object(firebase_admin_app__WEBPACK_IMPORTED_MODULE_1__["initializeApp"])({
        projectId,
        databaseURL: "https://magmo-ac10c.firebaseio.com"
      });
    } else {
      console.warn("Firebase Admin not initialized: missing service account credentials in local environment.");
    }
  } catch (error) {
    console.warn("Firebase Admin initialization failed:", error.message); // Don't throw error during build process
  }
} // Only export Firestore if Firebase Admin is properly initialized


let adminDb = null;

try {
  if (Object(firebase_admin_app__WEBPACK_IMPORTED_MODULE_1__["getApps"])().length > 0) {
    adminDb = Object(firebase_admin_firestore__WEBPACK_IMPORTED_MODULE_2__["getFirestore"])();
  }
} catch (error) {
  console.warn("Firebase Admin not available:", error.message);
}


/* unused harmony default export */ var _unused_webpack_default_export = (adminDb);

/***/ }),

/***/ "IZS3":
/***/ (function(module, exports) {

module.exports = require("react-bootstrap");

/***/ }),

/***/ "NY6m":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return auth; });
/* harmony import */ var firebase_compat_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("YMQe");
/* harmony import */ var firebase_compat_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(firebase_compat_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var firebase_compat_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("e9mW");
/* harmony import */ var firebase_compat_auth__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(firebase_compat_auth__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var firebase_compat_firestore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("2Fd9");
/* harmony import */ var firebase_compat_firestore__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(firebase_compat_firestore__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var firebase_compat_storage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("P/iy");
/* harmony import */ var firebase_compat_storage__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(firebase_compat_storage__WEBPACK_IMPORTED_MODULE_3__);
// // import firebase from "firebase/app"
// import * as firebase from "firebase/app";
// // import "firebase/auth"
// const app = firebase.initializeApp({
//     apiKey: "AIzaSyCxC-a8b5Vhhey8GF47LpXZ1aMKYmiIhwE",
//     authDomain: "magmo-ac10c.firebaseapp.com",
//     projectId: "magmo-ac10c",
//     storageBucket: "magmo-ac10c.appspot.com",
//     messagingSenderId: "177857525147",
//     appId: "1:177857525147:web:ac8e3c87d82396beb1dd3e",
//     measurementId: "G-L0236JT5N3"
// })
// export const auth = app.auth()
// export default app
// apiKey: process.env.REACT_APP_FIREBASE_KEY,
//     authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//     projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//     appId: process.env.REACT_APP_FIREBASE_APP_ID,
//     measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID




const FirebaseCredentials = {
  apiKey: "AIzaSyCxC-a8b5Vhhey8GF47LpXZ1aMKYmiIhwE",
  authDomain: "magmo-ac10c.firebaseapp.com",
  projectId: "magmo-ac10c",
  storageBucket: "magmo-ac10c.appspot.com",
  messagingSenderId: "177857525147",
  appId: "1:177857525147:web:ac8e3c87d82396beb1dd3e",
  measurementId: "G-L0236JT5N3"
}; // if a Firebase instance doesn't exist, create one

if (!firebase_compat_app__WEBPACK_IMPORTED_MODULE_0___default.a.apps.length) {
  firebase_compat_app__WEBPACK_IMPORTED_MODULE_0___default.a.initializeApp(FirebaseCredentials);
} // Some networks/proxies block Firestore's streaming transport.
// Force long polling in the browser to avoid stalled writes/listens.


if (false) {}

const auth = firebase_compat_app__WEBPACK_IMPORTED_MODULE_0___default.a.auth();
/* harmony default export */ __webpack_exports__["b"] = (firebase_compat_app__WEBPACK_IMPORTED_MODULE_0___default.a); // import { initializeApp } from 'firebase/app';
// import { getFirestore, collection, getDocs } from 'firebase/firestore';
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// export default app;

/***/ }),

/***/ "O8Wp":
/***/ (function(module, exports) {

module.exports = require("firebase-functions");

/***/ }),

/***/ "P/iy":
/***/ (function(module, exports) {

module.exports = require("firebase/compat/storage");

/***/ }),

/***/ "YFVX":
/***/ (function(module, exports) {

module.exports = require("firebase-admin/firestore");

/***/ }),

/***/ "YMQe":
/***/ (function(module, exports) {

module.exports = require("firebase/compat/app");

/***/ }),

/***/ "cDcd":
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "e9mW":
/***/ (function(module, exports) {

module.exports = require("firebase/compat/auth");

/***/ }),

/***/ "ejhT":
/***/ (function(module, exports) {

// Exports
module.exports = {
	"page": "Machine_page__Y5o9l",
	"shell": "Machine_shell__3zfu1",
	"header": "Machine_header__3-4wd",
	"brand": "Machine_brand__JQapu",
	"brandLogo": "Machine_brandLogo__3V-Dh",
	"brandName": "Machine_brandName__1c13A",
	"brandSub": "Machine_brandSub__JB4jf",
	"backButton": "Machine_backButton__2uGCE",
	"card": "Machine_card__2L-2Z",
	"cardHeader": "Machine_cardHeader__6ni_x",
	"cardTitle": "Machine_cardTitle__M4yT1",
	"cardSubtitle": "Machine_cardSubtitle__1RYdY",
	"cardMeta": "Machine_cardMeta__1qWsG",
	"cardBody": "Machine_cardBody__2Sjqg",
	"machineGrid": "Machine_machineGrid__4QzGf",
	"machineInfo": "Machine_machineInfo__1y9ed",
	"machineName": "Machine_machineName__39bAg",
	"machineMetaRow": "Machine_machineMetaRow__xgm8_",
	"machineDates": "Machine_machineDates__3Z6ds",
	"dateLabel": "Machine_dateLabel__3Qj0D",
	"tableCard": "Machine_tableCard__1oYWn",
	"tableHeader": "Machine_tableHeader__1b2pT",
	"tableHint": "Machine_tableHint__2Q8NL",
	"tableWrap": "Machine_tableWrap__2p2iy",
	"table": "Machine_table__2Fkh-",
	"draggableRow": "Machine_draggableRow__US-WQ",
	"dragging": "Machine_dragging__2_Jvh",
	"dropTarget": "Machine_dropTarget__jMbqd",
	"tableActions": "Machine_tableActions__3dLhl",
	"actionButton": "Machine_actionButton__1pAjO",
	"emptyState": "Machine_emptyState__2xIsK",
	"loadingText": "Machine_loadingText__3lu-N",
	"loadingOverlay": "Machine_loadingOverlay__33z2J",
	"loadingLogo": "Machine_loadingLogo__2GxP1",
	"magmo-spin": "Machine_magmo-spin__2iyBb"
};


/***/ }),

/***/ "mw/K":
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "txAr":
/***/ (function(module, exports) {

module.exports = require("firebase-admin/app");

/***/ })

/******/ });