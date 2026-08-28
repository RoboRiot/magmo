// NewLocal.js
import React, { useState, useEffect } from "react";
import { Alert, Form, Row, Col, Button, Stack, Modal } from "react-bootstrap";
import { useRouter } from "next/router";
import firebase from "../../../../context/Firebase";
import WarehouseMapModal from "../../../../components/WarehouseMapModal";
import {
  formatBinPallet,
  formatWarehousePosition,
} from "../../../../utils/itemFormShared";
import styles from "./NewLocal.module.css";

export default function NewLocal({
  onSave = () => {},
  onCancel = () => {},
  selectedClient,
  showLocalLoc,
  value = {},
  mode = "all",
}) {
  const router = useRouter();
  const [regionOptions, setRegionOptions] = useState([]);
  const [sectionDirectory, setSectionDirectory] = useState({});
  const [binCount, setBinCount]         = useState(0);
  const [palletCount, setPalletCount]   = useState(0);

  const [region, setRegion] = useState("");
  const [sectionLetter, setSectionLetter] = useState("");
  const [sectionNumber, setSectionNumber] = useState("");
  const [binSelected, setBinSelected]     = useState("");
  const [palletSelected, setPalletSelected] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [creatingUnit, setCreatingUnit] = useState("");
  const [containerError, setContainerError] = useState("");
  const showWarehouseFields = mode !== "container";
  const showContainerFields = mode !== "warehouse";
  const clientSelected = Boolean(selectedClient?.id);

  // 1) load directory exactly as before
  useEffect(() => {
    if (!showLocalLoc) return;
    const db = firebase.firestore();
    db.collection("Warehouse").doc("directory").get().then(doc => {
      const d = doc.data() || {};
      setRegionOptions(d.Region   || []);
      setSectionDirectory(d.Section || {});
      setBinCount     (d.Bin      || 0);
      setPalletCount  (d.Pallet   || 0);
    });
  }, [showLocalLoc]);

  // 2) when we open the modal (or value changes), initialize from value
  useEffect(() => {
    if (!showLocalLoc) return;
    setRegion        (value.region             || "");
    setSectionLetter(value.section?.letter    || "");
    setSectionNumber(value.section?.number    || "");
    setBinSelected   (value.bin?.toString()    || "");
    setPalletSelected(value.pallet?.toString()|| "");
  }, [showLocalLoc]);

  // helpers:
  const sectionDimensions = Array.isArray(sectionDirectory?.[region])
    ? sectionDirectory[region]
    : [];
  const sectionColumnCount = Number(sectionDimensions[0]) || 0;
  const sectionRowCount = Number(sectionDimensions[1]) || 0;
  const letters = Array.from({ length: sectionRowCount }, (_, i) =>
    String.fromCharCode(65 + i)
  );
  const numbers = Array.from({ length: sectionColumnCount }, (_, i) => i + 1);
  const binOptions = Array.from({ length: binCount }, (_, i) => i + 1);
  const palletOptions = Array.from({ length: palletCount }, (_, i) => i + 1);

  const handleRegionChange = (nextRegion) => {
    setRegion(nextRegion);
    setSectionLetter("");
    setSectionNumber("");
  };

  const createStorageUnit = async (kind) => {
    const isBin = kind === "bin";
    const counterField = isBin ? "Bin" : "Pallet";
    const prefix = isBin ? "B" : "P";
    const db = firebase.firestore();
    const directoryRef = db.collection("Warehouse").doc("directory");
    let createdNumber = 0;

    setCreatingUnit(kind);
    setContainerError("");
    try {
      await db.runTransaction(async (transaction) => {
        const directorySnapshot = await transaction.get(directoryRef);
        if (!directorySnapshot.exists) {
          throw new Error("The warehouse directory does not exist.");
        }
        const currentCount = Number(directorySnapshot.data()?.[counterField]);
        if (!Number.isSafeInteger(currentCount) || currentCount < 0) {
          throw new Error(`${counterField} count is invalid.`);
        }

        createdNumber = currentCount + 1;
        const code = `${prefix}${createdNumber}`;
        const unitRef = db.collection("StorageUnits").doc(code);
        const unitSnapshot = await transaction.get(unitRef);
        if (unitSnapshot.exists) {
          throw new Error(
            `${code} already exists. Reload the warehouse directory and try again.`
          );
        }

        const hasWarehouseLocation = Boolean(
          region && sectionLetter && sectionNumber
        );
        const warehouseLocation = hasWarehouseLocation
          ? {
              region,
              section: {
                letter: sectionLetter,
                number: String(sectionNumber),
              },
            }
          : null;
        const selectedParentNumber = Number(palletSelected);
        const parentPalletId =
          isBin &&
          Number.isSafeInteger(selectedParentNumber) &&
          selectedParentNumber > 0
            ? `P${selectedParentNumber}`
            : null;
        const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp();

        transaction.set(
          directoryRef,
          { [counterField]: createdNumber },
          { merge: true }
        );
        transaction.set(unitRef, {
          schemaVersion: 1,
          code,
          kind,
          number: createdNumber,
          displayNumber: String(createdNumber),
          name: `${isBin ? "Bin" : "Pallet"} ${createdNumber}`,
          active: true,
          warehouseLocation,
          locationStatus: hasWarehouseLocation ? "confirmed" : "unknown",
          locationCandidates: warehouseLocation ? [warehouseLocation] : [],
          parentPalletId,
          parentStatus: isBin
            ? parentPalletId
              ? "confirmed"
              : "none"
            : "not_applicable",
          parentCandidates: parentPalletId ? [parentPalletId] : [],
          photoStoragePrefix: `StorageUnits/${code}`,
          reviewRequired: false,
          reviewReasons: [],
          createdSource: "warehouse-location-picker",
          createdAt: serverTimestamp,
          updatedAt: serverTimestamp,
        });
      });

      if (isBin) {
        setBinCount(createdNumber);
        setBinSelected(String(createdNumber));
      } else {
        setPalletCount(createdNumber);
        setPalletSelected(String(createdNumber));
      }
    } catch (error) {
      console.error(`Could not create ${kind}`, error);
      setContainerError(
        error?.message || `The ${kind} could not be created. Please try again.`
      );
    } finally {
      setCreatingUnit("");
    }
  };

  const handleAddBin = () => createStorageUnit("bin");
  const handleAddPallet = () => createStorageUnit("pallet");

  // only fire parent when they click OK
  const handleOk = () => {
    const p = {};
    if (region) p.region = region;
    if (sectionLetter && sectionNumber)
      p.section = { letter: sectionLetter, number: sectionNumber };
    if (binSelected) p.bin = parseInt(binSelected, 10);
    if (palletSelected) p.pallet = parseInt(palletSelected, 10);
    onSave(p);
  };

  const openMap = () => {
    setShowMap(true);
  };

  const handleMapSelectionChange = (selection = {}) => {
    if (Object.prototype.hasOwnProperty.call(selection, "region")) {
      setRegion(selection.region || "");
    }
    if (Object.prototype.hasOwnProperty.call(selection, "sectionLetter")) {
      setSectionLetter(selection.sectionLetter || "");
    }
    if (Object.prototype.hasOwnProperty.call(selection, "sectionNumber")) {
      setSectionNumber(
        selection.sectionNumber ? String(selection.sectionNumber) : ""
      );
    }
    if (
      showContainerFields &&
      Object.prototype.hasOwnProperty.call(selection, "pallet")
    ) {
      setPalletSelected(selection.pallet ? String(selection.pallet) : "");
    }
    if (
      showContainerFields &&
      Object.prototype.hasOwnProperty.call(selection, "bin")
    ) {
      setBinSelected(selection.bin ? String(selection.bin) : "");
    }
  };

  const handleViewInventory = (selection = {}) => {
    const params = new URLSearchParams();
    const regionValue = selection.region ?? region;
    const letterValue = selection.sectionLetter ?? sectionLetter;
    const numberValue = selection.sectionNumber ?? sectionNumber;
    const palletValue = selection.pallet ?? palletSelected;
    const binValue = selection.bin ?? binSelected;

    if (regionValue) params.set("region", regionValue);
    if (letterValue) params.set("sectionLetter", letterValue);
    if (numberValue) params.set("sectionNumber", numberValue);
    if (palletValue) {
      params.set("pallet", palletValue);
      params.set("palletLocationScope", "current");
    }
    if (binValue) {
      params.set("bin", binValue);
      params.set("binLocationScope", "current");
    }

    const query = params.toString();
    router.push(
      `/NewSearch/inventory/inventoryManage${query ? `?${query}` : ""}`
    );
    setShowMap(false);
  };

  return (
    <div className={styles.wrapper}>
      <Row className={styles.formRow + (!showWarehouseFields ? " d-none" : "")}>
        <Col>
          <Form.Group className={styles.formGroup}>
            <Form.Label>Region</Form.Label>
            <Form.Select
              value={region} onChange={e=>handleRegionChange(e.target.value)}
            >
              <option value="">Select region</option>
              {regionOptions.map(r=> <option key={r} value={r}>{r}</option>)}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className={styles.formGroup}>
            <Form.Label>Section Letter</Form.Label>
            <Form.Select
              value={sectionLetter}
              onChange={e=>setSectionLetter(e.target.value)}
              disabled={!region}
            >
              <option value="">
                {region ? "Letter" : "Select a region first"}
              </option>
              {letters.map(l=> <option key={l} value={l}>{l}</option>)}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className={styles.formGroup}>
            <Form.Label>Section Number</Form.Label>
            <Form.Select
              value={sectionNumber}
              onChange={e=>setSectionNumber(e.target.value)}
              disabled={!region}
            >
              <option value="">
                {region ? "Number" : "Select a region first"}
              </option>
              {numbers.map(n=> <option key={n} value={n}>{n}</option>)}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row className={!showContainerFields ? "d-none" : "mt-3"}>
        <Col>
          <Form.Group className={styles.formGroup}>
            <Form.Label>Bin</Form.Label>
            <Stack direction="horizontal" gap={2}>
              <Form.Select
                value={binSelected}
                onChange={e => setBinSelected(e.target.value)}
                disabled={!clientSelected}
              >
                <option value="">Select bin</option>
                {binOptions.map(b => <option key={b} value={b}>{b}</option>)}
              </Form.Select>
               <Button
                 variant="outline-secondary"
                 onClick={handleAddBin}
                 disabled={!clientSelected || Boolean(creatingUnit)}
               >
                 {creatingUnit === "bin" ? "Creating..." : "+ Bin"}
              </Button>
            </Stack>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className={styles.formGroup}>
          <Form.Label>Pallet</Form.Label>
          <Stack direction="horizontal" gap={2}>
          <Form.Select
            value={palletSelected}
            onChange={e =>setPalletSelected(e.target.value)}
            disabled={!clientSelected}
            >
              <option value="">Select pallet</option>
                {palletOptions.map(p => <option key={p} value={p}>{p}</option>)}
              </Form.Select>
               <Button
                 variant="outline-secondary"
                 onClick={handleAddPallet}
                 disabled={!clientSelected || Boolean(creatingUnit)}
               >
                 {creatingUnit === "pallet" ? "Creating..." : "+ Pallet"}
              </Button>
            </Stack>
          </Form.Group>
        </Col>
      </Row>
      {showContainerFields && containerError && (
        <Alert variant="danger" className="mt-3 mb-0">
          {containerError}
        </Alert>
      )}
      {/* OK / Cancel footer */}
      <div className={styles.actionRow}>
        <Button variant="outline-primary" onClick={openMap} className={!showWarehouseFields ? "d-none" : ""}>
          Map
        </Button>
        <div className={styles.actionSpacer} />
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleOk}
          disabled={!clientSelected || Boolean(creatingUnit)}
        >
          OK
        </Button>
      </div>
      <WarehouseMapModal
        show={showMap}
        onHide={() => setShowMap(false)}
        onView={handleViewInventory}
        onSelectionChange={handleMapSelectionChange}
        initialSelection={{
          region,
          sectionLetter,
          sectionNumber,
          pallet: showContainerFields ? palletSelected : "",
          bin: showContainerFields ? binSelected : "",
        }}
        positionOnly={mode === "warehouse"}
      />
    </div>
  );
}

