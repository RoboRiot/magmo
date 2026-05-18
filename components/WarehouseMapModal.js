import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Modal, Button } from "react-bootstrap";
import firebase from "../context/Firebase";
import styles from "./WarehouseMapModal.module.css";

const REGION_ORDER = ["E", "F", "G", "H", "I", "A", "D", "C", "B"];
const NO_PALLET = "NoPallet";
const LETTERS = Array.from({ length: 26 }, (_, i) =>
  String.fromCharCode(65 + i)
);
const NUMBERS = Array.from({ length: 50 }, (_, i) => i + 1);

function normalizeLocation(loc = {}) {
  let row = "";
  let col = "";

  if (loc?.section && typeof loc.section === "object") {
    if (loc.section.letter !== undefined && loc.section.letter !== null) {
      row = String(loc.section.letter).trim().toUpperCase();
    }
    if (loc.section.number !== undefined && loc.section.number !== null) {
      col = String(loc.section.number).trim();
    }
  } else if (typeof loc?.section === "string") {
    const trimmed = loc.section.trim();
    row = trimmed.slice(0, 1).toUpperCase();
    col = trimmed.slice(1).trim();
  }

  const pallet =
    loc?.pallet !== undefined && loc?.pallet !== null
      ? String(loc.pallet).trim()
      : "";
  const bin =
    loc?.bin !== undefined && loc?.bin !== null ? String(loc.bin).trim() : "";

  return { row, col, pallet, bin };
}

function formatSimpleField(value) {
  if (Array.isArray(value)) {
    const normalized = value
      .map((entry) => String(entry ?? "").trim())
      .filter(Boolean);
    return normalized.length ? normalized.join(", ") : "-";
  }
  if (value === undefined || value === null) return "-";
  const normalized = String(value).trim();
  return normalized || "-";
}

