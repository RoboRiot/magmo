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
  InputGroup,
  FormControl,
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
import InfoModal from "./InfoModal";
import MachineSelectionModal from "./MachineSelectionModal";

// This will only load the component on the client-side.
const BarcodeScannerComponent = dynamic(
  () => import("react-qr-barcode-scanner"),
  { ssr: false }
);

// Simulates a network request delay
function simulateNetworkRequest() {
  return new Promise((resolve) => setTimeout(resolve, 2000));
}

// Custom LoadingButton component
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
    pn: "",
    sn: "",
    date: "",
    price: ""
  });

  const [descriptions, setDescriptions] = useState([
    { description: "", date: "" },
  ]);
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
  const [machinePick, setMachinePick] = useState(false)
  const [freqItem, setFreqItem] = useState(0);
  const [usagePastYear, setUsagePastYear] = useState(0);
  const [machineFrequency, setMachineFrequency] = useState(0);

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

  useEffect(() => {
    if (id) {
      fetchData();
      // consolelog(data)
    }
  }, [id]);

  const fetchData = async () => {
    const db = firebase.firestore();
    const doc = await db.collection("Test").doc(id).get();
    if (doc.exists) {
      const data = doc.data();
      if (data.date && data.date.seconds) {
        data.date = new Date(data.date.seconds * 1000)
          .toISOString()
          .split("T")[0];
      }
      setItems(data);
      setDescriptions(data.descriptions || []);
      setWorkOrders(data.workOrders || []);

      setTheMachine(data.TheMachine);

      const machinesSnapshot = await db
        .collection("Machine")
        .where("Model", "==", data.TheMachine.Model)
        .get();
      // const machineFrequency = machinesSnapshot.size;
      setMachineFrequency(machinesSnapshot.size);

      if (data.Machine) {
        const machineDoc = await data.Machine.get();
        console.log(machineDoc.data())
        setSelectedMachine({ id: machineDoc.id, ...machineDoc.data() });
        setTheMachine(machineDoc.data());
      }
      if(data.CurrentMachine){
        console.log(data)
        const currMachineDoc = await data.CurrentMachine.get();
        console.log("this is: " + currMachineDoc.data())
        setSelectedCurrentMachine({ id: currMachineDoc.id, ...currMachineDoc.data() });
        setTheMachine(currMachineDoc.data());
        console.log(TheMachine)
      }
      if (data.Parent) {
        const parentDoc = await data.Parent.get();
        setSelectedParent({ id: parentDoc.id, ...parentDoc.data() });
      }
      await fetchPhotos(id);
      await checkIfAddedToWebsite(id);

      await calculateItemFrequencyAndUsage(data.pn);
    } else {
      console.log("I wanna be here");
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
  
    // Query the Test collection for items with the same pn
    const itemsSnapshot = await db.collection("Test").where("pn", "==", pn).get();
    console.log(itemsSnapshot)
    setFreqItem(itemsSnapshot.size);
    
    // Now calculate usage in the past year based on work order dates
    let usagePastYear = 0;
  
    itemsSnapshot.forEach(doc => {
      const itemData = doc.data();
      itemData.workOrders.forEach(workOrder => {
        console.log("workOrder: " + workOrder)
        const workOrderDate = new Date(workOrder.date);
        console.log("workOrder date: " + workOrderDate)
        if (workOrderDate >= oneYearAgo && workOrderDate <= currentDate) {
          usagePastYear++;
        }
      });
    });
  
    // Set global variables or state for freqItem and usagePastYear
    console.log(`Item frequency for pn ${pn}: ${freqItem}`);
    console.log(`Usage past year for pn ${pn}: ${usagePastYear}`);
    setUsagePastYear(usagePastYear)
  };
  

  const fetchMachine = async (machineId) => {
    const db = firebase.firestore();
    const doc = await db.collection("Machine").doc(machineId).get();
    var mData = null;
    if (doc.exists) {
      setTheMachine(doc.data());

      // Query to get the count of machines with the same model number
      const modelNumber = doc.data().Model;

      const machinesSnapshot = await db
        .collection("Machine")
        .where("Model", "==", modelNumber)
        .get();
      // const machineFrequency = machinesSnapshot.size;
      setMachineFrequency(machinesSnapshot.size);
      // Set the machine frequency globally or wherever necessary
      console.log(
        `Machine frequency for model number ${modelNumber}: ${machineFrequency}`
      );
    }
  };

  const fetchPhotos = async (docID) => {
    const storageRef = firebase.storage().ref();
    const listRef = storageRef.child(`Parts/${docID}`);
    try {
      const res = await listRef.listAll();
      const urls = await Promise.all(
        res.items.map((item) => item.getDownloadURL())
      );
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
  const handleMachineSelectionModal = () => setMachineSelectionModal(false)
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

  const handleClientInfo = async (clientId) => {
    const db = firebase.firestore();
    const clientDoc = await db.collection("Client").doc(clientId).get();
    if (clientDoc.exists) {
      const clientData = clientDoc.data();
      setSelectedClient(clientData);
      const machinePromises = clientData.machines.map((machineRef) =>
        machineRef.get()
      );
      const machineDocs = await Promise.all(machinePromises);
      const machines = machineDocs.map((machineDoc) => ({
        id: machineDoc.id,
        ...machineDoc.data(),
      }));
      setMachineOptions(machines);
      handleShowMachineModal();
    }
  };

  // Function to generate custom document ID
  const generateCustomID = () => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    return `AIS${randomNum}`;
  };

  // Function to send item data to Firestore
  async function toSend() {
    const db = firebase.firestore();
    const formattedItems = { ...items, descriptions, workOrders };

    if (selectedMachine && selectedMachine.id) {
      formattedItems.Machine = db.collection("Machine").doc(selectedMachine.id);
    }

    if (TheMachine && TheMachine.id) {
      formattedItems.TheMachine = theMachine;
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
        await uploadPhotos(id);

        if (addToWebsite) {
          const partsItem = {
            Name: items.name,
            PN: items.pn,
            SN: items.sn,
            Description: descriptions[0]?.description || "",
            Images: photos.map((photo) => photo.url),
            Available: true,
            From: selectedMachine?.name || "",
            Current: selectedCurrentMachine?.name || "",
            Modality: "MRI", // Set your default or dynamic modality here
            OEM: "Philips", // Set your default or dynamic OEM here
            PM: items.pn,
          };

          await db.collection("Parts").doc(id).set(partsItem);
        }
        console.log("Items updated!");
      } else {
        const customID = generateCustomID();
        await db.collection("Test").doc(customID).set(formattedItems);
        await uploadPhotos(customID);

        if (addToWebsite) {
          const partsItem = {
            Name: items.name,
            PN: items.pn,
            SN: items.sn,
            Description: descriptions[0]?.description || "",
            Images: photos.map((photo) => photo.url),
            Available: true,
            From: selectedMachine?.name || "",
            Current: selectedCurrentMachine?.name || "",
            Modality: "MRI", // Set your default or dynamic modality here
            OEM: "Philips", // Set your default or dynamic OEM here
            PM: items.pn,
          };

          await db.collection("Parts").doc(customID).set(partsItem);
        }
        console.log("Items added!");
      }
      handleShowSaveModal(); // Show the save confirmation modal
    } catch (error) {
      console.error("Error updating data: ", error);
    }
  }

  const uploadPhotos = async (docID) => {
    const storageRef = firebase.storage().ref();
    for (let i = 0; i < photos.length; i++) {
      if (photos[i].file) {
        const photoRef = storageRef.child(
          `Parts/${docID}/${docID}${i === 0 ? "" : `.${i + 1}`}`
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

  // Handle form submission
  async function handleSubmit(event) {
    event.preventDefault();
    console.log("enter handle submit");
    console.log(items);
    let check = false;

    if (!items.name) check = true;
    if (!items.pn) check = true;
    if (!items.sn) check = true;
    if (descriptions.some((desc) => !desc.description)) check = true;
    if (workOrders.some((wo) => !wo.workOrder)) check = true;
    if(TheMachine === null){
      //prompt user to select a machine if a machine wasnt set 
      setMachineSelection(true)
    }
    if (check) {
      handleShow();
    } else {
      console.log("try submit");
      console.log(items);
      toSend();
    }
  }

  // Handlers for input changes
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

  const mostRecentWorkOrder = workOrders.reduce((latest, current) => {
    const latestDate = new Date(latest.date);
    const currentDate = new Date(current.date);
    return currentDate > latestDate ? current : latest;
  }, workOrders[0]);

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

  //More info modal

  const [showInfoModal, setShowInfoModal] = useState(false);
  const [itemName, setItemName] = useState("");

  // Function to fetch the item data and show modal
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

      <ClientInfoModal
        show={showMachineModal}
        handleClose={handleCloseMachineModal}
        selectedClient={selectedClient}
        machineOptions={machineOptions}
        setSelectedMachine={(id, name) => {
          if (machinePick) {
            setSelectedMachine({ id, name });
            fetchMachine(id);
          } else {
            setSelectedCurrentMachine({ id, name });
            fetchMachine(id);
          }
          handleCloseMachineModal();
        }}
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
            disableSelect={true}
          />
        </Modal.Body>
      </Modal>

      <ParentModal
        show={showParentModal}
        handleClose={handleCloseParentModal}
        setSelectedParent={setSelectedParent}
      />

       {/* Modal Component */}
       <MachineSelectionModal
        show={machineSelectionModal}
        handleClose={() => setMachineSelectionModal(false)}
        setMachine={TheMachine}
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
                    <Form.Control
                      type="text"
                      value={items.pn}
                      onChange={handleChange("pn")}
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="sn">
                    <Form.Label>Serial Number</Form.Label>
                    <Form.Control
                      type="text"
                      value={items.sn}
                      onChange={handleChange("sn")}
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="date">
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                      type="date"
                      value={items.date}
                      onChange={handleChange("date")}
                    />
                  </Form.Group>
                </Row>
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
                    <Row>
                      <Form.Label>Price</Form.Label>
                      <Form.Control
                        placeholder="Price"
                        type="text"
                        value={items.price}
                        onChange={handleChange("price")}
                      />
                    </Row>
                  </Form.Group>
                </Row>
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
                          placeholder="Date"
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
                <div style={{ marginBottom: "1rem" }}>
                  <Form.Group className="mb-3" controlId="desc">
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
                      value={
                        selectedDesc !== null
                          ? descriptions[selectedDesc].description
                          : ""
                      }
                      onChange={(e) =>
                        selectedDesc !== null &&
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
                      value={
                        selectedDesc !== null
                          ? descriptions[selectedDesc].date
                          : ""
                      }
                      onChange={(e) =>
                        selectedDesc !== null &&
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
                        <Form.Control
                          type="text"
                          placeholder="Selected Machine"
                          value={selectedMachine.name}
                          readOnly
                          style={{ cursor: "default", marginTop: "0.5rem" }}
                        />
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
                        <Form.Control
                          type="text"
                          placeholder="Selected Machine"
                          value={selectedCurrentMachine.name}
                          readOnly
                          style={{ cursor: "default", marginTop: "0.5rem" }}
                        />
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
                <div className="mt-3 d-flex flex-wrap">
                  {photos.map((photo, index) => (
                    <div
                      key={index}
                      className="d-flex flex-column align-items-center mb-2 me-2"
                    >
                      <img
                        src={photo.url}
                        alt={`Photo ${index + 1}`}
                        style={{
                          width: "100px",
                          height: "100px",
                          marginRight: "10px",
                        }}
                      />
                      <Button
                        variant="danger"
                        onClick={() => removePhoto(index)}
                      >
                        X
                      </Button>
                    </div>
                  ))}
                </div>

                <div>
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
                </div>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </LoggedIn>
  );
}
