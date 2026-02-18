import React, { useCallback, useEffect, useRef, useState } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import firebase from "../context/Firebase";
import styles from "./WarehouseMapModal.module.css";

const REGION_ORDER = ["E", "F", "G", "A", "D", "C", "B"];
const NO_PALLET = "NoPallet";
const LETTERS = Array.from({ length: 26 }, (_, i) =>
  String.fromCharCode(65 + i)
);
const NUMBERS = Array.from({ length: 50 }, (_, i) => i + 1);

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
  const [mapLoading, setMapLoading] = useState(false);
  const [mapError, setMapError] = useState("");
  const [directoryLoaded, setDirectoryLoaded] = useState(false);
  const lastShowRef = useRef(false);

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
    try {
      const snap = await firebase
        .firestore()
        .collection("Test")
        .where("newLocalCurrent.region", "==", regionId)
        .get();

      const cellPallets = {};
      const palletBins = {};
      snap.forEach((doc) => {
        const loc = doc.data()?.newLocalCurrent || {};
        let row = loc.section?.letter;
        let col = loc.section?.number;
        if ((!row || !col) && typeof loc.section === "string") {
          const trimmed = loc.section.trim();
          row = trimmed.slice(0, 1);
          col = trimmed.slice(1);
        }
        if (col !== undefined && col !== null) {
          col = String(col);
        }
        const pallet = loc.pallet;
        const bin = loc.bin;
        if (!row || !col) return;
        const cellKey = `${row}-${col}`;
        const hasBin = bin !== undefined && bin !== null && `${bin}` !== "";
        const hasPallet =
          pallet !== undefined && pallet !== null && `${pallet}` !== "";
        if (!hasPallet && !hasBin) return;

        const palletId = hasPallet ? String(pallet) : NO_PALLET;
        if (!cellPallets[cellKey]) cellPallets[cellKey] = new Set();
        cellPallets[cellKey].add(palletId);

        if (hasBin) {
          const palletKey = `${cellKey}-P${palletId}`;
          if (!palletBins[palletKey]) palletBins[palletKey] = new Set();
          palletBins[palletKey].add(String(bin));
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
    notifySelectionChange(selection);
    loadRegionInventory(regionId);
  };

  const handleSelectCell = (rowLetter, colNumber) => {
    const colValue = String(colNumber);
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
    setMapStep("pallets");
    notifySelectionChange(selection);
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
  };

  const handleBack = () => {
    if (mapStep === "bins") setMapStep("pallets");
    else if (mapStep === "pallets") setMapStep("grid");
    else if (mapStep === "grid") setMapStep("regions");
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
          <div className={styles.mapLoading}>
            <Spinner animation="border" />
            <span>Loading map data...</span>
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
            {(() => {
              const dims = getRegionDimensions(mapRegion);
              const rows = LETTERS.slice(0, dims.rows || 0).reverse();
              const cols = NUMBERS.slice(0, dims.cols || 0);
              if (!rows.length || !cols.length) {
                const sectionKeys = Object.keys(mapCellPallets || {})
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
                          className={styles.palletButton}
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
                        const hasPallets = Boolean(
                          mapCellPallets[cellKey]?.length
                        );
                        return (
                          <button
                            key={cellKey}
                            type="button"
                            className={`${styles.gridCell} ${
                              hasPallets ? "" : styles.gridCellDisabled
                            }`}
                            onClick={() =>
                              hasPallets && handleSelectCell(row, col)
                            }
                            disabled={!hasPallets}
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
              {(mapCellPallets[`${mapRow}-${mapCol}`] || []).map((pallet) => {
                const palletKey = `${mapRow}-${mapCol}-P${pallet}`;
                const bins = mapPalletBins[palletKey] || [];
                return (
                  <button
                    key={pallet}
                    type="button"
                    className={styles.palletButton}
                    onClick={() => {
                      if (bins.length === 0 && typeof onView === "function") {
                        const selection = {
                          region: mapRegion,
                          sectionLetter: mapRow,
                          sectionNumber: mapCol,
                          pallet: pallet === NO_PALLET ? "" : String(pallet),
                          bin: "",
                        };
                        notifySelectionChange(selection);
                        onView(selection);
                        return;
                      }
                      handleSelectPallet(pallet);
                    }}
                  >
                    {pallet === NO_PALLET ? "No Pallet" : `Pallet ${pallet}`}
                  </button>
                );
              })}
              {!(mapCellPallets[`${mapRow}-${mapCol}`] || []).length && (
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
