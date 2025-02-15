import React, { useEffect, useState } from "react";
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
} from "react-bootstrap";
import Link from "next/link";
import { useAuth } from "../../../../context/AuthUserContext";
import firebase from "../../../../context/Firebase";
import LoggedIn from "../../../LoggedIn";
import { useRouter } from "next/router";
import { fetchClients } from "../../../../utils/fetchAssociations";
import ClientTable from "../../../../utils/ClientTable";
import ClientInfoModal from "../../ClientInfoModal";
import ParentModal from "../../addItem/ParentModal";
import dynamic from "next/dynamic";
import InfoModal from "../../InfoModal";
import MachineSelectionModal from "./MachineSelectionModal";

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
    // Store PN and SN as arrays; default to empty arrays.
    pn: [],
    sn: [],
    price: "",
    status: "",
    length: "",
    width: "",
    height: "",
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
  // State for the extra (dimensions/price/DOM) section.
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

  // Auto-populate OEM, modality, and model when TheMachine updates.
  useEffect(() => {
    if (TheMachine) {
      // Check both lowercase and uppercase keys.
      setOem(TheMachine.oem || TheMachine.OEM || "");
      setModality(TheMachine.modality || TheMachine.Modality || "");
      setModel(TheMachine.model || TheMachine.Model || "");
    }
  }, [TheMachine]);

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
      setItems((prev) => ({
        ...prev,
        pn: pnArray,
        sn: snArray,
      }));
    }
    fetchPnSn();
  }, []);

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  const fetchData = async () => {
    const db = firebase.firestore();
    const doc = await db.collection("Test").doc(id).get();
    if (doc.exists) {
      const data = doc.data();
      setItems(data);
      setDescriptions(data.descriptions || []);
      setWorkOrders(data.workOrders || []);

      if (data.localLocFrom) {
        setLocalLocFrom(data.localLocFrom);
      }
      if (data.localLocCurrent) {
        setLocalLocCurrent(data.localLocCurrent);
      }

      if (data.TheMachine) {
        setTheMachine(data.TheMachine);
        // Check both lowercase and uppercase keys.
        if (!oem) setOem(data.TheMachine.oem || data.TheMachine.OEM || "");
        if (!modality) setModality(data.TheMachine.modality || data.TheMachine.Modality || "");
        if (!model) setModel(data.TheMachine.model || data.TheMachine.Model || "");
        const machinesSnapshot = await db
          .collection("Machine")
          .where("Model", "==", data.TheMachine.Model || data.TheMachine.model)
          .get();
        setMachineFrequency(machinesSnapshot.size);
      } else {
        setMachineFrequency("N/A");
      }

      if (data.Machine) {
        const machineDoc = await data.Machine.get();
        console.log(machineDoc.data());
        setSelectedMachine({ id: machineDoc.id, ...machineDoc.data() });
        setTheMachine(machineDoc.data());
        if (!oem) setOem(machineDoc.data().oem || machineDoc.data().OEM || "");
        if (!modality) setModality(machineDoc.data().modality || machineDoc.data().Modality || "");
        if (!model) setModel(machineDoc.data().model || machineDoc.data().Model || "");
      }
      if (data.CurrentMachine) {
        const currMachineDoc = await data.CurrentMachine.get();
        setSelectedCurrentMachine({
          id: currMachineDoc.id,
          ...currMachineDoc.data(),
        });
        setTheMachine(currMachineDoc.data());
        if (!oem) setOem(currMachineDoc.data().oem || currMachineDoc.data().OEM || "");
        if (!modality) setModality(currMachineDoc.data().modality || currMachineDoc.data().Modality || "");
        if (!model) setModel(currMachineDoc.data().model || currMachineDoc.data().Model || "");
      }
      if (data.Parent) {
        const parentDoc = await data.Parent.get();
        setSelectedParent({ id: parentDoc.id, ...parentDoc.data() });
      }
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
  const handleShowSaveModal = () => setShowSaveModal(true);
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

  // When a client is selected from the client table, fetch its machines and open the machine modal.
  const handleClientInfo = async (clientId) => {
    const db = firebase.firestore();
    const clientDoc = await db.collection("Client").doc(clientId).get();
    if (clientDoc.exists) {
      const clientData = clientDoc.data();
      setSelectedClient(clientData);
      const machinePromises = clientData.machines.map((machineRef) => machineRef.get());
      const machineDocs = await Promise.all(machinePromises);
      const machines = machineDocs.map((machineDoc) => ({
        id: machineDoc.id,
        ...machineDoc.data(),
      }));
      setMachineOptions(machines);
      handleShowMachineModal();
    }
  };

  // Reordering function for dropdowns.
  const reorderArray = (arr, selectedValue) => {
    const newArr = arr.filter((val) => val !== selectedValue);
    return [selectedValue, ...newArr];
  };

  // When user selects a PN from the dropdown.
  const handlePnSelect = (e) => {
    const selected = e.target.value;
    const newArray = reorderArray(pnOptions, selected);
    setPnOptions(newArray);
    setItems((prev) => ({ ...prev, pn: newArray }));
  };

  // When user selects a SN from the dropdown.
  const handleSnSelect = (e) => {
    const selected = e.target.value;
    const newArray = reorderArray(snOptions, selected);
    setSnOptions(newArray);
    setItems((prev) => ({ ...prev, sn: newArray }));
  };

  // Generate custom document ID if needed.
  const generateCustomID = () => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    return `AIS${randomNum}`;
  };

  async function toSend() {
    const db = firebase.firestore();
    // Merge new OEM, modality, model, and DOM values into TheMachine.
    let machineData = {};
    if (TheMachine) {
      machineData = { ...TheMachine };
    }
    // Prioritize user inputs.
    if (oem.trim() !== "") machineData.oem = oem;
    if (modality.trim() !== "") machineData.modality = modality;
    if (model.trim() !== "") machineData.model = model;
    
    // If TheMachine exists but these fields are blank, populate them.
    if (!oem && TheMachine && (TheMachine.oem || TheMachine.OEM))
      setOem(TheMachine.oem || TheMachine.OEM);
    if (!modality && TheMachine && (TheMachine.modality || TheMachine.Modality))
      setModality(TheMachine.modality || TheMachine.Modality);
    if (!model && TheMachine && (TheMachine.model || TheMachine.Model))
      setModel(TheMachine.model || TheMachine.Model);
    
    const formattedItems = { ...items, descriptions, workOrders };
    // Remove date field from formattedItems since it's no longer used.
    delete formattedItems.date;
    // Add new fields.
    formattedItems.status = items.status;
    formattedItems.DOM = DOM; // New Date of Manufacture field.
    formattedItems.localLocFrom = localLocFrom;
    formattedItems.localLocCurrent = localLocCurrent;
    // Overwrite TheMachine data if available.
    if (Object.keys(machineData).length > 0) {
      formattedItems.TheMachine = machineData;
    }

    if (selectedMachine && selectedMachine.id) {
      formattedItems.Machine = db.collection("Machine").doc(selectedMachine.id);
    }

    if (selectedCurrentMachine && selectedCurrentMachine.id) {
      formattedItems.CurrentMachine = db.collection("Machine").doc(selectedCurrentMachine.id);
    }

    if (selectedParent && selectedParent.id) {
      formattedItems.Parent = db.collection("Test").doc(selectedParent.id);
    }

    try {
      if (id) {
        await db.collection("Test").doc(id).update(formattedItems);

        if (selectedMachine && selectedMachine.id) {
          const machineRef = db.collection("Machine").doc(selectedMachine.id);
          const machineDoc = await machineRef.get();
          if (machineDoc.exists) {
            await machineRef.update({
              associatedParts: firebase.firestore.FieldValue.arrayUnion(
                db.collection("Test").doc(id)
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
                db.collection("Test").doc(id)
              ),
            });
          }
        }
      } else {
        const customID = generateCustomID();
        await db.collection("Test").doc(customID).set(formattedItems);

        if (selectedMachine && selectedMachine.id) {
          const machineRef = db.collection("Machine").doc(selectedMachine.id);
          const machineDoc = await machineRef.get();
          if (machineDoc.exists) {
            await machineRef.update({
              associatedParts: firebase.firestore.FieldValue.arrayUnion(
                db.collection("Test").doc(customID)
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
                db.collection("Test").doc(customID)
              ),
            });
          }
        }
      }
      console.log("Item saved and associatedParts updated!");
      handleShowSaveModal();
    } catch (error) {
      console.error("Error saving data:", error);
    }
  }

  // When a machine is selected from the modal.
  const handleSetSelectedMachine = (selMachina) => {
    if (machinePick) {
      setSelectedMachine({ id: selMachina.id, name: selMachina.name });
      fetchMachine(selMachina.id);
    } else {
      setSelectedCurrentMachine({ id: selMachina.id, name: selMachina.name });
      fetchMachine(selMachina.id);
    }
    handleCloseMachineModal();
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

  // NEW: Function to handle printing the label.
  // It collects required fields and sends a POST request to the Python server.
  const handlePrint = async () => {
    if (!items.name) {
      alert("Missing name");
      return;
    }
    console.log(selectedClient);
    const payload = {
      name: items.name,
      // Send PN and SN as arrays; Python will use the first element.
      pn: items.pn,
      sn: items.sn,
      wo: workOrders && workOrders.length > 0 ? workOrders[0].workOrder : "",
      client: selectedClient ? selectedClient.name : "",
      status: items.status,
      local_sn: id,
      descriptions: descriptions,
      DOM: DOM,
      oem: oem,
      modality: modality,
      model: model
    };

    try {
      const response = await fetch("https://776f-174-76-22-138.ngrok-free.app/print-label", {
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

  // Handle form submission.
  async function handleSubmit(event) {
    event.preventDefault();
    let check = false;

    if (!items.name) check = true;
    if (!items.pn.length) check = true;
    if (!items.sn.length) check = true;
    if (descriptions.some((desc) => !desc.description)) check = true;
    if (workOrders.some((wo) => !wo.workOrder)) check = true;

    if (check) {
      handleShow();
    } else if (TheMachine === null) {
      setMachineSelectionModal(true);
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

  return (
    <LoggedIn>
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

      {/* Machine selection modal (after selecting a client) */}
      <ClientInfoModal
        show={showMachineModal}
        handleClose={handleCloseMachineModal}
        selectedClient={selectedClient}
        machineOptions={machineOptions}
        setSelectedMachine={handleSetSelectedMachine}
      />

      {/* Client selection modal */}
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
              <Button variant="secondary" onClick={() => setCapturedPhoto(null)}>
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
                  <Form.Group as={Col} controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={items.name}
                      onChange={handleChange("name")}
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="pn">
                    <Form.Label>Product Number</Form.Label>
                    {Array.isArray(items.pn) && items.pn.length > 0 ? (
                      <Form.Select value={items.pn[0]} onChange={handlePnSelect}>
                        {pnOptions.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </Form.Select>
                    ) : (
                      <Form.Control
                        type="text"
                        value={items.pn}
                        onChange={handleChange("pn")}
                      />
                    )}
                  </Form.Group>
                </Row>
                {/* Row for SN */}
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="sn">
                    <Form.Label>Serial Number</Form.Label>
                    {Array.isArray(items.sn) && items.sn.length > 0 ? (
                      <Form.Select value={items.sn[0]} onChange={handleSnSelect}>
                        {snOptions.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </Form.Select>
                    ) : (
                      <Form.Control
                        type="text"
                        value={items.sn}
                        onChange={handleChange("sn")}
                      />
                    )}
                  </Form.Group>
                </Row>
                {/* New Row for Status and OEM, Modality, Model */}
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="status">
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
                </div>
                {/* Machine selection row with local loc inputs (if applicable) */}
                <div style={{ marginBottom: "1rem" }}>
                  <Row>
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
                      {selectedMachine && (
                        <>
                          <Form.Control
                            type="text"
                            placeholder="Selected Machine"
                            value={selectedMachine.name}
                            readOnly
                            style={{ cursor: "default", marginTop: "0.5rem" }}
                          />
                          {["socalwarehouse", "norcalwarehouse", "interior socal", "interior norcal"].includes(
                            selectedMachine.name.toLowerCase()
                          ) && (
                            <Form.Group controlId="localLocFrom" className="mt-2">
                              <Form.Label>Local Loc</Form.Label>
                              <Form.Control
                                type="text"
                                value={localLocFrom}
                                onChange={(e) => setLocalLocFrom(e.target.value)}
                              />
                            </Form.Group>
                          )}
                        </>
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
                      {selectedCurrentMachine && (
                        <>
                          <Form.Control
                            type="text"
                            placeholder="Selected Machine"
                            value={selectedCurrentMachine.name}
                            readOnly
                            style={{ cursor: "default", marginTop: "0.5rem" }}
                          />
                          {["socalwarehouse", "norcalwarehouse", "interior socal", "interior norcal"].includes(
                            selectedCurrentMachine.name.toLowerCase()
                          ) && (
                            <Form.Group controlId="localLocCurrent" className="mt-2">
                              <Form.Label>Local Loc</Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="E1A2"
                                value={localLocCurrent}
                                onChange={(e) => setLocalLocCurrent(e.target.value)}
                              />
                            </Form.Group>
                          )}
                        </>
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
                <div style={{ marginBottom: "1rem" }}>
                  <Row>
                    <Col>
                      <Button
                        variant="outline-secondary"
                        onClick={handleShowCameraModal}
                      >
                        Take Photo
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        variant={addToWebsite ? "primary" : "outline-primary"}
                        onClick={() => setAddToWebsite((prev) => !prev)}
                      >
                        {addToWebsite ? "✓ Add to Website" : "Add to Website"}
                      </Button>
                    </Col>
                  </Row>
                </div>
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
                  {/* Print Label button aligned to the right */}
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
                      <Form.Group as={Col} controlId="Price">
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
                        <Form.Label>DOM</Form.Label>
                        <Form.Control
                          placeholder="Date of Manufacture"
                          type="date"
                          value={DOM}
                          onChange={(e) => setDOM(e.target.value)}
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
