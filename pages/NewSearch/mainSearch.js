import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  InputGroup,
  Dropdown,
  FormControl,
  Button,
  NavDropdown,
  Form,
  Modal,
  Pagination,
  Offcanvas,
} from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  fetchPartsWithMachineDataPage,
  fetchClients,
  fetchModels,
} from "../../utils/fetchAssociations";
import { useAuth } from "../../context/AuthUserContext";
import LoggedIn from "../LoggedIn";
import ClientTable from "../../utils/ClientTable";
import ModelTable from "../../utils/ModelTable";
import PartTable from "../../utils/PartTable";
import styles from "../../styles/MainSearch.module.css";
import firebase from "../../context/Firebase";
import { buildNameTokens } from "../../utils/itemFormShared";
import WarehouseMapModal from "../../components/WarehouseMapModal";

// Predefined warehouse client IDs and display names
const SOCAL_CLIENT_ID = "AIS17182";
const NORCAL_CLIENT_ID = "AIS25097";
const UNASSIGNED_CLIENT_ID = "AIS00404";
const DEFAULT_PAGE_SIZE = 25;


// Simulates a network request delay
function simulateNetworkRequest() {
  return new Promise((resolve) => setTimeout(resolve, 2000));
}

// Custom LoadingButton component
function LoadingButton({ type, name, route, className }) {
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      let cancelled = false;
      simulateNetworkRequest().then(() => {
        if (!cancelled) setLoading(false);
      });
      return () => {
        cancelled = true;
      };
    }
  }, [isLoading]);

  return (
    <Link href={`/${route}`}>
      <a
        className={`btn btn-${type} ${className || ""}`}
        disabled={isLoading}
        onClick={() => !isLoading && setLoading(true)}
      >
        {isLoading ? "Loading..." : name}
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

function normalizeText(value) {
  if (value == null) return "";
  return String(value).toLowerCase().trim();
}

function fieldMatchesSelection(value, selected) {
  if (!selected) return true;
  if (Array.isArray(value)) {
    return value.some((entry) => fieldMatchesSelection(entry, selected));
  }
  return normalizeText(value) === normalizeText(selected);
}

function getMachineField(item, key) {
  if (!item) return null;
  const lower = key.toLowerCase();
  return (
    item?.machineData?.[key] ??
    item?.machineData?.[lower] ??
    item?.currentMachineData?.[key] ??
    item?.currentMachineData?.[lower] ??
    item?.theMachineData?.[key] ??
    item?.theMachineData?.[lower] ??
    item?.TheMachine?.[key] ??
    item?.TheMachine?.[lower] ??
    null
  );
}


export default function MainSearch() {
  const { signOut } = useAuth();
  const [info, setInfo] = useState([]);
  const [backupInfo, setBackupInfo] = useState([]);
  const [augmentedInfo, setAugmentedInfo] = useState([]); // items with clientFromId/currentId added
  const [isLoading, setIsLoading] = useState(true);
  const [ids, setID] = useState([]);
  const [show, setShow] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [isNavigating, setIsNavigating] = useState(false);
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
  const [showMap, setShowMap] = useState(false);

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
  const [page, setPage] = useState(1);
  const [pageCursors, setPageCursors] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(false);
  const fetchSeq = useRef(0);
  const backfillInFlight = useRef(false);
  const [queryEpoch, setQueryEpoch] = useState(0);
  const [loadError, setLoadError] = useState(null);
  const tableBodyRef = useRef(null);
  const rowHeightRef = useRef(46);
  const headerHeightRef = useRef(38);

  const LOAD_TIMEOUT_MS = 30000;
  const openMap = () => setShowMap(true);

  const handleMapView = useCallback(
    (selection = {}) => {
      const params = new URLSearchParams();
      const {
        region,
        sectionLetter,
        sectionNumber,
        pallet,
        bin,
      } = selection;

      if (region) params.set("region", region);
      if (sectionLetter) params.set("sectionLetter", sectionLetter);
      if (sectionNumber) params.set("sectionNumber", sectionNumber);
      if (pallet) params.set("pallet", pallet);
      if (bin) params.set("bin", bin);

      const query = params.toString();
      router.push(
        `/NewSearch/inventory/inventoryManage${query ? `?${query}` : ""}`
      );
      setShowMap(false);
    },
    [router]
  );

  const startNameTokenBackfill = useCallback(async (reason = "") => {
    if (backfillInFlight.current) return;
    if (typeof window !== "undefined") {
      const lastRun = window.localStorage.getItem("nameTokensBackfillAt");
      if (lastRun && Date.now() - Number(lastRun) < 24 * 60 * 60 * 1000) {
        return;
      }
    }

    backfillInFlight.current = true;
    const db = firebase.firestore();
    let lastDoc = null;

    const tokensEqual = (a, b) => {
      if (a.length !== b.length) return false;
      const setA = new Set(a);
      const setB = new Set(b);
      if (setA.size !== setB.size) return false;
      for (const v of setA) if (!setB.has(v)) return false;
      return true;
    };

    try {
      while (true) {
        let query = db
          .collection("Test")
          .orderBy(firebase.firestore.FieldPath.documentId())
          .limit(200);
        if (lastDoc) query = query.startAfter(lastDoc);

        const snap = await query.get();
        if (snap.empty) break;

        const batch = db.batch();
        let writes = 0;

        snap.docs.forEach((doc) => {
          const data = doc.data() || {};
          const name = typeof data.name === "string" ? data.name : "";
          const nameLower = name.toLowerCase();
          const nameTokens = buildNameTokens(name);
          const existingTokens = Array.isArray(data.nameTokens)
            ? Array.from(new Set(data.nameTokens.map((v) => String(v))))
            : [];

          const needsUpdate =
            data.nameLower !== nameLower ||
            !tokensEqual(existingTokens, nameTokens);

          if (needsUpdate) {
            batch.update(doc.ref, { nameLower, nameTokens });
            writes += 1;
          }
        });

        if (writes > 0) {
          await batch.commit();
        }

        lastDoc = snap.docs[snap.docs.length - 1];
        await new Promise((resolve) => setTimeout(resolve, 25));
      }

      if (typeof window !== "undefined") {
        window.localStorage.setItem(
          "nameTokensBackfillAt",
          String(Date.now())
        );
      }
    } catch (error) {
      console.error("Name token backfill failed:", reason, error);
    } finally {
      backfillInFlight.current = false;
    }
  }, []);

  const searchLower = (search || "").toLowerCase().trim();
  const hasActiveFilters =
    Boolean(selectedOEM) ||
    Boolean(selectedModality) ||
    Boolean(selectedModel) ||
    Boolean(selectedClientFrom) ||
    Boolean(selectedClientCurrent) ||
    Boolean(searchLower);

  const valueMatches = (value, s) => {
    if (!value) return false;
    if (Array.isArray(value)) {
      return value.some((v) => valueMatches(v, s));
    }
    return String(value).toLowerCase().includes(s);
  };

  const matchesFilters = useCallback(
    (item) => {
      // hide explicitly hidden items
      if (item?.visible === false) return false;

      // OEM / Modality / Model filtering
      const OEM = getMachineField(item, "OEM");
      const Modality = getMachineField(item, "Modality");
      const Model = getMachineField(item, "Model");

      if (!fieldMatchesSelection(OEM, selectedOEM)) {
        return false;
      }
      if (
        !fieldMatchesSelection(Modality, selectedModality)
      ) {
        return false;
      }
      if (!fieldMatchesSelection(Model, selectedModel)) {
        return false;
      }

      // Client filters
      if (selectedClientFrom && item?.clientFromId !== selectedClientFrom) {
        return false;
      }
      if (
        selectedClientCurrent &&
        item?.clientCurrentId !== selectedClientCurrent
      ) {
        return false;
      }

      // Search
      if (searchLower) {
        if (select === "Name") {
          return valueMatches(item?.name, searchLower);
        }
        if (select === "Date") {
          const wantedDay = searchLower; // yyyy-mm-dd from input
          const itemYMD = toYMD(item?.date);
          if (itemYMD && itemYMD === wantedDay) return true;
          if (Array.isArray(item?.descriptions)) {
            if (item.descriptions.some((d) => toYMD(d?.date) === wantedDay)) {
              return true;
            }
          }
          if (Array.isArray(item?.workOrders)) {
            if (item.workOrders.some((w) => toYMD(w?.date) === wantedDay)) {
              return true;
            }
          }
          return false;
        }
        if (select === "Work Order") {
          return (
            Array.isArray(item?.workOrders) &&
            item.workOrders.some((wo) =>
              valueMatches(wo?.workOrder, searchLower)
            )
          );
        }
        if (select === "Product Number") {
          return valueMatches(item?.pn, searchLower);
        }
        if (select === "Serial Number") {
          return valueMatches(item?.sn, searchLower);
        }
        if (select === "Description") {
          if (valueMatches(item?.desc, searchLower)) return true;
          if (valueMatches(item?.description, searchLower)) return true;
          if (Array.isArray(item?.descriptions)) {
            return item.descriptions.some((d) =>
              valueMatches(d?.description, searchLower)
            );
          }
          return false;
        }
        if (select === "SKU") {
          return (
            valueMatches(item?.id, searchLower) ||
            valueMatches(item?.localSN, searchLower) ||
            valueMatches(item?.local_sn, searchLower)
          );
        }
      }

      return true;
    },
    [
      selectedOEM,
      selectedModality,
      selectedModel,
      selectedClientFrom,
      selectedClientCurrent,
      searchLower,
      select,
    ]
  );

  const resetPagination = () => {
    setPage(1);
    setPageCursors([]);
    setHasNextPage(false);
  };

  // Reset pagination on route/query change (prevents stale pages like “starting at 6”)
  useEffect(() => {
    resetPagination();
    setQueryEpoch((v) => v + 1);
  }, [router.asPath]);

  // Reset and refetch when filters/search change
  useEffect(() => {
    resetPagination();
    setQueryEpoch((v) => v + 1);
  }, [
    selectedOEM,
    selectedModality,
    selectedModel,
    selectedClientFrom,
    selectedClientCurrent,
    search,
    select,
  ]);


  // Fetch data on component mount and route change
  useEffect(() => {
    fetchData(page);
  }, [page, queryEpoch]);

  useEffect(() => {
    if (!router?.events) return;
    const handleDone = () => setIsNavigating(false);
    router.events.on("routeChangeComplete", handleDone);
    router.events.on("routeChangeError", handleDone);
    return () => {
      router.events.off("routeChangeComplete", handleDone);
      router.events.off("routeChangeError", handleDone);
    };
  }, [router]);

  async function fetchData(requestedPage = 1) {
    const seq = ++fetchSeq.current;
    let timedOut = false;
    setIsLoading(true);
    setLoadError(null);
    const timeoutId = setTimeout(() => {
      timedOut = true;
      if (seq === fetchSeq.current) {
        setLoadError({
          code: "timeout",
          message: `Loading is taking longer than ${Math.round(
            LOAD_TIMEOUT_MS / 1000
          )}s. This is likely due to very selective filters.`,
        });
        setIsLoading(false);
      }
    }, LOAD_TIMEOUT_MS);
    try {
      if (router.query.inputText && router.query.selectedType) {
        setSelect(router.query.selectedType);
        setSearch(router.query.inputText);
      }
      const startAfterDoc =
        requestedPage > 1 ? pageCursors[requestedPage - 2] : null;
      if (requestedPage > 1 && !startAfterDoc) {
        setPage(1);
        if (seq === fetchSeq.current) {
          clearTimeout(timeoutId);
          setIsLoading(false);
        }
        return;
      }
      const effectiveSelect = router.query.selectedType || select;
      const effectiveSearch = router.query.inputText || search;
      const effectiveSearchLower = (effectiveSearch || "")
        .toLowerCase()
        .trim();

      // light retry for transient Firestore hiccups
      const load = async (attempt = 1) => {
        try {
          return await fetchPartsWithMachineDataPage({
            pageSize,
            startAfterDoc,
            visibleOnly: true,
            filterFn: hasActiveFilters ? matchesFilters : null,
            search: effectiveSearchLower
              ? {
                  type: effectiveSelect,
                  raw: effectiveSearch,
                  lower: effectiveSearchLower,
                }
              : null,
            needsMachineData:
              Boolean(selectedOEM) ||
              Boolean(selectedModality) ||
              Boolean(selectedModel) ||
              Boolean(selectedClientFrom) ||
              Boolean(selectedClientCurrent),
          });
        } catch (e) {
          if (attempt >= 3) throw e;
          await new Promise(r => setTimeout(r, 250 * Math.pow(2, attempt - 1)));
          return load(attempt + 1);
        }
      };
      const { parts: data, lastDoc, hasNextPage: nextPage } = await load();
      if (timedOut || seq !== fetchSeq.current) return;
      const hasNameSearch =
        Boolean(effectiveSearchLower) && effectiveSelect === "Name";
      if (
        hasNameSearch &&
        (data.length === 0 ||
          data.some(
            (item) =>
              !Array.isArray(item?.nameTokens) || item.nameTokens.length === 0
          ))
      ) {
        startNameTokenBackfill("name-search");
      }
      if (requestedPage === 1 && data.length === 0) {
        setPageCursors([]);
        setHasNextPage(false);
      }
      setBackupInfo(data);
      setLabels(labelBase); // <-- add this line after setBackupInfo(data)
      setID(data.map((item) => item.id));
      if (requestedPage > 1 && data.length === 0) {
        setHasNextPage(false);
        setPage(1);
        return;
      }
      setHasNextPage(nextPage);
      setPageCursors((prev) => {
        const next = requestedPage === 1 ? [] : [...prev];
        if (lastDoc) {
          next[requestedPage - 1] = lastDoc;
        }
        return next;
      });
      setSelectedItems([]);

      // Normalize client ids for filtering
      const augmented = data.map((item) => ({
        ...item,
        clientFromId:
          item?.clientFromId ??
          (typeof item?.ClientFrom === "string" ? item.ClientFrom : null) ??
          item?.ClientFrom?.id ??
          null,
        clientCurrentId:
          item?.clientCurrentId ??
          (typeof item?.ClientCurrent === "string" ? item.ClientCurrent : null) ??
          item?.ClientCurrent?.id ??
          null,
      }));

      setAugmentedInfo(augmented);
      // default view = filtered (keeps pagination and filters consistent)
      setInfo(augmented.filter(matchesFilters));
    } catch (err) {
      if (seq !== fetchSeq.current) return;
      console.error("Error fetching data:", err);
      const code = err?.code || "unknown";
      setLoadError({
        code,
        message: err?.message || "Failed to load items.",
      });
      setInfo([]);
      setAugmentedInfo([]);
    } finally {
      clearTimeout(timeoutId);
      if (seq === fetchSeq.current && !timedOut) setIsLoading(false);
    }
  }

  const searchChangeHandler = (event) => setSearch(event.target.value);

  // Filter the currently loaded items (now consistent with paged filtering)
  useEffect(() => {
    const base = augmentedInfo || [];
    setInfo(base.filter(matchesFilters));
  }, [augmentedInfo, matchesFilters]);

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
      setIsNavigating(true);
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
      const OEM = getMachineField(item, "OEM");
      const Modality = getMachineField(item, "Modality");
      if (!fieldMatchesSelection(OEM, selectedOEM)) {
        return false;
      }
      if (
        !fieldMatchesSelection(Modality, selectedModality)
      ) {
        return false;
      }
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

  const totalKnownPages = Math.max(
    1,
    pageCursors.filter(Boolean).length + (hasNextPage ? 1 : 0)
  );
  const pageButtons = (() => {
    const buttons = [];
    const maxVisible = 7;

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

  const recalcPageSize = useCallback(() => {
    if (typeof window === "undefined") return;
    if (page !== 1) return;
    if (!tableBodyRef.current) return;
    const containerHeight =
      tableBodyRef.current.getBoundingClientRect().height || 0;
    if (!containerHeight) return;

    const headerRow =
      tableBodyRef.current.querySelector("table thead tr") ||
      tableBodyRef.current.querySelector("thead tr");
    const bodyRow =
      tableBodyRef.current.querySelector("table tbody tr") ||
      tableBodyRef.current.querySelector("tbody tr");

    if (headerRow) {
      const h = headerRow.getBoundingClientRect().height;
      if (h) headerHeightRef.current = h;
    }
    if (bodyRow) {
      const r = bodyRow.getBoundingClientRect().height;
      if (r) rowHeightRef.current = r;
    }

    const verticalPadding = 24;
    const available =
      containerHeight - headerHeightRef.current - verticalPadding;
    const estimated = Math.floor(available / rowHeightRef.current);
    const clamped = Math.max(5, Math.min(50, estimated));
    if (clamped > 0 && clamped !== pageSize) {
      setPageSize(clamped);
      resetPagination();
      setQueryEpoch((v) => v + 1);
    }
  }, [page, pageSize]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    recalcPageSize();
    const onResize = () => recalcPageSize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [recalcPageSize]);

  useEffect(() => {
    if (isLoading || page !== 1) return;
    recalcPageSize();
  }, [page, isLoading, recalcPageSize]);

  const renderFilters = (idPrefix) => (
    <div className={styles.filtersPanel}>
      <div className={styles.filtersHeader}>
        <div>
          <div className={styles.filtersTitle}>Filters</div>
          <div className={styles.filtersSubtitle}>
            Narrow results by machine, client, or warehouse.
          </div>
        </div>
        {hasActiveFilters ? (
          <span className={styles.filtersBadge}>Active</span>
        ) : null}
      </div>

      <div className={styles.filterSection}>
        <div className={styles.filterSectionTitle}>Machine</div>
        <InputGroup className={styles.inputGroup}>
          <InputGroup.Text>OEM</InputGroup.Text>
          <Dropdown onSelect={handleSelect1} className="w-100">
            <Dropdown.Toggle
              variant="outline-secondary"
              id={`${idPrefix}-oem`}
              className={`w-100 ${styles.inputButton}`}
            >
              {dropdown1Text}
            </Dropdown.Toggle>
            <Dropdown.Menu className="w-100">
              <Dropdown.Item eventKey="unassigned">Select Option</Dropdown.Item>
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
              id={`${idPrefix}-modality`}
              className={`w-100 ${styles.inputButton}`}
            >
              {dropdown2Text}
            </Dropdown.Toggle>
            <Dropdown.Menu className="w-100">
              <Dropdown.Item eventKey="unassigned">Select Option</Dropdown.Item>
              <Dropdown.Item eventKey="CT">CT</Dropdown.Item>
              <Dropdown.Item eventKey="MRI">MRI</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </InputGroup>

        <InputGroup className={styles.inputGroup}>
          <InputGroup.Text>Model</InputGroup.Text>
          <Button
            variant="outline-secondary"
            className={`w-100 ${styles.inputButton}`}
            onClick={handleModelClick}
          >
            {modelButtonText}
          </Button>
        </InputGroup>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.filterSectionTitle}>Client</div>
        <InputGroup className={styles.inputGroup}>
          <InputGroup.Text>Client From</InputGroup.Text>
          <Button
            variant="outline-secondary"
            className={`w-100 ${styles.inputButton}`}
            onClick={() => handleClientClick("from")}
          >
            {clientFromButtonText}
          </Button>
        </InputGroup>

        <InputGroup className={styles.inputGroup}>
          <InputGroup.Text>Client Current</InputGroup.Text>
          <Button
            variant="outline-secondary"
            className={`w-100 ${styles.inputButton}`}
            onClick={() => handleClientClick("current")}
          >
            {clientCurrentButtonText}
          </Button>
        </InputGroup>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.filterSectionTitle}>Warehouse</div>
        <InputGroup className={styles.inputGroup}>
          <InputGroup.Text>Quick</InputGroup.Text>
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
    </div>
  );


  return (
    <LoggedIn>
      {(isDeleting || isNavigating) && (
        <div className={styles.loadingOverlay}>
          <img
            src="/magmo-logo.png"
            alt="Loading Magmo"
            className={styles.loadingLogo}
          />
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

      <div className={styles.page}>
        <div className={styles.pageInner}>
          <header className={styles.header}>
            <div className={styles.headerLeft}>
              <button
                type="button"
                className={styles.burger}
                onClick={() => setShowFilters(true)}
                aria-label="Open filters"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
              <div className={styles.brand}>
                <img
                  src="/magmo-logo.png"
                  alt="Magmo"
                  className={styles.brandLogo}
                />
                <div>
                  <div className={styles.brandName}>Magmo</div>
                  <div className={styles.brandSub}>Inventory Search</div>
                </div>
              </div>
            </div>
            <div className={styles.headerRight}>
              <div className={styles.headerStatus}>
                {hasActiveFilters ? "Filters active" : "All items"}
              </div>
            </div>
          </header>

          <div className={styles.content}>
            <aside className={styles.sidebar}>{renderFilters("sidebar")}</aside>
            <main className={styles.main}>
              <div className={styles.tableCard}>
                <div className={styles.tableHeader}>
                  <div>
                    <div className={styles.tableTitle}>Items</div>
                    <div className={styles.tableSubtitle}>
                      {isLoading ? "Loading items" : `${info.length} items on this page`}
                    </div>
                  </div>
                  <div className={styles.tableMeta}>
                    Page {page} {hasNextPage ? `of ${totalKnownPages}+` : `of ${totalKnownPages}`}
                  </div>
                </div>

                <div className={styles.tableBody} ref={tableBodyRef}>
                  {isLoading ? (
                    <div className={styles.loadingState}>
                      <img
                        src="/magmo-logo.png"
                        alt="Loading Magmo"
                        className={styles.loadingLogo}
                      />
                      <div className={styles.loadingText}>Loading</div>
                    </div>
                  ) : loadError ? (
                    <div className={styles.errorState}>
                      <div className={styles.errorTitle}>
                        Load failed ({loadError.code})
                      </div>
                      <div className={styles.errorMessage}>{loadError.message}</div>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => {
                          resetPagination();
                          setQueryEpoch((v) => v + 1);
                        }}
                      >
                        Retry
                      </Button>
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
                      minRows={pageSize}
                    />
                  )}
                </div>

                <div className={styles.tableFooter}>
                  <div className={styles.paginationRow}>
                    <Pagination size="sm">
                      <Pagination.Prev
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page <= 1}
                      >
                        Previous
                      </Pagination.Prev>
                      {pageButtons}
                      <Pagination.Next
                        onClick={() => setPage((p) => p + 1)}
                        disabled={!hasNextPage}
                      >
                        Next
                      </Pagination.Next>
                    </Pagination>
                  </div>
                  <Form className={styles.searchRow}>
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
                      id="collasible-nav-dropdown"
                      show={showList}
                      onMouseEnter={() => setShowList(true)}
                      onMouseLeave={() => setShowList(false)}
                      className={styles.searchSelect}
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
                  <div className={styles.footerActions}>
                    <LoadingButton
                      type="secondary"
                      name="Add New Item"
                      route="NewSearch/AddItem/NewItem"
                      className={styles.actionButton}
                    />
                    <Button
                      variant="info"
                      className={`${styles.actionButton} ${styles.mapActionButton}`}
                      onClick={openMap}
                    >
                      Map
                    </Button>
                    <LoadingButton
                      type="primary"
                      name="Back"
                      route="Warehousedb/WarehouseSelect"
                      className={styles.actionButton}
                    />
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>

        <Offcanvas
          show={showFilters}
          onHide={() => setShowFilters(false)}
          placement="start"
          className={styles.filtersDrawer}
          scroll
          backdrop
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Filters</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>{renderFilters("drawer")}</Offcanvas.Body>
        </Offcanvas>

        <WarehouseMapModal
          show={showMap}
          onHide={() => setShowMap(false)}
          onView={handleMapView}
        />
      </div>
    </LoggedIn>
  );


}

