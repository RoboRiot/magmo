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
  Spinner,
} from "react-bootstrap";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useAuth } from "../../../context/AuthUserContext";
import firebase from "../../../context/Firebase";
import LoggedIn from "../../LoggedIn";
import { useRouter } from "next/router";
import { fetchClients } from "../../../utils/fetchAssociations";
import ClientTable from "../../../utils/ClientTable";
import ClientInfoModal from "../ClientInfoModal";
import ParentModal from "./ParentModal";
import MachineSelectionModal from "../item/[id]/MachineSelectionModal";
import InfoModal from "../InfoModal";



// Load BarcodeScannerComponent only on the client-side.
const BarcodeScannerComponent = dynamic(
  () => import("react-qr-barcode-scanner"),
  { ssr: false }
);

// Simulate network delay.
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
      <a className={`btn btn-${type}`} disabled={isLoading} onClick={!isLoading ? handleClick : null}>
        {isLoading ? "Loading…" : name}
      </a>
    </Link>
  );
}

export default function NewItem() {
  const router = useRouter();
  const { signOut } = useAuth();
  // Initialize item state – for a new item, these start empty.
  // We store PN and SN as arrays.
  const [items, setItems] = useState({
    name: "",
    pn: [""],
    sn: [""],          // This will be overridden on submit.
    localSN: "",       // NEW FIELD: holds user input for a local serial number.
    price: "",
    status: "",
    poNumber: "",
    length: "",
    width: "",
    height: "",
    arrival_date: "",  // NEW FIELD: Arrival Date
    visible: true,
  });
  

  const [editingPn, setEditingPn] = useState(true);
  // const [newPn, setNewPn] = useState(""); // for the input value when editing

  const [editingSn, setEditingSn] = useState(true);
  // const [newSn, setNewSn] = useState("");

  // DOM is the Date of Manufacture input (user provided).
  const [DOM, setDOM] = useState("");
  // OEM, Modality, Model fields.
  const [oem, setOem] = useState("");
  const [modality, setModality] = useState("");
  const [model, setModel] = useState("");

  // Local location states.
  const [localLocFrom, setLocalLocFrom] = useState("");
  const [localLocCurrent, setLocalLocCurrent] = useState("");

  // Other states.
  const [pnOptions, setPnOptions] = useState([]);
  const [snOptions, setSnOptions] = useState([]);
  const [descriptions, setDescriptions] = useState([{ description: "", date: "" }]);
  const [workOrders, setWorkOrders] = useState([{ workOrder: "", date: "" }]);
  const [clients, setClients] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [show, setShow] = useState(false); // error modal for missing required fields
  const [showErr, setShowErr] = useState(false);
  const [Err, setErr] = useState("Missing required field: Name and Description");
  const [showDescModal, setShowDescModal] = useState(false);
  const [showWoModal, setShowWoModal] = useState(false);
  const [showClientModal, setShowClientModal] = useState(false);
  const [showMachineModal, setShowMachineModal] = useState(false);
  const [showParentModal, setShowParentModal] = useState(false);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
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
  // For extra (dimensions/price/DOM) section collapse.
  const [showExtra, setShowExtra] = useState(false);

  // For PN/SN "add new" functionality.
  const [addingNewPn, setAddingNewPn] = useState(false);
  const [newPn, setNewPn] = useState("");
  const [addingNewSn, setAddingNewSn] = useState(false);
  const [newSn, setNewSn] = useState("");

  // For browsing photos.
  const browseInputRef = useRef(null);

// Inside your NewItem component:
  const [loading, setLoading] = useState(false);


  if (!router.isReady) {
    return null; // or a loading indicator
  }

  // -------------------- Since this is "add" mode, we do not fetch an existing document.
  // However, we still fetch global PN and SN options and clients for selection.
  useEffect(() => {
    async function fetchClientsData() {
      try {
        const clientsData = await fetchClients();
        console.log("Clients:", clientsData);
        setClients(clientsData);
      } catch (error) {
        console.error("Error fetching clients: ", error);
      }
    }
    fetchClientsData();
  }, []);

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
      setPnOptions([...pnSet]);
      setSnOptions([...snSet]);
    }
    fetchPnSn();
  }, []);

  const [machineFieldsInitialized, setMachineFieldsInitialized] = useState(false);

  useEffect(() => {
    if (!machineFieldsInitialized && (TheMachine || selectedCurrentMachine || selectedMachine)) {
      const updatedFields = updateMachineFields(TheMachine, selectedCurrentMachine, selectedMachine);

      // Only set fields if they are empty or "N/A"
      if (!oem || oem === "N/A") setOem(updatedFields.oem);
      if (!modality || modality === "N/A") setModality(updatedFields.modality);
      if (!model || model === "N/A") setModel(updatedFields.model);

      setMachineFieldsInitialized(true);
    }
  }, [TheMachine, selectedCurrentMachine, selectedMachine, machineFieldsInitialized]);


  const [signal, setSignal] = useState(null);

  useEffect(() => {
    if (router.isReady) {
      setSignal(router.query.signal || null);
    }
  }, [router.isReady, router.query.signal]);
  

  // -------------------- Handlers for PN and SN dropdowns

  // PN: when a user selects an existing PN value.
  const handlePnSelect = (e) => {
    const selected = e.target.value;
    setItems((prev) => {
      let updatedPn = Array.isArray(prev.pn) ? [...prev.pn] : [];
      updatedPn[0] = selected;
      return { ...prev, pn: updatedPn };
    });
  };

  const handlePnChange = (index, value) => {
    setItems((prev) => {
      const newPn = [...prev.pn];
      newPn[index] = value;
      return { ...prev, pn: newPn };
    });
  };

  const addPn = () => {
    if (newPn.trim() !== "") {
      setItems((prev) => ({
        ...prev,
        pn: [...prev.pn, newPn.trim()]
      }));
    }
    setNewPn("");
    setAddingNewPn(false);
  };

  // SN: when a user selects an existing SN value.
  const handleSnSelect = (e) => {
    const selected = e.target.value;
    setItems((prev) => {
      let updatedSn = Array.isArray(prev.sn) ? [...prev.sn] : [];
      updatedSn[0] = selected;
      return { ...prev, sn: updatedSn };
    });
  };

  const handleSnChange = (index, value) => {
    setItems((prev) => {
      const newSn = [...prev.sn];
      newSn[index] = value;
      return { ...prev, sn: newSn };
    });
  };

  const addSn = () => {
    if (newSn.trim() !== "") {
      setItems((prev) => ({
        ...prev,
        sn: [...prev.sn, newSn.trim()]
      }));
    }
    setNewSn("");
    setAddingNewSn(false);
  };

  // -------------------- Photo Browse Handlers
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
          url: URL.createObjectURL(files[i])
        });
      }
      setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
    }
    e.target.value = "";
  };

  // -------------------- Photo Capture Handlers remain as in your index.js
  const handleCapture = (err, result) => {
    if (result) {
      setCapturedPhoto(result);
    }
  };

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

  const savePhoto = () => {
    setPhotos((prevPhotos) => [
      ...prevPhotos,
      { file: capturedPhoto, url: URL.createObjectURL(capturedPhoto) }
    ]);
    setCapturedPhoto(null);
    setShowCameraModal(false);
  };

  const removePhoto = (index) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  // -------------------- Modal Handlers
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseErr = () => setShowErr(false);
  const handleShowErr = () => setShowErr(true);
  const handleCloseSaveModal = () => setShowSaveModal(false);
  const handleShowSaveModal = () => setShowSaveModal(true);
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

  // -------------------- Work Orders / Descriptions Handlers (unchanged)
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

  // -------------------- Machine Selection (unchanged)
  const handleClientInfo = async (clientId) => {
    // Clear any previously selected machine/local loc for the branch
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
      const clientData = clientDoc.data();
      if (machinePick) {
        setSelectedClientFrom({ id: clientDoc.id, ...clientData });
      } else {
        setSelectedClientCurrent({ id: clientDoc.id, ...clientData });
      }
      // Fetch machines for this client:
      const machinePromises = clientData.machines.map((machineRef) => machineRef.get());
      const machineDocs = await Promise.all(machinePromises);
      const machines = machineDocs.map((machineDoc) => ({
        id: machineDoc.id,
        ...machineDoc.data(),
      }));
      setMachineOptions(machines);
      handleCloseClientModal();
    }
  };  

  const fetchMachine = async (machineId) => {
    const db = firebase.firestore();
    const doc = await db.collection("Machine").doc(machineId).get();
    if (doc.exists) {
      const machineData = doc.data();
      setTheMachine(machineData);

      // Ensure OEM, Modality, and Model update properly only if necessary
      if (!oem || oem === "N/A") setOem(machineData.oem || machineData.OEM || "");
      if (!modality || modality === "N/A") setModality(machineData.modality || machineData.Modality || "");
      if (!model || model === "N/A") setModel(machineData.model || machineData.Model || "");

      // Set machine frequency count
      const machinesSnapshot = await db
        .collection("Machine")
        .where("Model", "==", machineData.Model || machineData.model)
        .get();
      setMachineFrequency(machinesSnapshot.size);
    } else {
      console.error("Machine not found");
    }
  };



  // -------------------- Frequency/Usage (unchanged)
  const calculateItemFrequencyAndUsage = async (pn) => {
    const db = firebase.firestore();
    const currentDate = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(currentDate.getFullYear() - 1);
    const itemsSnapshot = await db.collection("Test").where("pn", "==", pn).get();
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

  // -------------------- Photo Upload (unchanged)
  const uploadPhotos = async (docID) => {
    const storageRef = firebase.storage().ref();
    for (let i = 0; i < photos.length; i++) {
      if (photos[i].file) {
        const photoRef = storageRef.child(
          `Parts/${docID}/${docID}${i === 0 ? ".jpg" : `.${i + 1}.jpg`}`
        );
        const metadata = { contentType: "image/png" };
        await photoRef.put(photos[i].file, metadata);
        const url = await photoRef.getDownloadURL();
        photos[i].url = url;
      }
    }
  };

  // -------------------- Submission Handler
  // For NewItem, only require Name and Description.
  async function handleSubmit(event) {
    event.preventDefault();
    if (!items.name || !descriptions[0]?.description) {
      handleShow();
    } else {
      setLoading(true); // start loading before async work
      try {
        await toSend();
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // end loading after async work completes
      }
    }
  }
  

  async function toSend() {
    const { id } = router.query; // Ensure id is defined (it may be undefined for a new item)
    const db = firebase.firestore();

    // Get the current authenticated user
    const currentUser = firebase.auth().currentUser;
    const userEmail = currentUser ? currentUser.email : "unknown";

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

    // Add the current user's email under the "user" field
    formattedItems.user = userEmail;

    // Clean pn and sn arrays to replace undefined values with an empty string.
    formattedItems.pn = (items.pn || []).map(value => value === undefined ? "" : value);
    formattedItems.sn = (items.sn || []).map(value => value === undefined ? "" : value);
  
    // Set machine references for each branch.
    if (selectedMachine && selectedMachine.id) {
      formattedItems.MachineFrom = db.collection("Machine").doc(selectedMachine.id);
    }
    if (selectedCurrentMachine && selectedCurrentMachine.id) {
      formattedItems.MachineCurrent = db.collection("Machine").doc(selectedCurrentMachine.id);
    }
  
    // ***** NEW: Set client references for each branch *****
    if (selectedClientFrom && selectedClientFrom.id) {
      formattedItems.ClientFrom = db.collection("Client").doc(selectedClientFrom.id);
    }
    if (selectedClientCurrent && selectedClientCurrent.id) {
      formattedItems.ClientCurrent = db.collection("Client").doc(selectedClientCurrent.id);
    }
    // ******************************************************
  
    if (selectedParent && selectedParent.id) {
      formattedItems.Parent = db.collection("Test").doc(selectedParent.id);
    }
  
    // --- LOCAL SN LOGIC ---
    let docId = id || null;
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
            const currentMachineRef = db.collection("Machine").doc(selectedCurrentMachine.id);
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
            const currentMachineRef = db.collection("Machine").doc(selectedCurrentMachine.id);
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
          const currentMachineRef = db.collection("Machine").doc(selectedCurrentMachine.id);
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
  
      // Optionally, show a save confirmation modal.
      handleShowSaveModal();
    } catch (error) {
      console.error("Error saving data:", error);
    }
  }
  

  // -------------------- Info Modal Handlers (unchanged)
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [itemName, setItemName] = useState("");
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

  const handleCloseCameraModal = () => {
    setShowCameraModal(false);
    setCapturedPhoto(null);
  };

  const handleChange = (field) => (event) => {
    const value = event.target ? event.target.value : event.value;
    setItems((prevItems) => ({ ...prevItems, [field]: value }));
  };

  const mostRecentWorkOrder =
    workOrders && workOrders.length > 0
      ? workOrders.reduce((latest, current) => {
        const latestDate = new Date(latest.date);
        const currentDate = new Date(current.date);
        return currentDate > latestDate ? current : latest;
      }, workOrders[0])
      : {};

  const handleShowCameraModal = () => {
    setShowCameraModal(true);
  };

  const generateCustomID = () => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    return `AIS${randomNum}`;
  };
  
  const handlePrint = async () => {
    if (!items.name) {
      alert("Missing name");
      return;
    }
    
    // In addItem mode, there is no existing id so generate one
    const printId = generateCustomID();
  
    const payload = {
      name: items.name,
      pn: items.pn,
      sn: items.sn,
      wo: workOrders && workOrders.length > 0 ? workOrders[0].workOrder : "",
      status: items.status,
      local_sn: printId, // Use the generated custom ID
      descriptions: descriptions,
      date: items.date || new Date().toISOString().split("T")[0],
      DOM: DOM,
      oem: oem,
      modality: modality,
      model: model,
    };
  
    console.log("Payload for printing:", payload);
    try {
      const response = await fetch("https://cc7e-174-76-22-138.ngrok-free.app/print-label", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      console.log("Print result:", result);
    } catch (error) {
      console.error("Error printing label:", error);
    }
  };
  

  const handleAddNewPn = () => {
    if (newPn.trim() !== "") {
      setItems((prev) => ({
        ...prev,
        pn: [...prev.pn, newPn.trim()]
      }));
    }
    setNewPn("");
    setAddingNewPn(false);
  };

  const handleAddNewSn = () => {
    if (newSn.trim() !== "") {
      setItems((prev) => ({
        ...prev,
        sn: [...prev.sn, newSn.trim()]
      }));
    }
    setNewSn("");
    setAddingNewSn(false);
  };

  function getPriorityMachineField(field, currentValue, theMachine, currentMachine, fromMachine) {
    // If the field is already filled in by the user, return it unchanged.
    if (currentValue && currentValue.trim() !== "" && currentValue.trim() !== "N/A") {
      return currentValue;
    }

    // Otherwise, prioritize the best available value.
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
      model: getValidMachineField("model", theMachine, currentMachine, fromMachine),
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


  const [showLocalLocFrom, setShowLocalLocFrom] = useState(false);
  const [showLocalLocCurrent, setShowLocalLocCurrent] = useState(false);

  // const handleSetSelectedMachine = (selMachine) => {
  //   // Condition: if the machine name (lowercased) is one of these values.
  //   const condition = (name) =>
  //     ["socalwarehouse", "norcalwarehouse", "interior socal", "interior norcal"].includes(name.toLowerCase());
  //   if (machinePick) {
  //     // "Select From" branch:
  //     setSelectedMachine({ id: selMachine.id, name: selMachine.name });
  //     fetchMachine(selMachine.id);
  //     setShowLocalLocFrom(condition(selMachine.name));
  //   } else {
  //     // "Select Current" branch:
  //     setSelectedCurrentMachine({ id: selMachine.id, name: selMachine.name });
  //     fetchMachine(selMachine.id);
  //     setShowLocalLocCurrent(condition(selMachine.name));
  //   }
  //   handleCloseMachineModal();
  // };
  const condition = (name) => {
    return name && name.toLowerCase() === "interior socal";
  };
  
  const handleSetSelectedMachine = (machine) => {
    const condition = (name) => name && name.toLowerCase() === "interior socal";
    if (machinePick) {
      setSelectedMachine({ id: machine.id, name: machine.name });
      // For "from", show the local loc input if condition met.
      setShowLocalLocFrom(condition(machine.name));
    } else {
      setSelectedCurrentMachine({ id: machine.id, name: machine.name });
      // For "current", you might also want a local loc input:
      setShowLocalLocCurrent(condition(machine.name));
    }
    fetchMachine(machine.id);
    setShowMachineModal(false);
  };
  
  const [currentPnIndex, setCurrentPnIndex] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentSnIndex, setCurrentSnIndex] = useState(0);
  const [showSnDropdown, setShowSnDropdown] = useState(false);

  const handleAddNewClient = () => {
    // Generate a random client number as part of the URL.
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    // When pushing, include a query parameter (from=item) and the current item id if available.
    router.push(`/NewSearch/client/AIS${randomNum}/addClient?from=addItem`);
  };

  const [showMachineSelect, setShowMachineSelect] = useState(false);

  const [selectedClientFrom, setSelectedClientFrom] = useState(null);
  const [selectedClientCurrent, setSelectedClientCurrent] = useState(null);

  return (
    <LoggedIn>
      {/* Error Modal */}
      <MachineSelectionModal
        show={machineSelectionModal}
        handleClose={() => setMachineSelectionModal(false)}
        setMachine={handleSetSelectedMachine}
        machineOptions={machineOptions}  // if your modal needs the list of machines
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>Missing required field: Name and Description</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Other Modals: showErr, showSaveModal, Descriptions, Work Orders, etc. */}
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
                <Button variant="danger" onClick={() => removeWorkOrder(index)}>
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
      {/* Machine Selection Modal */}
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
              client.name.toLowerCase().includes(search.toLowerCase())
            )}
            onSelectClient={handleClientInfo}
            onInfoClick={handleClientInfo}
            clearSelection={() => handleClientInfo(null)}
            onAddClient={handleAddNewClient} // new prop
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
      {/* Descriptions Modal */}
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

      {/* Info Modal */}
      <InfoModal
        show={showInfoModal}
        handleClose={handleCloseInfoModal}
        itemName={items.name}
        dimensions={`${items.length},${items.width},${items.height}`}
        price={items.price}
        freqI={freqItem}
        freqM={machineFrequency}
        usage={usagePastYear}
      />
      {loading && (
        <div
          style={{
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
            zIndex: 9999, // Make sure it's above everything else
          }}
        >
          <Spinner animation="border" variant="primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
      {/* Main Form */}
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "600px" }}>
          <Card className="align-items-center justify-content-center">
            <Card.Body>
              <h2 className="text-center mb-4">Add New Item</h2>
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
                          {/* Editable input field displaying the current PN */}
                          <Form.Control
                            type="text"
                            value={items.pn[currentPnIndex] || ""}
                            onChange={(e) =>
                              handlePnChange(currentPnIndex, e.target.value)
                            }
                          />
                          {/* Arrow button to toggle dropdown */}
                          <Button
                            variant="outline-secondary"
                            onClick={() => setShowDropdown(!showDropdown)}
                          >
                            &#9662;
                          </Button>
                          {/* Plus button to add a new PN */}
                          <InputGroup.Text>
                            <Button
                              variant="outline-secondary"
                              onClick={() => setAddingNewPn(true)}
                            >
                              +
                            </Button>
                          </InputGroup.Text>
                        </InputGroup>
                        {/* Dropdown list showing only the current item's PN options */}
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
                      {/* Input for adding a new PN, if triggered */}
                      {addingNewPn && (
                        <Form.Control
                          type="text"
                          placeholder="Enter new PN"
                          value={newPn}
                          onChange={(e) => setNewPn(e.target.value)}
                          onBlur={handleAddNewPn}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleAddNewPn();
                            }
                          }}
                        />
                      )}
                    </Form.Group>
                  </Col>
                </Row>
                {/* Row for SN */}
                <Row className="mb-3">
                  <Col>
                    <Form.Group controlId="sn">
                      <Form.Label>Serial Number</Form.Label>
                      <div style={{ position: "relative" }}>
                        <InputGroup>
                          {/* Inline editable input showing the currently selected SN */}
                          <Form.Control
                            type="text"
                            value={items.sn[currentSnIndex] || ""}
                            onChange={(e) =>
                              handleSnChange(currentSnIndex, e.target.value)
                            }
                          />
                          {/* Arrow button to toggle SN dropdown */}
                          <Button
                            variant="outline-secondary"
                            onClick={() => setShowSnDropdown(!showSnDropdown)}
                          >
                            &#9662;
                          </Button>
                          {/* Plus button to add a new SN */}
                          <InputGroup.Text>
                            <Button
                              variant="outline-secondary"
                              onClick={() => setAddingNewSn(true)}
                            >
                              +
                            </Button>
                          </InputGroup.Text>
                        </InputGroup>
                        {/* Dropdown list for SN options */}
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
                      {/* Input for adding a completely new SN */}
                      {addingNewSn && (
                        <Form.Control
                          type="text"
                          placeholder="Enter new SN"
                          value={newSn}
                          onChange={(e) => setNewSn(e.target.value)}
                          onBlur={handleAddNewSn}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleAddNewSn();
                            }
                          }}
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
                    <Form.Group controlId="oem">
                      <Form.Label>OEM</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="OEM"
                        value={oem}
                        onChange={(e) => setOem(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="modality">
                      <Form.Label>Modality</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Modality"
                        value={modality}
                        onChange={(e) => setModality(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="model">
                      <Form.Label>Model</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Model"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                {/* Work Orders and Descriptions Section */}
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
                          value={mostRecentWorkOrder?.workOrder || ""}
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
                          value={mostRecentWorkOrder?.date || ""}
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
                </div>
                {/* Description Editing */}
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
                      style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}
                    />
                  </Form.Group>
                </div>
                {/* Machine Selection Row with Local Loc Inputs */}
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
                          <p><strong>Selected Client (From):</strong> {selectedClientFrom.name}</p>
                          <div style={{ marginTop: "0.5rem" }}>
                            <Button
                              variant="outline-secondary"
                              onClick={() => setShowMachineModal(true)}
                            >
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
                          <p><strong>Selected Client (Current):</strong> {selectedClientCurrent.name}</p>
                          <div style={{ marginTop: "0.5rem" }}>
                            <Button
                              variant="outline-secondary"
                              onClick={() => setShowMachineModal(true)}
                            >
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
                          style={{ cursor: "default", marginTop: "0.5rem" }}
                        />
                      )}
                    </Col>
                  </Row>
                </div>
                {/* Photo Action Row */}
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
                <div className="mt-3 d-flex flex-wrap">
                  {photos.map((photo, index) => (
                    <div
                      key={index}
                      className="d-flex flex-column align-items-center mb-2 me-2"
                      style={{
                        width: "100px",
                        height: "100px",
                        position: "relative",
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
                          X
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                {/* Extra Section: Dimensions, Price, and DOM */}

                {/* Submit Row */}
                <div className="mt-3 d-flex flex-wrap align-items-center">
                  <Button
                    variant="primary"
                    type="submit"
                    style={{ marginRight: "1rem" }}
                  >
                    Save
                  </Button>
                  <LoadingButton
                    type="secondary"
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
                        <Form.Label>Dimensions (L x W x H)</Form.Label>
                        <Row>
                          <Col>
                            <Form.Control
                              placeholder="Length"
                              type="text"
                              value={items.length}
                              onChange={handleChange("length")}
                            />
                          </Col>
                          x
                          <Col>
                            <Form.Control
                              placeholder="Width"
                              type="text"
                              value={items.width}
                              onChange={handleChange("width")}
                            />
                          </Col>
                          x
                          <Col>
                            <Form.Control
                              placeholder="Height"
                              type="text"
                              value={items.height}
                              onChange={handleChange("height")}
                            />
                          </Col>
                        </Row>
                      </Form.Group>
                      <Form.Group as={Col} controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                          placeholder="Price"
                          type="text"
                          value={items.price}
                          onChange={handleChange("price")}
                        />
                      </Form.Group>
                    </Row>
                    <Row className="mt-3">
                      <Form.Group as={Col} controlId="DOM">
                        <Form.Label>DOM (Date of Manufacture)</Form.Label>
                        <Form.Control
                          placeholder="Enter DOM"
                          type="date"
                          value={DOM}
                          onChange={(e) => setDOM(e.target.value)}
                        />
                      </Form.Group>
                      {/* NEW: Local SN input */}
                      <Form.Group as={Col} controlId="localSN">
                        <Form.Label>Local SN</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Local SN"
                          value={items.localSN || ""}
                          onChange={handleChange("localSN")}
                        />
                      </Form.Group>
                    </Row>
                    <Row>
                      <Form.Group as={Col} controlId="poNumber">
                        <Form.Label>PO Number</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="PO Number"
                          value={items.poNumber || ""}
                          onChange={handleChange("poNumber")}
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
    </LoggedIn>
  );
}
