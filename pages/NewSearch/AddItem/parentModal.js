import React, { useEffect, useState } from "react";
import {
  Modal,
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
  Table,
} from "react-bootstrap";
import {
  fetchPartsWithMachineData,
  fetchClients,
  fetchModels,
  formatDate,
} from "../../../utils/fetchAssociations";
import { useAuth } from "../../../context/AuthUserContext";
import LoggedIn from "../../LoggedIn";
import ClientTable from "../../../utils/ClientTable";
import ModelTable from "../../../utils/ModelTable";
import PartTable from "../../../utils/PartTable";
import styles from "../../../styles/MainSearch.module.css";
import firebase from "../../../context/Firebase";

const CLIENT_WAREHOUSE = "igor-house";
const CLIENT_UNASSIGNED = "unassigned";

const ParentModal = ({ show, handleClose, setSelectedParent, parts }) => {
  const [info, setInfo] = useState([]);
  const [backupInfo, setBackupInfo] = useState([]);
  const [ids, setID] = useState([]);
  const [search, setSearch] = useState("");
  const [select, setSelect] = useState("Name");
  const [showList, setShowList] = useState(false);
  const [showListSearch, setShowListSearch] = useState("text");
  const [selectedOEM, setSelectedOEM] = useState(null);
  const [selectedModality, setSelectedModality] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [clients, setClients] = useState([]);
  const [showClientModal, setShowClientModal] = useState(false);
  const [clientButtonText, setClientButtonText] = useState("Select Option");
  const [hoverIndex, setHoverIndex] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [models, setModels] = useState([]);
  const [showModelModal, setShowModelModal] = useState(false);
  const [modelButtonText, setModelButtonText] = useState("Select Option");
  const [clientSearchTerm, setClientSearchTerm] = useState("");
  const [modelSearchTerm, setModelSearchTerm] = useState("");

  useEffect(() => {
    async function fetchData() {
      const data = await fetchPartsWithMachineData();
      setInfo(data);
      setBackupInfo(data);
      setID(data.map((item) => item.id)); // Ensure IDs are correctly set here
    }
    fetchData();
  }, []);

  const handleCloseClientModal = () => setShowClientModal(false);
  const handleShowClientModal = () => setShowClientModal(true);

  const handleCloseModelModal = () => setShowModelModal(false);
  const handleShowModelModal = () => setShowModelModal(true);

  // Handle search input changes
  const searchChangeHandler = (event) => setSearch(event.target.value);

  // Filter items based on search criteria
  function searchFilter() {
    const temp = backupInfo.filter((item) => {
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
        return b[select].localeCompare(a[select]);
      }
      if (pos === 1) {
        return Date.parse(b[select]) - Date.parse(a[select]);
      }
      return Number(b[select]) - Number(a[select]);
    });
    setInfo(sortedInfo);
  }

  // Row selection handler
  const rowSelect = (id, name) => {
    setSelectedParent({ id, name });
    handleClose();
  };

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
    console.log("clicked");
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
  };

  // Clear client selection handler
  const handleClearClientSelection = () => {
    setClientButtonText("Select Option");
    setSelectedClient(null);
    setShowClientModal(false);
    searchFilter();
  };

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

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Select Parent</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: "80vh" }}
        >
          <div className="w-100" style={{ maxWidth: "1200px" }}>
            <Card>
              <Card.Body>
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

                      <InputGroup className="mb-3">
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
                    </div>
                  </Col>

                  <Col md={8}>
                    <div className={styles.tableContainer}>
                      <Table striped bordered hover size="sm" className="mb-0">
                        <thead className={styles.stickyHeader}>
                          <tr>
                            <th onClick={() => sortCheckAll(0)}>Name</th>
                            <th onClick={() => sortCheckAll(1)}>Date</th>
                            <th onClick={() => sortCheckAll(2)}>Work Order</th>
                            <th onClick={() => sortCheckAll(3)}>
                              Product Number
                            </th>
                            <th onClick={() => sortCheckAll(4)}>
                              Serial Number
                            </th>
                            <th>Select</th>
                          </tr>
                        </thead>
                        <tbody>
                          {info.map((item, index) => (
                            <tr className="clickable-row" key={index}>
                              <td>{item.name}</td>
                              <td>{formatDate(item.date)}</td>
                              <td>
                                {item.workOrders && item.workOrders.length > 0
                                  ? item.workOrders[item.workOrders.length - 1]
                                      .workOrder
                                  : "N/A"}
                              </td>
                              <td>{item.pn}</td>
                              <td>{item.sn}</td>
                              <td>
                                <Button
                                  variant="primary"
                                  onClick={() =>
                                    rowSelect(ids[index], item.name)
                                  }
                                >
                                  Select
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
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
                            >
                              Description
                            </NavDropdown.Item>
                          </NavDropdown>
                          {/* <Button variant="info" onClick={searchFilter}>
                            Search
                          </Button> */}
                        </Form>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </div>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
      <Modal show={showClientModal} onHide={handleCloseClientModal}>
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
            disableInfo={true}
            onSelectClient={handleClientSelect}
            onInfoClick={handleClientInfo}
            clearSelection={() => handleClientSelect(null)} // Clear selection handler
          />
        </Modal.Body>
      </Modal>

      <Modal show={showModelModal} onHide={handleCloseModelModal}>
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
    </Modal>
  );
};

export default ParentModal;