export function LocationControls({
  selectedClient,
  value = {},
  onChange = () => {},
  warehouseEnabled = false,
  variant = "outline-secondary",
  borderColor = "#9aa4b2",
}) {
  const [showContainer, setShowContainer] = useState(false);
  const [showWarehouse, setShowWarehouse] = useState(false);
  const clientSelected = Boolean(selectedClient?.id);
  const containerLabel = formatBinPallet(value);
  const warehouseLabel = formatWarehousePosition(value);

  return (
    <>
      <div
        style={{
          border: "1px dashed " + borderColor,
          padding: "0.75rem",
          borderRadius: "4px",
          marginBottom: "0.75rem",
        }}
      >
        <p className="mb-2">
          <strong>Bin / Pallet</strong>
        </p>
        <Button
          variant={variant}
          onClick={() => setShowContainer(true)}
          className="w-100"
          disabled={!clientSelected}
          title={clientSelected ? "Select bin or pallet" : "Select a client first"}
        >
          {containerLabel ||
            (clientSelected ? "Select Bin / Pallet" : "Select Client First")}
        </Button>
      </div>

      <Modal
        show={showContainer}
        onHide={() => setShowContainer(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Bin / Pallet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <NewLocal
            selectedClient={selectedClient}
            showLocalLoc={showContainer}
            value={value}
            mode="container"
            onSave={(location) => {
              onChange(location);
              setShowContainer(false);
            }}
            onCancel={() => setShowContainer(false)}
          />
        </Modal.Body>
      </Modal>

      {warehouseEnabled && (
        <>
          <div
            style={{
              border: "1px dashed " + borderColor,
              padding: "0.75rem",
              borderRadius: "4px",
              marginBottom: "1rem",
            }}
          >
            <p className="mb-2">
              <strong>Warehouse Position</strong>
            </p>
            <Button
              variant={variant}
              onClick={() => setShowWarehouse(true)}
              className="w-100"
            >
              {warehouseLabel || "Select Position"}
            </Button>
          </div>

          <Modal
            show={showWarehouse}
            onHide={() => setShowWarehouse(false)}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Warehouse Position</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <NewLocal
                selectedClient={selectedClient}
                showLocalLoc={showWarehouse}
                value={value}
                mode="warehouse"
                onSave={(location) => {
                  onChange(location);
                  setShowWarehouse(false);
                }}

                onCancel={() => setShowWarehouse(false)}
              />
            </Modal.Body>
          </Modal>
        </>
      )}
    </>
  );
}
