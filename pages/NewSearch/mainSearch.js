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
import { getCountFromServer } from "firebase/firestore";
import {
  fetchPartsWithMachineDataPage,
  fetchClients,
  fetchMachinesForClient,
  fetchModels,
} from "../../utils/fetchAssociations";
import { useAuth } from "../../context/AuthUserContext";
import LoggedIn from "../LoggedIn";
import ClientTable from "../../utils/ClientTable";
import ModelTable from "../../utils/ModelTable";
import PartTable from "../../utils/PartTable";
import styles from "../../styles/MainSearch.module.css";
import firebase from "../../context/Firebase";
import {
  buildNameTokens,
  buildWorkOrderTokens,
  getItemCreatedDate,
  getPartSearchScore,
  itemMatchesGeneralSearch,
  normalizeWorkOrderValue,
} from "../../utils/itemFormShared";
import WarehouseMapModal from "../../components/WarehouseMapModal";
import TrailerMapModal from "../../components/TrailerMapModal";
import WorkOrderAddModal from "../../components/WorkOrderAddModal";

// Predefined warehouse client IDs and display names
const SOCAL_CLIENT_ID = "AIS17182";
const NORCAL_CLIENT_ID = "AIS25097";
const UNASSIGNED_CLIENT_ID = "AIS00404";
const CLIENT_PLACEHOLDER = "Not selected";
const WAREHOUSE_CLIENT_LABELS = {
  [SOCAL_CLIENT_ID]: "Lake Forest",
  [NORCAL_CLIENT_ID]: "NorCal Warehouse",
  [UNASSIGNED_CLIENT_ID]: "Unassigned",
};
const DEFAULT_PAGE_SIZE = 25;
const LIST_ALL_BATCH_SIZE = 100;

function getClientDisplayName(clientId, fallback = CLIENT_PLACEHOLDER) {
  if (!clientId) return CLIENT_PLACEHOLDER;
  return WAREHOUSE_CLIENT_LABELS[clientId] || fallback || clientId;
}

function getResponsivePageSize(width) {
  if (width <= 640) return 8;
  if (width <= 991) return 12;
  if (width <= 1280) return 14;
  if (width <= 1600) return 16;
  return 20;
}


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
    <Link
      href={`/${route}`}
      className={`btn btn-${type} ${className || ""}`}
      disabled={isLoading}
      onClick={() => !isLoading && setLoading(true)}>

      {isLoading ? "Loading..." : name}

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

function getReferenceId(value) {
  if (!value) return null;
  if (typeof value === "string") return value;
  return value?.id || null;
}

function getItemMachineId(item, type) {
  if (type === "current") {
    return (
      item?.currentMachineId ??
      getReferenceId(item?.MachineCurrent) ??
      getReferenceId(item?.CurrentMachine) ??
      null
    );
  }

  return (
    item?.machineFromId ??
    getReferenceId(item?.MachineFrom) ??
    getReferenceId(item?.Machine) ??
    null
  );
}

const SEARCH_TYPE_MAP = {
  general: "General",
  name: "Name",
  date: "Date",
  "work order": "Work Order",
  workorder: "Work Order",
  "product number": "Product Number",
  productnumber: "Product Number",
  "serial number": "Serial Number",
  serialnumber: "Serial Number",
  description: "Description",
  sku: "SKU",
};

