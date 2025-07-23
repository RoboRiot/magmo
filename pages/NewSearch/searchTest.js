import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  Row,
  Col,
  InputGroup,
  Dropdown,
  FormControl,
  Button,
  NavDropdown,
  Form,
  Modal,
  Spinner,
} from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  fetchTestItemsWithMachineData,
  fetchClients,
  fetchModels,
  formatDate,
} from "../../utils/testFetch";
import { useAuth } from "../../context/AuthUserContext";
import LoggedIn from "../LoggedIn";
import ClientTable from "../../utils/ClientTable";
import ModelTable from "../../utils/ModelTable";
import PartTable from "../../utils/PartTable";
import styles from "../../styles/MainSearch.module.css";
import firebase from "../../context/Firebase";

// Predefined warehouse client IDs and display names
const SOCAL_CLIENT_ID = "AIS17182";
const NORCAL_CLIENT_ID = "AIS25097";
const UNASSIGNED_CLIENT_ID = "AIS00404";


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

  return (
    <Link href={`/${route}`}>
      <a
        className={`btn btn-${type}`}
        disabled={isLoading}
        onClick={() => !isLoading && setLoading(true)}
      >
        {isLoading ? "Loading…" : name}
      </a>
    </Link>
  );
}

export default function searchTest() {
  const { signOut } = useAuth();
  const [info, setInfo] = useState([]);
  const [backupInfo, setBackupInfo] = useState([]);
  const [ids, setID] = useState([]);
  const [show, setShow] = useState(false);
  const [dItem, setDItem] = useState();
  const [select, setSelect] = useState("Name");
  const [showList, setShowList] = useState(false);
  const [showListSearch, setShowListSearch] = useState("text");
  const [search, setSearch] = useState("");
  const [selectedOEM, setSelectedOEM] = useState(null);
  const [selectedModality, setSelectedModality] = useState(null);
  // Replace the old single client state with two sets:
  const [selectedClientFrom, setSelectedClientFrom] = useState(null);
  const [clientFromButtonText, setClientFromButtonText] = useState("Select Option");
  const [selectedClientCurrent, setSelectedClientCurrent] = useState(null);
  const [clientCurrentButtonText, setClientCurrentButtonText] = useState("Select Option");

  const [clients, setClients] = useState([]);
  const [showClientModal, setShowClientModal] = useState(false);
  // This state tells the modal which client box is being updated: "from" or "current"
  const [clientSelectionType, setClientSelectionType] = useState(null);

  const router = useRouter();
  const labelBase = ["name", "date", "w/o", "p/n", "s/n"];
  const labelBaseNames = ["name", "date", "wo", "pn", "sn"];
  const sortCheckBase = [false, false, false, false, false, false];
  const [labels, setLabels] = useState(labelBase);
  const [sortCheck, setSortCheck] = useState(sortCheckBase);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [gPos, setGPos] = useState(null);
  const [gIde, setGIde] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);


  // Fetch data on component mount and route change
  useEffect(() => {
    fetchData();
  }, [router.route]);

  async function fetchData() {
    if (router.query.inputText && router.query.selectedType) {
      setSelect(router.query.selectedType);
      setSearch(router.query.inputText);
    }
    const data = await fetchTestItemsWithMachineData();
    setInfo(data);
    setBackupInfo(data);
    setID(data.map((item) => item.id)); // Ensure IDs are correctly set here
  }

  const searchChangeHandler = (event) => setSearch(event.target.value);

  // Asynchronous filter function that loops through backupInfo and,
  // for each item, fetches its Machine and CurrentMachine documents,
  // then compares the client id (from machineData.client.id) to the selected client.
  useEffect(() => {
    async function filterParts() {
      console.log(
        "filterParts called with selectedClientFrom:",
        selectedClientFrom,
        "selectedClientCurrent:",
        selectedClientCurrent
      );
      const filtered = await Promise.all(
        backupInfo.map(async (item) => {
          if (!item.visible) {
            return null;
          }
          
          let passes = true;
          // Check OEM, Modality, and Model from machineData (if available)
          if (item.machineData) {
            if (selectedOEM && item.machineData.OEM !== selectedOEM) passes = false;
            if (selectedModality && item.machineData.Modality !== selectedModality)
              passes = false;
            if (selectedModel && item.machineData.Model !== selectedModel) passes = false;
          }
          // For Client From: use the part’s Machine reference
          if (passes && selectedClientFrom) {
            if (!item.Machine) {
              console.log(`Item ${item.id} has no Machine reference.`);
              passes = false;
            } else {
              try {
                const machineSnap = await item.Machine.get();
                if (!machineSnap.exists) {
                  console.log(`Item ${item.id} Machine document does not exist.`);
                  passes = false;
                } else {
                  const machineData = machineSnap.data();
                  if (!machineData.client) {
                    console.log(`Item ${item.id} Machine has no client reference.`);
                    passes = false;
                  } else {
                    // Get the client id from the DocumentReference
                    const clientFromId = machineData.client.id;
                    console.log(
                      `Item ${item.id}: fetched Client From id = ${clientFromId}, selectedClientFrom = ${selectedClientFrom}`
                    );
                    if (clientFromId !== selectedClientFrom) passes = false;
                  }
                }
              } catch (error) {
                console.error(`Error fetching Machine for item ${item.id}:`, error);
                passes = false;
              }
            }
          }
          // For Client Current: use the part’s CurrentMachine reference
          if (passes && selectedClientCurrent) {
            if (!item.CurrentMachine) {
              console.log(`Item ${item.id} has no CurrentMachine reference.`);
              passes = false;
            } else {
              try {
                const currentMachineSnap = await item.CurrentMachine.get();
                if (!currentMachineSnap.exists) {
                  console.log(`Item ${item.id} CurrentMachine document does not exist.`);
                  passes = false;
                } else {
                  const currentMachineData = currentMachineSnap.data();
                  if (!currentMachineData.client) {
                    console.log(`Item ${item.id} CurrentMachine has no client reference.`);
                    passes = false;
                  } else {
                    const clientCurrentId = currentMachineData.client.id;
                    console.log(
                      `Item ${item.id}: fetched Client Current id = ${clientCurrentId}, selectedClientCurrent = ${selectedClientCurrent}`
                    );
                    if (clientCurrentId !== selectedClientCurrent) passes = false;
                  }
                }
              } catch (error) {
                console.error(`Error fetching CurrentMachine for item ${item.id}:`, error);
                passes = false;
              }
            }
          }
          // If search text is not empty, apply additional filtering
          if (passes && search !== "") {
            if (select === "Name" && !item.name.toLowerCase().includes(search.toLowerCase()))
              passes = false;
            if (select === "Date") {
              const [month, day, year] = item.date.split("/");
              const reformattedDate = `${year}-${month}-${day}`;
              if (reformattedDate !== search) passes = false;
            }
            if (select === "Work Order" && item.wo !== search) passes = false;
            if (select === "Product Number" && item.pn !== search) passes = false;
            if (select === "Description" && !item.desc.toLowerCase().includes(search.toLowerCase()))
              passes = false;
            if (select === "SKU" && !item.id.toLowerCase().includes(search.toLowerCase()))
              passes = false;
          }
          return passes ? item : null;
        })
      );
      const filteredResults = filtered.filter((item) => item !== null);
      console.log("Filtered result count:", filteredResults.length);
      setInfo(filteredResults);
    }
    filterParts();
  }, [
    selectedOEM,
    selectedModality,
    selectedClientFrom,
    selectedClientCurrent,
    selectedModel,
    search,
    backupInfo,
  ]);

  function sortCheckAll(pos) {
    const sortedInfo = [...info].sort((a, b) => {
      if (pos === 0 || pos === 5) {
        return sortCheck[pos]
          ? b[labelBaseNames[pos]].localeCompare(a[labelBaseNames[pos]])
          : a[labelBaseNames[pos]].localeCompare(b[labelBaseNames[pos]]);
      }
      if (pos === 1) {
        return sortCheck[pos]
          ? Date.parse(b[labelBaseNames[pos]]) - Date.parse(a[labelBaseNames[pos]])
          : Date.parse(a[labelBaseNames[pos]]) - Date.parse(b[labelBaseNames[pos]]);
      }
      return sortCheck[pos]
        ? Number(b[labelBaseNames[pos]]) - Number(a[labelBaseNames[pos]])
        : Number(a[labelBaseNames[pos]]) - Number(b[labelBaseNames[pos]]);
    });
    setInfo(sortedInfo);
    setSortCheck((prevSortCheck) =>
      prevSortCheck.map((_, index) =>
        index === pos ? !prevSortCheck[pos] : prevSortCheck[index]
      )
    );
  }

  const rowSelect = (item) => {
    if (item && item.id) {
      console.log("Selected item:", item);
      router.push("./item/" + item.id);
    } else {
      console.error("Unable to determine the selected item’s ID: ", item);
    }
  };

  const [selectedItems, setSelectedItems] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleSelectItem = (id) => {
    setSelectedItems((prev) => {
      const newSelection = prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
      console.log("Selected items:", newSelection);
    });
  };

  const handleShowDeleteModal = () => setShowDeleteModal(true);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  const handleDeleteSelected = async () => {
    setIsDeleting(true);
    const db = firebase.firestore();
    try {
      // Loop over each selected item one at a time
      for (const itemId of selectedItems) {
        console.log(itemId)
        try {
          // Delete from "Test" collection
          await db.collection("TestItem").doc(itemId).delete();
        } catch (err) {
          console.error(`Error deleting document ${itemId} from TestItem:`, err);
        }
        try {
          // Delete from "Parts" collection
          await db.collection("Parts").doc(itemId).delete();
        } catch (err) {
          console.error(`Error deleting document ${itemId} from Parts:`, err);
        }
        try {
          // Delete associated photos from storage
          await deleteFromStorage(itemId);
        } catch (err) {
          console.error(`Error deleting storage for ${itemId}:`, err);
        }
      }
      // Update local state by filtering out the deleted items
      setInfo(info.filter((item) => !selectedItems.includes(item.id)));
      setSelectedItems([]);
    } catch (error) {
      console.error("Error deleting items:", error);
    } finally {
      setIsDeleting(false);
      handleCloseDeleteModal();
      // Optionally, reload the page
      // router.reload();
    }
  };


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const checkDelete = (event, pos, idsToDelete, name) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    console.log("Selected IDs to delete:", idsToDelete);
    setSelectedItems(idsToDelete);
    setDItem(name);
    setShowDeleteModal(true);
  };

  // const handleDelete = async () => {
  //   let itemId = gIde;
  //   try {
  //     setIsDeleting(true);
  //     const db = firebase.firestore();
  //     await db.collection("Test").doc(itemId).delete();
  //     await deleteFromPartsCollection(itemId);
  //     await deleteFromStorage(itemId);
  //     setInfo(info.filter((_, i) => gPos !== i));
  //     console.log(`Deleted item: ${itemId}`);
  //   } catch (error) {
  //     console.error("Error deleting item:", error);
  //   } finally {
  //     setIsDeleting(false);
  //   }
  //   handleClose();
  // };

  const hoverStyle = (index) => ({
    backgroundColor: hoverIndex === index ? "#ddd" : "transparent",
    textAlign: "center",
    cursor: "default",
  });

  const [dropdown1Text, setDropdown1Text] = useState("Select Option");
  const [dropdown2Text, setDropdown2Text] = useState("Select Option");

  const handleSelect1 = (eventKey, event) => {
    if (eventKey === "unassigned") {
      setDropdown1Text("Select Option");
      setSelectedOEM(null);
    } else {
      setDropdown1Text(event.target.textContent);
      setSelectedOEM(event.target.textContent);
    }
  };

  const handleSelect2 = (eventKey, event) => {
    if (eventKey === "unassigned") {
      setDropdown2Text("Select Option");
      setSelectedModality(null);
    } else {
      setDropdown2Text(event.target.textContent);
      setSelectedModality(event.target.textContent);
    }
  };

  // --------------------
  // CLIENT SELECTION HANDLING
  // --------------------
  // This function fetches clients and opens the client modal.
  const handleClientClick = async () => {
    const clientsData = await fetchClients(selectedOEM, selectedModality);
    setClients(clientsData);
    setClientSearchTerm("");
    setShowClientModal(true);
  };

  // When a client is selected in the modal, we now assume the parameter is a client ID.
  // If the passed value is null, we clear the selection.
  const handleClientSelect = async (clientId) => {
    console.log("User selected client id:", clientId);
    if (!clientId) {
      if (clientSelectionType === "from") {
        setClientFromButtonText("Select Option");
        setSelectedClientFrom(null);
      } else if (clientSelectionType === "current") {
        setClientCurrentButtonText("Select Option");
        setSelectedClientCurrent(null);
      }
      setShowClientModal(false);
      return;
    }
    try {
      const clientSnap = await firebase.firestore().collection("Client").doc(clientId).get();
      if (clientSnap.exists) {
        const clientData = clientSnap.data();
        if (clientSelectionType === "from") {
          setClientFromButtonText(clientData.name);
          setSelectedClientFrom(clientId);
        } else if (clientSelectionType === "current") {
          setClientCurrentButtonText(clientData.name);
          setSelectedClientCurrent(clientId);
        }
      } else {
        console.error("No client document found for id:", clientId);
      }
    } catch (error) {
      console.error("Error fetching client data:", error);
    }
    setShowClientModal(false);
  };

  const handleClientInfo = (clientId, clientName) => {
    console.log(`Client ID: ${clientId}, Client Name: ${clientName}`);
    router.push("client/" + clientId);
  };

  const handleClearClientSelection = () => {
    if (clientSelectionType === "from") {
      setClientFromButtonText("Select Option");
      setSelectedClientFrom(null);
    } else if (clientSelectionType === "current") {
      setClientCurrentButtonText("Select Option");
      setSelectedClientCurrent(null);
    }
    setShowClientModal(false);
  };

  // --------------------
  // MODEL SELECTION HANDLING
  // --------------------
  const [models, setModels] = useState([]);
  const [showModelModal, setShowModelModal] = useState(false);
  const [modelButtonText, setModelButtonText] = useState("Select Option");

  const handleModelClick = async () => {
    const modelsData = await fetchModels(
      selectedOEM,
      selectedModality,
      selectedClientFrom
    );
    setModels(modelsData);
    setModelSearchTerm("");
    setShowModelModal(true);
  };

  const handleModelSelect = (modelName) => {
    setModelButtonText(modelName || "Select Option");
    setSelectedModel(modelName || null);
    setShowModelModal(false);
  };

  const handleClearModelSelection = () => {
    setModelButtonText("Select Option");
    setSelectedModel(null);
    setShowModelModal(false);
  };

  // --------------------
  // WAREHOUSE BUTTONS (for Client Current)
  // --------------------
  const handleSoCalWarehouseClick = () => {
    setClientCurrentButtonText("SoCal Warehouse");
    setSelectedClientCurrent(SOCAL_CLIENT_ID);
    console.log("Warehouse button clicked: setting Client Current to", SOCAL_CLIENT_ID);
  };

  const handleNorCalWarehouseClick = () => {
    setClientCurrentButtonText("NorCal Warehouse");
    setSelectedClientCurrent(NORCAL_CLIENT_ID);
    console.log("Warehouse button clicked: setting Client Current to", NORCAL_CLIENT_ID);
  };

  const handleWarehouseUnassignedClick = () => {
    setClientCurrentButtonText("Unassigned");
    setSelectedClientCurrent(UNASSIGNED_CLIENT_ID);
    console.log("Warehouse button clicked: setting Client Current to", UNASSIGNED_CLIENT_ID);
  };

  const [clientSearchTerm, setClientSearchTerm] = useState("");
  const [modelSearchTerm, setModelSearchTerm] = useState("");

  const deleteFromStorage = async (itemId) => {
    const storageRef = firebase.storage().ref();
    const folderRef = storageRef.child(`Parts/${itemId}/`);
    try {
      const listResult = await folderRef.listAll();
      const deletePromises = listResult.items.map((item) => item.delete());
      await Promise.all(deletePromises);
    } catch (error) {
      console.error("Error deleting from storage:", error);
    }
  };

  const deleteFromPartsCollection = async (itemId) => {
    const db = firebase.firestore();
    try {
      await db.collection("Parts").doc(itemId).delete();
      console.log(`Deleted item from Parts collection: ${itemId}`);
    } catch (error) {
      console.error("Error deleting from Parts collection:", error);
    }
  };

  return (
    <LoggedIn>
      {isDeleting && (
        <div className="loading-overlay">
          <Spinner animation="border" role="status" className="spinner-center">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      )}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete {selectedItems.length} item
          {selectedItems.length > 1 ? "s" : ""}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDeleteSelected}>
            Yes, delete
          </Button>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showClientModal} onHide={() => setShowClientModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            Select {clientSelectionType === "from" ? "Client From" : "Client Current"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormControl
            type="text"
            placeholder="Search by name"
            className="mb-3"
            value={clientSearchTerm}
            onChange={(e) => setClientSearchTerm(e.target.value)}
          />
          <ClientTable
            clients={clients.filter((client) =>
              client.name.toLowerCase().includes(clientSearchTerm.toLowerCase())
            )}
            onSelectClient={handleClientSelect}
            onInfoClick={handleClientInfo}
            isClientSearch={false}
            clearSelection={() => handleClientSelect(null)}
          />
        </Modal.Body>
      </Modal>

      <Modal show={showModelModal} onHide={() => setShowModelModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Select Model</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormControl
            type="text"
            placeholder="Search by name"
            className="mb-3"
            value={modelSearchTerm}
            onChange={(e) => setModelSearchTerm(e.target.value)}
          />
          <ModelTable
            models={models.filter((model) =>
              typeof model === "string"
                ? model.toLowerCase().includes(modelSearchTerm.toLowerCase())
                : false
            )}
            onSelectModel={handleModelSelect}
            clearSelection={() => handleModelSelect(null)}
          />
        </Modal.Body>
      </Modal>

      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "1200px" }}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Magmo</h2>
              <Row>
                <Col md={4}>
                  {/* Dropdowns */}
                  <div>
                    <InputGroup className="mb-3">
                      <InputGroup.Text>OEM</InputGroup.Text>
                      <Dropdown onSelect={handleSelect1}>
                        <Dropdown.Toggle
                          variant="outline-secondary"
                          id="dropdown-button-1"
                          className="w-100"
                        >
                          {dropdown1Text}
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="w-100">
                          <Dropdown.Item eventKey="unassigned">
                            Select Option
                          </Dropdown.Item>
                          <Dropdown.Item eventKey="GE">GE</Dropdown.Item>
                          <Dropdown.Item eventKey="Toshiba">
                            Toshiba
                          </Dropdown.Item>
                          <Dropdown.Item eventKey="Siemens">
                            Siemens
                          </Dropdown.Item>
                          <Dropdown.Item eventKey="Philips">
                            Philips
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </InputGroup>

                    <InputGroup className="mb-5">
                      <InputGroup.Text>Modality</InputGroup.Text>
                      <Dropdown onSelect={handleSelect2}>
                        <Dropdown.Toggle
                          variant="outline-secondary"
                          id="dropdown-button-2"
                          className="w-100"
                        >
                          {dropdown2Text}
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="w-100">
                          <Dropdown.Item eventKey="unassigned">
                            Select Option
                          </Dropdown.Item>
                          <Dropdown.Item eventKey="CT">CT</Dropdown.Item>
                          <Dropdown.Item eventKey="MRI">MRI</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </InputGroup>
                  </div>

                  <div className={styles.divider}></div>

                  {/* Client selection boxes */}
                  <div>
                    <InputGroup className="mb-3">
                      <InputGroup.Text>Client From</InputGroup.Text>
                      <Button
                        variant="outline-secondary"
                        className="w-100"
                        onClick={() => {
                          setClientSelectionType("from");
                          handleClientClick();
                        }}
                      >
                        {clientFromButtonText}
                      </Button>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroup.Text>Client Current</InputGroup.Text>
                      <Button
                        variant="outline-secondary"
                        className="w-100"
                        onClick={() => {
                          setClientSelectionType("current");
                          handleClientClick();
                        }}
                      >
                        {clientCurrentButtonText}
                      </Button>
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroup.Text>Model</InputGroup.Text>
                      <Button
                        variant="outline-secondary"
                        className="w-100"
                        onClick={handleModelClick}
                      >
                        {modelButtonText}
                      </Button>
                    </InputGroup>

                    <div className={styles.divider}></div>

                    {/* Warehouse buttons for Client Current */}
                    <InputGroup className="mb-3">
                      <InputGroup.Text>Warehouse</InputGroup.Text>
                      <div className={styles.buttonGroup}>
                        <Button
                          variant="outline-secondary"
                          className={styles.flexButton}
                          onClick={handleSoCalWarehouseClick}
                        >
                          SoCal Warehouse
                        </Button>
                        <Button
                          variant="outline-secondary"
                          className={styles.flexButton}
                          onClick={handleNorCalWarehouseClick}
                        >
                          NorCal Warehouse
                        </Button>
                        <Button
                          variant="outline-secondary"
                          className={styles.flexButton}
                          onClick={handleWarehouseUnassignedClick}
                        >
                          Unassigned
                        </Button>
                      </div>
                    </InputGroup>
                  </div>
                </Col>

                <Col md={8}>
                  <div className={styles.tableContainer}>
                    <PartTable
                      info={info}
                      labels={labels}
                      ids={ids}
                      hoverStyle={hoverStyle}
                      sortCheckAll={sortCheckAll}
                      checkDelete={checkDelete}
                      isDeleting={isDeleting}
                      rowSelect={rowSelect}
                      setHoverIndex={setHoverIndex}
                      hoverIndex={hoverIndex}
                      selectedItems={selectedItems}         // Pass selectedItems state
                      setSelectedItems={setSelectedItems}   // Pass its setter
                    />


                    <div className={styles.searchContainer}>
                      <Form className="d-flex pb-2">
                        <FormControl
                          type={showListSearch}
                          placeholder="Search"
                          className="me-2 flex-grow-1"
                          aria-label="Search"
                          value={search}
                          onChange={searchChangeHandler}
                          style={{ flex: "1" }}
                        />
                        <NavDropdown
                          title={select}
                          id="collasible-nav-dropdown"
                          show={showList}
                          onMouseEnter={() => setShowList(true)}
                          onMouseLeave={() => setShowList(false)}
                          style={{ marginTop: "-5px" }}
                        >
                          <NavDropdown.Item onClick={() => { setSelect("Name"); setShowListSearch("text"); }}>
                            Name
                          </NavDropdown.Item>
                          <NavDropdown.Item onClick={() => { setSelect("Date"); setShowListSearch("date"); }}>
                            Date
                          </NavDropdown.Item>
                          <NavDropdown.Item onClick={() => { setSelect("Work Order"); setShowListSearch("number"); }}>
                            Work Order
                          </NavDropdown.Item>
                          <NavDropdown.Item onClick={() => { setSelect("Product Number"); setShowListSearch("number"); }}>
                            Product Number
                          </NavDropdown.Item>
                          <NavDropdown.Item onClick={() => { setSelect("Description"); setShowListSearch("text"); }}>
                            Description
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            onClick={() => {
                              setSelect("SKU");
                              setShowListSearch("text");
                            }}
                          >
                            SKU
                          </NavDropdown.Item>
                        </NavDropdown>
                      </Form>
                      <div className="d-flex justify-content-between">
                        <LoadingButton type="secondary" name="Add New Item" route="NewSearch/AddItem/NewItem" />
                        <LoadingButton type="primary" name="Back" route="Warehousedb/WarehouseSelect" />
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </LoggedIn>
  );
}
