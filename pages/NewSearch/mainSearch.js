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
  const labelBase = ["name", "date", "w/o", "p/n", "s/n", " "];
  const labelBaseNames = ["name", "date", "wo", "pn", "sn", " "];
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

  // Handle data fetching and set states accordingly
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

  // Handle search input changes
  const searchChangeHandler = (event) => setSearch(event.target.value);

  // Filter items based on search criteria
  function searchFilter() {
    const temp = backupInfo.filter((item) => {
      // console.log(item.machineData);
      if (item.machineData) {
        if (selectedOEM && item.machineData.OEM !== selectedOEM) return false;
        if (selectedModality && item.machineData.Modality !== selectedModality)
          return false;
        if (selectedClient && item.machineData.Client !== selectedClient)
          return false;
        if (selectedModel && item.machineData.Model !== selectedModel)
          return false;
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
      if (select === "Work Order" && Number(item.wo) === Number(search))
        return true;
      if (select === "Product Number" && Number(item.pn) === Number(search))
        return true;
      if (
        select === "Description" &&
        item.desc.toLowerCase().includes(search.toLowerCase())
      )
        return true;
      return false;
    });
    setInfo(temp);
  }

  // Sort items based on column
  function sortCheckAll(pos) {
    const sortedInfo = [...info].sort((a, b) => {
      if (pos === 0 || pos === 5) {
        return sortCheck[pos]
          ? b[labelBaseNames[pos]].localeCompare(a[labelBaseNames[pos]])
          : a[labelBaseNames[pos]].localeCompare(b[labelBaseNames[pos]]);
      }
      if (pos === 1) {
        return sortCheck[pos]
          ? Date.parse(b[labelBaseNames[pos]]) -
              Date.parse(a[labelBaseNames[pos]])
          : Date.parse(a[labelBaseNames[pos]]) -
              Date.parse(b[labelBaseNames[pos]]);
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

  // Row selection handler
  const rowSelect = (id) => {
    router.push("item/" + id);
  };

  // Modal handlers
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Delete item handler
  const checkDelete = (event, pos, ide, name) => {
    event.preventDefault();
    event.stopPropagation();
    console.log(ide);
    setDItem(name);
    setGPos(pos);
    setGIde(ide);
    handleShow();
  };

  // const deleteItem = async () => {
  //   const db = firebase.firestore();
  //   console.log(gIde);
  //   await db.collection("Test").doc(gIde).delete();
  //   setInfo(info.filter((_, i) => gPos !== i));
  //   handleClose();
  // };

  const handleDelete = async () => {
    let itemId = gIde;
    try {
      setIsDeleting(true);  // Show the loading spinner
      const db = firebase.firestore();
      await db.collection("Test").doc(itemId).delete();
      setInfo(info.filter((_, i) => gPos !== i));
      // You might want to refresh the item list here or remove the item from state
    } catch (error) {
      console.error("Error deleting item:", error);
    } finally {
      setIsDeleting(false);  // Hide the loading spinner
    }
    handleClose();
  };
  

  const hoverStyle = (index) => ({
    backgroundColor: hoverIndex === index ? "#ddd" : "transparent",
    textAlign: "center",
    cursor: "default",
  });

  // Dropdown handlers
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

  // Fetch clients and show modal
  const handleClientClick = async () => {
    const clientsData = await fetchClients(selectedOEM, selectedModality);
    setClients(clientsData);
    setClientSearchTerm(""); // Reset search term
    setShowClientModal(true);
  };

  // Client selection handler
  const handleClientSelect = (clientName) => {
    setClientButtonText(clientName || "Select Option");
    setSelectedClient(clientName || null);
    setShowClientModal(false);
  };

  // Client info handler
  const handleClientInfo = (clientId, clientName) => {
    console.log(`Client ID: ${clientId}, Client Name: ${clientName}`);
    router.push("client/" + clientId);
  };

  // Clear client selection handler
  const handleClearClientSelection = () => {
    setClientButtonText("Select Option");
    setSelectedClient(null);
    setShowClientModal(false);
    searchFilter();
  };

  // Modal Handlers
  // Add new state for models
  const [models, setModels] = useState([]);
  const [showModelModal, setShowModelModal] = useState(false);
  const [modelButtonText, setModelButtonText] = useState("Select Option");

  // Fetch models and show modal
  const handleModelClick = async () => {
    const modelsData = await fetchModels(
      selectedOEM,
      selectedModality,
      selectedClient
    );
    setModels(modelsData);
    setModelSearchTerm(""); // Reset search term
    setShowModelModal(true);
  };

  // Model selection handler
  const handleModelSelect = (modelName) => {
    setModelButtonText(modelName || "Select Option");
    setSelectedModel(modelName || null);
    setShowModelModal(false);
  };

  // Clear model selection handler
  const handleClearModelSelection = () => {
    setModelButtonText("Select Option");
    setSelectedModel(null);
    setShowModelModal(false);
    searchFilter();
  };

  // Add these handlers in the relevant section of your MainSearch component

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

  return (
    <LoggedIn>
      {isDeleting && (
        <div className="loading-spinner-overlay">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      )}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Would you like to delete "{dItem}"?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleDelete}>
            Yes
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            No
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
            clearSelection={() => handleClientSelect(null)} // Clear selection handler
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
            clearSelection={() => handleModelSelect(null)} // Clear selection handler
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
              <h2 className="text-center mb-4">New Search</h2>
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

                  {/* Divider */}
                  <div className={styles.divider}></div>

                  {/* Buttons */}
                  <div>
                    <InputGroup className="mb-3">
                      <InputGroup.Text>Client</InputGroup.Text>
                      <Button
                        variant="outline-secondary"
                        className="w-100"
                        onClick={handleClientClick}
                      >
                        {clientButtonText}
                      </Button>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroup.Text>Client-2</InputGroup.Text>
                      <Button
                        variant="outline-secondary"
                        className="w-100"
                        disabled
                      >
                        Select Option
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
                    {/* Divider */}
                    <div className={styles.divider}></div>
                    <InputGroup className="mb-3">
                      <InputGroup.Text>Warehouse</InputGroup.Text>
                      <div className={styles.buttonGroup}>
                        <Button
                          variant="outline-secondary"
                          className={styles.flexButton}
                          onClick={handleWarehouseClick}
                        >
                          Warehouse
                        </Button>
                        <Button
                          variant="outline-secondary"
                          className={styles.flexButton}
                          onClick={handleUnassignedClick}
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
                          <NavDropdown.Item
                            onClick={() =>
                              setSelect("Name") & setShowListSearch("text")
                            }
                          >
                            Name
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            onClick={() =>
                              setSelect("Date") & setShowListSearch("date")
                            }
                          >
                            Date
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            onClick={() =>
                              setSelect("Work Order") &
                              setShowListSearch("number")
                            }
                          >
                            Work Order
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            onClick={() =>
                              setSelect("Product Number") &
                              setShowListSearch("number")
                            }
                          >
                            Product Number
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            onClick={() =>
                              setSelect("Description") &
                              setShowListSearch("text")
                            }
                            // Add this line
                          >
                            Description
                          </NavDropdown.Item>
                        </NavDropdown>
                        {/* <Button variant="info" onClick={searchFilter}>
                          Search
                        </Button> */}
                      </Form>
                      <div className="d-flex justify-content-between">
                        <LoadingButton
                          type="secondary"
                          name="Add New Item"
                          route="NewSearch/AddItem/NewItem"
                        />
                        <LoadingButton
                          type="primary"
                          name="Back"
                          route="Warehousedb/WarehouseSelect"
                        />
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
