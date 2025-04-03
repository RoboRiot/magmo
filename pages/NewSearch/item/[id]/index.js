import React, { useEffect, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Form,
  Button,
  Card,
  Container,
  Row,
  Col,
  Modal,
  FormControl,
  Collapse,
  InputGroup,
  ButtonGroup,
} from "react-bootstrap";

import Link from "next/link";
import { useAuth } from "../../../../context/AuthUserContext";
import firebase from "../../../../context/Firebase";
import LoggedIn from "../../../LoggedIn";
import { useRouter } from "next/router";
import { fetchClients } from "../../../../utils/fetchAssociations";
import ClientTable from "../../../../utils/ClientTable";
import ClientInfoModal from "../../ClientInfoModal";
import ParentModal from "../../AddItem/ParentModal";
import dynamic from "next/dynamic";
import InfoModal from "../../InfoModal";
import MachineSelectionModal from "./MachineSelectionModal";
import { addServiceItem } from "../../../../utils/BluefolderService";

// This will only load the component on the client-side.
const BarcodeScannerComponent = dynamic(
  () => import("react-qr-barcode-scanner"),
  { ssr: false }
);

// Simulates a network request delay.
function simulateNetworkRequest() {
  return new Promise((resolve) => setTimeout(resolve, 2000));
}

// Custom LoadingButton component.
function LoadingButton({ type, name, route }) {
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      simulateNetworkRequest().then(() => setLoading(false));
    }
  }, [isLoading]);

  const handleClick = () => setLoading(true);

  return (
    <Link href={`/${route}`}>
      <a
        className={`btn btn-${type}`}
        disabled={isLoading}
        onClick={!isLoading ? handleClick : null}
      >
        {isLoading ? "Loading…" : name}
      </a>
    </Link>
  );
}