export default function WarehouseMapModal({
  show = false,
  onHide = () => {},
  onView,
  onSelectionChange,
  initialSelection = {},
}) {
  const [regionOptions, setRegionOptions] = useState([]);
  const [sectionMap, setSectionMap] = useState({});
  const [mapStep, setMapStep] = useState("regions");
  const [mapRegion, setMapRegion] = useState("");
  const [mapRow, setMapRow] = useState("");
  const [mapCol, setMapCol] = useState("");
  const [mapPallet, setMapPallet] = useState("");
  const [mapBin, setMapBin] = useState("");
  const [mapCellPallets, setMapCellPallets] = useState({});
  const [mapPalletBins, setMapPalletBins] = useState({});
  const [mapCellState, setMapCellState] = useState({});
  const [mapItems, setMapItems] = useState([]);
  const [mapItemsContext, setMapItemsContext] = useState("");
  const [mapItemsLoading, setMapItemsLoading] = useState(false);
  const [mapItemsLoaded, setMapItemsLoaded] = useState(false);
  const [mapItemsError, setMapItemsError] = useState("");
  const [mapLoading, setMapLoading] = useState(false);
  const [mapError, setMapError] = useState("");
  const [directoryLoaded, setDirectoryLoaded] = useState(false);
  const lastShowRef = useRef(false);
  const itemCacheRef = useRef({});

  const notifySelectionChange = useCallback(
    (selection) => {
      if (typeof onSelectionChange === "function") {
        onSelectionChange(selection);
      }
    },
    [onSelectionChange]
  );

  const loadDirectory = useCallback(async () => {
    if (directoryLoaded) return;
    try {
      const doc = await firebase
        .firestore()
        .collection("Warehouse")
        .doc("directory")
        .get();
      const data = doc.data() || {};
      setRegionOptions(data.Region || []);
      setSectionMap(data.Section || {});
      setDirectoryLoaded(true);
    } catch (error) {
      console.error("Failed to load map directory", error);
      setMapError("Failed to load warehouse directory.");
    }
  }, [directoryLoaded]);

  const loadRegionInventory = useCallback(async (regionId) => {
    if (!regionId) return;
    setMapLoading(true);
    setMapError("");
    setMapCellPallets({});
    setMapPalletBins({});
    setMapCellState({});
    try {
      const snap = await firebase
        .firestore()
        .collection("Test")
        .where("newLocalCurrent.region", "==", regionId)
        .get();

      const cellPallets = {};
      const palletBins = {};
      const cellState = {};
      snap.forEach((doc) => {
        const loc = normalizeLocation(doc.data()?.newLocalCurrent || {});
        const row = loc.row;
        const col = loc.col;
        const pallet = loc.pallet;
        const bin = loc.bin;
        if (!row || !col) return;

        const cellKey = `${row}-${col}`;
        const hasBin = Boolean(bin);
        const hasPallet =
          pallet !== undefined && pallet !== null && `${pallet}` !== "";

        if (!cellState[cellKey]) {
          cellState[cellKey] = { hasItems: false, hasBins: false };
        }
        cellState[cellKey].hasItems = true;
        if (hasBin) {
          cellState[cellKey].hasBins = true;
        }

        if (hasPallet || hasBin) {
          const palletId = hasPallet ? String(pallet) : NO_PALLET;
          if (!cellPallets[cellKey]) cellPallets[cellKey] = new Set();
          cellPallets[cellKey].add(palletId);

          if (hasBin) {
            const palletKey = `${cellKey}-P${palletId}`;
            if (!palletBins[palletKey]) palletBins[palletKey] = new Set();
            palletBins[palletKey].add(String(bin));
          }
        }
      });

      const cellObj = {};
      Object.keys(cellPallets).forEach((key) => {
        cellObj[key] = Array.from(cellPallets[key]).sort((a, b) => {
          if (a === NO_PALLET) return 1;
          if (b === NO_PALLET) return -1;
          const na = Number(a);
          const nb = Number(b);
          if (Number.isFinite(na) && Number.isFinite(nb)) return na - nb;
          return String(a).localeCompare(String(b));
        });
      });

      const palletObj = {};
      Object.keys(palletBins).forEach((key) => {
        palletObj[key] = Array.from(palletBins[key]).sort(
          (a, b) => Number(a) - Number(b)
        );
      });

      setMapCellPallets(cellObj);
      setMapPalletBins(palletObj);
      setMapCellState(cellState);
    } catch (error) {
      console.error("Failed to load map inventory", error);
      setMapError("Failed to load map inventory.");
    } finally {
      setMapLoading(false);
    }
  }, []);

  const getRegionDimensions = useCallback(
    (regionId) => {
      const entry = sectionMap?.[regionId];
      if (Array.isArray(entry) && entry.length >= 2) {
        const cols = parseInt(entry[0], 10);
        const rows = parseInt(entry[1], 10);
        return {
          cols: Number.isFinite(cols) ? cols : 0,
          rows: Number.isFinite(rows) ? rows : 0,
        };
      }
      return { cols: 0, rows: 0 };
    },
    [sectionMap]
  );

  useEffect(() => {
    const wasOpen = lastShowRef.current;
    lastShowRef.current = show;
    if (!show || wasOpen) return;

    loadDirectory();
    setMapError("");
    setMapItems([]);
    setMapItemsContext("");
    setMapItemsError("");
    setMapItemsLoaded(false);
    setMapItemsLoading(false);
    const {
      region,
      sectionLetter,
      sectionNumber,
      pallet,
      bin,
    } = initialSelection || {};

    setMapRegion(region || "");
    setMapRow(sectionLetter || "");
    setMapCol(sectionNumber ? String(sectionNumber) : "");
    setMapPallet(pallet ? String(pallet) : "");
    setMapBin(bin ? String(bin) : "");
    setMapStep(region ? "grid" : "regions");
    if (region) loadRegionInventory(region);
  }, [show, initialSelection, loadDirectory, loadRegionInventory]);

  const clearItemPanel = useCallback(() => {
    setMapItems([]);
    setMapItemsContext("");
    setMapItemsError("");
    setMapItemsLoaded(false);
    setMapItemsLoading(false);
  }, []);

  const loadItemsForSelection = useCallback(
    async ({
      region,
      row,
      col,
      bin = "",
      pallet = "",
      contextLabel = "",
    }) => {
      if (!region || !row || !col) {
        clearItemPanel();
        return;
      }

      const normalizedBin = bin ? String(bin) : "";
      const normalizedPallet = pallet ? String(pallet) : "";
      const cacheKey = `${region}|${row}|${col}|${normalizedPallet}|${normalizedBin}`;
      setMapItemsContext(contextLabel);
      setMapItemsError("");
      setMapItemsLoaded(false);

      if (itemCacheRef.current[cacheKey]) {
        setMapItemsLoading(false);
        setMapItems(itemCacheRef.current[cacheKey]);
        setMapItemsLoaded(true);
        return;
      }

      setMapItemsLoading(true);
      try {
        const snap = await firebase
          .firestore()
          .collection("Test")
          .where("newLocalCurrent.region", "==", region)
          .get();

        const items = [];
        snap.forEach((doc) => {
          const data = doc.data() || {};
          const loc = normalizeLocation(data.newLocalCurrent || {});

          if (loc.row !== row || loc.col !== String(col)) return;
          if (normalizedPallet && loc.pallet !== normalizedPallet) return;
          if (normalizedBin && loc.bin !== normalizedBin) return;

          items.push({
            id: doc.id,
            name: formatSimpleField(data.name),
            pn: formatSimpleField(data.pn),
            sn: formatSimpleField(data.sn),
          });
        });

        items.sort((a, b) => a.name.localeCompare(b.name));
        itemCacheRef.current[cacheKey] = items;
        setMapItems(items);
      } catch (error) {
        console.error("Failed to load map items", error);
        setMapItemsError("Failed to load items for this selection.");
        setMapItems([]);
      } finally {
        setMapItemsLoading(false);
        setMapItemsLoaded(true);
      }
    },
    [clearItemPanel]
  );

  const handleSelectRegion = (regionId) => {
    const selection = {
      region: regionId,
      sectionLetter: "",
      sectionNumber: "",
      pallet: "",
      bin: "",
    };
    setMapRegion(regionId);
    setMapRow("");
    setMapCol("");
    setMapPallet("");
    setMapBin("");
    setMapStep("grid");
    clearItemPanel();
    notifySelectionChange(selection);
    loadRegionInventory(regionId);
  };

  const handleSelectCell = (rowLetter, colNumber) => {
    const colValue = String(colNumber);
    const cellKey = `${rowLetter}-${colValue}`;
    const hasItems = Boolean(mapCellState?.[cellKey]?.hasItems);
    const hasPallets = Boolean(mapCellPallets?.[cellKey]?.length);
    const palletsForCell = mapCellPallets?.[cellKey] || [];
    const realPallets = palletsForCell.filter((pallet) => pallet !== NO_PALLET);
    const hasOnlyNoPalletBins =
      realPallets.length === 0 &&
      palletsForCell.includes(NO_PALLET) &&
      Boolean(mapPalletBins?.[`${cellKey}-P${NO_PALLET}`]?.length);
    const selection = {
      region: mapRegion,
      sectionLetter: rowLetter,
      sectionNumber: colValue,
      pallet: "",
      bin: "",
    };
    setMapRow(rowLetter);
    setMapCol(colValue);
    setMapPallet("");
    setMapBin("");
    if (hasOnlyNoPalletBins) {
      setMapPallet(NO_PALLET);
      setMapStep("bins");
    } else {
      setMapStep(hasPallets ? "pallets" : "grid");
    }
    notifySelectionChange(selection);

    if (hasItems) {
      loadItemsForSelection({
        region: mapRegion,
        row: rowLetter,
        col: colValue,
        contextLabel: `Items in Region ${mapRegion} - Section ${rowLetter}${colValue}`,
      });
    } else {
      clearItemPanel();
    }
  };

  const handleSelectPallet = (palletId) => {
    const palletValue = String(palletId);
    const normalizedPallet = palletValue === NO_PALLET ? "" : palletValue;
    const selection = {
      region: mapRegion,
      sectionLetter: mapRow,
      sectionNumber: mapCol,
      pallet: normalizedPallet,
      bin: "",
    };
    setMapPallet(palletValue);
    setMapBin("");
    setMapStep("bins");
    notifySelectionChange(selection);
  };

  const handleSelectPalletOnly = (palletId) => {
    const palletValue = String(palletId);
    const normalizedPallet = palletValue === NO_PALLET ? "" : palletValue;
    const selection = {
      region: mapRegion,
      sectionLetter: mapRow,
      sectionNumber: mapCol,
      pallet: normalizedPallet,
      bin: "",
    };
    setMapPallet(palletValue);
    setMapBin("");
    notifySelectionChange(selection);
    loadItemsForSelection({
      region: mapRegion,
      row: mapRow,
      col: mapCol,
      pallet: normalizedPallet,
      bin: "",
      contextLabel: `Items in Region ${mapRegion} - Section ${mapRow}${mapCol} - Pallet ${normalizedPallet}`,
    });
  };

  const handleViewPallet = (palletId) => {
    if (typeof onView !== "function") return;
    const palletValue = String(palletId);
    const normalizedPallet = palletValue === NO_PALLET ? "" : palletValue;
    const selection = {
      region: mapRegion,
      sectionLetter: mapRow,
      sectionNumber: mapCol,
      pallet: normalizedPallet,
      bin: "",
    };
    notifySelectionChange(selection);
    onView(selection);
  };

  const handleSelectBin = (binId) => {
    const binValue = String(binId);
    const normalizedPallet = mapPallet === NO_PALLET ? "" : mapPallet;
    const selection = {
      region: mapRegion,
      sectionLetter: mapRow,
      sectionNumber: mapCol,
      pallet: normalizedPallet,
      bin: binValue,
    };
    setMapBin(binValue);
    notifySelectionChange(selection);
    loadItemsForSelection({
      region: mapRegion,
      row: mapRow,
      col: mapCol,
      pallet: normalizedPallet,
      bin: binValue,
      contextLabel: `Items in Region ${mapRegion} - Section ${mapRow}${mapCol} - Bin ${binValue}`,
    });
  };

  const handleBack = () => {
    if (mapStep === "bins") {
      if (mapPallet === NO_PALLET) {
        setMapStep("grid");
        return;
      }
      setMapStep("pallets");
    }
    else if (mapStep === "pallets") setMapStep("grid");
    else if (mapStep === "grid") {
      setMapStep("regions");
      clearItemPanel();
    }
  };

  const handleView = () => {
    if (typeof onView !== "function") return;
    const normalizedPallet = mapPallet === NO_PALLET ? "" : mapPallet;
    onView({
      region: mapRegion,
      sectionLetter: mapRow,
      sectionNumber: mapCol,
      pallet: normalizedPallet,
      bin: mapBin,
    });
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Warehouse Map</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {mapLoading && (
          <div className={styles.loadingState}>
            <img
              src="/magmo-logo.png"
              alt="Loading Magmo"
              className={styles.loadingLogo}
            />
            <div className={styles.loadingText}>Loading map data...</div>
          </div>
        )}
        {mapError && <div className={styles.mapError}>{mapError}</div>}

        {!mapLoading && mapStep === "regions" && (
          <div className={styles.mapStage}>
            <div className={styles.mapHint}>Select a region</div>
            <div className={styles.mapCanvas}>
              {REGION_ORDER.map((regionId) => (
                <button
                  key={regionId}
                  type="button"
                  className={`${styles.regionBlock} ${styles[`region${regionId}`]}`}
                  onClick={() => handleSelectRegion(regionId)}
                  disabled={
                    Array.isArray(regionOptions) &&
                    regionOptions.length > 0 &&
                    !regionOptions.includes(regionId)
                  }
                >
                  {regionId}
                </button>
              ))}
            </div>
          </div>
        )}

        {!mapLoading && mapStep === "grid" && (
          <div className={styles.mapStage}>
            <div className={styles.mapHint}>
              Region {mapRegion}: choose a row and column
            </div>
            <div className={styles.legend}>
              <span className={styles.legendItem}>
                <span
                  className={`${styles.legendSwatch} ${styles.legendBins}`}
                />
                Bin
              </span>
              <span className={styles.legendItem}>
                <span
                  className={`${styles.legendSwatch} ${styles.legendItems}`}
                />
                Item
              </span>
              <span className={styles.legendItem}>
                <span
                  className={`${styles.legendSwatch} ${styles.legendEmpty}`}
                />
                Empty
              </span>
            </div>
            {(() => {
              const dims = getRegionDimensions(mapRegion);
              const rows = LETTERS.slice(0, dims.rows || 0).reverse();
              const cols = NUMBERS.slice(0, dims.cols || 0);
              if (!rows.length || !cols.length) {
                const sectionKeys = Array.from(
                  new Set([
                    ...Object.keys(mapCellPallets || {}),
                    ...Object.keys(mapCellState || {}),
                  ])
                )
                  .filter(Boolean)
                  .map((key) => {
                    const [row, col] = key.split("-");
                    return { key, row, col };
                  })
                  .sort((a, b) => {
                    if (a.row === b.row) {
                      return Number(a.col) - Number(b.col);
                    }
                    return b.row.localeCompare(a.row);
                  });

                if (!sectionKeys.length) {
                  return (
                    <div className={styles.mapEmpty}>
                      No grid data for this region.
                    </div>
                  );
                }

                return (
                  <div className={styles.gridWrapper}>
                    <div className={styles.mapHint}>
                      Grid not available. Select an available section below.
                    </div>
                    <div className={styles.palletGrid}>
                      {sectionKeys.map(({ key, row, col }) => (
                        <button
                          key={key}
                          type="button"
                          className={`${styles.palletButton} ${
                            mapCellState?.[key]?.hasBins
                              ? styles.gridCellBins
                              : mapCellState?.[key]?.hasItems
                              ? styles.gridCellItems
                              : styles.gridCellEmpty
                          }`}
                          onClick={() => handleSelectCell(row, col)}
                        >
                          {row}
                          {col}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              }
              return (
                <div className={styles.gridWrapper}>
                  <div
                    className={styles.grid}
                    style={{ "--grid-cols": cols.length }}
                  >
                    {rows.map((row) =>
                      cols.map((col) => {
                        const cellKey = `${row}-${col}`;
                        const hasBins = Boolean(mapCellState[cellKey]?.hasBins);
                        const hasItems = Boolean(
                          mapCellState[cellKey]?.hasItems
                        );
                        const isSelected =
                          mapRow === row && mapCol === String(col);
                        return (
                          <button
                            key={cellKey}
                            type="button"
                            className={`${styles.gridCell} ${
                              hasBins
                                ? styles.gridCellBins
                                : hasItems
                                ? styles.gridCellItems
                                : styles.gridCellEmpty
                            } ${isSelected ? styles.gridCellSelected : ""}
                            `}
                            onClick={() => handleSelectCell(row, col)}
                          >
                            <span>
                              {row}
                              {col}
                            </span>
                          </button>
                        );
                      })
                    )}
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {!mapLoading && mapStep === "pallets" && (
          <div className={styles.mapStage}>
            <div className={styles.mapHint}>
              Region {mapRegion} - Section {mapRow}
              {mapCol}: select a pallet
            </div>
            <div className={styles.palletGrid}>
              {(mapCellPallets[`${mapRow}-${mapCol}`] || [])
                .filter((pallet) => pallet !== NO_PALLET)
                .map((pallet) => {
                  const palletKey = `${mapRow}-${mapCol}-P${pallet}`;
                  const bins = mapPalletBins[palletKey] || [];
                  const hasBins = bins.length > 0;
                  return (
                    <div key={pallet} className={styles.palletCard}>
                      <button
                        type="button"
                        className={styles.palletButton}
                        disabled={!hasBins}
                        onClick={() => handleSelectPallet(pallet)}
                      >
                        {`Pallet ${pallet}`}
                      </button>
                      <div className={styles.palletMeta}>
                        {hasBins
                          ? `${bins.length} bin${bins.length === 1 ? "" : "s"}`
                          : "No bins"}
                      </div>
                      <div className={styles.palletActions}>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => handleViewPallet(pallet)}
                        >
                          View
                        </Button>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleSelectPalletOnly(pallet)}
                        >
                          Select
                        </Button>
                      </div>
                    </div>
                  );
                })}
              {!(mapCellPallets[`${mapRow}-${mapCol}`] || [])
                .filter((pallet) => pallet !== NO_PALLET)
                .length && (
                <div className={styles.mapEmpty}>
                  No pallets available here.
                </div>
              )}
            </div>
          </div>
        )}

        {!mapLoading && mapStep === "bins" && (
          <div className={styles.mapStage}>
            <div className={styles.mapHint}>
              Region {mapRegion} - Section {mapRow}
              {mapCol} - Pallet {mapPallet}
            </div>
            <div className={styles.palletGrid}>
              {(mapPalletBins[`${mapRow}-${mapCol}-P${mapPallet}`] || []).map(
                (bin) => (
                  <button
                    key={bin}
                    type="button"
                    className={`${styles.palletButton} ${styles.binButton}`}
                    onClick={() => handleSelectBin(bin)}
                  >
                    Bin {bin}
                  </button>
                )
              )}
              {!(mapPalletBins[`${mapRow}-${mapCol}-P${mapPallet}`] || [])
                .length && (
                <div className={styles.mapEmpty}>
                  No bins available on this pallet.
                </div>
              )}
            </div>
          </div>
        )}

        {!mapLoading &&
          (mapItemsLoading || mapItemsLoaded || Boolean(mapItemsError)) && (
            <div className={styles.itemsPanel}>
              <div className={styles.itemsTitle}>
                {mapItemsContext || "Items"}
              </div>
              {mapItemsLoading && (
                <div className={styles.inlineLoadingState}>
                  <img
                    src="/magmo-logo.png"
                    alt="Loading Magmo"
                    className={styles.loadingLogo}
                  />
                  <div className={styles.loadingText}>Loading items...</div>
                </div>
              )}
              {!mapItemsLoading && mapItemsError && (
                <div className={styles.mapError}>{mapItemsError}</div>
              )}
              {!mapItemsLoading && !mapItemsError && mapItems.length === 0 && (
                <div className={styles.mapEmpty}>No items found here.</div>
              )}
              {!mapItemsLoading && !mapItemsError && mapItems.length > 0 && (
                <div className={styles.itemList}>
                  <div className={styles.itemHeader}>
                    <span>Name</span>
                    <span>PN</span>
                    <span>SN</span>
                  </div>
                  {mapItems.map((item) => (
                    <Link key={item.id} href={`/NewSearch/item/${item.id}`}>
                      <a className={styles.itemRow} onClick={onHide}>
                        <span>{item.name}</span>
                        <span>{item.pn}</span>
                        <span>{item.sn}</span>
                      </a>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
      </Modal.Body>
      <Modal.Footer className={styles.mapFooter}>
        <Button
          variant="outline-secondary"
          onClick={handleBack}
          disabled={mapStep === "regions"}
        >
          Back
        </Button>
        <Button variant="outline-primary" onClick={handleView}>
          View
        </Button>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
