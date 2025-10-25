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

// ---- DATE HELPERS (top-level scope) ----

// Convert anything date-ish into a timestamp (ms since epoch).
function toTime(value) {
  if (!value) return null;

  // Firestore Timestamp { seconds, nanoseconds }
  if (typeof value === "object" && value !== null && value.seconds != null) {
    try { return value.seconds * 1000; } catch { /* ignore */ }
  }

  // Native Date
  if (value instanceof Date) {
    const t = value.getTime();
    return isNaN(t) ? null : t;
  }

  // Strings
  if (typeof value === "string") {
    // ISO / yyyy-mm-dd
    const iso = Date.parse(value);
    if (!isNaN(iso)) return iso;

    // mm/dd/yyyy
    const parts = value.split("/");
    if (parts.length === 3) {
      const [mm, dd, yyyy] = parts;
      const alt = Date.parse(`${yyyy}-${mm}-${dd}`);
      if (!isNaN(alt)) return alt;
    }
  }

  // Last resort
  const t = Date.parse(value);
  return isNaN(t) ? null : t;
}

// Canonicalize to 'yyyy-mm-dd' (matches <input type="date">)
function toYMD(value) {
  const t = toTime(value);
  if (t == null) return null;
  const d = new Date(t);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}


export default function MainSearch() {
  const { signOut } = useAuth();
  const [info, setInfo] = useState([]);
  const [backupInfo, setBackupInfo] = useState([]);
  const [augmentedInfo, setAugmentedInfo] = useState([]); // items with clientFromId/currentId added
  const [isLoading, setIsLoading] = useState(true);
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

  function withSortIcon(baseLabels, activeIndex, isDesc) {
    return baseLabels.map((text, i) => {
      if (i !== activeIndex) return text; // untouched
      const arrow = isDesc ? " ▼" : " ▲";
      return `${text}${arrow}`;
    });
  }


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
    setIsLoading(true);
    try {
      if (router.query.inputText && router.query.selectedType) {
        setSelect(router.query.selectedType);
        setSearch(router.query.inputText);
      }
      // light retry for transient Firestore hiccups
      const load = async (attempt = 1) => {
        try {
          return await fetchPartsWithMachineData();
        } catch (e) {
          if (attempt >= 3) throw e;
          await new Promise(r => setTimeout(r, 250 * Math.pow(2, attempt - 1)));
          return load(attempt + 1);
        }
      };
      const data = await load();
      setBackupInfo(data);
      setLabels(labelBase); // <-- add this line after setBackupInfo(data)
      setID(data.map((item) => item.id));

      // --- Pre-augment: resolve client ids of Machine / CurrentMachine once ---
      const db = firebase.firestore();
      const machineIds = [];
      const curMachineIds = [];
      const theMachineIds = []; // <-- ADD

      for (const item of data) {
        if (item?.Machine?.id) machineIds.push(item.Machine.id);
        if (item?.CurrentMachine?.id) curMachineIds.push(item.CurrentMachine.id);
        if (item?.TheMachine?.id) theMachineIds.push(item.TheMachine.id); // <-- ADD
      }
      const uniq = (arr) => [...new Set(arr)];
      const mIds = uniq(machineIds);
      const cIds = uniq(curMachineIds);

      const fetchMachineClients = async (ids) => {
        if (!ids.length) return {};
        const out = {};
        // Firestore "in" supports up to 10 document IDs per query
        const chunks = [];
        for (let i = 0; i < ids.length; i += 10) chunks.push(ids.slice(i, i + 10));
        for (const chunk of chunks) {
          const snap = await db
            .collection("Machine")
            .where(firebase.firestore.FieldPath.documentId(), "in", chunk)
            .get();
          snap.forEach((doc) => {
            const md = doc.data() || {};
            out[doc.id] = md.client?.id || null;
          });
        }
        return out;
      };

      // Fetch full machine docs (OEM/Modality/Model/Client/etc.) for a set of ids
      const fetchMachinesData = async (ids) => {
        if (!ids.length) return {};
        const out = {};
        const chunks = [];
        for (let i = 0; i < ids.length; i += 10) chunks.push(ids.slice(i, i + 10));
        for (const chunk of chunks) {
          const snap = await db
            .collection("Machine")
            .where(firebase.firestore.FieldPath.documentId(), "in", chunk)
            .get();
          snap.forEach((doc) => {
            out[doc.id] = { id: doc.id, ...(doc.data() || {}) };
          });
        }
        return out;
      };


      const [fromMap, curMap, theMap] = await Promise.all([
        fetchMachineClients(mIds),
        fetchMachineClients(cIds),
        fetchMachinesData(uniq(theMachineIds)), // <-- now captured as theMap
      ]);

      // New-style only: take client ids straight from item refs
      const augmented = data.map((item) => ({
        ...item,
        clientFromId: item?.ClientFrom?.id ?? null,
        clientCurrentId: item?.ClientCurrent?.id ?? null,
      }));

      setAugmentedInfo(augmented);
      // default view = everything not explicitly hidden
      setInfo(augmented.filter((it) => it.visible !== false));
    } catch (err) {
      console.error("Error fetching data:", err);
      setInfo([]);
      setAugmentedInfo([]);
    } finally {
      setIsLoading(false);
    }
  }

  const searchChangeHandler = (event) => setSearch(event.target.value);

  // Asynchronous filter function that loops through backupInfo and,
  // for each item, fetches its Machine and CurrentMachine documents,
  // then compares the client id (from machineData.client.id) to the selected client.
  useEffect(() => {
    function filterParts() {
      const base = augmentedInfo; // already has clientFromId/clientCurrentId
      const noFilters =
        !selectedOEM &&
        !selectedModality &&
        !selectedModel &&
        !selectedClientFrom &&
        !selectedClientCurrent &&
        !search;
      if (noFilters) {
        setInfo(base.filter((it) => it.visible !== false));
        return;
      }

      const filtered = base.filter((item) => {
        // only hide when explicitly false
        if (item.visible === false) return false;

        // OEM/modality/model via machineData (you already put this in items)
        // OEM / Modality / Model filtering
        // Prefer machineData; fall back to theMachineData; finally try inline TheMachine if it has plain fields
        const OEM = item?.machineData?.OEM
          ?? item?.theMachineData?.OEM
          ?? item?.TheMachine?.OEM;
        const Modality = item?.machineData?.Modality
          ?? item?.theMachineData?.Modality
          ?? item?.TheMachine?.Modality;
        const Model = item?.machineData?.Model
          ?? item?.theMachineData?.Model
          ?? item?.TheMachine?.Model;

        if (selectedOEM && OEM !== selectedOEM) return false;
        if (selectedModality && Modality !== selectedModality) return false;
        if (selectedModel && Model !== selectedModel) return false;


        // Client filters (now instant)
        if (selectedClientFrom && item.clientFromId !== selectedClientFrom) return false;
        if (selectedClientCurrent && item.clientCurrentId !== selectedClientCurrent) return false;

        // Search
        if (search) {
          const s = String(search).toLowerCase();
          if (select === "Name") {
            return (item.name || "").toLowerCase().includes(s);
          }
          if (select === "Date") {
            // If user hasn't picked a date yet, don't hide anything
            if (!search) return true;

            const wantedDay = search; // already 'yyyy-mm-dd' from <input type="date">

            // 1) Match item.date, regardless of its format or type
            const itemYMD = toYMD(item.date);
            if (itemYMD && itemYMD === wantedDay) return true;

            // 2) Also check any description dates (if you store dates there)
            if (Array.isArray(item.descriptions)) {
              const hitDesc = item.descriptions.some((d) => toYMD(d?.date) === wantedDay);
              if (hitDesc) return true;
            }

            // 3) And work order dates (if present)
            if (Array.isArray(item.workOrders)) {
              const hitWO = item.workOrders.some((w) => toYMD(w?.date) === wantedDay);
              if (hitWO) return true;
            }

            return false;
          }

          if (select === "Work Order") {
            return Array.isArray(item.workOrders) &&
              item.workOrders.some((wo) => String(wo.workOrder || "").toLowerCase().includes(s));
          }
          if (select === "Product Number") {
            return String(item.pn || "").toLowerCase().includes(s);
          }
          if (select === "Description") {
            return String(item.desc || "").toLowerCase().includes(s);
          }
          if (select === "SKU") {
            return String(item.id || "").toLowerCase().includes(s);
          }
        }
        return true;
      });
      setInfo(filtered);
    }
    filterParts();
  }, [selectedOEM, selectedModality, selectedClientFrom, selectedClientCurrent, selectedModel, search, select, augmentedInfo]);

  function sortCheckAll(pos) {
    // Determine next direction: toggle the clicked column only
    const nextSortCheck = sortCheck.map((v, i) => (i === pos ? !v : v));
    const isDesc = nextSortCheck[pos]; // true means descending

    const sortedInfo = [...info].sort((a, b) => {
      const key = labelBaseNames[pos];

      if (pos === 1) {
        // DATE column
        const ta = toTime(a[key]);
        const tb = toTime(b[key]);

        // Put missing dates at the end for ascending, at the start for descending
        if (ta === null && tb === null) return 0;
        if (ta === null) return isDesc ? -1 : 1;
        if (tb === null) return isDesc ? 1 : -1;

        return isDesc ? (tb - ta) : (ta - tb);
      }

      // NAME or SKU (string-y columns): indexes 0 or 5 in your original logic
      if (pos === 0 || pos === 5) {
        const av = (a[key] ?? "").toString();
        const bv = (b[key] ?? "").toString();
        return isDesc ? bv.localeCompare(av) : av.localeCompare(bv);
      }

      // Numeric-ish columns (wo, pn, sn) — fall back to string compare if NaN
      const an = Number(a[key]);
      const bn = Number(b[key]);

      if (!isNaN(an) && !isNaN(bn)) {
        return isDesc ? (bn - an) : (an - bn);
      } else {
        const av = (a[key] ?? "").toString();
        const bv = (b[key] ?? "").toString();
        return isDesc ? bv.localeCompare(av) : av.localeCompare(bv);
      }
    });

    setInfo(sortedInfo);
    setSortCheck(nextSortCheck);

    // Update header labels to show the little arrow on the active column
    setLabels(withSortIcon(labelBase, pos, isDesc));
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
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };


  // setSelectedItems((prev) => {
  //   const newSelection = prev.includes(id)
  //     ? prev.filter((itemId) => itemId !== id)
  //     : [...prev, id];
  //   console.log("Selected items:", newSelection);
  //   return newSelection; // <- important
  // });

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
          await db.collection("Test").doc(itemId).delete();
        } catch (err) {
          console.error(`Error deleting document ${itemId} from Test:`, err);
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

  // Build a unique list of clients from the items currently loaded, filtered by OEM/Modality.
  // `type` is "from" or "current" to decide which client ref to read.
  async function buildClientsFromItems(type) {
    const db = firebase.firestore();
    const ids = new Set();

    // Respect current OEM / Modality filters when deriving client options
    const filtered = augmentedInfo.filter((item) => {
      const OEM = item?.machineData?.OEM ?? item?.OEM ?? null;
      const Modality = item?.machineData?.Modality ?? item?.Modality ?? null;
      if (selectedOEM && OEM !== selectedOEM) return false;
      if (selectedModality && Modality !== selectedModality) return false;
      return true;
    });

    for (const it of filtered) {
      const id = type === "from" ? it.clientFromId : it.clientCurrentId;
      if (id) ids.add(id);
    }

    const out = [];
    const idArray = [...ids];
    for (let i = 0; i < idArray.length; i += 10) {
      const chunk = idArray.slice(i, i + 10);
      const snap = await db
        .collection("Client")
        .where(firebase.firestore.FieldPath.documentId(), "in", chunk)
        .get();
      snap.forEach((doc) => {
        const d = doc.data() || {};
        out.push({ id: doc.id, name: d.name || doc.id });
      });
    }

    // sort by name for nicer UX
    out.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    return out;
  }


  // --------------------
  // CLIENT SELECTION HANDLING
  // --------------------
  // This function fetches clients and opens the client modal.
  const handleClientClick = async () => {
    let safeClients = [];
    try {
      const clientsData = await fetchClients(selectedOEM, selectedModality);
      safeClients = Array.isArray(clientsData) ? clientsData : [];
    } catch (e) {
      console.error("fetchClients failed:", e);
    }

    // Fallback to building from loaded items if API gave us nothing
    if (safeClients.length === 0) {
      try {
        if (!clientSelectionType) {
          // if somehow not set yet, default to "from"
          setClientSelectionType("from");
        }
        const derived = await buildClientsFromItems(clientSelectionType || "from");
        safeClients = derived;
      } catch (e) {
        console.error("Fallback buildClientsFromItems failed:", e);
        safeClients = [];
      }
    }

    setClients(safeClients);
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

  //   // Safely convert any date-ish value into a comparable timestamp (ms since epoch).
  // function toTime(value) {
  //   if (!value) return null;

  //   // Firestore Timestamp: { seconds, nanoseconds }
  //   if (typeof value === "object" && value.seconds) {
  //     try {
  //       return value.seconds * 1000;
  //     } catch { /* fallthrough */ }
  //   }

  //   // If already a Date
  //   if (value instanceof Date) return isNaN(value.getTime()) ? null : value.getTime();

  //   // If string: try ISO first
  //   if (typeof value === "string") {
  //     // yyyy-mm-dd (from your form inputs)
  //     const iso = Date.parse(value);
  //     if (!isNaN(iso)) return iso;

  //     // mm/dd/yyyy fallback (older items)
  //     const parts = value.split("/");
  //     if (parts.length === 3) {
  //       const [mm, dd, yyyy] = parts;
  //       const alt = Date.parse(`${yyyy}-${mm}-${dd}`);
  //       if (!isNaN(alt)) return alt;
  //     }
  //   }

  //   // Canonicalize any date-ish value to 'yyyy-mm-dd' so it matches <input type="date"> values
  //   function toYMD(value) {
  //     const t = toTime(value);
  //     if (t == null) return null;
  //     const d = new Date(t);
  //     const yyyy = d.getFullYear();
  //     const mm = String(d.getMonth() + 1).padStart(2, "0");
  //     const dd = String(d.getDate()).padStart(2, "0");
  //     return `${yyyy}-${mm}-${dd}`;
  //   }


  //   // Last resort
  //   const t = Date.parse(value);
  //   return isNaN(t) ? null : t;
  // }


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
            clients={(Array.isArray(clients) ? clients : []).filter(
              (client) => (client?.name ?? "").toLowerCase().includes(clientSearchTerm.toLowerCase())
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
                        onClick={() => handleClientClick("from")}

                      >
                        {clientFromButtonText}
                      </Button>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroup.Text>Client Current</InputGroup.Text>
                      <Button
                        variant="outline-secondary"
                        className="w-100"
                        onClick={() => handleClientClick("current")}

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
                    {isLoading ? (
                      <div className="d-flex justify-content-center align-items-center p-5">
                        <img
                          src="/magmo-logo.png" // make sure it's in /public
                          alt="Loading Magmo"
                          style={{
                            width: 64,
                            height: 64,
                            animation: "magmo-spin 1s linear infinite",
                            transformOrigin: "50% 50%",
                            display: "block",
                          }}
                        />

                        {/* global so styled-jsx doesn't hash the name */}
                        <style jsx global>{`
      @keyframes magmo-spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
    `}</style>
                      </div>
                    ) : (
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
                        selectedItems={selectedItems}
                        setSelectedItems={setSelectedItems}
                      />
                    )}


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