export default function DisplayItem() {
  const router = useRouter();
  const { signOut } = useAuth();
  const { id } = router.query;
  const [items, setItems] = useState({
    name: "",
    pn: [],
    sn: [],
    price: "",
    status: "",
    length: "",
    width: "",
    height: "",
    poNumber: "",
    trackingNumber: "",
    localSN: "", // NEW: localSN field added here
    arrival_date: "",  // NEW FIELD: Arrival Date
    visible: true,
  });  

  // These arrays will be populated from Firebase.
  const [pnOptions, setPnOptions] = useState([]);
  const [snOptions, setSnOptions] = useState([]);

  const [descriptions, setDescriptions] = useState([{ description: "", date: "" }]);
  const [workOrders, setWorkOrders] = useState([{ workOrder: "", date: "" }]);
  const [clients, setClients] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [show, setShow] = useState(false);
  const [showErr, setShowErr] = useState(false);
  const [Err, setErr] = useState("N/A");
  const [showDescModal, setShowDescModal] = useState(false);
  const [showWoModal, setShowWoModal] = useState(false);
  const [showClientModal, setShowClientModal] = useState(false);
  const [showMachineModal, setShowMachineModal] = useState(false);
  const [showParentModal, setShowParentModal] = useState(false);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [machineSelectionModal, setMachineSelectionModal] = useState(false);
  const [selectedDesc, setSelectedDesc] = useState(0);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [selectedCurrentMachine, setSelectedCurrentMachine] = useState(null);
  const [selectedParent, setSelectedParent] = useState(null);
  const [TheMachine, setTheMachine] = useState(null);
  const [machineOptions, setMachineOptions] = useState([]);
  const [search, setSearch] = useState("");
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [cameraFacing, setCameraFacing] = useState("environment");
  const [addToWebsite, setAddToWebsite] = useState(false);
  const [machinePick, setMachinePick] = useState(false);
  const [freqItem, setFreqItem] = useState(0);
  const [usagePastYear, setUsagePastYear] = useState(0);
  const [machineFrequency, setMachineFrequency] = useState(0);
  // State for the extra (dimensions/price/DOM/PO Number) section.
  const [showExtra, setShowExtra] = useState(false);
  // State for the local warehouse location inputs.
  const [localLocFrom, setLocalLocFrom] = useState("");
  const [localLocCurrent, setLocalLocCurrent] = useState("");
  // New state for DOM (Date of Manufacture)
  const [DOM, setDOM] = useState("");
  // New state for OEM, Modality, and Model.
  const [oem, setOem] = useState("");
  const [modality, setModality] = useState("");
  const [model, setModel] = useState("");

  // More info modal state.
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [itemName, setItemName] = useState("");

  const [machineFieldsInitialized, setMachineFieldsInitialized] = useState(false);

  const [storedMachine, setStoredMachine] = useState(null);


  useEffect(() => {
    const updatedFields = updateMachineFields(
      storedMachine,
      selectedCurrentMachine,
      selectedMachine
    );
    setOem(updatedFields.oem);
    setModality(updatedFields.modality);
    setModel(updatedFields.model);
  }, [storedMachine, selectedCurrentMachine, selectedMachine]);  

  // Fetch clients data.
  useEffect(() => {
    async function fetchClientsData() {
      try {
        const clientsData = await fetchClients();
        console.log(clientsData);
        setClients(clientsData);
      } catch (error) {
        console.error("Error fetching clients: ", error);
      }
    }
    fetchClientsData();
  }, []);

  // Fetch PN and SN options from Firebase.
  useEffect(() => {
    async function fetchPnSn() {
      const db = firebase.firestore();
      const snapshot = await db.collection("Test").get();
      let pnSet = new Set();
      let snSet = new Set();
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.pn) pnSet.add(data.pn);
        if (data.sn) snSet.add(data.sn);
      });
      const pnArray = [...pnSet];
      const snArray = [...snSet];
      setPnOptions(pnArray);
      setSnOptions(snArray);
    }
    fetchPnSn();
  }, []);

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  async function resolveClientFromMachine(machineRef, setClient, setMachine, isFrom = true) {
    const machineDoc = await machineRef.get();
    if (machineDoc.exists) {
      const machineData = machineDoc.data();
      setMachine({ id: machineDoc.id, ...machineData });
      
      // Determine if the machine is "interior socal"
      const isSocalInterior = machineData.name && machineData.name.toLowerCase() === "interior socal";
      if (isSocalInterior) {
        if (isFrom) {
          setShowLocalLocFrom(true);
        } else {
          setShowLocalLocCurrent(true);
        }
      } else {
        // Optionally clear the flag if it is not "interior socal"
        if (isFrom) {
          setShowLocalLocFrom(false);
        } else {
          setShowLocalLocCurrent(false);
        }
      }
      
      if (machineData.client && typeof machineData.client.get === "function") {
        const clientDoc = await machineData.client.get();
        if (clientDoc.exists) {
          setClient({ id: clientDoc.id, ...clientDoc.data() });
        }
      }
    }
  }  
  
  const fetchData = async () => {
    const db = firebase.firestore();
    const doc = await db.collection("Test").doc(id).get();
    if (doc.exists) {
      console.log("test");
      const data = doc.data();
      const normalizedPN = Array.isArray(data.pn) ? data.pn : [data.pn];
      const normalizedSN = Array.isArray(data.sn) ? data.sn : [data.sn];
      setItems({
        ...data,
        pn: normalizedPN,
        sn: normalizedSN,
      });
      setDescriptions(data.descriptions || []);
      setWorkOrders(data.workOrders || []);
      if (data.localLocFrom) setLocalLocFrom(data.localLocFrom);
      if (data.localLocCurrent) setLocalLocCurrent(data.localLocCurrent);
      if (data.DOM) {
        setDOM(data.DOM);
      }
      // Load PO Number if it exists.
      if (data.poNumber) {
        setItems((prev) => ({ ...prev, poNumber: data.poNumber }));
      }

      if (data.ClientFrom) {
        const clientFromDoc = await data.ClientFrom.get();
        if (clientFromDoc.exists) {
          setSelectedClientFrom({ id: clientFromDoc.id, ...clientFromDoc.data() });
        }
      }
      if (data.ClientCurrent) {
        const clientCurrentDoc = await data.ClientCurrent.get();
        if (clientCurrentDoc.exists) {
          setSelectedClientCurrent({ id: clientCurrentDoc.id, ...clientCurrentDoc.data() });
        }
      }
      
      if (!data.ClientFrom && data.Machine && typeof data.Machine.get === "function") {
        console.log("Entered resolveClientFromMachine for Machine (old style for From)");
        await resolveClientFromMachine(data.Machine, setSelectedClientFrom, setSelectedMachine, true);
      }
      if (!data.ClientCurrent && data.CurrentMachine && typeof data.CurrentMachine.get === "function") {
        console.log("Entered resolveClientFromMachine for CurrentMachine (old style for Current)");
        await resolveClientFromMachine(data.CurrentMachine, setSelectedClientCurrent, setSelectedCurrentMachine, false);
      }      

      // --- Update machine references (if using new fields) ---
      if (data.MachineFrom) {
        const machineFromDoc = await data.MachineFrom.get();
        if (machineFromDoc.exists) {
          setSelectedMachine({ id: machineFromDoc.id, ...machineFromDoc.data() });
        }
      }
      if (data.MachineCurrent) {
        const machineCurrentDoc = await data.MachineCurrent.get();
        if (machineCurrentDoc.exists) {
          setSelectedCurrentMachine({ id: machineCurrentDoc.id, ...machineCurrentDoc.data() });
        }
      }
      setStoredMachine(data.TheMachine || null);

      console.log( "SelectedMachine:", selectedMachine, "SelectedCurrentMachine:", selectedCurrentMachine);

      if (data.Parent) {
        const parentDoc = await data.Parent.get();
        setSelectedParent({ id: parentDoc.id, ...parentDoc.data() });
      }

      // Priority auto‑population of machine fields.
      // const updatedFields = updateMachineFields(storedMachine, selectedCurrentMachine, selectedMachine);
      // setOem(updatedFields.oem);
      // setModality(updatedFields.modality);
      // setModel(updatedFields.model);

      await fetchPhotos(id);
      await checkIfAddedToWebsite(id);
      await calculateItemFrequencyAndUsage(data.pn);
    } else {
      router.push({
        pathname: "../AddItem/NewItem",
        query: { signal: id },
      });
    }
  };

  // Returns the value for a given field from the highest-priority source.
  function getPriorityMachineField(field, theMachine, currentMachine, fromMachine) {
    if (theMachine && theMachine[field] && theMachine[field] !== "N/A" && theMachine[field].trim() !== "") {
      return theMachine[field];
    }
    if (currentMachine && currentMachine[field] && currentMachine[field] !== "N/A" && currentMachine[field].trim() !== "") {
      return currentMachine[field];
    }
    if (fromMachine && fromMachine[field] && fromMachine[field] !== "N/A" && fromMachine[field].trim() !== "") {
      return fromMachine[field];
    }
    return "";
  }

  // Returns an object with updated OEM, modality, and model fields.
  function updateMachineFields(theMachine, currentMachine, fromMachine) {
    return {
      oem: getPriorityMachineField("oem", theMachine, currentMachine, fromMachine),
      modality: getPriorityMachineField("modality", theMachine, currentMachine, fromMachine),
      model: getPriorityMachineField("model", theMachine, currentMachine, fromMachine),
    };
  }

  const calculateItemFrequencyAndUsage = async (pn) => {
    const db = firebase.firestore();
    const currentDate = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(currentDate.getFullYear() - 1);

    const normalizedPN = pn !== undefined ? pn : "";
    const itemsSnapshot = await db.collection("Test").where("pn", "==", normalizedPN).get();

    setFreqItem(itemsSnapshot.size);

    let usagePastYear = 0;
    itemsSnapshot.forEach((doc) => {
      const itemData = doc.data();
      itemData.workOrders.forEach((workOrder) => {
        const workOrderDate = new Date(workOrder.date);
        if (workOrderDate >= oneYearAgo && workOrderDate <= currentDate) {
          usagePastYear++;
        }
      });
    });
    setUsagePastYear(usagePastYear);
  };

  const fetchMachine = async (machineId) => {
    const db = firebase.firestore();
    const doc = await db.collection("Machine").doc(machineId).get();
    if (doc.exists) {
      const machineData = doc.data();
      setTheMachine(machineData);
      if (!oem) setOem(machineData.oem || machineData.OEM || "");
      if (!modality) setModality(machineData.modality || machineData.Modality || "");
      if (!model) setModel(machineData.model || machineData.Model || "");
      const machinesSnapshot = await db
        .collection("Machine")
        .where("Model", "==", machineData.Model || machineData.model)
        .get();
      setMachineFrequency(machinesSnapshot.size);
    } else {
      console.error("Machine not found");
    }
  };

  const fetchPhotos = async (docID) => {
    const storageRef = firebase.storage().ref();
    const listRef = storageRef.child(`Parts/${docID}`);
    try {
      const res = await listRef.listAll();
      const urls = await Promise.all(res.items.map((item) => item.getDownloadURL()));
      console.log("Fetched photo URLs:", urls);
      setPhotos(urls.map((url) => ({ url, file: null })));
    } catch (error) {
      console.error("Error fetching photos: ", error);
    }
  };

  const checkIfAddedToWebsite = async (docID) => {
    const db = firebase.firestore();
    const partsDoc = await db.collection("Parts").doc(docID).get();
    if (partsDoc.exists) {
      setAddToWebsite(true);
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseErr = () => setShowErr(false);
  const handleShowErr = () => setShowErr(true);
  const handleCloseSaveModal = () => setShowSaveModal(false);
  const handleClosePrintModal = () => setShowPrintModal(false);
  const handleShowSaveModal = () => setShowSaveModal(true);
  const handleShowPrintModal = () => setShowPrintModal(true);
  const handleMachineSelectionModal = () => setMachineSelectionModal(false);
  const handleCloseDescModal = () => setShowDescModal(false);
  const handleShowDescModal = () => setShowDescModal(true);
  const handleCloseWoModal = () => setShowWoModal(false);
  const handleShowWoModal = () => setShowWoModal(true);
  const handleCloseClientModal = () => setShowClientModal(false);
  const handleShowClientModal = () => setShowClientModal(true);
  const handleCloseMachineModal = () => setShowMachineModal(false);
  const handleShowMachineModal = () => {
    setShowMachineModal(true);
    setShowClientModal(false);
  };
  const handleCloseParentModal = () => setShowParentModal(false);
  const handleShowParentModal = () => setShowParentModal(true);

  // When a client is selected from the client table.
  const handleClientInfo = async (clientId) => {
    // Clear any previously selected machine and local loc info for this branch.
    if (machinePick) {
      setSelectedMachine(null);
      setShowLocalLocFrom(false);
    } else {
      setSelectedCurrentMachine(null);
      setShowLocalLocCurrent(false);
    }
    
    const db = firebase.firestore();
    const clientDoc = await db.collection("Client").doc(clientId).get();
    if (clientDoc.exists) {
      const clientData = { id: clientDoc.id, ...clientDoc.data() };
      if (machinePick) {
        setSelectedClientFrom(clientData);
      } else {
        setSelectedClientCurrent(clientData);
      }
      // Fetch machines for this client:
      const machinePromises = clientData.machines.map((machineRef) => machineRef.get());
      const machineDocs = await Promise.all(machinePromises);
      const machines = machineDocs.map((machineDoc) => ({
        id: machineDoc.id,
        ...machineDoc.data(),
      }));
      setMachineOptions(machines);
      // Close the client modal
      handleCloseClientModal();
    }
  };
  

  // Reordering function for dropdowns.
  const reorderArray = (arr, selectedValue) => {
    const newArr = arr.filter((val) => val !== selectedValue);
    return [selectedValue, ...newArr];
  };

  const [addingNewPn, setAddingNewPn] = useState(false);
  const [newPn, setNewPn] = useState("");
  const [addingNewSn, setAddingNewSn] = useState(false);
  const [newSn, setNewSn] = useState("");

  const handlePnSelect = (e) => {
    const selected = e.target.value;
    setItems((prev) => {
      let updatedPn = Array.isArray(prev.pn) ? [...prev.pn] : [];
      updatedPn[0] = selected;
      return { ...prev, pn: updatedPn };
    });
  };

  const handleSnSelect = (e) => {
    const selected = e.target.value;
    setItems((prev) => {
      let updatedSn = Array.isArray(prev.sn) ? [...prev.sn] : [];
      updatedSn[0] = selected;
      return { ...prev, sn: updatedSn };
    });
  };

  const handleAddNewPn = () => {
    if (newPn.trim() !== "") {
      setItems((prev) => ({
        ...prev,
        pn: [...prev.pn, newPn.trim()],
      }));
    }
    setNewPn("");
    setAddingNewPn(false);
  };

  const handleAddNewSn = () => {
    if (newSn.trim() !== "") {
      setItems((prev) => ({
        ...prev,
        sn: [...prev.sn, newSn.trim()],
      }));
    }
    setNewSn("");
    setAddingNewSn(false);
  };

  // Generate custom document ID if needed.
  const generateCustomID = () => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    return `AIS${randomNum}`;
  };

  function shallowClean(obj) {
    const newObj = {};
    for (const key in obj) {
      console.log(key, obj[key]);
      if (obj.hasOwnProperty(key)) {
        newObj[key] = (obj[key] === undefined ? "" : obj[key]);
      }
    }
    return newObj;
  }

  async function toSend() {
    const db = firebase.firestore();

    // Always use the current state values for OEM, modality, and model.
    const machineData = {
      ...(TheMachine || {}),
      oem: oem,
      modality: modality,
      model: model,
    };

    const formattedItems = { ...items, descriptions, workOrders };
    // Remove any unused fields.
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

    // Clean pn and sn arrays to replace undefined values with an empty string.
    formattedItems.pn = (items.pn || []).map(value => value === undefined ? "" : value);
    formattedItems.sn = (items.sn || []).map(value => value === undefined ? "" : value);

    if (selectedMachine && selectedMachine.id) {
      formattedItems.MachineFrom = db.collection("Machine").doc(selectedMachine.id);
    }
    
    if (selectedCurrentMachine && selectedCurrentMachine.id) {
      formattedItems.MachineCurrent = db.collection("Machine").doc(selectedCurrentMachine.id);
    }    
    
    if (selectedParent && selectedParent.id) {
      formattedItems.Parent = db.collection("Test").doc(selectedParent.id);
    }

    // NEW: Set separate client references.
    if (selectedClientFrom && selectedClientFrom.id) {
      formattedItems.ClientFrom = db.collection("Client").doc(selectedClientFrom.id);
    }
    if (selectedClientCurrent && selectedClientCurrent.id) {
      formattedItems.ClientCurrent = db.collection("Client").doc(selectedClientCurrent.id);
    }

    let docId = id;
    try {
      if (docId) {
        // Check if a localSN is provided and if it differs from the current docId.
        const newDocId =
          items.localSN && items.localSN.trim() !== ""
            ? items.localSN.trim()
            : docId;
        if (docId !== newDocId) {
          // Migrate: Create a new document with the newDocId.
          await db.collection("Test").doc(newDocId).set(formattedItems);

          if (selectedMachine && selectedMachine.id) {
            const machineRef = db.collection("Machine").doc(selectedMachine.id);
            const machineDoc = await machineRef.get();
            if (machineDoc.exists) {
              await machineRef.update({
                associatedParts: firebase.firestore.FieldValue.arrayUnion(
                  db.collection("Test").doc(newDocId)
                ),
              });
            }
          }

          if (selectedCurrentMachine && selectedCurrentMachine.id) {
            const currentMachineRef = db
              .collection("Machine")
              .doc(selectedCurrentMachine.id);
            const currentMachineDoc = await currentMachineRef.get();
            if (currentMachineDoc.exists) {
              await currentMachineRef.update({
                associatedParts: firebase.firestore.FieldValue.arrayUnion(
                  db.collection("Test").doc(newDocId)
                ),
              });
            }
          }
          // Delete the old document.
          await db.collection("Test").doc(docId).delete();
          // Set docId to the new document ID.
          docId = newDocId;
        } else {
          // Deep-clean the formattedItems to remove any undefined nested values.
          const cleanFormattedItems = shallowClean(formattedItems);
          await db.collection("Test").doc(docId).update(cleanFormattedItems);

          if (selectedMachine && selectedMachine.id) {
            const machineRef = db.collection("Machine").doc(selectedMachine.id);
            const machineDoc = await machineRef.get();
            if (machineDoc.exists) {
              await machineRef.update({
                associatedParts: firebase.firestore.FieldValue.arrayUnion(
                  db.collection("Test").doc(docId)
                ),
              });
            }
          }

          if (selectedCurrentMachine && selectedCurrentMachine.id) {
            const currentMachineRef = db
              .collection("Machine")
              .doc(selectedCurrentMachine.id);
            const currentMachineDoc = await currentMachineRef.get();
            if (currentMachineDoc.exists) {
              await currentMachineRef.update({
                associatedParts: firebase.firestore.FieldValue.arrayUnion(
                  db.collection("Test").doc(docId)
                ),
              });
            }
          }
        }
      } else {
        // For a new item, if localSN is provided, use it; otherwise, generate a custom ID.
        docId =
          items.localSN && items.localSN.trim() !== ""
            ? items.localSN.trim()
            : generateCustomID();
        await db.collection("Test").doc(docId).set(formattedItems);

        if (selectedMachine && selectedMachine.id) {
          const machineRef = db.collection("Machine").doc(selectedMachine.id);
          const machineDoc = await machineRef.get();
          if (machineDoc.exists) {
            await machineRef.update({
              associatedParts: firebase.firestore.FieldValue.arrayUnion(
                db.collection("Test").doc(docId)
              ),
            });
          }
        }

        if (selectedCurrentMachine && selectedCurrentMachine.id) {
          const currentMachineRef = db
            .collection("Machine")
            .doc(selectedCurrentMachine.id);
          const currentMachineDoc = await currentMachineRef.get();
          if (currentMachineDoc.exists) {
            await currentMachineRef.update({
              associatedParts: firebase.firestore.FieldValue.arrayUnion(
                db.collection("Test").doc(docId)
              ),
            });
          }
        }
      }
      // Upload any new photos to Firebase Storage.
      await uploadPhotos(docId);
      console.log("Item saved and associatedParts updated!");

      // Redirect to the new URL using the new document id.
      router.push(`/NewSearch/item/${docId}`);

      // Optionally, you can also show a save confirmation modal:
      handleShowSaveModal();
    } catch (error) {
      console.error("Error saving data:", error);
    }
  }  

  // Additional state for local warehouse location inputs.
  const [showLocalLocFrom, setShowLocalLocFrom] = useState(false);
  const [showLocalLocCurrent, setShowLocalLocCurrent] = useState(false);

  // When a machine is selected from the modal.
  const handleSetSelectedMachine = (machine) => {
    const condition = (name) => name && name.toLowerCase() === "interior socal";
    if (machinePick) {
      setSelectedMachine({ id: machine.id, name: machine.name });
      setShowLocalLocFrom(condition(machine.name));
    } else {
      setSelectedCurrentMachine({ id: machine.id, name: machine.name });
      setShowLocalLocCurrent(condition(machine.name));
    }
    fetchMachine(machine.id);
    // Close the machine modal (assuming you're using showMachineModal to control it)
    setShowMachineModal(false);
  };  

  const uploadPhotos = async (docID) => {
    const storageRef = firebase.storage().ref();
    for (let i = 0; i < photos.length; i++) {
      if (photos[i].file) {
        const photoRef = storageRef.child(
          `Parts/${docID}/${docID}${i === 0 ? ".jpg" : `.${i + 1}.jpg`}`
        );
        const metadata = {
          contentType: "image/png",
        };
        await photoRef.put(photos[i].file, metadata);
        const url = await photoRef.getDownloadURL();
        photos[i].url = url;
      }
    }
  };

  // Function to handle printing the label.
  const handlePrint = async () => {
    if (!items.name) {
      alert("Missing name");
      return;
    }

    let clientName = "";

    // Attempt to fetch client name from the Machine document reference.
    if (items.Machine && typeof items.Machine.get === "function") {
      try {
        const machineDoc = await items.Machine.get();
        if (machineDoc.exists) {
          const machineData = machineDoc.data();
          if (machineData.client && typeof machineData.client.get === "function") {
            const clientDoc = await machineData.client.get();
            if (clientDoc.exists) {
              clientName = clientDoc.data().name || "";
            }
          }
        }
      } catch (error) {
        console.error("Error fetching machine or client:", error);
      }
    } else {
      console.warn("No Machine reference available in the item");
    }
    console.log(clientName, ":", items.client)
    // Fallback: if no client name was found, check items.client.
    if (!clientName && items.client) {
      if (typeof items.client.get === "function") {
        try {
          const clientDoc = await items.client.get();
          if (clientDoc.exists) {
            clientName = clientDoc.data().name || "";
          }
        } catch (error) {
          console.error("Error fetching client from items.client:", error);
        }
      } else {
        clientName = items.client;
      }
    }

    const payload = {
      name: items.name,
      pn: items.pn,
      sn: items.sn,
      wo: workOrders && workOrders.length > 0 ? workOrders[0].workOrder : "",
      client: clientName,
      status: items.status,
      local_sn: id,
      descriptions: descriptions,
      date: items.date,
      DOM: DOM,
      oem: oem,
      modality: modality,
      model: model,
      poNumber: items.poNumber,
      arrival_date: items.arrival_date, // NEW: Include arrival_date
    };

    console.log("Payload for printing:", payload);
    try {
      const response = await fetch("https://0ad5-174-76-22-138.ngrok-free.app/print-label", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      console.log("Print result:", result.status);
      
      if (result.status.includes("successfully.")) {
        handleShowPrintModal();
      } else {
        console.error("Error printing label:", result.error);
      }
    } catch (error) {
      console.error("Error printing label:", error);
    }
  };

  async function handleSubmit(event) {
    event.preventDefault();
    // Only check that the Name field is filled out.
    if (!items.name) {
      handleShow(); // This shows the "missing field" modal.
    } else {
      toSend();
    }
  }

  // Handlers for input changes.
  const handleChange = (field) => (event) => {
    const value = event.target ? event.target.value : event.value;
    setItems((prevItems) => ({ ...prevItems, [field]: value }));
  };

  const addDescription = () => {
    setDescriptions([...descriptions, { description: "", date: "" }]);
  };

  const removeDescription = (index) => {
    setDescriptions(descriptions.filter((_, i) => i !== index));
  };

  const handleDescriptionChange = (index, field, value) => {
    const newDescriptions = descriptions.map((desc, i) =>
      i === index ? { ...desc, [field]: value } : desc
    );
    setDescriptions(newDescriptions);
  };

  const addWorkOrder = () => {
    setWorkOrders([...workOrders, { workOrder: "", date: "" }]);
  };

  const removeWorkOrder = (index) => {
    setWorkOrders(workOrders.filter((_, i) => i !== index));
  };

  const handleWorkOrderChange = (index, field, value) => {
    const newWorkOrders = workOrders.map((wo, i) =>
      i === index ? { ...wo, [field]: value } : wo
    );
    setWorkOrders(newWorkOrders);
  };

  const listDescriptions = () => {
    setShowDescModal(true);
  };

  const selectDescription = (index) => {
    setSelectedDesc(index);
    setShowDescModal(false);
  };

  const handleShowCameraModal = () => {
    setShowCameraModal(true);
  };

  const handleCloseCameraModal = () => {
    setShowCameraModal(false);
    setCapturedPhoto(null);
  };

  const handleCapture = (err, result) => {
    if (result) {
      setCapturedPhoto(result);
    }
  };

  const savePhoto = () => {
    setPhotos((prevPhotos) => [
      ...prevPhotos,
      { file: capturedPhoto, url: URL.createObjectURL(capturedPhoto) },
    ]);
    setCapturedPhoto(null);
    handleCloseCameraModal();
  };

  const removePhoto = (index) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const mostRecentWorkOrder =
    workOrders && workOrders.length > 0
      ? workOrders.reduce((latest, current) => {
          const latestDate = new Date(latest.date);
          const currentDate = new Date(current.date);
          return currentDate > latestDate ? current : latest;
        }, workOrders[0])
      : {};

  const capturePhoto = () => {
    const video = document.querySelector("video");
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob((blob) => {
      setCapturedPhoto(blob);
    }, "image/png");
  };

  const handleShowInfoModal = async () => {
    const db = firebase.firestore();
    try {
      const doc = await db.collection("Test").doc(id).get();
      if (doc.exists) {
        const data = doc.data();
        setItemName(data.name || "N/A");
        setShowInfoModal(true);
      } else {
        console.error("Item not found");
      }
    } catch (error) {
      console.error("Error fetching item info:", error);
    }
  };

  const handleCloseInfoModal = () => setShowInfoModal(false);

  const handlePnChange = (index, value) => {
    setItems((prev) => {
      const newPn = [...prev.pn];
      newPn[index] = value;
      return { ...prev, pn: newPn };
    });
  };

  const addPn = () => {
    setItems((prev) => ({
      ...prev,
      pn: [...prev.pn, ""],
    }));
  };

  const handleSnChange = (index, value) => {
    setItems((prev) => {
      const newSn = [...prev.sn];
      newSn[index] = value;
      return { ...prev, sn: newSn };
    });
  };

  const addSn = () => {
    setItems((prev) => ({
      ...prev,
      sn: [...prev.sn, ""],
    }));
  };

  const browseInputRef = useRef(null);

  const handleBrowsePhotos = () => {
    if (browseInputRef.current) {
      browseInputRef.current.click();
    }
  };

  const handleFilesSelected = (e) => {
    const files = e.target.files;
    if (files.length) {
      const newPhotos = [];
      for (let i = 0; i < files.length; i++) {
        newPhotos.push({
          file: files[i],
          url: URL.createObjectURL(files[i]),
        });
      }
      setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
    }
    e.target.value = "";
  };

  const [currentPnIndex, setCurrentPnIndex] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentSnIndex, setCurrentSnIndex] = useState(0);
  const [showSnDropdown, setShowSnDropdown] = useState(false);

  const handleAddNewClient = () => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    router.push(`../client/AIS${randomNum}/addClient?from=item&itemId=${id || ""}`);
  };

  const handleBluefolderButton = async () => {
    // Check that the work order field is filled out (using workOrders[0].workOrder as current)
    const currentWorkOrder = workOrders && workOrders.length > 0 ? workOrders[0].workOrder : "";
    if (!currentWorkOrder) {
      alert("Please fill out the work order field before adding to BlueFolder.");
      return;
    }
  
    // Build the payload to send to your proxy endpoint.
    const payload = {
      name: items.name,
      pn: items.pn[0] || "",
      sn: items.sn[0] || "",
      status: items.status,
      description: descriptions[selectedDesc]?.description || "",
      workOrder: currentWorkOrder,
      localsn: items.localSN || "",
    };
  
    try {
      // Replace with your ngrok URL and appropriate endpoint path (e.g., /api/bluefolder)
      const response = await fetch("https://0ad5-174-76-22-138.ngrok-free.app/bluefolder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });      
      const result = await response.json();
      alert("BlueFolder service item added successfully!");
      console.log("BlueFolder result:", result);
    } catch (error) {
      console.error("BlueFolder error:", error);
      alert("Error adding data to BlueFolder.");
    }
  };
  
  // New states for separate client selections:
const [selectedClientFrom, setSelectedClientFrom] = useState(null);
const [selectedClientCurrent, setSelectedClientCurrent] = useState(null);

  return (
    <LoggedIn>
      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Error</Modal.Title>
          </Modal.Header>
          <Modal.Body>Missing field</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              Ok
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={showErr} onHide={handleCloseErr}>
          <Modal.Header closeButton>
            <Modal.Title>Error</Modal.Title>
          </Modal.Header>
          <Modal.Body>{Err}</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleCloseErr}>
              Ok
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={showSaveModal} onHide={handleCloseSaveModal}>
          <Modal.Header closeButton>
            <Modal.Title>Save Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>Data has been saved successfully.</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleCloseSaveModal}>
              Ok
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={showPrintModal} onHide={handleClosePrintModal}>
          <Modal.Header closeButton>
            <Modal.Title>Print Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>Info has been sent to print.</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClosePrintModal}>
              Ok
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showDescModal} onHide={handleCloseDescModal}>
          <Modal.Header closeButton>
            <Modal.Title>Descriptions</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Button variant="primary" className="mb-3" onClick={addDescription}>
              Add Description
            </Button>
            {descriptions.map((desc, index) => (
              <Row key={index} className="mb-3">
                <Button
                  variant="outline-secondary"
                  className="w-100"
                  onClick={() => selectDescription(index)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="d-flex justify-content-between">
                    <span>{desc.description || "Description"}</span>
                    <span
                      style={{
                        borderLeft: "1px solid #ccc",
                        paddingLeft: "10px",
                      }}
                    >
                      {desc.date || "Date"}
                    </span>
                  </div>
                </Button>
              </Row>
            ))}
            <Button variant="primary" onClick={handleCloseDescModal}>
              OK
            </Button>
          </Modal.Body>
        </Modal>

        <Modal show={showWoModal} onHide={handleCloseWoModal}>
          <Modal.Header closeButton>
            <Modal.Title>Work Orders</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Button
              variant="primary"
              className="mb-3"
              onClick={addWorkOrder}
              style={{ marginBottom: "1rem" }}
            >
              Add Work Order
            </Button>
            {workOrders.map((wo, index) => (
              <Row key={index} className="mb-3">
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="Work Order"
                    value={wo.workOrder}
                    onChange={(e) =>
                      handleWorkOrderChange(index, "workOrder", e.target.value)
                    }
                    style={{ marginBottom: "0.5rem" }}
                  />
                </Col>
                <Col>
                  <Form.Control
                    type="date"
                    placeholder="Date"
                    value={wo.date}
                    onChange={(e) =>
                      handleWorkOrderChange(index, "date", e.target.value)
                    }
                  />
                </Col>
                <Col>
                  <Button
                    variant="danger"
                    onClick={() => removeWorkOrder(index)}
                  >
                    Remove
                  </Button>
                </Col>
              </Row>
            ))}
            <Button variant="primary" onClick={handleCloseWoModal}>
              OK
            </Button>
          </Modal.Body>
        </Modal>

        <ClientInfoModal
          show={showMachineModal}
          handleClose={handleCloseMachineModal}
          selectedClient={selectedClient}
          machineOptions={machineOptions}
          setSelectedMachine={handleSetSelectedMachine}
        />

        <Modal show={showClientModal} onHide={handleCloseClientModal}>
          <Modal.Header closeButton>
            <Modal.Title>Select Client</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormControl
              type="text"
              placeholder="Search by name"
              className="mb-3"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <ClientTable
              clients={clients.filter((client) =>
                (client.name || "").toLowerCase().includes(search.toLowerCase())
              )}
              onSelectClient={handleClientInfo}
              onInfoClick={handleClientInfo}
              clearSelection={() => handleClientInfo(null)}
              onAddClient={handleAddNewClient}
            />
          </Modal.Body>
        </Modal>

        <ParentModal
          show={showParentModal}
          handleClose={handleCloseParentModal}
          setSelectedParent={setSelectedParent}
        />

        <MachineSelectionModal
          show={machineSelectionModal}
          handleClose={() => setMachineSelectionModal(false)}
          setMachine={setTheMachine}
        />

        <Modal show={showCameraModal} onHide={handleCloseCameraModal}>
          <Modal.Header closeButton>
            <Modal.Title>Take a Photo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="camera">
              {!capturedPhoto && (
                <BarcodeScannerComponent
                  width="100%"
                  height={300}
                  onUpdate={handleCapture}
                  facingMode={cameraFacing}
                />
              )}
              {capturedPhoto && (
                <div className="photo-preview">
                  <img
                    src={URL.createObjectURL(capturedPhoto)}
                    alt="captured"
                    style={{ width: "100%" }}
                  />
                </div>
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            {!capturedPhoto ? (
              <>
                <Button
                  onClick={capturePhoto}
                  style={{
                    borderRadius: "50%",
                    width: "60px",
                    height: "60px",
                    position: "absolute",
                    left: "50%",
                    transform: "translateX(-50%)",
                    bottom: "10px",
                  }}
                >
                  📷
                </Button>
                <Button
                  onClick={() =>
                    setCameraFacing((prev) =>
                      prev === "environment" ? "user" : "environment"
                    )
                  }
                >
                  Flip Camera
                </Button>
                <Button variant="secondary" onClick={handleCloseCameraModal}>
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="secondary"
                  onClick={() => setCapturedPhoto(null)}
                >
                  Retake
                </Button>
                <Button variant="primary" onClick={savePhoto}>
                  OK
                </Button>
              </>
            )}
          </Modal.Footer>
        </Modal>

        <InfoModal
          show={showInfoModal}
          handleClose={handleCloseInfoModal}
          itemName={items.name}
          dimensions={items.length + "," + items.width + "," + items.height}
          price={items.price}
          freqI={freqItem}
          freqM={machineFrequency}
          usage={usagePastYear}
        />

        <Container
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: "100vh" }}
        >
          <div className="w-100" style={{ maxWidth: "600px" }}>
            <Card className="align-items-center justify-content-center">
              <Card.Body>
                <h2 className="text-center mb-4">Item</h2>
                <Form onSubmit={handleSubmit}>
                  {/* Row for Name and PN */}
                  <Row className="mb-3">
                    <Col>
                      <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type="text"
                          value={items.name}
                          onChange={handleChange("name")}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="pn">
                        <Form.Label>Product Number</Form.Label>
                        <div style={{ position: "relative" }}>
                          <InputGroup>
                            <Form.Control
                              type="text"
                              value={items.pn[currentPnIndex] || ""}
                              onChange={(e) =>
                                handlePnChange(currentPnIndex, e.target.value)
                              }
                            />
                            <Button
                              variant="outline-secondary"
                              onClick={() => setShowDropdown(!showDropdown)}
                            >
                              &#9662;
                            </Button>
                            <InputGroup.Text>
                              <Button
                                variant="outline-secondary"
                                onClick={() => setAddingNewPn(true)}
                              >
                                +
                              </Button>
                            </InputGroup.Text>
                          </InputGroup>
                          {showDropdown && (
                            <div
                              style={{
                                position: "absolute",
                                top: "100%",
                                left: 0,
                                right: 0,
                                backgroundColor: "white",
                                border: "1px solid #ccc",
                                zIndex: 1000,
                                maxHeight: "150px",
                                overflowY: "auto",
                              }}
                            >
                              {items.pn.map((pnOption, idx) => (
                                <div
                                  key={idx}
                                  style={{ padding: "8px", cursor: "pointer" }}
                                  onClick={() => {
                                    setCurrentPnIndex(idx);
                                    setShowDropdown(false);
                                  }}
                                >
                                  {pnOption}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        {addingNewPn && (
                          <Form.Control
                            type="text"
                            placeholder="Enter new PN"
                            value={newPn}
                            onChange={(e) => setNewPn(e.target.value)}
                            onBlur={handleAddNewPn}
                            onKeyDown={(e) =>
                              e.key === "Enter" && handleAddNewPn()
                            }
                          />
                        )}
                      </Form.Group>
                    </Col>
                  </Row>
                  {/* Row for SN and Status */}
                  <Row className="mb-3">
                    <Col>
                      <Form.Group controlId="sn">
                        <Form.Label>Serial Number</Form.Label>
                        <div style={{ position: "relative" }}>
                          <InputGroup>
                            <Form.Control
                              type="text"
                              value={items.sn[currentSnIndex] || ""}
                              onChange={(e) =>
                                handleSnChange(currentSnIndex, e.target.value)
                              }
                            />
                            <Button
                              variant="outline-secondary"
                              onClick={() => setShowSnDropdown(!showSnDropdown)}
                            >
                              &#9662;
                            </Button>
                            <InputGroup.Text>
                              <Button
                                variant="outline-secondary"
                                onClick={() => setAddingNewSn(true)}
                              >
                                +
                              </Button>
                            </InputGroup.Text>
                          </InputGroup>
                          {showSnDropdown && (
                            <div
                              style={{
                                position: "absolute",
                                top: "100%",
                                left: 0,
                                right: 0,
                                backgroundColor: "white",
                                border: "1px solid #ccc",
                                zIndex: 1000,
                                maxHeight: "150px",
                                overflowY: "auto",
                              }}
                            >
                              {items.sn.map((snOption, idx) => (
                                <div
                                  key={idx}
                                  style={{ padding: "8px", cursor: "pointer" }}
                                  onClick={() => {
                                    setCurrentSnIndex(idx);
                                    setShowSnDropdown(false);
                                  }}
                                >
                                  {snOption}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        {addingNewSn && (
                          <Form.Control
                            type="text"
                            placeholder="Enter new SN"
                            value={newSn}
                            onChange={(e) => setNewSn(e.target.value)}
                            onBlur={handleAddNewSn}
                            onKeyDown={(e) =>
                              e.key === "Enter" && handleAddNewSn()
                            }
                          />
                        )}
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="status">
                        <Form.Label>Status</Form.Label>
                        <Form.Select
                          value={items.status || ""}
                          onChange={handleChange("status")}
                        >
                          <option value="">Select status</option>
                          <option value="Good">Good</option>
                          <option value="Bad">Bad</option>
                          <option value="Unknown">Unknown</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                  {/* Row for OEM, Modality, Model */}
                  <Row className="mb-3">
                    <Col>
                      <Form.Label>OEM</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="OEM"
                        value={oem}
                        onChange={(e) => setOem(e.target.value)}
                      />
                    </Col>
                    <Col>
                      <Form.Label>Modality</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Modality"
                        value={modality}
                        onChange={(e) => setModality(e.target.value)}
                      />
                    </Col>
                    <Col>
                      <Form.Label>Model</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Model"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                      />
                    </Col>
                  </Row>
                  {/* Work Orders and Inline Description Section */}
                  <div style={{ marginBottom: "1rem", marginTop: "1rem" }}>
                    <div className="d-flex align-items-center">
                      <Button
                        variant="outline-secondary"
                        onClick={handleShowWoModal}
                        className="me-2"
                      >
                        Manage Work Orders
                      </Button>
                      {workOrders.length > 0 && (
                        <div className="d-flex flex-column align-items-start">
                          <Form.Label>Work Order</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Most Recent Work Order"
                            value={mostRecentWorkOrder.workOrder}
                            onChange={(e) =>
                              handleWorkOrderChange(
                                workOrders.indexOf(mostRecentWorkOrder),
                                "workOrder",
                                e.target.value
                              )
                            }
                            style={{ marginBottom: "0.5rem" }}
                          />
                          <Form.Label>Date</Form.Label>
                          <Form.Control
                            type="date"
                            placeholder="Work Order Date"
                            value={mostRecentWorkOrder.date}
                            onChange={(e) =>
                              handleWorkOrderChange(
                                workOrders.indexOf(mostRecentWorkOrder),
                                "date",
                                e.target.value
                              )
                            }
                            style={{ marginBottom: "0.5rem" }}
                          />
                        </div>
                      )}
                    </div>
                    <div style={{ marginBottom: "1rem" }}>
                      <Form.Group controlId="desc">
                        <Button
                          variant="outline-secondary"
                          onClick={listDescriptions}
                          className="mb-2 me-2"
                        >
                          List Descriptions
                        </Button>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          placeholder="Enter description"
                          value={descriptions[selectedDesc]?.description || ""}
                          onChange={(e) =>
                            handleDescriptionChange(
                              selectedDesc,
                              "description",
                              e.target.value
                            )
                          }
                          style={{ marginBottom: "0.5rem" }}
                        />
                        <Form.Control
                          type="date"
                          value={descriptions[selectedDesc]?.date || ""}
                          onChange={(e) =>
                            handleDescriptionChange(
                              selectedDesc,
                              "date",
                              e.target.value
                            )
                          }
                          style={{
                            marginTop: "0.5rem",
                            marginBottom: "0.5rem",
                          }}
                        />
                      </Form.Group>
                    </div>
                  </div>
                  {/* Machine Selection Row */}
                  <div style={{ marginBottom: "1rem" }}>
                    <Row className="mb-3">
                      <Col>
                        <Button
                          variant="outline-secondary"
                          onClick={() => {
                            setMachinePick(true);
                            handleShowClientModal();
                          }}
                          className="me-2"
                        >
                          Select From
                        </Button>
                        {selectedClientFrom && (
                          <div style={{ border: "1px solid #ccc", padding: "0.75rem", borderRadius: "4px", marginBottom: "1rem" }}>
                            <p>
                              <strong>Selected Client (From):</strong> {selectedClientFrom.name}
                            </p>
                            <div style={{ marginTop: "0.5rem" }}>
                              <Button variant="outline-secondary" onClick={() => setShowMachineModal(true)}>
                                Select Machine for {selectedClientFrom.name}
                              </Button>
                              {selectedMachine && (
                                <>
                                  <p style={{ marginTop: "0.5rem" }}>
                                    <strong>Selected Machine (From):</strong> {selectedMachine.name}
                                  </p>
                                  {showLocalLocFrom && (
                                    <Form.Group controlId="localLocFrom" className="mt-2">
                                      <Form.Label>Local Loc (From)</Form.Label>
                                      <Form.Control
                                        type="text"
                                        value={localLocFrom}
                                        onChange={(e) => setLocalLocFrom(e.target.value)}
                                      />
                                    </Form.Group>
                                  )}
                                </>
                              )}
                            </div>
                          </div>
                        )}
                      </Col>
                      <Col>
                        <Button
                          variant="outline-secondary"
                          onClick={() => {
                            setMachinePick(false);
                            handleShowClientModal();
                          }}
                          className="me-2"
                        >
                          Select Current
                        </Button>
                        {selectedClientCurrent && (
                          <div style={{ border: "1px solid #ccc", padding: "0.75rem", borderRadius: "4px", marginBottom: "1rem" }}>
                            <p>
                              <strong>Selected Client (Current):</strong> {selectedClientCurrent.name}
                            </p>
                            <div style={{ marginTop: "0.5rem" }}>
                              <Button variant="outline-secondary" onClick={() => setShowMachineModal(true)}>
                                Select Machine for {selectedClientCurrent.name}
                              </Button>
                              {selectedCurrentMachine && (
                                <>
                                  <p style={{ marginTop: "0.5rem" }}>
                                    <strong>Selected Machine (Current):</strong> {selectedCurrentMachine.name}
                                  </p>
                                  {showLocalLocCurrent && (
                                    <Form.Group controlId="localLocCurrent" className="mt-2">
                                      <Form.Label>Local Loc (Current)</Form.Label>
                                      <Form.Control
                                        type="text"
                                        value={localLocCurrent}
                                        onChange={(e) => setLocalLocCurrent(e.target.value)}
                                      />
                                    </Form.Group>
                                  )}
                                </>
                              )}
                            </div>
                          </div>
                        )}
                      </Col>
                      <Col>
                        <Button
                          variant="outline-secondary"
                          onClick={handleShowParentModal}
                          className="me-2"
                        >
                          Select Parent
                        </Button>
                        {selectedParent && (
                          <Form.Control
                            type="text"
                            placeholder="Selected Parent"
                            value={selectedParent.name}
                            readOnly
                            style={{ marginTop: "0.5rem" }}
                          />
                        )}
                      </Col>
                    </Row>
                  </div>
                  {/* Photo and Website Options */}
                  <div style={{ marginBottom: "1rem" }}>
                    <Row className="mb-3">
                      <Col xs={6}>
                        <ButtonGroup>
                          <Button
                            variant="outline-secondary"
                            onClick={handleShowCameraModal}
                          >
                            Take Photo
                          </Button>
                          <Button
                            variant="outline-secondary"
                            onClick={handleBrowsePhotos}
                          >
                            Browse
                          </Button>
                        </ButtonGroup>
                      </Col>
                      <Col xs={6}>
                        <Button
                          
                          variant="secondary"
                          onClick={handleBluefolderButton}
                          style={{ marginLeft: "0.5rem", marginRight: ".5rem" }}
                        >
                          BlueFolder
                        </Button>

                        <Button
                          variant={addToWebsite ? "primary" : "outline-primary"}
                          onClick={() => setAddToWebsite((prev) => !prev)}
                        >
                          {addToWebsite ? "✓ Add to Website" : "Add to Website"}
                        </Button>
                      </Col>
                    </Row>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      ref={browseInputRef}
                      style={{ display: "none" }}
                      onChange={handleFilesSelected}
                    />
                  </div>
                  {/* Photo Gallery */}
                  {photos && photos.length > 0 && (
                    <div
                      className="photo-gallery"
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "10px",
                        marginBottom: "1rem",
                      }}
                    >
                      {photos.map((photo, index) => (
                        <div
                          key={index}
                          style={{
                            position: "relative",
                            width: "100px",
                            height: "100px",
                          }}
                        >
                          <img
                            src={photo.url}
                            alt={`Photo ${index + 1}`}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                          {photo.file && (
                            <Button
                              variant="danger"
                              size="sm"
                              style={{
                                position: "absolute",
                                top: 0,
                                right: 0,
                                padding: "0 5px",
                              }}
                              onClick={() => removePhoto(index)}
                            >
                              x
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  {/* Action Buttons */}
                  <div className="mt-3 d-flex flex-wrap align-items-center">
                    <Button
                      variant="primary"
                      type="submit"
                      style={{ marginRight: "1rem" }}
                    >
                      Save
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={handleShowInfoModal}
                      style={{ marginRight: "1rem" }}
                    >
                      More Info
                    </Button>
                    <LoadingButton
                      type="primary"
                      name="Back"
                      route="NewSearch/mainSearch"
                    />
                    <Button
                      variant="info"
                      onClick={handlePrint}
                      style={{ marginLeft: "auto" }}
                    >
                      Print Label
                    </Button>
                  </div>
                  <div style={{ textAlign: "center", margin: "1rem 0" }}>
                    <Button
                      variant="link"
                      style={{
                        textDecoration: "none",
                        color: "black",
                        fontSize: "24px",
                      }}
                      onClick={() => setShowExtra(!showExtra)}
                    >
                      ▼
                    </Button>
                  </div>
                  <Collapse in={showExtra}>
                    <div id="extra-collapse" className="mt-3">
                      <Row>
                        <Form.Group as={Col} controlId="dimensions">
                          <Form.Label>Dimensions</Form.Label>
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <Form.Control
                              placeholder="Length"
                              type="text"
                              value={items.length}
                              onChange={handleChange("length")}
                            />
                            <span style={{ padding: "0 5px" }}>x</span>
                            <Form.Control
                              placeholder="Width"
                              type="text"
                              value={items.width}
                              onChange={handleChange("width")}
                            />
                            <span style={{ padding: "0 5px" }}>x</span>
                            <Form.Control
                              placeholder="Height"
                              type="text"
                              value={items.height}
                              onChange={handleChange("height")}
                            />
                          </div>
                        </Form.Group>
                        <Form.Group as={Col} controlId="trackingNumber">
                          <Form.Label>Tracking Number</Form.Label>
                          <Form.Control
                            placeholder="Tracking Number"
                            type="text"
                            value={items.trackingNumber}
                            onChange={handleChange("trackingNumber")}
                          />
                        </Form.Group>
                      </Row>

                      <Row className="mt-3">
                        <Form.Group as={Col} controlId="Price">
                          <Form.Label>Price</Form.Label>
                          <Form.Control
                            placeholder="Price"
                            type="text"
                            value={items.price}
                            onChange={handleChange("price")}
                          />
                        </Form.Group>
                        <Form.Group as={Col} controlId="DOM">
                          <Form.Label>DOM</Form.Label>
                          <Form.Control
                            placeholder="Date of Manufacture"
                            type="date"
                            value={DOM}
                            onChange={(e) => setDOM(e.target.value)}
                          />
                        </Form.Group>
                        <Form.Group as={Col} controlId="poNumber">
                          <Form.Label>PO Number</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="PO Number"
                            value={items.poNumber || ""}
                            onChange={handleChange("poNumber")}
                          />
                        </Form.Group>
                      </Row>
                      <Row className="mt-3">
                        <Form.Group as={Col} controlId="localSN">
                          <Form.Label>Local SN</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter Local SN"
                            value={items.localSN || ""}
                            onChange={handleChange("localSN")}
                          />
                        </Form.Group>
                        <Form.Group as={Col} controlId="arrivalDate">
                          <Form.Label>Arrival Date</Form.Label>
                          <Form.Control
                            placeholder="Enter Arrival Date"
                            type="date"
                            value={items.arrival_date}
                            onChange={(e) =>
                              setItems((prev) => ({ ...prev, arrival_date: e.target.value }))
                            }
                          />
                        </Form.Group>
                      </Row>
                    </div>
                  </Collapse>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </Container>
      </div>
      {/* Camera Modal */}
      <Modal show={showCameraModal} onHide={handleCloseCameraModal}>
        <Modal.Header closeButton>
          <Modal.Title>Take a Photo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="camera">
            {!capturedPhoto ? (
              <BarcodeScannerComponent
                width="100%"
                height={300}
                onUpdate={handleCapture}
                facingMode={cameraFacing}
              />
            ) : (
              <div className="photo-preview">
                <img
                  src={URL.createObjectURL(capturedPhoto)}
                  alt="captured"
                  style={{ width: "100%" }}
                />
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          {!capturedPhoto ? (
            <>
              <Button
                onClick={capturePhoto}
                style={{
                  borderRadius: "50%",
                  width: "60px",
                  height: "60px",
                  position: "absolute",
                  left: "50%",
                  transform: "translateX(-50%)",
                  bottom: "10px",
                }}
              >
                📷
              </Button>
              <Button
                onClick={() =>
                  setCameraFacing((prev) =>
                    prev === "environment" ? "user" : "environment"
                  )
                }
              >
                Flip Camera
              </Button>
              <Button variant="secondary" onClick={handleCloseCameraModal}>
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="secondary"
                onClick={() => setCapturedPhoto(null)}
              >
                Retake
              </Button>
              <Button variant="primary" onClick={savePhoto}>
                OK
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </LoggedIn>
  );
}