function normalizeSearchType(value) {
  const raw = String(value || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
  if (!raw) return "General";
  return SEARCH_TYPE_MAP[raw] || "General";
}

function buildSearchTerms(value) {
  if (!value) return [];
  return String(value)
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .map((term) => term.trim())
    .filter(Boolean);
}

function nameMatchesSearch(nameValue, searchValue) {
  const nameLower = String(nameValue || "").toLowerCase();
  const terms = buildSearchTerms(searchValue);
  if (!terms.length) return false;
  return terms.every((term) => nameLower.includes(term));
}

function createdDateMatchesRange(item, startDate, endDate) {
  const createdYMD = toYMD(getItemCreatedDate(item));
  if (!createdYMD || !startDate) return false;
  const rangeEnd = endDate || startDate;
  return createdYMD >= startDate && createdYMD <= rangeEnd;
}

function rankSearchResults(items, searchType, searchValue) {
  if (normalizeSearchType(searchType) !== "General" || !searchValue) {
    return items;
  }
  return [...items].sort(
    (a, b) =>
      getPartSearchScore(b, searchValue) - getPartSearchScore(a, searchValue)
  );
}


export default function MainSearch() {
  const { signOut, authUser } = useAuth();
  const canDeleteItems = authUser?.isAdmin === true;
  const [info, setInfo] = useState([]);
  const [backupInfo, setBackupInfo] = useState([]);
  const [augmentedInfo, setAugmentedInfo] = useState([]); // items with clientFromId/currentId added
  const [isLoading, setIsLoading] = useState(true);
  const [ids, setID] = useState([]);
  const [show, setShow] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [isListAll, setIsListAll] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [dItem, setDItem] = useState();
  const [select, setSelect] = useState("General");
  const [showList, setShowList] = useState(false);
  const [showListSearch, setShowListSearch] = useState("text");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [selectedOEM, setSelectedOEM] = useState(null);
  const [selectedModality, setSelectedModality] = useState(null);
  // Replace the old single client state with two sets:
  const [selectedClientFrom, setSelectedClientFrom] = useState(null);
  const [clientFromButtonText, setClientFromButtonText] = useState("Select Option");
  const [selectedClientCurrent, setSelectedClientCurrent] = useState(null);
  const [clientCurrentButtonText, setClientCurrentButtonText] =
    useState("Select Option");
  const [selectedMachineFrom, setSelectedMachineFrom] = useState(null);
  const [machineFromOptions, setMachineFromOptions] = useState([]);
  const [isLoadingMachineFrom, setIsLoadingMachineFrom] = useState(false);
  const [selectedCurrentMachine, setSelectedCurrentMachine] = useState(null);
  const [currentMachineOptions, setCurrentMachineOptions] = useState([]);
  const [isLoadingCurrentMachines, setIsLoadingCurrentMachines] =
    useState(false);

  const [clients, setClients] = useState([]);
  const [showClientModal, setShowClientModal] = useState(false);
  // This state tells the modal which client box is being updated: "from" or "current"
  const [clientSelectionType, setClientSelectionType] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [showTrailerMap, setShowTrailerMap] = useState(false);
  const [showWorkOrderAdd, setShowWorkOrderAdd] = useState(false);
  const [showMobileActions, setShowMobileActions] = useState(false);

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
  const [paginationWindow, setPaginationWindow] = useState(3);
  const [totalPageCount, setTotalPageCount] = useState(null);
  const [totalItemCount, setTotalItemCount] = useState(null);
  const [isPageSizeReady, setIsPageSizeReady] = useState(false);
  const visibleItemIdsRef = useRef(null);
  const fetchSeq = useRef(0);
  const previousPageSizeRef = useRef(DEFAULT_PAGE_SIZE);
  const slowQueryWarnRef = useRef({ key: "", at: 0 });
  const latestFetchDebugRef = useRef(null);
  const searchDropdownCloseTimer = useRef(null);
  const nameBackfillInFlight = useRef(false);
  const workOrderBackfillInFlight = useRef(false);
  const [queryEpoch, setQueryEpoch] = useState(0);
  const [loadError, setLoadError] = useState(null);

  const LOAD_TIMEOUT_MS = 30000;
  const LIST_ALL_TIMEOUT_MS = 120000;
  const openMap = () => setShowMap(true);
  const openTrailerMap = () => setShowTrailerMap(true);

  const clearSearchDropdownCloseTimer = () => {
    if (searchDropdownCloseTimer.current) {
      clearTimeout(searchDropdownCloseTimer.current);
      searchDropdownCloseTimer.current = null;
    }
  };

  const openSearchTypeDropdown = () => {
    clearSearchDropdownCloseTimer();
    setShowList(true);
  };

  const closeSearchTypeDropdownSoon = () => {
    clearSearchDropdownCloseTimer();
    searchDropdownCloseTimer.current = setTimeout(() => {
      setShowList(false);
      searchDropdownCloseTimer.current = null;
    }, 180);
  };

  useEffect(() => {
    return () => clearSearchDropdownCloseTimer();
  }, []);

  useEffect(() => {
    if (!router.isReady) return;
    if (router.query.showTrailerMap === "1") {
      setShowTrailerMap(true);
    }
  }, [router.isReady, router.query.showTrailerMap]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearch(search);
    }, 350);
    return () => clearTimeout(timerId);
  }, [search]);

  useEffect(() => {
    let cancelled = false;
    setSelectedMachineFrom(null);
    setMachineFromOptions([]);

    if (!selectedClientFrom) {
      setIsLoadingMachineFrom(false);
      return () => {
        cancelled = true;
      };
    }

    setIsLoadingMachineFrom(true);
    fetchMachinesForClient(selectedClientFrom)
      .then((machines) => {
        if (!cancelled) {
          setMachineFromOptions(Array.isArray(machines) ? machines : []);
        }
      })
      .catch((error) => {
        if (!cancelled) {
          console.error("Failed to load Machine From options", error);
          setMachineFromOptions([]);
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoadingMachineFrom(false);
      });

    return () => {
      cancelled = true;
    };
  }, [selectedClientFrom]);

  useEffect(() => {
    let cancelled = false;
    setSelectedCurrentMachine(null);
    setCurrentMachineOptions([]);

    if (!selectedClientCurrent) {
      setIsLoadingCurrentMachines(false);
      return () => {
        cancelled = true;
      };
    }

    setIsLoadingCurrentMachines(true);
    fetchMachinesForClient(selectedClientCurrent)
      .then((machines) => {
        if (!cancelled) {
          setCurrentMachineOptions(Array.isArray(machines) ? machines : []);
        }
      })
      .catch((error) => {
        if (!cancelled) {
          console.error("Failed to load Current Machine options", error);
          setCurrentMachineOptions([]);
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoadingCurrentMachines(false);
      });

    return () => {
      cancelled = true;
    };
  }, [selectedClientCurrent]);

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
    if (nameBackfillInFlight.current) return;
    if (
      typeof window === "undefined" ||
      window.localStorage.getItem("enableMainSearchBackfill") !== "1"
    ) {
      return;
    }
    if (typeof window !== "undefined") {
      const lastRun = window.localStorage.getItem("nameTokensBackfillAt");
      if (lastRun && Date.now() - Number(lastRun) < 24 * 60 * 60 * 1000) {
        return;
      }
    }

    nameBackfillInFlight.current = true;
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
      nameBackfillInFlight.current = false;
    }
  }, []);

  const startWorkOrderTokenBackfill = useCallback(async (reason = "") => {
    if (workOrderBackfillInFlight.current) return;
    if (
      typeof window === "undefined" ||
      window.localStorage.getItem("enableMainSearchBackfill") !== "1"
    ) {
      return;
    }
    if (typeof window !== "undefined") {
      const lastRun = window.localStorage.getItem("workOrderTokensBackfillAt");
      if (lastRun && Date.now() - Number(lastRun) < 24 * 60 * 60 * 1000) {
        return;
      }
    }

    workOrderBackfillInFlight.current = true;
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
          const workOrderTokens = buildWorkOrderTokens(data);
          const existingTokens = Array.isArray(data.workOrderTokens)
            ? Array.from(new Set(data.workOrderTokens.map((v) => String(v))))
            : [];

          if (!tokensEqual(existingTokens, workOrderTokens)) {
            batch.update(doc.ref, { workOrderTokens });
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
          "workOrderTokensBackfillAt",
          String(Date.now())
        );
      }
    } catch (error) {
      console.error("Work-order token backfill failed:", reason, error);
    } finally {
      workOrderBackfillInFlight.current = false;
    }
  }, []);

  const normalizedSelectedType = normalizeSearchType(select);
  const searchLower =
    normalizedSelectedType === "Date"
      ? dateStart
      : (debouncedSearch || "").toLowerCase().trim();
  const hasActiveFilters =
    Boolean(selectedOEM) ||
    Boolean(selectedModality) ||
    Boolean(selectedModel) ||
    Boolean(selectedClientFrom) ||
    Boolean(selectedClientCurrent) ||
    Boolean(selectedMachineFrom) ||
    Boolean(selectedCurrentMachine) ||
    Boolean(searchLower) ||
    Boolean(normalizedSelectedType === "Date" && dateEnd);
  const selectedClientFromDisplay = selectedClientFrom
    ? getClientDisplayName(selectedClientFrom, clientFromButtonText)
    : CLIENT_PLACEHOLDER;
  const selectedClientCurrentDisplay = selectedClientCurrent
    ? getClientDisplayName(selectedClientCurrent, clientCurrentButtonText)
    : CLIENT_PLACEHOLDER;

  const valueMatches = (value, s) => {
    if (!value) return false;
    if (Array.isArray(value)) {
      return value.some((v) => valueMatches(v, s));
    }
    return String(value).toLowerCase().includes(s);
  };

  const workOrderMatches = useCallback((value, searchValue) => {
    const normalizedSearch = normalizeWorkOrderValue(searchValue);
    if (!normalizedSearch) return false;
    const compactSearch = normalizedSearch.replace(/[^a-z0-9]+/g, "");

    const normalizedValue = normalizeWorkOrderValue(value);
    const compactValue = normalizedValue.replace(/[^a-z0-9]+/g, "");
    return (
      normalizedValue.includes(normalizedSearch) ||
      (Boolean(compactSearch) && compactValue.includes(compactSearch))
    );
  }, []);

  const itemMatchesFilters = useCallback(
    (item, overrides = {}) => {
      const activeSearchLower =
        overrides.searchLower != null ? overrides.searchLower : searchLower;
      const activeSelect = normalizeSearchType(overrides.select ?? select);
      const activeDateEnd =
        overrides.dateEnd != null ? overrides.dateEnd : dateEnd;

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
      if (
        selectedMachineFrom &&
        getItemMachineId(item, "from") !== selectedMachineFrom
      ) {
        return false;
      }
      if (
        selectedCurrentMachine &&
        getItemMachineId(item, "current") !== selectedCurrentMachine
      ) {
        return false;
      }

      // Search
      if (activeSearchLower) {
        if (activeSelect === "General") {
          return itemMatchesGeneralSearch(item, activeSearchLower);
        }
        if (activeSelect === "Name") {
          return nameMatchesSearch(item?.name, activeSearchLower);
        }
        if (activeSelect === "Date") {
          return createdDateMatchesRange(
            item,
            activeSearchLower,
            activeDateEnd
          );
        }
        if (activeSelect === "Work Order") {
          const workOrderValues = [
            item?.wo,
            item?.workOrder,
            ...(Array.isArray(item?.workOrders)
              ? item.workOrders.map((wo) => wo?.workOrder ?? wo)
              : []),
          ];
          return workOrderValues.some((value) =>
            workOrderMatches(value, activeSearchLower)
          );
        }
        if (activeSelect === "Product Number") {
          return valueMatches(item?.pn, activeSearchLower);
        }
        if (activeSelect === "Serial Number") {
          return valueMatches(item?.sn, activeSearchLower);
        }
        if (activeSelect === "Description") {
          if (valueMatches(item?.desc, activeSearchLower)) return true;
          if (valueMatches(item?.description, activeSearchLower)) return true;
          if (Array.isArray(item?.descriptions)) {
            return item.descriptions.some((d) =>
              valueMatches(d?.description, activeSearchLower)
            );
          }
          return false;
        }
        if (activeSelect === "SKU") {
          const skuDigits = String(activeSearchLower).replace(/\D/g, "");
          if (!skuDigits) return true;
          const wantedSku = `ais${skuDigits}`;
          return [item?.id, item?.localSN, item?.local_sn].some((value) =>
            String(value || "").toLowerCase().startsWith(wantedSku)
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
      selectedMachineFrom,
      selectedCurrentMachine,
      searchLower,
      select,
      dateEnd,
      workOrderMatches,
    ]
  );

  const matchesFilters = useCallback(
    (item) => itemMatchesFilters(item),
    [itemMatchesFilters]
  );

  const resetPagination = () => {
    setPage(1);
    setPageCursors([]);
    setHasNextPage(false);
    setTotalPageCount(null);
    setTotalItemCount(null);
    visibleItemIdsRef.current = null;
  };

  // Reset pagination on route/query change (prevents stale pages like “starting at 6”)
  useEffect(() => {
    resetPagination();
    if (page === 1) {
      setQueryEpoch((v) => v + 1);
    }
  }, [router.asPath]);

  // Reset and refetch when filters/search change
  useEffect(() => {
    resetPagination();
    if (page === 1) {
      setQueryEpoch((v) => v + 1);
    }
  }, [
    selectedOEM,
    selectedModality,
    selectedModel,
    selectedClientFrom,
    selectedClientCurrent,
    selectedMachineFrom,
    selectedCurrentMachine,
    debouncedSearch,
    dateStart,
    dateEnd,
    select,
  ]);

  useEffect(() => {
    const selectedType = normalizeSearchType(router.query.selectedType || select);
    if (selectedType === "Work Order") {
      startWorkOrderTokenBackfill("work-order-mode");
    }
  }, [router.query.selectedType, select, startWorkOrderTokenBackfill]);


  // Fetch data on component mount and route change
  useEffect(() => {
    if (!isPageSizeReady) return;
    fetchData(page);
  }, [isPageSizeReady, page, queryEpoch]);

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

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const updatePaginationWindow = () => {
      if (window.innerWidth <= 900) {
        setPaginationWindow(2);
      } else if (window.innerWidth <= 1200) {
        setPaginationWindow(3);
      } else {
        setPaginationWindow(3);
      }
    };
    updatePaginationWindow();
    window.addEventListener("resize", updatePaginationWindow);
    return () => window.removeEventListener("resize", updatePaginationWindow);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    let resizeTimer = null;

    const applyResponsivePageSize = () => {
      const nextPageSize = getResponsivePageSize(window.innerWidth);
      previousPageSizeRef.current = nextPageSize;
      setPageSize(nextPageSize);
      setIsPageSizeReady(true);
    };

    const handleResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const nextPageSize = getResponsivePageSize(window.innerWidth);
        setPageSize((current) =>
          current === nextPageSize ? current : nextPageSize
        );
      }, 180);
    };

    applyResponsivePageSize();
    window.addEventListener("resize", handleResize);
    return () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!isPageSizeReady) return;
    if (previousPageSizeRef.current === pageSize) return;

    previousPageSizeRef.current = pageSize;
    resetPagination();
    if (page === 1) {
      setQueryEpoch((value) => value + 1);
    }
  }, [isPageSizeReady, page, pageSize]);

  async function fetchData(requestedPage = 1) {
    const seq = ++fetchSeq.current;
    const requestStartedAt = Date.now();
    const requestTimeoutMs = isListAll
      ? LIST_ALL_TIMEOUT_MS
      : LOAD_TIMEOUT_MS;
    let timedOut = false;
    latestFetchDebugRef.current = null;
    setIsLoading(true);
    setLoadError(null);
    const timeoutId = setTimeout(() => {
      timedOut = true;
      if (seq === fetchSeq.current) {
        console.warn("[mainSearch][timeout]", {
          requestedPage,
          pageSize,
          selectedOEM,
          selectedModality,
          selectedModel,
          selectedClientFrom,
          selectedClientCurrent,
          selectedMachineFrom,
          selectedCurrentMachine,
          select,
          search: debouncedSearch,
          elapsedMs: Date.now() - requestStartedAt,
          lastDebugEvent: latestFetchDebugRef.current,
        });
        setLoadError({
          code: "timeout",
          message: `Loading is taking longer than ${Math.round(
            requestTimeoutMs / 1000
          )}s. This is likely due to very selective filters.`,
        });
        setIsLoading(false);
      }
    }, requestTimeoutMs);
    try {
      if (router.query.inputText && router.query.selectedType) {
        const routeSearchType = normalizeSearchType(router.query.selectedType);
        setSelect(routeSearchType);
        if (routeSearchType === "Date") {
          setDateStart(router.query.inputText);
        } else {
          setSearch(router.query.inputText);
        }
      }
      let startAfterDoc =
        requestedPage > 1 ? pageCursors[requestedPage - 2] : null;
      const effectiveSelect = normalizeSearchType(
        router.query.selectedType || select
      );
      const effectiveSearch =
        effectiveSelect === "Date"
          ? dateStart || router.query.inputText || ""
          : router.query.inputText || debouncedSearch;
      const effectiveSearchLower = (effectiveSearch || "")
        .toLowerCase()
        .trim();
      const effectiveDateEnd =
        effectiveSelect === "Date" ? dateEnd || effectiveSearchLower : "";
      const hasWorkOrderSearch =
        Boolean(effectiveSearchLower) && effectiveSelect === "Work Order";
      if (hasWorkOrderSearch) {
        startWorkOrderTokenBackfill("work-order-request");
      }
      const hasActiveFiltersForRequest =
        Boolean(selectedOEM) ||
        Boolean(selectedModality) ||
        Boolean(selectedModel) ||
        Boolean(selectedClientFrom) ||
        Boolean(selectedClientCurrent) ||
        Boolean(selectedMachineFrom) ||
        Boolean(selectedCurrentMachine) ||
        Boolean(effectiveSearchLower);
      const debugSearchFetch =
        requestedPage >= 3 ||
        Boolean(selectedClientFrom) ||
        Boolean(selectedClientCurrent) ||
        Boolean(selectedMachineFrom) ||
        Boolean(selectedCurrentMachine);
      let lastFetchDebugAt = 0;
      let lastFetchDebugAccepted = -1;
      const logFetchDebug = (event) => {
        if (!debugSearchFetch) return;
        const now = Date.now();
        latestFetchDebugRef.current = {
          ...event,
          requestedPage,
          pageSize,
          selectedClientFrom,
          selectedClientCurrent,
          selectedMachineFrom,
          selectedCurrentMachine,
          effectiveSelect,
          effectiveSearchLower,
          seenAtMs: now - requestStartedAt,
        };
        const acceptedChanged =
          Number(event?.acceptedCount || 0) !== lastFetchDebugAccepted;
        const isClientPhase =
          typeof event?.event === "string" &&
          (event.event.startsWith("client-") ||
            event.event.startsWith("machine-") ||
            event.event.startsWith("request:"));
        const shouldLog =
          event?.event === "batch:start"
            ? false
            : isClientPhase ||
              acceptedChanged ||
              now - lastFetchDebugAt > 5000 ||
              Number(event?.scannedBatches || 0) % 10 === 0;
        if (!shouldLog) return;
        lastFetchDebugAt = now;
        lastFetchDebugAccepted = Number(event?.acceptedCount || 0);
        console.warn("[mainSearch][fetch-debug]", {
          ...event,
          requestedPage,
          pageSize,
          selectedClientFrom,
          selectedClientCurrent,
          selectedMachineFrom,
          selectedCurrentMachine,
          effectiveSelect,
          effectiveSearchLower,
        });
      };

      // light retry for transient Firestore hiccups
      const load = async ({
        cursor = startAfterDoc,
        batchSize = pageSize,
        batchNumber = requestedPage,
        pageOffset = 0,
        attempt = 1,
      } = {}) => {
        try {
          return await fetchPartsWithMachineDataPage({
            pageSize: batchSize,
            pageOffset,
            startAfterDoc: cursor,
            visibleOnly: true,
            filterFn: hasActiveFiltersForRequest
              ? (item) =>
                  itemMatchesFilters(item, {
                    searchLower: effectiveSearchLower,
                    select: effectiveSelect,
                    dateEnd: effectiveDateEnd,
                  })
              : null,
            search: effectiveSearchLower
              ? {
                  type: effectiveSelect,
                  raw: effectiveSearch,
                  lower: effectiveSearchLower,
                  end: effectiveDateEnd,
                }
              : null,
            needsMachineData:
              Boolean(selectedOEM) ||
              Boolean(selectedModality) ||
              Boolean(selectedModel) ||
              Boolean(selectedClientFrom) ||
              Boolean(selectedClientCurrent) ||
              Boolean(selectedMachineFrom) ||
              Boolean(selectedCurrentMachine),
            selectedClientFrom,
            selectedClientCurrent,
            debugLabel: `mainSearch:p${batchNumber}:attempt${attempt}`,
            onDebug: logFetchDebug,
          });
        } catch (e) {
          if (attempt >= 3) throw e;
          await new Promise(r => setTimeout(r, 250 * Math.pow(2, attempt - 1)));
          return load({
            cursor,
            batchSize,
            batchNumber,
            pageOffset,
            attempt: attempt + 1,
          });
        }
      };

      let data = [];
      let lastDoc = null;
      let nextPage = false;
      let queryDebug = null;
      const canLoadFromCatalog =
        !hasActiveFiltersForRequest &&
        totalPageCount != null &&
        totalItemCount != null &&
        (visibleItemIdsRef.current != null ||
          requestedPage >=
            Math.max(1, totalPageCount - paginationWindow + 1));

      if (isListAll) {
        let cursor = null;
        let batchNumber = 1;
        let hasMore = true;
        const seenCursors = new Set();

        while (hasMore) {
          const result = await load({
            cursor,
            batchSize: LIST_ALL_BATCH_SIZE,
            batchNumber,
          });
          if (timedOut || seq !== fetchSeq.current) return;

          data.push(...result.parts);
          queryDebug = result.debug || queryDebug;
          lastDoc = result.lastDoc || null;
          hasMore = Boolean(result.hasNextPage && lastDoc);

          if (hasMore) {
            if (seenCursors.has(lastDoc.id)) {
              throw new Error("List All pagination did not advance.");
            }
            seenCursors.add(lastDoc.id);
            cursor = lastDoc;
            batchNumber += 1;
          }
        }
      } else if (canLoadFromCatalog && requestedPage > 1 && !startAfterDoc) {
        const db = firebase.firestore();
        let visibleIds = visibleItemIdsRef.current;

        if (!visibleIds) {
          const currentUser = firebase.auth().currentUser;
          const projectId = firebase.app().options.projectId;
          const collectedIds = [];
          try {
            const idToken = currentUser
              ? await currentUser.getIdToken()
              : null;
            let pageToken = "";

            if (!projectId || !idToken) {
              throw new Error("Authentication is not ready.");
            }

            do {
              const params = new URLSearchParams({
                pageSize: "1000",
                "mask.fieldPaths": "visible",
              });
              if (pageToken) params.set("pageToken", pageToken);

              const response = await fetch(
                `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(
                  projectId
                )}/databases/(default)/documents/Test?${params.toString()}`,
                {
                  headers: {
                    Authorization: `Bearer ${idToken}`,
                  },
                }
              );
              if (!response.ok) {
                throw new Error(
                  `Page catalog request failed with status ${response.status}.`
                );
              }

              const payload = await response.json();
              (payload.documents || []).forEach((document) => {
                const isHidden =
                  document.fields?.visible?.booleanValue === false;
                if (!isHidden && document.name) {
                  collectedIds.push(
                    decodeURIComponent(document.name.split("/").pop())
                  );
                }
              });
              pageToken = payload.nextPageToken || "";
            } while (pageToken);
          } catch (catalogError) {
            console.warn(
              "[mainSearch] Lightweight page catalog unavailable; using ascending Firestore scan.",
              catalogError
            );
            collectedIds.length = 0;
            let catalogCursor = null;
            const catalogBatchSize = 500;

            while (true) {
              let catalogQuery = db
                .collection("Test")
                .orderBy(firebase.firestore.FieldPath.documentId())
                .limit(catalogBatchSize);
              if (catalogCursor) {
                catalogQuery = catalogQuery.startAfter(catalogCursor);
              }
              const snapshot = await catalogQuery.get();
              snapshot.docs.forEach((document) => {
                if (document.data()?.visible !== false) {
                  collectedIds.push(document.id);
                }
              });
              if (snapshot.size < catalogBatchSize) break;
              catalogCursor = snapshot.docs[snapshot.docs.length - 1];
            }
          }

          visibleIds = collectedIds;
          visibleItemIdsRef.current = collectedIds;
        }

        const pageStart = (requestedPage - 1) * pageSize;
        const pageIds = visibleIds.slice(pageStart, pageStart + pageSize);
        const pageSnapshots = await Promise.all(
          pageIds.map((id) => db.collection("Test").doc(id).get())
        );
        data = pageSnapshots
          .filter((snapshot) => snapshot.exists)
          .map((snapshot) => ({
            id: snapshot.id,
            ...(snapshot.data() || {}),
          }));
        nextPage = requestedPage < totalPageCount;
      } else {
        const result =
          requestedPage > 1 && !startAfterDoc
            ? await load({
                cursor: null,
                pageOffset: (requestedPage - 1) * pageSize,
                batchNumber: requestedPage,
              })
            : await load();
        data = result.parts;
        lastDoc = result.lastDoc;
        nextPage = result.hasNextPage;
        queryDebug = result.debug || null;
      }

      if (timedOut || seq !== fetchSeq.current) return;
      const effectivePageSize = isListAll
        ? Math.max(data.length, LIST_ALL_BATCH_SIZE)
        : pageSize;
      const slowQueryDetected =
        queryDebug &&
        (queryDebug.elapsedMs > 2000 ||
          queryDebug.scannedDocs > effectivePageSize * 8 ||
          queryDebug.scannedBatches > 8);
      if (slowQueryDetected && hasWorkOrderSearch) {
        startWorkOrderTokenBackfill("work-order-slow-query");
      }
      if (slowQueryDetected) {
        const warnKey = [
          queryDebug.searchMode || "unknown",
          effectiveSelect,
          effectiveSearchLower || "",
          String(effectivePageSize),
          String(requestedPage),
        ].join("|");
        const now = Date.now();
        const lastWarn = slowQueryWarnRef.current;
        const shouldWarn =
          lastWarn.key !== warnKey || now - Number(lastWarn.at || 0) > 10000;
        if (shouldWarn) {
          console.warn("[mainSearch][slow-query]", {
            ...queryDebug,
            pageSize: effectivePageSize,
            requestedPage,
            effectiveSelect,
            hasActiveFilters: hasActiveFiltersForRequest,
          });
          if (Array.isArray(queryDebug.corruptDocs) && queryDebug.corruptDocs.length) {
            console.warn("[mainSearch][corrupt-docs]", queryDebug.corruptDocs);
          }
          slowQueryWarnRef.current = { key: warnKey, at: now };
        }
      }
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
      if (
        hasWorkOrderSearch &&
        (data.length === 0 ||
          data.some(
            (item) =>
              !Array.isArray(item?.workOrderTokens) ||
              item.workOrderTokens.length === 0
          ))
      ) {
        startWorkOrderTokenBackfill("work-order-search");
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
        setInfo([]);
        setAugmentedInfo([]);
        return;
      }
      setHasNextPage(isListAll ? false : nextPage);
      if (isListAll) {
        setPageCursors([]);
      } else {
        setPageCursors((prev) => {
          const next = requestedPage === 1 ? [] : [...prev];
          if (lastDoc) {
            next[requestedPage - 1] = lastDoc;
          }
          return next;
        });
      }
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
        machineFromId:
          item?.machineFromId ??
          getReferenceId(item?.MachineFrom) ??
          getReferenceId(item?.Machine) ??
          null,
        currentMachineId:
          item?.currentMachineId ??
          getReferenceId(item?.MachineCurrent) ??
          getReferenceId(item?.CurrentMachine) ??
          null,
      }));

      setAugmentedInfo(augmented);
      // default view = filtered (keeps pagination and filters consistent)
      setInfo(
        rankSearchResults(
          augmented.filter((item) =>
            itemMatchesFilters(item, {
              searchLower: effectiveSearchLower,
              select: effectiveSelect,
              dateEnd: effectiveDateEnd,
            })
          ),
          effectiveSelect,
          effectiveSearchLower
        )
      );
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

  useEffect(() => {
    if (!router.isReady || isListAll || !isPageSizeReady) return undefined;
    const hasActiveFilters =
      Boolean(selectedOEM) ||
      Boolean(selectedModality) ||
      Boolean(selectedModel) ||
      Boolean(selectedClientFrom) ||
      Boolean(selectedClientCurrent) ||
      Boolean(selectedMachineFrom) ||
      Boolean(selectedCurrentMachine) ||
      Boolean(debouncedSearch || router.query.inputText);

    if (hasActiveFilters) {
      setTotalPageCount(null);
      setTotalItemCount(null);
      return undefined;
    }

    let cancelled = false;
    const loadCount = async () => {
      const collectionRef = firebase.firestore().collection("Test");
      const [allSnapshot, hiddenSnapshot] = await Promise.all([
        getCountFromServer(collectionRef._delegate),
        getCountFromServer(
          collectionRef.where("visible", "==", false)._delegate
        ),
      ]);
      if (cancelled) return;
      const visibleCount = Math.max(
        0,
        Number(allSnapshot.data().count || 0) -
          Number(hiddenSnapshot.data().count || 0)
      );
      setTotalItemCount(visibleCount);
      setTotalPageCount(Math.max(1, Math.ceil(visibleCount / pageSize)));
    };

    loadCount().catch((error) => {
      if (!cancelled) {
        console.error("Failed to count inventory pages", error);
        setTotalPageCount(null);
        setTotalItemCount(null);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [
    debouncedSearch,
    dateStart,
    dateEnd,
    isListAll,
    isPageSizeReady,
    pageSize,
    router.isReady,
    router.query.inputText,
    selectedClientCurrent,
    selectedClientFrom,
    selectedCurrentMachine,
    selectedMachineFrom,
    selectedModality,
    selectedModel,
    selectedOEM,
  ]);

  const searchChangeHandler = (event) => {
    const nextValue =
      normalizeSearchType(select) === "SKU"
        ? event.target.value.replace(/\D/g, "").slice(0, 5)
        : event.target.value;
    setSearch(nextValue);
  };

  const handleSearchTypeSelect = (nextType) => {
    setSelect(nextType);
    setShowListSearch(nextType === "Date" ? "date" : "text");
    setShowList(false);
    setSearch("");
    if (nextType !== "Date") {
      setDateStart("");
      setDateEnd("");
    }
  };

  const toggleListAll = () => {
    setIsListAll((current) => !current);
    resetPagination();
    setQueryEpoch((value) => value + 1);
  };

  // Filter the currently loaded items (now consistent with paged filtering)
  useEffect(() => {
    const base = augmentedInfo || [];
    setInfo(
      rankSearchResults(
        base.filter(matchesFilters),
        select,
        searchLower
      )
    );
  }, [augmentedInfo, matchesFilters, searchLower, select]);

  function sortCheckAll(pos) {
    // Determine next direction: toggle the clicked column only
    const nextSortCheck = sortCheck.map((v, i) => (i === pos ? !v : v));
    const isDesc = nextSortCheck[pos]; // true means descending

    const sortedInfo = [...info].sort((a, b) => {
      const key = labelBaseNames[pos];

      if (pos === 1) {
        // DATE column
        const ta = toTime(getItemCreatedDate(a));
        const tb = toTime(getItemCreatedDate(b));

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
    if (!canDeleteItems) return;

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
    if (!canDeleteItems) return;

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
  const handleClientClick = async (type = "from") => {
    const nextSelectionType = type === "current" ? "current" : "from";
    setClientSelectionType(nextSelectionType);
    let safeClients = [];
    try {
      const clientsData = await fetchClients();
      safeClients = Array.isArray(clientsData) ? clientsData : [];
    } catch (e) {
      console.error("fetchClients failed:", e);
    }

    // Fallback to building from loaded items if API gave us nothing
    if (safeClients.length === 0) {
      try {
        const derived = await buildClientsFromItems(nextSelectionType);
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
        const displayName = getClientDisplayName(clientId, clientData.name);
        if (clientSelectionType === "from") {
          setClientFromButtonText(displayName);
          setSelectedClientFrom(clientId);
        } else if (clientSelectionType === "current") {
          setClientCurrentButtonText(displayName);
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
    setClientCurrentButtonText(getClientDisplayName(SOCAL_CLIENT_ID));
    setSelectedClientCurrent(SOCAL_CLIENT_ID);
    console.log("Warehouse button clicked: setting Client Current to", SOCAL_CLIENT_ID);
  };

  const handleNorCalWarehouseClick = () => {
    setClientCurrentButtonText(getClientDisplayName(NORCAL_CLIENT_ID));
    setSelectedClientCurrent(NORCAL_CLIENT_ID);
    console.log("Warehouse button clicked: setting Client Current to", NORCAL_CLIENT_ID);
  };

  const handleWarehouseUnassignedClick = () => {
    setClientCurrentButtonText(getClientDisplayName(UNASSIGNED_CLIENT_ID));
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

  const totalKnownPages =
    totalPageCount ??
    Math.max(
      1,
      pageCursors.filter(Boolean).length + (hasNextPage ? 1 : 0)
    );
  const pageButtons = (() => {
    const buttons = [];

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

    const edgeWindow = Math.max(2, paginationWindow);
    const maxWithoutEllipsis = edgeWindow + 2;

    if (totalKnownPages <= maxWithoutEllipsis) {
      for (let i = 1; i <= totalKnownPages; i += 1) pushPage(i);
      return buttons;
    }

    let visiblePages = [];
    if (page < edgeWindow) {
      visiblePages = Array.from(
        { length: edgeWindow },
        (_, index) => index + 1
      );
    } else if (page === edgeWindow) {
      visiblePages = Array.from(
        { length: Math.min(edgeWindow + 1, totalKnownPages - 1) },
        (_, index) => index + 1
      );
    } else if (page === totalKnownPages - edgeWindow + 1) {
      visiblePages = Array.from(
        { length: Math.min(edgeWindow + 1, totalKnownPages - 1) },
        (_, index) => totalKnownPages - edgeWindow + index
      );
    } else if (page > totalKnownPages - edgeWindow + 1) {
      visiblePages = Array.from(
        { length: edgeWindow },
        (_, index) => totalKnownPages - edgeWindow + index + 1
      );
    } else {
      const before = Math.floor((edgeWindow - 1) / 2);
      const start = page - before;
      visiblePages = Array.from(
        { length: edgeWindow },
        (_, index) => start + index
      );
    }

    const pageSet = new Set([1, ...visiblePages, totalKnownPages]);
    const orderedPages = Array.from(pageSet).sort((a, b) => a - b);
    orderedPages.forEach((pageNumber, index) => {
      const previousPage = orderedPages[index - 1];
      if (previousPage && pageNumber - previousPage > 1) {
        pushEllipsis(`ellipsis-${previousPage}-${pageNumber}`);
      }
      pushPage(pageNumber);
    });
    return buttons;
  })();

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
          <InputGroup.Text>Machine From</InputGroup.Text>
          <Form.Select
            aria-label="Filter by Machine From"
            className={styles.inputSelect}
            value={selectedMachineFrom || ""}
            disabled={!selectedClientFrom || isLoadingMachineFrom}
            onChange={(event) =>
              setSelectedMachineFrom(event.target.value || null)
            }
          >
            <option value="">
              {!selectedClientFrom
                ? "Select Client From first"
                : isLoadingMachineFrom
                  ? "Loading machines..."
                  : machineFromOptions.length
                    ? "Select Machine"
                    : "No machines for this client"}
            </option>
            {machineFromOptions.map((machine) => (
              <option key={machine.id} value={machine.id}>
                {machine.name || machine.id}
              </option>
            ))}
          </Form.Select>
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

        <InputGroup className={styles.inputGroup}>
          <InputGroup.Text>Current Machine</InputGroup.Text>
          <Form.Select
            aria-label="Filter by Current Machine"
            className={styles.inputSelect}
            value={selectedCurrentMachine || ""}
            disabled={!selectedClientCurrent || isLoadingCurrentMachines}
            onChange={(event) =>
              setSelectedCurrentMachine(event.target.value || null)
            }
          >
            <option value="">
              {!selectedClientCurrent
                ? "Select Client Current first"
                : isLoadingCurrentMachines
                  ? "Loading machines..."
                  : currentMachineOptions.length
                    ? "Select Machine"
                    : "No machines for this client"}
            </option>
            {currentMachineOptions.map((machine) => (
              <option key={machine.id} value={machine.id}>
                {machine.name || machine.id}
              </option>
            ))}
          </Form.Select>
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
              Lake Forest
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
              <Link
                href="/NewSearch/mainSearch"
                className={styles.brand}
                aria-label="Go to Main Search">

                <img
                  src="/magmo-logo.png"
                  alt="Magmo"
                  className={styles.brandLogo}
                />
                <div>
                  <div className={styles.brandName}>Magmo</div>
                  <div className={styles.brandSub}>Inventory Search</div>
                </div>

              </Link>
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
                  <Link
                    href="/NewSearch/mainSearch"
                    className={styles.mobileTableBrand}
                    aria-label="Go to Main Search">

                    <img
                      src="/magmo-logo.png"
                      alt="Magmo"
                      className={styles.mobileTableLogo}
                    />

                  </Link>
                  <div className={styles.clientSelectionSummary}>
                    <div className={styles.clientSelectionLabel}>Client From</div>
                    <div
                      className={`${styles.clientSelectionValue} ${
                        selectedClientFrom ? styles.clientSelectionActive : styles.clientSelectionEmpty
                      }`}
                      title={selectedClientFromDisplay}
                    >
                      {selectedClientFromDisplay}
                    </div>
                  </div>
                  <div
                    className={`${styles.clientSelectionSummary} ${styles.clientSelectionSummaryRight}`}
                  >
                    <div className={styles.clientSelectionLabel}>Current</div>
                    <div
                      className={`${styles.clientSelectionValue} ${
                        selectedClientCurrent ? styles.clientSelectionActive : styles.clientSelectionEmpty
                      }`}
                      title={selectedClientCurrentDisplay}
                    >
                      {selectedClientCurrentDisplay}
                    </div>
                  </div>
                  <button
                    type="button"
                    className={styles.mobileTableBurger}
                    onClick={() => setShowFilters(true)}
                    aria-label="Open filters"
                  >
                    <span></span>
                    <span></span>
                    <span></span>
                  </button>
                </div>

                <div className={styles.tableBody}>
                  {isLoading ? (
                    <div className={styles.loadingState}>
                      <img
                        src="/magmo-logo.png"
                        alt="Loading Magmo"
                        className={styles.loadingLogo}
                      />
                      <div className={styles.loadingText}>
                        {isListAll ? "Loading all items..." : "Loading"}
                      </div>
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
                      minRows={isListAll ? 0 : pageSize}
                      canDelete={canDeleteItems}
                      showPictures
                    />
                  )}
                </div>

                <div className={styles.tableFooter}>
                  <div className={styles.listControls}>
                    {!isListAll && (
                      <div className={styles.paginationRow}>
                        <Pagination size="sm">
                          <Pagination.Item
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            disabled={page <= 1}
                            aria-label="Previous page"
                            title="Previous page"
                            className={styles.paginationArrow}
                          >
                            <span className={styles.paginationChevron}>
                              {"\u2039"}
                            </span>
                            <span>Previous</span>
                          </Pagination.Item>
                          {pageButtons}
                          <Pagination.Item
                            onClick={() => setPage((p) => p + 1)}
                            disabled={
                              totalPageCount != null
                                ? page >= totalPageCount
                                : !hasNextPage
                            }
                            aria-label="Next page"
                            title="Next page"
                            className={styles.paginationArrow}
                          >
                            <span>Next</span>
                            <span className={styles.paginationChevron}>
                              {"\u203a"}
                            </span>
                          </Pagination.Item>
                        </Pagination>
                      </div>
                    )}
                    <Button
                      variant={isListAll ? "outline-secondary" : "outline-primary"}
                      size="sm"
                      className={styles.listAllButton}
                      onClick={toggleListAll}
                      disabled={isLoading}
                    >
                      {isListAll ? "Show Paged List" : "List All"}
                    </Button>
                  </div>
                  <Form className={styles.searchRow}>
                    {normalizedSelectedType === "Date" ? (
                      <div className={styles.dateSearchGroup}>
                        <FormControl
                          type="date"
                          className={styles.dateSearchInput}
                          aria-label="Created on or after"
                          value={dateStart}
                          max={dateEnd || undefined}
                          onChange={(event) => {
                            const nextStart = event.target.value;
                            setDateStart(nextStart);
                            if (dateEnd && nextStart > dateEnd) {
                              setDateEnd(nextStart);
                            }
                          }}
                        />
                        <span className={styles.dateRangeLabel}>to</span>
                        <FormControl
                          type="date"
                          className={styles.dateSearchInput}
                          aria-label="Created on or before"
                          value={dateEnd}
                          min={dateStart || undefined}
                          disabled={!dateStart}
                          onChange={(event) => setDateEnd(event.target.value)}
                        />
                      </div>
                    ) : normalizedSelectedType === "SKU" ? (
                      <InputGroup className={styles.skuSearchGroup}>
                        <InputGroup.Text className={styles.skuPrefix}>
                          AIS
                        </InputGroup.Text>
                        <FormControl
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          maxLength={5}
                          placeholder="12345"
                          className={styles.searchInput}
                          aria-label="SKU digits"
                          value={search}
                          onChange={searchChangeHandler}
                        />
                      </InputGroup>
                    ) : (
                      <FormControl
                        type={showListSearch}
                        placeholder="Search"
                        className={styles.searchInput}
                        aria-label={`${select} search`}
                        value={search}
                        onChange={searchChangeHandler}
                      />
                    )}
                    <NavDropdown
                      title={select}
                      id="collasible-nav-dropdown"
                      show={showList}
                      onMouseEnter={openSearchTypeDropdown}
                      onMouseLeave={closeSearchTypeDropdownSoon}
                      className={styles.searchSelect}
                    >
                      <NavDropdown.Item
                        onClick={() => handleSearchTypeSelect("General")}
                      >
                        General
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        onClick={() => handleSearchTypeSelect("Name")}
                      >
                        Name
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        onClick={() => handleSearchTypeSelect("Date")}
                      >
                        Created Date
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        onClick={() => handleSearchTypeSelect("Work Order")}
                      >
                        Work Order
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        onClick={() => handleSearchTypeSelect("Product Number")}
                      >
                        Product Number
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        onClick={() => handleSearchTypeSelect("Serial Number")}
                      >
                        Serial Number
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        onClick={() => handleSearchTypeSelect("Description")}
                      >
                        Description
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        onClick={() => handleSearchTypeSelect("SKU")}
                      >
                        SKU
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Form>
                  <div className={styles.mobileActionsRegion}>
                    <button
                      type="button"
                      className={styles.mobileActionsToggle}
                      onClick={() => setShowMobileActions((isOpen) => !isOpen)}
                      aria-expanded={showMobileActions}
                      aria-controls="mobile-footer-actions"
                      aria-label={
                        showMobileActions
                          ? "Hide navigation buttons"
                          : "Show navigation buttons"
                      }
                      title={
                        showMobileActions
                          ? "Hide navigation buttons"
                          : "Show navigation buttons"
                      }
                    >
                      <span
                        className={`${styles.mobileActionsChevron} ${
                          showMobileActions
                            ? styles.mobileActionsChevronOpen
                            : ""
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                    <div
                      id="mobile-footer-actions"
                      className={`${styles.mobileActionsPanel} ${
                        showMobileActions ? styles.mobileActionsPanelOpen : ""
                      }`}
                    >
                      <div className={styles.mobileActionsInner}>
                        <div className={styles.footerActions}>
                          <LoadingButton
                            type="secondary"
                            name="Add New Item"
                            route="NewSearch/AddItem/NewItem"
                            className={styles.actionButton}
                          />
                          <LoadingButton
                            type="info"
                            name="Scan"
                            route="Warehousedb/WarehouseScan"
                            className={`${styles.actionButton} ${styles.scanActionButton}`}
                          />
                          <Button
                            variant="success"
                            className={`${styles.actionButton} ${styles.workOrderAddActionButton}`}
                            onClick={() => setShowWorkOrderAdd(true)}
                          >
                            Work order add
                          </Button>
                          <Button
                            variant="info"
                            className={`${styles.actionButton} ${styles.trailerActionButton}`}
                            onClick={openTrailerMap}
                          >
                            Trailers
                          </Button>
                          <LoadingButton
                            type="info"
                            name="Tools"
                            route="NewSearch/Tools"
                            className={`${styles.actionButton} ${styles.toolsActionButton}`}
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

        <WorkOrderAddModal
          show={showWorkOrderAdd}
          onHide={() => setShowWorkOrderAdd(false)}
          onConfirmed={() => {
            resetPagination();
            setQueryEpoch((value) => value + 1);
          }}
        />
        <WarehouseMapModal
          show={showMap}
          onHide={() => setShowMap(false)}
          onView={handleMapView}
        />
        <TrailerMapModal
          show={showTrailerMap}
          onHide={() => setShowTrailerMap(false)}
        />
      </div>
    </LoggedIn>
  );


}
