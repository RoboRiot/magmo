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
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ({

/***/ 13:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("2JcH");


/***/ }),

/***/ "2Fd9":
/***/ (function(module, exports) {

module.exports = require("firebase/compat/firestore");

/***/ }),

/***/ "2JcH":
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
/* harmony import */ var _ClientInfoModal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("MbKa");
/* harmony import */ var _MachineCreationModal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("cdLA");
/* harmony import */ var _Client_module_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("IPTb");
/* harmony import */ var _Client_module_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_Client_module_css__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _context_FirebaseAdmin__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("Aroy");
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







 // Import for SSR



const Client = ({
  initialClient,
  initialMachines,
  error: initialError
}) => {
  const router = Object(next_router__WEBPACK_IMPORTED_MODULE_1__["useRouter"])();
  const {
    0: selectedClient,
    1: setSelectedClient
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(initialClient || null);
  const {
    0: machineOptions,
    1: setMachineOptions
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(Array.isArray(initialMachines) ? initialMachines : []);
  const {
    0: error,
    1: setError
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(initialError || null);
  const {
    0: isLoading,
    1: setIsLoading
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(!initialClient && !initialError); // State for machine addition modals

  const {
    0: showAddMachineModal,
    1: setShowAddMachineModal
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const {
    0: showCreateMachineModal,
    1: setShowCreateMachineModal
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const {
    0: availableMachines,
    1: setAvailableMachines
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    if (!router.isReady) return;
    const activeId = router.query.id || router.asPath.split("/").pop();
    if (!activeId) return;
    const hasInitial = initialClient && initialClient.id === activeId;
    fetchClientData(activeId, {
      silent: hasInitial
    });
  }, [router.isReady, router.query.id, initialClient]);

  const fetchClientData = async (clientId, {
    silent = false
  } = {}) => {
    if (!silent) {
      setIsLoading(true);
    }

    setError(null);

    try {
      const db = _context_Firebase__WEBPACK_IMPORTED_MODULE_3__[/* default */ "b"].firestore();
      const clientDoc = await db.collection("Client").doc(clientId).get();

      if (clientDoc.exists) {
        const clientData = clientDoc.data();
        setSelectedClient(_objectSpread({
          id: clientId
        }, clientData));
        const machineRefs = Array.isArray(clientData.machines) ? clientData.machines : [];
        const machinePromises = machineRefs.map(machineRef => machineRef.get());
        const machineDocs = await Promise.all(machinePromises);
        const machines = machineDocs.map(machineDoc => _objectSpread({
          id: machineDoc.id
        }, machineDoc.data()));
        setMachineOptions(machines);
      } else {
        setError("Client not found");
      }
    } catch (error) {
      console.error("Error fetching client data:", error);
      setError("Error fetching client data");
    } finally {
      if (!silent) {
        setIsLoading(false);
      }
    }
  }; // Fetch available machines (those not yet assigned to a client)


  const fetchAvailableMachines = async () => {
    try {
      const db = _context_Firebase__WEBPACK_IMPORTED_MODULE_3__[/* default */ "b"].firestore();
      const snapshot = await db.collection("Machine").where("client", "==", null).get();
      const machines = snapshot.docs.map(doc => _objectSpread({
        id: doc.id
      }, doc.data()));
      setAvailableMachines(machines);
    } catch (error) {
      console.error("Error fetching available machines:", error);
      setError("Failed to fetch available machines.");
    }
  };

  const handleSelectMachine = (id, name) => {
    // Navigate to the machine details page if needed
    router.push("../machine/" + id);
  }; // When adding an existing machine


  const handleAddMachine = async machine => {
    try {
      const db = _context_Firebase__WEBPACK_IMPORTED_MODULE_3__[/* default */ "b"].firestore();
      const clientId = router.query.clientId || router.asPath.split("/").pop(); // Update client's "machines" array with the machine reference

      await db.collection("Client").doc(clientId).update({
        machines: _context_Firebase__WEBPACK_IMPORTED_MODULE_3__[/* default */ "b"].firestore.FieldValue.arrayUnion(db.collection("Machine").doc(machine.id))
      }); // Update local state to include the newly added machine

      setMachineOptions(prev => [...prev, machine]);
      setShowAddMachineModal(false);
    } catch (error) {
      console.error("Error adding machine to client:", error);
      setError("Failed to add machine to client.");
    }
  }; // When creating a new machine for the client


  const handleCreateMachine = async newMachine => {
    try {
      const db = _context_Firebase__WEBPACK_IMPORTED_MODULE_3__[/* default */ "b"].firestore();
      const clientId = router.query.clientId || router.asPath.split("/").pop();
      const machineId = `AIS${Math.floor(10000 + Math.random() * 90000)}`;

      const machineWithId = _objectSpread(_objectSpread({}, newMachine), {}, {
        id: machineId,
        client: db.collection("Client").doc(clientId)
      }); // Create the machine document


      await db.collection("Machine").doc(machineId).set(machineWithId); // Add the machine reference to the client

      await db.collection("Client").doc(clientId).update({
        machines: _context_Firebase__WEBPACK_IMPORTED_MODULE_3__[/* default */ "b"].firestore.FieldValue.arrayUnion(db.collection("Machine").doc(machineId))
      }); // Update local state

      setMachineOptions(prev => [...prev, _objectSpread({
        id: machineId
      }, newMachine)]);
      setShowCreateMachineModal(false);
    } catch (error) {
      console.error("Error creating and adding machine:", error);
      setError("Failed to create and add machine.");
    }
  }; // Open the modal to add an existing machine; fetch available machines first


  const openAddMachineModal = async () => {
    await fetchAvailableMachines();
    setShowAddMachineModal(true);
  };

  return __jsx("div", {
    className: _Client_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.page
  }, __jsx("div", {
    className: _Client_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.shell
  }, __jsx("header", {
    className: _Client_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.header
  }, __jsx("div", {
    className: _Client_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.brand
  }, __jsx("img", {
    src: "/magmo-logo.png",
    alt: "Magmo",
    className: _Client_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.brandLogo
  }), __jsx("div", null, __jsx("div", {
    className: _Client_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.brandName
  }, "Magmo"), __jsx("div", {
    className: _Client_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.brandSub
  }, "Client Detail"))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "outline-secondary",
    className: _Client_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.backButton,
    onClick: () => router.back()
  }, "Back")), __jsx("section", {
    className: _Client_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.card
  }, __jsx("div", {
    className: _Client_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.cardHeader
  }, __jsx("div", null, __jsx("div", {
    className: _Client_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.cardTitle
  }, "Client Machines"), __jsx("div", {
    className: _Client_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.cardSubtitle
  }, "Manage machines linked to this client.")), __jsx("div", {
    className: _Client_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.cardMeta
  }, machineOptions.length, " machines")), __jsx("div", {
    className: _Client_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.cardBody
  }, error && __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Alert"], {
    variant: "danger"
  }, error), isLoading && __jsx("div", {
    className: _Client_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.loadingWrap
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Spinner"], {
    animation: "border",
    role: "status"
  }, __jsx("span", {
    className: "sr-only"
  }, "Loading..."))), !isLoading && selectedClient && __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx("div", {
    className: _Client_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.clientSummary
  }, __jsx("div", {
    className: _Client_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.clientName
  }, selectedClient.name), __jsx("div", {
    className: _Client_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.clientMetaRow
  }, __jsx("span", null, "Location: ", selectedClient.local || "Unknown"), __jsx("span", null, "Client ID: ", selectedClient.id))), __jsx("div", {
    className: _Client_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.actionRow
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "primary",
    onClick: openAddMachineModal
  }, "Add Existing Machine"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "outline-secondary",
    onClick: () => setShowCreateMachineModal(true)
  }, "Create New Machine")), __jsx("div", {
    className: _Client_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.tableCard
  }, __jsx("div", {
    className: _Client_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.tableHeader
  }, __jsx("span", null, "Machines"), __jsx("span", {
    className: _Client_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.tableHint
  }, "Select a machine to view details.")), __jsx("div", {
    className: _Client_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.tableWrap
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Table"], {
    striped: true,
    bordered: true,
    hover: true,
    size: "sm",
    className: _Client_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.table
  }, __jsx("thead", null, __jsx("tr", null, __jsx("th", null, "Name"), __jsx("th", null, "Location"), __jsx("th", null, "OEM"), __jsx("th", null, "Modality"), __jsx("th", null, "Select"))), __jsx("tbody", null, machineOptions.length === 0 ? __jsx("tr", null, __jsx("td", {
    colSpan: 5,
    className: _Client_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.emptyState
  }, "No machines assigned yet.")) : machineOptions.map(machine => __jsx("tr", {
    key: machine.id
  }, __jsx("td", null, machine.name), __jsx("td", null, machine.local), __jsx("td", null, machine.OEM), __jsx("td", null, machine.Modality), __jsx("td", null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "primary",
    size: "sm",
    onClick: () => handleSelectMachine(machine.id, machine.name)
  }, "Select")))))))))))), __jsx(_ClientInfoModal__WEBPACK_IMPORTED_MODULE_4__["default"], {
    show: showAddMachineModal,
    handleClose: () => setShowAddMachineModal(false),
    machineOptions: availableMachines,
    setSelectedMachine: handleAddMachine
  }), __jsx(_MachineCreationModal__WEBPACK_IMPORTED_MODULE_5__["default"], {
    show: showCreateMachineModal,
    handleClose: () => setShowCreateMachineModal(false),
    onCreateMachine: handleCreateMachine
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (Client); // Server-side rendering function

async function getServerSideProps(context) {
  const {
    id
  } = context.params;

  try {
    if (!_context_FirebaseAdmin__WEBPACK_IMPORTED_MODULE_7__[/* adminDb */ "a"]) {
      return {
        props: {
          error: "Firebase Admin not configured for SSR."
        }
      };
    } // Fetch client data from Firestore using Admin SDK


    const clientDoc = await _context_FirebaseAdmin__WEBPACK_IMPORTED_MODULE_7__[/* adminDb */ "a"].collection("Client").doc(id).get();

    if (!clientDoc.exists) {
      return {
        notFound: true // This will show a 404 page

      };
    }

    const clientData = clientDoc.data(); // Fetch machine documents referenced in the client's machines array

    let machines = [];

    if (clientData.machines && Array.isArray(clientData.machines)) {
      try {
        const machinePromises = clientData.machines.map(machineRef => {
          if (machineRef.path) {
            return _context_FirebaseAdmin__WEBPACK_IMPORTED_MODULE_7__[/* adminDb */ "a"].doc(machineRef.path).get();
          }

          return null;
        }).filter(Boolean);
        const machineDocs = await Promise.all(machinePromises);
        machines = machineDocs.map(machineDoc => {
          const machineData = machineDoc.data(); // Extract only serializable data, remove any Firestore references

          const serializedMachine = {
            id: machineDoc.id,
            name: machineData.name || "",
            local: machineData.local || "",
            OEM: machineData.OEM || "",
            Modality: machineData.Modality || "",
            Model: machineData.Model || "" // Add other fields as needed, but ensure they're serializable

          }; // If there's a client reference, extract just the client name

          if (machineData.client && machineData.client.path) {
            try {
              const clientDoc = _context_FirebaseAdmin__WEBPACK_IMPORTED_MODULE_7__[/* adminDb */ "a"].doc(machineData.client.path).get();

              if (clientDoc.exists) {
                serializedMachine.clientName = clientDoc.data().name || "";
              }
            } catch (error) {
              console.error("Error fetching client name:", error);
            }
          }

          return serializedMachine;
        });
      } catch (error) {
        console.error("Error fetching machine data:", error);
      }
    } // Serialize the client data, removing any non-serializable fields


    const serializedClient = {
      id,
      name: clientData.name || "",
      local: clientData.local || "" // Add other client fields as needed, but ensure they're serializable

    };
    return {
      props: {
        initialClient: serializedClient,
        initialMachines: machines
      }
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);
    return {
      props: {
        error: "Failed to load client data"
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

/***/ "IPTb":
/***/ (function(module, exports) {

// Exports
module.exports = {
	"page": "Client_page__-jqa8",
	"shell": "Client_shell__HaaZr",
	"header": "Client_header__1OzDo",
	"brand": "Client_brand__TY-t-",
	"brandLogo": "Client_brandLogo__BAtgq",
	"brandName": "Client_brandName__1r159",
	"brandSub": "Client_brandSub__1HMns",
	"backButton": "Client_backButton__2uAON",
	"card": "Client_card__3D3gL",
	"cardHeader": "Client_cardHeader__35lxQ",
	"cardTitle": "Client_cardTitle__29vEJ",
	"cardSubtitle": "Client_cardSubtitle__3y6SK",
	"cardMeta": "Client_cardMeta__1NmUj",
	"cardBody": "Client_cardBody__2yWTw",
	"clientSummary": "Client_clientSummary__vTrXq",
	"clientName": "Client_clientName__2o7za",
	"clientMetaRow": "Client_clientMetaRow__5WBls",
	"actionRow": "Client_actionRow__1lthB",
	"tableCard": "Client_tableCard__1eEmm",
	"tableHeader": "Client_tableHeader__1QxeE",
	"tableHint": "Client_tableHint__27xzx",
	"tableWrap": "Client_tableWrap__2ruRh",
	"table": "Client_table__2fISj",
	"emptyState": "Client_emptyState__28E9g",
	"loadingWrap": "Client_loadingWrap__l0kar"
};


/***/ }),

/***/ "IZS3":
/***/ (function(module, exports) {

module.exports = require("react-bootstrap");

/***/ }),

/***/ "MbKa":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("IZS3");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;
// ClientInfoModal.js



const ClientInfoModal = ({
  show,
  handleClose,
  selectedClient,
  machineOptions = [],
  setSelectedMachine
}) => {
  // Add warehouse options here
  // const warehouseOptions = [
  //   { id: "warehouse-socal", name: "SoCalWarehouse", local: "" },
  //   { id: "warehouse-norcal", name: "NorCalWarehouse", local: "" },
  // ];
  return __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"], {
    show: show,
    onHide: handleClose
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Header, {
    closeButton: true
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Title, null, "Select a Machine or Warehouse")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Body, null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Table"], {
    striped: true,
    bordered: true,
    hover: true,
    size: "sm"
  }, __jsx("thead", null, __jsx("tr", null, __jsx("th", null, "Name"), __jsx("th", null, "Location"), __jsx("th", null, "Select"))), __jsx("tbody", null, machineOptions.map(machine => __jsx("tr", {
    key: machine.id
  }, __jsx("td", null, machine.name), __jsx("td", null, machine.local), __jsx("td", null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    variant: "primary",
    onClick: () => setSelectedMachine(machine)
  }, "Select"))))))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Footer, null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    variant: "secondary",
    onClick: handleClose
  }, "Close")));
};

