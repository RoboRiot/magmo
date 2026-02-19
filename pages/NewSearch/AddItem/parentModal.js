import React, { useEffect, useState, useCallback } from "react";
import {
  Modal,
  InputGroup,
  Dropdown,
  FormControl,
  Button,
  NavDropdown,
  Form,
  Table,
  Pagination,
} from "react-bootstrap";
import {
  fetchPartsWithMachineDataPage,
  fetchClients,
  fetchModels,
  formatDate,
} from "../../../utils/fetchAssociations";
import ClientTable from "../../../utils/ClientTable";
import ModelTable from "../../../utils/ModelTable";
import styles from "./ParentModal.module.css";

const CLIENT_WAREHOUSE = "igor-house";
const CLIENT_UNASSIGNED = "unassigned";
const PAGE_SIZE = 20;

const ParentModal = ({ show, handleClose, setSelectedParent }) => {
  const [info, setInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageCursors, setPageCursors] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [queryEpoch, setQueryEpoch] = useState(0);
  const [loadError, setLoadError] = useState(null);

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
  const [selectedModel, setSelectedModel] = useState(null);
  const [models, setModels] = useState([]);
  const [showModelModal, setShowModelModal] = useState(false);
  const [modelButtonText, setModelButtonText] = useState("Select Option");
  const [clientSearchTerm, setClientSearchTerm] = useState("");
  const [modelSearchTerm, setModelSearchTerm] = useState("");

  const normalizeText = (value) => {
    if (value == null) return "";
    return String(value).toLowerCase().trim();
  };

  const fieldMatchesSelection = (value, selected) => {
    if (!selected) return true;
    if (Array.isArray(value)) {
      return value.some((entry) => fieldMatchesSelection(entry, selected));
    }
    return normalizeText(value) === normalizeText(selected);
  };

  const getMachineField = (item, key) => {
    if (!item) return null;
    return (
      item?.machineData?.[key] ??
      item?.machineData?.[key?.toLowerCase?.()] ??
      item?.currentMachineData?.[key] ??
      item?.currentMachineData?.[key?.toLowerCase?.()] ??
      item?.TheMachine?.[key] ??
      item?.TheMachine?.[key?.toLowerCase?.()] ??
      null
    );
  };

  const resetPagination = () => {
    setPage(1);
    setPageCursors([]);
    setHasNextPage(false);
  };

  const searchChangeHandler = (event) => setSearch(event.target.value);

  const matchesFilters = useCallback(
    (item) => {
      if (!item) return false;
      if (selectedOEM) {
        const OEM = getMachineField(item, "OEM");
        if (!fieldMatchesSelection(OEM, selectedOEM)) return false;
      }
      if (selectedModality) {
        const Modality = getMachineField(item, "Modality");
        if (!fieldMatchesSelection(Modality, selectedModality)) return false;
      }
      if (selectedModel) {
        const Model = getMachineField(item, "Model");
        if (!fieldMatchesSelection(Model, selectedModel)) return false;
      }
      if (selectedClient) {
        const clientRef = getMachineField(item, "client");
        const clientId =
          typeof clientRef === "string"
            ? clientRef
            : clientRef?.id || null;
        if (clientId !== selectedClient) return false;
      }
      return true;
    },
    [selectedOEM, selectedModality, selectedModel, selectedClient]
  );

  const fetchData = useCallback(
    async (requestedPage = 1) => {
      if (!show) return;
      const startAfterDoc =
        requestedPage > 1 ? pageCursors[requestedPage - 2] : null;
      if (requestedPage > 1 && !startAfterDoc) {
        setPage(1);
        return;
      }
      setIsLoading(true);
      setLoadError(null);
      const searchLower = (search || "").toLowerCase().trim();
      try {
        const { parts: data, lastDoc, hasNextPage: nextPage } =
          await fetchPartsWithMachineDataPage({
            pageSize: PAGE_SIZE,
            startAfterDoc,
            visibleOnly: true,
            filterFn:
              selectedOEM || selectedModality || selectedModel || selectedClient
                ? matchesFilters
                : null,
            search: searchLower
              ? {
                  type: select,
                  raw: search,
                  lower: searchLower,
                }
              : null,
            needsMachineData:
              Boolean(selectedOEM) ||
              Boolean(selectedModality) ||
              Boolean(selectedModel) ||
              Boolean(selectedClient),
          });
        setInfo(data);
        setHasNextPage(nextPage);
        setPageCursors((prev) => {
          const next = requestedPage === 1 ? [] : [...prev];
          if (lastDoc) {
            next[requestedPage - 1] = lastDoc;
          }
          return next;
        });
      } catch (error) {
        console.error("Parent modal load failed:", error);
        setLoadError(error?.message || "Failed to load items.");
        setInfo([]);
      } finally {
        setIsLoading(false);
      }
    },
    [
      show,
      pageCursors,
      search,
      select,
      selectedOEM,
      selectedModality,
      selectedModel,
      selectedClient,
      matchesFilters,
    ]
  );

  useEffect(() => {
    if (!show) return;
    resetPagination();
    setQueryEpoch((v) => v + 1);
  }, [show, selectedOEM, selectedModality, selectedModel, selectedClient, search, select]);

  useEffect(() => {
    if (!show) return;
    fetchData(page);
  }, [show, page, queryEpoch, fetchData]);

  const rowSelect = (item) => {
    setSelectedParent({ id: item.id, name: item.name, pn: item.pn });
    handleClose();
  };

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

  const handleClientClick = async () => {
    const clientsData = await fetchClients(selectedOEM, selectedModality);
    setClients(clientsData);
    setClientSearchTerm("");
    setShowClientModal(true);
  };

  const handleClientSelect = (clientId) => {
    if (!clientId) {
      setClientButtonText("Select Option");
      setSelectedClient(null);
      setShowClientModal(false);
      return;
    }
    const client = clients.find((c) => c.id === clientId);
    setClientButtonText(client?.name || "Select Option");
    setSelectedClient(clientId);
    setShowClientModal(false);
  };

  const handleClientInfo = (clientId, clientName) => {
    console.log(`Client ID: ${clientId}, Client Name: ${clientName}`);
  };

  const handleClearClientSelection = () => {
    setClientButtonText("Select Option");
    setSelectedClient(null);
    setShowClientModal(false);
  };

  const handleModelClick = async () => {
    const modelsData = await fetchModels(
      selectedOEM,
      selectedModality,
      selectedClient
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

  const handleWarehouseClick = () => {
    setClientButtonText(CLIENT_WAREHOUSE);
    setSelectedClient(CLIENT_WAREHOUSE);
  };

  const handleUnassignedClick = () => {
    setClientButtonText(CLIENT_UNASSIGNED);
    setSelectedClient(CLIENT_UNASSIGNED);
  };

  const totalKnownPages = Math.max(
    1,
    pageCursors.filter(Boolean).length + (hasNextPage ? 1 : 0)
  );
  const pageButtons = (() => {
    const buttons = [];
    const maxVisible = 6;

    const pushPage = (p) =>
      buttons.push(
        <Pagination.Item
          key={`page-${p}`}
          active={p === page}
          onClick={() => setPage(p)}
        >
          {p}
        </Pagination.Item>
      );

    const pushEllipsis = (key) =>
      buttons.push(<Pagination.Ellipsis key={key} disabled />);

    if (totalKnownPages <= maxVisible) {
      for (let i = 1; i <= totalKnownPages; i += 1) pushPage(i);
      return buttons;
    }

    let start = Math.max(2, page - 1);
    let end = Math.min(totalKnownPages - 1, page + 1);
    const desiredWindow = maxVisible - 2;
    let currentWindow = end - start + 1;
    let remaining = desiredWindow - currentWindow;

    while (remaining > 0) {
      if (start > 2) {
        start -= 1;
        remaining -= 1;
      }
      if (remaining > 0 && end < totalKnownPages - 1) {
        end += 1;
        remaining -= 1;
      }
      if (start === 2 && end === totalKnownPages - 1) break;
    }

    pushPage(1);
    if (start > 2) pushEllipsis("start-ellipsis");
    for (let i = start; i <= end; i += 1) pushPage(i);
    if (end < totalKnownPages - 1) pushEllipsis("end-ellipsis");
    pushPage(totalKnownPages);
    if (hasNextPage) pushEllipsis("more-ellipsis");

    return buttons;
  })();

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="xl"
      centered
      dialogClassName={styles.modalDialog}
      contentClassName={styles.modalContent}
    >
      <Modal.Header closeButton className={styles.modalHeader}>
        <div>
          <div className={styles.modalTitle}>Select Parent</div>
          <div className={styles.modalSubtitle}>
            Search and choose a parent item for this part.
          </div>
        </div>
      </Modal.Header>
      <Modal.Body className={styles.modalBody}>
        <div className={styles.modalGrid}>
          <aside className={styles.filtersPanel}>
            <div className={styles.panelTitle}>Filters</div>
            <div className={styles.panelHint}>
              Narrow results with machine and client filters.
            </div>
            <InputGroup className={styles.inputGroup}>
              <InputGroup.Text>OEM</InputGroup.Text>
              <Dropdown onSelect={handleSelect1} className="w-100">
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
                  <Dropdown.Item eventKey="Toshiba">Toshiba</Dropdown.Item>
                  <Dropdown.Item eventKey="Siemens">Siemens</Dropdown.Item>
                  <Dropdown.Item eventKey="Philips">Philips</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </InputGroup>

            <InputGroup className={styles.inputGroup}>
              <InputGroup.Text>Modality</InputGroup.Text>
              <Dropdown onSelect={handleSelect2} className="w-100">
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

            <InputGroup className={styles.inputGroup}>
              <InputGroup.Text>Client</InputGroup.Text>
              <Button
                variant="outline-secondary"
                className="w-100"
                onClick={handleClientClick}
              >
                {clientButtonText}
              </Button>
            </InputGroup>

            <InputGroup className={styles.inputGroup}>
              <InputGroup.Text>Model</InputGroup.Text>
              <Button
                variant="outline-secondary"
                className="w-100"
                onClick={handleModelClick}
              >
                {modelButtonText}
              </Button>
            </InputGroup>

            <div className={styles.panelDivider}></div>
            <div className={styles.panelTitle}>Quick</div>
            <div className={styles.quickButtons}>
              <Button
                variant="outline-secondary"
                className={styles.quickButton}
                onClick={handleWarehouseClick}
              >
                Warehouse
              </Button>
              <Button
                variant="outline-secondary"
                className={styles.quickButton}
                onClick={handleUnassignedClick}
              >
                Unassigned
              </Button>
            </div>
          </aside>

          <section className={styles.resultsPanel}>
            <div className={styles.resultsHeader}>
              <div>
                <div className={styles.resultsTitle}>Results</div>
                <div className={styles.resultsSubtitle}>
                  {isLoading ? "Loading items" : `${info.length} items`}
                </div>
              </div>
              <Pagination size="sm" className={styles.pagination}>
                <Pagination.Prev
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                />
                {pageButtons}
                <Pagination.Next
                  onClick={() => setPage((p) => p + 1)}
                  disabled={!hasNextPage}
                />
              </Pagination>
            </div>

            <div className={styles.searchRow}>
              <FormControl
                type={showListSearch}
                placeholder="Search"
                className={styles.searchInput}
                aria-label="Search"
                value={search}
                onChange={searchChangeHandler}
              />
              <NavDropdown
                title={select}
                id="parent-search-dropdown"
                show={showList}
                onMouseEnter={() => setShowList(true)}
                onMouseLeave={() => setShowList(false)}
              >
                <NavDropdown.Item
                  onClick={() => {
                    setSelect("Name");
                    setShowListSearch("text");
                  }}
                >
                  Name
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => {
                    setSelect("Date");
                    setShowListSearch("date");
                  }}
                >
                  Date
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => {
                    setSelect("Work Order");
                    setShowListSearch("text");
                  }}
                >
                  Work Order
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => {
                    setSelect("Product Number");
                    setShowListSearch("text");
                  }}
                >
                  Product Number
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => {
                    setSelect("Serial Number");
                    setShowListSearch("text");
                  }}
                >
                  Serial Number
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => {
                    setSelect("Description");
                    setShowListSearch("text");
                  }}
                >
                  Description
                </NavDropdown.Item>
              </NavDropdown>
            </div>

            <div className={styles.tableWrap}>
              {isLoading ? (
                <div className={styles.loadingState}>
                  <img
                    src="/magmo-logo.png"
                    alt="Loading"
                    className={styles.loadingLogo}
                  />
                </div>
              ) : loadError ? (
                <div className={styles.errorState}>{loadError}</div>
              ) : (
                <Table striped bordered hover size="sm" className={styles.table}>
                  <thead className={styles.stickyHeader}>
                    <tr>
                      <th>Name</th>
                      <th>Date</th>
                      <th>Work Order</th>
                      <th>Product Number</th>
                      <th>Serial Number</th>
                      <th>Select</th>
                    </tr>
                  </thead>
                  <tbody>
                    {info.length === 0 && (
                      <tr>
                        <td colSpan={6} className={styles.emptyState}>
                          No items found.
                        </td>
                      </tr>
                    )}
                    {info.map((item) => (
                      <tr key={item.id}>
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
                            size="sm"
                            onClick={() => rowSelect(item)}
                          >
                            Select
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </div>
          </section>
        </div>
      </Modal.Body>
      <Modal.Footer className={styles.modalFooter}>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="warning"
          onClick={() => {
            setSelectedParent(null);
            handleClose();
          }}
        >
          Clear Selection
        </Button>
      </Modal.Footer>
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
              (client.name || "")
                .toLowerCase()
                .includes(clientSearchTerm.toLowerCase())
            )}
            disableInfo={true}
            onSelectClient={handleClientSelect}
            onInfoClick={handleClientInfo}
            clearSelection={handleClearClientSelection}
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
            clearSelection={handleClearModelSelection}
          />
        </Modal.Body>
      </Modal>
    </Modal>
  );
};

export default ParentModal;
