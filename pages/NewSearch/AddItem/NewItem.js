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
import dynamic from "next/dynamic";
import { useAuth } from "../../../context/AuthUserContext";
import firebase from "../../../context/Firebase";
import LoggedIn from "../../LoggedIn";
import { useRouter } from "next/router";
import { fetchClients } from "../../../utils/fetchAssociations";
import ClientTable from "../../../utils/ClientTable";
import ClientInfoModal from "../ClientInfoModal";
import ParentModal from "./ParentModal";

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

export default function NewItem() {
  const router = useRouter();
  const { signal } = router.query;  // Retrieve the query parameter
  const { signOut } = useAuth();
  const [items, setItems] = useState({
    name: "",
    pn: "",
    sn: "",
    date: "",
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
  const [selectedDesc, setSelectedDesc] = useState(0);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [selectedParent, setSelectedParent] = useState(null);
  const [machineOptions, setMachineOptions] = useState([]);
  const [search, setSearch] = useState("");
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [cameraFacing, setCameraFacing] = useState("environment");
  const [addToWebsite, setAddToWebsite] = useState(false);
  const [setID, setSetId] = useState(null);

  useEffect(() => {
    if (signal) {
      // Execute special behavior
      console.log("Special behavior triggered: " + signal);
      setSetId(signal)
    }

    async function fetchClientsData() {
      try {
        const clientsData = await fetchClients();
        setClients(clientsData);
      } catch (error) {
        console.error("Error fetching clients: ", error);
      }
    }

    fetchClientsData();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseErr = () => setShowErr(false);
  const handleShowErr = () => setShowErr(true);

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
    console.log("testing 12345")
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
      console.log(machines)
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

    if (selectedParent && selectedParent.id) {
      formattedItems.Parent = db.collection("Test").doc(selectedParent.id);
    }

    let customID = generateCustomID();

    if(signal){
      customID = signal
    }

    try {
      await db.collection("Test").doc(customID).set(formattedItems);
      await uploadPhotos(customID);
      console.log(selectedMachine)
      if (addToWebsite) {
        const partsItem = {
          Name: items.name,
          PN: items.pn,
          SN: items.sn,
          Description: descriptions[0]?.description || "",
          Images: photos.map((_, index) => `Parts/${customID}/${customID}${index === 0 ? "" : `.${index + 1}`}`),
          Available: true,
          Machine: selectedMachine?.name || "",
          Modality: selectedMachine?.Modality || "", // Set your default or dynamic modality here
          OEM: selectedMachine?.OEM || "", // Set your default or dynamic OEM here
          PM: items.pn,
        };

        await db.collection("Parts").doc(customID).set(partsItem);
      }

      console.log("Items added!");
      // router.push("../mainSearch");
    } catch (error) {
      console.error("Error updating data: ", error);
    }
  }

  const uploadPhotos = async (customID) => {
    const storageRef = firebase.storage().ref();
    for (let i = 0; i < photos.length; i++) {
      const photoRef = storageRef.child(
        `Parts/${customID}/${customID}${i === 0 ? ".jpg" : `.${i + 1}.jpg`}`
      );
      await photoRef.put(photos[i]);
    }
  };

  // Handle form submission
  async function handleSubmit(event) {
    event.preventDefault();
    console.log("enter handle submit");
    // console.log(items);
    let check = false;

    if (!items.name) check = true;
    if (!items.pn) check = true;
    if (!items.sn) check = true;
    if (descriptions.some((desc) => !desc.description)) check = true;
    if (workOrders.some((wo) => !wo.workOrder)) check = true;

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
    setPhotos((prevPhotos) => [...prevPhotos, capturedPhoto]);
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
        setSelectedMachine={(id, name, OEM, Modality) => {
          setSelectedMachine({ id, name, OEM, Modality });
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
                  <Form.Group as={Col} controlId="date">
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
                      <Col>
                        <Form.Control
                          placeholder="Width"
                          type="text"
                          value={items.width}
                          onChange={handleChange("width")}
                        />
                      </Col>
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
                </Row>
                <div style={{ marginBottom: "1rem", marginTop: "1rem" }}>
                  {/* <Form.Label>Work Orders</Form.Label> */}
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
                    {/* <Form.Label>Description</Form.Label> */}
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
                        onClick={handleShowClientModal}
                        className="me-2"
                      >
                        Select Machine
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
                        src={URL.createObjectURL(photo)}
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
                    Submit
                  </Button>

                  <LoadingButton
                    type="secondary"
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