/* harmony default export */ __webpack_exports__["default"] = (ClientInfoModal);

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

/***/ "cdLA":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("IZS3");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




const MachineCreationModal = ({
  show,
  handleClose,
  onCreateMachine
}) => {
  const {
    0: newMachine,
    1: setNewMachine
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    name: "",
    OEM: "",
    Modality: "",
    Model: "",
    local: "",
    lastPM: "",
    nextPM: ""
  });

  const handleChange = field => event => {
    const value = event.target.value;
    setNewMachine(prev => _objectSpread(_objectSpread({}, prev), {}, {
      [field]: value
    }));
  };

  const handleCreate = () => {
    onCreateMachine(newMachine);
    setNewMachine({
      name: "",
      OEM: "",
      Modality: "",
      Model: "",
      local: "",
      lastPM: "",
      nextPM: ""
    });
  };

  return __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"], {
    show: show,
    onHide: handleClose
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Header, {
    closeButton: true
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Title, null, "Create New Machine")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Body, null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"], null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Group, {
    controlId: "machineName"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Label, null, "Name"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Control, {
    type: "text",
    placeholder: "Enter machine name",
    value: newMachine.name,
    onChange: handleChange("name")
  })), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Group, {
    controlId: "OEM",
    className: "mt-3"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Label, null, "OEM"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Control, {
    type: "text",
    placeholder: "Enter OEM",
    value: newMachine.OEM,
    onChange: handleChange("OEM")
  })), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Group, {
    controlId: "Modality",
    className: "mt-3"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Label, null, "Modality"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Control, {
    type: "text",
    placeholder: "Enter modality",
    value: newMachine.Modality,
    onChange: handleChange("Modality")
  })), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Group, {
    controlId: "Model",
    className: "mt-3"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Label, null, "Model"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Control, {
    type: "text",
    placeholder: "Enter model",
    value: newMachine.Model,
    onChange: handleChange("Model")
  })), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Group, {
    controlId: "local",
    className: "mt-3"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Label, null, "Location"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Control, {
    type: "text",
    placeholder: "Enter location",
    value: newMachine.local,
    onChange: handleChange("local")
  })), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Group, {
    controlId: "lastPM",
    className: "mt-3"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Label, null, "Last PM"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Control, {
    type: "date",
    placeholder: "Enter last PM date",
    value: newMachine.lastPM,
    onChange: handleChange("lastPM")
  })), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Group, {
    controlId: "nextPM",
    className: "mt-3"
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Label, null, "next PM"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Control, {
    type: "date",
    placeholder: "Enter next PM date",
    value: newMachine.nextPM,
    onChange: handleChange("nextPM")
  })))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Footer, null, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    variant: "secondary",
    onClick: handleClose
  }, "Close"), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    variant: "primary",
    onClick: handleCreate
  }, "Add Machine")));
};

/* harmony default export */ __webpack_exports__["default"] = (MachineCreationModal);

/***/ }),

/***/ "e9mW":
/***/ (function(module, exports) {

module.exports = require("firebase/compat/auth");

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