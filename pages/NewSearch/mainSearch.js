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
  fetchPartsWithMachineData,
  fetchClients,
  fetchModels,
  formatDate,
} from "../../utils/fetchAssociations";
import { useAuth } from "../../context/AuthUserContext";
import LoggedIn from "../LoggedIn";
import ClientTable from "../../utils/ClientTable";
import ModelTable from "../../utils/ModelTable";
import PartTable from "../../utils/PartTable";
import styles from "../../styles/MainSearch.module.css";
import firebase from "../../context/Firebase";

const CLIENT_WAREHOUSE = "igor-house";
const CLIENT_UNASSIGNED = "unassigned";

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

export default function MainSearch() {
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
  const [selectedClient, setSelectedClient] = useState(null);
  const [clients, setClients] = useState([]);
  const [showClientModal, setShowClientModal] = useState(false);
  const [clientButtonText, setClientButtonText] = useState("Select Option");
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
    const data = await fetchPartsWithMachineData();
    setInfo(data);
    setBackupInfo(data);
    setID(data.map((item) => item.id)); // Ensure IDs are correctly set here
  }

  const searchChangeHandler = (event) => setSearch(event.target.value);

  function searchFilter() {
    const temp = backupInfo.filter((item) => {
      if (item.machineData) {
        if (selectedOEM && item.machineData.OEM !== selectedOEM) return false;
        if (selectedModality && item.machineData.Modality !== selectedModality)
          return false;
        if (selectedClient && item.machineData.Client !== selectedClient)
          return false;
        if (selectedModel && item.machineData.Model !== selectedModel) return false;
      }
      if (
        select === "Name" &&
        item.name.toLowerCase().includes(search.toLowerCase())
      )
        return true;
      if (select === "Date") {
        const [month, day, year] = item.date.split("/");
        const reformattedDate = `${year}-${month}-${day}`;
        return reformattedDate === search;
      }
      if (select === "Work Order" && item.wo === search) return true;
      if (select === "Product Number" && item.pn === search) return true;
      if (
        select === "Description" &&
        item.desc.toLowerCase().includes(search.toLowerCase())
      )
        return true;
      if (select === "SKU" && item.id.toLowerCase().includes(search.toLowerCase()))
        return true;
      return false;
    });
    setInfo(temp);
  }

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
    console.log(info[0])
    console.log(info[item])
    if (item && item.id) {
      console.log("Selected item ID:", info[item]);
      // Use item.id for subsequent actions
    } else {
      console.error("Unable to determine the selected item’s ID: ", info[item]);
    }
  };
  

  const [selectedItems, setSelectedItems] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleSelectItem = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id]
    );
  };

  const handleShowDeleteModal = () => setShowDeleteModal(true);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  const handleDeleteSelected = async () => {
    setIsDeleting(true);
    try {
      const db = firebase.firestore();
      const deletePromises = selectedItems.map(async (itemId) => {
        await db.collection("Test").doc(itemId).delete();
        await db.collection("Parts").doc(itemId).delete();
        await deleteFromStorage(itemId);
      });
      await Promise.all(deletePromises);
      setInfo(info.filter((item) => !selectedItems.includes(item.id)));
      setSelectedItems([]);
    } catch (error) {
      console.error("Error deleting items:", error);
    } finally {
      setIsDeleting(false);
      handleCloseDeleteModal();
      router.reload();
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

  const handleDelete = async () => {
    let itemId = gIde;
    try {
      setIsDeleting(true);
      const db = firebase.firestore();
      await db.collection("Test").doc(itemId).delete();
      await deleteFromPartsCollection(itemId);
      await deleteFromStorage(itemId);
      setInfo(info.filter((_, i) => gPos !== i));
      console.log(`Deleted item: ${itemId}`);
    } catch (error) {
      console.error("Error deleting item:", error);
    } finally {
      setIsDeleting(false);
    }
    handleClose();
  };

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

  useEffect(() => {
    searchFilter();
  }, [selectedOEM, selectedModality, selectedClient, selectedModel, search]);

  const handleClientClick = async () => {
    const clientsData = await fetchClients(selectedOEM, selectedModality);
    setClients(clientsData);
    setClientSearchTerm("");
    setShowClientModal(true);
  };

  const handleClientSelect = (clientName) => {
    setClientButtonText(clientName || "Select Option");
    setSelectedClient(clientName || null);
    setShowClientModal(false);
  };

  const handleClientInfo = (clientId, clientName) => {
    console.log(`Client ID: ${clientId}, Client Name: ${clientName}`);
    router.push("client/" + clientId);
  };

  const handleClearClientSelection = () => {
    setClientButtonText("Select Option");
    setSelectedClient(null);
    setShowClientModal(false);
    searchFilter();
  };

  const [models, setModels] = useState([]);
  const [showModelModal, setShowModelModal] = useState(false);
  const [modelButtonText, setModelButtonText] = useState("Select Option");

  const handleModelClick = async () => {
    const modelsData = await fetchModels(selectedOEM, selectedModality, selectedClient);
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
    searchFilter();
  };

  const handleWarehouseClick = () => {
    setClientButtonText(CLIENT_WAREHOUSE);
    setSelectedClient(CLIENT_WAREHOUSE);
    searchFilter();
  };

  const handleUnassignedClick = () => {
    setClientButtonText(CLIENT_UNASSIGNED);
    setSelectedClient(CLIENT_UNASSIGNED);
    searchFilter();
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
          <Modal.Title>Select Client</Modal.Title>
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

                  {/* Buttons */}
                  <div>
                    <InputGroup className="mb-3">
                      <InputGroup.Text>Client</InputGroup.Text>
                      <Button variant="outline-secondary" className="w-100" onClick={handleClientClick}>
                        {clientButtonText}
                      </Button>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroup.Text>Client-2</InputGroup.Text>
                      <Button variant="outline-secondary" className="w-100" disabled>
                        Select Option
                      </Button>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroup.Text>Model</InputGroup.Text>
                      <Button variant="outline-secondary" className="w-100" onClick={handleModelClick}>
                        {modelButtonText}
                      </Button>
                    </InputGroup>
                    <div className={styles.divider}></div>
                    <InputGroup className="mb-3">
                      <InputGroup.Text>Warehouse</InputGroup.Text>
                      <div className={styles.buttonGroup}>
                        <Button variant="outline-secondary" className={styles.flexButton} onClick={handleWarehouseClick}>
                          Warehouse
                        </Button>
                        <Button variant="outline-secondary" className={styles.flexButton} onClick={handleUnassignedClick}>
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
                      setShowDeleteModal={setShowDeleteModal}
                      isDeleting={isDeleting}
                      rowSelect={rowSelect}
                      setHoverIndex={setHoverIndex}
                      hoverIndex={hoverIndex}
                      selectedItems={selectedItems}
                      setSelectedItems={setSelectedItems}
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
                          <NavDropdown.Item onClick={() => setSelect("Name") & setShowListSearch("text")}>
                            Name
                          </NavDropdown.Item>
                          <NavDropdown.Item onClick={() => setSelect("Date") & setShowListSearch("date")}>
                            Date
                          </NavDropdown.Item>
                          <NavDropdown.Item onClick={() => setSelect("Work Order") & setShowListSearch("number")}>
                            Work Order
                          </NavDropdown.Item>
                          <NavDropdown.Item onClick={() => setSelect("Product Number") & setShowListSearch("number")}>
                            Product Number
                          </NavDropdown.Item>
                          <NavDropdown.Item onClick={() => setSelect("Description") & setShowListSearch("text")}>
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
